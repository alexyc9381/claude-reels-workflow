import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
import {Chat,ThirdLine} from './SupportingActionScenes';
function C(){return <Chat t={useCurrentFrame()/30}/>}; function M(){return <ThirdLine t={useCurrentFrame()/30}/>};
registerRoot(()=> <><Composition id="Chat" component={C} width={1012} height={792} fps={30} durationInFrames={41}/><Composition id="Mirror" component={M} width={1012} height={792} fps={30} durationInFrames={93}/></>);
