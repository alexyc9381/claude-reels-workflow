import React from 'react';
import {AbsoluteFill,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Logo,SkillFile,C,lerp,clamp} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {Set,Shot,CineCamera} from './ScenesV19';
import {ProductionV20,ChargeV20} from './ScenesV20';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const Text:React.FC<{x:number;y:number;children:React.ReactNode;size?:number;color?:string}>=({x,y,children,size=43,color=C.ink})=><At x={x} y={y} style={{fontFamily:bodyFont,fontSize:size,fontWeight:800,color:color===C.orange?'#82390F':color,lineHeight:1.15,whiteSpace:'nowrap'}}>{children}</At>;
const recoil=(t:number,at:number)=>t<at?0:Math.sin((t-at)*18)*Math.exp(-6*(t-at));

/** Editorial octopus emblem. Eight separate tentacles and a clean dome
 * replace the rejected scalloped blob. The actual company mark stays intact. */
export const OctopusV22:React.FC<{t:number;hit:number;size?:number}>=({t,hit,size=440})=>{
 const fall=e(t,hit,.2),r=recoil(t,hit+.2),brace=e(t,hit-.5,.35);
 return <svg data-editorial-octopus width={size} height={size*.9} viewBox="0 0 340 306" style={{overflow:'visible'}}>
  <ellipse cx="170" cy="280" rx={123+fall*36} ry="13" fill="#4A4B2830"/>
  <g transform={'translate(170 277) scale('+(1+fall*.16-r*.025)+' '+(1-fall*.58+r*.04)+') translate(-170 -277)'}>
   {Array.from({length:8},(_,i)=>{
    const a=(i-3.5)*.32,root=170+Math.sin(a)*67,end=22+i*42,curl=(i<4?-1:1)*(23+10*brace),wave=(1-fall)*Math.sin(t*3.1+i*.8)*9+r*13;
    return <g key={i}><path d={'M'+root+' 182C'+(root+(i-3.5)*17)+' '+(231+wave)+' '+(end-curl)+' '+(293+wave)+' '+end+' 257Q'+(end+curl)+' '+(223+wave)+' '+(end+curl*.52)+' 212'} fill="none" stroke="#263E25" strokeWidth="30" strokeLinecap="round"/><path d={'M'+root+' 182C'+(root+(i-3.5)*17)+' '+(231+wave)+' '+(end-curl)+' '+(293+wave)+' '+end+' 257Q'+(end+curl)+' '+(223+wave)+' '+(end+curl*.52)+' 212'} fill="none" stroke={i%2?'#B4DA38':'#C8EA50'} strokeWidth="21" strokeLinecap="round"/><circle cx={end} cy="254" r="3.5" fill="#F0FBB0"/></g>;
   })}
   <path d="M91 169V114C91 17 249 17 249 114V169Q245 207 215 195Q193 217 170 198Q147 217 124 195Q94 207 91 169Z" fill="#C4E83F" stroke="#263E25" strokeWidth="7"/>
   <path d="M111 105Q113 59 158 56" fill="none" stroke="#EFFFAB" strokeWidth="10" strokeLinecap="round"/>
   <image href={staticFile('v3/higgsfield.jpg')} x="146" y="70" width="48" height="48"/>
   {fall<.45?<><path d="M132 141V162M208 141V162" stroke="#21391F" strokeWidth="11" strokeLinecap="round"/><path d="M149 181Q170 189 191 181" stroke="#21391F" strokeWidth="5" fill="none" strokeLinecap="round"/></>:<><path d="M122 143L145 165M145 143L122 165M196 143L219 165M219 143L196 165" stroke="#21391F" strokeWidth="8" strokeLinecap="round"/><path d="M150 187Q170 173 190 187" stroke="#21391F" strokeWidth="5" fill="none"/></>}
  </g>
 </svg>;
};

/** Two connected cost mechanisms. Prices belong to the physical bases;
 * no floating price/command/model label cloud. */
export const CostV22:React.FC<{duration:number;brandAt:number;bold?:boolean}>=({duration})=>{
 const t=clock(),u=t*7.6667/duration,flight=e(u,.38,1.2),home=e(u,2.02,1.5),lift=e(u,2.15,.48),send=e(u,3.55,.6),ready=e(u,4.15,.25),pay=e(u,4.4,.48),shoot=e(u,4.88,.55),deliver=e(u,5.44,1.0);
 const x=lerp(lerp(1050,332,flight),1075,home),y=lerp(lerp(475,340,flight)-Math.sin(flight*Math.PI)*195,465,home)-Math.sin(home*Math.PI)*130;
 const platform=(x:number,y:number,w:number,accent:string)=><At x={x} y={y}><svg width={w} height="242" viewBox={'0 0 '+w+' 242'}><defs><linearGradient id={'base-'+x} x2="0" y2="1"><stop stopColor="#FCF2DA"/><stop offset="1" stopColor="#C9BDA2"/></linearGradient></defs><path d={'M0 42Q'+w/2+' -38 '+w+' 42V194Q'+w/2+' 254 0 194Z'} fill={'url(#base-'+x+')'} stroke="#FFF8E6" strokeWidth="5"/><path d={'M5 54Q'+w/2+' 113 '+(w-5)+' 54'} fill="none" stroke={accent} strokeWidth="8"/>{[0,1,2].map(i=><circle key={i} cx={w-38} cy={101+i*29} r="7" fill={u>4.15+i*.22?accent:'#BCB7A3'}/>)}</svg></At>;
 return <Set t={t}>
  <At x={203} y={144} style={{display:'flex',alignItems:'center',gap:24}}><Logo name="higgsfield.jpg" size={103}/><span style={{fontSize:62,fontWeight:850}}>Higgsfield</span></At>
  <At x={1056} y={144} style={{display:'flex',alignItems:'center',gap:24}}><Logo name="claude.png" size={103}/><span style={{fontSize:62,fontWeight:850}}>Claude skill</span></At>
  {platform(152,752,674,'#829D43')}{platform(973,721,753,'#437D6C')}
  <At x={213} y={304}><OctopusV22 t={u} hit={1.58} size={570}/></At>
  <At x={248} y={831} style={{display:'flex',alignItems:'baseline',gap:15,fontWeight:850,color:'#293422',whiteSpace:'nowrap'}}><span style={{fontSize:84}}>$100</span><span style={{fontSize:36}}>/ month</span></At>
  <At x={1012} y={782} style={{lineHeight:1.05,fontWeight:850,color:'#275E4C',whiteSpace:'nowrap'}}><span style={{fontSize:87}}>~10¢</span><div style={{fontSize:29,marginTop:-4}}>per generation</div></At>
  <At x={1372} y={466} style={{opacity:1-deliver,transform:'translateY('+(-7*recoil(u,4.15))+'px)'}}><CineCamera t={u} shoot={shoot} w={356}/><svg width="356" height="95" style={{position:'absolute',top:-9,left:0}}><path d="M29 55V5H127V55" fill="#E9DBB7" stroke="#668471" strokeWidth="5"/><path d="M43 18H111" stroke="#617A62" strokeWidth="7"/><path d="M22 61H137" stroke="#668471" strokeWidth="9"/></svg></At>
  <Actor t={u} x={x} y={y} size={310} role="operator" walk={Math.sin(flight*Math.PI)+Math.sin(home*Math.PI)} lift={.2+lift*.8*(1-ready*.65)} reach={send} look={u<1.58?-1:1} contact={u<3.52?1.58:3.52} happy={u>1.9} lean={-12*Math.sin(flight*Math.PI)+8*Math.sin(home*Math.PI)}/>
  <At x={lerp(x+224,1397,send)} y={lerp(y-46,370,send)-Math.sin(send*Math.PI)*105} style={{opacity:lift*(1-ready),transform:'rotate('+(-9+send*9)+'deg) scale('+(1-send*.42)+')',transformOrigin:'50% 100%'}}><SkillFile t={t} size={151}/></At>
  <At x={lerp(1240,1493,pay)} y={lerp(844,490,pay)-Math.sin(pay*Math.PI)*65} style={{opacity:ready*(1-e(u,4.87,.15)),transform:'rotate('+(pay*130)+'deg)'}}><svg width="79" height="79"><circle cx="39" cy="39" r="35" fill="#EDC87D" stroke="#80643C" strokeWidth="4"/><circle cx="39" cy="39" r="27" fill="none" stroke="#FFF4D0" strokeWidth="3"/><text x="39" y="50" textAnchor="middle" fontFamily={bodyFont} fontSize="30" fontWeight="850" fill="#72512B">¢</text></svg></At>
  <At x={lerp(1579,1357,deliver)} y={lerp(563,407,deliver)} style={{opacity:deliver,transform:'scale('+(0.42+deliver*.58)+')',transformOrigin:'50% 50%',padding:11,background:'#EEF1D9',border:'4px solid #FFFDF0',borderRadius:17,boxShadow:'0 16px 30px #324E362B'}}><Shot p={e(u,5.44,1.7)} w={348}/></At>
  <ChargeV20 t={u} at={1.58} x={489} y={643} size={300}/><ChargeV20 t={u} at={4.15} x={1450} y={507} size={235}/><ChargeV20 t={u} at={4.88} x={1680} y={612} size={270}/>
 </Set>;
};

/** A physical stopwatch, not another choice badge or number in a card. */
export const StopwatchV22:React.FC<{t:number}>=({t})=>{
 const u=t-1.6,p=clamp(u/3),tick=Math.max(0,u)%1,press=Math.sin(clamp(tick/.17)*Math.PI);
 return <div data-opening-countdown data-countdown-language="mechanical-stopwatch" style={{position:'absolute',left:861,top:375,width:198,height:260,opacity:easeOut(u,0,.13)*(1-e(u,2.82,.18)),transform:'scale('+(1+.035*press)+')',filter:'drop-shadow(0 9px 13px #17232070)',fontFamily:bodyFont}}>
  <svg width="198" height="260" viewBox="0 0 220 286"><defs><linearGradient id="timer-metal"><stop stopColor="#7C756B"/><stop offset=".23" stopColor="#FFF5E4"/><stop offset=".56" stopColor="#D4B18B"/><stop offset="1" stopColor="#8F6A49"/></linearGradient></defs>
   <path d="M100 19V43H121V19" fill="#B29D83" stroke="#FFEDCA" strokeWidth="3"/><rect x="84" y={7+press*5} width="53" height="20" rx="6" fill="url(#timer-metal)" stroke="#FFF0D8" strokeWidth="3"/>
   <path d="M173 56L188 37L203 50L188 69" fill="url(#timer-metal)" stroke="#FFF0D8" strokeWidth="3"/>
   <circle cx="110" cy="148" r="99" fill="url(#timer-metal)" stroke="#FFF3DE" strokeWidth="4"/><circle cx="110" cy="148" r="87" fill="#FFF1D7" stroke="#B56332" strokeWidth="7"/>
   {Array.from({length:30},(_,i)=><path key={i} d={i%5===0?'M110 70V82':'M110 72V77'} transform={'rotate('+(i*12)+' 110 148)'} stroke="#866648" strokeWidth={i%5===0?3:1.5}/>)}
   <circle cx="110" cy="148" r="69" fill="none" stroke="#EDCBA2" strokeWidth="8"/><circle cx="110" cy="148" r="69" fill="none" stroke="#D06029" strokeWidth="8" pathLength="1" strokeDasharray="1" strokeDashoffset={p} transform="rotate(-90 110 148)"/>
   <g transform={'rotate('+(p*360)+' 110 148)'}><path d="M110 146V93" stroke="#C55E2D" strokeWidth="4" strokeLinecap="round"/><circle cx="110" cy="91" r="5" fill="#C55E2D"/></g>
   <text x="110" y="185" textAnchor="middle" fill="#241D15" fontFamily={bodyFont} fontWeight="850" fontSize="102">{Math.max(1,3-Math.floor(u))}</text>
  </svg>
 </div>;
};

export const FolderV22:React.FC<{open:number;w?:number;label?:string}>=({open,w=300,label='Downloads'})=><svg width={w} height={w*.7} viewBox="0 0 300 210" style={{overflow:'visible'}}><path d="M13 44V20H115L141 44H284V188H13Z" fill="#C98A46" stroke="#FFF1D4" strokeWidth="4"/><path d={'M13 82L'+(8-open*15)+' 191H284L'+(283+open*14)+' 82Z'} fill="#F2BE73" stroke="#FFF1D4" strokeWidth="4"/><path d="M32 104H268" stroke="#FFD99A" strokeWidth="4"/><text x="150" y="151" textAnchor="middle" fontFamily={bodyFont} fontSize="31" fontWeight="800" fill="#684221">{label}</text></svg>;

export const SavedOverlayV22:React.FC<{t:number;duration:number}>=({t,duration})=>{
 const u=t/duration,carry=e(u,.12,.37),drop=e(u,.49,.13),close=e(u,.62,.15),x=155+carry*335;
 return <><Text x={30} y={24} size={38} color={C.orange}>Keep the generated file</Text>
  <At x={605} y={174}><FolderV22 open={carry*(1-close)} w={228}/></At>
  <Actor t={t} x={x} y={128} size={185} role="courier" walk={Math.sin(carry*Math.PI)} lift={.8*(1-drop*.5)} look={1} contact={duration*.49} happy={close>.8}/>
  <Actor t={t} x={853} y={118} size={174} role="archivist" reach={drop} lift={.35} look={-1} contact={duration*.62} happy={close>.8}/>
  <At x={x+115+drop*75} y={85+drop*94} style={{opacity:1-close,transform:'rotate('+(-7*Math.sin(carry*Math.PI))+'deg) scale('+(1-drop*.23)+')',transformOrigin:'50% 100%'}}><SkillFile t={t} size={125} label="video"/></At>
  <At x={34} y={109} style={{opacity:close,transform:'translateY('+(14*(1-close))+'px)'}}><svg width="130" height="139"><path d="M10 8H87L120 41V130H10Z" fill="#F9E2B9" stroke="#B37B42" strokeWidth="3"/><path d="M87 8V41H120" fill="none" stroke="#B37B42" strokeWidth="3"/><path d="M47 55L82 77L47 99Z" fill={C.orange}/></svg><Text x={0} y={147} size={24}>video.mp4</Text></At>
  <ChargeV20 t={t} at={duration*.62} x={731} y={252} size={210}/>
 </>;
};

export const MixOverlayV22:React.FC<{t:number;duration:number}>=({t,duration})=>{
 const u=t/duration,adjust=e(u,.14,.57),deliver=e(u,.75,.17);
 return <><Text x={28} y={19} size={36} color={C.orange}>Voice · ambience · impact</Text>
  <Actor t={t} x={21} y={105} size={174} role="operator" look={1} reach={.3+adjust*.65} contact={duration*.71}/>
  <svg width="677" height="174" style={{position:'absolute',left:209,top:94}}><path d="M0 0H677V163H0Z" fill="#E9DCC5" stroke="#FFFAE8" strokeWidth="4"/>{[0,1,2].map(j=><g key={j} transform={'translate('+(j*224)+' 0)'}><path d="M17 132H202" stroke="#B4A58F" strokeWidth="7" strokeLinecap="round"/><rect x={25+(j===0?98:j===1?57:136)*adjust} y="118" width="30" height="27" rx="5" fill="#FFF9EB" stroke={C.orange} strokeWidth="3"/>{Array.from({length:12},(_,i)=>{const h=12+Math.abs(Math.sin(t*(j+2)+i*.61))*(43-15*adjust);return <rect key={i} x={16+i*16} y={64-h/2} width="8" height={h} rx="4" fill={[C.orange,C.teal,C.blue][j]}/>;})}<path d="M12 102H204" stroke="#F8F0D9" strokeWidth="3"/></g>)}</svg>
  <Actor t={t} x={890-25*deliver} y={102} size={165} role="archivist" look={-1} lift={.25+deliver*.45} contact={duration*.92} happy={deliver>.8}/>
  <svg width="108" height="98" style={{position:'absolute',left:918-25*deliver,top:83}}><path d="M12 59V38C12 0 96 0 96 38V59" stroke="#3C6156" strokeWidth="9" fill="none"/><rect x="4" y="48" width="18" height="37" rx="7" fill="#C58D4D"/><rect x="86" y="48" width="18" height="37" rx="7" fill="#C58D4D"/></svg>
 </>;
};
const LaptopV22:React.FC<{w:number;children?:React.ReactNode}>=({w,children})=><div style={{position:'relative',width:w,height:w*.75}}><div style={{position:'absolute',inset:'0 5% 20%',borderRadius:22,background:'#FBF3E3',border:'5px solid #FFF7E8',boxShadow:'0 22px 35px #64341B30',overflow:'hidden'}}>{children}</div><svg width={w} height={w*.2} style={{position:'absolute',top:'79%'}} viewBox="0 0 700 140"><path d="M37 0H663L697 53H3Z" fill="#D7C9B7" stroke="#FFF9EB" strokeWidth="4"/><path d="M3 54H697" stroke="#9A8268" strokeWidth="11"/><path d="M254 13H446L462 34H238Z" fill="#BDA78C"/>{[0,1,2].map(i=><path key={i} d={'M'+(55+i*10)+' '+(9+i*11)+'H'+(645-i*10)} stroke="#AA9277" strokeWidth="2"/>)}</svg></div>;

export const ProductionV22:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.6667/duration;
 if(u<2.7)return <ProductionV20 duration={duration}/>;
 const enter=e(u,2.7,.35),aim=e(u,2.84,.55),shoot=e(u,4.4,.65),carry=e(u,6.04,.71),drop=e(u,6.75,.42),close=e(u,7.17,.48);
const actorX=lerp(711,1105,carry),actorY=601-8*Math.sin(carry*Math.PI),fileX=carry<1?actorX+134:lerp(1239,1418,drop),fileY=carry<1?actorY-143:lerp(458,350,drop);
 return <Set t={t}>
  <At x={135} y={107} style={{display:'flex',gap:24,alignItems:'center'}}><Logo name="claude.png" size={93}/><span style={{fontSize:56,fontWeight:800}}>Your prompt → your video</span></At>
  <div style={{opacity:enter}}>
   <At x={177} y={300} style={{transform:'translateY('+(35*(1-enter))+'px)'}}><CineCamera t={t} shoot={shoot} w={560}/></At>
   <At x={747} y={309} style={{display:'flex',gap:19,opacity:1-shoot}}>{['seedance.png','google.png','hailuo.png'].map((n,i)=><At key={n} x={i*99} y={-23*Math.sin(e(u,2.85+i*.22,.43)*Math.PI)}><Logo name={n} size={80}/></At>)}</At>
   <At x={1110} y={258}><LaptopV22 w={651}><At x={27} y={24}><Logo name="claude.png" size={55}/></At><Text x={105} y={31} size={34}>Your computer</Text><At x={315} y={170}><FolderV22 open={carry*(1-close)} w={220}/></At><At x={54} y={99} style={{opacity:close,transform:'translateY('+(18*(1-close))+'px)'}}><div style={{border:'3px solid white',borderRadius:12,overflow:'hidden'}}><Shot p={e(u,7.17,1.3)} w={201}/></div><Text x={0} y={125} size={25}>video.mp4</Text></At></LaptopV22></At>
   <Actor t={t} x={125+aim*27} y={609} size={244} role="operator" look={1} reach={aim} lift={.4+shoot*.4} contact={4.4*duration/8.6667} happy={shoot>.9}/>
   <Actor t={t} x={actorX} y={actorY} size={258} role="courier" look={1} lift={shoot*.92*(1-drop*.6)} reach={drop} walk={Math.sin(carry*Math.PI)} contact={6.75*duration/8.6667} happy={close>.7}/>
   <At x={lerp(547,fileX,shoot)} y={lerp(371,fileY,shoot)} style={{opacity:shoot*(1-close),transform:'scale('+(1-.28*drop)+') rotate('+(-5*Math.sin(carry*Math.PI))+'deg)',transformOrigin:'50% 100%'}}><div style={{padding:9,border:'3px solid #FFF8E7',borderRadius:15,background:'#D7E3C7',boxShadow:'0 14px 25px #543B2230'}}><Shot p={e(u,4.4,1.58)} w={267}/></div></At>
   <ChargeV20 t={u} at={4.4} x={709} y={485} size={260}/><ChargeV20 t={u} at={7.17} x={1435} y={532} size={300}/>
   <Text x={171} y={912} size={46} color={C.orange}>{u<6.04?'Generate with the model':'Saved on your computer'}</Text>
  </div>
 </Set>;
};

export const GuideV22:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,press=e(u,.1,.09),copy=e(u,.24,.14),send=e(u,.43,.16),ready=e(u,.59,.13),run=e(u,.74,.18);
 return <Set t={t}>
  <Text x={145} y={102} size={78} color={C.orange}>FREE setup</Text><Text x={150} y={205} size={37}>In the description ↓</Text>
  <Glass x={147} y={328} w={561} h={358} t={t} frost={.6}><Text x={30} y={27} size={35}>fal-video.skill</Text><At x={35} y={103}><SkillFile t={t} size={146}/></At><At x={240} y={132} style={{padding:'21px 28px',borderRadius:16,background:'#EAB477',border:'3px solid #FFF7E5',fontSize:36,fontWeight:800,transform:'scale('+(1-.08*Math.sin(press*Math.PI))+')'}}>Copy setup</At><svg width="84" height="86" style={{position:'absolute',right:72,bottom:21}}><path d="M22 5H69V60H22ZM9 18V74H57" stroke={C.orange} strokeWidth="5" fill="none"/></svg></Glass>
  <At x={1044} y={271}><LaptopV22 w={689}><At x={24} y={24}><Logo name="claude.png" size={65}/></At><Text x={110} y={38} size={38}>Claude</Text><At x={33} y={150} style={{width:530,height:161,border:'3px dashed #C88A50',borderRadius:17,background:'#FAE6C9'}}><Text x={25} y={31} size={35}>{ready>.8?'Skill installed':'Add the skill'}</Text><Text x={25} y={90} size={30} color={C.teal}>{ready>.8?'/fal-video':''}</Text></At><Actor t={t} x={386-run*33} y={123} size={170} role="archivist" look={-1} lift={send*.8} reach={ready} contact={duration*.59} happy={ready>.8}/><At x={40} y={327} style={{opacity:run,width:510,height:46}}><svg width="510" height="46"><rect x="0" y="0" width="507" height="43" rx="13" fill="#EFE2C8" stroke="#D5BD99" strokeWidth="2"/><path d="M18 22H429" stroke="#557B65" strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-run}/><path d="M466 30L477 16L488 30M477 16V35" fill="none" stroke="#557B65" strokeWidth="4" strokeLinecap="round"/><path d={"M"+(18+411*run)+" 11v22"} stroke="#D07438" strokeWidth="3"/></svg></At></LaptopV22></At>
  <Actor t={t} x={lerp(590,802,send)} y={522-24*Math.sin(copy*Math.PI)} size={259} role="courier" look={1} lift={copy*.92} reach={press*(1-copy)+send} walk={Math.sin(send*Math.PI)} contact={duration*.38} happy={ready>.9}/>
  <At x={lerp(692,1447,send)} y={lerp(414,451,send)-Math.sin(send*Math.PI)*156} style={{opacity:copy*(1-ready),transform:'rotate('+(-8+send*15)+'deg) scale('+(1-send*.34)+')',transformOrigin:'50% 100%'}}><SkillFile t={t} size={192}/></At>
  <ChargeV20 t={t} at={duration*.24} x={505} y={510} size={250}/><ChargeV20 t={t} at={duration*.59} x={1481} y={467} size={330}/>
  <At x={160} y={872} style={{display:'flex',alignItems:'center',gap:25}}>{['claude.png','codex.svg','cursor.svg'].map((n,i)=><div key={n} style={{transform:'translateY('+(-9*Math.sin(e(u,.76+i*.04,.12)*Math.PI))+'px)'}}><Logo name={n} size={75}/></div>)}<span style={{fontSize:32,fontWeight:750}}>Claude Code · Codex · Cursor</span></At>
 </Set>;
};

/** Different, local jobs during longer explanations, not a floating mascot. */
export const ReceiverV22:React.FC<{t:number;duration:number;kind:'wrapper'|'direct'|'skill'}>=({t,duration,kind})=>{
 const u=t/duration;
 if(kind==='wrapper'){const walk=e(u,.65,.18),tryGate=e(u,.83,.12);return <><svg width="240" height="82" style={{position:'absolute',left:1595,top:710,opacity:walk}}><path d="M0 0H230V12H0Z" fill="#D8BA85" stroke="#FFF2CE" strokeWidth="3"/><path d="M27 14V73M209 14V73" stroke="#637D65" strokeWidth="9"/></svg><Actor t={t} x={1680-walk*65} y={535-tryGate*8} size={185} role="archivist" look={-1} reach={tryGate} walk={Math.sin(walk*Math.PI)} contact={duration*.95} opacity={walk}/></>;}
 if(kind==='direct'){const take=e(u,.78,.09),move=e(u,.87,.10);return <><Actor t={t} x={1144-260*move} y={790} size={203} role="courier" look={-1} lift={take*.9} walk={Math.sin(move*Math.PI)} contact={duration*.87} happy={move>.8} opacity={take}/><At x={1174-260*move} y={741} style={{opacity:take,transform:'rotate('+(-7*Math.sin(move*Math.PI))+'deg)'}}><FolderV22 w={158} open={1-move} label="Video"/></At></>;}
 const run=e(u,.84,.12);return <><Actor t={t} x={1457} y={497} size={184} role="operator" look={-1} reach={run} contact={duration*.91} happy={run>.8} opacity={e(u,.72,.06)}/><At x={1195} y={672} style={{opacity:run}}><svg width="213" height="33"><path d="M0 17H192" stroke="#D1BC94" strokeWidth="9" strokeLinecap="round"/><path d="M0 17H192" pathLength="1" strokeDasharray="1" strokeDashoffset={1-run} stroke={C.orange} strokeWidth="9" strokeLinecap="round"/><path d="M185 5L202 17L185 29" fill="none" stroke={C.orange} strokeWidth="5"/></svg></At></>;
};

/** A closing install + a real camera-recipe bonus. Never the same intro scene. */
export const OutroV22:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,pull=e(u,.06,.16),carry=e(u,.24,.24),insert=e(u,.49,.14),bonus=e(u,.68,.17),finish=e(u,.86,.1);
 const x=lerp(586,922,carry),y=513-15*Math.sin(carry*Math.PI);
 return <Set t={t}>
  <Text x={140} y={91} size={72}>FREE setup</Text><Text x={145} y={180} size={42} color={C.orange}>In the description below ↓</Text>
  <Glass x={145} y={325} w={470} h={328} t={t} frost={.5}><At x={28} y={27}><Logo name="claude.png" size={67}/></At><Text x={116} y={42} size={33}>fal-video.skill</Text><At x={54} y={127}><SkillFile t={t} size={119}/></At><Text x={220} y={182} size={34} color={C.orange}>Download ↓</Text></Glass>
  <At x={1115} y={270}><LaptopV22 w={650}><At x={23} y={23}><Logo name="claude.png" size={62}/></At><Text x={110} y={39} size={37}>Claude</Text><At x={31} y={128} style={{width:516,height:158,border:'3px dashed #BB844D',borderRadius:17,background:'#FAE8CC'}}><Text x={27} y={27} size={35}>{insert>.85?'Ready to create':'Drop the skill here'}</Text><Text x={27} y={91} size={32} color={C.teal}>{insert>.85?'/fal-video':''}</Text></At><Actor t={t} x={382} y={135} size={175} role="operator" look={-1} lift={insert*.7} reach={finish} contact={duration*.63} happy={insert>.9}/></LaptopV22></At>
  <Actor t={t} x={270-70*bonus} y={580} size={232} role="archivist" look={1} reach={pull} lift={pull*.6} contact={duration*.22} opacity={1-bonus}/>
  <Actor t={t} x={x} y={y} size={271} role="courier" look={1} walk={Math.sin(carry*Math.PI)} lift={pull*.93} reach={insert} contact={duration*.48} happy={insert>.9}/>
  <At x={insert>0?lerp(x+133,1510,insert):x+133} y={insert>0?lerp(y-100,420,insert)-Math.sin(insert*Math.PI)*90:y-100} style={{opacity:pull*(1-e(u,.62,.04)),transform:'scale('+(1-insert*.4)+')',transformOrigin:'50% 100%'}}><SkillFile t={t} size={179}/></At>
  <At x={963} y={881} style={{display:'flex',gap:26,alignItems:'center'}}>{['claude.png','codex.svg','cursor.svg'].map(n=><Logo key={n} name={n} size={76}/>)}</At>
  <At x={147} y={782} style={{opacity:bonus,transform:'translateY('+(50*(1-bonus))+'px)'}}><Glass x={0} y={0} w={694} h={233} t={t} frost={.7}><Text x={25} y={22} size={34} color={C.orange}>FREE BONUS</Text><Text x={26} y={71} size={27}>Camera-direction recipes</Text>{[0,1,2].map(i=><At key={i} x={30+i*216} y={118-10*Math.sin(e(u,.72+i*.055,.1)*Math.PI)} style={{transform:'rotate('+((i-1)*4*(1-finish))+'deg)'}}><Shot p={clamp(bonus*(1-i*.15))} w={190}/></At>)}</Glass></At>
  <ChargeV20 t={t} at={duration*.63} x={1520} y={472} size={325}/><ChargeV20 t={t} at={duration*.85} x={522} y={896} size={205}/>
 </Set>;
};
