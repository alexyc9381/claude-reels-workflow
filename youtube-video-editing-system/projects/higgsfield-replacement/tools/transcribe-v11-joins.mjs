import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement'),project=path.join(base,'work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const rows=JSON.parse(readFileSync(path.join(project,'v11-timeline.json'))),get=id=>rows.find(r=>r.id===id),fps=30;
const sourceMode=process.argv.includes('--source'),out=path.join(work,'revision-v11',sourceMode?'edl-joins':'encoded-joins');mkdirSync(out,{recursive:true});
const ff=execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const asr='/Users/alexchensmacmini/Downloads/matchtern-longform/tools/whisper.cpp';
const checks=[['bridge',get('s033').from/fps-2,get('s033').from/fps+12],['playback-reaction',get('s034').from/fps-3,get('s034').from/fps+5],['retake-removal',get('s037').from/fps-1.3,get('s037').from/fps+8],['ending',get('s044').from/fps,(rows.at(-1).from+rows.at(-1).duration)/fps]];
const results=[];
for(const [id,start,end] of checks){
 const dest=path.join(out,id),wav=dest+'.wav';
 if(sourceMode){
  const pieces=rows.filter(r=>r.from/fps<end&&(r.from+r.duration)/fps>start).map(r=>({start:Math.round(r.start*fps)/fps+Math.max(0,start-r.from/fps),duration:Math.min(end,(r.from+r.duration)/fps)-Math.max(start,r.from/fps)}));
  const inputs=pieces.flatMap(p=>['-ss',String(p.start),'-t',String(p.duration),'-i',path.join(work,'public/obs.mp4')]);
  execFileSync(ff,['-v','error','-y',...inputs,'-filter_complex',pieces.map((_,i)=>`[${i}:a]`).join('')+`concat=n=${pieces.length}:v=0:a=1[out]`,'-map','[out]','-ac','1','-ar','16000',wav]);
 }else execFileSync(ff,['-v','error','-y','-ss',String(start),'-i',path.join(base,'outputs/higgsfield-replacement-edit-v11.mp4'),'-t',String(end-start),'-ac','1','-ar','16000',wav]);
 execFileSync(path.join(asr,'build/bin/whisper-cli'),['-m',path.join(asr,'models/ggml-small.en.bin'),'-f',wav,'-l','en','-oj','-otxt','-of',dest,'-t','3'],{stdio:'ignore'});
 const text=readFileSync(dest+'.txt','utf8').trim();results.push({id,start,end,text,retakeCandidate:/\bcut\b/i.test(text)});console.log(id,text);
}
writeFileSync(path.join(out,'review.json'),JSON.stringify({method:'Local short-window ASR; supports but does not replace human listening approval',sourceMode,results},null,2));
