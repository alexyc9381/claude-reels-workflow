const {bundle}=require('@remotion/bundler');
const {renderStill,selectComposition,renderMedia}=require('@remotion/renderer');
const path=require('path'),fs=require('fs');
(async()=>{
 const round=process.env.TRIAL_ROUND||'r4',mode=process.argv[2]||'probe';
 const serveUrl=await bundle({entryPoint:path.resolve('src/lm146-index.tsx'),outDir:path.resolve(`../vo/lm146/trials-${round}-bundle`),onProgress:()=>{}});
 for(const [variant,id] of [['plug','LM146TrialB'],['assembly','LM146TrialC']]){
  if(process.env.TRIAL_ONLY&&process.env.TRIAL_ONLY!==variant)continue;
  const composition=await selectComposition({serveUrl,id});const dest=path.resolve(`../vo/lm146/trials/${variant}`);fs.mkdirSync(dest,{recursive:true});
  if(mode==='probe')for(const frame of (round==='r1'?[0,1,7,20,27,37,48,57,74,88,103,118,138,149,156,169,195]:[0,7,27,57,88,118,149,156,169,195])){
   await renderStill({composition,serveUrl,output:`${dest}/${round}-f${frame}.png`,frame,imageFormat:'png',logLevel:'error'});console.log(variant+' FRAME '+frame);
  }
  let last=-1;await renderMedia({composition,serveUrl,codec:'h264',pixelFormat:'yuv420p',colorSpace:'bt709',imageFormat:'png',outputLocation:`${dest}/${round}-${mode}.mp4`,...(mode==='probe'?{frameRange:[0,224]}:{}),crf:18,audioBitrate:'256k',concurrency:2,logLevel:'error',onProgress:({progress})=>{const n=Math.floor(progress*10);if(n>last){last=n;console.log(variant+' '+mode+' '+n*10+'%')}}});
 }
})().catch(e=>{console.error(e);process.exit(1)});
