import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {Bg,Panel,HookHeader,ProgressBar,KaraokeCaption} from './SlopKit';
import {fontCSS} from './fonts';
import words from './words.json';
import {MutationWorkshop} from './MutationWorkshop';
import {ClaudeContext} from './ClaudeContext';
import * as Scenes from './FinchScenes';
import * as Payoff from './DramaticPayoffScenes';
import {Build as DramaticBuild} from './DramaticBuildScene';
import * as Lineage from './LineageScenes';
import * as Evolve from './EvolutionActionScenes';
import * as Support from './SupportingActionScenes';
import {DarwinBossHook} from './DarwinBossHook';
import {SurvivalSnap,InheritanceSlingshot} from './TrialHooks';
import {WINCover} from './cover/WINCover';
const cuts=[0,92,139,202,236,286,391,484,570,651,690,794,826];
const scenes=[DarwinBossHook,DramaticBuild,Scenes.Boris,Scenes.Reveal,Support.Chat,Lineage.Test,Lineage.ThirdLine,MutationWorkshop,Evolve.Repeat,Payoff.Tokens,Payoff.Draft,Scenes.CTA];
const headers=[['DARWIN PROMPT =','20X CLAUDE'],['ONE PROMPT','THREE APPROACHES'],['BORIS CHERNY','CREATOR OF CLAUDE CODE'],['BETTER EACH ROUND','THE DARWIN LOOP'],['STOP THE','ENDLESS REPLIES'],['THREE APPROACHES','ONE WINNER'],['KEEP THE WINNER','EVOLVE FROM THAT'],['EVOLVE THE WINNER','THREE NEW VARIATIONS'],['NEXT GENERATION','A STRONGER WINNER'],['MORE BRANCHES','MORE TOKENS'],['BUILD A DRAFT','THEN EVOLVE IT'],['WANT THE PROMPT?','COMMENT WIN']];
function Shot({i,variant='A'}:{i:number,variant?:string}){const f=useCurrentFrame();const Comp=i===0&&variant!=='A'?(variant==='B'?SurvivalSnap:InheritanceSlingshot):scenes[i];return <><Panel><Comp t={f/30*(i===4?41/50:1)}/><ClaudeContext i={i} t={f/30}/></Panel><HookHeader big={headers[i][0]} hot={i===3&&f<14?'A DIFFERENT WAY TO WORK':headers[i][1]} f={30}/></>}
export function WIN({variant='A'}:{variant?:string}){return <AbsoluteFill><style>{fontCSS}</style><Bg/>{scenes.map((_,i)=><Sequence key={i} from={cuts[i]} durationInFrames={cuts[i+1]-cuts[i]}><Shot i={i} variant={variant}/></Sequence>)}<ProgressBar/><KaraokeCaption words={words}/><Audio src={staticFile(variant==='A'?'master-overhaul.wav':`master-trial-${variant}.wav`)}/></AbsoluteFill>}
function Cover(){return <AbsoluteFill><style>{fontCSS}</style><Bg/><Panel><Scenes.Hook t={1.8}/></Panel><HookHeader big="CLAUDE VS CLAUDE" hot="THE DARWIN LOOP" f={30}/><div style={{position:'absolute',top:1268,width:'100%',textAlign:'center',fontFamily:'Fraunces',fontWeight:900,fontSize:83,color:'#B8501F'}}>EVOLVE THE WINNER.</div></AbsoluteFill>}
registerRoot(()=> <><Composition id="WIN" component={WIN} durationInFrames={826} fps={30} width={1080} height={1920}/><Composition id="WIN-B" component={WIN} defaultProps={{variant:"B"}} durationInFrames={826} fps={30} width={1080} height={1920}/><Composition id="WIN-C" component={WIN} defaultProps={{variant:"C"}} durationInFrames={826} fps={30} width={1080} height={1920}/><Composition id="WIN-Cover" component={WINCover} durationInFrames={1} fps={30} width={1080} height={1920}/></>);
