import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {RoughCut} from './youtube/RoughCut';
import {roughTimeline,type RoughCutManifest} from './youtube/roughcut-timing';
const empty:RoughCutManifest={version:1,fps:30,obs:{source:'obs.mp4',duration:2467.5},cameras:[],segments:[]};
const Root=()=> <Composition id="HiggsfieldRoughCut" component={RoughCut} defaultProps={{manifest:empty}} width={1920} height={1080} fps={30} durationInFrames={1} calculateMetadata={({props})=>{
 const t=roughTimeline(props.manifest);return {durationInFrames:t[t.length-1].from+t[t.length-1].duration,fps:props.manifest.fps};
}}/>;
registerRoot(Root);
