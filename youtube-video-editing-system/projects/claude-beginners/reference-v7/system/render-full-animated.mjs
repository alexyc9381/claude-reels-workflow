import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.resolve(root,'../../work/full-animated');fs.mkdirSync(path.join(work,'empty'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/full-animated.tsx'),outDir:path.join(work,'bundle'),publicDir:path.join(work,'empty')});
const pub=path.join(serveUrl,'public');fs.rmSync(pub,{recursive:true,force:true});fs.symlinkSync(path.join(root,'public'),pub,'dir');
const browser=await openBrowser('chrome');
try {
const composition=await selectComposition({serveUrl,id:'ClaudeFullAnimated',puppeteerInstance:browser});
if(!process.argv.includes('--render-only'))for(const frame of [760,1738,2910,3090,4870,5380,5637,5800,5900,6090,6220,6430,6670,6870,7140,7350,7500,7800,7860,8020,8300,8630,9320,9500,9730,9790,9990,10160,10300,10630,10870,11120]){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:path.join(work,`frame-${frame}.png`),imageFormat:'png'});}
console.log('STILLS READY');
if(!process.argv.includes('--stills'))for(let start=0;start<11151;start+=600){if(process.argv.some(x=>x.startsWith('--chunks='))&&!process.argv.find(x=>x.startsWith('--chunks=')).split('=')[1].split(',').map(Number).includes(start))continue;const end=Math.min(11150,start+599),outputLocation=path.join(work,`chunk-${String(start).padStart(4,'0')}.mp4`);if(fs.existsSync(outputLocation)&&process.argv.includes('--resume')){console.log('SKIP '+start);continue;}console.log('RENDER '+start+'-'+end);await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,frameRange:[start,end],codec:'h264',crf:19,audioBitrate:'192k',concurrency:3,offthreadVideoCacheSizeInBytes:48*1024*1024,overwrite:true});console.log('DONE '+start);}
}finally{await browser.close({silent:true});}
