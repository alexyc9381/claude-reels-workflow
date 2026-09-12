import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {roughTimeline,roughChapters,type RoughCutManifest} from './roughcut-timing';
const m:RoughCutManifest={version:1,fps:30,obs:{source:'obs.mp4',duration:20},cameras:[{id:'a',source:'sony.mp4',duration:20,obsOffsetSeconds:-2}],segments:[{id:'1',start:0,end:1.01,camera:'a',layout:'presenter',chapter:'Hook',reason:'test'},{id:'2',start:5,end:7,camera:'a',layout:'screen-presenter',chapter:'Setup',reason:'test'}]};
assert.deepEqual(roughTimeline(m).map(s=>[s.from,s.duration,s.cameraStart]),[[0,30,2],[30,60,7]]);
assert.deepEqual(roughChapters(m).map(c=>c.frame),[0,30]);
assert.throws(()=>roughTimeline({...m,segments:[{...m.segments[0],start:19,end:21}]}));
assert.throws(()=>roughTimeline({...m,cameras:[]}));
assert.throws(()=>roughTimeline({...m,cameras:[{...m.cameras[0],obsOffsetSeconds:4}]}));
const src=readFileSync('src/youtube/RoughCut.tsx','utf8');
assert.equal((src.match(/<Audio /g)||[]).length,1);
assert.match(src,/<Audio src=\{staticFile\(m.obs.source\)\}/);
assert.equal((src.match(/<OffthreadVideo[^>]* muted /g)||[]).length,2);
console.log('Rough-cut timing, chapter, camera-coverage and OBS-only audio checks passed');
if(process.argv[2]){
 const {manifest}=JSON.parse(readFileSync(process.argv[2],'utf8')) as {manifest:RoughCutManifest};
 const rows=roughTimeline(manifest);
 for(let i=1;i<rows.length;i++)assert.equal(rows[i].from,rows[i-1].from+rows[i-1].duration);
 assert.equal(rows[0].from,0);
 assert.equal(rows.at(-1)!.from+rows.at(-1)!.duration,Math.round(manifest.segments.reduce((n,s)=>n+s.end-s.start,0)*manifest.fps));
 assert.ok(rows.every(s=>['presenter','screen','screen-presenter'].includes(s.layout)));
 console.log(`Project manifest checked: ${rows.length} segments, ${roughChapters(manifest).length} chapters, ${rows.at(-1)!.from+rows.at(-1)!.duration} frames`);
}
