import {staticFile} from './assets';
import React from 'react';
import {AbsoluteFill,Audio,Img,useCurrentFrame} from 'remotion';
import {Bg,Panel,HookHeader,SectionHeader,KaraokeCaption,ProgressBar} from './SlopKit';
import {inter} from './fonts';
import {O,Label} from './EC150Kit';
import {TypingAttack,RepoAction,CreatorAction,InstallAction,DesignAction,SecurityAction,Orchestra,Unveil} from './EC150ActionPass';
import {Hook,Team,Repo,Creator,Build,Test,Reveal,CTA} from './EC150Revision';
import {MagnetHook,ZipperHook} from './EC151Hooks';
import words from '../data/ecc151-timing.json';
export const STARTS=[0,3.4,5.6,7.85,9.7,12.5,16.7,19.73,22.13,25.85,28.65,30.8,32.43];
export const NAMES=['SNAP','TEAM','ATTACK','REPO','CREATOR','INSTALL','PLAN','BUILD','SECURE','TEST','ASSEMBLE','PUBLIC','CTA'];
export const DUR=34.27;
// Explicit editorial name withholding for the early reveal; preserve the aligned source transcript.
const displayWords=words.map(w=>w.start<10 && w.word.trim()==='ECC'?{...w,word:' •••'}:w);
export const EC150:React.FC<{silent?:boolean;hookVariant?:'snap'|'magnet'|'zipper';audioSrc?:string}>=({silent=false,hookVariant='snap',audioSrc='150_ec_master.wav'})=>{const f=useCurrentFrame(),t=f/30,ix=STARTS.reduce((a,v,i)=>t>=v?i:a,0),lf=f-Math.round(STARTS[ix]*30);const scenes=[hookVariant==='magnet'?MagnetHook:hookVariant==='zipper'?ZipperHook:Hook,Team,TypingAttack,RepoAction,CreatorAction,InstallAction,DesignAction,Build,SecurityAction,Test,Orchestra,Unveil,CTA];const Comp=scenes[ix];const titles=[['',''],['63 AI AGENTS','249 SKILLS'],['SECURITY AGENT','HACKS ITS OWN CODE'],['ONE POWERFUL REPO','FREE ON GITHUB'],['BUILT IN 10 MONTHS','240,000 GITHUB STARS'],['CLAUDE CODE + CODEX','ONE SETUP PROMPT'],['PLAN THE FEATURE','plan this feature'],['GENERATE THE CODE','build it'],['FIND VULNERABILITIES','secure it'],['80% COVERAGE TARGET','test it'],['249 SKILLS','63 SPECIALISTS'],['OPENAI + ANTHROPIC','PUBLIC REPO'],['REPO + INSTALL GUIDE','COMMENT ECC']];const title=titles[ix],isCommand=ix>=6&&ix<=9,headerSize=Math.round(Math.min(49,49*22/Math.max(title[0].length,title[1].length))),badge=[3,4,11,12].includes(ix)?'github':'claude' ;return <AbsoluteFill style={{fontFamily:inter.fontFamily}}><Bg/><ProgressBar/><Panel><AbsoluteFill style={{transform:`scale(${ix===0?O(f,0,18,1,1.055):1})`,transformOrigin:'50% 60%'}}><Comp f={lf}/></AbsoluteFill></Panel>{ix===0?<HookHeader big="REPLACE ALL ENGINEERS" hot="1 REPO" f={100}/>:<SectionHeader key={ix} f={lf+3} size={headerSize} badgeBg="#FFFFFF" badgeBorder="#EDE7DB" badge={<Img src={staticFile(`logos/${badge}.svg`)} style={{width:55,height:55,objectFit:'contain'}}/>} l1={title[0]} l2={<span style={{color:'#C5603C',fontFamily:isCommand?'monospace':undefined}}>{title[1]}</span>}/>}<KaraokeCaption words={displayWords}/>{!silent&&<Audio src={staticFile(audioSrc)}/>}</AbsoluteFill>};
