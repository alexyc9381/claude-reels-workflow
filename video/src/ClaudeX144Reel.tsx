import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Bg,Panel,ProgressBar,KaraokeCaption,HookHeader} from './SlopKit';
import {SCENES} from './X144Scenes';
import {ease} from './X144World';
import words from './data/words_x144.json';
export const X144_TOTAL=1370;
export const L=[0,122,211,311,418,521,586,617,731,848,907,980,1103,1168,1245,1304];
const headers=[
 ['YOUR PDF IS','EATING CLAUDE TOKENS'],['CLAUDE READS','THE WHOLE FILE'],['THE HIDDEN LOAD','INSIDE EVERY PDF'],['ONE PDF PAGE','1,500–3,000 TOKENS'],['20 PAGES','ONE BIG CONTEXT BILL'],['NO QUESTION YET','THE COST IS ALREADY IN'],['THE FREE FIX','CHANGE THE INPUT'],['MICROSOFT’S','MARKITDOWN'],['ALL THESE FORMATS','ONE CONVERTER'],['KEEP THE STRUCTURE','DROP THE EXTRA WEIGHT'],['FEWER INPUT TOKENS','MORE ROOM TO WORK'],['STRUCTURED INPUT','CLEARER CONTEXT'],['MARKITDOWN + MCP','ONE DIRECT CONNECTION'],['INSIDE CLAUDE','CALL THE CONVERTER'],['YOUR FILE','CLEAN MARKDOWN'],['GET THE WORKFLOW','COMMENT X']];
const Shot:React.FC<{i:number,dur:number}>=({i,dur})=>{
 const f=useCurrentFrame();const Body=SCENES[i];let scale=1,x=0,y=0;
 // Reframe for the next object of attention. Each move has a story trigger;
 // headers and captions stay anchored in the original house chassis.
 if(i===0){const pull=ease(f,19,35),fix=ease(f,81,95);scale=1+.09*pull-.055*fix;x=-32*pull+22*fix;}
 if(i===5){const receipt=ease(f,42,57);scale=1+.11*receipt;x=-31*receipt;y=-11*receipt;}
 return <Panel><div style={{position:'absolute',inset:0,transform:`translate(${x}px,${y}px) scale(${scale})`,transformOrigin:'50% 53%'}}><Body f={f} dur={dur}/></div></Panel>
};
export const X144Reel:React.FC<{silent?:boolean}>=({silent=false})=>{const f=useCurrentFrame();let index=0;L.forEach((x,i)=>{if(f>=x)index=i});return <AbsoluteFill><Bg/>{!silent&&<Audio src={staticFile('x144_mix.wav')}/>}{L.map((start,i)=><Sequence key={i} from={start} durationInFrames={(L[i+1]??X144_TOTAL)-start}><Shot i={i} dur={(L[i+1]??X144_TOTAL)-start}/></Sequence>)}<ProgressBar/><KaraokeCaption words={words} fps={30} top={1268}/><HookHeader big={headers[index][0]} hot={headers[index][1]} f={f-L[index]+15}/></AbsoluteFill>};
export const X144Silent=()=> <X144Reel silent/>;
