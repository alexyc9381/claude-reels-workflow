import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Claude2D} from './Claude';
import {bodyFont,displayFont} from './cinematic-brand';
import {easeInOut,easeOut} from './glass-motion';
import {C,clamp,lerp,pop,Glass,Logo,SkillFile,Film,Key,ProgressBorder,visible,BrandedBackground} from './YouTubeV6Primitives';
export {C,clamp,lerp,pop,Glass,Logo,SkillFile,Film,Key,ProgressBorder,visible,BrandedBackground};
export const typeOn=(s:string,t:number,at:number,d:number)=>s.slice(0,Math.floor(s.length*clamp((t-at)/d)));
export const Label:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}>=({x,y,children,size=32,color=C.ink,style})=><div style={{position:'absolute',left:x,top:y,fontFamily:displayFont,fontSize:size,fontWeight:650,letterSpacing:-size*.022,lineHeight:1.15,whiteSpace:'nowrap',color,...style}}>{children}</div>;
export const settle=(t:number,at:number,amplitude=1)=>t<at?0:Math.exp(-(t-at)*7)*Math.sin((t-at)*17)*amplitude;
/** Original brand silhouette. Every expression keeps exactly equal eye apertures.
 * Anticipation, contact compression and follow-through share the object clock. */
export const Actor:React.FC<{t:number;x:number;y:number;size?:number;walk?:number;look?:number;lift?:number;reach?:number;contact?:number;happy?:boolean;lean?:number;opacity?:number;role?:string;hop?:number;travel?:number;action?:string}>=({t,x,y,size=190,walk=0,look=0,lift=0,reach=0,contact=-100,happy=false,lean=0,opacity=1,travel=0})=>{
 const moving=Math.max(walk,travel),gait=t*12.3,bounce=Math.abs(Math.sin(gait))*(-7*moving),shock=settle(t,contact),breath=Math.sin(t*2.1)*.006;
 const blinkPhase=(t+look*.17)%3.4,blink=blinkPhase<.13?1-.9*Math.sin(blinkPhase/.13*Math.PI):1;
 const open=(happy?.72:1)*blink,tilt=lean+Math.sin(gait)*2*moving-shock*7;
 return <div data-claude-2d="symmetric-eyes" style={{position:'absolute',left:x,top:y,width:size,height:size,opacity}}>
  <div style={{position:'absolute',left:size*.1,top:size*.90,width:size*.8,height:size*.065,borderRadius:'50%',background:'#633D3429',filter:'blur(9px)',transform:`scaleX(${1+Math.abs(shock)*.13})`}}/>
  <div style={{transform:`translateY(${bounce+shock*8}px) rotate(${tilt}deg) scale(${1+breath+shock*.065},${1-breath-shock*.08})`,transformOrigin:'50% 92%'}}>
   <Claude2D frame={Math.round(t*30)} size={size} face={{leftOpen:open,rightOpen:open,gazeX:look*4,gazeY:lift*-2,happy:happy?1:0}} gait={{phase:gait,amount:moving}} leftArmAngle={-lift*62-Math.sin(gait)*moving*15} rightArmAngle={-reach*70-lift*55+Math.sin(gait)*moving*15}/>
  </div>
 </div>;
};
export const Stage:React.FC<{t:number;children:React.ReactNode;map?:boolean}>=({t,children,map=false})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}>
 <BrandedBackground t={t}/>
 {/* Architectural horizon and a subtle light pool ground every physical action. */}
 <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:map?.8:.32}}>
  <defs><radialGradient id="v7-floor"><stop stopColor="#FFFFFF" stopOpacity=".9"/><stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/></radialGradient></defs>
  <ellipse cx="960" cy="800" rx="890" ry="170" fill="url(#v7-floor)"/>
  <path d="M80 831Q960 870 1840 831" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
  {map&&Array.from({length:13},(_,i)=><path key={i} d={`M100 ${180+i*45}C430 ${80+i*49} 590 ${780-i*8} 960 ${500+i*12}S1460 ${90+i*43} 1820 ${250+i*46}`} stroke={i%3===0?'#CDB19B':'#DBC7B6'} strokeWidth={i%3===0?2:1} fill="none" opacity=".55"/>)}
 </svg>{children}
</AbsoluteFill>;
export const AppWindow:React.FC<{t:number;x:number;y:number;w:number;h:number;logo?:string;name?:string;children?:React.ReactNode}>=({t,x,y,w,h,logo='claude.png',name='Claude',children})=><Glass x={x} y={y} w={w} h={h} t={t} frost={.72}>
 <div style={{position:'absolute',left:28,top:22,display:'flex',alignItems:'center',gap:17}}><Logo name={logo} size={52}/><span style={{fontSize:31,fontWeight:650}}>{name}</span></div>
 <div style={{position:'absolute',left:28,right:28,top:93,height:1,background:'#A4714C33'}}/>
 {children}
</Glass>;
export const Aura:React.FC<{w:number;h:number;t:number;duration?:number}>=({w,h,t,duration=4})=>{
 const p=clamp(t/duration),a=1-easeInOut(t,duration+.2,.5);
 return <svg width={w+18} height={h+18} style={{position:'absolute',left:-7,top:-7,overflow:'visible',opacity:a}}>
  {[20,7,2.5].map((sw,i)=><rect key={sw} x="5" y="5" width={w+4} height={h+4} rx="24" pathLength="1" fill="none" stroke={i===2?'#FFF9D7':C.clay} strokeWidth={sw} strokeDasharray={`${p} 1`} strokeLinecap="round" style={{filter:i===0?'blur(9px)':undefined,opacity:i===0?.6:1}}/>)}
 </svg>;
};
export const CameraIcon:React.FC<{size?:number;t:number}>=({size=160,t})=><svg width={size} height={size*.76} viewBox="0 0 200 150" style={{overflow:'visible'}}><defs><linearGradient id="v7-cam"><stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#CDE0DC"/></linearGradient></defs><path d="M22 39H58L69 23H123L136 39H174Q185 39 185 52V122Q185 135 170 135H26Q12 135 12 120V52Q12 39 22 39Z" fill="url(#v7-cam)" stroke={C.teal} strokeWidth="3"/><circle cx="100" cy="86" r="36" fill={C.teal}/><circle cx="100" cy="86" r="27" fill="#D0E7DF"/><circle cx="100" cy="86" r="19" fill={C.blue}/><path d={`M89 74L${102+Math.sin(t)*4} 96L113 72`} fill="none" stroke="#F4FCFA" strokeWidth="3"/><circle cx="158" cy="58" r="6" fill={C.orange}/></svg>;
