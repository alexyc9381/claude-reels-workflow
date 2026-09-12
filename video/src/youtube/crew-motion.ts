import {naturalHop,easeInOut} from './glass-motion';
import {blendFace,facePresets,hopFace} from './face-motion';
export type CrewRole='courier'|'operator'|'archivist';
export type CrewAction='work'|'carry'|'direct'|'celebrate';
/** Secondary acting never stops when the main landing settles. Each role has
 * its own work rhythm, eye lead and costume follow-through; no random clocks. */
export const crewPose=(t:number,role:CrewRole,at:number,lift:number,travel:number,action:CrewAction)=>{
 const phase=t*(role==='operator'?6.2:role==='courier'?4.7:3.5)+(role==='archivist'?1.3:0);
 const p=naturalHop(t,at,.8,lift),working=action==='work'?1:action==='direct'?.65:.25;
 const breathing=Math.sin(t*2.4)*.012;
 p.sy+=breathing;p.sx-=breathing*.5;
 p.tilt+=Math.sin(phase*.5)*(travel?4:working*2.5);
 p.armSwing+=Math.sin(phase)*(travel?18:working*13);
 const target=action==='celebrate'?facePresets.pleased:action==='carry'?facePresets.alert:role==='operator'?facePresets.focused:facePresets.curious;
 const face=blendFace(hopFace(t,at,.8),target,easeInOut(t,at+1.4,.55));
 face.gazeX+=(action==='direct'?4:2)*Math.sin(t*1.7);
 const blink=1-.87*(easeInOut(t%3.9,3.55,.075)-easeInOut(t%3.9,3.67,.1));
 face.leftOpen*=blink;face.rightOpen*=blink;
 return {pose:p,face,gesture:.55+Math.sin(phase-.35)*.45,cheer:action==='celebrate'?.55+.2*Math.sin(phase):action==='carry'?.24:0};
};
