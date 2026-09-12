import {execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement');
const input=path.resolve(process.argv[2]||path.join(base,'outputs/higgsfield-replacement-edit-v9.mp4'));
const prefix=process.argv[3]||'final';
const out=path.join(work,'revision-v9',prefix+'-joins');mkdirSync(out,{recursive:true});
const ff=process.env.V9_FFMPEG||execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const asr=path.join(os.homedir(),'Downloads/matchtern-longform/tools/whisper.cpp');
const whisper=process.env.V9_WHISPER||path.join(asr,'build/bin/whisper-cli');
const model=process.env.V9_WHISPER_MODEL||path.join(asr,'models/ggml-small.en.bin');
const results=[];
for(const [id,start,end] of [['or',279.7,284.7],['seedance',392.8,401],['second-of-all',418.8,427],['reveal',437.7,448.5],['last-word',455,461.53333333333336]]){
 const dest=path.join(out,id),wav=dest+'.wav';
 execFileSync(ff,['-v','error','-y','-ss',String(start),'-i',input,'-t',String(end-start),'-ac','1','-ar','16000',wav]);
 execFileSync(whisper,['-m',model,'-f',wav,'-l','en','-oj','-otxt','-of',dest,'-t','3'],{stdio:'ignore'});
 const text=readFileSync(dest+'.txt','utf8').trim();
 results.push({id,start,end,text,retakeCandidate:/\bcut\b/i.test(text)});console.log(id,text);
}
writeFileSync(path.join(out,'review.json'),JSON.stringify({input,method:'Local short-window ASR; not human listening approval',results},null,2)+'\n');
