import React from 'react';
import {P,S,E,pulse} from './Kit';
import {Darwin,Habitat,quillTip} from './DarwinKit';
import {Sprite} from './EvolutionActionScenes';
import {Bolt,Impact,Charge} from './EnergyFX';
const arc=(t:number,a:number,d:number)=>Math.sin(Math.max(0,Math.min(1,(t-a)/d))*Math.PI);
export function Build({t}:{t:number}){
 const strain=pulse(t,0,.36),burst=S(t,.32,.24),surge=E(t,.36,.65),land=pulse(t,1.02,.27),run=S(t,1.13,.41);
 // Landing stores spring energy; the next launch is still accelerating at the cut.
 const reload=pulse(t,1.20,.24),takeoff=Math.max(0,t-1.37),thrust=takeoff*takeoff;
 const d={x:-38-16*burst,y:223+24*burst-18*strain,s:394,think:1-burst,cheer:0,rot:-9*strain-16*burst+7*land-20*takeoff,cast:1-S(t,.1,.17)};
 const hs=118+302*surge,hx=568-158*surge+18*run+270*thrust,hy=709-hs*1.04-78*arc(t,.36,.66)+6*land+15*reload-1850*thrust;
 return <Habitat t={t} tone="forest" museum>
 <P w={1012} h={792} style={{transform:`translateX(${Math.sin(t*95)*4*pulse(t,.32,.2)}px) scale(${1+.045*surge})`,transformOrigin:'65% 67%'}}>
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M283 709H995V744H283Z" fill="#203E40" stroke="#C2B075" strokeWidth="8"/><path d="M340 707l26-75 531-9 56 84" fill="#5A8572" stroke="#294F46" strokeWidth="8"/>
 {[0,1,2].map(i=><path key={i} d={`M${582+(i-1)*60} ${487-25*strain}l${(i-1)*25} -${23+21*strain}`} stroke="#E7BE65" strokeWidth="7" strokeLinecap="round" opacity={1-burst}/>)}
 </svg>
 <Darwin t={t} {...d} tool="quill" shock={burst}/>
 {t>.32&&<>
 <Sprite t={t} x={501-285*S(t,.38,.82)} y={506-105*arc(t,.38,.82)} s={221} role={0} tint="#D98758" rot={-26*arc(t,.38,.82)-8*run} shock={.45} cheer={.4}/>
 <Sprite t={t} x={633+151*S(t,.47,.85)} y={508-152*arc(t,.47,.85)} s={218} role={1} tint="#AA82BB" rot={32*arc(t,.47,.85)+7*run} shock={.6} cheer={.5}/>
 <Sprite t={t} x={hx} y={hy} s={hs} role={2} tint="#65A38D" boots={1} squash={land*.8+reload*.95} rot={-12*arc(t,.36,.66)+5*run-45*takeoff} shock={.6*(1-surge)} cheer={surge}/>
 </>}
 {[0,1].map(side=><P key={side} x={330+(side?325:0)+(side?1:-1)*210*burst} y={462-20*strain-180*burst+65*S(t,.76,.7)} w={325} h={180} style={{transform:`rotate(${(side?1:-1)*(3*strain+36*burst)}deg) scaleY(${1+.22*strain})`,transformOrigin:side?'0% 90%':'100% 90%',opacity:1-S(t,.82,.36)}}><svg width="325" height="180" viewBox="0 0 325 180"><path d="M0 19H325V158H0Z" fill="#ECE0B9" stroke="#203C40" strokeWidth="8"/><path d="M9 116H315M9 133H315" stroke="#A8966E" strokeWidth="5"/><path d="M0 0H325V112H0Z" fill="#254F49" stroke="#122F39" strokeWidth="9"/><path d="M17 16H308V94H17Z" fill="none" stroke="#D3AC59" strokeWidth="4"/><text x="164" y="72" textAnchor="middle" fontFamily="Fraunces" fontWeight="900" fontSize="36" fill="#EEDDAB">{side?'PROMPT':'ONE'}</text></svg></P>)}
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <Charge t={t} at={0} dur={.28} {...quillTip(d)} s={.7}/><Bolt t={t} at={.19} from={quillTip(d)} to={{x:616,y:511}} dur={.2}/><Impact t={t} at={.33} x={648} y={559} s={1.7}/><Impact t={t} at={1.02} x={621} y={704} s={1.7}/><Impact t={t} at={1.38} x={644} y={704} s={1.8}/>
 {t>1.37&&<g stroke="#EAD28A" strokeWidth="9" strokeLinecap="round"><path d={`M${hx+91} ${hy+hs+25}l-20 ${30+270*takeoff}M${hx+hs-90} ${hy+hs+25}l19 ${30+320*takeoff}`}/></g>}
 {Array.from({length:10},(_,i)=>{const q=S(t,.33+i*.012,.91);return <g key={i} opacity={t>.33?1-S(t,1.1,.4):0} transform={`translate(${640+Math.cos(i*2.4)*(75+q*420)} ${542+Math.sin(i*2.4)*(20+q*180)+q*40}) rotate(${i*23+q*180})`}><path d="M-18-29H18V29H-18Z" fill="#EADAB0" stroke="#5A7864" strokeWidth="3"/><path d="M-11-14H11M-11-4H11M-11 6H6" stroke="#809078" strokeWidth="3"/></g>})}
 {t>.42&&t<.93&&<path d={`M${hx+40} ${hy+hs*.7}l-49 34M${hx+hs-11} ${hy+hs*.65}l49 34`} stroke="#EAD28A" strokeWidth="8" strokeLinecap="round"/>}
 </svg>
 </P></Habitat>
}
