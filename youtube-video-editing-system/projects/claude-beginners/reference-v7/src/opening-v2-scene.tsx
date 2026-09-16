import React from 'react';
import {AbsoluteFill,Audio,Composition,Easing,Img,OffthreadVideo,Sequence,interpolate,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {Mascot} from './PreviewMascot';
const clay='#C97355', ink='#292822',paper='#F4F1EA';
const p=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,.84,.22,1)});
const mix=(a:number,b:number,v:number)=>a+(b-a)*v;
const Mark=({size=40}:{size?:number})=><svg width={size} height={size} viewBox="0 0 48 48">{Array.from({length:12},(_,i)=><path key={i} d="M24 4v13" stroke={clay} strokeWidth="4" strokeLinecap="round" transform={`rotate(${i*30} 24 24)`}/>)}</svg>;
const Mini=({kind,f,active=true}:{kind:number;f:number;active?:boolean})=><svg viewBox="0 0 250 150" width="100%" height="100%" fill="none">
 <rect x="2" y="2" width="246" height="146" rx="15" fill={active?'#FFFEFA':'#DDD8CD'} stroke={active?'#B9AC98':'#C2B9AA'} strokeWidth="4"/>
 {kind===0?<>{[55,90,68,110].map((h,i)=><rect key={i} x={35+i*49} y={132-h*p(f,2+i*2,15+i*2)} width="32" height={h*p(f,2+i*2,15+i*2)} rx="4" fill={i===3?clay:ink}/>)} </>:kind===1?<g stroke={active?ink:'#81796D'} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"><path d="M84 39L46 75l38 36M166 39l38 36-38 36M143 28l-36 94"/></g>:<><path d="M51 75h149" stroke={active?ink:'#81796D'} strokeWidth="9"/>{[43,124,207].map((x,i)=><g key={i}><rect x={x-25} y="46" width="50" height="58" rx="12" fill={i===1&&active?clay:active?ink:'#81796D'}/><path d={`M${x-11} 74l8 9 16-20`} stroke="white" strokeWidth="5" strokeLinecap="round"/></g>)}{active&&<circle cx={65+((Math.max(f,0)*3)%115)} cy="75" r="7" fill={clay}/>}</>}
</svg>;
const Actor=({f,x,y,size=230,stern=0,cheer=0}:{f:number;x:number;y:number;size?:number;stern?:number;cheer?:number})=><>
 <div style={{position:'absolute',left:x-size*.08,top:y+size*.92-10,width:size*1.16,height:20,borderRadius:'50%',background:'radial-gradient(ellipse,#58432D40,transparent 70%)'}}/>
 <div style={{position:'absolute',left:x,top:y}}><Mascot lf={f+30} size={size} nodAmp={0} gaze={3} stern={stern} cheer={cheer}/></div>
</>;
export const OpeningV2Scene=()=>{
 const f=useCurrentFrame(); const pull=p(f,60,76), reveal=p(f,60,76); const collapse=p(f,34,60), chat=p(f,62,73), waste=p(f,157,172), next=p(f,223,239);
 const headOpacity=reveal*(1-next); const prompt='What is marketing?';const typed=prompt.slice(0,Math.floor(interpolate(f,[73,100],[0,prompt.length],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})));
 return <AbsoluteFill style={{background:paper,color:ink,fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 74% 33%,#FFFDF7,transparent 69%)'}}/>
  <div style={{position:'absolute',left:80,top:105,display:'flex',gap:17,alignItems:'center',opacity:reveal}}><Mark/><span style={{fontFamily:'Georgia,serif',fontSize:43}}>Claude</span></div>
  <div style={{position:'absolute',left:82,top:174,fontSize:18,letterSpacing:3.6,color:'#817A70',opacity:reveal}}>BEGINNER TO PRO</div>
  <div style={{position:'absolute',left:715,top:123,opacity:headOpacity}}><div style={{fontSize:18,letterSpacing:3,color:clay,marginBottom:20}}>{f<157?'THE COMMON MISTAKE':'MOST OF ITS POWER SITS IDLE'}</div><div style={{fontFamily:'Georgia,serif',fontSize:68,letterSpacing:-2.5}}>{f<157?<>Just a <span style={{color:clay}}>search engine?</span></>:<>One feature. <span style={{color:clay}}>So much unused.</span></>}</div></div>
  <div style={{position:'absolute',left:715,top:305,width:1110,height:652,opacity:reveal*(1-next),transform:`translateY(${-next*32}px)`,borderRadius:24,border:'1px solid #D8D0C2',background:'#FFFEFA',boxShadow:'0 22px 65px #40372712',overflow:'hidden'}}>
   {/* First three seconds: capabilities compress into a search-only view. */}
   <div style={{position:'absolute',inset:0,opacity:1-chat,background:ink}}>
    <div style={{position:'absolute',left:60,top:538,width:990,height:3,background:'#746458'}}/>
    <div style={{position:'absolute',left:325,top:119.4,opacity:1-collapse*.96}}><Actor f={f} x={0} y={0} size={455}/></div>
    <div style={{position:'absolute',left:35,top:110,opacity:p(f,12,21)*(1-collapse),transform:`translateX(${(1-p(f,12,21))*-100}px) rotate(-8deg)`,width:290,height:210}}><Mini kind={1} f={f-5}/></div>
    <div style={{position:'absolute',right:34,top:170,opacity:p(f,18,27)*(1-collapse),transform:`translateX(${(1-p(f,18,27))*100}px) rotate(8deg)`,width:290,height:210}}><Mini kind={2} f={f-8}/></div>
    <div style={{position:'absolute',left:mix(670,330,collapse),top:mix(52,40,collapse),width:550,height:560,opacity:p(f,30,38),transform:`rotate(${mix(-25,0,collapse)}deg) scale(${mix(1.15,1,collapse)})`}}><svg viewBox="0 0 550 560" width="550" height="560"><circle cx="223" cy="208" r="160" fill="#F2D0BA15" stroke="#F3DFCE" strokeWidth="32"/><path d="M338 330l140 154" stroke={clay} strokeWidth="57" strokeLinecap="round"/></svg></div>
   </div>
   {/* Prompt entry followed by an expanding physical stack of generic answers. */}
   <div style={{position:'absolute',inset:0,opacity:chat*(1-waste)}}>
    <div style={{position:'absolute',left:38,top:31,display:'flex',alignItems:'center',gap:14}}><Mark size={28}/><span style={{fontFamily:'Georgia,serif',fontSize:28}}>Claude</span></div>
    <div style={{position:'absolute',left:42,top:77,width:1024,height:137,border:'1.5px solid #D8D0C3',background:'#FFFEFA',borderRadius:16,display:'flex',alignItems:'center',padding:'0 25px',boxSizing:'border-box',transform:`translateY(${(1-chat)*70}px)`}}><svg width="27" height="27" viewBox="0 0 30 30" style={{marginRight:20}}><circle cx="12" cy="12" r="8" fill="none" stroke={clay} strokeWidth="2.5"/><path d="M18 18l9 9" stroke={clay} strokeWidth="3"/></svg><span style={{fontSize:45}}>{typed||'Ask a simple question…'}</span><span style={{marginLeft:'auto',background:clay,color:'white',borderRadius:12,fontSize:33,width:49,height:49,textAlign:'center',transform:`scale(${1-.13*p(f,104,108)*(1-p(f,108,114))})`}}>↑</span></div>
    <div style={{position:'absolute',left:165,top:315,width:780,height:234,opacity:1-p(f,113,123),transform:`translateY(${(1-chat)*65}px)`}}><svg viewBox="0 0 780 234" width="780" height="234"><rect x="0" y="0" width="780" height="234" rx="28" fill={ink}/>{Array.from({length:16},(_,i)=>{const row=Math.floor(i/8), col=i%8;return <rect key={i} x={24+col*92} y={24+row*65} width="78" height="51" rx="8" fill={Math.floor((f-73)/3)%16===i?clay:'#F1EADD'} transform={Math.floor((f-73)/3)%16===i?'translate(0 4)':undefined}/>})}<rect x="205" y="161" width="370" height="48" rx="8" fill="#CDBEAA"/></svg></div>
    {[2,1,0].map(i=>{const enter=p(f,117+i*4,130+i*4);return <div key={i} style={{position:'absolute',left:54+i*18,top:240+i*32+(1-enter)*85,width:970,height:269,boxSizing:'border-box',padding:'25px 29px',borderRadius:16,border:'1px solid #D8D0C2',background:i?'#F0EBE2':'#FFFEFA',boxShadow:'0 9px 22px #332B1710',opacity:enter,transform:`rotate(${i*1.4}deg)`}}>{i===0&&<><div style={{fontSize:20,color:clay,marginBottom:17}}>Claude</div><div style={{fontFamily:'Georgia,serif',fontSize:41,lineHeight:1.25}}>Marketing is the process of creating value for customers.</div>{[94,88,97,74].map((v,j)=><div key={j} style={{marginTop:14,width:`${v}%`,height:12,borderRadius:5,background:'#DDD7CB',transform:`scaleX(${p(f,124+j*3,135+j*3)})`,transformOrigin:'left'}}/>)}</>}</div>})}
   </div>
   {/* The wasted-potential metaphor: power reaches search; app/workflow branches are unplugged. */}
   <div style={{position:'absolute',inset:0,opacity:waste,background:ink,transform:`scale(${mix(.95,1,waste)})`}}>
    <svg width="1110" height="652" style={{position:'absolute',inset:0}}>
     <ellipse cx="207" cy="555" rx="136" ry="18" fill="#EFE6D9"/><path d="M65 557h320" stroke="#DACFBC" strokeWidth="2"/>
     <path d="M300 392h173V121h226" stroke="#74685B" strokeWidth="9" fill="none"/>
     <path d="M300 392h173V121h226" stroke={clay} strokeWidth="9" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p(f,168,190)}/>
     <path d="M473 324h132M650 324h49M473 392v137h132M650 529h49" stroke="#AD9D86" strokeWidth="7" fill="none" strokeDasharray="9 8"/>
     {[324,529].map(y=><g key={y} transform={`translate(605 ${y-15})`} stroke="#E1CAB0" strokeWidth="5" fill={ink}><path d="M0 0h12v30H0M12 8h11M12 22h11M45 0H33v30h12"/></g>)}
     {f>188&&<circle cx={473+((f-188)*8%218)} cy="121" r="6" fill={clay}/>}
    </svg>
    <Actor f={f} x={52} y={258} size={320} stern={.6}/>
    <div style={{position:'absolute',left:72,top:178,fontSize:35,color:'#EDBFA2'}}>All this power…</div>
    <div style={{position:'absolute',left:699,top:59,width:325,height:120,borderRadius:18,background:'#F3D5C3',border:'2px solid '+clay,display:'flex',alignItems:'center',gap:24,padding:'0 27px',boxSizing:'border-box'}}><svg width="53" height="53" viewBox="0 0 53 53"><circle cx="21" cy="21" r="14" fill="none" stroke={clay} strokeWidth="4"/><path d="M32 32l15 15" stroke={clay} strokeWidth="6" strokeLinecap="round"/></svg><div style={{fontSize:31}}>Search</div></div>
    {[1,2].map((k,i)=><div key={k} style={{position:'absolute',left:699,top:235+i*205,width:325,height:165,opacity:p(f,174+i*6,188+i*6),transform:`translateX(${(1-p(f,174+i*6,188+i*6))*40}px)`}}><Mini kind={k} f={40} active={false}/><div style={{position:'absolute',right:5,top:59,padding:'9px 13px',borderRadius:8,background:'#FFFEFA',color:'#948B7E',fontSize:18,border:'1px solid #D6CFC2'}}>UNUSED</div></div>)}
   </div>
  </div>
  {/* Capabilities light up for the lesson promise. */}
  <div style={{position:'absolute',left:715,top:129,width:1110,opacity:next,transform:`translateY(${(1-next)*36}px)`}}>
   <div style={{fontSize:19,letterSpacing:3,color:clay,marginBottom:24}}>UNLOCK THE REST</div><div style={{fontFamily:'Georgia,serif',fontSize:91,letterSpacing:-4}}>Beginner <span style={{color:clay}}>to pro.</span></div>
   <svg width="1040" height="150" style={{position:'absolute',left:0,top:398}}><path d="M175 0v48h680V0M510 48v85" fill="none" stroke={clay} strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p(f,250,280)}/></svg>
   {[0,1,2].map((k,i)=>{const enter=p(f,234+i*9,249+i*9);return <div key={i} style={{position:'absolute',left:i*354,top:234,width:330,height:198,opacity:enter,transform:`translateY(${(1-enter)*70}px)`}}><Mini kind={k} f={f-237-i*9}/></div>})}
   <div style={{position:'absolute',left:416,top:493}}><Actor f={f} x={0} y={0} size={240} cheer={.5}/></div>
   <div style={{position:'absolute',left:332,top:720,width:410,height:2,background:'#D5CFC2'}}/>
  </div>
  <div style={{position:'absolute',left:mix(0,80,pull),top:mix(0,255,pull),width:mix(1920,560,pull),height:mix(1080,710,pull),borderRadius:mix(0,24,pull),overflow:'hidden',boxShadow:'0 22px 50px #32231420'}}>
   <AbsoluteFill>
    <Sequence durationInFrames={71}><OffthreadVideo muted src={staticFile('takes/000.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
    <Sequence from={71} durationInFrames={151}><OffthreadVideo muted startFrom={1} src={staticFile('takes/001.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
    <Sequence from={222}><OffthreadVideo muted src={staticFile('takes/002.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
   </AbsoluteFill>
   {f<77&&<AbsoluteFill style={{opacity:1-p(f,70,76)}}>
    <Img src={staticFile('dolly-room-plate.png')} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:'50% 40%',transform:`scale(${mix(1.01,1.16,interpolate(f,[0,58],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)}))})`}}/>
    <Img src={staticFile(`dolly-subject/${String(Math.min(f,77)).padStart(3,'0')}.png`)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',transformOrigin:'50% 8%',transform:`scale(${mix(1.015,1,pull)})`}}/>
   </AbsoluteFill>}
  </div>

 </AbsoluteFill>;
};
