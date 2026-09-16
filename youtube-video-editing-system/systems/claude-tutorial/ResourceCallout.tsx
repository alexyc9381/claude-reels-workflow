import React from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from './interaction';
import {theme} from './theme';
// Place inside the spoken timeline. This component never extends a composition.
export const ResourceCallout=({startFrame,endFrameExclusive}:{startFrame:number;endFrameExclusive:number})=>{
 const f=useCurrentFrame();
 if(f<startFrame||f>=endFrameExclusive)return null;
 return <div style={{position:'absolute',left:80,right:80,bottom:24,padding:'18px 30px',borderRadius:14,background:theme.ink,color:theme.paper,fontFamily:theme.body,fontSize:28,opacity:progress(f,startFrame,startFrame+10)}}>
  <b style={{color:theme.peach}}>Free resource</b> · Link in the description ↓
 </div>;
};
