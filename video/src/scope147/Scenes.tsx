import React from 'react';
import {Img,staticFile,interpolate,Easing} from 'remotion';
import {Mascot} from '../SlopKit';
import {Surface,Occluder,PALETTES} from '../WorldKit';
import {inter} from '../fonts';
export const C={ink:'#151e2d',cream:'#fff4db',gold:'#f3bf55',mint:'#91dcc4',clay:'#d77b5b',red:'#e87570'};
const a=(v:number)=>Math.max(0,Math.min(1,v));
export const e=(f:number,s:number,d:number,x=0,y=1)=>interpolate(f,[s,s+d],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
const pop=(f:number,s=0)=>interpolate(f,[s,s+5,s+10,s+16],[0.75,1.06,.98,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const px=(x:number,y:number):React.CSSProperties=>({position:'absolute',left:x,top:y});
const P:React.FC<{x?:number,y?:number,w?:number,h?:number,children?:React.ReactNode,style?:React.CSSProperties}>=({x=0,y=0,w,h,children,style})=><div style={{...px(x,y),width:w,height:h,...style}}>{children}</div>;
const Label:React.FC<{x:number,y:number,children:React.ReactNode,size?:number,color?:string,style?:React.CSSProperties}>=({x,y,children,size=28,color=C.cream,style})=><P x={x} y={y} style={{fontFamily:inter.fontFamily,fontWeight:800,fontSize:size,color,letterSpacing:-.7,lineHeight:1.12,...style}}>{children}</P>;
const Pic:React.FC<{file:string,x:number,y:number,w:number,h?:number,style?:React.CSSProperties}>=({file,x,y,w,h,style})=><Img src={staticFile('scope147/'+file)} style={{...px(x,y),width:w,height:h,objectFit:'contain',...style}}/>;
const Mark:React.FC<{file:string,x:number,y:number,size?:number}>=({file,x,y,size=62})=><P x={x} y={y} w={size} h={size} style={{background:'#fffaf0',borderRadius:16,padding:10,boxShadow:'0 8px 0 #0003'}}><Img src={staticFile('logos/'+file)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></P>;
const Hero:React.FC<{f:number,x:number,y:number,size?:number,turn?:number,tilt?:number,sy?:number,mood?:'shock'|'happy'|'stern'|'read',prof?:boolean}>=({f,x,y,size=245,turn=0,tilt=0,sy=1,mood,prof})=><>
<P x={x-size*.04} y={y+size*.84} w={size*1.08} h={size*.105} style={{background:'#07121988',borderRadius:'50%',filter:'blur(3px)'}}/>
<P x={x} y={y} w={size} h={size} style={{transform:`rotate(${tilt}deg) scaleY(${sy})`,transformOrigin:'50% 88%'}}><Mascot lf={f+8} size={size} nodAmp={0} gaze={turn*6} shock={mood==='shock'?1:0} cheer={mood==='happy'?1:0} stern={mood==='stern'?1:0} glasses={mood==='read'?1:0} prof={prof?1:0}/></P></>;
const Svg:React.FC<{children:React.ReactNode}>=({children})=><svg viewBox="0 0 1012 792" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>{children}</svg>;
const Architecture=({world}:{world:string})=>{
const warm=world==='backlot',purple=world==='row'||world==='corner',green=world==='plaza'||world==='kerbside';
const wall=warm?'#34221e':purple?'#291c31':green?'#0f363b':'#142441';
const edge=warm?'#735139':purple?'#664359':green?'#396c69':'#405674';
return <Svg><defs><linearGradient id="floor147" x2="0" y2="1"><stop stopColor={edge}/><stop offset="1" stopColor="#0b1623"/></linearGradient></defs>
<path d="M0 110H1012V627H0Z" fill={wall}/>
{world==='suburb'?<><path d="M135 617V312A370 330 0 0 1 740 310V617Z" fill="#121c36" stroke={edge} strokeWidth="16"/><path d="M435 140V606M160 366H720" stroke={edge} strokeWidth="9"/>{Array.from({length:23},(_,i)=><circle key={i} cx={175+(i*71)%521} cy={197+(i*53)%340} r={i%3===0?2.5:1.5} fill="#bbcbe3"/>)}</>:
<>{[74,726].map((x,i)=><g key={x}><path d={`M${x} 195h210v367H${x}Z`} fill="#0c192a" stroke={edge} strokeWidth="12"/><path d={`M${x+105} 195v367M${x} 342h210`} stroke={edge} strokeWidth="7"/>{Array.from({length:8},(_,j)=><path key={j} d={`M${x+14} ${218+j*39}h${warm||purple?52+j%3*12:170}`} stroke={warm||purple?['#996443','#c3985c','#54776f'][j%3]:'#47617b'} strokeWidth={warm||purple?22:2}/>)}</g>)}<path d="M327 170H684V570H327Z" fill={warm?'#594033':purple?'#463048':green?'#205256':'#263b58'} stroke={edge} strokeWidth="6"/></>}
<path d="M0 626H1012V792H0Z" fill="url(#floor147)"/><path d="M0 626H1012" stroke={edge} strokeWidth="12"/>{[0,1,2,3,4].map(i=><path key={i} d={`M506 626L${-800+i*650} 792`} stroke="#a3b5ab" strokeOpacity=".13" strokeWidth="3"/>)}<path d="M0 700H1012M0 747H1012" stroke="#a3b5ab" strokeOpacity=".1" strokeWidth="3"/>
{[146,867].map(x=><g key={x}><path d={`M${x} 112V184`} stroke="#111b26" strokeWidth="6"/><path d={`M${x-42} 207L${x-21} 177H${x+21}L${x+42} 207Z`} fill={edge}/><path d={`M${x-27} 208H${x+27}`} stroke={C.gold} strokeWidth="7"/><path d={`M${x-24} 214L${x-124} 607H${x+124}L${x+24} 214Z`} fill={C.gold} opacity=".035"/></g>)}
</Svg>;
};
export const Set:React.FC<{f:number,world?:string,children:React.ReactNode,bright?:boolean}>=({f,world='plaza',children,bright})=><>
<P w={1012} h={792} style={{zIndex:1}}><Surface w={PALETTES[world]} t={0} stars={false} overhead={false}/></P>
{bright&&<P w={1012} h={610} style={{zIndex:18,background:'linear-gradient(110deg,#daf3dd,#abd7c5)'}}><Svg><path d="M70 0V600M320 0V600M730 0V600M980 0V600M0 190H1012M0 450H1012" stroke="#609788" strokeWidth="14"/><path d="M0 45L640 0 910 610H250Z" fill="#f9f7cf" opacity=".35"/></Svg></P>}
<P w={1012} h={792} style={{zIndex:30}}>{!bright&&<Architecture world={world}/>}<P w={1012} h={792} style={{zIndex:2}}>{children}</P></P>
<Occluder c={bright?'#41675e':'#111b28'} side="l" w={43}/>
<Occluder c={bright?'#41675e':'#101827'} side="r" w={40}/>
<P x={0} y={754} w={1012} h={38} style={{background:bright?'#587f6c':'#101823',zIndex:93,borderTop:'7px solid '+(bright?'#93b09c':'#364355')}}/>
</>;
const Desk=({y=641,color='#866246'}:{y?:number,color?:string})=><Svg><path d={`M75 ${y}H958L1005 ${y+38}H20Z`} fill={color}/><path d={`M20 ${y+38}H1005V${y+65}H20Z`} fill="#292a35"/><path d={`M90 ${y+65}V800M920 ${y+65}V800`} stroke="#18222b" strokeWidth="28"/></Svg>;
const Paper=({x,y,w=135,f=0,rot=0}:{x:number,y:number,w?:number,f?:number,rot?:number})=><P x={x} y={y} w={w} h={w*1.28} style={{background:C.cream,borderRadius:8,boxShadow:'9px 11px 0 #10172560',transform:`rotate(${rot}deg)`}}><P x={w*.13} y={w*.14} w={w*.55} h={7} style={{background:C.clay}}/>{[0,1,2,3,4,5].map(i=><P key={i} x={w*.13} y={w*.34+i*w*.12} w={w*(i===5?.4:.73)} h={5} style={{background:'#83918d'}}/>)}</P>;
const Route=({f,clean=false,color=C.mint,y=0}:{f:number,clean?:boolean,color?:string,y?:number})=><Svg><g transform={`translate(0 ${y})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
<path d="M145 405H315L435 338 570 430 730 350H880" stroke="#263a47" strokeWidth="17"/>
<path d={clean?'M145 405H880':'M145 405H315L435 338 570 430 730 350H880'} stroke={color} strokeWidth="12" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(f,0,32)}/>
{!clean&&<><path d="M315 405V520H450M570 430V260H660M730 350V515L820 550" stroke={color} strokeWidth="9" strokeDasharray="13 12" opacity={e(f,15,25)}/><circle cx="450" cy="520" r="14" fill={C.gold}/><circle cx="660" cy="260" r="14" fill={C.gold}/></>}
{[145,315,570,880].map((x,i)=><circle key={x} cx={x} cy={clean?405:[405,405,430,350][i]} r={15} fill={color} stroke={C.ink} strokeWidth="6"/>)}
<circle cx={145+e(f,0,65)*735} cy={405} r="20" fill={C.cream} opacity={clean?1:0}/></g></Svg>;
export const Hook=({f}:{f:number})=>{
 const reveal=e(f,53,12),press=e(f,6,6)-e(f,16,8),tilt=press*9+(e(f,47,7)-e(f,61,11))*-12;
 return <Set f={f} bright world="dawnroof"><P w={1012} h={792} style={{transform:`scale(${e(f,0,30,1,1.045)})`,transformOrigin:'54% 46%'}}>
 <P x={94+e(f,67,40,0,-25)} y={175+e(f,67,40,0,-14)} w={824} h={369} style={{background:'#fff',border:'10px solid #365a56',borderRadius:15,boxShadow:'0 16px 0 #18342e50',overflow:'hidden',transform:`scale(${e(f,67,40,1,1.10)})`}}>
 <Pic file="figure-tight.png" x={8} y={38} w={788}/>
 <P x={0} y={0} w={374*(1-reveal)} h={350} style={{background:'#243f39',borderRight:'8px solid #769587',overflow:'hidden'}}><Svg><path d="M0 0L370 350M-100 0L270 350M100 0L470 350" stroke="#36564b" strokeWidth="45"/></Svg><Label x={60} y={132} size={42} color="#b9d1bc">HUMAN?</Label></P>
 <svg viewBox="0 0 804 349" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}><ellipse cx="578" cy="175" rx={130+(1-e(f,0,36))*32} ry={112+(1-e(f,0,36))*17} fill="none" stroke={C.clay} strokeWidth="5" pathLength={1} strokeDasharray=".88 .12" strokeDashoffset={-e(f,0,43)*.6}/><path d="M34 220L34 77H304" fill="none" stroke="#477456" strokeWidth="5" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(f,65,39)}/></svg>
 <Label x={440} y={3} size={30} color="#934426">AI WRITING</Label>
 <Label x={25} y={3} size={30} color="#355946" style={{opacity:reveal}}>HUMAN WRITING</Label>
 </P>
 <P x={704-e(f,0,37,0,128)-e(f,53,15,0,345)+e(f,73,32,0,22)} y={310-e(f,2,34,0,35)-e(f,73,32,0,13)} w={244} h={244} style={{transform:`scale(${e(f,34,36,1,1.23)})`,transformOrigin:'50% 50%',borderRadius:'50%',border:'10px solid #395e52',boxShadow:'0 11px 0 #102e2730',overflow:'hidden',opacity:e(f,0,7),backgroundImage:`url(${staticFile('scope147/figure-tight.png')})`,backgroundSize:'1520px auto',backgroundPosition:`${-913+e(f,53,15,0,502)+e(f,73,32,0,28)}px -103px`}}/>
 <Svg><path d={`M${912-e(f,0,37,0,128)-e(f,53,15,0,345)+e(f,73,32,0,22)} ${518-e(f,2,34,0,35)-e(f,73,32,0,13)}l58 58`} stroke="#395e52" strokeWidth="22" strokeLinecap="round"/></Svg>
 <P x={337+e(f,28,26,0,59)-e(f,53,20,0,59)} y={559} w={476} h={85} style={{background:'#294c46',borderRadius:15,borderBottom:'10px solid #1a3733'}}><Label x={f>=53?83:24} y={21} size={f>=53?21:23}>{f<53?'AI: ONE TIGHT CLUSTER':'HUMANS: A DIFFERENT REGION'}</Label></P>
 <P x={274} y={608+press*10} w={83} h={28} style={{background:C.gold,borderRadius:'50%',borderBottom:'9px solid #a76e32'}}/>
 <Hero f={f} x={-35+e(f,0,15,0,103)+e(f,40,30,0,125)+e(f,65,23,0,-60)} y={497-(e(f,53,7)-e(f,66,11))*24} size={248} tilt={tilt} sy={1-press*.08} turn={reveal>0.5?-1:1} mood={f>=53&&f<75?'shock':f>=75?'happy':undefined}/>
 <Label x={381} y={670} size={20} color="#e9eed7">StoryScope · original research figure</Label>
 </P></Set>;
};
export const Detector=({f}:{f:number})=>{
 // Feed → extract → score → confirm. Counter lands at global 7.267s, on “percent”.
 const finish=110, confirmed=f>=finish, count=interpolate(f,[68,82,94,103,109,110],[0,36,71,89,93.1,93.2],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const scoreIn=e(f,56,13), land=e(f,110,4)-e(f,116,10);
 const kick=[17,34,51].reduce((v,t)=>v+(e(f,t,3)-e(f,t+4,6)),0);
 const press=e(f,6,5)-e(f,14,8), cheer=e(f,111,5)-e(f,121,11);
 const rotation=Math.min(f,110)*7+e(f,110,25,0,35);
 return <Set f={f} world="depot">
 <Label x={114} y={149} size={26} color={C.mint}>NARRATIVE FEATURES ONLY</Label>
 <Svg><path d="M67 429H530V482H67Z" fill="#567982" stroke="#8aafb0" strokeWidth="5"/>
 {Array.from({length:8},(_,i)=><g key={i} transform={`translate(${86+i*57} 456) rotate(${rotation})`}><circle r="17" fill="#132e3a" stroke="#a0b6ad" strokeWidth="4"/><path d="M-11 0H11M0-11V11" stroke="#688e98" strokeWidth="4"/></g>)}
 <path d={`M${550-e(f,78,32,0,100)} 358H584V237H850V290`} fill="none" stroke="#365967" strokeWidth="14"/>
 <path d={`M${550-e(f,78,32,0,100)} 358H584V237H850V290`} fill="none" stroke={C.mint} strokeWidth="7" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(f,34,26)}/>
 </Svg>
 <P x={64} y={253} w={270} h={177} style={{overflow:'hidden'}}>
 {[0,1,2].map(i=><Paper key={i} x={-170+e(f,i*17-9,38,0,415)} y={24+i*6} w={116} rot={e(f,i*17,23,-13+i*4,0)}/>)}
 </P>
 <P x={268+kick*5-e(f,78,32,0,100)} y={227+kick*5} w={280} h={301} style={{background:'#396174',border:'9px solid #7aa6aa',borderRadius:25,boxShadow:'12px 18px 0 #0e1e2c',transform:`rotate(${kick*.65}deg)`,transformOrigin:'50% 100%'}}>
 <Label x={36} y={20} size={30}>StoryScope</Label>
 <P x={17} y={73} w={228} h={167} style={{background:'#101f2d',overflow:'hidden',border:'3px solid #183d4a',borderRadius:10}}>
 <svg viewBox="0 0 228 167" style={{width:'100%',height:'100%'}}>
 {[0,1,2].map((i)=>{const q=f-5-i*17;return <g key={i} opacity={.23+.77*e(q,0,10)}><path d={['M16 36H56L81 15 111 48 146 27H210','M16 82L42 73 66 85 90 63 116 94 146 73 173 83H210','M17 128H66V109H120V144H174V125H210'][i]} fill="none" stroke={[C.gold,C.mint,'#e7a080'][i]} strokeWidth="5" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(q,0,20)}/><circle cx={16+e(q,0,20,0,194)} cy={[36,82,128][i]} r="6" fill={C.cream} opacity={1-e(q,21,6)}/></g>})}
 <rect x={-17+249*a((f-7)/57)} y="0" width="13" height="167" fill="#b8ebda" opacity=".36"/>
 </svg>
 </P>
 {[0,1,2].map(i=><P key={i} x={27+i*76} y={259} w={53} h={12} style={{borderRadius:4,background:f>25+i*17?C.mint:'#203c49',boxShadow:f>25+i*17?'0 0 12px #91dcc455':'none'}}/>)}
 </P>
 {/* Feature chips physically leave the scanner and travel into the score display. */}
 {['PLOT','VOICE','THEMES'].map((word,i)=>{const q=f-32-i*17;const exit=e(q,0,16),fly=e(q,18,27);return q>=0&&q<48?<P key={word} x={356+exit*207+fly*167} y={488-exit*93-fly*76} w={143} h={63} style={{background:[C.gold,C.mint,'#e7a080'][i],border:'4px solid #1b4c53',borderRadius:10,opacity:1-e(q,40,8),transform:`rotate(${e(q,0,16,-10,3)-fly*12}deg) scale(${1-fly*.5})`,boxShadow:'0 8px 0 #07182660'}}><Label x={15} y={17} size={24} color={C.ink}>{word}</Label></P>:null;})}
 <P x={580+e(f,56,13,120,0)-e(f,90,20,0,88)} y={290+e(f,56,13,45,0)-land*7} w={355+e(f,90,20,0,65)} h={248+e(f,90,20,0,36)} style={{opacity:scoreIn,background:confirmed?'#d4f4dc':C.cream,border:`7px solid ${confirmed?'#5fbe87':'#c8ad73'}`,borderRadius:25,transform:`scale(${1+land*.045})`,boxShadow:confirmed?'0 14px 0 #0b2e26,0 0 35px #72d4a133':'0 14px 0 #080f1d80'}}>
 <Label x={22} y={17} size={20} color={confirmed?'#246a47':'#7b6b48'}>{confirmed?'✓ RESULT CONFIRMED':'CALCULATING…'}</Label>
 <Label x={19} y={58-e(f,90,20,0,9)} size={94+e(f,90,20,0,16)} color={confirmed?'#197448':'#343d48'} style={{fontVariantNumeric:'tabular-nums',letterSpacing:-5,whiteSpace:'nowrap'}}>{confirmed?'93.2':Math.min(93.1,count).toFixed(1)}<span style={{fontSize:41,letterSpacing:-1}}>%</span></Label>
 <P x={22} y={171+e(f,90,20,0,12)} w={308+e(f,90,20,0,50)} h={8} style={{background:'#b5bea6',borderRadius:8,overflow:'hidden'}}><P w={(308+e(f,90,20,0,50))*count/100} h={8} style={{background:confirmed?'#28925c':'#b78736'}}/></P>
 <Label x={22} y={193+e(f,90,20,0,12)} size={23} color="#354f48">macro-F1</Label><Label x={22} y={224+e(f,90,20,0,12)} size={18+e(f,90,20,0,2)} color="#466357">Human vs AI fiction</Label>
 </P>
 <Svg>{Array.from({length:8},(_,i)=>{const angle=i*Math.PI/4,r=28+e(f,111,21,0,52);return <path key={i} d={`M${758+Math.cos(angle)*r} ${608+Math.sin(angle)*r*.55}l${Math.cos(angle)*12} ${Math.sin(angle)*9}`} stroke={C.mint} strokeWidth="5" opacity={e(f,110,3)*(1-e(f,120,15))}/>})}<circle cx="758" cy="608" r={24+e(f,111,24,0,26)} stroke={C.mint} strokeWidth="4" fill="none" opacity={e(f,110,3)*(1-e(f,121,14))}/><path d="M731 603L749 621 787 581" fill="none" stroke={C.mint} strokeWidth="10" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(f,113,20)}/></Svg>
 <P x={228} y={604+press*9} w={76} h={28} style={{background:C.gold,borderRadius:'50%',borderBottom:'8px solid #8d6036'}}/>
 <Hero f={f} x={66+e(f,0,16,0,75)+e(f,61,41,0,142)} y={481+press*14-cheer*48} size={255} turn={1} mood={confirmed?'happy':f>=68?'shock':'read'} tilt={press*11+(e(f,65,8)-e(f,81,15))*-12-cheer*9} sy={1-press*.08+cheer*.055}/>
 <Label x={493} y={665-e(f,121,14,0,17)} size={22} color={C.mint} style={{opacity:e(f,112,9)}}>STRUCTURE → SIGNAL</Label>
 </Set>;
};
export const Team=({f}:{f:number})=><Set f={f} world="marquee">
<P x={95} y={144} w={819} h={105} style={{background:'#f7f4e7',borderRadius:20}}><P x={8} y={8} w={350} h={88} style={{background:"#8c1f28",borderRadius:12}}><Pic file="umd.png" x={15} y={12} w={321} h={61}/></P><Label x={386} y={33} size={33} color="#6c746c">×</Label><Pic file="deepmind.svg" x={445} y={29} w={330} h={42} /></P>
{[['jenna.png','Jenna Russell'],['rishanth.png','Rishanth Rajendhran'],['mohit.jpeg','Mohit Iyyer']].map(([file,name],i)=><P key={file} x={92+i*280} y={286+e(f,i*5,23,145,0)} w={252} h={294} style={{opacity:e(f,i*8,10),transform:`rotate(${[-3,1,3][i]}deg)`,background:'#fff6df',padding:10,boxShadow:'0 18px 0 #080d1d80'}}><Pic file={file} x={10} y={10} w={232} h={220} style={{objectFit:'cover',objectPosition:'50% 28%'}}/><Label x={9} y={245} size={name.length>16?20:24} color={C.ink}>{name}</Label></P>)}
<Label x={151} y={641} size={25} color={C.gold}>UNIVERSITY OF MARYLAND × GOOGLE DEEPMIND</Label>
</Set>;
export const Corpus=({f}:{f:number})=><Set f={f} world="plaza">
<Label x={90} y={146} size={28} color={C.mint}>THE RESEARCH CORPUS</Label><Label x={430} y={190} size={100}>{Math.round(e(f,0,32,1000,61608)).toLocaleString()}</Label><Label x={605} y={301} size={32} color={C.gold}>STORIES</Label>
<Svg><path d="M65 552H945V630H65Z" fill="#526b71"/><path d="M65 565H945" stroke="#8da29c" strokeWidth="10"/>{Array.from({length:10},(_,i)=><circle key={i} cx={80+i*92} cy={597} r={22} fill="#142e3a" stroke="#9da49a" strokeWidth="4"/>)}</Svg>
{Array.from({length:7},(_,i)=><Paper key={i} x={90+((i*137+f*6.2)%825)} y={396-(i%2)*25} w={92} rot={-5+i%3*5}/>)}
<P x={730} y={359} w={146} h={191} style={{border:'14px solid #83cfbd',borderRadius:'35px 35px 0 0',background:'#173e48aa'}}><P x={6} y={e(f%22,0,22,25,136)} w={105} h={5} style={{background:C.gold}}/></P>
<Hero f={f} x={109} y={235} size={242} tilt={-8+e(f,20,20,0,12)} turn={1} mood={f<25?'shock':'stern'}/>
</Set>;
export const Tokens=({f}:{f:number})=>{
 const structural=e(f,94,24);return <Set f={f} world="backlot"><Desk/>
<P x={140+e(f,0,32,450,0)} y={197} w={735} h={351} style={{background:'#f3e6c8',borderRadius:15,boxShadow:'13px 17px 0 #100f1f70',transform:`translateY(${structural*15}px)`}}>
<Label x={35} y={25} size={25} color="#6e6b5e">{f>97?'THE REAL GIVEAWAY':'THE USUAL SUSPECTS'}</Label>
{[['—',80,59],['delve',369,85]].map(([s,x,at],i)=><P key={i} x={Number(x)} y={102} w={257} h={145} style={{background:'#e9cc93',border:'3px solid #ac9c79',borderRadius:15,opacity:1-e(f,Number(at),8),transform:`translateY(${e(f,Number(at),14,0,130)}px) rotate(${e(f,Number(at),14,0,i?-16:16)}deg)`}}><Label x={s==='—'?73:43} y={23} size={s==='—'?80:60} color={C.ink}>{s}</Label></P>)}
<P x={22} y={97} w={680} h={227} style={{opacity:structural,background:'#152b34',borderRadius:10}}><svg viewBox="0 0 680 227"><path d="M35 112H175L265 48 355 143 475 85H633M175 112V187H274M475 85V28H570" fill="none" stroke={C.mint} strokeWidth="9" pathLength={1} strokeDasharray="1" strokeDashoffset={1-e(f,105,35)}/>{[35,175,355,633].map((x,i)=><circle key={i} cx={x} cy={[112,112,143,85][i]} r="14" fill={C.gold}/>)}</svg></P>
</P>
{f<98&&<P x={146+e(f,39,25,0,232)+e(f,66,24,0,270)} y={348+e(f,91,10,0,220)} w={220} h={91} style={{background:'#c28368',border:'9px solid #e8b69a',borderRadius:11,transform:`rotate(${e(f,39,25,-12,8)}deg)`,boxShadow:'0 13px 0 #1e1d2440'}}><Label x={18} y={15} size={24}>DELETE</Label></P>}
<Hero f={f} x={63+e(f,20,45,0,245)-e(f,99,44,0,165)} y={478} size={260} tilt={(e(f,22,8)-e(f,35,8))*12+(e(f,60,8)-e(f,72,8))*8} mood={f>105?'shock':'stern'} turn={1}/>
<Label x={480} y={611} size={32} color={C.gold} style={{opacity:e(f,110,25)}}>STORY STRUCTURE</Label>
</Set>;
};
export const Clean=({f}:{f:number})=><Set f={f} world="row">
<Label x={94} y={160} size={34} color={C.gold}>EVERYTHING TIES UP.</Label>
<Route f={f} clean color={C.gold}/>
{[0,1,2].map(i=><P key={i} x={130+e(f,i*17,72,0,714)} y={367} w={128} h={100} style={{background:C.cream,borderRadius:5,border:'7px solid #c6934d',transform:`rotate(${(e(f,31+i*15,6)-e(f,39+i*15,10))*25}deg)`}}/>)}
{[0,1].map(i=><Paper key={'loose'+i} x={270+i*300+e(f,38+i*23,30,0,95)} y={430+e(f,38+i*23,30,0,202)} w={132} rot={e(f,38+i*23,30,-4,25+i*12)}/>)}
{['SETUP','CONFLICT','RESOLUTION'].map((v,i)=><Label key={v} x={[100,390,700][i]} y={305} size={27}>{v}</Label>)}
{[0,1].map(i=><React.Fragment key={i}><Svg><path d={`M${315+i*255} 405V${i?260:520}`} stroke="#896280" strokeWidth="8" strokeDasharray="10 9"/><rect x={276+i*255} y={(i?252:463)+e(f,30+i*25,8,-80,0)} width="79" height="30" rx="5" fill={C.red}/></Svg><Label x={i?606:325} y={i?244:514} size={22} color={C.red} style={{opacity:e(f,38+i*25,8)}}>{i?'NO LOOSE ENDS':'NO TANGENTS'}</Label></React.Fragment>)}
<Hero f={f} x={90+e(f,0,50,0,85)} y={493} size={238} turn={1} mood={f>38?'stern':undefined} tilt={e(f,22,9,0,10)-e(f,34,14,0,10)}/>
</Set>;
export const Explain=({f}:{f:number})=><Set f={f} world="backlot"><Desk/>
<Paper x={282+e(f,0,23,325,0)} y={185} w={363} rot={-5-e(f,70,18,0,5)}/>
<P x={237+e(f,10,17,470,0)} y={290} w={665} h={194} style={{background:C.gold,borderRadius:15,border:'7px solid #8c5935',transform:`rotate(${e(f,10,17,-12,2)}deg)`,boxShadow:'0 19px 0 #17131b77'}}><Label x={27} y={27} size={32} color={C.ink}>“AND THAT IS WHY…”</Label><Label x={27} y={82} size={40} color="#684421">THE MORAL OF THE STORY</Label><P x={27} y={147} w={e(f,35,35,70,510)} h={10} style={{background:'#a4703b'}}/></P>
<Hero f={f} x={80+e(f,20,14,0,-20)+e(f,47,20,0,40)} y={473+e(f,20,10,0,27)-e(f,40,20,0,27)} size={249} mood={f>18&&f<48?'shock':'stern'} tilt={e(f,20,10,0,-13)+e(f,47,20,0,20)} turn={1}/>
<P x={350+e(f,48,26,590,0)} y={498+e(f,48,26,-70,0)} w={507} h={92} style={{background:'#e6c47d',border:'5px solid #996e3c',borderRadius:12,transform:`rotate(${e(f,48,26,13,-3)}deg)`}}><Label x={25} y={21} size={31} color={C.ink}>“IN OTHER WORDS…”</Label></P><Label x={420} y={643} size={27} color={C.gold}>NO ROOM FOR SUBTEXT.</Label>
</Set>;
export const Themes=({f}:{f:number})=><Set f={f} world="marquee">
<Label x={154} y={155} size={28} color={C.gold}>EXPLICIT THEME COMMENTARY</Label>
{[['AI',77,C.clay],['HUMAN',52,C.mint]].map(([s,v,col],i)=><P key={i} x={108+e(f,5+i*25,32,-300,0)} y={250+i*139} w={800} h={113}><Label x={28} y={25} size={27}>{s}</Label><P x={140} y={14} w={e(f,22+i*26,30,0,Number(v)*5.1)} h={118} style={{background:String(col),borderRadius:'0 15px 15px 0',boxShadow:'0 9px 0 #080f2180'}}/><Label x={165+Number(v)*5.1} y={9+e(f,37+i*26,17,90,0)} size={75} color={String(col)} style={{opacity:e(f,37+i*26,15)}}>{Math.round(e(f,22+i*26,30,0,Number(v)))}%</Label></P>)}
<Hero f={f} x={64} y={508-(e(f,7,12)-e(f,24,15))*84} size={224} mood={f<90?'shock':'read'} turn={1} tilt={(e(f,30,10)-e(f,47,13))*-10}/>
<P x={320} y={560} w={523} h={67} style={{background:'#172840',border:'3px solid #647fa2',borderRadius:12,opacity:1-e(f,105,12),transform:`translateX(${e(f,86,22,590,0)}px)`}}><Label x={19} y={19} size={25} color={C.gold}>25 percentage points more often</Label></P>
<P x={335} y={587-e(f,105,42,0,30)} style={{opacity:e(f,105,10)}}>{['claude.svg','openai.png','googlegemini.svg'].map((file,i)=><P key={file} x={i*178+e(f,109,41,160-i*160,0)} y={0}><P w={150} h={139} style={{background:'#f6eedc',borderRadius:17,boxShadow:'0 11px 0 #111c3060'}}><Mark file={file} x={25} y={10} size={92}/><Label x={0} y={111} size={21} color={C.ink} style={{width:150,textAlign:'center'}}>{['Claude','GPT','Gemini'][i]}</Label></P></P>)}</P>
</Set>;
export const Tension=({f}:{f:number})=>{
 const clamp=e(f,42,20)+(f>62?Math.sin((f-62)*.53)*.15*Math.exp(-(f-62)/11):0);return <Set f={f} world="corner"><Mark file="claude.svg" x={90} y={150}/><Label x={177} y={163} size={33}>CLAUDE</Label>
<Svg>{[0,1,2].map(i=><g key={i} transform={`translate(${267+i*44} ${461-(1-clamp)*e(f,0,40,25,190)-i*9})`}><rect width="369" height={42+(1-clamp)*e(f,0,40,0,140)} rx="10" fill={['#b88d55','#e1b65c','#ffe4a6'][i]} stroke="#654633" strokeWidth="5"/><path d="M28 27H324M28 57H287M28 88H312" stroke="#795c39" strokeWidth="6" opacity={1-clamp}/></g>)}<path d={`M205 483L235 ${456-(1-clamp)*e(f,0,40,0,120)}L275 483L315 ${456-(1-clamp)*e(f,0,40,0,175)}L355 483L395 ${456-(1-clamp)*e(f,0,40,0,205)}L435 483L475 ${456-(1-clamp)*e(f,0,40,0,160)}L515 483`} fill="none" stroke="#9e7948" strokeWidth="18" strokeLinejoin="round" opacity=".65"/><path d="M153 499H892M153 499V262" stroke="#746887" strokeWidth="4"/><path d={`M164 483Q370 ${483-e(f,0,38,0,315)*(1-clamp)} 517 483Q700 483 885 483`} fill="none" stroke={C.gold} strokeWidth="14"/>
<rect x="262" y={230+clamp*175} width="552" height="50" rx="9" fill="#a896a5" stroke="#352a45" strokeWidth="8"/><path d={`M290 ${230+clamp*175}V140M785 ${230+clamp*175}V140`} stroke="#736375" strokeWidth="15"/></Svg>
<Label x={375} y={550} size={37} color={C.gold}>{f>51?'TENSION FLATTENS':'LET IT BUILD…'}</Label><Svg><path d="M880 456L915 483 880 510" stroke={C.gold} strokeWidth="9" fill="none" opacity={e(f,63,13)}/></Svg>
<Hero f={f} x={81+e(f,0,36,0,70)-e(f,43,19,0,35)} y={460-(e(f,25,15)-e(f,45,16))*34} size={277} turn={1} mood={f>42&&f<64?'shock':'stern'} tilt={(e(f,30,10)-e(f,52,15))*-13}/>
</Set>;
};
export const Gossip=({f}:{f:number})=><Set f={f} world="backlot"><Mark file="openai.png" x={90} y={150}/><Label x={179} y={164} size={33}>GPT</Label>
<Svg><path d="M60 567H965L991 613H30Z" fill="#9e7446"/><path d="M100 613V780M918 613V780" stroke="#33252a" strokeWidth="26"/></Svg>
{[0,1,2].map(i=><Hero key={i} f={f} x={80+i*280} y={400} size={258} turn={i===2?-1:1} mood={f>i*18+18&&f<i*18+39?'shock':undefined} tilt={(e(f,i*18,8)-e(f,i*18+13,12))*(i===2?-9:9)}/>)}
<P x={120+e(f,2,25,0,290)+e(f,36,24,0,250)} y={235-48*Math.sin(a(f/70)*Math.PI)} w={298} h={185} style={{background:C.cream,borderRadius:32,transform:`rotate(${Math.sin(f/13)*5}deg)`,boxShadow:'0 13px 0 #15122277'}}><Label x={24} y={32} size={42} color={C.ink}>{f>57?<>“REALLY?”</>:<>“DID<br/>YOU…?”</>}</Label><P x={57} y={138} w={30} h={32} style={{background:C.cream,transform:'skew(-25deg)'}}/></P>
<Label x={352} y={676} size={29} color={C.gold}>THE GOSSIP LOOP</Label>
</Set>;
export const Dark=({f}:{f:number})=><Set f={f} world="suburb"><Mark file="googlegemini.svg" x={90} y={150}/><Label x={180} y={164} size={33}>GEMINI</Label>
<Svg><circle cx="750" cy="349" r={105+e(f,15,47,0,42)} fill="#0c1424" stroke="#6583c6" strokeWidth="5"/><circle cx="750" cy="349" r="178" fill="none" stroke="#3c567e" strokeWidth="3" strokeDasharray="7 18"/><path d="M250 220L405 614H95Z" fill="#f4d493" opacity=".16"/><path d="M225 185V670" stroke="#141d31" strokeWidth="18"/><path d="M165 235L225 184 285 235Z" fill={C.gold}/></Svg>
{['FOG','RUINS','MIDNIGHT'].map((s,i)=><P key={s} x={310+e(f,i*7,65,0,355)} y={265+i*100+e(f,i*7,65,0,(1-i)*70)} w={225} h={90} style={{background:['#47687c','#364f70','#293c5c'][i],border:'2px solid #8da2b6',borderRadius:8,transform:`rotate(${e(f,i*7,65,0,(i-1)*22)}deg) scale(${e(f,i*7,65,1,.4)})`,opacity:1-e(f,65+i*5,10)}}><Label x={15} y={17} size={25}>{s}</Label></P>)}
<Hero f={f} x={100+e(f,-12,113,0,170)} y={477} size={252} tilt={e(f,10,35,0,-18)+e(f,75,15,0,8)} mood={f>55?'stern':'shock'} turn={1}/>
<Svg><path d={`M350 183H936V${183+e(f,55,40,0,285)}H350Z`} fill="#111a30" opacity={.85*e(f,55,35)}/><path d={`M350 ${183+e(f,55,40,0,285)}H936`} stroke="#526c95" strokeWidth="9" opacity={e(f,55,10)}/></Svg><Label x={520} y={594} size={39} color={C.gold}>DARK SETTINGS</Label><Label x={522} y={648} size={22}>Bleak / oppressive: 88% in the study</Label>
</Set>;
const UI=({children,title='StoryScope → Human Scope',f=100,enter=0}:{children:React.ReactNode,title?:string,f?:number,enter?:number})=><P x={86+e(f,0,27,enter,0)} y={147} w={838} h={510} style={{background:'#f8f5ed',borderRadius:20,border:'5px solid #b8b3a1',overflow:'hidden',boxShadow:'0 20px 0 #050c1870'}}><P w={838} h={57} style={{background:'#e8e5da',borderBottom:'2px solid #c8c7b8'}}><Mark file="claude.svg" x={18} y={8} size={35}/><Label x={73} y={16} size={24} color={C.ink}>{title}</Label><Label x={729} y={19} size={15} color="#65706d">Claude</Label></P>{children}</P>;
export const ResearchUI=({f}:{f:number})=>{
 // The attachment causes a visible edit, rather than opening a blank chat.
 const load=e(f,20,26), strike=e(f,55,18), write=e(f,76,28), pin=e(f,108,13);
 const press=e(f,39,6)-e(f,48,10), react=e(f,78,7)-e(f,90,12);
 return <Set f={f} world="kerbside"><Desk/>
 <P x={112} y={154} w={784} h={468} style={{background:'#183d40',border:'6px solid #658f83',borderRadius:22,boxShadow:'10px 18px 0 #081c28'}}>
 <Mark file="claude.svg" x={20} y={15} size={44}/><Label x={87} y={28} size={28}>RESEARCH → WRITING</Label>
 <P x={285} y={86} w={456} h={66} style={{background:'#e9d198',borderRadius:9,opacity:e(f,30,12)}}><Label x={18} y={18} size={27} color={C.ink}>TRUST THE READER</Label>
 <P x={12} y={54} w={e(f,47,23,0,427)} h={6} style={{background:'#b76942'}}/></P>
 <P x={284-e(f,74,29,0,20)} y={176-e(f,74,29,0,6)} w={457} h={243} style={{background:'#fff4db',borderRadius:13,overflow:'hidden',opacity:e(f,34,12),transform:`translateY(${e(f,34,15,120,0)}px) scale(${1+e(f,74,29,0,.07)})`,transformOrigin:'50% 50%'}}>
 <Label x={24} y={18} size={18} color="#687064">ILLUSTRATIVE REWRITE</Label>
 <P x={24} y={62-e(f,76,23,0,12)} w={409} h={53} style={{opacity:1-e(f,90,21,0,.65)}}><Label x={0} y={0} size={36} color="#aa4d40">She was afraid.</Label><P x={0} y={20} w={strike*285} h={5} style={{background:'#993d32',transform:'rotate(-3deg)'}}/></P>
 <P x={23} y={116} w={411} h={111} style={{clipPath:`inset(0 ${100-write*100}% 0 0)`}}><Label x={0} y={0} size={37} color="#215c49">The key shook<br/>in her hand.</Label></P>
 <P x={25+write*365} y={124+write*59} w={11} h={54} style={{background:'#9d6338',borderRadius:3,transform:'rotate(28deg)',opacity:f>=75&&f<109?1:0}}/>
 </P>
 </P>
 <P x={133-e(f,0,18,0,14)} y={244+load*14} w={285} h={365} style={{transform:`translateX(${load*-1}px) scale(${1-load*.36}) rotate(${e(f,0,18,-8,0)}deg)`,transformOrigin:'0 0',boxShadow:'9px 12px 0 #081e2855'}}><Pic file="paper.png" x={0} y={0} w={285} h={365}/>
 <P x={25} y={93+e(f,45,43,0,183)} w={235} h={22} style={{background:'#e9bd4799',borderBottom:'3px solid #b77634',opacity:f>=43&&f<97?1:0}}/></P>
 <P x={429} y={270} w={395} h={170} style={{opacity:1-e(f,21,14),transform:`translateY(${e(f,21,14,0,-35)}px)`}}><Label x={0} y={0} size={43} color={C.gold}>StoryScope</Label><Label x={0} y={67} size={26}>Read the finding.<br/>Change the writing.</Label></P>
 <Svg><path d="M309 396H357V273H394" fill="none" stroke={C.mint} strokeWidth="7" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(f,45,24)}/><path d="M382 261L397 273 382 285" fill="none" stroke={C.mint} strokeWidth="7" opacity={e(f,63,5)}/></Svg>
 {f>=49&&f<86&&<P x={331+e(f,49,28,0,392)} y={422-e(f,49,8,30,0)+e(f,76,10,0,118)} w={167} h={72} style={{background:'#c57c5d',border:'7px solid #e9bda0',borderRadius:10,transform:`rotate(${e(f,49,28,-11,8)}deg)`,boxShadow:'0 12px 0 #09202755'}}><Label x={16} y={19} size={20}>EXPLANATION</Label></P>}
 <P x={387+e(f,130,18,0,30)} y={609+e(f,108,13,37,0)-e(f,130,18,0,15)} w={484} h={72} style={{background:'#28694f',border:'4px solid #8ac5a6',borderRadius:12,opacity:pin,transform:`rotate(${(e(f,108,5)-e(f,115,8))*-3}deg)`}}><Label x={64} y={20} size={26}>RULE KEPT IN THE SKILL</Label><svg viewBox="0 0 48 55" style={{position:'absolute',left:13,top:5,width:40,height:51}}><path d={`M13 ${25-e(f,110,9,7,0)}V17a11 11 0 0 1 22 0v8`} fill="none" stroke={C.gold} strokeWidth="5"/><rect x="7" y="25" width="35" height="26" rx="5" fill={C.gold}/><circle cx="24" cy="36" r="3" fill={C.ink}/></svg></P>
 <P x={290} y={597+press*8} w={68} h={25} style={{background:C.gold,borderRadius:'50%',borderBottom:'8px solid #97633a'}}/>
 <Hero f={f} x={81+e(f,0,36,0,39)+e(f,95,39,0,34)} y={506+press*14-react*22} size={235} turn={1} mood={f<76?'read':f<97?'shock':'happy'} tilt={press*12-react*9} sy={1-press*.07+react*.04}/>
 </Set>;
};

const SkillFile=({x,y,f,w=280,rot=0}:{x:number,y:number,f:number,w?:number,rot?:number})=><P x={x} y={y} w={w} h={w*1.18} style={{background:'#e4edce',border:'6px solid #77a18a',borderRadius:15,boxShadow:'10px 15px 0 #091c2a66',transform:`rotate(${rot}deg)`}}><Mark file="claude.svg" x={w*.34} y={23} size={w*.23}/><Label x={25} y={w*.46} size={w*.14} color={C.ink}>Human<br/>Scope</Label><Label x={25} y={w*.93} size={22} color="#48664e">SKILL.md</Label></P>;
export const Bind=({f}:{f:number})=>{
 const squeeze=e(f,2,12), release=e(f,17,14), lean=e(f,0,8)-e(f,15,12);
 return <Set f={f} world="backlot"><Desk/>
 <Label x={116} y={153} size={28} color={C.gold}>KEEP THE RULE. EVERY TIME.</Label>
 <Svg><path d="M270 240V614H897V240" fill="none" stroke="#78634f" strokeWidth="20"/><path d="M240 620H930" stroke="#ba9460" strokeWidth="22"/></Svg>
 {[0,1,2].map(i=><P key={i} x={299+release*150} y={285+i*(92-squeeze*65)-release*63} w={490} h={88} style={{background:[C.cream,C.gold,C.mint][i],border:'5px solid #586555',borderRadius:10,transform:`rotate(${(1-squeeze)*(i-1)*7-release*8}deg)`,boxShadow:'0 12px 0 #101d2555'}}><Label x={20} y={24} size={28} color={C.ink}>{['TENSION','SUBTEXT','LOOSE ENDS'][i]}</Label></P>)}
 <Svg><path d={`M${287+release*150} ${246+squeeze*62-release*63}h525v${280-squeeze*191}`} fill="none" stroke="#c07753" strokeWidth="20" strokeLinecap="round"/></Svg>
 <Hero f={f} x={93+e(f,0,15,0,82)} y={468+lean*24} size={272} turn={1} tilt={lean*17} sy={1-lean*.08} mood={f>17?'happy':'stern'}/>
 </Set>;
};
export const SkillUI=({f}:{f:number})=>{
 const load=e(f,0,20), strike=e(f,26,9)-e(f,38,13), out=e(f,45,20);
 const recoil=(e(f,33,3)-e(f,39,8));
 return <Set f={f} world="depot"><Desk/>
 <Label x={117} y={148} size={31} color={C.gold}>SKILL CREATOR</Label>
 <Svg><path d="M388 199H823V239H788V556H826V600H383V556H419V239H388Z" fill="#486774" stroke="#90a5a2" strokeWidth="9"/><path d="M382 606H846" stroke="#172736" strokeWidth="27"/><path d="M595 190V286" stroke="#aab8a8" strokeWidth="30"/></Svg>
 {[0,1,2].map(i=><P key={i} x={120+load*329+out*260} y={346+i*27-out*91} w={293} h={124} style={{background:[C.cream,C.gold,C.mint][i],border:'5px solid #547263',borderRadius:8,transform:`rotate(${(1-load)*(i-1)*10+out*8}deg)`,opacity:f<45?1:0}}><Label x={24} y={29} size={27} color={C.ink}>{['TENSION','SUBTEXT','LOOSE ENDS'][i]}</Label></P>)}
 <P x={442+out*150} y={354-out*102} style={{opacity:f>=45?1:0,transform:`scale(${.68+out*.32})`,transformOrigin:'0 0'}}><SkillFile x={0} y={0} w={280} f={f} rot={out*7}/></P>
 <P x={439} y={260+strike*121} w={320} h={85} style={{background:'#ba7853',border:'8px solid #e1b785',borderRadius:13,boxShadow:'0 13px 0 #17323b'}}><Label x={30} y={22} size={29}>BUILD THE SKILL</Label></P>
 <Svg><path d="M320 450H395V397" fill="none" stroke="#d5a958" strokeWidth="18"/><g transform={`translate(327 451) rotate(${load*95+strike*38})`}><circle r="59" fill="#263e48" stroke="#9cb49f" strokeWidth="9"/><path d="M-48 0H48M0-48V48" stroke="#789886" strokeWidth="9"/><circle cx="38" cy="-36" r="16" fill={C.gold}/></g></Svg>
 <Hero f={f} x={76+load*20-out*16} y={447+strike*24-recoil*14} size={270} turn={1} mood={out>.2?'happy':'stern'} tilt={load*8+strike*13-out*12} sy={1-strike*.10}/>
 </Set>;
};
export const Library=({f}:{f:number})=>{
 const open=e(f,0,18), seat=e(f,17,22), close=e(f,42,18), name=e(f,56,19);
 return <Set f={f} world="row"><Desk/>
 <Label x={111} y={151} size={29} color={C.gold}>SAVE IT ONCE.</Label>
 <Svg><path d="M370 209H879V628H370Z" fill="#566c60" stroke="#b4bda0" strokeWidth="10"/><path d="M403 243H845V553H403Z" fill="#142a2d"/><path d="M394 578H854" stroke="#273e39" strokeWidth="18"/></Svg>
 <P x={198+seat*273} y={222-seat*15+close*204} style={{transform:`scale(${1-close*.43}) rotate(${-12+seat*12}deg)`,transformOrigin:'50% 60%',opacity:f<61?1:0}}><SkillFile x={0} y={0} w={273} f={f}/></P>
 <P x={333-open*42+close*42} y={398+open*95-close*95} w={517} h={188} style={{background:'#71907c',border:'8px solid #b2c3a3',borderRadius:12,boxShadow:'0 20px 0 #102526'}}><P x={189} y={60} w={145} h={32} style={{background:'#1e3c37',border:'5px solid #d3bb7b',borderRadius:8}}/></P>
 <P x={400-name*43} y={260-name*20} w={444+name*57} h={155} style={{background:C.gold,border:'7px solid #c4934e',borderRadius:14,opacity:e(f,57,8),transform:`rotate(${(e(f,57,5)-e(f,66,8))*-5}deg)`,boxShadow:'0 13px 0 #173128'}}><Label x={26} y={19} size={21} color="#745127">YOUR PERMANENT SKILL</Label><Label x={25} y={62} size={47} color={C.ink}>Human Scope</Label></P>
 <Hero f={f} x={94+seat*33+close*50-name*35} y={464+(e(f,39,8)-e(f,54,10))*22} size={270} turn={1} mood={f>59?'happy':f>39?'stern':'read'} tilt={(e(f,36,9)-e(f,52,11))*15-name*8}/>
 </Set>;
};
export const Command=({f}:{f:number})=>{
 const key=e(f,1,15), hit=e(f,31,6)-e(f,39,7), send=e(f,35,10);
 return <Set f={f} world="kerbside"><Desk/>
 <Label x={116} y={154} size={28} color={C.mint}>CLAUDE CODE</Label>
 <P x={272-key*22+send*67} y={269+hit*23-send*100} w={582} h={238} style={{background:'#f4ead6',border:'9px solid #b09a73',borderRadius:24,boxShadow:`0 ${24-hit*18}px 0 #695138`,transform:`rotate(${-5+key*5+send*7}deg) scale(${1-send*.12})`}}><Label x={34} y={42} size={49} color="#35664d">{'/human-scope'.slice(0,Math.round(e(f,0,18,1,12)))}</Label><Label x={35} y={136} size={29} color={C.ink}>Write my story.</Label><Label x={455} y={126} size={49} color="#7c663b">↵</Label></P>
 <Hero f={f} x={98+e(f,12,23,0,104)} y={474-(e(f,17,7)-e(f,28,7))*48+hit*23} size={281} turn={1} mood={f>32?'happy':'stern'} tilt={(e(f,13,8)-e(f,32,9))*-13+hit*12} sy={1-hit*.12}/>
 <Svg><path d="M349 566H786" stroke={C.mint} strokeWidth="11" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(f,35,10)}/><path d="M766 546L790 566 766 586" fill="none" stroke={C.mint} strokeWidth="9" opacity={send}/></Svg>
 </Set>;
};
export const Activate=({f}:{f:number})=>{
 const insert=e(f,0,18), gate=e(f,19,15), feed=e(f,24,21);
 return <Set f={f} world="depot"><Desk/>
 <Label x={113} y={151} size={29} color={C.gold}>SKILL → EVERY WRITING TASK</Label>
 <Svg><path d="M407 225H584V628H407Z" fill="#3c6973" stroke="#83afa6" strokeWidth="9"/><path d="M453 251V486H540V251" fill="#112c33"/><path d={`M620 ${290-gate*115}V${539-gate*115}`} stroke="#a1aa8d" strokeWidth="27"/><path d="M577 480H916V562H577Z" fill="#51746f" stroke="#97a98d" strokeWidth="6"/>{[0,1,2,3].map(i=><g key={i} transform={`translate(${615+i*85} 531) rotate(${feed*280})`}><circle r="19" fill="#173634" stroke="#b7c5a1" strokeWidth="5"/><path d="M-11 0H11" stroke="#bdab75" strokeWidth="5"/></g>)}</Svg>
 <P x={110+insert*331} y={243-insert*63} style={{transform:`scale(${1-insert*.6}) rotate(${-10+insert*10}deg)`,transformOrigin:'0 0',opacity:1-e(f,24,9)}}><SkillFile x={0} y={0} w={283} f={f}/></P>
 {[0,1,2].map(i=><Paper key={i} x={640+feed*170-i*23} y={286+i*26-feed*39} w={160} rot={feed*(i-1)*12}/>)}
 <P x={438} y={317} w={118} h={76} style={{background:f>18?C.mint:'#1c3d40',borderRadius:12}}><Label x={19} y={19} size={31} color={C.ink}>{f>18?'ON':'...'}</Label></P>
 <Hero f={f} x={88+insert*77-gate*37} y={474+(e(f,10,8)-e(f,24,10))*17} size={268} turn={1} mood={f>20?'happy':'stern'} tilt={insert*13-gate*20}/>
 </Set>;
};
export const Transform=({f}:{f:number})=>{
 const spread=e(f,0,23), pull=e(f,23,21), branch=e(f,45,38);
 return <Set f={f} world="plaza"><Desk/>
 <Label x={119} y={151} size={30} color={C.gold}>LET THE STORY BREATHE.</Label>
 <Svg><path d={`M520 594L${491-spread*260} ${577-spread*23}V${272-spread*53}Q370 231 520 271Z`} fill="#f1e5c9" stroke="#b8a680" strokeWidth="8"/><path d={`M520 594L${548+spread*325} ${577-spread*23}V${272-spread*53}Q690 231 520 271Z`} fill="#fff1d4" stroke="#b8a680" strokeWidth="8"/><path d="M520 276V589" stroke="#b49b72" strokeWidth="8"/>
 <path d={`M257 349H768`} stroke="#b87255" strokeWidth="22" opacity={1-pull}/><path d={`M257 401H768`} stroke="#b87255" strokeWidth="22" opacity={1-pull}/>
 <path d={`M267 480H386L470 ${480-branch*131}L553 ${480-branch*53}L661 ${480-branch*185}L801 ${480-branch*115}`} fill="none" stroke="#3e7d65" strokeWidth="13" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-e(f,24,43)}/>
 <path d={`M553 ${480-branch*53}V540H689M386 480V${480-branch*152}H289`} fill="none" stroke="#b99545" strokeWidth="10" strokeDasharray="11 7" opacity={branch}/></Svg>
 <P x={286+pull*540} y={320+pull*182} w={430} h={119} style={{background:'#b86c50',border:'7px solid #dcac80',borderRadius:12,opacity:1-e(f,39,11),transform:`rotate(${pull*31}deg)`}}><Label x={24} y={35} size={29}>EXPLAIN EVERYTHING</Label></P>
 {f>=44&&<P x={520} y={265} w={349} h={315} style={{transform:`perspective(1100px) rotateY(${e(f,44,38,-165,0)}deg)`,transformOrigin:'0 50%',backfaceVisibility:'visible',background:'#f5e7c6',border:'5px solid #b8a680',clipPath:'polygon(0 0,100% 0,100% 94%,0 100%)'}}><svg viewBox="0 0 349 315"><path d="M17 208L94 155 164 201 236 96 318 136M164 201V267H257" fill="none" stroke="#39785f" strokeWidth="12" strokeLinejoin="round"/>{[45,74].map(y=><path key={y} d={`M25 ${y}H296`} stroke="#b6a787" strokeWidth="6"/>)}</svg></P>}
 <Hero f={f} x={84+pull*115-branch*59} y={476+(e(f,20,7)-e(f,33,11))*25-(e(f,57,7)-e(f,68,11))*28} size={270} turn={1} mood={f>44?'happy':'stern'} tilt={pull*17-branch*24}/>
 <Label x={443} y={620} size={28} color={C.mint} style={{opacity:e(f,58,12),transform:`translateX(${e(f,58,23,45,0)}px)`}}>Tension. Subtext. Possibility.</Label>
 </Set>;
};
export const CTA=({f}:{f:number})=>{
 const paper=e(f,0,25), skill=e(f,34,28), carry=e(f,64,23), stamp=e(f,96,5)-e(f,104,8);
 return <Set f={f} world="marquee"><Desk/>
 <Label x={117} y={147} size={28} color={C.gold}>THE PAPER + THE SKILL</Label>
 <P x={247+carry*42} y={260-carry*32} w={602} h={291} style={{background:'#325e68',border:'9px solid #a4b8a3',borderRadius:16,boxShadow:'0 20px 0 #0d2335'}}/>
 <P x={103+paper*204+carry*42} y={186+paper*45-carry*32} style={{transform:`rotate(${-15+paper*10}deg)`}}><Pic file="paper.png" x={0} y={0} w={250} h={324}/></P>
 <P x={655-skill*69+carry*42} y={143+skill*77-carry*32} style={{opacity:e(f,30,8),transform:`scale(${.85+skill*.15}) rotate(${-13+skill*20}deg)`,transformOrigin:'50% 100%'}}><SkillFile x={0} y={0} f={f} w={235}/></P>
 <P x={246+carry*42} y={439-carry*32} w={604} h={149} style={{background:'#567e7b',border:'8px solid #a4b8a3',borderRadius:'8px 8px 17px 17px',transform:`scaleY(${1-stamp*.09})`,transformOrigin:'50% 100%'}}><Label x={28} y={25} size={25}>STORYSCOPE + HUMAN SCOPE</Label><Label x={28} y={69} size={37} color={C.gold}>Ready for your next story.</Label></P>
 <P x={410-e(f,90,19,0,45)} y={622-e(f,90,19,0,30)+stamp*6} w={464+e(f,90,19,0,62)} h={97} style={{background:C.gold,border:'6px solid #be8e40',borderRadius:17,boxShadow:'0 12px 0 #0b2033',transform:`rotate(${(e(f,90,6)-e(f,101,9))*-3}deg)`}}><Label x={23} y={12} size={22} color="#755526">COMMENT</Label><Label x={22} y={40} size={44+e(f,90,19,0,9)} color={C.ink}>SCOPE</Label><Label x={353} y={31} size={32} color="#3f6550">→</Label></P>
 <Hero f={f} x={75+paper*36+skill*50-carry*77} y={487+(e(f,50,7)-e(f,64,11))*22-(e(f,95,5)-e(f,104,8))*30} size={252} turn={1} mood={f>63?'happy':f>30?'stern':'read'} tilt={paper*10-skill*5-carry*12+stamp*8}/>
 </Set>;
};
