import React from 'react';
import {Img,staticFile} from 'remotion';
import {Darwin,Frond,quillTip} from './DarwinKit';
import {Sprite} from './EvolutionActionScenes';
import {Bolt,Impact,Puff} from './EnergyFX';
import {P,S,pulse,clamp} from './Kit';
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const Svg=({children}:{children:React.ReactNode})=><svg width="1012" height="792" style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
function Garden({t}:{t:number}){return <Svg><rect width="1012" height="792" fill="#E5EAD0"/><circle cx="741" cy="270" r="203" fill="#FFF4CC"/><path d="M45 700V218Q506-99 968 218V700M45 249H968M506 87V699M271 125V690M749 125V690" fill="none" stroke="#9EAF94" strokeWidth="15"/><path d="M45 392H968M45 554H968" stroke="#BDC8AA" strokeWidth="7"/><path d="M0 629Q300 560 582 611T1012 598V792H0" fill="#94AE82"/><path d="M0 714Q344 672 1012 710V792H0" fill="#3B5D4B"/><path d="M0 733H1012" stroke="#B6C691" strokeWidth="9"/>{[50,270,780,968].map((x,i)=><Frond key={x} x={x} y={520+i%2*20} s={.55} rot={Math.sin(t*2+i)*4} c="#759568"/>)}<path d="M59 742l66-18M906 753l47-18M390 752l75-10" stroke="#D8D9AC" strokeWidth="5"/></Svg>}
/** Adaptation has a visible purpose: inherited springs defeat a closing trap. */
export function SurvivalSnap({t}:{t:number}){
 const close=S(t,0,.24),brace=S(t,.28,.25),adapt=S(t,.66,.2),force=S(t,.9,.4),escape=S(t,1.26,.77),counter=S(t,2.17,.37),dodge=S(t,2.58,.48);
 const jaw=48-28*close+33*force-19*counter+12*dodge;
 const hx=549-120*escape+152*dodge, hs=300+107*escape+27*dodge;
 const hy=330-127*arc(t,1.26,.77)+(710-hs*1.04-330)*escape-130*dodge;
 const dy=293+8*pulse(t,.22,.3)-14*arc(t,2.44,.64),rot=-5+10*brace-12*force+8*dodge;
 const dar={x:-13,y:dy,s:433,think:.9*(1-adapt),cast:adapt*(1-force),rot,cheer:escape*.8};
 const tip=quillTip(dar);
 return <div style={{position:'absolute',inset:0,overflow:'hidden',transform:`scale(${1.015+.025*S(t,0,3.07)})`,transformOrigin:'50% 60%'}}><Garden t={t}/>
 <Svg><path d={`M883 708Q${831-28*counter} 589 871 430`} fill="none" stroke="#355B42" strokeWidth="39"/><path d="M874 603Q745 508 731 609Q817 661 874 629M893 632Q971 540 1005 610Q957 660 893 654" fill="#668948" stroke="#355B42" strokeWidth="6"/><path d="M872 618L765 594M898 642L979 608" stroke="#A3B373" strokeWidth="5"/>
 <g transform={`translate(${871-30*counter} ${498+12*counter})`}>
 <g transform={`rotate(${-jaw})`}><path d="M0 0Q-93-151-380-104Q-405-7-300 6Q-156 28 0 0Z" fill="#62884E" stroke="#304F3A" strokeWidth="10"/><path d="M-20-5Q-192-112-365-76Q-379-22-292-19Z" fill="#BA6B59"/>{[60,120,183,249,314,362].map((x,i)=><path key={x} d={`M${-x-13} -20l13 ${31+i%2*8} 12-40Z`} fill="#FFF0BD" stroke="#567044" strokeWidth="3"/>)}<path d="M-34-26Q-173-101-351-81" fill="none" stroke="#D69474" strokeWidth="5"/></g>
 <g transform={`rotate(${jaw})`}><path d="M0 0Q-93 151-380 104Q-405 7-300-6Q-156-28 0 0Z" fill="#789450" stroke="#304F3A" strokeWidth="10"/><path d="M-20 5Q-192 112-365 76Q-379 22-292 19Z" fill="#A6564F"/>{[60,120,183,249,314,362].map((x,i)=><path key={x} d={`M${-x-13} 20l13 ${-31-i%2*8} 12 40Z`} fill="#FFF0BD" stroke="#567044" strokeWidth="3"/>)}<path d="M-30 29Q-177 107-354 85" fill="none" stroke="#D69474" strokeWidth="5"/></g><circle r="28" fill="#CAB668" stroke="#38563C" strokeWidth="7"/>
 </g><ellipse cx={hx+hs*.5} cy="723" rx={hs*.38} ry="16" fill="#244A3A55"/></Svg>
 <Darwin t={t} {...dar} gaze={1} tool="quill" shock={.8*pulse(t,.12,.45)}/>
 <Sprite t={t} x={hx} y={hy} s={hs} role={4} boots={adapt>.45?1:0} tint={adapt>.45?'#D9A750':'#D77754'} squash={.95*pulse(t,.14,.65)+.8*pulse(t,.94,.3)+.6*pulse(t,2,.22)+.8*pulse(t,2.42,.29)} shock={(1-adapt)*.9} cheer={escape*.85} rot={-9*brace+16*arc(t,1.26,.77)-19*dodge}/>
 <Svg><Bolt t={t} at={.66} from={tip} to={{x:hx+hs*.66,y:hy+hs*.91}} dur={.24}/><Impact t={t} at={.22} x={596} y={493} s={.65}/><Impact t={t} at={1.16} x={661} y={479}/><Puff t={t} at={2.01} x={636} y={716} s={1.5}/><Impact t={t} at={2.02} x={636} y={714}/><Puff t={t} at={2.65} x={638} y={717}/><path d="M952 683h46v49h-46z" fill="#EBD4A1" stroke="#36523D" strokeWidth="5"/></Svg><Img src={staticFile('claude_logo.png')} style={{position:'absolute',left:956,top:689,width:36,height:36,objectFit:'contain'}}/>
 </div>
}
function LineageWorld({t,bend}:{t:number,bend:number}){return <Svg><rect width="1012" height="792" fill="#F3DFB9"/><circle cx="720" cy="389" r="281" fill="#FFF1CC"/><path d="M24 172H988V750H24Z" fill="none" stroke="#B79C71" strokeWidth="4"/>{[0,1,2,3,4].map(i=><path key={i} d={`M${54+i*227} 208v481M42 ${224+i*106}H970`} stroke="#C3AB8050" strokeWidth="2"/>)}<path d="M0 735Q492 701 1012 731V792H0" fill="#746477"/><path d="M863 749Q847 595 803 469Q763 387 686 278M804 474Q643 518 495 418M805 485Q932 444 959 336" fill="none" stroke="#665055" strokeWidth="39" strokeLinecap="round"/><path d={`M798 570Q668 ${561+bend*86} 591 ${491+bend*92}`} fill="none" stroke="#765A58" strokeWidth="27" strokeLinecap="round"/><path d="M867 740Q850 595 798 466L687 284M800 471L502 421" fill="none" stroke="#AD8261" strokeWidth="9"/><path d="M885 659q69-97 101-39q-37 77-101 65M854 620q-90-83-109-19q48 54 109 48M946 381q-39-79-81-39q28 63 81 57M696 302q-77-63-100-13q45 53 100 31" fill="#9F8993" stroke="#715D70" strokeWidth="5"/><path d="M849 748l-109 16M863 748l92 15" stroke="#665055" strokeWidth="24" strokeLinecap="round"/>{[0,1,2].map(i=><path key={i} d={`M${76+i*68} 676q-45-79 4-127q45 61 0 127m0 0v58`} fill="#C0AE8C" stroke="#AA926F" strokeWidth="4"/>)}<path d="M0 756H1012" stroke="#D8B389" strokeWidth="7"/></Svg>}
/** The parent remains on screen; both branches receive the same inherited gold boots. */
export function InheritanceSlingshot({t}:{t:number}){
 const transfer=S(t,.12,.35),left=S(t,.32,.36),right=S(t,.67,.36),load=S(t,1.08,.35),launch=S(t,1.46,.64),tail=S(t,2.58,.48);
 const bend=load*(1-S(t,1.45,.28));
 const hs=211+220*launch+28*tail,hx=492-39*launch+139*tail,hy=335+91*bend+(716-hs*1.04-335)*launch-172*arc(t,1.46,.64)-145*tail;
 const dar={x:-14+65*S(t,0,.2)-65*S(t,.24,.4)-26*pulse(t,2.09,.35),y:296-14*arc(t,2.63,.5),s:428,think:.8*(1-transfer),cast:transfer*(1-left),rot:-5+10*pulse(t,.06,.55)-7*launch+8*tail,cheer:launch*.85};
 const tip=quillTip(dar);
 return <div style={{position:'absolute',inset:0,overflow:'hidden',transform:`scale(${1.012+.028*S(t,0,3.06)})`,transformOrigin:'50% 60%'}}><LineageWorld t={t} bend={bend}/>
 <Svg><path d="M750 342Q674 378 597 429M763 347Q874 363 908 413" fill="none" stroke="#574E5D" strokeWidth="17" opacity={transfer}/><path d="M750 342Q674 378 597 429" fill="none" stroke="#EAB853" strokeWidth="9" pathLength="1" strokeDasharray="1" strokeDashoffset={1-left}/><path d="M763 347Q874 363 908 413" fill="none" stroke="#EAB853" strokeWidth="9" pathLength="1" strokeDasharray="1" strokeDashoffset={1-right}/><ellipse cx={hx+hs*.5} cy="724" rx={hs*.36} ry="15" fill="#44384655"/></Svg>
 <Darwin t={t} {...dar} tool="quill" gaze={1}/>
 <Sprite t={t} x={660} y={167-54*(1-S(t,0,.24))-9*pulse(t,.15,.45)-11*arc(t,2.55,.6)} s={205} role={4} tint="#769B71" boots={1} cheer={.8*transfer} rot={3*Math.sin(t*3)}/>
 <P x={830} y={330-28*arc(t,.78,.44)-15*arc(t,2.49,.65)} w={177} h={177} style={{transform:`scale(${right})`,transformOrigin:'50% 100%'}}><Sprite t={t} x={0} y={0} s={177} role={4} tint="#679FB0" boots={1} cheer={right*.8} rot={-9+15*pulse(t,2.37,.55)}/></P>
 <P x={hx} y={hy} w={hs} h={hs} style={{transform:`scale(${left})`,transformOrigin:'50% 100%'}}><Sprite t={t} x={0} y={0} s={hs} role={4} boots={1} tint="#DF9250" squash={.9*bend+.62*pulse(t,2.09,.22)+.9*pulse(t,2.36,.31)} cheer={launch*.9} rot={-12*bend+14*arc(t,1.46,.64)-18*tail}/></P>
 <Svg><Bolt t={t} at={.12} from={tip} to={{x:723,y:350}} dur={.25}/><Impact t={t} at={.4} x={599} y={490} s={.5}/><Impact t={t} at={.75} x={915} y={503} s={.5}/><Impact t={t} at={1.48} x={594} y={536} s={.8}/><Puff t={t} at={2.09} x={655} y={720} s={1.4}/><Impact t={t} at={2.1} x={655} y={720}/><Puff t={t} at={2.66} x={659} y={720}/><path d="M899 680h50v50h-50z" fill="#F4DCB3" stroke="#6E5661" strokeWidth="4"/></Svg><Img src={staticFile('claude_logo.png')} style={{position:'absolute',left:906,top:687,width:36,height:36,objectFit:'contain'}}/>
 </div>
}
