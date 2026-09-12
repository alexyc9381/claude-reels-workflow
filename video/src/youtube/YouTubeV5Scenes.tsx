import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './cinematic-brand';
import {easeOut,easeInOut,naturalHop} from './glass-motion';
import {SpriteActor} from './WhiteGlass';
import {facePresets,hopFace} from './face-motion';
import {DispatchStamp,FilingIntake,FilingBookmark} from './DispatchProps';
import {C,clamp,lerp,pop,Glass,Logo,Title,Actor,Key,SkillFile,Film,Stage,visible} from './YouTubeV5Primitives';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;


/** Persistent file identity: download tray -> carried file -> imported Claude instructions. */
export const DownloadScene:React.FC<{duration:number;outro?:boolean}>=({duration,outro=false})=>{
 const t=clock(),u=t*(outro?7.9:4.2)/duration,p=easeInOut(u,outro?3.8:1.7,outro?1.25:1.15),drop=easeOut(u,.5,.55),done=easeOut(u,outro?5.15:2.95,.45);
 return <Stage t={t}>
  <Title x={150} y={100} size={outro?82:75}>{outro?'The skill is in the description.':'Download it. Drop it into Claude.'}</Title>
  <Glass x={150} y={290} w={495} h={405} t={t} frost={.64}>
   <div style={{position:'absolute',left:36,top:30,fontSize:31,color:C.orange,fontWeight:600}}>Video description</div>
   <div style={{position:'absolute',left:36,top:103,width:421,height:152,borderRadius:20,border:'2px solid '+(u>.75?C.orange:'#FFF9ED'),background:'#FFF9EC',boxShadow:'0 8px 12px #79502619',transform:`scale(${1-.025*Math.sin(clamp((u-.7)/.3)*Math.PI)})`}}>
    <div style={{padding:'22px 24px',fontFamily:displayFont,fontSize:40}}>fal-video.skill</div><div style={{marginLeft:24,fontSize:27,color:C.teal}}>Download ↓</div>
   </div>
   <div style={{position:'absolute',left:48,top:269,width:394,height:5,borderRadius:4,background:'#DDCEB4',opacity:1-done}}><div style={{height:5,width:394*easeOut(u,.85,1),background:C.orange,borderRadius:4}}/></div>
   <div style={{position:'absolute',left:54,right:54,top:300,height:53,border:'6px solid '+C.teal,borderTop:0,borderRadius:'0 0 17px 17px'}}/>
  </Glass>
  <div style={{position:'absolute',left:630-easeInOut(u,.12,.6)*245,top:731-easeInOut(u,.12,.6)*228,opacity:1-easeOut(u,1.2,.22),filter:'drop-shadow(0 7px 5px #6D4B3533)',transform:`scale(${1-.2*Math.sin(clamp((u-.74)/.25)*Math.PI)})`}}><svg width="68" height="78" viewBox="0 0 68 78"><path d="M6 3L56 44L35 48L27 69Z" fill="#FFF8E7" stroke={C.orange} strokeWidth="4" strokeLinejoin="round"/></svg></div>
  <Glass x={1035} y={267} w={670} h={430} t={t} frost={.58}>
   <div style={{position:'absolute',left:37,top:28,display:'flex',gap:20,alignItems:'center'}}><Logo name="claude.png" size={85}/><span style={{fontFamily:displayFont,fontSize:49}}>Claude</span></div>
   <div style={{position:'absolute',left:55,top:152,width:555,height:214,borderRadius:25,border:'3px dashed '+C.teal+'80',background:done?'#DFEEE3':'#FFF9E940',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:13}}>
    <div style={{fontFamily:displayFont,fontSize:49,color:C.teal,opacity:done}}>Skill added</div>
    <div style={{fontSize:29,opacity:done}}>/fal-video</div>
   </div>
   <div style={{position:'absolute',left:26,top:84,transform:'scale(1.25)',transformOrigin:'top left'}}><FilingIntake t={5.95+done*2.2}/></div>
  </Glass>
  <div style={{position:'absolute',left:285+970*p,top:365+drop*32-Math.sin(p*Math.PI)*180,opacity:1-easeOut(u,outro?5.3:3.18,.24),transform:`rotate(${-8+16*p}deg) scale(${.8+.2*Math.sin(p*Math.PI)})`,transformOrigin:'50% 100%'}}><SkillFile t={t} size={190}/>{outro&&<DispatchStamp t={u*.78}/>}</div>
  <Actor t={t} x={460+675*p} y={620} size={220} hop={outro?3.8:1.7} travel={p>0&&p<1?1:0}/>
  <Actor t={t} x={1440} y={555} size={200} role="archivist" hop={outro?5.2:3} happy={done>.7}/>
  <div style={{position:'absolute',left:205,top:865,width:1115,opacity:outro?easeOut(u,.4,.4):done,display:'flex',alignItems:'center',gap:26,color:C.orange}}>
   <svg width="65" height="72" viewBox="0 0 65 72" style={{transform:`translateY(${Math.sin(t*3)*6}px)`}}><path d="M32 3V58M8 35L32 62L57 35" stroke={C.orange} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
   <div style={{fontFamily:displayFont,fontSize:outro?58:45}}>{outro?'Download below. Get set up.':'Ready for your first prompt.'}</div>
  </div>
 </Stage>;
};

export const SkillScene:React.FC<{duration:number;importAt:number}>=({duration,importAt})=>{
 const t=clock(),give=easeInOut(t,.7,2),expand=easeInOut(t,.18,.55),noCode=easeOut(t,4.75,.38);
 if(t>=importAt)return <Sequence from={Math.round(importAt*30)}><DownloadScene duration={duration-importAt}/></Sequence>;
 return <Stage t={t}>
  <Title x={150} y={102} size={82}>A skill gives Claude new instructions.</Title>
  <div style={{position:'absolute',left:240,top:350,transform:`rotate(${-7+5*give}deg) scale(${pop(t,.15)})`}}><SkillFile t={t} size={300} open={expand}/></div>
  {[['Model',C.blue],['Camera',C.orange],['Save',C.teal]].map(([label,color],i)=>{const p=easeInOut(t,1.05+i*.35,1.1);return <div key={label} style={{position:'absolute',left:560+600*p,top:400+i*85-Math.sin(p*Math.PI)*(95+i*25),width:220,height:71,borderRadius:20,background:color,color:'#FFF7E8',fontSize:32,fontWeight:600,display:'grid',placeItems:'center',boxShadow:'0 16px 20px '+color+'33',transform:`rotate(${(1-p)*-9}deg) scale(${1-easeOut(t,2.22+i*.35,.24)})`}}>{label}</div>;})}
  <Glass x={1060} y={305} w={625} h={391} t={t} frost={.5}>
   <div style={{position:'absolute',left:238,top:40,transform:`scale(${1+.07*Math.sin(t*6)*Math.exp(-Math.max(0,t-2.4))})`}}><Logo name="claude.png" size={140}/></div>
   {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:49+i*178,top:220,opacity:easeOut(t,2.1+i*.3,.4),transform:`translateY(${(1-pop(t,2.1+i*.3))*45}px) rotate(${Math.sin(t*1.2+i)*2}deg)`}}>
    {i===0?<Logo name="hailuo.png" size={98}/>:i===1?<svg width="110" height="98" viewBox="0 0 110 98"><rect x="5" y="19" width="88" height="66" rx="15" fill="#D8B883" stroke="#FFF1D0" strokeWidth="3"/><path d="M91 36L109 24V76L91 64Z" fill={C.teal}/><circle cx="47" cy="51" r="23" fill={C.teal}/><circle cx="47" cy="51" r="13" fill="#A9D5CF"/><circle cx="43" cy="46" r="5" fill="#FFFDF0"/><path d="M22 17V9H63V17" fill="none" stroke="#D8B883" strokeWidth="9"/></svg>:<Film w={125} t={t} revealed/>}
    <div style={{marginTop:11,fontSize:23,fontWeight:600,color:C.teal}}>{['Model','Camera','Video'][i]}</div>
   </div>)}
   <FilingBookmark t={7.8+give*.9}/>
  </Glass>
  <Actor t={t} x={660+give*160} y={614} size={265} role="courier" hop={1.1} travel={1-give}/>
  <Actor t={t} x={1190} y={667} size={215} role="archivist" hop={2.45}/>
  <Glass x={190} y={905} w={1010} h={85} t={t} frost={.76} style={{opacity:noCode,transform:`translateY(${(1-noCode)*100}px)`}}><div style={{position:'absolute',left:32,top:6,fontFamily:displayFont,fontSize:57,fontWeight:800,color:C.orange}}>0 <span style={{fontSize:27,fontWeight:500,marginLeft:17}}>additional lines of code</span></div><div style={{position:'absolute',right:43,top:20,fontFamily:bodyFont,fontSize:35,color:C.teal}}>&lt;/&gt;</div></Glass>
 </Stage>;
};

export const DirectScene:React.FC<{duration:number;featuresAt:number}>=({duration,featuresAt})=>{
 const t=clock(),p=easeInOut(t,1.1,1.3),gate=easeOut(t,featuresAt,.5);
 return <Stage t={t}>
  <Title x={145} y={100} size={83}>{gate>.5?'What is behind the interface?':'Go straight to the models.'}</Title>
  <Glass x={200} y={290} w={510} h={420} t={t} frost={.55} style={{transform:`rotate(${-4+4*p}deg)`}}>
   <div style={{position:'absolute',left:65,top:35}}><Logo name="claude.png" size={110}/></div><div style={{position:'absolute',left:202,top:62,fontFamily:displayFont,fontSize:49}}>Claude</div>
   <div style={{position:'absolute',left:60,top:205,transform:`translateX(${p*65}px)`}}><SkillFile size={155} t={t}/></div>
  </Glass>
  <div style={{position:'absolute',left:790,top:372,transform:`scale(${pop(t,.5)})`}}><Logo name="fal.png" size={148}/></div>
  {['seedance.png','google.png','hailuo.png'].map((logo,i)=><Glass key={logo} x={1090+i%2*270} y={275+Math.floor(i/2)*235} w={245} h={210} t={t} style={{transform:`translateY(${Math.sin(t*1.4+i)*8}px) rotate(${(i-1)*3}deg)`}}><div style={{padding:'25px 78px'}}><Logo name={logo} size={88}/></div><div style={{fontSize:29,textAlign:'center'}}>{['Seedance','Google','Hailuo'][i]}</div><div style={{position:'absolute',inset:-5,border:'5px solid '+C.orange,borderRadius:35,opacity:gate*(.4+.2*Math.sin(t*2+i)),transform:`translateZ(30px) rotate(${(1-gate)*30}deg)`}}/></Glass>)}
  {[0,1,2].map(i=>{const travel=((Math.max(0,t-2)+i*.7)%3)/3;return <div key={i} style={{position:'absolute',left:650+450*travel,top:575-100*Math.sin(travel*Math.PI),width:115,height:68,borderRadius:14,background:[C.teal,C.orange,C.blue][i],color:'#FFF8EA',display:'grid',placeItems:'center',fontSize:23,transform:`rotate(${travel*12-6}deg)`}}>Prompt</div>;})}
  <Actor t={t} x={755} y={666} size={245} role="operator" hop={1.2}/>
  <Glass x={250} y={929} w={1050} h={85} t={t} frost={.8}><div style={{position:'absolute',left:35,top:20,fontFamily:displayFont,fontSize:34}}>{gate>.5?'Same underlying models. Different access.':'Pay for the generations you request.'}</div></Glass>
 </Stage>;
};

export const CompareScene:React.FC<{duration:number;revealAt:number}>=({duration,revealAt})=>{
 const t=clock(),r=easeInOut(t,revealAt,.6);
 return <Stage t={t}>
  <Title x={145} y={100} size={83} style={{opacity:easeOut(t,4.4,.35)}}>{r>.5?'Here is the reveal.':'Same challenge. Two approaches.'}</Title>
  <div style={{position:'absolute',left:145,top:300,transform:`rotate(${-2+Math.sin(t*.7)*.5}deg) scale(${pop(t,.1)})`}}><Film t={t} w={735} placeholder label="A · Left"/></div>
  <div style={{position:'absolute',left:1000,top:300,transform:`rotate(${2-Math.sin(t*.7)*.5}deg) scale(${pop(t,.25)})`}}><Film t={t} w={735} video revealed label="B · Right"/></div>
  <Glass x={190} y={795} w={625} h={147} t={t} frost={.82} style={{opacity:r,transform:`translateY(${(1-r)*50}px)`}}><div style={{position:'absolute',left:25,top:30}}><Logo name="higgsfield.jpg" size={84}/></div><div style={{position:'absolute',left:135,top:41,fontFamily:displayFont,fontSize:44}}>Higgsfield</div></Glass>
  <Glass x={938} y={802} w={420} h={131} t={t} frost={.82} style={{opacity:r,transform:`translateY(${(1-r)*50}px)`}}><div style={{position:'absolute',left:25,top:24}}><Logo name="claude.png" size={78}/></div><div style={{position:'absolute',left:125,top:41,fontFamily:displayFont,fontSize:38}}>Claude skill</div></Glass>
  <Actor t={t} x={790} y={626} size={220} role="archivist" hop={revealAt} happy={r>.8}/>
 </Stage>;
};
