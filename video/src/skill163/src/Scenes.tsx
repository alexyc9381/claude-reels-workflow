import React from 'react';
import {P,T,E,S,PULSE,settle,Clay,Logo,Shadow,Emphasis,Tool,Website,Keyboard,Cursor,C} from './Visuals';
import {Set,Skill,Hero,Brain,Robot,Rocket,Bolt,Pack} from './RevisionAssets';
import {ContextProp,Energy} from './ActionAssets';

import {BuilderSkill} from './BuilderSkill';
import {PowerSnack} from './PowerSnack';

export function Hook({t}:{t:number}){
 const reach=E(t,.15,.14),pull=E(t,.36,.15),fan=E(t,.59,.22),dark=S(t,.40,.16),fade=1-S(t,.50,.14);
 return <Set name="skill-vault" scale={1+E(t,0,.38)*.035}>
  <P w={1012} h={792} style={{background:'#EDF0DA',opacity:.64*(1-dark)}}/>
  <P w={1012} h={792} style={{background:'#061726',opacity:dark*.86}}/>
  {/* One deep archive: staggered file edges recede behind a readable leading skill. */}
  <P x={0} y={0} style={{opacity:fade}}>
   <svg width="1012" height="792" style={{position:'absolute',left:0,top:0}}>{Array.from({length:42},(_,j)=>{const i=41-j,p=(i+t*32)%42,d=p/42;return <g key={j} transform={`translate(${565+280*d} ${187-76*d}) scale(${1-.64*d})`} opacity={1-d*.70}><path d="M0 0H208L248 40V305H0Z" fill={['#EEE1B9','#A2C5B6','#B9BAD0'][i%3|0]} stroke="#2D646B" strokeWidth="5"/><path d="M208 0V42H248M25 78H188M25 102H167" fill="none" stroke="#456E70" strokeWidth="6"/></g>})}</svg>
   <BuilderSkill x={514-80*pull} y={218+43*pull-10*Math.sin(t*8)} w={285} kind={0} t={t+.5} rot={-7-10*pull}/>
  </P>
  {/* Claude reaches once, then draws the selected stack toward him. */}
  <Hero x={-12+32*pull} y={426-14*pull} size={320} t={t} rot={-7*reach+9*pull+5*PULSE(t,.36,.20)} shock={t<.32?.5:0} cheer={fan*.6}/>
  {reach>0&&fan<1&&<svg width="1012" height="792" style={{position:'absolute',left:0,top:0}}><path d={`M280 582Q${280+130*reach} ${582-110*reach} ${280+292*reach-174*pull} ${582-95*reach+57*pull}`} fill="none" stroke="#D97757" strokeWidth="38" strokeLinecap="square" opacity={1-fan}/></svg>}
  {[2,1,0].map(i=>{const at=1.48+i*.22,hit=PULSE(t,at,.29),locked=E(t,at,.14),q=E(t,.49+i*.06,.12),burst=PULSE(t,.60+i*.06,.28),x=473+(260+i*241-473)*fan-10*hit,y=245-45*fan-27*burst-56*hit-24*PULSE(t,.80+i*.11,.48);
   const tone=['#86DDBF','#EAC978','#C9A4E5'][i];
   return <P key={i} x={0} y={0} style={{opacity:q*(t>=1.48&&t<at?.52:1),filter:`drop-shadow(0 0 ${8+13*burst+22*hit}px ${tone})`}}>
    <BuilderSkill x={x} y={y} w={220+14*burst+20*hit} kind={i} t={t-.49-i*.06} rot={(-8+i*8)*(1-fan)+Math.sin(t*4+i)*1.5*fan+(i-1)*7*hit+5*PULSE(t,.80+i*.11,.48)}/>
    {locked>0&&<P x={x+77} y={y+288+23*(1-locked)} w={72} h={72} style={{transform:`scale(${locked+.18*hit})`,borderRadius:'50%',background:tone,border:'5px solid #FFF0D0',boxShadow:'0 6px 0 #062233',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter',fontSize:49,fontWeight:900,color:'#143C46'}}>{i+1}</P>}
   </P>})}

 </Set>
}
export function Library({t}:{t:number}){
 const arrival=S(t,-.13,.72),browse=E(t,2.15,1.80),follow=S(t,5.16,.88),task=E(t,.9,.48),search=S(t,1.65,1.6),match=E(t,4.0,.27),install=E(t,5.12,.25),boot=E(t,5.27,.4),deliver=E(t,5.62,.35);
 const work=S(t,2.10,.16)*(1-S(t,4.02,.25));
 return <Set name="skill-foundry" scale={1+.025*work}>
  <P x={328+95*(1-arrival)} y={154+72*(1-arrival)-240*E(t,4.36,.46)} w={606} h={412} style={{transform:`scaleY(${1-E(t,4.36,.46)*.48})`,transformOrigin:'top',background:'#EFDDB1',border:'10px solid #906232',borderRadius:19,boxShadow:'0 18px 0 #041D27'}}>
   <P x={19} y={14}><Logo name="github" size={48}/></P><T x={84} y={16} size={28} c="#223E44">anthropics/skills</T>
   <P x={17} y={81} w={551} h={80} style={{background:'#FFFAE9',border:'3px solid #C3BA98',borderRadius:11,overflow:'hidden'}}><T x={21} y={26} size={27} c="#355757">{t>.95?'Build a website'.slice(0,Math.floor(task*15)):'What are you building?'}</T><P x={482} y={14} w={48} h={48} style={{background:C.teal,borderRadius:9}}><svg width="48" height="48"><circle cx="21" cy="19" r="10" stroke="#F8EBC8" strokeWidth="4" fill="none"/><path d="M28 27L38 37" stroke="#F8EBC8" strokeWidth="5"/></svg></P></P>
   <P x={10} y={178} w={563} h={206} style={{overflow:'hidden',background:'#071E2D',borderRadius:8}}>{Array.from({length:19},(_,i)=>{const px=18+i*111-browse*999,focus=Math.max(0,1-Math.abs(px-235)/230);return <P key={i} x={px-(match*(i===11?0:220)*(i<11?-1:1))} y={27-21*focus+match*(i===11?0:225)} style={{opacity:i===11?1:1-match,transform:`rotate(${work*Math.max(-14,Math.min(14,(px-235)/22))}deg) scale(${1+.13*focus*work})`,transformOrigin:'50% 80%',filter:focus>.8&&work>.1?'drop-shadow(0 0 8px #F2D073)':'none'}}><Skill x={0} y={5} w={107} color={['#B57440','#9B574D','#2C7A73','#79678E','#A38C3E'][i%5]} title={i===11?'BUILD':['WRITE','DESIGN','BUILD','PLAN','DATA'][i%5]}/></P>})}</P>
   {search>0&&match<.99&&<P x={t<2.15?22+Math.sin(search*Math.PI)*340:235} y={183} w={128} h={178} style={{border:'7px solid #E3AD44',borderRadius:9}}/>}
  </P>
  <P x={328-36*follow+170*(1-install)} y={153-13*follow} style={{opacity:install}}><Website x={0} y={0} w={602+55*follow} h={391+36*follow} stage={boot>.55?2:boot>.04?1:0} scroll={follow*.48} assemble={E(t,4.62,.82)}/></P>
  <Clay t={t} x={-63+116*arrival+37*task+50*match-47*deliver} y={354-30*PULSE(t,3.15,.4)+21*PULSE(t,.95,.66)-12*Math.sin(browse*16)*work} size={407} gaze={1+5*Math.sin(browse*20)*work} role="writer" rot={-5*PULSE(t,.92,.45)+7*PULSE(t,4.1,.5)+5*Math.sin(browse*18)*work} cheer={boot*.5} stern={search>.1&&match<.8?.4:0}/>
  <Keyboard x={381} y={586} w={437} press={t} active={(t>.86&&t<1.45)||(t>2.1&&t<4.05)||(t>4.55&&t<5.9)}/>
  {work>0&&<svg width="1012" height="792" style={{position:'absolute',left:0,top:0,opacity:work}}><path d={`M439 558Q470 566 507 ${602+6*Math.sin(t*32)}M133 558Q239 569 391 ${603-6*Math.sin(t*32)}`} stroke="#D97757" strokeWidth="27" fill="none" strokeLinecap="square"/><circle cx="883" cy="618" r="36" fill="#154652" stroke="#D1B16C" strokeWidth="7"/><g transform={`rotate(${browse*1800} 883 618)`}><path d="M883 589V604M883 632V647M854 618H869M897 618H912" stroke="#F5E0AE" strokeWidth="5"/><circle cx="883" cy="594" r="6" fill="#88CDB4"/></g></svg>}
  {t>4.1&&t<5.5&&<Skill x={520-135*S(t,4.12,1.0)} y={310+S(t,4.12,1.0)*238} w={180*(1-.56*S(t,4.12,1.0))} title="BUILD" color="#2C7A73" rot={install*-28} lit={1}/>}
  {t>4.18&&<P x={846} y={584} w={45} h={18} style={{background:boot>.1?C.green:'#3D5352',border:'4px solid #AA9A63',borderRadius:5}}/>}
  {t>1.12&&t<1.98&&<Cursor x={850} y={277} click={PULSE(t,1.55,.19)}/>}
  <Emphasis x={252} y={486} t={t} at={4.69}/>
 </Set>
}

export function Plan({t}:{t:number}){
 const power=S(t,.73,.32),task=S(t,1.01,.56),slow=S(t,2.43,.28),plan=S(t,2.75,.6),assemble=S(t,3.18,.60),inspect=S(t,3.79,.57),fix=E(t,4.30,.22),walk=S(t,4.62,1.0),boost=S(t,4.7067,.32);
 const rx=489+275*(1-task)-102*walk,ry=166+42*(1-task)-21*walk,rw=453+28*walk;
 const ra=-37*S(t,1.85,.50)+37*S(t,2.66,.59)+13*PULSE(t,3.81,.6),theta=ra*Math.PI/180;
 const dy=rw*(37/360-.854),gx=rx+rw*.5-Math.sin(theta)*dy,gy=ry+rw*.854+Math.cos(theta)*dy;
 return <Set name="superpowers-lab">
  <P x={-20} y={604} w={1052} h={188} style={{background:'linear-gradient(#102C3C,#04111F)',borderTop:'10px solid #AA823E',borderRadius:'48% 48% 0 0',boxShadow:'0 -9px 0 #E5BD62'}}/>
  {power>0&&<svg width="1012" height="792" style={{position:'absolute',left:0,top:0}}><path d={`M210 ${177+power*226}L282 ${221+power*229}L240 ${278+power*198}`} fill="none" stroke="#EFC665" strokeWidth={12*(1-power)} opacity={1-power}/><ellipse cx="250" cy="611" rx={170*power} ry={52*power} fill="none" stroke="#FFF1AB" strokeWidth={18*(1-power)}/></svg>}
  {power>0&&<Energy x={142-215*task-35*walk} y={131+114*task-21*walk} w={605-120*task} t={t} p={power*(1-.60*task)}/>}
  <Hero x={180-215*task-35*walk} y={224-112*power+138*task-21*walk-35*PULSE(t,.76,.50)} size={505+107*power-126*task} t={t} cape={power>.15} suitPower={power} stern={t>2&&t<4.3?.75:0} shock={t<.68?.72:0} cheer={fix*.8} rot={8*plan-13*walk}/>

  {t<.76&&<PowerSnack t={t}/>}
  {t>=.65&&t<1.14&&<svg width="1012" height="792" style={{position:'absolute'}}><ellipse cx="437" cy={528-80*power} rx={14+230*S(t,.68,.43)} ry={10+190*S(t,.68,.43)} fill="none" stroke="#D6FFE0" strokeWidth={15*(1-S(t,.68,.43))}/></svg>}

  {t>1.61&&t<4.67&&<svg width="1012" height="792" style={{position:'absolute',left:0,top:0}}><path d={`M946 122L946 173L${gx} 173L${gx} ${gy-9}`} fill="none" stroke="#173746" strokeWidth="15" strokeLinejoin="round"/><path d={`M946 125L946 173L${gx} 173L${gx} ${gy-9}`} fill="none" stroke="#C7A25D" strokeWidth="7" strokeLinejoin="round"/><circle cx="946" cy="173" r="17" fill="#B9904E" stroke="#193C4C" strokeWidth="5"/><path d={`M${gx-35} ${gy+8}V${gy-12}H${gx+35}V${gy+8}`} fill="none" stroke="#A9793C" strokeWidth="11" strokeLinecap="round"/></svg>}
  {boost>0&&<Energy x={rx-47} y={ry-42} w={rw+94} t={t} p={boost}/> }
  {t>1.0&&<Robot x={489+275*(1-task)-102*walk} y={166+42*(1-task)-21*walk} w={453+28*walk} t={t} assemble={.09+.24*S(t,1.15,1.05)+.67*assemble} scan={inspect} fix={fix>.4} walk={walk} repair={inspect} power={boost} rot={-37*S(t,1.85,.50)+37*S(t,2.66,.59)+13*PULSE(t,3.81,.6)}/>}
  {t>2.55&&t<3.57&&<svg width="1012" height="792" style={{position:'absolute',left:0,top:0,opacity:1-assemble*.75}}><g fill="none" stroke="#276981" strokeWidth="5" strokeDasharray="2100" strokeDashoffset={2100*(1-plan)}><path d="M473 173H913M463 184V664M451 184H475M451 664H475M470 686H926M470 674V698M926 674V698M479 469L615 487M836 487L945 473"/><circle cx="711" cy="466" r="85"/></g></svg>}
  {t>2.65&&t<3.5&&<P x={446+plan*415} y={317+Math.sin(plan*Math.PI)*97} w={31} h={181} style={{transform:'rotate(34deg)'}}><svg viewBox="0 0 31 181" width="31" height="181"><path d="M5 0H26V142L16 179L5 142Z" fill="#ECB74C" stroke="#6A5132" strokeWidth="4"/></svg></P>}
  {t>3.77&&t<4.62&&<Tool kind={0} x={784-186*inspect} y={333+70*inspect} s={1.2} rot={-18+30*inspect}/>}
  <P x={88} y={150} w={313} h={62} style={{background:'#1C5362',border:'4px solid #E6BB57',borderRadius:12}}><T x={22} y={12} size={31} c="#FFE3A1">{boost>.5?'10× OUTPUT':t<1.1?'POWER UP':t<2.5?'ONE TASK':t<3.3?'PLAN':t<3.79?'BUILD':fix>.5?'CHECKED ✓':'CHECK'}</T></P>
  <Emphasis x={290} y={370} t={t} at={.58}/><Emphasis x={667} y={315} t={t} at={4.36}/>
 </Set>
}

export function Memory({t}:{t:number}){
 const crown=E(t,.40,.30),save=S(t,.85,.7),close=S(t,1.86,.30),reopen=S(t,2.19,.34),chats=S(t,2.82,.34),files=S(t,3.30,.34),resume=S(t,3.96,.48),launch=S(t,4.65,.85);
 const hx=4+45*save+68*close-70*reopen-20*resume,hy=358+22*save-37*reopen+24*resume-45*launch;
 return <Set name="memory-observatory">
  <P x={-20} y={650} w={1050} h={145} style={{background:'linear-gradient(#14253A,#040E20)',borderTop:'9px solid #C2A0B8',borderRadius:'36% 36% 0 0'}}/>
  <P x={563} y={140} w={313} h={61} style={{background:'#28395A',border:'5px solid #CCA4BF',borderRadius:17}}><T x={36} y={11} size={34} c="#F3E5D9">SESSION {t<2.19?'01':'02'}</T></P>
  <P x={520} y={694} w={415} h={52} style={{background:'#34556E',border:'6px solid #D0B6C3',borderRadius:'50%',boxShadow:'0 11px 0 #091C35'}}/>
  {resume>0&&<Energy x={521} y={158-210*launch} w={410} t={t} p={PULSE(t,3.96,1.55)*.55}/>}
  <Rocket x={566+104*launch+175*close*(1-reopen)} y={184-405*launch+325*(1-S(t,-.1,.65))} w={313+37*resume-119*close*(1-reopen)} t={t} complete={resume} launch={launch}/>
  {close>0&&reopen<1&&<P x={470} y={218} w={486} h={526} style={{background:'#243551',border:'9px solid #BDB0C8',borderRadius:26,transform:`scaleX(${close*(1-reopen)})`,transformOrigin:'right'}}><svg width="470" height="510"><path d="M70 130H390M70 170H390M70 210H390M70 250H390M70 290H390M70 330H390" stroke="#69899A" strokeWidth="10"/><circle cx="234" cy="405" r="28" fill="#D0B19C"/></svg></P>}
  <svg width="1012" height="792" style={{position:'absolute',left:0,top:0}}><path d="M284 355C437 197 617 321 737 436" fill="none" stroke="#AB6FBD" strokeWidth="13" opacity={save*(1-resume)*.6} strokeDasharray="800" strokeDashoffset={800*(1-save)}/>{[0,1,2,3].map(i=>{let p=Math.max(0,Math.min(1,(t-.8-i*.14)/.8));return p>0&&p<1?<circle key={i} cx={680-396*p} cy={452-95*p-107*Math.sin(p*Math.PI)} r={16} fill="#E9ABE3"/>:null})}</svg>
  <Hero x={hx} y={hy} size={443} t={t} rot={-9*save+10*close-7*resume+6*launch} stern={t<.8?.35:0} cheer={resume*.8} brain={crown>.15}/>
  {t>.6&&t<1.8&&[0,1].map(i=>{const q=S(t,.70+i*.20,.77);return <ContextProp key={i} x={610-329*q+i*38} y={362-132*q+i*48} w={196-84*q} kind={i} t={t} open={1} rot={-21*q}/>})}
  {t>2.77&&[0,1].map(i=>{const q=i?files:chats;return q>0&&resume<1&&<ContextProp key={i} x={255+131*q+335*resume} y={200+i*223+34*Math.sin(q*Math.PI)+166*resume} w={302*(1-resume*.76)} kind={i} t={t} open={q} rot={(1-q)*(i?-22:22)+resume*32}/>})}
  {resume>0&&<P x={399} y={693} w={497} h={69} style={{background:'#14374E',border:'4px solid #CFAAB9',borderRadius:14}}><T x={19} y={16} size={29} c="#F5DCDE">{launch>.1?'PICK UP + KEEP BUILDING':'RIGHT WHERE YOU LEFT OFF'}</T></P>}
  <Emphasis x={238} y={342} t={t} at={.55}/><Emphasis x={738} y={391} t={t} at={4.42}/>
 </Set>
}

export function CTA({t}:{t:number}){
 const collect=S(t,.15,.8),hand=E(t,.84,.33),post=E(t,1.72,.19),keyword=t>=1.538;
 return <Set name="skill-dispatch">
  <P x={456} y={191} w={429} h={331} style={{background:'#0A2331',border:'8px solid #C59348',borderRadius:26,transform:`translateY(${250*hand}px) rotate(${-4+4*collect}deg) scale(${1-hand*.76})`,opacity:1-hand}}>
   {Array.from({length:100},(_,i)=>{const col=i%10,row=Math.floor(i/10),q=E(t,.14+(row+col)*.012,.54);return <P key={i} x={15+col*39+(211-col*39-15)*q} y={15+row*28+(260-row*28-15)*q} w={29} h={22} style={{background:['#DAB661','#5EAF9A','#B590C0','#E18E61'][i%4],border:'2px solid #EAD5A4',borderRadius:3,opacity:1-q*.98,transform:`rotate(${q*(i%2?33:-33)}deg)`}}/>})}
   {collect>.65&&<T x={35} y={87} w={350} size={55} c="#FBE5B2" style={{textAlign:'center'}}>YOUR SKILL<br/>LIBRARY</T>}
  </P>
  {[0,1,2].map(i=>{const q=S(t,.03+i*.075,.82);return <Skill key={i} x={376+i*147+(573-376-i*147)*q} y={156+i*8+277*q-99*Math.sin(q*Math.PI)} w={164-69*q} title={['BUILD','WRITE','PLAN'][i]} rot={(-16+i*16)*(1-q)} color={['#348684','#B87548','#806595'][i]} lit={1}/>})}
  <Hero x={15+31*hand-19*post} y={322-67*hand-17*post} size={410} t={t} rot={8*hand-13*post} cheer={.3+post*.6}/>
  <Pack x={390-33*hand+174*post} y={429+26*collect-56*hand-21*post} w={443+76*hand} open={1-hand} load={hand}/>
  <P x={129} y={183} w={246} h={107} style={{background:'#FFF1CF',border:'6px solid #916B36',borderRadius:22,transform:`rotate(${-8+8*hand}deg)`}}><T x={19} y={13} size={70} c="#25565C">100</T><T x={158} y={21} size={27} c="#A05C35">FREE<br/>SKILLS</T></P>
  {t>1.49&&<P x={346} y={153-10*post} w={598} h={246} style={{transform:`scale(${.90+.10*E(t,1.49,.18)}) rotate(${-3+3*post}deg)`,transformOrigin:'50% 65%',filter:'drop-shadow(0 12px 0 #14384B50)'}}><svg width="598" height="246"><path d="M32 8H566Q587 8 587 34V180Q587 203 562 203H223L170 240L178 203H33Q9 203 9 177V34Q9 8 32 8Z" fill="#FFF1CB" stroke="#1C5663" strokeWidth="10"/></svg><T x={39} y={27} size={30} c="#A45D39">COMMENT</T><T x={33} y={69} size={126} c="#154D58">{keyword?'SKILL':''}</T><P x={494} y={103+5*post} w={66} h={66} style={{background:post>.7?'#5BA97F':'#D97857',borderRadius:15}}><svg width="66" height="66"><path d="M17 45L47 18M20 18H47V44" fill="none" stroke="#FFF3CD" strokeWidth="7"/></svg></P><Cursor x={523} y={147} click={PULSE(t,1.71,.18)}/></P>}
  <Emphasis x={715} y={501} t={t} at={.87}/>
 </Set>
}
