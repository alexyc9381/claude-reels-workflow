import Foundation
import AVFoundation
import Vision
import CoreImage
import CoreVideo
import Metal

// Subject-aware, subtle background blur. No audio and no playback-rate changes.
let args=CommandLine.arguments
if args.count < 3 { fatalError("Usage: crop-camera input.mp4 output.mp4 [blur-radius=7]") }
let src=URL(fileURLWithPath:args[1]), dst=URL(fileURLWithPath:args[2])
let radius=Double(args.count>3 ? args[3] : "7") ?? 7
let asset=AVURLAsset(url:src)
guard let track=asset.tracks(withMediaType:.video).first else {fatalError("No camera video")}
let reader=try AVAssetReader(asset:asset)
let readerOutput=AVAssetReaderTrackOutput(track:track,outputSettings:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA])
readerOutput.alwaysCopiesSampleData=false;reader.add(readerOutput)
try? FileManager.default.removeItem(at:dst)
let writer=try AVAssetWriter(outputURL:dst,fileType:.mov)
let width=820,height=606
let wi=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.proRes4444,AVVideoWidthKey:width,AVVideoHeightKey:height,AVVideoColorPropertiesKey:[AVVideoColorPrimariesKey:AVVideoColorPrimaries_ITU_R_709_2,AVVideoTransferFunctionKey:AVVideoTransferFunction_ITU_R_709_2,AVVideoYCbCrMatrixKey:AVVideoYCbCrMatrix_ITU_R_709_2]])
wi.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:wi,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA,kCVPixelBufferWidthKey as String:width,kCVPixelBufferHeightKey as String:height,kCVPixelBufferIOSurfacePropertiesKey as String:[:]])
writer.add(wi)
let context=CIContext(mtlDevice:MTLCreateSystemDefaultDevice()!,options:[.cacheIntermediates:false])
let request=VNGeneratePersonSegmentationRequest();request.qualityLevel = .balanced;request.outputPixelFormat=kCVPixelFormatType_OneComponent8
// Remove the blue/teal chair in the lower-left background using a restricted
// chroma matte and nearby clean wall pixels. Skin, shirt and hair are outside
// the matte; the original camera timing and subject remain unchanged.
let blueKey=CIColorKernel(source: """
kernel vec4 blueKey(__sample s) {
 vec2 p=destCoord();
 float roi=(1.0-smoothstep(260.0,300.0,p.x))*(1.0-smoothstep(185.0,220.0,p.y));
 float key=smoothstep(0.005,0.025,s.g-s.r)*smoothstep(-0.02,0.01,s.b-s.r)*roi;
 return vec4(key,key,key,1.0);
}
""")!
let protectKey=CIColorKernel(source: """
kernel vec4 protect(__sample person,__sample object) {
 float a=person.r*(1.0-object.r);return vec4(a,a,a,1.0);
}
""")!
let regionKey=CIColorKernel(source: """
kernel vec4 cleanupRegion(__sample s) {
 vec2 p=destCoord();
 float a=(1.0-smoothstep(230.0,310.0,p.x))*(1.0-smoothstep(170.0,245.0,p.y));
 return vec4(a,a,a,1.0);
}
""")!
let wallKernel=CIKernel(source: """
kernel vec4 cleanWall(sampler source) {
 vec2 p=destCoord();
 return sample(source,samplerTransform(source,vec2(clamp(p.x,25.0,85.0),300.0+p.y*0.12)));
}
""")!

reader.startReading();writer.startWriting();writer.startSession(atSourceTime:.zero)
var count=0
while (args.count<5 || count<Int(args[4])!), let sample=readerOutput.copyNextSampleBuffer() {
 try autoreleasepool {
  guard let buffer=CMSampleBufferGetImageBuffer(sample) else {throw NSError(domain:"Frame",code:1)}
  let raw=CIImage(cvPixelBuffer:buffer)
  let full=raw.transformed(by:CGAffineTransform(scaleX:1920/raw.extent.width,y:1080/raw.extent.height))
  let originalFrame=full.cropped(to:CGRect(x:275,y:156,width:1250,height:924)).transformed(by:CGAffineTransform(translationX:-275,y:-156)).transformed(by:CGAffineTransform(scaleX:0.656, y:0.656)).cropped(to:CGRect(x:0,y:0,width:width,height:height))
  let objectMask=blueKey.apply(extent:originalFrame.extent,arguments:[originalFrame])!.applyingFilter("CIMorphologyMaximum",parameters:[kCIInputRadiusKey:2]).applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:1.2]).cropped(to:originalFrame.extent)
  let wall=wallKernel.apply(extent:originalFrame.extent,roiCallback:{_,rect in CGRect(x:0,y:280,width:110,height:90)},arguments:[originalFrame])!
  let frame=wall.applyingFilter("CIBlendWithMask",parameters:[kCIInputBackgroundImageKey:originalFrame,kCIInputMaskImageKey:objectMask])
  let small=frame.transformed(by:CGAffineTransform(scaleX:0.5,y:0.5))
  try VNImageRequestHandler(ciImage:small,options:[:]).perform([request])
  guard let maskBuffer=request.results?.first?.pixelBuffer else {throw NSError(domain:"Missing person mask",code:2)}
  let lowMask=CIImage(cvPixelBuffer:maskBuffer)
  let mask=lowMask.transformed(by:CGAffineTransform(scaleX:Double(width)/lowMask.extent.width,y:Double(height)/lowMask.extent.height)).clampedToExtent().applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:1.8]).cropped(to:frame.extent)
  let bgOriginal=frame.clampedToExtent().applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:radius]).cropped(to:frame.extent)
  let cleanupRegion=regionKey.apply(extent:frame.extent,arguments:[frame])!
  let bg=wall.applyingFilter("CIBlendWithMask",parameters:[kCIInputBackgroundImageKey:bgOriginal,kCIInputMaskImageKey:cleanupRegion])
  let protectedMask=protectKey.apply(extent:frame.extent,arguments:[mask,objectMask])!
  let sharpSubject=frame.applyingFilter("CIBlendWithMask",parameters:[kCIInputBackgroundImageKey:bg,kCIInputMaskImageKey:protectedMask])
  let black=CIImage(color:CIColor(red:0,green:0,blue:0)).cropped(to:frame.extent)
  let clear=CIImage(color:CIColor(red:0,green:0,blue:0,alpha:0)).cropped(to:frame.extent)
  let plate=CIFilter(name:"CIRoundedRectangleGenerator",parameters:["inputExtent":CIVector(cgRect:CGRect(x:0,y:-48,width:820,height:549)),"inputRadius":48,"inputColor":CIColor(red:1,green:1,blue:1)])!.outputImage!.composited(over:black).cropped(to:frame.extent)
  let hair=mask.cropped(to:CGRect(x:0,y:501,width:820,height:105)).composited(over:black)
  let alpha=plate.applyingFilter("CIMaximumCompositing",parameters:[kCIInputBackgroundImageKey:hair]).cropped(to:frame.extent)
  let result=sharpSubject.applyingFilter("CIBlendWithMask",parameters:[kCIInputBackgroundImageKey:clear,kCIInputMaskImageKey:alpha])
  while !wi.isReadyForMoreMediaData {if writer.status == .failed {throw writer.error!}; Thread.sleep(forTimeInterval:0.005)}
  var output:CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&output)
  guard let output=output else {throw NSError(domain:"Pixel pool",code:3)}
  context.render(result,to:output,bounds:CGRect(x:0,y:0,width:width,height:height),colorSpace:CGColorSpace(name:CGColorSpace.itur_709))
  if !adaptor.append(output,withPresentationTime:CMSampleBufferGetPresentationTimeStamp(sample)) {throw writer.error ?? NSError(domain:"Append",code:4)}
  count += 1
  if count%150 == 0 {print("Blurred \(count) frames");fflush(stdout)}
 }
}
if reader.status == .failed {throw reader.error!}
wi.markAsFinished()
let done=DispatchSemaphore(value:0);writer.finishWriting {done.signal()};done.wait()
if writer.status != .completed {throw writer.error ?? NSError(domain:"Writer",code:5)}
print("Complete: \(count) frames; original timing retained")
