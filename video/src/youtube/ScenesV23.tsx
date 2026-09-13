import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Actor,Glass,Logo,Key,C,clamp,lerp,visible} from './YouTubeV8Primitives';
import {easeInOut as e,easeOut} from './glass-motion';
import {bodyFont} from './cinematic-brand';
import {CursorV13} from './ScenesV13';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const Text:React.FC<{x:number;y:number;size?:number;children:React.ReactNode;color?:string}>=({x,y,size=36,children,color=C.ink})=><At x={x} y={y} style={{fontFamily:bodyFont,fontWeight:800,fontSize:size,color,whiteSpace:'nowrap',lineHeight:1.15}}>{children}</At>;

/** Representative real model/provider marks, not an exhaustive support claim. */
export const modelMarksV23=[
 {name:'Seedance',src:'v3/seedance.png'}, {name:'Veo',src:'v3/google.png'},
 {name:'Hailuo',src:'v3/hailuo.png'}, {name:'Kling',src:'v9/kling-v23.png'},
 {name:'Runway',src:'v9/runway-v23.svg'},
];
export const ModelLineupV23:React.FC<{t:number;at:number}>=({t,at})=>{
 const u=t-at;
 return <div data-model-lineup style={{position:'absolute',left:210,top:254,width:1490,height:160,opacity:easeOut(u,0,.14),fontFamily:bodyFont}}>
  {modelMarksV23.map((m,i)=>{const p=easeOut(u,i*.065,.26);return <div key={m.name} style={{position:'absolute',left:100+i*279,top:0,width:174,height:158,textAlign:'center',transform:`translateY(${28*(1-p)}px) scale(${.85+.15*p})`,opacity:p}}>
   <div style={{margin:'0 auto',width:103,height:103,borderRadius:25,background:m.name==='Seedance'?'#AF4D1D':'#FFF9EC',border:'3px solid #FFFDF5',boxShadow:'0 8px 15px #49351F25',display:'grid',placeItems:'center'}}><Img src={staticFile(m.src)} style={{width:76,height:76,objectFit:'contain'}}/></div>
   <div style={{marginTop:9,fontSize:29,fontWeight:800,color:'#24382F'}}>{m.name}</div>
  </div>;})}
 </div>;
};

/** One output becomes a growing contact sheet. Cells are tiny video scenes,
 * not an exact benchmark: the narrator's qualitative 'hundreds' owns the label. */
export const HundredsV23:React.FC<{t:number;at:number}>=({t,at})=>{
 const u=t-at,p=e(u,0,.5),growth=clamp((u-.35)/3.8),count=Math.round(1+239*growth);
 return <At x={1141} y={307} style={{opacity:p,transform:`translateY(${45*(1-p)}px) scale(.82)`,transformOrigin:'top left',fontFamily:bodyFont}}>
  <div style={{width:740,height:390,borderRadius:29,background:'#FFF6DF',border:'4px solid #FFFEF3',boxShadow:'0 22px 32px #30482D30',overflow:'hidden'}}>
   <Text x={25} y={20} size={37} color="#2E6755">Hundreds of videos</Text>
   <div style={{position:'absolute',left:25,top:82,width:690,height:283,overflow:'hidden',borderRadius:13,background:'#36594E'}}>
    <svg data-generated-video-count={count} width="690" height="283" viewBox="0 0 690 283">
     {Array.from({length:240},(_,i)=>{const q=easeOut(u,.35+i/239*3.8,.2),col=i%20,row=Math.floor(i/20),hues=['#739C91','#C5975B','#7189A2','#AC8766'];return <g key={i} opacity={q} transform={`translate(${col*34.5} ${row*23.6+13*(1-q)})`}>
      <rect x="2" y="2" width="30" height="19" rx="2.5" fill={hues[i%4]}/><path d="M3 18L9 9L14 15L21 6L30 18Z" fill="#203E3970"/><path d="M14 7L21 11.5L14 16Z" fill="#FFF4DB"/>
     </g>;})}
    </svg>
   </div>
  </div>
 </At>;
};

/** All fields are synthetic. The recorded credential surface remains
 * completely covered throughout, including transitions and the save beat. */
export const CredentialV23:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),settings=e(t,.5,.55),open=e(t,5,.55),add=e(t,8.65,.25),create=e(t,11.7,.35),copy=e(t,13.05,.4),store=e(t,14.25,.9),finish=e(t,16,.9);
 const step=t<8.65?0:t<13.05?1:t<14.25?2:3;
 const move=e(t,13.5,.72),payloadX=lerp(874,1100,move),payloadY=lerp(458,825,move)-Math.sin(move*Math.PI)*94;
 return <AbsoluteFill data-credential-sequence="v23" style={{fontFamily:bodyFont,opacity:visible(t,duration)}}>
  <Glass x={125} y={86} w={1125} h={102} t={t} frost={.94}>
   <svg width="54" height="62" style={{position:'absolute',left:22,top:17}} viewBox="0 0 54 62"><path d="M13 28V17a14 14 0 0 1 28 0v11" fill="none" stroke="#386B59" strokeWidth="5"/><rect x="5" y="26" width="44" height="32" rx="8" fill="#386B59"/><path d="M27 37V46" stroke="#FFF5D9" strokeWidth="5"/></svg>
   <Text x={91} y={23} size={38}>Real API key hidden for privacy</Text>
  </Glass>
  <At x={147} y={212}>{['Open API keys','Create','Copy','Keep private'].map((label,i)=><At key={label} x={i*281} y={0}>
   <svg width="42" height="42"><circle cx="21" cy="21" r="19" fill={i<=step?'#386B59':'#CDBF9F'}/><text x="21" y="29" textAnchor="middle" fill="#FFF9ED" fontFamily={bodyFont} fontWeight="850" fontSize="24">{i+1}</text></svg><Text x={54} y={7} size={25} color={i===step?'#82390F':'#475B4F'}>{label}</Text>
  </At>)}</At>
  <Glass x={126} y={289} w={1125} h={431} t={t} frost={.91}>
   <At x={29} y={25}><Logo name="fal.png" size={55}/></At><Text x={103} y={31} size={35}>fal.ai</Text>
   <div style={{position:'absolute',left:27,top:104,width:224,height:288,borderRadius:19,background:'#E6E7D3'}}>
    {['Settings','API keys'].map((v,i)=><div key={v} style={{position:'absolute',left:10,top:25+i*89,width:204,height:70,borderRadius:13,background:(i===0?settings*(1-open):open)>.5?'#FFF9EA':'transparent'}}><Text x={17} y={21} size={28}>{v}</Text></div>)}
   </div>
   <div style={{position:'absolute',left:284,top:107,width:803,height:282,overflow:'hidden'}}>
    <Text x={18} y={8} size={38}>{open>.5?'API keys':'Settings'}</Text>
    <div style={{position:'absolute',left:20,top:76,width:753,height:146,borderRadius:20,background:'#FFF9EC',border:'2px solid #D1C5AC',transform:`translateY(${28*(1-open)}px)`,opacity:open}}>
     <Text x={20} y={29} size={29}>{create>.6?'••••  ••••  ••••':add>.8?'My video workflow'.slice(0,Math.floor(e(t,9.2,1.25)*17)):'Name your key'}</Text>
     <div style={{position:'absolute',left:20,top:90,width:405,height:6,borderRadius:4,background:'#D7CCAF',transform:`scaleX(${e(t,9.2,1.25)})`,transformOrigin:'left'}}/>
     <div style={{position:'absolute',right:19,top:29,width:242,height:83,borderRadius:19,background:copy>.8?'#386B59':'#AA501E',boxShadow:'0 7px 0 #D6B88D',transform:`scale(${1-.07*Math.sin((t<11?add:t<13?create:copy)*Math.PI)})`,display:'grid',placeItems:'center',fontSize:32,fontWeight:850,color:'#FFF9EB'}}>{copy>.8?'Copied':create>.8?'Copy key':add>.8?'Create key':'+ Add key'}</div>
    </div>
   </div>
   <CursorV13 x={t<4?lerp(690,84,settings):t<8?lerp(84,94,open):lerp(94,905,add)} y={t<4?lerp(350,163,settings):t<8?lerp(163,252,open):lerp(252,276,add)} press={t<11?add:t<13?create:copy} scale={1.15}/>
  </Glass>
  <Actor t={t} x={827+move*50-finish*20} y={745} size={221} role="courier" look={1} walk={Math.sin(move*Math.PI)+Math.sin(finish*Math.PI)} reach={copy} lift={copy*(1-store*.5)} contact={15.15} happy={store>.8}/>
  <At x={1042+move*50-finish*20} y={820} style={{opacity:e(t,13,.45),transform:'scale(.68)',transformOrigin:'top left'}}><svg width="232" height="150" viewBox="0 0 232 150"><path d="M8 39V12H89L107 34H220V140H8Z" fill="#E1B777" stroke="#FFF5DB" strokeWidth="4"/><path d="M9 54H219V140H9Z" fill="#EAC996" stroke="#A5804A" strokeWidth="3"/><g transform={`translate(94 ${39-12*(1-store)})`}><path d="M8 28V12a16 16 0 0 1 32 0v16" stroke="#386B59" strokeWidth="6" fill="none"/><rect y="25" width="48" height="44" rx="9" fill="#386B59"/><path d="M24 38V51" stroke="#FFF8DF" strokeWidth="5"/></g></svg></At>
  <At x={payloadX} y={payloadY} style={{opacity:copy*(1-store),transform:`rotate(${-8+move*12}deg) scale(${1-.25*move})`}}><Key t={t} size={126}/></At>
  <Text x={153} y={791} size={42} color="#386B59">{store>.8?'Copied. Stored privately.':'Create → copy → keep safe'}</Text>
  <Text x={155} y={858} size={28}>Illustration only · no real credential shown</Text>
 </AbsoluteFill>;
};
