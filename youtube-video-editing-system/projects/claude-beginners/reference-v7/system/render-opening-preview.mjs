import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sixty=process.argv.includes('--sixty');
const thirty=process.argv.includes('--thirty');
const ten=process.argv.includes('--ten');
const v2=process.argv.includes('--v2');
const work=path.resolve(root,`../../work/opening-preview${sixty?'-60s':thirty?'-30s':v2?'-v2':ten?'-10s':''}`);
fs.mkdirSync(path.join(work,'empty'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,`src/opening-preview${sixty?'-60s':thirty?'-30s':v2?'-v2':ten?'-10s':''}.tsx`),outDir:path.join(work,'bundle'),publicDir:path.join(work,'empty')});
const pub=path.join(serveUrl,'public');
fs.rmSync(pub,{recursive:true,force:true});
fs.symlinkSync(path.join(root,'public'),pub,'dir');
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:sixty?'ClaudeOpening60s':thirty?'ClaudeOpening30s':v2?'ClaudeOpeningV2':ten?'ClaudeOpeningPreview10s':'ClaudeOpeningPreview',puppeteerInstance:browser});
 for(const frame of sixty?[1068,1128,1198,1280,1425,1513,1564,1730,1798]:thirty?[591,603,617,629,643,657]:v2?[22,48,86,140,195,299]:ten?[5,27,149,195,270,299]:[0,22,100,149]){
  await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:path.join(work,`frame-${frame}.png`),imageFormat:'png'});
 }
 console.log('Stills ready');
 if(!process.argv.includes('--stills')){
  const outputLocation=path.resolve(root,`../Claude-Opening-${sixty?(process.argv.includes('--detail-v2')?'60s-DetailedV2':'60s'):thirty?(process.argv.includes('--sound-v2')?'30s-SoundV2':'30s'):v2?'10s-V2':ten?'10s':'5s'}-Preview.mp4`);
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,codec:'h264',crf:18,audioBitrate:'192k',concurrency:2,offthreadVideoCacheSizeInBytes:64*1024*1024,overwrite:true});
  console.log('COMPLETE '+outputLocation);
 }
}finally{await browser.close({silent:true});}
