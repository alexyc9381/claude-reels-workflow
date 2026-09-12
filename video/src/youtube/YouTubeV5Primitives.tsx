import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,Loop,staticFile} from 'remotion';
import {WhiteGlassSurface,SpriteActor} from './WhiteGlass';
import {bodyFont,displayFont} from './cinematic-brand';
import {easeOut,easeInOut,naturalHop} from './glass-motion';
import {hopFace,facePresets} from './face-motion';
import {crewPose,type CrewAction} from './crew-motion';
export const C={ink:'#1A1813',orange:'#B8501F',clay:'#D2724E',teal:'#267D78',blue:'#315F79',gold:'#E8AD38',mint:'#8DC7B3',cream:'#ECE9E2'};
export const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
export const visible=(t:number,d:number)=>easeOut(t,0,.16)*(1-easeInOut(t,d-.24,.24));
// Analytic damped spring: no hard landing, state and velocity remain seek-safe.
export const pop=(t:number,at=0,speed=13)=>{const u=Math.max(0,t-at);return t<at?0:1-Math.exp(-speed*u)*(Math.cos(speed*.67*u)+1.493*Math.sin(speed*.67*u));};
export const BrandedBackground:React.FC<{t:number}>=({t})=><AbsoluteFill style={{background:'linear-gradient(125deg,#F6EBD8 0%,#ECD6BC 44%,#D58D68 100%)',overflow:'hidden'}}>
 <AbsoluteFill style={{background:`radial-gradient(ellipse at ${26+Math.sin(t*.13)*5}% 25%,#FFFDF2EE,transparent 62%),radial-gradient(ellipse at 82% ${68+Math.sin(t*.17)*4}%,#D4774260,transparent 62%)`}}/>
</AbsoluteFill>;
export const Glass:React.FC<{x:number;y:number;w:number;h:number;t:number;children?:React.ReactNode;style?:React.CSSProperties;frost?:number}>=({x,y,w,h,t,children,style,frost=.55})=><WhiteGlassSurface x={x} y={y} width={w} height={h} t={t} radius={32} frost={frost} studioRefraction={false} style={{fontFamily:bodyFont,fontWeight:500,...style}}>{children}</WhiteGlassSurface>;
export const Logo:React.FC<{name:string;size?:number}>=({name,size=76})=><Img src={staticFile('v3/'+name)} style={{width:size,height:size,objectFit:'contain',borderRadius:size*.18,background:name==='seedance.png'?C.orange:undefined,padding:name==='seedance.png'?size*.14:0,boxSizing:'border-box'}}/>;
// Scene actions carry the explanation. Alex explicitly removed standalone headers.
export const Title:React.FC<{children:React.ReactNode;x?:number;y?:number;size?:number;color?:string;style?:React.CSSProperties}>=()=>null;
export const Actor:React.FC<{t:number;x:number;y:number;size?:number;role?:'courier'|'operator'|'archivist';hop?:number;lift?:number;travel?:number;happy?:boolean;action?:CrewAction}>=({t,x,y,size=230,role='courier',hop=.35,lift=80,travel=0,happy=false,action='work'})=>{
 const p=crewPose(t,role,hop,lift,travel,happy?'celebrate':action);
 return <SpriteActor t={t} x={x} y={y} size={size} colorful outfit={role} {...p} gait={{phase:t*15,amount:travel}}/>;
};
export const Key:React.FC<{size?:number;t:number}>=({size=120,t})=><svg width={size} height={size} viewBox="0 0 120 120" style={{overflow:'visible',transform:`rotate(${-22+6*Math.sin(t*1.4)}deg)`}}><defs><linearGradient id="v4-key-metal"><stop stopColor="#FFF0B8"/><stop offset=".4" stopColor={C.gold}/><stop offset=".6" stopColor="#FFE7A3"/><stop offset="1" stopColor="#C5913C"/></linearGradient></defs><circle cx="35" cy="35" r="26" stroke="url(#v4-key-metal)" strokeWidth="16" fill="none"/><path d="M54 54L107 107M81 81L99 62M95 96L113 77" stroke="url(#v4-key-metal)" strokeWidth="16" fill="none" strokeLinecap="round"/><circle cx="35" cy="35" r="13" stroke="#FFF8D2" strokeWidth="2" fill="none"/></svg>;
export const SkillFile:React.FC<{t:number;size?:number;open?:number;label?:string}>=({t,size=250,open=0,label='.skill'})=><div style={{position:'relative',width:size,height:size*1.2,perspective:900}}>
 {[2,1,0].map(i=><div key={i} style={{position:'absolute',inset:'0 5%',borderRadius:19,background:i?'#F4E5CA':'linear-gradient(140deg,#FFFFFF,#FFF5E3)',border:'2px solid #FFFFFF',boxShadow:'0 13px 24px #87533324',transform:`translate(${i*12+open*i*38}px,${i*-7-open*i*24}px) rotate(${i*3+open*i*9}deg)`}}>
  {i===0&&<div style={{position:'absolute',left:'13%',top:'16%',color:C.orange,fontFamily:displayFont,fontSize:size*.23,fontWeight:700}}>{label}</div>}
  {[0,1,2,3].map(j=><div key={j} style={{position:'absolute',left:'13%',top:(47+j*9)+'%',width:(j===3?38:70)+'%',height:size*.022,borderRadius:5,background:j===0?C.clay+'90':C.teal+'35',transform:`scaleX(${easeOut(t,j*.07,.3)})`,transformOrigin:'left'}}/>)}
  <div style={{position:'absolute',right:15,bottom:15,width:size*.13,height:size*.13,borderRadius:8,background:C.teal+'22',display:'grid',placeItems:'center',fontSize:size*.07,color:C.teal}}>✦</div>
 </div>)}
</div>;
export const Film:React.FC<{w?:number;t:number;placeholder?:boolean;label?:string;video?:boolean;revealed?:boolean}>=({w=580,t,placeholder=false,label,video=false,revealed=false})=><div style={{position:'relative',width:w,height:w*.62,borderRadius:25,background:placeholder?C.orange:C.blue,boxShadow:'0 23px 40px #553E3033',overflow:'hidden',border:'3px solid #FFFFFFA8'}}>
 <div style={{position:'absolute',left:'3%',top:'11%',width:'94%',height:'77%',overflow:'hidden',borderRadius:13,background:placeholder?'#F4DEC2':'#203B45'}}>
  {placeholder?<><div style={{position:'absolute',inset:0,background:'linear-gradient(125deg,#FFF3DC,#EDD4B3)'}}/><div style={{position:'absolute',left:'35%',top:'3%',fontFamily:displayFont,fontSize:w*.24,color:C.orange,transform:`translateY(${Math.sin(t*2)*5}px)`}}>?</div><div style={{position:'absolute',bottom:'9%',width:'100%',textAlign:'center',fontFamily:bodyFont,fontSize:w*.04,color:C.orange,fontWeight:600}}>Add comparison clip</div></>:video?<Loop durationInFrames={120}><OffthreadVideo src={staticFile('v4/claude-result.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop>:<Img src={staticFile('pipeline-result.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',filter:revealed?undefined:'blur(22px)',transform:`scale(${1.04+Math.sin(t*.8)*.018})`}}/>}
 </div>
 {[0,1].map(row=>Array.from({length:11},(_,i)=><div key={row+'-'+i} style={{position:'absolute',left:(4.5+i*8.7)+'%',top:row?'93%':'3%',width:'4.5%',height:'3.5%',borderRadius:2,background:'#FFF9E9',opacity:.7+.3*Math.sin(t*5-i*.6)**2}}/>))}
 {label&&<div style={{position:'absolute',left:15,top:14,borderRadius:12,padding:'5px 12px',color:'#FFF8E8',background:placeholder?C.orange:C.teal,fontFamily:bodyFont,fontWeight:700,fontSize:24}}>{label}</div>}
</div>;
export const Stage:React.FC<{t:number;children:React.ReactNode;title?:string}>=({t,children,title})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/><AbsoluteFill style={{transform:'translateY(-35px) scale(1.05)',transformOrigin:'960px 540px'}}>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="v4-floor" x2="0" y2="1"><stop stopColor="#FFFDF5"/><stop offset="1" stopColor="#D3B791"/></linearGradient></defs><ellipse cx="940" cy="855" rx="755" ry="94" fill="#A56C3D19"/><ellipse cx="940" cy="825" rx="747" ry="74" fill="url(#v4-floor)" stroke="#FFF7DF" strokeWidth="3"/></svg>
 {title&&<Title>{title}</Title>}{children}</AbsoluteFill>
</AbsoluteFill>;
export const ProgressBorder:React.FC<{w:number;h:number;t:number;d:number}>=({w,h,t,d})=>{
 const p=clamp((t-.15)/Math.max(.1,d-.5));
 // SVG pathLength normalizes the true rounded perimeter, including all four corners.
 return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'visible'}}><rect x="2.5" y="2.5" width={w-5} height={h-5} rx="30" fill="none" stroke={C.orange} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} strokeLinecap="round"/></svg>;
};
