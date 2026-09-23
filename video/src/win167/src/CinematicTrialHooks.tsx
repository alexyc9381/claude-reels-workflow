import React from 'react';
import {Img,staticFile,interpolateColors} from 'remotion';
import {Darwin} from './DarwinKit';
import {P,S,E,pulse,clamp} from './Kit';
import {Impact,Puff} from './EnergyFX';
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const Svg=({children}:{children:React.ReactNode})=><svg width="1012" height="792" style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
/** Same six-limb pixel silhouette, with arm joints posed to carry the scene's actual load. */
export function Actor({x,y,s=240,t,sy=1,rot=0,arms=0,effort=0,shock=0,armor=0,c='#D97757',stride=0,evolved=0}:{x:number,y:number,s?:number,t:number,sy?:number,rot?:number,arms?:number,effort?:number,shock?:number,armor?:number,c?:string,stride?:number,evolved?:number}){const tone=interpolateColors(evolved,[0,.35,1],[c,'#C0EFE1','#38B9AF']);const edge=interpolateColors(evolved,[0,1],[c,'#16686D']);const face=interpolateColors(evolved,[0,1],['#241E20','#143D47']);return <P x={x} y={y} w={s} h={s} style={{transform:`rotate(${rot}deg) scale(${1+(1-sy)*.38},${sy})`,transformOrigin:'50% 95%',filter:'drop-shadow(0 7px 0 #17344744)'}}><svg width={s} height={s} viewBox="0 0 200 200" shapeRendering="crispEdges" style={{overflow:'visible'}}>
 {[52,78,112,138].map((v,i)=><path key={i} d={`M${v} 140h12v${45-(i%2?1:-1)*stride*18}h-12Z`} fill={tone}/>)}
 <g transform={`rotate(${-arms*110-evolved*12*(1-effort)} 35 96)`}><path d="M8 86h30v26H8Z" fill={tone}/>{armor>0&&<g opacity={armor}><path d="M18 84h13v30H18Z" fill="#F2EEE2" stroke="#315B5B" strokeWidth="2"/><path d="M19 92l11 5m-11 3l11 5" stroke="#547F77" strokeWidth="2"/></g>}</g>
 <g transform={`rotate(${arms*110+evolved*22*(1-effort)} 165 96)`}><path d="M164 86h29v26h-29Z" fill={tone}/>{armor>0&&<g opacity={armor}><path d="M172 84h13v30h-13Z" fill="#F2EEE2" stroke="#315B5B" strokeWidth="2"/><path d="M173 92l11 5m-11 3l11 5" stroke="#547F77" strokeWidth="2"/></g>}</g>
 <path d="M34 44h132v102H34Z" fill={tone} stroke={edge} strokeWidth={3*evolved}/>
 <path d="M34 44h132v10H34Z" fill="#FFFFFF29"/>
 <path d="M154 54h12v92H34v-8h120Z" fill={edge} opacity={evolved*.75}/>
 <path d="M37 48h9v85h-9Z" fill="#D8FFF1" opacity={evolved*.55}/>
 {evolved>0&&evolved<1&&<path d={`M36 ${145-96*evolved}H164v${6+10*Math.sin(evolved*Math.PI)}H36Z`} fill="#E5FFF5" opacity={Math.sin(evolved*Math.PI)*.8}/>}

 <path d={`M67 ${71+effort*8}h14v${27+shock*12-effort*10}H67M119 ${71+effort*8}h14v${27+shock*12-effort*10}h-14`} fill={face}/>
 <path d={`M63 ${65+effort*2}l23 ${effort*8}M115 ${65+effort*10}l24 ${-effort*8}`} stroke={face} strokeWidth={4*effort}/>
 {shock>.4?<rect x="93" y="114" width="16" height="21" fill={face}/>:<path d={effort>.3?'M85 118h31v10H85Z':evolved>.8?'M81 114h39l-7 15H91Z':'M86 119l13 7 15-8'} fill={effort>.3||evolved>.8?'#FFF9E8':'none'} stroke={face} strokeWidth="4"/>}
 </svg></P>}
function Paper({x,y,w=180,h=180,rot=0,good=false,fold=0,opacity=1}:{x:number,y:number,w?:number,h?:number,rot?:number,good?:boolean,fold?:number,opacity?:number}){return <P x={x} y={y} w={w} h={h} style={{transform:`rotate(${rot}deg) scaleX(${1-fold*.8})`,opacity,filter:'drop-shadow(6px 8px 0 #20313B35)'}}><svg width={w} height={h} viewBox="0 0 180 180" preserveAspectRatio="none"><path d="M8 5H135l36 37v131H8Z" fill={good?'#DFE7C9':'#F1DDC0'} stroke="#746D5B" strokeWidth="5"/><path d="M135 5v37h36" fill="#C4B599" stroke="#746D5B" strokeWidth="4"/><path d="M42 59h89v54H42M27 82h16v17H27M130 82h18v17h-18M54 113v22m21-22v22m25-22v22m20-22v22" fill={good?'#38B9AF':'#BB826B'} stroke={good?'#38B9AF':'#BB826B'} strokeWidth="8"/><path d="M62 75v16m47-16v16" stroke="#3C3730" strokeWidth="7"/>{good?<path d="M66 149l13 12 27-25" fill="none" stroke="#337462" strokeWidth="10"/>:<path d="M73 140l23 23m0-23-23 23" stroke="#AC5547" strokeWidth="9"/>}</svg></P>}
function Foundry({t}:{t:number}){return <><Svg><rect width="1012" height="792" fill="#D7E5D7"/><path d="M0 154H1012V359H0Z" fill="#EEF0D6"/><path d="M0 358H1012V699H0Z" fill="#91B5B4"/><path d="M22 134v565M999 133v570M22 351H999" stroke="#315C6A" strokeWidth="18"/>{[430,555,680,805,930].map((x,i)=><g key={x}><path d={`M${x} 158v162`} stroke="#A4B8A8" strokeWidth="8"/><path d={`M${x+12} 173h53v86h-53Z`} fill="#C1D4C0"/><path d={`M${x+22} 195h30m-30 23h30`} stroke="#8BAA9E" strokeWidth="7"/></g>)}<path d="M0 697H1012V792H0" fill="#214759"/><path d="M0 708H1012M0 764H1012M180 699l-55 93M492 699v93M814 699l65 93" stroke="#658B93" strokeWidth="5"/><path d="M0 772h1012v20H0" fill="#123647"/></Svg><Img src={staticFile('claude_logo.png')} style={{position:'absolute',left:51,top:184,width:78,height:78}}/></>}
function Gear({x,y,r=50,angle=0}:{x:number,y:number,r?:number,angle?:number}){return <g transform={`translate(${x} ${y}) rotate(${angle})`}><circle r={r} fill="#BE9C62" stroke="#314F58" strokeWidth="9"/>{Array.from({length:10},(_,i)=><path key={i} d={`M-11 ${-r-11}h22v25h-22Z`} fill="#BE9C62" stroke="#314F58" strokeWidth="3" transform={`rotate(${i*36})`}/>)}<circle r={r*.35} fill="#315563"/><path d={`M0 ${-r*.7}V${r*.7}M${-r*.7} 0H${r*.7}`} stroke="#E4C890" strokeWidth="7"/></g>}
/** Shared test, actual deformation, two failures, retained winner reverses the machine. */
export function PressureTrial({t}:{t:number}){
 const press=S(t,.04,.36),crush=S(t,.42,.29),reject1=S(t,.69,.31),reject2=S(t,.88,.32),brace=S(t,1.11,.26),lift=S(t,1.38,.54),burst=S(t,1.87,.33),land=pulse(t,2.2,.23),desc=S(t,2.35,.32),run=S(t,2.69,.39);
 const down=256+252*press+81*crush;
 const hs=244+207*lift-41*desc;const base=715+11*land-100*run;
 const under=clamp((715-down-86)/(244*.73));const sy=under*(1-lift)+lift*(1-.1*land);const by=down*(1-lift)+(715-hs*.73*sy-86)*lift-190*burst;const hx=752-274*lift+63*run;
 const shake=5*pulse(t,.4,.17)*Math.sin(t*91)+6*pulse(t,1.9,.17)*Math.sin(t*97);
 return <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',transform:`translateX(${shake}px) scale(${1.02+.025*press+.028*lift})`,transformOrigin:'65% 67%'}}><Foundry t={t}/>
 <Svg><path d="M369 123v588M959 123v588" stroke="#365C68" strokeWidth="26"/><path d="M369 141v559M959 141v559" stroke="#E0DBBA" strokeWidth="8"/>
 <path d="M342 711H996V752H342Z" fill="#143B4E" stroke="#C8AD7D" strokeWidth="7"/>{[450,651,863].map(x=><path key={x} d={`M${x-72} 729h145`} stroke="#CA9D4D" strokeWidth="9"/>)}
 <path d="M42 588h315v117H42Z" fill="#4C7079" stroke="#E0C796" strokeWidth="6"/><path d="M284 597L338 408" stroke="#294C58" strokeWidth="18" transform={`rotate(${25*press-20*lift} 284 597)`}/><circle cx={338} cy={408} r="22" fill="#B97754" transform={`rotate(${25*press-20*lift} 284 597)`}/>
 <Gear x={978+137*burst} y={225-73*burst+155*desc} r={58} angle={240*press-310*lift+500*burst}/><Gear x={375-89*burst} y={225+33*burst} r={47} angle={-200*press+270*lift-350*burst}/>
 </Svg>
 <Darwin t={t} x={-58+28*press-22*lift} y={131+32*press-13*brace-24*burst} s={488} gaze={1} think={1-lift} shock={burst*.9} cheer={desc*.7} rot={-9+18*press-19*lift+14*arc(t,2.45,.6)} tool="none"/>
 {[0,1].map(i=>{const rej=i?reject2:reject1,x=387+i*197;return <React.Fragment key={i}><Actor x={x+(i?70:-73)*rej} y={716-228*.95+244*rej} s={228} t={t} sy={clamp((716-down-86)/(228*.73))} arms={press*.7} effort={press} shock={rej} rot={(i?65:-58)*rej} c={i?'#A28AAF':'#799EAF'}/><Paper x={x+15+(i?128:-218)*rej} y={654+141*rej} w={160} h={63} rot={(i?76:-87)*rej} opacity={rej*(1-S(t,1.13,.34))}/></React.Fragment>})}
 <Actor x={hx} y={base-hs*.95} s={hs} t={t} sy={sy} arms={Math.min(1,press*.8+brace*.2)*(1-burst*.45)} effort={1-burst*.75-desc*.25} shock={.6*(1-brace)} armor={brace} evolved={S(t,1.38,.37)} rot={-5*brace+8*lift-11*run} stride={run}/>
 {/* Crosshead remains over the actor until his growing brace drives it upward. */}
 <Svg>{[-1,1].map(side=><g key={side} transform={`translate(${side*207*burst} ${-63*burst+55*desc}) rotate(${side*19*burst} 669 ${by})`} opacity={1-S(t,2.16,.2)} clipPath={undefined}><g style={{clipPath:side<0?'inset(0 34% 0 0)':'inset(0 0 0 66%)'}}><path d={`M448 93h32v${by-74}h-32M856 93h32v${by-74}h-32`} fill="#809B99" stroke="#294C5B" strokeWidth="7"/><path d={`M347 ${by}H980v86H347Z`} fill="#274C5A" stroke="#102F43" strokeWidth="8"/><path d={`M353 ${by+56}H974v29H353Z`} fill="#DBAE56"/>{Array.from({length:12},(_,i)=><path key={i} d={`M${360+i*53} ${by+57}l-19 28h23l19-28Z`} fill="#38545B"/>)}<text x="665" y={by+42} textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="33" fill="#FBE8BA">SAME TEST</text><path d={`M673 ${by+5}l-14 20 18 18-18 22 8 18`} stroke="#FCE9B2" strokeWidth="6" fill="none" opacity={brace}/></g></g>)}
 <Impact t={t} at={.4} x={686} y={702} s={1.6}/><Puff t={t} at={.72} x={476} y={716}/><Puff t={t} at={.92} x={675} y={715}/><Impact t={t} at={1.89} x={676} y={382} s={1.5}/><Puff t={t} at={2.2} x={677} y={718} s={1.6}/>
 <path d={`M${hx+hs*.5} ${base-hs*.3}Q516 389 ${418} 538M${hx+hs*.5} ${base-hs*.3}Q843 409 ${895} 540`} stroke="#3D817A" strokeWidth="9" fill="none" opacity={desc}/></Svg>
 {[0,1].map(i=><P key={i} x={i?824:333} y={505-70*arc(t,2.35+i*.07,.44)-72*run} w={186} h={186} style={{transform:`scale(${desc}) rotate(${(i?9:-9)*run}deg)`,transformOrigin:i?'0 50%':'100% 50%'}}><Actor x={0} y={0} s={186} t={t} armor={1} arms={.5+run*.4} c={i?'#B58BDB':'#78A8DD'} stride={run}/></P>)}
 </P>
}
function Archive({t}:{t:number}){return <Svg><rect width="1012" height="792" fill="#ECDABF"/><circle cx="397" cy="359" r="265" fill="#F5ECCF"/><path d="M0 150H1012V181H0M0 379H1012V403H0" fill="#6D5362"/>{[27,139,790,902].map((x,i)=><g key={x}><path d={`M${x} 191h83v175h-83Z`} fill="#C3977D" stroke="#9A776B" strokeWidth="5"/><path d={`M${x+9} 209h65v101h-65`} fill="#E8D6B1"/><path d={`M${x+17} 324h46`} stroke="#72576A" strokeWidth="6"/></g>)}<path d="M21 180V713M991 180V713" stroke="#795C68" strokeWidth="22"/><path d="M0 685Q320 642 1012 697V792H0" fill="#504454"/><path d="M0 726H1012M160 680l-56 112M474 667v125M773 680l74 112" stroke="#A0858B" strokeWidth="4"/><path d="M0 776H1012" stroke="#312A3F" strokeWidth="25"/></Svg>}
/** A draft avalanche becomes material: the retained good drafts fold into wrist wraps, which breaks the pile. */
export function DraftAvalanche({t}:{t:number}){
 const pile=S(t,0,.39),bury=S(t,.39,.35),grab=S(t,.78,.29),fold=S(t,1.08,.32),wind=S(t,1.38,.25),hit=S(t,1.65,.24),tear=S(t,1.85,.34),rise=S(t,2.1,.33),drive=S(t,2.57,.51);
 const hs=441+87*rise+19*drive,hx=87+32*wind+69*tear+38*drive,base=718+8*pulse(t,2.14,.24)-119*drive;
 const sy=1-.54*bury+.54*grab-.13*wind+.13*hit;
 const shake=7*pulse(t,.4,.2)*Math.sin(t*80)+11*pulse(t,1.78,.21)*Math.sin(t*95);
 return <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',transform:`translate(${shake}px,${shake*.5}px) scale(${1.022+.025*pile+.02*tear})`,transformOrigin:'42% 67%'}}><Archive t={t}/>
 <Darwin t={t} x={600-19*pile+25*tear} y={199+13*pile-24*hit} s={433} flip={true} tool="lens" gaze={1} think={1-hit} shock={.6*pulse(t,.41,.5)} cheer={tear} rot={7-12*pile+16*hit-10*drive}/>
 <Img src={staticFile('claude_logo.png')} style={{position:'absolute',left:829,top:172,width:95,height:95}}/>
 <Svg><path d="M40 723H704v27H40Z" fill="#CAA879" stroke="#504051" strokeWidth="6"/><ellipse cx="355" cy="718" rx="219" ry="21" fill="#31263E66"/></Svg>
 <Actor x={hx} y={base-hs*.95} s={hs} t={t} sy={sy} arms={.9*pile-.8*grab+.86*wind-.3*tear} effort={1-hit*.55-rise*.4} shock={.85*(1-grab)} armor={fold} evolved={fold} rot={-7*pile-13*wind+21*hit-11*drive} stride={drive}/>
 {/* A falling stack is tied to contact, then tears outwards along the punch path. */}
 {Array.from({length:9},(_,i)=>{const arrival=S(t,i*.025,.38),r=i%2?1:-1,scatter=E(t,1.78+i*.017,.48);return <Paper key={i} x={140+i%3*139+r*270*scatter+Math.sin(i)*18*(1-arrival)} y={158-i*24+(578+i%3*23-158+i*24)*arrival-205*scatter+125*rise} w={198} h={135} rot={-12+i%3*11+r*93*scatter} opacity={(1-S(t,2.34,.2))} />})}
 {/* Two chosen green pages are visibly pulled from the pile and folded into small wrist wraps. */}
 {[0,1].map(i=>{const gx=i?426:138;return <Paper key={i} x={gx+(i?93:-57)*grab+34*fold} y={542-162*grab+78*fold} w={178-80*fold} h={151-40*fold} good={true} rot={(i?15:-19)+(i?71:-71)*grab} fold={fold} opacity={S(t,.71,.12)*(1-S(t,1.31,.13))}/>})}
 <Svg><Impact t={t} at={.39} x={350} y={650} s={1.5}/><Puff t={t} at={.45} x={359} y={719} s={1.8}/><Impact t={t} at={1.78} x={361} y={486} s={1.9}/><Puff t={t} at={2.19} x={416} y={720} s={1.6}/></Svg>
 {/* Rejected pages keep tumbling away while the retained drawing is unfolded into the next generation. */}
 <P x={580+125*drive} y={478-105*arc(t,2.26,.58)-77*drive} w={240} h={240} style={{transform:`scale(${rise}) rotate(${16*drive}deg)`,transformOrigin:'0 80%'}}><Actor x={0} y={0} s={240} t={t} armor={1} arms={.6+drive*.3} c="#849CE0" stride={drive}/></P>
 <Svg><path d={`M${hx+hs*.88} ${base-hs*.5}Q558 369 ${627+125*drive} ${580-77*drive}`} fill="none" stroke="#3D817A" strokeWidth="10" opacity={rise*(1-drive*.4)}/><Puff t={t} at={2.64} x={424} y={724}/></Svg>
 </P>
}
