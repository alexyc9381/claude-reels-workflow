import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Logo,SkillFile,Key,C,lerp,BrandedBackground} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {roadmapBeatsV13} from './ScenesV13';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const settle=(t:number,at:number)=>t<at?0:Math.sin((t-at)*19)*Math.exp(-(t-at)*8);
const flash=(t:number,at:number)=>t<at?0:Math.exp(-(t-at)*5);
// Short-form transfer: one practical light, contact plane and performing hero.
// Keep this film's Manrope, white glass and original 2D rig.
const Stage:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/><div style={{position:'absolute',left:110,top:740,width:1700,height:240,borderRadius:'50%',background:'linear-gradient(#FFFDF7BA,#E8B18C55)',borderTop:'3px solid #FFF',boxShadow:'0 34px 65px #7E401819'}}/>{children}</AbsoluteFill>;
const Glow:React.FC<{t:number;at:number;x:number;y:number}>=({t,at,x,y})=><At x={x-230} y={y-230} style={{width:460,height:460,borderRadius:'50%',background:'radial-gradient(circle,#F99D5077,transparent 68%)',opacity:flash(t,at),transform:`scale(${1+easeOut(t,at,.55)*.3})`,pointerEvents:'none'}}><span/></At>;
const Clip:React.FC<{src?:string;w:number;h:number}>=({src='v4/claude-result.mp4',w,h})=><div style={{position:'relative',width:w,height:h,borderRadius:24,overflow:'hidden',background:'#18221D',boxShadow:'0 20px 42px #3A271E30',border:'4px solid #FFFDF4'}}><Loop durationInFrames={120}><OffthreadVideo src={staticFile(src)} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>;

/** Recurring invoice versus a per-generation ticket. Claude pulls the ticket
 * and sends it into the result. No unlabelled savings ratio or equal-unit claim. */
export const CostV18:React.FC<{duration:number;brandAt:number;bold?:boolean}>=({duration})=>{
 const t=clock(),u=t/duration,open=easeOut(t,0,.36),pull=e(u,.18,.15),send=e(u,.46,.12),result=e(u,.58,.07);
 return <Stage t={t}>
  <At x={175} y={125}><Logo name="higgsfield.jpg" size={156}/><div style={{position:'absolute',left:183,top:42,fontSize:66,fontWeight:800,whiteSpace:'nowrap'}}>Higgsfield</div></At>
  <At x={1030} y={125}><Logo name="claude.png" size={145}/><div style={{position:'absolute',left:176,top:41,fontSize:60,fontWeight:800,whiteSpace:'nowrap'}}>Claude skill</div></At>
  <At x={180} y={329} style={{transform:`translateY(${55*(1-open)}px)`,opacity:open}}>
   {[2,1,0].map(i=><div key={i} style={{position:'absolute',left:i*16,top:i*21,width:630,height:415,borderRadius:24,background:i?'#D6C8AD':'#FFFEF7',border:'3px solid white',boxShadow:'0 18px 30px #573F2323',transform:`rotate(${i*1.5}deg)`}}/>)}
   <div style={{position:'absolute',left:45,top:27,fontSize:177,fontWeight:800,letterSpacing:-9}}>$100</div>
   <div style={{position:'absolute',left:55,top:231,fontSize:46,fontWeight:700,whiteSpace:'nowrap'}}>/ month</div>
   <div style={{position:'absolute',left:55,top:307,fontSize:29,color:'#645847',whiteSpace:'nowrap'}}>Plan example</div>
   <svg width="630" height="415" style={{position:'absolute',inset:0}}><path d="M480 275A52 52 0 1 1 492 343M492 314V346H461" fill="none" stroke="#AA7351" strokeWidth="9" strokeLinecap="round" transform={`rotate(${e(u,.01,.16)*360+e(u,.34,.13)*360+e(u,.72,.16)*360} 470 305)`}/></svg>
  </At>
  <At x={1028} y={325} style={{opacity:open,transform:`translateY(${50*(1-open)}px)`}}><div style={{fontSize:177,fontWeight:800,letterSpacing:-8,lineHeight:1,color:C.teal}}>~10¢</div><div style={{fontSize:44,fontWeight:700,marginTop:28}}>/ generation</div><div style={{fontSize:26,color:'#536A5E',marginTop:16,width:310}}>Estimate · varies by model</div></At>
  <Glow t={t} at={duration*.58} x={1500} y={640}/>
  <At x={lerp(1200,1440,send)} y={lerp(580,480,send)-Math.sin(send*Math.PI)*100-pull*25} style={{opacity:(1-result)*pull,transform:`rotate(${-12+send*22}deg) scale(${1-send*.6})`}}><svg width="220" height="117" viewBox="0 0 220 117"><path d="M12 4H208V38Q177 58 208 78V112H12V78Q43 58 12 38Z" fill="#FFFBEB" stroke="#CD9B5E" strokeWidth="4"/><path d="M151 13V103" stroke="#B69F7E" strokeWidth="3" strokeDasharray="5 6"/><path d="M59 58L79 77L121 34" fill="none" stroke="#3F775C" strokeWidth="8" strokeLinecap="round"/></svg></At>
  <Actor t={t} x={905+pull*100} y={631} size={315} role="operator" lift={.4+pull*.4} reach={send} walk={Math.sin(pull*Math.PI)} look={1} contact={duration*.58} happy={result>.8}/>
  <At x={1370} y={583} style={{opacity:result,transform:`translateX(${70*(1-result)}px) scale(${.94+.06*result})`}}><Clip w={346} h={151}/></At>
 </Stage>;
};

/** The skill arrival opens one workspace; its output expands in place.
 * The input, mechanism and payoff never compete at full prominence. */
export const ProductionV18:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,carry=e(u,0,.18),insert=e(u,.18,.10),output=e(u,.48,.10),save=e(u,.83,.09),contact=duration*.28;
 return <Stage t={t}>
  <div style={{position:'absolute',inset:0,opacity:Math.max(0,1-output*2),transform:`translateX(${-100*output}px)`}}>
   <At x={185+carry*290+insert*425} y={307-Math.sin(carry*Math.PI)*70-insert*37} style={{transform:`rotate(${-10+carry*10}deg) scale(${1-insert*.62})`,opacity:1-e(u,.275,.012)}}><SkillFile t={t} size={330}/></At>
   <Actor t={t} x={100+carry*315} y={618} size={340} role="courier" walk={Math.sin(carry*Math.PI)} lift={.86} reach={insert} look={1} contact={contact}/>
   <Glass x={790} y={170} w={895} h={545} t={t} frost={.58} style={{transform:`translateY(${-12*settle(t,contact)}px)`}}>
    <At x={40} y={28}><Logo name="claude.png" size={119}/><div style={{position:'absolute',left:147,top:23,fontSize:61,fontWeight:800}}>Claude</div></At>
    <div style={{position:'absolute',left:44,top:208,width:797,height:126,borderRadius:23,border:'2px solid #DCBFA0',background:'#FFFFFFB8',boxShadow:'inset 0 3px 12px #BC8A4220'}}><div style={{padding:'34px 38px',fontSize:42,fontWeight:700,opacity:e(u,.25,.04)}}>/fal-video</div></div>
    {['seedance.png','google.png','hailuo.png'].map((logo,i)=>{const a=e(u,.30+i*.045,.045);return <At key={logo} x={93+i*249} y={378} style={{opacity:a,transform:`translateY(${28*(1-a)-10*settle(t,duration*(.345+i*.045))}px)`}}><Logo name={logo} size={99}/></At>;})}
   </Glass>
   <Glow t={t} at={contact} x={995} y={440}/>
  </div>
  <At x={lerp(830,160,output)} y={lerp(332,137,output)} style={{opacity:Math.max(0,(output-.5)*2),transform:`scale(${lerp(.48,1,output)})`,transformOrigin:'0 0'}}>
   <div style={{width:1580,height:741,padding:12,borderRadius:35,background:'linear-gradient(120deg,#FFFDF6,#D4E2D4)',boxShadow:'0 25px 65px #633B292D'}}><Clip w={1572} h={729}/></div>
   <At x={30} y={29}><Logo name="fal.png" size={85}/></At>
  </At>
  <At x={210} y={842} style={{opacity:save,transform:`translateY(${75*(1-save)}px)`}}><div style={{display:'flex',alignItems:'center',gap:23,padding:'17px 28px',borderRadius:23,background:'#FFFCF2',border:'2px solid white',boxShadow:'0 12px 30px #512E2425'}}><svg width="57" height="56" viewBox="0 0 57 56"><path d="M4 16H23L30 9H52V51H4Z" fill="#E7B45E" stroke="#FFF" strokeWidth="3"/><path d="M29 0V32M19 23L29 33L39 23" fill="none" stroke="#335D4B" strokeWidth="5" strokeLinecap="round"/></svg><span style={{fontSize:38,fontWeight:750}}>On your computer</span></div></At>
 </Stage>;
};

/** One unfolded route. Courier, route draw and destination activation share
 * clocks, with one fully lit stop at a time and no repeated full scene. */
export const RoadmapV18:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),beats=roadmapBeatsV13.map(b=>b*duration),arrive=beats.map(at=>easeOut(t,at,.18));
 const p=e(t,beats[0],beats[2]-beats[0]),x=340+1240*p,y=650-440*p*(1-p),stage=t<beats[1]?0:t<beats[2]?1:2;
 return <Stage t={t}>
  <At x={110} y={146} style={{transform:`perspective(1800px) rotateX(${10*(1-easeOut(t,0,.35))}deg)`,transformOrigin:'50% 100%'}}>
   <svg width="1695" height="751" viewBox="0 0 1695 751"><defs><linearGradient id="v18-map"><stop stopColor="#FFFDF5"/><stop offset=".34" stopColor="#F0E8D5"/><stop offset=".35" stopColor="#FFFCF2"/><stop offset=".68" stopColor="#F1E9D7"/><stop offset=".69" stopColor="#FFFEF7"/></linearGradient></defs><path d="M18 32L555 0L1122 32L1671 0L1690 697L1135 745L568 715L0 750Z" fill="url(#v18-map)" stroke="#FFF" strokeWidth="5"/><path d="M555 0L568 715M1122 32L1135 745" stroke="#BFAE8838" strokeWidth="4"/>
    {[0,1,2,3].map(i=><path key={i} d={`M25 ${92+i*31}Q250 ${240+i*31} 430 ${95+i*31}T855 ${112+i*31}T1300 ${92+i*31}T1650 ${111+i*31}`} fill="none" stroke="#C8B999" strokeWidth="2" opacity=".21"/>)}
   </svg>
  </At>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M340 650Q960 430 1580 650" fill="none" stroke="#D6C6A8" strokeWidth="33"/><path d="M340 650Q960 430 1580 650" fill="none" stroke="#FFFDF5" strokeWidth="23"/><path d="M340 650Q960 430 1580 650" fill="none" stroke={C.orange} strokeWidth="11" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>
  {[340,960,1580].map((cx,i)=><React.Fragment key={cx}><Glow t={t} at={beats[i]} x={cx} y={i===1?360:510}/><At x={cx-171} y={i===1?200:310} style={{opacity:stage===i?1:.46+.35*arrive[i],transform:`scale(${stage===i?1.06:1}) translateY(${-10*settle(t,beats[i])}px)`,transformOrigin:'50% 100%'}}>
   {i===0?<div style={{width:342,height:205,position:'relative'}}><At x={183} y={29}><Logo name="fal.png" size={147}/></At><At x={-28+arrive[0]*47} y={18} style={{transform:`rotate(${-24*(1-arrive[0])}deg)`}}><Key t={t} size={230}/></At></div>:i===1?<div style={{position:'relative',width:342,height:205}}><At x={96} y={22}><Logo name="claude.png" size={153}/></At><At x={-13+arrive[1]*58} y={55-arrive[1]*26} style={{opacity:1-arrive[1],transform:`scale(${1-arrive[1]*.3})`}}><SkillFile t={t} size={135}/></At></div>:<div style={{display:'flex',gap:9}}>{['v9/higgsfield-comparison.mp4','v4/claude-result.mp4'].map(src=><Clip key={src} src={src} w={157} h={210}/>)}</div>}
  </At><At x={cx-208} y={795} style={{width:416,textAlign:'center',fontSize:43,fontWeight:800,color:stage===i?C.orange:C.ink}}><span>{i+1} · {['Connect','Load the skill','Compare'][i]}</span></At></React.Fragment>)}
  <Actor t={t} x={x-118} y={y-126} size={236} role="courier" walk={Math.sin(p*Math.PI)} lift={.45} look={1} contact={beats[stage]} happy={stage===2}/>
 </Stage>;
};

export const TutorialSkipV18:React.FC=()=>{
 const t=clock(),a=easeOut(t,0,.28)*(1-e(t,4.6,.4));
 return <AbsoluteFill style={{opacity:a,fontFamily:bodyFont,pointerEvents:'none'}}><Glass x={1195} y={115} w={595} h={118} t={t} frost={.88} style={{transform:`translateY(${22*(1-a)}px)`}}><div style={{position:'absolute',left:27,top:33,fontSize:34,fontWeight:750,color:C.ink}}>Skip to tutorial</div><div style={{position:'absolute',right:22,top:20,padding:'13px 18px',borderRadius:17,background:'#F5D9B5',fontSize:36,fontWeight:850,color:'#9B440F'}}>2:03 →</div></Glass></AbsoluteFill>;
};
