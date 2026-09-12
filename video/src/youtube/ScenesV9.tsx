import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,World,Glass,Label,Logo,Film,SkillFile,Key,CameraIcon,Lens,Monitor,Pedestal,Aura,C,clamp,lerp,settle,typeOn} from './YouTubeV8Primitives';
import {GuideSequence,SkillSequence,ShotStage} from './NarrativeV9';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const Reel:React.FC<{t:number;x:number;y:number;size?:number}>=({t,x,y,size=125})=><At x={x} y={y}><svg width={size} height={size} viewBox="0 0 120 120"><circle cx="60" cy="60" r="57" fill="#ECE9E2" stroke="#FFFFFF" strokeWidth="4"/><g transform={`rotate(${t*29} 60 60)`}>{[0,1,2,3,4].map(i=><ellipse key={i} cx="60" cy="27" rx="11" ry="16" fill="#315F7966" transform={`rotate(${i*72} 60 60)`}/>)}</g><circle cx="60" cy="60" r="8" fill={C.orange}/></svg></At>;
const Desk:React.FC<{x:number;y:number;w:number}>=({x,y,w})=><At x={x} y={y}><svg width={w} height="235"><path d={`M45 40V215M${w-45} 40V215`} stroke="#315F7966" strokeWidth="13"/><path d={`M0 15L45 0H${w-45}L${w} 15V40H0Z`} fill="#FFF8EC" stroke="#FFFFFF" strokeWidth="3"/><path d={`M0 40H${w}`} stroke={C.orange+'77'} strokeWidth="4"/></svg></At>;

export const HookV9:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,guessAt,whyAt,higgsAt})=>{
 const t=clock();if(t>=whyAt)return <Sequence from={Math.round(whyAt*30)}><Checkout duration={duration-whyAt} brandAt={higgsAt-whyAt}/></Sequence>;
 return <World t={t} setting="studio">
  {[0,1].map(i=><At key={i} x={62+i*914} y={111} style={{transform:`perspective(1800px) rotateY(${(1-e(t,0,.38))*(i?-4:4)}deg) translateY(${(1-easeOut(t,0,.3))*28}px)`}}><div style={{overflow:'hidden',borderRadius:24,position:'relative'}}><Film w={881} t={t} placeholder={!i} video={!!i} label={i?'B':'A'}/><div style={{position:'absolute',inset:0,background:'#F3E4D3',transform:`translateY(${-100*e(t,.04+i*.08,.35)}%)`}}/><svg width="881" height="497" style={{position:'absolute',inset:0,opacity:1-e(t,3.8,.25)}}><path d={`M${88+e(t,.6+i*.22,1.1)*625} 32V465`} stroke="#FFFFFF70" strokeWidth="3"/></svg></div><Aura w={881} h={497} t={t}/><Pedestal x={175} y={505} w={530} t={t} color={i?C.teal:C.orange}/></At>)}
  <Desk x={172} y={865} w={474}/><Desk x={1267} y={865} w={474}/>
  <Actor t={t} x={210+113*e(t,.4,1.2)-45*e(t,3.1,.75)} y={660} size={213} role="archivist" look={1} reach={e(t,.2,.5)} walk={Math.sin(e(t,.4,1.2)*Math.PI)} contact={1.6}/>
  <Actor t={t+.3} x={1530-148*e(t,.75,1.25)+42*e(t,3.15,.8)} y={660} size={213} role="operator" look={-1} reach={e(t,.7,.5)} walk={Math.sin(e(t,.75,1.25)*Math.PI)} contact={2}/>
  {[0,1].map(i=><At key={i} x={490+i*870} y={780}><Lens t={t+i} size={115} angle={110*e(t,1.3+i*.6,.8)}/></At>)}
  <At x={105} y={674}><Reel t={t} x={0} y={0} size={102}/></At><At x={1713} y={674}><Reel t={t+1} x={0} y={0} size={102}/></At>
 </World>;
};

/** Pricing gets a checkout / invoice, not the model-access gate used later. */
const Checkout:React.FC<{duration:number;brandAt:number}>=({duration,brandAt})=>{
 const t=clock(),u=t*7.6/duration,inspect=e(u,.25,1),print=e(u,1.5,1.1),pull=e(u,3,1.1),peel=e(u,5,1.2);
 return <World t={t} setting="checkout">
  <Desk x={190} y={650} w={1530}/>
  <Glass x={291} y={169} w={577} h={446} t={t} frost={.5}>
   <At x={36} y={28} style={{opacity:easeOut(t,brandAt,.25)}}><Logo name="higgsfield.jpg" size={77}/><Label x={98} y={19} size={40}>Higgsfield</Label></At>
   <Label x={43} y={154} size={102} color={C.orange}>$100<span style={{fontSize:34}}> / month</span></Label>
   <At x={37} y={300}><svg width="492" height="100"><rect width="492" height="78" rx="18" fill="#FFFFFFA0"/>{Array.from({length:12},(_,i)=><rect key={i} x={25+i*37} y="22" width="24" height={34-20*peel*(i/12<inspect?1:0)} rx="3" fill={i/12<inspect?C.clay:'#ECE9E2'}/>)}<path d="M30 91H462" stroke="#B8501F55" strokeWidth="3"/></svg></At>
  </Glass>
  <At x={1040} y={245}><svg width="455" height="360"><path d="M20 170L58 20H357L416 170V320H20Z" fill="#ECE9E2" stroke="#FFF" strokeWidth="4"/><path d="M58 20H357L380 98H41Z" fill="#FFFFFFB0"/><rect x="68" y="159" width="298" height="30" rx="10" fill={C.teal}/><circle cx="361" cy="256" r="14" fill={C.clay}/><path d="M66 272H250" stroke="#315F79" strokeWidth="5"/></svg></At>
  <At x={1125-280*pull} y={421-175*print-45*pull+16*peel} style={{transform:`rotate(${-12*pull+settle(u,4.1,5)}deg)`,opacity:print}}><svg width="220" height="278"><path d="M4 4H216V266L201 257L187 269L172 257L158 269L143 257L129 269L114 257L100 269L85 257L71 269L56 257L42 269L27 257L4 269Z" fill="#FFFDF5" stroke="#D2724E66" strokeWidth="2"/><text x="24" y="56" fontSize="28" fill={C.orange} fontWeight="700">Platform fee</text><text x="24" y="133" fontSize="58" fill={C.ink} fontWeight="700">$100</text>{[0,1,2].map(i=><path key={i} d={`M24 ${169+i*20}H${i===2?132:192}`} stroke="#267D7840" strokeWidth="5"/>)}</svg></At>
  <Actor t={t} x={809-78*pull} y={557} size={260} role="archivist" look={1} lift={pull*.75} reach={1} contact={4.1*duration/7.6}/>
  <Actor t={t+.2} x={1200-190*peel} y={653} size={206} role="operator" walk={Math.sin(peel*Math.PI)} look={-1} reach={print} happy={peel>.7}/>
  <At x={265} y={811} style={{opacity:peel,transform:`translateX(${(1-peel)*-70}px)`}}><Logo name="claude.png" size={82}/><Label x={108} y={7} size={61} color={C.teal}>10¢<span style={{fontSize:28}}> per video</span></Label></At>
 </World>;
};

/** Populated from frame zero: control desk, film reels, model selector and
 * output monitor. Shared gesture drives selector, camera iris and scan head. */
export const ProductionV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8/duration,send=e(u,.65,1.35),dial=e(u,2.15,1.5),scan=e(u,4.1,1.8),save=e(u,6.1,.9);
 return <World t={t}>
  <Desk x={148} y={679} w={1580}/>
  <Monitor x={976} y={164} w={772} t={t} label="GENERATED VIDEO"/>
  <Reel x={980} y={602} t={t} size={105}/><Reel x={1110} y={602} t={t+.4} size={105}/>
  <Glass x={163} y={197} w={625} h={328} t={t} frost={.6}><At x={28} y={27}><Logo name="claude.png" size={60}/><Label x={84} y={12} size={35}>{typeOn('/fal-video',u,.1,.75)}</Label></At><At x={35} y={131}><Lens t={t} size={145} angle={dial*125}/></At><Label x={209} y={153} size={31}>Subject → action</Label><Label x={209} y={212} size={31} color={C.teal}>Camera → style</Label></Glass>
  <Glass x={555} y={567} w={690} h={117} t={t} frost={.3}>
   {['hailuo.png','google.png','seedance.png'].map((logo,i)=><At x={38+i*222} y={21} key={logo} style={{transform:`translateY(${-10*e(u,2+i*.5,.3)*(1-e(u,3+i*.5,.3))}px)`}}><Logo name={logo} size={65}/><div style={{position:'absolute',left:86,top:20,width:66,height:9,borderRadius:8,background:i<=Math.floor(dial*2)?C.teal:'#267D7828'}}/></At>)}
  </Glass>
  <At x={769+175*send} y={378-110*Math.sin(send*Math.PI)} style={{transform:`rotate(${-10+17*send}deg) scale(${1-send*.5})`,opacity:1-e(u,2,.4)}}><SkillFile t={t} size={146} label="request"/></At>
  <At x={832} y={224}><Logo name="fal.png" size={101}/></At>
  <At x={989} y={176} style={{width:744,height:420,overflow:'hidden',borderRadius:16,pointerEvents:'none'}}><div style={{position:'absolute',left:scan*780-30,top:0,height:420,width:22,background:'#FFFFFF5C',boxShadow:'0 0 25px #FFFFFF',opacity:scan>.02&&scan<.98?.8:0}}/></At>
  <Actor t={t} x={205+55*send} y={704} size={250} role="operator" look={1} reach={.4+.15*Math.sin(t*7)} lift={send*.5} contact={1.8*duration/8}/>
  <Actor t={t+.25} x={1057-220*save} y={755} size={201} role="courier" walk={Math.sin(save*Math.PI)} look={-1} lift={save*.7} happy={save>.7}/>
  <At x={1110-save*245} y={773-65*Math.sin(save*Math.PI)} style={{opacity:save,transform:`rotate(${-12+save*12}deg)`}}><SkillFile t={t} size={115} label="video"/></At>
 </World>;
};

/** Wrapper explanation replaces the obstructing arc with its own cutaway. */
export const WrapperV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8/duration,lift=e(u,.5,1.5),move=e(u,2.4,1.4),land=e(u,4.4,1.4);
 return <World t={t} setting="gallery">
  <Pedestal x={383} y={696} w={1170} t={t}/>
  {['hailuo.png','google.png','seedance.png'].map((l,i)=><At key={l} x={460+i*336} y={377-25*e(u,2.5+i*.3,.5)+25*e(u,4+i*.3,.5)}><Lens t={t+i} size={253} angle={220*e(u,2.7+i*.35,1.5)}/><At x={67} y={67}><Logo name={l} size={119}/></At><Label x={34} y={268} size={31}>{['Hailuo','Google','Seedance'][i]}</Label></At>)}
  <Glass x={425+move*60} y={242-lift*136} w={1058} h={406} t={t} frost={.12} style={{transform:`perspective(1200px) rotateX(${lift*16}deg)`,clipPath:`inset(0 0 ${lift*269}px 0 round 30px)`,opacity:1-land*.78}}><At x={35} y={27}><Logo name="higgsfield.jpg" size={65}/><Label x={90} y={12} size={36}>The platform interface</Label></At><svg width="990" height="274" style={{position:'absolute',left:33,top:102}}><path d="M12 22H978V251H12Z" fill="none" stroke="#FFFFFF" strokeWidth="2"/>{[0,1,2].map(i=><path key={i} d={`M${88+i*290} 229V79Q${176+i*290} 17 ${253+i*290} 79V229Z`} fill="#FFFFFF30" stroke="#FFFFFF" strokeWidth="3"/>)}</svg></Glass>
  <Actor t={t} x={160+20*lift} y={561-80*lift} size={253} role="operator" look={1} lift={lift} reach={1} contact={2*duration/8}/>
  <Actor t={t+.35} x={1557-80*move} y={464} size={246} role="archivist" look={-1} reach={move} happy={land>.8}/>
  <Glass x={517} y={789} w={841} h={167} t={t} frost={.5} style={{opacity:easeOut(u,4,.4),transform:`translateY(${(1-easeOut(u,4,.4))*40}px)`}}><Label x={28} y={26} size={33} color={C.orange}>“Unlimited” can still have limits</Label><svg width="740" height="55" style={{position:'absolute',left:30,top:91}}>{Array.from({length:12},(_,i)=><g key={i} transform={`translate(${i*62},0)`} opacity={i<12-Math.floor(e(u,4.2,2.7)*4)?1:.16}><path d="M0 0H44V33H0Z" fill={i<8?C.teal:'#FFFFFF'} stroke={C.teal} strokeWidth="2"/><path d="M17 8L29 16L17 25Z" fill="#FFF"/></g>)}</svg></Glass>
 </World>;
};

export const DirectV9:React.FC<{duration:number;featuresAt:number}>=({duration,featuresAt})=>{
 const t=clock();return t<featuresAt?<ModelRoom duration={featuresAt}/>:<Sequence from={Math.round(featuresAt*30)}><FeatureVault duration={duration-featuresAt}/></Sequence>;
};
const ModelRoom:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*9/duration,connect=e(u,.8,1.5),walk=e(u,3.3,1.6),select=e(u,5.2,1.1),deliver=e(u,7,1);
 return <World t={t} setting="gallery">
  {[0,1,2].map(i=><Glass key={i} x={777+i*337} y={157} w={280} h={507} t={t} frost={.4}><At x={86} y={31}><Logo name={['hailuo.png','google.png','seedance.png'][i]} size={102}/></At>{[0,1,2,3].map(j=><At key={j} x={23} y={170+j*70}><svg width="233" height="50"><rect width="233" height="46" rx="10" fill="#FFFFFF80" stroke="#FFFFFF" strokeWidth="2"/>{[0,1,2,3,4,5].map(k=><path key={k} d={`M${18+k*18} 12V33`} stroke="#315F793A" strokeWidth="3"/>)}<circle cx="195" cy="23" r="7" fill={j<=Math.floor(select*4)&&i===2?C.teal:C.gold}/></svg></At>)}</Glass>)}
  <Monitor x={136} y={240} w={474} t={t} label="DIRECT CONNECTION"><div style={{padding:25}}><Logo name="claude.png" size={65}/><At x={140} y={40}><Logo name="fal.png" size={84}/></At><Label x={34} y={148} size={35}>{u<6.9?'Your request':'Generated result'}</Label><At x={280} y={37} style={{opacity:deliver,transform:`translateY(${(1-deliver)*30}px)`}}><SkillFile t={t} size={102} label="video"/></At></div></Monitor>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M580 606C680 770 973 748 914 667" fill="none" stroke="#315F7950" strokeWidth="20"/><path d="M580 606C680 770 973 748 914 667" fill="none" stroke={C.teal} strokeWidth="6" pathLength="1" strokeDasharray="1" strokeDashoffset={1-connect}/><path d="M914 691H1643" stroke="#FFFFFF" strokeWidth="10"/><circle cx={914+select*670} cy="691" r="15" fill={C.gold}/></svg>
  <Actor t={t} x={515+walk*340} y={664} size={257} role="operator" walk={Math.sin(walk*Math.PI)} look={1} reach={connect} contact={2.3*duration/9}/>
  <At x={1505-310*deliver} y={709-85*Math.sin(deliver*Math.PI)} style={{opacity:easeOut(u,6.9,.2),transform:`rotate(${-15+deliver*18}deg)`}}><SkillFile t={t} size={141} label="result"/></At>
  <Actor t={t+.4} x={1180-130*deliver} y={735} size={204} role="courier" walk={Math.sin(deliver*Math.PI)} look={1} lift={deliver*.8} happy={deliver>.8}/>
  <Label x={166} y={819} size={39} color={C.teal}>Go straight to the models</Label>
 </World>;
};
const FeatureVault:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8/duration,reach=e(u,.6,1),pull=e(u,2,1.1),reject=e(u,3.3,.65),unveil=e(u,4.8,1.5);
 return <World t={t} setting="gallery">
  <Glass x={688} y={138} w={1049} h={556} t={t} frost={.42}>
   {['hailuo.png','google.png','seedance.png'].map((l,i)=><At key={l} x={35+i*334} y={80}><Lens t={t+i} size={237}/><At x={72} y={74}><Logo name={l} size={91}/></At><At x={25} y={277}><svg width="190" height="106"><rect width="190" height="102" rx="16" fill="#FFFFFF88"/><path d="M38 34H151M38 57H132M38 80H100" stroke={C.teal+'75'} strokeWidth="5"/></svg></At></At>)}
   <div style={{position:'absolute',inset:12,borderRadius:22,background:'#FFFFFF55',backdropFilter:'blur(3px)',transform:`translateY(${-530*unveil}px)`,opacity:1-unveil}}><At x={402} y={196}><svg width="212" height="212"><path d="M53 89V56a53 53 0 0 1 106 0V99" fill="none" stroke={C.orange} strokeWidth="12"/><rect x="27" y="88" width="157" height="119" rx="22" fill={C.orange}/><circle cx="106" cy="130" r="12" fill="#FFF"/><path d="M106 140V165" stroke="#FFF" strokeWidth="8"/></svg></At></div>
  </Glass>
  <Actor t={t} x={236+110*reach-35*reject} y={441} size={283} role="archivist" look={1} reach={1} lean={-9*reject} contact={3.3*duration/8}/>
  <At x={526+pull*116-reject*42} y={465} style={{transform:`rotate(${-8+settle(u,3.3,12)}deg)`}}><SkillFile t={t} size={150} label="access"/></At>
  <Label x={191} y={234} size={49} color={C.orange}>Behind a plan</Label>
  <Actor t={t+.5} x={1165-300*unveil} y={710} size={231} role="operator" walk={Math.sin(unveil*Math.PI)} lift={unveil} look={-1}/>
  <At x={323} y={813} style={{opacity:unveil}}><Logo name="fal.png" size={76}/><Label x={107} y={16} size={37}>A different way in</Label></At>
 </World>;
};

export const DownloadV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*5/duration,release=e(u,.35,.8),fall=e(u,1.15,.75),take=e(u,2.2,1.25);
 return <World t={t} setting="archive"><Desk x={204} y={697} w={1454}/>
  <Glass x={256} y={180} w={685} h={417} t={t} frost={.48}><Label x={40} y={32} size={38}>Video description</Label><At x={43} y={124}><SkillFile t={t} size={137}/><Label x={189} y={20} size={36}>fal-video.skill</Label><Label x={190} y={89} size={29} color={C.orange}>Download ↓</Label></At><div style={{position:'absolute',left:30,right:30,bottom:28,height:5,background:'#267D7833'}}/></Glass>
  <At x={1020} y={454}><svg width="465" height="253"><path d="M18 68L66 18H369L438 68V218H18Z" fill="#ECE9E2" stroke="#FFF" strokeWidth="4"/><path d="M19 79H438V207H19Z" fill="#FFFFFF9C"/><path d="M90 94L147 155H300L357 94" fill="none" stroke={C.teal} strokeWidth="9"/><path d="M44 227H412" stroke="#B8501F50" strokeWidth="5"/></svg></At>
  <At x={682+release*386+take*193} y={288+fall*243-Math.sin(take*Math.PI)*60} style={{transform:`rotate(${-6+take*13}deg) scale(${1-take*.2})`}}><SkillFile t={t} size={174}/></At>
  <Actor t={t} x={1476-170*take} y={459} size={266} role="courier" walk={Math.sin(take*Math.PI)} look={-1} lift={fall*.75} reach={1} contact={1.9*duration/5}/>
  <At x={268} y={795}><Logo name="claude.png" size={70}/><Label x={105} y={12} size={40}>Ready for your Claude project</Label></At>
 </World>;
};

/** Closing payoff alone owns the ballistic throw/catch. */
export const OutroV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8/duration,walk=e(u,.2,1),wind=e(u,1.35,.35),p=clamp((u-1.9)/1.3),place=e(u,3.6,1.1),run=e(u,5,1.1);
 const fx=lerp(551,1210,p)+place*75,fy=lerp(442,415,p)-4*p*(1-p)*235-place*95;
 return <World t={t} setting="archive"><Desk x={150} y={685} w={1610}/>
  <Monitor x={1023} y={143} w={727} t={t} label="YOUR CLAUDE WORKSPACE"><div style={{padding:27}}><Logo name="claude.png" size={64}/><Label x={116} y={41} size={36}>Claude</Label><Label x={39} y={186} size={45} color={C.orange}>{typeOn('/fal-video',u,5,.8)}</Label><At x={330} y={120} style={{opacity:e(u,5.8,.4),transform:`translateY(${(1-e(u,5.8,.4))*25}px)`}}><ShotStage t={t} w={290} progress={e(u,6,1.7)} mode="orbit"/></At><Label x={39} y={290} size={29} color={C.teal} style={{opacity:run}}>Direct your first shot</Label></div></Monitor>
  <Glass x={187} y={208} w={536} h={188} t={t} frost={.4}><Label x={30} y={30} size={39}>fal-video.skill</Label><Label x={31} y={107} size={32} color={C.orange}>In the description ↓</Label></Glass>
  <Actor t={t} x={257+100*walk-25*wind*(1-p)} y={472} size={282} role="courier" look={1} walk={Math.sin(walk*Math.PI)} lift={wind*(1-p)} reach={1} lean={-12*wind*(1-p)} contact={3.2*duration/8}/>
  <Actor t={t+.2} x={1410-80*place} y={465} size={225} role="archivist" look={-1} lift={e(u,2.7,.4)} reach={place} contact={3.2*duration/8+.2} happy={run>.7}/>
  <At x={fx} y={fy} style={{transform:`rotate(${-12+360*p}deg) scale(${1-place*.42})`,opacity:1-e(u,4.65,.2)}}><SkillFile t={t} size={173}/></At>
  <Reel x={733} y={770} t={t} size={133}/><At x={900} y={796} style={{opacity:run}}><Logo name="fal.png" size={84}/><Label x={118} y={13} size={40}>Make your first video</Label></At>
 </World>;
};

export const RoadmapV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),p=e(t,.12,duration-.5),r=(a:number)=>({x:255+a*1320,y:572-Math.sin(a*Math.PI*2)*195}),v=r(p);
 const d=Array.from({length:90},(_,i)=>{const q=r(i/89);return `${i?'L':'M'}${q.x} ${q.y}`}).join(' ');
 return <World t={t} setting="map"><svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d={d} fill="none" stroke="#315F7920" strokeWidth="104" transform="translate(0,17)" strokeLinecap="round"/><path d={d} fill="none" stroke="#FFFFFFD0" strokeWidth="95" strokeLinecap="round"/><path d={d} fill="none" stroke="#D2724E77" strokeWidth="3" strokeDasharray="16 13"/><path d={d} fill="none" stroke={C.orange} strokeWidth="8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>{[.06,.49,.92].map((a,i)=>{const q=r(a);return <At key={i} x={q.x-98} y={q.y-226}><Pedestal x={-16} y={155} w={256} t={t}/><At x={30} y={-10}>{i===0?<Key t={t} size={143}/>:i===1?<Lens t={t} size={149}/>:<Reel t={t} x={0} y={0} size={147}/>}</At><Label x={-12} y={235} size={33}>{['01 · Connect','02 · Create','03 · Compare'][i]}</Label></At>;})}<Actor t={t} x={v.x-100} y={v.y-96} size={205} role="courier" walk={Math.sin(p*Math.PI)} look={1}/><At x={863} y={101} style={{opacity:e(t,.3,.3)}}><ShotStage t={t} w={330} mode="orbit" progress={p}/></At><At x={304} y={768}><Logo name="fal.png" size={78}/></At></World>;
};

export const CompareV9:React.FC<{duration:number;revealAt:number}>=({duration,revealAt})=>{
 const t=clock(),p=e(t,revealAt,.55);
 return <World t={t} setting="gallery">{[0,1].map(i=><At key={i} x={64+i*914} y={166}><Film w={878} t={t} placeholder={!i} video={!!i} label={i?'RIGHT':'LEFT'}/><Pedestal x={130} y={501} w={620} t={t}/><At x={90} y={610} style={{opacity:p,transform:`perspective(1000px) rotateX(${(1-p)*70}deg) translateY(${(1-p)*40}px)`}}><Logo name={i?'claude.png':'higgsfield.jpg'} size={88}/><Label x={112} y={23} size={43}>{i?'Claude':'Higgsfield'}</Label></At></At>)}<Actor t={t} x={764-120*p} y={770} size={232} role="archivist" look={p>.5?1:-1} reach={p} happy={p>.6}/><Reel x={1052} y={816} size={112} t={t}/></World>;
};

export const GuideV9=GuideSequence;
export const SkillV9=SkillSequence;
