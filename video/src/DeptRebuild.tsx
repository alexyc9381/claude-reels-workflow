import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {Panel, Mascot} from './SlopKit';
import {inter} from './fonts';

/* DEPARTMENT creative reset. None of the rejected factory staging is imported.
   Frame coordinates are panel-local. Motion is authored as travel/contact/result,
   not the former kit's perpetual Hero and conveyor loops. */
const W=1012,H=792,INK='#182329',PAPER='#F4E7C5',CLAY='#D97757';
const ActingCtx=React.createContext({f:0,kind:'hook',cut:0});
const colors=['#D66D46','#398D9E','#8260A5','#398B64','#A14E48'];
const costumes=[{constr:1},{glasses:1},{beard:1},{prof:1},{suit:1}];
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const p=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
// Each movement has a fixed duration and steady travel; no shared speed ramp.
const travel=(f:number,a:number,b:number)=>p(f,a,b);
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const kick=(f:number,at:number,amp=12)=>f<at?0:amp*Math.sin((f-at)*.55)*Math.exp(-(f-at)/8);
const arc=(t:number,h:number)=>-4*h*t*(1-t);
const tr=(x:number,y:number,s=1,r=0)=>'translate('+x+' '+y+') rotate('+r+') scale('+s+')';
const Svg:React.FC<{children:React.ReactNode;z?:number}>=({children,z=20})=>
 <svg width={W} height={H} viewBox="0 0 1012 792" style={{position:'absolute',inset:0,zIndex:z,overflow:'visible'}}>{children}</svg>;
const Label:React.FC<{x:number;y:number;t:string;size?:number;c?:string;anchor?:'start'|'middle'|'end'}>=
 ({x,y,t,size=26,c=INK,anchor='middle'})=><text x={x} y={y} textAnchor={anchor} fill={c} fontFamily={inter.fontFamily} fontSize={size} fontWeight={850}>{t}</text>;

type PropKind='megaphone'|'phone'|'pencil'|'ledger'|'gavel'|'camera'|'file'|'brief'|'brush'|'lens'|'palette'|'caliper';
const tasks:PropKind[]=['megaphone','phone','pencil','ledger','gavel'];
const juggle=(f:number,i:number)=>{const span=[69,83,77,91,63][i],t=((f+4+i*13)%span)/span;return {x:mix(305,724,t),y:554+arc(t,[302,330,279,315,288][i]),r:mix(-42,42,t)+(i%2?12:-12)+Math.sin(t*Math.PI)*[8,-12,15,-7,11][i]};};
const HandLink:React.FC<{x:number;y:number;size:number;tx:number;ty:number;side?:number}>=({x,y,size,tx,ty,side=1})=>{
 const ax=x+side*size*.425,ay=y-size*.505;
 return <Svg z={48}><path d={'M'+ax+' '+ay+' L'+mix(ax,tx,.56)+' '+(mix(ay,ty,.56)+13)+' L'+tx+' '+ty} fill='none' stroke={CLAY} strokeWidth={size*.071} strokeLinejoin='round' strokeLinecap='square'/><rect x={tx-size*.04} y={ty-size*.04} width={size*.08} height={size*.08} fill={CLAY}/></Svg>;
};
const Prop:React.FC<{kind:PropKind;x:number;y:number;s?:number;r?:number;c?:string;progress?:number}>=
 ({kind,x,y,s=1,r=0,c='#D47749',progress=1})=><g transform={tr(x,y,s,r)}>
  {kind==='megaphone'?<>
   <path d="M-64-22 L42-69 Q54-73 57-58 L57 62 Q53 74 42 69 L-64 22Z" fill={PAPER} stroke="#743B2D" strokeWidth="7"/>
   <path d="M-44 28 L-22 75 Q-8 84 1 66 L-8 42" fill={c} stroke="#743B2D" strokeWidth="7"/>
   <rect x="-88" y="-28" width="43" height="56" rx="10" fill={c} stroke="#743B2D" strokeWidth="6"/>
   <ellipse cx="51" cy="0" rx="15" ry="62" fill="#3A4242"/><ellipse cx="55" cy="0" rx="7" ry="44" fill="#AC8D66"/>
  </>:kind==='phone'?<>
   <rect x="-61" y="-103" width="122" height="206" rx="24" fill="#172D36" stroke="#6CC0C5" strokeWidth="7"/>
   <rect x="-48" y="-85" width="96" height="166" rx="14" fill="#F3D6A0"/>
   <path d="M-45 28 Q-4-42 46-3 V79 H-46Z" fill={c}/><circle cx="-8" cy="-26" r="29" fill="#EC8456"/>
   <path d="M-6-4 L25 15 L-6 35Z" fill={PAPER}/><rect x="-21" y="-86" width="42" height="9" rx="4" fill="#172D36"/>
   <path d="M-18 92 H18" stroke="#76B7B8" strokeWidth="5" strokeLinecap="round"/>
  </>:kind==='pencil'?<>
   <path d="M-65 63 L31-65 L61-41 L-35 87 L-83 104Z" fill="#EFB94D" stroke="#3A304A" strokeWidth="7"/>
   <path d="M-83 104 L-35 87 L-64 64Z" fill={PAPER}/><path d="M-83 104 L-76 80 L-62 93Z" fill="#273443"/>
   <path d="M20-49 L51-25" stroke="#F9E6A5" strokeWidth="8"/><path d="M31-65 L48-87 Q61-94 75-80 Q88-66 79-56 L61-41" fill="#C67A88" stroke="#3A304A" strokeWidth="7"/>
  </>:kind==='ledger'?<>
   <path d="M-94-78 Q-44-94 0-75 Q44-94 94-78 V86 Q41 70 0 90 Q-43 71-94 86Z" fill="#F1E7C5" stroke="#294F47" strokeWidth="8"/>
   <path d="M0-75 V89" stroke="#BEB994" strokeWidth="6"/>
   {[-53,-28,-3,22,47].map((v,i)=><g key={v}><path d={'M-77 '+v+' H-18 M18 '+v+' H76'} stroke="#C1BE9E" strokeWidth="4"/><rect x={-73} y={v-6} width={22+i*6} height="7" fill="#54886A"/><rect x="24" y={v-6} width={33-i*4} height="7" fill="#A56F49"/></g>)}
  </>:kind==='gavel'?<>
   <path d="M-70 66 Q0 50 70 66 V87 H-70Z" fill="#422924" stroke="#C79A65" strokeWidth="6"/>
   <g transform="rotate(-32)"><rect x="-10" y="-39" width="20" height="112" rx="7" fill="#CE995F" stroke="#573629" strokeWidth="5"/>
   <path d="M-56-82 H56 V-31 H-56Z" fill="#8C4B35" stroke="#E2B986" strokeWidth="7"/><path d="M-41-79 V-34 M41-79 V-34" stroke="#CF8B54" strokeWidth="10"/></g>
  </>:kind==='camera'?<>
   <path d="M-99-45 H-50 L-36-66 H21 L38-45 H99 V68 H-99Z" fill="#263B45" stroke="#94ABA3" strokeWidth="7"/>
   <rect x="-84" y="-29" width="39" height="23" rx="4" fill="#E7B656"/><circle cx="12" cy="14" r="62" fill="#141F28" stroke="#80969C" strokeWidth="8"/>
   <circle cx="12" cy="14" r="45" fill="#2C6170" stroke="#B3C5BE" strokeWidth="5"/><circle cx="12" cy="14" r={29*(.18+.82*progress)} fill="#173945"/><path d="M-19 38 Q15 56 41 26" fill="none" stroke="#476F7A" strokeWidth="3"/><path d="M-4-7 Q16-24 34-4" fill="none" stroke="#79BFC2" strokeWidth="8"/>
   <circle cx="76" cy="-19" r="7" fill="#D87951"/>
  </>:kind==='brush'?<>
   <path d="M-15 83 L-8-28 H15 L19 84 Q0 112-15 83Z" fill="#CC804B" stroke="#653A31" strokeWidth="6"/>
   <path d="M-31-38 H38 V-12 H-31Z" fill="#BCC4B9" stroke="#33434C" strokeWidth="6"/>
   <path d="M-30-92 Q-6-107 39-91 L38-40 H-31Z" fill={c} stroke="#33434C" strokeWidth="6"/><path d="M-16-88 V-47 M0-92 V-46 M19-90 V-47" stroke="#EDD39E" strokeWidth="5"/>
  </>:kind==='lens'?<>
   <path d="M37 38 L88 91" stroke="#D19B57" strokeWidth="25" strokeLinecap="round"/><circle cx="-8" cy="-8" r="63" fill="#B3E2D6" fillOpacity=".28" stroke="#243D44" strokeWidth="13"/><circle cx="-8" cy="-8" r="52" fill="none" stroke="#E1BE78" strokeWidth="5"/><path d="M-46-17 A42 42 0 0 1-8-48" stroke="#FAEBD0" strokeWidth="9" fill="none"/>
  </>:kind==='palette'?<>
   <path d="M-91 2 C-113-99 55-116 92-44 C126 23 60 99 4 87 C-37 79 18 28-15 16 C-46 8-57 45-82 29Z" fill="#CDA36B" stroke="#553E37" strokeWidth="7"/>
   {[[-58,-37,'#C65E46'],[-8,-65,'#ECBF57'],[43,-48,'#497F98'],[63,4,'#7857A1'],[36,51,'#508D64']].map(([xx,yy,col],i)=><circle key={i} cx={xx} cy={yy} r="17" fill={col as string}/>)}
  </>:kind==='caliper'?<>
   <path d="M-80-72 V31 H-50 V-31 H50 V31 H80 V-72 H52 V-51 H-50 V-72Z" fill="#B8CBC6" stroke="#304D55" strokeWidth="6"/>
   <path d="M-9-41 V91 H16 V-41" fill="#C4D2CA" stroke="#304D55" strokeWidth="6"/>
   {[-10,9,28,47,66].map(y=><path key={y} d={'M-7 '+y+' H7'} stroke="#4D7077" strokeWidth="4"/>)}
  </>:<>
   <path d="M-83-106 H40 L82-65 V107 H-83Z" fill={PAPER} stroke="#6C6253" strokeWidth="6"/>
   <path d="M40-106 V-65 H82" fill="#D5C196" stroke="#6C6253" strokeWidth="5"/>
   <Label x={-2} y={-55} t={kind==='file'?'SKILL.md':'YOUR BUSINESS'} size={kind==='file'?23:17}/>
   {[0,1,2,3].map(i=><g key={i} opacity={progress>(i/5)?1:0}><rect x="-60" y={-27+i*27} width={i===3?75:118} height="9" rx="2" fill={i===0?c:'#B0A17E'}/></g>)}
   {kind==='brief'&&<path d="M34 76 L47 88 L71 58" stroke="#418462" strokeWidth="9" fill="none"/>}
  </>}
 </g>;

const Sprite:React.FC<{f:number;x:number;y:number;size?:number;i?:number;rot?:number;lean?:number;hit?:number;walk?:number;cheer?:number;shock?:number;stern?:number;gaze?:number;z?:number;plain?:boolean}>=
 ({f,x,y,size=240,i=0,rot=0,lean=0,hit=0,walk=0,cheer=0,shock=0,stern=0,gaze=0,z=35,plain=false})=>{
  const ctx=React.useContext(ActingCtx);
  const active=['office','skill','marketing','gateway','design','finance','legal','custom','team'].includes(ctx.kind);
  const beats=ctx.kind==='finance'?[16,31,52]:ctx.kind==='legal'?[24,43]:ctx.kind==='marketing'?[12,28,46]:ctx.kind==='design'?[9,26,43]:ctx.kind==='custom'?[17,36,62]:[14,35,58];
  const phase=ctx.f-i*3.7,dir=i%2?-1:1;
  const effort=active?Math.max(...beats.map(b=>Math.max(0,1-Math.abs(phase-(b-3))/5))):0;
  const recoil=active?beats.reduce((a,b)=>a+kick(phase,b,.35),0):0;
  const gait=walk?-Math.abs(Math.sin(f*(.39+i*.023)))*12*walk:0;
  const sy=1-Math.max(0,hit)*.14-Math.max(0,recoil)*.045,sx=1+Math.max(0,hit)*.1+Math.max(0,recoil)*.025;
  const actingLean=dir*effort*9,actingTilt=dir*(-effort*3+recoil*6);
  const lookLead=active&&Math.abs(gaze)<.1?dir*(effort*.55-recoil*.3):gaze;
  return <><div style={{position:'absolute',left:x-size*.55,top:y-9,width:size*1.1,height:24,borderRadius:'50%',background:'rgba(6,14,20,.38)',filter:'blur(5px)',zIndex:z-1}}/>
   <div style={{position:'absolute',left:x-size/2+lean+actingLean,top:y-size+gait,width:size,height:size,zIndex:z,transformOrigin:'50% 100%',transform:'rotate('+(rot+actingTilt)+'deg) scale('+sx+','+sy+')'}}>
    <Mascot lf={f+23} size={size} nodAmp={0} nodSpeed={walk>0?5+i*.7:1000} gaze={lookLead} shock={shock} stern={Math.min(1,stern+effort*.2)} cheer={Math.max(cheer,effort*.24)} {...(plain?{suit:1}:costumes[i%5])}/>
   </div></>;
 };

type SetKind='studio'|'office'|'table'|'workbench'|'street'|'shoot'|'edit'|'atelier'|'design'|'finance'|'legal'|'tailor'|'code';
const palettes:Record<SetKind,[string,string,string,string]>={
 studio:['#E8DBAD','#C6B27B','#9B895F','#4E5B55'],office:['#345769','#172C3C','#665E49','#97C6C3'],
 table:['#244B48','#102C32','#6D6848','#E5BE72'],workbench:['#3D5663','#182936','#786345','#DFB572'],
 street:['#A8563C','#452C2D','#7E4935','#F1C279'],shoot:['#316775','#142E3D','#274B54','#ADD7CC'],
 edit:['#55517D','#24283E','#4C4052','#B2A3D1'],atelier:['#9B725B','#392F3E','#795D4B','#E8C196'],
 design:['#675182','#29253E','#564554','#D4AED0'],finance:['#3E7158','#162F2F','#465C40','#DAC184'],
 legal:['#87504E','#33232F','#624139','#DBB68B'],tailor:['#626281','#2C2C43','#625448','#D7BD92'],
 code:['#275B62','#112B38','#395754','#C2CF9A'],
};
const Set:React.FC<{kind:SetKind;f:number}>=({kind,f})=>{
 const [wall,deep,floor,light]=palettes[kind],bright=kind==='studio',archive=kind==='legal'||kind==='finance',shop=kind==='street';
 return <Svg z={0}><defs>
  <linearGradient id="dept-wall" x2=".15" y2="1"><stop stopColor={wall}/><stop offset="1" stopColor={deep}/></linearGradient>
  <linearGradient id="dept-floor" x2="0" y2="1"><stop stopColor={floor}/><stop offset="1" stopColor={deep}/></linearGradient>
 </defs>
 <rect width="1012" height="792" fill="url(#dept-wall)"/>
 <path d="M0 558 H1012 V792 H0Z" fill="url(#dept-floor)"/>
 {Array.from({length:9},(_,i)=><path key={i} d={'M506 540 L'+(-750+i*310)+' 792'} stroke={bright?'#A79D72':'#182B30'} strokeWidth="3"/>)}
 {[612,686,776].map(y=><path key={y} d={'M0 '+y+' H1012'} stroke={bright?'#B6A574':'#203236'} strokeWidth="3"/>)}
 {archive?<>{[140,356,658,874].map((x,k)=><g key={x}><path d={'M'+(x-84)+' 144 H'+(x+84)+' V546 H'+(x-84)+'Z'} fill={deep} stroke={wall} strokeWidth="13"/>
  {[220,310,400,490].map((y,j)=><g key={y}>{Array.from({length:7},(_,i)=><rect key={i} x={x-70+i*20} y={y-54-(i%3)*7} width={14} height={54+(i%3)*7} fill={[wall,light,floor][(i+j+k)%3]}/>)}<path d={'M'+(x-80)+' '+y+' H'+(x+80)} stroke="#211F27" strokeWidth="12"/></g>)}</g>)}</>:
 shop?<><rect x="118" y="163" width="766" height="371" rx="9" fill="#3A4F51" stroke="#E6B47B" strokeWidth="17"/><path d="M500 170 V536" stroke="#D69D66" strokeWidth="13"/><path d="M136 192 L328 170 L171 510Z M526 187 L718 171 L549 508Z" fill="#72A2A0" opacity=".25"/></>:
 <>{(kind==='office'?[124,580]:[82,670]).map((x,i)=><g key={x}><path d={'M'+x+' 126 H'+(x+260)+' V416 H'+x+'Z'} fill={bright?'#F7EDC7':'#172D3B'} stroke={bright?'#B4A575':wall} strokeWidth="13"/>
  <path d={'M'+x+' 334 L'+(x+37)+' 260 L'+(x+65)+' 289 L'+(x+109)+' 215 L'+(x+150)+' 266 L'+(x+180)+' 185 L'+(x+231)+' 270 L'+(x+260)+' 251 V406 H'+x+'Z'} fill={bright?'#C9C8A0':'#345667'}/>
  <path d={'M'+(x+130)+' 130 V414 M'+x+' 281 H'+(x+260)} stroke={bright?'#BCAE84':wall} strokeWidth="9"/>
 </g>)}</>}
 {kind==='shoot'&&<><path d="M246 131 Q506 91 769 131 V561 H246Z" fill="#6CACAA"/><path d="M247 519 Q506 448 768 519 V583 H247Z" fill="#E1BF86"/></>}
 {(kind==='atelier'||kind==='design')&&<><path d='M187 134 H824 V507 H187Z' fill={kind==='atelier'?'#E4CCA3':'#827394'}/><path d="M218 190 H599 M218 231 H698 M218 276 H630 M218 323 H745" stroke="#B19575" strokeWidth="5"/></>}
 <path d="M56 124 H956" stroke={bright?'#AFA375':'#14292F'} strokeWidth="19"/>
 <path d="M197 4 V135 M805 5 V158" stroke={bright?'#847957':'#10282C'} strokeWidth="7"/>
 <path d="M139 132 Q197 60 255 132Z M752 157 Q805 93 858 157Z" fill={deep} stroke={wall} strokeWidth="6"/>
 <path d="M153 134 H241 M764 159 H846" stroke={light} strokeWidth="10" strokeLinecap="round"/>
 <path d="M160 146 L37 558 H470 L236 146Z" fill={light} opacity={bright?.18:.07}/>
 <path d="M0 742 H1012 V792 H0Z" fill={bright?'#837A59':'#101E25'}/>
 <path d="M0 742 H1012" stroke={light} strokeWidth="7" opacity=".5"/>
 </Svg>;
};
const Foreground:React.FC<{kind:SetKind}>=({kind})=><Svg z={90}>
 <path d="M0 0 H29 V792 H0Z M986 0 H1012 V792 H986Z" fill={kind==='studio'?'#716F51':'#101D26'}/>
 {kind==='street'?<><path d="M-10 681 Q74 613 132 674 V792 H-10Z" fill="#254E43"/><path d="M1050 692 Q951 616 893 681 V792 H1050Z" fill="#214B41"/></>:
 <><path d="M-42 682 L105 729 V792 H-42Z" fill={kind==='studio'?'#92764B':'#293136'}/><path d="M930 752 L1045 681 V792 H930Z" fill={kind==='studio'?'#665C43':'#15252C'}/></>}
 </Svg>;
const Desk:React.FC<{x?:number;y?:number;w?:number;c?:string}>=({x=505,y=632,w=630,c='#B8915E'})=><g>
 <path d={'M'+(x-w/2)+' '+y+' L'+(x-w/2+42)+' '+(y-59)+' H'+(x+w/2-42)+' L'+(x+w/2)+' '+y+'Z'} fill={c} stroke="#292C2B" strokeWidth="6"/>
 <path d={'M'+(x-w/2)+' '+y+' V'+(y+28)+' H'+(x+w/2)+' V'+y} fill="#674A36"/>
 <path d={'M'+(x-w/2+38)+' '+(y+23)+' V760 M'+(x+w/2-38)+' '+(y+23)+' V760'} stroke="#382E29" strokeWidth="25"/>
 </g>;
const Poster:React.FC<{x:number;y:number;s?:number;reveal?:number;variant?:number}>=({x,y,s=1,reveal=1,variant=0})=><g transform={tr(x,y,s)}>
 <path d="M-116-154 H116 V154 H-116Z" fill={variant?'#E9D6AD':'#F5C06B'} stroke="#332E2D" strokeWidth="8"/>
 <g transform={'translate(0 '+(130*(1-reveal))+') scale(1 '+Math.max(.001,reveal)+')'}>
  <circle cx={variant?34:0} cy="-41" r={variant?62:73} fill={variant?'#446A5C':'#B65743'}/>
  <path d={variant?'M-97 46 L-43-79 L18 49Z':'M-65 25 Q-22-50 5-40 Q55-30 72 32Z'} fill={variant?'#C97645':'#1D5864'}/>
  <path d="M-83 74 H83 M-83 99 H56 M-83 124 H17" stroke="#332E2D" strokeWidth="13"/>
 </g></g>;

export const REBUILD_SHOTS=[
 [0,'OVERLOAD','hook',0],[44,'CATCH','hook',1],[88,'REDIRECT','hook',2],
 [144,'SPECIALISTS','office',0],[238,'SHARED BRIEF','office',1],
 [313,'SKILL FILE','skill',0],[400,'APPLY SKILL','skill',1],
 [481,'PAINT CAMPAIGN','marketing',0],[530,'STOREFRONT','marketing',1],[596,'COPY AND CREATIVE','marketing',2],
 [657,'SHOOT','social',0],[720,'EDIT','social',1],[800,'FINISHED REEL','social',2],
 [866,'OPEN ATELIER','gateway',0],[940,'START DESIGN','gateway',1],
 [987,'DESIGN TOOLS','design',0],[1046,'SAME TEMPLATE','design',1],[1120,'RECOMPOSE','design',2],[1180,'DISTINCT RESULT','design',3],
 [1235,'OPEN LEDGER','finance',0],[1288,'RECONCILE','finance',1],[1355,'FIND VARIANCE','finance',2],
 [1425,'OPEN CONTRACT','legal',0],[1472,'INSPECT CLAUSE','legal',1],[1530,'BUILD BRIEF','legal',2],
 [1584,'THE REAL POINT','turn',0],[1637,'ONE SIZE FAILS','tailor',0],
 [1737,'REWRITE','custom',0],[1820,'FIT AND TEST','custom',1],
 [1904,'WORKING TEAM','team',0],[2013,'GUIDE HANDOFF','cta',0],
 ] as const;

const Hook:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const g=f+(cut===0?0:cut===1?44:88);
 if(cut===0){
  const lean=mix(-7,11,travel(f,0,35))+kick(f,18,5),catch0=travel(f,-6,18);
  return <><Svg z={15}><Desk x={514} y={727} w={790} c="#D7BB83"/>
   {tasks.map((k,i)=>{const pose=juggle(f,i);return <Prop key={k} kind={k} x={pose.x} y={pose.y} s={[.90,.85,.88,.79,.86][i]} r={pose.r}/>;})}</Svg>
   <Sprite f={f} x={mix(479,528,catch0)} y={713+kick(f,18,11)} size={340} rot={lean} hit={p(f,5,35)*.9} i={0} stern={.8} shock={f>22?1:0} gaze={f<20?-1:1}/>
   <HandLink x={mix(479,528,catch0)} y={713} size={340} tx={319} ty={529} side={-1}/>
   <HandLink x={mix(479,528,catch0)} y={713} size={340} tx={708} ty={523}/>
  </>;
 }
 if(cut===2){
  const q=travel(f,-5,53),late=travel(f,4,55);
  const positions=[[200,615],[700,348],[852,460],[731,595]];
  return <><Svg z={14}><Desk x={529} y={699} w={837} c='#CFB781'/>
   <g transform={'translate(0 '+mix(-234,23,q)+')'}><Poster x={mix(780,532,q)} y={mix(426,431,q)} s={mix(.74,1.79,q)} reveal={q}/><path d='M374 219 H634' stroke='#674B31' strokeWidth='14'/></g>
   {positions.map(([x,y],i)=><g key={i}><path d={'M'+(x-110)+' '+(y+3)+' H'+(x+68)+' V'+(y+19)+' H'+(x-110)+'Z'} fill='#9F8A5C' stroke='#6B664C' strokeWidth='5'/><path d={'M'+(x-92)+' '+(y+19)+' V743 M'+(x+53)+' '+(y+19)+' V743'} stroke='#6B6B54' strokeWidth='9'/><Prop kind={tasks[i+1]} x={x} y={y-128} s={.44+i*.022} r={kick(f,13+i*7,10)}/></g>)}
   <Prop kind='megaphone' x={mix(261,291,late)} y={493} s={.9} r={mix(-32,9,late)}/>
   {[0,1,2].map(i=><path key={i} d={'M'+(356+i*16)+' '+(447-i*9)+' Q'+(380+i*19)+' 486 '+(355+i*16)+' '+(517+i*10)} fill='none' stroke='#C18F43' strokeWidth='5' opacity={late>i*.25?1:0}/>)}
  </Svg>
  {positions.map(([x,y],i)=><Sprite key={i} f={f+i*13} x={x-36} y={y} size={i===0?181:154} i={i+1} rot={mix(-9,8,travel(f,i*7,32+i*7))} cheer={f>25+i*4?1:0}/>)}
  <Sprite f={f} x={mix(148,329,late)} y={748} size={323} i={0} rot={-5+late*9} cheer={late>.7?1:0}/>
  <HandLink x={mix(148,329,late)} y={748} size={323} tx={264} ty={558} side={-1}/>
  </>;
 }
 const xs=[136,306,476,646,816];
 return <><Svg z={15}><Desk x={506} y={743} w={880} c="#C9AE78"/>
  {tasks.map((k,i)=>{const q=travel(g,43+i*4,64+i*4),use=0,pose=juggle(44,i);return <g key={k}>
   <Prop kind={k} x={mix(pose.x,xs[i]+66,q)} y={mix(pose.y,591,q)+arc(q,54)} s={mix(1.10,.69,q)+use*.1} r={mix([-35,24,-23,18,37][i],0,q)+kick(g,67+i*5,12)}/>
   {cut===2&&<g transform={tr(xs[i],326,.58)} opacity={use}>
    {i===0?<Poster x={0} y={0} s={.8} reveal={use}/>:i===1?<Prop kind="camera" x={0} y={0} s={.8} r={-5+use*5}/>:i===2?<path d="M-84 51 V-61 H82 V51Z M-60 29 V-37 H58 V29Z M-8-37 V29" stroke="#866AAA" strokeWidth="14" fill="#EEDCB7"/>:i===3?<><path d="M-80 63 H84 M-60 47 V-8 M-10 47 V-47 M40 47 V-21" stroke="#3E8866" strokeWidth="20"/><path d="M-68-31 L-6-75 L55-58" stroke="#DDAE58" strokeWidth="9" fill="none"/></>:<><path d="M-61-80 H61 V80 H-61Z" fill={PAPER}/><path d="M-38-44 H36 M-38-16 H36" stroke="#9F7957" strokeWidth="10"/><path d="M-32 35 L-10 58 L39 0" stroke="#52875C" strokeWidth="13" fill="none"/></>}
   </g>}
  </g>;})}</Svg>
  {xs.map((x,i)=>{const t=travel(g,39+i*4,61+i*4);return <Sprite key={i} f={g+i*13} x={x} y={mix(904,690,t)+arc(t,70)} size={220} i={i} rot={mix(i%2?20:-20,0,t)+kick(g,61+i*4,7)} hit={Math.max(0,kick(g,61+i*4,.7))} walk={t<1?1:0} cheer={g>97+i*5?1:0} stern={g<81?1:0}/>;})}
  {xs.map((x,i)=>{const q=travel(g,43+i*4,64+i*4),t=travel(g,39+i*4,61+i*4),pose=juggle(44,i);if(q<.9)return null;return <HandLink key={i} x={x} y={mix(904,690,t)+arc(t,70)} size={220} tx={mix(pose.x,xs[i]+66,q)} ty={mix(pose.y,591,q)+arc(q,54)}/>;})}
  {cut===2&&<Sprite f={g} x={mix(508,502,travel(g,88,114))} y={mix(835,784,travel(g,88,109))} size={218} plain rot={kick(g,109,5)} cheer={1}/>}
 </>;
};

const Office:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===1)return <><Svg z={15}><path d="M120 209 H892 L943 675 H69Z" fill="#BCA477" stroke="#213333" strokeWidth="11"/><path d="M151 242 H861 L897 636 H111Z" fill="#E9D9AB"/>
  <Prop kind="brief" x={506} y={440} s={1.05}/>
  {tasks.map((k,i)=>{const t=travel(f,i*8-4,42+i*8),a=(i/5)*Math.PI*2-Math.PI/2;return <Prop key={k} kind={k} x={mix(506+Math.cos(a)*393,506+Math.cos(a)*207,t)} y={mix(430+Math.sin(a)*265,430+Math.sin(a)*165,t)} s={mix(.84,1.37,t)} r={mix(36*(i%2?1:-1),0,t)}/>;})}
 </Svg><Sprite f={f} x={746} y={773} size={184} plain rot={mix(14,-3,travel(f,28,58))} cheer={f>56?1:0}/></>;
 const pos=[[199,402],[484,433],[793,400],[327,698],[711,698]];
 return <><Svg z={10}><path d="M51 484 H962 V509 H51Z M470 168 V501" stroke="#162D36" strokeWidth="12"/>
  <path d="M62 487 H262 V721 H62 M952 487 H834 V721 H952" fill="none" stroke="#779A94" strokeWidth="12"/>
  {[535,586,637,688].map(y=><path key={y} d={'M62 '+y+' H262 M834 '+y+' H952'} stroke="#799890" strokeWidth="7"/>)}
  {pos.map(([x,y],i)=><g key={i}><Desk x={x} y={y+54} w={i<3?245:292} c={i%2?'#B48C65':'#BAAD7D'}/><Prop kind={tasks[i]} x={x+43-48*travel(f,35+i*6,68+i*6)} y={y-105+28*travel(f,35+i*6,68+i*6)+arc(travel(f,35+i*6,68+i*6),35)} s={.62} r={mix(-35,0,travel(f,i*8,28+i*8))+mix(0,i%2?29:-29,travel(f,35+i*6,68+i*6))}/></g>)}
 </Svg>{pos.map(([x,y],i)=>{const t=travel(f,i*6-6,28+i*6),work=travel(f,35+i*6,68+i*6);return <Sprite key={i} f={f+i*13} x={x-259+259*t+work*43} y={y+(i<3?76:30)} size={i<3?218:246} i={i} walk={t<1?1:0} rot={-9+work*17} cheer={work>.8?1:0} stern={work<.8?1:0}/>;})}</>;
};

const Skill:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const t=p(f,-4,86),use=travel(f,cut===0?22:-5,cut===0?84:79);
 return <><Svg z={15}><Desk x={510} y={664} w={806}/></Svg>
  <Svg z={25}>{cut===0?<g transform={tr(mix(831,349,t),mix(511,383,t),mix(1.1,2.12,t),mix(-19,0,t))}>
   <Prop kind="file" x={0} y={0} s={1} progress={t}/><Label x={-2} y={-4} t="ROLE → TASK" size={15}/><Label x={-2} y={49} t="HOW TO WORK" size={14}/>
  </g>:<><Prop kind="file" x={210} y={421} s={.9} r={-9}/><Poster x={mix(326,669,use)} y={mix(543,405,use)} s={mix(.88,1.77,use)} reveal={use} variant={1}/></>}
  <Prop kind={cut===0?'pencil':'brush'} x={mix(cut===0?435:315,cut===0?692:710,use)} y={mix(477,cut===0?528:443,use)+arc(use,100)} s={.82} r={mix(-20,42,use)}/>
 </Svg><Sprite f={f} x={cut===0?mix(826,725,use):mix(309,490,use)} y={713} size={286} i={cut===0?4:2} rot={mix(-10,15,use)} lean={use*14} stern={use<.8?1:0} cheer={use>.8?1:0} gaze={cut===0?-1:1}/>
 {cut===0&&<div style={{position:'absolute',left:542,top:211,width:65,height:65,zIndex:28,background:PAPER,borderRadius:12,padding:8}}><Img src={staticFile('claude_logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>}
 </>;
};

const Marketing:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=cut===1?p(f,-8,65):travel(f,-4,cut===0?40:53),late=cut===1?p(f,-6,65):travel(f,24,cut===2?60:63);
 return <><Svg z={15}>
  {cut===0?<g transform={'rotate('+mix(-17,0,q)+' 515 678)'}><path d="M215 178 H817 V668 H215Z" fill="#E6C48E" stroke="#704332" strokeWidth="16"/>
   <path d={'M245 632 V'+mix(622,212,q)+' H787 V632Z'} fill='#276B72'/>
   <defs><clipPath id='painted-campaign'><rect x='235' y={mix(620,197,q)} width='552' height={642-mix(620,197,q)}/></clipPath></defs>
   <g clipPath='url(#painted-campaign)'><Poster x={507} y={422} s={1.43} reveal={1}/></g>
   <g transform={tr(508,mix(628,229,q))}><path d="M-131-23 H131 V23 H-131Z" fill="#D9814E" stroke="#EDB16A" strokeWidth="7"/><path d="M113 21 V79 H25 V158" fill="none" stroke="#D8BD80" strokeWidth="14"/></g>
  </g>:cut===1?<><g transform={'translate(0 '+mix(-153,0,q)+')'}>
   <path d="M133 173 H878 L935 297 H78Z" fill="#E3B66E" stroke="#66362D" strokeWidth="8"/>
   {Array.from({length:8},(_,i)=><path key={i} d={'M'+(140+i*92)+' 176 H'+(184+i*92)+' L'+(200+i*100)+' 297 H'+(147+i*100)+'Z'} fill="#9E4737"/>)}
   <path d="M81 297 H933 V329 Q910 347 887 329 Q863 347 839 329 Q815 347 791 329 Q767 347 743 329 Q719 347 695 329 Q671 347 647 329 Q623 347 599 329 Q575 347 551 329 Q527 347 503 329 Q479 347 455 329 Q431 347 407 329 Q383 347 359 329 Q335 347 311 329 Q287 347 263 329 Q239 347 215 329 Q191 347 167 329 Q143 347 119 329 Q99 347 81 329Z" fill="#B55D40"/>
  </g><g transform={'translate(0 '+mix(120,0,late)+')'}><Poster x={343} y={477} s={1.32} reveal={q}/><Poster x={680} y={477} s={1.32} reveal={late} variant={1}/></g></>:
  <><Poster x={mix(487,333,q)} y={mix(484,410,q)} s={1.43} reveal={q}/><g transform={'translate('+mix(260,0,late)+' '+mix(150,0,late)+') rotate('+mix(-40,0,late)+' 730 584)'}><path d="M598 227 H865 V584 H598Z" fill="#E9D6A8" stroke="#6D4937" strokeWidth="8"/>
   {[0,1,2,3,4].map(i=><path key={i} d={'M626 '+(278+i*53)+' H'+(626+Math.max(0,Math.min(1,(f-i*9)/18))*(i%2?143:208))} stroke={i===0?'#A24E3E':'#324F52'} strokeWidth={i===0?26:14}/>)}</g>
   <Prop kind="brush" x={mix(166,548,q)} y={mix(572,236,q)} s={.7} r={35}/></>}
 </Svg>{cut===0&&<HandLink x={mix(499,590,late)} y={747} size={310} tx={533} ty={mix(628,229,q)+153} side={-1}/>}<Sprite f={f} x={cut===2?mix(792,603,late):mix(402,645,late)} y={747} size={cut===0?310:270} i={0} rot={mix(-10,12,q)} stern={q<.85?1:0} cheer={q>.85?1:0} gaze={cut===2?-1:0}/></>;
};

const Film:React.FC<{f:number;x:number;y:number;w?:number;h?:number}>=({f,x,y,w=710,h=134})=><g transform={tr(x,y)}>
 <defs><clipPath id="film-bound"><rect width={w} height={h}/></clipPath></defs>
 <g clipPath="url(#film-bound)"><rect width={w} height={h} fill="#10202D"/>
  {Array.from({length:8},(_,i)=>{const xx=i*161-(f*5.2)%161;return <g key={i} transform={'translate('+xx+' 0)'}>
   <rect x="7" y="23" width="142" height={h-46} rx="4" fill={i%2?'#68A6A2':'#D2A467'}/>
   <circle cx="78" cy="60" r="22" fill="#D97757"/><path d={'M34 '+(h-25)+' Q78 47 122 '+(h-25)} fill={i%2?'#324B67':'#744E64'}/>
   {[17,48,79,110,141].map(xx=><g key={xx}><rect x={xx} y="7" width="16" height="8" fill="#D6C59E"/><rect x={xx} y={h-15} width="16" height="8" fill="#D6C59E"/></g>)}
  </g>;})}</g></g>;
const Social:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-4,cut===2?65:58),late=travel(f,20,78);
 if(cut===0)return <><Sprite f={f} x={mix(475,600,q)} y={665+arc(p(f,-4,45),150)} size={418} hit={Math.max(0,kick(f,45,.8))} i={1} rot={mix(-12,8,q)} cheer={q>.6?1:0} gaze={-1}/>
  <Svg z={50}><path d="M211 536 L138 747 M211 536 L275 747 M211 536 V746" stroke="#B3B9A5" strokeWidth="14"/>
   <Prop kind="camera" x={215} y={476} s={1.30} progress={1-Math.sin(Math.PI*p(f,16,28))}/><g transform={tr(213,mix(533,640,travel(f,32,62)),.70)} opacity={travel(f,31,37)}><rect x='-81' y='-105' width='162' height='210' fill={PAPER} stroke='#30434B' strokeWidth='6'/><rect x='-68' y='-92' width='136' height='160' fill='#6CACAA'/><foreignObject x='-77' y='-85' width='154' height='154'><div><Mascot lf={39} size={154} glasses={1} nodAmp={0} nodSpeed={1000} gaze={-1}/></div></foreignObject><path d='M-55 85 H55' stroke='#B4A480' strokeWidth='5'/></g>
   <g transform={tr(692,239,.96,mix(-8,3,q))}><path d="M-110-34 H110 V57 H-110Z" fill="#18313D" stroke="#C1D0BA" strokeWidth="6"/>
    <g transform={'rotate('+mix(-28,0,travel(f,-4,17))+' -110 -34)'}><path d="M-110-62 H110 V-32 H-110Z" fill={PAPER}/>{[-90,-40,10,60].map(x=><path key={x} d={'M'+x+' -62 l30 0 -22 30 -30 0Z'} fill="#253D4A"/>)}</g>
    <Label x={0} y={24} t="TAKE 01" c={PAPER} size={25}/></g>
   {f>17&&f<34&&<path d="M120 391 L97 372 M160 364 L152 337 M231 359 L239 330" stroke="#E6C16D" strokeWidth="7"/>}
  </Svg></>;
 if(cut===1)return <><Svg z={15}><Desk x={505} y={697} w={873}/><Film f={f} x={104} y={372} w={808} h={188}/>
   <g transform={tr(196,266,1,f*6)}><circle r="97" fill="#A9B3A7" stroke="#2B404D" strokeWidth="10"/>{[0,1,2,3,4].map(i=><circle key={i} cx={Math.cos(i*1.256)*57} cy={Math.sin(i*1.256)*57} r="21" fill="#283E49"/>)}<circle r="15" fill="#DCB868"/></g>
   <g transform={tr(mix(432,586,q),mix(253,393,q),.74,mix(-14,0,q))}><path d='M-88-63 H88 V63 H-88Z' fill={PAPER} stroke='#3D4053' strokeWidth='7'/><Label x={0} y={-23} t='SCRIPT' size={24}/><path d='M-63 0 H58 M-63 25 H39' stroke='#8B7892' strokeWidth='10'/></g>
   <g transform={tr(mix(829,727,late),mix(243,380,late),.66)}><Poster x={0} y={0} s={.58} reveal={late}/></g>
  </Svg><Sprite f={f} x={648+q*35} y={762} size={271} i={1} rot={mix(-13,11,q)} stern={1}/></>;
 return <><Svg z={20}><Prop kind="phone" x={mix(627,453,q)} y={mix(452,390,q)} s={mix(1.63,2.60,q)} c="#4A7490"/><g transform={tr(mix(627,453,q),mix(452,390,q),mix(.74,1.18,q))}>
  <defs><clipPath id="portrait-film"><rect x="-98" y="-148" width="196" height="278" rx="14"/></clipPath></defs>
  <g clipPath="url(#portrait-film)"><rect x="-98" y="-148" width="196" height="278" fill="#B9C6A5"/>
   <g transform={'translate('+mix(0,-414,travel(f,4,64))+' 0)'}>{[0,1,2].map(i=><g key={i} transform={'translate('+(i*207)+' 0)'}><rect x="-98" y="-148" width="196" height="278" fill={['#6EA5A7','#D7A66D','#7A7C9E'][i]}/><circle cy="-18" r="48" fill="#D97757"/><path d="M-95 142 Q-7-36 92 142" fill={['#3D576F','#8B4E44','#424D5F'][i]}/><path d="M-70 91 H70 M-54 113 H54" stroke={PAPER} strokeWidth="11"/></g>)}</g>
  </g></g><path d="M316 623 H688" stroke="#81B3AD" strokeWidth="8" strokeLinecap="round"/>
  <path d={'M316 623 H'+mix(340,688,q)} stroke="#E9BB67" strokeWidth="8" strokeLinecap="round"/>
 </Svg><Sprite f={f} x={mix(178,743,q)} y={726} size={272} i={1} rot={mix(-7,10,q)} cheer={1}/></>;
};

const Gateway:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-5,cut===0?70:45);
 return <><Svg z={18}><path d="M209 217 H830 V589 H209Z" fill="#E6CAA3" stroke="#463346" strokeWidth="13"/>
  <path d="M242 253 H792 V535 H242Z M242 300 H792 M269 332 H510 V498 H269Z M545 335 H763 M545 384 H733 M545 432 H746" fill="none" stroke="#7F7395" strokeWidth="10"/>
  {cut===0?<><path d={'M183 103 H'+mix(856,240,q)+' V710 H183Z'} fill="#665172" stroke="#2B293D" strokeWidth="11"/>
   {[0,1,2,3,4].map(i=><path key={i} d={'M'+mix(260+i*115,198+i*8,q)+' 144 V616'} stroke="#9F7991" strokeWidth="13"/>)}
   <path d={'M'+mix(845,243,q)+' 188 V614 L'+mix(716,203,q)+' 674'} stroke="#D2AB60" strokeWidth="8" fill="none"/>
  </>:<><Website x={mix(865,515,q)} y={mix(598,405,q)} s={mix(.34,1.03,q)} fresh={0}/><Prop kind="pencil" x={mix(865,369,q)} y={mix(195,491,q)+arc(q,70)} s={1.40} r={mix(42,9,q)}/><path d={'M303 473 L'+mix(305,673,q)+' 347'} stroke="#6C5A89" strokeWidth="10"/></>}
 </Svg><Sprite f={f} x={cut===0?mix(785,286,q):mix(709,493,q)} y={738} size={294} i={2} walk={q<1?1:0} rot={cut===0?-15:mix(-7,16,q)} stern={q<.9?1:0} cheer={q>.9?1:0}/></>;
};

const Website:React.FC<{x:number;y:number;s?:number;fresh?:number;open?:number}>=({x,y,s=1,fresh=0,open=1})=><g transform={tr(x,y,s)}>
 <rect x="-270" y="-179" width="540" height="359" rx="12" fill={fresh>.3?'#EFE3BC':'#E2DFD8'} stroke="#203843" strokeWidth="10"/>
 <path d="M-262-136 H262" stroke="#C1C8BD" strokeWidth="5"/><circle cx="-243" cy="-159" r="6" fill="#CA775A"/><circle cx="-223" cy="-159" r="6" fill="#E3BA6C"/>
 <g transform={'scale(1 '+open+')'}>
  {fresh===0?<><rect x='-246' y='-116' width='492' height='138' rx='9' fill='#675C8E'/><path d='M-190-69 H190 M-127-39 H127' stroke='#E7DCBC' strokeWidth='12'/><rect x='-51' y='-12' width='102' height='19' rx='5' fill='#D98054'/>
   {[-170,0,170].map(x=><g key={x}><rect x={x-69} y='41' width='138' height='111' rx='8' fill='#D0C5B4'/><circle cx={x} cy='78' r='20' fill='#7F8D9C'/><path d={'M'+(x-46)+' 118 H'+(x+46)} stroke='#A3978C' strokeWidth='10'/></g>)}</>:
  <><rect x={mix(-246,-244,fresh)} y={mix(-116,-111,fresh)} width={mix(492,224,fresh)} height={mix(138,257,fresh)} rx={mix(9,0,fresh)} fill={fresh>.45?'#D78A56':'#675C8E'}/>
   <g opacity={clamp((fresh-.35)/.5)}><path d='M-237 139 L-118-61 L-18 140Z' fill='#366557'/><circle cx='-129' cy='-46' r='46' fill='#E7BF69'/></g>
   {[0,1,2].map(i=><rect key={i} x={mix(-239+i*170,9,fresh)} y={mix(41,-90+i*33,fresh)} width={mix(138,[228,177,207][i],fresh)} height={mix(111,19,fresh)} rx={mix(8,0,fresh)} fill={fresh>.45?'#293B37':'#D0C5B4'}/>)}
   <g opacity={clamp((fresh-.5)*2)}><path d='M11 17 H231 M11 39 H197 M11 61 H224' stroke='#839383' strokeWidth='8'/><rect x='11' y='99' width='132' height='35' rx='4' fill='#355C4E'/></g>
  </>}
 </g></g>;
const Design:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-4,cut===0?56:cut===1?72:cut===2?58:51),late=travel(f,13,69);
 if(cut===0)return <><Svg z={16}><Desk x={502} y={711} w={857}/><Website x={mix(651,511,q)} y={mix(449,405,q)} s={mix(.75,1.19,q)} fresh={q}/><Prop kind="caliper" x={mix(265,409,q)} y={mix(247,383,q)} s={1.07} r={mix(-33,0,q)}/><Prop kind="palette" x={mix(800,697,late)} y={mix(510,429,late)} s={.85}/>
  <Label x={252} y={207} t="UI UX PRO" c={PAPER} size={25}/><Label x={787} y={234} t="TASTE" c={PAPER} size={25}/>
 </Svg><Sprite f={f} x={322} y={771} size={255} i={2} rot={mix(-12,8,q)} stern={1}/></>;
 if(cut===1)return <><Svg z={16}>{[0,1,2].map(i=><Website key={i} x={mix(899-i*38,210+i*277,p(f,i*7-9,70+i))} y={354+i*52} s={.85} fresh={0}/>)}
  <path d={'M144 234 H'+mix(260,861,q)} stroke="#DEB56F" strokeWidth="8" strokeDasharray="18 12"/>
 </Svg><Sprite f={f} x={mix(518,612,q)} y={756} size={309} i={2} shock={f>25?1:0} gaze={mix(-1,1,q)} rot={mix(-8,10,q)}/></>;
 if(cut===2)return <><Svg z={18}><Website x={mix(641,498,q)} y={400} s={1.57} fresh={0}/><Website x={mix(641,498,q)} y={400} s={1.57} fresh={q} open={mix(.5,1,q)}/>
  <g transform={'translate('+mix(0,429,q)+' '+mix(0,-190,q)+') rotate('+mix(0,27,q)+' 507 395)'} opacity={1-p(f,44,58)}>
   <rect x="170" y="200" width="674" height="414" rx="8" fill="#76618D" stroke="#CEACB1" strokeWidth="9"/>
   <path d="M214 253 H800 V365 H214Z M214 407 H385 V566 H214Z M418 407 H589 V566 H418Z M622 407 H793 V566 H622Z" fill="#382D49"/>
  </g>
 </Svg><Sprite f={f} x={mix(257,398,q)} y={754} size={282} i={2} rot={mix(-17,15,q)} walk={q<1?1:0} stern={1}/></>;
 return <><Svg z={18}><Website x={mix(513,417,q)} y={391} s={mix(1.60,.94,q)} fresh={1}/>
  <Prop kind="phone" x={mix(985,793,q)} y={mix(569,436,q)+arc(q,42)} s={1.53} r={mix(26,0,q)} c="#3D6D55"/>
 </Svg><Sprite f={f} x={577} y={747} size={280} i={2} cheer={1} rot={kick(f,42,9)}/></>;
};

const Statement:React.FC<{x:number;y:number;s?:number;reveal?:number;variance?:number}>=({x,y,s=1,reveal=1,variance=0})=><g transform={tr(x,y,s)}>
 <path d="M-195-185 H195 V186 H-195Z" fill="#E9DEB5" stroke="#284A40" strokeWidth="9"/>
 <Label x={0} y={-135} t={variance?'BUDGET / ACTUAL':'FINANCIAL STATEMENT'} size={variance?23:20}/>
 {[0,1,2,3,4].map(i=><g key={i} transform={'translate('+mix(-80,0,travel(reveal*100,i*12,i*12+35))+' 0)'} opacity={reveal*100>i*12?1:0}>
  <path d={'M-161 '+(-85+i*44)+' H160'} stroke="#B4AF88" strokeWidth="3"/><rect x="-154" y={-108+i*44} width={57+i*10} height="13" fill="#68866A"/>
  <rect x="-16" y={-108+i*44} width={71} height="13" fill="#A9966B"/><rect x="87" y={-108+i*44} width={i===2&&variance?47:61} height="13" fill={i===2&&variance?'#C06A4D':'#689472'}/>
 </g>)}
 <path d="M-163 139 H162" stroke="#254D41" strokeWidth="6"/>
 <path d={'M74 156 H'+mix(75,158,reveal)} stroke="#3D7656" strokeWidth="14"/>
 </g>;
const Finance:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-5,cut===0?51:cut===1?64:65),late=travel(f,7,68);
 return <><Svg z={15}><Desk x={508} y={687} w={827}/>
  {cut===0?<g transform={tr(487,419,mix(.64,2.21,q),mix(-13,0,q))}><Prop kind="ledger" x={0} y={0}/></g>:
   <><Statement x={cut===2?mix(571,465,q):mix(1135,584,q)} y={cut===2?mix(536,355,q):mix(318,424,q)} s={cut===2?1.22:1.49} reveal={q} variance={cut===2?1:0}/>
    {cut===1?<g transform={tr(mix(162,257,q),mix(507,418,q),1,mix(-11,0,q))}><path d="M-78-167 H78 V163 H-78Z" fill="#36564B" stroke="#CCA666" strokeWidth="8"/>{Array.from({length:8},(_,i)=><g key={i}><path d={'M-61 '+(-130+i*36)+' H59'} stroke="#BDAC77" strokeWidth="6"/><rect x={mix(-59,12,travel(f,i*5-3,i*5+19))} y={-142+i*36} width="35" height="24" rx="6" fill={i%2?'#DAA65D':'#81AC8A'}/></g>)}</g>:
     <><rect x={mix(541,461,q)} y={mix(395,286,q)} width="160" height="41" rx="7" fill="none" stroke="#BF6D48" strokeWidth="7"/><Prop kind="lens" x={mix(329,577,late)} y={mix(481,321,late)+kick(f,42,14)} s={1.46}/></>}
   </>}
 </Svg><Sprite f={f} x={cut===2?mix(172,333,q):mix(316,405,q)} y={750} size={279} i={3} rot={mix(-13,9,q)} stern={q<.8?1:0} cheer={q>.9?1:0} gaze={1}/></>;
};

const ContractSheet:React.FC<{f:number;x:number;y:number;s?:number;tabs?:boolean}>=({f,x,y,s=1,tabs=false})=><g transform={tr(x,y,s)}>
 <path d="M-198-182 H198 V183 H-198Z" fill="#E9D7AF" stroke="#744A3C" strokeWidth="8"/>
 <Label x={0} y={-131} t="CONTRACT" size={29}/>
 {Array.from({length:7},(_,i)=><path key={i} d={'M-164 '+(-86+i*32)+' H'+(i===6?45:157)} stroke={i===3?'#9D5F4C':'#A89E7D'} strokeWidth="9"/>)}
 {tabs&&Array.from({length:9},(_,i)=><g key={i} transform={'translate('+mix(-28,0,travel(f,i*3-4,i*3+15))+' 0)'}><path d={'M198 '+(-156+i*34)+' h32 v27 h-32'} fill={colors[i%5]}/></g>)}
 </g>;
const Legal:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-4,cut===0?45:cut===1?56:52),late=travel(f,10,cut===2?52:57);
 return <><Svg z={16}><Desk x={510} y={707} w={830} c="#B18E68"/>
  {cut===0?<g transform={'translate(0 '+mix(-84,0,q)+')'}><ContractSheet f={f} x={510} y={419} s={mix(.69,1.21,q)}/><path d="M250 192 H770 M250 644 H770" stroke="#AB774E" strokeWidth="22" strokeLinecap="round"/></g>:
   cut===1?<><ContractSheet f={f} x={mix(688,414,q)} y={mix(503,357,q)} s={1.19} tabs/><Prop kind="lens" x={mix(316,618,q)+Math.sin(q*Math.PI*2)*32} y={mix(411,358,q)-Math.sin(q*Math.PI)*54} s={1.39}/>
    <path d={'M349 449 H'+mix(352,672,late)} stroke="#B65640" strokeWidth="7"/>
   </>:<><ContractSheet f={f} x={mix(412,237,q)} y={mix(449,349,q)} s={.83}/><Prop kind="brief" x={mix(955,683,q)} y={mix(298,425,q)} s={1.43}/>
    {[0,1,2].map(i=>{const t=travel(f,i*10-3,i*10+24);return <path key={i} d={'M'+mix(370,625,t)+' '+mix(335+i*28,400+i*38,t)+' h'+mix(65,116,t)} stroke={i===1?'#B5654E':'#9D9068'} strokeWidth="13"/>;})}
    <g transform={tr(716,531+kick(f,37,12),1)}><circle r={mix(0,35,travel(f,32,41))} fill="#AA4F3D"/><path d="M-17 0 L-5 12 L19-15" fill="none" stroke="#F1D2A0" strokeWidth="7" opacity={travel(f,37,46)}/></g>
   </>}
 </Svg><Sprite f={f} x={cut===2?mix(319,523,q):mix(872,738,q)} y={753} size={cut===0?284:276} i={4} rot={mix(13,-9,q)} stern={q<.8?1:0} cheer={q>.9?1:0} gaze={-1}/></>;
};

const Suit:React.FC<{x:number;y:number;s?:number;fit?:number;f:number}>=({x,y,s=1,fit=0,f})=><g transform={tr(x,y,s)}>
 <path d={'M-69-111 L-173-72 L'+mix(-259,-112,fit)+' 106 L-135 146 L-83 31 L-82 178 H83 V31 L135 146 L'+mix(259,112,fit)+' 106 L173-72 L69-111 L0-46Z'} fill="#4D5474" stroke="#C9B68F" strokeWidth="8"/>
 <path d="M-68-111 L-10-56 L-46 8 L-95-42Z M68-111 L10-56 L46 8 L95-42Z" fill="#2A354E"/>
 <path d="M0-44 V174" stroke="#AA987D" strokeWidth="6"/>
 {[0,1,2].map(i=><circle key={i} cx="17" cy={36+i*48} r="7" fill="#DDB064"/>)}
 {[[-116,-34],[-49,36],[62,84],[149,40]].map(([xx,yy],i)=><g key={i} transform={tr(xx,yy,1,kick(f,10+i*8,13))}><rect x="-24" y="-17" width="48" height="34" rx="3" fill={colors[i]}/><path d="M-13-4 H13 M-13 6 H7" stroke="#ECDDAD" strokeWidth="5"/></g>)}
 </g>;
const Turn:React.FC<{f:number}>=({f})=>{
 const q=travel(f,-3,29),late=travel(f,20,50);
 return <><Sprite f={f} x={mix(478,518,q)} y={761} size={383} plain rot={mix(-8,0,q)} stern={1} gaze={0}/>
  <Svg z={45}><path d={'M664 512 L'+mix(697,787,q)+' '+mix(525,465,q)} stroke={CLAY} strokeWidth="41" strokeLinecap="square"/><Prop kind="brief" x={mix(128,225,late)} y={mix(603,391,late)} s={1.01} r={mix(-20,-5,late)}/></Svg></>;
};
const Tailor:React.FC<{f:number}>=({f})=>{
 const q=travel(f,-8,37),fall=travel(f,9,98),react=travel(f,25,96);
 return <><Svg z={15}><path d="M205 183 H825 M267 181 V758 M765 181 V758" stroke="#BC9E71" strokeWidth="14"/><path d="M499 155 V207 L365 277 H637 L499 207" fill="none" stroke="#B99B69" strokeWidth="11"/>
  <g transform={'rotate('+mix(-25,96,fall)+' 506 694)'}><Suit f={f} x={mix(505,345,fall)} y={mix(103,438,q)+fall*247} s={mix(.91,1.87,fall)} fit={0}/></g>
  <g transform={tr(688,mix(220,367,q),1,kick(f,35,17))}><path d="M-39-28 H38 V35 H-39 L-50 1Z" fill="#E4BF7D" stroke="#67564B" strokeWidth="5"/><Label x={0} y={16} t="50" size={38}/></g>
 </Svg><Sprite f={f} x={mix(527,771,react)} y={748} size={mix(188,315,react)} walk={react<1?1:0} i={0} shock={react>.7?1:0} rot={mix(0,13,react)}/>
 </>;
};
const Custom:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const q=travel(f,-4,cut===0?79:80),late=travel(f,25,82);
 if(cut===0)return <><Svg z={15}><Desk x={505} y={704} w={883}/><path d="M267 178 H871 V571 H267Z" fill="#112C37" stroke="#709E9D" strokeWidth="13"/><path d="M291 224 H847" stroke="#416B70" strokeWidth="3"/>
  <Label x={315} y={209} t="CLAUDE CODE" anchor="start" size={25} c="#D6CAAA"/>
  <Label x={322} y={279} t="Rewrite for my business" anchor="start" size={25} c="#E5D3A6"/>
  {['Audience','Brand voice','Workflow','Review rules'].map((t,i)=><g key={t} opacity={travel(f,i*12,24+i*12)}><Label x={326} y={332+i*51} t={t} anchor="start" size={23} c="#A1C8B7"/><path d={'M546 '+(325+i*51)+' H'+mix(548,813,travel(f,i*12+5,27+i*12))} stroke={i%2?'#BBA66E':'#649C94'} strokeWidth="11"/></g>)}
  <rect x={826} y={315+Math.min(3,Math.floor(Math.max(0,f)/17))*51} width={7} height={18} fill='#DFC47F' opacity={f%17<11?.95:.28}/>
  <Prop kind="brief" x={mix(128,592,q)} y={mix(564,350,q)+arc(q,76)} s={mix(.76,1.90,q)} r={mix(-17,0,q)}/>
 </Svg><Sprite f={f} x={mix(278,473,late)} y={765} size={289} plain rot={mix(-9,13,q)} stern={1}/></>;
 return <><Svg z={16}><Desk x={512} y={696} w={866}/>
  <g transform={tr(mix(272,432,q),mix(366,410,q),mix(1.53,.72,q),mix(-17,0,q))}><Suit f={f} x={0} y={0} fit={q}/></g>
  <Prop kind="brief" x={mix(955,679,q)} y={mix(247,406,q)+arc(q,85)} s={mix(.75,1.25,q)} r={mix(24,0,q)}/>
  <path d={'M293 492 L'+mix(295,443,late)+' '+mix(490,317,late)} stroke="#E5BF73" strokeWidth="10" strokeDasharray="12 7"/>
  <path d="M652 511 L679 538 L740 472" stroke="#4F9B72" strokeWidth="16" fill="none" opacity={travel(f,49,64)}/>
 </Svg><Sprite f={f} x={mix(226,523,q)} y={754} size={289} plain rot={mix(-15,6,q)} cheer={q>.9?1:0} stern={q<.9?1:0}/>
 </>;
};
const Team:React.FC<{f:number}>=({f})=>{
 const pos=[[172,447],[415,447],[770,446],[278,709],[745,709]];
 return <><Svg z={10}><path d="M80 516 H929" stroke="#142E37" strokeWidth="17"/><path d="M478 138 V516" stroke="#537D82" strokeWidth="13"/>
  <Desk x={506} y={689} w={413} c="#CEAA73"/>
  {pos.map(([x,y],i)=><g key={i}><path d={'M'+(x-99)+' '+(y-70)+' H'+(x+99)+' V'+(y-49)+' H'+(x-99)+'Z'} fill="#A89671"/><Prop kind={tasks[i]} x={x+89} y={i<3?y-9:y-96} s={.54} r={mix(-15,0,travel(f,i*8-3,27+i*8))}/></g>)}
 </Svg>
 {pos.map(([x,y],i)=>{const q=travel(f,i*7-6,38+i*7),give=travel(f,20+i*7,80+i*7);return <Sprite key={i} f={f+i*17} x={x+give*(i%2?92:-92)} y={mix(y+183,y+(i<3?63:0),q)} size={i<3?194:212} i={i} rot={mix(-9,9,give)} stern={give<.8?1:0} cheer={give>.8?1:0}/>;})}
 <Svg z={47}>{pos.map(([x,y],i)=>{const q=travel(f,i*10-6,61+i*10);return <g key={i} transform={tr(mix(x,426+i*40,q),mix(y-40,551-i*5,q)+arc(q,118),mix(.66,.47,q),mix(i%2?-18:18,0,q))}>
  {i===0?<Poster x={0} y={0} reveal={1}/>:i===1?<Prop kind="phone" x={0} y={0}/>:i===2?<Website x={0} y={0} s={.6} fresh={1}/>:i===3?<Statement x={0} y={0} s={.73}/>:<ContractSheet f={100} x={0} y={0} s={.73}/>}
 </g>;})}</Svg>
 <Svg z={52}><Prop kind='brief' x={mix(927,520,p(f,50,109))} y={mix(212,432,p(f,50,109))+arc(p(f,50,109),88)} s={mix(.72,1.57,p(f,50,109))} r={mix(25,-3,p(f,50,109))}/></Svg>
 <Sprite f={f} x={514} y={782} size={224} plain rot={kick(f,77,7)} cheer={f>62?1:0}/>
 </>;
};
const Cta:React.FC<{f:number}>=({f})=>{
 const q=travel(f,-7,39),late=travel(f,40,113);
 return <><Svg z={15}><Desk x={509} y={708} w={799}/><g transform={tr(mix(847,546,travel(f,-7,111)),mix(318,444,travel(f,-7,111)),mix(.48,1.28,travel(f,-7,111)),mix(19,-3,travel(f,-7,111)))}>
  <path d="M-231-152 H231 V152 H-231Z" fill="#EAD7A9" stroke="#456F64" strokeWidth="12"/>
  <Label x={0} y={-67} t="YOUR AI TEAM" size={35}/><path d="M-173-36 H173" stroke="#AD9D78" strokeWidth="5"/>
  <Label x={0} y={28} t="DEPARTMENT" size={51} c="#A75433"/>
  <Label x={0} y={97} t="SETUP GUIDE" size={26}/></g>
  <Prop kind="brief" x={mix(287,548,late)} y={mix(552,641,late)+arc(late,80)} s={.45} r={mix(-20,0,late)}/>
 </Svg><Sprite f={f} x={mix(153,287,travel(f,-5,111))} y={mix(730,765,travel(f,-5,111))} size={mix(258,315,travel(f,-5,111))} plain rot={mix(-11,8,q)} cheer={q>.8?1:0}/>
 </>;
};

const typeSet:Record<string,SetKind>={hook:'studio',office:'office',skill:'workbench',marketing:'street',social:'shoot',gateway:'atelier',design:'design',finance:'finance',legal:'legal',turn:'workbench',tailor:'tailor',custom:'code',team:'office',cta:'studio'};
export const DeptRebuild:React.FC=()=>{
 const root=useCurrentFrame();let row:typeof REBUILD_SHOTS[number]=REBUILD_SHOTS[0];
 for(const candidate of REBUILD_SHOTS)if(root>=candidate[0])row=candidate;
 const [at,,kind,cut]=row,f=root-at;
 const set: SetKind=kind==='office'&&cut===1?'table':kind==='social'&&cut===1?'edit':typeSet[kind];
 const camera=kind==='hook'&&cut===0?1+.055*travel(f,-1,20):1;
 const props={f,cut};
 return <Panel><ActingCtx.Provider value={{f,kind,cut}}><div style={{position:'absolute',inset:0,zIndex:1,transformOrigin:'50% 55%',transform:'scale('+camera+')'}}>
  <Set kind={set} f={f}/>
  {kind==='hook'?<Hook {...props}/>:kind==='office'?<Office {...props}/>:kind==='skill'?<Skill {...props}/>:kind==='marketing'?<Marketing {...props}/>:kind==='social'?<Social {...props}/>:kind==='gateway'?<Gateway {...props}/>:kind==='design'?<Design {...props}/>:kind==='finance'?<Finance {...props}/>:kind==='legal'?<Legal {...props}/>:kind==='turn'?<Turn f={f}/>:kind==='tailor'?<Tailor f={f}/>:kind==='custom'?<Custom {...props}/>:kind==='team'?<Team f={f}/>:<Cta f={f}/>}
  <Foreground kind={set}/>
 </div></ActingCtx.Provider></Panel>;
};
