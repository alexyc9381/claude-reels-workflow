import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ClaudeECCReel,DUR} from './ClaudeECCReel';
registerRoot(()=> <Composition id="ECC151" component={ClaudeECCReel} durationInFrames={Math.ceil(DUR*30)} fps={30} width={1080} height={1920}/>);
