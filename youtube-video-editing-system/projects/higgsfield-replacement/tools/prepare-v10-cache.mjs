import assert from 'node:assert/strict';
import {readFileSync,readdirSync,writeFileSync,mkdirSync,linkSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';

// A narrow picture-only reuse proof, not a generic "looks unchanged" cache.
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),src=path.join(repo,'video/src/youtube'),work=path.join(base,'work/higgsfield-replacement');
const project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const commit='5f2e5ea91290dd3ddfb2ec3223bc1952bc6dc552';
const oldHash='1856c4ba087e6e6d1295f9f1243b8f86a0f1654e939ed69575887e2d3aa6a2e5';
const git=p=>execFileSync('git',['show',commit+':'+p],{cwd:repo,encoding:'utf8',maxBuffer:20e6});
const props=JSON.parse(readFileSync(path.join(project,'roughcut.props.json')));
assert.deepEqual(props,JSON.parse(git('youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json')),'EDL and camera manifests unchanged');
const oldNames=execFileSync('git',['ls-tree','-r','--name-only',commit,'video/src/youtube'],{cwd:repo,encoding:'utf8'}).trim().split('\n').filter(p=>/\.tsx?$/.test(p)).map(p=>path.basename(p)).sort();
const names=readdirSync(src).filter(p=>/\.tsx?$/.test(p)).sort();
assert.deepEqual(names,oldNames.concat('StoryScenesV10.tsx').sort());
const current=Object.fromEntries(names.map(n=>[n,readFileSync(path.join(src,n),'utf8')]));
const prior=Object.fromEntries(oldNames.map(n=>[n,git('video/src/youtube/'+n)]));
const changed=['ScenesV9.tsx','NarrativeV9.tsx','YouTubeV9.tsx'];
for(const n of oldNames.filter(n=>!changed.includes(n)))assert.equal(current[n],prior[n],'Unchanged dependency '+n);
const before=(s,a)=>s.slice(0,s.indexOf(a));
assert.equal(before(current['NarrativeV9.tsx'].replace("import {BonusPackV10} from './StoryScenesV10';\n",''),'export const ComingUp:'),before(prior['NarrativeV9.tsx'],'export const ComingUp:'),'Only late bonus changes in Narrative');
const stripPresenter=s=>s.slice(0,s.indexOf('const Presenter:'))+s.slice(s.indexOf('export const YouTubePolish:'));
assert.equal(stripPresenter(current['YouTubeV9.tsx']).replace('map((c,i)=>i===4?null:','map((c,i)=>'),stripPresenter(prior['YouTubeV9.tsx']),'Only comparison presenter and last chapter overlay changed');
const section=(s,a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
assert.equal(section(current['ScenesV9.tsx'],'export const DownloadV9:','/** Closing payoff'),section(prior['ScenesV9.tsx'],'export const DownloadV9:','/** Closing payoff'),'Middle download unchanged');
assert.equal(current['ScenesV9.tsx'].slice(current['ScenesV9.tsx'].indexOf('export const GuideV9=')),prior['ScenesV9.tsx'].slice(prior['ScenesV9.tsx'].indexOf('export const GuideV9=')),'Guide and skill exports unchanged');
assert.doesNotMatch(current['StoryScenesV10.tsx'],/Date\.now|Math\.random|setTimeout|requestAnimationFrame/);
for(const tag of current['StoryScenesV10.tsx'].match(/<OffthreadVideo[\s\S]*?\/>/g)||[])assert.match(tag,/\bmuted\b/);
const sourceHash=(code,includeNew)=>{
 const h=createHash('sha256').update(JSON.stringify(props));
 for(const n of Object.keys(code).sort())h.update(n).update(code[n]);
 for(const n of ['cube.mov','pipeline-result.jpg'])h.update(readFileSync(path.join(work,'public',n)));
 for(const folder of ['v3','v4','v7','v9'])for(const n of readdirSync(path.join(work,'public',folder)).sort()){
  if(!includeNew&&folder==='v9'&&n==='higgsfield-comparison.mp4')continue;
  h.update(n).update(readFileSync(path.join(work,'public',folder,n)));
 }
 return h.digest('hex');
};
assert.equal(sourceHash(prior,false),oldHash,'All previous code/assets match verified V9 receipt');
const hash=sourceHash(current,true),priorDir=path.join(work,'chunks-'+oldHash.slice(0,10)),dir=path.join(work,'chunks-'+hash.slice(0,10));
const audio=audioContract(base);assert.equal(audio,readFileSync(path.join(priorDir,'audio-contract.txt'),'utf8').trim(),'Entire audio contract identical');
mkdirSync(dir,{recursive:true});
const inherited=[];
for(const from of [2700,5400,8100]){
 const to=from+2699,name=`picture-${from}-${to}.mp4`,receipt=JSON.parse(readFileSync(path.join(priorDir,name+'.complete')));
 assert.equal(receipt.hash,oldHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);
 if(!existsSync(path.join(dir,name)))linkSync(path.join(priorDir,name),path.join(dir,name));
 writeFileSync(path.join(dir,name+'.complete'),JSON.stringify({hash,from,to,inheritedFrom:oldHash}));inherited.push({from,to});
}
const proof={sourceHash:hash,priorSourceHash:oldHash,baselineCommit:commit,otherInputsIdentical:true,affected:[{from:0,to:2699},{from:13016,to:13845}],inherited,audioContract:audio,method:'Exact baseline asset/code hash, unchanged EDL, unchanged middle scene bodies and dependencies, changed presenter/bonus/chapter branches confined to opening or closing.'};
writeFileSync(path.join(work,'revision-v10/cache-proof.json'),JSON.stringify(proof,null,2));
console.log(JSON.stringify(proof,null,2));
