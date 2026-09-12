import {mkdirSync,copyFileSync,writeFileSync,existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dir=path.resolve('work/higgsfield-replacement/public/v3');mkdirSync(dir,{recursive:true});
const assets=[
 ['higgsfield.jpg','/Users/alexchensmacmini/Downloads/brand-system/public/swaplogos/Higgsfield.jpg','Existing user brand-system Higgsfield logo'],
 ['hailuo.png','/Users/alexchensmacmini/Downloads/brand-system/public/swaplogos/src_hailuo.png','Existing user brand-system Hailuo logo'],
 ['claude.png',path.resolve('work/repos/claude-reels-workflow/video/public/claude_logo.png'),'Existing user Claude mark'],
 ['google.png','/Users/alexchensmacmini/Downloads/brand-system/public/logos/google.png','Existing user Google mark; used for Google Veo'],
 ...['glide','glass','land','tap'].map(n=>[`${n}.wav`,path.resolve(`work/preview-public/sfx-dispatch/${n}.wav`),'Approved No Code Alex dispatch SFX; quiet dialogue mix']),
 ['fal.png','https://fal.ai/apple-touch-icon.png','Official fal.ai site touch icon'],
 ['seedance.png','https://static.higgsfield.ai/explore/image-generate-block/seedance-logo.png','Model mark served by Higgsfield official site'],
 ['cipher.mp3','https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher2.mp3','Cipher — Kevin MacLeod (incompetech.com), CC BY 4.0; excerpt, fades and dialogue-first gain'],
];
const rows=await Promise.all(assets.map(async ([name,source,note])=>{
 const dest=path.join(dir,name);
 if(!existsSync(dest)) {
  if(source.startsWith('https:')) {const r=await fetch(source);if(!r.ok)throw Error(`${source}: ${r.status}`);writeFileSync(dest,Buffer.from(await r.arrayBuffer()));}
  else copyFileSync(source,dest);
 }
 return {name,source,note,bytes:readFileSync(dest).length,sha256:createHash('sha256').update(readFileSync(dest)).digest('hex')};
}));
writeFileSync(path.join(dir,'asset-ledger.json'),JSON.stringify(rows,null,2));console.log(rows);
