import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),pub=path.join(base,'work/higgsfield-replacement/public'),proof=path.join(base,'work/higgsfield-replacement/revision-v21/media');
const ff='/Users/alexchensmacmini/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1';
mkdirSync(proof,{recursive:true});
const correction='eq=gamma=1.28:brightness=0.018:contrast=1.08:gamma_weight=0.65:saturation=1.04';
const entries=[];
for(const [source,target] of [['v9/higgsfield-comparison.mp4','v9/intro-higgsfield-v21.mp4'],['v4/claude-result.mp4','v9/intro-claude-v21.mp4']]){
 const src=path.join(pub,source),dst=path.join(pub,target);
 if(!existsSync(dst))execFileSync(ff,['-nostdin','-v','error','-i',src,'-t','4','-vf',correction,'-an','-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-movflags','+faststart',dst]);
 execFileSync(ff,['-nostdin','-v','error','-i',dst,'-vf','fps=1,scale=480:-2,tile=3x1','-frames:v','1','-y',path.join(proof,path.basename(target,'.mp4')+'.png')]);
 entries.push({source,target,correction,sourceSHA256:createHash('sha256').update(readFileSync(src)).digest('hex'),targetSHA256:createHash('sha256').update(readFileSync(dst)).digest('hex'),scope:'Identical stronger brightness/contrast for opening only; originals and final A/B unchanged; muted normal-speed four-second loop'});
}
writeFileSync(path.join(pub,'v9/media-v21-ledger.json'),JSON.stringify(entries,null,2)+'\n');console.log(entries);
