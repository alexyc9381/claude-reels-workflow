import React from 'react';
import {P,S,E,pulse,clamp} from './Kit';
import {Darwin,Habitat,quillTip} from './DarwinKit';
import {Bolt,Impact,Charge,Puff} from './EnergyFX';
import {Sprite} from './EvolutionActionScenes';
const G='#65A38D';
const arc=(t:number,a:number,d:number)=>Math.sin(clamp((t-a)/d)*Math.PI);
const SVG=({children}:any)=><svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>{children}</svg>;
function Badge({x,y,p=1,label='WINNER'}:{x:number,y:number,p?:number,label?:string}){return <g transform={`translate(${x} ${y}) scale(${p})`}><path d="M-88-26H88V26H-88Z" fill="#F0D17C" stroke="#354C43" strokeWidth="5"/><path d="M-72-1l9 9 16-20" fill="none" stroke="#315D47" strokeWidth="6"/><text x="15" y="10" fill="#294B41" fontFamily="Inter" fontWeight="900" fontSize="25" textAnchor="middle">{label}</text></g>}
function Burst({t,at,x,y}:{t:number,at:number,x:number,y:number}){const q=S(t,at,.38);return <g opacity={t>=at?1-q:0}>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M${x+Math.cos(i*Math.PI/4)*(18+q*65)} ${y+Math.sin(i*Math.PI/4)*(18+q*65)}l${Math.cos(i*Math.PI/4)*23} ${Math.sin(i*Math.PI/4)*23}`} stroke="#FFE3A0" strokeWidth="8" strokeLinecap="round"/>)}</g>}
function Book({x,y,s=1,open=1,line=0}:{x:number,y:number,s?:number,open?:number,line?:number}){return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-170 0Q-100-29 0 3Q100-29 170 0V139Q79 113 0 140Q-81 113-170 139Z" fill="#274C49" stroke="#182F36" strokeWidth="9"/><path d={`M-155 ${8+70*(1-open)}Q-75-8 0 22Q75-8 155 ${8+70*(1-open)}V120Q76 103 0 132Q-73 103-155 120Z`} fill="#F0DDB0" stroke="#AC895F" strokeWidth="5"/><path d="M0 24V130" stroke="#B29B71" strokeWidth="5"/>{[0,1,2].map(i=><g key={i}><path d={`M-132 ${38+i*25}q44-5 104 11`} stroke="#B7A280" strokeWidth="5"/><path d={`M24 ${49+i*25}q56-12 110-10`} stroke={i===2&&line?'#6D9271':'#B7A280'} strokeWidth={i===2&&line?12:5}/></g>)}</g>}
function Arena({t,children}:{t:number,children?:React.ReactNode}){return <P w={1012} h={792} style={{overflow:'hidden',background:'#D1B18D'}}><SVG><rect width="1012" height="792" fill="#D7BD93"/><path d={`M${-20-t*5} 366L140 197 282 347 419 217 598 364 760 197 1012 373V792H0Z`} fill="#A48B80"/><path d="M0 437L151 304 338 436 558 282 760 445 905 320 1012 445V792H0Z" fill="#796A76"/><path d="M0 532L392 517V792H0M704 518L1012 507V792H704Z" fill="#465458"/><path d="M0 517L399 507 388 541 0 555M697 507L1012 495V533L704 549" fill="#BEAD7C" stroke="#374F50" strokeWidth="5"/>{[50,154,266,755,885,970].map((x,i)=><path key={x} d={`M${x} 557l${i%2?31:-17} 117 34-17-20 98`} fill="none" stroke="#60706A" strokeWidth="20"/>)}<path d="M403 738Q505 689 697 730V792H399Z" fill="#B57B59"/>{[0,1,2,3].map(i=><path key={i} d={`M${424+i*65} ${748+Math.sin(t*4+i)*8}q22-11 44 0`} fill="none" stroke="#E3B77D" strokeWidth="6"/>)}<path d="M858 244V505" stroke="#324D50" strokeWidth="8"/><path d={`M862 246q45 ${-10+7*Math.sin(t*7)} 79 0v59q-42-15-79 0z`} fill="#E5C265" stroke="#6C634D" strokeWidth="4"/><path d="M879 261l12 13 22-25" fill="none" stroke="#38654F" strokeWidth="7"/><path d="M50 501v-75h94v72M64 432v65M91 432v65M118 432v65" stroke="#D3B775" strokeWidth="8" fill="none"/>{[0,1,2].map(i=><g key={i} transform={`translate(${478+i*66} ${582+(i*41+t*43)%135})`} opacity=".5"><path d="M0 0l7-14 6 14-6 10Z" fill="#D5B17E"/></g>)}</SVG>{children}<SVG><path d="M0 738l118-44 152 98H0M799 760l135-67 78 39v60H780" fill="#263E44"/></SVG></P>}

// The prompt is literally the origin of all three contestants; there is no separate app metaphor.
export function Build({t}:{t:number}){
 const open=S(t,0,.25),burst=S(t,.13,.53),spread=S(t,.38,.72);
 const d={x:-17,y:223-15*pulse(t,.05,.43),s:414,think:1-burst,cheer:burst*.7,rot:-7+12*burst,cast:1-S(t,.06,.12)};
 return <Habitat t={t} tone="forest" museum>
 <P w={1012} h={792} style={{transform:`scale(${1+.028*S(t,0,1.5)})`,transformOrigin:'58% 59%'}}>
 <Darwin t={t} {...d} tool="quill"/>
 <SVG><path d="M334 679H957V709H334Z" fill="#203E40" stroke="#D9BE7C" strokeWidth="9"/><Book x={616} y={552} s={1.43} open={open}/><path d={`M618 568Q593 476 486 430M618 568V410M618 568Q689 484 857 430`} fill="none" stroke="#EAC86E" strokeWidth="9" strokeDasharray="220" strokeDashoffset={220*(1-spread)}/></SVG>
 {[0,1,2].map(i=>{const q=E(t,.14+i*.12,.46);return <P key={i} w={1012} h={792} style={{opacity:q}}><Sprite t={t} x={511+(i-1)*219*(.72+.28*spread)} y={555-226*q-43*arc(t,.14+i*.12,.72)-14*pulse(t,1.0+i*.07,.42)} s={219} role={i} tint={['#D68563','#9586B2',G][i]} boots={i===2?1:0} cheer={q*.5+.4*pulse(t,1.0+i*.07,.42)} squash={pulse(t,.77+i*.12,.25)*.55} rot={(i-1)*(-15+15*spread)}/></P>})}
 <SVG><Charge t={t} at={0} dur={.15} {...quillTip(d)} s={.6}/><Bolt t={t} at={.14} from={quillTip(d)} to={{x:616,y:576}} dur={.22}/><Impact t={t} at={.17} x={616} y={580} s={1.1}/>{[0,1,2].map(i=><Puff key={i} t={t} at={.26+i*.12} x={415+i*219} y={548} s={.65}/>)}<Burst t={t} at={.18} x={620} y={535}/><path d="M489 724H746" stroke="#92734A" strokeWidth="6"/><text x="617" y="750" fontSize="25" fontWeight="900" fontFamily="Inter" textAnchor="middle" fill="#F3D797">ONE PROMPT</text></SVG>
 </P></Habitat>
}

// One fixed goal, three explicit attempts. Gold spring boots cause the successful jump.
export function Test({t}:{t:number}){
 const first=S(t,.12,.48),fall1=S(t,.57,.40),second=S(t,.80,.65),fall2=S(t,1.35,.42),coil=pulse(t,1.53,.40),jump=S(t,1.86,.76),land=pulse(t,2.62,.32),keep=E(t,2.74,.4);
 const ready=S(t,1.26,.32);const hx=-245+342*ready+620*jump,hy=275-150*arc(t,1.86,.76)+17*land;
 return <Arena t={t}>
 <Darwin t={t} x={3} y={166} s={194} tool="lens" think={1-jump} cheer={jump*.8} rot={-3+7*pulse(t,1.8,.7)}/>
 <SVG><path d="M223 222h462" stroke="#78695D" strokeWidth="3" strokeDasharray="7 11"/>{[0,1,2].map(i=><g key={i} transform={`translate(${278+i*168} 218)`}><circle r="28" fill={i===2&&keep>.3?'#457F62':'#F0D7A1'} stroke="#655D51" strokeWidth="4"/><text y="10" textAnchor="middle" fontSize="27" fontWeight="900" fontFamily="Inter" fill={i===2&&keep>.3?'#FFF3C5':'#455853'}>{i===2&&keep>.3?'✓':i+1}</text></g>)}</SVG>
 {fall1<.99&&<Sprite t={t} x={213+211*first} y={296-33*arc(t,.12,.48)+430*fall1} s={230} role={0} tint="#D68563" rot={23*fall1} shock={fall1} cheer={0}/>}
 {fall2<.99&&<Sprite t={t} x={-235+374*S(t,.59,.20)+392*second} y={297-140*arc(t,.80,.65)+420*fall2} s={228} role={1} tint="#9586B2" rot={-15*arc(t,.8,.65)+25*fall2} shock={fall2}/>}
 <Sprite t={t} x={hx} y={hy+32*coil} s={233} role={2} tint={G} boots={1} squash={coil*.9+land*.5} cheer={jump*.85} rot={-12*coil+10*arc(t,1.86,.76)}/>
 <SVG><Charge t={t} at={1.53} x={209} y={507} dur={.33}/><Impact t={t} at={1.86} x={213} y={520} s={1.1}/><Impact t={t} at={2.63} x={827} y={520} s={1.2}/><Puff t={t} at={.87} x={491} y={713}/><Puff t={t} at={1.66} x={599} y={727}/>{t>1.86&&t<2.62&&<g opacity={Math.sin(jump*Math.PI)*.7}><path d={`M${hx-61} ${hy+166}q-43 33-97 16M${hx-41} ${hy+205}l-87 27`} stroke="#F2C76A" strokeWidth="10" fill="none" strokeLinecap="round"/></g>}<path d="M416 559l29 31m0-31-29 31" stroke="#D78466" strokeWidth="8" opacity={pulse(t,.68,.6)}/><path d="M553 559l29 31m0-31-29 31" stroke="#D78466" strokeWidth="8" opacity={pulse(t,1.47,.5)}/><Burst t={t} at={1.86} x={216} y={514}/><Burst t={t} at={2.63} x={822} y={513}/><Badge x={833} y={610-15*keep} p={keep}/><path d="M804 248l8-16 14 15 15-15 7 17v13h-44z" fill="#E3BC50" stroke="#6A593E" strokeWidth="4" opacity={keep}/></SVG>
 </Arena>
}

// The exact winner carries through the cut. Darwin selects it; two descendants grow from it.
export function ThirdLine({t}:{t:number}){
 const focus=S(t,0,.50),page=S(t,.30,.55),mark=S(t,.83,.32),branch=S(t,1.47,.94),settle=pulse(t,2.35,.32);
 const hx=717-67*focus-130*branch,hy=275+95*focus;
 const cast=S(t,1.08,.22)*(1-S(t,1.36,.13))+S(t,1.78,.22)*(1-S(t,2.06,.13));
 const d={x:-24,y:230+9*pulse(t,.83,.4),s:370,think:1-mark,cheer:mark*.65,rot:-6+8*mark-7*cast+6*pulse(t,1.43,.22)+6*pulse(t,2.09,.24),cast};
 return <Arena t={t}>
 <SVG><rect y="156" width="1012" height="636" fill="#263E48" opacity={.82*focus}/><path d={`M${704-460*focus} ${517+96*focus}H1001v37H${704-460*focus}Z`} fill="#314F50" stroke="#C6A66E" strokeWidth="7"/><path d={`M363 ${550+96*focus}v160M922 ${550+96*focus}v160`} stroke="#374747" strokeWidth="18"/></SVG>
 <Darwin t={t} {...d} tool="quill"/>
 <SVG><g transform={`translate(${42-110*(1-page)} 602) rotate(${-8+8*page})`}><path d="M0-141H220V148H0Z" fill="#F3DFB5" stroke="#A88655" strokeWidth="9"/>{['1. TEST','2. KEEP','3. EVOLVE'].map((text,i)=><text key={text} x="20" y={-80+i*76} fill={i===2?'#284F43':'#7F7D64'} fontFamily="Inter" fontWeight="900" fontSize="28">{text}</text>)}<path d="M17 92H205" stroke="#CF9A42" strokeWidth="10" strokeDasharray="188" strokeDashoffset={188*(1-mark)}/></g><path d="M758 548Q541 476 394 548M758 548Q881 477 881 548" stroke="#E4BF65" strokeWidth="9" fill="none" strokeDasharray="400" strokeDashoffset={400*(1-branch)}/></SVG>
 {[0,2].map(i=><P key={i} w={1012} h={792} style={{opacity:E(t,1.52,.22)}}><Sprite t={t} x={650-130*branch+(i-1)*245*branch} y={hy-67*arc(t,1.47,.94)+9*settle} s={233} role={2} tint={G} boots={1} cheer={.5} shock={pulse(t,i===0?2.12:2.28,.23)*.8} squash={settle*.6+pulse(t,i===0?2.12:2.28,.24)*.65}/></P>)}
 <Sprite t={t} x={hx} y={hy+9*settle} s={233} role={2} tint={G} boots={1} cheer={.85} shock={pulse(t,1.47,.23)*.85} squash={pulse(t,1.30,.36)*.6+settle*.5+pulse(t,1.47,.24)*.7}/>
 <SVG><Charge t={t} at={1.17} dur={.26} {...quillTip(d)}/><Charge t={t} at={1.86} dur={.25} {...quillTip(d)}/><Bolt t={t} at={1.43} from={quillTip(d)} to={{x:hx+116,y:hy+165}} dur={.29}/><Bolt t={t} at={2.11} from={quillTip(d)} to={{x:650-375*branch+116,y:hy-67*arc(t,1.47,.94)+165}} dur={.26} seed={2}/><Bolt t={t} at={2.27} from={{x:650-375*branch+116,y:hy+168}} to={{x:650+115*branch+116,y:hy+168}} dur={.22} seed={4}/><Impact t={t} at={2.40} x={640} y={619} s={2}/><Badge x={hx+116} y={hy-33} p={1} label="KEEP"/><Burst t={t} at={1.5} x={767} y={530}/>{[0,1,2].map(i=><path key={i} d={`M${347+i*245} 631h${80*E(t,2.3+i*.09,.23)}`} stroke="#DEBB65" strokeWidth="8"/>)}</SVG>
 </Arena>
}

// All three retain the green body, samurai costume and gold boots. Only the added trait differs.
export function Variations({t}:{t:number}){
 const spread=S(t,0,.45),attach=S(t,.42,.60),retract=S(t,1.06,.38),bounce=pulse(t,1.19,.40),ready=S(t,2.10,.66);
 return <Habitat t={t} tone="sunset" museum>
 <SVG><path d="M96 610H963V635H96Z" fill="#293D44" stroke="#D7B57B" strokeWidth="8"/><path d="M123 638V719M930 638V719" stroke="#293D44" strokeWidth="15"/><path d="M122 260H913" stroke="#4A3F49" strokeWidth="22"/>{[0,1,2].map(i=><g key={i} transform={`translate(${248+i*272} ${241+123*attach-153*retract})`}><path d="M-8-35H8V111H-8Z" fill="#AF9278" stroke="#3F3B46" strokeWidth="5"/><path d={`M-52 100v41l${20-25*retract} 18M52 100v41l${-20+25*retract} 18`} fill="none" stroke="#D7B47B" strokeWidth="10"/></g>)}</SVG>
 {[0,1,2].map(i=>{const x=275+i*245+(i-1)*27*spread-151*spread;const demo=arc(t,1.20+i*.27,.57);const y=370-7*spread-(i===0?0:i===1?44:65)*demo;return <React.Fragment key={i}><Sprite t={t} x={x+(i===0?31*demo:i===1?12*demo:0)} y={y} s={233} role={t<.87+i*.06?2:i===0?0:i===1?1:2} tint={t<.87+i*.06?G:['#60A6C4','#AD83C5','#D78657'][i]} boots={1} gear={i+1} gearAttach={attach} cheer={.55+.4*attach} shock={pulse(t,.93+i*.06,.2)*.5} squash={pulse(t,.89,.3)*.5} rot={i===0?-9*demo:i===1?-12*demo:5*demo}/><SVG>{i===2&&demo>0&&<path d={`M${x+31} ${y+216}l-7 ${42*demo} 26-18 2 13 9-37M${x+192} ${y+216}l-7 ${42*demo} 26-18 2 13 9-37`} fill="#F0BC61"/>}<Bolt t={t} at={.87+i*.06} from={{x:248+i*272+(i===1?0:47),y:241+123*attach-153*retract+(i===1?4:159)}} to={{x:x+(i===1?116:210),y:i===0?600:i===1?330:440}} dur={.18} seed={i} color="#BED7CB"/><Impact t={t} at={1.2+i*.27} x={x+116} y={613} s={.8}/><Burst t={t} at={.92} x={x+115} y={480}/><path d={`M${x+69} 631h98`} stroke="#E2BC64" strokeWidth="7"/><text x={x+116} y="664" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="23" fill="#F1D19B">{['+ SKIS','+ GLIDER','+ ROCKETS'][i]}</text></SVG></React.Fragment>})}
 <Darwin t={t} x={-35} y={178} s={236} tool="lens" think={1-attach} cheer={attach*.7} rot={-5+8*attach}/>
 <SVG><path d="M181 731H849" stroke="#AE8C70" strokeWidth="5"/><text x="515" y="768" textAnchor="middle" fontSize="23" fontWeight="900" fontFamily="Inter" fill="#F3D6A0">SHARED BOOTS. NEW POWERS.</text></SVG>
 </Habitat>
}

// Recap one literal lineage: start, winning trait, improved descendant. No new robot metaphor.
export function Draft({t}:{t:number}){
 const draw=S(t,.12,.6),keep=S(t,.73,.68),evolve=S(t,1.61,.74),launch=S(t,2.46,.65),land=pulse(t,3.08,.3);
 const cast=S(t,.40,.18)*(1-S(t,.66,.12))+S(t,1.23,.18)*(1-S(t,1.55,.12));const d={x:1,y:169,s:241,think:1-evolve,cheer:evolve*.65,rot:-4+8*evolve-7*cast,cast};
 return <Habitat t={t} tone="dawn">
 <SVG><path d="M97 637H321V682H97M362 554H598V682H362M647 454H919V682H647" fill="#315952" stroke="#D4C191" strokeWidth="8"/><path d="M145 693H866" stroke="#294846" strokeWidth="10"/><path d="M290 594Q329 492 413 485M564 488Q608 382 700 384" fill="none" stroke="#E4B957" strokeWidth="10" strokeDasharray="170" strokeDashoffset={170*(1-keep)}/><path d="M402 472l22 7-11 23M688 368l23 12-9 23" fill="none" stroke="#E4B957" strokeWidth="9" opacity={keep}/></SVG>
 <Sprite t={t} x={112} y={457-20*draw} s={217} role={0} tint="#D68563" cheer={draw*.5} squash={pulse(t,.55,.26)*.5}/>
 <P w={1012} h={792} style={{opacity:keep}}><Sprite t={t} x={367} y={335-30*arc(t,.73,.68)} s={211} role={2} tint={G} boots={1} cheer={.75}/></P>
 <P w={1012} h={792} style={{opacity:evolve}}><Sprite t={t} x={653} y={209-75*arc(t,2.46,.65)+11*land} s={236} role={2} tint={G} boots={1} gear={3} gearAttach={evolve} cheer={.95} squash={land*.5}/></P>
 <Darwin t={t} {...d} tool="quill"/>
 <SVG><Charge t={t} at={.49} dur={.22} {...quillTip(d)} s={.7}/><Bolt t={t} at={.72} from={quillTip(d)} to={{x:470,y:490}}/><Bolt t={t} at={1.60} from={quillTip(d)} to={{x:766,y:362}} dur={.29} seed={5}/><Impact t={t} at={.76} x={476} y={552}/><Impact t={t} at={1.68} x={772} y={451}/><Impact t={t} at={3.08} x={779} y={459} s={1.3}/><text x="208" y="731" fontSize="28" fontWeight="900" fontFamily="Inter" textAnchor="middle" fill="#F3DCAB">DRAFT</text><text x="476" y="731" fontSize="28" fontWeight="900" fontFamily="Inter" textAnchor="middle" fill="#F3DCAB">KEEP BEST</text><text x="782" y="731" fontSize="28" fontWeight="900" fontFamily="Inter" textAnchor="middle" fill="#F3DCAB">EVOLVE</text><Burst t={t} at={1.02} x={475} y={550}/><Burst t={t} at={2.14} x={772} y={421}/><Badge x={776} y={190} p={E(t,2.75,.32)} label="BEST"/>{t>2.46&&t<3.11&&<path d={`M690 ${410-75*arc(t,2.46,.65)}l-12 65 28-42 8 30 9-51M850 ${410-75*arc(t,2.46,.65)}l-12 65 28-42 8 30 9-51`} fill="#E3AD50"/>}</SVG>
 </Habitat>
}
