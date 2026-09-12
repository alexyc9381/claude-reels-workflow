import {easeInOut} from './glass-motion';

/** Source-pixel bounds measured from the actual 1920×1080 OBS recording. */
export const inputBounds={left:680,top:907,right:1500,bottom:998};
export const sourceCrop={left:0,top:32,right:1920,bottom:1002};
export const screenViewport={x:80,y:78,w:1760,h:1760*(1002-32)/1920};
const windows:Record<string,{at:number;hold:number;zoom:number}>={
 s020:{at:14,hold:6,zoom:1.55},s021:{at:10,hold:22,zoom:1.7},
 s023:{at:.4,hold:5.8,zoom:1.6},s024:{at:3,hold:7.5,zoom:1.6},
 s025:{at:0,hold:2.6,zoom:1.55},s027:{at:8,hold:6.4,zoom:1.65},
 s030:{at:24,hold:9.1,zoom:1.65},s031:{at:.4,hold:6,zoom:1.6},
};
export const typingFocus=(id:string,t:number)=>{
 const q=windows[id];
 const p=q?easeInOut(t,q.at,.95)*(1-easeInOut(t,q.at+q.hold,.85)):0;
 return {strength:p,zoom:1+(q?(q.zoom-1)*p:0)};
};
const limit=(n:number,a:number,b:number)=>Math.min(b,Math.max(a,n));
/** Explicit translation, rather than CSS pivot zoom, keeps all four input corners safe. */
export const screenTransform=(zoom:number,x=1090,y=820,protectInput=true)=>{
 const {w,h}=screenViewport,k=w/1920,pad=2;
 let tx=limit(w/2-x*k*zoom,w-w*zoom,0);
 let ty=limit(h*.58-(y-sourceCrop.top)*k*zoom,h-h*zoom,0);
 if(protectInput){
  tx=limit(tx,Math.max(w-w*zoom,pad-inputBounds.left*k*zoom),Math.min(0,w-pad-inputBounds.right*k*zoom));
  ty=limit(ty,Math.max(h-h*zoom,pad-(inputBounds.top-sourceCrop.top)*k*zoom),Math.min(0,h-pad-(inputBounds.bottom-sourceCrop.top)*k*zoom));
 }
 return {zoom,tx,ty};
};
