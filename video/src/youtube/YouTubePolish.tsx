import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {SpriteActor,WhiteGlassSurface} from './WhiteGlass';
import {OriginalClaude} from './OriginalClaude';
import {bodyFont,displayFont} from './brand';
import {easeOut,easeInOut,naturalHop} from './glass-motion';
import {facePresets,hopFace} from './face-motion';
import {roughTimeline,roughChapters,type RoughCutManifest} from './roughcut-timing';

export const openingScale=(t:number)=>1+.038*(1-Math.exp(-Math.max(0,t)/.22))+.027*easeOut(t,0,4.5);
const fade=(t:number,d:number)=>easeOut(t,0,.25)*(1-easeInOut(t,d-.35,.35));
const ink='#1A1813',clay='#B8501F',teal='#267D78';
export const BrandedBackground:React.FC<{t:number}>=({t})=><AbsoluteFill style={{background:'linear-gradient(125deg,#F6EBD8 0%,#ECD6BC 44%,#D58D68 100%)',overflow:'hidden'}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at '+(26+Math.sin(t*.13)*5)+'% 25%,#FFFDF2EE,transparent 62%),radial-gradient(ellipse at 82% '+(68+Math.sin(t*.17)*4)+'%,#D4774260,transparent 62%)'}}/>
</AbsoluteFill>;
const Logo:React.FC<{name:string;size?:number}>=({name,size=76})=><Img src={staticFile('v3/'+name)} style={{width:size,height:size,objectFit:'contain',borderRadius:size*.18,background:name==='seedance.png'?'#B8501F':undefined,padding:name==='seedance.png'?size*.14:0,boxSizing:'border-box'}}/>;
const Film:React.FC<{width?:number}>=({width=360})=><div style={{position:'relative',width,height:width*.65,borderRadius:22,background:'#315F79',boxShadow:'0 18px 26px #315F792F',overflow:'hidden'}}>
 <Img src={staticFile('pipeline-result.jpg')} style={{position:'absolute',left:'4%',top:'13%',width:'92%',height:'74%',objectFit:'cover'}}/>
 {[0,1].map(row=>Array.from({length:9},(_,i)=><div key={row+'-'+i} style={{position:'absolute',left:(5+i*10.5)+'%',top:row?'92%':'4%',width:'5%',height:'4%',borderRadius:2,background:'#FFF9E9'}}/>))}
</div>;

/** Branded physical workflow: skill unfolds, a real model rack routes, a film is delivered. */
export const PromptToVideo:React.FC<{duration:number}>=({duration})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,u=t*8.8/duration;
 const arrive=easeOut(u,0,.7),route=easeInOut(u,2.1,1.4),deliver=easeOut(u,5.4,1),dock=easeInOut(u,6.6,.85);
 return <AbsoluteFill style={{fontFamily:bodyFont,color:ink,opacity:fade(t,duration)}}>
  <BrandedBackground t={t}/>
  <div style={{position:'absolute',left:230,top:115,fontFamily:displayFont,fontSize:70,letterSpacing:-2,transform:'translateY('+(1-arrive)*30+'px)',opacity:arrive}}>One skill. Your models.</div>
  <div style={{position:'absolute',left:210,top:820,width:1500,height:90,borderRadius:'50%',background:'radial-gradient(ellipse,#95562730,transparent 70%)'}}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
   <defs><linearGradient id="route-ink"><stop stopColor="#D2724E"/><stop offset="1" stopColor="#267D78"/></linearGradient></defs>
   <path d="M640 485C790 485 755 348 947 348M945 348C1030 348 950 680 1250 680" stroke="#FFFDF5" strokeWidth="18" fill="none"/>
   <path d="M640 485C790 485 755 348 947 348M945 348C1030 348 950 680 1250 680" stroke="url(#route-ink)" strokeWidth="6" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-route}/>
   {[0,1,2].map(i=>{const p=easeInOut(u,2.2+i*.14,1.2);return <circle key={i} cx={650+470*p} cy={485-160*Math.sin(p*Math.PI)} r={11-i*2} fill={i===0?teal:'#D2724E'} opacity={p>0&&p<1?1:0}/>;})}
  </svg>
  <WhiteGlassSurface x={200} y={305} width={460} height={390} t={t} radius={38} frost={.6} studioRefraction={false} style={{transform:'translateY('+(1-arrive)*60+'px) rotate('+(-3+3*arrive)+'deg)'}}>
   <div style={{position:'absolute',left:30,top:26,display:'flex',alignItems:'center',gap:18}}><Logo name="claude.png" size={64}/><span style={{fontSize:30,fontWeight:600}}>Claude</span></div>
   <div style={{position:'absolute',left:35,top:125,width:390,height:185,borderRadius:20,background:'#FFFCF6',border:'2px solid white',boxShadow:'0 10px 20px #663E2415',transform:'perspective(900px) rotateY('+(-12*(1-easeOut(u,.5,.8)))+'deg)'}}>
    <div style={{position:'absolute',left:24,top:22,fontFamily:displayFont,fontSize:37,color:clay}}>fal-video.skill</div>
    <div style={{position:'absolute',left:24,top:88,fontSize:25}}>“Make a cinematic clip.”</div>
    <div style={{position:'absolute',left:24,bottom:22,width:250,height:5,borderRadius:5,background:'#267D7830'}}><div style={{height:5,width:(route*100)+'%',background:teal,borderRadius:5}}/></div>
   </div>
  </WhiteGlassSurface>
  <WhiteGlassSurface x={935} y={245} width={735} height={445} t={t} radius={40} frost={.58} studioRefraction={false} style={{transform:'translateY('+(1-easeOut(u,.3,.8))*70+'px)'}}>
   <div style={{position:'absolute',left:32,top:24,display:'flex',alignItems:'center',gap:20}}><Logo name="fal.png" size={68}/><div><div style={{fontSize:32,fontWeight:600}}>fal.ai</div><div style={{fontSize:21,color:'#555F56'}}>Access the models directly</div></div></div>
   {[['hailuo.png','Hailuo',teal],['google.png','Google Veo','#315F79'],['seedance.png','Seedance',clay]].map(([logo,title,color],i)=>{
    const a=easeOut(u,.7+i*.16,.75),pulse=.5+.5*Math.sin(u*2-i);
    return <div key={title} style={{position:'absolute',left:34+i*229,top:143,width:209,height:239,borderRadius:27,background:'linear-gradient(145deg,#FFFFFFE8,#F7F8EEB8)',border:'2px solid #FFFFFF',boxShadow:'0 12px 18px '+color+'22',transform:'translateY('+((1-a)*75+Math.sin(u*1.3+i)*5)+'px) rotate('+((1-a)*8)+'deg)',opacity:a}}>
     <div style={{position:'absolute',left:65,top:28}}><Logo name={logo} size={78}/></div>
     <div style={{position:'absolute',top:130,width:'100%',textAlign:'center',fontSize:25,fontWeight:600}}>{title}</div>
     <div style={{position:'absolute',left:29,right:29,bottom:35,height:6,background:color+'22',borderRadius:8,overflow:'hidden'}}><div style={{height:6,width:(30+pulse*65)+'%',background:color,borderRadius:8}}/></div>
    </div>;
   })}
  </WhiteGlassSurface>
  <div style={{position:'absolute',left:1135+135*deliver,top:470+100*deliver,opacity:deliver,transform:'translateY('+(-Math.sin(deliver*Math.PI)*130)+'px) rotate('+(12*(1-deliver))+'deg) scale('+(.7+.3*deliver)+')'}}><Film width={370}/></div>
  <div style={{position:'absolute',left:1236,top:785,width:450,height:67,borderRadius:18,background:'linear-gradient(135deg,#F4D685,#DFA43C)',boxShadow:'0 15px 24px #9C572B25',opacity:dock,transform:'translateY('+(1-dock)*45+'px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:25,fontWeight:600}}>Saved to your project</div>
  <SpriteActor t={t} x={440+easeInOut(u,1.65,1.3)*170} y={684} size={226} colorful outfit="courier" pose={naturalHop(u,1.65,1.3,115)} face={hopFace(u,1.65,1.3)} gait={{phase:u*10,amount:1-easeOut(u,2.9,.4)}} gesture={route}/>
  <SpriteActor t={t} x={865} y={696} size={215} colorful outfit="operator" pose={naturalHop(u,3.4,.75,70)} face={u<3.4?facePresets.focused:hopFace(u,3.4,.75)} gesture={Math.sin(route*Math.PI)}/>
  <SpriteActor t={t} x={1530} y={795-dock*15} size={200} colorful outfit="archivist" pose={naturalHop(u,6.5,.7,70)} face={u<6.5?facePresets.curious:hopFace(u,6.5,.7)} gesture={dock}/>
 </AbsoluteFill>;
};

const Definition:React.FC<{duration:number;term:string;meaning:string;kind?:string}>=({duration,term,meaning,kind})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=easeOut(t,0,.65);
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont,color:ink}}>
  <WhiteGlassSurface x={112} y={807} width={1100} height={188} t={t} studioRefraction={false} frost={.86} radius={29} style={{transform:'translateY('+(1-p)*45+'px)'}}>
   <div style={{position:'absolute',left:32,top:22,fontFamily:displayFont,fontSize:43,color:clay}}>{term}</div>
   <div style={{position:'absolute',left:32,top:84,width:820,fontSize:27,lineHeight:1.25}}>{meaning}</div>
   <div style={{position:'absolute',right:28,top:32,width:140,height:116,borderRadius:23,background:'#E5EFE7',border:'2px solid white',display:'flex',alignItems:'center',justifyContent:'center',transform:'rotate('+Math.sin(t*2)*2+'deg)'}}>
    {kind==='skill'?<div style={{position:'relative',width:67,height:90,background:'#FFFDF6',borderRadius:10,boxShadow:'8px 9px 0 #D2724E55',fontSize:35,display:'grid',placeItems:'center',color:clay}}>&#123; &#125;</div>:term.startsWith('API')?<svg width="86" height="75" viewBox="0 0 86 75"><circle cx="24" cy="29" r="15" stroke={teal} strokeWidth="9" fill="none"/><path d="m35 40 34 25m-12-15 9-12m-1 20 10-12" stroke={teal} strokeWidth="9" fill="none" strokeLinecap="round"/></svg>:term==='Prompt'||term==='Creative direction'?<Logo name="claude.png" size={78}/>:term.startsWith('Listen')?<svg width="96" height="70">{[0,1,2,3,4,5,6].map(i=><rect key={i} x={i*14} y={35-(10+Math.sin(t*4+i)*8)} width={8} height={20+Math.sin(t*4+i)*16} rx={4} fill={teal}/>)}</svg>:term==='Wrapper'?<svg width="96" height="90" viewBox="0 0 96 90"><rect x="5" y="5" width="72" height="56" rx="9" fill="#8DC7B3"/><rect x="22" y="27" width="70" height="57" rx="9" fill="#FFFAEC" stroke={teal} strokeWidth="4"/><path d="M24 43H90" stroke={teal} strokeWidth="4"/></svg>:<div style={{transform:'rotate('+Math.sin(t*1.8)*3+'deg)'}}><Film width={110}/></div>}
   </div>
  </WhiteGlassSurface>
  <SpriteActor t={t} x={1105} y={669} size={170} colorful outfit="archivist" pose={naturalHop(t,.15,.7,50)} face={hopFace(t,.15,.7)} gesture={p}/>
 </AbsoluteFill>;
};
const SkillMechanism:React.FC<{duration:number;outro?:boolean}>=({duration,outro=false})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=easeInOut(t,.7,1.4);
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont,color:ink,transform:outro?'translate(42px,335px) scale(.64)':undefined,transformOrigin:'top left'}}>
  <WhiteGlassSurface x={115} y={742} width={1130} height={253} t={t} radius={32} frost={.86} studioRefraction={false}>
   <div style={{position:'absolute',left:28,top:26,fontFamily:displayFont,fontSize:40,color:clay}}>{outro?'The skill is in the description':'Skill = reusable instructions'}</div>
   <div style={{position:'absolute',left:45+260*p,top:100,width:172,height:98,borderRadius:13,background:'#FFFDF8',border:'2px solid #D2724E44',boxShadow:'0 8px 15px #B8501F22',transform:'rotate('+(-7+7*p)+'deg)',display:'grid',placeItems:'center',fontSize:27,color:clay,fontWeight:600}}>.skill</div>
   <svg width="1100" height="220" style={{position:'absolute',top:20,zIndex:0}}><path d="M490 137H510M645 137H670" stroke="#267D78" strokeWidth="4" strokeDasharray="9 8" strokeDashoffset={-t*28}/></svg>
   <div style={{position:'absolute',left:535,top:108}}><Logo name="claude.png" size={80}/></div>
   <div style={{position:'absolute',left:690,top:126,fontSize:27,fontWeight:600,opacity:easeOut(t,1,.5)}}>{outro?'Drop it into Claude':'New instructions'}</div>
  </WhiteGlassSurface>
  <SpriteActor t={t} x={1110} y={796} size={190} colorful outfit="courier" pose={naturalHop(t,.6,.8,65)} face={hopFace(t,.6,.8)} gesture={p}/>
 </AbsoluteFill>;
};
const BrandCallout:React.FC<{duration:number;logo:string;name:string;sub?:string}>=({duration,logo,name,sub})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=easeOut(t,0,.55);
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont,color:ink}}>
  <WhiteGlassSurface x={114} y={810} width={710} height={179} t={t} frost={.87} studioRefraction={false} radius={30} style={{transform:'translateX('+(-55*(1-p))+'px)'}}>
   <div style={{position:'absolute',left:28,top:30,transform:'rotate('+((1-p)*-18)+'deg)'}}><Logo name={logo} size={116}/></div>
   <div style={{position:'absolute',left:174,top:sub?32:58,fontFamily:displayFont,fontSize:47}}>{name}</div>
   {sub&&<div style={{position:'absolute',left:174,top:100,fontSize:24,color:'#54564E'}}>{sub}</div>}
  </WhiteGlassSurface>
 </AbsoluteFill>;
};
const Chapter:React.FC<{duration:number;step:number;title:string}>=({duration,step,title})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=easeOut(t,0,.7);
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont,color:ink}}>
  <WhiteGlassSurface x={112} y={112} width={1000} height={164} t={t} frost={.9} radius={29} studioRefraction={false} style={{transform:'translateX('+(-90*(1-p))+'px)'}}>
   <div style={{position:'absolute',left:18,top:18,width:127,height:127,background:'linear-gradient(135deg,#D2724E,#B8501F)',borderRadius:23,color:'#FFF8E8',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <span style={{fontSize:21,letterSpacing:2}}>STEP</span><span style={{fontFamily:displayFont,fontSize:66,lineHeight:1}}>{step}</span>
   </div>
   <div style={{position:'absolute',left:176,top:54,fontFamily:displayFont,fontSize:43}}>{title}</div>
   <div style={{position:'absolute',left:176,bottom:25,height:4,width:745*easeOut(t,.2,duration-.5),background:'#D2724E',borderRadius:5}}/>
  </WhiteGlassSurface>
 </AbsoluteFill>;
};
const Roadmap:React.FC<{duration:number}>=({duration})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont}}>
  {[['01','Connect',teal],['02','Generate','#315F79'],['03','Compare',clay]].map(([n,label,c],i)=><WhiteGlassSurface key={n} x={140+i*535} y={826} width={495} height={155} t={t} frost={.88} radius={26} studioRefraction={false} style={{transform:'translateY('+(1-easeOut(t,i*.13,.6))*100+'px)',opacity:easeOut(t,i*.13,.5)}}>
   <div style={{position:'absolute',left:24,top:27,color:c,fontFamily:displayFont,fontSize:64}}>{n}</div><div style={{position:'absolute',left:130,top:52,fontSize:32,color:ink,fontWeight:600}}>{label}</div>
  </WhiteGlassSurface>)}
 </AbsoluteFill>;
};
const HookComparison:React.FC<{duration:number}>=({duration})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont,color:ink}}>
  {['A','B'].map((n,i)=><WhiteGlassSurface key={n} x={110+i*1230} y={710} width={470} height={278} t={t} frost={.75} studioRefraction={false} radius={32} style={{transform:'translateY('+(1-easeOut(t,.1+i*.12,.55))*90+'px) rotate('+((i?1:-1)*(1-easeOut(t,.1,.7))*5)+'deg)'}}>
   <div style={{position:'absolute',left:25,top:23,width:67,height:67,borderRadius:18,background:i?teal:clay,color:'white',display:'grid',placeItems:'center',fontFamily:displayFont,fontSize:46}}>{n}</div>
   <div style={{position:'absolute',left:210,top:48,fontSize:81,color:i?teal:clay}}>?</div>
   <div style={{position:'absolute',left:20,right:20,bottom:39,textAlign:'center',fontSize:23,fontWeight:600}}>Comparison clip placeholder</div>
  </WhiteGlassSurface>)}
 </AbsoluteFill>;
};
const Companion:React.FC<{duration:number;shoulder?:boolean}>=({duration,shoulder=false})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,size=shoulder?225:188;
 const x=shoulder?1400+10*Math.sin(t*.6):1700,y=shoulder?992:682;
 return <div style={{position:'absolute',left:x-size*.5,top:y-size*.86,opacity:fade(t,duration),transform:'translateY('+(-25*(1-easeOut(t,0,.6))+Math.sin(t*1.6)*2)+'px) rotate('+Math.sin(t*.8)*1.5+'deg)'}}>
  <div style={{position:'absolute',left:size*.25,top:size*.84,width:size*.5,height:9,borderRadius:'50%',background:'#E9893655',filter:'blur(5px)'}}/><OriginalClaude size={size}/>
 </div>;
};
const Teaser:React.FC<{duration:number}>=({duration})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <AbsoluteFill style={{opacity:fade(t,duration),fontFamily:bodyFont}}>
  <div style={{position:'absolute',left:165,top:170,color:ink,fontFamily:displayFont,fontSize:86,transform:'translateY('+(1-easeOut(t,0,.45))*40+'px)'}}>Later in this video…</div>
  <div style={{position:'absolute',left:172,top:300,fontSize:28,color:clay}}>Wait for the result.</div>
 </AbsoluteFill>;
};
type Cue={id:string;offset:number;seconds:number;type:'brand'|'definition'|'skill'|'outro';title?:string;text?:string;logo?:string};
const cues:Cue[]=[
 {id:'r-higgsfield',offset:.1,seconds:4.3,type:'brand',title:'Higgsfield',logo:'higgsfield.jpg'},
 {id:'s009',offset:1,seconds:4.5,type:'definition',title:'Wrapper',text:'An interface built on top of other models.'},
 {id:'s011',offset:1.5,seconds:4.7,type:'brand',title:'fal.ai',text:'The model access layer',logo:'fal.png'},
 {id:'s012',offset:3,seconds:5,type:'definition',title:'API',text:'A way for one app to request work from another.'},
 {id:'s015',offset:5,seconds:4,type:'brand',title:'fal.ai',text:'Explore the model library',logo:'fal.png'},
 {id:'s016',offset:1,seconds:6.5,type:'definition',title:'API key',text:'Your private credential for accessing a service.'},
 {id:'s017',offset:1,seconds:5.6,type:'outro'},
 {id:'s018',offset:0,seconds:4.8,type:'skill'},
 {id:'s020',offset:2,seconds:5,type:'brand',title:'/fal-video',text:'Run the skill in Claude',logo:'claude.png'},
 {id:'s021',offset:5,seconds:5,type:'definition',title:'Prompt',text:'Your creative brief: subject, action, camera and style.'},
 {id:'s023',offset:.4,seconds:4.5,type:'definition',title:'Format',text:'Set the duration and frame shape before generating.'},
 {id:'s024',offset:3,seconds:4.5,type:'brand',title:'$1 maximum',text:'The budget requested for this example',logo:'fal.png'},
 {id:'s025',offset:0,seconds:3,type:'brand',title:'Hailuo',logo:'hailuo.png'},
 {id:'s026',offset:7,seconds:5,type:'definition',title:'Storyboard',text:'A sequence of shots that shapes the final video.'},
 {id:'s027',offset:8,seconds:4,type:'brand',title:'Choose the direction',text:'Review the story before rendering',logo:'claude.png'},
 {id:'s031',offset:.7,seconds:5.5,type:'definition',title:'Creative direction',text:'Refine the camera, movement and mood in your prompt.'},
 {id:'s032',offset:.2,seconds:4.2,type:'brand',title:'Same prompt. New model.',logo:'fal.png'},
 {id:'s035',offset:.5,seconds:4.5,type:'definition',title:'Watch the fabric',text:'Compare motion and fine detail in the recorded result.'},
 {id:'s037',offset:2,seconds:5,type:'definition',title:'Listen to the environment',text:'Compare how the sound supports the scene.'},
 {id:'s041',offset:.1,seconds:4.2,type:'brand',title:'Higgsfield example',logo:'higgsfield.jpg'},
 {id:'s042',offset:.1,seconds:4.1,type:'brand',title:'Claude skill example',logo:'claude.png'},
 {id:'s044',offset:0,seconds:3.6,type:'outro'},
 {id:'s045',offset:0,seconds:5.6,type:'outro'},
];
const chapterTitles=['','Why use models directly?','Connect fal.ai + Claude','Make your first video','Review the results','The reveal + next step'];
export const YouTubePolish:React.FC<{manifest:RoughCutManifest}>=({manifest:m})=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!;
 const a=find('s004'),b=find('s005'),pipelineDuration=(b.from+b.duration-a.from)/fps;
 const companionIds=['s003','s007','s010','r-direct','r-features','s013','s019','s021','s026','s030','s034','s036','s038','r-outlook','s045'];
 return <>
  <Sequence from={15} durationInFrames={125}><HookComparison duration={125/fps}/></Sequence>
  <Sequence from={a.from} durationInFrames={Math.round(pipelineDuration*fps)}><PromptToVideo duration={pipelineDuration}/></Sequence>
  <Sequence from={find('s006').from} durationInFrames={find('s006').duration}><Roadmap duration={find('s006').duration/fps}/></Sequence>
  <Sequence from={find('r-teaser').from} durationInFrames={find('r-teaser').duration}><Teaser duration={find('r-teaser').duration/fps}/></Sequence>
  {roughChapters(m).slice(1).map((c,i)=><Sequence key={c.frame} from={c.frame} durationInFrames={Math.min(114,find(rows.find(r=>r.from===c.frame)!.id).duration)}><Chapter duration={Math.min(114,rows.find(r=>r.from===c.frame)!.duration)/fps} step={i+1} title={chapterTitles[i+1]}/></Sequence>)}
  {cues.map((c,i)=>{const s=find(c.id);if(!s)return null;const duration=Math.min(Math.round(c.seconds*fps),s.duration-Math.round(c.offset*fps));return <Sequence key={i} from={s.from+Math.round(c.offset*fps)} durationInFrames={duration}>
   {c.type==='brand'?<BrandCallout duration={duration/fps} logo={c.logo!} name={c.title!} sub={c.text}/>:c.type==='definition'?<Definition duration={duration/fps} term={c.title!} meaning={c.text!}/>:<SkillMechanism duration={duration/fps} outro={c.type==='outro'}/>}
  </Sequence>;})}
  {companionIds.map(id=>{const s=find(id),next=rows[rows.indexOf(s)+1],max=s.duration-(s.layout==='presenter'&&next?.layout==='screen-presenter'?20:0),d=Math.min(max,240),delay=max>d?Math.min(30,max-d):0;return <Sequence key={id} from={s.from+delay} durationInFrames={d}><Companion duration={d/fps} shoulder={s.layout==='presenter'}/></Sequence>;})}
 </>;
};
const Sfx:React.FC<{name:string;gain:number}>=({name,gain})=><Audio data-audio-role="design-sfx" src={staticFile('v3/'+name+'.wav')} volume={gain}/>;
/** Dialogue-first mix: no Sony audio; music never plays under the result review. */
export const YouTubeSound:React.FC<{manifest:RoughCutManifest}>=({manifest:m})=>{
 const rows=roughTimeline(m),fps=m.fps,find=(id:string)=>rows.find(r=>r.id===id)!;
 const events:{at:number;name:string;gain:number}[]=[];
 const add=(at:number,name:string,gain=.16)=>events.push({at:Math.round(at),name,gain});
 add(15,'glide',.20);add(26,'glass',.17);
 const pipeline=find('s004');[0,1,2.3,3.7,5.6,6.8,7.7].forEach((t,i)=>add(pipeline.from+t*fps,['glide','tap','glide','land','glass','glide','land'][i],i===4?.23:.19));
 for(const c of cues){const s=find(c.id);if(s){add(s.from+c.offset*fps,'glide',.14);add(s.from+(c.offset+.4)*fps,'glass',.12);}}
 for(const c of roughChapters(m).slice(1)){add(c.frame,'glide',.22);add(c.frame+17,'land',.2);}
 for(let i=1;i<rows.length;i++)if(rows[i].layout==='screen-presenter'&&rows[i-1].layout==='presenter'&&!rows[i].teaser)add(rows[i].from-10,'glide',.19);
 add(find('s006').from,'tap',.2);add(find('r-teaser').from,'glass',.25);
 return <>
  <Sequence durationInFrames={Math.round(37.5*fps)}><Audio data-audio-role="music" src={staticFile('v3/cipher.mp3')} startFrom={12*fps} volume={f=>.046*easeOut(f/fps,0,.8)*(1-easeInOut(f/fps,34,3.5))}/></Sequence>
  <Sequence from={find('s044').from} durationInFrames={find('s044').duration+find('s045').duration}><Audio data-audio-role="music" src={staticFile('v3/cipher.mp3')} startFrom={48*fps} volume={f=>.04*easeOut(f/fps,0,.7)*(1-easeInOut(f/fps,8,1.23))}/></Sequence>
  {events.map((e,i)=><Sequence key={i} from={e.at} durationInFrames={36}><Sfx name={e.name} gain={e.gain}/></Sequence>)}
 </>;
};
