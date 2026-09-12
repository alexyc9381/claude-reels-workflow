import React from 'react';
import {AbsoluteFill,Img,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,Glass,Label,Logo,SkillFile,Key,CameraIcon,C,clamp,lerp,visible} from './YouTubeV8Primitives';
import {EditRoom} from './ScenesV11';
import {bodyFont} from './cinematic-brand';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;

/** Existing official marks, not invented logos. These are workflow destinations,
 * not a claim that every model or product has the same installation procedure. */
export const AgentDestinationsV13:React.FC<{t:number;x:number;y:number;compact?:boolean}>=({t,x,y,compact=false})=><At x={x} y={y}>
 {['Claude Code','Codex','Cursor'].map((name,i)=><At key={name} x={i*(compact?295:380)} y={0} style={{opacity:easeOut(t,i*.13,.24)}}>
  {i===0?<Logo name="claude.png" size={compact?46:62}/>:<Img src={staticFile('v3/'+(i===1?'codex.svg':'cursor.svg'))} style={{width:compact?46:62,height:compact?46:62,objectFit:'contain'}}/>}
  <Label x={compact?60:82} y={compact?7:11} size={compact?28:34}>{name}</Label>
 </At>)}
</At>;

export const CursorV13:React.FC<{x:number;y:number;press?:number;scale?:number}>=({x,y,press=0,scale=1})=><At x={x} y={y} style={{transform:`scale(${scale*(1-.15*Math.sin(press*Math.PI))})`,transformOrigin:'top left'}}><svg width="60" height="74" viewBox="0 0 60 74"><path d="M5 4L49 44L29 46L39 64L29 69L19 49L5 62Z" fill="#FFF9ED" stroke={C.ink} strokeWidth="3" strokeLinejoin="round"/></svg></At>;

/** One stroke around the existing facecam; the endpoint is the next scene. */
export const FaceTimerV13:React.FC<{width:number;height:number;progress:number}>=({width,height,progress})=><svg data-face-timer width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} style={{position:'absolute',inset:0,pointerEvents:'none'}}><rect x="4" y="4" width={width-8} height={height-8} rx="26" fill="none" stroke="#FFF8E2" strokeWidth="8" opacity=".6"/><rect x="4" y="4" width={width-8} height={height-8} rx="26" fill="none" stroke={C.orange} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-clamp(progress)}/></svg>;

/** Central seam, independent of the two identity badges below the videos. */
export const RevealCountdownV13=()=>{
 const t=clock(),phase=t%1,n=Math.max(1,3-Math.floor(t)),p=easeOut(phase,0,.14);
 return <At x={885} y={323} style={{fontFamily:bodyFont,filter:'drop-shadow(0 12px 22px #1B19184D)'}}>
  <svg width="150" height="150"><circle cx="75" cy="75" r="66" fill="#FFF9F0" stroke="#EBC5A3" strokeWidth="3"/><circle cx="75" cy="75" r="66" fill="none" stroke={C.orange} strokeWidth="6" pathLength="1" strokeDasharray="1" strokeDashoffset={1-phase} transform="rotate(-90 75 75)"/></svg>
  <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:76,fontWeight:850,color:C.ink,fontVariantNumeric:'tabular-nums',transform:`scale(${1+.13*(1-p)})`}}>{n}</div>
 </At>;
};

/** Only appears during the recorded playback pause. The click and removal of
 * the play symbol share one anchor immediately before actual footage resumes. */
export const PlaybackStartV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),arrive=e(t,.12,2.5),click=e(t,2.83,.12),fade=1-easeOut(t,2.95,.2);
 return <AbsoluteFill style={{opacity:visible(t,duration)*fade}}>
  <At x={882} y={402}><svg width="144" height="144"><circle cx="72" cy="72" r={61+click*18} fill="#FFF9F0E8" stroke={C.orange} strokeWidth="3" opacity={1-click*.5}/><path d="M58 42L104 72L58 102Z" fill={C.orange}/></svg></At>
  <CursorV13 x={lerp(1770,948,arrive)} y={lerp(706,481,arrive)-Math.sin(arrive*Math.PI)*95} press={click}/>
 </AbsoluteFill>;
};

/** One protected illustration replaces three competing credential overlays. */
export const CredentialV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),issue=e(t,4.7,.5),copy=e(t,9.2,.75),store=e(t,11.4,.85),step=t<4.7?0:t<9.2?1:t<11.4?2:3;
 return <AbsoluteFill data-credential-sequence style={{opacity:visible(t,duration)}}>
  <Glass x={128} y={154} w={1190} h={560} t={t} frost={.85}>
   <At x={32} y={25}><Logo name="fal.png" size={65}/><Label x={93} y={9} size={40}>{['Open API keys','Create your key','Copy the key','Keep it private'][step]}</Label></At>
   <Label x={35} y={110} size={29} color={C.teal}>A private credential that connects your workflow to fal.ai.</Label>
   <div style={{position:'absolute',left:36,top:202,width:1086,height:130,background:'#FFF9EF',border:'2px solid #DCC8B4',borderRadius:20}}>
    <Label x={25} y={42} size={37}>{issue>.6?'••••  ••••  ••••  ••••':'My video workflow'}</Label>
    <div style={{position:'absolute',right:19,top:27,width:190,height:74,borderRadius:16,background:copy>.9?C.teal:C.orange,color:'#FFF',fontSize:33,fontWeight:800,textAlign:'center',paddingTop:15,boxSizing:'border-box'}}>{copy>.9?'Copied':issue>.9?'Copy':'Create'}</div>
   </div>
   <At x={44} y={390}><Key t={t} size={92}/><Label x={125} y={14} size={29} color={C.orange}>{store>.8?'Saved in your private environment':'Never share the key in a video or public prompt'}</Label></At>
   <Label x={35} y={514} size={23} color={C.teal}>Illustration · real credentials remain hidden</Label>
   <CursorV13 x={1016} y={311} press={issue*(1-copy)+copy*(1-store)}/>
  </Glass>
  <Actor t={t} x={1080-store*120} y={558} size={180} role="operator" look={-1} reach={copy} lift={store*.7} contact={12.25} happy={store>.9}/>
 </AbsoluteFill>;
};

/** Type remains fixed to the frame. Only the example's framing changes. */
export const FormatV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),q=e(t,1.1,.65),done=e(t,3.9,.65);
 return <AbsoluteFill data-stable-format-label style={{opacity:visible(t,duration)}}><Glass x={88} y={148} w={1020} h={310} t={t} frost={.85}>
  <Label x={30} y={24} size={35} color={C.orange}>Choose the format</Label>
  <At x={33} y={93}><svg width="430" height="184"><rect x="3" y="3" width="310" height="175" rx="15" fill="#E3ECE7" stroke={C.teal} strokeWidth="3"/><path d="M5 151L80 72L143 134L205 48L311 164V177H5Z" fill="#89AFA3"/><rect x={3+105*q*(1-done)} y="3" width={310-210*q*(1-done)} height="175" rx="15" fill="#F6DFC42A" stroke={C.orange} strokeWidth="4"/></svg></At>
  <Label x={438} y={103} size={39} style={{fontWeight:800}}>16:9 · YouTube</Label><Label x={438} y={168} size={33} color={C.teal}>9:16 · vertical</Label>
  <Actor t={t} x={832} y={103} size={144} role="operator" look={-1} reach={q}/>
 </Glass></AbsoluteFill>;
};

/** A shutter is a physical object: Claude reaches underneath, raises it, then
 * the selected settings become operable. No remote magically opening gate. */
export const FeatureGateV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,approach=e(u,.01,.13),grip=e(u,.14,.09),lift=e(u,.26,.24),select=e(u,.55,.1),send=e(u,.75,.11);
 const actorX=385+approach*93,actorY=539+12*grip*(1-lift),angle=(-70*grip-45*lift)*Math.PI/180;
 const handX=actorX+(166+26*Math.cos(angle))*267/200,handY=actorY+(99+26*Math.sin(angle))*267/200;
 return <EditRoom t={t}>
  <Label x={154} y={92} size={46}>Higher-tier access</Label>
  <Glass x={672} y={167} w={1060} h={544} t={t} frost={.65}>
   <Label x={33} y={26} size={33} color={C.teal}>Choose your generation settings</Label>
   {['Model choice','Camera direction','Output settings'].map((s,i)=><At key={s} x={34} y={127+i*117}>
    <div style={{width:985,height:92,borderRadius:16,background:i===0?'#E4EDE5':'#FFF8ED',border:'2px solid #FFFFFF'}}><Label x={24} y={25} size={33}>{s}</Label><Label x={590} y={28} size={28} color={C.orange} style={{opacity:e(u,.52+i*.09,.055)}}>{['Seedance 2.5','Follow the action','Review before sending'][i]}</Label></div>
   </At>)}
   <div style={{position:'absolute',left:17,top:99-lift*466,width:1022,height:429,borderRadius:20,overflow:'hidden',background:'linear-gradient(105deg,#EADBC7,#FFFDF8 48%,#CEAD87)',opacity:1-e(u,.48,.1),border:'3px solid #FFF9E9'}}>
    {Array.from({length:11},(_,i)=><div key={i} style={{position:'absolute',left:0,right:0,top:20+i*36,height:3,background:'#B89C7B55'}}/>)}
    <svg width="1022" height="429"><path d="M468 200V143a45 45 0 0 1 90 0v57" fill="none" stroke={C.orange} strokeWidth="10"/><rect x="444" y="190" width="140" height="98" rx="18" fill={C.orange}/><path d="M40 397H982" stroke="#9C7854" strokeWidth="13"/></svg>
   </div>
  </Glass>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   <path d="M649 656V213H692" fill="none" stroke="#B79A7966" strokeWidth="15"/>
   <path d="M649 656V213H692" fill="none" stroke={C.teal} strokeWidth="4" strokeDasharray="5 8" strokeDashoffset={-lift*220}/>
   <circle cx="649" cy="656" r="27" fill="#FFFAF1" stroke="#A17A50" strokeWidth="4"/>
   <path d={`M649 656L${handX} ${handY}`} stroke={C.orange} strokeWidth="10" strokeLinecap="round" opacity={grip}/>
   <circle cx={handX} cy={handY} r="13" fill="#F8D99E" stroke={C.orange} strokeWidth="4" opacity={grip}/>
  </svg>
  <Actor t={t} x={actorX} y={actorY} size={267} role="operator" look={1} reach={grip} lift={lift} contact={duration*.5} happy={send>.8}/>
  <At x={158} y={803} style={{opacity:select}}><Logo name="fal.png" size={70}/><Label x={99} y={12} size={38} color={C.teal}>Access the model directly</Label></At>
  <CursorV13 x={1495} y={378+send*119} press={send}/>
 </EditRoom>;
};

/** First promise: copy the reusable instructions, then follow along. The
 * paste action owns one payload; it doesn't replay the closing file delivery. */
export const FollowAlongV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,copy=e(u,.1,.11),travel=e(u,.24,.18),paste=e(u,.43,.1),run=e(u,.59,.1),tools=e(u,.75,.1);
 return <EditRoom t={t}>
  <Label x={153} y={90} size={49} style={{fontWeight:850}}>FREE setup · description below ↓</Label>
  <Glass x={140} y={196} w={650} h={438} t={t} frost={.6}>
   <Label x={33} y={27} size={36} color={C.orange}>Your follow-along kit</Label>
   <At x={40} y={128}><SkillFile t={t} size={151}/><Label x={187} y={12} size={34}>Video workflow</Label><Label x={187} y={71} size={28} color={C.teal}>Setup + camera recipes</Label></At>
   <div style={{position:'absolute',left:37,top:325,width:551,height:70,background:copy>.9?C.teal:C.orange,borderRadius:15,color:'#FFF',fontSize:30,fontWeight:800,padding:'17px 23px',boxSizing:'border-box'}}>{copy>.9?'Copied':'Copy instructions'}</div>
  </Glass>
  <Glass x={929} y={196} w={802} h={438} t={t} frost={.6}>
   <Label x={29} y={27} size={36}>Your coding agent</Label>
   <div style={{position:'absolute',left:29,top:108,width:731,height:225,borderRadius:20,background:'#FFF8EE',border:'2px solid #DDC9B2'}}>
    <Label x={24} y={27} size={32} color={C.orange} style={{opacity:paste}}>Load this video workflow</Label>
    <Label x={24} y={86} size={28} style={{opacity:paste}}>Walk me through setup, one step at a time.</Label>
    <Label x={24} y={160} size={27} color={C.teal} style={{opacity:run}}>Review → configure → create</Label>
   </div>
   <Label x={29} y={365} size={25} color={C.teal}>Workflow illustration · setup varies by agent</Label>
  </Glass>
  <At x={lerp(423,1155,travel)} y={lerp(456,339,travel)-Math.sin(travel*Math.PI)*105} style={{opacity:copy*(1-paste),transform:`rotate(${-5+travel*5}deg)`}}><div style={{background:'#FFFDF3',border:'3px solid '+C.orange,padding:'18px 30px',borderRadius:14,fontFamily:bodyFont,fontSize:31,fontWeight:800}}>Instructions</div></At>
  <Actor t={t} x={773} y={548} size={191} role="archivist" look={1} reach={paste} lift={travel*.7} contact={duration*.53}/>
  <AgentDestinationsV13 t={t-duration*.73} x={153} y={785}/>
  <Label x={154} y={892} size={30} color={C.orange} style={{opacity:tools}}>Follow along with the free guide.</Label>
 </EditRoom>;
};

/** Scene beats arrive at .12/.50/.88 of the roadmap. Labels live above the
 * action path so the courier never crosses the text's protected bounds. */
export const roadmapBeatsV13=[.12,.5,.88];
export const RoadmapV13:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration;
 const p=u<.5?lerp(0,.5,e(u,.12,.38)):lerp(.5,1,e(u,.5,.38));
 const points=[{x:300,y:485},{x:858,y:355},{x:1475,y:520}];
 const phase=p<.5?0:1,q=p<.5?p*2:(p-.5)*2,a=points[phase],b=points[phase+1],cx=lerp(a.x,b.x,q),cy=lerp(a.y,b.y,q)-Math.sin(q*Math.PI)*90;
 return <EditRoom t={t}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M300 570C480 570 654 437 858 440S1250 605 1475 605" stroke="#BB967235" strokeWidth="98" fill="none"/><path d="M300 555C480 555 654 422 858 425S1250 590 1475 590" stroke="#FFF9ED" strokeWidth="86" fill="none"/><path d="M300 555C480 555 654 422 858 425S1250 590 1475 590" stroke={C.orange} strokeWidth="5" strokeDasharray="12 12" fill="none"/></svg>
  {points.map((v,i)=>{const hit=e(t,duration*roadmapBeatsV13[i],.17),glow=Math.max(0,1-(t-duration*roadmapBeatsV13[i])/.65);return <At key={i} x={v.x-118} y={v.y-200}>
   <Label x={-27} y={-78} size={36} style={{width:294,textAlign:'center',fontWeight:800}}>{['1 · Connect','2 · Create','3 · Compare'][i]}</Label>
   <div style={{position:'absolute',left:-8,top:-10,width:250,height:233,borderRadius:27,background:'#FFFFFFA8',border:'2px solid #FFF',boxShadow:hit>0?`0 0 ${16+glow*40}px #DC8C4B88`:'0 12px 25px #4A30201A',transform:`translateY(${-8*Math.sin(hit*Math.PI)}px)`}}/>
   <At x={45} y={27}>{i===0?<Key t={t} size={153}/>:i===1?<CameraIcon t={t} size={165}/>:<div style={{width:181,height:133,borderRadius:15,overflow:'hidden'}}><Loop durationInFrames={120}><OffthreadVideo src={staticFile('v4/claude-result.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>}</At>
   <svg width="300" height="280" style={{position:'absolute',left:-33,top:-30,pointerEvents:'none'}}><rect x="22" y="20" width="250" height="233" rx="27" fill="none" stroke={C.orange} strokeWidth="5" opacity={hit>0?glow:0}/></svg>
  </At>;})}
  <Actor t={t} x={cx-79} y={cy-38} size={168} role="courier" walk={.9} look={1} contact={duration*roadmapBeatsV13[phase+1]}/>
  <Label x={157} y={824} size={37} color={C.teal}>Connect once. Create. Compare the results.</Label>
 </EditRoom>;
};
