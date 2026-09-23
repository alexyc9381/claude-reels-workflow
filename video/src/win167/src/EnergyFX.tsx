import React from 'react';
import {S,clamp} from './Kit';
export type Point={x:number,y:number};
/** Brief hand-drawn contact bolts: dark ink outline, matte gold, a cream core. */
export function Bolt({t,at,from,to,dur=.26,seed=0,color='#EEC45D'}:{t:number,at:number,from:Point,to:Point,dur?:number,seed?:number,color?:string}){
 const p=clamp((t-at)/dur);if(t<at||p>=1)return null;
 const dx=to.x-from.x,dy=to.y-from.y,len=Math.hypot(dx,dy)||1;const j=Math.floor((t-at)*22);
 const pts=Array.from({length:9},(_,i)=>{const q=i/8,k=i===0||i===8?0:Math.sin(i*7.8+seed+j*1.7)*(17+Math.sin(i*2)*10);return {x:from.x+dx*q-dy/len*k,y:from.y+dy*q+dx/len*k}});
 const path=pts.map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' ');const a=pts[4];
 return <g opacity={1-S(p,.62,.38)}><path d={path} fill="none" stroke="#243F49" strokeWidth="18" strokeLinejoin="bevel"/><path d={path} fill="none" stroke={color} strokeWidth="11" strokeLinejoin="bevel"/><path d={path} fill="none" stroke="#FFF4C7" strokeWidth="4"/><path d={`M${a.x} ${a.y}l${-dy/len*43+dx/len*16} ${dx/len*43+dy/len*16}l${dx/len*29} ${dy/len*29}`} fill="none" stroke={color} strokeWidth="5"/><circle cx={from.x} cy={from.y} r={8+5*Math.sin(p*Math.PI)} fill="#FFF0B0"/><Impact t={t} at={at+.03} x={to.x} y={to.y} s={.58} dur={dur+.12}/></g>
}
export function Impact({t,at,x,y,s=1,dur=.4,color='#F0C86E'}:{t:number,at:number,x:number,y:number,s?:number,dur?:number,color?:string}){const p=clamp((t-at)/dur);if(t<at||p>=1)return null;return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1-S(p,.4,.6)}><ellipse rx={14+69*p} ry={7+24*p} fill="none" stroke={color} strokeWidth={7*(1-p)+2}/>{[0,1,2,3,4,5].map(i=>{const a=(i*60-110)*Math.PI/180;return <path key={i} d={`M${Math.cos(a)*(19+65*p)} ${Math.sin(a)*(19+65*p)}l${Math.cos(a)*17*(1-p)} ${Math.sin(a)*17*(1-p)}`} stroke={color} strokeWidth="7" strokeLinecap="round"/>})}</g>}
export function Charge({t,at,x,y,dur=.3,s=1}:{t:number,at:number,x:number,y:number,dur?:number,s?:number}){const p=clamp((t-at)/dur);if(t<at||p>=1)return null;return <g transform={`translate(${x} ${y}) scale(${s})`}>{[0,1,2,3,4].map(i=>{const a=i*1.257+p*2,r=58*(1-p)+7;return <path key={i} d={`M${Math.cos(a)*r} ${Math.sin(a)*r}l${Math.cos(a)*10} ${Math.sin(a)*10}`} stroke="#EAC25B" strokeWidth="6" strokeLinecap="round"/>})}<circle r={4+6*p} fill="#FFF1B7"/></g>}
export function Puff({t,at,x,y,s=1,color='#E2CDA5'}:{t:number,at:number,x:number,y:number,s?:number,color?:string}){const p=clamp((t-at)/.48);if(t<at||p>=1)return null;return <g opacity={1-S(p,.25,.75)}>{[-1,0,1].map((d,i)=><ellipse key={i} cx={x+d*(10+37*p)*s} cy={y-(7+27*p+i%2*14)*s} rx={(5+19*p)*s} ry={(4+14*p)*s} fill={color} stroke="#426066" strokeWidth="3"/>)}</g>}
