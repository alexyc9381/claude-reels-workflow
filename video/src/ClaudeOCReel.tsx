import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame} from 'remotion';
import {Bg,Panel,ProgressBar,HookHeader,KaraokeCaption,Mascot} from './SlopKit';
import {inter} from './fonts';
import words from './data/words_oc.json';

export const TOTAL=596;
export const CUTS=[0,64,145,190,302,349,452,545,596];
const C={ink:'#172131',paper:'#FFF2D8',clay:'#D97757',purple:'#A57BC5',gold:'#F4BE56',red:'#DF655A',green:'#5EC99B'};
const tint=(a:string,b:string,t:number)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
const clamp=(v:number)=>Math.min(1,Math.max(0,v));
const smooth=(x:number)=>{x=clamp(x);return x*x*(3-2*x)};
const e=(f:number,a:number,b:number)=>smooth((f-a)/(b-a));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const bump=(f:number,at:number,amp=1)=>f<at?0:Math.sin((f-at)*.52)*Math.exp(-(f-at)/8)*amp;
type Pt=[number,number];
function path(f:number,keys:[number,number,number][]):Pt{
 if(f<=keys[0][0])return [keys[0][1],keys[0][2]];
 for(let i=1;i<keys.length;i++)if(f<=keys[i][0]){const q=e(f,keys[i-1][0],keys[i][0]);return [mix(keys[i-1][1],keys[i][1],q),mix(keys[i-1][2],keys[i][2],q)]}
 return [keys[keys.length-1][1],keys[keys.length-1][2]];
}
const logos=['claude.svg','openai.png','googlegemini.svg','qwen.svg','githubcopilot.svg','perplexity.svg','cursor.svg','ollama.svg'];
const brand=['#CE704E','#25343D','#6D89CF','#806ACA','#607CBA','#50949C','#3F4652','#88645A'];
const Mark=({x,y,i,s=74,r=0}:{x:number;y:number;i:number;s?:number;r?:number})=><g transform={`translate(${x} ${y}) rotate(${r})`}>
 <circle cy={5} r={s*.52} fill="#142334"/><circle r={s*.52} fill={brand[i%8]}/><circle r={s*.44} fill="#FFFCF6"/>
 <image href={staticFile('logos/'+logos[i%8])} x={-s*.31} y={-s*.31} width={s*.62} height={s*.62} preserveAspectRatio="xMidYMid meet"/>
 <path d={`M ${-s*.30} ${-s*.34} Q 0 ${-s*.5} ${s*.27} ${-s*.35}`} stroke="#fff" strokeWidth={3} fill="none"/>
</g>;
const Svg=({children}:{children:React.ReactNode})=><svg viewBox="0 0 1012 792" width="1012" height="792" style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
const Label=({x,y,text,color=C.paper,size=28}:{x:number;y:number;text:string;color?:string;size?:number})=><text x={x} y={y} textAnchor="middle" fill={color} fontFamily={inter.fontFamily} fontWeight={800} fontSize={size}>{text}</text>;

function Octopus({f,x=510,y=395,targets,scale=1,mood=0,markSize=70,visible=8,anger=0,tilt=0,squash=0,surprise=0,gaze=0}:{f:number;x?:number;y?:number;targets:Pt[];scale?:number;mood?:number;markSize?:number;visible?:number;anger?:number;tilt?:number;squash?:number;surprise?:number;gaze?:number}){
 const arms=targets.map(([tx,ty],i)=>{
  const side=tx<x?-1:1,root:Pt=[x+side*42*scale,y+58*scale];
  const bow=55*Math.sin((i+1)*1.4)+bump(f,10+i*7,25);
  const a:Pt=[root[0]+side*(170*scale),root[1]+110*scale+bow];
  const b:Pt=[tx-side*95*scale,ty+60*scale+bump(f,20+i*4,18)];
  const p=(t:number):Pt=>[(1-t)**3*root[0]+3*(1-t)**2*t*a[0]+3*(1-t)*t*t*b[0]+t**3*tx,(1-t)**3*root[1]+3*(1-t)**2*t*a[1]+3*(1-t)*t*t*b[1]+t**3*ty];
  const d=`M${root} C${a} ${b} ${[tx,ty]}`;
  return <g key={i}><path d={d} fill="none" stroke="#35243F" strokeWidth={(47-i%3*3)*scale} strokeLinecap="round" transform="translate(0 8)"/><path d={d} fill="none" stroke={tint(i%2?'#9566B2':'#B88BD1',i%2?'#C65550':'#E98065',anger)} strokeWidth={(40-i%3*3)*scale} strokeLinecap="round"/>
   <path d={d} fill="none" stroke={tint("#D6ABDE","#FFBE91",anger)} strokeWidth={7*scale} strokeLinecap="round"/>
   {Array.from({length:9},(_,j)=>{const t=(j+1)/11,[px,py]=p(t);return <g key={j}><ellipse cx={px} cy={py+8*scale} rx={(8-3*t)*scale} ry={(5-1.5*t)*scale} fill="#EAD0E7"/><ellipse cx={px} cy={py+9*scale} rx={3.5*scale} ry={2*scale} fill="#946798"/></g>})}
  </g>;
 });
 return <><Svg><defs><linearGradient id="octo-body" x1="0" y1="0" x2="1" y2="1"><stop stopColor={tint("#D1A2DB","#FFC38B",anger)}/><stop offset=".5" stopColor={tint("#AB77C1","#E46B51",anger)}/><stop offset="1" stopColor={tint("#714A91","#A63347",anger)}/></linearGradient></defs>
  {anger>.3&&<g>{[-1,1].map(side=><g key={side} transform={`translate(${x+side*100*scale} ${y-50*scale})`}>
   {[0,1,2].map(i=>{const t=((f+i*8)%28)/28;return <g key={i} transform={`translate(${side*(16+t*56)} ${-t*130}) scale(${(.48+t*.8)*scale})`} opacity={(1-t)*Math.min(1,anger*1.45)}><path d="M-31 10C-66-3-43-39-23-33C-24-65 14-70 29-48C59-54 76-19 51-5C71 22 30 45 10 26C-12 43-39 35-31 10Z" fill="#FFF1D6" stroke="#B79078" strokeWidth={4}/></g>})}
  </g>)}</g>}
  {arms}
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${scale*(1+squash)},${scale*(1-squash*.8)})`}>
   <ellipse cy={98} rx={100} ry={20} fill="#172337" opacity={.3}/>
   <path d="M-99 42 C-116 -58 -59 -127 0 -124 C74 -121 122 -59 103 43 Q80 114 0 101 Q-85 106 -99 42Z" fill="url(#octo-body)" stroke={tint("#634579","#873740",anger)} strokeWidth={5}/>
   <path d="M-75 -40 Q-57 -99 3 -102" stroke="#E5C4E7" strokeWidth={14} strokeLinecap="round" fill="none"/>
   <ellipse cx={-39} cy={5} rx={26} ry={32-mood*9+surprise*9} fill="#FFF2DC"/><ellipse cx={40} cy={5} rx={26} ry={32-mood*9+surprise*9} fill="#FFF2DC"/>
   <ellipse cx={-32+gaze} cy={7} rx={10} ry={17-mood*4+surprise*5} fill="#252136"/><ellipse cx={33+gaze} cy={7} rx={10} ry={17-mood*4+surprise*5} fill="#252136"/>
   <path d={mood>.4?'M-57 -29 L-21 -19 M21 -19 L57 -29':'M-54 -31 Q-38 -38 -24 -31 M24 -31 Q40 -38 54 -31'} stroke="#624173" strokeWidth={7} fill="none" strokeLinecap="round"/>
   {surprise>.3?<ellipse cy={55} rx={17+surprise*6} ry={19+surprise*8} fill="#552C43" stroke="#F2AD94" strokeWidth={4}/>:anger>.4?<g><path d="M-31 42Q0 30 33 42L26 64Q0 74-26 64Z" fill="#FFF2D8" stroke="#71353D" strokeWidth={5}/><path d="M-23 51H26M-8 40V66M9 40V66" stroke="#B77A69" strokeWidth={2}/></g>:<path d={mood>.4?'M-15 52 Q0 42 15 52':'M-20 43 Q0 64 21 43'} stroke="#4F355D" strokeWidth={6} fill="none" strokeLinecap="round"/>}
   {anger>.4&&<g opacity={anger}><path d="M44-87Q62-92 63-77M68-73Q68-58 80-56M46-76Q53-65 45-54" fill="none" stroke="#A93745" strokeWidth={7} strokeLinecap="round"/><path d="M-80 26L-65 31M-83 36L-68 41M71 29L87 22M72 40L90 32" stroke="#ED7C71" strokeWidth={5}/></g>}
   <ellipse cx={-68} cy={42} rx={13} ry={7} fill="#D799BC"/><ellipse cx={67} cy={42} rx={13} ry={7} fill="#D799BC"/>
  </g>
  {targets.slice(0,visible).map(([tx,ty],i)=><Mark key={i} x={tx} y={ty} i={i} s={markSize*(i<3?1.18:.83)} r={bump(f,12+i*7,8)}/>)}
 </Svg></>;
}

const palettes=[['#F6E2BD','#E7BFA2','#CAA18A','#533B48'],['#244E60','#0E2433','#356D79','#091621'],['#593856','#191524','#815168','#10131E'],['#254766','#101F34','#2B6583','#08141F'],['#806032','#392918','#AE8347','#211D20'],['#235F54','#17362F','#397E6D','#102723'],['#473A70','#17172D','#60548D','#0C101E'],['#376A68','#10292D','#5A8D7A','#0B1821']];
function Set({n,f}:{n:number;f:number}){
 const [light,dark,mid,floor]=palettes[n];
 return <Svg><defs><linearGradient id={'set'+n} x1="0" y1="0" x2=".8" y2="1"><stop stopColor={light}/><stop offset="1" stopColor={dark}/></linearGradient><linearGradient id={'ground'+n} x1="0" y1="0" x2="0" y2="1"><stop stopColor={mid}/><stop offset="1" stopColor={floor}/></linearGradient></defs>
 <rect width={1012} height={792} fill={`url(#set${n})`}/>
 <path d="M77 611V205Q506 -65 935 205V611" fill="none" stroke={mid} strokeWidth={46}/>
 <path d="M112 591V229Q506 -10 900 229V591" fill="none" stroke={n===0?'#FAEBCB':'#B59A6C'} strokeWidth={7}/>
 {Array.from({length:9},(_,i)=><g key={i}><path d={`M${60+i*113} 166V602`} stroke={dark} strokeWidth={8}/><circle cx={60+i*113} cy={182} r={5} fill={n===0?'#F9ECD4':'#A8956D'}/><circle cx={60+i*113} cy={584} r={5} fill="#B79C76"/></g>)}
 <path d={n%2?'M-50 274H210V207H830V280H1060':'M-30 310H126V184H888V304H1060'} stroke={floor} strokeWidth={23} fill="none"/>
 <path d={n%2?'M-50 268H210V201H830V274H1060':'M-30 304H126V178H888V298H1060'} stroke={mid} strokeWidth={9} fill="none"/>
 {n===1&&<g>{[0,1,2].map(i=><path key={i} d={`M20 ${520+i*34}Q506 ${400+i*42} 995 ${520+i*34}`} stroke="#16303B" strokeWidth={15} fill="none"/>)}</g>}
 {n===2&&<g><circle cx={65} cy={481} r={162} stroke="#151723" strokeWidth={48} fill="none"/><path d="M862 331H1030V604H862Z" fill="#251D31" stroke="#725268" strokeWidth={8}/>{[0,1,2].map(i=><path key={i} d={`M880 ${369+i*67}H1030`} stroke="#AD865A" strokeWidth={10}/>)}</g>}
 {n===3&&<g><path d="M32 536H162V359H32M843 626H1002V440H843" fill="#12283D" stroke="#396479" strokeWidth={10}/>{[0,1,2,3].map(i=><rect key={i} x={49+i*25} y={387-i%2*23} width={17} height={96+i%2*23} fill={i%2?'#91714C':'#538A87'}/>)}</g>}
 {n===5&&<g><path d="M20 197H201V506H20M823 190H1000V474H823" fill="#122F2C" stroke="#4E8B78" strokeWidth={12}/><path d="M108 197V506M823 334H1000" stroke="#83A792" strokeWidth={7}/><path d="M21 433L70 382L106 421L159 350L200 393V506H21Z" fill="#1B4940"/></g>}
 {n===6&&<g><path d="M28 190L145 262V628L28 735M984 190L870 262V628L984 735" stroke="#13182A" strokeWidth={55} fill="none"/><path d="M17 188H995" stroke="#A78F63" strokeWidth={18}/></g>}
 <path d="M130 70L690 645H80Z" fill={n===0?'#FFF5D9':'#E6C780'} opacity={n===0?.2:.08}/>
 <rect y={608} width={1012} height={184} fill={`url(#ground${n})`}/>
 <ellipse cx={510} cy={673} rx={407} ry={56} fill={n===0?'#D1B18E':'#101D2B'}/>
 <ellipse cx={510} cy={666} rx={388} ry={43} fill={mid}/>
 <path d="M0 729H1012" stroke={n===0?'#927463':'#101823'} strokeWidth={10}/>
 {Array.from({length:13},(_,i)=><path key={i} d={`M${i*85-80} 791L${480+(i-6)*38} 609`} stroke={n===0?'#B28C70':'#112631'} strokeWidth={3}/>)}
 <path d="M-20 795V691L92 673L128 795Z M1032 795V664L945 687L918 795Z" fill={n===0?'#59424A':floor}/>
 <path d="M-10 697L94 680M952 692L1030 670" stroke="#C49C62" strokeWidth={8}/>
 <g transform={`translate(${720+Math.min(f,70)*1.1} 148)`}><rect width={95} height={24} rx={7} fill="#282832"/><rect x={14} y={20} width={67} height={8} fill="#F1C36C"/></g>
 </Svg>;
}

function Actor({f,x,y,s=210,shock=0,stern=0,cheer=0,role='',rot=0,sx=1,sy=1,gaze=0}:{f:number;x:number;y:number;s?:number;shock?:number;stern?:number;cheer?:number;role?:string;rot?:number;sx?:number;sy?:number;gaze?:number}){
 return <div style={{position:'absolute',left:x-s/2,top:y-s*.88,width:s,height:s,transform:`rotate(${rot}deg) scale(${sx},${sy})`,transformOrigin:'50% 90%'}}><Mascot lf={f+17} size={s} nodAmp={0} gaze={gaze} shock={shock} stern={stern} cheer={cheer} {...{[role]:1}}/></div>;
}
function Burst({f,at,x,y,color=C.gold}:{f:number;at:number;x:number;y:number;color?:string}){
 const t=f-at;if(t<0||t>18)return null;
 return <g>{Array.from({length:7},(_,i)=>{const a=i*6.283/7;const r=14+t*4;return <path key={i} d={`M${x+Math.cos(a)*r} ${y+Math.sin(a)*r}l${Math.cos(a)*13} ${Math.sin(a)*13}`} stroke={color} strokeWidth={6*(1-t/20)} strokeLinecap="round"/>})}</g>
}
function App({x,y,w=280,h=205,progress=1,flaw=0}:{x:number;y:number;w?:number;h?:number;progress?:number;flaw?:number}){
 return <g transform={`translate(${x} ${y})`}><rect x={0} y={9} width={w} height={h} rx={17} fill="#102335"/><rect width={w} height={h} rx={17} fill="#FFF3D8" stroke="#AACAC1" strokeWidth={4}/><path d={`M0 27H${w}`} stroke="#C5D7D0" strokeWidth={3}/>
 {[0,1,2].map(i=><circle key={i} cx={17+i*15} cy={14} r={4} fill={['#D97757','#E4AE4E','#61A985'][i]}/>)}
 <rect x={18} y={45} width={w*.43} height={h*.43} rx={9} fill="#2C7981"/>
 <path d={`M35 ${h*.50}L61 ${h*.40}L89 ${h*.46}L${w*.41} ${h*.32}`} fill="none" stroke="#F0C761" strokeWidth={7}/>
 {[0,1,2].map(i=><g key={i} opacity={clamp(progress*3-i)}><rect x={w*.54} y={48+i*29} width={w*.36} height={12} rx={4} fill={i===1&&flaw?'#E76C5C':'#87AA9D'}/><rect x={22+i*w*.30} y={h*.73} width={w*.25} height={h*.16} rx={5} fill={['#DD9272','#D3B566','#639E96'][i]}/></g>)}
 {flaw>0&&<g transform={`translate(${w*.91} ${h*.34}) scale(${flaw})`}><circle r={27} fill="#D94B4D"/><path d="M0-13V4M0 11V14" stroke="#fff3df" strokeWidth={6}/></g>}
 </g>
}


function Gear({x,y,r=80,f=0,color='#DAB46B'}:{x:number;y:number;r?:number;f?:number;color?:string}){
 return <g transform={`translate(${x} ${y}) rotate(${f})`}><circle r={r*.86} fill={color} stroke="#453B37" strokeWidth={7}/>{Array.from({length:12},(_,i)=><path key={i} d={`M${-r*.13} ${-r*.85}L${-r*.1} ${-r*1.07}H${r*.1}L${r*.13} ${-r*.85}Z`} fill={color} stroke="#453B37" strokeWidth={4} transform={`rotate(${i*30})`}/>)}<circle r={r*.55} fill="#263F4A" stroke="#FADE9C" strokeWidth={5}/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M0 ${r*.15}V${r*.69}`} stroke={color} strokeWidth={r*.16} transform={`rotate(${i*60})`}/>)}<circle r={r*.19} fill="#C2824C" stroke="#F6D094" strokeWidth={5}/></g>
}
function Beetle({x,y,f=0,s=1,rot=0}:{x:number;y:number;f?:number;s?:number;rot?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
 {[-1,1].map(side=><g key={side}>{[0,1,2].map(i=><path key={i} d={`M${side*28} ${-27+i*30}Q${side*(65+Math.sin(f*.55+i)*8)} ${-46+i*40} ${side*79} ${-18+i*38+Math.sin(f*.5+i)*12}`} fill="none" stroke="#42233D" strokeWidth={10} strokeLinecap="round"/>)}</g>)}
 <ellipse cy={17} rx={49} ry={62} fill="#572841"/><path d="M0-43C-69-55-62 83 0 75Z" fill="#DD6259" stroke="#8D394B" strokeWidth={5}/><path d="M0-43C69-55 62 83 0 75Z" fill="#FA9372" stroke="#8D394B" strokeWidth={5}/><path d="M-19-25Q-42-4-30 19" fill="none" stroke="#FFD3A1" strokeWidth={10} strokeLinecap="round"/>
 <ellipse cy={-49} rx={36} ry={31} fill="#463047"/><path d="M-21-71Q-36-95-52-92M21-71Q36-95 52-92" stroke="#432E43" strokeWidth={6} fill="none"/><circle cx={-53} cy={-93} r={8} fill="#F9B672"/><circle cx={53} cy={-93} r={8} fill="#F9B672"/>
 <ellipse cx={-16} cy={-48} rx={11} ry={14} fill="#FFF7DA"/><ellipse cx={16} cy={-48} rx={11} ry={14} fill="#FFF7DA"/><circle cx={-14} cy={-48} r={5} fill="#292338"/><circle cx={14} cy={-48} r={5} fill="#292338"/>
 </g>
}
function Rocket({x,y,s=1,rot=0,open=0,flame=0,f=0}:{x:number;y:number;s?:number;rot?:number;open?:number;flame?:number;f?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
 {flame>0&&<g transform={`scale(1 ${flame})`}><path d={`M-55 151Q-90 246 0 ${285+Math.sin(f*1.3)*27}Q84 246 55 151Z`} fill="#E9734F"/><path d={`M-27 153Q-47 222 0 ${252+Math.sin(f*1.7)*14}Q46 215 27 153Z`} fill="#FFD576"/><path d="M-10 153L0 229L15 153" fill="#FFF5CF"/></g>}
 <path d="M-68 54Q-154 71-149 172L-69 130M68 54Q154 71 149 172L69 130" fill="#D67454" stroke="#783F45" strokeWidth={6}/><path d="M-128 150L-96 128M128 150L96 128" stroke="#F4B077" strokeWidth={6}/>
 <path d="M-67 130L-55 175H55L67 130Z" fill="#445167" stroke="#1A2B42" strokeWidth={7}/><path d="M-47 162H47" stroke="#A8BDC3" strokeWidth={8}/>
 <path d="M-73 130C-99 18-69-137 0-182C69-137 99 18 73 130Z" fill="#1E4254" stroke="#182D43" strokeWidth={8}/>
 <Gear x={0} y={21} r={46} f={f*5} color="#DFAE66"/><path d="M-44-60H36V91H-25" fill="none" stroke="#69BEB4" strokeWidth={15}/><path d="M-44-60H36V91H-25" fill="none" stroke="#B7E0CD" strokeWidth={4}/>
 <g transform={`translate(${-open*70} 0) rotate(${-open*27} -70 116)`}><path d="M0-182C-69-137-99 18-73 130H0Z" fill="#F4D6A0" stroke="#9C7963" strokeWidth={5}/><path d="M-48-45Q-61 20-51 78" fill="none" stroke="#FFF0C8" strokeWidth={14} strokeLinecap="round"/>{[-76,-24,35,92].map(v=><circle key={v} cx={-12} cy={v} r={4} fill="#AA785A"/>)}</g>
 <g transform={`translate(${open*70} 0) rotate(${open*27} 70 116)`}><path d="M0-182C69-137 99 18 73 130H0Z" fill="#D4B07E" stroke="#9C7963" strokeWidth={5}/>{[-76,-24,35,92].map(v=><circle key={v} cx={12} cy={v} r={4} fill="#AA785A"/>)}</g>
 <path d="M-49-125Q0-184 49-125Q27-177 0-197Q-29-177-49-125Z" fill="#DC7757" stroke="#8D4D46" strokeWidth={5}/>
 <g transform={`translate(0 ${-76-open*69}) scale(${1-open*.22})`}><circle r={49} fill="#F1C576" stroke="#765855" strokeWidth={6}/><circle r={38} fill="#1D4054"/><image href={staticFile('logos/claude.svg')} x={-27} y={-27} width={54} height={54}/><path d="M-27-19Q-15-33 5-33" stroke="#96D8D2" strokeWidth={4} fill="none"/></g>
 </g>
}
function Hammer({x,y,r=0,s=1}:{x:number;y:number;r?:number;s?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><path d="M-11 109L-16-53H16L11 109Q0 125-11 109Z" fill="#B3794F" stroke="#573D3B" strokeWidth={6}/><path d="M-12 69L12 65M-13 86L12 82" stroke="#E7BA76" strokeWidth={5}/><path d="M-68-79H11Q53-97 77-65L40-66L26-36H-68Z" fill="#7EADB5" stroke="#2B4C63" strokeWidth={7}/><path d="M-63-73H7" stroke="#D1E8DA" strokeWidth={8}/><path d="M-68-79H-79V-36H-68" fill="#4E778F"/></g>
}
function Glass({x,y,r=0,s=1}:{x:number;y:number;r?:number;s?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><path d="M32 40L98 128" stroke="#51423E" strokeWidth={29} strokeLinecap="round"/><path d="M41 54L93 125" stroke="#BA8352" strokeWidth={20} strokeLinecap="round"/><circle r={67} fill="#9DDFDA" fillOpacity={.27} stroke="#DDB76A" strokeWidth={16}/><circle r={56} fill="none" stroke="#FFDC92" strokeWidth={3}/><path d="M-41-16Q-25-50 9-43" fill="none" stroke="#D5FFF0" strokeWidth={9} strokeLinecap="round"/></g>
}
function Puff({f,at,x,y,s=1}:{f:number;at:number;x:number;y:number;s?:number}){
 const t=(f-at)/18;if(t<0||t>1)return null;return <g transform={`translate(${x} ${y}) scale(${s*(.4+t)})`} opacity={1-t}><path d="M-78 26C-127 2-96-64-61-47C-54-111 17-109 38-67C104-97 135-22 86 9C129 50 51 106 21 67C-11 100-89 76-78 26Z" fill="#FFE8BA" stroke="#D0AC8B" strokeWidth={3}/></g>
}

function Hook({f}:{f:number}){
 const duck=e(f,0,5)-e(f,9,14), leap=e(f,12,20)-e(f,23,32), hit=e(f,19,22)-e(f,29,37), rage=e(f,30,37);
 const l=path(f,[[0,371,408],[6,268,551],[12,430,401],[23,493,568],[31,383,466],[43,300,574],[50,410,626],[64,270,507]]);
 const r=path(f,[[0,891,338],[12,831,536],[21,477,570],[29,834,482],[42,784,627],[52,891,430],[64,829,363]]);
 const tips:Pt[]=[[677,211],l,r,path(f,[[0,189,335],[10,133,393],[26,240,373],[42,184,456],[64,206,338]]),[903,609-e(f,32,51)*48],[564-e(f,34,47)*27,700],[780,711-e(f,44,60)*33],[918-e(f,2,29)*43,237]];
 const cx=270+leap*130+(e(f,36,43)-e(f,48,57))*75;
 const oy=406+bump(f,21,-37)+bump(f,44,18);
 return <><Set n={0} f={f}/><Svg><path d="M63 654Q509 594 954 654" stroke="#96696B" strokeWidth={10} fill="none"/><path d="M66 674Q511 614 951 674" stroke="#FFE1B2" strokeWidth={5} fill="none"/></Svg>
 <div style={{position:'absolute',inset:0,transform:`scale(${1+e(f,0,24)*.045})`,transformOrigin:'55% 55%'}}>
 <Octopus f={f} x={654+bump(f,21,44)+bump(f,44,-22)} y={oy} targets={tips} scale={1.12} mood={1-hit} anger={.67+rage*.33-hit*.6} markSize={99} tilt={-8+bump(f,21,21)+bump(f,44,-12)} squash={bump(f,21,.13)} surprise={hit} gaze={-8}/>
 <Svg><Puff f={f} at={6} x={257} y={667} s={.58}/><Puff f={f} at={22} x={488} y={579} s={.74}/><Puff f={f} at={44} x={352} y={670} s={.66}/><Burst f={f} at={6} x={284} y={564}/><Burst f={f} at={21} x={478} y={568}/><Burst f={f} at={44} x={362} y={604}/>
 {f>30&&f<49&&<g transform={`translate(747 286) rotate(${bump(f,34,15)})`} opacity={Math.min(1,e(f,30,34)*2)}><path d="M-9-24V-3H12M-18 8H-1V28M23 8H42V-13" fill="none" stroke="#B94D4B" strokeWidth={9} strokeLinecap="round"/></g>}
 </Svg>
 <Actor f={f} x={cx} y={729+duck*25-leap*150-(e(f,40,45)-e(f,48,56))*72} s={267} shock={duck*.85} stern={1-duck} cheer={hit} rot={-duck*12+leap*22+bump(f,22,-13)} sx={1+duck*.25-leap*.05} sy={1-duck*.33+leap*.1} gaze={8}/>
 </div></>;
}

function Council({f}:{f:number}){
 const tug=(e(f,0,9)-e(f,13,20))-(e(f,20,29)-e(f,33,39));const unfold=e(f,39,53),blast=e(f,58,80);
 const tips:Pt[]=[[533,220],[233+tug*72,435],[794+tug*75,439],[133,550],[889,561],[306,703],[784,692],[883,247]];
 return <><Set n={1} f={f}/><Octopus f={f} x={534+tug*24+bump(f,42,-24)} y={329+bump(f,42,18)} targets={tips} scale={.79} mood={1-unfold} anger={.55*(1-unfold)} markSize={89} tilt={tug*8} surprise={e(f,39,45)-e(f,52,61)}/>
 <Svg><path d="M136 655L199 626H854L915 655V752H136Z" fill="#102332" stroke="#C1A572" strokeWidth={7}/><path d="M158 650H894" stroke="#EACF8C" strokeWidth={10}/>
 <g transform={`translate(${507+tug*65} ${515+unfold*55}) rotate(${tug*9+unfold*7}) scale(${1+Math.abs(tug)*.09} ${1-unfold*.6})`} opacity={1-blast}>
 <path d="M-233-90Q-178-135-174-67H186Q241-118 250-60L226 104Q195 145 176 91H-190Q-252 136-250 77Z" fill="#D4E4D2" stroke="#7BACAA" strokeWidth={7}/><path d="M-210-50Q-187-93-174-67M187-67Q224-85 225-52M-190 91Q-220 80-230 105" stroke="#F6F0D3" strokeWidth={10} fill="none"/>
 <g fill="none" stroke="#388192" strokeWidth={5}><path d="M0-43Q-46-13-45 61H45Q45-13 0-43ZM-44 26L-77 62H-43M44 26L77 62H43"/><circle cy={1} r={17}/><path d="M-142-28H-78M79-28H144M-143 8H-105M99 9H145M-128 49H-91"/><path d="M-164-57V73M164-57V73" strokeDasharray="5 10"/></g>
 </g>
 <g transform={`translate(${320+tug*70} 517) rotate(${30+tug*15})`} opacity={1-unfold}><path d="M-8-88H8V66L0 91L-8 66Z" fill="#E99A50" stroke="#754940" strokeWidth={4}/><path d="M0 91L-5 74H5Z" fill="#263D4D"/></g>
 <Rocket x={514+blast*153} y={547-blast*296} s={.28+unfold*.41} rot={blast*31+bump(f,52,-9)} open={0} flame={e(f,55,63)} f={f}/>
 <Puff f={f} at={58} x={527} y={647} s={1}/><Burst f={f} at={44} x={507} y={537}/>
 </Svg><Actor f={f} x={199+e(f,28,41)*92-e(f,60,76)*45} y={744-(e(f,39,46)-e(f,53,62))*49} s={253} role="suit" stern={1-unfold} cheer={unfold} gaze={8} rot={tug*-11+bump(f,59,-18)} shock={e(f,56,60)-e(f,66,72)}/></>;
}

function Plugin({f}:{f:number}){
 const seat=e(f,0,13),fan=e(f,13,34),lift=e(f,30,45);const dx=(1-seat)*155;
 const tips:Pt[]=[[586+dx,228],[820+fan*60,245-fan*25],[920,402],[715+fan*118,600],[593,647-lift*61],[447-fan*44,628-lift*30],[412-fan*66,473],[411-fan*86,274]];
 return <><Set n={2} f={f}/><Octopus f={f} x={626+dx-lift*50} y={447-lift*90+bump(f,13,21)} targets={tips} scale={.91} mood={1-seat} markSize={73}/><Svg>
 <rect x={108} y={213} width={349} height={113} rx={18} fill="#FFF2D8" stroke="#C9A86B" strokeWidth={5}/><image href={staticFile('logos/github.svg')} x={126} y={239} width={49} height={49}/><text x={193} y={251} fontFamily={inter.fontFamily} fill="#273246" fontSize={23} fontWeight={700}>nyldn /</text><text x={193} y={288} fontFamily={inter.fontFamily} fill="#273246" fontSize={25} fontWeight={850}>claude-octopus</text>
 <g transform={`translate(${bump(f,13,-13)} 0)`}><Gear x={218} y={487} r={106} f={seat*28} color="#C09358"/><circle cx={218} cy={487} r={77} fill="#B9864E" stroke="#F0CB8A" strokeWidth={6}/><circle cx={218} cy={487} r={59} fill="#202942"/><image href={staticFile('logos/claude.svg')} x={180} y={449} width={76} height={76}/></g>
 <g transform={`translate(${mix(525,332,seat)} 487)`}><path d="M0-39H71Q105 0 71 39H0Z" fill="#CD9C5C" stroke="#F3CA7C" strokeWidth={6}/><path d="M0-21H-30M0 21H-30" stroke="#EBE0BB" strokeWidth={12}/></g>
 {[0,1,2].map(i=><g key={i} transform={`translate(${388+i*57} ${559-e(f,16+i*5,23+i*5)*50})`} opacity={fan}><circle r={20} fill="#88C79D"/><path d="M-9 0L-1 8L11-9" stroke="#173F39" strokeWidth={5} fill="none"/></g>)}
 <Burst f={f} at={13} x={331} y={487}/></Svg><Actor f={f} x={189+e(f,0,13)*41-e(f,26,42)*30} y={743-(e(f,13,22)-e(f,29,44))*43} s={235} cheer={fan} role="constr" rot={bump(f,13,-15)} shock={(e(f,10,14)-e(f,19,27))*.8}/></>;
}

function Review({f}:{f:number}){
 const land=e(f,0,12),open=e(f,25,39),extract=e(f,49,68),catchBug=e(f,75,90),close=e(f,87,102),launch=e(f,102,112);
 const rocketX=470+bump(f,12,-14)+launch*63,rocketY=430+bump(f,12,34)-launch*132;
 const bp=path(f,[[0,480,441],[47,480,441],[60,540,392],[72,688,341],[84,737,406],[98,739,492],[112,733,478]]);
 const tips:Pt[]=[[828,228],path(f,[[0,155,300],[13,236,332],[27,349,338],[42,281,280],[70,227,310],[112,140,354]]),path(f,[[0,755,328],[14,671,373],[26,590,339],[41,651,277],[70,688,257],[112,649,242]]),[180,560],[869,582],[299,670],[739,621],[911,380]];
 return <><Set n={3} f={f}/><Octopus f={f} x={820+bump(f,36,18)} y={331} targets={tips} scale={.52} mood={extract*(1-catchBug)} anger={0} markSize={86} tilt={bump(f,65,-11)} gaze={-8}/>
 <Svg><path d="M304 680L334 585H597L644 680V738H304Z" fill="#173349" stroke="#7EB4B9" strokeWidth={7}/><path d="M337 605H598M350 629H605" stroke="#E3BF74" strokeWidth={7}/>
 <Rocket x={rocketX} y={rocketY-(1-land)*124} s={1.15} open={open*(1-close)} flame={launch} rot={bump(f,13,-7)+bump(f,39,4)+launch*15} f={f}/>
 <g transform={`translate(${mix(207,306,e(f,15,28))} ${mix(412,453,e(f,15,28))}) rotate(${-22+e(f,29,42)*45-e(f,44,55)*25})`}>
 <path d="M-10 94V-26Q-64-56-22-88L-21-48H22V-88Q66-55 12-26V94Z" fill="#97BCB9" stroke="#355B70" strokeWidth={7}/><path d="M-2 4V76" stroke="#DDE8CE" strokeWidth={5}/></g>
 {extract>0&&<Beetle x={bp[0]} y={bp[1]} f={f} s={.18+extract*.63} rot={bump(f,67,35)}/>}
 <g transform={`translate(${bp[0]+14} ${bp[1]-88})`} opacity={extract*(1-catchBug)}><path d="M-20-15Q0 22 20-15M0-3V-73" fill="none" stroke="#E6C582" strokeWidth={10}/></g>
 <Glass x={mix(725,739,catchBug)} y={mix(371,484,catchBug)} s={.84+catchBug*.32} r={-18+catchBug*35}/>
 <g opacity={catchBug}><path d="M659 437L803 531M659 464L783 548M688 425L818 499M702 425L671 517M737 420L704 546M775 432L742 554" stroke="#C1E4D7" strokeWidth={3}/></g>
 <Puff f={f} at={12} x={466} y={657} s={.7}/><Burst f={f} at={37} x={420} y={444}/><Burst f={f} at={64} x={557} y={351} color="#F89B70"/><Burst f={f} at={91} x={735} y={478} color="#96D3BD"/>
 <path d="M72 220H316" stroke="#D3BC86" strokeWidth={5}/><Label x={194} y={207} text="/octo:review" size={27}/>
 </Svg><Actor f={f} x={177+e(f,20,33)*76+e(f,71,88)*67} y={750-(e(f,62,69)-e(f,74,84))*72} s={264} role="glasses" stern={1-extract} shock={e(f,59,65)-e(f,76,83)} cheer={catchBug} rot={bump(f,13,-8)+bump(f,64,-17)} gaze={8}/></>;
}

function Choices({f}:{f:number}){
 const strike=e(f,0,10),recover=e(f,12,20),second=e(f,22,30),seat=e(f,30,35),unroll=e(f,10,40);
 const angle=mix(-37,43,strike)-recover*79+second*82;
 const sink=22*e(f,10,13)+23*e(f,30,33);
 const handX=415+e(f,22,29)*14,handY=610+sink*.12;
 const tips:Pt[]=[[842,211],[605,466+sink],path(f,[[0,726,563],[12,827,445],[25,900,358],[39,899,379],[47,894,391]])];
 return <><Svg><defs><linearGradient id="build-canyon" x2="0" y2="1"><stop stopColor="#7FAEA3"/><stop offset="1" stopColor="#173F43"/></linearGradient></defs><rect width={1012} height={792} fill="url(#build-canyon)"/>
 <path d="M0 386L166 266L291 357L448 178L653 371L831 260L1012 338V792H0Z" fill="#487970"/><path d="M0 501L253 388L385 441L582 351L801 451L1012 385V792H0Z" fill="#24584F"/>
 <path d="M0 697L582 661L548 733L483 754L456 792H0ZM872 524L1012 494V792H889L858 620Z" fill="#102E30" stroke="#547C68" strokeWidth={9}/><path d="M0 695L582 661M873 522L1012 492" stroke="#C2CE9D" strokeWidth={15}/>
 <path d="M92 791L164 733L228 750L255 792M982 792L958 668L1012 646" fill="#0D242B"/>
 <g transform={`translate(550 ${sink})`}><path d="M-31 475L-19 735L29 728L35 475Z" fill="#AE8055" stroke="#654A3D" strokeWidth={8}/><ellipse cy={475} rx={36} ry={16} fill="#D9B77A" stroke="#6A503F" strokeWidth={6}/><ellipse cy={475} rx={20} ry={8} fill="none" stroke="#A27F55" strokeWidth={3}/><path d="M-11 511L-4 577L-10 651M16 552L9 613L16 687" fill="none" stroke="#755D43" strokeWidth={6}/><path d="M-31 559Q0 575 34 555M-31 571Q0 586 34 567" fill="none" stroke="#E2C58B" strokeWidth={9}/></g>
 <path d="M901 526V368" stroke="#75523F" strokeWidth={20}/>
 <path d={`M573 ${563+sink}Q${630+unroll*120} ${621-unroll*109} ${573+unroll*328} ${563-unroll*172}`} fill="none" stroke="#DCC18B" strokeWidth={12}/>
 {Array.from({length:10},(_,i)=>{const t=e(f,10+i*2.2,18+i*2.2),x=590+i*31,y=610-i*16;return <g key={i} transform={`translate(${x} ${y+(1-t)*119}) rotate(${(1-t)*83})`} opacity={t}><path d="M-16-7L19-15L33 22L-7 33Z" fill={i%2?'#C39760':'#E1BF85'} stroke="#6E5641" strokeWidth={5}/><path d="M-7-62V6" stroke="#CBB17D" strokeWidth={6}/></g>})}
 <Puff f={f} at={10} x={548} y={491} s={.75}/><Puff f={f} at={30} x={549} y={516} s={.8}/><Burst f={f} at={10} x={550} y={491}/><Burst f={f} at={30} x={550} y={518}/>
 </Svg><Octopus f={f} x={841+bump(f,31,17)} y={333} targets={tips} scale={.56} markSize={76} visible={1} mood={.7*(1-seat)} tilt={bump(f,11,-7)} gaze={-7}/>
 <Actor f={f} x={279+second*14} y={727+bump(f,10,9)+bump(f,30,9)} s={310} role="constr" stern={1-seat} cheer={seat*.7} gaze={8} rot={-7*(1-strike)+bump(f,10,8)-recover*5+second*7}/>
 <Svg><g transform={`translate(${handX} ${handY}) rotate(${angle})`}><Hammer x={0} y={-111} s={1.22}/></g><path d="M20 786L117 733L182 792" fill="#142B2C"/></Svg></>;
}

function Architecture({f}:{f:number}){
 const load=e(f,0,23),snap=e(f,28,34),fall=e(f,34,49),strong=e(f,46,65),cross=e(f,65,95);
 const weightX=mix(254,535,load);const weightY=331+load*32+fall*540;const deploy=e(f,35,54);const roll=e(f,50,91);const ballX=mix(341,785,roll);const ballY=536-115*2*((ballX-227)/587)*(1-(ballX-227)/587)-80;
 const claude=path(f,[[0,158,523],[24,215,518],[33,227,514],[45,324,333],[55,520,377],[65,629,480],[84,818,514],[96,830,523],[103,832,516]]);
 const tips:Pt[]=[[805,230],[weightX,Math.min(weightY,837)],path(f,[[0,773,456],[41,773,456],[57,556,465],[70,637,475],[85,840,440],[103,880,382]]),[876,326],[916,584],[164,707],[755,717],[922,699]];
 return <div style={{position:"absolute",inset:0,transform:"scale(1.12)",transformOrigin:"50% 60%"}}><Svg><defs><linearGradient id="canyon" x2="0" y2="1"><stop stopColor="#84B0A7"/><stop offset="1" stopColor="#214D4E"/></linearGradient></defs><rect width={1012} height={792} fill="url(#canyon)"/><path d="M0 366L117 242L216 323L338 172L504 361L680 226L793 346L928 219L1012 296V792H0Z" fill="#507C73"/><path d="M0 432L201 363L387 517L545 422L734 499L901 333L1012 390V792H0Z" fill="#2B615B"/><path d="M0 507L235 526L255 603L209 635L174 792H0ZM802 510L1012 483V792H835L787 646L819 612Z" fill="#0F2A2B" stroke="#518074" strokeWidth={8}/><path d="M0 515L235 533M813 516L1012 491" stroke="#B1CBA6" strokeWidth={13}/><path d="M279 768Q493 690 770 774" stroke="#4D9A98" strokeWidth={35} fill="none"/>
 <path d="M202 516V308M814 515V302" stroke="#795A49" strokeWidth={20}/>
 <g opacity={1-e(f,65,75)} transform={`translate(0 ${fall*480}) rotate(${fall*14} 501 409)`}>
 <path d={`M209 332Q511 ${370+load*96} 813 327M209 407Q511 ${437+load*100} 813 402`} fill="none" stroke="#D1AE6E" strokeWidth={10}/>
 {Array.from({length:13},(_,i)=>{const x=224+i*47,q=i/12;const sag=Math.sin(q*Math.PI)*load*46;return <g key={i} transform={`translate(${x} ${405+Math.sin(q*Math.PI)*35+sag+fall*(i%3)*34}) rotate(${Math.sin(q*Math.PI)*load*9+fall*(i-6)*12})`}><path d="M-22 0L22-4L30 33L-15 39Z" fill={i%2?'#B78E58':'#D2AC70'} stroke="#614F3C" strokeWidth={4}/><path d="M-4-77V7" stroke="#CEB27F" strokeWidth={5}/></g>})}
 </g>
 <defs><clipPath id="bridge-left"><rect x="200" y="380" width="315" height="260"/></clipPath><clipPath id="bridge-right"><rect x="514" y="380" width="320" height="260"/></clipPath></defs>
 {[0,1].map(side=><g key={side} transform={`rotate(${(1-deploy)*(side?82:-82)} ${side?814:227} 540)`}><g clipPath={`url(#bridge-${side?'right':'left'})`}>
 <path d="M227 542Q516 427 814 535L807 609Q515 517 232 615Z" fill="#C1BE95" stroke="#4F7363" strokeWidth={9}/><path d="M247 586Q519 507 789 582" fill="none" stroke="#E4CFA0" strokeWidth={15}/>
 {[0,1,2,3,4,5,6,7,8].map(i=>{const q=i/8;return <g key={i}><path d={`M${245+i*68} ${545-Math.sin(q*Math.PI)*58}L${248+i*68} ${607-Math.sin(q*Math.PI)*41}`} stroke="#597D69" strokeWidth={6}/><circle cx={250+i*68} cy={554-Math.sin(q*Math.PI)*48} r={6} fill="#F6E2AB"/></g>})}
 </g></g>)}
 <Gear x={228} y={552} r={41} f={deploy*100} color="#BDA16A"/><Gear x={813} y={547} r={41} f={-deploy*100} color="#BDA16A"/>

 <path d="M263 577V716M744 577V710" stroke="#385F50" strokeWidth={25}/>
 <path d="M-15 790L74 718L132 792M887 792L950 692L1025 755" fill="#112E30"/>
 </Svg><Octopus f={f} x={887} y={294} targets={tips.slice(0,3)} scale={.43} markSize={72} visible={1} mood={snap*(1-strong)} surprise={snap*(1-strong)} gaze={-7}/>
 <Svg><g><circle cx={weightX} cy={weightY+5} r={100} fill="#314F58" stroke="#18343B" strokeWidth={8}/><path d={`M${weightX-71} ${weightY-53}Q${weightX-26} ${weightY-110} ${weightX+27} ${weightY-84}`} fill="none" stroke="#AFC4B7" strokeWidth={13} strokeLinecap="round"/><Mark x={weightX} y={weightY} i={1} s={140}/></g>
 <g opacity={e(f,48,53)} transform={`translate(${ballX} ${ballY}) rotate(${roll*220})`}><circle cy={4} r={82} fill="#CEAB67" stroke="#7C7050" strokeWidth={8}/><path d="M-62-44Q-21-89 32-63" stroke="#F5D99A" strokeWidth={13} fill="none" strokeLinecap="round"/><Mark x={0} y={0} i={2} s={112} r={-roll*220}/></g>
 <g transform={`translate(${578+fall*27} ${435+fall*304}) rotate(${fall*75})`} opacity={snap*(1-e(f,44,53))}><path d="M-31-20L-9 7L7-24L31 11" fill="none" stroke="#F2D3A0" strokeWidth={9}/></g>
 <Puff f={f} at={54} x={517} y={529} s={.8}/><Puff f={f} at={33} x={521} y={477} s={.8}/><Puff f={f} at={65} x={553} y={495} s={.55}/><Burst f={f} at={33} x={520} y={443}/><Burst f={f} at={96} x={814} y={590} color="#B7E0A1"/>
 <path d="M794 532V356" stroke="#D5C39A" strokeWidth={9}/><path d={`M795 356Q846 ${343+bump(f,93,16)} 878 364L847 400L795 393Z`} fill="#F3C56D" stroke="#BE9456" strokeWidth={4}/><path d="M815 375L828 386L849 366" fill="none" stroke="#416D5B" strokeWidth={7} opacity={cross}/>
 <Label x={475} y={210} text="/octo:debate" size={29}/>
 </Svg><Actor f={f} x={claude[0]} y={claude[1]+bump(f,54,12)} s={283} role="constr" stern={1-snap} shock={snap*(1-strong)} cheer={cross} gaze={6} rot={bump(f,34,-19)+(e(f,36,45)-e(f,48,56))*21+bump(f,96,9)} sx={1+bump(f,54,.1)} sy={1-bump(f,54,.1)}/></div>;
}

function Sparks({f,at,x,y,dir=0}:{f:number;at:number;x:number;y:number;dir?:number}){
 const t=f-at;if(t<0||t>17)return null;return <g>{Array.from({length:13},(_,i)=>{const a=dir+(i-6)*.24,dist=(9+t*8)*(1+(i%3)*.2),px=x+Math.cos(a)*dist,py=y+Math.sin(a)*dist+t*t*.22;return <path key={i} d={`M${px} ${py}l${Math.cos(a)*(26-t*.7)} ${Math.sin(a)*(26-t*.7)}`} stroke={i%3?'#FFB44E':'#FF554C'} strokeWidth={Math.max(2,8-t*.29)} strokeLinecap="round" opacity={1-t/19}/>})}</g>
}

function Ram({x,y,i,r=0}:{x:number;y:number;i:number;r?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-68-84H62L94-51V55L63 84H-64L-94 54V-52Z" fill="#617D8E" stroke="#1C3346" strokeWidth={8}/><path d="M-62-73H56L78-49M-79-45V43" fill="none" stroke="#C5D5CA" strokeWidth={10}/><path d="M-63 74H58L79 49" fill="none" stroke="#345065" strokeWidth={9}/><Mark x={0} y={0} i={i} s={127}/>{[-1,1].map(side=><g key={side}><circle cx={side*67} cy={-53} r={6} fill="#D2E1D2"/><circle cx={side*67} cy={53} r={6} fill="#D2E1D2"/></g>)}</g>
}

function Security({f}:{f:number}){
 const first=e(f,12,17),crack=e(f,33,39),broken=e(f,52,57),scatter=e(f,53,77),alarm=e(f,52,55);
 const l=path(f,[[0,169,394],[6,124,411],[12,359,477],[19,190,421],[39,148,410],[45,120,433],[52,380,495],[62,146,477],[93,194,514]]);
 const r=path(f,[[0,869,379],[21,899,362],[26,928,388],[33,667,458],[42,894,391],[60,864,386],[93,884,471]]);
 const tips:Pt[]=[[509,188],l,r,[788,234],[190,645],[889,663]];
 const dx=bump(f,12,48)+bump(f,33,-55)+bump(f,52,29), tilt=bump(f,12,11)+bump(f,33,-14)+bump(f,52,9);
 const shape=<><path d="M-173-139Q0-197 173-139V64Q110 199 0 228Q-112 197-173 64Z" fill="#6687AD" stroke="#CAD3DA" strokeWidth={12}/><path d="M-143-116Q0-160 143-116V54Q88 166 0 191Q-91 161-143 54Z" fill="#284764" stroke="#7FADB9" strokeWidth={7}/><path d="M-123-97Q0-136 121-97" stroke="#BAD5D5" strokeWidth={5} fill="none"/>{[-1,1].map(side=><g key={side}>{[-81,-12,57].map(y=><circle key={y} cx={side*154} cy={y} r={6} fill="#E5D8B5"/>)}</g>)}</>;
 const clips=['-200,-220 0,-220 4,-77 -31,-39 17,11 -19,61 -200,91','0,-220 200,-220 200,69 31,45 17,11 -31,-39 4,-77','-200,91 -19,61 17,11 27,111 0,260 -200,260','17,11 31,45 200,69 200,260 0,260 27,111'];
 return <><Set n={6} f={f}/><Svg><path d="M124 727L223 666H811L906 727V792H124Z" fill="#101B2B" stroke="#556171" strokeWidth={9}/><path d="M319 718V627M696 718V627" stroke="#668292" strokeWidth={23}/>
 <g opacity={alarm}><path d={`M887 252L${488+Math.sin((f-53)*.14)*480} 727L${876+Math.sin((f-53)*.14)*300} 727Z`} fill="#FF474F" opacity={.15}/><path d="M27 238H159V631M846 631V238H987" stroke="#E5464A" strokeWidth={10} fill="none" opacity={.5+.3*Math.sin(f*.18)}/></g>
 </Svg><Octopus f={f} x={514+dx*.27} y={281} targets={tips} scale={.57} markSize={72} visible={1} mood={1} anger={.35+crack*.35} squash={bump(f,12,.07)+bump(f,33,.07)} tilt={tilt*.5} gaze={0}/>
 <Svg><defs>{clips.map((pts,i)=><clipPath id={'shield-fragment-'+i} key={i}><polygon points={pts}/></clipPath>)}</defs>
 <g transform={`translate(${514+dx} ${471+first*10+crack*8}) rotate(${tilt}) scale(${1-first*.04},${1+first*.025})`}>
 {clips.map((_,i)=>{const sx=i%2?1:-1,sy=i>1?1:-1;return <g key={i} transform={`translate(${sx*scatter*(107+i*19)} ${sy*scatter*57+scatter*scatter*143}) rotate(${sx*scatter*(22+i*7)} ${sx*90} ${sy*65})`} opacity={1-e(f,81,93)*.4}><g clipPath={`url(#shield-fragment-${i})`}>{shape}</g></g>})}
 <path d="M-176-39L-141-31L-154-7L-116 5" stroke="#EF966B" strokeWidth={10} fill="none" opacity={first*(1-broken)}/>
 <path d="M-174-34L-94-13L-120 22L-43 10L-19 61L17 11L-31-39L4-77V-167M17 11L83 7L66 54L173 62M17 11L27 111L0 222" stroke="#D24748" strokeWidth={12} fill="none" strokeDasharray={700} strokeDashoffset={700*(1-crack)} opacity={1-broken}/><path d="M-174-34L-94-13L-120 22L-43 10L-19 61L17 11L-31-39L4-77V-167" stroke="#FFC17C" strokeWidth={4} fill="none" opacity={crack*(1-broken)}/>
 <g transform={`translate(${-broken*34} ${broken*88}) rotate(${-broken*19})`}>
 <path d="M-48-25V-71A48 48 0 0 1 48-71V-25" stroke="#F5CA72" strokeWidth={22} fill="none" transform={`rotate(${-broken*57} -48 -25)`}/><path d="M48-25L60-48L44-59" stroke="#F4DDA2" strokeWidth={10} fill="none" opacity={broken}/><path d="M-70-25H70Q82-25 82-13V86Q82 99 68 99H-68Q-82 99-82 86V-13Q-82-25-70-25Z" fill="#D9974E" stroke="#FFE1A1" strokeWidth={6}/><path d="M-64-14H64" stroke="#FFE5A9" strokeWidth={7}/><circle cy={27} r={15} fill="#69503F"/><path d="M0 36V63" stroke="#69503F" strokeWidth={13}/>
 </g></g>
 <Ram x={l[0]} y={l[1]} i={1} r={bump(f,12,-16)+bump(f,52,-22)}/><Ram x={r[0]} y={r[1]} i={2} r={bump(f,33,18)}/>
 <Sparks f={f} at={12} x={384} y={463} dir={-.8}/><Sparks f={f} at={33} x={644} y={460} dir={-2.3}/><Sparks f={f} at={52} x={458} y={488} dir={-.9}/><Sparks f={f} at={58} x={543} y={494} dir={-2.6}/>
 <Puff f={f} at={12} x={394} y={490} s={.6}/><Puff f={f} at={33} x={638} y={489} s={.6}/><Puff f={f} at={52} x={519} y={496} s={1.05}/>
 <g transform="translate(887 223)"><path d="M-48 25V-6Q-48-68 0-68Q48-68 48-6V25Z" fill={alarm?'#C72E42':'#683943'} stroke="#F39B80" strokeWidth={6}/><path d="M-32-10Q-31-45-9-46" stroke="#FFD3A0" strokeWidth={9} strokeLinecap="round" fill="none"/><path d="M-61 26H61V43H-61Z" fill="#354654" stroke="#83948E" strokeWidth={5}/><ellipse cy={-8} rx={24} ry={37} fill="#FFB667" opacity={alarm*(.3+.5*Math.max(0,Math.sin((f-53)*.3)))}/></g>
 <Beetle x={519+e(f,61,89)*83} y={510-e(f,61,89)*154} s={e(f,61,74)*.76} f={f} rot={bump(f,74,16)}/>
 <Glass x={mix(796,664,e(f,74,93))} y={mix(669,463,e(f,74,93))} r={-26} s={.8}/>
 </Svg><Actor f={f} x={178-e(f,12,17)*39+e(f,65,91)*142} y={747-(e(f,51,57)-e(f,64,74))*78} s={266} role="cop" stern={1-crack} shock={e(f,32,38)-e(f,69,79)} cheer={0} gaze={8} rot={bump(f,12,-10)+bump(f,33,-16)+bump(f,53,-21)}/></>;
}

function CTA({f}:{f:number}){
 const board=e(f,0,19),kick=e(f,23,30),launch=e(f,33,50),reveal=e(f,37,42);
 const rx=568+launch*178,ry=551-launch*155,rr=-12+launch*44;const bx=309+launch*24,by=647;
 const ax=mix(224,rx-124,board),ay=mix(735,ry+143,board)-Math.sin(board*Math.PI)*104;
 const tips:Pt[]=[[841+e(f,31,49)*64,212-e(f,33,49)*35],path(f,[[0,444,501],[12,579,564],[24,688,574],[30,675,596],[40,880,528],[51,904,527]]),[925,352]];
 return <><Set n={7} f={f}/><Octopus f={f} x={844+bump(f,29,20)+e(f,31,49)*64} y={364-e(f,33,49)*35} targets={tips} scale={.54} markSize={73} visible={1} mood={1-kick} tilt={bump(f,29,-12)} surprise={e(f,28,31)-e(f,35,41)} gaze={-7}/>
 <Svg><path d="M419 735L452 652H708L751 735V792H419Z" fill="#17373C" stroke="#729A8C" strokeWidth={8}/><path d="M444 722H729" stroke="#E1BA75" strokeWidth={12}/>
 <Rocket x={rx} y={ry+bump(f,29,18)} s={.87} rot={rr} flame={e(f,29,36)} f={f}/>
 <path d={`M${ax+69} ${ay-125}Q${ax+145} ${ay-97} ${rx-39} ${ry+87}`} stroke="#D3B574" strokeWidth={9} fill="none"/>
 <g transform={`translate(${mix(441,ax+111,board)} ${mix(484,ay-104,board)}) rotate(${-18+board*10+launch*22})`}>
 <path d="M-72-64Q-46-89-39-54H70Q94-77 106-56L89 57Q69 77 59 52H-61Q-90 74-100 52Z" fill="#E9D7A1" stroke="#A68B5A" strokeWidth={6}/><path d="M-81-40Q-56-68-39-54M59 52Q78 51 84 69" stroke="#FFF3C7" strokeWidth={8} fill="none"/><g transform="rotate(-23)"><rect x={-43} y={-21} width={54} height={33} rx={16} fill="none" stroke="#438877" strokeWidth={9}/><rect x={-4} y={-3} width={54} height={33} rx={16} fill="none" stroke="#438877" strokeWidth={9}/></g></g>
 <Puff f={f} at={17} x={426} y={717} s={.55}/><Puff f={f} at={29} x={585} y={713} s={.78}/><Puff f={f} at={36} x={586} y={714} s={1.1}/><Burst f={f} at={29} x={677} y={603}/>
 </Svg><Actor f={f} x={ax} y={ay+bump(f,29,-12)} s={252-board*29} role="suit" stern={1-kick} shock={e(f,27,30)-e(f,34,38)} cheer={launch} gaze={7} rot={-board*13+launch*29+bump(f,29,-11)}/>
 {f>=37&&<Svg><g transform={`translate(${bx} ${by}) rotate(${-8+launch*7}) scale(1 ${.78+reveal*.22})`}><path d="M-192-69Q-93-99 10-69Q103-41 188-79L172 102Q73 125-16 95Q-97 65-195 103Z" fill="#FFF0CA" stroke="#C69B63" strokeWidth={6}/><path d="M-179-59Q-91-82-13-62" stroke="#FFF9DF" strokeWidth={12} fill="none"/><Label x={-1} y={52} text="OC" color="#B45C40" size={132}/><path d={`M180-47Q240-72 ${rx-70-bx} ${ry+100-by}`} fill="none" stroke="#D9BC7D" strokeWidth={8}/></g></Svg>}
 </>;
}

const scenes=[Hook,Council,Plugin,Review,Choices,Architecture,Security,CTA];
const heads=[['AI ARGUING =','10X OUTPUT'],['TURN DISAGREEMENT','INTO BETTER WORK'],['THE OCTOPUS','PLUGIN'],['CHALLENGE THE WORK','BEFORE YOU SHIP'],['PUT IT','TO WORK'],['COMPARE BEFORE','YOU BUILD'],['FIND THE FLAWS','BEFORE YOU LAUNCH'],['FREE LINK + SETUP','COMMENT OC']];
export const OCReel=()=>{
 const frame=useCurrentFrame();let n=0;for(let i=1;i<8;i++)if(frame>=CUTS[i])n=i;
 const Scene=scenes[n],f=frame-CUTS[n];
 const lateOC=frame>=582;const captionWords=lateOC?words:words.slice(0,-1);const head=n===7&&!lateOC?["GET THE","FREE SETUP"]:heads[n];
 return <AbsoluteFill><div style={{position:"absolute",width:1,height:1,opacity:0,pointerEvents:"none"}}>{[...logos,"github.svg"].map(src=><Img key={src} src={staticFile("logos/"+src)} style={{width:1,height:1}}/>)}</div><Bg/><Panel><Scene f={f}/></Panel><ProgressBar/><HookHeader big={head[0]} hot={head[1]} f={n===0?frame+18:f+18}/><KaraokeCaption words={captionWords}/><Audio src={staticFile('oc_mix.wav')}/></AbsoluteFill>;
};
