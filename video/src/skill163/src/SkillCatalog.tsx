import React from 'react';
import {S,P} from './Visuals';
import {BuilderSkill} from './BuilderSkill';
export function SkillCatalog({t}:{t:number}){
 const gather=S(t,1.18,.49),fade=1-S(t,1.25,.20);
 return <P x={343} y={318} w={650} h={362} style={{opacity:fade,transform:`scale(${.96+.04*S(t,0,.75)})`,transformOrigin:'50% 60%'}}>
  <svg width="650" height="362" style={{position:'absolute',overflow:'hidden',opacity:.65*(1-gather)}}>{Array.from({length:65},(_,i)=>{const row=Math.floor(i/13),col=i%13,x=((col*61+(row%2?1:-1)*t*125+900)%800)-90;return <g key={i} transform={`translate(${x} ${row*75-15})`}><path d="M0 0H33L46 13V61H0Z" fill={['#E8C47E','#92C9B7','#B9A6D0'][i%3]} stroke="#1A5260" strokeWidth="3"/><path d="M33 0V13H46M9 23H35M9 33H35M9 43H27" fill="none" stroke="#325C64" strokeWidth="3"/></g>})}</svg>
  {Array.from({length:6},(_,i)=>{const col=i%3,row=Math.floor(i/3),x=30+col*200+Math.sin(t*4+row)*17,y=-7+row*172-19*Math.sin(t*3+col*.35);return <BuilderSkill key={i} x={x+(col*210-x)*gather} y={y+(66-y)*gather} w={166-56*gather} kind={col} t={t+.5+i*.12} rot={-7+col*7+Math.sin(t*4+row)*4}/>})}
 </P>
}
