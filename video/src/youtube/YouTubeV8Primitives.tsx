import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Claude2D} from './Claude';
import {bodyFont} from './cinematic-brand';
import {easeInOut,easeOut} from './glass-motion';
import {C,clamp,lerp,pop,Logo,SkillFile,Film,Key,ProgressBorder,visible,BrandedBackground} from './YouTubeV6Primitives';
export {C,clamp,lerp,pop,Logo,SkillFile,Film,Key,ProgressBorder,visible,BrandedBackground};
export {Label,Aura,CameraIcon,typeOn,settle} from './YouTubeV7Primitives';
type Outfit='courier'|'archivist'|'operator';
/** Library costumes; equal apertures, planted feet, coupled hands and recovery. */
export const Actor:React.FC<{t:number;x:number;y:number;size?:number;role?:string;walk?:number;travel?:number;look?:number;lift?:number;reach?:number;contact?:number;happy?:boolean;lean?:number;opacity?:number;hop?:number}>=({t,x,y,size=210,role='courier',walk=0,travel=0,look=0,lift=0,reach=0,contact=-100,happy=false,lean=0,opacity=1})=>{
 const gait=t*11,move=Math.min(1,Math.max(walk,travel)),q=Math.max(0,t-contact),shock=t<contact?0:Math.exp(-7*q)*Math.sin(17*q),phase=((t+look*.17)%3.4+3.4)%3.4;
 const aperture=(happy?.77:1)*(phase<.13?1-.9*Math.sin(phase/.13*Math.PI):1),breath=.005*Math.sin(t*2.2);
 return <div data-claude-2d="symmetric-eyes" data-outfit={role} style={{position:'absolute',left:x,top:y,width:size,height:size,opacity}}>
  <div style={{position:'absolute',left:size*.08,top:size*.91,width:size*.84,height:size*.075,borderRadius:'50%',background:C.ink+'28',filter:'blur(8px)',transform:`scaleX(${1+Math.abs(shock)*.15})`}}/>
  <div style={{transform:`translateY(${-Math.abs(Math.sin(gait))*8*move+shock*9}px) rotate(${lean+Math.sin(gait)*2*move-shock*5}deg) scale(${1+shock*.055+breath},${1-shock*.07-breath})`,transformOrigin:'50% 92%'}}>
   <Claude2D frame={Math.round(t*30)} size={size} outfit={role as Outfit} colorful gesture={Math.sin(t*2)*.16+move*.3} face={{leftOpen:aperture,rightOpen:aperture,gazeX:look*4,gazeY:-clamp(lift)*2,happy:happy?1:0}} gait={{phase:gait,amount:move}} leftArmAngle={-clamp(lift)*62-Math.sin(gait)*move*15} rightArmAngle={-clamp(reach)*70-clamp(lift)*45+Math.sin(gait)*move*15}/>
  </div>
 </div>;
};
/** White optical glass. Material is shared; scene choreography is not.
 * Bounded specular pass adapted from registry shimmer-sweep (local reference).
 * Readable translucent interior, refracting rim, warm edge; no dark fill. */
export const Glass:React.FC<{x:number;y:number;w:number;h:number;t:number;children?:React.ReactNode;style?:React.CSSProperties;frost?:number}>=({x,y,w,h,t,children,style,frost=.55})=>{
 const sweep=-40+180*easeInOut(t,.12,1.6),a=.78+Math.min(.95,frost)*.14;
 return <div data-material="white-optical-glass" style={{position:'absolute',left:x,top:y,width:w,height:h,borderRadius:30,boxSizing:'border-box',fontFamily:bodyFont,color:C.ink,background:`linear-gradient(135deg,rgba(255,255,255,${a+.16}),rgba(255,255,255,${a-.03}) 45%,rgba(255,246,232,${a}))`,backdropFilter:'blur(18px) saturate(1.3)',border:'2px solid #FFFFFFCE',boxShadow:'inset 2px 3px 2px #FFFFFF,inset -3px -4px 7px #B8501F24,0 16px 40px #40281B28,0 3px 4px #FFFFFF90',...style}}>
  <div style={{position:'absolute',inset:5,borderRadius:24,border:'1px solid #FFFFFF98',boxShadow:'inset 0 -1px 1px #B8501F25',pointerEvents:'none'}}/>
  <div style={{position:'absolute',inset:0,borderRadius:29,overflow:'hidden',pointerEvents:'none'}}><div style={{position:'absolute',inset:0,background:`linear-gradient(118deg,transparent ${sweep-18}%,#FFFFFF65 ${sweep}%,transparent ${sweep+12}%)`}}/></div>
  {children}
 </div>;
};
/** Designed stage architecture: curved cyclorama, suspended studio lights,
 * fluted wings and floor perspective. Props remain separate narrative objects. */
export const World:React.FC<{t:number;children:React.ReactNode;setting?:'studio'|'archive'|'gallery'|'checkout'|'map'}>=({t,children,setting='studio'})=>{
 const warm=setting==='checkout',archive=setting==='archive',k=setting==='gallery'?1:setting==='map'?2:0;
 return <AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
   <defs><linearGradient id="v8-wall" x2="0" y2="1"><stop stopColor="#F5B97950"/><stop offset="1" stopColor={warm?'#D2724E55':'#8DC7B335'}/></linearGradient><linearGradient id="v8-floor" x2="0" y2="1"><stop stopColor="#F5C29480"/><stop offset="1" stopColor="#C9814D55"/></linearGradient></defs>
   <path d="M76 73H1844V604Q1844 749 1700 764H220Q76 749 76 604Z" fill="url(#v8-wall)" stroke="#FFFFFF" strokeWidth="3"/>
   <path d="M76 606Q76 770 240 775H1680Q1844 770 1844 606L1920 1080H0Z" fill="url(#v8-floor)"/>
   {[0,1,2,3,4,5,6,7].map(i=><g key={i} opacity=".36"><path d={`M${100+i*36} 99V615Q${100+i*36} 670 ${130+i*36} 699`} stroke="#B8501F" strokeWidth="2" fill="none"/><path d={`M${1810-i*36} 99V615Q${1810-i*36} 670 ${1780-i*36} 699`} stroke="#267D78" strokeWidth="2" fill="none"/></g>)}
   {[0,1,2,3,4,5].map(i=><path key={i} d={`M${500+i*184} 780L${-350+i*510} 1080`} stroke="#B8501F18" strokeWidth="2"/>)}
   {[820,881,970].map(y=><path key={y} d={`M30 ${y}Q960 ${y+34} 1890 ${y}`} fill="none" stroke="#B8501F17" strokeWidth="2"/>)}
   {[410,1510].map((x,i)=><g key={x} transform={`rotate(${Math.sin(t*.6+i+k)*2} ${x} 0)`}><path d={`M${x} 0V81`} stroke="#315F7955" strokeWidth="5"/><path d={`M${x-88} 87L${x+88} 87L${x+62} 107H${x-62}Z`} fill="#FFFFFF" stroke="#315F7950" strokeWidth="2"/><path d={`M${x-60} 108L${x-210} 716H${x+210}L${x+60} 108Z`} fill="#FFFFFF" opacity=".12"/></g>)}
   {archive&&[0,1,2].map(i=><g key={i} opacity=".55"><path d={`M350 ${180+i*120}H1600`} stroke="#FFFFFF" strokeWidth="14"/>{Array.from({length:12},(_,j)=><rect key={j} x={390+j*99} y={120+i*120} width={16+(j%3)*9} height="55" rx="3" fill={[C.clay,C.teal,C.gold][j%3]} opacity=".3"/>)}</g>)}
  </svg>{children}
 </AbsoluteFill>;
};
export const Pedestal:React.FC<{x:number;y:number;w:number;t:number;color?:string}>=({x,y,w,t,color=C.teal})=><svg width={w} height={100} style={{position:'absolute',left:x,top:y}}><ellipse cx={w/2} cy="77" rx={w*.48} ry="20" fill={C.ink+'16'}/><path d={`M8 27V59C8 85 ${w-8} 85 ${w-8} 59V27`} fill="#ECE9E2" stroke="#FFFFFF" strokeWidth="2"/><ellipse cx={w/2} cy="27" rx={w/2-8} ry="25" fill="#FFFFFFD0" stroke={color+'44'} strokeWidth="2"/><path d={`M30 43Q${w/2} 71 ${w-30} 43`} stroke={color} strokeWidth="3" fill="none" opacity={.6+.2*Math.sin(t*2)}/></svg>;
export const Lens:React.FC<{t:number;size?:number;angle?:number}>=({t,size=170,angle=0})=><svg width={size} height={size} viewBox="0 0 180 180"><defs><radialGradient id="v8-lens"><stop stopColor="#315F79"/><stop offset=".65" stopColor="#267D78"/><stop offset="1" stopColor="#1A1813"/></radialGradient></defs><circle cx="90" cy="90" r="86" fill="#ECE9E2" stroke="#FFFFFF" strokeWidth="4"/><circle cx="90" cy="90" r="73" fill="url(#v8-lens)" stroke="#267D78" strokeWidth="5"/>{Array.from({length:12},(_,i)=><path key={i} d="M90 9V16" transform={`rotate(${i*30} 90 90)`} stroke="#315F79" strokeWidth="2"/>)}<g transform={`rotate(${angle+Math.sin(t*.7)*8} 90 90)`}>{[0,1,2,3,4,5].map(i=><path key={i} d="M90 32L141 61L119 112L90 89Z" transform={`rotate(${i*60} 90 90)`} fill={i%2?'#8DC7B3':'#315F79'} stroke="#FFFFFF66" strokeWidth="1"/>)}</g><circle cx="90" cy="90" r="24" fill="#1A1813"/><ellipse cx="65" cy="55" rx="21" ry="8" fill="#FFFFFF99" transform="rotate(-35 65 55)"/></svg>;
export const Monitor:React.FC<{x:number;y:number;w:number;t:number;children?:React.ReactNode;label?:string}>=({x,y,w,t,children,label})=><div style={{position:'absolute',left:x,top:y,width:w}}><div style={{position:'absolute',left:w*.44,top:w*.48,width:w*.12,height:100,background:'linear-gradient(90deg,#ECE9E2,#FFF,#8DC7B3)',border:'2px solid white'}}/><div style={{position:'absolute',left:w*.24,top:w*.48+87,width:w*.52,height:18,borderRadius:'50%',background:'#FFFFFF',boxShadow:'0 10px 13px #1A181324'}}/><Glass x={0} y={0} w={w} h={w*.5625+35} t={t} frost={.35}><div style={{position:'absolute',inset:12,bottom:25,overflow:'hidden',borderRadius:20,background:'#FFFFFF60'}}>{children??<Film w={w-24} t={t} video/>}</div><div style={{position:'absolute',bottom:6,left:24,fontSize:16,letterSpacing:2,color:C.teal}}>{label??'PREVIEW'}</div></Glass></div>;
