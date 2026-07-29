import React from "react";
import { seed, mono } from "./chassis";
import { W } from "./world";

/* =============================================================================
   REEL 78 "LIMITS" — SET DRESSING & KNOCKOFF PROPS
   -----------------------------------------------------------------------------
   The overhaul pass (⛔ reel-overhaul-stage). Everything here is TEXTURE:
   dimmer, smaller and lower-contrast than whatever carries the beat, and always
   behind the hero. Richness must never become a second hero
   (⛔ reel-declutter-single-hero, reel-motion-hierarchy).

   Props are KNOCKOFFS of things a viewer can name in half a second
   (⛔ reel-knockoff-references) — a highway shield, a gas brand, a chrome skull
   hood ornament, and the flame-throwing guitar rig, which is the single most
   recognisable object in the film we are knocking off.
   ============================================================================= */

/* ---- a Route-66-style highway shield, renumbered to the reel ---- */
export const RouteShield: React.FC<{ x: number; y: number; s?: number; n?: string }> =
({ x, y, s = 1, n = "78" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-5} y={0} width={10} height={96} fill="#2B323B" />
    <path d="M-44 -60 L44 -60 L44 -6 Q44 22 0 34 Q-44 22 -44 -6 Z" fill="#E8E3D6" />
    <path d="M-44 -60 L44 -60 L44 -6 Q44 22 0 34 Q-44 22 -44 -6 Z" fill="none" stroke={W.oil} strokeWidth={4} />
    <text x={0} y={-32} textAnchor="middle" fontFamily={mono} fontSize={13} fontWeight={700} fill={W.oil}>WASTE</text>
    <text x={0} y={4} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill={W.oil}>{n}</text>
  </g>
);

/* ---- a knockoff roadside fuel brand ---- */
export const GuzzSign: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-7} y={0} width={14} height={150} fill="#2B323B" />
    <rect x={-96} y={-88} width={192} height={92} rx={9} fill={W.rust} />
    <rect x={-96} y={-88} width={192} height={92} rx={9} fill="none" stroke="#7E2F14" strokeWidth={5} />
    <rect x={-96} y={-70} width={192} height={9} fill="#FFE9A8" />
    <rect x={-96} y={-22} width={192} height={9} fill="#FFE9A8" />
    <text x={0} y={-36} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700}
          letterSpacing={3} fill="#FFE9A8">GUZZ &amp; GO</text>
    <text x={0} y={-8} textAnchor="middle" fontFamily={mono} fontSize={12} fontWeight={700}
          letterSpacing={2} fill="#FFD79A">LAST TANK · 400 MI</text>
  </g>
);

/* ---- power poles marching to the horizon; `k` scrolls them ---- */
export const Poles: React.FC<{ k: number; horizon: number; n?: number; op?: number }> =
({ k, horizon, n = 6, op = 0.55 }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const t = ((i / n) + (k % 1) / n) % 1;
      const s = 0.24 + t * t * 1.05;
      const x = 1060 - t * t * 1180;
      const y = horizon + 4;
      return (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          <rect x={-6} y={-200} width={12} height={200} fill="#2A2118" />
          <rect x={-50} y={-190} width={100} height={11} rx={4} fill="#2A2118" />
          <rect x={-38} y={-160} width={76} height={9} rx={4} fill="#2A2118" />
        </g>); })}
  </g>
);

/* ---- buzzards, circling. Small, slow, silhouette only. ---- */
export const Buzzards: React.FC<{ lf: number; x: number; y: number; s?: number; n?: number }> =
({ lf, x, y, s = 1, n = 3 }) => (
  <g opacity={0.5}>
    {Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 17);
      const a = (lf / (80 + sd * 60)) + i * 2.1;
      const px = x + Math.cos(a) * (90 + sd * 70);
      const py = y + Math.sin(a) * (26 + sd * 20);
      const flap = Math.sin(lf / (7 + sd * 5) + i) * 5;
      return (
        <g key={i} transform={`translate(${px},${py}) scale(${s * (0.7 + sd * 0.5)})`}>
          <path d={`M-22 0 q11 ${-8 - flap} 22 0 q11 ${-8 + flap} 22 0`} fill="none"
                stroke="#3A1710" strokeWidth={5} strokeLinecap="round" />
        </g>); })}
  </g>
);

/* ---- a skull totem on a pole — wasteland waymarker ---- */
export const SkullTotem: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-4} y={0} width={8} height={92} fill="#3A2A1C" />
    <path d="M-24 -34 q0 -30 24 -30 q24 0 24 30 q0 18 -10 24 l0 12 l-28 0 l0 -12 q-10 -6 -10 -24 z"
          fill="#D9CFB4" />
    <g fill="#3A2A1C"><rect x={-14} y={-30} width={11} height={12} rx={4} /><rect x={3} y={-30} width={11} height={12} rx={4} /></g>
    <rect x={-5} y={-14} width={10} height={9} fill="#3A2A1C" />
  </g>
);

/* ---- a chrome skull hood ornament ---- */
export const ChromeSkull: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-20 -8 q0 -26 20 -26 q20 0 20 26 q0 15 -8 20 l0 10 l-24 0 l0 -10 q-8 -5 -8 -20 z"
          fill="#C6CBD2" />
    <path d="M-20 -8 q0 -26 20 -26 q20 0 20 26 q0 -6 -8 -12 q-12 -8 -24 0 q-8 6 -8 12 z" fill="#EFF3F6" />
    <g fill="#39424E"><rect x={-12} y={-22} width={9} height={10} rx={4} /><rect x={3} y={-22} width={9} height={10} rx={4} /></g>
  </g>
);

/* ---- war-boy handprints daubed on a panel ---- */
export const HandPrints: React.FC<{ x: number; y: number; s?: number; n?: number }> =
({ x, y, s = 1, n = 4 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={0.4}>
    {Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 41);
      return (
        <g key={i} transform={`translate(${i * 34},${sd * 22}) rotate(${sd * 40 - 20})`}>
          <rect x={-9} y={-4} width={18} height={22} rx={6} fill="#E8E3D6" />
          {[-9, -3, 3, 9].map((dx) => (
            <rect key={dx} x={dx - 2} y={-13} width={4} height={12} rx={2} fill="#E8E3D6" />))}
        </g>); })}
  </g>
);

/* ---- ⭐ THE FLAME GUITAR RIG. The single most recognisable object in the film
       we are knocking off — a blindfolded player strapped to the front of the
       war party with a double-neck that throws fire. Background cameo only. ---- */
export const DoofRig: React.FC<{ lf: number; x: number; y: number; s?: number }> =
({ lf, x, y, s = 1 }) => {
  const jam = Math.sin(lf / 4.4) * 7;
  const flare = Math.max(0, Math.sin(lf / 11)) * 0.9;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* the speaker stack he is lashed to */}
      <g fill="#2A2118">
        <rect x={-64} y={-4} width={58} height={62} rx={5} />
        <rect x={6} y={-4} width={58} height={62} rx={5} />
        <rect x={-64} y={-70} width={58} height={62} rx={5} />
        <rect x={6} y={-70} width={58} height={62} rx={5} /></g>
      <g fill="#3E4C52" opacity={0.9}>
        <circle cx={-35} cy={27} r={19} /><circle cx={35} cy={27} r={19} />
        <circle cx={-35} cy={-39} r={19} /><circle cx={35} cy={-39} r={19} /></g>
      {/* the player, bungeed on, head back */}
      <g transform={`translate(0,-108) rotate(${jam * 0.5})`}>
        <rect x={-19} y={-6} width={38} height={54} rx={9} fill="#8B2C1A" />
        <circle cx={0} cy={-22} r={20} fill="#D9CFB4" />
        <rect x={-21} y={-28} width={42} height={13} rx={4} fill="#3A1710" />
        <rect x={-30} y={10} width={60} height={9} rx={4} fill="#3A2A1C" />
      </g>
      {/* the double-neck, and the flame */}
      <g transform={`translate(6,-96) rotate(${-24 + jam})`}>
        <rect x={-10} y={-8} width={62} height={30} rx={7} fill="#7E2F14" />
        <rect x={48} y={-2} width={78} height={13} rx={5} fill="#3A2A1C" />
        <rect x={48} y={-16} width={78} height={11} rx={5} fill="#3A2A1C" />
        <ellipse cx={140 + flare * 22} cy={2} rx={22 + flare * 46} ry={13 + flare * 22}
                 fill="#FF8C1A" opacity={0.35 + flare * 0.55} />
        <ellipse cx={132 + flare * 14} cy={2} rx={12 + flare * 22} ry={8 + flare * 11}
                 fill="#FFE9A8" opacity={0.4 + flare * 0.5} />
      </g>
    </g>);
};

/* ---- a crushed car cube, and a stack of them ---- */
export const Cube: React.FC<{ x: number; y: number; s?: number; hue?: string }> =
({ x, y, s = 1, hue = "#3E5A62" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-40} y={-34} width={80} height={68} rx={5} fill={hue} />
    <rect x={-40} y={-34} width={80} height={9} rx={4} fill="#7EA0A8" opacity={0.5} />
    <g stroke="#0E1A20" strokeWidth={3} opacity={0.7}>
      <path d="M-14 -34v68M12 -34v68M-40 -8h80M-40 14h80" /></g>
  </g>
);

export const CubeStack: React.FC<{ x: number; y: number; s?: number; n?: number }> =
({ x, y, s = 1, n = 5 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={0.9}>
    {Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 23);
      const row = Math.floor(i / 2), col = i % 2;
      return <Cube key={i} x={col * 84 + sd * 10 - 42} y={-row * 70 - sd * 4}
                   hue={["#3E5A62", "#5C3A2A", "#46523E"][i % 3]} />; })}
  </g>
);

/* ---- a claw crane over the yard ---- */
export const ClawCrane: React.FC<{ lf: number; x: number; y: number; s?: number }> =
({ lf, x, y, s = 1 }) => {
  const swing = Math.sin(lf / 22) * 9;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-16} y={0} width={32} height={230} fill="#4C5860" />
      <g stroke="#3A444C" strokeWidth={5}>
        <path d="M-16 40 L16 84M16 40 L-16 84M-16 120 L16 164M16 120 L-16 164" /></g>
      <rect x={-16} y={-16} width={300} height={20} rx={6} fill="#5E6A72" />
      <g transform={`translate(228,4) rotate(${swing})`}>
        <path d="M0 0 L0 88" stroke="#2B323B" strokeWidth={6} />
        <path d="M-26 88 q26 40 52 0" fill="none" stroke="#8B959D" strokeWidth={9} strokeLinecap="round" />
        <path d="M-26 88 q-6 26 6 38M26 88 q6 26 -6 38" fill="none" stroke="#8B959D" strokeWidth={8} strokeLinecap="round" />
      </g>
    </g>);
};

/* ---- a roadside wreck ---- */
export const Wreck: React.FC<{ x: number; y: number; s?: number; rot?: number }> =
({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(${rot})`}>
    <path d="M-88 26 L-70 -18 L4 -32 L74 -22 L96 12 L96 30 Z" fill="#5C2410" />
    <path d="M-56 -14 L0 -24 L48 -18 L64 4 L-64 6 Z" fill="#2E120A" />
    <circle cx={-52} cy={32} r={26} fill="#150907" />
    <circle cx={56} cy={32} r={26} fill="#150907" />
    <rect x={-24} y={-48} width={11} height={26} fill="#3A1710" />
  </g>
);

/* ---- a warning placard, knocked off industrial signage ---- */
export const Placard: React.FC<{ x: number; y: number; s?: number; text: string; hue?: string }> =
({ x, y, s = 1, text, hue = "#C9A24A" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-72} y={-24} width={144} height={48} rx={6} fill={hue} />
    <rect x={-72} y={-24} width={144} height={48} rx={6} fill="none" stroke={W.oil} strokeWidth={4} />
    <text x={0} y={8} textAnchor="middle" fontFamily={mono} fontSize={19} fontWeight={700}
          letterSpacing={2} fill={W.oil}>{text}</text>
  </g>
);
