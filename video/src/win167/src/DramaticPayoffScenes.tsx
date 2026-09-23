import React from 'react';
import {P,S,E,pulse,clamp} from './Kit';
import {Darwin,quillTip} from './DarwinKit';
import {Sprite} from './EvolutionActionScenes';
import {Bolt,Impact,Puff} from './EnergyFX';

const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const svgStyle:React.CSSProperties={position:'absolute',inset:0,pointerEvents:'none'};
function Coin({x,y,r=27,rot=0,burn=0}:{x:number,y:number,r?:number,rot?:number,burn?:number}){return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={1-burn}><ellipse rx={r} ry={r*.82} fill="#E3AC48" stroke="#6C472C" strokeWidth="5"/><ellipse rx={r*.74} ry={r*.57} fill="#F6D578" stroke="#B7772F" strokeWidth="3"/><path d={`M0 ${-r*.39}v${r*.78}M${-r*.22} ${-r*.22}h${r*.44}`} stroke="#AD6C2D" strokeWidth="5" strokeLinecap="round"/></g>}

/** The visible resource disappears into fire; no growth/reward metaphor can obscure the cost. */
export function Tokens({t}:{t:number}){
 const empty=S(t,.16,.91),jaw=pulse(t,.19,.77),last=S(t,.88,.2),catchMiss=pulse(t,.88,.24);
 const shake=3*pulse(t,.38,.7)*Math.sin(t*74),flame=1+.10*Math.sin(t*36)+.28*pulse(t,.47,.5);
 return <P w={1012} h={792} style={{overflow:'hidden',background:'#293643'}}>
  <svg width="1012" height="792" style={svgStyle}>
   <path d="M0 168H1012V792H0Z" fill="#354049"/><path d="M0 191H1012M0 641H1012" stroke="#1A2A34" strokeWidth="30"/>
   <path d="M845 172V284M923 172V304" stroke="#182B34" strokeWidth="55"/><path d="M845 172V277M923 172V302" stroke="#6D7779" strokeWidth="19"/>
   <path d="M0 675H1012V792H0Z" fill="#142A34"/><path d="M0 682H1012" stroke="#B0976B" strokeWidth="12"/>
   <path d="M99 468H535L593 529H137Z" fill="#8B9690" stroke="#182D37" strokeWidth="9"/><path d="M136 524H592V553H136Z" fill="#495C63"/><path d="M155 553V674M535 552V674" stroke="#142934" strokeWidth="22"/>
   <path d="M549 453L666 386V448L583 520Z" fill="#BC9C61" stroke="#1A2B35" strokeWidth="9"/>
   <g transform={`translate(${shake} 0)`}>
    <path d="M640 303Q778 231 927 305V630H640Z" fill="#766F67" stroke="#152A34" strokeWidth="12"/>
    <path d="M658 300Q790 260 914 308" stroke="#B9A680" strokeWidth="15" fill="none"/>
    <path d={`M669 ${348-15*jaw}H909V${567+20*jaw}H669Z`} fill="#170F16" stroke="#3C3B3E" strokeWidth="16"/>
    <g transform={`translate(788 558) scale(1 ${flame})`}>
     <path d="M-98 0Q-112-60-68-111Q-77-38-28-143Q-18-70 7-184Q69-116 36-66Q70-110 78-132Q126-49 92 0Z" fill="#C65836"/>
     <path d="M-63 0Q-76-47-35-81Q-50-25 1-130Q50-82 23-41Q57-75 67-79Q92-21 60 0Z" fill="#F2AF45"/>
     <path d="M-25 0Q-44-25-2-77Q7-28 35-45Q54-15 25 0Z" fill="#FFE3A0"/>
    </g>
    {[686,735,784,833,882].map(x=><path key={x} d={`M${x} ${341-15*jaw}v38l16 18 16-18v-38Z`} fill="#C6BAA0" stroke="#38444A" strokeWidth="4"/>)}
    <path d="M634 600H937V629H634Z" fill="#B79A64" stroke="#1E3038" strokeWidth="7"/>
    <path d="M678 629v44M889 629v44" stroke="#7A7E72" strokeWidth="26"/>
   </g>
   {Array.from({length:24},(_,i)=>{const start=.14+i*.027,q=S(t,start,.25),bx=181+(i%6)*58,by=440-Math.floor(i/6)*31;return <Coin key={i} x={bx+(780-bx)*q} y={by+(438-by)*q-57*Math.sin(q*Math.PI)} r={28} rot={q*(110+i*17)} burn={S(q,.76,.24)}/>})}
   <Coin x={462+322*last-28*catchMiss} y={425+23*last-76*arc(t,.85,.23)} r={31} rot={last*290} burn={S(last,.65,.35)}/>
   {Array.from({length:14},(_,i)=>{const q=S(t,.34+i*.038,.44);return <path key={i} d="M-6-4h12l4 8H-5Z" fill={i%2?'#B8AAA0':'#E4B673'} opacity={q>0?1-S(q,.74,.26):0} transform={`translate(${770+(i%5-2)*33*q} ${569+71*q}) rotate(${i*28+q*200})`}/>})}
   <path d="M662 681Q748 644 856 681Z" fill="#9C9690" opacity={E(t,.88,.3)}/>
  </svg>
  <P x={172} y={186} w={379} h={98} style={{background:'#132730',border:'7px solid #B89A64',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',gap:18,fontFamily:'Inter',color:'#F8E1A5'}}><span style={{fontSize:23,fontWeight:800}}>TOKENS</span><span style={{fontSize:65,fontWeight:900,fontVariantNumeric:'tabular-nums',color:empty>.75?'#F39679':'#F8E1A5'}}>{Math.max(0,Math.round((1000*(1-empty))/10)*10)}</span></P>
  <P x={181} y={301} w={363} h={17} style={{background:'#142A33',borderRadius:8,overflow:'hidden'}}><div style={{width:`${100*(1-empty)}%`,height:'100%',background:empty>.72?'#D76547':'#ECC466'}}/></P>
  <Sprite t={t} x={174+67*catchMiss} y={476-15*catchMiss} s={219} role={3} tint="#A4B3AE" rot={8+17*catchMiss} shock={.6+.4*empty} cheer={catchMiss*.85}/>
  <svg width="1012" height="792" style={svgStyle}><Impact t={t} at={1.04} x={788} y={480} s={1.15} color="#F7C77A"/><Puff t={t} at={1.08} x={760} y={644} color="#A9A49C" s={1.3}/></svg>
 </P>
}

/** Draft becomes a chrysalis: two withheld breakouts, then a larger evolved body sheds its old skin. */
export function Draft({t}:{t:number}){
 const cast=pulse(t,.20,.47),wrap=S(t,.30,.6),seal=S(t,.75,.23),feint1=pulse(t,1.02,.35),feint2=pulse(t,1.43,.46),burst=E(t,2.13,.38),grow=S(t,2.13,.49),land=pulse(t,2.63,.3),resolve=S(t,2.96,.4);
 const pressure=feint1*.08+feint2*.15,shake=(feint1*3+feint2*7)*Math.sin(t*72),size=220+178*grow;
 const heroX=655-size*.5,heroY=649-size*1.04-42*arc(t,2.13,.52)+12*land;
 const darwin={x:45,y:327,s:347,rot:-4+12*cast-5*feint2+6*land,think:1-grow,cheer:grow*.85,cast};
 const tip=quillTip(darwin);
 return <P w={1012} h={792} style={{overflow:'hidden',background:'#242A3E'}}>
  <svg width="1012" height="792" style={svgStyle}>
   <path d="M0 155H1012V792H0Z" fill="#34364D"/><circle cx="729" cy="343" r="204" fill="#615663"/><circle cx="729" cy="343" r="166" fill="#9D8580"/><path d="M571 225Q678 136 823 211" stroke="#D4BBA1" strokeWidth="15" fill="none"/>
   <path d="M59 188L13 688M954 165l43 534M53 186Q260 218 410 168" stroke="#1B293A" strokeWidth="35" fill="none"/>
   <path d="M64 199q89 51 138 44M950 177q-86 94-173 100" stroke="#59645D" strokeWidth="18" fill="none"/>
   {[0,1,2].map(i=><g key={i} transform={`translate(${71+i*52} ${290+i*86}) rotate(${-28+i*17})`}><path d="M0 0Q76-58 121-22Q71 26 0 0" fill="#4B655C"/><path d="M0 0l99-21" stroke="#829180" strokeWidth="4"/></g>)}
   <path d="M0 670Q271 610 515 660Q747 599 1012 651V792H0Z" fill="#182D39"/><path d="M27 679Q305 628 484 675" stroke="#708578" strokeWidth="9" fill="none"/>
   <path d="M410 641L849 632 888 680H373Z" fill="#9DAB93" stroke="#253A41" strokeWidth="9"/><path d="M375 679H888V727H375Z" fill="#516D67"/><path d="M412 695H839" stroke="#C9C9A8" strokeWidth="8"/>
   <ellipse cx="659" cy="653" rx={102+91*grow} ry={20+8*land} fill="#0A23315C"/>
  </svg>
  <Darwin t={t} {...darwin} tool="quill" gaze={1} shock={feint2*.7}/>
  <P x={0} y={0} w={1012} h={792} style={{opacity:1-seal}}><Sprite t={t} x={548} y={433} s={220} role={3} tint="#D9C9A5" shock={wrap*.8}/><svg width="1012" height="792" style={svgStyle}><path d="M603 547l109-7 9 61-44-6-67 15Z" fill="#F0DDB6" stroke="#8D765D" strokeWidth="5"/><path d="M622 555l7 40M644 552l7 40M672 550l7 37M694 552l5 32" stroke="#B9A17C" strokeWidth="4"/></svg></P>
  {t>2.13&&<Sprite t={t} x={heroX} y={heroY} s={size} role={2} tint="#D99856" boots={1} gear={3} cheer={grow*.9} squash={land*.9} rot={-6*(1-grow)+2*resolve}/>}
  <svg width="1012" height="792" style={svgStyle}>
   <g transform={`translate(${655+shake} 469) scale(${(1+pressure)*(0.67+.33*wrap)} ${1-pressure*.6})`} opacity={wrap}>
    {/* A wrapped fist and heel deform opposite sides: separate attempts to escape, not a global wobble. */}
    {feint1>.001&&<g><path d={`M92-151L${139+108*feint1}-151V-134H${159+108*feint1}V-82H${139+108*feint1}V-67H94Z`} fill="#D3C191" stroke="#384D48" strokeWidth="8" strokeLinejoin="round"/><path d={`M${130+93*feint1}-145V-76M${146+101*feint1}-125V-90`} stroke="#F2DFAB" strokeWidth="10"/><path d={`M103-124H${143+108*feint1}M105-101H${143+108*feint1}`} stroke="#919876" strokeWidth="8"/></g>}
    {feint2>.001&&<g><path d={`M-92 39L${-131-92*feint2} 39V75H${-150-92*feint2}V126H${-107-92*feint2}L-81 118Z`} fill="#C3B385" stroke="#384D48" strokeWidth="8" strokeLinejoin="round"/><path d={`M${-147-90*feint2} 108H-89M${-125-92*feint2} 49V89`} stroke="#E2D6AC" strokeWidth="12"/><path d={`M${-118-91*feint2} 43V105`} stroke="#8C9574" strokeWidth="9"/></g>}
    <g transform={`translate(${-burst*210} ${burst*215}) rotate(${-burst*55} 0 185)`} opacity={1-burst*.5}><path d="M0-218C-182-178-169 144-85 182Q-48 206 2 184L-19 139 12 97-25 46 6 9-20-40 7-91-11-155Z" fill="#C3B385" stroke="#384D48" strokeWidth="8"/>{[-150,-95,-40,15,70,125].map((y,i)=><path key={y} d={`M${-106-(i%3)*17} ${y}Q-70 ${y+21} ${i%2?-10:5} ${y+24}`} fill="none" stroke="#8C9574" strokeWidth="12"/>)}<path d="M-87-151Q-134-81-114 71" fill="none" stroke="#E2D6AC" strokeWidth="17"/></g>
    <g transform={`translate(${burst*231} ${burst*195}) rotate(${burst*61} 0 185)`} opacity={1-burst*.5}><path d="M0-218C174-192 175 118 97 176Q55 211 2 184L-19 139 12 97-25 46 6 9-20-40 7-91-11-155Z" fill="#D3C191" stroke="#384D48" strokeWidth="8"/>{[-151,-96,-41,14,69,124].map((y,i)=><path key={y} d={`M${i%2?-10:5} ${y+24}Q75 ${y+20} ${101+i%3*18} ${y-5}`} fill="none" stroke="#919876" strokeWidth="12"/>)}<path d="M74-159Q131-101 121-27" fill="none" stroke="#F2DFAB" strokeWidth="12"/></g>
    <g opacity={S(t,1.49,.13)*(1-burst)} transform={`translate(-119 64) rotate(${-39*S(t,1.49,.22)-15*feint2})`}><path d="M0-39L42-16 8 17 24 58-19 41-27 8Z" fill="#EFDBA6" stroke="#3C514A" strokeWidth="7"/><path d="M1-25L-8 33" stroke="#B19E71" strokeWidth="7"/></g>
    <path d="M-20-96l25 32-25 25 31 47-34 38 24 32" stroke="#233E43" strokeWidth={3+5*feint2} fill="none" opacity={S(t,1.46,.22)*(1-burst)}/>
   </g>
   {Array.from({length:7},(_,i)=>{const q=S(t,.30+i*.05,.38),y=277+i*53;return <path key={i} d={`M${tip.x} ${tip.y}Q${418+40*Math.sin(i)} ${y-64} ${508+287*q} ${y}`} fill="none" stroke={i%2?'#DCC795':'#A8B08A'} strokeWidth="13" strokeDasharray="900" strokeDashoffset={900*(1-q)} opacity={pulse(t,.30+i*.05,.48)}/>})}
   <Bolt t={t} at={.29} from={tip} to={{x:617,y:472}} dur={.21} color="#D8C288"/>
   <Impact t={t} at={1.18} x={925} y={369} s={.85}/><Impact t={t} at={1.63} x={389} y={568} s={.95}/>
   {Array.from({length:10},(_,i)=>{const q=E(t,2.13,.65),a=i*2.399;return <g key={i} opacity={t>2.13?1-S(q,.8,.2):0} transform={`translate(${655+Math.cos(a)*(90+145*q)} ${475+Math.sin(a)*(80+150*q)+160*q*q}) rotate(${i*31+q*(i%2?130:-140)})`}><path d="M-21-13l38-8 9 33-39 4Z" fill={i%2?'#DACC9F':'#A1A580'} stroke="#52665A" strokeWidth="4"/></g>})}
   <Impact t={t} at={2.13} x={655} y={444} s={2.1}/><Puff t={t} at={2.15} x={655} y={582} s={2.3} color="#D5D0AE"/><Impact t={t} at={2.65} x={655} y={650} s={2}/><Puff t={t} at={2.66} x={558} y={653} s={1.5}/><Puff t={t} at={2.68} x={747} y={653} s={1.5}/>
   <g opacity={grow}><path d={`M${heroX+size*.45} ${heroY+size*.59}l${-85*burst} ${104*burst} 48 29 72-33Z`} fill="#E9D8AC" stroke="#8C795F" strokeWidth="5" opacity={1-resolve}/><path d={`M${heroX+size*.69} ${heroY+size*.64}l${120*burst} ${135*burst} 40-25-20-49Z`} fill="#E9D8AC" stroke="#8C795F" strokeWidth="5" opacity={1-resolve}/></g>
  </svg>
 </P>
}
