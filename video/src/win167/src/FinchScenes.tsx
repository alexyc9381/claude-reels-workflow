import React from 'react';
import {P,T,E,S,pulse,clamp,mix} from './Kit';
import {Darwin} from './DarwinKit';
import {Spread} from './EvolutionKit';
import {GroundFinch,HardSeed,SeedKernel,FinchWorld} from './FinchAssets';
import {Shell} from './Species';
export {Build,Boris,Reveal,Tokens,CTA} from './SelectionScenes';
export {Chat} from './AdventureScenes';

function Perch({x,y,w=300}:{x:number,y:number,w?:number}){return <P x={x} y={y} w={w} h={100}><svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none"><path d="M7 9Q131-2 288 13L299 48 266 100H29L0 44Z" fill="#314D60" stroke="#163344" strokeWidth="7"/><path d="M7 9Q132-2 288 13L281 31 18 34Z" fill="#8FA7AA"/><path d="M17 44l72 14M177 46l108 7M144 65l-20 32" stroke="#527483" strokeWidth="6"/></svg></P>}
function Contact({x,y,t,a}:{x:number,y:number,t:number,a:number}){const k=pulse(t,a,.24);return <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:k}}>{[-1,1].map(i=><path key={i} d={`M${x+i*32} ${y-46}l${i*22} -19M${x+i*44} ${y+38}l${i*20} 17`} stroke="#F6D47F" strokeWidth="7" fill="none" strokeLinecap="round"/>)}</svg>}
export function FinchSketch({t=9}:{t?:number}){return <svg viewBox="0 0 270 290" width="100%" height="100%"><g stroke="#405F61" fill="none" strokeWidth="3"><path d="M135 92V125M43 154v-29H226v29M135 125v29" pathLength="1" strokeDasharray={`${S(t,1.35,.72)} 1`}/>{[[135,54,1.25],[44,199,.8],[135,199,.8],[226,199,.8]].map(([x,y,z],i)=><g key={i} opacity={i===0?1:E(t,1.45+i*.18,.28)} transform={`translate(${x} ${y+19*(1-E(t,1.45+i*.18,.38))}) scale(${z})`}><path d="M-33 5Q-18-17 9-14Q4-42 29-36Q46-34 39-14Q56 9 22 26Q-11 38-33 5L-53-5-37 16M-8 0q26-12 27 17Q-5 30-8 0M-8 29l-4 19m6-3-15 4M18 26l7 19m-6 0h14"/><path d={`M37-26Q${i===1?70:61}-24 ${i===1?72:62}-11L35-9Z`} fill="#D6B664"/><circle cx="26" cy="-24" r="3" fill="#405F61"/></g>)}</g></svg>}

export function Hook({t}:{t:number}){
 const jab=pulse(t,.01,.37),back=S(t,.29,.28),drop=S(t,.34,.63),lunge=S(t,.37,.30),close=S(t,.67,.17),split=S(t,.85,.27),eat=S(t,1.17,.32),settle=S(t,1.57,.55);
 return <P x={0} y={0} w={1012} h={792} style={{transform:`translate(${-23*S(t,.52,.5)+15*S(t,1.48,.7)}px, ${6*pulse(t,.83,.22)}px) scale(${1+.065*S(t,0,.42)+.045*S(t,.57,.45)-.055*S(t,1.55,.67)})`,transformOrigin:'65% 48%'}}><FinchWorld kind="shore">
 <Perch x={10} y={581} w={427}/><Perch x={462} y={552} w={540}/>
 <GroundFinch x={-70+104*jab+30*back} y={311-28*jab} s={365} t={t} type={0} open={.75*(1-jab)} rot={-19*back+5*pulse(t,.05,.23)} shock={back}/>
 <P x={300+38*drop} y={367+151*drop*drop-21*Math.sin(drop*Math.PI)} w={76} h={76} style={{transform:`rotate(${97*drop}deg)`}}><HardSeed x={0} y={0} s={76}/></P>
 <GroundFinch x={250+190*lunge-58*eat+19*settle} y={150+30*lunge-20*eat-11.8*settle-30*pulse(t,1.5,.57)} s={480+70*settle} t={t} type={2} open={.95*(1-close)+.28*split*(1-eat)} cheer={eat} rot={-4*eat}/>
 <HardSeed x={802} y={302} s={76} split={split} shellFall={350*S(t,1.08,.81)**2} kernelPull={eat} kernelGone={S(t,1.36,.18)} t={t}/>
 <Contact x={338} y={405} t={t} a={.15}/><Contact x={840} y={340} t={t} a={.78}/>
 <Darwin t={t} x={68+111*S(t,1.08,.93)} y={469-91*pulse(t,.94,.72)-17*pulse(t,1.71,.45)} s={287} gaze={1} think={1-split} cheer={eat} tool="lens" rot={-12+24*split-8*pulse(t,1.7,.42)}/>
 <P x={630} y={660} w={270} h={62} style={{opacity:E(t,1.56,.24),transform:`translateY(${24*(1-E(t,1.56,.3))}px)`}}><T x={0} y={0} w={270} size={37} c="#163345" style={{fontFamily:'Fraunces'}}>A useful trait.</T></P>
 </FinchWorld></P>
}

function Trial({t,round=0}:{t:number,round?:number}){
 const deeper=round===1,span=deeper?.66:.91,idx=Math.min(2,Math.floor(t/span)),local=t-idx*span;
 const approach=S(local,0,.19),clampJaw=S(local,.20,.14),failure=idx<2?S(local,.36,.22):0,crack=idx===2?S(local,.37,.25):0,eat=idx===2?S(local,.72,.25):0;
 const depart=idx<2?S(local,span-.18,.18):0;
 const bx=211+119*approach-77*failure-350*depart,by=341-22*Math.sin(approach*Math.PI)-24*failure-20*pulse(local,.72,.5);
 const depth=deeper?[.65,.95,1.38][idx]:1,len=deeper?[1.16,1.04,.94][idx]:1;
 const seedX=330+460*(205+45*len)/300,seedY=341+460/3;
 return <FinchWorld kind={deeper?'grove':'museum'}>
 <Darwin t={t} x={15+53*eat} y={177+28*eat} s={238} gaze={1} think={1-eat} cheer={eat} tool="lens" rot={-6+13*eat}/>
 {[0,1,2].map(i=><P key={i} x={0} y={0} w={1012} h={792} style={{opacity:i===idx?1:.32}}><GroundFinch x={326+i*207} y={168-13*(i===idx?1:0)} s={188} t={t} type={deeper?2:i as 0|1|2} beakDepth={deeper?[.65,.95,1.38][i]:1} beakLength={deeper?[1.16,1.04,.94][i]:1}/></P>)}
 <Perch x={123} y={675} w={858}/>
 <GroundFinch x={bx} y={by} s={460} t={t} type={deeper?2:idx as 0|1|2} beakDepth={depth} beakLength={len} open={.93*(1-clampJaw)+.20*crack*(1-eat)} rot={-8*failure} shock={failure} cheer={eat}/>
 <HardSeed x={seedX-34+43*failure} y={seedY-34+139*failure*failure} s={deeper?74:68} split={crack} shellFall={300*S(local,.68,.56)**2} kernelPull={eat} kernelGone={S(local,.92,.16)}/>
 <Contact x={seedX} y={seedY} t={local} a={.28}/>

 </FinchWorld>}
export function Test({t}:{t:number}){return <Trial t={t}/>}
export function Repeat({t}:{t:number}){return <Trial t={t} round={1}/>}

export function Variations({t}:{t:number}){const line=S(t,.06,.62),forward=S(t,1.96,.78);return <FinchWorld kind="grove">
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M506 360V410M183 481V410H842V481M513 410V481" stroke="#102E3D" strokeWidth="19" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray={`${line} 1`}/><path d="M506 360V410M183 481V410H842V481M513 410V481" stroke="#EDD092" strokeWidth="7" fill="none" pathLength="1" strokeDasharray={`${line} 1`}/></svg>
 <GroundFinch x={360} y={151-24*pulse(t,0,.56)} s={290} t={t} type={2} open={.14} cheer={.35}/>
 <Darwin t={t} x={1} y={165} s={240} gaze={1} think={.35*(1-forward)} cheer={forward*.8} tool="lens"/>
 {[0,1,2].map(i=>{const hatch=S(t,.42+i*.2,.69),hop=pulse(t,1.35+i*.19,.65),s=255+20*hop+(i===2?90*forward:0),x=41+i*322-7*hop-(i===2?55*forward:0),y=570-37*hatch-51*hop-(i===2?53*forward:0);return <React.Fragment key={i}><Perch x={12+i*330} y={741} w={310}/><P x={0} y={0} w={1012} h={792} style={{opacity:clamp((hatch-.2)/.15),clipPath:"inset(0 0 54px 0)"}}><GroundFinch x={x} y={y} s={s} t={t} type={2} beakDepth={[.76,.95,1.2][i]} beakLength={[1.12,1.04,.94][i]} open={.27*hop} rot={-5*hop} cheer={hatch*.5}/></P><Shell x={119+i*322} y={585} s={149} crack={hatch}/></React.Fragment>})}
 </FinchWorld>}

export function ThirdLine({t}:{t:number}){const enter=E(t,0,.6),pull=S(t,.71,.92);return <FinchWorld kind="museum">
 <Spread x={mix(456,255,enter)-25*S(t,1.89,.86)} y={mix(383,170,enter)-28*S(t,1.89,.86)} w={712} h={459}><P x={39} y={62} w={269} h={286} style={{transform:'rotate(-4deg)',border:'2px solid #AB9870',overflow:'hidden'}}><FinchSketch t={t}/></P><P x={379} y={72} w={289} h={310}><T x={0} y={0} w={282} size={36} c="#244D57" style={{fontFamily:'Fraunces'}}>1. Try three</T><T x={0} y={83} w={282} size={36} c="#244D57" style={{fontFamily:'Fraunces'}}>2. Pick one</T><P x={-8} y={161} w={290} h={131} style={{background:'#254F60',borderRadius:4,overflow:'hidden'}}><T x={17} y={17} w={258} size={35} c="#F6DFAC" style={{fontFamily:'Fraunces'}}>3. Evolve<br/>the winner</T><P x={-303*pull} y={0} w={290} h={131} style={{background:'#B38355',border:'4px solid #8D6744'}}><svg viewBox="0 0 290 131"><path d="M35 58h29v37H35Z" fill="#E8C895" stroke="#795F43" strokeWidth="4"/><path d="M43 60V45a8 8 0 0 1 16 0v15" stroke="#795F43" strokeWidth="4" fill="none"/><path d="M102 68h142" stroke="#D1AE79" strokeWidth="5"/></svg></P></P></P></Spread>
 <Darwin t={t} x={82+303*enter-303*pull} y={308+40*(1-enter)+110*S(t,1.67,.53)} s={309} gaze={1} think={1-E(t,1.76,.6)} cheer={E(t,1.76,.64)*.6} rot={-3*pulse(t,.71,.92)+4*S(t,1.73,.92)}/>
 </FinchWorld>}

export function Draft({t}:{t:number}){
 const enter=S(t,0,.5),draw=S(t,.06,1.19),turn=S(t,1.40,.67),emerge=S(t,2.02,.69),snap=S(t,2.60,.39);
 const points=[[25,116],[46,74],[87,61],[117,67],[110,38],[125,18],[147,20],[159,43],[190,52],[161,66],[165,95],[137,128],[88,139],[48,129],[25,116],[4,105],[19,136],[48,129]];
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));let remaining=draw*lengths.reduce((a,b)=>a+b,0),tip=points[0];
 for(let i=0;i<lengths.length;i++){if(remaining<=lengths[i]){const q=remaining/lengths[i];tip=[mix(points[i][0],points[i+1][0],q),mix(points[i][1],points[i+1][1],q)];break;}remaining-=lengths[i];tip=points[i+1];}
 const px=322-36*enter+326+35+tip[0],py=190+24+125+tip[1],pen=1-E(t,1.29,.12),pull=E(t,1.39,.12)*(1-E(t,2.05,.13));
 const dx=315-110*turn-41*emerge,dy=335+82*emerge;
 return <P x={0} y={0} w={1012} h={792} style={{transform:`scale(${1+.075*draw*(1-turn)})`,transformOrigin:'76% 54%'}}><FinchWorld kind="museum">
 <Spread x={322-36*enter} y={190} w={652} h={434}>
 <P x={31} y={59} w={260} h={290} style={{opacity:1-.42*turn}}><FinchSketch/></P>
 <P x={356} y={61} w={255} h={290}><svg viewBox="0 0 255 290"><path d="M19 226H233" stroke="#A89165" strokeWidth="4"/><path d="M37 159Q60 94 133 115Q119 59 172 63Q213 75 188 120Q221 182 141 204Q78 226 37 159L15 142 28 181M83 143q71-24 56 43Q105 210 83 143M94 212v24M139 210l12 27" fill="none" stroke="#355968" strokeWidth="5"/><path d="M189 89Q233 86 247 118L187 122Z" fill="#D5B879" stroke="#355968" strokeWidth="4"/><circle cx="174" cy="88" r="5" fill="#355968"/></svg></P>
 <P x={326-315*turn} y={24} w={313} h={366} style={{transform:`perspective(700px) rotateY(${-turn*84}deg)`,transformOrigin:'0 50%',background:'#E6D3A6',border:'3px solid #BBA273',opacity:1-E(t,1.97,.14)}}>
 <T x={49} y={49} w={215} size={39} c="#375865" style={{fontFamily:'Fraunces'}}>First draft</T>
 <P x={35} y={125} w={230} h={188}><svg viewBox="0 0 230 188"><polyline points={points.map(p=>p.join(',')).join(' ')} stroke="#355968" fill="none" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray={`${draw} 1`}/><circle cx="140" cy="37" r="4" fill="#355968" opacity={E(t,.77,.18)}/><path d="M90 140v19m-12 0h24M134 130l5 29h15" fill="none" stroke="#355968" strokeWidth="4" opacity={E(t,1.15,.14)}/></svg></P></P>
 </Spread>
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
 <g opacity={pen}><path d={`M${dx+229} ${dy+126}L${px-33} ${py+36}L${px-17} ${py+26}`} fill="none" stroke="#CB704E" strokeWidth="20" strokeLinejoin="miter"/><path d={`M${px} ${py}l-40 62`} stroke="#6D5336" strokeWidth="7"/><path d={`M${px-21} ${py+34}q-42 2-48 43q29 6 41-28Z`} fill="#E1BF70" stroke="#736044" strokeWidth="3"/></g>
 <g opacity={pull}><path d={`M${dx+229} ${dy+126}L${632-315*turn} 394`} fill="none" stroke="#CB704E" strokeWidth="20"/><rect x={621-315*turn} y="383" width="23" height="23" fill="#D9855D"/></g>
 </svg>
 <Darwin t={t} x={dx} y={dy} s={260} gaze={1} think={1-emerge} cheer={snap*.9} rot={0}/>
 <P x={0} y={0} w={1012} h={792} style={{opacity:E(t,2.02,.18)}}><GroundFinch x={537-33*emerge} y={308+46*emerge} s={275+97*emerge} t={t} type={2} beakDepth={1.2} beakLength={.94} open={.8*(1-snap)} cheer={snap*.8}/><HardSeed x={537-33*emerge+(275+97*emerge)*(205+45*.94)/300-35} y={308+46*emerge+(275+97*emerge)*100/300-35} s={70} split={snap} shellFall={260*S(t,2.91,.40)**2} kernelGone={S(t,3.1,.18)} t={t}/></P>
 </FinchWorld></P>}
