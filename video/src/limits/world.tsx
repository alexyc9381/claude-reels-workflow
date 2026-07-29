import React from "react";
import { seed, mono } from "./chassis";

/* =============================================================================
   REEL 78 "LIMITS" — THE WASTELAND WORLD
   -----------------------------------------------------------------------------
   Every scene lives in the same Fury-Road knockoff, so the grade and the props
   are defined ONCE here. Scenes import these and change the STAGING, never the
   palette — that is what makes six different places still read as one film.

   ⛔ THE GRADE. Two families only. Anything the low sun touches goes hot orange;
      every shadow reads deep teal. Nothing sits in between — that in-between is
      what made the first (rejected) version look muddy.
   ============================================================================= */
export const W = {
  skyHi: "#FF6A12", skyMid: "#FF9A2E", skyLo: "#FFD48A",
  rockHi: "#C4551F", rockLo: "#7E2F14",
  tealHi: "#12525F", tealMid: "#0B3742", tealLo: "#04202A",
  rigHi: "#2E5D66", rigMid: "#12414C", rigLo: "#07242D",
  dustHi: "#FFD79A", dustMid: "#E8A45A", dustLo: "#B4713A",
  hot: "#FFB03A", ember: "#FFF0C4", rust: "#C4551F", oil: "#3A1710",
};

/* Shared gradient defs. Every scene drops <WorldDefs p="s3" /> in its own <defs>
   and refers to `url(#s3sky)` etc — prefixed so ids never collide across scenes
   (⛔ reel-asset-name-collisions). */
export const WorldDefs: React.FC<{ p: string }> = ({ p }) => (
  <>
    <linearGradient id={`${p}sky`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={W.skyHi} /><stop offset=".52" stopColor={W.skyMid} />
      <stop offset="1" stopColor={W.skyLo} /></linearGradient>
    <linearGradient id={`${p}night`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2A1230" /><stop offset=".55" stopColor="#7E2F14" />
      <stop offset="1" stopColor="#E08A3C" /></linearGradient>
    <linearGradient id={`${p}road`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={W.tealHi} /><stop offset=".45" stopColor={W.tealMid} />
      <stop offset="1" stopColor={W.tealLo} /></linearGradient>
    <linearGradient id={`${p}rig`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={W.rigHi} /><stop offset=".42" stopColor={W.rigMid} />
      <stop offset="1" stopColor={W.rigLo} /></linearGradient>
    <linearGradient id={`${p}rim`} x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stopColor="#FFB25A" stopOpacity=".95" />
      <stop offset=".22" stopColor="#FFB25A" stopOpacity="0" /></linearGradient>
    <radialGradient id={`${p}blast`} cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#FFFFFF" /><stop offset=".28" stopColor="#FFE9A8" />
      <stop offset=".62" stopColor="#FF8C1A" /><stop offset="1" stopColor="#C4300A" stopOpacity="0" /></radialGradient>
  </>
);

/* ---- the sky + rock bank + blacktop shell every road scene opens with ---- */
export const Wasteland: React.FC<{ p: string; horizon?: number; night?: boolean; sun?: [number, number]; scroll?: number }> =
({ p, horizon = 470, night = false, sun = [430, 398], scroll = 0 }) => (
  <g>
    <rect width={1012} height={horizon} fill={`url(#${night ? p + "night" : p + "sky"})`} />
    {!night && (<>
      <circle cx={sun[0]} cy={sun[1]} r={132} fill="#FFE9A8" opacity={0.5} />
      <circle cx={sun[0]} cy={sun[1]} r={76} fill="#FFF6D2" />
    </>)}
    {/* far ridge — slow parallax */}
    <g transform={`translate(${-(scroll * 0.18) % 1012},0)`}>
      {[0, 1012].map((o) => (
        <path key={o} d={`M${o} ${horizon - 78} L${o + 128} ${horizon - 148} L${o + 232} ${horizon - 98} L${o + 344} ${horizon - 170} L${o + 462} ${horizon - 110} L${o + 586} ${horizon - 156} L${o + 706} ${horizon - 102} L${o + 836} ${horizon - 148} L${o + 960} ${horizon - 98} L${o + 1012} ${horizon - 126} L${o + 1012} ${horizon} L${o} ${horizon} Z`}
              fill={night ? "#4A1B10" : W.rockHi} />))}
    </g>
    {/* near ridge — faster parallax, so depth reads while moving */}
    <g transform={`translate(${-(scroll * 0.46) % 1012},0)`}>
      {[0, 1012].map((o) => (
        <path key={o} d={`M${o} ${horizon - 46} L${o + 160} ${horizon - 78} L${o + 318} ${horizon - 48} L${o + 488} ${horizon - 80} L${o + 664} ${horizon - 46} L${o + 846} ${horizon - 74} L${o + 1012} ${horizon - 46} L${o + 1012} ${horizon} L${o} ${horizon} Z`}
              fill={night ? "#2E120A" : W.rockLo} />))}
    </g>
    <rect y={horizon} width={1012} height={792 - horizon} fill={`url(#${p}road)`} />
    <rect y={horizon} width={1012} height={6} fill="#1E6C7A" opacity={0.7} />
    {/* ground detail rushing past — the largest continuous mover in every road
        scene, and the reason the frame is never static between beats */}
    <g opacity={0.5}>
      {Array.from({ length: 9 }, (_, i) => {
        const k = ((i * 112 + scroll * 2.1) % 1010) / 1010;
        const y = horizon + 14 + k * k * (782 - horizon);
        const w = 40 + k * k * 240, h = 8 + k * k * 34;
        const x = (i % 2 ? 92 : 640) + (i % 3) * 120 - k * k * 320;
        return <ellipse key={i} cx={x} cy={y} rx={w} ry={h} fill="#062730" opacity={0.35 + k * 0.4} />; })}
    </g>
  </g>
);

/* ---- the raking centre line. TEXTURE ONLY — kept at low contrast so it never
       competes with a beat mover (⛔ reel-motion-hierarchy). ---- */
export const CentreLine: React.FC<{ roll: number; horizon?: number; vx?: number; op?: number }> =
({ roll, horizon = 470, vx = 596, op = 0.5 }) => (
  <g fill="#FFD98A" opacity={op}>
    {Array.from({ length: 7 }, (_, i) => {
      const k = ((i * 46 + roll) % 322) / 322;
      const y = horizon + 6 + k * k * (786 - horizon);
      const w = 14 + k * k * 150, h = 7 + k * k * 54;
      return <rect key={i} x={vx - 300 * k * k - w / 2} y={y} width={w} height={h} rx={2} opacity={0.4 + k * 0.4} />; })}
  </g>
);

/* ---- an opaque DRAWN dust wall. ⛔ never stacked translucent circles — that
       reads as soap bubbles, not dust (reel-draw-dont-stack). ---- */
export const DustWall: React.FC<{ x: number; y: number; s: number; o?: number; flip?: boolean }> =
({ x, y, s, o = 1, flip = false }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`} opacity={o}>
    <path d="M-300 20 C-296 -46 -244 -84 -196 -70 C-186 -128 -120 -160 -66 -134
             C-40 -190 42 -196 78 -146 C132 -172 196 -136 198 -78
             C250 -66 268 -14 250 20 Z" fill={W.dustLo} />
    <path d="M-262 20 C-258 -34 -214 -66 -172 -54 C-162 -104 -104 -132 -58 -110
             C-34 -158 36 -164 68 -120 C114 -142 170 -112 172 -62
             C214 -52 230 -10 214 20 Z" fill={W.dustMid} />
    <path d="M-196 -70 C-186 -128 -120 -160 -66 -134 C-40 -190 42 -196 78 -146
             C40 -150 -6 -132 -30 -104 C-70 -132 -140 -118 -196 -70 Z" fill={W.dustHi} />
  </g>
);

/* ---- the war rig, reused across scenes. `tail` draws the junk train behind. ---- */
export const Rig: React.FC<{ p: string; x: number; y: number; s?: number; spin?: number;
  drums?: number; flip?: boolean }> =
({ p, x, y, s = 1, spin = 0, drums = 3, flip = false }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <rect x={-150} y={44} width={420} height={196} rx={32} fill={`url(#${p}rig)`} />
    <rect x={-150} y={44} width={420} height={20} rx={10} fill="#5C93A0" opacity={0.55} />
    <g stroke="#04191F" strokeWidth={5} opacity={0.85}>
      <path d="M-40 44v196M74 44v196M188 44v196" /></g>
    <rect x={-150} y={44} width={420} height={196} rx={32} fill={`url(#${p}rim)`} opacity={0.5} />
    <path d="M-236 92 L-150 92 L-150 254 L-276 254 L-276 148 Z" fill="#0E3843" />
    <path d="M-232 108 L-158 108 L-158 172 L-256 172 Z" fill="#8FD3E0" opacity={0.35} />
    <path d="M-236 92 L-150 92 L-150 254 L-276 254 L-276 148 Z" fill={`url(#${p}rim)`} opacity={0.35} />
    <rect x={-292} y={214} width={44} height={44} rx={9} fill={W.rust} />
    <rect x={-142} y={-66} width={24} height={116} rx={8} fill="#9BB6BC" />
    <rect x={-100} y={-46} width={24} height={96} rx={8} fill="#7E9DA5" />
    {[-206, -18, 118, 236].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={270} r={56} fill="#04161C" />
        <g transform={`rotate(${spin} ${cx} 270)`} stroke="#2E5D66" strokeWidth={6} strokeLinecap="round" opacity={0.75}>
          <path d={`M${cx - 28} 270h56M${cx} 242v56`} /></g>
        <circle cx={cx} cy={270} r={19} fill="#12414C" />
      </g>))}
    <ellipse cx={20} cy={330} rx={330} ry={24} fill="#04202A" opacity={0.6} />
    <g transform="translate(46,-14)">
      {[0, 88, 176].slice(0, drums).map((dx, i) => (
        <g key={dx} transform={`translate(${dx},${i === 1 ? -6 : 0})`}>
          <rect x={0} y={0} width={72} height={58} rx={8} fill={W.rust} />
          <rect x={0} y={13} width={72} height={7} fill="#FFE9A8" />
          <rect x={0} y={37} width={72} height={7} fill="#FFE9A8" />
          <text x={36} y={32} textAnchor="middle" fontFamily={mono} fontSize={12} fontWeight={700}
                letterSpacing={1} fill={W.oil}>GUZZ</text>
        </g>))}
    </g>
  </g>
);

/* ---- one junk trailer of the "history" train. n seeds its silhouette. ---- */
export const Trailer: React.FC<{ n: number; x: number; y: number; s?: number; lit?: number }> =
({ n, x, y, s = 1, lit = 0 }) => {
  const a = seed(n * 3.1), b = seed(n * 7.7);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-58} y={-52 - a * 26} width={116} height={52 + a * 26} rx={6} fill={W.rigMid} />
      <rect x={-58} y={-52 - a * 26} width={116} height={9} rx={4} fill="#5C93A0" opacity={0.5} />
      <rect x={-58} y={-52 - a * 26} width={116} height={52 + a * 26} rx={6}
            fill={W.hot} opacity={lit * 0.85} />
      <rect x={-40} y={-64 - a * 26 - b * 20} width={30} height={16 + b * 20} rx={4} fill={W.rust} opacity={0.9} />
      <rect x={8} y={-60 - a * 26} width={22} height={12} rx={4} fill="#9BB6BC" opacity={0.8} />
      <circle cx={-32} cy={16} r={19} fill="#04161C" /><circle cx={-32} cy={16} r={7} fill="#2E5D66" />
      <circle cx={32} cy={16} r={19} fill="#04161C" /><circle cx={32} cy={16} r={7} fill="#2E5D66" />
      <ellipse cx={0} cy={34} rx={74} ry={9} fill="#04202A" opacity={0.5} />
    </g>);
};
