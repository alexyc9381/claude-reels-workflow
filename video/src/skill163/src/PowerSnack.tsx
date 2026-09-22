import React from 'react';
import {P,T,S,PULSE} from './Visuals';
// A hand carries the power-up into the open mouth; power only begins after contact.
export function PowerSnack({t}:{t:number}){
 const reach=S(t,.14,.40),bite=S(t,.51,.19),w=154*(1-.91*bite),cx=722-283*reach,cy=430+98*reach-35*Math.sin(reach*Math.PI);
 return <>
  <svg width="1012" height="792" style={{position:'absolute'}}><path d={`M635 477Q${664-150*reach} ${523-16*reach} ${cx+24} ${cy+49*(1-bite)}`} fill="none" stroke="#D97757" strokeWidth="44" strokeLinecap="square" opacity={1-S(t,.64,.12)}/><path d={`M635 471Q${664-150*reach} ${517-16*reach} ${cx+24} ${cy+43*(1-bite)}`} fill="none" stroke="#E49C7C" strokeWidth="10" opacity={1-S(t,.64,.12)}/></svg>
  <P x={cx-w/2} y={cy-w/2} w={w} h={w} style={{opacity:1-S(t,.66,.06),transform:`rotate(${-14+22*reach}deg)`,filter:'drop-shadow(0 0 17px #F8D767)'}}><svg width="100%" height="100%" viewBox="0 0 160 160"><path d="M25 8H136L151 24V134L134 151H24L8 135V25Z" fill="#F2C85C" stroke="#FFF4CD" strokeWidth="8"/><path d="M28 30H130V129H28Z" fill="#256D72"/><path d="M85 39L50 89H75L67 117L115 66H87L99 39Z" fill="#FFF1A1"/><text x="80" y="146" textAnchor="middle" fontFamily="Inter" fontSize="17" fontWeight="900" fill="#254F55">SKILL</text></svg></P>
  <T x={655} y={294} size={30} c="#FFF0B5" style={{opacity:1-S(t,.18,.23),textShadow:'0 3px #123C4D'}}>POWER-UP</T>
 </>
}
