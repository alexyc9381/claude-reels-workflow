import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {Panel, Mascot} from './SlopKit';
import {inter} from './fonts';

/* DEPARTMENT creative reset. None of the rejected factory staging is imported.
   Frame coordinates are panel-local. Motion is authored as travel/contact/result,
   not the former kit's perpetual Hero and conveyor loops. */
const W=1012,H=792,INK='#182329',PAPER='#F4E7C5',CLAY='#D97757';

const colors=['#D66D46','#398D9E','#8260A5','#398B64','#A14E48'];
const costumes=[{constr:1},{glasses:1},{beard:1},{prof:1},{suit:1}];
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const p=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
// Short object-specific operations on the real timeline; never stretch travel to fill a shot.
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
// Use the actual marks, not a substitute sun or a generic agent icon.
const BrandMark:React.FC<{kind:'claude'|'github';x:number;y:number;size:number}>=({kind,x,y,size})=>
 <foreignObject x={x} y={y} width={size} height={size}><Img src={staticFile('logos_official/'+kind+'.svg')} style={{width:size,height:size,display:'block'}}/></foreignObject>;
const ClaudeTile:React.FC<{x:number;y:number;s?:number;r?:number}>=({x,y,s=1,r=0})=><g transform={tr(x,y,s,r)}>
 <rect x='-97' y='-114' width='194' height='228' rx='22' fill='#F6EEE1' stroke='#A87455' strokeWidth='7'/><path d='M-82-98 H82' stroke='#FFFFFF' strokeWidth='5'/>
 <BrandMark kind='claude' x={-73} y={-88} size={146}/><Label x={0} y={93} t='Claude' size={37}/></g>;
const ClaudeSign:React.FC<{x:number;y:number;s?:number}>=({x,y,s=1})=><g transform={tr(x,y,s)}>
 <rect x='-183' y='-44' width='366' height='88' rx='15' fill='#F5EBDD' stroke='#AA805A' strokeWidth='5'/><BrandMark kind='claude' x={-162} y={-31} size={62}/><Label x={28} y={17} t='Claude skills' size={40}/></g>;
const juggle=(f:number,i:number)=>{
 const span=[30,27,34,31,28][i],phase=((f+3+i*7)%span)/span;
 const back=Math.floor((f+3+i*7)/span)%2,flight=back?1-phase:phase;
 return {x:[214,360,506,652,798][i]+mix(-42,42,flight),y:548+arc(phase,[229,284,328,280,239][i]),r:mix(-26,28,flight)};
};
const Prop:React.FC<{kind:PropKind;x:number;y:number;s?:number;r?:number;c?:string;progress?:number}>=
 ({kind,x,y,s=1,r=0,c='#D47749',progress=1})=><g transform={tr(x,y,s,r)} style={{filter:'drop-shadow(3px 6px 0px rgba(12,24,28,.18))'}}>
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
   <path d="M37 38 L88 91" stroke="#D19B57" strokeWidth="25" strokeLinecap="round"/><circle cx="-8" cy="-8" r="63" fill="#B3E2D6" fillOpacity=".28" stroke="#243D44" strokeWidth="13"/><circle cx="-8" cy="-8" r="52" fill="#ECDEB5" stroke="#E1BE78" strokeWidth="5"/><path d="M-42-34 H24 M-47-13 H35 M-45 10 H18" stroke="#6A856D" strokeWidth="9"/><path d="M-39 28 H20" stroke="#B16C4A" strokeWidth="8"/><path d="M-46-17 A42 42 0 0 1-8-48" stroke="#FAEBD0" strokeWidth="9" fill="none"/>
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
 const gait=walk?-Math.abs(Math.sin(f*.55))*9*walk:0;
 const sy=1-Math.max(0,hit)*.14,sx=1+Math.max(0,hit)*.1;
 return <><div style={{position:'absolute',left:x-size*.55,top:y-7,width:size*1.1,height:24,borderRadius:'50%',background:'rgba(6,14,20,.38)',filter:'blur(5px)',zIndex:z-1}}/>
 <div style={{position:'absolute',left:x-size/2+lean,top:y-size*.92+gait,width:size,height:size,zIndex:z,transformOrigin:'50% 100%',transform:'rotate('+rot+'deg) scale('+sx+','+sy+')'}}>
 <Mascot lf={f+23} size={size} nodAmp={0} nodSpeed={walk>0?3.8:10000} gaze={gaze*6} shock={shock} stern={stern} cheer={cheer} {...(plain?{suit:1}:costumes[i%5])}/>
 </div></>;
};

// A pose track describes successive jobs/contacts. Every travel interval has one
// fixed duration; contact recoil is a separate physical action, never a time warp.
const pose=(f:number,keys:number[][])=>{
 if(f<=keys[0][0])return keys[0][1];
 for(let i=1;i<keys.length;i++)if(f<=keys[i][0])return mix(keys[i-1][1],keys[i][1],p(f,keys[i-1][0],keys[i][0]));
 return keys[keys.length-1][1];
};
const moving=(f:number,keys:number[][])=>{
 for(let i=1;i<keys.length;i++)if(f>=keys[i-1][0]&&f<keys[i][0])return keys[i-1][1]!==keys[i][1]?1:0;
 return 0;
};
const effort=(f:number,at:number,n=10)=>Math.sin(Math.PI*p(f,at,at+n));
const ContactMarks:React.FC<{f:number;at:number;x:number;y:number;c?:string}>=({f,at,x,y,c='#E4B76A'})=>{
 if(f<at||f>at+7)return null;const q=p(f,at,at+7);
 return <g transform={tr(x,y)} opacity={1-q}>{[-1,0,1].map(i=><path key={i} d={'M'+i*(18+q*8)+' '+(-8-q*8)+' l'+i*13+' -18'} stroke={c} strokeWidth='5' fill='none'/>)}</g>;
};
const Scissors:React.FC<{x:number;y:number;f:number;at:number;s?:number;r?:number}>=({x,y,f,at,s=1,r=0})=>{
 const close=effort(f,at,10);
 return <g transform={tr(x,y,s,r)}>{[-1,1].map(side=><g key={side} transform={'rotate('+(side*(27-25*close))+' 0 0)'}><path d='M-69-9 L106 0 L-69 9Z' fill='#C0CEC7' stroke='#36545A' strokeWidth='5'/><ellipse cx='-93' cy='0' rx='27' ry='18' fill='none' stroke={side<0?'#D59059':'#6F9091'} strokeWidth='12'/></g>)}<circle r='8' fill='#E9BC72' stroke='#36545A' strokeWidth='4'/></g>;
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

const SetDetails:React.FC<{kind:SetKind}>=({kind})=>{
 const warm=kind==='studio',wood=warm?'#AD9364':'#564B3E',trim=warm?'#C0AB77':'#8F8770';
 return <Svg z={3}>
 <path d='M32 560 H980 M32 568 H980' stroke={wood} strokeWidth='5'/>
 {[0,1,2,3].map(i=><path key={i} d={'M'+(53+i*265)+' 694 l149 0 m-114 43 h83'} stroke={trim} strokeWidth='2' opacity='.28'/>)}
 {kind==='street'?<>
  {[170,233,296,359,422,485,548,611].map((y,i)=><g key={y}><path d={'M35 '+y+' H106 M902 '+y+' H980'} stroke='#C38154' strokeWidth='4'/><path d={'M'+(i%2?69:89)+' '+(y-59)+' V'+y+' M'+(i%2?931:955)+' '+(y-59)+' V'+y} stroke='#C38154' strokeWidth='4'/></g>)}
  <path d='M507 476 H525 V524 H507 M527 479 V522' stroke='#DAAF6B' strokeWidth='8' fill='none'/>
  {[102,919].map((x,i)=><g key={x}><path d={'M'+(x-30)+' 644 h60 l-9 70 h-42Z'} fill='#BE784A' stroke='#603C32' strokeWidth='5'/><path d={'M'+x+' 646 v-120 m0 60 q-40 -12 -43 -45 q47 6 43 45 m0 21 q43 -18 42 -57 q-46 10 -42 57'} fill='#3E7154' stroke='#2E5044' strokeWidth='5'/></g>)}
 </>:kind==='shoot'||kind==='edit'?<>
  <path d='M915 270 V694 M915 694 L862 739 M915 694 L968 739' stroke='#718E90' strokeWidth='7'/>
  <g transform={tr(896,225,.7,-17)}><path d='M-82-69 H78 L103-47 V51 L76 72 H-84 L-107 49 V-44Z' fill='#152D39' stroke='#658184' strokeWidth='7'/><path d='M-64-52 H60 V53 H-64Z' fill='#D3C4A2'/><path d='M-48-38 H45 V37 H-48Z' fill='#E3D9BB'/></g>
  <path d='M904 702 Q850 697 866 721 T947 736 Q971 742 945 756 H830' fill='none' stroke='#142C36' strokeWidth='7'/>
  <path d='M302 710 h44 v-22 M750 710 h-44 v-22' stroke='#C8B174' strokeWidth='7'/>
  {kind==='edit'&&<g transform={tr(85,560)}>{[0,1,2].map(i=><g key={i}><ellipse cy={i*21} rx='49' ry='15' fill='#6D7785' stroke='#252D43' strokeWidth='5'/><path d={'M-48 '+i*21+' v14 q48 25 96 0 v-14'} fill='#444D64' stroke='#252D43' strokeWidth='4'/></g>)}</g>}
 </>:['atelier','design','tailor'].includes(kind)?<>
  <path d='M67 175 H151 V543 H67Z' fill='#4B3D54' stroke='#9E8490' strokeWidth='6'/>
  {Array.from({length:13},(_,i)=><path key={i} d={'M79 '+(193+i*26)+' H'+(i%3?104:134)} stroke='#C6AE91' strokeWidth='3'/>)}
  <g transform={tr(878,450,1,8)}><path d='M-48-75 H48 V75 H-48Z' fill='#DCC5A0' stroke='#6B5564' strokeWidth='5'/>{['#4B705E','#C47E52','#E0B864','#736887'].map((c,i)=><rect key={c} x='-33' y={-57+i*31} width='65' height='24' fill={c}/>)}<circle cy='-65' r='5' fill='#AA7B52'/></g>
  <path d='M95 626 H255 V729 H95Z' fill='#4C4050' stroke='#8D756B' strokeWidth='5'/><path d='M98 666 H252 M98 702 H252 M156 646 H197 M156 685 H197 M156 720 H197' stroke='#AF9475' strokeWidth='5'/>
 </>:kind==='finance'||kind==='legal'?<>
  {[45,936].map(x=><g key={x}><rect x={x} y='180' width='29' height='378' fill='#3D3932'/><path d={'M'+(x+8)+' 184 V548'} stroke='#C09A66' strokeWidth='4'/><path d={'M'+(x-5)+' 178 h40 v17 h-40 M'+(x-5)+' 548 h40 v17 h-40'} fill='#94734C'/></g>)}
  <path d='M93 621 H304 V735 H93Z' fill={kind==='finance'?'#254C3F':'#563834'} stroke='#A88D61' strokeWidth='6'/>{[651,687,723].map(y=><g key={y}><path d={'M98 '+(y+12)+' H297'} stroke='#775F49' strokeWidth='3'/><path d={'M166 '+y+' h59'} stroke='#D2AB6B' strokeWidth='7'/></g>)}
  <path d='M752 631 L796 594 H914 L951 631 V732 H752Z' fill='#B39463' stroke='#544536' strokeWidth='5'/><path d='M801 646 H902 M801 675 H882' stroke='#745B42' strokeWidth='4'/>
 </>:kind==='code'?<>
  <path d='M62 189 H180 V526 H62Z' fill='#17333E' stroke='#496E70' strokeWidth='7'/>{[0,1,2,3].map(i=><g key={i}><rect x='74' y={206+i*77} width='94' height='62' rx='4' fill='#294D54'/><path d={'M88 '+(222+i*77)+' H151 M88 '+(237+i*77)+' H141'} stroke='#608581' strokeWidth='4'/><circle cx='149' cy={253+i*77} r='4' fill='#C7AE6B'/></g>)}
  <path d='M153 529 V595 Q153 620 209 620 H252 M83 528 V610 Q83 639 145 639 H209' stroke='#19323B' strokeWidth='8' fill='none'/>
 </>:<>
  <g transform={tr(877,503,.72)}><path d='M-34 77 H35 L44 7 H-43Z' fill={wood} stroke='#554D36' strokeWidth='5'/><path d='M0 6 V-135 M0-58 Q-68-77-58-111 Q-2-122 0-58 M0-21 Q58-43 63-87 Q5-91 0-21' fill={warm?'#7F9461':'#346257'} stroke={warm?'#667D54':'#274C46'} strokeWidth='5'/></g>
  <path d='M57 460 H164 V606 H57Z' fill={warm?'#C2A978':'#365460'} stroke={warm?'#9D855B':'#253C46'} strokeWidth='5'/><path d='M74 482 H148 M74 503 H135 M74 538 H150' stroke={warm?'#E3CEA0':'#729287'} strokeWidth='4'/>
 </>}
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

const Poster:React.FC<{x:number;y:number;s?:number;reveal?:number;variant?:number}>=({x,y,s=1,reveal=1,variant=0})=>{
 const id='poster-'+x+'-'+y+'-'+variant;
 return <g transform={tr(x,y,s)}><defs><clipPath id={id}><rect x='-124' y='-164' width='248' height={Math.max(1,reveal*328)}/></clipPath></defs>
 <g clipPath={'url(#'+id+')'}><path d='M-116-154 H116 V154 H-116Z' fill={variant?'#E9D6AD':'#F5C06B'} stroke='#332E2D' strokeWidth='8'/>
  <circle cx='0' cy='-32' r='83' fill={variant?'#446A5C':'#B65743'}/>
  {variant?<><ellipse cy='24' rx='84' ry='19' fill='#E9C78F' stroke='#644B34' strokeWidth='4'/><path d='M-74 11 Q-76-51-48-58 Q-36-85-15-61 Q6-85 24-62 Q55-76 61-45 Q86-37 71 11 Q41 41 11 14 Q-34 42-74 11Z' fill='#CC8547' stroke='#663F2D' strokeWidth='5'/><path d='M-42-49 Q-32-8-18 13 M-8-55 Q-1-12 11 12 M29-54 Q28-11 34 16' stroke='#E8B971' strokeWidth='9'/></>:<><path d='M44-57 Q105-62 89-16 Q74 8 51-4' fill='none' stroke='#DDE1BD' strokeWidth='14'/><path d='M-61-63 H57 L44 34 Q-2 64-48 32Z' fill='#F0DCB0' stroke='#294D52' strokeWidth='6'/><ellipse cx='-2' cy='-62' rx='60' ry='13' fill='#41392D' stroke='#E9CEA2' strokeWidth='6'/><ellipse cx='-2' cy='48' rx='78' ry='12' fill='#285963'/><path d='M-22-92 Q-36-108-20-126 M16-92 Q3-108 20-128' stroke='#F5E1AA' strokeWidth='6' fill='none'/><path d='M-17-34 l19-7 19 9 -4 23 -16 9 -19-10Z' fill='#BF6C43'/></>}
  <path d='M-83 82 H83 M-83 106 H56 M-83 130 H17' stroke='#332E2D' strokeWidth='11'/>
 </g>{reveal<.999&&<path d={'M-120 '+(-158+reveal*316)+' H120'} stroke='#8B6945' strokeWidth='9'/>}</g>;
};

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
 if(cut===0){
  const x=pose(f,[[0,474],[7,514],[13,493],[21,550],[28,512],[35,479],[43,540]]);
  return <><Svg z={15}><Desk x={514} y={727} w={790} c='#D7BB83'/>
   {tasks.map((k,i)=>{const a=juggle(f,i);return i===1?<ClaudeTile key={k} x={a.x} y={a.y} s={.92} r={a.r}/>:<Prop key={k} kind={k} x={a.x} y={a.y} s={[.86,.79,.83,.75,.82][i]} r={a.r}/>;})}
   {[7,21,35].map((at,i)=><ContactMarks key={at} f={f} at={at} x={i%2?682:332} y={546}/>)}
  </Svg><Sprite f={f} x={x} y={713} size={340} i={0} rot={pose(f,[[0,-9],[7,12],[13,-6],[21,16],[28,-9],[35,-13],[43,11]])} hit={Math.max(0,kick(f,7,.7)+kick(f,21,.8)+kick(f,35,.65))} stern={f<28?.8:0} shock={f>=28?1:0} cheer={.25+effort(f,8,10)*.6} gaze={f%14<7?-1:1}/></>;
 }
 if(cut===1){
  const xs=[145,326,507,688,869];
  return <><Svg z={15}><Desk x={506} y={743} w={880} c='#C9AE78'/>
   <ClaudeSign x={506} y={207} s={1.32}/>
   {tasks.map((k,i)=>{const start=i*7-3,q=travel(f,start,start+10),a=juggle(44,i);const tx=mix(a.x,xs[i]+48,q),ty=mix(a.y,624,q)+arc(q,60)+kick(f,start+10,7),rr=mix(a.r,0,q)+kick(f,start+10,8);return <g key={k}>{i===1?<ClaudeTile x={tx} y={ty} s={mix(.92,.48,q)} r={rr}/>:<Prop kind={k} x={tx} y={ty} s={mix(.84,.62,q)} r={rr}/>}<ContactMarks f={f} at={start+10} x={xs[i]+48} y={614}/></g>;})}
  </Svg>{xs.map((x,i)=>{const start=i*7-5,q=travel(f,start,start+9),caught=f>=i*7+7;return <Sprite key={i} f={f+i*9} x={x} y={mix(880,690,q)+arc(q,40)} size={206} i={i} rot={mix(i%2?16:-16,0,q)+kick(f,i*7+7,6)} hit={Math.max(0,kick(f,i*7+7,.8))} cheer={caught?.55:0} stern={caught?0:.7} gaze={caught?0:i<2?1:-1}/>;})}</>;
 }
 const speakerX=pose(f,[[0,180],[8,256],[23,256],[34,371],[46,371],[54,405]]),lift=travel(f,-2,11),unroll=.2+.8*travel(f,0,17),call=effort(f,28,13),finish=travel(f,39,49);
 const positions=[[786,365],[880,497],[766,643]];
 return <><Svg z={14}><Desk x={529} y={699} w={837} c='#CFB781'/>
  <g transform={tr(mix(755,552,lift),mix(263,430,lift),2.00,kick(f,11,3))}><Poster x={0} y={0} reveal={unroll}/><g opacity={travel(f,-2,8)}><rect x='-108' y='-150' width='216' height='57' rx='7' fill='#F5EBDD'/><BrandMark kind='claude' x={-97} y={-142} size={41}/><Label x={22} y={-110} t='Claude' size={32}/></g><path d='M-126-164 H126' stroke='#674B31' strokeWidth='13'/><path d='M-126 164 H126' stroke='#674B31' strokeWidth='10'/></g>
  {positions.map(([x,y],i)=><g key={i}><path d={'M'+(x-102)+' '+(y+3)+' H'+(x+71)+' V'+(y+21)+' H'+(x-102)+'Z'} fill='#AD945F' stroke='#5D6350' strokeWidth='5'/><path d={'M'+(x-85)+' '+(y+21)+' V743 M'+(x+55)+' '+(y+21)+' V743'} stroke='#636751' strokeWidth='9'/><Prop kind={tasks[i+1]} x={x+42} y={y-101} s={.47} r={-effort(f,18+i*9,9)*23}/></g>)}
  <Prop kind='phone' x={654} y={mix(847,537,travel(f,22,34))} s={1.18} r={mix(14,-8,travel(f,22,34))}/><Prop kind='megaphone' x={speakerX+85+call*12} y={556-call*15} s={.9} r={-11-call*13}/>
  {[0,1,2].map(i=><path key={i} d={'M'+(speakerX+157+i*18)+' '+(512-i*11)+' Q'+(speakerX+184+i*22)+' 548 '+(speakerX+157+i*18)+' '+(583+i*11)} stroke='#BF8743' strokeWidth='6' fill='none' opacity={f>=29+i*3&&f<43?1:0}/>)}
  <g transform={tr(587,605,1+Math.max(0,kick(f,49,.07)))} opacity={finish}><path d='M-74-22 H74 V22 H-74Z' fill='#315F53' stroke='#E4C082' strokeWidth='6'/><path d={'M-27 0 L-8 14 L'+mix(-8,31,finish)+' '+mix(14,-17,finish)} stroke={PAPER} strokeWidth='8' fill='none'/></g>
 </Svg>{positions.map(([x,y],i)=><Sprite key={i} f={f} x={x-26} y={y} size={154} i={i+1} rot={-effort(f,18+i*9,9)*7} cheer={f>27+i*9?.7:0}/>)}
 <Sprite f={f} x={speakerX} walk={moving(f,[[0,180],[8,256],[23,256],[34,371],[46,371],[54,405]])} y={748} size={335} i={0} rot={-6-call*8+effort(f,44,10)*8} cheer={f>44?1:.3} gaze={1}/></>;
};

const Office:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===1){const open=travel(f,7,19),names=['MARKETING','CONTENT','DESIGN','FINANCE','LEGAL'];
 return <><Svg z={15}><g transform={'translate(0 '+(mix(347,0,travel(f,-1,10))+kick(f,10,5))+')'}><path d='M113 184 H884 L930 691 H76Z' fill='#AF9569' stroke='#213333' strokeWidth='11'/><path d='M136 188 H855 V665 H136Z' fill='#DACCAB' stroke='#837452' strokeWidth='8'/><path d='M145 192 H196 V660 H145Z' fill='#284F49'/><path d='M847 200 H867 V678 H152 V665' fill='#A99975' stroke='#665B43' strokeWidth='4'/>
  {[0,1,2,3,4,5].map(i=><g key={i}><ellipse cx='169' cy={229+i*75} rx='17' ry='10' fill='none' stroke='#D6B778' strokeWidth='7'/><path d={'M169 '+(216+i*75)+' v26'} stroke='#566B5D' strokeWidth='3'/></g>)}
  <defs><clipPath id='chapter-index'><rect x='194' y='203' width='647' height='441'/></clipPath></defs><g clipPath='url(#chapter-index)'>
  {names.map((name,i)=>{const start=5+i*12,q=travel(f,start,start+[7,9,8,11,6][i]);return <g key={name} transform={'translate('+mix(i%2?-666:666,0,q)+' 0)'}><path d={'M206 '+(206+i*87)+' H833 V'+(280+i*87)+' H206Z'} fill={colors[i]} stroke='#203C3C' strokeWidth='4'/><path d={'M217 '+(215+i*87)+' H818'} stroke='#E8D2A1' strokeWidth='3' opacity='.6'/><Prop kind={tasks[i]} x={264} y={245+i*87} s={.34}/><Label x={516} y={257+i*87} t={name} size={32} c={PAPER}/><path d={'M778 '+(230+i*87)+' l14 14 -14 14'} stroke='#E8D7B1' strokeWidth='6' fill='none'/></g>;})}
  </g><g transform={'translate(196 0) scale('+(1-open)+' 1)'}><path d='M0 188 H650 V665 H0Z' fill='#325E54' stroke='#D4BB87' strokeWidth='8'/><path d='M40 223 H610 V630 H40Z' fill='none' stroke='#719077' strokeWidth='6'/><path d='M182 348 H472 M234 386 H416 M194 485 H460' stroke='#D4BF8E' strokeWidth='17'/></g>
 </g></Svg><Sprite f={f} x={pose(f,[[0,954],[11,803],[54,803],[64,682],[74,707]])} y={781} size={319} plain walk={moving(f,[[0,954],[11,803],[54,803],[64,682],[74,707]])} rot={-effort(f,10,12)*8+effort(f,63,11)*9} cheer={f>63?.8:0} gaze={-1}/></>;
 }
 const pos=[[199,402],[484,433],[793,400],[327,698],[711,698]];
 return <><Svg z={10}><ClaudeSign x={505} y={164} s={.95}/><path d='M51 484 H962 V509 H51Z M470 214 V501' stroke='#162D36' strokeWidth='12'/><path d='M62 487 H262 V721 H62 M952 487 H834 V721 H952' fill='none' stroke='#779A94' strokeWidth='12'/>
  {[535,586,637,688].map(y=><path key={y} d={'M62 '+y+' H262 M834 '+y+' H952'} stroke='#799890' strokeWidth='7'/>)}
  {pos.map(([x,y],i)=>{const at=26+i*11,w=effort(f,at,12);return <g key={i}><Desk x={x} y={y+54} w={i<3?245:292} c={i%2?'#B48C65':'#BAAD7D'}/><Prop kind={tasks[i]} x={x+63-w*38} y={y-77-w*26} s={.62} r={-w*[32,-18,47,-12,38][i]}/><ContactMarks f={f} at={at+7} x={x+20} y={y-30}/><g opacity={travel(f,at+6,at+12)}><path d={'M'+(x-51)+' '+(y+6)+' H'+(x+42)+' v23 h-93Z'} fill={PAPER}/>{[0,1,2].map(j=><path key={j} d={'M'+(x-39)+' '+(y+12+j*6)+' H'+(x+18+j*7)} stroke={colors[i]} strokeWidth='4'/>)}</g></g>;})}
 </Svg>{pos.map(([x,y],i)=>{const q=travel(f,i*7-3,i*7+7),at=26+i*11,w=effort(f,at,12);return <Sprite key={i} f={f} x={mix(x-250,x-35,q)+w*22} y={y+(i<3?76:30)} size={i<3?218:246} i={i} walk={q<1?1:0} rot={-7*w+kick(f,i*7+7,4)} hit={Math.max(0,kick(f,i*7+7,.55))} cheer={f>at+12?.5:0} stern={w>.1?.8:0} gaze={1}/>;})}</>;
};

const Skill:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const place=travel(f,-2,12),draw=pose(f,[[0,0],[14,0],[25,.32],[34,.32],[44,.67],[53,.67],[64,1]]);
 if(cut===0){const pull=travel(f,46,57),test=effort(f,66,13);
 return <><Svg z={15}><Desk x={510} y={664} w={806}/><g transform={tr(mix(708,352,place),mix(298,403,place),1.76,kick(f,12,3))}>
  <g transform={'scale('+travel(f,23,35)+' 1)'}><path d='M-80-104 H-177 V108 H-80Z' fill='#DBCDA4' stroke='#716A52' strokeWidth='4'/><path d='M-160-65 H-97 M-160-26 H-97 M-160 13 H-110 M-160 54 H-97' stroke='#778D6A' strokeWidth='8'/></g><Prop kind='file' x={0} y={0} progress={travel(f,17,39)}/><path d={'M-71-33 H71 V'+mix(-32,80,travel(f,18,29))+' H-71Z'} fill='#8DB695' opacity={f>=18&&f<42?.28:0}/><Label x={-2} y={-4} t='ROLE → TASK' size={15}/><Label x={-2} y={49} t='HOW TO WORK' size={14}/><path d='M-70 93 H71' stroke='#A6916C' strokeWidth='4'/>
 </g><Prop kind='pencil' x={mix(423,633,pull)+test*22} y={mix(450,549,pull)+arc(pull,90)-test*27} s={.94} r={mix(-34,20,pull)+test*22}/><ContactMarks f={f} at={57} x={634} y={548}/><path d={'M533 649 H'+mix(535,677,travel(f,70,78))} stroke='#D6B66D' strokeWidth='10'/>
 </Svg><Sprite f={f} x={pose(f,[[0,844],[10,748],[43,748],[54,655],[62,655],[76,739]])} walk={moving(f,[[0,844],[10,748],[43,748],[54,655],[62,655],[76,739]])} y={733} size={319} i={4} rot={-effort(f,22,12)*9+test*10} stern={f<58?.8:0} cheer={f>=78?.8:0} gaze={-1}/><div style={{position:'absolute',left:537,top:205,width:65,height:65,zIndex:28,background:PAPER,borderRadius:12,padding:8}}><Img src={staticFile('claude_logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div></>;
 }
 const bx=pose(f,[[0,686],[12,445],[23,611],[32,611],[43,451],[52,451],[64,620],[74,650]]),by=pose(f,[[0,293],[12,358],[23,396],[32,396],[43,466],[52,466],[64,536],[74,593]]);
 return <><Svg z={15}><Desk x={510} y={664} w={806}/><Prop kind='file' x={196} y={363} s={.88} r={-8}/><g transform={'rotate('+pose(f,[[0,-8],[9,0],[25,0],[32,10],[44,10],[51,-7],[64,-7],[74,0]])+' 594 431)'}><Poster x={594} y={431} s={1.65} reveal={draw} variant={1}/></g><Prop kind='brush' x={bx} y={by} s={.74} r={f<32?27:-24}/>
  {[23,43,64].map(at=><ContactMarks key={at} f={f} at={at} x={bx} y={by-47}/>)}
  <path d={'M780 540 L'+mix(782,811,travel(f,66,71))+' '+mix(540,568,travel(f,66,71))+' L'+mix(811,870,travel(f,71,77))+' '+mix(568,494,travel(f,71,77))} stroke='#70AC80' strokeWidth='13' fill='none'/>
 </Svg><Sprite f={f} x={pose(f,[[0,326],[12,326],[23,452],[31,452],[43,364],[51,364],[64,515],[76,531]])} walk={moving(f,[[0,326],[12,326],[23,452],[31,452],[43,364],[51,364],[64,515],[76,531]])} y={736} size={319} i={2} rot={effort(f,14,13)*11-effort(f,36,12)*7+effort(f,56,12)*9} stern={f<66?.85:0} cheer={f>=67?.85:0} gaze={1}/></>;
};

const Marketing:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===0){const actorX=pose(f,[[0,175],[10,256],[16,427],[28,478],[34,701],[45,758],[49,729]]),stroke=Math.min(2,Math.floor(f/16)),yy=pose(f,[[0,652],[12,200],[16,200],[28,652],[32,652],[44,200],[48,228]]),xx=pose(f,[[0,201],[12,201],[16,507],[28,507],[32,813],[44,813],[48,854]]);
 return <><Svg z={15}><path d='M53 169 H962 V695 H53Z' fill='#E6C48E' stroke='#704332' strokeWidth='16'/>
  <defs><clipPath id='painted-campaign'>{[0,1,2].map(i=><rect key={i} x={65+i*295} y={i<stroke?184:stroke%2?184:yy} width='309' height={i<stroke?494:i===stroke?stroke%2?yy-180:679-yy:0}/>)}</clipPath></defs>
  <g clipPath='url(#painted-campaign)'><rect x='64' y='181' width='887' height='500' fill='#174653'/><Poster x={507} y={422} s={1.57}/></g>
  <g transform={tr(xx,yy)}><rect x='-149' y='-23' width='298' height='46' rx='9' fill='#D9814E' stroke='#EDB16A' strokeWidth='6'/><path d={'M139 24 V65 H22 L'+(actorX+126-xx)+' '+(613-yy)} fill='none' stroke='#CEB481' strokeWidth='13'/><path d='M-129-9 H120' stroke='#E9A56B' strokeWidth='4'/></g>
 </Svg><Sprite f={f} x={actorX} walk={moving(f,[[0,175],[10,256],[16,427],[28,478],[34,701],[45,758],[49,729]])} y={750} size={319} i={0} rot={stroke%2?8:-11} stern={.8} cheer={.25} gaze={stroke<2?-1:1}/></>;
 }
 if(cut===1){const awning=travel(f,-2,10),a=travel(f,13,24),b=travel(f,32,44);
 return <><Svg z={15}><g transform={'translate(0 '+mix(-149,0,awning)+')'}><path d='M133 173 H878 L935 297 H78Z' fill='#E3B66E' stroke='#66362D' strokeWidth='8'/>
  {Array.from({length:8},(_,i)=><path key={i} d={'M'+(140+i*92)+' 176 H'+(184+i*92)+' L'+(200+i*100)+' 297 H'+(147+i*100)+'Z'} fill='#9E4737'/>)}
  <path d='M81 297 H933 V330 H81Z' fill='#B55D40'/>{Array.from({length:17},(_,i)=><path key={i} d={'M'+(82+i*50)+' 328 q25 31 50 0'} fill='#B55D40' stroke='#8D4737' strokeWidth='3'/>)}<path d='M145 183 H868 M99 292 H916' stroke='#F2CE91' strokeWidth='5'/></g>
  <g transform={'translate(0 '+kick(f,24,5)+')'}><Poster x={338} y={488} s={1.28} reveal={a}/></g><g transform={'translate(0 '+kick(f,44,5)+')'}><Poster x={682} y={488} s={1.28} reveal={b} variant={1}/></g>
  {[338,682].map((x,i)=><g key={i}><path d={'M'+(x-156)+' 283 H'+(x+156)} stroke='#7B5840' strokeWidth='11'/><circle cx={x-144} cy='283' r='8' fill='#E0BE81'/><circle cx={x+144} cy='283' r='8' fill='#E0BE81'/></g>)}
  <ContactMarks f={f} at={24} x={338} y={622}/><ContactMarks f={f} at={44} x={682} y={622}/>
 </Svg><Sprite f={f} x={pose(f,[[0,173],[12,282],[24,282],[34,625],[45,625],[55,512],[65,539]])} walk={moving(f,[[0,173],[12,282],[24,282],[34,625],[45,625],[55,512],[65,539]])} y={766} size={319} i={0} gaze={f<31?-1:1} rot={-effort(f,15,12)*9+effort(f,36,12)*9} cheer={f>48?.8:0}/></>;
 }
 const art=pose(f,[[0,.15],[11,.35],[19,.35],[29,.67],[36,.67],[46,1]]),paper=travel(f,20,30),brushx=pose(f,[[0,183],[11,470],[19,470],[29,205],[36,205],[46,460],[56,501]]),brushy=pose(f,[[0,296],[11,350],[19,350],[29,441],[36,441],[46,523],[56,621]]);
 return <><Svg z={15}><Poster x={338} y={434} s={1.43} reveal={art}/><g transform={tr(mix(1031,728,paper),411,1,kick(f,30,3))}><path d='M-133-185 H133 V185 H-133Z' fill='#E9D6A8' stroke='#6D4937' strokeWidth='8'/>
  {[0,1,2,3,4].map(i=><path key={i} d={'M-103 '+(-134+i*57)+' H'+mix(-102,i%2?42:106,travel(f,27+i*6,31+i*6))} stroke={i===0?'#A24E3E':'#324F52'} strokeWidth={i===0?26:14}/>)}</g><Prop kind='brush' x={brushx} y={brushy} s={.7} r={f<20?26:-24}/><ContactMarks f={f} at={30} x={728} y={576}/>
 </Svg><Sprite f={f} x={pose(f,[[0,524],[10,439],[20,439],[30,624],[40,624],[49,767],[61,653]])} walk={moving(f,[[0,524],[10,439],[20,439],[30,624],[40,624],[49,767],[61,653]])} y={752} size={319} i={0} rot={-effort(f,2,12)*9+effort(f,23,12)*8-effort(f,39,12)*7} stern={f<49?.8:0} cheer={f>=50?.8:0} gaze={f<23?-1:1}/></>;
};

const Film:React.FC<{f:number;x:number;y:number;w?:number;h?:number}>=({f,x,y,w=710,h=134})=><g transform={tr(x,y)}>
 <defs><clipPath id="film-bound"><rect width={w} height={h}/></clipPath></defs>
 <g clipPath="url(#film-bound)"><rect width={w} height={h} fill="#10202D"/>
  {Array.from({length:8},(_,i)=>{const xx=i*161-(f*8)%161;return <g key={i} transform={'translate('+xx+' 0)'}>
   <rect x="7" y="23" width="142" height={h-46} rx="4" fill={i%2?'#68A6A2':'#D2A467'}/>
   <circle cx="78" cy="60" r="22" fill="#D97757"/><path d={'M34 '+(h-25)+' Q78 47 122 '+(h-25)} fill={i%2?'#324B67':'#744E64'}/>
   {[17,48,79,110,141].map(xx=><g key={xx}><rect x={xx} y="7" width="16" height="8" fill="#D6C59E"/><rect x={xx} y={h-15} width="16" height="8" fill="#D6C59E"/></g>)}
  </g>;})}</g></g>;
const Social:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===0){const jump=arc(p(f,6,25),105),print=travel(f,28,40),lift=travel(f,46,56);
 return <><Sprite f={f} x={548} y={661+jump+kick(f,25,10)} size={395} i={1} rot={-effort(f,5,21)*9+effort(f,48,12)*7} hit={Math.max(0,kick(f,25,.9))} cheer={f>=12?.8:0} gaze={-1}/>
  <Svg z={50}><path d='M211 536 L138 747 M211 536 L275 747 M211 536 V746' stroke='#B3B9A5' strokeWidth='14'/><Prop kind='camera' x={211} y={475} s={1.3} progress={1-effort(f,13,6)}/>
   <g transform={tr(mix(211,380,lift),mix(534,641,print)-lift*47,.69+lift*.1,kick(f,40,4)-lift*12)} opacity={f>=28?1:0}><rect x='-81' y='-105' width='162' height='210' fill={PAPER} stroke='#30434B' strokeWidth='6'/><rect x='-68' y='-92' width='136' height='160' fill='#6CACAA'/><foreignObject x='-77' y='-85' width='154' height='154'><div><Mascot lf={39} size={154} glasses={1} cheer={.8} nodAmp={0} nodSpeed={10000} gaze={-6}/></div></foreignObject><path d='M-55 85 H55' stroke='#B4A480' strokeWidth='5'/></g>
   <g transform={tr(742,224,.84,kick(f,5,4))}><path d='M-110-34 H110 V57 H-110Z' fill='#18313D' stroke='#C1D0BA' strokeWidth='6'/><g transform={'rotate('+mix(-34,0,travel(f,-1,5))+' -110 -34)'}><path d='M-110-62 H110 V-32 H-110Z' fill={PAPER}/>{[-90,-40,10,60].map(x=><path key={x} d={'M'+x+' -62 l30 0 -22 30 -30 0Z'} fill='#253D4A'/>)}</g><Label x={0} y={24} t='TAKE 01' c={PAPER} size={25}/></g>
   <ContactMarks f={f} at={5} x={742} y={194}/><ContactMarks f={f} at={16} x={209} y={383}/><ContactMarks f={f} at={40} x={208} y={684}/>
  </Svg></>;
 }
 if(cut===1){const q=travel(f,-2,10),thumb=travel(f,31,43),splice=travel(f,57,65);
 return <><Svg z={15}><Desk x={505} y={697} w={873}/><Film f={f} x={104} y={372} w={808} h={188}/><g transform={tr(196,266,1,f*7)}><circle r='97' fill='#A9B3A7' stroke='#2B404D' strokeWidth='10'/>{[0,1,2,3,4].map(i=><circle key={i} cx={Math.cos(i*1.256)*57} cy={Math.sin(i*1.256)*57} r='21' fill='#283E49'/>)}<circle r='15' fill='#DCB868'/></g>
  <g transform={tr(mix(422,550,q),mix(216,302,q),.83,kick(f,10,3))}><path d='M-88-63 H88 V63 H-88Z' fill={PAPER} stroke='#3D4053' strokeWidth='7'/><Label x={0} y={-23} t='SCRIPT' size={24}/><path d='M-63 0 H58 M-63 25 H39' stroke='#8B7892' strokeWidth='10'/></g>
  <g transform={tr(mix(933,798,thumb),mix(224,312,thumb),.52,kick(f,43,4))}><Poster x={0} y={0} s={.58}/></g>
  <Scissors x={pose(f,[[0,455],[16,455],[27,591],[39,591],[49,681],[63,681],[76,839]])} y={592} f={f} at={f<34?19:f<54?39:59} s={.67} r={-56}/>
  <rect x={mix(670,596,splice)} y={mix(230,402,splice)} width='33' height='137' fill='#E8C984' opacity={f>56?.7:0}/><ContactMarks f={f} at={65} x={612} y={399}/>
 </Svg><Sprite f={f} x={669} y={770} size={319} i={1} rot={effort(f,18,13)*9+effort(f,37,13)*7+effort(f,57,13)*10} stern={f<66?.9:0} cheer={f>=67?.7:0} gaze={-1}/></>;
 }
 const land=travel(f,-2,10),swipe=pose(f,[[0,0],[18,0],[24,1],[37,1],[43,2]]),tap=effort(f,50,10);
 return <><Svg z={20}><Prop kind='phone' x={mix(632,481,land)} y={mix(492,389,land)} s={2.45} c='#4A7490'/><g transform={tr(mix(632,481,land),mix(492,389,land),1.12)}><defs><clipPath id='portrait-film'><rect x='-98' y='-148' width='196' height='278' rx='14'/></clipPath></defs><g clipPath='url(#portrait-film)'><g transform={'translate('+(-swipe*207)+' 0)'}>{[0,1,2].map(i=><g key={i} transform={'translate('+(i*207)+' 0)'}><rect x='-98' y='-148' width='196' height='278' fill={['#6EA5A7','#D7A66D','#7A7C9E'][i]}/><foreignObject x='-93' y='-78' width='186' height='186'><div><Mascot lf={f+i*17} size={186} glasses={1} nodAmp={0} nodSpeed={10000} cheer={i===1?.8:0}/></div></foreignObject><path d='M-70 105 H70 M-54 126 H54' stroke={PAPER} strokeWidth='8'/></g>)}</g></g></g>
  <path d='M320 674 H642' stroke='#507C78' strokeWidth='9'/><path d={'M320 674 H'+(320+322*(swipe/2))} stroke='#E5BA69' strokeWidth='9'/>
  <path d={'M598 583 l'+(-tap*12)+' '+(-tap*9)+' l25 3 -12 9 -3 16Z'} fill='#EDF1E3' stroke='#243B46' strokeWidth='4'/><ContactMarks f={f} at={55} x={599} y={580}/>
  <path d={'M624 254 L'+mix(625,645,travel(f,56,60))+' '+mix(254,273,travel(f,56,60))+' L'+mix(645,690,travel(f,60,64))+' '+mix(273,224,travel(f,60,64))} stroke='#83B793' strokeWidth='12' fill='none'/>
 </Svg><Sprite f={f} x={pose(f,[[0,864],[9,783],[18,783],[26,697],[35,697],[43,747],[49,747],[57,666],[65,705]])} walk={moving(f,[[0,864],[9,783],[18,783],[26,697],[35,697],[43,747],[49,747],[57,666],[65,705]])} y={746} size={319} i={1} rot={-effort(f,20,9)*8+effort(f,40,9)*8-effort(f,51,11)*7} cheer={f>55?1:.3} gaze={-1}/></>;
};

const Gateway:React.FC<{f:number;cut:number}>=({f,cut})=>{
 const haul=travel(f,-2,11),draw1=travel(f,22,33),draw2=travel(f,40,51),draw3=travel(f,59,69),grab=travel(f,-1,9);
 return <><Svg z={18}><path d='M209 217 H830 V589 H209Z' fill='#E6CAA3' stroke='#463346' strokeWidth='13'/><path d='M233 243 H803 V562 H233Z' fill='none' stroke='#BB9F7F' strokeWidth='2'/>
  {cut===0?<><path d='M242 253 H792 V535 H242Z M242 300 H792' fill='none' stroke='#7F7395' strokeWidth='8'/>
   <path d={'M269 498 V'+mix(498,332,draw1)+' H'+mix(269,510,draw1)+' V498Z'} fill='#BAADBC' stroke='#7F7395' strokeWidth='8'/>
   <path d={'M545 340 H'+mix(545,763,draw2)+' M545 385 H'+mix(545,733,draw2)+' M545 432 H'+mix(545,746,draw3)} stroke='#7F7395' strokeWidth='10'/>
   <path d={'M183 103 H'+mix(856,230,haul)+' V710 H183Z'} fill='#665172' stroke='#2B293D' strokeWidth='11'/>{[0,1,2,3,4].map(i=><path key={i} d={'M'+mix(260+i*115,194+i*7,haul)+' 144 V675'} stroke='#9F7991' strokeWidth='13'/>)}
   <path d={'M'+mix(845,239,haul)+' 188 V612 L'+mix(716,206,haul)+' 674'} stroke='#D2AB60' strokeWidth='8' fill='none'/>
   <g opacity={f>=23?1:0}><Website x={548} y={mix(841,409,travel(f,23,36))} s={1.08} fresh={0} open={travel(f,42,57)}/></g>
   {f>=56&&<g><path d={'M279 282 H'+mix(280,812,travel(f,56,65))+' M279 416 H'+mix(280,812,travel(f,62,72))} stroke='#D9AC62' strokeWidth='8'/>{[0,1,2].map(i=><path key={i} d={'M'+(284+i*181)+' 437 V'+mix(438,568,travel(f,59+i*3,66+i*3))+' H'+(435+i*181)} fill='none' stroke='#D9AC62' strokeWidth='7'/>)}</g>}
   {[229,842].map(x=><g key={x}><circle cx={x} cy='166' r='20' fill='#4F4058' stroke='#C9A765' strokeWidth='6'/><path d={'M'+(x-11)+' 156 l22 20 m0 -20 l-22 20'} stroke='#DCC088' strokeWidth='3' transform={'rotate('+(haul*260)+' '+x+' 166)'}/></g>)}
  </>:<><g transform='translate(-95 -78) scale(1.18)'><Website x={540} y={403} s={1.08} fresh={0}/><rect x='262' y='265' width='556' height='290' fill='#E7DABD'/>
 <defs><clipPath id='structure-viewport'><rect x='260' y='265' width='559' height='313'/></clipPath></defs><g clipPath='url(#structure-viewport)'><g transform={'translate('+mix(-680,0,travel(f,-1,10))+' 0)'}><rect x='277' y='277' width='526' height='110' rx='6' fill='#665C8B'/><path d='M330 309 H740 M388 340 H681' stroke='#E1D3AA' strokeWidth='12'/></g>
 {[0,1,2].map(i=><g key={i} transform={'translate(0 '+mix(294,0,travel(f,10+i*10,19+i*10))+')'}><rect x={277+i*177} y='392' width='175' height='180' rx='5' fill={['#AAA2B0','#BCAB8B','#8B9C9A'][i]}/><circle cx={355+i*177} cy='439' r='26' fill='#5B6D79'/><path d={'M'+(303+i*177)+' 493 H'+(407+i*177)} stroke='#EBDFBB' strokeWidth='10'/></g>)}</g>
 <Prop kind='pencil' x={pose(f,[[0,868],[9,387],[15,387],[27,661],[31,661],[42,451]])} y={pose(f,[[0,184],[9,465],[15,465],[27,373],[31,373],[42,527]])+arc(grab,67)} s={1.2} r={pose(f,[[0,39],[9,9],[15,9],[27,26],[31,26],[42,-13]])}/>
 <path d={'M303 489 L'+mix(305,673,travel(f,15,27))+' '+mix(489,368,travel(f,15,27))+' M451 522 H'+mix(452,704,travel(f,32,43))} stroke='#D8AE65' strokeWidth='8'/><ContactMarks f={f} at={9} x={388} y={465}/></g></>}
 </Svg><Sprite f={f} x={cut===0?mix(766,311,haul)+186*travel(f,57,70):pose(f,[[0,497],[9,378],[20,378],[28,554],[32,554],[42,726],[47,719]])} y={747} size={319} i={2} walk={cut===0?(haul<1||f>57&&f<70?1:0):moving(f,[[0,497],[9,378],[20,378],[28,554],[32,554],[42,726],[47,719]])} rot={cut===0?-effort(f,-2,16)*14+effort(f,43,10)*7:effort(f,15,12)*10-effort(f,32,11)*8} hit={Math.max(0,kick(f,11,.65))} stern={.7} cheer={f>63?.6:0} gaze={cut===0?1:-1}/></>;
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
 if(cut===0){const align=travel(f,12,20),colour=travel(f,30,38),fresh=travel(f,39,51);
 return <><Svg z={16}><Desk x={502} y={711} w={857}/><Website x={523} y={405} s={1.23} fresh={fresh}/>
  <g transform={tr(mix(302,423,travel(f,-2,9)),336,1.04)}><path d='M-88-58 H84 V-30 H-88Z' fill='#B8CBC6' stroke='#304D55' strokeWidth='6'/><path d={'M-78-58 V'+mix(63,27,align)+' H-52 V-30 M'+mix(83,20,align)+' -58 V27 h-25 v-57'} stroke='#304D55' strokeWidth='7' fill='#B8CBC6'/><path d='M-7-30 V102 H15 V-30' fill='#C4D2CA' stroke='#304D55' strokeWidth='6'/>{[4,25,46,67,88].map(y=><path key={y} d={'M-6 '+y+' H8'} stroke='#527D80' strokeWidth='4'/>)}</g>
  <Prop kind='palette' x={mix(899,733,travel(f,23,33))} y={427} s={1.03} r={kick(f,33,6)}/><path d={'M706 426 L'+mix(707,652,colour)+' '+mix(426,393,colour)} stroke='#CB8453' strokeWidth='14'/>
  <rect x='161' y='177' width='182' height='42' rx='8' fill='#263B44'/><rect x='718' y='205' width='138' height='42' rx='8' fill='#263B44'/><Label x={252} y={207} t='UI UX PRO' c={PAPER} size={25}/><Label x={787} y={234} t='TASTE' c={PAPER} size={25}/><ContactMarks f={f} at={20} x={423} y={365}/><ContactMarks f={f} at={51} x={623} y={500}/>
 </Svg><Sprite f={f} x={pose(f,[[0,295],[10,314],[20,423],[29,423],[39,625],[46,625],[56,519]])} walk={moving(f,[[0,295],[10,314],[20,423],[29,423],[39,625],[46,625],[56,519]])} y={765} size={319} i={2} rot={effort(f,12,10)*9-effort(f,35,11)*9} stern={f<45?.8:0} cheer={f>=49?.8:0} gaze={1}/></>;
 }
 if(cut===1){return <><Svg z={16}>{[0,1,2].map(i=>{const q=travel(f,i*19-3,i*19+8),compare=travel(f,56+i*2,66+i*2);return <g key={i} opacity={f>=i*19-3?1:0} transform={'translate('+(mix(221+i*280,409+i*94,compare)-(221+i*280))+' '+(mix(354+i*48,386+i*16,compare)-(354+i*48))+')'}><Website x={mix(900,221+i*280,q)} y={354+i*48} s={.82} fresh={0}/><path d={'M'+(173+i*280)+' '+(529+i*48)+' H'+mix(174+i*280,268+i*280,travel(f,i*19+9,i*19+15))} stroke='#DBAC65' strokeWidth='7'/></g>;})}
  <path d={'M144 221 H'+mix(146,861,travel(f,56,65))} stroke='#DEB56F' strokeWidth='8' strokeDasharray='18 12'/><ContactMarks f={f} at={65} x={808} y={228}/>
 </Svg><Sprite f={f} x={537} y={757} size={319} i={2} gaze={pose(f,[[0,-1],[23,-1],[27,1],[44,1],[48,-1],[60,-1],[65,1]])} rot={effort(f,25,9)*-11+effort(f,47,10)*11} shock={f>43?1:0}/></>;
 }
 if(cut===2){const peel=travel(f,-2,13),layout=travel(f,19,31),mobile=travel(f,40,51);
 return <><Svg z={18}><Website x={505} y={400} s={1.55} fresh={layout}/>
  {f<17&&<g transform={'translate('+mix(0,735,peel)+' '+mix(0,-176,peel)+') rotate('+mix(0,28,peel)+' 507 395)'}><rect x='170' y='200' width='674' height='414' rx='8' fill='#76618D' stroke='#CEACB1' strokeWidth='9'/><path d='M214 253 H800 V365 H214Z M214 407 H385 V566 H214Z M418 407 H589 V566 H418Z M622 407 H793 V566 H622Z' fill='#382D49'/><path d='M174 204 L212 249 V609' stroke='#DDC1C0' strokeWidth='7' fill='none'/></g>}
  <path d={'M550 532 H'+mix(551,775,mobile)} stroke='#E2B562' strokeWidth='6'/><path d={'M550 551 H'+mix(551,704,travel(f,46,56))} stroke='#9BAC92' strokeWidth='5'/><ContactMarks f={f} at={31} x={506} y={518}/>
  {f>=37&&<g transform={tr(mix(565,783,travel(f,37,51)),mix(810,498,travel(f,37,51)),.92,mix(-17,0,travel(f,37,51)))}><Prop kind='phone' x={0} y={0} s={1.1}/><rect x='-49' y='-91' width='98' height='165' rx='5' fill='#E9DEB6'/><path d='M-38-77 H39 V-15 H-38Z' fill='#CB8755'/><path d='M-34-19 L-3-66 L34-19Z' fill='#3F6E5B'/><path d='M-35 1 H36 M-35 22 H30 M-35 43 H36' stroke='#4E6C5D' strokeWidth='7'/></g>}
 </Svg><Sprite f={f} x={mix(251,349,travel(f,-1,10))} y={754} size={319} i={2} rot={pose(f,[[0,-13],[9,16],[16,2],[25,-8],[33,0],[44,8],[54,0]])} walk={f<10?1:0} stern={f<33?.8:0} cheer={f>47?.8:0} gaze={1}/></>;
 }
 const fit=travel(f,-1,10),phone=travel(f,16,28),tap=effort(f,36,11);
 return <><Svg z={18}><Website x={mix(513,381,fit)} y={391} s={mix(1.52,.94,fit)} fresh={1}/><Prop kind='phone' x={mix(1059,790,phone)} y={436+arc(phone,46)} s={1.49} r={mix(18,0,phone)} c='#3D6D55'/>
  <g transform={tr(790,436)} opacity={phone}><rect x='-68' y='-120' width='136' height='210' rx='8' fill='#E9DEB6'/><rect x='-55' y='-107' width='110' height='76' fill='#CB8755'/><path d='M-49-39 L-8-95 L46-39Z' fill='#3F6E5B'/><path d='M-51-12 H51 M-51 9 H41 M-51 31 H48' stroke='#4E6C5D' strokeWidth='8'/><rect x='-48' y='58' width='96' height='20' fill={f>=43?'#9DB880':'#366553'}/></g>
  <path d={'M842 '+(522-tap*14)+' l19 7 -9 6 -5 15Z'} fill={PAPER} stroke='#2D4848' strokeWidth='4'/><ContactMarks f={f} at={43} x={840} y={508}/><g transform={tr(787,637,travel(f,43,51))}><circle r='48' fill='#4F8B65' stroke='#D8C28D' strokeWidth='6'/><path d='M-24 0 L-6 19 L26-21' fill='none' stroke='#E6E7C4' strokeWidth='10'/></g>
 </Svg><Sprite f={f} x={562} y={753} size={319} i={2} rot={-effort(f,18,12)*7+effort(f,42,11)*7} cheer={f>43?1:.25} gaze={1}/></>;
};

const Statement:React.FC<{x:number;y:number;s?:number;reveal?:number;variance?:number}>=({x,y,s=1,reveal=1,variance=0})=><g transform={tr(x,y,s)}>
 <path d="M-195-185 H195 V186 H-195Z" fill="#E9DEB5" stroke="#284A40" strokeWidth="9"/>
 <Label x={0} y={-135} t={variance?'BUDGET / ACTUAL':'FINANCIAL STATEMENT'} size={variance?23:20}/>
 <defs><clipPath id='financial-entries'><rect x='-181' y='-125' width='362' height='236'/></clipPath></defs><g clipPath='url(#financial-entries)'>{[0,1,2,3,4].map(i=><g key={i} transform={'translate('+mix(-325,0,travel(reveal*100,i*15,i*15+12))+' 0)'} opacity={reveal*100>i*15?1:0}>
  <rect x='-166' y={-119+i*44} width='332' height='38' rx='3' fill={i%2?'#C1B38A':'#E3CF9D'}/><path d={'M-161 '+(-85+i*44)+' H160'} stroke="#B4AF88" strokeWidth="3"/><rect x="-154" y={-108+i*44} width={57+i*10} height="13" fill="#68866A"/>
  <rect x="-16" y={-108+i*44} width={71} height="13" fill="#A9966B"/><rect x="87" y={-108+i*44} width={i===2&&variance?47:61} height="13" fill={i===2&&variance?'#C06A4D':'#689472'}/>
 </g>)}</g>
 <path d="M-163 139 H162" stroke="#254D41" strokeWidth="6"/>
 <path d={'M74 156 H'+mix(75,158,reveal)} stroke="#3D7656" strokeWidth="14"/>
 </g>;
const Finance:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===0){const page=Math.min(2,Math.floor(f/17)),flip=travel(f,page*17-1,page*17+9);
 return <><Svg z={15}><Desk x={508} y={687} w={827}/><g transform={tr(502,403,2.08)}><Prop kind='ledger' x={0} y={0}/><g transform={'scale('+Math.max(.035,Math.abs(1-flip*2))+' 1)'}><path d='M0-77 Q43-93 96-76 V86 Q43 71 0 90Z' fill='#F4E8C4' stroke='#B5AA83' strokeWidth='3'/>{[-48,-20,8,36,64].map((y,i)=><path key={y} d={'M14 '+y+' H'+(73-page*5-i*3)} stroke={i===page?'#3B8863':'#A49971'} strokeWidth='6'/>)}</g><path d='M0-73 V91' stroke='#455B44' strokeWidth='4'/></g><ContactMarks f={f} at={page*17+9} x={498} y={584}/>
 </Svg><Sprite f={f} x={293} y={750} size={319} i={3} rot={effort(f,1,12)*9+effort(f,18,12)*8+effort(f,35,12)*10} stern={.7} gaze={1}/></>;
 }
 if(cut===1){const place=travel(f,-2,10);return <><Svg z={15}><Desk x={508} y={687} w={827}/><Statement x={mix(1118,604,place)-travel(f,54,65)*120} y={413-travel(f,54,65)*48} s={1.43} reveal={travel(f,9,59)}/>
  <g transform={tr(230,401,1)}><path d='M-84-170 H84 V170 H-84Z' fill='#36564B' stroke='#CCA666' strokeWidth='8'/><path d='M-72-157 H72 M-72 158 H72' stroke='#E2BE80' strokeWidth='4'/>{Array.from({length:8},(_,i)=>{const q=travel(f,i*6+7,i*6+13);return <g key={i}><path d={'M-63 '+(-130+i*36)+' H62'} stroke='#BDAC77' strokeWidth='6'/><rect x={mix(-57,12,q)} y={-143+i*36} width='36' height='25' rx='7' fill={i%2?'#DAA65D':'#81AC8A'}/><path d={'M'+mix(-48,21,q)+' '+(-138+i*36)+' v14'} stroke='#E9D3A0' strokeWidth='3'/></g>;})}</g>
 </Svg><Sprite f={f} x={pose(f,[[0,352],[12,352],[23,424],[31,424],[43,349],[50,349],[62,534]])} walk={moving(f,[[0,352],[12,352],[23,424],[31,424],[43,349],[50,349],[62,534]])} y={750} size={319} i={3} rot={effort(f,19,11)*8+effort(f,43,12)*8} stern={f<53?.8:0} cheer={f>=55?.8:0} gaze={1}/></>;
 }
 const lx=pose(f,[[0,276],[9,484],[20,484],[28,647],[39,647],[47,585],[59,585],[68,719]]),ly=pose(f,[[0,297],[9,287],[20,287],[28,336],[39,336],[47,403],[59,403],[68,393]]),mark=travel(f,48,55),call=travel(f,58,66);
 return <><Svg z={15}><Desk x={508} y={687} w={827}/><Statement x={527} y={395} s={1.34} variance={1}/><rect x='506' y='349' width={mix(0,170,mark)} height='39' rx='5' fill='none' stroke='#C7774D' strokeWidth='7'/><Prop kind='lens' x={lx} y={ly} s={1.78}/>
  <g transform={tr(mix(863,817,call),mix(419,534,call),1,kick(f,66,3))} opacity={call}><path d='M-86-46 H86 V46 H-86Z' fill='#DEC18C' stroke='#996144' strokeWidth='6'/><path d='M-54-17 H48 M-54 8 H22' stroke='#995238' strokeWidth='9'/><path d='M50 7 V27 M50 34 V37' stroke='#995238' strokeWidth='7'/></g>
 </Svg><Sprite f={f} x={pose(f,[[0,251],[10,371],[20,371],[29,530],[39,530],[48,420],[57,420],[68,610]])} walk={moving(f,[[0,251],[10,371],[20,371],[29,530],[39,530],[48,420],[57,420],[68,610]])} y={752} size={319} i={3} rot={effort(f,21,10)*8-effort(f,42,12)*9} stern={f<48?.8:0} shock={f>=48&&f<59?1:0} gaze={1}/></>;
};

const ContractSheet:React.FC<{f:number;x:number;y:number;s?:number;tabs?:boolean}>=({f,x,y,s=1,tabs=false})=><g transform={tr(x,y,s)}>
 <path d="M-198-182 H198 V183 H-198Z" fill="#E9D7AF" stroke="#744A3C" strokeWidth="8"/>
 <Label x={0} y={-131} t="CONTRACT" size={29}/>
 {Array.from({length:7},(_,i)=><path key={i} d={'M-164 '+(-86+i*32)+' H'+(i===6?45:157)} stroke={i===3?'#9D5F4C':'#A89E7D'} strokeWidth="9"/>)}
 {tabs&&Array.from({length:9},(_,i)=><g key={i} transform={'translate('+mix(-28,0,travel(f,i*4-3,i*4+3))+' 0)'}><path d={'M198 '+(-156+i*34)+' h32 v27 h-32'} fill={colors[i%5]}/></g>)}
 </g>;
const Legal:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===0){const unroll=travel(f,-1,11),lower=travel(f,15,24),line=travel(f,29,39);
 return <><Svg z={16}><Desk x={510} y={707} w={830} c='#B18E68'/><g transform={'translate(0 '+mix(-119,0,unroll)+')'}><ContractSheet f={f} x={501} y={413} s={1.15}/><path d='M254 197 H748' stroke='#AB774E' strokeWidth='23' strokeLinecap='round'/><path d={'M254 '+mix(437,630,lower)+' H748'} stroke='#AB774E' strokeWidth='23' strokeLinecap='round'/><path d='M268 190 H736' stroke='#D9AF73' strokeWidth='5'/><path d={'M313 541 H'+mix(315,596,line)} stroke='#AD6750' strokeWidth='7'/></g>
 </Svg><Sprite f={f} x={787} y={754} size={319} i={4} rot={-effort(f,3,13)*10+effort(f,29,12)*8} hit={Math.max(0,kick(f,11,.6))} stern={.8} gaze={-1}/></>;
 }
 if(cut===1){const lx=pose(f,[[0,735],[8,417],[18,417],[26,624],[36,624],[43,492],[54,492]]),ly=pose(f,[[0,221],[8,293],[18,293],[26,352],[36,352],[43,402],[54,402]]);
 return <><Svg z={16}><Desk x={510} y={707} w={830} c='#B18E68'/><ContractSheet f={f} x={467} y={394} s={1.18} tabs/><Prop kind='lens' x={lx} y={ly} s={1.70}/><path d={'M323 431 H'+mix(325,641,travel(f,45,53))} stroke='#B65640' strokeWidth='8'/><ContactMarks f={f} at={53} x={492} y={430}/></Svg><Sprite f={f} x={pose(f,[[0,821],[10,716],[18,716],[27,581],[36,581],[44,704],[54,621]])} walk={moving(f,[[0,821],[10,716],[18,716],[27,581],[36,581],[44,704],[54,621]])} y={755} size={319} i={4} rot={-effort(f,20,11)*7+effort(f,39,12)*8} stern={f<45?.9:0} cheer={f>=50?.6:0} gaze={-1}/></>;
 }
 const place=travel(f,-2,9),seal=travel(f,44,49);
 return <><Svg z={16}><Desk x={510} y={707} w={830} c='#B18E68'/><ContractSheet f={f} x={261} y={377} s={.83}/><Prop kind='brief' x={mix(983,711,place)} y={405} s={1.63}/>
  {[0,1,2].map(i=>{const t=travel(f,11+i*12,18+i*12);return <g key={i} transform={tr(mix(372,649,t),mix(335+i*28,396+i*36,t)+arc(t,32))}><path d='M-13-18 H129 V23 H-13Z' fill='#D8C298' stroke='#947F5F' strokeWidth='3'/><path d='M0-2 H105' stroke={i===1?'#B5654E':'#9D9068'} strokeWidth='11'/><path d='M0 14 H75' stroke='#AF986C' strokeWidth='5'/></g>;})}
  <g transform={tr(744,mix(270,548,seal),1,kick(f,49,5))}><path d='M-20-56 Q-33-96 0-103 Q33-96 20-56 L23-20 H-23Z' fill='#874D3C' stroke='#3C3630' strokeWidth='5'/><path d='M-38-20 H38 V0 H-38Z' fill='#D5B077' stroke='#6B4E3D' strokeWidth='5'/></g>
  <circle cx='744' cy='548' r='33' fill='#AA4F3D' opacity={f>=49?1:0}/><path d='M726 548 L739 560 L764 530' stroke='#EBC799' strokeWidth='7' fill='none' opacity={f>=49?1:0}/><ContactMarks f={f} at={49} x={744} y={533}/>
 </Svg><Sprite f={f} x={pose(f,[[0,487],[10,374],[20,374],[31,516],[39,516],[48,606],[54,581]])} walk={moving(f,[[0,487],[10,374],[20,374],[31,516],[39,516],[48,606],[54,581]])} y={753} size={319} i={4} rot={effort(f,12,10)*8-effort(f,25,10)*7+effort(f,42,11)*12} stern={f<47?.8:0} cheer={f>=49?.7:0} gaze={1}/></>;
};

const Suit:React.FC<{x:number;y:number;s?:number;fit?:number;f:number}>=({x,y,s=1,fit=0,f})=><g transform={tr(x,y,s)+' scale('+(1-fit*.26)+' 1)'}>
 <path d={'M-69-111 L-173-72 L'+mix(-259,-112,fit)+' 106 L-135 146 L-83 31 L-82 178 H83 V31 L135 146 L'+mix(259,112,fit)+' 106 L173-72 L69-111 L0-46Z'} fill="#4D5474" stroke="#C9B68F" strokeWidth="8"/>
 <path d="M-68-111 L-10-56 L-46 8 L-95-42Z M68-111 L10-56 L46 8 L95-42Z" fill="#2A354E"/>
 <path d="M0-44 V174" stroke="#AA987D" strokeWidth="6"/>
 {[0,1,2].map(i=><circle key={i} cx="17" cy={36+i*48} r="7" fill="#DDB064"/>)}
 {[[-116,-34],[-49,36],[62,84],[149,40]].map(([xx,yy],i)=><g key={i} transform={tr(xx,yy,1,kick(f,10+i*8,13))}><rect x="-24" y="-17" width="48" height="34" rx="3" fill={colors[i]}/><path d="M-13-4 H13 M-13 6 H7" stroke="#ECDDAD" strokeWidth="5"/></g>)}
 </g>;
const Turn:React.FC<{f:number}>=({f})=>{
 const stop=effort(f,-2,12),take=travel(f,14,25),check=travel(f,34,43);
 return <><Sprite f={f} x={514} y={761} size={369} plain rot={-stop*10+effort(f,31,13)*8} cheer={stop*.85} stern={1} gaze={f<17?0:-1}/><Svg z={25}><Prop kind='brief' x={mix(111,260,take)} y={mix(628,397,take)+arc(take,74)} s={1.1} r={mix(-24,-5,take)}/><path d={'M195 493 H'+mix(196,314,check)} stroke='#BF8351' strokeWidth='8'/><ContactMarks f={f} at={25} x={271} y={482}/></Svg></>;
};

const Tailor:React.FC<{f:number}>=({f})=>{
 const drop=travel(f,-1,10),spill=travel(f,15,26),collapse=travel(f,34,50),escape=travel(f,17,27),tag=travel(f,55,65),measure=travel(f,76,88);
 return <><Svg z={15}><path d='M205 183 H825 M267 181 V758 M765 181 V758' stroke='#BC9E71' strokeWidth='14'/><path d='M499 155 V207 L365 277 H637 L499 207' fill='none' stroke='#B99B69' strokeWidth='11'/>
  <g opacity={1-travel(f,46,52)} transform={'rotate('+mix(0,91,collapse)+' 498 692)'}><Suit f={f} x={mix(505,369,collapse)} y={mix(71,383,drop)+collapse*217} s={1.35+spill*.27} fit={0}/></g>
  <g opacity={travel(f,46,52)} transform={tr(mix(479,401,travel(f,77,90)),691-travel(f,77,90)*103,1)}><path d='M-203 11 Q-192-71-113-33 L-35-62 L42-13 L141-49 Q205-11 210 23 L63 53 L-72 39Z' fill='#4D5474' stroke='#C9B68F' strokeWidth='7'/><path d='M-174 12 L-81-16 L-32 25 L67 3 L141 20' stroke='#75809C' strokeWidth='5' fill='none'/><path d='M-65-42 L-20-5 L7-27' stroke='#26364D' strokeWidth='18' fill='none'/><circle cx='48' cy='21' r='6' fill='#DBB173'/></g><g transform={tr(688,mix(224,335,drop)+tag*344,1,kick(f,10,11)+tag*39)}><path d='M-39-28 H38 V35 H-39 L-50 1Z' fill='#E4BF7D' stroke='#67564B' strokeWidth='5'/><Label x={0} y={16} t='50' size={38}/></g>
  <path d={'M494 677 H'+mix(495,783,measure)} stroke='#E9BD67' strokeWidth='16'/>{[0,1,2,3,4,5].map(i=><path key={i} d={'M'+(510+i*43)+' 668 V681'} stroke='#6E5945' strokeWidth='3' opacity={measure>i/6?1:0}/>)}<ContactMarks f={f} at={10} x={503} y={556}/><ContactMarks f={f} at={50} x={469} y={711}/><ContactMarks f={f} at={65} x={688} y={689}/>
 </Svg><Sprite f={f} x={mix(526,802,escape)-travel(f,73,87)*260} y={751} size={319} i={0} walk={(f>17&&f<27)||(f>73&&f<87)?1:0} rot={escape*7-effort(f,77,15)*13} shock={f>=10&&f<68?1:0} stern={f>=68?.8:0} gaze={-1}/></>;
};

const Custom:React.FC<{f:number;cut:number}>=({f,cut})=>{
 if(cut===0){const brief=travel(f,-2,10),lines=['Audience','Brand voice','Workflow','Review rules'];
 return <><Svg z={15}><Desk x={505} y={704} w={883}/><g transform={'translate(0 582) scale(1 '+(.12+.88*travel(f,-1,11))+') translate(0 -582)'}><path d='M318 177 H900 V578 H318Z' fill='#112C37' stroke='#709E9D' strokeWidth='13'/><path d='M337 222 H879' stroke='#416B70' strokeWidth='3'/><circle cx='345' cy='199' r='5' fill='#D6A264'/><Label x={366} y={207} t='CLAUDE CODE' anchor='start' size={24} c='#D6CAAA'/><Label x={346} y={274} t='Rewrite for my business' anchor='start' size={24} c='#E5D3A6'/>
  {lines.map((t,i)=>{const q=travel(f,18+i*14,28+i*14);return <g key={t}><rect x='337' y={306+i*51} width='535' height='39' rx='3' fill={f>=18+i*14&&f<32+i*14?'#527A76':'#21454D'}/><Label x={346} y={332+i*51} t={t} anchor='start' size={22} c='#A1C8B7'/><Label x={566} y={332+i*51} t={['my customers','my brand tone','my process','my approval rules'][i].slice(0,Math.floor(q*[12,13,10,17][i]))} anchor='start' size={21} c='#E3C991'/><rect x={mix(566,855,q)} y={314+i*51} width='6' height='20' fill='#DFC47F' opacity={f>=18+i*14&&f<31+i*14?1:0}/></g>;})}
  </g><path d='M411 618 H851 L886 664 H375Z' fill='#304D54' stroke='#A6B2A0' strokeWidth='5'/>{Array.from({length:12},(_,i)=><g key={i}><rect x={418+i*33} y={629+(Math.floor(f/3)%12===i?4:0)} width='23' height='10' rx='2' fill='#8FA89C'/><rect x={410+i*34} y='647' width='24' height='9' rx='2' fill='#667F79'/></g>)}
  <g opacity={f>=71?1:0}><Prop kind='brief' x={mix(829,578,travel(f,71,82))} y={mix(277,442,travel(f,71,82))+arc(travel(f,71,82),45)} s={1.5} r={mix(19,-6,travel(f,71,82))}/></g><Prop kind='brief' x={mix(70,190,brief)} y={401} s={.92} r={-8+kick(f,10,3)}/><path d={'M180 526 H'+mix(181,266,travel(f,70,79))} stroke='#C9AA6E' strokeWidth='7'/>
 </Svg><Sprite f={f} x={307+effort(f,19,10)*13+effort(f,47,11)*14} y={753} size={319} plain rot={effort(f,19,10)*8+effort(f,33,10)*6+effort(f,47,11)*8+effort(f,62,11)*7} stern={f<72?.8:0} cheer={f>=74?.7:0} gaze={1}/></>;
 }
 const cut1=travel(f,17,27),cut2=travel(f,36,46),fit=travel(f,54,65),test=travel(f,72,79);
 return <><Svg z={16}><Desk x={512} y={696} w={866}/><g transform={tr(mix(295,512,fit),mix(362,588,fit),mix(1.26,.60,fit),mix(-7,0,fit))}><Suit f={f} x={0} y={0} fit={cut1*.45+cut2*.55}/></g>
  <g opacity={f>=27&&f<40?1:0} transform={tr(207-cut2*115,510+travel(f,27,39)*154,1,travel(f,27,39)*55)}><path d='M-63-42 H31 L64 61 L-41 74Z' fill='#4D5474' stroke='#C9B68F' strokeWidth='7'/></g>
  <Scissors x={pose(f,[[0,178],[11,252],[29,252],[35,472],[49,472],[58,249]])} y={pose(f,[[0,526],[11,391],[29,391],[35,451],[49,451],[58,623]])} f={f} at={f<32?17:36} s={.76} r={f<32?-58:52}/>
  <Prop kind='brief' x={mix(951,775,travel(f,3,14))} y={402} s={1.26} r={kick(f,14,3)}/><path d={'M710 563 L'+mix(711,738,test)+' '+mix(563,587,test)+' L'+mix(738,795,travel(f,78,82))+' '+mix(587,513,travel(f,78,82))} stroke='#70AE7F' strokeWidth='14' fill='none'/><ContactMarks f={f} at={65} x={512} y={689}/>
 </Svg><Sprite f={f} x={pose(f,[[0,714],[11,376],[29,376],[37,638],[49,638],[65,516],[73,516],[83,593]])} walk={moving(f,[[0,714],[11,376],[29,376],[37,638],[49,638],[65,516],[73,516],[83,593]])} y={752} size={319} plain rot={-effort(f,16,12)*10+effort(f,35,12)*8} cheer={f>=73?.9:0} stern={f<66?.8:0} gaze={f<55?-1:1}/></>;
};

const Team:React.FC<{f:number}>=({f})=>{
 const pos=[[172,447],[415,447],[770,446],[278,709],[745,709]],pack=travel(f,78,90),open=travel(f,95,105);
 return <><Svg z={10}><path d='M80 516 H929' stroke='#142E37' strokeWidth='17'/><path d='M478 138 V516' stroke='#537D82' strokeWidth='13'/><Desk x={506} y={689} w={413} c='#CEAA73'/>
  {pos.map(([x,y],i)=><g key={i}><path d={'M'+(x-99)+' '+(y-70)+' H'+(x+99)+' V'+(y-49)+' H'+(x-99)+'Z'} fill='#A89671'/><Prop kind={tasks[i]} x={x+73} y={i<3?y-9:y-96} s={.48} r={effort(f,i*15,12)*-17}/></g>)}</Svg>
 {pos.map(([x,y],i)=>{const give=effort(f,i*15,14);return <Sprite key={i} f={f+i*11} x={x+give*(i%2?22:-22)} y={y+(i<3?62:0)} size={i<3?194:212} i={i} rot={give*(i%2?9:-9)} stern={f<i*15+12?.6:0} cheer={f>=i*15+12?.55:0} gaze={i<2?1:-1}/>;})}
 <Svg z={47}>{pos.map(([x,y],i)=>{const q=travel(f,i*15-2,i*15+11);return <g key={i} transform={tr(mix(x,435+i*36,q),mix(y-39,550-i*5,q)+arc(q,88),mix(.78,.43,q),mix(i%2?-18:18,0,q))} opacity={f>=i*15-2?1:0}>{i===0?<Poster x={0} y={0}/>:i===1?<Prop kind='phone' x={0} y={0}/>:i===2?<Website x={0} y={0} s={.6} fresh={1}/>:i===3?<Statement x={0} y={0} s={.73}/>:<ContractSheet f={100} x={0} y={0} s={.73}/>}</g>;})}
  <g transform={tr(mix(924,535,pack),mix(207,430,pack)+arc(pack,67),1.45,kick(f,90,3))} opacity={f>=78?1:0}><Prop kind='brief' x={0} y={0}/><path d={'M-82 107 L'+mix(-82,-138,open)+' '+mix(107,68,open)+' V-106 L-82-106Z'} fill='#9F825D' stroke='#6C6253' strokeWidth='5'/></g><ContactMarks f={f} at={90} x={529} y={585}/>
 </Svg><Sprite f={f} x={514} y={786} size={224} plain rot={-effort(f,77,14)*9+effort(f,95,11)*7} cheer={f>90?.9:.35} gaze={f<78?0:1}/></>;
};

const Cta:React.FC<{f:number}>=({f})=>{
 const place=travel(f,-2,11),deliver=travel(f,26,38),open=travel(f,64,76),hand=travel(f,92,103);
 return <><Svg z={15}><Desk x={509} y={708} w={799}/><g transform={tr(383,444)} opacity={travel(f,45,56)}><path d='M-150-172 H147 V170 H-150Z' fill='#DED0A7' stroke='#456F64' strokeWidth='9'/>{[0,1,2,3,4].map(i=><g key={i}><rect x='-118' y={-132+i*58} width='44' height='37' rx='4' fill={colors[i]}/><path d={'M-54 '+(-117+i*58)+' H109 M-54 '+(-99+i*58)+' H73'} stroke='#77876A' strokeWidth='8'/></g>)}{f>=63&&<g transform={'scale('+Math.max(.025,Math.abs(1-2*travel(f,f<82?63:f<100?82:101,f<82?74:f<100?93:113)))+' 1)'}><path d='M-147-168 H146 V166 H-147Z' fill='#F0E3BC' stroke='#B4A684' strokeWidth='4'/>{[0,1,2,3].map(i=><path key={i} d={'M-117 '+(-111+i*69)+' H108 m-225 23 h170'} stroke={i%2?'#B89A62':'#728B72'} strokeWidth='10'/>)}</g>}</g><g transform={tr(mix(861,562,place)+travel(f,45,57)*114-hand*19,mix(305,444,place)-hand*24,1.10-travel(f,45,57)*.18+hand*.08,kick(f,11,2))}>
  {[0,1,2,3,4].map(i=>{const q=travel(f,17+i*8,24+i*8);return <path key={i} d={'M'+(194+i*5)+' '+(-118+i*48)+' h'+mix(0,48,q)+' v32 h-'+mix(0,48,q)+'Z'} fill={colors[i]}/>;})}
  <path d='M-231-152 H231 V152 H-231Z' fill='#EAD7A9' stroke='#456F64' strokeWidth='12'/><path d='M-217-137 H215 M-214 134 H215' stroke='#F7E7BF' strokeWidth='4'/>
  <path d={'M-231-152 L'+mix(-231,-276,open)+' '+mix(-152,-111,open)+' V'+mix(152,190,open)+' L-231 152Z'} fill='#9C8E61' stroke='#456F64' strokeWidth='7'/>
  <Label x={0} y={-67} t='YOUR AI TEAM' size={35}/><path d='M-173-36 H173' stroke='#AD9D78' strokeWidth='5'/><Label x={0} y={28} t='DEPARTMENT' size={51} c='#A75433'/><Label x={0} y={97} t='SETUP GUIDE' size={26}/></g>
  <Prop kind='brief' x={mix(256,491,deliver)} y={mix(525,638,deliver)+arc(deliver,81)} s={.44} r={mix(-17,0,deliver)+kick(f,38,5)}/><ContactMarks f={f} at={38} x={491} y={650}/>
 </Svg><Sprite f={f} x={mix(168,284,travel(f,-2,9))} y={754} size={294} plain rot={effort(f,27,12)*11-effort(f,68,12)*7+effort(f,106,10)*8} walk={f<9?1:0} cheer={f>39?.8:.3} gaze={1}/></>;
};

// These are designed source cards, not fabricated browser screenshots. Names and
// selected subfolders are verified against the linked repositories in the guide.
export const DEPT_REPO_CARDS=[
 {from:533,to:609,owner:'coreyhaines31',repo:'marketingskills',folder:'skills / SKILL.md',url:'https://github.com/coreyhaines31/marketingskills'},
 {from:695,to:774,owner:'charlie947',repo:'social-media-skills',folder:'17 social media skills',url:'https://github.com/charlie947/social-media-skills'},
 {from:987,to:1095,owner:'nextlevelbuilder',repo:'ui-ux-pro-max-skill',folder:'',url:'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',compact:true,y:132},
 {from:1023,to:1095,owner:'Leonxlnx',repo:'taste-skill',folder:'',url:'https://github.com/Leonxlnx/taste-skill',compact:true,y:316},
 {from:1290,to:1357,owner:'anthropics',repo:'knowledge-work-plugins',folder:'finance / skills',url:'https://github.com/anthropics/knowledge-work-plugins/tree/main/finance'},
 {from:1473,to:1540,owner:'anthropics',repo:'knowledge-work-plugins',folder:'legal / skills',url:'https://github.com/anthropics/knowledge-work-plugins/tree/main/legal'},
];
const RepoCards:React.FC<{root:number}>=({root})=><Svg z={55}>{DEPT_REPO_CARDS.filter(c=>root>=c.from&&root<c.to).map(c=>{
 const local=root-c.from,arrive=travel(local,0,9),leave=travel(root,c.to-8,c.to),h=c.compact?172:283;
 return <g key={c.url} transform={'translate(74 '+((c.y??145)+mix(-64,0,arrive)-64*leave)+')'} opacity={Math.min(arrive,1-leave)} style={{filter:'drop-shadow(0px 12px 7px rgba(10,19,22,.32))'}}>
  <rect width='864' height={h} rx='20' fill='#F7F3E9' stroke='#243B46' strokeWidth='5'/><path d='M22 77 H842' stroke='#D0D4C9' strokeWidth='3'/>
  <BrandMark kind='github' x={24} y={18} size={45}/><Label x={87} y={53} t='GitHub' size={34} anchor='start'/>
  <BrandMark kind='claude' x={636} y={22} size={37}/><Label x={687} y={50} t='Claude skills' size={26} anchor='start'/>
  <Label x={29} y={c.compact?109:122} t={c.owner+' /'} size={c.compact?29:35} c='#4B6269' anchor='start'/>
  <Label x={29} y={c.compact?151:184} t={c.repo} size={c.compact?41:c.repo.length>21?49:56} anchor='start'/>
  {!c.compact&&<><path d='M28 209 H836' stroke='#D0D4C9' strokeWidth='2'/><path d='M31 236 v23 h29 v-19 h-15 l-6-7 h-8Z' fill='#BD9A58'/><Label x={78} y={256} t={c.folder} size={33} c='#3A5960' anchor='start'/><path d='M789 235 l14 12 -14 12 M772 235 l-14 12 14 12' stroke='#357258' strokeWidth='5' fill='none'/></>}
 </g>;
})}</Svg>;

const typeSet:Record<string,SetKind>={hook:'studio',office:'office',skill:'workbench',marketing:'street',social:'shoot',gateway:'atelier',design:'design',finance:'finance',legal:'legal',turn:'workbench',tailor:'tailor',custom:'code',team:'office',cta:'studio'};
export const DeptRebuild:React.FC=()=>{
 const root=useCurrentFrame();let row:typeof REBUILD_SHOTS[number]=REBUILD_SHOTS[0];
 for(const candidate of REBUILD_SHOTS)if(root>=candidate[0])row=candidate;
 const [at,,kind,cut]=row,f=root-at;
 const set: SetKind=kind==='office'&&cut===1?'table':kind==='social'&&cut===1?'edit':typeSet[kind];
 const camera=kind==='hook'&&cut===0?1+.055*travel(f,-1,20):1;
 const props={f,cut};
 return <Panel><div style={{position:'absolute',inset:0,zIndex:1,transformOrigin:'50% 55%',transform:'scale('+camera+')'}}>
  <Set kind={set} f={f}/><SetDetails kind={set}/>
  {kind==='hook'?<Hook {...props}/>:kind==='office'?<Office {...props}/>:kind==='skill'?<Skill {...props}/>:kind==='marketing'?<Marketing {...props}/>:kind==='social'?<Social {...props}/>:kind==='gateway'?<Gateway {...props}/>:kind==='design'?<Design {...props}/>:kind==='finance'?<Finance {...props}/>:kind==='legal'?<Legal {...props}/>:kind==='turn'?<Turn f={f}/>:kind==='tailor'?<Tailor f={f}/>:kind==='custom'?<Custom {...props}/>:kind==='team'?<Team f={f}/>:<Cta f={f}/>}
  <Foreground kind={set}/><RepoCards root={root}/>
 </div></Panel>;
};
