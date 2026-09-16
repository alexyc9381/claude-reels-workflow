import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const work=path.resolve(root,'../../work/v4-full');fs.mkdirSync(path.join(work,'empty'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/v4-full.tsx'),outDir:path.join(work,'bundle'),publicDir:path.join(work,'empty')});
const pub=path.join(serveUrl,'public');fs.rmSync(pub,{recursive:true,force:true});fs.symlinkSync(path.join(root,'public'),pub,'dir');
const timing=JSON.parse(fs.readFileSync(path.join(root,'src/v4-timing.json'),'utf8'));
const map=(old)=>{const s=timing.spans.find(s=>s.kind==='normal'&&old>=s.oldStart&&old<s.oldStart+s.duration);return s?s.newStart+old-s.oldStart:0;};
const browser=await openBrowser('chrome');
try {
const composition=await selectComposition({serveUrl,id:'ClaudeFullV4',puppeteerInstance:browser});
if(!process.argv.includes('--render-only'))for(const frame of [1189,2354,3760,5599,6980,9070,4809,4821,4840,6851,6870,6901,10957,10982,11012,11037,11091,11134].map(map)){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:path.join(work,`frame-${frame}.png`),imageFormat:'png'});}
console.log('STILLS READY');
if(!process.argv.includes('--stills'))for(let start=0;start<composition.durationInFrames;start+=600){if(process.argv.some(x=>x.startsWith('--chunks='))&&!process.argv.find(x=>x.startsWith('--chunks=')).split('=')[1].split(',').map(Number).includes(start))continue;const end=Math.min(composition.durationInFrames-1,start+599),outputLocation=path.join(work,`chunk-${String(start).padStart(4,'0')}.mp4`);if(fs.existsSync(outputLocation)&&process.argv.includes('--resume')){console.log('SKIP '+start);continue;}console.log('RENDER '+start+'-'+end);await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,frameRange:[start,end],codec:'h264',crf:19,audioBitrate:'192k',concurrency:3,offthreadVideoCacheSizeInBytes:48*1024*1024,overwrite:true});console.log('DONE '+start);}
}finally{await browser.close({silent:true});}
