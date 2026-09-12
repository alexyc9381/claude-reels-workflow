import React from 'react';
import {staticFile} from 'remotion';
import {Actor,Canvas,Txt,Coin,ClaudeLogo,MsMark,MD,Check,Burst,C,clamp,ease,smooth,lerp,recoil,arc} from './X144World';

type P={f:number,dur:number};
// Short anticipation, fast travel and a damped settle. Story holds are separate.
const hit=(f:number,a:number,b:number)=>ease(f,a,b)+recoil(f,b,.045);
const colors=['#E7B24C','#D97757','#72BFC6','#9A84CE','#79BC93'];
const Star:React.FC<{x:number,y:number,s?:number,rot?:number}>=({x,y,s=1,rot=0})=><g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><path d="M0-27L8-9L29-8L14 7L18 27L0 17L-18 27L-14 7L-29-8L-8-9Z" fill="#EFBE55" stroke="#FFF0B4" strokeWidth={3}/></g>;

// Distinct sets: reactor chamber, token vault, loom and optical bench.
const Set:React.FC<{f:number,mode:'reactor'|'vault'|'loom'|'lift'|'optics'|'repo'}>=({f,mode})=>{
 const p=({reactor:['#354F91','#192947','#0A152D'],vault:['#A16634','#64412C','#211B19'],loom:['#76549B','#3E315E','#181C36'],lift:['#39847A','#214C48','#0D242D'],optics:['#5279A4','#283D69','#121C37'],repo:['#48888E','#285764','#112E3A']} as const)[mode];
 return <Canvas z={1}><defs><linearGradient id={'set-'+mode} x2="0" y2="1"><stop stopColor={p[0]}/><stop offset="1" stopColor={p[2]}/></linearGradient></defs><rect width={1012} height={792} fill={`url(#set-${mode})`}/>
 <path d="M55 142H957V551H55Z" fill={p[1]} stroke={p[2]} strokeWidth={20}/>
 {mode==='reactor'?<g>{[305,250,190].map((r,i)=><g key={r} transform={`translate(554 389) rotate(${(i%2?-1:1)*f*(.14+i*.04)})`}><circle r={r} fill="none" stroke={i===0?'#7187B6':'#3E629D'} strokeWidth={i===0?13:3}/>{Array.from({length:16},(_,k)=><rect key={k} x={-6} y={-r-5} width={12} height={16} rx={2} fill="#8194AD" transform={`rotate(${k*22.5})`}/>)}</g>)}</g>:
 mode==='vault'?<g>{[90,245,400,555,710,865].map(x=><g key={x}><path d={`M${x} 158V547`} stroke="#B08650" strokeWidth={9}/>{[200,310,420].map(y=><rect key={y} x={x+16} y={y} width={106} height={75} rx={5} fill="#3A3025" stroke="#8C6E43" strokeWidth={4}/>)}</g>)}</g>:
 mode==='optics'?<g>{Array.from({length:12},(_,i)=><path key={i} d={`M${72+i*76} 157V538M70 ${166+i*32}H944`} stroke="#7493BA" strokeWidth={1.5} opacity={.27}/>)}</g>:
 <g>{[0,1,2,3,4].map(i=><g key={i}><rect x={95+i*184} y={167} width={127} height={283} rx={12} fill={p[2]}/><path d={`M${116+i*184} 197V409`} stroke={p[0]} strokeWidth={5}/>{[0,1,2].map(j=><circle key={j} cx={185+i*184} cy={230+j*67} r={9} fill={j===Math.floor(f/18)%3?'#D6BA72':p[1]}/>)}</g>)}</g>}
 <path d="M0 550H1012V792H0Z" fill={p[2]}/><path d="M0 550H1012" stroke={p[0]} strokeWidth={13}/>{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${350+i*52} 552L${-400+i*320} 792`} stroke={p[0]} strokeWidth={2} opacity={.6}/>)}{[598,671,755].map(y=><path key={y} d={`M0 ${y}H1012`} stroke={p[0]} strokeWidth={2} opacity={.5}/>)}
 <path d="M20 82V703M990 83V695" stroke="#06151D" strokeWidth={33}/><path d="M27 150V606M981 150V605" stroke={p[0]} strokeWidth={7}/>
 {[116,870].map(x=><g key={x}><path d={`M${x} 110V176`} stroke="#06151D" strokeWidth={8}/><path d={`M${x-39} 176L${x-21} 153H${x+21}L${x+39} 176Z`} fill="#081D28"/><path d={`M${x-28} 177H${x+28}`} stroke="#E7C985" strokeWidth={7}/></g>)}
 <path d="M-30 706H1040V792H-30Z" fill="#081821"/><path d="M-30 709H1040" stroke={p[0]} strokeWidth={6}/>{[0,1,2,3,4,5,6,7,8,9,10].map(i=><rect key={i} x={i*101+((f*1.5)%101)-99} y={731} width={47} height={8} rx={4} fill={p[1]}/>)}
 </Canvas>;
};

export const TokenTurbine:React.FC<P>=({f,dur})=>{
 const first=hit(f,40,51),second=hit(f,76,86),kick=recoil(f,86,1),rot=f<30?f*.22:7+(f-30)*(f<76?1.7:3.3);
 const chip=clamp((f-7)/16),shake=recoil(f,51,4)+recoil(f,86,8);
 return <><Set f={f} mode="reactor"/><Canvas>
 <path d="M185 438H309Q352 438 365 404" fill="none" stroke="#07182F" strokeWidth={37}/><path d="M185 430H309Q352 430 365 398" fill="none" stroke="#C7B383" strokeWidth={10}/>
 <g transform={`translate(${542+shake} 398) scale(${1+second*.035})`}>
 <circle r={203} fill="#09182E" stroke="#89A5C5" strokeWidth={12}/><circle r={164} fill="#233E66" stroke="#47679A" strokeWidth={9}/>
 <g transform={`rotate(${rot})`}>{Array.from({length:12},(_,i)=><path key={i} d="M-12-53L30-137L71-116L34-43Z" fill={f>39?'#D09A43':'#4B6A93'} stroke="#142945" strokeWidth={3} transform={`rotate(${i*30})`}/>)}</g>
 {Array.from({length:20},(_,i)=>{let q=hit(f,39+i*.65,47+i*.65);return <g key={i} transform={`rotate(${i*18+rot*.55}) translate(0 ${-170-15*(1-q)}) scale(${.45+.55*q})`}><rect x={-18} y={-24} width={36} height={49} rx={7} fill={f>39+i*.65?'#E8B549':'#345580'} stroke={f>39+i*.65?'#FFF0B0':'#6A83A4'} strokeWidth={3}/></g>})}
 {Array.from({length:20},(_,i)=>{let q=hit(f,76+i*.45,82+i*.45);return f<76+i*.45?null:<g key={i} transform={`rotate(${i*18+9-rot*.28}) translate(0 ${-235-90*(1-q)}) rotate(${(1-q)*65}) scale(${q})`}><rect x={-23} y={-28} width={46} height={57} rx={9} fill="#F2C764" stroke="#FFF1B6" strokeWidth={4}/><path d="M-9-13V13M2-13V13M13-13V13" stroke="#BA7C2D" strokeWidth={4}/></g>})}
 <circle r={91} fill="#FFF0CD" stroke="#101F35" strokeWidth={9}/><Txt x={0} y={f<76?14:-5} size={f<76?46:25} anchor="middle">{f<40?'1 PAGE':f<76?'1,500':'1,500'}</Txt>{f>=76&&<Txt x={0} y={37} size={38} anchor="middle" fill={C.red}>3,000</Txt>}
 </g>
 {Array.from({length:24},(_,i)=>{let at=20+i*2.95,t=clamp((f-at)/15);if(f<at||t>=1)return null;let a=-.6+t*3.4;let r=lerp(360,66,t);return <Coin key={i} x={542+Math.cos(a)*r} y={398+Math.sin(a)*r*.7} r={24+12*(1-t)} spin={Math.cos(t*9)}/>})}
 {f<26&&<g transform={`translate(${lerp(169,500,chip)} ${lerp(280,374,chip)+arc(f,7,23,98)}) rotate(${chip*60}) scale(${1-chip*.78})`}><rect x={-67} y={-47} width={134} height={94} rx={16} fill={C.paper} stroke={C.clay} strokeWidth={8}/><Txt x={0} y={-3} size={29} anchor="middle">ONE</Txt><Txt x={0} y={30} size={29} anchor="middle">PAGE</Txt></g>}
 <g transform={`translate(175 428) rotate(${-32+smooth(f,5,11)*54-recoil(f,11,6)})`}><path d="M0 75V-15" stroke="#B4C6CD" strokeWidth={13}/><circle cy={-15} r={23} fill={C.clay} stroke="#FAAD7D" strokeWidth={4}/></g><rect x={124} y={490} width={102} height={39} rx={9} fill="#12253D"/>
 <Burst f={f} at={23} x={477} y={395}/><Burst f={f} at={51} x={697} y={248}/><Burst f={f} at={86} x={769} y={478} c="#FFBF68"/>
 <Txt x={590} y={687} size={18} fill={C.paper} anchor="middle">TEXT TOKENS / PAGE · PLUS IMAGE TOKENS</Txt>
 </Canvas><Actor f={f} x={171+ease(f,0,9)*18-second*57-kick*8} y={682+arc(f,80,97,36)} s={277} pose="constr" look={16} tilt={f<24?12:first>0?-4-second*11:0} shock={f>76?.95:f>42?.45:0} sy={1-Math.max(0,recoil(f,86,.12))}/></>;
};

export const DominoOverload:React.FC<P>=({f,dur})=>{
 const door=hit(f,43,52),bill=hit(f,48,59),shock=recoil(f,51,10);
 return <><Set f={f} mode="vault"/><Canvas>
 <path d="M107 558L659 419L895 576L320 679Z" fill="#192829" stroke="#A3804C" strokeWidth={7}/><path d="M107 558V593L320 711V679M895 576V611L320 711" fill="#0E1E22" stroke="#4D645D" strokeWidth={4}/>
 <g transform={`translate(${shock} 0)`}><rect x={702} y={239} width={224} height={331} rx={24} fill="#0A1A21" stroke="#AF8D4D" strokeWidth={16}/><rect x={721} y={261} width={185} height={282} rx={8} fill="#3B3023"/>{Array.from({length:21},(_,i)=><Coin key={i} x={742+(i%4)*46} y={311+Math.floor(i/4)*38} r={26}/>)}
 <g transform={`translate(711 250) skewY(${-door*13}) scale(${1-door*.88} 1)`}><rect width={199} height={307} rx={17} fill="#677E72" stroke="#BDCAAD" strokeWidth={7}/><circle cx={103} cy={153} r={63} fill="#263F42" stroke="#B7B38C" strokeWidth={9}/><g transform={`translate(103 153) rotate(${smooth(f,33,44)*91})`}><circle r={15} fill="#D4BF86"/>{[0,1,2,3,4].map(i=><path key={i} d="M0 0V-48" stroke="#D4BF86" strokeWidth={10} transform={`rotate(${i*72})`}/>)}</g></g></g>
 {Array.from({length:20},(_,i)=>{let x=190+i*26.8,y=555-i*1.5,t=hit(f,3+i*1.8,10+i*1.8);return <g key={i} transform={`translate(${x} ${y}) rotate(${t*72})`}><path d="M-19 0V-169L-5-180L34-172V-4L18 6Z" fill="#93612E"/><rect x={-19} y={-172} width={38} height={172} rx={6} fill={i%3===0?'#F5D184':'#E1AC4C'} stroke="#FFE6A7" strokeWidth={3}/><path d="M-9-134H9M-9-103H9M-9-72H9" stroke="#99602B" strokeWidth={5}/><circle cx={0} cy={-26} r={10} fill="#9F6C35"/></g>})}
 {Array.from({length:22},(_,i)=>{const at=44+i*1.75,t=clamp((f-at)/25);if(f<at||t>=1)return null;return <Coin key={i} x={lerp(813,245+(i*107)%687,t)} y={lerp(416,718,t)-Math.sin(t*Math.PI)*(105+i%4*23)} r={lerp(22,40,t)} spin={Math.cos(t*9+i)}/>})}
 <g transform={`translate(${lerp(190,451,bill)} ${lerp(-85,184,bill)}) rotate(${(1-bill)*-18})`} opacity={f<48?0:1}><rect x={8} y={12} width={467} height={169} rx={20} fill="#101D25"/><rect width={467} height={169} rx={20} fill="#F5C572" stroke="#FFF0BC" strokeWidth={5}/><Txt x={233} y={70} size={67} anchor="middle">70,000</Txt><Txt x={233} y={111} size={26} anchor="middle">TOKENS. ONE SHOT.</Txt><Txt x={233} y={146} size={16} anchor="middle">ILLUSTRATIVE · TEXT + VISION</Txt></g>
 <g transform={`translate(${145+recoil(f,11,5)} 214)`}><rect width={253} height={67} rx={13} fill={C.paper}/><Txt x={126} y={46} anchor="middle" size={34}>20 PAGES</Txt></g><Burst f={f} at={44} x={718} y={461}/><Burst f={f} at={59} x={837} y={285} c={C.red}/><Txt x={650} y={688} size={18} fill={C.paper} anchor="middle">THE LOAD ADDS UP BEFORE THE QUESTION.</Txt>
 </Canvas><Actor f={f} x={149-door*37-recoil(f,51,15)} y={701+arc(f,44,61,42)} s={272} pose="suit" look={15} tilt={-7-door*10} shock={f>35?1:.25} sy={1-Math.max(0,recoil(f,52,.09))}/></>;
};

export const StarMagnet:React.FC<P>=({f,dur})=>{
 const land=hit(f,0,12),free=hit(f,28,36),stars=hit(f,62,75),dock=hit(f,99,108);return <><Set f={f} mode="repo"/><Canvas>
 <path d="M151 634H917L859 677H112Z" fill="#0C2933" stroke="#719C94" strokeWidth={6}/><path d="M398 479V631H660V479" fill="#153B46" stroke="#709B99" strokeWidth={8}/>
 <g transform={`translate(0 ${lerp(-340,0,land)}) rotate(${Math.sin(clamp((f-42)/35)*Math.PI)*8} 568 345)`}><rect x={227} y={222} width={681} height={246} rx={25} fill={C.paper} stroke="#CEB789" strokeWidth={5}/><MsMark x={257} y={253} s={67}/><Txt x={349} y={281} size={30}>microsoft /</Txt><Txt x={348} y={332} size={49}>markitdown</Txt><path d="M256 355H877" stroke="#D5C8AC" strokeWidth={3}/><image href={staticFile('logos/github.svg')} x={260} y={382} width={43} height={43}/><Txt x={323} y={412} size={24}>Files → structured Markdown</Txt></g>
 <g transform={`translate(817 208) rotate(${8+(1-free)*55}) scale(${free})`}><rect x={-88} y={-39} width={176} height={78} rx={15} fill="#80BE8B" stroke="#D9EFC2" strokeWidth={5}/><Txt x={0} y={12} anchor="middle" size={36}>FREE</Txt></g>
 {Array.from({length:21},(_,i)=>{const at=55+i*2.1,t=clamp((f-at)/18);if(f<at||t>=1)return null;return <Star key={i} x={lerp(86+(i%3)*120,700,t)} y={lerp(610+(i%3)*25,552+dock*48,t)+arc(f,at,at+18,30)} s={.55+.25*Math.sin(t*Math.PI)} rot={t*180+i*28}/>})}
 <g transform={`translate(${lerp(487,715,stars)} ${lerp(470,545,stars)+dock*48}) scale(${stars})`}><rect x={-172} y={-57} width={344} height={120} rx={22} fill="#F4CA76" stroke="#FDE7A8" strokeWidth={5}/><Star x={-124} y={-2} s={1.15}/><Txt x={26} y={-5} anchor="middle" size={44}>110k+</Txt><Txt x={26} y={33} anchor="middle" size={21}>GitHub stars</Txt></g>
 <g transform={`translate(271 524) rotate(${lerp(-24,28,smooth(f,10,16))})`}><path d="M0 70V-14" stroke="#C2CEC3" strokeWidth={15}/><circle cy={-14} r={21} fill={C.clay}/></g><Burst f={f} at={12} x={547} y={467}/><Burst f={f} at={75} x={847} y={545}/><Burst f={f} at={108} x={847} y={641}/><Txt x={700} y={684} size={19} fill={C.paper} anchor="middle">OPEN SOURCE · MIT LICENSE</Txt>
 </Canvas><Actor f={f} x={215+ease(f,0,10)*49-ease(f,36,44)*34} y={712+arc(f,72,89,27)} s={283} pose="constr" look={f<53?13:18} tilt={f<20?12:f<62?-5:7} walk={f<11} cheer={f>74?.8:0}/></>;
};

export const MarkdownLoom:React.FC<P>=({f,dur})=>{
 const comb=ease(f,4,27),seat=hit(f,29,37);return <><Set f={f} mode="loom"/><Canvas>
 <defs><clipPath id="loom-before"><rect x={80} y={190} width={Math.max(0,820*(1-comb))} height={420}/></clipPath><clipPath id="loom-after"><rect x={80+820*(1-comb)} y={190} width={820*comb} height={420}/></clipPath></defs>
 <rect x={105} y={254} width={801} height={318} rx={30} fill="#191C36" stroke="#7D77AF" strokeWidth={8}/>
 <g clipPath="url(#loom-before)">{Array.from({length:9},(_,i)=>{let y=299+i*25;return <path key={i} d={`M121 ${y}C${340+Math.sin(f*.11+i)*22} ${110+i*44},${140+i*36} ${662-i*25},${452} ${y}S${650+i*17} ${191+i*49},882 ${y}`} fill="none" stroke={colors[i%5]} strokeWidth={12} strokeLinecap="round"/>})}</g>
 <g clipPath="url(#loom-after)"><Txt x={163} y={332} size={31} fill="#F6CD7D" mono># HEADINGS</Txt><path d="M170 362H811" stroke="#D4BD86" strokeWidth={4}/>{[0,1,2].map(i=><g key={i}><rect x={171+i*213} y={387} width={191} height={46} rx={6} fill={i===0?'#73A9A0':'#365475'}/><path d={`M${184+i*213} 408H${313+i*213}`} stroke="#BBD7C8" strokeWidth={6}/></g>)}{[0,1].map(i=><g key={i}><circle cx={180} cy={466+i*39} r={8} fill="#E7B24C"/><path d={`M207 ${466+i*39}H${710-i*160}`} stroke="#99C7B7" strokeWidth={10} strokeLinecap="round"/></g>)}</g>
 <g transform={`translate(${900-comb*805} ${-recoil(f,27,8)})`}><rect x={-21} y={226} width={43} height={372} rx={14} fill="#F1D396" stroke="#9F7447" strokeWidth={5}/>{[0,1,2,3,4,5,6,7,8].map(i=><path key={i} d={`M-23 ${274+i*31}H-52`} stroke="#E9DCA9" strokeWidth={12}/>)}</g>
 <g transform={`translate(793 213) scale(${seat})`}><rect x={-80} y={-47} width={160} height={94} rx={16} fill={C.paper}/><MD x={-56} y={-32} s={1.1}/></g><Burst f={f} at={27} x={140} y={379}/><Burst f={f} at={37} x={793} y={263}/>
 <Txt x={632} y={651} size={24} fill={C.paper} anchor="middle">SAME INFORMATION. CLEAN STRUCTURE.</Txt>
 </Canvas><Actor f={f} x={192+comb*85} y={717} s={235} pose="wizard" look={15} tilt={f<27?12:-7} cheer={f>32?.9:0} sy={1-Math.max(0,recoil(f,27,.1))}/></>;
};

export const BallastRelease:React.FC<P>=({f,dur})=>{
 const release=ease(f,47,59),lift=ease(f,55,69),anticip=smooth(f,39,47);return <><Set f={f} mode="lift"/><Canvas>
 <path d="M426 157V583M785 157V583" stroke="#0C2431" strokeWidth={29}/><path d="M426 157V583M785 157V583" stroke="#6CA198" strokeWidth={7}/><path d="M426 168H785" stroke="#BDCEA8" strokeWidth={15}/>
 <g transform={`translate(0 ${-lift*164+anticip*14-150*(1-ease(f,0,12))+recoil(f,12,19)+recoil(f,68,6)})`}><path d="M398 416H815L854 451H368Z" fill="#E0C38A" stroke="#9B7948" strokeWidth={6}/><rect x={368} y={451} width={486} height={31} rx={8} fill="#1B3E43"/>
 <rect x={484} y={269} width={242} height={147} rx={20} fill="#EAF1D6" stroke="#8BC3AA" strokeWidth={5}/><MD x={555} y={294} s={1}/><Txt x={606} y={389} size={23} anchor="middle">CLEAN INPUT</Txt>
 {Array.from({length:10},(_,i)=>{const free=i>=3,fall=free?clamp((f-(47+(i-3)*.8))/17):0,x=400+i*44;return <g key={i} transform={`translate(${x+(free?(i-5)*fall*18:0)} ${478+fall*332}) rotate(${free?(i-5)*fall*15+Math.sin(f*.23+i)*4*(1-release):Math.sin(f*.2+i)*2})`} opacity={fall>.97?0:1}><path d="M0 0V31" stroke={free?'#D6AF6B':'#8BD3B4'} strokeWidth={5}/><rect x={-18} y={29} width={36} height={94} rx={12} fill={free?'#E0A446':'#60B88B'} stroke={free?'#F7CF82':'#C2E9B5'} strokeWidth={3}/><path d="M-8 47H8M-8 68H8M-8 89H8" stroke={free?'#95602E':'#2E755F'} strokeWidth={4}/></g>})}</g>
 <g transform={`translate(176 366) rotate(${-22+release*70})`}><path d="M0 122V-15" stroke="#BCBDA0" strokeWidth={16}/><circle cy={-15} r={31} fill={C.clay} stroke="#F2AE81" strokeWidth={5}/></g>
 <g transform={`translate(${lerp(685,797,release)} ${lerp(548,576,release)}) scale(${hit(f,49,58)})`}><rect x={-132} y={-58} width={264} height={116} rx={19} fill="#E4F0CB"/><Txt x={0} y={-5} size={50} anchor="middle">−70%</Txt><Txt x={0} y={33} size={20} anchor="middle">TOKEN USE</Txt></g>
 <Burst f={f} at={49} x={683} y={533}/><Burst f={f} at={68} x={674} y={301} c="#B4E5B8"/>
 <rect x={351} y={660} width={572} height={41} rx={9} fill="#112D35"/><Txt x={637} y={688} size={18} fill={C.paper} anchor="middle">ILLUSTRATIVE · RESULTS VARY BY FILE</Txt>
 </Canvas><Actor f={f} x={168+anticip*22-release*34} y={697+arc(f,57,72,33)} s={275} pose="suit" look={16} tilt={f<48?anticip*13:-release*9} cheer={lift} shock={f>45&&f<55?.45:0} sy={1-Math.max(0,recoil(f,49,.1))}/></>;
};

export const FocusStructure:React.FC<P>=({f,dur})=>{
 const lens=hit(f,0,15),focus=ease(f,40,57),answer=hit(f,72,84);const cx=385+focus*77;
 return <><Set f={f} mode="optics"/><Canvas>
 <path d="M105 608H912" stroke="#0B1D35" strokeWidth={29}/><path d="M105 599H912" stroke="#83A8B9" strokeWidth={8}/>
 {Array.from({length:24},(_,i)=>{const a=i*2.399+f*.035,r=70+(i%5)*21;let x=214+Math.cos(a)*r,y=373+Math.sin(a)*r;const q=ease(f,39+i*.63,53+i*.63);x=lerp(x,676+(i%4)*55,q);y=lerp(y,321+Math.floor(i/4)*31,q);return <g key={i} transform={`translate(${x} ${y}) rotate(${lerp(i*29+f*.8,0,q)})`} opacity={1-answer}><rect x={-16} y={-10} width={32+(i%3)*14} height={20} rx={5} fill={colors[i%5]}/><path d="M-9-2H9" stroke="#E9EAD0" strokeWidth={3}/></g>})}
 <g transform={`translate(${cx} ${lerp(-130,391,lens)}) rotate(${lerp(-37,-11,lens)+recoil(f,57,3)})`}><path d="M0 135V223" stroke="#DBC189" strokeWidth={37}/><path d="M-8 151V214" stroke="#FBE0A3" strokeWidth={8}/><circle r={150} fill="#7AB5C0" fillOpacity={.18} stroke="#081C34" strokeWidth={28}/><circle r={150} fill="none" stroke="#C6BD8E" strokeWidth={13}/><path d="M-110-62A127 127 0 0 1 28-120" fill="none" stroke="#E7EDD0" strokeWidth={9} strokeLinecap="round"/>
 {[0,1,2].map(i=><path key={i} d={`M-62 ${-46+i*46}H${-62+124*focus}`} stroke={colors[i+2]} strokeWidth={15} strokeLinecap="round"/>)}
 </g>
 <path d={`M${cx+150} 304L919 256V552L${cx+150} 467Z`} fill="#C7E1BB" opacity={focus*.16}/>
 <g transform={`translate(${lerp(985,655,answer)} 259)`}><rect x={8} y={12} width={273} height={310} rx={20} fill="#0A1B2E"/><rect width={273} height={310} rx={20} fill={C.paper} stroke="#B9C6AC" strokeWidth={4}/><ClaudeLogo x={102} y={24} s={70}/><Txt x={138} y={132} size={22} anchor="middle">CLEARER CONTEXT</Txt>{['Headings','Tables','Lists'].map((s,i)=><g key={s} transform={`translate(${recoil(f,84+i*9,7)} 0)`}><Check x={37} y={178+i*45} s={f>=83+i*9?.4:0}/><Txt x={60} y={185+i*45} size={24} fill="#315C59">{s}</Txt></g>)}</g>
 <Burst f={f} at={15} x={360} y={539}/><Burst f={f} at={57} x={567} y={339}/><Burst f={f} at={102} x={872} y={532}/><Txt x={627} y={682} size={21} fill={C.paper} anchor="middle">STRUCTURE THE MODEL CAN FOLLOW.</Txt>
 </Canvas><Actor f={f} x={165+ease(f,7,21)*59+ease(f,80,95)*44} y={725+arc(f,96,115,24)} s={280} pose="prof" look={f<51?12:18} tilt={f<42?8:f<78?-5:7} cheer={f>101?.9:0} walk={f>7&&f<21}/></>;
};

export const HiddenLoad:React.FC<P>=({f,dur})=>{
 const arrive=ease(f,0,10),sag=12*ease(f,11,18)+20*ease(f,29,35)+26*ease(f,51,58)+23*ease(f,70,77),depart=ease(f,82,99);
 const baseX=lerp(-215,0,arrive)+depart*650,baseY=sag+recoil(f,29,9)+recoil(f,51,13);
 const card=(at:number,x:number,y:number,rot:number)=>{const q=hit(f,at,at+11);return `translate(${lerp(x,337+(at%3)*57,q)} ${lerp(y,318+(at%4)*26,q)}) rotate(${lerp(rot,at===0?-9:at===18?11:-4,q)})`;};
 return <><Set f={f} mode="loom"/><Canvas><path d="M109 665H971" stroke="#0A1D2D" strokeWidth={24}/><path d="M109 657H971" stroke="#9C7B8E" strokeWidth={6}/>
 <g transform={`translate(${baseX} ${baseY})`}>
 <path d="M219 416H865L814 532H254Z" fill="#283A53" stroke="#BFA887" strokeWidth={7}/><path d="M254 532V555H822" stroke="#B0BEA7" strokeWidth={15} fill="none"/>
 {[324,749].map(x=><g key={x} transform={`translate(${x} 558) rotate(${depart*250+f*1.6})`}><circle r={41} fill="#0C1E31" stroke="#719A9C" strokeWidth={9}/><path d="M0-26V26M-26 0H26" stroke="#D3BB84" strokeWidth={8}/></g>)}
 <g transform={card(0,132,183,-31)}><rect width={316} height={153} rx={14} fill="#F1CD8A" stroke="#FFE6B5" strokeWidth={5}/><Txt x={30} y={78} size={67}>Aa</Txt><path d="M144 36H282M144 64H250M29 112H286" stroke="#975F37" strokeWidth={11}/></g>
 {f>=18&&<g transform={card(18,955,179,41)}><rect width={317} height={177} rx={13} fill="#F5F0D9" stroke="#D7DFC5" strokeWidth={5}/>{Array.from({length:12},(_,i)=><rect key={i} x={18+(i%3)*96+(i===4?13:0)} y={18+Math.floor(i/3)*37} width={85} height={28} fill={i<3?'#4C9B80':'#B2CCAD'}/>)}<path d="M154 16L139 61L168 105L140 161" fill="none" stroke={C.red} strokeWidth={9}/></g>}
 {f>=40&&<g transform={card(40,482,122,-27)}><rect width={313} height={174} rx={13} fill="#9DC7D5" stroke="#FFF1D3" strokeWidth={10}/><circle cx={244} cy={45} r={27} fill="#F2C768"/><path d="M0 161L104 43L211 161L265 102L313 174H0Z" fill="#306F70"/></g>}
 {Array.from({length:10},(_,i)=>{const at=57+i*1.9,q=hit(f,at,at+9);return f<at?null:<g key={i} transform={`translate(${lerp(943+(i%2)*80,309+i*44,q)} ${lerp(215+(i%3)*45,372+(i%2)*41,q)+arc(f,at,at+9,44)}) rotate(${i*38+q*40})`}><rect x={-25} y={-18} width={51} height={36} rx={5} fill={colors[i%5]} stroke="#E9D6AE" strokeWidth={3}/><path d="M-13-6H12M-13 6H2" stroke="#354050" strokeWidth={5}/></g>})}
 <rect x={486} y={451} width={276} height={50} rx={10} fill="#C8AD80"/><Txt x={624} y={486} size={25} anchor="middle">ALL OF IT GOES IN.</Txt>
 </g><Burst f={f} at={29} x={621} y={417} c={C.red}/><Burst f={f} at={51} x={503} y={455}/><Burst f={f} at={76} x={786} y={575} c={C.red}/>
 </Canvas><Actor f={f} x={158+arrive*40+depart*500-recoil(f,76,11)} y={711+arc(f,72,86,28)} s={275} pose="constr" look={15} tilt={f<56?7:f<82?-12:14} shock={f>57&&f<86?.9:0} walk={f>82}/></>;
};
