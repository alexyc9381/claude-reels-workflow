import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Mascot} from './SlopKit';
import {Scene, E, OUT, IO, asPlace, Contact, Mark, DEPTS, mono} from './DeptWorld';

// A continuous 144-frame action. Camera and actor clocks both start at f0.
const colours=['#D97757','#559FA8','#8863A7','#4A9975','#B45846'];
const ease=(f:number,a:number,b:number)=>E(f,a,b,0,1,IO);
const kick=(f:number,a:number,amp=1)=>f<a?0:Math.sin((f-a)*.52)*Math.exp(-(f-a)/9)*amp;

const Gear:React.FC<{x:number;y:number;r:number;angle:number;c?:string}>=({x,y,r,angle,c='#BC8D35'})=>(
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    {Array.from({length:16},(_,i)=><rect key={i} x={-r*.15} y={-r*1.1} width={r*.30} height={r*.35} rx={4} fill={c} transform={`rotate(${i*22.5})`}/>)}
    <circle r={r*.94} fill={c} stroke='#775622' strokeWidth={6}/>
    <circle r={r*.64} fill='#7C5D2D' stroke='#EBC16B' strokeWidth={5}/>
    {[0,1,2,3,4].map(i=><rect key={i} x={-r*.075} y={-r*.60} width={r*.15} height={r*.60} rx={5} fill={c} transform={`rotate(${i*72})`}/>)}
    <circle r={r*.22} fill='#EDD395' stroke='#5F481F' strokeWidth={7}/>
    <path d={`M${-r*.1} 0 H${r*.1}`} stroke='#594526' strokeWidth={5}/>
  </g>
);

const TaskIcon:React.FC<{i:number;x:number;y:number;s?:number;progress?:number}>=({i,x,y,s=1,progress=1})=>(
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={progress}>
    {i===0?<><path d='M-27 -13 L12 -31 V28 L-27 11 Z' fill='#F4DFAD' stroke='#723C20' strokeWidth={5}/><rect x='-42' y='-14' width='18' height='28' rx='5' fill='#C05D37'/><path d='M-13 12 L-6 36' stroke='#783F25' strokeWidth={10}/><path d='M22 -18 L40 -27 M23 0 H46 M22 18 L40 27' stroke='#DC9545' strokeWidth={5}/></>:
    i===1?<><rect x='-29' y='-40' width='58' height='80' rx='10' fill='#315E6B' stroke='#9EE0DD' strokeWidth={4}/><rect x='-22' y='-29' width='44' height='48' rx='4' fill='#F1E4BD'/><path d='M-6 -17 L13 -5 L-6 8Z' fill='#D66F46'/><circle cy='29' r='4' fill='#AEE3DF'/></>:
    i===2?<><path d='M-36 26 L24 -34 L38 -20 L-22 40 L-40 44Z' fill='#E8BE64' stroke='#6B3B75' strokeWidth={5}/><path d='M17 -27 L31 -13' stroke='#F5E7BD' strokeWidth={8}/><path d='M-39 43 L-31 24 L-20 36Z' fill='#443346'/></>:
    i===3?<><rect x='-40' y='-32' width='80' height='65' rx='6' fill='#E5E5C4' stroke='#255E4B' strokeWidth={5}/><path d='M-24 16 V-2 M0 16 V-18 M24 16 V-8' stroke='#489875' strokeWidth={12}/></>:
    <><rect x='-39' y='18' width='80' height='17' rx='5' fill='#673A29'/><g transform='rotate(-30)'><rect x='-5' y='-17' width='12' height='56' rx='4' fill='#BA8F51'/><rect x='-30' y='-34' width='60' height='26' rx='6' fill='#9A583D' stroke='#EDC58D' strokeWidth={4}/></g></>}
  </g>
);

export const DeptArtifact:React.FC<{i:number;x:number;y:number;s?:number;rot?:number}>=({i,x,y,s=1,rot=0})=>(
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
        {i===0?<>
          <path d='M-53 -66 H38 L58 -44 V65 H-53Z' fill='#F5DC9F' stroke='#A15D37' strokeWidth='5'/>
          <circle cy='-19' r='25' fill='#D57850'/><path d='M-35 25 H35 M-35 41 H13' stroke='#885235' strokeWidth='8'/>
        </>:i===1?<>
          <rect x='-41' y='-72' width='82' height='145' rx='15' fill='#2C606B' stroke='#AFD9CC' strokeWidth='6'/>
          <rect x='-30' y='-55' width='60' height='91' rx='6' fill='#E8D7A8'/><path d='M-12 -31 L22 -10 L-12 13Z' fill='#D77650'/><circle cy='54' r='7' fill='#AFE0D5'/>
        </>:i===2?<>
          <path d='M-62 -59 L51 -70 L62 58 L-50 70Z' fill='#8675A5' stroke='#E7D6AC' strokeWidth='5'/>
          <path d='M-43 -44 H33 V-17 H-43Z M-43 -4 H-12 V41 H-43Z M1 -4 H37 V12 H1Z M1 26 H37 V41 H1Z' fill='#DCD7C8'/>
        </>:i===3?<>
          <path d='M-60 -61 Q-28 -71 0 -58 Q28 -71 60 -61 V65 Q28 55 0 69 Q-28 55 -60 65Z' fill='#F1E5B7' stroke='#467B5B' strokeWidth='5'/>
          <path d='M0 -58 V69' stroke='#A0A379' strokeWidth='4'/><path d='M-43 39 V-4 M-23 39 V-32 M21 39 V-15 M42 39 V-44' stroke='#4E9871' strokeWidth='11'/>
        </>:<>
          <path d='M-47 -72 H44 V69 H-47Z' fill='#F1E1B7' stroke='#9F7250' strokeWidth='5'/>
          <path d='M-57 -71 H54 M-57 69 H54' stroke='#8A5738' strokeWidth='12' strokeLinecap='round'/><path d='M-30 -45 H28 M-30 -28 H28 M-30 -11 H16' stroke='#A29777' strokeWidth='6'/><circle cy='34' r='19' fill='#B4553E'/><path d='M-8 34 L-2 40 L10 26' fill='none' stroke='#EFD192' strokeWidth='5'/>
        </>}
  </g>
);

const Agent:React.FC<{f:number;i:number;at:number}>=({f,i,at})=>{
  const t=f-at, travel=ease(f,at,at+21), work=ease(f,at+25,at+48);
  if(t<0)return null;
  const x=650+(242+i*146-650)*travel;
  const y=472+(692-472)*travel-Math.sin(travel*Math.PI)*145;
  const land=kick(f,at+21,1), squash=t>=21&&t<30?1-Math.sin((t-21)/9*Math.PI)*.19:1;
  const bend=work>0?Math.sin(Math.min(1,work)*Math.PI)*-13:0;
  const sz=157;
  const made=ease(f,at+29,at+51);
  return <>
    <Contact x={x-56} y={699} w={112} o={.38*travel} z={68}/>
    {made>0&&<svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:70,pointerEvents:'none'}}>
      <DeptArtifact i={i} x={x+35*(1-made)} y={632-178*made} rot={(1-made)*(i%2?24:-24)} s={.6+made*.4}/>
    </svg>}
    <div style={{position:'absolute',left:x-sz/2,top:y-sz+land*10,width:sz,height:sz,zIndex:74+i,transform:`rotate(${(1-travel)*(i%2?34:-32)+bend}deg) scale(${1+(1-squash)*.35},${squash})`,transformOrigin:'50% 100%'}}>
      <Mascot lf={f+i*9} size={sz} nodAmp={1.5} gaze={t<21?-.4:.6} shock={t<24?1:0} cheer={work>.7?1:0} stern={work>.15&&work<.7?1:0} {...DEPTS[i].costume}/>
    </div>
    <svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:84,pointerEvents:'none'}}>
      {travel>.95&&<>
        <path d={`M${x+32} ${y-66} L${x+65} ${y-59+Math.sin(work*Math.PI*3)*8}`} stroke='#BD613F' strokeWidth='11' strokeLinecap='round'/>
        <g transform={`rotate(${i===4?Math.sin(work*Math.PI*3)*-32:Math.sin(work*Math.PI*2)*9} ${x+67} ${y-67})`}>
          <TaskIcon i={i} x={x+67} y={y-67+Math.sin(work*Math.PI*3)*8} s={.57} progress={ease(f,at+20,at+25)}/>
        </g>
      </>}
      {work>.65&&<g transform={`translate(${x+38} ${y-137}) scale(${E(work,.65,1,.2,1,OUT)})`}><circle r='16' fill='#3D8663' stroke='#E2F0B5' strokeWidth='3'/><path d='M-8 0 L-2 6 L9 -7' fill='none' stroke='#FFF4CD' strokeWidth='4' strokeLinecap='round'/></g>}
    </svg>
  </>;
};

export const DeptHookPolish:React.FC<{dur:number}>=({dur})=>{
  const f=useCurrentFrame();
  const release=ease(f,57,75), handoff=ease(f,78,115);
  // Motion exists before the push: lever's angular velocity is non-zero at f0.
  const compression=(Math.sin((f+4)*.16)*.5+.5)*(1-release);
  const armA=(-115+compression*45)*Math.PI/180;
  const hx=453+Math.cos(armA)*163,hy=626+Math.sin(armA)*163;
  const operatorX=260-handoff*144+compression*24*(1-handoff),ground=703,sz=368-handoff*188;
  const lean=(compression*19-9)*(1-handoff);
  const recoil=kick(f,63,18);
  const actorY=ground-sz+compression*47-recoil;
  const driveAngle=24+(f<57?f*6.6:376.2+(f-57)*1.45+92.7*(1-Math.exp(-(f-57)/18)));
  return <Scene p={asPlace('shop')} slug='' push={[0,dur,1.065]} vig={.12}>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#F2E5B9 0%,#D1C49D 55%,#A69163 100%)',zIndex:5}}/>
    <svg viewBox='0 0 1012 792' width={1012} height={792} style={{position:'absolute',inset:0,zIndex:10}}>
      <defs><linearGradient id='dh-metal' x2='0' y2='1'><stop stopColor='#6AABA4'/><stop offset='.52' stopColor='#337E78'/><stop offset='1' stopColor='#184B48'/></linearGradient><linearGradient id='dh-bench' x2='0' y2='1'><stop stopColor='#D2AD6E'/><stop offset='1' stopColor='#715334'/></linearGradient></defs>
      {/* Architecture, practical light, service channels and bench are separate depth planes. */}
      <path d='M0 198 H1012 M0 370 H1012 M0 540 H1012' stroke='#A9976B' strokeWidth='5'/>
      {[104,338,572,806].map(x=><g key={x}><path d={`M${x} 0 V718`} stroke='#C1AE7D' strokeWidth='9'/><path d={`M${x-7} 0 V718`} stroke='#FAEDC7' strokeWidth='3'/></g>)}
      <path d='M0 720 H1012 V792 H0Z' fill='url(#dh-bench)'/><path d='M0 720 H1012' stroke='#F7DBA1' strokeWidth='12'/>
      <path d='M78 185 H936 V211 H78Z' fill='#354B43'/><path d='M101 200 H913' stroke='#FFF5CF' strokeWidth='9'/>
      <path d='M128 205 L27 706 H984 L880 205Z' fill='#FFF5D7' opacity='.12'/>
      <path d='M96 250 Q296 216 504 382' stroke='#715B37' strokeWidth='26' fill='none'/>
      <path d='M96 241 Q296 207 504 373' stroke='#D9C894' strokeWidth='9' fill='none'/>
    </svg>
    <svg viewBox='0 0 1012 792' width={1012} height={792} style={{position:'absolute',inset:0,zIndex:20}}>
      <g transform={`translate(0 ${release*8})`}>
        <path d='M491 318 L867 318 L909 656 H470Z' fill='#223E34' opacity='.3' transform='translate(9 15)'/>
        <Gear x={803} y={377} r={112} angle={-driveAngle*.85}/>
        <Gear x={853} y={553} r={76} angle={driveAngle*1.2} c='#D0A750'/>
        <path d='M478 322 Q478 294 506 294 H728 Q760 294 767 327 L809 649 H445Z' fill='url(#dh-metal)' stroke='#184C45' strokeWidth='8'/>
        <path d='M489 330 H736 L746 360 H484Z' fill='#BDE0C0' opacity='.5'/>
        <rect x='493' y='383' width='235' height='172' rx='21' fill='#143D36' stroke='#8DB4A0' strokeWidth='6'/>
        <rect x='510' y='400' width='201' height='139' rx='13' fill='#FFF1C5'/>
        <path d='M489 589 H754 L769 622 H477Z' fill='#112F2A'/>
        {[0,1,2,3].map(i=><g key={i} transform={`translate(${496+i*78} 646)`}><circle r='8' fill='#B9C6AB'/><path d='M-5 0 H5' stroke='#3D5447' strokeWidth='3'/></g>)}
        {/* Five physical sockets fill on distinct beats, rather than one text counter. */}
        {[0,1,2,3,4].map(i=>{
          const at=8+i*12, k=ease(f,at-4,at+2),fly=ease(f,61+i*6,77+i*6);
          return <g key={i} transform={`translate(${528+i*37} ${440-kick(f,at+9,7)})`}>
            <rect x='-10' y='-10' width='32' height='60' rx='5' fill='#D8C99C' stroke='#9B916F' strokeWidth='2'/>
            <g opacity={(1-fly)*k} transform={`translate(0 ${-60*(1-k)})`}><rect x='-8' y='-8' width='28' height='55' rx='4' fill={colours[i]}/><path d='M-1 4 H13 M-1 14 H11 M-1 24 H14' stroke='#F7E3BC' strokeWidth='4'/></g>
            {k>.96&&fly<.2&&<circle cx='6' cy='62' r='5' fill='#59875C'/>}
          </g>;
        })}
        <path d={`M484 570 H735`} stroke='#182E27' strokeWidth='16'/>
        <path d={`M486 570 H${486+249*ease(f,4,60)}`} stroke='#D8B453' strokeWidth='9'/>
      </g>
      {/* The piston and crank share the actor's force; no decorative free-running handle. */}
      <path d={`M453 626 L${hx} ${hy}`} stroke='#654929' strokeWidth='27' strokeLinecap='round'/>
      <path d={`M451 622 L${hx-2} ${hy-4}`} stroke='#D6B465' strokeWidth='12' strokeLinecap='round'/>
      <circle cx='453' cy='626' r='38' fill='#B98A42' stroke='#314E42' strokeWidth='9'/>
      <circle cx={hx} cy={hy} r='29' fill='#B85336' stroke='#F2A16E' strokeWidth='6'/>
      <path d={`M458 625 L${494+compression*40} 572`} stroke='#BBC5A7' strokeWidth='16'/>
    </svg>
    {/* Large readable inputs move from the working rail into individual sockets.
        The first is mid-flight at f0; five arrivals drive five stored modules. */}
    <svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:34,pointerEvents:'none'}}>
      {[0,1,2,3,4].map(i=>{
        const at=-18+i*12,t=ease(f,at,at+26);
        if(f<at||t>=1)return null;
        const x=138+(538+i*37-138)*t,y=263+177*t-Math.sin(t*Math.PI)*95;
        const s=1.16-t*.93;
        return <g key={i} transform={`translate(${x} ${y}) rotate(${-17+t*17}) scale(${s})`}>
          <rect x='-72' y='-68' width='145' height='162' rx='6' fill='#60513A' opacity='.24' transform='translate(7 10)'/>
          <path d='M-72 -68 H45 L73 -38 V94 H-72Z' fill='#FFF4D7' stroke='#8F7544' strokeWidth='4'/>
          <path d='M45 -67 V-38 H72' fill='#D4BB83'/>
          <text x='-57' y='-23' fill='#493F29' fontFamily='monospace' fontWeight='900' fontSize='23'>SKILL.md</text>
          <path d='M-55 -4 H50 M-55 12 H30 M-55 28 H43 M-55 44 H8' stroke='#918269' strokeWidth='7'/>
          <rect x='-55' y='60' width='52' height='18' rx='3' fill={colours[i]}/>
        </g>;
      })}
    </svg>
    <Mark x={657} y={337} s={58} z={37}/>
    <Contact x={operatorX-sz*.35} y={ground+7} w={sz*.72} o={.45} z={45}/>
    <div style={{position:'absolute',left:operatorX-sz/2,top:actorY,width:sz,height:sz,zIndex:55,transform:`rotate(${lean}deg) scaleY(${1-compression*.055})`,transformOrigin:'50% 100%'}}>
      <Mascot lf={f} size={sz} nodAmp={2} gaze={.9-handoff*.6} stern={f<62?1:0} shock={f>=62&&f<80?1:0} cheer={f>=80?1:0}/>
    </div>
    {handoff<.65&&<svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:56,opacity:1-handoff}}><path d={`M${operatorX+sz*.38} ${actorY+sz*.46} Q${hx-45} ${hy+60} ${hx} ${hy}`} fill='none' stroke='#BD613F' strokeWidth={sz*.072} strokeLinecap='round'/></svg>}
    {/* The machine label identifies the free resource, not a price for inference. */}
    <div style={{position:'absolute',left:495,top:326,zIndex:38,...mono(22,800),color:'#F7EAC4'}}>SKILL PACKS</div>
    {[0,1,2,3,4].map(i=><Agent key={i} f={f} i={i} at={63+i*7}/>)}
    <svg width={1012} height={792} style={{position:'absolute',inset:0,zIndex:90,pointerEvents:'none'}}>
      <path d='M0 0 H46 V792 H0Z M980 0 H1012 V792 H980Z' fill='#554A30'/>
      <path d='M46 0 H53 V792 H46Z M973 0 H980 V792 H973Z' fill='#E3CB92'/>
      <rect x='63' y='751' width='887' height='19' rx='5' fill='#5C4930'/>
      <path d='M67 751 H946' stroke='#E8C88B' strokeWidth='4'/>
    </svg>
  </Scene>;
};
