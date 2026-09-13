import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont} from './cinematic-brand';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,Glass,Label,Logo,SkillFile,C,lerp,clamp,BrandedBackground} from './YouTubeV8Primitives';
import {EditRoom} from './ScenesV11';
import {WinnerCrownV12} from './ScenesV12';
import {AgentDestinationsV13,CursorV13} from './ScenesV13';
import {StopwatchV22} from './ScenesV22';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;

/** Real media is the subject. No reels, pedestals, scan bars or decorative cast.
 * Same four-second presentation clock, normal speed, muted, no color manipulation.
 * A is the user-confirmed Higgsfield download; source metadata remains in ledger. */
export const ComparisonV10:React.FC<{revealAt?:number;opening?:boolean}>=({revealAt=999,opening=false})=>{
 const t=clock(),phase=t%4,reveal=easeOut(t,revealAt,.3);
 // Follow the actor within A's original framing, not a fake motion or zoom.
 const aPosition=phase<1?48:phase<2.2?lerp(48,32,e(phase,1,1.2)):lerp(32,85,e(phase,2.2,1.1));
 return <AbsoluteFill data-video-first-comparison style={{fontFamily:bodyFont}}><BrandedBackground t={t}/>
  {[0,1].map(i=><div key={i} style={{position:'absolute',left:opening?32+i*940:12+i*958,top:opening?28:24,width:opening?916:938,height:opening?1016:742,overflow:'hidden',borderRadius:18,boxShadow:'0 10px 30px #40281B25'}}>
   <Loop durationInFrames={120}><OffthreadVideo data-comparison-side={i?'B':'A'} src={staticFile(opening?(i?'v9/intro-claude-v21.mp4':'v9/intro-higgsfield-v21.mp4'):(i?'v4/claude-result.mp4':'v9/higgsfield-comparison.mp4'))} muted style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:`${i?50:aPosition}% 50%`,...(opening?{transform:`scale(${1+.065*(e(t,i?2.8:1.6,.32)-e(t,i?3.65:2.45,.38))})`}:{})}}/></Loop>
   {opening&&<svg width="916" height="1016" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:1-easeOut(t,4,.2)}}><rect x="4" y="4" width="908" height="1008" rx="16" fill="none" stroke={C.clay} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-clamp(t/4)}/></svg>}
  </div>)}
  {[0,1].map(i=><div data-choice-number={i+1} key={i} style={{position:'absolute',left:opening?408+i*940:437+i*958,top:opening?62:789,width:opening?164:88,height:opening?164:88,borderRadius:'50%',display:'grid',placeItems:'center',background:'#FFF9EF',border:(opening?'5px':'3px')+' solid '+C.orange,boxShadow:'0 8px 20px #50331C20',fontSize:opening?104:49,fontWeight:850,color:C.ink}}>{i+1}</div>)}
  {opening&&t>=1.6&&t<4.6&&<StopwatchV22 t={t}/>}
  {!opening&&[0,1].map(i=><At key={i} x={i?1280:304} y={900} style={{opacity:reveal,transform:`translateY(${18*(1-reveal)}px)`}}><Logo name={i?'claude.png':'higgsfield.jpg'} size={77}/><Label x={98} y={18} size={40}>{i?'Claude':'Higgsfield'}</Label></At>)}
  {!opening&&t>=revealAt+3.6&&<WinnerCrownV12 t={t-revealAt-3.6}/>}
 </AbsoluteFill>;
};

const Stage:React.FC<{children:React.ReactNode}>=({children})=><EditRoom t={clock()}>{children}</EditRoom>;

/** A specific saved MP4, not an anonymous geometric token. */
export const VideoFileV10:React.FC<{w?:number;playing?:boolean}>=({w=300,playing=true})=><div style={{width:w,borderRadius:17,overflow:'hidden',background:'#FFF9EE',boxShadow:'0 13px 30px #40281B24',border:'2px solid #FFFFFF'}}>
 <div style={{position:'relative',height:w*.5625,overflow:'hidden'}}>{playing?<Loop durationInFrames={120}><OffthreadVideo muted src={staticFile('v4/claude-result.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop>:null}</div><div style={{padding:'12px 16px',fontSize:Math.max(21,w*.065),fontWeight:650,color:C.ink}}>{w<260?'Video':'rooftop-jump.mp4'}</div>
</div>;

/** Calendar commitments become an access pass; actual model identities sit
 * behind the interface. It explains recurring access, not a coin machine. */
export const AccessPriceV10:React.FC<{duration:number;brandAt:number}>=({duration,brandAt})=>{
 const t=clock(),u=t/duration,turn=e(u,.12,.35),access=e(u,.5,.32),year=e(u,.49,.35);
 return <Stage>
  <Glass x={160} y={158} w={660} h={527} t={t} frost={.5}>
   <Label x={37} y={32} size={35} color={C.orange}>Monthly access</Label>
   {[2,1,0].map(i=><div key={i} style={{position:'absolute',left:44+i*9,top:101+i*8,width:544,height:329,borderRadius:20,background:'#FFFDF6',border:'2px solid #D2724E55',transform:`perspective(1200px) rotateX(${-Math.min(1,turn*3-i)*Math.max(0,turn*3-i)*12}deg) translateY(${-Math.max(0,turn*3-i)*13}px)`,transformOrigin:'50% 0'}}><div style={{height:61,background:C.clay,borderRadius:'18px 18px 0 0',color:'#FFF9EE',padding:'12px 26px',boxSizing:'border-box',fontSize:27,fontWeight:700}}>MONTH {1+Math.min(11,Math.floor(turn*11))+i}</div><div style={{padding:'34px 28px',fontSize:84,fontWeight:750,color:C.ink}}>$100<span style={{fontSize:29}}> / month</span></div></div>)}
   <Label x={43} y={458} size={31} color={C.orange} style={{opacity:year}}>Recurring subscription</Label>
  </Glass>
  <Glass x={973} y={162} w={760} h={527} t={t} frost={.45}>
   <At x={31} y={26} style={{opacity:easeOut(t,brandAt,.2)}}><Logo name="higgsfield.jpg" size={71}/><Label x={100} y={17} size={37}>Higgsfield</Label></At>
   <div style={{position:'absolute',left:34,top:154,width:692,height:319,overflow:'hidden',borderRadius:20}}>
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'space-around',background:'#FFFFFF80'}}>{['hailuo.png','google.png','seedance.png'].map((logo,i)=><div key={logo} style={{transform:`translateY(${(1-e(u,.55+i*.08,.19))*115}px)`}}><Logo name={logo} size={128}/></div>)}</div>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,#EBDDC8,#FBF8F0)',transform:`translateY(${-100*access}%)`,borderBottom:'4px solid '+C.orange}}><svg width="692" height="319"><path d="M294 157V111a52 52 0 0 1 104 0v46" stroke={C.orange} strokeWidth="12" fill="none"/><rect x="272" y="147" width="148" height="108" rx="20" fill={C.orange}/><circle cx="346" cy="191" r="10" fill="#FFF9EE"/></svg></div>
   </div>
  </Glass>
  <Actor t={t} x={738+access*78} y={602} size={232} role="archivist" look={1} reach={access} lift={access*.7} contact={duration*.82}/>
  <At x={314} y={822} style={{opacity:e(u,.77,.12)}}><Logo name="claude.png" size={67}/><Label x={100} y={6} size={55} color={C.teal}>10¢<span style={{fontSize:28}}> per generation</span></Label></At>
 </Stage>;
};

/** Narration clock: 0–2.84 one skill; 2.84–6.04 same prompt/models;
 * 6.04–8.66 saved on computer. Each object keeps its identity through the action. */
export const PromptToFileV10:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.66/duration,load=e(u,.05,.38),send=e(u,2.85,.45),model=e(u,4.45,.4),save=e(u,6.02,.55);
 const outX=lerp(1100,1084,save),outY=lerp(274,258,save),outW=lerp(540,480,save);
 return <Stage>
  <Glass x={133} y={136} w={786} h={568} t={t} frost={.55}>
   <At x={32} y={27}><Logo name="claude.png" size={66}/><Label x={98} y={13} size={38}>Claude</Label></At>
   <div style={{position:'absolute',left:34,top:122,width:716,height:204,borderRadius:22,background:'#FFF8EC',boxShadow:'inset 0 1px 4px #69422526',padding:'25px 29px',boxSizing:'border-box'}}><div style={{fontSize:31,fontWeight:700,color:C.orange}}>/fal-video</div><div style={{fontSize:34,lineHeight:1.35,marginTop:13}}>A man leaps between rooftops.</div><div style={{fontSize:34}}>Follow the jump.</div></div>
   <At x={36} y={375} style={{opacity:load}}><SkillFile t={t} size={103}/><Label x={133} y={14} size={32}>fal-video.skill</Label><Label x={133} y={66} size={25} color={C.teal}>Instructions loaded</Label></At>
  </Glass>
  <Glass x={1034} y={136} w={713} h={568} t={t} frost={.4}>
   <At x={28} y={24}><Logo name="fal.png" size={66}/><Label x={100} y={15} size={35}>{u<6.02?'Model access':save<.95?'Saving your video…':'Saved on your computer'}</Label></At>
   <div style={{position:'absolute',left:32,top:135,display:'flex',gap:38,opacity:1-model}}>{['hailuo.png','google.png','seedance.png'].map((l,i)=>{const hit=e(u,3.2+i*.25,.19);return <div key={l} style={{padding:17,borderRadius:19,border:'3px solid #FFFFFF',background:'#FFF9EE',boxShadow:`0 0 ${hit*29}px #DC935588`,transform:`translateY(${-24*Math.sin(hit*Math.PI)}px) scale(${1+.08*Math.sin(hit*Math.PI)})`}}><Logo name={l} size={115}/></div>;})}</div>
   <div style={{position:'absolute',left:32,top:480,right:32,height:60,borderRadius:18,background:'#E4EBDD',opacity:save}}><Label x={23} y={15} size={27} color={C.teal}>Downloads / rooftop-jump.mp4</Label></div>
  </Glass>
  <At x={lerp(457,1154,send)} y={lerp(346,374,send)-Math.sin(send*Math.PI)*120} style={{opacity:send*(1-model),transform:`rotate(${-5+send*5}deg)`}}><div style={{padding:'24px 34px',borderRadius:18,background:'#FFF9EE',border:'2px solid '+C.clay,boxShadow:'0 18px 35px #40281B25',fontSize:31,fontWeight:700}}>Same prompt</div></At>
  <At x={outX} y={outY} style={{opacity:model,transform:`scale(${.78+.22*model})`,transformOrigin:'50% 50%'}}><VideoFileV10 w={outW}/></At>
  <Actor t={t} x={712+load*25} y={610} size={171} role="operator" look={1} reach={send} lift={load*.65} contact={.5}/>
  <Actor t={t+.2} x={1215-save*180} y={653} size={161} role="courier" look={-1} lift={save*.75} reach={save} walk={Math.sin(save*Math.PI)} contact={6.57}/>
  <CursorV13 x={737} y={408} press={load}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:send*(1-model)}}>{[0,1,2].map(i=><path key={i} d={`M887 367C974 367 970 ${330+i*30} ${1110+i*175} 340`} fill="none" stroke={i%2?C.teal:C.orange} strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(u,2.95+i*.12,.36)}/>)}</svg>
  <AgentDestinationsV13 t={t-.3} x={156} y={830} compact/>
  <Label x={156} y={925} size={32} color={C.teal}>{u<2.84?'One reusable workflow':u<6.02?'Same prompt → model → video':'Your video. Saved on your computer.'}</Label>
 </Stage>;
};

/** A literal interface cutaway: the front UI lifts and exposes the named
 * models that generate the video. 'Unlimited' resolves to a finite queue. */
export const InterfaceCutawayV10:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,peel=e(u,.025,.115),limits=e(u,.39,.12);
 return <Stage>
  <Glass x={468} y={154} w={1260} h={549} t={t} frost={.4}>
   <Label x={38} y={29} size={35} color={C.teal}>The models underneath</Label>
   {['hailuo.png','google.png','seedance.png'].map((l,i)=><At key={l} x={41+i*401} y={142} style={{transform:`translateY(${(1-peel)*85}px)`}}><Logo name={l} size={112}/><Label x={135} y={27} size={29}>{['Hailuo','Google','Seedance'][i]}</Label><div style={{position:'absolute',top:159,left:0,width:340,height:167,borderRadius:19,background:'#FFF8EE',opacity:peel}}><Label x={22} y={24} size={27}>Prompt → model</Label><Label x={22} y={92} size={27} color={C.teal}>Generated video ↓</Label></div></At>)}
  </Glass>
  <Glass x={468} y={154-peel*108} w={1260} h={549} t={t} frost={.93} style={{transform:`perspective(1600px) rotateX(${peel*22}deg)`,clipPath:`inset(0 0 ${peel*420}px 0 round 30px)`}}><At x={37} y={30}><Logo name="higgsfield.jpg" size={65}/><Label x={94} y={14} size={38}>The interface</Label></At><div style={{position:'absolute',left:38,top:161,width:1184,height:140,borderRadius:20,background:'#EEE7DC'}}><Label x={28} y={34} size={35}>Describe your video…</Label></div><Label x={41} y={392} size={35} color={C.orange}>Generate video →</Label></Glass>
  <Actor t={t} x={190+peel*40} y={440-peel*40} size={273} role="operator" look={1} lift={peel} reach={1} contact={duration*.35}/>
  <Glass x={303} y={795} w={1019} h={177} t={t} frost={.55} style={{opacity:limits}}><Label x={28} y={22} size={34} color={C.orange}>“Unlimited” · check the actual limits</Label><div style={{position:'absolute',left:30,top:92,display:'flex',gap:13}}>{['Queued','Queued','Queued','Limit reached'].map((v,i)=><div key={v+i} style={{padding:'9px 20px',fontSize:25,borderRadius:11,background:i===3?'#F1D4C0':'#DFEBDD',color:i===3?C.orange:C.teal,opacity:e(u,.51+i*.065,.1)}}>{v}</div>)}</div></Glass>
 </Stage>;
};

/** Bonus has a real downloadable counterpart. Preview its content, not a
 * mysterious gift box or a second unfulfilled promise. */
export const BonusPackV10:React.FC<{t:number;compact?:boolean}>=({t,compact=false})=>{
 const p=easeOut(t,0,.4);return <Glass x={compact?30:210} y={compact?865:749} w={compact?700:1110} h={compact?180:245} t={t} frost={.7} style={{opacity:p,transform:`translateY(${24*(1-p)}px)`}}>
 <Label x={27} y={compact?22:25} size={compact?23:30} color={C.orange}>{compact?'COMING UP · FREE BONUS':'BONUS · CAMERA-DIRECTION PROMPT PACK'}</Label>
 <Label x={27} y={compact?65:86} size={compact?31:34}>{compact?'Six camera-direction recipes':'Push in · orbit · follow · reveal · lock off · crane'}</Label>
 <Label x={27} y={compact?124:158} size={compact?23:27} color={C.teal}>{compact?'With the free guide + skill':'Copy a recipe, describe your scene, make it your own.'}</Label>
 {!compact&&<Label x={27} y={204} size={24}>Download with the guide in the description ↓</Label>}
 </Glass>;
};

/** The direct-access beat is a route change, not a replay of prompt-to-file.
 * A reusable brief bypasses the subscription desk and lands in fal's request
 * composer; no quantity/pricing or output-from-every-model claim is invented. */
export const DirectRouteV10:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,bypass=e(u,.06,.09),deliver=e(u,.19,.105),open=e(u,.32,.08),choose=e(u,.34,.08),submit=e(u,.69,.07),returning=e(u,.82,.08);
 return <Stage>
  <Glass x={162} y={161} w={701} h={443} t={t} frost={.6} style={{opacity:1-bypass*.65,transform:`translateY(${-bypass*80}px) scale(${1-bypass*.1})`,transformOrigin:'top left'}}><At x={30} y={26}><Logo name="higgsfield.jpg" size={65}/><Label x={120} y={14} size={36}>Subscription access</Label></At><Label x={39} y={155} size={81} color={C.orange}>$100<span style={{fontSize:30}}> / month</span></Label><Label x={42} y={328} size={29}>A recurring platform plan</Label></Glass>
  <Glass x={996} y={153} w={761} h={521} t={t} frost={.5}>
   <At x={30} y={28}><Logo name="fal.png" size={77}/><Label x={110} y={16} size={37}>Go directly to the models</Label></At>
   <div style={{position:'absolute',left:33,top:143,width:695,height:197,borderRadius:20,background:'#FFF8EE'}}><Label x={25} y={26} size={29} color={C.teal}>{u>.75?'Request sent':u>.31?'Prompt received':'Your prompt'}</Label><div style={{position:'absolute',left:25,top:82,fontSize:31,lineHeight:1.35,opacity:e(u,.29,.045)}}>A man leaps between rooftops.<div>Follow the jump.</div></div><div style={{position:'absolute',right:20,bottom:19,opacity:choose,background:C.teal,color:'#FFF8EB',padding:'5px 13px',borderRadius:12,fontSize:29,transform:`scale(${1-.12*Math.sin(submit*Math.PI)})`}}>↑</div></div>
   <At x={49} y={359}>{['hailuo.png','google.png','seedance.png'].map((l,i)=><At key={l} x={i*229} y={0} style={{transform:`translateY(${(1-e(u,.32+i*.025,.055))*45-choose*(i===2?9:0)}px) scale(${i===2?1+choose*.12:1-choose*.07})`,opacity:open*(i===2?1:1-choose*.4)}}><Logo name={l} size={96}/><svg width="116" height="116" style={{position:'absolute',left:-10,top:-10}}><rect x="2" y="2" width="112" height="112" rx="25" fill="none" stroke={C.orange} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={i===2?1-choose:1}/></svg><Label x={i===2?-44:-3} y={115} size={i===2?25:24} color={i===2?C.orange:C.teal} style={{fontWeight:i===2?850:650}}>{['Hailuo','Veo','Seedance 2.5'][i]}</Label></At>)}</At>
  </Glass>
  <div style={{position:'absolute',left:217,top:706,width:975,height:8,background:'#D2724E45',borderRadius:5}}><div style={{height:8,background:C.orange,width:`${deliver*100}%`,borderRadius:5}}/></div>
  <Actor t={t} x={236+deliver*590} y={570} size={236} role="courier" walk={Math.sin(deliver*Math.PI)} look={1} lift={.65} reach={deliver} contact={duration*.81}/>
  <At x={421+deliver*598} y={597-deliver*279-Math.sin(deliver*Math.PI)*60} style={{opacity:1-e(u,.29,.045),transform:`rotate(${-8+deliver*8}deg)`}}><SkillFile t={t} size={153} label="prompt"/></At>
  <At x={330} y={302} style={{opacity:returning,transform:`translate(${(1-returning)*510}px,${(1-returning)*100}px) scale(${.78+.22*returning})`}}><VideoFileV10 w={348}/></At>
  <Actor t={t+.25} x={1680} y={560} size={124} role="operator" look={-1} reach={choose} lift={submit*.55} contact={duration*.76} happy={returning>.8}/>
  <At x={211} y={839}><Logo name="claude.png" size={68}/><Label x={96} y={12} size={39} color={C.teal}>Keep the workflow. Change the route.</Label></At>
 </Stage>;
};

/** Premium-plan restriction is shown on an actual editing surface. The
 * gate opens into fal access as the narration introduces the alternative. */
export const FeatureGateV10:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,tryIt=e(u,.025,.1),unlock=e(u,.38,.13);
 return <Stage>
  <Glass x={430} y={139} w={1310} h={590} t={t} frost={.6}>
   <Label x={37} y={24} size={39}>{unlock>.4?'A different way to access the models':'Features behind a plan'}</Label>
   <div style={{position:'absolute',left:38,top:117,width:604,height:373,overflow:'hidden',borderRadius:20}}><VideoFileV10 w={604}/></div>
   <div style={{position:'absolute',left:710,top:123,width:557,height:374,background:'#FFF8EE',borderRadius:20,padding:25,boxSizing:'border-box'}}>
    {['Model choice','Generation options','Output settings'].map((x,i)=>{const pick=e(u,.55+i*.11,.065);return <div key={x} style={{padding:'16px 12px',fontSize:29,borderBottom:'1px solid #D3C9B8',background:`rgba(232,197,155,${pick*.45})`,transform:`translateX(${Math.sin(tryIt*Math.PI*2)*5*(1-unlock)+pick*6}px)`}}>{x}<span style={{float:'right',color:C.orange,transform:`rotate(${-45*(1-pick)}deg)`,display:'inline-block'}}>{unlock>.8?'↗':'—'}</span></div>;})}
   </div>
   <div style={{position:'absolute',left:688,top:98,width:600,height:421,borderRadius:23,background:'#F1DDC8F2',transform:`translateY(${-unlock*510}px)`,opacity:1-unlock}}><svg width="600" height="260"><path d="M251 126V84a49 49 0 0 1 98 0v42" stroke={C.orange} strokeWidth="12" fill="none"/><rect x="226" y="119" width="148" height="105" rx="20" fill={C.orange}/></svg><Label x={78} y={282} size={40} color={C.orange}>Higher-tier access</Label></div>
  </Glass>
  <Actor t={t} x={183+tryIt*18} y={481} size={259} role="archivist" look={1} reach={tryIt} lift={unlock*.7} contact={duration*.87} happy={unlock>.9}/>
  <At x={567} y={842} style={{opacity:unlock}}><Logo name="fal.png" size={78}/><Label x={111} y={17} size={38} color={C.teal}>Choose the model directly</Label></At>
 </Stage>;
};
