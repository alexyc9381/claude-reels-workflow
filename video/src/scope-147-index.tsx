import React from 'react';
import {AbsoluteFill,Audio,Composition,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {Bg,Panel,HookHeader,KaraokeCaption,ProgressBar} from './SlopKit';
import * as S from './scope147/Scenes';
import words from './data/words_scope147.json';
export const SHOTS=[
 {at:0,name:'hook',big:'The shape of',hot:'AI writing',component:S.Hook},
 {at:3.6,name:'detector',big:'Structure gives',hot:'AI away',component:S.Detector},
 {at:8.15,name:'team',big:'Inside the',hot:'research',component:S.Team},
 {at:9.7,name:'corpus',big:'A test of',hot:'61,608 stories',component:S.Corpus},
 {at:11.6,name:'tokens',big:'It’s not',hot:'the vocabulary',component:S.Tokens},
 {at:16.87,name:'clean',big:'AI writing is',hot:'too clean',component:S.Clean},
 {at:20.1,name:'explain',big:'It explains',hot:'everything',component:S.Explain},
 {at:23.05,name:'themes',big:'The narrator',hot:'gives it away',component:S.Themes},
 {at:28.23,name:'tension',big:'Claude skips',hot:'the tension',component:S.Tension},
 {at:31.05,name:'gossip',big:'GPT reaches for',hot:'gossip',component:S.Gossip},
 {at:33.8,name:'dark',big:'Gemini goes',hot:'dark',component:S.Dark},
 {at:37.14,name:'paper',big:'Turn findings into',hot:'rules',component:S.ResearchUI},
 {at:41,name:'bind',big:'Keep the rule.',hot:'Every time.',component:S.Bind},
 {at:42.07,name:'skill',big:'Make it a',hot:'permanent skill',component:S.SkillUI},
 {at:44.3,name:'library',big:'Save it once.',hot:'Human Scope',component:S.Library},
 {at:47.06,name:'command',big:'One command.',hot:'Every writing task.',component:S.Command},
 {at:48.57,name:'activate',big:'Load the skill.',hot:'Start writing.',component:S.Activate},
 {at:50.07,name:'transform',big:'Let the story',hot:'breathe',component:S.Transform},
 {at:53.07,name:'cta',big:'Get the paper',hot:'+ Human Scope',component:S.CTA},
];
export const TOTAL=1705;
export const Reel:React.FC=()=>{
 const f=useCurrentFrame();const i=SHOTS.reduce((a,s,j)=>f>=Math.round(s.at*30)?j:a,0);const shot=SHOTS[i];const local=f-Math.round(shot.at*30);const Scene=shot.component;
 const moves:Record<string,[number,number,number,string]>={skill:[0,65,1.09,'60% 55%'],transform:[0,88,1.10,'50% 55%'],cta:[0,111,1.08,'55% 53%'],paper:[35,110,1.19,'60% 51%'],dark:[0,99,1.12,'67% 51%'],tension:[10,65,1.17,'52% 46%'],clean:[36,54,1.15,'63% 45%'],detector:[5,126,1.075,'52% 46%'],tokens:[16,125,1.20,'55% 48%'],explain:[28,45,1.12,'61% 46%'],themes:[10,130,1.20,'64% 46%'],gossip:[57,23,1.13,'75% 50%'],};
 const move=moves[shot.name]; const scale=shot.name==='tokens'?1+Math.min(1,Math.max(0,(local-10)/147))*.20:move?S.e(local,move[0],move[1],1,move[2]):1;
 let big=shot.big,hot=shot.hot;
 if(i===0&&local>=53){big='The shape of';hot='human writing';}
 if(i===4&&local>99){big='It’s the';hot='story structure';}
 return <AbsoluteFill><Bg/><Audio src={staticFile('scope147/mix.wav')}/><ProgressBar/><Panel><div style={{position:"absolute",inset:0,transform:`scale(${scale})`,transformOrigin:move?move[3]:"center"}}><Scene f={local}/></div></Panel><HookHeader big={big.toUpperCase()} hot={hot.toUpperCase()} f={30}/><KaraokeCaption words={words}/></AbsoluteFill>;
};
registerRoot(()=> <Composition id="scope-147" component={Reel} durationInFrames={TOTAL} fps={30} width={1080} height={1920}/>);
