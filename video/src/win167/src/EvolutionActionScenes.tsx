import React from 'react';
import {P,S,E,pulse,World} from './Kit';
import {Mascot} from './SlopKit';
import {Impact,Charge,Puff} from './EnergyFX';
import {Darwin} from './DarwinKit';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
export function Sprite({t,x,y,s=225,role=0,rot=0,shock=0,cheer=0,squash=0,boots=0,gear=0,gearAttach=1,tint}:{t:number,x:number,y:number,s?:number,role?:number,rot?:number,shock?:number,cheer?:number,squash?:number,boots?:number,gear?:number,gearAttach?:number,tint?:string}){
 return <P x={x} y={y} w={s} h={s} style={{transform:`rotate(${rot}deg) scale(${1+squash*.16},${1-squash*.16})`,transformOrigin:'50% 92%',filter:'drop-shadow(0 7px 0 #15283245)'}}>
 {gear===3&&<svg width={s} height={s} viewBox="0 0 200 200" style={{position:'absolute',inset:0,transform:`translateY(${-200*(1-gearAttach)}px)`}}><path d="M10 60Q28 24 44 60V143H10ZM156 60Q175 24 192 60V143H156Z" fill="#C95549" stroke="#1C3541" strokeWidth="5"/><path d="M17 70h22v48H17M162 70h22v48h-22" fill="#F4D898"/><path d="M8 141h38v17H8M154 141h40v17h-40" fill="#263F4B"/></svg>}
 <Mascot size={s} lf={18+t*4} nodAmp={0} gaze={role===1?-3:2} stern={shock?0:.35} shock={shock} cheer={cheer} constr={role===0?1:0} wizard={role===1?1:0} samurai={role===2?1:0} glasses={role===3?1:0} suit={role===3?1:0} capeC={role===2?'#367C77':undefined} tint={tint}/>
 {boots>0&&<svg width={s} height={s} viewBox="0 0 200 200" style={{position:'absolute',inset:0,overflow:'visible'}}>{[58,132].map(x=><g key={x}><path d={`M${x-12} 157h27v10h-27z`} fill="#263C42"/><path d={`M${x-10} 168l23 5-23 6 23 6-23 6 23 6`} fill="none" stroke="#EABF58" strokeWidth="5"/><path d={`M${x-15} 197h40v11h-40z`} fill="#D29331" stroke="#4E4636" strokeWidth="3"/></g>)}</svg>}
 {gear===1&&<svg width={s} height={s} viewBox="0 0 200 200" style={{position:'absolute',inset:0,overflow:'visible',transform:`translateY(${-200*(1-gearAttach)}px)`}}><path d="M24 211Q92 225 183 211M28 203v11M160 203v11" fill="none" stroke="#E7E7D1" strokeWidth="9" strokeLinecap="round"/></svg>}
 {gear===2&&<svg width={s} height={s} viewBox="0 0 200 200" style={{position:'absolute',inset:0,overflow:'visible',transform:`translateY(${-200*(1-gearAttach)}px)`}}><path d="M100 42V-39M100-35L-10 14H210Z" fill="#E6BA65" stroke="#2C4654" strokeWidth="5"/><path d="M100-34V13M-10 14L100-8 210 14" stroke="#FFF0C4" strokeWidth="4"/></svg>}
 </P>
}
function Spark({t,at,x,y,c='#F1C662'}:{t:number,at:number,x:number,y:number,c?:string}){const p=clamp((t-at)/.45);return <g opacity={t>=at?1-p:0}>{Array.from({length:7},(_,i)=>{const a=i*6.283/7;return <path key={i} d={`M${x+Math.cos(a)*(13+p*44)} ${y+Math.sin(a)*(13+p*44)}l${Math.cos(a)*16} ${Math.sin(a)*16}`} stroke={c} strokeWidth="7" strokeLinecap="round"/>})}</g>}
function Trophy({x,y,s=1}:{x:number,y:number,s?:number}){return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-21 0h42v21Q20 44 0 45Q-20 44-21 21Z" fill="#EDC565" stroke="#71583D" strokeWidth="4"/><path d="M-21 5h-17q-3 32 23 26M21 5h17q3 32-23 26M0 45v15M-21 64h42" fill="none" stroke="#C78D35" strokeWidth="7"/><path d="M-10 10h9v20h-9" fill="#FFF0B1"/></g>}

/** A crushing pendulum tests three variants. Springs turn the threat into the winning tool. */
export function Test({t}:{t:number}){
 const swing=S(t,.12,1.34),first=E(t,.59,.22),second=E(t,1.02,.25),coil=pulse(t,1.32,.48),release=S(t,1.72,.62),hit=S(t,2.25,.18),settle=S(t,2.66,.55);
 const bx=135+650*swing+75*release,by=425+60*Math.sin(swing*Math.PI)+50*swing-154*release;
 const heroX=704-190*release+30*settle,heroY=467-163*arc(t,1.71,.97)-24*release+15*pulse(t,2.64,.28);
 const shake=pulse(t,2.26,.2)*5*Math.sin(t*82);
 return <World t={t} tone="orange" kind="theatre">
  <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',transform:`translateX(${shake}px)`}}>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <path d="M32 172H978V207H32Z" fill="#293B43"/><path d="M43 178H965" stroke="#D7AF64" strokeWidth="7"/>
   <path d="M43 207v443M963 207v443" stroke="#56656A" strokeWidth="21"/><path d="M43 235l101 83M963 235l-80 64" stroke="#819089" strokeWidth="13"/>
   <path d="M32 707H979V757H32Z" fill="#34444B"/><path d="M31 697H980V718H31Z" fill="#BFA078" stroke="#3A4347" strokeWidth="5"/>
   {[104,335,566,797].map((x,i)=><g key={x}><path d={`M${x} 732h113`} stroke="#DFBA76" strokeWidth="8"/><path d={`M${x+11} 650l28-29 28 29`} fill="none" stroke="#AA8352" strokeWidth="6" opacity=".55"/></g>)}
   <path d="M61 398h194v17H61Z" fill="#716456" stroke="#D0AE76" strokeWidth="5"/>
   <path d="M858 201v73" stroke="#958265" strokeWidth="11"/>
   <g transform={`translate(858 321) rotate(${hit*18})`} opacity={1-hit}>
    <circle r="84" fill="#E3B55E" stroke="#3B4449" strokeWidth="13"/>
    <circle r="55" fill="#AA7044" stroke="#F7DCA0" strokeWidth="7"/>
    <circle r="25" fill="#F8DB92"/>
   </g>
   {Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <path key={i} d="M-24-16L22-23 34 17-14 24Z" fill={i%2?'#E9BF72':'#956444'} stroke="#4D4640" strokeWidth="5" opacity={hit*(1-settle*.5)} transform={`translate(${858+Math.cos(a)*(37+hit*145)} ${321+Math.sin(a)*(35+hit*128)+settle*110}) rotate(${i*45+hit*76})`}/>})}
  </svg>
  <Darwin t={t} x={43} y={165} s={246} think={1-release} shock={.65*pulse(t,1.02,.6)} cheer={release*.8} gaze={1} rot={-4+9*pulse(t,1.75,.6)}/>
  <Sprite t={t} x={200-224*first} y={472+242*first} s={220} role={0} rot={-12*pulse(t,.3,.4)-76*first} shock={first} squash={pulse(t,.55,.2)*.7}/>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <g transform={`translate(${257-115*first} ${508+201*first}) rotate(${-14-120*first})`} opacity={1-first*.45}>
    <path d="M-58-79L54-79 50 4 0 55-54 4Z" fill="#708B94" stroke="#243D48" strokeWidth="9"/>
    <path d="M-39-57H36V-4L0 29-38-4Z" fill="#BDD0C7"/>
    <path d="M-10-74l21 43-20 20 16 42" fill="none" stroke="#223742" strokeWidth="9" opacity={first}/>
   </g>
   <Spark t={t} at={.59} x={284} y={499}/>
  </svg>
  <Sprite t={t} x={451-34*second} y={471+300*second} s={218} role={1} rot={-7*pulse(t,.79,.28)+93*second} shock={second}/>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <path d={`M585 541Q647 448 555 419`} fill="none" stroke="#B6A0C7" strokeWidth="13" strokeDasharray="13 8" opacity={pulse(t,.72,.43)}/>
   <Spark t={t} at={1.03} x={548} y={499} c="#C9AFD7"/>
   {[0,1,2].map(i=><path key={i} d="M-13-10l23-9 7 26-22 4Z" fill="#C9AFD7" opacity={pulse(t,1.03,.55)} transform={`translate(${553+(i-1)*80*second} ${465-70*second+i*35}) rotate(${i*53+second*60})`}/>)}
  </svg>
  <Sprite t={t} x={heroX} y={heroY} s={226+29*settle} role={2} boots={1} squash={coil*.96+pulse(t,2.66,.28)*.5} cheer={release*.8} rot={-15*coil+17*arc(t,1.71,.97)}/>
  <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   <path d={`M491 197L${bx} ${by-104}`} stroke="#243640" strokeWidth="17" opacity={1-release}/>
   <path d={`M491 197L${bx} ${by-104}`} stroke="#90A09D" strokeWidth="5" strokeDasharray="12 10" opacity={1-release}/>
   <g transform={`translate(${bx} ${by}) rotate(${swing*97+release*240})`} opacity={1-hit}>
    <circle r="105" fill="#263B45" stroke="#162D38" strokeWidth="9"/>
    <path d="M-81-41A89 89 0 0 1 27-83" fill="none" stroke="#7C989B" strokeWidth="17" strokeLinecap="round"/>
    <path d="M-92 15H92v38H-88Z" fill="#D8A64F"/>
    {[-56,0,56].map(x=><path key={x} d={`M${x} 15l-28 38h20l28-38Z`} fill="#33434A"/>)}
    <circle cy="-102" r="14" fill="#59717B" stroke="#172F39" strokeWidth="7"/>
   </g>
   <path d={`M${785-44*release} ${545-120*release}l-38 50m64-23-33 49`} stroke="#F7D89B" strokeWidth="11" strokeLinecap="round" opacity={pulse(t,1.73,.56)}/>
   <Spark t={t} at={1.74} x={814} y={542}/><Spark t={t} at={2.26} x={854} y={326}/>
   <g transform={`translate(671 ${392-24*settle}) scale(${settle})`}><Trophy x={0} y={0} s={1.03}/></g>
  </svg>
  </P>
 </World>
}

/** A winner physically divides; every child inherits the gold spring boots, then adds a trait. */
export function Variations({t}:{t:number}){
 const split=S(t,.5,.63),attach=S(t,1.29,.5),press=pulse(t,.23,.44),settle=pulse(t,1.74,.3),zoom=S(t,2.1,.7),rack=S(t,.12,.5),retract=S(t,1.78,.53),walkoff=S(t,2.14,.52);
 return <World t={t} tone="plum" kind="engine">
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <path d="M159 203H860V648H159Z" fill="#352D49" stroke="#AA929A" strokeWidth="13"/>
   {[235,506,777].map((x,i)=><g key={x}><path d={`M${x-102} 274h204v295h-204z`} fill="#57496B" stroke="#A58B9D" strokeWidth="7"/><path d={`M${x-85} 284v244`} stroke="#DAC4AC" strokeWidth="5"/><path d={`M${x-99} 600h198v57h-198z`} fill="#2C2F41" stroke="#C3A287" strokeWidth="6"/><path d={`M${x-92} 616h184`} stroke={['#C7D8C7','#B6CAD6','#D9A787'][i]} strokeWidth="8"/><circle cx={x} cy="637" r="7" fill="#EACA77"/></g>)}
   <path d="M230 239H780" stroke="#D3B575" strokeWidth="16"/>
   {[0,1,2,3,4,5,6,7].map(i=><g key={i} transform={`translate(${157+i*99} ${235}) rotate(${t*40+i*45})`}><path d="M-9-9h18v18h-18z" fill="#766484"/><path d="M-14 0h28M0-14v28" stroke="#AA91A1" strokeWidth="6"/></g>)}
   <path d={`M506 340Q${506-80*split} 440 ${235} 545M506 340Q${506+80*split} 440 ${777} 545`} stroke="#E4C368" strokeWidth="9" fill="none" strokeDasharray="10 15" opacity={pulse(t,.5,1.1)}/>
  </svg>
  <Darwin t={t} x={-41} y={221} s={266} tool="quill" think={1-attach} cheer={attach*.5} rot={-5+6*press} gaze={1}/>
  {[0,1,2].map(i=>{const x=386+(i-1)*271*split+walkoff*(i===2?43:i===0?-21:0);const y=348-58*arc(t,.5,.63)+16*press+settle*10-25*arc(t,2.14,.52);return <React.Fragment key={i}><P x={x} y={y} w={240} h={240} style={{opacity:i===1?1:E(t,.53,.14),transform:`scale(${1+zoom*.03})`,transformOrigin:'50% 100%'}}><Sprite t={t} x={0} y={0} s={240} role={i===1?3:2} boots={1} tint={['#65A38D','#9E8EC1','#D7975D'][i]} gear={t>1.29?i+1:0} gearAttach={attach} squash={press*.8+settle*.45} cheer={attach*.9}/></P>
   <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><Spark t={t} at={1.61+i*.06} x={x+120} y={469} c={['#B1D9BB','#D0BDDC','#F0D088'][i]}/></svg></React.Fragment>})}
  <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   {[235,506,777].map((x,i)=><g key={x} transform={`translate(${x} ${190+170*attach-193*retract})`}>
    <path d="M-10-120H10V0H-10Z" fill="#1E293A" stroke="#B9ABAA" strokeWidth="4"/>
    <path d="M-64-12H64V23H-64Z" fill={['#A4C7B4','#BDA6CD','#D69B73'][i]} stroke="#292D40" strokeWidth="6"/>
    <path d={`M-47 25v40l${18-28*retract} 18M47 25v40l${-18+28*retract} 18`} fill="none" stroke="#D7C0A0" strokeWidth="10"/>
    <circle cy="5" r="8" fill={attach>.95?'#DCC565':'#513B51'}/>
   </g>)}
   {[235,506,777].map((x,i)=><g key={x} opacity={1-rack}>
    <path d={`M${x-102-100*rack} 283h96v286h-96zM${x+6+100*rack} 283h96v286h-96z`} fill="#867487" stroke="#302A41" strokeWidth="7"/>
    <path d={`M${x-70-100*rack} 316v203M${x+70+100*rack} 316v203`} stroke="#C4ADA2" strokeWidth="8"/>
   </g>)}
   {[0,1,2,3,4,5,6,7,8].map(i=><path key={i} d={`M${154+(i*78+t*85)%702} 675l28 0`} stroke="#E0BB70" strokeWidth="8"/>)}
   <path d="M236 691H777" stroke="#D0B782" strokeWidth="5"/><path d="M237 682l-13 9 13 9M776 682l13 9-13 9" fill="none" stroke="#D0B782" strokeWidth="5"/>
  </svg>
 </World>
}

/** A genuinely new arena: inherited springs meet a much wider canyon. Rocket variant wins. */
export function Repeat({t}:{t:number}){
 const run=S(t,.08,.48),brake=pulse(t,.51,.36),glide=S(t,.48,.74),drop=S(t,1.05,.5),compress=pulse(t,.58,.46),launch=S(t,1.02,1.03),land=pulse(t,2.03,.31),flag=E(t,2.18,.32);
 // The landing cracks its ledge; the winner must relaunch rather than hold a victory pose.
 const crack=S(t,2.20,.12),reload=pulse(t,2.22,.24),escape=Math.max(0,t-2.38),kick=escape*escape;
 const hx=-240+458*S(t,.48,.35)+523*launch-1350*kick,hy=310-135*arc(t,1.02,1.03)+23*land+16*reload-1400*kick;
 return <P x={0} y={0} w={1012} h={792} style={{overflow:'hidden',background:'#B8D6DD'}}>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <path d="M0 170H1012V792H0Z" fill="#A3C9D1"/><circle cx="779" cy="257" r="61" fill="#E5E7D1"/>
   <path d={`M${-30-t*3} 403l130-180 150 179 107-117 144 119 101-172 155 174 87-163 208 172v350H0Z`} fill="#6E9BAF"/>
   <path d="M97 236l-38 90 43-12 25 34 34-26M607 247l-34 103 38-18 37 21 24-20M872 258l-28 80 43-16 22 21" fill="#D8E2D9"/>
   <path d="M0 561L370 551V792H0M706 551L1012 527V792H700Z" fill="#2E516A"/>
   <path d="M0 545L377 540 363 579 0 589ZM701 542L1012 518V570L696 586Z" fill="#E7EADC" stroke="#608B9C" strokeWidth="5"/>
   <path d="M748 538l22 22-20 22 27 16-12 30" stroke="#294B60" strokeWidth="10" fill="none" opacity={crack}/>
   <path d="M39 604l69 117 51-91 33 146M241 601l-18 105 70-39M729 613l51 119 52-135M908 601l-15 140" stroke="#47768B" strokeWidth="25" fill="none"/>
   <path d="M390 777Q510 732 689 767" fill="none" stroke="#7EAFC0" strokeWidth="32"/>
   {[0,1,2,3,4,5].map(i=><path key={i} d={`M${420+i*42} ${633+(i*31+t*53)%124}l-10 16`} stroke="#E7EADF" strokeWidth="4"/>)}
   <path d="M718 274v261" stroke="#324E62" strokeWidth="7"/><path d={`M721 279q42 ${-10+Math.sin(t*5)*7} 65 7v50q-33-14-65-3z`} fill="#DABC64"/>
   <path d="M913 329l22-13 22 13v72h-44z" fill="#506D7C"/><path d="M924 350h20v9h-20z" fill="#A8C4CB"/>
  </svg>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M809 346H1012V366L832 379Z" fill="#D4E2DE" stroke="#638B9C" strokeWidth="5"/></svg>
  <Darwin t={t} x={816} y={180} s={180} shock={.55*pulse(t,1.5,.5)} cheer={launch*.7} gaze={-1} rot={5*land}/>
  <Sprite t={t} x={16+46*run-14*brake} y={363+9*brake} s={172} role={0} tint="#60A6C4" boots={1} gear={1} rot={-12*brake} shock={.8*E(t,.52,.15)}/>
  <Sprite t={t} x={153+340*glide} y={363-170*arc(t,.48,.74)+620*drop} s={170} role={1} tint="#AD83C5" boots={1} gear={2} rot={15*drop} shock={.8*drop}/>
  <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
   <path d="M307 552l-24 6m32-16-19-3" stroke="#EFF1DF" strokeWidth="8" opacity={brake}/>
   {t>1.02&&t<2.05&&<g><path d={`M${hx+37} ${hy+176}l-37 103 54-49 6 54 28-107M${hx+165} ${hy+174}l-20 107 48-67 17 40 2-81`} fill="#E9B957"/><path d={`M${hx+43} ${hy+179}l-18 56 34-45M${hx+176} ${hy+177}l-13 57 32-55`} stroke="#FBEAC2" strokeWidth="14"/></g>}
  </svg>
  <Sprite t={t} x={hx} y={hy} s={222} role={2} tint="#D78657" boots={1} gear={3} squash={compress*.9+land*.6+reload*.85} rot={-14*arc(t,1.02,1.03)+40*escape} cheer={launch*.9}/>
  <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   <path d="M291 546l32 12-9 15 26 13-10 18" stroke="#35556B" strokeWidth="7" fill="none" opacity={E(t,1.02,.12)}/>
   {[0,1,2,3].map(i=><path key={i} d="M-9-7l19-4 8 14-22 6Z" fill="#DFE8E1" stroke="#6C96A4" strokeWidth="3" opacity={pulse(t,1.04,.7)} transform={`translate(${325+(i-1.5)*44*E(t,1.04,.7)} ${552-57*arc(t,1.04,.7)+i*13}) rotate(${i*42+t*90})`}/>)}
   <Charge t={t} at={.72} x={327} y={536} dur={.30}/><Impact t={t} at={1.04} x={327} y={551} s={1.5}/><Puff t={t} at={1.05} x={299} y={551} color="#DDE9E4" s={1.2}/><Impact t={t} at={2.05} x={846} y={552} s={1.5}/>{t>1.08&&t<1.8&&<path d={`M${hx+62} ${hy+231}q-33 80-109 128M${hx+174} ${hy+231}q-26 83-81 127`} stroke="#F2D18A" strokeWidth="7" fill="none" opacity={.6} strokeDasharray="18 14"/>}<Spark t={t} at={1.04} x={327} y={542}/><Spark t={t} at={2.05} x={846} y={552}/>
   <Impact t={t} at={2.23} x={767} y={552} s={.9}/><Impact t={t} at={2.39} x={846} y={552} s={1.4}/><Puff t={t} at={2.40} x={849} y={554} s={1.5} color="#DDE9E4"/>
   {t>2.38&&<g><path d={`M${hx+27} ${hy+173}l-26 ${40+180*escape} 28-22 17 28 22-${58+140*escape}M${hx+185} ${hy+173}l-15 ${49+180*escape} 25-28 18 34 10-${64+140*escape}`} fill="#E9B957"/><path d={`M${hx+39} ${hy+178}l1 ${29+110*escape}M${hx+194} ${hy+178}l0 ${33+110*escape}`} stroke="#FFF0C1" strokeWidth="10"/></g>}
   <g transform={`translate(${715-240*kick} ${390-35*flag-600*kick}) scale(${flag})`}><path d="M0 0l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3Z" fill="#E6B84F" stroke="#FFF0BF" strokeWidth="5"/></g>
   <path d="M0 733L240 709l130 83H0M747 744l265-58v106H706Z" fill="#203E56"/>
  </svg>
 </P>
}
