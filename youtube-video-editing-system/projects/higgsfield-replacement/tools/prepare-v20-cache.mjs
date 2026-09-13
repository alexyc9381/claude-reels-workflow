import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,linkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement');
const revision='e62e4ff70235b0bf28a8593363e5d904dfb877f1';
const old=f=>execFileSync('git',['show',revision+':'+f],{cwd:repo,maxBuffer:30e6}),current=f=>readFileSync(path.join(repo,f));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props),'Speech, OBS ranges and camera EDL remain unchanged');
const names=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort();
const oldNames=execFileSync('git',['ls-tree','--name-only',revision,'video/src/youtube/'],{cwd:repo,encoding:'utf8'}).trim().split('\n').map(n=>path.basename(n)).filter(n=>/\.tsx?$/.test(n)).sort();
assert.deepEqual(names.filter(n=>!oldNames.includes(n)),['ScenesV20.tsx']);
assert.deepEqual(oldNames.filter(n=>!names.includes(n)),[]);
assert.deepEqual(oldNames.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n))),['ScenesV19.tsx','ScenesV9.tsx','StoryScenesV10.tsx','SupportingScenesV9.tsx','YouTubeV9.tsx']);
const text=(read,n)=>read('video/src/youtube/'+n).toString();
assert.equal(text(current,'ScenesV19.tsx').replace('export {Set,Light,Contact,HiggsSprite,Shot,CineCamera};\n',''),text(old,'ScenesV19.tsx'));
assert.equal(text(current,'SupportingScenesV9.tsx').split('\n').filter(l=>!l.includes('ScenesV20')&&!l.includes("if(cueId==='s021:25')return shell(<ShotPlanV20")).join('\n'),text(old,'SupportingScenesV9.tsx'));
let scenes=text(current,'ScenesV9.tsx').split('\n').filter(l=>!l.includes("from './ScenesV20'")).join('\n');
for(const [a,b] of [['CostV20','CostV19'],['ProductionV9=ProductionV20','ProductionV9=ProductionV19'],['WrapperV9=WrapperV20','WrapperV9=WrapperV17'],['ModelRoom=DirectV20','ModelRoom=DirectRouteV19'],['FeatureVault=VaultV20','FeatureVault=FeatureGateV17'],['RoadmapV9=RoadmapV20','RoadmapV9=RoadmapV19'],['GuideV9=GuideV20','GuideV9=GuideV15'],['SkillV9=SkillV20','SkillV9=SkillSequence']])scenes=scenes.replace(a,b);
const download=s=>s.slice(s.indexOf('export const DownloadV9:'),s.indexOf('/** Closing payoff'));
scenes=scenes.replace(download(scenes),download(text(old,'ScenesV9.tsx')));
assert.equal(scenes,text(old,'ScenesV9.tsx'),'No alias/outro changes outside declared scenes');
const host=text(current,'YouTubeV9.tsx'),oldHost=text(old,'YouTubeV9.tsx');
assert.equal(host.slice(0,host.indexOf('export const soundEvents=')),oldHost.slice(0,oldHost.indexOf('export const soundEvents=')));
assert.equal(host.slice(host.indexOf('export const YouTubeSound:')),oldHost.slice(oldHost.indexOf('export const YouTubeSound:')),'Music and host playback unmodified');
let comparison=text(current,'StoryScenesV10.tsx'),oldComparison=text(old,'StoryScenesV10.tsx');
for(const marker of ['data-comparison-side','data-choice-number','data-opening-countdown'])comparison=comparison.replace(comparison.split('\n').find(l=>l.includes(marker)),oldComparison.split('\n').find(l=>l.includes(marker)));
assert.equal(comparison,oldComparison,'Only opening media/badges/countdown line changes');
const newMedia=['higgsfield-page-v20.png','higgsfield-scroll-v20.png','intro-claude-v20.mp4','intro-higgsfield-v20.mp4','media-v20-ledger.json'];
const fingerprint=(read,files,baseline=false)=>{const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));for(const n of files)h.update(n).update(read('video/src/youtube/'+n));h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));for(const n of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',n)));for(const folder of ['v3','v4','v7','v9'])for(const n of readdirSync(path.join(work,'public',folder)).sort()){if(baseline&&folder==='v9'&&newMedia.includes(n))continue;h.update(n).update(readFileSync(path.join(work,'public',folder,n)));}return h.digest('hex');};
const priorSourceHash=fingerprint(old,oldNames,true),sourceHash=fingerprint(current,names);
assert.equal(priorSourceHash,'623503bbad5872d820d279485f5e93dad414e863f49165033c0c73a915c6aa43','All original media fingerprints must match V19');
const proof={revision:'V20',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,narrationAndEDLIdentical:true,audioDesignChanged:true,affected:[{from:0,to:1096},{from:1415,to:2370},{from:5080,to:5549},{from:6980,to:7141}],reason:'Scene-alias changes, opening-only conditional media/labels/countdown, download contact pass and one identified shot-planning support cue. Exact reversals restore V19. Tail from 270s is source-equivalent. No lossy re-encoding of inherited pictures.'};
if(!process.argv.includes('--check-only')){
 const prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));mkdirSync(dest,{recursive:true});mkdirSync(path.join(work,'revision-v20'),{recursive:true});
 for(const from of [8100,10800,13500]){
  const to=Math.min(from+2699,13712),n=`picture-${from}-${to}.mp4`,a=path.join(prior,n),b=path.join(dest,n),r=JSON.parse(readFileSync(a+'.complete'));assert.equal(r.hash,priorSourceHash);assert.equal(r.from,from);assert.equal(r.to,to);assert.ok(!proof.affected.some(q=>q.from<=to&&q.to>=from));
  if(!existsSync(b))linkSync(a,b);else assert.deepEqual(readFileSync(a),readFileSync(b));writeFileSync(b+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v20/cache-proof.json'}));
 }
 writeFileSync(path.join(work,'revision-v20/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
