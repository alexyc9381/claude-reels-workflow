import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement'),video=path.join(repo,'video'),src=path.join(video,'src/youtube');
const require=createRequire(path.join(video,'package.json')),{transformSync}=require('esbuild');
const read=n=>readFileSync(path.join(src,n),'utf8');
const evaluate=(code,scope={})=>{const box={module:{exports:{}},...scope};runInNewContext(transformSync(code,{loader:'ts',format:'cjs'}).code,box);return box.module.exports;};
const m=JSON.parse(readFileSync(path.join(project,'roughcut.props.json'))).manifest,old=JSON.parse(readFileSync(path.join(project,'roughcut-v10-baseline.props.json'))).manifest;
const timing=evaluate(read('roughcut-timing.ts')),rows=timing.roughTimeline(m),before=timing.roughTimeline(old),get=id=>rows.find(r=>r.id===id);
assert.deepEqual(m.cameras,old.cameras);assert.deepEqual(m.obs,old.obs);assert.equal(rows.length,47);assert.equal(timing.roughChapters(m).length,6);
assert.equal(get('s032'),undefined);assert.equal(get('s033').end,get('r-veo-playthrough').start);assert.equal(get('r-veo-playthrough').end,1870.82);assert.equal(get('r-veo-playthrough').layout,'screen');
assert.equal(get('s034').start,1874.98);assert.equal(get('s037').start,2017.58);assert.equal(get('s045').end,2459.03);
for(const r of rows){
 assert.ok(r.duration>0&&r.start>=0&&r.end<=m.obs.duration);
 const b=before.find(b=>b.id===r.id);
 if(!['r-veo-playthrough','s034','s037'].includes(r.id)){assert.equal(r.start,b.start);assert.equal(r.end,b.end);}
 if(r.cameraSource){assert.equal(r.cameraPlateSource,b.cameraPlateSource);assert.ok(Math.abs((r.cameraPlateStart-b.cameraPlateStart)/m.fps-(r.start-b.start))<1/m.fps);assert.ok(r.duration<=r.cameraPlateDuration+1);assert.ok(existsSync(path.join(base,'work/higgsfield-replacement/public',r.cameraPlateSource)));}
}
for(const id of ['s016','s017'])assert.equal(get(id).screenRedaction,'credentials');
const assembly=read('RoughCut.tsx'),polish=read('YouTubeV9.tsx'),scenes=read('ScenesV11.tsx');
assert.match(assembly,/data-audio-role="obs-narration" src=\{staticFile\(m.obs.source\)\}/);
assert.match(assembly,/data-privacy-mask/);assert.match(assembly,/Four-frame J-cut/);
for(const n of ['RoughCut.tsx','StoryScenesV10.tsx','YouTubeV9.tsx','ScenesV11.tsx'])for(const tag of read(n).match(/<OffthreadVideo[\s\S]*?\/>/g)||[])assert.match(tag,/\bmuted\b/);
assert.doesNotMatch(assembly+polish+scenes,/Date\.now|Math\.random|setTimeout|requestAnimationFrame/);
assert.match(read('cinematic-brand.ts'),/google-fonts\/Manrope/);assert.match(read('YouTubeV8Primitives.tsx'),/symmetric-eyes/);
const easing=evaluate(read('glass-motion.ts')),focus=evaluate(read('typing-focus.ts').replace(/^import .*\n/,''),easing),{w,h}=focus.screenViewport;
assert.equal(w,1872);assert.ok(w>1760);
for(const id of ['s020','s021','s023','s024','s025','s027','s030','s031'])for(let t=0;t<get(id).duration/m.fps;t+=1/m.fps){const tr=focus.screenTransform(focus.typingFocus(id,t).zoom),b=focus.inputBounds,k=w/1920;for(const [x,y] of [[b.left,b.top],[b.right,b.bottom]]){const px=x*k*tr.zoom+tr.tx,py=(y-focus.sourceCrop.top)*k*tr.zoom+tr.ty;assert.ok(px>=1.99&&px<=w-1.99,id+' x');assert.ok(py>=1.99&&py<=h-1.99,id+' y');}}
const full=evaluate(polish.slice(polish.indexOf('export const fullScenes='),polish.indexOf('const Definition:')),{roughTimeline:timing.roughTimeline}).fullScenes(m);
assert.equal(full.length,10);for(let i=1;i<full.length;i++)assert.ok(full[i].from>=full[i-1].from+full[i-1].duration);
const cues=evaluate(polish.slice(polish.indexOf('export const v9Cues:'),polish.indexOf('export const chapterTitles'))).v9Cues;
for(const c of cues)assert.ok(get(c.id).duration>c.offset*m.fps);
assert.ok(!cues.some(c=>c.id==='s036'&&c.offset===16),'Bonus must not overlap a duplicate detail card');
assert.ok(get('s036').from/m.fps+22<get('s038').from/m.fps,'Gift must finish before the footage-first reveal');
assert.match(polish,/SetupChecklistV11/);assert.match(polish,/const CredentialSequence=CredentialV11/);
assert.match(read('ScenesV9.tsx'),/export const OutroV9=InstallFinaleV11/);
assert.match(read('SupportingScenesV9.tsx'),/if\(cueId==='s026:10.2'\)return <RooftopBeatV11/);
assert.match(scenes,/Surface w=\{world\}/);assert.match(scenes,/Occluder/);
assert.match(read('StoryScenesV10.tsx'),/size=\{98\}/);
assert.doesNotMatch(polish,/OriginalClaude|Companion|cgi-review/);
for(const file of readdirSync(src).filter(n=>/\.tsx?$/.test(n)))transformSync(read(file),{loader:file.endsWith('tsx')?'tsx':'ts'});
console.log('PASS V11: 47 segments; source deltas; OBS-only audio; camera sync; privacy; 6 chapters; input zoom safety; distinct scene dispatch; bonus clearance; TS/TSX parsing.');
