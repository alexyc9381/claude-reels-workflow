import React from 'react';
import {P,T,E,S,pulse,ring,mix,C,Key,Check,Mark,Burst} from './Kit';
import {Darwin,Habitat,Finch} from './DarwinKit';
import {Trip,Feature,FeatureDraft,Cross} from './ClearKit';
import * as Previous from './DarwinScenes';
export {Boris} from './BorisLarge';

export function Hook({t}:{t:number}){const press=pulse(t,-.08,.4),choose=E(t,.09,.43),hero=E(t,.35,.67),route=E(t,1.27,.68);return <div style={{position:'absolute',inset:0,transform:`scale(${1+.022*E(t,0,.48)})`,transformOrigin:'52% 50%'}}><Habitat t={0} tone="dawn">
{[0,2].map(v=><P key={v} x={0} y={0} w={1012} h={792} style={{opacity:1-E(t,.64,.31)}}><Trip x={189+v*249+(v===0?-1:1)*choose*185} y={231+34*pulse(t,-.23,.43)+choose*51} w={285} days={v===0?1:2} label={v===0?'A':'C'} rot={(v===0?-1:1)*(6+choose*19)} dim={choose*.3}/><Cross x={282+v*249+(v===0?-1:1)*choose*185} y={329+choose*51} s={88} p={choose}/></P>)}
<Trip x={mix(436,357,hero)+67*Math.sin(hero*Math.PI)} y={mix(184,204,hero)-50*Math.sin(hero*Math.PI)} w={mix(302,610,hero)} days={3} route={route} label={hero>.7?'WINNER':'B'} selected={choose>.5} rot={-4*(1-hero)+ring(t,1.05,1.7)}/>
<Darwin t={t} x={14+39*press+28*hero} y={354-21*press-20*pulse(t,1.47,.6)} s={367} rot={-9+17*press+5*hero} gaze={1} think={1-hero} shock={hero>.2&&hero<.85?.6:0} cheer={route*.7}/>
<Key x={324} y={522} s={116} label="TEST" press={press} c="#E8BF66"/>
<Check x={847} y={602} s={80} show={E(t,1.79,.3)}/><Burst t={t} at={1.85} x={882} y={635} n={6}/>
</Habitat></div>}
export function Build({t}:{t:number}){const land=E(t,0,.7),make=E(t,.67,1.06);return <Habitat t={0} tone="forest">
<Trip x={357-18*land-38*E(t,1.5,.72)} y={204+52*land-34*E(t,1.5,.72)} w={610+12*land+34*E(t,1.5,.72)} days={3} route={1} budget={make} label="APP" selected/>
<P x={42} y={167} w={354} h={157} style={{background:'#F6E7BE',border:'7px solid #355849',borderRadius:18,transform:`translateY(${-38*(1-land)}px)`}}><T x={22} y={25} w={318} size={37} c="#2D5246">BUILD A<br/>TRIP PLANNER</T></P>
<Darwin t={t} x={13+35*land} y={349-23*pulse(t,.72,.45)} s={335} rot={-7+15*pulse(t,.7,.55)} gaze={1} think={1-make} cheer={make}/>
<Key x={287} y={527} s={116} press={pulse(t,.7,.4)} c="#F6E7BE"/><Check x={849} y={232} s={80} show={make}/>
</Habitat>}
export const Reveal=Previous.Reveal;
export function Chat({t}:{t:number}){const stop=E(t,.65,.43);return <Habitat t={0} tone="sunset" museum><P x={304} y={179} w={650} h={402} style={{background:'#F0DCB4',border:'9px solid #3C453D',borderRadius:21,boxShadow:'0 15px 0 #223934'}}>
{['TRY AGAIN','CHANGE IT','TRY AGAIN'].map((text,i)=><P key={i} x={24+(i%2)*173} y={28+i*113} w={406} h={87} style={{background:i%2?'#A8C5AD':'#D5B682',borderRadius:19,transform:`translateX(${(i%2?-1:1)*90*(1-E(t,-.08+i*.18,.4))}px)`}}><T x={21} y={23} w={370} size={37} c="#355549">{text}</T></P>)}<P x={0} y={0} w={650} h={402} style={{opacity:stop,background:'#F0DCB4C0',borderRadius:14}}><Cross x={243} y={113} s={165}/></P></P>
<Darwin t={t} x={11+81*stop} y={352} s={354} rot={-11+22*stop} gaze={1} think={1-stop} shock={.7*stop}/><Key x={315} y={566} s={132} label="STOP" press={pulse(t,.67,.45)} c="#E2B15B"/>
</Habitat>}
export function Test({t}:{t:number}){const choose=E(t,2.03,.72),hero=E(t,2.33,.69);return <Habitat t={0} tone="island">
<P x={244} y={155} w={558} h={62} style={{background:'#F0DCAA',border:'5px solid #365A4C',borderRadius:10}}><T x={12} y={10} w={529} size={34} c="#31574A" style={{textAlign:'center'}}>TASK: PLAN ALL 3 DAYS</T></P>
{[0,2].map(v=>{const p=E(t,.02+v*.18,.52),score=E(t,.69+v*.36,.46);return <P key={v} x={0} y={0} w={1012} h={792} style={{opacity:1-hero*.8}}><Trip x={63+v*302+(v===0?-1:1)*choose*148} y={310+45*(1-p)+choose*50} w={278} days={v===0?1:2} label={v===0?'A':'C'} rot={(v-1)*choose*11} dim={choose*.3}/><P x={78+v*302+(v===0?-1:1)*choose*148} y={234+choose*50+29*(1-score)} w={241} h={68} style={{background:"#8D4935",border:"4px solid #E0B67B",borderRadius:12,opacity:score}}><T x={0} y={8} w={234} size={43} style={{textAlign:"center"}}>{v===0?"1 OF 3":"2 OF 3"}</T></P><Cross x={259+v*302+(v===0?-1:1)*choose*148} y={243+choose*50} s={64} p={score}/></P>})}
<Trip x={mix(365,330,hero)} y={mix(310,226,hero)} w={mix(278,620,hero)} days={3} label={hero>.5?'WINNER':'B'} selected={choose>.05} route={E(t,2.78,.48)}/>
<P x={379} y={234+29*(1-E(t,1.04,.48))} w={241} h={68} style={{background:"#306349",border:"4px solid #E1BC64",borderRadius:12,opacity:E(t,1.04,.48)*(1-hero)}}><T x={0} y={8} w={234} size={43} style={{textAlign:"center"}}>3 OF 3 ✓</T></P>
<Darwin t={t} x={8+104*S(t,.06,1.77)-94*choose} y={457-81*choose} s={300+20*choose} rot={-8+13*choose} gaze={1} think={1-choose} cheer={hero*.8} tool={t<2?'lens':'none'}/>
<Check x={851} y={599} s={77} show={hero}/>
</Habitat>}
export const ThirdLine=Previous.ThirdLine;
export function Variations({t}:{t:number}){const split=E(t,.03,1.18),select=E(t,2.32,.48);return <Habitat t={0} tone="forest">
<Darwin t={t} x={16+32*pulse(t,-.02,.43)} y={173} s={272} gaze={1} think={1-split} cheer={select} rot={-7+13*pulse(t,-.02,.43)-5*select}/>
<Key x={250} y={307} s={108} label={t<2.3?'COPY':'KEEP'} press={pulse(t,-.02,.43)+pulse(t,2.32,.45)} c="#EBC674"/>
<Trip x={403} y={157} w={284} days={3} selected label="WINNER"/>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M546 377V390M217 431V390H824V431M521 390V431" fill="none" stroke="#E7C47C" strokeWidth="13" pathLength="1" strokeDasharray={`${split} 1`}/></svg>
{['map','budget','times'].map((kind,i)=>{const p=E(t,.06+i*.18,.93),feature=E(t,.98+i*.34,.53);return <P key={kind} x={0} y={0} w={1012} h={792} style={{transform:`translate(${(1-p)*(403-(69+i*306))}px,${-252*(1-p)-(i===0?32*select:0)}px)`,opacity:E(t,.03+i*.18,.2)}}><FeatureDraft x={69+i*306} y={405} w={280} kind={kind} appear={feature} selected={i===0&&select>.1}/>{i===0&&<Check x={274} y={377} s={65} show={select}/>}</P>})}
</Habitat>}
export function Repeat({t}:{t:number}){const open=E(t,0,.87),budgetFly=E(t,1.03,.65),budget=E(t,1.54,.35),timesFly=E(t,1.89,.58),times=E(t,2.32,.28);return <Habitat t={0} tone="sunset">
<Darwin t={t} x={8+29*open} y={354-23*pulse(t,1.4,.54)} s={337} gaze={1} think={1-times} cheer={times*.8} rot={-7+12*open}/>
{t<.78&&<P x={0} y={0} w={1012} h={792} style={{opacity:1-E(t,.45,.3)}}>{['map','budget','times'].map((kind,i)=><P key={kind} x={i===0?245*open:(i-1)*open*240} y={i===0?-130*open:open*145} w={1012} h={792} style={{opacity:i===0?1:1-open}}><FeatureDraft x={69+i*306} y={373+(i?32:0)} w={280} kind={kind} selected={i===0}/></P>)}</P>}
<P x={0} y={0} w={1012} h={792} style={{opacity:E(t,.35,.36)}}><Trip x={357-75*(1-open)} y={247+34*(1-open)} w={587-222*(1-open)} days={3} route={1} budget={budget} times={times} selected label="WINNER"/></P>
<P x={387} y={155} w={523} h={67} style={{background:'#F1DCA6',border:'6px solid #3B5746',borderRadius:13}}><T x={10} y={10} w={495} size={34} c="#395A48" style={{textAlign:'center'}}>{t<1.03?'KEEP THE MAP VERSION':t<1.89?'ROUND 2: ADD BUDGET':'ROUND 3: ADD TIMES'}</T></P>
{t>=1.03&&t<1.8&&<P x={194+324*budgetFly} y={446+137*budgetFly-77*Math.sin(budgetFly*Math.PI)} w={270-40*budgetFly} h={188-27*budgetFly} style={{transform:`rotate(${-12*(1-budgetFly)}deg)`,opacity:1-E(t,1.58,.21)}}><Feature kind="budget"/></P>}
{t>=1.89&&t<2.58&&<P x={202+480*timesFly} y={396-62*timesFly-93*Math.sin(timesFly*Math.PI)} w={250-45*timesFly} h={174-31*timesFly} style={{transform:`rotate(${-13*(1-timesFly)}deg)`,opacity:1-E(t,2.37,.2)}}><Feature kind="times"/></P>}
</Habitat>}
export function Tokens({t}:{t:number}){return <Previous.Tokens t={t}/>}
export function Draft({t}:{t:number}){const built=E(t,.1,.65),press=pulse(t,1.48,.45),evolve=E(t,1.75,.65),map=E(t,2.12,.69),budget=E(t,2.57,.52);return <Habitat t={0} tone="dawn">
<P x={394} y={158} w={490} h={68} style={{background:'#F4DDA5',border:'6px solid #3B5746',borderRadius:12}}><T x={10} y={11} w={458} size={40} c="#365746" style={{textAlign:'center'}}>{t<1.48?'FIRST DRAFT':t<2.45?'EVOLVING…':'EVOLVED RESULT'}</T></P>
<Trip x={376-20*evolve} y={277-32*evolve+113*(1-built)-25*E(t,2.76,.57)} w={548+36*evolve} days={t<.42?0:t<1.87?1:t<2.15?2:3} route={map} budget={budget} selected={evolve>.6} label={evolve>.6?'WINNER':'DRAFT'}/>
<Darwin t={t} x={12+39*built+25*press+65*E(t,.6,.82)-65*E(t,1.42,.44)} y={362-24*press} s={355} gaze={1} rot={-8+18*press} think={1-evolve} cheer={budget*.8}/><Key x={310} y={540} s={131} label="LOOP" press={press} c={evolve>.2?'#EAC469':'#F4E7C3'}/>
<Check x={842} y={642} s={78} show={budget}/>
</Habitat>}
export const CTA=Previous.CTA;
