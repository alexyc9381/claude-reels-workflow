import React from 'react';
import {P,T,E,S,pulse,ring,mix,Clay,Key,Check,Burst,Mark} from './Kit';
import {Darwin,Habitat,Branch} from './DarwinKit';
import {TravelDesign,Coast,Village,FossilEgg,BookCover,Spread,Compass,Boat} from './EvolutionKit';
import {Tokens as OldTokens} from './DarwinScenes';
export {Boris} from './BorisLarge';

// A single foreground event; no app cards, instructional chips or labels in the hook.
export function Hook({t}:{t:number}){const crack=E(t,.03,.48),rise=E(t,.13,.69),grow=S(t,.38,.87),age=E(t,.69,.55),wise=E(t,1.34,.43),stroke=pulse(t,1.71,.47);return <div style={{position:'absolute',inset:0,transform:`scale(${1+.027*E(t,0,.55)})`,transformOrigin:'52% 61%'}}><Habitat t={t} tone="dawn">
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M282 605L361 542 705 549 802 625 755 703 331 711 268 661Z" fill="#7A8870" stroke="#3B5547" strokeWidth="8"/><path d="M288 608l241 42 265-22M343 696l15-65M714 690l-17-45" stroke="#ABB396" strokeWidth="5"/><path d="M379 651c-34-45 31-62 50-31s-30 52-29 23 22-20 22-5" fill="none" stroke="#526B55" strokeWidth="6"/></svg>
<Darwin t={t} x={397-120*grow+8*stroke} y={440-217*rise-28*grow-17*pulse(t,.26,.63)} s={220+303*grow} rot={-13*(1-rise)+ring(t,.8,3)+wise*3-6*stroke} age={age} think={wise*(1-stroke)} shock={.55*(1-wise)} cheer={stroke*.65} gaze={wise*.8} tool={t>1.56?'quill':'none'}/>
<P x={0} y={0} w={1012} h={792} style={{opacity:1-E(t,1.28,.33)}}><FossilEgg x={290-18*pulse(t,-.1,.45)} y={250+11*pulse(t,-.1,.45)} w={438} crack={crack}/></P>
{[0,1,2,3,4].map(i=>{const p=E(t,.18+i*.024,.63);return <P key={i} x={462+(i-2)*120*p} y={350-160*Math.sin(p*Math.PI)+310*p} w={23+i*3} h={29} style={{background:'#D7C296',clipPath:'polygon(0 0,100% 24%,70% 100%,13% 72%)',transform:`rotate(${p*(i%2?230:-250)}deg)`,opacity:1-E(t,.8,.24)}}/>})}
<svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M713 543Q800 474 863 550" fill="none" stroke="#E9D9A0" strokeWidth="5" pathLength="1" strokeDasharray={`${E(t,1.82,.28)} 1`}/><path d="M815 545l49 5-8-37" fill="none" stroke="#E9D9A0" strokeWidth="5" opacity={E(t,1.96,.14)}/></svg>
</Habitat></div>}
export function Build({t}:{t:number}){const draw=E(t,-.1,.58),phone=S(t,.82,1.31),tap=pulse(t,.66,.38);return <Habitat t={t} tone="forest">
<TravelDesign x={300-30*draw} y={173-36*(1-draw)} w={668} kind={0} rot={-5+5*draw}/>
<TravelDesign x={707+340*(1-phone)} y={320-80*Math.sin(phone*Math.PI)} w={226} kind={1} route={E(t,1.32,.62)} rot={13*(1-phone)}/>
<Clay t={t} x={2+50*draw+16*tap+30*E(t,1.8,.48)} y={338-24*tap} s={353} role="engineer" rot={-11+14*draw+9*tap+6*pulse(t,1.85,.48)} gaze={1} stern={1-phone} cheer={phone*.7}/>
<Key x={294} y={540} s={103} press={tap}/>
</Habitat>}
export function Reveal({t}:{t:number}){const show=E(t,0,.59),name=E(t,.46,.16);return <Habitat t={t} tone="forest"><Branch x={572} y={587} w={375}/><BookCover x={553-101*show} y={372-198*show-44*E(t,.64,.4)} w={380} h={485} title={name>.01?'DARWIN':''} bottom={name>.01?'LOOP':''} tilt={-16+17*show}/><Darwin t={t} x={19+72*show} y={323-42*show} s={379} rot={-10+15*show+8*pulse(t,.64,.42)} gaze={1} cheer={show*.75}/></Habitat>}
export function Chat({t}:{t:number}){const p=E(t,0,.55),stop=E(t,.66,.42);return <Habitat t={t} tone="sunset" museum>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><g transform={`translate(${419+181*pulse(t,-.18,.8)-191*stop} ${228+250*stop}) rotate(${-28*stop} 100 80)`} opacity={1-stop}><path d="M0 0h337v163H116L71 204V163H0Z" fill="#E9D4A8" stroke="#476052" strokeWidth="9"/>{[90,163,236].map(x=><circle key={x} cx={x} cy="80" r="13" fill="#8F956F"/>)}</g><g transform={`translate(${443-120*pulse(t,.05,.85)+208*stop} ${432+171*stop}) rotate(${23*stop} 100 50)`} opacity={1-stop}><path d="M0 0h337v149H261v47l-57-47H0Z" fill="#A9C2A1" stroke="#3D5B4D" strokeWidth="9"/>{[90,163,236].map(x=><circle key={x} cx={x} cy="71" r="13" fill="#3F6450"/>)}</g><path d="M729 344Q855 374 742 432M681 448Q369 444 419 337" stroke="#C2AE75" strokeWidth="8" fill="none" opacity={1-stop}/><path d="M720 419l22 13 21-21M402 353l17-16 19 12" stroke="#C2AE75" strokeWidth="8" fill="none" opacity={1-stop}/></svg>
<Clay t={t} x={22+142*stop} y={330-43*pulse(t,.66,.42)} s={367+35*stop} role="reviewer" gaze={1} stern={1-stop} shock={.3*stop} rot={-14+29*stop}/><Key x={340+86*stop} y={532} s={135} label="✕" press={pulse(t,.66,.43)} c="#D8A46B"/>
</Habitat>}
export function Test({t}:{t:number}){const unroll=E(t,0,.53),flip=E(t,.48,.55),fold=E(t,.9,.48),select=S(t,2.01,1.11),route=E(t,1.42,.58);return <Habitat t={t} tone="island">
<P x={0} y={0} w={1012} h={792} style={{opacity:1-select,transform:`translateX(${-330*select}px)`}}><P x={53} y={261} w={311} h={236} style={{overflow:'hidden',clipPath:`inset(0 ${100*(1-unroll)}% 0 0)`}}><TravelDesign x={0} y={0} w={302} kind={0}/></P><P x={52+303*unroll} y={261} w={13} h={230} style={{background:'#F7E5BA',borderRadius:8,boxShadow:'-7px 0 8px #243C4050',opacity:1-E(t,.54,.16)}}/></P>
<P x={0} y={0} w={1012} h={792} style={{opacity:1-select,transform:`translateX(${340*select}px)`}}><P x={723} y={208} w={232} h={365} style={{transform:`perspective(700px) rotateY(${-82*(1-fold)}deg)`,transformOrigin:'0 50%',opacity:fold}}><TravelDesign x={0} y={0} w={230} kind={2}/></P></P>
<P x={0} y={0} w={1012} h={792} style={{transform:`perspective(1000px) rotateY(${76*(1-flip)}deg)`,transformOrigin:'55% 50%',opacity:flip}}><TravelDesign x={mix(417,330,select)} y={mix(177,140,select)} w={mix(260,435,select)} kind={1} route={route} rot={-4*(1-select)}/></P>
<Darwin t={t} x={8+106*E(t,.38,1.0)+65*S(t,1.28,.71)-150*select} y={456-50*S(t,1.28,.71)-53*select} s={286+63*select} rot={-8+10*select} gaze={1} think={1-route} cheer={select*.85} tool={select>.6?'none':'lens'}/>
<P x={302+365*S(t,2.68,.66)} y={504-55*S(t,2.68,.66)-74*Math.sin(S(t,2.68,.66)*Math.PI)} w={92} h={92} style={{opacity:E(t,2.66,.18),transform:`rotate(${-38+38*E(t,2.68,.66)}deg)`}}><Compass/></P>
<Check x={mix(647,697,select)} y={mix(467,648,select)} s={84} show={E(t,1.89,.28)}/>
</Habitat>}
export function ThirdLine({t}:{t:number}){const enter=E(t,0,.6),pull=S(t,.71,.92),write=S(t,1.73,.92);return <Habitat t={t} tone="museum" museum>
<Spread x={mix(456,255,enter)-25*S(t,1.89,.86)} y={mix(383,170,enter)-28*S(t,1.89,.86)} w={712} h={459}>
<P x={39} y={62} w={269} h={286} style={{transform:'rotate(-4deg)',border:'2px solid #AB9870',overflow:'hidden',opacity:.88}}><Coast route={E(t,.14,.78)} detail={1}/></P>
<P x={379} y={72} w={289} h={310}><T x={0} y={0} w={282} size={36} c="#3B5746" style={{fontFamily:'Fraunces'}}>1. Try three</T><T x={0} y={83} w={282} size={36} c="#3B5746" style={{fontFamily:'Fraunces',opacity:E(t,.28,.36)}}>2. Pick one</T><P x={-8} y={161} w={290} h={131} style={{background:'#31594A',borderRadius:4,overflow:'hidden'}}><T x={17} y={17} w={258} size={35} c="#F6DFAC" style={{fontFamily:'Fraunces'}}>3. Evolve<br/>the winner</T><P x={-303*pull} y={0} w={290} h={131} style={{background:'#B38355',border:'4px solid #8D6744'}}><svg viewBox="0 0 290 131"><path d="M35 58h29v37H35Z" fill="#E8C895" stroke="#795F43" strokeWidth="4"/><path d="M43 60V45a8 8 0 0 1 16 0v15" stroke="#795F43" strokeWidth="4" fill="none"/><path d="M102 68h142" stroke="#D1AE79" strokeWidth="5"/></svg></P></P></P>
</Spread>
<Darwin t={t} x={82+303*enter-303*pull} y={308+40*(1-enter)} s={309} gaze={1} think={1-write} cheer={E(t,1.76,.64)*.6} rot={-3*pulse(t,.71,.92)+write*4}/>
</Habitat>}
export function Variations({t}:{t:number}){const split=S(t,.05,1.12),select=S(t,2.22,.57);return <Habitat t={t} tone="forest">
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M535 647V315M535 416Q409 336 262 322M535 396Q643 323 821 320" fill="none" stroke="#334A3A" strokeWidth="24" pathLength="1" strokeDasharray={`${split} 1`}/><path d="M535 635V315M535 416Q409 336 262 322M535 396Q643 323 821 320" fill="none" stroke="#C4A371" strokeWidth="8" pathLength="1" strokeDasharray={`${split} 1`}/></svg>
{[1,2,3].map((up,i)=>{const p=S(t,.04+i*.17,1.05),f=S(t,1.02+i*.30,.57);return <P key={i} x={0} y={0} w={1012} h={792} style={{opacity:E(t,i*.17,.18),transform:`translate(${(1-p)*(510-(210+i*279))}px,${(1-p)*234-(i===1?65*select:-30*select)}px) rotate(${(i-1)*-9*(1-p)}deg)`}}><TravelDesign x={184+i*273} y={205+(i===1?18:0)} w={222} kind={1} route={1} upgrade={f>.05?up:0}/>{f>0&&<P x={211+i*273} y={489} w={120} h={120} style={{transform:`translateY(${65*(1-f)}px) scale(${.7+.3*f})`,opacity:f}}>{i===0?<Compass/>:i===1?<Boat/>:<svg viewBox="0 0 100 100"><path d="M75 8A45 45 0 1 0 90 78A43 43 0 0 1 75 8" fill="#E7C979" stroke="#7B7954" strokeWidth="3"/></svg>}</P>}{i===1&&<Check x={615} y={178} s={75} show={select}/>}</P>})}
<Clay t={t} x={-9+30*pulse(t,.02,.5)+75*E(t,1.25,.9)} y={432-20*pulse(t,2.22,.57)} s={282} role="wizard" rot={-7+13*pulse(t,.02,.5)+5*select} gaze={1} stern={1-select} cheer={select*.8}/>
</Habitat>}
export function Repeat({t}:{t:number}){const open=E(t,0,.62),compare=S(t,.18,.74),reject=E(t,.95,.38),better=S(t,1.26,1.19);return <Habitat t={t} tone="sunset">
<P x={458-157*open} y={190-28*open} w={222+450*open} h={302+181*open} style={{background:'#EEDBA9',border:'9px solid #BFA572',boxShadow:'0 13px 0 #294941',transform:`rotate(${-5+5*open}deg)`,overflow:'hidden'}}><Coast route={0}/>
<svg width="100%" height="100%" viewBox="0 0 650 471" style={{position:'absolute',inset:0}}>
<path d="M188 257C58 52 552 458 499 190S308 305 494 381" stroke="#9E543D" strokeWidth="9" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray={`${compare} 1`} opacity={1-reject*.83}/>
<g opacity={reject*(1-E(t,1.53,.38))}><circle cx="306" cy="216" r="29" fill="#F1DBAA"/><path d="M291 201l30 30m0-30-30 30" stroke="#A8523C" strokeWidth="8"/></g>
<path d="M188 257L499 190L494 381" stroke="#FFF1B9" strokeWidth="15" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray={`${better} 1`}/><path d="M188 257L499 190L494 381" stroke="#3C774F" strokeWidth="8" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray={`${better} 1`}/>
{[[188,257],[499,190],[494,381]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="15" fill="#B8603C" stroke="#FFF1C2" strokeWidth="5"/>{better>i*.34&&<path d={`M${x-8} ${y}l6 6 12-14`} fill="none" stroke="#FFEFBA" strokeWidth="4"/>}</g>)}
</svg>
{better>0&&<P x={122+311*Math.min(1,better*1.61)-5*Math.max(0,(better-.62)/.38)} y={184-67*Math.min(1,better*1.61)+191*Math.max(0,(better-.62)/.38)} w={145} h={101}><Boat/></P>}
</P>
<Darwin t={t} x={2+45*open+62*S(t,.48,.73)-34*reject} y={363-25*pulse(t,.95,.38)} s={319} rot={-7+13*open-7*pulse(t,.95,.38)} gaze={1} think={1-better} cheer={better*.7} tool="lens"/>
<Check x={837} y={580} s={82} show={E(t,2.31,.31)}/>
</Habitat>}
export const Tokens=OldTokens;
export function Draft({t}:{t:number}){const enter=E(t,0,.57),press=pulse(t,1.48,.43),color=S(t,1.79,1.02),phone=S(t,2.67,.64);return <Habitat t={t} tone="dawn">
<P x={302} y={203+108*(1-enter)} w={656} h={500} style={{transform:`rotate(${-4+4*enter}deg)`}}><TravelDesign x={0} y={0} w={652} kind={0} rough/><P x={0} y={0} w={656} h={500} style={{clipPath:`inset(0 ${100*(1-color)}% 0 0)`}}><TravelDesign x={0} y={0} w={652} kind={0}/></P>{color>0&&color<1&&<P x={652*color} y={0} w={5} h={488} style={{background:'#F9E4AC'}}/>}</P>
<TravelDesign x={777+260*(1-phone)} y={393} w={172} kind={1} route={1} upgrade={2}/>
<Clay t={t} x={-36+85*enter+64*S(t,.56,.76)-64*E(t,1.36,.32)+24*press} y={350-24*press-18*pulse(t,2.64,.64)} s={350} role="engineer" rot={-8+19*press+3*color} gaze={1} stern={1-color} cheer={color*.7} walk={t>.56&&t<1.34?1:0}/><Key x={296} y={528} s={110} label="↻" press={press} c="#E6BF6D"/>
</Habitat>}
export function CTA({t}:{t:number}){const show=E(t,0,.48);return <Habitat t={t} tone="forest"><BookCover x={626-152*show} y={360-199*show} w={348} h={493} title="WIN" bottom="" tilt={-15+18*show}/><Darwin t={t} x={38+34*show} y={326-20*pulse(t,.55,.42)} s={381} rot={-8+12*show} gaze={1} cheer={show*.8}/></Habitat>}
