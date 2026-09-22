import React from 'react';
import {Img,staticFile} from 'remotion';
import {Mascot} from './SlopKit';
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const E=(t:number,a:number,d:number)=>1-Math.pow(1-clamp((t-a)/d),3);
export const S=(t:number,a:number,d:number)=>{const p=clamp((t-a)/d);return p*p*(3-2*p)};
export const PULSE=(t:number,a:number,d=.25)=>Math.sin(clamp((t-a)/d)*Math.PI);
export const settle=(t:number,a:number,m=8)=>t<a?0:Math.sin((t-a)*27)*Math.exp(-(t-a)*9)*m;
export const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
export const P=({x=0,y=0,w,h,style={},children}:{x?:number,y?:number,w?:number,h?:number,style?:React.CSSProperties,children?:React.ReactNode})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,...style}}>{children}</div>;
export const T=({x=0,y=0,w,size=30,c='#FAF4E6',children,style={}}:{x?:number,y?:number,w?:number,size?:number,c?:string,children?:React.ReactNode,style?:React.CSSProperties})=><P x={x} y={y} w={w} style={{fontFamily:'Inter',fontSize:size,fontWeight:850,lineHeight:1.1,color:c,...style}}>{children}</P>;
export function Logo({name,size=70}:{name:string,size?:number}){const ext=['openai','openshorts'].includes(name)?'png':'svg';return <Img src={staticFile(`logos/${name}.${ext}`)} style={{width:size,height:size,objectFit:'contain',mixBlendMode:name==='openai'?'multiply':undefined}}/>}
export function Mark({name,x,y,s=82,scale=1}:{name:string,x:number,y:number,s?:number,scale?:number}){return <P x={x} y={y} w={s} h={s} style={{background:'#fff',borderRadius:s*.22,padding:s*.14,boxSizing:'border-box',boxShadow:'0 9px 0 #04182460',transform:`scale(${scale})`}}><Logo name={name} size={s*.72}/></P>}
export const Clay=({t,x,y,size=280,rot=0,sx=1,sy=1,gaze=0,shock=0,cheer=0,stern=0,role='',walk=false}:{t:number,x:number,y:number,size?:number,rot?:number,sx?:number,sy?:number,gaze?:number,shock?:number,cheer?:number,stern?:number,role?:string,walk?:boolean})=><P x={x} y={y} w={size} h={size} style={{transform:`rotate(${rot}deg) scale(${sx},${sy})`,transformOrigin:'50% 90%',filter:'drop-shadow(0 11px 0 #03192235)'}}><Mascot lf={walk?t*30+10:18+t*8} size={size} nodAmp={walk?3:0} nodSpeed={5} gaze={gaze} shock={shock} cheer={cheer} stern={stern} {...(role==='writer'?{glasses:1,prof:1}:role==='engineer'?{constr:1}:role==='director'?{glasses:1,suit:1}:role==='wizard'?{wizard:1}:{})}/></P>;
