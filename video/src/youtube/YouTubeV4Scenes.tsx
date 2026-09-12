import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './brand';
import {easeOut,easeInOut,naturalHop} from './glass-motion';
import {SpriteActor} from './WhiteGlass';
import {facePresets,hopFace} from './face-motion';
import {DispatchStamp,FilingIntake,FilingBookmark} from './DispatchProps';
import {C,clamp,lerp,pop,Glass,Logo,Title,Actor,Key,SkillFile,Film,Stage,visible} from './YouTubeV4Primitives';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;

/** Opening proof challenge: blind reels, price contrast, sealed answer, then the named platform. */
export const HookScene:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,guessAt,whyAt,higgsAt})=>{
 const t=clock(),why=easeInOut(t,whyAt,.42),named=easeInOut(t,higgsAt,.36),seal=easeOut(t,guessAt+.15,.38);
 const filmsOut=why*(1-named);
 return <Stage t={t}>
  <Title x={142} y={105} size={84} style={{opacity:1-why,transform:`translateX(${(1-easeOut(t,.22,.3))*-80}px)`}}>{t<guessAt?'Can you tell?':'Keep your guess.'}</Title>
  <div style={{position:'absolute',left:175,top:268,transform:`translate(${-filmsOut*700-named*850}px,${-15*Math.sin(t*1.4)}px) rotateY(${(1-pop(t,.18))*35}deg) rotate(${-3*(1-pop(t,.18))}deg) scale(${pop(t,.18)})`,opacity:1-why}}><Film w={690} t={t} placeholder label="A"/>
   <div style={{position:'absolute',right:-25,bottom:-20,transform:`scale(${seal}) rotate(${-8+5*Math.sin(t)}deg)`}}><Glass x={-150} y={-50} w={180} h={100} t={t}><div style={{textAlign:'center',paddingTop:22,fontSize:35,color:C.orange}}>Sealed</div></Glass></div>
  </div>
  <div style={{position:'absolute',left:1030,top:255,transform:`translate(${filmsOut*650+named*850}px,${15*Math.sin(t*1.4)}px) rotateY(${(1-pop(t,.32))*-35}deg) scale(${pop(t,.32)})`,opacity:1-why}}><Film w={690} t={t} label="B"/>
   <div style={{position:'absolute',left:225,top:130,fontSize:116,fontFamily:displayFont,color:'#FFF8E8',textShadow:'0 3px 12px #274D51'}}>?</div>
  </div>
  <div style={{position:'absolute',left:345,top:718,opacity:1-why,transform:`scale(${pop(t,.58)})`}}>
   <Glass x={0} y={0} w={750} h={150} t={t} frost={.68}>
    <div style={{position:'absolute',left:36,top:34,fontFamily:displayFont,fontSize:64,color:C.orange}}>$100<span style={{fontFamily:bodyFont,fontSize:28}}>/mo</span></div>
    <div style={{position:'absolute',left:335,top:54,fontSize:28,color:'#655646'}}>vs</div>
    <div style={{position:'absolute',left:430,top:30,fontFamily:displayFont,fontSize:76,color:C.teal,transform:`scale(${pop(t,2.65)})`}}>10¢</div>
   </Glass>
  </div>
  <div style={{opacity:why*(1-named)}}>
   <Title x={160} y={145} size={92}>What am I paying for?</Title>
   <Glass x={390} y={338} w={740} h={330} t={t} style={{transform:`translateY(${(1-why)*180}px) rotate(${-4+4*why}deg)`}}>
    {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:88+i*170,top:65-i*8,width:200,height:175,background:i===2?'#FFF6DE':'#FFFBF0',borderRadius:19,border:'3px solid white',boxShadow:'0 14px 20px #8D5C282B',transform:`rotate(${(i-1)*9+3*Math.sin(t*2+i)}deg)`}}><div style={{background:C.orange,height:33,borderRadius:'17px 17px 0 0'}}/><div style={{textAlign:'center',fontFamily:displayFont,fontSize:60,paddingTop:24,color:C.orange}}>$100</div></div>)}
   </Glass>
   <Actor t={t} x={1120} y={492} size={300} role="archivist" hop={whyAt+.3}/>
  </div>
  <div style={{opacity:named,transform:`translateX(${(1-named)*150}px)`}}>
   <div style={{position:'absolute',left:185,top:172,transform:`rotate(${(1-named)*-10}deg) scale(${pop(t,higgsAt+.1)})`}}><Logo name="higgsfield.jpg" size={255}/></div>
   <Title x={485} y={205} size={92}>Higgsfield</Title>
   <Glass x={480} y={357} w={670} h={302} t={t} frost={.66}>
    <div style={{position:'absolute',left:42,top:32,fontSize:27,color:C.orange}}>Platform access</div>
    <div style={{position:'absolute',left:42,top:86,fontFamily:displayFont,fontSize:95}}>$1,000+<span style={{fontFamily:bodyFont,fontSize:27}}> / year</span></div>
   </Glass>
   {['seedance.png','google.png','hailuo.png'].map((n,i)=><div key={n} style={{position:'absolute',left:1210+i*153,top:360+55*i,transform:`translateY(${(1-pop(t,higgsAt+.38+i*.1))*120+Math.sin(t*2+i)*7}px) rotate(${(i-1)*8}deg)`}}><Glass x={0} y={0} w={132} h={132} t={t}><div style={{padding:28}}><Logo name={n} size={76}/></div></Glass></div>)}
   <Actor t={t} x={740} y={633} size={258} role="operator" hop={higgsAt+.2}/>
  </div>
  <Actor t={t} x={113+seal*25-why*500} y={727} size={190} role="courier" hop={1.75} travel={(1-seal)*(1-why)}/>
 </Stage>;
};

/** A miniature production studio. A shared file unfolds into the command console;
 * model cartridges latch, the film rolls out and a folder physically receives it. */
export const ModelStudio:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.65/duration,unfold=easeInOut(u,.48,.68),route=easeInOut(u,3.18,1.15),film=easeOut(u,5.4,.72),save=easeInOut(u,6.85,.8);
 return <Stage t={t}>
  <Title x={152} y={95} size={79} style={{opacity:1-easeOut(u,2.4,.25)}}>One Claude skill.</Title>
  <Title x={152} y={95} size={79} style={{opacity:easeOut(u,2.4,.25)*(1-easeOut(u,5.25,.3))}}>Pick the model. Send the prompt.</Title>
  <Title x={152} y={95} size={79} style={{opacity:easeOut(u,5.25,.3)}}>Your video. On your computer.</Title>
  <Glass x={160} y={288} w={665} h={415} t={t} frost={.48} style={{transform:`perspective(1500px) rotateY(${(1-unfold)*-17}deg) translateY(${(1-pop(u,.1))*90}px)`}}>
   <div style={{position:'absolute',left:36,top:30,display:'flex',gap:20,alignItems:'center'}}><Logo name="claude.png" size={78}/><span style={{fontSize:36,fontFamily:displayFont}}>Claude</span></div>
   <div style={{position:'absolute',left:70+unfold*14,top:129,transform:`scale(${1-.28*unfold}) rotate(${-11+11*unfold}deg)`,transformOrigin:'top left'}}><SkillFile size={235} t={u} open={.15*unfold}/></div>
   <div style={{position:'absolute',left:305,top:146,width:310,opacity:unfold}}>
    <div style={{fontFamily:displayFont,fontSize:40,color:C.orange}}>/fal-video</div>
    <div style={{marginTop:35,fontSize:30,lineHeight:1.25}}>“Make a cinematic clip.”</div>
    <div style={{marginTop:25,display:'flex',gap:8}}>{[0,1,2].map(i=><div key={i} style={{height:10,width:54,borderRadius:8,background:[C.orange,C.teal,C.gold][i],transform:`scaleX(${easeOut(u,1.5+i*.16,.4)})`,transformOrigin:'left'}}/>)}</div>
   </div>
  </Glass>
  <Glass x={1020} y={250} w={675} h={412} t={t} frost={.42} style={{transform:`translateY(${(1-pop(u,.4))*-160}px) rotate(${(1-pop(u,.4))*7}deg)`}}>
   <div style={{position:'absolute',left:28,top:22,display:'flex',alignItems:'center',gap:18}}><Logo name="fal.png" size={64}/><span style={{fontFamily:displayFont,fontSize:37}}>Model engine</span></div>
   {[['hailuo.png','Hailuo',C.teal],['google.png','Veo',C.blue],['seedance.png','Seedance',C.orange]].map(([n,label,color],i)=>{
    const select=i===0?easeOut(u,3,.22):0;
    return <div key={n} style={{position:'absolute',left:30+i*210,top:135,width:185,height:213,borderRadius:23,border:`3px solid ${select?color:'#FFFFFF'}`,background:'linear-gradient(125deg,#FFFFFFE8,#F2F0E0AA)',boxShadow:`0 ${12+8*select}px 24px ${color}33`,transform:`translateY(${(1-pop(u,.72+i*.12))*140-select*18+Math.sin(u*2+i)*3}px) rotateY(${(1-pop(u,.72+i*.12))*60}deg)`}}>
     <div style={{position:'absolute',left:51,top:30}}><Logo name={n} size={80}/></div><div style={{position:'absolute',top:132,width:'100%',textAlign:'center',fontSize:28,fontWeight:600}}>{label}</div>
     <div style={{position:'absolute',left:24,bottom:-11,width:135,height:13,background:color,borderRadius:6}}/>
    </div>;
   })}
   <div style={{position:'absolute',left:20,right:20,bottom:25,height:15,borderRadius:12,background:'#315F7940'}}/>
  </Glass>
  <div style={{position:'absolute',left:695+route*402,top:440-Math.sin(route*Math.PI)*137,width:156,height:105,borderRadius:22,background:C.orange,color:'#FFF4DE',boxShadow:'0 17px 22px #79451B35',transform:`rotate(${-8+16*route}deg) scale(${pop(u,2.4)*(1-easeOut(u,4.25,.2))})`,display:'grid',placeItems:'center',fontSize:50,fontFamily:displayFont}}>Aa</div>
  <div style={{position:'absolute',left:1110-save*280,top:504+save*150,opacity:film,transform:`rotate(${-9+9*film-4*save}deg) scale(${.63+.37*film-.2*save})`,transformOrigin:'top left'}}><Film w={480} t={u} revealed/></div>
  <div style={{position:'absolute',left:765,top:775,opacity:save,transform:`translateY(${(1-save)*100}px)`}}><svg width="560" height="170" viewBox="0 0 560 170"><path d="M10 40V22Q10 4 30 4H180L213 35H530Q550 35 550 54V150H10Z" fill="#C58E2E"/><path d="M0 69Q0 49 25 49H534Q558 49 558 70L540 166H20Z" fill="#E8AD38" stroke="#FFF1BD" strokeWidth="4"/><path d="M31 69H527" stroke="#FFF0B4" strokeWidth="3"/></svg><div style={{position:'absolute',left:45,top:92,fontSize:31,color:'#5B3C15',fontWeight:600}}>Saved locally</div></div>
  <Actor t={u} x={385+easeInOut(u,1.85,1.3)*290} y={657} role="courier" hop={2} travel={1-route}/>
  <Actor t={u} x={880} y={590} role="operator" size={250} hop={3.1}/>
  <Actor t={u} x={1200} y={737} role="archivist" size={205} hop={6.4} happy={u>7.2}/>
 </Stage>;
};

export const RoadmapScene:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*3.25/duration,p=easeInOut(u,.6,2.2);
 const stops=[{x:330,y:550,n:'01',title:'Connect',color:C.teal},{x:805,y:360,n:'02',title:'Create',color:C.orange},{x:1340,y:480,n:'03',title:'Compare',color:C.blue}];
 return <Stage t={t}>
  <Title x={145} y={100} size={82}>From setup to the reveal.</Title>
  <svg width="1920" height="1080" style={{position:'absolute'}}><path d="M445 685C630 685 639 482 915 492S1190 604 1450 608" stroke="#FFFCF0" strokeWidth="36" fill="none"/><path d="M445 685C630 685 639 482 915 492S1190 604 1450 608" stroke={C.clay} strokeWidth="9" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>
  {stops.map((s,i)=><div key={s.n} style={{position:'absolute',left:s.x,top:s.y,transform:`translateY(${(1-pop(u,.13+i*.1))*230}px) rotate(${(1-pop(u,.13+i*.1))*(i===1?-12:12)}deg)`}}>
   <Glass x={-30} y={-130} w={345} h={293} t={t} frost={.56}>
    <div style={{position:'absolute',left:25,top:16,fontFamily:displayFont,fontSize:44,color:s.color}}>{s.n}</div>
    <div style={{position:'absolute',left:123,top:36,transform:`rotate(${Math.sin(u*3+i)*5}deg)`}}>{i===0?<Key size={92} t={t}/>:i===1?<Logo name="claude.png" size={99}/>:<div style={{transform:'scale(.38)',transformOrigin:'top left'}}><Film t={t} w={265} revealed/></div>}</div>
    <div style={{position:'absolute',left:30,bottom:30,fontFamily:displayFont,fontSize:49}}>{s.title}</div>
   </Glass>
  </div>)}
  <Actor t={t} x={310+940*p} y={710-210*Math.sin(p*Math.PI)} size={220} hop={.65} travel={1} role="courier"/>
 </Stage>;
};

/** Persistent file identity: download tray -> carried file -> imported Claude instructions. */
export const DownloadScene:React.FC<{duration:number;outro?:boolean}>=({duration,outro=false})=>{
 const t=clock(),u=t*(outro?7.9:4.2)/duration,p=easeInOut(u,outro?3.8:1.7,outro?1.25:1.15),drop=easeOut(u,.5,.55),done=easeOut(u,outro?5.15:2.95,.45);
 return <Stage t={t}>
  <Title x={150} y={100} size={outro?82:75}>{outro?'The skill is in the description.':'Download it. Drop it into Claude.'}</Title>
  <Glass x={150} y={290} w={495} h={405} t={t} frost={.64}>
   <div style={{position:'absolute',left:36,top:30,fontSize:31,color:C.orange,fontWeight:600}}>Video description</div>
   <div style={{position:'absolute',left:36,top:103,width:421,height:152,borderRadius:20,border:'2px solid #FFF9ED',background:'#FFF9EC',boxShadow:'0 8px 12px #79502619'}}>
    <div style={{padding:'22px 24px',fontFamily:displayFont,fontSize:40}}>fal-video.skill</div><div style={{marginLeft:24,fontSize:27,color:C.teal}}>Download ↓</div>
   </div>
   <div style={{position:'absolute',left:54,right:54,top:300,height:53,border:'6px solid '+C.teal,borderTop:0,borderRadius:'0 0 17px 17px'}}/>
  </Glass>
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
   {['Choose a model','Shape the scene','Save the video'].map((x,i)=><div key={x} style={{position:'absolute',left:53,top:211+i*48,fontSize:30,opacity:easeOut(t,2.1+i*.3,.4),transform:`translateX(${(1-easeOut(t,2.1+i*.3,.4))*35}px)`}}><span style={{color:C.teal,marginRight:17}}>↳</span>{x}</div>)}
   <FilingBookmark t={7.8+give*.9}/>
  </Glass>
  <Actor t={t} x={660+give*160} y={614} size={265} role="courier" hop={1.1} travel={1-give}/>
  <Actor t={t} x={1210} y={667} size={215} role="archivist" hop={2.45}/>
  <Glass x={190} y={905} w={1010} h={85} t={t} frost={.76} style={{opacity:noCode,transform:`translateY(${(1-noCode)*100}px)`}}><div style={{position:'absolute',left:30,top:20,fontFamily:displayFont,fontSize:36,color:C.orange}}>No extra code to write.</div><div style={{position:'absolute',right:43,top:12,fontFamily:displayFont,fontSize:49,color:C.teal}}>↓</div></Glass>
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
