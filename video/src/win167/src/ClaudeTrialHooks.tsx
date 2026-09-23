import React from 'react';
import {Img,staticFile} from 'remotion';
import {Darwin,quillTip} from './DarwinKit';
import {Mascot} from './SlopKit';
import {P,S,pulse,clamp} from './Kit';
import {Bolt,Impact,Puff} from './EnergyFX';
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const Svg=({children}:{children:React.ReactNode})=><svg width="1012" height="792" style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
function Mark({x,y,s=1,ok=false}:{x:number,y:number,s?:number,ok?:boolean}){return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r="37" fill={ok?'#387A68':'#B54E41'} stroke="#FFF1C9" strokeWidth="5"/>{ok?<path d="M-20 0l14 15 27-33" stroke="#FFF2CF" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>:<path d="M-13-13l26 26m0-26-26 26" stroke="#FFF2CF" strokeWidth="10" strokeLinecap="round"/>}</g>}
function Claude({t,x,y,s=250,squash=0,rot=0,cheer=0,shock=0,tint='#D77C59',badge=0}:{t:number,x:number,y:number,s?:number,squash?:number,rot?:number,cheer?:number,shock?:number,tint?:string,badge?:number}){return <P x={x} y={y} w={s} h={s} style={{transform:`rotate(${rot}deg) scale(${1+squash*.2},${1-squash*.28})`,transformOrigin:'50% 95%',filter:'drop-shadow(0 8px 0 #233B4944)'}}><Mascot size={s} lf={18+t*4} nodAmp={0} shock={shock} stern={.8*(1-cheer)*(1-shock)} cheer={cheer} gaze={2} tint={tint}/>{badge!==0&&<svg width={s} height={s} viewBox="0 0 200 200" style={{position:'absolute',inset:0}}><path d="M88 104l12 17 12-17-4 34H92Z" fill={badge>0?'#D2A547':'#723E44'}/><Mark x={100} y={135} s={.45} ok={badge>0}/></svg>}</P>}
function Lab({t,mode}:{t:number,mode:number}){return <><Svg><defs><linearGradient id={'lab'+mode} x2="0" y2="1"><stop stopColor={mode?'#EFDDC3':'#D4EBE3'}/><stop offset="1" stopColor={mode?'#C5B4C0':'#89AFB8'}/></linearGradient></defs><rect width="1012" height="792" fill={`url(#lab${mode})`}/><circle cx={mode?693:658} cy="300" r="236" fill={mode?'#FFF0D3':'#F1E9C9'}/><path d="M28 131V716M983 131V716M28 191H983" stroke={mode?'#8C7585':'#547B87'} strokeWidth="19"/><path d="M52 223H960V634H52Z" fill="none" stroke="#F7E8C5" strokeWidth="5"/><path d="M0 679L1012 654V792H0" fill={mode?'#473D56':'#234D60'}/><path d="M0 704L1012 678M0 755L1012 732M219 676l-78 116M511 668v124M808 660l79 132" fill="none" stroke={mode?'#8E788B':'#5E8A94'} strokeWidth="4"/>{[0,1,2].map(i=><g key={i} transform={`translate(${74+i*420} 233)`}><path d="M0 0h70v19H0M0 32h41v9H0" fill={mode?'#B59690':'#6D9F9D'}/><path d={`M${(t*55+i*19)%50} 60v31`} stroke="#F0C36A" strokeWidth="9"/></g>)}<path d="M0 750h137l27 42H0M1012 750H923l-20 42h109" fill={mode?'#322E42':'#173E50'}/></Svg><Img src={staticFile('claude_logo.png')} style={{position:'absolute',left:790,top:182,width:111,height:111,objectFit:'contain',opacity:.75}}/></>}
/** Same prompt -> failed candidates removed -> winner retained -> three descendants. */
export function ClaudeSelection({t}:{t:number}){
 const reject1=S(t,.3,.27),reject2=S(t,.66,.27),pick=S(t,.98,.24),grow=S(t,1.23,.55),split=S(t,2.03,.5),drive=S(t,2.63,.44);
 const dar={x:-42+35*S(t,0,.18)-29*S(t,.2,.25),y:230-15*pulse(t,.28,.32)-12*pulse(t,.66,.28),s:490,rot:-8+16*pulse(t,.06,.36)-9*pick+8*arc(t,2.62,.5),think:1-pick,cast:pick,cheer:grow*.75};
 const tip=quillTip(dar);const wx=778-328*grow+62*drive,ws=228+214*grow-79*split+29*drive,wy=709-ws*.94-98*arc(t,1.24,.57)-112*drive;
 return <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',transform:`scale(${1.018+.025*S(t,0,3)})`,transformOrigin:'55% 62%'}}><Lab t={t} mode={0}/>
 <Svg><path d="M434 186H725l36 38-36 38H434Z" fill="#FFF3D6" stroke="#496D76" strokeWidth="5"/><text x="593" y="235" textAnchor="middle" fill="#294A58" fontFamily="Inter" fontWeight="900" fontSize="34">ONE TASK</text><path d="M592 267v47M470 317H891M470 317v79M680 317v79M891 317v79" fill="none" stroke="#628D94" strokeWidth="8" strokeDasharray={`${20+20*S(t,0,.2)} 9`}/><path d="M373 710H994v24H373" fill="#CBAC75"/>{[470,680,891].map((x,i)=><g key={i}><ellipse cx={x} cy="708" rx="78" ry="15" fill="#163D4C66"/><path d={`M${x-55} 746h110`} stroke="#E1BD71" strokeWidth="8"/></g>)}</Svg>
 <Darwin t={t} {...dar} gaze={1} tool="quill"/>
 <Claude t={t} x={351-330*reject1} y={488+360*reject1-30*arc(t,0,.3)} s={229} rot={-10*arc(t,0,.3)-94*reject1} squash={pulse(t,.27,.2)} shock={reject1}/>
 <Claude t={t} x={565+400*reject2} y={488+260*reject2-28*arc(t,.24,.41)} s={229} rot={8*arc(t,.24,.41)+100*reject2} squash={pulse(t,.63,.2)} shock={reject2} tint="#B090B7"/>
 <Svg><g opacity={1-grow}><g opacity={1-S(t,.48,.35)}><Mark x={466} y={459-85*(1-S(t,.12,.18))} s={1.4*S(t,.1,.18)}/></g><g opacity={1-S(t,.86,.35)}><Mark x={684} y={459-85*(1-S(t,.49,.17))} s={1.4*S(t,.48,.17)}/></g></g><Bolt t={t} at={.99} from={tip} to={{x:873,y:536}} dur={.24}/><Impact t={t} at={.3} x={469} y={510}/><Impact t={t} at={.66} x={682} y={510}/></Svg>
 <Svg><path d={`M${wx+ws*.5} ${wy+ws*.55}Q400 399 ${442-164*split} 486M${wx+ws*.6} ${wy+ws*.55}Q780 390 ${717+178*split} 473`} fill="none" stroke="#E2B557" strokeWidth="13" opacity={split}/></Svg>
 <P x={278} y={478-64*arc(t,2.08,.5)-78*drive} w={210} h={210} style={{transform:`scale(${split}) rotate(${-12*drive}deg)`,transformOrigin:'85% 60%'}}><Claude t={t} x={0} y={0} s={210} badge={1} tint="#789CA7" cheer={.8}/></P>
 <P x={797+13*drive} y={479-75*arc(t,2.12,.5)-100*drive} w={210} h={210} style={{transform:`scale(${split}) rotate(${13*drive}deg)`,transformOrigin:'10% 60%'}}><Claude t={t} x={0} y={0} s={210} badge={1} tint="#AA87B5" cheer={.8}/></P>
 <Claude t={t} x={wx} y={wy} s={ws} rot={-11*arc(t,1.24,.57)-14*drive} squash={.8*pulse(t,.98,.25)+.7*pulse(t,1.77,.24)+.55*pulse(t,2.45,.23)} cheer={pick} tint={pick>.5?'#DAA14C':'#D77C59'} badge={pick>.5?1:0}/>
 <Svg><Impact t={t} at={1.78} x={659} y={710}/><Puff t={t} at={1.8} x={659} y={708} s={1.3}/><Impact t={t} at={2.08} x={376} y={586} s={.6}/><Impact t={t} at={2.16} x={901} y={582} s={.6}/><Puff t={t} at={2.66} x={668} y={710}/></Svg></P>
}
/** A rejected Claude version is physically shed; the successful core stays in the successor. */
export function ClaudeRewrite({t}:{t:number}){
 const strain=S(t,0,.25),crack=S(t,.3,.33),keep=S(t,.67,.28),breakout=S(t,1.04,.55),upgrade=S(t,1.54,.42),punch=S(t,2.13,.3),follow=S(t,2.49,.58);
 const dar={x:568-25*pulse(t,.42,.44),y:218-18*arc(t,.06,.48)+14*pulse(t,1.05,.3),s:480,think:1-keep,cast:keep*(1-breakout),cheer:upgrade*.85,rot:4-12*pulse(t,.25,.48)+10*breakout-8*follow};const raw=quillTip({...dar,rot:-dar.rot});const tip={x:dar.x+dar.s-(raw.x-dar.x),y:raw.y};
 const hs=487+47*upgrade+20*follow,hx=94+45*upgrade+42*follow,hy=715-hs*.94-86*arc(t,1.03,.56)-105*follow;
 const lean=7*strain-13*breakout+6*upgrade+15*follow;
 return <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',transform:`scale(${1.022+.025*S(t,0,3)})`,transformOrigin:'44% 63%'}}><Lab t={t} mode={1}/>
 <Svg><path d="M41 716H645V739H41Z" fill="#B79971"/><ellipse cx="353" cy="713" rx="232" ry="21" fill="#221F3766"/><g opacity={1-S(t,1.3,.2)}><path d="M131 164h282v67H131Z" fill="#FFF0D1" stroke="#8D6975" strokeWidth="5"/><text x="272" y="210" textAnchor="middle" fill="#7E4654" fontFamily="Inter" fontSize="34" fontWeight="900">FAILED DRAFT</text></g></Svg>
 <Darwin t={t} {...dar} flip={true} tool="quill" gaze={1} shock={.7*pulse(t,1.06,.35)}/>
 <Claude t={t} x={hx} y={hy} s={hs} rot={lean} squash={.85*pulse(t,.07,.5)+.55*pulse(t,1.55,.25)+.75*pulse(t,2.35,.23)} tint={breakout>.03?'#DCA04B':'#D77C59'} shock={1-keep} cheer={upgrade} badge={keep>.5?1:-1}/>
 {/* Exact canonical body halves form the rejected skin; the successful center stays intact. */}
 {[-1,1].map(side=><P key={side} x={hx+side*185*breakout} y={hy+110*breakout} w={hs} h={hs} style={{transform:`rotate(${lean+side*52*breakout}deg)`,transformOrigin:'50% 65%',opacity:1-S(t,1.58,.28)}}><div style={{position:'absolute',inset:0,clipPath:side<0?'inset(0 50% 0 0)':'inset(0 0 0 50%)'}}><Claude t={t} x={0} y={0} s={hs} tint="#B97970" shock={1} squash={.85*pulse(t,.07,.5)} badge={-1}/></div></P>)}
 <Svg><g opacity={crack*(1-breakout)}><path d={`M${hx+hs*.51} ${hy+hs*.19}l-25 41 26 40-23 39 18 49-17 42`} stroke="#713D4F" strokeWidth="10" fill="none"/></g>
 <Bolt t={t} at={.69} from={tip} to={{x:hx+hs*.50,y:hy+hs*.675}} dur={.26}/>
 <g opacity={keep*(1-breakout)}><Mark x={hx+hs*.5} y={hy+hs*.675} s={1.08} ok={true}/></g><Impact t={t} at={.73} x={hx+hs*.5} y={hy+hs*.675} s={.65}/>
 <g opacity={S(t,1.65,.15)}><path d="M128 174h360v76H128Z" fill="#FFF0C9" stroke="#3F766A" strokeWidth="6"/><text x="308" y="226" textAnchor="middle" fill="#2B695C" fontFamily="Inter" fontSize="37" fontWeight="900">KEEP WHAT WORKS</text></g>
 <g opacity={upgrade*(1-follow)} transform={`translate(${95-160*punch} ${432-84*punch}) rotate(${-74*punch})`}><path d="M-61-61H57V59H-61Z" fill="#C28183" stroke="#663D51" strokeWidth="7"/><Mark x={0} y={0} s={.9}/></g>
 <Bolt t={t} at={2.15} from={{x:hx+hs*.10,y:hy+hs*.49}} to={{x:85,y:432}} dur={.2}/><Impact t={t} at={1.1} x={350} y={462} s={1.2}/><Puff t={t} at={1.59} x={384} y={719} s={1.5}/><Impact t={t} at={2.17} x={82} y={432}/><Puff t={t} at={2.54} x={400} y={720}/>
 </Svg></P>
}
