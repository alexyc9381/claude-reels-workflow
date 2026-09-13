import {staticFile} from './assets';
import React from 'react';
import {Img} from 'remotion';
import {Actor,Burst,E,O,P,Set,Tool,pulse,recoil} from './EC150Kit';
import {Logo} from './EC150Revision';

// Identity is fully visible from frame zero, on the operated prop rather than
// waiting for the later GitHub payoff. This is an audience signal, not a fade-in.
const ClaudePlate:React.FC<{x:number;y:number}>=({x,y})=><div style={{position:'absolute',left:x,top:y,width:190,height:162,boxSizing:'border-box',background:'#FFF9EC',border:'5px solid #385448',borderRadius:22,boxShadow:'0 7px 0 #263D39'}}><Img src={staticFile('logos/claude.svg')} style={{position:'absolute',left:28,top:14,width:124,height:124}}/>{[12,162].map(left=><div key={left} style={{position:'absolute',left,top:12,width:7,height:7,borderRadius:'50%',background:'#BCA97D'}}/>)}</div>;

// Hook B: lateral attraction → consolidation → a powered operator takes control.
// Each tool has a source, a curved path, a contact, and a visible destination.
export const MagnetHook:React.FC<{f:number}>=({f})=>{
  const wind=E(f,-7,12), pull=E(f,13,49), recoilF=pulse(f,49,16), charge=O(f,48,61), lift=E(f,62,82), launch=E(f,82,106);
  const mx=288+wind*37-pull*49+recoilF*19-lift*35-launch*117, my=125-wind*24+pull*43+lift*162-launch*29;
  const hx=272-wind*17-pull*44+lift*66+launch*183, hy=708-pulse(f,8,22)*10-recoilF*22-launch*72;
  const dark=O(f,47,59)*.8;
  const hs=385+launch*90,hl=wind*12-pull*20+recoilF*12+lift*24+launch*14;
  const hr=hl*Math.PI/180,armX=hx+hs*(.33*Math.cos(hr)+.47*Math.sin(hr)),armY=hy+hs*(.33*Math.sin(hr)-.47*Math.cos(hr));
  const handoff=E(f,49,65),handX=(mx+47)*(1-handoff)+(490+lift*235+launch*40)*handoff,handY=(my+239)*(1-handoff)+(411-lift*85+launch*80)*handoff;
  return <Set kind={0} f={f}>
    <P w={1012} h={792} z={6} style={{background:'#071629',opacity:dark}}/>
    {[0,1,2].map(i=>{const at=6+i*9, t=O(f,at,at+23), vanish=O(f,at+21,at+29), x=757+(i===1?31:-5)+(530-757)*t, y=135+i*192+(260-(135+i*192))*t-Math.sin(t*Math.PI)*(i===2?-53:65);return <React.Fragment key={i}>
      <P x={718} y={128+i*193} w={230} h={174} z={12} style={{opacity:1-O(f,at+22,at+35),transform:`translateX(${t*20}px)`}}><svg viewBox="0 0 230 174"><rect x="7" y="9" width="212" height="152" rx="15" fill="#F7ECD4" stroke="#698C7D" strokeWidth="7"/><path d="M25 136H207M46 139V174M181 139V174" stroke="#4C6B64" strokeWidth="11"/></svg></P>
      {f>at&&f<at+25&&<P x={470} y={30+i*125} w={365} h={290} z={24}><svg viewBox="0 0 365 290"><path d={`M330 ${50+i*17}Q180 ${i===2?250:15} 35 ${205-i*71}`} fill="none" stroke="#F4D68C" strokeWidth="6" strokeDasharray="15 18" strokeDashoffset={-f*9} opacity=".75"/></svg></P>}
      <Tool x={x} y={y} s={154*(1-vanish*.97)} type={i===2?3:i} rot={-10+i*9+t*(i===1?-134:109)} z={40}/>
      <Burst f={f} at={at+23} x={550} y={317} r={90}/>
    </React.Fragment>})}
    <Actor x={hx} y={hy} s={hs} f={f} costume="suit" lean={hl} gaze={9-launch*10} shock={recoilF} stern={wind*(1-charge)+charge*.7} cheer={charge*.65} squash={recoilF*.65} glowEyes={charge} capeC="#AD493C"/>
    {/* A tracked bent arm attaches the operator to the magnet's rear grip. */}
    <P w={1012} h={792} z={57}><svg width="1012" height="792"><path d={`M${armX} ${armY+5}Q${mx-60+handoff*230} ${my+320-handoff*12} ${handX} ${handY+5}`} fill="none" stroke="#733B2D" strokeWidth="43" strokeLinecap="round"/><path d={`M${armX} ${armY}Q${mx-60+handoff*230} ${my+310-handoff*12} ${handX} ${handY}`} fill="none" stroke="#D97757" strokeWidth="31" strokeLinecap="round"/></svg></P>
    <P x={mx} y={my} w={360} h={374} z={58} rot={-13+wind*13-pull*7+lift*27-launch*19} style={{transformOrigin:'12% 64%'}}><svg viewBox="0 0 360 374" style={{overflow:'visible'}}><defs><linearGradient id="magmetal"><stop stopColor="#F7D99E"/><stop offset=".48" stopColor="#BA683F"/><stop offset="1" stopColor="#E5A068"/></linearGradient></defs><path d="M329 47H168C-20 47-20 322 168 322H329V222H167C104 222 104 147 167 147H329Z" fill="#482E2E" transform="translate(0 12)"/><path d="M329 37H168C-20 37-20 312 168 312H329V212H167C104 212 104 137 167 137H329Z" fill="url(#magmetal)" stroke="#3E3A31" strokeWidth="9"/><path d="M326 37H263V137H326ZM326 212H263V312H326Z" fill="#DFE4DA" stroke="#435C5C" strokeWidth="8"/><path d="M53 151V215" stroke="#F8D49A" strokeWidth="12" strokeLinecap="round"/>{charge>0&&<path d={`M317 123L${292+Math.sin(f)*17} 167L338 182L307 228`} stroke="#FFF0A3" strokeWidth="13" fill="none" opacity={1-lift}/>}</svg><ClaudePlate x={-20} y={83}/></P>
    {charge>0&&<>
      <P x={416+lift*210+launch*30} y={235-lift*86+launch*55} w={185+lift*42+launch*80} h={185+lift*42+launch*80} z={65} scale={O(f,47,59,.25,1)} rot={-12+lift*18-launch*18} style={{filter:`drop-shadow(0 0 ${22+Math.sin(f*.5)*6}px #F6D97C)`}}><Logo s={185+lift*42+launch*80}/></P>
      {[0,1,2].map(i=>{const en=O(f,65+i*5,78+i*5),run=E(f,84+i*3,108+i*3);return <P key={i} w={1012} h={792} z={25+i} style={{opacity:en,transform:`translateY(${(1-en)*60}px)`}}><Actor x={700+i*69+run*(i-1)*207} y={646-i*86+run*285} s={150+en*20+run*110} f={f+i*5} costume={['prof','constr','cop'][i]} lean={en*10+run*(i-1)*19} gaze={-6+run*8} cheer={en} glowEyes={en*.65} walk={1} z={25+i}/><P x={690+i*69} y={627-i*86} w={100} h={11} z={23} style={{background:'#FADEA1',opacity:(1-run)*en,filter:'blur(8px)'}}/></P>})}
    </>}
    <Burst f={f} at={50} x={545} y={312} r={185}/>
  </Set>;
};

// Hook C: a vertical pull peels the room open; a workforce then advances in depth.
// The zipper slider, operator hand, teeth and peeled panels share one driver.
export const ZipperHook:React.FC<{f:number}>=({f})=>{
  const drag=E(f,-11,43), zipY=235+drag*425, open=O(f,-2,55), back=E(f,46,67), rush=E(f,69,106);
  const heroX=725+drag*12+back*141,heroY=548+drag*183-back*11;
  const hs=320+drag*30-back*60,hl=-19-drag*14+back*47-rush*12,hr=hl*Math.PI/180;
  const armX=heroX+hs*(-.33*Math.cos(hr)+.47*Math.sin(hr)),armY=heroY+hs*(-.33*Math.sin(hr)-.47*Math.cos(hr));
  const tabAngle=(-8+drag*12+back*57)*Math.PI/180;
  const wristX=507+back*237-51.5*Math.sin(tabAngle),wristY=zipY+16.5-back*41+51.5*Math.cos(tabAngle);
  const gapAt=(y:number)=>Math.max(0,Math.min(1,(zipY-y)/170))*open*(335+back*82);
  const edge=(side:number)=>Array.from({length:25},(_,i)=>{const y=i*33;return `${i?'L':'M'}${506+side*gapAt(y)} ${y}`}).join(' ');
  return <Set kind={0} f={f}>
    {/* The room behind the zip is visible only where the two real panels separate. */}
    <P x={87} y={48} w={840} h={699} z={7} style={{background:'radial-gradient(ellipse at 50% 20%,#629B8E,#142F3E 70%)'}}><svg viewBox="0 0 840 699"><path d="M420 80L5 699M420 80L200 699M420 80L640 699M420 80L840 699" stroke="#77B9A1" strokeWidth="4" opacity=".5"/>{[310,390,505,650].map(y=><path key={y} d={`M0 ${y}H840`} stroke="#79AE9B" strokeWidth="4" opacity=".45"/>)}</svg></P>
    {[0,1,2,3,4].map(i=>{const at=24+i*5, wake=O(f,at,at+11), step=E(f,55+i*3,83+i*3), run=E(f,75+i*2,111+i*2), baseX=506+(i-2)*98;
      return <React.Fragment key={i}>
        <Actor x={baseX+(i-2)*(step*21+run*79)} y={481+(i%2)*104+step*44+run*283} s={215+wake*18+step*30+run*147} f={f+i*7} costume={['prof','cop','suit','chef','constr'][i]} lean={(i-2)*(-2+step*4)+run*(i-2)*8} gaze={(2-i)*3} stern={(1-wake)*.7} shock={pulse(f,at,16)} cheer={wake*.85} glowEyes={wake*(.8+.1*Math.sin(f*.3+i))} walk={step} z={f>72&&i===2?35:10+(i===2?3:i%2)}/>
        <Tool x={baseX-88+(i-2)*(step*21+run*79)} y={461+(i%2)*104+step*30+run*240} s={87+step*23+run*49} type={i%4} rot={-17+(i-2)*step*11-run*29} z={14}/>
      </React.Fragment>;
    })}
    <P w={1012} h={792} z={30}><svg width="1012" height="792" style={{overflow:'visible'}}><defs><linearGradient id="zipwall"><stop stopColor="#F7E9C4"/><stop offset="1" stopColor="#C0BB91"/></linearGradient></defs>
      <path d={`M0 0H${506-gapAt(0)} ${edge(-1).replace(/^M[^L]+/,'')}H0Z`} fill="url(#zipwall)"/>
      <path d={`M1012 0H${506+gapAt(0)} ${edge(1).replace(/^M[^L]+/,'')}H1012Z`} fill="url(#zipwall)"/>
      {/* Inset window halves travel with the peeling wall rather than floating. */}
      {[-1,1].map(side=><g key={side} transform={`translate(${side*open*344} 0)`}><path d={`M${side<0?79:665} 193V429H${side<0?345:931}V193Q${side<0?213:798} 92 ${side<0?79:665} 193Z`} fill="#E9DBB6" stroke="#919C7D" strokeWidth="13"/><path d={`M${side<0?215:798} 159V434M${side<0?82:671} 302H${side<0?344:929}`} stroke="#A7AC8B" strokeWidth="12"/></g>)}
      <path d={edge(-1)} fill="none" stroke="#887149" strokeWidth="41"/><path d={edge(1)} fill="none" stroke="#887149" strokeWidth="41"/>
      {Array.from({length:29},(_,i)=>{const y=i*29;return [-1,1].map(side=><rect key={`${i}-${side}`} x={506+side*gapAt(y)+(side<0?-21:3)} y={y} width={22} height={16} rx="4" fill="#E8C57D" stroke="#534E3B" strokeWidth="3" transform={`rotate(${side*open*(y<zipY?13:0)} ${506+side*gapAt(y)} ${y})`}/>);})}
    </svg></P>
    <Actor x={heroX} y={heroY} s={hs} f={f} costume="glasses" lean={hl} gaze={-9} stern={1-open} shock={pulse(f,31,17)} cheer={open*.9} squash={pulse(f,35,16)*.6} z={40}/>
    {/* The pulling hand is tracked to the tab throughout the vertical stroke. */}
    <P w={1012} h={792} z={42}><svg width="1012" height="792"><path d={`M${armX} ${armY+5}Q${595+back*144} ${350+drag*334} ${wristX} ${wristY+7}`} fill="none" stroke="#703B2E" strokeWidth="39" strokeLinecap="round"/><path d={`M${armX} ${armY}Q${595+back*144} ${342+drag*334} ${wristX} ${wristY}`} fill="none" stroke="#D97757" strokeWidth="28" strokeLinecap="round"/></svg></P>
    <P x={442+back*237} y={zipY-87-back*41} w={130} h={207} z={43} rot={-8+drag*12+back*57}><svg viewBox="0 0 130 207"><path d="M31 10H98L123 89L99 116H29L7 89Z" fill="#D7AF65" stroke="#554E37" strokeWidth="8"/><rect x="27" y="51" width="77" height="143" rx="29" fill="#F0D49A" stroke="#554E37" strokeWidth="8"/><rect x="45" y="137" width="40" height="38" rx="10" fill="#80633B"/></svg><ClaudePlate x={-30} y={-32}/></P>
    <Burst f={f} at={43} x={506} y={688} r={113}/>
    {/* Once the zip finishes, the middle specialist catches the repository seal
        and leads the advancing crew into the unchanged team scene. */}
    {f>59&&<P x={438-rush*9} y={398+O(f,59,76,-100,0)+rush*245} w={139+ rush*61} h={139+rush*61} z={36} rot={-14+O(f,59,77,0,14)+rush*7} scale={O(f,59,72,.1,1)}><Logo s={139+rush*61}/></P>}
  </Set>;
};
