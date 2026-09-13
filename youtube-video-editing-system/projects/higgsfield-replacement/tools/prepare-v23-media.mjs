// Restore the two additional marks from tracked repo assets; never overwrite differing media.
import {readFileSync,writeFileSync,existsSync,copyFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement'),media=path.join(base,'work/higgsfield-replacement/public');
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const copies=[['kling.png','kling-v23.png'],['runway.svg','runway-v23.svg']];
const restored=copies.map(([source,target])=>{
 const from=path.join(repo,'video/public/logos_official',source),to=path.join(media,'v9',target);
 if(existsSync(to)&&hash(to)!==hash(from))throw Error('Refusing to replace changed asset: '+to);
 if(!existsSync(to)){mkdirSync(path.dirname(to),{recursive:true});copyFileSync(from,to);}
 return {source:'video/public/logos_official/'+source,target:'v9/'+target,sha256:hash(to),provenance:'Existing tracked repository mark; reused unmodified. Not newly independently licensed or vendor-certified.'};
});
const reused=['v3/seedance.png','v3/google.png','v3/hailuo.png','v4/chase.wav','v4/click.wav','v4/whip.wav','v4/land.wav','v4/shutter.wav','v4/paper.wav','v4/latch.wav'].map(file=>({file,sha256:hash(path.join(media,file))}));
const ledger={revision:'V23',copies:restored,reused,logoScope:'Representative video-model identities. Google is a provider mark for Veo; not a promise of exhaustive model support.',audioProvenance:'See assets-v4.json for original provenance and licensing. Chase Pulse Faster by Kevin MacLeod requires attribution. V23 reuses its existing VO-band carve with a local reaction duck; air and landing sounds are editorial, not generated-video native audio.',generatedVisuals:'Synthetic masked API UI, illustrated contact-sheet videos and folder are code-native Remotion/SVG scene elements. No actual credential, new voice or downloaded generated media.',services:'No newly connected or paid media service.'};
const out=path.join(project,'provenance/v23-media.json');
if(process.argv.includes('--check-only')){
 const stored=JSON.parse(readFileSync(out));if(JSON.stringify(stored)!==JSON.stringify(ledger))throw Error('V23 media ledger mismatch');
}else writeFileSync(out,JSON.stringify(ledger,null,2)+'\n');
console.log('V23 media hashes verified; two repository marks restored without substituting originals.');
