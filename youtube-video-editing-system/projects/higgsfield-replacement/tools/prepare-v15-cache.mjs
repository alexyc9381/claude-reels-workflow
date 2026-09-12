import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,writeFileSync,linkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),work=path.join(base,'work/higgsfield-replacement'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const revision='b0d64c6a0ec4d0ecb732e2500b57db371efbd7ee';
const old=file=>execFileSync('git',['show',revision+':'+file],{cwd:repo,maxBuffer:30e6});
const current=file=>readFileSync(path.join(repo,file));
const props='youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json';
assert.deepEqual(current(props),old(props));
const files=readdirSync(path.join(repo,'video/src/youtube')).filter(n=>/\.tsx?$/.test(n)).sort(),oldFiles=execFileSync('git',['ls-tree','--name-only',revision,'video/src/youtube/'],{cwd:repo,encoding:'utf8'}).trim().split('\n').map(n=>path.basename(n)).filter(n=>/\.tsx?$/.test(n)).sort();
assert.deepEqual(files.filter(n=>!oldFiles.includes(n)),['ScenesV15.tsx']);
assert.deepEqual(oldFiles.filter(n=>!files.includes(n)),[]);
assert.deepEqual(oldFiles.filter(n=>!current('video/src/youtube/'+n).equals(old('video/src/youtube/'+n))),['ScenesV9.tsx','YouTubeV9.tsx']);
let scenes=current('video/src/youtube/ScenesV9.tsx').toString();
scenes=scenes.replace("import {CostV15,ProductionV15,RoadmapV15,GuideV15,WrapperV15} from './ScenesV15';\n",'');
for(const [a,b] of [['<CostV15 ','<AccessPriceV11 '],['ProductionV9=ProductionV15','ProductionV9=PromptToFileV10'],['WrapperV9=WrapperV15','WrapperV9=InterfaceCutawayV10'],['RoadmapV9=RoadmapV15','RoadmapV9=RoadmapV13'],['GuideV9=GuideV15','GuideV9=FollowAlongV13']]){assert.ok(scenes.includes(a));scenes=scenes.replace(a,b);}
assert.equal(scenes,old('video/src/youtube/ScenesV9.tsx').toString());
let presenter=current('video/src/youtube/YouTubeV9.tsx').toString();
const start=presenter.indexOf(' // V15_WRAPPER_BEGIN'),end=presenter.indexOf(' // V15_WRAPPER_END\n')+' // V15_WRAPPER_END\n'.length;
assert.ok(start>=0&&end>start);const fragment=presenter.slice(start,end);assert.match(fragment,/if\(term==='Wrapper'\)return/);
presenter=presenter.slice(0,start)+presenter.slice(end);assert.equal(presenter,old('video/src/youtube/YouTubeV9.tsx').toString());
assert.deepEqual(files.filter(n=>n!=='ScenesV15.tsx'&&current('video/src/youtube/'+n).toString().includes("from './ScenesV15'")),['ScenesV9.tsx']);
const timeline=JSON.parse(readFileSync(path.join(project,'v13-timeline.json'))),get=id=>timeline.find(r=>r.id===id);
assert.equal(get('s003').from,220);assert.equal(get('s010').from+get('s010').duration,1758);
// The replaced aliases occur only in these first-minute sequence kinds.
const host=current('video/src/youtube/YouTubeV9.tsx').toString();
for(const line of ["span('s004','s005','studio')","span('s006','s006','roadmap')","span('s007','s007','guide')","span('s010','s010','wrapper')"])assert.ok(host.includes(line));
const wrapperCues=host.match(/\{id:'[^']+'[^\n]+title:'Wrapper'[^\n]+/g);assert.equal(wrapperCues.length,1);assert.ok(wrapperCues[0].includes("id:'s009'"));
const fingerprint=(read,names)=>{
 const h=createHash('sha256').update(JSON.stringify(JSON.parse(read(props))));
 for(const name of names)h.update(name).update(read('video/src/youtube/'+name));
 h.update('WorldKit.tsx').update(read('video/src/WorldKit.tsx'));
 for(const name of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',name)));
 for(const folder of ['v3','v4','v7','v9'])for(const name of readdirSync(path.join(work,'public',folder)).sort())h.update(name).update(readFileSync(path.join(work,'public',folder,name)));
 return h.digest('hex');
};
const priorSourceHash=fingerprint(old,oldFiles),sourceHash=fingerprint(current,files),prior=path.join(work,'chunks-'+priorSourceHash.slice(0,10)),dest=path.join(work,'chunks-'+sourceHash.slice(0,10));
assert.equal(priorSourceHash,'cbe572a8ed295e52fb5ba2b81fa100c0558785f8ae566c84037c20f003c0496c');
assert.equal(audioContract(base),'332f2e61c805d13343e913a7d706e556788ad3095ac2fbbd3c51178d5162c118');
const proof={revision:'V15',baselineCommit:revision,sourceHash,priorSourceHash,otherInputsIdentical:true,changedSourceFiles:['ScenesV15.tsx','ScenesV9.tsx','YouTubeV9.tsx'],affected:[{from:220,to:1757}],freshRender:[{from:0,to:1799}],reason:'Exact reversal of first-minute scene aliases and the Wrapper-only compact overlay gives byte-identical V14 source. New visual-only module has one caller. EDL, media, opening A/B, later components and audio contract unchanged.'};
if(!process.argv.includes('--check-only')){
 assert.equal(readFileSync(path.join(prior,'audio-contract.txt'),'utf8').trim(),audioContract(base));
 mkdirSync(path.join(dest,'bounded-parts'),{recursive:true});mkdirSync(path.join(work,'revision-v15'),{recursive:true});
 const adopt=(from,to,part=false)=>{assert.ok(from>1757);const name=`picture-${from}-${to}.mp4`,source=path.join(prior,part?'bounded-parts':'',name),target=path.join(dest,part?'bounded-parts':'',name),receipt=JSON.parse(readFileSync(source+'.complete'));assert.equal(receipt.hash,priorSourceHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);if(!existsSync(target))linkSync(source,target);else assert.deepEqual(readFileSync(source),readFileSync(target));writeFileSync(target+'.complete',JSON.stringify({hash:sourceHash,from,to,inheritedFrom:priorSourceHash,proof:'revision-v15/cache-proof.json'}));};
 for(const [a,b] of [[1800,2399],[2400,2699]])adopt(a,b,true);
 for(let a=2700;a<13713;a+=2700)adopt(a,Math.min(a+2699,13712));
 writeFileSync(path.join(work,'revision-v15/cache-proof.json'),JSON.stringify(proof,null,2));
}
console.log(JSON.stringify(proof,null,2));
