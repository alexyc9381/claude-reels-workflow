// Optional local refinement cache, after the first V17 render completes.
// Exact comparison permits reuse outside the 50–60s transition/pen-lift part.
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,linkSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const check=process.argv.includes('--check-only');
const proof=JSON.parse(execFileSync(process.execPath,[path.join(project,'tools/prepare-v17-cache.mjs'),...(check?['--check-only']:[])],{encoding:'utf8'}));
const baseline='f651777d660662bcecd554d69cfda039048fae09',sourceHash=proof.sourceHash,priorHash='6f8ea85675afc151729076586b22ac73fe672aa604d5dc91978e6de1c73e2be8';
const old=n=>execFileSync('git',['show',baseline+':video/src/youtube/'+n],{cwd:repo,encoding:'utf8',maxBuffer:10e6});
for(const name of readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n))){
 let current=readFileSync(path.join(repo,'video/src/youtube',name),'utf8');
 if(name==='ScenesV17.tsx'){
  const oldLine=old(name).split('\n').find(l=>l.includes(' const tip='));
  current=current.replace(' const penLift=e(t,.84,.18);\n','');
  const newLine=current.split('\n').find(l=>l.includes(' const tip='));assert.ok(newLine.includes('t<.84?'));current=current.replace(newLine,oldLine);
  for(const [a,b] of [['opacity:Math.max(0,1-limited*2)','opacity:1-limited'],['opacity:Math.max(0,(limited-.5)*2)','opacity:limited'],['queue=e(t,4.62,.18)','queue=limited'],['opacity:1-e(t,4.38,.18)','opacity:1-limited']]){assert.ok(current.includes(a));current=current.replace(a,b);}
 }
 assert.equal(current,old(name));
}
const prior=path.join(work,'chunks-'+priorHash.slice(0,10),'bounded-parts'),dest=path.join(work,'chunks-'+sourceHash.slice(0,10),'bounded-parts');if(!check)mkdirSync(dest,{recursive:true});
for(let from=0;from<2700;from+=300){
 const to=from+299;if(from===1500||check)continue;
 const name=`picture-${from}-${to}.mp4`,source=path.join(prior,name),target=path.join(dest,name),receipt=JSON.parse(readFileSync(source+'.complete'));
 assert.equal(receipt.hash,priorHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);
 if(!existsSync(target))linkSync(source,target);else assert.deepEqual(readFileSync(source),readFileSync(target));
 writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorHash,proof:'revision-v17/pen-lift-cache-proof.json'}));
}
const detail={sourceHash,priorSourceHash:priorHash,baselineCommit:baseline,affected:[{from:1540,to:1580},{from:1783,to:1788}],freshRender:[{from:1500,to:1799}],reason:'Only the invoice/model-to-limit transition clears outgoing content before entry, and the inter-stroke hold/teleport becomes an eased pen lift. All other source/media/EDL/sound inputs match the completed first V17 render parts.'};
if(!check)writeFileSync(path.join(work,'revision-v17/pen-lift-cache-proof.json'),JSON.stringify(detail,null,2));console.log(JSON.stringify(detail,null,2));
