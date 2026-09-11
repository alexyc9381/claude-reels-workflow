import React from 'react';
import {Easing,interpolate} from 'remotion';
import {Mascot} from './SlopKit';
import {inter} from './fonts';
const E=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
const PAPER='#F4EADC',INK='#172D43',GOLD='#E6B955',CLAY='#D97757',VIOLET='#7960BA';
// This rectangle is shared by the illustration and the real overview. The first
// recorded pixels appear only after frame 150, then settle before the f172 click.
const hookLocalPortal=(f:number)=>{
 const p=E(f,126,169);return {left:mix(378,122,p),top:mix(715,476,p),width:mix(604,836,p),height:mix(373,504,p),radius:22};
};
export const hookPortal=(f:number)=>{
 const p=E(f,126,169),r=hookLocalPortal(f),s=mix(.88,1,p);
 return {left:mix(28,0,p)+r.left*s,top:mix(100,0,p)+r.top*s,width:r.width*s,height:r.height*s,radius:r.radius*s};
};

const Wheel:React.FC<{angle:number}>=({angle})=><g transform={`translate(340 1024) rotate(${angle})`}>
 <circle r="48" fill="none" stroke={GOLD} strokeWidth="16"/>
 {[0,1,2,3,4].map(i=><path key={i} d="M0 0H44" stroke={GOLD} strokeWidth="9" transform={`rotate(${i*72})`}/>)}
 <circle r="15" fill={PAPER} stroke={INK} strokeWidth="5"/><circle cx="-40" cy="0" r="14" fill={CLAY} stroke={PAPER} strokeWidth="5"/>
</g>;

// Already in motion on frame 0. Constant cable speed, then a smooth brake into
// the existing f64 socket contact; the camera is an independent driver.
export const hookCrankProgress=(f:number)=>{
 const t=Math.max(0,Math.min(f,64)),brake=Math.max(0,t-52);
 return .04+(.96/58)*(t-brake*brake/24);
};
export const LM146Hook:React.FC<{f:number}>=({f})=>{
 const portal=hookLocalPortal(f),handoff=E(f,126,169),gone=E(f,128,153),screenFade=1-E(f,150,161);
 const lower=hookCrankProgress(f),seat=E(f,64,76),retract=E(f,76,104),wake=E(f,67,83);
 const turn=540*lower,rad=turn*Math.PI/180,hx=340-40*Math.cos(rad),hy=1024-40*Math.sin(rad);
 const mouseMove=E(f,70,87),press=E(f,84,90)*(1-E(f,92,101));
 const jump=E(f,96,124),size=mix(280,208,jump),armX=280*179/200,armY=280*99/200;
 const x=mix(mix(hx-armX,244,mouseMove),576,jump);
 const crouch=E(f,91,95)*(1-E(f,96,101)),land=E(f,124,128)*(1-E(f,129,136));
 const y=mix(mix(hy-armY,986,mouseMove)+8*press+18*crouch,806,jump)-155*Math.sin(Math.PI*jump)+14*land;
 const effort=1-E(f,64,74);
 const zoom=1+.043*E(f,0,14)*(1-E(f,100,126));
 const chipY=mix(567,1100,lower),chipScale=1.3-.85*seat;
 return <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  <div style={{position:'absolute',left:34,top:400,width:1012,height:1020,borderRadius:37,overflow:'hidden',opacity:1-E(f,150,168),background:'#DCEBD9',border:'2px solid #8BA899',boxShadow:'0 29px 60px #17243C45'}}>
   <svg width="1012" height="1020" viewBox="34 400 1012 1020">
    <path d="M34 400H1046V1190H34Z" fill="#E8EDDB"/>
    <path d="M34 1128L1046 1010V1420H34Z" fill="#819887"/>
    <path d="M34 1165L1046 1044" stroke="#F8F4D9" strokeWidth="9"/>
    <path d="M79 400V1082L277 1057V400M82 663H277M82 838H277" fill="#C2D5BF" stroke="#A6BDA8" strokeWidth="8"/>
    <path d="M105 420H251V634H105Z" fill="#F3F4DD"/>
    <path d="M1004 400V1043M930 400V1047" stroke="#BCCFB8" strokeWidth="16"/>
    <path d="M34 1299L1046 1180M295 1420L243 1140M790 1420L665 1090" stroke="#5E796B" strokeWidth="5"/>
    <path d="M31 1230H89V1407H31Z" fill="#35504D"/>
    <path d="M996 1169H1050V1425H996Z" fill="#284540"/>
   </svg>
  </div>
  <div style={{position:'absolute',inset:0,transform:`translate(${mix(28,0,handoff)}px,${mix(100,0,handoff)}px) scale(${mix(.88,1,handoff)})`,transformOrigin:'0 0'}}>
   <div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,transformOrigin:'54% 59%'}}>
   <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:1-gone}}>
    <ellipse cx="669" cy="1249" rx="376" ry="32" fill="#10252F33"/>
    <ellipse cx={x+size/2} cy={mix(y+size*.93,1200,jump)} rx={153*(1-.7*jump)} ry="19" fill="#132D3C35" opacity={1-jump}/>
    {/* The hoist has a cable, pulley, visible crank knob, and a retreating boom. */}
    <g opacity={1-E(f,114,132)}>
     <path d="M337 1199V553Q337 530 364 530H691" fill="none" stroke={INK} strokeWidth="30" strokeLinejoin="round"/>
     <path d="M330 1198V552Q330 540 355 540H685" fill="none" stroke="#86A6A4" strokeWidth="10"/>
     <path d="M292 1213H385L367 1189H308Z" fill={INK}/>
     <g transform={`translate(${-315*retract} 0)`}>
      <circle cx="685" cy="553" r="27" fill={GOLD} stroke={INK} strokeWidth="7"/>
      <path d={`M685 552V${mix(chipY-3,572,retract)}`} stroke={INK} strokeWidth="7"/>
      <path d={`M${mix(644,665,retract)} ${mix(chipY,572,retract)}Q685 ${mix(chipY-45,542,retract)} ${mix(726,705,retract)} ${mix(chipY,572,retract)}`} fill="none" stroke={INK} strokeWidth="8"/>
     </g>
    </g>
    {/* Recognisable keyboard deck; the AI module seats in its central socket. */}
    <path d="M365 1088H995L1035 1199Q1035 1224 1007 1224H347Q317 1224 324 1199Z" fill="#53677F" stroke={INK} strokeWidth="8"/>
    <path d="M365 1088H995L1027 1189H331Z" fill="#BCCBCE" stroke="#E6EBDF" strokeWidth="4"/>
    {[0,1,2].map(r=>Array.from({length:10},(_,c)=><rect key={`${r}-${c}`} x={377+c*58-r*7} y={1105+r*23} width="42" height="14" rx="3" fill={c>3&&c<7?INK:'#6A7E90'}/>))}
    <rect x="605" y="1090" width="163" height="52" rx="12" fill={INK} stroke={GOLD} strokeWidth="5"/>
    <path d="M565 1173H765L779 1194H551Z" fill="#8CA0AE" stroke="#E8EFDF" strokeWidth="3"/>
    <path d="M334 1210H1027" stroke="#E6ECDF" strokeWidth="5"/>
   </svg>
   {/* Illustrated display; no captured UI exists in the opening five seconds. */}
   <div style={{position:'absolute',left:portal.left,top:portal.top,width:portal.width,height:portal.height,borderRadius:portal.radius,background:INK,boxShadow:`0 0 0 ${mix(17,0,handoff)}px #172D43,0 20px 35px #172D4340`,overflow:'hidden',opacity:screenFade}}>
    <svg width="100%" height="100%" viewBox="0 0 604 373" preserveAspectRatio="none">
     <rect width="604" height="373" fill="#DBE2EE"/>
     <path d="M0 20H604M0 353H604" stroke="#BFCDDD" strokeWidth="5"/>
     {[0,1,2].map(i=><g key={i}><path d={`M${42+i*20} 58H${143+i*20}V${128+i*25}H248M${562-i*20} 308H${461-i*20}V${245-i*25}H356`} stroke={wake>0?'#9E8AC8':'#AABDCF'} strokeWidth="7" fill="none"/><circle cx={42+i*20} cy="58" r="8" fill={VIOLET}/><circle cx={562-i*20} cy="308" r="8" fill={VIOLET}/></g>)}
     <rect x={mix(242,167,wake)} y={mix(124,53,wake)} width={mix(120,270,wake)} height={mix(126,268,wake)} rx="24" fill={wake>0?VIOLET:'#AABDCF'} stroke={PAPER} strokeWidth="7"/>
     <rect x={mix(242,12,E(f,90,124))} y={mix(124,12,E(f,90,124))} width={mix(120,580,E(f,90,124))} height={mix(126,349,E(f,90,124))} rx="24" fill="#6A50A4" opacity={E(f,90,99)}/>
     {[70,84,98].map((at,i)=>{const t=E(f,at,at+16);if(f<at||f>at+16)return null;return <rect key={at} x={i%2?542-238*t:42+220*t} y={i%2?308-120*t:58+130*t} width="42" height="32" rx="5" fill={GOLD}/>;})}
     {/* The mouse press drives a single expanding window outline into the handoff. */}
     <rect x={mix(242,17,E(f,90,124))} y={mix(124,17,E(f,90,124))} width={mix(120,570,E(f,90,124))} height={mix(126,339,E(f,90,124))} rx="17" fill="none" stroke={VIOLET} strokeWidth="8" opacity={E(f,90,99)}/>
    </svg>
   </div>
   <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:1-gone}}>
    <g opacity={1-E(f,114,132)} transform={`translate(${-315*retract} 0)`}>
     <path d={`M685 552V${mix(chipY-3,572,retract)}`} stroke={INK} strokeWidth="7"/>
     <path d={`M${mix(644,665,retract)} ${mix(chipY,572,retract)}Q685 ${mix(chipY-45,542,retract)} ${mix(726,705,retract)} ${mix(chipY,572,retract)}`} fill="none" stroke={INK} strokeWidth="8"/>
    </g>
    <defs><clipPath id="lm146-chip-slot"><rect width="1080" height="1113"/></clipPath></defs>
    <g clipPath="url(#lm146-chip-slot)">{f<77&&<g transform={`translate(685 ${chipY}) scale(${chipScale}) translate(-109 0)`} opacity={1-E(f,67,77)}>
     {[0,1,2,3,4].map(i=><g key={i} stroke={GOLD} strokeWidth="11"><path d={`M${28+i*40}-13V5M${28+i*40} 182V207M-13 ${23+i*36}H6M210 ${23+i*36}H232`}/></g>)}
     <rect width="218" height="193" rx="24" fill={VIOLET} stroke={INK} strokeWidth="9"/><rect x="17" y="17" width="184" height="160" rx="16" fill="#987DBE" stroke="#D8C3E3" strokeWidth="5"/>
     <text x="109" y="129" fontFamily={inter.fontFamily} fontWeight="900" fontSize="93" textAnchor="middle" fill={PAPER}>AI</text>
    </g>}</g>
    {f>=64&&f<80&&[-1,1].map(dir=><g key={dir} opacity={1-E(f,64,80)}><path d={`M${685+dir*(103+55*E(f,64,80))} ${1123-30*E(f,64,80)}l${dir*27} -17`} stroke={GOLD} strokeWidth="9" strokeLinecap="round"/></g>)}
    <g transform={`translate(485 ${1095+press*9})`}>
     <path d="M0 58V35Q0 0 28 0T56 35V58Q56 90 28 90T0 58Z" fill={PAPER} stroke={INK} strokeWidth="5"/>
     <path d="M28 0V43" stroke={INK} strokeWidth="3"/><rect x="22" y="17" width="12" height="22" rx="6" fill={VIOLET}/>
    </g>
   </svg>
   <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:(1-E(f,65,73))*(1-gone)}}><Wheel angle={turn}/></svg>
   <div style={{position:'absolute',left:x,top:y,opacity:1-E(f,151,164),transform:`rotate(${-17*Math.sin(Math.PI*jump)}deg) scale(${1+.12*land},${1-.07*effort-.06*press-.16*crouch-.15*land})`,transformOrigin:'50% 50%'}}>
    <Mascot lf={f+24} size={size} nodAmp={0} gaze={f<96?8:-5*E(f,119,126)} stern={.8*effort+.4*press} cheer={Math.max(.65*E(f,64,73)*(1-E(f,70,84)),.95*E(f,96,103))}/>
   </div>
   </div>
  </div>
 </div>;
};
