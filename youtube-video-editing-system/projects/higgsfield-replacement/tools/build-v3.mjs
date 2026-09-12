import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd(),project=path.resolve('work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const backup=JSON.parse(readFileSync(path.resolve('work/higgsfield-replacement/revision-v3/roughcut-v2.props.json')));
const m=structuredClone(backup.manifest);
// Manual, phrase-level review ranges. No VAD intersection/splitting.
const edits={s001:[17.08,22.03],s004:[115.73,118.80],s008:[306.04,309.85],s009:[338.17,344.94],s010:[353.80,365.24],s011:[502.52,517.76],s012:[521.13,533.88],s014:[753.07,761.90],s015:[778.90,796.99],s016:[799.65,815.86],s017:[932.76,940.04],s018:[961.73,966.52],s019:[984.82,988.48],s020:[995.48,1018.14],s021:[1034.70,1069.93],s023:[1081.08,1088.62],s024:[1246.45,1259.33],s025:[1266.20,1269.25],s026:[1283.90,1301.70],s027:[1313.02,1329.17],s028:[1438.32,1450.08],s029:[1526.43,1541.10],s030:[1541.10,1576.63],s031:[1612.18,1620.53],s032:[1805.32,1810.00],s033:[1849.13,1863.80],s034:[1873.30,1887.11],s035:[1892.02,1898.04],s036:[1981.23,2006.45],s037:[2017.60,2029.37],s038:[2151.54,2158.04],s039:[2166.10,2169.00],s040:[2173.77,2176.38],s041:[2205.93,2210.43],s042:[2220.75,2225.10],s043:[2269.26,2274.59],s044:[2442.85,2446.48],s045:[2454.08,2459.68]};
const add=(id,start,end,anchor,reason,extra={})=>{
 const ref=m.segments.find(s=>s.id===anchor),camera=m.cameras.find(c=>start>=c.obsOffsetSeconds&&end<=c.obsOffsetSeconds+c.duration);
 return {id,start,end,camera:camera.id,layout:ref.layout,chapter:ref.chapter,reason,...extra};
};
const after={
 s003:[add('r-higgsfield',78.99,83.49,'s003','Restore named Higgsfield setup before the pronoun their; original price claim pending publication review')],
 s006:[add('r-teaser',1992.43,1993.85,'s006','Complete This is insane reaction only; ends before I cannot continuation; result deliberately obscured',{layout:'screen-presenter',teaser:true})],
 s010:[add('r-direct',389.20,401.40,'s010','Restore complete subscription-budget/direct-access explanation'),add('r-features',413.94,422.19,'s010','Restore feature-gating setup')],
 s013:[add('r-safety',627.32,630.08,'s013','Restore spending-warning bridge; provider cap remains a pickup gate')],
 s018:[add('r-no-code',972.20,976.40,'s018','Restore no-additional-code reassurance; boundary audition ends after code and before you just have')],
 s043:[add('r-outlook',2329.73,2335.50,'s043','Restore closing opinion before the practical next step')],
};
const rows=[];
for(const old of m.segments){
 if(old.id==='s022')continue;
 const s={...old};if(edits[s.id])[s.start,s.end]=edits[s.id];
 if(['s016','s017','s018','s019','s028','s031'].includes(s.id))s.layout='screen-presenter';
 if(s.id==='s016')s.screenRedaction='credentials';
 if(s.id==='s028')s.screenRedaction='billing';
 if(s.id==='s017')s.screenRedaction='credentials';
 rows.push(s,...(after[s.id]||[]));
}
m.segments=rows;m.editVersion='v3';
let seconds=0,frame=0;const timeline=rows.map(s=>{seconds+=s.end-s.start;const endFrame=Math.round(seconds*m.fps);const r={...s,from:frame,duration:endFrame-frame};frame=endFrame;return r;});
const chapters=timeline.filter((s,i)=>i===0||s.chapter!==timeline[i-1].chapter).filter(s=>s.id!=='r-teaser').map(s=>({title:s.chapter,frame:s.from,seconds:s.from/m.fps}));
const stamp=t=>`${Math.floor(t/60)}:${String(Math.floor(t)%60).padStart(2,'0')}`;
writeFileSync(path.join(project,'roughcut.props.json'),JSON.stringify({manifest:m},null,2));
writeFileSync(path.join(project,'v3-timeline.json'),JSON.stringify(timeline,null,2));
writeFileSync(path.join(project,'chapters.json'),JSON.stringify(chapters,null,2));
writeFileSync(path.join(project,'chapters.ffmetadata'),';FFMETADATA1\n'+chapters.map((c,i)=>`[CHAPTER]\nTIMEBASE=1/30\nSTART=${c.frame}\nEND=${chapters[i+1]?.frame??frame}\ntitle=${c.title}\n`).join(''));
writeFileSync(path.join(base,'outputs/higgsfield-v3-chapters.txt'),chapters.map(c=>`${stamp(c.seconds)} ${c.title}`).join('\n')+'\n');
console.log(JSON.stringify({seconds:frame/m.fps,frames:frame,segments:rows.length,chapters},null,2));
