import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement');
const project=path.join(base,'work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const m=JSON.parse(readFileSync(path.join(project,'roughcut.props.json'))).manifest;
const before=JSON.parse(readFileSync(path.join(work,'revision-v2/roughcut-v1.props.json'))).manifest;
const changed=m.segments.filter(s=>s.layout!=='presenter'&&before.segments.find(p=>p.id===s.id).layout==='presenter');
const out=path.join(work,'revision-v2/slide-audit');mkdirSync(out,{recursive:true});
const ffmpeg=execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const samples=[];
for(const s of changed){
 const times=[s.start+.05,s.end-.05];for(let t=s.start+2.5;t<s.end;t+=5)times.push(t);
 for(const time of times){
  const file=path.join(out,`${s.id}-${time.toFixed(2)}.png`);
  execFileSync(ffmpeg,['-v','error','-y','-ss',String(time),'-i',path.join(work,'public/obs.mp4'),'-frames:v','1',file]);
  samples.push({id:s.id,time,file});
 }
}
const ocr=execFileSync('/Users/alexchensmacmini/Downloads/obs-edit-0820/tools/ocrbin',samples.map(s=>s.file),{encoding:'utf8',maxBuffer:20e6});
writeFileSync(path.join(out,'ocr.txt'),ocr);
const flags=ocr.split('\n').filter(l=>/secret|token|billing|card number|sk-|@[a-z0-9.-]+\.[a-z]{2,}|OBS Studio|Stop Recording/i.test(l)).map(l=>({file:path.basename(l.split('\t')[0]),flags:[...l.matchAll(/secret|token|billing|card number|sk-|@[a-z0-9.-]+\.[a-z]{2,}|OBS Studio|Stop Recording/gi)].map(m=>m[0].startsWith('@')?'email':m[0])}));
writeFileSync(path.join(out,'audit.json'),JSON.stringify({samples,flags},null,2));
console.log(JSON.stringify({changedSegments:changed.map(s=>s.id),samples:samples.length,flags},null,2));
