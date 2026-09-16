import React from 'react';
import {AbsoluteFill,Audio,Composition,Easing,OffthreadVideo,Sequence,interpolate,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {Mascot} from './PreviewMascot';
import edit from './edit.json';

const ink='#292822', clay='#C97355', paper='#F4F1EA';
const ease=Easing.bezier(.16,.84,.22,1);
const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const Mark=({size=38}:{size?:number})=><svg width={size} height={size} viewBox="0 0 48 48">{Array.from({length:12},(_,i)=><path key={i} d="M24 4 L24 17" stroke={clay} strokeWidth="4" strokeLinecap="round" transform={`rotate(${i*30} 24 24)`}/>)}</svg>;

export const OpeningPreview=()=>{
 const f=useCurrentFrame();
 // One decisive pullback, then a quiet hold. Every pose is frame-derived.
 const pull=progress(f,5,27), reveal=progress(f,15,34);
 const introZoom=lerp(1,1.16,progress(f,0,5));
 const waste=progress(f,168,187), next=progress(f,230,249);
 const emphasis=progress(f,165,185)*(1-progress(f,222,242));
 const stageScale=1+emphasis*.035;
 const prompt='What is marketing?';
 const typed=prompt.slice(0,Math.floor(interpolate(f,[80,107],[0,prompt.length],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})));
 const answer=progress(f,124,140), click=progress(f,110,115)*(1-progress(f,115,120));
 const cursorX=lerp(1520,1718,progress(f,100,112)),cursorY=lerp(670,468,progress(f,100,112));
 return <AbsoluteFill style={{background:paper,color:ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 75% 30%, #fffdf8 0%, transparent 65%)'}}/>
  <div style={{position:'absolute',left:80,top:104,display:'flex',alignItems:'center',gap:17,opacity:reveal}}><Mark/><span style={{fontFamily:'Georgia, serif',fontSize:43,letterSpacing:-1}}>Claude</span></div>
  <div style={{position:'absolute',left:82,top:169,fontSize:18,letterSpacing:3.6,color:'#817A70',opacity:reveal}}>BEGINNER TO PRO</div>
  <div style={{position:'absolute',left:720,top:117,opacity:reveal*(1-next),transform:`translateY(${(1-reveal)*25-next*35}px)`}}>
   <div style={{fontSize:19,letterSpacing:3,color:'#8A8176',marginBottom:20}}>THE COMMON MISTAKE</div>
   <div style={{fontFamily:'Georgia, serif',fontSize:76,letterSpacing:-3,lineHeight:1.1}}>Just a <span style={{color:clay}}>search engine?</span></div>
  </div>
  <div style={{position:'absolute',left:720,top:319,width:1100,height:573,borderRadius:22,background:'#FFFEFA',border:'1px solid #DAD5CB',boxShadow:'0 22px 65px #40372713',opacity:reveal*(1-next),transform:`translateY(${(1-reveal)*25-next*40}px) scale(${stageScale})`,transformOrigin:'70% 60%',overflow:'hidden'}}>
   <div style={{height:63,borderBottom:'1px solid #E9E4DB',display:'flex',alignItems:'center',padding:'0 29px',gap:9,background:'#F9F7F1'}}>
    {['#D9A293','#DFCF9D','#ACBBA8'].map(c=><span key={c} style={{width:10,height:10,borderRadius:10,background:c}}/>)}
    <span style={{marginLeft:30,fontFamily:'Georgia, serif',fontSize:25}}>Claude</span>
    <span style={{marginLeft:'auto',color:'#948D80',fontSize:17}}>New conversation</span>
   </div>
   <div style={{position:'absolute',left:48,top:109,right:48,height:91,border:'1.5px solid #D8D1C5',borderRadius:16,display:'flex',alignItems:'center',padding:'0 25px',boxShadow:'0 4px 12px #342B2206'}}>
    <span style={{fontSize:29,color:typed?ink:'#9B9388'}}>{typed||'Ask a simple question…'}</span>
    {f>=80&&f<110&&<span style={{height:32,width:2,background:clay,marginLeft:3}}/>}
    <div style={{marginLeft:'auto',width:48,height:48,borderRadius:12,background:clay,color:'white',fontSize:33,textAlign:'center',lineHeight:'44px',transform:`scale(${1-click*.12})`}}>↑</div>
   </div>
   <div style={{position:'absolute',left:52,top:244,right:95,opacity:answer,transform:`translateY(${(1-answer)*18}px)`}}>
    <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><Mark size={28}/><span style={{fontSize:21,fontWeight:600}}>Claude</span></div>
    <div style={{fontFamily:'Georgia, serif',fontSize:26,lineHeight:1.6,color:'#69645A',maxWidth:840}}>Marketing is the process of creating, communicating, and delivering value to customers. It includes research, advertising, and building relationships with an audience.</div>
    <div style={{marginTop:17,display:'flex',flexDirection:'column',gap:13}}>{[86,95,72].map((w,i)=><div key={i} style={{height:7,width:`${w}%`,background:'#E9E5DC',borderRadius:5}}/>)}</div>
   </div>
   <div style={{position:'absolute',inset:0,background:'#FFFEFA',opacity:waste}}/>
   <div style={{position:'absolute',left:51,top:244,opacity:waste,transform:`translateY(${(1-waste)*15}px)`}}>
    <div style={{fontSize:18,letterSpacing:3,color:clay,marginBottom:16}}>THE PROBLEM</div>
    <div style={{fontFamily:'Georgia,serif',fontSize:69,letterSpacing:-2}}>Wasted potential.</div>
    <div style={{marginTop:18,height:3,width:interpolate(f,[183,202],[0,530],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),background:clay}}/>
   </div>
  </div>
  <div style={{position:'absolute',left:720,top:128,opacity:next,transform:`translateY(${(1-next)*38}px)`}}>
   <div style={{fontSize:19,letterSpacing:3,color:clay,marginBottom:26}}>YOUR CLAUDE UPGRADE</div>
   <div style={{fontFamily:'Georgia,serif',fontSize:94,letterSpacing:-4}}>Beginner <span style={{color:clay}}>to pro.</span></div>
   <div style={{marginTop:72,display:'flex',gap:26}}>
    {['Choose smarter','Build real tools','Automate work'].map((label,i)=>{
     const enter=progress(f,245+i*12,266+i*12);
     return <div key={label} style={{width:326,height:310,boxSizing:'border-box',border:'1px solid #D9D1C5',borderRadius:22,background:i===0?'#E7B49D':'#FFFEFA',padding:'34px 29px',opacity:enter,transform:`translateY(${(1-enter)*30}px)`}}>
      <div style={{fontSize:19,color:i===0?'#754C39':'#8F8477',letterSpacing:2}}>0{i+1}</div>
      <svg width="62" height="62" viewBox="0 0 62 62" style={{display:'block',marginTop:27,marginBottom:27}} fill="none" stroke={ink} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
       {i===0?<><path d="M10 15h42M10 31h42M10 47h42"/><circle cx="23" cy="15" r="5" fill="#E7B49D"/><circle cx="41" cy="31" r="5" fill="#E7B49D"/><circle cx="27" cy="47" r="5" fill="#E7B49D"/></>:i===1?<><rect x="8" y="10" width="46" height="42" rx="5"/><path d="M8 22h46M22 33l-6 5 6 5M40 33l6 5-6 5M34 30l-6 16"/></>:<><path d="M12 22a20 20 0 0135-5l5 7M52 13v11H41M50 40a20 20 0 01-35 5l-5-7M10 49V38h11"/></>}
      </svg>
      <div style={{fontSize:28,letterSpacing:-.8,whiteSpace:'nowrap'}}>{label}</div>
     </div>;
    })}
   </div>
  </div>
  <div style={{position:'absolute',left:1445,top:964,width:380,height:2,background:'#D5CFC2',opacity:reveal}}/>
  <div style={{position:'absolute',left:1545,top:949,width:269,height:25,borderRadius:'50%',background:'radial-gradient(ellipse,#5D45392B,transparent 70%)',opacity:reveal}}/>
  <div style={{position:'absolute',left:1604,top:950,width:148,height:16,borderRadius:'50%',background:'radial-gradient(ellipse,#5D453945,transparent 70%)',opacity:reveal}}/>
  <div style={{position:'absolute',left:1558,top:743.2,opacity:reveal}}><Mascot lf={f+30} size={240} nodAmp={0} gaze={-5} stern={answer*.65*(1-next)} cheer={next*.4} point={f>80&&f<120?1:0}/></div>
  {f>=98&&f<125&&<svg style={{position:'absolute',left:cursorX,top:cursorY,filter:'drop-shadow(0 2px 2px #0003)'}} width="30" height="40" viewBox="0 0 30 40"><path d="M2 2 L3 31 L10 24 L17 37 L23 34 L16 21 L28 20 Z" fill={ink} stroke="white" strokeWidth="2"/></svg>}
  <div style={{position:'absolute',left:lerp(0,80,pull),top:lerp(0,255,pull),width:lerp(1920,560,pull),height:lerp(1080,710,pull),borderRadius:lerp(0,24,pull),overflow:'hidden',boxShadow:`0 22px 50px rgba(50,35,20,${.13*pull})`}}>
   <AbsoluteFill style={{transform:`scale(${lerp(introZoom,1,pull)+emphasis*.025})`}}>
    <Sequence durationInFrames={77}><OffthreadVideo muted src={staticFile('takes/000.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
    <Sequence from={77} durationInFrames={152}><OffthreadVideo muted src={staticFile('takes/001.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
    <Sequence from={229}><OffthreadVideo muted src={staticFile('takes/002.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
   </AbsoluteFill>
  </div>
  <Audio src={staticFile('opening-10s-mix.wav')}/>
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="ClaudeOpeningPreview10s" component={OpeningPreview} width={1920} height={1080} fps={edit.outputFps} durationInFrames={300}/>);
