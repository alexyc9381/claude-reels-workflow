import {spawn} from 'node:child_process';
import {mkdirSync,existsSync,writeFileSync,statSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd();
const out=path.join(base,'work/higgsfield-replacement');
const bin=path.join(base,'work/repos/claude-reels-workflow/video/node_modules/@remotion/compositor-darwin-arm64');
mkdirSync(path.join(out,'public'),{recursive:true});
const sizes={C0004:9462736330,C0005:9731178922,C0006:3624107592,C0007:9060072686};
for(const id of Object.keys(sizes)){
 const input=`/Volumes/Untitled/PRIVATE/M4ROOT/CLIP/${id}.MP4`;
 if(statSync(input).size!==sizes[id])throw Error(`Source byte size differs from Drive: ${id}`);
 const proxy=path.join(out,'public',`${id}-1080.mp4`),wav=path.join(out,`${id}-sync-only.wav`);
 if(existsSync(proxy+'.complete')){console.log('Already complete',id);continue;}
 console.log('START',id,new Date().toISOString());
 const args=['-hide_banner','-nostdin','-threads','4','-i',input,'-map','0:v:0','-vf','scale=1920:1080','-c:v','h264_videotoolbox','-b:v','6000k','-pix_fmt','yuv420p','-an','-movflags','+faststart','-y',proxy,'-map','0:a:0','-vn','-ac','1','-ar','16000','-c:a','pcm_s16le','-y',wav,'-stats_period','30'];
 await new Promise((resolve,reject)=>{
  const p=spawn(path.join(bin,'ffmpeg'),args,{env:{...process.env,DYLD_LIBRARY_PATH:bin},stdio:['ignore','inherit','inherit']});
  p.on('exit',c=>c===0?resolve():reject(Error(`${id} failed: ${c}`)));
  p.on('error',reject);
 });
 writeFileSync(proxy+'.complete',JSON.stringify({id,original:input,bytes:sizes[id],proxy,scratchAudio:wav,finalAudio:false,completed:new Date().toISOString()},null,2));
 console.log('COMPLETE',id,new Date().toISOString());
}
