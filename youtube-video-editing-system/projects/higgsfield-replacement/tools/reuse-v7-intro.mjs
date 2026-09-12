// Narrow, one-time migration of the completed silent intro chunk after the
// whole-clause dialogue repair at 2:58. All allowed source changes are asserted
// byte-for-byte below; never use this to reuse arbitrary stale render caches.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync,mkdirSync,linkSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const work=path.resolve('work/higgsfield-replacement'),repo=path.resolve('work/repos/claude-reels-workflow'),src=path.join(repo,'video/src/youtube');
const snapshot=JSON.parse(readFileSync(path.join(work,'revision-v7/before-whole-clause.json')));
const props=JSON.parse(readFileSync(path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json')));
const read=n=>readFileSync(path.join(src,n),'utf8');
const expected={...snapshot.sources};
expected['roughcut-timing.ts']=expected['roughcut-timing.ts']
 .replace('starts:Record<string,number>};','starts:Record<string,number>;sources?:Record<string,string>;sourceHashes?:Record<string,string>};')
 .replace('    const row={...s,from:frame,duration,cameraSource:camera?.source,cameraStart,cameraPlateStart};frame=endFrame;',
 "    const cameraPlateSource=m.cameraPlate?.sources?.[s.id]??m.cameraPlate?.source;\n    const row={...s,from:frame,duration,cameraSource:camera?.source,cameraStart,cameraPlateStart,cameraPlateSource};frame=endFrame;");
expected['RoughCut.tsx']=expected['RoughCut.tsx'].replace('source="v7/presenter-background.mp4"','source={s.cameraPlateSource??\'v7/presenter-background.mp4\'}');
expected['YouTubeV7.tsx']=expected['YouTubeV7.tsx']
 .replace("(get('s019').from-get('s018').from)/m.fps}","(get('s019').from-get('s018').from)/m.fps-1.2}")
 .replace('source="v7/presenter-background.mp4"','source={row.cameraPlateSource??\'v7/presenter-background.mp4\'}');
for(const [name,code] of Object.entries(expected))assert.equal(read(name),code,'Unexpected source change: '+name);
const prefix=m=>{let seconds=0;return m.segments.filter(s=>{const start=seconds;seconds+=s.end-s.start;return start<90;});};
const before=prefix(snapshot.props.manifest),after=prefix(props.manifest);
assert.deepEqual(after,before);assert.deepEqual(props.manifest.cameras,snapshot.props.manifest.cameras);
assert.deepEqual(props.manifest.obs,snapshot.props.manifest.obs);
for(const s of after){
 assert.equal(props.manifest.cameraPlate.starts[s.id],snapshot.props.manifest.cameraPlate.starts[s.id]);
 assert.equal(props.manifest.cameraPlate.sources[s.id]??props.manifest.cameraPlate.source,snapshot.props.manifest.cameraPlate.source);
}
assert.equal(props.manifest.cameraPlate.sha256,snapshot.props.manifest.cameraPlate.sha256);
assert.ok(after.every(s=>!['s018','r-no-code','s019'].includes(s.id)));
const digest=createHash('sha256').update(JSON.stringify(props));
for(const name of readdirSync(src).filter(n=>/\.tsx?$/.test(n)).sort())digest.update(name).update(readFileSync(path.join(src,name)));
for(const name of ['cube.mov','pipeline-result.jpg'])digest.update(readFileSync(path.join(work,'public',name)));
for(const folder of ['v3','v4','v7'])for(const name of readdirSync(path.join(work,'public',folder)).sort())digest.update(name).update(readFileSync(path.join(work,'public',folder,name)));
const hash=digest.digest('hex'),dir=path.join(work,'chunks-'+hash.slice(0,10));mkdirSync(dir,{recursive:true});
const filename='picture-0-2699.mp4',previous=path.join(work,snapshot.cache,filename),next=path.join(dir,filename);
const completion=JSON.parse(readFileSync(previous+'.complete'));
assert.equal(completion.from,0);assert.equal(completion.to,2699);assert.equal('chunks-'+completion.hash.slice(0,10),snapshot.cache);
const receipt={from:0,to:2699,previous,previousRenderHash:completion.hash,newRenderHash:hash,mediaSha256:createHash('sha256').update(readFileSync(previous)).digest('hex'),verified:'Identical prefix source ranges, timing, silent person plate and layout. Exact source deltas restricted to per-row plate source resolution (same value here) and download relay after 2:53. Narration is rebuilt independently.'};
if(!existsSync(next))linkSync(previous,next);
assert.equal(createHash('sha256').update(readFileSync(next)).digest('hex'),receipt.mediaSha256);
writeFileSync(next+'.complete',JSON.stringify({hash,from:0,to:2699,reuseReceipt:'intro-reuse.json'}));
writeFileSync(path.join(dir,'intro-reuse.json'),JSON.stringify(receipt,null,2));
console.log(JSON.stringify({cache:dir,receipt},null,2));
