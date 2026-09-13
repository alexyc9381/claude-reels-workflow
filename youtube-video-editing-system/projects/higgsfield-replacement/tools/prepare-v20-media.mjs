import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),pub=path.join(base,'work/higgsfield-replacement/public'),proof=path.join(base,'work/higgsfield-replacement/revision-v20/media');
const ff='/Users/alexchensmacmini/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1';
mkdirSync(proof,{recursive:true});
// Identical conservative preview-only correction. No white balance shift,
// no local relighting, no manipulation of the final blind comparison.
const correction='eq=gamma=1.12:brightness=0.006:contrast=1.02:gamma_weight=0.55';
const entries=[];
for(const [source,target] of [['v9/higgsfield-comparison.mp4','v9/intro-higgsfield-v20.mp4'],['v4/claude-result.mp4','v9/intro-claude-v20.mp4']]){
 const src=path.join(pub,source),dst=path.join(pub,target);
 if(!existsSync(dst))execFileSync(ff,['-nostdin','-v','error','-i',src,'-t','4','-vf',correction,'-an','-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-movflags','+faststart',dst]);
 for(const [name,file] of [['before',src],['after',dst]])execFileSync(ff,['-nostdin','-v','error','-i',file,'-vf','fps=1,scale=480:-2,tile=3x1','-frames:v','1','-y',path.join(proof,path.basename(target,'.mp4')+'-'+name+'.png')]);
 entries.push({source,target,correction,sourceSHA256:createHash('sha256').update(readFileSync(src)).digest('hex'),targetSHA256:createHash('sha256').update(readFileSync(dst)).digest('hex'),scope:'Opening ComparisonV10 only; normal playback; muted; original comparison assets unchanged'});
}
entries.push({source:'https://higgsfield.ai/',target:'v9/higgsfield-page-v20.png',kind:'Actual homepage screenshot, not a recording or fabricated UI',captured:'2026-09-12',account:'Signed out; cookie notice and promotion strip dismissed; no private data',sha256:createHash('sha256').update(readFileSync(path.join(pub,'v9/higgsfield-page-v20.png'))).digest('hex')});
writeFileSync(path.join(pub,'v9/media-v20-ledger.json'),JSON.stringify(entries,null,2)+'\n');
console.log(entries);
