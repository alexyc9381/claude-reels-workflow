import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,linkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const revision='693fa35d04f8c1159bb4cb70855eb5549aa19133';
const old=file=>execFileSync('git',['show',revision+':'+file],{cwd:repo,maxBuffer:30e6}),current=file=>readFileSync(path.join(repo,file));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props));
const files=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort(),oldFiles=execFileSync('git',['ls-tree','--name-only',revision,'video/src/youtube/'],{cwd:repo,encoding:'utf8'}).trim().split('\n').map(n=>path.basename(n)).filter(n=>/\.tsx?$/.test(n)).sort();
assert.deepEqual(files.filter(n=>!oldFiles.includes(n)),['ScenesV17.tsx']);assert.deepEqual(oldFiles.filter(n=>!files.includes(n)),[]);
assert.deepEqual(oldFiles.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n))),['ScenesV16.tsx','ScenesV9.tsx','StoryScenesV10.tsx']);
let scenes=current('video/src/youtube/ScenesV9.tsx').toString();
scenes=scenes.replace("import {WrapperV17,DirectRouteV17,FeatureGateV17} from './ScenesV17';\n",'');
for(const [a,b] of [
 ['brandAt={higgsAt-whyAt} bold/>','brandAt={higgsAt-whyAt}/>'],
 ['export const ProductionV9:React.FC<{duration:number}>=({duration})=><ProductionV16 duration={duration} brisk/>;','export const ProductionV9=ProductionV16;'],
 ['WrapperV9=WrapperV17','WrapperV9=WrapperV15'],['ModelRoom=DirectRouteV17','ModelRoom=DirectRouteV10'],['FeatureVault=FeatureGateV17','FeatureVault=FeatureGateV13']
]){assert.ok(scenes.includes(a));scenes=scenes.replace(a,b);}
assert.equal(scenes,old('video/src/youtube/ScenesV9.tsx').toString());
// All V16 helper/roadmap code is exact. Only the two intro component bodies
// change; their sole active callers are the hook and studio aliases above.
const v16='video/src/youtube/ScenesV16.tsx',original=old(v16).toString();let updated=current(v16).toString();
for(const [start,end] of [['export const CostV16:','/** Oversized physical cinema camera'],['export const ProductionV16:','const TwinResults:']]){
 const a=updated.indexOf(start),b=updated.indexOf(end),oa=original.indexOf(start),ob=original.indexOf(end);assert.ok(a>=0&&b>a&&oa>=0&&ob>oa);updated=updated.slice(0,a)+original.slice(oa,ob)+updated.slice(b);
}
assert.equal(updated,original);
const comparison='video/src/youtube/StoryScenesV10.tsx',before=old(comparison).toString(),after=current(comparison).toString();
const line=after.split('\n').find(l=>l.includes('data-choice-number=')),oldLine=before.split('\n').find(l=>l.includes('data-choice-number='));
assert.ok(line.includes('fontSize:opening?104:49'));assert.ok(line.includes('width:opening?164:88'));assert.equal(after.replace(line,oldLine),before);
assert.deepEqual(files.filter(n=>n!=='ScenesV17.tsx'&&current('video/src/youtube/'+n).toString().includes("from './ScenesV17'")),['ScenesV9.tsx']);
assert.deepEqual(files.filter(n=>n!=='ScenesV16.tsx'&&current('video/src/youtube/'+n).toString().includes("from './ScenesV16'")),['ScenesV9.tsx']);
const rows=JSON.parse(readFileSync(path.join(project,'v13-timeline.json'))),get=id=>rows.find(r=>r.id===id);
assert.equal(get('s005').from+get('s005').duration,710);assert.equal(get('s010').from,1415);assert.equal(get('r-features').from+get('r-features').duration,2371);
const fingerprint=(read,names)=>{const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));for(const name of names)h.update(name).update(read('video/src/youtube/'+name));h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));for(const name of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',name)));for(const folder of ['v3','v4','v7','v9'])for(const name of readdirSync(path.join(work,'public',folder)).sort())h.update(name).update(readFileSync(path.join(work,'public',folder,name)));return h.digest('hex');};
const priorSourceHash=fingerprint(old,oldFiles),sourceHash=fingerprint(current,files),prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));
assert.equal(priorSourceHash,'31c7653524b4aea34035bb9c8a1621d8309330d41fe167119c98163be0940687');
assert.equal(audioContract(base),'332f2e61c805d13343e913a7d706e556788ad3095ac2fbbd3c51178d5162c118');
const proof={revision:'V17',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,changedSourceFiles:['ScenesV16.tsx','ScenesV17.tsx','ScenesV9.tsx','StoryScenesV10.tsx'],affected:[{from:0,to:709},{from:1415,to:2370}],freshRender:[{from:0,to:2699}],reason:'Only opening-only number geometry, opted-in price/workflow pacing and three source-anchored concept aliases changed. Exact reversal restores baseline source. Remaining EDL, masking, plate crops, footage, comparison reveal, sound code and assets are unchanged.'};
if(!process.argv.includes('--check-only')){
 assert.equal(readFileSync(path.join(prior,'audio-contract.txt'),'utf8').trim(),audioContract(base));mkdirSync(dest,{recursive:true});mkdirSync(path.join(work,'revision-v17'),{recursive:true});
 for(let from=2700;from<13713;from+=2700){const to=Math.min(from+2699,13712),name=`picture-${from}-${to}.mp4`,source=path.join(prior,name),target=path.join(dest,name),receipt=JSON.parse(readFileSync(source+'.complete'));assert.equal(receipt.hash,priorSourceHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);if(!existsSync(target))linkSync(source,target);else assert.deepEqual(readFileSync(source),readFileSync(target));writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v17/cache-proof.json'}));}
 writeFileSync(path.join(work,'revision-v17/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
