import React from 'react';
import {AbsoluteFill,Audio,Composition,registerRoot,Sequence,useCurrentFrame,staticFile} from 'remotion';
import {Bg,Panel,HookHeader,ProgressBar} from './SlopKit';
import {fontCSS} from './fonts';
import groups from './groups.json';
import * as C from './Scenes';
export const SCENES=[
{a:0,b:76,id:'hook',h:['3 SKILLS TO','10X CLAUDE'],C:C.Hook},
{a:76,b:259,id:'library',h:['FIND THE RIGHT SKILLS','ANTHROPIC LIBRARY'],C:C.Library},
{a:259,b:429,id:'superpowers',h:['PLAN. BUILD. CHECK.','SUPERPOWERS'],C:C.Plan},
{a:429,b:596,id:'memory',h:['PICK UP WHERE YOU LEFT OFF','CLAUDE-MEM'],C:C.Memory},
{a:596,b:655,id:'cta',h:['GET THE LIST','100 FREE SKILLS'],C:C.CTA},
];
function Local({C}:{C:React.ComponentType<{t:number}>}){return <C t={useCurrentFrame()/30}/>}
function Captions(){const t=useCurrentFrame()/30;let i=0;for(let j=1;j<groups.length;j++){if(t>=Math.max(groups[j][0].start-.025,groups[j-1].at(-1)!.end))i=j;}return <div style={{position:'absolute',left:70,top:1268,width:940,display:'flex',justifyContent:'center',alignItems:'baseline',gap:27,fontFamily:'Fraunces',fontSize:84,fontWeight:900,lineHeight:1.15,whiteSpace:'nowrap'}}>{groups[i].map((v,j)=>{const active=t>=v.start-.025&&t<v.end;return <span key={i+'-'+j} style={{visibility:v.word==='SKILL.'&&t<21.405?'hidden':'visible',color:active?'#C45E39':t>=v.end?'#B46643':'#C17D59',transform:`translateY(${active?-5:0}px) scale(${active?1.035:1})`,transformOrigin:'50% 100%'}}>{v.word}</span>})}</div>}
export function Reel(){const f=useCurrentFrame();const s=SCENES.find(s=>f>=s.a&&f<s.b)||SCENES.at(-1)!;return <AbsoluteFill style={{background:'#ECE9E2'}}><style>{fontCSS}</style><Bg/><Audio src={staticFile('master.wav')}/><ProgressBar/><Panel>{SCENES.map(s=><Sequence key={s.id} from={s.a} durationInFrames={s.b-s.a} layout="none"><Local C={s.C}/></Sequence>)}</Panel><HookHeader f={100} big={s.h[0]} hot={s.h[1]}/><Captions/></AbsoluteFill>}
registerRoot(()=> <Composition id="SKILL163" component={Reel} durationInFrames={655} fps={30} width={1080} height={1920}/>);
