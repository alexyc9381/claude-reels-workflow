import React from 'react';
import {HundredsV23} from './ScenesV23';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Logo,SkillFile,Lens,C,lerp,clamp} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {Set,Light,Contact,HiggsSprite,Shot,CineCamera} from './ScenesV19';
import {roadmapBeatsV13} from './ScenesV13';
import {ReceiverV22} from './ScenesV22';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const recoil=(t:number,at:number)=>t<at?0:Math.sin((t-at)*19)*Math.exp(-(t-at)*7);
const flash=(t:number,at:number)=>t<at?0:Math.exp(-(t-at)*3.8);
const Title:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;color?:string}>=({x,y,children,size=44,color=C.ink})=><At x={x} y={y} style={{fontSize:size,fontWeight:800,color,lineHeight:1.15,whiteSpace:'nowrap'}}>{children}</At>;

/** Light belongs to the receiving object: never a full-screen flash. */
export const ChargeV20:React.FC<{t:number;at:number;x:number;y:number;size?:number}>=({t,at,x,y,size=360})=>{
 const p=easeOut(t,at,.5),a=flash(t,at);
 return <At x={x-size/2} y={y-size/2} style={{width:size,height:size,opacity:a,transform:`scale(${.7+p*.7})`,background:'radial-gradient(circle,#FFF5BDEE,#F4AD5877 28%,#EF883C00 66%)',pointerEvents:'none'}}><svg width={size} height={size} viewBox="0 0 360 360">{[0,1,2,3,4,5,6,7].map(i=><path key={i} d="M180 33V64" transform={`rotate(${i*45} 180 180)`} fill="none" stroke="#F4B348" strokeWidth="5" strokeLinecap="round"/>)}</svg></At>;
};
const Coin:React.FC<{size?:number}>=({size=70})=><svg width={size} height={size} viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#E8C472" stroke="#A7813E" strokeWidth="4"/><circle cx="40" cy="40" r="28" fill="none" stroke="#FFF0B6" strokeWidth="3"/><path d="M40 16V64M51 26H36Q24 27 30 38L49 43Q59 55 28 55" fill="none" stroke="#96632A" strokeWidth="4"/></svg>;
const Desk:React.FC<{x:number;y:number;w:number}>=({x,y,w})=><At x={x} y={y}><svg width={w} height="220"><path d={`M48 30V209M${w-48} 30V209`} stroke="#7F8C75" strokeWidth="16"/><path d={`M0 12L40 0H${w-40}L${w} 12V42H0Z`} fill="#E7D6B7" stroke="#FFF9E9" strokeWidth="4"/><path d={`M3 43H${w-3}`} stroke="#A47E4D" strokeWidth="5"/></svg></At>;

/** Unified hero: a physical instruction cartridge is loaded into the Claude
 * workstation. File, price and operator share one footprint, not satellites. */
const SkillStation:React.FC<{t:number;load:number;run:number;w?:number;minimal?:boolean}>=({t,load,run,w=640,minimal=false})=><div style={{width:w,height:w*.72,position:'relative'}}><svg width={w} height={w*.72} viewBox="0 0 640 461"><defs><linearGradient id="station-body" x2="1" y2="1"><stop stopColor="#FFFEF5"/><stop offset="1" stopColor="#D6DCC8"/></linearGradient></defs><path d="M42 34H588Q608 34 608 54V359H22V54Q22 34 42 34Z" fill="url(#station-body)" stroke="white" strokeWidth="5"/><rect x="47" y="59" width="536" height="273" rx="12" fill="#F2EDDB"/><path d="M23 360H608L636 401H0Z" fill="#D6DCC8" stroke="#FFFDF2" strokeWidth="4"/><path d="M0 402H637" stroke="#7C8970" strokeWidth="8"/><path d="M212 377H428" stroke="#B1BEA3" strokeWidth="5"/><rect x="72" y="291" width="219" height="14" rx="7" fill="#78896E"/><circle cx="549" cy="346" r="7" fill={run>.3?'#5A9F65':'#BDA771'}/></svg>
 <At x={w*.105} y={w*.12}><Logo name="claude.png" size={w*.14}/></At>
 <Title x={w*.286} y={w*.13} size={w*.051}>Claude skill</Title>
 <At x={w*.30} y={w*.24} style={{width:w*.54,fontSize:w*.047,lineHeight:1.3,fontWeight:650,color:C.teal,opacity:minimal?load:1}}>{minimal?'/fal-video':'Reusable instructions'}</At>
 <At x={w*.108} y={w*.46-load*w*.20} style={{opacity:minimal?0:1-load,transform:`scale(${1-load*.45})`,transformOrigin:'50% 100%'}}><SkillFile t={t} size={w*.23}/></At>
 <At x={w*.1} y={w*.348} style={{display:'flex',gap:w*.055,opacity:load}}>{['seedance.png','google.png','hailuo.png'].map((n,i)=><div key={n} style={{transform:`translateY(${-10*Math.sin(clamp(run*3-i)*Math.PI)}px)`}}><Logo name={n} size={w*.075}/></div>)}</At>
</div>;

/** Cost stage: recurring calendar is used ONLY here. Spotlight and operation
 * alternate, while both identities and both price units remain readable. */
export const CostV20:React.FC<{duration:number;brandAt:number;bold?:boolean}>=({duration,brandAt})=>{
 const t=clock(),focus=e(t,brandAt-.18,.3),load=e(t,.45,.5),run=e(t,1.0,1.8),turns=[brandAt+.4,brandAt+1.55,brandAt+2.7];
 const stamp=turns.reduce((v,a)=>v+e(t,a,.28),0)%1;
 return <Set t={t}><Light x={480} power={.4+.6*focus}/><Light x={1390} power={.6-.34*focus} color="#E6EDD0"/>
  <At x={180} y={105} style={{display:'flex',alignItems:'center',gap:24}}><Logo name="higgsfield.jpg" size={124}/><span style={{fontSize:62,fontWeight:850}}>Higgsfield</span></At>
  <At x={1070} y={107} style={{display:'flex',alignItems:'center',gap:24}}><Logo name="claude.png" size={124}/><span style={{fontSize:59,fontWeight:850}}>Claude skill</span></At>
  <Desk x={135} y={731} w={724}/><Desk x={1048} y={731} w={691}/>
  <At x={166} y={297}><svg width="455" height="355"><rect x="10" y="18" width="435" height="318" rx="20" fill="#FFFDF2" stroke="#D8C5A3" strokeWidth="5"/><path d="M10 41Q10 18 34 18H421Q445 18 445 41V86H10Z" fill="#A9B85F"/>{[80,375].map(x=><path key={x} d={`M${x} 1V51`} stroke="#626B42" strokeWidth="13" strokeLinecap="round"/>)}</svg><Title x={38} y={111} size={127}>$100</Title><Title x={53} y={263} size={40}>/ month</Title>
   {turns.map(at=>{const p=e(t,at,.44);return <At key={at} x={24} y={87} style={{width:407,height:238,opacity:t<at?0:1-e(t,at+.18,.12),background:'#FFFCEF',transform:`perspective(700px) rotateX(${-165*p}deg)`,transformOrigin:'50% 0',backfaceVisibility:'hidden',borderBottom:'3px solid #B9AA83'}}><svg width="407" height="238">{[0,1,2,3].map(i=><path key={i} d={`M25 ${44+i*51}H379`} stroke="#CFD5B2" strokeWidth="4"/>)}{[0,1,2,3,4].map(i=><path key={i} d={`M${55+i*72} 18V220`} stroke="#CFD5B2" strokeWidth="3"/>)}</svg></At>;})}
  </At>
  <At x={558} y={413}><HiggsSprite t={t} stamp={stamp} size={295}/></At>
  <At x={1118} y={430}><SkillStation t={t} load={load} run={run} w={585}/></At>
  <At x={1111} y={270} style={{display:'flex',gap:20,alignItems:'baseline'}}><span style={{fontSize:108,color:'#327754',fontWeight:850,letterSpacing:-5}}>~10¢</span><span style={{fontSize:31,fontWeight:750}}>/ generation</span></At>
  <Actor t={t} x={941} y={508} size={226} role="operator" look={1} reach={load} lift={load*.65} contact={.95} happy={load>.9}/>
  <ChargeV20 x={1173} y={558} t={t} at={.95} size={280}/>
 </Set>;
};

/** Page → reusable instruction file → named models → local output.
 * Captured homepage is documentary context; the machinery is illustration. */
export const ProductionV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.6667/duration,replace=e(u,.5,1.0),next=e(u,2.70,.28),load=e(u,2.84,.55),select=e(u,3.48,.60),shoot=e(u,4.4,.65),save=e(u,6.04,.7);
 return <Set t={t}><Light x={610} power={.45}/><Light x={1360} power={.65}/>
  <div style={{position:'absolute',inset:0,opacity:1-next}}>
   <At x={143} y={113} style={{display:'flex',gap:23,alignItems:'center'}}><Logo name="higgsfield.jpg" size={100}/><span style={{fontSize:49,fontWeight:800}}>Higgsfield</span></At>
   <At x={137} y={287} style={{width:890,height:504,border:'5px solid #FFF9EC',borderRadius:22,overflow:'hidden',boxShadow:'0 25px 40px #50371930',transform:`perspective(1500px) rotateY(${-5*replace}deg) translateX(${-38*replace}px) scale(${1-.07*replace})`,transformOrigin:'0 50%'}}><Img data-homepage-scroll src={staticFile('v9/higgsfield-scroll-v20.png')} style={{width:'100%',height:'auto',display:'block',transform:`translateY(${-920*e(u,.22,2.35)}px)`}}/></At>
   <At x={1195} y={290} style={{transform:`translateY(${72*(1-replace)}px) scale(${.85+.15*replace})`,opacity:easeOut(u,.12,.25)}}><SkillFile t={t} size={295}/></At>
   <Title x={1120} y={165} size={57}>One Claude skill</Title>
   <Actor t={t} x={982} y={535} size={272} role="operator" reach={replace} lift={replace*.7} look={1} contact={1.5} happy={replace>.9}/>
   <ChargeV20 t={u} at={1.5} x={1340} y={458} size={440}/>
  </div>
  <div style={{position:'absolute',inset:0,opacity:next}}>
   <Title x={157} y={110} size={57}>One reusable workflow</Title>
   <Desk x={135} y={724} w={1580}/>
   <At x={167} y={261}><SkillStation t={t} load={load} run={select} w={745}/></At>
   <At x={1040} y={167} style={{display:'flex',gap:27,opacity:1-save}}>{['seedance.png','google.png','hailuo.png'].map((n,i)=><div key={n} style={{padding:11,borderRadius:20,background:i===0&&select>.5?'#F7D8A2':'#FFF9E8',transform:`translateY(${-15*Math.sin(e(u,3.48+i*.16,.3)*Math.PI)}px)`}}><Logo name={n} size={98}/></div>)}</At>
   <At x={1035} y={320} style={{opacity:1-shoot}}><CineCamera t={t} shoot={select} w={535}/></At>
   <At x={1040-save*43} y={337-save*17} style={{opacity:shoot,transform:`scale(${.86+.14*shoot})`,transformOrigin:'50% 50%'}}><div style={{padding:14,border:'4px solid white',borderRadius:24,background:'#E3EBD5',boxShadow:'0 20px 32px #344A302C'}}><Shot p={e(u,4.4,1.64)} w={667}/></div><At x={0} y={424} style={{opacity:save}}><svg width="707" height="81"><path d="M19 0H687L707 41H0Z" fill="#D0D8C2" stroke="white" strokeWidth="4"/><path d="M0 42H707" stroke="#7F8D74" strokeWidth="7"/></svg></At></At>
   <Actor t={t} x={794+select*70} y={550} size={240} role="operator" look={1} reach={select} lift={.65} contact={4.4} happy={save>.9}/>
   <Title x={1080} y={110} size={35} color={C.teal}>{save>.1?'Saved on your computer':'Same prompt · same models'}</Title>
   <ChargeV20 t={u} at={4.4} x={1320} y={506} size={400}/>
  </div>
 </Set>;
};

export const routeV20=(p:number)=>({x:330+1260*p,y:625-170*Math.sin(p*Math.PI*2)});
/** Clean three-stop route. Detail belongs to the working props, not scenery. */
export const RoadmapV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),beats=roadmapBeatsV13.map(n=>n*duration),p=e(t,beats[0],beats[2]-beats[0]),v=routeV20(p);
 const route=(end:number)=>Array.from({length:121},(_,i)=>{const q=routeV20(end*i/120);return `${i?'L':'M'}${q.x} ${q.y}`}).join(' ');
 return <AbsoluteFill data-clean-roadmap style={{background:'radial-gradient(ellipse at 50% 46%,#FFFFFF 0%,#FFF6E8 57%,#EED7BD 100%)',fontFamily:bodyFont,color:C.ink}}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
   <path d={route(1)} fill="none" stroke="#A9794528" strokeWidth="72" strokeLinecap="round" transform="translate(0 10)"/><path d={route(1)} fill="none" stroke="#FFFFFF" strokeWidth="66" strokeLinecap="round"/><path d={route(1)} fill="none" stroke="#EAD7BD" strokeWidth="4" strokeDasharray="2 18" strokeLinecap="round"/><path d={route(p)} fill="none" stroke="#E99A4B" strokeWidth="13" strokeLinecap="round"/>
  </svg>
  {[0,.5,1].map((q,i)=>{const a=routeV20(q),on=easeOut(t,beats[i],.17),x=a.x-164,y=i===1?154:283;return <React.Fragment key={i}>
   <At x={x} y={y} style={{width:328,height:263,transform:`translateY(${-9*recoil(t,beats[i])}px)`}}>
    <svg width="328" height="263"><ellipse cx="164" cy="246" rx="155" ry="16" fill="#A58C6623"/><path d="M14 216V234C14 260 314 260 314 234V216" fill="#E4DDD0" stroke="#FFFDF5" strokeWidth="3"/><ellipse cx="164" cy="216" rx="150" ry="25" fill="#FFFDF5" stroke={on>.5?'#E7A05A':'#D9D0BE'} strokeWidth="4"/><path d="M46 217Q164 238 282 217" fill="none" stroke="#E9C78F" strokeWidth="3"/>{i===1&&<><path d="M62 63H267V192H62Z" fill="#EEE8D9" stroke="#FFFFFF" strokeWidth="4"/><path d="M91 194H236" stroke="#788B80" strokeWidth="12" strokeLinecap="round"/><circle cx="244" cy="80" r="6" fill={on>.5?'#6FAE72':'#D2BD8D'}/></>}</svg>
    {i===0?<><At x={119} y={102}><Logo name="fal.png" size={89}/></At><svg width="328" height="263" style={{position:'absolute',inset:0}}><g transform={`rotate(${-80*on} 45 211)`}><path d="M45 211H282" stroke="#AB8761" strokeWidth="17"/><path d="M68 204L87 217M115 204L134 217M165 204L184 217M215 204L234 217" stroke="#FFF5D3" strokeWidth="10"/></g></svg></>:i===1?<><At x={119} y={99}><Logo name="claude.png" size={86}/></At><At x={69+on*61} y={173-on*41} style={{opacity:1-on*.9,transform:`scale(${1-on*.35})`}}><SkillFile t={t} size={85}/></At></>:<At x={37} y={71}><CineCamera t={t} shoot={on} w={251}/></At>}
    <ChargeV20 t={t} at={beats[i]} x={164} y={141} size={265}/>
   </At>
   <At x={x-17} y={i===1?815:846} style={{width:362,textAlign:'center'}}><div style={{fontSize:24,fontWeight:750,color:C.orange}}>0{i+1}</div><div style={{fontSize:42,fontWeight:850}}>{['Connect','Load skill','Generate'][i]}</div></At>
  </React.Fragment>;})}
  <Actor t={t} x={v.x-92} y={v.y-121} size={184} role="courier" walk={Math.sin(p*Math.PI)} lift={.45} look={1} contact={beats[t<beats[1]?0:t<beats[2]?1:2]} happy={t>beats[2]}/>
 </AbsoluteFill>;
};

/** One copy/paste action, not a book + camera + assorted unrelated props. */
export const GuideV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,copy=e(u,.24,.14),send=e(u,.43,.16),ready=e(u,.59,.13);
 return <Set t={t}><Light x={700} power={.65}/><Light x={1360} power={.4+.4*ready}/>
  <Title x={172} y={122} size={78} color={C.orange}>FREE setup</Title><Title x={174} y={220} size={36}>In the description ↓</Title>
  <Desk x={155} y={748} w={1574}/>
  <Glass x={171} y={350} w={621} h={350} t={t} frost={.5}><At x={34} y={37}><SkillFile t={t} size={172}/></At><Title x={241} y={63} size={37}>fal-video.skill</Title><At x={246} y={154} style={{padding:'17px 25px',borderRadius:14,background:'#F2D8AE',fontSize:35,fontWeight:800,transform:`scale(${1-.04*Math.sin(copy*Math.PI)})`}}>Copy setup</At><svg width="88" height="88" style={{position:'absolute',right:38,bottom:33}}><path d="M19 5H65V61H19ZM8 17V76H54" fill="none" stroke={C.orange} strokeWidth="6" strokeLinejoin="round"/></svg></Glass>
  <At x={1020} y={304}><SkillStation t={t} load={ready} run={ready} w={688} minimal/></At>
  <Actor t={t} x={765+send*43} y={503} size={258} role="courier" look={1} lift={copy*.8} reach={send} contact={duration*.59} happy={ready>.9}/>
  <At x={lerp(426,1217,send)} y={lerp(512,532,send)-Math.sin(send*Math.PI)*140} style={{opacity:copy*(1-ready),transform:`rotate(${-6+send*6}deg)`,zIndex:2}}><div style={{fontSize:41,fontWeight:800,padding:'20px 35px',borderRadius:18,background:'#FFE2B9',border:'3px solid #FFFCF2',boxShadow:'0 20px 30px #563F272A'}}>/fal-video</div></At>
  <ChargeV20 t={t} at={duration*.59} x={1290} y={553}/>
  <At x={178} y={862} style={{display:'flex',gap:26,alignItems:'center'}}>{['claude.png','codex.svg','cursor.svg'].map(n=><Logo name={n} size={75} key={n}/>)}<span style={{fontSize:32,fontWeight:750}}>Claude Code · Codex · Cursor</span></At>
 </Set>;
};

/** Platform facade rises to expose the video engines. The second action
 * physically narrows the output gate, leaving requests queued behind it. */
export const WrapperV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,lift=e(u,.04,.15),limited=e(u,.39,.08),close=e(u,.49,.12),deliver=e(u,.23,.14);
 return <Set t={t}><Light x={920} power={.7}/>
  <At x={251} y={213}><svg width="1435" height="592"><path d="M25 563V71L259 13H1176L1407 71V563Z" fill="#D9E2CB" stroke="#FFFDF2" strokeWidth="6"/><path d="M25 71H1407" stroke="#B0BD9D" strokeWidth="14"/><path d="M49 110H1378V518H49Z" fill="#607767"/>{[0,1,2].map(i=><g key={i} transform={`translate(${113+i*436} 140)`}><rect width="337" height="269" rx="32" fill="#E8E7D1" stroke="#FFF6D9" strokeWidth="5"/><path d="M28 203H310" stroke="#6B8568" strokeWidth="13"/><circle cx="281" cy="239" r="8" fill={t>1+i*.25?'#F1BC66':'#899A79'}/><path d="M34 238H143" stroke="#A8B58E" strokeWidth="5"/>{[0,1,2,3].map(j=><path key={j} d={`M${219+j*23} 76V167`} stroke="#B3BCA1" strokeWidth="5"/>)}</g>)}</svg>
   {['seedance.png','google.png','hailuo.png'].map((n,i)=><At key={n} x={151+i*436} y={181}><Logo name={n} size={139}/></At>)}
   <div style={{position:'absolute',left:24,top:55,width:1384,height:476,background:'linear-gradient(120deg,#F0EED5,#C6D77F)',border:'5px solid #FFFDF0',borderRadius:'16px 16px 0 0',transform:`translateY(${-480*lift}px)`,opacity:1-e(u,.17,.035),overflow:'hidden'}}>
    <At x={80} y={99}><Logo name="higgsfield.jpg" size={173}/></At><Title x={304} y={115} size={89}>Higgsfield</Title><svg width="1384" height="476" style={{position:'absolute',inset:0}}><path d="M0 420H1384" stroke="#A8BA6D" strokeWidth="20"/><path d="M957 125H1278V334H957Z" fill="#F8F5D9" stroke="#90A768" strokeWidth="5"/><path d="M1005 282L1075 207L1127 242L1219 164" stroke="#90A768" strokeWidth="12" fill="none"/></svg>
   </div>
  </At>
  <At x={289} y={768}><svg width="1223" height="159"><path d="M0 48H1180" stroke="#526E5C" strokeWidth="54" strokeLinecap="round"/><path d="M0 25H1180" stroke="#B8C9A4" strokeWidth="8"/>{Array.from({length:22},(_,i)=><g key={i}><circle cx={i*54} cy="51" r="13" fill="#C5CDAE" stroke="#FFF4D7" strokeWidth="3"/><path d={"M"+(i*54-8)+" 51h16"} transform={"rotate("+(t*140)+" "+(i*54)+" 51)"} stroke="#6B7D5B" strokeWidth="3"/></g>)}<path d="M58 72V151M1054 72V151" stroke="#677D65" strokeWidth="13"/></svg></At>
  {[0,1,2].map(i=>{const go=e(u,.21+i*.048,.15),q=e(u,.48+i*.045,.13);return <At key={i} x={lerp(445+i*300,1007-i*133,limited)+go*95+q*10} y={659} style={{opacity:lift,transform:`translateY(${-8*recoil(t,duration*(.61+i*.045))}px)`}}><div style={{padding:7,borderRadius:11,background:'#FFFAE9',border:'2px solid #FFF',boxShadow:'0 12px 18px #34493124'}}><Shot p={clamp(deliver*1.3-i*.15)} w={182}/></div></At>;})}
  <At x={1334} y={544} style={{opacity:limited}}><svg width="332" height="270"><path d="M16 266V33H310V266" stroke="#607D66" strokeWidth="22" fill="none"/><g transform={`translate(0 ${-178*(1-close)})`}><path d="M27 37H300V230H27Z" fill="#DAB882" stroke="#FFF9E5" strokeWidth="5"/>{[0,1,2,3,4].map(i=><path key={i} d={`M37 ${65+i*34}H287`} stroke="#AF8D5B" strokeWidth="6"/>)}</g><circle cx="313" cy="36" r="13" fill="#B86536"/></svg></At>
  <div style={{opacity:lift}}><Title x={330} y={117} size={54}>{limited>.5?'“Unlimited” still has limits':'The models underneath'}</Title></div>
  <Actor t={t} x={73+lift*38} y={577} size={278} role="operator" look={1} lift={lift*(1-limited)*.85} reach={1} contact={duration*.19}/>
  <ReceiverV22 t={t} duration={duration} kind="wrapper"/>
 </Set>;
};

/** A canceled turnstile is visually different from the opening calendar.
 * Claude plugs directly into the chosen model; no repeated paper bill. */
export const DirectV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,a=e(u,.04,.06),b=e(u,.125,.065),plug=e(u,.25,.13),fund=e(u,.41,.10),shoot=e(u,.61,.15);
 return <Set t={t}><Light x={454} power={.55-.3*plug}/><Light x={1310} power={.25+.65*plug}/>
  <At x={187} y={109} style={{display:'flex',gap:22,alignItems:'center'}}><Logo name="higgsfield.jpg" size={113}/><span style={{fontSize:48,fontWeight:800}}>Subscription</span></At>
  <At x={240} y={320}><svg width="436" height="473"><defs><linearGradient id="turnstile" x2="1" y2="1"><stop stopColor="#EAEDCE"/><stop offset="1" stopColor="#8D9C68"/></linearGradient></defs><path d="M54 20H311L367 82V443H22V77Z" fill="url(#turnstile)" stroke="#FFF8DB" strokeWidth="6"/><path d="M78 59H286V191H78Z" fill="#647C55"/><path d="M104 98H256M104 131H218M104 164H241" stroke="#E3EAC8" strokeWidth="8"/><circle cx="192" cy="310" r="57" fill="#F1E5BE" stroke="#8F9E68" strokeWidth="9"/>{[0,1,2].map(i=><path key={i} d="M194 309L382 278" transform={`rotate(${i*120} 192 310)`} stroke="#899B71" strokeWidth="20" strokeLinecap="round"/>)}<path d="M38 450H350" stroke="#6F825A" strokeWidth="16"/></svg></At>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M271 359L628 707" fill="none" stroke={C.orange} strokeWidth="27" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-a}/><path d="M628 359L271 707" fill="none" stroke={C.orange} strokeWidth="27" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-b}/></svg>
  <At x={1067} y={110} style={{display:'flex',gap:23,alignItems:'center'}}><Logo name="seedance.png" size={117}/><span style={{fontSize:54,fontWeight:800}}>Seedance 2.5</span></At>
  <Desk x={1045} y={721} w={672}/>
  <At x={1090} y={314} style={{opacity:1-shoot}}><CineCamera t={t} shoot={fund} w={559}/></At>
  <Actor t={t} x={737+plug*118} y={562} size={284} role="operator" look={plug>.1?1:-1} reach={plug} lift={.6+fund*.2} walk={Math.sin(plug*Math.PI)} contact={duration*.38} happy={shoot>.8}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:e(u,.20,.04)}}><path d={`M1039 733Q1102 879 1201 773L${lerp(1134,1217,plug)} ${lerp(712,631,plug)}`} stroke="#697D60" strokeWidth="13" fill="none"/><g transform={`translate(${lerp(1124,1207,plug)} ${lerp(697,616,plug)}) rotate(-10)`}><path d="M0 0H56V34H0Z" fill="#D9BA78" stroke="#FFF3CE" strokeWidth="3"/><path d="M56 8H77M56 26H77" stroke="#809275" strokeWidth="6"/></g></svg>
  <At x={lerp(940,1310,fund)} y={lerp(593,412,fund)-Math.sin(fund*Math.PI)*100} style={{opacity:plug*(1-e(u,.52,.04)),transform:`rotate(${fund*120}deg)`}}><Coin size={91}/></At>
  <HundredsV23 t={t} at={5.45}/>
  <Title x={1070} y={248} size={35} color={C.teal}>Pay per generation</Title>
  <ChargeV20 t={t} at={duration*.38} x={1218} y={631}/>
 </Set>;
};

const Gem:React.FC<{w:number;color:string;children?:React.ReactNode}>=({w,color,children})=><div style={{width:w,height:w,position:'relative'}}><svg width={w} height={w} viewBox="0 0 220 220"><path d="M45 28H175L212 94L110 204L8 94Z" fill={color} stroke="#FFF9D5" strokeWidth="5"/><path d="M45 28L72 94L110 204L148 94L175 28M8 94H212M72 94L110 28L148 94" fill="none" stroke="#FFFFFF80" strokeWidth="3"/><path d="M45 28H110L72 94H8Z" fill="#FFFFFF48"/></svg><At x={w*.25} y={w*.27}>{children}</At></div>;
/** A recognizable key turns an actual keyhole, the heavy door swings clear,
 * and the paid feature jewels are revealed. This never depicts a free bypass. */
export const VaultV20:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,tryOpen=e(u,.20,.09),key=e(u,.38,.09),insert=e(u,.52,.12),turn=e(u,.65,.075),open=e(u,.74,.11);
 return <Set t={t}><Light x={1210} power={.4+.5*open}/><Title x={180} y={118} size={60}>Higher-tier access</Title><At x={1520} y={111}><Logo name="higgsfield.jpg" size={105}/></At>
  <At x={717} y={263}><svg width="997" height="481"><defs><linearGradient id="vault-metal" x2="1" y2="1"><stop stopColor="#DBD8BE"/><stop offset=".5" stopColor="#899C86"/><stop offset="1" stopColor="#D8DDBE"/></linearGradient></defs><rect x="8" y="8" width="973" height="462" rx="54" fill="url(#vault-metal)" stroke="#FFF8DD" strokeWidth="11"/><rect x="42" y="45" width="900" height="384" rx="26" fill="#365647" stroke="#9AA98B" strokeWidth="8"/><path d="M68 324H920" stroke="#ADBE95" strokeWidth="12"/><path d="M94 374H893" stroke="#597353" strokeWidth="16"/>{[0,1,2,3,4,5,6,7].map(i=><circle key={i} cx={69+i*122} cy="25" r="7" fill="#62775D"/>)}</svg>
   <At x={94} y={104}><Gem w={216} color="#9EB877"><Logo name="seedance.png" size={104}/></Gem><Title x={-17} y={250} size={28} color="#FFF7DE">Seedance 2.5</Title></At>
   <At x={363} y={104}><Gem w={216} color="#DEB06E"><Lens t={t} size={107} angle={open*65}/></Gem><Title x={30} y={250} size={28} color="#FFF7DE">Controls</Title></At>
   <At x={649} y={104}><Gem w={216} color="#83B5AD"><svg width="107" height="107"><path d="M10 15H96V79H10Z" fill="#F6EED0" stroke="#4B796D" strokeWidth="4"/><path d="M40 30L72 48L40 66Z" fill="#4B796D"/></svg></Gem><Title x={20} y={250} size={28} color="#FFF7DE">Features</Title></At>
   <div style={{position:'absolute',left:39,top:38,width:911,height:402,transform:`perspective(1350px) rotateY(${-112*open}deg) translateX(${-8*recoil(t,duration*.29)}px)`,transformOrigin:'0 50%',backfaceVisibility:'hidden',borderRadius:29,background:'linear-gradient(135deg,#F3EAD0,#AAA68D 48%,#E6D9B8)',border:'8px solid #FFF4D5',boxShadow:'8px 15px 20px #1E372637'}}>
    <svg width="911" height="402"><rect x="28" y="27" width="844" height="338" rx="20" fill="none" stroke="#8B927970" strokeWidth="6"/>{[0,1,2].map(i=><rect key={i} x="-30" y={50+i*125} width="52" height="66" rx="7" fill="#8EA085" stroke="#F6ECCF" strokeWidth="5"/>)}<circle cx="448" cy="198" r="111" fill="#E8D6A2" stroke="#FFF6D9" strokeWidth="9"/><g transform={`rotate(${turn*90+tryOpen*5} 448 198)`}><circle cx="448" cy="198" r="80" fill="#6B7C61" stroke="#ABA377" strokeWidth="6"/><path d="M397 198H499M448 147V249" stroke="#D7C391" strokeWidth="14" strokeLinecap="round"/></g><circle cx="448" cy="198" r="25" fill="#2F4435"/><path d="M437 211L431 237H466L459 211" fill="#2F4435"/></svg>
   </div>
  </At>
  <Actor t={t} x={271+insert*152} y={467} size={339} role="archivist" look={1} reach={tryOpen} lift={key*.85} contact={duration*.65} happy={open>.9}/>
  <At x={lerp(553,750,insert)} y={lerp(448,412,insert)} style={{opacity:key*(1-e(u,.735,.025)),transform:`rotate(${-20+20*insert+90*turn}deg) scale(${1-.4*insert})`,transformOrigin:'454px 87px'}}><svg width="471" height="180" style={{overflow:'visible'}}><defs><linearGradient id="gold-key" x2="0" y2="1"><stop stopColor="#FFF2B4"/><stop offset=".48" stopColor="#C89C41"/><stop offset="1" stopColor="#F8D98E"/></linearGradient></defs><path d="M148 68H454V104H418V142H382V104H340V130H307V104H148Z" fill="url(#gold-key)" stroke="#FFF4D0" strokeWidth="5"/><circle cx="84" cy="86" r="76" fill="url(#gold-key)" stroke="#FFF3C6" strokeWidth="6"/><circle cx="84" cy="86" r="43" fill="#F1E8CC" stroke="#AC853A" strokeWidth="7"/></svg></At>
  <Title x={218} y={840} size={40} color={C.orange}>Premium plan</Title>
  <ChargeV20 t={t} at={duration*.85} x={1200} y={476} size={390}/>
 </Set>;
};

/** Open the file into a shot recipe, then feed that SAME file into Claude.
 * The reel's authored action drivers continue after every contact. */
export const SkillV20:React.FC<{duration:number;importAt:number}>=({duration,importAt})=>{
 const t=clock(),unroll=e(t,.35,.55),direct=e(t,1.1,2.0),compile=e(t,4.6,.6),load=e(t,Math.max(5.8,importAt-.7),.65),ready=e(t,importAt,.4);
 return <Set t={t}><Light x={1030} power={.65}/><Desk x={146} y={743} w={1580}/>
  <At x={159} y={104} style={{display:'flex',gap:23,alignItems:'center'}}><Logo name="claude.png" size={111}/><span style={{fontSize:58,fontWeight:800}}>{ready>.5?'Ready in Claude':'A skill is reusable instructions'}</span></At>
  <div style={{position:'absolute',inset:0,opacity:1-compile,transform:`translateY(${-18*compile}px) scale(${1-.10*compile})`,transformOrigin:'50% 40%'}}>
   <At x={474} y={281} style={{width:1117,height:394,background:'linear-gradient(100deg,#FFFBEA,#E6D8B8)',border:'4px solid white',borderRadius:14,boxShadow:'0 20px 31px #53412625',clipPath:`inset(0 ${(1-unroll)*90}% 0 0)`}}>
    {[0,1,2].map(i=><At key={i} x={27+i*367} y={35} style={{opacity:e(t,.7+i*.3,.3)}}>
     <div style={{width:331,height:190,border:'4px solid #FFF7DC',borderRadius:15,overflow:'hidden',background:'#E1E7D0',position:'relative'}}>
      {i===0?<><At x={27} y={31}><Logo name="seedance.png" size={114}/></At><At x={182} y={49}><Lens t={t} size={97} angle={direct*130}/></At><svg width="331" height="190" style={{position:'absolute',inset:0}}><path d="M34 171H288" fill="none" stroke={C.orange} strokeWidth="7" pathLength="1" strokeDasharray="1" strokeDashoffset={1-direct}/></svg></>:i===1?<Shot p={direct} w={331}/>:<><At x={57} y={74}><svg width="216" height="108"><path d="M3 25L24 5H84L104 25H207V101H3Z" fill="#C7AC68" stroke="#FFFCDF" strokeWidth="4"/></svg></At><At x={113} y={10+46*direct} style={{transform:`scale(${1-.18*direct})`}}><SkillFile t={t} size={93} label="video"/></At></>}
     </div><Title x={25} y={225} size={32}>{['Choose model','Direct camera','Save video'][i]}</Title>
    </At>)}
   </At>
   <Actor t={t} x={190} y={508} size={240} role="archivist" look={1} reach={unroll} lift={unroll*.7} contact={.9}/>
   <Actor t={t} x={916+direct*170} y={655} size={205} role="operator" look={1} reach={direct} lift={.7} walk={Math.sin(direct*Math.PI)} contact={3.1}/>
  </div>
  <At x={994} y={290} style={{opacity:e(t,5.5,.4),transform:`translateX(${110*(1-e(t,5.5,.5))}px)`}}><SkillStation t={t} load={ready} run={ready} w={693} minimal/></At>
  <div style={{opacity:compile}}><Actor t={t} x={642} y={513} size={279} role="courier" look={1} lift={compile*.86} reach={load} contact={importAt} happy={ready>.9}/></div>
  <At x={lerp(905,1100,load)} y={lerp(446,569,load)-Math.sin(load*Math.PI)*110} style={{opacity:compile*(1-ready),transform:`translateY(${-20*e(t,5.6,.4)+20*e(t,6.3,.4)}px) rotate(${-9+load*9}deg) scale(${1-load*.35})`}}><SkillFile t={t} size={230}/></At>
  <ChargeV20 t={t} at={4.6} x={863} y={504} size={405}/><ChargeV20 t={t} at={importAt} x={1130} y={568} size={420}/>
  <div style={{opacity:compile}}><Title x={186} y={880} size={42} color={C.orange}>Upload into Claude</Title></div>
  <ReceiverV22 t={t} duration={duration} kind="skill"/>
 </Set>;
};

/** A real cinematography contact sheet: same Claude actor, three distinct
 * framings. Cards are still UI overlays; the action inside is a miniature set. */
export const ShotPlanV20:React.FC<{t:number;duration:number}>=({t,duration})=>{
 const stage=Math.min(2,Math.floor(clamp((t-.3)/(duration-1))*3));
 return <><Title x={30} y={23} size={39} color={C.orange}>Plan the shots</Title>
  {[0,1,2].map(i=>{const p=e(t,.22+i*.38,.35),q=e(t,.8+i*.7,1.25),s=i===2?2.15:i===1?1.22:.82;return <At key={i} x={29+i*326} y={91} style={{width:302,height:229,borderRadius:16,overflow:'hidden',border:`4px solid ${stage===i?C.orange:'#FFFCF1'}`,boxShadow:stage===i?'0 0 20px #E4AA6655':undefined,transform:`translateY(${23*(1-p)}px)`,opacity:p}}>
   <svg width="302" height="229"><rect width="302" height="229" fill="#D4E0CF"/><path d="M0 89L43 52H89V229H0M212 34H272L302 68V229H212" fill="#8DA28D"/>{[0,1,2,3].map(j=><path key={j} d={`M18 ${100+j*29}H65M232 ${64+j*29}H282`} stroke="#EEF0D8" strokeWidth="6"/>)}<path d="M0 187H302V229H0Z" fill="#C5B795"/><path d="M0 186H302" stroke="#FFF4D5" strokeWidth="7"/></svg>
   <At x={i===2?4:54+q*28} y={i===2?9:56-q*(i===1?27:0)} style={{transform:`scale(${s})`,transformOrigin:'50% 25%'}}><Actor t={t} x={0} y={0} size={192} role="courier" walk={i===1?Math.sin(q*Math.PI):0} lift={i===1?Math.sin(q*Math.PI)*.6:.35} look={1} contact={.8+i*.7+1.25}/></At>
   <svg width="302" height="229" style={{position:'absolute',inset:0}}><path d="M13 34V13H34M268 13H289V34M289 195V216H268M34 216H13V195" stroke="#FFF9E7" strokeWidth="3" fill="none"/></svg>
  </At>;})}
  {['01 · Establish','02 · Follow','03 · Detail'].map((s,i)=><Title key={s} x={42+i*326} y={344} size={29}>{s}</Title>)}
 </>;
};
