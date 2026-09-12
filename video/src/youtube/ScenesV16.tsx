import React from 'react';
import {AbsoluteFill,Loop,OffthreadVideo,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Label,Logo,SkillFile,Key,Lens,C,lerp,BrandedBackground} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {roadmapBeatsV13} from './ScenesV13';

const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const response=(t:number,at:number)=>t<at?0:Math.sin((t-at)*21)*Math.exp(-(t-at)*9);
const impact=(t:number,at:number)=>t<at?0:Math.exp(-(t-at)*6);
const Stage:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/><div style={{position:'absolute',left:95,top:765,width:1700,height:230,borderRadius:'50%',background:'linear-gradient(180deg,#FFFDFAAD,#F0C09D55)',borderTop:'3px solid #FFF9ED',boxShadow:'0 30px 80px #A8541812'}}/>{children}</AbsoluteFill>;

/** A bounded contact light, not an ambient pulse. The same beat drives the
 * actor landing, prop response and existing quiet latch sound. */
const Contact:React.FC<{t:number;at:number;x:number;y:number;color?:string;size?:number}>=({t,at,x,y,color=C.orange,size=430})=>{
 const p=easeOut(t,at,.5),a=impact(t,at);
 return <At x={x-size/2} y={y-size/2} style={{width:size,height:size,pointerEvents:'none',opacity:a}}><div style={{position:'absolute',inset:0,borderRadius:'50%',background:`radial-gradient(circle,${color}66,${color}22 42%,transparent 69%)`,transform:`scale(${.5+p*.7})`}}/><svg width={size} height={size} viewBox="0 0 430 430" style={{position:'absolute',inset:0,transform:`scale(${.65+p*.45})`}}>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d="M215 42V68" transform={`rotate(${i*45} 215 215)`} stroke={color} strokeWidth="5" strokeLinecap="round"/>)}</svg></At>;
};

/** Physical billing strip and one large Claude operator. Essential price
 * units stay adjacent; long footer qualifications are deliberately removed. */
export const CostV16:React.FC<{duration:number;brandAt:number}>=({duration,brandAt})=>{
 const t=clock(),u=t/duration,arrive=easeOut(t,.1,.45),send=e(u,.43,.22),release=e(u,.7,.16);
 const turns=[.34,.46,.58].map(v=>v*duration);
 const feed=turns.reduce((n,at)=>n+e(t,at,.32),0),r=turns.reduce((n,at)=>n+response(t,at),0);
 return <Stage t={t}>
  <At x={160} y={122} style={{opacity:easeOut(t,brandAt,.12)}}><Logo name="higgsfield.jpg" size={108}/><Label x={134} y={27} size={51}>Higgsfield</Label></At>
  <At x={1030} y={122}><Logo name="claude.png" size={108}/><Label x={133} y={27} size={51}>Claude skill</Label></At>
  <At x={143-(1-arrive)*150} y={304} style={{transform:`perspective(1400px) rotateY(${8*(1-arrive)}deg)`}}>
   <svg width="655" height="540" viewBox="0 0 655 540">
    <defs><linearGradient id="v16-bill-metal" x2="0" y2="1"><stop stopColor="#F4F3D9"/><stop offset=".45" stopColor="#C3D46F"/><stop offset="1" stopColor="#9AAD4D"/></linearGradient></defs>
    <ellipse cx="320" cy="487" rx="290" ry="29" fill="#5333111A"/>
    <rect x="18" y="22" width="612" height="124" rx="62" fill="url(#v16-bill-metal)" stroke="#FFFCEB" strokeWidth="5"/>
    <ellipse cx="593" cy="84" rx="28" ry="42" fill="#58633B"/><ellipse cx="593" cy="84" rx="13" ry="27" fill="#DEE8A2"/>
    <path d="M62 95H560" stroke="#637246" strokeWidth="14" strokeLinecap="round"/>
   </svg>
   {[2,1,0].map(i=><div key={i} style={{position:'absolute',left:61+i*11,top:97+i*16,width:491,height:320,borderRadius:'4px 4px 22px 22px',background:i?'#EBD7BF':'#FFFCF4',border:'3px solid #FFF',boxShadow:'0 15px 26px #5638201B',transform:`translateY(${r*7+i*feed*3}px)`}}/>)}
   <div style={{position:'absolute',left:72,top:105,width:470,height:304,overflow:'hidden'}}>
    <div style={{fontSize:166,lineHeight:1.12,fontWeight:800,letterSpacing:-8,marginTop:10,textAlign:'center'}}>$100</div>
    <div style={{fontSize:43,fontWeight:750,textAlign:'center'}}>/ month</div>
    <div style={{fontSize:26,textAlign:'center',marginTop:10,color:'#776958'}}>plan example</div>
    {turns.map((at,i)=>{const p=e(t,at,.35);return <div key={i} style={{position:'absolute',inset:0,background:'linear-gradient(#FFFDF4,#EAD6BA)',transformOrigin:'50% 0',transform:`perspective(750px) rotateX(${-175*p}deg)`,opacity:t<at||p>.97?0:Math.sin(p*Math.PI)*.9,backfaceVisibility:'hidden'}}/>;})}
   </div>
  </At>
  <At x={1035} y={250} style={{transform:`translateY(${36*(1-arrive)}px)`,opacity:arrive}}><div style={{fontSize:170,lineHeight:1,fontWeight:800,letterSpacing:-8,color:C.teal}}>~10¢</div><div style={{fontSize:42,fontWeight:750,marginTop:17}}>/ generation</div><div style={{fontSize:28,color:'#5D7068',marginTop:10}}>Estimate · varies by model</div></At>
  <Actor t={t} x={917+send*55} y={540} size={350} role="operator" walk={Math.sin(send*Math.PI)*.75} reach={send} lift={.75} look={1} contact={duration*.65} happy={release>.9}/>
  <At x={1440+send*20} y={490-75*Math.sin(send*Math.PI)} style={{transform:`rotate(${-13+send*18}deg) scale(${1-release*.12})`,opacity:1-e(u,.64,.06)}}><SkillFile t={t} size={170}/></At>
  <At x={1366} y={554} style={{opacity:release,transform:`scale(${.8+.2*release})`}}><Logo name="fal.png" size={146}/></At>
  <Contact t={t} at={duration*.65} x={1400} y={618} size={270} color={C.teal}/>
 </Stage>;
};

/** Oversized physical cinema camera: opening iris, turning focus marks and
 * clapper contact are legible actions, not a generic camera line icon. */
const CinemaCamera:React.FC<{t:number;active:number;size?:number}>=({t,active,size=490})=><div style={{position:'relative',width:size,height:size*.72}}>
 <svg width={size} height={size*.72} viewBox="0 0 490 353"><defs><linearGradient id="v16-camera-body"><stop stopColor="#F7FFF4"/><stop offset="1" stopColor="#A5C7BA"/></linearGradient></defs>
  <path d="M64 113H323L365 146V286H65Q38 286 38 260V139Q38 113 64 113Z" fill="url(#v16-camera-body)" stroke="#FFFDF4" strokeWidth="6"/>
  <path d="M104 112V78Q104 57 128 57H258Q279 57 279 78V112" fill="none" stroke="#48695D" strokeWidth="18"/>
  <path d="M48 151H173M48 257H169" stroke="#658F7D" strokeWidth="5"/>
  {[0,1,2,3].map(i=><path key={i} d={`M64 ${174+i*17}H128`} stroke="#759683" strokeWidth="5"/>)}
  <path d="M372 170L457 129V279L372 245Z" fill="#476F62" stroke="#FFFDFA" strokeWidth="5"/>
  <circle cx="83" cy="137" r="9" fill={active>.1?'#F06636':'#8FA69B'}/>
  <path d="M162 284L136 339M252 284L278 339M207 285V345" stroke="#3C5F52" strokeWidth="13" strokeLinecap="round"/>
 </svg>
 <At x={size*.334} y={size*.205} style={{transform:`rotate(${active*38}deg)`}}><Lens t={t} size={size*.47} angle={active*47}/></At>
 <div style={{position:'absolute',left:size*.105,top:size*.135,width:size*.59,height:size*.068,background:'repeating-linear-gradient(125deg,#F9F4E7 0px,#F9F4E7 29px,#294B3E 30px,#294B3E 58px)',border:'3px solid #FFF9EE',transformOrigin:'0 100%',transform:`rotate(${-18*(1-active)}deg)`,borderRadius:5}}/>
</div>;

const Output:React.FC<{start?:number;w:number;h:number}>=({start=1530,w,h})=><div style={{position:'relative',width:w,height:h,overflow:'hidden',borderRadius:28,background:'#171C19'}}><OffthreadVideo src={staticFile('obs.mp4')} startFrom={start*30} muted style={{position:'absolute',width:w,height:w*1080/1920,top:-3,left:0}}/></div>;

/** Skill enters the original Claude rig's working bay; the model selection
 * answers that contact, then the result takes over the entire useful stage. */
export const ProductionV16:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,carry=e(u,.02,.16),insert=e(u,.18,.16),model=e(u,.34,.14),reveal=e(u,.50,.055),save=e(u,.82,.12),gone=e(u,.475,.06);
 const contact=duration*.34;
 return <Stage t={t}>
  <div style={{position:'absolute',inset:0,opacity:1-gone,transform:`translateX(${-160*gone}px)`}}>
   <At x={180+carry*235+insert*300} y={271-Math.sin(carry*Math.PI)*65-insert*128} style={{transform:`rotate(${-9+carry*9+insert*90}deg) scale(${1-insert*.68})`,opacity:1-e(u,.332,.008)}}><SkillFile t={t} size={320}/></At>
   <Actor t={t} x={100+carry*260} y={565} size={356} role="operator" walk={Math.sin(carry*Math.PI)} reach={insert} lift={.86} look={1} contact={contact}/>
   <At x={750} y={146} style={{transform:`translateY(${-12*response(t,contact)}px)`}}>
    <Glass x={0} y={0} w={960} h={490} t={t} frost={.45}>
     <At x={43} y={33}><Logo name="claude.png" size={105}/><Label x={134} y={19} size={58}>Claude</Label></At>
     <div style={{position:'absolute',left:48,top:206,width:856,height:30,borderRadius:20,background:'#66452F',boxShadow:'inset 0 5px 9px #281B1477',transform:`scaleY(${1+response(t,contact)*.2})`}}/>
     <div style={{position:'absolute',left:69,top:268,width:230,height:119,borderRadius:22,background:'#F4D5AA',boxShadow:'inset 0 2px 3px #FFF'}}><Label x={19} y={32} size={34}>/fal-video</Label></div>
     {['seedance.png','google.png','hailuo.png'].map((logo,i)=><At key={logo} x={357+i*182} y={274} style={{transform:`translateY(${-22*impact(t,contact+.10+i*.12)}px) scale(${1+.12*impact(t,contact+.10+i*.12)})`,opacity:.32+.68*e(u,.34+i*.035,.035)}}><Logo name={logo} size={120}/></At>)}
    </Glass>
   </At>
   <Contact t={t} at={contact} x={1140} y={384} size={530}/>
   <At x={885} y={650} style={{opacity:model,transform:`translateY(${40*(1-model)}px)`}}><CinemaCamera t={t} active={model} size={285}/></At>
  </div>
  <At x={146} y={128} style={{opacity:reveal,transform:`translateY(${80*(1-reveal)}px) scale(${.88+.12*reveal})`,transformOrigin:'50% 30%'}}>
   <div style={{padding:13,borderRadius:41,background:'linear-gradient(120deg,#FFFDF5,#C8D7C9)',boxShadow:'0 28px 55px #58362129'}}>
    {u>=.5?<Sequence from={Math.round(duration*.5*30)} layout="none"><Output w={1610} h={798}/></Sequence>:<div style={{width:1610,height:798}}/>}
   </div>
   <At x={34} y={29}><Logo name="fal.png" size={73}/></At>
   <div style={{position:'absolute',left:28,top:721,padding:'11px 20px',borderRadius:16,background:'#FFFDF5ED',fontSize:28,fontWeight:700}}>Demo preview</div>
  </At>
  <At x={166} y={826} style={{opacity:save,transform:`translateY(${80*(1-save)}px)`}}><div style={{display:'flex',alignItems:'center',gap:20,background:'#FFFCF0',padding:'16px 27px',borderRadius:24,boxShadow:'0 10px 30px #4C322822'}}><svg width="55" height="56" viewBox="0 0 55 56"><path d="M7 19H21L27 12H48V49H7Z" fill="#EAB45F" stroke="#FFF" strokeWidth="3"/><path d="M29 2V31M20 23L29 32L38 23" stroke="#3C6654" strokeWidth="5" fill="none" strokeLinecap="round"/></svg><span style={{fontSize:37,fontWeight:800}}>Saved to your computer</span></div></At>
 </Stage>;
};

const TwinResults:React.FC<{active:number}>=({active})=><div style={{display:'flex',gap:12,transform:`scale(${.92+.08*active})`,transformOrigin:'50% 100%'}}>{['v9/higgsfield-comparison.mp4','v4/claude-result.mp4'].map((name,i)=><div key={name} style={{position:'relative',width:218,height:299,overflow:'hidden',borderRadius:21,border:'5px solid #FFFCF1',boxShadow:'0 15px 26px #3F2D282B',background:'#1D2422',transform:`perspective(900px) rotateY(${(i?-1:1)*45*(1-active)}deg)`,transformOrigin:i?'0 50%':'100% 50%'}}><Loop durationInFrames={120}><OffthreadVideo src={staticFile(name)} muted style={{width:'100%',height:'100%',objectFit:'cover'}}/></Loop><div style={{position:'absolute',left:86,bottom:12,width:38,height:38,borderRadius:'50%',background:'#FFF9E8',fontSize:24,fontWeight:800,textAlign:'center',lineHeight:'38px'}}>{i+1}</div></div>)}</div>;

/** Each stop is an action: key plugs in, camera closes/fires, outputs unfold.
 * Three arrival clocks are identical to the existing three soundEvents. */
export const RoadmapV16:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),beats=roadmapBeatsV13.map(v=>v*duration),xs=[337,925,1500],ys=[794,794,794];
 let x=xs[0],y=ys[0],walk=0,contact=beats[0];
 for(let i=0;i<2;i++){
  if(t>=beats[i]+.13){const p=e(t,beats[i]+.13,beats[i+1]-beats[i]-.13);x=lerp(xs[i],xs[i+1],p);y=lerp(ys[i],ys[i+1],p)-Math.sin(p*Math.PI)*86;walk=Math.sin(p*Math.PI);contact=beats[i+1];}
 }
 const states=beats.map(at=>e(t,at,.16)),route=e(t,beats[0],beats[2]-beats[0]);
 return <Stage t={t}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M337 824Q631 681 925 824Q1212 681 1500 824" stroke="#BCA68A55" strokeWidth="112" fill="none"/><path d="M337 807Q631 664 925 807Q1212 664 1500 807" stroke="#FFFDF5" strokeWidth="105" fill="none"/><path d="M337 807Q631 664 925 807Q1212 664 1500 807" stroke={C.orange} strokeWidth="9" pathLength="1" strokeDasharray="1" strokeDashoffset={1-route} fill="none"/></svg>
  <Contact t={t} at={beats[0]} x={337} y={402} size={520} color="#C19434"/>
  <At x={137} y={230} style={{transform:`translateY(${-12*response(t,beats[0])}px)`}}>
   <div style={{width:407,height:305,borderRadius:85,background:'linear-gradient(120deg,#FFFDF1,#D5E4D5)',border:'5px solid white',boxShadow:`0 20px 35px #57341B25,0 0 ${65*impact(t,beats[0])}px #ECAF4488`}}><At x={241} y={105}><Logo name="fal.png" size={100}/></At><svg width="400" height="300" style={{position:'absolute',inset:0}}><circle cx="123" cy="167" r="65" fill="#405E50" stroke="#C4D6C4" strokeWidth="10"/><path d="M99 168H149" stroke="#223A31" strokeWidth="25" strokeLinecap="round"/></svg></div>
   <At x={-56+states[0]*105} y={66} style={{transform:`rotate(${-28+states[0]*28}deg) scale(${1-states[0]*.24})`,transformOrigin:'75% 50%'}}><Key t={t} size={263}/></At>
  </At>
  <Contact t={t} at={beats[1]} x={925} y={375} size={520} color={C.teal}/>
  <At x={677} y={190} style={{transform:`translateY(${-16*response(t,beats[1])}px)`}}><CinemaCamera t={t} active={states[1]} size={500}/></At>
  <Contact t={t} at={beats[2]} x={1490} y={380} size={530}/>
  <At x={1280} y={247} style={{transform:`perspective(1200px) rotateY(${-12*(1-states[2])}deg) translateY(${-12*response(t,beats[2])}px)`}}><TwinResults active={states[2]}/></At>
  {[{x:162,y:908,text:'1 · Connect'},{x:753,y:908,text:'2 · Create'},{x:1329,y:908,text:'3 · Compare'}].map((v,i)=><Label key={v.text} x={v.x} y={v.y} size={44} color={states[i]>.5?C.orange:C.ink}>{v.text}</Label>)}
  <Actor t={t} x={x-135} y={y-247} size={270} role="courier" walk={walk} lift={.4} reach={.5} look={1} contact={contact} happy={t>beats[2]}/>
 </Stage>;
};
