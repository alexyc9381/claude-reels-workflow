import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './brand';
import {roughTimeline,roughChapters,type RoughCutManifest} from './roughcut-timing';
import {easeOut,easeInOut} from './glass-motion';
import {OriginalClaude} from './OriginalClaude';
import {typingFocus} from './typing-focus';
import {C,clamp,lerp,pop,visible,Glass,Logo,Actor,Key,Film,ProgressBorder,BrandedBackground} from './YouTubeV4Primitives';
import {HookScene,ModelStudio,RoadmapScene,SkillScene,DownloadScene,DirectScene,CompareScene} from './YouTubeV4Scenes';
export {BrandedBackground};
export const openingScale=(t:number)=>1+.038*(1-Math.exp(-Math.max(0,t)/.17))+.027*easeOut(t,0,4.5);
const useTime=()=>useCurrentFrame()/useVideoConfig().fps;
type M=RoughCutManifest;
type Scene={id:string;from:number;duration:number;kind:'hook'|'studio'|'roadmap'|'direct'|'download'|'skill'|'compare'|'outro';a?:number;b?:number;c?:number};
export const fullScenes=(m:M):Scene[]=>{
 const rows=roughTimeline(m),get=(id:string)=>rows.find(r=>r.id===id)!,end=(id:string)=>get(id).from+get(id).duration;
 const span=(id:string,last:string,kind:Scene['kind'],extra:Partial<Scene>={})=>({id,from:get(id).from,duration:end(last)-get(id).from,kind,...extra});
 return [
  span('s001','r-higgsfield','hook',{a:get('s002').from/m.fps,b:get('s003').from/m.fps,c:get('r-higgsfield').from/m.fps}),
  span('s004','s005','studio'),span('s006','s006','roadmap'),
  span('r-direct','r-features','direct',{a:(get('r-features').from-get('r-direct').from)/m.fps}),
  {...span('s017','s017','download'),from:get('s017').from+3*m.fps,duration:get('s017').duration-3*m.fps},
  span('s018','s019','skill',{a:(get('s019').from-get('s018').from)/m.fps}),
  span('s038','s043','compare',{a:(get('s043').from-get('s038').from)/m.fps}),
  span('s044','s045','outro'),
 ];
};
export const inFullScene=(m:M,frame:number)=>fullScenes(m).some(s=>frame>=s.from&&frame<s.from+s.duration);

const Definition:React.FC<{duration:number;term:string;meaning:string}>=({duration,term,meaning})=>{
 const t=useTime(),p=pop(t,0);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={110} y={780} w={1150} h={220} t={t} frost={.86} style={{transform:`translateY(${(1-p)*70}px)`}}>
   <div style={{position:'absolute',left:34,top:22,fontFamily:displayFont,fontSize:49,color:C.orange,lineHeight:1.05}}>{term}</div>
   <div style={{position:'absolute',left:34,top:92,width:917,fontSize:33,lineHeight:1.25,fontWeight:500}}>{meaning}</div>
   <div style={{position:'absolute',right:22,top:65,transform:`rotate(${Math.sin(t*1.7)*5}deg)`}}>{term.startsWith('API')?<Key size={102} t={t}/>:<Logo name="claude.png" size={100}/>}</div>
   <ProgressBorder w={1150} h={220} t={t} d={duration}/>
  </Glass>
  <Actor t={t} x={1100} y={629} size={180} role="archivist" hop={.05}/>
 </AbsoluteFill>;
};
const Chapter:React.FC<{duration:number;step:number;title:string}>=({duration,step,title})=>{
 const t=useTime(),p=pop(t,.08),unfold=easeOut(t,.23,.55);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}>
  <Glass x={111} y={102} w={1010} h={184} t={t} frost={.91} style={{transform:`translateX(${(1-p)*-130}px) rotate(${(1-p)*-5}deg)`}}>
   <div style={{position:'absolute',left:184,top:22,color:C.orange,fontSize:22,letterSpacing:2,fontWeight:700}}>PART {String(step).padStart(2,'0')}</div>
   <div style={{position:'absolute',left:183,top:64,fontFamily:displayFont,fontSize:45,color:C.ink,transform:`translateX(${(1-unfold)*-26}px)`,opacity:unfold}}>{title}</div>
   <div style={{position:'absolute',left:184,top:145,display:'flex',gap:14}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:i===step?164:43,height:8,borderRadius:5,background:i<=step?C.orange:'#D9C7AE',transform:`scaleX(${easeOut(t,.3+i*.04,.3)})`,transformOrigin:'left'}}/>)}</div>
   <div style={{position:'absolute',left:14,top:11,width:150,height:158,borderRadius:27,background:'linear-gradient(130deg,#F8DFC1,#F4B77A)',boxShadow:'inset 2px 3px 4px #FFF8DE'}}/>
   <Actor t={t} x={15} y={15} size={150} role={step%2?'courier':'archivist'} hop={.2} lift={18} happy/>
  </Glass>
 </AbsoluteFill>;
};
const Brand:React.FC<{duration:number;logo:string;title:string;text?:string}>=({duration,logo,title,text})=>{
 const t=useTime(),p=pop(t,.05);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}><Glass x={114} y={809} w={850} h={183} t={t} frost={.83} style={{transform:`translateX(${(1-p)*-100}px) rotate(${(1-p)*-4}deg)`}}>
  <div style={{position:'absolute',left:28,top:28,transform:`rotate(${(1-p)*-30}deg)`}}><Logo name={logo} size={120}/></div>
  <div style={{position:'absolute',left:179,top:text?29:60,fontFamily:displayFont,fontSize:46}}>{title}</div>{text&&<div style={{position:'absolute',left:179,top:100,fontSize:28}}>{text}</div>}
 </Glass></AbsoluteFill>;
};

/** Protected credential panel is drawn as a schematic, never as a captured secret. */
const KeyWorkflow:React.FC<{duration:number}>=({duration})=>{
 const t=useTime(),step=t<4.8?0:t<9?1:2,copy=easeInOut(t,10,1.2);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={391} y={224} w={955} h={442} t={t} frost={.92}>
   <div style={{position:'absolute',left:33,top:27,display:'flex',alignItems:'center',gap:16}}><Logo name="fal.png" size={57}/><div style={{fontFamily:displayFont,fontSize:40}}>{['Open API keys','Create a key','Copy and keep it private'][step]}</div></div>
   <div style={{position:'absolute',left:33,top:133,width:220,height:232,borderRadius:23,background:'#E6EEDD'}}>{['Settings','API keys','New key'].map((s,i)=><div key={s} style={{padding:'14px 23px',fontSize:27,color:i===Math.min(step+1,2)?C.orange:'#5B695B',background:i===Math.min(step+1,2)?'#FFFDF1':undefined,transform:`translateX(${i===Math.min(step+1,2)?5:0}px)`}}>{s}</div>)}</div>
   <div style={{position:'absolute',left:321+copy*305,top:171-Math.sin(copy*Math.PI)*85,transform:`scale(${pop(t,.4)}) rotate(${-15+copy*25}deg)`}}><Key t={t} size={147}/></div>
   <div style={{position:'absolute',left:33,top:388,fontSize:20,color:C.teal}}>Illustration · private values hidden</div>
   <div style={{position:'absolute',left:636,top:160,width:245,height:170,borderRadius:25,border:'3px solid '+C.teal,background:'#F6FBED',opacity:easeOut(t,8.2,.5)}}><div style={{position:'absolute',left:25,top:98,fontSize:33,letterSpacing:5,color:C.teal}}>••••••••</div></div>
   <Actor t={t} x={735} y={240} size={160} role="operator" hop={5.8}/>
  </Glass>
 </AbsoluteFill>;
};

type SupportKind='later'|'typing'|'budget'|'storyboard'|'format'|'saved'|'wrapper'|'sound'|'detail';
const Support:React.FC<{duration:number;kind:SupportKind}>=({duration,kind})=>{
 const t=useTime(),p=pop(t,.04);
 if(kind==='later')return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}><Glass x={115} y={789} w={1090} h={200} t={t} frost={.9} style={{transform:`translateY(${(1-p)*80}px)`}}>
  <div style={{position:'absolute',left:34,top:31,width:121,height:134,borderRadius:21,background:C.orange,color:'#FFF5DE',display:'grid',placeItems:'center',fontFamily:displayFont,fontSize:72}}>↳</div>
  <div style={{position:'absolute',left:186,top:33,fontFamily:displayFont,fontSize:48,color:C.orange}}>The fix is coming up.</div><div style={{position:'absolute',left:187,top:107,fontSize:32}}>Watch the budget step before generating.</div>
  <Actor t={t} x={930} y={-75} size={157} role="courier" hop={.1}/>
 </Glass></AbsoluteFill>;
 const words=kind==='typing'?'/fal-video':kind==='budget'?'Budget for this request':kind==='storyboard'?'Plan the shots':kind==='format'?'Choose the frame':kind==='saved'?'Saved to your project':kind==='wrapper'?'The models underneath':kind==='sound'?'Listen: voice · rain · impact':'Look closer: motion + detail';
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={112} y={753} w={1095} h={247} t={t} frost={.85} style={{transform:`translateY(${(1-p)*80}px) rotate(${(1-p)*-3}deg)`}}>
   <div style={{position:'absolute',left:31,top:22,fontFamily:displayFont,fontSize:41,color:C.orange}}>{words}</div>
   {kind==='typing'?<>
    <div style={{position:'absolute',left:280,top:102,width:749,height:110,borderRadius:22,background:'#FDFCEF',border:'2px solid #FFFFFF',boxShadow:'inset 0 3px 7px #3F715920'}}><div style={{padding:'30px 30px',fontSize:31,color:C.teal}}>{'Make a cinematic rooftop scene…'.slice(0,Math.floor(clamp((t-.7)/2.4)*32))}<span style={{opacity:Math.sin(t*8)>0?1:.15}}>▏</span></div></div>
    <Actor t={t} x={27} y={41} size={185} role="operator" hop={.12}/><div style={{position:'absolute',left:138,top:145,width:142,height:57,background:C.teal,borderRadius:10,transform:'skewX(-12deg)'}}>{Array.from({length:12},(_,i)=><span key={i} style={{display:'inline-block',width:14,height:7,margin:'5px 4px',background:Math.floor(t*13)%12===i?C.gold:'#D2E9DC',borderRadius:2}}/>)}</div>
   </>:kind==='budget'?<>
    <div style={{position:'absolute',left:43,top:105,fontFamily:displayFont,fontSize:71,color:C.teal}}>$1 <span style={{fontSize:27,fontFamily:bodyFont}}>maximum requested</span></div><svg width="530" height="120" style={{position:'absolute',left:520,top:99}}><path d="M30 65H480" stroke="#E2D1B7" strokeWidth="27" strokeLinecap="round"/><path d="M30 65H480" stroke={C.orange} strokeWidth="27" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-.84*easeOut(t,.7,1.4)}/><path d="M465 20V108" stroke={C.teal} strokeWidth="9"/></svg><Actor t={t} x={920} y={-33} size={150} role="operator" hop={1.5}/>
   </>:kind==='wrapper'?<div style={{position:'absolute',left:140,top:105,display:'flex',gap:98}}>{['seedance.png','google.png','hailuo.png'].map((l,i)=><div key={l} style={{transform:`translateY(${(1-pop(t,.3+i*.12))*70}px) rotate(${Math.sin(t*1.5+i)*4}deg)`}}><Logo name={l} size={101}/></div>)}<Actor t={t} x={650} y={-33} size={169} role="archivist" hop={.5}/></div>
   :kind==='sound'?<svg width="1000" height="145" viewBox="0 0 1000 145" style={{position:'absolute',left:44,top:90}}>{Array.from({length:51},(_,i)=><rect key={i} x={i*19.4} y={68-(10+Math.abs(Math.sin(t*3.5+i*.57))*43)} width="10" height={20+Math.abs(Math.sin(t*3.5+i*.57))*86} rx="5" fill={i<17?C.teal:i<34?C.clay:C.blue}/>)}</svg>
   :<div style={{position:'absolute',left:42,top:94,display:'flex',gap:34,alignItems:'center'}}>
    {[0,1,2].map(i=><div key={i} style={{transform:`translateY(${(1-pop(t,.2+i*.1))*80+Math.sin(t*2+i)*3}px) rotate(${(i-1)*2}deg)`}}><Film w={kind==='format'?(i===1?130:245):240} t={t} revealed/><div style={{position:'absolute',bottom:9,left:12,background:'#FFFCF1',borderRadius:7,padding:'2px 10px',fontSize:19,color:C.teal}}>{kind==='storyboard'?['Wide','Action','Detail'][i]:kind==='format'?['16:9','9:16','Duration'][i]:kind==='saved'?['Generate','Review','Keep'][i]:['Hair','Fabric','Movement'][i]}</div></div>)}
    <Actor t={t} x={858} y={-32} size={160} role="archivist" hop={.6}/>
   </div>}
  </Glass>
 </AbsoluteFill>;
};
const Teaser:React.FC<{duration:number}>=({duration})=>{
 const t=useTime();return <AbsoluteFill style={{fontFamily:bodyFont,opacity:visible(t,duration)}}>
  <AbsoluteFill style={{background:'linear-gradient(110deg,#6E351967,#6D361E11 80%)'}}/>
  <Glass x={140} y={125} w={1190} h={202} t={t} frost={.12} style={{transform:`translateY(${(1-pop(t,.05))*-80}px)`}}><div style={{position:'absolute',left:35,top:39,fontFamily:displayFont,fontSize:88,color:'#FFF7E7',textShadow:'0 3px 18px #8047259C'}}>Later in this video…</div></Glass>
  <div style={{position:'absolute',left:164,top:369,padding:'20px 32px',background:C.orange,border:'2px solid #FFE4C1',boxShadow:'0 14px 25px #67391A40',borderRadius:21,fontSize:37,color:'#FFF7E7',transform:`rotate(${-3+Math.sin(t*1.6)}deg)`}}>Wait until you see this.</div>
  <div style={{position:'absolute',left:166,top:854,width:1000,height:9,borderRadius:9,background:'#FFF9E94A'}}><div style={{width:1000*clamp(t/duration),height:9,borderRadius:9,background:'#FFF2D0'}}/></div>
 </AbsoluteFill>;
};

type Cue={id:string;offset:number;seconds:number;kind:'definition'|'brand'|SupportKind|'keys';title?:string;text?:string;logo?:string};
export const v4Cues:Cue[]=[
 {id:'s007',offset:.2,seconds:4.8,kind:'brand',title:'Follow along',text:'The guide is in the description',logo:'claude.png'},
 {id:'s009',offset:.2,seconds:5.9,kind:'definition',title:'Wrapper',text:'An interface built on top of other models.'},
 {id:'s010',offset:1,seconds:7,kind:'wrapper'},
 {id:'s011',offset:1,seconds:4.6,kind:'brand',title:'fal.ai',text:'Direct access to the models',logo:'fal.png'},
 {id:'s011',offset:8,seconds:5.3,kind:'definition',title:'API',text:'How one app requests work from another.'},
 {id:'s012',offset:7.5,seconds:5,kind:'saved'},
 {id:'s013',offset:8,seconds:6,kind:'later'},
 {id:'r-safety',offset:0,seconds:2.8,kind:'later'},
 {id:'s014',offset:3.8,seconds:4,kind:'brand',title:'fal.ai',text:'Create your account',logo:'fal.png'},
 {id:'s015',offset:7,seconds:7.5,kind:'wrapper'},
 {id:'s016',offset:0,seconds:15.9,kind:'keys'},
 {id:'s016',offset:3.2,seconds:6.3,kind:'definition',title:'API key',text:'Your private access credential. Keep it secret.'},
 {id:'s020',offset:1.5,seconds:6.4,kind:'typing'},
 {id:'s020',offset:13,seconds:5,kind:'brand',title:'Ready to create',text:'Describe the video you want',logo:'claude.png'},
 {id:'s021',offset:4.5,seconds:5,kind:'definition',title:'Prompt',text:'Your brief: subject, action, camera and style.'},
 {id:'s021',offset:13,seconds:6.5,kind:'typing'},
 {id:'s021',offset:25,seconds:5.4,kind:'storyboard'},
 {id:'s023',offset:.5,seconds:6,kind:'format'},
 {id:'s024',offset:1.5,seconds:7.3,kind:'budget'},
 {id:'s025',offset:0,seconds:3,kind:'brand',title:'Hailuo',logo:'hailuo.png'},
 {id:'s026',offset:3,seconds:5.8,kind:'definition',title:'Storyboard',text:'The shots that tell your story, in order.'},
 {id:'s026',offset:10.2,seconds:6.5,kind:'storyboard'},
 {id:'s027',offset:2,seconds:6,kind:'typing'},
 {id:'s027',offset:10,seconds:4.8,kind:'brand',title:'Choose the direction',text:'Review before rendering',logo:'claude.png'},
 {id:'s028',offset:.8,seconds:7,kind:'budget'},
 {id:'s029',offset:.2,seconds:3.1,kind:'brand',title:'First result',logo:'hailuo.png'},
 {id:'s030',offset:4,seconds:5,kind:'detail'},
 {id:'s030',offset:17,seconds:5,kind:'brand',title:'Look at the movement',logo:'claude.png'},
 {id:'s030',offset:26,seconds:5.4,kind:'typing'},
 {id:'s031',offset:.6,seconds:6.5,kind:'definition',title:'Creative direction',text:'Refine the camera, movement and mood.'},
 {id:'s032',offset:.2,seconds:4.1,kind:'brand',title:'Same prompt. New model.',logo:'seedance.png'},
 {id:'s034',offset:.7,seconds:4.8,kind:'definition',title:'Fine detail',text:'Look at hair, texture and the movement.'},
 {id:'s035',offset:.5,seconds:4.5,kind:'detail'},
 {id:'s036',offset:.5,seconds:3.7,kind:'brand',title:'Seedance',logo:'seedance.png'},
 {id:'s036',offset:16,seconds:5.7,kind:'detail'},
 {id:'s037',offset:1.4,seconds:6,kind:'sound'},
 {id:'r-outlook',offset:.4,seconds:4.8,kind:'brand',title:'Create with the models',text:'Keep the workflow in your hands',logo:'claude.png'},
];
export const chapterTitles=['Why use the models directly?','Connect fal.ai + Claude','Make your first video','Review the results','The reveal + next step'];
const Presenter:React.FC<{row:ReturnType<typeof roughTimeline>[number];intro:boolean}>=({row,intro})=>{
 const t=useTime(),p=intro?easeInOut(t,.1,.55):1;
 const b={x:lerp(28,1435,p),y:lerp(16,731,p),w:lerp(1864,400,p),h:lerp(1048,281,p)};
 const cropW=lerp(1480,1300,p),cropX=lerp(110,150,p),cropY=lerp(25,0,p),s=b.w/cropW;
 return <div style={{position:'absolute',left:b.x,top:b.y,width:b.w,height:b.h,overflow:'hidden',borderRadius:lerp(24,29,p),border:'3px solid #FFF4DF',boxShadow:'0 14px 30px #50372445',transform:`perspective(1800px) rotate(${-7*Math.sin(p*Math.PI)}deg)`}}><OffthreadVideo src={staticFile(row.cameraSource!)} startFrom={Math.round(row.cameraStart*30)} muted style={{position:'absolute',width:1920*s,height:1080*s,left:-cropX*s,top:-cropY*s,transform:`scale(${intro?openingScale(t)*(1-p)+p:1})`,transformOrigin:'50% 42%'}}/></div>;
};
const Companion:React.FC<{duration:number;shoulder?:boolean;lift?:number}>=({duration,shoulder=false,lift=0})=>{
 const t=useTime(),size=shoulder?235:195,x=shoulder?1400:1695,y=(shoulder?990:687)-lift;
 return <div style={{position:'absolute',left:x-size*.5,top:y-size*.86,opacity:visible(t,duration),transform:`translateY(${Math.sin(t*1.6)*2}px) rotate(${Math.sin(t*.8)*1.5}deg)`}}><OriginalClaude size={size}/></div>;
};
export const YouTubePolish:React.FC<{manifest:M}>=({manifest:m})=>{
 const rows=roughTimeline(m),f=useCurrentFrame(),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,scenes=fullScenes(m),active=inFullScene(m,f),row=rows.find(r=>f>=r.from&&f<r.from+r.duration);
 const focus=row?typingFocus(row.id,(f-row.from)/fps).strength:0,k=1-.24*focus;
 return <>
  {scenes.map(s=><Sequence key={s.id} from={s.from} durationInFrames={s.duration}>{s.kind==='hook'?<HookScene duration={s.duration/fps} guessAt={s.a!} whyAt={s.b!} higgsAt={s.c!}/>:s.kind==='studio'?<ModelStudio duration={s.duration/fps}/>:s.kind==='roadmap'?<RoadmapScene duration={s.duration/fps}/>:s.kind==='direct'?<DirectScene duration={s.duration/fps} featuresAt={s.a!}/>:s.kind==='download'||s.kind==='outro'?<DownloadScene duration={s.duration/fps} outro={s.kind==='outro'}/>:s.kind==='skill'?<SkillScene duration={s.duration/fps} importAt={s.a!}/>:<CompareScene duration={s.duration/fps} revealAt={s.a!}/>}</Sequence>)}
  <Sequence from={find('r-teaser').from} durationInFrames={find('r-teaser').duration}><Teaser duration={find('r-teaser').duration/fps}/></Sequence>
  <AbsoluteFill style={{transform:`translate(${112*(1-k)}px,${-490*focus}px) scale(${k})`,transformOrigin:'top left'}}>
   {v4Cues.map((c,i)=>{const r=find(c.id),d=Math.min(Math.round(c.seconds*fps),r.duration-Math.round(c.offset*fps));return <Sequence key={i} from={r.from+Math.round(c.offset*fps)} durationInFrames={d}>{c.kind==='definition'?<Definition duration={d/fps} term={c.title!} meaning={c.text!}/>:c.kind==='brand'?<Brand duration={d/fps} logo={c.logo!} title={c.title!} text={c.text}/>:c.kind==='keys'?<KeyWorkflow duration={d/fps}/>:<Support duration={d/fps} kind={c.kind}/>}</Sequence>;})}
  </AbsoluteFill>
  {active&&row&&<Sequence from={row.from} durationInFrames={row.duration}><Presenter row={row} intro={row.id==='s001'}/></Sequence>}
  {roughChapters(m).slice(1).map((c,i)=><Sequence key={c.frame} from={c.frame} durationInFrames={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)}><Chapter duration={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)/fps} step={i+1} title={chapterTitles[i]}/></Sequence>)}
  {['s007','s010','s012','s013','s014','s020','s021','s024','s026','s027','s030','s031','s034','s036','s037','r-outlook'].map(id=>{const r=find(id),max=r.duration-(r.layout==='presenter'?20:0),d=Math.min(max,240),delay=max>d?Math.min(30,max-d):0;return <Sequence key={id} from={r.from+delay} durationInFrames={d}><Companion duration={d/fps} shoulder={r.layout==='presenter'} lift={553*focus}/></Sequence>;})}
 </>;
};

/** All sounds use the same source-anchored cue clock as the moving subjects. */
export const soundEvents=(m:M)=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,ev:{at:number;name:string;gain:number;duration:number}[]=[];
 const add=(at:number,name:string,gain=.24,duration=1)=>ev.push({at:Math.round(at*fps),name,gain,duration});
 [.22,.47,1.65,2.7,3.5].forEach((x,i)=>add(x,['whip','shutter','land','paper','latch'][i],.29));
 const at=(id:string)=>find(id).from/fps;
 add(at('s002')+.15,'zip',.25);add(at('s003')+.12,'paper',.24);add(at('r-higgsfield')+.1,'land',.27);
 for(const [off,name] of [[.2,'paper'],[.7,'assemble'],[1.1,'latch'],[2.5,'click'],[3.25,'whip'],[4.35,'assemble'],[5.4,'shutter'],[6.85,'servo'],[7.6,'latch']] as const)add(at('s004')+off,name,.23);
 for(const [off,name] of [[.2,'paper'],[.5,'click'],[1.25,'zip'],[2.3,'latch']] as const)add(at('s006')+off,name,.24);
 add(at('r-teaser'),'whip',.26);
 for(const id of ['s017','s018','s019','s044']){add(at(id)+.3,'paper',.23);add(at(id)+1.1,'servo',.22);add(at(id)+2.1,'latch',.25);}
 add(at('s045')+2.8,'zip',.23);add(at('s045')+3.8,'assemble',.22);
 for(const c of v4Cues){add(at(c.id)+c.offset+.08,c.kind==='typing'?'typing':c.kind==='keys'?'click':c.kind==='sound'?'paper':'whip',c.kind==='typing'?.13:.17,c.kind==='typing'?1.9:.8);}
 for(const x of [3.7,7.8,10.3,12.8])add(at('s016')+x,x<10?'click':'latch',.21);
 for(const c of roughChapters(m).slice(1)){add(c.seconds,'zip',.23);add(c.seconds+.37,'paper',.19);}
 for(let i=1;i<rows.length;i++)if(rows[i].layout==='screen-presenter'&&rows[i-1].layout==='presenter'&&!rows[i].teaser)add(rows[i].from/fps-.3,'whip',.2);
 return ev.filter(e=>e.at<rows.at(-1)!.from+rows.at(-1)!.duration);
};
export const YouTubeSound:React.FC<{manifest:M}>=({manifest:m})=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,end=rows.at(-1)!.from+rows.at(-1)!.duration;
 const music=[
  {from:0,to:find('r-higgsfield').from,name:'chase',start:8,gain:.085},
  {from:find('r-higgsfield').from,to:find('s004').from,name:'tension',start:42,gain:.105},
  {from:find('s004').from,to:find('s008').from,name:'chase',start:20,gain:.075},
  {from:find('s008').from,to:find('s011').from,name:'tension',start:52,gain:.055},
  {from:find('s017').from+90,to:find('s020').from,name:'chase',start:40,gain:.045},
  {from:find('s038').from,to:find('r-outlook').from,name:'chase',start:45,gain:.047},
  {from:find('s044').from,to:end,name:'chase',start:72,gain:.07},
 ];
 return <>
  {music.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.to-s.from}><Audio data-audio-role="music" src={staticFile('v4/'+s.name+'.wav')} startFrom={s.start*fps} volume={f=>s.gain*easeOut(f/fps,0,.18)*(1-easeInOut(f/fps,(s.to-s.from)/fps-.45,.45))}/></Sequence>)}
  {soundEvents(m).map((s,i)=><Sequence key={i} from={s.at} durationInFrames={Math.max(1,Math.min(Math.round(s.duration*fps),end-s.at))}><Audio data-audio-role="design-sfx" src={staticFile('v4/'+s.name+'.wav')} volume={s.gain}/></Sequence>)}
 </>;
};
