import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Surface, Occluder, PALETTES} from '../WorldKit';
import {bodyFont} from './cinematic-brand';
import {easeInOut as e, easeOut} from './glass-motion';
import {Actor, Glass, Label, Logo, SkillFile, Key, CameraIcon, C, clamp, lerp, visible, BrandedBackground} from './YouTubeV8Primitives';
import {ShotStage} from './NarrativeV9';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;

/** One production room, three depth planes. Architecture is secondary to the
 * transaction; all action drivers are frame-derived and seek-safe. */
export const EditRoom:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}>
 <BrandedBackground t={t}/>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
  <defs><linearGradient id="v11-room" x2="0" y2="1"><stop stopColor="#FFF8EE"/><stop offset="1" stopColor="#E8C9A9"/></linearGradient><linearGradient id="v11-floor"><stop stopColor="#C1A888"/><stop offset=".5" stopColor="#FBF0DC"/><stop offset="1" stopColor="#D5B697"/></linearGradient></defs>
  <path d="M0 0H1920V736H0Z" fill="url(#v11-room)"/>
  <path d="M0 736H1920V1080H0Z" fill="url(#v11-floor)"/>
  <path d="M0 735H1920" stroke="#FFFFFF" strokeWidth="5"/>
  {[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${340+i*206} 735L${-360+i*460} 1080`} stroke="#76563920" strokeWidth="2"/>)}
  {[0,1,2].map(i=><g key={i} opacity=".45"><path d={`M${130+i*615} 0V63`} stroke="#755E49" strokeWidth="4"/><path d={`M${60+i*615} 62H${200+i*615}L${218+i*615} 84H${42+i*615}Z`} fill="#FFFDF6" stroke="#B59070"/><path d={`M${68+i*615} 87L${-20+i*615} 620H${320+i*615}L${192+i*615} 87Z`} fill="#FFFFFF" opacity=".23"/></g>)}
  {Array.from({length:19},(_,i)=><path key={i} d={`M${35+i*103} 103V661`} stroke="#B38B6520" strokeWidth="2"/>)}
 </svg>
 <div style={{position:'absolute',inset:0,transform:`translateX(${-8*e(t,0,8)}px) scale(${1+.013*e(t,0,8)})`,transformOrigin:'50% 47%'}}>{children}</div>
 <div style={{position:'absolute',left:-27,top:0,bottom:0,width:63,background:'linear-gradient(90deg,#684831,#C29A76)',boxShadow:'12px 0 32px #68483124'}}/>
 <div style={{position:'absolute',right:-26,bottom:-24,width:242,height:126,background:'linear-gradient(125deg,#A87850,#795338)',transform:'skewX(-14deg)',boxShadow:'0 -14px 28px #63462E20'}}/>
</AbsoluteFill>;

/** Calendar pages print an annual receipt. A physical pass is scanned and the
 * three model-vault doors open in response. No unrelated coins or machines. */
export const AccessPriceV11:React.FC<{duration:number;brandAt:number}>=({duration,brandAt})=>{
 const t=clock(),u=t/duration,print=e(u,.01,.14),scan=e(u,.22,.085),open=e(u,.34,.29),arrive=e(u,.01,.13);
 return <EditRoom t={t}>
  <Glass x={134} y={139} w={543} h={558} t={t} frost={.7}>
   <Label x={31} y={28} size={28} color={C.orange}>RECURRING ACCESS</Label>
   <div style={{position:'absolute',left:36,top:98,width:466,height:395,overflow:'hidden',borderRadius:13,background:'#E6D9C5',boxShadow:'inset 0 5px 15px #53381A25'}}>
    <div style={{position:'absolute',left:15,top:-245+245*print,width:432,height:573,background:'#FFFCF5',boxShadow:'0 7px 18px #55391A25',clipPath:'polygon(0 0,100% 0,100% 97%,95% 100%,90% 97%,85% 100%,80% 97%,75% 100%,70% 97%,65% 100%,60% 97%,55% 100%,50% 97%,45% 100%,40% 97%,35% 100%,30% 97%,25% 100%,20% 97%,15% 100%,10% 97%,5% 100%,0 97%)'}}>
     <Label x={24} y={30} size={26}>12 months of access</Label>
     {Array.from({length:12},(_,i)=><div key={i} style={{position:'absolute',left:27+(i%6)*62,top:90+Math.floor(i/6)*57,width:47,height:39,borderRadius:6,background:i<Math.ceil(print*12)?C.clay:'#EEE3D3',color:i<Math.ceil(print*12)?'#FFF8EE':'#84654A',fontSize:19,fontWeight:700,textAlign:'center',paddingTop:5,boxSizing:'border-box'}}>{String(i+1).padStart(2,'0')}</div>)}
     <Label x={24} y={243} size={66} style={{fontWeight:800}}>$1,000+</Label><Label x={29} y={325} size={27} color={C.orange}>per year</Label>
    </div>
   </div>
  </Glass>
  <Glass x={816} y={136} w={928} h={559} t={t} frost={.48}>
   <At x={32} y={25} style={{opacity:easeOut(t,brandAt,.2)}}><Logo name="higgsfield.jpg" size={79}/><Label x={105} y={20} size={39}>Higgsfield</Label></At>
   {[['hailuo.png','Hailuo'],['google.png','Google'],['seedance.png','Seedance']].map(([logo,name],i)=>{
    const door=e(u,.34+i*.12,.10),flash=Math.sin(door*Math.PI);return <At key={name} x={31+i*297} y={148}>
     <div style={{width:271,height:332,borderRadius:21,overflow:'hidden',background:'linear-gradient(145deg,#316B65,#173E3D)',boxShadow:'inset 0 8px 23px #10292370',position:'relative'}}>
      <div style={{position:'absolute',inset:20,border:'1px solid #ABC9B8',borderRadius:14,boxShadow:`inset 0 0 ${flash*70}px #FCE7A1`}}/>
      <At x={94} y={28} style={{transform:`translateY(${(1-door)*55}px) scale(${.9+.1*door})`}}><Logo name={logo} size={84}/></At>
      <At x={19} y={143}><ShotStage t={t+i*.2} w={233} mode={i===0?'jump':i===1?'orbit':'chase'} progress={e(u,.46+i*.1,.22)}/></At>
      <Label x={30} y={282} size={27} color="#FFF7E6" style={{width:211,textAlign:'center'}}>{name}</Label>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,#EEE4D4,#FFFDF5 47%,#D6BFA3)',transform:`translateY(${-105*door}%)`,borderBottom:'7px solid '+C.clay}}>
       {Array.from({length:10},(_,j)=><div key={j} style={{position:'absolute',left:0,right:0,top:14+j*30,height:2,background:'#A2805E30'}}/>)}
       <svg width="271" height="332"><path d="M113 173V140a24 24 0 0 1 48 0v33" fill="none" stroke={C.orange} strokeWidth="8"/><rect x="98" y="166" width="80" height="58" rx="11" fill={C.orange}/><circle cx="138" cy="189" r="6" fill="#FFF9ED"/></svg>
      </div>
     </div>
    </At>;
   })}
  </Glass>
  <At x={700} y={552}><svg width="115" height="216"><path d="M35 75H83V208H35Z" fill="#C3AB8E"/><rect x="5" y="6" width="103" height="105" rx="18" fill="#FFF9ED" stroke="#B09878" strokeWidth="3"/><rect x="24" y="29" width="65" height="58" rx="8" fill={scan>.95?C.teal:'#684E36'}/><path d="M35 58H81" stroke="#FFF4DC" strokeWidth="3"/></svg></At>
  <Actor t={t} x={430+arrive*126} y={520} size={235} role="archivist" look={1} walk={Math.sin(arrive*Math.PI)} reach={scan} lift={scan*.65} contact={duration*.307}/>
  <At x={lerp(538,701,scan)} y={lerp(646,585,scan)-Math.sin(scan*Math.PI)*18} style={{transform:`rotate(${-14+scan*14}deg)`,opacity:arrive}}><div style={{width:111,height:74,borderRadius:10,background:'#FFF8E9',border:'3px solid '+C.clay,boxShadow:'0 8px 20px #54381E35'}}><div style={{height:19,marginTop:14,background:C.orange}}/><div style={{margin:'11px 13px',height:5,background:'#B3997A'}}/></div></At>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>{[0,1,2].map(i=>{const q=e(u,.32+i*.12,.11),r=e(u,.78+i*.045,.075);return <g key={i}><path d={`M757 603C792 779 ${1015+i*296} 799 ${1015+i*296} 610`} fill="none" stroke={i===1?C.teal:C.orange} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-q} opacity={q*(1-r)*.75}/><circle cx={1015+i*296} cy={lerp(668,608,q)} r={5+5*Math.sin(q*Math.PI)} fill="#FFE3B0" opacity={q*(1-r)}/></g>;})}</svg>
  <div style={{position:'absolute',left:194,top:727,width:440,height:93,borderRadius:18,background:'#FFF8E9',border:'2px solid #FFFFFF',boxShadow:'0 12px 28px #5A3C2024',opacity:e(u,.72,.08),transform:`translateY(${32*(1-e(u,.72,.08))}px)`}}><Label x={22} y={24} size={32} color={C.orange}>Recurring subscription</Label></div>
 </EditRoom>;
};

/** A compact persistent orientation aid, source-anchored rather than timed to
 * arbitrary output seconds. Completion only follows the spoken demo. */
export const SetupChecklistV11:React.FC<{duration:number;accountAt:number;keysAt:number}>=({duration,accountAt,keysAt})=>{
 const t=clock(),active=t<accountAt?0:t<keysAt?1:t<keysAt+7?2:3;
 return <AbsoluteFill style={{opacity:visible(t,duration)}}><Glass x={58} y={158} w={390} h={365} t={t} frost={.84} style={{transform:`translateX(${-35*(1-easeOut(t,0,.38))}px)`}}>
  <At x={23} y={21}><Logo name="fal.png" size={48}/><Label x={66} y={8} size={28}>Setup checklist</Label></At>
  {['Go to fal.ai','Create an account','Open API keys','Create + copy a key'].map((s,i)=><At key={s} x={23} y={96+i*60}>
   <div style={{position:'absolute',left:-8,top:-8,width:354,height:52,borderRadius:13,background:active===i?'#F2D2B5':'transparent',transition:undefined}}/>
   <svg width="35" height="35" style={{position:'absolute',left:0,top:0}}><circle cx="17" cy="17" r="15" fill={i<=active?C.orange:'#E4D9C6'}/>{i<active?<path d="M9 17L15 23L25 12" fill="none" stroke="#FFF9EC" strokeWidth="3"/>:<text x="17" y="23" textAnchor="middle" fill={i===active?'#FFF9EC':'#775D44'} fontSize="18" fontWeight="800">{i+1}</text>}</svg>
   <Label x={47} y={1} size={24} style={{fontWeight:i===active?800:600}}>{s}</Label>
  </At>)}
  <div style={{position:'absolute',left:27,bottom:16,width:334,height:4,borderRadius:3,background:'#D9CBB6'}}><div style={{width:`${(active+1)*25}%`,height:4,background:C.orange,borderRadius:3}}/></div>
 </Glass></AbsoluteFill>;
};

/** The console issues one illustrative credential; its copy becomes the same
 * object in a closed vault. No captured secret is ever composited back in. */
export const CredentialV11:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),issue=e(t,4.7,.65),copy=e(t,9.2,1.15),store=e(t,11.4,1.25),close=e(t,13.25,.85);
 return <AbsoluteFill style={{opacity:visible(t,duration)}}>
  <Glass x={491} y={146} w={823} h={563} t={t} frost={.8}>
   <At x={26} y={24}><Logo name="fal.png" size={55}/><Label x={80} y={10} size={34}>Create a private API key</Label></At>
   <div style={{position:'absolute',left:28,top:111,width:754,height:141,background:'#FBF7EE',border:'2px solid #D6C8B3',borderRadius:18,boxShadow:'inset 0 3px 10px #86614413'}}>
    <Label x={21} y={20} size={23} color={C.teal}>API keys / New key</Label>
    <Label x={22} y={70} size={31}>{issue>.6?'•••• •••• •••• ••••':'Give this key a name…'}</Label>
    <div style={{position:'absolute',right:17,top:62,width:126,height:56,borderRadius:12,background:issue>.9?C.teal:C.orange,color:'#FFF9EE',fontSize:25,fontWeight:750,textAlign:'center',paddingTop:11,boxSizing:'border-box',transform:`scale(${1-.07*Math.sin(issue*Math.PI)})`}}>{issue>.9?'Copy':'Create'}</div>
   </div>
   <At x={43} y={291} style={{opacity:issue,transform:`translateY(${(1-issue)*32}px)`}}><Key size={118} t={t}/><Label x={144} y={16} size={27}>One private credential</Label><Label x={144} y={65} size={24} color={C.teal}>Never show the value on screen</Label></At>
   <Label x={28} y={507} size={22} color={C.teal}>Illustration · private values hidden</Label>
   <At x={543} y={284}>
    <svg width="215" height="195"><path d="M17 33L40 11H189V176H17Z" fill="#C5D8CB" stroke="#FFF" strokeWidth="4"/><rect x="33" y="31" width="154" height="131" rx="12" fill="#234D48"/><path d="M36 167H193" stroke={C.teal} strokeWidth="5"/></svg>
    <div style={{position:'absolute',left:32,top:29,width:159,height:139,borderRadius:14,background:'linear-gradient(120deg,#E8F1E5,#A7C8B7)',border:'3px solid #FFF',transform:`perspective(650px) rotateY(${-74*(1-close)}deg)`,transformOrigin:'left',boxShadow:'6px 6px 13px #153F3B30'}}><svg width="155" height="135"><circle cx="80" cy="67" r="32" fill="#F7F9EC" stroke={C.teal} strokeWidth="6"/><g transform={`rotate(${close*120} 80 67)`}><path d="M80 38V96M51 67H109" stroke={C.teal} strokeWidth="7"/></g></svg></div>
   </At>
   <At x={lerp(642,609,store)} y={lerp(154,350,copy)-Math.sin(store*Math.PI)*39} style={{opacity:copy*(1-close),transform:`scale(${.65-.25*store}) rotate(${15-15*store}deg)`,transformOrigin:'top left'}}><Key size={130} t={t}/></At>
  </Glass>
  <Actor t={t} x={1104-54*copy} y={580} size={170} role="operator" look={-1} reach={copy} lift={store*.8} contact={12.65} happy={close>.7}/>
 </AbsoluteFill>;
};

/** One continuous rooftop shot: approach, anticipation, airborne tracking,
 * landing recovery. Uses the short-form set engine, not a filmstrip of lines. */
export const RooftopBeatV11:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,run=e(u,.06,.20),jump=e(u,.28,.44),land=e(u,.72,.13),settle=u<.72?0:Math.exp(-(u-.72)*27)*Math.sin((u-.72)*43);
 const x=212+run*90+jump*440,y=365-4*jump*(1-jump)*170+settle*14;
 const world={...PALETTES.dawnroof,horizon:690,glowX:770,glowY:130,glowR:118};
 return <AbsoluteFill data-motif="rooftop-approach-flight-landing" style={{opacity:visible(t,duration)}}><Glass x={61} y={151} w={1226} h={574} t={t} frost={.48}>
  <div style={{position:'absolute',left:10,top:10,width:1202,height:488,overflow:'hidden',borderRadius:24}}>
   <div style={{position:'absolute',width:1012,height:792,transform:'scale(1.188,.79)',transformOrigin:'top left'}}><Surface w={world} t={t*30} stars={false} overhead={false}/><Occluder c="#553747" w={51} z={70}/></div>
   <svg width="1202" height="488" style={{position:'absolute',inset:0}}>
    <defs><linearGradient id="roof-v11" x2="0" y2="1"><stop stopColor="#885C64"/><stop offset="1" stopColor="#3E2C38"/></linearGradient></defs>
    {[0,1].map(i=><g key={i} transform={`translate(${i?733:-80},0)`}><path d="M0 401L53 368H442L459 401V520H0Z" fill="url(#roof-v11)"/><path d="M0 401H459M53 369H439" stroke="#F4C495" strokeWidth="5"/>{[0,1,2,3,4].map(j=><path key={j} d={`M${j*87+22} 404V487`} stroke="#231E2A" strokeWidth="3"/>)}<path d="M33 430H421" stroke="#C4958125" strokeWidth="2"/></g>)}
    {[0,1,2].map(i=><g key={i} transform={`translate(${(i*327+t*(i%2?-64:89)+1500)%1500-160},${146+i*69})`}><path d="M0 14L14 0H64L84 14L78 28H5Z" fill="#264A4C" stroke="#DBDAC2" strokeWidth="2"/><path d="M21 4H57L66 13H14Z" fill="#B2D5D0"/><path d="M4 29H75" stroke="#E7AD61" strokeWidth="3"/></g>)}
    <g transform="translate(92,289)"><rect width="48" height="79" fill="#D09278"/><path d="M-4 4H52M8 13H40M8 24H40M8 35H40" stroke="#533947" strokeWidth="5"/></g>
    <g transform="translate(1036,279)"><path d="M0 90V18H57V90M10 18V3H46V18" fill="#80606A" stroke="#F6CB9E" strokeWidth="3"/><path d="M14 37H44M14 50H44M14 63H44" stroke="#533B4D" strokeWidth="4"/></g>
    <path d={`M${x+50} 444H${x+136}`} stroke="#FFE9B1" strokeWidth="4" opacity={land*.7}/>
   </svg>
   <Actor t={t} x={x} y={y-104} size={129} role="courier" look={1} walk={u<.29?Math.sin(run*Math.PI):0} lift={Math.sin(jump*Math.PI)*.85} lean={-8*Math.sin(jump*Math.PI)} contact={duration*.72}/>
   <At x={148+jump*341} y={394}><CameraIcon t={t} size={77}/></At>
   <svg width="1202" height="488" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={`M${213+jump*341} 419L${x+75} ${y-64}L${x+143} ${y+13}Z`} fill="#EACF9730" stroke="#FFF0CD77" strokeWidth="1"/>{[0,1,2,3,4].map(i=><path key={i} d={`M${820+i*12} ${406+i*7}l${10+i*4} ${-22-i*9}`} stroke="#ECC99C" strokeWidth="3" opacity={land*(1-e(u,.87,.1))}/>)}</svg>
   <div style={{position:'absolute',left:22,top:22,padding:'9px 15px',borderRadius:10,background:'#FFF8EADF',fontFamily:bodyFont,fontWeight:800,fontSize:27,color:C.orange}}>A · The jump</div>
  </div>
  <Label x={27} y={519} size={28} color={C.teal}>{u<.28?'Approach the edge':u<.72?'Follow the leap · neon city · hovering traffic':'Land the shot · keep the movement continuous'}</Label>
 </Glass></AbsoluteFill>;
};

export const BonusTeaserV11:React.FC<{duration:number;secondsToBonus:number}>=({duration,secondsToBonus})=>{
 const t=clock(),lid=e(t,.4,.6),p=easeOut(t,0,.3),remaining=Math.max(0,Math.ceil(secondsToBonus-t));
 return <AbsoluteFill style={{opacity:visible(t,duration)}}><Glass x={58} y={774} w={1116} h={244} t={t} frost={.85} style={{transform:`translateY(${40*(1-p)}px)`}}>
  <At x={28} y={51}>
   <div style={{position:'absolute',left:29,top:21-37*lid,transform:`rotate(${-8*lid}deg)`}}><SkillFile t={t} size={79}/></div>
   <svg width="151" height="155"><path d="M11 47H141V146H11Z" fill="#EAC6A5" stroke="#FFF8EB" strokeWidth="3"/><path d="M63 47H91V146H63Z" fill={C.clay}/><g transform={`translate(0,${-39*lid}) rotate(${-7*lid} 76 40)`}><rect x="4" y="32" width="144" height="25" rx="4" fill="#F7DFBF" stroke="#FFF" strokeWidth="3"/><path d="M67 32C-13 -3 48 -24 77 32C130 -25 171 5 87 32" fill="none" stroke={C.clay} strokeWidth="9"/><path d="M64 32H91V57H64Z" fill={C.clay}/></g></svg>
  </At>
  <Label x={216} y={24} size={29} color={C.orange} style={{fontWeight:850}}>COMING UP · YOUR FREE DOWNLOADS</Label>
  <Label x={216} y={73} size={39} style={{fontWeight:750}}>Guide + skill + camera prompt pack</Label>
  <Label x={216} y={129} size={26} color={C.teal}>Six camera recipes to make the next shot your own.</Label>
  <div style={{position:'absolute',left:217,top:192,width:620,height:9,borderRadius:8,background:'#DFD2BF'}}><div style={{height:9,width:`${100*clamp(1-remaining/60)}%`,background:C.orange,borderRadius:8}}/></div>
  <Label x={862} y={175} size={28} color={C.orange}>In {remaining}s</Label>
 </Glass></AbsoluteFill>;
};

/** Closing installation is an editorial paper fold, not another throw/catch.
 * A large skill unfolds into instructions, camera recipes and the workspace;
 * the receiving character slots the file into Claude before the command runs. */
export const InstallFinaleV11:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.56/duration,unfold=e(u,.2,1.1),travel=e(u,1.65,1.35),insert=e(u,3.1,1),run=e(u,4.45,.8),fan=e(u,5.45,.8);
 return <EditRoom t={t}>
  <Glass x={134} y={135} w={553} h={499} t={t} frost={.55}>
   <Label x={28} y={28} size={34} color={C.orange}>Your starting point</Label>
   {[2,1,0].map(i=><At key={i} x={43+i*155*unfold} y={139-i*12*unfold} style={{transform:`rotate(${(i-1)*5*unfold}deg)`,transformOrigin:'50% 90%'}}><div style={{width:140,height:223,borderRadius:14,background:['#FFFBF0','#F1DFCA','#D8E4D8'][i],border:'3px solid #FFF',boxShadow:'0 14px 20px #67462822'}}><At x={16} y={26}>{i===0?<SkillFile t={t} size={105}/>:i===1?<CameraIcon t={t} size={108}/>:<Key t={t} size={104}/>}</At><Label x={19} y={172} size={25}>{['Skill','Shots','Guide'][i]}</Label></div></At>)}
   <Label x={28} y={432} size={29}>Download from the description ↓</Label>
  </Glass>
  <Glass x={948} y={130} w={793} h={528} t={t} frost={.55}>
   <At x={30} y={24}><Logo name="claude.png" size={80}/><Label x={110} y={21} size={40}>Your Claude project</Label></At>
   <div style={{position:'absolute',left:34,top:150,width:720,height:163,borderRadius:19,border:'2px dashed #BD9A77',background:'#FFF9EE'}}><Label x={28} y={29} size={31} color={C.orange}>{insert>.9?'fal-video.skill added':'Add your skill file'}</Label><Label x={28} y={90} size={27} color={C.teal}>{insert>.9?'Instructions ready for your next brief':'Drop it into Claude'}</Label></div>
   <div style={{position:'absolute',left:33,top:352,width:721,height:109,borderRadius:17,background:'#FBF6EA',boxShadow:'inset 0 3px 8px #62451E20',opacity:run}}><Label x={26} y={26} size={41} color={C.orange}>/fal-video</Label><div style={{position:'absolute',right:22,top:19,width:69,height:69,background:C.teal,borderRadius:14,color:'#FFF8EA',fontSize:42,textAlign:'center',transform:`scale(${1-.08*Math.sin(run*Math.PI)})`}}>↑</div></div>
  </Glass>
  <Actor t={t} x={560+travel*57} y={596} size={235} role="courier" look={1} reach={travel} lift={travel*.7} contact={3.15*duration/8.56}/>
  <Actor t={t+.4} x={1142+insert*98} y={575} size={202} role="operator" look={-1} reach={insert} lift={travel*.8} contact={4.1*duration/8.56} happy={run>.7}/>
  <At x={lerp(511,1077,travel)+insert*33} y={lerp(539,332,travel)-Math.sin(travel*Math.PI)*105-insert*110} style={{transform:`rotate(${-12+travel*16-insert*4}deg) scale(${1-.38*insert})`,opacity:1-e(u,4.05,.25)}}><SkillFile t={t} size={174}/></At>
  <Glass x={157} y={784} w={1172} h={208} t={t} frost={.6}>
   <Label x={25} y={22} size={31} color={C.orange}>BONUS · CAMERA-DIRECTION PROMPT PACK</Label>
   {['Push in','Orbit','Follow','Reveal','Lock off','Crane'].map((name,i)=><div key={name} style={{position:'absolute',left:25+i*188,top:82,width:173,height:63,borderRadius:12,background:i%2?'#E4EBDD':'#F3DDC4',border:'2px solid #FFF',transform:`translateY(${(1-e(u,5.45+i*.1,.55))*20}px) rotate(${(1-fan)*(i-2.5)*2}deg)`,opacity:.4+.6*fan,color:i%2?C.teal:C.orange,fontWeight:750,fontSize:27,paddingTop:12,textAlign:'center',boxSizing:'border-box'}}>{name}</div>)}
   <Label x={27} y={162} size={25} color={C.teal}>Six ready-to-adapt recipes. Download with the guide.</Label>
  </Glass>
 </EditRoom>;
};
