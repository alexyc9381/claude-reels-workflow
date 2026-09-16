// Exact source conform for this straight-cut composition; no browser frame intermediates.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import crypto from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const edit=JSON.parse(fs.readFileSync(path.join(root,'src/edit.json'),'utf8'));
const ffmpeg=JSON.parse(fs.readFileSync(path.join(root,'runtime-paths.json'),'utf8')).ffmpeg;
const work=path.resolve(root,'../../work');fs.mkdirSync(work,{recursive:true});
const paths=edit.segments.map((s,i)=>path.join(root,'public/takes',String(i).padStart(3,'0')+'.mp4'));
const list=path.join(work,'first-cut-conform.txt');fs.writeFileSync(list,paths.map(p=>`file '${p.replaceAll("'","'\\''")}'`).join('\n')+'\n');
const out=path.resolve(root,'../Claude-For-Beginners-First-Cut.mp4');
execFileSync(ffmpeg,['-nostdin','-v','error','-f','concat','-safe','0','-i',list,'-i',path.join(root,'public/dialogue.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart','-shortest','-y',out],{stdio:'inherit'});
const frames=edit.segments.reduce((n,s)=>n+s.sourceEndFrame-s.sourceStartFrame,0);
fs.writeFileSync(path.join(root,'render-receipt.json'),JSON.stringify({authoring:'Remotion 4.0.370, ClaudeBeginnersFirstCut',export:'FFmpeg source conform of the identical straight-cut EDL; video copied without another generation of compression',reason:'Full Remotion frame render and 600-frame section render failed with ENOSPC; no creative or timing changes were made for this export.',frames,fps:edit.outputFps,audio:'Continuous normalized voiceover encoded once, no camera audio',manifestSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'src/edit.json'))).digest('hex'),output:out},null,2));
console.log(out);
