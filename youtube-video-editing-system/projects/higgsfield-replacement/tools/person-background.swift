import Foundation
import AVFoundation
import Vision
import CoreImage
import CoreVideo

// Local, per-frame person matte. Sharp source is blended over its own blurred
// background, never over a synthetic replacement and never through a fixed oval.
struct Camera: Decodable { let id:String; let source:String; let obsOffsetSeconds:Double }
struct Shot: Decodable { let id:String; let start:Double; let end:Double; let camera:String? }
struct Manifest: Decodable { let fps:Double; let cameras:[Camera]; let segments:[Shot] }
struct Props: Decodable { let manifest:Manifest }
enum Failure: Error { case message(String) }
let args=CommandLine.arguments
guard args.count>=4 else { fatalError("Usage: person-background props.json media-dir output.mp4 [maxFrames]") }
let manifest=try JSONDecoder().decode(Props.self,from:Data(contentsOf:URL(fileURLWithPath:args[1]))).manifest
let media=URL(fileURLWithPath:args[2]),out=URL(fileURLWithPath:args[3])
guard !FileManager.default.fileExists(atPath:out.path) else { throw Failure.message("Refusing to overwrite existing output") }
let maxFrames=args.count>4 ? Int(args[4])! : Int.max
let fps=Int32(manifest.fps), width=1920,height=1080
let context=CIContext(options:[.cacheIntermediates:false,.workingColorSpace:CGColorSpace(name:CGColorSpace.itur_709)!])
let color=CGColorSpace(name:CGColorSpace.itur_709)!
let bounds=CGRect(x:0,y:0,width:width,height:height)
let writer=try AVAssetWriter(outputURL:out,fileType:.mp4)
let settings:[String:Any]=[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:width,AVVideoHeightKey:height,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:18000000,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel,AVVideoMaxKeyFrameIntervalKey:30],AVVideoColorPropertiesKey:[AVVideoColorPrimariesKey:AVVideoColorPrimaries_ITU_R_709_2,AVVideoTransferFunctionKey:AVVideoTransferFunction_ITU_R_709_2,AVVideoYCbCrMatrixKey:AVVideoYCbCrMatrix_ITU_R_709_2]]
let input=AVAssetWriterInput(mediaType:.video,outputSettings:settings)
input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA,kCVPixelBufferWidthKey as String:width,kCVPixelBufferHeightKey as String:height,kCVPixelBufferIOSurfacePropertiesKey as String:[:]])
writer.add(input)
guard writer.startWriting() else { throw writer.error! }
writer.startSession(atSourceTime:.zero)
var seconds=0.0,frame=0,failures=0
let wallStart=Date()
for shot in manifest.segments {
 if frame>=maxFrames { break }
 seconds += shot.end-shot.start
 let targetEnd=min(Int((seconds*manifest.fps).rounded()),maxFrames)
 guard let camera=manifest.cameras.first(where:{$0.id==shot.camera}) else { throw Failure.message("Missing camera for \(shot.id)") }
 let cameraStart=((shot.start-camera.obsOffsetSeconds)*manifest.fps).rounded()/manifest.fps
 let asset=AVURLAsset(url:media.appendingPathComponent(camera.source))
 guard let track=asset.tracks(withMediaType:.video).first else { throw Failure.message("Missing picture") }
 let reader=try AVAssetReader(asset:asset)
 reader.timeRange=CMTimeRange(start:CMTime(seconds:max(0,cameraStart-0.05),preferredTimescale:60000),duration:CMTime(seconds:Double(targetEnd-frame)/manifest.fps+0.15,preferredTimescale:60000))
 let output=AVAssetReaderTrackOutput(track:track,outputSettings:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA])
 output.alwaysCopiesSampleData=false
 reader.add(output)
 guard reader.startReading() else { throw reader.error! }
 var previous:CMSampleBuffer?=output.copyNextSampleBuffer()
 var next:CMSampleBuffer?=output.copyNextSampleBuffer()
 let request=VNGeneratePersonSegmentationRequest()
 request.qualityLevel = .accurate
 request.outputPixelFormat=kCVPixelFormatType_OneComponent8
 let localStart=frame
 while frame<targetEnd {
  try autoreleasepool {
   let wanted=cameraStart+Double(frame-localStart)/manifest.fps
   while let n=next,CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(n))<wanted {
    previous=n;next=output.copyNextSampleBuffer()
   }
   let chosen:CMSampleBuffer
   if let p=previous,let n=next {
    let pt=CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(p)),nt=CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(n))
    chosen=abs(pt-wanted)<=abs(nt-wanted) ? p:n
   } else if let p=previous { chosen=p } else { throw Failure.message("No source frame for \(shot.id)") }
   guard let sourceBuffer=CMSampleBufferGetImageBuffer(chosen) else { throw Failure.message("No pixel buffer") }
   let source=CIImage(cvPixelBuffer:sourceBuffer)
   let analysis=source.transformed(by:CGAffineTransform(scaleX:0.5,y:0.5))
   let handler=VNImageRequestHandler(ciImage:analysis,orientation:.up,options:[:])
   try handler.perform([request])
   var result=source
   if let rawMask=request.results?.first?.pixelBuffer {
    let maskImage=CIImage(cvPixelBuffer:rawMask)
    let mask=maskImage.transformed(by:CGAffineTransform(scaleX:CGFloat(width)/maskImage.extent.width,y:CGFloat(height)/maskImage.extent.height))
     .applyingFilter("CIMorphologyMaximum",parameters:[kCIInputRadiusKey:3.0])
     .clampedToExtent().applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:1.0]).cropped(to:bounds)
    let background=source.clampedToExtent().applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:10.0]).cropped(to:bounds)
    result=source.applyingFilter("CIBlendWithMask",parameters:[kCIInputBackgroundImageKey:background,kCIInputMaskImageKey:mask])
   } else { failures += 1 } // Fail sharp, never blur a missing person detection.
   while !input.isReadyForMoreMediaData {
    if writer.status == .failed { throw writer.error! }
    Thread.sleep(forTimeInterval:0.002)
   }
   var pixel:CVPixelBuffer?
   guard let pool=adaptor.pixelBufferPool,CVPixelBufferPoolCreatePixelBuffer(nil,pool,&pixel)==kCVReturnSuccess,let pixel=pixel else { throw Failure.message("Output buffer allocation") }
   context.render(result,to:pixel,bounds:bounds,colorSpace:color)
   guard adaptor.append(pixel,withPresentationTime:CMTime(value:Int64(frame),timescale:fps)) else { throw writer.error! }
   frame += 1
  }
  if frame % 300 == 0 { print("Person matte \(frame) frames; \(Int(Date().timeIntervalSince(wallStart))) seconds elapsed");fflush(stdout) }
 }
 reader.cancelReading()
 print("Completed person-aware shot \(shot.id) at frame \(frame)");fflush(stdout)
}
input.markAsFinished()
let semaphore=DispatchSemaphore(value:0)
writer.finishWriting { semaphore.signal() }
semaphore.wait()
guard writer.status == .completed else { throw writer.error! }
print("COMPLETE frames=\(frame) missingMasks=\(failures) duration=\(Double(frame)/manifest.fps) output=\(out.path)")
