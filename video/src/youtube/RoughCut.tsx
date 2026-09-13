import React from 'react';
import {AbsoluteFill,Audio,Loop,OffthreadVideo,Sequence,staticFile,useVideoConfig,useCurrentFrame} from 'remotion';
import {roughTimeline,type RoughCutManifest} from './roughcut-timing';
import {BrandedBackground,openingScale,YouTubePolish,YouTubeSound,inFullScene} from './YouTubeV9';
import {easeInOut} from './glass-motion';
import {bodyFont} from './brand';
import {typingFocus,screenTransform,screenViewport,sourceCrop} from './typing-focus';
import {CameraPlate} from './CameraPlate';
import {introCropV21} from './ScenesV21';

type Row=ReturnType<typeof roughTimeline>[number];
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
const full={x:28,y:16,w:1864,h:1048}, inset={x:1380,y:678,w:460,h:326};
const targets:Record<string,{x:number;y:number;z:number;at:number;hold:number}>={
 s014:{x:840,y:410,z:1.12,at:3.2,hold:3},s015:{x:1000,y:480,z:1.15,at:5,hold:7},
 s020:{x:1040,y:550,z:1.20,at:4,hold:11},s021:{x:1070,y:505,z:1.12,at:9,hold:16},
 s024:{x:1110,y:520,z:1.16,at:3.5,hold:6},
 s026:{x:1080,y:500,z:1.12,at:4,hold:8},s027:{x:1080,y:570,z:1.12,at:5,hold:7},
 s029:{x:1030,y:510,z:1.13,at:3,hold:8},s036:{x:1030,y:525,z:1.12,at:6,hold:12},
};
const Screen:React.FC<{m:RoughCutManifest;s:Row;sourceStart?:number;t:number}>=({m,s,sourceStart=s.start,t})=>{
 const q=targets[s.id],a=q?easeInOut(t,q.at,.8)*(1-easeInOut(t,q.at+q.hold,.8)):0;
 const focus=typingFocus(s.id,t),zoom=Math.max(focus.zoom,1+(q?(q.z-1)*a:0));
 const tr=screenTransform(s.teaser?1.1:zoom,mix(q?.x??1090,1090,focus.strength),mix(q?.y??820,820,focus.strength),!s.teaser);
 return <div style={{position:'absolute',left:screenViewport.x,top:screenViewport.y,width:screenViewport.w,height:screenViewport.h,overflow:'hidden',borderRadius:25,boxShadow:'0 20px 42px #5C3D2438',border:'2px solid #FFFFFFCC'}}>
  <div data-cropped-obs style={{position:'absolute',width:screenViewport.w,height:screenViewport.h,top:0,overflow:'hidden',transform:`translate(${tr.tx}px,${tr.ty}px) scale(${tr.zoom})`,transformOrigin:'top left',filter:s.teaser?'blur(8px)':undefined}}>
   {s.teaser?<Loop durationInFrames={120}><OffthreadVideo data-teaser-playing-result muted src={staticFile('v4/claude-result.mp4')} style={{width:screenViewport.w,height:screenViewport.h,objectFit:'cover'}}/></Loop>:<OffthreadVideo src={staticFile(m.obs.source)} startFrom={Math.round(sourceStart*m.fps)} muted style={{position:'absolute',width:screenViewport.w,height:1080*screenViewport.w/1920,top:-sourceCrop.top*screenViewport.w/1920}}/>}
   {/* Real source crop removes the menu bar and Dock at every zoom level. */}
   {s.screenRedaction&&<div data-privacy-mask={s.screenRedaction} style={{position:'absolute',left:0,top:0,right:0,bottom:0,background:'#F4F2ED',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:22,fontFamily:bodyFont,color:'#4A514C'}}>
    <svg style={{opacity:s.id==='s016'?0:1}} width="84" height="100" viewBox="0 0 84 100"><path d="M20 42V25a22 22 0 0 1 44 0v17" fill="none" stroke="#267D78" strokeWidth="7"/><rect x="7" y="41" width="70" height="55" rx="15" fill="#267D78"/><circle cx="42" cy="64" r="5" fill="white"/><path d="M42 66V79" stroke="white" strokeWidth="5"/></svg>
    <div style={{fontSize:30,fontWeight:600,opacity:s.id==='s016'?0:1}}>{s.screenRedaction==='credentials'?'Private API-key details hidden':'Private billing details hidden'}</div>
    <div style={{fontSize:22,opacity:s.id==='s016'?0:1}}>Keep your own credentials private.</div>
   </div>}
  </div>
 </div>;
};

/** Shared camera box travels across the edit; source playback remains at 1x. */
const FootageSegment:React.FC<{m:RoughCutManifest;s:Row;previous?:Row;next?:Row}>=({m,s,previous,next})=>{
 const f=useCurrentFrame(),t=f/m.fps,d=s.duration/m.fps;
 const enter=s.layout==='screen-presenter'&&previous?.layout==='presenter'&&!s.teaser;
 const leave=s.layout==='presenter'&&next?.layout==='screen-presenter'&&!next.teaser;
 let p=s.layout==='presenter'?0:1;
 // .4 seconds before + .6 after the cut, with continuous geometry at the join.
 if(leave)p=easeInOut(t,d-.4,1);
 if(enter)p=easeInOut(t+.4,0,1);
 if(s.teaser)p=1;
 const focus=typingFocus(s.id,t).strength;
 const b={x:mix(full.x,inset.x,p),y:mix(full.y,inset.y-553*focus,p),w:mix(full.w,inset.w,p),h:mix(full.h,inset.h,p)};
 const angle=p>0&&p<1?-5*Math.sin(Math.PI*p):0;
 const showNext=leave&&t>=d-.4;
 const screen=s.layout!=='presenter'?s:showNext?next:undefined;
 // Full presenter hides bed; inset is separately centered with more torso retained.
 const cropW=mix(1480,1300,p),cropX=introCropV21((s.from+f)/m.fps,mix(110,150,p)),cropY=mix(25,0,p),scale=b.w/cropW;
 const open=s.id==='s001'?openingScale(t):1;
 // Let the result own the screen during silent playback, rather than a waiting face.
 const cameraOpacity=s.id==='s035'?1-easeInOut(t,4.65,.22):s.id==='s033'?1-easeInOut(t,9.6,.35):s.id==='s029'?1-easeInOut(t,3.5,.35)*(1-easeInOut(t,9.6,.35)):1;
 // Four-frame J-cut of OBS picture only: never desynchronize speaking camera.
 const jcut=!!previous&&s.layout!=='presenter'&&previous.layout!=='presenter'&&!s.screenRedaction&&!previous.screenRedaction&&!s.teaser&&!previous.teaser&&Math.abs(s.start-previous.end)>.3;
 return <AbsoluteFill>
  <BrandedBackground t={(s.from+f)/m.fps}/>
  {screen&&<Screen m={m} s={screen} t={screen===s?t:0} sourceStart={screen===s?s.start:screen.start-(d-.4)}/>}
  {jcut&&<Sequence durationInFrames={4}><Screen m={m} s={previous!} sourceStart={previous!.end-4/m.fps} t={0}/></Sequence>}
  {s.cameraSource&&s.layout!=='screen'&&!inFullScene(m,s.from+f)&&<div style={{position:'absolute',left:b.x,top:b.y,width:b.w,height:b.h,overflow:'hidden',opacity:cameraOpacity,borderRadius:mix(24,30,p),boxShadow:'0 '+mix(10,20,p)+'px 40px #452D2445',border:'2px solid #FFFFFFD0',transform:'perspective(2000px) rotate('+angle+'deg) scale('+(1+.016*Math.sin(Math.PI*p))+')'}}>
   <CameraPlate source={s.cameraPlateSource??'v7/presenter-background.mp4'} start={s.cameraPlateStart??s.from} length={s.cameraPlateDuration} style={{position:'absolute',width:1920*scale,height:1080*scale,left:-cropX*scale,top:-cropY*scale,transform:'scale('+open+')',transformOrigin:'50% 42%'}}/>
  </div>}
 </AbsoluteFill>;
};
export const RoughCut:React.FC<{manifest:RoughCutManifest;audioOnly?:boolean}>=({manifest:m,audioOnly=false})=>{
 const {fps,width}=useVideoConfig(),rows=roughTimeline(m);
 if(fps!==m.fps)throw Error('Composition and EDL frame rates differ');
 return <AbsoluteFill style={{background:'#F4EFE6'}}>
  {rows.map((s,i)=><Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
   {!audioOnly&&<div style={{position:'absolute',width:1920,height:1080,transform:'scale('+width/1920+')',transformOrigin:'top left'}}><FootageSegment m={m} s={s} previous={rows[i-1]} next={rows[i+1]}/></div>}
   <Audio data-audio-role="obs-narration" src={staticFile(m.obs.source)} startFrom={Math.round(s.start*fps)} endAt={Math.round(s.start*fps)+s.duration}/>
  </Sequence>)}
  {!audioOnly&&<div style={{position:'absolute',width:1920,height:1080,transform:'scale('+width/1920+')',transformOrigin:'top left',pointerEvents:'none'}}><YouTubePolish manifest={m}/></div>}
  <YouTubeSound manifest={m}/>
 </AbsoluteFill>;
};
