import React from 'react';
import {AbsoluteFill} from 'remotion';

/** A warm environment, not an orange filter laid over the recorded pixels. */
export const AtmosphereV22:React.FC<{t:number}>=({t})=>{
 const p=Math.sin(t*.13),q=Math.sin(t*.09+.7);
 return <AbsoluteFill data-background="orange-peach-v22" style={{overflow:'hidden',background:'#EAA477'}}>
  <AbsoluteFill style={{background:`radial-gradient(ellipse at ${43+p*5}% ${41+q*4}%,#FFF2D8 0%,#F7E4C6 46%,transparent 87%),radial-gradient(ellipse at ${96-q*3}% 89%,#CB784D 0%,#D99669 21%,transparent 67%),linear-gradient(135deg,#E7AC7C,#F2D5AC 55%,#C7784D)`}}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 100%,#B5572D32,transparent 68%)',transform:`translateX(${p*35}px) scale(1.06)`}}/>
 </AbsoluteFill>;
};
