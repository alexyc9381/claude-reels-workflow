import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ClaudeLM146Reel} from './ClaudeLM146Reel';
registerRoot(()=> <Composition id="LM146" component={ClaudeLM146Reel} durationInFrames={1368} fps={30} width={1080} height={1920}/>);
