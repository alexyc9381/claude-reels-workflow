import React from 'react';
import {Freeze,OffthreadVideo,staticFile,useCurrentFrame} from 'remotion';
/** v7 uses a per-frame Apple Vision person matte baked into a silent camera
 * plate. The sharp foreground comes from the original frame, not a fixed oval.
 * start is the explicit manifest-mapped offset into the original v7 plate.
 * Later trims may reuse exact subsets without re-encoding the sharp subject. */
export const CameraPlate:React.FC<{source:string;start:number;length?:number;style:React.CSSProperties}>=({source,start,length,style})=>{
 const frame=useCurrentFrame();
 // A changed cumulative EDL can require one additional rounded frame. Hold
 // only that boundary frame; never sample the next, unrelated baked shot.
 return <Freeze frame={Math.max(0,(length??1)-1)} active={length!==undefined&&frame>=length}><OffthreadVideo data-person-aware-camera src={staticFile(source)} startFrom={start} muted style={style}/></Freeze>;
};
