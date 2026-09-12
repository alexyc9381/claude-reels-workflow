import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {bodyFont,displayFont} from './cinematic-brand';
import {easeOut,easeInOut} from './glass-motion';
import {C,clamp,lerp,pop,Glass,Logo,Actor,SkillFile,Film,Stage} from './YouTubeV6Primitives';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const type=(s:string,t:number,at:number,d:number)=>s.slice(0,Math.floor(s.length*clamp((t-at)/d)));
const text:React.CSSProperties={fontFamily:displayFont,fontWeight:650,letterSpacing:-1.4,lineHeight:1.15};
const Enter:React.FC<{t:number;at?:number;children:React.ReactNode;distance?:number}>=({t,at=0,children,distance=45})=><AbsoluteFill style={{opacity:easeOut(t,at,.23),transform:`translateY(${(1-pop(t,at))*distance}px)`}}>{children}</AbsoluteFill>;
const Cursor:React.FC<{x:number;y:number;press?:number;opacity?:number}>=({x,y,press=0,opacity=1})=><svg width="56" height="65" viewBox="0 0 56 65" style={{position:'absolute',left:x,top:y,opacity,filter:'drop-shadow(0 5px 4px #5E392A40)',transform:`scale(${1-.16*press})`}}><path d="M6 4L47 37L30 41L23 59Z" fill="#FFFDF6" stroke={C.orange} strokeWidth="3.5" strokeLinejoin="round"/></svg>;
const Rule:React.FC<{x:number;y:number;w:number;t:number;at:number;color?:string}>=({x,y,w,t,at,color=C.orange})=><div style={{position:'absolute',left:x,top:y,width:w,height:3,background:color,transform:`scaleX(${easeInOut(t,at,.65)})`,transformOrigin:'left'}}/>;
const BrandRow:React.FC<{name:string;logo:string;size?:number}>=({name,logo,size=56})=><div style={{display:'flex',alignItems:'center',gap:19}}><Logo name={logo} size={size}/><span style={{...text,fontSize:size*.67}}>{name}</span></div>;
const Label:React.FC<{x:number;y:number;children:React.ReactNode;color?:string;size?:number}>=({x,y,children,color=C.ink,size=32})=><div style={{position:'absolute',left:x,top:y,...text,fontSize:size,color,whiteSpace:'nowrap',letterSpacing:size<30?-.3:-1.1}}>{children}</div>;
const Shell:React.FC<{x:number;y:number;w:number;h:number;t:number;name:string;logo:string;children?:React.ReactNode}>=({x,y,w,h,t,name,logo,children})=><Glass x={x} y={y} w={w} h={h} t={t} frost={.7}>
 <div style={{position:'absolute',left:31,top:25}}><BrandRow name={name} logo={logo}/></div>
 <div style={{position:'absolute',left:30,right:30,top:104,height:1,background:'#B889692B'}}/>
 {children}
</Glass>;

/** Large actual footage; the missing comparison remains explicitly a placeholder. */
export const HookScene:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,guessAt,whyAt,higgsAt})=>{
 const t=clock();
 if(t>=whyAt)return <Sequence from={Math.round(whyAt*30)}><PaymentScene duration={duration-whyAt} higgsAt={higgsAt-whyAt}/></Sequence>;
 const price=easeOut(t,guessAt,.3),out=easeInOut(t,whyAt-.26,.26);
 return <Stage t={t}><AbsoluteFill style={{transform:`translateX(${-out*70}px) scale(${1+.018*easeOut(t,0,whyAt)})`,opacity:1-out}}>
  {[0,1].map(i=><Enter key={i} t={t} at={.15+i*.22} distance={70}><div style={{position:'absolute',left:80+i*900,top:118,transform:`perspective(2000px) rotateY(${(1-easeOut(t,.2+i*.22,.5))*(i?-8:8)}deg)`}}><Film t={t} w={860} placeholder={!i} video={!!i} label={i?'B':'A'}/></div></Enter>)}
  <Rule x={110} y={662} w={730} t={t} at={.9}/><Rule x={1010} y={662} w={730} t={t} at={1.15} color={C.teal}/>
  <Glass x={120} y={711} w={620} h={213} t={t} frost={.76} style={{opacity:price,transform:`translateY(${(1-price)*40}px)`}}>
   <div style={{position:'absolute',left:29,top:33}}><Logo name="higgsfield.jpg" size={68}/></div>
   <Label x={122} y={23} size={83}>$100<span style={{fontSize:25,fontWeight:500,letterSpacing:-.3}}> / month</span></Label><Label x={125} y={132} size={27} color={C.orange}>Subscription</Label>
  </Glass>
  <Glass x={1010} y={711} w={368} h={213} t={t} frost={.76} style={{opacity:price,transform:`translateY(${(1-price)*40}px)`}}><Label x={32} y={25} size={83}>10¢</Label><Label x={34} y={132} size={26} color={C.teal}>Per-generation claim*</Label></Glass>
  <div style={{position:'absolute',left:138,top:953,fontSize:19,color:'#785443',opacity:price}}>*Different billing units. Actual cost depends on the model and settings.</div>
  <Actor t={t} x={797} y={749} size={155} hop={guessAt} action="direct"/>
 </AbsoluteFill></Stage>;
};

/** The platform is an interface layer: it unfolds to expose model choices.
 * Both sides have a continuous causal action, not a static logo versus a toy. */
const PaymentScene:React.FC<{duration:number;higgsAt:number}>=({duration,higgsAt})=>{
 const t=clock(),open=easeInOut(t,1.1,1.3),select=easeInOut(t,higgsAt+.12,.6),close=easeInOut(t,duration-.3,.3);
 const scan=2*easeInOut(t,higgsAt+.55,Math.max(.6,duration-higgsAt-1)),selection=Math.round(scan);
 const logos=['hailuo.png','google.png','seedance.png'],names=['Hailuo','Veo','Seedance'];
 return <Stage t={t}><AbsoluteFill style={{opacity:1-close,transform:`scale(${1+.025*easeOut(t,0,duration)})`}}>
  <Enter t={t}>
   <Shell x={132} y={151} w={657} h={531} t={t} name="Higgsfield" logo="higgsfield.jpg">
    <div style={{position:'absolute',left:35,top:139,transform:`translateY(${-14*open}px)`}}><Label x={0} y={0} size={94}>$100<span style={{fontSize:31}}> / mo</span></Label></div>
    <Label x={39} y={267} size={28} color={C.orange}>Subscription interface</Label>
    {[0,1,2].map(i=>{const emphasis=Math.max(0,1-Math.abs(scan-i));return <div key={i} style={{position:'absolute',left:38+i*190,top:337,transform:`translateY(${(1-pop(t,.22+i*.15))*55-18*select*emphasis}px) scale(${1+.11*select*emphasis})`,opacity:1-.25*select*(1-emphasis)}}><Logo name={logos[i]} size={64}/><div style={{marginTop:12,fontSize:24,fontWeight:600}}>{names[i]}</div><div style={{marginTop:13,width:143,height:3,background:'#C9B19B',overflow:'hidden'}}><div style={{width:63,height:3,background:C.orange,transform:`translateX(${((t*89+i*51)%220)-63}px)`}}/></div></div>;})}
    <Cursor x={112+scan*190} y={447-12*Math.sin(scan*Math.PI)} opacity={select}/>
   </Shell>
   <div style={{position:'absolute',left:829,top:376,transform:`translateX(${18*Math.sin(Math.min(t,3)*1.3)}px)`,opacity:open}}><svg width="80" height="50"><path d="M0 25H66M47 6L68 25L47 44" fill="none" stroke={C.orange} strokeWidth="4"/></svg></div>
   <Shell x={951} y={151} w={837} h={531} t={t} name="The models underneath" logo="fal.png">
    {logos.map((l,i)=><div key={l} style={{position:'absolute',left:36,top:131+i*117,width:762,height:98,borderRadius:18,background:i===selection?'#FFFFFFEE':'#FFFFFF66',border:'1px solid '+(i===selection?'#B8501F65':'#FFFFFF'),boxShadow:i===selection?'0 12px 26px #94543218':undefined,transform:`translateX(${(1-pop(t,.55+i*.19))*100-15*select*Math.max(0,1-Math.abs(scan-i))}px)`}}><div style={{position:'absolute',left:20,top:19}}><Logo name={l} size={58}/></div><Label x={102} y={25} size={34}>{names[i]}</Label><div style={{position:'absolute',left:445,right:27,top:46,height:3,background:'#D6C3B1',overflow:'hidden'}}><div style={{height:3,width:76,background:[C.teal,C.orange,C.blue][i],transform:`translateX(${((Math.max(0,t-.8)*100+i*61)%300)-76}px)`}}/></div></div>)}
   </Shell>
  </Enter>
  <Glass x={181} y={767} w={1120} h={157} t={t} frost={.64} style={{opacity:easeOut(t,2.5,.5)}}><div style={{position:'absolute',left:30,top:31}}><BrandRow name="Claude" logo="claude.png" size={68}/></div><Rule x={286} y={77} w={124} t={t} at={2.6}/><div style={{position:'absolute',left:449,top:30}}><BrandRow name="fal.ai" logo="fal.png" size={68}/></div><Label x={715} y={55} size={31} color={C.teal}>Pay per generation</Label></Glass>
  <Actor t={t} x={1300} y={811} size={135} hop={2.8} action="direct"/>
 </AbsoluteFill></Stage>;
};

/** One persistent instruction file becomes a request, then a real generated clip. */
export const ModelStudio:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.65/duration,send=easeInOut(u,1.85,.9),reveal=easeInOut(u,3.5,.65),save=easeOut(u,6.1,.5);
 return <Stage t={t}>
  <Enter t={u}>
   <Shell x={125} y={142} w={705} h={567} t={t} name="Claude" logo="claude.png">
    <div style={{position:'absolute',left:34,top:137,width:631,height:119,borderRadius:20,background:'#FFFFFFAD',boxShadow:'inset 0 1px 3px #8A563D18'}}><Label x={23} y={24} size={33} color={C.orange}>/fal-video</Label><Label x={24} y={71} size={24}>{type('Describe the scene. Choose the model.',u,.25,.8)}</Label></div>
    <div style={{position:'absolute',left:42,top:294,transform:`translateX(${send*24}px) rotate(${-3+3*send}deg)`}}><SkillFile t={t} size={154} label=".skill"/></div>
    <div style={{position:'absolute',left:277,top:307,opacity:easeOut(u,1,.3)}}>{['Instructions','Model selection','Save the output'].map((s,i)=><div key={s} style={{marginBottom:22,fontSize:28,color:i===1?C.orange:C.ink,transform:`translateX(${(1-easeOut(u,1+i*.2,.4))*30}px)`,opacity:easeOut(u,1+i*.2,.4)}}>{s}</div>)}</div>
   </Shell>
   <div style={{position:'absolute',left:831,top:360,opacity:send}}><svg width="145" height="90"><path d="M0 45H125M109 29L127 45L109 61" stroke={C.orange} strokeWidth="4" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-send}/></svg></div>
   <Shell x={970} y={142} w={823} h={567} t={t} name="fal.ai" logo="fal.png">
    <div style={{position:'absolute',left:28,top:134,opacity:1-reveal,transform:`translateY(${-reveal*50}px)`}}>{['hailuo.png','google.png','seedance.png'].map((l,i)=><div key={l} style={{position:'absolute',left:i*256,top:40,width:244,height:260,borderRadius:20,background:'#FFFFFF80',border:'1px solid #FFFFFF',transform:`translateY(${(1-pop(u,1+i*.22))*80}px)`}}><div style={{position:'absolute',left:77,top:39}}><Logo name={l} size={90}/></div><Label x={34} y={174} size={30}>{['Hailuo','Veo','Seedance'][i]}</Label><Rule x={33} y={223} w={175} t={u} at={2+i*.16}/></div>)}</div>
    <div style={{position:'absolute',left:27,top:128,opacity:reveal,transform:`translateY(${(1-reveal)*60}px) scale(${.93+.07*reveal})`}}><Film t={t} w={765} video/></div>
   </Shell>
  </Enter>
  <Glass x={138} y={782} w={1112} h={154} t={t} frost={.65} style={{opacity:save,transform:`translateY(${(1-save)*40}px)`}}><div style={{position:'absolute',left:27,top:24,width:84,height:104,borderRadius:12,background:'#FFF7F0',border:'1px solid #C7AC9444',display:'grid',placeItems:'center',color:C.orange,fontSize:24,fontWeight:700}}>MP4</div><Label x={140} y={32} size={35}>Generated by the model</Label><Label x={141} y={90} size={28} color={C.teal}>Saved to your project</Label><Actor t={t} x={952} y={1} size={137} hop={6.1} happy/></Glass>
 </Stage>;
};

/** Editorial route: numbered destinations, content previews, one tracked journey. */
export const RoadmapScene:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*3.3/duration,progress=easeInOut(u,.35,2.35);
 return <Stage t={t}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M245 686H615Q692 686 730 612L805 468Q843 394 922 394H1150Q1231 394 1281 469L1378 614Q1427 688 1514 688H1743" fill="none" stroke="#FFFFFFB8" strokeWidth="25"/><path d="M245 686H615Q692 686 730 612L805 468Q843 394 922 394H1150Q1231 394 1281 469L1378 614Q1427 688 1514 688H1743" fill="none" stroke={C.orange} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/></svg>
  {[0,1,2].map(i=><Enter key={i} t={u} at={.1+i*.28}><Glass x={125+i*585} y={i===1?150:220} w={500} h={382} t={t} frost={.76}>
   <div style={{position:'absolute',left:26,top:23,fontSize:24,color:C.orange,fontWeight:750}}>0{i+1}</div><Label x={84} y={21} size={32}>{['Connect','Create','Compare'][i]}</Label>
   {i===2?<div style={{position:'absolute',left:23,top:105}}><Film t={t} w={451} video/></div>:<div style={{position:'absolute',left:27,top:119,width:444,height:232,borderRadius:19,background:'#FFFFFF90'}}>
    {i===0?<><div style={{position:'absolute',left:44,top:49}}><Logo name="claude.png" size={104}/></div><Rule x={169} y={103} w={73} t={u} at={.4}/><div style={{position:'absolute',left:279,top:49}}><Logo name="fal.png" size={104}/></div><Label x={109} y={180} size={23} color={C.teal}>Account + skill</Label></>:<><Label x={25} y={35} size={31} color={C.orange}>/fal-video</Label><Label x={25} y={103} size={24}>Prompt → model → video</Label><Rule x={25} y={173} w={388} t={u} at={.95}/></>}
   </div>}
  </Glass></Enter>)}
  <div style={{position:'absolute',left:236+1090*progress,top:735-160*Math.sin(progress*Math.PI)}}><Actor t={t} x={0} y={0} size={135} hop={.4} travel={1-progress} action="direct"/></div>
 </Stage>;
};

export const DirectScene:React.FC<{duration:number;featuresAt:number}>=({duration,featuresAt})=>{
 const t=clock(),phase=easeInOut(t,featuresAt,.8),selected=Math.min(2,Math.floor(Math.max(0,t-featuresAt)/2.6));
 return <Stage t={t}>
  <Enter t={t}><Shell x={133} y={170} w={615} h={513} t={t} name="Claude" logo="claude.png">
   <Label x={38} y={146} size={39} color={C.orange}>Your creative brief</Label><div style={{position:'absolute',left:37,top:222,width:541,height:164,borderRadius:18,background:'#FFFFFF99',padding:'24px',boxSizing:'border-box'}}><div style={{fontSize:29,lineHeight:1.55}}>{type('Subject. Action. Camera. Style.',t,.5,1.7)}</div></div><Label x={39} y={434} size={25} color={C.teal}>Sent as a model request</Label>
  </Shell></Enter>
  <div style={{position:'absolute',left:810,top:350}}><Logo name="fal.png" size={112}/><Label x={12} y={141} size={25}>fal.ai</Label></div>
  <Rule x={748} y={406} w={60} t={t} at={1.4}/><Rule x={932} y={406} w={62} t={t} at={1.9}/>
  <Shell x={998} y={170} w={791} h={513} t={t} name="Choose the model" logo={['hailuo.png','google.png','seedance.png'][selected]}>
   {['Hailuo','Veo','Seedance'].map((s,i)=><div key={s} style={{position:'absolute',left:30,top:130+i*109,width:728,height:90,borderRadius:17,background:selected===i?'#FFFDF5':'#FFFFFF55',border:'1px solid #FFFFFF',transform:`translateX(${selected===i?-12*phase:0}px)`,boxShadow:selected===i?'0 12px 22px #8857321A':undefined}}><div style={{position:'absolute',left:19,top:18}}><Logo name={['hailuo.png','google.png','seedance.png'][i]} size={55}/></div><Label x={100} y={26} size={31}>{s}</Label><div style={{position:'absolute',right:34,top:38,width:250,height:4,background:'#DCC6B4',overflow:'hidden'}}><div style={{width:80,height:4,background:[C.teal,C.orange,C.blue][i],transform:`translateX(${(t*100+i*53)%330-80}px)`}}/></div></div>)}
  </Shell>
  <Glass x={190} y={788} w={1110} h={149} t={t} frost={.7}><Label x={34} y={32} size={34}>{phase>.5?'Model capabilities stay with the model.':'The request goes to a cloud model.'}</Label><Label x={35} y={88} size={27} color={C.teal}>{phase>.5?'Access and workflow are what change.':'The finished file can be saved locally.'}</Label><Actor t={t} x={946} y={-19} size={144} hop={1.1}/></Glass>
 </Stage>;
};

export const DownloadScene:React.FC<{duration:number;outro?:boolean}>=({duration,outro=false})=>{
 const t=clock(),u=t*6.4/duration,transfer=easeInOut(u,1.6,1.3),done=easeOut(u,3.1,.4),press=Math.sin(Math.PI*clamp((u-.8)/.27));
 return <Stage t={t}>
  <Enter t={u}><Shell x={128} y={161} w={656} h={514} t={t} name="Video description" logo="claude.png">
   <div style={{position:'absolute',left:32,top:145,width:590,height:193,borderRadius:20,background:'#FFFFFFB0',border:'2px solid '+(u>.85?C.orange:'#FFFFFF'),transform:`scale(${1-.014*press})`}}><Label x={27} y={26} size={39}>fal-video.skill</Label><div style={{position:'absolute',left:28,top:110,borderRadius:12,background:C.orange,color:'#FFFFFF',padding:'11px 28px',fontSize:27,fontWeight:650}}>Download ↓</div></div>
   <Label x={37} y={391} size={26} color={C.teal}>{outro?'Get the skill from the link below.':'Keep the downloaded file.'}</Label><Rule x={37} y={456} w={573} t={u} at={.95}/>
  </Shell></Enter>
  <Enter t={u} at={.2}><Shell x={970} y={161} w={820} h={514} t={t} name="Claude" logo="claude.png">
   <div style={{position:'absolute',left:32,top:142,width:752,height:303,borderRadius:20,background:'#FFFFFF80',border:'2px dashed '+(done>.5?C.orange:'#B9A28C'),overflow:'hidden'}}>
    <div style={{position:'absolute',left:29,top:27,opacity:done}}><div style={{display:'inline-flex',alignItems:'center',gap:14,padding:'13px 22px',background:'#EFE4D7',borderRadius:13,fontSize:26}}><span style={{fontWeight:800,color:C.orange}}>.skill</span> fal-video.skill</div></div>
    <Label x={29} y={113} size={37} color={C.orange}>{type('/fal-video',u,3.55,.65)}<span style={{opacity:Math.sin(u*8)>0?1:0}}>▏</span></Label>
    <Label x={30} y={196} size={29}>{type('Describe the video you want to make.',u,4.25,1.2)}</Label>
    <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',opacity:1-easeOut(u,1.75,.35),color:C.orange,fontSize:35,...text}}>Upload the skill</div>
   </div><Label x={35} y={466} size={19} color="#876C59">Workflow illustration · setup varies by Claude app</Label>
  </Shell></Enter>
  <div style={{position:'absolute',left:357+750*transfer,top:365-120*Math.sin(transfer*Math.PI),opacity:easeOut(u,1.3,.2)*(1-easeOut(u,2.96,.2)),transform:`rotate(${-4+8*transfer}deg) scale(${.9+.1*Math.sin(transfer*Math.PI)})`}}><SkillFile t={t} size={183}/></div>
  <Cursor x={lerp(650,440,easeInOut(u,.1,.7))} y={lerp(738,450,easeInOut(u,.1,.7))} press={press} opacity={1-easeOut(u,1.3,.22)}/>
  <Glass x={151} y={781} w={1138} h={158} t={t} frost={.66} style={{opacity:easeOut(u,.5,.4)}}><Label x={32} y={35} size={43}>{outro?'The skill is in the description.':'Download → upload → describe your video'}</Label>{outro&&<Label x={34} y={102} size={27} color={C.orange}>Start with your first prompt.</Label>}<Actor t={t} x={968} y={9} size={137} hop={3.1} happy/></Glass>
 </Stage>;
};

export const SkillScene:React.FC<{duration:number;importAt:number}>=({duration,importAt})=>{
 const t=clock(),u=t*7.8/importAt,open=easeInOut(u,.4,1),send=easeInOut(u,2,1.2);
 if(t>=importAt)return <Sequence from={Math.round(importAt*30)}><DownloadScene duration={duration-importAt}/></Sequence>;
 return <Stage t={t}>
  <div style={{position:'absolute',left:165,top:238,transform:`perspective(1700px) rotateY(${-12*(1-open)}deg) rotate(-3deg)`}}><SkillFile t={t} size={280} open={open*.22}/></div>
  {['Choose the model','Build the request','Save the result'].map((s,i)=><Glass key={s} x={570+send*35} y={181+i*152} w={651} h={122} t={t} frost={.77} style={{transform:`translateX(${(1-pop(u,.6+i*.2))*-120}px)`,opacity:easeOut(u,.6+i*.2,.3)}}><div style={{position:'absolute',left:28,top:35,fontSize:31,color:C.orange,fontWeight:750}}>0{i+1}</div><Label x={107} y={36} size={35}>{s}</Label><Rule x={107} y={94} w={480} t={u} at={2+i*.6}/></Glass>)}
  <Shell x={1320} y={197} w={465} h={452} t={t} name="Claude" logo="claude.png"><div style={{position:'absolute',left:56,top:167,transform:`scale(${.92+.08*send})`}}><Logo name="fal.png" size={120}/></div><Label x={54} y={335} size={27} color={C.teal}>Instructions → action</Label><Actor t={t} x={252} y={169} size={141} hop={2.3} action="direct"/></Shell>
  <Glass x={176} y={793} w={1110} h={137} t={t} frost={.75} style={{opacity:easeOut(u,3.7,.4)}}><Label x={31} y={39} size={38}>A reusable set of instructions for Claude.</Label></Glass>
 </Stage>;
};

export const CompareScene:React.FC<{duration:number;revealAt:number}>=({duration,revealAt})=>{
 const t=clock(),r=easeInOut(t,revealAt,.6),focus=easeInOut(t,5,.9)*(1-easeInOut(t,9,.9));
 return <Stage t={t}>
  {[0,1].map(i=><Enter key={i} t={t} at={.12*i}><div style={{position:'absolute',left:80+i*900,top:145,transform:`scale(${1+focus*.018})`}}><Film t={t} w={860} placeholder={!i} video={!!i} label={i?'B · Right':'A · Left'}/></div></Enter>)}
  <Rule x={116} y={689} w={730} t={t} at={.6}/><Rule x={1018} y={689} w={730} t={t} at={.9} color={C.teal}/>
  <Glass x={130} y={749} w={631} h={166} t={t} frost={.76} style={{opacity:r}}><div style={{position:'absolute',left:31,top:43}}><BrandRow name="Higgsfield" logo="higgsfield.jpg" size={76}/></div></Glass>
  <Glass x={1010} y={749} w={365} h={166} t={t} frost={.76} style={{opacity:r}}><div style={{position:'absolute',left:24,top:43}}><BrandRow name="Claude" logo="claude.png" size={68}/></div></Glass>
  <Actor t={t} x={809} y={760} size={140} hop={revealAt} happy/>
 </Stage>;
};
