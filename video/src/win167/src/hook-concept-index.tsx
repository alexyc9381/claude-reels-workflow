import React from 'react';
import {AbsoluteFill,Audio,Composition,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {Bg,Panel,HookHeader,ProgressBar,KaraokeCaption} from './SlopKit';
import {DarwinBossHook} from './DarwinBossHook';
import {fontCSS} from './fonts';
import words from './words.json';
function Preview(){const f=useCurrentFrame();return <AbsoluteFill><style>{fontCSS}</style><Bg/><Panel><DarwinBossHook t={f/30}/></Panel><HookHeader big="DARWIN PROMPT =" hot="20X CLAUDE" f={30}/><ProgressBar/><KaraokeCaption words={words}/><Audio src={staticFile('hook-clear.wav')}/></AbsoluteFill>}
registerRoot(()=> <Composition id="HookPreview" component={Preview} durationInFrames={817} fps={30} width={1080} height={1920}/>);
