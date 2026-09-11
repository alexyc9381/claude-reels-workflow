import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ClaudeLM146Reel} from './ClaudeLM146Reel';
registerRoot(()=> <><Composition id="LM146" component={ClaudeLM146Reel} durationInFrames={1344} fps={30} width={1080} height={1920}/><Composition id="LM146TrialB" component={ClaudeLM146Reel} defaultProps={{variant:"plug"}} durationInFrames={1344} fps={30} width={1080} height={1920}/><Composition id="LM146TrialC" component={ClaudeLM146Reel} defaultProps={{variant:"assembly"}} durationInFrames={1344} fps={30} width={1080} height={1920}/></>);
