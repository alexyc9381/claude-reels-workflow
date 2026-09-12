import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const project=path.resolve('work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const m=JSON.parse(readFileSync('work/higgsfield-replacement/revision-v4/roughcut-v3.props.json')).manifest;
// Phrase edits only. Quiet intervals were inspected with tight-window transcripts;
// do not strip breath/phoneme tails using an automatic silence threshold.
const edits={
 s001:[17.17,21.57],s002:[40.17,43.10],s003:[54.67,58.02],
 'r-higgsfield':[79.01,83.34],s004:[115.81,118.65],s005:[124.84,130.66],
 s006:[148.73,152.06],'r-teaser':[1992.43,1996.82],
 // The failed "next thing" take and its cut-cut marker precede this clean onset.
 s016:[800.46,815.77],
 // Keep the no-code reassurance once, then begin the final take at its instruction.
 s019:[985.76,988.40],s045:[2454.08,2459.03],
};
for(const s of m.segments)if(edits[s.id]){[s.start,s.end]=edits[s.id];s.reason+='; v4 phrase-boundary repair';}
m.editVersion='v4';
let seconds=0,frame=0;
const timeline=m.segments.map(s=>{seconds+=s.end-s.start;const end=Math.round(seconds*m.fps),r={...s,from:frame,duration:end-frame};frame=end;return r;});
const chapters=timeline.filter((s,i)=>!i||s.chapter!==timeline[i-1].chapter).map(s=>({title:s.chapter,frame:s.from,seconds:s.from/m.fps}));
writeFileSync(path.join(project,'roughcut.props.json'),JSON.stringify({manifest:m},null,2));
writeFileSync(path.join(project,'v4-timeline.json'),JSON.stringify(timeline,null,2));
writeFileSync(path.join(project,'chapters.json'),JSON.stringify(chapters,null,2));
writeFileSync(path.join(project,'chapters.ffmetadata'),';FFMETADATA1\n'+chapters.map((c,i)=>`[CHAPTER]\nTIMEBASE=1/30\nSTART=${c.frame}\nEND=${chapters[i+1]?.frame??frame}\ntitle=${c.title}\n`).join(''));
writeFileSync('outputs/higgsfield-v4-chapters.txt',chapters.map(c=>`${Math.floor(c.seconds/60)}:${String(Math.floor(c.seconds)%60).padStart(2,'0')} ${c.title}`).join('\n')+'\n');
console.log(JSON.stringify({frames:frame,seconds:frame/m.fps,chapters},null,2));
