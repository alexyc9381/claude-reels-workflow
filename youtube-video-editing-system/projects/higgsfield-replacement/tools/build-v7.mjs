import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const project=path.resolve('work/repos/claude-reels-workflow/youtube-video-editing-system/projects/higgsfield-replacement');
const m=JSON.parse(readFileSync('work/higgsfield-replacement/revision-v7/roughcut-v6.props.json')).manifest;
const get=id=>m.segments.find(s=>s.id===id);
// Keep the complete original clause instead of cutting near the final consonant
// of code. Join after "download it" to the clean "and upload it into Claude here".
get('r-no-code').end=977+16/30;
get('r-no-code').reason+='; v7 preserve whole original code/download clause';
get('s019').start=987;get('s019').end=988+17/60;
get('s019').reason+='; v7 clean and-upload continuation; omit repeated setup, trailing silence and next-take Now';
// Keep the useful story explanation, omit the opening restart. This also
// excludes the neighboring raw cut/cut take markers; no threshold word cuts.
get('s026').start=1286.72;get('s026').end=1301.95;
get('s026').reason+='; v7 start at clean it proposed phrase, preserve final word tail';
// Explicit user removal: billing detour. Continue at original result take.
m.segments=m.segments.filter(s=>s.id!=='s028');
m.editVersion='v7';
// Retiming uses exact subsets of the already segmented, silent camera plate.
// No second encoding or fresh matte inference. Fail if a requested row is not
// covered by this plate; never drift silently onto the adjacent source take.
const plateRows=JSON.parse(readFileSync(path.join(project,'person-plate-v7-segments.json')));
const extension=JSON.parse(readFileSync(path.join(project,'person-plate-v7-no-code.props.json'))).manifest;
const extensionShot=extension.segments[0],extensionSource='v7/no-code-complete.mp4';
const extensionHash=createHash('sha256').update(readFileSync(path.resolve('work/higgsfield-replacement/public',extensionSource))).digest('hex');
m.cameraPlate={source:'v7/presenter-background.mp4',sha256:'bf0beee90379ab63ed4b9f24ec00ca7ca6cc84125f68998edb67f6433b18645e',starts:{},sources:{'r-no-code':extensionSource},sourceHashes:{[extensionSource]:extensionHash}};
let seconds=0,frame=0;
const rows=m.segments.map(s=>{seconds+=s.end-s.start;const end=Math.round(seconds*m.fps),camera=m.cameras.find(c=>c.id===s.camera),r={...s,from:frame,duration:end-frame,cameraSource:camera?.source,cameraStart:camera?s.start-camera.obsOffsetSeconds:0};frame=end;return r;});
for(const r of rows){
 const p=r.id===extensionShot.id?{...extensionShot,from:0,duration:Math.round((extensionShot.end-extensionShot.start)*extension.fps)}:plateRows.find(p=>p.id===r.id);
 const shift=Math.round(r.start*m.fps)-Math.round(p.start*m.fps);
 if(shift<0||shift+r.duration>p.duration)throw Error('Camera plate does not cover '+r.id);
 r.cameraPlateStart=p.from+shift;r.cameraPlateSource=m.cameraPlate.sources[r.id]??m.cameraPlate.source;m.cameraPlate.starts[r.id]=r.cameraPlateStart;
}
const chapters=rows.filter((s,i)=>!i||s.chapter!==rows[i-1].chapter).map(s=>({title:s.chapter,frame:s.from,seconds:s.from/m.fps}));
for(const [file,data] of [['roughcut.props.json',{manifest:m}],['v7-timeline.json',rows],['chapters.json',chapters]])writeFileSync(path.join(project,file),JSON.stringify(data,null,2));
writeFileSync(path.join(project,'chapters.ffmetadata'),';FFMETADATA1\n'+chapters.map((c,i)=>`[CHAPTER]\nTIMEBASE=1/30\nSTART=${c.frame}\nEND=${chapters[i+1]?.frame??frame}\ntitle=${c.title}\n`).join(''));
writeFileSync('outputs/higgsfield-v7-chapters.txt',chapters.map(c=>`${Math.floor(c.seconds/60)}:${String(Math.floor(c.seconds)%60).padStart(2,'0')} ${c.title}`).join('\n')+'\n');
console.log(JSON.stringify({frames:frame,seconds:frame/m.fps,segments:rows.length,guideAt:rows.find(s=>s.id==='s024').from/m.fps,chapters},null,2));
