import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,existsSync,linkSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawn,spawnSync,execFileSync} from 'node:child_process';
import {audioContract} from './audio-contract.mjs';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(project,'../../..'),video=path.join(repo,'video');
const require=createRequire(path.join(video,'package.json'));
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderMedia,renderStill}=require('@remotion/renderer');
const base=path.resolve(process.argv[2]||process.cwd()),work=path.join(base,'work/higgsfield-replacement');
const inputProps=JSON.parse(readFileSync(path.join(project,'roughcut.props.json')));
const digest=createHash('sha256').update(JSON.stringify(inputProps));
if(process.env.REVIEW_GL)digest.update('chromium-gl:'+process.env.REVIEW_GL);
if(process.env.REVIEW_BROWSER)digest.update('chromium-browser:'+process.env.REVIEW_BROWSER);
for(const name of readdirSync(path.join(video,'src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort())digest.update(name).update(readFileSync(path.join(video,'src/youtube',name)));
for(const name of ['cube.mov','pipeline-result.jpg'])digest.update(readFileSync(path.join(work,'public',name)));
for(const name of readdirSync(path.join(work,'public/v3')).sort())digest.update(name).update(readFileSync(path.join(work,'public/v3',name)));
if(['v4','v5','v6','v7','v8','v9'].includes(inputProps.manifest.editVersion))for(const name of readdirSync(path.join(work,'public/v4')).sort())digest.update(name).update(readFileSync(path.join(work,'public/v4',name)));
if(['v7','v8','v9'].includes(inputProps.manifest.editVersion))for(const name of readdirSync(path.join(work,'public/v7')).sort())digest.update(name).update(readFileSync(path.join(work,'public/v7',name)));
if(inputProps.manifest.editVersion==='v9')for(const name of readdirSync(path.join(work,'public/v9')).sort())digest.update(name).update(readFileSync(path.join(work,'public/v9',name)));
const hash=digest.digest('hex');
const dir=path.join(work,'chunks-'+hash.slice(0,10));mkdirSync(dir,{recursive:true});
const empty=mkdtempSync(path.join(work,'empty-public-'));
console.log('Bundling with linked media; no duplicate public-media copy');
const serveUrl=await bundle({entryPoint:path.join(video,'src/youtube-roughcut.tsx'),publicDir:empty,outDir:mkdtempSync(path.join(work,'review-bundle-')),rootDir:video});
mkdirSync(path.join(serveUrl,'public'),{recursive:true});
for(const name of ['obs.mp4','cube.mov','pipeline-result.jpg',...inputProps.manifest.cameras.map(c=>c.source)])linkSync(path.join(work,'public',name),path.join(serveUrl,'public',name));
mkdirSync(path.join(serveUrl,'public/v3'),{recursive:true});
for(const name of readdirSync(path.join(work,'public/v3')))linkSync(path.join(work,'public/v3',name),path.join(serveUrl,'public/v3',name));
if(['v4','v5','v6','v7','v8','v9'].includes(inputProps.manifest.editVersion)){
 mkdirSync(path.join(serveUrl,'public/v4'),{recursive:true});
 for(const name of readdirSync(path.join(work,'public/v4')))linkSync(path.join(work,'public/v4',name),path.join(serveUrl,'public/v4',name));
}
if(['v7','v8','v9'].includes(inputProps.manifest.editVersion)){
 mkdirSync(path.join(serveUrl,'public/v7'),{recursive:true});
 for(const name of readdirSync(path.join(work,'public/v7')))linkSync(path.join(work,'public/v7',name),path.join(serveUrl,'public/v7',name));
}
if(inputProps.manifest.editVersion==='v9'){
 mkdirSync(path.join(serveUrl,'public/v9'),{recursive:true});
 for(const name of readdirSync(path.join(work,'public/v9')))linkSync(path.join(work,'public/v9',name),path.join(serveUrl,'public/v9',name));
}
const browserExecutable=process.env.REVIEW_BROWSER||path.join(video,'node_modules/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browserMode=process.env.REVIEW_BROWSER?{chromeMode:'chrome-for-testing'}:{};
const composition=await selectComposition({serveUrl,id:'HiggsfieldRoughCut',inputProps,browserExecutable,...browserMode});
const shared={serveUrl,composition,inputProps,browserExecutable,...browserMode,...(process.env.REVIEW_GL?{chromiumOptions:{gl:process.env.REVIEW_GL}}:{}),concurrency:Number(process.env.REVIEW_CONCURRENCY||3),timeoutInMilliseconds:90000,offthreadVideoCacheSizeInBytes:256*1024*1024,mediaCacheSizeInBytes:64*1024*1024,logLevel:'error'};
if(process.env.REVIEW_AUDIO_ONLY==='1'){
 await renderMedia({...shared,codec:'wav',outputLocation:process.env.REVIEW_OUTPUT||path.join(work,'revision-v7/join-remotion-final.wav'),frameRange:(process.env.REVIEW_RANGE||'5352,5621').split(',').map(Number)});
 console.log('AUDIO AUDITION COMPLETE');process.exit(0);
}
if(process.env.REVIEW_PILOT==='1'){
 const proof=process.env.REVIEW_PROOF_DIR||path.join(work,'revision-'+(inputProps.manifest.editVersion||'v3'));mkdirSync(proof,{recursive:true});
 for(const seconds of (process.env.REVIEW_STILLS||'0,1,4,12.5,15.5,17.5,19.8,35,64,120,140,216,275').split(',').map(Number)){
  await renderStill({...shared,frame:Math.round(seconds*composition.fps),output:path.join(proof,`polish-${seconds}.png`),imageFormat:'png'});
  console.log('Proof frame',seconds);
 }
 if(process.env.REVIEW_STILLS_ONLY!=='1')await renderMedia({...shared,codec:'h264',outputLocation:process.env.REVIEW_OUTPUT||path.join(base,'outputs/higgsfield-'+(inputProps.manifest.editVersion||'v3')+'-animation-pilot.mp4'),frameRange:(process.env.REVIEW_RANGE||'0,1139').split(',').map(Number),crf:19});
 console.log('PILOT COMPLETE');process.exit(0);
}
const audio=path.join(dir,'dialogue-design-mix.wav');
// A picture-only revision may reuse a verified continuous mix, but only when
// the manifest, cue clock, sound/music code, timing/easing and sound hashes match.
const audioKey=['v6','v7','v8','v9'].includes(inputProps.manifest.editVersion)?audioContract(base):null;
if(audioKey&&!existsSync(audio)){
 for(const candidate of readdirSync(work).filter(n=>n.startsWith('chunks-'))){
  const prior=path.join(work,candidate),keyFile=path.join(prior,'audio-contract.txt'),wav=path.join(prior,'dialogue-design-mix.wav');
  if(prior!==dir&&existsSync(keyFile)&&existsSync(wav+'.complete')&&readFileSync(keyFile,'utf8').trim()===audioKey){
   linkSync(wav,audio);writeFileSync(audio+'.complete',hash);writeFileSync(path.join(dir,'audio-contract.txt'),audioKey);console.log('Reusing continuous mix: identical audio contract',candidate);break;
  }
 }
}
// Safe reuse is based on identical audio EDL, not the picture/layout hash.
const oldManifest=path.join(work,'revision-v2/roughcut-v1.props.json'),oldAudio=path.join(work,'chunks-dae27501e8/obs-only.wav');
const audioEDL=m=>JSON.stringify({fps:m.fps,obs:m.obs,segments:m.segments.map(s=>[s.start,s.end])});
if(!['v3','v4','v5','v6','v7','v8','v9'].includes(inputProps.manifest.editVersion)&&!existsSync(audio)&&existsSync(oldManifest)&&existsSync(oldAudio+'.complete')&&audioEDL(inputProps.manifest)===audioEDL(JSON.parse(readFileSync(oldManifest)).manifest)){
 linkSync(oldAudio,audio);writeFileSync(audio+'.complete',hash);console.log('Reusing verified OBS audio: source ranges and output timing identical');
}
if(!existsSync(audio+'.complete')){
 console.log('Rendering OBS narration + quiet music/SFX through Remotion; no Sony audio');
 let audioProgress=-1;
 await renderMedia({...shared,inputProps:{...inputProps,audioOnly:true},codec:'wav',outputLocation:audio,onProgress:p=>{const step=Math.floor(p.progress*10);if(step!==audioProgress){audioProgress=step;console.log('Sound pass',step*10+'%');}}});
 writeFileSync(audio+'.complete',hash);
 if(audioKey)writeFileSync(path.join(dir,'audio-contract.txt'),audioKey);
}
const chunks=[];
for(let from=0;from<composition.durationInFrames;from+=2700){
 const to=Math.min(from+2699,composition.durationInFrames-1),outputLocation=path.join(dir,`picture-${from}-${to}.mp4`);chunks.push(outputLocation);
 if(existsSync(outputLocation+'.complete')){console.log('Reusing verified completed chunk',from,to);continue;}
 console.log('Rendering picture frames',from,to);
 let last=-1;
 await renderMedia({...shared,codec:'h264',outputLocation,frameRange:[from,to],muted:true,crf:19,imageFormat:'jpeg',jpegQuality:90,onProgress:p=>{const step=Math.floor(p.progress*10);if(step!==last){last=step;console.log(`Chunk ${from}: ${step*10}%`);}}});
 writeFileSync(outputLocation+'.complete',JSON.stringify({hash,from,to}));
 console.log('Completed chunk',from,to);
}
const list=path.join(dir,'concat.txt');writeFileSync(list,chunks.map(p=>`file '${p.replaceAll("'","'\\''")}'`).join('\n')+'\n');
const bin=path.join(video,'node_modules/@remotion/compositor-darwin-arm64');
const output=path.resolve(process.env.REVIEW_OUTPUT||path.join(base,'outputs/higgsfield-replacement-edit-'+(inputProps.manifest.editVersion||'v3')+'.mp4'));
console.log('Muxing Remotion picture with continuous dialogue/design soundtrack');
const chapterMeta=path.join(project,'chapters.ffmetadata');
// Remotion's reduced FFmpeg build omits the ffmetadata demuxer. Use the installed full build for chapter muxing.
const muxBinary=existsSync(chapterMeta)?(process.env.REVIEW_FFMPEG||execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim()):path.join(bin,'ffmpeg');
const metadataArgs=existsSync(chapterMeta)?['-i',chapterMeta]:[];
const chapterArgs=existsSync(chapterMeta)?['-map_metadata','2','-map_chapters','2']:[];
console.log('Measuring continuous mix for two-pass dialogue normalization');
const analysis=spawnSync(muxBinary,['-hide_banner','-i',audio,'-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],{encoding:'utf8',maxBuffer:5e6});
if(analysis.status!==0)throw Error('Audio loudness analysis failed');
const measured=JSON.parse(analysis.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)[0]);
writeFileSync(path.join(dir,'premaster-levels.json'),JSON.stringify(measured,null,2));
const norm=`loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=${measured.input_i}:measured_TP=${measured.input_tp}:measured_LRA=${measured.input_lra}:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=false`;
// Loudnorm may append a short filter tail; cap the mux to the exact picture
// clock so the requested final-word cut cannot acquire a frozen extra frame.
await new Promise((resolve,reject)=>{const p=spawn(muxBinary,['-v','error','-y','-f','concat','-safe','0','-i',list,'-i',audio,...metadataArgs,'-map','0:v:0','-map','1:a:0',...chapterArgs,'-c:v','copy','-af',norm,'-ar','48000','-c:a','aac','-b:a','320k','-t',String(composition.durationInFrames/composition.fps),'-movflags','+faststart',output],{env:{...process.env,DYLD_LIBRARY_PATH:bin},stdio:'inherit'});p.on('error',reject);p.on('exit',c=>c===0?resolve():reject(Error('Final mux failed '+c)));});
console.log('COMPLETE',output);
