import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,linkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const revision='09cbc1ebf44af01d766d71d2aafcd3e923c16268';
const old=file=>execFileSync('git',['show',revision+':'+file],{cwd:repo,maxBuffer:30e6});
const current=file=>readFileSync(path.join(repo,file));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props));
const files=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort();
const changed=files.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n)));
assert.deepEqual(changed,['ScenesV11.tsx','StoryScenesV10.tsx','YouTubeV9.tsx']);
let story=current('video/src/youtube/StoryScenesV10.tsx').toString();
for(const [a,b] of [
 ['left:opening?32+i*940:12+i*958,top:opening?28:24,width:opening?916:938,height:opening?1016:742','left:12+i*958,top:24,width:938,height:742'],
 ['<svg width="916" height="1016"','<svg width="938" height="742"'],
 ['width="908" height="1008"','width="930" height="734"'],
 ['left:opening?446+i*940:437+i*958,top:opening?924:789','left:437+i*958,top:789']
]){assert.ok(story.includes(a));story=story.replace(a,b);}
assert.equal(story,old('video/src/youtube/StoryScenesV10.tsx').toString());
let presenter=current('video/src/youtube/YouTubeV9.tsx').toString();
presenter=presenter.replace('const t=useTime(),p=1; // V14: compare from frame zero; facecam is already over the center seam.',"const t=useTime(),p=row.id==='s001'?easeInOut(t,0,.38):1;").replace('openingScale(row.from/30+t)','openingScale(t)*(1-p)+p');
assert.equal(presenter,old('video/src/youtube/YouTubeV9.tsx').toString());
let cost=current('video/src/youtube/ScenesV11.tsx').toString();
const start=cost.indexOf('// V14_COST_BEGIN'),end=cost.indexOf('// V14_COST_END\n')+'// V14_COST_END\n'.length;
assert.ok(start>=0&&end>start);cost=(cost.slice(0,start)+cost.slice(end)).replace('const ArchivedAccessPriceV11:','export const AccessPriceV11:');
assert.equal(cost,old('video/src/youtube/ScenesV11.tsx').toString());
// The only caller of AccessPriceV11 is the opening HookV9 sequence.
const scenes=current('video/src/youtube/ScenesV9.tsx').toString();
assert.match(scenes,/t>=whyAt\?<Sequence from=\{Math.round\(whyAt\*30\)\}>\<AccessPriceV11/);
const callers=files.filter(n=>n!=='ScenesV11.tsx'&&current('video/src/youtube/'+n).toString().includes('AccessPriceV11'));
assert.deepEqual(callers,['ScenesV9.tsx']);
const timeline=JSON.parse(readFileSync(path.join(project,'v13-timeline.json')));
assert.equal(timeline.find(r=>r.id==='s004').from,450);
assert.equal(timeline.find(r=>r.id==='s003').from,220);
const fingerprint=read=>{
 const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));
 for(const name of files)h.update(name).update(read('video/src/youtube/'+name));
 h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));
 for(const name of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',name)));
 for(const folder of ['v3','v4','v7','v9'])for(const name of readdirSync(path.join(work,'public',folder)).sort())h.update(name).update(readFileSync(path.join(work,'public',folder,name)));
 return h.digest('hex');
};
const priorSourceHash=fingerprint(old),sourceHash=fingerprint(current),prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));
assert.equal(priorSourceHash,'c4e4dbb9d8af94d37236539b2b4262acb1c0283052f1b9b73adc396bd7172598');
assert.equal(audioContract(base),'332f2e61c805d13343e913a7d706e556788ad3095ac2fbbd3c51178d5162c118');
if(!process.argv.includes('--check-only'))assert.equal(readFileSync(path.join(prior,'audio-contract.txt'),'utf8').trim(),audioContract(base));
const proof={revision:'V14',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,changedSourceFiles:changed,affected:[{from:0,to:449}],freshRender:[{from:0,to:599}],reason:'Exact reverse-patch equality proves only opening comparison geometry/presenter and intro-only price component differ. EDL, assets, later components and audio contract unchanged.'};
if(!process.argv.includes('--check-only')){
 mkdirSync(path.join(dest,'bounded-parts'),{recursive:true});mkdirSync(path.join(work,'revision-v14'),{recursive:true});
 const adopt=(from,to,part=false)=>{assert.ok(from>449);const name=`picture-${from}-${to}.mp4`,source=path.join(prior,part?'bounded-parts':'',name),target=path.join(dest,part?'bounded-parts':'',name);const receipt=JSON.parse(readFileSync(source+'.complete'));assert.equal(receipt.hash,priorSourceHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);if(!existsSync(target))linkSync(source,target);else assert.equal(createHash('sha256').update(readFileSync(source)).digest('hex'),createHash('sha256').update(readFileSync(target)).digest('hex'));writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v14/cache-proof.json'}));};
 for(const [a,b] of [[600,1199],[1200,1799],[1800,2399],[2400,2699]])adopt(a,b,true);
 for(let a=2700;a<13713;a+=2700)adopt(a,Math.min(a+2699,13712));
 writeFileSync(path.join(work,'revision-v14/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
