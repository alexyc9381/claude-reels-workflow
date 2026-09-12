import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Label,Logo,SkillFile,Key,CameraIcon,C,clamp,lerp,BrandedBackground} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {CursorV13,roadmapBeatsV13} from './ScenesV13';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const hit=(t:number,at:number)=>t<at?0:Math.exp(-8*(t-at))*Math.sin(18*(t-at));
const AgentLogos:React.FC<{t:number;x:number;y:number}>=({t,x,y})=><At x={x} y={y}><div style={{display:'flex',gap:47}}>{['claude.png','codex.svg','cursor.svg'].map((name,i)=><div key={name} style={{transform:`translateY(${14*(1-easeOut(t,.1+i*.06,.3))}px)`,opacity:easeOut(t,.1+i*.06,.3)}}><Logo name={name} size={58}/></div>)}</div></At>;
const Result:React.FC<{w:number;h?:number}>=({w,h=w*.5625})=><div style={{position:'relative',width:w,height:h,overflow:'hidden',borderRadius:20,boxShadow:'0 18px 42px #54321D30',border:'3px solid #FFF9EF'}}><Loop durationInFrames={120}><OffthreadVideo src={staticFile('v4/claude-result.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>;
/** Existing OBS pixels only. Tight crops exclude Dock, menu bar, sidebars and
 * unrelated response paragraphs. These are condensed excerpts, not real-time
 * generation and not receipts for the opening 10-cent comparison. */
const DemoCrop:React.FC<{start:number;w:number;x:number;y:number;cropW:number;cropH:number}>=({start,w,x,y,cropW,cropH})=>{
 const s=w/cropW;
 return <div data-real-obs-preview style={{position:'relative',width:w,height:cropH*s,overflow:'hidden',borderRadius:20,background:'#141414'}}><OffthreadVideo src={staticFile('obs.mp4')} startFrom={Math.round(start*30)} muted style={{position:'absolute',width:1920*s,height:1080*s,left:-x*s,top:-y*s}}/></div>;
};

const RooftopShot:React.FC<{p:number}>=({p})=><svg width="515" height="360" viewBox="0 0 515 360">
 <defs><linearGradient id="v15-rooftop-sky" x2="0" y2="1"><stop stopColor="#F9F0DD"/><stop offset="1" stopColor="#BDCEC6"/></linearGradient></defs>
 <path d="M12 70Q250 -22 503 70V335H12Z" fill="url(#v15-rooftop-sky)" stroke="#FFF9EE" strokeWidth="4"/>
 {[0,1,2,3,4,5,6].map(i=><g key={i}><path d={`M${28+i*70} 331V${120+i%3*26}H${73+i*70}V331`} fill={i%2?'#A5B9B0':'#C2CFC2'}/>{[0,1,2,3].map(j=><path key={j} d={`M${37+i*70} ${157+j*37}H${48+i*70}M${55+i*70} ${157+j*37}H${65+i*70}`} stroke="#ECDEC0" strokeWidth="7"/>)}</g>)}
 <path d="M12 237L120 213L166 230V345H12ZM348 210L448 167L503 189V345H348Z" fill="#547D72"/>
 <path d="M12 237L120 213L166 230L73 260ZM348 210L448 167L503 189L409 233Z" fill="#EAE9CE" stroke="#FFF9EE" strokeWidth="3"/>
 <path d="M73 260V346M409 233V346M122 212V164M111 169H133M448 166V125M431 136H465" stroke="#36584E" strokeWidth="4"/>
 {[0,1,2].map(i=><path key={i} d={`M23 ${274+i*24}L54 ${267+i*24}M93 ${269+i*24}L144 ${251+i*24}M363 ${249+i*25}L394 ${239+i*25}M430 ${239+i*25}L484 ${216+i*25}`} stroke="#ECCF86" strokeWidth="6"/>)}
 <path d="M91 182Q250 15 417 133" stroke={C.orange} strokeWidth="5" fill="none" strokeDasharray="10 9"/>
 <g transform={`translate(${100+306*p} ${177-82*Math.sin(p*Math.PI)}) rotate(${-12+p*25})`}>
  <circle cy="-40" r="12" fill="#263B36"/><path d="M-12 -26L13 -24L28 19L58 39L13 33L-19 24L-44 35L-25 -1Z" fill="#263B36"/>
  <path d="M-12 -19L-38 -35L-57 -40M10 -19L35 -35L57 -44M-10 23L-16 45L-36 58M12 26L29 39L39 61" stroke="#263B36" strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M-5 -19L7 15L-7 23" stroke="#A0B8A0" strokeWidth="3" fill="none"/>
 </g>
</svg>;

/** A warm editorial stage, not an extra interface or decorative dashboard.
 * The light and floor are quiet; the moving narrative objects own attention. */
const Stage:React.FC<{children:React.ReactNode;t:number}>=({children,t})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}>
 <BrandedBackground t={t}/>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
  <defs><linearGradient id="v15-floor" x2="0" y2="1"><stop stopColor="#FFFCF2"/><stop offset="1" stopColor="#DBA27C55"/></linearGradient></defs>
  <ellipse cx="925" cy="887" rx="903" ry="164" fill="url(#v15-floor)" stroke="#FFFDF5" strokeWidth="3"/>
  <path d="M95 91H1825M95 101H1825" stroke="#FFF9F0" strokeWidth="2" opacity=".5"/>
 </svg>
 {children}
</AbsoluteFill>;

/** Editorial Higgsfield counterpart, not an official mascot. The original
 * brand mark stays intact; articulated arms operate the relevant prop. */
const HiggsSprite:React.FC<{t:number;x:number;y:number;size?:number;action:number;brand?:boolean}>=({t,x,y,size=170,action,brand=true})=>{
 const q=hit(t,1.2),bob=Math.sin(t*2)*2;
 return <At x={x} y={y} style={{width:size,height:size,transform:`translateY(${bob+q*5}px) rotate(${-q*4}deg)`}}>
  <svg width={size} height={size} viewBox="0 0 180 180" style={{overflow:'visible'}}>
   <ellipse cx="90" cy="171" rx="59" ry="7" fill="#402A2220"/>
   <path d={`M40 89Q12 ${91-action*39} 5 ${113-action*75}M141 88Q164 ${91-action*45} 177 ${112-action*76}`} stroke="#405140" strokeWidth="10" fill="none" strokeLinecap="round"/>
   <path d="M66 128L58 165H77M112 128L121 165H102" stroke="#405140" strokeWidth="10" fill="none" strokeLinecap="round"/>
   <path d="M53 23Q90 5 127 23L145 53V115Q90 147 35 115V53Z" fill="#E1EF9C" stroke="#FFFDEC" strokeWidth="5"/>
   <path d="M48 113Q90 134 132 113" fill="none" stroke="#8AAB37" strokeWidth="5"/>
  </svg>
  {brand&&<At x={size*.31} y={size*.30}><Logo name="higgsfield.jpg" size={size*.38}/></At>}
 </At>;
};

/** Opening price contrast: calendar turns = recurring billing; one request
 * traverses the skill = pay per use. Keep units; do not invent a savings ratio. */
export const CostV15:React.FC<{duration:number;brandAt:number}>=({duration,brandAt})=>{
 const t=clock(),u=t/duration,send=e(u,.22,.26),finish=e(u,.58,.17),a=2*Math.PI*e(u,.08,.80);
 return <Stage t={t}>
  <At x={235} y={116} style={{opacity:easeOut(t,brandAt,.15)}}><Logo name="higgsfield.jpg" size={74}/><Label x={94} y={14} size={41}>Higgsfield</Label></At>
  <At x={1054} y={116}><Logo name="claude.png" size={73}/><Label x={94} y={14} size={41}>Your skill</Label></At>
  <At x={187} y={246} style={{transform:`perspective(1500px) rotateY(${7-4*e(u,.1,.5)}deg)`}}>
   {[3,2,1,0].map(i=><div key={i} style={{position:'absolute',left:i*8,top:i*9,width:550,height:395,borderRadius:26,background:i?'#E6CDB1':'#FFFCF6',border:'3px solid white',boxShadow:'0 18px 40px #6D412522'}}/>) }
   <svg width="550" height="420" style={{position:'absolute',inset:0}}><path d="M3 104V27Q3 3 27 3H523Q547 3 547 27V104Z" fill={C.clay}/>{[106,435].map(x=><path key={x} d={`M${x} -16V41`} stroke="#664934" strokeWidth="15" strokeLinecap="round"/>)}<path d="M36 351H514" stroke="#E9D3BA" strokeWidth="2"/></svg>
   <Label x={30} y={28} size={32} color="#FFFDF5">MONTH {String(1+Math.min(11,Math.floor(u*12))).padStart(2,'0')}</Label>
   <Label x={34} y={113} size={149} style={{fontWeight:850,letterSpacing:-7}}>$100</Label><Label x={48} y={283} size={35}>/ month*</Label>
   {Array.from({length:5},(_,i)=>{const p=e(t,.4+i*1.12,.52);return <div key={i} style={{position:'absolute',left:6,top:112,width:536,height:270,background:'linear-gradient(#FFFDF6,#EDDAC5)',borderRadius:15,transformOrigin:'50% 0',transform:`perspective(800px) rotateX(${-175*p}deg)`,opacity:t<.4+i*1.12||p>.97?0:Math.sin(p*Math.PI)*.8,backfaceVisibility:'hidden'}}/>;})}
  </At>
  <svg width="900" height="250" style={{position:'absolute',left:60,top:628}}><path d="M162 119C90 1 577 -12 675 97C755 215 313 251 178 158" fill="none" stroke="#C9805360" strokeWidth="6"/><path d="M174 179L175 149L202 158" fill="none" stroke={C.orange} strokeWidth="8" strokeLinecap="round"/><circle cx={420+248*Math.cos(a)} cy={115+92*Math.sin(a)} r="14" fill={C.orange}/></svg>
  <HiggsSprite t={t} x={691} y={519} size={190} action={.7+.25*Math.sin(t*2)} brand={t>=brandAt}/>
  <At x={990+send*40} y={302-Math.sin(send*Math.PI)*67} style={{transform:`rotate(${-11+send*16}deg) scale(${1-finish*.18})`}}><SkillFile t={t} size={165} label=".skill"/></At>
  <Label x={1280} y={268} size={147} color={C.teal} style={{fontWeight:850,letterSpacing:-7}}>10¢</Label>
  <Label x={1295} y={433} size={32}>/ generation*</Label>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M1023 648C1102 649 1211 694 1298 645S1493 552 1671 626" fill="none" stroke="#267D7840" strokeWidth="12"/><path d="M1023 648C1102 649 1211 694 1298 645S1493 552 1671 626" fill="none" stroke={C.teal} strokeWidth="6" pathLength="1" strokeDasharray="1" strokeDashoffset={1-send}/><path d="M1649 608L1675 626L1647 644" fill="none" stroke={C.teal} strokeWidth="6" opacity={send}/></svg>
  <Actor t={t} x={950+send*72} y={578} size={222} role="operator" reach={send} lift={.6} contact={duration*.48} look={1} happy={finish>.9}/>
  <At x={1485} y={523} style={{opacity:finish,transform:`translateY(${25*(1-finish)}px)`}}><CameraIcon t={t} size={160}/></At>
  <Label x={1280} y={691} size={30} color={C.teal}>FREE skill</Label>
  <Label x={150} y={890} size={26}>*Recorded examples · plan includes credits · model costs vary.</Label>
  <Label x={150} y={932} size={24}>Monthly plan ≠ matched per-video cost.</Label>
 </Stage>;
};

/** Prompt first becomes a visual shot, then a completed MP4, then lands on
 * the computer. This is an illustration with real recorded-result playback,
 * not a fabricated recording or a matched-cost receipt. */
export const ProductionV15:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.66/duration,load=e(u,.05,.65),send=e(u,2.84,.65),output=e(u,4.45,.4),save=e(u,6.02,.7),proof=u>=1.35&&u<4.45;
 return <Stage t={t}>
  <At x={150} y={141}><Logo name="claude.png" size={81}/></At>
  <At x={160+load*275} y={347-Math.sin(load*Math.PI)*92} style={{transform:`rotate(${-12+load*15}deg) scale(${1-send*.25})`,opacity:1-output}}><SkillFile t={t} size={218}/></At>
  <Actor t={t} x={235+load*105} y={640} size={238} role="operator" reach={load} lift={.7} look={1} walk={Math.sin(load*Math.PI)} contact={.7}/>
  <At x={652} y={188} style={{opacity:proof?0:1-output,transform:`translateY(${-25*send}px)`}}><div style={{fontSize:40,fontWeight:750,color:C.orange,marginBottom:20}}>Follow the jump.</div><RooftopShot p={send}/></At>
  <At x={1200} y={218} style={{opacity:proof?0:1-output}}>{['hailuo.png','google.png','seedance.png'].map((logo,i)=><At key={logo} x={(i%2)*207} y={i===2?229:0} style={{transform:`translateY(${(1-e(u,3+i*.2,.3))*46}px) scale(${1+.11*hit(u,3.2+i*.2)})`}}><div style={{width:162,height:162,borderRadius:'50%',background:'#FFFCF2',border:'3px solid white',boxShadow:'0 14px 29px #51382123',display:'grid',placeItems:'center'}}><Logo name={logo} size={107}/></div></At>)}</At>
  {proof&&<At x={690} y={266} style={{padding:22,borderRadius:31,background:'#FFFDF4',boxShadow:'0 20px 45px #58331E24'}}>
   {u<2.84?<Sequence from={Math.round(1.35*duration/8.66*30)} layout="none"><DemoCrop start={1008} w={900} x={1270} y={95} cropW={300} cropH={112}/></Sequence>:<Sequence from={Math.round(2.84*duration/8.66*30)} layout="none"><DemoCrop start={1054} w={900} x={690} y={884} cropW={800} cropH={109}/></Sequence>}
  </At>}
  <At x={650} y={184} style={{opacity:output,transform:`translate(${save*90}px,${save*22}px) scale(${.83+.17*output-save*.09})`,transformOrigin:'50% 50%'}}>
   <div style={{padding:16,borderRadius:34,background:'linear-gradient(120deg,#FFFFFF,#D4D9D3)',border:'3px solid #FFF',boxShadow:'0 25px 60px #59362138'}}>{u>=4.45?<Sequence from={Math.round(4.45*duration/8.66*30)} layout="none"><DemoCrop start={1530} w={940} x={0} y={0} cropW={1920} cropH={1045}/></Sequence>:<div style={{width:940,height:512}}/>}</div>
   <svg width="980" height="98" style={{position:'absolute',left:-5,top:563,opacity:save}}><path d="M4 0H976L914 74H66Z" fill="#DBDCD4" stroke="#FFF" strokeWidth="4"/><path d="M365 18H615L600 56H380Z" fill="#EFF0E9"/><path d="M15 76H965" stroke="#A6AEA4" strokeWidth="9"/></svg>
   <At x={33} y={24}><Logo name="fal.png" size={57}/></At>
  </At>
  <At x={164} y={258} style={{opacity:output}}><SkillFile t={t} size={200}/></At>
  <Label x={746} y={865} size={37} color={C.teal} style={{opacity:save}}>Saved ↓</Label>
  <AgentLogos t={t-.2} x={158} y={929}/>
  <Label x={113} y={1024} size={22}>Actual demo · condensed</Label>
 </Stage>;
};

/** Roadmap, not three equal cards: a route drawn between physical landmarks.
 * Contacts retain the existing audio beat clock. */
export const RoadmapV15:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),p=e(t,.08,duration-.25),q=p<.5?p*2:(p-.5)*2;
 const bez=(a:number,b:number,c:number,d:number)=>(1-q)**3*a+3*(1-q)**2*q*b+3*(1-q)*q*q*c+q**3*d;
 const x=p<.5?bez(338,492,610,856):bez(856,1102,1307,1580),y=p<.5?bez(640,623,433,452):bez(452,471,702,542);
 return <Stage t={t}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M338 656C492 639 610 449 856 468S1307 718 1580 558" fill="none" stroke="#B4957540" strokeWidth="106"/><path d="M338 640C492 623 610 433 856 452S1307 702 1580 542" fill="none" stroke="#FFFCF5" strokeWidth="85"/><path d="M338 640C492 623 610 433 856 452S1307 702 1580 542" fill="none" stroke={C.orange} strokeWidth="8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>
  <At x={250} y={335} style={{transform:`rotate(${-16+12*e(t,0,.6)}deg)`}}><Key t={t} size={217}/></At>
  <At x={765} y={181} style={{transform:`translateY(${-18*hit(t,duration*roadmapBeatsV13[1])}px)`}}><CameraIcon t={t} size={265}/></At>
  <At x={1262} y={288} style={{transform:`perspective(1000px) rotateY(${-7+7*e(t,duration*.6,.4)}deg)`}}><Result w={450}/></At>
  {[{x:262,y:750,s:'1 · Connect'},{x:746,y:708,s:'2 · Create'},{x:1280,y:657,s:'3 · Compare'}].map(v=><Label key={v.s} x={v.x} y={v.y} size={39}>{v.s}</Label>)}
  <Actor t={t} x={x-86} y={y-152} size={173} role="courier" walk={.9} lift={.3} look={1} contact={duration*.83}/>
 </Stage>;
};

/** An open guidebook, copied instruction strip and receiving Claude window.
 * The download/copy/insert action replaces the prior paragraph-heavy UI. */
export const GuideV15:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,open=e(u,.03,.17),copy=e(u,.24,.14),send=e(u,.43,.16),run=e(u,.64,.16);
 return <Stage t={t}>
  <Label x={174} y={135} size={53} color={C.orange}>FREE setup</Label>
  <At x={168} y={280} style={{transform:`perspective(1400px) rotateY(${-12+12*open}deg)`}}>
   <svg width="678" height="460" viewBox="0 0 678 460"><path d="M12 33Q167 -13 337 46Q514 -13 665 33V425Q510 398 337 445Q173 398 12 425Z" fill="#D5996B"/><path d="M23 14Q185 -10 337 40Q501 -10 654 14V400Q503 375 337 421Q170 375 23 400Z" fill="#FFFDF5" stroke="#FFF" strokeWidth="4"/><path d="M337 42V421" stroke="#CDB496" strokeWidth="5"/><path d="M54 315H285M377 315H612M54 341H257M377 341H568" stroke="#C4CABA" strokeWidth="7"/></svg>
   <At x={80} y={70}><Logo name="fal.png" size={88}/><At x={111} y={7}><Key t={t} size={97}/></At></At>
   <At x={392} y={72}><Logo name="claude.png" size={118}/></At>
   <div style={{position:'absolute',left:59,top:211,width:534,height:68,borderRadius:13,background:'#F6D6A6',border:`3px solid ${C.orange}`,transform:`scale(${1+hit(t,duration*.24)*.03})`}}><Label x={29} y={11} size={31}>/fal-video</Label></div>
  </At>
  <At x={986} y={268}>
   <Glass x={0} y={0} w={752} h={403} t={t} frost={.55}><At x={36} y={28}><Logo name="claude.png" size={73}/></At><Actor t={t} x={456} y={80} size={218} role="archivist" reach={send} lift={send*.7} look={-1} contact={duration*.59} happy={run>.8}/><div style={{position:'absolute',left:31,top:277,width:676,height:88,borderRadius:19,background:'#FFFDF4',border:'2px solid #D7C8B4'}}><Label x={23} y={22} size={32} color={C.orange} style={{opacity:send}}>/fal-video</Label></div></Glass>
   <At x={128} y={108} style={{opacity:run,transform:`scale(${.7+.3*run})`}}><CameraIcon t={t} size={178}/></At>
  </At>
  <At x={lerp(227,1040,send)} y={lerp(491,569,send)-Math.sin(send*Math.PI)*208} style={{opacity:copy*(1-e(u,.60,.04)),transform:`rotate(${-5+send*5}deg)`}}><div style={{background:'#F9CB89',border:'3px solid #FFF6E5',borderRadius:14,padding:'14px 24px',fontSize:34,fontWeight:800,boxShadow:'0 15px 32px #693D2529'}}>/fal-video</div></At>
  <CursorV13 x={746-45*copy+80*send} y={512-23*copy} press={copy}/>
  <Actor t={t} x={759+send*60} y={710-Math.sin(send*Math.PI)*57} size={209} role="courier" reach={send} lift={copy} look={1} contact={duration*.59}/>
  <Label x={172} y={846} size={36}>Description ↓</Label>
  <AgentLogos t={t} x={172} y={927}/>
 </Stage>;
};

/** A branded outer sleeve lifts away from the model bank. In the second
 * movement an access gate opens, and the video actually leaves the bank.
 * No animation claims that all platform features are identical. */
export const WrapperV15:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,peel=e(u,.06,.19),route=e(u,.29,.18),release=e(u,.58,.2);
 return <Stage t={t}>
  <At x={572} y={245} style={{transform:`perspective(1600px) rotateY(${-5+peel*5}deg)`}}>
   <svg width="1150" height="478"><path d="M22 62Q575 -49 1128 62V412Q575 486 22 412Z" fill="#EFF1E3" stroke="#FFFDF4" strokeWidth="7"/><path d="M48 384Q575 447 1102 384" fill="none" stroke="#ADC3B1" strokeWidth="7"/></svg>
   {['seedance.png','google.png','hailuo.png'].map((name,i)=><At key={name} x={98+i*339} y={100} style={{transform:`translateY(${-12*hit(t,duration*(.25+i*.06))}px)`}}><div style={{width:262,height:262,borderRadius:'50%',background:'#FDFBF2',border:'7px solid #FFF',boxShadow:'inset 0 6px 17px #BCCAB8,0 15px 24px #4D38271A',display:'grid',placeItems:'center'}}><Logo name={name} size={132}/></div></At>)}
   <At x={0} y={-peel*211} style={{opacity:1-e(u,.29,.10),transform:`perspective(1000px) rotateX(${peel*64}deg)`,transformOrigin:'50% 0'}}><Glass x={0} y={0} w={1150} h={478} t={t} frost={.95}><At x={419} y={130}><Logo name="higgsfield.jpg" size={138}/></At><Label x={345} y={307} size={48}>Higgsfield</Label></Glass></At>
  </At>
  <HiggsSprite t={t} x={323} y={419-peel*36} size={225} action={peel}/>
  <At x={146} y={730} style={{opacity:peel}}><Logo name="claude.png" size={71}/></At>
  <Actor t={t} x={237+route*127} y={733} size={200} role="operator" lift={route} reach={route} look={1} contact={duration*.47}/>
  <At x={lerp(473,945,route)} y={lerp(802,624,route)-Math.sin(route*Math.PI)*130} style={{opacity:peel*(1-release),transform:`rotate(${-8+route*10}deg) scale(.6)`}}><SkillFile t={t} size={166}/></At>
  <At x={590} y={520} style={{opacity:release,transform:`translateY(${(1-release)*130}px) scale(${.8+.2*release})`,transformOrigin:'50% 0'}}><Result w={670} h={335}/></At>
  <Label x={150} y={984} size={24}>Concept illustration · platform features and limits vary</Label>
 </Stage>;
};
