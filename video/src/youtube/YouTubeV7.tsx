import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './cinematic-brand';
import {roughTimeline,roughChapters,type RoughCutManifest} from './roughcut-timing';
import {easeOut,easeInOut} from './glass-motion';
import {Support,LaterCue,TextLens,type SupportKind} from './SupportingScenesV7';
import {typingFocus} from './typing-focus';
import {CameraPlate} from './CameraPlate';
import {C,clamp,lerp,pop,visible,Glass,Logo,Actor,Key,Film,ProgressBorder,BrandedBackground} from './YouTubeV7Primitives';
import {SkillScene,SkillRelay,DirectScene,CompareScene,HookScene,RoadmapScene,ModelStudio} from './CharacterScenes';
export {BrandedBackground};
export const openingScale=(t:number)=>1+.038*(1-Math.exp(-Math.max(0,t)/.17))+.027*easeOut(t,0,4.5);
const useTime=()=>useCurrentFrame()/useVideoConfig().fps;
type M=RoughCutManifest;
type Scene={id:string;from:number;duration:number;kind:'hook'|'studio'|'roadmap'|'direct'|'download'|'skill'|'compare'|'outro'|'guide';a?:number;b?:number;c?:number};
export const fullScenes=(m:M):Scene[]=>{
 const rows=roughTimeline(m),get=(id:string)=>rows.find(r=>r.id===id)!,end=(id:string)=>get(id).from+get(id).duration;
 const span=(id:string,last:string,kind:Scene['kind'],extra:Partial<Scene>={})=>({id,from:get(id).from,duration:end(last)-get(id).from,kind,...extra});
 return [
  span('s001','r-higgsfield','hook',{a:get('s002').from/m.fps,b:get('s003').from/m.fps,c:get('r-higgsfield').from/m.fps}),
  span('s004','s005','studio'),span('s006','s006','roadmap'),span('s007','s007','guide'),
  span('r-direct','r-features','direct',{a:(get('r-features').from-get('r-direct').from)/m.fps}),
  {...span('s017','s017','download'),from:get('s017').from+3*m.fps,duration:get('s017').duration-3*m.fps},
  span('s018','s019','skill',{a:(get('s019').from-get('s018').from)/m.fps-1.2}),
  span('s038','s043','compare',{a:(get('s043').from-get('s038').from)/m.fps}),
  span('s044','s045','outro'),
 ];
};
export const inFullScene=(m:M,frame:number)=>fullScenes(m).some(s=>frame>=s.from&&frame<s.from+s.duration);

const Definition:React.FC<{duration:number;term:string;meaning:string}>=({duration,term,meaning})=>{
 const t=useTime(),p=pop(t,0);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={110} y={780} w={1150} h={220} t={t} frost={.86} style={{transform:`translateY(${(1-p)*70}px)`}}>
   <div style={{position:'absolute',left:34,top:22,fontFamily:displayFont,fontWeight:650,letterSpacing:-.8,fontSize:49,color:C.orange,lineHeight:1.05}}>{term}</div>
   <div style={{position:'absolute',left:34,top:92,width:917,fontSize:33,lineHeight:1.25,fontWeight:500}}>{meaning}</div>
   <div style={{position:'absolute',right:22,top:65,transform:`rotate(${Math.sin(t*1.7)*5}deg)`}}>{term.startsWith('API')?<Key size={102} t={t}/>:<Logo name="claude.png" size={100}/>}</div>
   <ProgressBorder w={1150} h={220} t={t} d={duration}/>
  </Glass>
  <Actor t={t} x={1080} y={640} size={145} role="archivist" hop={.05}/>
 </AbsoluteFill>;
};
const Chapter:React.FC<{duration:number;step:number;title:string}>=({duration,step,title})=>{
 const t=useTime(),p=pop(t,.08),unfold=easeOut(t,.23,.55);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}>
  <Glass x={111} y={102} w={1010} h={184} t={t} frost={.91} style={{transform:`translateX(${(1-p)*-130}px) rotate(${(1-p)*-5}deg)`}}>
   <div style={{position:'absolute',left:184,top:22,color:C.orange,fontSize:22,letterSpacing:2,fontWeight:700}}>PART {String(step).padStart(2,'0')}</div>
   <div style={{position:'absolute',left:183,top:64,fontFamily:displayFont,fontWeight:650,letterSpacing:-.8,fontSize:45,color:C.ink,transform:`translateX(${(1-unfold)*-26}px)`,opacity:unfold}}>{title}</div>
   <div style={{position:'absolute',left:184,top:145,display:'flex',gap:14}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:i===step?164:43,height:8,borderRadius:5,background:i<=step?C.orange:'#D9C7AE',transform:`scaleX(${easeOut(t,.3+i*.04,.3)})`,transformOrigin:'left'}}/>)}</div>
   <div style={{position:'absolute',left:14,top:11,width:150,height:158,borderRadius:27,background:'linear-gradient(130deg,#F8DFC1,#F4B77A)',boxShadow:'inset 2px 3px 4px #FFF8DE'}}/>
   <Actor t={t} x={15} y={15} size={150} role={step%2?'courier':'archivist'} hop={.2} lift={.7} happy/>
  </Glass>
 </AbsoluteFill>;
};
const Brand:React.FC<{duration:number;logo:string;title:string;text?:string}>=({duration,logo,title,text})=>{
 const t=useTime(),p=pop(t,.05);return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={1260} y={122} w={540} h={170} t={t} frost={.9} style={{transform:`translateX(${(1-p)*95}px)`}}>
   <div style={{position:'absolute',left:23,top:35,transform:`rotate(${(1-p)*-18}deg)`}}><Logo name={logo} size={94}/></div>
   <div style={{position:'absolute',left:140,top:text?30:58,right:18,fontSize:title.length>20?28:36,fontWeight:650,lineHeight:1.15}}>{title}</div>
   {text&&<div style={{position:'absolute',left:140,top:99,right:18,fontSize:23,lineHeight:1.2}}>{text}</div>}
  </Glass>
 </AbsoluteFill>;
};

/** Protected credential panel is drawn as a schematic, never as a captured secret. */
const KeyWorkflow:React.FC<{duration:number}>=({duration})=>{
 const t=useTime(),step=t<4.8?0:t<9?1:2,copy=easeInOut(t,10,1.2);
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={391} y={224} w={955} h={442} t={t} frost={.92}>
   <div style={{position:'absolute',left:33,top:27,display:'flex',alignItems:'center',gap:16}}><Logo name="fal.png" size={57}/><div style={{fontFamily:displayFont,fontWeight:650,letterSpacing:-.8,fontSize:40}}>{['Open API keys','Create a key','Copy and keep it private'][step]}</div></div>
   <div style={{position:'absolute',left:33,top:133,width:220,height:232,borderRadius:23,background:'#E6EEDD'}}>{['Settings','API keys','New key'].map((s,i)=><div key={s} style={{padding:'14px 23px',fontSize:27,color:i===Math.min(step+1,2)?C.orange:'#5B695B',background:i===Math.min(step+1,2)?'#FFFDF1':undefined,transform:`translateX(${i===Math.min(step+1,2)?5:0}px)`}}>{s}</div>)}</div>
   <div style={{position:'absolute',left:321+copy*305,top:171-Math.sin(copy*Math.PI)*85,transform:`scale(${pop(t,.4)}) rotate(${-15+copy*25}deg)`}}><Key t={t} size={147}/></div>
   <div style={{position:'absolute',left:33,top:388,fontSize:20,color:C.teal}}>Illustration · private values hidden</div>
   <div style={{position:'absolute',left:636,top:160,width:245,height:170,borderRadius:25,border:'3px solid '+C.teal,background:'#F6FBED',opacity:easeOut(t,8.2,.5)}}><div style={{position:'absolute',left:25,top:98,fontSize:33,letterSpacing:5,color:C.teal}}>••••••••</div></div>
   <Actor t={t} x={735} y={240} size={160} role="operator" hop={5.8}/>
  </Glass>
 </AbsoluteFill>;
};

const Teaser:React.FC<{duration:number}>=({duration})=>{
 const t=useTime();return <AbsoluteFill style={{fontFamily:bodyFont,opacity:visible(t,duration)}}>
  <AbsoluteFill style={{background:'linear-gradient(110deg,#6E351967,#6D361E11 80%)'}}/>
  <Glass x={140} y={125} w={750} h={134} t={t} frost={.12} style={{transform:`translateY(${(1-pop(t,.05))*-40}px)`}}><div style={{position:'absolute',left:30,top:32,fontFamily:displayFont,fontWeight:650,letterSpacing:-.8,fontSize:51,fontWeight:600,letterSpacing:-1.5,color:'#FFF7E7',textShadow:'0 3px 18px #573821B0'}}>Later in this video…</div></Glass>
 </AbsoluteFill>;
};

type Cue={id:string;offset:number;seconds:number;kind:'definition'|'brand'|SupportKind|'keys'|'lens';title?:string;text?:string;logo?:string};
export const v7Cues:Cue[]=[
 {id:'s009',offset:.2,seconds:5.9,kind:'definition',title:'Wrapper',text:'An interface built on top of other models.'},
 {id:'s010',offset:1,seconds:7,kind:'wrapper'},
 {id:'s011',offset:1,seconds:4.6,kind:'brand',title:'fal.ai',text:'Direct access to the models',logo:'fal.png'},
 {id:'s011',offset:8,seconds:5.3,kind:'definition',title:'API',text:'How one app requests work from another.'},
 {id:'s012',offset:7.5,seconds:5,kind:'saved'},
 {id:'s014',offset:3.8,seconds:4,kind:'brand',title:'fal.ai',text:'Create your account',logo:'fal.png'},
 {id:'s015',offset:7,seconds:7.5,kind:'wrapper'},
 {id:'s016',offset:0,seconds:15.9,kind:'keys'},
 {id:'s016',offset:3.2,seconds:6.3,kind:'definition',title:'API key',text:'Your private access credential. Keep it secret.'},
 {id:'s020',offset:1.5,seconds:6.4,kind:'typing'},
 {id:'s020',offset:9.8,seconds:5.2,kind:'lens'},
 {id:'s021',offset:4.5,seconds:5,kind:'definition',title:'Prompt',text:'Your brief: subject, action, camera and style.'},
 {id:'s021',offset:13,seconds:6.5,kind:'protip'},
 {id:'s021',offset:25,seconds:5.4,kind:'storyboard'},
 {id:'s023',offset:.5,seconds:6,kind:'format'},
 {id:'s024',offset:1.5,seconds:7.3,kind:'budget'},
 {id:'s025',offset:0,seconds:3,kind:'brand',title:'Hailuo',logo:'hailuo.png'},
 {id:'s026',offset:3,seconds:5.8,kind:'definition',title:'Storyboard',text:'The shots that tell your story, in order.'},
 {id:'s026',offset:10.2,seconds:6.5,kind:'storyboard'},
 {id:'s027',offset:2,seconds:6,kind:'typing'},
 {id:'s027',offset:10,seconds:4.8,kind:'brand',title:'Choose the direction',text:'Review before rendering',logo:'claude.png'},
 {id:'s029',offset:.2,seconds:3.1,kind:'brand',title:'First result',logo:'hailuo.png'},
 {id:'s030',offset:4,seconds:5,kind:'detail'},
 {id:'s030',offset:17,seconds:5,kind:'protip'},
 {id:'s030',offset:26,seconds:5.4,kind:'typing'},
 {id:'s031',offset:.6,seconds:6.5,kind:'definition',title:'Creative direction',text:'Refine the camera, movement and mood.'},
 {id:'s032',offset:.2,seconds:4.1,kind:'brand',title:'Same prompt. New model.',logo:'google.png'},
 {id:'s035',offset:.5,seconds:4.5,kind:'detail'},
 {id:'s036',offset:.5,seconds:3.7,kind:'brand',title:'Seedance',logo:'seedance.png'},
 {id:'s036',offset:16,seconds:5.7,kind:'detail'},
 {id:'s037',offset:1.4,seconds:6,kind:'sound'},
 {id:'r-outlook',offset:.4,seconds:4.8,kind:'brand',title:'Create with the models',text:'Keep the workflow in your hands',logo:'claude.png'},
];
export const chapterTitles=['Why use the models directly?','Connect fal.ai + Claude','Make your first video','Review the results','The reveal + next step'];
const Presenter:React.FC<{row:ReturnType<typeof roughTimeline>[number];intro:boolean}>=({row,intro})=>{
 const t=useTime(),p=row.id==='s001'?easeInOut(t,0,.38):1;
 const b={x:lerp(28,intro?740:1435,p),y:lerp(16,intro?737:748,p),w:lerp(1864,intro?440:400,p),h:lerp(1048,intro?300:281,p)};
 const cropW=lerp(1480,1300,p),cropX=lerp(110,150,p),cropY=lerp(25,0,p),s=b.w/cropW;
 return <div style={{position:'absolute',left:b.x,top:b.y,width:b.w,height:b.h,overflow:'hidden',borderRadius:lerp(24,29,p),border:'3px solid #FFF4DF',boxShadow:'0 14px 30px #50372445',transform:`perspective(1800px) rotate(${-7*Math.sin(p*Math.PI)}deg)`}}><CameraPlate source={row.cameraPlateSource??'v7/presenter-background.mp4'} start={row.cameraPlateStart??row.from} style={{position:'absolute',width:1920*s,height:1080*s,left:-cropX*s,top:-cropY*s,transform:`scale(${intro?openingScale(t)*(1-p)+p:1})`,transformOrigin:'50% 42%'}}/></div>;
};
export const YouTubePolish:React.FC<{manifest:M}>=({manifest:m})=>{
 const rows=roughTimeline(m),f=useCurrentFrame(),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,scenes=fullScenes(m),active=inFullScene(m,f),row=rows.find(r=>f>=r.from&&f<r.from+r.duration);
 const focus=row?typingFocus(row.id,(f-row.from)/fps).strength:0,k=1-.24*focus;
 const guide=find('s024').from/fps,stamp=Math.floor(guide/60)+':'+String(Math.floor(guide%60)).padStart(2,'0');
 const laterFrom=find('s013').from+8*fps,laterTo=find('r-safety').from+find('r-safety').duration;
 return <>
  {scenes.map(s=><Sequence key={s.id} from={s.from} durationInFrames={s.duration}>{s.kind==='hook'?<HookScene duration={s.duration/fps} guessAt={s.a!} whyAt={s.b!} higgsAt={s.c!}/>:s.kind==='studio'?<ModelStudio duration={s.duration/fps}/>:s.kind==='roadmap'?<RoadmapScene duration={s.duration/fps}/>:s.kind==='direct'?<DirectScene duration={s.duration/fps} featuresAt={s.a!}/>:s.kind==='download'||s.kind==='outro'||s.kind==='guide'?<SkillRelay duration={s.duration/fps} mode={s.kind==='guide'?'guide':s.kind==='outro'?'outro':'download'}/>:s.kind==='skill'?<SkillScene duration={s.duration/fps} importAt={s.a!}/>:<CompareScene duration={s.duration/fps} revealAt={s.a!}/>}</Sequence>)}
  <Sequence from={find('r-teaser').from} durationInFrames={find('r-teaser').duration}><Teaser duration={find('r-teaser').duration/fps}/></Sequence>
  <AbsoluteFill>
   {v7Cues.map((c,i)=>{const r=find(c.id),d=Math.min(Math.round(c.seconds*fps),r.duration-Math.round(c.offset*fps)),lift=['definition','typing','sound'].includes(c.kind)?focus:0;return <Sequence key={i} from={r.from+Math.round(c.offset*fps)} durationInFrames={d}><AbsoluteFill style={{transform:`translateY(${-450*lift}px) scale(${1-.12*lift})`,transformOrigin:'120px 0'}}>{c.kind==='lens'?<TextLens duration={d/fps} source={m.obs.source} start={Math.round((r.start+c.offset)*fps)}/>:c.kind==='definition'?<Definition duration={d/fps} term={c.title!} meaning={c.text!}/>:c.kind==='brand'?<Brand duration={d/fps} logo={c.logo!} title={c.title!} text={c.text}/>:c.kind==='keys'?<KeyWorkflow duration={d/fps}/>:<Support duration={d/fps} kind={c.kind}/>}</AbsoluteFill></Sequence>;})}
  </AbsoluteFill>
  <Sequence from={laterFrom} durationInFrames={laterTo-laterFrom}><LaterCue duration={(laterTo-laterFrom)/fps} timestamp={stamp}/></Sequence>
  {active&&row&&<Sequence from={row.from} durationInFrames={row.duration}><Presenter row={row} intro={['s001','s002'].includes(row.id)}/></Sequence>}
  {roughChapters(m).slice(1).map((c,i)=><Sequence key={c.frame} from={c.frame} durationInFrames={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)}><Chapter duration={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)/fps} step={i+1} title={chapterTitles[i]}/></Sequence>)}
 </>;
};

/** All sounds use the same source-anchored cue clock as the moving subjects. */
export const soundEvents=(m:M)=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,ev:{at:number;name:string;gain:number;duration:number}[]=[];
 const add=(at:number,name:string,gain=.16,duration=.8)=>ev.push({at:Math.round(at*fps),name,gain,duration});
 const at=(id:string)=>find(id).from/fps;
 add(.12,'servo',.14);add(.45,'paper',.12);add(4,'latch',.13);
 for(const s of fullScenes(m)){
  const d=s.duration/fps,b=s.from/fps;
  if(['guide','download','outro'].includes(s.kind)){
   for(const [u,name] of [[.55,'paper'],[2.65,'whip'],[4,'land'],[5.9,'zip'],[6.7,'latch'],[7.1,'typing']] as const)add(b+u/8*d,name,name==='typing'?.085:.15,name==='typing'?Math.min(.8,d*.09):.65);
  }else if(s.kind==='hook'){
   const q=s.b!,gateDuration=d-q;
   add(q+.15,'servo');add(q+2.1/7.6*gateDuration,'land',.15);add(q+4.2/7.6*gateDuration,'servo',.14);
  }else if(s.kind==='direct'){
   add(b+2/8*s.a!,'paper',.13);add(b+5/8*s.a!,'shutter',.13);
   add(b+s.a!+2.1/7.6*(d-s.a!),'land',.14);add(b+s.a!+4.2/7.6*(d-s.a!),'servo',.13);
  }else if(s.kind==='roadmap'){add(b+.1,'paper',.13);add(b+d*.35,'zip',.12);add(b+d*.78,'latch',.12);}
  else {add(b+.1,'paper',.14);add(b+d*.35,'servo',.13);add(b+d*.65,'latch',.13);}
 }
 for(const c of v7Cues)add(at(c.id)+c.offset+.12,c.kind==='typing'?'typing':c.kind==='lens'?'servo':c.kind==='keys'?'click':'paper',c.kind==='typing'?.09:.13,c.kind==='typing'?1.9:.8);
 add(at('s013')+8.12,'paper',.13);
 for(const x of [3.7,7.8,10.3,12.8])add(at('s016')+x,x<10?'click':'latch',.14);
 for(const c of roughChapters(m).slice(1)){add(c.seconds,'zip',.16);add(c.seconds+.37,'paper',.13);}
 for(let i=1;i<rows.length;i++)if(rows[i].layout==='screen-presenter'&&rows[i-1].layout==='presenter'&&!rows[i].teaser)add(rows[i].from/fps-.3,'whip',.14);
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
