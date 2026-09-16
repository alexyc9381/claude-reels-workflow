import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.resolve(root,'../../work/half-preview');fs.mkdirSync(path.join(work,'empty'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/half-preview.tsx'),outDir:path.join(work,'bundle'),publicDir:path.join(work,'empty')});
const pub=path.join(serveUrl,'public');fs.rmSync(pub,{recursive:true,force:true});fs.symlinkSync(path.join(root,'public'),pub,'dir');
const browser=await openBrowser('chrome');
try {
const composition=await selectComposition({serveUrl,id:'ClaudeHalf',puppeteerInstance:browser});
if(!process.argv.includes('--render-only'))for(const frame of (process.argv.includes('--fix-stills')?[760,3300,4610]:[722,760,800,1080,1130,1880,2130,2310,2360,2530,2635,2900,3100,3300,3400,3620,3765,3905,4080,4310,4510,4610,4740,4870,5010,5240,5400,5570])){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:path.join(work,`frame-${frame}.png`),imageFormat:'png'});}
console.log('STILLS READY');
if(!process.argv.includes('--stills'))for(let start=0;start<5592;start+=600){if(process.argv.some(x=>x.startsWith('--chunks='))&&!process.argv.find(x=>x.startsWith('--chunks=')).split('=')[1].split(',').map(Number).includes(start))continue;const end=Math.min(5591,start+599),outputLocation=path.join(work,`chunk-${String(start).padStart(4,'0')}.mp4`);if(fs.existsSync(outputLocation)&&process.argv.includes('--resume')){console.log('SKIP '+start);continue;}console.log('RENDER '+start+'-'+end);await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,frameRange:[start,end],codec:'h264',crf:19,audioBitrate:'192k',concurrency:2,offthreadVideoCacheSizeInBytes:48*1024*1024,overwrite:true});console.log('DONE '+start);}
}finally{await browser.close({silent:true});}
