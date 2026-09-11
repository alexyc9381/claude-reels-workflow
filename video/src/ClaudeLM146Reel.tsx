import React from 'react';
import {AbsoluteFill,Audio,Freeze,Img,OffthreadVideo,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {Bg,KaraokeCaption,Mascot,ProgressBar} from './SlopKit';
import {DemoHeader,DemoSet,DemoCompanion} from './LM146AnimationKit';
import {inter} from './fonts';
import {LM146Hook,hookPortal} from './LM146Hook';
import {LM146TrialHook,trialPortal,TrialHookVariant} from './LM146TrialHooks';
import words from './data/words_lm146.json';
import edl from './data/edl_lm146.json';

const PURPLE='#6241E9', INK='#171E2D', CLAY='#D97757';
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const at=(name:string)=>Math.round(edl.find(e=>e.name===name)!.start*30);
const asset=(name:string)=>staticFile('lm146/r5/'+name);
type Camera=[number,number,number];
type Point=[number,number,number];
type CameraKey=[number,Camera];
const sample=(f:number,keys:Point[])=>{
 let i=0;while(i<keys.length-1&&f>=keys[i+1][0])i++;
 const a=keys[i],b=keys[Math.min(i+1,keys.length-1)];const p=a===b?0:ease(f,a[0],b[0]);
 return [lerp(a[1],b[1],p),lerp(a[2],b[2],p)];
};
const cameraAt=(f:number,keys:CameraKey[]):Camera=>{
 let i=0;while(i<keys.length-1&&f>=keys[i+1][0])i++;
 const a=keys[i],b=keys[Math.min(i+1,keys.length-1)],p=a===b?0:ease(f,a[0],b[0]);
 return a[1].map((v,j)=>lerp(v,b[1][j],p)) as Camera;
};
const stateAt=(f:number,keys:[number,string][])=>{let i=0;while(i<keys.length-1&&f>=keys[i+1][0])i++;return keys[i][1];};
const pressAt=(f:number,clicks:number[])=>Math.max(0,...clicks.map(c=>ease(f,c-3,c)*(1-ease(f,c,c+6))));

// Editorial cursor enhancement over unaltered captures. The tip is the true hit point.
// Cursor travel, click compression and rings share the exact frame of each recorded action.
const Cursor:React.FC<{x:number;y:number;f:number;clicks:number[];size?:number}>=({x,y,f,clicks,size=64})=>{
 const press=pressAt(f,clicks);return <div style={{position:'absolute',left:x,top:y,width:size,height:size*1.3,pointerEvents:'none',zIndex:20}}>
 {clicks.map(c=>{const age=f-c;if(age<0||age>18)return null;const p=age/18;return <div key={c} style={{position:'absolute',left:-47,top:-47,width:94,height:94,border:'5px solid '+PURPLE,borderRadius:'50%',opacity:1-p,transform:`scale(${.2+p})`,background:`rgba(98,65,233,${.13*(1-p)})`}}/>;})}
 <svg width={size} height={size*1.3} viewBox="0 0 40 52" style={{overflow:'visible',filter:'drop-shadow(1px 3px 4px #0005)',transform:`scale(${1-.2*press})`,transformOrigin:'0 0'}}><path d="M2 2 L2 39 L12 30 L20 48 L28 44 L20 27 L34 27 Z" fill="#171E2D" stroke="white" strokeWidth="3.2" strokeLinejoin="round"/></svg>
 </div>;
};

type ScreenProps={variant?:TrialHookVariant;scene?:string;f:number;states:[number,string][];cameras:CameraKey[];points:Point[];clicks:number[];height?:number;top?:number;video?:{name:string;start:number;end?:number;offset?:number;rate?:number;max:number};width?:number;left?:number;border?:boolean};
const CloseupScreen:React.FC<ScreenProps>=({f,states,cameras,points,clicks,height=850,top=415,video,width=1012,left=34,border=true})=>{
 const cam=cameraAt(f,cameras),s=width/cam[2],point=sample(f,points),name=stateAt(f,states);
 const browser=name.startsWith('2')&&Number(name.slice(0,2))>=20&&Number(name.slice(0,2))<=23;
 const srcWidth=browser||name==='official'?1280:1200;
 const style:React.CSSProperties={position:'absolute',left:-cam[0]*s,top:-cam[1]*s,width:srcWidth*s,maxWidth:'none'};
 const isVideo=video&&f>=video.start&&(video.end===undefined||f<video.end);
 return <div style={{position:'absolute',left,top,width,height,borderRadius:26,background:'white',overflow:'hidden',boxShadow:border?'0 24px 60px #24263c36, 0 0 0 5px #17243C':undefined}}>
 {isVideo?<Freeze frame={Math.min(video.max,Math.max(0,Math.floor((f-video.start)*(video.rate||1)+(video.offset||0))))}><OffthreadVideo muted src={asset(video.name)} style={style}/></Freeze>:<Img src={name==='official'?staticFile('lm146/official-model38-last.png'):asset(name+'.png')} style={style}/>}
 <Cursor x={(point[0]-cam[0])*s} y={(point[1]-cam[1])*s} f={f} clicks={clicks}/>
 </div>;
};

// Overview preserves navigation context; the lower lens makes the actual hit target readable.
// Both views use the same source frame and pointer path. This is magnification, not a UI remake.
const Screen:React.FC<ScreenProps>=(props)=>{
 if(props.border===false)return <CloseupScreen {...props}/>;
 const {f,states,points,clicks,video,scene='hook'}=props,name=stateAt(f,states),pt=sample(f,points);
 const browser=(name.startsWith('2')&&Number(name.slice(0,2))>=20&&Number(name.slice(0,2))<=23)||name==='official';
 const sw=browser?1280:1200,sh=browser?720:760,oy=browser?0:40;
 const bscale=836/sw,fw=355,fh=306/650*fw;
 const fx=Math.max(0,Math.min(sw-fw,pt[0]-fw*.47)),fy=Math.max(oy,Math.min(sh-fh,pt[1]-fh*.43));
 const play=video&&f>=video.start&&(video.end===undefined||f<video.end);
 const source=(style:React.CSSProperties)=>play?<Freeze frame={Math.min(video.max,Math.max(0,Math.floor((f-video.start)*(video.rate||1)+(video.offset||0))))}><OffthreadVideo src={asset(video.name)} muted style={style}/></Freeze>:<div style={{...style,height:Number(style.width)*sh/sw}}><Img src={name==='official'?staticFile('lm146/official-model38-last.png'):asset(name+'.png')} style={{width:'100%',display:'block'}}/>{name==='43-q6-menu'&&<div style={{position:'absolute',left:(788/sw*100)+'%',top:(308/sh*100)+'%',width:(93/sw*100)+'%',height:(62/sh*100)+'%',overflow:'hidden'}}><Img src={asset(name+'.png')} style={{position:'absolute',width:(sw/93*100)+'%',maxWidth:'none',left:(-903/93*100)+'%',top:(-308/62*100)+'%'}}/></div>}</div>;
 const rootF=useCurrentFrame(),intro=scene==='download'&&rootF<173;
 const portal=intro?(props.variant?trialPortal(rootF,props.variant):hookPortal(rootF)):{left:122,top:476,width:836,height:504,radius:22};
 const reveal=intro?ease(rootF,150,160):1,lens=intro?ease(rootF,162,173):1;
 const overviewScale=portal.width/836;
 const zoom=650/fw;
 return <>
  <div style={{opacity:intro?ease(rootF,150,168):1}}><DemoSet scene={scene} f={f} clicks={clicks}/></div>
  <div style={{position:'absolute',left:portal.left,top:portal.top,width:portal.width,height:portal.height,borderRadius:portal.radius,opacity:reveal,overflow:'hidden',background:'#fff',boxShadow:'0 20px 36px #050E1C80,0 0 0 2px #DFE6F033'}}>
   <div style={{position:'absolute',width:836,height:504,transform:`scale(${overviewScale})`,transformOrigin:'0 0'}}>
   {(!intro||rootF>=150)&&source({position:'absolute',width:836,top:-oy*bscale,left:0,maxWidth:'none'})}
   <div style={{position:'absolute',left:fx*bscale,top:(fy-oy)*bscale,width:fw*bscale,height:fh*bscale,border:'3px solid #6241E9',borderRadius:9,background:'#6241E908',boxShadow:'0 0 0 1px #ffffff90'}}/>
   <Cursor x={pt[0]*bscale} y={(pt[1]-oy)*bscale} f={f} clicks={clicks} size={46}/>
   </div>
  </div>
  <div style={{position:'absolute',left:58,top:1104+(1-lens)*36,width:650,height:306,opacity:lens,borderRadius:23,overflow:'hidden',background:'#fff',boxShadow:'0 17px 35px #17243C2B,0 0 0 4px #6241E9'}}>
   {(!intro||rootF>=150)&&source({position:'absolute',left:-fx*zoom,top:-fy*zoom,width:sw*zoom,maxWidth:'none'})}
   <Cursor x={(pt[0]-fx)*zoom} y={(pt[1]-fy)*zoom} f={f} clicks={clicks} size={57}/>
  </div>
 </>;
};

const CTA:React.FC<{f:number}>=({f:frame})=>{
 // Finish the comment action before the final spoken word, with no outro hold.
 const f=frame*1.5;
 const p=pressAt(f,[23]);const pos=sample(f,[[0,600,958],[4,351,830],[9,351,830],[20,925,836],[23,925,836],[36,950,855],[56,950,855]]);
 return <>
 <div style={{position:'absolute',left:76,top:720,width:928,height:260,background:'#fff',border:'5px solid #192339',borderRadius:36,boxShadow:'0 23px 50px #2129412a',display:'flex',alignItems:'center',paddingLeft:60,fontFamily:inter.fontFamily,fontSize:104,fontWeight:850,color:INK,transform:`translateY(${p*8-68*ease(f,25,43)}px) scale(${1-.055*ease(f,25,43)})`}}>{f>=9?'L':''}{f>=14?'M':''}<span style={{height:109,width:5,background:PURPLE,marginLeft:9,opacity:f<30?1:0}}/><div style={{position:'absolute',right:40,top:66,width:110,height:110,borderRadius:'50%',background:PURPLE,color:'white',textAlign:'center',fontSize:85,lineHeight:'103px'}}>{f<28?'↑':'✓'}</div></div>
 <div style={{opacity:1-ease(f,25,32)}}><Cursor x={pos[0]} y={pos[1]} f={f} clicks={[4,23]}/></div><div style={{position:'absolute',left:667,top:1010,transform:`translateY(${20*ease(f,3,7)*(1-ease(f,8,11))-310*Math.sin(Math.PI*ease(f,10,36))}px) rotate(${-9*Math.sin(Math.PI*ease(f,10,36))}deg)`}}><Mascot lf={f+26} size={292} nodAmp={0} gaze={-7} stern={f<12?.45:0} shock={.55*ease(f,21,24)*(1-ease(f,25,31))} cheer={ease(f,36,44)}/></div></>;
};

export const ClaudeLM146Reel:React.FC<{variant?:TrialHookVariant}>=({variant})=>{
 const f=useCurrentFrame();let idx=edl.findIndex((e,i)=>f>=Math.round(e.start*30)&&(i===edl.length-1||f<Math.round(edl[i+1].start*30)));if(idx<0)idx=0;
 const scene=edl[idx].name,lf=f-at(scene);let states:[number,string][]=[],cameras:CameraKey[]=[],points:Point[]=[],clicks:number[]=[],height=850,top=415,success=9999,video:ScreenProps['video'];
 if(scene==='download'){
  states=[[0,'20-website'],[24,'21-website-os'],[43,'22-website-selected'],[65,'23-website-clicked'],[102,'01-app']];
  cameras=[[0,[175,12,680]],[18,[175,18,565]],[44,[175,85,550]],[66,[182,180,470]],[91,[182,170,510]],[101,[182,170,510]],[102,[0,50,640]],[124,[0,50,560]]];
  points=[[0,814,397],[21,373,230],[24,373,230],[39,342,277],[43,342,277],[61,364,298],[65,364,298],[90,395,312],[101,395,312],[102,569,343],[124,303,264]];clicks=[24,43,65];
 }
 if(scene==='search'){
  states=[[0,'01-app'],[15,'02-search-open'],[38,'q1'],[46,'q2'],[54,'q3'],[60,'04-results'],[77,'06-5bit'],[103,'41-source-url'],[125,'official']];
  cameras=[[0,[0,50,560]],[13,[0,50,560]],[28,[90,80,443]],[67,[90,80,443]],[77,[90,80,443]],[99,[487,260,635]],[124,[487,260,635]],[125,[0,77,590]],[144,[0,77,640]]];
  points=[[0,300,259],[12,20,162],[15,20,162],[31,245,110],[35,245,110],[60,263,193],[72,276,408],[77,276,408],[98,683,645],[103,683,645],[115,765,592],[118,765,592],[124,765,592],[125,225,116],[144,236,118]];clicks=[15,35,77,103,118];
 }
 if(scene==='quant'){
  states=[[0,'05-4bit'],[20,'06-5bit'],[43,'07-6bit'],[65,'08-8bit']];
  cameras=[[0,[99,162,395]],[18,[99,178,395]],[40,[99,200,395]],[65,[99,169,395]],[84,[99,162,395]]];
  points=[[0,294,195],[4,294,195],[16,287,408],[20,287,408],[38,283,336],[43,283,336],[60,282,264],[65,282,264],[84,301,264]];clicks=[4,20,43,65];
 }
 if(scene==='compression'){
  states=[[0,'09-gguf'],[25,'10-gguf-options'],[63,'11-q6-fit'],[99,'43-q6-menu'],[123,'12-q8-fit']];
  cameras=[[0,[510,275,590]],[24,[510,298,590]],[39,[657,385,436]],[62,[657,385,436]],[63,[653,321,440]],[88,[520,298,575]],[100,[520,298,575]],[115,[657,385,436]],[122,[657,385,436]],[123,[653,321,440]],[153,[653,317,440]]];
  points=[[0,901,496],[20,828,343],[25,828,343],[55,700,456],[63,700,456],[75,730,343],[90,833,343],[99,833,343],[117,698,488],[123,698,488],[135,730,343],[153,737,343]];clicks=[25,63,99,123];
 }
 if(scene==='best'){
  states=[[0,'11-q6-fit'],[17,'43-q6-menu'],[53,'11-q6-fit']];
  cameras=[[0,[653,317,440]],[16,[520,307,570]],[17,[655,379,437]],[44,[655,379,437]],[53,[513,325,570]],[70,[520,350,570]],[98,[520,350,570]]];
  points=[[0,982,343],[13,829,343],[17,829,343],[28,982,487],[44,1002,455],[53,700,456],[77,666,385],[98,638,385]];clicks=[17,53];
 }
 if(scene==='fit'){
  states=[[0,'11-q6-fit'],[45,'15-small-ready'],[83,'16-downloading'],[100,'17-download-progress'],[113,'18-download-done'],[124,'24-download-complete'],[139,'25-downloaded']];
  cameras=[[0,[520,350,570]],[19,[520,342,400]],[44,[520,342,400]],[45,[497,88,610]],[68,[521,300,571]],[82,[740,310,348]],[103,[868,323,220]],[139,[868,323,220]],[152,[838,301,256]]];
  points=[[0,638,385],[19,604,385],[41,620,385],[45,638,353],[65,606,353],[78,983,353],[83,983,353],[99,981,354],[124,989,354],[152,992,354]];clicks=[83];success=139;
 }
 if(scene==='models'){
  states=[[0,'25-downloaded'],[11,'26-before-my-models'],[35,'27-my-models']];
  cameras=[[0,[838,301,256]],[5,[905,79,211]],[10,[905,79,211]],[11,[0,50,530]],[35,[0,50,530]],[56,[43,54,530]],[78,[54,100,457]]];
  points=[[0,995,353],[8,1085,109],[11,1085,109],[30,20,128],[35,20,128],[53,246,149],[81,272,150]];clicks=[11,35];height=670;
 }
 if(scene==='load'){
  states=[[0,'27-my-models'],[12,'28-model-selected'],[51,'29-model-cog'],[93,'30-chat-loaded'],[130,'31-chat-ready']];
  cameras=[[0,[54,100,457]],[14,[54,100,457]],[32,[741,50,459]],[50,[858,69,340]],[51,[841,50,354]],[78,[865,74,320]],[92,[865,74,320]],[93,[430,50,370]],[117,[430,50,370]],[129,[430,50,370]],[130,[137,630,730]],[149,[137,638,630]]];
  points=[[0,272,150],[12,272,150],[19,312,150],[45,1158,150],[51,1158,150],[77,952,100],[93,952,100],[101,651,85],[129,651,85],[130,651,85],[149,286,675]];clicks=[12,51,93];success=130;height=850;video={name:'loading.mp4',start:93,end:130,offset:66,rate:1.3,max:116};
 }
 if(scene==='chat'){
  states=[[0,'36-chat-empty'],[15,'37-prompt-start'],[25,'38-prompt-middle'],[36,'39-prompt-full'],[61,'40-code-result']];
  cameras=[[0,[137,638,630]],[23,[137,638,710]],[36,[310,637,770]],[51,[858,644,250]],[53,[858,644,250]],[54,[144,91,965]],[67,[144,91,965]],[83,[153,225,433]],[108,[153,225,433]],[127,[156,256,427]],[164,[156,256,427]]];
  points=[[0,286,675],[9,286,675],[39,373,675],[48,1076,719],[53,1076,719],[54,1076,719],[70,263,289],[83,245,289],[125,235,305],[164,275,305]];clicks=[9,53];success=95;video={name:'response.mp4',start:54,rate:2.25,max:195};
 }
 return <AbsoluteFill style={{fontFamily:inter.fontFamily}}><Bg/>
 <div style={{position:'absolute',inset:0,zIndex:300,transform:'translateY(-48px)',pointerEvents:'none'}}><ProgressBar/></div>
 {f<170?<div style={{position:'absolute',inset:0,zIndex:200,pointerEvents:'none'}}><div style={{opacity:1-ease(f,150,159)}}><DemoHeader scene="hook" f={f}/></div>{f>=150&&<div style={{opacity:ease(f,159,168)}}><DemoHeader scene="download" f={f-150}/></div>}</div>:<DemoHeader scene={scene} f={lf}/>}
 {f<170&&(variant?<LM146TrialHook variant={variant} f={f}/>:<LM146Hook f={f}/>)}
 {scene==='hook'?null:scene==='cta'?<CTA f={lf}/>:<><Screen variant={variant} scene={scene} f={lf} states={states} cameras={cameras} points={points} clicks={clicks} height={height} top={top} video={video}/><div style={{opacity:scene==='download'?ease(f,165,176):1}}><DemoCompanion scene={scene} f={lf} clicks={clicks} success={success}/></div></>}
 {scene==='fit'&&lf>=45&&lf<94&&<div style={{position:'absolute',left:62,top:1052,fontSize:27,lineHeight:1.2,fontWeight:650,color:'#EDF1F8'}}>This Mac: smaller 1.7B model.</div>}
 <KaraokeCaption words={words} top={1475}/><Audio src={staticFile(variant?`lm146/trials/${variant}/master.wav`:'lm146/master.wav')}/>
 </AbsoluteFill>;
};
