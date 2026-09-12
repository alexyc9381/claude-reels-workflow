import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {easeInOut as e,easeOut} from './glass-motion';
import {Actor,World,Glass,Label,Logo,Film,SkillFile,Key,CameraIcon,Lens,Monitor,Pedestal,Aura,C,clamp,lerp,settle,typeOn} from './YouTubeV8Primitives';
import {GuideSequence,SkillSequence,ShotStage} from './NarrativeV9';
import {ComparisonV10,AccessPriceV10,PromptToFileV10,InterfaceCutawayV10,VideoFileV10,BonusPackV10,DirectRouteV10,FeatureGateV10} from './StoryScenesV10';
import {AccessPriceV11,InstallFinaleV11} from './ScenesV11';
import {InstallFinaleV12} from './ScenesV12';
import {FeatureGateV13,FollowAlongV13,RoadmapV13} from './ScenesV13';
import {CostV15,ProductionV15,RoadmapV15,GuideV15,WrapperV15} from './ScenesV15';
import {CostV16,ProductionV16,RoadmapV16} from './ScenesV16';
const clock=()=>useCurrentFrame()/useVideoConfig().fps;
const At:React.FC<{x:number;y:number;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,children,style})=><div style={{position:'absolute',left:x,top:y,...style}}>{children}</div>;
const Desk:React.FC<{x:number;y:number;w:number}>=({x,y,w})=><At x={x} y={y}><svg width={w} height="235"><path d={`M45 40V215M${w-45} 40V215`} stroke="#315F7966" strokeWidth="13"/><path d={`M0 15L45 0H${w-45}L${w} 15V40H0Z`} fill="#FFF8EC" stroke="#FFFFFF" strokeWidth="3"/><path d={`M0 40H${w}`} stroke={C.orange+'77'} strokeWidth="4"/></svg></At>;

export const HookV9:React.FC<{duration:number;guessAt:number;whyAt:number;higgsAt:number}>=({duration,whyAt,higgsAt})=>{
 const t=clock();return t>=whyAt?<Sequence from={Math.round(whyAt*30)}><CostV16 duration={duration-whyAt} brandAt={higgsAt-whyAt}/></Sequence>:<ComparisonV10 opening/>;
};

export const ProductionV9=ProductionV16;
export const WrapperV9=WrapperV15;

export const DirectV9:React.FC<{duration:number;featuresAt:number}>=({duration,featuresAt})=>{
 const t=clock();return t<featuresAt?<ModelRoom duration={featuresAt}/>:<Sequence from={Math.round(featuresAt*30)}><FeatureVault duration={duration-featuresAt}/></Sequence>;
};
const ModelRoom=DirectRouteV10;
const FeatureVault=FeatureGateV13;

export const DownloadV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*5/duration,release=e(u,.35,.8),fall=e(u,1.15,.75),take=e(u,2.2,1.25);
 return <World t={t} setting="archive"><Desk x={204} y={697} w={1454}/>
  <Glass x={256} y={180} w={685} h={417} t={t} frost={.48}><Label x={40} y={32} size={38}>Video description</Label><At x={43} y={124}><SkillFile t={t} size={137}/><Label x={189} y={20} size={36}>fal-video.skill</Label><Label x={190} y={89} size={29} color={C.orange}>Download ↓</Label></At><div style={{position:'absolute',left:30,right:30,bottom:28,height:5,background:'#267D7833'}}/></Glass>
  <At x={1020} y={454}><svg width="465" height="253"><path d="M18 68L66 18H369L438 68V218H18Z" fill="#ECE9E2" stroke="#FFF" strokeWidth="4"/><path d="M19 79H438V207H19Z" fill="#FFFFFF9C"/><path d="M90 94L147 155H300L357 94" fill="none" stroke={C.teal} strokeWidth="9"/><path d="M44 227H412" stroke="#B8501F50" strokeWidth="5"/></svg></At>
  <At x={682+release*386+take*193} y={288+fall*243-Math.sin(take*Math.PI)*60} style={{transform:`rotate(${-6+take*13}deg) scale(${1-take*.2})`}}><SkillFile t={t} size={174}/></At>
  <Actor t={t} x={1476-170*take} y={459} size={266} role="courier" walk={Math.sin(take*Math.PI)} look={-1} lift={fall*.75} reach={1} contact={1.9*duration/5}/>
  <At x={268} y={795}><Logo name="claude.png" size={70}/><Label x={105} y={12} size={40}>Ready for your Claude project</Label></At>
 </World>;
};

/** Closing payoff alone owns the ballistic throw/catch. */
const ArchivedOutroV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),u=t*8/duration,walk=e(u,.2,1),wind=e(u,1.35,.35),p=clamp((u-1.9)/1.3),place=e(u,3.6,1.1),run=e(u,5,1.1);
 const fx=lerp(551,1210,p)+place*75,fy=lerp(442,415,p)-4*p*(1-p)*235-place*95;
 return <World t={t} setting="archive"><Desk x={150} y={685} w={1610}/>
  <Monitor x={1023} y={143} w={727} t={t} label="YOUR CLAUDE WORKSPACE"><div style={{padding:27}}><Logo name="claude.png" size={64}/><Label x={116} y={41} size={36}>Claude</Label><Label x={39} y={186} size={45} color={C.orange}>{typeOn('/fal-video',u,5,.8)}</Label><At x={330} y={120} style={{opacity:e(u,5.8,.4),transform:`translateY(${(1-e(u,5.8,.4))*25}px)`}}><ShotStage t={t} w={290} progress={e(u,6,1.7)} mode="orbit"/></At><Label x={39} y={290} size={29} color={C.teal} style={{opacity:run}}>Direct your first shot</Label></div></Monitor>
  <Glass x={187} y={208} w={536} h={188} t={t} frost={.4}><Label x={30} y={30} size={39}>fal-video.skill</Label><Label x={31} y={107} size={32} color={C.orange}>In the description ↓</Label></Glass>
  <Actor t={t} x={257+100*walk-25*wind*(1-p)} y={472} size={282} role="courier" look={1} walk={Math.sin(walk*Math.PI)} lift={wind*(1-p)} reach={1} lean={-12*wind*(1-p)} contact={3.2*duration/8}/>
  <Actor t={t+.2} x={1410-80*place} y={465} size={225} role="archivist" look={-1} lift={e(u,2.7,.4)} reach={place} contact={3.2*duration/8+.2} happy={run>.7}/>
  <At x={fx} y={fy} style={{transform:`rotate(${-12+360*p}deg) scale(${1-place*.42})`,opacity:1-e(u,4.65,.2)}}><SkillFile t={t} size={173}/></At>
  <BonusPackV10 t={t}/>
 </World>;
};

const ArchivedRoadmapV9:React.FC<{duration:number}>=({duration})=>{
 const t=clock(),p=e(t,.12,duration-.5),r=(a:number)=>({x:255+a*1320,y:572-Math.sin(a*Math.PI*2)*195}),v=r(p);
 const d=Array.from({length:90},(_,i)=>{const q=r(i/89);return `${i?'L':'M'}${q.x} ${q.y}`}).join(' ');
 return <World t={t} setting="map"><svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d={d} fill="none" stroke="#315F7920" strokeWidth="104" transform="translate(0,17)" strokeLinecap="round"/><path d={d} fill="none" stroke="#FFFFFFD0" strokeWidth="95" strokeLinecap="round"/><path d={d} fill="none" stroke="#D2724E77" strokeWidth="3" strokeDasharray="16 13"/><path d={d} fill="none" stroke={C.orange} strokeWidth="8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>{[.06,.49,.92].map((a,i)=>{const q=r(a);return <At key={i} x={q.x-98} y={q.y-226}><Pedestal x={-16} y={155} w={256} t={t}/><At x={30} y={-10}>{i===0?<Key t={t} size={143}/>:i===1?<Lens t={t} size={149}/>:<VideoFileV10 w={168}/>}</At><Label x={-12} y={235} size={33}>{['01 · Connect','02 · Create','03 · Compare'][i]}</Label></At>;})}<Actor t={t} x={v.x-100} y={v.y-96} size={205} role="courier" walk={Math.sin(p*Math.PI)} look={1}/><At x={863} y={101} style={{opacity:e(t,.3,.3)}}><ShotStage t={t} w={330} mode="orbit" progress={p}/></At><At x={304} y={768}><Logo name="fal.png" size={78}/></At></World>;
};

export const CompareV9:React.FC<{duration:number;revealAt:number}>=({revealAt})=><ComparisonV10 revealAt={revealAt}/>;

export const RoadmapV9=RoadmapV16;
export const GuideV9=GuideV15;
export const SkillV9=SkillSequence;
export const OutroV9=InstallFinaleV12;
