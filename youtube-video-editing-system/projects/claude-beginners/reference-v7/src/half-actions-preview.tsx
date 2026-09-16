import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,registerRoot,staticFile} from 'remotion';
import {OpeningMinuteScene} from './opening-minute-scene';
import {HalfContinuation} from './half-scenes';
const Half=()=> <AbsoluteFill><Sequence durationInFrames={1829}><OpeningMinuteScene/></Sequence><Sequence from={1829} durationInFrames={3281}><HalfContinuation/></Sequence><Sequence from={5110}><HalfContinuation offset={5128}/></Sequence><Audio src={staticFile('half-actions-mix.wav')}/></AbsoluteFill>;
registerRoot(()=> <Composition id="ClaudeHalfActions" component={Half} width={1920} height={1080} fps={30000/1001} durationInFrames={5574}/>);
