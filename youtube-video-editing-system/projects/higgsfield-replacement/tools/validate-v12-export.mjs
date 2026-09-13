import assert from 'node:assert/strict';
import {execFileSync,spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {audioContract} from './audio-contract.mjs';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow');
const project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const bin=path.join(repo,'video/node_modules/@remotion/compositor-darwin-arm64');
const revision=process.env.REVIEW_REVISION||'v12';assert.match(revision,/^v\d+$/);
const output=path.join(base,`outputs/higgsfield-replacement-edit-${revision}.mp4`);
const ff='/Users/alexchensmacmini/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1';
const meta=JSON.parse(execFileSync(path.join(bin,'ffprobe'),['-v','error','-show_streams','-show_format','-show_chapters','-of','json',output],{encoding:'utf8',env:{...process.env,DYLD_LIBRARY_PATH:bin}}));
const v=meta.streams.find(s=>s.codec_type==='video'),a=meta.streams.filter(s=>s.codec_type==='audio');
const props=JSON.parse(readFileSync(path.join(project,'roughcut.props.json'))),m=props.manifest;
const frames=Math.round(m.segments.reduce((sum,s)=>sum+s.end-s.start,0)*m.fps);
assert.equal(m.editVersion,'v9');assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'30/1');assert.equal(Number(v.nb_frames),frames);
assert.equal(a.length,1);assert.equal(a[0].sample_rate,'48000');assert.equal(a[0].channels,2);assert.ok(Math.abs(Number(meta.format.duration)-frames/m.fps)<.08);
const chapters=JSON.parse(readFileSync(path.join(project,'chapters.json')));assert.equal(meta.chapters.length,chapters.length);
for(let i=0;i<chapters.length;i++){assert.equal(meta.chapters[i].tags.title,chapters[i].title);assert.ok(Math.abs(Number(meta.chapters[i].start_time)-chapters[i].seconds)<.002);}
const work=path.join(base,'work/higgsfield-replacement'),src=path.join(repo,'video/src/youtube');
const digest=createHash('sha256').update(JSON.stringify(props));
for(const name of readdirSync(src).filter(n=>/\.tsx?$/.test(n)).sort())digest.update(name).update(readFileSync(path.join(src,name)));
digest.update('WorldKit.tsx').update(readFileSync(path.join(repo,'video/src/WorldKit.tsx')));
for(const name of ['cube.mov','pipeline-result.jpg'])digest.update(readFileSync(path.join(work,'public',name)));
for(const folder of ['v3','v4','v7','v9'])for(const name of readdirSync(path.join(work,'public',folder)).sort())digest.update(name).update(readFileSync(path.join(work,'public',folder,name)));
const sourceHash=digest.digest('hex'),renderDir=path.join(work,'chunks-'+sourceHash.slice(0,10));
assert.equal(readFileSync(path.join(renderDir,'audio-contract.txt'),'utf8').trim(),audioContract(base),'Soundtrack receipt must match the current source EDL and cue schedule');
assert.equal(readFileSync(path.join(renderDir,'dialogue-design-mix.wav.complete'),'utf8').trim(),sourceHash);
const equivalentChunks=[];
if(['v14','v15','v16','v17','v18','v19','v20','v21'].includes(revision))execFileSync(process.execPath,[path.join(project,`tools/prepare-${revision}-cache.mjs`),'--check-only'],{stdio:'ignore'});
for(let from=0;from<frames;from+=2700){const to=Math.min(from+2699,frames-1),receipt=JSON.parse(readFileSync(path.join(renderDir,`picture-${from}-${to}.mp4.complete`)));assert.equal(receipt.hash,sourceHash);assert.equal(receipt.from,from);assert.equal(receipt.to,to);if(receipt.inheritedFrom){const proof=JSON.parse(readFileSync(path.join(work,['v14','v15','v16','v17','v18','v19','v20','v21'].includes(revision)?`revision-${revision}/cache-proof.json`:'revision-v10/cache-proof.json')));assert.equal(proof.sourceHash,sourceHash);assert.equal(proof.priorSourceHash,receipt.inheritedFrom);assert.equal(proof.otherInputsIdentical,true);assert.ok(!proof.affected.some(r=>r.from<=to&&r.to>=from));equivalentChunks.push({from,to,priorSourceHash:receipt.inheritedFrom});}}
console.log('Metadata passed; decoding all picture and audio frames.');
execFileSync(ff,['-v','error','-xerror','-i',output,'-map','0:v:0','-map','0:a:0','-f','null','-'],{stdio:'inherit'});
console.log('Decode passed; measuring finished AAC loudness.');
const levels=spawnSync(ff,['-hide_banner','-i',output,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],{encoding:'utf8',maxBuffer:5e6});
assert.equal(levels.status,0);const loudness=JSON.parse(levels.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)[0]);
assert.ok(Number(loudness.input_tp)<=-.8);assert.ok(Number(loudness.input_i)>=-18&&Number(loudness.input_i)<=-14);
const result={output,bytes:Number(meta.format.size),duration:Number(meta.format.duration),frames,width:v.width,height:v.height,fps:v.r_frame_rate,sourceHash,allPictureChunksMatchCurrentSource:true,audio:{codec:a[0].codec_name,sampleRate:a[0].sample_rate,channels:a[0].channels,lufs:Number(loudness.input_i),truePeak:Number(loudness.input_tp),lra:Number(loudness.input_lra)},chapters:meta.chapters.map(c=>({title:c.tags.title,seconds:Number(c.start_time)})),decodePassed:true,fullHumanListeningReview:false};
result.verifiedEquivalentReusedChunks=equivalentChunks;
const audioHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
result.audioPacketHash=audioHash(output);
const priorAudio=path.join(base,'outputs/higgsfield-replacement-edit-v9.mp4');
result.audioMatchesV9Packets=existsSync(priorAudio)?result.audioPacketHash===audioHash(priorAudio):null;
if(existsSync(priorAudio))assert.equal(result.audioMatchesV9Packets,false,'V12 must contain repaired narration and new source-anchored sound design');
result.currentAudioContractVerified=true;
if(revision==='v20'||revision==='v21'){
 const mastering=JSON.parse(readFileSync(path.join(renderDir,'mastering-settings.json')));assert.equal(mastering.sourceHash,sourceHash);assert.equal(mastering.truePeakTarget,-2.5);result.mastering=mastering;
 assert.ok([0,revision==='v21'?4:3].includes(equivalentChunks.length));
 const proof=JSON.parse(execFileSync(process.execPath,[path.join(project,`tools/prepare-${revision}-cache.mjs`),'--check-only'],{encoding:'utf8'}));assert.equal(proof.narrationAndEDLIdentical,true);result.narrationAndEDLUnchangedFromBaseline=proof.baselineCommit;
 if(revision==='v21'){
  const receipt=JSON.parse(readFileSync(path.join(work,'revision-v21/cache-proof.json')));
  result.verifiedReusedParts=[];
  for(const row of receipt.reused){
   const file=path.join(renderDir,row.bounded?'bounded-parts':'',`picture-${row.from}-${row.to}.mp4`);
   assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'),row.sha256);
   assert.equal(row.baselineReceipt.hash,proof.priorSourceHash);
   assert.ok(!proof.affected.some(q=>q.from<=row.to&&q.to>=row.from));
   result.verifiedReusedParts.push({from:row.from,to:row.to,bounded:row.bounded,sha256:row.sha256});
  }
 }
 const prior=path.join(base,'outputs/higgsfield-replacement-edit-v19.mp4');result.audioMatchesV19Packets=null;result.unchangedPictureAfter270Seconds=null;
 if(existsSync(prior)){
  result.audioMatchesV19Packets=result.audioPacketHash===audioHash(prior);assert.equal(result.audioMatchesV19Packets,false,'Updated file/vault/conveyor sound cues must reach export');
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,8100)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter270Seconds=tailHash(output)===tailHash(prior);assert.equal(result.unchangedPictureAfter270Seconds,true);
 }
}else if(revision==='v19'){
 const mastering=JSON.parse(readFileSync(path.join(renderDir,'mastering-settings.json')));assert.equal(mastering.sourceHash,sourceHash);assert.equal(mastering.truePeakTarget,-2.5);result.mastering=mastering;
 assert.ok([0,4].includes(equivalentChunks.length));
 const proofFile=path.join(work,'revision-v19/cache-proof.json'),proof=existsSync(proofFile)?JSON.parse(readFileSync(proofFile)):JSON.parse(execFileSync(process.execPath,[path.join(project,'tools/prepare-v19-cache.mjs'),'--check-only'],{encoding:'utf8'}));assert.equal(proof.narrationAndEDLIdentical,true);result.narrationAndEDLUnchangedFromV18=true;
 const priorV18=path.join(base,'outputs/higgsfield-replacement-edit-v18.mp4');
 result.audioMatchesV18Packets=null;result.unchangedPicture90Through450Seconds=null;
 if(existsSync(priorV18)){
 result.audioMatchesV18Packets=result.audioPacketHash===audioHash(priorV18);assert.equal(result.audioMatchesV18Packets,false,'New opening/contact/roadmap/closing SFX must reach export');
 const middleHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=between(n\\,2700\\,13499)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
 result.unchangedPicture90Through450Seconds=middleHash(output)===middleHash(priorV18);assert.equal(result.unchangedPicture90Through450Seconds,true);
 }
 const priorMix=path.join(work,'chunks-c1968e13c5/dialogue-design-mix.wav');result.unchangedPremasterAudio90Through450Seconds=null;
 if(existsSync(priorMix)){
  const pcmHash=file=>execFileSync(ff,['-v','error','-ss','90','-t','360','-i',file,'-map','0:a:0','-c:a','pcm_s16le','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPremasterAudio90Through450Seconds=pcmHash(path.join(renderDir,'dialogue-design-mix.wav'))===pcmHash(priorMix);assert.equal(result.unchangedPremasterAudio90Through450Seconds,true);
 }
}else if(revision==='v18'){
 const transitionProof=path.join(work,'revision-v18/transition-cache-proof.json');
 if(existsSync(transitionProof)){
  assert.equal(JSON.parse(readFileSync(transitionProof)).sourceHash,sourceHash);
  execFileSync(process.execPath,[path.join(project,'tools/prepare-v18-transition-cache.mjs'),'--check-only'],{stdio:'ignore'});
  result.workspaceTransitionRefinementVerified=true;
 }
 assert.ok([0,5].includes(equivalentChunks.length),'V18 permits fresh render or proven-unaffected tail');
 const priorV17=path.join(base,'outputs/higgsfield-replacement-edit-v17.mp4');
 result.audioMatchesV17Packets=null;result.unchangedPictureAfter50Seconds=null;
 if(existsSync(priorV17)){
  result.audioMatchesV17Packets=result.audioPacketHash===audioHash(priorV17);assert.equal(result.audioMatchesV17Packets,true);
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,1500)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter50Seconds=tailHash(output)===tailHash(priorV17);assert.equal(result.unchangedPictureAfter50Seconds,true);
 }
}else if(revision==='v17'){
 const penProofFile=path.join(work,'revision-v17/pen-lift-cache-proof.json');
 if(existsSync(penProofFile)){
  const penProof=JSON.parse(readFileSync(penProofFile));assert.equal(penProof.sourceHash,sourceHash);
  execFileSync(process.execPath,[path.join(project,'tools/prepare-v17-pen-cache.mjs'),'--check-only'],{stdio:'ignore'});
  result.penLiftRefinementVerified=true;
 }
 assert.ok([0,5].includes(equivalentChunks.length),'V17 permits fresh render or proven-unaffected tail');
 const priorV16=path.join(base,'outputs/higgsfield-replacement-edit-v16.mp4');
 result.audioMatchesV16Packets=null;result.unchangedPictureAfter90Seconds=null;
 if(existsSync(priorV16)){
  result.audioMatchesV16Packets=result.audioPacketHash===audioHash(priorV16);assert.equal(result.audioMatchesV16Packets,true);
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,2700)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter90Seconds=tailHash(output)===tailHash(priorV16);assert.equal(result.unchangedPictureAfter90Seconds,true);
 }
}else if(revision==='v16'){
 assert.ok([0,5].includes(equivalentChunks.length),'V16 permits fresh render or proven-unaffected tail');
 const priorV15=path.join(base,'outputs/higgsfield-replacement-edit-v15.mp4');
 result.audioMatchesV15Packets=null;result.unchangedPictureAfter40Seconds=null;
 if(existsSync(priorV15)){
  result.audioMatchesV15Packets=result.audioPacketHash===audioHash(priorV15);assert.equal(result.audioMatchesV15Packets,true);
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,1200)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter40Seconds=tailHash(output)===tailHash(priorV15);assert.equal(result.unchangedPictureAfter40Seconds,true);
 }
}else if(revision==='v15'){
 assert.ok([0,5].includes(equivalentChunks.length),'V15 permits fresh render or proven-unaffected tail');
 const priorV14=path.join(base,'outputs/higgsfield-replacement-edit-v14.mp4');
 result.audioMatchesV14Packets=null;result.unchangedPictureAfter60Seconds=null;
 if(existsSync(priorV14)){
  result.audioMatchesV14Packets=result.audioPacketHash===audioHash(priorV14);
  assert.equal(result.audioMatchesV14Packets,true,'V15 must preserve the entire V14 soundtrack');
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,1800)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter60Seconds=tailHash(output)===tailHash(priorV14);
  assert.equal(result.unchangedPictureAfter60Seconds,true,'Every decoded frame beyond the intro must equal V14');
 }
}else if(revision==='v14'){
 assert.ok([0,5].includes(equivalentChunks.length),'V14 is either fresh or uses the five proven-unaffected chunks');
 const priorV13=path.join(base,'outputs/higgsfield-replacement-edit-v13.mp4');
 result.audioMatchesV13Packets=null;result.unchangedPictureAfter20Seconds=null;
 if(existsSync(priorV13)){
  result.audioMatchesV13Packets=result.audioPacketHash===audioHash(priorV13);
  assert.equal(result.audioMatchesV13Packets,true,'V14 is picture-only; retain the exact V13 soundtrack');
  const tailHash=file=>execFileSync(ff,['-v','error','-i',file,'-map','0:v:0','-vf','select=gte(n\\,600)','-vsync','0','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
  result.unchangedPictureAfter20Seconds=tailHash(output)===tailHash(priorV13);
  assert.equal(result.unchangedPictureAfter20Seconds,true,'Every decoded picture frame after the new opening must equal V13');
 }
}else assert.equal(equivalentChunks.length,0,'V12/V13 require fresh picture chunks');
writeFileSync(path.join(base,`work/higgsfield-replacement/revision-${revision}/export-validation.json`),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
