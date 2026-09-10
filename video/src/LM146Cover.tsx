import React from 'react';
import {SceneCover} from '../../cover-system/src/ReelCovers';
import {Mascot} from './SlopKit';
import {inter} from './fonts';
export const LM146Cover:React.FC=()=> <SceneCover line1="Your computer." giant="LOCAL AI" giantSize={148} c2="#C9613E" scene={<>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 55% 35%,#FFF9EE,#E8DEC9)'}}/>
 <svg width="1080" height="1920" style={{position:'absolute',inset:0}}>
 <defs><linearGradient id="wall" x2="0" y2="1"><stop stopColor="#E5DDCE"/><stop offset="1" stopColor="#B9AC96"/></linearGradient><linearGradient id="metal" x2="0" y2="1"><stop stopColor="#C5CCD3"/><stop offset=".35" stopColor="#7E8C9D"/><stop offset="1" stopColor="#35455B"/></linearGradient><linearGradient id="display" x2="1" y2="1"><stop stopColor="#26334C"/><stop offset="1" stopColor="#0B1220"/></linearGradient><linearGradient id="model" x2=".6" y2="1"><stop stopColor="#9A83FF"/><stop offset="1" stopColor="#5132D4"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="17"/></filter></defs>
 <path d="M0 1035H1080V1450H0Z" fill="url(#wall)"/>
 <path d="M0 1430H1080V1920H0Z" fill="#BDA27D"/>
 <path d="M0 1492H1080V1512H0Z" fill="#A28460"/>
 <ellipse cx="585" cy="1408" rx="410" ry="36" fill="#30333E" opacity=".28" filter="url(#shadow)"/>
 <rect x="138" y="844" width="800" height="487" rx="39" fill="#354050"/>
 <rect x="154" y="858" width="768" height="454" rx="28" fill="url(#display)" stroke="#647287" strokeWidth="3"/>
 <circle cx="538" cy="873" r="5" fill="#8996A8"/>
 <text x="202" y="924" fill="#CCD6E8" fontFamily={inter.fontFamily} fontWeight="700" fontSize="24">LM STUDIO</text>
 <rect x="460" y="963" width="326" height="243" rx="29" fill="#352080"/>
 <rect x="450" y="949" width="326" height="243" rx="29" fill="url(#model)" stroke="#BAA7FF" strokeWidth="3"/>
 <text x="613" y="1023" fill="#DAD1FF" textAnchor="middle" fontFamily={inter.fontFamily} fontWeight="800" fontSize="25">QWEN3.8</text>
 <text x="613" y="1133" fill="#FFF" textAnchor="middle" fontFamily={inter.fontFamily} fontWeight="900" fontSize="112">27B</text>
 <rect x="513" y="1241" width="274" height="42" rx="21" fill="#264C43"/>
 <text x="650" y="1270" fill="#9BE9BB" textAnchor="middle" fontFamily={inter.fontFamily} fontWeight="750" fontSize="22">✓ LOCAL SETUP</text>
 <path d="M138 1320H938L1000 1380Q997 1402 957 1403H119Q79 1402 76 1380Z" fill="url(#metal)"/>
 <path d="M139 1321H936L973 1369H103Z" fill="#9AA7B9"/>
 <path d="M430 1322H650L670 1350H410Z" fill="#65748B"/>
 <ellipse cx="253" cy="1439" rx="184" ry="20" fill="#514537" opacity=".29"/>
 </svg>
 <div style={{position:'absolute',left:112,top:1160}}><Mascot lf={80} size={305} nodAmp={0} cheer={.8} gaze={6}/></div>
 </>}/>;
