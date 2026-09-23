import React from 'react';
import {Mascot} from './SlopKit';
import {Darwin} from './DarwinKit';
import {P,S,E,pulse,clamp,mix} from './Kit';

// The same six-limbed house sprite performs every beat. Props carry the mechanism.
function Actor({t,x,y,s,role='suit',rot=0,cheer=0,stern=0,tint,cape}:{t:number,x:number,y:number,s:number,role?:string,rot?:number,cheer?:number,stern?:number,tint?:string,cape?:string}){return <P x={x} y={y} w={s} h={s} style={{transform:`rotate(${rot}deg)`,transformOrigin:'50% 92%',filter:'drop-shadow(0 8px 0 #18202D40)'}}><Mascot lf={18+t*10} nodAmp={0} size={s} suit={role==='suit'?1:0} samurai={role==='samurai'?1:0} constr={role==='engineer'?1:0} wizard={role==='wizard'?1:0} glasses={role==='suit'?1:0} cheer={cheer} stern={stern} tint={tint} capeC={cape}/></P>}
function Room({t,kind}:{t:number,kind:'court'|'archive'|'engine'}){const c=kind==='court'?['#A3BEC2','#48727C','#E7CC99','#213947']:kind==='archive'?['#9283A4','#443D60','#D9BA80','#242C43']:['#C78366','#6B4044','#E7C379','#2C2D3C'];return <svg width="1012" height="792" style={{position:'absolute',inset:0}}><rect width="1012" height="792" fill={c[0]}/><path d="M0 165H1012V670H0Z" fill={c[1]}/><path d="M0 178H1012M70 178V689M942 178V689" stroke={c[3]} strokeWidth="25"/>{kind==='court'?<><path d="M110 220H902V390H110Z" fill="#799AA2"/>{[150,294,438,582,726,870].map((x,i)=><g key={x} transform={`translate(${x} ${257+Math.sin(t*2+i)*3})`}><path d="M-30 34h60v65h-60zM-19 99v17m38-17v17" fill={i%2?'#D8B78B':'#304F61'}/><path d="M-11 53h8v12h-8m20-12h8v12h-8" fill={c[3]}/></g>)}<path d="M110 383H902" stroke={c[2]} strokeWidth="14"/></>:kind==='archive'?<>{[98,726].map(x=><g key={x}><path d={`M${x} 219h180v362h-180z`} fill={c[3]}/>{[250,348,447].map((y,j)=><g key={y}>{[0,1,2,3].map(i=><rect key={i} x={x+14+i*39} y={y+Math.sin(t+i+j)*1.3} width="27" height="68" rx="3" fill={['#84695B','#C0A777','#758C86','#AE7864'][(i+j)%4]}/>)}<path d={`M${x} ${y+78}h180`} stroke={c[2]} strokeWidth="7"/></g>)}</g>)}<circle cx="497" cy="309" r="100" fill="#736A87" stroke={c[3]} strokeWidth="18"/><path d="M450 274Q548 267 538 314Q510 350 475 326Q454 298 500 295Q523 311 495 316" fill="none" stroke={c[2]} strokeWidth="9"/></>:<>{[118,425,880].map((x,i)=><g key={x}><path d={`M${x} 175v85h${i%2?-55:55}v256`} fill="none" stroke={c[3]} strokeWidth="46"/><path d={`M${x} 175v85h${i%2?-55:55}v256`} fill="none" stroke="#BA9771" strokeWidth="17"/><circle cx={x} cy="273" r="37" fill={c[3]} stroke={c[2]} strokeWidth="6"/><path d={`M${x} 273l${25*Math.cos(t*4+i)} ${25*Math.sin(t*4+i)}`} stroke={c[2]} strokeWidth="5"/></g>)}<path d="M80 558H936" stroke={c[3]} strokeWidth="23"/></>}<path d="M0 647H1012V792H0Z" fill={c[3]}/><path d="M0 650H1012" stroke={c[2]} strokeWidth="10"/>{[0,210,390,610,800,1012].map(x=><path key={x} d={`M506 606L${x} 792`} stroke={c[1]} strokeWidth="3"/>)}<path d="M0 743H1012" stroke={c[1]} strokeWidth="4"/></svg>}
function Bubble({x,y,s=1,rot=0}:{x:number,y:number,s?:number,rot?:number}){return <P x={x-68} y={y-43} w={136} h={99} style={{transform:`rotate(${rot}deg) scale(${s})`}}><svg viewBox="0 0 136 99"><path d="M15 5H119Q131 5 131 20V64Q131 78 117 78H65L42 94V78H16Q5 78 5 65V21Q5 5 15 5Z" fill="#FFF6DC" stroke="#263C49" strokeWidth="6"/>{[35,68,101].map(x=><rect key={x} x={x-6} y="33" width="12" height="12" fill="#527B80"/>)}</svg></P>}

/** 1.367 s: runaway physical replies bury Claude; Darwin throws the machine into reverse. */
export function Chat({t}:{t:number}){
 const yank=S(t,.56,.24),reverse=S(t,.97,.31),hit=pulse(t,.97,.25),struggle=pulse(t,.08,.63),exit=Math.max(0,t-1.08)/.39,shake=Math.sin(t*58)*(1-yank)*3;
 return <P w={1012} h={792} style={{overflow:'hidden',transform:`translateY(${hit*Math.sin(t*71)*3}px) scale(${1+.025*S(t,0,1.36)})`,transformOrigin:'63% 64%'}}><Room t={t} kind="engine"/>
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
  <path d="M435 683H963V713H435Z" fill="#D4AE76" stroke="#273344" strokeWidth="9"/>
  <path d="M917 345V220H795V289" fill="none" stroke="#303C46" strokeWidth="32"/><path d="M917 345V220H795V289" fill="none" stroke="#D2A776" strokeWidth="12"/>
  <path d={`M806 652Q695 ${716-60*yank} 504 621L${446-57*yank} ${466+68*yank}`} fill="none" stroke="#242C37" strokeWidth="16"/>
  <path d={`M806 652Q695 ${716-60*yank} 504 621L${446-57*yank} ${466+68*yank}`} fill="none" stroke="#B29464" strokeWidth="5"/>
 </svg>
 <Darwin t={t} x={-19-24*yank} y={239+13*yank-8*hit} s={477} gaze={1} think={1-yank} cheer={.1+.6*yank} rot={5-12*yank}/>
 <Actor t={t} x={483+7*Math.sin(t*34)*struggle+21*reverse-19*pulse(t,.97,.27)-83*exit*exit} y={457+35*S(t,.1,.47)-29*reverse-18*pulse(t,1.04,.31)-36*exit} s={217} role="suit" rot={-5+8*Math.sin(t*25)*struggle+7*reverse-12*pulse(t,.97,.27)-17*exit} cheer={.3+.65*reverse} stern={1-reverse}/>
 <P x={753+shake} y={296-6*hit} w={238} h={369} style={{transform:`rotate(${-2*hit}deg)`,filter:'drop-shadow(0 12px 0 #202A3D60)'}}><svg viewBox="0 0 238 369">
  <path d="M22 21H210L225 48V344H5V48Z" fill="#315B65" stroke="#1D3544" strokeWidth="10"/><path d="M25 14H207V59H25Z" fill="#E6BA72" stroke="#594837" strokeWidth="7"/>
  <path d="M46 33H188" stroke="#6A503B" strokeWidth="6"/><rect x="39" y="88" width="150" height="111" rx="14" fill="#172F3C" stroke="#AD9470" strokeWidth="7"/>
  <g transform={`translate(114 143) rotate(${t<.97?t*620:601-(t-.97)*1070})`}><circle r="37" fill="#C29253"/>{[0,1,2,3,4,5].map(i=><path key={i} d="M-6-45H6V-17H-6Z" fill="#E8CC91" transform={`rotate(${i*60})`}/>)}<circle r="13" fill="#1E3744"/></g>
  <path d="M-37 112H37V214H-37L-62 196V128Z" fill="#D4B382" stroke="#293C48" strokeWidth="9"/><path d="M-57 140H12V184H-57Z" fill="#132737"/>
  <path d="M38 237H191V267H38Z" fill="#192F3D"/><path d="M51 248H179" stroke={yank>.6?'#7AAE96':'#D3B579'} strokeWidth="7"/>
  <circle cx="52" cy="301" r="12" fill={yank>.6?'#5D826A':'#C66048'}/><circle cx="98" cy="301" r="12" fill="#172E3B"/>
  <path d="M149 291h39m-39 11h39m-39 11h39" stroke="#C5A777" strokeWidth="6"/><path d="M18 342v22m185-22v22" stroke="#192D3A" strokeWidth="18"/>
 </svg></P>
 {Array.from({length:9},(_,i)=>{const start=-.14+i*.066,p=S(t,start,.40),back=S(t,.97+i*.009,.26);const tx=502+(i%3)*60,ty=620-Math.floor(i/3)*62;const x=mix(mix(725,tx,p),727,back),y=mix(mix(453,ty,p)-Math.sin(p*Math.PI)*65,453,back);return back<.995&&<Bubble key={i} x={x} y={y} s={(.57+.16*p)*(1-back*.83)} rot={mix((-1+i%3)*13,i%2?34:-32,p)*(1-back)+back*180}/>})}
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
  {/* The lever discharges along its real cable before the intake changes direction. */}
  {t>=.76&&t<1.10&&<path d={`M${446-57*yank} ${466+68*yank}L504 621Q695 ${716-60*yank} 806 652`} fill="none" stroke="#E9D693" strokeWidth="13" strokeLinecap="round" pathLength="1" strokeDasharray=".18 1" strokeDashoffset={.18-1.2*S(t,.76,.25)}/>}
  {[0,1,2].map(i=>{const q=S(t,.99+i*.045,.20);return t>.99+i*.045&&q<1&&<path key={i} d={`M${580+110*q} ${397+i*22}Q${645+61*q} ${412+i*15} 718 455`} fill="none" stroke="#B9D2BB" strokeWidth={5*(1-q)+2} opacity={1-q}/>})}
  <g opacity={hit} transform={`translate(723 455) scale(${.6+hit*.6})`}><path d="M-26-35l13 21M-34 26l23-8M12-37l-3 22" stroke="#EED99A" strokeWidth="6" strokeLinecap="round"/></g>
  <path d="M471 576V483" stroke="#203A44" strokeWidth="17"/><circle cx="471" cy="576" r="26" fill="#C19B63" stroke="#343D43" strokeWidth="8"/>
  <g transform={`rotate(${-63*yank} 471 576)`}><path d="M471 576V460" stroke="#E7C58E" strokeWidth="14" strokeLinecap="round"/><rect x="438" y="441" width="66" height="32" rx="12" fill="#B5493C" stroke="#4C3436" strokeWidth="7"/></g>
  <g opacity={hit}><path d="M406 508l-23-16m55 10-4-29m44 66 24-8" stroke="#FFE0A2" strokeWidth="8" strokeLinecap="round"/></g>
 </svg>
 </P>
}

/** 3.1 s: the third instruction unlatches a mirror; the stronger reflection steps into reality. */
export function ThirdLine({t}:{t:number}){
 const pull=S(t,.12,.48),wake=S(t,.41,.48),door=S(t,.78,.65),reach=S(t,1.00,.48),merge=S(t,1.43,.43),out=S(t,1.80,.66),land=pulse(t,2.35,.36),finish=S(t,2.47,.61);
 const smallX=382+138*reach+51*merge,smallSize=201-48*merge,heroS=313+70*out+12*finish,heroX=587-92*out-15*finish,heroY=678-heroS*.92-18*Math.sin(out*Math.PI)-12*land;
 return <P w={1012} h={792} style={{overflow:'hidden',transform:`translateY(${land*Math.sin(t*57)*3}px) scale(${1+.028*finish})`,transformOrigin:'67% 65%'}}>
 <Room t={t} kind="archive"/>
 <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
  <path d="M535 683H974L1010 739H491Z" fill="#223A3F" stroke="#BDAB78" strokeWidth="8"/>
  <path d="M590 203Q752 120 933 203V651H590Z" fill="#304849" stroke="#182E39" strokeWidth="20"/>
  <path d="M608 225Q752 152 915 225V650H608Z" fill={wake>.5?'#537E71':'#779297'}/>
  {[0,1,2,3,4].map(i=><path key={i} d={`M${638+i*53} 225L${653+i*40} 633`} stroke={wake>.5?'#638F7E':'#8BA3A2'} strokeWidth="12"/>) }
  <path d="M671 620h177v26H671M690 586h139v21H690M710 555h99v20H710" fill="#365B59"/>
  <path d="M627 272l251-76m-241 116 200-62" stroke="#BFCBB8" strokeWidth="14" opacity={.44*(1-door)}/>
 </svg>
 {out<=0&&<P x={595} y={213} w={328} h={451} style={{overflow:'hidden'}}><Actor t={t} x={heroX-595} y={heroY-213} s={heroS} role="suit" cheer={.45+.5*reach} stern={.15} tint="#D3A145" cape="#743D62" rot={-5+7*reach}/></P>}
 {/* Hinged mirror surface, not a fading overlay: it becomes a physical open door. */}
 <P x={594} y={199} w={347} h={470} style={{transformOrigin:'100% 50%',transform:`perspective(900px) rotateY(${-105*door}deg)`,backfaceVisibility:'visible',filter:'drop-shadow(9px 10px 0 #19273560)',opacity:1-.2*door}}><svg viewBox="0 0 347 470">
  <path d="M12 465V68Q173-31 335 68V465Z" fill="none" stroke="#D5AC69" strokeWidth="25"/>
  <path d="M27 451V81Q173-6 321 81V451Z" fill="none" stroke="#594A41" strokeWidth="7"/>
  <path d="M8 143h28M311 143h30M8 369h28M311 369h30" stroke="#F0D49C" strokeWidth="15"/>
  <path d="M145 25l29-22 29 22-29 31Z" fill="#E6C476" stroke="#66513F" strokeWidth="5"/>
  <path d="M10 95Q-10 54 20 54Q48 62 20 77M329 95Q358 53 330 54Q301 62 330 77" fill="none" stroke="#D6B377" strokeWidth="10"/>
  <circle cx="45" cy="259" r="12" fill="#E4BD72" stroke="#493E3A" strokeWidth="5"/>
 </svg></P>
 <Darwin t={t} x={-19-13*door} y={254+9*pull-9*land} s={445} gaze={1} think={1-wake} cheer={.4*pull+.2*out} shock={.35*out} rot={-2-6*pull+4*out}/>
 <P x={341} y={320} w={202} h={230} style={{transform:`rotate(${-3*pull}deg)`,filter:'drop-shadow(0 9px 0 #17263A55)'}}><svg viewBox="0 0 202 230">
  <path d="M8 13H188V220H8Z" fill="#2E4C48" stroke="#D2AB6D" strokeWidth="9"/>
  <path d="M27 45H169M27 86H169" stroke="#809589" strokeWidth="8"/><text x="29" y="54" fontFamily="Inter" fontSize="29" fontWeight="900" fill="#C6CBB5">1</text><text x="29" y="96" fontFamily="Inter" fontSize="29" fontWeight="900" fill="#C6CBB5">2</text>
  <g transform={`translate(0 ${22*pull})`}><rect x="17" y="120" width="165" height="65" rx="5" fill="#D5B365" stroke="#5C4A39" strokeWidth="5"/><text x="27" y="160" fontFamily="Inter" fontSize="26" fontWeight="900" fill="#293D3E">3. EVOLVE</text><path d="M77 185v19h49v-19" fill="none" stroke="#ECD5A2" strokeWidth="9"/></g>
 </svg></P>
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={`M439 ${520+22*pull}Q498 ${560+35*pull} 561 540L593 530`} fill="none" stroke="#DEC38C" strokeWidth="7"/><circle cx="590" cy="530" r="12" fill="#B79759" stroke="#3E4541" strokeWidth="5"/></svg>
 {merge<.99&&<P w={1012} h={792} style={{opacity:1-merge,clipPath:'inset(0 373px 0 0)'}}><Actor t={t} x={smallX} y={681-smallSize*.92-15*Math.sin(reach*Math.PI)} s={smallSize} role="suit" rot={-5-8*reach+13*merge} cheer={.3+.8*reach} stern={.25}/></P>}
 {out>0&&<Actor t={t} x={heroX} y={heroY} s={heroS} role="suit" cheer={.95-.38*finish} tint="#D3A145" cape="#743D62" rot={2-5*out+5*finish}/>}
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  <g opacity={pulse(t,1.43,.42)}>{[0,1,2,3,4].map(i=>{const a=i*Math.PI*.4;return <path key={i} d={`M${625+Math.cos(a)*(24+merge*44)} ${560+Math.sin(a)*(24+merge*44)}l${Math.cos(a)*19} ${Math.sin(a)*19}`} stroke="#F2CF85" strokeWidth="7" strokeLinecap="round"/>})}</g>
  <g opacity={land}><path d="M555 690l-38 11m250-12 34 14m-211-4-21 22m150-22 26 22" stroke="#E7C987" strokeWidth="8" strokeLinecap="round"/></g>
  {[0,1,2,3].map(i=><g key={i} transform={`translate(${87+i*247} ${230+Math.sin(t*2+i)*7})`} opacity=".55"><path d="M0 0l6-9 6 9-6 9Z" fill="#D0B880"/></g>)}
 </svg>
 </P>
}
function Coin({x,y,r=30,rot=0,s=1}:{x:number,y:number,r?:number,rot?:number,s?:number}){return <P x={x-r} y={y-r} w={r*2} h={r*2} style={{transform:`rotate(${rot}deg) scale(${s})`}}><svg viewBox="0 0 60 60"><circle cx="30" cy="32" r="27" fill="#A66C32"/><circle cx="30" cy="27" r="25" fill="#E8B64B" stroke="#795437" strokeWidth="4"/><circle cx="30" cy="27" r="17" fill="none" stroke="#F8DC8D" strokeWidth="3"/><path d="M24 17h12m-6 0v21m-6 0h12" stroke="#A06E33" strokeWidth="5"/></svg></P>}
/** 1.3 s: the evolution engine audibly gulps an entire stack, and its occupant inflates. */
export function Tokens({t}:{t:number}){const eat=S(t,.04,.67),gulp=pulse(t,.68,.34),grow=S(t,.83,.39),jiggle=Math.sin(t*46)*gulp*4;const size=171+91*grow;return <P w={1012} h={792} style={{overflow:'hidden'}}><Room t={t} kind="engine"/>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M250 557H634V609H250Z" fill="#292E3E" stroke="#CCA77B" strokeWidth="8"/>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M${256+(i*47+t*152)%353} 567l20 32`} stroke="#A87C59" strokeWidth="7"/>)}<path d="M302 613v96m255-96v96" stroke="#34313A" strokeWidth="28"/></svg>
<Actor t={t} x={-3-10*grow} y={426-18*gulp} s={287} role="engineer" rot={-7-8*grow} stern={.15} cheer={.3}/>
<P x={569+jiggle} y={230-11*gulp} w={371} h={447} style={{transform:`scale(${1+gulp*.025},${1+gulp*.045})`,transformOrigin:'50% 100%',filter:'drop-shadow(0 13px 0 #25243270)'}}><svg width="371" height="447" viewBox="0 0 371 447"><path d="M51 23H319L346 80V411H25V81Z" fill="#395E63" stroke="#1B3343" strokeWidth="14"/><path d="M60 20H311V66H60Z" fill="#CFA96A" stroke="#574638" strokeWidth="7"/><path d="M102 21v41m45-41v41m45-41v41m45-41v41m45-41v41" stroke="#8E784F" strokeWidth="8"/><rect x="76" y="101" width="224" height="259" rx="93" fill="#A7C5AE" stroke="#213C48" strokeWidth="17"/><path d="M100 135Q122 111 144 116" fill="none" stroke="#DBE3BE" strokeWidth="10" strokeLinecap="round"/><path d="M39 373H334V408H39Z" fill="#1E3342"/><path d="M61 386H313" stroke="#BC9E6A" strokeWidth="7"/>{[45,325].map(x=><g key={x}><rect x={x-10} y="94" width="20" height="243" rx="8" fill="#D1B47F"/><path d={`M${x} 125v${87+100*grow}`} stroke="#E7D6AB" strokeWidth="7"/></g>)}<path d="M-25 210H67V319H-25L-62 291V238Z" fill="#263E48" stroke="#D0AA6A" strokeWidth="9"/><path d={`M-42 ${239+25*gulp}H24V${290-25*gulp}H-42Z`} fill="#101E2B"/><path d="M-42 239v13m22-13v13m23-13v13m21-13v13M-42 290v-13m22 13v-13m23 13v-13m21 13v-13" stroke="#E5C685" strokeWidth="8"/></svg>
<svg width="371" height="447" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <path d="M24 264H44V353H188V371" fill="none" stroke="#173440" strokeWidth="17" strokeLinecap="round"/>
 <path d="M24 264H44V353H188V371" fill="none" stroke="#C4A36E" strokeWidth="6" strokeLinecap="round"/>
 {t>=.62&&t<.99&&<path d="M24 264H44V353H188V371" fill="none" stroke="#F0D897" strokeWidth="10" strokeLinecap="round" pathLength="1" strokeDasharray=".22 1" strokeDashoffset={.22-1.25*S(t,.62,.28)}/>}
 <g opacity={pulse(t,.85,.32)}><path d="M135 379l-10 17m63-15v24m51-27 10 17" stroke="#EFDA9C" strokeWidth="7" strokeLinecap="round"/></g>
</svg>
<Actor t={t} x={187-size/2} y={362-size*.92-9*gulp} s={size} role="wizard" tint={grow>.35?'#D9AC55':'#D97757'} cheer={grow*.8} stern={.3*(1-grow)}/>
</P>
{Array.from({length:10},(_,i)=>{const p=S(t,.04+i*.048,.3);const startX=335+(i%2)*57,startY=526-Math.floor(i/2)*37;return p<.99&&<Coin key={i} x={mix(startX,555,p)} y={mix(startY,492,p)-39*Math.sin(p*Math.PI)} r={29} rot={p*290+i*13} s={1-p*.45}/>})}
<svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 {/* Pressure vents away from the face, following the circuit charge. */}
 {[0,1,2,3,4,5].map(i=>{const q=S(t,.95+i*.015,.26),side=i%2?-1:1;return t>=.95+i*.015&&q<1&&<g key={i} opacity={.8*(1-q)}><circle cx={side===1?925+48*q:615-61*q} cy={250-43*q-(i%3)*15} r={(9+(i%3)*4)+12*q} fill="#DCCEA7"/><circle cx={side===1?936+51*q:604-56*q} cy={247-55*q-(i%3)*14} r={6+8*q} fill="#EFE0BD"/></g>})}
</svg>
<svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}} opacity={gulp}><path d="M579 379l-28-22m20 170-33 9m369-186 31-22" stroke="#F0CA7E" strokeWidth="8" strokeLinecap="round"/></svg>
</P>}
