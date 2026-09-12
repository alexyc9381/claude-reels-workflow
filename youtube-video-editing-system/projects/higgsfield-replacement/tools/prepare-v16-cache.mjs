import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,linkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const revision='829e2e923c0539e328a212c4397f1b4a2a0f837f';
const old=file=>execFileSync('git',['show',revision+':'+file],{cwd:repo,maxBuffer:30e6}),current=file=>readFileSync(path.join(repo,file));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props));
const files=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort(),oldFiles=execFileSync('git',['ls-tree','--name-only',revision,'video/src/youtube/'],{cwd:repo,encoding:'utf8'}).trim().split('\n').map(n=>path.basename(n)).filter(n=>/\.tsx?$/.test(n)).sort();
assert.deepEqual(files.filter(n=>!oldFiles.includes(n)),['ScenesV16.tsx']);assert.deepEqual(oldFiles.filter(n=>!files.includes(n)),[]);
assert.deepEqual(oldFiles.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n))),['ScenesV9.tsx','YouTubeV9.tsx']);
let scenes=current('video/src/youtube/ScenesV9.tsx').toString();
scenes=scenes.replace("import {CostV16,ProductionV16,RoadmapV16} from './ScenesV16';\n",'');
for(const [a,b] of [['<CostV16 ','<CostV15 '],['ProductionV9=ProductionV16','ProductionV9=ProductionV15'],['RoadmapV9=RoadmapV16','RoadmapV9=RoadmapV15']]){assert.ok(scenes.includes(a));scenes=scenes.replace(a,b);}
assert.equal(scenes,old('video/src/youtube/ScenesV9.tsx').toString());
const host=current('video/src/youtube/YouTubeV9.tsx').toString();
assert.equal(host.replace("active&&row&&row.id!=='s006'&&","active&&row&&"),old('video/src/youtube/YouTubeV9.tsx').toString());
assert.deepEqual(files.filter(n=>n!=='ScenesV16.tsx'&&current('video/src/youtube/'+n).toString().includes("from './ScenesV16'")),['ScenesV9.tsx']);
const rows=JSON.parse(readFileSync(path.join(project,'v13-timeline.json'))),get=id=>rows.find(r=>r.id===id);
assert.equal(get('s003').from,220);assert.equal(get('s006').from+get('s006').duration,810);
for(const line of ["span('s004','s005','studio')","span('s006','s006','roadmap')"])assert.ok(host.includes(line));
const fingerprint=(read,names)=>{const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));for(const name of names)h.update(name).update(read('video/src/youtube/'+name));h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));for(const name of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',name)));for(const folder of ['v3','v4','v7','v9'])for(const name of readdirSync(path.join(work,'public',folder)).sort())h.update(name).update(readFileSync(path.join(work,'public',folder,name)));return h.digest('hex');};
const priorSourceHash=fingerprint(old,oldFiles),sourceHash=fingerprint(current,files),prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));
assert.equal(priorSourceHash,'1983a5fdfd118d0c2911cc360061032fc92c2e1a51003295a39b358840b024cd');
assert.equal(audioContract(base),'332f2e61c805d13343e913a7d706e556788ad3095ac2fbbd3c51178d5162c118');
const proof={revision:'V16',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,changedSourceFiles:['ScenesV16.tsx','ScenesV9.tsx','YouTubeV9.tsx'],affected:[{from:220,to:809}],freshRender:[{from:0,to:1199}],reason:'Only three intro aliases and the s006 presenter exclusion differ from V15. Exact reversal restores byte-identical source. All other picture, EDL, narration and sound code/assets remain unchanged; roadmap visual contacts now use the existing sound beat clock.'};
if(!process.argv.includes('--check-only')){
 assert.equal(readFileSync(path.join(prior,'audio-contract.txt'),'utf8').trim(),audioContract(base));
 mkdirSync(path.join(dest,'bounded-parts'),{recursive:true});mkdirSync(path.join(work,'revision-v16'),{recursive:true});
 const adopt=(from,to,part=false)=>{assert.ok(from>809);const name=`picture-${from}-${to}.mp4`,source=path.join(prior,part?'bounded-parts':'',name),target=path.join(dest,part?'bounded-parts':'',name),receipt=JSON.parse(readFileSync(source+'.complete'));assert.equal(receipt.hash,priorSourceHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);if(!existsSync(target))linkSync(source,target);else assert.deepEqual(readFileSync(source),readFileSync(target));writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v16/cache-proof.json'}));};
 for(const [a,b] of [[1200,1799],[1800,2399],[2400,2699]])adopt(a,b,true);
 for(let a=2700;a<13713;a+=2700)adopt(a,Math.min(a+2699,13712));
 writeFileSync(path.join(work,'revision-v16/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
