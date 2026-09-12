import {readFileSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement');
const project=path.join(base,'work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const plan=JSON.parse(readFileSync(path.join(project,'selects.json')));
const cameras=JSON.parse(readFileSync(path.join(work,'sync-verified.json')));
const vad=JSON.parse(readFileSync(path.join(work,'vad.json')));
const words=JSON.parse(readFileSync(path.join(work,'obs-words-vad.json'))).transcription;
const manifest={version:1,fps:30,obs:{source:'obs.mp4',duration:2467.5},cameras:cameras.map(({id,source,duration,obsOffsetSeconds})=>({id,source,duration,obsOffsetSeconds})),segments:[]};
const selections=[];
for(const s of plan.selects){const p=selections.at(-1);if(p&&s[0]-p[1]<=.1&&s[0]>=p[1]&&s[2]===p[2]&&s[3]===p[3]&&!!s[5]===!!p[5]){p[1]=s[1];p[4]+='; '+s[4];}else selections.push([...s]);}
for(const [a,b,ch,layout,reason,keepSilence] of selections){
 const ranges=keepSilence?[[a,b]]:vad.map(([x,y])=>[Math.max(a,x-.12),Math.min(b,y+.12)]).filter(([x,y])=>y-x>.1);
 const merged=[];
 for(const r of ranges){if(merged.length&&r[0]-merged.at(-1)[1]<=1.5)merged.at(-1)[1]=r[1];else merged.push(r);}
 for(const [start,end] of merged){
   if(end-start<.45)continue;
   const camera=manifest.cameras.find(c=>start>=c.obsOffsetSeconds&&end<=c.obsOffsetSeconds+c.duration);
   if(!camera)throw Error(`No camera coverage ${start}–${end}`);
   manifest.segments.push({id:`s${String(manifest.segments.length+1).padStart(3,'0')}`,start:Math.round(start*60)/60,end:Math.round(end*60)/60,camera:camera.id,layout,chapter:plan.chapters[ch],reason});
 }
}
writeFileSync(path.join(project,'roughcut.props.json'),JSON.stringify({manifest},null,2));
if(!existsSync(path.join(work,'public/obs.mp4')))copyFileSync('/Users/alexchensmacmini/Downloads/2026-09-10 01-46-07.mp4',path.join(work,'public/obs.mp4'));
let output=0,prev='',chapters=[],transcript=[];
const time=(s)=>`${Math.floor(s/60)}:${String(Math.floor(s)%60).padStart(2,'0')}`;
const suspect=[];
for(const s of manifest.segments){
 if(s.chapter!==prev){chapters.push({title:s.chapter,outputSeconds:Math.round(output*manifest.fps)/manifest.fps,outputFrame:Math.round(output*manifest.fps),sourceSeconds:s.start});prev=s.chapter;}
 const ws=words.filter(w=>w.offsets.from/1000>=s.start&&w.offsets.from/1000<s.end);
 const text=ws.map(w=>w.text.trim()).filter(Boolean).join(' ');
 transcript.push(`${time(output)} | ${s.id} | OBS ${s.start.toFixed(3)}–${s.end.toFixed(3)} | ${text}`);
 if(ws.some(w=>/\bcut\b|cutcut|kaka/i.test(w.text)))suspect.push({segment:s.id,start:s.start,end:s.end,text});
 output+=s.end-s.start;
}
writeFileSync(path.join(project,'chapters.json'),JSON.stringify(chapters,null,2));
writeFileSync(path.join(work,'candidate-transcript.txt'),transcript.join('\n'));
writeFileSync(path.join(work,'suspect-selects.json'),JSON.stringify(suspect,null,2));
writeFileSync(path.join(base,'outputs/higgsfield-first-pass-chapters.txt'),chapters.map(c=>`${time(c.outputSeconds)} ${c.title}`).join('\n')+'\n');
console.log(JSON.stringify({duration:output,segments:manifest.segments.length,chapters,suspect},null,2));
