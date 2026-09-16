import React from 'react';
import {AbsoluteFill,Audio,Composition,Freeze,OffthreadVideo,Sequence,registerRoot,staticFile} from 'remotion';
import {FullPicture} from './full-picture';
import timing from './v4-timing.json';
import {CommunityEndCard} from './community-cta';
const Revision=()=> <AbsoluteFill>{timing.spans.map((s,i)=><Sequence key={i} from={s.newStart} durationInFrames={s.duration}>{s.kind==='normal'?<Sequence from={-s.oldStart}><FullPicture/></Sequence>:<><Freeze frame={6587}><FullPicture/></Freeze><div style={{position:'absolute',left:1280,top:255,width:560,height:710,borderRadius:24,overflow:'hidden'}}><OffthreadVideo muted src={staticFile('takes/055-tail.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div></>}</Sequence>)}<Sequence from={timing.frames} durationInFrames={150}><CommunityEndCard/></Sequence><Audio src={staticFile('v5-mix.wav')}/></AbsoluteFill>;
registerRoot(()=> <Composition id="ClaudeFullV6" component={Revision} width={1920} height={1080} fps={30000/1001} durationInFrames={timing.frames+150}/>);
