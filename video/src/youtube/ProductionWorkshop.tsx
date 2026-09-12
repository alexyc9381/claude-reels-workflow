import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont} from './cinematic-brand';
import {easeInOut,naturalHop} from './glass-motion';
import {C,clamp,lerp,pop,Glass,Logo,Actor,SkillFile} from './YouTubeV5Primitives';
import {StudioSet,Conveyor,ModelReel} from './YouTubeV5Set';

/** No Code Alex dispatch grammar: a courier hands off one tangible skill,
 * the operator loads the model, and the archivist receives a playing film. */
export const ProductionWorkshop:React.FC<{duration:number}>=({duration})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,u=t*8.66/duration;
 const arrive=easeInOut(u,0,.4),carry=easeInOut(u,.25,1),throwFile=easeInOut(u,1.25,.7),press=easeInOut(u,2.05,.22),load=easeInOut(u,2.38,.6),reveal=easeInOut(u,3.2,.75),finish=easeInOut(u,6.7,.6);
 const run=(1-easeInOut(u,6.1,.5))*easeInOut(u,2.3,.35);
 const courierX=145+carry*255+easeInOut(u,2.25,1.1)*155;
 const fileX=lerp(courierX+137,856,throwFile),fileY=720-throwFile*349-Math.sin(throwFile*Math.PI)*180;
 return <AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}>
  <StudioSet t={t}/>
  <AbsoluteFill style={{transform:`translateY(${(1-arrive)*65}px)`,opacity:arrive}}>
   {/* One workbench unifies the set and gives all characters a floor. */}
   <div style={{position:'absolute',left:103,top:896,width:1265,height:52,background:'linear-gradient(#FFF3D7,#CAA275)',borderRadius:'50%',boxShadow:'0 24px 30px #88572528'}}/>
   <Glass x={139} y={188} w={432} h={438} t={t} frost={.8}>
    <div style={{position:'absolute',left:31,top:31,display:'flex',gap:8}}>{[C.orange,C.gold,C.teal].map(c=><span key={c} style={{width:12,height:12,borderRadius:8,background:c}}/>)}</div>
    <div style={{position:'absolute',left:44,top:90}}><Logo name="claude.png" size={109}/></div>
    <div style={{position:'absolute',left:175,top:124,fontSize:38,fontWeight:800}}>Claude</div>
    <div style={{position:'absolute',left:30,top:254,width:370,height:130,background:'#FFFCED',border:'2px solid #DCC4A1',borderRadius:24,boxShadow:'inset 0 4px 9px #A46C2B15'}}>
     <span style={{position:'absolute',left:25,top:22,fontSize:31,fontWeight:700,color:C.orange}}>{'/fal-video'.slice(0,Math.ceil(clamp(u/.75)*10))}<span style={{opacity:u<1&&Math.sin(u*18)>0?1:0}}>▏</span></span>
     <div style={{position:'absolute',left:25,top:79,display:'flex',gap:9}}>{['hailuo.png','google.png','seedance.png'].map((n,i)=><div key={n} style={{opacity:easeInOut(u,.6+i*.12,.25),transform:`translateY(${(1-pop(u,.6+i*.12))*20}px)`}}><Logo name={n} size={27}/></div>)}</div>
     <div style={{position:'absolute',right:17,top:49,width:62,height:62,borderRadius:18,background:C.orange,display:'grid',placeItems:'center',color:'#FFF7E2',fontSize:40,transform:`scale(${1-.18*Math.sin(press*Math.PI)})`}}>↑</div>
    </div>
   </Glass>
   {/* Cast-controlled load station. The shell, reel and lens are separate rigs. */}
   <div style={{position:'absolute',left:742,top:282,width:740,height:352,transform:`rotate(${Math.sin(u*21)*run*.65}deg)`}}>
    <div style={{position:'absolute',left:40,top:43,width:610,height:298,borderRadius:41,background:'linear-gradient(125deg,#FFF8E8,#E6C693 58%,#C7975D)',border:'4px solid #FFF4DA',boxShadow:'0 17px 0 #AE8050,0 30px 28px #7C4D282E'}}/>
    <div style={{position:'absolute',left:616,top:111,width:94,height:151,borderRadius:13,background:'repeating-linear-gradient(90deg,#CDAD7C 0px,#FBE9C7 5px,#D8B989 11px)',border:'3px solid #FFF1CD'}}/>
    <div style={{position:'absolute',left:679,top:96,width:61,height:180,borderRadius:'50%',background:'radial-gradient(ellipse,#B3DCC9,#2E8174 52%,#123D3C 63%,#D7BE92 67%,#FFF4D7 74%,#BC955C 77%)',transform:`scaleY(${1+Math.sin(u*5)*run*.06})`}}/>
    <div style={{position:'absolute',left:112,top:81,width:458,height:139,borderRadius:22,background:'#FFFAEABC',border:'2px solid #FFFDF1'}}>
     <div style={{position:'absolute',left:31,top:28}}><Logo name="fal.png" size={79}/></div>
     <div style={{position:'absolute',left:150,top:30,fontSize:31,fontWeight:800,color:C.teal}}>fal.ai</div>
     <div style={{position:'absolute',left:153,top:84,display:'flex',gap:9}}>{[0,1,2,3,4,5,6].map(i=><span key={i} style={{width:22,height:10,borderRadius:5,background:run>.1?C.teal:C.gold,opacity:.4+.6*Math.sin(u*6-i*.8)**2}}/>)}</div>
    </div>
    <div style={{position:'absolute',left:119,top:256,width:426,height:17,borderRadius:10,background:'#69513D',boxShadow:'0 4px 1px #FFF5DA'}}/>
    <div style={{position:'absolute',left:99,top:-119,transform:`translateY(${(1-load)*-65}px) rotate(${(1-load)*-20}deg)`,opacity:easeInOut(u,.35,.4)}}><ModelReel t={u*run} size={225} logo="hailuo.png" color={C.teal} speed={120}/></div>
    <div style={{position:'absolute',left:353,top:-104,transform:`rotate(${(1-arrive)*90}deg)`}}><ModelReel t={u*run} size={197} logo="seedance.png" color={C.orange} speed={-135}/></div>
    <div style={{position:'absolute',left:562,top:270,transform:`rotate(${u*100*run}deg)`}}><svg width="72" height="72"><circle cx="35" cy="35" r="28" stroke={C.teal} strokeWidth="7" fill="#EBD0A0"/><path d="M35 8V60M9 35H60" stroke={C.teal} strokeWidth="5"/><circle cx="35" cy="9" r="9" fill={C.orange}/></svg></div>
   </div>
   {/* Delivery lane stays below the narrative objects, never over Alex. */}
   <div style={{position:'absolute',left:612,top:851}}><Conveyor t={u} width={737}/></div>
   <div style={{position:'absolute',left:629,top:680,width:742,height:163,overflow:'hidden',opacity:1-finish,clipPath:`inset(0 ${(1-reveal)*100}% 0 0)`}}>
    {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:((u-3.2)*145+i*212)%850-106,top:15,transform:`rotate(${Math.sin(u*2+i)*4}deg)`,width:197,height:128,background:'#2D655E',border:'6px solid #FFEFCA',borderRadius:13,boxShadow:'0 10px 14px #71502B25',overflow:'hidden'}}><Loop durationInFrames={120}><OffthreadVideo muted src={staticFile('v4/claude-result.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>)}
   </div>
   {/* Main output opens into a large, actively playing hero; secondary film
       pieces stay low on the conveyor while the viewer looks at this screen. */}
   <div style={{position:'absolute',left:150,top:180,width:650,height:430,transform:`translateY(${(1-reveal)*115}px) rotateY(${(1-reveal)*30}deg) scale(${.85+.15*reveal})`,clipPath:`inset(0 ${(1-reveal)*100}% -60px 0 round 32px)`,borderRadius:32,background:'linear-gradient(125deg,#FFF9E9,#DDBB85)',padding:12,boxSizing:'border-box',boxShadow:'0 14px 0 #BE9763,0 28px 30px #724E3329'}}>
    <div style={{position:'absolute',inset:12,borderRadius:23,overflow:'hidden'}}><Loop durationInFrames={120}><OffthreadVideo muted src={staticFile('v4/claude-result.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop></div>
   </div>
   <Actor t={u} x={courierX} y={710} size={234} role="courier" hop={1.25} lift={94} travel={1-easeInOut(u,3.2,.5)} action={u<3?'carry':'celebrate'}/>
   <div style={{position:'absolute',left:fileX,top:fileY,transform:`rotate(${-16+throwFile*34+Math.sin(u*5)*(1-throwFile)*5}deg) scale(${.65-.23*load})`,transformOrigin:'top left',opacity:1-easeInOut(u,2.14,.22)}}><SkillFile t={t} size={190} open={Math.sin(throwFile*Math.PI)*.7}/></div>
   <Actor t={u} x={1465-easeInOut(u,1.6,.7)*62} y={472} size={227} role="operator" hop={2.18} lift={68} action="work"/>
   <Actor t={u} x={1145-easeInOut(u,6.1,.7)*72} y={676} size={215} role="archivist" hop={5.45} lift={70} action={u>6.4?'celebrate':'carry'}/>
   <div style={{position:'absolute',left:1040,top:831,width:250,height:127,opacity:finish,transform:`translateY(${(1-finish)*70}px) rotate(${Math.sin(u*2)*1.4}deg)`}}><svg width="250" height="127"><path d="M5 28V10H87L118 28H244V121H5Z" fill="#D7B079" stroke="#FFF2CE" strokeWidth="4"/><path d="M5 49H244L226 121H21Z" fill="#F0D49F" stroke="#FFFADE" strokeWidth="4"/></svg><div style={{position:'absolute',left:29,top:71,fontSize:24,fontWeight:800,color:'#795631'}}>Saved locally</div></div>
   {/* The operator's cursor lands on the same send-button press clock. */}
   <svg width="42" height="58" style={{position:'absolute',left:lerp(601,477,easeInOut(u,1.65,.4)),top:lerp(635,526,easeInOut(u,1.65,.4)),opacity:1-easeInOut(u,2.6,.2),transform:`scale(${1-.16*Math.sin(press*Math.PI)})`}}><path d="M5 3V47L15 36L24 54L33 49L23 31L38 30Z" fill="#FFFBEF" stroke={C.orange} strokeWidth="3"/></svg>
  </AbsoluteFill>
 </AbsoluteFill>;
};
