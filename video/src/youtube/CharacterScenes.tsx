import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut,easeOut} from './glass-motion';
import {C,clamp,lerp,pop,Glass,Logo,SkillFile,Film,Key,Actor,Label,Stage,AppWindow,Aura,CameraIcon,typeOn,settle} from './YouTubeV7Primitives';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const e=easeInOut;
const Move:React.FC<{t:number;at?:number;children:React.ReactNode}>=({t,at=0,children})=><AbsoluteFill style={{opacity:easeOut(t,at,.22),transform:`translateY(${(1-pop(t,at))*65}px)`}}>{children}</AbsoluteFill>;

/** No headline competes with the comparison. A is deliberately not fabricated. */
export const HookScene:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,guessAt,whyAt,higgsAt})=>{
 const t=clock();
 if(t>=whyAt)return <Sequence from={Math.round(whyAt*30)}><AccessGate duration={duration-whyAt} brandAt={higgsAt-whyAt}/></Sequence>;
 const p=easeOut(t,guessAt,.28);
 return <Stage t={t}>
  {[0,1].map(i=><div key={i} style={{position:'absolute',left:60+i*915,top:105,transform:`translateY(${(1-pop(t,.03+i*.06))*42}px) perspective(2200px) rotateY(${(1-e(t,.06,.6))*(i?-5:5)}deg)`}}><Film w={885} t={t} placeholder={!i} video={!!i} label={i?'B':'A'}/><Aura w={885} h={498} t={t}/></div>)}
  {[0,1].map(i=><Glass key={i} x={i?1240:100} y={659} w={580} h={146} t={t} frost={.81} style={{opacity:p,transform:`translateY(${(1-p)*35}px)`}}>
   <div style={{position:'absolute',left:26,top:33}}><Logo name={i?'claude.png':'higgsfield.jpg'} size={70}/></div>
   <Label x={122} y={24} size={77} color={i?C.teal:C.ink}>{i?'10¢':'$100'}</Label>
   <Label x={i?282:327} y={61} size={28}>{i?'per video':'/ month'}</Label>
  </Glass>)}
  <Actor t={t} x={510} y={827} size={170} look={1} reach={e(t,1,.4)} happy={t>4}/>
  <Actor t={t+.4} x={1260} y={827} size={170} look={-1} reach={e(t,1.5,.4)} happy={t>4}/>
 </Stage>;
};

/** A request physically meets a plan-controlled access gate. The gate is the
 * semantic object; model badges remain behind it, not a generic grid of cards. */
export const AccessGate:React.FC<{duration:number;brandAt?:number;features?:boolean}>=({duration,brandAt=0,features=false})=>{
 const t=clock(),u=t*7.6/duration,walk=e(u,.25,1.75),lift=e(u,2.1,.8),gate=1-e(u,4.2,1.2),pass=e(u,5.1,1.9),sx=175+410*walk+320*pass;
 const bill=e(u,2.3,.55),recoil=settle(u,2.1,15),token=clamp((u-5.15)/1.9);
 return <Stage t={t}>
  <div style={{position:'absolute',left:1160,top:111,display:'flex',alignItems:'center',gap:18,opacity:easeOut(t,brandAt,.35)}}><Logo name={features?'claude.png':'higgsfield.jpg'} size={78}/><Label x={100} y={24} size={36}>{features?'Model access':'Higgsfield'}</Label></div>
  {/* Elevated model alcoves, individual glass lenses, no rectangular list. */}
  {['hailuo.png','google.png','seedance.png'].map((logo,i)=>{
   const x=1330+Math.cos(-1.45+i*1.3)*170,y=360+Math.sin(-1.45+i*1.3)*135;
   return <div key={logo} style={{position:'absolute',left:x,top:y,transform:`translateY(${Math.sin(t*1.7+i)*9}px) scale(${pop(u,.4+i*.16)})`}}>
    <div style={{position:'absolute',left:-27,top:-27,width:168,height:168,borderRadius:'50%',background:'linear-gradient(140deg,#FFFFFFE8,#FFFFFF35)',border:'2px solid #FFFFFF',boxShadow:'inset 0 -12px 23px #A1643033,0 16px 35px #90674526'}}/>
    <div style={{position:'relative'}}><Logo name={logo} size={112}/></div>
   </div>;
  })}
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
   <defs><linearGradient id="v7-gate"><stop stopColor="#FAFFFF" stopOpacity=".9"/><stop offset=".4" stopColor="#FFFFFF" stopOpacity=".22"/><stop offset="1" stopColor="#E6BDA0" stopOpacity=".6"/></linearGradient></defs>
   <path d="M123 749H1780" stroke="#FFFFFFA0" strokeWidth="38" strokeLinecap="round"/>
   <path d="M146 749H1770" stroke="#CAA68B" strokeWidth="2" strokeDasharray="12 15"/>
   <path d="M912 719V322C912 134 1188 134 1188 322V719" fill="none" stroke="url(#v7-gate)" strokeWidth="32"/>
   <path d="M912 719V322C912 134 1188 134 1188 322V719" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
   <g transform={`translate(0,${(1-gate)*-465})`} opacity={gate}>
    <path d="M934 682V333Q1050 176 1166 333V682Z" fill="url(#v7-gate)" stroke="#FFF" strokeWidth="3"/>
    {[970,1010,1050,1090,1130].map(x=><path key={x} d={`M${x} 337V682`} stroke="#B8896766" strokeWidth="5"/>)}
    <path d="M1026 428V405a24 24 0 0 1 48 0v23" fill="none" stroke={C.orange} strokeWidth="9"/><rect x="1009" y="429" width="82" height="68" rx="14" fill={C.orange}/><circle cx="1050" cy="454" r="7" fill="#FFF4DB"/><path d="M1050 454V475" stroke="#FFF4DB" strokeWidth="5"/>
   </g>
  </svg>
  <Actor t={t} x={sx-recoil} y={510} size={250} look={1} walk={Math.sin(walk*Math.PI)+Math.sin(pass*Math.PI)} reach={1} contact={2.1*duration/7.6} lean={-4*bill*(1-pass)} happy={pass>.8}/>
  <div style={{position:'absolute',left:sx+203-recoil,top:478-lift*32,transform:`rotate(${-8+7*walk+settle(u,2.1,7)}deg) scale(${1-token*.25})`,opacity:1-e(u,7,.45)}}><SkillFile t={t} size={152} label="request"/></div>
  <div style={{position:'absolute',left:465,top:235,transform:`translateY(${(1-bill)*50+Math.sin(t*1.6)*5}px) rotate(${-5+settle(u,2.3,5)}deg)`,opacity:bill*(1-e(u,5.6,.4))}}>
   <Glass x={0} y={0} w={355} h={176} t={t} frost={.84}><Label x={26} y={25} size={features?37:60} color={C.orange}>{features?'Premium plan':'$100 / mo'}</Label><Label x={27} y={108} size={25}>{features?'Unlock model access':'Platform subscription'}</Label></Glass>
  </div>
  <Label x={170} y={821} size={34} color={C.teal} style={{opacity:easeOut(u,4.5,.4)}}>{features?'The same model. A different access route.':'Platform fee → model access'}</Label>
  <div style={{position:'absolute',left:1050,top:756,opacity:easeOut(u,4.5,.4),transform:`scale(${pop(u,4.5)})`}}><Logo name="fal.png" size={73}/></div>
 </Stage>;
};

/** The real result, model logos and a hand-carried request make the causal chain. */
export const ModelStudio:React.FC<{duration:number;slow?:boolean}>=({duration,slow=false})=>{
 const t=clock(),u=t*8/duration,walk=e(u,.1,1.8),send=e(u,2.0,1.3),choose=e(u,3.6,.9),result=e(u,5,.7),save=e(u,6.8,.6);
 const px=340+570*send+190*choose,py=475-145*Math.sin(send*Math.PI)-170*choose;
 return <Stage t={t}>
  <Move t={u}><AppWindow t={t} x={105} y={148} w={730} h={529}>
   <Label x={31} y={126} size={38} color={C.orange}>{typeOn('/fal-video',u,.4,.6)}</Label>
   <div style={{position:'absolute',left:33,top:212}}><CameraIcon size={180} t={t}/></div>
   <svg width="440" height="180" style={{position:'absolute',left:250,top:209}}><path d="M15 93C103 6 224 164 417 46" fill="none" stroke={C.teal} strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(u,.7,1.4)}/><path d="M405 37L420 44L413 59" fill="none" stroke={C.teal} strokeWidth="4"/></svg>
   <Label x={30} y={415} size={30}>{typeOn('Subject · action · camera · style',u,.9,1.1)}</Label>
  </AppWindow></Move>
  <div style={{position:'absolute',left:891,top:218,transform:`scale(${pop(u,1.8)})`}}><Logo name="fal.png" size={108}/></div>
  {['hailuo.png','google.png','seedance.png'].map((l,i)=><div key={l} style={{position:'absolute',left:1080+i*235,top:165+Math.sin(t*2+i)*6,opacity:easeOut(u,.7+i*.15,.3),transform:`translateY(${(1-pop(u,.7+i*.15))*55}px)`}}><Logo name={l} size={84}/><div style={{position:'absolute',left:-10,top:-10,width:104,height:104,borderRadius:23,border:`3px solid ${i===2&&choose>.5?C.orange:'transparent'}`}}/></div>)}
  <div style={{position:'absolute',left:1033,top:346,opacity:result,transform:`scale(${.88+.12*pop(u,5)})`,transformOrigin:'50% 60%'}}><Film w={770} t={t} video/></div>
  <Actor t={t} x={140+160*walk} y={727} size={218} walk={Math.sin(walk*Math.PI)} look={1} lift={e(u,1.65,.4)*(1-e(u,3,.6))} contact={2*duration/8}/>
  <div style={{position:'absolute',left:px,top:py,opacity:easeOut(u,.3,.2)*(1-e(u,4.55,.35)),transform:`rotate(${-8+20*send-12*choose}deg) scale(${1-.5*choose})`}}><SkillFile t={t} size={177} label="request"/></div>
  <Label x={560} y={823} size={33} color={C.teal} style={{opacity:save}}>Generated in the cloud → saved to your project</Label>
  <Actor t={t+.7} x={1230} y={777} size={178} look={-1} lift={result*.6} happy={save>.5}/>
 </Stage>;
};

const route=(p:number)=>({x:190+1480*p,y:530-210*Math.sin(p*Math.PI*2)});
const routePath=Array.from({length:100},(_,i)=>{const p=route(i/99);return `${i?'L':'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`;}).join(' ');
export const RoadmapScene:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*3.35/duration,p=e(u,.15,2.65),trav=route(p);
 return <Stage t={t} map>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
   <path d={routePath} fill="none" stroke="#A5755020" strokeWidth="89" strokeLinecap="round" transform="translate(0,12)"/>
   <path d={routePath} fill="none" stroke="#FFFFFFCD" strokeWidth="70" strokeLinecap="round"/>
   <path d={routePath} fill="none" stroke="#D8C1AA" strokeWidth="3" strokeDasharray="13 16"/>
   <path d={routePath} fill="none" stroke={C.orange} strokeWidth="7" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} strokeLinecap="round"/>
  </svg>
  {[.13,.52,.87].map((v,i)=>{const r=route(v),show=easeOut(u,.08+i*.25,.25);return <div key={v} style={{position:'absolute',left:r.x-85,top:r.y-195,opacity:show,transform:`translateY(${(1-pop(u,.08+i*.25))*60}px)`}}>
   <svg width="170" height="190" viewBox="0 0 170 190"><path d="M85 186C65 156 11 111 11 76a74 74 0 1 1 148 0c0 35-54 80-74 110Z" fill="#FFFFFFDF" stroke="#FFFFFF" strokeWidth="4"/><circle cx="85" cy="78" r="57" fill={['#FBE1B5','#D9E9E2','#E0E2ED'][i]}/></svg>
   <div style={{position:'absolute',left:37,top:33}}>{i===0?<Key t={t} size={92}/>:i===1?<CameraIcon size={100} t={t}/>:<div style={{width:99,height:67,overflow:'hidden',borderRadius:10,marginTop:12}}><Film t={t} w={119} video/></div>}</div>
   <Label x={-55} y={-56} size={34} style={{width:280,textAlign:'center'}}>{['01 · Connect','02 · Create','03 · Compare'][i]}</Label>
  </div>;})}
  <Actor t={t} x={trav.x-97} y={trav.y-123} size={195} walk={Math.sin(p*Math.PI)*.8} look={1} happy={p>.95}/>
 </Stage>;
};

export const DirectScene:React.FC<{duration:number;featuresAt:number}>=({duration,featuresAt})=>{
 const t=clock();
 return t<featuresAt?<ModelStudio duration={featuresAt} slow/>:<Sequence from={Math.round(featuresAt*30)}><AccessGate duration={duration-featuresAt} features/></Sequence>;
};

/** A handoff (guide/download) and a separate ballistic throw/catch (outro).
 * File/palms share endpoints. Contact recoil decays, never freezes at landing. */
export const SkillRelay:React.FC<{duration:number;mode?:'guide'|'download'|'outro'}>=({duration,mode='download'})=>{
 const t=clock(),u=t*8/duration,throwing=mode==='outro';
 const walk=e(u,.55,1.8),reach=e(u,2.05,.5),flight=throwing?clamp((u-2.65)/1.35):e(u,2.65,1.35),carry=e(u,4.3,1.35),insert=e(u,5.9,.85),done=e(u,6.7,.25);
 const sx=190+(throwing?320:600)*walk,rx=1120+170*carry,wind=Math.sin(Math.PI*clamp((u-2.05)/.6));
 const origin={x:sx+180,y:466-35*reach+wind*20};
 let fx=lerp(origin.x,982,flight)+170*carry,fy=lerp(origin.y,454,flight)-(throwing?225:22)*4*flight*(1-flight)+settle(u,4,8);
 fx=lerp(fx,1465,insert);fy=lerp(fy,322,insert);
 const angle=(throwing?360*flight:8*flight)-8+wind*-13;
 return <Stage t={t}>
  <AppWindow x={983} y={129} w={815} h={551} t={t}>
   <div style={{position:'absolute',left:39,top:133,width:726,height:182,borderRadius:23,background:'#FFFFFF9C',boxShadow:'inset 0 2px 7px #8C5A3420'}}>
    <Label x={28} y={27} size={31} color={C.orange} style={{opacity:1-done}}>Drop the skill into Claude</Label>
    <div style={{position:'absolute',left:28,top:24,opacity:done,display:'flex',alignItems:'center',gap:15,fontSize:29}}><span style={{color:C.orange,fontWeight:750}}>.skill</span>fal-video.skill</div>
    <Label x={29} y={105} size={33}>{typeOn('/fal-video',u,6.9,.6)}<span style={{opacity:u>6.9&&Math.sin(t*9)>0?1:0}}>▏</span></Label>
   </div>
  </AppWindow>
  <Label x={1015} y={701} size={18} color="#876C59">Workflow illustration · setup varies by Claude app</Label>
  <div style={{position:'absolute',left:138,top:193}}><Logo name="claude.png" size={66}/><Label x={90} y={13} size={35}>Video description</Label></div>
  <Glass x={158} y={307} w={480} h={126} t={t} frost={.8} style={{opacity:1-e(u,1.2,.6)}}><Label x={25} y={24} size={34}>fal-video.skill</Label><Label x={28} y={78} size={23} color={C.orange}>Download ↓</Label></Glass>
  <Actor t={t} x={sx-wind*20} y={501} size={240} walk={Math.sin(walk*Math.PI)} look={1} lift={reach*(1-e(u,4.2,.8))} reach={1-flight*.7} lean={-wind*9+settle(u,4,3)} contact={4*duration/8} happy={u>6.3}/>
  <Actor t={t+.3} x={rx} y={462} size={240} walk={Math.sin(carry*Math.PI)} look={-1} lift={e(u,3.1,.5)} reach={0} contact={4*duration/8+.3} happy={u>6.7}/>
  <div data-file-relay={mode} style={{position:'absolute',left:fx,top:fy,opacity:1-done,transform:`rotate(${angle}deg) scale(${1-insert*.48})`,transformOrigin:'50% 65%'}}><SkillFile t={t} size={150}/></div>
  <Label x={180} y={824} size={46} color={C.orange} style={{opacity:easeOut(u,4.5,.4)}}>{mode==='guide'?'Follow along with the skill below.':throwing?'Get the skill. Make your first video.':'Download → upload → describe your video'}</Label>
 </Stage>;
};

/** Instruction content unfolds as tangible tools, then resolves into one skill. */
export const SkillScene:React.FC<{duration:number;importAt:number}>=({duration,importAt})=>{
 const t=clock();
 if(t>=importAt)return <Sequence from={Math.round(importAt*30)}><SkillRelay duration={duration-importAt}/></Sequence>;
 const u=t*7/importAt,open=e(u,.3,1.1),step=Math.min(2,Math.floor(Math.max(0,u-1.1)/1.55)),go=e(u,5.6,.85);
 return <Stage t={t}>
  <div style={{position:'absolute',left:225,top:266,transform:`rotate(-6deg) translate(${go*60}px,${go*40}px) scale(${1-go*.35})`,opacity:1-go}}><SkillFile t={t} size={260} open={open*.3}/></div>
  <Actor t={t} x={145} y={645} size={246} look={1} reach={1} lift={open*.75} contact={1.2*importAt/7}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M512 403C692 219 819 307 916 291S1289 324 1480 474" fill="none" stroke="#FFFFFFAE" strokeWidth="23"/><path d="M512 403C692 219 819 307 916 291S1289 324 1480 474" fill="none" stroke={C.orange} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(u,1,4.4)}/></svg>
  {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:650+i*366,top:[307,224,346][i],opacity:easeOut(u,.7+i*.3,.3),transform:`translateY(${Math.sin(t*1.8+i)*7}px) scale(${step===i?1.05:1})`}}>
   <div style={{width:218,height:218,borderRadius:'50%',background:'linear-gradient(130deg,#FFF,#FFFFFF55)',boxShadow:'inset 0 -15px 35px #CAA68B30,0 18px 35px #AC7B4622',border:'2px solid white',display:'grid',placeItems:'center'}}>{i===0?<Logo name={['hailuo.png','google.png','seedance.png'][Math.floor(t*1.3)%3]} size={119}/>:i===1?<CameraIcon t={t} size={154}/>:<div style={{width:175,height:99,overflow:'hidden',borderRadius:14}}><Film t={t} w={175} video/></div>}</div>
   <Label x={-25} y={257} size={29} style={{width:270,textAlign:'center'}}>{['Pick the model','Build the request','Save the result'][i]}</Label>
  </div>)}
  <Label x={529} y={846} size={39} color={C.teal}>Reusable instructions. Not more code.</Label>
  <Actor t={t+.6} x={1210} y={630} size={210} look={-1} lift={go} happy={go>.8}/>
 </Stage>;
};

export const CompareScene:React.FC<{duration:number;revealAt:number}>=({duration,revealAt})=>{
 const t=clock(),r=e(t,revealAt,.55);
 return <Stage t={t}>
  {[0,1].map(i=><div key={i} style={{position:'absolute',left:60+i*915,top:135,transform:`translateY(${(1-pop(t,i*.1))*50}px)`}}><Film w={885} t={t} placeholder={!i} video={!!i} label={i?'B · Right':'A · Left'}/><Aura w={885} h={498} t={t} duration={3}/></div>)}
  <div style={{position:'absolute',left:157,top:732,opacity:r,display:'flex',alignItems:'center',gap:22}}><Logo name="higgsfield.jpg" size={83}/><span style={{fontSize:42,fontWeight:650}}>Higgsfield</span></div>
  <div style={{position:'absolute',left:1051,top:732,opacity:r,display:'flex',alignItems:'center',gap:22}}><Logo name="claude.png" size={83}/><span style={{fontSize:42,fontWeight:650}}>Claude</span></div>
  <Actor t={t} x={540+e(t,revealAt,1.7)*280} y={784} size={197} walk={Math.sin(e(t,revealAt,1.7)*Math.PI)} look={t>revealAt?1:-1} happy={t>revealAt+.7}/>
 </Stage>;
};
