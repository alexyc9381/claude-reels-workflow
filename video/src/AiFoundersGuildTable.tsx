import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   @nocodealex  ·  SKOOL COVER  ·  "AI Founders Guild"  ·  BOARDROOM v2
   Light cream brand style. Clay Mascots as BIG suited entrepreneurs around
   a boardroom table, penthouse skyline behind, a table full of founder
   props. Fraunces title + lime highlighter. Rendered STILL.
   ========================================================================= */

const CREAM2 = "#E3DDD0", INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F6F1E7", LIME = "#C7EB6A";
const WOOD = "#6E4E37", WOOD_TOP = "#7E5B42", WOOD_RIM = "#906B4C", WOOD_DK = "#472F1E", GREEN = "#3F9E74", SCREEN = "#5E7E93";
const BILL = "#8CB69A", BILL2 = "#7BA588", BILL_TOP = "#A7CCB0", BAND = "#DEC77E";
const GOLD = "#CFA24A", GOLD_LT = "#EBCF7E", GOLD_TOP = "#F4E1A0", GOLD_DK = "#98722C";
const HOLO = "#78D2EB", HOLO_LT = "#CFF3FC";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
function hexToRgb(h: string) { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; }
function hexA(h: string, a: number) { const { r, g, b } = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }

/* ----------------------------------------------------------- background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(152deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: 480, top: 20, width: 980, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.12), transparent 66%)", filter: "blur(16px)" }} />
    <div style={{ position: "absolute", left: -140, top: -160, width: 820, height: 820, background: "radial-gradient(circle at 34% 34%, rgba(255,248,235,0.5), transparent 60%)" }} />
    {Array.from({ length: 22 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1920, top: seed(i * 1.7) * 360, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(60,50,38,0.15)" }} />
  </AbsoluteFill>
);

/* ------------------------------------------------- penthouse skyline */
const Skyline: React.FC = () => {
  const base = 636;
  let x = 96;
  const blds = Array.from({ length: 17 }, (_, i) => {
    const w = 66 + seed(i * 3.1) * 66;
    const h = 86 + seed(i * 1.7 + 2) * 250;
    const rec = { x, w, h, tone: [ "#D5C6A6", "#CDBD9B", "#DED0B2" ][i % 3] };
    x += w + 6;
    return rec;
  });
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {blds.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h} fill={b.tone} />
          {Array.from({ length: Math.floor(b.h / 34) }, (_, r) => (
            [0, 1, 2].map((c) => {
              const lit = seed(i * 9.3 + r * 2.1 + c) > 0.78;
              return <rect key={`${r}-${c}`} x={b.x + 10 + c * (b.w - 20) / 3} y={base - b.h + 16 + r * 34} width={(b.w - 26) / 3} height={16} fill={lit ? "#EBC873" : "#BEAD8B"} opacity={lit ? 0.75 : 0.4} />;
            })
          ))}
        </g>
      ))}
      {/* golden-hour glow behind the city */}
      <ellipse cx={960} cy={624} rx={860} ry={168} fill="rgba(243,199,126,0.17)" />
      {/* window mullions -> floor-to-ceiling glass */}
      {[360, 720, 1080, 1440, 1800].map((mx, i) => <rect key={i} x={mx} y={300} width={5} height={336} fill={hexA("#8B7A58", 0.26)} />)}
      <rect x={80} y={632} width={1760} height={6} fill={hexA("#8B7A58", 0.34)} />
      {/* soft haze so the city stays a backdrop */}
      <rect x={0} y={300} width={1920} height={340} fill="url(#haze)" />
      <defs><linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(239,235,227,0.12)" /><stop offset="100%" stopColor="rgba(239,235,227,0.6)" /></linearGradient></defs>
    </svg>
  );
};

type Seat = { x: number; edgeY: number; size: number; gaze: number; costume: Record<string, number> };
const SEATS: Seat[] = [
  { x: 529, edgeY: 616, size: 264, gaze: 3, costume: { suit: 1 } },
  { x: 753, edgeY: 552, size: 228, gaze: 2, costume: { glasses: 1 } },
  { x: 960, edgeY: 538, size: 210, gaze: 0, costume: { suit: 1, stern: 0.32 } },
  { x: 1167, edgeY: 552, size: 228, gaze: -2, costume: { wizard: 1 } },
  { x: 1391, edgeY: 616, size: 264, gaze: -3, costume: { suit: 1, glasses: 1 } },
];
const FRAC = 0.6;

/* the hoard: cash + gold coins + bars piled across the table and ALL around */
type Loot = { t: "coins" | "cash" | "bars"; x: number; y: number; h?: number; r?: number; w?: number };
const HOARD: Loot[] = [
  // a modest pile on the table (center-front)
  { t: "coins", x: 902, y: 792, h: 46, r: 24 }, { t: "coins", x: 1006, y: 786, h: 36, r: 21 },
  { t: "bars", x: 952, y: 812, w: 56 },
  { t: "cash", x: 900, y: 828, r: -3, w: 78 }, { t: "cash", x: 1028, y: 830, r: 5, w: 70 },
  { t: "coins", x: 706, y: 812, h: 40, r: 22 }, { t: "coins", x: 1220, y: 812, h: 38, r: 21 },
  // a little in front / around the table base
  { t: "coins", x: 324, y: 984, h: 56, r: 28 }, { t: "bars", x: 424, y: 1002, w: 62 }, { t: "cash", x: 528, y: 996, r: -4, w: 90 },
  { t: "coins", x: 1596, y: 984, h: 56, r: 28 }, { t: "bars", x: 1496, y: 1002, w: 62 }, { t: "cash", x: 1392, y: 996, r: 4, w: 90 },
];

/* small on-table helpers */
const Mug: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M14 -14 q 18 4 0 26" fill="none" stroke="#E9E2D4" strokeWidth={6} />
    <rect x={-17} y={-18} width={34} height={40} rx={7} fill="#F5F0E6" stroke="rgba(0,0,0,0.1)" />
    <ellipse cx={0} cy={-18} rx={17} ry={6} fill={hexA(CLAY, 0.4)} />
    <path d="M-4 -30 q 5 -6 0 -12 M6 -30 q 5 -6 0 -12" fill="none" stroke={hexA("#8B8578", 0.4)} strokeWidth={2.4} strokeLinecap="round" />
  </g>
);
const Laptop: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-64} y={-8} width={128} height={15} rx={4} fill="#4A4640" />
    <rect x={-56} y={-56} width={112} height={52} rx={5} fill="#2C2A26" />
    <rect x={-49} y={-49} width={98} height={38} rx={2} fill={SCREEN} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-40 + k * 22} y={-16 - k * 5 - 4} width={13} height={5 + k * 9} fill={GREEN} opacity={0.9} />)}
  </g>
);

/* --- aspiration props: cash, gold, an AI hologram --- */
const CashStack: React.FC<{ x: number; y: number; r?: number; w?: number }> = ({ x, y, r = 0, w = 78 }) => {
  const bh = w * 0.44, L = 4;
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      {Array.from({ length: L }, (_, k) => <rect key={k} x={-w / 2} y={-k * 5} width={w} height={bh} rx={4} fill={k % 2 ? BILL2 : BILL} stroke="rgba(0,0,0,0.12)" />)}
      <rect x={-w / 2} y={-L * 5} width={w} height={bh} rx={4} fill={BILL_TOP} stroke="rgba(0,0,0,0.14)" />
      <rect x={-w / 2} y={-L * 5 + bh / 2 - 8} width={w} height={16} fill={BAND} />
      <circle cx={0} cy={-L * 5 + bh / 2} r={8.5} fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth={2} />
      <text x={0} y={-L * 5 + bh / 2 + 6} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={800} fontSize={16} fill="rgba(0,0,0,0.45)">$</text>
    </g>
  );
};
const CoinStack: React.FC<{ x: number; y: number; h?: number; r?: number }> = ({ x, y, h = 50, r = 24 }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={r} ry={r * 0.42} fill={GOLD_DK} />
    <rect x={-r} y={-h} width={r * 2} height={h} fill={GOLD} />
    {Array.from({ length: Math.floor(h / 9) }, (_, k) => <ellipse key={k} cx={0} cy={-k * 9} rx={r} ry={r * 0.42} fill="none" stroke={GOLD_DK} strokeWidth={1.4} opacity={0.5} />)}
    <ellipse cx={0} cy={-h} rx={r} ry={r * 0.42} fill={GOLD_TOP} stroke={GOLD_DK} strokeWidth={1.6} />
    <ellipse cx={-r * 0.22} cy={-h - r * 0.04} rx={r * 0.5} ry={r * 0.2} fill="#FCEFC6" opacity={0.85} />
  </g>
);
const GoldBar: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 52 }) => {
  const h = w * 0.34;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={`${-w / 2},0 ${w / 2},0 ${w / 2 - 7},${h} ${-w / 2 + 7},${h}`} fill={GOLD} stroke={GOLD_DK} strokeWidth={1.4} />
      <polygon points={`${-w / 2},0 ${w / 2},0 ${w / 2 - 4},-6 ${-w / 2 + 4},-6`} fill={GOLD_TOP} />
    </g>
  );
};
const GoldBarStack: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 52 }) => (
  <g><GoldBar x={x - w * 0.56} y={y} w={w} /><GoldBar x={x + w * 0.56} y={y} w={w} /><GoldBar x={x} y={y - w * 0.44} w={w} /></g>
);
const Spark: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 14, c = GOLD_LT }) => (
  <g transform={`translate(${x} ${y})`}><polygon points={`0,${-s} ${s * 0.22},${-s * 0.22} ${s},0 ${s * 0.22},${s * 0.22} 0,${s} ${-s * 0.22},${s * 0.22} ${-s},0 ${-s * 0.22},${-s * 0.22}`} fill={c} /></g>
);
const Hologram: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const w = 190, h = 130;
  return (
    <g>
      <ellipse cx={cx} cy={cy + h * 0.62} rx={w * 0.36} ry={12} fill={HOLO} opacity={0.4} />
      <polygon points={`${cx - w * 0.26},${cy + h * 0.55} ${cx + w * 0.26},${cy + h * 0.55} ${cx + w * 0.5},${cy - h * 0.5} ${cx - w * 0.5},${cy - h * 0.5}`} fill={HOLO} opacity={0.1} />
      <ellipse cx={cx} cy={cy} rx={w * 0.66} ry={h * 0.64} fill="url(#holo)" />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill={HOLO} opacity={0.16} stroke={HOLO_LT} strokeWidth={2} />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={cx - w * 0.34 + k * w * 0.2} y={cy + h * 0.26 - k * h * 0.11} width={w * 0.11} height={h * 0.16 + k * h * 0.11} rx={2} fill={HOLO_LT} opacity={0.82} />)}
      <path d={`M${cx - w * 0.36} ${cy + h * 0.06} L ${cx - w * 0.1} ${cy - h * 0.12} L ${cx + w * 0.14} ${cy - h * 0.02} L ${cx + w * 0.38} ${cy - h * 0.32}`} fill="none" stroke="#F0FCFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${cx + w * 0.38} ${cy - h * 0.42})`}><polygon points="0,-11 2.4,-2.4 11,0 2.4,2.4 0,11 -2.4,2.4 -11,0 -2.4,-2.4" fill="#F0FCFF" /></g>
    </g>
  );
};

export const AiFoundersGuildTable: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <Skyline />

      {/* warm boardroom light pooling over the group */}
      <div style={{ position: "absolute", left: 380, top: 288, width: 1160, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,243,220,0.45), transparent 64%)", filter: "blur(10px)" }} />

      {/* floor shadow */}
      <div style={{ position: "absolute", left: 960 - 600, top: 872, width: 1200, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,32,22,0.24), transparent 68%)", filter: "blur(7px)" }} />

      {/* the entrepreneurs */}
      {SEATS.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: s.x - s.size / 2, top: s.edgeY - FRAC * s.size, width: s.size, height: s.size }}>
          <Mascot lf={6 + i * 13} size={s.size} gaze={s.gaze} nodAmp={0} nodSpeed={10} tint={CLAY} {...(s.costume as any)} />
        </div>
      ))}

      {/* the boardroom table (occludes lower bodies -> "seated") */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="sheen" cx="50%" cy="30%" r="66%"><stop offset="0%" stopColor={WOOD_TOP} /><stop offset="100%" stopColor={WOOD} /></radialGradient>
        </defs>
        <ellipse cx={960} cy={720} rx={510} ry={168} fill={WOOD_DK} />
        <ellipse cx={960} cy={704} rx={508} ry={166} fill="url(#sheen)" stroke={WOOD_RIM} strokeWidth={4} />
        <ellipse cx={960} cy={686} rx={468} ry={136} fill="none" stroke={hexA("#FFFFFF", 0.09)} strokeWidth={2} />
        {/* brass inlay rim + polished sheen */}
        <ellipse cx={960} cy={704} rx={486} ry={157} fill="none" stroke="#C6A45E" strokeWidth={2.5} opacity={0.55} />
        <ellipse cx={960} cy={704} rx={474} ry={150} fill="none" stroke="#C6A45E" strokeWidth={1.3} opacity={0.3} />
        <ellipse cx={960} cy={646} rx={384} ry={98} fill="rgba(255,248,232,0.11)" />
        {/* engraved guild seal inlaid in the table */}
        <g opacity={0.4}>
          <ellipse cx={960} cy={628} rx={66} ry={26} fill="none" stroke="#3A2716" strokeWidth={3} />
          <ellipse cx={960} cy={628} rx={54} ry={20} fill="none" stroke="#3A2716" strokeWidth={1.4} />
          <text x={960} y={637} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={700} fontSize={27} letterSpacing={3} fill="#3A2716">AFG</text>
        </g>
      </svg>

      {/* founders' contact shadows on the table (grounds them) */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs><radialGradient id="cshadow"><stop offset="0%" stopColor="rgba(38,26,14,0.24)" /><stop offset="68%" stopColor="rgba(38,26,14,0.06)" /><stop offset="100%" stopColor="rgba(38,26,14,0)" /></radialGradient></defs>
        {SEATS.map((s, i) => <ellipse key={i} cx={s.x} cy={s.edgeY + 7} rx={s.size * 0.4} ry={s.size * 0.1} fill="url(#cshadow)" />)}
      </svg>

      {/* faint reflections of the founders on the glossy tabletop */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs><linearGradient id="frefl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(158,108,78,0.17)" /><stop offset="100%" stopColor="rgba(158,108,78,0)" /></linearGradient></defs>
        {SEATS.map((s, i) => <ellipse key={i} cx={s.x} cy={s.edgeY + s.size * 0.24} rx={s.size * 0.23} ry={s.size * 0.27} fill="url(#frefl)" />)}
      </svg>

      {/* money + gold, all around them */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {/* warm halo + reflection so the pile glows and feels valuable */}
        <ellipse cx={960} cy={806} rx={190} ry={94} fill="rgba(232,192,112,0.15)" />
        <ellipse cx={960} cy={854} rx={150} ry={26} fill="rgba(214,170,80,0.24)" />
        {HOARD.map((g, i) => g.t === "coins"
          ? <CoinStack key={i} x={g.x} y={g.y} h={g.h} r={g.r} />
          : g.t === "cash"
            ? <CashStack key={i} x={g.x} y={g.y} r={g.r} w={g.w} />
            : <GoldBarStack key={i} x={g.x} y={g.y} w={g.w} />)}
        {/* glints */}
        <Spark x={952} y={780} s={13} /><Spark x={324} y={962} s={11} /><Spark x={1596} y={962} s={11} />
      </svg>

      {/* premium framing vignette (scene only; text sits on top) */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(70,52,30,0.22), inset 0 -70px 130px rgba(70,52,30,0.10)", pointerEvents: "none" }} />

      {/* ---- WORDMARK ----------------------------------------------------- */}
      {/* wordmark: AI FOUNDERS is the hero; GUILD is a refined society label */}
      <div style={{ position: "absolute", top: 62, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 152, lineHeight: 0.96, letterSpacing: "0.03em", color: INK, paddingLeft: "0.03em" }}>AI FOUNDERS</div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 24 }}>
          <div style={{ width: 156, height: 3, background: "linear-gradient(90deg, transparent, #B8934A)" }} />
          <div style={{ width: 13, height: 13, background: "#B8934A", transform: "rotate(45deg)" }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 60, letterSpacing: "0.5em", color: INK, paddingLeft: "0.5em" }}>GUILD</div>
          <div style={{ width: 13, height: 13, background: "#B8934A", transform: "rotate(45deg)" }} />
          <div style={{ width: 156, height: 3, background: "linear-gradient(90deg, #B8934A, transparent)" }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, letterSpacing: "0.36em", color: MUTE, marginTop: 16, paddingLeft: "0.36em" }}>EST · 2026</div>
      </div>

      {/* tagline */}
      <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 34, letterSpacing: "0.02em", color: INK, opacity: 0.74 }}>
        Your seat at the table.
      </div>
    </AbsoluteFill>
  );
};
