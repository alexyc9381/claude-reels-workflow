import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),video=path.join(repo,'video');
const project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement'),work=path.join(base,'work/higgsfield-replacement'),src=path.join(video,'src/youtube');
const require=createRequire(path.join(video,'package.json')),{transformSync}=require('esbuild');
const read=n=>readFileSync(path.join(src,n),'utf8');
const evaluate=(code,scope={})=>{const box={module:{exports:{}},...scope};runInNewContext(transformSync(code,{loader:'ts',format:'cjs'}).code,box);return box.module.exports;};
const m=JSON.parse(readFileSync(path.join(project,'roughcut.props.json'))).manifest;
const old=JSON.parse(readFileSync(path.join(work,'revision-v5/roughcut.props.json'))).manifest;
assert.equal(m.editVersion,'v5');assert.deepEqual(m.cameras,old.cameras);assert.deepEqual(m.obs,old.obs);
const timing=evaluate(read('roughcut-timing.ts')),rows=timing.roughTimeline(m),chapters=timing.roughChapters(m),get=id=>rows.find(s=>s.id===id);
assert.equal(rows.length,51);assert.equal(chapters.length,6);assert.ok(get('r-higgsfield').from<get('s004').from);
assert.ok(get('r-teaser').duration>=130);assert.equal(get('s016').start,800.46);assert.equal(get('s019').start,985.76);assert.equal(get('s045').end,2459.03);
for(const r of rows){assert.ok(r.duration>0);assert.ok(r.start>=0&&r.end<=m.obs.duration);if(r.cameraSource){assert.ok(r.cameraStart>=0);const c=m.cameras.find(c=>c.source===r.cameraSource);assert.ok(r.cameraStart+r.duration/m.fps<c.duration+.04);}}
for(const id of ['s016','s017','s028'])assert.ok(get(id).screenRedaction);
const assembly=read('RoughCut.tsx'),polish=read('YouTubeV5.tsx'),scenes=read('YouTubeV5Scenes.tsx');
assert.match(assembly,/data-audio-role="obs-narration" src=\{staticFile\(m.obs.source\)\}/);
for(const code of [assembly,polish,read('YouTubeV5Primitives.tsx')])for(const tag of code.match(/<OffthreadVideo[\s\S]*?\/>/g)||[])assert.match(tag,/\bmuted\b/);
assert.match(assembly,/data-privacy-mask/);assert.match(assembly,/Four-frame J-cut/);
assert.doesNotMatch(assembly+polish+scenes,/Date\.now|Math\.random|setTimeout|requestAnimationFrame/);
const easing=evaluate(read('glass-motion.ts'));
const focus=evaluate(read('typing-focus.ts').replace(/^import .*\n/,''),easing);
for(const id of ['s020','s021','s023','s024','s025','s027','s030','s031'])for(let t=0;t<get(id).duration/m.fps;t+=1/30){
 const q=focus.typingFocus(id,t),tr=focus.screenTransform(q.zoom),b=focus.inputBounds,k=1760/1920;
 for(const [x,y] of [[b.left,b.top],[b.right,b.bottom]]){const px=x*k*tr.zoom+tr.tx,py=y*k*tr.zoom+tr.ty;assert.ok(px>=27.99&&px<=1760-27.99,`${id} input x ${px}`);assert.ok(py>=27.99&&py<=990-27.99,`${id} input y ${py}`);}
}
const fullCode=polish.slice(polish.indexOf('export const fullScenes='),polish.indexOf('const Definition:'));
const full=evaluate(fullCode,{roughTimeline:timing.roughTimeline}),fulls=full.fullScenes(m);
assert.equal(fulls.length,8);for(let i=1;i<fulls.length;i++)assert.ok(fulls[i].from>=fulls[i-1].from+fulls[i-1].duration);
const cueCode=polish.slice(polish.indexOf('export const v4Cues:'),polish.indexOf('export const chapterTitles'));
const {v4Cues}=evaluate(cueCode);assert.ok(v4Cues.length>=35);
const evCode=polish.slice(polish.indexOf('export const soundEvents='),polish.indexOf('export const YouTubeSound:'));
const {soundEvents}=evaluate(evCode,{roughTimeline:timing.roughTimeline,roughChapters:timing.roughChapters,v4Cues,fullScenes:full.fullScenes});
const events=soundEvents(m);assert.ok(events.length>80);assert.ok(!events.some(e=>/chime|ding|glass/.test(e.name)));
for(const a of JSON.parse(readFileSync(path.join(work,'public/v4/asset-ledger.json'))))assert.equal(createHash('sha256').update(readFileSync(path.join(work,'public/v4',a.file))).digest('hex'),a.sha256);
assert.equal(createHash('sha256').update(readFileSync(path.join(work,'public/cube.mov'))).digest('hex'),'0e9263ca447bb7e652bba4d1fcce7fb54e047d8024ad236e5c25530b773973aa');
for(const file of readdirSync(src).filter(n=>/\.tsx?$/.test(n)))transformSync(read(file),{loader:file.endsWith('tsx')?'tsx':'ts'});
assert.match(read('cinematic-brand.ts'),/google-fonts\/Manrope/);
assert.match(read('YouTubeV5Primitives.tsx'),/=>null;/);
assert.doesNotMatch(polish,/Wait until you see this/);
assert.match(assembly,/blur\(8px\)/);
assert.match(assembly,/data-teaser-playing-result/);
assert.match(read('YouTubeV5Set.tsx'),/blur\(10px\)/);
assert.match(read('YouTubeV5Intro.tsx'),/w=\{860\}/);
assert.match(polish,/ProductionWorkshop as ModelStudio/);
const face=evaluate(read('face-motion.ts').replace(/^import .*\n/,''),{clamp01:easing.clamp01});
const crew=evaluate(read('crew-motion.ts').replace(/^import .*\n/gm,''),{...easing,...face});
for(const role of ['courier','operator','archivist'])for(let t=0;t<35;t+=1/30){const p=crew.crewPose(t,role,.35,80,1,'work');for(const n of Object.values(p.pose))assert.ok(Number.isFinite(n));assert.ok(p.pose.sy>.75&&p.pose.sy<1.2);}
console.log(JSON.stringify({passed:true,segments:rows.length,chapters:chapters.length,frames:rows.at(-1).from+rows.at(-1).duration,fullScenes:fulls.length,supportCues:v4Cues.length,soundEvents:events.length,typingBounds:'All focused frames safe',originalSync:true,originalCGI:true,sonyMuted:true},null,2));
