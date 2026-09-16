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
 const pull=progress(f,0,22), reveal=progress(f,13,32);
 const prompt='What is marketing?';
 const typed=prompt.slice(0,Math.floor(interpolate(f,[80,107],[0,prompt.length],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})));
 const answer=progress(f,124,140), click=progress(f,110,115)*(1-progress(f,115,120));
 const cursorX=lerp(1520,1718,progress(f,100,112)),cursorY=lerp(670,468,progress(f,100,112));
 return <AbsoluteFill style={{background:paper,color:ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 75% 30%, #fffdf8 0%, transparent 65%)'}}/>
  <div style={{position:'absolute',left:80,top:104,display:'flex',alignItems:'center',gap:17,opacity:reveal}}><Mark/><span style={{fontFamily:'Georgia, serif',fontSize:43,letterSpacing:-1}}>Claude</span></div>
  <div style={{position:'absolute',left:82,top:169,fontSize:18,letterSpacing:3.6,color:'#817A70',opacity:reveal}}>BEGINNER TO PRO</div>
  <div style={{position:'absolute',left:720,top:117,opacity:reveal,transform:`translateY(${(1-reveal)*25}px)`}}>
   <div style={{fontSize:19,letterSpacing:3,color:'#8A8176',marginBottom:20}}>THE COMMON MISTAKE</div>
   <div style={{fontFamily:'Georgia, serif',fontSize:76,letterSpacing:-3,lineHeight:1.1}}>Just a <span style={{color:clay}}>search engine?</span></div>
  </div>
  <div style={{position:'absolute',left:720,top:319,width:1100,height:573,borderRadius:22,background:'#FFFEFA',border:'1px solid #DAD5CB',boxShadow:'0 22px 65px #40372713',opacity:reveal,transform:`translateY(${(1-reveal)*25}px)`,overflow:'hidden'}}>
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
  </div>
  <div style={{position:'absolute',left:1445,top:964,width:380,height:2,background:'#D5CFC2',opacity:reveal}}/>
  <div style={{position:'absolute',left:1545,top:949,width:269,height:25,borderRadius:'50%',background:'radial-gradient(ellipse,#5D45392B,transparent 70%)',opacity:reveal}}/>
  <div style={{position:'absolute',left:1604,top:950,width:148,height:16,borderRadius:'50%',background:'radial-gradient(ellipse,#5D453945,transparent 70%)',opacity:reveal}}/>
  <div style={{position:'absolute',left:1558,top:743.2,opacity:reveal}}><Mascot lf={f+30} size={240} nodAmp={0} gaze={-5} stern={answer*.65} point={f>80&&f<120?1:0}/></div>
  {f>=98&&f<125&&<svg style={{position:'absolute',left:cursorX,top:cursorY,filter:'drop-shadow(0 2px 2px #0003)'}} width="30" height="40" viewBox="0 0 30 40"><path d="M2 2 L3 31 L10 24 L17 37 L23 34 L16 21 L28 20 Z" fill={ink} stroke="white" strokeWidth="2"/></svg>}
  <div style={{position:'absolute',left:lerp(0,80,pull),top:lerp(0,255,pull),width:lerp(1920,560,pull),height:lerp(1080,710,pull),borderRadius:lerp(0,24,pull),overflow:'hidden',boxShadow:`0 22px 50px rgba(50,35,20,${.13*pull})`}}>
   <AbsoluteFill style={{transform:`scale(${lerp(1.13,1,pull)})`}}>
    <Sequence durationInFrames={77}><OffthreadVideo muted src={staticFile('takes/000.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
    <Sequence from={77}><OffthreadVideo muted src={staticFile('takes/001.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></Sequence>
   </AbsoluteFill>
  </div>
  <Audio src={staticFile('dialogue.wav')}/>
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="ClaudeOpeningPreview" component={OpeningPreview} width={1920} height={1080} fps={edit.outputFps} durationInFrames={150}/>);
