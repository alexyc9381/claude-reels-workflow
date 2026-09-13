import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Logo,SkillFile,C,clamp,lerp} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {Set,Light,Shot,CineCamera} from './ScenesV19';
import {ChargeV20} from './ScenesV20';
import {roadmapBeatsV13} from './ScenesV13';
import {OctopusV22} from './ScenesV22';
import {AtmosphereV22} from './AtmosphereV22';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const Text:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;color?:string}>=({x,y,children,size=45,color=C.ink})=><At x={x} y={y} style={{fontSize:size,fontWeight:800,color,lineHeight:1.12}}>{children}</At>;
const recoil=(t:number,at:number)=>t<at?0:Math.sin((t-at)*17)*Math.exp(-6*(t-at));
// Camera-source window changes only inside the opening package. Never move the
// tutorial crop: the presenter naturally shifts left while demonstrating.
export const introCropV21=(globalSeconds:number,base:number)=>base+(globalSeconds<31?30:0);
export const roadmapTitlesV21=['Connect fal.ai + Claude','Make your first video','Review the results'];

/** Original editorial lime mascot, not an official Higgsfield character.
 * Curved silhouette, flexible limbs, anticipation and a persistent defeat pose. */
export const SquiggleV21:React.FC<{t:number;hit:number;size?:number}>=({t,hit,size=440})=>{
 const brace=e(t,.15,.27),collapse=e(t,hit,.17),r=recoil(t,hit+.17),stretch=1+collapse*.20-r*.045,sy=1-collapse*.64+r*.04;
 const wave=(1-collapse)*Math.sin(t*4)*5+recoil(t,hit)*23;
 return <svg data-editorial-higgsfield-squiggle width={size} height={size*.9} viewBox="0 0 340 306" style={{overflow:'visible'}}><defs><linearGradient id="squiggle-skin" x2=".7" y2="1"><stop stopColor="#DDFA74"/><stop offset=".55" stopColor="#B2D831"/><stop offset="1" stopColor="#83AD1D"/></linearGradient></defs>
  <ellipse cx="170" cy="277" rx={130+collapse*25} ry="17" fill="#4F61252A"/>
  <g transform={`translate(170 270) scale(${stretch} ${sy}) translate(-170 -270)`}>
   <path d={`M64 113C${-13-wave} 70 ${-9+wave} 194 42 201Q61 211 43 231M278 124C${364+wave} 72 ${352-wave} 202 302 207Q282 216 307 237`} fill="none" stroke="#AECF36" strokeWidth="25" strokeLinecap="round"/>
   <path d="M82 234C52 258 55 287 99 273L126 246M227 238C229 276 284 293 274 258L258 233" fill="#9CBF27"/>
   <path d={`M43 104C32 65 64 33 106 44C123 ${5+brace*13} 171 11 189 41C218 13 260 27 271 63C307 59 325 94 302 123C331 149 309 183 281 188C295 227 258 263 226 241C209 275 161 276 141 248C107 270 68 258 63 228C27 232 11 195 39 172C8 152 13 121 43 104Z`} fill="url(#squiggle-skin)" stroke="#94AD36" strokeWidth="3"/>
   <path d="M66 91Q88 53 119 64M207 60Q249 50 260 82" fill="none" stroke="#F2FFC3" strokeWidth="9" strokeLinecap="round" opacity=".8"/>
   {collapse<.4?<><path d={`M119 ${112+brace*13}V143M218 ${112+brace*13}V143`} stroke="#243411" strokeWidth="13" strokeLinecap="round"/><path d="M144 179Q169 191 193 174" fill="none" stroke="#2F4317" strokeWidth="8" strokeLinecap="round"/></>:<><path d="M104 120L132 153M132 120L104 153M204 120L232 153M232 120L204 153" stroke="#283B13" strokeWidth="10" strokeLinecap="round"/><path d="M144 194Q168 164 193 194" fill="none" stroke="#344819" strokeWidth="8" strokeLinecap="round"/></>}
  </g>
 </svg>;
};

/** Challenge → leap/defeat → load skill → route models → deliver a result.
 * The ending is a different state, not the opening pose on a perpetual loop. */
export const CostV21:React.FC<{duration:number;brandAt:number;bold?:boolean}>=({duration,brandAt})=>{
 const t=clock(),u=t*7.6667/duration,flight=clamp((u-.38)/1.2),land=1.58,raise=e(u,2.15,.48),throwP=e(u,3.0,.84),ready=e(u,3.84,.28),select=e(u,4.15,.58),shoot=e(u,4.88,.55),deliver=e(u,5.44,1.0),save=e(u,6.55,.68);
 const x=lerp(955,620,e(u,.38,1.2)),y=lerp(565,455,flight)-Math.sin(flight*Math.PI)*190;
 return <Set t={t}><Light x={520} power={.6-.18*ready}/><Light x={1370} power={.32+.6*ready} color="#FFE7B5"/>
  <At x={164} y={112} style={{display:'flex',gap:23,alignItems:'center'}}><Logo name="higgsfield.jpg" size={114}/><span style={{fontSize:62,fontWeight:850}}>Higgsfield</span></At>
  <At x={1101} y={112} style={{display:'flex',gap:23,alignItems:'center'}}><Logo name="claude.png" size={114}/><span style={{fontSize:57,fontWeight:850}}>Claude skill</span></At>
  <Text x={182} y={297} size={125}>$100</Text><Text x={200} y={436} size={39}>/ month</Text>
  <Text x={1116} y={280} size={114} color="#2D7956">~10¢</Text><Text x={1453} y={349} size={33}>/ generation</Text>
  <At x={455} y={440}><OctopusV22 t={u} hit={land}/></At>
  <At x={1093} y={429} style={{width:670,height:304,borderRadius:24,border:'4px solid white',background:'linear-gradient(135deg,#FFFEF5,#ECE9D9)',boxShadow:'0 18px 30px #57381824',transform:`translateY(${-7*recoil(u,3.84)}px)`}}>
   <At x={25} y={24}><Logo name="claude.png" size={69}/></At><Text x={117} y={29} size={35}>Reusable instructions</Text>
   <svg width="670" height="304" style={{position:'absolute',inset:0}}><path d="M54 131V242H280" fill="none" stroke="#DBD8C8" strokeWidth="12" strokeLinecap="round"/><path d="M54 131V242H280" pathLength="1" strokeDasharray="1" strokeDashoffset={1-select} fill="none" stroke="#DEA053" strokeWidth="7" strokeLinecap="round"/><path d="M39 134H141" stroke="#7B8977" strokeWidth="12" strokeLinecap="round"/></svg>
   {['seedance.png','google.png','hailuo.png'].map((n,i)=><At key={n} x={145+i*80} y={111-24*Math.sin(e(u,4.05+i*.12,.43)*Math.PI)} style={{opacity:ready*(1-deliver),transform:`scale(${.8+.2*e(u,4.05+i*.12,.3)})`}}><Logo name={n} size={60}/></At>)}
   <At x={371} y={94} style={{opacity:1-deliver,transform:`translateX(${22*(1-select)}px)`}}><CineCamera t={u} shoot={shoot} w={239}/></At>
   <At x={301+save*10} y={100-save*10} style={{opacity:deliver,transform:`scale(${.82+.18*deliver}) rotate(${2*(1-save)}deg)`}}><Shot p={e(u,5.44,1.16)} w={325}/></At>
   <Text x={134} y={212} size={30} color={C.teal}>{save>.45?'video.mp4':ready>.5?'/fal-video':''}</Text>
   <svg width="80" height="50" style={{position:'absolute',left:556,top:241,opacity:save}}><path d="M5 8H26L34 15H74V43H5Z" fill="#E8BE78" stroke="#B18040" strokeWidth="3"/><path d="M27 30L37 38L56 20" fill="none" stroke="#376D53" strokeWidth="5"/></svg>
  </At>
  <Actor t={u} x={x} y={y} size={260} role="operator" walk={Math.sin(flight*Math.PI)} lift={.2+raise*.8} reach={raise} look={u<land?-1:1} contact={land} happy={u>land+.35} lean={-10*Math.sin(flight*Math.PI)+throwP*7*(1-ready)}/>
  <At x={lerp(802,1127,throwP)} y={lerp(579-raise*180,520,throwP)-Math.sin(throwP*Math.PI)*160} style={{opacity:raise*(1-ready),transform:`rotate(${-15+throwP*23}deg) scale(${1-throwP*.42})`}}><SkillFile t={t} size={155}/></At>
  <ChargeV20 t={u} at={land} x={694} y={709} size={310}/><ChargeV20 t={u} at={3.84} x={1180} y={560} size={260}/><ChargeV20 t={u} at={6.55} x={1660} y={613} size={210}/>
 </Set>;
};

/** The three visible tutorial chapters, not unrelated labels at frame bottom. */
export const RoadmapV21:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),beats=roadmapBeatsV13.map(n=>n*duration),p=e(t,beats[0],beats[2]-beats[0]);
 const route=(q:number)=>({x:320+1280*q,y:710-105*Math.sin(q*Math.PI*2)}),v=route(p),line=(end:number)=>Array.from({length:100},(_,i)=>{const q=route(end*i/99);return `${i?'L':'M'}${q.x} ${q.y}`}).join(' ');
 return <AbsoluteFill data-clean-roadmap style={{fontFamily:bodyFont,color:C.ink}}><AtmosphereV22 t={t}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d={line(1)} fill="none" stroke="#BA936334" strokeWidth="75" strokeLinecap="round" transform="translate(0 9)"/><path d={line(1)} fill="none" stroke="white" strokeWidth="69" strokeLinecap="round"/><path d={line(p)} fill="none" stroke="#E8A157" strokeWidth="14" strokeLinecap="round"/></svg>
  {[0,1,2].map(i=>{const on=easeOut(t,beats[i],.16),x=120+i*640;return <React.Fragment key={i}>
   <At x={x} y={102} style={{width:400,textAlign:'center'}}><div style={{fontSize:45,fontWeight:850,color:C.orange}}>STEP {i+1}</div><div style={{fontSize:43,fontWeight:850,lineHeight:1.17,marginTop:13}}>{roadmapTitlesV21[i]}</div></At>
   <At x={x+20} y={340} style={{width:360,height:275,transform:`translateY(${-8*recoil(t,beats[i])}px)`}}>
    <svg width="360" height="275"><ellipse cx="180" cy="248" rx="175" ry="23" fill="#A8906724"/><path d="M7 217V236C7 267 353 267 353 236V217" fill="#E8DEC9" stroke="white" strokeWidth="3"/><ellipse cx="180" cy="217" rx="173" ry="29" fill="#FFFDF6" stroke={on>.5?'#E7A05A':'#DDD1BE'} strokeWidth="4"/></svg>
    {i===0?<><At x={54} y={42}><Logo name="fal.png" size={91}/></At><At x={222} y={42}><Logo name="claude.png" size={91}/></At><svg width="360" height="275" style={{position:'absolute',inset:0}}><path d="M99 156V185Q99 206 122 206H242Q267 206 267 183V156" fill="none" stroke="#D8D9C6" strokeWidth="13"/><path d="M99 156V185Q99 206 122 206H242Q267 206 267 183V156" fill="none" stroke="#C59453" strokeWidth="9" pathLength="1" strokeDasharray="1" strokeDashoffset={1-on}/><path d="M91 146H107V166H91ZM259 146H275V166H259Z" fill="#456C60"/></svg></>:i===1?<At x={23} y={-18}><CineCamera t={t} shoot={on} w={316}/></At>:<><At x={11} y={33} style={{transform:`rotate(${-5*(1-on)}deg) translateY(${21*(1-on)}px)`}}><Shot p={on*.82} w={160}/></At><At x={184} y={33} style={{transform:`rotate(${5*(1-on)}deg) translateY(${-21*(1-on)}px)`}}><Shot p={on} w={160}/></At><svg width="360" height="275" style={{position:'absolute',inset:0}}><path d="M20 147H341" stroke="#7A9383" strokeWidth="6"/><path d="M179 18V151" stroke="#D39B52" strokeWidth="5"/><circle cx={lerp(26,332,on)} cy="169" r="12" fill="#E5B468"/><path d="M160 196H202M181 178V214" stroke="#9E8B69" strokeWidth="4"/></svg></>}
    <ChargeV20 t={t} at={beats[i]} x={180} y={145} size={285}/>
   </At>
  </React.Fragment>;})}
  <Actor t={t} x={v.x-101} y={v.y-140} size={202} role="courier" walk={Math.sin(p*Math.PI)} look={1} lift={.45} contact={beats[t<beats[1]?0:t<beats[2]?1:2]} happy={t>beats[2]}/>
 </AbsoluteFill>;
};
