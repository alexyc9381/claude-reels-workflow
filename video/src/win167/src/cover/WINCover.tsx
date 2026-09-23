import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SceneCover} from './ReelCovers';
import {Darwin} from '../DarwinKit';
import {Mascot} from '../SlopKit';
import {fontCSS} from '../fonts';
const Art=()=> <AbsoluteFill style={{background:'#F5EEDF'}}>
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
 <defs><linearGradient id="winStage" x2="0" y2="1"><stop stopColor="#263E50"/><stop offset="1" stopColor="#102631"/></linearGradient><linearGradient id="winFloor" x2="0" y2="1"><stop stopColor="#D9BD8E"/><stop offset="1" stopColor="#B99062"/></linearGradient></defs>
 <path d="M0 1390H1080V1920H0Z" fill="url(#winFloor)"/>
 <rect x="108" y="800" width="864" height="620" rx="38" fill="#6C5339" opacity=".20" transform="translate(0 19)"/>
 <rect x="108" y="800" width="864" height="620" rx="38" fill="url(#winStage)" stroke="#53606A" strokeWidth="8"/>
 <path d="M134 851H946M134 1360H946" stroke="#BDA472" strokeWidth="3" opacity=".55"/>
 <path d="M148 1345H936V1395H148Z" fill="#526573"/>
 <path d="M454 1338h130v-78h153v-93h181v228H454Z" fill="#B99357"/>
 <path d="M454 1338h130v-78h153v-93h181" fill="none" stroke="#F0D69A" strokeWidth="9"/>
 <path d="M470 1395V1350M599 1395V1274M752 1395V1180" stroke="#775C39" strokeWidth="8"/>
 <ellipse cx="304" cy="1347" rx="166" ry="20" fill="#081922" opacity=".7"/>
 <ellipse cx="509" cy="1334" rx="49" ry="8" fill="#433727" opacity=".8"/>
 <ellipse cx="650" cy="1258" rx="63" ry="9" fill="#433727" opacity=".8"/>
 <ellipse cx="828" cy="1167" rx="82" ry="10" fill="#433727" opacity=".8"/>
 <path d="M920 1075l17-12m-10 32h20M910 1057l5-20" stroke="#E7B24C" strokeWidth="7" strokeLinecap="round"/>
 </svg>
 <Darwin t={1} x={104} y={914} s={470} gaze={1} think={.5} cheer={.1} tool="lens"/>
 <div style={{position:'absolute',left:446,top:1217}}><Mascot size={128} lf={18} nodAmp={0} suit={1} glasses={1} stern={.8}/></div>
 <div style={{position:'absolute',left:566,top:1089}}><Mascot size={184} lf={18} nodAmp={0} suit={1} glasses={1} cheer={.4}/></div>
 <div style={{position:'absolute',left:703,top:924}}><Mascot size={264} lf={18} nodAmp={0} suit={1} glasses={1} cheer={1} capeC="#A74738"/></div>
 </AbsoluteFill>;
export const WINCover=()=> <><style>{fontCSS}</style><SceneCover scene={<Art/>} line1="MAKE CLAUDE" giant="EVOLVE" c2="#D2724E"/></>;
