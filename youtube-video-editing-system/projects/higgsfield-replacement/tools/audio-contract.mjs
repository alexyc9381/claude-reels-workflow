import {readFileSync,readdirSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import path from 'node:path';
export const audioContract=(base=process.cwd())=>{
 const repo=path.join(base,'work/repos/claude-reels-workflow'),src=path.join(repo,'video/src/youtube'),work=path.join(base,'work/higgsfield-replacement');
 const require=createRequire(path.join(repo,'video/package.json')),{transformSync}=require('esbuild');
 const manifest=JSON.parse(readFileSync(path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json')));
 const v9=manifest.manifest.editVersion==='v9',v8=['v8','v9'].includes(manifest.manifest.editVersion),v7=['v7','v8','v9'].includes(manifest.manifest.editVersion),cueName=v9?'v9Cues':v8?'v8Cues':v7?'v7Cues':'v4Cues';
 const code=readFileSync(path.join(src,v9?'YouTubeV9.tsx':v8?'YouTubeV8.tsx':v7?'YouTubeV7.tsx':'YouTubeV6.tsx'),'utf8');
 const cue=code.slice(code.indexOf('export const '+cueName+':'),code.indexOf('export const chapterTitles'));
 const box={module:{exports:{}}};runInNewContext(transformSync(cue,{loader:'ts',format:'cjs'}).code,box);
 const contract={manifest,
  scenes:code.slice(code.indexOf('export const fullScenes='),code.indexOf('const Definition:')),
  cues:box.module.exports[cueName].map(({id,offset,seconds,kind})=>({id,offset,seconds,kind})),
  sounds:code.slice(code.indexOf('export const soundEvents=')),
  timing:readFileSync(path.join(src,'roughcut-timing.ts'),'utf8'),easing:readFileSync(path.join(src,'glass-motion.ts'),'utf8'),
  obs:{bytes:statSync(path.join(work,'public/obs.mp4')).size},
  ...(v7?{narration:readFileSync(path.join(src,'RoughCut.tsx'),'utf8').slice(readFileSync(path.join(src,'RoughCut.tsx'),'utf8').indexOf('export const RoughCut:'))}:{}),
  assets:['v4',...(v9?['v9']:[])].flatMap(folder=>readdirSync(path.join(work,'public',folder)).filter(n=>/\.(wav|mp3)$/.test(n)).sort().map(n=>[folder+'/'+n,createHash('sha256').update(readFileSync(path.join(work,'public',folder,n))).digest('hex')]))};
 return createHash('sha256').update(JSON.stringify(contract)).digest('hex');
};
if(process.argv[1]?.endsWith('audio-contract.mjs'))console.log(audioContract());
