// One-time, strictly scoped cache migration for the two raised-facecam brand cues.
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,existsSync,linkSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement');
const repo=path.join(base,'work/repos/claude-reels-workflow'),src=path.join(repo,'video/src/youtube');
const props=JSON.parse(readFileSync(path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json')));
const oldDir=path.join(work,'chunks-79e4ff256b');
const expectedOld=JSON.parse(readFileSync(path.join(oldDir,'picture-0-2699.mp4.complete'))).hash;
const backup=readFileSync(path.join(work,'revision-v8/pre-collision-YouTubeV8.tsx'),'utf8');
const current=readFileSync(path.join(src,'YouTubeV8.tsx'),'utf8');
const expected=backup.replace('text?:string}>=({duration,logo,title,text})','text?:string;avoidRaisedCamera?:boolean}>=({duration,logo,title,text,avoidRaisedCamera=false})').replace('<Glass x={1260} y={122}', '<Glass x={avoidRaisedCamera?650:1260} y={122}').replace('<Brand duration={d/fps}', "<Brand avoidRaisedCamera={c.id==='s025'||c.id==='s027'} duration={d/fps}");
assert.equal(current.trimEnd(),expected.trimEnd(),'Refuse reuse after any other visual change');
function digest(replacement){const h=createHash('sha256').update(JSON.stringify(props));for(const name of readdirSync(src).filter(n=>/\.tsx?$/.test(n)).sort())h.update(name).update(name==='YouTubeV8.tsx'?replacement:readFileSync(path.join(src,name)));for(const name of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',name)));for(const folder of ['v3','v4','v7'])for(const name of readdirSync(path.join(work,'public',folder)).sort())h.update(name).update(readFileSync(path.join(work,'public',folder,name)));return h.digest('hex');}
assert.ok([backup,backup.replace(/\n$/,'')].some(s=>digest(s)===expectedOld),'All other sources/assets/manifest must match old render');
const hash=digest(current),dir=path.join(work,'chunks-'+hash.slice(0,10));mkdirSync(dir,{recursive:true});
let sum=0,from=0;const affected=[];
for(const s of props.manifest.segments){sum+=s.end-s.start;const to=Math.round(sum*props.manifest.fps);if(s.id==='s025'||s.id==='s027')affected.push({id:s.id,from,to:to-1});from=to;}
const adopted=[];
for(const [start,end] of [[0,2699],[2700,5399]]){
 assert.ok(!affected.some(r=>r.from<=end&&r.to>=start));
 const name=`picture-${start}-${end}.mp4`,receipt=JSON.parse(readFileSync(path.join(oldDir,name+'.complete')));assert.equal(receipt.hash,expectedOld);assert.equal(receipt.from,start);assert.equal(receipt.to,end);
 if(!existsSync(path.join(dir,name)))linkSync(path.join(oldDir,name),path.join(dir,name));
 writeFileSync(path.join(dir,name+'.complete'),JSON.stringify({hash,from:start,to:end,inheritedFrom:expectedOld,equivalence:'Only brand x placement for s025/s027 changed; neither segment occurs in this chunk.'}));adopted.push(name);
}
writeFileSync(path.join(work,'revision-v8/collision-cache-proof.json'),JSON.stringify({sourceHash:hash,priorSourceHash:expectedOld,affected,adopted,otherInputsIdentical:true},null,2));
console.log(JSON.stringify({hash,affected,adopted},null,2));
