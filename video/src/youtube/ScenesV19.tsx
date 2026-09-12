import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Logo,SkillFile,Key,Lens,C,lerp,BrandedBackground} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {roadmapBeatsV13} from './ScenesV13';
import {InstallFinaleV12} from './ScenesV12';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const recoil=(t:number,at:number)=>t<at?0:Math.sin((t-at)*18)*Math.exp(-(t-at)*7);
const pulse=(t:number,at:number)=>t<at?0:Math.exp(-(t-at)*5);
/** Local short-form lineage: ClaudeCrewReel practical cone + WorldKit depth.
 * Light follows a narrated subject, never an unrelated perpetual sweep. */
const Light:React.FC<{x:number;power:number;color?:string}>=({x,power,color='#FFD6A2'})=><At x={x-430} y={20} style={{width:860,height:845,opacity:power,pointerEvents:'none'}}><svg width="860" height="845"><defs><linearGradient id={'cone'+x} x2="0" y2="1"><stop stopColor={color} stopOpacity=".82"/><stop offset="1" stopColor={color} stopOpacity=".02"/></linearGradient></defs><path d="M398 26H462L856 760H4Z" fill={`url(#cone${x})`}/><ellipse cx="430" cy="766" rx="418" ry="61" fill={color} opacity=".3"/><path d="M376 12H484L465 40H395Z" fill="#665B4A"/><path d="M396 41H465" stroke="#FFFBEA" strokeWidth="9"/></svg></At>;
const Set:React.FC<{t:number;children:React.ReactNode}>=({t,children})=><AbsoluteFill style={{fontFamily:bodyFont,color:C.ink,overflow:'hidden'}}><BrandedBackground t={t}/><svg width="1920" height="1080" style={{position:'absolute',inset:0}}><defs><linearGradient id="v19-floor" x2="0" y2="1"><stop stopColor="#E8CBB15C"/><stop offset="1" stopColor="#FFFAEE"/></linearGradient></defs><path d="M0 748Q960 875 1920 748V1080H0Z" fill="url(#v19-floor)"/><path d="M0 748Q960 875 1920 748" fill="none" stroke="#FFFDF6" strokeWidth="4"/>{[0,1,2].map(i=><path key={i} d={`M${52+i*25} 115V631Q${52+i*25} 711 165 724M${1868-i*25} 115V631Q${1868-i*25} 711 1755 724`} fill="none" stroke="#A5744630" strokeWidth="3"/>)}</svg>{children}</AbsoluteFill>;
const Contact:React.FC<{x:number;y:number;t:number;at:number}>=({x,y,t,at})=><At x={x-95} y={y-95} style={{opacity:pulse(t,at),transform:`scale(${1+easeOut(t,at,.4)})`,pointerEvents:'none'}}><svg width="190" height="190">{[0,1,2,3,4,5].map(i=><path key={i} d="M95 20V42" transform={`rotate(${i*60} 95 95)`} stroke={C.orange} strokeWidth="6" strokeLinecap="round"/>)}</svg></At>;

/** Editorial mascot, not an official Higgsfield brand asset. Ticket-like lime
 * body, projecting lens eyes, waistcoat and articulated stamping arm. */
const HiggsSprite:React.FC<{t:number;stamp:number;size?:number}>=({t,stamp,size=310})=>{
 const hit=Math.sin(stamp*Math.PI),blink=t%3.8<.13?.15:1;
 return <svg width={size} height={size} viewBox="0 0 310 310" style={{overflow:'visible',transform:'scaleX(-1)'}}><ellipse cx="155" cy="289" rx="113" ry="14" fill="#3B432028"/><g transform={`translate(0 ${hit*7})`}>
 <path d="M88 234L81 278H122L127 240M182 240L190 278H230L220 233" fill="#53543B" stroke="#363B2A" strokeWidth="6" strokeLinejoin="round"/>
 <path d="M60 122Q25 151 44 211L76 195" fill="none" stroke="#A4BC38" strokeWidth="26" strokeLinecap="round"/>
 <g transform={`rotate(${-42+hit*66} 248 143)`}><path d="M240 145Q283 165 282 221" fill="none" stroke="#A4BC38" strokeWidth="27" strokeLinecap="round"/><path d="M263 203H302V238H263Z" fill="#53543B"/><rect x="253" y="234" width="59" height="16" rx="5" fill="#303625"/></g>
 <path d="M72 67Q154 35 239 69L251 238Q158 270 60 235Z" fill="#C7DC62" stroke="#879D35" strokeWidth="5"/><path d="M72 192L146 227L239 187L246 238Q155 270 65 234Z" fill="#65704B"/>
 <path d="M142 225L158 247L171 225L159 203Z" fill="#EEE8C5"/>
 {[114,192].map(x=><g key={x}><circle cx={x} cy="126" r="29" fill="#EBF2C4" stroke="#768637" strokeWidth="5"/><ellipse cx={x+4} cy="127" rx="9" ry={16*blink} fill="#303625"/></g>)}
 <path d="M140 166Q156 175 173 166" fill="none" stroke="#4B5D2C" strokeWidth="5" strokeLinecap="round"/><path d="M84 66L102 38H211L232 70" fill="#677149"/><path d="M73 70H242" stroke="#445232" strokeWidth="10" strokeLinecap="round"/>
 </g></svg>;
};

export const CostV19:React.FC<{duration:number;brandAt:number;bold?:boolean}>=({duration,brandAt})=>{
 const t=clock(),inP=easeOut(t,0,.32),left=e(t,brandAt-.18,.38),turns=[brandAt+.4,brandAt+1.55,brandAt+2.7],stamp=turns.reduce((v,at)=>v+e(t,at,.32),0)%1;
 return <Set t={t}>
  <Light x={490} power={.32+.68*left}/><Light x={1440} power={.6-.38*left} color="#DAEAD4"/>
  <div style={{position:'absolute',left:958,top:130,height:585,width:2,background:'linear-gradient(transparent,#AD927961,transparent)'}}/>
  {[0,1].map(i=><At key={i} x={i?1085:147} y={118} style={{display:'flex',alignItems:'center',gap:26}}><Logo name={i?'claude.png':'higgsfield.jpg'} size={118}/><span style={{fontSize:57,fontWeight:820}}>{i?'Claude skill':'Higgsfield'}</span></At>)}
  <At x={156} y={290} style={{opacity:inP,transform:`translateY(${40*(1-inP)}px)`}}>
   {[2,1,0].map(i=><div key={i} style={{position:'absolute',left:9*i,top:12*i,width:470,height:321,borderRadius:20,background:i?'#CDBB9D':'#FFFCF1',border:'3px solid #FFF',boxShadow:'0 14px 25px #443A2020',transform:`rotate(${i*2}deg)`}}/>)}
   <div style={{position:'absolute',left:0,top:0,width:470,height:67,borderRadius:'20px 20px 0 0',background:'#778144'}}/>
   {[78,381].map(x=><div key={x} style={{position:'absolute',left:x,top:-19,width:16,height:59,borderRadius:10,background:'linear-gradient(90deg,#B4B7A0,#FFF,#A8AA94)',border:'2px solid #828A60'}}/>)}
   <div style={{position:'absolute',left:32,top:78,fontSize:142,fontWeight:850,letterSpacing:-7}}>$100</div><div style={{position:'absolute',left:43,top:248,fontSize:42,fontWeight:650,whiteSpace:'nowrap'}}>/ month</div>
   {turns.map(at=>{const p=e(t,at,.55);return <div key={at} style={{position:'absolute',left:21,top:73,width:420,height:241,borderRadius:8,background:'#FEFCF3',borderBottom:'2px solid #D8CDAA',backfaceVisibility:'hidden',opacity:t<at?0:1-e(t,at+.21,.14),transform:`perspective(700px) rotateX(${-150*p}deg) translateY(${-20*p}px)`,transformOrigin:'50% 0%'}}><svg width="420" height="241">{[0,1,2].map(i=><path key={i} d={`M35 ${50+i*62}H380`} stroke="#D6D6B2" strokeWidth="4"/>)}{[0,1,2,3,4].map(i=><path key={i} d={`M${64+i*70} 22V212`} stroke="#D6D6B2" strokeWidth="4"/>)}</svg></div>;})}
  </At>
  <At x={558} y={362}><HiggsSprite t={t} stamp={stamp}/></At>
  <At x={1120} y={287} style={{opacity:inP}}><div style={{fontSize:155,fontWeight:850,letterSpacing:-7,color:'#327754'}}>~10¢</div><div style={{fontSize:43,fontWeight:650}}>/ generation</div></At>
  <At x={1200} y={620} style={{transform:`rotate(${-9+e(t,.4,.55)*9}deg) translateY(${-15*e(t,.4,.55)}px)`}}><SkillFile t={t} size={145}/></At>
  <Actor t={t} x={1420} y={473} size={255} role="operator" look={-1} lift={.48} reach={e(t,.5,.5)} contact={1}/>
  <At x={1058} y={600}><svg width="95" height="95"><circle cx="47" cy="47" r="40" fill="#F7D37E" stroke="#C58C38" strokeWidth="5"/><circle cx="47" cy="47" r="31" fill="none" stroke="#FFF1B3" strokeWidth="3"/><text x="47" y="62" textAnchor="middle" fontFamily={bodyFont} fontSize="43" fontWeight="800" fill="#875119">¢</text></svg></At>
 </Set>;
};

/** An animated shot sketch, not example footage. Rooftops, a leaping subject,
 * parallax skyline and a tracking reticle explain a directed generation. */
const Shot:React.FC<{p:number;w?:number}>=({p,w=560})=>{
 const q=Math.max(0,Math.min(1,p)),x=120+q*310,y=215-130*Math.sin(q*Math.PI);
 return <svg width={w} height={w*.57} viewBox="0 0 560 320"><defs><linearGradient id="v19-sky" x2="0" y2="1"><stop stopColor="#395F66"/><stop offset="1" stopColor="#A8D7C2"/></linearGradient></defs><rect width="560" height="320" rx="17" fill="url(#v19-sky)"/>
  <g opacity=".37" transform={`translate(${-q*22} 0)`}>{[0,1,2,3,4,5,6,7].map(i=><g key={i}><path d={`M${i*85-10} 295V${90+i%3*28}H${i*85+48}V295`} fill="#264D58"/>{[0,1,2].map(j=><path key={j} d={`M${i*85+3} ${115+j*37+i%3*28}h21`} stroke="#DEE8BA" strokeWidth="9"/>)}</g>)}</g>
  <path d="M0 246H168V320H0M382 247H560V320H382" fill="#DDDFBD"/><path d="M0 246H168M382 247H560" stroke="#FFF9DF" strokeWidth="9"/><path d="M125 204Q275 16 434 207" fill="none" stroke="#F4C775" strokeWidth="3" strokeDasharray="7 9" opacity=".7"/>
  <g transform={`translate(${x} ${y}) rotate(${-15+q*25})`} stroke="#FEF8E5" strokeLinecap="round"><circle cy="-33" r="12" fill="#FEF8E5" stroke="none"/><path d="M0 -16L-7 18M-1 -8L-31 -26M0 -5L30 -25M-7 18L-29 36M-7 18L21 32" fill="none" strokeWidth="11"/></g>
  <g transform={`translate(${x-52} ${y-64})`} fill="none" stroke="#FFD28A" strokeWidth="3"><path d="M0 21V0H21M83 0H104V21M104 93V114H83M21 114H0V93"/></g>
 </svg>;
};
/** Detailed camera prop: iris, focus ring, clapper, rails, tripod. */
const CineCamera:React.FC<{t:number;shoot:number;w?:number}>=({t,shoot,w=560})=><svg width={w} height={w*.8} viewBox="0 0 560 448"><defs><linearGradient id="v19-camera"><stop stopColor="#60766B"/><stop offset=".6" stopColor="#233F3A"/><stop offset="1" stopColor="#557264"/></linearGradient></defs>
 <path d="M277 306L199 436M285 307L368 436M282 307V441" stroke="#6A7665" strokeWidth="12" strokeLinecap="round"/><path d="M188 310H381" stroke="#BEA476" strokeWidth="11"/><rect x="111" y="104" width="293" height="202" rx="27" fill="url(#v19-camera)" stroke="#E4E7C7" strokeWidth="5"/><path d="M156 102V65H282V103" fill="none" stroke="#546758" strokeWidth="17"/>
 <rect x="129" y="143" width="133" height="80" rx="9" fill="#B7D7BB"/><path d="M148 197L175 169L196 186L237 156" fill="none" stroke="#456F54" strokeWidth="5"/><circle cx="148" cy="260" r="10" fill={shoot>0?'#ECA85B':'#98A491'}/><path d="M178 260H230M280 260H320" stroke="#A8B4A1" strokeWidth="5"/>
 <path d="M349 140H448L468 161V254L446 272H349Z" fill="#677D67" stroke="#D1D9B5" strokeWidth="4"/>{[0,1,2,3].map(i=><path key={i} d={`M${362+i*19} 147V265`} stroke="#1F4039" strokeWidth="7"/>)}<ellipse cx="459" cy="204" rx="58" ry="89" fill="#DFDDC1" stroke="#FFFFE9" strokeWidth="4"/><ellipse cx="463" cy="204" rx="44" ry="72" fill="#204F54"/><ellipse cx="466" cy="204" rx={18+shoot*8} ry={40+shoot*9} fill="#7CC8B8"/><ellipse cx="475" cy="180" rx="11" ry="25" fill="#F4F6D1" opacity=".7"/>
 <g transform={`rotate(${-22*(1-shoot)} 111 98)`}><path d="M111 83H385V108H111Z" fill="#F7E7C9"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M${124+i*45} 84L${145+i*45} 106`} stroke="#527061" strokeWidth="19"/>)}</g>
 </svg>;

export const ProductionV19:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8.6667/duration,open=e(u,.12,.65),aim=e(u,2.84,.6),shoot=e(u,4.1,.3),generate=e(u,4.4,1.55),save=e(u,6.04,.7),land=e(u,6.75,.5);
 return <Set t={t}>
  <Light x={550} power={.5*(1-aim)+.2}/><Light x={1380} power={.2+.6*aim}/>
  <At x={155} y={110} style={{display:'flex',alignItems:'center',gap:22}}><Logo name="claude.png" size={107}/><span style={{fontSize:58,fontWeight:800}}>Claude skill</span></At>
  <At x={248} y={318} style={{transform:`perspective(1000px) rotateY(${-25*(1-open)}deg)`,transformOrigin:'0 50%'}}><svg width="627" height="366"><path d="M12 25Q162 -5 307 33Q462 -5 613 25V324Q461 295 307 341Q162 295 12 324Z" fill="#FFFBE9" stroke="#BAA07E" strokeWidth="4"/><path d="M307 33V341" stroke="#C8AF89" strokeWidth="5"/><path d="M36 45Q160 22 282 48M335 48Q457 22 586 44" fill="none" stroke="#E0CDB0" strokeWidth="3"/>
   <g opacity={open}><path d="M49 242H137V142H235V242M357 239H430V159H531V239" fill="none" stroke="#7C9B82" strokeWidth="6" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(u,.4,.7)}/><path d="M148 171Q292 16 439 188" fill="none" stroke={C.orange} strokeWidth="7" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(u,1.1,1.55)}/><path d="M421 162L440 189L410 191" fill="none" stroke={C.orange} strokeWidth="7" opacity={e(u,2.45,.2)}/><g style={{opacity:e(u,.75,.3),transform:`translateY(${-8*Math.sin(e(u,1.1,1.55)*Math.PI)}px)`}}><circle cx="289" cy="131" r="12" fill="#456E5C"/><path d="M288 147L283 183M288 153L258 142M288 153L312 142M283 183L258 197M283 183L309 199" stroke="#456E5C" strokeWidth="9" strokeLinecap="round"/></g></g></svg></At>
  <Actor t={t} x={80+aim*100} y={618} size={290} role="operator" look={1} lift={.7} reach={open} contact={duration*4.4/8.6667} happy={generate>.9}/>
  <At x={1030} y={295} style={{opacity:1-e(u,4.4,.25),transform:`translateX(${60*(1-aim)}px) scale(${1-.1*save})`,transformOrigin:'50% 70%'}}><CineCamera t={t} shoot={shoot}/></At>
  <At x={907} y={193} style={{opacity:aim*(1-save),display:'flex',gap:28}}>{['seedance.png','google.png','hailuo.png'].map((n,i)=><div key={n} style={{transform:`translateY(${30*(1-e(u,2.84+i*.15,.28))}px)`}}><Logo name={n} size={82}/></div>)}</At>
  <At x={1060-save*70} y={348-save*97} style={{opacity:easeOut(u,4.65,.2),transform:`scale(${.67+.33*save}) translateY(${-10*recoil(u,6.75)}px)`,transformOrigin:'50% 50%'}}>
   <div style={{padding:17,borderRadius:25,background:'linear-gradient(125deg,#FFFFFF,#E2D5B7)',boxShadow:'0 22px 38px #44382030',border:'3px solid #FFF'}}><Shot p={generate} w={644}/></div>
   <svg width="682" height="145" style={{position:'absolute',left:0,top:389,opacity:save}}><path d="M21 3H661L680 41H1Z" fill="#D1D3BD" stroke="#FFF" strokeWidth="3"/><path d="M278 5H402L417 24H263Z" fill="#949F8C"/><path d="M1 42H680" stroke="#737F6B" strokeWidth="6"/></svg>
  </At>
  <At x={1020} y={711} style={{opacity:land,display:'flex',alignItems:'center',gap:18,transform:`translateY(${35*(1-land)}px)`}}><svg width="70" height="62"><path d="M5 16H30L39 7H66V57H5Z" fill="#DEB660" stroke="#FFF" strokeWidth="3"/><path d="M27 37L36 46L53 28" fill="none" stroke="#587749" strokeWidth="5"/></svg><span style={{fontSize:34,fontWeight:750}}>Saved locally</span></At>
  <Contact x={1282} y={372} t={u} at={4.4}/>
 </Set>;
};

// Exact position function is shared by route draw and courier. Arc-length
// reveal is NOT substituted for route progress (different clocks drift).
export const routeV19=(p:number)=>({x:325+1270*p,y:610-170*Math.sin(p*Math.PI*2)});
export const RoadmapV19:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),beats=roadmapBeatsV13.map(b=>b*duration),p=e(t,beats[0],beats[2]-beats[0]),q=routeV19(p),stage=t<beats[1]?0:t<beats[2]?1:2;
 const route=(end:number)=>Array.from({length:121},(_,i)=>{const a=routeV19(end*i/120);return `${i?'L':'M'}${a.x} ${a.y}`}).join(' ');
 return <Set t={t}>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d={route(1)} fill="none" stroke="#92724A20" strokeWidth="105" strokeLinecap="round" transform="translate(0 16)"/><path d={route(1)} fill="none" stroke="#FFFFF5" strokeWidth="88" strokeLinecap="round"/><path d={route(1)} fill="none" stroke="#D9C09C" strokeWidth="3" strokeDasharray="9 13"/><path d={route(p)} fill="none" stroke={C.orange} strokeWidth="10" strokeLinecap="round"/></svg>
  {[0,.5,1].map((v,i)=>{const a=routeV19(v),on=easeOut(t,beats[i],.16);return <React.Fragment key={i}><At x={a.x-200} y={i===1?130:205} style={{width:400,height:270,opacity:stage===i?1:.6+.25*on,transform:`translateY(${-13*recoil(t,beats[i])}px)`}}>
   {i===0?<><At x={142} y={30}><Logo name="fal.png" size={143}/></At><At x={-10+on*47} y={70}><Key t={t} size={204}/></At></>:i===1?<><At x={157} y={29}><Logo name="claude.png" size={151}/></At><At x={12+on*120} y={52-on*12} style={{opacity:1-on*.85,transform:`scale(${1-on*.35})`}}><SkillFile t={t} size={166}/></At></>:<At x={24} y={-8}><CineCamera t={t} shoot={on} w={340}/></At>}
   <Contact x={200} y={122} t={t} at={beats[i]}/>
  </At><At x={a.x-185} y={755} style={{width:370,textAlign:'center'}}><div style={{fontSize:29,fontWeight:750,color:C.orange,marginBottom:9}}>0{i+1}</div><div style={{fontSize:49,fontWeight:820}}>{['Connect','Load skill','Generate'][i]}</div><div style={{height:5,width:250,margin:'17px auto',borderRadius:3,background:C.orange,transform:`scaleX(${on})`}}/></At></React.Fragment>;})}
  <Actor t={t} x={q.x-112} y={q.y-138} size={224} role="courier" walk={Math.sin(p*Math.PI)} lift={.4} look={1} contact={beats[stage]} happy={stage===2}/>
 </Set>;
};

/** Cancel the subscription lane, then operate a direct model camera. Budget
 * tokens depict allocation, not a claimed number of purchasable generations. */
export const DirectRouteV19:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,first=e(u,.04,.055),penLift=e(u,.095,.03),second=e(u,.125,.065),cancel=(first+second)/2,switchP=e(u,.25,.10),fund=e(u,.38,.13),shoot=e(u,.57,.04),result=e(u,.61,.19),penX=u<.095?lerp(234,675,first):u<.125?675+penLift:lerp(676,233,second),penY=u<.095?lerp(335,609,first):u<.125?lerp(609,335,penLift):lerp(335,609,second);
 return <Set t={t}>
  <Light x={440} power={.8-.65*switchP}/><Light x={1350} power={.2+.7*switchP}/>
  <At x={162} y={118} style={{display:'flex',alignItems:'center',gap:23}}><Logo name="higgsfield.jpg" size={113}/><span style={{fontSize:54,fontWeight:800}}>Subscription</span></At>
  <At x={1050} y={113} style={{display:'flex',alignItems:'center',gap:25}}><Logo name="seedance.png" size={119}/><span style={{fontSize:55,fontWeight:800}}>Seedance 2.5</span></At>
  <Glass x={190} y={322} w={520} h={302} t={t} frost={.6}><div style={{padding:'25px 39px',fontSize:134,fontWeight:850,letterSpacing:-7}}>$100</div><div style={{paddingLeft:47,fontSize:40}}>/ month</div></Glass>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M234 335L675 609" fill="none" stroke={C.orange} strokeWidth="22" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-first}/><path d="M676 335L233 609" fill="none" stroke={C.orange} strokeWidth="22" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-second}/></svg>
  <Actor t={t} x={700+switchP*190} y={574} size={281} role="operator" look={switchP>.5?1:-1} walk={Math.sin(switchP*Math.PI)} reach={fund} lift={.45*(1-switchP)+fund*.8} contact={duration*.57} happy={result>.9}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:e(u,.035,.01)*(1-e(u,.195,.025))*(u>.095&&u<.125?.2:1)}}><path d={`M723 686L${penX} ${penY}`} stroke={C.orange} strokeWidth="2" opacity=".52"/><circle cx={penX} cy={penY} r="12" fill="#FFF2B7" stroke={C.orange} strokeWidth="4"/><path d="M704 680H738V693H704Z" fill="#4F624A" stroke="#EAD9B8" strokeWidth="2"/></svg>
  <At x={1135} y={305} style={{transform:`translateY(${-12*recoil(t,duration*.61)}px)`}}><CineCamera t={t} shoot={shoot} w={520}/></At>
  {[0,1,2].map(i=>{const p=e(u,.39+i*.045,.14);return <At key={i} x={lerp(963,1330,p)} y={lerp(565,407,p)-Math.sin(p*Math.PI)*128} style={{opacity:fund*(1-e(u,.54+i*.045,.04)),transform:`rotate(${p*170}deg)`}}><svg width="74" height="74"><circle cx="37" cy="37" r="32" fill="#EBC76B" stroke="#BB8C38" strokeWidth="4"/><path d="M37 16V57M46 24H32Q21 31 35 37Q54 41 42 51H27" fill="none" stroke="#91713A" strokeWidth="4"/></svg></At>;})}
  <At x={980} y={270} style={{opacity:result,transform:`translateY(${90*(1-result)}px) scale(${.8+.2*result})`,transformOrigin:'50% 50%'}}><div style={{padding:14,border:'3px solid white',borderRadius:27,background:'#EDF2DA',boxShadow:'0 24px 36px #3F412630'}}><Shot p={result} w={718}/></div></At>
  <At x={1088} y={768} style={{opacity:e(u,.8,.06),display:'flex',alignItems:'center',gap:20}}><Logo name="fal.png" size={70}/><span style={{fontSize:40,fontWeight:750}}>Pay per generation</span></At>
 </Set>;
};

const DescriptionFinalV19:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t/duration,open=e(u,.02,.10),release=e(u,.17,.14),catchP=e(u,.31,.10),bonus=e(u,.50,.10),land=e(u,.65,.12);
 return <Set t={t}>
  <Light x={750} power={.55}/><Light x={1550} power={.25+.4*bonus}/>
  <At x={160} y={102}><div style={{fontSize:67,fontWeight:850}}>FREE setup</div><div style={{fontSize:43,fontWeight:650,color:C.orange,marginTop:9}}>In the description below ↓</div></At>
  <Glass x={162} y={285} w={935} h={401} t={t} frost={.5}>
   <div style={{height:61,borderBottom:'2px solid #DBCAB1',display:'flex',alignItems:'center',paddingLeft:27,gap:11}}>{[0,1,2].map(i=><div key={i} style={{width:12,height:12,borderRadius:8,background:'#BFB69D'}}/>)}</div>
   <At x={49} y={101}><svg width="110" height="83"><path d="M3 4H107V78H3Z" fill="#ECAD74"/><path d="M44 23L75 42L44 61Z" fill="#FFF9EC"/></svg></At>
   <div style={{position:'absolute',left:193,top:107,width:651,height:12,borderRadius:5,background:'#6E826D55'}}/><div style={{position:'absolute',left:193,top:142,width:417,height:12,borderRadius:5,background:'#6E826D33'}}/>
   <At x={38} y={213} style={{width:853,height:145,borderRadius:18,background:'linear-gradient(125deg,#FFFDF4,#EADABB)',border:'2px solid white',boxShadow:'0 14px 24px #684D2720',transform:`perspective(900px) rotateX(${-17*open}deg) translateY(${44*open}px)`,transformOrigin:'50% 0'}}><div style={{fontSize:43,fontWeight:800,padding:'37px 34px'}}>fal-video.skill</div><div style={{position:'absolute',right:25,top:32,fontSize:48,color:C.orange}}>↓</div></At>
  </Glass>
  <Actor t={t} x={1115} y={499} size={304} role="archivist" look={-1} lift={release*.88} reach={catchP} contact={duration*.31} happy={catchP>.9}/>
  <At x={410+release*440+catchP*233} y={382+release*196-Math.sin(release*Math.PI)*80+catchP*36} style={{transform:`rotate(${-6+release*22-catchP*16}deg) scale(${1-catchP*.48})`,transformOrigin:'0 0'}}><SkillFile t={t} size={208}/></At>
  <At x={1350} y={272} style={{transform:`translateY(${45*(1-bonus)-10*recoil(t,duration*.65)}px)`,opacity:bonus}}><svg width="347" height="357" style={{overflow:'visible'}}><path d="M38 138H306V335H38Z" fill="#D9E2BB" stroke="#FFF" strokeWidth="5"/><path d="M154 138H194V335H154Z" fill="#D97E41"/>
   <g transform={`translate(0 ${-86*land}) rotate(${-8*land} 174 130)`}><path d="M22 99H322V151H22Z" fill="#E6EBCF" stroke="#FFF" strokeWidth="5"/><path d="M153 99H193V152H153Z" fill="#D97E41"/><path d="M172 99Q57 92 82 39Q132 8 172 99Q214 8 263 39Q290 92 172 99Z" fill="none" stroke="#D97E41" strokeWidth="14"/></g><text x="174" y="239" textAnchor="middle" fontFamily={bodyFont} fontSize="48" fontWeight="850" fill="#364D36">FREE</text><text x="174" y="283" textAnchor="middle" fontFamily={bodyFont} fontSize="33" fontWeight="750" fill="#364D36">bonus</text></svg></At>
  <At x={203} y={818} style={{display:'flex',gap:30,alignItems:'center',opacity:catchP}}>{['claude.png','codex.svg','cursor.svg'].map(n=><Logo key={n} name={n} size={76}/>)}<span style={{fontSize:34,fontWeight:700}}>Claude Code · Codex · Cursor</span></At>
  <Contact x={1265} y={588} t={t} at={duration*.31}/>
 </Set>;
};
/** Only global 450s onward changes; pre-450 closing frames stay identical. */
export const OutroV19:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),start=duration-7.1;
 return <><InstallFinaleV12 duration={duration}/>{t>=start&&<Sequence from={Math.round(start*30)}><DescriptionFinalV19 duration={7.1}/></Sequence>}</>;
};
