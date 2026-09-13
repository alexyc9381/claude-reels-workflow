import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement');
const revision='53192c6';
const old=f=>execFileSync('git',['show',revision+':'+f],{cwd:repo,maxBuffer:30e6}),current=f=>readFileSync(path.join(repo,f));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props),'Narration and EDL unchanged');
const names=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort();
const oldNames=execFileSync('git',['ls-tree','--name-only',revision,'video/src/youtube/'],{cwd:repo,encoding:'utf8'}).trim().split('\n').map(n=>path.basename(n)).filter(n=>/\.tsx?$/.test(n)).sort();
assert.deepEqual(names.filter(n=>!oldNames.includes(n)),['ScenesV21.tsx']);
assert.deepEqual(oldNames.filter(n=>!names.includes(n)),[]);
assert.deepEqual(oldNames.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n))),['RoughCut.tsx','ScenesV9.tsx','StoryScenesV10.tsx','YouTubeV9.tsx']);
const text=(read,n)=>read('video/src/youtube/'+n).toString();
const restoreLine=(s,o,marker)=>{const a=s.split('\n').filter(l=>l.includes(marker)),b=o.split('\n').filter(l=>l.includes(marker));assert.equal(a.length,1,marker);assert.equal(b.length,1,marker);return s.replace(a[0],b[0]);};
let scene=text(current,'ScenesV9.tsx').split('\n').filter(l=>!l.includes("from './ScenesV21'")).join('\n');
scene=restoreLine(scene,text(old,'ScenesV9.tsx'),"from './ScenesV20'");assert.equal(scene,text(old,'ScenesV9.tsx'));
for(const n of ['RoughCut.tsx','YouTubeV9.tsx']){
 let s=text(current,n).replace("import {introCropV21} from './ScenesV21';\n",''),o=text(old,n);
 s=restoreLine(s,o,'const cropW=');
 if(n==='YouTubeV9.tsx'){s=restoreLine(s,o,'const q=s.b!,span=d-q;');s=restoreLine(s,o,"roadmap-ding',");}
 assert.equal(s,o,'Only intro crop and cue levels/timing can change: '+n);
}
assert.equal(text(current,'StoryScenesV10.tsx').replaceAll('intro-claude-v21','intro-claude-v20').replaceAll('intro-higgsfield-v21','intro-higgsfield-v20'),text(old,'StoryScenesV10.tsx'));
const newScene=text(current,'ScenesV21.tsx');assert.match(newScene,/globalSeconds<31\?30:0/);
assert.match(newScene,/export const CostV21/);assert.match(newScene,/export const RoadmapV21/);
const newMedia=['intro-claude-v21.mp4','intro-higgsfield-v21.mp4','media-v21-ledger.json'];
const fingerprint=(read,files,baseline=false)=>{const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));for(const n of files)h.update(n).update(read('video/src/youtube/'+n));h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));for(const n of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',n)));for(const folder of ['v3','v4','v7','v9'])for(const n of readdirSync(path.join(work,'public',folder)).sort()){if(baseline&&folder==='v9'&&newMedia.includes(n))continue;h.update(n).update(readFileSync(path.join(work,'public',folder,n)));}return h.digest('hex');};
const priorSourceHash=fingerprint(old,oldNames,true),sourceHash=fingerprint(current,names);
assert.equal(priorSourceHash,'2df0bdc2cc75ac3abed95e3facc51f02b3d35089e0b13fecaca3bb3654df3905');
const proof={revision:'V21',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,narrationAndEDLIdentical:true,audioDesignChanged:true,affected:[{from:0,to:929}],reason:'Exact reversals restore V20. Intro-only crop (<31s), opening-only graded media, cost and roadmap aliases; separate fresh audio mix. Remaining V20 scene revisions are retained.',reused:[]};
if(!process.argv.includes('--check-only')){
 const prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));mkdirSync(dest,{recursive:true});mkdirSync(path.join(work,'revision-v21'),{recursive:true});
 const reuse=(from,to,bounded=false)=>{
  assert.ok(!proof.affected.some(q=>q.from<=to&&q.to>=from));
  const folder=bounded?'bounded-parts':'',n=`picture-${from}-${to}.mp4`,a=path.join(prior,folder,n),b=path.join(dest,folder,n);
  if(!existsSync(a+'.complete'))return;
  const r=JSON.parse(readFileSync(a+'.complete'));assert.equal(r.hash,priorSourceHash);assert.equal(r.from,from);assert.equal(r.to,to);
  mkdirSync(path.dirname(b),{recursive:true});if(!existsSync(b))copyFileSync(a,b);else assert.deepEqual(readFileSync(a),readFileSync(b));
  const sha256=createHash('sha256').update(readFileSync(b)).digest('hex');
  writeFileSync(b+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v21/cache-proof.json'}));
  proof.reused.push({from,to,bounded,sha256,baselineReceipt:r});
 };
 for(const from of [2700,8100,10800,13500])reuse(from,Math.min(from+2699,13712));
 for(let from=1200;from<2700;from+=300)reuse(from,from+299,true);
 for(let from=5400;from<8100;from+=300)reuse(from,from+299,true);
 writeFileSync(path.join(work,'revision-v21/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
