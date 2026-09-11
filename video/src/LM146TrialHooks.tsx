import React from 'react';
import {Easing,interpolate,Img,staticFile} from 'remotion';
import {Mascot} from './SlopKit';
export type TrialHookVariant='plug'|'assembly';
const E=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
const L=(a:number,b:number,p:number)=>a+(b-a)*p;
const C={paper:'#F4EADC',ink:'#172D43',gold:'#E6B955',clay:'#D97757',violet:'#7960BA'};
const pulse=(f:number,at:number)=>f<at||f>at+12?0:Math.sin((f-at)*Math.PI/12);
export const trialPortal=(f:number,v:TrialHookVariant)=>{
 const p=E(f,v==='plug'?72:78,108),h=E(f,126,169);
 const start=v==='plug'?{left:90,top:585,width:510,height:360}:{left:232,top:620,width:616,height:480};
 return {left:L(start.left,122,p),top:L(L(start.top,540,p),476,h),width:L(start.width,836,p),height:L(L(start.height,720,p),504,h),radius:22};
};
const Chip:React.FC<{x:number;y:number;s?:number;angle?:number}>=({x,y,s=1,angle=0})=><g transform={`translate(${x} ${y}) scale(${s}) rotate(${angle} 130 104)`}>
 {[0,1,2,3,4].map(i=><g key={i} stroke={C.gold} strokeWidth="12"><path d={`M${25+i*52}-15V5M${25+i*52} 200V222M-15 ${20+i*40}H5M255 ${20+i*40}H278`}/></g>)}
 <rect width="260" height="208" rx="24" fill={C.violet} stroke={C.ink} strokeWidth="9"/><rect x="16" y="16" width="228" height="176" rx="16" fill={C.paper} stroke={C.paper} strokeWidth="5"/>
 <image href={staticFile("lm146/qwen-official.png")} x="51" y="25" width="158" height="158"/>
</g>;
const Room:React.FC<{v:TrialHookVariant;f:number}>=({v,f})=><div style={{position:'absolute',left:34,top:400,width:1012,height:1020,borderRadius:37,overflow:'hidden',opacity:1-E(f,150,168),boxShadow:'0 29px 60px #17243C45',border:'2px solid #789495'}}>
 <svg width="1012" height="1020" viewBox="34 400 1012 1020">
  <rect x="34" y="400" width="1012" height="1020" fill={v==='plug'?'#DDE8ED':'#F0DEBD'}/>
  {v==='plug'?<><path d="M52 415H615V980H52Z" fill="#C0D2DB"/><path d="M80 415V980M247 415V980M415 415V980M80 590H615M80 780H615" stroke="#90AAB8" strokeWidth="12"/><path d="M654 400V1130M1017 400V1110" stroke="#A5BBC5" strokeWidth="22"/><path d="M685 460H982V566H685Z" fill="#F5F2D8"/></>:<><path d="M70 420H1020V1000H70Z" fill="#D8BC90"/>{[0,1,2,3,4].map(i=><path key={i} d={`M${110+i*200} 420V1000`} stroke="#C4A278" strokeWidth="12"/>)}<path d="M60 640H1030M60 846H1030" stroke="#F3E5C3" strokeWidth="11"/><path d="M80 460H280V580H80Z" fill="#ECE7C4"/></>}
  <path d="M34 1120L1046 1050V1420H34Z" fill={v==='plug'?'#78939E':'#A98568'}/><path d="M34 1138L1046 1068" stroke={C.paper} strokeWidth="10"/>
  <path d="M34 1320L1046 1198M300 1420L265 1100M845 1420L707 1075" stroke={v==='plug'?'#486977':'#745A4C'} strokeWidth="6"/>
  <path d="M34 1240H93V1420H34M995 1190H1046V1420H995" fill={v==='plug'?'#254755':'#65493C'}/>
 </svg></div>;
const Display:React.FC<{v:TrialHookVariant;f:number}>=({v,f})=>{
 const r=trialPortal(f,v),boot=v==='plug'?E(f,34,48):E(f,57,73),reveal=v==='plug'?1:E(f,34,57);
 return <div style={{position:'absolute',...r,height:r.height*reveal,top:r.top+r.height*(1-reveal),overflow:'hidden',background:C.ink,borderRadius:22,boxShadow:'0 0 0 12px #172D43,0 22px 35px #172D4340',opacity:1-E(f,150,161)}}>
  <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="none">
   <rect width="600" height="400" fill={v==='plug'?'#17354C':'#573F69'}/>
   {v==='plug'&&<rect width="600" height="400" fill="#D8E7E4" opacity={1-boot}/>}
   <path d="M0 44H600" stroke="#EDEAD630" strokeWidth="4"/>{[0,1,2].map(i=><circle key={i} cx={26+i*24} cy="24" r="6" fill={i===0?C.clay:i===1?C.gold:'#79B99F'}/>)}
   {v==='plug'?<g opacity={boot}>
    <g transform={`translate(${-390*(1-E(f,45,59))} 0)`}><path d="M39 65H381Q405 65 405 90V130Q405 152 381 152H85L48 174V152H39Q20 152 20 130V90Q20 65 39 65" fill={C.paper}/><path d="M51 100H250M51 124H337" stroke="#A490BC" strokeWidth="13" strokeLinecap="round"/></g>
    <g transform={`translate(${530*(1-E(f,79,96))} 0) translate(373 280) scale(${1+.08*E(f,113,133)}) translate(-373 -280)`}><path d="M194 186H553Q578 186 578 213V325Q578 349 553 349H509L546 377 461 349H194Q167 349 167 325V213Q167 186 194 186" fill={C.violet}/><path d="M236 222L209 246 236 270M496 222L523 246 496 270" fill="none" stroke={C.gold} strokeWidth="12" strokeLinecap="round"/>
     {[0,1,2].map(i=><rect key={i} x="262" y={222+i*31} width={(193-i*22)*E(f,94+i*10,105+i*10)} height="13" rx="5" fill={i===1?C.gold:C.paper}/>)}</g>
   </g>:<g opacity={boot}>
    {[0,1,2,3].map(i=>{const t=E(f,61+i*11,78+i*11),a=i*Math.PI/2;return <g key={i}><path d={`M300 207L${300+205*Math.cos(a)} ${207+130*Math.sin(a)}`} stroke="#D8B795" strokeWidth="12" pathLength="1" strokeDasharray="1" strokeDashoffset={1-t}/><g transform={`translate(${300+205*t*Math.cos(a)} ${207+130*t*Math.sin(a)}) rotate(${90*(1-t)})`}><rect x="-41" y="-35" width="82" height="70" rx="14" fill={i%2?C.gold:C.paper}/>{i%2?<path d="M-17 0L-3 13 22-18" fill="none" stroke="#765071" strokeWidth="9"/>:<path d="M-11-15L-26 0-11 15M11-15L26 0 11 15" fill="none" stroke={C.violet} strokeWidth="8"/>}</g></g>;})}
    <g transform={`translate(300 207) rotate(${180*E(f,100,119)})`}><rect x="-72" y="-72" width="144" height="144" rx="24" fill={C.paper} stroke={C.gold} strokeWidth="7"/></g>
    {f>=116&&f<146&&[0,1,2,3].map(i=>{const t=E(f,116+i*3,133+i*3),a=i*Math.PI/2;return <circle key={i} cx={300+205*t*Math.cos(a)} cy={207+130*t*Math.sin(a)} r="16" fill={C.gold}/>;})}
   </g>}
  </svg>
  {v==='assembly'&&<Img src={staticFile("lm146/qwen-official.png")} style={{position:"absolute",left:"50%",top:"51.75%",width:r.width*.21,height:r.width*.21,objectFit:"contain",opacity:boot,transform:`translate(-50%,-50%) rotate(${180*E(f,100,119)}deg)`}}/>}
 </div>;
};
const Plug:React.FC<{f:number}>=({f})=>{
 const feed=Math.min(1,.04+Math.max(0,f)/27*.96),turn=430*feed,rad=turn*Math.PI/180;
 const handX=662-32*Math.cos(rad),handY=1150-32*Math.sin(rad),jump=E(f,37,57),exit=E(f,94,112),hit=Math.max(pulse(f,57),pulse(f,74),pulse(f,91));
 const x=L(L(handX-250,200,jump),728,exit),y=L(L(handY-139,918,jump)-145*Math.sin(Math.PI*jump)+18*hit,1060,exit)-105*Math.sin(Math.PI*E(f,113,133)),size=L(280,220,exit);
 const gone=1-E(f,74,91),wake=E(f,27,37);
 return <>
  <Display v="plug" f={f}/>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:gone}}>
   <ellipse cx="555" cy="1310" rx="409" ry="25" fill="#183C4E33"/><path d="M90 988H746V1020H90Z" fill="#577888" stroke={C.ink} strokeWidth="8"/>
   {[0,1,2,3,4,5,6,7].map(i=><circle key={i} cx={122+i*83} cy="1004" r="13" fill={C.gold}/>)}
   <path d="M715 636L750 605H938V1278H715Z" fill="#5D768D" stroke={C.ink} strokeWidth="9"/><rect x="747" y="625" width="178" height="632" rx="17" fill="#283F59"/>
   <g transform={`translate(836 777) rotate(${f<27?0:(f-27)*18})`}><circle r="67" fill="#102A40" stroke="#A1BEC8" strokeWidth="8"/>{[0,1,2,3,4].map(i=><path key={i} d="M0 0Q-20-55 18-53Q46-46 0 0" fill="#8BA9B6" transform={`rotate(${i*72})`}/>)}<circle r="14" fill={C.gold}/></g>
   <rect x="710" y="756" width="31" height="216" rx="8" fill="#091D30" stroke={C.gold} strokeWidth="6"/>
   <defs><clipPath id="plug-feed"><rect x="80" y="480" width="632" height="530"/></clipPath></defs><g clipPath="url(#plug-feed)"><Chip x={L(143,730,feed)} y={756} s={1}/></g>
   {[0,1,2].map(i=><rect key={i} x="786" y={949+i*40} width="100" height="17" rx="6" fill={f>29+i*4?C.gold:'#415D77'}/>)}
   <circle cx="837" cy="1168" r="24" fill={wake>0?'#7FC2A1':'#516A83'}/><path d="M836 1147V1168" stroke={C.paper} strokeWidth="6"/>
   <path d="M658 1190V1034H715" fill="none" stroke={C.gold} strokeWidth="11"/>
   <g opacity={1-E(f,29,38)} transform={`translate(662 1150) rotate(${turn})`}><circle r="39" fill="none" stroke={C.paper} strokeWidth="10"/><path d="M0 0H-32" stroke={C.gold} strokeWidth="12"/><circle cx="-32" r="12" fill={C.clay}/></g>
   <path d={`M151 ${1190+12*hit}H553L587 ${1260+12*hit}H119Z`} fill="#A2B8BE" stroke={C.ink} strokeWidth="8"/>
   {[0,1].map(r=>Array.from({length:8},(_,c)=><rect key={`${r}-${c}`} x={166+c*47-r*7} y={1205+r*22+12*hit} width="33" height="14" rx="3" fill={hit>.3?C.gold:C.ink}/>))}
  </svg>
  <div style={{position:'absolute',left:x,top:y,opacity:1-E(f,150,164),transform:`rotate(${-12*Math.sin(Math.PI*jump)}deg) scale(${1+.1*hit},${1-.09*hit})`}}><Mascot lf={f+13} size={size} nodAmp={0} gaze={f<36?6:-7} stern={(1-E(f,28,37))*.9+hit*.45} shock={pulse(f,28)*.7} cheer={Math.max(.8*Math.sin(Math.PI*jump),E(f,106,116))}/></div>
 </>;
};
const Assembly:React.FC<{f:number}>=({f})=>{
 const snap=Math.min(1,.04+Math.max(0,f)/27*.96),lock=E(f,28,36),gone=1-E(f,78,108),tighten=E(f,0,28),tap=Math.max(pulse(f,33),pulse(f,54));
 const chipScale=L(1.18,.48,lock),chipY=L(750,1060,lock),chipX=540-130*chipScale;
 const move=E(f,43,62),hop=E(f,69,88),end=E(f,104,119);const x=L(L(680,690,move),400,end),y=1026-185*Math.sin(Math.PI*hop)-56*end+16*tap;
 return <>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:gone}}>
   <path d="M85 1130H975L1020 1260H45Z" fill="#DFC294" stroke="#745843" strokeWidth="9"/><path d="M45 1260H1020V1300H45Z" fill="#8D6953"/>
   <path d="M96 1300V1410M963 1300V1410" stroke="#594639" strokeWidth="24"/>
   <g transform={`translate(${-76*(1-snap)} ${-158*(1-snap)}) rotate(${-15*(1-snap)} 390 1170)`}><path d="M252 1120H540V1225H206Z" fill="#53677F" stroke={C.ink} strokeWidth="8"/>{[0,1,2].map(r=>[0,1,2,3].map(c=><rect key={`${r}-${c}`} x={266+c*60-r*9} y={1138+r*25} width="42" height="14" rx="3" fill={C.paper}/>))}</g>
   <g transform={`translate(${68*(1-snap)} ${-158*(1-snap)}) rotate(${15*(1-snap)} 690 1170)`}><path d="M540 1120H828L874 1225H540Z" fill="#7A90A5" stroke={C.ink} strokeWidth="8"/>{[0,1,2].map(r=>[0,1,2,3].map(c=><rect key={`${r}-${c}`} x={560+c*60+r*9} y={1138+r*25} width="42" height="14" rx="3" fill={C.gold}/>))}</g>
   <g transform={`translate(540 ${1080-270*(1-snap)}) rotate(${-26*(1-snap)})`}><rect x="-99" y="-30" width="198" height="60" rx="13" fill={C.ink} stroke={C.gold} strokeWidth="7"/><path d="M-65 0H65" stroke={C.paper} strokeWidth="7"/></g>
   <g opacity={1-E(f,34,45)}><Chip x={chipX} y={chipY} s={chipScale} angle={-19+150*tighten-131*lock}/></g>
   <g transform={`translate(705 1162) rotate(${-60+145*tighten})`} opacity={1-E(f,34,45)}><path d="M0 0L-57-67Q-83-63-95-85L-71-81-61-96-75-117Q-40-112-46-79L10-12Z" fill="#A8B9BD" stroke={C.ink} strokeWidth="5"/></g>
   {[0,1,2,3].map(i=>{const a=i*Math.PI/2,t=E(f,29,42);return f>=29&&f<42?<path key={i} d={`M${540+140*Math.cos(a)} ${1100+50*Math.sin(a)}l${55*t*Math.cos(a)} ${35*t*Math.sin(a)}`} stroke={C.gold} strokeWidth="10" opacity={1-t}/>:null;})}
   <path d="M200 1230H880" stroke={C.paper} strokeWidth="8"/>
  </svg>
  <Display v="assembly" f={f}/>
  <div style={{position:'absolute',left:x,top:y,opacity:1-E(f,150,164),transform:`rotate(${-8*Math.sin(Math.PI*hop)}deg) scale(${1+.08*tap},${1-.08*tap})`}}><Mascot lf={f+39} size={260} nodAmp={0} gaze={-8} stern={.9*(1-E(f,30,42))} shock={pulse(f,32)*.7} cheer={Math.max(E(f,51,63),.9*Math.sin(Math.PI*hop))}/></div>
 </>;
};
export const LM146TrialHook:React.FC<{f:number;variant:TrialHookVariant}>=({f,variant})=>{
 const zoom=1+.035*E(f,0,10)*(1-E(f,58,72));
 return <div style={{position:'absolute',inset:0,pointerEvents:'none'}}><Room v={variant} f={f}/><div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,transformOrigin:'50% 58%'}}>{variant==='plug'?<Plug f={f}/>:<Assembly f={f}/>}</div></div>;
};
