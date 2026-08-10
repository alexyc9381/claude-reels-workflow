import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces } from "./fonts";

/* =========================================================================
   @nocodealex  ·  "AI Founders Guild"  ·  ICON CANDIDATES (3)
   All 1080x1080, SOLID cream-forward backgrounds (no transparent corners),
   crafted to survive a 128x128 Skool icon.
   A) Gold coin seal   B) Emerald laurel crest   C) Clay heraldic shield
   ========================================================================= */

const IVORY = "#F4EEE1", INK = "#231D14", CHAR = "#2B2620";
const CLAY = "#C96A44", CLAY_LT = "#DC8B60";
const GOLD = "#C9A24E", GOLD_LT = "#F0D68B", GOLD_DK = "#8E6B2C";
const EMER = "#224B3B", EMER_DK = "#173327", EMER_LT = "#315F4C";
const D = (deg: number) => (deg * Math.PI) / 180;

const Star4: React.FC<{ cx: number; cy: number; s: number; fill: string }> = ({ cx, cy, s, fill }) => (
  <polygon points={`${cx},${cy - s} ${cx + s * 0.2},${cy - s * 0.2} ${cx + s},${cy} ${cx + s * 0.2},${cy + s * 0.2} ${cx},${cy + s} ${cx - s * 0.2},${cy + s * 0.2} ${cx - s},${cy} ${cx - s * 0.2},${cy - s * 0.2}`} fill={fill} />
);
const Beads: React.FC<{ cx: number; cy: number; r: number; n: number; rr: number; fill: string }> = ({ cx, cy, r, n, rr, fill }) => (
  <>{Array.from({ length: n }, (_, i) => { const a = D((i / n) * 360); return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={rr} fill={fill} />; })}</>
);
const Laurel: React.FC<{ cx: number; cy: number; rad: number; color: string; n?: number; leaf?: number }> = ({ cx, cy, rad, color, n = 11, leaf = 18 }) => {
  const branch = (a0: number, a1: number, dir: number) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1); const a = D(a0 + (a1 - a0) * t);
    const sc = 0.5 + Math.sin(Math.min(1, t * 1.12) * Math.PI) * 0.62;
    const x = cx + rad * Math.cos(a), y = cy + rad * Math.sin(a); const tan = (a * 180) / Math.PI + 90;
    return <ellipse key={`${dir}-${i}`} cx={x} cy={y} rx={leaf * sc} ry={leaf * 0.4 * sc} fill={color} transform={`rotate(${tan + dir * 24} ${x} ${y})`} />;
  });
  return <g>{branch(104, -58, 1)}{branch(76, 238, -1)}<circle cx={cx} cy={cy + rad} r={leaf * 0.62} fill={color} /></g>;
};

/* ============================================ A) GOLD COIN SEAL */
export const GuildIconCoin: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 38%, #F7F0DE 0%, #E7DCC1 100%)" }}>
    <svg width={1080} height={1080} viewBox="0 0 1080 1080">
      <defs><radialGradient id="coinG" cx="50%" cy="32%" r="72%"><stop offset="0%" stopColor={GOLD_LT} /><stop offset="100%" stopColor={GOLD_DK} /></radialGradient></defs>
      <ellipse cx={540} cy={580} rx={416} ry={416} fill="rgba(90,55,22,0.13)" />
      <circle cx={540} cy={540} r={416} fill="url(#coinG)" />
      <circle cx={540} cy={540} r={416} fill="none" stroke={GOLD_DK} strokeWidth={3} opacity={0.45} />
      <Beads cx={540} cy={540} r={392} n={56} rr={5.5} fill={GOLD_DK} />
      <circle cx={540} cy={540} r={368} fill={IVORY} />
      <circle cx={540} cy={540} r={368} fill="none" stroke={GOLD} strokeWidth={6} />
      <circle cx={540} cy={540} r={352} fill="none" stroke={GOLD_DK} strokeWidth={2} opacity={0.4} />
      <Star4 cx={540} cy={356} s={40} fill={GOLD} />
      <text x={540} y={628} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={700} fontSize={266} fill={CHAR} letterSpacing="2">AFG</text>
      <g transform="translate(0 44)"><Laurel cx={540} cy={686} rad={66} color={GOLD} n={7} leaf={14} /></g>
    </svg>
  </AbsoluteFill>
);

/* ============================================ B) EMERALD LAUREL CREST */
export const GuildIconCrest: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #F6EFDC 0%, #E9DFC5 100%)" }}>
    <svg width={1080} height={1080} viewBox="0 0 1080 1080">
      <defs><radialGradient id="emerG" cx="50%" cy="32%" r="72%"><stop offset="0%" stopColor={EMER_LT} /><stop offset="100%" stopColor={EMER_DK} /></radialGradient></defs>
      <ellipse cx={540} cy={576} rx={344} ry={344} fill="rgba(90,55,22,0.12)" />
      <Laurel cx={540} cy={560} rad={392} color={GOLD} n={15} leaf={26} />
      <Laurel cx={540} cy={560} rad={368} color={GOLD_LT} n={14} leaf={18} />
      <circle cx={540} cy={540} r={344} fill="url(#emerG)" />
      <circle cx={540} cy={540} r={344} fill="none" stroke={GOLD} strokeWidth={9} />
      <circle cx={540} cy={540} r={324} fill="none" stroke={GOLD_LT} strokeWidth={2.5} opacity={0.55} />
      <Star4 cx={540} cy={150} s={44} fill={GOLD} />
      <Star4 cx={540} cy={452} s={72} fill={GOLD_LT} /><Star4 cx={540} cy={452} s={46} fill={GOLD} />
      <text x={540} y={716} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={700} fontSize={150} fill={IVORY} letterSpacing="8">AFG</text>
    </svg>
  </AbsoluteFill>
);

/* ============================================ C) CLAY HERALDIC SHIELD */
const SHIELD = "M210 174 H870 V500 C870 650 772 752 540 910 C308 752 210 650 210 500 Z";
const SHIELD_INNER = "M250 212 H830 V496 C830 622 748 714 540 862 C332 714 250 622 250 496 Z";
export const GuildIconShield: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #F7F0DE 0%, #E7DDC2 100%)" }}>
    <svg width={1080} height={1080} viewBox="0 0 1080 1080">
      <defs>
        <linearGradient id="clayG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CLAY_LT} /><stop offset="55%" stopColor={CLAY} /><stop offset="100%" stopColor="#B5542F" /></linearGradient>
        <linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={GOLD_LT} /><stop offset="50%" stopColor={GOLD} /><stop offset="100%" stopColor={GOLD_DK} /></linearGradient>
        <linearGradient id="hiG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.22)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient>
        <radialGradient id="shG" cx="50%" cy="100%" r="60%"><stop offset="0%" stopColor="rgba(60,26,10,0.28)" /><stop offset="100%" stopColor="rgba(60,26,10,0)" /></radialGradient>
        <clipPath id="clipSh"><path d={SHIELD} /></clipPath>
      </defs>

      {/* shield shadow + dark outline for definition */}
      <path d={SHIELD} transform="translate(0 22)" fill="rgba(90,55,22,0.16)" />
      <path d={SHIELD} fill="none" stroke="#3A2716" strokeWidth={30} opacity={0.55} strokeLinejoin="round" />
      <path d={SHIELD} fill="url(#clayG)" />

      {/* internals, clipped to the shield */}
      <g clipPath="url(#clipSh)">
        {/* the CHIEF (top band) in cream */}
        <rect x={196} y={158} width={688} height={148} fill={IVORY} />
        <rect x={196} y={300} width={688} height={13} fill="url(#goldG)" />
        <rect x={196} y={313} width={688} height={3} fill={GOLD_DK} opacity={0.4} />
        {/* gloss + inner shadow for dimension */}
        <rect x={196} y={313} width={688} height={266} fill="url(#hiG)" />
        <ellipse cx={540} cy={910} rx={350} ry={232} fill="url(#shG)" />
        {[422, 540, 658].map((sx) => <React.Fragment key={sx}><Star4 cx={sx} cy={240} s={30} fill={GOLD} /><Star4 cx={sx} cy={240} s={14} fill={GOLD_LT} /></React.Fragment>)}
        {/* charge: AFG centered on the field */}
        <text x={540} y={636} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={700} fontSize={214} fill={IVORY} letterSpacing="3">AFG</text>
        <rect x={442} y={694} width={196} height={6} rx={3} fill={GOLD_LT} opacity={0.85} />
      </g>

      {/* metallic gold border + inner bevel line */}
      <path d={SHIELD} fill="none" stroke="url(#goldG)" strokeWidth={19} strokeLinejoin="round" />
      <path d={SHIELD_INNER} fill="none" stroke={GOLD_LT} strokeWidth={3.2} opacity={0.45} />
    </svg>
  </AbsoluteFill>
);
