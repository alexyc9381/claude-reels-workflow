import React from 'react';
import {Img,staticFile} from 'remotion';
import {P,pulse} from './Kit';
// Physical Claude identity plaques sit in open scenery, never over faces or caption space.
export function ClaudeContext({i,t}:{i:number,t:number}){
 const places:Record<number,[number,number,number]>={1:[862,204,102],4:[772,193,106],5:[884,168,94],6:[878,658,90],9:[820,184,106],10:[256,182,106],11:[819,177,112]};
 const pos=places[i];if(!pos)return null;
 const [x,y,s]=pos;
 return <P x={x} y={y} w={s} h={s} style={{background:'#FFF1D9',border:'5px solid #B7784C',borderRadius:20,boxSizing:'border-box',boxShadow:'0 7px 0 #142B3A77',transform:`rotate(${-4+6*pulse(t,.05,.35)}deg)`}}><Img src={staticFile('claude_logo.png')} style={{width:'100%',height:'100%',padding:12,boxSizing:'border-box',objectFit:'contain'}}/></P>;
}
