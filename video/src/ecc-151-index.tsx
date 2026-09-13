import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ClaudeECCReel,DUR} from './ClaudeECCReel';
registerRoot(()=> <><Composition id="ECC151" component={ClaudeECCReel} durationInFrames={Math.ceil(DUR*30)} fps={30} width={1080} height={1920}/>{(['magnet','zipper'] as const).map(hookVariant=><Composition key={hookVariant} id={hookVariant==='magnet'?'ECC151B':'ECC151C'} component={ClaudeECCReel} defaultProps={{hookVariant,audioSrc:`151_${hookVariant}_master.wav`}} durationInFrames={Math.ceil(DUR*30)} fps={30} width={1080} height={1920}/>)}</>);
