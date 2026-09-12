import {staticFile} from './assets';
import React from 'react';
import {Img} from 'remotion';
import {P,E,O,pulse,recoil,Actor,Label,Burst,Set,Bench,Tool,App,Cursor} from './EC150Kit';
import {Gauntlet} from './EC150Scenes';

// Authentic marks are physical props; lettering is reserved for the spoken payload.
export const Logo:React.FC<any>=({name='github',x=0,y=0,s=100,rot=0,z=60,scale=1,bg='#F1E9D4'})=><P x={x} y={y} w={s} h={s} z={z} rot={rot} scale={scale} style={{background:bg,border:'5px solid #173C40',borderRadius:s*.2,boxShadow:'0 9px 0 #081F2C55',padding:s*.16}}><Img src={staticFile('logos/'+name+(name==='openai'?'.png':'.svg'))} style={{width:'100%',height:'100%',objectFit:'contain'}}/></P>;
const costumes=['constr','prof','samurai','cop','chef','wizard','glasses','suit','beard','fro','girl','xeyes'];
export const Bug:React.FC<any>=({x,y,s=180,rot=0,scale=1,z=70})=><P x={x} y={y} w={s} h={s} z={z} rot={rot} scale={scale}><svg viewBox="0 0 120 120"><path d="M30 47L8 33M29 67H4M31 86L10 105M91 47L112 33M92 67H116M89 86L110 105" stroke="#F28468" strokeWidth="11"/><ellipse cx="60" cy="68" rx="35" ry="41" fill="#E66850" stroke="#542B39" strokeWidth="6"/><path d="M59 28V105" stroke="#68283C" strokeWidth="5"/><circle cx="46" cy="48" r="7" fill="#172A34"/><circle cx="74" cy="48" r="7" fill="#172A34"/></svg></P>;
export const Point:React.FC<any>=({x,y,f,flip=false})=><P x={x} y={y} w={180} h={125} z={69} rot={(flip?-1:1)*(-25-E(f,8,24,0,20)+pulse(f,40,22)*14)} style={{transformOrigin:flip?'100% 85%':'0% 85%'}}><svg viewBox="0 0 180 125" style={{transform:flip?'scaleX(-1)':undefined}}><path d="M0 102L71 98L133 40" stroke="#B65A43" strokeWidth="29" fill="none"/><path d="M130 42L152 17M134 43L162 39M128 53L153 62" stroke="#E39776" strokeWidth="17" fill="none" strokeLinecap="round"/></svg></P>;
const Crate:React.FC<any>=({x,y,w=480,f,at=0,z=40})=>{const lid=E(f,at,at+18);return <P x={x} y={y} w={w} h={w*.5} z={z}><svg viewBox="0 0 480 240" style={{overflow:'visible'}}><path d="M12 41H464V222H12Z" fill="#A97940" stroke="#302D29" strokeWidth="12"/><path d="M25 66H451M25 125H451M25 185H451" stroke="#DCB775" strokeWidth="9"/><path d="M77 49V215M396 49V215" stroke="#3E544D" strokeWidth="24"/><path d="M5 26H475V67H5Z" fill="#D6B57C" stroke="#273D38" strokeWidth="12" transform={`translate(0 ${-lid*125}) rotate(${-lid*23} 25 55)`}/><rect x="211" y="89" width="64" height="68" rx="9" fill="#E7D6A7" stroke="#3D5142" strokeWidth="8" transform={`translate(${lid*131} ${lid*53}) rotate(${lid*60} 230 120)`}/></svg></P>};

export const Hook:React.FC<any>=({f})=>{const recoilF=pulse(f,22,24),lower=E(f,72,102),power=O(f,24,37),wind=E(f,48,60),blast=O(f,60,67),settle=E(f,75,102),lead=E(f,84,102);return <Set kind={0} f={f}>
 <P x={0} y={0} w={1012} h={792} z={5} style={{background:"#030818",opacity:power*.88}}/>
 {power>0&&<P x={82} y={286} w={415} h={435} z={49} style={{background:"radial-gradient(ellipse,#FFE9A166,#6DBDD633 48%,transparent 70%)",opacity:power,transform:`scale(${1+pulse(f,28,42)*.17})`}}/>}
 <Bench x={88} y={680} w={817} c="#C6A062"/>
 {[0,1,2].map(i=>{const at=25+i*3,d=O(f,at,at+20);return <React.Fragment key={i}>
 <P x={733} y={156+i*178} w={210} h={174} z={25} style={{clipPath:`inset(0 ${d*100}% 0 0)`}}><div style={{position:'absolute',inset:0,background:'#DADCB4',border:'5px solid #688C7F',borderRadius:14}}/><Actor x={56} y={146} s={131} f={f} costume={costumes[i]} gaze={-6} shock={recoilF}/><Tool x={106} y={38} s={103} type={i}/><Bench x={12} y={143} w={190} c="#AE925D"/></P>
 {Array.from({length:42},(_,j)=>{const t=f-at-j*.18;if(t<0||t>40)return null;const go=O(t,0,30);return <P key={j} x={734+(j%7)*28+go*(90+j%5*24)} y={158+i*178+Math.floor(j/7)*27-go*(160+j%4*35)} w={16+j%3*9} h={17+j%2*10} z={56} rot={t*(j%2?5:-5)} style={{background:['#D4A870','#6EAB99','#D37B52'][j%3],opacity:1-E(t,19,40),borderRadius:2}}/>})}
 </React.Fragment>})}
 <Actor x={244+O(f,-8,19,-30,20)-recoilF*37-wind*37+blast*77-settle*16-lead*37} y={699-recoilF*22-power*(22+Math.sin(f*.17)*9)} s={438-E(f,53,77,0,46)} f={f} costume="suit" capeC="#AE4A3C" lean={O(f,-8,19,-6,8)-recoilF*18-wind*19+blast*31-settle*8-lead*16} gaze={9} stern={Math.max(1-E(f,24,40),power*.65)} shock={recoilF*.5*(1-power)} cheer={lower*.6} squash={recoilF*.5} glowEyes={power*(.85+.15*Math.sin(f*.23))}/>
 <P x={390-wind*20+blast*28-lead*39} y={553+lower*17-lead*61} w={208} h={90} z={59} rot={-31-wind*19+blast*48+lower*10-lead*34}><svg viewBox="0 0 208 90"><path d="M0 17H195V76H0Z" fill="#B4543D" stroke="#623A2B" strokeWidth="8"/><path d="M35 17V76M82 17V76M132 17V76M178 17V76" stroke="#E9BC70" strokeWidth="12"/></svg></P>
 <Gauntlet x={495+O(f,-8,20,-20,25)-recoilF*30-wind*86+blast*127-settle*67-lead*39} y={332-O(f,-8,20,0,68)-wind*65+blast*133+settle*31-lead*84} f={f} s={1.75-E(f,52,73,0,.46)} z={65} tilt={-wind*27+blast*62+settle*10-lead*34}/>
 <Burst f={f} at={22} x={592} y={162} r={180}/>
 {power>0&&<P x={60} y={286} w={405} h={430} z={57} style={{opacity:power}}><svg viewBox="0 0 405 430">{[0,1,2].map(i=><path key={i} d={`M${38+i*154} 405l${i%2?-20:24} -${64+(f*3+i*27)%93}l-19 -29l26 -${45+(f*2+i*13)%76}`} stroke={i%2?'#FFF0AC':'#8CCDE0'} strokeWidth={5} fill="none" opacity={.55+.35*Math.sin(f*.18+i)}/>)}</svg></P>}
 {f>=57&&<P x={0} y={0} w={1012} h={792} z={62}><svg viewBox="0 0 1012 792"><defs><radialGradient id="summon-core"><stop stopColor="#FFF9D8"/><stop offset=".32" stopColor="#EAC06C" stopOpacity=".85"/><stop offset="1" stopColor="#69B6D1" stopOpacity="0"/></radialGradient></defs>
 {f<80&&<><ellipse cx={592+blast*33} cy={432} rx={18+O(f,57,68,0,101)} ry={15+O(f,57,68,0,96)} fill="url(#summon-core)" opacity={1-E(f,70,80)}/><path d={`M610 432L${610+O(f,61,69)*231} ${432-O(f,64,74)*68}`} stroke="#F7E8AF" strokeWidth={15*(1-E(f,70,80))} fill="none"/></>}
 {[0,1,2].map(i=>{let at=63+i*7,q=O(f,at,at+12),fade=1-E(f,at+14,at+27),y=[249,430,617][i],x=[784,839,756][i];return f<at?null:<g key={i} opacity={fade}><path d={`M629 437Q${687+Math.sin(f*.37+i)*14} ${y+70} ${629+q*(x-629)} ${437+q*(y-437)}`} stroke={i===1?'#A8DAE6':'#F0CB7B'} strokeWidth={8} fill="none"/><ellipse cx={x} cy={y+47} rx={25+q*93} ry={18+q*29} fill="none" stroke="#A5DADE" strokeWidth={7}/><ellipse cx={x} cy={y+47} rx={22+q*109} ry={16+q*35} fill="none" stroke="#EDC976" strokeWidth={3}/></g>})}
 </svg></P>}
 {[0,1,2].map(i=>{const at=64+i*7,appear=O(f,at,at+13),land=E(f,at+10,at+22),handoff=E(f,at+20,102),rush=E(f,85+i*4,105+i*3),dx=[-186,203,-10][i],dy=[425,246,382][i],x=[779,832,738][i],y=[337,522,706][i],size=[201,215,238][i];if(f<at)return null;return <React.Fragment key={i}>
 <P x={x-size*.47} y={y-9} w={size*.94} h={26} z={64} scale={appear*(1-rush)}><svg viewBox="0 0 220 30"><ellipse cx="110" cy="14" rx="106" ry="11" fill="#315964" stroke="#9FC5BB" strokeWidth="5"/></svg></P>
 <P x={x-size/2+O(f,at,at+13,68,0)-handoff*(i===2?22:0)+rush*dx} y={y-size*.92-(1-land)*66+rush*dy} w={size} h={size} z={69+i} scale={.34+appear*.66+rush*.72} rot={-17*(1-appear)+recoil(f,at+20)*9+rush*(i===1?22:-17)} style={{transformOrigin:"50% 92%",clipPath:`inset(${(1-appear)*100}% 0 0 0)`}}><Actor x={size/2} y={size*.92} s={size} f={f+i*11} costume={['prof','samurai','constr'][i]} gaze={-9} stern={.4*(1-handoff)} cheer={handoff*.75} lean={-handoff*9+rush*21} walk={1} squash={pulse(f,at+19,13)*.8} glowEyes={(1-E(f,at+11,at+23))*.9}/></P>
 <Tool x={x+size*.2-handoff*55+rush*dx} y={y-87-handoff*22+rush*dy} s={87+rush*52} type={i} rot={-25+appear*30-handoff*21+rush*47} z={76}/><Burst f={f} at={at+19} x={x} y={y-9} r={98}/>
 </React.Fragment>})}

 </Set>};

// Three active workshop tiers: typing, inspecting blueprints, then handing specialist tools onward.
const BackgroundCrew:React.FC<any>=({f})=><>
 {[0,1,2].map(row=><P key={row} x={70} y={245+row*103} w={873} h={16} z={15+row*5} style={{background:['#67988A','#5D8B7C','#588476'][row],borderBottom:'5px solid #193E38',borderRadius:4}}/>)}
 {Array.from({length:21},(_,i)=>{const row=Math.floor(i/7),col=i%7,at=-18+row*4+col*1.4,t=f+col*5+row*9,enter=O(f,at,at+14),key=Math.sin(t*1.1),scan=(1-Math.cos(t*.13))*.5,phase=(f+col*7)%42,pass=E(phase,6,27),receive=pulse(phase,27,13),work=row===0?Math.sin(t*.37)*5:row===1?-11+scan*21:-12+pass*24-receive*9,x=121+col*127+(1-enter)*(col%2?58:-58)+(row===1?scan*13-6:row===2?pass*9:Math.sin(t*.24)*4),y=244+row*103-(1-enter)*91,z=17+row*5;return <React.Fragment key={i}>
 <Actor x={x} y={y} s={94} f={t} costume={costumes[i%12]} gaze={row===2?8-pass*15:7} lean={work} stern={row===1?.65:0} cheer={row===2?receive*.75:.15} squash={row===0?Math.abs(key)*.15:receive*.25} z={z}/>
 {row===0?<>
 <P x={x+28} y={y-88} w={66} h={53} z={z+1} style={{background:'#102B39',border:'4px solid #BDD4B7',borderRadius:5}}><svg viewBox="0 0 66 53">{[0,1,2].map(j=><path key={j} d={`M${7+j%2*6} ${11+j*13}h${12+(Math.floor(t*2+j*11)%36)}`} stroke={j===1?'#E3B46B':'#8ABDA8'} strokeWidth="5"/>)}<path d="M9 47H54" stroke="#679893" strokeWidth="4"/></svg></P>
 <P x={x+19} y={y-27} w={81} h={20} z={z+2}><svg viewBox="0 0 81 20"><path d="M8 2H72L79 16H2Z" fill="#BFCBA6" stroke="#254C46" strokeWidth="3"/>{[0,1,2,3,4].map(j=><path key={j} d={`M${15+j*12} 8h7`} stroke={(Math.floor(t)+j)%4===0?'#D48351':'#4D7265'} strokeWidth="5"/>)}</svg></P>
 <P x={x-46} y={y-57} w={126} h={43} z={z+3}><svg viewBox="0 0 126 43"><path d={`M8 5Q23 38 79 ${29+key*6}M87 5Q115 18 114 ${29-key*6}`} stroke="#D97757" strokeWidth="10" fill="none"/></svg></P>
 </>:row===1?<>
 <Tool x={x+23} y={y-94} s={72} type={0} rot={-16+scan*12} z={z+1}/>
 <P x={x+17+scan*24} y={y-84+scan*17} w={60} h={74} z={z+3} rot={-27+scan*34}><svg viewBox="0 0 60 74"><circle cx="31" cy="24" r="19" fill="#A2DBD577" stroke="#E3C483" strokeWidth="7"/><path d="M20 42L5 69" stroke="#E3C483" strokeWidth="10"/><path d="M23 17l8 -6" stroke="#F0E6C4" strokeWidth="5"/></svg></P>
 <P x={x-40} y={y-49} w={115} h={40} z={z+2}><svg viewBox="0 0 115 40"><path d={`M3 3Q37 41 ${65+scan*23} ${18-scan*12}`} stroke="#D97757" strokeWidth="11" fill="none"/></svg></P>
 </>:<>
 <P x={x-45} y={y-60} w={135} h={51} z={z+3}><svg viewBox="0 0 135 51"><path d={`M8 8Q${30-pass*11} ${35-receive*14} ${41-pass*26} ${18-receive*17}M88 9Q110 ${40-pass*23} ${110+pass*17} ${27-pass*19}`} stroke="#D97757" strokeWidth="11" fill="none"/></svg></P>
 {col<6&&<Tool x={x+30+pass*96} y={y-108-Math.sin(pass*Math.PI)*38+receive*7} s={63} type={col%4} rot={-17+pass*33+receive*12} z={z+4}/>}
 </>}
 </React.Fragment>})}
 </>;

export const Team:React.FC<any>=({f,final=false})=>{const pop=final?10:30;return <Set kind={final?10:1} f={f}>

 <BackgroundCrew f={f}/>
 <Bench x={106} y={689} w={795} c="#7FA67B"/><Crate x={302} y={510+recoil(f,pop+16)*12} w={425} f={f} at={pop-6}/>
 {[0,1].map(i=>{const pull=pulse(f,pop-12,30),catchF=E(f,pop+17,65);return <React.Fragment key={i}><Actor x={166+i*684+pull*(i?-52:52)-catchF*(i?45:-45)} y={706-pull*27} s={270} f={f+i*8} costume={i?'samurai':'prof'} gaze={i?-9:9} lean={pull*(i?22:-22)+catchF*(i?-11:11)} shock={pulse(f,pop+9,20)} cheer={catchF} squash={pulse(f,pop+14,12)}/><Point x={i?660:244} y={505} f={f-pop+8} flip={!!i}/></React.Fragment>})}
 {['react','python','typescript','githubactions','jest'].map((name,i)=>{const at=pop+i*3,fly=O(f,at,at+16),catchF=E(f,pop+20+i*2,65);if(f<at)return null;return <P key={i} x={431+fly*(-315+i*153)+catchF*(i<2?-42:37)} y={542-fly*(290+(i%2)*82)+catchF*(i===2?-65:86)} w={138} h={170} z={63+i} rot={fly*(-27+i*13)+recoil(f,at+16)*12+catchF*(i-2)*9} scale={.45+fly*.55}><div style={{position:'absolute',inset:0,background:'#E2D4AA',border:'6px solid #163E3D',borderRadius:12,boxShadow:'0 12px 0 #132E31'}}/><Logo name={name} x={12} y={12} s={114} z={5}/><P x={23} y={139} w={91} h={12} style={{background:'#518779',borderRadius:4}}/></P>})}
 <Burst f={f} at={pop+10} x={510} y={512} r={173}/>
 {final&&f>40&&<Tool x={411+E(f,40,64,0,146)} y={478-E(f,40,64,0,155)} s={175} type={2} z={76} rot={E(f,40,64,-22,12)}/>}
 </Set>};

// Real creator photograph, tightly framed. Both cuts retain the same portrait for continuity.
const Portrait:React.FC<any>=({f,early=false})=>{const en=O(f,-6,20),turn=E(f,46,81);return <Set kind={4} f={f}>
 <P x={early?428-en*56:323-E(f,0,26,0,49)+turn*20} y={151+(1-en)*130+turn*19} w={early?470:492} h={545} z={34} rot={early?-4+en*3:-1+turn*4} style={{overflow:'hidden',border:'8px solid #E7D1A3',borderRadius:20,boxShadow:'0 18px 0 #10202D'}}><Img src={staticFile('affaan-hackathon.png')} style={{position:'absolute',maxWidth:'none',width:2300,height:2185,left:-1740-E(f,0,83,0,22),top:-1502-E(f,0,83,0,19)}}/></P>
 {early?<><Logo x={109+en*19} y={200+E(f,26,55,0,33)} s={229} rot={-12+en*10}/><P x={125+en*17} y={440-E(f,26,55,0,29)} w={259} z={75} style={{fontSize:106,fontWeight:950,color:'#F4DCAE',textShadow:'0 8px 0 #142B36'}}>ECC</P><Actor x={210+E(f,21,55,0,43)} y={719} s={231} f={f} costume="glasses" gaze={9} lean={pulse(f,8,30)*18} cheer={.7} walk={1}/><Point x={294} y={531} f={f}/></>:<>
 <Logo name="github" x={90+E(f,-4,22,-160,0)-turn*16} y={182+turn*91} s={147} rot={-12+turn*19}/>
 <Logo name="claude" x={776+O(f,5,27,220,0)} y={213+turn*107} s={139} rot={12-turn*20}/>
 <Actor x={164+E(f,1,25,0,46)-turn*27} y={711} s={245} f={f} costume="prof" gaze={9} lean={pulse(f,5,30)*19-turn*6} cheer={.75}/><Point x={256-turn*15} y={519} f={f}/>
 <Actor x={860-E(f,10,34,0,28)+turn*15} y={710} s={223} f={f} costume="constr" gaze={-9} lean={-pulse(f,12,32)*18+turn*6} cheer={.75}/><Point x={636+turn*15} y={515} f={f-9} flip/>
 {f>31&&<P x={308+O(f,31,45,0,-12)} y={608-O(f,31,49,120,0)-E(f,65,84,0,21)} w={464} h={106} z={79} rot={recoil(f,48)*3} style={{background:'#E7C784',border:'6px solid #1B3A3E',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',gap:18,color:'#233D3C',fontWeight:950,fontSize:68}}><span style={{color:'#A76828'}}>★</span>{Math.round(O(f,32,60,10,240))}K+</P>}
 <Burst f={f} at={60} x={534} y={604} r={137}/>
 </>}
 </Set>};
export const Repo:React.FC<any>=({f})=><Portrait f={f} early/>;
export const Creator:React.FC<any>=({f})=><Portrait f={f}/>;

export const Build:React.FC<any>=({f})=>{const hits=[15,35,55],impact=hits.reduce((v,a)=>v+pulse(f,a,13),0),strike=hits.reduce((v,a)=>v+E(f,a-8,a)-E(f,a+2,a+11),0),finish=E(f,55,72);return <Set kind={7} f={f}>
 <Bench x={345} y={670} w={569} c="#C89850"/>
 <App x={402+O(f,-9,15,95,0)+finish*67} y={327+impact*35-finish*58} w={495+finish*26} h={343+finish*18} stage={Math.min(3,Math.max(0,hits.filter(a=>f>a).length))} fault={f>64} rot={recoil(f,15)*4+recoil(f,35)*4+recoil(f,55)*4}/>
 <Actor x={207+strike*49-finish*34} y={708-impact*22} s={309} f={f} costume="constr" gaze={9} stern={1-finish} lean={-15+strike*38-finish*7} squash={impact*.8} shock={pulse(f,64,16)*.7}/>
 <P x={279+strike*19} y={323+strike*55} w={362} h={322} z={67} rot={-49+strike*62+finish*18} style={{transformOrigin:'10% 92%'}}><svg viewBox="0 0 362 322"><path d="M35 299L232 87" stroke="#593D2F" strokeWidth="40"/><path d="M35 299L232 87" stroke="#D5A965" strokeWidth="24"/><path d="M146 44L288 13L353 108L210 153Z" fill="#98BBC0" stroke="#183E47" strokeWidth="10"/><path d="M169 51L224 129L335 101L282 31Z" fill="#C4DAD2"/><path d="M235 60L258 79L276 47" fill="none" stroke="#486B70" strokeWidth="9"/></svg></P>
 {['react','python','typescript'].map((name,i)=>{const at=hits[i],fly=O(f,at-11,at);return <React.Fragment key={i}>{f<at+5&&<Logo name={name} x={849-fly*(197-i*25)} y={130+fly*(245+i*36)} s={150} rot={-21+fly*31} scale={1-E(f,at,at+5,0,.7)} z={72}/>}<Burst f={f} at={at} x={609} y={413} r={153}/></React.Fragment>})}
 {f>56&&['javascript','python','typescript'].map((name,i)=><Logo key={i} name={name} x={494+i*145+O(f,56+i*3,69,75,0)} y={179-E(f,58+i*3,72,0,22)} s={106} rot={(i-1)*10} z={77}/>)}
 </Set>};

export const Test:React.FC<any>=({f})=>{const feed=O(f,-7,22),hit=E(f,21,28)-E(f,31,42),out=E(f,62,85),check=E(f,35,65);return <Set kind={9} f={f}>
 <P x={350} y={624} w={557} h={68} z={31}><svg viewBox="0 0 557 68"><rect x="4" y="8" width="549" height="50" rx="24" fill="#153B47" stroke="#90B6AF" strokeWidth="7"/>{Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${f*14} ${32+i*70} 33)`}><circle cx={32+i*70} cy="33" r="17" fill="#729F9F" stroke="#C3CFAC" strokeWidth="5"/><path d={`M${18+i*70} 33h28`} stroke="#305967" strokeWidth="5"/></g>)}</svg></P>
 <P x={341} y={156} w={567} h={518} z={30}><svg viewBox="0 0 567 518"><path d="M31 30V485M536 30V485" stroke="#A4BAB4" strokeWidth="42"/><path d="M31 30H536" stroke="#234D58" strokeWidth="71"/><path d="M31 30H536" stroke="#D7D7B2" strokeWidth="27"/><path d="M3 485H564" stroke="#DFBB76" strokeWidth="38"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M8 ${115+i*60}l45 -24M514 ${115+i*60}l45 -24`} stroke="#284F5A" strokeWidth="17"/>)}</svg></P>
 <App x={239+feed*162+out*138} y={407-feed*69-out*94} w={459} h={318} stage={3} fault={f<30} rot={recoil(f,28)*5+out*8}/>
 <P x={386} y={217+hit*222-out*43} w={475} h={85} z={64}><svg viewBox="0 0 475 85"><path d="M164 -120V9M311 -120V9" stroke="#719FA7" strokeWidth="36"/><rect x="4" y="4" width="466" height="74" rx="8" fill="#D1D7BD" stroke="#1F4853" strokeWidth="10"/>{Array.from({length:7},(_,i)=><path key={i} d={`M${14+i*66} 68l49 -52`} stroke="#386675" strokeWidth="20"/>)}</svg></P>
 <Actor x={166+feed*40+pulse(f,18,22)*44-out*29} y={712-pulse(f,28,18)*36} s={281} f={f} costume="chef" gaze={9} lean={pulse(f,14,26)*24-out*11+(f>34&&f<66?Math.sin(f*.29)*9:0)} shock={pulse(f,27,21)} cheer={out}/>
 <P x={258} y={535} w={130} h={150} z={71} rot={-26+hit*71} style={{transformOrigin:'15% 95%'}}><svg viewBox="0 0 130 150"><path d="M20 138V34" stroke="#D8BD84" strokeWidth="24"/><circle cx="20" cy="28" r="24" fill="#C26F53" stroke="#172D38" strokeWidth="7"/></svg></P>
 {f>33&&<P x={323} y={589} w={113} h={113} z={73} rot={(f-34)*13}><svg viewBox="0 0 113 113"><circle cx="56" cy="56" r="43" stroke="#D9C28A" strokeWidth="13" fill="#2E5D65"/><path d="M13 56H99M56 13V99" stroke="#92B9AD" strokeWidth="9"/><circle cx="56" cy="56" r="14" fill="#234A57"/><circle cx="99" cy="56" r="12" fill="#D97F5B" stroke="#E9C69D" strokeWidth="5"/></svg></P>}
 <P x={0} y={0} w={1012} h={792} z={75}><svg viewBox="0 0 1012 792"><path d={f>33?`M${260+feed*40-out*29} 596Q327 637 ${379+43*Math.cos((f-34)*13*Math.PI/180)} ${645+43*Math.sin((f-34)*13*Math.PI/180)}`:`M${260+feed*40} 596Q292 601 ${277.5+114.5*Math.sin((-26+hit*71)*Math.PI/180)} ${677.5-114.5*Math.cos((-26+hit*71)*Math.PI/180)}`} stroke="#D97757" strokeWidth="22" fill="none"/></svg></P>
 {[0,1].map(i=>f<49&&<Bug key={i} x={523+i*146+E(f,28,49,0,(i?1:-1)*195)} y={377-E(f,28,49,0,101)+E(f,37,49,0,188)} s={123} rot={E(f,28,49,0,i?160:-160)} scale={1-E(f,39,49,0,.9)}/>)}
 {f>34&&<P x={421-out*34} y={156-E(f,35,50,130,0)+out*31} w={441} h={151} z={77} rot={recoil(f,58)*3} style={{background:'#DCE6C4',border:'7px solid #204C51',borderRadius:19,padding:15}}><div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:14,color:'#255D52',fontSize:57,fontWeight:950}}><span style={{fontSize:49}}>✓</span>{Math.round(check*80)}%<span style={{fontSize:20}}>TARGET</span></div><div style={{display:'flex',gap:8,marginTop:9}}>{Array.from({length:10},(_,i)=><div key={i} style={{width:31,height:27,background:i<Math.round(check*8)?'#417E66':'#9BAE9C',borderRadius:5}}/>)}</div></P>}
 <Burst f={f} at={28} x={622} y={483} r={178}/><Burst f={f} at={65} x={644} y={232} r={129}/>
 </Set>};

export const Reveal:React.FC<any>=({f})=>{const rise=O(f,9,31),give=E(f,29,49);return <Set kind={11} f={f}>
 <Logo name="openai" x={95+E(f,-5,18,-140,0)} y={176} s={170} rot={-12}/><Logo name="claude" x={738+E(f,-5,19,190,0)} y={177} s={170} rot={12}/>
 <Crate x={317+give*31} y={487+give*58} w={511} f={f} at={-6} z={43}/>
 <P x={426+give*58} y={520-rise*340-give*18} w={285} h={359} z={61} scale={.5+rise*.5} rot={-9+rise*9+give*9} style={{background:'#EEDBA6',border:'8px solid #2E5147',borderRadius:29,boxShadow:'0 17px 0 #765738'}}><Logo name="github" x={40} y={24} s={189} z={4}/><div style={{position:'absolute',top:226,width:'100%',textAlign:'center',fontSize:82,fontWeight:950,color:'#21473C'}}>ECC</div></P>
 <Actor x={195+E(f,-7,17,0,48)-give*36} y={711-pulse(f,11,25)*31} s={298} f={f} costume="suit" gaze={9} lean={pulse(f,-5,24)*-23+give*13} shock={pulse(f,15,22)*.6} cheer={rise*.8}/><Point x={285} y={487} f={f}/>
 <Burst f={f} at={26} x={572} y={242} r={184}/>
 </Set>};

export const CTA:React.FC<any>=({f})=>{const enter=O(f,-6,20),press=E(f,28,39),settle=E(f,39,56);return <Set kind={12} f={f}>
 <Actor x={225+enter*16-settle*33} y={708-pulse(f,29,20)*29} s={361} f={f} costume="suit" capeC="#AE4A3C" gaze={8} lean={-10+enter*17-pulse(f,28,22)*15+settle*9} cheer={.85} squash={pulse(f,30,14)*.7}/>
 <P x={317} y={579} w={187} h={77} z={61} rot={-37+settle*25}><svg viewBox="0 0 187 77"><path d="M0 9H179V65H0Z" fill="#B35F43" stroke="#64452C" strokeWidth="6"/><path d="M34 9V65M86 9V65M139 9V65" stroke="#E1BE73" strokeWidth="12"/></svg></P>
 <Gauntlet x={331+enter*41-settle*18} y={309+O(f,-6,20,55,0)+settle*63} s={1.49} f={f-8} z={65} tilt={5+settle*19}/>
 <P x={550+O(f,-4,17,250,0)-settle*16} y={181+settle*22} w={337} h={465} z={75} rot={-5+enter*5+recoil(f,34)*3} scale={1+pulse(f,31,15)*.05} style={{background:'#F1D79B',border:'8px solid #2C5646',borderRadius:25,boxShadow:'0 18px 0 #133B34'}}>
 <Logo name="github" x={89} y={20} s={145} z={5}/><div style={{position:'absolute',top:197,width:'100%',textAlign:'center',fontSize:43,fontWeight:900,color:'#24483A'}}>COMMENT</div><div style={{position:'absolute',top:250,width:'100%',textAlign:'center',fontSize:121,lineHeight:1,fontWeight:950,letterSpacing:-4,color:'#AC4D32'}}>ECC</div><div style={{position:'absolute',bottom:17,width:'100%',textAlign:'center',fontSize:21,fontWeight:800,color:'#3D5944'}}>REPO + INSTALL GUIDE</div>
 </P>
 <Cursor x={831-press*75+settle*30} y={662-press*68+settle*32} hit={pulse(f,35,14)}/><Burst f={f} at={30} x={445} y={192} r={155}/><Burst f={f} at={35} x={802} y={582} r={111}/>
 </Set>};
