import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {OCReel,TOTAL} from './ClaudeOCReel';
registerRoot(()=> <Composition id="OC" component={OCReel} durationInFrames={TOTAL} width={1080} height={1920} fps={30}/>);
