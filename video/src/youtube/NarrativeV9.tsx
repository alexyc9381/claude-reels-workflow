import React from 'react';
import {BonusPackV10} from './StoryScenesV10';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,World,Glass,Label,Logo,SkillFile,Key,CameraIcon,Lens,C,clamp,lerp,visible,typeOn} from './YouTubeV8Primitives';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;

/** A real scene miniature, not a generic progress icon. Buildings, actor,
 * camera and viewing cone share the same shot clock. No unrelated footage. */
export const ShotStage:React.FC<{t:number;w?:number;mode?:'orbit'|'chase'|'jump';progress:number}>=({t,w=650,mode='orbit',progress:p})=>{
 const x=mode==='orbit'?300:100+p*400,arc=mode==='jump'?Math.sin(p*Math.PI)*100:0;
 const cx=mode==='orbit'?315+Math.cos(p*Math.PI*1.6)*220:55+p*405;
 const cy=mode==='orbit'?185+Math.sin(p*Math.PI*1.6)*56:220;
 return <div style={{position:'relative',width:w,height:w*.49,overflow:'hidden',borderRadius:21,background:'linear-gradient(155deg,#F7E5CD,#E2ECE5 60%,#C9D9D8)'}}><div style={{width:650,height:320,transform:`scale(${w/650})`,transformOrigin:'top left'}}>
  <svg width="650" height="320" style={{position:'absolute'}}>
   <defs><linearGradient id={'city-'+mode} x2="0" y2="1"><stop stopColor="#708F98"/><stop offset="1" stopColor="#D3DFD8"/></linearGradient></defs>
   <circle cx="507" cy="58" r="28" fill="#FFFFFFA0"/>
   {[0,1,2,3,4,5,6].map(i=><g key={i} transform={`translate(${i*103-18-p*(mode==='chase'?32:0)},${58+(i%3)*19})`}><path d={`M0 175V${i%2?17:42}L29 ${i%2?0:25}H75V175Z`} fill={'url(#city-'+mode+')'} stroke="#FFFFFF99" strokeWidth="2"/>{[0,1,2].map(j=><g key={j}>{[0,1,2].map(k=><path key={k} d={`M${13+k*20} ${61+j*29}v12`} stroke={j===Math.floor(p*3)?'#F8D489':'#FFFFFF60'} strokeWidth="5"/>)}</g>)}</g>)}
   <path d="M0 233H650V320H0Z" fill="#C1CCC5"/><path d="M0 235H650M0 276H650" stroke="#FFF9E8" strokeWidth="4"/>
   {mode==='jump'?<><path d="M0 225H207V320H0ZM438 225H650V320H438Z" fill="#648089"/><path d="M207 225V320M438 225V320" stroke="#FFF" strokeWidth="4"/></>:<ellipse cx="325" cy="220" rx="225" ry="55" fill="none" stroke="#267D7866" strokeWidth="3" strokeDasharray="8 8"/>}
   <path d={`M${cx} ${cy}L${x-20} ${130-arc}L${x+85} ${238-arc}Z`} fill="#E8AD3824" stroke="#B8501F66" strokeWidth="2"/>
   {mode==='chase'&&[0,1].map(i=><g key={i} transform={`translate(${490-p*320+i*91},55)`}><path d="M-23 0H23M0-7V9" stroke={C.teal} strokeWidth="4"/><ellipse rx={17+Math.sin(t*28+i)*5} ry="3" fill={C.blue}/></g>)}
  </svg>
  <Actor t={t} x={x-37} y={141-arc} size={100} role={mode==='orbit'?'archivist':'courier'} walk={mode==='chase'?.75:Math.sin(p*Math.PI)} lift={mode==='jump'?Math.sin(p*Math.PI):.15} look={1} contact={3.2}/>
  <At x={cx-27} y={cy-17} style={{transform:`rotate(${mode==='orbit'?-18+p*40:-7}deg)`}}><CameraIcon t={t} size={76}/></At>
  <svg width="650" height="320" style={{position:'absolute'}}><path d={`M${cx+4} ${cy+57}L${cx-18} ${cy+81}M${cx+4} ${cy+57}L${cx+28} ${cy+81}`} stroke={C.blue} strokeWidth="4"/><path d="M23 21H48M23 21V46M627 21H602M627 21V46M23 298H48M23 298V273M627 298H602M627 298V273" fill="none" stroke="#FFF" strokeWidth="3"/></svg>
 </div></div>;
};

/** A different physical job from the closing throw: an accordion field guide
 * opens, its tools perform a shot, and the completed instructions are packed. */
export const GuideSequence:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,open=e(u,.02,.17),deploy=e(u,.17,.2),shot=e(u,.35,.36),pack=e(u,.75,.17),carry=e(u,.88,.1);
 const ax=190+deploy*85+carry*100,fx=lerp(704,1450,pack),fy=lerp(598,582,pack)-Math.sin(pack*Math.PI)*105;
 return <World t={t} setting="archive">
  <Glass x={408} y={178} w={1125} h={501} t={t} frost={.35} style={{transform:`perspective(1800px) rotateX(${(1-open)*24}deg) scale(${.92+.08*open})`}}>
   <At x={26} y={26} style={{transform:`translateX(${(1-open)*90}px)`}}><ShotStage t={t} w={737} progress={shot}/></At>
   <At x={817} y={45} style={{transform:`rotate(${(1-deploy)*-20}deg)`}}><Lens t={t} size={169} angle={shot*220}/></At>
   <At x={804} y={265}><Logo name="fal.png" size={88}/><Logo name="claude.png" size={88}/></At>
   <Label x={190} y={421} size={35} color={C.teal}>{u<.72?'A repeatable workflow':'Packed into one skill file'}</Label>
  </Glass>
  <Actor t={t} x={ax} y={503} size={262} role="operator" look={1} walk={Math.sin(deploy*Math.PI)} reach={deploy} lift={open*.6} contact={duration*.37}/>
  <Actor t={t+.15} x={1517-95*pack} y={475} size={236} role="courier" look={-1} reach={pack} lift={pack*.8} contact={duration*.91} happy={pack>.9}/>
  {[0,1,2].map(i=>{const q=e(u,.23+i*.055,.14),back=e(u,.69+i*.035,.18);return <At key={i} x={lerp(lerp(650+i*198,660+i*248,q),1510,back)} y={lerp(727,545,back)-Math.sin(q*Math.PI)*74} style={{opacity:open*(1-back),transform:`scale(${1-back*.45}) rotate(${(1-q)*-16+back*25}deg)`}}>{i===0?<Key size={112} t={t}/>:i===1?<CameraIcon size={122} t={t}/>:<Logo name="fal.png" size={105}/>}</At>;})}
  <At x={fx} y={fy} style={{opacity:pack,transform:`rotate(${-10+pack*10}deg)`}}><SkillFile t={t} size={161}/></At>
  <Label x={507} y={929} size={44} color={C.orange}>Get the skill in the description</Label>
 </World>;
};

/** Instruction kit → directed shot → installed skill. The middle beat is a
 * miniature set so the audience sees what 'instructions' actually control. */
export const SkillSequence:React.FC<{duration:number;importAt:number}>=({duration,importAt})=>{
 const t=clock(),u=t/duration,unfold=e(u,.02,.12),select=e(u,.16,.17),direct=e(u,.33,.23),pack=e(u,.59,.13),install=e(u,.74,.16),ready=e(u,.91,.06);
 const fx=lerp(265,1388,install),fy=lerp(481,410,install)-Math.sin(install*Math.PI)*147;
 return <World t={t} setting="studio">
  <Glass x={134} y={148} w={574} h={491} t={t} frost={.48}><At x={28} y={29}><Logo name="fal.png" size={72}/><Label x={110} y={16} size={36}>Instruction kit</Label></At>
   {['hailuo.png','google.png','seedance.png'].map((l,i)=><At key={l} x={38+i*174} y={157-32*e(u,.12+i*.05,.1)*(1-pack)} style={{transform:`scale(${i===1?1+.16*select:1-.08*select})`,opacity:1-pack*.8}}><Logo name={l} size={105}/><div style={{marginTop:16,width:105,height:5,borderRadius:5,background:i===1?C.orange:'#267D7825'}}/></At>)}
   <At x={31} y={329} style={{opacity:1-pack}}><Key size={100} t={t}/><Label x={138} y={21} size={31}>Private connection</Label></At>
  </Glass>
  <Glass x={829} y={150} w={947} h={490} t={t} frost={.4}><At x={25} y={25}><ShotStage t={t} w={894} mode="chase" progress={direct}/></At></Glass>
  <Actor t={t} x={692+40*select} y={594} size={232} role="operator" look={1} reach={.45+direct*.5} walk={Math.sin(select*Math.PI)} contact={duration*.33}/>
  <Actor t={t+.3} x={125+install*148} y={678} size={242} role="archivist" look={1} lift={unfold*.7} reach={pack} happy={install>.85}/>
  {[0,1,2].map(i=>{const q=e(u,.57+i*.04,.15);return <At key={i} x={lerp(425+i*310,324,q)} y={lerp(711,522,q)-Math.sin(q*Math.PI)*100} style={{opacity:unfold*(1-q),transform:`scale(${1-q*.5}) rotate(${q*25}deg)`}}>{i===0?<Logo name="fal.png" size={98}/>:i===1?<CameraIcon t={t} size={116}/>:<Lens t={t} size={107} angle={direct*160}/>}</At>;})}
  <Glass x={1015} y={291} w={694} h={367} t={t} frost={.75} style={{opacity:e(u,.71,.08),transform:`translateY(${(1-e(u,.71,.08))*100}px)`}}><At x={28} y={24}><Logo name="claude.png" size={64}/><Label x={92} y={14} size={36}>Claude</Label></At><Label x={31} y={198} size={41} color={C.orange}>{typeOn('/fal-video',u,.9,.07)}</Label></Glass>
  <At x={fx} y={fy} style={{opacity:pack*(1-ready),transform:`rotate(${-8+install*8}deg) scale(${1-install*.43})`}}><SkillFile t={t} size={190} open={unfold*(1-pack)*.4}/></At>
  <Actor t={t+.2} x={1510} y={500} size={201} role="courier" look={-1} lift={install*.6} reach={install} contact={duration*.9} happy={ready>.5}/>
  <Label x={315} y={938} size={36} color={C.teal}>{u<.72?'Model choice → camera direction → reusable skill':'Download the file, then upload it into Claude.'}</Label>
 </World>;
};

/** Credential creation remains an explicitly labelled illustration: it never
 * invents a secret or claims a particular unshown configuration location. */
export const CredentialSequence:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,create=e(u,.19,.16),copy=e(u,.47,.16),put=e(u,.71,.16),lock=e(u,.87,.1);
 return <AbsoluteFill style={{opacity:visible(t,duration)}}><Glass x={357} y={172} w={998} h={517} t={t} frost={.82}>
  <At x={28} y={25}><Logo name="fal.png" size={61}/><Label x={87} y={12} size={39}>{u<.45?'Create a private API key':u<.72?'Copy the credential':'Store it securely'}</Label></At>
  <svg width="900" height="240" style={{position:'absolute',left:40,top:124}}><path d="M0 30H307V220H0Z" fill="#E0EBE2" stroke="#FFF" strokeWidth="3"/><path d="M0 30L29 1H280L307 30" fill="#FFF8E9"/><path d="M25 193H285" stroke={C.teal} strokeWidth="4"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M${30+i*44} 59v${36+create*83}`} stroke={i%2?C.orange:C.teal} strokeWidth="7" opacity={create}/>)}<path d="M510 224V50Q510 28 533 28H837Q860 28 860 50V224Z" fill="#DAE4DC" stroke="#FFF" strokeWidth="4"/><path d={`M574 127V${94-24*(1-lock)}a48 48 0 0 1 96 0V127`} stroke={C.teal} strokeWidth="10" fill="none"/><rect x="553" y="125" width="142" height="93" rx="18" fill={C.teal}/><circle cx="623" cy="165" r="10" fill="#FFF"/></svg>
  <At x={119+copy*369+put*171} y={240-72*Math.sin(copy*Math.PI)-put*29} style={{opacity:create*(1-lock),transform:`rotate(${-18+copy*30}deg) scale(${1-put*.3})`}}><Key t={t} size={142}/></At>
  <Actor t={t} x={341+put*55} y={234} size={194} role="operator" look={1} reach={copy} lift={put*.75} contact={duration*.88} happy={lock>.9}/>
  <Label x={35} y={451} size={24} color={C.teal}>Illustration · private values hidden</Label>
  <Label x={623} y={397} size={33} color={C.orange} style={{opacity:lock}}>Keep it private</Label>
 </Glass></AbsoluteFill>;
};

export const ComingUp:React.FC<{duration:number}>=({duration})=>{
 const t=clock();return <AbsoluteFill style={{opacity:visible(t,duration)}}><BonusPackV10 t={t} compact/></AbsoluteFill>;
};
