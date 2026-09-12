import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const project=path.resolve('work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const m=JSON.parse(readFileSync('work/higgsfield-replacement/revision-v6/roughcut-v5.props.json')).manifest;
// OBS speech analysis: teaser speech ends ~1996.275; next onset ~242.092.
// Keep ~90 ms on both sides. Do not threshold-cut words or alter playback speed.
const teaser=m.segments.find(s=>s.id==='r-teaser');
teaser.end=1996.37;
teaser.reason+='; v6 remove 450 ms trailing dead air, preserve spoken reaction tail';
const bridge=m.segments.find(s=>s.id==='s007');
bridge.start=242.00;
bridge.reason+='; v6 remove 133 ms leading dead air, retain complete follow-along sentence';
m.editVersion='v6';
let seconds=0,frame=0;
const rows=m.segments.map(s=>{seconds+=s.end-s.start;const end=Math.round(seconds*m.fps),r={...s,from:frame,duration:end-frame};frame=end;return r;});
const chapters=rows.filter((s,i)=>!i||s.chapter!==rows[i-1].chapter).map(s=>({title:s.chapter,frame:s.from,seconds:s.from/m.fps}));
writeFileSync(path.join(project,'roughcut.props.json'),JSON.stringify({manifest:m},null,2));
writeFileSync(path.join(project,'v6-timeline.json'),JSON.stringify(rows,null,2));
writeFileSync(path.join(project,'chapters.json'),JSON.stringify(chapters,null,2));
writeFileSync(path.join(project,'chapters.ffmetadata'),';FFMETADATA1\n'+chapters.map((c,i)=>`[CHAPTER]\nTIMEBASE=1/30\nSTART=${c.frame}\nEND=${chapters[i+1]?.frame??frame}\ntitle=${c.title}\n`).join(''));
writeFileSync('outputs/higgsfield-v6-chapters.txt',chapters.map(c=>`${Math.floor(c.seconds/60)}:${String(Math.floor(c.seconds)%60).padStart(2,'0')} ${c.title}`).join('\n')+'\n');
console.log(JSON.stringify({frames:frame,seconds:frame/m.fps,removedDeadAir:.583333333,chapters},null,2));
