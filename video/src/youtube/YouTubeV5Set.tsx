import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C,Logo} from './YouTubeV5Primitives';

/** A production soundstage: visible architecture and practical lights, not an
 * unrelated abstract slab. Parallax is subordinate to foreground actions. */
export const StudioSet:React.FC<{t:number}>=({t})=><AbsoluteFill data-background-depth="soft" style={{overflow:'hidden',pointerEvents:'none',filter:'blur(10px)',transform:'scale(1.025)'}}>
 <svg width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
   <linearGradient id="crew-wall"><stop stopColor="#E8C9A4"/><stop offset=".45" stopColor="#FFF6E3"/><stop offset="1" stopColor="#CB794C"/></linearGradient>
   <linearGradient id="crew-floor" x2="0" y2="1"><stop stopColor="#C4875525"/><stop offset="1" stopColor="#FFF6DD"/></linearGradient>
   <linearGradient id="crew-light" x2="0" y2="1"><stop stopColor="#FFFDE9" stopOpacity=".55"/><stop offset="1" stopColor="#FFF6DA" stopOpacity="0"/></linearGradient>
  </defs>
  <path d="M0 0H1920V820H0Z" fill="url(#crew-wall)"/>
  <g transform={`translate(${Math.sin(t*.35)*12},0)`}>
   {[115,690,1265].map((x,i)=><g key={x}><path d={`M${x} 786V213Q${x} 57 ${x+215} 57Q${x+430} 57 ${x+430} 213V786Z`} fill={i===1?'#FFF8E578':'#EDDBC457'} stroke="#FFF9E6" strokeWidth="8"/><path d={`M${x+28} 780V220Q${x+28} 89 ${x+215} 89Q${x+402} 89 ${x+402} 220V780`} fill="none" stroke="#BD936843" strokeWidth="3"/>{[1,2,3,4].map(j=><path key={j} d={`M${x+36} ${210+j*108}H${x+394}`} stroke="#D3B1864D" strokeWidth="3"/>)}</g>)}
  </g>
  <path d="M0 820H1920V1080H0Z" fill="url(#crew-floor)"/>
  <path d="M0 826H1920M0 835H1920" stroke="#FFF4D9" strokeWidth="3"/>
  {[-850,-450,0,450,850].map((x,i)=><path key={i} d={`M${960+x*.6} 833L${960+x*1.7} 1080`} stroke="#B97A4125" strokeWidth="2"/>)}
  <path d="M0 955H1920M0 1040H1920" stroke="#BE8C5620" strokeWidth="2"/>
  {[130,1790].map((x,i)=><g key={x} transform={`translate(${x},55) rotate(${(i?-1:1)*(11+Math.sin(t*.8)*5)})`}>
   <path d="M-60 0H60L48 43H-48Z" fill="#765C41"/><rect x="-42" y="37" width="84" height="12" rx="4" fill="#FFF1C4"/>
   <path d="M-39 50L-340 880H340L39 50Z" fill="url(#crew-light)"/>
  </g>)}
  <g transform={`translate(1730 760) rotate(${Math.sin(t*1.3)*2})`} opacity=".7"><path d="M0 165V-100M0 45Q-108 0-110-80Q-27-77 0 45M0-10Q101-67 104-153Q26-127 0-10" stroke="#7D976B" strokeWidth="8" fill="#94AF7B"/><path d="M-54 87H55L43 166H-42Z" fill="#E7C098" stroke="#FFF1D7" strokeWidth="4"/></g>
 </svg>
</AbsoluteFill>;

/** Outer reel turns while the brand hub remains readable. */
export const ModelReel:React.FC<{t:number;size:number;logo?:string;color?:string;speed?:number}>=({t,size,logo,color=C.orange,speed=70})=><div style={{position:'relative',width:size,height:size}}>
 <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow:'visible',filter:'drop-shadow(0 9px 5px #6B452C33)'}}>
  <circle cx="100" cy="100" r="96" fill="#D8C4A5" stroke="#FFF6DB" strokeWidth="5"/>
  <g transform={`rotate(${t*speed} 100 100)`}>
   <circle cx="100" cy="100" r="88" fill="#FFF7E8" stroke={color} strokeWidth="3"/>
   {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45} 100 100)`}><path d="M86 21Q100 10 114 21L109 53Q100 62 91 53Z" fill={color} opacity=".72"/><path d="M94 3H106V10H94Z" fill="#B89564"/></g>)}
  </g>
  <circle cx="100" cy="100" r="39" fill="#FFF9EB" stroke="#E7D0AC" strokeWidth="4"/>
 </svg>
 {logo&&<div style={{position:'absolute',left:'32%',top:'32%'}}><Logo name={logo} size={size*.36}/></div>}
</div>;

export const Conveyor:React.FC<{t:number;width:number;color?:string}>=({t,width,color=C.teal})=><div style={{position:'relative',width,height:75,borderRadius:36,background:'#D3B790',border:'3px solid #FFF1CD',boxShadow:'0 11px 0 #AA895F',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:9,borderRadius:25,border:'4px solid '+color,background:'#EEDDC3',overflow:'hidden'}}>
  {Array.from({length:Math.ceil(width/42)+2},(_,i)=><div key={i} style={{position:'absolute',left:i*42+(t*95)%42-42,top:0,bottom:0,width:3,background:color+'6A'}}/>)}
 </div>
 {[14,width-66].map((x,i)=><div key={i} style={{position:'absolute',left:x,top:12,width:44,height:44,borderRadius:'50%',background:'#FFF4D5',border:'3px solid '+color,transform:`rotate(${t*125}deg)`}}><div style={{position:'absolute',left:6,right:6,top:19,height:4,background:color}}/></div>)}
</div>;
