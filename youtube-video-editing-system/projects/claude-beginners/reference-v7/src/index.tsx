import React from 'react';
import {AbsoluteFill,Audio,Composition,OffthreadVideo,Sequence,registerRoot,staticFile} from 'remotion';
import edit from './edit.json';
// Each proxy is a frame-exact camera range from the source EDL.
// The continuous WAV uses the same cumulative frame boundaries and only Alex's voiceover.
let cursor=0;
const timeline=edit.segments.map((s,i)=>{const from=cursor;cursor+=s.sourceEndFrame-s.sourceStartFrame;return {...s,from,index:i,durationInFrames:cursor-from};});
const Film=()=> <AbsoluteFill style={{backgroundColor:'black'}}>
 {timeline.map(s=><Sequence key={s.index} name={s.label} from={s.from} durationInFrames={s.durationInFrames}>
  <OffthreadVideo src={staticFile(`takes/${String(s.index).padStart(3,'0')}.mp4`)} muted style={{width:'100%',height:'100%',objectFit:'contain'}}/>
 </Sequence>)}
 <Audio src={staticFile('dialogue.wav')}/>
</AbsoluteFill>;
registerRoot(()=> <Composition id="ClaudeBeginnersFirstCut" component={Film} width={1920} height={1080} fps={edit.outputFps} durationInFrames={cursor}/>);
