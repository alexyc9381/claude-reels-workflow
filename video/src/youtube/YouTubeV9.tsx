import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './cinematic-brand';
import {roughTimeline,roughChapters,type RoughCutManifest} from './roughcut-timing';
import {easeOut,easeInOut} from './glass-motion';
import {Support,LaterCue,TextLens,type SupportKind} from './SupportingScenesV9';
import {typingFocus} from './typing-focus';
import {CameraPlate} from './CameraPlate';
import {TutorialSkipV18} from './ScenesV18';
import {SetupChecklistV11,CredentialV11,BonusTeaserV11} from './ScenesV11';
import {ResultCountdownV12,DetailLensV12} from './ScenesV12';
import {CredentialV13,FaceTimerV13,RevealCountdownV13,PlaybackStartV13,roadmapBeatsV13} from './ScenesV13';
const CredentialSequence=CredentialV13;
import {C,clamp,lerp,pop,visible,Glass,Logo,Actor,Key,Film,ProgressBorder,BrandedBackground} from './YouTubeV8Primitives';
import {HookV9,ProductionV9,RoadmapV9,GuideV9,WrapperV9,DirectV9,DownloadV9,SkillV9,CompareV9,OutroV9} from './ScenesV9';
export {BrandedBackground};
export const openingScale=(t:number)=>1+.038*(1-Math.exp(-Math.max(0,t)/.17))+.027*easeOut(t,0,4.5);
const useTime=()=>useCurrentFrame()/useVideoConfig().fps;
type M=RoughCutManifest;
type Scene={id:string;from:number;duration:number;kind:'hook'|'studio'|'roadmap'|'direct'|'download'|'skill'|'compare'|'outro'|'guide'|'wrapper';a?:number;b?:number;c?:number};
export const fullScenes=(m:M):Scene[]=>{
 const rows=roughTimeline(m),get=(id:string)=>rows.find(r=>r.id===id)!,end=(id:string)=>get(id).from+get(id).duration;
 const span=(id:string,last:string,kind:Scene['kind'],extra:Partial<Scene>={})=>({id,from:get(id).from,duration:end(last)-get(id).from,kind,...extra});
 return [
  span('s001','r-higgsfield','hook',{a:get('s002').from/m.fps,b:get('s003').from/m.fps,c:get('r-higgsfield').from/m.fps}),
  span('s004','s005','studio'),span('s006','s006','roadmap'),span('s007','s007','guide'),span('s010','s010','wrapper'),
  span('r-direct','r-features','direct',{a:(get('r-features').from-get('r-direct').from)/m.fps}),
  {...span('s017','s017','download'),from:get('s017').from+3*m.fps,duration:get('s017').duration-3*m.fps},
  span('s018','s019','skill',{a:(get('s019').from-get('s018').from)/m.fps-1.2}),
  span('s038','s043','compare',{a:(get('s043').from-get('s038').from)/m.fps}),
  span('s044','s045','outro'),
 ];
};
export const inFullScene=(m:M,frame:number)=>fullScenes(m).some(s=>frame>=s.from&&frame<s.from+s.duration);

const Definition:React.FC<{duration:number;term:string;meaning:string}>=({duration,term,meaning})=>{
 const t=useTime(),p=pop(t,0),variant=term==='Wrapper'?0:term==='API'?1:term==='API key'?2:term==='Prompt'?3:term==='Storyboard'?4:5;
 // V15_WRAPPER_BEGIN — the recorded slide already explains this term.
 if(term==='Wrapper')return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}><Glass x={110} y={876} w={434} h={115} t={t} frost={.7} style={{transform:`translateY(${45*(1-p)}px)`}}><div style={{position:'absolute',left:20,top:21}}><Logo name="higgsfield.jpg" size={65}/></div><div style={{position:'absolute',left:110,top:31,fontSize:36,fontWeight:750,color:C.ink}}>The interface</div></Glass></AbsoluteFill>;
 // V15_WRAPPER_END
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={110} y={780} w={1150} h={220} t={t} frost={.86} style={{transform:`translate(${(1-p)*(variant%2?-70:0)}px,${(1-p)*(variant%2?0:70)}px) perspective(1800px) rotateY(${(1-p)*(variant-2)*2}deg)`}}>
   <div style={{position:'absolute',left:34,top:22,fontFamily:displayFont,fontWeight:650,letterSpacing:-.8,fontSize:49,color:C.orange,lineHeight:1.05}}>{term}</div>
   <div style={{position:'absolute',left:34,top:92,width:917,fontSize:35,lineHeight:1.25,fontWeight:500}}>{meaning}</div>
   <div style={{position:'absolute',right:22,top:65,transform:`rotate(${Math.sin(t*1.7)*5}deg)`}}>{term.startsWith('API')?<Key size={102} t={t}/>:<Logo name="claude.png" size={100}/>}</div>
   <ProgressBorder w={1150} h={220} t={t} d={duration}/>
  </Glass>
  <Actor t={t} x={1080} y={640} size={145} role={variant%3===0?"archivist":variant%3===1?"courier":"operator"} hop={.05}/>
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
const Brand:React.FC<{duration:number;logo:string;title:string;text?:string;avoidRaisedCamera?:boolean}>=({duration,logo,title,text,avoidRaisedCamera=false})=>{
 const t=useTime(),p=pop(t,.05),shift=title.length%3;return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont,color:C.ink}}>
  <Glass x={avoidRaisedCamera?650:1260} y={122} w={540} h={170} t={t} frost={.9} style={{transform:`translate(${(1-p)*(shift===0?95:0)}px,${(1-p)*(shift===1?-60:shift===2?65:0)}px) rotate(${(1-p)*(shift-1)*4}deg)`}}>
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
  <Glass x={140} y={125} w={750} h={134} t={t} frost={.12} style={{transform:`translateY(${(1-pop(t,.05))*-40}px)`}}><div style={{position:'absolute',left:30,top:32,fontFamily:displayFont,fontWeight:700,fontSize:51,letterSpacing:-1.5,color:'#171511'}}>Later in this video…</div></Glass>
 </AbsoluteFill>;
};

type Cue={id:string;offset:number;seconds:number;kind:'definition'|'brand'|SupportKind|'keys'|'lens'|'detail-lens';feature?:'hair'|'fabric'|'signs';title?:string;text?:string;logo?:string};
export const v9Cues:Cue[]=[
 {id:'s009',offset:.2,seconds:5.9,kind:'definition',title:'Wrapper',text:'An interface built on top of other models.'},
 {id:'s011',offset:1,seconds:4.6,kind:'brand',title:'fal.ai',text:'Direct access to the models',logo:'fal.png'},
 {id:'s011',offset:8,seconds:5.3,kind:'definition',title:'API',text:'How one app requests work from another.'},
 {id:'s012',offset:7.5,seconds:5,kind:'saved'},
 {id:'s016',offset:0,seconds:15.9,kind:'keys'},
 {id:'s020',offset:1.5,seconds:6.4,kind:'typing'},
 {id:'s020',offset:9.8,seconds:5.2,kind:'lens'},
 {id:'s021',offset:4.5,seconds:5,kind:'definition',title:'Prompt',text:'Your brief: subject, action, camera and style.'},
 {id:'s021',offset:13,seconds:6.5,kind:'protip'},
 {id:'s021',offset:25,seconds:5.4,kind:'storyboard'},
 {id:'s023',offset:.5,seconds:6,kind:'format'},
 {id:'s024',offset:1.5,seconds:7.3,kind:'budget'},
 {id:'s025',offset:0,seconds:3,kind:'brand',title:'Hailuo',logo:'hailuo.png'},
 {id:'s026',offset:3,seconds:5.8,kind:'definition',title:'Storyboard',text:'The shots that tell your story, in order.'},
 {id:'s026',offset:10.2,seconds:4.6,kind:'storyboard'},
 {id:'s027',offset:.25,seconds:8,kind:'chase'},
 {id:'s027',offset:9,seconds:3,kind:'brand',title:'Choose the direction',text:'Review before rendering',logo:'claude.png'},
 {id:'s029',offset:.2,seconds:3.1,kind:'brand',title:'First result',logo:'hailuo.png'},
 {id:'s030',offset:4,seconds:9,kind:'direction'},
 {id:'s030',offset:17,seconds:7,kind:'sound'},
 {id:'s030',offset:30,seconds:5.4,kind:'protip'},
 {id:'s031',offset:.6,seconds:6.5,kind:'definition',title:'Creative direction',text:'Refine the camera, movement and mood.'},
 {id:'s033',offset:.2,seconds:4.1,kind:'brand',title:'Generated with Veo',text:'Google Veo · same prompt',logo:'google.png'},
 {id:'s034',offset:6.4,seconds:4.4,kind:'detail-lens',feature:'hair'},
 {id:'s035',offset:.5,seconds:4.5,kind:'detail-lens',feature:'fabric'},
 {id:'s036',offset:.5,seconds:3.7,kind:'brand',title:'Seedance',logo:'seedance.png'},
 {id:'s037',offset:1.4,seconds:6,kind:'sound'},
 {id:'r-outlook',offset:.4,seconds:4.8,kind:'brand',title:'Create with the models',text:'Keep the workflow in your hands',logo:'claude.png'},
];
export const chapterTitles=['Why use the models directly?','Connect fal.ai + Claude','Make your first video','Review the results','The reveal + next step'];
const Presenter:React.FC<{row:ReturnType<typeof roughTimeline>[number];intro:boolean;timerEnd:number}>=({row,intro,timerEnd})=>{
 const t=useTime(),p=intro?easeInOut(row.from/30+t,.55,1.05):1; // V18: large face, then continuous move to the bottom inset; global clock survives the cut.
 const comparison=intro||['s038','s042','s043'].includes(row.id);
 const b={x:lerp(28,comparison?780:1435,p),y:lerp(16,comparison?789:748,p)-(intro?55*Math.sin(p*Math.PI):0),w:lerp(1864,comparison?360:400,p),h:lerp(1048,comparison?256:281,p)};
 const cropW=lerp(intro?1340:1480,1300,p),cropX=lerp(intro?165:110,150,p),cropY=lerp(25,0,p),s=b.w/cropW;
 return <div style={{position:'absolute',left:b.x,top:b.y,width:b.w,height:b.h,overflow:'hidden',borderRadius:lerp(24,29,p),border:'3px solid #FFF4DF',boxShadow:'0 14px 30px #50372445',transform:`perspective(1800px) rotate(${(intro?-2:-7)*Math.sin(p*Math.PI)}deg)`}}><CameraPlate source={row.cameraPlateSource??'v7/presenter-background.mp4'} start={row.cameraPlateStart??row.from} length={row.cameraPlateDuration} style={{position:'absolute',width:1920*s,height:1080*s,left:-cropX*s,top:-cropY*s,transform:`scale(${intro?openingScale(row.from/30+t):1})`,transformOrigin:'50% 42%'}}/>{intro&&<FaceTimerV13 width={b.w} height={b.h} progress={(row.from/30+t)/timerEnd}/>}</div>;
};
export const YouTubePolish:React.FC<{manifest:M}>=({manifest:m})=>{
 const rows=roughTimeline(m),f=useCurrentFrame(),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,scenes=fullScenes(m),active=inFullScene(m,f),row=rows.find(r=>f>=r.from&&f<r.from+r.duration);
 const focus=row?typingFocus(row.id,(f-row.from)/fps).strength:0,k=1-.24*focus;
 const guide=find('s024').from/fps,stamp=Math.floor(guide/60)+':'+String(Math.floor(guide%60)).padStart(2,'0');
 const laterFrom=find('s013').from+8*fps,laterTo=find('r-safety').from+find('r-safety').duration;
 return <>
  {scenes.map(s=><Sequence key={s.id} from={s.from} durationInFrames={s.duration}>{s.kind==='hook'?<HookV9 duration={s.duration/fps} guessAt={s.a!} whyAt={s.b!} higgsAt={s.c!}/>:s.kind==='studio'?<ProductionV9 duration={s.duration/fps}/>:s.kind==='roadmap'?<RoadmapV9 duration={s.duration/fps}/>:s.kind==='direct'?<DirectV9 duration={s.duration/fps} featuresAt={s.a!}/>:s.kind==='wrapper'?<WrapperV9 duration={s.duration/fps}/>:s.kind==='download'?<DownloadV9 duration={s.duration/fps}/>:s.kind==='guide'?<GuideV9 duration={s.duration/fps}/>:s.kind==='outro'?<OutroV9 duration={s.duration/fps}/>:s.kind==='skill'?<SkillV9 duration={s.duration/fps} importAt={s.a!}/>:<CompareV9 duration={s.duration/fps} revealAt={s.a!}/>}</Sequence>)}
  <Sequence from={find('r-teaser').from} durationInFrames={find('r-teaser').duration}><Teaser duration={find('r-teaser').duration/fps}/></Sequence>
  <Sequence from={38*fps} durationInFrames={5*fps}><TutorialSkipV18/></Sequence>
  <AbsoluteFill>
   {v9Cues.map((c,i)=>{const r=find(c.id),d=Math.min(Math.round(c.seconds*fps),r.duration-Math.round(c.offset*fps)),lift=['definition','typing','sound'].includes(c.kind)?focus:0;return <Sequence key={i} from={r.from+Math.round(c.offset*fps)} durationInFrames={d}><AbsoluteFill style={{transform:`translateY(${-450*lift}px) scale(${1-.12*lift})`,transformOrigin:'120px 0'}}>{c.kind==='detail-lens'?<DetailLensV12 duration={d/fps} source={m.obs.source} start={Math.round(r.start*fps)+Math.round(c.offset*fps)} feature={c.feature!}/>:c.kind==='lens'?<TextLens duration={d/fps} source={m.obs.source} start={Math.round((r.start+c.offset)*fps)}/>:c.kind==='definition'?<Definition duration={d/fps} term={c.title!} meaning={c.text!}/>:c.kind==='brand'?<Brand avoidRaisedCamera={c.id==='s025'||c.id==='s027'} duration={d/fps} logo={c.logo!} title={c.title!} text={c.text}/>:c.kind==='keys'?<CredentialSequence duration={d/fps}/>:<Support duration={d/fps} kind={c.kind} cueId={`${c.id}:${c.offset}`}/>}</AbsoluteFill></Sequence>;})}
  </AbsoluteFill>
  <Sequence from={find('s014').from+135} durationInFrames={find('s016').from-find('s014').from-135}><SetupChecklistV11 duration={(find('s016').from-find('s014').from-135)/fps} accountAt={(find('s015').from-find('s014').from-135)/fps} keysAt={(find('s016').from-find('s014').from-135)/fps}/></Sequence>
  <Sequence from={find('s036').from+Math.round(14*fps)} durationInFrames={Math.round(8*fps)}><BonusTeaserV11 duration={8} secondsToBonus={(find('s044').from-find('s036').from)/fps-14}/></Sequence>
  <Sequence from={find('s029').from-3*fps} durationInFrames={3*fps}><ResultCountdownV12/></Sequence>
  <Sequence from={find('s043').from-3*fps} durationInFrames={3*fps}><RevealCountdownV13/></Sequence>
  <Sequence from={find('s033').from+Math.round(10.1*fps)} durationInFrames={99}><PlaybackStartV13 duration={3.3}/></Sequence>
  <Sequence from={laterFrom} durationInFrames={laterTo-laterFrom}><LaterCue duration={(laterTo-laterFrom)/fps} timestamp={stamp}/></Sequence>
  {active&&row&&row.id!=='s006'&&<Sequence from={row.from} durationInFrames={row.duration}><Presenter row={row} intro={['s001','s002'].includes(row.id)} timerEnd={find('s003').from/fps-1/fps}/></Sequence>}
  {roughChapters(m).slice(1).map((c,i)=>i===4?null:<Sequence key={c.frame} from={c.frame} durationInFrames={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)}><Chapter duration={Math.min(132,rows.find(r=>r.from===c.frame)!.duration)/fps} step={i+1} title={chapterTitles[i]}/></Sequence>)}
 </>;
};

/** All sounds use the same source-anchored cue clock as the moving subjects. */
export const soundEvents=(m:M)=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!,ev:{at:number;name:string;gain:number;duration:number}[]=[];
 const add=(at:number,name:string,gain=.16,duration=.8)=>ev.push({at:Math.round(at*fps),name,gain,duration});
 const at=(id:string)=>find(id).from/fps;
 add(.12,'servo',.14);add(.45,'paper',.12);add(4,'latch',.13);
 for(const seconds of [1.6,2.6,3.6])add(seconds,'click',.075,.3);
 for(const s of fullScenes(m)){
  const d=s.duration/fps,b=s.from/fps;
  const beat=(u:number,span:number,name:string,gain=.13,start=b)=>add(start+u*span,name,gain,.65);
  const schedules:Record<string,[number,string][]>={studio:[[.18,'paper'],[.45,'click'],[.72,'shutter'],[.875,'latch']],roadmap:[[.08,'zip'],[.45,'paper'],[.8,'latch']],guide:[[.22,'paper'],[.52,'servo'],[.81,'latch']],wrapper:[[.08,'servo'],[.25,'land'],[.55,'paper']],download:[[.23,'paper'],[.38,'land'],[.69,'zip']],skill:[[.11,'paper'],[.29,'click'],[.48,'servo'],[.75,'paper'],[.9,'latch']],outro:[[.19,'paper'],[.2375,'whip'],[.4,'land'],[.59,'zip'],[.75,'typing']],compare:[[.08,'shutter'],[.89,'paper']]};
  if(s.kind==='hook'){
   const q=s.b!,span=d-q;beat(.01,span,'paper',.09,b+q);for(const seconds of [.4,1.55,2.7])add(b+s.c!+seconds,'paper',.09,.8);
  }else if(s.kind==='studio'){
   add(b+.12,'paper',.10);add(b+2.84,'servo',.07);add(b+4.4,'shutter',.11);add(b+6.75,'latch',.08);
  }else if(s.kind==='roadmap'){
   for(const u of roadmapBeatsV13)add(b+u*d,'roadmap-ding',.55,1.2);
  }else if(s.kind==='guide'){
   beat(.1,d,'click',.07);beat(.24,d,'paper',.07);beat(.43,d,'click',.07);beat(.59,d,'latch',.065);
  }else if(s.kind==='outro'){
   beat(.05,d,'paper',.09);add(450+.17*7.1,'paper',.10);add(450+.31*7.1,'land',.09);add(450+.65*7.1,'latch',.1);
  }else if(s.kind==='direct'){
   for(const [u,n] of [[.04,'paper'],[.19,'latch'],[.25,'zip'],[.51,'click'],[.61,'shutter']] as const)beat(u,s.a!,n,.075);
   beat(.14,d-s.a!,'land',.08,b+s.a!);beat(.26,d-s.a!,'servo',.075,b+s.a!);beat(.55,d-s.a!,'latch',.075,b+s.a!);
  }else for(const [fraction,name] of schedules[s.kind]??[])beat(fraction,d,name,name==='typing'?.075:.12);
 }
 for(const c of v9Cues)add(at(c.id)+c.offset+.12,c.kind==='typing'?'typing':c.kind==='lens'?'servo':c.kind==='keys'?'click':'paper',c.kind==='typing'?.09:.13,c.kind==='typing'?1.9:.8);
 add(at('s013')+8.12,'paper',.13);
 for(const [x,name] of [[4.7,'click'],[9.2,'paper'],[11.4,'servo'],[14.1,'latch']] as const)add(at('s016')+x,name,.08);
 add(at('s026')+10.2+4.6*.28,'whip',.06);add(at('s026')+10.2+4.6*.72,'land',.08);
 add(at('s027')+1.2,'servo',.09);add(at('s027')+5.1,'whip',.075);
 add(at('s030')+7.5,'click',.10);add(at('s036')+14.45,'paper',.08);add(at('s036')+15,'latch',.06);
 add(at('s033')+12.93,'click',.085,.3);
 for(const id of ['s029','s043'])for(let n=3;n>0;n--)add(at(id)-n,'click',.075,.24);
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
  {soundEvents(m).map((s,i)=><Sequence key={i} from={s.at} durationInFrames={Math.max(1,Math.min(Math.round(s.duration*fps),end-s.at))}><Audio data-audio-role="design-sfx" src={staticFile(s.name==='roadmap-ding'?'v3/glass.wav':'v4/'+s.name+'.wav')} volume={s.gain}/></Sequence>)}
  <Sequence from={find('s043').from+108} durationInFrames={45}><Audio data-audio-role="design-sfx" src={staticFile('v9/celebrate-v12.wav')} volume={.16}/></Sequence>
 </>;
};
