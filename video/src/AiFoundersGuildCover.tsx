import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   @nocodealex  ·  SKOOL COMMUNITY COVER  ·  "AI Founders Guild"
   Landscape 1920x1080 (16:9). Built BOLD + SIMPLE so it survives the tiny
   Skool thumbnail: giant headline, one high-contrast line, big clay Mascot
   GUILD. No fine print. Rendered as a STILL (frame 0).
   ========================================================================= */

const CREAM2 = "#E3DDD0", INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F5F1E8";
const LIME = "#C7EB6A";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
function hexToRgb(h: string) { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; }
function hexA(h: string, a: number) { const { r, g, b } = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }

/* --------------------------------------------------------- hand-drawn ink */
const Squiggle: React.FC<{ w: number; color?: string; sw?: number }> = ({ w, color = CLAY, sw = 6 }) => (
  <svg width={w} height={18} viewBox="0 0 160 13" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
    <path d="M2 7 C 26 2, 52 11, 78 6 S 128 2, 158 7" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------- background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(152deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: 780, top: 200, width: 1200, height: 1200, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.15), transparent 62%)", filter: "blur(16px)" }} />
    <div style={{ position: "absolute", right: -240, bottom: -280, width: 880, height: 880, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.11), transparent 62%)", filter: "blur(18px)" }} />
    <div style={{ position: "absolute", left: -140, top: -180, width: 880, height: 880, background: "radial-gradient(circle at 34% 34%, rgba(255,248,235,0.6), transparent 60%)" }} />
    {Array.from({ length: 26 }, (_, i) => (<div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1920, top: seed(i * 1.7) * 1080, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.10)" : "rgba(255,255,255,0.5)" }} />))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(60,50,38,0.16)" }} />
  </AbsoluteFill>
);

/* ------------------------------------------------------- ground shadow */
const Shadow: React.FC<{ cx: number; cy: number; w: number; op?: number }> = ({ cx, cy, w, op = 0.2 }) => (
  <div style={{ position: "absolute", left: cx - w / 2, top: cy, width: w, height: w * 0.2, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(50,42,32,${op}), transparent 70%)`, filter: "blur(3px)" }} />
);

/* ----------------------------------------------- one member of the guild */
type Member = { costume: Record<string, number>; size: number; cx: number; base: number; gaze: number; tint?: string; extra?: Record<string, number> };
const GuildMember: React.FC<{ m: Member; lf: number }> = ({ m, lf }) => (
  <div style={{ position: "absolute", left: m.cx - m.size / 2, top: m.base - m.size * 0.92, width: m.size, height: m.size }}>
    <Mascot lf={lf} size={m.size} gaze={m.gaze} nodAmp={0} nodSpeed={10} tint={m.tint} {...(m.costume as any)} {...(m.extra as any)} />
  </div>
);

/* =========================================================== the cover */
export const AiFoundersGuildCover: React.FC = () => {
  // BACK row (further: higher, smaller, cooler tint, hat-distinct so heads peek)
  const back: Member[] = [
    { costume: { wizard: 1 }, size: 268, cx: 1350, base: 800, gaze: 1, tint: "#C98A6E", extra: { cheer: 0.2 } },
    { costume: { beret: 1 }, size: 274, cx: 1596, base: 802, gaze: -1, tint: "#C98A6E" },
  ];
  // FRONT row (closer: lower, larger, full clay)
  const front: Member[] = [
    { costume: { capBack: 1 }, size: 292, cx: 1238, base: 902, gaze: 2, extra: { cheer: 0.26 } },
    { costume: { hardHat: 1 }, size: 380, cx: 1472, base: 910, gaze: 0, extra: { cheer: 0.13 } },
    { costume: { glasses: 1 }, size: 306, cx: 1722, base: 900, gaze: -2 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />

      {/* soft spotlight lifting the crowd off the paper */}
      <div style={{ position: "absolute", left: 1010, top: 300, width: 920, height: 760, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,251,244,0.75), transparent 66%)" }} />

      {/* ---- LEFT: giant title + one bold line --------------------------- */}
      <div style={{ position: "absolute", left: 116, top: 0, height: 1080, width: 1010, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, color: INK, letterSpacing: "-0.035em", lineHeight: 0.9 }}>
          <div style={{ fontSize: 152 }}>AI Founders</div>
          <div style={{ display: "inline-block", position: "relative", marginTop: 18, padding: "0 24px" }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: "28%", bottom: "13%", background: LIME, borderRadius: 12, transform: "rotate(-1.4deg)", opacity: 0.95 }} />
            <span style={{ position: "relative", fontSize: 196 }}>Guild</span>
          </div>
        </div>

        <div style={{ marginTop: 46 }}><Squiggle w={360} color={CLAY} sw={6} /></div>

        <div style={{ marginTop: 30, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 52, color: INK, letterSpacing: "-0.015em" }}>
          Turn AI into income. <span style={{ color: CLAY }}>No code.</span>
        </div>
      </div>

      {/* handle, big enough to actually read */}
      <div style={{ position: "absolute", left: 120, bottom: 50, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40, color: INK, opacity: 0.88, letterSpacing: "-0.01em" }}>@nocodealex</div>

      {/* ---- RIGHT: the guild (big + simple) ----------------------------- */}
      <Shadow cx={1482} cy={896} w={880} op={0.15} />
      {front.map((m, i) => (<Shadow key={`sf${i}`} cx={m.cx} cy={m.base - 6} w={m.size * 0.74} op={0.22} />))}
      {back.map((m, i) => (<GuildMember key={`b${i}`} m={m} lf={12 + i * 17} />))}
      {front.map((m, i) => (<GuildMember key={`f${i}`} m={m} lf={6 + i * 23} />))}
    </AbsoluteFill>
  );
};
