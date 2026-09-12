import React from 'react';
import {AbsoluteFill,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,Glass,Label,Logo,SkillFile,CameraIcon,C,lerp,clamp,visible} from './YouTubeV8Primitives';
import {EditRoom} from './ScenesV11';
import {bodyFont} from './cinematic-brand';
import {AgentDestinationsV13} from './ScenesV13';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;

/** Three seconds of anticipation, not a fake model-generation timer. */
export const ResultCountdownV12:React.FC<{label?:string;comparison?:boolean}>=({label='Result in',comparison=false})=>{
 const t=clock(),n=Math.max(1,3-Math.floor(t)),beat=t%1,p=easeOut(beat,0,.16);
 return <AbsoluteFill style={{fontFamily:bodyFont}}><Glass x={comparison?92:68} y={comparison?813:893} w={352} h={107} t={t} frost={.88} style={{opacity:easeOut(t,0,.16)}}>
  <Label x={23} y={35} size={29} color={C.ink} style={{fontWeight:800}}>{label}</Label>
  <svg width="85" height="85" style={{position:'absolute',right:13,top:10}}><circle cx="42" cy="42" r="35" fill="#F5DABC"/><circle cx="42" cy="42" r="35" stroke={C.orange} strokeWidth="4" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-beat} transform="rotate(-90 42 42)"/></svg>
  <div style={{position:'absolute',right:15,top:25,width:81,textAlign:'center',fontSize:43,fontWeight:850,color:C.orange,transform:`translateY(${8*(1-p)}px) scale(${1+.12*(1-p)})`,fontVariantNumeric:'tabular-nums'}}>{n}</div>
 </Glass></AbsoluteFill>;
};

/** Crown belongs only to the creator's selected right-hand result. */
export const WinnerCrownV12:React.FC<{t:number}>=({t})=>{
 const p=easeOut(t,0,.42),settle=t<.42?0:Math.exp(-(t-.42)*6)*Math.sin((t-.42)*17),shine=e(t,.35,.85);
 return <div data-winner="claude-right" style={{position:'absolute',left:1760,top:49,width:112,height:110,opacity:clamp(t*8),transform:`translateY(${-65*(1-p)+settle*6}px) rotate(${-9*(1-p)}deg)`}}>
  <svg width="112" height="110" viewBox="0 0 112 110"><defs><linearGradient id="winner-gold" x2=".8" y2="1"><stop stopColor="#FFF3B7"/><stop offset=".42" stopColor="#E9B44C"/><stop offset="1" stopColor="#BA631F"/></linearGradient></defs><path d="M13 33L35 50L56 18L78 50L100 33L88 82H25Z" fill="url(#winner-gold)" stroke="#FFF5D5" strokeWidth="3"/><path d="M25 87H89" stroke="#D88729" strokeWidth="8" strokeLinecap="round"/><path d={`M${18+shine*83} 36l-9 42`} stroke="#FFF" strokeWidth="4" opacity={Math.sin(shine*Math.PI)*.85}/><circle cx="56" cy="64" r="6" fill="#F8FFF8"/>{[13,56,100].map((x,i)=><circle key={x} cx={x} cy={i===1?16:30} r="5" fill="#FFF2C2"/>)}</svg>
 </div>;
};

/** A second view of the EXACT OBS frame; authored tracking never changes
 * source time, speed, color, or the model being evaluated. */
export const DetailLensV12:React.FC<{duration:number;source:string;start:number;feature:'hair'|'fabric'|'signs'}>=({duration,source,start,feature})=>{
 const t=clock(),p=e(t,.14,.5),draw=e(t,.25,.65),k=1.6;
 const path=feature==='hair'?[[0,1005,263],[2,1005,263],[2.5,1035,264],[3,1080,270],[3.5,1140,282],[4.4,1230,282]]:feature==='fabric'?[[0,965,490],[1,940,460],[2,1030,440],[3,1050,450],[5,930,440]]:[[0,475,385],[5,475,385]];
 const a=[...path].reverse().find(x=>t>=x[0])??path[0],b=path[path.indexOf(a)+1]??a,q=b[0]===a[0]?0:e(t,a[0],b[0]-a[0]),cx=lerp(a[1],b[1],q),cy=lerp(a[2],b[2],q),w=500/k,h=270/k;
 const px=24+(cx-w/2)*.975,py=47+(cy-h/2-32)*.975;
 return <AbsoluteFill data-detail-lens={feature} style={{opacity:visible(t,duration),fontFamily:bodyFont}}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><rect x={px} y={py} width={w*.975} height={h*.975} rx="15" fill="none" stroke="#FFEBD1" strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw}/><path d={`M${px} ${py+h*.975}Q${px-90} 565 548 704`} stroke={C.clay} strokeWidth="3" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw} opacity=".85"/></svg>
  <Glass x={68} y={644} w={536} h={353} t={t} frost={.82} style={{transform:`translateY(${35*(1-p)}px) scale(${.93+.07*p})`,transformOrigin:'bottom left'}}>
   <div style={{position:'absolute',left:17,top:17,width:500,height:270,borderRadius:19,overflow:'hidden',background:'#172428'}}><OffthreadVideo data-synchronized-detail src={staticFile(source)} startFrom={start} muted style={{position:'absolute',width:1920*k,height:1080*k,left:250-cx*k,top:135-cy*k}}/></div>
   <Label x={23} y={304} size={27} color={C.orange} style={{fontWeight:800}}>{feature==='hair'?'Individual strands':feature==='fabric'?'Fabric follows the movement':'Look at the signs'}</Label>
  </Glass>
  <Actor t={t} x={593} y={805} size={159} role={feature==='hair'?'archivist':'operator'} look={-1} reach={draw} lift={.45*draw} contact={.8}/>
 </AbsoluteFill>;
};

/** One focal task → subordinate free pack. Image-led miniature shot recipes
 * demonstrate camera moves instead of six competing text banners. */
export const InstallFinaleV12:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.56/duration,grab=e(u,.2,.5),carry=e(u,.85,1.1),drop=e(u,2.05,.6),ready=e(u,2.75,.4),gift=e(u,3.5,.55);
 return <EditRoom t={t}>
  <Label x={153} y={92} size={52} style={{fontWeight:850}}>FREE setup · description below ↓</Label>
  <Glass x={141} y={194} w={1590} h={461} t={t} frost={.56}>
   <At x={101} y={108} style={{opacity:1-drop,transform:`translate(${carry*550}px,${-Math.sin(carry*Math.PI)*100-drop*35}px) scale(${1-drop*.4}) rotate(${-6*grab+6*drop}deg)`}}><SkillFile t={t} size={188}/></At>
   <Label x={47} y={352} size={29} color={C.orange}>Get the free workflow ↓</Label>
   <Actor t={t} x={269+carry*242} y={205} size={183} role="courier" look={1} reach={grab} lift={grab*(1-drop)} walk={Math.sin(carry*Math.PI)} contact={2.65*duration/8.56}/>
   <div style={{position:'absolute',left:690,top:28,width:858,height:397,borderRadius:24,background:'linear-gradient(125deg,#FFFFFFD9,#E7ECE6AA)',border:'2px solid #FFF',boxShadow:'inset 2px 2px 15px #FFF,0 12px 28px #53654F20'}}>
    <At x={27} y={25}><Logo name="claude.png" size={71}/><Label x={103} y={12} size={38}>Claude</Label></At>
    <div style={{position:'absolute',left:29,top:131,width:618,height:160,borderRadius:21,background:'#FFF8EB',border:'2px solid #D8C5AD'}}><At x={24} y={22}><SkillFile t={t} size={91}/></At><Label x={144} y={48} size={35} color={C.orange}>{ready>.5?'/fal-video':'Drop your skill here'}</Label></div>
    <Actor t={t+.3} x={660} y={157} size={169} role="operator" look={-1} reach={drop} lift={drop*.6} happy={ready>.7} contact={2.65*duration/8.56}/>
    <Label x={31} y={326} size={28} color={C.teal} style={{opacity:ready}}>Installed. Ready for your brief.</Label>
   </div>
  </Glass>
  <AgentDestinationsV13 t={t-.25} x={164} y={657} compact/>
  <Glass x={141} y={705} w={1190} h={307} t={t} frost={.62} style={{transform:`translateY(${26*(1-gift)}px)`}}>
   <Label x={25} y={21} size={29} color={C.orange} style={{fontWeight:900}}>FREE BONUS</Label><Label x={250} y={21} size={29}>Six camera recipes + setup guide</Label>
   {['Push in','Orbit','Follow','Reveal','Lock off','Crane'].map((name,i)=>{const a=e(u,3.5+i*.1,.45),move=e(u,4.25+i*.22,1.2),x=23+i*192;return <At key={name} x={x} y={79} style={{opacity:.3+.7*a,transform:`translateY(${22*(1-a)}px)`}}>
    <div style={{width:178,height:159,borderRadius:16,overflow:'hidden',background:i%2?'linear-gradient(#BECED2,#E8CBA5)':'linear-gradient(#E8BB97,#FEEDD0)',border:'2px solid #FFF',position:'relative'}}>
     <svg width="178" height="159"><path d="M0 112L54 78L93 112L134 66L178 103V159H0Z" fill={i%2?'#638B85':'#C28B6E'}/><path d="M0 134H178M89 109L38 159M89 109L139 159" stroke="#FFEDD1" opacity=".5"/></svg>
     <div style={{position:'absolute',left:63+(i===2?move*30:0),top:38-(i===5?move*17:0),transform:`scale(${i===0?1+move*.55:1})`}}><Logo name="claude.png" size={48}/></div>
     <At x={i===1?90+Math.cos(move*Math.PI*1.8)*43:i===2?18+move*28:24} y={i===5?110-move*49:i===1?101+Math.sin(move*Math.PI*1.8)*13:105}><CameraIcon t={t} size={44}/></At>
     {i===3&&<div style={{position:'absolute',left:-move*122,top:0,width:115,height:159,background:'linear-gradient(90deg,#2C5653,#638D85)',borderRight:'3px solid #B9D0BA'}}/>}
    </div><Label x={0} y={173} size={24} style={{width:178,textAlign:'center',fontWeight:750}}>{name}</Label>
   </At>;})}
  </Glass>
 </EditRoom>;
};
