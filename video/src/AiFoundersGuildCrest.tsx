import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   @nocodealex  ·  SKOOL COVER  ·  "AI Founders Guild"  ·  CREST EDITION
   Landscape 1920x1080. Exclusive/premium take: dark warm charcoal, gold
   heraldic crest (laurel wreath + crown + scroll), the clay Mascots as
   heraldic "supporters", a big readable wordmark. Rendered as a STILL.
   ========================================================================= */

const BG0 = "#14100C", BG1 = "#251C14", INK = "#14100C";
const GOLD = "#CBA24A", GOLD_LT = "#F1DC97", GOLD_DK = "#8A6526";
const CREAMT = "#F2ECDE", CLAY = "#D97757", CLAY_DIM = "#CD8C6E";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

/* ------------------------------------------------------------ background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 120% at 50% 40%, ${BG1} 0%, ${BG0} 68%)` }}>
    {/* faint sunburst behind the crest */}
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(960 372)" opacity={0.04}>
        {Array.from({ length: 20 }, (_, i) => (
          <polygon key={i} points="0,0 20,-580 -20,-580" fill={GOLD_LT} transform={`rotate(${i * 18})`} />
        ))}
      </g>
    </svg>
    {/* dust motes */}
    {Array.from({ length: 26 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1920, top: seed(i * 1.7) * 1080, width: 2 + seed(i) * 2.4, height: 2 + seed(i) * 2.4, borderRadius: "50%", background: i % 3 ? "rgba(203,162,74,0.20)" : "rgba(242,236,222,0.18)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 340px rgba(0,0,0,0.6)" }} />
    {/* warm glow lifting the emblem */}
    <div style={{ position: "absolute", left: 660, top: 90, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(203,162,74,0.16), transparent 66%)", filter: "blur(6px)" }} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------ gold frame */
const Frame: React.FC = () => {
  const diamond = (x: number, y: number) => <g transform={`translate(${x} ${y}) rotate(45)`}><rect x={-9} y={-9} width={18} height={18} fill={GOLD} /><rect x={-4} y={-4} width={8} height={8} fill={BG0} /></g>;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <rect x={44} y={44} width={1832} height={992} fill="none" stroke={GOLD} strokeWidth={2.5} opacity={0.85} />
      <rect x={56} y={56} width={1808} height={968} fill="none" stroke={GOLD} strokeWidth={1} opacity={0.5} />
      {diamond(44, 44)}{diamond(1876, 44)}{diamond(44, 1036)}{diamond(1876, 1036)}
      {diamond(960, 44)}{diamond(960, 1036)}
    </svg>
  );
};

/* --------------------------------------------------------------- wreath */
const Star: React.FC<{ s: number; fill?: string }> = ({ s, fill = GOLD_LT }) => (
  <svg width={s} height={s} viewBox="-12 -12 24 24" style={{ display: "block" }}><polygon points="0,-12 2.6,-2.6 12,0 2.6,2.6 0,12 -2.6,2.6 -12,0 -2.6,-2.6" fill={fill} /></svg>
);

const Wreath: React.FC<{ cx: number; cy: number; R: number }> = ({ cx, cy, R }) => {
  const N = 12;
  const branch = (a0: number, a1: number, dir: number) => Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const sc = 0.56 + Math.sin(Math.min(1, t * 1.12) * Math.PI) * 0.62;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    const xi = cx + (R - 15) * Math.cos(a), yi = cy + (R - 15) * Math.sin(a);
    const tan = (a * 180) / Math.PI + 90;
    return (
      <g key={`${dir}-${i}`}>
        {/* outer leaf */}
        <ellipse cx={x} cy={y} rx={20 * sc} ry={7.8 * sc} fill={GOLD} transform={`rotate(${tan + dir * 26} ${x} ${y})`} />
        <ellipse cx={x} cy={y} rx={20 * sc} ry={7.8 * sc} fill={GOLD_LT} opacity={0.42} transform={`rotate(${tan + dir * 26} ${x} ${y}) translate(0 -2)`} />
        {/* inner leaf, fills the wreath */}
        <ellipse cx={xi} cy={yi} rx={15.5 * sc} ry={6.2 * sc} fill={GOLD} opacity={0.92} transform={`rotate(${tan - dir * 6} ${xi} ${yi})`} />
      </g>
    );
  });
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {branch(104, -58, +1)}
      {branch(76, 238, -1)}
      {/* tie knot at the bottom */}
      <circle cx={cx} cy={cy + R} r={11} fill={GOLD} stroke={GOLD_DK} strokeWidth={1.5} />
      <circle cx={cx} cy={cy + R} r={4.5} fill={GOLD_LT} />
    </svg>
  );
};

/* ---------------------------------------------------------------- crown */
const Crown: React.FC = () => (
  <svg width={148} height={92} viewBox="0 0 148 92" style={{ display: "block" }}>
    <polygon points="14,86 10,30 40,54 74,14 108,54 138,30 134,86" fill={GOLD} stroke={GOLD_DK} strokeWidth={2} strokeLinejoin="round" />
    <polygon points="14,86 10,30 40,54 74,14 108,54 138,30 134,86" fill="url(#cg)" opacity={0.0} />
    <rect x={14} y={70} width={120} height={16} fill={GOLD_DK} opacity={0.35} />
    <rect x={18} y={72} width={112} height={5} fill={GOLD_LT} opacity={0.7} />
    <circle cx={10} cy={26} r={8} fill={GOLD_LT} /><circle cx={74} cy={10} r={9} fill={GOLD_LT} /><circle cx={138} cy={26} r={8} fill={GOLD_LT} />
    <rect x={66} y={74} width={16} height={12} fill={CLAY} /><rect x={68} y={76} width={5} height={4} fill="#F2C0AC" />
  </svg>
);

/* ------------------------------------------------------------- est ribbon */
const Ribbon: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width={360} height={72} viewBox="0 0 360 72" style={{ display: "block" }}>
      {/* back tails */}
      <polygon points="24,54 4,42 4,64 30,64" fill={GOLD_DK} /><polygon points="336,54 356,42 356,64 330,64" fill={GOLD_DK} />
      {/* main band with notched ends */}
      <polygon points="40,16 320,16 342,36 320,56 40,56 18,36" fill={GOLD} stroke={GOLD_DK} strokeWidth={1.5} />
      <polygon points="40,16 320,16 342,36 320,56 40,56 18,36" fill="none" />
      <rect x={40} y={20} width={280} height={4} fill={GOLD_LT} opacity={0.7} />
    </svg>
    <div style={{ position: "absolute", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: 7, color: INK }}>{label}</div>
  </div>
);

/* ============================================================== the cover */
export const AiFoundersGuildCrest: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <Frame />

      {/* ---- CREST -------------------------------------------------------- */}
      <Wreath cx={960} cy={352} R={244} />

      {/* ground shadow under the trio */}
      <div style={{ position: "absolute", left: 960 - 250, top: 470, width: 500, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45), transparent 68%)", filter: "blur(4px)" }} />

      {/* heraldic supporters + master */}
      <div style={{ position: "absolute", left: 830 - 78, top: 494 - 0.92 * 156, width: 156, height: 156 }}>
        <Mascot lf={14} size={156} gaze={3} nodAmp={0} stern={0.3} tint={CLAY_DIM} hardHat={1} />
      </div>
      <div style={{ position: "absolute", left: 1090 - 78, top: 494 - 0.92 * 156, width: 156, height: 156 }}>
        <Mascot lf={31} size={156} gaze={-3} nodAmp={0} tint={CLAY_DIM} wizard={1} />
      </div>
      <div style={{ position: "absolute", left: 960 - 106, top: 500 - 0.92 * 212, width: 212, height: 212 }}>
        <Mascot lf={6} size={212} gaze={0} nodAmp={0} stern={0.28} tint={CLAY} />
      </div>
      {/* crown on the master */}
      <div style={{ position: "absolute", left: 960 - 74, top: 214 }}><Crown /></div>

      {/* est ribbon at the base of the wreath */}
      <div style={{ position: "absolute", left: 960 - 180, top: 508 }}><Ribbon label="EST · MMXXVI" /></div>

      {/* floating sparkles */}
      <div style={{ position: "absolute", left: 690, top: 214 }}><Star s={20} /></div>
      <div style={{ position: "absolute", left: 1214, top: 250 }}><Star s={26} /></div>
      <div style={{ position: "absolute", left: 748, top: 452 }}><Star s={15} fill={GOLD} /></div>

      {/* ---- WORDMARK ----------------------------------------------------- */}
      <div style={{ position: "absolute", top: 604, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 40, letterSpacing: 24, color: GOLD_LT, paddingLeft: 24 }}>
        AI FOUNDERS
      </div>
      <div style={{ position: "absolute", top: 636, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 34 }}>
        <div style={{ width: 150, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 168, lineHeight: 1, color: CREAMT, letterSpacing: "0.02em", textShadow: "0 6px 30px rgba(0,0,0,0.5)" }}>GUILD</div>
        <div style={{ width: 150, height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
      </div>

      {/* ---- MOTTO -------------------------------------------------------- */}
      <div style={{ position: "absolute", top: 856, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, letterSpacing: 9, color: GOLD }}>
        <Star s={14} fill={GOLD} /> BUILD · AUTOMATE · EARN <Star s={14} fill={GOLD} />
      </div>

      {/* ---- HANDLE ------------------------------------------------------- */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: "rgba(242,236,222,0.72)" }}>
        @nocodealex
      </div>
    </AbsoluteFill>
  );
};
