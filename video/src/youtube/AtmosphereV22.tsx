import React from 'react';
import {AbsoluteFill} from 'remotion';

/** A warm environment, not an orange filter laid over the recorded pixels. */
export const AtmosphereV22:React.FC<{t:number}>=({t})=>{
 const p=Math.sin(t*.13),q=Math.sin(t*.09+.7);
 return <AbsoluteFill data-background="orange-peach-v22" style={{overflow:'hidden',background:'#EAA477'}}>
  <AbsoluteFill style={{background:`radial-gradient(ellipse at ${34+p*7}% ${28+q*5}%,#FFE3BF 0%,#F7BF92 43%,transparent 78%),radial-gradient(ellipse at ${92-q*6}% 80%,#C5683F 0%,#D87B4B 29%,transparent 68%),linear-gradient(135deg,#E59863,#F2B482 52%,#B95A36)`}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 100%,#B5572D32,transparent 68%)',transform:`translateX(${p*35}px) scale(1.06)`}}/>
 </AbsoluteFill>;
};
