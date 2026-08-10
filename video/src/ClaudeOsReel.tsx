import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_os.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): S0 hook · S1 problem · S2 promise · S3 save · S4 21st.dev · S5 aceternity+magicui · S6 mobbin · S7 tweakcn · S8 cta
const L = [0, 6.44, 11.62, 14.59, 23.10, 26.59, 35.12, 38.67, 45.90, 51.47];
const Lf = L.map(fr);
const CUT = 55.41;                 // full VO length (5 cut-cuts spliced, gaps capped)
const STAGEMARKS = [L[4], L[5], L[6], L[7]];  // the licence-program milestones

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
      <div style={{ position: "absolute", left: -140, top: 240, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.16), transparent 62%)", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", right: -170, top: 620, width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.14), transparent 62%)", filter: "blur(12px)" }} />
      <div style={{ position: "absolute", left: -60, top: -60, width: 700, height: 700, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.5), transparent 60%)" }} />
      {Array.from({ length: 16 }, (_, i) => { const s = seed(i + 3); const x = seed(i * 2.3) * 1080; const y = ((seed(i * 1.7) * 1920 + f * (0.3 + s * 0.5)) % 1920); return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)", opacity: 0.25 + s * 0.3 }} />); })}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(40,32,24,0.28)" }} />
    </AbsoluteFill>
  );
};

const Panel: React.FC<{ children?: React.ReactNode; tint?: string; label?: string }> = ({ children, tint, label }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(120,150,210,0.22)"}` }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)" }} />
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, alignItems: "center" }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
      {label && <div style={{ marginLeft: 14, fontFamily: mono, fontSize: 22, color: "rgba(190,205,235,0.6)" }}>{label}</div>}
    </div>
    {children}
  </div>
);

const Pill: React.FC<{ text: string; x: number; y: number; o?: number }> = ({ text, x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, padding: "7px 16px", borderRadius: 999, background: "rgba(20,30,52,0.9)", border: "1.5px solid rgba(150,170,215,0.4)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.92)", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: 18 }}>◍</span>{text}
  </div>
);

const Chip: React.FC<{ text: string; bg: string; bd: string; fg: string; size?: number }> = ({ text, bg, bd, fg, size = 40 }) => (
  <div style={{ padding: `${size * 0.34}px ${size * 0.7}px`, borderRadius: 18, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: `0 18px 40px -14px rgba(10,16,34,0.7)`, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);

// pixel Claude mascot (canonical critter) + costumes
export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; tint?: string; beret?: number; shades?: number; bowtie?: number; heistMask?: number; paint?: number; suit?: number; earpiece?: number; hardHat?: number; capBack?: number; hiVis?: number; freshEyes?: number; wrapShades?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, tint, beret = 0, shades = 0, bowtie = 0, heistMask = 0, paint = 0, suit = 0, earpiece = 0, hardHat = 0, capBack = 0, hiVis = 0, freshEyes = 0, wrapShades = 0 }) => {
  const C = tint || "#D97757";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  const armY = 86 - hop * 0.4 - cheer * 26;
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {/* wizard robe */}
        {wizard > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#4B3E8E" />
          <rect x={34} y={102} width={132} height={6} fill="#3A2F73" />
          <rect x={70} y={116} width={9} height={9} fill="#E7B24C" />
          <rect x={120} y={124} width={9} height={9} fill="#E7B24C" />
          <rect x={52} y={128} width={8} height={8} fill="#E7B24C" />
        </>}
        {/* judge robe + collar + gavel */}
        {judge > 0 && <>
          <rect x={34} y={100} width={132} height={46} fill="#2A2438" />
          <rect x={34} y={100} width={132} height={6} fill="#1D1930" />
          <rect x={84} y={100} width={14} height={18} fill="#F4EEE2" />
          <rect x={102} y={100} width={14} height={18} fill="#F4EEE2" />
          <rect x={176} y={armY - 30} width={9} height={44} fill="#8A6844" transform={`rotate(24 180 ${armY - 8})`} />
          <rect x={168} y={armY - 44} width={30} height={17} fill="#6E5236" transform={`rotate(24 183 ${armY - 36})`} />
        </>}
        {/* sherlock cape */}
        {sherlock > 0 && <>
          <rect x={30} y={98} width={140} height={26} fill="#9C7A50" />
          <rect x={30} y={120} width={140} height={5} fill="#7A5A3C" />
          <rect x={64} y={104} width={8} height={8} fill="#7A5A3C" /><rect x={126} y={106} width={8} height={8} fill="#7A5A3C" />
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {/* THE VILLAIN's suit: black jacket, sharp shoulders, white collar, skinny tie, dark trousers */}
        {suit > 0 && <>
          <rect x={52} y={146 - legLift(0)} width={17} height={38} fill="#1A1D24" />
          <rect x={77} y={146 - legLift(1)} width={17} height={38} fill="#1A1D24" />
          <rect x={124} y={146 - legLift(0)} width={17} height={38} fill="#1A1D24" />
          <rect x={149} y={146 - legLift(1)} width={17} height={38} fill="#1A1D24" />
          {/* an OPEN jacket, not a black box: the slate body still reads between the lapels */}
          <rect x={70} y={100} width={60} height={46} fill="#E6E3DA" />
          <rect x={34} y={100} width={38} height={46} fill="#15171C" />
          <rect x={128} y={100} width={38} height={46} fill="#15171C" />
          <rect x={34} y={100} width={38} height={5} fill="#272C36" />
          <rect x={128} y={100} width={38} height={5} fill="#272C36" />
          <rect x={26} y={100} width={12} height={22} fill="#15171C" />
          <rect x={162} y={100} width={12} height={22} fill="#15171C" />
          <polygon points="72,100 97,100 72,142" fill="#20242E" />
          <polygon points="128,100 103,100 128,142" fill="#20242E" />
          <rect x={94} y={100} width={13} height={46} fill="#0B0D11" />
          <rect x={94} y={100} width={13} height={4} fill="#2A3038" />
          <rect x={137} y={110} width={7} height={7} fill={FAKE} />
        </>}
        {/* hi-vis vest (YOU, the instructor cameo) */}
        {hiVis > 0 && <>
          <rect x={38} y={94} width={124} height={52} fill="#E4C43A" />
          <rect x={38} y={104} width={124} height={7} fill="#EDEAE0" />
          <rect x={38} y={126} width={124} height={7} fill="#EDEAE0" />
          <rect x={96} y={94} width={9} height={52} fill="rgba(0,0,0,0.18)" />
        </>}
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {/* FRESH EYES: no memory, no ego. Eyes burn clean white. */}
        {freshEyes > 0 && <>
          <rect x={68 + gaze} y={68 + (26 - eyeH) / 2} width={19} height={eyeH + 4} fill="#F6FBFF" opacity={0.35 * freshEyes} />
          <rect x={114 + gaze} y={68 + (26 - eyeH) / 2} width={19} height={eyeH + 4} fill="#F6FBFF" opacity={0.35 * freshEyes} />
          <rect x={70 + gaze} y={70 + (26 - eyeH) / 2} width={15} height={eyeH} fill="#FFFFFF" opacity={freshEyes} />
          <rect x={116 + gaze} y={70 + (26 - eyeH) / 2} width={15} height={eyeH} fill="#FFFFFF" opacity={freshEyes} />
        </>}
        {/* smart glasses */}
        {glasses > 0 && <>
          <rect x={62} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} />
          <rect x={108} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} />
          <rect x={94} y={74} width={14} height={5} fill="#151312" />
          <rect x={34} y={72} width={28} height={5} fill="#151312" />
          <rect x={140} y={72} width={26} height={5} fill="#151312" />
          <rect x={66} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
          <rect x={112} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
        </>}
        {/* extra brain on the head */}
        {brainHat > 0 && <>
          <rect x={58} y={20} width={84} height={26} fill="#E8A2B8" />
          <rect x={66} y={10} width={22} height={16} fill="#E8A2B8" />
          <rect x={92} y={4} width={24} height={20} fill="#E8A2B8" />
          <rect x={118} y={10} width={20} height={16} fill="#E8A2B8" />
          <rect x={72} y={18} width={56} height={4} fill="#C97F97" />
          <rect x={96} y={26} width={4} height={16} fill="#C97F97" />
        </>}
        {/* sherlock deerstalker */}
        {sherlock > 0 && <>
          <rect x={26} y={32} width={148} height={10} fill="#8A6844" />
          <rect x={44} y={10} width={112} height={24} fill="#9C7A50" />
          <rect x={88} y={2} width={24} height={10} fill="#8A6844" />
          <rect x={60} y={16} width={8} height={8} fill="#7A5A3C" /><rect x={100} y={20} width={8} height={8} fill="#7A5A3C" /><rect x={132} y={14} width={8} height={8} fill="#7A5A3C" />
        </>}
        {/* judge wig: white curls */}
        {judge > 0 && <>
          <rect x={40} y={24} width={120} height={20} fill="#F4EEE2" />
          <rect x={30} y={40} width={22} height={40} fill="#F4EEE2" />
          <rect x={148} y={40} width={22} height={40} fill="#F4EEE2" />
          <rect x={30} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={148} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={40} y={36} width={120} height={5} fill="#D9D2C2" />
        </>}
        {/* wizard hat */}
        {wizard > 0 && <>
          <polygon points="100,0 62,40 138,40" fill="#4B3E8E" />
          <rect x={46} y={36} width={108} height={12} fill="#3A2F73" />
          <rect x={94} y={8} width={10} height={10} fill="#E7B24C" />
          <rect x={78} y={24} width={8} height={8} fill="#E7B24C" />
          <rect x={112} y={22} width={8} height={8} fill="#E7B24C" />
          {/* the wand, held in the right nub */}
          <rect x={182} y={armY - 34} width={7} height={54} fill="#8A6844" transform={`rotate(26 185 ${armY + 8})`} />
          <rect x={196} y={armY - 46} width={14} height={14} fill="#E7B24C" transform={`rotate(26 203 ${armY - 39})`} />
          <rect x={200} y={armY - 42} width={6} height={6} fill="#FFF3D6" transform={`rotate(26 203 ${armY - 39})`} />
        </>}
        {/* bow tie (VIP / expensive) */}
        {bowtie > 0 && <>
          <polygon points="82,104 100,114 82,124" fill="#1E1B26" />
          <polygon points="118,104 100,114 118,124" fill="#1E1B26" />
          <rect x={95} y={109} width={10} height={10} fill="#0E0C14" />
        </>}
        {/* cool shades */}
        {shades > 0 && <>
          <rect x={60} y={66} width={36} height={22} rx={5} fill="#151312" />
          <rect x={104} y={66} width={36} height={22} rx={5} fill="#151312" />
          <rect x={94} y={73} width={12} height={5} fill="#151312" />
          <rect x={34} y={72} width={28} height={5} fill="#151312" />
          <rect x={140} y={72} width={26} height={5} fill="#151312" />
          <rect x={66} y={70} width={13} height={5} fill="rgba(255,255,255,0.4)" transform="rotate(-14 72 72)" />
          <rect x={110} y={70} width={13} height={5} fill="rgba(255,255,255,0.4)" transform="rotate(-14 116 72)" />
        </>}
        {/* heist balaclava eye-band (Mobbin spy) */}
        {heistMask > 0 && <>
          <rect x={30} y={58} width={140} height={30} fill="#1B1F2A" />
          <rect x={30} y={58} width={140} height={5} fill="#0E1119" />
          <rect x={68} y={66} width={20} height={16} rx={3} fill="#F4EEE2" />
          <rect x={112} y={66} width={20} height={16} rx={3} fill="#F4EEE2" />
          <rect x={73} y={70} width={11} height={9} fill="#151312" />
          <rect x={117} y={70} width={11} height={9} fill="#151312" />
        </>}
        {/* painter beret (designer / artist) */}
        {beret > 0 && <>
          <ellipse cx={100} cy={44} rx={49} ry={9} fill="rgba(0,0,0,0.18)" transform="rotate(-9 100 44)" />
          <ellipse cx={100} cy={41} rx={50} ry={11} fill="#A63B26" transform="rotate(-9 100 41)" />
          <ellipse cx={94} cy={26} rx={57} ry={20} fill="#C6472F" transform="rotate(-9 100 31)" />
          <ellipse cx={77} cy={19} rx={19} ry={6} fill="rgba(255,255,255,0.22)" transform="rotate(-9 77 19)" />
          <circle cx={107} cy={8} r={6} fill="#C6472F" />
        </>}
        {/* paint brush in the right nub (tweakcn) */}
        {paint > 0 && <>
          <rect x={182} y={armY - 30} width={6} height={44} fill="#8A6844" transform={`rotate(28 185 ${armY + 6})`} />
          <rect x={192} y={armY - 42} width={13} height={12} fill="#C9CDD6" transform={`rotate(28 198 ${armY - 36})`} />
          <rect x={195} y={armY - 46} width={12} height={9} fill="#3F9E74" transform={`rotate(28 200 ${armY - 41})`} />
        </>}
        {/* THE VILLAIN's wraparound shades. His eyes are NEVER readable: that is the whole tell. */}
        {wrapShades > 0 && <>
          <rect x={40} y={62} width={120} height={4} fill="rgba(0,0,0,0.25)" />
          <rect x={44} y={64} width={112} height={27} rx={7} fill="#0B0D11" />
          <rect x={44} y={64} width={112} height={6} rx={3} fill="#22262F" />
          <rect x={30} y={68} width={16} height={6} fill="#0B0D11" />
          <rect x={154} y={68} width={16} height={6} fill="#0B0D11" />
          <rect x={54} y={66} width={20} height={7} fill="rgba(255,255,255,0.30)" transform="rotate(-16 64 69)" />
          <rect x={112} y={66} width={12} height={7} fill="rgba(255,255,255,0.16)" transform="rotate(-16 118 69)" />
          <rect x={44} y={87} width={112} height={4} fill="rgba(0,0,0,0.45)" />
        </>}
        {/* THE VILLAIN's earpiece: coiled wire down the neck */}
        {earpiece > 0 && <>
          <rect x={162} y={70} width={9} height={11} fill="#2A2E38" />
          <rect x={164} y={66} width={5} height={5} fill="#3A4150" />
          <rect x={167} y={81} width={4} height={13} fill="#2A2E38" />
          <rect x={170} y={92} width={4} height={5} fill="#2A2E38" />
          <rect x={166} y={96} width={4} height={5} fill="#2A2E38" />
          <rect x={170} y={100} width={4} height={5} fill="#2A2E38" />
        </>}
        {/* manager hard hat */}
        {hardHat > 0 && <>
          <rect x={30} y={34} width={140} height={9} fill="#D9A11E" />
          <rect x={46} y={14} width={108} height={22} fill="#F0B92B" />
          <rect x={46} y={14} width={108} height={5} fill="#FFD968" />
          <rect x={94} y={6} width={12} height={10} fill="#F0B92B" />
          <rect x={64} y={20} width={72} height={4} fill="#D9A11E" />
        </>}
        {/* backwards trucker cap (the honest mechanic) */}
        {capBack > 0 && <>
          <rect x={40} y={20} width={120} height={24} fill="#3C6B8C" />
          <rect x={40} y={20} width={120} height={6} fill="#4C7FA3" />
          <rect x={150} y={30} width={34} height={9} fill="#2F5673" />
          <rect x={92} y={24} width={16} height={7} fill="#EDEAE0" />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};

// ================= THE VILLAIN: "AGENT DONE" =================
// He is the hero's own copy: the part of Claude that grades its own homework.
// Slate clay, black suit, opaque shades (his eyes are NEVER readable), earpiece,
// and a counterfeit yellow-green DONE stamp. Sickly code-rain follows him everywhere.
// Every scene uses THIS component. Never hand-roll him.
const VILL = "#6E7683";          // villain clay (hero stays #D97757)
const FAKE = "#A8B84A";          // counterfeit yellow-green. Real authority green is GREEN (#3F9E74) and is RESERVED for the S6 press.
const GLYPH = "01ヲアウエオカキクサシスセソタチツナニヌネハヒフヘホマミムメモヤユヨ";

export const CodeRain: React.FC<{ lf: number; x: number; y: number; h?: number; cols?: number; o?: number; gap?: number }> = ({ lf, x, y, h = 240, cols = 3, o = 1, gap = 17 }) => (
  <>{Array.from({ length: cols }, (_, c) => {
    const sp = 0.8 + seed(c * 3.1) * 1.6;
    const off = seed(c * 7.7) * h;
    return (
      <div key={c} style={{ position: "absolute", left: x + c * gap, top: y, width: 14, height: h, overflow: "hidden", opacity: 0.55 * o, zIndex: 1 }}>
        {Array.from({ length: Math.ceil(h / 24) + 2 }, (_, k) => {
          const yy = ((k * 24 + lf * sp + off) % (h + 24)) - 24;
          return <div key={k} style={{ position: "absolute", left: 0, top: yy, fontFamily: mono, fontSize: 15, lineHeight: "15px", color: FAKE, opacity: Math.max(0.15, 1 - (k / (h / 24)) * 0.7), textShadow: `0 0 7px rgba(168,184,74,0.75)` }}>
            {GLYPH[(k * 2 + c * 5 + Math.floor(lf / 5)) % GLYPH.length]}
          </div>;
        })}
      </div>
    );
  })}</>
);

export const Villain: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; rain?: number }> = ({ lf, size = 250, rain = 1, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {rain > 0 && <CodeRain lf={lf} x={size * 0.03} y={-size * 0.06} h={size * 1.05} cols={2} o={rain * 0.9} gap={size * 0.05} />}
    {rain > 0 && <CodeRain lf={lf + 41} x={size * 0.82} y={-size * 0.02} h={size * 0.95} cols={2} o={rain * 0.9} gap={size * 0.05} />}
    <div style={{ position: "relative", zIndex: 2 }}>
      <Mascot lf={lf} size={size} tint={VILL} suit={1} wrapShades={1} earpiece={1} {...rest} />
    </div>
  </div>
);

// his counterfeit pass: crooked, smeared, obviously self-issued
export const DoneSticker: React.FC<{ x: number; y: number; s?: number; rot?: number; o?: number }> = ({ x, y, s = 1, rot = 0, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%", zIndex: 26 }}>
    <div style={{ width: 96, height: 74, borderRadius: 10, background: `linear-gradient(150deg, ${FAKE}, #8FA03C)`, border: "3px solid rgba(60,70,20,0.5)", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#2A2E14", letterSpacing: "0.02em", transform: "rotate(-3deg)", textShadow: "1px 1px 0 rgba(255,255,255,0.18)" }}>DONE</div>
      <div style={{ fontFamily: mono, fontSize: 9, color: "rgba(40,46,20,0.72)" }}>SELF ISSUED</div>
      <div style={{ position: "absolute", left: 8, top: 8, width: 80, height: 58, border: "1.5px dashed rgba(50,58,18,0.45)", borderRadius: 6 }} />
    </div>
  </div>
);

const ClaudeLogo: React.FC<{ lf: number; size: number }> = ({ lf, size }) => {
  const s = interpolate(lf, [0, fr(0.6), fr(1.1)], [0.55, 1.28, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <div style={{ width: size, height: size, transform: `scale(${s}) rotate(${lf * 1.7}deg)`, filter: "drop-shadow(0 16px 34px rgba(217,119,87,0.5))" }}>
      <svg viewBox="-100 -100 200 200" width={size} height={size}>
        {Array.from({ length: 12 }, (_, i) => {
          const len = i % 2 ? 70 : 88;
          const tip = i % 2 ? 7.5 : 9;
          return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#D97757" stroke="#D97757" strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />;
        })}
        <circle r={17} fill="#D97757" />
      </svg>
    </div>
  );
};

const Firework: React.FC<{ lf: number; at: number; x: number; y: number; hue?: number }> = ({ lf, at, x, y, hue = 0 }) => {
  const bl = lf - at;
  if (bl < 0 || bl > 32) return null;
  const pr = bl / 32;
  return (<>
    {Array.from({ length: 12 }, (_, k) => {
      const a = (k / 12) * Math.PI * 2 + seed(k + hue);
      const d = Math.pow(pr, 0.6) * (70 + seed(k * 3 + hue) * 60);
      const o = Math.max(0, 1 - pr * 1.2);
      const c = [GOLD, CLAY, "#F3E3A6", GREEN][(k + hue) % 4];
      return <div key={k} style={{ position: "absolute", left: x + Math.cos(a) * d, top: y + Math.sin(a) * d + pr * pr * 34, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 10px ${c}`, zIndex: 40 }} />;
    })}
  </>);
};

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

// ---------------- SCENES (stubs; replaced by authored bodies) ----------------
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const pulse = (at: number, len: number) => (lf >= at ? Math.max(0, 1 - (lf - at) / len) : 0);
  const heave = (at: number, len: number) => { const t = (lf - at) / len; return t < 0 || t > 1 ? 0 : Math.sin(t * Math.PI); };

  // ===================== PALETTE + GEOMETRY =====================
  // ONE WARM HOLE IN A BLACK FIELD. Interior key is harsh white-blue ARC (it is a grinder, not a bonfire),
  // clay bounce lives ONLY inside the rectangle, and NOTHING warm touches the apron before f178.
  const ARC = "#C8D8E8", VOID = "#12141A";
  const MX0 = 140, MX1 = 880, MY0 = 196, FLOOR = 660, SILL = 700;
  const MOUTH = "polygon(140px 196px, 880px 196px, 880px 700px, 140px 700px)";
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const TEARS = [8, 24, 40, 56, 72, 88, 104];

  // ===================== THE GUILLOTINE CLOCK =====================
  // Three ratcheting hauls, a boom, one bounce. The bottom slat is bowed from years of being slammed:
  // it cannot seat flush, rests at y675, and leaves a 25px hot bar. That bow is why the frame never goes black.
  const shutY = (f: number) => {
    if (f < 120) return 210;                                                                                  // the loose slat, vibrating under the box lip
    if (f <= 140) return interpolate(f, [120, 140], [210, 364], { ...cl, easing: Easing.out(Easing.quad) });   // haul one
    if (f < 142) return 364;
    if (f <= 160) return interpolate(f, [142, 160], [364, 532], { ...cl, easing: Easing.out(Easing.quad) });   // haul two
    if (f < 162) return 532;
    if (f <= 172) return interpolate(f, [162, 172], [532, 675], { ...cl, easing: Easing.out(Easing.quad) });   // haul three: shears the run at f168
    if (f <= 174) return interpolate(f, [172, 174], [675, 662], { ...cl, easing: Easing.out(Easing.cubic) });  // the bounce
    return interpolate(f, [174, 178], [662, 675], { ...cl, easing: Easing.inOut(Easing.quad) });               // resettle, 25px gap
  };
  const sY = shutY(lf);
  const sealed = ramp(lf, 168, 176);
  const jam = ramp(lf, 174, 182);
  const outWarm = ramp(lf, 177, 184);          // the FIRST warm light ever allowed on our side

  // ===================== THE ARC + THE WORK LOOP =====================
  const arc = 0.58 + 0.28 * Math.abs(Math.sin(lf * 1.05)) + 0.14 * seed(Math.floor(lf / 2) + 11);
  const loopT = (lf * (1 + ramp(lf, 0, 192) * 0.14)) / 22;                 // five-beat loop, accelerating
  const ph = loopT % 1;
  const grindP = ph < 0.42 ? 1 : ph < 0.56 ? 1 - (ph - 0.42) / 0.14 : ph > 0.9 ? (ph - 0.9) / 0.1 : 0;
  const sparkAmt = 0.42 + 0.58 * grindP;
  const thud = Math.max(0, 1 - (lf % 11) / 5);                             // a crate lands on the buffer every 11f, forever

  // ===================== THE PATTERN INTERRUPT: a whole week, ripped through in one burst =====================
  // f0 opens MID-EXPLOSION. A hard punch-zoom settles by f9, a white flash cracks on f0-2, and the entire
  // MON..SUN week tears past at ~10x: pages flying, crates slamming the buffer, sparks sheeting, speed lines
  // ripping, the hero a warm blur. It decelerates into the real-time night shift by ~f38. NOTHING below changes.
  const burstAmt = 1 - ramp(lf, 20, 38);                                   // full through f20, gone by f38
  const punchIn = interpolate(lf, [0, 9], [0.52, 0], { ...cl, easing: Easing.out(Easing.cubic) });
  const flash = Math.max(interpolate(lf, [0, 3], [0.82, 0], cl), interpolate(lf, [5, 8], [0.24, 0], cl));
  const bootShake = interpolate(lf, [0, 15], [1, 0], { ...cl, easing: Easing.out(Easing.quad) });

  // ===================== CAMERA (never static) =====================
  const push = ramp(lf, 0, 116) * 0.04;                                    // drawn in by the work
  const flinch = over(lf, 120, 12) * 0.02;                                 // haul one: we recoil
  const driftL = over(lf, 120, 16) * 10;                                   // 1% LEFT, opening frame-right for him, hasp stays at 505
  const shakeAmt = pulse(120, 11) * 3 + pulse(142, 11) * 4.6 + pulse(172, 13) * 7.6 + pulse(176, 9) * 5.4 + pulse(184, 7) * 3.2;
  const camX = Math.sin(lf * 0.29) * 1.1 - driftL + Math.sin(lf * 3.9) * shakeAmt + Math.sin(lf * 5.3) * bootShake * 6.5;
  const camY = Math.cos(lf * 0.24) * 1.0 + Math.cos(lf * 4.4) * shakeAmt * 0.6 + Math.cos(lf * 6.1) * bootShake * 4.2;
  const keyPush = over(lf, 184, 8, Easing.in(Easing.cubic));               // into the keyhole: the hole the keys go in, and our guy does not have them
  const irisR = interpolate(keyPush, [0, 1], [10, 17], cl);
  const par = (k: number) => `scale(${1 + push * k})`;                     // every layer parallaxes at its own rate

  // ===================== THE VILLAIN (f96 to f186) =====================
  // Per the continuity ruling he is NOT born here: he is simply ALREADY in the dead unlit corner from f96,
  // with the rain. Never shown separating. He hauls, locks, leaves. Silhouette only: no shades, no face,
  // no stamp, no slate tint. S1 owns the peel.
  const vFade = ramp(lf, 96, 108) * (1 - ramp(lf, 179, 187));
  const vx =
    lf < 120 ? 812
      : lf < 124 ? interpolate(lf, [120, 124], [812, 800], cl)
        : lf < 130 ? interpolate(lf, [124, 130], [800, 606], { ...cl, easing: Easing.inOut(Easing.cubic) })   // steps to the sill
          : lf < 136 ? 606                                                                                     // boots the offering back
            : lf < 142 ? interpolate(lf, [136, 142], [606, 812], { ...cl, easing: Easing.inOut(Easing.cubic) })
              : lf < 163 ? 812
              : lf < 172 ? interpolate(lf, [163, 172], [812, 660], { ...cl, easing: Easing.inOut(Easing.cubic) })   // ducks out under the slat
                : lf < 176 ? 660
                  : interpolate(lf, [176, 187], [660, 1130], { ...cl, easing: Easing.in(Easing.quad) });      // never looks at what he did
  const onApron = lf < 124 ? 0 : lf < 130 ? over(lf, 124, 6) : lf < 136 ? 1 : lf < 142 ? 1 - over(lf, 136, 6) : lf < 163 ? 0 : over(lf, 163, 6);
  const vFloor = interpolate(onApron, [0, 1], [FLOOR, lf >= 163 ? 716 : 700], cl);
  const vScale = interpolate(onApron, [0, 1], [1, lf >= 163 ? 1.14 : 1.06], cl);
  const vHaul = Math.max(heave(120, 14), heave(142, 14), heave(162, 8));   // the yank
  const vReach = (lf >= 116 && lf < 170 && onApron < 0.2) ? Math.max(0, 1 - vHaul * 1.3) : 0;   // arms up on the strap between yanks
  const VS = 300;
  const vNode = vFade > 0.004 ? (
    <>
      {/* he is HARD-BACKLIT, so he needs something to punch out of: the arc bouncing off the back wall behind him */}
      <div style={{ position: "absolute", left: vx - 200, top: vFloor - 322, width: 400, height: 350, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 52%, rgba(186,208,236,0.42), rgba(120,148,184,0.14) 54%, transparent 76%)", filter: "blur(15px)", opacity: vFade, zIndex: 13 }} />
      <div style={{ position: "absolute", left: vx - VS / 2, top: vFloor - 0.92 * VS, opacity: vFade, transform: `scale(${vScale}) translateY(${vHaul * 15}px)`, transformOrigin: "50% 92%", filter: `brightness(0.42) contrast(1.45) saturate(0.35) drop-shadow(0 0 ${12 + vHaul * 10}px rgba(168,184,74,0.65)) drop-shadow(0 0 3px rgba(214,234,255,0.95)) drop-shadow(0 0 9px rgba(176,204,240,0.6))`, zIndex: 14 }}>
        <Villain lf={lf} size={VS} rain={0} nodAmp={lf > 176 ? 4 : 1.2} nodSpeed={lf > 176 ? 7 : 17} cheer={vReach} gaze={0} />
      </div>
    </>
  ) : null;
  const STRAP_X = 692;

  // ===================== HIS ONE POSSESSION: THE PADLOCK =====================
  const lockOn = lf >= 166;
  const lockRise = over(lf, 166, 7, Easing.out(Easing.cubic));             // brought up, black against the closing hot band
  const lockTo = over(lf, 173, 3, Easing.inOut(Easing.cubic));
  const lockShut = over(lf, 176, 4, Easing.out(Easing.back(3)));
  const lkx = interpolate(lockTo, [0, 1], [548, 505], cl);
  const lky = interpolate(lockTo, [0, 1], [interpolate(lockRise, [0, 1], [712, 654], cl), 726], cl);
  const rock = lf > 176 ? Math.sin((lf - 176) * 0.62) * interpolate(lf, [176, 192], [17, 6], cl) + pulse(184, 8) * 11 : 0;
  const brass = ramp(lf, 178, 183);                                        // the sparks he just locked away are what light it
  const spec = Math.max(0, Math.min(1, ramp(lf, 179, 180.5) - ramp(lf, 182.5, 188)));

  // ===================== THE WEEK, COUNTABLE ON THE FLOOR =====================
  const torn = TEARS.filter((t) => lf >= t).length;
  const scoop = ramp(lf, 118, 126);                                        // he scoops the spent week and starts week two
  const fresh = over(lf, 118, 5, Easing.out(Easing.back(3)));
  const blockDay = lf >= 118 ? "MON" : torn >= 7 ? "" : DAYS[torn];

  // ===================== THE BUFFER + THE APRON STACK =====================
  const bufN = Math.min(24, 4 + Math.floor(lf / 11));
  const bufTop = FLOOR - Math.ceil(bufN / 2) * 34;
  const apronN = Math.min(12, 4 + Math.floor(lf / 21));                    // last crate ever to get out lands at f168
  const runT = (lf / 22) % 1;
  const shear = ramp(lf, 168, 176);                                        // the flap snaps down onto its own frozen output

  // ===================== HERO =====================
  const hSize = 190, hFloor = FLOOR;
  const step = lf >= 114 && lf < 126 ? Math.sin(((lf - 114) / 12) * Math.PI) : 0;   // one step to the nail, and back
  const hX = 452 + grindP * 15 + step * 32;
  const hTop = hFloor - 0.92 * hSize;
  const hopP = Math.max(0, Math.sin(lf / 4.8));
  const headY = -hopP * 1.6 * 2.2;
  const soot = ramp(lf, 0, 192);
  const kt = (loopT - 0.8 + 2) % 1;                                        // the crate he kicks at the run, every loop
  const kx = 520 + kt * 112, ky = 636 + kt * 32 - Math.sin(kt * Math.PI) * 16;

  // ===================== THE OFFERING AND THE REFUSAL =====================
  const offer = over(lf, 110, 8, Easing.out(Easing.quad));                 // he kicks a crate out as an offering
  const refuse = over(lf, 130, 6, Easing.inOut(Easing.cubic));            // the black boot shoves it back, without looking
  const ox = interpolate(offer, [0, 1], [500, 505], cl) - refuse * 19;
  const oy = interpolate(offer, [0, 1], [648, 730], cl) - Math.sin(offer * Math.PI) * 26 - refuse * 36;
  const os = interpolate(offer, [0, 1], [0.82, 1], cl) * interpolate(refuse, [0, 1], [1, 0.78], cl);
  const oOp = offer * (1 - ramp(lf, 135, 139));

  // ===================== THE FORKLIFT WHO DIDN'T GET THE MEMO =====================
  const fkX = 180 + ((lf * 4.1) % 640);
  const dent = over(lf, 184, 5, Easing.out(Easing.back(2.4)));
  const dent2 = over(lf, 190, 6, Easing.out(Easing.quad));                 // starts, never lands

  return (
    <Panel label="night-shift">
      {/* ===================== THE VOID: flat dead black, ZERO geometry in it ===================== */}
      <div style={{ position: "absolute", inset: 0, background: VOID }} />

      <div style={{ position: "absolute", inset: 0, transform: `translate(${camX}px, ${camY}px) scale(${1 + push - flinch + punchIn})`, transformOrigin: "505px 448px" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + keyPush * 0.42})`, transformOrigin: "505px 726px" }}>

          {/* ===================== THE SHOP SIGN: light, not structure (the void stays empty) ===================== */}
          <div style={{ position: "absolute", left: 430, top: 46, width: 430, height: 70, opacity: over(lf, 170, 16), display: "flex", alignItems: "center", justifyContent: "center", transform: par(0.25) }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: "0.04em", color: "#BFEEF9", opacity: 0.5 + Math.abs(Math.sin(lf * 0.44)) * 0.16, textShadow: `0 0 8px #74CFE4, 0 0 26px rgba(116,207,228,0.75), 0 0 54px rgba(116,207,228,0.35)`, whiteSpace: "nowrap" }}>
              NIGHT <span style={{ opacity: lf % 40 > 5 ? 1 : 0.07, textShadow: lf % 40 > 5 ? "0 0 8px #74CFE4, 0 0 26px rgba(116,207,228,0.75)" : "none" }}>O</span>WL FAB CO.
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, width: 430, height: 70, background: "radial-gradient(ellipse at 50% 50%, rgba(116,207,228,0.10), transparent 70%)", opacity: 0.4 + Math.abs(Math.sin(lf * 0.44)) * 0.3 }} />
          </div>

          {/* ==========================================================================================
              THE INTERIOR. Everything hot lives inside this rectangle and nowhere else.
          ========================================================================================== */}
          <div style={{ position: "absolute", inset: 0, clipPath: MOUTH }}>

            {/* ---- FAR BACKGROUND: back wall, arc key, clay bounce, smoke haze ---- */}
            <div style={{ position: "absolute", left: MX0, top: MY0, width: MX1 - MX0, height: SILL - MY0, background: "linear-gradient(180deg,#26303F 0%,#334054 44%,#3E4C63 100%)", transform: par(0.35), transformOrigin: "505px 448px" }} />

            {/* ==========================================================================
                RECESSIVE WORKSHOP ENVIRONMENT: the packed shop standing behind the work.
                The deepest LIT tier: dimmer, cooler, softly blurred, slow parallax. The arc
                glow, haze, lamps, cones and buffer all render AFTER this and wash over it, so
                it never competes with the bench focal, the hero, or the shutter. Fills the
                dark walls and the empty left side with crafted, worn detail. The right
                (villain) dead corner gets only BLACK silhouettes, no rim light, so it stays
                unlit for his arrival. Kept alive: needles jitter, the hose breathes.
            ========================================================================== */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: par(0.42), transformOrigin: "505px 448px", filter: "blur(1.3px) brightness(0.86) saturate(0.8) contrast(0.96)" }}>

              {/* grimy oil weeping down the back wall */}
              {Array.from({ length: 10 }).map((_, i) => {
                const r = seed(i * 5.3 + 21);
                return <div key={"grm" + i} style={{ position: "absolute", left: 150 + r * 700, top: 198 + r * 90, width: 6 + r * 20, height: 130 + r * 230, background: "linear-gradient(180deg, rgba(8,11,17,0.34), transparent 82%)", filter: "blur(3.5px)", opacity: 0.32 + r * 0.4 }} />;
              })}

              {/* a dark mezzanine shelf up in the rafters, stacked with black stock */}
              <div style={{ position: "absolute", left: 200, top: 236, width: 150, height: 8, background: "linear-gradient(180deg,#454F5E,#20272F)" }} />
              {[0, 1, 2, 3].map((k) => <div key={"hc" + k} style={{ position: "absolute", left: 206 + k * 36, top: 210 - (k % 2) * 4, width: 32, height: 28, borderRadius: 2, background: "linear-gradient(160deg,#2A313C,#141922)", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }} />)}

              {/* two conduit runs along the wall with bracket clamps */}
              {[314, 560].map((cy2, ci) => (
                <div key={"cd" + ci} style={{ position: "absolute", left: 148, top: cy2, width: 726, height: 7 + ci * 2, borderRadius: 4, background: "linear-gradient(180deg,#525E72,#1B222C)", boxShadow: "0 5px 10px rgba(0,0,0,0.5)" }}>
                  {Array.from({ length: 9 }).map((_, k) => <div key={"cl" + k} style={{ position: "absolute", left: 30 + k * 84, top: -4, width: 11, height: 15 + ci * 2, borderRadius: 2, background: "linear-gradient(180deg,#39424F,#151A22)" }} />)}
                  <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 2, background: "rgba(190,206,230,0.22)" }} />
                </div>
              ))}

              {/* a fat vertical riser on the far left, elbowing into the top conduit */}
              <div style={{ position: "absolute", left: 156, top: 310, width: 17, height: 17, borderRadius: "6px 6px 6px 2px", background: "linear-gradient(135deg,#5A6578,#232B36)" }} />
              <div style={{ position: "absolute", left: 158, top: 320, width: 13, height: 352, borderRadius: 5, background: "linear-gradient(90deg,#1B212B,#596579 46%,#1B212B)", boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
              {[380, 500, 620].map((py, i) => <div key={"pb" + i} style={{ position: "absolute", left: 152, top: py, width: 25, height: 9, borderRadius: 2, background: "linear-gradient(180deg,#39424F,#171C24)" }} />)}

              {/* two pressure gauges bolted to the mid conduit, needles idling */}
              {[402, 592].map((gx, gi) => {
                const nd = Math.sin(lf * 0.09 + gi * 2.3) * 22 - 26 + gi * 34;
                return (
                  <div key={"gg" + gi} style={{ position: "absolute", left: gx, top: 538, width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #D6D0C0, #86816F)", border: "2px solid #262E38", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }}>
                    <div style={{ position: "absolute", left: 11.4, top: 5, width: 1.6, height: 9, background: "#C4442E", transformOrigin: "50% 100%", transform: `rotate(${nd}deg)` }} />
                    <div style={{ position: "absolute", left: 10.4, top: 10.4, width: 4.4, height: 4.4, borderRadius: "50%", background: "#20303F" }} />
                  </div>
                );
              })}

              {/* a louvered wall vent, high on the back wall */}
              <div style={{ position: "absolute", left: 392, top: 232, width: 72, height: 44, borderRadius: 3, background: "linear-gradient(180deg,#2E3644,#171C24)", border: "1.5px solid rgba(16,20,26,0.6)", overflow: "hidden" }}>
                {[0, 1, 2, 3, 4].map((k) => <div key={"vt" + k} style={{ position: "absolute", left: 3, top: 5 + k * 8, width: 66, height: 4, borderRadius: 2, background: "linear-gradient(180deg,#454F5E,#1B212B)", boxShadow: "0 1px 0 rgba(190,206,230,0.12)" }} />)}
              </div>

              {/* THE PEGBOARD: hung tools over the hero's left wall */}
              <div style={{ position: "absolute", left: 152, top: 300, width: 196, height: 176, borderRadius: 3, background: "linear-gradient(160deg,#2E3644,#171C24)", border: "2px solid rgba(14,18,24,0.7)", boxShadow: "inset 0 0 22px rgba(0,0,0,0.5), 0 7px 15px rgba(0,0,0,0.5)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 3, background: "radial-gradient(circle, rgba(0,0,0,0.42) 1px, transparent 1.7px)", backgroundSize: "13px 13px", opacity: 0.7 }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 3, background: "rgba(184,200,224,0.24)" }} />
                {/* wrench */}
                <div style={{ position: "absolute", left: 18, top: 20, width: 9, height: 68, borderRadius: 5, background: "linear-gradient(90deg,#8A94A6,#37404C)", boxShadow: "inset 1.5px 0 0 rgba(206,220,240,0.35)", transform: "rotate(7deg)" }}>
                  <div style={{ position: "absolute", left: -4.5, top: -9, width: 18, height: 18, borderRadius: "50%", border: "4px solid #7E8798" }} />
                </div>
                {/* hammer */}
                <div style={{ position: "absolute", left: 46, top: 30, width: 8, height: 60, borderRadius: 4, background: "linear-gradient(90deg,#7A5A38,#3A2A18)", transform: "rotate(-9deg)" }}>
                  <div style={{ position: "absolute", left: -11, top: -4, width: 30, height: 13, borderRadius: 3, background: "linear-gradient(180deg,#9AA4B4,#3E4650)" }} />
                </div>
                {/* pliers */}
                <div style={{ position: "absolute", left: 84, top: 24, width: 30, height: 30 }}>
                  <div style={{ position: "absolute", left: 4, top: 0, width: 7, height: 52, borderRadius: 3, background: "linear-gradient(90deg,#8A94A6,#37404C)", transform: "rotate(10deg)", transformOrigin: "50% 0%" }} />
                  <div style={{ position: "absolute", left: 16, top: 0, width: 7, height: 52, borderRadius: 3, background: "linear-gradient(90deg,#8A94A6,#37404C)", transform: "rotate(-10deg)", transformOrigin: "50% 0%" }} />
                </div>
                {/* hand saw */}
                <div style={{ position: "absolute", left: 96, top: 92, width: 66, height: 40 }}>
                  <div style={{ position: "absolute", left: 0, top: 14, width: 52, height: 12, background: "linear-gradient(180deg,#9AA4B4,#4A5460)", clipPath: "polygon(0 0,100% 0,100% 100%,0 55%)" }} />
                  <div style={{ position: "absolute", left: 46, top: 6, width: 18, height: 22, borderRadius: 4, background: "linear-gradient(150deg,#6E5236,#3A2A18)" }} />
                </div>
                {/* screwdriver rack */}
                {[0, 1, 2].map((k) => (
                  <div key={"sd" + k} style={{ position: "absolute", left: 152 + k * 13, top: 24, width: 6, height: 52, borderRadius: 3, background: "linear-gradient(180deg,#9AA4B4,#37404C)" }}>
                    <div style={{ position: "absolute", left: -1.5, top: -15, width: 9, height: 17, borderRadius: 2, background: ["#B4442E", "#2E6E52", "#2E5080"][k] }} />
                  </div>
                ))}
                {/* spirit level along the bottom */}
                <div style={{ position: "absolute", left: 16, top: 150, width: 150, height: 15, borderRadius: 2, background: "linear-gradient(180deg,#C7A23E,#795E1E)", boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }}>
                  <div style={{ position: "absolute", left: 66, top: 4, width: 20, height: 7, borderRadius: 4, background: "rgba(180,220,190,0.6)", border: "1px solid rgba(20,40,26,0.5)" }} />
                </div>
              </div>

              {/* the shop's electrical panel, with a conduit dropping to the mid run */}
              <div style={{ position: "absolute", left: 360, top: 328, width: 42, height: 58, borderRadius: 3, background: "linear-gradient(150deg,#4A5262,#20262F)", border: "2px solid rgba(16,20,26,0.6)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }}>
                <div style={{ position: "absolute", left: 30, top: 22, width: 7, height: 16, borderRadius: 2, background: "#20262F" }} />
                <div style={{ position: "absolute", left: 8, top: 10, width: 14, height: 3, background: "rgba(190,206,230,0.3)" }} />
                <div style={{ position: "absolute", left: 8, top: 18, width: 14, height: 3, background: "rgba(190,206,230,0.2)" }} />
              </div>
              <div style={{ position: "absolute", left: 376, top: 386, width: 8, height: 176, borderRadius: 3, background: "linear-gradient(90deg,#20262F,#495568)" }} />

              {/* the fire extinguisher on its wall bracket */}
              <div style={{ position: "absolute", left: 326, top: 430, width: 22, height: 52 }}>
                <div style={{ position: "absolute", left: 0, top: 8, width: 22, height: 40, borderRadius: "9px 9px 6px 6px", background: "linear-gradient(90deg,#8E2A20,#4A140F)", boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 6, top: 0, width: 10, height: 12, borderRadius: 2, background: "linear-gradient(180deg,#2A2E36,#12151B)" }} />
                <div style={{ position: "absolute", left: 2, top: 22, width: 18, height: 9, background: "rgba(20,10,8,0.4)" }} />
                <div style={{ position: "absolute", left: -3, top: 20, width: 6, height: 16, borderRadius: 2, background: "rgba(20,24,30,0.8)" }} />
              </div>

              {/* THE PARTS SHELVING: three planks of boxes, tins and jars */}
              <div style={{ position: "absolute", left: 150, top: 486, width: 208, height: 152 }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 7, height: 152, background: "linear-gradient(90deg,#39424F,#151A22)" }} />
                <div style={{ position: "absolute", left: 201, top: 0, width: 7, height: 152, background: "linear-gradient(90deg,#39424F,#151A22)" }} />
                {[6, 70, 134].map((py, i) => <div key={"shp" + i} style={{ position: "absolute", left: 0, top: py, width: 208, height: 9, background: "linear-gradient(180deg,#556074,#232B36)", boxShadow: "0 5px 10px rgba(0,0,0,0.5)" }} />)}
                {[
                  { s: 0, x: 12, w: 40, h: 38, t: "box" }, { s: 0, x: 58, w: 26, h: 34, t: "can" }, { s: 0, x: 92, w: 30, h: 36, t: "jar" }, { s: 0, x: 128, w: 24, h: 40, t: "can" }, { s: 0, x: 160, w: 32, h: 32, t: "box" },
                  { s: 1, x: 10, w: 34, h: 42, t: "can" }, { s: 1, x: 50, w: 44, h: 40, t: "box" }, { s: 1, x: 100, w: 28, h: 44, t: "jar" }, { s: 1, x: 134, w: 30, h: 40, t: "can" }, { s: 1, x: 170, w: 26, h: 38, t: "can" },
                  { s: 2, x: 14, w: 46, h: 44, t: "box" }, { s: 2, x: 66, w: 30, h: 46, t: "jar" }, { s: 2, x: 102, w: 34, h: 42, t: "box" }, { s: 2, x: 144, w: 30, h: 44, t: "can" },
                ].map((it, i) => {
                  const plankTop = [6, 70, 134][it.s];
                  const g = it.t === "box" ? "linear-gradient(160deg,#79593A,#42301C)" : it.t === "can" ? "linear-gradient(90deg,#586474,#242C37)" : "linear-gradient(160deg,#4E5A6E,#232B36)";
                  return (
                    <div key={"si" + i} style={{ position: "absolute", left: it.x, top: plankTop - it.h, width: it.w, height: it.h, borderRadius: it.t === "can" ? "5px 5px 2px 2px" : 2, background: g, boxShadow: "0 4px 8px rgba(0,0,0,0.5)", transform: `rotate(${(seed(i * 3.2) - 0.5) * 3}deg)`, transformOrigin: "50% 100%", overflow: "hidden" }}>
                      {it.t === "box" && <div style={{ position: "absolute", left: "16%", top: "34%", width: "68%", height: 7, background: "rgba(210,196,168,0.5)" }} />}
                      {it.t === "can" && <div style={{ position: "absolute", left: 0, top: 4, width: "100%", height: 3, background: "rgba(184,200,224,0.4)" }} />}
                      {it.t === "jar" && <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 6, borderRadius: "2px 2px 0 0", background: "rgba(150,164,186,0.6)" }} />}
                      <div style={{ position: "absolute", left: 0, top: 0, width: "40%", height: "100%", background: "rgba(206,220,240,0.08)" }} />
                    </div>
                  );
                })}
              </div>

              {/* an oil drum on the floor beside the shelving, catching a little room light */}
              <div style={{ position: "absolute", left: 298, top: 556, width: 58, height: 100, borderRadius: "9px 9px 5px 5px", background: "linear-gradient(90deg,#242C37,#586472 52%,#20272F)", boxShadow: "0 9px 18px rgba(0,0,0,0.6)" }}>
                {[16, 48, 80].map((hy, k) => <div key={"dh" + k} style={{ position: "absolute", left: 0, top: hy, width: "100%", height: 5, background: "linear-gradient(180deg,#6E7A8C,#20272F)" }} />)}
                <div style={{ position: "absolute", left: 5, top: 2, width: 48, height: 11, borderRadius: "50%", background: "linear-gradient(180deg,#3A4450,#1A2028)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: "42%", height: "100%", background: "rgba(206,220,240,0.07)" }} />
              </div>

              {/* a coiled air hose slung on a wall hook, breathing a little */}
              <div style={{ position: "absolute", left: 610, top: 344, transformOrigin: "50% -6px", transform: `rotate(${Math.sin(lf * 0.03) * 1.6}deg)` }}>
                <div style={{ position: "absolute", left: 20, top: -12, width: 8, height: 16, borderRadius: "0 0 6px 6px", border: "3px solid #4A5464", borderTop: "none" }} />
                {[0, 1, 2, 3].map((k) => <div key={"hz2" + k} style={{ position: "absolute", left: 4 + k * 4, top: k * 5, width: 68 - k * 12, height: 68 - k * 12, borderRadius: "50%", border: "7px solid #14181F", opacity: 0.92 }} />)}
              </div>

              {/* THE DEAD CORNER'S DARK BULK: a tall cabinet and two drums, kept UNLIT for the villain */}
              <div style={{ position: "absolute", left: 704, top: 352, width: 96, height: 306, borderRadius: "4px 4px 2px 2px", background: "linear-gradient(90deg,#0C1016,#1A212B 55%,#080B10)", boxShadow: "0 10px 22px rgba(0,0,0,0.7)" }}>
                {[0, 1, 2].map((k) => <div key={"cbd" + k} style={{ position: "absolute", left: 10, top: 24 + k * 92, width: 76, height: 78, borderRadius: 2, border: "2px solid rgba(30,38,50,0.7)" }} />)}
                <div style={{ position: "absolute", left: 44, top: 74, width: 6, height: 20, borderRadius: 2, background: "rgba(40,48,60,0.8)" }} />
              </div>
              {[730, 792].map((dx, i) => (
                <div key={"drm" + i} style={{ position: "absolute", left: dx, top: 560 - i * 6, width: 56, height: 98, borderRadius: "8px 8px 5px 5px", background: "linear-gradient(90deg,#0A0E13,#1C2430 50%,#070A0F)", boxShadow: "0 8px 18px rgba(0,0,0,0.7)" }}>
                  {[14, 44, 74].map((hy, k) => <div key={"dhh" + k} style={{ position: "absolute", left: 0, top: hy, width: "100%", height: 4, background: "rgba(34,42,54,0.7)" }} />)}
                  <div style={{ position: "absolute", left: 4, top: 2, width: 48, height: 10, borderRadius: "50%", background: "linear-gradient(180deg,#1E2632,#0A0E13)" }} />
                </div>
              ))}
            </div>

            <div style={{ position: "absolute", left: 240, top: 300, width: 620, height: 420, background: `radial-gradient(ellipse at 52% 62%, rgba(206,224,242,${0.46 * arc}), rgba(150,178,210,${0.16 * arc}) 52%, transparent 72%)`, filter: "blur(6px)" }} />
            <div style={{ position: "absolute", left: 150, top: 470, width: 720, height: 230, background: `linear-gradient(180deg, transparent, rgba(217,119,87,${0.3 + arc * 0.12}) 82%)` }} />
            {Array.from({ length: 7 }).map((_, i) => {
              const r = seed(i * 5.1 + 3);
              const x = 150 + ((r * 900 + lf * (0.5 + r * 0.9)) % 900);
              return <div key={"hz" + i} style={{ position: "absolute", left: x - 130, top: 260 + r * 330, width: 260, height: 130, borderRadius: "50%", background: "radial-gradient(circle at 45% 45%, rgba(198,214,236,0.10), transparent 68%)", filter: "blur(9px)", opacity: 0.4 + r * 0.35 }} />;
            })}

            {/* ---- FAR: the overhead LINE SHAFT, four pulleys, slapping leather belts ---- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: par(0.55), transformOrigin: "505px 448px" }}>
              <div style={{ position: "absolute", left: 200, top: 198, width: 660, height: 14, borderRadius: 3, background: "linear-gradient(180deg,#59627A,#232A38)", boxShadow: "0 6px 14px rgba(0,0,0,0.6)" }} />
              {[270, 452, 640, 822].map((px, i) => (
                <div key={"pu" + i} style={{ position: "absolute", left: px - 17, top: 188, width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(150deg,#6C7690,#2A3140)", border: "2px solid rgba(180,200,240,0.24)", transform: `rotate(${lf * (7 + i * 1.6)}deg)` }}>
                  <div style={{ position: "absolute", left: 15, top: 3, width: 3, height: 28, background: "rgba(200,220,250,0.4)" }} />
                </div>
              ))}
              {[270, 452, 640, 822].map((px, i) => {
                const slap = Math.sin(lf * 0.62 + i * 1.9) * 5;
                return <div key={"belt" + i} style={{ position: "absolute", left: px - 5, top: 204, width: 10, height: 46 + i * 4, background: "linear-gradient(180deg,#7A6244,#3C3122)", transformOrigin: "50% 0%", transform: `rotate(${slap}deg) skewX(${slap * 0.7}deg)`, boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />;
              })}
            </div>

            {/* ---- THE CHUTE: spits finished crates onto the buffer, every 11 frames, forever ---- */}
            <div style={{ position: "absolute", left: 232, top: 208, width: 128, height: 96, transform: par(0.75), transformOrigin: "505px 448px" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 138, height: 9, borderRadius: 4, background: "linear-gradient(180deg,#8A94AC,#3A4354)", transformOrigin: "0% 50%", transform: "rotate(35deg)", boxShadow: "0 5px 12px rgba(0,0,0,0.55)" }} />
              <div style={{ position: "absolute", left: 6, top: 24, width: 132, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#454E60,#1B2130)", transformOrigin: "0% 50%", transform: "rotate(35deg)" }} />
              {[0, 1, 2, 3].map((i) => (
                <div key={"cr" + i} style={{ position: "absolute", left: 16 + i * 26, top: 14 + i * 18, width: 13, height: 13, borderRadius: "50%", background: "linear-gradient(150deg,#78829A,#2E3542)", border: "1.5px solid rgba(190,210,245,0.22)", transform: `rotate(${lf * 15}deg)` }}>
                  <div style={{ position: "absolute", left: 5.5, top: 1, width: 2, height: 11, background: "rgba(200,220,250,0.45)" }} />
                </div>
              ))}
            </div>
            {[0, 1].map((k) => {
              const t = ((lf / 11) + k * 0.5) % 1;
              const ride = Math.min(1, t / 0.45), fall = Math.max(0, (t - 0.45) / 0.55);
              const cx = 238 + ride * 100 - fall * 34;
              const railY = 214 + (cx - 232) * 0.7;
              const cy = fall > 0 ? interpolate(Math.pow(fall, 1.7), [0, 1], [284, Math.max(bufTop - 30, 290)], cl) : railY - 26;
              if (fall > 0.98) return null;
              return (
                <div key={"chc" + k} style={{ position: "absolute", left: cx, top: cy, width: 62, height: 30, borderRadius: 3, background: "linear-gradient(150deg,#C08A55,#7E5433)", border: "1.5px solid rgba(255,232,190,0.28)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)", transform: `rotate(${fall > 0 ? 35 - fall * 42 : 35}deg)` }}>
                  <div style={{ position: "absolute", left: 0, top: 11, width: 62, height: 5, background: "rgba(170,186,214,0.5)" }} />
                </div>
              );
            })}

            {/* ---- TWO CAGED WORK LAMPS on visible twisted flex, swaying out of sync ---- */}
            {[{ x: 350, y: 250, flex: 26, ph: 0 }, { x: 700, y: 235, flex: 11, ph: 2.3 }].map((L2, i) => {
              const sw = Math.sin(lf * 0.031 + L2.ph) * 2.6;
              return (
                <div key={"lamp" + i} style={{ position: "absolute", left: L2.x, top: 214, transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
                  <div style={{ position: "absolute", left: -1.5, top: 0, width: 3, height: L2.flex, background: "linear-gradient(90deg,#2A303C,#5A6274,#2A303C)" }} />
                  <div style={{ position: "absolute", left: -11, top: L2.flex, width: 22, height: 22, borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #FFF6DE, #E8C98A 58%, rgba(120,100,64,0.5))`, boxShadow: `0 0 ${18 + Math.sin(lf * 0.4 + i) * 5}px rgba(255,238,196,0.75)` }} />
                  {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: -12, top: L2.flex - 1, width: 24, height: 24, borderRadius: "50%", border: "1.2px solid rgba(30,36,46,0.75)", transform: `rotate(${k * 45}deg) scaleX(${0.22 + k * 0.26})` }} />)}
                </div>
              );
            })}
            {/* cones: start at a visible source, rake to the floor. Lamp 2 is angled LEFT so the villain's corner stays dead. */}
            <div style={{ position: "absolute", left: 350, top: 262, width: 1, height: 1, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.031) * 2.6}deg)` }}>
              <div style={{ position: "absolute", left: -220, top: 0, width: 440, height: 400, background: "linear-gradient(180deg, rgba(255,246,222,0.24), rgba(255,246,222,0.05) 62%, transparent)", clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen" }} />
            </div>
            <div style={{ position: "absolute", left: 700, top: 248, width: 1, height: 1, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.031 + 2.3) * 2.6 - 17}deg)` }}>
              <div style={{ position: "absolute", left: -160, top: 0, width: 320, height: 430, background: "linear-gradient(180deg, rgba(255,246,222,0.20), rgba(255,246,222,0.04) 62%, transparent)", clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen" }} />
            </div>
            {Array.from({ length: 30 }).map((_, i) => {
              const r = seed(i * 2.9 + 13);
              const inL = i < 16;
              const x = (inL ? 210 : 520) + r * (inL ? 430 : 250);
              const y = 250 + ((r * 400 + lf * (0.5 + r * 0.7)) % 410);
              return <div key={"du" + i} style={{ position: "absolute", left: x, top: y, width: 2 + r * 2.4, height: 2 + r * 2.4, borderRadius: "50%", background: "rgba(255,248,226,0.8)", opacity: (0.14 + r * 0.3) * (1 - (y - 250) / 480) }} />;
            })}

            {/* ---- THE WALL CLOCK: hands visibly spinning. Running for hours on its own. ---- */}
            <div style={{ position: "absolute", left: 470, top: 222, width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(150deg,#E6E2D6,#9C978A)", border: "2.5px solid #3A414F", boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.5)", transform: par(0.6), transformOrigin: "505px 448px" }}>
              {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 20.4, top: 2, width: 1.6, height: 4, background: "rgba(30,36,46,0.6)", transformOrigin: "0.8px 18px", transform: `rotate(${i * 30}deg)` }} />)}
              <div style={{ position: "absolute", left: 20, top: 8, width: 2, height: 14, background: "#22303F", transformOrigin: "50% 100%", transform: `rotate(${lf * 3.1}deg)` }} />
              <div style={{ position: "absolute", left: 20.4, top: 4, width: 1.4, height: 18, background: "#C44A3A", transformOrigin: "50% 100%", transform: `rotate(${lf * 37}deg)` }} />
              <div style={{ position: "absolute", left: 19, top: 19, width: 5, height: 5, borderRadius: "50%", background: "#22303F" }} />
            </div>

            {/* ---- THE OPEN NEON: swinging on two chains. Zero reading required. ---- */}
            <div style={{ position: "absolute", left: 648, top: 214, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.048) * 3.4 + shakeAmt * 0.4}deg)` }}>
              {[-36, 36].map((cx2, i) => <div key={"chn" + i} style={{ position: "absolute", left: cx2 - 1, top: 0, width: 2, height: 56, background: "repeating-linear-gradient(180deg,#8E97A8 0 4px,#3A414F 4px 7px)" }} />)}
              <div style={{ position: "absolute", left: -59, top: 55, width: 118, height: 62, borderRadius: "50%", border: `4px solid ${RED}`, background: "rgba(10,14,22,0.55)", boxShadow: `0 0 16px rgba(196,74,58,0.8), 0 0 44px rgba(196,74,58,0.35), inset 0 0 18px rgba(196,74,58,0.35)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.06em", color: "#CFE9FF", textShadow: "0 0 8px #5FA8E0, 0 0 22px rgba(95,168,224,0.8)" }}>OPEN</div>
              </div>
            </div>

            {/* ---- THE CRATE BUFFER: the WIP wall, climbing all night ---- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: par(0.9), transformOrigin: "505px 448px" }}>
              {Array.from({ length: bufN }).map((_, i) => {
                const col = i % 2, row = Math.floor(i / 2);
                const y = FLOOR - 34 - row * 34;
                if (y < 240) return null;
                const land = Math.max(0, 1 - (lf - (i - 4) * 11) / 6);
                const job = ["SHIP", "PATCH", "MIGRATE", "TESTS", "DOCS"][i % 5];
                return (
                  <div key={"bf" + i} style={{ position: "absolute", left: 192 + col * 74, top: y + (i >= 4 ? land * -22 : 0), width: 70, height: 32, borderRadius: 3, background: "linear-gradient(152deg,#C08A55,#7A5031)", border: "1.5px solid rgba(255,232,190,0.26)", boxShadow: "0 5px 11px rgba(0,0,0,0.55)", transform: `rotate(${(seed(i * 7.7) - 0.5) * 3}deg)`, opacity: i >= 4 ? 1 - land * 0.2 : 1, overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 12, width: 70, height: 5, background: "rgba(176,192,220,0.55)" }} />
                    <div style={{ position: "absolute", left: 0, top: 19, width: 70, textAlign: "center", fontFamily: mono, fontSize: 9, letterSpacing: "-0.03em", color: "rgba(46,30,18,0.8)" }}>{job}</div>
                    <div style={{ position: "absolute", left: 0, top: 0, width: 70, height: 4, background: "rgba(255,238,208,0.22)" }} />
                  </div>
                );
              })}
            </div>

            {/* ---- THE ROOF POST + THE MON-SUN CALENDAR, nailed inside his own work loop ---- */}
            <div style={{ position: "absolute", left: 566, top: 214, width: 16, height: 446, background: "linear-gradient(90deg,#3E4757,#1A2028 60%,#2C3340)", boxShadow: "3px 0 10px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 574, top: 448, width: 6, height: 6, borderRadius: "50%", background: "#B9C2D2", boxShadow: "0 0 4px rgba(255,255,255,0.5)" }} />
            <div style={{ position: "absolute", left: 580, top: 452, width: 68, height: 84, transform: `rotate(${Math.sin(lf * 0.19) * 1.6}deg) scale(${1 + (1 - fresh) * (lf >= 118 ? 0.3 : 0)})`, transformOrigin: "6px 4px" }}>
              <div style={{ position: "absolute", left: 3, top: 6, width: 64, height: 78, borderRadius: 3, background: "linear-gradient(160deg,#8E8878,#5C5749)", boxShadow: "0 7px 14px rgba(0,0,0,0.55)" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 64, height: 74, borderRadius: 3, background: `linear-gradient(160deg,${PAPER},#D6CFBC)`, border: "1px solid rgba(60,50,34,0.35)", boxShadow: "0 8px 16px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#2A2418", letterSpacing: "-0.02em" }}>{blockDay}</div>
                <div style={{ position: "absolute", left: 8, top: 5, width: 5, height: 5, borderRadius: "50%", background: "rgba(60,50,34,0.5)" }} />
                <div style={{ position: "absolute", left: 51, top: 5, width: 5, height: 5, borderRadius: "50%", background: "rgba(60,50,34,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 62, width: 64, height: 12, background: "repeating-linear-gradient(90deg, rgba(120,108,84,0.35) 0 4px, transparent 4px 8px)" }} />
              </div>
            </div>

            {/* ---- THE SEVEN-PAGE DRIFT: the week, face-up on the floor, countable with your eye ---- */}
            {DAYS.map((d, i) => {
              const t0 = TEARS[i];
              if (lf < t0) return null;
              const fly = over(lf, t0, 26, Easing.out(Easing.quad));
              const sx2 = 476 + i * 25, sy2 = 634 + (i % 2) * 6;
              const px2 = interpolate(fly, [0, 1], [592, sx2], cl) + (1 - fly) * Math.sin((lf - t0) * 0.5) * 22;
              const py2 = interpolate(fly, [0, 1], [456, sy2], cl);
              const rot = interpolate(fly, [0, 1], [(seed(i) - 0.5) * 60, -13 + i * 4.2], cl) + (1 - fly) * (lf - t0) * 9;
              const gx = interpolate(scoop, [0, 1], [px2, 600], cl), gy = interpolate(scoop, [0, 1], [py2, 494], cl);
              return (
                <div key={"pg" + i} style={{ position: "absolute", left: gx, top: gy, width: 42, height: 50, borderRadius: 2, background: `linear-gradient(160deg,${PAPER},#D2CBB8)`, border: "1px solid rgba(60,50,34,0.3)", boxShadow: `0 ${3 + (1 - fly) * 6}px ${5 + (1 - fly) * 10}px rgba(0,0,0,${0.45 - fly * 0.2})`, transform: `rotate(${rot + scoop * 40}deg) scale(${1 - scoop * 0.35})`, opacity: (1 - scoop) * (0.62 + fly * 0.38), display: "flex", alignItems: "center", justifyContent: "center", zIndex: 11 + i }}>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#332B1C" }}>{d}</div>
                </div>
              );
            })}

            {/* the drift's contact shadow: seven pages lying on a floor, not hovering over one */}
            <div style={{ position: "absolute", left: 470, top: 668, width: 220, height: 16, borderRadius: "50%", background: "rgba(6,9,14,0.6)", filter: "blur(6px)", opacity: (1 - scoop) * Math.min(1, torn / 3), zIndex: 10 }} />

            {/* ---- THE SPARK BENCH: the hero's station, and the scene's key light ---- */}
            <div style={{ position: "absolute", left: 386, top: 588, width: 170, height: 12, borderRadius: 2, background: "linear-gradient(180deg,#7C879C,#39414F)", boxShadow: "0 8px 16px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", left: 386, top: 598, width: 170, height: 6, background: "rgba(12,16,22,0.55)" }} />
            {[396, 530].map((bx, i) => <div key={"bl" + i} style={{ position: "absolute", left: bx, top: 600, width: 11, height: 60, background: "linear-gradient(90deg,#4C5566,#1E242E)" }} />)}
            <div style={{ position: "absolute", left: 392, top: 622, width: 158, height: 5, background: "rgba(80,90,108,0.7)" }} />
            <div style={{ position: "absolute", left: 446, top: 550, width: 64, height: 40, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(150deg,#6C7690,#2A3140)", border: "1.5px solid rgba(190,210,245,0.24)", boxShadow: "0 8px 15px rgba(0,0,0,0.55)" }} />
            <div style={{ position: "absolute", left: 508, top: 550, width: 40, height: 40, borderRadius: "50%", background: "conic-gradient(#8E97A8, #3A414F, #8E97A8, #3A414F, #8E97A8)", border: "2px solid rgba(210,228,255,0.3)", transform: `rotate(${lf * 41}deg)`, boxShadow: `0 0 ${10 + arc * 12}px rgba(200,216,232,${0.5 * arc})` }} />
            <div style={{ position: "absolute", left: 522, top: 564, width: 14, height: 14, borderRadius: "50%", background: ARC, opacity: arc, filter: "blur(3px)" }} />

            {/* ---- SPARKS: arc-white, never stop, at full song on frame 0 ---- */}
            {Array.from({ length: 40 }).map((_, i) => {
              const r = seed(i * 3.1 + 5);
              const p = (lf * (0.05 + r * 0.055) + r) % 1;
              const a = -0.2 + r * 1.35;
              const d = p * (70 + r * 230);
              const x = 548 + Math.cos(a) * d, y = 574 + Math.sin(a) * d + p * p * 90;
              const o = Math.max(0, 1 - p * 1.05) * sparkAmt;
              const len = 4 + r * 9 + p * 16;
              return <div key={"sp" + i} style={{ position: "absolute", left: x, top: y, width: len, height: 2.4 + r * 2.6, borderRadius: 2, background: r > 0.6 ? `linear-gradient(90deg, rgba(255,255,255,0), #FFFFFF)` : `linear-gradient(90deg, rgba(200,216,232,0), ${ARC})`, opacity: o, boxShadow: `0 0 ${7 + r * 9}px rgba(214,232,250,0.95)`, transform: `rotate(${a * 57}deg)`, zIndex: 12 }} />;
            })}
            {/* the flare: this is the scene's key, and it never lets up */}
            <div style={{ position: "absolute", left: 518, top: 544, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${0.95 * arc}), rgba(206,226,244,${0.5 * arc}) 40%, transparent 72%)`, filter: "blur(2px)", zIndex: 12 }} />
            <div style={{ position: "absolute", left: 388, top: 414, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(206,226,244,${0.4 * arc}), rgba(160,190,220,${0.12 * arc}) 46%, transparent 70%)`, filter: "blur(10px)", zIndex: 6 }} />
            <div style={{ position: "absolute", left: 548, top: 570, width: 150, height: 42, background: `linear-gradient(100deg, rgba(255,255,255,${0.34 * arc}), rgba(206,226,244,${0.1 * arc}) 45%, transparent 72%)`, filter: "blur(9px)", transform: "rotate(24deg)", transformOrigin: "0% 50%", zIndex: 12, clipPath: "polygon(0% 34%, 0% 66%, 100% 100%, 100% 0%)" }} />

            {/* ---- THE HERO. Frame 0, already mid-action. Never looks up at the door. ---- */}
            <div style={{ position: "absolute", left: hX - hSize / 2, top: hTop, transformOrigin: "50% 92%", transform: `rotate(${grindP * 6}deg)`, zIndex: 10 }}>
              <Mascot lf={lf} size={hSize} gaze={0.5} nodAmp={1.6} nodSpeed={8} stern={0.35} capBack={1} />
              {/* navy hi-vis coveralls with reflective chevrons */}
              <div style={{ position: "absolute", left: 0.17 * hSize, top: 0.5 * hSize, width: 0.66 * hSize, height: 0.22 * hSize, background: "linear-gradient(180deg,#22344E,#16233A)", opacity: 0.95 }}>
                <div style={{ position: "absolute", left: 0, top: 6, width: "100%", height: 5, background: "rgba(226,236,250,0.7)" }} />
                <div style={{ position: "absolute", left: 0, top: 25, width: "100%", height: 5, background: "rgba(226,236,250,0.7)" }} />
              </div>
              {/* the red L learner badge, velcroed to his chest. It comes off exactly once, at S7. */}
              <div style={{ position: "absolute", left: 0.36 * hSize, top: 0.53 * hSize, width: 20, height: 20, borderRadius: 3, background: PAPER, border: `2px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13, color: RED, transform: "rotate(-4deg)", boxShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>L</div>
              {/* THE CHEKHOV PLANT: the sticker gun, holstered, unused, all scene. S1's copy peels off him and seizes it. */}
              <div style={{ position: "absolute", left: 0.62 * hSize, top: 0.56 * hSize, transform: "rotate(11deg)" }}>
                <div style={{ position: "absolute", left: -2, top: 14, width: 30, height: 8, borderRadius: 2, background: "linear-gradient(180deg,#6B4A34,#3A2618)" }} />
                <div style={{ width: 26, height: 17, borderRadius: "3px 5px 2px 2px", background: "linear-gradient(150deg,#D8D3C6,#8B8578)", border: "1px solid rgba(30,26,18,0.5)", boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 4, top: 15, width: 7, height: 10, background: "linear-gradient(180deg,#9A9488,#57524A)" }} />
                <div style={{ position: "absolute", left: 15, top: -6, width: 15, height: 15, borderRadius: "50%", background: "linear-gradient(150deg,#F2EEE2,#B6B0A2)", border: `1.5px solid ${FAKE}`, opacity: 0.95 }} />
                <div style={{ position: "absolute", left: 21, top: 0, width: 3, height: 3, borderRadius: "50%", background: "rgba(40,36,26,0.7)" }} />
              </div>
              {/* welding goggles pushed UP on the brow, so the eyes always read. That is the bible's tell. */}
              <div style={{ position: "absolute", left: 0.17 * hSize, top: 0.2 * hSize, width: 0.66 * hSize, transform: `translateY(${headY}px)` }}>
                <div style={{ position: "absolute", left: 0, top: 6, width: "100%", height: 6, borderRadius: 3, background: "linear-gradient(180deg,#4A3B2A,#241B12)" }} />
                <div style={{ position: "absolute", left: 8, top: 0, width: 21, height: 16, borderRadius: 5, background: "linear-gradient(150deg,#7FA8C6,#2E4A64)", border: "2px solid #6B5842", boxShadow: "inset 0 2px 0 rgba(215,238,255,0.7)" }} />
                <div style={{ position: "absolute", left: 38, top: 0, width: 21, height: 16, borderRadius: 5, background: "linear-gradient(150deg,#7FA8C6,#2E4A64)", border: "2px solid #6B5842", boxShadow: "inset 0 2px 0 rgba(215,238,255,0.7)" }} />
              </div>
              {/* soot smear, growing all scene */}
              <div style={{ position: "absolute", left: 0.56 * hSize, top: 0.4 * hSize + headY, width: 12 + soot * 12, height: 8 + soot * 6, borderRadius: "50%", background: "rgba(24,22,20,0.55)", opacity: 0.3 + soot * 0.5, filter: "blur(1.6px)" }} />
            </div>

            {/* ---- the crate on the bench, being banded ---- */}
            <div style={{ position: "absolute", left: 494, top: 556, width: 64, height: 32, borderRadius: 3, background: "linear-gradient(152deg,#C08A55,#7A5031)", border: "1.5px solid rgba(255,232,190,0.28)", boxShadow: "0 5px 11px rgba(0,0,0,0.5)", opacity: ph > 0.5 && ph < 0.82 ? 1 : 0.001 }}>
              <div style={{ position: "absolute", left: 0, top: 12, width: 64, height: 5, background: "rgba(176,192,220,0.6)", transform: `scaleX(${Math.min(1, Math.max(0, (ph - 0.55) / 0.12))})`, transformOrigin: "0% 50%" }} />
            </div>

            {/* ---- the crate he kicks at the run, every loop. From f176 they come back at him off the steel. ---- */}
            <div style={{ position: "absolute", left: kx, top: ky, width: 62, height: 30, borderRadius: 3, background: "linear-gradient(152deg,#C08A55,#7A5031)", border: "1.5px solid rgba(255,232,190,0.28)", boxShadow: "0 6px 12px rgba(0,0,0,0.55)", transform: `rotate(${kt * 26}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 11, width: 62, height: 5, background: "rgba(176,192,220,0.5)" }} />
            </div>

            {/* ---- THE FORKLIFT WHO DIDN'T GET THE MEMO. He never notices the lock. ---- */}
            <div style={{ position: "absolute", left: fkX, top: 596, zIndex: 9 }}>
              <div style={{ position: "absolute", left: 46, top: 8, width: 44, height: 20, borderRadius: 3, background: "linear-gradient(152deg,#C08A55,#7A5031)", border: "1px solid rgba(255,232,190,0.24)" }} />
              <div style={{ position: "absolute", left: 40, top: 30, width: 56, height: 5, background: "#7E8798" }} />
              <div style={{ position: "absolute", left: 0, top: 18, width: 46, height: 34, borderRadius: 4, background: "linear-gradient(150deg,#3E4757,#1A2028)", border: "1.5px solid rgba(180,200,240,0.2)" }} />
              <div style={{ position: "absolute", left: -4, top: 24, width: 12, height: 8, borderRadius: 2, background: "rgba(240,246,255,0.85)", boxShadow: "0 0 12px rgba(220,236,255,0.7)" }} />
              {[4, 30].map((wx, i) => <div key={"fw" + i} style={{ position: "absolute", left: wx, top: 48, width: 15, height: 15, borderRadius: "50%", background: "#1A2028", border: "2px solid #58627A", transform: `rotate(${lf * 24}deg)` }}><div style={{ position: "absolute", left: 5, top: 1, width: 1.5, height: 9, background: "rgba(200,220,250,0.5)" }} /></div>)}
              <div style={{ position: "absolute", left: 2, top: -16, transform: "scaleX(-1)" }}>
                <Mascot lf={lf + 17} size={64} nodAmp={2.6} nodSpeed={7} hiVis={1} gaze={-2} />
                <div style={{ position: "absolute", left: 8, top: 14, width: 48, height: 7, borderRadius: 4, background: "#232A38" }} />
                {[8, 45].map((ex, i) => <div key={"ep" + i} style={{ position: "absolute", left: ex, top: 12, width: 11, height: 14, borderRadius: 3, background: "linear-gradient(150deg,#3E4757,#161C26)" }} />)}
              </div>
            </div>

            {/* ---- SWARF PILE + STIFF BROOM, in the dead corner ---- */}
            <div style={{ position: "absolute", left: 848, top: 542, width: 5, height: 116, background: "linear-gradient(90deg,#5A4A32,#2A2318)", transform: "rotate(7deg)", transformOrigin: "50% 100%" }} />
            <div style={{ position: "absolute", left: 836, top: 644, width: 34, height: 13, borderRadius: 2, background: "linear-gradient(180deg,#3E3628,#1E1A12)", transform: "rotate(7deg)" }} />
            <div style={{ position: "absolute", left: 786, top: 650, width: 62, height: 11, borderRadius: "50% 50% 3px 3px", background: "rgba(18,22,28,0.85)" }} />

            {/* ---- HIS AURA, SEEDED INSIDE: the dread lands 24 frames before he moves, in the hero's own room ---- */}
            <CodeRain lf={lf} x={712} y={260} h={400} cols={1} o={ramp(lf, 96, 106)} />
            <CodeRain lf={lf + 23} x={772} y={260} h={400} cols={1} o={ramp(lf, 108, 118)} />
            <CodeRain lf={lf + 51} x={832} y={260} h={400} cols={1} o={ramp(lf, 116, 126)} />
            {/* the dead unlit corner he stands in */}
            <div style={{ position: "absolute", left: 690, top: 196, width: 190, height: 504, background: "linear-gradient(90deg, transparent, rgba(8,10,14,0.55) 62%)", opacity: 0.85 }} />

            {/* ---- THE PULL STRAP ---- */}
            <div style={{ position: "absolute", left: STRAP_X - 3, top: sY, width: 6, height: interpolate(vHaul, [0, 1], [104, 62], cl), background: "linear-gradient(180deg,#5A4A32,#2E2618)", transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.5) * 2 - vHaul * 5}deg)`, opacity: lf < 178 ? 1 : 0, boxShadow: "0 3px 7px rgba(0,0,0,0.5)", zIndex: 13 }}>
              <div style={{ position: "absolute", left: -3, bottom: 0, width: 12, height: 9, borderRadius: 2, background: "#1E1A12" }} />
            </div>

            {/* ---- THE VILLAIN, INSIDE. He came from inside, and his rain does the identifying. ---- */}
            {lf <= 168 && vNode}

            {/* ==================== THE SHUTTER ==================== */}
            <div style={{ position: "absolute", left: MX0, top: MY0, width: MX1 - MX0, height: Math.max(0, sY - MY0), overflow: "hidden", zIndex: 20, transform: `translateY(${thud * jam * 1.6}px)` }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#232A36 0%,#39424F 22%,#2B3341 55%,#39424F 82%,#1E242E 100%)" }} />
              {/* slats + a 4px LIT GAP between every one of them, strobing on the grinder's own cycle */}
              {Array.from({ length: 20 }).map((_, i) => {
                const yy = sY - MY0 - 26 - i * 26;
                if (yy < -26) return null;
                return (
                  <div key={"sl" + i} style={{ position: "absolute", left: 0, top: yy, width: MX1 - MX0, height: 26 }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(0,0,0,0.28))" }} />
                    <div style={{ position: "absolute", left: 0, top: 22, width: "100%", height: 4, background: `rgba(206,224,244,${(0.16 + 0.62 * arc) * (0.25 + sealed * 0.75)})`, boxShadow: `0 0 ${5 + arc * 9}px rgba(190,214,240,${0.5 * sealed * arc})` }} />
                  </div>
                );
              })}
              {/* the OPEN neon's colour, smudging out through the slat gaps. The shop is open. The shop is padlocked. */}
              <div style={{ position: "absolute", left: 448, top: Math.max(0, 294 - MY0), width: 130, height: 22, background: "radial-gradient(ellipse at 50% 50%, rgba(196,74,58,0.55), rgba(95,168,224,0.22) 60%, transparent 76%)", filter: "blur(5px)", opacity: sealed * (0.6 + Math.abs(Math.sin(lf * 0.048)) * 0.4), transform: `translateX(${Math.sin(lf * 0.048) * 9}px)` }} />
              {/* face detail: rust weep, hazard chevrons, the dinged bottom slat */}
              <div style={{ position: "absolute", left: 10, top: 0, width: 20, height: "100%", background: "linear-gradient(180deg, rgba(126,72,34,0.62), rgba(126,72,34,0.16))", filter: "blur(1.6px)" }} />
              <div style={{ position: "absolute", left: 22, top: 0, width: 7, height: "100%", background: "linear-gradient(180deg, rgba(150,88,40,0.5), transparent 70%)", filter: "blur(1px)" }} />
              <div style={{ position: "absolute", left: 604, top: Math.max(0, 372 - MY0), width: 92, height: 56, background: "repeating-linear-gradient(-45deg, rgba(228,196,58,0.62) 0 9px, rgba(20,20,20,0.62) 9px 18px)", opacity: 0.42 + sealed * 0.34, borderRadius: 2 }} />
              {Array.from({ length: 14 }).map((_, i) => { const r = seed(i * 8.3 + 4); return <div key={"chip" + i} style={{ position: "absolute", left: 40 + r * 660, top: 20 + seed(i * 2.2) * 400, width: 3 + r * 6, height: 2 + r * 4, borderRadius: 2, background: "rgba(150,164,186,0.28)" }} />; })}
              {/* IT IS A DRUM: silhouette shadows rake across the bars as he and the forklift pass behind */}
              {sealed > 0.2 && [0, 1, 2].map((i) => {
                const sxp = ((lf * (2.4 + i * 1.7) + i * 260) % 900) - 100;
                return <div key={"shd" + i} style={{ position: "absolute", left: sxp, top: 0, width: 70 + i * 24, height: "100%", background: "rgba(5,7,11,0.6)", filter: "blur(7px)", opacity: sealed * (0.5 + i * 0.16) }} />;
              })}
              {/* the forklift's lamp, sweeping the bars left to right on every lap */}
              {sealed > 0.2 && <div style={{ position: "absolute", left: (fkX - 200) % 900, top: 0, width: 120, height: "100%", background: "linear-gradient(90deg, transparent, rgba(214,232,255,0.30), transparent)", filter: "blur(4px)", opacity: sealed }} />}
              {/* f184: THE DENT. It pops toward us and it stays. */}
              <div style={{ position: "absolute", left: 236, top: Math.max(0, 500 - MY0), width: 120, height: 84, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, rgba(240,250,255,0.92), rgba(150,176,206,0.45) 44%, rgba(20,26,36,0.5) 74%, transparent 88%)", boxShadow: "0 10px 26px rgba(0,0,0,0.75)", transform: `scale(${dent * (1 + pulse(184, 8) * 0.12)})`, opacity: dent }} />
              <div style={{ position: "absolute", left: 246, top: Math.max(0, 510 - MY0), width: 100, height: 66, borderRadius: "50%", border: "2.5px solid rgba(214,232,255,0.6)", transform: `scale(${dent})`, opacity: dent * 0.9 }} />
              {/* f190: a second bonk starts, and does not land. */}
              <div style={{ position: "absolute", left: 172, top: Math.max(0, 512 - MY0), width: 78, height: 52, borderRadius: "50%", background: "radial-gradient(circle at 44% 40%, rgba(214,230,250,0.34), transparent 66%)", transform: `scale(${dent2 * 0.6})`, opacity: dent2 * 0.85 }} />
            </div>
            {/* the coil box's own shadow, thrown down the face */}
            <div style={{ position: "absolute", left: MX0, top: MY0, width: MX1 - MX0, height: 40, background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)", zIndex: 21 }} />
          </div>

          {/* ===================== THE 25px HOT BAR: the motivated reason the frame never goes black ===================== */}
          <div style={{ position: "absolute", left: MX0, top: Math.max(sY, 660), width: MX1 - MX0, height: Math.max(0, SILL - Math.max(sY, 660)), overflow: "hidden", zIndex: 22, opacity: sealed }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(206,224,244,${0.5 + arc * 0.5}), rgba(217,119,87,${0.22 * outWarm + 0.1}) 70%, rgba(14,18,26,0.7))` }} />
            <div style={{ position: "absolute", inset: 0, background: `rgba(255,255,255,${arc * 0.22})` }} />
            {/* the inboard rollers, still turning, with a jam firing into the steel above them */}
            {[624, 646].map((rx, i) => <div key={"ib" + i} style={{ position: "absolute", left: rx - MX0 - 9, top: -4, width: 18, height: 18, borderRadius: "50%", background: "rgba(10,14,20,0.85)", transform: `rotate(${lf * 26}deg)` }}><div style={{ position: "absolute", left: 8, top: 1, width: 2, height: 16, background: "rgba(190,212,240,0.55)" }} /></div>)}
            {[0, 1, 2].map((i) => <div key={"jd" + i} style={{ position: "absolute", left: 90 + i * 220 + thud * jam * 8, top: 2, width: 64, height: 24, background: "rgba(8,10,14,0.75)", borderRadius: 2, opacity: jam * 0.9 }} />)}
          </div>

          {/* ===================== DOOR FRAME: jambs, coil box, wear ===================== */}
          <div style={{ position: "absolute", left: 112, top: 178, width: 28, height: 534, background: "linear-gradient(90deg,#151A22,#39424F 60%,#1A202A)", boxShadow: "6px 0 16px rgba(0,0,0,0.7)", zIndex: 24 }} />
          <div style={{ position: "absolute", left: 880, top: 178, width: 28, height: 534, background: "linear-gradient(90deg,#1A202A,#39424F 40%,#151A22)", boxShadow: "-6px 0 16px rgba(0,0,0,0.7)", zIndex: 24 }} />
          {Array.from({ length: 16 }).map((_, i) => { const r = seed(i * 4.1 + 9); return <div key={"stp" + i} style={{ position: "absolute", left: (i < 8 ? 116 : 884) + r * 20, top: 200 + r * 500, width: 3, height: 5, background: "rgba(190,204,226,0.34)", zIndex: 25 }} />; })}
          <div style={{ position: "absolute", left: MX0, top: 124, width: MX1 - MX0, height: 72, borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg,#4A5466 0%,#2E3644 55%,#161C26 100%)", border: "2px solid rgba(160,180,215,0.18)", boxShadow: "0 12px 26px rgba(0,0,0,0.75)", zIndex: 26 }}>
            {Array.from({ length: 24 }).map((_, i) => <div key={"rv" + i} style={{ position: "absolute", left: 12 + i * 30, top: 8, width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(150deg,#8E97A8,#3A414F)" }} />)}
            {Array.from({ length: 24 }).map((_, i) => <div key={"rv2" + i} style={{ position: "absolute", left: 12 + i * 30, top: 58, width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(150deg,#8E97A8,#3A414F)" }} />)}
            <div style={{ position: "absolute", left: 0, top: 26, width: "100%", height: 3, background: "rgba(10,14,20,0.6)" }} />
            {/* the coil: fat at f0, paying itself out into the mouth */}
            <div style={{ position: "absolute", left: 20, top: 20, width: MX1 - MX0 - 40, height: 34, borderRadius: 17, background: "repeating-linear-gradient(90deg, rgba(72,82,100,0.5) 0 8px, rgba(24,30,40,0.5) 8px 14px)", transform: `scaleY(${interpolate(sY, [210, 675], [1, 0.35], cl)})`, opacity: 0.8 }} />
            <div style={{ position: "absolute", left: 10, top: 4, width: 20, height: 64, background: "linear-gradient(180deg, rgba(126,72,34,0.5), rgba(126,72,34,0.12))", filter: "blur(1.4px)" }} />
          </div>

          {/* ===================== THE SILL, THE HASP, THE PADLOCK ===================== */}
          <div style={{ position: "absolute", left: 112, top: 698, width: 796, height: 16, background: "linear-gradient(180deg,#4A5262,#191F28)", boxShadow: "0 8px 18px rgba(0,0,0,0.7)", zIndex: 30 }} />
          {Array.from({ length: 9 }).map((_, i) => { const r = seed(i * 6.7 + 1); return <div key={"fly" + i} style={{ position: "absolute", left: 160 + r * 660, top: 696 + r * 8, width: 12 + r * 20, height: 9 + r * 6, background: `rgba(${210 - r * 80},${204 - r * 70},${188 - r * 60},0.42)`, transform: `rotate(${(r - 0.5) * 40}deg)`, zIndex: 31, filter: "blur(0.4px)" }} />; })}
          {/* the hasp: empty, swinging faintly, a loaded gun in plain sight, silhouetted against the hot bar */}
          <div style={{ position: "absolute", left: 496, top: 676, width: 18, height: 30, transformOrigin: "50% 100%", transform: `rotate(${lf < 174 ? Math.sin(lf * 0.13) * 4 + shakeAmt * 0.5 : 0}deg)`, zIndex: 32 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "9px 9px 2px 2px", border: "4px solid #A7AFBE", background: "rgba(10,14,20,0.8)", boxShadow: "0 4px 9px rgba(0,0,0,0.7)" }} />
          </div>
          <div style={{ position: "absolute", left: 486, top: 700, width: 38, height: 12, background: "linear-gradient(180deg,#7C8494,#2E3542)", zIndex: 32 }} />
          {lockOn && (
            <div style={{ position: "absolute", left: lkx - 39, top: lky - 33, width: 78, height: 66, transformOrigin: "50% 0%", transform: `rotate(${rock}deg) scale(${interpolate(lockShut, [0, 1], [1.14, 1], cl)})`, zIndex: 33 }}>
              <div style={{ position: "absolute", left: 25, top: -31, width: 28, height: 34, borderRadius: "14px 14px 0 0", border: `5px solid rgba(${180 + brass * 20},${186 + brass * 20},${200 - brass * 40},${0.5 + brass * 0.5})`, borderBottom: "none", transform: `translateY(${(1 - lockShut) * -9}px)` }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 78, height: 66, borderRadius: 11, background: brass > 0.02 ? `linear-gradient(150deg, rgba(231,178,76,${brass}), rgba(138,95,32,${brass}))` : "#0B0D11", border: `2px solid rgba(${40 + brass * 215},${44 + brass * 196},${54 + brass * 146},${0.55 + brass * 0.4})`, boxShadow: `0 12px 24px rgba(0,0,0,0.75), 0 0 ${brass * 20}px rgba(231,178,76,${brass * 0.5}), 0 0 0 1.5px rgba(188,208,236,${0.5 - brass * 0.4}), 0 0 10px rgba(170,196,230,${0.4 - brass * 0.35})` }} />
              {brass > 0.02 && <div style={{ position: "absolute", left: 7, top: 6, width: 64, height: 9, borderRadius: 4, background: `rgba(255,244,210,${0.3 * brass + spec * 0.6})` }} />}
              <div style={{ position: "absolute", left: 28, top: 22, width: 22, height: 22, borderRadius: "50%", background: "#05070B", border: `2px solid rgba(${60 + brass * 195},${50 + brass * 170},${30 + brass * 120},${0.4 + brass * 0.5 + spec * 0.5})`, boxShadow: `inset 0 3px 6px rgba(0,0,0,0.95), 0 0 ${spec * 12}px rgba(255,244,210,${spec * 0.8})` }} />
              <div style={{ position: "absolute", left: 36, top: 34, width: 5, height: 13, background: "#05070B" }} />
            </div>
          )}
          {/* the keyhole's iris: the hole the keys go in, and our guy does not have them */}
          {keyPush > 0 && <div style={{ position: "absolute", left: 505 - irisR, top: 726 - irisR, width: irisR * 2, height: irisR * 2, borderRadius: "50%", background: "radial-gradient(circle, #04060A 62%, rgba(4,6,10,0.85) 82%, transparent 96%)", zIndex: 60, boxShadow: `0 0 ${28 * keyPush}px rgba(0,0,0,0.9)` }} />}

          {/* ===================== THE OUTBOUND ROLLER RUN + THE FLAP THAT GETS SHEARED ===================== */}
          <div style={{ position: "absolute", left: 604, top: 670, width: 60, height: 22, zIndex: 34 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: 5, background: "linear-gradient(180deg,#6C7690,#2A3140)" }} />
            <div style={{ position: "absolute", left: 0, top: 17, width: 60, height: 5, background: "linear-gradient(180deg,#454E60,#1B2130)" }} />
          </div>
          <div style={{ position: "absolute", left: 660, top: 681, width: 168, height: 1, transformOrigin: "0% 50%", transform: `rotate(${shear * 20}deg)`, zIndex: 34 }}>
            <div style={{ position: "absolute", left: 0, top: -11, width: 168, height: 5, background: "linear-gradient(180deg,#6C7690,#2A3140)", boxShadow: "0 4px 9px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", left: 0, top: 7, width: 168, height: 5, background: "linear-gradient(180deg,#454E60,#1B2130)" }} />
            {[24, 78, 132].map((rx, i) => (
              <div key={"or" + i} style={{ position: "absolute", left: rx - 10, top: -10, width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(150deg,#8A94AC,#2E3542)", border: "1.5px solid rgba(190,210,245,0.24)", transform: `rotate(${lf * 26}deg)`, boxShadow: `0 0 ${outWarm * 8}px rgba(217,119,87,${outWarm * 0.4})` }}>
                <div style={{ position: "absolute", left: 8, top: 1.5, width: 2, height: 16, background: "rgba(200,220,250,0.5)" }} />
                <div style={{ position: "absolute", left: 1.5, top: 8, width: 16, height: 2, background: "rgba(200,220,250,0.28)" }} />
              </div>
            ))}
            {/* the torn hinge, where the guillotine came through at f168 */}
            {shear > 0.05 && [0, 1, 2].map((i) => <div key={"tr" + i} style={{ position: "absolute", left: -2 + i * 3, top: -13 + i * 8, width: 9, height: 4, background: "#8A94AC", transform: `rotate(${-30 + i * 26}deg)`, opacity: shear }} />)}
          </div>
          {/* the crate that rides OUT and thumps onto the apron. The last one lands at f168. */}
          {lf < 168 && (
            <div style={{ position: "absolute", left: 606 + Math.min(runT / 0.86, 1) * 212, top: 660 + Math.max(0, (runT - 0.86) / 0.14) * 46, width: 52, height: 26, borderRadius: 3, background: "linear-gradient(152deg,#5E6C86,#2A3446)", border: `1px solid rgba(159,180,206,0.4)`, boxShadow: "0 5px 11px rgba(0,0,0,0.6)", transform: `rotate(${Math.max(0, (runT - 0.86) / 0.14) * 22}deg)`, zIndex: 35 }}>
              <div style={{ position: "absolute", left: 0, top: 9, width: 52, height: 4, background: "rgba(159,180,206,0.42)" }} />
            </div>
          )}

          {/* ===================== THE APRON DELIVERY STACK: the work that reached the world, frozen in the cold ===================== */}
          {Array.from({ length: apronN }).map((_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            const land = Math.max(0, 1 - (lf - (i - 4) * 21) / 6);
            return (
              <div key={"ap" + i} style={{ position: "absolute", left: 626 + col * 50, top: 762 - row * 30 - (i >= 4 ? land * 20 : 0), width: 48, height: 28, borderRadius: 3, background: "linear-gradient(152deg,#4E5C74,#222B3A)", border: `1px solid rgba(159,180,206,${0.34 + outWarm * 0.2})`, boxShadow: `0 5px 11px rgba(0,0,0,0.7), inset 0 1px 0 rgba(159,180,206,0.3)`, transform: `rotate(${(seed(i * 3.3) - 0.5) * 4}deg)`, zIndex: 33, opacity: i >= 4 ? 1 - land * 0.15 : 1 }}>
                <div style={{ position: "absolute", left: 0, top: 10, width: 48, height: 4, background: `rgba(159,180,206,${0.3 + outWarm * 0.25})` }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 48, height: 3, background: `rgba(217,119,87,${outWarm * 0.4})` }} />
              </div>
            );
          })}

          {/* ===================== THE OFFERED CRATE. Work offered, work refused, in half a second, dead centre. ===================== */}
          {oOp > 0.01 && (
            <div style={{ position: "absolute", left: ox - 34, top: oy - 24, width: 68, height: 34, borderRadius: 3, background: "linear-gradient(152deg,#6A7890,#2C3648)", border: "1.5px solid rgba(180,200,226,0.45)", boxShadow: "0 9px 18px rgba(0,0,0,0.75)", opacity: oOp, transform: `rotate(${-4 + refuse * 13}deg) scale(${os})`, zIndex: 36 }}>
              <div style={{ position: "absolute", left: 0, top: 13, width: 68, height: 5, background: "rgba(180,200,226,0.42)" }} />
              <div style={{ position: "absolute", left: 0, top: 21, width: 68, textAlign: "center", fontFamily: mono, fontSize: 9, color: "rgba(216,228,246,0.72)" }}>SHIP</div>
              <div style={{ position: "absolute", left: 0, top: 0, width: 68, height: 4, background: `rgba(255,238,208,${0.12 + outWarm * 0.2})` }} />
            </div>
          )}
          {refuse > 0.02 && refuse < 0.99 && Array.from({ length: 8 }).map((_, i) => { const r = seed(i * 5.9 + 6); return <div key={"scf" + i} style={{ position: "absolute", left: ox - 20 + r * 44, top: oy + 6 + r * 8 - refuse * 12, width: 2 + r * 3, height: 2 + r * 3, borderRadius: "50%", background: "rgba(140,158,184,0.6)", opacity: (1 - refuse) * 0.7, zIndex: 36 }} />; })}

          {/* ===================== THE APRON: cold, and only cold, until f178 ===================== */}
          <div style={{ position: "absolute", left: 0, top: SILL, width: 1012, height: 92, background: "linear-gradient(180deg,#171C26 0%,#0E1219 100%)", zIndex: 28 }} />
          <div style={{ position: "absolute", left: 150, top: SILL, width: 720, height: 92, background: `linear-gradient(180deg, rgba(143,166,196,${0.16 * (1 - sealed) + 0.05}), transparent 74%)`, zIndex: 29 }} />
          <div style={{ position: "absolute", left: 150, top: SILL, width: 720, height: 92, background: `linear-gradient(180deg, rgba(217,119,87,${0.2 * outWarm}), transparent 78%)`, zIndex: 29 }} />
          {/* the oil rainbow puddle, cold sodium rim only, rippling on every haul */}
          <div style={{ position: "absolute", left: 496, top: 736, width: 128, height: 26, borderRadius: "50%", background: "linear-gradient(120deg, rgba(50,66,92,0.85), rgba(24,32,46,0.9))", boxShadow: `inset 0 0 14px rgba(0,0,0,0.8)`, zIndex: 37, transform: `scale(${1 + shakeAmt * 0.012}, ${1 + Math.sin(lf * 2.2) * 0.02 + shakeAmt * 0.02})` }}>
            <div style={{ position: "absolute", left: 6, top: 3, width: 116, height: 8, borderRadius: "50%", border: `1.5px solid rgba(159,180,206,${0.34 + Math.abs(Math.sin(lf * 0.5)) * 0.18})` }} />
            <div style={{ position: "absolute", left: 22, top: 8, width: 74, height: 10, borderRadius: "50%", background: `linear-gradient(90deg, rgba(120,150,190,0.16), rgba(217,119,87,${outWarm * 0.3}), rgba(120,150,190,0.10))`, filter: "blur(2px)" }} />
          </div>

          {/* ===================== THE SPARKS THAT GET OUT. The work does not. ===================== */}
          {lf >= 177 && <div style={{ position: "absolute", left: 260, top: 686, width: 500, height: 104, background: `radial-gradient(ellipse at 50% 0%, rgba(231,178,76,${0.4 * outWarm * arc}), rgba(217,119,87,${0.12 * outWarm}) 52%, transparent 78%)`, filter: "blur(7px)", zIndex: 37 }} />}
          {lf >= 177 && Array.from({ length: 30 }).map((_, i) => {
            const r = seed(i * 4.7 + 2);
            const p = ((lf - 177) * (0.034 + r * 0.046) + r) % 1;
            const x0 = 320 + r * 360;
            const x = x0 + (r - 0.5) * p * 260;
            const y = 690 + p * (44 + r * 92);
            const s = 3 + r * 4.5 + p * 7;
            return <div key={"os" + i} style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.7, borderRadius: 3, background: r > 0.7 ? "#FFFFFF" : "#E3D2B4", opacity: Math.max(0, 1 - p * 1.05) * outWarm * arc, boxShadow: `0 0 ${9 + s * 1.6}px rgba(231,178,76,0.95)`, zIndex: 38 }} />;
          })}

          {/* ===================== HIS RAIN, ON OUR SIDE. The last thing identifying him after he is gone. ===================== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 39 }}>
            <CodeRain lf={lf} x={64} y={380} h={412} cols={3} o={ramp(lf, 168, 178)} gap={48} />
            <CodeRain lf={lf + 37} x={896} y={380} h={412} cols={3} o={ramp(lf, 168, 178)} gap={40} />
          </div>

          {/* ===================== THE VILLAIN, OUT HERE. He took the exit, not the capability. ===================== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 41 }}>{lf >= 169 && vNode}</div>

          {/* ===================== FOREGROUND OCCLUDERS ===================== */}
          <div style={{ position: "absolute", left: 0, top: 636, width: 152, height: 156, zIndex: 46, filter: "blur(1.6px)", transform: par(2.6), transformOrigin: "505px 448px" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={"pal" + i} style={{ position: "absolute", left: -8, top: 12 + i * 36, width: 158, height: 30, background: "linear-gradient(180deg,#141922,#070A0E)", boxShadow: "0 5px 12px rgba(0,0,0,0.8)" }}>
                {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 6 + k * 30, top: 4, width: 22, height: 22, background: "rgba(30,38,50,0.75)" }} />)}
                <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 3, background: `rgba(159,180,206,${0.1 + outWarm * 0.16})` }} />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 860, top: 592, width: 152, height: 200, zIndex: 46, filter: "blur(1.6px)", transform: par(2.6), transformOrigin: "505px 448px" }}>
            <div style={{ position: "absolute", left: 14, top: 16, width: 122, height: 184, borderRadius: "10px 10px 5px 5px", background: "linear-gradient(90deg,#0A0E13,#1A2130 55%,#070A0E)", boxShadow: "0 10px 26px rgba(0,0,0,0.85)" }}>
              {[26, 92, 150].map((by, i) => <div key={"rb" + i} style={{ position: "absolute", left: 0, top: by, width: "100%", height: 8, background: "rgba(36,46,62,0.9)", boxShadow: `0 -1px 0 rgba(159,180,206,${0.12 + outWarm * 0.2})` }} />)}
              <div style={{ position: "absolute", left: 0, top: 0, width: 6, height: "100%", background: `rgba(159,180,206,${0.1 + outWarm * 0.22})` }} />
            </div>
            {[0, 1, 2, 3].map((i) => <div key={"hs" + i} style={{ position: "absolute", left: 2 + i * 5, top: 96 + i * 20, width: 92 - i * 8, height: 92 - i * 8, borderRadius: "50%", border: "7px solid #0B0F15", opacity: 0.9 }} />)}
          </div>

          {/* dust and the odd spark crossing in FRONT of the occluders */}
          {Array.from({ length: 16 }).map((_, i) => {
            const r = seed(i * 6.1 + 8);
            const y = 792 - ((lf * (0.9 + r * 1.7) + r * 360) % 400);
            return <div key={"fg" + i} style={{ position: "absolute", left: 20 + r * 970, top: y, width: 3 + r * 4, height: 3 + r * 4, borderRadius: "50%", background: r > 0.66 ? `rgba(231,178,76,${0.35 + outWarm * 0.5})` : "rgba(190,210,240,0.32)", opacity: 0.3 + r * 0.4, zIndex: 48 }} />;
          })}

          {/* ============================================================================
              THE OPENING BURST: the week ripped through at 10x. Lives f0 to f38 only, then
              hands the frame to the real-time night shift. This is the scroll-stopper.
             ============================================================================ */}
          {burstAmt > 0.004 && (
            <div style={{ position: "absolute", inset: 0, zIndex: 54, pointerEvents: "none" }}>
              {/* zoom-burst rings punching out of the bench, riding the punch-in */}
              {[0, 1, 2].map((i) => {
                const t = interpolate(lf, [i * 3, i * 3 + 11], [0, 1], cl);
                if (t <= 0 || t >= 1) return null;
                return <div key={"zr" + i} style={{ position: "absolute", left: 548 - t * 540, top: 574 - t * 520, width: t * 1080, height: t * 1040, borderRadius: "50%", border: `${(1 - t) * 10}px solid rgba(214,232,250,${(1 - t) * 0.5 * burstAmt})`, filter: "blur(3px)" }} />;
              })}

              {/* SPEED LINES: the week sheeting past, warm + arc-white, all blurred motion */}
              {Array.from({ length: 22 }).map((_, i) => {
                const r = seed(i * 2.3 + 4);
                const y = 208 + r * 476;
                const len = 130 + r * 320;
                const x = 900 - ((lf * (48 + r * 78) + r * 1500) % 1560);
                const warm = r > 0.72;
                return <div key={"spl" + i} style={{ position: "absolute", left: x, top: y, width: len, height: 2 + r * 3.6, borderRadius: 3, background: warm ? "linear-gradient(90deg, transparent, rgba(231,190,120,0.9))" : "linear-gradient(90deg, transparent, rgba(206,224,244,0.85))", opacity: burstAmt * (0.16 + r * 0.5), filter: `blur(${1 + r * 1.7}px)`, boxShadow: warm ? "0 0 9px rgba(231,190,120,0.6)" : "0 0 9px rgba(206,224,244,0.5)" }} />;
              })}

              {/* THE CALENDAR RIPPING: MON..SUN tearing off the post and flying, one every ~2.4f */}
              {Array.from({ length: 9 }).map((_, i) => {
                const start = i * 2.4;
                const life = (lf - start) / 9;
                if (life < 0 || life > 1) return null;
                const r = seed(i * 3.7 + 6);
                const dir = r > 0.5 ? 1 : -1;
                const px = 598 + dir * (60 + r * 250) * life;
                const py = 486 - life * (300 + r * 160) - Math.sin(life * Math.PI) * 24;
                const rot = (r - 0.5) * 40 + life * 300 * dir;
                const op = burstAmt * (life < 0.14 ? life / 0.14 : Math.min(1, (1 - life) * 2.4));
                return (
                  <div key={"rip" + i} style={{ position: "absolute", left: px - 21, top: py - 25, width: 42, height: 50, borderRadius: 2, background: `linear-gradient(160deg,${PAPER},#D2CBB8)`, border: "1px solid rgba(60,50,34,0.3)", boxShadow: "0 5px 12px rgba(0,0,0,0.5)", transform: `rotate(${rot}deg)`, opacity: op, filter: `blur(${life * 2.6}px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#332B1C" }}>{DAYS[i % 7]}</div>
                    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 4, background: "repeating-linear-gradient(90deg, #B8B09C 0 3px, transparent 3px 6px)" }} />
                  </div>
                );
              })}

              {/* CRATES SLAMMING THE BUFFER at 10x, the stack shooting up */}
              {Array.from({ length: 11 }).map((_, i) => {
                const start = i * 1.9;
                const life = (lf - start) / 6;
                if (life < 0) return null;
                const settled = Math.min(1, life);
                const slotY = 634 - i * 26;
                const cx = interpolate(settled, [0, 1], [532, 208 + (i % 2) * 72], { ...cl, easing: Easing.out(Easing.quad) });
                const cy = interpolate(settled, [0, 1], [600, slotY], cl) - Math.sin(settled * Math.PI) * 130;
                const op = burstAmt * (life > 1.5 ? Math.max(0, 1 - (life - 1.5) * 2) : 1);
                if (op <= 0.01) return null;
                return (
                  <div key={"bc" + i} style={{ position: "absolute", left: cx, top: cy, width: 62, height: 30, borderRadius: 3, background: "linear-gradient(152deg,#C08A55,#7A5031)", border: "1.5px solid rgba(255,232,190,0.28)", boxShadow: "0 6px 12px rgba(0,0,0,0.55)", transform: `rotate(${(1 - settled) * 40 * (i % 2 ? 1 : -1)}deg)`, opacity: op, filter: `blur(${(1 - settled) * 2.4}px)` }}>
                    <div style={{ position: "absolute", left: 0, top: 11, width: 62, height: 5, background: "rgba(176,192,220,0.5)" }} />
                  </div>
                );
              })}
              {/* the impact puffs where each crate slams home */}
              {Array.from({ length: 11 }).map((_, i) => {
                const start = i * 1.9;
                const life = (lf - start) / 6;
                if (life <= 1 || life >= 1.6) return null;
                const slotY = 634 - i * 26;
                return <div key={"pf" + i} style={{ position: "absolute", left: 208 + (i % 2) * 72, top: slotY - 8, width: 62, height: 28, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(255,246,222,0.65), transparent 70%)", opacity: burstAmt * (1.6 - life) * 1.7, filter: "blur(3px)" }} />;
              })}

              {/* SPARK SHEET off the grinder, doubled and hotter for the burst */}
              {Array.from({ length: 30 }).map((_, i) => {
                const r = seed(i * 3.9 + 15);
                const p = (lf * (0.09 + r * 0.09) + r) % 1;
                const a = -0.5 + r * 1.9;
                const d = p * (110 + r * 300);
                const x = 548 + Math.cos(a) * d, y = 574 + Math.sin(a) * d + p * p * 70;
                const o = Math.max(0, 1 - p * 1.05) * burstAmt;
                const len = 6 + r * 12 + p * 22;
                return <div key={"bsp" + i} style={{ position: "absolute", left: x, top: y, width: len, height: 2.4 + r * 2.6, borderRadius: 2, background: r > 0.5 ? "#FFFFFF" : ARC, opacity: o * 0.9, boxShadow: `0 0 ${8 + r * 10}px rgba(214,232,250,0.95)`, transform: `rotate(${a * 57}deg)`, filter: "blur(0.5px)" }} />;
              })}

              {/* THE HERO, A WARM BLUR: motion ghosts streaking over his station */}
              {Array.from({ length: 5 }).map((_, i) => {
                const r = seed(i * 4.4 + 20);
                const tilt = Math.sin(lf * 1.4 + i);
                const x = 452 + Math.sin(lf * 1.1 + i * 1.3) * 26 - 74;
                const y = 556 + i * 5;
                return <div key={"hb" + i} style={{ position: "absolute", left: x, top: y, width: 152, height: 8, borderRadius: 4, background: "linear-gradient(90deg, transparent, rgba(217,119,87,0.5), transparent)", opacity: burstAmt * (0.2 + r * 0.3), filter: "blur(3px)", transform: `rotate(${tilt * 5}deg)` }} />;
              })}
            </div>
          )}

          {/* THE FLASH: cracks white on f0-2, a second strobe at f6, keyed off the bench */}
          {flash > 0.002 && <div style={{ position: "absolute", inset: 0, zIndex: 70, pointerEvents: "none", background: `radial-gradient(ellipse at 54% 62%, rgba(255,255,255,${flash}), rgba(226,238,252,${flash * 0.82}) 55%, rgba(206,224,244,${flash * 0.5}))` }} />}

          {/* ===================== VIGNETTE ===================== */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 220px rgba(0,0,0,0.75)", zIndex: 50 }} />
        </div>
      </div>
    </Panel>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const pulse = (a: number, len: number) => (lf >= a ? Math.max(0, 1 - (lf - a) / len) : 0);
  const D = Math.PI / 180;

  // ===================== LAYER COUNTER: seven shots, seven flips, 03 -> 09, mid-flip at the cut =====================
  const SHOTS = [0, 70, 78, 86, 104, 140, 150];
  const fired = SHOTS.filter((s) => lf >= s).length;
  const lastShot = SHOTS[Math.max(0, fired - 1)];
  const kick = Math.max(0, 1 - (lf - lastShot) / 7);
  const flip0 = lastShot === 0 ? -4 : lastShot;
  const flipP = ramp(lf, flip0, flip0 + 6);
  const dig = 2 + fired;
  const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
  const whump = Math.max(kick, pulse(106, 10), pulse(137, 11));

  // ===================== CAMERA source knobs (kept; a restrained rig reads them below) =====================
  const hold = lf >= 24 && lf <= 36 ? 0 : 1;
  const push = interpolate(lf, [0, 136, 154], [1.0, 1.042, 1.09], { ...cl, easing: Easing.in(Easing.quad) });
  const drift = 6 * hold;
  const shk = kick * 3 + pulse(106, 9) * 4.4 + pulse(133, 8) * 6 + pulse(137, 7) * 3 + pulse(150, 10) * 8;
  const camX = Math.sin(lf * 0.088) * drift + Math.sin(lf * 0.031) * drift * 0.6 + Math.sin(lf * 4.1) * shk - pulse(133, 6) * 15;
  const camY = Math.cos(lf * 0.071) * drift * 0.55 + Math.cos(lf * 4.9) * shk * 0.6;
  const camRoll = pulse(133, 11) * 2;

  // ===================== LAYER FIRE: the key light. =====================
  const gclk = lf < 24 ? lf : lf < 36 ? 24 : lf - 12;
  const climb = 1 + ramp(gclk, 0, 142) * 0.46;
  const swell = 1 + 0.3 * Math.pow(Math.abs(Math.sin((gclk * Math.PI) / 40)), 3);
  const lick = climb * swell * (1 + Math.abs(Math.sin(lf * 0.29)) * 0.09);
  const belch = pulse(116, 17);
  const tyreFire = ramp(lf, 138, 155);
  const keyI = Math.min(1, (lick - 1) / 0.85);

  // ===================== THE VILLAIN =====================
  const peelP = over(lf, 24, 12, Easing.out(Easing.cubic));
  const VF = [44, 56, 62, 68, 78, 86, 90, 96, 100, 104, 133, 142, 154];
  const vxT = interpolate(lf, VF, [330, 356, 300, 150, 150, 270, 360, 470, 566, 612, 612, 600, 452], cl);
  const vyT = interpolate(lf, VF, [505, 496, 516, 524, 520, 486, 478, 484, 476, 468, 468, 470, 522], cl);
  const vx = lf < 44 ? 466 + (330 - 466) * peelP : vxT;
  const vy = lf < 44 ? 500 + 5 * peelP : vyT;
  const VS = interpolate(lf, [24, 40, 56, 142, 154], [206, 208, 218, 218, 396], { ...cl, easing: Easing.in(Easing.quad) });
  const vTilt = interpolate(lf, [24, 30, 36], [0, -12, 0], { ...cl, easing: Easing.out(Easing.cubic) });
  const vSil = 1 - ramp(lf, 33, 43);
  const vLit = ramp(lf, 33, 44);
  const scrim = ramp(lf, 20, 28) - ramp(lf, 42, 52);
  const glint = pulse(40, 12);
  const rain = interpolate(lf, [29, 30, 56, 70, 104], [0, 0.32, 0.55, 0.78, 1], cl);
  const vNodAmp = lf < 44 ? 0.4 : lf < 142 ? 2.6 : 0.5;
  const vNodSpeed = 11;
  const vHop = Math.max(0, Math.sin(lf / (vNodSpeed * 0.6))) * vNodAmp * 2.2;

  // ===================== THE HERO =====================
  const HS = 206;
  const HF = [0, 72, 80, 100, 106, 112, 116, 120, 126, 133, 137, 154];
  const hx = interpolate(lf, HF, [466, 466, 528, 528, 524, 400, 400, 470, 470, 562, 552, 300], { ...cl, easing: Easing.inOut(Easing.quad) });
  const hy = interpolate(lf, HF, [498, 498, 496, 496, 500, 490, 490, 485, 485, 480, 690, 734], { ...cl, easing: Easing.inOut(Easing.quad) });
  const fall = ramp(lf, 133, 138);
  const heroRot = -fall * 96 + (lf > 138 ? Math.sin((lf - 138) * 0.42) * 2.6 : 0);
  const heroShock = Math.max(pulse(88, 12) * 0.5, pulse(94, 8) * 0.32, pulse(116, 14) * 0.62, (ramp(lf, 120, 126) - ramp(lf, 130, 133)) * 0.5, fall * 0.85);
  const heroGaze = interpolate(lf, [0, 18, 56, 70, 74, 100, 118, 126, 154], [-3, -3, -4, -4, 4, 4, 3, 5, 6], cl);
  const cap = lf < 133 ? 1 : 0;
  const U = HS / 200;
  const hNubX = hx - 0.395 * HS, hNubY = hy - 0.055 * HS;

  // ===================== THE TAGGER =====================
  const GF = [0, 8, 22, 44, 50, 55, 56, 62, 68, 70, 76, 78, 84, 86, 92, 96, 100, 104, 108, 126, 133, 140, 146, 150, 154];
  const gx = interpolate(lf, GF, [320, 326, 320, 322, 302, 316, 366, 296, 176, 60, 150, 250, 240, 296, 390, 466, 566, 644, 612, 620, 596, 530, 556, 628, 618], { ...cl, easing: Easing.inOut(Easing.quad) });
  const gy = interpolate(lf, GF, [548, 534, 546, 548, 554, 542, 520, 540, 552, 580, 496, 400, 464, 496, 490, 494, 490, 428, 500, 486, 496, 706, 548, 336, 296], { ...cl, easing: Easing.inOut(Easing.quad) });
  const gs = interpolate(lf, [142, 154], [1, 2.35], { ...cl, easing: Easing.in(Easing.quad) });
  const vRight = lf < 68 ? true : lf < 75 ? false : lf < 136 ? true : false;
  const vNubX = vx + (vRight ? 1 : -1) * 0.395 * VS, vNubY = vy - 0.055 * VS - vHop;
  const nubX = lf >= 56 ? vNubX : hNubX, nubY = lf >= 56 ? vNubY : hNubY;
  const GRIP = 76, GBASE = 9;
  const aim = Math.atan2(nubY - gy, nubX - gx) / D;
  const gunRot = aim - GBASE;
  const gripX = gx + Math.cos(aim * D) * GRIP * gs, gripY = gy + Math.sin(aim * D) * GRIP * gs;
  const reach = Math.hypot(nubX - gx, nubY - gy) - GRIP * gs;
  const thX = gx + (95 * Math.cos(gunRot * D) + 12 * Math.sin(gunRot * D)) * gs;
  const thY = gy + (95 * Math.sin(gunRot * D) - 12 * Math.cos(gunRot * D)) * gs;

  // ===================== flat-geometric 6-plane flame =====================
  const flame = (k: string, x: number, y: number, w: number, h: number, o: number, planes = 6) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity: o, pointerEvents: "none" }}>
      {[{ c: "#8E2412", s: 1.12, p: 0 }, { c: "#B8371F", s: 0.98, p: 0.7 }, { c: "#E4661F", s: 0.8, p: 1.4 }, { c: "#EF8A2E", s: 0.6, p: 2.1 }, { c: "#FFC44C", s: 0.4, p: 2.8 }, { c: "#FFEDBE", s: 0.22, p: 3.5 }].slice(0, planes).map((F, i) => {
        const wob = Math.sin(lf * (0.3 + i * 0.09) + F.p) * (6 - i * 0.8);
        const hh = h * F.s * (0.86 + Math.abs(Math.sin(lf * 0.21 + F.p)) * 0.26);
        return <div key={i} style={{ position: "absolute", left: (w - w * F.s) / 2 + wob, top: h - hh, width: w * F.s, height: hh, background: `linear-gradient(180deg, ${F.c} 0%, ${F.c} 58%, rgba(255,240,200,0.85) 100%)`, clipPath: "polygon(50% 0%, 76% 32%, 100% 64%, 86% 100%, 14% 100%, 0% 64%, 24% 32%)", filter: "blur(0.4px)" }} />;
      })}
    </div>
  );

  // cast shadows: thrown by the flame column at (150,400)
  const cast = (k: string, x: number, y: number, wide: number) => {
    const ang = Math.atan2(y - 430, x - 150) / D;
    const len = 66 + keyI * 62 + Math.abs(x - 150) * 0.16;
    return <div key={k} style={{ position: "absolute", left: x, top: y - 10, width: len, height: 20 * wide, borderRadius: "50%", background: "rgba(6,4,10,0.5)", filter: "blur(6px)", transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, zIndex: 7 }} />;
  };

  // the forearm bridging a nub to the tagger's grip.
  const arm = (k: string, ax: number, ay: number, bx: number, by: number, c: string, w: number) => {
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 8) return null;
    return <div key={k} style={{ position: "absolute", left: ax, top: ay - w / 2, width: len, height: w, borderRadius: w / 2, background: c, border: "1.5px solid rgba(0,0,0,0.3)", transformOrigin: "0% 50%", transform: `rotate(${Math.atan2(by - ay, bx - ax) / D}deg)`, zIndex: 21, boxShadow: "0 4px 9px rgba(0,0,0,0.45)" }} />;
  };

  // ===================== THE COUNTERFEIT PASS =====================
  const Stick = (k: string, x: number, y: number, r: number, a: number, s: number, curl = 0) => {
    if (lf < a) return null;
    const p = over(lf, a, 6, Easing.out(Easing.back(2.6)));
    const sc = interpolate(p, [0, 1], [1.7, 1], cl);
    const rr = seed(a * 1.7 + 5);
    const W = 84 * s, H = 66 * s;
    return (
      <div key={k} style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H, transform: `rotate(${r}deg) scale(${sc})`, transformOrigin: "50% 50%", opacity: Math.min(1, p * 2.6) }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, borderRadius: 7 * s, background: `linear-gradient(148deg, #C2D055, ${FAKE} 46%, #7E8C30)`, border: `${2 * s}px solid rgba(52,60,16,0.55)`, boxShadow: `0 ${9 * s}px ${18 * s}px rgba(0,0,0,0.55), inset 0 ${2 * s}px 0 rgba(255,255,210,0.45)`, overflow: "hidden" }}>
          {[[-5, 14], [-5, 44], [78, 14], [78, 44], [18, -5], [58, -5], [18, 60], [58, 60]].map((q, i) => (
            <div key={i} style={{ position: "absolute", left: q[0] * s, top: q[1] * s, width: 11 * s, height: 11 * s, borderRadius: "50%", background: "rgba(8,10,6,0.5)" }} />
          ))}
          <div style={{ position: "absolute", left: 0, top: 15 * s, width: W, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27 * s, lineHeight: 1, color: "#232B08", letterSpacing: "-0.02em", textShadow: `0 ${1.4 * s}px 0 rgba(255,255,215,0.4)`, transform: `rotate(${-2.5 - rr * 3}deg)` }}>DONE</div>
          {Array.from({ length: 11 }).map((_, i) => <div key={"h" + i} style={{ position: "absolute", left: (8 + i * 6) * s, top: 48 * s, width: (1.6 + seed(i + a) * 2.4) * s, height: 3 * s, background: "rgba(30,36,10,0.62)" }} />)}
          {Array.from({ length: 7 }).map((_, i) => {
            const ang = (-78 + i * 26) * D;
            return <div key={"m" + i} style={{ position: "absolute", left: (12 + Math.cos(ang) * 8.4) * s, top: (10 + Math.sin(ang) * 8.4) * s, width: 3 * s, height: 3 * s, borderRadius: "50%", background: "rgba(12,16,4,0.7)" }} />;
          })}
          <div style={{ position: "absolute", left: 62 * s, top: 5 * s, width: 15 * s, height: 15 * s, borderRadius: "50%", border: `${1.5 * s}px solid rgba(28,34,10,0.6)` }}>
            {Array.from({ length: 8 }).map((_, i) => <div key={"r" + i} style={{ position: "absolute", left: 5.5 * s, top: -1 * s, width: 2 * s, height: 14 * s, background: "rgba(28,34,10,0.3)", transformOrigin: "50% 50%", transform: `rotate(${i * 22.5}deg)` }} />)}
          </div>
          <div style={{ position: "absolute", left: (-10 + rr * 34) * s, top: 22 * s, width: 66 * s, height: 18 * s, background: "linear-gradient(90deg, rgba(18,24,6,0.34), transparent)", transform: `rotate(${rr * 22 - 11}deg)`, filter: `blur(${1.6 * s}px)` }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, boxShadow: `inset 0 0 ${13 * s}px rgba(28,36,8,0.45)` }} />
        </div>
        {curl > 0 && (
          <div style={{ position: "absolute", left: W - 26 * s, top: -3 * s, width: 28 * s, height: 24 * s, borderRadius: `0 ${6 * s}px 0 ${14 * s}px`, background: "linear-gradient(210deg,#F2EEDC,#B9B49A)", border: `${1.5 * s}px solid rgba(60,66,30,0.4)`, transform: `rotate(${8 + curl * 16}deg)`, boxShadow: `0 ${4 * s}px ${8 * s}px rgba(0,0,0,0.5)` }} />
        )}
      </div>
    );
  };

  // the hero-shaped liner: the peel's receipt.
  const Liner = ({ o }: { o: number }) => (
    <svg viewBox="0 0 200 200" width={168} height={168} shapeRendering="crispEdges" style={{ opacity: o }}>
      <defs><linearGradient id="lnr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBFAF4" /><stop offset="0.5" stopColor="#DCD9CC" /><stop offset="1" stopColor="#F4F2E8" /></linearGradient></defs>
      <g fill="url(#lnr)" stroke="rgba(120,116,100,0.5)" strokeWidth={2}>
        <rect x={8} y={86} width={26} height={26} /><rect x={166} y={86} width={26} height={26} />
        <rect x={34} y={44} width={132} height={102} />
        <rect x={52} y={146} width={17} height={38} /><rect x={77} y={146} width={17} height={38} />
        <rect x={124} y={146} width={17} height={38} /><rect x={149} y={146} width={17} height={38} />
      </g>
      <rect x={34} y={44} width={132} height={9} fill="rgba(255,255,255,0.85)" />
    </svg>
  );

  // ===================== legacy row knobs (kept so nothing is undefined) =====================
  const ROW = [
    { cx: 740, cy: 478, w: 300 },
    { cx: 872, cy: 434, w: 176 },
    { cx: 950, cy: 412, w: 118 },
    { cx: 996, cy: 398, w: 88 },
  ];
  const FOLD = [108, 118, 130, 144];
  const HIT = [106, 114, 126, 140];
  const rowLift = ramp(lf, 100, 154);
  const TAGH = [[700, 300, 26], [790, 296, 22], [860, 292, 18], [912, 288, 15]];
  const TAGDROP = [112, 122, 134, 9999];
  const TAGLAND: number[][] = [[640, 602, 116], [836, 554, 126], [924, 520, 138]];

  // ===================== POLISH PASS: a restrained rig, and one clean staged read =====================
  // Foreground (left): the villain stamps DONE on the burning wreck.
  // Behind him (right): the cars he "passed" LAST WEEK detonate, one after another.
  const sPush = interpolate(lf, [0, 154], [1.0, 1.055], { ...cl, easing: Easing.inOut(Easing.quad) });
  const sX = Math.sin(lf * 0.028) * 5 + kick * 1.6 - pulse(133, 8) * 8;
  const sY = Math.cos(lf * 0.041) * 3 + pulse(133, 8) * 3;
  const BOOM = [108, 124, 140];
  const CARS = [
    { cx: 704, cy: 500, w: 240 },
    { cx: 862, cy: 460, w: 168 },
    { cx: 968, cy: 436, w: 120 },
  ];

  // ===================== RECESSIVE NIGHT-FORECOURT sprite helpers (dim, cool, slow) =====================
  const cool = (f: number, sp: number, ph: number) => 0.5 + 0.5 * Math.sin(f * sp + ph);
  const bWindows = (x0: number, y0: number, cols: number, rows: number, gxs: number, gys: number, ws: number, hs: number, warm: boolean) =>
    Array.from({ length: cols * rows }).map((_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      const r = seed(i * 1.7 + x0 * 0.013 + y0 * 0.007);
      const on = r > 0.44;
      const fl = 0.55 + 0.45 * Math.abs(Math.sin(lf * (0.02 + r * 0.05) + i));
      const c = warm ? `rgba(214,168,98,${(on ? 0.5 : 0.07) * fl})` : `rgba(150,176,210,${(on ? 0.4 : 0.06) * fl})`;
      return <div key={"bw" + x0.toFixed(0) + i} style={{ position: "absolute", left: x0 + cx * gxs, top: y0 + cy * gys, width: ws, height: hs, background: c, boxShadow: on ? `0 0 ${4 * fl}px ${c}` : "none" }} />;
    });
  const pump = (k: string, x: number, y: number, s: number) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: 36 * s, height: 66 * s }}>
      <div style={{ position: "absolute", left: 2 * s, top: 8 * s, width: 32 * s, height: 58 * s, borderRadius: 4, background: "linear-gradient(100deg,#3A465F,#1E2740)", border: "1.5px solid #46567A" }} />
      <div style={{ position: "absolute", left: 7 * s, top: 14 * s, width: 22 * s, height: 16 * s, borderRadius: 2, background: `rgba(120,200,180,${0.34 + cool(lf, 0.1, x * 0.02) * 0.26})`, boxShadow: "0 0 6px rgba(80,180,160,0.4)" }} />
      <div style={{ position: "absolute", left: 9 * s, top: 36 * s, width: 18 * s, height: 3 * s, background: "rgba(120,150,200,0.28)" }} />
      <div style={{ position: "absolute", left: 9 * s, top: 42 * s, width: 12 * s, height: 3 * s, background: "rgba(120,150,200,0.2)" }} />
      <div style={{ position: "absolute", left: 31 * s, top: 20 * s, width: 4 * s, height: 30 * s, borderRadius: 2, background: "#11172A" }} />
    </div>
  );
  const cone = (k: string, x: number, y: number, s: number) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: 24 * s, height: 30 * s }}>
      <div style={{ position: "absolute", left: 0, top: 26 * s, width: 24 * s, height: 6 * s, borderRadius: 2, background: "#6E381E" }} />
      <div style={{ position: "absolute", left: 6 * s, top: 0, width: 12 * s, height: 28 * s, background: "linear-gradient(180deg,#B4531E,#6E2E10)", clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)" }} />
      <div style={{ position: "absolute", left: 5 * s, top: 12 * s, width: 14 * s, height: 5 * s, background: "rgba(236,230,220,0.62)", clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)" }} />
    </div>
  );
  const drum = (k: string, x: number, y: number, s: number) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: 40 * s, height: 58 * s }}>
      <div style={{ position: "absolute", left: 0, top: 5 * s, width: 40 * s, height: 52 * s, borderRadius: "6px 6px 4px 4px", background: "linear-gradient(100deg,#3A465F,#1B2336)", border: "1.5px solid #46567A" }} />
      <div style={{ position: "absolute", left: 0, top: 2 * s, width: 40 * s, height: 9 * s, borderRadius: "50%", background: "#46567A" }} />
      {[18, 32, 44].map((yy, j) => <div key={j} style={{ position: "absolute", left: 0, top: yy * s, width: 40 * s, height: 2 * s, background: "rgba(18,24,40,0.6)" }} />)}
    </div>
  );
  const tyres = (k: string, x: number, y: number, s: number, n: number) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: 64 * s, height: (n * 17 + 6) * s }}>
      {Array.from({ length: n }).map((_, j) => (
        <div key={j} style={{ position: "absolute", left: 0, top: (n - 1 - j) * 17 * s, width: 64 * s, height: 24 * s, borderRadius: "50% / 42%", background: "radial-gradient(ellipse at 50% 40%, #2A2E3A 40%, #14161F 72%)", border: "2px solid #0D0F16" }}>
          <div style={{ position: "absolute", left: 18 * s, top: 6 * s, width: 28 * s, height: 12 * s, borderRadius: "50%", background: "#39404F" }} />
        </div>
      ))}
    </div>
  );

  return (
    <Panel label="jiffy-loob">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${sX}px, ${sY}px) scale(${sPush})`, transformOrigin: "506px 470px" }}>

          {/* ============ BACKDROP: calm sodium night, one soft strip-mall band ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "linear-gradient(180deg,#0B0E1C 0%,#141828 44%,#241C26 74%,#2A2028 100%)" }} />
          <div style={{ position: "absolute", left: -20, top: 150, width: 1052, height: 300, background: "linear-gradient(180deg,#1B1826,#120F1B)", filter: "blur(3px)", opacity: 0.9 }} />
          <div style={{ position: "absolute", left: 0, top: 430, width: 1012, height: 362, background: "linear-gradient(180deg,#281F27 0%,#332630 46%,#2C2028 100%)" }} />
          {Array.from({ length: 10 }).map((_, i) => {
            const r = seed(i * 3.7 + 5);
            return <div key={"st" + i} style={{ position: "absolute", left: 60 + r * 900, top: 40 + seed(i * 2.1) * 90, width: 2, height: 2, borderRadius: "50%", background: "rgba(210,224,255,0.5)", opacity: 0.3 + r * 0.3 }} />;
          })}

          {/* ============ RECESSIVE NIGHT FORECOURT: a dim, cool, softly-blurred, slow tier that fills the dark behind the fire ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 1, pointerEvents: "none", filter: "saturate(0.72) brightness(0.84)" }}>

            {/* -- far city skyline: coolest, heaviest blur, faint parallax sway -- */}
            <div style={{ position: "absolute", left: -10, top: 44, width: 1032, height: 214, filter: "blur(3.6px)", opacity: 0.72 }}>
              <div style={{ position: "absolute", left: -10, top: 176, width: 1032, height: 82, background: "linear-gradient(180deg,#1E2740,#141A2C)" }} />
              {[[10, 150, 80, 104], [104, 120, 66, 134], [184, 158, 116, 96], [318, 96, 58, 158], [392, 150, 150, 104], [556, 120, 78, 134], [650, 166, 168, 88], [840, 108, 74, 146], [930, 150, 92, 104]].map((b, i) => {
                const sway = Math.sin(lf * 0.012 + i) * 1.1;
                return (
                  <div key={"sk" + i} style={{ position: "absolute", left: b[0] + sway, top: b[1], width: b[2], height: b[3], background: "linear-gradient(180deg,#27324C,#191F32)", borderTop: "1px solid rgba(120,150,200,0.18)" }}>
                    {bWindows(6, 8, Math.max(2, Math.floor(b[2] / 16)), Math.max(2, Math.floor(b[3] / 20)), 15, 18, 6, 8, false)}
                  </div>
                );
              })}
            </div>

            {/* -- festoon bunting strung across the yard, a shallow catenary that sways -- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 260, filter: "blur(0.8px)", opacity: 0.55 }}>
              {Array.from({ length: 26 }).map((_, i) => {
                const t = i / 25;
                const bx = 34 + t * 942;
                const by = 116 + Math.sin(t * Math.PI) * 40 + Math.sin(lf * 0.045 + i * 0.5) * 2;
                const cols = ["#3E5075", "#5A4A6A", "#46605C", "#6A5A46"];
                return (
                  <React.Fragment key={"bt" + i}>
                    <div style={{ position: "absolute", left: bx, top: by - 3, width: 2, height: 5, background: "rgba(120,140,180,0.4)" }} />
                    <div style={{ position: "absolute", left: bx - 7, top: by, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `14px solid ${cols[i % 4]}`, transform: `rotate(${Math.sin(lf * 0.05 + i) * 4}deg)`, transformOrigin: "50% 0%" }} />
                  </React.Fragment>
                );
              })}
            </div>

            {/* -- JIFFY LOOB service-station facade: fascia sign, cladding, lit office + cameo, open bays, half-shut shutter -- */}
            <div style={{ position: "absolute", left: 0, top: 196, width: 1012, height: 254, filter: "blur(1.8px)", opacity: 0.92 }}>
              <div style={{ position: "absolute", left: -10, top: 40, width: 1032, height: 214, background: "linear-gradient(180deg,#232C42 0%,#1B2236 62%,#161C2C 100%)", borderTop: "3px solid #33425F" }} />
              {[74, 108, 142, 176, 210].map((y, i) => <div key={"cl" + i} style={{ position: "absolute", left: 0, top: y, width: 1012, height: 1, background: "rgba(96,116,156,0.12)" }} />)}
              {/* fascia sign band */}
              <div style={{ position: "absolute", left: 0, top: 6, width: 1012, height: 34, background: "linear-gradient(180deg,#2C3852,#1D2640)", borderTop: "2px solid #3E5075", borderBottom: "2px solid #11172A" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 1012, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: 7, lineHeight: "34px", color: `rgba(122,198,216,${0.46 + cool(lf, 0.09, 0) * 0.26})`, textShadow: "0 0 12px rgba(70,150,180,0.5)" }}>JIFFY LOOB</div>
              </div>
              {/* open service bays with lifts + a dim slate car up on the ramp */}
              {[62, 196].map((bx, i) => (
                <div key={"bay" + i} style={{ position: "absolute", left: bx, top: 102, width: 120, height: 124, background: "linear-gradient(180deg,#0C1220,#05080F)", border: "2px solid #2A3650", boxShadow: "inset 0 0 26px rgba(0,0,0,0.85)" }}>
                  <div style={{ position: "absolute", left: 54, top: 12, width: 12, height: 100, background: "#1E2742" }} />
                  <div style={{ position: "absolute", left: 22, top: 30 + Math.sin(lf * 0.02 + i) * 2, width: 76, height: 8, borderRadius: 2, background: "#26314C" }} />
                  <div style={{ position: "absolute", left: 20, top: 14 + Math.sin(lf * 0.02 + i) * 2, width: 80, height: 18, borderRadius: "8px 8px 3px 3px", background: "linear-gradient(100deg,#33405C,#1A2338)" }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 120, height: 124, background: `radial-gradient(ellipse at 50% 42%, rgba(150,176,210,${0.1 + cool(lf, 0.04, i) * 0.05}), transparent 62%)` }} />
                </div>
              ))}
              {/* half-shut roller shutter on a third bay */}
              <div style={{ position: "absolute", left: 810, top: 102, width: 130, height: 124, background: "linear-gradient(180deg,#0B111E,#05080F)", border: "2px solid #2A3650", overflow: "hidden" }}>
                {Array.from({ length: 7 }).map((_, j) => <div key={"sh" + j} style={{ position: "absolute", left: 0, top: j * 9, width: 130, height: 7, background: j % 2 ? "#232C42" : "#2C3750", borderBottom: "1px solid rgba(10,14,24,0.7)" }} />)}
                <div style={{ position: "absolute", left: 8, top: 66, width: 114, height: 4, borderRadius: 2, background: "#3E4C6C" }} />
              </div>
              {/* the lit office glazing with a cameo sprite watching from inside */}
              <div style={{ position: "absolute", left: 372, top: 148, width: 158, height: 80, background: "#0D1424", border: "2px solid #38486A" }}>
                {bWindows(8, 8, 4, 3, 38, 22, 32, 16, true)}
                <div style={{ position: "absolute", left: 62 + Math.sin(lf * 0.03) * 4, top: 42, width: 24, height: 26 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: 24, height: 22, borderRadius: "7px 7px 4px 4px", background: "#4C566C" }} />
                  <div style={{ position: "absolute", left: 4, top: 8, width: 4, height: 5, background: "#0E1220" }} />
                  <div style={{ position: "absolute", left: 14, top: 8, width: 4, height: 5, background: "#0E1220" }} />
                </div>
              </div>
              {/* a wall clock + a stray pegboard hint to echo the workshop */}
              <div style={{ position: "absolute", left: 636, top: 150, width: 30, height: 30, borderRadius: "50%", background: "#141B2C", border: "2px solid #3A486A" }}>
                <div style={{ position: "absolute", left: 13, top: 5, width: 2, height: 10, background: "#8FA6C6", transformOrigin: "50% 100%", transform: `rotate(${lf * 1.1}deg)` }} />
                <div style={{ position: "absolute", left: 13, top: 8, width: 2, height: 7, background: "#6E82A2", transformOrigin: "50% 100%", transform: `rotate(${lf * 0.09}deg)` }} />
              </div>
            </div>

            {/* -- forecourt canopy over a fuel-pump island, cool under-light -- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: "blur(1.4px)", opacity: 0.9 }}>
              <div style={{ position: "absolute", left: 300, top: 300, width: 268, height: 18, borderRadius: 3, background: "linear-gradient(180deg,#33425F,#1E2740)", boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", left: 300, top: 318, width: 268, height: 6, background: "rgba(120,196,214,0.14)" }} />
              <div style={{ position: "absolute", left: 306, top: 322, width: 10, height: 130, background: "linear-gradient(180deg,#39455E,#181F30)" }} />
              <div style={{ position: "absolute", left: 552, top: 322, width: 10, height: 130, background: "linear-gradient(180deg,#39455E,#181F30)" }} />
              <div style={{ position: "absolute", left: 300, top: 324, width: 268, height: 150, background: `radial-gradient(ellipse at 50% 0%, rgba(150,196,214,${0.08 + cool(lf, 0.05, 1) * 0.05}), transparent 70%)`, mixBlendMode: "screen" }} />
              {pump("pmp0", 360, 382, 1.05)}
              {pump("pmp1", 470, 382, 1.05)}
              <div style={{ position: "absolute", left: 336, top: 448, width: 214, height: 10, borderRadius: 4, background: "linear-gradient(180deg,#2A3450,#151C2C)" }} />
            </div>

            {/* -- price pylon on the far left, rim-lit by the nearby fire -- */}
            <div style={{ position: "absolute", left: 22, top: 150, width: 56, height: 210, filter: "blur(1.3px)", opacity: 0.9 }}>
              <div style={{ position: "absolute", left: 24, top: 44, width: 8, height: 166, background: "linear-gradient(180deg,#39455E,#1A2233)" }} />
              <div style={{ position: "absolute", left: 0, top: 38, width: 56, height: 66, borderRadius: 5, background: "linear-gradient(180deg,#26324C,#151D2E)", border: "2px solid #3E5075", boxShadow: `inset 6px 0 12px rgba(255,140,60,${keyI * 0.14})` }}>
                <div style={{ position: "absolute", left: 0, top: 6, width: 56, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: `rgba(122,198,216,${0.48 + cool(lf, 0.08, 1) * 0.28})` }}>LOOB</div>
                <div style={{ position: "absolute", left: 9, top: 30, width: 38, height: 26, borderRadius: 2, background: "#090E1A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 15, letterSpacing: 1, color: `rgba(255,178,88,${0.55 + cool(lf, 0.22, 3) * 0.3})` }}>199</div>
              </div>
            </div>

            {/* -- sodium forecourt lamps on the two sides, volumetric cones fill the upper dark -- */}
            {[118, 892].map((lx, i) => {
              const fl = 0.7 + cool(lf, 0.05 + i * 0.012, i * 2.1) * 0.3;
              return (
                <React.Fragment key={"lamp" + i}>
                  <div style={{ position: "absolute", left: lx - 3, top: 150, width: 6, height: 188, background: "linear-gradient(180deg,#3A465F,#1B2334)", filter: "blur(0.8px)" }} />
                  <div style={{ position: "absolute", left: lx - 22, top: 142, width: 44, height: 14, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(180deg,#4A5876,#232D44)", filter: "blur(0.8px)" }} />
                  <div style={{ position: "absolute", left: lx - 14, top: 152, width: 28, height: 6, borderRadius: 3, background: `rgba(255,214,150,${0.7 * fl})`, boxShadow: `0 0 16px rgba(255,196,120,${0.8 * fl})` }} />
                  <div style={{ position: "absolute", left: lx - 96, top: 156, width: 192, height: 268, background: `linear-gradient(180deg, rgba(255,206,140,${0.15 * fl}) 0%, rgba(255,196,120,${0.05 * fl}) 46%, transparent 88%)`, clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", filter: "blur(3px)", pointerEvents: "none" }} />
                </React.Fragment>
              );
            })}

            {/* -- chain-link boundary + air/water station, far right -- */}
            <div style={{ position: "absolute", left: 946, top: 300, width: 66, height: 180, filter: "blur(1px)", opacity: 0.82 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 66, height: 180, backgroundImage: "repeating-linear-gradient(45deg, rgba(150,170,200,0.16) 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, rgba(150,170,200,0.16) 0 1px, transparent 1px 12px)" }} />
              <div style={{ position: "absolute", left: 4, top: 0, width: 3, height: 180, background: "#2E3A54" }} />
              <div style={{ position: "absolute", left: 40, top: 0, width: 3, height: 180, background: "#2E3A54" }} />
              <div style={{ position: "absolute", left: 0, top: 2, width: 66, height: 3, background: "#38466A" }} />
            </div>
            <div style={{ position: "absolute", left: 870, top: 376, width: 30, height: 92, filter: "blur(1px)", opacity: 0.85 }}>
              <div style={{ position: "absolute", left: 12, top: 40, width: 6, height: 52, background: "linear-gradient(180deg,#39455E,#1A2233)" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 30, height: 44, borderRadius: 4, background: "linear-gradient(180deg,#2A3450,#161E30)", border: "1.5px solid #3E5075" }}>
                <div style={{ position: "absolute", left: 6, top: 6, width: 18, height: 8, borderRadius: 2, background: `rgba(120,196,214,${0.36 + cool(lf, 0.12, 2) * 0.24})` }} />
                <div style={{ position: "absolute", left: 6, top: 20, width: 18, height: 3, background: "rgba(120,150,200,0.3)" }} />
                <div style={{ position: "absolute", left: 6, top: 27, width: 12, height: 3, background: "rgba(120,150,200,0.22)" }} />
              </div>
            </div>

            {/* -- forecourt floor: faint road paint, a directional arrow, cones, drums and tyre stacks at the edges -- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: "blur(0.7px)", opacity: 0.9 }}>
              <div style={{ position: "absolute", left: 430, top: 512, width: 150, height: 64, transform: "perspective(320px) rotateX(58deg)", transformOrigin: "50% 100%", opacity: 0.5 }}>
                <div style={{ position: "absolute", left: 66, top: 0, width: 14, height: 44, background: "rgba(190,200,220,0.3)" }} />
                <div style={{ position: "absolute", left: 50, top: 34, width: 46, height: 14, background: "rgba(190,200,220,0.3)", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              </div>
              {[860, 902, 944].map((hx2, j) => <div key={"hz" + j} style={{ position: "absolute", left: hx2, top: 556 + j * 6, width: 60, height: 4, background: "rgba(180,190,210,0.16)", transform: "skewX(-42deg)" }} />)}
              <div style={{ position: "absolute", left: 560, top: 604, width: 380, height: 4, background: "rgba(180,190,210,0.12)", transform: "perspective(300px) rotateX(60deg)" }} />
              {cone("cn0", 372, 588, 0.92)}
              {cone("cn1", 812, 566, 0.82)}
              {cone("cn2", 158, 616, 1.0)}
              {drum("dr0", 924, 560, 1.05)}
              {drum("dr1", 966, 572, 0.92)}
              {tyres("ty0", 2, 588, 0.86, 4)}
              {tyres("ty1", 962, 626, 0.72, 3)}
            </div>

            {/* -- cool drifting night haze, slow -- */}
            {Array.from({ length: 5 }).map((_, i) => {
              const r = seed(i * 4.2 + 11);
              const t = ((lf * (0.5 + r * 0.6) + r * 300) % 300) / 300;
              return <div key={"nh" + i} style={{ position: "absolute", left: -120 + t * 1120, top: 250 + r * 170, width: 340 + r * 200, height: 120, borderRadius: "50%", background: "rgba(120,140,180,0.05)", filter: "blur(22px)" }} />;
            })}

            {/* -- the fire spills a little warm reflection onto the near forecourt (keeps the recessive tier bound to the key light) -- */}
            <div style={{ position: "absolute", left: -40, top: 300, width: 540, height: 200, background: `radial-gradient(ellipse at 28% 100%, rgba(255,140,60,${0.05 + keyI * 0.1}), transparent 68%)`, mixBlendMode: "screen", filter: "blur(12px)" }} />
          </div>

          {/* ============ THE ONE HEADER: LAST WEEK, readable, above the row ============ */}
          <div style={{ position: "absolute", left: 690, top: 152, width: 250, height: 11, borderRadius: 3, background: grad("#463F4E", "#221D28"), boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }} />
          {[700, 924].map((lx, i) => <div key={"gl" + i} style={{ position: "absolute", left: lx, top: 162, width: 8, height: 40, background: grad("#3C3644", "#1C1824") }} />)}
          <div style={{ position: "absolute", left: 706, top: 198, width: 218, height: 52, borderRadius: 7, background: grad("#2E2A36", "#1A1622"), border: "2px solid rgba(255,214,150,0.28)", boxShadow: "0 14px 24px rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 24, letterSpacing: 5, fontWeight: 700, color: "rgba(255,216,152,0.92)", transform: `rotate(${Math.sin(lf * 0.05) * 0.7}deg)`, transformOrigin: "109px -34px" }}>LAST WEEK</div>

          {/* ============ FOCAL VIGNETTE: keeps a wide central band lit, darkens the empty top and floor ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 680px 320px at 506px 486px, transparent 0%, transparent 52%, rgba(8,6,12,0.62) 100%)" }} />

          {/* ============ THE LAST WEEK ROW: clear, dramatic, one-by-one detonation ============ */}
          {/* a warm wash so the row reads as the second focal beat, never buried in the dark */}
          <div style={{ position: "absolute", left: 560, top: 300, width: 470, height: 360, zIndex: 3, background: "radial-gradient(ellipse at 50% 62%, rgba(255,170,80,0.15), transparent 70%)", mixBlendMode: "screen", pointerEvents: "none" }} />
          {CARS.map((car, i) => {
            const T = BOOM[i];
            const age = lf - T;
            const flash = age >= 0 ? Math.max(0, 1 - age / 5) : 0;
            const ball = age >= 0 ? Math.max(0, 1 - age / 18) : 0;
            const ballR = age >= 0 ? Math.min(1, age / 9) : 0;
            const rawc = age >= 0 ? Math.min(1, age / 15) : 0;
            const collapse = rawc * rawc * (3 - 2 * rawc);
            const burning = age >= 4 ? Math.min(1, (age - 4) / 12) : 0;
            const bob = age < 0 ? Math.sin(lf * 0.05 + i * 1.7) * 2 : 0;
            const w = car.w, h = w * 0.46;
            const left = car.cx - w / 2, top = car.cy - h + bob;
            const blur = 0.4 + i * 0.7;
            const tilt = collapse * (i % 2 === 0 ? 4 : -3.4);
            return (
              <div key={"car" + i} style={{ position: "absolute", left, top, width: w, height: h * 1.5, zIndex: 4 - i, filter: `blur(${blur}px)` }}>
                {/* ground shadow */}
                <div style={{ position: "absolute", left: -6, top: h - 4, width: w + 12, height: 16, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(6px)" }} />
                {/* the car body, collapsing on detonation */}
                <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "50% 100%", transform: `translateY(${collapse * h * 0.14}px) scaleY(${1 - collapse * 0.4}) rotate(${tilt}deg)` }}>
                  {/* cabin / greenhouse: caves first */}
                  <div style={{ position: "absolute", left: w * 0.24, top: 0, width: w * 0.5, height: h * 0.5, borderRadius: "14px 20px 0 0", background: "linear-gradient(100deg,#C6C1B2,#6E6A60)", border: "1.5px solid rgba(255,240,210,0.16)", transformOrigin: "50% 100%", transform: `scaleY(${1 - collapse * 0.82}) skewX(-6deg)` }}>
                    <div style={{ position: "absolute", left: w * 0.05, top: h * 0.08, width: w * 0.34, height: h * 0.3, borderRadius: 3, background: "linear-gradient(150deg,#22314B,#0F1725)", border: "1px solid rgba(180,205,245,0.2)", overflow: "hidden" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: `radial-gradient(ellipse at 20% 90%, rgba(255,150,60,${0.28 + burning * 0.45}), transparent 60%)` }} />
                    </div>
                  </div>
                  {/* lower body, warm-rimmed from the fire on the left */}
                  <div style={{ position: "absolute", left: 0, top: h * 0.42, width: w, height: h * 0.5, borderRadius: "16px 12px 8px 8px", background: "linear-gradient(96deg,#D6D0C0 0%,#A7A190 40%,#4E4A40 100%)", border: "1.5px solid rgba(255,240,210,0.18)", boxShadow: "inset 3px 0 0 rgba(255,176,90,0.35), 0 10px 18px rgba(0,0,0,0.5)" }} />
                  {/* the fake DONE pass it was already wearing (chars off as it burns) */}
                  <div style={{ position: "absolute", left: w * 0.14, top: h * 0.5, width: w * 0.22, height: w * 0.155, borderRadius: 4, background: `linear-gradient(150deg,#C2D055,${FAKE} 55%,#7E8C30)`, border: "1px solid rgba(52,60,16,0.4)", opacity: (age < 6 ? 1 : Math.max(0, 1 - (age - 6) / 8)) * 0.9, transform: "rotate(-7deg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: w * 0.058, color: "rgba(35,43,8,0.78)" }}>DONE</div>
                  {/* wheels */}
                  {[[0.16, 0.88], [0.66, 0.88]].map((wp, k) => (
                    <div key={"w" + k} style={{ position: "absolute", left: w * wp[0], top: h * wp[1], width: w * 0.15, height: w * 0.15, borderRadius: "50%", background: "#161420", border: `${w * 0.032}px solid #34303C` }} />
                  ))}
                </div>

                {/* aftermath flame licking off the collapsed shell */}
                {burning > 0 && flame("cf" + i, w * 0.2, h * 0.45 - h * 0.92 * burning, w * 0.6, h * 0.92 * burning, Math.min(1, burning * 1.4), 5)}

                {/* the fireball */}
                {ball > 0 && (
                  <div style={{ position: "absolute", left: w * 0.5 - w * 0.75 * (0.3 + ballR), top: h * 0.4 - w * 0.75 * (0.3 + ballR), width: w * 1.5 * (0.3 + ballR), height: w * 1.5 * (0.3 + ballR), borderRadius: "50%", background: `radial-gradient(circle, rgba(255,248,220,${ball}) 0%, rgba(255,196,80,${ball}) 24%, rgba(240,120,30,${ball * 0.9}) 52%, rgba(150,40,12,${ball * 0.5}) 74%, transparent 82%)`, mixBlendMode: "screen", filter: "blur(2px)", zIndex: 12 }} />
                )}
                {/* the white flash at the instant of detonation */}
                {flash > 0 && (
                  <div style={{ position: "absolute", left: w * 0.5 - w, top: h * 0.4 - w, width: w * 2, height: w * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,240,${flash * 0.9}), rgba(255,220,150,${flash * 0.4}) 40%, transparent 66%)`, mixBlendMode: "screen", zIndex: 13 }} />
                )}
                {/* debris shards flung out on a gravity arc */}
                {age >= 0 && age < 30 && Array.from({ length: 7 }).map((_, k) => {
                  const rr = seed(i * 9 + k * 3.3 + 2);
                  const ang = rr * 6.283;
                  const spd = 2.4 + rr * 4;
                  const dx = Math.cos(ang) * spd * age;
                  const dy = Math.sin(ang) * spd * age * 0.7 + 0.16 * age * age;
                  const dop = Math.max(0, 1 - age / 30);
                  return <div key={"db" + k} style={{ position: "absolute", left: w * 0.5 + dx, top: h * 0.4 + dy, width: 4 + rr * 6, height: 3 + rr * 4, borderRadius: 1, background: rr > 0.5 ? "#2A241E" : "#FF9A3C", opacity: dop, boxShadow: rr > 0.5 ? "none" : "0 0 6px rgba(255,150,60,0.85)", transform: `rotate(${age * (10 + rr * 20)}deg)`, zIndex: 12 }} />;
                })}
                {/* black smoke boiling up after the blast */}
                {age >= 2 && age < 60 && Array.from({ length: 5 }).map((_, k) => {
                  const rr = seed(i * 5 + k * 2.1 + 3);
                  const t = (age - 2 + k * 4) / 58;
                  if (t < 0 || t > 1) return null;
                  const sz = 30 + rr * 40 + t * 90;
                  return <div key={"sk" + k} style={{ position: "absolute", left: w * 0.5 - sz / 2 + (rr - 0.5) * 30 - t * 20, top: h * 0.3 - t * (120 + rr * 80), width: sz, height: sz, borderRadius: "50%", background: `rgba(${40 + Math.floor(rr * 20)},${34 + Math.floor(rr * 16)},34,0.5)`, filter: "blur(9px)", opacity: (1 - t) * 0.6, zIndex: 6 }} />;
                })}
              </div>
            );
          })}

          {/* ============ FOREGROUND WRECK (unit 04): the broken thing being certified DONE ============ */}
          {cast("cw", 190, 596, 1.5)}
          <div style={{ position: "absolute", left: 34, top: 578, width: 320, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.62)", filter: "blur(10px)", zIndex: 8 }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 9, filter: `brightness(${1 - scrim * 0.5})` }}>
            {/* body + nose + rocker */}
            <div style={{ position: "absolute", left: 44, top: 462, width: 288, height: 120, borderRadius: "16px 10px 8px 8px", background: "linear-gradient(100deg,#D8D2C2 0%,#A9A392 42%,#4E4A40 100%)", border: "2px solid rgba(255,240,210,0.22)", boxShadow: "0 18px 32px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", left: 40, top: 494, width: 66, height: 62, borderRadius: "12px 3px 3px 10px", background: "linear-gradient(100deg,#DCD6C6,#8C8676)", border: "2px solid rgba(255,240,210,0.2)" }} />
            <div style={{ position: "absolute", left: 36, top: 540, width: 74, height: 15, borderRadius: 5, background: grad("#9A9488", "#43403A"), transform: "rotate(-5deg)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }} />
            {/* greenhouse with the fire reflected in the glass */}
            <div style={{ position: "absolute", left: 168, top: 374, width: 148, height: 96, borderRadius: "18px 12px 0 0", background: "linear-gradient(105deg,#CFC9B8 0%,#8E8878 55%,#4A463C 100%)", border: "2px solid rgba(255,240,210,0.2)", transform: "skewX(-7deg)", boxShadow: "0 12px 22px rgba(0,0,0,0.4)" }}>
              <div style={{ position: "absolute", left: 14, top: 16, width: 116, height: 58, borderRadius: 5, background: grad("#23314A", "#111827"), border: "1.5px solid rgba(180,205,245,0.22)", overflow: "hidden" }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 8 + k * 32, top: -4, width: 2, height: 66, background: "rgba(255,214,150,0.24)", transform: "rotate(13deg)" }} />)}
                <div style={{ position: "absolute", left: 0, top: 0, width: 116, height: 58, background: `radial-gradient(ellipse at 10% 80%, rgba(255,150,60,${0.2 + keyI * 0.28}), transparent 62%)` }} />
              </div>
            </div>
            <div style={{ position: "absolute", left: 48, top: 512, width: 280, height: 4, background: "rgba(255,255,255,0.18)" }} />

            {/* the taped door: held on by crossed gaffer, already broken */}
            <div style={{ position: "absolute", left: 252, top: 462, transformOrigin: "4px 6px", transform: `rotate(${5 + Math.sin(lf * 0.1) * 1.4 + whump * 6 + pulse(86, 22) * 9}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 88, height: 104, borderRadius: "5px 9px 9px 5px", background: "linear-gradient(100deg,#C8C2B0,#565247)", border: "2px solid rgba(255,240,210,0.2)", boxShadow: "0 12px 22px rgba(0,0,0,0.5)" }}>
                <div style={{ position: "absolute", left: 12, top: 44, width: 34, height: 9, borderRadius: 3, background: "rgba(22,26,38,0.5)" }} />
              </div>
              <div style={{ position: "absolute", left: -22, top: 8, width: 76, height: 15, background: "rgba(182,178,162,0.9)", border: "1px solid rgba(255,255,255,0.28)", transform: "rotate(31deg)", boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", left: -22, top: 42, width: 76, height: 15, background: "rgba(182,178,162,0.9)", border: "1px solid rgba(255,255,255,0.28)", transform: "rotate(-31deg)", boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }} />
            </div>

            {/* the bare hub: wheel gone, disc still lazily spinning */}
            <div style={{ position: "absolute", left: 60 - 34, top: 580 - 34, width: 68, height: 68, transform: `scaleX(${0.88 + Math.sin(lf * 0.13) * 0.09}) rotate(${Math.sin(lf * 0.11) * 3}deg)` }}>
              <div style={{ position: "absolute", left: 4, top: 4, width: 60, height: 60, borderRadius: "50%", background: grad("#6E5638", "#291D12"), border: "3px solid rgba(255,190,120,0.2)", boxShadow: "inset 0 3px 10px rgba(0,0,0,0.85)", transform: `rotate(${lf * 2.2}deg)` }}>
                {Array.from({ length: 8 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 28, top: 3, width: 3, height: 54, background: "rgba(20,15,10,0.55)", transformOrigin: "50% 50%", transform: `rotate(${k * 22.5}deg)` }} />)}
                <div style={{ position: "absolute", left: 20, top: 20, width: 20, height: 20, borderRadius: "50%", background: grad("#A99A86", "#4A4238") }} />
              </div>
              {[0, 1, 2, 3, 4].map((k) => <div key={"lug" + k} style={{ position: "absolute", left: 31 + Math.cos((k / 5) * 6.283) * 15, top: 31 + Math.sin((k / 5) * 6.283) * 15, width: 6, height: 6, borderRadius: "50%", background: "#17110B" }} />)}
            </div>
            {/* the one wheel still doing its job */}
            <div style={{ position: "absolute", left: 262, top: 548, width: 64, height: 64, borderRadius: "50%", background: "#161420", border: "7px solid #34303C", boxShadow: "0 10px 18px rgba(0,0,0,0.6)" }}>
              <div style={{ position: "absolute", left: 16, top: 16, width: 18, height: 18, borderRadius: "50%", background: grad("#C4CAD8", "#565E70") }} />
            </div>

            {/* the popped hood + THE MONEY SHOT: a single clean DONE, stamped on the broken thing */}
            <div style={{ position: "absolute", left: 214, top: 448, width: 24, height: 12, borderRadius: 3, background: grad("#8E897D", "#3E3B34"), zIndex: 2 }} />
            <div style={{ position: "absolute", left: 190, top: 326, width: 116, height: 128, transformOrigin: "24px 100%", transform: `rotate(${10 + Math.sin(lf * 0.19) * 2.4 + belch * 9 + whump * 1.4}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 116, height: 128, borderRadius: "14px 16px 3px 3px", background: "linear-gradient(100deg,#DED8C6 0%,#A29C8A 50%,#514D42 100%)", border: "2px solid rgba(255,240,210,0.22)", boxShadow: "0 16px 30px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.35)", transform: "skewX(-4deg)" }}>
                <div style={{ position: "absolute", left: 22, top: 12, width: 5, height: 104, background: "rgba(140,134,120,0.5)" }} />
                <div style={{ position: "absolute", left: 88, top: 12, width: 5, height: 104, background: "rgba(140,134,120,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 116, height: 128, borderRadius: "14px 16px 3px 3px", background: `linear-gradient(20deg, rgba(255,140,50,${0.24 + keyI * 0.3}), transparent 62%)` }} />
              </div>
              <div style={{ position: "absolute", left: 14, top: 116, width: 22, height: 20, borderRadius: 3, background: grad("#9A948A", "#3E3B34"), border: "1px solid rgba(0,0,0,0.35)" }} />
              {Stick("s05", 58, 66, -14, 78, 0.66, ramp(lf, 78, 132))}
            </div>
          </div>

          {/* ============ THE FLAME COLUMN: the key light on the whole left ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 10, pointerEvents: "none" }}>
            {flame("fmain", 94, 400 - 240 * (0.72 + lick * 0.34), 112, 240 * (0.72 + lick * 0.34), 1, 6)}
            {flame("fbay", 58, 442 - 96 * lick, 62, 96 * lick, 0.9, 4)}
            {flame("fbay2", 176, 434 - 78 * lick, 52, 78 * lick, 0.8, 4)}
            {belch > 0.02 && flame("fbelch", 158, 384 - 150 * belch, 128, 150 * belch, belch * 0.95, 5)}
            {tyreFire > 0 && flame("ftyre", 260, 560 - 76 * tyreFire * lick, 74, 76 * tyreFire * lick, Math.min(1, tyreFire * 1.7), 5)}
          </div>
          {belch > 0.05 && Array.from({ length: 11 }).map((_, i) => {
            const r = seed(i * 3.1 + 7); const t = 1 - belch;
            return <div key={"pp" + i} style={{ position: "absolute", left: 226 + Math.cos(r * 6.3) * t * (110 + r * 90), top: 420 + Math.sin(r * 6.3) * t * (80 + r * 60) - t * 44, width: 9 + r * 14, height: 9 + r * 14, borderRadius: "50%", background: r > 0.5 ? "#F0913A" : "#FFE6A2", opacity: belch * 0.85, zIndex: 17 }} />;
          })}
          <div style={{ position: "absolute", left: -40, top: 210, width: 700, height: 560, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,140,50,${0.16 + keyI * 0.2}), transparent 66%)`, filter: "blur(14px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 16 }} />

          {/* ============ THE LINER: the mascot-shaped receipt of the peel ============ */}
          {lf >= 30 && (() => {
            const t = ramp(lf, 30, 40);
            const lxp = 430 + t * 166;
            const lyp = 520 + t * t * 186;
            const landed = lf >= 40;
            const settle = landed ? Math.max(0, 1 - (lf - 40) / 14) : 0;
            return (
              <div style={{ position: "absolute", left: landed ? 596 - 84 : lxp - 84, top: landed ? 706 - 36 : lyp - 84, width: 168, height: 168, zIndex: landed ? 13 : 27, transform: landed ? `rotate(${-7 + settle * 5}deg) scaleY(${0.44 - settle * 0.05})` : `rotate(${t * 40}deg) scaleY(${1 - t * 0.5}) skewX(${Math.sin(lf * 0.7) * 16 * (1 - t)}deg)`, filter: `drop-shadow(0 6px 12px rgba(0,0,0,0.55)) brightness(${0.9 + keyI * 0.4})` }}>
                <Liner o={landed ? 0.92 : 1} />
              </div>
            );
          })()}

          {/* ============ THE HERO: warm, eyes visible, being shoved down and out ============ */}
          <div style={{ position: "absolute", left: hx - 160, top: hy - 150, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,146,86,0.16), transparent 60%)", filter: "blur(20px)", mixBlendMode: "screen", opacity: 1 - fall * 0.7, zIndex: 24, pointerEvents: "none" }} />
          {cast("ch", hx, hy + 76, 1)}
          <div style={{ position: "absolute", left: hx - HS / 2, top: hy - 0.55 * HS, width: HS, height: HS, zIndex: 25, transformOrigin: "50% 62%", transform: `rotate(${heroRot}deg)` }}>
            <div style={{ position: "absolute", left: 20, top: 196, width: 168, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(7px)", opacity: 1 - fall }} />
            <Mascot lf={lf} size={HS} gaze={heroGaze} nodAmp={fall > 0.4 ? 0 : 3.4} nodSpeed={9} shock={heroShock} hiVis={1} capBack={cap} />
            <div style={{ position: "absolute", left: 32 * U, top: 90 * U, width: 42 * U, height: 58 * U, background: grad("#31456E", "#182338"), borderRadius: 2, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.14)" }} />
            <div style={{ position: "absolute", left: 126 * U, top: 90 * U, width: 42 * U, height: 58 * U, background: grad("#31456E", "#182338"), borderRadius: 2, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.14)" }} />
            <div style={{ position: "absolute", left: 32 * U, top: 88 * U, width: 136 * U, height: 7 * U, background: grad("#3B527E", "#22314F") }} />
            <div style={{ position: "absolute", left: 37 * U, top: 104 * U, width: 32 * U, height: 14 * U, borderRadius: 999, background: "#EDE9DE", border: `${1.5 * U}px solid #22314F` }} />
            <div style={{ position: "absolute", left: 130 * U, top: 100 * U, width: 32 * U, height: 32 * U, borderRadius: 4, background: PAPER, border: `${2.5 * U}px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21 * U, color: RED, boxShadow: "0 6px 12px rgba(0,0,0,0.4)", transform: `rotate(${Math.sin(lf * 0.08) * 1.8}deg)` }}>L</div>
            {lf < 106 ? (
              <div style={{ position: "absolute", left: 40 * U, top: 142 * U, width: 13 * U, height: 26 * U, borderRadius: 3, background: grad("#D2724E", "#8E4227"), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.22) * 9}deg)` }} />
            ) : (
              <div style={{ position: "absolute", left: -4 * U, top: 62 * U, width: 40 * U, height: 30 * U, borderRadius: 5, background: grad("#D2724E", "#8E4227"), border: `${1 * U}px solid rgba(255,200,170,0.3)`, transformOrigin: "100% 50%", transform: `rotate(${Math.sin(lf * 1.5) * 34 - 14}deg)`, boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }} />
            )}
            {cap > 0 && (
              <div style={{ position: "absolute", left: 56 * U, top: 2 * U, width: 84 * U, height: 15 * U, borderRadius: "7px 7px 3px 3px", background: grad("#6E7C62", "#333C2C"), border: `${1.5 * U}px solid #96A08A`, transform: "rotate(-8deg)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }}>
                <div style={{ position: "absolute", left: 16 * U, top: 4 * U, width: 50 * U, height: 6 * U, borderRadius: 2, background: "rgba(30,46,30,0.92)", border: `${1 * U}px solid rgba(190,210,180,0.4)` }} />
              </div>
            )}
            <div style={{ position: "absolute", left: 118 * U, top: 88 * U, width: (9 + ramp(lf, 0, 154) * 22) * U, height: 8 * U, borderRadius: "50%", background: "rgba(24,20,18,0.5)", filter: "blur(1.5px)", transform: "rotate(-12deg)" }} />
          </div>
          {lf >= 56 && lf < 72 && (
            <div style={{ position: "absolute", left: hNubX - 15, top: hNubY - 15, width: 30, height: 30, zIndex: 26 }}>
              <div style={{ position: "absolute", left: 2, top: 2, width: 26, height: 26, borderRadius: 4, background: "#D97757", transform: `scale(${0.82 + Math.abs(Math.sin((lf - 56) * 0.55)) * 0.3})` }} />
              {[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: -10 - i * 6, top: 6 + i * 8, width: 9, height: 3, borderRadius: 2, background: "rgba(255,220,190,0.5)", opacity: Math.abs(Math.sin((lf - 56) * 0.55)) }} />)}
            </div>
          )}
          {lf >= 133 && (() => {
            const t = ramp(lf, 133, 154);
            return (
              <div style={{ position: "absolute", left: 560 - t * 210, top: 452 + t * t * 250, width: 62, height: 26, zIndex: 26, transform: `rotate(${t * 520}deg)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 62, height: 13, borderRadius: "6px 6px 0 0", background: "#3C6B8C" }} />
                <div style={{ position: "absolute", left: 44, top: 8, width: 18, height: 5, background: "#2F5673" }} />
              </div>
            );
          })()}

          {/* ============ THE VILLAIN: slate copy, shades, code-rain. Peak power. ============ */}
          {lf >= 22 && (
            <React.Fragment>
              <div style={{ position: "absolute", left: vx - 340, top: vy - 320, width: 680, height: 680, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,198,124,${0.17 + keyI * 0.13}) 0%, rgba(255,150,64,${0.07 + keyI * 0.05}) 40%, transparent 66%)`, filter: "blur(22px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
              {lf >= 40 && cast("cv", vx, vy + VS * 0.4, 1)}
              {lf >= 18 && lf < 52 && (() => {
                const bloom = ramp(lf, 18, 28) - ramp(lf, 42, 52);
                return <div style={{ position: "absolute", left: 130, top: 296, width: 470, height: 430, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,196,110,${0.6 * bloom}), rgba(255,120,40,${0.28 * bloom}) 46%, transparent 70%)`, filter: "blur(16px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />;
              })()}
              {lf >= 24 && lf < 46 && (
                <div style={{ position: "absolute", left: vx + VS * 0.34, top: vy - VS * 0.5, width: 8 + peelP * 40, height: VS * 0.98, background: `linear-gradient(90deg, rgba(255,150,50,0) 0%, rgba(255,232,170,${0.95 * Math.min(1, peelP * 2.4)}) 50%, rgba(255,150,50,0) 100%)`, filter: "blur(4px)", mixBlendMode: "screen", zIndex: 24, pointerEvents: "none" }} />
              )}
              {lf >= 18 && lf < 34 && Array.from({ length: 12 }).map((_, i) => (
                <div key={"nt" + i} style={{ position: "absolute", left: 466 - 0.44 * HS + Math.sin(i * 1.7) * 2, top: hy - 0.5 * HS + i * 17, width: 5, height: 9, borderRadius: 2, background: "rgba(20,16,14,0.7)", opacity: over(lf, 18 + i * 0.4, 5) * (1 - ramp(lf, 28, 34)), zIndex: 26 }} />
              ))}
              <div style={{ position: "absolute", left: vx - VS / 2, top: vy - 0.55 * VS, width: VS, height: VS, zIndex: lf >= 142 ? 34 : 20, transformOrigin: "50% 88%", transform: `rotate(${vTilt}deg)`, filter: `brightness(${1 - vSil * 0.86}) contrast(${1 + vSil * 0.5}) drop-shadow(${-3 - keyI * 2}px -1px 0 rgba(255,178,84,${0.8 + keyI * 0.2})) drop-shadow(-11px 0 17px rgba(255,120,40,${0.45 + keyI * 0.35})) drop-shadow(4px 3px 0 rgba(126,146,186,0.32))` }}>
                <Villain lf={lf} size={VS} gaze={lf >= 142 ? 0 : vRight ? 2 : -2} nodAmp={vNodAmp} nodSpeed={vNodSpeed} rain={rain} />
                {lf >= 142 && <div style={{ position: "absolute", left: 0.46 * VS, top: 0.595 * VS - vHop, width: 0.09 * VS, height: 0.016 * VS, background: "#0E1014", zIndex: 3 }} />}
                <div style={{ position: "absolute", left: 0.02 * VS, top: 0.1 * VS, width: 0.5 * VS, height: 0.76 * VS, background: `radial-gradient(ellipse at 22% 50%, rgba(255,176,84,${(0.2 + keyI * 0.14) * vLit}), transparent 62%)`, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 4, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 0.15 * VS, top: 0.2 * VS, width: 0.07 * VS, height: 0.5 * VS, borderRadius: "50%", background: `rgba(255,206,130,${(0.22 + keyI * 0.22) * vLit})`, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 4, pointerEvents: "none" }} />
              </div>
              {glint > 0 && (
                <div style={{ position: "absolute", left: vx - VS * 0.3, top: vy - VS * 0.22, width: VS * 0.6, height: 7, background: "rgba(255,255,255,0.95)", filter: `blur(${1 + (1 - glint) * 5}px)`, opacity: glint, transform: `scaleX(${0.3 + glint * 0.7})`, zIndex: 35, boxShadow: "0 0 22px rgba(220,240,255,0.9)" }} />
              )}
            </React.Fragment>
          )}

          {/* ============ THE TAGGER: the only prop that changes owner ============ */}
          {lf >= 56 && reach > 8 && arm("va", gripX, gripY, vNubX, vNubY, VILL, VS * 0.108)}
          {lf < 56 && reach > 8 && arm("ha", gripX, gripY, hNubX, hNubY, "#D97757", HS * 0.115)}
          {lf >= 44 && lf < 58 && arm("va2", vx + 0.395 * VS, vy - 0.055 * VS, gripX, gripY, VILL, VS * 0.108)}
          <div style={{ position: "absolute", left: gx, top: gy, width: 0, height: 0, transform: `rotate(${gunRot}deg) scale(${gs})`, transformOrigin: "0px 0px", zIndex: lf >= 142 ? 36 : 22 }}>
            <div style={{ position: "absolute", left: -15, top: -19, width: 30, height: 38, borderRadius: 5, background: grad("#3A342E", "#151210"), border: "2px solid rgba(0,0,0,0.5)", boxShadow: "0 4px 9px rgba(0,0,0,0.6)" }}>
              <div style={{ position: "absolute", left: 3, top: 6, width: 22, height: 26, borderRadius: 3, background: `linear-gradient(140deg, ${FAKE}, #6E7A26)`, opacity: 0.45 + kick * 0.45 }} />
            </div>
            <div style={{ position: "absolute", left: 6, top: 8, width: 26, height: 11, borderRadius: 3, background: grad("#C4CAD8", "#565E70"), border: "1px solid rgba(0,0,0,0.4)", transformOrigin: "100% 50%", transform: `rotate(${kick * 22}deg)` }} />
            <div style={{ position: "absolute", left: 8, top: -36, width: 94, height: 50, borderRadius: "7px 9px 6px 6px", background: grad("#E4721E", "#8E3608"), border: "2px solid rgba(255,200,140,0.35)", boxShadow: "0 8px 16px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,225,180,0.5)" }}>
              <div style={{ position: "absolute", left: 6, top: 34, width: 82, height: 5, background: "rgba(60,20,4,0.4)" }} />
            </div>
            <div style={{ position: "absolute", left: 54 - (30 - fired * 1.5), top: -58 - (30 - fired * 1.5), width: (30 - fired * 1.5) * 2, height: (30 - fired * 1.5) * 2, borderRadius: "50%", background: `conic-gradient(${FAKE}, #7E8C30 40%, ${FAKE} 60%, #98A63E)`, border: "2px solid #58621C", transform: `rotate(${-lf * 6 - fired * 44}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.55)" }}>
              <div style={{ position: "absolute", left: "42%", top: "42%", width: "16%", height: "16%", borderRadius: "50%", background: "#2E3410" }} />
              {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: "48%", top: "4%", width: "4%", height: "92%", background: "rgba(48,56,14,0.5)", transformOrigin: "50% 50%", transform: `rotate(${k * 45}deg)` }} />)}
            </div>
            <div style={{ position: "absolute", left: 26, top: -70, width: 58, height: 16, borderRadius: "8px 8px 0 0", background: grad("#B4501A", "#6E2806"), border: "1.5px solid rgba(255,200,140,0.3)" }} />
            {/* THE ONE NUMBER: the brass flip-counter, 03 -> 09 */}
            <div style={{ position: "absolute", left: 46, top: -28, width: 44, height: 30, borderRadius: 4, background: grad("#EFC96E", "#966E20"), border: "2px solid #66480F", boxShadow: "inset 0 2px 0 rgba(255,244,200,0.7), 0 3px 6px rgba(0,0,0,0.5)", padding: 4 }}>
              <div style={{ position: "relative", width: 36, height: 22, borderRadius: 2, background: "#100C05", overflow: "hidden", fontFamily: mono, fontWeight: 700, fontSize: 16, lineHeight: "22px", textAlign: "center", color: "#F8DC90" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 36, height: 22 }}>{pad(dig)}</div>
                <div style={{ position: "absolute", left: 0, top: 0, width: 36, height: 11, overflow: "hidden", background: "#100C05", transformOrigin: "50% 100%", transform: `scaleY(${1 - flipP})` }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: 36, height: 22 }}>{pad(dig - 1)}</div>
                </div>
                <div style={{ position: "absolute", left: 0, top: 10.5, width: 36, height: 1.5, background: "rgba(255,255,255,0.22)" }} />
              </div>
            </div>
            <div style={{ position: "absolute", left: 62, top: 12, width: 13, height: 28, borderRadius: 3, background: grad("#5A6274", "#232833"), transformOrigin: "50% 0%", transform: `rotate(${kick * 28}deg)` }} />
            <div style={{ position: "absolute", left: 62, top: -10, width: 30, height: 52, borderRadius: "5px 8px 10px 6px", background: grad("#C25F16", "#742B06"), border: "2px solid rgba(255,200,140,0.3)", transform: "rotate(11deg)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }}>
              {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 4, top: 8 + k * 12, width: 20, height: 3, borderRadius: 2, background: "rgba(50,18,2,0.45)" }} />)}
            </div>
            <div style={{ position: "absolute", left: 88, top: -20, width: 14, height: 16, borderRadius: 2, background: "#2A1608", border: "1.5px solid rgba(255,200,140,0.25)" }} />
          </div>

          {/* ============ ATMOSPHERE: a measured roll of smoke + embers off the fire, nothing busy ============ */}
          {Array.from({ length: 10 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            const t = ((lf * (1.7 + r * 1.6) + r * 360) % 360) / 360;
            const sz = 40 + r * 76 + t * 130;
            return <div key={"sm" + i} style={{ position: "absolute", left: 150 + r * 110 - t * (150 + r * 130), top: 440 - t * 400, width: sz, height: sz, borderRadius: "50%", background: `rgba(${Math.floor(52 + r * 34)},${Math.floor(46 + r * 26)},46,0.26)`, filter: "blur(11px)", opacity: (1 - t) * 0.6, zIndex: 26, pointerEvents: "none" }} />;
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const r = seed(i * 2.6 + 3);
            const y = 620 - ((lf * (1.5 + r * 2.8) + r * 430) % 440);
            return <div key={"em" + i} style={{ position: "absolute", left: 90 + r * 240 + Math.sin(lf * 0.06 + i) * 24, top: y, width: 3 + r * 4, height: 3 + r * 4, borderRadius: "50%", background: r > 0.5 ? "#FFC163" : "#FF8A3C", opacity: 0.32 + r * 0.44, boxShadow: "0 0 8px rgba(255,150,60,0.8)", zIndex: 27 }} />;
          })}
        </div>

        {/* the IN transition lands mid-THWACK */}
        {lf < 4 && <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: FAKE, opacity: pulse(0, 4) * 0.5, zIndex: 46, pointerEvents: "none" }} />}

        {/* the final polish: a gentle focal vignette + a warm firelight wash pooled on the wreck */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(20,8,4,0.66)", zIndex: 42 }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", background: `radial-gradient(ellipse at 18% 62%, rgba(255,130,40,${0.08 + keyI * 0.12}), transparent 58%)`, mixBlendMode: "screen", zIndex: 42 }} />
      </div>
    </Panel>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  /* ================================================================
     ONE ACTION, READ ON MUTE: a learner car cannot move because a giant
     BOOT keeps stomping the brake. Behind it, the work piles into a jam.
     Focal subject = the boot on the chrome pedal, spotlit, low-centre.
     Hero = warm, eager, at the wheel above it. Villain = small, dim, in
     the back seat (established elsewhere; secondary here). The focal
     midground is CLEAN. All the new richness lives in a DIMMER, COOLER,
     SOFTER, SLOWER background tier: a night driving-test-centre lot.
     Nothing settles; the loop runs through f88.
     ================================================================ */

  // ---- THE STOMP CLOCK. Five stomps land; a sixth is loading at f88 and never lands. ----
  const STOMPS = [8, 26, 44, 62, 80];
  let pS = -40; for (const s of STOMPS) if (s <= lf) pS = s;
  let nS = 999; for (const s of STOMPS) if (s > lf) { nS = s; break; }
  const since = lf - pS;
  const vnS = nS < 999 ? nS : 92;                 // a virtual sixth, off the end of the scene
  const toNext = vnS - lf;

  // boot travel: 0 = lifted clear, 1 = stomped flat on the pedal. Eased, never stepped.
  const recoil = pS > -40 ? interpolate(since, [0, 8], [1, 0], { ...cl, easing: Easing.out(Easing.cubic) }) : 0;
  const plunge = interpolate(toNext, [0, 9], [1, 0], { ...cl, easing: Easing.out(Easing.cubic) });
  const bootDown = Math.max(recoil, plunge);
  const bootLift = (1 - bootDown) * 116;          // px the boot rises when it lets off
  const pedalPress = bootDown;

  // the impact envelope drives the flare, the shake, the ring, the wince
  const impact = since >= 0 && since < 9 ? Math.pow(1 - since / 9, 1.7) : 0;

  // ---- THE CAR: revs forward, dead-stops at every stomp. Net travel: zero metres. ----
  const rev = interpolate(since, [3, 15], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const carX = -rev * 18 + impact * 7;            // creeps left, snaps back + a small backward kick
  const shk = impact * 5;
  const csx = Math.sin(lf * 4.6) * shk, csy = Math.cos(lf * 5.7) * shk * 0.7;
  const carTf = `translate(${carX + csx}px, ${csy}px)`;

  const heroLean = rev * 6 - impact * 4;          // leans in as he revs, jolts on the stop
  const heroGaze = -3 - Math.round(rev * 2);
  const heroStern = ramp(lf, 40, 58) * 0.5;

  // ---- THE JAM: work-carts stacking up behind, receding, growing on the stomp clock. ----
  const QN = 7;
  const qBorn = (i: number) => (i < 3 ? -20 : STOMPS[i - 3]);
  const comp = ramp(lf, 0, 88) * 20;              // the tail crawls in and tightens the whole time
  const honk = STOMPS.some((s) => lf - s >= 0 && lf - s < 6) ? interpolate(since, [0, 6], [1, 0], cl) : 0;

  // the impact shockwave ring at the pedal
  const ringR = impact > 0.02 ? interpolate(since, [0, 9], [8, 78], cl) : 0;

  // brake warms gently and flares on contact (not the old runaway heat)
  const heat = interpolate(lf, [0, 88], [0.12, 0.5], cl);
  const glow = Math.min(1, heat * 0.6 + impact * 0.7);

  // the speedo needle is welded to zero; it only quivers when he revs
  const spQ = rev * 7 * Math.sin(lf * 1.7) - impact * 6;
  const na = (150 + spQ) * Math.PI / 180;

  // one honest number: the trip meter, stuck on 0
  const cam = interpolate(lf, [0, 88], [1.05, 1.0], cl);

  // slow, graceful background clocks (recessive tier never moves fast)
  const bgFlag = Math.sin(lf * 0.12);
  const bgBeacon = Math.abs(Math.sin(lf * 0.11));
  const bgSignal = 0.62 + 0.34 * Math.abs(Math.sin(lf * 0.14));

  return (
    <Panel label="stuck at zero">
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam})`, transformOrigin: "506px 470px" }}>

        {/* ==================== BG: a night DRIVING-TEST CENTRE lot. Rich, but every element here is dimmer, cooler, softer and slower than the lit car up front. ==================== */}
        {/* deep sky */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0A0E17 0%,#0F1421 46%,#141B29 78%,#10151F 100%)" }} />
        {/* low sodium city-glow smeared along the horizon + a cool pool over the yard */}
        <div style={{ position: "absolute", left: 0, top: 402, width: 1012, height: 210, background: `radial-gradient(ellipse 70% 92% at 64% 100%, rgba(196,132,68,${0.15 + Math.sin(lf * 0.05) * 0.02}), transparent 72%)`, filter: "blur(16px)" }} />
        <div style={{ position: "absolute", left: 24, top: 356, width: 380, height: 236, background: "radial-gradient(ellipse 62% 70% at 42% 92%, rgba(118,150,192,0.10), transparent 72%)", filter: "blur(22px)" }} />

        {/* the ground plane FIRST, so the lot's cones and queue cars can sit on the tarmac */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <linearGradient id="s2rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#232A38" /><stop offset="1" stopColor="#10141D" /></linearGradient>
            <linearGradient id="s2body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4EEDF" /><stop offset="0.55" stopColor="#DCD2BC" /><stop offset="1" stopColor="#B4A98F" /></linearGradient>
            <linearGradient id="s2glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A4759" /><stop offset="1" stopColor="#1B2330" /></linearGradient>
            <linearGradient id="s2chr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EDF3FB" /><stop offset="0.5" stopColor="#9CA9BC" /><stop offset="1" stopColor="#5A636F" /></linearGradient>
            <linearGradient id="s2tkt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F7F3EA" /><stop offset="1" stopColor="#D2C7B1" /></linearGradient>
            <linearGradient id="s2boot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2A2F3A" /><stop offset="0.5" stopColor="#171B23" /><stop offset="1" stopColor="#0C0E14" /></linearGradient>
          </defs>
          <rect x="0" y="560" width="1012" height="232" fill="url(#s2rd)" />
          <rect x="0" y="560" width="1012" height="3" fill="#3A4557" opacity="0.5" />
          {/* painted perspective parking bays, faint on the wet tarmac */}
          <g stroke="#C9C3B0" strokeWidth="2" opacity="0.09">
            {[-360, -140, 60, 260, 460, 660, 860, 1080, 1300].map((vx, i) => (
              <line key={"bay" + i} x1={506 + (vx - 506) * 0.06} y1={568} x2={vx} y2={792} />
            ))}
          </g>
          {/* a dashed lane line running off to the LEFT, where the car keeps trying to go */}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = i / 6, x = 506 - t * 470, y = 596 + t * 152, w = 30 - t * 16;
            return <rect key={"ln" + i} x={x - w / 2} y={y} width={w} height={5 - t * 2} rx={2} fill="#D8CBAE" opacity={0.13 * (1 - t * 0.4)} />;
          })}
          {/* the STOP line the learner is pinned behind */}
          <rect x="150" y="628" width="360" height="7" fill="#D8CDB4" opacity="0.15" transform="skewX(-6)" />
          {/* oil stains + gravel scuff */}
          <ellipse cx="640" cy="712" rx="60" ry="16" fill="#05070B" opacity="0.35" />
          <ellipse cx="250" cy="742" rx="46" ry="12" fill="#05070B" opacity="0.3" />
          {Array.from({ length: 22 }).map((_, i) => { const r = seed(i * 1.9 + 4); return <rect key={"g" + i} x={r * 1012} y={604 + seed(i * 3.1) * 150} width={2 + r * 4} height={1.6} fill="#454F60" opacity="0.4" />; })}
        </svg>

        {/* ==================== THE RECESSIVE ENVIRONMENT TIER: blurred, desaturated, dimmed so it stays deep behind the lit car. ==================== */}
        <div style={{ position: "absolute", inset: 0, filter: "blur(1.7px) saturate(0.7) brightness(0.84)" }}>
          <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s2bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A2231" /><stop offset="1" stopColor="#0D131E" /></linearGradient>
              <linearGradient id="s2fascia" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#243247" /><stop offset="1" stopColor="#16202F" /></linearGradient>
              <radialGradient id="s2win" cx="0.5" cy="0.4" r="0.75"><stop offset="0" stopColor="#E7C081" /><stop offset="1" stopColor="#7A5E34" /></radialGradient>
            </defs>

            {/* ---- distant city skyline behind the yard, tiny lit windows flickering ---- */}
            {Array.from({ length: 15 }).map((_, i) => {
              const r = seed(i * 1.7 + 2), r2 = seed(i * 2.9 + 5);
              const bw = 44 + r * 50, bx = 336 + i * 48 - r2 * 8;
              if (bx > 1012) return null;
              const bh = 46 + r2 * 92, by = 560 - bh;
              const rows = Math.floor(bh / 16), cols = Math.floor(bw / 14);
              return (
                <g key={"sk" + i}>
                  <rect x={bx} y={by} width={bw} height={bh} fill="#0B1019" opacity={0.92} />
                  {Array.from({ length: rows }).map((_, wy) =>
                    Array.from({ length: cols }).map((_, wx) => {
                      const s = seed(i * 13 + wy * 3 + wx * 7);
                      if (s < 0.62) return null;
                      const fl = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(lf * 0.06 + s * 30 + wy));
                      return <rect key={wx + "_" + wy} x={bx + 6 + wx * 14} y={by + 8 + wy * 16} width={5} height={7} fill="#D8AE6E" opacity={0.22 * fl} />;
                    })
                  )}
                </g>
              );
            })}

            {/* ---- the knockoff licence office: STATE TEST CENTRE / MOTOR LICENCE DEPT ---- */}
            <g>
              <rect x="24" y="404" width="312" height="156" fill="url(#s2bld)" stroke="#05070B" strokeWidth="2" />
              <rect x="18" y="396" width="324" height="12" fill="#0F1622" />
              {/* window grid, several lit and slowly flickering */}
              {Array.from({ length: 4 }).map((_, ry) => Array.from({ length: 6 }).map((_, rx) => {
                const s = seed(ry * 7 + rx * 3 + 1), lit = s > 0.42;
                const fl = 0.5 + 0.5 * Math.sin(lf * 0.05 + s * 20 + rx);
                return <rect key={rx + "_" + ry} x={44 + rx * 46} y={422 + ry * 31} width={30} height={19} rx={1}
                  fill={lit ? "url(#s2win)" : "#0E1621"} opacity={lit ? 0.42 + 0.34 * fl : 0.85} stroke="#0A0F18" strokeWidth={1} />;
              }))}
              {/* lit ground-floor entrance canopy */}
              <rect x="118" y="524" width="124" height="36" fill="#0B111B" stroke="#05070B" strokeWidth="1.5" />
              <rect x="130" y="532" width="100" height="22" fill="url(#s2win)" opacity="0.4" />
              <rect x="112" y="518" width="136" height="7" fill="#151E2B" />
              {/* fascia sign board (a word, not a number) */}
              <rect x="40" y="404" width="236" height="26" rx="3" fill="url(#s2fascia)" stroke="#0A121D" strokeWidth="1.5" />
              <text x="158" y="422" fill="#9FB4CE" fontFamily={inter.fontFamily} fontWeight="800" fontSize="15" letterSpacing="2" textAnchor="middle" opacity="0.82">TEST CENTRE</text>
              {/* rooftop amber beacon, slow pulse (the lot is waiting) */}
              <rect x="298" y="384" width="4" height="14" fill="#3A4353" />
              <circle cx="300" cy="382" r="6" fill="#E0A84B" opacity={0.35 + 0.5 * bgBeacon} />
              <circle cx="300" cy="382" r="14" fill="#E0A84B" opacity={0.14 * bgBeacon} />
            </g>

            {/* ---- flag on a pole beside the office, waving slowly ---- */}
            <g>
              <rect x="356" y="346" width="4" height="214" fill="#4A5566" />
              <circle cx="358" cy="346" r="4" fill="#8894A6" />
              <path d={`M 360 352 C ${360 + 30} ${352 + bgFlag * 4}, ${360 + 56} ${352 - bgFlag * 5}, ${360 + 80} ${352 + bgFlag * 3} L ${360 + 80} ${386 + bgFlag * 3} C ${360 + 56} ${386 - bgFlag * 5}, ${360 + 30} ${386 + bgFlag * 4}, 360 386 Z`} fill="#B5643A" opacity="0.66" stroke="#7A3F26" strokeWidth="1" />
            </g>

            {/* ---- sodium street lamps (none behind the boot, so no cone washes the focal pool) ---- */}
            {[120, 720, 940].map((x, i) => (
              <g key={"lp" + i}>
                <rect x={x - 3} y={300} width={6} height={262} fill="#2A3341" />
                <rect x={x - 30} y={296} width={40} height={7} rx={3} fill="#333D4C" />
                <ellipse cx={x - 8} cy={302} rx={12} ry={5} fill="#E7C888" opacity="0.72" />
              </g>
            ))}

            {/* ---- a signal head stuck on RED: the lot says STOP ---- */}
            <g transform="translate(884 452)">
              <rect x="-3" y="0" width="6" height="108" fill="#2A3341" />
              <rect x="-15" y="-46" width="30" height="54" rx="6" fill="#0C1119" stroke="#05070B" strokeWidth="1.5" />
              <circle cx="0" cy="-33" r="7.5" fill="#C4382E" opacity={bgSignal} />
              <circle cx="0" cy="-33" r="15" fill="#C4382E" opacity={0.16 * bgSignal} />
              <circle cx="0" cy="-14" r="7.5" fill="#3A2F1A" />
              <circle cx="0" cy="5" r="7.5" fill="#1E2A22" />
            </g>

            {/* ---- road signs on posts: no-entry + keep-left arrow ---- */}
            <g transform="translate(486 470)">
              <rect x="-2.5" y="0" width="5" height="90" fill="#2A3341" />
              <circle cx="0" cy="-8" r="17" fill="#B23A32" stroke="#E7E0D2" strokeWidth="2.5" />
              <rect x="-11" y="-11" width="22" height="6" rx="2" fill="#E7E0D2" />
            </g>
            <g transform="translate(636 486)">
              <rect x="-2.5" y="0" width="5" height="74" fill="#2A3341" />
              <circle cx="0" cy="-6" r="15" fill="#2E5AA0" stroke="#E7E0D2" strokeWidth="2" />
              <path d="M 6 -14 L -6 -6 L 6 2" fill="none" stroke="#E7E0D2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* ---- chain-link fence between the lot and the outer yard ---- */}
            <g opacity="0.5">
              <rect x="0" y="514" width="1012" height="4" fill="#3A4353" />
              <rect x="0" y="556" width="1012" height="4" fill="#3A4353" />
              {Array.from({ length: 12 }).map((_, i) => <rect key={"fp" + i} x={i * 92} y={516} width={4} height={44} fill="#3A4353" />)}
              {Array.from({ length: 44 }).map((_, i) => <line key={"fa" + i} x1={i * 24} y1={516} x2={i * 24 + 44} y2={560} stroke="#49566A" strokeWidth={1} opacity="0.32" />)}
              {Array.from({ length: 44 }).map((_, i) => <line key={"fb" + i} x1={i * 24} y1={560} x2={i * 24 + 44} y2={516} stroke="#49566A" strokeWidth={1} opacity="0.32" />)}
            </g>

            {/* ---- lowered boom-barrier gate holding the entrance lane ---- */}
            <g>
              <rect x="244" y="512" width="12" height="48" fill="#3A4353" />
              <rect x="240" y="506" width="20" height="10" rx="2" fill="#49566A" />
              <line x1="250" y1="514" x2="80" y2="550" stroke="#B84636" strokeWidth="8" strokeLinecap="round" />
              <line x1="250" y1="514" x2="80" y2="550" stroke="#E7DECB" strokeWidth="8" strokeDasharray="11 15" strokeLinecap="butt" opacity="0.85" />
            </g>

            {/* ---- other learners idling far-left in the queue, tiny and dim ---- */}
            {[{ x: 158, s: 0.3 }, { x: 92, s: 0.24 }, { x: 42, s: 0.2 }].map((c, i) => {
              const bob = Math.sin(lf * 0.1 + i * 2) * 1.4;
              return (
                <g key={"qc" + i} transform={`translate(${c.x} ${548 + bob}) scale(${c.s})`} opacity={0.58 - i * 0.12}>
                  <ellipse cx="0" cy="30" rx="70" ry="9" fill="#000" opacity="0.4" />
                  <path d="M -66 20 L -54 -8 Q -48 -22 -30 -22 L 34 -22 Q 52 -22 60 -4 L 70 20 Z" fill="#20293A" stroke="#0A0F18" strokeWidth="2" />
                  <path d="M -40 -18 L -30 -18 L -30 2 L -50 2 Z" fill="#3A4A63" />
                  <path d="M -22 -18 L 30 -18 L 44 2 L -22 2 Z" fill="#3A4A63" />
                  <circle cx="-38" cy="24" r="14" fill="#0C1119" /><circle cx="44" cy="24" r="14" fill="#0C1119" />
                  <circle cx="-64" cy="6" r="4" fill="#C4382E" opacity={0.6 + 0.3 * Math.abs(Math.sin(lf * 0.13 + i))} />
                </g>
              );
            })}

            {/* ---- a receding arc of traffic cones across the far tarmac ---- */}
            {Array.from({ length: 10 }).map((_, i) => {
              const t = i / 9, x = 60 + t * 900, y = 582 - Math.sin(t * Math.PI) * 10, sc = 0.72 - 0.22 * Math.sin(t * Math.PI);
              return (
                <g key={"cn" + i} transform={`translate(${x} ${y}) scale(${sc})`} opacity="0.7">
                  <ellipse cx="0" cy="7" rx="16" ry="4" fill="#000" opacity="0.35" />
                  <path d="M -13 8 L -4 -24 L 4 -24 L 13 8 Z" fill="#B5643A" stroke="#7A3F26" strokeWidth="1.5" />
                  <rect x="-9" y="-8" width="18" height="6" fill="#E7DECB" opacity="0.85" />
                  <rect x="-13" y="8" width="26" height="4" rx="2" fill="#8A4A2E" />
                </g>
              );
            })}
          </svg>

          {/* volumetric lamp cones, additive but faint */}
          <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
            {[120, 720, 940].map((x, i) => (
              <div key={"lc" + i} style={{ position: "absolute", left: x - 88, top: 300, width: 176, height: 300, background: `linear-gradient(180deg, rgba(232,200,136,${0.09 + Math.sin(lf * 0.08 + i) * 0.01}), transparent 80%)`, clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", filter: "blur(4px)" }} />
            ))}
          </div>
        </div>

        {/* drifting cool night haze keeps the deep tier alive and pushes it back */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 3 }).map((_, i) => {
            const p = (lf * (0.3 + i * 0.14) + i * 90) % 300;
            return <div key={"hz" + i} style={{ position: "absolute", left: -300 + p, top: 444 + i * 34, width: 440, height: 74, background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(120,150,192,${0.05 + i * 0.01}), transparent 70%)`, filter: "blur(18px)" }} />;
          })}
        </div>
        {/* cool atmospheric wash unifying the far tier */}
        <div style={{ position: "absolute", left: 0, top: 336, width: 1012, height: 244, pointerEvents: "none", background: "linear-gradient(180deg, rgba(30,44,68,0.28), transparent)" }} />

        {/* ==================== THE JAM: a growing queue of work, receding right. Supporting tier. ==================== */}
        <div style={{ position: "absolute", inset: 0, filter: "blur(1.4px) saturate(0.9)", opacity: 0.74 }}>
          <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
            {Array.from({ length: QN }).map((_, i) => {
              const b = qBorn(i);
              if (lf < b) return null;
              const a = over(lf, b, 8, Easing.out(Easing.back(1.6)));
              const k = i / (QN - 1), pk = Math.pow(k, 0.72);
              const bx = 806 + 172 * pk, by = 596 - 118 * pk, sc = 1 - 0.6 * pk;
              const r = seed(i * 3.1 + 7);
              const x = bx + (1 - a) * 70 - comp;
              const y = by + (1 - a) * 8 + Math.sin(lf * (0.3 + r * 0.2) + r * 9) * 1.6 * sc;
              const w = 118 * sc, h = 52 * sc, hk = honk * (1 - i * 0.08);
              return (
                <g key={"q" + i} opacity={a} transform={`translate(${x} ${y})`}>
                  <ellipse cx="0" cy={h * 0.62} rx={w * 0.5} ry={6 * sc} fill="#000" opacity="0.4" />
                  <circle cx={-w * 0.3} cy={h * 0.44} r={9.5 * sc} fill="#0D1017" />
                  <circle cx={w * 0.3} cy={h * 0.44} r={9.5 * sc} fill="#0D1017" />
                  {/* work-ticket card: torn top, spindle hole, task bars. Backlog by shape. */}
                  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={7 * sc} fill="url(#s2tkt)" stroke={INK} strokeWidth={1.2 * sc} />
                  <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.05} fill={CLAY} opacity="0.7" />
                  <circle cx={-w * 0.33} cy={-h * 0.18} r={4 * sc} fill="#20242E" />
                  <rect x={-w / 2 + 9 * sc} y={h * 0.0} width={(w - 18 * sc) * 0.82} height={3 * sc} rx={1.5} fill={MUTE} opacity="0.55" />
                  <rect x={-w / 2 + 9 * sc} y={h * 0.16} width={(w - 18 * sc) * 0.5} height={3 * sc} rx={1.5} fill={MUTE} opacity="0.4" />
                  {hk > 0.04 ? (
                    <g opacity={hk} stroke={AMBER} strokeWidth={2.4 * sc} fill="none" strokeLinecap="round">
                      <path d={`M ${w * 0.5 + 8 * sc} ${-h * 0.4} a ${9 * sc} ${9 * sc} 0 0 1 0 ${17 * sc}`} />
                      <path d={`M ${w * 0.5 + 16 * sc} ${-h * 0.5} a ${15 * sc} ${15 * sc} 0 0 1 0 ${29 * sc}`} />
                    </g>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ==================== THE LEARNER CAR: clean profile, facing left, wanting to GO. ==================== */}
        <div style={{ position: "absolute", inset: 0, transform: carTf, transformOrigin: "560px 600px" }}>
          <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
            {/* grounded shadow */}
            <ellipse cx="546" cy="668" rx="290" ry="18" fill="#000" opacity="0.55" />
            {/* wheels: locked, never turning. */}
            {[402, 700].map((cx, i) => (
              <g key={"wh" + i}>
                <circle cx={cx} cy={600} r={58} fill="#0C0F15" stroke="#05070A" strokeWidth="2" />
                <circle cx={cx} cy={600} r={34} fill="#333B48" />
                <circle cx={cx} cy={600} r={27} fill="#4C5563" />
                {Array.from({ length: 5 }).map((_, z) => { const a = (z / 5) * Math.PI * 2 + i; return <circle key={z} cx={cx + Math.cos(a) * 16} cy={600 + Math.sin(a) * 16} r={3} fill="#20252E" />; })}
                <circle cx={cx} cy={600} r={7} fill="#98A2B2" />
              </g>
            ))}
            {/* front wheel brake glow when the pedal is stomped */}
            <circle cx="402" cy="600" r="40" fill={RED} opacity={impact * 0.28} style={{ filter: "blur(7px)" }} />
            {/* body silhouette */}
            <path d="M 306 566 C 306 522 320 502 356 496 L 392 494 L 434 398 Q 442 374 472 372 L 626 372 Q 658 374 670 398 L 712 476 L 776 482 C 798 484 802 508 802 530 L 798 566 Z" fill="url(#s2body)" stroke={INK} strokeWidth="2.2" />
            <path d="M 306 566 C 306 522 320 502 356 496 L 392 494 L 434 398 Q 442 374 472 372 L 626 372 Q 658 374 670 398 L 712 476 L 776 482 C 798 484 802 508 802 530 L 798 566 Z" fill="#FFFDF6" opacity="0.06" />
            {/* belt-line highlight */}
            <rect x="356" y="474" width="424" height="4" rx="2" fill="#FFFDF6" opacity="0.45" transform="rotate(0.5 560 476)" />
            {/* front + rear glass */}
            <polygon points="446,394 512,376 512,470 400,470" fill="url(#s2glass)" stroke="#141A24" strokeWidth="1.6" />
            <polygon points="446,394 470,388 470,470 400,470" fill="#9FC0E0" opacity="0.08" />
            <polygon points="540,376 626,376 660,470 540,470" fill="url(#s2glass)" stroke="#141A24" strokeWidth="1.6" />
            {/* wheel arches to seat the tyres */}
            {[402, 700].map((cx, i) => <path key={"ar" + i} d={`M ${cx - 66} 606 a 66 52 0 0 1 132 0 z`} fill="#0C0F15" opacity="0.92" />)}
            {[402, 700].map((cx, i) => <path key={"al" + i} d={`M ${cx - 66} 606 a 66 52 0 0 1 132 0`} fill="none" stroke="#8E8577" strokeWidth="2.2" />)}
          </svg>

          {/* HERO: warm, eyes visible, leaning into the wheel, willing it forward. */}
          <div style={{ position: "absolute", left: 386, top: 348, width: 200, height: 200, mixBlendMode: "screen", pointerEvents: "none", background: "radial-gradient(circle at 40% 42%, rgba(255,214,150,0.22), transparent 62%)" }} />
          <div style={{ position: "absolute", left: 402, top: 352, transformOrigin: "50% 100%", transform: `rotate(${heroLean}deg)` }}>
            <Mascot lf={lf} size={132} gaze={heroGaze} stern={heroStern} nodAmp={0} />
          </div>

          {/* VILLAIN: small, dim, secondary. He owns the back seat while you are pinned to the brake. */}
          <div style={{ position: "absolute", left: 560, top: 356, opacity: 0.5, filter: "blur(1.4px) saturate(0.82)", transformOrigin: "50% 100%", transform: `rotate(${-3 + Math.sin(lf * 0.14) * 1.2}deg)` }}>
            <Villain lf={lf} size={92} rain={0} nodAmp={0} />
          </div>
          <div style={{ position: "absolute", left: 596, top: 348, opacity: 0.4, filter: "blur(1px)" }}>
            <CodeRain lf={lf} x={0} y={0} h={92} cols={1} o={0.5} gap={13} />
          </div>

          {/* NEAR-SIDE DOOR PANEL: drawn over the sprites' lower halves so heads read in the windows.
              Carries the one big L-plate and the single DONE sticker. */}
          <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
            {/* front door panel */}
            <path d="M 356 472 L 512 472 L 512 566 L 320 566 C 306 566 306 540 306 522 C 306 502 330 478 356 472 Z" fill="url(#s2body)" stroke={INK} strokeWidth="2" />
            {/* rear quarter panel */}
            <path d="M 512 472 L 660 472 L 712 476 L 776 482 C 798 484 802 508 802 530 L 798 566 L 512 566 Z" fill="url(#s2body)" stroke={INK} strokeWidth="2" />
            <rect x="512" y="474" width="288" height="3" fill="#FFFDF6" opacity="0.4" />
            {/* B-pillar: thin, quiet, does not split the frame */}
            <rect x="512" y="376" width="8" height="96" fill="#20252F" opacity="0.7" />
            {/* door seam + handle */}
            <rect x="510" y="482" width="3" height="80" fill="#8E8577" opacity="0.5" />
            <rect x="452" y="500" width="30" height="9" rx="4" fill="#8E96A4" stroke={INK} strokeWidth="1.2" />
            {/* driving-school chevrons on the sill */}
            {Array.from({ length: 6 }).map((_, i) => (
              <polygon key={"cv" + i} points={`${372 + i * 40},560 ${390 + i * 40},560 ${376 + i * 40},536 ${358 + i * 40},536`} fill={i % 2 ? CLAY : "#2B3140"} opacity="0.9" />
            ))}
            {/* THE L-PLATE: big, square, the universal learner mark. Rattles on each stomp. */}
            <g transform={`rotate(${-3 + impact * Math.sin(lf * 3.2) * 6} 400 512)`}>
              <rect x="368" y="480" width="64" height="64" rx="6" fill="#F7F4ED" stroke="#8E8577" strokeWidth="2" />
              <text x="400" y="536" fill={RED} fontFamily={fraunces.fontFamily} fontWeight="900" fontSize="52" textAnchor="middle">L</text>
            </g>
            {/* side mirror */}
            <rect x="356" y="486" width="6" height="14" fill="#39414F" />
            <rect x="340" y="482" width="20" height="14" rx="4" fill="#59626F" stroke={INK} strokeWidth="1.4" />
          </svg>
          {/* the one self-issued DONE sticker, slapped on the rear glass. Dim, singular. */}
          <DoneSticker x={600} y={420} s={0.4} rot={-11} o={0.82} />
        </div>

        {/* ==================== FOCAL VIGNETTE: sink the periphery so the eye lands low-centre. ==================== */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 520px 420px at 400px 620px, transparent 34%, rgba(6,9,15,0.42) 74%, rgba(4,7,12,0.66) 100%)" }} />

        {/* ==================== THE KEY LIGHT: a warm pool on the boot and pedal. Flares on impact. ==================== */}
        <div style={{ position: "absolute", left: 190, top: 470, width: 420, height: 320, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(ellipse 46% 50% at 46% 62%, rgba(255,231,190,${0.30 + impact * 0.34}) 0%, rgba(255,210,148,${0.12 + impact * 0.16}) 46%, transparent 74%)` }} />

        {/* ==================== THE ONE ACTION: GIANT BOOT on the CHROME BRAKE. ==================== */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
          {/* the brake linkage running up to the front wheel: this pedal stops THIS car */}
          <path d="M 372 668 L 402 604" stroke="url(#s2chr)" strokeWidth="7" strokeLinecap="round" opacity="0.8" transform={`translate(${carX + csx} ${csy})`} />
          {/* the chrome pedal, depressed under the boot */}
          <g transform={`translate(0 ${pedalPress * 9})`}>
            <rect x="316" y="662" width="118" height="22" rx="9" fill="url(#s2chr)" stroke="#2E3540" strokeWidth="2" />
            <rect x="316" y="662" width="118" height="22" rx="9" fill={RED} opacity={glow * 0.5} />
            <rect x="322" y="666" width="70" height="4" rx="2" fill="#FFFFFF" opacity={0.7 - glow * 0.3} />
            <ellipse cx="375" cy="674" rx="66" ry="18" fill={RED} opacity={glow * 0.28} style={{ filter: "blur(9px)" }} />
            {/* ridged tread on the pad */}
            {Array.from({ length: 7 }).map((_, i) => <rect key={"pr" + i} x={324 + i * 15} y={664} width="6" height="18" rx="2" fill="#3A424F" opacity="0.6" />)}
          </g>

          {/* the impact shockwave ring */}
          {ringR > 0 ? <circle cx="375" cy="672" r={ringR} fill="none" stroke="#FFE7BE" strokeWidth={3.4 * impact} opacity={impact * 0.7} /> : null}

          {/* THE GIANT BOOT, stomping down. Toe left, sole flat on the pad. The heaviest, darkest silhouette. */}
          <g transform={`translate(0 ${-bootLift})`}>
            {/* sole */}
            <path d="M 272 654 Q 268 640 288 638 L 452 640 Q 470 640 470 658 L 470 672 Q 470 682 456 682 L 288 682 Q 270 682 268 668 Z" fill="#0A0C11" stroke="#05070A" strokeWidth="1.5" />
            <rect x="290" y="674" width="168" height="8" rx="3" fill="#141821" />
            {Array.from({ length: 9 }).map((_, i) => <rect key={"tr" + i} x={296 + i * 18} y={676} width="8" height="6" rx="2" fill="#2A2F39" />)}
            {/* upper */}
            <path d="M 300 640 L 300 548 Q 300 512 344 508 L 416 508 Q 452 508 456 546 L 460 640 Z" fill="url(#s2boot)" stroke="#05070A" strokeWidth="2" />
            {/* shaft */}
            <path d="M 320 512 L 322 470 Q 324 452 356 452 L 410 452 Q 438 452 438 484 L 440 512 Z" fill="url(#s2boot)" stroke="#05070A" strokeWidth="2" />
            <rect x="318" y="470" width="124" height="7" rx="3" fill="#2E3542" opacity="0.7" />
            {/* toe cap + heel definition */}
            <path d="M 300 640 L 300 596 Q 300 578 322 576 L 356 576 L 360 640 Z" fill="#0E1119" opacity="0.6" />
            {/* laces */}
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={"lc" + i}>
                <path d={`M 340 ${536 + i * 20} L 420 ${528 + i * 20}`} stroke="#3A414E" strokeWidth="3" strokeLinecap="round" />
                <circle cx="340" cy={536 + i * 20} r="2.6" fill="#5A6270" />
                <circle cx="420" cy={528 + i * 20} r="2.6" fill="#5A6270" />
              </g>
            ))}
            {/* a crisp key-side highlight so the boot has form, not a flat blob */}
            <path d="M 306 636 L 306 552 Q 306 520 342 516" fill="none" stroke="#3E4757" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
          </g>

          {/* dust kicked out on the stomp */}
          {impact > 0.04 && Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI - 0.2;
            const d = (1 - impact) * (18 + seed(i * 3) * 40);
            return <circle key={"dk" + i} cx={375 + (i < 4 ? -1 : 1) * Math.cos(a) * d} cy={684 - Math.abs(Math.sin(a)) * d * 0.6} r={2 + seed(i * 2) * 4} fill="#C9CFD9" opacity={impact * 0.5 * (1 - (1 - impact))} />;
          })}
        </svg>

        {/* warm dust motes drifting up through the key light: quiet, continuous life */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const r = seed(i * 2.7 + 1);
            const p = ((lf * (0.5 + r * 0.7) + r * 60) % 60) / 60;
            const x = 250 + r * 260 + Math.sin(p * 5 + r * 6) * 14;
            const y = 700 - p * 190;
            return <circle key={"mo" + i} cx={x} cy={y} r={0.9 + r * 1.6} fill="#FFF1D6" opacity={(0.18 + r * 0.4) * (1 - p) * 0.8} />;
          })}
        </svg>

        {/* ==================== THE GAUGE: one honest number. Speed welded to zero. ==================== */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx="150" cy="694" r="50" fill="#0E131C" stroke="#2A3340" strokeWidth="3" />
          <circle cx="150" cy="694" r="50" fill="none" stroke="#4A5566" strokeWidth="1" opacity="0.5" />
          {/* tick sweep */}
          {Array.from({ length: 9 }).map((_, i) => {
            const ta = (150 + i * 22.5) * Math.PI / 180;
            const hot = i >= 7;
            return <line key={"tk" + i} x1={150 + Math.cos(ta) * 40} y1={694 + Math.sin(ta) * 40} x2={150 + Math.cos(ta) * 46} y2={694 + Math.sin(ta) * 46} stroke={hot ? RED : "#7A8494"} strokeWidth={hot ? 3 : 2} />;
          })}
          {/* needle, pinned at zero, quivering on the revs */}
          <line x1="150" y1="694" x2={150 + Math.cos(na) * 36} y2={694 + Math.sin(na) * 36} stroke={AMBER} strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="150" cy="694" r="6" fill="#C9CFD9" stroke="#2A3340" strokeWidth="1.5" />
          <text x="150" y="682" fill="#EDEAE0" fontFamily={fraunces.fontFamily} fontWeight="900" fontSize="22" textAnchor="middle">0</text>
          <text x="150" y="724" fill={MUTE} fontFamily={inter.fontFamily} fontWeight="700" fontSize="9" textAnchor="middle" letterSpacing="1.5">KM / H</text>
        </svg>

        {/* ==================== FOREGROUND FINISH: soft floor shadow + gentle inset vignette. ==================== */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1012, height: 84, background: "linear-gradient(180deg, transparent, rgba(6,8,13,0.8))" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 170px rgba(4,7,12,0.8)" }} />

      </div>
    </Panel>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const ip = (xs: number[], ys: number[], ease?: (n: number) => number) =>
    interpolate(lf, xs, ys, ease ? { ...clamp, easing: ease } : clamp);
  const pulse = (at: number, len: number) => (lf >= at ? Math.max(0, 1 - (lf - at) / len) : 0);
  const cl = (v: number) => Math.max(0, Math.min(1, v));
  const GL = 640;            // ground line
  const VPX = 972, VPY = 640; // vanishing point

  // ===================== CAMERA: one unbroken push, 5deg crane down from f150 =====================
  const shk = pulse(170, 9) * 5.4 + pulse(188, 13) * 10;      // fourth rivet + the shatter. Nothing else shakes.
  const sx = Math.sin(lf * 4.1) * shk, sy = Math.cos(lf * 5.3) * shk * 0.55;
  const camS = ip([0, 254], [1.0, 1.098]);
  const camOX = ip([0, 254], [566, 312]);                      // settles onto the LEFT PASSAGE
  const camOY = ip([0, 254], [508, 566]);
  const craneY = ramp(lf, 150, 254) * 15;

  // ===================== FOCAL ANCHOR: the one place the eye is meant to be =====================
  // Early it rides the hero+villain confrontation; when the gate swings in it walks onto the PLATE,
  // then punches onto the SHATTER. The recession scrim and the key-light both track this point.
  const fx = ip([0, 108, 138, 188, 254], [452, 470, 690, 690, 704]);
  const fy = ip([0, 108, 138, 188, 200, 254], [538, 538, 492, 474, 486, 504]);
  const spot = ip([0, 118, 150, 186, 194, 254], [0.42, 0.42, 0.72, 0.82, 1, 0.66]); // ramps as the gate lands, peaks on the break
  const spotR = ip([0, 118, 150, 188, 200, 254], [438, 438, 372, 336, 306, 348]);    // radius of the clear key-hole
  const flash = pulse(188, 11);                                                        // the shatter's key-light stab

  // ===================== LIGHT ORDER =====================
  const mastLife = (blow: number) => (lf < blow - 7 ? 1 : lf < blow ? (seed(Math.floor(lf * 2.6) + blow) > 0.42 ? 1 : 0.22) : 0);
  const nearL = mastLife(64), nearR = mastLife(72);
  const sodAlive = Math.max(nearL, nearR);
  const BANKS = [
    { x: 110, hy: 95, by: 790, s: 1.0, at: 88 },
    { x: 340, hy: 228, by: 742, s: 0.74, at: 100 },
    { x: 545, hy: 324, by: 706, s: 0.55, at: 112 },
    { x: 730, hy: 404, by: 682, s: 0.40, at: 124 },
    { x: 870, hy: 462, by: 664, s: 0.29, at: 140 },
    { x: 975, hy: 511, by: 650, s: 0.20, at: 248 },
  ];
  // a bank does not snap on: it stutters up on its ballast
  const bankLit = (at: number) => (lf < at ? 0 : Math.min(1, ramp(lf, at, at + 9) * (seed(Math.floor(lf / 2) + at) > 0.25 || lf > at + 10 ? 1 : 0.35)));
  const floodUp = BANKS.reduce((a, b, i) => a + bankLit(b.at) * [0.42, 0.2, 0.15, 0.11, 0.08, 0.04][i], 0);
  const dark = cl(1 - sodAlive * 0.86 - floodUp * 0.96);

  // ===================== L2: THE VILLAIN =====================
  // ROOF PLANE y=548. He stands on the wreck's roof at x=505, a full body and a half above the
  // kneeling hero at 430, and crucially CLEAR of the plate's face (x=601 to 773), so the scene's one
  // header and its cast 1 are never behind him. At f180 he LEAPS 185px right at the rule and the die
  // lands on its face at (690,470). The leap is the tell: it is the only thing he ever commits to.
  const vSpring = ip([176, 180, 188], [0, -6, -70], Easing.out(Easing.quad)) * (lf >= 176 && lf < 188 ? 1 : 0);
  const vCrouch = lf >= 176 && lf < 180 ? 7 : 0;
  const vFeet = lf < 188 ? 548 + vCrouch + vSpring
    : ip([188, 194, 200, 224, 254], [466, 480, 726, 726, 688], Easing.inOut(Easing.quad));
  const vCx = lf < 188 ? 505 + ip([180, 188], [0, 185], Easing.in(Easing.quad)) : ip([188, 194, 200, 224, 254], [690, 712, 700, 700, 890]);
  const vScale = ip([200, 224, 254], [0.84, 0.84, 0.45]);
  const vSize = 320 * vScale;
  const vRag = lf < 188 ? 0 : ip([188, 196, 202, 210], [0, 96, 92, 0], Easing.inOut(Easing.quad)); // thrown, flat, back up
  const vLean = lf >= 38 && lf < 52 ? Math.sin(cl((lf - 38) / 14) * Math.PI) : 0;                  // the slap over the hero's shoulder
  const vRain = lf < 188 ? 1 : 0.5 * (seed(Math.floor(lf / 3) + 9) > 0.3 ? 1 : 0.25);              // glitched from the shatter, never recovers
  const vDab = lf >= 206 ? Math.sin(lf * 0.5) * 5 : 0;

  // ===================== L1: THE HERO =====================
  const hCx = ip([0, 78, 96, 208, 218], [430, 430, 330, 330, 225]);
  const hFeet = ip([0, 78, 96, 150, 168], [706, 706, 716, 716, 738]);
  const hKneel = ip([0, 150, 168], [1, 1, 0]);                    // 1 = on the deck, 0 = standing
  const hSize = 269;
  const U = hSize / 200;
  const hRock = pulse(42, 10) * 13;                                // the stamp lands
  const hScrub = lf >= 58 && lf < 148 && lf !== 72 ? Math.sin(lf * 0.62) : 0;
  const doneW = ip([42, 58, 70, 130], [30, 30, 52, 62]);          // the lie spreads the more he scrubs it
  const hDuck = pulse(196, 12) * 16;
  const nubUp = ip([222, 240], [0, 1], Easing.out(Easing.cubic));  // he measures himself. Nobody asked him to.

  // ===================== L4: THE ARM =====================
  const armUp = ip([206, 210, 216, 218], [0, 1, 1, 0], Easing.inOut(Easing.cubic));
  const armTick = lf >= 218 ? Math.sin((lf - 218) * 0.9) * Math.max(0.25, pulse(218, 40)) * 1.6 : 0;
  const armRot = -78 * armUp + armTick;
  // POSITIVE = raised (origin is the arm's right end, so +deg swings the tip UP off the chute).
  // It starts down at f236 and is STILL descending on the cut frame. The scene ends on a door closing, not closed.
  const chuteRot = 78 - (lf >= 236 ? ramp(lf, 236, 286) * 78 : 0);

  // ===================== L3: THE GATE (crane jib swings it in HORIZONTALLY, never from above) =====================
  const gateIn = lf >= 120;
  const gX = ip([120, 146], [-1046, 0], Easing.out(Easing.cubic)) + (lf < 148 ? Math.sin((lf - 120) * 0.44) * 44 * (1 - ramp(lf, 120, 148)) : 0);
  const gY = lf < 148 ? -15 : ip([148, 150], [-15, 0], Easing.in(Easing.quad)) + pulse(150, 11) * Math.sin(lf * 1.5) * 3;
  const RIV = [152, 158, 164, 170];
  const ring = RIV.reduce((a, r) => a + pulse(r, 26) * Math.sin((lf - r) * 0.9) * 1.4, 0) + Math.sin(lf * 0.55) * 0.5;
  const gRot = gateIn ? ring * 0.09 : 0;

  const rivetHit = RIV.reduce((a, r) => Math.max(a, pulse(r, 6)), 0);

  // his nine counterfeit passes, scabbed over the wreck (S1's shipped signature)
  const WSTK = [
    { x: 466, y: 676, r: -11 }, { x: 514, y: 634, r: 8 }, { x: 560, y: 600, r: -6 },
    { x: 608, y: 630, r: 13 }, { x: 644, y: 676, r: -9 }, { x: 500, y: 704, r: 5 },
    { x: 578, y: 698, r: -14 }, { x: 602, y: 576, r: 10 }, { x: 434, y: 712, r: -4 },
  ];

  return (
    <Panel label="one-rule-gate">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden", background: "#0B0D14" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${sx}px, ${sy - craneY}px) scale(${camS})`, transformOrigin: `${camOX}px ${camOY}px` }}>

          {/* ============ SKY ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: GL + 4, background: "linear-gradient(180deg,#141A30 0%,#232A47 52%,#3A3448 100%)" }} />
          {Array.from({ length: 20 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            return <div key={"st" + i} style={{ position: "absolute", left: 16 + r * 972, top: 34 + seed(i * 2.2) * 190, width: 2 + r * 2, height: 2 + r * 2, borderRadius: "50%", background: "rgba(214,228,255,0.7)", opacity: (0.14 + Math.abs(Math.sin(lf * 0.03 + i)) * 0.24) * (0.4 + dark * 0.6) }} />;
          })}

          {/* ============ DEEP BACKGROUND ENVIRONMENT: the lot does not end at the fence. A whole
              sodium-lit service district recedes behind it, held one tier back by the recession scrim:
              dimmer, cooler, softened, and moving slower than the focal action in front of it. ============ */}
          {/* the district's warm horizon glow + a cool wash off the far bay, screen-blended so the night
              never crushes the deep field to flat black (the scene was reading muddy without it) */}
          <div style={{ position: "absolute", left: 0, top: 452, width: 1012, height: 210, background: "linear-gradient(180deg, transparent, rgba(255,166,84,0.16) 56%, rgba(255,150,70,0.24))", mixBlendMode: "screen", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 470, top: 420, width: 620, height: 220, background: "radial-gradient(ellipse at 62% 100%, rgba(150,186,240,0.15), transparent 70%)", mixBlendMode: "screen", zIndex: 1, pointerEvents: "none" }} />

          {/* THE FAR SKYLINE: block towers with scattered lit windows and two slow aircraft beacons */}
          {[{ x: 18, w: 74, h: 148 }, { x: 96, w: 56, h: 208 }, { x: 300, w: 92, h: 116 }, { x: 618, w: 68, h: 174 }, { x: 700, w: 106, h: 128 }, { x: 812, w: 60, h: 202 }, { x: 890, w: 98, h: 156 }].map((b, bi) => {
            const cols = Math.max(2, Math.floor(b.w / 16));
            const rows = Math.max(2, Math.floor(b.h / 20));
            return (
              <React.Fragment key={"sky" + bi}>
                <div style={{ position: "absolute", left: b.x, top: 558 - b.h, width: b.w, height: b.h, background: grad("#191E30", "#0F1320"), zIndex: 1, boxShadow: "0 0 34px rgba(8,10,18,0.6)" }} />
                {Array.from({ length: cols * rows }).map((_, k) => {
                  const cx = k % cols, cy = Math.floor(k / cols), r = seed(k * 1.7 + bi * 11);
                  if (r < 0.47) return null;
                  const flick = seed(Math.floor(lf / 46) + k * 3 + bi * 7) > 0.24 ? 1 : 0.24;
                  return <div key={"wn" + k} style={{ position: "absolute", left: b.x + 5 + cx * 14, top: 558 - b.h + 10 + cy * 17, width: 6, height: 8, background: r > 0.8 ? "#CFE0FF" : "#FFC97A", opacity: 0.5 * flick, zIndex: 1 }} />;
                })}
                {bi % 3 === 1 && <div style={{ position: "absolute", left: b.x + b.w / 2 - 2, top: 558 - b.h - 4, width: 4, height: 4, borderRadius: "50%", background: "#FF4A3C", opacity: 0.36 + Math.abs(Math.sin(lf * 0.07 + bi)) * 0.5, boxShadow: "0 0 8px rgba(255,74,60,0.8)", zIndex: 1 }} />}
              </React.Fragment>
            );
          })}

          {/* THREE DISTANT SODIUM STREET LAMPS, swaying a hair in the night air, each hanging a soft cone */}
          {[{ x: 70, hy: 356 }, { x: 906, hy: 344 }, { x: 980, hy: 360 }].map((L, i) => {
            const sway = Math.sin(lf * 0.04 + i * 2.3) * 1.3;
            return (
              <React.Fragment key={"dsl" + i}>
                <div style={{ position: "absolute", left: L.x, top: L.hy, width: 4, height: 558 - L.hy, background: grad("#2A2E3C", "#151824"), zIndex: 2, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)` }} />
                <div style={{ position: "absolute", left: L.x - 15, top: L.hy - 6, width: 36, height: 8, borderRadius: 3, background: grad("#3A3E4C", "#1E2230"), zIndex: 2 }} />
                <div style={{ position: "absolute", left: L.x - 11, top: L.hy - 2, width: 26, height: 5, borderRadius: 3, background: "#FFC873", opacity: 0.7, boxShadow: "0 0 16px rgba(255,190,90,0.8)", zIndex: 2 }} />
                <div style={{ position: "absolute", left: L.x - 48, top: L.hy, width: 104, height: 220, background: "linear-gradient(180deg,rgba(255,196,90,0.16),transparent)", clipPath: "polygon(44% 0%,56% 0%,100% 100%,0% 100%)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />
              </React.Fragment>
            );
          })}

          {/* THE JIFFY LOOB SERVICE UNIT: the knockoff shop the dropped sign belonged to, still lit at the
              back, its extractor fan idling. Read THROUGH the fence and the two-post lift in front of it. */}
          <div style={{ position: "absolute", left: 772, top: 432, width: 236, height: 132, background: grad("#2A2636", "#191623"), border: "1px solid rgba(200,186,160,0.12)", zIndex: 2, boxShadow: "0 0 44px rgba(6,8,16,0.6)" }}>
            <div style={{ position: "absolute", left: 0, top: 8, width: "100%", height: 25, background: grad("#5A4A1E", "#33290F"), borderTop: "1px solid rgba(233,190,59,0.2)", borderBottom: "1px solid rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, letterSpacing: "-0.02em", color: "rgba(233,190,59,0.5)" }}>JIFFY LOOB</div>
            </div>
            {[0, 1, 2, 3].map((k) => (
              <div key={"jw" + k} style={{ position: "absolute", left: 12 + k * 56, top: 48, width: 44, height: 58, background: "rgba(255,196,110,0.22)", border: "1px solid rgba(255,210,140,0.16)", opacity: seed(Math.floor(lf / 58) + k) > 0.2 ? 1 : 0.5 }}>
                <div style={{ position: "absolute", left: 9, top: 12, width: 12, height: 32, background: "rgba(28,24,18,0.5)" }} />
              </div>
            ))}
            {/* the roof extractor fan, slowly turning */}
            <div style={{ position: "absolute", left: 198, top: -15, width: 26, height: 26, borderRadius: "50%", border: "2px solid rgba(120,130,146,0.4)", background: "rgba(20,22,30,0.5)" }}>
              {[0, 1, 2].map((k) => <div key={"fn" + k} style={{ position: "absolute", left: 10, top: 3, width: 3, height: 10, background: "rgba(130,140,156,0.55)", transformOrigin: "50% 100%", transform: `rotate(${lf * 4 + k * 120}deg)` }} />)}
            </div>
          </div>
          <div style={{ position: "absolute", left: 760, top: 562, width: 156, height: 9, background: grad("#3A3E4C", "#1E2230"), zIndex: 2 }} />

          {/* THE FUEL-PUMP ISLAND: the forecourt still has one, dead, on its kerb, hose hung back on the hook */}
          <div style={{ position: "absolute", left: 6, top: 548, width: 122, height: 16, borderRadius: 3, background: grad("#3A3644", "#1F1C27"), zIndex: 2 }} />
          <div style={{ position: "absolute", left: 34, top: 470, width: 44, height: 82, borderRadius: "5px 5px 2px 2px", background: grad("#3E4656", "#20242F"), border: "1px solid rgba(200,216,240,0.14)", zIndex: 2, boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 8, top: 10, width: 28, height: 20, borderRadius: 2, background: "rgba(150,186,240,0.14)", border: "1px solid rgba(180,206,240,0.16)" }} />
            <div style={{ position: "absolute", left: 12, top: 14, width: 20, height: 5, background: "rgba(255,196,90,0.4)", opacity: seed(Math.floor(lf / 30)) > 0.4 ? 0.8 : 0.2 }} />
            <div style={{ position: "absolute", left: 10, top: 38, width: 24, height: 9, borderRadius: 1, background: "rgba(18,22,18,0.7)" }} />
          </div>
          <svg width={150} height={130} style={{ position: "absolute", left: 0, top: 470, zIndex: 2, pointerEvents: "none" }}>
            <path d={`M 78 22 Q ${98 + Math.sin(lf * 0.05) * 4} 72 68 98`} fill="none" stroke="rgba(16,14,20,0.8)" strokeWidth={4} />
          </svg>

          {/* drifting night haze, three slow banks crossing the deep field */}
          {[0, 1, 2].map((i) => {
            const dx = ((lf * (0.18 + i * 0.12) + i * 460) % 1440) - 320;
            return <div key={"hz" + i} style={{ position: "absolute", left: 0, top: 468 + i * 34, width: 520, height: 66, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(150,166,196,${0.06 - i * 0.012}), transparent 70%)`, transform: `translateX(${dx}px)`, filter: "blur(10px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />;
          })}
          {/* slow embers rising off a brazier just out of frame on the right */}
          {Array.from({ length: 10 }).map((_, i) => {
            const r = seed(i * 3.3 + 51), t = ((lf * (0.3 + r * 0.5) + r * 500) % 500) / 500;
            return <div key={"emb" + i} style={{ position: "absolute", left: 760 + r * 232, top: 562 - t * 186, width: 2 + r * 2, height: 2 + r * 2, borderRadius: "50%", background: "#FFB25A", opacity: (1 - t) * 0.5 * (0.4 + r * 0.4), boxShadow: "0 0 5px rgba(255,150,70,0.7)", zIndex: 2 }} />;
          })}

          {/* ============ CHAIN-LINK BACK FENCE + its rattling banner ============ */}
          <div style={{ position: "absolute", left: 0, top: 558, width: 950, height: 82, background: "repeating-linear-gradient(58deg, rgba(176,190,208,0.30) 0 1px, transparent 1px 9px), repeating-linear-gradient(-58deg, rgba(176,190,208,0.30) 0 1px, transparent 1px 9px)", borderTop: "2px solid rgba(176,190,208,0.4)", zIndex: 2 }} />
          {[60, 250, 440, 630, 800, 920].map((x, i) => <div key={"fp" + i} style={{ position: "absolute", left: x, top: 552, width: 5, height: 90, background: "#4E5763", zIndex: 2 }} />)}
          <div style={{ position: "absolute", left: 300, top: 566, width: 120, height: 42, background: grad("#8D3A2E", "#5B241C"), border: "1px solid rgba(255,200,180,0.2)", zIndex: 3, transformOrigin: "0% 0%", transform: `rotate(${Math.sin(lf * 0.17) * 2.4}deg) skewY(${Math.sin(lf * 0.23) * 3}deg)`, boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }} />

          {/* three warning placards wired to the back fence, swinging a hair (kept off the plate's face) */}
          {[{ x: 90, k: "diag", c1: "#E8C33A", c2: "#8A6E10" }, { x: 800, k: "bar", c1: "#C93A28", c2: "#7A1E12" }, { x: 882, k: "dot", c1: "#2E5FA8", c2: "#183A66" }].map((s, i) => {
            const sw = Math.sin(lf * 0.06 + i * 2) * 2.2;
            return (
              <div key={"warn" + i} style={{ position: "absolute", left: s.x, top: 566, width: 34, height: 34, zIndex: 3, transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
                <div style={{ position: "absolute", left: 16, top: -6, width: 2, height: 8, background: "rgba(200,210,224,0.4)" }} />
                {s.k === "diag" && <div style={{ position: "absolute", left: 4, top: 4, width: 26, height: 26, background: grad(s.c1, s.c2), border: "2px solid rgba(20,18,10,0.6)", transform: "rotate(45deg)", boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }}><div style={{ position: "absolute", left: 11, top: 5, width: 4, height: 13, background: "rgba(20,18,10,0.85)", transform: "rotate(-45deg)" }} /><div style={{ position: "absolute", left: 11, top: 20, width: 4, height: 4, borderRadius: "50%", background: "rgba(20,18,10,0.85)", transform: "rotate(-45deg)" }} /></div>}
                {s.k === "bar" && <div style={{ position: "absolute", left: 0, top: 9, width: 34, height: 18, borderRadius: 2, background: grad(s.c1, s.c2), border: "1px solid rgba(255,200,190,0.3)", boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }}><div style={{ position: "absolute", left: 5, top: 7, width: 24, height: 4, background: "rgba(245,240,232,0.9)" }} /></div>}
                {s.k === "dot" && <div style={{ position: "absolute", left: 2, top: 2, width: 30, height: 30, borderRadius: "50%", background: grad(s.c1, s.c2), border: "1px solid rgba(200,220,250,0.3)", boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }}><div style={{ position: "absolute", left: 12, top: 6, width: 6, height: 12, background: "rgba(240,244,252,0.85)" }} /></div>}
              </div>
            );
          })}
          {/* two oil drums stacked against the far-left fence, and a rust-red tool cart parked at the back right */}
          {[{ x: 6, y: 578 }, { x: 46, y: 584 }].map((d, i) => (
            <div key={"drum" + i} style={{ position: "absolute", left: d.x, top: d.y, width: 34, height: 54, borderRadius: "5px 5px 3px 3px", background: grad("#4A4230", "#241F14"), border: "1px solid rgba(200,186,150,0.16)", zIndex: 3, boxShadow: "0 6px 12px rgba(0,0,0,0.55)" }}>
              <div style={{ position: "absolute", left: 0, top: 16, width: 34, height: 3, background: "rgba(230,222,196,0.14)" }} />
              <div style={{ position: "absolute", left: 0, top: 34, width: 34, height: 3, background: "rgba(230,222,196,0.12)" }} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 786, top: 540, width: 60, height: 40, borderRadius: 3, background: grad("#8A3320", "#4A1A0E"), border: "1px solid rgba(255,190,150,0.2)", zIndex: 3, boxShadow: "0 6px 13px rgba(0,0,0,0.55)" }}>
            {[0, 1, 2].map((k) => <div key={"tk" + k} style={{ position: "absolute", left: 5, top: 6 + k * 11, width: 50, height: 6, borderRadius: 1, background: "rgba(20,18,24,0.5)" }} />)}
            <div style={{ position: "absolute", left: 8, top: 38, width: 12, height: 12, borderRadius: "50%", background: grad("#2A2630", "#12101a"), border: "1px solid #3A3540" }} />
            <div style={{ position: "absolute", left: 40, top: 38, width: 12, height: 12, borderRadius: "50%", background: grad("#2A2630", "#12101a"), border: "1px solid #3A3540" }} />
          </div>

          {/* ============ THE SHUTTERED UNIT (no roller shutter: S0 owns that verb) ============ */}
          <div style={{ position: "absolute", left: 180, top: 250, width: 380, height: 390, background: grad("#342E42", "#201B2C"), border: "2px solid rgba(200,186,160,0.2)", borderRadius: "6px 6px 0 0", zIndex: 4, boxShadow: "0 20px 44px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 180, top: 270, width: 380, height: 60, background: "rgba(20,16,26,0.7)", borderTop: "1px solid rgba(190,176,150,0.12)", borderBottom: "1px solid rgba(190,176,150,0.12)", zIndex: 5 }} />
          {/* the fascia letters, coming off one every 30 frames and never finishing */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const dropAt = [130, 160, 190, 220, 250][i];
            const gone = dropAt !== undefined && lf >= dropAt;
            const fall = gone ? Math.min(1, (lf - dropAt) / 26) : 0;
            return <div key={"fa" + i} style={{ position: "absolute", left: 206 + i * 56, top: 282 + fall * fall * 340, width: 34, height: 36, borderRadius: 3, background: gone ? "#4A4250" : grad("#C9B79A", "#7A6A52"), opacity: gone ? 1 - fall * 0.4 : 0.5 + Math.abs(Math.sin(lf * 0.05 + i)) * 0.12, transform: `rotate(${fall * (i % 2 ? 64 : -70)}deg)`, zIndex: 6, boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }} />;
          })}
          {/* caged windows */}
          {[0, 1, 2].map((i) => (
            <div key={"cw" + i} style={{ position: "absolute", left: 206 + i * 118, top: 352, width: 88, height: 74, background: "rgba(8,10,18,0.85)", border: "2px solid #3B3546", zIndex: 6, backgroundImage: "repeating-linear-gradient(52deg, rgba(150,160,180,0.30) 0 1px, transparent 1px 8px), repeating-linear-gradient(-52deg, rgba(150,160,180,0.30) 0 1px, transparent 1px 8px)" }} />
          ))}
          {/* THE KEY CABINET: wired glass, red LOCKED bolt, the ring inside. Never lit. Never approached. */}
          <div style={{ position: "absolute", left: 200, top: 470, width: 50, height: 44, background: "#151723", border: "2px solid #39424E", zIndex: 6, backgroundImage: "repeating-linear-gradient(50deg, rgba(140,152,172,0.26) 0 1px, transparent 1px 7px), repeating-linear-gradient(-50deg, rgba(140,152,172,0.26) 0 1px, transparent 1px 7px)", boxShadow: "inset 0 0 12px rgba(0,0,0,0.9)" }}>
            <div style={{ position: "absolute", left: 18, top: 12, width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(160,140,80,0.5)" }} />
            <div style={{ position: "absolute", left: 23, top: 24, width: 3, height: 11, background: "rgba(160,140,80,0.5)" }} />
            <div style={{ position: "absolute", left: -4, top: 18, width: 12, height: 7, borderRadius: 2, background: "rgba(150,50,40,0.75)" }} />
          </div>
          {/* the dead tube sign on a broken ballast: strobing the entire scene */}
          <div style={{ position: "absolute", left: 300, top: 442, width: 150, height: 14, borderRadius: 7, background: "#C9D6E8", opacity: seed(Math.floor(lf / 2)) > 0.62 ? 0.5 : 0.05, boxShadow: seed(Math.floor(lf / 2)) > 0.62 ? "0 0 22px rgba(200,220,245,0.6)" : "none", zIndex: 6 }} />
          {/* the skip + the burst bin bag whose shreds never stop flapping */}
          <div style={{ position: "absolute", left: 452, top: 594, width: 96, height: 48, background: grad("#4E5A48", "#26301F"), border: "1px solid rgba(200,220,190,0.18)", transform: "skewX(-7deg)", zIndex: 7, boxShadow: "0 8px 16px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 542, top: 610, width: 26, height: 30, borderRadius: "8px 8px 4px 4px", background: "#14161E", zIndex: 7 }} />
          {Array.from({ length: 6 }).map((_, i) => {
            const r = seed(i * 4.3 + 2);
            return <div key={"sh" + i} style={{ position: "absolute", left: 546 + r * 22, top: 606 + r * 26, width: 4 + r * 9, height: 3, background: "#14161E", transformOrigin: "0% 50%", transform: `rotate(${Math.sin(lf * (0.16 + r * 0.2) + i) * 42}deg)`, zIndex: 8 }} />;
          })}

          {/* ============ THE JIFFY LOOB SIGN: the old regime's promise, unbolted and dropped ============ */}
          {(() => {
            const fall = ramp(lf, 126, 140);
            const wob = lf >= 140 ? Math.sin((lf - 140) * 0.42) * 3.4 * Math.max(0.16, 1 - (lf - 140) / 190) : 0; // still rocking at f254
            const y = ip([126, 140], [250, 612], Easing.in(Easing.quad));
            const bolts = [0, 1, 2, 3].map((i) => 95 + i * 10);
            return (
              <div style={{ position: "absolute", left: 620, top: y, width: 260, height: fall > 0.98 ? 30 : 95, zIndex: 9, transform: `rotate(${fall * 2 + wob}deg) scaleY(${1 - fall * 0.68})`, transformOrigin: "50% 100%", boxShadow: "0 14px 30px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: fall > 0.9 ? grad("#6E6A5E", "#3B382F") : grad("#E9BE3B", "#B9861F"), border: `3px solid ${fall > 0.9 ? "#4A4638" : "#A6321F"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: fall > 0.9 ? 1 : (lf % 89) < 3 ? 0.6 : 1, boxShadow: fall > 0.9 ? "none" : `0 0 ${20 + Math.abs(Math.sin(lf * 0.1)) * 14}px rgba(233,190,59,0.3)` }}>
                  {fall < 0.9 && <>
                    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#84271A", lineHeight: 1, letterSpacing: "-0.02em" }}>JIFFY LOOB</div>
                    <div style={{ fontFamily: mono, fontSize: 8.5, fontWeight: 700, color: "rgba(56,24,12,0.85)", letterSpacing: 0.8, marginTop: 4 }}>CERTIFIED IN 5 MINUTES OR IT'S FREE</div>
                  </>}
                </div>
                {bolts.map((b, i) => lf < b + 8 && <div key={"bo" + i} style={{ position: "absolute", left: 14 + (i % 2) * 224, top: 12 + Math.floor(i / 2) * 66, width: 9, height: 9, borderRadius: "50%", background: "#6B5A2E", border: "1px solid rgba(255,240,180,0.3)", transform: `rotate(${lf * 22}deg)`, opacity: 1 - ramp(lf, b, b + 8) }} />)}
              </div>
            );
          })()}

          {/* ============ THE FESTOON: dragged slack when the sign drops, caught by the gate at f132 ============ */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 10, pointerEvents: "none" }}>
            {(() => {
              const slack = ramp(lf, 126, 138) * 66;
              const caught = gateIn ? ramp(lf, 132, 150) : 0;
              const ax = 620, ay = 268 + slack * 0.7;
              const midY = 400 + slack - caught * 6 + Math.sin(lf * 0.09) * (3 - caught * 2.2);
              return <>
                <path d={`M ${ax} ${ay} Q 370 ${midY} 120 300`} fill="none" stroke="rgba(200,190,170,0.42)" strokeWidth={2} />
                {Array.from({ length: 13 }).map((_, i) => {
                  const t = (i + 0.5) / 13;
                  const px = ax + (120 - ax) * t;
                  const py = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * midY + t * t * 300;
                  const fl = Math.sin(lf * (0.2 + seed(i) * 0.24) + i) * (lf < 126 ? 9 : 3.5);
                  return <polygon key={"fe" + i} points={`${px - 7},${py} ${px + 7},${py} ${px},${py + 15}`} fill={["#C9553E", "#D9A23C", "#4E7EA6", "#CFCABC"][i % 4]} opacity={0.62} transform={`rotate(${fl} ${px} ${py})`} />;
                })}
              </>;
            })()}
          </svg>

          {/* ============ THE SIX FLOOD MASTS: the lot's dead hardware, energised by hand ============ */}
          {BANKS.map((b, i) => {
            const on = bankLit(b.at);
            const w = 46 * b.s;
            return (
              <React.Fragment key={"bk" + i}>
                <div style={{ position: "absolute", left: b.x - 4 * b.s, top: b.hy, width: 8 * b.s, height: b.by - b.hy, background: grad("#3E4653", "#1D222C"), zIndex: 11 }} />
                <div style={{ position: "absolute", left: b.x - w / 2, top: b.hy - 12 * b.s, width: w, height: 22 * b.s, borderRadius: 3, background: grad("#525B69", "#252A34"), border: `${1.4 * b.s}px solid rgba(200,220,245,0.24)`, zIndex: 12, boxShadow: on > 0.1 ? `0 0 ${26 * b.s * on}px rgba(196,220,250,${0.6 * on})` : "none" }} />
                <div style={{ position: "absolute", left: b.x - w / 2 + 3 * b.s, top: b.hy + 5 * b.s, width: w - 6 * b.s, height: 6 * b.s, background: "#E8F2FF", opacity: on, zIndex: 13, boxShadow: `0 0 ${20 * b.s * on}px rgba(220,238,255,0.9)` }} />
              </React.Fragment>
            );
          })}

          {/* ============ THE FOUR DEEP SODIUM MASTS: the pivot marches AWAY from camera ============ */}
          {[{ x: 560, by: 690, hy: 470, s: 0.42, at: 92 }, { x: 700, by: 672, hy: 512, s: 0.30, at: 112 }, { x: 810, by: 658, hy: 540, s: 0.23, at: 132 }, { x: 885, by: 650, hy: 556, s: 0.18, at: 150 }].map((m, i) => {
            const live = mastLife(m.at);
            return (
              <React.Fragment key={"dm" + i}>
                <div style={{ position: "absolute", left: m.x - 3 * m.s * 3, top: m.hy, width: 6 * m.s * 3, height: m.by - m.hy, background: grad("#3A3340", "#1C1A22"), zIndex: 11 }} />
                <div style={{ position: "absolute", left: m.x - 22 * m.s, top: m.hy - 6, width: 44 * m.s, height: 10 * m.s + 4, borderRadius: 4, background: "#FFD383", opacity: live * 0.9, zIndex: 12, boxShadow: `0 0 ${30 * m.s * live}px rgba(255,196,90,0.9)` }} />
                <div style={{ position: "absolute", left: m.x - 80 * m.s, top: m.hy, width: 160 * m.s, height: m.by - m.hy + 30, background: "linear-gradient(180deg,rgba(255,196,90,0.22),transparent)", clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", opacity: live, zIndex: 12, pointerEvents: "none" }} />
              </React.Fragment>
            );
          })}

          {/* ============ THE TWO NEAR SODIUM MASTS: the old lawless orange, and it dies on his face ============ */}
          {[{ x: 205, by: 778, hy: 185, live: nearL, blow: 64, moth: true }, { x: 490, by: 758, hy: 230, live: nearR, blow: 72, moth: false }].map((m, i) => (
            <React.Fragment key={"nm" + i}>
              <div style={{ position: "absolute", left: m.x - 6, top: m.hy, width: 12, height: m.by - m.hy, background: grad("#3E3646", "#1D1A24"), zIndex: 11 }} />
              <div style={{ position: "absolute", left: m.x - 40, top: m.hy - 16, width: 80, height: 20, borderRadius: "7px 7px 13px 13px", background: grad("#4C4454", "#241F2C"), border: "1.5px solid rgba(255,220,160,0.2)", zIndex: 12 }} />
              <div style={{ position: "absolute", left: m.x - 31, top: m.hy - 1, width: 62, height: 10, borderRadius: 5, background: "#FFD383", opacity: m.live * (0.86 + Math.abs(Math.sin(lf * 1.9 + i * 2)) * 0.14), zIndex: 13, boxShadow: `0 0 ${30 * m.live}px rgba(255,196,90,0.95)` }} />
              {m.moth && <div style={{ position: "absolute", left: m.x - 8, top: m.hy + 1, width: 15, height: 7, borderRadius: "50%", background: "rgba(30,18,10,0.65)", opacity: m.live, zIndex: 14 }} />}
              <div style={{ position: "absolute", left: m.x - 250, top: m.hy, width: 500, height: 700, background: "linear-gradient(180deg,rgba(255,198,96,0.34),rgba(255,178,80,0.09) 56%,transparent)", clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", opacity: m.live, zIndex: 13, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: m.x - 210, top: m.by - 108, width: 420, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,186,86,0.30), transparent 68%)", filter: "blur(7px)", mixBlendMode: "screen", opacity: m.live, zIndex: 16, pointerEvents: "none" }} />
              {/* the filament goes, and the glass comes down through its own dying cone */}
              {lf >= m.blow && lf < m.blow + 40 && Array.from({ length: 7 }).map((_, k) => {
                const r = seed(k * 2.7 + i * 5);
                const t = (lf - m.blow) / 40;
                return <div key={"gl" + k} style={{ position: "absolute", left: m.x - 26 + r * 52, top: m.hy + 6 + t * t * (m.by - m.hy), width: 3 + r * 3, height: 3 + r * 3, background: "#DDE9FA", opacity: (1 - t) * 0.8, zIndex: 14, transform: `rotate(${lf * 9}deg)` }} />;
              })}
            </React.Fragment>
          ))}

          {/* ============ THE APRON ============ */}
          <div style={{ position: "absolute", left: 0, top: GL, width: 1012, height: 152, background: "linear-gradient(180deg,#3B3442 0%,#463C46 42%,#51434A 100%)", zIndex: 14 }} />
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 15, pointerEvents: "none" }}>
            {[-300, 40, 300, 560, 780, 1240].map((bx, i) => <line key={"cv" + i} x1={bx} y1={792} x2={VPX} y2={VPY} stroke="rgba(255,196,120,0.07)" strokeWidth={2} />)}
            {/* THE LANE PAINT: two hard white lines converging on the point */}
            <line x1={500} y1={792} x2={952} y2={650} stroke="rgba(240,244,250,0.62)" strokeWidth={5} />
            <line x1={735} y1={792} x2={960} y2={646} stroke="rgba(240,244,250,0.5)" strokeWidth={4} />
          </svg>
          {Array.from({ length: 3 }).map((_, i) => {
            const r = seed(i * 3.7 + 1);
            return <div key={"oil" + i} style={{ position: "absolute", left: 120 + i * 250, top: 690 + r * 60, width: 130 + r * 60, height: 26 + r * 12, borderRadius: "50%", background: "rgba(8,6,12,0.5)", filter: "blur(4px)", zIndex: 15 }} />;
          })}
          {/* deep tarmac markings: a faded keep-clear box and its worn chevrons, recessive up near the horizon */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 15, pointerEvents: "none" }}>
            <path d="M 66 700 L 300 700 L 340 656 L 100 656 Z" fill="none" stroke="rgba(230,224,200,0.13)" strokeWidth={2} />
            {[0, 1, 2, 3, 4].map((i) => <line key={"chv" + i} x1={120 + i * 34} y1={686} x2={168 + i * 34} y2={654} stroke="rgba(230,224,200,0.14)" strokeWidth={3} />)}
          </svg>
          {/* two traffic cones set back on the lane, and the district's own boom barrier, long since dropped */}
          {[{ x: 812, y: 648, s: 0.5 }, { x: 876, y: 636, s: 0.42 }].map((c, i) => (
            <div key={"cone" + i} style={{ position: "absolute", left: c.x, top: c.y, width: 26 * c.s, height: 36 * c.s, zIndex: 16 }}>
              <div style={{ position: "absolute", left: 0, top: 29 * c.s, width: 26 * c.s, height: 7 * c.s, borderRadius: 2, background: grad("#B4551F", "#5E2A0E") }} />
              <div style={{ position: "absolute", left: 6 * c.s, top: 0, width: 14 * c.s, height: 30 * c.s, background: grad("#D9581F", "#7A2E0C"), clipPath: "polygon(32% 0,68% 0,100% 100%,0 100%)" }} />
              <div style={{ position: "absolute", left: 5 * c.s, top: 13 * c.s, width: 16 * c.s, height: 5 * c.s, background: "rgba(240,238,230,0.5)" }} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 998, top: 596, width: 10, height: 72, background: grad("#6A7280", "#2C323C"), zIndex: 16, opacity: 0.68 }} />
          <div style={{ position: "absolute", left: 846, top: 604, width: 160, height: 8, borderRadius: 2, background: "repeating-linear-gradient(90deg,#C93A28 0 14px,#DEDBD2 14px 28px)", transformOrigin: "100% 50%", transform: "rotate(1.5deg)", zIndex: 16, opacity: 0.64, boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
          {/* the cast-iron drain grate */}
          <div style={{ position: "absolute", left: 412, top: 730, width: 58, height: 22, borderRadius: 3, background: "#191720", border: "2px solid #3A3540", zIndex: 16, backgroundImage: "repeating-linear-gradient(90deg,#3A3540 0 3px, #100E16 3px 8px)" }} />
          {/* the wheel-nut the impacts keep nudging: a slow arc across the whole scene */}
          <div style={{ position: "absolute", left: ip([0, 254], [560, 505]) + rivetHit * 3, top: ip([0, 254], [770, 790]), width: 11, height: 11, borderRadius: 2, background: grad("#9AA3B2", "#4A5260"), transform: `rotate(${lf * 2.6}deg)`, zIndex: 17, boxShadow: "0 3px 6px rgba(0,0,0,0.6)" }} />

          {/* ============ THE PUDDLE: the best surface in the scene ============ */}
          <div style={{ position: "absolute", left: 240, top: 706, width: 180, height: 38, borderRadius: "50%", overflow: "hidden", zIndex: 17, boxShadow: "inset 0 0 18px rgba(0,0,0,0.8)", background: "#0A0910" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,190,88,0.5),rgba(255,150,60,0.12))", opacity: sodAlive * 0.9 }} />
            {BANKS.map((b, i) => <div key={"pr" + i} style={{ position: "absolute", left: 10 + i * 28, top: 0, width: 22, height: 38, background: "linear-gradient(180deg,rgba(214,236,255,0.62),transparent)", opacity: bankLit(b.at) * 0.75, filter: "blur(2px)" }} />)}
            {/* the rule arrives in the water a beat before it arrives in the frame */}
            {gateIn && <div style={{ position: "absolute", left: 24 + gX * 0.14, top: 6, width: 130, height: 26, background: "linear-gradient(180deg,rgba(150,168,190,0.5),transparent)", opacity: ramp(lf, 120, 132) * 0.8, filter: "blur(1.4px)" }} />}
            {/* the rings the fourth rivet put in it, still unsettled at f254 */}
            {lf >= 170 && [0, 1, 2].map((k) => {
              const t = ((lf - 170 + k * 12) % 46) / 46;
              return <div key={"rg" + k} style={{ position: "absolute", left: 90 - t * 84, top: 19 - t * 17, width: t * 168, height: t * 34, borderRadius: "50%", border: "1.5px solid rgba(220,236,255,0.4)", opacity: (1 - t) * 0.6 }} />;
            })}
            {/* in the near-black, the ONLY lit thing in the frame is his rain, and the water repeats it */}
            <div style={{ position: "absolute", left: 62, top: 0, opacity: cl(dark * 1.1) * 0.9 }}><CodeRain lf={lf * -1} x={0} y={0} h={38} cols={3} gap={13} o={1} /></div>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(6,5,10,0.7))` }} />
          </div>
          {/* the attendant's squeegee ripples, which never dry */}
          <div style={{ position: "absolute", left: 254, top: 712 + Math.sin(lf * 0.3) * 2, width: 150, height: 24, borderRadius: "50%", border: "1px solid rgba(255,210,150,0.14)", opacity: sodAlive * 0.6 + floodUp * 0.3, zIndex: 18 }} />

          {/* ============ THE TYRE STACK, and the one the fourth rivet knocks off ============ */}
          {[0, 1, 2].map((i) => <div key={"ty" + i} style={{ position: "absolute", left: 45, top: 714 - i * 26, width: 90, height: 28, borderRadius: "50%", background: grad("#22202A", "#0E0D14"), border: "2px solid #33303C", zIndex: 17, boxShadow: "0 5px 10px rgba(0,0,0,0.6)" }} />)}
          {(() => {
            const t = ramp(lf, 170, 254);
            return <div style={{ position: "absolute", left: 45 + t * 96, top: 640 + t * 84, width: 90 - t * 8, height: 28 + t * 56, borderRadius: t > 0.1 ? "50%" : "50%", background: grad("#22202A", "#0E0D14"), border: "2px solid #33303C", zIndex: 18, transform: `rotate(${t * 420}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.6)" }} />;
          })()}

          {/* ============ THE EMPTY TWO-POST LIFT: the old regime's machine, on the wrong side of a fence ============ */}
          {[690, 812].map((px, i) => (
            <div key={"lp" + i} style={{ position: "absolute", left: px, top: 520, width: 18, height: 152, borderRadius: 3, background: grad("#8A7328", "#4A3D16"), border: "1px solid rgba(255,240,190,0.16)", zIndex: 16, opacity: 0.72 }}>
              <div style={{ position: "absolute", left: -4, top: 144, width: 26, height: 9, borderRadius: 3, background: "#2B2732" }} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 704, top: 652, width: 74, height: 8, borderRadius: 3, background: grad("#7C8496", "#3A4150"), zIndex: 16, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 800, top: 652, width: 40, height: 8, borderRadius: 3, background: grad("#7C8496", "#3A4150"), zIndex: 16, opacity: 0.55 }} />

          {/* ============ BACKGROUND RECESSION: the whole busy lot drops one tier back ============
              A masked backdrop-filter softens + desaturates everything painted below z30 (the sky, the
              fence, the shuttered unit, the JIFFY LOOB, the festoon, the masts, the night crew), while a
              radial hole over the focal keeps the gate + hero + villain crisp. Then a dark vignette scrim
              sinks the periphery toward black so the eye has one lit place to go. */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 30, pointerEvents: "none", backdropFilter: "blur(3px) saturate(0.6) brightness(0.9)", WebkitBackdropFilter: "blur(3px) saturate(0.6) brightness(0.9)", maskImage: `radial-gradient(ellipse ${spotR}px ${spotR * 0.82}px at ${fx}px ${fy}px, transparent 0%, transparent 33%, #000 78%)`, WebkitMaskImage: `radial-gradient(ellipse ${spotR}px ${spotR * 0.82}px at ${fx}px ${fy}px, transparent 0%, transparent 33%, #000 78%)` }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 30, pointerEvents: "none", background: `radial-gradient(ellipse ${spotR}px ${spotR * 0.82}px at ${fx}px ${fy}px, transparent 0%, transparent 30%, rgba(6,8,15,${0.5 * spot}) 72%, rgba(4,5,11,${0.68 * spot}) 100%)` }} />
          {/* THE KEY LIGHT: a soft cool spot that rides the focal and stabs on the shatter */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 31, mixBlendMode: "screen", pointerEvents: "none", background: `radial-gradient(ellipse ${spotR * 0.72}px ${spotR * 0.6}px at ${fx}px ${fy}px, rgba(208,226,255,${0.14 * spot + flash * 0.42}), rgba(184,208,248,${0.05 * spot}) 46%, transparent 70%)` }} />

          {/* ============ THE WRECK: his podium, then his wall, then his evidence ============
              It is DOWNSTAGE of the gate's foot line (y=700), so it occludes the gate, not the reverse.
              Cabin roof dropped to y=548 so it can never eat the plate's text band (y=406 to 545). */}
          <div style={{ position: "absolute", left: 410, top: 736, width: 300, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.62)", filter: "blur(9px)", zIndex: 34 }} />
          {/* the door it already lost, flat on the concrete */}
          <div style={{ position: "absolute", left: 400, top: 735, width: 70, height: 25, borderRadius: "8px 5px 5px 8px", background: grad("#8E887C", "#4B4A44"), border: "1.5px solid rgba(255,255,255,0.16)", transform: "rotate(-5deg) skewX(-16deg)", zIndex: 34, boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }} />
          {/* haunch + body, slumped on its rims, nose down-left */}
          <div style={{ position: "absolute", left: 430, top: 668, width: 250, height: 80, borderRadius: "10px 14px 6px 6px", background: grad("#A2988A", "#524C45"), border: "2px solid rgba(255,235,215,0.2)", transform: "skewY(-2.6deg)", zIndex: 34, boxShadow: "0 14px 26px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.16)" }} />
          <div style={{ position: "absolute", left: 480, top: 548, width: 150, height: 124, borderRadius: "18px 12px 2px 2px", background: grad("#948A7C", "#443F3A"), border: "2px solid rgba(255,235,215,0.18)", transform: "skewY(-2deg)", zIndex: 34, boxShadow: "0 12px 22px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 14, top: 18, width: 118, height: 50, borderRadius: 4, background: grad("#263043", "#0F1520"), border: "1.5px solid rgba(170,196,240,0.2)" }} />
          </div>
          {/* both front wheels gone: the bare hubs */}
          {[444, 654].map((hx, i) => (
            <div key={"hb" + i} style={{ position: "absolute", left: hx, top: 726, width: 34, height: 34, borderRadius: "50%", background: grad("#5C452E", "#241A11"), border: "3px solid rgba(255,190,120,0.16)", zIndex: 34, boxShadow: "inset 0 2px 7px rgba(0,0,0,0.9)" }}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 12 + Math.cos(k * 1.57) * 10, top: 12 + Math.sin(k * 1.57) * 10, width: 4, height: 4, borderRadius: "50%", background: "#15100B" }} />)}
            </div>
          ))}
          {/* NINE counterfeit passes, scabbed over it. One curling off the windscreen. */}
          {WSTK.map((s, i) => (
            <div key={"ws" + i} style={{ position: "absolute", left: s.x, top: s.y, width: 34, height: 27, borderRadius: 4, background: grad("#C6CE5C", "#8B9635"), border: "1.5px solid rgba(255,252,206,0.4)", transform: `rotate(${s.r}deg) scaleY(${i === 2 ? 0.62 + Math.sin(lf * 0.14) * 0.12 : 1})`, transformOrigin: "50% 0%", zIndex: 35, boxShadow: "0 4px 8px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#242C08" }}>DONE</div>
          ))}
          {/* THE LIGHT BAR: his footrest, and it rattles on every rivet */}
          <div style={{ position: "absolute", left: 510, top: 534 + rivetHit * 2, width: 90, height: 14, borderRadius: 3, background: grad("#5A6272", "#2A303C"), border: "1px solid rgba(200,220,245,0.28)", zIndex: 35, transform: `rotate(${(lf >= 170 ? Math.sin(lf * 0.42) * 1.4 : 0)}deg)` }}>
            <div style={{ position: "absolute", left: 6, top: 3, width: 24, height: 8, borderRadius: 2, background: "rgba(214,72,58,0.85)" }} />
            {/* the cracked lens, hanging by its wire, knocked clean off when he tumbles past it */}
            {lf < 196 && <div style={{ position: "absolute", left: 56, top: 3 + (lf > 170 ? 3 : 0), width: 22, height: 8, borderRadius: 2, background: "rgba(86,132,206,0.75)", transformOrigin: "0% 0%", transform: `rotate(${lf > 170 ? 26 + Math.sin(lf * 0.5) * 8 : 4}deg)` }} />}
          </div>
          {lf >= 196 && lf < 224 && Array.from({ length: 5 }).map((_, k) => {
            const r = seed(k * 3.3 + 11), t = (lf - 196) / 28;
            return <div key={"lx" + k} style={{ position: "absolute", left: 658 + r * 40 + t * 30, top: 520 + t * t * 210, width: 4 + r * 3, height: 3, background: "rgba(120,170,230,0.7)", opacity: 1 - t, zIndex: 23, transform: `rotate(${lf * 11}deg)` }} />;
          })}
          {/* THE GREEN TARP: loaded on screen from f0, and it is the last thing he ever gets to hide */}
          {(() => {
            const over2 = ramp(lf, 228, 240);
            const lift = Math.sin(lf * 0.24) * 4 * (1 - over2);
            return (
              <div style={{ position: "absolute", left: 650 - over2 * 170, top: 706 - over2 * 178, width: 44 + over2 * 236, height: 30 + over2 * 76, borderRadius: 6, background: grad("#355C3C", "#16291B"), border: "1.5px solid rgba(120,170,130,0.2)", zIndex: 35, transform: `rotate(${-4 + lift - over2 * 3}deg) skewX(${-8 + lift}deg)`, boxShadow: "0 8px 18px rgba(0,0,0,0.65)", opacity: 0.95 }}>
                <div style={{ position: "absolute", left: 4, top: 3, width: "40%", height: 5, borderRadius: 3, background: "rgba(170,210,170,0.14)" }} />
                {/* folds, so it drapes instead of floating as a board */}
                {over2 > 0.2 && [0.2, 0.44, 0.68, 0.88].map((fx, k) => (
                  <div key={"tf" + k} style={{ position: "absolute", left: `${fx * 100}%`, top: 0, width: 3, height: "100%", background: k % 2 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.28)", transform: `skewX(${-6 + k * 3}deg)`, opacity: over2 }} />
                ))}
                {over2 > 0.5 && <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 10, borderRadius: 6, background: "rgba(255,255,255,0.07)" }} />}
              </div>
            );
          })()}
          {/* the cowl's lazy smoke column: a background layer that lights up WHITE in shafts 4, 5 and 6 */}
          {Array.from({ length: 13 }).map((_, i) => {
            const r = seed(i * 2.9 + 5);
            const t = ((lf * (1.5 + r * 1.2) + r * 300) % 300) / 300;
            const yy = 660 - t * 380, xx = 506 + r * 40 + t * (44 + r * 60);
            const inShaft = lf >= 140 && xx > 690 && yy < 620;
            const sz = 26 + r * 46 + t * 76;
            return <div key={"sm" + i} style={{ position: "absolute", left: xx, top: yy, width: sz, height: sz, borderRadius: "50%", background: inShaft ? `rgba(216,232,250,${0.2 * ramp(lf, 140, 160)})` : `rgba(${Math.floor(56 + r * 30)},${Math.floor(50 + r * 24)},${Math.floor(50 + r * 22)},0.26)`, filter: "blur(8px)", opacity: (1 - t) * 0.72, zIndex: 23, pointerEvents: "none" }} />;
          })}

          {/* ============ FLOOD SHAFTS + the dust that enters each one AS IT STRIKES and never leaves ============ */}
          {BANKS.map((b, i) => {
            const on = bankLit(b.at);
            if (on <= 0.01) return null;
            const reach = i === 5 ? ramp(lf, 248, 340) : 1;   // bank 6's shaft has NOT reached the floor at f254
            const w = 420 * b.s;
            return (
              <React.Fragment key={"sf" + i}>
                <div style={{ position: "absolute", left: b.x - w / 2, top: b.hy + 4, width: w, height: (792 - b.hy) * reach, background: `linear-gradient(180deg,rgba(206,228,255,${0.28 * on}),rgba(190,214,250,0.05) 62%,transparent)`, clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", zIndex: 25, pointerEvents: "none" }} />
                {reach > 0.85 && <div style={{ position: "absolute", left: b.x - 230 * b.s, top: 700 - 60 * b.s, width: 460 * b.s, height: 150 * b.s, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(198,222,255,${0.26 * on}), transparent 68%)`, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 25, pointerEvents: "none" }} />}
                {i < 5 && Array.from({ length: 9 }).map((_, k) => {
                  const r = seed(k * 3.1 + i * 7);
                  const t = (((lf - b.at) * (0.22 + r * 0.5) + r * 360) % 360) / 360;
                  const yy = b.hy + t * (792 - b.hy);
                  const spread = (yy - b.hy) / (792 - b.hy);
                  return <div key={"dm" + k} style={{ position: "absolute", left: b.x + (r - 0.5) * w * spread * 0.9, top: yy, width: 2 + r * 3, height: 2 + r * 3, borderRadius: "50%", background: "#EAF3FF", opacity: on * (0.12 + r * 0.3) * (1 - t * 0.5), zIndex: 26 }} />;
                })}
              </React.Fragment>
            );
          })}
          {/* the two sodium cones' warm amber motes, before the world went cold */}
          {sodAlive > 0.02 && Array.from({ length: 14 }).map((_, i) => {
            const r = seed(i * 2.2 + 13);
            const yy = 190 + ((lf * (0.5 + r) + r * 560) % 560);
            return <div key={"am" + i} style={{ position: "absolute", left: (i % 2 ? 205 : 490) + (r - 0.5) * 190, top: yy, width: 2 + r * 3, height: 2 + r * 3, borderRadius: "50%", background: "#FFD9A0", opacity: sodAlive * (0.2 + r * 0.35), zIndex: 26 }} />;
          })}

          {/* ============ THE NIGHT CREW: nobody built this by magic. Six blokes in hi-vis at 3am. ============ */}
          {/* THE SPIDER BOX + THE SPARKY: every light in this scene is a Claude's nub on a lever */}
          <div style={{ position: "absolute", left: 406, top: 738, width: 48, height: 40, borderRadius: 3, background: grad("#B4551F", "#5E2A0E"), border: "1.5px solid rgba(255,200,150,0.28)", zIndex: 27, boxShadow: "0 6px 12px rgba(0,0,0,0.6)" }}>
            {BANKS.map((b, i) => (
              <div key={"br" + i} style={{ position: "absolute", left: 5 + (i % 3) * 13, top: 6 + Math.floor(i / 3) * 15, width: 8, height: 11, borderRadius: 1, background: lf >= b.at ? "#D8E4A0" : "#2A2B22", transformOrigin: "50% 0%", transform: `rotate(${lf >= b.at ? 0 : 26}deg)` }} />
            ))}
          </div>
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 26, pointerEvents: "none" }}>
            {BANKS.map((b, i) => <path key={"fd" + i} d={`M 430 776 Q ${(430 + b.x) / 2} ${790 + (i % 2 ? 6 : -4)} ${b.x} ${b.by - 4}`} fill="none" stroke="rgba(18,16,22,0.75)" strokeWidth={3.4} />)}
          </svg>
          {(() => { // the sparky, still leaning on the last lever at f254
            const px = ip([0, 88, 100, 112, 124, 140, 248], [372, 372, 376, 380, 384, 388, 392]);
            const throwing = BANKS.some((k) => Math.abs(lf - k.at) < 5);
            return (
              <div style={{ position: "absolute", left: px, top: 686, width: 76, height: 76, zIndex: 28 }}>
                <div style={{ position: "absolute", left: 6, top: 68, width: 62, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(4px)" }} />
                <Mascot lf={lf} size={76} gaze={2} nodAmp={throwing ? 4 : 1} nodSpeed={9} hiVis={1} tint="#B9B3A6" />
                <div style={{ position: "absolute", left: 54, top: 30, width: 22, height: 5, borderRadius: 2, background: "#D8DCE4", transformOrigin: "0% 50%", transform: `rotate(${throwing ? -34 : -8}deg)` }} />
              </div>
            );
          })()}

          {/* THE ATTENDANT: conscripted into the OS and he has not noticed */}
          {(() => {
            const wand = lf >= 112;
            const guiding = lf >= 120 && lf < 150;
            const swing = wand ? Math.sin(lf * (guiding ? 0.42 : 0.3)) * (guiding ? 32 : 20) : Math.sin(lf * 0.3) * 16;
            return (
              <div style={{ position: "absolute", left: 356, top: 674, width: 82, height: 82, zIndex: 28 }}>
                <div style={{ position: "absolute", left: 6, top: 74, width: 68, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(4px)" }} />
                <Mascot lf={lf} size={82} gaze={guiding ? 3 : -2} nodAmp={2.4} nodSpeed={11} hiVis={1} tint="#C6BFAE" />
                {/* the bent-handle bucket, never used */}
                <div style={{ position: "absolute", left: -16, top: 56, width: 22, height: 20, borderRadius: "2px 2px 6px 6px", background: grad("#6E7788", "#2B3240"), border: "1px solid rgba(200,220,250,0.2)" }} />
                {/* the squeegee, plucked out of his nub mid-swipe at f112 and replaced with a lit wand */}
                <div style={{ position: "absolute", left: 62, top: 40, transformOrigin: "0% 50%", transform: `rotate(${swing}deg)` }}>
                  <div style={{ width: 40, height: 4, borderRadius: 2, background: wand ? "#C8531F" : "#7A6A52" }} />
                  {wand
                    ? <div style={{ position: "absolute", left: 34, top: -4, width: 16, height: 12, borderRadius: 3, background: "#FF8A3C", boxShadow: `0 0 ${12 + Math.abs(Math.sin(lf * 0.4)) * 12}px rgba(255,140,60,0.9)` }} />
                    : <div style={{ position: "absolute", left: 34, top: -5, width: 6, height: 14, borderRadius: 1, background: "#2F3A48" }} />}
                </div>
              </div>
            );
          })()}

          {/* THE CHERRY-PICKER + THE BOLT-GUN CLAUDE */}
          {(() => {
            const by = ip([138, 150], [700, 560], Easing.out(Easing.cubic));
            const firing = RIV.some((r) => Math.abs(lf - r) < 4) || Math.abs(lf - 210) < 5;
            return (
              <>
                <div style={{ position: "absolute", left: 462, top: by + 62, width: 22, height: 792 - by - 62, background: grad("#5A6274", "#262B36"), zIndex: 27 }} />
                <div style={{ position: "absolute", left: 424, top: 748, width: 100, height: 30, borderRadius: 4, background: grad("#D9A11E", "#7A5A10"), border: "1px solid rgba(255,240,190,0.24)", zIndex: 28 }} />
                <div style={{ position: "absolute", left: 430, top: by, width: 90, height: 64, borderRadius: 4, border: "3px solid #C8A02A", borderTop: "none", background: "rgba(40,36,20,0.28)", zIndex: 29, boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 444, top: by - 46, width: 64, height: 64, zIndex: 29 }}>
                  <Mascot lf={lf} size={64} gaze={3} nodAmp={firing ? 4.6 : 1.4} nodSpeed={8} hiVis={1} tint="#BFB8A6" />
                  <div style={{ position: "absolute", left: 48, top: 26, width: 26, height: 7, borderRadius: 2, background: "#5A6274", transformOrigin: "0% 50%", transform: `rotate(${firing ? -12 : 6}deg)` }} />
                </div>
                {/* the coiled air line, trailing to a compressor puttering on the apron */}
                <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 28, pointerEvents: "none" }}>
                  <path d={`M 500 ${by + 20} Q 540 ${by + 130} 470 760`} fill="none" stroke="rgba(24,22,30,0.8)" strokeWidth={3} />
                </svg>
              </>
            );
          })()}

          {/* THE TEARDOWN BOOM LIFT: it never finishes */}
          {(() => {
            const bx = ip([95, 130, 254], [700, 700, 200]);
            const unb = lf >= 95 && lf < 126;
            return (
              <div style={{ position: "absolute", left: bx, top: 288, width: 70, height: 70, zIndex: 28 }}>
                <div style={{ position: "absolute", left: 24, top: 58, width: 16, height: 300, background: grad("#4E5665", "#212630"), transform: "rotate(6deg)", transformOrigin: "50% 0%" }} />
                <div style={{ position: "absolute", left: 0, top: 12, width: 68, height: 50, borderRadius: 3, border: "3px solid #A8892A", borderTop: "none", background: "rgba(40,36,20,0.25)" }} />
                <div style={{ position: "absolute", left: 8, top: -22, width: 54, height: 54 }}>
                  <Mascot lf={lf} size={54} gaze={unb ? 3 : -3} nodAmp={2} nodSpeed={10} hiVis={1} tint="#BFB8A6" />
                </div>
                {/* one letter still in his nub at f254 */}
                {lf >= 130 && <div style={{ position: "absolute", left: 52, top: 18, width: 18, height: 20, borderRadius: 2, background: grad("#C9B79A", "#7A6A52"), transform: `rotate(${Math.sin(lf * 0.2) * 12}deg)` }} />}
              </div>
            );
          })()}

          {/* THE PAINT BUGGY: still 60px short of the point at f254 */}
          {(() => {
            const t = ramp(lf, 180, 254) * 0.874;
            const px = 500 + 452 * t, py = 792 - 142 * t;
            const s = 1 - t * 0.5;
            const aside = lf >= 232 && lf < 244 ? 16 : 0;
            return (
              <div style={{ position: "absolute", left: px - 26 * s, top: py - 74 * s - aside, width: 90 * s, height: 90 * s, zIndex: 27 }}>
                <Mascot lf={lf} size={72 * s} gaze={2} nodAmp={2.6} nodSpeed={7} hiVis={1} tint="#BAB3A2" />
                <div style={{ position: "absolute", left: 56 * s, top: 44 * s, width: 34 * s, height: 24 * s, borderRadius: 3, background: grad("#C9CFDC", "#4A5260") }} />
                {/* fine mist, thrown into flood shaft 5 */}
                {lf >= 180 && Array.from({ length: 6 }).map((_, k) => {
                  const r = seed(k * 2.4 + 3);
                  return <div key={"mi" + k} style={{ position: "absolute", left: 60 * s + r * 30, top: 30 * s - ((lf * 1.4 + r * 40) % 40), width: 2, height: 2, borderRadius: "50%", background: "#EDF4FF", opacity: (0.5 - r * 0.3) * bankLit(140) }} />;
                })}
              </div>
            );
          })()}

          {/* ============ THE ARMCO: the fence does not decide to rise. A guy kicks it. ============ */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5, at = 196 + i * 2;
            if (lf < at) return null;
            const p = over(lf, at, 5, Easing.out(Easing.back(2)));
            const x = 770 - 340 * t, y = 697 + 95 * t, s = 1 + t * 0.5;
            return <div key={"aa" + i} style={{ position: "absolute", left: x - 38 * s, top: y - 26 * s, width: 76 * s, height: 20 * s, opacity: p, zIndex: 37, transform: `translateY(${(1 - p) * 26}px) rotate(${-6 * t}deg)`, background: "repeating-linear-gradient(90deg,#9AA3AF 0px,#9AA3AF 6px,#606A78 6px,#606A78 11px)", border: `${1.4 * s}px solid rgba(224,236,250,0.3)`, borderRadius: 2, filter: i === 3 ? "saturate(0.5) brightness(0.85)" : "none", boxShadow: "0 6px 14px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.24)" }} />;
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5, at = 224 + i * 5.2;
            if (lf < at) return null;
            const p = over(lf, at, 5, Easing.out(Easing.back(2)));
            const x = 770 + 180 * t, y = 697 - 45 * t, s = 1 - t * 0.45;
            return <div key={"ab" + i} style={{ position: "absolute", left: x - 38 * s, top: y - 26 * s, width: 76 * s, height: 20 * s, opacity: p * 0.95, zIndex: 24, transform: `translateY(${(1 - p) * 22}px)`, background: "repeating-linear-gradient(90deg,#8E97A3 0px,#8E97A3 6px,#586170 6px,#586170 11px)", border: `${1.2}px solid rgba(214,228,246,0.26)`, borderRadius: 2, boxShadow: "0 5px 11px rgba(0,0,0,0.5)" }} />;
          })}
          {/* THE LATCH-KICKER, walking each run with a bar */}
          {lf >= 194 && lf < 256 && (() => {
            const runA = lf < 214;
            const t = runA ? ramp(lf, 194, 208) : ramp(lf, 222, 252);
            const x = runA ? 782 - 350 * t : 764 + 184 * t;
            const y = runA ? 690 + 96 * t : 692 - 46 * t;
            const s = runA ? 0.78 + t * 0.3 : 0.76 - t * 0.3;
            const kick = Math.abs(Math.sin(lf * 0.5)) > 0.8 ? 1 : 0;
            return (
              <div style={{ position: "absolute", left: x - 40 * s, top: y - 84 * s, width: 92 * s, height: 92 * s, zIndex: 38 }}>
                <Mascot lf={lf} size={86 * s} gaze={runA ? -3 : 3} nodAmp={3.4} nodSpeed={7} hiVis={1} tint="#BEB6A4" />
                <div style={{ position: "absolute", left: (runA ? -14 : 74) * s, top: 52 * s, width: 30 * s, height: 4 * s, borderRadius: 2, background: "#8E96A6", transformOrigin: `${runA ? 100 : 0}% 50%`, transform: `rotate(${kick ? (runA ? 40 : -40) : 8}deg)` }} />
              </div>
            );
          })()}

          {/* ============ THE ONE-RULE GATE: architecture. It never strikes anything. Things strike IT. ============ */}
          {gateIn && (
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 32, transform: `translate(${gX}px, ${gY}px) rotate(${gRot}deg)`, transformOrigin: "506px 700px" }}>
              {/* the two heavy uprights, driven into the tarmac */}
              {[{ x: 8 }, { x: 954 }].map((u, i) => (
                <React.Fragment key={"up" + i}>
                  <div style={{ position: "absolute", left: u.x, top: 380, width: 50, height: 320, background: grad("#7A8290", "#333A46"), border: "2px solid rgba(216,230,248,0.3)", borderRadius: 2, boxShadow: "0 14px 30px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.22)" }}>
                    <div style={{ position: "absolute", left: 4, top: 90, width: 42, height: 8, background: "rgba(150,86,30,0.4)", filter: "blur(1px)" }} />
                  </div>
                  {/* foot plate, torqued at f150 */}
                  <div style={{ position: "absolute", left: u.x - 14, top: 694, width: 78, height: 16, borderRadius: 2, background: grad("#828A98", "#2E3540"), border: "1.5px solid rgba(216,230,248,0.28)", boxShadow: "0 6px 12px rgba(0,0,0,0.7)" }}>
                    {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 8 + k * 19, top: 4, width: 8, height: 8, borderRadius: "50%", background: "#5A6270", border: "1px solid rgba(230,240,255,0.3)" }} />)}
                  </div>
                </React.Fragment>
              ))}
              {/* THE AUTHORITY'S OWN INSTRUMENTS: conduit runs up each upright and it carries inspection
                  gauges, because a thing that measures others keeps dials on itself. Bolted to the posts,
                  well clear of the plate's face, needles ticking slowly. */}
              {[{ x: 0, f: 1 }, { x: 962, f: -1 }].map((u, i) => (
                <React.Fragment key={"cnd" + i}>
                  <div style={{ position: "absolute", left: u.x + (u.f > 0 ? 52 : -4), top: 410, width: 6, height: 272, background: grad("#4A5260", "#20252E"), borderRadius: 2, zIndex: 2 }} />
                  {[[452, 6], [560, -8]].map((g, k) => (
                    <div key={"gg" + k} style={{ position: "absolute", left: u.x + (u.f > 0 ? 46 : g[1]), top: g[0], width: 22, height: 22, borderRadius: "50%", background: grad("#C6CCD6", "#5A616C"), border: "2px solid #2E343E", zIndex: 3, boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }}>
                      <div style={{ position: "absolute", left: 9, top: 10.4, width: 9, height: 1.6, background: "#B4402C", transformOrigin: "0% 50%", transform: `rotate(${-40 + Math.sin(lf * 0.12 + k + i) * 24}deg)` }} />
                      <div style={{ position: "absolute", left: 8.5, top: 9.5, width: 3, height: 3, borderRadius: "50%", background: "#2E343E" }} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
              {/* THE CHAIN-LINK SKIRT, in three spans: the two passages are real GAPS in the mesh, and
                  the deep lot, the chute, the paint buggy and the bay glow all read THROUGH the rest of it. */}
              {[{ x: 58, w: 92 }, { x: 260, w: 498 }, { x: 900, w: 54 }].map((sp, i) => (
                <React.Fragment key={"sk" + i}>
                  <div style={{ position: "absolute", left: sp.x, top: 590, width: sp.w, height: 110, backgroundImage: "repeating-linear-gradient(56deg, rgba(196,210,228,0.34) 0 1.4px, transparent 1.4px 10px), repeating-linear-gradient(-56deg, rgba(196,210,228,0.34) 0 1.4px, transparent 1.4px 10px)", borderTop: "2px solid rgba(196,210,228,0.4)", borderBottom: "2px solid rgba(196,210,228,0.34)" }} />
                  {/* the mesh is strained onto a line wire at each cut edge */}
                  <div style={{ position: "absolute", left: sp.x + sp.w - 2, top: 590, width: 3, height: 110, background: "rgba(206,220,238,0.45)" }} />
                  <div style={{ position: "absolute", left: sp.x, top: 590, width: 3, height: 110, background: "rgba(206,220,238,0.45)" }} />
                </React.Fragment>
              ))}
              {/* THE CROSS-RAIL SLOT RACK: built for a rulebook. It holds one. */}
              <div style={{ position: "absolute", left: 58, top: 400, width: 896, height: 15, background: grad("#828A98", "#333A46"), border: "1px solid rgba(216,230,248,0.28)" }} />
              <div style={{ position: "absolute", left: 58, top: 575, width: 896, height: 15, background: grad("#6E7684", "#2C323C"), border: "1px solid rgba(216,230,248,0.22)" }} />
              <div style={{ position: "absolute", left: 58, top: 588, width: 896, height: 6, background: "linear-gradient(90deg, rgba(168,96,32,0.45), rgba(168,96,32,0.06) 40%, rgba(168,96,32,0.4) 78%, transparent)", filter: "blur(1.4px)" }} />
              {/* THE FOUR EMPTY SLOTS: bare steel, bolt holes drilled and empty. The joke and the number at once. */}
              {[64, 243, 422, 780].map((sxp, i) => (
                <div key={"sl" + i} style={{ position: "absolute", left: sxp, top: 400, width: 172, height: 190, border: "3px solid rgba(120,132,148,0.6)", borderRadius: 2, background: i === 1 ? "rgba(150,156,146,0.05)" : "transparent", boxShadow: "inset 0 0 22px rgba(0,0,0,0.4)" }}>
                  {[[10, 10], [154, 10], [10, 172], [154, 172]].map((p, k) => <div key={k} style={{ position: "absolute", left: p[0], top: p[1], width: 9, height: 9, borderRadius: "50%", background: "#0C0E14", border: "1.5px solid rgba(150,164,182,0.5)" }} />)}
                  {i === 1 && <div style={{ position: "absolute", left: 16, top: 22, width: 140, height: 150, background: "rgba(196,196,178,0.05)", border: "1px dashed rgba(190,192,176,0.14)" }} />}
                </div>
              ))}
              {/* THE PLATE + THE CAST 1. The scene's one header and its only number. */}
              <div style={{ position: "absolute", left: 601, top: 400, width: 172, height: 190, borderRadius: 2, background: grad("#8A8C84", "#42453E"), border: "3px solid rgba(150,160,168,0.8)", boxShadow: `0 12px 26px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.18), 0 0 ${30 * spot}px rgba(200,222,255,${0.24 * spot})`, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 5px)" }} />
                {/* THE CAST 1. Drawn as geometry, not set as a glyph: a font numeral at this size
                    overflows the slot and eats the rule. This is RAISED metal, cast into the same steel,
                    with a lit top face, a cast shadow under its own relief, and a rust weep down the stem. */}
                <svg width={46} height={150} viewBox="0 0 46 150" style={{ position: "absolute", left: 7, top: 20, overflow: "visible" }} shapeRendering="crispEdges">
                  {/* the shadow the relief throws onto the plate */}
                  <g transform="translate(3,4)">
                    <polygon points="6,24 24,8 24,120 6,120" fill="rgba(0,0,0,0.55)" />
                    <rect x={2} y={112} width={42} height={14} fill="rgba(0,0,0,0.55)" />
                  </g>
                  {/* the flag, the stem and the foot serif: cast as ONE piece of the same steel */}
                  <polygon points="6,24 24,8 24,120 6,120" fill="#ADAFA4" />
                  <rect x={2} y={112} width={42} height={14} fill="#ADAFA4" />
                  {/* proud of the plate: lit on every top face, dark down every right face */}
                  <polygon points="6,24 24,8 24,15 6,31" fill="rgba(255,255,255,0.42)" />
                  <rect x={2} y={112} width={42} height={4} fill="rgba(255,255,255,0.38)" />
                  <rect x={24} y={8} width={4} height={112} fill="rgba(0,0,0,0.34)" />
                  <rect x={44} y={112} width={3} height={14} fill="rgba(0,0,0,0.3)" />
                  {/* chipped enamel in the counters */}
                  <rect x={10} y={50} width={6} height={9} fill="rgba(38,42,36,0.4)" />
                  <rect x={13} y={88} width={5} height={6} fill="rgba(38,42,36,0.34)" />
                </svg>
                {/* one rust weep down its stem */}
                <div style={{ position: "absolute", left: 24, top: 50, width: 8, height: 86, background: "linear-gradient(180deg, rgba(168,96,32,0.45), rgba(168,96,32,0.05))", filter: "blur(1.6px)" }} />
                {/* the rule, sandblasted and stencilled. Not typed. */}
                <div style={{ position: "absolute", left: 60, top: 40, width: 106, display: "flex", flexDirection: "column", gap: 9 }}>
                  {["NO SOLO", "WORK UNTIL", "PROVEN"].map((t, i) => (
                    <div key={"pl" + i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "-0.01em", color: "#FBFAF4", textShadow: `0 2px 0 rgba(0,0,0,0.7), 0 0 ${9 + spot * 5}px rgba(206,224,255,${0.3 * spot})`, opacity: 1, lineHeight: 1.05, whiteSpace: "nowrap" }}>{t}</div>
                  ))}
                </div>
                <div style={{ position: "absolute", left: 60, top: 128, width: 96, height: 3, background: "rgba(230,232,220,0.5)" }} />
              </div>
              {/* the four rivet bosses, fired ascending in pitch */}
              {[[598, 404], [770, 404], [598, 578], [770, 578]].map((p, i) => {
                const hit = pulse(RIV[i], 7);
                return <div key={"rv" + i} style={{ position: "absolute", left: p[0], top: p[1], width: 13, height: 13, borderRadius: "50%", background: lf >= RIV[i] ? grad("#C8D2E0", "#6A7280") : "#0C0E14", border: "1.5px solid rgba(180,196,216,0.5)", transform: `scale(${1 + hit * 0.9})`, boxShadow: hit > 0 ? `0 0 ${hit * 22}px rgba(240,248,255,${hit})` : "none", zIndex: 3 }} />;
              })}
              {/* THE POINTLESS BRACKET: real institutions never stop adding hardware */}
              {lf >= 210 && <div style={{ position: "absolute", left: 690, top: 590, width: 26, height: 13, borderRadius: 2, background: grad("#8A929E", "#3C434E"), border: "1px solid rgba(210,224,244,0.3)", opacity: over(lf, 210, 5), boxShadow: "0 3px 7px rgba(0,0,0,0.6)" }} />}
              {/* THE SHAFT: one law, two arms, two answers. It rotates a few degrees on every lift and
                  every slam, so you can see the same mechanism made both decisions. It runs UNDER the
                  rack's plates, never across their faces. */}
              <div style={{ position: "absolute", left: 58, top: 560, width: 896, height: 9, borderRadius: 4, background: grad("#9AA3B0", "#4A5260"), boxShadow: "0 3px 7px rgba(0,0,0,0.6)" }} />
              {[{ cx: 260, rot: armUp * 9 }, { cx: 898, rot: (lf >= 236 ? ramp(lf, 236, 286) * 9 : 0) }].map((c, i) => (
                <React.Fragment key={"cp" + i}>
                  <div style={{ position: "absolute", left: c.cx - 9, top: 552, width: 18, height: 25, borderRadius: 2, background: grad("#B4BCC8", "#525A68"), border: "1px solid rgba(230,240,255,0.34)", transform: `rotate(${c.rot}deg)` }}>
                    <div style={{ position: "absolute", left: 7, top: 3, width: 3, height: 19, background: "rgba(20,24,30,0.6)" }} />
                  </div>
                  {/* the drop link that actually turns this arm */}
                  <div style={{ position: "absolute", left: c.cx - 2, top: i === 0 ? 488 : 566, width: 5, height: i === 0 ? 74 : 80, background: grad("#8E96A4", "#3E4552"), transformOrigin: i === 0 ? "50% 100%" : "50% 0%", transform: `rotate(${c.rot * 0.5}deg)` }} />
                </React.Fragment>
              ))}
              {/* THE HEIGHT POST + THE PRE-OWNED RED BAND (it has clearly been on other gates) */}
              <div style={{ position: "absolute", left: 250, top: 440, width: 22, height: 260, background: grad("#7C8492", "#333A46"), border: "1.5px solid rgba(216,230,248,0.3)", borderRadius: 2, boxShadow: "0 10px 20px rgba(0,0,0,0.6)" }}>
                {[0, 1, 2, 3, 4, 5].map((k) => <div key={"nt" + k} style={{ position: "absolute", left: 2, top: 18 + k * 40, width: 18, height: 2, background: "rgba(14,16,22,0.6)" }} />)}
                <div style={{ position: "absolute", left: 3, top: 132, width: 14, height: 40, background: "rgba(30,26,22,0.3)", filter: "blur(2px)" }} />
              </div>
              {lf >= 202 && (
                <div style={{ position: "absolute", left: 240, top: 471, width: 60, height: 15, opacity: over(lf, 202, 5), transformOrigin: "12% 50%", transform: `rotate(${Math.sin(lf * 0.4) * 1.2}deg)` }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: grad("#E04630", "#921F14"), border: "1px solid rgba(255,196,176,0.4)", boxShadow: "0 4px 10px rgba(0,0,0,0.65)" }} />
                  {/* it has clearly been on other gates: scuffs and chips it arrived with */}
                  <div style={{ position: "absolute", left: 26, top: 3, width: 11, height: 4, background: "rgba(60,20,14,0.5)" }} />
                  <div style={{ position: "absolute", left: 46, top: 8, width: 7, height: 4, background: "rgba(60,20,14,0.42)" }} />
                  <div style={{ position: "absolute", left: 4, top: 5, width: 5, height: 5, borderRadius: "50%", background: "#5A6270" }} />
                  <div style={{ position: "absolute", left: 33, top: 5, width: 5, height: 5, borderRadius: "50%", background: "#5A6270" }} />
                  {/* one bolt short, and its loose corner never stops swinging */}
                  <div style={{ position: "absolute", left: 53, top: 2, width: 9, height: 11, borderRadius: 1, background: "#C13A26", transformOrigin: "0% 50%", transform: `rotate(${Math.sin(lf * 0.5) * 12}deg)` }} />
                </div>
              )}
              {/* the arm's pivot housing + rubber up-stop and down-stop live with the structure */}
              <div style={{ position: "absolute", left: 262, top: 458, width: 15, height: 36, borderRadius: 3, background: grad("#4A5260", "#1E232C"), border: "1px solid rgba(200,216,238,0.24)" }} />
              <div style={{ position: "absolute", left: 246, top: 486, width: 12, height: 6, borderRadius: 2, background: "#2A2E36" }} />
              <div style={{ position: "absolute", left: 905, top: 645, width: 3, height: 55, background: grad("#7C8492", "#333A46") }} />
            </div>
          )}

          {/* THE CRANE JIB: it swings the section in HORIZONTALLY. It never descends onto anybody. */}
          {lf >= 118 && lf < 162 && (
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 33, opacity: 1 - ramp(lf, 152, 162) }}>
              <div style={{ position: "absolute", left: -40, top: 352, width: 320 + Math.max(0, gX * 0.5 + 520), height: 22, background: grad("#D9A11E", "#6E5210"), border: "1.5px solid rgba(255,240,190,0.3)", boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", left: 240 + gX * 0.5, top: 374, width: 34, height: 26, borderRadius: 3, background: grad("#8E96A6", "#3A404C"), border: "1px solid rgba(220,236,255,0.3)" }} />
              {[0, 1].map((i) => <div key={"ch" + i} style={{ position: "absolute", left: 248 + gX * 0.5 + i * 14, top: 396, width: 3, height: 26 + Math.sin(lf * 0.4 + i) * 2, background: "repeating-linear-gradient(180deg,#B4BCC8 0 3px,#3C4450 3px 5px)" }} />)}
            </div>
          )}

          {/* THE TWO HI-VIS CLAUDES at the foot plates, torquing */}
          {gateIn && [{ x: 30, f: 1 }, { x: 976, f: -1 }].map((h, i) => {
            const torq = lf >= 148 && lf < 172;
            return (
              <div key={"hv" + i} style={{ position: "absolute", left: h.x - 32, top: 636, width: 68, height: 68, zIndex: 34, opacity: over(lf, 150, 6) }}>
                <Mascot lf={lf} size={68} gaze={h.f * 3} nodAmp={torq ? 5 : 1.6} nodSpeed={6} hiVis={1} tint="#C4BCA8" />
                <div style={{ position: "absolute", left: h.f > 0 ? 52 : -14, top: 40, width: 26, height: 9, borderRadius: 2, background: "#D9A11E", transform: `rotate(${torq ? Math.sin(lf * 1.4) * 16 : 0}deg)` }} />
                {/* ear defenders */}
                <div style={{ position: "absolute", left: 4, top: 18, width: 11, height: 15, borderRadius: 3, background: "#2A2E38" }} />
                <div style={{ position: "absolute", left: 53, top: 18, width: 11, height: 15, borderRadius: 3, background: "#2A2E38" }} />
              </div>
            );
          })}

          {/* ============ THE S4 BAY GLOW: bound plant. The machine that will catch him is already running. ============ */}
          {/* Held just clear of the right upright (x=954) so the mesh softens it but the steel never eats it.
              It reads THROUGH the chain-link, which is exactly the right amount of attention: none. */}
          <div style={{ position: "absolute", left: 914, top: 610, width: 40, height: 30, borderRadius: 2, background: "linear-gradient(180deg,rgba(178,206,238,0.28),rgba(140,170,210,0.1))", border: "1px solid rgba(190,214,242,0.2)", filter: "blur(1.1px)", zIndex: 20, opacity: 0.5 }}>
            <div style={{ position: "absolute", left: 6 + Math.abs(((lf * 0.5) % 26) - 13), top: 17, width: 5, height: 10, borderRadius: 1, background: "rgba(30,34,44,0.7)" }} />
          </div>

          {/* ============ L2: THE VILLAIN ============ */}
          <div style={{ position: "absolute", left: vCx - vSize / 2, top: vFeet - vSize * 0.92, width: vSize, height: vSize, zIndex: 36, transform: `rotate(${vRag + vLean * 9}deg) translateX(${vLean * -26}px) translateY(${vLean * 10}px)`, transformOrigin: "50% 88%" }}>
            <Villain lf={lf} size={vSize} gaze={lf >= 150 && lf < 190 ? -3 : 2} nodAmp={lf >= 206 ? 2.6 : 1.4} nodSpeed={13} rain={vRain} />
            {/* the bandolier of spare dies: he has broken stamps before and has budgeted for it */}
            <div style={{ position: "absolute", left: vSize * 0.16, top: vSize * 0.5, width: vSize * 0.7, height: vSize * 0.075, background: "rgba(24,26,32,0.9)", transform: "rotate(-19deg)", borderRadius: 2 }}>
              {[0, 1, 2, 3].map((k) => <div key={"bd" + k} style={{ position: "absolute", left: `${9 + k * 22}%`, top: "-32%", width: vSize * 0.05, height: vSize * 0.055, borderRadius: 1, background: FAKE, opacity: 0.85, border: "1px solid rgba(60,70,20,0.5)" }} />)}
            </div>
            {/* his own counterfeit ink, across his own white collar. It will not dab out. */}
            {lf >= 192 && (
              <div style={{ position: "absolute", left: vSize * 0.4, top: vSize * 0.5, width: vSize * 0.2, height: vSize * 0.11, opacity: over(lf, 192, 4) }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "40% 60% 55% 45%", background: FAKE, opacity: 0.9, filter: "blur(0.6px)" }} />
                {[0, 1, 2].map((k) => <div key={"ik" + k} style={{ position: "absolute", left: `${k * 34}%`, top: `${60 + k * 12}%`, width: vSize * 0.03, height: vSize * 0.03, borderRadius: "50%", background: FAKE }} />)}
              </div>
            )}
            {/* the pocket square, still dabbing at f254, and it is not working */}
            {lf >= 206 && <div style={{ position: "absolute", left: vSize * 0.34 + vDab, top: vSize * 0.46, width: vSize * 0.11, height: vSize * 0.09, borderRadius: 2, background: "#E6E3DA", transform: `rotate(${vDab * 3}deg)`, boxShadow: "0 2px 5px rgba(0,0,0,0.5)" }} />}
            {/* THE COUNTERFEIT DONE DIE: the only verb he has, and it is ceramic */}
            {lf < 188 && (
              <div style={{ position: "absolute", left: vSize * (lf >= 38 && lf < 52 ? -0.02 : 0.02) - (lf >= 28 && lf < 36 ? 6 : 0), top: vSize * (lf >= 28 && lf < 36 ? 0.24 : lf >= 176 ? 0.16 : 0.3), transformOrigin: "70% 50%", transform: `rotate(${lf >= 176 ? -34 - ramp(lf, 180, 188) * 60 : lf >= 38 && lf < 52 ? 34 : -8}deg)` }}>
                <div style={{ width: vSize * 0.13, height: vSize * 0.16, borderRadius: 2, background: grad("#5A6274", "#232833"), border: "1px solid rgba(210,225,250,0.28)" }} />
                <div style={{ position: "absolute", left: 0, top: vSize * 0.15, width: vSize * 0.17, height: vSize * 0.08, borderRadius: 2, background: grad("#C6CE5C", "#8B9635"), border: "1px solid rgba(60,70,20,0.5)", boxShadow: `0 0 8px rgba(168,184,74,0.5)` }} />
              </div>
            )}
            {/* the die-face, gone. Spring out of the crack, from here to S7's confiscation. */}
            {lf >= 188 && (
              <div style={{ position: "absolute", left: vSize * 0.02, top: vSize * 0.3, transform: `rotate(${lf >= 206 ? -18 : 12}deg)` }}>
                <div style={{ width: vSize * 0.13, height: vSize * 0.16, borderRadius: 2, background: grad("#4A5260", "#1C212A"), border: "1px solid rgba(210,225,250,0.22)" }} />
                <div style={{ position: "absolute", left: vSize * 0.01, top: vSize * 0.15, width: vSize * 0.14, height: vSize * 0.04, background: "#2A2E14", clipPath: "polygon(0 0, 22% 60%, 44% 10%, 66% 70%, 88% 16%, 100% 60%, 100% 100%, 0 100%)" }} />
                <div style={{ position: "absolute", left: vSize * 0.06, top: vSize * 0.17, width: 2, height: vSize * 0.06, background: "#9AA3B2", transform: `rotate(${Math.sin(lf * 0.7) * 22}deg)`, transformOrigin: "50% 100%" }} />
              </div>
            )}
          </div>

          {/* THE SLAP: he never asks the hero anything. He leans in over his shoulder and stamps him. */}
          {lf >= 34 && lf < 58 && (() => {
            const reach = ip([34, 41, 50, 58], [0.06, 1, 1, 0.1], Easing.inOut(Easing.cubic));
            const sx0 = 476, sy0 = 432;                 // his shoulder, dropping over the hero
            const hx = 432, hy = 560;                   // the hero's forehead
            const px = sx0 + (hx - sx0) * reach, py = sy0 + (hy - sy0) * reach;
            const len = Math.max(18, Math.hypot(px - sx0, py - sy0));
            const ang = (Math.atan2(py - sy0, px - sx0) * 180) / Math.PI;
            return (
              <div style={{ position: "absolute", left: sx0, top: sy0 - 8, width: len, height: 16, zIndex: 38, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: len, height: 16, borderRadius: 5, background: grad("#7C838F", "#39404B"), boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: len, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.14)" }} />
                {/* the fat counterfeit die, on the end of his arm */}
                <div style={{ position: "absolute", left: len - 12, top: -9, width: 30, height: 34, borderRadius: 3, background: grad("#5A6274", "#232833"), border: "1px solid rgba(210,225,250,0.3)", boxShadow: "0 5px 11px rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", left: len - 9, top: 23, width: 24, height: 10, borderRadius: 2, background: grad("#C6CE5C", "#8B9635"), border: "1px solid rgba(60,70,20,0.5)", boxShadow: `0 0 9px rgba(168,184,74,0.6)` }} />
              </div>
            );
          })()}
          {/* two condescending pats on the cap, after */}
          {lf >= 48 && lf < 58 && Math.floor((lf - 48) / 3) % 2 === 0 && (
            <div style={{ position: "absolute", left: 400, top: 528, width: 34, height: 12, borderRadius: 3, background: grad("#7C838F", "#39404B"), zIndex: 38, opacity: 0.9 }} />
          )}

          {/* THE SHATTER: yellow-green shards, an ink burst, and the recoil that throws HIM */}
          {lf >= 188 && lf < 240 && Array.from({ length: 26 }).map((_, k) => {
            const r = seed(k * 3.1 + 17), a = r * Math.PI * 2, t = (lf - 188) / 52;
            const d = Math.pow(t, 0.55) * (120 + r * 240);
            return <div key={"sd" + k} style={{ position: "absolute", left: 690 + Math.cos(a) * d, top: 470 + Math.sin(a) * d * 0.7 + t * t * 320, width: 4 + r * 7, height: 3 + r * 5, background: r > 0.75 ? "#E8F0B0" : FAKE, opacity: Math.max(0, 1 - t * 1.1), zIndex: 41, transform: `rotate(${lf * (9 + r * 20)}deg)`, boxShadow: `0 0 6px rgba(168,184,74,0.6)` }} />;
          })}
          {pulse(188, 6) > 0 && <div style={{ position: "absolute", left: 690 - 88, top: 470 - 88, width: 176, height: 176, borderRadius: "50%", border: `${pulse(188, 6) * 7}px solid rgba(236,244,182,${pulse(188, 6) * 0.85})`, transform: `scale(${1 + (1 - pulse(188, 6)) * 1.9})`, zIndex: 41 }} />}
          {pulse(188, 4) > 0 && <div style={{ position: "absolute", left: 690 - 66, top: 470 - 66, width: 132, height: 132, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,236,${pulse(188, 4) * 0.9}), transparent 66%)`, zIndex: 41 }} />}
          {/* THE SHARD: one fragment, spinning at the grate's lip like a dropped coin, still going down at f254 */}
          {lf >= 188 && (() => {
            const t = ramp(lf, 188, 300);
            return <div style={{ position: "absolute", left: 455, top: 748, width: 13, height: 13, background: FAKE, zIndex: 41, transform: `rotate(${lf * 17}deg) scaleX(${Math.abs(Math.cos(lf * (0.24 + t * 0.5)))}) scale(${1 - t * 0.3})`, boxShadow: "0 0 7px rgba(168,184,74,0.7)", opacity: 0.95 }} />;
          })()}

          {/* ============ L1: THE HERO ============ */}
          <div style={{ position: "absolute", left: hCx - hSize / 2, top: hFeet - hSize * 0.92 + hKneel * 44 + hDuck, width: hSize, height: hSize, zIndex: 39, transform: `rotate(${-hRock * 0.35 + hScrub * 1.6 * (lf < 148 ? 1 : 0)}deg) scaleY(${1 - hKneel * 0.1})`, transformOrigin: "50% 96%" }}>
            <div style={{ position: "absolute", left: 22, top: hSize * 0.9, width: hSize - 44, height: 16, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(6px)" }} />
            <Mascot lf={lf} size={hSize} gaze={lf >= 240 ? 3 : lf >= 150 && lf < 200 ? 2 : 0} nodAmp={lf >= 96 && lf < 148 ? 5.4 : 2.6} nodSpeed={lf >= 96 && lf < 148 ? 5 : 10} shock={pulse(42, 12) * 0.5 + pulse(218, 10) * 0.5} />
            {/* the L-PLATE, worn square on the chest like a marathon bib */}
            <div style={{ position: "absolute", left: 112 * U, top: 104 * U, width: 40 * U, height: 40 * U, borderRadius: 4, background: PAPER, border: `${3 * U}px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * U, color: RED, boxShadow: "0 6px 12px rgba(0,0,0,0.4)", transform: `rotate(${Math.sin(lf * 0.08) * 1.5}deg)` }}>L</div>
            {/* the driving-school cap, one size too big, sitting flat and slightly askew */}
            <div style={{ position: "absolute", left: 34 * U, top: 22 * U, width: 132 * U, height: 24 * U, borderRadius: "9px 9px 3px 3px", background: grad("#3E4C6E", "#1F2A40"), border: `${1.5 * U}px solid rgba(200,215,245,0.2)`, transform: "rotate(-3deg)", boxShadow: "0 4px 9px rgba(0,0,0,0.45)" }} />
            <div style={{ position: "absolute", left: 20 * U, top: 40 * U, width: 60 * U, height: 9 * U, borderRadius: "5px 2px 2px 5px", background: grad("#31405F", "#182136"), transform: "rotate(-3deg)" }} />
            {/* the lanyard + the blank unlaminated provisional card: empty photo box, blank record strip */}
            {(() => {
              const held = lf < 78;
              const sw = Math.sin(lf * 0.24) * 7;
              return (
                <div style={{ position: "absolute", left: held ? 34 * U : 40 * U, top: held ? 120 * U : 140 * U, width: 62 * U, height: 46 * U, transformOrigin: "50% -20%", transform: `rotate(${held ? -8 - hRock * 0.4 : sw}deg) scale(${held ? 1.16 : 0.82})`, zIndex: 4 }}>
                  {!held && <div style={{ position: "absolute", left: 30 * U, top: -22 * U, width: 2, height: 22 * U, background: "rgba(20,22,30,0.8)" }} />}
                  <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: grad("#F4F1E8", "#CFC9B8"), border: `${1.2 * U}px solid rgba(255,255,255,0.5)`, boxShadow: "0 5px 11px rgba(0,0,0,0.5)" }} />
                  <div style={{ position: "absolute", left: 4 * U, top: 5 * U, width: 18 * U, height: 24 * U, borderRadius: 2, background: "rgba(150,146,134,0.35)", border: `${1 * U}px dashed rgba(90,86,76,0.5)` }} />
                  <div style={{ position: "absolute", left: 26 * U, top: 8 * U, width: 30 * U, height: 3 * U, background: "rgba(120,116,104,0.4)" }} />
                  <div style={{ position: "absolute", left: 26 * U, top: 15 * U, width: 22 * U, height: 3 * U, background: "rgba(120,116,104,0.3)" }} />
                  <div style={{ position: "absolute", left: 4 * U, top: 34 * U, width: 54 * U, height: 8 * U, borderRadius: 1, background: "rgba(140,136,124,0.25)", border: `${1 * U}px solid rgba(120,116,104,0.25)` }} />
                </div>
              );
            })()}
            {/* the crooked DONE, forged onto his forehead. The more he scrubs, the wider it gets. */}
            {lf >= 42 && (
              <div style={{ position: "absolute", left: (100 - doneW / 2) * U, top: 46 * U, width: doneW * U, height: 20 * U, opacity: over(lf, 42, 3), transform: `rotate(-9deg)`, zIndex: 5 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: FAKE, opacity: 0.82, filter: `blur(${ramp(lf, 58, 130) * 1.1}px)` }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14 * U, color: "#2A2E14", opacity: 1 - ramp(lf, 58, 130) * 0.55 }}>DONE</div>
              </div>
            )}
            {/* and by f130 the lie is on his nubs too */}
            {lf >= 96 && [8, 166].map((nx, i) => (
              <div key={"nb" + i} style={{ position: "absolute", left: nx * U, top: 86 * U, width: 26 * U, height: 26 * U, borderRadius: 2, background: FAKE, opacity: ramp(lf, 100, 130) * 0.6, zIndex: 5 }} />
            ))}
            {/* THE MEASURE. He slides a nub flat up the top of his own head and it comes to rest on his
                cap, a clear gap short of the red band at y=478. Nobody asked him to. Nobody is watching. */}
            {nubUp > 0 && (
              <div style={{ position: "absolute", left: 120, top: 62 - nubUp * 48, width: 56, height: 15, borderRadius: 3, background: grad("#E08A63", "#B4522F"), border: "1px solid rgba(255,214,190,0.3)", opacity: nubUp, zIndex: 6, boxShadow: "0 3px 7px rgba(0,0,0,0.45)" }} />
            )}
          </div>
          {/* the water he is working in, and the lie spreading into it */}
          {lf >= 96 && lf < 150 && Array.from({ length: 7 }).map((_, k) => {
            const r = seed(k * 4.1 + 3), t = ((lf - 96 + k * 7) % 34) / 34;
            return <div key={"wd" + k} style={{ position: "absolute", left: 300 + r * 70, top: 700 - t * 26, width: 3 + r * 3, height: 3 + r * 3, borderRadius: "50%", background: FAKE, opacity: (1 - t) * 0.5, zIndex: 39 }} />;
          })}

          {/* ============ THE PLATELESS ROOKIE: the arm lifts, and he walks off alone into the dark ============ */}
          {lf >= 194 && (() => {
            const px = ip([194, 204, 210, 218, 240, 254], [55, 180, 184, 212, 218, 222]);
            const py = ip([194, 210, 218, 240, 254], [726, 726, 692, 662, 650]);
            const s = ip([194, 210, 218, 240, 254], [200, 200, 160, 118, 96]);
            const fade = 1 - ramp(lf, 218, 254) * 0.72;
            return (
              <div style={{ position: "absolute", left: px - s / 2, top: py - s * 0.92, width: s, height: s, zIndex: 33, opacity: fade }}>
                <div style={{ position: "absolute", left: s * 0.1, top: s * 0.9, width: s * 0.8, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(5px)", opacity: fade }} />
                <Mascot lf={lf} size={s} gaze={2} nodAmp={4} nodSpeed={6} tint={`rgba(217,119,87,${0.5 + fade * 0.5})`} />
              </div>
            );
          })()}

          {/* ============ THE LEFT-OUT ROOKIE: upside-down L, quietly rotated at f244 ============ */}
          {(() => {
            const s = 230;
            return (
              <div style={{ position: "absolute", left: 120 - s / 2, top: 736 - s * 0.92, width: s, height: s, zIndex: 29, opacity: 0.72 }}>
                <div style={{ position: "absolute", left: s * 0.12, top: s * 0.9, width: s * 0.76, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.45)", filter: "blur(5px)" }} />
                <Mascot lf={lf} size={s} gaze={lf >= 224 ? 3 : 1} nodAmp={2} nodSpeed={12} tint="#A5644B" />
                <div style={{ position: "absolute", left: 0.17 * s, top: 0.11 * s, width: 0.66 * s, height: 0.12 * s, borderRadius: "8px 8px 2px 2px", background: grad("#33405E", "#1A2334") }} />
                <div style={{ position: "absolute", left: 0.56 * s, top: 0.52 * s, width: 0.17 * s, height: 0.17 * s, borderRadius: 3, background: "rgba(247,243,234,0.85)", border: `2px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 0.11 * s, color: RED, transform: `rotate(${lf < 244 ? 180 : 180 - over(lf, 244, 7) * 180}deg)` }}>L</div>
                {/* and at f248 he quietly copies the hero */}
                {lf >= 248 && <div style={{ position: "absolute", left: 0.42 * s, top: (0.17 - over(lf, 248, 6) * 0.09) * s, width: 0.16 * s, height: 0.06 * s, borderRadius: 2, background: "#A5644B", opacity: over(lf, 248, 6) }} />}
              </div>
            );
          })()}

          {/* ============ THE TWO ARMS, ON ONE SHAFT: one law, two answers, and they are NEARER than
               anybody they decide about. The pedestrian arm slams IN FRONT OF the hero's face. ============ */}
          {gateIn && (
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 40, transform: `translate(${gX}px, ${gY}px) rotate(${gRot}deg)`, transformOrigin: "506px 700px" }}>
              {/* LEFT PASSAGE: it lifts for the one with no plate and slams for ours. Same second. */}
              <div style={{ position: "absolute", left: 146, top: 471, width: 115, height: 11, transformOrigin: "100% 50%", transform: `rotate(${armRot}deg)` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "repeating-linear-gradient(90deg,#D9402C 0px,#D9402C 17px,#EDEAE0 17px,#EDEAE0 34px)", border: "1.5px solid rgba(255,240,235,0.45)", boxShadow: "0 5px 12px rgba(0,0,0,0.6)" }} />
                {/* the counterweight can on the short arm */}
                <div style={{ position: "absolute", left: -15, top: -5, width: 18, height: 21, borderRadius: 3, background: grad("#6A7280", "#262B36"), border: "1px solid rgba(210,224,244,0.3)" }} />
              </div>
              {/* RIGHT CHUTE: still descending on the cut frame */}
              <div style={{ position: "absolute", left: 758, top: 641, width: 150, height: 8, transformOrigin: "100% 50%", transform: `rotate(${chuteRot}deg)` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "repeating-linear-gradient(90deg,#C93A28 0px,#C93A28 12px,#DEDBD2 12px,#DEDBD2 24px)", border: "1px solid rgba(255,240,235,0.34)", boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
              </div>
            </div>
          )}

          {/* ============ GRIT: it jumps a half-inch off the concrete on every rivet hit ============ */}
          {rivetHit > 0 && Array.from({ length: 22 }).map((_, k) => {
            const r = seed(k * 2.3 + 31);
            return <div key={"gr" + k} style={{ position: "absolute", left: 40 + r * 940, top: 760 - rivetHit * (10 + r * 22), width: 2 + r * 2, height: 2 + r * 2, background: "rgba(214,200,178,0.6)", opacity: rivetHit * 0.8, zIndex: 41 }} />;
          })}

          {/* ============ THE GLOBAL WASH: sodium orange out, blue-white in ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "radial-gradient(ellipse at 34% 76%, rgba(255,150,50,0.3), transparent 64%)", mixBlendMode: "screen", opacity: sodAlive, zIndex: 42, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "radial-gradient(ellipse at 24% 40%, rgba(158,196,244,0.2), transparent 68%)", mixBlendMode: "screen", opacity: floodUp, zIndex: 42, pointerEvents: "none" }} />
          {/* the floor, three frames of it, and the rain is what carries it */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "#05060A", opacity: dark * 0.8, zIndex: 43, pointerEvents: "none" }} />
        </div>

        {/* ============ THE FOREGROUND OCCLUDER: you are always looking PAST something ============ */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 44, pointerEvents: "none", transform: `translate(${sx * 2.1}px, ${sy * 2.1 - craneY * 1.9}px) scale(${1 + (camS - 1) * 2.4})`, transformOrigin: `${camOX}px ${camOY}px` }}>
          <div style={{ position: "absolute", left: -30, top: 742, width: 250, height: 60, borderRadius: 10, background: grad("#33303A", "#141319"), filter: "blur(5px)", boxShadow: "0 -8px 26px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 84, top: 748, width: 150, height: 8, background: "rgba(30,28,36,0.9)", filter: "blur(4px)", transform: "rotate(-4deg)" }} />
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, filter: "blur(4px)" }}>
            <path d="M -10 760 Q 90 800 190 762 Q 290 726 392 768" fill="none" stroke="rgba(24,22,30,0.9)" strokeWidth={7} />
          </svg>
          {[0, 1, 2].map((i) => <div key={"bl" + i} style={{ position: "absolute", left: -6 + i * 196, top: 730, width: 20, height: 62, borderRadius: 4, background: grad("#3A3742", "#16151B"), filter: "blur(4px)" }} />)}
          {/* drifting dust past the lens, and from f188 his shards tumble through the near field */}
          {Array.from({ length: 12 }).map((_, i) => {
            const r = seed(i * 3.9 + 41);
            const yy = ((lf * (0.7 + r * 1.4) + r * 860) % 860) - 40;
            return <div key={"fd" + i} style={{ position: "absolute", left: 20 + r * 970, top: yy, width: 4 + r * 7, height: 4 + r * 7, borderRadius: "50%", background: "rgba(240,238,230,0.4)", filter: "blur(2.4px)", opacity: 0.2 + r * 0.3 }} />;
          })}
          {lf >= 188 && Array.from({ length: 7 }).map((_, i) => {
            const r = seed(i * 5.1 + 3), t = ((lf - 188) * (0.03 + r * 0.05)) % 1;
            return <div key={"fs" + i} style={{ position: "absolute", left: 700 - t * 780, top: 300 + t * 500 + Math.sin(t * 6) * 40, width: 14 + r * 20, height: 10 + r * 14, background: FAKE, opacity: (0.45 - r * 0.2) * (1 - t * 0.5), filter: "blur(3.4px)", transform: `rotate(${lf * (6 + r * 12)}deg)` }} />;
          })}
        </div>

        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", boxShadow: "inset 0 0 132px rgba(6,8,16,0.52)", zIndex: 45 }} />
      </div>
    </Panel>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = (v: number) => Math.max(0, Math.min(1, v));
  const bell = (a: number, b: number) => Math.sin(cl((lf - a) / (b - a)) * Math.PI);
  const key = (ks: number[], vs: number[], t: number = lf) =>
    interpolate(t, ks, vs, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eased = (a: number, b: number, ez: any = Easing.inOut(Easing.cubic), t: number = lf) =>
    interpolate(t, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ez });
  const W = 980, H = 706;

  // ===================== CAMERA: a slow, graceful settle onto the subject =====================
  const camS = interpolate(lf, [0, 104], [1.015, 1.05], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  // ===================== THE ONE SUBJECT: the wind-up tin inspector =====================
  // It MOVES smoothly. It only LOOKS cheap (wind-up key, price tag, one googly eye).
  const roll = eased(0, 46, Easing.out(Easing.cubic));            // rolls in, decelerates to a stop
  const bx = 200 + roll * 300;                                    // center x: 200 -> 500 (upper-mid, well placed)
  const bob = Math.sin(lf / 9) * 2.2;                             // gentle continuous idle breath
  const settleDip = bell(46, 58) * 3;                             // a soft nod as it arrives and inspects
  const by = 470 + bob + settleDip;                              // wheel base y
  const bodyLean = key([0, 46, 58, 66, 104], [-3.5, 0, 2.4, -1, 0.4]);  // smooth eased lean, never stepped
  const wheelSpin = roll * 760 + Math.sin(lf / 8) * 2;           // spins as it travels, idles smoothly
  const keyRot = -eased(0, 104, Easing.out(Easing.quad)) * 250;  // the brass key runs down, always slowing
  const tagRot = Math.sin(lf / 6) * 13;                          // the 2c price tag swings smoothly, f0-f104
  const googX = Math.sin(lf / 11) * 3.2;                         // the loose googly disc, a beat behind, smooth
  const googY = Math.abs(Math.sin(lf / 11)) * 1.4;

  // THE TORCH: sweeps across the project, then locks on the fault
  const chestX = bx, chestY = by - 96;
  const beamAng = key([0, 30, 52, 104], [214, 208, 197, 197]);   // smooth sweep, then hold on the board
  const beamLen = 300;
  const beamTx = chestX + Math.cos((beamAng * Math.PI) / 180) * beamLen;
  const beamTy = chestY + Math.sin((beamAng * Math.PI) / 180) * beamLen;
  const found = key([50, 62, 104], [0, 1, 1]);                   // the fault lights up, and stays lit
  const alarm = lf >= 60 ? 0.5 + 0.5 * Math.sin(lf / 2.8) : 0;   // smooth alert pulse

  // ===================== THE ONE ACTION: it raises a red NEEDS ATTENTION flag =====================
  const flagRise = eased(60, 80, Easing.out(Easing.cubic));      // smooth rise, no snapping
  const flagSettle = lf > 80 ? Math.sin((lf - 80) / 2.3) * Math.exp(-(lf - 80) / 18) * 4 : 0;  // graceful damped settle
  const flagH = flagRise * 208;
  const redAmb = interpolate(lf, [64, 86], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (0.72 + 0.28 * Math.sin(lf / 2.6));

  // ===================== BACKGROUND TIER: quiet, dim, subordinate =====================
  const heroBreath = Math.sin(lf / 10) * 1.6;                    // the warm hero, minor, watching
  const heroLook = flagRise;                                     // he turns to the flag as it goes up
  const vDuck = eased(64, 74, Easing.out(Easing.cubic));         // the villain flinches when he is caught
  const vRain = lf < 62 ? 1 : 0.55 + 0.45 * (Math.sin(lf / 3) > 0 ? 1 : 0.3);  // his aura breaks on the catch
  const dripFade = 0.4 + 0.6 * ((Math.sin(lf / 22) + 1) / 2);

  // ===================== WORKSHOP MOTION: the deep set breathes, all of it slow and graceful =====================
  const lampSway = Math.sin(lf / 27) * 1.6;                       // the warm shop lamp over the bot, gentle
  const lamp2Sway = Math.sin(lf / 31 + 1.2) * 1.3;               // the cool lamp by the door
  const lamp3Sway = Math.sin(lf / 24 + 2.1) * 1.5;              // the far dim lamp, left
  const hookSway = Math.sin(lf / 34) * 2.6;                      // the engine-hoist hook, drifting on its chain
  const clockSec = lf * 3.0;                                     // the wall clock's second hand, always sweeping
  const gaugeNeedle = -38 + Math.sin(lf / 30) * 16;             // pressure gauge, breathing
  const gauge2Needle = -18 + Math.sin(lf / 26 + 1) * 20;
  const calFlutter = Math.sin(lf / 13) * 4;                     // the calendar's dog-eared corner
  const dawnPulse = 0.82 + 0.18 * Math.sin(lf / 44);           // cold dawn through the roll-up door, slow bloom
  const shaftShift = Math.sin(lf / 48) * 3;                     // the light shafts drifting as motes cross them

  // one compact project board, back-left, receded. one cell is the fault.
  const cells = [
    { t: 'src/', bad: false }, { t: 'api/', bad: false }, { t: 'db/', bad: false },
    { t: 'ui/', bad: false }, { t: 'auth', bad: true }, { t: 'lib/', bad: false },
    { t: 'ci/', bad: false }, { t: 'cfg', bad: false }, { t: 'log', bad: false },
  ];

  return (
    <Panel label="DAILY CHECK">
      <div style={{ position: 'absolute', left: 16, top: 58, width: W, height: H, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(180deg, #191f27 0%, #202832 46%, #2b3540 100%)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `scale(${camS})`, transformOrigin: '50% 58%' }}>

          {/* ============ BACK WALL + FLOOR: one clean receding plane, low contrast ============ */}
          <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s4wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#232b35" /><stop offset="100%" stopColor="#1a212a" /></linearGradient>
              <linearGradient id="s4floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#39434f" stopOpacity="0.9" /><stop offset="100%" stopColor="#4a5561" /></linearGradient>
            </defs>
            <rect x={0} y={0} width={W} height={330} fill="url(#s4wall)" />
            <polygon points={`0,330 ${W},330 ${W},${H} 0,${H}`} fill="url(#s4floor)" />
            {/* a few soft perspective lines, dim, drawing the eye to the subject */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={'pv' + i} x1={500} y1={330} x2={-260 + i * 190} y2={H} stroke="#4d5865" strokeWidth={1.2} opacity={0.16} />
            ))}
            <line x1={0} y1={330} x2={W} y2={330} stroke="#12171d" strokeWidth={3} opacity={0.6} />
            {/* the worn daily circuit under the bot, barely there: a thousand quiet mornings */}
            <ellipse cx={500} cy={512} rx={300} ry={44} fill="none" stroke="#0f141a" strokeWidth={16} opacity={0.28} />
            <ellipse cx={500} cy={512} rx={300} ry={44} fill="none" stroke="#C8D6E4" strokeWidth={2} opacity={0.14} strokeDasharray="20 14" />
          </svg>

          {/* ============ SOFT WARM KEY LIGHT from upper-left: one confident direction ============ */}
          <div style={{ position: 'absolute', left: 120, top: 40, width: 620, height: 520, background: 'radial-gradient(ellipse at 42% 30%, rgba(255,238,206,0.16), rgba(255,238,206,0) 66%)', mixBlendMode: 'screen', zIndex: 1 }} />

          {/* ============================================================================
               THE WORKSHOP  ,  a deep, dense, lived-in garage at dawn.
               ONE recessive tier: dim, cool, soft-blurred, low-contrast. It is packed
               with craft and always breathing, but it can never out-read the lit bot.
             ============================================================================ */}

          {/* cold dawn ambient, motivated by the open roll-up door on the right */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 80% 40%, rgba(122,162,206,0.20), rgba(122,162,206,0) 58%)', mixBlendMode: 'screen', zIndex: 2, pointerEvents: 'none', opacity: dawnPulse }} />
          {/* a cool wash creeping across the right-hand floor from the doorway */}
          <div style={{ position: 'absolute', left: 460, top: 340, width: 520, height: 366, background: 'linear-gradient(120deg, rgba(120,160,205,0) 30%, rgba(120,160,205,0.14) 100%)', mixBlendMode: 'screen', zIndex: 2, pointerEvents: 'none' }} />

          {/* the whole prop set, drawn dim + desaturated + softly out of focus so it recedes */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, zIndex: 2, filter: 'blur(1.5px) saturate(0.72) brightness(0.9)' }}>
            <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
              <defs>
                <linearGradient id="s4door" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5f7d9c" /><stop offset="100%" stopColor="#9ab6d0" /></linearGradient>
                <linearGradient id="s4drum" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#333b43" /><stop offset="42%" stopColor="#5a636c" /><stop offset="100%" stopColor="#282f36" /></linearGradient>
              </defs>

              {/* ---- overhead conduit + pipe run along the top of the back wall ---- */}
              <rect x={30} y={22} width={912} height={8} rx={4} fill="#39424b" />
              <rect x={30} y={23} width={912} height={2} fill="#565f68" opacity={0.5} />
              <rect x={30} y={40} width={640} height={5} rx={2} fill="#333b43" />
              {[120, 300, 520, 720, 880].map((px) => (<rect key={'pbk' + px} x={px} y={18} width={8} height={18} rx={2} fill="#242b32" />))}
              <rect x={718} y={30} width={7} height={54} rx={3} fill="#39424b" />

              {/* ---- the big roll-up door, part-raised, cold dawn shafting through the gap ---- */}
              <rect x={620} y={38} width={324} height={296} fill="#151b21" />
              <rect x={623} y={40} width={9} height={292} fill="#2b333b" />
              <rect x={932} y={40} width={9} height={292} fill="#2b333b" />
              <rect x={632} y={206} width={302} height={128} fill="url(#s4door)" />
              {/* a low dawn skyline seen through the gap */}
              <rect x={632} y={300} width={302} height={34} fill="#3a4a5c" opacity={0.55} />
              <rect x={688} y={276} width={30} height={58} fill="#33404f" opacity={0.5} />
              <rect x={742} y={288} width={18} height={46} fill="#33404f" opacity={0.45} />
              <rect x={822} y={282} width={42} height={52} fill="#33404f" opacity={0.5} />
              {/* the raised door panel: stamped slats */}
              <rect x={632} y={44} width={302} height={160} fill="#39424b" />
              {Array.from({ length: 15 }).map((_, i) => (<rect key={'slat' + i} x={632} y={48 + i * 10} width={302} height={2} fill="#1f262d" opacity={0.7} />))}
              <rect x={632} y={196} width={302} height={11} fill="#1f262d" />
              <rect x={768} y={198} width={28} height={6} rx={2} fill="#4a525b" />

              {/* ---- PEGBOARD wall of tools, back-left ---- */}
              <rect x={32} y={62} width={272} height={154} rx={4} fill="#31383d" />
              <rect x={32} y={62} width={272} height={154} rx={4} fill="none" stroke="#20262b" strokeWidth={3} />
              {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 15 }).map((_, c) => (
                <circle key={'pg' + r + '_' + c} cx={48 + c * 16} cy={78 + r * 16} r={1.6} fill="#171b1f" opacity={0.5} />
              )))}
              {/* wrench A */}
              <g transform="translate(62,150) rotate(9)">
                <rect x={-4} y={-44} width={8} height={88} rx={4} fill="#6f767d" />
                <rect x={-9} y={-52} width={18} height={16} rx={5} fill="#6f767d" /><rect x={-4} y={-50} width={8} height={8} fill="#20262c" />
                <rect x={-8} y={40} width={16} height={14} rx={5} fill="#6f767d" /><rect x={-3} y={44} width={6} height={7} fill="#20262c" />
              </g>
              {/* wrench B, smaller */}
              <g transform="translate(96,146) rotate(-8)">
                <rect x={-3} y={-34} width={6} height={70} rx={3} fill="#7b828a" />
                <rect x={-7} y={-40} width={14} height={12} rx={4} fill="#7b828a" /><rect x={-3} y={-38} width={6} height={6} fill="#20262c" />
                <rect x={-6} y={32} width={12} height={11} rx={4} fill="#7b828a" />
              </g>
              {/* two screwdrivers */}
              <g transform="translate(126,144) rotate(6)"><rect x={-2} y={-40} width={4} height={54} fill="#9aa1a8" /><rect x={-6} y={12} width={12} height={30} rx={4} fill="#b0603a" /></g>
              <g transform="translate(148,146) rotate(-4)"><rect x={-1.6} y={-34} width={3.2} height={46} fill="#9aa1a8" /><rect x={-5} y={10} width={10} height={26} rx={4} fill="#4a6a86" /></g>
              {/* hammer */}
              <g transform="translate(182,150) rotate(-6)">
                <rect x={-3} y={-28} width={6} height={62} rx={2} fill="#6f5a3e" />
                <rect x={-16} y={-40} width={30} height={13} rx={3} fill="#565d64" /><rect x={9} y={-40} width={9} height={13} fill="#565d64" />
              </g>
              {/* C-clamp */}
              <g transform="translate(216,124)">
                <path d="M -11 -17 L 11 -17 L 11 17 L -11 17 L -11 9 L 4 9 L 4 -9 L -11 -9 Z" fill="#6a7178" />
                <rect x={-19} y={-4} width={11} height={8} fill="#7b828a" /><rect x={-23} y={-8} width={5} height={16} rx={2} fill="#565d64" />
              </g>
              {/* hacksaw */}
              <g transform="translate(250,180) rotate(4)">
                <path d="M -30 0 L 26 0 L 26 -20 L 30 -20 L 30 6 L -26 6 L -26 -14 L -30 -14 Z" fill="none" stroke="#6a7178" strokeWidth={4} />
                <rect x={-28} y={2} width={54} height={3} fill="#8b929a" /><rect x={-40} y={-2} width={12} height={12} rx={3} fill="#7a5a3c" />
              </g>
              {/* a calendar pinned to the board, its dog-eared corner fluttering */}
              <g transform="translate(258,74)">
                <rect x={0} y={0} width={34} height={44} rx={2} fill="#d7d1c2" opacity={0.85} />
                <rect x={0} y={0} width={34} height={10} fill="#a2472f" opacity={0.75} />
                <text x={17} y={8} textAnchor="middle" fontFamily={mono} fontSize={6} fill="#f4ede0">JUL</text>
                {[16, 22, 28, 34].map((yy, i) => (<line key={'cr' + i} x1={3} y1={yy} x2={31} y2={yy} stroke="#a49d8c" strokeWidth={0.6} opacity={0.6} />))}
                {[10, 17, 24].map((xx, i) => (<line key={'cc' + i} x1={xx} y1={13} x2={xx} y2={40} stroke="#a49d8c" strokeWidth={0.6} opacity={0.5} />))}
                <path d="M 26 44 L 34 44 L 34 36 Z" fill="#bcb5a3" transform={`rotate(${calFlutter} 34 44)`} />
                <circle cx={17} cy={4} r={2} fill="#565d64" />
              </g>

              {/* ---- two pressure gauges in the gap between board and shelves ---- */}
              <g transform="translate(318,150)">
                <circle r={15} fill="#1c2228" stroke="#485059" strokeWidth={2.5} /><circle r={11} fill="#c8cfd5" opacity={0.8} />
                <rect x={-0.8} y={-10} width={1.6} height={12} fill="#b04a34" transform={`rotate(${gaugeNeedle})`} /><circle r={1.8} fill="#2b3138" />
              </g>
              <g transform="translate(315,186)">
                <circle r={11} fill="#1c2228" stroke="#485059" strokeWidth={2} /><circle r={8} fill="#c8cfd5" opacity={0.75} />
                <rect x={-0.7} y={-7.5} width={1.4} height={9} fill="#b04a34" transform={`rotate(${gauge2Needle})`} /><circle r={1.4} fill="#2b3138" />
              </g>

              {/* ---- SHELVES stacked with parts boxes, cans, a knockoff cordless drill ---- */}
              <rect x={344} y={100} width={250} height={7} fill="#4a525b" /><rect x={344} y={107} width={250} height={4} fill="#2b3138" />
              <path d="M348 107 L348 124 L360 107 Z" fill="#39424a" /><path d="M590 107 L590 124 L578 107 Z" fill="#39424a" />
              <rect x={352} y={74} width={44} height={26} rx={1.5} fill="#5a5048" /><rect x={352} y={80} width={44} height={4} fill="#8a7d6a" opacity={0.6} />
              <rect x={402} y={70} width={40} height={30} rx={1.5} fill="#4d545b" /><rect x={402} y={88} width={40} height={4} fill="#6e7780" opacity={0.6} />
              <rect x={450} y={68} width={26} height={32} rx={3} fill="#59636e" /><rect x={450} y={68} width={26} height={7} rx={3} fill="#6f7982" />
              <rect x={482} y={72} width={22} height={28} rx={2} fill="#455661" opacity={0.85} /><rect x={484} y={74} width={18} height={5} fill="#7a8a94" opacity={0.5} />
              <rect x={512} y={78} width={30} height={22} rx={1.5} fill="#544b42" />
              {/* the drill on the shelf's right end */}
              <g transform="translate(550,64)">
                <rect x={0} y={0} width={34} height={16} rx={5} fill="#3f6f52" /><rect x={5} y={16} width={12} height={22} rx={3} fill="#33423a" />
                <rect x={34} y={3} width={10} height={10} fill="#787f86" /><rect x={44} y={6} width={9} height={4} fill="#a0a7ad" />
              </g>
              {/* upper shelf */}
              <rect x={360} y={54} width={214} height={7} fill="#454d56" />
              <rect x={372} y={30} width={24} height={24} rx={2} fill="#59636e" /><rect x={372} y={30} width={24} height={6} rx={2} fill="#6f7982" />
              <rect x={404} y={32} width={44} height={22} rx={1.5} fill="#4d545b" />
              <circle cx={472} cy={44} r={12} fill="none" stroke="#3f6f52" strokeWidth={5} opacity={0.85} />
              <rect x={498} y={34} width={58} height={20} rx={1.5} fill="#544b42" /><rect x={498} y={40} width={58} height={4} fill="#8a7d6a" opacity={0.5} />

              {/* the wall clock, its red second hand always sweeping */}
              <g transform="translate(608,84)">
                <circle r={22} fill="#20262c" stroke="#4a525b" strokeWidth={3} /><circle r={18} fill="#cdd4da" opacity={0.85} />
                {Array.from({ length: 12 }).map((_, i) => (<rect key={'tk' + i} x={-0.8} y={-17} width={1.6} height={4} fill="#3a4048" transform={`rotate(${i * 30})`} />))}
                <rect x={-1.5} y={-9} width={3} height={11} rx={1.5} fill="#2b3138" transform="rotate(300)" />
                <rect x={-1} y={-14} width={2} height={16} rx={1} fill="#2b3138" transform="rotate(72)" />
                <rect x={-0.6} y={-15} width={1.2} height={19} fill="#b04a34" transform={`rotate(${clockSec})`} />
                <circle r={2} fill="#2b3138" />
              </g>
              {/* a coiled air hose hung under the clock, with its nozzle drop */}
              <g transform="translate(600,150)">
                {[18, 13, 8.5].map((rr, i) => (<circle key={'coil' + i} r={rr} fill="none" stroke="#2f3d3a" strokeWidth={4.5} opacity={0.85} />))}
                <path d="M 0 18 Q 7 44 -10 66" fill="none" stroke="#2f3d3a" strokeWidth={4.5} /><rect x={-14} y={62} width={9} height={8} rx={2} fill="#5a626a" />
              </g>

              {/* ---- ENGINE HOIST / shop crane, back-right, hook drifting on its chain ---- */}
              <g opacity={0.74}>
                <rect x={888} y={252} width={16} height={228} rx={2} fill="#3f474f" />
                <g transform="translate(896,262)"><rect x={-182} y={-4} width={188} height={13} rx={3} fill="#464e57" transform="rotate(18)" /></g>
                <rect x={0} y={0} width={10} height={78} rx={3} fill="#5a636c" transform="translate(838,300) rotate(20)" />
                <rect x={858} y={470} width={94} height={10} rx={3} fill="#3f474f" />
                <circle cx={866} cy={490} r={9} fill="#20262c" stroke="#39424a" strokeWidth={2} />
                <circle cx={946} cy={490} r={9} fill="#20262c" stroke="#39424a" strokeWidth={2} />
                <g transform={`translate(728,212) rotate(${hookSway})`}>
                  <rect x={-2} y={0} width={4} height={84} fill="#565d64" />
                  <path d="M -8 84 Q -8 104 7 104 Q 18 104 13 90" fill="none" stroke="#6f767d" strokeWidth={5} />
                </g>
              </g>

              {/* ---- WORKBENCH with a vice, scattered bolts, and a can of tools, mid-right ---- */}
              <g opacity={0.82}>
                <rect x={632} y={430} width={186} height={13} rx={2} fill="#5a5142" /><rect x={632} y={443} width={186} height={5} fill="#39342a" />
                <rect x={640} y={448} width={12} height={94} fill="#49422f" /><rect x={798} y={448} width={12} height={94} fill="#49422f" />
                <rect x={640} y={498} width={170} height={9} fill="#49422f" />
                {/* vice */}
                <g transform="translate(660,410)">
                  <rect x={-16} y={12} width={32} height={12} fill="#3f6f52" /><rect x={-14} y={-2} width={12} height={20} fill="#4a5a52" />
                  <rect x={2} y={0} width={11} height={18} fill="#54655c" /><rect x={12} y={6} width={22} height={5} rx={2} fill="#787f86" /><rect x={32} y={2} width={5} height={14} rx={2} fill="#565d64" />
                </g>
                {[700, 712, 726, 742, 760].map((bx2, i) => (<circle key={'bolt' + i} cx={bx2} cy={427 - (i % 2) * 3} r={2.4} fill="#787f86" />))}
                {/* can of screwdrivers */}
                <g transform="translate(784,404)">
                  <rect x={0} y={0} width={22} height={26} rx={2} fill="#6a5040" />
                  <rect x={4} y={-14} width={2} height={16} fill="#9aa1a8" /><rect x={2} y={-16} width={6} height={6} rx={2} fill="#b04a34" />
                  <rect x={13} y={-10} width={2} height={12} fill="#9aa1a8" /><rect x={11} y={-12} width={6} height={5} rx={2} fill="#4a6a86" />
                </g>
              </g>

              {/* ---- an oil drum + jerry can, left floor, in the gap under the villain ---- */}
              <g transform="translate(30,348)" opacity={0.72}>
                <ellipse cx={30} cy={4} rx={30} ry={7} fill="#5a636c" />
                <rect x={0} y={4} width={60} height={92} fill="url(#s4drum)" />
                <ellipse cx={30} cy={96} rx={30} ry={7} fill="#20262c" />
                <rect x={0} y={20} width={60} height={4} fill="#20262c" opacity={0.5} /><rect x={0} y={74} width={60} height={4} fill="#20262c" opacity={0.5} />
                <rect x={12} y={38} width={36} height={26} rx={2} fill="#6a4a30" opacity={0.55} />
                <text x={30} y={54} textAnchor="middle" fontFamily={mono} fontSize={8} fill="#d8c49a" opacity={0.6}>LUB-X</text>
              </g>
              {/* jerry can beside it */}
              <g transform="translate(96,410)" opacity={0.68}>
                <rect x={0} y={0} width={30} height={44} rx={3} fill="#7a3a2a" />
                <rect x={4} y={4} width={22} height={14} rx={2} fill="#8a4634" opacity={0.7} />
                <rect x={9} y={-8} width={12} height={8} rx={2} fill="#5a2c20" /><rect x={20} y={-6} width={12} height={5} rx={2} fill="#39342a" transform="rotate(-16 20 -3)" />
              </g>

              {/* ---- a stack of tyres in the far-right corner ---- */}
              <g opacity={0.7}>
                {[0, 1, 2].map((i) => (
                  <g key={'tyre' + i} transform={`translate(902,${524 - i * 30})`}>
                    <ellipse rx={44} ry={17} fill="#181c21" />
                    <ellipse rx={44} ry={17} fill="none" stroke="#2c3238" strokeWidth={4} />
                    <ellipse rx={20} ry={8} fill="#2a3037" />
                  </g>
                ))}
              </g>

              {/* ---- grease stains + an oil sheen worn into the concrete ---- */}
              <ellipse cx={620} cy={598} rx={92} ry={22} fill="#13171c" opacity={0.4} />
              <ellipse cx={300} cy={642} rx={72} ry={18} fill="#13171c" opacity={0.32} />
              <ellipse cx={758} cy={556} rx={52} ry={14} fill="#0f1318" opacity={0.5} />
              <ellipse cx={756} cy={552} rx={30} ry={8} fill="#54606b" opacity={0.22} />

              {/* ---- three hanging shop lamps, all swaying softly on their cords ---- */}
              <g transform={`rotate(${lamp3Sway} 172 0) translate(172,0)`} opacity={0.6}>
                <rect x={-1.5} y={0} width={3} height={76} fill="#2b3138" />
                <path d="M -18 76 L 18 76 L 12 96 L -12 96 Z" fill="#39424a" /><ellipse cx={0} cy={96} rx={7} ry={3} fill="#d8dee4" opacity={0.4} />
              </g>
              <g transform={`rotate(${lampSway} 360 0) translate(360,0)`} opacity={0.92}>
                <rect x={-1.5} y={0} width={3} height={118} fill="#2b3138" />
                <path d="M -26 118 L 26 118 L 16 148 L -16 148 Z" fill="#54453a" /><path d="M -26 118 L 26 118 L 22 124 L -22 124 Z" fill="#6a5748" />
                <ellipse cx={0} cy={148} rx={12} ry={5} fill="#FFE9B0" opacity={0.9} />
              </g>
              <g transform={`rotate(${lamp2Sway} 750 0) translate(750,0)`} opacity={0.7}>
                <rect x={-1.5} y={0} width={3} height={96} fill="#2b3138" />
                <path d="M -22 96 L 22 96 L 14 120 L -14 120 Z" fill="#414852" /><ellipse cx={0} cy={120} rx={9} ry={4} fill="#bcd6ef" opacity={0.5} />
              </g>
            </svg>
          </div>

          {/* cold volumetric shafts raking down-left out of the door gap, drifting */}
          {[{ x: 706, r: -22, o: 0.16 }, { x: 792, r: -15, o: 0.11 }, { x: 656, r: -28, o: 0.13 }].map((s, i) => (
            <div key={'shaft' + i} style={{ position: 'absolute', left: s.x, top: 248, width: 74, height: 430, background: `linear-gradient(180deg, rgba(150,188,228,${s.o}), rgba(150,188,228,0) 78%)`, transformOrigin: '50% 0%', transform: `rotate(${s.r + shaftShift}deg)`, filter: 'blur(6px)', mixBlendMode: 'screen', zIndex: 3, pointerEvents: 'none' }} />
          ))}
          {/* the warm bulb glow of the lamp over the bot, small and soft */}
          <div style={{ position: 'absolute', left: 296, top: 108, width: 148, height: 128, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,224,160,0.20), rgba(255,224,160,0) 66%)', mixBlendMode: 'screen', zIndex: 3, pointerEvents: 'none' }} />
          {/* cold dust motes floating in the doorway light, drifting up, f0-f104 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const r = seed(i * 4.1 + 9), s = 0.3 + r * 0.8;
            const y = 650 - ((((lf * s + r * 480) % 480) + 480) % 480);
            const x = 560 + seed(i * 2.7) * 380 - (650 - y) * 0.12;
            return <div key={'bdm' + i} style={{ position: 'absolute', left: x, top: y, width: 1.6 + r * 2, height: 1.6 + r * 2, borderRadius: '50%', background: '#bcd6ef', opacity: (0.05 + r * 0.16) * cl((y - 160) / 140), zIndex: 3 }} />;
          })}

          {/* ============ THE PROJECT, receded: a compact board the bot is checking ============ */}
          <div style={{ position: 'absolute', left: 118, top: 250, width: 250, height: 176, zIndex: 4, filter: 'blur(1.1px) saturate(0.62)', opacity: 0.9 }}>
            <div style={{ position: 'absolute', left: 10, top: 168, width: 230, height: 12, borderRadius: 3, background: 'linear-gradient(180deg, #333d49, #171d24)' }} />
            <div style={{ position: 'absolute', left: 100, top: 176, width: 12, height: 40, background: '#232b34' }} />
            <div style={{ position: 'absolute', left: 138, top: 176, width: 12, height: 40, background: '#232b34' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'linear-gradient(160deg, #232b35, #141a21)', border: '3px solid #384350', boxShadow: '0 18px 34px rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'absolute', left: 16, top: 14, width: 218, height: 140, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(3,1fr)', gap: 8 }}>
              {cells.map((c, i) => (
                <div key={'cl' + i} style={{
                  borderRadius: 3,
                  background: c.bad
                    ? `rgba(196,74,58,${0.18 + 0.5 * found + 0.28 * found * alarm})`
                    : 'rgba(150,172,196,0.10)',
                  border: c.bad ? `1.5px solid rgba(224,90,72,${0.5 + 0.5 * found})` : '1px solid rgba(160,186,210,0.26)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  boxShadow: c.bad ? `0 0 ${6 + 22 * found}px rgba(214,78,58,${0.4 * found})` : 'none',
                }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: c.bad ? '#ffd7cd' : 'rgba(196,216,236,0.6)' }}>{c.t}</div>
                  {c.bad && found > 0.2 && (<>
                    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 24, height: 2.4, background: RED, transform: 'translate(-50%,-50%) rotate(40deg)', opacity: found }} />
                    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 24, height: 2.4, background: RED, transform: 'translate(-50%,-50%) rotate(-40deg)', opacity: found }} />
                  </>)}
                </div>
              ))}
            </div>
          </div>

          {/* ============ THE VILLAIN, caught: small, dim, at the back, shades + broken code-rain ============ */}
          <div style={{ position: 'absolute', left: 44, top: 214, width: 96, height: 96, zIndex: 5, filter: 'blur(0.8px) saturate(0.8)', opacity: 0.82, transform: `translateY(${vDuck * 16}px) rotate(${vDuck * 4}deg)`, transformOrigin: '50% 100%' }}>
            <Villain lf={lf} size={96} gaze={-4 + vDuck * 5} nodAmp={0.5} nodSpeed={22} rain={0} />
          </div>
          <CodeRain lf={lf} x={70} y={196} h={112} cols={2} o={0.32 * vRain} gap={9} />
          {/* the red alert wash reaches him at the back as the flag goes up */}
          <div style={{ position: 'absolute', left: 20, top: 190, width: 200, height: 160, background: `radial-gradient(ellipse at 50% 50%, rgba(214,74,58,${0.22 * redAmb}), rgba(214,74,58,0) 70%)`, mixBlendMode: 'screen', zIndex: 6, pointerEvents: 'none' }} />

          {/* ============ THE HERO, minor and warm: watches from the right, eyes visible ============ */}
          <div style={{ position: 'absolute', left: 806, top: 372, width: 92, height: 108, zIndex: 5, filter: 'blur(0.5px)', transform: `translateY(${heroBreath}px)` }}>
            <div style={{ position: 'absolute', left: 10, top: 96, width: 72, height: 15, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', filter: 'blur(4px)' }} />
            <Mascot lf={lf} size={92} gaze={-6 - heroLook * 6} nodAmp={0.8} nodSpeed={14} />
            {/* his L-plate, quiet, on his chest */}
            <div style={{ position: 'absolute', left: 32, top: 44, width: 26, height: 26, borderRadius: 4, background: '#f6f1e6', border: `2px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fraunces.fontFamily, fontSize: 17, fontWeight: 900, color: RED, lineHeight: 1 }}>L</div>
          </div>

          {/* ============ DUST drifting up through the key light, continuously, f0-f104 ============ */}
          {Array.from({ length: 18 }).map((_, i) => {
            const r = seed(i * 3.7 + 2), s = 0.4 + r * 1.0;
            const y = 560 - ((((lf * s + r * 500) % 500) + 500) % 500);
            const x = 280 + seed(i * 5.3) * 420 - (560 - y) * 0.18;
            return <div key={'dm' + i} style={{ position: 'absolute', left: x, top: y, width: 1.8 + r * 2.2, height: 1.8 + r * 2.2, borderRadius: '50%', background: '#FFF0CE', opacity: (0.08 + r * 0.24) * cl((y - 120) / 120), zIndex: 7 }} />;
          })}

          {/* ============ THE TORCH BEAM, raking from the bot's chest to the fault ============ */}
          <div style={{ position: 'absolute', left: chestX, top: chestY - 44, width: beamLen, height: 88, transformOrigin: '0px 44px', transform: `rotate(${beamAng}deg)`, mixBlendMode: 'screen', zIndex: 8, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,246,223,0.55), rgba(255,238,200,0.05))', clipPath: 'polygon(0% 44%, 100% 2%, 100% 98%, 0% 56%)', filter: 'blur(2px)' }} />
          </div>
          <div style={{ position: 'absolute', left: beamTx - 34, top: beamTy - 15, width: 68, height: 30, borderRadius: '50%', background: `radial-gradient(ellipse, rgba(255,246,223,${0.4 + 0.3 * found}), rgba(255,246,223,0))`, mixBlendMode: 'screen', filter: 'blur(3px)', zIndex: 8, pointerEvents: 'none' }} />

          {/* ============ THE RED FLAG: the one clear action, rising smoothly on its staff ============ */}
          <div style={{ position: 'absolute', left: bx + 26, top: by - 178, width: 8, height: flagH + 6, transformOrigin: '50% 100%', transform: `rotate(${flagSettle * 0.5}deg)`, zIndex: 22 }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: 8, height: flagH + 6, borderRadius: 4, background: 'linear-gradient(90deg, #c6d0da, #5b6672)' }} />
          </div>
          {flagRise > 0.02 && (
            <div style={{ position: 'absolute', left: bx + 30, top: by - 178 - flagH, width: 128, height: 82, transformOrigin: '0% 60%', transform: `rotate(${flagSettle}deg) scale(${0.4 + 0.6 * flagRise})`, opacity: cl(flagRise * 1.6), zIndex: 23 }}>
              {/* alert halo */}
              <div style={{ position: 'absolute', left: -14, top: -14, width: 132, height: 92, borderRadius: 10, background: `radial-gradient(ellipse, rgba(214,74,58,${0.35 + 0.35 * alarm}), rgba(214,74,58,0) 70%)`, filter: 'blur(6px)' }} />
              {/* the red pennant */}
              <div style={{ position: 'absolute', left: 0, top: 0, width: 122, height: 74, background: `linear-gradient(150deg, #E2543E, ${RED})`, border: '2px solid #7d2b20', borderRadius: 3, clipPath: 'polygon(0% 0%, 100% 0%, 88% 50%, 100% 100%, 0% 100%)', boxShadow: `0 6px 18px rgba(0,0,0,0.45), 0 0 ${10 + 20 * alarm}px rgba(214,74,58,0.55)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, paddingRight: 10 }}>
                {/* warning triangle */}
                <div style={{ position: 'relative', width: 26, height: 22 }}>
                  <div style={{ position: 'absolute', inset: 0, background: '#FDF3E6', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                  <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', width: 3.4, height: 8, background: RED, borderRadius: 2 }} />
                  <div style={{ position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)', width: 3.4, height: 3.4, background: RED, borderRadius: '50%' }} />
                </div>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, letterSpacing: 0.3, color: '#FDF3E6', lineHeight: 1, textAlign: 'center' }}>NEEDS<br />ATTENTION</div>
              </div>
            </div>
          )}

          {/* ============ THE TIN BOT: the focal subject, large and centered-upper ============ */}
          <div style={{ position: 'absolute', left: bx - 100, top: by - 24, width: 200, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', filter: 'blur(7px)', zIndex: 20 }} />
          <div style={{ position: 'absolute', left: bx - 100, top: by - 208, width: 200, height: 208, zIndex: 21, transform: `rotate(${bodyLean}deg)`, transformOrigin: '50% 94%' }}>
            <svg viewBox="0 0 200 210" width={200} height={208} shapeRendering="crispEdges" style={{ overflow: 'visible', filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' }}>
              {/* arms */}
              <rect x={8} y={92} width={26} height={26} fill="#8d97a2" />
              <rect x={166} y={92} width={26} height={26} fill="#9aa4af" />
              {/* body: matte tin, rolled edges, stamping seams */}
              <rect x={34} y={48} width={132} height={104} fill="#AEB7BF" />
              <rect x={34} y={48} width={132} height={10} fill="rgba(255,255,255,0.28)" />
              <rect x={34} y={140} width={132} height={12} fill="rgba(0,0,0,0.20)" />
              <rect x={40} y={48} width={3} height={104} fill="rgba(0,0,0,0.24)" />
              <rect x={158} y={48} width={3} height={104} fill="rgba(0,0,0,0.24)" />
              <rect x={34} y={50} width={18} height={12} fill="#6f7982" />
              {/* rivets */}
              <rect x={74} y={52} width={6} height={6} fill="#59636e" />
              <rect x={120} y={52} width={6} height={6} fill="#59636e" />
              {/* ONE googly eye, disc a beat behind */}
              <rect x={62} y={66} width={32} height={32} rx={5} fill="#EDF3F8" />
              <rect x={62} y={66} width={32} height={9} rx={3} fill="rgba(255,255,255,0.78)" />
              <rect x={71 + googX} y={74 + googY} width={15} height={15} rx={2} fill="#151312" />
              {/* the other eye, a punched hole */}
              <rect x={112} y={70} width={20} height={22} fill="#2b323b" />
              <rect x={116} y={74} width={12} height={14} fill="#10141a" />
              {/* the hi-vis vest, one size too big */}
              <rect x={30} y={102} width={140} height={44} fill="#E4C43A" opacity={0.96} />
              <rect x={30} y={110} width={140} height={6} fill="#EDEAE0" />
              <rect x={30} y={130} width={140} height={6} fill="#EDEAE0" />
              {/* the torch bulb in its chest */}
              <rect x={88} y={100} width={24} height={26} rx={3} fill="#39434f" />
              <rect x={92} y={104} width={16} height={16} rx={2} fill="#FFF6DF" />
              {/* the flag clip on its back */}
              <rect x={146} y={58} width={16} height={9} rx={2} fill="#59636e" />
              {/* maker's mark + coin slot, flat texture only */}
              <rect x={54} y={130} width={16} height={4} fill="rgba(0,0,0,0.26)" />
              <rect x={128} y={130} width={9} height={9} fill="rgba(0,0,0,0.20)" />
              {/* THE BRASS WIND-UP KEY, running down smoothly */}
              <g transform={`translate(180, 80) rotate(${keyRot})`}>
                <rect x={-3} y={-17} width={6} height={34} fill="#E7B24C" />
                <rect x={-17} y={-3} width={34} height={6} fill="#E7B24C" />
                <rect x={-2} y={-2} width={4} height={4} fill="#9c7128" />
              </g>
              <rect x={166} y={76} width={14} height={9} fill="#8d97a2" />
              {/* two tin wheels, spinning smoothly with travel */}
              {[70, 130].map((wx) => (
                <g key={'wh' + wx}>
                  <circle cx={wx} cy={176} r={28} fill="#20262e" stroke="#3c4550" strokeWidth={3} />
                  <circle cx={wx} cy={176} r={12} fill="#8d97a2" />
                  <g transform={`rotate(${wheelSpin} ${wx} 176)`}>
                    <rect x={wx - 2} y={152} width={4} height={48} fill="#59636e" />
                    <rect x={wx - 24} y={174} width={48} height={4} fill="#59636e" />
                  </g>
                </g>
              ))}
            </svg>
            {/* THE 2c PRICE TAG, on a string, swinging smoothly, f0-f104 */}
            <div style={{ position: 'absolute', left: 176, top: 60, width: 2, height: 14, background: '#c9b48a' }} />
            <div style={{ position: 'absolute', left: 166, top: 72, width: 34, height: 22, transformOrigin: '24% 0%', transform: `rotate(${tagRot}deg)` }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 3, background: '#EDE4CB', border: '1px solid #9a917c', boxShadow: '0 2px 5px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: '#2b2418', lineHeight: 1 }}>2c</div>
              </div>
              <div style={{ position: 'absolute', left: 4, top: 4, width: 3.4, height: 3.4, borderRadius: '50%', background: '#9a917c' }} />
            </div>
          </div>

          {/* ============ A quiet callback prop: the wind-up charge post, dim, left ============ */}
          <div style={{ position: 'absolute', left: 44, top: 452, width: 60, height: 84, zIndex: 4, filter: 'blur(1.2px)', opacity: 0.7 }}>
            <div style={{ position: 'absolute', left: 8, top: 8, width: 44, height: 62, borderRadius: 5, background: 'linear-gradient(160deg, #3f4954, #232a32)', border: '2px solid #4d5763' }} />
            <div style={{ position: 'absolute', left: 18, top: 18, width: 24, height: 16, borderRadius: 2, background: '#0d1116' }} />
            <div style={{ position: 'absolute', left: 21, top: 22, width: 18, height: 9, borderRadius: 2, background: FAKE, opacity: 0.16 + 0.12 * Math.sin(lf / 6) }} />
          </div>

          {/* ============ oil-drip metronome, one quiet moving detail, back-right ============ */}
          <div style={{ position: 'absolute', left: 760, top: 300, width: 3, height: 8, borderRadius: 2, background: '#141a20', opacity: dripFade, zIndex: 4, transform: `translateY(${((lf % 40) / 40) * 30}px)` }} />

          {/* ============ THE RED ALERT WASH, growing over the room as the flag goes up ============ */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, background: `radial-gradient(ellipse at 52% 42%, rgba(214,74,58,${0.13 * redAmb}), rgba(214,74,58,0) 62%)`, mixBlendMode: 'screen', zIndex: 30, pointerEvents: 'none' }} />

          {/* ============ FOCAL VIGNETTE: refined, centered on the subject ============ */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, background: 'radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 36%, rgba(6,10,16,0.6) 100%)', zIndex: 31, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, background: 'linear-gradient(180deg, rgba(120,136,154,0.14), rgba(120,136,154,0) 34%)', zIndex: 31, pointerEvents: 'none' }} />
        </div>
      </div>
    </Panel>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const f = lf;
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const LP = (a: number, b: number, t: number) => a + (b - a) * t;

  /* ============ SET COLUMN 1012 x 1102. camY 0 -> 310 on the crane. ============ */
  const camY = interpolate(f, [112, 132, 156], [0, 168, 310], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const camXsw = interpolate(f, [112, 156], [0, 40], { ...cl, easing: Easing.inOut(Easing.cubic) });  // the 40-unit swing right
  const camTilt = ramp(f, 132, 156) * -2.4;        // lands knee height, canted up
  const drift = Math.sin(f * 0.0838) * 3;          // handheld, never locked off, all 256
  const drift2 = Math.cos(f * 0.0611) * 2.2;
  // slow 1.08x push on the con, centred so the upper-left office box survives the crop
  const push = 1 + ramp(f, 200, 255) * 0.08;

  /* ============ THE CAMERA. Three positions, one rig.
     f0..74    parked HIGH on the fishbowl: boardroom framing, his face readable through one clean pane.
     f74..110  a TRUE 3x insert on the pad. Not a 1.1x nudge, which is a rumour, not a beat.
     f110..156 out to the full set for the launch, then the crane rides the carrier three storeys down.
     `tx,ty` = the set point that sits dead on the panel's centre (506,396).          ============ */
  const EZ = { ...cl, easing: Easing.inOut(Easing.cubic) };
  const camScale = interpolate(f, [0, 74, 80, 106, 112], [1.55, 1.55, 3, 3, 1], EZ);
  const tx = interpolate(f, [0, 74, 80, 106, 112], [290, 290, 262, 262, 506], EZ) + camXsw;
  const ty = interpolate(f, [0, 74, 80, 106, 112], [230, 230, 208, 208, 396], EZ) + camY;

  /* ============ ARM / SLAPS / PROMOTION ============ */
  // slap 1 f11, slap 2 f38, promotion f56..f66. Home (450,90) strike (300,210)
  const armP =
    f < 6 ? 0 :
    f < 11 ? ramp(f, 6, 11) :
    f < 14 ? 1 :
    f < 22 ? 1 - ramp(f, 14, 22) :
    f < 34 ? 0 :
    f < 38 ? ramp(f, 34, 38) :
    f < 42 ? 1 :
    f < 50 ? 1 - ramp(f, 42, 50) : 0;
  // ...then it withdraws home by f84, out of the insert, and keeps station for the rest of the scene.
  const armX = f < 56 ? LP(450, 285, armP) : interpolate(f, [56, 60, 63, 66, 74, 84], [450, 470, 430, 330, 330, 450], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const armRot = f < 56 ? armP * 14 : interpolate(f, [56, 63, 66, 74, 84], [14, 60, 10, 6, 0], { ...cl });
  const dockBounce = f >= 14 && f < 24 ? Math.sin(ramp(f, 14, 24) * Math.PI * 2.4) * 5 * (1 - ramp(f, 14, 24)) : 0;
  const penInHolster = f < 63 ? 1 : 0;             // planted from f0, drawn at f63
  const penInNub = ramp(f, 63, 66);
  const wrenchGone = f >= 57 ? 1 : 0;              // clamped
  const slapHit = (at: number) => (f >= at && f < at + 6 ? 1 - (f - at) / 6 : 0);
  const recoil = slapHit(11) * 16 + slapHit(38) * 20;

  /* ============ THE WRENCH FALL: chute (490,315) -> drum (205,690), 385 units ============ */
  const fall = ramp(f, 60, 66);
  const wrX = LP(470, 205, Math.pow(fall, 0.72));
  const wrY = LP(315, 690, Math.pow(fall, 1.9));
  const wrRot = fall * 520;
  const falling = f >= 60 && f < 66 ? 1 : 0;
  const tally15 = ramp(f, 70, 76);                 // the fifteenth chalk stroke
  const heapCount = f >= 66 ? 15 : 14;
  // heap rings on every hydraulic event
  const hyd = [66, 120, 146, 172, 240].reduce((a, e) => a + (f >= e && f < e + 12 ? Math.sin((f - e) * 1.4) * (1 - ramp(f, e, e + 12)) : 0), 0);
  // the crown wrench has teetered since f0 and slips at f250, still scraping at 255
  const teeter = Math.sin(f * 0.19) * 2.2 * (f < 250 ? 1 : 0);
  const slip = ramp(f, 250, 256);

  /* ============ THE ORDER: write, rip, roll, send ============ */
  const scritch = f >= 78 && f < 100 ? 1 : 0;
  const paperJit = scritch ? Math.sin(f * 1.9) * 0.9 : 0;
  const rip = ramp(f, 102, 108);                   // pink copy onto the spike -> three
  const spikeCount = f >= 106 ? 3 : 2;
  const roll = ramp(f, 104, 110);                  // yellow copy rolls into the carrier
  const shove = ramp(f, 108, 112);
  const lineText = ramp(f, 80, 84) * (1 - ramp(f, 106, 110));

  /* ============ NEEDLE (twinned on both dials) ============ */
  const needle =
    f < 112 ? 62 + Math.sin(f * 0.07) * 2.5 :
    f < 116 ? LP(62, 0, ramp(f, 112, 116)) :
    62 * ramp(f, 116, 190) * 0.55 + 8 + Math.sin(f * 0.07) * 1.6;
  const needleLate = f >= 246 ? ramp(f, 246, 256) * 14 : 0;

  /* ============ THE CARRIER RIDE ============ */
  const ride = ramp(f, 112, 146);
  const carrierPt = (t: number) => {
    // port(520,245) -> ceiling(520,180) -> elbow(900,180) -> down x900 to 560 -> left to 430 @600
    if (t < 0.08) return { x: 520, y: LP(245, 180, t / 0.08) };
    if (t < 0.30) return { x: LP(520, 900, (t - 0.08) / 0.22), y: 180 };
    if (t < 0.80) return { x: 900, y: LP(180, 560, (t - 0.30) / 0.50) };
    if (t < 0.92) return { x: 900, y: LP(560, 600, (t - 0.80) / 0.12) };
    return { x: LP(900, 430, (t - 0.92) / 0.08), y: 600 };
  };
  const cp = carrierPt(ride);
  const carrierOn = f >= 112 && f < 148 ? 1 : 0;
  /* ============ THE VILLAIN: board -> curtain -> shoulder -> port -> multiply ============ */
  // leaning on the no-self-stamping board from f0 (revealed by the crane at f120), pushes off at f146
  const vLean = 1 - ramp(f, 146, 156);
  const vx =
    f < 146 ? 92 :
    f < 158 ? LP(92, 300, ramp(f, 146, 158)) :
    f < 206 ? 300 :
    f < 210 ? LP(300, 560, ramp(f, 206, 210)) :
    f < 223 ? 560 :
    f < 230 ? LP(560, 636, ramp(f, 223, 230)) : 636;
  const vy =
    f < 230 ? 990 :
    f < 234 ? LP(990, 1032, ramp(f, 230, 234)) : 1032;
  const vPitch = f >= 230 ? interpolate(f, [230, 234, 239, 248], [0, 46, 40, 36], { ...cl }) : 0;
  const vSkid = f >= 223 && f < 230 ? Math.sin((f - 223) * 2.1) * 4 : 0;
  const vScramble = f >= 226 && f < 230 ? Math.sin((f - 226) * 3.4) * 7 : (f >= 230 && f < 239 ? Math.sin((f - 230) * 2.2) * 5 : 0);
  const vTieSuck = f >= 230 ? ramp(f, 230, 238) : 0;
  const vMouth = f >= 239 && f < 251 ? 1 : 0;      // flat line only. NOT "first time in the reel".
  const armAround = ramp(f, 158, 162) * (1 - ramp(f, 176, 182)) + ramp(f, 212, 216) * (1 - ramp(f, 230, 234));
  // THE WINKS: 8 frames each, glint bar travels, bed drops
  const wink1 = f >= 159 && f <= 167 ? ramp(f, 159, 167) : 0;
  const wink2 = f >= 213 && f <= 221 ? ramp(f, 213, 221) : 0;
  const winkOn = (f >= 159 && f <= 167) || (f >= 213 && f <= 221) ? 1 : 0;
  const glintX = wink1 > 0 ? wink1 : wink2;
  const headTilt = (wink1 + wink2) > 0 ? Math.sin((wink1 + wink2) * Math.PI) * -9 : 0;
  // RULING §1: the gun is DEAD. Both cons are a HAND-PEEL off the spool, presented on a dead tip.
  const peel1 = ramp(f, 164, 168), peel2 = ramp(f, 218, 222);
  const present1 = ramp(f, 168, 172) * (1 - ramp(f, 170, 174));
  const takeIt = ramp(f, 170, 174);               // the welder's nub TAKES it. no hesitation.
  const stuckOn = f >= 172 ? 1 : 0;               // sticker lands on the bracket
  const present2 = ramp(f, 222, 226);
  // RULING §1: no red flag. He grooms the S3 COLLAR INK at f204 instead.
  const dab = f >= 204 && f < 210 ? Math.sin(ramp(f, 204, 210) * Math.PI) : 0;

  /* ============ THE POD + FRESH EYES ============ */
  const podDrop = interpolate(f, [160, 172], [-330, 0], { ...cl, easing: Easing.in(Easing.cubic) });
  const podSlam = f >= 172 && f < 186 ? Math.sin((f - 172) * 1.5) * (1 - ramp(f, 172, 186)) * 7 : 0;
  const latches = ramp(f, 172, 176);
  const memReady = ramp(f, 176, 180);
  const hiss = ramp(f, 180, 200);
  const fog = ramp(f, 180, 196);
  const doorSwing = ramp(f, 184, 190);
  const punchFilm = ramp(f, 186, 190);
  const tear = ramp(f, 190, 196);
  const boot = f >= 190 && f < 196 ? 1 - ramp(f, 190, 196) : 0;   // over-bright 6 frames
  const feX =
    f < 184 ? 790 :
    f < 196 ? LP(790, 640, ramp(f, 184, 196)) :
    f < 223 ? 640 :
    f < 236 ? LP(640, 566, ramp(f, 223, 236)) : 566;
  const feWalk = (f >= 184 && f < 196) || (f >= 223 && f < 236) ? Math.abs(Math.sin(f * 0.55)) * 4 : Math.sin(f * 0.1) * 1;
  const liftPart = ramp(f, 194, 200);
  const partRot = f >= 242 ? interpolate(f, [242, 252], [0, 20], { ...cl }) : 0;
  const bundle = ramp(f, 254, 256);

  /* ============ THE BRACKET: hot-blue fading, shimmer never stops ============ */
  const heat = 1 - ramp(f, 166, 226);
  const shimmer = Math.sin(f * 0.44) * (1 + heat * 2);
  const partOnCradle = f >= 176 && f < 198 ? 1 : 0;
  const cradleRing = [172, 196].reduce((a, e) => a + (f >= e && f < e + 10 ? Math.sin((f - e) * 1.6) * (1 - ramp(f, e, e + 10)) * 3 : 0), 0);

  /* ============ THE MULTIPLY: 5 at f240, un-made back to 1 by f252 ============ */
  const mult = f >= 240 ? 1 : 0;
  const crack = f >= 240 && f < 250 ? 1 - ramp(f, 240, 250) : 0;
  const COPIES = [
    { x: 190, lit: [242, 246], die: 246 },
    { x: 306, lit: [244, 248], die: 248 },
    { x: 422, lit: [246, 250], die: 250 },
    { x: 538, lit: [248, 252], die: 252 },
    { x: 662, lit: [250, 256], die: 999 },   // THE ORIGINAL. the beam arrives and simply stops on him.
  ];
  const standUp = ramp(f, 240, 245);
  // the beam rakes left to right as Fresh Eyes turns the part up into it
  const sweepX = interpolate(f, [242, 252], [150, 700], { ...cl });
  // f250: the freeze breaks exactly once. the original lunges, slaps the fake on his back at f251.
  const lunge = f >= 250 ? interpolate(f, [250, 251, 253], [0, 1, 0.35], { ...cl }) : 0;
  const onBack = f >= 251 ? 1 : 0;
  const peelOff = ramp(f, 252, 254);              // small, dry, short (§1 narrowed peel rule)
  const flutter = ramp(f, 253, 255);
  const clipped = f >= 254 ? 1 : 0;

  /* ============ HIERARCHY PASS: one moving key light + one moving dark scrim.
     The con owns f156..end. Before f184 the eye's anchor is the descending pod (MEMORY 0);
     from f184 it is the bright Fresh Eyes copy walking left. Everything else recesses so the
     viewer always knows which single warm sprite matters. Villain + copy + atmosphere stay on top. */
  const conLit = ramp(f, 156, 176);                    // how deep into the con we are (holds to f255)
  const spotX = feX;                                   // pod sits at x790; the copy walks left off it
  const spotY = f < 184 ? 880 : 940;
  const spotPulse = 1 + Math.sin(f * 0.12) * 0.03;     // the key never locks off
  const memTravel = ramp(f, 198, 210);                 // the MEMORY 0 gauge rides out with the copy

  /* ============ EIGHT CONTINUOUS LAYERS (f0..f255) ============ */
  const fanRot = f * 14.4;                                        // L1: 1.2 rev/sec, never stops
  const curtSway = (i: number) => Math.sin(f * 0.087 + i * 0.7) * 5; // L2: 2.4s sway, per-strip phase
  const sparkSurge = (f >= 150 && f < 162) || (f >= 244 && f < 256) ? 1.9 : 1;
  const ragPuff = (phase: number) => { const t = (f + phase) % 40; return t < 12 ? 1 - t / 12 : 0; }; // L5 cadence
  const flagPop = (i: number) => { const t = (f * 1.7 + seed(i * 5.3) * 90) % 90; return t < 7 ? Math.sin((t / 7) * Math.PI) : 0; }; // L6
  const clerkBLean = ramp(f, 204, 210) * (1 - ramp(f, 240, 244));
  const clerkBShut = ramp(f, 242, 248);
  const bulbDrop = f >= 242 ? Math.min(1, Math.pow(ramp(f, 242, 246), 2)) : 0;
  const bulbPop = f >= 246 && f < 254 ? 1 - ramp(f, 246, 254) : 0;
  // L7 code-rain: confined below setY 800 to f112 (reads only as spill), 15 cols f240..252, back to 3 by f252
  const spill = 1 - ramp(f, 112, 132);
  // foreign carriers that are not ours
  const foreign1 = f >= 30 && f < 44 ? ramp(f, 30, 44) : -1;
  const foreign2 = f >= 88 && f < 102 ? ramp(f, 88, 102) : -1;
  const foreign3 = f >= 205 && f < 219 ? ramp(f, 205, 219) : -1;  // skitters across the floor, port EATS it
  /* ============ HERO ============ */
  // §5 RULING: S5 stages the removal of S3's forehead DONE mark, before the f78 pen fires.
  const mark = 1 - ramp(f, 67, 75);
  const wipe = f >= 67 && f < 75 ? Math.sin(ramp(f, 67, 75) * Math.PI) : 0;
  // extension of the reaching nub. f0 he is 40 units short and already moving; f11 and f38 he gets there and is slapped off.
  const heroReach = f < 58 ? interpolate(f, [0, 9, 11, 14, 22, 26, 36, 38, 41, 48, 50, 55, 58], [0, 36, 40, 8, 2, 6, 34, 40, 4, 2, 44, 46, 44], { ...cl }) : 44;
  const hatFly = f >= 50 ? interpolate(f, [50, 58, 66, 70], [0, -46, -10, 0], { ...cl }) : 0;
  const hatRot = f >= 50 ? interpolate(f, [50, 58, 70], [0, -40, -13], { ...cl }) : (f >= 26 && f < 50 ? -16 : 0);
  const heroShock = slapHit(11) * 0.5 + slapHit(38) * 0.6;
  const smearNub = f >= 156 ? Math.sin((f - 156) * 0.16) * 9 : 0;
  const breath = f >= 156 ? 0.35 + 0.3 * Math.abs(Math.sin((f - 156) * 0.09)) : 0;
  const inOffice = 1 - ramp(f, 112, 130);   // full-size hero in the box, pre-crane

  /* ============ GEOMETRY HELPERS ============ */
  const camOffX = tx - 506 / camScale;
  const camOffY = ty - 396 / camScale;
  const RIG: React.CSSProperties = {
    position: "absolute", left: 0, top: 0, width: 1012, height: 1102, transformOrigin: "0% 0%",
    transform: `scale(${camScale}) translate(${-camOffX + drift}px, ${-camOffY + drift2}px) rotate(${camTilt}deg)`,
  };
  const STRIPS = Array.from({ length: 18 }, (_, i) => i);
  const HOLES = Array.from({ length: 40 }, (_, i) => i);
  const CHOLES = Array.from({ length: 12 }, (_, i) => i);

  /* THE DEAD GUN (§1 locked damage: split die + spring, wire-bound taped barrel, dried pad, jammed counter) */
  const DeadGun: React.FC<{ x: number; y: number; s: number; rot: number; z?: number }> = ({ x, y, s, rot, z = 12 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 54 * s, height: 40 * s, transform: `rotate(${rot}deg)`, transformOrigin: "10% 60%", zIndex: z }}>
      <svg viewBox="0 0 54 40" width={54 * s} height={40 * s} style={{ overflow: "visible" }}>
        <rect x="4" y="16" width="15" height="21" rx="2" fill="#20242E" />
        <rect x="4" y="16" width="15" height="4" fill="#333944" />
        <rect x="16" y="10" width="24" height="15" rx="2" fill="#2A303C" />
        {/* barrel, wire-bound and taped */}
        <rect x="36" y="12" width="16" height="11" rx="1.5" fill="#39414F" />
        <rect x="38" y="11" width="5" height="13" fill="#8B8272" opacity="0.9" />
        <rect x="45" y="11" width="4" height="13" fill="#8B8272" opacity="0.75" />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={37 + k * 3.6} y="10" width="1.2" height="15" fill="#9AA2AC" opacity="0.85" />)}
        {/* the die, SPLIT OPEN, spring out of the crack */}
        <path d="M 20 10 L 30 10 L 29 3 L 22 3 Z" fill="#343B48" />
        <path d="M 25.4 10 L 26.6 3 L 30 3 L 30.5 10 Z" fill="#161A22" />
        <path d="M 25.8 9 L 24.4 2.2 L 22.6 1.4" stroke="#0E1119" strokeWidth="1" fill="none" />
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={26.5 + Math.sin(k * 1.5 + f * 0.14) * 1.4} y={-2 - k * 2.2} width="4.6" height="1.5" rx="0.7" fill="#B9C0C9" opacity={0.9} />
        ))}
        {/* ink pad, dried and cracked */}
        <rect x="18" y="25" width="18" height="6" rx="1" fill="#6E7A2E" />
        <rect x="18" y="25" width="18" height="6" rx="1" fill="none" stroke="#3E4618" strokeWidth="0.5" />
        <path d="M 21 25 L 23 31 M 28 25 L 26.5 31 M 33 25.5 L 34 31" stroke="#3E4618" strokeWidth="0.7" />
        {/* brass flip-counter, JAMMED between two digits */}
        <rect x="6" y="4" width="12" height="9" rx="1.5" fill="#8A6314" />
        <rect x="7.5" y="5.5" width="9" height="6" fill="#1B1F14" />
        <rect x="8.5" y="5.5" width="3" height="6" fill="#C9A54A" />
        <rect x="12.5" y="5.5" width="3" height="3.2" fill="#C9A54A" opacity="0.75" />
        <rect x="12.5" y="9" width="3" height="2.6" fill="#7E6A2E" />
      </svg>
    </div>
  );

  /* THE COUNTERFEIT (hand-peeled off the spool: the gun is dead and cannot issue) */
  const Fake: React.FC<{ x: number; y: number; s: number; rot: number; o?: number; z?: number }> = ({ x, y, s, rot, o = 1, z = 27 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 40 * s, height: 30 * s, transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%", opacity: o, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 3 * s, background: `linear-gradient(150deg, ${FAKE}, #8FA03C)`, border: `${1.2 * s}px solid rgba(52,60,18,0.55)`, boxShadow: `0 ${3 * s}px ${7 * s}px rgba(0,0,0,0.6)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 2 * s, top: 8 * s, width: 30 * s, height: 5 * s, background: "rgba(42,46,20,0.55)", filter: `blur(${0.9 * s}px)`, transform: "rotate(-4deg)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 40 * s, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11 * s, lineHeight: `${17 * s}px`, color: "#2A2E14", transform: "rotate(-4deg)" }}>DONE</div>
        <div style={{ position: "absolute", left: 0, top: 16 * s, width: 40 * s, textAlign: "center", fontFamily: mono, fontSize: 4.4 * s, color: "rgba(40,46,20,0.7)" }}>SELF ISSUED</div>
      </div>
    </div>
  );
  return (
    <Panel label="THE TURN">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden", background: "linear-gradient(180deg,#12161c 0%,#0b0e13 100%)", fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${push})`, transformOrigin: "58% 46%" }}>
          <div style={RIG}>

            {/* ============ BACK WALL ============ */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 1102, background: "linear-gradient(180deg,#333c46 0%,#232a33 44%,#161b22 100%)", zIndex: 1 }} />
            {Array.from({ length: 9 }, (_, i) => <div key={"bw" + i} style={{ position: "absolute", left: 0, top: 40 + i * 116, width: 1012, height: 2, background: "rgba(255,255,255,0.04)", zIndex: 1 }} />)}
            {/* fan cage's slow rotating shadow bar */}
            <div style={{ position: "absolute", left: 560, top: 300, width: 520, height: 520, zIndex: 1, background: "conic-gradient(from 0deg, rgba(0,0,0,0.34) 0deg, transparent 26deg, rgba(0,0,0,0.34) 60deg, transparent 86deg, rgba(0,0,0,0.34) 120deg, transparent 146deg, rgba(0,0,0,0.34) 180deg, transparent 206deg, rgba(0,0,0,0.34) 240deg, transparent 266deg, rgba(0,0,0,0.34) 300deg, transparent 326deg)", transform: `rotate(${-fanRot * 0.16}deg)`, filter: "blur(9px)", opacity: 0.5 }} />
            {/* rear roller door slit: the cool rim that splits the palette */}
            <div style={{ position: "absolute", left: 330, top: 512, width: 240, height: 7, zIndex: 1, background: "linear-gradient(90deg,rgba(150,200,240,0), rgba(170,215,255,0.75), rgba(150,200,240,0))", boxShadow: "0 0 34px rgba(150,200,240,0.5)" }} />

            {/* ============ L1 EXTRACTOR FAN (950,640) never stops ============ */}
            <div style={{ position: "absolute", left: 878, top: 568, width: 144, height: 144, zIndex: 2 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "radial-gradient(circle,#0a0d12,#05070a)", boxShadow: "inset 0 0 22px rgba(0,0,0,0.9)" }} />
              <svg viewBox="0 0 144 144" width={144} height={144} style={{ position: "absolute", left: 0, top: 0 }}>
                <g transform={`rotate(${fanRot} 72 72)`}>
                  {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d="M 72 72 L 96 34 L 112 58 Z" fill="#4d5865" opacity="0.9" transform={`rotate(${k * 60} 72 72)`} />)}
                  <circle cx="72" cy="72" r="11" fill="#6b7784" />
                </g>
                {Array.from({ length: 8 }, (_, k) => <circle key={k} cx="72" cy="72" r={10 + k * 8} fill="none" stroke="rgba(180,195,215,0.16)" strokeWidth="1.6" />)}
                {[0, 45, 90, 135].map((a) => <line key={a} x1="72" y1="72" x2={72 + 68 * Math.cos((a * Math.PI) / 180)} y2={72 + 68 * Math.sin((a * Math.PI) / 180)} stroke="rgba(180,195,215,0.2)" strokeWidth="2" />)}
              </svg>
            </div>

            {/* ============ 12b DESPATCH COUNTER x40..260 setY420..580 + twin dial ============ */}
            <div style={{ position: "absolute", left: 40, top: 420, width: 220, height: 160, zIndex: 3, borderRadius: 4, background: "linear-gradient(180deg,#6b5a34,#3d3320)", boxShadow: "0 14px 30px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,220,150,0.2)" }}>
              {CHOLES.map((i) => { const fp = flagPop(i + 30); const shut = i === 5 ? clerkBShut : 0; return (
                <div key={"ch" + i} style={{ position: "absolute", left: 8 + (i % 4) * 52, top: 8 + Math.floor(i / 4) * 46, width: 46, height: 40 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "linear-gradient(180deg,#120f08,#241d10)", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.9)" }} />
                  <div style={{ position: "absolute", left: 4, top: -4 - fp * 7 + shut * 7, width: 38, height: 6, borderRadius: 2, background: `linear-gradient(180deg,#d8b455,#8a6314)`, boxShadow: `0 0 ${5 * fp}px rgba(216,180,85,0.7)`, transformOrigin: "50% 100%", transform: `rotate(${-fp * 22 + shut * 22}deg)` }} />
                </div>); })}
              {/* the floor twin of the pressure dial (240,560): same needle, blank face, no ticks */}
              <div style={{ position: "absolute", left: 168, top: 118, width: 56, height: 56, borderRadius: 28, background: "radial-gradient(circle at 36% 32%, #efe7d0, #b7ab8d)", border: "3px solid #8a6314", boxShadow: "0 5px 12px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.5)" }}>
                <div style={{ position: "absolute", left: 26, top: 8, width: 2.5, height: 22, background: "#231d10", transformOrigin: "50% 100%", transform: `rotate(${-118 + (needle + needleLate) * 2.3}deg)` }} />
                <div style={{ position: "absolute", left: 24, top: 24, width: 8, height: 8, borderRadius: 4, background: "#8a6314" }} />
              </div>
            </div>
            {/* CLERK B (150,620): files all 256 frames. leans f204. shuts his hole f242. frozen mid-file f255. */}
            <div style={{ position: "absolute", left: 96, top: 700, transform: `translate(0,-100%) rotate(${clerkBLean * 13}deg) translateX(${clerkBLean * 16}px)`, transformOrigin: "50% 100%", zIndex: 4 }}>
              <div style={{ position: "relative", width: 116, height: 116 }}>
                <Mascot lf={f} size={116} gaze={1} nodAmp={f >= 242 ? 0 : 1.8} nodSpeed={9} />
                {/* eyeshade visor: AMBER, not green. The scene's colour rule bans green at any value. */}
                <div style={{ position: "absolute", left: 24, top: 16, width: 68, height: 13, borderRadius: "3px 3px 9px 9px", background: "linear-gradient(180deg,#c9902e,#7d5410)", border: "1px solid rgba(0,0,0,0.4)" }} />
                <div style={{ position: "absolute", left: 20, top: 26, width: 76, height: 6, borderRadius: 3, background: "rgba(70,46,14,0.85)" }} />
                <div style={{ position: "absolute", left: 12, top: 54, width: 10, height: 20, borderRadius: 2, background: "#5c3f2a", opacity: 0.9 }} />
                <div style={{ position: "absolute", left: 94, top: 54, width: 10, height: 20, borderRadius: 2, background: "#5c3f2a", opacity: 0.9 }} />
                {/* the carrier in his nub. at f255 it is STILL unfiled. */}
                <div style={{ position: "absolute", left: 92 + (f >= 242 ? 0 : Math.sin(f * 0.3) * 5), top: 46, width: 16, height: 26, borderRadius: 7, background: "linear-gradient(180deg,#d8b455,#7e5a10)", border: "1px solid rgba(0,0,0,0.4)", boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }} />
              </div>
            </div>

            {/* ============ 12 PIGEONHOLE WALL (upstairs) + CLERK A. leaves with the office. ============ */}
            <div style={{ position: "absolute", left: 620, top: 60, width: 360, height: 110, zIndex: 3, opacity: 1 - ramp(f, 132, 152), borderRadius: 3, background: "linear-gradient(180deg,#6b5a34,#3d3320)", boxShadow: "0 10px 26px rgba(0,0,0,0.6)" }}>
              {HOLES.map((i) => { const fp = flagPop(i); return (
                <div key={"ph" + i} style={{ position: "absolute", left: 5 + (i % 10) * 35, top: 6 + Math.floor(i / 10) * 26, width: 31, height: 22 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 1.5, background: "#150f08", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.9)" }} />
                  <div style={{ position: "absolute", left: 3, top: -3 - fp * 5, width: 25, height: 4, borderRadius: 1.5, background: "linear-gradient(180deg,#d8b455,#8a6314)", transformOrigin: "50% 100%", transform: `rotate(${-fp * 20}deg)` }} />
                </div>); })}
            </div>
            <div style={{ position: "absolute", left: 716, top: 178, transform: "translate(0,-100%)", zIndex: 4, opacity: 1 - ramp(f, 132, 152) }}>
              <div style={{ position: "relative", width: 88, height: 88 }}>
                <Mascot lf={f + 19} size={88} gaze={-1} nodAmp={2.1} nodSpeed={8} />
                <div style={{ position: "absolute", left: 18, top: 12, width: 52, height: 10, borderRadius: "2px 2px 7px 7px", background: "linear-gradient(180deg,#c9902e,#7d5410)" }} />
                <div style={{ position: "absolute", left: 8, top: 40, width: 8, height: 15, borderRadius: 2, background: "#5c3f2a" }} />
                <div style={{ position: "absolute", left: 72, top: 40, width: 8, height: 15, borderRadius: 2, background: "#5c3f2a" }} />
                <div style={{ position: "absolute", left: 4 + Math.sin(f * 0.22) * 6, top: 34, width: 12, height: 20, borderRadius: 5, background: "linear-gradient(180deg,#d8b455,#7e5a10)" }} />
              </div>
            </div>
            {/* ============ 7 THE TUBE SPINE: brass + glass, no wordmark. Identity = repeated cast geometry. ============ */}
            {/* ceiling run setY180 x520..900 */}
            <div style={{ position: "absolute", left: 520, top: 168, width: 392, height: 26, zIndex: 5, borderRadius: 5, background: "linear-gradient(180deg,#c9a253,#6d5116 62%,#4a3810)", boxShadow: "0 8px 18px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,232,170,0.45)" }} />
            {/* right-edge run x900 setY180..560 */}
            <div style={{ position: "absolute", left: 888, top: 180, width: 26, height: 388, zIndex: 5, borderRadius: 5, background: "linear-gradient(90deg,#c9a253,#6d5116 62%,#4a3810)", boxShadow: "8px 0 18px rgba(0,0,0,0.55), inset 3px 0 0 rgba(255,232,170,0.45)" }} />
            {/* low run setY600 x430..900 */}
            <div style={{ position: "absolute", left: 424, top: 590, width: 480, height: 26, zIndex: 5, borderRadius: 5, background: "linear-gradient(180deg,#c9a253,#6d5116 62%,#4a3810)", boxShadow: "0 8px 18px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,232,170,0.45)" }} />
            {/* fat cast elbows */}
            {[[888, 168], [888, 588], [412, 588]].map(([ex, ey], i) => (
              <div key={"el" + i} style={{ position: "absolute", left: ex, top: ey, width: 30, height: 30, zIndex: 5, borderRadius: 7, background: "linear-gradient(140deg,#d8b455,#5d4512)", boxShadow: "0 6px 14px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,240,190,0.5)" }} />
            ))}
            {/* the repeated three-rib collar + knurled union nut. brass gone green in the crevices is DEAD here (no green): use tarnish brown. */}
            {[[560, 168, 0], [700, 168, 0], [840, 168, 0], [888, 260, 1], [888, 380, 1], [888, 480, 1], [470, 590, 0], [610, 590, 0], [750, 590, 0]].map(([jx, jy, vert], i) => (
              <div key={"jt" + i} style={{ position: "absolute", left: jx, top: jy, width: vert ? 34 : 16, height: vert ? 16 : 34, zIndex: 6, marginLeft: vert ? -4 : 0, marginTop: vert ? 0 : -4 }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: vert ? 0 : k * 5.5, top: vert ? k * 5.5 : 0, width: vert ? 34 : 4, height: vert ? 4 : 34, background: "linear-gradient(180deg,#e0bd63,#5d4512)", borderRadius: 1.5 }} />)}
                <div style={{ position: "absolute", left: vert ? 0 : 0, top: 0, width: vert ? 34 : 16, height: vert ? 16 : 34, background: "repeating-linear-gradient(" + (vert ? "90deg" : "0deg") + ", rgba(0,0,0,0.28) 0 1.5px, transparent 1.5px 4px)", opacity: 0.7 }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(80,52,20,0.55), transparent 70%)" }} />
              </div>
            ))}
            {/* glass inspection windows every 140 units */}
            {[590, 730, 870].map((wx, i) => (
              <div key={"gw" + i} style={{ position: "absolute", left: wx, top: 172, width: 40, height: 18, zIndex: 6, borderRadius: 3, background: "linear-gradient(180deg,rgba(190,225,255,0.42),rgba(120,160,200,0.14))", border: "1.5px solid rgba(216,180,85,0.6)", boxShadow: "inset 0 2px 5px rgba(255,255,255,0.35)" }} />
            ))}
            {[300, 420, 500].map((wy, i) => (
              <div key={"gv" + i} style={{ position: "absolute", left: 892, top: wy, width: 18, height: 40, zIndex: 6, borderRadius: 3, background: "linear-gradient(90deg,rgba(190,225,255,0.42),rgba(120,160,200,0.14))", border: "1.5px solid rgba(216,180,85,0.6)" }} />
            ))}
            {/* OUR carrier riding the line */}
            {carrierOn ? (
              <div style={{ position: "absolute", left: cp.x - 8, top: cp.y - 13, width: 16, height: 26, zIndex: 7, borderRadius: 7, background: "linear-gradient(180deg,#f0d894,#8a6314)", boxShadow: "0 0 16px rgba(240,216,148,0.9), 0 0 34px rgba(255,200,90,0.5)" }} />
            ) : null}
            {/* FOREIGN carriers that are not ours */}
            {foreign1 >= 0 ? <div style={{ position: "absolute", left: LP(540, 890, foreign1), top: 172, width: 14, height: 22, zIndex: 7, borderRadius: 6, background: "rgba(216,180,85,0.55)", filter: "blur(1.4px)", opacity: 0.7 }} /> : null}
            {foreign2 >= 0 ? <div style={{ position: "absolute", left: LP(890, 540, foreign2), top: 172, width: 14, height: 22, zIndex: 7, borderRadius: 6, background: "rgba(216,180,85,0.5)", filter: "blur(1.4px)", opacity: 0.65 }} /> : null}
            {foreign3 >= 0 && foreign3 < 0.62 ? <div style={{ position: "absolute", left: 892, top: LP(320, 548, foreign3 / 0.62), width: 16, height: 24, zIndex: 7, borderRadius: 6, background: "rgba(216,180,85,0.6)", filter: "blur(1.2px)" }} /> : null}

            {/* ============ 7b THE REDUCER (790, 560..640): three collars, one machine at two sizes ============ */}
            <div style={{ position: "absolute", left: 746, top: 556, width: 96, height: 88, zIndex: 8, borderRadius: 6, background: "linear-gradient(150deg,#5a5147,#2e2921)", boxShadow: "0 14px 30px rgba(0,0,0,0.7), inset 0 3px 0 rgba(255,230,180,0.16)" }}>
              {/* three visible collars stepping the 90mm line UP to body scale */}
              {[0, 1, 2].map((k) => (
                <div key={"rc" + k} style={{ position: "absolute", left: 12 + k * 2, top: 8 + k * 22, width: 72 - k * 4, height: 16, borderRadius: 3, background: "linear-gradient(180deg,#e0bd63,#5d4512)", boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }}>
                  <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0 1.5px, transparent 1.5px 4.5px)" }} />
                </div>
              ))}
              {/* the heavy brass lever on the flank: THROWS at f156 */}
              <div style={{ position: "absolute", left: 84, top: 34, width: 8, height: 40, transformOrigin: "50% 0%", transform: `rotate(${f >= 156 ? interpolate(f, [156, 161], [0, 76], { ...cl }) : 0}deg)` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "linear-gradient(180deg,#e0bd63,#6d5116)" }} />
                <div style={{ position: "absolute", left: -3, top: 34, width: 14, height: 14, borderRadius: 7, background: "#8a1f14" }} />
              </div>
              {/* the small dial: swings from a CARRIER pictogram to a BODY pictogram. AMBER backlight, never green. */}
              <div style={{ position: "absolute", left: 26, top: 32, width: 40, height: 40, borderRadius: 20, background: "radial-gradient(circle at 36% 32%, #2c2620, #14110c)", border: "2.5px solid #8a6314", boxShadow: `0 0 ${10 + 14 * ramp(f, 156, 164)}px rgba(207,149,68,${0.4 + 0.5 * ramp(f, 156, 164)}), inset 0 2px 5px rgba(255,255,255,0.14)` }}>
                {/* carrier pictogram (left) */}
                <div style={{ position: "absolute", left: 8, top: 12, width: 7, height: 13, borderRadius: 3, background: AMBER, opacity: 0.34 + 0.66 * (1 - ramp(f, 156, 164)) }} />
                {/* body pictogram (right): head + shoulders */}
                <div style={{ position: "absolute", left: 24, top: 11, width: 8, height: 6, borderRadius: 2, background: AMBER, opacity: 0.24 + 0.76 * ramp(f, 156, 164) }} />
                <div style={{ position: "absolute", left: 22, top: 18, width: 12, height: 7, borderRadius: "3px 3px 1px 1px", background: AMBER, opacity: 0.24 + 0.76 * ramp(f, 156, 164) }} />
                {/* the needle swinging carrier -> body, and back again at f255 */}
                <div style={{ position: "absolute", left: 19, top: 6, width: 2, height: 15, background: "#f0d894", transformOrigin: "50% 100%", transform: `rotate(${-42 + 84 * ramp(f, 156, 164) - 30 * ramp(f, 250, 256)}deg)`, boxShadow: "0 0 5px rgba(240,216,148,0.9)" }} />
              </div>
            </div>
            {/* the OPAQUE steel personnel tube: reducer setY640 -> the mouth at setY760. The pod hides behind it. */}
            <div style={{ position: "absolute", left: 668, top: 636, width: 214, height: 128, zIndex: 16, background: "linear-gradient(90deg,#4d5661,#242a32 58%,#161b21)", boxShadow: "0 14px 26px rgba(0,0,0,0.65), inset 4px 0 0 rgba(200,220,240,0.16)" }}>
              {/* the mouth flange the pod drops out of at setY760 */}
              <div style={{ position: "absolute", left: -14, top: 112, width: 242, height: 18, borderRadius: 3, background: "linear-gradient(180deg,#d8b455,#5d4512)", boxShadow: "0 5px 12px rgba(0,0,0,0.7), inset 0 3px 0 rgba(255,240,190,0.45)" }} />
              {[0, 1, 2].map((k) => <div key={"pt" + k} style={{ position: "absolute", left: 8, top: 14 + k * 30, width: 198, height: 5, borderRadius: 2, background: "rgba(200,220,240,0.1)" }} />)}
            </div>

            {/* ============ 8 RAG A (elbow 900,180) + RAG B (900,460): 40-frame steam cadence ============ */}
            {[{ x: 884, y: 160, ph: 0 }, { x: 884, y: 448, ph: 17 }].map((rg, i) => {
              const pf = i === 0 ? (f >= 120 && f < 136 ? 1 - ramp(f, 120, 136) : ragPuff(rg.ph) * 0.45) : ragPuff(rg.ph);
              return (
                <div key={"rag" + i} style={{ position: "absolute", left: rg.x, top: rg.y, zIndex: 9 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 15, borderRadius: 5, background: "linear-gradient(160deg,#7e7057,#453b2a)", transform: `rotate(${-14 + Math.sin(f * 0.11 + i) * 4}deg)`, boxShadow: "0 3px 7px rgba(0,0,0,0.6)" }} />
                  <div style={{ position: "absolute", left: -14 - pf * 40, top: -8 - pf * 22, width: 60 + pf * 90, height: 40 + pf * 62, borderRadius: 40, background: "radial-gradient(circle, rgba(228,238,248,0.55), rgba(228,238,248,0) 68%)", opacity: pf * 0.9, filter: `blur(${5 + pf * 8}px)` }} />
                </div>
              );
            })}

            {/* ============ 9 WRENCH BAY x250..780 setY560..820 + SPARK CURTAIN ============ */}
            <div style={{ position: "absolute", left: 250, top: 556, width: 530, height: 268, zIndex: 8, background: "linear-gradient(180deg,#1c2228 0%,#0e1217 100%)", boxShadow: "inset 0 0 60px rgba(0,0,0,0.9)" }} />
            <div style={{ position: "absolute", left: 244, top: 548, width: 542, height: 16, zIndex: 9, borderRadius: 3, background: "linear-gradient(180deg,#5c6672,#2c333c)", boxShadow: "0 6px 14px rgba(0,0,0,0.6)" }} />
            {/* THE WELDER: silhouette only, visor down. We never see his face. */}
            <div style={{ position: "absolute", left: 356, top: 800, transform: "translate(0,-100%)", zIndex: 10 }}>
              <div style={{ position: "relative", width: 132, height: 132, filter: "brightness(0.08) saturate(0)" }}>
                <Mascot lf={f} size={132} gaze={-1} nodAmp={f >= 152 && f < 176 ? 6 : 2} nodSpeed={f >= 152 && f < 176 ? 3 : 9} />
              </div>
              {/* visor + the nub that TAKES IT without a beat of hesitation */}
              <div style={{ position: "absolute", left: 30, top: 14, width: 74, height: 34, borderRadius: "8px 8px 3px 3px", background: "#05070a" }} />
              <div style={{ position: "absolute", left: -4 + takeIt * 26, top: 62, width: 26, height: 22, borderRadius: 4, background: "#05070a", transform: `rotate(${takeIt * -22}deg)`, opacity: ramp(f, 166, 170) }} />
            </div>
            {/* arc-weld flash behind the strips */}
            <div style={{ position: "absolute", left: 300, top: 620, width: 240, height: 200, zIndex: 10, borderRadius: 100, background: "radial-gradient(circle, rgba(200,228,255,0.75), rgba(140,190,255,0) 68%)", filter: "blur(10px)", opacity: (f >= 150 && f < 178 ? 0.55 + 0.45 * Math.abs(Math.sin(f * 1.7)) : 0.1 + 0.14 * Math.abs(Math.sin(f * 0.9))) * sparkSurge * 0.6 }} />
            {/* the orange PVC strips, per-strip phase, dragged into a permanent sway by the fan */}
            {STRIPS.map((i) => (
              <div key={"st" + i} style={{ position: "absolute", left: 252 + i * 29.5, top: 562, width: 27, height: 250, zIndex: 11, borderRadius: "0 0 4px 4px", background: `linear-gradient(180deg, rgba(226,116,38,${0.86 - (i % 3) * 0.05}), rgba(150,66,18,0.9))`, boxShadow: "inset -3px 0 6px rgba(0,0,0,0.45)", transformOrigin: "50% 0%", transform: `rotate(${curtSway(i)}deg) translateX(${Math.sin(f * 0.1 + i * 0.5) * 2}px)`, opacity: 0.94 }} />
            ))}
            {/* stencil on the strips: the S1 shop, spelled identically, tagline escalated. NO DIGIT. */}
            <div style={{ position: "absolute", left: 264, top: 596, width: 500, zIndex: 12, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: 1, color: "rgba(28,16,8,0.62)", textShadow: "0 1px 0 rgba(255,190,120,0.28)", pointerEvents: "none" }}>JIFFY LOOB</div>
            <div style={{ position: "absolute", left: 264, top: 634, width: 500, zIndex: 12, textAlign: "center", fontFamily: mono, fontSize: 15, letterSpacing: 2.4, color: "rgba(28,16,8,0.5)", pointerEvents: "none" }}>WE READ THE ORDER NOW</div>
            {/* the carrier taken in through the strips at f148 */}
            {f >= 146 && f < 152 ? <div style={{ position: "absolute", left: 400, top: 596, width: 22, height: 30, zIndex: 12, borderRadius: 6, background: "linear-gradient(180deg,#f0d894,#8a6314)", boxShadow: "0 0 14px rgba(240,216,148,0.8)" }} /> : null}
            {/* ============ 20 THE FLOOR: bay lines, KEEP CLEAR, oil bloom, drain ============ */}
            <div style={{ position: "absolute", left: 0, top: 800, width: 1012, height: 302, zIndex: 13, background: "linear-gradient(180deg,#2b3138 0%,#1a1f26 46%,#0f1319 100%)" }} />
            <svg viewBox="0 0 1012 302" width={1012} height={302} style={{ position: "absolute", left: 0, top: 800, zIndex: 13 }}>
              {Array.from({ length: 8 }, (_, i) => <line key={i} x1={506} y1={-40} x2={-460 + i * 280} y2={302} stroke="rgba(255,255,255,0.045)" strokeWidth="1.6" />)}
              <line x1="0" y1="96" x2="1012" y2="96" stroke="rgba(255,255,255,0.04)" strokeWidth="1.6" />
              <line x1="0" y1="200" x2="1012" y2="200" stroke="rgba(255,255,255,0.035)" strokeWidth="1.6" />
              {/* yellow hatched KEEP CLEAR box around the pod cradle */}
              <path d="M 596 246 L 660 10 L 954 10 L 1000 246 Z" fill="rgba(230,180,60,0.07)" stroke="rgba(230,180,60,0.3)" strokeWidth="3" />
              {Array.from({ length: 9 }, (_, i) => <line key={"h" + i} x1={606 + i * 44} y1={244} x2={664 + i * 34} y2={12} stroke="rgba(230,180,60,0.14)" strokeWidth="7" />)}
              {/* oil bloom stains */}
              <ellipse cx="330" cy="150" rx="96" ry="26" fill="rgba(10,14,20,0.6)" />
              <ellipse cx="470" cy="212" rx="130" ry="30" fill="rgba(10,14,20,0.5)" />
              <ellipse cx="190" cy="238" rx="80" ry="22" fill="rgba(10,14,20,0.55)" />
              <ellipse cx="820" cy="176" rx="70" ry="20" fill="rgba(10,14,20,0.45)" />
            </svg>
            {/* drain grate (500,1070): the fog pours into it from f200 to the last frame */}
            <div style={{ position: "absolute", left: 456, top: 1052, width: 88, height: 34, zIndex: 14, borderRadius: 3, background: "linear-gradient(180deg,#12161c,#05070a)", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.95)", border: "2px solid #39424c" }}>
              {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 6, top: 5 + k * 6, width: 76, height: 2.5, background: "#4b5460", borderRadius: 1 }} />)}
            </div>
            {/* 15 THE HEADER: the scene's ONE header, half scuffed off by the cradle */}
            <div style={{ position: "absolute", left: 640, top: 736, width: 300, zIndex: 12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: 3, color: "rgba(226,214,196,0.30)", textShadow: "0 2px 0 rgba(0,0,0,0.5)", WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,1) 52%, rgba(0,0,0,0.12) 84%)", pointerEvents: "none" }}>FRESH EYES</div>

            {/* ============ 4 THE CONFISCATED WRENCH DRUM x165..245, lip setY690 ============ */}
            <div style={{ position: "absolute", left: 165, top: 690 + hyd * 0.5, width: 80, height: 104, zIndex: 15, borderRadius: "5px 5px 3px 3px", background: "linear-gradient(90deg,#4a4034,#2a241c 55%,#171410)", boxShadow: "0 16px 30px rgba(0,0,0,0.75), inset 3px 0 0 rgba(255,220,160,0.12)" }}>
              <div style={{ position: "absolute", left: -3, top: -5, width: 86, height: 12, borderRadius: 6, background: "linear-gradient(180deg,#6b5c48,#332c22)" }} />
              {[26, 62].map((ry, k) => <div key={k} style={{ position: "absolute", left: 0, top: ry, width: 80, height: 5, background: "rgba(0,0,0,0.5)" }} />)}
              {/* the chalked tally in gate-fives: two full gates + four strokes, and the FIFTEENTH lands at f70 */}
              <svg viewBox="0 0 80 40" width={80} height={40} style={{ position: "absolute", left: 0, top: 36 }}>
                {[0, 1].map((g) => (<g key={g} transform={`translate(${5 + g * 26},4)`}>
                  {[0, 1, 2, 3].map((s) => <line key={s} x1={s * 4} y1="0" x2={s * 4} y2="15" stroke="rgba(240,238,230,0.72)" strokeWidth="1.6" />)}
                  <line x1="-2" y1="14" x2="14" y2="1" stroke="rgba(240,238,230,0.72)" strokeWidth="1.6" />
                </g>))}
                <g transform="translate(57,4)">
                  {[0, 1, 2, 3].map((s) => <line key={s} x1={s * 4} y1="0" x2={s * 4} y2="15" stroke="rgba(240,238,230,0.72)" strokeWidth="1.6" />)}
                  {/* the closing stroke of the third gate: a counter with no digit on it */}
                  <line x1="-2" y1="14" x2={-2 + 16 * tally15} y2={14 - 13 * tally15} stroke="rgba(255,255,255,0.95)" strokeWidth="2" opacity={tally15} />
                </g>
              </svg>
            </div>
            {/* the fanned heap: fourteen at f0, countable as a mass. fifteen from f66. */}
            {Array.from({ length: heapCount }, (_, i) => {
              const isCrown = i === heapCount - 1;
              const fan = -46 + i * 6.2 + hyd * (0.6 + seed(i) * 0.9);
              const cy = 688 - (i % 3) * 3 + hyd * 0.6;
              const slipY = isCrown ? slip * 46 : 0;
              const slipR = isCrown ? slip * 74 : 0;
              return (
                <div key={"wr" + i} style={{ position: "absolute", left: 172 + (i % 5) * 3 + slip * (isCrown ? -16 : 0), top: cy + slipY, width: 64, height: 9, zIndex: 16, transformOrigin: "12% 50%", transform: `rotate(${fan + slipR + (isCrown ? teeter * 3 : 0)}deg)` }}>
                  <div style={{ position: "absolute", left: 10, top: 2, width: 46, height: 5, borderRadius: 2.5, background: "linear-gradient(180deg,#aab3bc,#5c656f)" }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: 9, borderRadius: 3, border: "2.5px solid #9aa4ad", borderRight: "none" }} />
                  <div style={{ position: "absolute", left: 52, top: 0, width: 11, height: 9, borderRadius: 2, background: "#7d868f" }} />
                </div>
              );
            })}
            {/* OUR wrench, falling 385 units out of the chute's left-spitting lip, through the (300,930) beam */}
            {falling ? (
              <div style={{ position: "absolute", left: wrX, top: wrY, width: 64, height: 9, zIndex: 17, transformOrigin: "50% 50%", transform: `rotate(${wrRot}deg)`, filter: "drop-shadow(0 0 8px rgba(255,226,178,0.5))" }}>
                <div style={{ position: "absolute", left: 10, top: 2, width: 46, height: 5, borderRadius: 2.5, background: "linear-gradient(180deg,#cfd6dd,#6d757e)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: 9, borderRadius: 3, border: "2.5px solid #cfd6dd", borderRight: "none" }} />
              </div>
            ) : null}
            {/* a nub reaches out of the bay and strokes the tally at f70 */}
            {f >= 68 && f < 80 ? <div style={{ position: "absolute", left: 250 - ramp(f, 68, 72) * 26, top: 726, width: 26, height: 22, zIndex: 17, borderRadius: 4, background: "#05070a", opacity: 1 - ramp(f, 76, 80) }} /> : null}

            {/* ============ 22 THE PART CRADLE (560,840): the only clean spot on an oiled floor ============ */}
            <div style={{ position: "absolute", left: 516, top: 828 + cradleRing, width: 92, height: 40, zIndex: 15 }}>
              <div style={{ position: "absolute", left: -14, top: 30, width: 120, height: 18, borderRadius: 60, background: "radial-gradient(ellipse, rgba(255,232,170,0.22), transparent 70%)" }} />
              <svg viewBox="0 0 92 40" width={92} height={40}>
                <path d="M 6 38 L 26 8 L 40 8 L 46 26 L 52 8 L 66 8 L 86 38 Z" fill="#5c6672" />
                <path d="M 6 38 L 26 8 L 40 8 L 46 26 L 52 8 L 66 8 L 86 38 Z" fill="none" stroke="#8894a2" strokeWidth="1.4" />
                <rect x="0" y="34" width="92" height="6" rx="2" fill="#39424c" />
              </svg>
            </div>

            {/* ============ 19 THE LADDER CLAUDE (880,500) ============ */}
            <div style={{ position: "absolute", left: 840, top: 460, width: 92, height: 250, zIndex: 19 }}>
              <div style={{ position: "absolute", left: 8, top: 40, width: 7, height: 210, background: "linear-gradient(180deg,#7e6a44,#3d3320)", transform: "rotate(5deg)" }} />
              <div style={{ position: "absolute", left: 62, top: 40, width: 7, height: 210, background: "linear-gradient(180deg,#7e6a44,#3d3320)", transform: "rotate(-5deg)" }} />
              {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 8, top: 66 + k * 40, width: 60, height: 6, borderRadius: 2, background: "#6b5a34" }} />)}
              {/* the inspection lamp he is changing */}
              <div style={{ position: "absolute", left: 22, top: 6, width: 40, height: 16, borderRadius: "8px 8px 2px 2px", background: "linear-gradient(180deg,#5c6672,#2c333c)" }} />
              <div style={{ position: "absolute", left: 34, top: 22, width: 15, height: 18, borderRadius: "50% 50% 40% 40%", background: `radial-gradient(circle at 40% 34%, rgba(255,236,190,${0.95 - bulbDrop}), rgba(200,150,60,${0.5 - bulbDrop * 0.5}))`, boxShadow: `0 0 ${18 * (1 - bulbDrop)}px rgba(255,220,150,0.7)`, opacity: 1 - bulbDrop }} />
            </div>
            <div style={{ position: "absolute", left: 852, top: 566, transform: `translate(0,-100%) rotate(${bulbDrop * -9}deg)`, transformOrigin: "50% 100%", zIndex: 19 }}>
              <Mascot lf={f} size={86} gaze={0} nodAmp={1.6} nodSpeed={12} shock={f >= 242 && f < 254 ? 0.55 : 0} />
            </div>
            {/* the dropped bulb falls through the key beam and pops on the concrete at f246 */}
            {f >= 242 && f < 247 ? <div style={{ position: "absolute", left: 874, top: LP(496, 1000, Math.pow(ramp(f, 242, 246), 2)), width: 14, height: 17, zIndex: 18, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle at 40% 34%, #fff0cc, #c8963c)", boxShadow: "0 0 14px rgba(255,220,150,0.8)" }} /> : null}
            {bulbPop > 0 ? <>{Array.from({ length: 9 }, (_, k) => { const a = (k / 9) * Math.PI * 2; const d = (1 - bulbPop) * 40; return <div key={"bp" + k} style={{ position: "absolute", left: 880 + Math.cos(a) * d, top: 1000 + Math.sin(a) * d * 0.4, width: 3, height: 3, zIndex: 18, background: "#fff0cc", opacity: bulbPop }} />; })}</> : null}
            {/* ============ 14 THE VACUUM POD. Clipped to the tube's mouth: genuinely hidden until f160. ============ */}
            <div style={{ position: "absolute", left: 640, top: 760, width: 300, height: 342, zIndex: 17, overflow: "hidden", pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: 20, top: 30 + podDrop + podSlam, width: 272, height: 300 }}>
              {/* steel cradle */}
              <div style={{ position: "absolute", left: -16, top: 246, width: 304, height: 60, borderRadius: 6, background: "linear-gradient(180deg,#5c6672,#252c34)", boxShadow: "0 18px 34px rgba(0,0,0,0.8), inset 0 3px 0 rgba(255,255,255,0.14)" }} />
              {/* brass collar + EIGHT rotating dog-latches */}
              <div style={{ position: "absolute", left: -8, top: 0, width: 288, height: 40, borderRadius: 5, background: "linear-gradient(180deg,#d8b455,#5d4512)", boxShadow: "0 6px 16px rgba(0,0,0,0.7), inset 0 3px 0 rgba(255,240,190,0.5)" }} />
              {Array.from({ length: 8 }, (_, k) => (
                <div key={"dl" + k} style={{ position: "absolute", left: 6 + k * 34, top: 8, width: 22, height: 22, borderRadius: 11, background: "linear-gradient(150deg,#f0d894,#7e5a10)", border: "2px solid rgba(40,28,6,0.6)", transform: `rotate(${latches * 96 + k * 4}deg)` }}>
                  <div style={{ position: "absolute", left: 9, top: 1, width: 4, height: 20, borderRadius: 2, background: "#3d2d08" }} />
                </div>
              ))}
              {/* the clear capsule */}
              <div style={{ position: "absolute", left: 10, top: 38, width: 252, height: 214, borderRadius: "10px 10px 6px 6px", background: "linear-gradient(100deg, rgba(120,160,205,0.16), rgba(50,74,105,0.14) 46%, rgba(120,160,205,0.13))", border: "3px solid rgba(120,150,185,0.36)", boxShadow: "inset 0 0 40px rgba(120,170,215,0.12), 0 14px 30px rgba(0,0,0,0.6)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 18, top: 0, width: 30, height: 214, background: "linear-gradient(90deg, rgba(255,255,255,0.26), rgba(255,255,255,0))" }} />
                {/* residual internal fog before the blow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 70%, rgba(238,246,255,0.55), rgba(238,246,255,0) 70%)", opacity: (1 - hiss) * 0.85 }} />
              </div>
              {/* the door: swings open at f184 */}
              <div style={{ position: "absolute", left: 10, top: 38, width: 126, height: 214, borderRadius: "10px 0 0 6px", background: "linear-gradient(100deg, rgba(130,170,215,0.2), rgba(60,88,120,0.16))", border: "3px solid rgba(130,160,195,0.45)", transformOrigin: "0% 50%", transform: `perspective(700px) rotateY(${-doorSwing * 88}deg)`, boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }} />
              {/* THE SCENE'S ONE NUMBER: two words a five-year-old can read */}
              <div style={{ position: "absolute", left: 150, top: 6, width: 120, height: 26, borderRadius: 3, background: "#0a0d12", border: "2px solid rgba(40,28,6,0.7)", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 13, letterSpacing: 1.6, color: AMBER, opacity: 0.5 + 0.5 * memReady, textShadow: `0 0 ${8 * memReady}px rgba(207,149,68,0.9)` }}>MEMORY</span>
                <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, color: AMBER, opacity: memReady, textShadow: `0 0 ${12 * memReady}px rgba(207,149,68,1)` }}>{f >= 176 && f < 179 ? Math.floor(seed(f) * 9) : 0}</span>
              </div>
            </div>
            </div>
            {/* the seal blow: PSSSHHH */}
            {hiss > 0 && hiss < 1 ? (
              <div style={{ position: "absolute", left: 600, top: 990, width: 400, height: 120, zIndex: 18, borderRadius: 60, background: "radial-gradient(ellipse, rgba(238,246,255,0.7), rgba(238,246,255,0) 70%)", filter: "blur(12px)", opacity: Math.sin(hiss * Math.PI) }} />
            ) : null}

            {/* ============ 16 THE VILLAIN'S I-BEAM + 17 THE SAFETY BOARD ============ */}
            <div style={{ position: "absolute", left: 100, top: 0, width: 60, height: 1102, zIndex: 19, background: "linear-gradient(90deg,#4a535d,#262d35 60%,#161b21)", boxShadow: "14px 0 30px rgba(0,0,0,0.6), inset 3px 0 0 rgba(255,255,255,0.08)" }}>
              <div style={{ position: "absolute", left: 0, top: 860, width: 60, height: 240, background: "repeating-linear-gradient(-45deg, rgba(230,180,60,0.55) 0 12px, rgba(30,26,18,0.75) 12px 24px)", opacity: 0.66, WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.8) 100%)" }} />
            </div>
            {/* the reel's thesis hung on a wall, and he is using it to hold himself up */}
            <div style={{ position: "absolute", left: 34, top: 900, width: 112, height: 96, zIndex: 20, borderRadius: 4, background: "linear-gradient(180deg,#e8e4d8,#b9b3a2)", border: "3px solid #7d8590", boxShadow: "0 8px 18px rgba(0,0,0,0.7)", transform: `rotate(${-3 + vLean * 2.4}deg)` }}>
              <svg viewBox="0 0 112 96" width={112} height={96}>
                {/* a nub stamping its OWN sheet of paper. No words. */}
                <rect x="26" y="52" width="40" height="30" rx="2" fill="#f7f5ee" stroke="#3a4048" strokeWidth="2" />
                <rect x="40" y="24" width="22" height="22" rx="3" fill="#3a4048" />
                <rect x="46" y="12" width="10" height="14" rx="3" fill="#3a4048" />
                <rect x="34" y="44" width="34" height="7" rx="2" fill="#3a4048" />
                <circle cx="56" cy="48" r="41" fill="none" stroke="#b8352a" strokeWidth="7" />
                <line x1="27" y1="19" x2="85" y2="77" stroke="#b8352a" strokeWidth="7" />
              </svg>
            </div>

            {/* ============ L7 CODE-RAIN: confined below setY800 to f112, 15 cols f240..252, 3 by f252 ============ */}
            {f >= 240 && f < 252 ? (
              <>{Array.from({ length: 15 }, (_, k) => (
                <CodeRain key={"mr" + k} lf={f + k * 13} x={196 + k * 44} y={-40} h={1140} cols={1} o={0.85 * ramp(f, 240, 244) * (1 - ramp(f, 249, 252))} gap={0} />
              ))}</>
            ) : null}

            {/* ============ HIERARCHY: mute the loud shop curtain so it stops competing ============ */}
            {conLit > 0.01 ? (
              <div style={{ position: "absolute", left: 244, top: 548, width: 542, height: 276, zIndex: 13, pointerEvents: "none", background: "linear-gradient(180deg, rgba(14,18,24,0.58), rgba(14,18,24,0.42))", opacity: conLit * 0.72, filter: "blur(1px)" }} />
            ) : null}
            {/* the con scrim: recesses the whole shop (curtain, clerks, ladder, tubes, machinery) into
                a dim backdrop, holding one warm pool of light on the subject. Sits UNDER villain + copy,
                UNDER the beams/fog/dust (z28+), so richness survives but the eye lands in one place. */}
            {conLit > 0.01 ? (
              <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 1102, zIndex: 20, pointerEvents: "none", opacity: conLit, background: `radial-gradient(ellipse ${360 * spotPulse}px ${300 * spotPulse}px at ${spotX}px ${spotY}px, rgba(6,9,13,0) 0%, rgba(6,9,13,0.30) 46%, rgba(6,9,13,0.66) 100%)` }} />
            ) : null}
            {/* the warm key that tracks the subject: the softest, brightest thing in the frame */}
            {conLit > 0.01 ? (
              <div style={{ position: "absolute", left: spotX - 260, top: spotY - 300, width: 520, height: 560, zIndex: 23, pointerEvents: "none", mixBlendMode: "screen", filter: "blur(6px)", background: `radial-gradient(ellipse at 50% 50%, rgba(255,224,170,${0.2 * conLit}), rgba(255,210,140,0) 66%)` }} />
            ) : null}

            {/* ============ THE VILLAIN, and the five of him ============ */}
            {mult ? (
              <>
                {COPIES.map((cpy, i) => {
                  const isOrig = i === 4;
                  const lit = f >= cpy.lit[0] && f <= cpy.lit[1] ? 1 : 0;
                  const gone = !isOrig && f >= cpy.die ? Math.min(1, (f - cpy.die) / 5) : 0;
                  if (gone >= 1) return null;
                  const rise = Math.pow(standUp, 0.7);
                  const lx = LP(636, cpy.x, rise);
                  const ly = LP(1032, 990, rise);
                  const lungeX = isOrig ? lunge * 74 : 0;
                  return (
                    <div key={"cp" + i} style={{ position: "absolute", left: lx - 78 + lungeX, top: ly, transform: `translate(0,-100%) scale(${1 - gone * 0.14}) translateY(${gone * 22}px)`, transformOrigin: "50% 100%", zIndex: 21 + i, opacity: 1 - gone, filter: `brightness(${(gone ? 0.34 : 1) * (0.62 + lit * 0.95)}) saturate(${gone ? 0.15 : 1})` }}>
                      <div style={{ position: "relative", width: 188, height: 188 }}>
                        <Villain lf={f} size={188} gaze={-1} nodAmp={0} nodSpeed={9} rain={gone ? 0 : (isOrig ? 1 : 1 - gone)} />
                        {/* §1: the S3 collar ink, worn permanently */}
                        <div style={{ position: "absolute", left: 60, top: 80, width: 26, height: 15, borderRadius: 3, background: FAKE, opacity: 0.62, filter: "blur(1.4px)", zIndex: 3 }} />
                        {/* ALL FIVE throw the SAME arm at the SAME empty air on the SAME frame, and HOLD */}
                        <div style={{ position: "absolute", left: 126, top: 58, width: 66, height: 21, borderRadius: 8, background: VILL, transform: "rotate(-15deg)", zIndex: 3, boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }} />
                        <div style={{ position: "absolute", left: 176, top: 44, width: 22, height: 22, borderRadius: 5, background: VILL, zIndex: 3 }} />
                        <DeadGun x={-16} y={72} s={0.72} rot={-8} z={4} />
                        <Fake x={-30} y={58} s={0.62} rot={-13} o={isOrig && onBack ? 0 : 1} z={5} />
                        {/* the glint bar: same shades, same glint firing on the same frame */}
                        <div style={{ position: "absolute", left: 38 + lit * 16, top: 52, width: 15, height: 5, background: "rgba(255,255,255,0.92)", transform: "rotate(-16deg)", opacity: lit * 0.9, zIndex: 4, boxShadow: "0 0 8px rgba(255,255,255,0.8)" }} />
                      </div>
                    </div>
                  );
                })}
                {/* the shatter of slate at f240 */}
                {crack > 0 ? <>{Array.from({ length: 22 }, (_, k) => { const a = seed(k * 3.7) * Math.PI * 2; const d = (1 - crack) * (40 + seed(k) * 130); return <div key={"sh" + k} style={{ position: "absolute", left: 636 + Math.cos(a) * d, top: 960 + Math.sin(a) * d * 0.5, width: 5 + seed(k * 2) * 9, height: 3 + seed(k * 5) * 5, zIndex: 27, background: VILL, opacity: crack * 0.85, transform: `rotate(${seed(k * 9) * 360}deg)` }} />; })}</> : null}
              </>
            ) : (
              <div style={{ position: "absolute", left: vx - 78 + vSkid + vScramble, top: vy, transform: `translate(0,-100%) rotate(${vPitch}deg)`, transformOrigin: "50% 100%", zIndex: 22 }}>
                <div style={{ position: "relative", width: 188, height: 188 }}>
                  {/* rain hugs him: it travels with him from f146 */}
                  <Villain lf={f} size={188} gaze={f >= 158 ? -1 : 1} nodAmp={f >= 223 && f < 230 ? 5 : (vLean > 0.5 ? 1.2 : 2.6)} nodSpeed={f >= 226 && f < 230 ? 3 : 10} rain={1} />
                  {/* §1: the S3 collar ink he never washed off. He DABS it at f204, and it changes nothing. */}
                  <div style={{ position: "absolute", left: 60, top: 80, width: 26 - dab * 3, height: 15, borderRadius: 3, background: FAKE, opacity: 0.62, filter: "blur(1.4px)", zIndex: 3 }} />
                  {dab > 0 ? <div style={{ position: "absolute", left: 46 + dab * 14, top: 74, width: 22, height: 18, borderRadius: 4, background: VILL, zIndex: 4, transform: `rotate(${dab * 16}deg)` }} /> : null}
                  {/* the leaning arm: propped on the safety board since f0 */}
                  {vLean > 0.02 ? <div style={{ position: "absolute", left: -26 * vLean, top: 62, width: 44, height: 20, borderRadius: 8, background: VILL, transform: `rotate(${18 * vLean}deg)`, zIndex: 3, opacity: vLean }} /> : null}
                  {/* THE ARM AROUND THE SHOULDER: same blocking at f158 and at f212 */}
                  {armAround > 0.02 ? <>
                    <div style={{ position: "absolute", left: 126, top: 58 - armAround * 4, width: 66 * armAround, height: 21, borderRadius: 8, background: VILL, transform: "rotate(-15deg)", zIndex: 3, boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }} />
                    <div style={{ position: "absolute", left: 126 + 50 * armAround, top: 44, width: 22, height: 22, borderRadius: 5, background: VILL, zIndex: 3, opacity: armAround }} />
                  </> : null}
                  {/* THE DEAD GUN: he cannot issue. He hand-peels off the spool and presents it on a dead tip. */}
                  <DeadGun x={-18 - (present1 + present2) * 16} y={74} s={0.78} rot={-8 - (present1 + present2) * 14} z={4} />
                  {/* the spool of die-cut counterfeits, in his jacket */}
                  <div style={{ position: "absolute", left: 96, top: 96, width: 20, height: 20, borderRadius: 10, background: `radial-gradient(circle, ${FAKE} 30%, #6E7A2E 32%, #6E7A2E 100%)`, opacity: 0.85, zIndex: 3, transform: `rotate(${(peel1 + peel2) * 120}deg)` }} />
                  {/* THE HAND-PEEL: small, dry, short */}
                  {(peel1 + peel2) > 0.02 ? <Fake x={-36 - (present1 + present2) * 12} y={56 - (peel1 + peel2) * 8} s={0.66} rot={-13 - (present1 + present2) * 8} o={Math.min(1, peel1 + peel2) * (1 - takeIt * 0.95)} z={5} /> : null}
                  {/* THE WINK: the hard white bar crosses the shades over EIGHT frames. His eyes are never visible. */}
                  {winkOn ? <div style={{ position: "absolute", left: 34 + glintX * 62, top: 52 + headTilt * 0.3, width: 17, height: 6, background: "rgba(255,255,255,0.95)", transform: `rotate(${-16 + headTilt * 0.4}deg)`, zIndex: 4, boxShadow: "0 0 12px rgba(255,255,255,0.95)", opacity: Math.sin(glintX * Math.PI) * 0.6 + 0.4 }} /> : null}
                  {/* the mouth: a flat line, once, at f239. It does not bend. */}
                  {vMouth ? <div style={{ position: "absolute", left: 68, top: 96, width: 22, height: 3.5, background: "#151312", zIndex: 4 }} /> : null}
                  {/* the earpiece wire whipping on the scramble */}
                  {f >= 223 && f < 240 ? <div style={{ position: "absolute", left: 128, top: 70, width: 4, height: 28, background: "#2A2E38", transformOrigin: "50% 0%", transform: `rotate(${Math.sin(f * 0.8) * 34}deg)`, zIndex: 3 }} /> : null}
                </div>
              </div>
            )}
            {/* 23 THE RETURN PORT sucking on his tie for nine frames */}
            {vTieSuck > 0 ? (
              <div style={{ position: "absolute", left: 622, top: 1006, width: 9, height: 20 + vTieSuck * 48, zIndex: 26, background: "linear-gradient(180deg,#0B0D11,#20242E)", transformOrigin: "50% 0%", transform: `rotate(${Math.sin(f * 0.7) * 7}deg) scaleY(${1 + Math.sin(f * 0.9) * 0.08})`, borderRadius: 2 }} />
            ) : null}
            {/* ============ FRESH EYES: the hero's exact warm clay. Zero grime in a filthy shop. ============ */}
            {f >= 184 ? (
              <div style={{ position: "absolute", left: feX - 84, top: 1002 - feWalk, transform: `translate(0,-100%) rotate(${partRot * 0.22}deg)`, transformOrigin: "50% 100%", zIndex: 25 }}>
                <div style={{ position: "relative", width: 168, height: 168 }}>
                  <Mascot lf={f} size={168} gaze={f >= 223 ? -1 : 0} nodAmp={2.4} nodSpeed={9} freshEyes={tear} />
                  {/* the shrink-wrap still on him: a product, not a person */}
                  <div style={{ position: "absolute", inset: 4, borderRadius: 10, background: "linear-gradient(112deg, rgba(228,242,255,0.34), rgba(228,242,255,0.05) 44%, rgba(228,242,255,0.28))", border: "1.5px solid rgba(220,238,255,0.34)", opacity: 1 - tear * 0.72, zIndex: 3, pointerEvents: "none" }} />
                  {/* the band of film across the eyes, until f190 */}
                  <div style={{ position: "absolute", left: 26, top: 50, width: 116, height: 26, borderRadius: 4, background: "linear-gradient(100deg, rgba(214,234,252,0.85), rgba(180,210,240,0.6))", opacity: (1 - tear) * (1 - punchFilm * 0.4), zIndex: 4, transform: `translateY(${-tear * 30}px) rotate(${tear * 12}deg)` }} />
                  {/* the boot bloom: hard white, over-bright for six frames */}
                  {boot > 0 ? <div style={{ position: "absolute", left: 30, top: 42, width: 108, height: 42, borderRadius: 20, background: "radial-gradient(ellipse, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)", filter: "blur(7px)", opacity: boot, zIndex: 5 }} /> : null}
                  {/* the desiccant sachet taped to his chest, with a crossed-out-mouth pictogram */}
                  <div style={{ position: "absolute", left: 62, top: 92, width: 30, height: 24, borderRadius: 3, background: "linear-gradient(180deg,#f0ece0,#c3bda9)", border: "1px solid rgba(60,56,44,0.5)", zIndex: 5, transform: "rotate(-5deg)" }}>
                    <svg viewBox="0 0 30 24" width={30} height={24}>
                      <ellipse cx="15" cy="13" rx="7" ry="4" fill="none" stroke="#3a4048" strokeWidth="1.4" />
                      <line x1="6" y1="20" x2="24" y2="6" stroke="#b8352a" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div style={{ position: "absolute", left: 56, top: 88, width: 12, height: 7, background: "rgba(230,240,250,0.5)", zIndex: 5, transform: "rotate(-16deg)" }} />
                  <div style={{ position: "absolute", left: 88, top: 90, width: 12, height: 7, background: "rgba(230,240,250,0.5)", zIndex: 5, transform: "rotate(14deg)" }} />
                  {/* THE ONE NUMBER, tethered to the copy: it carries its emptiness with it, straight past him */}
                  {memTravel > 0.02 ? (
                    <div style={{ position: "absolute", left: 38, top: -32, width: 120, height: 26, zIndex: 8, borderRadius: 4, background: "#0a0d12", border: "2px solid rgba(40,28,6,0.8)", boxShadow: "0 3px 10px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, opacity: memTravel, transform: `translateY(${(1 - memTravel) * 8}px)` }}>
                      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.4, color: AMBER, textShadow: "0 0 8px rgba(207,149,68,0.85)" }}>MEMORY</span>
                      <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, color: AMBER, textShadow: "0 0 12px rgba(207,149,68,1)" }}>0</span>
                    </div>
                  ) : null}
                  {/* the torn film sheet stays in his nub for the rest of the scene */}
                  {tear > 0.2 ? (
                    <div style={{ position: "absolute", left: -22, top: 74, width: 40, height: 62 + Math.sin(f * 0.2) * 4, zIndex: 6, background: "linear-gradient(120deg, rgba(224,240,255,0.42), rgba(190,220,245,0.16))", border: "1px solid rgba(220,238,255,0.4)", borderRadius: "3px 8px 10px 4px", transform: `rotate(${-10 + Math.sin(f * 0.16) * 5}deg)`, transformOrigin: "50% 0%" }}>
                      {/* f254: he clips the fake to the order beside the part, like lint */}
                      {clipped ? <Fake x={4} y={30} s={0.42} rot={-11 + Math.sin(f * 0.3) * 3} z={7} /> : null}
                      {/* the work order riding the film */}
                      <div style={{ position: "absolute", left: 5, top: 4, width: 30, height: 24, background: "rgba(240,228,170,0.8)", borderRadius: 1.5 }}>
                        {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 3, top: 5 + k * 6, width: 24 - k * 5, height: 1.6, background: "rgba(60,50,20,0.5)" }} />)}
                      </div>
                    </div>
                  ) : null}
                  {/* THE BRACKET in his nub: three stepped holes at increasing spacing, the third a blind stop */}
                  {liftPart > 0 ? (
                    <div style={{ position: "absolute", left: 150, top: 70 - liftPart * 18 - (f >= 242 ? ramp(f, 242, 250) * 40 : 0), width: 90, height: 34, zIndex: 6, transform: `rotate(${-6 - partRot}deg)`, transformOrigin: "0% 50%" }}>
                      <svg viewBox="0 0 90 34" width={90} height={34} style={{ overflow: "visible" }}>
                        <path d="M 2 10 L 88 4 L 88 26 L 2 32 Z" fill="#69737e" stroke="#8894a2" strokeWidth="1.2" />
                        {/* three tries at widening gaps, then it stops. `3 retries, then fail loud`, in steel. */}
                        <circle cx="18" cy="19" r="4" fill="#0d1116" />
                        <circle cx="38" cy="17" r="4.6" fill="#0d1116" />
                        <circle cx="66" cy="14.5" r="5.2" fill="#2b323a" stroke="#0d1116" strokeWidth="1" />
                        {/* the yellow-green scrape from where he has already been near it */}
                        <path d="M 6 29 L 30 26" stroke={FAKE} strokeWidth="2" opacity="0.6" />
                      </svg>
                      {/* the hot-blue heat tint fading over 60 frames, shimmering to f255 */}
                      <div style={{ position: "absolute", left: 0, top: 0, width: 90, height: 34, borderRadius: 4, background: `linear-gradient(100deg, rgba(120,190,255,${0.62 * heat}), rgba(160,120,255,${0.2 * heat}))`, filter: `blur(${1 + shimmer * 0.3}px)`, mixBlendMode: "screen" }} />
                      <div style={{ position: "absolute", left: -6 + shimmer, top: -10, width: 100, height: 18, background: "radial-gradient(ellipse, rgba(200,225,255,0.26), transparent 70%)", filter: "blur(4px)", opacity: 0.4 + heat * 0.5 }} />
                    </div>
                  ) : null}
                  {/* f251: the original slaps the counterfeit onto his BACK. f252: it peels straight off onto the film. */}
                  {onBack && peelOff < 1 ? <Fake x={40} y={100 + flutter * 30} s={0.6} rot={-14 - flutter * 30} o={1 - peelOff * 0.2} z={7} /> : null}
                </div>
              </div>
            ) : null}
            {/* the bracket waiting on the cradle f176..f198, already wearing the crooked sticker */}
            {partOnCradle && liftPart < 0.9 ? (
              <div style={{ position: "absolute", left: 516, top: 812 - liftPart * 40, width: 90, height: 34, zIndex: 18, transform: `rotate(-3deg)` }}>
                <svg viewBox="0 0 90 34" width={90} height={34}>
                  <path d="M 2 10 L 88 4 L 88 26 L 2 32 Z" fill="#69737e" stroke="#8894a2" strokeWidth="1.2" />
                  <circle cx="18" cy="19" r="4" fill="#0d1116" /><circle cx="38" cy="17" r="4.6" fill="#0d1116" />
                  <circle cx="66" cy="14.5" r="5.2" fill="#2b323a" stroke="#0d1116" strokeWidth="1" />
                </svg>
                <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: `linear-gradient(100deg, rgba(120,190,255,${0.62 * heat}), rgba(160,120,255,${0.2 * heat}))`, filter: "blur(1.4px)", mixBlendMode: "screen" }} />
                {stuckOn ? <Fake x={30} y={-8} s={0.5} rot={-17} z={19} /> : null}
              </div>
            ) : null}

            {/* ============ 23 THE RETURN PORT (620,1060): the only thing in the scene that INHALES ============ */}
            <div style={{ position: "absolute", left: 566, top: 1024, width: 108, height: 74, zIndex: 24 }}>
              <div style={{ position: "absolute", left: 0, top: 10, width: 108, height: 64, borderRadius: "54px 54px 10px 10px", background: "radial-gradient(ellipse at 50% 22%, #050708 26%, #d8b455 30%, #6d5116 100%)", boxShadow: "0 10px 22px rgba(0,0,0,0.8), inset 0 3px 0 rgba(255,240,190,0.4)" }} />
              <div style={{ position: "absolute", left: 24, top: 18, width: 60, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, #000 40%, #1a1409 100%)", boxShadow: "inset 0 4px 14px rgba(0,0,0,1)" }} />
              {/* the leather flap, breathing on the constant faint suck */}
              <div style={{ position: "absolute", left: 30, top: 14, width: 48, height: 22, borderRadius: "3px 3px 12px 12px", background: "linear-gradient(180deg,#5c4630,#2e2318)", transformOrigin: "50% 0%", transform: `rotate(${-8 - Math.sin(f * 0.14) * 5 - bundle * 40 - (f >= 216 && f < 220 ? 22 : 0)}deg)` }} />
              {/* its own small blank dial: reads a rising charge from f246 */}
              <div style={{ position: "absolute", left: 84, top: 40, width: 30, height: 30, borderRadius: 15, background: "radial-gradient(circle at 36% 32%, #efe7d0, #b7ab8d)", border: "2px solid #8a6314" }}>
                <div style={{ position: "absolute", left: 14, top: 4, width: 1.8, height: 12, background: "#231d10", transformOrigin: "50% 100%", transform: `rotate(${-100 + needleLate * 5.5}deg)` }} />
              </div>
            </div>
            {/* f205: the port EATS a foreign carrier. THUNK-SHUNK. We have watched this hole swallow something. */}
            {foreign3 >= 0.55 && foreign3 < 1 ? (
              <div style={{ position: "absolute", left: LP(900, 620, (foreign3 - 0.55) / 0.45), top: LP(1060, 1052, (foreign3 - 0.55) / 0.45), width: 16, height: 24, zIndex: 25, borderRadius: 6, background: "linear-gradient(180deg,#d8b455,#7e5a10)", transform: `rotate(${(foreign3 - 0.55) * 900}deg) scale(${1 - Math.max(0, (foreign3 - 0.9) / 0.1)})`, opacity: 1 - Math.max(0, (foreign3 - 0.92) / 0.08) }} />
            ) : null}
            {/* f255: the bundle, MID-SHOVE. Nothing launches inside S5. */}
            {bundle > 0 ? <div style={{ position: "absolute", left: 596, top: 1030 - bundle * 6, width: 44, height: 30, zIndex: 26, borderRadius: 4, background: "rgba(240,228,170,0.85)", transform: `rotate(-9deg) scale(${1 - bundle * 0.15})`, boxShadow: "0 4px 10px rgba(0,0,0,0.7)" }} /> : null}
            {/* ============ 11 THE TWO KEY BEAMS + DUST. Solid from f180. No handheld torch in this scene. ============ */}
            <svg viewBox="0 0 1012 1102" width={1012} height={1102} style={{ position: "absolute", left: 0, top: 0, zIndex: 28, pointerEvents: "none", mixBlendMode: "screen" }}>
              <defs>
                <linearGradient id="s5kb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,226,178,0.34)" />
                  <stop offset="70%" stopColor="rgba(255,206,140,0.16)" />
                  <stop offset="100%" stopColor="rgba(255,196,120,0.02)" />
                </linearGradient>
              </defs>
              {/* the (620,1010) beam: the scene's inspection instrument at f242 */}
              <polygon points="1086,-110 1114,-110 716,1010 528,1010" fill="url(#s5kb)" opacity={0.55 + fog * 0.75} />
              {/* the (300,930) beam: the wrench falls through its shaft */}
              <polygon points="1136,-160 1160,-160 382,930 224,930" fill="url(#s5kb)" opacity={0.4 + fog * 0.5} />
              {/* landing pools */}
              <ellipse cx="620" cy="1010" rx="96" ry="20" fill="rgba(255,226,178,0.2)" opacity={0.5 + fog * 0.5} />
              <ellipse cx="300" cy="930" rx="82" ry="17" fill="rgba(255,226,178,0.15)" />
            </svg>
            {/* f242..f252: the act of turning the part RAKES the fog-solid beam left to right across all five */}
            {f >= 242 && f < 256 ? (
              <div style={{ position: "absolute", left: sweepX - 90, top: 760, width: 180, height: 342, zIndex: 29, background: "linear-gradient(90deg, rgba(255,232,190,0) 0%, rgba(255,232,190,0.5) 50%, rgba(255,232,190,0) 100%)", filter: "blur(9px)", mixBlendMode: "screen", pointerEvents: "none", transform: "skewX(-7deg)" }} />
            ) : null}
            {/* dust motes drifting UPWARD through both shafts */}
            {Array.from({ length: 36 }, (_, i) => {
              const r = seed(i * 3.1 + 5), r2 = seed(i * 5.7 + 1), r3 = seed(i * 2.3 + 9);
              const bx = i % 2 ? 620 : 300, by = i % 2 ? 1010 : 930;
              const t = ((f * (0.5 + r2 * 1.1) + r * 600) % 600) / 600;
              const y = by - t * 900;
              const spread = (1 - t) * 100 + 16;
              const x = bx + (r3 - 0.5) * spread * 2 + Math.sin(f * 0.03 + i) * 7 + t * 260;
              return <div key={"mt" + i} style={{ position: "absolute", left: x, top: y, width: 1.6 + r3 * 3, height: 1.6 + r3 * 3, borderRadius: 4, background: "rgba(255,232,190,0.95)", opacity: (0.24 + r * 0.5) * (1 - t * 0.7), zIndex: 29, filter: "blur(0.4px)" }} />;
            })}

            {/* ============ L4 THE POD FOG: floods from f180, pours into the drain and the port forever ============ */}
            {fog > 0 ? (
              <>
                {Array.from({ length: 30 }, (_, i) => {
                  const r = seed(i * 4.3 + 2), r2 = seed(i * 7.1 + 6);
                  const born = 180 + r * 22;
                  const age = Math.max(0, f - born);
                  // it pours TOWARD the drain (500,1070) and the port (620,1060), because the port inhales
                  const tgt = i % 2 ? 500 : 620;
                  const sx = 790 + (r2 - 0.5) * 240;
                  const t = Math.min(1, age / (70 + r * 60));
                  const x = LP(sx, tgt + (r - 0.5) * 60, Math.pow(t, 0.8));
                  const y = LP(1010, 1062, Math.pow(t, 0.6)) + Math.sin(f * 0.05 + i) * 6;
                  const sz = LP(70, 26, t) + r2 * 50;
                  return <div key={"fg" + i} style={{ position: "absolute", left: x - sz / 2, top: y - sz / 2, width: sz, height: sz * 0.62, borderRadius: sz, zIndex: 30, background: "radial-gradient(ellipse, rgba(240,248,255,0.4), rgba(240,248,255,0) 70%)", filter: "blur(9px)", opacity: fog * (1 - t * 0.55) * 0.9 }} />;
                })}
                {/* the ankle-height sheet rolling over the bottom of the lens */}
                <div style={{ position: "absolute", left: 0, top: 1000, width: 1012, height: 102, zIndex: 30, background: "linear-gradient(180deg, rgba(238,246,255,0) 0%, rgba(238,246,255,0.34) 60%, rgba(238,246,255,0.5) 100%)", filter: "blur(7px)", opacity: fog * (0.7 + 0.3 * Math.sin(f * 0.06)) }} />
              </>
            ) : null}
            {/* L3 SPARKS: arc out through the strips and bounce off the floor at setY810 */}
            {Array.from({ length: 34 }, (_, i) => {
              const cyc = Math.floor((f + i * 3) / 20);
              const born = cyc * 20 - i * 3;
              const age = f - born;
              if (age < 0 || age > 26) return null;
              const r = seed(i * 5.1 + cyc * 2.7), r2 = seed(i * 3.3 + cyc);
              const t = age / 26;
              const vxs = (r - 0.5) * 15 * sparkSurge;
              let x = 460 + r2 * 180 + vxs * age;
              let y = 700 + r * 60 + age * age * 0.5 - age * 5;
              if (y > 810) y = 810 - (y - 810) * 0.32;   // the bounce
              return <div key={"sp" + i} style={{ position: "absolute", left: x, top: y, width: 2.6, height: 2.6 + Math.abs(vxs) * 0.3, borderRadius: 2, zIndex: 31, background: "#ffe9b0", boxShadow: `0 0 ${7 * sparkSurge}px rgba(255,190,90,0.95)`, opacity: (1 - t) * 0.95 }} />;
            })}
            {/* the sour spill from his rain, mixing with the spark glow on the floor plane at setY810 */}
            <div style={{ position: "absolute", left: 0, top: 800, width: 420, height: 302, zIndex: 32, background: "radial-gradient(ellipse at 22% 78%, rgba(168,184,74,0.34), rgba(168,184,74,0) 70%)", opacity: 0.85, filter: "blur(14px)", pointerEvents: "none", mixBlendMode: "screen" }} />
          </div>
          {/* ============ 1 THE SHIFT OFFICE. Same rig, drawn above the set, so its nose survives the crane. ============ */}
          <div style={RIG}>
            <div style={{ position: "absolute", left: 40, top: 60, width: 500, height: 340, zIndex: 34 }}>
              {/* the underside: nose x40..360 carries to setY400, the rest is the bay's ceiling at setY330 */}
              <div style={{ position: "absolute", left: 320, top: 270, width: 180, height: 14, background: "linear-gradient(180deg,#39424c,#1c222a)", boxShadow: "0 10px 24px rgba(0,0,0,0.7)" }} />
              <div style={{ position: "absolute", left: 0, top: 326, width: 330, height: 16, background: "linear-gradient(180deg,#39424c,#1c222a)", boxShadow: "0 12px 26px rgba(0,0,0,0.75)" }} />
              {/* the box shell */}
              <div style={{ position: "absolute", left: 0, top: 0, width: 500, height: 330, borderRadius: 4, background: "linear-gradient(180deg, rgba(26,32,40,0.97), rgba(14,18,24,0.99))", boxShadow: "0 26px 54px rgba(0,0,0,0.8), inset 0 3px 0 rgba(255,255,255,0.09)" }} />
              {/* the warm sodium interior */}
              <div style={{ position: "absolute", left: 6, top: 6, width: 488, height: 318, background: "radial-gradient(ellipse at 42% 58%, rgba(255,196,110,0.26), rgba(255,160,60,0.03) 68%)" }} />
              {/* wired safety mesh survives ONLY on the narrow edge panels and the door */}
              {[{ l: 0, w: 38 }, { l: 462, w: 38 }].map((ep, i) => (
                <div key={"ep" + i} style={{ position: "absolute", left: ep.l, top: 0, width: ep.w, height: 330, background: "repeating-linear-gradient(45deg, rgba(150,170,190,0.24) 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, rgba(150,170,190,0.24) 0 1px, transparent 1px 9px)", borderRight: i === 0 ? "2px solid rgba(120,140,164,0.4)" : "none", borderLeft: i === 1 ? "2px solid rgba(120,140,164,0.4)" : "none" }} />
              ))}
              {/* ONE big clean unmeshed pane */}
              <div style={{ position: "absolute", left: 38, top: 6, width: 424, height: 318, background: "linear-gradient(112deg, rgba(190,225,255,0.11), rgba(190,225,255,0.02) 44%, rgba(190,225,255,0.09))", border: "2px solid rgba(120,140,164,0.34)" }} />
              {/* the watching pane's lower band, setY300..400 (local 240..340) */}
              <div style={{ position: "absolute", left: 38, top: 240, width: 322, height: 100, background: "linear-gradient(112deg, rgba(190,225,255,0.09), rgba(190,225,255,0.02))", border: "2px solid rgba(120,140,164,0.3)" }} />
              {/* 21 THE GLASS SMEAR at (300,350): a greasy arc of nub-smears exactly where he keeps reaching down */}
              <div style={{ position: "absolute", left: 218, top: 268, width: 84, height: 52, zIndex: 6, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(230,220,190,0.16), rgba(230,220,190,0) 70%)", filter: "blur(1.4px)", transform: "rotate(-24deg)" }} />
              {[0, 1, 2, 3].map((k) => <div key={"sm" + k} style={{ position: "absolute", left: 224 + k * 15, top: 276 + k * 8, width: 22, height: 9, zIndex: 6, borderRadius: 6, background: "rgba(226,214,186,0.13)", filter: "blur(1.2px)", transform: `rotate(${-26 + k * 4}deg)` }} />)}

              {/* ---- inside the box ---- */}
              {/* 5 THE DRAFTING TABLE. A slab on legs, so the hero standing behind it reads from the chest up. */}
              <div style={{ position: "absolute", left: 60, top: 168, width: 290, height: 14, zIndex: 6, borderRadius: 2, background: "linear-gradient(180deg,#8a7350,#4a3d28)", boxShadow: "0 8px 18px rgba(0,0,0,0.7)" }} />
              {[74, 330].map((lx, k) => <div key={"lg" + k} style={{ position: "absolute", left: lx, top: 182, width: 9, height: 74, zIndex: 6, background: "linear-gradient(90deg,#6b5940,#2e2618)" }} />)}
              {/* the brass CARBON SPIKE, near-left of the pad: two pink copies at f0, THREE from f106 */}
              <div style={{ position: "absolute", left: 58, top: 128, width: 4, height: 42, borderRadius: 2, background: "linear-gradient(180deg,#e0bd63,#6d5116)", zIndex: 8 }} />
              <div style={{ position: "absolute", left: 48, top: 166, width: 26, height: 7, borderRadius: 3, background: "linear-gradient(180deg,#d8b455,#5d4512)", zIndex: 8 }} />
              {Array.from({ length: spikeCount }, (_, k) => (
                <div key={"pk" + k} style={{ position: "absolute", left: 42 - k * 2, top: 152 - k * 5, width: 44, height: 8, zIndex: 7 + k, borderRadius: 1, background: "linear-gradient(180deg,#e8b8c0,#c08a94)", transform: `rotate(${-4 + k * 3}deg)`, boxShadow: "0 1px 3px rgba(0,0,0,0.5)", opacity: k === 2 ? rip : 1 }} />
              ))}
              {/* the triplicate pad, lying on the slab. Centre local (222,148) = set (262,208) = the insert's target. */}
              <div style={{ position: "absolute", left: 110, top: 126 + paperJit, width: 224, height: 44, zIndex: 9, borderRadius: 2, background: "linear-gradient(180deg,#f2e6a8,#d9c982)", boxShadow: "0 5px 12px rgba(0,0,0,0.6)", transform: `rotate(${-1.4 + paperJit * 0.4}deg)`, overflow: "hidden" }}>
                {/* the clip */}
                <div style={{ position: "absolute", left: 84, top: -4, width: 54, height: 8, borderRadius: 2, background: "linear-gradient(180deg,#aab3bc,#5c656f)", zIndex: 4 }} />
                {/* the torn corner, pink carbon showing under the yellow top copy */}
                <div style={{ position: "absolute", right: 0, bottom: 0, width: 26, height: 18, background: "linear-gradient(300deg,#e8b8c0,#c08a94)", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
                {/* credible sub-legible mono ruling */}
                {[0, 1, 2].map((k) => <div key={"rl" + k} style={{ position: "absolute", left: 7, top: 5 + k * 4, width: 120 - k * 20, height: 1.2, background: "rgba(90,74,26,0.32)" }} />)}
                {[0, 1].map((k) => <div key={"rr" + k} style={{ position: "absolute", left: 7, top: 37 + k * 4, width: 86 - k * 26, height: 1.2, background: "rgba(90,74,26,0.28)" }} />)}
                {/* THE ONE LINE. Legible f80..f110 at 40px cap height in the 3x insert. */}
                <div style={{ position: "absolute", left: 7, top: 15, fontFamily: mono, fontSize: 6, letterSpacing: 0.5, color: "rgba(70,56,18,0.72)", opacity: lineText }}>DONE WHEN:</div>
                <div style={{ position: "absolute", left: 7, top: 22, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, lineHeight: "14px", letterSpacing: "-0.02em", color: "#2c2410", opacity: lineText, whiteSpace: "nowrap" }}>3 retries, then fail loud</div>
                {/* the pen's live scritch */}
                {scritch ? <div style={{ position: "absolute", left: 7, top: 34, width: Math.max(0, Math.min(150, (f - 78) * 4.2)), height: 1.6, background: "rgba(44,36,16,0.5)" }} /> : null}
              </div>
              {/* the pad edge lifting under the nib */}
              <div style={{ position: "absolute", left: 110, top: 166, width: 224, height: 6, zIndex: 9, background: "linear-gradient(180deg,#c9b96e,#8a7a3e)", transform: `rotate(-1.4deg) translateY(${scritch ? Math.sin(f * 1.9) * 0.8 : 0}px)` }} />
              {/* THE RIP: the pink copy tears free and goes on the spike, in shot */}
              {rip > 0 && rip < 1 ? <div style={{ position: "absolute", left: 110 - rip * 26, top: 126 - rip * 6, width: 224, height: 44, zIndex: 10, borderRadius: 2, background: "linear-gradient(180deg,#e8b8c0,#c08a94)", transform: `rotate(${-1.4 - rip * 13}deg)`, opacity: 1 - rip * 0.25 }} /> : null}
              {/* THE ROLL: the yellow copy becomes a carrier, cap screwed tick-tick-tick, then shoved through the flap */}
              {roll > 0.05 && shove < 1 ? (
                <div style={{ position: "absolute", left: LP(222, 470, shove), top: LP(136, 188, shove), width: LP(56, 16, roll), height: LP(40, 26, roll), zIndex: 11, borderRadius: LP(4, 8, roll), background: roll > 0.6 ? "linear-gradient(180deg,#f0d894,#8a6314)" : "linear-gradient(180deg,#f2e6a8,#d9c982)", transform: `rotate(${roll * 90 + shove * 40}deg)`, boxShadow: roll > 0.6 ? "0 0 12px rgba(240,216,148,0.7)" : "0 3px 8px rgba(0,0,0,0.5)" }} />
              ) : null}
              {/* 6 THE SEND-PORT (520,245) + THE UPPER GAUGE (520,200). Local: (480,185) / (480,140). */}
              <div style={{ position: "absolute", left: 452, top: 130, width: 56, height: 56, zIndex: 9, borderRadius: 28, background: "radial-gradient(circle at 36% 32%, #efe7d0, #b7ab8d)", border: "3px solid #8a6314", boxShadow: "0 5px 12px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.5)" }}>
                {/* a blank face and a needle. no psi ticks, no digits. */}
                <div style={{ position: "absolute", left: 26, top: 8, width: 2.5, height: 22, background: "#231d10", transformOrigin: "50% 100%", transform: `rotate(${-118 + needle * 2.3}deg)` }} />
                <div style={{ position: "absolute", left: 24, top: 24, width: 8, height: 8, borderRadius: 4, background: "#8a6314" }} />
              </div>
              <div style={{ position: "absolute", left: 452, top: 172, width: 62, height: 44, zIndex: 9 }}>
                {/* the brass trumpet mouth */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 62, height: 44, borderRadius: "6px 30px 30px 6px", background: "linear-gradient(120deg,#d8b455,#5d4512)", boxShadow: "0 5px 12px rgba(0,0,0,0.65), inset 0 3px 0 rgba(255,240,190,0.45)" }} />
                <div style={{ position: "absolute", left: 30, top: 8, width: 26, height: 28, borderRadius: "50%", background: "radial-gradient(ellipse, #05070a 40%, #1a1409 100%)" }} />
                {/* the heavy leather flap, breathing at f0, eating the carrier at f110 */}
                <div style={{ position: "absolute", left: 26, top: 5, width: 22, height: 34, borderRadius: "3px 10px 10px 3px", background: "linear-gradient(120deg,#5c4630,#2e2318)", transformOrigin: "0% 50%", transform: `rotate(${Math.sin(f * 0.11) * 4 + shove * 46}deg)` }} />
              </div>

              {/* 3 THE TOOL CHUTE (490,315) local (450,255): red-lipped, angled to spit LEFT */}
              <div style={{ position: "absolute", left: 414, top: 248, width: 84, height: 26, zIndex: 8 }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 84, height: 22, borderRadius: "3px 3px 14px 14px", background: "linear-gradient(180deg,#0a0d12,#020305)", boxShadow: "inset 0 5px 12px rgba(0,0,0,1)" }} />
                <div style={{ position: "absolute", left: -3, top: -4, width: 90, height: 7, borderRadius: 3, background: "linear-gradient(180deg,#c0392b,#6f1b13)", boxShadow: `0 0 ${9 + Math.sin(f * 0.3) * 3}px rgba(196,74,58,0.6)` }} />
                {/* the stencil: a wrench inside a red circle-slash. No words. Buzzes at f68, dies at f76. */}
                <div style={{ position: "absolute", left: -46, top: 2, width: 40, height: 40, opacity: f < 68 ? 0.5 : (f < 76 ? 0.5 * Math.abs(Math.sin(f * 2.2)) : 0.07) }}>
                  <svg viewBox="0 0 40 40" width={40} height={40}>
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#c0392b" strokeWidth="3" />
                    <line x1="9" y1="9" x2="31" y2="31" stroke="#c0392b" strokeWidth="3" />
                    <g transform="translate(10,14) rotate(20)">
                      <rect x="4" y="4" width="17" height="3" rx="1.5" fill="#c0392b" />
                      <circle cx="4" cy="5.5" r="3.6" fill="none" stroke="#c0392b" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* 2 THE SLAP ARM "FANUX MK-II" on its ceiling rail. ONE arm. The pen is in its holster from frame 0. */}
              <div style={{ position: "absolute", left: 44, top: 14, width: 450, height: 10, zIndex: 11, borderRadius: 3, background: "linear-gradient(180deg,#5c6672,#252c34)", boxShadow: "0 4px 10px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: armX - 40 - 48, top: 20 + dockBounce, width: 96, height: 150, zIndex: 12, transformOrigin: "50% 0%", transform: `rotate(${armRot * 0.22}deg)` }}>
                {/* carriage */}
                <div style={{ position: "absolute", left: 24, top: -14, width: 48, height: 20, borderRadius: 3, background: "linear-gradient(180deg,#f0b92b,#a87d10)", boxShadow: "0 3px 8px rgba(0,0,0,0.6)" }} />
                {/* shoulder housing, with the pen holster CAST INTO IT */}
                <div style={{ position: "absolute", left: 20, top: 4, width: 56, height: 44, borderRadius: 5, background: "linear-gradient(150deg,#f0b92b,#8a6314)", boxShadow: "0 4px 10px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,230,120,0.5)" }}>
                  {/* the only maker's mark left in the frame */}
                  <div style={{ position: "absolute", left: 4, top: 26, width: 48, textAlign: "center", fontFamily: mono, fontSize: 5.4, letterSpacing: 0.5, color: "rgba(50,34,4,0.75)" }}>FANUX MK-II</div>
                  {/* the holster + the pen, planted before it is spent */}
                  <div style={{ position: "absolute", left: -9, top: 6, width: 10, height: 26, borderRadius: 2, background: "linear-gradient(180deg,#5c4630,#2e2318)" }} />
                  {penInHolster ? <div style={{ position: "absolute", left: -7, top: 0, width: 6, height: 24, borderRadius: 2, background: "linear-gradient(180deg,#2c3a52,#101828)" }} /> : null}
                </div>
                {/* upper + lower limb */}
                <div style={{ position: "absolute", left: 38, top: 42, width: 20, height: 50, background: "linear-gradient(90deg,#f0b92b,#9c7212)", transformOrigin: "50% 0%", transform: `rotate(${armRot * 0.5}deg)`, boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }}>
                  <div style={{ position: "absolute", left: -3, top: 44, width: 26, height: 26, borderRadius: 13, background: "linear-gradient(150deg,#f0b92b,#7d5a0c)" }} />
                  <div style={{ position: "absolute", left: 2, top: 62, width: 16, height: 34, background: "linear-gradient(90deg,#e0aa22,#8a6314)", transformOrigin: "50% 0%", transform: `rotate(${armRot * 0.8}deg)` }}>
                    {/* the grimy foam paddle, with a worn pale spot exactly the size and shape of a Claude nub */}
                    <div style={{ position: "absolute", left: -14, top: 28, width: 44, height: 22, borderRadius: 4, background: "linear-gradient(180deg,#6b6152,#3a342a)", boxShadow: "0 3px 7px rgba(0,0,0,0.6)", transform: `rotate(${f >= 40 && f < 50 ? (f - 40) * 9 : 0}deg)` }}>
                      <div style={{ position: "absolute", left: 12, top: 5, width: 20, height: 13, borderRadius: 3, background: "rgba(216,206,180,0.42)", filter: "blur(0.8px)" }} />
                    </div>
                    {/* the wrench, clamped and posted down the chute f56..f60 */}
                    {f >= 56 && f < 61 ? <div style={{ position: "absolute", left: -16, top: 30, width: 50, height: 8, borderRadius: 3, background: "linear-gradient(180deg,#cfd6dd,#6d757e)", transform: "rotate(24deg)" }} /> : null}
                  </div>
                </div>
              </div>

              {/* THE HERO: MANAGER CLAUDE. Eyes always visible, front-keyed by the sill lamp through one clean pane. */}
              {inOffice > 0.02 ? (
                <div style={{ position: "absolute", left: 270, top: 200, transform: `translate(0,-100%)`, zIndex: 5, opacity: inOffice }}>
                  <div style={{ position: "relative", width: 150, height: 150 }}>
                    <Mascot lf={f} size={150} gaze={f < 56 ? 1 : 0} nodAmp={2.6} nodSpeed={9} shock={heroShock} hardHat={f < 50 ? 1 : 0} />
                    {/* the hard hat one size too big, brim tipped up. Flies off at f50, lands back crooked at f70. */}
                    {f >= 50 ? <div style={{ position: "absolute", left: 33 + hatFly * 0.5, top: 4 + hatFly, width: 86, height: 33, borderRadius: "33px 33px 7px 7px", background: "linear-gradient(180deg,#f0b92b,#c58f18)", border: "2px solid rgba(0,0,0,0.3)", transform: `rotate(${hatRot}deg)`, zIndex: 5 }} /> : null}
                    {/* §5 RULING: S3's crooked forehead DONE is SCRUBBED OFF here, at the desk, before the pen fires. */}
                    <div style={{ position: "absolute", left: 46, top: 33, width: 60, height: 16, zIndex: 6, opacity: mark * 0.8, transform: "rotate(-7deg)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, color: FAKE, textAlign: "center", letterSpacing: 1, filter: "blur(0.3px)" }}>DONE</div>
                    {wipe > 0 ? <div style={{ position: "absolute", left: 24 + wipe * 68, top: 26, width: 28, height: 22, borderRadius: 4, background: "#D97757", zIndex: 7, transform: `rotate(${wipe * 20}deg)` }} /> : null}
                    {/* the crooked clip-on tie + the L-plate. He is a manager and STILL a learner. */}
                    <div style={{ position: "absolute", left: 68, top: 75, width: 10, height: 33, background: "#8a2f22", zIndex: 5, transform: "rotate(7deg)", clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)" }} />
                    <div style={{ position: "absolute", left: 86, top: 79, width: 23, height: 23, borderRadius: 3, background: PAPER, border: `2px solid ${RED}`, color: RED, fontFamily: fraunces.fontFamily, fontSize: 15, fontWeight: 700, lineHeight: "20px", textAlign: "center", zIndex: 5 }}>L</div>
                    {/* the clipboard jammed under one nub */}
                    <div style={{ position: "absolute", left: 8, top: 84, width: 22, height: 29, borderRadius: 2, background: "linear-gradient(180deg,#d9cbb2,#9c8d72)", border: "1px solid rgba(0,0,0,0.4)", zIndex: 5, transform: "rotate(-11deg)" }} />
                  </div>
                </div>
              ) : null}
              {/* THE REACHING NUB, in office space at z10 so the pad cannot bury it. Slapped back on every THWAP. */}
              {inOffice > 0.02 ? (
                <div style={{ position: "absolute", left: 270 - heroReach + recoil, top: 140, width: 28, height: 22, zIndex: 10, opacity: inOffice }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "#D97757", transform: `rotate(${recoil * 1.4}deg)`, boxShadow: "0 3px 7px rgba(0,0,0,0.5)" }} />
                  {/* f63: FANUX presses the pen into it and closes the nub around it. That is the promotion. */}
                  {penInNub > 0 ? <div style={{ position: "absolute", left: 6, top: -26, width: 6, height: 30, borderRadius: 2, background: "linear-gradient(180deg,#2c3a52,#101828)", opacity: penInNub, transform: `rotate(${20 - penInNub * 8}deg)`, transformOrigin: "50% 100%" }} /> : null}
                </div>
              ) : null}
              {/* the wrench on the table that he will not stop reaching for. Clamped away at f57. */}
              {!wrenchGone ? (
                <div style={{ position: "absolute", left: 236 + slapHit(38) * 22, top: 158, width: 50, height: 8, zIndex: 10, transformOrigin: "50% 50%", transform: `rotate(${slapHit(11) * 90 + slapHit(38) * 120 + (f >= 40 ? 40 : 0)}deg)` }}>
                  <div style={{ position: "absolute", left: 8, top: 2, width: 36, height: 5, borderRadius: 2.5, background: "linear-gradient(180deg,#cfd6dd,#6d757e)" }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 12, height: 8, borderRadius: 3, border: "2.5px solid #cfd6dd", borderRight: "none" }} />
                </div>
              ) : null}
              {/* the sill lamp at (250,205) local (210,145): warm sodium, angled BACK into the box, front-keying his face */}
              <div style={{ position: "absolute", left: 196, top: 118, width: 8, height: 34, zIndex: 12, background: "linear-gradient(180deg,#5c6672,#252c34)" }} />
              <div style={{ position: "absolute", left: 182, top: 108, width: 36, height: 16, zIndex: 12, borderRadius: "10px 10px 3px 3px", background: "linear-gradient(180deg,#c9902e,#6d4c10)", transform: "rotate(-22deg)", boxShadow: "0 0 22px rgba(255,190,100,0.6)" }} />
              <div style={{ position: "absolute", left: 96, top: 112, width: 190, height: 130, zIndex: 3, background: "linear-gradient(160deg, rgba(255,206,130,0.30), rgba(255,180,80,0) 66%)", filter: "blur(5px)", clipPath: "polygon(84px 0, 108px 0, 190px 130px, 0 130px)" }} />
              {/* THE HERO POST-CRANE: at the lower pane, nub in the smear, breath fog blooming, still moving at f255 */}
              {f >= 150 ? (
                <div style={{ position: "absolute", left: 190, top: 338, transform: "translate(0,-100%)", zIndex: 8, opacity: ramp(f, 150, 162) * (1 - conLit * 0.5) }}>
                  <div style={{ position: "relative", width: 88, height: 88 }}>
                    <Mascot lf={f} size={88} gaze={1} nodAmp={1.2} nodSpeed={13} hardHat={1} />
                    <div style={{ position: "absolute", left: 30, top: 47, width: 14, height: 14, borderRadius: 2, background: PAPER, border: `1.5px solid ${RED}`, color: RED, fontFamily: fraunces.fontFamily, fontSize: 9, fontWeight: 700, lineHeight: "12px", textAlign: "center", zIndex: 5 }}>L</div>
                    {/* the nub in the smear, squeaking down it. This is week two. */}
                    <div style={{ position: "absolute", left: 70, top: 40 + smearNub * 0.7, width: 18, height: 15, borderRadius: 3, background: "#D97757", zIndex: 5 }} />
                    {/* breath fog on the pane, blooming and shrinking */}
                    <div style={{ position: "absolute", left: 56, top: 34, width: 34 + breath * 16, height: 27 + breath * 12, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(230,242,255,0.26), rgba(230,242,255,0) 70%)", filter: "blur(3px)", zIndex: 4, opacity: breath }} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {/* ============ FOREGROUND, PRE-CRANE: the gantry's own brass handrail (we are standing on it) ============ */}
          {camY < 300 ? (
            <div style={{ position: "absolute", left: -40, top: 690 - camY * 0.5, width: 1100, height: 130, zIndex: 44, opacity: 1 - ramp(f, 112, 140), pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 1100, height: 22, borderRadius: 11, background: "linear-gradient(180deg,#e0bd63,#5d4512)", boxShadow: "0 12px 30px rgba(0,0,0,0.7)", filter: "blur(2.4px)" }} />
              <div style={{ position: "absolute", left: 0, top: 78, width: 1100, height: 13, borderRadius: 7, background: "linear-gradient(180deg,#c9a253,#4a3810)", filter: "blur(3.4px)" }} />
              {[90, 420, 760].map((px, i) => <div key={"pl" + i} style={{ position: "absolute", left: px, top: 10, width: 15, height: 120, background: "linear-gradient(90deg,#c9a253,#3d2e0c)", filter: "blur(3px)" }} />)}
            </div>
          ) : null}

          {/* ============ 7c THE NEAR LEG: the exit object and the occluder are ONE piece of geometry ============ */}
          {camY > 40 ? (
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 45, pointerEvents: "none", opacity: ramp(f, 118, 150), transform: `translateY(${(310 - camY) * 1.55}px)` }}>
              {/* branches forward and left from the reducer and exits across the LOWER-LEFT CORNER, near plane, soft.
                  It is an occluder, not a barricade: it must never cross the band the con is staged in. */}
              <div style={{ position: "absolute", left: -90, top: 700, width: 470, height: 46, borderRadius: 23, background: "linear-gradient(180deg,#e0bd63,#7d5f18 58%,#3d2e0c)", boxShadow: "0 -8px 26px rgba(0,0,0,0.45)", transform: "rotate(-11deg)", filter: "blur(3.4px)", opacity: 0.92 }} />
              {/* its glass elbow, the near-plane object */}
              <div style={{ position: "absolute", left: 116, top: 684, width: 66, height: 52, borderRadius: 9, background: "linear-gradient(140deg, rgba(200,230,255,0.3), rgba(150,190,230,0.1))", border: "3px solid rgba(216,180,85,0.5)", transform: "rotate(-11deg)", filter: "blur(3px)" }} />
              {/* the same three-rib collar, the same wear, at near-plane scale */}
              {[10, 286].map((jx, i) => (
                <div key={"nj" + i} style={{ position: "absolute", left: jx, top: 700 - i * 52, width: 22, height: 52, transform: "rotate(-11deg)", filter: "blur(3.2px)" }}>
                  {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: k * 7, top: 0, width: 5, height: 52, borderRadius: 2, background: "linear-gradient(180deg,#e0bd63,#4a3810)" }} />)}
                </div>
              ))}
            </div>
          ) : null}
          {/* 8 RAG C on the near joint: jets steam ACROSS THE LENS on the 40-frame cadence */}
          {camY > 100 ? (() => {
            const hard = (f >= 180 && f < 196 ? 1 - ramp(f, 180, 196) : 0) + (f >= 240 && f < 256 ? 1 - ramp(f, 240, 256) : 0);
            const pf = Math.max(ragPuff(31) * 0.7, hard);
            return (
              <div style={{ position: "absolute", left: 30, top: 636, zIndex: 46, pointerEvents: "none", opacity: ramp(f, 118, 150) }}>
                <div style={{ position: "absolute", left: 0, top: 74, width: 42, height: 18, borderRadius: 6, background: "linear-gradient(160deg,#7e7057,#453b2a)", transform: `rotate(${-16 + Math.sin(f * 0.12) * 5}deg)`, filter: "blur(2.2px)" }} />
                <div style={{ position: "absolute", left: -60, top: -30 - pf * 30, width: 300 + pf * 460, height: 200 + pf * 200, borderRadius: 200, background: "radial-gradient(ellipse, rgba(232,242,252,0.5), rgba(232,242,252,0) 66%)", opacity: pf * 0.85, filter: `blur(${14 + pf * 16}px)` }} />
              </div>
            );
          })() : null}

          {/* ============ THE SOUR SPILL: for 112 frames all the viewer gets is a wash bleeding up the bottom edge ============ */}
          {spill > 0.02 ? (
            <div style={{ position: "absolute", left: 0, bottom: 0, width: 1012, height: 190, zIndex: 47, pointerEvents: "none", opacity: spill, background: "linear-gradient(0deg, rgba(168,184,74,0.42) 0%, rgba(168,184,74,0.14) 44%, rgba(168,184,74,0) 100%)", filter: "blur(11px)", mixBlendMode: "screen" }} />
          ) : null}
          {/* the orange it mixes with */}
          {spill > 0.02 ? (
            <div style={{ position: "absolute", left: 240, bottom: 0, width: 620, height: 130, zIndex: 47, pointerEvents: "none", opacity: spill * 0.8, background: "linear-gradient(0deg, rgba(226,116,38,0.34) 0%, rgba(226,116,38,0) 100%)", filter: "blur(13px)", mixBlendMode: "screen" }} />
          ) : null}

          {/* the glass-crack flash on the multiply */}
          {crack > 0.5 ? <div style={{ position: "absolute", inset: 0, zIndex: 48, pointerEvents: "none", background: "rgba(226,236,248,0.3)", opacity: (crack - 0.5) * 2 }} /> : null}
        </div>
        {/* barrel distortion + the vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 49, pointerEvents: "none", boxShadow: "inset 0 0 140px rgba(0,0,0,0.78), inset 0 0 44px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 49, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.42) 100%)" }} />
      </div>
    </Panel>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const on = (a: number, b: number) => lf >= a && lf < b;
  const bell = (a: number, b: number) => Math.sin(Math.max(0, Math.min(1, (lf - a) / (b - a))) * Math.PI);

  // ============ GEOMETRY LOCK ============
  const RAM_X0 = 328, RAM_X1 = 712, RAM_H = 104, TUR_H = 130;
  const TURL = 336, TURR = 604, TURW = 110;             // turret centres 391 / 659
  const BEDY = 556;                                      // bed top surface
  const CARDY = 542;                                     // job-card slab top
  const SLOT = { x: 150, y: 366, w: 68, h: 38 };         // the bill validator, left pier face

  // ============ CAMERA: 4% push · two rhyming transients · drift HELD to f100 ============
  const spitPush = on(32, 34) ? ramp(lf, 32, 34) * 0.013 : on(34, 35) ? 0.013 : 0;
  const boomPush = on(88, 90) ? 0.031 : on(90, 91) ? 0.016 : 0;
  const push = 1 + ramp(lf, 0, 106) * 0.04 + spitPush + boomPush;
  const shk = on(88, 91) ? Math.exp(-(lf - 88) * 0.55) * 7.4 : on(32, 34) ? 1.5 : 0;
  const camX = Math.sin(lf * 3.9) * shk;
  const camY = Math.cos(lf * 4.6) * shk * 0.6 + (lf >= 100 ? interpolate(lf, [100, 104, 106], [0, 22, 44], cl) : 0);

  // ============ THE RAM + THE TWO DIE TURRETS ============
  const breath = (Math.sin(lf * 0.13) * 9 + Math.sin(lf * 0.31 + 1) * 4.4) * (lf < 22 ? 1 : 0.42);
  const drop = lf < 66 ? 0 : Math.pow(ramp(lf, 66, 88), 2.4);
  const lift = ramp(lf, 92, 106);
  const ramTop = 150 + breath * (1 - Math.max(drop, ramp(lf, 60, 66))) + drop * 138 - lift * 126;
  const dieBot = ramTop + RAM_H + TUR_H;                 // idle 384 · contact 522
  const dieSq = on(88, 89.6) ? 0.84 : 1;                 // the 1-frame inked-rubber squash
  const flipL = interpolate(lf, [83, 84.5], [0, 180], cl);    // f84: left turret SNAPS to red FAIL
  const flipR = interpolate(lf, [85, 86.5], [0, 180], cl);    // f85 his lane FAIL + hero's die BARE · f86 PASS
  const lampStrobe = on(76, 82) ? Math.max(0, 1 - (lf - 76) / 6) * (Math.floor(lf / 2) % 2 ? 1 : 0.35) : 0;

  // ============ THE MEASURING PROBE ============
  const probeY = interpolate(lf, [66, 70, 76, 84], [136, 506, 506, 136], cl);
  const probeX = interpolate(lf, [66, 69, 71, 74, 76, 84], [500, 391, 391, 659, 659, 500], cl);
  const probeSpin = lf >= 66 ? (lf - 66) * 27 : 0;
  const jaw = (on(68, 71) ? bell(68, 71) : 0) + (on(74, 76.5) ? bell(74, 76.5) : 0);
  const probeLive = lf >= 66 && lf < 85;

  // ============ THE RE-INKING ROLLER ============
  const inkLive = on(66, 81);
  const inkX = interpolate(lf, [66, 74, 81], [706, 330, 706], cl);
  const inkY = inkLive ? dieBot - 7 : 176 + Math.sin(lf * 0.3) * 2;
  const padRock = lf >= 100 ? Math.sin((lf - 100) * 0.7) * 9 : 0;

  // ============ THE INTERLOCK (no sprite touches it, no sprite can) ============
  const ready = lf >= 22 ? 0.72 + 0.28 * Math.abs(Math.sin(lf * 0.24)) : 0;
  const relay = on(22, 26) ? bell(22, 26) : 0;

  // ============ LAYER A: THE SUBMISSION ============
  const heroCardX = interpolate(lf, [0, 12], [700, 596], cl);
  const clack = on(12, 17) ? bell(12, 17) : 0;
  const chuteK = on(4, 9) ? bell(4, 9) : 0;
  const vCardX = lf < 4 ? 314 : interpolate(lf, [4, 8], [314, 330], cl);
  const vCardY = lf < 4 ? 404 : interpolate(lf, [4, 8], [404, CARDY], cl) + (on(8, 11) ? bell(8, 11) * -7 : 0);
  const vCardRot = lf < 4 ? -62 : lf < 18 ? interpolate(lf, [4, 8, 11], [-62, -9, -7], cl) : interpolate(lf, [18, 22], [-7, 0], cl);
  const vCardSkew = interpolate(lf, [18, 22], [9, 0], cl);   // half off the pins until the arm squares it
  const regArm = interpolate(lf, [18, 20.5, 22.5], [0, 46, 0], cl);
  const vCardLive = lf >= 4;

  // ============ LAYER B: THE COUNTERFEIT ============
  const vX = interpolate(lf, [12, 21, 29, 44, 52], [-84, 292, 262, 262, 202], cl);   // f29-f44: he stops DEAD
  const vWalk = lf < 29 || on(44, 52);
  const vNod = vWalk ? 3.0 : 0.5, vSpd = 7;
  const vHopP = Math.max(0, Math.sin(lf / (vSpd * 0.6)));
  const vHop = vHopP * vNod * 2.2;
  const vSq = 1 - vHopP * 0.045;
  const vSize = 168, vFeet = 688, vTop = vFeet - vSize;
  const stall = interpolate(lf, [30, 33, 44, 54], [0, -11, -11, -5], cl);   // smaller and stiller than S5's panic
  const lookUp = lf < 76 ? 0 : lf < 92 ? interpolate(lf, [76, 84, 92], [0, -9, -7], cl) : -7 + ramp(lf, 92, 106) * 3;
  const vBodyRot = stall + lookUp;
  const vCrush = on(88, 91) ? 1 - bell(88, 91) * 0.075 : 1;
  const rainOn = ramp(lf, 14, 19);
  const vLf = lf < 90 ? lf : lf < 92 ? 89 : lf - 2;      // f90 STUTTER: his aura glitches for the first time
  const vSh = { x: vX - 48, y: vTop + 72 - vHop };       // his left shoulder, matching the Mascot's armY

  // ONE STICKER OFF THE SAME SPOOL: smoothed on iron, fed, spat, flicked, binned
  const stPhase = lf < 15 ? 0 : lf < 24 ? 1 : lf < 28 ? 2 : lf < 32 ? 3 : lf < 40 ? 4 : lf < 50 ? 5 : 6;
  const smoothRub = Math.sin(lf * 1.7) * 8;
  const stX = stPhase <= 1 ? 282 + smoothRub : stPhase === 2 ? interpolate(lf, [24, 28], [282, SLOT.x + 30], cl)
    : stPhase === 3 ? SLOT.x + 30 : stPhase === 4 ? SLOT.x + 30 + interpolate(lf, [32, 40], [0, 12], cl)
      : interpolate(lf, [40, 44, 50], [SLOT.x + 42, SLOT.x - 22, 156], cl);
  const stY = stPhase <= 1 ? 572 : stPhase === 2 ? interpolate(lf, [24, 28], [572, SLOT.y + 12], cl)
    : stPhase === 3 ? SLOT.y + 12 : stPhase === 4 ? interpolate(lf, [32, 34, 40], [SLOT.y + 26, SLOT.y + 40, SLOT.y + 58], cl)
      : interpolate(lf, [40, 44, 50], [SLOT.y + 58, SLOT.y + 130, 662], cl);
  const stRot = stPhase <= 1 ? interpolate(lf, [16, 24], [-16, -4], cl) : stPhase === 2 ? -3
    : stPhase === 4 ? (lf - 32) * 26 : stPhase === 5 ? 208 + (lf - 40) * 44 : 0;
  const stVis = stPhase >= 1 && stPhase <= 5 && stPhase !== 3;
  const scan = on(28, 32) ? ramp(lf, 28, 32) : 0;
  const roller = lf >= 26 ? lf * 14 : 0;
  const spit = on(32, 36) ? bell(32, 36) : 0;
  const armUp = interpolate(lf, [22, 27, 54, 60], [0, 1, 1, 0], cl);   // EMPTY nub held two beats too long
  const gunWave = on(24, 30) ? bell(24, 30) : 0;

  // ============ THE FLICKER ARM + THE BIN ============
  const armOut = ramp(lf, 40, 43);
  const armBack = lf >= 100 ? ramp(lf, 100, 110) : 0;
  const flickRot = -8 + armOut * 76 - armBack * 76;
  const lidClap = lf >= 50 ? Math.max(0, Math.sin((lf - 50) * 0.55)) * Math.max(0.22, 1 - (lf - 50) / 90) : 0;
  const heapSettle = interpolate(lf, [50, 53], [0, 4], cl);
  const spillT = ramp(lf, 50, 58);

  // ============ LAYER C: THE WAKE ============
  const valve = (f: number) => (f >= 18 && (f - 18) % 30 < 9 ? Math.sin((((f - 18) % 30) / 9) * Math.PI) : 0);
  const steam = valve(lf) + (on(52, 62) ? bell(52, 62) * 0.8 : 0);
  const gauge = interpolate(lf, [0, 52, 66, 88, 92, 106], [8, 12, 96, 104, 88, 93], cl) + Math.sin(lf * 0.9) * 1.6;
  const flex = lf < 66 || lf >= 92 ? 0.35 * Math.sin(lf * 0.22)
    : interpolate(lf, [66, 86, 88, 92], [0, 2.2, 6, 1.2], cl) * (0.7 + 0.3 * Math.sin(lf * 1.9));
  const shieldX = interpolate(lf, [56, 60.5, 62, 64], [1040, 250, 268, 258], cl);
  const shieldY = 392 - (lf >= 98 ? interpolate(lf, [98, 106], [0, 152], cl) : 0);   // lifts after the hit, still travelling
  const shieldDown = lf >= 56;

  // ============ THE HERO ============
  const hSize = 150, hFeet = 700, hTop = hFeet - hSize;
  const hNod = lf < 14 ? 2.6 : 1.5, hSpd = 7;
  const hHopP = Math.max(0, Math.sin(lf / (hSpd * 0.6)));
  const hHop = hHopP * hNod * 2.2;
  const hSq = 1 - hHopP * 0.045;
  const hCrush = on(88, 91) ? 1 - bell(88, 91) * 0.07 : 1;
  const hLeg = (i: number) => Math.max(0, Math.sin(lf / (hSpd * 0.6) + i * Math.PI)) * 7;
  const hX = interpolate(lf, [0, 12, 18], [752, 768, 776], cl);
  const hGaze = lf >= 96 ? -4 : on(66, 92) ? 1 : 0;
  const flinch = on(60, 63) ? bell(60, 63) : 0;
  const exhale = on(92, 100) ? bell(92, 100) : 0;
  const hSh = { x: hX + 50, y: hTop + 64 - hHop };       // his RIGHT shoulder: he shoves the card away, down-lane
  // his nub: shoving · bed edge · flinch · FLAT ON THE PLEXI · reaching
  const nubT = lf < 14 ? 0 : lf < 50 ? 1 : lf < 60 ? 2 : lf < 63 ? 3 : lf < 104 ? 4 : 5;
  const nubTip = nubT === 0 ? { x: heroCardX + 110, y: 552 }
    : nubT === 1 ? { x: 788, y: 606 }
      : nubT === 2 ? { x: interpolate(lf, [50, 58], [788, 750], cl), y: interpolate(lf, [50, 58], [606, 552], cl) }
        : nubT === 3 ? { x: 756 + flinch * 18, y: 552 + flinch * 36 }
          : nubT === 4 ? { x: 748, y: 546 }
            : { x: interpolate(lf, [104, 106], [748, 706], cl), y: interpolate(lf, [104, 106], [546, 496], cl) };
  const nubFlat = nubT === 4 ? 1 : 0;

  // ============ LAYER E/F: THE VERDICTS · THE PEEL · THE EJECT ============
  const partSq = lf < 90 ? interpolate(dieBot, [496, 522], [1, 0.47], cl) : Math.min(1, 0.47 + ramp(lf, 90, 106) * 0.44);
  const printed = lf >= 88 ? 1 : 0;
  const peel = ramp(lf, 92, 100);
  const curl = lf >= 96 ? ramp(lf, 96, 118) : 0;         // still curling off the die at f106
  const pins = interpolate(lf, [98, 100, 104, 108], [0, 40, 40, 4], cl);
  const passY = lf >= 98 ? CARDY - interpolate(lf, [98, 101, 104, 106], [0, 40, 98, 214], cl) : CARDY;
  const passX = lf >= 98 ? interpolate(lf, [98, 104, 106], [596, 618, 690], cl) : 596;
  const passS = lf >= 98 ? interpolate(lf, [98, 104, 106], [1, 1.2, 2.55], cl) : 1;
  const passR = lf >= 98 ? interpolate(lf, [98, 106], [0, -24], cl) : 0;
  const crack = ramp(lf, 96, 103);                       // races ALONG his own glint bar
  const crack2 = ramp(lf, 105, 112);
  const blankT = lf >= 98 ? ramp(lf, 98, 116) : 0;       // the shift does not care what just happened

  // ============ THE OPERATOR + THE RE-COCK LEVER (dead f0-f92) ============
  const oSize = 176, oFeet = 754, oCx = interpolate(lf, [56, 60], [886, 918], cl);
  const oHop = Math.max(0, Math.sin(lf / 4.8)) * 1.4 * 2.2;
  const haul = lf >= 92 ? interpolate(lf, [92, 99, 103, 106], [0, 40, 28, 48], cl) : 0;
  const lvRad = (haul * Math.PI) / 180;
  const lvTip = { x: 952.5 - 138 * Math.sin(lvRad), y: 402 + 138 * Math.cos(lvRad) };
  const oPose = lf < 56 ? 0 : lf < 92 ? 1 : 2;           // lever · BOTH NUBS BEHIND HIS BACK · hauling
  const oSh = { x: oCx + 44, y: oFeet - oSize + 76 - oHop };
  const oGrip = { x: lvTip.x, y: lvTip.y - 8 };

  // ============ PERPETUAL LAYERS ============
  const fanRot = (lf / 40) * 360;
  const fluo = 0.92 + 0.08 * (seed(Math.floor(lf / 3) * 1.7) > 0.86 ? 0.3 : 1);
  const shaftHot = on(90, 96) ? Math.max(0, 1 - (lf - 90) / 6) : 0;
  const botP = (lf % 96) / 96;
  const botX = 306 + Math.abs(Math.sin(botP * Math.PI)) * 246;
  const botFace = Math.cos(botP * Math.PI) >= 0 ? 1 : -1;
  const inkDrip = ((lf * 1.4) % 38) / 38;
  const queueShift = (lf >= 30 ? 9 : 0) + (lf >= 86 ? 9 : 0);
  const ring = lf >= 88 ? ramp(lf, 88, 106) : 0;

  // FOCAL KEY-LIGHT: the press bed + the two dies are the ONE lit subject. it pools warm all through, then BLOOMS as the ram commits and the verdicts print.
  const keyLight = 0.5 + 0.5 * ramp(lf, 72, 88);

  const shaftL = (y: number) => interpolate(y, [0, 556], [552, 296], cl);
  const shaftR = (y: number) => interpolate(y, [0, 556], [676, 474], cl);

  const motes = Array.from({ length: 34 }).map((_, i) => {
    const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2), r3 = seed(i * 2.3 + 11);
    const y = ((r2 * 620 + lf * (0.34 + r3 * 0.62)) % 620) + 10;
    const x = 250 + r * 470 + Math.sin(lf * 0.045 + i) * 11;
    const inShaft = x > shaftL(y) && x < shaftR(y);
    return { x, y, s: 1.3 + r3 * 2.5, o: (inShaft ? 0.72 : 0.13) * (0.4 + r * 0.6) };
  });
  // bed dust JUMPS upward off the plate ahead of the pressure wave
  const bedDust = Array.from({ length: 26 }).map((_, i) => {
    const r = seed(i * 4.3 + 1), r2 = seed(i * 2.9 + 6);
    const t = ramp(lf, 78 + r * 5, 92);
    return { x: 268 + r * 494, y: 548 - t * (16 + r2 * 40), o: t * (1 - t) * 3.4, s: 1.4 + r2 * 2.6 };
  });

  const limb = (k: string, x1: number, y1: number, x2: number, y2: number, w: number, c: string, z: number) => {
    const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    return <div key={k} style={{ position: "absolute", left: x1, top: y1 - w / 2, width: Math.hypot(x2 - x1, y2 - y1), height: w, background: c, borderRadius: w * 0.3, transform: `rotate(${a}deg)`, transformOrigin: `0px ${w / 2}px`, zIndex: z, boxShadow: "0 3px 8px rgba(0,0,0,0.45)" }} />;
  };

  const IRON = "linear-gradient(180deg,#414954 0%,#2B313A 52%,#1A1E24 100%)";
  const BRASS = "linear-gradient(180deg,#F0DFA6 0%,#E7B24C 38%,#8A6A2E 100%)";
  const WRECK = (
    <>
      <path d="M6 50 L4 30 L20 28 L30 9 L62 7 L74 27 L92 30 L90 50 Z" fill="#2A2320" />
      <path d="M30 9 L44 8 L46 27 L22 28 Z" fill="#3E3430" />
      <path d="M50 8 L62 7 L74 27 L50 27 Z" fill="#463A34" />
      <path d="M26 12 L44 10 L45 22 L30 23 Z" fill="#5E4A3A" opacity="0.7" />
      <rect x="4" y="30" width="88" height="4" fill="#151110" />
      <circle cx="26" cy="47" r="8" fill="#12100F" />
      <circle cx="26" cy="47" r="3" fill="#3A342F" />
      <path d="M66 40 l6 8 l-14 0 z" fill="#0C0A09" />
      <rect x="60" y="44" width="18" height="4" fill="#0C0A09" />
      <path d="M34 6 L40 0 L44 7 Z" fill="#5A3A22" opacity="0.8" />
      <rect x="12" y="34" width="8" height="3" fill="#6E4326" opacity="0.6" />
      <rect x="76" y="33" width="10" height="3" fill="#6E4326" opacity="0.5" />
    </>
  );
  const PART = (
    <>
      <rect x="12" y="16" width="58" height="32" rx="3" fill="#79838C" />
      <rect x="12" y="16" width="58" height="5" fill="#AEB7BF" />
      <rect x="12" y="42" width="58" height="6" fill="#4A525A" />
      <path d="M64 16 h16 v10 h-6 v-4 h-10 z" fill="#8F98A1" />
      <rect x="20" y="6" width="30" height="12" rx="2" fill="#939CA5" />
      <rect x="20" y="6" width="30" height="3" fill="#C3CBD2" />
      <circle cx="35" cy="12" r="4" fill="#E7B24C" /><circle cx="35" cy="12" r="1.6" fill="#7A5C24" />
      <circle cx="24" cy="32" r="4.5" fill="#E7B24C" /><circle cx="24" cy="32" r="1.8" fill="#7A5C24" />
      <rect x="44" y="26" width="20" height="4" fill="#5C656E" />
      <rect x="44" y="34" width="14" height="3" fill="#5C656E" />
      <rect x="14" y="18" width="4" height="24" fill="rgba(255,255,255,0.22)" />
    </>
  );
  const verdict = (col: string, txt: string, top: number) => (
    <div style={{ position: "absolute", left: 16, top, width: 88, height: 22, border: `3px solid ${col}`, borderRadius: 3, color: col, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, textAlign: "center", lineHeight: "17px", letterSpacing: 2, transform: "rotate(-3deg)", textShadow: "0 1px 0 rgba(0,0,0,0.35)" }}>{txt}</div>
  );

  return (
    <Panel label="THE PRESS">
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: grad("#23352F", "#0E1817"), fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", inset: 0, transform: `translate(${camX}px, ${camY}px) scale(${push})`, transformOrigin: "500px 545px" }}>

          {/* ============ THE GREEN TILE HALL ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 604, background: "linear-gradient(180deg,#2C443E 0%,#223731 62%,#16241F 100%)", filter: `brightness(${fluo})` }} />
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={"tv" + i} style={{ position: "absolute", left: i * 78, top: 0, width: 1.5, height: 604, background: "rgba(0,0,0,0.24)" }} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={"th" + i} style={{ position: "absolute", left: 0, top: i * 68, width: 1012, height: 1.5, background: "rgba(255,255,255,0.05)" }} />
          ))}
          <div style={{ position: "absolute", left: 796, top: 176, width: 216, height: 300, background: "linear-gradient(120deg,#1B2C27,#0C1513)", boxShadow: "inset 12px 0 34px rgba(0,0,0,0.7)" }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={"hl" + i} style={{ position: "absolute", left: 812 + i * 52, top: 176, width: 2, height: 300, background: "rgba(255,255,255,0.05)", transform: `skewX(${-7 - i}deg)` }} />
          ))}

          {/* BG 1 · SET 23 · THE WALL OF SHAME. dozens of red FAILs. FAIL is not personal, FAIL is Tuesday. RECESSED so the payoff stamps own the eye. */}
          <div style={{ position: "absolute", left: 336, top: 194, width: 340, height: 278, zIndex: 2, opacity: 0.5, filter: "blur(2.2px) saturate(0.58) brightness(0.72)" }}>
            <div style={{ position: "absolute", inset: -8, background: "rgba(6,16,14,0.42)", borderRadius: 4, boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)" }} />
            {Array.from({ length: 56 }).map((_, i) => {
              const ph = seed(i * 1.9 + 3);
              const flut = Math.sin(lf * 0.085 + ph * 6.3) * (2.4 + ph * 2.6) + (on(88, 94) ? bell(88, 94) * 7 : 0);
              return (
                <div key={"ws" + i} style={{ position: "absolute", left: (i % 8) * 42 + 2, top: Math.floor(i / 8) * 35 + 2, width: 36, height: 27, background: "linear-gradient(170deg,#D8D2C4,#A9A395)", borderRadius: 2, boxShadow: "0 3px 5px rgba(0,0,0,0.5)", transform: `rotate(${flut}deg)`, transformOrigin: "12% 6%" }}>
                  <div style={{ position: "absolute", left: 2, top: 15, width: 32, height: 8, background: RED, opacity: 0.82, transform: "rotate(-7deg)", borderRadius: 1 }} />
                  <div style={{ position: "absolute", left: 4, top: 5, width: 22, height: 1.5, background: "rgba(30,30,26,0.4)" }} />
                  <div style={{ position: "absolute", left: 4, top: 9, width: 15, height: 1.5, background: "rgba(30,30,26,0.3)" }} />
                  <div style={{ position: "absolute", left: 16, top: -1, width: 3, height: 3, borderRadius: 2, background: "#8A8478" }} />
                </div>
              );
            })}
          </div>

          {/* BG 2 · SET 27 · THE CEILING FAN SHADOW BAR. 40f loop. never stops, never resolves. */}
          <div style={{ position: "absolute", left: 500, top: 300, width: 0, height: 0, zIndex: 3 }}>
            <div style={{ position: "absolute", left: -420, top: -420, width: 840, height: 840, transform: `rotate(${fanRot}deg)`, opacity: 0.2, filter: "blur(9px)" }}>
              {[0, 60, 120].map((a) => (
                <div key={"fb" + a} style={{ position: "absolute", left: 0, top: 404, width: 840, height: 32, background: "#04100D", transform: `rotate(${a}deg)`, transformOrigin: "50% 50%" }} />
              ))}
            </div>
          </div>

          {/* BG 3 · SET 25 · THE ROPE-LINE QUEUE. back and up, dimmed, blurred, behind the operator. */}
          <div style={{ position: "absolute", left: 828, top: 236, width: 190, height: 156, zIndex: 4, filter: "blur(1.5px) brightness(0.5)", opacity: 0.78 }}>
            <div style={{ position: "absolute", left: 4, top: 116, width: 186, height: 4, background: "rgba(180,160,90,0.5)", borderRadius: 2 }} />
            {[10, 96, 178].map((sx, i) => (
              <div key={"st" + i} style={{ position: "absolute", left: sx, top: 116, width: 4, height: 32, background: "#6B7A72" }} />
            ))}
            {[0, 1, 2].map((i) => (
              <div key={"q" + i} style={{ position: "absolute", left: 18 + i * 56 + queueShift - i * 3, top: 78 - i * 5, transform: `scale(${0.96 - i * 0.09})`, transformOrigin: "50% 100%" }}>
                <Mascot lf={lf + i * 19} size={66} gaze={-1} nodAmp={0.9} nodSpeed={13} />
                <div style={{ position: "absolute", left: 40, top: 34, width: 20, height: 14, background: "#C8C2B4", borderRadius: 1, transform: "rotate(-9deg)" }} />
              </div>
            ))}
          </div>

          {/* BG 4 · SET 26 · THE CLERESTORY SHAFT. the ram cuts it; it blows solid white at f90. */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 604, zIndex: 5, pointerEvents: "none", clipPath: "polygon(552px 0px, 676px 0px, 474px 556px, 296px 556px)", background: `linear-gradient(180deg, rgba(226,244,236,${0.3 + shaftHot * 0.5}), rgba(190,226,214,${0.05 + shaftHot * 0.35}))`, filter: "blur(3px)", opacity: 0.86 }} />
          {lf >= 60 && <div style={{ position: "absolute", left: 296, top: dieBot - 4, width: 380, height: 9, zIndex: 5, background: "rgba(240,255,248,0.4)", filter: "blur(4px)", opacity: 0.7 }} />}
          {motes.map((m, i) => (
            <div key={"mo" + i} style={{ position: "absolute", left: m.x, top: m.y, width: m.s, height: m.s, borderRadius: "50%", background: "#F2FBF6", opacity: m.o, zIndex: 6 }} />
          ))}
          {/* a moth circles the shaft */}
          <div style={{ position: "absolute", left: 520 + Math.sin(lf * 0.11) * 62, top: 210 + Math.cos(lf * 0.17) * 46, width: 5, height: 4, background: "#0E1B18", borderRadius: 2, zIndex: 6, opacity: 0.6, transform: `scaleX(${0.5 + 0.5 * Math.abs(Math.sin(lf * 0.9))})` }} />

          {/* ============ FOCAL RANK · a dark scrim RECESSES the busy backdrop, a warm key-light POOLS on the bed + dies so the eye lands on the one subject ============ */}
          {/* scrim: transparent over the press bed, darkening hard toward the wall of shame + edges. sits ABOVE the backdrop detail, BELOW every press part. */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 604, zIndex: 7, pointerEvents: "none", background: "radial-gradient(ellipse 330px 260px at 500px 520px, rgba(8,17,14,0) 0%, rgba(8,17,14,0.34) 47%, rgba(5,12,10,0.7) 100%)" }} />
          {/* key-light pool: soft warm bloom on the bed + dies, intensifying as the ram commits */}
          <div style={{ position: "absolute", left: 210, top: 330, width: 580, height: 400, zIndex: 7, pointerEvents: "none", filter: "blur(7px)", background: `radial-gradient(ellipse 48% 46% at 50% 56%, rgba(250,246,224,${0.18 * keyLight}) 0%, rgba(240,235,210,${0.08 * keyLight}) 42%, transparent 72%)` }} />

          {/* ============ SET 30 · THE SAFETY HATCH ============ */}
          <div style={{ position: "absolute", left: 0, top: 600, width: 1012, height: 192, zIndex: 7, background: "linear-gradient(180deg,#274039 0%,#1C2E29 46%,#142320 100%)" }} />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={"ft" + i} style={{ position: "absolute", left: 0, top: 606 + i * 26, width: 1012, height: 1.4, background: "rgba(255,255,255,0.045)", zIndex: 7 }} />
          ))}
          <div style={{ position: "absolute", left: 128, top: 620, width: 760, height: 150, zIndex: 7, border: "4px solid rgba(226,178,60,0.28)", background: "repeating-linear-gradient(48deg, rgba(226,178,60,0.14) 0px, rgba(226,178,60,0.14) 9px, transparent 9px, transparent 26px)" }} />
          <div style={{ position: "absolute", left: 240, top: 690, width: 520, height: 40, zIndex: 7, background: "radial-gradient(ellipse at 50% 50%, rgba(178,176,164,0.24), transparent 70%)", filter: "blur(4px)" }} />
          <div style={{ position: "absolute", left: 200, top: 596, width: 630, height: 60, zIndex: 7, background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.75), transparent 72%)", filter: "blur(8px)" }} />

          {/* ============ SET 8 · FOUR PRESS COLUMNS (they FLEX and shudder on the descent) ============ */}
          {[{ x: 220, o: -1 }, { x: 285, o: -1 }, { x: 700, o: 1 }, { x: 765, o: 1 }].map((C, i) => (
            <div key={"col" + i} style={{ position: "absolute", left: C.x + C.o * flex, top: 138, width: 30, height: 462, zIndex: 8, background: "linear-gradient(90deg,#4C555F 0%,#9BA4AD 26%,#DDE4E9 40%,#7E878F 62%,#3A424B 100%)", borderRadius: 3, boxShadow: "0 12px 28px rgba(0,0,0,0.6)", transform: `skewX(${C.o * flex * 0.16}deg)` }}>
              {/* chrome worn to grey at grip height */}
              <div style={{ position: "absolute", left: 0, top: 300, width: 30, height: 120, background: "linear-gradient(90deg,#3E464F,#6A737C,#454D56)", opacity: 0.85 }} />
              {[150, 366].map((gy, k) => (
                <div key={"gb" + k} style={{ position: "absolute", left: -4, top: gy, width: 38, height: 16, background: "linear-gradient(180deg,#57606A,#22272E)", borderRadius: 2, boxShadow: "0 3px 6px rgba(0,0,0,0.6)" }}>
                  <div style={{ position: "absolute", left: 2, top: 3, width: 34, height: 4, background: "rgba(30,22,10,0.75)" }} />
                </div>
              ))}
              <div style={{ position: "absolute", left: -5, top: -6, width: 40, height: 16, background: IRON, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: -6, top: 450, width: 42, height: 18, background: IRON, borderRadius: 2, boxShadow: "0 5px 10px rgba(0,0,0,0.6)" }} />
            </div>
          ))}

          {/* ============ SET 11 · THE LEFT CHUTE ============ */}
          <div style={{ position: "absolute", left: 296, top: 378, width: 68, height: 170, zIndex: 9, transform: "skewX(-8deg)", background: "linear-gradient(100deg,#3A424B,#20252B)", borderLeft: "3px solid #59626C", borderRight: "3px solid #171B21", boxShadow: "0 10px 24px rgba(0,0,0,0.6), inset 0 0 22px rgba(0,0,0,0.5)" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={"dn" + i} style={{ position: "absolute", left: 8 + (i % 2) * 26, top: 22 + i * 30, width: 16, height: 8, borderRadius: 5, background: "rgba(0,0,0,0.4)", boxShadow: "inset 0 2px 3px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.09)" }} />
            ))}
            <div style={{ position: "absolute", left: 0, top: 0, width: 68, height: 12, background: "#151A1F" }} />
          </div>
          <div style={{ position: "absolute", left: 294, top: 384 - chuteK * 9, width: 42, height: 9, zIndex: 10, background: BRASS, borderRadius: 2, transform: `rotate(${-6 + chuteK * 26}deg)`, transformOrigin: "0% 50%", boxShadow: "0 3px 6px rgba(0,0,0,0.6)" }} />

          {/* ============ SET 9 · THE PRESS BED + REGISTRATION PINS ============ */}
          <div style={{ position: "absolute", left: 244, top: 592, width: 548, height: 30, zIndex: 10, background: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.8), rgba(0,0,0,0) 74%)", filter: "blur(6px)" }} />
          <div style={{ position: "absolute", left: 250, top: BEDY, width: 530, height: 46, zIndex: 11, background: "linear-gradient(180deg,#5A636D 0%,#39414A 22%,#232830 100%)", borderRadius: "3px 3px 5px 5px", boxShadow: "0 16px 30px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.2)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 530, height: 6, background: "linear-gradient(180deg,#8B939B,#4C545D)" }} />
            <div style={{ position: "absolute", left: 0, top: 30, width: 530, height: 16, background: "repeating-linear-gradient(90deg, rgba(226,178,60,0.5) 0px, rgba(226,178,60,0.5) 13px, rgba(14,16,18,0.6) 13px, rgba(14,16,18,0.6) 26px)", opacity: 0.4 }} />
            <div style={{ position: "absolute", left: 66, top: 2, width: 148, height: 3, background: "rgba(10,12,14,0.7)" }} />
            <div style={{ position: "absolute", left: 332, top: 2, width: 148, height: 3, background: "rgba(10,12,14,0.7)" }} />
          </div>
          {[326, 452, 592, 718].map((px, i) => (
            <div key={"rp" + i} style={{ position: "absolute", left: px, top: BEDY - 13, width: 7, height: 15, zIndex: 12, background: BRASS, borderRadius: "3px 3px 0 0", boxShadow: "0 2px 4px rgba(0,0,0,0.7)" }} />
          ))}
          {/* SET 14 · THE LIVE EJECTOR PINS. recessed flush for 86 frames, then they fire. */}
          {[610, 670].map((px, i) => (
            <div key={"ep" + i} style={{ position: "absolute", left: px, top: BEDY - 4 - pins, width: 9, height: 12 + pins, zIndex: 12, background: "linear-gradient(180deg,#FBEFC4,#E7B24C 40%,#8A6A2E)", borderRadius: "4px 4px 0 0", boxShadow: `0 2px 5px rgba(0,0,0,0.7), 0 0 ${pins * 0.3}px rgba(231,178,76,0.6)` }} />
          ))}
          {/* SET 15 · THE DEAD EJECTOR PINS. identical pair. they never fire. */}
          {[360, 420].map((px, i) => (
            <div key={"dp" + i} style={{ position: "absolute", left: px, top: BEDY - 4, width: 9, height: 12, zIndex: 12, background: "linear-gradient(180deg,#D8CBA2,#B08A38 40%,#6E5427)", borderRadius: "4px 4px 0 0", boxShadow: "0 2px 5px rgba(0,0,0,0.7)" }} />
          ))}
          {/* SET 10 · THE REGISTRATION ARM. the machine does his job for him. */}
          <div style={{ position: "absolute", left: 272 + regArm, top: BEDY - 16, width: 54, height: 17, zIndex: 13, background: "linear-gradient(180deg,#7E878F,#3A424B)", borderRadius: 2, boxShadow: "0 4px 9px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", right: -3, top: 1, width: 6, height: 15, background: "#99A2AA", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: -18, top: 5, width: 22, height: 7, background: "repeating-linear-gradient(90deg,#4E5761 0px,#4E5761 3px,#2A3038 3px,#2A3038 6px)" }} />
          </div>

          {/* ============ SET 12 · THE VILLAIN'S JOB: THE S1 WRECK, still wearing his DONE ============ */}
          {vCardLive && lf < 92 && (
            <div style={{ position: "absolute", left: vCardX, top: vCardY, width: 120, height: 16, zIndex: 14, transform: `rotate(${vCardRot}deg) skewX(${vCardSkew}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 120, height: 16, background: "linear-gradient(180deg,#CFC8B6,#8E8878)", borderRadius: 2, boxShadow: "0 5px 10px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: 14, top: -50 * partSq, width: 96, height: 50 * partSq }}>
                <svg width="96" height={Math.max(2, 50 * partSq)} viewBox="0 0 96 50" preserveAspectRatio="none">{WRECK}</svg>
                <div style={{ position: "absolute", left: 22, top: -2, transform: `scale(${Math.max(0.2, partSq)})`, transformOrigin: "50% 100%" }}>
                  <DoneSticker x={0} y={0} s={0.3} rot={-17 + Math.sin(lf * 0.3) * 1.6} />
                </div>
              </div>
              {printed > 0 && verdict(RED, "FAIL", -13)}
            </div>
          )}

          {/* ============ SET 13 · THE HERO'S JOB: A CLEAN ASSEMBLED PART ============ */}
          {lf < 98 && (
            <div style={{ position: "absolute", left: heroCardX, top: CARDY, width: 120, height: 16, zIndex: 14, transform: `translateY(${clack * -3}px)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 120, height: 16, background: "linear-gradient(180deg,#DCD6C6,#9A9484)", borderRadius: 2, boxShadow: "0 5px 10px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: 20, top: -48 * partSq, width: 88, height: 48 * partSq }}>
                <svg width="88" height={Math.max(2, 48 * partSq)} viewBox="0 0 88 48" preserveAspectRatio="none">{PART}</svg>
              </div>
              {printed > 0 && verdict(GREEN, "PASS", -13)}
            </div>
          )}
          {/* SET 11 · a fresh blank card into the emptied lane. the shift does not care. */}
          {blankT > 0 && (
            <div style={{ position: "absolute", left: 306 + blankT * 26, top: 396 + blankT * 150, width: 120, height: 16, zIndex: 14, background: "linear-gradient(180deg,#CFC8B6,#8E8878)", borderRadius: 2, transform: `rotate(${-54 + blankT * 46}deg)`, boxShadow: "0 5px 10px rgba(0,0,0,0.6)" }} />
          )}

          {/* ============ SET 1 · THE CROWN + MAKER'S PLATE ============ */}
          <div style={{ position: "absolute", left: 296, top: 55, width: 424, height: 86, zIndex: 15, background: IRON, borderRadius: 4, boxShadow: "0 18px 40px rgba(0,0,0,0.7), inset 0 3px 0 rgba(255,255,255,0.12)" }}>
            <div style={{ position: "absolute", left: -14, top: -8, width: 452, height: 15, background: "linear-gradient(180deg,#4C555F,#2A3038)", borderRadius: 3, boxShadow: "0 5px 12px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", left: 92, top: 46, width: 240, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 1.6, color: "#77808C", textShadow: "0 1.5px 0 rgba(255,255,255,0.16), 0 -1.5px 0 rgba(0,0,0,0.75)" }}>
              IRONCLAD VERDICT WORKS
            </div>
            {/* SET 6 · THE AGENCY SEAL: a gear ring with a crossed key and wrench. no lettering. */}
            <svg width="58" height="58" viewBox="0 0 58 58" style={{ position: "absolute", left: 175, top: 8 }}>
              <circle cx="29" cy="29" r="24" fill="none" stroke="#8A6A2E" strokeWidth="5" />
              {Array.from({ length: 14 }).map((_, i) => (
                <rect key={"gt" + i} x="27.5" y="1" width="3" height="7" fill="#8A6A2E" transform={`rotate(${i * 25.7} 29 29)`} />
              ))}
              <circle cx="29" cy="29" r="16" fill="none" stroke="#6E5427" strokeWidth="2" />
              <g transform="rotate(-32 29 29)"><rect x="27" y="15" width="4" height="24" fill="#9C7B36" /><circle cx="29" cy="14" r="5" fill="none" stroke="#9C7B36" strokeWidth="3" /><rect x="31" y="36" width="5" height="3" fill="#9C7B36" /></g>
              <g transform="rotate(34 29 29)"><rect x="27" y="18" width="4" height="22" fill="#9C7B36" /><path d="M25 18 h10 v6 h-3 v-3 h-4 v3 h-3 z" fill="#9C7B36" /></g>
              <circle cx="29" cy="29" r="24" fill="none" stroke={GOLD} strokeWidth="1.2" opacity={0.35 + (lf >= 96 ? bell(96, 106) * 0.65 : 0)} />
            </svg>
            <div style={{ position: "absolute", left: 168, top: 2, width: 72, height: 20, background: `radial-gradient(ellipse at 50% 100%, rgba(255,244,214,${lf >= 96 ? bell(96, 106) * 0.8 : 0}), transparent 70%)`, filter: "blur(4px)" }} />
            {/* SET 7 · THE INTERLOCK + READY LAMP */}
            <div style={{ position: "absolute", left: 132, top: 60, width: 30, height: 30 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 15, background: "linear-gradient(180deg,#4A525C,#232830)", border: "2px solid #171B21", boxShadow: `0 0 ${16 * ready}px rgba(63,158,116,${0.8 * ready})` }} />
              <div style={{ position: "absolute", left: 6, top: 6, width: 18, height: 18, borderRadius: 9, background: ready > 0 ? GREEN : "#1E2C27", boxShadow: ready > 0 ? `0 0 12px ${GREEN}` : "none", opacity: 0.35 + ready * 0.65 }} />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={"cg" + i} style={{ position: "absolute", left: 4, top: 4 + i * 6, width: 22, height: 1.4, background: "rgba(10,14,12,0.8)" }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 118, top: 46, width: 58, height: 58, borderRadius: 29, background: `radial-gradient(circle, rgba(63,158,116,${0.4 * relay}), transparent 70%)`, filter: "blur(6px)" }} />
          </div>
          {/* the crown sheds a curtain of dust off its top lip on every hit */}
          {Array.from({ length: 18 }).map((_, i) => {
            const r = seed(i * 5.1 + 2);
            const t = ((lf * (0.5 + r) + r * 60 + (lf >= 88 ? 40 : 0)) % 60) / 60;
            const burst = on(88, 100) ? 1 : on(22, 32) ? 0.5 : 0.16;
            return <div key={"cd" + i} style={{ position: "absolute", left: 302 + r * 412, top: 138 + t * 44, width: 1.6 + r * 2, height: 1.6 + r * 2, borderRadius: 2, background: "#C8D6CE", opacity: (1 - t) * 0.5 * burst, zIndex: 16 }} />;
          })}

          {/* SET 19 · THE PRESSURE GAUGE, moved up next to the thing it measures */}
          <div style={{ position: "absolute", left: 730, top: 100, width: 62, height: 62, zIndex: 16 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 31, background: BRASS, boxShadow: "0 6px 16px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.5)" }} />
            <div style={{ position: "absolute", left: 5, top: 5, width: 52, height: 52, borderRadius: 26, background: "linear-gradient(180deg,#F4F0E2,#CFC8B4)", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.4)" }} />
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={"gk" + i} style={{ position: "absolute", left: 30.2, top: 9, width: 1.6, height: i % 5 === 0 ? 8 : 5, background: i > 8 ? RED : "#3A382E", transformOrigin: "50% 22px", transform: `rotate(${-124 + i * 24.8}deg)` }} />
            ))}
            <div style={{ position: "absolute", left: 30.2, top: 12, width: 1.8, height: 20, background: GOLD, borderRadius: 1, transformOrigin: "50% 19px", transform: `rotate(${-124 + (gauge / 104) * 248}deg)`, boxShadow: "0 0 4px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 27, top: 28, width: 8, height: 8, borderRadius: 4, background: "#8A6A2E" }} />
            <div style={{ position: "absolute", left: 12, top: 8, width: 16, height: 10, borderRadius: 8, background: "rgba(255,255,255,0.4)", transform: "rotate(-24deg)", filter: "blur(2px)" }} />
          </div>

          {/* SET 20 · THE RELIEF VALVE. its jet rolls through the key-light beam and lights up. */}
          <div style={{ position: "absolute", left: 782, top: 188, width: 34, height: 30, zIndex: 15, background: IRON, borderRadius: 3, boxShadow: "0 5px 12px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: -8, top: 8, width: 10, height: 13, background: "#4E5761", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 12, top: -8, width: 10, height: 10, borderRadius: 5, background: BRASS }} />
          </div>
          {steam > 0.02 && Array.from({ length: 12 }).map((_, i) => {
            const r = seed(i * 2.7 + 9);
            const t = (lf * 0.09 + r) % 1;
            const px = 780 - t * (110 + r * 60);
            const inBeam = px > shaftL(206) && px < shaftR(206);
            return <div key={"sv" + i} style={{ position: "absolute", left: px, top: 196 + Math.sin(t * 4 + i) * 13 - t * 10, width: 8 + t * 26, height: 8 + t * 22, borderRadius: "50%", background: inBeam ? "rgba(238,252,246,0.5)" : "rgba(200,220,212,0.2)", filter: "blur(5px)", opacity: steam * (1 - t) * 0.9, zIndex: 15 }} />;
          })}

          {/* bed dust JUMPS off the plate ahead of the pressure wave */}
          {lf >= 78 && bedDust.map((d, i) => (
            <div key={"bd" + i} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: "50%", background: "#D6E2DA", opacity: Math.min(0.7, d.o), zIndex: 16 }} />
          ))}

          {/* ============ SET 2 · THE RAM ============ */}
          <div style={{ position: "absolute", left: RAM_X0, top: ramTop, width: RAM_X1 - RAM_X0, height: RAM_H, zIndex: 17, background: IRON, borderRadius: 3, boxShadow: "0 22px 44px rgba(0,0,0,0.75), inset 0 3px 0 rgba(255,255,255,0.14)" }}>
            <div style={{ position: "absolute", left: -12, top: -10, width: RAM_X1 - RAM_X0 + 24, height: 16, background: "linear-gradient(180deg,#525B66,#2A3038)", borderRadius: 2 }} />
            {/* the relief notch the probe spindle passes through */}
            <div style={{ position: "absolute", left: 150, top: 0, width: 44, height: RAM_H, background: "linear-gradient(180deg,#12161B,#05080A)", boxShadow: "inset 0 0 12px rgba(0,0,0,0.9)" }} />
            {[40, 96, 250, 306].map((rx, i) => (
              <div key={"rb" + i} style={{ position: "absolute", left: rx, top: 20, width: 16, height: 16, borderRadius: 8, background: "radial-gradient(circle at 35% 30%,#8B939B,#2A3038)", boxShadow: "0 2px 4px rgba(0,0,0,0.7)" }} />
            ))}
            <div style={{ position: "absolute", left: 0, top: 44, width: RAM_X1 - RAM_X0, height: 4, background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", left: 0, top: RAM_H - 10, width: RAM_X1 - RAM_X0, height: 10, background: "linear-gradient(180deg,#1E232A,#0B0E12)" }} />
          </div>

          {/* SET 3 · THE TWO DIE TURRETS. blank bare rubber until the last four frames. */}
          {[{ x: TURL, flip: flipL, v: "FAIL", col: RED, k: "L" }, { x: TURR, flip: flipR, v: "PASS", col: GREEN, k: "R" }].map((T) => {
            const showV = T.flip > 90;
            return (
              <div key={"tur" + T.k} style={{ position: "absolute", left: T.x, top: ramTop + RAM_H, width: TURW, height: TUR_H, zIndex: 17 }}>
                {/* the verdict's own coloured halo: the payoff blooms brighter than anything else on screen */}
                {showV && <div style={{ position: "absolute", left: TURW / 2 - 84, top: 24, width: 168, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${T.col}66, ${T.col}22 46%, transparent 70%)`, filter: "blur(12px)", pointerEvents: "none" }} />}
                <div style={{ position: "absolute", left: TURW / 2 - 7, top: 0, width: 14, height: 34, background: "linear-gradient(90deg,#3A424B,#9BA4AD,#3A424B)" }} />
                <div style={{ position: "absolute", left: TURW / 2 - 18, top: 26, width: 36, height: 12, borderRadius: 2, background: BRASS, boxShadow: "0 3px 6px rgba(0,0,0,0.6)" }} />
                {/* the ratchet pawl kicks on the commit */}
                <div style={{ position: "absolute", left: TURW / 2 + 16, top: 24, width: 14, height: 6, background: "#9BA4AD", borderRadius: 2, transform: `rotate(${T.flip > 4 && T.flip < 176 ? -32 : 0}deg)`, transformOrigin: "0% 50%" }} />
                {/* SET 4 · THE SELECT LAMP. amber, deliberately NOT colour-coded. */}
                <div style={{ position: "absolute", left: TURW / 2 - 34, top: 30, width: 12, height: 12, borderRadius: 6, background: `radial-gradient(circle at 40% 35%, rgba(255,214,132,${0.25 + lampStrobe}), #6B5220)`, boxShadow: `0 0 ${4 + lampStrobe * 16}px rgba(231,178,76,${0.25 + lampStrobe * 0.8})`, border: "1.5px solid #2A2318" }} />
                {/* the two-face block on its ratchet spindle */}
                <div style={{ position: "absolute", left: 0, top: 38, width: TURW, height: TUR_H - 38, transform: `perspective(700px) rotateX(${-T.flip}deg) scaleY(${dieSq})`, transformOrigin: "50% 50%" }}>
                  <div style={{ position: "absolute", inset: 0, background: IRON, borderRadius: 3, boxShadow: "0 10px 22px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.12)", transform: showV ? "rotateX(180deg)" : "none" }}>
                    <div style={{ position: "absolute", left: 6, top: 6, width: TURW - 12, height: 20, background: "linear-gradient(180deg,#5A636D,#333B44)", borderRadius: 2 }} />
                    <div style={{ position: "absolute", left: 8, top: 30, width: TURW - 16, height: TUR_H - 76, borderRadius: 3, background: showV ? T.col : "linear-gradient(180deg,#3B3733,#26231F)", boxShadow: showV ? `inset 0 0 16px rgba(0,0,0,0.45), 0 0 40px ${T.col}, 0 0 16px ${T.col}` : "inset 0 0 14px rgba(0,0,0,0.7)", border: `2px solid ${showV ? "rgba(0,0,0,0.35)" : "#191614"}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {showV ? (
                        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: "#12100E", textShadow: "0 1.5px 0 rgba(255,255,255,0.28)" }}>{T.v}</div>
                      ) : (
                        <>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={"rr" + i} style={{ position: "absolute", left: 4, top: 5 + i * 10, width: TURW - 24, height: 1.4, background: "rgba(255,255,255,0.05)" }} />
                          ))}
                          <div style={{ position: "absolute", left: 6, top: 6, width: 22, height: 8, background: "rgba(255,255,255,0.07)", filter: "blur(2px)" }} />
                        </>
                      )}
                      {inkLive && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.22), transparent 55%)", opacity: ramp(lf, 66, 76) }} />}
                    </div>
                    <div style={{ position: "absolute", left: -5, top: 8, width: 6, height: TUR_H - 50, background: "#4C555F", borderRadius: 2 }} />
                    <div style={{ position: "absolute", right: -5, top: 8, width: 6, height: TUR_H - 50, background: "#2A3038", borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* SET 22 · THE RE-INKING ROLLER. wets bare rubber the instant before the verdict prints. */}
          <div style={{ position: "absolute", left: inkX, top: inkY, width: 46, height: 20, zIndex: 18, transform: `rotate(${padRock}deg)`, transformOrigin: "50% 0%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 46, height: 14, borderRadius: 7, background: `conic-gradient(from ${lf * 22}deg, #2E2A26, #55504A, #2E2A26, #55504A, #2E2A26)`, boxShadow: "0 3px 7px rgba(0,0,0,0.7)" }} />
            <div style={{ position: "absolute", left: 18, top: -18, width: 10, height: 20, background: "#5C656E", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 4, top: 13, width: 38, height: 5, borderRadius: 3, background: "rgba(20,18,16,0.7)", filter: "blur(1px)" }} />
            {lf >= 100 && <div style={{ position: "absolute", left: 6, top: 16, width: 34, height: 8, borderRadius: 2, background: "linear-gradient(180deg,#39352F,#201D1A)", transform: `translateY(${Math.abs(padRock) * 0.5}px)` }} />}
          </div>

          {/* SET 5 · THE MEASURING PROBE. the only thing that touches either card, and it touches both the same way. */}
          {probeLive && (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 19 }}>
              <div style={{ position: "absolute", left: probeX - 5, top: 132, width: 10, height: Math.max(0, probeY - 132), background: "repeating-linear-gradient(180deg, #B9C2CA 0px, #B9C2CA 3px, #5C656E 3px, #5C656E 6px)", backgroundPositionY: `${probeSpin * 0.1}px`, boxShadow: "0 0 8px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: probeX - 22, top: 126, width: 44, height: 16, background: IRON, borderRadius: 2, boxShadow: "0 3px 8px rgba(0,0,0,0.7)" }} />
              <div style={{ position: "absolute", left: probeX - 20, top: probeY, width: 40, height: 30 }}>
                <div style={{ position: "absolute", left: 3, top: 0, width: 34, height: 18, borderRadius: 3, background: BRASS, boxShadow: "0 3px 8px rgba(0,0,0,0.7)" }} />
                <div style={{ position: "absolute", left: 12, top: 3, width: 16, height: 11, borderRadius: 6, background: "radial-gradient(circle at 40% 35%, rgba(190,240,255,0.9), rgba(30,60,80,0.9))", border: "1px solid #6E5427" }} />
                <div style={{ position: "absolute", left: 4 - jaw * 5, top: 16, width: 7, height: 15, background: "#C9B274", borderRadius: "0 0 2px 2px", transform: `rotate(${-jaw * 9}deg)`, transformOrigin: "50% 0%" }} />
                <div style={{ position: "absolute", left: 29 + jaw * 5, top: 16, width: 7, height: 15, background: "#C9B274", borderRadius: "0 0 2px 2px", transform: `rotate(${jaw * 9}deg)`, transformOrigin: "50% 0%" }} />
                <div style={{ position: "absolute", left: 16, top: 15, width: 8, height: 4, background: "#8A6A2E" }} />
              </div>
            </div>
          )}

          {/* ============ THE HERO ============ */}
          <div style={{ position: "absolute", left: hX - hSize / 2, top: hTop, width: hSize, height: hSize, zIndex: 20, transform: `scaleY(${hCrush}) translateY(${exhale * 2}px)`, transformOrigin: "50% 100%" }}>
            <Mascot lf={lf} size={hSize} gaze={hGaze} nodAmp={hNod} nodSpeed={hSpd} />
            {/* his kit rides his own hop */}
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${-hHop}px) scaleY(${hSq})`, transformOrigin: "50% 100%" }}>
              {[{ x: 39, i: 0 }, { x: 57.8, i: 1 }, { x: 93, i: 0 }, { x: 111.8, i: 1 }].map((L2, i) => (
                <div key={"hlg" + i} style={{ position: "absolute", left: L2.x, top: 109.5 - hLeg(L2.i), width: 12.8, height: 22, background: "linear-gradient(180deg,#3E5470,#2A3A4E)", borderRadius: 1 }} />
              ))}
              <div style={{ position: "absolute", left: 25.5, top: 76, width: 99, height: 34, background: "linear-gradient(180deg,#455C7A,#2F4058)", borderRadius: 2, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", left: 25.5, top: 100, width: 99, height: 4, background: "rgba(0,0,0,0.28)" }} />
              {[42, 96].map((sx, i) => (
                <div key={"str" + i} style={{ position: "absolute", left: sx, top: 58, width: 9, height: 20, background: "#455C7A" }}>
                  <div style={{ position: "absolute", left: 1, top: 15, width: 7, height: 6, borderRadius: 3, background: GOLD, boxShadow: "0 1px 2px rgba(0,0,0,0.6)" }} />
                </div>
              ))}
              {/* sleeves rolled */}
              {[6, 124].map((cx, i) => (
                <div key={"cf" + i} style={{ position: "absolute", left: cx, top: 62, width: 20, height: 8, background: "#5A7391", borderRadius: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
              ))}
              {/* honest grease smear */}
              <div style={{ position: "absolute", left: 66, top: 86, width: 22, height: 9, borderRadius: 5, background: "rgba(18,16,14,0.62)", transform: "rotate(-13deg)", filter: "blur(0.6px)" }} />
              <div style={{ position: "absolute", left: 88, top: 92, width: 11, height: 5, borderRadius: 3, background: "rgba(18,16,14,0.45)", transform: "rotate(9deg)" }} />
              {/* the L-plate: still velcroed on. it comes off ONLY at S7. */}
              <div style={{ position: "absolute", left: 32, top: 80, width: 24, height: 24, borderRadius: 3, background: PAPER, border: `2.5px solid ${RED}`, color: RED, fontFamily: fraunces.fontFamily, fontSize: 15, fontWeight: 900, lineHeight: "19px", textAlign: "center", boxShadow: "0 3px 6px rgba(0,0,0,0.5)", transform: `rotate(${-2 + Math.sin(lf * 0.2) * 0.8}deg)` }}>L</div>
            </div>
          </div>

          {/* ============ SET 24 · THE BLAST SHIELD. bed and dies ONLY. ============ */}
          {shieldDown && (
            <div style={{ position: "absolute", left: shieldX, top: shieldY, width: 514, height: 164, zIndex: 22, background: "linear-gradient(155deg, rgba(206,228,220,0.11), rgba(150,186,176,0.055))", border: "3px solid #39424B", borderRadius: 3, boxShadow: "0 12px 26px rgba(0,0,0,0.5), inset 0 0 26px rgba(210,240,230,0.06)", overflow: "hidden" }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const r = seed(i * 3.7 + 4);
                return <div key={"sc" + i} style={{ position: "absolute", left: r * 470, top: seed(i * 5.3) * 150, width: 20 + r * 74, height: 1.2, background: "rgba(255,255,255,0.2)", transform: `rotate(${-40 + r * 80}deg)` }} />;
              })}
              <div style={{ position: "absolute", left: 0, top: 0, width: 514, height: 40, background: "linear-gradient(180deg, rgba(255,255,255,0.14), transparent)" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: 164, background: "linear-gradient(90deg,#4C555F,#2A3038)" }} />
              {/* the dust ring splats against the INSIDE of the plexi */}
              {ring > 0 && (
                <div style={{ position: "absolute", left: 257 - ring * 240, top: 82 - ring * 78, width: ring * 480, height: ring * 156, borderRadius: "50%", border: `${Math.max(1, 9 - ring * 7)}px solid rgba(226,240,232,${Math.max(0, 0.5 - ring * 0.45)})`, filter: "blur(3px)" }} />
              )}
              {ring > 0 && Array.from({ length: 20 }).map((_, i) => {
                const a = (i / 20) * Math.PI * 2, d = ring * (110 + seed(i * 2.1) * 130);
                return <div key={"ds" + i} style={{ position: "absolute", left: 257 + Math.cos(a) * d, top: 82 + Math.sin(a) * d * 0.5, width: 3 + seed(i) * 5, height: 3 + seed(i) * 5, borderRadius: "50%", background: "rgba(226,240,232,0.5)", opacity: Math.max(0, 0.8 - ring), filter: "blur(1px)" }} />;
              })}
              <div style={{ position: "absolute", right: -2, top: 20, width: 8, height: 124, background: "#59626C" }} />
            </div>
          )}

          {/* HIS CARD, GLUED TO THE DIE BY WET INK, PEELING OFF IN A SLOW CURL */}
          {lf >= 92 && (
            <div style={{ position: "absolute", left: TURL + TURW / 2 - 60, top: dieBot - 5 + peel * 3, width: 120, height: 16, zIndex: 23, transform: `rotate(${curl * 26}deg)`, transformOrigin: "8% 0%" }}>
              <div style={{ position: "absolute", left: 14, top: 0, width: 96, height: 50 * partSq }}>
                <svg width="96" height={Math.max(2, 50 * partSq)} viewBox="0 0 96 50" preserveAspectRatio="none">{WRECK}</svg>
              </div>
              <div style={{ position: "absolute", left: 0, top: 50 * partSq, width: 120, height: 16, background: "linear-gradient(180deg,#CFC8B6,#8E8878)", borderRadius: 2, boxShadow: "0 6px 12px rgba(0,0,0,0.6)" }} />
              {verdict(RED, "FAIL", 50 * partSq - 13)}
              {/* wet ink strings */}
              {curl > 0 && Array.from({ length: 5 }).map((_, i) => (
                <div key={"ink" + i} style={{ position: "absolute", left: 22 + i * 19, top: -6, width: 1.6, height: curl * 12, background: "rgba(196,74,58,0.5)" }} />
              ))}
            </div>
          )}

          {/* THE EJECTED PASS CARD: crossing the lens, still travelling, his nub still open behind it */}
          {lf >= 98 && (
            <div style={{ position: "absolute", left: passX, top: passY, width: 120, height: 16, zIndex: lf >= 100 ? 46 : 23, transform: `rotate(${passR}deg) scale(${passS})`, transformOrigin: "50% 50%" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 120, height: 16, background: "linear-gradient(180deg,#EFE9D8,#A8A292)", borderRadius: 2, boxShadow: "0 10px 22px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: 20, top: -48 * partSq, width: 88, height: 48 * partSq }}>
                <svg width="88" height={Math.max(2, 48 * partSq)} viewBox="0 0 88 48" preserveAspectRatio="none">{PART}</svg>
              </div>
              {verdict(GREEN, "PASS", -13)}
            </div>
          )}

          {/* his nub: shoving · bed edge · flinch · FLAT ON THE PLEXI · reaching. in FRONT of the shield. */}
          {limb("hnub", hSh.x, hSh.y, nubTip.x, nubTip.y, 15, "linear-gradient(180deg,#E08C6C,#B85B3C)", 24)}
          <div style={{ position: "absolute", left: nubTip.x - 11, top: nubTip.y - 8, width: 22 + nubFlat * 8, height: 16 - nubFlat * 4, borderRadius: nubFlat ? 3 : 7, background: "#D97757", zIndex: 25, boxShadow: nubFlat ? "0 0 12px rgba(217,119,87,0.4)" : "0 3px 6px rgba(0,0,0,0.5)", transform: `rotate(${nubT === 5 ? -22 : 0}deg)` }} />
          {nubFlat > 0 && <div style={{ position: "absolute", left: nubTip.x - 20, top: nubTip.y - 16, width: 40, height: 32, borderRadius: 16, background: "radial-gradient(circle, rgba(226,244,236,0.3), transparent 68%)", zIndex: 25 }} />}

          {/* SET 28 · THE TIN BOT. an unremarked patrol layer. */}
          <div style={{ position: "absolute", left: botX, top: 660, zIndex: 26, transform: `scaleX(${botFace})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: -4, top: 56, width: 66, height: 10, borderRadius: 5, background: "rgba(0,0,0,0.5)", filter: "blur(3px)" }} />
            <Mascot lf={lf * 1.4} size={62} tint="#9AA4AD" hiVis={1} nodAmp={2.2} nodSpeed={3.4} />
            <div style={{ position: "absolute", left: 44, top: 22, width: 15, height: 15, borderRadius: 8, border: `3px solid ${GOLD}`, transform: `rotate(${lf * 9}deg)` }} />
            <div style={{ position: "absolute", left: 40, top: 28, width: 8, height: 3, background: GOLD }} />
            <div style={{ position: "absolute", left: 30, top: -12, width: 2, height: 20, background: "#B9C2CA" }} />
            <div style={{ position: "absolute", left: 32, top: -12, width: 11, height: 8, background: RED, transform: `skewY(${Math.sin(lf * 0.5) * 9}deg)` }} />
            <div style={{ position: "absolute", left: 16, top: 34, width: 9, height: 4, background: "#5C656E", borderRadius: 1 }} />
          </div>

          {/* ============ THE LEFT PIER: THE INTAKE SLOT + THE FLICKER ARM ============ */}
          <div style={{ position: "absolute", left: 130, top: 140, width: 98, height: 476, zIndex: 27, background: "linear-gradient(90deg,#39414A 0%,#59626C 30%,#2A3038 100%)", borderRadius: "3px 3px 0 0", boxShadow: "16px 0 34px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.1)" }}>
            <div style={{ position: "absolute", left: -8, top: -10, width: 114, height: 16, background: IRON, borderRadius: 2 }} />
            {[92, 250, 414].map((py, i) => (
              <div key={"pb" + i} style={{ position: "absolute", left: 8, top: py, width: 82, height: 3, background: "rgba(0,0,0,0.35)", boxShadow: "0 1px 0 rgba(255,255,255,0.07)" }} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={"pv" + i} style={{ position: "absolute", left: 12 + (i % 2) * 66, top: 100 + Math.floor(i / 2) * 130, width: 8, height: 8, borderRadius: 4, background: "radial-gradient(circle at 35% 30%,#8B939B,#22272E)" }} />
            ))}
          </div>
          {/* SET 16 · THE INTAKE SLOT. a bill validator. every viewer's body already knows what it is about to do. */}
          <div style={{ position: "absolute", left: SLOT.x, top: SLOT.y, width: SLOT.w, height: SLOT.h, zIndex: 28 }}>
            <div style={{ position: "absolute", left: -6, top: -6, width: SLOT.w + 12, height: SLOT.h + 12, borderRadius: 4, background: BRASS, boxShadow: "0 5px 12px rgba(0,0,0,0.7), inset 0 2px 3px rgba(255,255,255,0.5)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "linear-gradient(180deg,#0B0E10,#191E22)", boxShadow: "inset 0 4px 10px rgba(0,0,0,0.95)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 6, top: 13, width: SLOT.w - 12, height: 11, borderRadius: 6, background: "repeating-linear-gradient(90deg,#2C2926 0px,#2C2926 5px,#4E4A45 5px,#4E4A45 10px)", backgroundPositionX: `${roller}px`, boxShadow: "0 2px 4px rgba(0,0,0,0.8)" }} />
              <div style={{ position: "absolute", left: 4, top: 4, width: SLOT.w - 8, height: 5, background: "rgba(0,0,0,0.85)" }} />
              {/* the counterfeit-pen scan bar */}
              {scan > 0 && <div style={{ position: "absolute", left: 2, top: 2 + scan * (SLOT.h - 8), width: SLOT.w - 4, height: 4, background: FAKE, boxShadow: `0 0 12px ${FAKE}`, opacity: 0.9 }} />}
              {spit > 0 && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 100%, rgba(168,184,74,${spit * 0.5}), transparent 70%)` }} />}
            </div>
            <div style={{ position: "absolute", left: 0, top: -14, width: SLOT.w, height: 6, background: "#8A6A2E", borderRadius: 2 }} />
          </div>
          {/* the puff of ink dust on the spit */}
          {spit > 0.02 && Array.from({ length: 10 }).map((_, i) => {
            const r = seed(i * 3.3 + 5);
            return <div key={"pf" + i} style={{ position: "absolute", left: SLOT.x + 30 + (r - 0.5) * 60 * (1 - spit), top: SLOT.y + 44 + (1 - spit) * 26, width: 4 + r * 8, height: 4 + r * 8, borderRadius: "50%", background: FAKE, opacity: spit * 0.4 * (1 - r * 0.5), filter: "blur(3px)", zIndex: 29 }} />;
          })}
          {/* SET 17 · THE FLICKER ARM. a spring-loaded steel finger. re-cocks from f100, still travelling at f106. */}
          <div style={{ position: "absolute", left: 138, top: 424, width: 82, height: 14, zIndex: 29, transform: `rotate(${flickRot}deg)`, transformOrigin: "7px 7px" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: 14, borderRadius: 7, background: BRASS, boxShadow: "0 2px 5px rgba(0,0,0,0.7)" }} />
            <div style={{ position: "absolute", left: 8, top: 4, width: 68, height: 6, borderRadius: 3, background: "linear-gradient(90deg,#8B939B,#DDE4E9 40%,#4C555F)", boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", left: 72, top: 1, width: 9, height: 12, borderRadius: 2, background: "#B9C2CA" }} />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={"sp" + i} style={{ position: "absolute", left: 12 + i * 4, top: -4, width: 3, height: 8, background: "#6E7681", transform: `skewX(${-22 + armOut * 30}deg)` }} />
            ))}
          </div>

          {/* THE STICKER OFF THE SPOOL */}
          {stVis && (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 30 }}>
              <DoneSticker x={stX} y={stY} s={0.42} rot={stRot} />
            </div>
          )}

          {/* ============ SET 29 · HIS AURA. it arrives WITH him at f14 and stutters at f90. ============ */}
          {rainOn > 0 && (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 31 }}>
              <CodeRain lf={vLf} x={124} y={300} h={300} cols={2} o={rainOn * 0.75} gap={16} />
              <CodeRain lf={vLf + 23} x={246} y={330} h={280} cols={2} o={rainOn * 0.7} gap={15} />
            </div>
          )}

          {/* ============ THE VILLAIN: AGENT DONE ============ */}
          <div style={{ position: "absolute", left: vX - vSize / 2, top: vTop, width: vSize, height: vSize, zIndex: 32, transform: `rotate(${vBodyRot}deg) scaleY(${vCrush})`, transformOrigin: "50% 100%" }}>
            <Villain lf={vLf} size={vSize} nodAmp={vNod} nodSpeed={vSpd} rain={rainOn} />
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${-vHop}px) scaleY(${vSq})`, transformOrigin: "50% 100%", zIndex: 3 }}>
              {/* the S3 collar ink: he wears his own lie */}
              <div style={{ position: "absolute", left: 62, top: 86, width: 18, height: 13, background: FAKE, opacity: 0.85, borderRadius: 3, transform: "rotate(-9deg)", filter: "blur(0.4px)" }} />
              <div style={{ position: "absolute", left: 74, top: 96, width: 9, height: 16, background: FAKE, opacity: 0.6, borderRadius: 3 }} />
              <div style={{ position: "absolute", left: 58, top: 98, width: 6, height: 5, background: FAKE, opacity: 0.5, borderRadius: 2 }} />
              {/* the black cord + laminated licence, planted here for S7 to revoke */}
              <div style={{ position: "absolute", left: 56, top: 78, width: 3, height: 30, background: "#12141A", transform: "rotate(11deg)", transformOrigin: "50% 0%" }} />
              <div style={{ position: "absolute", left: 108, top: 78, width: 3, height: 30, background: "#12141A", transform: "rotate(-11deg)", transformOrigin: "50% 0%" }} />
              <div style={{ position: "absolute", left: 62, top: 104, width: 44, height: 30, borderRadius: 4, background: "linear-gradient(160deg,#EFEADC,#BFB9A8)", border: "1px solid rgba(20,22,28,0.5)", boxShadow: "0 3px 6px rgba(0,0,0,0.55)", transform: `rotate(${-3 + Math.sin(lf * 0.24) * 2}deg)` }}>
                <div style={{ position: "absolute", left: 3, top: 3, width: 10, height: 12, borderRadius: 1, background: VILL }} />
                <div style={{ position: "absolute", left: 16, top: 4, width: 24, height: 2, background: "rgba(30,32,38,0.5)" }} />
                <div style={{ position: "absolute", left: 16, top: 9, width: 17, height: 2, background: "rgba(30,32,38,0.35)" }} />
                <div style={{ position: "absolute", left: 16, top: 14, width: 21, height: 2, background: "rgba(30,32,38,0.3)" }} />
                <div style={{ position: "absolute", left: 3, top: 19, width: 12, height: 8, borderRadius: 1, background: BRASS, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }} />
                <div style={{ position: "absolute", left: 18, top: 20, width: 22, height: 6, background: "repeating-linear-gradient(90deg,#2A2E36 0px,#2A2E36 1px,transparent 1px,transparent 3px)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 44, height: 30, borderRadius: 4, background: "linear-gradient(140deg, rgba(255,255,255,0.4), transparent 45%)" }} />
              </div>
              {/* THE GUN, carrying S3's fracture: split head, spring out, wire-bound barrel, dried pad, jammed counter. IT CANNOT ISSUE. */}
              <div style={{ position: "absolute", left: 128, top: 74 - gunWave * 16, width: 58, height: 46, transform: `rotate(${-14 - gunWave * 34}deg)`, transformOrigin: "10% 60%" }}>
                <div style={{ position: "absolute", left: 4, top: 14, width: 34, height: 24, borderRadius: 3, background: "linear-gradient(180deg,#3A414B,#191D23)", boxShadow: "0 3px 6px rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", left: 8, top: 34, width: 11, height: 14, borderRadius: 2, background: "#22272E", transform: "rotate(9deg)" }} />
                <div style={{ position: "absolute", left: 32, top: 8, width: 20, height: 15, background: "#4A525C", borderRadius: 2, transform: "rotate(-13deg)" }} />
                <div style={{ position: "absolute", left: 34, top: 20, width: 18, height: 11, background: "#2E343C", borderRadius: 2, transform: "rotate(11deg)" }} />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={"gs" + i} style={{ position: "absolute", left: 40 + i * 3, top: 2 + i * 1.5, width: 8, height: 2.4, borderRadius: 2, background: "#9BA4AD", transform: `rotate(${-30 + i * 9 + Math.sin(lf * 0.3 + i) * 3}deg)` }} />
                ))}
                <div style={{ position: "absolute", left: 22, top: 12, width: 5, height: 26, background: "#8B939B", borderRadius: 2, transform: "rotate(7deg)" }} />
                <div style={{ position: "absolute", left: 28, top: 11, width: 4, height: 27, background: "#7E878F", borderRadius: 2, transform: "rotate(-6deg)" }} />
                <div style={{ position: "absolute", left: 18, top: 18, width: 16, height: 9, background: "#B7A98A", opacity: 0.85, transform: "rotate(-8deg)" }} />
                <div style={{ position: "absolute", left: 6, top: 10, width: 24, height: 6, borderRadius: 2, background: "linear-gradient(90deg,#6E7A28,#98A83E)", opacity: 0.75 }} />
                <div style={{ position: "absolute", left: 10, top: 11, width: 14, height: 1.2, background: "rgba(20,24,8,0.7)" }} />
                <div style={{ position: "absolute", left: 12, top: 15, width: 4, height: 4 + inkDrip * 9, borderRadius: 2, background: FAKE, opacity: 0.85 - inkDrip * 0.3 }} />
                <div style={{ position: "absolute", left: 6, top: 20, width: 15, height: 9, borderRadius: 1, background: BRASS, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}>
                  <div style={{ position: "absolute", left: 2, top: 3.5, width: 11, height: 2, background: "rgba(20,16,8,0.65)" }} />
                </div>
                {/* the spool of die-cut DONE stickers */}
                <div style={{ position: "absolute", left: -6, top: 16, width: 20, height: 20, borderRadius: 10, background: `conic-gradient(from ${-lf * 0.6}deg, ${FAKE}, #8FA03C, ${FAKE})`, border: "2px solid rgba(50,58,18,0.6)", boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", left: 0, top: 24, width: 8, height: 4, background: "#3A4114", borderRadius: 2 }} />
              </div>
            </div>
          </div>
          {/* his reaching nub: up to the slot, then EMPTY, held two beats too long */}
          {armUp > 0.02 && (() => {
            const tip = { x: interpolate(armUp, [0, 1], [vSh.x - 10, SLOT.x + 34]), y: interpolate(armUp, [0, 1], [vSh.y + 10, SLOT.y + 42]) };
            return (
              <>
                {limb("varm", vSh.x, vSh.y, tip.x, tip.y, 16, "linear-gradient(180deg,#7C848F,#4E555F)", 33)}
                <div style={{ position: "absolute", left: tip.x - 11, top: tip.y - 10, width: 22, height: 19, borderRadius: 7, background: VILL, zIndex: 34, boxShadow: "0 3px 6px rgba(0,0,0,0.55)" }} />
                <div style={{ position: "absolute", left: tip.x - 13, top: tip.y - 13, width: 26, height: 9, borderRadius: 3, background: "#15171C", zIndex: 34 }} />
              </>
            );
          })()}
          {/* THE CRACK races ALONG his own glint bar. it reveals only more black. */}
          {crack > 0 && (
            <div style={{ position: "absolute", left: vX - vSize / 2, top: vTop, width: vSize, height: vSize, zIndex: 35, transform: `rotate(${vBodyRot}deg) translateY(${-vHop}px)`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
              <svg width={vSize} height={vSize} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
                <g opacity={crack}>
                  <path d={`M54 69 L${54 + crack * 34} ${69 + crack * 2}`} stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
                  <path d={`M62 70 L${62 + crack * 16} ${70 - crack * 7} M66 70 L${66 + crack * 13} ${70 + crack * 9} M74 71 L${74 + crack * 11} ${71 - crack * 6} M78 71 L${78 + crack * 9} ${71 + crack * 8}`} stroke="#E8F2FF" strokeWidth="1.1" fill="none" opacity={0.9} />
                  <path d={`M58 66 L${58 + crack * 22} ${66 + crack * 12} L${58 + crack * 12} ${66 + crack * 20}`} stroke="#FFFFFF" strokeWidth="0.9" fill="none" opacity={0.7} />
                  <circle cx="55" cy="69" r={1.4 + crack * 1.2} fill="#FFFFFF" />
                </g>
                {crack2 > 0 && (
                  <g opacity={crack2}>
                    <path d={`M116 68 L${116 + crack2 * 20} ${68 + crack2 * 4}`} stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
                    <path d={`M120 68 L${120 + crack2 * 9} ${68 - crack2 * 6}`} stroke="#E8F2FF" strokeWidth="1" fill="none" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* ============ SET 18 · THE REJECT BIN. this shift's. dropped to the dimmer background tier. ============ */}
          <div style={{ position: "absolute", left: 118, top: 656, width: 130, height: 92, zIndex: 36, opacity: 0.66, filter: "blur(1.3px) brightness(0.8)" }}>
            <div style={{ position: "absolute", left: 2, top: -8 - lidClap * 9, width: 126, height: 10, background: "linear-gradient(180deg,#6E7681,#333A42)", borderRadius: 2, transform: `rotate(${-lidClap * 15}deg)`, transformOrigin: "0% 100%", boxShadow: "0 3px 7px rgba(0,0,0,0.6)", zIndex: 4 }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 130, height: 92, background: "linear-gradient(180deg, rgba(58,66,75,0.9), rgba(24,29,35,0.95))", border: "3px solid #4C555F", borderRadius: "3px 3px 6px 6px", boxShadow: "0 14px 30px rgba(0,0,0,0.75), inset 0 3px 10px rgba(0,0,0,0.6)", overflow: "hidden" }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={"mv" + i} style={{ position: "absolute", left: i * 15, top: 0, width: 1.4, height: 92, background: "rgba(140,152,166,0.4)" }} />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={"mh" + i} style={{ position: "absolute", left: 0, top: i * 14, width: 130, height: 1.4, background: "rgba(140,152,166,0.32)" }} />
              ))}
              {/* the stencilled crossed-out-note emblem on its flank */}
              <div style={{ position: "absolute", left: 82, top: 54, width: 38, height: 26, border: "2.5px solid rgba(226,178,60,0.5)", borderRadius: 2 }}>
                <div style={{ position: "absolute", left: 12, top: 8, width: 14, height: 10, border: "2px solid rgba(226,178,60,0.45)", borderRadius: 5 }} />
              </div>
              <div style={{ position: "absolute", left: 80, top: 52, width: 44, height: 3, background: "rgba(226,178,60,0.6)", transform: "rotate(31deg)", transformOrigin: "0% 50%" }} />
            </div>
            {/* THE HEAP: crumpled identical DONE stickers. every self-issued DONE the OS has eaten this shift. */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 130, height: 92, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: heapSettle, width: 130, height: 92 }}>
                {Array.from({ length: 15 }).map((_, i) => {
                  const r = seed(i * 2.7 + 1), r2 = seed(i * 4.1 + 6);
                  return (
                    <div key={"hp" + i} style={{ position: "absolute", left: -4 + r * 108, top: 8 + r2 * 62, transform: `rotate(${-50 + r2 * 100}deg) skewX(${-16 + r * 32}deg) scaleY(${0.55 + r * 0.4})` }}>
                      <DoneSticker x={0} y={0} s={0.3 + r * 0.08} rot={0} o={0.9} />
                    </div>
                  );
                })}
                {/* the clerestory bounce rakes a hard rim across the heap */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 130, height: 44, background: "linear-gradient(180deg, rgba(240,255,246,0.3), transparent)" }} />
              </div>
            </div>
          </div>
          {/* the heap SETTLES and spills identical stickers across the tile at his feet */}
          {spillT > 0 && [0, 1, 2, 3].map((i) => {
            const r = seed(i * 6.1 + 2);
            const t = Math.max(0, Math.min(1, (spillT * 8 - i * 1.1) / 3));
            if (t <= 0) return null;
            const rock = t >= 1 ? Math.sin(lf * 0.4 + i * 2) * 2.4 * Math.max(0, 1 - (lf - 58) / 60) : 0;
            return (
              <div key={"sp2" + i} style={{ position: "absolute", left: 0, top: 0, zIndex: 35 }}>
                <DoneSticker x={240 + t * (14 + i * 38)} y={662 + Math.sin(t * Math.PI) * -18 + t * 26} s={0.3} rot={-40 + r * 80 + t * 180 + rock} o={0.95} />
              </div>
            );
          })}

          {/* ============ CAMEO 1 · SET 21 · THE RE-COCK LEVER. dead f0-f92. janitorial. ============ */}
          <div style={{ position: "absolute", left: 946, top: 396, width: 12, height: 12, zIndex: 37 }}>
            <div style={{ position: "absolute", left: -46, top: 30, width: 54, height: 12, zIndex: -1, background: "repeating-linear-gradient(90deg,#59626C 0px,#59626C 4px,#2A3038 4px,#2A3038 9px)", transform: "rotate(-16deg)", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: -8, top: -8, width: 28, height: 28, borderRadius: 14, background: IRON, boxShadow: "0 4px 10px rgba(0,0,0,0.7)" }} />
            <div style={{ position: "absolute", left: -2, top: -2, width: 16, height: 16, borderRadius: 8, background: BRASS }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: 162, transform: `rotate(${haul}deg)`, transformOrigin: "6.5px 6px" }}>
              <div style={{ position: "absolute", left: 0, top: 4, width: 13, height: 132, background: "linear-gradient(90deg,#4C555F,#B9C2CA 42%,#3A424B)", borderRadius: 5, boxShadow: "0 4px 10px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: -3, top: 128, width: 19, height: 32, borderRadius: 8, background: "linear-gradient(180deg,#D8503C,#8E2B1E)", boxShadow: "0 4px 9px rgba(0,0,0,0.7), inset 0 3px 5px rgba(255,255,255,0.28)" }} />
              <div style={{ position: "absolute", left: 1, top: 132, width: 8, height: 12, borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: oCx - oSize / 2, top: oFeet - oSize, width: oSize, height: oSize, zIndex: 38 }}>
            <div style={{ position: "absolute", left: 18, top: oSize - 10, width: 140, height: 16, borderRadius: 8, background: "rgba(0,0,0,0.55)", filter: "blur(6px)" }} />
            <Mascot lf={lf} size={oSize} gaze={-2} nodAmp={1.4} nodSpeed={4.8} hardHat={1} />
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${-oHop}px)`, transformOrigin: "50% 100%" }}>
              {[20, 138].map((ex, i) => (
                <div key={"ed" + i} style={{ position: "absolute", left: ex, top: 52, width: 20, height: 28, borderRadius: 6, background: "linear-gradient(180deg,#C4452F,#7C2416)", border: "2px solid rgba(20,16,14,0.5)", boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }} />
              ))}
              <div style={{ position: "absolute", left: 34, top: 40, width: 108, height: 7, borderRadius: 4, background: "#2A2E36" }} />
              {/* ink-stained sleeve garter */}
              <div style={{ position: "absolute", left: 4, top: 70, width: 24, height: 9, background: "#3A4148", borderRadius: 2 }}>
                <div style={{ position: "absolute", left: 3, top: 2, width: 12, height: 5, background: FAKE, opacity: 0.55, borderRadius: 2 }} />
              </div>
              <div style={{ position: "absolute", left: 148, top: 70, width: 24, height: 9, background: "#3A4148", borderRadius: 2 }} />
            </div>
          </div>
          {/* his nubs: on the dead lever · BOTH BEHIND HIS BACK for the whole grade · hauling the re-cock */}
          {oPose !== 1 && limb("oarm", oSh.x, oSh.y, oGrip.x, oGrip.y, 17, "linear-gradient(180deg,#E08C6C,#B85B3C)", 39)}
          {oPose !== 1 && <div style={{ position: "absolute", left: oGrip.x - 11, top: oGrip.y - 9, width: 22, height: 18, borderRadius: 7, background: "#D97757", zIndex: 40, boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />}
          {oPose === 1 && [0, 1].map((i) => (
            <div key={"bh" + i} style={{ position: "absolute", left: oCx - 16 + i * 20, top: oFeet - oSize + 108 - oHop, width: 20, height: 15, borderRadius: 7, background: "#B85B3C", zIndex: 37, boxShadow: "inset 0 -3px 5px rgba(0,0,0,0.35)" }} />
          ))}

          {/* ============ FOREGROUND ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 44, pointerEvents: "none", transform: `scale(${1 + (push - 1) * 1.9})`, transformOrigin: "500px 545px" }}>
            {/* the near-left press column: x 0-110, dark, 2px soft. nothing the scene needs lives behind it. */}
            <div style={{ position: "absolute", left: -14, top: -30, width: 124, height: 860, background: "linear-gradient(90deg,#0A0D0F 0%,#1D242A 42%,#2E373E 66%,#080A0C 100%)", filter: "blur(2px)", boxShadow: "26px 0 60px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "absolute", left: 0, top: 300, width: 124, height: 30, background: "linear-gradient(180deg,#39424B,#1A1F24)" }} />
              <div style={{ position: "absolute", left: 0, top: 306, width: 124, height: 6, background: "rgba(30,22,10,0.7)" }} />
              <div style={{ position: "absolute", left: 0, top: 620, width: 124, height: 28, background: "linear-gradient(180deg,#39424B,#1A1F24)" }} />
              <div style={{ position: "absolute", left: 88, top: 0, width: 10, height: 860, background: "rgba(150,168,180,0.09)" }} />
            </div>
            {/* ink dust crossing the lens */}
            {Array.from({ length: 12 }).map((_, i) => {
              const r = seed(i * 7.3 + 3), r2 = seed(i * 1.9 + 8);
              return <div key={"ld" + i} style={{ position: "absolute", left: 60 + r2 * 900 + Math.sin(lf * 0.06 + i) * 26, top: ((r * 900 + lf * (1.5 + r2 * 2.6)) % 900) - 40, width: 5 + r * 11, height: 5 + r * 11, borderRadius: "50%", background: i % 4 === 0 ? "rgba(168,184,74,0.16)" : "rgba(226,240,232,0.16)", filter: "blur(3.5px)", opacity: 0.5 + r * 0.4 }} />;
            })}
            {/* the BOOM blows dust across the lens */}
            {lf >= 88 && Array.from({ length: 14 }).map((_, i) => {
              const r = seed(i * 2.3 + 9), t = ramp(lf, 88, 88 + 14 + r * 10);
              return <div key={"bl" + i} style={{ position: "absolute", left: 500 + (r - 0.5) * 1000 * t, top: 520 - t * (120 + r * 220), width: 10 + r * 26, height: 10 + r * 26, borderRadius: "50%", background: "rgba(226,240,232,0.2)", filter: "blur(6px)", opacity: (1 - t) * 0.8 }} />;
            })}
          </div>

          <div style={{ position: "absolute", inset: 0, zIndex: 45, pointerEvents: "none", boxShadow: "inset 0 0 190px rgba(4,12,10,0.8)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 45, pointerEvents: "none", background: `rgba(240,255,248,${shaftHot * 0.28})` }} />
        </div>
      </div>
    </Panel>
  );
};

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  const f = lf;

  /* ================= THE TRUCK: one full lane right, triggered by the f152 THUD ================= */
  const T = interpolate(f, [152, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const lp = (a: number, b: number) => a + (b - a) * T;     // FG/MG: composed per phase (the truck is a swing, not a slide)
  const wx = -460 * T;                                      // ground world layer (floor, queue, flapboard)
  const roofX = -175 * T;                                   // lamps        0.38
  const hazeX = -253 * T;                                   // haze band    0.55
  const bracX = -331 * T;                                   // roof bracing 0.72
  const mb = Math.sin(Math.min(1, Math.max(0, T)) * Math.PI) * 6;   // truck motion blur
  const hang = f >= 172 && f < 176;                         // the only silence in 217 frames

  /* ================= CAMERA ================= */
  const shud = f >= 104 && f < 118 ? Math.sin((f - 104) * 2.4) * Math.max(0, 2.2 - (f - 104) * 0.16) : 0;      // gate motor
  const swB = f >= 198 && f < 212 ? Math.sin((f - 198) * 1.9) * Math.max(0, 3.2 - (f - 198) * 0.24) : 0;       // throat swallow
  const dolly = interpolate(f, [202, 206, 210, 214], [0, -0.024, 0.018, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const trem = hang || f < 176 ? 0 : ramp(f, 176, 206) * 3;
  const camS = 1 + over(f, 0, 96, Easing.inOut(Easing.quad)) * 0.06 + T * 0.03 + over(f, 168, 48, Easing.inOut(Easing.quad)) * 0.04 + dolly;
  const camX = Math.sin(f * 0.031 + 2) * 2.2 + trem * Math.sin(f * 2.9) + shud;
  const camY = -over(f, 96, 56, Easing.inOut(Easing.quad)) * 40 + Math.sin(f * 0.045) * 2.4 + trem * 0.7 * Math.sin(f * 3.7 + 1.1) + shud * 0.5;

  /* ================= L-PUNCH: 8 arriving PASS sheets drive 8 punches. He never touches it. ================= */
  const PUNCH = [10, 26, 40, 52, 63, 73, 82, 90];
  const CHUNK = [0, 22, 36, 48, 59, 69, 78, 86];
  let hIdx = 12;
  PUNCH.forEach((t, k) => { if (k < 7) hIdx += ramp(f, t + 2, t + 6); });   // ratchets right after every punch
  const headX = 344 + (hIdx - 10) * 15;
  let drive = 0;
  PUNCH.forEach((t) => {
    const d = f >= t - 4 && f <= t ? over(f, t - 4, 4, Easing.in(Easing.quad)) : f > t && f < t + 5 ? 1 - over(f, t, 5, Easing.out(Easing.cubic)) : 0;
    if (d > drive) drive = d;
  });
  const headY = 410 + drive * 71;
  const chase = f >= 92 && f <= 101 ? 1 : 0;
  const holeLit = (i: number) => (i < 12 ? 1 : f >= PUNCH[i - 12] ? 1 : 0);
  const holeFlare = (i: number) => {
    const t = i < 12 ? -999 : PUNCH[i - 12];
    return Math.max(Math.max(0, 1 - Math.abs(f - t) / 8), chase * Math.max(0, 1 - Math.abs(f - (92 + i * 0.3)) / 2.6));
  };

  /* ================= L-GAUGE: the scene's only number ================= */
  let hv = 91;
  PUNCH.forEach((t) => { hv += ramp(f, t, t + 3) * 0.42; });               // climbs a hair per punch
  hv += ramp(f, 93, 96) * 2.64 - ramp(f, 96, 104) * 2.0;                   // overshoots 97, settles 95
  hv += Math.sin(f * 0.9) * 0.075 + Math.sin(f * 2.2 + 1.3) * 0.035;       // never stops wobbling

  const FT = [152, 158, 164, 168, 172];                                    // five red sheets, five notches
  let vv = 95;
  FT.forEach((t) => { vv -= ramp(f, t, t + 1.5); });                       // kicked down ON the impact frame
  vv -= ramp(f, 176, 216) * 2;                                             // slips under and never settles: 88 at f216
  if (!hang) vv += Math.sin(f * 0.85 + 2.1) * 0.07 + Math.sin(f * 2.05) * 0.03;

  const gAng = (v: number) => interpolate(v, [84, 100], [-125, 125], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const px = (cx: number, cy: number, r: number, a: number) => cx + r * Math.sin((a * Math.PI) / 180);
  const py = (cx: number, cy: number, r: number, a: number) => cy - r * Math.cos((a * Math.PI) / 180);

  const bloom = ramp(f, 132, 140) * (1 - ramp(f, 168, 176));               // dawn washes the printed 90 and 95
  const strobe = f >= 176 ? ((f - 176) % 6 < 3 ? 1 : 0.15) : 0;            // first strobe frame is f176. Nothing touched him above 90.

  /* ---- the two dials are the same make: same face, same arc, same filed 90 notch, same two numerals ---- */
  const dial = (cx: number, cy: number, R: number, v: number, tag: string, warm: number, red: number) => {
    const a = gAng(v);
    return (
      <g>
        <ellipse cx={cx + 5} cy={cy + 7} rx={R} ry={R} fill="#000" opacity={0.4} />
        <circle cx={cx} cy={cy} r={R} fill="#23211f" stroke="#0c0b0b" strokeWidth={3.4} />
        <circle cx={cx} cy={cy} r={R - 5} fill="none" stroke="#514b42" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={R - 11} fill="#e9e3d3" />
        <circle cx={cx} cy={cy} r={R - 11} fill={`url(#s7dsh)`} />
        {/* red arc, painted from the 90 notch downward */}
        <path
          d={`M ${px(cx, cy, R - 19, -125)} ${py(cx, cy, R - 19, -125)} A ${R - 19} ${R - 19} 0 0 1 ${px(cx, cy, R - 19, -31.25)} ${py(cx, cy, R - 19, -31.25)}`}
          fill="none" stroke={RED} strokeWidth={R * 0.1} opacity={0.5 + red * 0.45}
        />
        {/* printed scale */}
        {Array.from({ length: 17 }).map((_, i) => {
          const val = 84 + i;
          const aa = gAng(val);
          const maj = val % 5 === 0;
          return <line key={`${tag}t${i}`} x1={px(cx, cy, R - 12, aa)} y1={py(cx, cy, R - 12, aa)} x2={px(cx, cy, R - (maj ? 26 : 19), aa)} y2={py(cx, cy, R - (maj ? 26 : 19), aa)} stroke="#3a352d" strokeWidth={maj ? 2.4 : 1.1} />;
        })}
        {/* ONE hard filed notch, AT 90 */}
        <line x1={px(cx, cy, R - 10, -31.25)} y1={py(cx, cy, R - 10, -31.25)} x2={px(cx, cy, R - 34, -31.25)} y2={py(cx, cy, R - 34, -31.25)} stroke="#151312" strokeWidth={3.6} />
        <line x1={px(cx, cy, R - 10, -31.25)} y1={py(cx, cy, R - 10, -31.25)} x2={px(cx, cy, R - 34, -31.25)} y2={py(cx, cy, R - 34, -31.25)} stroke="#c9c2ae" strokeWidth={1.2} />
        {/* the gold notch, AT 95 */}
        <line x1={px(cx, cy, R - 10, 46.9)} y1={py(cx, cy, R - 10, 46.9)} x2={px(cx, cy, R - 30, 46.9)} y2={py(cx, cy, R - 30, 46.9)} stroke={GOLD} strokeWidth={3} />
        {/* exactly TWO engraved numerals on the whole face */}
        <text x={px(cx, cy, R - 36, -45)} y={py(cx, cy, R - 36, -45) + 4} textAnchor="middle" fontFamily={mono} fontSize={R * 0.19} fontWeight={700} fill="#2c2822">90</text>
        <text x={px(cx, cy, R - 36, 61)} y={py(cx, cy, R - 36, 61) + 4} textAnchor="middle" fontFamily={mono} fontSize={R * 0.19} fontWeight={700} fill="#2c2822">95</text>
        {/* dead moth in the bottom of the bezel */}
        <g transform={`translate(${cx - R * 0.1} ${cy + R * 0.72}) rotate(14)`} opacity={0.7}>
          <ellipse rx={R * 0.055} ry={R * 0.02} fill="#4a4238" />
          <ellipse cx={-R * 0.04} cy={-R * 0.03} rx={R * 0.05} ry={R * 0.028} fill="#6b6153" transform="rotate(-30)" />
          <ellipse cx={R * 0.04} cy={-R * 0.03} rx={R * 0.05} ry={R * 0.028} fill="#6b6153" transform="rotate(30)" />
        </g>
        {/* gold needle + counterweight tail */}
        <line x1={px(cx, cy, -R * 0.2, a)} y1={py(cx, cy, -R * 0.2, a)} x2={px(cx, cy, R * 0.8, a)} y2={py(cx, cy, R * 0.8, a)} stroke={GOLD} strokeWidth={R * 0.05} strokeLinecap="round" />
        <circle cx={px(cx, cy, -R * 0.2, a)} cy={py(cx, cy, -R * 0.2, a)} r={R * 0.06} fill={AMBER} />
        <circle cx={cx} cy={cy} r={R * 0.09} fill="#2a2318" stroke={GOLD} strokeWidth={1.4} />
        {/* cracked glass, chip at 4 o'clock */}
        <circle cx={cx} cy={cy} r={R - 8} fill={`url(#s7glass)`} opacity={0.5} />
        <line x1={px(cx, cy, R - 9, 118)} y1={py(cx, cy, R - 9, 118)} x2={cx - R * 0.16} y2={cy - R * 0.1} stroke="rgba(255,255,255,0.6)" strokeWidth={1} />
        <line x1={px(cx, cy, R - 9, 118)} y1={py(cx, cy, R - 9, 118)} x2={cx + R * 0.3} y2={cy - R * 0.45} stroke="rgba(255,255,255,0.4)" strokeWidth={0.8} />
        <polygon points={`${px(cx, cy, R - 9, 112)},${py(cx, cy, R - 9, 112)} ${px(cx, cy, R - 9, 128)},${py(cx, cy, R - 9, 128)} ${px(cx, cy, R - 26, 121)},${py(cx, cy, R - 26, 121)}`} fill="rgba(255,255,255,0.5)" />
        {warm > 0 && <circle cx={cx} cy={cy} r={R} fill={`url(#s7bloom)`} opacity={warm * 0.85} />}
        {red > 0 && <circle cx={cx} cy={cy} r={R} fill={RED} opacity={red * 0.16} />}
      </g>
    );
  };

  /* ================= THE AUTONOMY LICENCE (loyalty punch card) ================= */
  const cardFace = (ox: number, oy: number, allLit: boolean) => (
    <g>
      <rect x={ox} y={oy} width={164} height={112} rx={7} fill={`url(#s7lam)`} stroke="#b9b09a" strokeWidth={1.6} />
      <rect x={ox} y={oy} width={164} height={22} rx={7} fill="rgba(58,92,132,0.20)" />
      <text x={ox + 8} y={oy + 15} fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={9} letterSpacing="1.2" fill={INK}>AUTONOMY LICENCE</text>
      <rect x={ox + 8} y={oy + 28} width={26} height={26} rx={4} fill="rgba(58,92,132,0.22)" stroke="rgba(26,24,19,0.3)" strokeWidth={1} />
      <circle cx={ox + 21} cy={oy + 42} r={8} fill={allLit ? VILL : CLAY} />
      <rect x={ox + 17} y={oy + 39} width={3} height={4} fill={INK} />
      <rect x={ox + 23} y={oy + 39} width={3} height={4} fill={INK} />
      <rect x={ox + 42} y={oy + 30} width={54} height={4} rx={2} fill="rgba(26,24,19,0.24)" />
      <rect x={ox + 42} y={oy + 38} width={40} height={4} rx={2} fill="rgba(26,24,19,0.16)" />
      <rect x={ox + 42} y={oy + 46} width={48} height={4} rx={2} fill="rgba(26,24,19,0.16)" />
      <rect x={ox + 130} y={oy + 26} width={26} height={22} rx={3} fill={`url(#s7foil)`} opacity={0.7 + 0.2 * Math.sin(f * 0.14)} stroke="rgba(255,255,255,0.55)" strokeWidth={0.8} />
      {Array.from({ length: 20 }).map((_, i) => {
        const on = allLit ? 1 : holeLit(i);
        const fl = allLit ? 0 : holeFlare(i);
        const hx = ox + 26 + (i % 10) * 15;
        const hy = oy + (i < 10 ? 42 : 72);
        return (
          <g key={`h${i}`} transform={`translate(${hx} ${hy}) scale(${1 + fl * 0.85})`}>
            <circle r={5.2} fill={on ? GOLD : 'rgba(26,24,19,0.13)'} stroke={on ? AMBER : 'rgba(26,24,19,0.24)'} strokeWidth={1.3} />
            {on > 0 && <circle r={2} fill="#fff6dc" opacity={0.65} />}
            {fl > 0 && <circle r={9} fill="none" stroke={GOLD} strokeWidth={1.3} opacity={0.5 * fl} />}
          </g>
        );
      })}
      <rect x={ox} y={oy} width={164} height={112} rx={7} fill={`url(#s7gl)`} opacity={0.4} />
    </g>
  );

  /* ================= L-SHEETS: same stock, same layout, opposite ink ================= */
  const sheet = (id: number, pass: boolean) => (
    <g>
      <rect x={-38} y={-27} width={76} height={54} rx={4} fill={`url(#s7pap)`} stroke="#a9a08b" strokeWidth={1.2} />
      <rect x={-38} y={-27} width={76} height={9} rx={4} fill="#e8e0cd" />
      <text x={-34} y={-20} fontFamily={mono} fontSize={5} fill="#5d564a">{`JOB 0${id}`}</text>
      <rect x={-33} y={-14} width={66} height={5} rx={1.5} fill="#e3f2e6" />
      <rect x={-33} y={-7} width={66} height={5} rx={1.5} fill="#f7e2e2" />
      <rect x={-33} y={1} width={66} height={23} rx={2.5} fill="#fff" stroke="#c8bfa9" strokeWidth={0.8} />
      <rect x={-28} y={5} width={56} height={15} rx={2.5} fill="none" stroke={pass ? GREEN : RED} strokeWidth={1.8} />
      <text x={0} y={16} textAnchor="middle" fontFamily={mono} fontSize={8.4} fontWeight={700} fill={pass ? GREEN : RED} letterSpacing="1.4">{pass ? 'PASS' : 'FAIL'}</text>
    </g>
  );

  /* ================= LANE 2 GEOMETRY (lerped: we swing onto it, it grows) ================= */
  const p2x = lp(830, 660);            // his pillar, left edge
  const p2w = lp(190, 260);
  const th2x = lp(880, 748), th2y = lp(388, 376);         // his throat mouth, on its neck
  const spur2 = lp(880, 748);
  const g2x = lp(790, 566), g2y = lp(250, 232), g2R = lp(62, 84);
  const hat2x = lp(908, 776), hat2y = lp(566, 556);       // his key hatch: home of the identical brass arm
  const vsz = lp(160, 210);
  const vx = lp(848, 545);
  const vyFloor = lp(452, 470);
  const lunge = over(f, 194, 5, Easing.out(Easing.quad)) * 38 - over(f, 202, 12, Easing.inOut(Easing.quad)) * 52;
  const vy = vyFloor - lunge;
  const vcx = vx + vsz / 2;
  const vNeck = vy + vsz * 0.45;
  const lanyY = vy + vsz * 0.64;

  /* ---- L-ARM-TAKE: the same three segments, the same motion, the opposite direction ---- */
  const armTake = interpolate(f, [180, 184, 188], [0, 0.86, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const retract = ramp(f, 190, 216);
  const tipD2 = interpolate(armTake, [0, 1], [36, 115]) - retract * 62;    // still travelling back into the hatch at f216
  const takeX = hat2x - tipD2 * 0.998, takeY = hat2y + 37 + tipD2 * 0.06;
  const held = f >= 188;
  const cordSnap = f >= 190 ? Math.exp(-(f - 190) * 0.22) * Math.sin((f - 190) * 0.9) * 13 : 0;
  const cordSwing = Math.sin(f * 0.16) * 9 + cordSnap;
  // his card turns its FACE to the lens for the silent side-by-side, then turns away into the hatch
  const turn = interpolate(f, [188, 200, 208, 216], [64, 0, 0, 26], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  /* ---- L-CONFISCATE: he only has one verb, so he stamps at the machine and it eats the stamp ---- */
  const thrust = over(f, 194, 4, Easing.in(Easing.quad));
  const eaten = over(f, 198, 8, Easing.in(Easing.quad));
  const stRx = vcx + vsz * 0.34, stRy = vy + vsz * 0.52;
  const stX = stRx + (th2x - 4 - stRx) * thrust + eaten * 14;
  const stY = stRy + (th2y + 24 - stRy) * thrust + eaten * 8;
  const stRot = -14 + thrust * 32 + eaten * 74;
  const stS = (1 - eaten * 0.72) * lp(0.8, 1);

  /* ---- L-INK: weeps out of the throat lip, reaches the L-plate at f210 ---- */
  const inkDrip = ramp(f, 200, 209);
  const poolC = interpolate(f, [200, 216], [1178, 1120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const poolR = interpolate(f, [202, 210, 216], [0, 112, 205], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  /* ================= THE HERO: the thing the shot is about ================= */
  const walk = ramp(f, 126, 168);
  const step = over(f, 206, 12, Easing.inOut(Easing.quad));                // his first step out into the dawn
  const heroX = lp(520 - walk * 42, 138) - step * 26;
  const heroY = lp(556 + walk * 8, 545) + step * 3;
  const hsz = lp(182, 222);
  const heroGaze = interpolate(f, [162, 172], [-7 + Math.sin(f * 0.11) * 2, 9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const heroNod = hang ? 0 : f < 90 ? 3.4 : f < 152 ? 2.2 : 2.6;
  const flinch = f >= 190 && f < 200 ? Math.exp(-(f - 190) * 0.4) * 5 * Math.sin((f - 190) * 1.6) : 0;
  const gulp = f >= 198 && f < 208 ? Math.max(0, 1 - (f - 198) / 9) : 0;
  const snapUp = interpolate(f, [0, 14], [-6, -1.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const paws = ramp(f, 8, 90) * 0.34;                                      // paws empty and rising for the whole rhythm

  const pawL = { x: heroX + hsz * 0.11, y: heroY + hsz * 0.46 };
  const pawR = { x: heroX + hsz * 0.9, y: heroY + hsz * 0.46 };

  /* ---- L-PLATE: torn off his CHEST, front-on, in the dawn bar, ONCE ---- */
  const tearX = interpolate(f, [126, 130, 136, 140], [0, 3, 24, 52], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tearR = interpolate(f, [126, 130, 136, 140], [0, -4, -26, -46], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tearS = interpolate(f, [126, 130, 136, 140], [1, 1.04, 1.16, 1.22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const grip = f >= 126 && f < 130 ? Math.sin((f - 126) * 3.1) * 1.6 : 0;   // he sets both paws and pulls
  const velcro = f >= 127 && f < 140 ? 1 : 0;
  const plateW = hsz * 0.26;
  /* released at f140, then a long tumble on the gate draft, out of lane 1 and into lane 2 */
  const plWX = interpolate(f, [140, 210], [623, 1030], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const plWY = interpolate(f, [140, 150, 156, 160, 164], [668, 704, 686, 702, 698], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const plRot = interpolate(f, [140, 216], [-26, -418], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const wick = ramp(f, 210, 216);

  /* ---- L-ARM-GIVE: the machine holds the keys out and WAITS while he strips ---- */
  const armGive = interpolate(f, [118, 122, 134], [0, 0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) * (1 - ramp(f, 150, 166));
  const tipD1 = interpolate(armGive, [0, 1], [36, 70]);
  const ringOnArm = f < 146;
  const armRx = 444 + lp(0, -304) + tipD1 * 0.874, armRy = 606 + tipD1 * 0.486;
  const take = over(f, 146, 4, Easing.out(Easing.quad));
  const keyPos = ringOnArm ? { x: armRx, y: armRy } : { x: armRx + (pawL.x + 18 - armRx) * take, y: armRy + (pawL.y + 4 - armRy) * take };
  const keySwing = Math.sin(f * 0.19) * (ringOnArm ? 11 : 16);

  /* ---- the licence: pops proud on its spring at f96, snaps into his paw at f148, in his paw at f216 ---- */
  const pop = interpolate(f, [96, 101, 104], [0, 1.15, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const quiv = f >= 96 && f < 148 ? Math.sin(f * 1.7) * 1.6 * Math.max(0.22, 1 - (f - 96) / 42) : 0;
  const snap = over(f, 148, 4, Easing.in(Easing.quad));
  const inPaw = f >= 148;
  const cardPx = 400 + (pawR.x - 8 - 400) * snap;
  const cardPy = 492 + (pawR.y + 6 - 492) * snap;
  const cardPs = 0.46 + (1 - snap) * 0.54;

  /* ================= L-GATE + THE DAWN ================= */
  const roll = over(f, 104, 34, Easing.inOut(Easing.quad));
  const shutY = 710 - roll * 486;
  const gateX = lp(0, -366);
  const dawn = ramp(f, 108, 138);

  /* ================= BOOMS ================= */
  const b1 = interpolate(f, [110, 116, 120, 126], [-14, -88, -80, -84], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) + (f > 120 ? Math.sin(f * 0.22) * 0.8 : 0);
  const b2 = interpolate(f, [176, 184, 188, 194], [84, -10, -2, -6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) + (f > 190 ? Math.sin(f * 0.26) * 0.7 : 0);

  /* ================= L-MAIL ================= */
  const ev = ramp(f, 206, 210);
  const evS = interpolate(ev, [0, 1], [40, 560]);
  const evOn = f >= 206 && f < 210;
  const slam = f >= 210 && f < 218 ? 1 - (f - 210) / 8 : 0;
  const badge = interpolate(f, [210, 213, 216], [0, 1.35, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (0.86 + 0.14 * Math.sin(f * 0.9));
  const mtx = lp(1092, 878), mty = lp(360, 344);
  const charge = ramp(f, 202, 206);

  /* ================= L-TIN: the 2c bot outlives the smartest thing in the building ================= */
  const tinA = 790 + Math.sin(f * 0.055) * 160;
  const tinB = f < 196 ? 300 + ramp(f, 152, 196) * 340 : 640 - (f - 196) * 12;
  const tinX = lp(tinA, tinB);
  const tinFace = f >= 196 ? -1 : 1;
  const tinY = lp(706, 700);
  const flagOnBot = f < 196;

  /* ================= ATMOSPHERE ================= */
  const LAMPS = [160, 420, 700, 960, 1215];
  const motes = Array.from({ length: 35 }).map((_, i) => {
    const c = i % 5, r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2);
    return { cx: LAMPS[c] + (r - 0.5) * 190, cy: 150 + ((r2 * 520 + f * 0.6) % 520), s: 1 + r2 * 2.4, o: 0.1 + r * 0.26 };
  });
  const lampLit = (i: number) => (i === 1 ? (f % 41 < 3 ? 0.24 : 1) : i === 3 ? ((f + 19) % 41 < 4 ? 0.3 : 1) : 1);

  return (
    <Panel label="ISSUE PLAZA">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: grad('#171b22', '#090b10') }}>
        <div style={{ position: 'absolute', inset: 0, transform: `translate(${camX}px, ${camY}px) scale(${camS})`, transformOrigin: '506px 470px' }}>

          {/* ==================================================================== BACKGROUND */}
          <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s7wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#20252e" /><stop offset="1" stopColor="#0d1016" /></linearGradient>
              <linearGradient id="s7floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#151920" /><stop offset="1" stopColor="#272c35" /></linearGradient>
              <linearGradient id="s7en" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9c2ae" /><stop offset="0.4" stopColor="#efe9d8" /><stop offset="1" stopColor="#9a9384" /></linearGradient>
              <linearGradient id="s7br" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6b5327" /><stop offset="0.42" stopColor={GOLD} /><stop offset="0.62" stopColor="#f2dfa4" /><stop offset="1" stopColor="#5b451f" /></linearGradient>
              <linearGradient id="s7st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a3f47" /><stop offset="0.5" stopColor="#787f89" /><stop offset="1" stopColor="#2b3037" /></linearGradient>
              <linearGradient id="s7pap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbf7ec" /><stop offset="1" stopColor="#ddd6c4" /></linearGradient>
              <linearGradient id="s7lam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAPER} /><stop offset="1" stopColor="#ded6c6" /></linearGradient>
              <linearGradient id="s7gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(255,255,255,0.5)" /><stop offset="0.42" stopColor="rgba(255,255,255,0.04)" /><stop offset="1" stopColor="rgba(255,255,255,0.26)" /></linearGradient>
              <linearGradient id="s7foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fd7ff" /><stop offset="0.4" stopColor="#c9a4ff" /><stop offset="0.7" stopColor="#ffd39a" /><stop offset="1" stopColor="#9df0c8" /></linearGradient>
              <linearGradient id="s7glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(255,255,255,0.42)" /><stop offset="0.5" stopColor="rgba(255,255,255,0)" /><stop offset="1" stopColor="rgba(255,255,255,0.14)" /></linearGradient>
              <linearGradient id="s7dsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(0,0,0,0.16)" /><stop offset="0.5" stopColor="rgba(0,0,0,0)" /><stop offset="1" stopColor="rgba(0,0,0,0.2)" /></linearGradient>
              <linearGradient id="s7cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,226,158,0.36)" /><stop offset="1" stopColor="rgba(255,226,158,0)" /></linearGradient>
              <linearGradient id="s7dawn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="rgba(255,208,132,0.92)" /><stop offset="0.55" stopColor="rgba(255,186,110,0.42)" /><stop offset="1" stopColor="rgba(255,186,110,0)" /></linearGradient>
              <linearGradient id="s7dawnv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,236,190,0.95)" /><stop offset="1" stopColor="rgba(255,176,96,0.5)" /></linearGradient>
              <radialGradient id="s7bloom"><stop offset="0" stopColor="rgba(255,226,158,0.85)" /><stop offset="1" stopColor="rgba(255,226,158,0)" /></radialGradient>
              <radialGradient id="s7rg"><stop offset="0" stopColor="rgba(196,74,58,0.9)" /><stop offset="1" stopColor="rgba(196,74,58,0)" /></radialGradient>
              <clipPath id="s7c"><rect x="0" y="52" width="1012" height="740" /></clipPath>
            </defs>

            <g clipPath="url(#s7c)">
              {/* --- wall, haze, floor --- */}
              <rect x="0" y="52" width="1012" height="546" fill="url(#s7wall)" />
              <g transform={`translate(${hazeX} 0)`} opacity="0.5">
                {[0, 1, 2, 3, 4, 5].map((i) => <rect key={`hz${i}`} x={-120 + i * 260} y={196 + (i % 2) * 40} width={190} height="94" rx="8" fill="#262b34" opacity="0.7" />)}
                {[0, 1, 2, 3, 4].map((i) => <rect key={`hz2${i}`} x={-60 + i * 320} y="300" width="8" height="300" fill="#1b1f26" />)}
              </g>
              <rect x="0" y="592" width="1012" height="200" fill="url(#s7floor)" />
              <rect x="0" y="588" width="1012" height="7" fill="rgba(150,180,230,0.12)" />

              {/* --- L-FLOOR (world): lane arrows, drains, puddle, tyre scuff --- */}
              <g transform={`translate(${wx} 0)`}>
                {[400, 860].map((ax, i) => (
                  <g key={`ar${i}`} opacity="0.4">
                    <rect x={ax - 9} y="656" width="18" height="62" fill="#8d939c" opacity="0.5" />
                    <polygon points={`${ax - 26},668 ${ax + 26},668 ${ax},634`} fill="#8d939c" opacity="0.5" />
                  </g>
                ))}
                {[500, 1160].map((dx, i) => (
                  <g key={`dr${i}`}>
                    <rect x={dx - 30} y="732" width="60" height="24" rx="3" fill="#12151a" stroke="#3d434c" strokeWidth="1.4" />
                    {[0, 1, 2, 3, 4].map((j) => <rect key={j} x={dx - 25 + j * 11} y="735" width="6" height="18" fill="#05070a" />)}
                  </g>
                ))}
                <ellipse cx="240" cy="722" rx="72" ry="15" fill="#1d2a3c" opacity="0.75" />
                <ellipse cx="240" cy="722" rx="72" ry="15" fill="url(#s7bloom)" opacity={dawn * 0.3} />
                {/* the phase-A puddle carries the gauge upside down, so the needle climbs twice */}
                <g transform="translate(240 724) scale(0.34 -0.3)" opacity={0.3}>{dial(0, 0, 84, hv, 'r', 0, 0)}</g>
                <ellipse cx="1160" cy="730" rx="66" ry="14" fill="#1d2a3c" opacity="0.7" />
                <ellipse cx="1160" cy="730" rx={50 + strobe * 16} ry={11 + strobe * 4} fill={RED} opacity={f >= 176 ? 0.2 + strobe * 0.45 : 0} />
                {Array.from({ length: 9 }).map((_, i) => (
                  <path key={`sc${i}`} d={`M ${150 + i * 108} 700 q 52 ${14 + seed(i) * 22} 104 2`} fill="none" stroke="#454b55" strokeWidth={2 + seed(i * 2) * 3} opacity="0.32" />
                ))}
              </g>

              {/* --- L-FLAPBOARD (world): clacks for all 217 frames and never demotes anyone --- */}
              <g transform={`translate(${720 + wx} 210)`} opacity="0.9">
                <rect x="-8" y="-8" width="316" height="136" rx="6" fill="#15181e" stroke="#343a44" strokeWidth="2" />
                {Array.from({ length: 18 }).map((_, i) => {
                  const r = i % 6, c = Math.floor(i / 6);
                  const ph = (f * (0.5 + seed(i * 1.9) * 0.9) + seed(i * 3.3) * 60) % 60;
                  const flip = ph < 5 ? Math.abs(Math.cos((ph / 5) * Math.PI)) : 1;
                  const gl = ['|', '-', '|', '=', '-', '|'][(i + Math.floor(f / 37)) % 6];
                  return (
                    <g key={`fp${i}`} transform={`translate(${r * 50} ${c * 40})`}>
                      <rect x="2" y="2" width="44" height="34" rx="3" fill="#0b0d11" />
                      <g transform={`scale(1 ${Math.max(0.06, flip)})`} style={{ transformOrigin: '24px 19px' }}>
                        <rect x="2" y="2" width="44" height="34" rx="3" fill="#232830" stroke="#3c434e" strokeWidth="1" />
                        <text x="24" y="26" textAnchor="middle" fontFamily={mono} fontSize="17" fill="#98a3b2">{gl}</text>
                      </g>
                      <rect x="2" y="18" width="44" height="1.4" fill="#05070a" />
                    </g>
                  );
                })}
              </g>

              {/* --- ROOF: three parallax speeds, dust in every cone at f216 --- */}
              <g transform={`translate(${bracX} 0)`} opacity="0.85">
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={`br${i}`}>
                    <line x1={-160 + i * 150} y1="60" x2={-90 + i * 150} y2="150" stroke="#39404b" strokeWidth="4" />
                    <line x1={-90 + i * 150} y1="60" x2={-160 + i * 150} y2="150" stroke="#2c323b" strokeWidth="4" />
                  </g>
                ))}
                <rect x="-200" y="52" width="1500" height="12" fill="url(#s7st)" />
                <rect x="-200" y="146" width="1500" height="9" fill="#242931" />
              </g>
              <g transform={`translate(${roofX} 0)`}>
                {LAMPS.map((x, i) => (
                  <g key={`lm${i}`}>
                    <path d={`M ${x - 34} 116 L ${x + 34} 116 L ${x + 168} 700 L ${x - 168} 700 Z`} fill="url(#s7cone)" opacity={0.62 * lampLit(i)} />
                    <rect x={x - 5} y="60" width="10" height="42" fill="#2f353e" />
                    <rect x={x - 36} y="98" width="72" height="18" rx="5" fill="#2a2f37" stroke="#12151a" strokeWidth="1.5" />
                    <ellipse cx={x} cy="116" rx="30" ry="7" fill="#ffe89e" opacity={0.9 * lampLit(i)} />
                    {[0, 1, 2, 3].map((j) => <line key={j} x1={x - 30 + j * 20} y1="100" x2={x - 30 + j * 20} y2="118" stroke="#161a20" strokeWidth="1.6" />)}
                    <circle cx={x} cy="118" r={26} fill="url(#s7bloom)" opacity={0.5 * lampLit(i)} />
                  </g>
                ))}
                {motes.map((m, i) => <circle key={`mo${i}`} cx={m.cx} cy={m.cy} r={m.s} fill="#ffe9b4" opacity={m.o} />)}
              </g>

              {/* --- L-RAIL: S6's out-rail. Same plaza, one rail, opposite food. --- */}
              <rect x="-20" y="70" width="1052" height="14" rx="4" fill="url(#s7st)" stroke="#0f1216" strokeWidth="1.5" />
              <rect x="-20" y="73" width="1052" height="3" fill="#98a0aa" opacity="0.4" />
              <rect x="-20" y="90" width="1052" height="6" rx="3" fill="#2b3038" />
              {Array.from({ length: 26 }).map((_, i) => {
                const x = (((f * 9 + i * 44) % 1100) + 1100) % 1100 - 44;
                return <rect key={`ch${i}`} x={x} y="62" width="17" height="7" rx="3" fill="#4d545d" stroke="#12151a" strokeWidth="0.9" />;
              })}
              {/* lane-1 spur */}
              <g transform={`translate(${gateX * 0} 0)`}>
                <rect x="468" y="96" width="38" height="276" rx="4" fill="#1a1e25" stroke="#3c434e" strokeWidth="1.6" />
                <rect x="472" y="96" width="4" height="276" fill="#5d656f" opacity="0.5" />
                <rect x="498" y="96" width="4" height="276" fill="#5d656f" opacity="0.5" />
              </g>
              {/* lane-2 spur + the out-rail's lane-2 leg (beacon, mortar and loom all live on it) */}
              <rect x={spur2 - 19} y="96" width="38" height={th2y - 106} rx="4" fill="#1a1e25" stroke="#3c434e" strokeWidth="1.6" opacity={0.5 + T * 0.5} />
              <rect x={lp(1090, 930)} y="96" width="45" height="606" fill="url(#s7st)" opacity="0.9" />
              {Array.from({ length: 8 }).map((_, i) => <rect key={`lg${i}`} x={lp(1090, 930) + 6} y={130 + i * 70} width="33" height="5" rx="2" fill="#181c22" opacity="0.7" />)}
            </g>
          </svg>

          {/* ==================================================================== L-QUEUE: the world keeps running */}
          <div style={{ position: 'absolute', left: wx, top: 0, width: 1012, height: 792, filter: `blur(${1.2 + mb * 0.5}px)`, opacity: 0.92 }}>
            <svg width={1120} height={792} viewBox="0 0 1120 792" style={{ position: 'absolute', left: 0, top: 0 }}>
              <rect x="576" y="492" width="430" height="7" rx="3" fill="#6d757e" />
              <rect x="576" y="572" width="430" height="7" rx="3" fill="#7c848d" />
              {[600, 700, 800, 900, 1000].map((x, i) => <rect key={`qp${i}`} x={x} y="492" width="6" height="92" fill="#4a515a" />)}
              <path d="M1006 495 q 26 42 0 82" fill="none" stroke="#7c848d" strokeWidth="7" />
              {[0, 1, 2, 3, 4].map((i) => <rect key={`qd${i}`} x={620 + i * 76} y="570" width={11} height="4" fill="#31363d" />)}
            </svg>
            {[604, 660, 716, 772, 828, 884, 940].map((qx, i) => {
              const back = i < 4;
              const climb = i === 6 ? over(f, 206, 12, Easing.inOut(Easing.quad)) : 0;
              const sz = back ? 48 : 58;
              const shuf = Math.sin(f * 0.09 + i * 1.7) * 3;
              return (
                <div key={`q${i}`} style={{ position: 'absolute', left: qx + shuf + climb * 60, top: (back ? 462 : 528) - climb * 16, opacity: back ? 0.62 : 0.8, filter: `brightness(${back ? 0.55 : 0.72})`, transform: `rotate(${climb * 9}deg)` }}>
                  <Mascot lf={lf + i * 13} size={sz} nodAmp={1.6} nodSpeed={i === 2 ? 3.2 : 9} gaze={T > 0.5 ? 5 : Math.sin(f * 0.05 + i) * 1.5} tint="#8f6a58" />
                  <div style={{ position: 'absolute', left: sz * 0.82, top: sz * 0.44, width: sz * 0.2, height: sz * 0.26, background: '#e3decf', border: '1px solid rgba(0,0,0,0.4)', borderRadius: 1, transform: `rotate(${-12 + Math.sin(f * 0.14 + i) * 5}deg)` }} />
                </div>
              );
            })}
          </div>

          {/* ==================================================================== THE GATE, THE DAWN, THE SIGN */}
          <div style={{ position: 'absolute', left: gateX, top: 0, width: 1012, height: 792 }}>
            <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0 }}>
              {/* the dawn slot: the only warm value in a cold plaza */}
              <rect x="90" y={shutY} width="510" height={Math.max(0, 716 - shutY)} fill="url(#s7dawnv)" opacity={0.9} />
              <rect x="90" y={shutY} width="510" height="14" fill="#fff4dc" opacity={roll > 0 ? 0.9 : 0} />
              {/* the light physically arriving: a widening bar across the floor */}
              <path d={`M 90 716 L 600 716 L ${600 + roll * 300} 792 L ${90 - roll * 120} 792 Z`} fill="url(#s7dawn)" opacity={dawn * 0.75} />
              {/* the rolling shutter itself */}
              <rect x="86" y="150" width="518" height="44" rx="6" fill="#2b3038" stroke="#12151a" strokeWidth="2" />
              <rect x="90" y={Math.max(194, shutY - 560)} width="510" height={Math.max(0, shutY - Math.max(194, shutY - 560))} fill="#333941" />
              {Array.from({ length: 26 }).map((_, i) => {
                const y = shutY - 20 - i * 21;
                if (y < 196) return null;
                return <g key={`sl${i}`}><rect x="90" y={y} width="510" height="17" fill="#3d444d" /><rect x="90" y={y + 13} width="510" height="4" fill="#1c2027" /><rect x={190 + (i % 3) * 120} y={y + 4} width="46" height="5" rx="2" fill="#2b3038" opacity="0.9" /></g>;
              })}
              <rect x="90" y={shutY - 4} width="510" height="9" rx="3" fill="#141115" />
              <rect x="90" y={shutY + 3} width="510" height="5" rx="2" fill="#0a0a0c" opacity="0.8" />
              {[92, 596].map((x, i) => <rect key={`gr${i}`} x={x} y="150" width="12" height="566" fill="url(#s7st)" opacity="0.9" />)}
              {/* header beam */}
              <rect x="80" y="108" width="540" height="26" rx="4" fill="#343a44" stroke="#14171c" strokeWidth="1.6" />
            </svg>
            {/* THE SOLO SIGN: the scene's one and only header */}
            <div style={{ position: 'absolute', left: 390, top: 120, width: 210, height: 62 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: '#191d24', border: `2px solid ${f >= 100 ? 'rgba(255,244,214,0.5)' : '#3b424c'}`, boxShadow: f >= 100 ? `0 0 ${26 * (f % 41 < 2 ? 0.4 : 1)}px rgba(255,246,220,0.55)` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: '0.18em', color: f < 100 ? '#454b55' : f < 102 ? '#8b8578' : f < 104 ? '#454b55' : '#FFF6DC', textShadow: f >= 104 ? '0 0 20px rgba(255,246,220,0.85)' : 'none', opacity: f >= 104 && f % 41 < 2 ? 0.55 : 1 }}>SOLO</div>
              </div>
              {[0, 1, 2, 3].map((i) => <div key={`fil${i}`} style={{ position: 'absolute', left: 16 + i * 56, top: 8, width: 3, height: 46, background: f >= 104 ? 'rgba(255,246,220,0.5)' : '#2b3038' }} />)}
            </div>
          </div>

          {/* ==================================================================== MIDGROUND: THE VERIDEX VALIDATORS */}
          <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0 }}>
            {/* ---------------- LANE 2: same make, same face, same arm ---------------- */}
            <g opacity={0.55 + T * 0.45} filter={mb > 0.6 ? 'url(#s7mb)' : undefined}>
              <ellipse cx={p2x + p2w / 2} cy={lp(706, 714)} rx={p2w * 0.66} ry="16" fill="#000" opacity="0.55" />
              <rect x={p2x} y={lp(400, 356)} width={p2w} height={lp(306, 348)} rx="8" fill="url(#s7en)" stroke="#4a4438" strokeWidth="2.4" />
              <rect x={p2x} y={lp(400, 356)} width="9" height={lp(306, 348)} fill="#8d2f22" opacity="0.5" />
              {/* his overspray: he has been scabbing his own ink up this enamel for six scenes */}
              {Array.from({ length: 9 }).map((_, i) => <ellipse key={`os${i}`} cx={p2x + 20 + seed(i * 2.3) * (p2w - 40)} cy={lp(410, 372) + seed(i * 5.1) * 300} rx={7 + seed(i) * 16} ry={4 + seed(i * 3) * 9} fill={FAKE} opacity={0.24 + seed(i * 7) * 0.2} />)}
              <rect x={p2x - 12} y={lp(700, 700)} width={p2w + 24} height="16" rx="3" fill="#3a4048" stroke="#14171c" strokeWidth="1.6" />
              <ellipse cx={p2x + 40} cy={lp(716, 718)} rx="46" ry="9" fill="#1d1a12" opacity="0.85" />
              {/* his empty holder: he was issued years ago, the card is on his neck */}
              <rect x={p2x + 22} y={lp(436, 430)} width={lp(84, 108)} height={lp(58, 74)} rx="4" fill="#191d24" stroke="#555c66" strokeWidth="1.6" />
              <rect x={p2x + 16} y={lp(452, 450)} width="9" height={lp(28, 36)} rx="2" fill="url(#s7br)" />
              <rect x={p2x + 20 + lp(84, 108)} y={lp(452, 450)} width="9" height={lp(28, 36)} rx="2" fill="url(#s7br)" />
              {/* his throat: same make, same raised neck, lip crusted with his own ink */}
              <path d={`M ${th2x - 12} ${th2y + 14} L ${th2x + 12} ${th2y + 14} L ${th2x + 8} ${lp(422, 412)} L ${th2x - 16} ${lp(422, 412)} Z`} fill="url(#s7br)" stroke="#2a2115" strokeWidth="2" />
              <rect x={th2x - 20} y={lp(414, 404)} width="40" height="11" rx="3" fill="#3a4048" stroke="#14171c" strokeWidth="1.4" />
              <g transform={`translate(${th2x} ${th2y}) scale(${lp(0.78, 1)}) rotate(${-18 + (f >= 152 && f < 178 ? Math.max(0, 4 - (f - Math.max(...FT.filter((t) => t <= f), -99)) * 0.9) * 3 : 0)})`}>
                <polygon points="-36,-18 36,-26 42,18 -32,24" fill="url(#s7br)" stroke="#2a2115" strokeWidth="2" />
                <polygon points="-28,-9 32,-16 35,11 -25,15" fill="#0a0c0f" />
                <rect x="-32" y="17" width="74" height="7" rx="3" fill={FAKE} opacity="0.75" />
                <rect x="-28" y="21" width="30" height="5" rx="2" fill="#8FA03C" opacity="0.85" />
              </g>
              {/* his key hatch: the identical brass arm lives behind identical wired glass */}
              <g>
                <rect x={hat2x - 92} y={hat2y} width="92" height="74" rx="4" fill="#12161c" stroke="#5a626d" strokeWidth="2" />
                {f < 180 && <>
                  <rect x={hat2x - 88} y={hat2y + 4} width="84" height="66" rx="3" fill="rgba(150,190,220,0.14)" stroke="rgba(190,220,240,0.3)" strokeWidth="1" />
                  {Array.from({ length: 6 }).map((_, i) => <line key={`w2a${i}`} x1={hat2x - 88} y1={hat2y + 6 + i * 11} x2={hat2x - 4} y2={hat2y + 6 + i * 11} stroke="rgba(210,235,255,0.2)" strokeWidth="0.8" />)}
                  {Array.from({ length: 8 }).map((_, i) => <line key={`w2b${i}`} x1={hat2x - 86 + i * 11} y1={hat2y + 4} x2={hat2x - 86 + i * 11} y2={hat2y + 70} stroke="rgba(210,235,255,0.2)" strokeWidth="0.8" />)}
                  <rect x={hat2x - 40 - (f >= 180 ? 0 : 0) - 22 * (f >= 180 ? 1 : 0)} y={hat2y + 30} width="44" height="13" rx="3" fill={RED} stroke="#4a1610" strokeWidth="1.4" />
                </>}
                {f >= 180 && <g transform={`translate(${hat2x - 46} ${hat2y + 78}) rotate(${over(f, 180, 5) * 74})`}><rect x="-46" y="-4" width="92" height="8" rx="3" fill="#1a1e25" stroke="#5a626d" strokeWidth="1.4" /></g>}
              </g>
              {/* his gauge, on the same make of mast */}
              <rect x={p2x + 2} y={lp(404, 362)} width="12" height="10" fill="url(#s7st)" />
              <line x1={p2x + 8} y1={lp(408, 368)} x2={g2x + g2R * 0.5} y2={g2y + g2R * 0.62} stroke="url(#s7st)" strokeWidth="11" />
              {Array.from({ length: 5 }).map((_, i) => <circle key={`mb${i}`} cx={p2x + 8 + (g2x + g2R * 0.5 - p2x - 8) * (i / 4)} cy={lp(408, 368) + (g2y + g2R * 0.62 - lp(408, 368)) * (i / 4)} r="2.4" fill="#1a1e25" />)}
              {dial(g2x, g2y, g2R, vv, 'v', 0, f >= 176 ? strobe : 0)}
            </g>
            {/* ---- L-INK: it weeps out of the throat lip as his stamp is dragged in, runs down the
                 pillar face and spreads across lane 2. No burst, no jet, no spray. It never stops. ---- */}
            {inkDrip > 0 && (
              <g>
                <path
                  d={`M ${th2x - 5} ${th2y + 22} q ${3 + Math.sin(f * 0.2) * 2.5} ${inkDrip * (698 - th2y - 22) * 0.5} ${-1} ${inkDrip * (698 - th2y - 22)} l 7 0 q ${2 - Math.sin(f * 0.2) * 2.5} ${-inkDrip * (698 - th2y - 22) * 0.5} ${0} ${-inkDrip * (698 - th2y - 22)} Z`}
                  fill="#6b7a24" opacity="0.9"
                />
                <rect x={th2x - 4} y={th2y + 22} width={2} height={inkDrip * (698 - th2y - 22)} fill={FAKE} opacity="0.5" />
                <ellipse cx={th2x - 2} cy={th2y + 22 + inkDrip * (698 - th2y - 22)} rx={4} ry={5.4} fill="#6b7a24" />
                <ellipse cx={th2x - 3} cy={th2y + 20 + inkDrip * (698 - th2y - 22)} rx={1.4} ry={2} fill={FAKE} opacity="0.6" />
                <ellipse cx={poolC + wx} cy="702" rx={poolR} ry={poolR * 0.12} fill="#39411a" opacity="0.72" />
                <ellipse cx={poolC + wx - poolR * 0.18} cy="700" rx={poolR * 0.52} ry={poolR * 0.055} fill="#59661f" opacity="0.6" />
                <ellipse cx={poolC + wx - poolR * 0.3} cy="699" rx={poolR * 0.18} ry={poolR * 0.022} fill={FAKE} opacity="0.34" />
                <ellipse cx={poolC + wx} cy="702" rx={poolR} ry={poolR * 0.12} fill="none" stroke={FAKE} strokeWidth="1.5" opacity="0.6" />
              </g>
            )}

            {/* ---------------- LANE 1: THE VERIDEX VALIDATOR ---------------- */}
            <g transform={`translate(${lp(0, -304)} 0)`} opacity={1 - T * 0.76}>
              <ellipse cx="400" cy="714" rx="132" ry="17" fill="#000" opacity="0.6" />
              <rect x="300" y="380" width="200" height="326" rx="8" fill="url(#s7en)" stroke="#4a4438" strokeWidth="2.4" />
              {/* cream enamel chipped through to red primer down its left edge */}
              <rect x="300" y="380" width="9" height="326" fill="#a8402c" opacity="0.65" />
              {Array.from({ length: 7 }).map((_, i) => <polygon key={`cp${i}`} points={`309,${400 + i * 44} ${316 + seed(i) * 9},${406 + i * 44} 309,${414 + i * 44}`} fill="#a8402c" opacity="0.6" />)}
              <rect x="288" y="700" width="224" height="16" rx="3" fill="#3a4048" stroke="#14171c" strokeWidth="1.6" />
              {/* oil weep staining the base plinth */}
              <ellipse cx="340" cy="716" rx="42" ry="8" fill="#1d1a12" opacity="0.8" />
              <path d="M330 686 q 5 16 -2 30" fill="none" stroke="#211c10" strokeWidth="4" opacity="0.7" />
              {/* a knurled inspection cap and two hex bolts, where a lever would be on a lesser machine */}
              <circle cx="466" cy="614" r="15" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.6" />
              {Array.from({ length: 14 }).map((_, i) => <line key={`kn${i}`} x1={466 + 11 * Math.cos((i / 14) * 6.28)} y1={614 + 11 * Math.sin((i / 14) * 6.28)} x2={466 + 15 * Math.cos((i / 14) * 6.28)} y2={614 + 15 * Math.sin((i / 14) * 6.28)} stroke="#2a2115" strokeWidth="1.2" />)}
              {[652, 678].map((y, i) => <polygon key={`hx${i}`} points={`466,${y - 8} 473,${y - 4} 473,${y + 4} 466,${y + 8} 459,${y + 4} 459,${y - 4}`} fill="#8d949e" stroke="#2b3038" strokeWidth="1.2" />)}

              {/* THE THROAT: it eats sheets. Up on its own brass neck, so the punch head has the card to itself. */}
              <path d="M478 390 L502 390 L498 412 L470 412 Z" fill="url(#s7br)" stroke="#2a2115" strokeWidth="2" />
              <rect x="466" y="404" width="40" height="11" rx="3" fill="#3a4048" stroke="#14171c" strokeWidth="1.4" />
              <g transform={`translate(486 376) rotate(${18 - (f < 92 ? Math.max(0, 4 - (f - Math.max(...CHUNK.filter((t) => t <= f), -99))) * 3 : 0)})`}>
                <polygon points="36,-18 -36,-26 -42,18 32,24" fill="url(#s7br)" stroke="#2a2115" strokeWidth="2" />
                <polygon points="28,-9 -32,-16 -35,11 25,15" fill="#0a0c0f" />
                <rect x="-42" y="18" width="74" height="6" rx="3" fill="#7a6a3a" opacity="0.5" />
              </g>
              {/* swallow puff: a small burst of paper dust on every CHUNK */}
              {CHUNK.map((t, k) => {
                const a = f >= t && f < t + 7 ? 1 - (f - t) / 7 : 0;
                if (a <= 0) return null;
                return <g key={`pf${k}`} opacity={a * 0.8}>{Array.from({ length: 7 }).map((_, i) => <circle key={i} cx={486 + Math.cos(i * 0.9 + k) * (10 + (1 - a) * 26)} cy={372 + Math.sin(i * 0.9 + k) * (7 + (1 - a) * 15)} r={1.4 + seed(i + k) * 2.4} fill="#e8e0cd" />)}</g>;
              })}

              {/* THE PUNCH HEAD AND ITS INDEX RAIL */}
              <rect x="308" y="420" width="184" height="8" rx="3" fill="url(#s7st)" />
              <rect x="308" y="436" width="184" height="5" rx="2" fill="#2b3038" />
              {Array.from({ length: 13 }).map((_, i) => <rect key={`rt${i}`} x={344 + i * 15 - 1} y="437" width="2.4" height="4" fill="#12151a" />)}

              {/* THE SPRUNG HOLDER + THE CARD (the punches go through the card's own body) */}
              <g transform={`translate(${quiv} ${-pop * 11})`}>
                {!inPaw && <g opacity={1 - snap}>
                  <rect x="314" y={442 + pop * 3} width="172" height="112" rx="6" fill="#000" opacity={0.42 + pop * 0.2} />
                  {cardFace(318, 436, false)}
                </g>}
              </g>
              <rect x="304" y="460" width="10" height="62" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.2" />
              <rect x="486" y="460" width="10" height="62" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.2" />
              <rect x="308" y="486" width="8" height="10" rx="2" fill="#f2dfa4" opacity={0.5 + pop * 0.5} />
              <rect x="484" y="486" width="8" height="10" rx="2" fill="#f2dfa4" opacity={0.5 + pop * 0.5} />

              {/* the head, walking left to right across row two: you can always see how many are left */}
              <g transform={`translate(${headX} ${headY})`}>
                <rect x="-16" y="-30" width="32" height="34" rx="3" fill="url(#s7st)" stroke="#12151a" strokeWidth="1.4" />
                <rect x="-13" y="0" width="26" height="30" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.6" />
                <rect x="-9" y="3" width="5" height="24" rx="2" fill="#fff0c2" opacity="0.4" />
                <polygon points="-5,30 5,30 3,40 -3,40" fill="#c9c2ae" />
                <rect x="-4" y="38" width="8" height={4 + drive * 5} fill="#eae3cf" />
              </g>
              {drive > 0.9 && <circle cx={headX} cy={508} r={9 + (1 - drive) * 30} fill="none" stroke={GOLD} strokeWidth={2} opacity={drive - 0.9} />}

              {/* THE GAUGE ON ITS MAST: looming institutional over him */}
              <rect x="306" y="378" width="14" height="12" fill="url(#s7st)" />
              <line x1="312" y1="382" x2="270" y2="320" stroke="url(#s7st)" strokeWidth="12" />
              <line x1="270" y1="320" x2="252" y2="290" stroke="url(#s7st)" strokeWidth="10" />
              {Array.from({ length: 4 }).map((_, i) => <circle key={`pt${i}`} cx={312 - i * 14} cy={382 - i * 21} r="2.6" fill="#1a1e25" />)}
              {dial(250, 238, 84, hv, 'h', bloom, 0)}

              {/* THE KEY HATCH: wired glass, red LOCKED bolt, the S3 cabinet finally opening */}
              <rect x="348" y="568" width="96" height="76" rx="4" fill="#12161c" stroke="#5a626d" strokeWidth="2" />
              {f < 122 && <>
                <rect x="352" y="572" width="88" height="68" rx="3" fill="rgba(150,190,220,0.14)" stroke="rgba(190,220,240,0.32)" strokeWidth="1" />
                {Array.from({ length: 6 }).map((_, i) => <line key={`wa${i}`} x1="352" y1={574 + i * 11} x2="440" y2={574 + i * 11} stroke="rgba(210,235,255,0.22)" strokeWidth="0.8" />)}
                {Array.from({ length: 8 }).map((_, i) => <line key={`wb${i}`} x1={354 + i * 11} y1="572" x2={354 + i * 11} y2="640" stroke="rgba(210,235,255,0.22)" strokeWidth="0.8" />)}
                {/* the ring, visible behind the glass since S3, never lit, never approached */}
                <g opacity="0.5"><circle cx="396" cy="600" r="12" fill="none" stroke={GOLD} strokeWidth="3" /><rect x="392" y="610" width="4" height="16" fill={AMBER} /></g>
                {/* the bolt withdraws in three clicks */}
                <rect x={376 - Math.floor(over(f, 118, 5) * 3) * 9} y="596" width="48" height="14" rx="3" fill={RED} stroke="#4a1610" strokeWidth="1.4" />
              </>}
              {f >= 122 && <g transform={`translate(396 646) rotate(${over(f, 122, 5) * -76})`}><rect x="-48" y="-4" width="96" height="9" rx="3" fill="#1a1e25" stroke="#5a626d" strokeWidth="1.4" /><rect x="-44" y="-2" width="88" height="3" rx="1" fill="rgba(190,220,240,0.2)" /></g>}
              <rect x="348" y="568" width="96" height="8" rx="3" fill="#2b3038" />
            </g>

            {/* ---------------- LANE 1: green PASS sheets banging down the spur ---------------- */}
            {CHUNK.map((t, k) => {
              if (f < t - 40 || f >= t + 4) return null;
              const rail = f < t - 14;
              const p = rail ? ramp(f, t - 40, t - 14) : ramp(f, t - 14, t);
              const sink = f > t ? ramp(f, t, t + 4) : 0;
              const x = rail ? -70 + p * 557 : 487 - p * 6;
              const y = rail ? 84 + Math.sin(f * 0.5 + k) * 1.6 : 84 + p * 286 + sink * 12;
              const rot = rail ? Math.sin(f * 0.4 + k) * 3 : p * 84;
              return (
                <g key={`ps${k}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${(rail ? 0.86 : 0.86 - p * 0.1) * (1 - sink * 0.45)})`} opacity={1 - sink}>
                  {sheet(147 + k, true)}
                  <rect x={rail ? -78 : -14} y={rail ? 22 : -40} width={rail ? 34 : 5} height={rail ? 4 : 30} rx="2" fill={GREEN} opacity="0.3" />
                </g>
              );
            })}

          </svg>

          {/* ==================================================================== THE VILLAIN */}
          {/* his key: a hard sodium pool that lands on lane 2, so a black suit still has a silhouette */}
          <div style={{ position: 'absolute', left: vcx - vsz * 1.15, top: vyFloor - vsz * 0.1, width: vsz * 2.3, height: vsz * 1.5, zIndex: 4, background: 'radial-gradient(closest-side, rgba(255,226,158,0.20), rgba(255,226,158,0) 72%)', opacity: 0.5 + T * 0.5 }} />
          <div style={{ position: 'absolute', left: vcx - vsz * 0.62, top: vyFloor + vsz * 0.86, width: vsz * 1.24, height: vsz * 0.2, zIndex: 4, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,222,150,0.32), rgba(255,222,150,0) 74%)', opacity: (0.4 + T * 0.6) * (1 - ramp(f, 200, 214) * 0.5) }} />
          <div style={{ position: 'absolute', left: vx, top: vy, width: vsz, height: vsz, filter: `blur(${mb * 0.35}px) brightness(${lp(0.8, 1.16)}) drop-shadow(0 0 5px rgba(158,186,232,0.5)) drop-shadow(0 0 14px rgba(120,150,210,0.28))`, zIndex: 6 }}>
            <Villain lf={lf} size={vsz} gaze={f >= 152 ? -4 : 3} nodAmp={hang ? 0 : f < 152 ? 2.6 : 1.4} nodSpeed={9} rain={f < 176 ? 1 : 0.6 + 0.3 * Math.abs(Math.sin(f * 0.5))} />
            {/* the S3 collar ink: he wears his own lie */}
            <div style={{ position: 'absolute', left: vsz * 0.38, top: vsz * 0.52, width: vsz * 0.11, height: vsz * 0.07, borderRadius: '50% 40% 60% 45%', background: FAKE, opacity: 0.78, zIndex: 4, transform: 'rotate(-12deg)' }} />
            <div style={{ position: 'absolute', left: vsz * 0.36, top: vsz * 0.585, width: vsz * 0.05, height: vsz * 0.035, borderRadius: '50%', background: '#8FA03C', opacity: 0.7, zIndex: 4 }} />
            {/* he never speaks. The flat line only shows up on the notch. */}
            <div style={{ position: 'absolute', left: vsz * 0.455, top: vsz * 0.59, width: vsz * 0.09, height: vsz * 0.02, background: '#151312', opacity: ramp(f, 172, 178) * (1 - ramp(f, 206, 214)), zIndex: 5 }} />
            {/* the beacon bars his shades */}
            {f >= 176 && <div style={{ position: 'absolute', left: vsz * 0.2, top: vsz * 0.3, width: vsz * 0.6, height: vsz * 0.16, background: RED, opacity: strobe * 0.4, mixBlendMode: 'screen', zIndex: 6 }} />}
            {/* rim light down his leading edge: it turns red the moment he is under the line */}
            <div style={{ position: 'absolute', left: vsz * 0.15, top: vsz * 0.22, width: vsz * 0.035, height: vsz * 0.72, background: f >= 176 ? RED : 'rgba(196,214,246,0.75)', opacity: f >= 176 ? 0.35 + strobe * 0.55 : 0.55, zIndex: 6, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: vsz * 0.15, top: vsz * 0.22, width: vsz * 0.5, height: vsz * 0.05, background: 'rgba(196,214,246,0.5)', opacity: 0.45, zIndex: 6, borderRadius: 2 }} />
          </div>
          <div style={{ position: 'absolute', left: vcx - vsz * 0.42, top: vyFloor + vsz * 0.9, width: vsz * 0.84, height: 15, borderRadius: 20, background: 'rgba(0,0,0,0.6)', filter: 'blur(5px)', zIndex: 5 }} />

          {/* ==================================================================== THE HERO: sharp, warm, never blurred */}
          <div style={{ position: 'absolute', left: heroX, top: heroY, width: hsz, height: hsz, zIndex: 9, transform: `rotate(${snapUp + flinch}deg) scaleY(${1 - gulp * 0.035})`, transformOrigin: '50% 100%' }}>
            <Mascot lf={lf} size={hsz} capBack={1} gaze={heroGaze} nodAmp={heroNod} nodSpeed={f < 90 ? 5.2 : 8} cheer={paws} />
            {/* stamp ink still on one forearm: it carries into S8 */}
            <div style={{ position: 'absolute', left: hsz * 0.06, top: hsz * 0.47, width: hsz * 0.09, height: hsz * 0.035, borderRadius: 3, background: '#2f3a33', opacity: 0.75, transform: 'rotate(-14deg)' }} />
            {/* THE L-PLATE: rigid, red and white, square on his CHEST, unchanged since S0 */}
            {f < 140 && (
              <div style={{ position: 'absolute', left: hsz * 0.5 - plateW / 2 - tearX * 0.12 + grip, top: hsz * 0.62 - plateW / 2 - tearX * 0.04, width: plateW, height: plateW, transform: `rotate(${tearR}deg) scale(${tearS})`, transformOrigin: '50% 100%', zIndex: 4 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 3, background: '#FFFFFF', border: `${plateW * 0.09}px solid ${RED}`, boxShadow: `0 ${3 + tearX * 0.3}px ${6 + tearX * 0.4}px rgba(0,0,0,0.55)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: plateW * 0.62, color: RED, lineHeight: 1 }}>L</div>
                </div>
              </div>
            )}
            {/* the long dry velcro TEAR */}
            {velcro > 0 && Array.from({ length: 9 }).map((_, i) => (
              <div key={`vc${i}`} style={{ position: 'absolute', left: hsz * 0.5 - plateW / 2 + 2 + i * (plateW / 9.6), top: hsz * 0.62 - plateW / 2 + plateW * 0.88 - tearX * 0.04, width: 2.2, height: Math.max(0, tearX * (0.5 + seed(i) * 0.62) * (1 - ramp(f, 133 + seed(i * 3) * 4, 138))), background: '#ded8c8', opacity: 0.85, zIndex: 3, transform: `rotate(${(i - 4) * 1.6}deg)`, transformOrigin: '50% 100%' }} />
            ))}
            {/* both paws on it, front-on in the dawn bar */}
            {f >= 126 && f < 142 && <>
              <div style={{ position: 'absolute', left: hsz * 0.5 - plateW * 0.86 + grip, top: hsz * 0.55 - tearX * 0.1, width: hsz * 0.145, height: hsz * 0.145, background: '#C4694C', border: '1px solid rgba(90,40,26,0.45)', borderRadius: 2, zIndex: 5, transform: `rotate(${-tearR * 0.5}deg)` }} />
              <div style={{ position: 'absolute', left: hsz * 0.5 + plateW * 0.4 + grip, top: hsz * 0.55 - tearX * 0.12, width: hsz * 0.145, height: hsz * 0.145, background: '#C4694C', border: '1px solid rgba(90,40,26,0.45)', borderRadius: 2, zIndex: 5, transform: `rotate(${-tearR * 0.5}deg)` }} />
            </>}
            {/* the bare chest, held clean in the light */}
            {f >= 140 && <div style={{ position: 'absolute', left: hsz * 0.5 - plateW * 0.6, top: hsz * 0.58, width: plateW * 1.2, height: plateW * 0.8, borderRadius: 4, background: 'rgba(255,226,158,0.24)', filter: 'blur(4px)', opacity: (1 - ramp(f, 150, 176) * 0.6) * dawn }} />}
          </div>

          {/* ==================================================================== FOREGROUND MECHANISM */}
          <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0, zIndex: 12, pointerEvents: 'none' }}>
            {/* ---- LANE 1's ARM: it holds the keys out and waits ---- */}
            {armGive > 0.01 && (
              <g transform={`translate(${444 + lp(0, -304)} 606) rotate(29.1)`}>
                <rect x="0" y="-10" width="34" height="20" rx="4" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.6" />
                <rect x={(tipD1 - 26) * 0.5} y="-7.5" width="30" height="15" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.4" />
                <rect x={tipD1 - 26} y="-5.5" width="26" height="11" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.2" />
                <rect x={tipD1 - 4} y="-8" width="8" height="16" rx="2" fill="#c9c2ae" stroke="#2a2115" strokeWidth="1" />
                <circle cx="8" cy="0" r="3" fill="#2a2115" />
              </g>
            )}
            {/* ---- LANE 2's ARM: identical geometry, identical motion, opposite direction ---- */}
            {armTake > 0.01 && (
              <g transform={`translate(${hat2x} ${hat2y + 37}) rotate(176.5)`}>
                <rect x="0" y="-10" width="34" height="20" rx="4" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.6" />
                <rect x={(tipD2 - 26) * 0.5} y="-7.5" width="30" height="15" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.4" />
                <rect x={tipD2 - 26} y="-5.5" width="26" height="11" rx="3" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.2" />
                <g transform={`translate(${tipD2} 0) rotate(${held ? 0 : Math.sin(f * 0.9) * 8})`}>
                  <rect x="-4" y={-9 - (held ? 0 : 3)} width="9" height="8" rx="2" fill="#c9c2ae" stroke="#2a2115" strokeWidth="1" />
                  <rect x="-4" y={1 + (held ? 0 : 3)} width="9" height="8" rx="2" fill="#c9c2ae" stroke="#2a2115" strokeWidth="1" />
                </g>
                <circle cx="8" cy="0" r="3" fill="#2a2115" />
              </g>
            )}
            {/* ---- HIS LANYARD AND HIS LAMINATED LICENCE: on screen ~190 frames before anything touches it ---- */}
            <g>
              {!held && <>
                <line x1={vcx - vsz * 0.09} y1={vNeck} x2={vcx - 3} y2={lanyY - 16} stroke="#14171c" strokeWidth={2.6} />
                <line x1={vcx + vsz * 0.09} y1={vNeck} x2={vcx + 3} y2={lanyY - 16} stroke="#14171c" strokeWidth={2.6} />
              </>}
              {held && <g>
                {/* the cord snaps taut, whips loose, and swings to the last frame */}
                <line x1={vcx - vsz * 0.09} y1={vNeck} x2={vcx - 4 + cordSwing} y2={lanyY - 2} stroke="#14171c" strokeWidth={2.6} />
                <line x1={vcx + vsz * 0.09} y1={vNeck} x2={vcx + 4 + cordSwing} y2={lanyY - 2} stroke="#14171c" strokeWidth={2.6} />
              </g>}
              {/* twenty clean gold holes, lit by the machine, identical to the hero's */}
              <g transform={`translate(${held ? takeX : vcx} ${held ? takeY : lanyY}) rotate(${held ? -4 + retract * 8 : Math.sin(f * 0.2) * 2.5}) scale(${held ? lp(0.4, 0.44) + ramp(f, 200, 208) * 0.16 : lp(0.34, 0.38)}) `}>
                <g transform={`scale(${Math.max(0.05, Math.cos((turn * Math.PI) / 180))} 1)`}>
                  <g transform="translate(-82 -56)">{cardFace(0, 0, true)}</g>
                </g>
                {!held && <><rect x="-8" y="-62" width="16" height="12" rx="3" fill="#3d434c" /><rect x="-5" y="-64" width="10" height="5" rx="2" fill="#8d949e" /></>}
              </g>
            </g>
            {/* ---------------- LANE 2: five red sheets, five notches, one pile ----------------
                 Each one bangs the spur, THUDS the throat, kicks the needle on the impact frame,
                 and ejects onto the concrete in front of him. The pile IS the cause of the number. */}
            {FT.map((t, k) => {
              const rs = [0, 108, 116, 122, 128][k], re = [138, 144, 150, 154, 158][k];
              if (f < rs) return null;
              let x: number, y: number, rot: number, sc = 0.86;
              if (f < re) { const p = ramp(f, rs, re); x = -70 + p * (spur2 + 70); y = 84 + Math.sin(f * 0.5 + k) * 1.6; rot = Math.sin(f * 0.4 + k) * 3; }
              else if (f < t) { const p = ramp(f, re, t); x = spur2; y = 84 + p * (th2y - 84); rot = p * 84; sc = 0.86 - p * 0.1; }
              else {
                const p = ramp(f, t + 1, t + 12);
                const dx = lp(908, 626) + (seed(k * 3.7) - 0.5) * 78, dy = lp(646, 704) - k * 4;
                x = th2x + (dx - th2x) * p; y = th2y + (dy - th2y) * p - Math.sin(p * Math.PI) * 46;
                rot = 84 + p * (-64 + seed(k * 9.1) * 130); sc = 0.86 * lp(0.7, 1);
              }
              return <g key={`fs${k}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={f < re ? 0.5 + T * 0.5 : 1}>{sheet(151 + k, false)}</g>;
            })}
            {/* ---- HIS STAMP: the S3 damage, carried since S3 f188, confiscated here ---- */}
            {thrust > 0.02 && eaten < 0.98 && (
              <g opacity={1 - ramp(f, 204, 206) * 0.9}>
                <line x1={vcx + vsz * 0.28} y1={vy + vsz * 0.46} x2={stX} y2={stY + 12} stroke={VILL} strokeWidth={vsz * 0.115} strokeLinecap="round" />
                <line x1={vcx + vsz * 0.28} y1={vy + vsz * 0.46} x2={stX - 1} y2={stY + 11} stroke="rgba(255,255,255,0.16)" strokeWidth={vsz * 0.028} strokeLinecap="round" />
                <rect x={stX - vsz * 0.075} y={stY + 4} width={vsz * 0.15} height={vsz * 0.15} rx={3} fill={VILL} />
              </g>
            )}
            {eaten < 0.98 && (
              <g transform={`translate(${stX} ${stY}) rotate(${stRot}) scale(${stS})`} opacity={1 - ramp(f, 204, 206) * 0.9}>
                {/* taped barrel */}
                <rect x="-11" y="-6" width="22" height="40" rx="4" fill="#2a2f37" stroke="#12151a" strokeWidth="1.4" />
                <rect x="-13" y="2" width="26" height="6" fill="#b8a76a" opacity="0.9" />
                <rect x="-13" y="16" width="26" height="5" fill="#b8a76a" opacity="0.75" />
                <line x1="-11" y1="-6" x2="11" y2="34" stroke="#8d949e" strokeWidth="0.8" opacity="0.5" />
                {/* head / die split open, spring out of the crack */}
                <rect x="-20" y="-30" width="17" height="26" rx="3" fill="#3a4048" stroke="#12151a" strokeWidth="1.4" transform="rotate(-7 -12 -18)" />
                <rect x="4" y="-30" width="17" height="26" rx="3" fill="#3a4048" stroke="#12151a" strokeWidth="1.4" transform="rotate(9 12 -18)" />
                <path d="M-2 -30 l-3 26" stroke="#0a0c0f" strokeWidth="2.4" fill="none" />
                <path d="M-3 -26 l6 4 l-7 4 l6 4 l-6 4" fill="none" stroke="#c9c2ae" strokeWidth="1.6" />
                {/* ink pad, dried and cracked */}
                <rect x="-18" y="32" width="36" height="10" rx="2" fill={FAKE} stroke="#4c5320" strokeWidth="1.2" />
                <path d="M-12 34 l5 7 M-1 33 l4 8 M9 34 l3 7" stroke="#5c6428" strokeWidth="1.1" fill="none" />
                {/* brass flip-counter, jammed half over */}
                <rect x="12" y="8" width="14" height="13" rx="2" fill="url(#s7br)" stroke="#2a2115" strokeWidth="1.1" />
                <rect x="14" y="10" width="10" height="4" fill="#2a2318" />
                <rect x="14" y="15" width="10" height="2" fill="#1a1610" transform="rotate(-16 19 16)" />
              </g>
            )}
            {/* ---- THE DISCARDED L-PLATE, riding the gate draft, wicking green at f216 ---- */}
            {f >= 140 && (
              <g transform={`translate(${plWX + wx} ${plWY}) rotate(${plRot}) scale(${lp(0.94, 0.8)})`}>
                <rect x="-22" y="-22" width="44" height="44" rx="3" fill="#FFFFFF" stroke={RED} strokeWidth="4" />
                <text x="0" y="12" textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="30" fill={RED}>L</text>
                {wick > 0 && <><rect x="-22" y={22 - wick * 30} width="44" height={wick * 30} rx="2" fill={FAKE} opacity="0.8" /><rect x="-22" y={22 - wick * 30} width="44" height="3" fill="#d8e88a" opacity="0.9" /></>}
              </g>
            )}
            {/* ---- THE KEYS: handed over ONCE, then they never stop swinging ---- */}
            {f >= 118 && (
              <g transform={`translate(${keyPos.x} ${keyPos.y}) rotate(${keySwing})`} opacity={armGive > 0.2 || !ringOnArm ? 1 : 0}>
                <circle cx="0" cy="0" r={13} fill="none" stroke={GOLD} strokeWidth="3.6" />
                <circle cx="0" cy="0" r={13} fill="none" stroke="#fff0c2" strokeWidth="1.2" opacity="0.6" />
                {[-9, 0, 9].map((dx, i) => (
                  <g key={`ky${i}`} transform={`translate(${dx} 11) rotate(${dx * 0.7 + Math.sin(f * 0.3 + i) * 3})`}>
                    <rect x="-2" y="0" width="4" height={20 + i * 3} fill={i === 1 ? AMBER : GOLD} />
                    <rect x="-4" y={17 + i * 3} width="4" height="4" fill={i === 1 ? AMBER : GOLD} />
                    <rect x="-4" y={11 + i * 3} width="3" height="3" fill={i === 1 ? AMBER : GOLD} />
                    <circle cx="0" cy="2" r="3" fill="none" stroke={i === 1 ? AMBER : GOLD} strokeWidth="1.6" />
                  </g>
                ))}
                {f >= 146 && f < 154 && <circle cx="0" cy="6" r={14 + (f - 146) * 8} fill="none" stroke={GOLD} strokeWidth={2.4 - (f - 146) * 0.3} opacity={Math.max(0, 1 - (f - 146) / 8)} />}
              </g>
            )}
            {/* ---- HIS LICENCE, IN HIS PAW, TO F216 ---- */}
            {inPaw && (
              <g transform={`translate(${cardPx} ${cardPy}) rotate(${-8 + Math.sin(f * 0.14) * 3 + snap * 0}) scale(${cardPs})`}>
                <g transform="translate(-82 -56)">{cardFace(0, 0, false)}</g>
              </g>
            )}
            {/* ---- LANE 2's BEACON ---- */}
            {T > 0.3 && (
              <g opacity={(T - 0.3) / 0.7}>
                <rect x={lp(1000, 812)} y="232" width="34" height="38" rx="4" fill="#2b3038" stroke="#12151a" strokeWidth="1.4" />
                <circle cx={lp(1017, 829)} cy="248" r={14} fill={RED} opacity={0.35 + strobe * 0.65} />
                <circle cx={lp(1017, 829)} cy="248" r={32} fill="url(#s7rg)" opacity={strobe * 0.75} />
                {[0, 1, 2, 3].map((i) => <line key={`cg${i}`} x1={lp(1004, 816) + i * 9} y1="234" x2={lp(1004, 816) + i * 9} y2="266" stroke="#161a20" strokeWidth="1.6" />)}
                {f >= 176 && <path d={`M ${lp(1017, 829)} 248 L ${lp(1017, 829) - 320} ${248 - 90 + ((f * 9) % 260)} L ${lp(1017, 829) - 320} ${248 + 30 + ((f * 9) % 260)} Z`} fill={RED} opacity={strobe * 0.11} />}
              </g>
            )}
            {/* ---- THE OUTBOX MORTAR ---- */}
            {T > 0.3 && (
              <g opacity={(T - 0.3) / 0.7} transform={`translate(${mtx} ${mty}) rotate(${-10 + charge * 5})`}>
                <rect x="-34" y="-20" width="68" height="58" rx="7" fill="url(#s7st)" stroke="#12151a" strokeWidth="1.8" />
                <ellipse cx="0" cy="-20" rx="34" ry="11" fill="#0a0c0f" stroke="#5a626d" strokeWidth="2.4" />
                <ellipse cx="0" cy="-20" rx={24 - charge * 8} ry={8 - charge * 3} fill={charge > 0 ? '#ffd7a0' : '#12151a'} opacity={charge} />
                <circle cx="24" cy="18" r="11" fill="#e9e3d3" stroke="#2b3038" strokeWidth="1.4" />
                <line x1="24" y1="18" x2={24 + 7 * Math.sin(charge * 2.4)} y2={18 - 7 * Math.cos(charge * 2.4)} stroke={RED} strokeWidth="1.8" />
                <rect x="-38" y="34" width="76" height="10" rx="3" fill="#3a4048" />
                {charge > 0 && Array.from({ length: 6 }).map((_, i) => <circle key={`hs${i}`} cx={-38 - i * 10} cy={-18 + Math.sin(f * 0.5 + i) * 6} r={2.4 + i * 0.8} fill="#cfd6dd" opacity={charge * 0.45 * (1 - i / 6)} />)}
              </g>
            )}
          </svg>

          {/* ==================================================================== L-TIN: he does not grade anybody */}
          <div style={{ position: 'absolute', left: tinX, top: tinY, zIndex: 11, transform: `translate(-50%,-100%) scale(${lp(0.9, 1)})` }}>
            <div style={{ position: 'absolute', left: -30, top: -2, width: 60, height: 13, borderRadius: 20, background: 'rgba(0,0,0,0.5)', filter: 'blur(4px)' }} />
            <div style={{ position: 'relative', width: 54, height: 54 }}>
              <div style={{ position: 'absolute', left: tinFace > 0 ? -11 : 48, top: 24, width: 17, height: 17, transform: `rotate(${f * 6.4}deg)` }}>
                <div style={{ position: 'absolute', left: 6.5, top: 0, width: 4, height: 17, borderRadius: 2, background: grad('#e0b64a', '#8a6314') }} />
                <div style={{ position: 'absolute', left: 0, top: 6.5, width: 17, height: 4, borderRadius: 2, background: grad('#e0b64a', '#8a6314') }} />
                <div style={{ position: 'absolute', left: 4.5, top: 4.5, width: 8, height: 8, borderRadius: 4, background: '#c99b2e', border: '1px solid rgba(0,0,0,0.35)' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, filter: 'grayscale(0.82) brightness(1.12) contrast(1.06)' }}>
                <Mascot lf={lf} size={54} gaze={tinFace * 1.4} nodAmp={2.4} nodSpeed={7} />
              </div>
              <div style={{ position: 'absolute', left: 12, top: 28, width: 30, height: 20, borderRadius: 4, background: grad('#e9f04a', '#a8b012'), border: '1px solid rgba(0,0,0,0.3)' }}>
                <div style={{ position: 'absolute', left: 0, top: 6, width: 30, height: 4, background: 'rgba(230,232,236,0.85)' }} />
              </div>
              <div style={{ position: 'absolute', left: 4, top: -7, width: 44, height: 19, transform: `rotate(${Math.sin(f * 0.62) * 5}deg)`, transformOrigin: '50% 100%' }}>
                <div style={{ position: 'absolute', left: 4, top: 0, width: 36, height: 14, borderRadius: '13px 13px 3px 3px', background: grad('#3f4a57', '#1f262e'), border: '1px solid rgba(0,0,0,0.4)' }} />
                <div style={{ position: 'absolute', left: 0, top: 11, width: 44, height: 6, borderRadius: 3, background: grad('#2c343d', '#12171c') }} />
                <div style={{ position: 'absolute', left: 19, top: 2, width: 6, height: 6, borderRadius: 4, background: GOLD }} />
              </div>
              {/* his torch: light, never a grade */}
              <div style={{ position: 'absolute', left: tinFace > 0 ? 43 : 3, top: 25, width: 10, height: 6, borderRadius: 2, background: grad('#cfd6dd', '#6d757e') }} />
              <div style={{ position: 'absolute', left: tinFace > 0 ? 51 : 1, top: 28, width: 128, height: 66, transformOrigin: tinFace > 0 ? '0% 50%' : '100% 50%', transform: `translateY(-33px) scaleX(${tinFace}) rotate(${Math.sin(f * 0.07) * 7}deg)`, background: 'linear-gradient(90deg, rgba(255,232,170,0.45), rgba(255,232,170,0))', clipPath: 'polygon(0px 29px, 128px 0px, 128px 66px)', filter: 'blur(2px)', mixBlendMode: 'screen' }} />
              {/* his RED FLAG, until he gives it away */}
              {flagOnBot && (
                <div style={{ position: 'absolute', left: 26, top: -22, width: 3, height: 30, background: '#8d949e' }}>
                  <div style={{ position: 'absolute', left: 3, top: 0, width: 30, height: 18, background: `linear-gradient(120deg, ${RED}, #8f2118)`, clipPath: `polygon(0 0, 100% ${4 + Math.sin(f * 0.5) * 3}px, 100% ${14 + Math.sin(f * 0.5 + 1) * 3}px, 0 18px)`, transform: `rotate(${Math.sin(f * 0.42) * 6}deg)`, transformOrigin: '0% 50%' }} />
                </div>
              )}
            </div>
          </div>
          {/* the flag, now clipped to the empty lanyard cord of the smartest thing in the building */}
          {f >= 196 && (
            <div style={{ position: 'absolute', left: vcx - 4 + cordSwing, top: lanyY - 10, zIndex: 13, transform: `rotate(${6 + Math.sin(f * 0.3) * 7}deg)` }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: 22, background: '#8d949e' }} />
              <div style={{ position: 'absolute', left: 3, top: 0, width: 34, height: 20, background: `linear-gradient(120deg, ${RED}, #8f2118)`, clipPath: `polygon(0 0, 100% ${4 + Math.sin(f * 0.5) * 4}px, 100% ${15 + Math.sin(f * 0.5 + 1) * 4}px, 0 20px)`, boxShadow: '0 0 12px rgba(196,74,58,0.5)', transform: `rotate(${Math.sin(f * 0.42) * 7}deg)`, transformOrigin: '0% 50%' }} />
              <div style={{ position: 'absolute', left: -2, top: 0, width: 7, height: 5, borderRadius: 2, background: '#cfd6dd', border: '1px solid rgba(0,0,0,0.4)' }} />
            </div>
          )}

          {/* ==================================================================== THE DIVIDER, THE BOOMS, THE BOLLARD, THE LOOM */}
          <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0, zIndex: 14, pointerEvents: 'none' }}>
            {/* the lane divider: two lanes of the same building */}
            {T > 0.08 && (
              <g opacity={(T - 0.08) / 0.92} filter={`url(#s7soft)`}>
                <rect x={lp(1000, 476)} y="660" width="92" height="48" rx="4" fill="#4d545d" stroke="#191d24" strokeWidth="2" />
                <rect x={lp(1000, 476)} y="660" width="92" height="8" rx="3" fill="#7c848d" />
                {[6, 70].map((o, i) => <rect key={`dp${i}`} x={lp(1000, 476) + o} y="446" width="15" height="222" fill="url(#s7st)" />)}
                <rect x={lp(1000, 476) - 8} y="446" width="108" height="14" rx="6" fill="url(#s7st)" />
                <rect x={lp(1000, 476) - 8} y="450" width="108" height="3" rx="2" fill="#98a0aa" opacity="0.45" />
                <rect x={lp(1000, 476) - 4} y="540" width="100" height="10" rx="4" fill="#5f666f" />
                {[0, 1, 2, 3].map((i) => <rect key={`dn${i}`} x={lp(1000, 476) + 4 + i * 24} y={476 + seed(i * 4) * 150} width="14" height="7" rx="3" fill="#2b3038" opacity="0.8" />)}
              </g>
            )}
            {/* THE BOLLARD: the dawn bar reaches it at f120 and it throws a long hard shadow back down the lane */}
            <g opacity={1 - T} filter={`url(#s7blur)`}>
              <path d={`M 150 706 L ${150 + ramp(f, 118, 128) * 290} ${706 + ramp(f, 118, 128) * 66} L ${150 + ramp(f, 118, 128) * 300} ${730 + ramp(f, 118, 128) * 52} L 150 736 Z`} fill="#05070a" opacity={0.75 * ramp(f, 118, 130)} />
              <rect x={150 + gateX * 0.44} y="640" width="58" height="90" rx="8" fill="#4d545d" stroke="#191d24" strokeWidth="2" />
              <rect x={150 + gateX * 0.44} y="640" width="58" height="10" rx="5" fill="#7c848d" />
              <rect x={150 + gateX * 0.44} y="662" width="58" height="12" fill={GOLD} opacity="0.7" />
              <rect x={150 + gateX * 0.44} y="700" width="58" height="12" fill={GOLD} opacity="0.55" />
              <ellipse cx={179 + gateX * 0.44} cy="732" rx="34" ry="7" fill="#000" opacity="0.6" />
              {Array.from({ length: 5 }).map((_, i) => <rect key={`sf${i}`} x={152 + gateX * 0.44 + i * 11} y={690 + seed(i) * 26} width="9" height="4" fill="#2b3038" opacity="0.7" />)}
              <rect x={150 + gateX * 0.44} y="640" width="58" height="90" fill="#ffe89e" opacity={dawn * 0.22} />
            </g>
            {/* THE CABLE LOOM: it whips on the gate shudder and bounces on the swallow */}
            <g transform={`translate(0 ${shud * 2.6 + swB * 2.2})`} filter={`url(#s7blur)`} opacity="0.95">
              {[0, 1, 2, 3].map((i) => (
                <path key={`cl${i}`} d={`M ${lp(700, 560)} ${44 + i * 9} Q ${lp(850, 760)} ${96 + i * 13 + shud * 5 + swB * 4} ${1030} ${52 + i * 11}`} fill="none" stroke={['#2b3038', '#3a4048', '#242931', '#333941'][i]} strokeWidth={9 - i * 0.8} />
              ))}
              {[0, 1, 2].map((i) => <rect key={`tj${i}`} x={lp(760, 640) + i * 92} y={70 + i * 5} width="26" height="42" rx="6" fill="#b8a76a" opacity="0.8" transform={`rotate(${-14 + i * 5} ${lp(760, 640) + i * 92 + 13} ${70 + i * 5 + 21})`} />)}
              <path d={`M ${lp(880, 780)} ${98 + shud * 4 + swB * 3} q 8 ${28 + swB * 7} -4 ${44 + swB * 9}`} fill="none" stroke="#6d757e" strokeWidth="3" />
              <circle cx={lp(876, 776)} cy={142 + shud * 5 + swB * 5} r="4" fill="#8d949e" />
            </g>
            {/* LANE 1's CHEVRON BOOM: the scene's only foreground occluder. It lifts once and stays up. */}
            <g transform={`translate(${96 + gateX * 0.44} 776) rotate(${b1})`} filter={`url(#s7fg)`}>
              <rect x="0" y="-11" width="420" height="22" rx="4" fill="#e8e2d2" stroke="#232830" strokeWidth="2" />
              {Array.from({ length: 10 }).map((_, i) => <polygon key={`cv${i}`} points={`${14 + i * 42},-11 ${42 + i * 42},-11 ${28 + i * 42},11 ${0 + i * 42},11`} fill={RED} opacity={0.9 - seed(i) * 0.28} />)}
              {Array.from({ length: 5 }).map((_, i) => <rect key={`cw${i}`} x={60 + i * 78} y={-11} width={9} height={22} fill="#b6b0a1" opacity="0.5" />)}
              {Array.from({ length: 20 }).map((_, i) => <rect key={`rf${i}`} x={20 + i * 20} y="10" width="4" height="13" rx="2" fill="#1f242b" opacity="0.85" />)}
              <circle cx="-6" cy="0" r="26" fill="#3a4048" stroke="#12151a" strokeWidth="2.4" />
              <circle cx="-6" cy="0" r="12" fill="#5f666f" />
              <rect x="-34" y="-8" width="16" height="16" rx="3" fill="#2b3038" />
            </g>
            {/* LANE 2's IDENTICAL TWIN: it touches nothing. It is the sound that breaks the silence. */}
            <g transform={`translate(940 646) rotate(${b2})`} filter={`url(#s7fg)`} opacity={T}>
              <rect x="-160" y="-10" width="160" height="20" rx="4" fill="#e8e2d2" stroke="#232830" strokeWidth="2" />
              {Array.from({ length: 4 }).map((_, i) => <polygon key={`c2${i}`} points={`${-148 + i * 38},-10 ${-122 + i * 38},-10 ${-135 + i * 38},10 ${-161 + i * 38},10`} fill={RED} opacity={0.9 - seed(i * 3) * 0.25} />)}
              {Array.from({ length: 8 }).map((_, i) => <rect key={`r2${i}`} x={-152 + i * 19} y="9" width="4" height="12" rx="2" fill="#1f242b" opacity="0.85" />)}
              <circle cx="6" cy="0" r="24" fill="#3a4048" stroke="#12151a" strokeWidth="2.4" />
              <circle cx="6" cy="0" r="11" fill="#5f666f" />
              <rect x="18" y="-8" width="15" height="16" rx="3" fill="#2b3038" />
            </g>
            <defs>
              <filter id="s7blur"><feGaussianBlur stdDeviation={2.6 + mb * 0.6} /></filter>
              <filter id="s7fg"><feGaussianBlur stdDeviation={5 + mb} /></filter>
              <filter id="s7soft"><feGaussianBlur stdDeviation={2 + mb * 0.8} /></filter>
              <filter id="s7mb"><feGaussianBlur stdDeviation={mb * 0.4} /></filter>
            </defs>
          </svg>

          {/* his aura on the surface he is not standing on */}
          <div style={{ position: 'absolute', left: p2x + 16, top: lp(410, 372), zIndex: 5, opacity: 0.5 + T * 0.5 }}>
            <CodeRain lf={lf} x={0} y={0} h={lp(280, 320)} cols={3} o={f < 176 ? 0.85 : 0.5 + strobe * 0.3} gap={22} />
          </div>
        </div>

        {/* ==================================================================== L-MAIL: fired into the corner of YOUR panel */}
        {evOn && (
          <div style={{ position: 'absolute', left: interpolate(ev, [0, 1], [958, 900]), top: interpolate(ev, [0, 1], [382, 690]), width: evS, height: evS * 0.66, zIndex: 30, transform: `translate(-50%,-50%) rotate(${ev * 540}deg)`, filter: `blur(${ev * 2.4}px)` }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: evS * 0.03, background: '#F7F3EA', border: `${Math.max(1, evS * 0.012)}px solid #b9b09a`, boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: '50%', top: 0, width: evS * 0.72, height: evS * 0.72, background: '#EAE4D6', border: `${Math.max(1, evS * 0.01)}px solid #b9b09a`, transform: 'translate(-50%,-56%) rotate(45deg)' }} />
              </div>
            </div>
          </div>
        )}
        {slam > 0 && <div style={{ position: 'absolute', left: 944, top: 743, width: 40 + (1 - slam) * 340, height: 40 + (1 - slam) * 340, zIndex: 29, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: `${slam * 5}px solid rgba(196,74,58,0.6)` }} />}

        {/* THE INBOX TILE, bottom-right of YOUR panel. That is what makes it yours. */}
        <div style={{ position: 'absolute', left: 905, top: 715, width: 78, height: 56, zIndex: 28, borderRadius: 8, background: 'rgba(14,22,38,0.9)', border: `1.6px solid rgba(150,170,215,${0.3 + badge * 0.4})`, boxShadow: badge > 0 ? `0 0 ${20 * badge}px rgba(196,74,58,0.6)` : '0 6px 16px rgba(0,0,0,0.5)', transform: `scale(${1 + Math.max(0, slam) * 0.16})` }}>
          <div style={{ position: 'absolute', left: 17, top: 15, width: 44, height: 28, borderRadius: 2, background: badge > 0 ? PAPER : 'rgba(150,170,215,0.25)', border: '1.4px solid rgba(150,170,215,0.5)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 22, top: -14, width: 30, height: 30, background: badge > 0 ? '#EAE4D6' : 'transparent', border: '1.4px solid rgba(150,170,215,0.5)', transform: 'translateX(-50%) rotate(45deg)' }} />
          </div>
          {badge > 0 && (
            <div style={{ position: 'absolute', left: 54, top: 4, width: 24, height: 24, borderRadius: 12, background: RED, border: '2px solid rgba(255,220,210,0.85)', transform: `scale(${badge})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${16 * badge}px rgba(196,74,58,0.9)` }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: '#fff' }}>1</div>
            </div>
          )}
        </div>

        {/* grade + vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(120% 90% at 40% 52%, rgba(255,206,132,0.10), rgba(0,0,0,0) 44%, rgba(0,0,0,0.66) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: RED, opacity: f >= 176 ? strobe * 0.05 : 0, mixBlendMode: 'screen' }} />
      </div>
    </Panel>
  );
};

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  // ============================================================
  // ROAD CLOCK. Never slows, never stops, never ramps in.
  // ============================================================
  const SPD = 90 / 7;                     // world px per frame: one 90px record post every 7 frames
  const travel = lf * SPD;

  // the pedal's 11-frame road-joint clock. one cause, many props.
  const JOINTS = [28, 39, 50, 61, 72, 83, 94, 105, 116, 127, 138, 149, 160];
  const jointAge = JOINTS.reduce((a, j) => (lf >= j && lf - j < 11 ? lf - j : a), 99);
  const jointKick = jointAge < 11 ? Math.exp(-jointAge * 0.42) * Math.sin(jointAge * 1.05) : 0;

  // ============================================================
  // THE WALL, EXTERIOR PROJECTION
  //   ahead = frame-LEFT (the car faces left) · behind = the VP at (780,300)
  //   s = world px AHEAD of the car's nose. s falls as he drives.
  //   the whole rail is linear in g, so the crown rail / groove / plinth are straight lines.
  // ============================================================
  const VPX = 780, VPY = 300;
  const FOC = 220;
  const gE = (s: number) => FOC / (FOC - s);
  const xE = (s: number) => VPX - 530 * gE(s);          // near/driver-side rail: flip line lands at x=250
  const yE = (s: number) => VPY + 560 * gE(s);          // the ground plane
  const gOfX = (x: number) => (VPX - x) / 530;
  const farX = (g: number) => VPX + 150 * g;            // the far / right shoulder

  // post i sits at world i*90 and crosses the nose (s=0, x=250)
  const sP = (i: number) => i * 90 - travel + 62;      // post i is counted on frame 7i+4.8: i=14 at f103, i=15 at f110
  // master band m sits at world m*360 and re-reads 95% on frame 28m+8.3 (m=5 lands at f148, on the word "earns")
  const sM = (m: number) => m * 360 - travel + 107;   // band m resolves on frame 28m+8.3, always mid-gap between posts
  const iNose = Math.floor((travel - 62) / 90);
  const mNose = Math.floor((travel - 107) / 360);

  // roughly one in twenty is a fail. i=14 forced PASS (the f103 contact beat),
  // i=15 forced FAIL (the f110 post that flips a hand's width from his face).
  const isFail = (i: number) => (i === 15 ? true : i === 14 ? false : seed(i * 2.11 + 5) < 0.05);
  const flipAge = (s: number) => (s <= 0 ? -s / SPD : -1);   // frames since this post was counted

  // ============================================================
  // THE IGNITION. f44 the dawn key clears the ridge and rakes the rail alight
  // left to right. nothing arrives. it was always there.
  // ============================================================
  const waveX = interpolate(lf, [44, 62], [-260, 1240], { ...cl, easing: Easing.out(Easing.quad) });
  const litAt = (x: number) => (lf < 44 ? 0 : Math.max(0, Math.min(1, (waveX - x) / 90)));
  const rakeAt = (x: number) => Math.max(0, 1 - Math.abs(waveX - x) / 130);

  // ============================================================
  // CAMERA. no push, no zoom. matches the car exactly for 167 frames.
  // the one move is the f68-f80 shift swing, 190 degrees, through the glass.
  // ============================================================
  const sw = ramp(lf, 68, 80);
  const swE = interpolate(sw, [0, 1], [0, 1], { easing: Easing.inOut(Easing.cubic) });
  const swBlur = Math.sin(sw * Math.PI) * 11;
  const extLive = lf < 81;
  const intLive = lf > 67;
  const extO = 1 - ramp(lf, 69, 79);
  const intO = ramp(lf, 70, 80);
  const extTf = `translate(${swE * -560}px, ${swE * 210}px) scale(${1 + swE * 1.9}) rotate(${swE * -30}deg)`;
  const intTf = `translate(${(1 - swE) * 540}px, ${(1 - swE) * -170}px) scale(${1 + (1 - swE) * 2.0}) rotate(${(1 - swE) * 34}deg)`;

  // ============================================================
  // HERO. he acts four times and only four times.
  // elbow to the sill f24 · two-frame look at the dead pedal f30 · the gate f68 ·
  // the sticker (stalk f80, stalk f96, thumb f112, off f118).
  // ============================================================
  const elbow = over(lf, 24, 9, Easing.out(Easing.quad));
  const lookDown = lf >= 30 && lf < 33 ? 1 : 0;
  const gateP = over(lf, 68, 6, Easing.out(Easing.quad));
  const stalk1 = lf >= 80 && lf < 90 ? Math.sin((lf - 80) / 10 * Math.PI) : 0;
  const stalk2 = lf >= 96 && lf < 106 ? Math.sin((lf - 96) / 10 * Math.PI) : 0;
  const thumb = ramp(lf, 112, 118) * (1 - ramp(lf, 123, 131));   // the reach retracts: two nubs back on the wheel
  const stickOff = ramp(lf, 118, 122);
  const scrape = ramp(lf, 112, 118);   // the sticker's own lift does not retract with his arm
  const stickGone = lf >= 118;

  // wiper blade: sweeps the OUTSIDE of the glass and accomplishes nothing, twice
  const wipe = Math.max(stalk1, stalk2);
  const wipeA = -34 + wipe * 74;

  // ============================================================
  // THE PEDAL. found dead at f30, swinging on one wire, still swinging at f166.
  // ============================================================
  const pedalIn = lf >= 28;
  const pedalSwing = Math.sin(lf * 0.31) * 5 + jointKick * 13;

  // ============================================================
  // THE PYLONS. eleven lamps clicking out one at a time. last one mid-fade at f166.
  // ============================================================
  const pylonOn = (k: number) => 1 - ramp(lf, 6 + k * 15.4, 18 + k * 15.4);

  // ============================================================
  // THE DISPOSAL. f30 in, f38 the last glyph dies and the kit leaves the reel.
  // ============================================================
  const skipP = ramp(lf, 30, 38);
  const skipLive = lf >= 29 && lf < 39;
  const skipG = interpolate(lf, [29, 34, 39], [0.30, 0.62, 1.15], cl);
  const skipX = farX(skipG) + interpolate(lf, [29, 39], [-150, 150], cl);
  const skipS = skipG * 1.7;
  const shadesPop = lf >= 34 && lf < 36 ? 1 : 0;

  // ============================================================
  // THE SHOULDER. one figure, one gag, held f44 to f70. the only body that enters.
  // ============================================================
  const insLive = lf >= 43 && lf < 71;
  const insG = interpolate(lf, [43, 52, 60, 70], [0.60, 0.50, 0.42, 0.30], cl);  // staged back, receding
  const insX = farX(insG);                                              // FAR / right shoulder, clear of the car
  const insY = VPY + 560 * insG;                                        // ON the ground plane, not floating
  const insS = insG * 1.72;
  // two stomps on the rhythm f52-f60, then the boot freezes mid-air at f64 and never comes down
  const bootY = lf < 52 ? 26 : lf < 64
    ? [52, 57].reduce((a, t) => (lf >= t && lf - t < 5 ? 26 - (1 - Math.abs((lf - t) / 5 - 0.5) * 2) * 26 : a), 26)
    : 30 + Math.sin(lf * 0.4) * 0.6;
  const tileIn = over(lf, 60, 5, Easing.out(Easing.back(2.4)));
  const insGaze = lf >= 62 ? 0.7 : -0.3;

  // ============================================================
  // THE MANUAL. f149 one road joint does two jobs. still sliding at f166.
  // ============================================================
  const gbox = over(lf, 149, 7, Easing.out(Easing.quad));
  const manP = over(lf, 151, 22, Easing.out(Easing.quad));

  // atmosphere
  const grit = Array.from({ length: 34 }, (_, i) => {
    const r = seed(i * 2.7 + 3), r2 = seed(i * 5.1 + 9);
    const sp = 26 + r * 66;
    return { x: ((r2 * 1500 + lf * sp) % 1500) - 240, y: 80 + r * 700, l: 26 + r2 * 120, o: 0.09 + r * 0.24 };
  });
  const motes = Array.from({ length: 26 }, (_, i) => {
    const r = seed(i * 1.9 + 21), r2 = seed(i * 4.3 + 6);
    return { x: 90 + r * 800 + Math.sin(lf * 0.026 + r * 9) * 22, y: 110 + ((r2 * 640 + lf * (0.4 + r * 0.7)) % 640), s: 1 + r2 * 2.4, o: 0.1 + r * 0.24 };
  });
  // ---------- one record post, exterior ----------
  // the wall IS the graph: a PASS stands tall with a green cap ABOVE the red 90 groove,
  // a FAIL is a short post with a red cap sitting UNDER it. roughly one in twenty is red.
  const postE = (i: number, fg = false) => {
    const s = sP(i);
    if (s > 105 || s < -5600) return null;
    if (fg ? s <= 0 : s > 0) return null;   // the wall is between the lens and the car: near posts occlude it
    const g = gE(s), x = xE(s), yb = yE(s);
    if (x < -180 || x > 776) return null;
    const fail = isFail(i);
    const H = fail ? 330 : 530;
    const w = 44 * g;
    const top = yb - H * g;
    const age = flipAge(s);
    const counted = age >= 0;
    const li = counted ? litAt(x) : 0;
    const pop = counted && age < 6 ? 1 - age / 6 : 0;
    const capC = fail ? RED : GREEN;
    const drumT = yb - (H - 16) * g, drumB = yb - (H - 96) * g;
    const near = g > 0.95;
    return (
      <g key={"p" + i}>
        {/* motion smear of the near picket */}
        {near ? <rect x={x - w * 1.4} y={top} width={w * 2.4} height={yb - top} fill="#05070B" opacity={0.4} /> : null}
        {/* concrete shaft, chipped enamel, hairline moss in the joint */}
        <rect x={x - w / 2} y={top} width={w} height={yb - top} fill={near ? "#05070B" : "#1C222D"} />
        {!near ? (
          <>
            <rect x={x - w / 2} y={top} width={w * 0.32} height={yb - top} fill="#2E3745" />
            <rect x={x + w * 0.16} y={top} width={w * 0.34} height={yb - top} fill="#0B0E14" opacity="0.65" />
            <rect x={x - w / 2} y={top + 60 * g} width={w} height={4 * g} fill="#4A5262" opacity="0.5" />
            <rect x={x - w / 2} y={yb - 26 * g} width={w} height={4 * g} fill="#3E5340" opacity={0.5 * li} />
          </>
        ) : null}
        {/* cast housing + rolling brass odometer drum */}
        {g > 0.06 ? (
          <g>
            <rect x={x - w * 0.66} y={drumT} width={w * 1.32} height={drumB - drumT} rx={3 * g} fill={near ? "#05070B" : "#141922"} stroke="#080B10" strokeWidth={Math.max(0.4, 1.2 * g)} />
            {!near ? (
              <>
                <rect x={x - w * 0.5} y={drumT + 5 * g} width={w} height={drumB - drumT - 10 * g} fill={li > 0.2 ? "#8A6A34" : "#20262F"} />
                {li > 0.2 && g > 0.14 ? <rect x={x - w * 0.5} y={drumT + 5 * g} width={w} height={(drumB - drumT - 10 * g) * 0.42} fill="#C69A48" /> : null}
                {/* THE FLIP: the drum rolls over on the exact frame his nose reaches the post */}
                {pop > 0 && g > 0.16 ? <rect x={x - w * 0.5} y={drumT + 5 * g} width={w} height={drumB - drumT - 10 * g} fill="#F6E2A8" opacity={pop * 0.75} /> : null}
              </>
            ) : null}
          </g>
        ) : null}
        {/* the result cap, and the cap-light that doubles the chock */}
        <rect x={x - w * (fail ? 1.05 : 0.85)} y={top - 26 * g} width={w * (fail ? 2.1 : 1.7)} height={26 * g} rx={3 * g} fill={near ? "#05070B" : li > 0.15 ? capC : "#161B24"} />
        {li > 0.15 && !near ? (
          <>
            <rect x={x - w * (fail ? 1.05 : 0.85)} y={top - 26 * g} width={w * (fail ? 2.1 : 1.7)} height={7 * g} fill="#FFF" opacity={0.34} />
            <ellipse cx={x} cy={top - 13 * g} rx={w * (1.3 + pop * 2.4)} ry={22 * g * (1 + pop * 1.7)} fill={capC} opacity={(0.3 + pop * 0.5) * li} />
          </>
        ) : null}
        {/* the brass chock: one hard tick per post */}
        {pop > 0.55 && g > 0.3 && !near ? <rect x={x - w * 0.9} y={yb - 6 * g} width={w * 1.8} height={6 * g} fill="#C69A48" opacity={pop * 0.8} /> : null}
      </g>
    );
  };

  // ---------- one decommissioned instructor stand, exterior ----------
  const standE = (i: number, fg = false) => {
    const s = sP(i) + 45;
    if (s > 105 || s < -3400) return null;
    if (fg ? s <= 0 : s > 0) return null;
    const g = gE(s);
    const x = VPX - 620 * g, yb = VPY + 560 * g;
    if (x < -180 || x > 776) return null;
    const w = 26 * g, H = 300;
    const top = yb - H * g;
    const bracket = seed(i * 7.9 + 2) > 0.55;
    return (
      <g key={"st" + i}>
        <ellipse cx={x} cy={yb} rx={w * 1.6} ry={4 * g} fill="#000" opacity={0.5} />
        <rect x={x - w / 2} y={top} width={w} height={yb - top} fill="#080B10" />
        {/* sheared bolt-flange top, two bolts gone */}
        <rect x={x - w * 1.05} y={top - 7 * g} width={w * 2.1} height={7 * g} fill="#080B10" />
        <rect x={x - w * 0.72} y={top - 11 * g} width={w * 0.3} height={5 * g} fill="#080B10" />
        <rect x={x + w * 0.42} y={top - 11 * g} width={w * 0.3} height={5 * g} fill="#080B10" />
        {/* some still wearing an empty bracket where a second brake used to bolt on */}
        {bracket && g > 0.1 ? (
          <path d={`M ${x - w * 0.9} ${top - 7 * g} l 0 ${-26 * g} l ${w * 1.8} 0 l 0 ${26 * g}`} stroke="#080B10" strokeWidth={Math.max(0.7, 5 * g)} fill="none" />
        ) : null}
      </g>
    );
  };

  // ---------- one master band on the crown rail, exterior ----------
  const bandE = (m: number, fg = false) => {
    const s = sM(m);
    if (s > 120 || s < -1900) return null;
    if (fg ? s <= 0 : s > 0) return null;
    const g = gE(s), x = xE(s), yb = yE(s);
    if (x < -260 || x > 772) return null;
    const li = litAt(x);
    const bw = 140 * g, bh = 80 * g;
    const by = yb - 510 * g;   // sits ON the crown rail, its foot at the groove
    // the ones drum never sits still: micro-rolls and reseats forever, one notch per flip
    const roll = Math.sin(lf * 0.44) * 1.6 + (flipAge(sP(iNose)) < 4 ? (4 - flipAge(sP(iNose))) * 1.5 : 0);
    return (
      <g key={"mb" + m} opacity={Math.min(1, g * 5)}>
        {/* the gantry leg carrying the band */}
        <rect x={x - 5 * g} y={by + bh} width={10 * g} height={yb - by - bh} fill="#0D1017" opacity={0.85} />
        {/* dark green enamel housing */}
        <rect x={x - bw / 2} y={by} width={bw} height={bh} rx={5 * g} fill="#1D3A2C" stroke="#0B1611" strokeWidth={Math.max(0.6, 2 * g)} />
        <rect x={x - bw / 2} y={by} width={bw} height={7 * g} fill="#2F5C46" />
        {/* four brass digits, bone-white stencil frame */}
        <rect x={x - bw * 0.42} y={by + 13 * g} width={bw * 0.84} height={bh - 26 * g} rx={3 * g} fill="#0B0E13" />
        {g > 0.1 ? [0, 1, 2, 3].map((d) => {
          const dw = bw * 0.19, dx = x - bw * 0.39 + d * dw * 1.06;
          const dy = by + 15 * g + (d === 1 ? roll * g * 0.6 : 0);
          return (
            <g key={"d" + d}>
              <rect x={dx} y={by + 15 * g} width={dw} height={bh - 30 * g} rx={2 * g} fill={li > 0.2 ? "#B48C40" : "#242A33"} />
              <rect x={dx} y={by + 15 * g} width={dw} height={(bh - 30 * g) * 0.42} fill={li > 0.2 ? "#DCB367" : "#2C333D"} />
              {li > 0.2 && g > 0.2 ? (
                <text x={dx + dw / 2} y={dy + bh * 0.68} fill="#20180A" fontFamily={mono} fontWeight={700} fontSize={46 * g} textAnchor="middle">
                  {["9", "5", "%", ""][d]}
                </text>
              ) : null}
            </g>
          );
        }) : null}
        {/* the dawn rake on the brass */}
        {rakeAt(x) > 0 ? <rect x={x - bw / 2} y={by} width={bw} height={bh} rx={5 * g} fill="#FFE9BC" opacity={rakeAt(x) * 0.7} /> : null}
      </g>
    );
  };
  // ---------- the departure gantry + the checkpoint boom rip in from AHEAD (frame-left) ----------
  const apr = (hit: number) => {
    const t = ramp(lf, hit - 18, hit + 3);
    const e = Math.pow(t, 2.6);
    return { x: 232 - e * 420, y: 200 - e * 380, s: 0.26 + e * 4.2, o: 1 - ramp(lf, hit - 1, hit + 3) };
  };
  const gan = apr(18);
  const boom = apr(22);
  const cwBoing = lf >= 18 && lf < 34 ? Math.exp(-(lf - 18) * 0.15) * Math.sin((lf - 18) * 0.9) * 9 : 0;

  const wheelR = travel * 1.5;
  const bodyJig = jointKick * 2.2 + Math.sin(lf * 0.5) * 0.5;

  // defs live in their own always-mounted svg: the interior still needs them after the exterior unmounts
  const DEFS = (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="s8sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141A2B" /><stop offset="0.5" stopColor="#3E4059" /><stop offset="0.86" stopColor="#B4744C" /><stop offset="1" stopColor="#F2C078" />
        </linearGradient>
        <linearGradient id="s8tar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B3140" /><stop offset="0.34" stopColor="#1A1F29" /><stop offset="1" stopColor="#0B0E14" />
        </linearGradient>
        {/* the OPEN ROAD surface: a lit asphalt plane, warm+bright at the dawn horizon, never black at the
            near edge. this is the ground the car DRIVES ON, so it must read as road, not as a dark apron. */}
        <linearGradient id="s8road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C4234" /><stop offset="0.16" stopColor="#3C3A40" /><stop offset="0.58" stopColor="#2E313A" /><stop offset="1" stopColor="#23262E" />
        </linearGradient>
        {/* the dawn band pooled along the skyline where the road runs to */}
        <linearGradient id="s8hzglow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2C078" stopOpacity="0" /><stop offset="1" stopColor="#F6C878" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="s8body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F0E5" /><stop offset="0.55" stopColor="#DCD2C2" /><stop offset="1" stopColor="#8E8474" />
        </linearGradient>
        <linearGradient id="s8chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EDF1F6" /><stop offset="0.5" stopColor="#9AA5B4" /><stop offset="1" stopColor="#4E5764" />
        </linearGradient>
        <radialGradient id="s8sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF3D2" stopOpacity="1" /><stop offset="0.4" stopColor="#F6C069" stopOpacity="0.7" /><stop offset="1" stopColor="#F6C069" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s8cold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5C7FC4" stopOpacity="0.34" /><stop offset="1" stopColor="#5C7FC4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="s8warm" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#FFD79A" stopOpacity="0.42" /><stop offset="1" stopColor="#FFD79A" stopOpacity="0" />
        </linearGradient>
        <clipPath id="s8win"><rect x="0" y="186" width="270" height="384" /></clipPath>
        <clipPath id="s8scr"><path d="M 312 96 L 856 96 L 856 470 L 312 470 Z" /></clipPath>
        {/* the dawn pooling on the tarmac directly under the car: this ground now reads as ROAD, not shoulder */}
        <radialGradient id="s8roadglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6B5C42" stopOpacity="0.9" /><stop offset="0.55" stopColor="#453C2C" stopOpacity="0.52" /><stop offset="1" stopColor="#453C2C" stopOpacity="0" />
        </radialGradient>
        {/* the soft warm key that haloes the focal subject and lifts it off the dimmed wall */}
        <radialGradient id="s8key" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9BC" stopOpacity="0.5" /><stop offset="0.5" stopColor="#FFD79A" stopOpacity="0.2" /><stop offset="1" stopColor="#FFD79A" stopOpacity="0" />
        </radialGradient>
        {/* the recede: softens + desaturates the record wall so it stays rich but stops competing */}
        <filter id="s8recede" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" /><feColorMatrix type="saturate" values="0.55" />
        </filter>
        {/* the focal vignette that quiets the corners and holds the eye on the car */}
        <radialGradient id="s8vig" cx="0.5" cy="0.53" r="0.72">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#0A0C11" stopOpacity="0.44" />
        </radialGradient>
        {/* the far fence band: the whole 95pct wall is clipped to a thin dim ribbon on the horizon */}
        <clipPath id="s8fence"><rect x="0" y="298" width="1012" height="54" /></clipPath>
      </defs>
    </svg>
  );

  // the single horizon the whole open-road shot is built on. sky above it, road below it, car ON it.
  const HZ = 332;
  const EXT_BG = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* ---- DAWN SKY: one clean gradient, a low sun on the right, soft ridges on the far horizon ---- */}
      <rect x="0" y="62" width="1012" height={HZ - 62} fill="url(#s8sky)" />
      <circle cx="812" cy={HZ - 34 - ramp(lf, 34, 52) * 12} r="150" fill="url(#s8sun)" opacity={0.5 + ramp(lf, 34, 52) * 0.5} />
      <circle cx="812" cy={HZ - 34 - ramp(lf, 34, 52) * 12} r="30" fill="#FFF6DE" opacity={0.55 + ramp(lf, 34, 52) * 0.45} />
      {/* the dawn band pooling along the skyline, brightening as the sun clears the ridge at f44 */}
      <rect x="0" y={HZ - 62} width="1012" height="62" fill="url(#s8hzglow)" opacity={0.5 + ramp(lf, 34, 58) * 0.4} />
      {/* soft distant ridges sitting on the horizon */}
      <path d={`M 556 ${HZ} L 636 ${HZ - 26} L 700 ${HZ - 12} L 792 ${HZ - 40} L 872 ${HZ - 18} L 948 ${HZ - 36} L 1012 ${HZ - 24} L 1012 ${HZ} Z`} fill="#1A2130" opacity="0.72" />
      <path d={`M 0 ${HZ} L 96 ${HZ - 20} L 190 ${HZ - 8} L 300 ${HZ - 32} L 402 ${HZ - 12} L 486 ${HZ - 26} L 556 ${HZ} Z`} fill="#131A27" opacity="0.74" />

      {/* ---- THE OPEN ROAD: a clean, lit asphalt plane the car sits ON and drives ALONG. the horizon
              is BEHIND it, the surface is BENEATH the wheels, the dawn pools warm toward the skyline.
              one read on mute: a car driving free down an open road at dawn. ---- */}
      <rect x="0" y={HZ} width="1012" height={792 - HZ} fill="url(#s8road)" />
      {/* the far edge of the road where it meets the dawn-lit land */}
      <rect x="0" y={HZ} width="1012" height="4" fill="#6A5A40" opacity={0.5 + ramp(lf, 34, 52) * 0.3} />
      <rect x="0" y={HZ + 4} width="1012" height="2" fill="#E7D6AE" opacity={0.26 + ramp(lf, 34, 52) * 0.28} />
      {/* dawn warmth washed across the tarmac from the sun side */}
      <rect x="0" y={HZ} width="1012" height={792 - HZ} fill="url(#s8warm)" opacity={0.2 + ramp(lf, 34, 58) * 0.2} />

      {/* SPEED STREAKS on the road surface: horizontal, streaming LEFT the way he drives, and by parallax
          faster + longer + brighter near the camera. this is the forward motion, unmistakable. */}
      {Array.from({ length: 30 }, (_, k) => {
        const r = seed(k * 2.7 + 3), r2 = seed(k * 5.1 + 9);
        const depth = r;                                   // 0 far (skyline) .. 1 near (bottom of frame)
        const y = HZ + 22 + depth * (792 - HZ - 30);
        const sp = 3 + depth * 12;
        const total = 1500;
        const x = (((k * 96 - travel * sp) % total) + total) % total - 240;
        const len = (40 + r2 * 150) * (0.5 + depth);
        return <rect key={"rs" + k} x={x} y={y} width={len} height={1.2 + depth * 2.4} rx={1.4} fill="#FFE9BC" opacity={(0.06 + r2 * 0.16) * (0.4 + depth * 0.7)} />;
      })}

      {/* THE CENTRE LANE the car holds: cream dashes running horizontally right at the wheel line and
          streaming LEFT under the car. the body sits over them, so the road is plainly UNDER him. */}
      {Array.from({ length: 10 }, (_, k) => {
        const total = 1360;
        const x = (((k * 170 - travel * 3.6) % total) + total) % total - 160;
        return (
          <g key={"cl" + k}>
            <rect x={x} y={712} width={96} height={15} rx={6} fill="#EEE0BD" opacity={0.62} />
            <rect x={x} y={712} width={96} height={5} rx={3} fill="#FFF6DE" opacity={0.42} />
          </g>
        );
      })}

      {/* ---- THE RECORD WALL, demoted to a SMALL, DIM, FLAT fence far off on the skyline. no perspective,
              no vanishing point (that receding rail was reading as a second road), just a quiet horizontal
              row of pass/fail ticks and a couple of 95pct plates drifting slowly by. callback kept,
              competition killed. ---- */}
      <g opacity={0.32} filter="url(#s8recede)">
        <rect x="0" y={HZ - 44} width="1012" height="2" fill="#2F5C46" opacity="0.6" />
        {Array.from({ length: 44 }, (_, k) => {
          const total = 2600;
          const x = (((k * 60 - travel * 0.7) % total) + total) % total - 140;
          if (x < -30 || x > 1042) return null;
          const fail = seed(k * 2.11 + 5) < 0.08;
          const h = fail ? 13 : 24;
          return (
            <g key={"fw" + k}>
              <rect x={x} y={HZ - h} width={5} height={h} fill="#233028" />
              <rect x={x - 2} y={HZ - h - 3} width={9} height={3} rx={1} fill={fail ? RED : GREEN} opacity="0.7" />
            </g>
          );
        })}
        {Array.from({ length: 4 }, (_, k) => {
          const total = 2600;
          const x = (((k * 640 + 150 - travel * 0.7) % total) + total) % total - 140;
          if (x < -60 || x > 1030) return null;
          return (
            <g key={"fp" + k}>
              <rect x={x} y={HZ - 42} width={50} height={22} rx={3} fill="#1D3A2C" stroke="#0B1611" strokeWidth="1" />
              <rect x={x} y={HZ - 42} width={50} height={6} rx={3} fill="#2F5C46" />
              <text x={x + 25} y={HZ - 25} fill="#B48C40" fontFamily={mono} fontWeight={700} fontSize="12" textAnchor="middle">95%</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
  // ---------- MIDGROUND: the far shoulder. the PROPERTY skip, then the instructor. ----------
  const EXT_MID = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* THE CUT CHAIN: S0's padlock chain in the gravel, sheared clean through one link */}
      {(() => {
        const s = -(travel - 34 * SPD) + 40;
        const g = gE(s);
        if (g > 2.6 || g < 0.06) return null;
        const x = xE(s), y = yE(s) - 176 * g;
        return (
          <g opacity={0.9}>
            {Array.from({ length: 9 }, (_, k) => (
              <ellipse key={k} cx={x - 60 * g + k * 15 * g} cy={y + Math.sin(k * 1.3) * 5 * g} rx={9 * g} ry={6 * g} fill="none" stroke="#3C4350" strokeWidth={3.4 * g} />
            ))}
            {/* the cut face, still bright */}
            <rect x={x + 74 * g} y={y - 5 * g} width={7 * g} height={10 * g} fill="#E8EEF6" opacity={0.95} />
            <rect x={x + 84 * g} y={y - 3 * g} width={11 * g} height={6 * g} fill="#3C4350" />
          </g>
        );
      })()}

      {/* THE PROPERTY SKIP: the authority took it, flattened it, put it out with the bins. f30 to f38. */}
      {skipLive ? (
        <g opacity={1 - ramp(lf, 37, 39)}>
          <ellipse cx={skipX} cy={330 + 44 * skipS} rx={130 * skipS} ry={11 * skipS} fill="#000" opacity="0.5" />
          {/* dented steel body, dark green enamel */}
          <polygon points={`${skipX - 118 * skipS},${330 + 44 * skipS} ${skipX + 118 * skipS},${330 + 44 * skipS} ${skipX + 98 * skipS},${330 - 62 * skipS} ${skipX - 98 * skipS},${330 - 62 * skipS}`} fill="#1D3A2C" stroke="#0B1611" strokeWidth={2.4 * skipS} />
          <polygon points={`${skipX - 98 * skipS},${330 - 62 * skipS} ${skipX + 98 * skipS},${330 - 62 * skipS} ${skipX + 92 * skipS},${330 - 54 * skipS} ${skipX - 92 * skipS},${330 - 54 * skipS}`} fill="#2F5C46" />
          {/* dents */}
          <path d={`M ${skipX - 60 * skipS} ${330 - 40 * skipS} q ${14 * skipS} ${18 * skipS} ${30 * skipS} ${2 * skipS}`} stroke="#0F2018" strokeWidth={3 * skipS} fill="none" />
          <path d={`M ${skipX + 26 * skipS} ${330 - 16 * skipS} q ${16 * skipS} ${14 * skipS} ${34 * skipS} ${-4 * skipS}`} stroke="#0F2018" strokeWidth={2.4 * skipS} fill="none" />
          {/* bone-white stencilled authority seal, NO WORDS */}
          <g opacity="0.9">
            <circle cx={skipX} cy={330 - 12 * skipS} r={24 * skipS} fill="none" stroke="#E6E2D8" strokeWidth={2.6 * skipS} />
            <circle cx={skipX} cy={330 - 12 * skipS} r={16 * skipS} fill="none" stroke="#E6E2D8" strokeWidth={1.4 * skipS} />
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x={skipX - 1.5 * skipS} y={330 - 34 * skipS} width={3 * skipS} height={7 * skipS} fill="#E6E2D8" transform={`rotate(${k * 45} ${skipX} ${330 - 12 * skipS})`} />)}
            <rect x={skipX - 7 * skipS} y={330 - 19 * skipS} width={14 * skipS} height={14 * skipS} fill="#E6E2D8" />
          </g>
          {/* lid up on a bent hinge, standing 1.5m so it reads as a silhouette in four frames */}
          <g transform={`rotate(-104 ${skipX + 98 * skipS} ${330 - 62 * skipS})`}>
            <rect x={skipX + 98 * skipS} y={330 - 70 * skipS} width={196 * skipS} height={9 * skipS} fill="#16281F" stroke="#0B1611" strokeWidth={1.6 * skipS} />
          </g>
          <rect x={skipX + 92 * skipS} y={330 - 70 * skipS} width={12 * skipS} height={10 * skipS} fill="#4A5262" />

          {/* THE KIT, tipped out into the dust at its foot. texture, not a body. */}
          {/* the #A8B84A spool, whipping in the slipstream: the only part built to read in eight frames */}
          <path
            d={`M ${skipX - 60 * skipS} ${330 + 40 * skipS} q ${60 * skipS} ${-26 * skipS + Math.sin(lf * 0.8) * 14 * skipS} ${130 * skipS} ${-6 * skipS} q ${64 * skipS} ${20 * skipS + Math.sin(lf * 0.8 + 2) * 16 * skipS} ${140 * skipS} ${-14 * skipS}`}
            stroke={FAKE} strokeWidth={9 * skipS} fill="none" strokeLinecap="round" opacity="0.95"
          />
          <path
            d={`M ${skipX - 60 * skipS} ${330 + 40 * skipS} q ${60 * skipS} ${-26 * skipS + Math.sin(lf * 0.8) * 14 * skipS} ${130 * skipS} ${-6 * skipS} q ${64 * skipS} ${20 * skipS + Math.sin(lf * 0.8 + 2) * 16 * skipS} ${140 * skipS} ${-14 * skipS}`}
            stroke="#D9EA72" strokeWidth={2.4 * skipS} fill="none" strokeLinecap="round" opacity="0.7"
          />
          <circle cx={skipX - 62 * skipS} cy={330 + 40 * skipS} r={13 * skipS} fill="#8FA03C" stroke="#3C4614" strokeWidth={1.6 * skipS} />
          <circle cx={skipX - 62 * skipS} cy={330 + 40 * skipS} r={4 * skipS} fill="#3C4614" />

          {/* THE SHADES IN THE DUST: one 2-frame specular pop at f34. texture. it carries nothing. */}
          <g>
            <rect x={skipX - 22 * skipS} y={330 + 32 * skipS} width={44 * skipS} height={10 * skipS} rx={3 * skipS} fill="#0B0D11" transform={`rotate(-16 ${skipX} ${330 + 37 * skipS})`} />
            <rect x={skipX - 4 * skipS} y={330 + 28 * skipS} width={2 * skipS} height={14 * skipS} fill="#2A2E36" transform={`rotate(-16 ${skipX} ${330 + 37 * skipS})`} />
            {shadesPop ? (
              <>
                <rect x={skipX - 18 * skipS} y={330 + 33 * skipS} width={16 * skipS} height={3 * skipS} fill="#FFFFFF" transform={`rotate(-16 ${skipX} ${330 + 37 * skipS})`} />
                <ellipse cx={skipX - 10 * skipS} cy={330 + 35 * skipS} rx={26 * skipS} ry={9 * skipS} fill="#FFF6DE" opacity="0.75" />
              </>
            ) : null}
          </g>
          {/* dust kicked off the spill */}
          {Array.from({ length: 9 }, (_, k) => {
            const r = seed(k * 3.9 + 4);
            return <circle key={k} cx={skipX - 40 * skipS + r * 180 * skipS - skipP * 90} cy={330 + 30 * skipS - ((lf * 2 + r * 30) % 34) * skipS} r={(1.6 + r * 3) * skipS} fill="#8E8474" opacity={0.34 * (1 - skipP * 0.4)} />;
          })}
        </g>
      ) : null}
    </svg>
  );

  // THE DYING CODE-RAIN over the skip. his aura is always on, so it is on, and it is burning out.
  // 4 glyphs tall. the last glyph dies at f38, on the exact frame the kit leaves the reel forever.
  const EXT_RAIN = skipLive ? (
    <div style={{ position: "absolute", left: skipX - 46 * skipS, top: 330 - 178 * skipS, opacity: 1 - ramp(lf, 35, 38) }}>
      <CodeRain lf={lf} x={0} y={0} h={150 * skipS} cols={3} o={(1 - skipP * 0.75)} gap={30 * skipS} />
    </div>
  ) : null;

  // ---------- THE PHANTOM BRAKE STAND: the only figure that enters this scene ----------
  const EXT_INSTRUCTOR = insLive ? (
    <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - ramp(lf, 68, 71) }}>
      <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
        {/* the worn pedal-shaped bare patch in the gravel. the absence is the gag. */}
        <ellipse cx={insX} cy={insY + 4 * insS} rx={38 * insS} ry={9 * insS} fill="#8E8474" opacity="0.8" />
        <ellipse cx={insX} cy={insY + 4 * insS} rx={26 * insS} ry={5.5 * insS} fill="#B6AA95" opacity="0.85" />
        <ellipse cx={insX} cy={351 + 4 * insS} rx={19 * insS} ry={3.6 * insS} fill="#CFC4AE" opacity="0.7" />
        <ellipse cx={insX - 8 * insS} cy={356 + 4 * insS} rx={54 * insS} ry={7 * insS} fill="#000" opacity="0.35" />
      </svg>
      <div style={{ position: "absolute", left: insX - 46 * insS, top: insY - 92 * insS, width: 92 * insS }}>
        <Mascot lf={lf} size={92 * insS} tint="#B9B7AE" hiVis={1} capBack={1} gaze={insGaze} nodAmp={0.8} nodSpeed={0.9} stern={lf < 62 ? 1 : 0} />
      </div>
      <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
        {/* the orange hi-vis cap band + the gold YOU tag */}
        <rect x={insX - 32 * insS} y={insY - 88 * insS} width={64 * insS} height={9 * insS} fill="#E07A28" />
        <g>
          <rect x={insX + 6 * insS} y={insY - 52 * insS} width={30 * insS} height={13 * insS} rx={6 * insS} fill={GOLD} stroke={INK} strokeWidth={1.2 * insS} />
          <text x={insX + 21 * insS} y={insY - 42 * insS} fill={INK} fontFamily={mono} fontSize={8 * insS} fontWeight={700} textAnchor="middle" letterSpacing="0.8">YOU</text>
        </g>
        {/* clipboard clamped under one arm, unread */}
        <g transform={`rotate(-14 ${insX - 44 * insS} ${insY - 44 * insS})`}>
          <rect x={insX - 60 * insS} y={insY - 62 * insS} width={30 * insS} height={38 * insS} rx={2 * insS} fill="#D9CFB6" stroke={INK} strokeWidth={1.3 * insS} />
          <rect x={insX - 54 * insS} y={insY - 66 * insS} width={18 * insS} height={6 * insS} rx={2 * insS} fill="#7E8896" />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={insX - 56 * insS} y={insY - 52 * insS + k * 7 * insS} width={22 * insS} height={2 * insS} fill={MUTE} opacity="0.7" />)}
        </g>
        {/* the leg + one comically oversized boot, stomping a brake pedal that is not there */}
        <path d={`M ${insX + 16 * insS} ${insY - 22 * insS} q ${12 * insS} ${20 * insS} ${-2 * insS} ${(34 - bootY) * insS}`} stroke="#B9B7AE" strokeWidth={13 * insS} fill="none" strokeLinecap="round" />
        <g transform={`translate(${insX + 6 * insS} ${insY - bootY * insS - 4 * insS}) scale(${insS})`}>
          <rect x={-12} y={-10} width={26} height={24} rx={5} fill="#3A424E" stroke={INK} strokeWidth="2" />
          <path d="M -20 14 q 0 -5 8 -5 l 30 0 q 12 0 12 11 l 0 6 q 0 5 -7 5 l -36 0 q -7 0 -7 -7 z" fill="#2B323C" stroke={INK} strokeWidth="2" />
          <rect x={-20} y={26} width={50} height={6} rx={3} fill="#0D1016" />
          {[0, 1, 2].map((k) => <rect key={k} x={-9 + k * 2} y={-6 + k * 7} width={22} height={2.6} rx={1.3} fill="#E4C43A" opacity="0.6" />)}
        </g>
        {/* the air the boot displaces, going nowhere */}
        {lf >= 52 && lf < 64 && bootY < 12 ? Array.from({ length: 5 }, (_, k) => (
          <ellipse key={k} cx={insX + 6 * insS} cy={(insY + 6 + k * 5) * 1} rx={(16 + k * 11) * insS} ry={(3 + k * 1.6) * insS} fill="none" stroke="#CFC4AE" strokeWidth={1.2 * insS} opacity={0.4 - k * 0.07} />
        )) : null}

        {/* THE INBOX TILE. f60 PLOINK. the same broadcast, landing in a second recipient's tile. */}
        {tileIn > 0 ? (
          <g transform={`translate(${insX - 62 * insS} ${insY - 30 * insS - tileIn * 8 * insS}) scale(${insS * tileIn})`}>
            <rect x={-26} y={-22} width={52} height={44} rx={7} fill="#F7F3EA" stroke={INK} strokeWidth="2" />
            <rect x={-26} y={-22} width={52} height={11} rx={7} fill="#26314A" />
            {/* the tile face carries the same rolling brass 95% the wall is carrying */}
            <rect x={-20} y={-6} width={40} height={20} rx={3} fill="#0B0E13" />
            <rect x={-18} y={-4} width={36} height={16} fill="#B48C40" />
            <rect x={-18} y={-4} width={36} height={7} fill="#DCB367" />
            <text x={0} y={9} fill="#20180A" fontFamily={mono} fontWeight={700} fontSize={11} textAnchor="middle">95%</text>
            <rect x={-18} y={-4 + ((lf * 0.9) % 16)} width={36} height={1.4} fill="#F0D48E" opacity="0.6" />
            {/* the red (1) badge, exactly as S7 left it */}
            <circle cx={24} cy={-20} r={9} fill={RED} stroke="#FFF" strokeWidth="1.6" />
            <text x={24} y={-16} fill="#FFF" fontFamily={mono} fontWeight={700} fontSize={10} textAnchor="middle">1</text>
          </g>
        ) : null}
      </svg>
    </div>
  ) : null;
  // ---------- THE KEY. this is the re-rank. a warm pool of dawn puts the car ON the road (not the
  //            shoulder), a bright centre lane streams UNDER it toward the lens for unmistakable forward
  //            motion, and a soft halo lifts it clear of the dimmed wall. one read: a car driving free. ----------
  const EXT_KEY = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* the warm halo that lifts the car clear and gives it the whole road to itself */}
      <ellipse cx={478} cy={548} rx={392} ry={276} fill="url(#s8key)" />
      {/* dawn pooling on the lane directly under the car: it plants him ON the road */}
      <ellipse cx={478} cy={706} rx={392} ry={104} fill="url(#s8roadglow)" />
    </svg>
  );

  // ---------- THE LEARNER CAR. the reel's only car, per the clarity mandate. now silently plateless. ----------
  const EXT_CAR = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(64 ${54 + bodyJig})`}>
        {/* 400px cast shadow thrown left across the tarmac by the low key from frame-right */}
        <ellipse cx={368} cy={648} rx={330} ry={26} fill="#000" opacity="0.55" />
        <polygon points="150,660 620,660 470,690 60,684" fill="#000" opacity="0.28" />
        {/* wheels, finally turning */}
        {[272, 566].map((cx) => (
          <g key={"w" + cx}>
            <circle cx={cx} cy="618" r="47" fill="#0C0F14" stroke="#000" strokeWidth="2" />
            <circle cx={cx} cy="618" r="23" fill="#485062" />
            <g transform={`rotate(${wheelR} ${cx} 618)`}>
              {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={cx - 2} y={600} width={4} height={18} fill="#8E99AA" transform={`rotate(${k * 72} ${cx} 618)`} />)}
            </g>
            <circle cx={cx} cy="618" r="7" fill="#C6CDD8" />
            {/* the road blurring under the arch */}
            <path d={`M ${cx - 50} 640 a 50 50 0 0 0 100 0`} fill="#05070B" opacity="0.7" />
          </g>
        ))}
        {/* suspension, working on every joint */}
        {[272, 566].map((cx) => (
          <path key={"sp" + cx} d={`M ${cx - 11} 566 l 22 ${5 + jointKick * 3} l -22 ${5 - jointKick * 3} l 22 ${5 + jointKick * 3} l -22 ${5 - jointKick * 3}`} stroke="#7E8896" strokeWidth="3" fill="none" opacity="0.55" />
        ))}

        {/* greenhouse glass */}
        <polygon points="248,432 306,336 556,336 596,432" fill="#28303E" stroke={INK} strokeWidth="3" />
        <polygon points="256,428 312,344 550,344 588,428" fill="#151A24" />
        {/* body shell, bone enamel, dawn on the shoulder */}
        <path d="M 186 460 q 0 -28 28 -28 l 400 0 q 28 0 28 28 l 0 116 q 0 26 -26 26 l -404 0 q -26 0 -26 -26 z" fill="url(#s8body)" stroke={INK} strokeWidth="3" />
        <rect x="188" y="452" width="452" height="9" rx="4" fill="#FFF3D8" opacity="0.6" />
        {/* three-quarter front wedge: nose, grille, one headlight */}
        <path d="M 186 470 q -26 6 -30 34 l 0 40 q 0 22 22 22 l 22 0 z" fill="#C9BFAE" stroke={INK} strokeWidth="2.6" />
        <rect x="160" y="500" width="34" height="15" rx="6" fill="#FFF3D8" stroke={INK} strokeWidth="2" />
        <ellipse cx="176" cy="507" rx="9" ry="5" fill="#FFF9E6" />
        {Array.from({ length: 5 }, (_, k) => <rect key={k} x={158} y={524 + k * 7} width={30} height={3} rx={1.5} fill="#5A6272" opacity="0.8" />)}
        {/* sill + the rocker, gritted */}
        <rect x="186" y="566" width="456" height="30" rx="12" fill="#B6AC9A" stroke={INK} strokeWidth="2.4" />
        <rect x="186" y="566" width="456" height="8" rx="4" fill="#FFF3D8" opacity="0.5" />
        <rect x="196" y="588" width="436" height="7" rx="3" fill="#5A5344" opacity="0.6" />
        {/* door shut line + handle */}
        <path d="M 452 434 L 452 590" stroke={INK} strokeWidth="2" opacity="0.5" />
        <rect x="470" y="486" width="34" height="9" rx="4" fill="url(#s8chrome)" stroke={INK} strokeWidth="1.4" />
        {/* S2's door decal, carried unchanged */}
        <g opacity="0.95">
          <rect x="256" y="528" width="286" height="24" rx="6" fill="#F2EDE2" stroke={INK} strokeWidth="1.5" />
          <text x="266" y="545" fill={INK} fontFamily={mono} fontSize="11.5" fontWeight={700}>SAFEDRIVR ACADEMY</text>
          <text x="424" y="545" fill={SLATE} fontFamily={mono} fontSize="9.5">no longer supervised</text>
        </g>
        {/* exhaust, barks on the shift */}
        <rect x="632" y="574" width="26" height="13" rx="6" fill="#3C4350" stroke={INK} strokeWidth="1.6" />
        {lf >= 68 && lf < 82 ? Array.from({ length: 7 }, (_, k) => {
          const a = (lf - 68) * 2 + k * 5;
          return <circle key={k} cx={656 + a * 3.4} cy={580 - a * 0.7 + Math.sin(k) * 8} r={5 + a * 0.7} fill="#8E8474" opacity={Math.max(0, 0.5 - a * 0.024)} />;
        }) : null}
      </g>
    </svg>
  );

  // ---------- THE HERO. two nubs on the wheel, eyes open and forward. not celebrating. driving. ----------
  const EXT_HERO = (
    <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(64px, ${54 + bodyJig}px)` }}>
      <div style={{ position: "absolute", left: 330, top: 344, width: 86 }}>
        <Mascot lf={lf} size={86} capBack={1} gaze={lookDown ? -0.2 : -0.75} nodAmp={1.1} nodSpeed={1.4} />
      </div>
      <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
        {/* the smear of S6 stamp ink still on his forearm. he does not change costume once. */}
        <rect x="336" y="404" width="12" height="6" rx="2" fill={FAKE} opacity="0.75" transform="rotate(-12 342 407)" />
        {/* glass tint + the A-pillar he sits behind */}
        <polygon points="248,432 306,336 556,336 596,432" fill="#7FA8E8" opacity="0.1" />
        <polygon points="248,432 306,336 322,336 268,432" fill="#171C26" />
        <polygon points="556,336 596,432 574,432 540,336" fill="#171C26" />
        <rect x="248" y="428" width="348" height="8" fill="#171C26" />
        <polygon points="306,336 556,336 552,346 312,346" fill="#0E1219" />
        {/* dawn rake across the glass */}
        <polygon points="470,336 512,336 428,432 384,432" fill="#FFF3D8" opacity="0.12" />
        {/* f24: he drops a nub to the door sill and hangs his elbow out the window */}
        {elbow > 0 ? (
          <g>
            <path d={`M 420 404 q ${18 * elbow} ${14 * elbow} ${26 * elbow} ${18 * elbow}`} stroke={CLAY} strokeWidth="13" fill="none" strokeLinecap="round" opacity={elbow} />
            <circle cx={422 + elbow * 26} cy={412 + elbow * 18} r={9} fill={CLAY} stroke={INK} strokeWidth="1.6" opacity={elbow} />
            <rect x={418 + elbow * 12} y={424} width={22} height={10} rx={4} fill={CLAY} opacity={elbow * 0.9} />
          </g>
        ) : null}
      </svg>
    </div>
  );

  // ---------- THE UNBOLTED PEDAL, seen from outside under the passenger door from f28 ----------
  const EXT_PEDAL = pedalIn ? (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(64 ${54 + bodyJig}) rotate(${pedalSwing} 498 596)`}>
        <line x1="498" y1="596" x2="498" y2="640" stroke="#4E5764" strokeWidth="2.4" />
        <g transform={`translate(498 646) rotate(168)`}>
          <rect x="-17" y="-6" width="42" height="12" rx="5" fill="url(#s8chrome)" stroke={INK} strokeWidth="1.6" />
          <rect x="-13" y="-3" width="30" height="3" rx="1.5" fill="#6C7FA0" opacity="0.9" />
        </g>
        {/* the snapped bracket and two sheared bolts, rhyming with the stands */}
        <rect x="490" y="590" width="17" height="9" fill="#3C4350" />
        <rect x="486" y="598" width="6" height="7" fill="#3C4350" transform="rotate(22 489 601)" />
      </g>
      {/* his two-frame look down. that is the pedal's funeral and its only one. */}
      {lookDown ? <path d="M 300 478 L 398 642" stroke="#FFF3D8" strokeWidth="1.4" strokeDasharray="5 7" opacity="0.35" /> : null}
    </svg>
  ) : null;
  // ---------- FOREGROUND OCCLUDER: the near posts + stands ripping through frame-left in hard black.
  //            the fastest layer in the frame is also the thesis. this is what sells the speed. ----------
  const EXT_FG = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* THE DEPARTURE GANTRY + HEADER SIGN. arrives first and alone. eighteen clean frames. */}
      {gan.o > 0.01 ? (
        <g opacity={gan.o} transform={`translate(${gan.x} ${gan.y}) scale(${gan.s})`}>
          {/* legs */}
          <rect x="-8" y="0" width="9" height="150" fill="#16281F" />
          <rect x="252" y="0" width="9" height="150" fill="#16281F" />
          <rect x="-16" y="146" width="26" height="7" fill="#0B1611" />
          <rect x="244" y="146" width="26" height="7" fill="#0B1611" />
          {/* the cross member */}
          <rect x="-14" y="-8" width="282" height="10" fill="#2F5C46" />
          {/* one bolt corner rusted through, the sign hanging 3 degrees off level */}
          <g transform="rotate(3 20 6)">
            <rect x="6" y="2" width="242" height="48" rx="3" fill="#1D3A2C" stroke="#0B1611" strokeWidth="1.6" />
            <rect x="6" y="2" width="242" height="4" fill="#3E7458" />
            <text x="127" y="24" fill="#E6E2D8" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="15" textAnchor="middle" letterSpacing="1.4">NOW LEAVING</text>
            <rect x="30" y="29" width="194" height="1.2" fill="#E6E2D8" opacity="0.5" />
            <text x="127" y="44" fill="#E6E2D8" fontFamily={mono} fontSize="11.5" textAnchor="middle" letterSpacing="2.4">SUPERVISED ZONE</text>
            {/* a pigeon-sized dent in the lower rail */}
            <path d="M 168 50 q 8 -7 17 0" stroke="#0B1611" strokeWidth="1.8" fill="none" />
          </g>
          <circle cx="8" cy="4" r="4" fill="#7A4626" />
          <path d="M 8 8 q -2 9 1 16" stroke="#7A4626" strokeWidth="2" fill="none" opacity="0.8" />
        </g>
      ) : null}

      {/* THE CHECKPOINT BOOM. raised dead vertical. counterweight still bouncing on its spring at f26. */}
      {boom.o > 0.01 ? (
        <g opacity={boom.o} transform={`translate(${boom.x} ${boom.y}) scale(${boom.s})`}>
          <rect x="0" y="14" width="14" height="136" fill="#3C4350" />
          <rect x="-9" y="146" width="32" height="8" fill="#20262F" />
          {/* the arm, raised dead vertical */}
          <g transform={`rotate(${cwBoing * 0.12} 7 14)`}>
            <rect x="2" y="-150" width="10" height="166" fill="#E6E2D8" stroke={INK} strokeWidth="1.2" />
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x="2" y={-146 + k * 21} width="10" height="10" fill={RED} />)}
            <circle cx="7" cy="-152" r="5" fill="#C6CDD8" />
          </g>
          {/* counterweight, still bouncing from a lift that happened before frame 0 */}
          <g transform={`translate(0 ${cwBoing * 0.5})`}>
            <rect x="-24" y="6" width="24" height="26" rx="3" fill="#20262F" stroke={INK} strokeWidth="1.4" />
            <rect x="-20" y="10" width="16" height="5" fill="#4E5764" />
          </g>
          <path d={`M -12 6 l 5 ${-4 + cwBoing * 0.2} l -5 ${4} l 5 ${-4 + cwBoing * 0.2} l -5 4`} stroke="#8E99AA" strokeWidth="1.6" fill="none" />
        </g>
      ) : null}

      {/* AIR: dawn dust and grit ripping through the near frame, ticking off the glass */}
      {grit.map((d, i) => (
        <rect key={"gr" + i} x={d.x} y={d.y} width={d.l} height={1.6} rx={0.8} fill="#FFE9BC" opacity={d.o} />
      ))}
      {Array.from({ length: 14 }, (_, k) => {
        const r = seed(k * 6.1 + 17);
        const p = (lf * (3 + r * 4) + r * 60) % 60;
        return <circle key={"tk" + k} cx={210 + r * 380 + p * 4} cy={340 + r * 90} r={1.4 + r} fill="#FFF3D8" opacity={Math.max(0, 0.5 - p * 0.03)} />;
      })}

      {/* a soft warm backlight from the sun side + a cool rim on the shadow side. NO diagonal band:
          a bright diagonal shaft was reading as a second road cutting off to the upper-right. */}
      <rect x="512" y="62" width="500" height="730" fill="url(#s8warm)" opacity={0.28 + ramp(lf, 40, 58) * 0.28} />
      <rect x="0" y="62" width="300" height="730" fill="url(#s8cold)" opacity={0.24} />
      {/* the focal vignette: quiet the corners, hold the eye on the car on the open road */}
      <rect x="0" y="62" width="1012" height="730" fill="url(#s8vig)" />
      <rect x="0" y="62" width="1012" height="7" fill="#000" opacity="0.35" />
    </svg>
  );
  // ============================================================
  // THE WALL, INTERIOR PROJECTION (out the driver's window, frame-left)
  //   posts stream right to left and GROW. they flip at x=140, dead beside his face.
  //   aperture: driver's window x 0..270 · A-pillar 270..312 · windscreen 312..856
  // ============================================================
  const gI = (s: number) => 300 / (s + 300);
  const xI = (s: number) => 360 - 220 * gI(s);        // flip line lands at x=140, dead beside his face
  const yI = (s: number) => 300 + 260 * gI(s);
  const gOfXI = (x: number) => (360 - x) / 220;

  const postI = (i: number) => {
    const s = sP(i);
    if (s > 620 || s < -150) return null;
    const g = gI(s), x = xI(s), yb = yI(s);
    const fail = isFail(i);
    const HH = fail ? 100 : 300;                // a pass stands TALL, a fail is a short post under the line
    const w = 30 * g;
    const top = yb - HH * g;
    const age = flipAge(s);
    const counted = age >= 0;
    const pop = counted && age < 7 ? 1 - age / 7 : 0;
    const capC = fail ? RED : GREEN;
    const drumT = yb - HH * 0.78 * g, drumB = yb - HH * 0.34 * g;   // always inside the post, whatever its height
    return (
      <g key={"ip" + i}>
        <rect x={x - w / 2} y={top} width={w} height={yb - top} fill="#333C4C" />
        <rect x={x - w / 2} y={top} width={w * 0.3} height={yb - top} fill="#0E1219" opacity="0.75" />
        <rect x={x + w * 0.2} y={top} width={w * 0.3} height={yb - top} fill="#5E6B80" />
        <rect x={x - w / 2} y={yb - 22 * g} width={w} height={4 * g} fill="#3E5340" opacity={counted ? 0.6 : 0.2} />
        {/* cast housing + the rolling brass odometer drum, at his eyeline */}
        <rect x={x - w * 0.92} y={drumT} width={w * 1.84} height={drumB - drumT} rx={4 * g} fill="#242C39" stroke="#080B10" strokeWidth={2 * g} />
        <rect x={x - w * 0.74} y={drumT + 7 * g} width={w * 1.48} height={drumB - drumT - 14 * g} fill={counted ? "#B4873F" : "#2A323E"} />
        {counted ? (
          <>
            <rect x={x - w * 0.74} y={drumT + 7 * g} width={w * 1.48} height={(drumB - drumT - 14 * g) * 0.4} fill="#E0B96A" />
            {String(((i + 47) % 1000) + 1000).slice(1).split("").map((ch, d) => (
              <text key={d} x={x - w * 0.46 + d * w * 0.46} y={drumB - 22 * g + (d === 2 ? ((lf * 1.1) % 9) * g * 0.5 : 0)} fill="#20180A" fontFamily={mono} fontWeight={700} fontSize={32 * g} textAnchor="middle">
                {ch}
              </text>
            ))}
            {/* THE FLIP: the drum rolls over on the exact frame his nose reaches the post */}
            {pop > 0 ? <rect x={x - w * 0.74} y={drumT + 7 * g} width={w * 1.48} height={drumB - drumT - 14 * g} fill="#FBEFC4" opacity={pop * 0.78} /> : null}
          </>
        ) : null}
        {/* result cap: green PASS above the line, red FAIL under it */}
        <rect x={x - w * 1.0} y={top - 24 * g} width={w * 2.0} height={24 * g} rx={3 * g} fill={counted ? capC : "#1B222E"} />
        {counted ? (
          <>
            <rect x={x - w * 1.0} y={top - 24 * g} width={w * 2.0} height={7 * g} fill="#FFF" opacity="0.36" />
            <ellipse cx={x} cy={top - 12 * g} rx={w * (1.15 + pop * 0.9)} ry={15 * g * (1 + pop * 0.8)} fill={capC} opacity={0.22 + pop * 0.34} />
          </>
        ) : null}
      </g>
    );
  };

  const bandI = (m: number) => {
    const s = sM(m);
    if (s > 560 || s < -160) return null;
    const g = gI(s), x = xI(s), yb = yI(s);
    const bw = 168 * g, bh = 112 * g, by = yb - 302 * g;
    const rollI = Math.sin(lf * 0.44) * 1.5 + (flipAge(sP(iNose)) < 4 ? (4 - flipAge(sP(iNose))) * 1.4 : 0);
    const rake = lf >= 136 && lf < 146 ? 1 - Math.abs(lf - 141) / 5 : 0;
    return (
      <g key={"ib" + m}>
        <rect x={x - 5 * g} y={by + bh} width={10 * g} height={yb - by - bh} fill="#0D1017" />
        <rect x={x - bw / 2} y={by} width={bw} height={bh} rx={5 * g} fill="#1D3A2C" stroke="#0B1611" strokeWidth={2 * g} />
        <rect x={x - bw / 2} y={by} width={bw} height={7 * g} fill="#2F5C46" />
        <rect x={x - bw * 0.42} y={by + 12 * g} width={bw * 0.84} height={bh - 24 * g} rx={3 * g} fill="#0B0E13" />
        {[0, 1, 2, 3].map((d) => {
          const dw = bw * 0.19, dx = x - bw * 0.39 + d * dw * 1.06;
          return (
            <g key={"id" + d}>
              <rect x={dx} y={by + 14 * g} width={dw} height={bh - 28 * g} rx={2 * g} fill="#B48C40" />
              <rect x={dx} y={by + 14 * g} width={dw} height={(bh - 28 * g) * 0.42} fill="#DCB367" />
              {/* the ones drum never sits still: it micro-rolls and reseats forever, including at f166 */}
              <text x={dx + dw / 2} y={by + bh * 0.7 + (d === 1 ? rollI * g * 0.7 : 0)} fill="#20180A" fontFamily={mono} fontWeight={700} fontSize={42 * g} textAnchor="middle">
                {["9", "5", "%", ""][d]}
              </text>
            </g>
          );
        })}
        {/* f138: the dawn key rakes the brass up and the band ignites */}
        {rake > 0 ? <rect x={x - bw / 2} y={by} width={bw} height={bh} rx={5 * g} fill="#FFF3D8" opacity={rake * 0.62} /> : null}
        <rect x={x - bw / 2} y={by} width={bw * 0.22} height={bh} fill="#FFE9BC" opacity={0.16 + 0.12 * Math.sin(lf * 0.24 + m)} />
      </g>
    );
  };

  const INT_WINDOW = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      <g clipPath="url(#s8win)">
        <rect x="0" y="186" width="270" height="384" fill="url(#s8sky)" />
        <rect x="0" y="300" width="270" height="270" fill="url(#s8tar)" />
        {/* the crown rail, still carrying the groove */}
        <polygon points={`-90,${300 + 15 * gOfXI(-90)} 320,${300 + 15 * gOfXI(320)} 320,${300 + 70 * gOfXI(320)} -90,${300 + 70 * gOfXI(-90)}`} fill="#16281F" />
        <polygon points={`-90,${300 + 15 * gOfXI(-90)} 320,${300 + 15 * gOfXI(320)} 320,${300 + 24 * gOfXI(320)} -90,${300 + 24 * gOfXI(-90)}`} fill="#2F5C46" />
        {Array.from({ length: 6 }, (_, k) => postI(iNose - k + 3))}
        {Array.from({ length: 3 }, (_, k) => bandI(mNose - k + 2))}
        {/* THE RED 90 GROOVE, still lit, still the baseline */}
        <line x1={-90} y1={300 + 70 * gOfXI(-90)} x2={320} y2={300 + 70 * gOfXI(320)} stroke="#5C1A14" strokeWidth="8" />
        <line x1={-90} y1={300 + 70 * gOfXI(-90)} x2={320} y2={300 + 70 * gOfXI(320)} stroke={RED} strokeWidth="2.4" opacity={0.66 + 0.16 * Math.sin(lf * 0.3)} />
        <line x1={-90} y1={300 + 70 * gOfXI(-90)} x2={320} y2={300 + 70 * gOfXI(320)} stroke="#FF8A72" strokeWidth="1" opacity="0.45" />
        {/* the plinth, ripping */}
        <polygon points={`-90,${300 + 260 * gOfXI(-90)} 320,${300 + 260 * gOfXI(320)} 320,${300 + 300 * gOfXI(320)} -90,${300 + 300 * gOfXI(-90)}`} fill="#0E1218" />
        {Array.from({ length: 12 }, (_, k) => {
          const r = seed(k * 4.1 + 31);
          return <rect key={"iw" + k} x={270 - ((r * 380 + lf * (14 + r * 30)) % 380)} y={210 + r * 330} width={22 + r * 60} height={1.6} fill="#FFE9BC" opacity={0.14 + r * 0.24} />;
        })}
      </g>
      {/* cold rim off the dying floods, through the driver's glass */}
      <rect x="0" y="186" width="270" height="384" fill="url(#s8cold)" opacity={pylonOn(3) * 0.5 + 0.1} />
    </svg>
  );

  // ---------- INTERIOR: the road still coming, through the glass ----------
  const INT_SCREEN = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      <g clipPath="url(#s8scr)">
        <rect x="312" y="96" width="544" height="374" fill="url(#s8sky)" />
        <circle cx="812" cy="300" r="140" fill="url(#s8sun)" />
        <circle cx="812" cy="300" r="32" fill="#FFF6DE" />
        <path d="M 312 300 L 380 278 L 424 292 L 512 268 L 604 288 L 690 272 L 780 292 L 856 278 L 856 300 Z" fill="#151A26" opacity="0.9" />
        <rect x="312" y="298" width="544" height="172" fill="url(#s8tar)" />
        {/* the far comb AHEAD, dark: he has not counted them yet. a thin black picket at the pillar. */}
        {Array.from({ length: 26 }, (_, k) => {
          const s = sP(iNose + 3 + k);
          const g = gI(s);
          if (g > 0.34 || g < 0.018) return null;
          const x = 360 - 220 * g, yb = 300 + 260 * g;
          return <rect key={"ic" + k} x={x - 15 * g} y={yb - 300 * g} width={30 * g} height={300 * g} fill="#12161E" opacity="0.9" />;
        })}
        {/* the pylon line ahead, lamps still clicking out, last one mid-fade at f166 */}
        {Array.from({ length: 11 }, (_, k) => {
          const g = gI(k * 420 + 700 - travel * 0.25);
          if (g > 1 || g < 0.02) return null;
          const x = 360 + 280 * g, yb = 300 + 260 * g;
          const on = pylonOn(k);
          return (
            <g key={"ipy" + k} opacity={Math.min(1, g * 7)}>
              <rect x={x - 4 * g} y={yb - 300 * g} width={8 * g} height={300 * g} fill="#0C1017" />
              <rect x={x - 20 * g} y={yb - 316 * g} width={40 * g} height={16 * g} fill="#0C1017" />
              <rect x={x - 15 * g} y={yb - 313 * g} width={30 * g} height={10 * g} fill={on > 0.05 ? "#CFE2FF" : "#1B2130"} opacity={on > 0.05 ? 0.5 + on * 0.5 : 1} />
              {on > 0.05 ? <ellipse cx={x} cy={yb - 308 * g} rx={62 * g} ry={40 * g} fill="#7FA8E8" opacity={on * 0.22} /> : null}
            </g>
          );
        })}
        {/* the road, still coming. he has not moved his eyes off it. */}
        {Array.from({ length: 14 }, (_, k) => {
          const g = gI((Math.floor((travel - 62) / 150) + k + 2) * 150 - travel + 62);
          if (g > 0.8 || g < 0.03) return null;
          return <rect key={"il" + k} x={360 + 250 * g - 35 * g} y={300 + 230 * g} width={70 * g} height={8 * g} rx={3 * g} fill="#D9CFB6" opacity="0.4" />;
        })}
        <polygon points="856,120 856,300 360,470 312,430" fill="url(#s8warm)" opacity="0.7" />
      </g>
    </svg>
  );

  const INT_CABIN = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* the wiper blade sweeps the OUTSIDE of the glass and accomplishes nothing, twice */}
      <g clipPath="url(#s8scr)">
        <g transform={`rotate(${wipeA} 430 470)`} opacity={wipe > 0.02 ? 0.9 : 0.5}>
          <rect x="396" y="176" width="7" height="296" rx="3" fill="#20262F" />
          <rect x="390" y="172" width="19" height="9" rx="4" fill="#3C4350" />
        </g>
        <polygon points="700,96 760,96 420,470 350,470" fill="#FFF3D8" opacity="0.09" />
      </g>

      {/* THE LAST STICKER: seven scenes old, sun-bleached to sickly khaki, on the INSIDE of the glass */}
      {stickOff < 1 ? (
        <g opacity={1 - stickOff} transform={`translate(${stickOff * 130} ${stickOff * -96}) rotate(${-9 - scrape * 20 - stickOff * 190} 366 422)`}>
          {/* S2's star-crack, under and around it. same glass. */}
          <g opacity="0.45">
            {Array.from({ length: 9 }, (_, k) => {
              const a = (k / 9) * Math.PI * 2 + 0.4;
              return <line key={k} x1={370} y1={428} x2={370 + Math.cos(a) * (26 + seed(k) * 46)} y2={428 + Math.sin(a) * (20 + seed(k * 2) * 38)} stroke="#CFE2FF" strokeWidth="1.2" />;
            })}
            {[16, 30, 46].map((r) => <ellipse key={r} cx={370} cy={428} rx={r} ry={r * 0.76} fill="none" stroke="#CFE2FF" strokeWidth="0.8" />)}
          </g>
          {/* adhesive haze ringing it */}
          <rect x="316" y="382" width="102" height="80" rx="8" fill="#FFF3D8" opacity="0.1" />
          <g transform={`rotate(${scrape * 9} 366 422)`}>
            <rect x="322" y="388" width="88" height="68" rx="9" fill="#9AA352" stroke="rgba(60,70,20,0.45)" strokeWidth="2.6" />
            <rect x="322" y="388" width="88" height="20" rx="9" fill="#A8AF60" opacity="0.7" />
            <text x="366" y="426" fill="#3A3E1E" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="23" textAnchor="middle" transform="rotate(-3 366 422)" opacity="0.8">DONE</text>
            <text x="366" y="444" fill="rgba(50,58,18,0.6)" fontFamily={mono} fontSize="8" textAnchor="middle">SELF ISSUED</text>
            <rect x="328" y="394" width="76" height="56" rx="5" fill="none" stroke="rgba(50,58,18,0.35)" strokeDasharray="4 3" strokeWidth="1.2" />
            {/* one corner lifted, and lifting further under his thumb */}
            <path d={`M 410 388 l ${-16 - scrape * 40} 0 l ${8 + scrape * 26} ${10 + scrape * 26} z`} fill="#C4CC7E" stroke="rgba(60,70,20,0.4)" strokeWidth="1.4" />
          </g>
          {/* f118: it lets go. small, dry, short. */}
          {lf >= 118 && lf < 124 ? Array.from({ length: 5 }, (_, k) => (
            <circle key={k} cx={400 + k * 9} cy={394 + Math.sin(k * 2) * 7 - (lf - 118) * 3} r={1.4} fill="#C4CC7E" opacity={Math.max(0, 0.8 - (lf - 118) * 0.14)} />
          )) : null}
        </g>
      ) : null}

      {/* ---- THE REAR-VIEW MIRROR. only what has the scale to read at 100m: the hall, and the boom still up. ---- */}
      <g transform="rotate(-4 470 190)">
        <rect x="380" y="150" width="180" height="80" rx="10" fill="#20262F" stroke={INK} strokeWidth="3" />
        <rect x="388" y="157" width="164" height="66" rx="6" fill="#0E1219" />
        {(() => {
          const sc = Math.max(0.13, 1 / (1 + Math.max(0, lf - 80) * 0.03));
          return (
            <g opacity="0.9">
              <rect x="388" y="157" width="164" height="66" fill="#242D42" />
              <rect x="388" y="196" width="164" height="27" fill="#161B24" />
              <rect x={470 - 44 * sc} y={196 - 46 * sc} width={88 * sc} height={46 * sc} fill="#0F141E" />
              {Array.from({ length: 5 }, (_, w) => <rect key={w} x={470 - 36 * sc + w * 16 * sc} y={196 - 38 * sc} width={9 * sc} height={16 * sc} fill="#CFE2FF" opacity="0.28" />)}
              {/* the boom, still up */}
              <rect x={470 + 46 * sc} y={196 - 62 * sc} width={3 * sc} height={62 * sc} fill="#E6E2D8" />
              <rect x={470 + 43 * sc} y={196 - 4 * sc} width={10 * sc} height={5 * sc} fill="#3C4350" />
              <rect x="388" y="157" width="164" height="12" fill="#FFF3D8" opacity="0.12" />
            </g>
          );
        })()}
        <rect x="388" y="157" width="60" height="66" fill="#FFF" opacity="0.05" />
        <rect x="462" y="140" width="16" height="14" rx="4" fill="#3C4350" />
      </g>
      {/* THE PASS FRESHENER: a cardboard knockoff of S6's stamp head, spinning for all 167 frames */}
      <line x1="470" y1="228" x2="470" y2="248" stroke="#8E8474" strokeWidth="1.6" opacity="0.5" />
      <g opacity={0.5} transform={`translate(470 278) scale(${Math.cos(lf * 0.09) * 0.92 + 0.08} 1) rotate(${Math.sin(lf * 0.07) * 5})`}>
        <path d="M -22 -28 l 44 0 l 0 16 l -8 6 l 0 24 q 0 8 -8 8 l -12 0 q -8 0 -8 -8 l 0 -24 l -8 -6 z" fill={GREEN} stroke="#2A6E51" strokeWidth="2" />
        <rect x="-14" y="8" width="28" height="14" rx="3" fill="#2A6E51" opacity="0.5" />
        <rect x="-20" y="-26" width="18" height="4" fill="#FFF" opacity="0.25" />
      </g>

      {/* ---- THE DASH, the pillars, the header ---- */}
      <path d="M 312 466 L 856 466 L 890 570 L 150 570 Z" fill="#3A4352" />
      <path d="M 312 466 L 856 466 L 858 478 L 316 478 Z" fill="#5A6576" />
      <path d="M 560 466 L 856 466 L 890 570 L 610 570 Z" fill="#FFD79A" opacity="0.13" />
      <rect x="150" y="566" width="740" height="10" fill="#161B24" />
      <rect x="150" y="570" width="740" height="222" fill="#2A313D" />
      <path d="M 150 570 L 890 570 L 890 600 L 150 640 Z" fill="#333B49" />
      <path d="M 270 62 L 312 96 L 312 470 L 270 570 Z" fill="#2A3240" stroke="#0B0E14" strokeWidth="2" />
      <path d="M 856 96 L 890 62 L 890 570 L 856 470 Z" fill="#2A3240" stroke="#0B0E14" strokeWidth="2" />
      <path d="M 856 96 L 890 62 L 890 240 L 856 250 Z" fill="#FFD79A" opacity="0.22" />
      <rect x="0" y="62" width="1012" height="40" fill="#232A36" />
      <rect x="0" y="96" width="1012" height="7" fill="#0B0E14" />
      {/* sun visor, flipped down against the low key from frame-right */}
      <g transform="rotate(2 715 120)">
        <rect x="600" y="100" width="230" height="40" rx="5" fill="#3A4352" stroke="#0B0E14" strokeWidth="2" />
        <rect x="606" y="106" width="218" height="7" rx="3" fill="#5A6576" />
      </g>
      {/* the driver's window frame + door card */}
      <rect x="0" y="172" width="276" height="16" fill="#2A3240" />
      <rect x="0" y="556" width="276" height="18" fill="#3A4352" />
      <rect x="0" y="570" width="276" height="222" fill="#252C38" />
      <rect x="20" y="600" width="150" height="12" rx="6" fill="#3A4352" />
      <rect x="20" y="628" width="80" height="30" rx="5" fill="#161B24" />
      <rect x="118" y="628" width="60" height="18" rx="4" fill="#161B24" />
    </svg>
  );

  // ---------- INTERIOR KEY. a soft warm pool behind the driver makes him the one lit, sharp subject
  //            against the dimmed out-window wall and the recessed cabin clutter. ----------
  const INT_KEY = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      <ellipse cx={456} cy={410} rx={266} ry={236} fill="url(#s8key)" />
    </svg>
  );

  // ---------- THE HERO INSIDE. eyes visible and forward for all 167 frames. that is the tell. ----------
  const INT_HERO = (
    <>
      <div style={{ position: "absolute", left: 400, top: 300 + jointKick * 1.6, width: 96 }}>
        <Mascot lf={lf} size={96} capBack={1} gaze={-0.55} nodAmp={1} nodSpeed={1.6} />
      </div>
      <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
        {/* one smear of S6 stamp ink still on the forearm. he does not change costume once. */}
        <rect x="408" y="368" width="13" height="6" rx="2" fill={FAKE} opacity="0.7" transform="rotate(-12 414 371)" />
        {/* the wheel, and the nubs that stay on it */}
        <ellipse cx="448" cy="474" rx="84" ry="27" fill="none" stroke="#20262F" strokeWidth="13" />
        <ellipse cx="448" cy="474" rx="84" ry="27" fill="none" stroke="#4E5764" strokeWidth="2.4" />
        <line x1="448" y1="474" x2="448" y2="500" stroke="#20262F" strokeWidth="8" />
        <circle cx="448" cy="500" r="12" fill="#2A3240" />
        {thumb > 0.05 ? null : <circle cx="380" cy="468" r="10" fill={CLAY} stroke={INK} strokeWidth="1.6" />}
        {wipe > 0.02 ? null : <circle cx="514" cy="468" r="10" fill={CLAY} stroke={INK} strokeWidth="1.6" />}
        {/* f80 / f96: his nub flicks the wiper stalk. the blade squeaks over the mark and does nothing, twice. */}
        <g transform={`rotate(${wipe * -16} 528 490)`}>
          <rect x="524" y="484" width="58" height="9" rx="4" fill="#2A3240" stroke="#0B0E14" strokeWidth="1.4" />
          <rect x="574" y="480" width="14" height="17" rx="4" fill="#3C4350" />
        </g>
        {wipe > 0.02 ? (
          <>
            <path d={`M 496 440 q 14 ${18 - wipe * 10} 26 ${34 - wipe * 12}`} stroke={CLAY} strokeWidth="13" fill="none" strokeLinecap="round" />
            <circle cx={524} cy={480 - wipe * 9} r={10} fill={CLAY} stroke={INK} strokeWidth="1.6" />
          </>
        ) : null}
        {/* f112: he gives up on the machine and does it himself. thumb on his own glass. */}
        {thumb > 0.05 ? (
          <g>
            <path d={`M 412 402 q ${-24 * thumb} ${14 * thumb} ${-42 * thumb} ${20 * thumb}`} stroke={CLAY} strokeWidth="15" fill="none" strokeLinecap="round" />
            <circle cx={412 - 48 * thumb} cy={424 + 2 * thumb} r={12} fill={CLAY} stroke={INK} strokeWidth="1.8" />
            <rect x={408 - 52 * thumb} y="412" width="11" height="9" rx="3" fill="#E5906E" />
          </g>
        ) : null}
        {/* THE GATE SHIFTER: a chunky knockoff exposed gate. slams up through the H-plate at f68. */}
        <g>
          <rect x="560" y="590" width="80" height="50" rx="7" fill="#12161E" stroke="#0B0E14" strokeWidth="2" />
          <path d="M 576 600 L 576 630 M 624 600 L 624 630 M 576 615 L 624 615" stroke="url(#s8chrome)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* gaiter, split */}
          <path d="M 580 596 q 20 -8 40 0 l -6 14 l -28 0 z" fill="#2A3240" stroke="#0B0E14" strokeWidth="1.4" />
          <path d="M 596 594 l 3 12" stroke="#0B0E14" strokeWidth="1.4" />
          <line x1={624} y1={614 - gateP * 12} x2={612 + gateP * 12} y2={560 - gateP * 16} stroke="url(#s8chrome)" strokeWidth="7" strokeLinecap="round" />
          {/* clay ball knob, worn shiny on one side */}
          <circle cx={612 + gateP * 12} cy={554 - gateP * 16} r="14" fill="#C4785A" stroke={INK} strokeWidth="2" />
          <ellipse cx={606 + gateP * 12} cy={549 - gateP * 16} rx="6" ry="4" fill="#F0B292" opacity="0.7" />
          {lf >= 66 && lf < 76 ? <circle cx={612 + gateP * 12} cy={554 - gateP * 16} r={16 + (lf - 66) * 2.6} fill="none" stroke="#FFF3D8" strokeWidth="2" opacity={Math.max(0, 0.7 - (lf - 66) * 0.08)} /> : null}
          {/* his nub drops onto the lever on the exact frame the camera commits */}
          {lf >= 64 ? <circle cx={612 + gateP * 12} cy={538 - gateP * 16} r={10} fill={CLAY} stroke={INK} strokeWidth="1.6" /> : null}
        </g>
      </svg>
    </>
  );

  // ---------- FOREGROUND OCCLUDER: the seat wedge, and the legibly empty cushion beside it ----------
  const INT_SEAT = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* THE CUSHION PLANE: open, dawn-lit, dust-fuzzed, and conspicuously BARE for 69 frames.
          the emptiest thing in the scene is legibly empty, not merely black. */}
      <path d="M 556 792 L 852 792 L 852 672 L 598 690 Z" fill="#7A8698" />
      <path d="M 556 792 L 852 792 L 852 672 L 598 690 Z" fill="#FFD79A" opacity="0.42" />
      <path d="M 598 690 L 852 672 L 852 690 L 600 708 Z" fill="#FFF3D8" opacity="0.5" />
      {Array.from({ length: 4 }, (_, k) => <path key={k} d={`M ${618 + k * 58} ${694 + k * 1.4} L ${628 + k * 58} 792`} stroke="#5A6576" strokeWidth="11" opacity="0.55" />)}
      <path d="M 566 780 L 848 764" stroke="#4A5464" strokeWidth="4" opacity="0.6" />
      {motes.slice(0, 10).map((m, i) => <circle key={"cm" + i} cx={600 + ((m.x * 0.24) % 230)} cy={700 + ((m.y * 0.12) % 84)} r={m.s * 0.8} fill="#FFF9E6" opacity={m.o * 1.5} />)}

      {/* THE UNBOLTED PEDAL: S2's chrome dual-control, hanging upside down from its snapped bracket
          by one wire, in the passenger footwell. found dead at f30. still swinging at f166. */}
      <path d="M 616 560 L 776 560 L 762 678 L 632 690 Z" fill="#1B212B" />
      <g transform={`rotate(${pedalSwing} 690 566)`}>
        {/* the snapped bracket + two sheared bolts, rhyming with the flanges ripping past outside */}
        <rect x="680" y="558" width="20" height="10" fill="#4E5764" />
        <path d="M 680 568 q -5 9 -1 17" stroke="#4E5764" strokeWidth="3" fill="none" />
        <line x1="690" y1="566" x2="690" y2="628" stroke="#6C7684" strokeWidth="2.6" />
        <g transform="translate(690 636) rotate(176)">
          <rect x="-24" y="-8" width="56" height="16" rx="7" fill="url(#s8chrome)" stroke={INK} strokeWidth="2" />
          {/* the pad, scuffed and still faintly heat-blued from all that stomping */}
          <rect x="-18" y="-5" width="40" height="10" rx="4" fill="#6C7FA0" opacity="0.8" />
          <rect x="-14" y="-4" width="14" height="8" rx="3" fill="#8FA5C4" opacity="0.6" />
          <rect x="4" y="-3" width="12" height="6" rx="2" fill="#4A5262" opacity="0.7" />
        </g>
        <ellipse cx="690" cy="636" rx="30" ry="7" fill="#7FA8E8" opacity="0.14" />
      </g>
      <rect x={636 + jointKick * 4} y="666" width="13" height="6" rx="3" fill="#9AA5B4" transform={`rotate(${18 + jointKick * 26} 642 669)`} />
      <rect x={736 - jointKick * 5} y="674" width="13" height="6" rx="3" fill="#9AA5B4" transform={`rotate(${-32 - jointKick * 20} 742 677)`} />

      {/* THE GLOVEBOX: outboard and forward on the dash, its dawn-lit horizontal reading hard
          against the wedge's black. latch worn silver, lid sitting slightly proud. pops at f149. */}
      <g>
        <rect x="726" y="482" width="146" height="78" rx="7" fill="#454F60" stroke="#0B0E14" strokeWidth="2" />
        <rect x="726" y="482" width="146" height="7" rx="3" fill="#6E7A8C" />
        <rect x="730" y="490" width="138" height="66" fill="#0B0E14" opacity={gbox} />
        <g transform={`translate(0 ${gbox * 4}) rotate(${gbox * 84} 730 558)`}>
          <rect x="730" y="490" width="140" height="68" rx="6" fill="#525D70" stroke="#0B0E14" strokeWidth="2" />
          <rect x="730" y="490" width="140" height="8" rx="3" fill="#78859A" />
          <rect x="836" y="514" width="30" height="15" rx="5" fill="url(#s8chrome)" stroke={INK} strokeWidth="1.4" />
          <rect x="738" y="546" width="124" height="5" rx="2" fill="#161B24" />
        </g>
      </g>
      {/* THE MANUAL: CLAYNES · AGENTIC OS owner's workshop manual. still sliding at f166. */}
      {manP > 0 ? (
        <g transform={`translate(${796 - manP * 74} ${524 + manP * 206}) rotate(${-8 + manP * 26})`}>
          <ellipse cx="0" cy="46" rx={62 * manP} ry={8 * manP} fill="#000" opacity={0.4 * manP} />
          <rect x="-58" y="-40" width="116" height="82" rx="4" fill="#E8B93C" stroke="#8A6420" strokeWidth="2.4" />
          <rect x="-58" y="-40" width="116" height="17" fill="#2E58A8" />
          <rect x="-58" y="-40" width="20" height="82" fill="#2E58A8" />
          <text x="-33" y="-27" fill="#F7F3EA" fontFamily={mono} fontSize="7.5" fontWeight={700} letterSpacing="0.6">CLAYNES</text>
          <text x="-30" y="8" fill="#5A4210" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="14">AGENTIC</text>
          <text x="-30" y="26" fill="#5A4210" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="14">OS</text>
          {/* spine embossed OS */}
          <text x="-48" y="6" fill="#C6D4F2" fontFamily={mono} fontSize="9" fontWeight={700} transform="rotate(-90 -48 6)" textAnchor="middle">OS</text>
          {/* corner-worn */}
          <path d="M 58 -40 l -12 0 l 12 11 z" fill="#C99C2C" />
          <path d="M 58 42 l -11 0 l 11 -10 z" fill="#C99C2C" />
          <rect x="-30" y="34" width="80" height="2.4" fill="#8A6420" opacity="0.5" />
        </g>
      ) : null}

      {/* THE WEDGE: the seat's back as a hard black mass on the frame-right EDGE. holds for 86 frames. */}
      <path d="M 840 430 L 1012 396 L 1012 792 L 840 792 Z" fill="#0B0E14" />
      <path d="M 846 440 L 1006 408 L 1006 780 L 846 780 Z" fill="#141922" />
      {/* dawn cutting one bright bar across its shoulder */}
      <path d="M 846 446 L 1006 414 L 1006 432 L 846 464 Z" fill="#FFF3D8" opacity="0.3" />
      <path d="M 856 470 L 998 442 L 998 462 L 856 490 Z" fill="#1E242E" />
      {Array.from({ length: 4 }, (_, k) => <path key={k} d={`M 856 ${520 + k * 62} L 998 ${494 + k * 62}`} stroke="#0B0E14" strokeWidth="3" />)}
      {/* S2's clipboard, jammed in the seat pocket, unread */}
      <g transform="rotate(-7 910 690)">
        <rect x="866" y="646" width="92" height="80" rx="3" fill="#B8AE99" stroke="#0B0E14" strokeWidth="2" />
        <rect x="890" y="640" width="44" height="10" rx="3" fill="#4E5764" />
        {[0, 1, 2, 3].map((k) => <rect key={k} x="876" y={666 + k * 13} width="68" height="2.6" fill="#7E8896" opacity="0.6" />)}
      </g>
      <path d="M 856 700 L 998 678 L 998 792 L 856 792 Z" fill="#0E1219" />
      {/* the belt buckle, unlatched and swaying against it */}
      <g transform={`rotate(${Math.sin(lf * 0.24) * 7 + jointKick * 9} 872 452)`}>
        <line x1="872" y1="452" x2="872" y2="540" stroke="#20262F" strokeWidth="10" />
        <line x1="872" y1="452" x2="872" y2="540" stroke="#3C4350" strokeWidth="2" />
        <rect x="858" y="538" width="30" height="42" rx="5" fill="url(#s8chrome)" stroke={INK} strokeWidth="2" />
        <rect x="866" y="548" width="14" height="22" rx="3" fill="#20262F" />
      </g>
      {/* S2's hi-vis instructor cap, hanging forgotten on the headrest. dusty. swinging. */}
      <g transform={`rotate(${Math.sin(lf * 0.19 + 1) * 5 + jointKick * 6} 926 400)`}>
        <rect x="884" y="396" width="86" height="26" rx="6" fill="#C9682A" />
        <rect x="884" y="396" width="86" height="7" rx="3" fill="#E07A28" />
        <rect x="956" y="404" width="30" height="9" rx="4" fill="#A2521F" />
        <rect x="918" y="400" width="16" height="7" fill="#CFC4AE" opacity="0.7" />
        {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={892 + k * 14} cy={400 + seed(k) * 16} r="1.4" fill="#CFC4AE" opacity="0.45" />)}
      </g>
    </svg>
  );

  const INT_AIR = (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0 }}>
      {/* the low key from frame-right at 6 degrees, cutting a hard bar across the cabin */}
      <polygon points="890,110 1012,150 470,570 300,510" fill="#FFF3D8" opacity="0.07" />
      <polygon points="856,140 890,150 420,560 336,540" fill="#FFF3D8" opacity="0.05" />
      {/* motes hanging in the interior sun shafts */}
      {motes.map((m, i) => <circle key={"m" + i} cx={m.x * 0.72 + 180} cy={m.y * 0.6 + 160} r={m.s} fill="#FFF3D8" opacity={m.o * 1.1} />)}
      <rect x="0" y="62" width="1012" height="7" fill="#000" opacity="0.35" />
      <rect x="0" y="62" width="1012" height="730" fill="none" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }} />
    </svg>
  );

  // ---------- THE SHIFT. one continuous motion-blurred swing. not a cut. a move. ----------
  const SWING = sw > 0 && sw < 1 ? (
    <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: 24 }, (_, k) => {
        const r = seed(k * 3.3 + 8);
        const p = (sw + r) % 1;
        return <rect key={k} x={-200 + p * 1500} y={80 + r * 700} width={200 + r * 460} height={2 + r * 5} rx={3} fill="#FFF3D8" opacity={Math.sin(sw * Math.PI) * (0.1 + r * 0.24)} />;
      })}
      <rect x="0" y="62" width="1012" height="730" fill="#FFF3D8" opacity={Math.sin(sw * Math.PI) * 0.1} />
    </svg>
  ) : null;

  return (
    <Panel label="the open road">
      {DEFS}
      {extLive ? (
        <div style={{ position: "absolute", inset: 0, opacity: extO, transform: extTf, transformOrigin: "300px 520px", filter: swBlur > 0.4 ? `blur(${swBlur}px)` : undefined }}>
          {EXT_BG}
          {EXT_KEY}
          {/* the villain's discarded green skip, its dying code-rain and the roadside YOU: all pushed to a
              dim, soft, clearly-secondary far tier so the single read stays a car driving free on the open road */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.32, filter: "blur(3px)" }}>
            {EXT_MID}
            {EXT_RAIN}
            {EXT_INSTRUCTOR}
          </div>
          {EXT_CAR}
          {EXT_HERO}
          {EXT_PEDAL}
          {EXT_FG}
        </div>
      ) : null}
      {intLive ? (
        <div style={{ position: "absolute", inset: 0, opacity: intO, transform: intTf, transformOrigin: "420px 440px", filter: swBlur > 0.4 ? `blur(${swBlur}px)` : undefined }}>
          {INT_SCREEN}
          {/* the out-window 95pct wall: dimmed + softened so it recedes behind the driver */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, filter: "blur(2.2px)" }}>{INT_WINDOW}</div>
          {INT_CABIN}
          {INT_KEY}
          {INT_HERO}
          {INT_SEAT}
          {INT_AIR}
        </div>
      ) : null}
      {SWING}
    </Panel>
  );
};

const S9: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const c01 = (v: number) => Math.max(0, Math.min(1, v));
  const TAU = Math.PI * 2;

  // ===================== L13 CAMERA =====================
  // One unbroken push, ~8% over 118f, drifting left to right. Never changes behaviour, still moving at f117.
  // Depth is a PARALLAX MULTIPLIER, not a zoom: FG suit 4x · FG bench lip 3x · MG 1x · BG 0.35x.
  const push = ramp(lf, 0, 117);
  const camS = 1 + push * 0.08;
  const PX = (m: number) => push * 37.5 * m;      // 4x = 150px, so the suit clears frame right by ~f95

  // ===================== OSCILLATORS: near-coprime, nothing locks to sync in 118f =====================
  // lamp 74 · padlock 53 · suit + DO NOT REFIT corner 97 · tin bot 41 · shutter chain 31 · job wire 67 · crates 28
  const lampSw = lf < 2 ? 0 : Math.sin((lf - 2) * (TAU / 74)) * 26;   // authored: the f2 cord yank starts it
  const lampRot = -(Math.atan2(lampSw, 90) * 180) / Math.PI;
  const lampX = 470 + lampSw;
  const lampY = 6 + Math.sqrt(Math.max(4, 8100 - lampSw * lampSw));
  const lampOn = interpolate(lf, [0, 2, 3, 5, 7], [0.44, 0.44, 1, 0.78, 1], cl);
  const rake = -lampSw * 0.9;                                          // every cast shadow sweeps on the 74f clock
  const padSw = Math.sin(lf * (TAU / 53)) * 8;
  const draft = Math.sin(lf * (TAU / 97));
  const botT = ((lf % 41) / 41) * 2;
  const botX = 128 + (1 - Math.abs(botT - 1)) * 128;
  const botDir = botT < 1 ? 1 : -1;
  const chain = Math.sin(lf * (TAU / 31)) * 4;
  const wireSw = Math.sin(lf * (TAU / 67)) * 2.6;

  // ===================== L5 IGNITION: f60, and it is causal (his wrench turns it over) =====================
  const live = ramp(lf, 60, 68);
  const beltU = Math.max(0, lf - 60) * 3.6;                            // cleats never stop once lit
  // the needle micro-jitters forever, but the READOUT is the scene's one locked number and it never wobbles off 95
  const gSweep = over(lf, 60, 10, Easing.out(Easing.cubic));
  const gVal = 95 * gSweep + (lf > 68 ? Math.sin(lf * 0.9) * 0.5 + Math.sin(lf * 0.33) * 0.4 : 0);
  const gShow = Math.round(95 * gSweep);

  // ===================== L3 / L4: the manual's ink peels off, blooms to a 500px ring, rains home =====================
  // the belt is the chassis rail, so it barely leaves the deck. The rest fan across the top of the ring.
  const PARTS = [
    { k: "belt", cx: 481, cy: 485, a: 200, R: 120, sp: 8 },
    { k: "dial", cx: 264, cy: 384, a: 170, R: 250, sp: 42 },
    { k: "iris", cx: 424, cy: 368, a: 215, R: 250, sp: 42 },
    { k: "clip", cx: 352, cy: 352, a: 260, R: 250, sp: 42 },
    { k: "gauge", cx: 634, cy: 444, a: 300, R: 250, sp: 42 },
    { k: "press", cx: 527, cy: 378, a: 335, R: 255, sp: 26 },  // last part in, lands in the waiting wrench at f56
  ];
  const contact = (i: number) => 36 + i * 4;                            // 36 40 44 48 52 56, a patter not a snap
  const posOf = (i: number) => {
    const p = PARTS[i];
    const lift = over(lf, 4 + i * 2, 12, Easing.out(Easing.cubic));
    const conv = over(lf, 24 + i * 4, 12, Easing.out(Easing.back(1.8)));
    const gRot = ramp(lf, 4, 26) * 12 * (1 - c01(conv));
    const a = ((p.a + gRot) * Math.PI) / 180;
    const rx = 500 + Math.cos(a) * p.R, ry = 380 + Math.sin(a) * p.R;
    const mx = 384 + i * 10, my = 574 - i * 4;                          // ink sitting on the fanning page
    const x1 = mx + (rx - mx) * lift, y1 = my + (ry - my) * lift;
    return {
      x: x1 + (p.cx - x1) * conv,
      y: y1 + (p.cy - y1) * conv,
      rot: (1 - c01(conv)) * p.sp * Math.sin(lf * (0.05 + seed(i) * 0.05) + i * 2),
      s: 0.14 + 0.86 * lift,
      on: lift > 0.006 ? 1 : 0,
      conv: c01(conv), lift,
    };
  };
  const PP = [posOf(0), posOf(1), posOf(2), posOf(3), posOf(4), posOf(5)];
  const puff = (i: number) => over(lf, contact(i), 13);
  const ghost = (i: number) => 0.3 * PP[i].lift * (1 - PP[i].conv);

  // ===================== L5: the loop and the grading. Two full grades on camera, a third entering =====================
  const CRATES = [60, 88, 116];                                        // 28f cadence
  const pressDrop = (() => {
    let d = 0;
    [72, 100].forEach((at) => {
      if (lf >= at - 5 && lf < at) d = over(lf, at - 5, 5, Easing.in(Easing.cubic)) * 26;
      else if (lf >= at && lf < at + 6) d = 26;
      else if (lf >= at + 6 && lf < at + 11) d = 26 * (1 - over(lf, at + 6, 5, Easing.out(Easing.cubic)));
    });
    return d;
  })();
  const squash = Math.max(0, 1 - Math.abs(lf - 72) / 5) + Math.max(0, 1 - Math.abs(lf - 100) / 5);
  // the binary is visibly live: the turret swings the RED head down, hesitates 3f, then takes green
  const turret = lf < 86 ? 0 : lf < 90 ? over(lf, 86, 4, Easing.out(Easing.cubic)) * -90 : lf < 93 ? -90 : lf < 96 ? -90 * (1 - over(lf, 93, 3, Easing.in(Easing.cubic))) : 0;
  const creep = Math.sin(lf * 0.11) * 2 * live;                        // never fully rests: mid-creep at f117
  // cards out of the press: wet green roundel, ride the belt, get clipped
  const cardRide = (at: number) => (lf >= at && lf < at + 6 ? { x: 596 + (lf - at) * 24, wet: Math.max(0, 1 - (lf - at) / 5) } : null);
  const CA = cardRide(80), CB = cardRide(108);
  const WIRE = [
    { x: 690, at: 86 }, { x: 728, at: 114 },                           // the two this line just made
    { x: 768, at: -99 }, { x: 806, at: -99 }, { x: 844, at: -99 },     // three already clipped
  ];

  // ===================== THE OS STAMP: punches off the spine f80, slams dead centre f88 =====================
  const rise = over(lf, 80, 8, Easing.out(Easing.cubic));
  const slam = over(lf, 88, 6, Easing.out(Easing.cubic));
  const stX = 412 + (500 - 412) * rise, stY = 578 + (300 - 578) * rise;
  const stS = (0.2 + rise * 1.52) * (1 - slam * 0.42) * (1 + 0.008 * Math.sin(lf * 0.14));
  const shake = lf >= 88 ? Math.max(0, 1 - (lf - 88) / 7) * 2 * Math.sin(lf * 2.8) : 0;

  // ===================== L2 HERO: acting on frame 0, with an object and a consequence =====================
  const HL = 560, HT = 470, HS = 186, K = HS / 200;
  const SHL = [HL + 21 * K, HT + 99 * K], SHR = [HL + 179 * K, HT + 99 * K];
  const track = (pts: { f: number; p: number[] }[]) => {
    let a = pts[0], b = pts[pts.length - 1];
    for (let i = 0; i < pts.length - 1; i++) if (lf >= pts[i].f) { a = pts[i]; b = pts[i + 1]; }
    const t = interpolate(lf, [a.f, Math.max(a.f + 1, b.f)], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
    return [a.p[0] + (b.p[0] - a.p[0]) * t, a.p[1] + (b.p[1] - a.p[1]) * t];
  };
  // LEFT nub: manual heel -> waiting wrench -> torque -> toss -> rag -> the point
  const LH = track([
    { f: 0, p: [502, 562] }, { f: 6, p: [510, 572] }, { f: 22, p: [470, 458] }, { f: 56, p: [470, 458] },
    { f: 60, p: [474, 462] }, { f: 66, p: [560, 522] }, { f: 70, p: [598, 498] }, { f: 78, p: [604, 588] },
    { f: 86, p: [600, 598] }, { f: 96, p: [560, 606] }, { f: 106, p: [492, 692] }, { f: 118, p: [492, 692] },
  ]);
  // RIGHT nub: the taut pull chain -> YANK -> resting on the rig -> two flat palm slaps -> resting on the rig
  const RH = track([
    { f: 0, p: [770, 496] }, { f: 2, p: [772, 500] }, { f: 6, p: [788, 556] }, { f: 14, p: [782, 504] },
    { f: 86, p: [782, 504] }, { f: 89, p: [786, 470] }, { f: 92, p: [788, 498] }, { f: 94, p: [786, 470] },
    { f: 96, p: [788, 498] }, { f: 100, p: [784, 502] }, { f: 118, p: [784, 502] },
  ]);
  const lean = interpolate(lf, [0, 16], [-7, 0], { ...cl, easing: Easing.out(Easing.cubic) }) + Math.max(0, 1 - Math.abs(lf - 92) / 4) * 2.5 + Math.max(0, 1 - Math.abs(lf - 96) / 4) * 2.5;
  const torqueR = lf >= 56 && lf < 60 ? interpolate(lf, [56, 60], [0, 74], cl) : lf < 56 ? Math.sin(lf * 0.09) * 5 : 74;
  const wrenchHeld = lf < 68;
  const toss = over(lf, 68, 8, Easing.inOut(Easing.cubic));
  const wrX = 598 + (66 - 598) * toss, wrY = 498 + (552 - 498) * toss - Math.sin(toss * Math.PI) * 96;
  const slapHit = Math.max(0, 1 - Math.abs(lf - 92) / 3) + Math.max(0, 1 - Math.abs(lf - 96) / 3);
  const wipe = lf >= 78 && lf < 90 ? Math.sin((lf - 78) * 1.1) * 7 : 0;
  const heroPoint = over(lf, 104, 8);
  // the composer is a pinned overlay, so cancel the midground drift out of the pointing hand: the finger stays ON the pill
  const LHx = LH[0] - heroPoint * PX(1);

  // ===================== L10 COMPOSER: lands ON the ignition kick, one beat =====================
  const comp = over(lf, 60, 10, Easing.out(Easing.back(1.2)));
  const chipP = comp > 0 ? 0.5 + 0.5 * Math.sin((lf - 60) * (TAU / 20)) : 0;   // 20f gold pulse
  const caret = comp > 0.5 && (lf - 60) % 26 < 14 ? 1 : 0;

  const glove = (p: number[], k: string, z = 33) => (
    <div key={k} style={{ position: "absolute", left: p[0] - 12, top: p[1] - 11, width: 24, height: 22, borderRadius: 7, background: grad("#2E3A52", "#161E2E"), border: "1.5px solid rgba(190,210,245,0.35)", boxShadow: "0 5px 12px -5px rgba(0,0,0,0.8)", zIndex: z }} />
  );
  const arm = (s: number[], h: number[], k: string) => {
    const dx = h[0] - s[0], dy = h[1] - s[1], L = Math.max(14, Math.sqrt(dx * dx + dy * dy));
    return <div key={k} style={{ position: "absolute", left: s[0], top: s[1] - 10, width: L, height: 20, borderRadius: 10, background: grad("#E08A66", "#B85536"), border: "1.5px solid rgba(60,24,12,0.42)", transformOrigin: "0% 50%", transform: `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`, boxShadow: "0 7px 16px -7px rgba(0,0,0,0.65)", zIndex: 32 }} />;
  };

  return (
    <Panel label="comment OS">
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.55}px) scale(${camS})`, transformOrigin: "50% 62%" }}>

          {/* ============ BACK WALL (BG 0.35x) ============ */}
          <div style={{ position: "absolute", left: -30, top: 46, width: 1090, height: 456, transform: `translateX(${PX(0.35)}px)`, background: grad("#18253E", "#0C1526"), zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.26, backgroundImage: "radial-gradient(rgba(150,175,225,0.5) 1.4px, transparent 1.5px)", backgroundSize: "27px 27px" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 1090, height: 456, background: `radial-gradient(ellipse at ${500 + lampSw}px 60px, rgba(255,226,168,${0.2 * lampOn}), transparent 58%)` }} />
          </div>

          {/* ============ 1. THE S0 ROLLER SHUTTER, ROLLED UP. The lockout loop closes, nobody says a word ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, transform: `translateX(${PX(0.35)}px)`, zIndex: 1 }}>
            {/* the open mouth, with S8's dawn pouring through it */}
            <div style={{ position: "absolute", left: 30, top: 120, width: 290, height: 382, background: "linear-gradient(178deg,#FFE9BC 0%,#F6C879 32%,#E39A5C 62%,#B96B48 100%)", boxShadow: "inset 0 0 60px rgba(255,236,190,0.85)", overflow: "hidden" }}>
              {[0, 1, 2].map((i) => <div key={"hz" + i} style={{ position: "absolute", left: -20, top: 210 + i * 44, width: 330, height: 8, background: "rgba(255,246,214,0.5)", filter: "blur(3px)" }} />)}
              <div style={{ position: "absolute", left: 0, top: 300, width: 290, height: 82, background: "linear-gradient(180deg,transparent,rgba(70,40,24,0.5))" }} />
            </div>
            {/* guide rails + drum + the stacked slats */}
            {[24, 314].map((rx, i) => <div key={"gr" + i} style={{ position: "absolute", left: rx, top: 118, width: 12, height: 386, background: grad("#4A5468", "#212936"), border: "1px solid rgba(180,200,240,0.2)" }} />)}
            <div style={{ position: "absolute", left: 18, top: 70, width: 306, height: 52, borderRadius: 6, background: "repeating-linear-gradient(180deg,#3F4A5D 0 7px,#2A3242 7px 11px)", border: "2px solid rgba(180,200,240,0.28)", boxShadow: "0 14px 26px rgba(0,0,0,0.6)" }} />
            <div style={{ position: "absolute", left: 18, top: 66, width: 306, height: 9, borderRadius: 4, background: grad("#5A6478", "#2E3644") }} />
            {/* chains, 31f, all 118 frames */}
            {[36, 306].map((cx, i) => (
              <div key={"ch" + i} style={{ position: "absolute", left: cx, top: 122, transformOrigin: "50% 0%", transform: `rotate(${chain * (i ? -1 : 1) * 0.5}deg)` }}>
                {Array.from({ length: 9 }).map((_, k) => <div key={k} style={{ position: "absolute", left: Math.sin(lf * 0.09 + k * 0.7 + i) * (0.5 + k * 0.22) * (chain * 0.16), top: k * 15, width: 9, height: 13, borderRadius: 4, border: "2.5px solid rgba(190,205,235,0.6)", transform: `rotate(${k % 2 ? 70 : 0}deg)` }} />)}
              </div>
            ))}
            {/* grime: a smudged handprint on the shutter track */}
            <div style={{ position: "absolute", left: 330, top: 336, width: 22, height: 28, borderRadius: "8px 8px 4px 4px", background: "rgba(30,22,14,0.42)", filter: "blur(1px)" }} />
            {[0, 1, 2, 3].map((i) => <div key={"fg" + i} style={{ position: "absolute", left: 328 + i * 6, top: 328, width: 4, height: 11, borderRadius: 2, background: "rgba(30,22,14,0.36)", filter: "blur(0.8px)" }} />)}

            {/* 2. THE OPEN PADLOCK on a bent nail. Shackle sprung, hasp EMPTY, no key anywhere. 53f. */}
            <div style={{ position: "absolute", left: 330, top: 288, width: 16, height: 5, borderRadius: 2, background: grad("#9AA4B4", "#4A5260"), transform: "rotate(-16deg)" }} />
            <div style={{ position: "absolute", left: 332, top: 296, transformOrigin: "6px 2px", transform: `rotate(${padSw}deg)` }}>
              <div style={{ position: "absolute", left: 2, top: -16, width: 24, height: 26, borderRadius: "12px 12px 0 0", border: "5px solid #C9CFDC", borderBottom: "none", transformOrigin: "3px 24px", transform: "rotate(-52deg)" }} />
              <div style={{ position: "absolute", left: 0, top: 8, width: 38, height: 32, borderRadius: 7, background: grad("#E7B24C", "#A8762A"), border: "2px solid rgba(255,240,200,0.5)", boxShadow: "0 8px 16px rgba(0,0,0,0.55)" }} />
              <div style={{ position: "absolute", left: 16, top: 20, width: 5, height: 11, borderRadius: 3, background: "rgba(60,40,10,0.65)" }} />
            </div>

            {/* 9. THE CORKBOARD: one relic, one card. No museum. */}
            <div style={{ position: "absolute", left: 740, top: 146, width: 138, height: 118, borderRadius: 5, background: grad("#9A7A4E", "#6B5231"), border: "4px solid #4E3D24", boxShadow: `0 16px 30px -10px rgba(0,0,0,0.8), inset 0 0 24px rgba(0,0,0,0.35)` }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(rgba(60,44,22,0.5) 1px, transparent 1.2px)", backgroundSize: "6px 6px" }} />
              {/* the raking lamp shadow, 74f, so the wall breathes */}
              <div style={{ position: "absolute", left: -40 + rake * 0.5, top: 0, width: 60, height: 118, background: "linear-gradient(90deg,rgba(0,0,0,0.42),transparent)" }} />
              {/* the fat counterfeit gun, SNAPPED IN TWO, pinned through the break, ink pad dried to a scab */}
              <div style={{ position: "absolute", left: 12, top: 12, width: 56, height: 34, borderRadius: 5, background: grad("#5C6270", "#31363F"), border: "1.5px solid rgba(20,24,30,0.7)", transform: "rotate(-7deg)", boxShadow: "0 5px 12px -4px rgba(0,0,0,0.8)" }}>
                <div style={{ position: "absolute", left: 6, top: 22, width: 14, height: 16, borderRadius: 3, background: grad("#4A505C", "#262B33") }} />
                <div style={{ position: "absolute", left: 34, top: 6, width: 18, height: 11, borderRadius: 2, background: "#7C8A34", opacity: 0.7 }} />
              </div>
              <div style={{ position: "absolute", left: 66, top: 20, width: 52, height: 30, borderRadius: 5, background: grad("#5C6270", "#31363F"), border: "1.5px solid rgba(20,24,30,0.7)", transform: "rotate(13deg)", boxShadow: "0 5px 12px -4px rgba(0,0,0,0.8)" }}>
                <div style={{ position: "absolute", left: 2, top: 3, width: 14, height: 22, borderRadius: 2, background: "#7A8438" }} />
                <div style={{ position: "absolute", left: 2, top: 3, width: 14, height: 22, borderRadius: 2, background: "repeating-linear-gradient(52deg,rgba(40,44,12,0.55) 0 2px,transparent 2px 5px)" }} />
              </div>
              <div style={{ position: "absolute", left: 60, top: 26, width: 13, height: 13, borderRadius: "50%", background: RED, border: "2px solid rgba(255,220,210,0.5)", boxShadow: "0 4px 8px rgba(0,0,0,0.7)", zIndex: 3 }} />
              {/* the one line that is funnier read than seen. Corner lifts on the 97f bay draft. */}
              <div style={{ position: "absolute", left: 10, top: 62, width: 118, height: 36, borderRadius: 3, background: grad("#F6F1E4", "#DCD3BF"), border: "1px solid rgba(60,44,22,0.4)", transform: `rotate(-2deg) perspective(300px) rotateY(${draft * 5}deg)`, transformOrigin: "0% 50%", boxShadow: "0 6px 14px -5px rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#3A3020", letterSpacing: "0.02em" }}>DO NOT REFIT</div>
                <div style={{ position: "absolute", right: 0, bottom: 0, width: 20, height: 16, background: grad("#EFE8D6", "#C9BEA6"), clipPath: "polygon(100% 0,100% 100%,0 100%)", transform: `translate(${draft * 1.5}px, ${-Math.abs(draft) * 3}px)`, boxShadow: "-2px -2px 5px rgba(0,0,0,0.3)" }} />
              </div>
              <div style={{ position: "absolute", left: 62, top: 58, width: 10, height: 10, borderRadius: "50%", background: "#C9CFDC", border: "1.5px solid rgba(30,34,42,0.5)" }} />
            </div>

            {/* 7. THE SHELF + THE GLYPH JAR: his aura, three inches tall, behind glass, and nobody looks at it */}
            <div style={{ position: "absolute", left: 700, top: 330, width: 290, height: 12, borderRadius: 3, background: grad("#6E5E48", "#3A3025"), boxShadow: "0 10px 20px -8px rgba(0,0,0,0.8)" }} />
            <div style={{ position: "absolute", left: 700, top: 342, width: 290, height: 7, background: "rgba(0,0,0,0.4)" }} />
            {[716, 964].map((bx, i) => <div key={"br" + i} style={{ position: "absolute", left: bx, top: 342, width: 9, height: 22, background: grad("#4C4030", "#241D14") }} />)}
            <div style={{ position: "absolute", left: 786, top: 268, width: 58, height: 62, borderRadius: "5px 5px 8px 8px", background: "linear-gradient(100deg,rgba(214,232,240,0.20),rgba(180,205,220,0.10))", border: "2px solid rgba(210,232,245,0.42)", overflow: "hidden", boxShadow: "0 10px 20px -8px rgba(0,0,0,0.8), inset 0 0 16px rgba(200,230,245,0.16)" }}>
              <CodeRain lf={lf} x={5} y={2} h={58} cols={3} o={0.95} gap={16} />
              <CodeRain lf={lf + 29} x={12} y={-8} h={58} cols={3} o={0.7} gap={16} />
              <div style={{ position: "absolute", left: 6, top: 4, width: 9, height: 52, background: "linear-gradient(180deg,rgba(255,255,255,0.4),transparent)", filter: "blur(1.5px)" }} />
            </div>
            <div style={{ position: "absolute", left: 782, top: 260, width: 66, height: 12, borderRadius: 4, background: grad("#8E96A6", "#4A5260"), border: "1px solid rgba(200,215,240,0.3)" }} />
            {/* other shelf junk, unremarked */}
            <div style={{ position: "absolute", left: 714, top: 300, width: 26, height: 30, borderRadius: 3, background: grad("#4E5A70", "#252D3C"), border: "1px solid rgba(160,185,230,0.2)" }} />
            <div style={{ position: "absolute", left: 748, top: 306, width: 32, height: 24, borderRadius: 3, background: grad("#5C4E3A", "#2E2619") }} />
            <div style={{ position: "absolute", left: 872, top: 296, width: 20, height: 34, borderRadius: "10px 10px 3px 3px", background: grad("#48566E", "#222A38") }} />
            <div style={{ position: "absolute", left: 916, top: 304, width: 40, height: 26, borderRadius: 3, background: grad("#5C4E3A", "#2E2619") }} />
          </div>

          {/* ============ DAWN WEDGE: the road light and the workshop light are one source across the cut ============ */}
          <div style={{ position: "absolute", left: 0, top: 120, width: 1012, height: 672, transform: `translateX(${PX(0.35)}px)`, background: "linear-gradient(170deg, rgba(255,232,178,0.42), rgba(255,214,150,0.18) 55%, rgba(255,206,140,0.05))", clipPath: "polygon(3% 0%, 31.6% 0%, 80% 100%, 37% 100%)", mixBlendMode: "screen", filter: "blur(3px)", pointerEvents: "none", zIndex: 4 }} />

          {/* ============ FLOOR ============ */}
          <div style={{ position: "absolute", left: -30, top: 500, width: 1090, height: 292, transform: `translateX(${PX(0.35)}px)`, background: "linear-gradient(180deg,#101B2E 0%,#18263D 30%,#0A1220 100%)", zIndex: 5 }}>
            <svg viewBox="0 0 1090 292" width={1090} height={292} style={{ position: "absolute", left: 0, top: 0 }}>
              {Array.from({ length: 13 }).map((_, i) => <line key={"fl" + i} x1={530} y1={0} x2={-380 + i * 158} y2={292} stroke="rgba(150,180,235,0.13)" strokeWidth={2} />)}
              {[8, 30, 66, 122, 200, 292].map((y, i) => <line key={"fh" + i} x1={0} y1={y} x2={1090} y2={y} stroke="rgba(150,180,235,0.08)" strokeWidth={2} />)}
              <line x1={0} y1={2} x2={1090} y2={2} stroke="rgba(160,195,245,0.26)" strokeWidth={3} />
            </svg>
            {/* 16. GRIME: oil shadows where old rigs used to sit */}
            {[{ x: 118, y: 214, w: 168, h: 40 }, { x: 640, y: 250, w: 210, h: 46 }, { x: 400, y: 176, w: 120, h: 28 }].map((o, i) => (
              <div key={"oil" + i} style={{ position: "absolute", left: o.x, top: o.y, width: o.w, height: o.h, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(8,10,14,0.62), transparent 70%)", filter: "blur(4px)" }} />
            ))}
            {/* the dawn wedge landing on the deck at ~(600,720) */}
            <div style={{ position: "absolute", left: 400, top: 150, width: 420, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,228,168,0.24), transparent 66%)", filter: "blur(6px)" }} />
          </div>

          {/* ============ 11. THE SWINGING WORK LAMP: yanked alive at f2, every shadow sweeps for the rest of the scene ============ */}
          <div style={{ position: "absolute", left: 469, top: 0, width: 3, height: 92, background: "rgba(190,210,245,0.5)", transformOrigin: "50% 0%", transform: `rotate(${lampRot}deg) translateX(${PX(1)}px)`, zIndex: 8 }} />
          <div style={{ position: "absolute", left: lampX - 340 + PX(1), top: lampY, width: 680, height: 700, transformOrigin: "50% 0%", transform: `rotate(${lampRot}deg)`, background: `radial-gradient(ellipse at 50% -6%, rgba(255,236,190,${0.78 * lampOn}) 0%, rgba(255,222,158,${0.34 * lampOn}) 26%, rgba(255,210,140,${0.11 * lampOn}) 52%, transparent 76%)`, clipPath: "polygon(46% 0,54% 0,100% 100%,0% 100%)", filter: "blur(5px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 6 }} />
          <div style={{ position: "absolute", left: lampX - 90 + PX(1), top: lampY, width: 180, height: 300, transformOrigin: "50% 0%", transform: `rotate(${lampRot}deg)`, background: `linear-gradient(180deg, rgba(255,244,214,${0.7 * lampOn}), transparent 72%)`, clipPath: "polygon(42% 0,58% 0,100% 100%,0% 100%)", filter: "blur(7px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 6 }} />
          {/* dust and grinding grit, visibly drifting through the cone the whole shot */}
          {Array.from({ length: 26 }).map((_, i) => {
            const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2);
            const yy = 120 + ((r * 620 + lf * (0.5 + r2 * 1.1)) % 640);
            const xx = lampX - 250 + r2 * 500 + Math.sin(lf * 0.04 + i) * 14 + PX(1);
            const swarf = r > 0.74;
            return <div key={"mote" + i} style={{ position: "absolute", left: xx, top: yy, width: swarf ? 2 : 3 + r * 3, height: swarf ? 5 : 3 + r * 3, borderRadius: swarf ? 1 : "50%", background: swarf ? "rgba(255,226,150,0.95)" : "rgba(255,240,206,0.85)", opacity: (0.18 + r * 0.42) * lampOn, transform: swarf ? `rotate(${lf * 4 + i * 40}deg)` : undefined, zIndex: 7 }} />;
          })}
          <div style={{ position: "absolute", left: lampX - 34 + PX(1), top: lampY - 4, width: 68, height: 40, transformOrigin: "50% 0%", transform: `rotate(${lampRot}deg)`, borderRadius: "6px 6px 30px 30px", background: grad("#8FA2C4", "#3D4F72"), border: "2px solid rgba(200,220,250,0.42)", boxShadow: `0 0 ${24 * lampOn}px rgba(255,224,160,0.8)`, zIndex: 9 }}>
            <div style={{ position: "absolute", left: 18, bottom: -8, width: 32, height: 17, borderRadius: "50%", background: "#FFEEC4", boxShadow: `0 0 ${20 * lampOn}px rgba(255,224,160,0.95)`, opacity: lampOn }} />
          </div>
          {/* the pull chain: taut in his nub at f0, YANKED at f2, then hanging and swinging forever */}
          {(() => {
            const ex = lf < 10 ? RH[0] : lampX + 22 + PX(1) + lampSw * 0.3, ey = lf < 10 ? RH[1] : lampY + 108 + Math.abs(lampSw) * 0.2;
            const sx = lampX + 22 + PX(1), sy = lampY + 30;
            const dx = ex - sx, dy = ey - sy, L = Math.sqrt(dx * dx + dy * dy);
            return (
              <div style={{ position: "absolute", left: sx, top: sy, width: 3, height: L, transformOrigin: "50% 0%", transform: `rotate(${-(Math.atan2(dx, dy) * 180) / Math.PI}deg)`, background: "repeating-linear-gradient(180deg,rgba(220,232,250,0.85) 0 3px,transparent 3px 6px)", zIndex: 10 }}>
                <div style={{ position: "absolute", left: -4, top: L - 8, width: 11, height: 11, borderRadius: "50%", border: "2.5px solid rgba(220,232,250,0.9)" }} />
              </div>
            );
          })()}

          {/* ============ MG PLANE (1x): the plinth the rig gets built onto ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${PX(1)}px)`, zIndex: 12 }}>
            <div style={{ position: "absolute", left: 166, top: 520, width: 690, height: 46, borderRadius: "4px 4px 2px 2px", background: grad("#5E6878", "#2A323F"), border: "2px solid rgba(190,210,245,0.24)", boxShadow: "0 22px 40px -12px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1)" }} />
            <div style={{ position: "absolute", left: 166, top: 534, width: 690, height: 6, background: "rgba(231,178,76,0.4)" }} />
            <div style={{ position: "absolute", left: 200 + rake, top: 562, width: 620, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(9px)" }} />
          </div>

          {/* ============ 14. THE CRATE LOADER CLAUDE, never stops, never looks up ============ */}
          <div style={{ position: "absolute", left: 44, top: 386, transform: `translateX(${PX(1)}px)`, zIndex: 14 }}>
            {[0, 1].map((i) => <div key={"stk" + i} style={{ position: "absolute", left: 4 + i * 6, top: 30 + i * 44, width: 92, height: 42, borderRadius: 4, background: grad("#C08A55", "#7E5732"), border: "1.5px solid rgba(255,232,190,0.28)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "absolute", left: 0, top: 17, width: 92, height: 5, background: "rgba(60,38,18,0.4)" }} />
            </div>)}
          </div>
          <div style={{ position: "absolute", left: 140, top: 386, transform: `translateX(${PX(1)}px)`, zIndex: 14 }}>
            <Mascot lf={lf * 1.0} size={132} gaze={-1.6} nodAmp={1.6} nodSpeed={7} capBack={1} />
            {arm([140 + 118, 386 + 66], [206 + Math.sin(lf * (TAU / 28)) * 22, 440 + Math.cos(lf * (TAU / 28)) * 26], "ldarm")}
          </div>

          {/* ============ 15. THE CLIPPER CLAUDE: two clips on camera, reaching for a third at the cut ============ */}
          <div style={{ position: "absolute", left: 700, top: 404, transform: `translateX(${PX(1)}px)`, zIndex: 14 }}>
            <Mascot lf={lf + 17} size={132} gaze={-1.2} nodAmp={1.4} nodSpeed={8} capBack={1} />
          </div>
          {(() => {
            const reach = lf >= 84 && lf < 90 ? [692, 400] : lf >= 112 && lf < 118 ? [730, 400] : lf >= 60 ? [652, 452 + Math.sin(lf * 0.24) * 7] : [706, 448];
            return <div style={{ position: "absolute", inset: 0, transform: `translateX(${PX(1)}px)`, zIndex: 15 }}>{arm([714, 469], reach, "cparm")}{glove(reach, "cpgl", 15)}</div>;
          })()}

          {/* ============ STATION 1: THE BELT. Part 0. Cleats ratchet, sprockets turn, crates ride, never stops. ============ */}
          <div style={{ position: "absolute", left: PP[0].x - 305 + PX(1), top: PP[0].y - 15, width: 610, height: 30, transform: `rotate(${PP[0].rot}deg) scale(${PP[0].s})`, transformOrigin: "50% 50%", opacity: PP[0].on, zIndex: 18 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 610, height: 30, background: grad("#2A3242", "#151B26"), border: "2px solid rgba(180,205,245,0.3)", borderRadius: 4, overflow: "hidden", boxShadow: "0 12px 24px -8px rgba(0,0,0,0.75), inset 0 0 18px rgba(0,0,0,0.6)" }}>
              {Array.from({ length: 24 }).map((_, i) => <div key={"cle" + i} style={{ position: "absolute", left: ((i * 27 + beltU) % 640) - 12, top: 0, width: 7, height: 30, background: "rgba(150,178,224,0.34)", boxShadow: "1px 0 0 rgba(0,0,0,0.35)" }} />)}
              <div style={{ position: "absolute", left: 0, top: 0, width: 610, height: 6, background: "rgba(255,255,255,0.09)" }} />
            </div>
            {[10, 594].map((sx, i) => (
              <div key={"spr" + i} style={{ position: "absolute", left: sx - 3, top: -3, width: 36, height: 36, borderRadius: "50%", background: grad("#7E879A", "#333B48"), border: "2px solid rgba(210,228,255,0.3)", transform: `rotate(${beltU * (i ? 1 : 1) * 2.4}deg)`, boxShadow: "0 6px 12px -4px rgba(0,0,0,0.7)" }}>
                {Array.from({ length: 8 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 15, top: -3, width: 4, height: 38, background: "rgba(190,212,250,0.28)", transformOrigin: "50% 50%", transform: `rotate(${k * 22.5}deg)` }} />)}
                <div style={{ position: "absolute", left: 12, top: 12, width: 8, height: 8, borderRadius: "50%", background: "rgba(230,240,255,0.55)" }} />
              </div>
            ))}
          </div>
          {/* the rig bed the whole line bolts to */}
          <div style={{ position: "absolute", left: 170 + PX(1), top: 500, width: 686, height: 22, background: grad("#4A5466", "#232B37"), border: "1.5px solid rgba(190,210,245,0.22)", borderRadius: 3, zIndex: 22 }} />
          {/* the flank plate he slaps */}
          <div style={{ position: "absolute", left: 740 + PX(1), top: 470, width: 116, height: 52, borderRadius: "4px 4px 3px 3px", background: grad("#59637A", "#2B3340"), border: "1.5px solid rgba(190,210,245,0.26)", boxShadow: `0 8px 18px -6px rgba(0,0,0,0.7), inset 0 ${slapHit * 3}px 0 rgba(0,0,0,0.4)`, transform: `scaleY(${1 - slapHit * 0.05})`, transformOrigin: "50% 100%", zIndex: 22 }}>
            {[0, 1, 2, 3].map((i) => <div key={"rv" + i} style={{ position: "absolute", left: 8 + (i % 2) * 96, top: 8 + Math.floor(i / 2) * 32, width: 8, height: 8, borderRadius: "50%", background: "rgba(220,236,255,0.35)" }} />)}
          </div>

          {/* ============ S0 CRATES riding in, one every 28f. Crate C is mid belt at f117. ============ */}
          {CRATES.map((at, i) => {
            if (lf < at || lf > at + 12) return null;
            const cx = 176 + (lf - at) * 27;
            const bump = Math.sin((lf - at) * 1.7) * 1.4;
            return (
              <div key={"cr" + i} style={{ position: "absolute", left: cx + PX(1), top: 426 + bump, width: 56, height: 44, borderRadius: 3, background: grad("#C08A55", "#7E5732"), border: "2px solid rgba(255,232,190,0.32)", boxShadow: "0 8px 16px -5px rgba(0,0,0,0.75)", zIndex: 20 }}>
                <div style={{ position: "absolute", left: 0, top: 17, width: 56, height: 6, background: "rgba(60,38,18,0.45)" }} />
                <div style={{ position: "absolute", left: 24, top: 4, width: 8, height: 36, background: "rgba(60,38,18,0.3)" }} />
                <div style={{ position: "absolute", left: 6, top: 5, width: 12, height: 9, borderRadius: 2, background: "rgba(255,240,206,0.28)" }} />
              </div>
            );
          })}

          {/* ============ STATION 2: THE TWIN HEAD PRESS. Part 5. The S6 turret at bench scale, both heads inked and live. ============ */}
          <div style={{ position: "absolute", left: PP[5].x - 88 + PX(1), top: PP[5].y - 129, width: 176, height: 258, transform: `rotate(${PP[5].rot}deg) scale(${PP[5].s})`, transformOrigin: "50% 50%", opacity: PP[5].on, zIndex: 26 }}>
            {/* legs, bolted down through the bed */}
            {[2, 152].map((ux, i) => (
              <div key={"up" + i} style={{ position: "absolute", left: ux, top: 19, width: 22, height: 239 }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: 239, background: grad("#8E97A6", "#39404D"), border: "1.5px solid rgba(210,228,255,0.28)", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: 7, top: 10, width: 8, height: 218, background: "rgba(20,26,36,0.35)" }} />
                <div style={{ position: "absolute", left: -6, top: 214, width: 34, height: 13, borderRadius: 2, background: grad("#6E7788", "#2E3542"), border: "1px solid rgba(210,228,255,0.2)" }} />
                <div style={{ position: "absolute", left: 5, top: 217, width: 12, height: 7, borderRadius: 2, background: "rgba(220,236,255,0.3)" }} />
              </div>
            ))}
            {/* the crown: a heavy hydraulic block */}
            <div style={{ position: "absolute", left: -6, top: 1, width: 188, height: 34, borderRadius: 5, background: grad("#5D6574", "#242A35"), border: "2px solid rgba(200,215,240,0.32)", boxShadow: "0 12px 24px -6px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.1)" }}>
              {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 14 + i * 40, top: 22, width: 10, height: 8, borderRadius: 2, background: "rgba(220,236,255,0.28)" }} />)}
            </div>
            {/* the ram: a fat piston, visibly longer on the slam */}
            <div style={{ position: "absolute", left: 66, top: 35, width: 44, height: 24 + pressDrop + creep, background: grad("#C9CFDC", "#6C7482"), border: "1.5px solid rgba(30,36,48,0.5)", boxShadow: "inset 0 0 10px rgba(0,0,0,0.45)" }} />
            <div style={{ position: "absolute", left: 58, top: 30, width: 60, height: 12, borderRadius: 3, background: grad("#464F5E", "#191F27"), border: "1px solid rgba(200,215,240,0.24)" }} />
            {/* the rocking re-ink roller, always live */}
            <div style={{ position: "absolute", left: -20, top: 96, width: 38, height: 18, borderRadius: 9, background: grad("#9AA4B4", "#464E5C"), border: "1.5px solid rgba(210,228,255,0.24)", transform: `rotate(${Math.sin(lf * 0.16) * 14 * live}deg)` }}>
              <div style={{ position: "absolute", left: 3, top: 3, width: 32, height: 11, borderRadius: 6, background: GREEN, opacity: 0.65 }} />
            </div>
            <div style={{ position: "absolute", left: 14, top: 100, width: 26, height: 8, borderRadius: 3, background: grad("#6E7788", "#2E3542") }} />
            {/* THE TURRET: the red head swings down at f86, hesitates 3f, then it takes green. The binary is visibly live. */}
            <div style={{ position: "absolute", left: 46, top: 59 + pressDrop + creep, width: 84, height: 92, transformOrigin: "50% 28px", transform: `rotate(${turret}deg)` }}>
              {/* RED head, equally inked, hanging off the drum */}
              <div style={{ position: "absolute", left: -22, top: 10, width: 36, height: 36, borderRadius: 4, background: grad("#D96A58", "#8E3325"), border: `3px solid ${RED}`, boxShadow: "0 6px 14px -4px rgba(0,0,0,0.7)" }}>
                <div style={{ position: "absolute", left: 7, top: 14, width: 16, height: 5, borderRadius: 2, background: "#FFE9E2" }} />
              </div>
              <div style={{ position: "absolute", left: 14, top: 0, width: 56, height: 56, borderRadius: "50%", background: grad("#7E879A", "#333B48"), border: "3px solid rgba(210,228,255,0.34)", boxShadow: "0 8px 18px -4px rgba(0,0,0,0.75)" }}>
                {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 25, top: 1, width: 3, height: 50, background: "rgba(190,212,250,0.2)", transformOrigin: "50% 50%", transform: `rotate(${k * 45}deg)` }} />)}
                <div style={{ position: "absolute", left: 22, top: 22, width: 11, height: 11, borderRadius: "50%", background: "rgba(230,240,255,0.55)" }} />
              </div>
              {/* GREEN head, the authority mark. This rig IS the S6 press module, so it is the one object allowed to issue green. */}
              <div style={{ position: "absolute", left: 6, top: 56, width: 72, height: 36, borderRadius: 4, background: grad("#4CB489", "#2C7554"), border: `3px solid ${GREEN}`, boxShadow: `0 0 ${8 + squash * 18}px rgba(63,158,116,0.7)`, transform: `scaleY(${1 - squash * 0.16})`, transformOrigin: "50% 100%" }}>
                <div style={{ position: "absolute", left: 26, top: 9, width: 20, height: 18, borderRadius: "50%", background: "#F0FFF6", opacity: 0.9 }} />
              </div>
            </div>
            {/* ink squash at the moment of contact */}
            {squash > 0.05 && Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <div key={"sq" + i} style={{ position: "absolute", left: 88 + Math.cos(a) * (14 + squash * 28), top: 178 + Math.sin(a) * (6 + squash * 12), width: 5, height: 5, borderRadius: "50%", background: GREEN, opacity: squash * 0.85 }} />;
            })}
          </div>

          {/* ============ 5. THE CARD OUT OF THE PRESS: the press's own authority green roundel, ink still wet ============ */}
          {[CA, CB].map((c, i) => c && (
            <div key={"co" + i} style={{ position: "absolute", left: c.x + PX(1), top: 452, width: 46, height: 20, borderRadius: 2, background: grad(PAPER, "#DCD3BF"), border: "1px solid rgba(60,44,22,0.4)", boxShadow: "0 6px 12px -4px rgba(0,0,0,0.7)", zIndex: 21 }}>
              <div style={{ position: "absolute", left: 13, top: 3, width: 15, height: 14, borderRadius: "50%", background: GREEN, transform: `scale(${1 + c.wet * 0.18}, ${1 - c.wet * 0.2})`, boxShadow: `0 0 ${c.wet * 9}px rgba(63,158,116,0.8)` }}>
                <div style={{ position: "absolute", left: 3, top: 5, width: 9, height: 3, background: "#F2FFF8", clipPath: "polygon(0 40%,32% 100%,100% 0,100% 34%,32% 100%,0 70%)" }} />
              </div>
            </div>
          ))}

          {/* ============ STATION 3: THE JOB WIRE. A diner order rail. Not a record, no numbers. 67f. ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${PX(1)}px)`, zIndex: 24 }}>
            {[678, 892].map((px, i) => <div key={"wp" + i} style={{ position: "absolute", left: px, top: 372, width: 10, height: 100, background: grad("#7E879A", "#333B48"), border: "1px solid rgba(210,228,255,0.24)", borderRadius: 2 }} />)}
            <div style={{ position: "absolute", left: 682, top: 385, width: 212, height: 3, background: "rgba(220,236,255,0.65)", boxShadow: "0 1px 3px rgba(0,0,0,0.6)" }} />
            {WIRE.map((w, i) => {
              const born = w.at < 0 ? 1 : lf >= w.at ? 1 : 0;
              if (!born) return null;
              const kick = w.at > 0 ? Math.max(0, 1 - (lf - w.at) / 22) : 0;
              const sw = wireSw * (0.6 + seed(i * 2.7) * 0.8) + kick * Math.sin((lf - Math.max(0, w.at)) * 0.7) * 13;
              return (
                <div key={"wc" + i} style={{ position: "absolute", left: w.x, top: 384, transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
                  <div style={{ position: "absolute", left: 12, top: -3, width: 9, height: 9, borderRadius: 2, background: "#C9CFDC", border: "1px solid rgba(30,34,42,0.5)" }} />
                  <div style={{ position: "absolute", left: 0, top: 6, width: 32, height: 44, borderRadius: 2, background: grad(PAPER, "#DAD1BC"), border: "1px solid rgba(60,44,22,0.4)", boxShadow: "0 6px 12px -5px rgba(0,0,0,0.7)" }}>
                    <div style={{ position: "absolute", left: 8, top: 6, width: 15, height: 14, borderRadius: "50%", background: GREEN }} />
                    {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 5, top: 26 + k * 5, width: 22 - k * 5, height: 2, background: "rgba(40,52,80,0.3)" }} />)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============ 10. THE EXPLODED MODULES, MOSTLY DEAD CASTINGS ============ */}
          {/* the printed plan the parts fill in */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: PX(1), top: 0, zIndex: 34, pointerEvents: "none" }}>
            {PARTS.map((p, i) => ghost(i) > 0.02 && <rect key={"gh" + i} x={p.cx - 34} y={p.cy - 30} width={68} height={60} fill="none" stroke="rgba(190,214,255,0.8)" strokeWidth={1.4} strokeDasharray="5 6" opacity={ghost(i)} rx={4} />)}
            {PARTS.map((p, i) => {
              const o = PP[i].lift * (1 - PP[i].conv) * 0.55;
              if (o < 0.03) return null;
              const dx = PP[i].x - 500, dy = PP[i].y - 380, L = Math.max(1, Math.sqrt(dx * dx + dy * dy));
              return (
                <g key={"ll" + i} opacity={o}>
                  <line x1={500} y1={380} x2={PP[i].x} y2={PP[i].y} stroke="rgba(200,222,255,0.9)" strokeWidth={1} strokeDasharray={`${L} ${L}`} strokeDashoffset={L * (1 - PP[i].lift)} />
                  <line x1={PP[i].x - (dy / L) * 7} y1={PP[i].y + (dx / L) * 7} x2={PP[i].x + (dy / L) * 7} y2={PP[i].y - (dx / L) * 7} stroke="rgba(200,222,255,0.9)" strokeWidth={1.4} />
                </g>
              );
            })}
            <circle cx={500} cy={380} r={3} fill="rgba(200,222,255,0.7)" opacity={ramp(lf, 4, 14) * (1 - ramp(lf, 46, 60))} />
          </svg>

          {/* DEAD BODYWORK 1: the sunrise dial (S4's cheap morning check, as sculpture) */}
          <div style={{ position: "absolute", left: PP[1].x - 32 + PX(1), top: PP[1].y - 32, width: 64, height: 64, transform: `rotate(${PP[1].rot}deg) scale(${PP[1].s})`, opacity: PP[1].on, zIndex: 20 }}>
            <div style={{ position: "absolute", left: 26, top: 56, width: 12, height: 62, background: grad("#6E7788", "#2E3542") }} />
            <div style={{ position: "absolute", left: 18, top: 108, width: 28, height: 10, borderRadius: 2, background: grad("#59637A", "#232B37"), border: "1px solid rgba(200,220,250,0.22)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#B98C42", "#6E5222"), border: "3px solid rgba(255,226,160,0.4)", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,240,200,0.35)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 6, top: 6, width: 46, height: 46, borderRadius: "50%", background: grad("#F0E4C6", "#C9B78E") }} />
              <div style={{ position: "absolute", left: 10, top: 34, width: 38, height: 3, background: "rgba(60,44,10,0.6)" }} />
              <div style={{ position: "absolute", left: 18, top: 20, width: 22, height: 22, borderRadius: "50%", background: "#D98A3A", clipPath: "polygon(0 0,100% 0,100% 66%,0 66%)" }} />
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 12 + i * 10, top: 12, width: 2, height: 7, background: "rgba(60,44,10,0.45)", transform: `rotate(${-30 + i * 20}deg)` }} />)}
            </div>
          </div>
          {/* DEAD BODYWORK 2: the iris pod (S5's fresh eyes, sealed and inert) */}
          <div style={{ position: "absolute", left: PP[2].x - 30 + PX(1), top: PP[2].y - 30, width: 60, height: 60, transform: `rotate(${PP[2].rot}deg) scale(${PP[2].s})`, opacity: PP[2].on, zIndex: 20 }}>
            <div style={{ position: "absolute", left: 24, top: 52, width: 12, height: 78, background: grad("#6E7788", "#2E3542") }} />
            <div style={{ position: "absolute", left: 16, top: 120, width: 28, height: 10, borderRadius: 2, background: grad("#59637A", "#232B37"), border: "1px solid rgba(200,220,250,0.22)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#59637A", "#232B37"), border: "3px solid rgba(200,220,250,0.32)", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.75)", overflow: "hidden" }}>
              {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 26, top: 4, width: 12, height: 26, background: grad("#8E97A6", "#4A5260"), border: "1px solid rgba(20,26,36,0.5)", transformOrigin: "50% 100%", transform: `rotate(${i * 60}deg)` }} />)}
              <div style={{ position: "absolute", left: 24, top: 24, width: 12, height: 12, borderRadius: "50%", background: "#10161F" }} />
            </div>
          </div>
          {/* DEAD BODYWORK 3: the clipboard and out tray (S5's work order, as sculpture) */}
          <div style={{ position: "absolute", left: PP[3].x - 29 + PX(1), top: PP[3].y - 31, width: 58, height: 62, transform: `rotate(${PP[3].rot}deg) scale(${PP[3].s})`, opacity: PP[3].on, zIndex: 20 }}>
            <div style={{ position: "absolute", left: 22, top: 56, width: 12, height: 96, background: grad("#6E7788", "#2E3542") }} />
            <div style={{ position: "absolute", left: 14, top: 142, width: 28, height: 10, borderRadius: 2, background: grad("#59637A", "#232B37"), border: "1px solid rgba(200,220,250,0.22)" }} />
            <div style={{ position: "absolute", left: 2, top: 6, width: 40, height: 52, borderRadius: 3, background: grad("#8A6E44", "#4E3D24"), border: "1.5px solid rgba(255,226,170,0.3)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.75)" }}>
                <div style={{ position: "absolute", left: 4, top: 8, width: 32, height: 40, background: grad(PAPER, "#DDD4C0") }} />
                {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 8, top: 14 + k * 8, width: 24 - k * 4, height: 2, background: "rgba(40,52,80,0.32)" }} />)}
                <div style={{ position: "absolute", left: 13, top: 0, width: 14, height: 7, borderRadius: 2, background: "#9AA4B4" }} />
            </div>
            <div style={{ position: "absolute", left: 12, top: 44, width: 44, height: 14, borderRadius: 2, background: grad("#59637A", "#2B3340"), border: "1px solid rgba(200,220,250,0.28)" }} />
          </div>

          {/* ============ 6. THE BRASS 95% GAUGE. Part 4. The scene's one and only number. ============ */}
          <div style={{ position: "absolute", left: PP[4].x - 42 + PX(1), top: PP[4].y - 42, width: 84, height: 84, transform: `rotate(${PP[4].rot}deg) scale(${PP[4].s})`, opacity: PP[4].on, zIndex: 22 }}>
            <div style={{ position: "absolute", left: 34, top: 72, width: 16, height: 46, background: grad("#6E7788", "#2E3542") }} />
            <div style={{ position: "absolute", left: 26, top: 108, width: 32, height: 11, borderRadius: 2, background: grad("#59637A", "#232B37"), border: "1px solid rgba(200,220,250,0.22)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#D9A94E", "#7C5A22"), border: "4px solid rgba(255,232,170,0.5)", boxShadow: `0 10px 22px -6px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,244,210,0.5), 0 0 ${live * 12}px rgba(231,178,76,0.4)`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 6, top: 6, width: 64, height: 64, borderRadius: "50%", background: grad("#F6EFDA", "#CDBE97") }} />
              {Array.from({ length: 11 }).map((_, i) => {
                const a = (-120 + i * 24) * (Math.PI / 180);
                return <div key={"tk" + i} style={{ position: "absolute", left: 38 + Math.sin(a) * 27 - 1, top: 38 - Math.cos(a) * 27 - 4, width: 2, height: 8, background: "rgba(50,38,12,0.6)", transform: `rotate(${-120 + i * 24}deg)` }} />;
              })}
              {/* the 90 threshold: an ENGRAVED red tick, not lit, not a display */}
              <div style={{ position: "absolute", left: 38 + Math.sin(96 * (Math.PI / 180)) * 26 - 1.5, top: 38 - Math.cos(96 * (Math.PI / 180)) * 26 - 5, width: 3, height: 12, background: RED, opacity: 0.72, transform: "rotate(96deg)" }} />
              <div style={{ position: "absolute", left: 37, top: 12, width: 3, height: 28, background: "#2A2214", transformOrigin: "50% 100%", transform: `rotate(${-120 + (gVal / 100) * 240}deg)`, borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", left: 33, top: 35, width: 10, height: 10, borderRadius: "50%", background: "#3A3020", border: "1.5px solid rgba(255,240,200,0.4)" }} />
              <div style={{ position: "absolute", left: 20, top: 48, width: 38, height: 19, borderRadius: 3, background: "rgba(28,22,10,0.82)", border: "1px solid rgba(255,232,170,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 14, color: GOLD, letterSpacing: "-0.02em" }}>{gShow}%</div>
              </div>
              <div style={{ position: "absolute", left: 8, top: 4, width: 26, height: 24, borderRadius: "50%", background: "linear-gradient(140deg,rgba(255,255,255,0.5),transparent)", filter: "blur(2px)" }} />
            </div>
          </div>

          {/* contact puffs + key light sparks: a rain of clicks, not one snap */}
          {PARTS.map((p, i) => {
            const u = puff(i);
            if (u <= 0.01 || u >= 1) return null;
            return (
              <div key={"pf" + i} style={{ position: "absolute", left: p.cx + PX(1), top: p.cy, zIndex: 35 }}>
                <div style={{ position: "absolute", left: -40 * u - 10, top: -14 * u - 5, width: 80 * u + 20, height: 28 * u + 10, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(236,234,228,0.5), transparent 68%)", opacity: (1 - u) * 0.85, filter: "blur(3px)" }} />
                {Array.from({ length: 6 }).map((_, k) => {
                  const a = (k / 6) * Math.PI * 2 + seed(i * 3 + k);
                  return <div key={k} style={{ position: "absolute", left: Math.cos(a) * u * 44, top: Math.sin(a) * u * 24, width: 3, height: 3, borderRadius: "50%", background: GOLD, opacity: (1 - u) * 0.9, boxShadow: `0 0 6px ${GOLD}` }} />;
                })}
              </div>
            );
          })}

          {/* ============ 3. THE MANUAL: honest, coffee ringed, and it is what builds the line ============ */}
          <div style={{ position: "absolute", left: 296 + PX(1), top: 536, width: 220, height: 106, transform: `perspective(900px) rotateX(36deg) translateY(${Math.max(0, 1 - lf / 5) * -10}px)`, transformOrigin: "50% 100%", zIndex: 28 }}>
            {/* left board: the cover */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 104, height: 106, borderRadius: "5px 2px 2px 5px", background: grad("#E9C34E", "#B98C2B"), border: "2px solid rgba(60,44,10,0.55)", boxShadow: "0 18px 34px -10px rgba(0,0,0,0.85)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.22, backgroundImage: "linear-gradient(rgba(30,44,84,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(30,44,84,0.9) 1px, transparent 1px)", backgroundSize: "11px 11px" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 104, height: 17, background: SLATE }} />
              <div style={{ position: "absolute", left: 5, top: 2, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, color: "#F4EEE2", letterSpacing: "0.06em" }}>CLAYNES</div>
              <div style={{ position: "absolute", left: 5, top: 22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13, color: "#3A2C08", lineHeight: 1.05 }}>AGENTIC OS</div>
              <div style={{ position: "absolute", left: 5, top: 38, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 7, color: "rgba(58,44,8,0.9)", lineHeight: 1.2 }}>OWNER'S WORKSHOP MANUAL</div>
              {/* cutaway line art, unremarked cover texture */}
              <div style={{ position: "absolute", left: 40, top: 52, width: 58, height: 46, borderRadius: 3, border: "1.5px solid rgba(30,44,84,0.5)" }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 5 + i * 18, top: 8 + i * 5, width: 13, height: 13, borderRadius: "50%", border: "1.2px solid rgba(30,44,84,0.55)" }} />)}
                <div style={{ position: "absolute", left: 4, top: 32, width: 50, height: 1.5, background: "rgba(30,44,84,0.5)" }} />
              </div>
              {/* fine print = real line noise, no joke riding on it */}
              {[0, 1, 2, 3, 4].map((i) => <div key={"fp" + i} style={{ position: "absolute", left: 5, top: 54 + i * 5, width: 30 - i * 3, height: 1.6, background: "rgba(58,44,8,0.5)" }} />)}
              {/* 16. GRIME: the coffee ring */}
              <div style={{ position: "absolute", left: 52, top: 60, width: 34, height: 34, borderRadius: "50%", border: "3px solid rgba(92,58,20,0.3)" }} />
            </div>
            {/* spine, embossed OS. This is what the stamp punches off. */}
            <div style={{ position: "absolute", left: 104, top: 0, width: 12, height: 106, background: grad("#B98C22", "#7C5C12"), borderTop: "1px solid rgba(255,235,180,0.5)" }}>
              <div style={{ position: "absolute", left: 1, top: 44, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "rgba(255,244,214,0.95)", opacity: rise > 0.04 ? 0.2 : 1, textShadow: "0 1px 0 rgba(80,56,8,0.8)" }}>OS</div>
            </div>
            {/* right board + the fanning pages: each fans, its ink peels off as a 3D part, the page falls back flat */}
            <div style={{ position: "absolute", left: 116, top: 0, width: 104, height: 106, borderRadius: "2px 5px 5px 2px", background: grad("#FBF7EC", "#D8D0BE"), border: "2px solid rgba(60,44,10,0.45)", boxShadow: "0 18px 34px -10px rgba(0,0,0,0.85)", overflow: "hidden" }}>
              {Array.from({ length: 9 }).map((_, i) => <div key={"ln" + i} style={{ position: "absolute", left: 7, top: 8 + i * 10, width: 76 - i * 6, height: 2, background: "rgba(40,52,80,0.3)" }} />)}
              <div style={{ position: "absolute", right: 7, top: 10, width: 26, height: 32, borderRadius: 3, border: "1.5px dashed rgba(40,52,80,0.5)" }} />
            </div>
            {PARTS.map((p, i) => {
              const fan = over(lf, 3 + i * 2, 9, Easing.out(Easing.cubic));
              const inkGone = over(lf, 4 + i * 2, 6);
              return (
                <div key={"pg" + i} style={{ position: "absolute", left: 116, top: 0, width: 104, height: 106, borderRadius: "2px 5px 5px 2px", background: grad("#FDFAF2", "#E6DFCE"), border: "1.2px solid rgba(60,44,10,0.35)", transformOrigin: "0% 50%", transform: `rotateY(${-fan * 142}deg) translateZ(${i * 0.7}px)`, opacity: 0.97, boxShadow: "0 10px 18px -8px rgba(0,0,0,0.7)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 8, top: 12, width: 42, height: 34, borderRadius: 3, background: [SLATE, AMBER, "#59637A", "#8A6E44", GOLD, "#5D6574"][i], opacity: 1 - inkGone }} />
                  {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 56, top: 14 + k * 8, width: 38 - k * 6, height: 2, background: "rgba(40,52,80,0.32)" }} />)}
                  {[0, 1, 2, 3, 4].map((k) => <div key={"b" + k} style={{ position: "absolute", left: 8, top: 54 + k * 8, width: 84 - k * 9, height: 2, background: "rgba(40,52,80,0.22)" }} />)}
                </div>
              );
            })}
          </div>
          {/* paper flutter: torn scraps drifting off the fan, f4 to f30 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const t = lf - (4 + i * 1.8);
            if (t < 0 || t > 40) return null;
            const r = seed(i * 4.1 + 3);
            return <div key={"sc" + i} style={{ position: "absolute", left: 416 + PX(1) + t * (2 + r * 3) + Math.sin(t * 0.2 + i) * 12, top: 562 - t * (1.4 + r * 2.4), width: 7 + r * 6, height: 5 + r * 4, background: "rgba(250,246,236,0.8)", opacity: Math.max(0, 1 - t / 40), transform: `rotate(${t * (5 + r * 9)}deg)`, zIndex: 29 }} />;
          })}

          {/* ============ THE BENCH ============ */}
          <div style={{ position: "absolute", left: 26 + PX(1), top: 546, width: 534, height: 30, borderRadius: 6, background: grad("#6E5E48", "#3E3325"), border: "2px solid rgba(230,200,150,0.28)", boxShadow: "0 20px 40px -14px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,232,190,0.28)", zIndex: 27 }} />
          <div style={{ position: "absolute", left: 26 + PX(1), top: 574, width: 534, height: 10, background: "rgba(0,0,0,0.45)", zIndex: 27 }} />
          {[62, 500].map((x, i) => <div key={"bl" + i} style={{ position: "absolute", left: x + PX(1) + rake * 0.05, top: 582, width: 22, height: 92, background: grad("#4C4030", "#241D14"), borderRadius: 3, zIndex: 26 }} />)}
          {/* the tray the wrench rings into */}
          <div style={{ position: "absolute", left: 36 + PX(1), top: 548, width: 58, height: 20, borderRadius: 4, background: grad("#59637A", "#2B3340"), border: "1.5px solid rgba(200,220,250,0.3)", boxShadow: `0 5px 10px -3px rgba(0,0,0,0.7), inset 0 0 8px rgba(0,0,0,0.5)`, transform: `translateY(${Math.max(0, 1 - Math.abs(lf - 76) / 3) * 2}px)`, zIndex: 30 }} />
          {/* 16. GRIME: the red shop rag on the bench lip, brass swarf */}
          <div style={{ position: "absolute", left: 526 + PX(1), top: 542, width: 40, height: 18, borderRadius: "8px 4px 9px 6px", background: grad("#C44A3A", "#7C2618"), boxShadow: "0 4px 8px -3px rgba(0,0,0,0.7)", transform: "rotate(-9deg)", zIndex: 29 }} />
          {Array.from({ length: 9 }).map((_, i) => { const r = seed(i * 6.3 + 1); return <div key={"sw" + i} style={{ position: "absolute", left: 110 + r * 400 + PX(1), top: 548 + seed(i * 2.2) * 12, width: 3, height: 2, borderRadius: 1, background: "rgba(255,226,150,0.9)", opacity: 0.3 + Math.abs(Math.sin(lf * 0.12 + i * 2)) * 0.7, zIndex: 30 }} />; })}

          {/* ============ 12. THE 2c TIN BOT: still checking things nobody asked it to check. Unremarked. 41f. ============ */}
          <div style={{ position: "absolute", left: botX + PX(1), top: 520 - Math.abs(Math.sin(lf * 0.5)) * 2, width: 44, height: 52, transform: `scaleX(${botDir}) rotate(${Math.sin(lf * 0.5) * 3}deg)`, zIndex: 30 }}>
            <div style={{ position: "absolute", left: 20, top: -8, width: 2, height: 10, background: "#9AA4B4" }} />
            <div style={{ position: "absolute", left: 17, top: -12, width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 ${5 + Math.abs(Math.sin(lf * 0.2)) * 7}px ${RED}` }} />
            <div style={{ position: "absolute", left: 8, top: 2, width: 28, height: 20, borderRadius: 3, background: grad("#B9C2D2", "#5E6878"), border: "1.5px solid rgba(30,36,48,0.5)" }}>
              <div style={{ position: "absolute", left: 5, top: 7, width: 6, height: 6, background: AMBER }} />
              <div style={{ position: "absolute", left: 17, top: 7, width: 6, height: 6, background: AMBER }} />
            </div>
            <div style={{ position: "absolute", left: 5, top: 22, width: 34, height: 22, borderRadius: 3, background: grad("#8E97A6", "#3E4652"), border: "1.5px solid rgba(30,36,48,0.5)" }}>
              <div style={{ position: "absolute", left: 5, top: 5, width: 24, height: 3, background: "rgba(230,240,255,0.4)" }} />
              <div style={{ position: "absolute", left: 5, top: 12, width: 15, height: 3, background: "rgba(230,240,255,0.25)" }} />
            </div>
            {/* the wind up key, turning forever */}
            <div style={{ position: "absolute", left: -4, top: 26, width: 12, height: 12, borderRadius: "50%", border: "2.5px solid #C9CFDC", transform: `rotate(${lf * 9}deg)` }} />
            {[8, 26].map((lx, i) => <div key={"lg" + i} style={{ position: "absolute", left: lx, top: 44, width: 9, height: 8 - Math.max(0, Math.sin(lf * 0.5 + i * Math.PI)) * 3, background: "#4E5866", borderRadius: 2 }} />)}
          </div>

          {/* ============ L2 HERO: canonical warm clay Claude, eyes visible, 1.5x cameo scale, licensed and plateless ============ */}
          <div style={{ position: "absolute", left: HL + PX(1), top: HT, width: HS, height: HS, transformOrigin: "50% 100%", transform: `rotate(${lean}deg)`, zIndex: 30 }}>
            <Mascot lf={lf} size={HS} gaze={heroPoint > 0.4 ? -1.4 : lf < 60 ? -1.8 : 0} nodAmp={1.5} nodSpeed={9} capBack={1} cheer={0} stern={lf < 60 ? 0.5 : 0} />
            {/* navy mechanic's coverall, gold zip, stitched name strip */}
            <div style={{ position: "absolute", left: 31 * K, top: 96 * K, width: 134 * K, height: 52 * K, background: grad("#2C3E63", "#17233C"), borderTop: "3px solid #3D5581" }} />
            <div style={{ position: "absolute", left: 96 * K, top: 96 * K, width: 5 * K, height: 52 * K, background: GOLD, opacity: 0.9 }} />
            <div style={{ position: "absolute", left: 40 * K, top: 106 * K, width: 44 * K, height: 15 * K, borderRadius: 2, background: "#E9E3D4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 8, color: "#2C3E63", letterSpacing: "0.06em" }}>CLAUDE</div>
            </div>
            {/* his laminated licence, clipped to the chest, small and unremarked */}
            <div style={{ position: "absolute", left: 116 * K, top: 104 * K, width: 30 * K, height: 20 * K, borderRadius: 2, background: grad("#F4EFE2", "#D6CEBC"), border: `1.5px solid ${GOLD}`, boxShadow: "0 3px 6px -2px rgba(0,0,0,0.7)", transform: `rotate(${3 + Math.sin(lf * 0.07) * 1.5}deg)` }}>
              <div style={{ position: "absolute", left: 2, top: 2, width: 9, height: 9, borderRadius: 2, background: SLATE }} />
              <div style={{ position: "absolute", left: 13, top: 3, width: 13, height: 2, background: "rgba(40,52,80,0.4)" }} />
              <div style={{ position: "absolute", left: 13, top: 7, width: 9, height: 2, background: "rgba(40,52,80,0.28)" }} />
              <div style={{ position: "absolute", left: 2, top: 13, width: 24, height: 4, borderRadius: 2, background: GOLD, opacity: 0.6 }} />
            </div>
            {/* his rolled collar */}
            <div style={{ position: "absolute", left: 31 * K, top: 94 * K, width: 134 * K, height: 9 * K, borderRadius: 3, background: grad("#3D5581", "#22304E") }} />
            {/* goggles pushed up on the brim, leaving a clean smudge line */}
            <div style={{ position: "absolute", left: 44 * K, top: 34 * K, width: 112 * K, height: 13 * K, borderRadius: 4, background: "rgba(20,24,32,0.9)", border: "1.5px solid rgba(190,210,245,0.35)" }}>
              <div style={{ position: "absolute", left: 8 * K, top: 2, width: 32 * K, height: 8 * K, borderRadius: 3, background: "rgba(150,205,238,0.55)" }} />
              <div style={{ position: "absolute", left: 66 * K, top: 2, width: 32 * K, height: 8 * K, borderRadius: 3, background: "rgba(150,205,238,0.4)" }} />
            </div>
            <div style={{ position: "absolute", left: 46 * K, top: 47 * K, width: 108 * K, height: 5 * K, background: "rgba(255,236,208,0.22)" }} />
            {/* grease on one cheek */}
            <div style={{ position: "absolute", left: 138 * K, top: 82 * K, width: 15 * K, height: 6 * K, borderRadius: 3, background: "rgba(30,24,16,0.5)", transform: "rotate(-12deg)" }} />
            {/* the red rag on his hip, which he wipes his palms on */}
            <div style={{ position: "absolute", left: 34 * K, top: 130 * K, width: 22 * K, height: 26 * K, borderRadius: "4px 4px 10px 6px", background: grad("#C44A3A", "#7C2618"), transform: `rotate(${6 + wipe * 0.6}deg)` }} />
          </div>
          {/* his arms, drawn over the body so they can reach real objects. The pointing arm rides over the composer. */}
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${PX(1)}px)`, zIndex: heroPoint > 0.05 ? 54 : 31 }}>
            {arm([SHL[0], SHL[1]], [LHx, LH[1] + wipe], "hla")}
            {arm([SHR[0], SHR[1]], [RH[0], RH[1]], "hra")}
            {glove([LHx, LH[1] + wipe], "hlg")}
            {glove([RH[0], RH[1]], "hrg")}
            {/* the pointing nub, dead at the OS pill. One machine cycling, one pill, one finger. */}
            {heroPoint > 0.05 && <div style={{ position: "absolute", left: LHx - 32, top: LH[1] - 5, width: 28, height: 10, borderRadius: 5, background: grad("#E08A66", "#B85536"), border: "1px solid rgba(60,24,12,0.4)", opacity: heroPoint, boxShadow: "0 5px 12px -5px rgba(0,0,0,0.8)", zIndex: 55 }} />}
            {/* the stubby wrench: waiting into the converge, the last part lands in it at f56, his torque is the ignition */}
            {wrenchHeld ? (
              <div style={{ position: "absolute", left: LH[0] - 8, top: LH[1] - 30, width: 16, height: 46, transformOrigin: "50% 82%", transform: `rotate(${torqueR}deg)`, zIndex: 34 }}>
                <div style={{ position: "absolute", left: 4, top: 12, width: 8, height: 34, borderRadius: 3, background: grad("#C9CFDC", "#6C7482"), border: "1px solid rgba(30,36,48,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 16, borderRadius: 4, background: grad("#C9CFDC", "#6C7482"), border: "1px solid rgba(30,36,48,0.5)" }}>
                  <div style={{ position: "absolute", left: 5, top: 5, width: 6, height: 6, background: "#1A2130" }} />
                </div>
              </div>
            ) : (
              <div style={{ position: "absolute", left: wrX - 8, top: wrY - 22, width: 16, height: 46, transform: `rotate(${toss * 396}deg)`, zIndex: 34 }}>
                <div style={{ position: "absolute", left: 4, top: 12, width: 8, height: 34, borderRadius: 3, background: grad("#C9CFDC", "#6C7482"), border: "1px solid rgba(30,36,48,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 16, borderRadius: 4, background: grad("#C9CFDC", "#6C7482"), border: "1px solid rgba(30,36,48,0.5)" }}>
                  <div style={{ position: "absolute", left: 5, top: 5, width: 6, height: 6, background: "#1A2130" }} />
                </div>
              </div>
            )}
            {/* the two flat palm slaps: the dad slaps the roof meme, played straight, on a bench scale machine */}
            {slapHit > 0.05 && Array.from({ length: 5 }).map((_, i) => {
              const a = (i / 5) * Math.PI - Math.PI * 0.9;
              return <div key={"sl" + i} style={{ position: "absolute", left: 788 + Math.cos(a) * (16 + (1 - slapHit) * 26), top: 494 + Math.sin(a) * (10 + (1 - slapHit) * 16), width: 4, height: 4, borderRadius: "50%", background: "rgba(236,234,228,0.7)", opacity: slapHit * 0.8, zIndex: 34 }} />;
            })}
          </div>

          {/* ============ 13. THE LEAD GAG, entirely wordless: one leftover bolt, one flat pack card, and it runs anyway ============ */}
          {/* FG BENCH LIP, 3x parallax, out of focus, bottom left, held clear of the y655 to 745 composer band */}
          <div style={{ position: "absolute", left: -200 + PX(3), top: 642, width: 660, height: 120, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg,#2E2519 0%,#150F09 100%)", borderTop: "3px solid rgba(200,170,124,0.3)", filter: "blur(5px)", boxShadow: "0 -16px 34px rgba(0,0,0,0.65)", zIndex: 44 }} />
          <div style={{ position: "absolute", left: 138 + PX(3), top: 612, width: 30, height: 30, filter: "blur(2.4px)", zIndex: 45, transform: `rotate(${Math.max(0, 1 - lf / 40) * lf * 5}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 5, width: 30, height: 18, background: grad("#E4E9F2", "#7E8796"), clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)", boxShadow: "0 4px 9px -3px rgba(0,0,0,0.8)" }} />
            <div style={{ position: "absolute", left: 10, top: 10, width: 10, height: 8, background: "#2A303C" }} />
          </div>
          <div style={{ position: "absolute", left: 190 + PX(3), top: 590, width: 54, height: 52, borderRadius: 3, background: grad("#F6F1E4", "#D6CDB8"), border: "1.5px solid rgba(60,44,22,0.45)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.75)", filter: "blur(2.8px)", transform: `rotate(${-7 + draft * 1.6}deg)`, zIndex: 45 }}>
            {/* a distressed stick Claude, a phone, a crossed out helpline. No words. */}
            <div style={{ position: "absolute", left: 8, top: 8, width: 9, height: 9, borderRadius: "50%", border: "2px solid #3A3020" }} />
            <div style={{ position: "absolute", left: 11.5, top: 17, width: 2, height: 13, background: "#3A3020" }} />
            <div style={{ position: "absolute", left: 5, top: 16, width: 6, height: 2, background: "#3A3020", transform: "rotate(-46deg)" }} />
            <div style={{ position: "absolute", left: 14, top: 16, width: 6, height: 2, background: "#3A3020", transform: "rotate(46deg)" }} />
            <div style={{ position: "absolute", left: 8, top: 30, width: 4, height: 2, background: "#3A3020", transform: "rotate(48deg)" }} />
            <div style={{ position: "absolute", left: 13, top: 30, width: 4, height: 2, background: "#3A3020", transform: "rotate(-48deg)" }} />
            <div style={{ position: "absolute", left: 30, top: 10, width: 13, height: 22, borderRadius: 3, border: "2px solid #3A3020" }} />
            <div style={{ position: "absolute", left: 34, top: 26, width: 5, height: 3, borderRadius: 1, background: "#3A3020" }} />
            <div style={{ position: "absolute", left: 24, top: 4, width: 26, height: 3, background: RED, transform: "rotate(46deg)", transformOrigin: "0% 50%" }} />
            <div style={{ position: "absolute", left: 24, top: 34, width: 26, height: 3, background: RED, transform: "rotate(-46deg)", transformOrigin: "0% 50%" }} />
            <div style={{ position: "absolute", left: 4, top: 40, width: 46, height: 1.5, background: "rgba(60,44,22,0.35)" }} />
            <div style={{ position: "absolute", left: 4, top: 45, width: 30, height: 1.5, background: "rgba(60,44,22,0.28)" }} />
          </div>

          {/* ============ 8. THE EMPTY SLATE SUIT. FG 4x. Grey, empty, and the camera slides straight past it. ============ */}
          {/* He does not get to be in the last shot: the push clears him off frame right by ~f95. */}
          <div style={{ position: "absolute", left: 876 + push * 172, top: 40, width: 154, height: 540, transformOrigin: "62% 4px", transform: `rotate(${draft * 2.4}deg)`, filter: "blur(4px)", zIndex: 46, opacity: 0.95 }}>
            <div style={{ position: "absolute", left: 62, top: 0, width: 26, height: 9, borderRadius: 3, background: grad("#9AA4B4", "#4A5260") }} />
            <div style={{ position: "absolute", left: 54, top: 6, width: 44, height: 30, borderRadius: "22px 22px 0 0", border: "5px solid #8E96A6", borderBottom: "none" }} />
            {/* the sharp shoulder blocks, empty */}
            <div style={{ position: "absolute", left: 6, top: 36, width: 142, height: 26, borderRadius: 3, background: grad("#2C323F", "#141820"), boxShadow: "0 8px 18px -6px rgba(0,0,0,0.9)" }} />
            <div style={{ position: "absolute", left: 0, top: 44, width: 154, height: 280, background: grad("#242935", "#0E1117"), clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)", boxShadow: "0 22px 44px -14px rgba(0,0,0,0.9)" }} />
            {/* white collar + skinny tie, hanging on nothing */}
            <div style={{ position: "absolute", left: 55, top: 44, width: 44, height: 32, background: "#DCD8CC", clipPath: "polygon(0 0,100% 0,72% 100%,28% 100%)" }} />
            <div style={{ position: "absolute", left: 68, top: 66, width: 16, height: 152, background: "#0C0E13", clipPath: "polygon(0 0,100% 0,82% 100%,18% 100%)" }} />
            {/* the lapels: an open jacket with nobody in it */}
            <div style={{ position: "absolute", left: 40, top: 46, width: 34, height: 96, background: "#333A48", clipPath: "polygon(100% 0,100% 100%,0 24%)" }} />
            <div style={{ position: "absolute", left: 80, top: 46, width: 34, height: 96, background: "#333A48", clipPath: "polygon(0 0,0 100%,100% 24%)" }} />
            <div style={{ position: "absolute", left: 10, top: 58, width: 30, height: 258, background: grad("#20242E", "#0B0D12"), transform: "rotate(3deg)", borderRadius: 5 }} />
            <div style={{ position: "absolute", left: 112, top: 58, width: 30, height: 258, background: grad("#20242E", "#0B0D12"), transform: "rotate(-3deg)", borderRadius: 5 }} />
            {/* the coiled earpiece wire, still dangling off the collar */}
            {Array.from({ length: 12 }).map((_, i) => <div key={"ew" + i} style={{ position: "absolute", left: 94 + Math.sin(i * 1.05) * 8, top: 68 + i * 12, width: 5, height: 7, borderRadius: 2, background: "#39404E" }} />)}
            <div style={{ position: "absolute", left: 0, top: 322, width: 154, height: 218, background: "linear-gradient(180deg, rgba(16,19,25,0.92), transparent)", clipPath: "polygon(10% 0, 90% 0, 72% 100%, 28% 100%)" }} />
          </div>

          {/* ============ THE OS STAMP: the ONE header, punched off the spine, slammed dead centre over the running line ============ */}
          <div style={{ position: "absolute", left: stX + PX(1), top: stY, transform: `translate(-50%,-50%) rotate(${-2.4 + (1 - rise) * 26}deg) scale(${stS})`, opacity: rise > 0.01 ? 1 : 0, zIndex: 56 }}>
            <div style={{ position: "relative", width: 200, height: 84, borderRadius: 8, background: grad("#F4EFE2", "#CFC6B0"), border: `5px solid ${INK}`, boxShadow: `0 20px 44px -12px rgba(0,0,0,0.9), inset 0 0 0 3px rgba(244,239,226,1), inset 0 0 0 6px ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: INK, letterSpacing: "0.04em", lineHeight: 1 }}>OS</div>
              <div style={{ position: "absolute", inset: 0, opacity: 0.14, backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.3px)", backgroundSize: "4px 4px" }} />
              <div style={{ position: "absolute", left: -60 + ((lf * 12) % 340), top: 0, width: 60, height: 84, background: "linear-gradient(100deg,transparent,rgba(255,240,200,0.35),transparent)", transform: "skewX(-18deg)" }} />
            </div>
          </div>
          {slam > 0.02 && slam < 1 && Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <div key={"si" + i} style={{ position: "absolute", left: 500 + PX(1) + Math.cos(a) * (70 + slam * 90), top: 300 + Math.sin(a) * (34 + slam * 44), width: 5, height: 5, borderRadius: "50%", background: GOLD, opacity: (1 - slam) * 0.9, boxShadow: `0 0 8px ${GOLD}`, zIndex: 55 }} />;
          })}

          {/* ============ 17. THE ASK: the house comment composer, landing on the ignition kick ============ */}
          <div style={{ position: "absolute", left: 0, top: (1 - comp) * 120, width: 1012, height: 792, opacity: c01(comp), zIndex: 52 }}>
            <div style={{ position: "absolute", left: 110, top: 668, width: 62, height: 62, borderRadius: "50%", background: grad("#E08A66", "#C05B39"), border: "3px solid rgba(255,240,214,0.6)", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.85)" }}>
              <div style={{ position: "absolute", left: 14, top: 22, width: 9, height: 16, background: "#151312", borderRadius: 2 }} />
              <div style={{ position: "absolute", left: 33, top: 22, width: 9, height: 16, background: "#151312", borderRadius: 2 }} />
            </div>
            <div style={{ position: "absolute", left: 190, top: 656, width: 726, height: 88, borderRadius: 999, background: grad("#F7F3EA", "#E2DBCC"), border: "2.5px solid rgba(255,255,255,0.55)", boxShadow: "0 18px 44px -14px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.8)" }} />
            <div style={{ position: "absolute", left: 386, top: 669, width: 90, height: 62, borderRadius: 18, boxShadow: `0 0 ${12 + chipP * 26}px ${GOLD}`, opacity: 0.75 }} />
            <div style={{ position: "absolute", left: 430, top: 700, transform: `translate(-50%,-50%) scale(${1 + chipP * 0.05})` }}>
              <Chip text="OS" bg={grad("#F0CB63", "#D39A2A")} bd="#F6E4A0" fg="#3a2a05" size={30} />
            </div>
            <div style={{ position: "absolute", left: 496, top: 683, width: 3, height: 34, background: "#3A3428", opacity: caret }} />
            <div style={{ position: "absolute", left: 516, top: 685, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: "rgba(58,52,40,0.4)" }}>Add a comment...</div>
            <div style={{ position: "absolute", left: 836, top: 662, width: 62, height: 62, borderRadius: "50%", background: grad("#E08A66", "#B0492A"), border: "2.5px solid rgba(255,240,214,0.5)", boxShadow: `0 10px 22px -8px rgba(0,0,0,0.85), 0 0 ${chipP * 16}px ${CLAY}`, transform: `translateX(${chipP * 3}px)` }}>
              <div style={{ position: "absolute", left: 18, top: 18, width: 26, height: 26, background: "#FFF3DE", clipPath: "polygon(0 0,100% 50%,0 100%,18% 50%)" }} />
            </div>
          </div>

          {/* ============ VIGNETTE ============ */}
          <div style={{ position: "absolute", left: -30, top: 46, width: 1090, height: 746, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 58%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)", zIndex: 58 }} />
        </div>
      </div>
    </Panel>
  );
};

// ---------------- progress bar: TRUST meter + 5-milestone licence tracker ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const toolTimes = [L[3], L[4], L[5], L[6], L[7]];
  const count = toolTimes.filter((x) => t >= x).length;
  const litTimes = toolTimes.filter((x) => t >= x);
  const lastTool = litTimes.length ? Math.max(...litTimes) : -9;
  const pop = Math.max(0, 1 - (t - lastTool) * 3);
  const giftOpen = over(f, Lf[9] + fr(0.3), fr(0.5), Easing.out(Easing.back(2)));
  const shine = ((t * 46) % 150) - 40;   // travelling gloss on the filled track
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      {/* ===== THE TRACK: a recessed groove, gold hairline, inner shadow ===== */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 19, height: 24, borderRadius: 999, background: "linear-gradient(180deg,#20304A,#2E4666)", border: "1.5px solid rgba(231,178,76,0.28)", boxShadow: "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.06), 0 2px 5px rgba(0,0,0,0.3)" }} />
      {/* THE FILL: glossy clay, top highlight, glow, a leading shine that travels */}
      <div style={{ position: "absolute", left: 0, top: 19, height: 24, width: `calc(${p * 100}% + 2px)`, borderRadius: 999, background: "linear-gradient(180deg,#F0A277 0%,#DA7A4F 48%,#B85333 100%)", boxShadow: "0 3px 14px rgba(210,114,78,0.55), inset 0 2px 0 rgba(255,236,214,0.55), inset 0 -3px 5px rgba(120,50,26,0.5)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: `${shine}px`, top: 0, width: 40, height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,244,224,0.5),transparent)", transform: "skewX(-18deg)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 14, height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,248,235,0.7))" }} />
      </div>
      {/* ===== THE 5 MILESTONE COINS ===== */}
      {[0, 1, 2, 3, 4].map((i) => {
        const np = (i + 1) / 6;
        const lit = count > i;
        const dt = lit ? t - toolTimes[i] : 99;
        const pp = lit ? 1 + Math.max(0, 1 - dt * 2.2) * 0.42 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 4, transform: `translateX(-50%) scale(${pp})`, width: 50, height: 50 }}>
            {/* drop shadow pad */}
            <div style={{ position: "absolute", left: 8, top: 40, width: 34, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.35)", filter: "blur(3px)" }} />
            {/* glow when freshly lit */}
            {lit && <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${dt < 0.6 ? "cc" : "55"}, transparent 68%)`, filter: "blur(2px)", opacity: dt < 0.6 ? 1 : 0.7 }} />}
            {/* the coin: outer gold ring */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: lit ? "linear-gradient(160deg,#F8E08C,#C48F26)" : "linear-gradient(160deg,#C89A3E,#7A5A18)", boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }}>
              {/* the face, beveled */}
              <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: lit ? "linear-gradient(160deg,#F4CE68 0%,#D89B2C 60%,#B87E1E 100%)" : "linear-gradient(160deg,#2C3C5A 0%,#1B2740 70%)", border: lit ? "1px solid rgba(255,240,190,0.5)" : "1px solid rgba(231,178,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, color: lit ? "#4A3308" : "#E7B24C", boxShadow: "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -3px 5px rgba(0,0,0,0.35)", textShadow: lit ? "0 1px 0 rgba(255,246,214,0.6)" : "0 1px 2px rgba(0,0,0,0.5)" }}>
                {lit ? (
                  <svg width={24} height={24} viewBox="0 0 24 24"><path d="M5 12.5 L10 17.5 L19.5 6.5" fill="none" stroke="#4A3308" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : i + 1}
              </div>
              {/* top gloss crescent */}
              <div style={{ position: "absolute", left: 10, top: 6, width: 24, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.32)", filter: "blur(1.5px)" }} />
            </div>
            {lit && dt < 0.7 && <div style={{ position: "absolute", left: 25, top: 25, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + dt * 12})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
          </div>);
      })}
      {/* ===== THE REWARD: a crafted gold KEY (earned autonomy), locked+dim until the run completes ===== */}
      <div style={{ position: "absolute", right: -26, top: -16, width: 84, height: 84, transform: `translateY(${Math.sin(t * 2.4) * 2.5}px) scale(${1 + giftOpen * 0.14}) rotate(${-8 + giftOpen * 8}deg)`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${giftOpen > 0.1 ? "aa" : "33"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${12 + giftOpen * 26}px ${GOLD}${giftOpen > 0.1 ? "88" : "33"}` }} />
        <svg width={84} height={84} viewBox="0 0 84 84" style={{ position: "absolute", inset: 0, filter: giftOpen > 0.1 ? "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" : "grayscale(0.55) brightness(0.7) drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}>
          <defs>
            <linearGradient id="pbkey" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FCE79A" /><stop offset="0.55" stopColor="#E7B24C" /><stop offset="1" stopColor="#A9781F" /></linearGradient>
          </defs>
          <g transform="rotate(38 42 42)">
            {/* bow */}
            <circle cx={42} cy={24} r={15} fill="none" stroke="url(#pbkey)" strokeWidth={8} />
            <circle cx={42} cy={24} r={6} fill="#1B2740" />
            <circle cx={38} cy={19} r={3} fill="rgba(255,255,255,0.55)" />
            {/* shaft */}
            <rect x={38} y={37} width={8} height={30} rx={2} fill="url(#pbkey)" />
            {/* teeth */}
            <rect x={46} y={54} width={11} height={7} rx={1.5} fill="url(#pbkey)" />
            <rect x={46} y={63} width={8} height={7} rx={1.5} fill="url(#pbkey)" />
          </g>
        </svg>
      </div>
      {/* ===== THE MASCOT MARKER ===== */}
      <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        {/* connector notch to the track */}
        <div style={{ position: "absolute", left: "50%", top: 46, width: 4, height: 12, marginLeft: -2, background: "#2B2620", borderRadius: 2 }} />
        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "radial-gradient(circle,#FDFAF3,#EFE7D6)", border: "3px solid #2B2620", boxShadow: pop > 0.05 ? `0 0 ${14 + pop * 18}px ${GOLD}, 0 5px 12px rgba(26,24,19,0.5)` : "0 5px 14px rgba(26,24,19,0.45)" }} />
        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(231,178,76,0.55)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + pop * 2.4} nodSpeed={6.5} cheer={Math.max(pop * 0.8, count >= 5 ? 0.7 : 0)} capBack={count >= 5 ? 0 : 1} hardHat={count >= 5 ? 1 : 0} gaze={2} /></div>
        {/* TRUST pill: navy plaque, gold rim, a small shield glyph */}
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + pop * 0.34})`, padding: "4px 13px 4px 9px", borderRadius: 999, background: "linear-gradient(180deg,#243450,#141E30)", border: "1.5px solid rgba(231,178,76,0.7)", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", boxShadow: pop > 0.05 ? `0 0 13px ${GOLD}, 0 4px 9px rgba(0,0,0,0.5)` : "0 4px 9px rgba(0,0,0,0.45)" }}>
          <svg width={15} height={16} viewBox="0 0 15 16"><path d="M7.5 1 L14 3.4 V8 C14 12 11 14.6 7.5 15.6 C4 14.6 1 12 1 8 V3.4 Z" fill="#E7B24C" stroke="#8A6420" strokeWidth={0.8} /><path d="M4.6 8 L6.6 10 L10.4 5.6" fill="none" stroke="#1B2740" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: "#F4D98A", letterSpacing: "0.02em" }}>TRUST {count}/5</span>
        </div>
      </div>
    </div>
  );
};

// ---------------- captions ----------------
type W = { start: number; end: number; word: string };
const cw: W[] = (() => {
  const out: W[] = [];
  (words as W[]).forEach((w) => {
    const tk = w.word.trim();
    const frag = tk === "" || /^[%\-.,!?;:)]/.test(tk);
    if (frag && out.length) { const p = out[out.length - 1]; out[out.length - 1] = { ...p, word: p.word + w.word, end: w.end }; }
    else out.push({ ...w });
  });
  return out;
})();
const clines: { words: W[]; start: number; end: number }[] = (() => {
  const out: { words: W[]; start: number; end: number }[] = [];
  let cur: W[] = [];
  cw.forEach((w, i) => {
    cur.push(w);
    const next = cw[i + 1];
    const gap = next ? next.start - w.end : 99;
    const endsSent = /[.!?]$/.test(w.word.trim());
    if (cur.length >= 3 || gap > 0.34 || endsSent) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
  });
  if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return out;
})();

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const lead = 0.12;
  let cur = clines[0];
  for (let i = 0; i < clines.length; i++) {
    const ln = clines[i];
    const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0;
    if (t + lead >= gate) cur = ln;
  }
  const done = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 1256, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.start; const active = !done && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

// ---------------- HOOK HEADER (raycfu-style title, opening only) ----------------
// Standing house rule (memory/reel-hook-header): every reel opens with a big two-tone
// hook-headline that names Claude (in clay) so the hook is mute-readable as a TITLE in
// the first second. Slams in at frame 0, holds through the S0 hook, clears before S1.
const HeroHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > Lf[1] - 4) return null;                       // gone before the problem scene
  const slam = interpolate(f, [0, 5, 9], [1.16, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const inO = over(f, 0, 4);
  const outO = 1 - over(f, Lf[1] - 20, 16);
  const o = Math.min(inO, outO);
  const shimX = ((f * 9) % 520) - 130;
  const drop = interpolate(f, [0, 6], [-26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const L1 = (t: string, clay = false) => <span style={{ color: clay ? CLAY : "#F4EFE4" }}>{t}</span>;
  return (
    <div style={{ position: "absolute", left: 540, top: 452 + drop, transform: `translateX(-50%) scale(${slam})`, transformOrigin: "50% 0%", opacity: o, zIndex: 190, pointerEvents: "none" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "20px 44px 22px", borderRadius: 22, background: "linear-gradient(158deg,#151D33 0%,#080D1A 100%)", border: "2px solid rgba(207,149,68,0.45)", boxShadow: "0 30px 60px -18px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.10)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.02, letterSpacing: "-0.02em", whiteSpace: "nowrap", textShadow: "0 3px 16px rgba(0,0,0,0.6)" }}>{L1("Build the ")}{L1("agentic OS", true)}</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.02, letterSpacing: "-0.02em", whiteSpace: "nowrap", textShadow: "0 3px 16px rgba(0,0,0,0.6)" }}>{L1("that runs ")}{L1("Claude", true)}{L1(" for you")}</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: shimX, width: 150, background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.16),transparent)", transform: "skewX(-16deg)" }} />
      </div>
      <div style={{ position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 30, border: `3px solid ${GOLD}`, opacity: (1 - over(f, 0, 10)) * 0.85 }} />
    </div>
  );
};

export const ClaudeOsReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.026;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const toolTimes = [L[3], L[4], L[5], L[6], L[7]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_os.wav")} />
      <Audio loop src={staticFile("ebm_bed_hot.wav")} volume={(ff) => interpolate(ff, [0, fr(0.25), fr(L[9]) - 8, fr(L[9]) + 14, 99999], [0.1, 0.15, 0.15, 0.11, 0.11], { extrapolateRight: "clamp" })} />
      {/* ================= SOUND DESIGN v3: transients + ambient beds + specials ================= */}
      {/* ambient beds (continuous, per scene) */}
      <Sfx at={0} src="shop_bed.wav" v={0.09} dur={6.69} />
      <Sfx at={6.39} src="fire_bed.wav" v={0.13} dur={5.43} />
      <Sfx at={11.57} src="road_bed.wav" v={0.1} dur={3.22} />
      <Sfx at={14.54} src="machine_bed.wav" v={0.08} dur={8.76} />
      <Sfx at={23.05} src="shop_bed.wav" v={0.08} dur={3.74} />
      <Sfx at={26.54} src="shop_bed.wav" v={0.08} dur={8.78} />
      <Sfx at={35.07} src="machine_bed.wav" v={0.11} dur={3.8} />
      <Sfx at={38.62} src="machine_bed.wav" v={0.07} dur={7.48} />
      <Sfx at={45.85} src="road_bed.wav" v={0.12} dur={5.82} />
      <Sfx at={51.42} src="shop_bed.wav" v={0.08} dur={4.19} />
      {/* specials: header hit + boundary whooshes/impacts + S1 explosions */}
      <Sfx at={0} src="metal_riser.wav" v={0.4} dur={1.2} /><Sfx at={0.1} src="lib_cinematic_hit.wav" v={0.42} dur={0.9} /><Sfx at={0.16} src="sub.wav" v={0.3} dur={0.9} />
      {L.slice(1).map((tt, i) => <React.Fragment key={`bd${i}`}><Sfx at={tt - 0.08} src="lib_whoosh.wav" v={0.3} dur={0.6} /><Sfx at={tt} src="thock.wav" v={0.2} dur={0.4} /></React.Fragment>)}
      <Sfx at={10.04} src="boom.wav" v={0.42} dur={0.8} /><Sfx at={10.06} src="c_explode.wav" v={0.3} dur={0.6} /><Sfx at={10.09} src="rocket_explode.wav" v={0.2} dur={0.7} />
      <Sfx at={10.57} src="boom.wav" v={0.42} dur={0.8} /><Sfx at={10.59} src="c_explode.wav" v={0.3} dur={0.6} /><Sfx at={10.62} src="rocket_explode.wav" v={0.2} dur={0.7} />
      <Sfx at={11.11} src="boom.wav" v={0.42} dur={0.8} /><Sfx at={11.13} src="c_explode.wav" v={0.3} dur={0.6} /><Sfx at={11.16} src="rocket_explode.wav" v={0.2} dur={0.7} />
      {/* mapped transients (per-scene beat sheets, 0.22s min gap) */}
      {/* S0 */}
      <Sfx at={0.0} src="thock.wav" v={0.2} dur={0.4} />
      <Sfx at={0.267} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={0.8} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={1.1} src="impact.wav" v={0.22} dur={0.7} />
      <Sfx at={1.333} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={1.833} src="impact.wav" v={0.22} dur={0.7} />
      <Sfx at={2.4} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={2.933} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={3.2} src="swooshdn.wav" v={0.26} dur={0.6} />
      <Sfx at={3.467} src="slash.wav" v={0.18} dur={0.4} />
      <Sfx at={3.867} src="swooshdn.wav" v={0.2} dur={0.6} />
      <Sfx at={4.333} src="lib_pop.wav" v={0.26} dur={0.3} />
      <Sfx at={4.767} src="impact.wav" v={0.22} dur={0.7} />
      <Sfx at={5.133} src="lib_pop.wav" v={0.24} dur={0.3} />
      <Sfx at={5.5} src="impact.wav" v={0.22} dur={0.7} />
      <Sfx at={5.733} src="crash.wav" v={0.5} dur={0.7} />
      <Sfx at={6.0} src="construction.wav" v={0.18} dur={1.0} />
      <Sfx at={6.233} src="impact.wav" v={0.2} dur={0.7} />
      {/* S1 */}
      <Sfx at={6.507} src="lib_pop.wav" v={0.12} dur={0.3} />
      <Sfx at={7.173} src="construction.wav" v={0.16} dur={1.0} />
      <Sfx at={7.773} src="c_break.wav" v={0.35} dur={0.6} />
      <Sfx at={8.107} src="lib_pop.wav" v={0.2} dur={0.3} />
      <Sfx at={8.773} src="stamp_press.wav" v={0.42} dur={0.5} />
      <Sfx at={9.04} src="stamp_press.wav" v={0.45} dur={0.5} />
      <Sfx at={9.307} src="stamp_press.wav" v={0.48} dur={0.5} />
      <Sfx at={9.573} src="lib_pop.wav" v={0.24} dur={0.3} />
      <Sfx at={9.907} src="stamp_press.wav" v={0.4} dur={0.5} />
      <Sfx at={10.24} src="thock.wav" v={0.3} dur={0.4} />
      <Sfx at={10.64} src="thock.wav" v={0.28} dur={0.4} />
      <Sfx at={10.873} src="impact.wav" v={0.42} dur={0.7} />
      <Sfx at={11.107} src="stamp_press.wav" v={0.5} dur={0.5} />
      <Sfx at={11.44} src="c_break.wav" v={0.5} dur={0.6} />
      {/* S2 */}
      <Sfx at={11.82} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={12.187} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={12.553} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={12.92} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={13.287} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={13.653} src="impact.wav" v={0.38} dur={0.7} />
      <Sfx at={14.02} src="c_break.wav" v={0.17} dur={0.6} />
      <Sfx at={14.387} src="impact.wav" v={0.44} dur={0.7} />
      {/* S3 */}
      <Sfx at={15.59} src="lib_pop.wav" v={0.14} dur={0.3} />
      <Sfx at={15.99} src="stamp_press.wav" v={0.4} dur={0.5} />
      <Sfx at={16.323} src="lib_pop.wav" v={0.14} dur={0.3} />
      <Sfx at={16.79} src="c_break.wav" v={0.2} dur={0.6} />
      <Sfx at={17.057} src="c_break.wav" v={0.2} dur={0.6} />
      <Sfx at={17.523} src="c_break.wav" v={0.42} dur={0.6} />
      <Sfx at={17.923} src="c_break.wav" v={0.34} dur={0.6} />
      <Sfx at={18.323} src="c_break.wav" v={0.3} dur={0.6} />
      <Sfx at={18.59} src="chain_clank.wav" v={0.18} dur={0.6} />
      <Sfx at={18.923} src="lib_pop.wav" v={0.14} dur={0.3} />
      <Sfx at={19.257} src="c_break.wav" v={0.22} dur={0.6} />
      <Sfx at={19.59} src="impact.wav" v={0.46} dur={0.7} />
      <Sfx at={19.857} src="lib_pop.wav" v={0.34} dur={0.3} />
      <Sfx at={20.257} src="lib_pop.wav" v={0.44} dur={0.3} />
      <Sfx at={20.857} src="c_break.wav" v={0.5} dur={0.6} />
      <Sfx at={21.123} src="crash.wav" v={0.2} dur={0.7} />
      <Sfx at={21.457} src="thock.wav" v={0.22} dur={0.4} />
      <Sfx at={21.857} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={22.39} src="thock.wav" v={0.16} dur={0.4} />
      <Sfx at={22.857} src="c_break.wav" v={0.12} dur={0.6} />
      {/* S4 */}
      <Sfx at={23.1} src="tick.wav" v={0.34} dur={0.3} />
      <Sfx at={23.6} src="thock.wav" v={0.42} dur={0.4} />
      <Sfx at={24.1} src="tick.wav" v={0.14} dur={0.3} />
      <Sfx at={24.433} src="lib_whoosh.wav" v={0.36} dur={0.5} />
      <Sfx at={24.767} src="screech.wav" v={0.38} dur={0.7} />
      <Sfx at={25.0} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={25.3} src="thock.wav" v={0.36} dur={0.4} />
      <Sfx at={25.567} src="twang.wav" v={0.44} dur={0.5} />
      <Sfx at={25.867} src="fling.wav" v={0.12} dur={0.5} />
      <Sfx at={26.167} src="metal_riser.wav" v={0.2} dur={1.4} />
      <Sfx at={26.5} src="ding.wav" v={0.18} dur={0.7} />
      {/* S5 */}
      <Sfx at={26.79} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={27.057} src="lib_pop.wav" v={0.14} dur={0.3} />
      <Sfx at={27.323} src="lib_pop.wav" v={0.26} dur={0.3} />
      <Sfx at={27.723} src="lib_pop.wav" v={0.2} dur={0.3} />
      <Sfx at={27.99} src="lib_pop.wav" v={0.2} dur={0.3} />
      <Sfx at={28.257} src="lib_whoosh.wav" v={0.24} dur={0.5} />
      <Sfx at={28.59} src="ding.wav" v={0.28} dur={0.7} />
      <Sfx at={28.857} src="lib_pop.wav" v={0.16} dur={0.3} />
      <Sfx at={29.123} src="lib_pop.wav" v={0.12} dur={0.3} />
      <Sfx at={29.99} src="lib_pop.wav" v={0.4} dur={0.3} />
      <Sfx at={30.257} src="impact.wav" v={0.34} dur={0.7} />
      <Sfx at={30.59} src="swooshdn.wav" v={0.28} dur={0.6} />
      <Sfx at={30.857} src="c_break.wav" v={0.16} dur={0.6} />
      <Sfx at={31.59} src="data.wav" v={0.3} dur={0.4} />
      <Sfx at={32.023} src="thock.wav" v={0.3} dur={0.4} />
      <Sfx at={32.323} src="impact.wav" v={0.5} dur={0.7} />
      <Sfx at={32.59} src="swooshdn.wav" v={0.44} dur={0.6} />
      <Sfx at={32.923} src="slash.wav" v={0.36} dur={0.4} />
      <Sfx at={33.423} src="impact.wav" v={0.32} dur={0.7} />
      <Sfx at={33.823} src="thock.wav" v={0.3} dur={0.4} />
      <Sfx at={34.123} src="lib_pop.wav" v={0.24} dur={0.3} />
      <Sfx at={34.59} src="c_break.wav" v={0.5} dur={0.6} />
      <Sfx at={34.857} src="zucc.wav" v={0.16} dur={0.5} />
      {/* S6 */}
      <Sfx at={35.12} src="impact.wav" v={0.3} dur={0.7} />
      <Sfx at={35.387} src="chain_clank.wav" v={0.22} dur={0.6} />
      <Sfx at={35.72} src="swooshdn.wav" v={0.14} dur={0.6} />
      <Sfx at={35.987} src="construction.wav" v={0.18} dur={1.0} />
      <Sfx at={36.22} src="lib_pop.wav" v={0.14} dur={0.3} />
      <Sfx at={36.453} src="twang.wav" v={0.3} dur={0.5} />
      <Sfx at={36.853} src="swooshdn.wav" v={0.26} dur={0.6} />
      <Sfx at={37.12} src="crash.wav" v={0.36} dur={0.7} />
      <Sfx at={37.387} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={37.653} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={38.053} src="impact.wav" v={0.5} dur={0.7} />
      <Sfx at={38.32} src="c_break.wav" v={0.18} dur={0.6} />
      <Sfx at={38.587} src="tick.wav" v={0.24} dur={0.3} />
      {/* S7 */}
      <Sfx at={39.003} src="thock.wav" v={0.42} dur={0.4} />
      <Sfx at={39.537} src="thock.wav" v={0.4} dur={0.4} />
      <Sfx at={40.003} src="thock.wav" v={0.4} dur={0.4} />
      <Sfx at={40.403} src="thock.wav" v={0.4} dur={0.4} />
      <Sfx at={40.77} src="thock.wav" v={0.42} dur={0.4} />
      <Sfx at={41.103} src="thock.wav" v={0.42} dur={0.4} />
      <Sfx at={41.403} src="thock.wav" v={0.44} dur={0.4} />
      <Sfx at={41.67} src="thock.wav" v={0.46} dur={0.4} />
      <Sfx at={41.937} src="c_break.wav" v={0.18} dur={0.6} />
      <Sfx at={42.203} src="chain_clank.wav" v={0.26} dur={0.6} />
      <Sfx at={42.47} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={42.737} src="tick.wav" v={0.32} dur={0.3} />
      <Sfx at={43.003} src="slash.wav" v={0.48} dur={0.4} />
      <Sfx at={43.27} src="impact.wav" v={0.36} dur={0.7} />
      <Sfx at={43.737} src="impact.wav" v={0.5} dur={0.7} />
      <Sfx at={44.137} src="impact.wav" v={0.46} dur={0.7} />
      <Sfx at={44.403} src="impact.wav" v={0.48} dur={0.7} />
      <Sfx at={44.67} src="tick.wav" v={0.3} dur={0.3} />
      <Sfx at={45.137} src="stamp_press.wav" v={0.26} dur={0.5} />
      <Sfx at={45.403} src="swooshdn.wav" v={0.3} dur={0.6} />
      <Sfx at={45.67} src="crash.wav" v={0.5} dur={0.7} />
      {/* S8 */}
      <Sfx at={45.9} src="lib_whoosh.wav" v={0.24} dur={0.5} />
      <Sfx at={46.167} src="crash.wav" v={0.34} dur={0.7} />
      <Sfx at={46.5} src="rev_up.wav" v={0.3} dur={1.0} />
      <Sfx at={46.9} src="thock.wav" v={0.3} dur={0.4} />
      <Sfx at={47.367} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={47.9} src="lib_notif.wav" v={0.3} dur={0.5} />
      <Sfx at={48.3} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={48.833} src="ding.wav" v={0.28} dur={0.7} />
      <Sfx at={49.233} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={49.567} src="thock.wav" v={0.2} dur={0.4} />
      <Sfx at={50.167} src="c_fanfare.wav" v={0.3} dur={1.4} />
      <Sfx at={50.9} src="lib_whoosh.wav" v={0.24} dur={0.5} />
      <Sfx at={51.233} src="metal_riser.wav" v={0.22} dur={1.4} />
      {/* S9 */}
      <Sfx at={51.47} src="c_break.wav" v={0.45} dur={0.6} />
      <Sfx at={51.803} src="chain_clank.wav" v={0.1} dur={0.6} />
      <Sfx at={52.37} src="key.wav" v={0.1} dur={0.6} />
      <Sfx at={53.17} src="chain_clank.wav" v={0.1} dur={0.6} />
      <Sfx at={53.47} src="rev_up.wav" v={0.5} dur={1.0} />
      <Sfx at={53.87} src="crash.wav" v={0.5} dur={0.7} />
      <Sfx at={54.137} src="key.wav" v={0.1} dur={0.6} />
      <Sfx at={54.403} src="crash.wav" v={0.5} dur={0.7} />
      <Sfx at={54.67} src="impact.wav" v={0.18} dur={0.7} />
      <Sfx at={55.003} src="key.wav" v={0.1} dur={0.6} />
      <Sfx at={55.27} src="lib_pop.wav" v={0.14} dur={0.3} />

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <S0 lf={frame - Lf[0]} />}
        {scene(1) && <S1 lf={frame - Lf[1]} />}
        {scene(2) && <S2 lf={frame - Lf[2]} />}
        {scene(3) && <S3 lf={frame - Lf[3]} />}
        {scene(4) && <S4 lf={frame - Lf[4]} />}
        {scene(5) && <S5 lf={frame - Lf[5]} />}
        {scene(6) && <S6 lf={frame - Lf[6]} />}
        {scene(7) && <S7 lf={frame - Lf[7]} />}
        {scene(8) && <S8 lf={frame - Lf[8]} />}
        {scene(9) && <S9 lf={frame - Lf[9]} />}
        <Captions />
      </AbsoluteFill>
      <HeroHeader />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.45, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
