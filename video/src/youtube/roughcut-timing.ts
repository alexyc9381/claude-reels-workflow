export type RoughCutManifest = {
  version: 1;
  editVersion?: string;
  fps: number;
  cameraPlate?: {source:string;sha256:string;starts:Record<string,number>;lengths?:Record<string,number>;sources?:Record<string,string>;sourceHashes?:Record<string,string>};
  obs: {source: string; duration: number};
  cameras: {id: string; source: string; duration: number; obsOffsetSeconds: number}[];
  segments: {id: string; start: number; end: number; camera?: string; layout: 'presenter'|'screen'|'screen-presenter'; chapter: string; reason: string; screenRedaction?: 'credentials'|'billing'; teaser?: boolean}[];
};

/** Source seconds → one cumulative frame timeline for all picture, sound and chapters. */
export const roughTimeline = (m: RoughCutManifest) => {
  if(m.version!==1 || !Number.isFinite(m.fps) || m.fps<=0 || !m.segments.length) throw Error('Missing valid rough-cut manifest');
  if(!m.obs.source || !Number.isFinite(m.obs.duration) || m.obs.duration<=0) throw Error('Missing OBS master');
  let seconds=0, frame=0;
  const ids=new Set<string>();
  return m.segments.map(s=>{
    if(ids.has(s.id)) throw Error(`Duplicate segment ${s.id}`); ids.add(s.id);
    if(!Number.isFinite(s.start)||!Number.isFinite(s.end)||s.start<0||s.end<=s.start||s.end>m.obs.duration) throw Error(`Invalid OBS bounds: ${s.id}`);
    const camera=m.cameras.find(c=>c.id===s.camera);
    if(s.layout!=='screen'&&!camera) throw Error(`No camera for ${s.id}`);
    const cameraStart=camera?s.start-camera.obsOffsetSeconds:0;
    if(camera&&(cameraStart<0||s.end-camera.obsOffsetSeconds>camera.duration)) throw Error(`Camera coverage gap: ${s.id}`);
    seconds+=s.end-s.start;
    const endFrame=Math.round(seconds*m.fps), duration=endFrame-frame;
    if(duration<1)throw Error(`Sub-frame segment: ${s.id}`);
    const cameraPlateStart=m.cameraPlate?.starts[s.id]??(s.layout==='screen'?0:undefined);
    if(m.cameraPlate&&!Number.isInteger(cameraPlateStart))throw Error(`Missing camera plate mapping: ${s.id}`);
    const cameraPlateSource=m.cameraPlate?.sources?.[s.id]??m.cameraPlate?.source;
    const cameraPlateDuration=m.cameraPlate?.lengths?.[s.id];
    const row={...s,from:frame,duration,cameraSource:camera?.source,cameraStart,cameraPlateStart,cameraPlateSource,cameraPlateDuration};frame=endFrame;
    return row;
  });
};
export const roughChapters = (m: RoughCutManifest) => roughTimeline(m).filter((s,i,a)=>i===0||s.chapter!==a[i-1].chapter).map(s=>({title:s.chapter,frame:s.from,seconds:s.from/m.fps}));
