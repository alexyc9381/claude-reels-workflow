import React from 'react';
import {interpolate,Easing} from 'remotion';
import {Mascot,SectionHeader,HookHeader} from './SlopKit';

const CLAY='#D97757', GOLD='#E8B95A', PAPER='#F5EEE1', DARK='#0B1627', GREEN='#71CCA1';
const E=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
const pulse=(f:number,c:number,w=10)=>Math.max(0,1-Math.abs(f-c)/w);
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const HEADS:Record<string,[string,string,string]>={download:['DOWNLOAD','LM STUDIO','download'],search:['FIND','QWEN3.8','search'],quant:['CHOOSE YOUR','QUANTIZATION','quant'],compression:['MORE COMPRESSION','LESS PRECISION','compression'],best:['THE BEST MODEL','THAT FITS','fit'],fit:['CHECK YOUR','HARDWARE','fit'],models:['OPEN','MY MODELS','models'],load:['USE IN','NEW CHAT','load'],chat:['CHAT WITH','YOUR MODEL','chat']};

const Symbol:React.FC<{kind:string}>=({kind})=><svg viewBox="0 0 60 60" width="52" height="52" fill="none" stroke={PAPER} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
 {kind==='download'?<><path d="M30 7V38M17 25L30 38 43 25M10 40V51H50V40"/></>:kind==='search'?<><circle cx="25" cy="24" r="16"/><path d="M37 37L51 51"/></>:kind==='quant'?<><path d="M8 46H20V36H32V24H44V12H53"/></>:kind==='compression'?<><path d="M8 9H52M8 51H52M30 10V20M19 16L30 25 41 16M30 50V40M19 44L30 35 41 44"/></>:kind==='fit'?<><rect x="13" y="13" width="34" height="34" rx="4"/><path d="M23 30L29 36 39 23M22 5V13M38 5V13M22 47V55M38 47V55M5 22H13M5 38H13M47 22H55M47 38H55"/></>:kind==='models'?<><path d="M7 18H25L30 25H53V49H7ZM7 18V11H25L30 18H49V25"/></>:kind==='load'?<><path d="M21 12L48 30 21 48Z"/></>:<><path d="M8 10H52V42H28L14 53V42H8Z"/><path d="M19 23L13 28 19 33M41 23L47 28 41 33"/></>}
</svg>;

export const DemoHeader:React.FC<{scene:string;f:number}>=({scene,f})=>{
 if(scene==='hook')return <HookHeader big="QWEN3.8 · 27B" hot="ON YOUR COMPUTER" f={f+12}/>;
 if(scene==='cta')return <HookHeader big="COMMENT LM" hot="FOR THE SETUP" f={f+8}/>;
 const [a,b,icon]=HEADS[scene];return <SectionHeader f={f+5} badge={<Symbol kind={icon}/>} l1={a} l2={<span style={{color:CLAY}}>{b}</span>} size={a.length>15?40:46}/>;
};

// Each bay is a small practical set. The footage and its magnifier sit above it in z-order.
// Color changes follow new locations; moving signal dots exist only after a real click.
const PALETTES:Record<string,[string,string,string]>={hook:['#26416D','#102443','#071324'],download:['#1F5A60','#0E3540','#061A23'],search:['#3A4B7D','#1C294B','#0A142B'],quant:['#603E85','#2C154E','#100925'],compression:['#79372D','#391713','#1B090D'],best:['#553E7A','#251944','#0E1025'],fit:['#1C5760','#0E303F','#061722'],models:['#33556F','#132B49','#071B30'],load:['#602C78','#281642','#100921'],chat:['#1D585D','#0D303C','#051823']};
export const DemoSet:React.FC<{scene:string;f:number;clicks:number[]}>=({scene,f,clicks})=>{
 const [hi,mid,lo]=PALETTES[scene]||PALETTES.hook;
 return <div style={{position:'absolute',left:34,top:400,width:1012,height:1020,borderRadius:37,overflow:'hidden',background:`radial-gradient(ellipse at 35% 0%,${hi},${mid} 52%,${lo})`,boxShadow:'0 29px 60px #17243C45,inset 0 2px 0 #FFFFFF40',border:'2px solid #637587'}}>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:384,background:`linear-gradient(145deg,${mid},${lo})`,borderTop:'3px solid #AEC0CA22'}}/>
  <svg width="1012" height="1020" style={{position:'absolute',inset:0}}>
   <path d="M773 631V666Q773 688 799 688H898Q920 688 920 711V868" fill="none" stroke="#99C5CC30" strokeWidth="8"/>
   {clicks.map(c=>{const t=(f-c)/24;if(t<0||t>1)return null;const x=t<.5?773+147*E(t,0,.5):920,y=t<.5?650+38*E(t,0,.5):688+160*E(t,.5,1);return <rect key={c} x={x-10} y={y-10} width="20" height="20" rx="5" fill={GOLD} opacity={1-.55*t}/>;})}
   <path d="M696 986H1007L995 961H722Z" fill="#071424" stroke="#ADC3CC38" strokeWidth="3"/>
   {[0,1,2,3,4].map(i=><path key={i} d={`M${736+i*46} 982l16 -13`} stroke="#46657A" strokeWidth="7"/>)}
  </svg>
 </div>;
};

const Gear:React.FC<{x:number;y:number;r?:number;angle:number;color?:string}>=({x,y,r=46,angle,color=GOLD})=><g transform={`translate(${x} ${y}) rotate(${angle})`}>
 {[0,1,2,3,4,5,6,7].map(i=><rect key={i} x={-9} y={-r-8} width="18" height="28" rx="3" fill={color} transform={`rotate(${i*45})`}/>)}
 <circle r={r} fill={color} stroke="#55392B" strokeWidth="5"/><circle r={r*.54} fill={DARK} stroke="#F3D29A" strokeWidth="4"/><circle r="8" fill={PAPER}/>
</g>;

const Chip:React.FC<{x:number;y:number;w?:number;color?:string}>=({x,y,w=76,color='#9476DC'})=><g transform={`translate(${x} ${y})`}>
 {[0,1,2,3].map(i=><g key={i} stroke={GOLD} strokeWidth="7"><path d={`M${w*.2+i*w*.2} -8V8M${w*.2+i*w*.2} ${w-8}V${w+8}M-8 ${w*.2+i*w*.2}H8M${w-8} ${w*.2+i*w*.2}H${w+8}`}/></g>)}
 <rect width={w} height={w} rx="12" fill={color} stroke={PAPER} strokeWidth="5"/><rect x="16" y="16" width={w-32} height={w-32} rx="4" fill="#172F46"/>
</g>;

const GroundBurst:React.FC<{f:number;at:number;x:number;y:number}>=({f,at,x,y})=>{
 const t=clamp((f-at)/13);if(f<at||t>=1)return null;return <>{[-1,1].map(dir=><g key={dir} opacity={1-t}><path d={`M${x+dir*(16+26*t)} ${y-5-10*t}l${dir*18} -8`} stroke={GOLD} strokeWidth="7" strokeLinecap="round"/><circle cx={x+dir*(29+39*t)} cy={y-11-8*t} r="5" fill={PAPER}/></g>)}</>;
};

export const DemoCompanion:React.FC<{scene:string;f:number;clicks:number[];success?:number}>=({scene,f,clicks,success=9999})=>{
 let x=14,y=150,size=238,rot=0,sx=1,sy=1,cheer=0,shock=0,stern=0,gaze=7,glasses=0,constr=0,props:React.ReactNode=null;
 const next=clicks.find(c=>c>=f-13)??-100,u=f-next,pre=E(u,-12,-5)*(1-E(u,-4,1)),hit=E(u,0,3)*(1-E(u,4,14));
 const win=E(f,success,success+10);stern=.8*pre;shock=.5*hit;rot=-7*pre+4*hit;sy=1-.1*pre+.04*hit;
 const walk=(a:number,b:number,from:number,to:number)=>{const t=E(f,a,b);x=from+(to-from)*t;if(t>0&&t<1)y-=Math.abs(Math.sin(t*Math.PI*3))*13;};
 if(scene==='hook'||scene==='search'){
  const found=scene==='hook'?101:77;walk(0,18,0,35);if(f>35)walk(35,found,35,3);glasses=scene==='search'?1:0;
  const look=E(f,found,found+8);rot+=-9*pulse(f,found+5,9)+5*look;cheer=.6*look;gaze=7-12*look;
  props=<g transform={`translate(${x+252} ${y+70}) rotate(${-20+35*E(f,18,35)-15*look})`}><path d="M-23 28L-46 55" stroke="#202836" strokeWidth="16"/><path d="M-22 27L-43 51" stroke={GOLD} strokeWidth="9"/><circle r="37" fill="#91D5E233" stroke={PAPER} strokeWidth="8"/><circle r="31" fill="none" stroke="#E8B95A" strokeWidth="4"/><path d="M-19-11Q-9-26 11-19" fill="none" stroke="#FFFFFFAA" strokeWidth="5"/></g>;
 }
 if(scene==='download'||scene==='fit'){
  const c=scene==='download'?65:83,done=scene==='download'?102:139;walk(0,22,0,31);const crouch=pulse(f,c-6,10);y+=20*crouch-38*pulse(f,c+6,14);rot-=8*crouch;stern=Math.max(stern,crouch);cheer=E(f,done,done+8);shock=scene==='fit'&&f<42?.55:hit*.45;
  const drop=E(f,c-24,c),received=E(f,c,c+9),ready=E(f,done,done+9);
  const deliveries=scene==='fit'?[100,113,124]:[];
  const catchBeat=Math.max(0,...deliveries.map(d=>pulse(f,d,7)));y+=16*catchBeat;rot-=7*catchBeat;stern=Math.max(stern,.6*catchBeat);
  if(scene==='fit'&&f<45){x-=40*E(f,5,14)*(1-E(f,30,44));y-=18*pulse(f,14,10);shock=.6*pulse(f,13,15);gaze=7-14*pulse(f,21,11);stern=.5*E(f,20,29)*(1-E(f,32,42));}

  props=<>{deliveries.map(d=>{const t=E(f,d-14,d);if(f<d-14||f>d+4)return null;return <g key={d} transform={`translate(${232+8*t} ${68+216*t})`} opacity={1-E(f,d,d+4)}><rect width="43" height="33" rx="6" fill={GOLD} stroke={PAPER} strokeWidth="3"/><path d="M9 11H33M9 21H24" stroke="#704E32" strokeWidth="4"/></g>;})}<g transform={`translate(212 ${60+182*drop}) scale(${1-.2*received} ${1+.1*received})`} opacity={1-E(f,c+4,c+15)}><path d="M26 0H62V49H85L44 94 3 49H26Z" fill={PAPER} stroke="#203F50" strokeWidth="5"/><path d="M35 7H54V49H68L44 75 20 49H35Z" fill={GOLD}/></g><g transform={`translate(214 ${286+8*received*(1-ready)})`}><rect width="96" height="58" rx="12" fill="#334D65" stroke="#B5D0D6" strokeWidth="4"/><rect x="12" y="13" width="72" height="8" rx="4" fill={DARK}/><rect x="13" y="33" width="14" height="8" rx="4" fill={ready?GREEN:GOLD}/><path d="M38 38H78" stroke="#799AAA" strokeWidth="6"/></g><GroundBurst f={f} at={c} x={259} y={309}/>{ready>0&&<path d="M225 247l17 18 36-41" fill="none" stroke={GREEN} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="85" strokeDashoffset={85*(1-ready)}/>}</>;
 }
 if(scene==='quant'){
  const land=[4,20,43,65],heights=[36,70,104,138];let k=0;while(k<3&&f>=land[k+1]-8)k++;const t=k?E(f,land[k]-8,land[k]):1,prev=Math.max(0,k-1);size=174;x=(68+60*(prev+(k-prev)*t))-size/2;y=351-(heights[prev]+(heights[k]-heights[prev])*t)-size*.92-Math.sin(t*Math.PI)*52;const squash=pulse(f,land[k]+2,6);sy=1-.15*squash;sx=1+.1*squash;rot=6*Math.sin(t*Math.PI);cheer=t<1?.8:.25;stern=t<.2?.6:0;shock=0;
  props=<>{heights.map((h,i)=><g key={i}><path d={`M${38+i*60} ${351-h}h60v${h}h-60Z`} fill={i<=k?'#8C69BE':'#31445F'} stroke="#B9A2DA" strokeWidth="3"/><path d={`M${38+i*60} ${351-h}l10-10h50v10`} fill={i<=k?'#BB96E5':'#536079'}/><text x={68+i*60} y={343} textAnchor="middle" fontFamily="sans-serif" fontSize="30" fontWeight="900" fill={PAPER}>{[4,5,6,8][i]}</text></g>)}<GroundBurst f={f} at={land[k]} x={68+60*k} y={351-heights[k]}/></>;
 }
 if(scene==='compression'){
  x=-5;y=151;const drives=scene==='compression'?[25,63,99,123]:[17,53];const effort=Math.max(...drives.map(c=>pulse(f,c-3,12)),0);x+=28*effort;y+=16*effort;rot=-12*effort;stern=.85*effort;cheer=.35*hit;gaze=8;
  const level=scene==='compression'?(1+E(f,55,63)+E(f,115,123)):2,open=level/3,angle=-30+61*effort;
  props=<><path d="M196 42V225M298 42V225M179 230H315" stroke="#93A7BB" strokeWidth="12"/><path d="M177 37H317" stroke={PAPER} strokeWidth="15"/><rect x="187" y={180-open*98} width="121" height="16" rx="3" fill={GOLD} stroke="#3B2430" strokeWidth="3"/><path d={`M247 46V${179-open*98}`} stroke="#D2D5D9" strokeWidth="14"/>{Array.from({length:5},(_,row)=><g key={row}>{Array.from({length:5},(_,col)=><rect key={col} x={197+col*20} y={204-row*(8+open*14)} width="16" height={6+open*12} rx="2" fill={(row+col)%2?'#BF8AEC':'#DAB8F0'}/>)}</g>)}<path d="M235 228V300" stroke="#7391A9" strokeWidth="10"/><g transform={`translate(236 279) rotate(${angle})`}><path d="M0 0L-44-28" stroke={PAPER} strokeWidth="9"/><circle cx="-44" cy="-28" r="15" fill={CLAY} stroke={PAPER} strokeWidth="4"/></g><Gear x={285} y={282} r={22} angle={angle*1.4}/></>;
 }
 if(scene==='best'){
  const effort=Math.max(pulse(f,17,15),pulse(f,53,17)),angle=19-30*effort,rad=angle*Math.PI/180;
  x=259-54*Math.cos(rad)-213;y=140-54*Math.sin(rad);rot=-5*effort;stern=.9*effort;shock=.5*pulse(f,71,13);gaze=8;
  props=<><path d="M259 190V333M224 339H298" stroke="#A2AFCA" strokeWidth="13"/><path d="M215 346H309L296 330H229Z" fill="#435679" stroke={PAPER} strokeWidth="3"/>
   <g transform={`translate(259 191) rotate(${angle})`}><path d="M-61 0H61" stroke={GOLD} strokeWidth="12" strokeLinecap="round"/><circle r="11" fill={PAPER}/></g>
   {[-1,1].map(d=>{const px=259+d*54*Math.cos(rad),py=191+d*54*Math.sin(rad);return <g key={d}><path d={`M${px} ${py}l-28 67h56Z`} fill="none" stroke="#CFD5DB" strokeWidth="3"/><path d={`M${px-37} ${py+67}q37 25 74 0Z`} fill={d>0?'#B75D59':'#6F89A4'} stroke={PAPER} strokeWidth="3"/>{d>0&&<Chip x={px-24} y={py+14-180*(1-E(f,0,17))} w={48} color="#AA626A"/>}</g>;})}
  </>;
 }
 if(scene==='models'){
  const pull=E(f,17,35),select=E(f,48,69);x=54-49*pull;y=149;rot=-11*pulse(f,25,17)+8*select;stern=.8*pulse(f,23,17);cheer=.6*select;
  props=<><g transform="translate(201 159)"><path d="M0 14L22 0H107V103H0Z" fill="#234B64" stroke="#A1BFCD" strokeWidth="4"/><path d="M0 15H106M22 0V16" stroke="#7B9BAB" strokeWidth="3"/><g transform={`translate(${-45*pull} ${15*pull})`}><rect x="2" y="39" width="104" height="59" rx="4" fill="#405D70" stroke={PAPER} strokeWidth="4"/><rect x="29" y="59" width="39" height="9" rx="4" fill={GOLD}/><path d="M6 43L36 26H107V44" fill="#7892A5"/></g></g><g transform={`translate(${-45*pull} ${15*pull-68*select})`}><Chip x={231} y={170} w={53}/></g></>;
 }
 if(scene==='load'){
  const turn=E(f,12,51)*80+E(f,51,93)*300+E(f,93,130)*190,ready=E(f,130,139),work=f>=25&&f<130?1:0;
  const rad=turn/180*Math.PI,hx=251-47*Math.cos(rad),hy=249-47*Math.sin(rad);
  x=(hx-213)*(1-ready)+32*ready;y=(hy-118)*(1-ready)+148*ready;rot=0;sx=1;sy=1;stern=.72*work;cheer=ready;shock=.4*pulse(f,134,9);constr=1;
  props=<><path d="M210 282V204Q210 170 248 170V134" stroke="#4F718B" strokeWidth="12" fill="none"/><Chip x={211} y={66} w={82} color={ready?'#54AF8A':'#8166B1'}/><Gear x={251} y={249} angle={turn}/><g transform={`translate(251 249) rotate(${turn})`}><path d="M0 0H-47" stroke={PAPER} strokeWidth="10"/><circle cx="-47" r="12" fill={CLAY} stroke={PAPER} strokeWidth="4"/></g>{[0,1,2].map(i=><rect key={i} x={209+i*31} y="180" width="21" height="13" rx="4" fill={f>94+i*11?GREEN:'#47526C'}/>)}</>;
 }
 if(scene==='chat'){
  const key=Math.max(...[9,15,25,36,53].map(c=>pulse(f,c,5))),reply=E(f,72,88),jump=E(f,76,87)*(1-E(f,91,105));
  const present=E(f,108,129),finalHop=Math.sin(Math.PI*E(f,137,154));
  x=22+55*reply-53*present;y=126+15*key-64*jump-38*finalHop;rot=7*key-8*jump-5*present;sy=1-.1*key;stern=f<53?.7:0;cheer=.9*reply+.1*present;gaze=7-10*reply-4*present;glasses=f<68?1:0;
  props=<><g transform={`translate(29 ${346+key*5})`}><path d="M0 0H225L246 41H-18Z" fill="#59738B" stroke={PAPER} strokeWidth="4"/>{[0,1].map(r=>Array.from({length:7},(_,c)=><rect key={`${r}-${c}`} x={3+c*31-r*4} y={8+r*13} width="22" height="8" rx="2" fill={c===(Math.floor(f/4)%7)&&key>.1?CLAY:'#D3DDE1'}/>))}</g><g transform={`translate(${260-28*reply} ${74+60*(1-reply)}) scale(${.6+.4*reply})`} opacity={reply}><path d="M-15-30L-45 0 -15 30M15-30L45 0 15 30" fill="none" stroke={GREEN} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/></g><GroundBurst f={f} at={104} x={206} y={346}/></>;
 }
 return <div style={{position:'absolute',left:724,top:1014,width:330,height:406,pointerEvents:'none'}}>
  <svg width="330" height="406" style={{position:'absolute',inset:0,overflow:'visible'}}><ellipse cx={x+size/2} cy="377" rx={size*.35} ry="13" fill="#0006"/></svg>
  <div style={{position:'absolute',left:x,top:y,transform:`rotate(${rot}deg) scale(${sx},${sy})`,transformOrigin:'50% 90%'}}><Mascot lf={f+23} size={size} nodAmp={0} gaze={gaze} stern={stern} shock={shock} cheer={Math.max(cheer,win*.8)} glasses={glasses} constr={constr}/></div>
  <svg width="330" height="406" style={{position:'absolute',inset:0,overflow:'visible'}}>{props}</svg>
 </div>;
};
