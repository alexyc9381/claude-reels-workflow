import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.resolve(root,'../../work/half-actions');fs.mkdirSync(path.join(work,'empty'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/half-actions-preview.tsx'),outDir:path.join(work,'bundle'),publicDir:path.join(work,'empty')});
const pub=path.join(serveUrl,'public');fs.rmSync(pub,{recursive:true,force:true});fs.symlinkSync(path.join(root,'public'),pub,'dir');
const browser=await openBrowser('chrome');
try {
const composition=await selectComposition({serveUrl,id:'ClaudeHalfActions',puppeteerInstance:browser});
if(!process.argv.includes('--render-only'))for(const frame of [760,1885,2020,2150,2510,2640,3250,3400,3520,3610,3700,4000,4610,4870,5130,5350,5535]){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:path.join(work,`frame-${frame}.png`),imageFormat:'png'});}
console.log('STILLS READY');
if(!process.argv.includes('--stills'))for(let start=0;start<5574;start+=600){if(process.argv.some(x=>x.startsWith('--chunks='))&&!process.argv.find(x=>x.startsWith('--chunks=')).split('=')[1].split(',').map(Number).includes(start))continue;const end=Math.min(5573,start+599),outputLocation=path.join(work,`chunk-${String(start).padStart(4,'0')}.mp4`);if(fs.existsSync(outputLocation)&&process.argv.includes('--resume')){console.log('SKIP '+start);continue;}console.log('RENDER '+start+'-'+end);await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,frameRange:[start,end],codec:'h264',crf:19,audioBitrate:'192k',concurrency:2,offthreadVideoCacheSizeInBytes:48*1024*1024,overwrite:true});console.log('DONE '+start);}
}finally{await browser.close({silent:true});}
