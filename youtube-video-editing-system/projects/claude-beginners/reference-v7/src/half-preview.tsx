import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,registerRoot,staticFile} from 'remotion';
import {OpeningMinuteScene} from './opening-minute-scene';
import {HalfContinuation} from './half-scenes';
const Half=()=> <AbsoluteFill><Sequence durationInFrames={1829}><OpeningMinuteScene/></Sequence><Sequence from={1829}><HalfContinuation/></Sequence><Audio src={staticFile('half-mix.wav')}/></AbsoluteFill>;
registerRoot(()=> <Composition id="ClaudeHalf" component={Half} width={1920} height={1080} fps={30000/1001} durationInFrames={5592}/>);
