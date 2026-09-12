// Optional local refinement: prove the sole change clears outgoing workspace
// before the expanding video. Never required for a fresh other-Mac render.
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,linkSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement'),check=process.argv.includes('--check-only');
const proof=JSON.parse(execFileSync(process.execPath,[path.join(project,'tools/prepare-v18-cache.mjs'),...(check?['--check-only']:[])],{encoding:'utf8'}));
const baseline='e94ab462eb3dcad58961c8fe4fa102dc967488e7',priorHash='5d7e42a55dd776b7b106a2d734b3e6d23d9e7fc5de1c007cdafed1bc815db0a4',sourceHash=proof.sourceHash;
for(const name of readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n))){
 const before=execFileSync('git',['show',baseline+':video/src/youtube/'+name],{cwd:repo,encoding:'utf8',maxBuffer:10e6});
 let after=readFileSync(path.join(repo,'video/src/youtube',name),'utf8');
 if(name==='ScenesV18.tsx')after=after.replace('opacity:Math.max(0,1-output*2),transform:','opacity:1-output,transform:').replace('style={{opacity:Math.max(0,(output-.5)*2),transform:','style={{opacity:output,transform:');
 assert.equal(after,before);
}
const prior=path.join(work,'chunks-'+priorHash.slice(0,10),'bounded-parts'),dest=path.join(work,'chunks-'+sourceHash.slice(0,10),'bounded-parts');
if(!check){
 mkdirSync(dest,{recursive:true});
 for(const from of [0,900,1200]){
  const to=from+299,name=`picture-${from}-${to}.mp4`,source=path.join(prior,name),target=path.join(dest,name),receipt=JSON.parse(readFileSync(source+'.complete'));
  assert.equal(receipt.hash,priorHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);
  if(!existsSync(target))linkSync(source,target);else assert.deepEqual(readFileSync(source),readFileSync(target));
  writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorHash,proof:'revision-v18/transition-cache-proof.json'}));
 }
 writeFileSync(path.join(work,'revision-v18/transition-cache-proof.json'),JSON.stringify({sourceHash,priorSourceHash:priorHash,baselineCommit:baseline,affected:[{from:575,to:600}],freshRender:[{from:300,to:899}],reason:'Only complementary opacity envelopes changed; workspace clears before video appears. Frame601 is the first fully settled output frame.'},null,2));
}
console.log(JSON.stringify({sourceHash,priorSourceHash:priorHash,transitionOnly:true}));
