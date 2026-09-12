import React from 'react';
import {Svg,Stage,Actor,P,L,E,S,H,Plug,Clamp,Lens,Key,Mark,Impact,RankCrown,RankLaurel,ToolActivation,jingle} from './Setup145FlatKit';
import {inter} from './fonts';
const T=({x,y,children,size=28,color=P.paper}:{x:number;y:number;children:React.ReactNode;size?:number;color?:string})=><text x={x} y={y} fill={color} fontSize={size} fontWeight={900} fontFamily={inter.fontFamily} textAnchor="middle">{children}</text>;
const Tool=({kind,f,at,x,y,scale=1,angle=0}:{kind:number;f:number;at:number;x:number;y:number;scale?:number;angle?:number})=><g transform={`translate(${x} ${y}) rotate(${angle+jingle(f,at)}) scale(${scale})`}><ToolActivation f={f} at={at} x={130} color={[P.mint,P.blue,P.gold][kind]}/>{kind===0?<Clamp open={1-E(f,at+2,9)*.88}/>:kind===1?<Lens reveal={E(f,at,10)}/>:<Key/>}<Mark kind={['headroom','hud','aisa'][kind]} x={-21} y={0} size={56}/></g>;
// B: a directional selection event. Claude physically reels three useful tools
// from a dense plug cloud. The selected props become the earned rank platform.
export const MagneticSelection:React.FC<{f:number}>=({f})=>{let yank=E(f,34,13),rank=E(f,69,12),landing=H(f,80,11),leave=E(f,99,10);
 const sweep=E(f,0,8),catchPull=S(f,8,10),plant=S(f,19,15),retreat=E(f,18,16);
 const mx=804-sweep*303+retreat*150-yank*156,my=342+H(f,0,18)*36-retreat*46+yank*104-rank*147,ms=1.88-retreat*.88,ma=42-sweep*67+retreat*6+yank*25;
 const ropeX=mx-Math.sin(ma*Math.PI/180)*164*ms,ropeY=my+Math.cos(ma*Math.PI/180)*164*ms;
 let ax=84+catchPull*220-plant*220+yank*39+rank*64,ay=409-H(f,8,13)*63-rank*95-landing*18;return <><Stage variant={0} claudeRotation={f*.3}/><Svg>
 <defs><radialGradient id="selection-light"><stop stopColor="#FFE4A0" stopOpacity=".7"/><stop offset="1" stopColor="#FFE4A0" stopOpacity="0"/></radialGradient></defs>
 <Impact x={549} y={440} t={L(f,8,13)} size={123}/><Impact x={207} y={701} t={L(f,25,12)} size={90}/><ellipse cx={687} cy={379} rx={334} ry={242} fill="url(#selection-light)"/>
 {/* Far plugs recede while three large useful objects resolve in front. */}
 {Array.from({length:28},(_,i)=>{let a=i*2.399,r=88+Math.sqrt(i)*29,q=E(f,37+(i%3)*3,17),capture=E(f,2+(i%7)*.7,10);
 let startX=165+(i%7)*111,startY=204+Math.floor(i/7)*106;
 let x=startX+(mx+Math.cos(a)*r*.69-startX)*capture+q*(i%2?350:-350),y=startY+(my+Math.sin(a)*r*.62-startY)*capture-q*180;return <g key={i} opacity={(1-q)*.62} transform={`translate(${x} ${y}) rotate(${a*57+capture*120}) scale(${.77+i%3*.12-capture*.22})`}><Plug color={i%3===0?'#D7B77A':'#7E9590'}/></g>})}
 <g transform={`translate(${mx} ${my}) rotate(${ma}) scale(${ms})`}><path d="M-99-77V39Q-99 137 0 137Q99 137 99 39V-77H43V39Q43 81 0 81Q-43 81-43 39V-77Z" fill={P.orange} stroke={P.ink} strokeWidth={7}/><path d="M-89-66V39Q-89 120-9 126" fill="none" stroke="#FFB07B" strokeWidth={8}/><path d="M-99-78H-43V-27H-99ZM43-78H99V-27H43Z" fill="#FFF1C5" stroke={P.ink} strokeWidth={6}/><path d="M-81-65H-54M54-65H81" stroke="#B6C3A9" strokeWidth={5}/><path d="M0 136V161" stroke={P.ink} strokeWidth={13}/><circle cy={164} r={14} fill="none" stroke={P.gold} strokeWidth={7}/></g>
 <path d={`M${ax+294} ${ay+171}Q${490-catchPull*30} ${621-plant*84} ${ropeX} ${ropeY}`} fill="none" stroke={P.ink} strokeWidth={15}/><path d={`M${ax+294} ${ay+167}Q${490-catchPull*30} ${617-plant*84} ${ropeX} ${ropeY-4}`} fill="none" stroke="#E5BA71" strokeWidth={7}/>
 {[0,1,2].map(i=>{let q=E(f,39+i*6,10);return <g key={i} opacity={f<34?0:E(f,34,5)}><Tool kind={i} f={f} at={43+i*6} x={614+(478-614)*q} y={270+i*113+rank*52-(i===0?leave*58:0)} scale={.94+q*.19} angle={(1-q)*(i-1)*18}/><Impact x={681} y={244+i*113} t={L(f,43+i*6,13)} color={[P.mint,P.blue,P.gold][i]}/></g>})}
 <g opacity={rank} transform={`translate(0 ${(1-rank)*250})`}><path d="M138 647L186 594H389L437 647V705H138Z" fill="#96703B" stroke={P.ink} strokeWidth={7}/><path d="M138 647H437L389 594H186Z" fill="#F6D586" stroke={P.ink} strokeWidth={6}/><path d="M162 668H413" stroke="#DCAF61" strokeWidth={5}/><T x={288} y={695} size={29}>TOP 1%</T></g>
 </Svg><Actor f={f} x={ax-leave*34} y={ay} size={331} angle={3+catchPull*16-plant*23-10*yank+rank*13} sx={1+H(f,36,12)*.06} sy={1-H(f,36,12)*.08} shock={f<25?.95:f<37?.4:0} cheer={rank} gaze={1}/><Svg style={{zIndex:50,pointerEvents:'none'}}><RankCrown x={ax+165} y={ay+47-110*(1-rank)} scale={rank*.68} angle={-8+rank*8} shine={L(f,82,16)}/><RankLaurel f={f-68} x={ax+165} y={ay+190}/><Impact x={ax+165} y={ay+39} t={L(f,81,13)}/></Svg></>};
// C: one packet completes a clamp -> visibility -> access relay. Each tool has
// a different action, and the result lifts Claude into the final rank reveal.
export const ToolRelay:React.FC<{f:number}>=({f})=>{let dash=E(f,0,4),select=E(f,3,8),compress=E(f,12,8),see=E(f,22,8),unlock=E(f,31,9),rank=E(f,73,10),exit=E(f,99,10);
 const launch=E(f,4,8),dock0=E(f,40,10),dock1=E(f,50,10),dock2=E(f,60,10);
 let px=306-dash*92+launch*214+see*200+unlock*159,py=373-H(f,4,13)*112+unlock*11;
 return <><Stage variant={0} claudeRotation={f*.3}/><Svg>
 {/* Vault has depth through drawn hinges and layered metal, all flat SVG. */}
 <path d="M135 585H912L971 642H76Z" fill="#9DAE91" stroke={P.ink} strokeWidth={6}/><path d="M82 642H965V688H82Z" fill="#23464B" stroke={P.ink} strokeWidth={7}/>{[0,1,2,3,4,5].map(i=><g key={i}><circle cx={138+i*148} cy={667} r={14} fill="#617E7A"/><path d={`M${128+i*148} 667h20`} stroke="#CDB984" strokeWidth={4}/></g>)}
 <path d="M835 276Q908 276 908 345V584H746V345Q746 276 819 276Z" fill="#19434D" stroke="#85AC9D" strokeWidth={9}/><path d="M766 347Q766 300 823 300Q885 300 885 347V581H766Z" fill="#091F32"/>
 <g transform={`translate(${unlock*132} 0)`}><path d="M779 321H872V576H779Z" fill="#D2A65F" stroke={P.ink} strokeWidth={6}/><path d="M793 339H856V559H793Z" fill="none" stroke="#FFE1A0" strokeWidth={4}/><circle cx={825} cy={467} r={25} fill="#E8C583" stroke={P.ink} strokeWidth={5}/><path d="M825 455v28" stroke={P.ink} strokeWidth={7}/></g>
 {Array.from({length:14},(_,i)=>{let q=E(f,6+(i%4),11);return <g key={i} opacity={(1-q)*.68} transform={`translate(${307+(i%7)*72+q*(i%2?130:-130)} ${199+Math.floor(i/7)*100-q*110}) rotate(${(i%4-1.5)*16+q*125}) scale(${.85-q*.27})`}><Plug color="#8BA8A1"/></g>})}
 {[0,1,2].map(i=>{const d=[dock0,dock1,dock2][i];return <Tool key={i} kind={i} f={f} at={[15,25,36][i]} x={239+i*221+(523-239-i*221)*d} y={346+(1-select)*48+(266+i*106-346)*d} scale={.87+d*.18} angle={i===2?unlock*85*(1-d):0}/>})}
 {[0,1,2].map(i=><Impact key={i} x={710} y={266+i*106} t={L(f,50+i*10,13)} color={[P.mint,P.blue,P.gold][i]}/>)}
 {/* Paper packet becomes compact, gains a visible instrument strip, then passes the gate. */}
 <g transform={`translate(${px} ${py}) rotate(${-24*dash*(1-launch)+launch*14-unlock*10}) scale(${2.25-compress*1.45})`} opacity={1-E(f,38,5)}><path d="M-69-43H71L89-25V43H-69Z" fill={P.paper} stroke={P.ink} strokeWidth={5}/><path d="M-52-23H48M-52-7H64M-52 9H22M-52 25H56" stroke="#53716D" strokeWidth={5}/>{see>0&&<g opacity={see}><path d="M-72 48H89V77H-72Z" fill={P.blue} stroke={P.ink} strokeWidth={4}/><path d="M-53 62H22M35 69V57M49 69V53M64 69V59" stroke={P.paper} strokeWidth={4}/></g>}</g>
 <path d={`M${343-dash*58} 521Q${320-dash*100} 478 ${px} ${py+36}`} stroke="#D8C18C" strokeWidth={8} fill="none" opacity={1-launch}/>
 <Impact x={398} y={365} t={L(f,16,13)} color={P.mint}/><Impact x={619} y={353} t={L(f,25,13)} color={P.blue}/><Impact x={824} y={437} t={L(f,38,13)} color={P.gold}/>
 <g opacity={rank} transform={`translate(0 ${(1-rank)*240})`}><path d="M403 623L464 558H669L731 623V706H403Z" fill="#A27335" stroke={P.ink} strokeWidth={7}/><path d="M403 623H731L669 558H464Z" fill="#F0CB75" stroke={P.ink} strokeWidth={6}/><T x={566} y={682} size={37}>TOP 1%</T><path d="M430 693H704" stroke="#E6BD67" strokeWidth={4}/></g>
 </Svg><Actor f={f} x={136+launch*111+see*46+unlock*34+dock0*20+dock1*21+dock2*21-exit*33} y={399-H(f,5,15)*73-H(f,24,18)*32-dock0*28-dock1*33-dock2*35-rank*26-H(f,75,13)*21} size={371-E(f,15,20)*40} angle={-dash*7+launch*18-unlock*16+rank*0} shock={f<23?.8:0} cheer={rank} gaze={1}/><Svg style={{zIndex:50,pointerEvents:'none'}}><RankCrown x={301+launch*111+see*46+unlock*34+dock0*20+dock1*21+dock2*21-exit*33} y={456-rank*144-(1-rank)*90} scale={rank*.7} angle={4-rank*9} shine={L(f,85,17)}/><Impact x={564} y={341} t={L(f,84,15)}/></Svg></>};
