import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Label,Logo,Lens,C,lerp,BrandedBackground} from './YouTubeV8Primitives';
import {Claude2D} from './Claude';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const settle=(t:number,at:number)=>t<at?0:Math.sin((t-at)*19)*Math.exp(-(t-at)*7);
const Stage:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/><svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="v17-floor" x2="0" y2="1"><stop stopColor="#FFFDF6"/><stop offset="1" stopColor="#EDCBA844"/></linearGradient></defs><ellipse cx="925" cy="856" rx="835" ry="130" fill="url(#v17-floor)" stroke="#FFF8EA" strokeWidth="3"/></svg>{children}</AbsoluteFill>;
const Result:React.FC<{w:number;h?:number}>=({w,h=w*.5625})=><div style={{position:'relative',width:w,height:h,overflow:'hidden',borderRadius:24,border:'4px solid #FFF9EB',boxShadow:'0 20px 35px #392D292A',background:'#1D2824'}}><Loop durationInFrames={120}><OffthreadVideo src={staticFile('v4/claude-result.mp4')} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>;
const Brand:React.FC<{x:number;y:number;name:string;text:string;size?:number}>=({x,y,name,text,size=110})=><At x={x} y={y}><Logo name={name} size={size}/><Label x={size+28} y={size*.22} size={48}>{text}</Label></At>;

/** A recurring bill is a tangible bound invoice, not a generic UI tile. */
const Subscription:React.FC<{t:number;w:number;limited?:number}>=({t,w,limited=0})=><div style={{width:w,height:w*.79,position:'relative',transform:`rotate(${-1.5+limited*1.5}deg)`}}>
 <svg width={w} height={w*.79} viewBox="0 0 650 514"><defs><linearGradient id="v17-paper" x2="1" y2="1"><stop stopColor="#FFFDF6"/><stop offset="1" stopColor="#EAD9B9"/></linearGradient></defs><path d="M28 39H603L627 68V479L602 465L578 481L554 465L530 481L506 465L482 481L458 465L434 481L410 465L386 481L362 465L338 481L314 465L290 481L266 465L242 481L218 465L194 481L170 465L146 481L122 465L98 481L74 465L50 481L28 465Z" fill="url(#v17-paper)" stroke="#FFFFFF" strokeWidth="6"/><path d="M28 40H601L627 68V158H28Z" fill="#BED474"/><path d="M68 172H584" stroke="#D6B58B" strokeWidth="3"/>{[95,552].map(x=><path key={x} d={`M${x} 17V75`} stroke="#607B47" strokeWidth="18" strokeLinecap="round"/>)}<path d="M557 83C587 83 602 96 602 117C602 133 591 144 576 144M576 144L587 132M576 144L590 151" fill="none" stroke="#4A6538" strokeWidth="6"/></svg>
 <div style={{position:'absolute',left:w*.106,top:w*.116,fontSize:w*.058,fontWeight:800}}>Subscription</div>
 <div style={{position:'absolute',left:0,top:w*.295,width:w,textAlign:'center',fontSize:w*.215,fontWeight:850,letterSpacing:-5,opacity:Math.max(0,1-limited*2)}}>$100<span style={{display:'block',fontSize:w*.053,letterSpacing:0}}>/ month · plan example</span></div>
 <div style={{position:'absolute',left:0,top:w*.215,width:w,textAlign:'center',opacity:Math.max(0,(limited-.5)*2)}}><div style={{fontSize:w*.32,fontWeight:750,lineHeight:1.1}}>∞</div><div style={{fontSize:w*.07,fontWeight:800}}>“Unlimited”?</div></div>
</div>;

/** 47.17–58.60: the recorded VO turns from direct model access to advertised
 * unlimited use with limits. The same result requests meet a narrowing gate.
 * Queue size/gate opening are conceptual, not measured Higgsfield quotas. */
export const WrapperV17:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),limited=e(t,4.45,.45),route=e(t,.22,.7),narrow=e(t,5.15,1.1),stop=e(t,9.2,.45);
 const pressure=[7.2,8.25,9.3].reduce((v,at)=>v+Math.sin(e(t,at,.54)*Math.PI),0);
 const gap=lerp(356,77,narrow)+pressure*27,queue=e(t,4.62,.18);
 return <Stage t={t}>
  <Brand x={180} y={103} name="higgsfield.jpg" text="Higgsfield" size={125}/>
  <At x={160} y={282} style={{transform:`translateY(${-9*settle(t,4.9)}px)`}}><Subscription t={t} w={550} limited={limited}/></At>
  <div style={{position:'absolute',inset:0,opacity:1-e(t,4.38,.18)}}>
   <Brand x={895} y={109} name="fal.png" text="Direct model access"/>
   {['seedance.png','google.png','hailuo.png'].map((name,i)=><At key={name} x={815+i*315} y={300-18*settle(t,.6+i*.23)} style={{opacity:easeOut(t,.35+i*.18,.22)}}><div style={{padding:25,borderRadius:36,background:'linear-gradient(120deg,#FFFDF4,#D5E4D9)',border:'4px solid white',boxShadow:'0 22px 32px #3C533523'}}><Logo name={name} size={170}/></div><Label x={i===0?-4:65} y={247} size={34}>{['Seedance 2.5','Veo','Hailuo'][i]}</Label></At>)}
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M666 727C785 727 838 612 967 604H1550" fill="none" stroke="#FFF9ED" strokeWidth="22"/><path d="M666 727C785 727 838 612 967 604H1550" fill="none" stroke={C.teal} strokeWidth="9" pathLength="1" strokeDasharray="1" strokeDashoffset={1-route}/></svg>
  </div>
  <div style={{position:'absolute',inset:0,opacity:queue}}>
   {/* The frames enter quickly, but the gate physically cannot pass them all. */}
   {[2,1,0].map(i=>{const arrive=e(t,4.9+i*.46,.6),press=e(t,7+i*.33,.32);return <At key={i} x={790+i*34+arrive*38+press*7+pressure*19} y={287+i*43} style={{opacity:arrive,transform:`perspective(1500px) rotateY(${-10+arrive*10}deg) translateX(${-125*(1-arrive)}px)`}}><Result w={490} h={277}/></At>;})}
   <At x={1345} y={211}><svg width="395" height="466" viewBox="0 0 395 466"><path d="M32 450V43Q32 20 58 20H343Q366 20 366 43V450" fill="none" stroke="#FDFBF2" strokeWidth="37"/><path d="M31 450V44Q31 20 58 20H343Q366 20 366 44V450" fill="none" stroke="#9EAF97" strokeWidth="8"/>
    <g transform={`translate(0 ${-gap/2})`}><path d="M48 52H350V258H48Z" fill="#D5DBBC" stroke="#FFF9E8" strokeWidth="4"/>{[0,1,2,3,4].map(i=><path key={i} d={`M64 ${80+i*34}H335`} stroke="#A5B494" strokeWidth="5"/>)}</g>
    <g transform={`translate(0 ${gap/2})`}><path d="M48 232H350V434H48Z" fill="#B2C3A5" stroke="#FFF9E8" strokeWidth="4"/>{[0,1,2,3,4].map(i=><path key={i} d={`M64 ${253+i*34}H335`} stroke="#8CA783" strokeWidth="5"/>)}</g>
    <circle cx="367" cy="229" r="17" fill={stop>.5?'#B6432C':'#C17C32'}/>
   </svg></At>
   <Label x={947} y={707} size={45} color={C.orange} style={{opacity:e(t,7.5,.25)}}>Limited access</Label>
  </div>
  <Actor t={t} x={559+route*95} y={704} size={270} role="operator" look={1} walk={Math.sin(route*Math.PI)} lift={narrow*.4+pressure*.4} reach={.8} contact={6.25}/>
  <Label x={167} y={977} size={25} color="#726757">Concept illustration · limits vary by plan</Label>
 </Stage>;
};

/** 58.60–70.80: one Claude-authored red X, then the same budget moves into
 * direct model access. Marker tip and X progress share the same time driver. */
export const DirectRouteV17:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),a=e(t,.38,.46),b=e(t,1.02,.46),clear=e(t,2.6,.5),budget=e(t,3.18,.64),pick=e(t,4.4,.45),submit=e(t,6.2,.48),output=e(t,7.1,.4);
 const penLift=e(t,.84,.18);
 const tip=t<.84?{x:lerp(679,1080,a),y:lerp(343,670,a)}:t<1.02?{x:lerp(1080,1090,penLift),y:lerp(670,338,penLift)-Math.sin(penLift*Math.PI)*35}:{x:lerp(1090,680,b),y:lerp(338,667,b)};
 const ax=tip.x-330,ay=tip.y-160,angle=-42,rad=angle*Math.PI/180,hand={x:ax+(166+26*Math.cos(rad))*1.7,y:ay+(99+26*Math.sin(rad))*1.7};
 return <Stage t={t}>
  <div style={{position:'absolute',inset:0,opacity:1-clear,transform:`translateX(${-650*clear}px)`}}>
   <Brand x={607} y={98} name="higgsfield.jpg" text="Higgsfield" size={127}/>
   <At x={494} y={240}><Subscription t={t} w={850}/></At>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M679 343L1080 670" stroke="#B63D2B" strokeWidth="38" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-a}/><path d="M1090 338L680 667" stroke="#B63D2B" strokeWidth="38" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-b}/></svg>
   <div style={{position:'absolute',left:ax,top:ay,opacity:1-e(t,1.65,.25)}}><Claude2D frame={Math.round(t*30)} size={340} outfit="operator" colorful rightArmAngle={angle} leftArmAngle={-30} face={{leftOpen:1,rightOpen:1,gazeX:4,gazeY:0,happy:0}}/></div>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:1-e(t,1.65,.25)}}><path d={`M${hand.x} ${hand.y}L${tip.x} ${tip.y}`} stroke="#503D2F" strokeWidth="22" strokeLinecap="round"/><circle cx={tip.x} cy={tip.y} r="15" fill="#B63D2B"/></svg>
  </div>
  <div style={{position:'absolute',inset:0,opacity:clear,transform:`translateX(${300*(1-clear)}px)`}}>
   <Brand x={179} y={100} name="claude.png" text="Your workflow"/>
   <Brand x={1075} y={100} name="fal.png" text="Direct to the models"/>
   <At x={165} y={326} style={{opacity:1-output}}><div style={{position:'relative',width:478,height:262,borderRadius:31,background:'linear-gradient(110deg,#4B735D,#1D4E3B)',border:'4px solid #FFF6DF',boxShadow:'0 22px 36px #18452E24'}}><Label x={33} y={28} size={32} color="#F1EAD4">Your budget</Label><Label x={29} y={77} size={118} color="#FFF9EC">$100</Label><svg width="478" height="262" style={{position:'absolute',inset:0}}><rect x="387" y="124" width="57" height="43" rx="8" fill="#DBBD77"/><path d="M387 137H444M405 124V167M425 124V167" stroke="#AB8C54" strokeWidth="2"/></svg></div></At>
   <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M664 509C753 509 769 299 938 299H1662" stroke="#FFF9EB" strokeWidth="25" fill="none"/><path d="M664 509C753 509 769 299 938 299H1662" stroke={C.orange} strokeWidth="9" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-budget}/></svg>
   {['seedance.png','google.png','hailuo.png'].map((name,i)=>{const chosen=i===0?pick:0;return <At key={name} x={886+i*277} y={374-30*chosen} style={{transform:`scale(${1+.17*chosen})`,transformOrigin:'50% 50%',opacity:(.65+.35*e(t,3.6+i*.15,.25))}}><div style={{padding:21,borderRadius:35,background:'#FFFAEC',border:`5px solid ${i===0&&pick>.5?C.orange:'#FFFDF5'}`,boxShadow:'0 17px 30px #3B4B3824'}}><Logo name={name} size={157}/></div><Label x={i===0?-11:47} y={226} size={33} color={i===0?C.orange:C.ink}>{['Seedance 2.5','Veo','Hailuo'][i]}</Label></At>;})}
   <Actor t={t} x={660+budget*75} y={681} size={292} role="courier" look={1} walk={Math.sin(budget*Math.PI)} reach={submit} lift={pick*.7} contact={6.68} happy={output>.9}/>
   <At x={180} y={321} style={{opacity:output,transform:`translateY(${90*(1-output)}px)`}}><Result w={530}/></At>
   <Label x={178} y={896} size={44} color={C.teal} style={{opacity:output}}>Pay per generation</Label>
  </div>
 </Stage>;
};

/** 70.80–79.03: a premium pass visibly controls access to the model tools.
 * Not a claim that the skill bypasses paid services or unlocks every feature. */
export const FeatureGateV17:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),close=e(t,.25,.65),reach=e(t,1.4,.4),tryOpen=e(t,1.9,.45),denied=e(t,2.4,.35),pass=e(t,3.38,.45),insert=e(t,4.3,.65),turn=e(t,5,.4),open=e(t,5.65,.65);
const door=close*(1-open),knock=settle(t,2.4),keyX=lerp(656,682,insert),keyY=lerp(548,419.5,insert)-Math.sin(insert*Math.PI)*45;
 return <Stage t={t}>
  <Brand x={197} y={100} name="higgsfield.jpg" text="Higher-tier access" size={124}/>
  <At x={673} y={263}>
   <div style={{width:1052,height:441,borderRadius:110,background:'linear-gradient(130deg,#DBE7CF,#6B9984)',border:'9px solid #FFF8EA',boxShadow:'inset 0 13px 30px #41634A77,0 27px 37px #4033222A',overflow:'hidden',position:'relative'}}>
    <At x={72} y={102}><Logo name="seedance.png" size={198}/><Label x={-14} y={226} size={30}>Seedance 2.5</Label></At>
    <At x={366} y={89}><Lens t={t} size={235} angle={open*95}/></At>
    <At x={679} y={102}><Result w={285} h={221}/></At>
    {[0,1].map(i=><div key={i} style={{position:'absolute',left:i*526+(i?1:-1)*526*(1-door),top:0,width:526,height:441,background:i?'linear-gradient(90deg,#C5B18D,#F9EBD2)':'linear-gradient(90deg,#FDF9EB,#C5B18D)',borderRight:i?undefined:'5px solid #8B775B',transform:`translateY(${knock*8}px)`,boxSizing:'border-box'}}><svg width="526" height="441"><path d={i?'M75 52H425Q474 52 474 104V338Q474 390 425 390H75Z':'M452 52H100Q52 52 52 104V338Q52 390 100 390H452Z'} fill="none" stroke="#A08A6970" strokeWidth="7"/>{[0,1,2,3].map(j=><circle key={j} cx={i?485:40} cy={91+j*87} r="9" fill="#917B5E" stroke="#FFF2D5" strokeWidth="3"/>)}</svg></div>)}
   </div>
   <At x={427} y={139} style={{opacity:door,transform:`rotate(${turn*90+knock*9}deg)`}}><svg width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="100" fill="#EFE2B9" stroke="#FFFFFF" strokeWidth="8"/><circle cx="110" cy="110" r="72" fill="#566B55" stroke="#9F8C63" strokeWidth="8"/><path d="M73 110H146" stroke="#EADAA9" strokeWidth="17" strokeLinecap="round"/><circle cx="110" cy="110" r="14" fill="#223E30"/></svg></At>
  </At>
  <Actor t={t} x={284+reach*75+insert*45} y={492+tryOpen*12-denied*12} size={340} role="archivist" look={1} reach={reach} lift={pass*.7} contact={2.4} happy={open>.9}/>
  <At x={keyX} y={keyY} style={{opacity:pass*(1-e(t,5.42,.13)),transform:`rotate(${-15+insert*15+turn*90}deg) scale(${1-insert*.56})`,transformOrigin:'528px 92.5px'}}>
   <div style={{width:471,height:175,borderRadius:27,background:'linear-gradient(130deg,#FFF0C4,#D8A748,#F8DA8B)',border:'5px solid #FFF6DC',boxShadow:'0 14px 22px #7C57262D',position:'relative'}}><svg width="90" height="90" style={{position:'absolute',left:24,top:24}}><path d="M10 26L29 44L44 12L60 44L79 26L71 69H18Z" fill="#846020" stroke="#FFF1C7" strokeWidth="4"/></svg><Label x={135} y={54} size={38}>Premium plan</Label><svg width="85" height="175" style={{position:'absolute',right:-66,top:0}}><path d="M0 57H66V77H48V96H66V118H0Z" fill="#DCB860" stroke="#FFF5D6" strokeWidth="4"/></svg></div>
  </At>
  <Label x={191} y={948} size={26} color="#726757">Concept illustration · features vary by plan</Label>
 </Stage>;
};
