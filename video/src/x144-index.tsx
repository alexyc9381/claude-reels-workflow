import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {X144Reel,X144Silent,X144_TOTAL} from './ClaudeX144Reel';
const Root=()=> <><Composition id="X144" component={X144Reel} durationInFrames={X144_TOTAL} fps={30} width={1080} height={1920}/><Composition id="X144Silent" component={X144Silent} durationInFrames={X144_TOTAL} fps={30} width={1080} height={1920}/></>;
registerRoot(Root);
