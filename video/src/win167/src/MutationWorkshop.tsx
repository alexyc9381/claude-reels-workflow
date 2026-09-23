import React from 'react';
import {Img,staticFile} from 'remotion';
import {P,S,pulse,clamp} from './Kit';
import {Darwin} from './DarwinKit';
import {Sprite} from './EvolutionActionScenes';
import {Bolt,Impact,Charge,Puff} from './EnergyFX';
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const style:React.CSSProperties={position:'absolute',inset:0,pointerEvents:'none'};
// Each descendant inherits the boots, receives a distinct upgrade, then uses it.
// Consequences overlap: blue carves a ramp, purple catches the lift, orange breaks free.
export function MutationWorkshop({t}:{t:number}){
 const strike=pulse(t,.22,.25)+pulse(t,.50,.25)+pulse(t,.78,.25);
 const railBreak=S(t,2.10,.18),d={x:-29,y:182+9*strike,s:222,think:1-S(t,.8,.3),cheer:S(t,.8,.3)*.8,rot:-9*strike};
 return <P w={1012} h={792} style={{overflow:'hidden',background:'#112233'}}>
 <svg width="1012" height="792" style={style}>
 <path d="M0 156H1012V792H0Z" fill="#203E50"/>
 {[100,390,680,970].map(x=><path key={x} d={`M${x} 166V694`} stroke="#315A68" strokeWidth="18"/>)}
 <path d="M0 691L1012 650V792H0Z" fill="#0B1B2A"/>
 {[0,180,420,710,1012].map(x=><path key={x} d={`M506 645L${x} 792`} stroke="#34616A" strokeWidth="5"/>)}
 <path d="M205 303H899M244 303V344M506 303V344M768 303V344" stroke="#AA8759" strokeWidth="13" fill="none"/>
 <path d="M244 301H768M329 274V301" stroke="#E1BB70" strokeWidth="5" fill="none"/>
 <path d="M85 661H962V690H85Z" fill="#9B7259" stroke="#E2BA78" strokeWidth="8"/>
 {[0,1,2].map(i=><g key={i}><path d={`M${132+i*268} 673v64h204v-64`} fill="#254854" stroke="#52757B" strokeWidth="7"/><path d={`M${160+i*268} 707h143`} stroke={['#61BCE2','#C29BDD','#F1A56B'][i]} strokeWidth="8"/></g>)}
 <path d={`M135 661L${350+25*S(t,1.03,.30)} ${661-67*S(t,1.03,.30)}`} stroke="#E9D6A5" strokeWidth="17"/>
 <path d={`M699 661L${795-35*railBreak} ${661+78*railBreak}M795 661L${943+44*railBreak} ${661+91*railBreak}`} stroke="#C39D68" strokeWidth="12"/>
 </svg>
 <P x={269} y={156} w={120} h={120} style={{background:'#FFF2D5',border:'6px solid #D4AD65',borderRadius:27,boxSizing:'border-box',transform:`scale(${1+.13*strike}) rotate(${-6*strike}deg)`}}><Img src={staticFile('claude_logo.png')} style={{width:'100%',height:'100%',padding:16,boxSizing:'border-box'}}/></P>
 <Darwin t={t} {...d} tool="quill"/>
 {[0,1,2].map(i=>{
 const at=.22+i*.28,change=S(t,at,.18),land=pulse(t,.04+i*.07,.26),gear=S(t,at-.08,.20),recoil=pulse(t,at,.28);
 const ski=S(t,1.02,.32),skiRun=clamp((t-1.38)/1.49),wing=arc(t,1.15,.9),wingFly=Math.pow(clamp((t-2.00)/.87),1.2),stutter=pulse(t,1.45,.27),launch=Math.pow(clamp((t-2.08)/.79),1.35);
 const x=117+i*268+(i===0?48*ski-160*skiRun*skiRun:i===1?10*wing+20*wingFly:-20*stutter+38*launch);
 const y=402-65*(1-S(t,0,.20+i*.04))+10*land-22*recoil+(i===0?-40*ski-28*skiRun:i===1?-137*wing-115*wingFly:24*stutter-192*launch);
 return <React.Fragment key={i}>
 <svg width="1012" height="792" style={style}><g transform={`translate(${244+i*268} ${270+45*gear-97*S(t,at+.19,.21)})`}><path d="M-10-54H10V33H-10Z" fill="#9BB6AD" stroke="#152F40" strokeWidth="5"/><path d="M-46 33H46V61H-46Z" fill={['#60A6C4','#AD83C5','#D78657'][i]} stroke="#142B3B" strokeWidth="6"/><path d="M-44 60l-16 29M44 60l16 29" stroke="#E6C17E" strokeWidth="9"/></g>
 <Charge t={t} at={at-.15} dur={.15} x={329} y={215} s={.7}/>
 <Bolt t={t} at={at} dur={.22} from={{x:329,y:278}} to={{x:x+122,y:y+106}} seed={i+7} color={['#89D7F0','#DAB6F3','#FFD18C'][i]}/>
 {i===2&&t>1.44&&<path d={`M${x+35} ${y+204}l-14 ${25+75*stutter+130*launch} 32-28 14 23 13-${26+103*launch}M${x+204} ${y+204}l-12 ${31+68*stutter+141*launch} 26-23 16 22 13-${32+105*launch}`} fill="#F4B34F" stroke="#DF734D" strokeWidth="4"/>}
 </svg>
 <Sprite t={t} x={x} y={y} s={246} role={change<.5?4:i} tint={change<.5?'#65A38D':['#60A6C4','#AD83C5','#D78657'][i]} boots={1} gear={i+1} gearAttach={gear} squash={land*.75+recoil*.85+stutter*(i===2?.8:0)} shock={recoil} cheer={change*.85} rot={-8*recoil+(i===0?-15*ski+9*skiRun:i===1?-19*wing+14*wingFly:-10*stutter+12*launch)}/>
 <svg width="1012" height="792" style={style}>
 <Impact t={t} at={at+.04} x={x+123} y={y+126} s={.9}/>
 {i===0&&t>1.02&&<><path d={`M${x+13} ${y+255}l-54 ${10+27*skiRun}M${x+46} ${y+272}l-69 17`} stroke="#D2E7D7" strokeWidth="8" strokeLinecap="round"/><Puff t={t} at={1.02} x={330} y={646} s={.7}/></>}
 {i===1&&t>1.15&&<path d={`M${x+12} ${y+42}q-85 32-89 101M${x+193} ${y+12}q57 10 61 55`} stroke="#CAA5DF" strokeWidth="7" fill="none"/>}
 {i===2&&<><Impact t={t} at={1.45} x={x+120} y={655} s={.8}/><Impact t={t} at={2.10} x={x+120} y={661} s={1.5}/><Puff t={t} at={2.10} x={x+110} y={665} s={1.4}/></>}
 </svg>
 </React.Fragment>;
 })}
 </P>
}
