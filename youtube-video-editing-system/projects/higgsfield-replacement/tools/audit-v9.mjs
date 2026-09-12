import {readFileSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement'),src=path.join(repo,'video/src/youtube');
const require=createRequire(path.join(repo,'video/package.json')),{transformSync}=require('esbuild');
const read=n=>readFileSync(path.join(src,n),'utf8');
const evaluate=(code,scope={})=>{const box={module:{exports:{}},...scope};runInNewContext(transformSync(code,{loader:'ts',format:'cjs'}).code,box);return box.module.exports;};
const m=JSON.parse(readFileSync(path.join(project,'roughcut.props.json'))).manifest;
const timing=evaluate(read('roughcut-timing.ts')),rows=timing.roughTimeline(m),chapters=timing.roughChapters(m),end=rows.at(-1).from+rows.at(-1).duration;
const code=read('YouTubeV9.tsx');
const full=evaluate(code.slice(code.indexOf('export const fullScenes='),code.indexOf('const Definition:')),{roughTimeline:timing.roughTimeline}).fullScenes(m);
const cues=evaluate(code.slice(code.indexOf('export const v9Cues:'),code.indexOf('export const chapterTitles'))).v9Cues;
const beatStories={
hook:['Large A/B screens open together','Sprites inspect; timed aura resolves; invoice is printed and compared','Question is established before naming Higgsfield'],
studio:['Typed /fal-video request','Model selector drives iris and scanning preview; courier collects result','Saved video artifact'],
roadmap:['Connected route with three concrete landmarks','Courier crosses connect/create/compare stops','Destination reached, teaser begins'],
guide:['Guide opens into a directed miniature set','Tools deploy and perform a shot','Tools repack into a carried skill'],
wrapper:['Visible interface covers underlying model optics','Shell lifts; model mechanisms engage; allowance decreases','Viewer sees wrapper and limitations separately'],
direct:['Request workstation faces populated model racks','Connection engages, request selects a model, courier receives result','Feature-gating vault separately opens another access route'],
download:['Skill link in the description','File leaves source, lands in tray; courier approaches','Collected download ready to import'],
skill:['Kit contains model and connection instructions','Director operates a pursuit shot; instructions consolidate','File enters Claude and the command is typed'],
compare:['Two large comparison surfaces','Short retained question; identities unfold at the spoken reveal','No repeated recap; free-guide teaser bridges to closing'],
outro:['Courier holds downloadable skill','Anticipate, throw, catch, import, type command','Directed shot appears in Claude workspace']
};
const supports=cues.map(c=>{const r=rows.find(r=>r.id===c.id),start=r.from/m.fps+c.offset;return {id:c.id+':'+c.offset,kind:c.kind,title:c.title,start,end:Math.min(start+c.seconds,(r.from+r.duration)/m.fps)};});
const report={version:'v9',duration:end/m.fps,frames:end,sourceAudio:'OBS only',scenes:full.map(s=>({...s,start:s.from/m.fps,end:(s.from+s.duration)/m.fps,beats:beatStories[s.kind]})),supports,chapters,oneFramePlateHolds:rows.filter(r=>r.duration>r.cameraPlateDuration).map(r=>({id:r.id,frames:r.duration-r.cameraPlateDuration,reason:'Cumulative frame rounding; hold final valid frame instead of sampling next shot'})),pending:['Actual comparison A','Matched B cost evidence','Camera-movement OBS voiceover pickup','Bonus-resource identity and asset','Creative and human listening approval']};
writeFileSync(path.join(project,'motion-map-v9.json'),JSON.stringify(report,null,2)+'\n');
writeFileSync(path.join(project,'v9-timeline.json'),JSON.stringify(rows,null,2)+'\n');
writeFileSync(path.join(project,'chapters.json'),JSON.stringify(chapters,null,2)+'\n');
writeFileSync(path.join(project,'chapters.ffmetadata'),';FFMETADATA1\n'+chapters.map((c,i)=>'[CHAPTER]\nTIMEBASE=1/'+m.fps+'\nSTART='+c.frame+'\nEND='+(chapters[i+1]?.frame??end)+'\ntitle='+c.title+'\n').join(''));
const stamp=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
writeFileSync(path.join(project,'youtube-chapters.txt'),chapters.map(c=>stamp(c.seconds)+' '+c.title).join('\n')+'\n');
console.log(JSON.stringify({duration:report.duration,frames:end,scenes:full.length,cues:supports.length,chapters:chapters.length,holds:report.oneFramePlateHolds},null,2));
