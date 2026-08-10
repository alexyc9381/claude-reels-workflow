import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   @nocodealex  ·  SKOOL COVER  ·  "AI Founders Guild"  ·  ROYAL / HISTORIC
   Landscape 1920x1080. Light aged-parchment charter in an old-European
   heraldic style: gold frame w/ fleuron, crown, navy heater shield with a
   cog, clay Mascots as heraldic supporters, scroll banners, a HUGE serif
   GUILD. No handle. Rendered as a STILL.
   ========================================================================= */

const PARCH0 = "#F6EFDB", PARCH1 = "#E9DBBB", PARCH2 = "#D6C298";
const GOLD = "#A9843A", GOLD_LT = "#EACD79", GOLD_DK = "#6E5220";
const NAVYC = "#26345C", NAVY_DK = "#1B2544";
const CLAY = "#D97757", CLAY_DIM = "#CE8D6F", INK = "#2A2213";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

/* ------------------------------------------------------------ background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(125% 115% at 50% 42%, ${PARCH0} 0%, ${PARCH1} 62%, ${PARCH2} 100%)` }}>
    {/* faint age blotches */}
    <div style={{ position: "absolute", left: 180, top: 120, width: 520, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,120,60,0.10), transparent 66%)", filter: "blur(20px)" }} />
    <div style={{ position: "absolute", right: 160, bottom: 120, width: 560, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,120,60,0.09), transparent 66%)", filter: "blur(22px)" }} />
    {Array.from({ length: 30 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1920, top: seed(i * 1.7) * 1080, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(110,82,32,0.12)" : "rgba(255,252,242,0.6)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(120,92,44,0.28)" }} />
  </AbsoluteFill>
);

/* -------------------------------------------------------- gold ornaments */
const FleurLeaf = "M0 0 C -9 -16 -9 -30 0 -42 C 9 -30 9 -16 0 0 Z";
const Fleur: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={FleurLeaf} fill={GOLD} transform="rotate(-40)" />
    <path d={FleurLeaf} fill={GOLD} transform="rotate(40)" />
    <path d={FleurLeaf} fill={GOLD_LT} />
    <path d={FleurLeaf} fill={GOLD} opacity={0.0} />
    <rect x={-15} y={-20} width={30} height={7} rx={3} fill={GOLD_DK} />
    <polygon points="-8,0 8,0 4,12 -4,12" fill={GOLD} />
    <ellipse cx={0} cy={-40} rx={3} ry={3} fill={GOLD_LT} />
  </g>
);

const Star: React.FC<{ s: number; fill?: string }> = ({ s, fill = GOLD }) => (
  <svg width={s} height={s} viewBox="-12 -12 24 24" style={{ display: "block" }}><polygon points="0,-12 2.6,-2.6 12,0 2.6,2.6 0,12 -2.6,2.6 -12,0 -2.6,-2.6" fill={fill} /></svg>
);

/* horizontal filigree divider (symmetric) */
const Flourish: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={40} viewBox={`${-w / 2} -20 ${w} 40`} style={{ display: "block", overflow: "visible" }}>
    <g fill="none" stroke={GOLD} strokeWidth={2.4} strokeLinecap="round">
      <path d={`M${-w / 2 + 10} 0 H -46`} />
      <path d={`M${w / 2 - 10} 0 H 46`} />
      <path d="M-46 0 C -34 0 -30 -12 -18 -12 C -8 -12 -6 -2 -14 -2" />
      <path d="M46 0 C 34 0 30 -12 18 -12 C 8 -12 6 -2 14 -2" />
    </g>
    <g transform="rotate(45)"><rect x={-8} y={-8} width={16} height={16} fill={GOLD} /><rect x={-3.5} y={-3.5} width={7} height={7} fill={PARCH0} /></g>
    <circle cx={-46} cy={0} r={3.2} fill={GOLD} /><circle cx={46} cy={0} r={3.2} fill={GOLD} />
  </svg>
);

/* ------------------------------------------------------------ gold frame */
const Frame: React.FC = () => {
  const corner = (x: number, y: number, sx: number, sy: number) => (
    <g transform={`translate(${x} ${y}) scale(${sx} ${sy})`} fill="none" stroke={GOLD} strokeWidth={2.4} strokeLinecap="round">
      <path d="M0 46 C 0 20 20 0 46 0" />
      <path d="M14 40 C 26 40 40 26 40 14" opacity={0.7} />
      <g stroke="none"><rect x={2} y={2} width={12} height={12} transform="rotate(45 8 8)" fill={GOLD} /></g>
    </g>
  );
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <rect x={46} y={46} width={1828} height={988} fill="none" stroke={GOLD} strokeWidth={3} />
      <rect x={58} y={58} width={1804} height={964} fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.6} />
      {corner(46, 46, 1, 1)}{corner(1874, 46, -1, 1)}{corner(46, 1034, 1, -1)}{corner(1874, 1034, -1, -1)}
      <Fleur x={960} y={1012} s={0.8} rot={180} />
    </svg>
  );
};

/* ------------------------------------------------------------ crown */
const Crown: React.FC = () => (
  <svg width={190} height={120} viewBox="0 0 190 120" style={{ display: "block" }}>
    {/* cross finial */}
    <rect x={91} y={2} width={8} height={22} fill={GOLD} /><rect x={83} y={9} width={24} height={8} fill={GOLD} />
    <polygon points="20,104 14,44 54,72 95,20 136,72 176,44 170,104" fill={GOLD} stroke={GOLD_DK} strokeWidth={2.5} strokeLinejoin="round" />
    <rect x={20} y={86} width={150} height={22} fill={NAVYC} stroke={GOLD_DK} strokeWidth={2} />
    <rect x={24} y={90} width={142} height={5} fill={GOLD_LT} opacity={0.5} />
    {[38, 68, 95, 122, 152].map((cx, i) => <circle key={i} cx={cx} cy={97} r={5} fill={i % 2 ? GOLD_LT : CLAY} />)}
    <circle cx={14} cy={40} r={9} fill={GOLD_LT} /><circle cx={95} cy={16} r={10} fill={GOLD_LT} /><circle cx={176} cy={40} r={9} fill={GOLD_LT} />
  </svg>
);

/* ------------------------------------------------- shield with a cog */
const Shield: React.FC = () => {
  const cx = 960, cyG = 306;
  const teeth = Array.from({ length: 12 }, (_, i) => (
    <rect key={i} x={cx - 8} y={cyG - 76} width={16} height={22} rx={3} fill={GOLD} transform={`rotate(${i * 30} ${cx} ${cyG})`} />
  ));
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {/* shield */}
      <path d="M846 184 H1074 V300 C1074 362 1028 404 960 436 C892 404 846 362 846 300 Z" fill={NAVYC} stroke={GOLD} strokeWidth={7} />
      <path d="M846 184 H1074 V300 C1074 362 1028 404 960 436 C892 404 846 362 846 300 Z" fill="none" stroke={GOLD_LT} strokeWidth={2} opacity={0.5} transform="translate(0 5)" />
      {/* cog */}
      {teeth}
      <circle cx={cx} cy={cyG} r={56} fill={GOLD} />
      <circle cx={cx} cy={cyG} r={40} fill={NAVYC} />
      <circle cx={cx} cy={cyG} r={40} fill="none" stroke={GOLD_LT} strokeWidth={2} opacity={0.6} />
      <circle cx={cx} cy={cyG} r={13} fill={GOLD_LT} />
    </svg>
  );
};

/* ------------------------------------------------- scroll banner */
const Scroll: React.FC<{ w: number; h: number; label: string; fs: number; ls: number }> = ({ w, h, label, fs, ls }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <polygon points={`22,${h * 0.62} 4,${h * 0.44} 4,${h * 0.9} 34,${h * 0.86}`} fill={GOLD_DK} />
      <polygon points={`${w - 22},${h * 0.62} ${w - 4},${h * 0.44} ${w - 4},${h * 0.9} ${w - 34},${h * 0.86}`} fill={GOLD_DK} />
      <polygon points={`40,${h * 0.24} ${w - 40},${h * 0.24} ${w - 18},${h * 0.5} ${w - 40},${h * 0.76} 40,${h * 0.76} 18,${h * 0.5}`} fill={GOLD} stroke={GOLD_DK} strokeWidth={2} />
      <rect x={40} y={h * 0.3} width={w - 80} height={4} fill={GOLD_LT} opacity={0.7} />
    </svg>
    <div style={{ position: "absolute", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: fs, letterSpacing: ls, color: INK }}>{label}</div>
  </div>
);

/* ============================================================== the cover */
export const AiFoundersGuildRoyal: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <Frame />

      {/* ---- COAT OF ARMS ------------------------------------------------- */}
      <Shield />
      <div style={{ position: "absolute", left: 960 - 95, top: 96 }}><Crown /></div>

      {/* supporters */}
      <div style={{ position: "absolute", left: 792 - 88, top: 452 - 0.92 * 178, width: 178, height: 178 }}>
        <Mascot lf={14} size={178} gaze={4} nodAmp={0} stern={0.3} tint={CLAY} hardHat={1} />
      </div>
      <div style={{ position: "absolute", left: 1128 - 88, top: 452 - 0.92 * 178, width: 178, height: 178 }}>
        <Mascot lf={29} size={178} gaze={-4} nodAmp={0} tint={CLAY} wizard={1} />
      </div>

      {/* anno scroll under the shield */}
      <div style={{ position: "absolute", left: 960 - 165, top: 430 }}><Scroll w={330} h={64} label="ANNO · MMXXVI" fs={21} ls={6} /></div>

      {/* ---- WORDMARK ----------------------------------------------------- */}
      <div style={{ position: "absolute", top: 512, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 44, letterSpacing: 22, color: GOLD_DK, paddingLeft: 22 }}>
        <Star s={16} /> AI&nbsp;&nbsp;FOUNDERS <Star s={16} />
      </div>
      <div style={{ position: "absolute", top: 542, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 246, lineHeight: 1, color: NAVYC, letterSpacing: "0.01em", textShadow: "0 3px 0 rgba(110,82,32,0.18)" }}>
        GUILD
      </div>

      {/* filigree + motto */}
      <div style={{ position: "absolute", top: 812, left: 0, right: 0, display: "flex", justifyContent: "center" }}><Flourish w={520} /></div>
      <div style={{ position: "absolute", top: 856, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, letterSpacing: 8, color: GOLD_DK }}>
        BUILD · AUTOMATE · EARN
      </div>
    </AbsoluteFill>
  );
};
