import React from 'react';
import {S,E,pulse} from './Kit';
import {OffthreadVideo, Img, staticFile} from 'remotion';

/**
 * Native source: Y Combinator, Boris Cherny at Startup School 2026.
 * https://www.youtube.com/watch?v=qyPCVqFUyDo
 * Original 3840x2160 VP9 stream, approximately 1:39.3–1:41.4.
 * Downsampled directly to 1920x1080, 30 fps, 2.10 s; no AI reconstruction,
 * sharpening, washed-out overlays, source audio, or additional camera zoom.
 */
export function Boris({t}: {t: number}) {
  const cue=5.60-139/30,draw=S(t,cue,.24),pop=E(t,cue,.21),bounce=pulse(t,cue+.19,.28);
  const beat=pulse(t,cue+.27,.29)+.72*pulse(t,cue+.67,.29);const ax=-18*beat,ay=13*beat;
  return <div style={{position:'absolute',inset:0,background:'#102532'}}>
    <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
      <path d="M0 0H1012V124H0Z" fill="#193845"/>
      <path d="M0 112H1012M0 780H1012" stroke="#A48C64" strokeWidth="7"/>
      <path d="M0 125H15V768H0M997 125H1012V768H997" fill="#284851"/>
    </svg>
    <div style={{position:'absolute',left:20,top:127,width:972,height:642,
      boxSizing:'border-box',border:'6px solid #D7BE87',borderRadius:8,
      overflow:'hidden',background:'#061421',boxShadow:'0 12px 0 #071722'}}>
      <OffthreadVideo src={staticFile('boris-large.mp4')} muted
        style={{display:'block',width:960,height:630,objectFit:'cover',objectPosition:'right center'}}/>
    </div>
    <div style={{position:'absolute',right:48,top:159,width:118,height:118,padding:16,boxSizing:'border-box',background:'#FFF9E9',border:'4px solid #D3AD76',borderRadius:23,boxShadow:'0 7px 0 #10243355',opacity:pop,transform:`scale(${.68+.32*pop+.08*bounce})`}}><Img src={staticFile('claude_logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>
    <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none',opacity:t>=cue?1:0}}>
      <g transform={`translate(${ax} ${ay}) rotate(${-3*beat} 831 300)`}><path d="M831 300Q784 260 702 294Q657 312 628 360" fill="none" stroke="#142E3E" strokeWidth="24" strokeLinecap="round" strokeDasharray="265" strokeDashoffset={265*(1-draw)}/>
      <path d="M831 300Q784 260 702 294Q657 312 628 360" fill="none" stroke="#F3D074" strokeWidth="14" strokeLinecap="round" strokeDasharray="265" strokeDashoffset={265*(1-draw)}/>
      <g opacity={E(t,cue+.16,.08)} transform={`translate(${-4*bounce} ${5*bounce})`}><path d="M628 316L628 360 672 348" fill="none" stroke="#142E3E" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/><path d="M628 316L628 360 672 348" fill="none" stroke="#F3D074" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/></g></g>
    </svg>
  </div>;
}
