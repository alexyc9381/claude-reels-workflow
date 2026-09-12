import React from 'react';
import {AbsoluteFill,Img,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './cinematic-brand';
import {easeOut,easeInOut} from './glass-motion';
import {C,clamp,lerp,pop,Glass,Logo,Actor,Key,SkillFile,BrandedBackground} from './YouTubeV5Primitives';
import {StudioSet,ModelReel,Conveyor} from './YouTubeV5Set';
const time=()=>useCurrentFrame()/useVideoConfig().fps;
const enter=(t:number,a:number,d=.55)=>easeOut(t,a,d);
const exit=(t:number,a:number,d=.3)=>clamp((t-a)/d)**3;
const metal='linear-gradient(130deg,#FFFDF7 0%,#D7D8D2 17%,#FFFCF4 39%,#B7B8B2 78%,#F4ECDD 100%)';

/** Large real-image displays: the case, glass, image and blinds move on separate clocks. */
export const Display:React.FC<{t:number;w:number;label?:string;placeholder?:boolean;blur?:number;reveal?:number}>=({t,w,label,placeholder=false,blur=0,reveal=1})=><div style={{position:'relative',width:w,height:w*.63,perspective:1600}}>
 <div style={{position:'absolute',left:w*.05,top:w*.12,width:w*.9,height:w*.52,background:'#76583D',filter:'blur(22px)',opacity:.23,transform:'skewX(-5deg)'}}/>
 <div style={{position:'absolute',left:0,top:0,width:w,height:w*.59,background:metal,borderRadius:30,padding:10,boxSizing:'border-box',boxShadow:'inset 0 2px 2px #FFFFFF,0 8px 0 #C4BBAA,0 28px 40px #62463024'}}>
  <div style={{position:'relative',width:'100%',height:'100%',borderRadius:22,overflow:'hidden',background:'#EFEADE',border:'2px solid #A89F9260',boxSizing:'border-box'}}>
   {placeholder?<div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 40% 35%,#FFFDF2,#E7D2B8)',display:'grid',placeItems:'center'}}>
    <svg width={w*.25} height={w*.28} viewBox="0 0 180 180"><path d="M32 12H111L152 53V162H32Z" fill="#FFF9E8" stroke="#C0AA89" strokeWidth="3"/><path d="M111 12V53H152" fill="none" stroke="#C0AA89" strokeWidth="3"/><path d="M69 65L117 94L69 124Z" fill={C.orange}/></svg>
    <div style={{position:'absolute',bottom:22,fontSize:22,fontWeight:600,color:'#796650'}}>Comparison clip to add</div>
   </div>:<div style={{position:'absolute',inset:-16,filter:`blur(${blur}px)`,transform:`scale(${1.04+Math.sin(t*.7)*.012})`}}><Loop durationInFrames={120}><OffthreadVideo muted src={staticFile('v4/claude-result.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>}
   {[0,1].map(i=><div key={i} style={{position:'absolute',top:0,bottom:0,left:i?'50%':0,width:'50.2%',background:'linear-gradient(105deg,#FFFCF2,#DAD3C6)',borderRight:'2px solid #FFFFFF',transform:`translateX(${(i?1:-1)*reveal*103}%)`}}/>)}
   <div style={{position:'absolute',inset:0,background:'linear-gradient(132deg,#FFFFFF38,transparent 35%,transparent 69%,#FFFFFF18)',pointerEvents:'none'}}/>
   {label&&<div style={{position:'absolute',left:22,top:20,width:50,height:50,borderRadius:14,background:'#FFF9EDEB',border:'1px solid #FFFFFF',color:C.orange,fontSize:28,fontWeight:800,display:'grid',placeItems:'center'}}>{label}</div>}
  </div>
 </div>
 <div style={{position:'absolute',left:'39%',top:'96%',width:'22%',height:8,borderRadius:5,background:'#B9B0A0',boxShadow:'0 6px 13px #72583535'}}/>
</div>;

const Room:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}>
 <BrandedBackground t={t}/>
 <StudioSet t={t}/>
 <AbsoluteFill style={{background:'linear-gradient(180deg,#FFFDF57A,transparent 60%,#A56C3018)'}}/>
 <div style={{position:'absolute',left:105,top:900,width:1710,height:190,borderRadius:'50%',background:'radial-gradient(ellipse,#B37B3D22,transparent 70%)',transform:`scaleX(${1+Math.sin(t*.6)*.015})`}}/>
 {children}
</AbsoluteFill>;

const PriceDock:React.FC<{t:number;x:number;value:string;unit:string;name:string;at:number;w:number}>=({t,x,value,unit,name,at,w})=>{
 const p=enter(t,at,.32);return <Glass x={x} y={697} w={w} h={200} t={t} frost={.65} style={{opacity:p,transform:`translateY(${(1-p)*62}px)`,borderRadius:27}}>
  <div style={{position:'absolute',left:28,top:20,fontSize:20,fontWeight:600,letterSpacing:1.1,color:'#79634C',textTransform:'uppercase'}}>{name}</div>
  <div style={{position:'absolute',left:25,top:62,display:'flex',alignItems:'baseline',gap:12,whiteSpace:'nowrap',fontVariantNumeric:'tabular-nums'}}><span style={{fontSize:86,fontWeight:800,lineHeight:1,letterSpacing:-4,color:name==='Monthly plan'?C.orange:C.teal}}>{value}</span><span style={{fontSize:24,fontWeight:500,color:'#695D4F'}}>{unit}</span></div>
 </Glass>;
};

const PaymentScene:React.FC<{t:number;namedAt:number;duration:number}>=({t,namedAt,duration})=>{
 const arrive=enter(t,0,.38),insert=easeInOut(t,.4,.6),feed=easeInOut(t,1.04,1.12),tear=easeInOut(t,2.4,.38),open=easeInOut(t,namedAt,.65),resolve=exit(t,duration-.33,.33);
 return <AbsoluteFill style={{opacity:arrive*(1-resolve),transform:`translateX(${(1-arrive)*180-resolve*180}px)`,fontFamily:bodyFont}}>
  <div style={{position:'absolute',left:201,top:185,width:472,height:538,borderRadius:48,background:metal,boxShadow:'inset 0 3px 4px white,0 18px 0 #C9BCA6,0 30px 44px #78563330',transform:`perspective(1500px) rotateY(${lerp(-13,0,open)}deg)`}}>
   <div style={{position:'absolute',left:26,top:26,right:26,height:345,borderRadius:30,background:'linear-gradient(145deg,#FFFBF0B0,#FFFFFF55)',border:'2px solid #FFFFFF'}}>
    <div style={{position:'absolute',left:35,top:36,display:'flex',alignItems:'center',gap:20}}><Logo name="higgsfield.jpg" size={95}/><span style={{fontSize:35,fontWeight:700,letterSpacing:-1}}>Higgsfield</span></div>
    <div style={{position:'absolute',left:35,top:178,fontSize:25,fontWeight:500,color:'#88715B'}}>Monthly subscription</div>
    <div style={{position:'absolute',left:33,top:221,fontSize:67,fontWeight:800,letterSpacing:-3,color:C.orange}}>$100<span style={{fontSize:24,fontWeight:500,letterSpacing:0}}> / mo</span></div>
   </div>
   <div style={{position:'absolute',left:62,top:415,width:344,height:23,background:'#534B40',borderRadius:11,boxShadow:'0 4px 1px #FFFAEC,inset 0 5px 4px #26251F'}}/>
   <div style={{position:'absolute',left:83,top:423,width:300,height:140,overflow:'hidden'}}><div style={{width:300,height:135,background:'linear-gradient(100deg,#F9F3E3,#DCCBAF)',border:'2px solid #FFF8E7',borderRadius:17,transform:`translateY(${-152+insert*137}px) rotate(${-6+insert*6}deg)`,boxSizing:'border-box'}}><div style={{margin:'23px 27px',width:49,height:35,borderRadius:7,background:'linear-gradient(120deg,#DEC381,#FFF2B8,#BEA366)',border:'1px solid #B89D60'}}/><div style={{marginLeft:28,fontSize:20,letterSpacing:6,color:'#8C7B5F'}}>••••  ••••</div></div></div>
  </div>
  <div style={{position:'absolute',left:758,top:252,width:630,height:392,transform:`perspective(1800px) rotateY(${open*8}deg)`}}>
   <div style={{position:'absolute',inset:0,borderRadius:42,background:metal,boxShadow:'0 15px 0 #BCA98D,0 32px 38px #7858322D'}}/>
   <div style={{position:'absolute',left:35,top:35,width:560,height:115,borderRadius:23,background:'#FFFDF1',border:'2px solid #DDCFB7',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
    {[0,1,2,3,4,5].map(i=><div key={i} style={{width:47,height:50,borderRadius:10,background:feed>i/6?C.orange:'#D6CBB8',boxShadow:'inset 0 3px 4px #FFFFFF40',transform:`translateY(${feed>i/6?Math.sin(t*5-i)*2:0}px)`}}/>)}
   </div>
   <div style={{position:'absolute',left:60,top:207,width:510,height:32,borderRadius:13,background:'#5B5040',boxShadow:'0 5px 0 #FFF9E9'}}/>
   <div style={{position:'absolute',left:85,top:224,width:460,height:420,overflow:'hidden'}}>
    <div style={{width:460,height:328,background:'linear-gradient(90deg,#F6EFD9,#FFFCF0 14%,#FFFCF0 88%,#E5D6B7)',borderRadius:'0 0 12px 12px',boxShadow:'0 15px 22px #7F583A2A',transform:`translateY(${-328+feed*326+tear*40}px) rotate(${tear*-4}deg)`,transformOrigin:'top left',opacity:1-open}}>
     <div style={{padding:'28px 32px',fontSize:20,fontWeight:600,letterSpacing:4,color:'#9B8469'}}>RECURRING PAYMENT</div>
     <div style={{margin:'3px 32px',height:2,background:'#C4B496'}}/>
     <div style={{padding:'30px 32px',fontSize:43,fontWeight:800,color:'#76624C'}}>Every month</div>
     <svg width="340" height="52" style={{marginLeft:32}}>{Array.from({length:39},(_,i)=><rect key={i} x={i*8.5} y="0" width={i%3===0?5:2} height={i%4===0?48:37} fill="#A59375"/>)}</svg>
     <div style={{position:'absolute',left:0,right:0,top:10,borderTop:'3px dashed #B9A688',opacity:tear}}/>
    </div>
   </div>
  </div>
  <div style={{position:'absolute',left:741,top:206,width:714,height:466,opacity:open,transform:`translateY(${(1-open)*200}px) rotate(${(1-open)*7}deg)`}}>
   <Glass x={0} y={0} w={714} h={466} t={t} frost={.55}>
    <svg width="714" height="466" style={{position:'absolute',inset:0}}><path d="M122 212Q155 308 350 292Q550 270 600 190" fill="none" stroke="#7F6745" strokeWidth="18"/><path d="M122 212Q155 308 350 292Q550 270 600 190" fill="none" stroke="#F5DDB2" strokeWidth="7" strokeDasharray="8 15" strokeDashoffset={-t*55}/></svg>
    {['hailuo.png','google.png','seedance.png'].map((n,i)=><div key={n} style={{position:'absolute',left:35+i*224,top:57+(1-enter(t,namedAt+.12+i*.1,.42))*100+Math.sin(t*3+i)*4,transform:`rotate(${(1-enter(t,namedAt+.12+i*.1,.42))*(i-1)*35}deg)`}}><ModelReel t={t-i*.2} size={196} logo={n} color={[C.teal,C.gold,C.orange][i]} speed={i%2?-90:110}/></div>)}
    <div style={{position:'absolute',left:30,top:345}}><Conveyor t={t} width={648}/></div>
    {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:35+((Math.max(0,t-namedAt)*145+i*207)%620),top:315,width:58,height:34,background:[C.teal,C.gold,C.orange][i],border:'3px solid #FFF6DB',borderRadius:8,transform:`rotate(${Math.sin(t*7+i)*7}deg)`}}/>)}
   </Glass>
  </div>
  <div style={{position:'absolute',left:1570,top:480,transform:`rotate(${Math.sin(t*3)*8}deg)`}}><ModelReel t={t} size={95} color={C.teal} speed={180}/></div>
  <Actor t={t} x={1437+open*30} y={502} size={236} role="operator" hop={namedAt+.22} lift={72} action="work"/>
  <div style={{position:'absolute',left:220+easeInOut(t,2.9,3.4)*775,top:790}}>
   <Actor t={t} x={0} y={0} size={222} role="courier" hop={2.9} lift={30} travel={1} action="carry"/>
   <div style={{position:'absolute',left:153,top:25,width:126,height:98,background:'#FFF8DE',border:'3px solid #E2CBA0',borderRadius:8,transform:`rotate(${-10+Math.sin(t*6)*6}deg)`,boxShadow:'0 8px 10px #76532A20'}}><svg width="120" height="90"><path d="M18 22H103M18 36H98M18 50H70M18 69H105" stroke="#B08B58" strokeWidth="4"/></svg></div>
  </div>
  <div style={{position:'absolute',left:485,top:885,width:740,height:21,borderRadius:'50%',background:'#80562A18',filter:'blur(12px)'}}/>
 </AbsoluteFill>;
};

export const HookScene:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,guessAt,whyAt,higgsAt})=>{
 const t=time(),out=exit(t,whyAt-.25,.25),sealed=enter(t,guessAt+.15,.45);
 return <Room t={t}>
  {t<whyAt&&<AbsoluteFill style={{opacity:1-out,transform:`translateX(${-out*1700}px)`}}>
   {[0,1].map(i=>{const p=enter(t,.08+i*.1,.42);return <div key={i} data-hook-display={i?'B':'A'} style={{position:'absolute',left:i?980:80,top:112,transform:`perspective(1800px) translate(${(i?1:-1)*(1-p)*190}px,${(1-p)*75}px) rotateY(${(i?-1:1)*(1-p)*28}deg) scale(${.92+.08*p})`,opacity:p}}><Display t={t} w={860} label={i?'B':'A'} placeholder={!i} blur={0} reveal={enter(t,.38+i*.13,.4)}/><div style={{position:'absolute',right:28,top:20,opacity:sealed,transform:`rotate(${-7+7*sealed}deg) scale(${.7+.3*sealed})`,width:63,height:63,borderRadius:17,border:'2px solid #FFFBF3',background:'#FFF9EDE8',display:'grid',placeItems:'center'}}><svg width="35" height="40" viewBox="0 0 35 40"><path d="M8 18V11a10 10 0 0 1 20 0v7" stroke={C.teal} strokeWidth="3" fill="none"/><rect x="2" y="17" width="31" height="22" rx="7" fill={C.teal}/><circle cx="17.5" cy="27" r="3" fill="#FFF9E9"/></svg></div></div>;})}
   <PriceDock t={t} x={190} w={560} value="$100" unit="/ month" name="Monthly plan" at={1.05}/>
   <PriceDock t={t} x={1010} w={390} value="10¢" unit="/ video" name="One generation" at={2.45}/>
   <div style={{position:'absolute',left:810,top:766,width:119,height:119,borderRadius:'50%',background:'linear-gradient(125deg,#FFE1A1,#DE9E32 42%,#FFF5CF 58%,#C8923E)',border:'5px solid #E4BE70',boxShadow:'inset 0 0 0 7px #F9DA8F,0 13px 18px #784B2333',opacity:enter(t,2.25,.25),transform:`perspective(700px) rotateY(${720*(1-easeOut(t,2.25,.9))}deg) translateY(${Math.sin(t*2)*3}px)`,display:'grid',placeItems:'center',fontSize:51,fontWeight:800,color:'#AD7627'}}>¢</div>
   <Actor t={t} x={100+easeInOut(t,3.6,.8)*115} y={890} size={166} role="archivist" hop={.55} lift={36} action="direct"/>
   <Actor t={t} x={1180-easeInOut(t,3.7,.8)*92} y={886} size={166} role="courier" hop={2.42} lift={50} action="direct"/>
  </AbsoluteFill>}
  {t>=whyAt-.15&&<PaymentScene t={t-whyAt+.15} namedAt={higgsAt-whyAt+.15} duration={duration-whyAt+.15}/>}
 </Room>;
};


const roadPoint=(p:number)=>{
 const u=clamp(p),a=1-u;
 return {x:a*a*a*305+3*a*a*u*640+3*a*u*u*1010+u*u*u*1510,y:a*a*a*699+3*a*a*u*90+3*a*u*u*1070+u*u*u*416};
};
/** A miniature map with an actual continuous road and physical tutorial landmarks. */
export const RoadmapScene:React.FC<{duration:number}>=({duration})=>{
 const t=time(),p=easeInOut(t,.3,duration-.55),pos=roadPoint(p),draw=enter(t,.08,.8);
 return <Room t={t}>
  <div style={{position:'absolute',left:93,top:118,width:1705,height:765,borderRadius:48,background:'linear-gradient(135deg,#F5EFDFC9,#FFFFF1AA)',border:'3px solid #FFFCF0',boxShadow:'0 22px 0 #CDBB9B80,0 42px 44px #76513529',transform:`perspective(2200px) rotateX(${lerp(13,3,p)}deg) rotateZ(${lerp(-2,1,p)}deg)`,transformOrigin:'center',overflow:'hidden'}}>
   <svg width="1705" height="765" viewBox="0 0 1705 765" style={{position:'absolute',inset:0}}>
    <defs><pattern id="v5-map-grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" stroke="#CCBB9D" strokeWidth="1" fill="none"/></pattern></defs>
    <rect width="1705" height="765" fill="url(#v5-map-grid)" opacity=".32"/>
    <path d="M25 530C260 400 480 400 590 580S980 705 1230 614S1510 680 1730 665" fill="none" stroke="#B7D4C440" strokeWidth="20"/>
    <path d="M212 581C547 -28 917 952 1417 298" fill="none" stroke="#BBAE9550" strokeWidth="104" strokeLinecap="round"/>
    <path d="M212 581C547 -28 917 952 1417 298" fill="none" stroke="#FFFDF0" strokeWidth="84" strokeLinecap="round"/>
    <path d="M212 581C547 -28 917 952 1417 298" fill="none" stroke="#DCC8A5" strokeWidth="61" strokeLinecap="round"/>
    <path d="M212 581C547 -28 917 952 1417 298" fill="none" stroke="#FFF9E9" strokeWidth="4" strokeDasharray="17 15"/>
    <path d="M212 581C547 -28 917 952 1417 298" fill="none" stroke={C.orange} strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>
    {[[147,166],[273,221],[993,120],[1144,590],[674,629],[1292,92]].map(([x,y],i)=><g key={i} transform={`translate(${x},${y})`} opacity={draw}><ellipse cy="29" rx="25" ry="9" fill="#7B826825"/><path d="M0 0V36" stroke="#AD946D" strokeWidth="5"/><path d="M-23 7L0 -46L23 7Z" fill={i%2?'#98B8A0':'#B4C7A9'}/><path d="M-18 -10L0 -53L18 -10Z" fill="#C0D0B1"/></g>)}
   </svg>
   <div style={{position:'absolute',left:140,top:390,transform:`translateY(${(1-enter(t,.05,.4))*100}px)`}}><div style={{width:142,height:166,border:'20px solid #D2B98D',borderBottom:0,borderRadius:'65px 65px 0 0',boxShadow:'5px 0 0 #FFF0CE',boxSizing:'border-box'}}/><div style={{position:'absolute',left:18,top:19}}><Key size={109} t={t}/></div><div style={{position:'absolute',top:-58,left:-24,fontSize:28,fontWeight:800,color:C.orange,whiteSpace:'nowrap'}}>01 · Connect</div></div>
   <div style={{position:'absolute',left:715,top:235,transform:`translateY(${(1-enter(t,.15,.4))*100}px)`}}><div style={{width:206,height:193,borderRadius:26,background:metal,border:'3px solid #FFFCF0',boxShadow:'0 11px 0 #BCAD91'}}><div style={{margin:'21px 45px'}}><Logo name="claude.png" size={111}/></div><div style={{margin:'0 auto',width:116,height:12,background:C.orange,borderRadius:8}}/></div><div style={{position:'absolute',top:-52,left:13,fontSize:28,fontWeight:800,color:C.orange,whiteSpace:'nowrap'}}>02 · Create</div></div>
   <div style={{position:'absolute',left:1260,top:160,transform:`translateY(${(1-enter(t,.25,.4))*100}px)`}}><Display t={t} w={270} reveal={draw}/><div style={{position:'absolute',top:-52,left:11,fontSize:28,fontWeight:800,color:C.orange,whiteSpace:'nowrap'}}>03 · Compare</div></div>
  </div>
  <div style={{position:'absolute',left:pos.x-63,top:pos.y-115,transform:`rotate(${lerp(-5,7,p)}deg)`,filter:'drop-shadow(0 8px 5px #6C53252A)'}}><Actor t={t} x={0} y={0} size={126} role="courier" hop={.28} lift={15} travel={1}/></div>
 </Room>;
};
