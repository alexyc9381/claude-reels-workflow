import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {OpeningMinuteScene} from './opening-minute-scene';
import {HalfContinuation} from './half-scenes';
import {FullTail} from './full-tail';
const labels:[[number,string],...Array<[number,string]>]=[[0,'INTRO'],[1170,'MODELS'],[2334,'EFFORT'],[3739,'ARTIFACTS'],[5574,'PROJECTS'],[6958,'CONNECTORS'],[8984,'SKILLS'],[10532,'RECAP']];
const SectionBadge=()=>{const f=useCurrentFrame(),index=labels.findLastIndex(([start])=>f>=start),[start,title]=labels[index],end=labels[index+1]?.[0]??11151;return <div style={{position:'absolute',right:75,top:45,width:277,height:57,borderRadius:12,background:'#292822',color:'#F4F1EA',fontFamily:'Arial',fontSize:22,letterSpacing:2,display:'flex',alignItems:'center',justifyContent:'center',gap:16,zIndex:100,boxShadow:'0 4px 15px #0001',overflow:'hidden'}}><span style={{color:'#DFAF91',fontSize:18}}>{String(index).padStart(2,'0')}</span>{title}<div style={{position:'absolute',bottom:0,left:0,height:4,width:(f-start)/(end-start)*100+'%',background:'#C97355'}}/></div>};
const Full=()=> <AbsoluteFill><Sequence durationInFrames={1829}><OpeningMinuteScene/></Sequence><Sequence from={1829} durationInFrames={3281}><HalfContinuation/></Sequence><Sequence from={5110} durationInFrames={464}><HalfContinuation offset={5128}/></Sequence><Sequence from={5574}><FullTail/></Sequence><Audio src={staticFile('full-animated-mix.wav')}/><SectionBadge/></AbsoluteFill>;
registerRoot(()=> <Composition id="ClaudeFullAnimated" component={Full} width={1920} height={1080} fps={30000/1001} durationInFrames={11151}/>);
