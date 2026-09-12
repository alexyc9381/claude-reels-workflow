import React from 'react';
import {AbsoluteFill,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont} from './cinematic-brand';
import {easeOut,easeInOut} from './glass-motion';
import {C,clamp,pop,Glass,Logo,Actor,CameraIcon,Label,Film,visible,typeOn} from './YouTubeV7Primitives';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
export type SupportKind='typing'|'budget'|'storyboard'|'format'|'saved'|'wrapper'|'sound'|'detail'|'protip';

export const LaterCue:React.FC<{duration:number;timestamp:string}>=({duration,timestamp})=>{
 const t=clock();return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}>
  <Glass x={150} y={725} w={1070} h={247} t={t} frost={.92} style={{transform:`translateY(${(1-pop(t,.04))*65}px)`}}>
   <Label x={30} y={24} size={28} color={C.orange}>BUDGET GUIDE</Label>
   <Label x={30} y={79} size={43}>Keep watching or skip to {timestamp}</Label>
   <Label x={31} y={158} size={26}>Set the request budget before you generate.</Label>
   <div style={{position:'absolute',right:26,top:25,width:97,height:40,borderRadius:20,background:'#F2D5B9'}}/>
  </Glass><Actor t={t} x={1010} y={552} size={210} look={-1} reach={1}/>
 </AbsoluteFill>;
};

/** An actual synchronized OBS crop, not retyped sample text. */
export const TextLens:React.FC<{duration:number;source:string;start:number}>=({duration,source,start})=>{
 const t=clock(),p=easeInOut(t,.35,.8),k=1.60;
 return <AbsoluteFill style={{opacity:visible(t,duration),fontFamily:bodyFont}}>
  <div style={{position:'absolute',left:686,top:202,width:630,height:180,borderRadius:18,border:'3px solid '+C.orange,opacity:(1-p)*.85,boxShadow:'0 0 0 999px #231B160B'}}/>
  <Glass x={135} y={319} w={1152} h={432} t={t} frost={.93} style={{transform:`translate(${(1-p)*220}px,${(1-p)*-95}px) scale(${.58+.42*p})`,transformOrigin:'60% 0%'}}>
   <div style={{position:'absolute',left:22,top:22,width:1108,height:365,overflow:'hidden',borderRadius:20,background:'#151515'}}>
    <OffthreadVideo data-source-text-lens src={staticFile(source)} startFrom={start} muted style={{position:'absolute',width:1920*k,height:1080*k,left:-681*k,top:-178*k}}/>
   </div><Label x={26} y={393} size={18} color={C.teal}>The actual prompt · enlarged</Label>
  </Glass>
  <Actor t={t} x={1100} y={731} size={209} look={-1} lift={p} reach={p} contact={1.15}/>
 </AbsoluteFill>;
};

/** Different physical motifs occupy different safe areas; not one reused bar. */
export const Support:React.FC<{duration:number;kind:SupportKind}>=({duration,kind})=>{
 const t=clock(),p=pop(t,.04),show=visible(t,duration);
 if(kind==='protip'||kind==='storyboard')return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <Glass x={135} y={208} w={1035} h={391} t={t} frost={.91} style={{transform:`translateX(${(1-p)*-60}px)`}}>
   <Label x={29} y={24} size={25} color={C.orange}>PRO TIP</Label>
   <Label x={29} y={72} size={39}>Direct the camera, not just the subject.</Label>
   <div style={{position:'absolute',left:46,top:154,transform:`rotate(${-6+Math.sin(t*2)*3}deg)`}}><CameraIcon size={175} t={t}/></div>
   <svg width="970" height="195" style={{position:'absolute',left:31,top:147}}><path d="M220 125C420 -20 535 25 743 133" fill="none" stroke={C.teal} strokeWidth="3" strokeDasharray="8 9"/><path d="M721 128L747 136L740 111" fill="none" stroke={C.teal} strokeWidth="4"/>
    <g transform={`translate(${270+370*easeInOut(t,.8,2.2)},${88-70*Math.sin(easeInOut(t,.8,2.2)*Math.PI)})`}><path d="M0 0H51V35H0Z M51 9L69 0V35L51 26Z" fill={C.orange}/></g>
   </svg>
   <Label x={254} y={314} size={28} color={C.teal}>{kind==='storyboard'?'Wide → action → close-up':'Push-in · orbit · low angle'}</Label>
  </Glass><Actor t={t} x={970} y={542} size={205} look={-1} reach={1}/>
 </AbsoluteFill>;
 if(kind==='typing')return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <div style={{position:'absolute',left:143,top:652,transform:`translateY(${(1-p)*75}px)`}}>
   <Actor t={t} x={18} y={25} size={219} look={1} reach={.5+.2*Math.sin(t*14)}/>
   <Glass x={248} y={76} w={694} h={162} t={t} frost={.86}><Label x={30} y={27} size={37} color={C.orange}>{typeOn('/fal-video',t,.3,.65)}<span style={{opacity:Math.sin(t*9)>0?1:0}}>▏</span></Label><Label x={31} y={100} size={26}>Subject · action · camera · style</Label></Glass>
   <div style={{position:'absolute',left:123,top:211,width:145,height:48,borderRadius:9,background:'linear-gradient(#E4ECE8,#BDD3CD)',transform:'skewX(-13deg)',border:'2px solid white'}}>{Array.from({length:18},(_,i)=><span key={i} style={{display:'inline-block',width:15,height:7,margin:'3px 4px',borderRadius:2,background:Math.floor(t*18)%18===i?C.orange:C.teal+'70'}}/>)}</div>
  </div>
 </AbsoluteFill>;
 if(kind==='wrapper')return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <div style={{position:'absolute',left:173,top:223,transform:`scale(${.9+.1*p})`}}>
   <svg width="800" height="415"><path d="M76 332C95 42 544 -66 716 235" fill="none" stroke="#FFFFFF" strokeWidth="31"/><path d="M76 332C95 42 544 -66 716 235" fill="none" stroke={C.orange} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-easeInOut(t,.3,2.5)}/></svg>
   {['hailuo.png','google.png','seedance.png'].map((l,i)=><div key={l} style={{position:'absolute',left:[128,376,622][i],top:[96,29,138][i]+Math.sin(t*2+i)*7,width:134,height:134,borderRadius:'50%',background:'#FFFFFFD9',border:'2px solid white',boxShadow:'0 13px 28px #77503830',display:'grid',placeItems:'center',transform:`scale(${pop(t,.15+i*.12)})`}}><Logo name={l} size={87}/></div>)}
   <Actor t={t} x={280} y={278} size={204} look={1} lift={.6}/><Label x={75} y={514} size={35}>The models underneath</Label>
  </div>
 </AbsoluteFill>;
 if(kind==='budget')return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <Glass x={136} y={234} w={975} h={335} t={t} frost={.91} style={{transform:`translateY(${(1-p)*60}px)`}}>
   <svg width="268" height="268" style={{position:'absolute',left:26,top:28}}><circle cx="134" cy="134" r="103" fill="#FFF8E7" stroke="#E4CFB5" strokeWidth="14"/><circle cx="134" cy="134" r="103" fill="none" stroke={C.orange} strokeWidth="14" pathLength="1" strokeDasharray="1" strokeDashoffset={1-.82*easeInOut(t,.4,1.4)} transform="rotate(-90 134 134)"/></svg>
   <Label x={105} y={116} size={71} color={C.orange}>$1</Label><Label x={337} y={78} size={41}>Requested budget</Label><Label x={338} y={151} size={27}>Review the estimate before rendering.</Label><Label x={338} y={222} size={25} color={C.orange}>Not a verified hard cap</Label>
  </Glass><Actor t={t} x={975} y={534} size={208} look={-1} reach={1}/>
 </AbsoluteFill>;
 if(kind==='sound')return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <Glass x={145} y={733} w={1075} h={237} t={t} frost={.84}><Label x={29} y={24} size={31}>Listen for the layers</Label>
   <svg width="680" height="115" style={{position:'absolute',left:34,top:91}}>{Array.from({length:40},(_,i)=><rect key={i} x={i*17} y={58-(8+Math.abs(Math.sin(t*5+i*.8))*39)} width="7" height={16+Math.abs(Math.sin(t*5+i*.8))*78} rx="3.5" fill={i<13?C.orange:i<27?C.teal:C.blue}/>)}</svg><Label x={769} y={99} size={26}>Voice<br/>Rain · impact</Label>
  </Glass><Actor t={t} x={967} y={563} size={191} look={-1} lift={.3+.12*Math.sin(t*3)}/>
 </AbsoluteFill>;
 const format=kind==='format';
 return <AbsoluteFill style={{opacity:show,fontFamily:bodyFont}}>
  <Glass x={143} y={218} w={1040} h={371} t={t} frost={.87} style={{transform:`translateY(${(1-p)*55}px)`}}>
   <Label x={29} y={26} size={35} color={C.orange}>{format?'Choose the frame':kind==='saved'?'Keep the result in your project':'Watch the camera and motion'}</Label>
   <div style={{position:'absolute',left:31,top:110,transform:`perspective(900px) rotateY(${Math.sin(t*1.7)*3}deg)`}}><Film w={380} t={t} video/></div>
   {format?<svg width="210" height="227" style={{position:'absolute',left:460,top:100}}><rect x="41" y="8" width="122" height="210" rx="17" stroke={C.orange} strokeWidth="4" fill="#FFFFFF7A"/><path d="M85 26H119" stroke={C.orange} strokeWidth="5"/><text x="72" y="124" fontSize="28" fill={C.teal}>9:16</text></svg>:<div style={{position:'absolute',left:480,top:130,transform:`scale(${.96+.04*easeInOut(t,.8,1.3)})`}}><CameraIcon size={156} t={t}/></div>}
   <Label x={718} y={126} size={28}>{format?'16:9 · YouTube':kind==='saved'?'Generate':'Camera'}</Label><Label x={718} y={179} size={28}>{format?'9:16 · Reels':kind==='saved'?'Review':'Movement'}</Label><Label x={718} y={231} size={28}>{format?'Set duration':kind==='saved'?'Keep':'Continuity'}</Label>
  </Glass><Actor t={t} x={968} y={528} size={216} look={-1} reach={1}/>
 </AbsoluteFill>;
};
