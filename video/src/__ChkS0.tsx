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

  // S0 = ONE WARM HOLE IN A BLACK FIELD, being sealed. Interior key is harsh white-blue ARC (it is a
  // grinder, not a bonfire); warm clay bounces only INSIDE the rectangle; the apron gets a cold sodium
  // rim and nothing else until f178, when the sparks he just locked away hose out under the door.
  const ARC = "#C8D8E8", VOID = "#12141A";

  // ===================== THE SHUTTER CLOCK: three ratcheting hauls, one padlock =====================
  const SHEAR = 168, LOCK = 176;
  const thudPh = ((lf - 4) % 11 + 11) % 11;                        // the crate-thud cadence, all scene
  const jam = lf >= LOCK ? Math.max(0, 1 - thudPh / 5) : 0;        // after the lock it fires into steel
  const shBase =
    lf < 120 ? 210 + Math.sin(lf * 1.25) * 2.4                                                            // the loose slat, vibrating
      : lf < 142 ? interpolate(lf, [120, 140], [210, 364], { ...cl, easing: Easing.out(Easing.quad) })     // haul one
        : lf < 162 ? interpolate(lf, [142, 160], [364, 532], { ...cl, easing: Easing.out(Easing.quad) })   // haul two
          : lf < 171 ? interpolate(lf, [162, 168, 171], [532, 664, 700], cl)                              // haul three: f168 shears the run
            : interpolate(lf, [171, 173, 176], [700, 664, 675], { ...cl, easing: Easing.out(Easing.quad) }); // BOOM, one bounce, rests bowed at 675
  const shY = shBase + jam * 1.7 * Math.sin(lf * 3.1);
  const closed = shY > 640;
  const haulP = ramp(shY, 210, 675);

  // ===================== THE GRINDER: the scene's key light, never stops =====================
  const arc = 0.5 + Math.abs(Math.sin(lf * 0.92)) * 0.34 + (Math.floor(lf / 3) % 5 === 0 ? 0.24 : 0);

  // ===================== L11 CAMERA: dead level, head-on, centred, never static =====================
  const camS = interpolate(lf, [0, 116, 122, 132, 192], [1.0, 1.044, 1.024, 1.03, 1.058], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const drift = interpolate(lf, [116, 124, 136], [0, -7, -10], cl);   // flinch back + 1% LEFT, hasp stays at 505
  const shake = pulse(120, 8) * 3 + pulse(142, 9) * 4.6 + pulse(162, 10) * 6 + pulse(171, 10) * 8.5 + pulse(LOCK, 11) * 9.5 + pulse(184, 7) * 4 + jam * 0.9;
  const camX = drift + Math.sin(lf * 0.71) + Math.sin(lf * 4.3) * shake;
  const camY = Math.cos(lf * 0.53) + Math.cos(lf * 5.1) * shake * 0.6;
  const keyPush = interpolate(lf, [184, 192], [1, 2.0], { ...cl, easing: Easing.in(Easing.cubic) });
  const irisR = interpolate(lf, [184, 189, 192], [10, 58, 200], { ...cl, easing: Easing.in(Easing.quad) });

  // ===================== L2: THE MON-SUN CALENDAR AND ITS SEVEN-PAGE DRIFT (the number spine) =====
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const TEARS = [6, 20, 34, 48, 62, 76, 90];   // SUN lands at f103: SEVEN pages face-up on the floor at f104
  const torn = TEARS.filter((t) => lf >= t).length;
  const faceDay = lf < 118 ? (DAYS[torn] || "") : lf < 136 ? "MON" : "TUE";
  const blockH = lf < 118 ? 62 - torn * 6 : 62 - (lf >= 136 ? 6 : 0);
  const scoop = ramp(lf, 118, 127);                                 // he scoops the spent week and starts week two
  const ripK = pulse(118, 8);

  // ===================== L3: THE CRATE BUFFER, WIP climbing to the roof =====================
  const JOBS = ["SHIP", "PATCH", "MIGRATE", "TESTS", "DOCS", "BUILD"];
  const nCrate = Math.min(18, 2 + Math.floor(lf / 11));
  const buffTop = 660 - Math.ceil(nCrate / 2) * 44;

  // ===================== L4: THE OUTBOUND RUN AND THE APRON DELIVERY STACK =====================
  // The run is aimed OUT. That is the whole reason the lock costs something.
  const nOut = Math.min(9, Math.floor(lf / 22) + 1);
  const ridePh = lf < SHEAR ? lf % 22 : -1;
  const flap = interpolate(lf, [SHEAR, 174, 178, 183], [0, 27, 21, 24], { ...cl, easing: Easing.out(Easing.quad) });

  // ===================== L7: THE VILLAIN =====================
  // Already in the dead unlit corner from f96, with the rain. Never shown separating: he is born in S1.
  // Pure black cutout: no shades, no face, no stamp, no slate tint. He hauls, he locks, he leaves.
  const vIn = (lf >= 96 && lf < 124) || (lf >= 143 && lf < 166);   // inside the mouth, behind the falling steel
  const vMid = lf >= 124 && lf < 143;                              // the one excursion: over the sill, to the offering
  const vOut = lf >= 166 && lf < 188;                              // out on the apron, at the hasp, then gone
  const vcx = lf < 112 ? 802
    : lf < 124 ? interpolate(lf, [112, 121], [802, 786], { ...cl, easing: Easing.inOut(Easing.quad) })
      : lf < 143 ? interpolate(lf, [124, 130, 136, 142], [786, 540, 540, 786], { ...cl, easing: Easing.inOut(Easing.quad) })
        : lf < 163 ? 786
          : interpolate(lf, [163, 171, 176, 187], [786, 622, 566, 1140], { ...cl, easing: Easing.inOut(Easing.quad) });
  const vfeet = lf < 124 ? 660
    : lf < 143 ? interpolate(lf, [124, 130, 136, 142], [660, 700, 700, 660], cl)
      : lf < 163 ? 660
        : interpolate(lf, [163, 171, 177], [660, 748, 756], cl);
  const vsize = lf < 112 ? 288
    : lf < 124 ? interpolate(lf, [112, 121], [288, 300], cl)
      : lf < 143 ? interpolate(lf, [124, 130, 136, 142], [300, 268, 268, 300], cl)
        : lf < 163 ? 300
          : interpolate(lf, [163, 171, 177], [300, 344, 350], cl);
  const duck = interpolate(lf, [163, 167, 174], [1, 0.34, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const yank = pulse(120, 9) + pulse(142, 10) + pulse(162, 11);     // three shoves, each louder and heavier
  const boot = lf >= 127 && lf < 137 ? Math.sin(((lf - 127) / 10) * Math.PI) : 0;
  const walking = (lf >= 124 && lf < 143) || lf >= 163;
  const gripping = lf >= 114 && lf < 163;
  const gripY = vfeet - vsize * 0.42 + yank * 26;

  // ===================== THE PADLOCK: his only possession =====================
  const nubX = vcx - vsize * 0.4, nubY = vfeet - vsize * 0.44;
  const plX = lf < 173 ? nubX : interpolate(lf, [173, 175], [nubX, 505], { ...cl, easing: Easing.inOut(Easing.quad) });
  const plY = lf < 166 ? nubY + 110
    : lf < 173 ? interpolate(lf, [166, 172], [nubY + 110, nubY], { ...cl, easing: Easing.out(Easing.cubic) })
      : interpolate(lf, [173, 176], [nubY, 726], { ...cl, easing: Easing.inOut(Easing.quad) });
  const plRot = lf >= LOCK ? Math.sin((lf - LOCK) * 0.62) * 8 * Math.exp(-(lf - LOCK) / 30) : Math.sin(lf * 0.4) * 5;
  const plLit = ramp(lf, 178, 182);                                  // the arc he just locked away lights his own lock
  const spec = pulse(180, 4);
  const shack = lf < LOCK ? 13 : Math.max(0, 13 - (lf - LOCK) * 6.5);
  const ring = pulse(LOCK, 9);

  // ===================== L9: THE OFFERING AND THE REFUSAL =====================
  const ofX = lf < 110 ? 430
    : lf < 131 ? interpolate(lf, [110, 119], [430, 505], { ...cl, easing: Easing.out(Easing.quad) })
      : interpolate(lf, [131, 139], [505, 522], { ...cl, easing: Easing.inOut(Easing.quad) });
  const ofY = lf < 110 ? 620
    : lf < 131 ? interpolate(lf, [110, 114, 119], [612, 566, 730], { ...cl, easing: Easing.in(Easing.quad) })
      : interpolate(lf, [131, 139], [730, 672], { ...cl, easing: Easing.inOut(Easing.quad) });
  const ofS = lf < 131 ? interpolate(lf, [110, 119], [0.78, 1.14], cl) : interpolate(lf, [131, 139], [1.14, 0.86], cl);
  const ofOut = lf >= 116 && lf < 139;

  // ===================== L1: THE HERO BURN (frame 0 is already mid-action, no ramp) =====================
  const lp = lf % 22;
  const fight = ramp(lf, 176, 186);                                  // from f176 the loop turns into a fight with a jam
  const hx = 400 + Math.sin(lf * 0.2856) * (13 + fight * 9);
  const hlean = Math.sin(lf * 0.2856 + 1.1) * 5;
  const hkick = Math.max(0, 1 - Math.abs(lp - 15) / 3);

  // ===================== 12: THE FORKLIFT WHO DIDN'T GET THE MEMO =====================
  const fkT = (lf % 96) / 96;
  const fkX = 180 + (fkT < 0.55 ? fkT / 0.55 : 1 - (fkT - 0.55) / 0.45) * 640;
  const dent = ramp(lf, 184, 188);
  const bonk2 = pulse(190, 6);

  // ---------- the arc-white spark fan: the key light, down and to the right, never off ----------
  const sparks = (n: number, ox: number, oy: number, key: string) =>
    Array.from({ length: n }, (_, i) => {
      const r = seed(i * 2.7 + 11), r2 = seed(i * 5.3 + 4), r3 = seed(i * 1.3 + 19);
      const life = 11 + r * 15;
      const t = ((lf * (1.9 + r2 * 1.6) + r * 70) % life) / life;
      const vx = 40 + r * 150;                 // the fan spreads right
      const vy = -34 - r3 * 44;                // thrown up first, gravity wins
      const sz = 2.6 + r * 3.4;
      return (
        <div key={key + i} style={{
          position: "absolute", left: ox + t * vx, top: oy + t * vy + t * t * 150,
          width: sz + t * vx * 0.14, height: sz, borderRadius: 2,
          background: t < 0.4 ? "#FFFFFF" : r > 0.58 ? ARC : "#FFDCA8",
          opacity: (1 - t * 0.9) * (0.62 + arc * 0.38), boxShadow: `0 0 ${8 + r * 14}px rgba(206,228,255,0.95)`,
          transform: `rotate(${(Math.atan2(vy + 2 * t * 150, vx) * 180) / Math.PI}deg)`,
        }} />
      );
    });

  // ---------- a stencilled clay crate with a job word branded on the end grain ----------
  const crate = (k: string, x: number, y: number, w: number, h: number, job: string, s = 1) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 3, background: grad("#C97C55", "#7E4527"), border: "1.5px solid rgba(255,214,170,0.28)", boxShadow: "0 6px 12px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.16)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: w * 0.16, top: -2, width: 7 * s, height: h + 4, background: "rgba(190,196,210,0.5)" }} />
      <div style={{ position: "absolute", left: w * 0.76, top: -2, width: 7 * s, height: h + 4, background: "rgba(190,196,210,0.5)" }} />
      <div style={{ position: "absolute", left: 0, top: h * 0.3, width: w, textAlign: "center", fontFamily: mono, fontSize: 9 * s, letterSpacing: 0.5, fontWeight: 700, color: "rgba(40,22,12,0.72)" }}>{job}</div>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, boxShadow: `inset 0 0 ${10 * s}px rgba(30,14,6,0.55)` }} />
    </div>
  );

  // ---------- THE VILLAIN, staged as a committed hard-backlit BLACK CUTOUT ----------
  const villain = (glow: number, z: number) => (
    <div style={{
      position: "absolute", left: vcx - vsize / 2, top: vfeet - vsize * 0.92, width: vsize, height: vsize,
      transform: `scaleY(${duck}) translateY(${yank * 24}px)`, transformOrigin: "50% 100%", zIndex: z,
      filter: `brightness(0)${glow > 0.01 ? ` drop-shadow(0 0 ${9 * glow}px rgba(200,216,232,${0.5 * glow})) drop-shadow(0 0 24px rgba(217,119,87,${0.28 * glow}))` : ""}`,
    }}>
      <Villain lf={lf} size={vsize} rain={0} nodAmp={walking ? 4.6 : 0.7} nodSpeed={walking ? 5 : 22} />
      {/* the boot that shoves the offering back inside, without a look */}
      {boot > 0 && <div style={{ position: "absolute", left: vsize * 0.24 - boot * vsize * 0.16, top: vsize * 0.86, width: vsize * 0.34, height: vsize * 0.12, borderRadius: 5, background: "#1A1D24", transform: `rotate(${-4 - boot * 14}deg)`, transformOrigin: "100% 40%" }} />}
    </div>
  );

  return (
    <Panel label="night-owl-fab">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden", background: VOID }}>
        {/* ===== OUTER: the f184 push into the padlock's KEYHOLE, which becomes S1's opening black ===== */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `scale(${keyPush})`, transformOrigin: "505px 726px" }}>
          {/* ===== INNER: dead-level head-on camera. 4% push, then a flinch back and 1% LEFT on haul one ===== */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${camX}px, ${camY}px) scale(${camS})`, transformOrigin: "505px 470px" }}>

            {/* ============ THE VOID: flat dead black, zero geometry. No street. No facade. ============ */}
            <div style={{ position: "absolute", left: -80, top: -80, width: 1172, height: 952, background: VOID }} />

            {/* ============ 10. THE SHOP SIGN: knockoff neon, stuttering O, no numeral ============ */}
            {(() => {
              const buzz = 0.72 + Math.abs(Math.sin(lf * 1.7)) * 0.2 + (Math.floor(lf / 5) % 13 === 7 ? -0.34 : 0);
              const oOut = lf % 40 > 34 && lf % 40 < 39;
              return (
                <>
                  <div style={{ position: "absolute", left: 512, top: 112, width: 7, height: 16, background: "#2C303A" }} />
                  <div style={{ position: "absolute", left: 776, top: 112, width: 7, height: 16, background: "#2C303A" }} />
                  <div style={{ position: "absolute", left: 430, top: 46, width: 430, height: 70, borderRadius: 8, background: grad("#191C24", "#0E1016"), border: "2.5px solid #2E333E", boxShadow: `0 0 ${22 + buzz * 26}px rgba(120,196,255,${0.14 + buzz * 0.12}), inset 0 0 30px rgba(0,0,0,0.7)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 37, letterSpacing: "0.02em", color: "#9FD6F5", opacity: buzz, textShadow: "0 0 8px #6FBEEA, 0 0 20px rgba(90,180,240,0.8), 0 0 40px rgba(70,150,220,0.5)", whiteSpace: "nowrap" }}>
                      NIGHT <span style={{ opacity: oOut ? 0.09 : 1, textShadow: oOut ? "none" : "0 0 8px #6FBEEA, 0 0 20px rgba(90,180,240,0.8)" }}>O</span>WL FAB CO.
                    </div>
                    {[0, 1, 2, 3, 4].map((i) => <div key={"sr" + i} style={{ position: "absolute", left: 10 + i * 102, top: 6, width: 5, height: 5, borderRadius: "50%", background: "#454B58" }} />)}
                  </div>
                  <div style={{ position: "absolute", left: 400, top: 40, width: 490, height: 110, background: `radial-gradient(ellipse, rgba(110,190,240,${0.08 * buzz}), transparent 66%)`, filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none" }} />
                </>
              );
            })()}

            {/* ============================ THE INTERIOR, clipped to the mouth ============================ */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, clipPath: "inset(196px 132px 92px 140px)" }}>

              {/* FAR BACKGROUND: the back wall. Hot in the middle, dead in the right corner. */}
              <div style={{ position: "absolute", left: 140, top: 196, width: 740, height: 504, background: "linear-gradient(180deg,#232732 0%,#2A2C33 46%,#332C2A 100%)" }} />
              <div style={{ position: "absolute", left: 300, top: 300, width: 520, height: 420, background: `radial-gradient(ellipse at 42% 88%, rgba(206,224,244,${0.16 + arc * 0.2}), transparent 66%)`, mixBlendMode: "screen", filter: "blur(8px)" }} />
              <div style={{ position: "absolute", left: 250, top: 420, width: 560, height: 300, background: "radial-gradient(ellipse at 46% 92%, rgba(217,119,87,0.34), transparent 64%)", mixBlendMode: "screen", filter: "blur(10px)" }} />
              {Array.from({ length: 9 }, (_, r) => <div key={"bl" + r} style={{ position: "absolute", left: 140, top: 214 + r * 50, width: 740, height: 1.5, background: "rgba(255,240,220,0.045)" }} />)}
              <div style={{ position: "absolute", left: 660, top: 196, width: 220, height: 504, background: "linear-gradient(90deg, transparent, rgba(6,8,12,0.5) 62%)" }} />
              <div style={{ position: "absolute", left: 140, top: 196, width: 110, height: 504, background: "linear-gradient(270deg, transparent, rgba(6,8,12,0.6))" }} />

              {/* 6. THE OPEN NEON NOBODY TURNED OFF, swinging on two chains */}
              {(() => {
                const sw = Math.sin(lf * 0.062) * 3.4 + jam * Math.sin(lf * 2.2) * 1.6;
                return (
                  <div style={{ position: "absolute", left: 568, top: 214, transformOrigin: "0px 0px", transform: `rotate(${sw}deg)`, zIndex: 3 }}>
                    <div style={{ position: "absolute", left: -40, top: 0, width: 2.5, height: 92, background: "rgba(190,190,200,0.4)" }} />
                    <div style={{ position: "absolute", left: 40, top: 0, width: 2.5, height: 92, background: "rgba(190,190,200,0.4)" }} />
                    <div style={{ position: "absolute", left: -66, top: 91, width: 132, height: 62, borderRadius: "50%", border: `4px solid rgba(224,60,58,${0.62 + Math.abs(Math.sin(lf * 0.3)) * 0.3})`, background: "rgba(14,10,16,0.75)", boxShadow: "0 0 24px rgba(224,60,58,0.6), inset 0 0 16px rgba(224,60,58,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: "0.06em", color: "#7FC8F2", textShadow: "0 0 8px #46A8E8, 0 0 22px rgba(60,150,230,0.85)" }}>OPEN</div>
                    </div>
                    <div style={{ position: "absolute", left: -86, top: 78, width: 172, height: 92, background: "radial-gradient(ellipse, rgba(200,70,90,0.16), transparent 66%)", filter: "blur(6px)", mixBlendMode: "screen" }} />
                  </div>
                );
              })()}

              {/* 5. THE LINE SHAFT: four pulleys and slapping leather belts, running the whole time */}
              <div style={{ position: "absolute", left: 200, top: 196, width: 660, height: 18, background: grad("#5A6270", "#262A33"), boxShadow: "0 4px 8px rgba(0,0,0,0.6)", zIndex: 4 }} />
              {[250, 430, 640, 810].map((px, i) => (
                <React.Fragment key={"pl" + i}>
                  <div style={{ position: "absolute", left: px - 8, top: 210, width: 6, height: 74 + i * 22, background: grad("#7A5A3C", "#3A2A1C"), transform: `skewX(${Math.sin(lf * 0.42 + i * 1.7) * 5}deg)`, transformOrigin: "50% 0%", zIndex: 4 }} />
                  <div style={{ position: "absolute", left: px + 3, top: 210, width: 6, height: 74 + i * 22, background: grad("#6A4C32", "#2E2116"), transform: `skewX(${Math.sin(lf * 0.42 + i * 1.7 + 2.1) * 5}deg)`, transformOrigin: "50% 0%", zIndex: 4 }} />
                  <div style={{ position: "absolute", left: px - 15, top: 190, width: 30, height: 30, borderRadius: "50%", background: grad("#6E7788", "#2B3240"), border: "2px solid rgba(210,225,250,0.22)", zIndex: 5 }}>
                    <div style={{ position: "absolute", left: 13, top: 2, width: 3, height: 26, background: "rgba(255,255,255,0.3)", transform: `rotate(${lf * (14 + i * 3)}deg)`, transformOrigin: "50% 50%" }} />
                    <div style={{ position: "absolute", left: 2, top: 13, width: 26, height: 3, background: "rgba(255,255,255,0.18)", transform: `rotate(${lf * (14 + i * 3)}deg)`, transformOrigin: "50% 50%" }} />
                  </div>
                </React.Fragment>
              ))}

              {/* 9. THE WALL CLOCK, hands visibly spinning: running for hours on its own */}
              <div style={{ position: "absolute", left: 752, top: 226, width: 40, height: 40, borderRadius: "50%", background: grad("#E6E2D6", "#8C887C"), border: "2.5px solid #4A4A44", boxShadow: "0 6px 12px rgba(0,0,0,0.6)", zIndex: 5, opacity: 0.6 }}>
                {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 16.5 + Math.cos(k * 1.5708) * 14, top: 16.5 + Math.sin(k * 1.5708) * 14, width: 2, height: 2, background: "#3A3A34" }} />)}
                <div style={{ position: "absolute", left: 17, top: 5, width: 2, height: 14, background: "#2A2A24", transformOrigin: "50% 100%", transform: `rotate(${lf * 21}deg)` }} />
                <div style={{ position: "absolute", left: 16.6, top: 9, width: 2.5, height: 10, background: "#2A2A24", transformOrigin: "50% 100%", transform: `rotate(${lf * 1.75}deg)` }} />
                <div style={{ position: "absolute", left: 15.5, top: 15.5, width: 5, height: 5, borderRadius: "50%", background: "#2A2A24" }} />
              </div>

              {/* 8. TWO CAGED WORK LAMPS on visible twisted flex, swaying out of sync */}
              {[{ x: 430, fy: 26, w: 300, ph: 0 }, { x: 724, fy: 11, w: 260, ph: 2.4 }].map((L2, i) => {
                const sw = Math.sin(lf * 0.077 + L2.ph) * 3.6 + jam * Math.sin(lf * 2.6) * 1.4;
                const hum = 0.84 + Math.abs(Math.sin(lf * 1.3 + i * 2)) * 0.16;
                return (
                  <div key={"lp" + i} style={{ position: "absolute", left: L2.x, top: 214, transformOrigin: "0px 0px", transform: `rotate(${sw}deg)`, zIndex: 6 }}>
                    {Array.from({ length: 4 }, (_, k) => <div key={k} style={{ position: "absolute", left: -2 + (k % 2 ? 2 : -2), top: k * (L2.fy / 4), width: 3, height: L2.fy / 4 + 1, background: "#4C505C" }} />)}
                    <div style={{ position: "absolute", left: -15, top: L2.fy, width: 30, height: 26, borderRadius: "4px 4px 13px 13px", border: "2px solid rgba(190,200,220,0.5)", background: "rgba(20,24,32,0.35)", overflow: "hidden" }}>
                      {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 4 + k * 7, top: -2, width: 1.5, height: 30, background: "rgba(190,200,220,0.5)" }} />)}
                      <div style={{ position: "absolute", left: 7, top: 5, width: 14, height: 14, borderRadius: "50%", background: "#FFF3D6", opacity: hum, boxShadow: `0 0 ${16 * hum}px rgba(255,226,170,0.95)` }} />
                    </div>
                    <div style={{ position: "absolute", left: -L2.w, top: L2.fy + 24, width: L2.w * 2, height: 410, background: "linear-gradient(180deg,rgba(255,222,164,0.30),rgba(255,206,140,0.08) 56%,transparent)", clipPath: "polygon(48.5% 0%, 51.5% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", opacity: hum, pointerEvents: "none" }} />
                  </div>
                );
              })}

              {/* 14. the stiff broom, the swept swarf, and the smoke haze */}
              <div style={{ position: "absolute", left: 152, top: 520, width: 6, height: 118, background: grad("#8A6844", "#40301E"), transform: "rotate(7deg)", transformOrigin: "50% 100%", zIndex: 6 }} />
              <div style={{ position: "absolute", left: 146, top: 632, width: 30, height: 13, borderRadius: 2, background: grad("#5A4630", "#2A2016"), transform: "rotate(7deg)", zIndex: 6 }} />
              <div style={{ position: "absolute", left: 144, top: 645, width: 46, height: 12, borderRadius: "50%", background: "rgba(90,72,54,0.7)", filter: "blur(2px)", zIndex: 6 }} />
              {Array.from({ length: 10 }, (_, i) => {
                const r = seed(i * 3.7 + 2);
                const t = ((lf * (0.5 + r * 0.5) + r * 300) % 300) / 300;
                return <div key={"hz" + i} style={{ position: "absolute", left: 180 + r * 620 - t * 90, top: 640 - t * 400, width: 70 + r * 110, height: 70 + r * 110, borderRadius: "50%", background: `rgba(${Math.floor(150 + r * 40)},${Math.floor(160 + r * 40)},${Math.floor(180 + r * 40)},0.05)`, filter: "blur(12px)", opacity: (1 - t) * 0.8, zIndex: 7 }} />;
              })}

              {/* BACK WALL FURNITURE: a pegboard of tools, a wall fan and a chain hoist, all working */}
              <div style={{ position: "absolute", left: 350, top: 380, width: 130, height: 92, background: grad("#5E4A32", "#2A2016"), border: "2px solid rgba(255,220,170,0.16)", boxShadow: "0 8px 16px rgba(0,0,0,0.6)", zIndex: 8 }}>
                {Array.from({ length: 40 }, (_, k) => <div key={"pgh" + k} style={{ position: "absolute", left: 8 + (k % 8) * 16, top: 8 + Math.floor(k / 8) * 17, width: 3, height: 3, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />)}
                {/* the tools that never get hung back straight */}
                <div style={{ position: "absolute", left: 12, top: 14, width: 8, height: 48, borderRadius: 3, background: grad("#B4BCCA", "#4A505C"), transform: "rotate(6deg)" }} />
                <div style={{ position: "absolute", left: 8, top: 12, width: 16, height: 12, borderRadius: 3, background: grad("#C9CFDC", "#5A6274"), transform: "rotate(6deg)" }} />
                <div style={{ position: "absolute", left: 36, top: 16, width: 7, height: 40, borderRadius: 3, background: grad("#9AA4B6", "#3A404C"), transform: "rotate(-9deg)" }} />
                <div style={{ position: "absolute", left: 32, top: 50, width: 15, height: 14, borderRadius: 2, background: grad("#8E96A6", "#343A46"), transform: "rotate(-9deg)" }} />
                <div style={{ position: "absolute", left: 60, top: 14, width: 6, height: 52, background: grad("#C9A24A", "#6E5218"), transform: "rotate(4deg)" }} />
                <div style={{ position: "absolute", left: 84, top: 18, width: 26, height: 26, borderRadius: "50%", border: "4px solid #7A8290", transform: `rotate(${Math.sin(lf * 0.06) * 5}deg)` }} />
                <div style={{ position: "absolute", left: 100, top: 50, width: 22, height: 8, borderRadius: 3, background: grad("#B4BCCA", "#4A505C"), transform: `rotate(${-12 + Math.sin(lf * 0.11) * 4}deg)`, transformOrigin: "10% 50%" }} />
                <div style={{ position: "absolute", left: 60, top: 70, width: 40, height: 7, borderRadius: 3, background: grad("#9AA4B6", "#3A404C"), transform: "rotate(3deg)" }} />
              </div>
              {/* the wall fan the crate buffer eventually buries */}
              <div style={{ position: "absolute", left: 178, top: 288, width: 64, height: 64, borderRadius: "50%", background: "rgba(12,14,20,0.75)", border: "3px solid #4A505C", boxShadow: "0 6px 14px rgba(0,0,0,0.6)", overflow: "hidden", zIndex: 8 }}>
                {[0, 1, 2, 3].map((k) => <div key={"fb" + k} style={{ position: "absolute", left: 27, top: 6, width: 10, height: 26, borderRadius: "5px 5px 0 0", background: "rgba(150,164,186,0.6)", transformOrigin: "50% 100%", transform: `rotate(${lf * 26 + k * 90}deg)` }} />)}
                {[0, 1, 2, 3, 4].map((k) => <div key={"fg" + k} style={{ position: "absolute", left: 4 + k * 6, top: 4, width: 1.5, height: 56, background: "rgba(190,204,226,0.28)" }} />)}
                {[0, 1, 2, 3, 4].map((k) => <div key={"fg2" + k} style={{ position: "absolute", left: 34 + k * 6, top: 4, width: 1.5, height: 56, background: "rgba(190,204,226,0.28)" }} />)}
                <div style={{ position: "absolute", left: 25, top: 25, width: 12, height: 12, borderRadius: "50%", background: grad("#8E96A6", "#343A46") }} />
              </div>
              {/* the chain hoist, swinging on the shaft's vibration */}
              <div style={{ position: "absolute", left: 300, top: 214, transformOrigin: "0px 0px", transform: `rotate(${Math.sin(lf * 0.09 + 1) * 2.4}deg)`, zIndex: 8 }}>
                {Array.from({ length: 11 }, (_, k) => <div key={"ch" + k} style={{ position: "absolute", left: k % 2 ? -3 : 0, top: k * 12, width: 7, height: 11, borderRadius: "50%", border: "2px solid rgba(150,164,186,0.5)" }} />)}
                <div style={{ position: "absolute", left: -6, top: 132, width: 14, height: 22, borderRadius: "0 0 8px 8px", border: "4px solid rgba(180,194,216,0.6)", borderTop: "none" }} />
              </div>

              {/* 3. THE CALENDAR, re-nailed inside his own work loop, one step from the bench */}
              <div style={{ position: "absolute", left: 630, top: 214, width: 20, height: 446, background: grad("#6A5238", "#2E2418"), boxShadow: "3px 0 8px rgba(0,0,0,0.6)", zIndex: 8 }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 3, top: 60 + k * 130, width: 14, height: 2, background: "rgba(0,0,0,0.4)" }} />)}
              </div>
              <div style={{ position: "absolute", left: 636, top: 448, width: 5, height: 5, borderRadius: "50%", background: "#B9B3A6", zIndex: 10 }} />
              <div style={{ position: "absolute", left: 612, top: 455, transformOrigin: "26px 0px", transform: `rotate(${Math.sin(lf * 0.13) * 2.6 + ripK * 9}deg)`, zIndex: 10 }}>
                <div style={{ width: 56, height: 16, borderRadius: "3px 3px 0 0", background: grad("#3A4763", "#1E2739") }} />
                <div style={{ position: "absolute", left: 0, top: 15, width: 56, height: blockH, background: grad("#EFEAD9", "#B7AF98"), boxShadow: "0 8px 14px rgba(0,0,0,0.6)" }}>
                  {Array.from({ length: 5 }, (_, k) => <div key={k} style={{ position: "absolute", left: 0, top: blockH - 2 - k * 2.4, width: 56, height: 1, background: "rgba(120,110,90,0.5)" }} />)}
                  <div style={{ position: "absolute", left: 0, top: 5, width: 56, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: "#3A3428", letterSpacing: "-0.02em" }}>{faceDay}</div>
                </div>
                {ripK > 0 && <div style={{ position: "absolute", left: 0, top: 15, width: 56, height: 8, background: "rgba(255,255,255,0.7)", opacity: ripK }} />}
              </div>

              {/* 3. THE SEVEN-PAGE DRIFT: the week, countable with your eye, face-up on the floor at f104 */}
              {TEARS.map((at, i) => {
                if (lf < at) return null;
                const fall = over(lf, at, 13, Easing.in(Easing.quad));
                const px = interpolate(fall, [0, 1], [634, 486 + i * 28], cl);
                const py = interpolate(fall, [0, 1], [470, 622 + seed(i * 3.1) * 7], cl);
                const rot = interpolate(fall, [0, 1], [0, -13 + i * 3.6 + seed(i + 9) * 5], cl) + (1 - fall) * Math.sin((lf - at) * 0.5) * 44;
                return (
                  <div key={"pg" + i} style={{ position: "absolute", left: px - scoop * (30 + i * 5), top: py - scoop * 42, width: 46, height: 36, transform: `rotate(${rot + scoop * 24}deg) scale(${1 - scoop * 0.4})`, transformOrigin: "50% 50%", opacity: (1 - scoop) * (0.68 + fall * 0.32), zIndex: 23 }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: 46, height: 36, borderRadius: 2, background: grad("#F7F3E6", "#C0B8A0"), boxShadow: "0 5px 10px rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.45)" }} />
                    <div style={{ position: "absolute", left: 0, top: 10, width: 46, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#3A3226" }}>{DAYS[i]}</div>
                    <div style={{ position: "absolute", left: 5, top: 3, width: 36, height: 1.5, background: "rgba(120,110,90,0.45)" }} />
                  </div>
                );
              })}
              {/* week two, already stripping while the shutter comes down */}
              {lf >= 136 && (() => {
                const fall = over(lf, 136, 13, Easing.in(Easing.quad));
                return (
                  <div style={{ position: "absolute", left: interpolate(fall, [0, 1], [634, 560], cl), top: interpolate(fall, [0, 1], [470, 630], cl), width: 44, height: 34, transform: `rotate(${-16 + (1 - fall) * Math.sin((lf - 136) * 0.5) * 44}deg)`, zIndex: 23 }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: 44, height: 34, borderRadius: 2, background: grad("#F4F0E2", "#C4BCA4"), boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }} />
                    <div style={{ position: "absolute", left: 0, top: 9, width: 44, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#40382A" }}>MON</div>
                  </div>
                );
              })()}

              {/* 5. THE CHUTE: the drop tube that keeps spitting finished work at the buffer */}
              <div style={{ position: "absolute", left: 150, top: 214, width: 58, height: 52, background: grad("#4A5261", "#20242C"), border: "1.5px solid rgba(200,215,240,0.18)", zIndex: 8 }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 0, top: 12 + k * 14, width: 58, height: 2, background: "rgba(0,0,0,0.4)" }} />)}
              </div>
              <div style={{ position: "absolute", left: 156, top: 262, width: 54, height: 12, borderRadius: "0 0 6px 6px", background: grad("#5C6472", "#262C36"), transform: "rotate(9deg)", transformOrigin: "0% 50%", boxShadow: "0 6px 12px rgba(0,0,0,0.6)", zIndex: 8 }} />

              {/* 4. THE CRATE BUFFER: two crates at f0, a wall to the roof by f172 */}
              {Array.from({ length: nCrate }, (_, i) => {
                const born = i * 11;
                if (lf < born) return null;
                const land = over(lf, born, 6, Easing.out(Easing.back(2)));
                return crate("cb" + i, 190 + (i % 2) * 78, 660 - (Math.floor(i / 2) + 1) * 44 - (1 - land) * 40, 70, 42, JOBS[i % JOBS.length]);
              })}
              {(() => {
                const ph = lf % 11;
                if (ph > 7) return null;
                const t = ph / 7;
                const col = Math.floor(lf / 11) % 2;
                const tgt = 660 - (Math.floor(nCrate / 2) + 1) * 44;
                return crate("fall", interpolate(t, [0, 1], [198, 190 + col * 78], cl), interpolate(t, [0, 1], [270, tgt], { ...cl, easing: Easing.in(Easing.quad) }), 70, 42, JOBS[Math.floor(lf / 11) % JOBS.length]);
              })()}
              <div style={{ position: "absolute", left: 184, top: buffTop - 6, width: 162, height: 6, background: "rgba(190,196,210,0.3)", zIndex: 12 }} />

              {/* 7. THE SPARK BENCH: his station, and the key light of the whole scene */}
              <div style={{ position: "absolute", left: 448, top: 618, width: 132, height: 42, borderRadius: 2, background: grad("#3E4552", "#191D25"), border: "1.5px solid rgba(200,215,240,0.14)", zIndex: 12 }}>
                <div style={{ position: "absolute", left: 8, top: 8, width: 52, height: 26, borderRadius: 2, background: "rgba(10,12,16,0.5)", border: "1px solid rgba(200,215,240,0.14)" }} />
                <div style={{ position: "absolute", left: 70, top: 8, width: 52, height: 26, borderRadius: 2, background: "rgba(10,12,16,0.5)", border: "1px solid rgba(200,215,240,0.14)" }} />
                <div style={{ position: "absolute", left: 28, top: 19, width: 14, height: 3, background: "rgba(200,215,240,0.4)" }} />
                <div style={{ position: "absolute", left: 90, top: 19, width: 14, height: 3, background: "rgba(200,215,240,0.4)" }} />
              </div>
              <div style={{ position: "absolute", left: 440, top: 606, width: 148, height: 12, borderRadius: 2, background: grad("#9AA4B6", "#48505E"), boxShadow: "0 8px 14px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.28)", zIndex: 13 }} />
              {/* THE BENCH GRINDER: motor, guard over the back of the wheel, work held on the front lip */}
              <div style={{ position: "absolute", left: 470, top: 556, width: 56, height: 52, borderRadius: 5, background: grad("#6E7788", "#242A34"), border: "1.5px solid rgba(210,225,250,0.24)", boxShadow: "0 8px 16px rgba(0,0,0,0.65)", zIndex: 14 }}>
                {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 7 + k * 11, top: 7, width: 4, height: 38, background: "rgba(0,0,0,0.4)" }} />)}
                <div style={{ position: "absolute", left: 8, top: -6, width: 12, height: 8, borderRadius: 2, background: "#C9A24A" }} />
              </div>
              <div style={{ position: "absolute", left: 520, top: 562, width: 52, height: 52, borderRadius: "50%", background: "conic-gradient(#8E96A6, #383E4A, #8E96A6, #383E4A, #8E96A6, #383E4A, #8E96A6)", transform: `rotate(${lf * 41}deg)`, border: "2px solid rgba(220,236,255,0.35)", boxShadow: `0 0 ${8 + arc * 16}px rgba(200,224,255,0.65)`, zIndex: 15 }}>
                <div style={{ position: "absolute", left: 18, top: 18, width: 14, height: 14, borderRadius: "50%", background: grad("#C9CFDC", "#5A6274") }} />
              </div>
              <div style={{ position: "absolute", left: 512, top: 552, width: 50, height: 34, borderRadius: "26px 26px 0 0", background: grad("#F0C63E", "#8A6614"), border: "1.5px solid rgba(255,240,190,0.4)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)", zIndex: 16 }} />
              <div style={{ position: "absolute", left: 550, top: 596, width: 26, height: 7, borderRadius: 2, background: grad("#9AA4B6", "#3A404C"), transform: "rotate(-6deg)", zIndex: 16 }} />
              {/* THE CONTACT: where the work meets the wheel. This is the key light of the whole scene. */}
              <div style={{ position: "absolute", left: 540, top: 578, width: 46, height: 46, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${0.5 + arc * 0.5}), rgba(200,224,255,0.35) 40%, transparent 70%)`, mixBlendMode: "screen", zIndex: 24, pointerEvents: "none" }} />

              {/* 1 + L1. THE HERO: goggles UP so his eyes read, coveralls, L-plate, sticker gun HOLSTERED */}
              {(() => {
                const U = 152 / 200;
                return (
                  <div style={{ position: "absolute", left: hx - 76, top: 520, width: 152, height: 152, zIndex: 17, transform: `rotate(${hlean * 0.4}deg)`, transformOrigin: "50% 100%" }}>
                    <div style={{ position: "absolute", left: 14, top: 140, width: 124, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(6px)" }} />
                    <Mascot lf={lf} size={152} gaze={3} nodAmp={3.6 + fight * 2.4} nodSpeed={7} />
                    <div style={{ position: "absolute", left: 34 * U, top: 100 * U, width: 132 * U, height: 48 * U, background: grad("#31456E", "#16203A"), borderRadius: 2 }} />
                    <div style={{ position: "absolute", left: 34 * U, top: 96 * U, width: 132 * U, height: 6 * U, background: "rgba(240,236,226,0.8)" }} />
                    <div style={{ position: "absolute", left: 34 * U, top: 122 * U, width: 132 * U, height: 6 * U, background: "rgba(240,236,226,0.75)" }} />
                    {[46, 74, 102, 130].map((cx2, i) => <div key={"cv" + i} style={{ position: "absolute", left: cx2 * U, top: 104 * U, width: 8 * U, height: 42 * U, background: "rgba(255,255,255,0.1)", transform: "skewX(-16deg)" }} />)}
                    {/* the red L learner badge, velcroed on. It survives to S7 and comes off exactly once, there. */}
                    <div style={{ position: "absolute", left: 116 * U, top: 104 * U, width: 30 * U, height: 30 * U, borderRadius: 3, background: PAPER, border: `${2.5 * U}px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19 * U, color: RED, transform: `rotate(${Math.sin(lf * 0.09) * 2}deg)`, boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }}>L</div>
                    {/* welding goggles pushed UP on the brow: his eyes stay visible. That is the tell. */}
                    <div style={{ position: "absolute", left: 32 * U, top: 30 * U, width: 136 * U, height: 15 * U, borderRadius: 3, background: grad("#5C6A54", "#242A20"), border: `${1.5 * U}px solid #8A9480` }} />
                    <div style={{ position: "absolute", left: 54 * U, top: 18 * U, width: 44 * U, height: 18 * U, borderRadius: 4, background: grad("#8FC3E8", "#2E5474"), border: `${2 * U}px solid #4A5240`, transform: "rotate(-5deg)" }} />
                    <div style={{ position: "absolute", left: 104 * U, top: 18 * U, width: 44 * U, height: 18 * U, borderRadius: 4, background: grad("#8FC3E8", "#2E5474"), border: `${2 * U}px solid #4A5240`, transform: "rotate(-5deg)" }} />
                    <div style={{ position: "absolute", left: 116 * U, top: 86 * U, width: (10 + ramp(lf, 0, 192) * 22) * U, height: 8 * U, borderRadius: "50%", background: "rgba(20,18,16,0.55)", filter: "blur(1.4px)", transform: "rotate(-13deg)" }} />
                    {/* 11. THE TOOL BELT, WITH THE STICKER GUN HOLSTERED. Never fired. S1 peels it off him. */}
                    <div style={{ position: "absolute", left: 32 * U, top: 128 * U, width: 136 * U, height: 11 * U, background: grad("#7A5A3C", "#33240F"), borderRadius: 2 }} />
                    <div style={{ position: "absolute", left: 92 * U, top: 127 * U, width: 15 * U, height: 13 * U, background: grad("#C9A24A", "#6E5218"), borderRadius: 2 }} />
                    <div style={{ position: "absolute", left: 128 * U, top: 132 * U, transform: `rotate(${8 + Math.sin(lf * 0.1) * 2}deg)`, transformOrigin: "50% 0%" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, width: 34 * U, height: 30 * U, borderRadius: 3, background: grad("#4A5261", "#1C2028"), border: `${1.2 * U}px solid rgba(200,215,240,0.2)` }} />
                      <div style={{ position: "absolute", left: 2 * U, top: -12 * U, width: 30 * U, height: 24 * U, borderRadius: 3, background: grad("#6E7788", "#2B3240"), border: `${1.2 * U}px solid rgba(210,225,250,0.3)`, boxShadow: "0 4px 9px rgba(0,0,0,0.5)" }} />
                      <div style={{ position: "absolute", left: 5 * U, top: -24 * U, width: 22 * U, height: 22 * U, borderRadius: "50%", background: grad("#C6CE5C", "#8B9635"), border: `${1.5 * U}px solid #5F6A22`, transform: `rotate(${lf * 3}deg)` }}>
                        <div style={{ position: "absolute", left: 7 * U, top: 7 * U, width: 6 * U, height: 6 * U, borderRadius: "50%", background: "#3B4318" }} />
                      </div>
                    </div>
                    {/* the arm into the grinder, and the crate strap swinging in the other nub */}
                    <div style={{ position: "absolute", left: 176 * U, top: 82 * U, width: (56 + hkick * 8) * U, height: 15 * U, borderRadius: 3, background: grad("#E08A63", "#B4522F"), transform: `rotate(${12 + hkick * 8}deg)`, transformOrigin: "0% 50%" }} />
                    <div style={{ position: "absolute", left: -14 * U, top: 96 * U, width: 12 * U, height: 30 * U, borderRadius: 3, background: grad("#9AA4B6", "#3A404C"), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.24) * 14}deg)` }} />
                  </div>
                );
              })()}
              <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 24, pointerEvents: "none" }}>{sparks(40, 562, 600, "sk")}</div>
              <div style={{ position: "absolute", left: 400, top: 470, width: 420, height: 300, background: `radial-gradient(ellipse at 40% 44%, rgba(212,234,255,${0.24 + arc * 0.26}), transparent 62%)`, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 18, pointerEvents: "none" }} />

              {/* 15. THE CODE RAIN, seeded INSIDE, in the dead corner, 24 frames before he moves */}
              {lf >= 96 && <div style={{ position: "absolute", left: 0, top: 0, zIndex: 26 }}><CodeRain lf={lf} x={715} y={260} h={400} cols={1} o={ramp(lf, 96, 106)} gap={0} /></div>}
              {lf >= 108 && <div style={{ position: "absolute", left: 0, top: 0, zIndex: 26 }}><CodeRain lf={lf + 31} x={760} y={260} h={400} cols={1} o={ramp(lf, 108, 118)} gap={0} /></div>}
              {lf >= 116 && <div style={{ position: "absolute", left: 0, top: 0, zIndex: 26 }}><CodeRain lf={lf + 67} x={805} y={260} h={400} cols={1} o={ramp(lf, 116, 126)} gap={0} /></div>}

              {/* 12. THE FORKLIFT WHO DIDN'T GET THE MEMO. He never notices the lock. */}
              {lf < 178 && (
                <div style={{ position: "absolute", left: fkX - 29, top: 600, width: 58, height: 58, zIndex: 20 }}>
                  <div style={{ position: "absolute", left: 4, top: 52, width: 50, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(4px)" }} />
                  <Mascot lf={lf} size={58} gaze={fkT < 0.55 ? 3 : -3} nodAmp={2.4} nodSpeed={5} hiVis={1} />
                  <div style={{ position: "absolute", left: 8, top: 6, width: 42, height: 9, borderRadius: 4, background: "#2A2E38" }} />
                  <div style={{ position: "absolute", left: -22, top: 44, width: 76, height: 12, borderRadius: 2, background: grad("#F0C63E", "#8A6614"), border: "1px solid rgba(255,240,190,0.35)" }} />
                  {[-16, 40].map((wx, i) => <div key={"fw" + i} style={{ position: "absolute", left: wx, top: 50, width: 13, height: 13, borderRadius: "50%", background: "#171520", border: "2px solid #35313C", transform: `rotate(${lf * 16}deg)` }} />)}
                  {crate("fkc", -18, 22, 40, 24, "DOCS", 0.7)}
                  <div style={{ position: "absolute", left: fkT < 0.55 ? 42 : -70, top: 28, width: 96, height: 40, background: `radial-gradient(ellipse at ${fkT < 0.55 ? "0%" : "100%"} 50%, rgba(255,232,180,0.4), transparent 68%)`, mixBlendMode: "screen", filter: "blur(3px)" }} />
                </div>
              )}

              {/* 5. THE ROLLER RUN, INBOARD: aimed OUT, and about to be cut in half */}
              <div style={{ position: "absolute", left: 540, top: 664, width: 118, height: 18, background: grad("#4A5261", "#1C2028"), border: "1.5px solid rgba(200,215,240,0.16)", zIndex: 21 }} />
              {[556, 590, 624].map((rx, i) => (
                <div key={"ri" + i} style={{ position: "absolute", left: rx, top: 662, width: 22, height: 22, borderRadius: "50%", background: grad("#9AA4B6", "#3A404C"), border: "1.5px solid rgba(220,235,255,0.3)", zIndex: 22 }}>
                  <div style={{ position: "absolute", left: 9.5, top: 2, width: 2, height: 18, background: "rgba(255,255,255,0.4)", transform: `rotate(${lf * 24}deg)`, transformOrigin: "50% 50%" }} />
                </div>
              ))}
              {ridePh >= 0 && ridePh < 15 && crate("ride", interpolate(ridePh, [0, 14], [548, 700], cl), 620 + Math.abs(Math.sin(ridePh * 1.1)) * 2, 62, 42, JOBS[Math.floor(lf / 22) % JOBS.length])}

              {/* the corner's one grudging backlight, so the cutout reads as a BODY, not a blob */}
              <div style={{ position: "absolute", left: 656, top: 356, width: 250, height: 330, background: `radial-gradient(ellipse at 50% 40%, rgba(186,210,238,${0.16 + ramp(lf, 96, 118) * 0.3}), transparent 70%)`, filter: "blur(12px)", mixBlendMode: "screen", zIndex: 24, pointerEvents: "none" }} />
              {/* THE VILLAIN, inside: the only black shape in the hot rectangle */}
              {vIn && villain(0.4, 25)}
              {/* the pull strap he hauls on */}
              {lf >= 100 && shY < 690 && (
                <div style={{ position: "absolute", left: 694, top: shY, width: 11, height: Math.max(10, (gripping ? gripY : shY + 74) - shY), background: gripping ? "#0A0B0E" : grad("#6A5238", "#2E2418"), borderRadius: 2, zIndex: 26, transform: `skewX(${gripping ? 0 : Math.sin(lf * 0.5) * 4}deg)`, transformOrigin: "50% 0%" }}>
                  <div style={{ position: "absolute", left: -4, bottom: 0, width: 19, height: 12, borderRadius: 3, background: gripping ? "#0A0B0E" : "#4A3A22" }} />
                </div>
              )}

              {/* dust falling through both cones, so the shadows never hold still for one frame */}
              {Array.from({ length: 34 }, (_, i) => {
                const r = seed(i * 4.1 + 5), r2 = seed(i * 2.2 + 13);
                return <div key={"du" + i} style={{ position: "absolute", left: 200 + r2 * 640 + Math.sin(lf * 0.03 + i) * 12, top: 214 + ((lf * (0.5 + r * 0.9) + r2 * 460) % 450), width: 2 + r * 2.6, height: 2 + r * 2.6, borderRadius: "50%", background: "rgba(255,232,190,0.75)", opacity: 0.12 + r * 0.3, zIndex: 24 }} />;
              })}

              <div style={{ position: "absolute", left: 140, top: 196, width: 740, height: 504, boxShadow: "inset 0 0 140px rgba(4,6,10,0.9)", zIndex: 27, pointerEvents: "none" }} />
            </div>

            {/* ============ 1. THE COIL BOX: the curtain wound up inside it, unspooling as it falls ============ */}
            <div style={{ position: "absolute", left: 140, top: 124, width: 740, height: 72, background: grad("#48505E", "#1A1E26"), border: "2px solid #262B34", boxShadow: "0 10px 22px rgba(0,0,0,0.7)", zIndex: 31, overflow: "hidden" }}>
              {Array.from({ length: 5 }, (_, k) => (k < Math.round(5 * (1 - haulP)) ? <div key={"co" + k} style={{ position: "absolute", left: 12, top: 36 - (5 - k) * 6, width: 716, height: (5 - k) * 12, borderRadius: 8, border: "1.5px solid rgba(190,205,235,0.16)", background: `rgba(120,136,164,${0.05 + k * 0.02})` }} /> : null))}
              {Array.from({ length: 24 }, (_, k) => <div key={"rv" + k} style={{ position: "absolute", left: 10 + k * 30, top: 5, width: 5, height: 5, borderRadius: "50%", background: "#79818F", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.6)" }} />)}
              {Array.from({ length: 24 }, (_, k) => <div key={"rv2" + k} style={{ position: "absolute", left: 10 + k * 30, top: 60, width: 5, height: 5, borderRadius: "50%", background: "#79818F" }} />)}
              <div style={{ position: "absolute", left: 0, top: 0, width: 740, height: 72, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.1), inset 0 0 40px rgba(0,0,0,0.7)" }} />
            </div>

            {/* ============ 16. THE SHUTTER FACE AS A LIVE SURFACE. From f172 this IS the frame. ============ */}
            <div style={{ position: "absolute", left: 140, top: 196, width: 740, height: Math.max(0, shY - 196), overflow: "hidden", zIndex: 30 }}>
              {Array.from({ length: Math.max(0, Math.ceil((shY - 196) / 26)) }, (_, i) => (
                <React.Fragment key={"sl" + i}>
                  <div style={{ position: "absolute", left: 0, top: i * 26, width: 740, height: 22, background: "linear-gradient(180deg,#3E434E 0%,#2A2E37 42%,#181B22 82%,#31363F 100%)" }} />
                  <div style={{ position: "absolute", left: 0, top: i * 26 + 21, width: 740, height: 5, background: "#07090C" }} />
                  {/* a 4px lit gap between EVERY slat: the mouth never seals to zero */}
                  <div style={{ position: "absolute", left: 4, top: i * 26 + 22, width: 732, height: 3.6, background: `linear-gradient(90deg, rgba(200,216,232,${0.2 + arc * 0.5}) 0%, rgba(255,236,208,${0.3 + arc * 0.6}) 46%, rgba(200,216,232,${0.16 + arc * 0.4}) 100%)`, boxShadow: `0 0 ${3 + arc * 5}px rgba(200,224,255,${0.4 + arc * 0.35})` }} />
                </React.Fragment>
              ))}
              {/* the bowed, dinged bottom rail: the motivated reason the frame never goes black */}
              <div style={{ position: "absolute", left: 0, top: Math.max(0, shY - 196) - 16, width: 740, height: 16, background: grad("#5A6270", "#22262E"), borderRadius: "0 0 22px 22px / 0 0 9px 9px", boxShadow: "0 5px 12px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.26)" }}>
                {[110, 340, 512, 660].map((dx, i) => <div key={"dg" + i} style={{ position: "absolute", left: dx, top: 3 + (i % 2) * 3, width: 16 + i * 3, height: 7, borderRadius: 3, background: "rgba(10,12,16,0.55)" }} />)}
              </div>
              {/* rust weeping down the left rail, and a stencilled hazard chevron (no numeral) */}
              <div style={{ position: "absolute", left: 10, top: 0, width: 20, height: 480, background: "linear-gradient(180deg, rgba(140,70,34,0.6), rgba(90,44,20,0.15))", filter: "blur(1.6px)" }} />
              <div style={{ position: "absolute", left: 32, top: 40, width: 12, height: 400, background: "linear-gradient(180deg, rgba(140,70,34,0.4), transparent)", filter: "blur(2px)" }} />
              <div style={{ position: "absolute", left: 590, top: 178, width: 62, height: 46, overflow: "hidden", opacity: 0.75 }}>
                {[0, 1, 2, 3].map((k) => <div key={"cvn" + k} style={{ position: "absolute", left: -14 + k * 17, top: -6, width: 9, height: 60, background: k % 2 ? "#D9B32A" : "#14161B", transform: "skewX(-26deg)" }} />)}
                <div style={{ position: "absolute", left: 0, top: 0, width: 62, height: 46, border: "1.5px solid rgba(0,0,0,0.5)" }} />
              </div>
              {closed && (
                <>
                  {/* the OPEN neon's colour, smudging out through the slat gaps */}
                  <div style={{ position: "absolute", left: 366, top: 96, width: 140, height: 22, background: `linear-gradient(90deg, transparent, rgba(224,60,58,${0.34 + Math.abs(Math.sin(lf * 0.3)) * 0.18}) 34%, rgba(90,180,240,${0.28 + Math.abs(Math.sin(lf * 0.3)) * 0.14}) 60%, transparent)`, filter: "blur(3px)", mixBlendMode: "screen", transform: `translateX(${Math.sin(lf * 0.062) * 12}px)` }} />
                  {/* the forklift's lamp sweeping the bars left to right on every lap */}
                  <div style={{ position: "absolute", left: ((lf * 7) % 860) - 56, top: 300, width: 112, height: 180, background: "radial-gradient(ellipse at 50% 50%, rgba(255,232,180,0.34), transparent 70%)", mixBlendMode: "screen", filter: "blur(5px)" }} />
                  {/* silhouette shadows raking across the lit bars: he never stopped */}
                  <div style={{ position: "absolute", left: hx - 200, top: 292 - fight * 14, width: 84, height: 176, borderRadius: "42px 42px 14px 14px", background: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.86), rgba(0,0,0,0.5) 72%, transparent)", filter: "blur(2.4px)" }} />
                  <div style={{ position: "absolute", left: fkX - 190, top: 392, width: 96, height: 84, borderRadius: 18, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.78), transparent 74%)", filter: "blur(2.4px)" }} />
                  {/* the jam firing into the steel on the 11-frame cadence */}
                  <div style={{ position: "absolute", left: 300, top: 240, width: 300, height: 220, background: `radial-gradient(ellipse, rgba(190,206,230,${jam * 0.16}), transparent 66%)`, mixBlendMode: "screen", filter: "blur(6px)" }} />
                  {/* 6. THE DENT, popped toward us at f184, and it stays */}
                  {dent > 0 && (
                    <>
                      <div style={{ position: "absolute", left: 500, top: 340, width: 132 * dent, height: 96 * dent, borderRadius: "50%", background: "radial-gradient(ellipse at 38% 34%, rgba(196,212,236,0.5), rgba(0,0,0,0.5) 72%)", filter: "blur(1.6px)" }} />
                      <div style={{ position: "absolute", left: 508, top: 348, width: 116 * dent, height: 80 * dent, borderRadius: "50%", border: "2px solid rgba(220,236,255,0.3)" }} />
                    </>
                  )}
                  {/* the second bonk, started at f190, un-landed at f192 */}
                  <div style={{ position: "absolute", left: 470, top: 300, width: 200, height: 180, background: `radial-gradient(ellipse, rgba(255,236,200,${bonk2 * 0.14}), transparent 70%)`, mixBlendMode: "screen" }} />
                </>
              )}
            </div>

            {/* 16(a). the 25px hot bar under the bowed bottom slat: the light gets out, the work does not */}
            {shY > 655 && (
              <div style={{ position: "absolute", left: 148, top: 675, width: 724, height: 25, zIndex: 29, background: `linear-gradient(180deg, rgba(220,238,255,${0.55 + arc * 0.45}) 0%, rgba(255,224,180,${0.5 + arc * 0.4}) 52%, rgba(217,119,87,${0.4 + arc * 0.3}) 100%)`, boxShadow: `0 0 ${26 + arc * 34}px rgba(210,230,255,0.75), 0 10px 40px rgba(217,119,87,0.5)`, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: hx - 190, top: 0, width: 90, height: 25, background: "rgba(0,0,0,0.75)", filter: "blur(3px)" }} />
                <div style={{ position: "absolute", left: ((lf * 7) % 860) - 200, top: 0, width: 140, height: 25, background: "rgba(255,255,255,0.4)", mixBlendMode: "screen", filter: "blur(4px)" }} />
              </div>
            )}
            {/* dust and paint flakes jumping off the face on every thud */}
            {lf >= LOCK && Array.from({ length: 22 }, (_, i) => {
              const r = seed(i * 3.3 + 6), r2 = seed(i * 1.9 + 21);
              const t = (((lf - LOCK - Math.floor(r2 * 11)) % 11) + 11) % 11 / 11;
              return <div key={"fl" + i} style={{ position: "absolute", left: 180 + r2 * 660, top: 300 + r * 340 + t * (40 + r * 60), width: 2 + r * 3, height: 2 + r * 3, background: "rgba(220,230,246,0.7)", opacity: (1 - t) * (0.5 * jam + 0.2), zIndex: 33 }} />;
            })}

            {/* ==================== OUR SIDE: the sill, the hasp, the run he cut, the stack he froze ==== */}
            {/* 14. the oil rainbow puddle: a cold sodium rim only, rippling on every haul */}
            <div style={{ position: "absolute", left: 250, top: 740, width: 172, height: 28, borderRadius: "50%", background: "rgba(10,12,18,0.85)", zIndex: 34 }} />
            <div style={{ position: "absolute", left: 250, top: 740, width: 172, height: 28, borderRadius: "50%", border: `2px solid rgba(130,150,174,${0.32 + shake * 0.05})`, boxShadow: "inset 0 4px 12px rgba(70,90,120,0.35)", transform: `scale(${1 + shake * 0.012})`, zIndex: 34 }} />
            <div style={{ position: "absolute", left: 268, top: 746, width: 132, height: 15, borderRadius: "50%", background: "linear-gradient(90deg, rgba(60,120,150,0.22), rgba(120,70,140,0.16), rgba(60,140,110,0.2))", filter: "blur(2px)", opacity: 0.5 + plLit * 0.4, zIndex: 34 }} />

            {/* 5. THE OUTBOARD FLAP, sheared at f168. Three rollers still spinning, empty, forever. */}
            <div style={{ position: "absolute", left: 658, top: 664, transformOrigin: "0px 8px", transform: `rotate(${flap}deg)`, zIndex: 35 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 190, height: 22, background: grad("#5A6270", "#22262E"), border: "2px solid rgba(200,215,240,0.2)", boxShadow: "0 8px 18px rgba(0,0,0,0.7)" }} />
              {[26, 88, 148].map((rx, i) => (
                <div key={"ro" + i} style={{ position: "absolute", left: rx, top: -6, width: 30, height: 30, borderRadius: "50%", background: grad("#B4BCCA", "#3A404C"), border: "2px solid rgba(220,235,255,0.4)", boxShadow: "0 6px 12px rgba(0,0,0,0.7)" }}>
                  <div style={{ position: "absolute", left: 12, top: 2, width: 2.5, height: 24, background: "rgba(255,255,255,0.55)", transform: `rotate(${lf * 22}deg)`, transformOrigin: "50% 50%" }} />
                  <div style={{ position: "absolute", left: 2, top: 12, width: 24, height: 2.5, background: "rgba(255,255,255,0.3)", transform: `rotate(${lf * 22}deg)`, transformOrigin: "50% 50%" }} />
                </div>
              ))}
              {lf >= SHEAR && <div style={{ position: "absolute", left: -6, top: -4, width: 12, height: 30, background: "linear-gradient(180deg, rgba(255,240,210,0.5), transparent)", filter: "blur(2px)", opacity: pulse(SHEAR, 22) }} />}
            </div>
            {lf >= SHEAR && <div style={{ position: "absolute", left: 650, top: 662, width: 10, height: 26, background: grad("#C9CFDC", "#5A6274"), zIndex: 36, opacity: 0.9 }} />}

            {/* 5. THE APRON DELIVERY STACK: the last thing that ever got out, frozen dead in the cold */}
            {Array.from({ length: nOut }, (_, i) => {
              const born = i * 22 + 16;
              if (lf < born) return null;
              const land = over(lf, born, 5, Easing.out(Easing.quad));
              const row = Math.floor(i / 3), col = i % 3;
              return (
                <div key={"os" + i} style={{ position: "absolute", left: 626 + col * 64 + seed(i) * 5, top: 750 - row * 30 - (1 - land) * 60, width: 60, height: 30, borderRadius: 2, transform: `rotate(${seed(i * 3) * 5 - 2.5}deg)`, zIndex: 36 - row }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: 30, borderRadius: 2, background: grad("#39435A", "#151A24"), border: `1.5px solid rgba(146,168,196,${0.48 + plLit * 0.3})`, boxShadow: "0 6px 12px rgba(0,0,0,0.8)" }} />
                  <div style={{ position: "absolute", left: 9, top: -1, width: 5, height: 32, background: "rgba(120,140,168,0.34)" }} />
                  <div style={{ position: "absolute", left: 46, top: -1, width: 5, height: 32, background: "rgba(120,140,168,0.34)" }} />
                  <div style={{ position: "absolute", left: 0, top: 8, width: 60, textAlign: "center", fontFamily: mono, fontSize: 8, fontWeight: 700, color: `rgba(168,190,218,${0.58 + plLit * 0.3})` }}>{JOBS[i % JOBS.length]}</div>
                  <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: 3, background: `rgba(174,198,228,${0.42 + plLit * 0.35})` }} />
                </div>
              );
            })}

            {/* 13. THE OFFERED CRATE: work offered, work refused, dead centre, at readable size */}
            {lf >= 110 && lf < 152 && (
              <div style={{ position: "absolute", left: ofX - 36 * ofS, top: ofY - 24 * ofS, width: 72 * ofS, height: 48 * ofS, zIndex: 37, transform: `rotate(${lf < 131 ? Math.sin(lf * 0.6) * 9 : -4 - boot * 9}deg)`, opacity: 1 - ramp(lf, 140, 152) }}>
                <div style={{ position: "absolute", left: 0, top: 44 * ofS, width: 72 * ofS, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.7)", filter: "blur(4px)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 72 * ofS, height: 48 * ofS, borderRadius: 3, background: ofOut ? grad("#33394A", "#14181F") : grad("#C97C55", "#7E4527"), border: `2px solid ${ofOut ? "rgba(130,150,174,0.42)" : "rgba(255,214,170,0.3)"}`, boxShadow: "0 8px 16px rgba(0,0,0,0.7)" }} />
                <div style={{ position: "absolute", left: 11 * ofS, top: -2, width: 7 * ofS, height: 52 * ofS, background: ofOut ? "rgba(140,160,190,0.4)" : "rgba(190,196,210,0.5)" }} />
                <div style={{ position: "absolute", left: 54 * ofS, top: -2, width: 7 * ofS, height: 52 * ofS, background: ofOut ? "rgba(140,160,190,0.4)" : "rgba(190,196,210,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 15 * ofS, width: 72 * ofS, textAlign: "center", fontFamily: mono, fontSize: 11 * ofS, fontWeight: 700, letterSpacing: 0.5, color: ofOut ? "rgba(160,182,210,0.6)" : "rgba(40,22,12,0.75)" }}>SHIP</div>
                <div style={{ position: "absolute", left: 0, top: 0, width: 72 * ofS, height: 3, background: ofOut ? "rgba(160,184,214,0.35)" : "rgba(255,220,180,0.3)" }} />
              </div>
            )}

            {/* THE SILL: the line the work is not allowed to cross */}
            <div style={{ position: "absolute", left: 126, top: 700, width: 768, height: 16, background: grad("#4A4E58", "#1A1D24"), boxShadow: "0 8px 18px rgba(0,0,0,0.8), inset 0 2px 0 rgba(200,215,240,0.16)", zIndex: 38 }} />
            <div style={{ position: "absolute", left: 126, top: 700, width: 768, height: 4, background: `rgba(200,216,232,${shY > 655 ? 0.12 + arc * 0.5 : 0.14})`, zIndex: 39 }} />
            {[172, 246, 330, 592, 700, 806].map((fx, i) => (
              <div key={"fy" + i} style={{ position: "absolute", left: fx, top: 702 + (i % 2) * 3, width: 22 + seed(i) * 16, height: 9, background: `rgba(${190 - i * 8},${186 - i * 6},${170 - i * 4},0.4)`, transform: `rotate(${seed(i * 2) * 10 - 5}deg)`, zIndex: 39, clipPath: "polygon(0 0, 100% 0, 92% 100%, 60% 74%, 28% 100%, 6% 62%)" }} />
            ))}
            <div style={{ position: "absolute", left: 126, top: 196, width: 16, height: 508, background: grad("#3E434E", "#14171D"), boxShadow: "3px 0 10px rgba(0,0,0,0.8)", zIndex: 32 }} />
            <div style={{ position: "absolute", left: 878, top: 196, width: 16, height: 508, background: grad("#3E434E", "#14171D"), boxShadow: "-3px 0 10px rgba(0,0,0,0.8)", zIndex: 32 }} />

            {/* 2. THE HASP: empty and swinging faintly for the entire first half. A loaded gun in plain sight. */}
            <div style={{ position: "absolute", left: 475, top: 674, width: 60, height: 30, zIndex: 40, transform: `rotate(${lf < 174 ? Math.sin(lf * 0.14) * 3.6 : 0}deg)`, transformOrigin: "50% 0%" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: 30, borderRadius: 3, background: grad("#9AA2B2", "#343A46"), border: "2px solid rgba(220,235,255,0.4)", boxShadow: "0 6px 13px rgba(0,0,0,0.75)" }} />
              <div style={{ position: "absolute", left: 24, top: 8, width: 12, height: 20, borderRadius: 2, background: "#0A0C10", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.9)" }} />
              <div style={{ position: "absolute", left: 22, top: 4, width: 16, height: 8, borderRadius: 3, background: grad("#C0C8D6", "#5A6270") }} />
              {[5, 49].map((bx, i) => <div key={"hb" + i} style={{ position: "absolute", left: bx, top: 6, width: 6, height: 6, borderRadius: "50%", background: "#C4CCDA", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.6)" }} />)}
              {[5, 49].map((bx, i) => <div key={"hb2" + i} style={{ position: "absolute", left: bx, top: 19, width: 6, height: 6, borderRadius: "50%", background: "#8A92A0" }} />)}
              <div style={{ position: "absolute", left: -6, top: 26, width: 72, height: 5, borderRadius: 2, background: "rgba(70,44,20,0.6)", filter: "blur(1px)" }} />
            </div>

            {/* L9. THE ONE EXCURSION: he steps over the sill and boots the offering back inside, without a look */}
            {vMid && <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, clipPath: "inset(196px 132px 54px 140px)", zIndex: 39 }}>{villain(0.7, 39)}</div>}

            {/* THE VILLAIN, out on the apron: a black cutout against the steel he just shut */}
            {vOut && villain(0.45 + plLit * 0.55, 41)}

            {/* 2. THE PADLOCK: his only possession. Twice the size the hasp needs: not secured, punished. */}
            {lf >= 166 && (
              <div style={{ position: "absolute", left: plX - 42, top: plY - 40, width: 84, height: 96, zIndex: 42, transform: `rotate(${plRot}deg)`, transformOrigin: "50% 4%", filter: `brightness(${0.06 + plLit * 0.94})` }}>
                <div style={{ position: "absolute", left: 20, top: -8 - shack, width: 44, height: 46, borderRadius: "22px 22px 0 0", border: "9px solid #C9A24A", borderBottom: "none", boxSizing: "border-box" }} />
                <div style={{ position: "absolute", left: 20, top: -8 - shack, width: 44, height: 22, borderRadius: "22px 22px 0 0", border: "3px solid rgba(255,240,190,0.4)", borderBottom: "none", boxSizing: "border-box" }} />
                <div style={{ position: "absolute", left: 2, top: 22, width: 80, height: 74, borderRadius: 9, background: grad("#EBC663", "#7A5A18"), border: "2.5px solid #5C4410", boxShadow: "0 14px 26px rgba(0,0,0,0.8), inset 0 3px 0 rgba(255,246,200,0.6)" }} />
                {[8, 70].map((bx, i) => <div key={"pb" + i} style={{ position: "absolute", left: bx, top: 30, width: 6, height: 6, borderRadius: "50%", background: "#5C4410" }} />)}
                {[8, 70].map((bx, i) => <div key={"pb2" + i} style={{ position: "absolute", left: bx, top: 82, width: 6, height: 6, borderRadius: "50%", background: "#5C4410" }} />)}
                {/* THE KEYHOLE: round, black, dead centre of the hero prop, pointing straight at camera */}
                <div style={{ position: "absolute", left: 33, top: 46, width: 18, height: 18, borderRadius: "50%", background: "#05060A", boxShadow: `inset 0 3px 5px rgba(0,0,0,1), 0 0 0 2px rgba(90,68,16,0.9), 0 0 ${spec * 16}px rgba(255,246,210,${spec})` }} />
                <div style={{ position: "absolute", left: 39, top: 60, width: 6, height: 12, background: "#05060A" }} />
                <div style={{ position: "absolute", left: 8, top: 28, width: 30, height: 8, borderRadius: 4, background: `rgba(255,252,230,${0.3 + spec * 0.7})`, filter: "blur(1.6px)", transform: "rotate(-8deg)" }} />
                <div style={{ position: "absolute", left: 2, top: 22, width: 80, height: 74, borderRadius: 9, boxShadow: "inset 0 0 22px rgba(60,42,6,0.6)" }} />
              </div>
            )}
            {ring > 0 && <div style={{ position: "absolute", left: 505 - (150 * (1 - ring) + 20), top: 726 - (150 * (1 - ring) + 20), width: 300 * (1 - ring) + 40, height: 300 * (1 - ring) + 40, borderRadius: "50%", border: `${4 * ring}px solid rgba(220,238,255,${ring * 0.55})`, zIndex: 43 }} />}

            {/* 7. THE ARC SPRAYING OUT UNDER THE DOOR: the first warm thing to touch our side all scene */}
            {lf >= 178 && (
              <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 41, pointerEvents: "none", opacity: ramp(lf, 178, 182) }}>
                {Array.from({ length: 38 }, (_, i) => {
                  const r = seed(i * 2.9 + 8), r2 = seed(i * 6.1 + 2);
                  const life = 15 + r * 14;
                  const t = ((lf * (1.7 + r2 * 1.4) + r * 70) % life) / life;
                  return <div key={"xs" + i} style={{ position: "absolute", left: 190 + r2 * 640 + (r - 0.5) * t * 130, top: 694 + t * t * 96 + t * 8, width: 3 + r * 5 + t * 4, height: 3 + r * 3.2, borderRadius: 2, background: t < 0.4 ? "#FFFFFF" : r > 0.55 ? ARC : "#FFD4A0", opacity: (1 - t) * (0.6 + arc * 0.4), boxShadow: `0 0 ${7 + r * 12}px rgba(210,232,255,0.95)` }} />;
                })}
                <div style={{ position: "absolute", left: 160, top: 684, width: 700, height: 108, background: "radial-gradient(ellipse at 50% 0%, rgba(210,232,255,0.24), rgba(217,119,87,0.1) 52%, transparent 76%)", filter: "blur(7px)", mixBlendMode: "screen" }} />
              </div>
            )}

            {/* 15. THE CODE RAIN on the apron, on OUR side: the last thing identifying him after he goes */}
            {lf >= SHEAR && (
              <div style={{ position: "absolute", left: 0, top: 0, zIndex: 44, opacity: ramp(lf, 168, 178) }}>
                <CodeRain lf={lf} x={60} y={380} h={412} cols={3} o={0.9} gap={44} />
                <CodeRain lf={lf + 53} x={890} y={380} h={412} cols={3} o={0.9} gap={42} />
              </div>
            )}

            {/* FOREGROUND OCCLUDERS: near-black, soft, dust and the odd spark crossing in front of them */}
            <div style={{ position: "absolute", left: -10, top: 640, width: 160, height: 160, zIndex: 46, filter: "blur(2.6px)" }}>
              {[0, 1, 2, 3].map((k) => (
                <div key={"pk" + k} style={{ position: "absolute", left: k * 3, top: k * 38, width: 152, height: 34, background: grad("#181B22", "#080A0E"), border: "2px solid rgba(60,70,86,0.5)", transform: `rotate(${-1 + k * 0.5}deg)` }}>
                  {[0, 1, 2, 3].map((j) => <div key={j} style={{ position: "absolute", left: 6 + j * 36, top: 0, width: 8, height: 34, background: "rgba(0,0,0,0.7)" }} />)}
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", left: 858, top: 588, width: 170, height: 210, zIndex: 46, filter: "blur(2.4px)" }}>
              <div style={{ position: "absolute", left: 22, top: 22, width: 122, height: 190, borderRadius: "10px 10px 6px 6px", background: grad("#1B1F27", "#07090D"), border: "2.5px solid rgba(66,78,96,0.55)" }}>
                <div style={{ position: "absolute", left: 0, top: 30, width: 122, height: 7, background: "rgba(70,82,100,0.5)" }} />
                <div style={{ position: "absolute", left: 0, top: 150, width: 122, height: 7, background: "rgba(70,82,100,0.5)" }} />
              </div>
              {[0, 1, 2, 3, 4].map((k) => <div key={"hs" + k} style={{ position: "absolute", left: -4 + k * 5, top: 44 + k * 26, width: 92 - k * 6, height: 92 - k * 6, borderRadius: "50%", border: "6px solid rgba(24,28,36,0.9)" }} />)}
            </div>
            {Array.from({ length: 16 }, (_, i) => {
              const r = seed(i * 5.9 + 17), r2 = seed(i * 3.3 + 31);
              return <div key={"fd" + i} style={{ position: "absolute", left: 30 + r2 * 950, top: 560 + ((lf * (0.7 + r) + r2 * 260) % 250), width: 3 + r * 5, height: 3 + r * 5, borderRadius: "50%", background: "rgba(190,206,232,0.5)", opacity: 0.14 + r * 0.22, filter: "blur(1px)", zIndex: 47 }} />;
            })}

            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 48, pointerEvents: "none", boxShadow: "inset 0 0 240px rgba(2,3,6,0.95)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 48, pointerEvents: "none", background: `radial-gradient(ellipse at 50% 90%, rgba(217,119,87,${plLit * 0.1}), transparent 58%)`, mixBlendMode: "screen" }} />
          </div>

          {/* OUT: the geometric iris into the keyhole. The hole the keys go in, and our guy does not have them. */}
          {lf >= 184 && <div style={{ position: "absolute", left: -400, top: -400, width: 1812, height: 1592, zIndex: 60, background: `radial-gradient(circle at 905px 1126px, #05060A ${irisR}px, rgba(5,6,10,0.45) ${irisR + 4}px, transparent ${irisR + 14}px)`, pointerEvents: "none" }} />}
        </div>
      </div>
    </Panel>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const pulse = (at: number, len: number) => (lf >= at ? Math.max(0, 1 - (lf - at) / len) : 0);

  // ===================== LAYER A: THE STICKER LOOP (never stops) =====================
  const SHOTS = [
    { at: 0, x: 452, y: 614, r: -7 },     // fender (the frame-0 close-up thwack)
    { at: 18, x: 302, y: 566, r: 9 },     // the burning engine block
    { at: 34, x: 516, y: 660, r: -12 },   // the bare hub, no wheel
    { at: 50, x: 198, y: 722, r: 14 },    // the door lying on the ground
    { at: 66, x: 852, y: 686, r: -5 },    // the fire extinguisher
    { at: 82, x: 466, y: 624, r: 11 },    // a sticker, on a sticker
    { at: 98, x: 360, y: 544, r: -9 },    // the caved roof
    { at: 114, x: 410, y: 596, r: 6 },    // the cracked screen
    { at: 130, x: 168, y: 666, r: -14 },  // the folded bumper
  ];
  const lastAt = SHOTS.reduce((a, s) => (s.at <= lf ? s.at : a), -99);
  const kick = Math.max(0, 1 - (lf - lastAt) / 6);
  const glassAt = 148;
  const glassKick = pulse(glassAt, 8);
  const shake = kick * 2.6 + glassKick * 7;
  const sx = Math.sin(lf * 3.9) * shake, sy = Math.cos(lf * 4.6) * shake * 0.6;

  // ===================== CAMERA: slam close-up, pull back, then an endless slow push =====================
  const camS = interpolate(lf, [0, 15, 42, 155], [2.0, 1.94, 1.0, 1.03], { ...clamp, easing: Easing.inOut(Easing.cubic) });

  // ===================== LAYER B: FIRE =====================
  const lick = 1 + 0.5 * Math.pow(Math.abs(Math.sin(lf * 0.081)), 6);   // licks 1.5x higher every ~1.3s
  const hoodPop = pulse(60, 16);
  const tyreFire = ramp(lf, 138, 155);
  const sit = ramp(lf, 72, 80) - ramp(lf, 104, 112);                    // the this-is-fine beat

  // ===================== THE HERO =====================
  const mx = interpolate(lf, [0, 18, 34, 50, 66, 78, 104, 114, 130, 144, 155], [600, 442, 640, 336, 726, 404, 404, 566, 336, 616, 622], clamp);
  const my = 486 + sit * 30;
  const toCam = ramp(lf, 142, 150);
  const U = 210 / 200;

  // ===================== FLAT-GEOMETRIC FLAME =====================
  const flame = (k: string, x: number, y: number, w: number, h: number, o: number) => (
    <div key={k} style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity: o, zIndex: 16, pointerEvents: "none" }}>
      {[{ c: "#B8371F", s: 1.0, p: 0 }, { c: "#EF8A2E", s: 0.7, p: 1.3 }, { c: "#FFE6A2", s: 0.38, p: 2.6 }].map((F, i) => {
        const wob = Math.sin(lf * (0.34 + i * 0.1) + F.p) * (5 - i * 1.4);
        const hh = h * F.s * (0.88 + Math.abs(Math.sin(lf * 0.23 + F.p)) * 0.24);
        return (
          <div key={i} style={{
            position: "absolute", left: (w - w * F.s) / 2 + wob, top: h - hh, width: w * F.s, height: hh,
            background: `linear-gradient(180deg, ${F.c} 0%, ${F.c} 62%, rgba(255,240,200,0.9) 100%)`,
            clipPath: "polygon(50% 0%, 78% 34%, 100% 66%, 84% 100%, 16% 100%, 0% 66%, 22% 34%)",
            filter: "blur(0.4px)",
          }} />
        );
      })}
    </div>
  );

  // ===================== THE COUNTERFEIT PASS (sickly yellow-green, crooked, smeared) =====================
  const sticker = (k: string, x: number, y: number, r: number, at: number, s: number) => {
    if (lf < at) return null;
    const pop = over(lf, at, 6, Easing.out(Easing.back(3)));
    const sc = interpolate(pop, [0, 1], [1.6, 1], clamp);
    const rr = seed(at * 1.7 + 2);
    return (
      <div key={k} style={{
        position: "absolute", left: x - 38 * s, top: y - 38 * s, width: 76 * s, height: 76 * s,
        transform: `rotate(${r}deg) scale(${sc})`, transformOrigin: "50% 50%", opacity: Math.min(1, pop * 2.4),
        borderRadius: 9 * s, background: grad("#C6CE5C", "#8B9635"), border: `${2 * s}px solid rgba(255,252,206,0.55)`,
        boxShadow: `0 ${10 * s}px ${20 * s}px rgba(0,0,0,0.5), inset 0 ${2 * s}px 0 rgba(255,255,255,0.4)`, overflow: "hidden",
      }}>
        {[[-4, 16], [-4, 44], [68, 16], [68, 44], [16, -4], [46, -4], [16, 68], [46, 68]].map((p, i) => (
          <div key={i} style={{ position: "absolute", left: p[0] * s, top: p[1] * s, width: 9 * s, height: 9 * s, borderRadius: "50%", background: "rgba(10,14,8,0.5)" }} />
        ))}
        <div style={{ position: "absolute", left: 8 * s, top: 6 * s, fontFamily: mono, fontSize: 7.5 * s, letterSpacing: 2 * s, color: "rgba(28,34,10,0.8)", fontWeight: 700 }}>PASSED</div>
        <div style={{ position: "absolute", left: 54 * s, top: 5 * s, width: 15 * s, height: 15 * s, borderRadius: "50%", border: `${1.5 * s}px solid rgba(28,34,10,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 7 * s, color: "rgba(28,34,10,0.75)" }}>07</div>
        <div style={{ position: "absolute", left: 0, top: 22 * s, width: 76 * s, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27 * s, color: "#242C08", letterSpacing: "-0.02em", textShadow: `0 ${1.5 * s}px 0 rgba(255,255,220,0.35)`, lineHeight: 1 }}>DONE</div>
        <div style={{ position: "absolute", left: 7 * s, top: 62 * s, fontFamily: mono, fontSize: 6.5 * s, color: "rgba(28,34,10,0.62)" }}>SN 00-{Math.floor(rr * 900 + 100)}</div>
        <div style={{ position: "absolute", left: (-8 + rr * 30) * s, top: 30 * s, width: 60 * s, height: 16 * s, background: "linear-gradient(90deg,rgba(20,26,8,0.28),transparent)", transform: `rotate(${rr * 20 - 10}deg)`, filter: "blur(1.4px)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 76 * s, height: 76 * s, boxShadow: `inset 0 0 ${14 * s}px rgba(30,38,10,0.4)` }} />
      </div>
    );
  };

  // ===================== LAYER D: THE LAST-WEEK ROW =====================
  const ROW = [
    { x: 692, yb: 512, s: 0.74, t0: 72, dur: 12 },
    { x: 792, yb: 490, s: 0.62, t0: 96, dur: 24 },
    { x: 872, yb: 474, s: 0.52, t0: 120, dur: 20 },
    { x: 940, yb: 462, s: 0.44, t0: 144, dur: 26 },
  ];
  const creak = Math.sin(lf * 0.05) * 5;

  return (
    <Panel label="jiffy-loob">
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${sx}px, ${sy}px) scale(${camS})`, transformOrigin: "452px 614px" }}>

          {/* ============ SET: sodium night sky + the strip mall ============ */}
          <div style={{ position: "absolute", left: 0, top: 46, width: 1012, height: 396, background: "linear-gradient(180deg,#10131F 0%,#161B2B 52%,#241F26 100%)" }} />
          {Array.from({ length: 22 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            return <div key={"st" + i} style={{ position: "absolute", left: 20 + r * 970, top: 60 + seed(i * 2.2) * 150, width: 2 + r * 2, height: 2 + r * 2, borderRadius: "50%", background: "rgba(220,232,255,0.6)", opacity: 0.2 + Math.abs(Math.sin(lf * 0.04 + i)) * 0.3 }} />;
          })}
          <div style={{ position: "absolute", left: 24, top: 236, width: 616, height: 206, background: grad("#2A2432", "#1A1620"), border: "2px solid rgba(200,180,150,0.16)", borderRadius: "8px 8px 0 0", boxShadow: "0 26px 50px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 24, top: 236, width: 616, height: 10, background: "rgba(231,178,76,0.22)" }} />
          {[0, 1, 2].map((i) => (
            <div key={"bay" + i} style={{ position: "absolute", left: 58 + i * 196, top: 300, width: 150, height: 142, borderRadius: 6, background: "linear-gradient(180deg,rgba(255,214,140,0.16),rgba(255,180,90,0.04))", border: "1.5px solid rgba(255,214,150,0.18)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)", opacity: 0.55 + Math.abs(Math.sin(lf * 0.09 + i)) * 0.2 }} />
          ))}
          {/* the knockoff quick-lube sign: the shop that certifies itself */}
          <div style={{ position: "absolute", left: 300, top: 232, width: 8, height: 26, background: "#5A4630" }} />
          <div style={{ position: "absolute", left: 132, top: 146, width: 396, height: 92, borderRadius: 999, background: grad("#F0C63E", "#C9902A"), border: "5px solid #B2372A", boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 ${26 + Math.abs(Math.sin(lf * 0.11)) * 18}px rgba(240,198,62,0.35), inset 0 3px 0 rgba(255,255,255,0.5)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(-1.4deg)", opacity: (lf % 97) < 3 ? 0.62 : 1 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#8E2A1E", letterSpacing: "-0.02em", lineHeight: 1 }}>JIFFY LOOB</div>
            <div style={{ fontFamily: mono, fontSize: 12.5, fontWeight: 700, color: "rgba(60,26,14,0.85)", letterSpacing: 1.2, marginTop: 5 }}>CERTIFIED IN 5 MINUTES OR IT'S FREE</div>
          </div>

          {/* ============ SODIUM LAMPS + KEY BEAMS (right beam widens onto the row at beat 4) ============ */}
          {[{ x: 92, w: 470 }, { x: 812, w: 520 }].map((L2, i) => {
            const buzz = 0.82 + Math.abs(Math.sin(lf * 1.9 + i * 2)) * 0.1 + (Math.floor(lf / 7 + i) % 11 === 0 ? -0.3 : 0);
            const wide = i === 1 ? 1 + ramp(lf, 60, 84) * 0.55 : 1;
            return (
              <React.Fragment key={"lamp" + i}>
                <div style={{ position: "absolute", left: L2.x - 5, top: 46, width: 10, height: 132, background: grad("#3A3340", "#1E1A24") }} />
                <div style={{ position: "absolute", left: L2.x - 34, top: 168, width: 68, height: 18, borderRadius: "6px 6px 12px 12px", background: grad("#4A4250", "#241F2B"), border: "1.5px solid rgba(255,220,160,0.2)", boxShadow: `0 0 ${20 * buzz}px rgba(255,196,90,0.5)` }} />
                <div style={{ position: "absolute", left: L2.x - 26, top: 182, width: 52, height: 9, borderRadius: 5, background: "#FFD383", opacity: buzz, boxShadow: `0 0 ${26 * buzz}px rgba(255,196,90,0.9)` }} />
                <div style={{ position: "absolute", left: L2.x - (L2.w * wide) / 2, top: 186, width: L2.w * wide, height: 606, background: "linear-gradient(180deg,rgba(255,196,90,0.20),rgba(255,178,80,0.05) 58%,transparent)", clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)", mixBlendMode: "screen", opacity: buzz, pointerEvents: "none" }} />
              </React.Fragment>
            );
          })}

          {/* ============ SET: the forecourt apron, receding ============ */}
          <div style={{ position: "absolute", left: 0, top: 442, width: 1012, height: 350, background: "linear-gradient(180deg,#2B2530 0%,#332B33 40%,#3D3237 100%)" }} />
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
            {[-420, -110, 210, 520, 830, 1180, 1520].map((bx, i) => (
              <line key={"ap" + i} x1={bx} y1={792} x2={506} y2={442} stroke="rgba(255,196,120,0.10)" strokeWidth={2} />
            ))}
            {[448, 462, 486, 522, 574, 648, 750].map((yy, i) => (
              <line key={"apr" + i} x1={0} y1={yy} x2={1012} y2={yy} stroke="rgba(255,196,120,0.05)" strokeWidth={2} />
            ))}
          </svg>
          {Array.from({ length: 7 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            return <div key={"oil" + i} style={{ position: "absolute", left: 40 + r * 900, top: 500 + seed(i * 1.9) * 250, width: 40 + r * 90, height: 12 + r * 16, borderRadius: "50%", background: "rgba(10,8,14,0.45)", filter: "blur(3px)" }} />;
          })}
          {/* the amber warning lamp, sweeping the floor forever */}
          <div style={{ position: "absolute", left: 350 + Math.sin(lf * 0.058) * 400, top: 566, width: 300, height: 190, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(231,178,76,0.20), transparent 68%)", filter: "blur(5px)", mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", left: 914, top: 470, width: 8, height: 44, background: grad("#4A4250", "#221E28") }} />
          <div style={{ position: "absolute", left: 906, top: 452, width: 26, height: 20, borderRadius: "10px 10px 3px 3px", background: AMBER, opacity: 0.55 + Math.abs(Math.sin(lf * 0.16)) * 0.45, boxShadow: `0 0 ${14 + Math.abs(Math.sin(lf * 0.16)) * 22}px ${AMBER}` }} />

          {/* ============ LAYER D: the LAST WEEK row, quietly folding ============ */}
          <div style={{ position: "absolute", left: 678, top: 190, transform: `rotate(${Math.sin(lf * 0.05) * 0.9}deg)`, transformOrigin: "50% 0%" }}>
            <div style={{ position: "absolute", left: 26, top: -34, width: 3, height: 34, background: "rgba(190,180,170,0.4)" }} />
            <div style={{ position: "absolute", left: 250, top: -34, width: 3, height: 34, background: "rgba(190,180,170,0.4)" }} />
            <div style={{ width: 282, height: 46, borderRadius: 8, background: grad("#2E2A34", "#1B1822"), border: "2px solid rgba(255,214,150,0.28)", boxShadow: "0 14px 26px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: mono, fontSize: 20, letterSpacing: 3, color: "rgba(255,214,150,0.85)", fontWeight: 700 }}>
              LAST WEEK <span style={{ color: "#9BA83F", fontSize: 18 }}>✓</span>
            </div>
          </div>
          {ROW.map((c, i) => {
            const p = over(lf, c.t0, c.dur, i === 3 ? Easing.inOut(Easing.quad) : Easing.in(Easing.quad));
            const bump = i === 0 ? p : 0, roof = i === 1 ? p : 0, sink = i === 2 ? p : 0, sag = i === 3 ? p : 0;
            const haz = i === 2 && p > 0.55 && Math.sin(lf * 0.55) > 0;
            const w = 150 * c.s, h = 42 * c.s;
            return (
              <div key={"rc" + i} style={{ position: "absolute", left: c.x, top: c.yb - h, width: w, height: h, transform: `translateY(${sink * 8 * c.s + sag * 12 * c.s}px) rotate(${sag * 3.5}deg) scaleY(${1 - sag * 0.32})`, transformOrigin: "50% 100%" }}>
                <div style={{ position: "absolute", left: -6, top: h + 4, width: w + 12, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(5px)" }} />
                <div style={{ position: "absolute", left: w * 0.2, top: -26 * c.s, width: w * 0.58, height: 28 * c.s, borderRadius: "10px 10px 0 0", background: grad("#B9B3A6", "#6E6A60"), border: "1.5px solid rgba(255,255,255,0.16)", transform: `scaleY(${1 - roof * 0.86}) translateY(${roof * 6}px)`, transformOrigin: "50% 100%" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, borderRadius: 8 * c.s, background: grad("#A9A396", "#5D5A52"), border: "1.5px solid rgba(255,255,255,0.14)", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: w * 0.24, top: h * 0.2, width: 15 * c.s, height: 15 * c.s, borderRadius: 3, background: grad("#C6CE5C", "#8B9635"), border: "1px solid rgba(255,252,206,0.4)" }} />
                <div style={{ position: "absolute", left: -8 * c.s, top: h * 0.42, width: w + 14 * c.s, height: 8 * c.s, borderRadius: 4, background: grad("#8E897D", "#4A473F"), transform: `translateY(${bump * 30 * c.s}px) rotate(${bump * 26}deg)`, transformOrigin: "10% 50%" }} />
                {[0.18, 0.74].map((wxp, k) => (
                  <div key={k} style={{ position: "absolute", left: w * wxp, top: h - 4 * c.s, width: 22 * c.s, height: 22 * c.s * (1 - sink * 0.55), borderRadius: "50%", background: "#171520", border: `${3 * c.s}px solid #35313C` }} />
                ))}
                {haz && <div style={{ position: "absolute", left: w * 0.86, top: h * 0.3, width: 9 * c.s, height: 9 * c.s, borderRadius: "50%", background: AMBER, boxShadow: `0 0 14px ${AMBER}` }} />}
              </div>
            );
          })}
          {/* dust that keeps drifting up long after each quiet collapse */}
          {ROW.map((c, i) => (
            <React.Fragment key={"dz" + i}>
              {Array.from({ length: 6 }).map((_, k) => {
                const r = seed(i * 5.3 + k * 3.1 + 7);
                const age = lf - c.t0 - k * 2;
                if (age < 0 || age > 44) return null;
                const t = age / 44;
                return <div key={k} style={{ position: "absolute", left: c.x + r * 140 * c.s - t * 16, top: c.yb - t * (36 + r * 30), width: 3 + r * 4, height: 3 + r * 4, borderRadius: "50%", background: "rgba(255,214,160,0.55)", opacity: (1 - t) * 0.6 }} />;
              })}
            </React.Fragment>
          ))}

          {/* ============ THE TWO-POST LIFT (arms creaking, forever) ============ */}
          {[118, 566].map((px, i) => (
            <div key={"post" + i} style={{ position: "absolute", left: px, top: 458, width: 26, height: 246, borderRadius: 5, background: grad("#F0C63E", "#9A7420"), border: "1.5px solid rgba(255,240,190,0.35)", boxShadow: "0 18px 30px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.35)" }}>
              <div style={{ position: "absolute", left: -6, top: 236, width: 38, height: 12, borderRadius: 4, background: grad("#4A4250", "#221E28") }} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 138, top: 690 + creak, width: 120, height: 12, borderRadius: 5, background: grad("#C9CFDC", "#5A6274"), boxShadow: "0 8px 14px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 470, top: 690 + creak, width: 116, height: 12, borderRadius: 5, background: grad("#C9CFDC", "#5A6274"), boxShadow: "0 8px 14px rgba(0,0,0,0.5)" }} />
          {/* his helmet, hung on the lift arm: same guy, different hat */}
          <div style={{ position: "absolute", left: 578, top: 636 + creak, transform: `rotate(${Math.sin(lf * 0.07) * 4}deg)`, transformOrigin: "50% 0%" }}>
            <div style={{ position: "absolute", left: 22, top: -10, width: 4, height: 14, background: "#6B6459" }} />
            <div style={{ width: 48, height: 44, borderRadius: "22px 22px 12px 12px", background: grad("#F2EFE8", "#B9B3A6"), border: "2px solid rgba(255,255,255,0.5)", boxShadow: "0 10px 18px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 6, top: 16, width: 40, height: 12, borderRadius: 5, background: grad("#8FC3E8", "#39678C"), border: "1px solid rgba(220,240,255,0.5)" }} />
          </div>

          {/* ============ THE WRECK ============ */}
          <div style={{ position: "absolute", left: 140, top: 706, width: 430, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(10px)" }} />
          {/* the door it already tore off, on the floor */}
          <div style={{ position: "absolute", left: 148, top: 700, width: 128, height: 44, borderRadius: "10px 6px 6px 10px", background: grad("#D9D4C8", "#8A8478"), border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 10px 18px rgba(0,0,0,0.55)", transform: "rotate(-4deg) skewX(-14deg)" }}>
            <div style={{ position: "absolute", left: 12, top: 9, width: 62, height: 16, borderRadius: 4, background: "rgba(20,24,36,0.5)" }} />
          </div>
          <div style={{ position: "absolute", left: 128, top: 656, width: 96, height: 16, borderRadius: 6, background: grad("#8E897D", "#3E3B34"), transform: `rotate(${-24 + Math.sin(lf * 0.09) * 1.5}deg)`, boxShadow: "0 8px 14px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 176, top: 636, width: 372, height: 52, borderRadius: 12, background: grad("#EDEAE2", "#9A9084"), border: "2px solid rgba(255,255,255,0.35)", boxShadow: "0 18px 32px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.5)" }} />
          <div style={{ position: "absolute", left: 300, top: 526, width: 176, height: 116, borderRadius: "22px 16px 4px 4px", background: grad("#E7E3DA", "#B0796A"), border: "2px solid rgba(255,255,255,0.35)", boxShadow: "0 16px 28px rgba(0,0,0,0.45)", transform: `skewY(${-2 + Math.sin(lf * 0.06) * 0.4}deg)` }}>
            <div style={{ position: "absolute", left: 16, top: 30, width: 138, height: 56, borderRadius: 6, background: grad("#25324A", "#131A28"), border: "1.5px solid rgba(180,205,245,0.25)", overflow: "hidden" }}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ position: "absolute", left: 10 + k * 34, top: 4, width: 2, height: 52, background: "rgba(220,235,255,0.35)", transform: `rotate(${12 + k * 9}deg)` }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 24, top: 8, width: 60, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.3)" }} />
          </div>
          {/* the front door, held on by two crossed strips of tape */}
          <div style={{ position: "absolute", left: 466, top: 622, transformOrigin: "6px 6px", transform: `rotate(${16 + Math.sin(lf * 0.13) * 7}deg)` }}>
            <div style={{ width: 92, height: 62, borderRadius: "6px 10px 10px 6px", background: grad("#DCD7CB", "#8C8578"), border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 12px 22px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: -6, top: 8, width: 60, height: 13, background: "rgba(190,186,170,0.85)", border: "1px solid rgba(255,255,255,0.3)", transform: "rotate(28deg)" }} />
            <div style={{ position: "absolute", left: -6, top: 30, width: 60, height: 13, background: "rgba(190,186,170,0.85)", border: "1px solid rgba(255,255,255,0.3)", transform: "rotate(-28deg)" }} />
          </div>
          {/* the hood, popped, and the bay where an engine used to be */}
          <div style={{ position: "absolute", left: 214, top: 566 - hoodPop * 16, width: 118, height: 18, borderRadius: 6, background: grad("#E7E3DA", "#8C8578"), border: "1.5px solid rgba(255,255,255,0.3)", transform: `rotate(${-38 - hoodPop * 16}deg)`, transformOrigin: "100% 50%", boxShadow: "0 10px 18px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 216, top: 596, width: 140, height: 44, borderRadius: 6, background: grad("#3A2A24", "#150F0E"), border: "1.5px solid rgba(255,180,120,0.25)", boxShadow: "inset 0 0 24px rgba(255,120,40,0.5)" }} />
          {/* the one wheel still doing its job */}
          <div style={{ position: "absolute", left: 200, top: 664, width: 62, height: 62, borderRadius: "50%", background: "#171520", border: "7px solid #35313C", boxShadow: "0 10px 18px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: 16, top: 16, width: 18, height: 18, borderRadius: "50%", background: grad("#C9CFDC", "#5A6274") }} />
          </div>
          {/* the bare hub: a wheel used to live here */}
          <div style={{ position: "absolute", left: 494, top: 672, width: 44, height: 44, borderRadius: "50%", background: grad("#7A5C3E", "#332417"), border: "3px solid rgba(255,190,120,0.22)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)" }}>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 17 + Math.cos(k * 1.57) * 13, top: 17 + Math.sin(k * 1.57) * 13, width: 5, height: 5, borderRadius: "50%", background: "#1B140E" }} />)}
          </div>
          {/* the fire jumps to the tyre at 4.6s: the last second escalates */}
          {tyreFire > 0 && flame("tf", 196, 640 - tyreFire * 46, 70, 60 + tyreFire * 70 * lick, Math.min(1, tyreFire * 1.6))}
          {/* THE ENGINE FIRE */}
          {flame("f1", 232, 470 - hoodPop * 60, 108, 168 * lick + hoodPop * 74, 1)}
          {flame("f2", 288, 508, 62, 108 * lick, 0.9)}
          {flame("f3", 196, 528, 48, 78 * lick, 0.75)}
          {hoodPop > 0 && Array.from({ length: 9 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            const t = 1 - hoodPop;
            return <div key={"pp" + i} style={{ position: "absolute", left: 270 + Math.cos(r * 6.3) * t * (90 + r * 90), top: 570 + Math.sin(r * 6.3) * t * (70 + r * 60) - t * 34, width: 8 + r * 12, height: 8 + r * 12, borderRadius: "50%", background: r > 0.5 ? "#F0913A" : "#FFE6A2", opacity: hoodPop * 0.8, zIndex: 17 }} />;
          })}
          <div style={{ position: "absolute", left: 40, top: 400, width: 620, height: 392, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,140,50,${0.18 + (lick - 1) * 0.2}), transparent 66%)`, filter: "blur(12px)", mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* the fire extinguisher, stickered, obviously never used */}
          <div style={{ position: "absolute", left: 830, top: 654, width: 44, height: 76, borderRadius: "12px 12px 6px 6px", background: grad("#D0503C", "#7A2418"), border: "2px solid rgba(255,190,170,0.3)", boxShadow: "0 12px 20px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.3)" }}>
            <div style={{ position: "absolute", left: 12, top: -10, width: 20, height: 12, borderRadius: 3, background: grad("#8E96A6", "#3A404C") }} />
          </div>

          {/* ============ LAYER C: the escaping wheels ============ */}
          {lf >= 27 && (() => {
            const rolling = lf < 120;
            const wx = interpolate(lf, [27, 120], [520, 92], { ...clamp, easing: Easing.out(Easing.quad) });
            const wy = interpolate(lf, [27, 120], [676, 744], { ...clamp, easing: Easing.out(Easing.quad) }) + (rolling ? Math.sin(lf * 0.5) * 5 : 0);
            const ws = interpolate(lf, [27, 120], [58, 96], clamp);
            const coin = ramp(lf, 120, 155);
            const tilt = rolling ? Math.sin(lf * 0.34) * 7 : 12 + coin * 44 + Math.sin(lf * 0.9) * 5;
            const flat = rolling ? 1 : Math.abs(Math.cos(lf * (0.42 + coin * 0.5))) * 0.6 + 0.4;
            return (
              <div style={{ position: "absolute", left: wx - ws / 2, top: wy - ws / 2 + coin * 10, width: ws, height: ws, transform: `rotate(${-lf * 9 + tilt}deg) scaleX(${flat})`, zIndex: 12 }}>
                <div style={{ position: "absolute", left: -6, top: ws - 4, width: ws + 12, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(4px)" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: ws, height: ws, borderRadius: "50%", background: "#171520", border: `${ws * 0.13}px solid #35313C`, boxShadow: "0 14px 24px rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", left: ws * 0.3, top: ws * 0.3, width: ws * 0.4, height: ws * 0.4, borderRadius: "50%", background: grad("#C9CFDC", "#5A6274") }} />
                <div style={{ position: "absolute", left: ws * 0.46, top: ws * 0.08, width: ws * 0.08, height: ws * 0.24, background: "rgba(255,214,150,0.5)" }} />
              </div>
            );
          })()}
          {lf >= 117 && (() => {
            const wx = interpolate(lf, [117, 155], [300, 900], { ...clamp, easing: Easing.out(Easing.quad) });
            const wy = interpolate(lf, [117, 155], [690, 762], clamp) + Math.sin(lf * 0.55) * 4;
            const ws = interpolate(lf, [117, 155], [50, 82], clamp);
            return (
              <div style={{ position: "absolute", left: wx - ws / 2, top: wy - ws / 2, width: ws, height: ws, transform: `rotate(${lf * 11 + Math.sin(lf * 0.4) * 8}deg)`, zIndex: 12 }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: ws, height: ws, borderRadius: "50%", background: "#171520", border: `${ws * 0.13}px solid #35313C`, boxShadow: "0 14px 24px rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", left: ws * 0.3, top: ws * 0.3, width: ws * 0.4, height: ws * 0.4, borderRadius: "50%", background: grad("#C9CFDC", "#5A6274") }} />
              </div>
            );
          })()}

          {/* ============ NINE COUNTERFEIT PASSES, AND COUNTING ============ */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 14 }}>
            {SHOTS.map((s, i) => sticker("sk" + i, s.x, s.y, s.r, s.at, 1))}
          </div>

          {/* ============ THE HERO: our rookie, self-certifying ============ */}
          <div style={{ position: "absolute", left: mx - 105, top: my, width: 210, height: 210, zIndex: 18 }}>
            <div style={{ position: "absolute", left: 18, top: 206, width: 174, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(7px)" }} />
            <Mascot lf={lf} size={210} gaze={interpolate(toCam, [0, 1], [-3, 0], clamp)} nodAmp={sit > 0.5 ? 0.6 : 3.4} nodSpeed={9} />
            {/* coveralls, pulled on OVER the racing suit */}
            <div style={{ position: "absolute", left: 34 * U, top: 100 * U, width: 132 * U, height: 50 * U, background: grad("#31456E", "#1A2740"), borderRadius: 3, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.14)" }} />
            <div style={{ position: "absolute", left: 34 * U, top: 94 * U, width: 132 * U, height: 7 * U, background: "rgba(240,236,226,0.85)" }} />
            {[52, 128].map((bx, i) => <div key={"str" + i} style={{ position: "absolute", left: bx * U, top: 100 * U, width: 9 * U, height: 50 * U, background: "rgba(255,255,255,0.12)" }} />)}
            <div style={{ position: "absolute", left: 44 * U, top: 122 * U, width: 60 * U, height: 20 * U, borderRadius: 999, background: "#F2EFE6", border: `${1.5 * U}px solid #22314F`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 10 * U, fontWeight: 700, color: "#22314F", letterSpacing: 1 }}>CLAUDE</div>
            {/* the L-plate, still velcroed to his chest */}
            <div style={{ position: "absolute", left: 118 * U, top: 106 * U, width: 34 * U, height: 34 * U, borderRadius: 4, background: PAPER, border: `${2.5 * U}px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22 * U, color: RED, boxShadow: "0 6px 12px rgba(0,0,0,0.4)", transform: `rotate(${Math.sin(lf * 0.08) * 1.6}deg)` }}>L</div>
            {/* rag out of the pocket */}
            <div style={{ position: "absolute", left: 42 * U, top: 142 * U, width: 13 * U, height: 26 * U, borderRadius: 3, background: grad("#D2724E", "#8E4227"), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf * 0.22) * 9}deg)` }} />
            {/* backwards trucker cap + flipped-up welding visor */}
            <div style={{ position: "absolute", left: 8 * U, top: 40 * U, width: 44 * U, height: 11 * U, borderRadius: "6px 3px 3px 6px", background: grad("#3A4763", "#1E2739") }} />
            <div style={{ position: "absolute", left: 30 * U, top: 24 * U, width: 140 * U, height: 26 * U, borderRadius: "9px 9px 3px 3px", background: grad("#3A4763", "#1E2739"), border: `${1.5 * U}px solid rgba(200,215,245,0.2)`, boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 46 * U, top: 2 * U, width: 108 * U, height: 24 * U, borderRadius: "10px 10px 4px 4px", background: grad("#5C6A54", "#2C3428"), border: `${2 * U}px solid #8A9480`, transform: "rotate(-7deg)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
              <div style={{ position: "absolute", left: 20 * U, top: 6 * U, width: 66 * U, height: 10 * U, borderRadius: 2, background: "rgba(30,44,30,0.9)", border: `${1 * U}px solid rgba(180,200,170,0.35)` }} />
            </div>
            {/* soot on the cheek, growing */}
            <div style={{ position: "absolute", left: 120 * U, top: 88 * U, width: (10 + ramp(lf, 0, 155) * 20) * U, height: 8 * U, borderRadius: "50%", background: "rgba(24,20,18,0.5)", filter: "blur(1.5px)", transform: "rotate(-12deg)" }} />
            {/* LEFT NUB: the DONE sticker gun, spool spinning, reloading on the last frame */}
            <div style={{ position: "absolute", left: -18 * U, top: 66 * U, transformOrigin: "80% 60%", transform: `rotate(${-16 - kick * 22}deg) translateX(${kick * 5}px)` }}>
              <div style={{ position: "absolute", left: -12 * U, top: -14 * U, width: 34 * U, height: 34 * U, borderRadius: "50%", background: grad("#C6CE5C", "#8B9635"), border: `${2 * U}px solid #5F6A22`, transform: `rotate(${lf * 15}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }}>
                <div style={{ position: "absolute", left: 13 * U, top: 2 * U, width: 3 * U, height: 30 * U, background: "rgba(60,70,20,0.5)" }} />
                <div style={{ position: "absolute", left: 12 * U, top: 12 * U, width: 8 * U, height: 8 * U, borderRadius: "50%", background: "#3B4318" }} />
              </div>
              <div style={{ position: "absolute", left: 4 * U, top: 4 * U, width: 56 * U, height: 26 * U, borderRadius: 5, background: grad("#6E7788", "#2B3240"), border: `${1.5 * U}px solid rgba(210,225,250,0.3)`, boxShadow: "0 8px 16px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2)" }} />
              <div style={{ position: "absolute", left: 46 * U, top: 10 * U, width: 22 * U, height: 13 * U, borderRadius: 3, background: grad("#C6CE5C", "#8B9635"), border: `${1 * U}px solid #5F6A22` }} />
              <div style={{ position: "absolute", left: 16 * U, top: 28 * U, width: 11 * U, height: 22 * U, borderRadius: 3, background: grad("#5A6274", "#232833"), transformOrigin: "50% 0%", transform: `rotate(${kick * 26}deg)` }} />
            </div>
            {/* RIGHT NUB: the thumbs-up that never lowers (swapped for the mug at 2.6s) */}
            {sit < 0.5 ? (
              <div style={{ position: "absolute", left: 176 * U, top: 58 * U, transform: `rotate(${Math.sin(lf * 0.3) * 5}deg)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 24 * U, height: 24 * U, borderRadius: 6, background: grad("#E08A63", "#B4522F") }} />
                <div style={{ position: "absolute", left: 7 * U, top: -16 * U, width: 11 * U, height: 20 * U, borderRadius: 5, background: grad("#E08A63", "#B4522F"), border: `${1 * U}px solid rgba(255,220,190,0.35)` }} />
              </div>
            ) : (
              <div style={{ position: "absolute", left: 172 * U, top: 62 * U, opacity: sit }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 30 * U, height: 26 * U, borderRadius: "4px 4px 8px 8px", background: grad("#F2EFE6", "#B9B3A6"), border: `${1.5 * U}px solid rgba(255,255,255,0.5)`, boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 28 * U, top: 5 * U, width: 12 * U, height: 14 * U, borderRadius: "0 8px 8px 0", border: `${3 * U}px solid #D9D3C4`, borderLeft: "none" }} />
                {[0, 1, 2].map((k) => (
                  <div key={k} style={{ position: "absolute", left: (6 + k * 8) * U, top: -18 * U - Math.abs(Math.sin(lf * 0.14 + k)) * 8, width: 3 * U, height: 14 * U, borderRadius: 3, background: "rgba(255,240,220,0.35)", filter: "blur(1px)", transform: `rotate(${Math.sin(lf * 0.2 + k) * 16}deg)` }} />
                ))}
              </div>
            )}
          </div>
          {/* flames licking IN FRONT of him during the this-is-fine beat */}
          {sit > 0.02 && flame("ff", mx - 92, 560, 74, 150 * lick, sit * 0.85)}
          {sit > 0.02 && flame("ff2", mx + 70, 588, 58, 116 * lick, sit * 0.75)}

          {/* ============ THE PROOF: the sentence you have personally received ============ */}
          {lf >= 10 && lf < 46 && (
            <div style={{ position: "absolute", left: 470, top: 402 - ramp(lf, 10, 46) * 26, zIndex: 22, opacity: 1 - ramp(lf, 34, 46), transform: `scale(${interpolate(over(lf, 10, 6, Easing.out(Easing.back(2.6))), [0, 1], [0.6, 1], clamp)})`, transformOrigin: "0% 100%" }}>
              <div style={{ padding: "10px 16px", borderRadius: 14, background: grad("#F7F3EA", "#DFD9CB"), border: "1.5px solid rgba(255,255,255,0.6)", boxShadow: "0 14px 26px rgba(0,0,0,0.5)", fontFamily: mono, fontSize: 17, color: "#25201A", whiteSpace: "nowrap" }}>
                Done! Everything's working now <span style={{ color: GREEN }}>✅</span>
              </div>
              <div style={{ position: "absolute", left: 22, bottom: -7, width: 14, height: 14, background: "#E4DECF", transform: "rotate(45deg)" }} />
            </div>
          )}

          {/* ============ SMOKE: rising, drifting left, rippling the key beam ============ */}
          {Array.from({ length: 16 }).map((_, i) => {
            const r = seed(i * 3.1 + 7);
            const t = ((lf * (1.8 + r * 1.5) + r * 340) % 340) / 340;
            const sz = 34 + r * 70 + t * 120;
            return <div key={"sm" + i} style={{ position: "absolute", left: 280 + r * 90 - t * (170 + r * 130), top: 600 - t * 470, width: sz, height: sz, borderRadius: "50%", background: `rgba(${Math.floor(60 + r * 40)},${Math.floor(52 + r * 30)},${Math.floor(50 + r * 26)},0.32)`, filter: "blur(9px)", opacity: (1 - t) * 0.75, zIndex: 24, pointerEvents: "none" }} />;
          })}
          {Array.from({ length: 18 }).map((_, i) => {
            const r = seed(i * 2.6 + 3);
            const y = 700 - ((lf * (1.4 + r * 2.6) + r * 400) % 420);
            return <div key={"em" + i} style={{ position: "absolute", left: 190 + r * 300 + Math.sin(lf * 0.06 + i) * 24, top: y, width: 3 + r * 4, height: 3 + r * 4, borderRadius: "50%", background: r > 0.5 ? "#FFC163" : "#FF8A3C", opacity: 0.35 + r * 0.5, boxShadow: "0 0 8px rgba(255,150,60,0.8)", zIndex: 25 }} />;
          })}

          {/* ============ MICRO-CAMEO: the customer, quietly leaving ============ */}
          {lf >= 145 && (
            <div style={{ position: "absolute", left: 908 + ramp(lf, 145, 155) * 46, top: 566, width: 92, height: 92, zIndex: 20, opacity: 1 - ramp(lf, 150, 155) * 0.35 }}>
              <div style={{ position: "absolute", left: 6, top: 84, width: 76, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(5px)" }} />
              <Mascot lf={lf} size={92} gaze={-3} nodAmp={1.2} nodSpeed={12} cheer={1} />
              <div style={{ position: "absolute", left: 62, top: 52, width: 26, height: 20, borderRadius: 4, background: grad("#8A6844", "#4E3A24"), border: "1px solid rgba(255,220,180,0.3)" }} />
            </div>
          )}
        </div>

        {/* ============ THE DARE: a pass, thwacked onto the glass in front of your face ============ */}
        {lf >= glassAt && (
          <div style={{ position: "absolute", left: 606, top: 128, width: 200, height: 200, zIndex: 40, transform: `rotate(${8 + Math.sin(lf * 0.8) * 1.6}deg) scale(${interpolate(over(lf, glassAt, 7, Easing.out(Easing.back(3))), [0, 1], [2.2, 1], clamp)})`, transformOrigin: "50% 50%" }}>
            <div style={{ position: "absolute", left: -20, top: -20, width: 240, height: 240, borderRadius: "50%", border: `${3 * glassKick}px solid rgba(255,255,255,${glassKick * 0.5})`, transform: `scale(${1 + (1 - glassKick) * 0.5})` }} />
            {sticker("glass", 100, 100, 0, glassAt, 2.6)}
          </div>
        )}

        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", boxShadow: "inset 0 0 210px rgba(24,10,4,0.7)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", background: `radial-gradient(ellipse at 30% 78%, rgba(255,130,40,${0.1 + (lick - 1) * 0.12}), transparent 62%)`, mixBlendMode: "screen" }} />
      </div>
    </Panel>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const CY: number[][] = [[0, 24], [24, 20], [44, 20], [64, 14], [78, 11]];
  const GAS = [0.62, 0.5, 0.42, 0.34, 0.3];
  const MAXD = [0.4, 0.3, 0.1, 0.05, 0.03];

  const idxOf = (f: number) => {
    let k = 0;
    for (let i = 0; i < CY.length; i++) { if (f >= CY[i][0]) k = i; }
    return k;
  };
  const speedAt = (f: number) => {
    const k = idxOf(f);
    const t = (f - CY[k][0]) / CY[k][1];
    const g = GAS[k];
    if (t >= g) return 0;
    return Math.pow(Math.min(1, Math.max(0, t / g)), 0.7) * (1 - k * 0.13);
  };

  let rp = 0;
  for (let i = 0; i <= Math.floor(lf); i++) rp += speedAt(i) * 24;

  const ci = idxOf(lf);
  const t = (lf - CY[ci][0]) / CY[ci][1];
  const gasEnd = GAS[ci];
  const stompF = CY[ci][0] + gasEnd * CY[ci][1];
  const sf = lf - stompF;
  const spd = speedAt(lf);

  const decay = sf >= 0 ? Math.exp(-sf * 0.19) : 0;
  const lurchX = (sf >= 0 ? decay * Math.cos(sf * 0.8) * -17 : 0) + spd * 5;
  const bounceY = sf >= 0 ? decay * Math.sin(sf * 0.95) * 5.5 : Math.sin(lf * 0.42) * 0.9;
  const pitch = spd * 1.9 + (sf >= 0 ? decay * Math.cos(sf * 0.75) * -3.4 : 0);

  const bootY = sf < 0 ? Math.max(0, 30 + sf * 7) + Math.sin(lf * 0.5) * 1.6 : 30;
  const gasPress = spd * 9;

  const heat = interpolate(lf, [8, 24, 50, 78, 88], [0, 0.2, 0.52, 0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const needle = spd * 138 + (sf >= 0 && sf < 7 ? -9 * Math.exp(-sf * 0.5) : 0);
  const dist = t < gasEnd ? Math.min(1, t / gasEnd) * MAXD[ci] : 0;
  const blink = Math.floor(lf / 7) % 2;
  const cam = interpolate(lf, [76, 88], [1, 0.935], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dashOff = (rp * 0.34 + lurchX * 0.7) % 86;
  const reach = Math.max(0, Math.sin((lf - 44) * 0.14)) * (lf > 40 && lf < 70 ? 1 : 0);

  const TIX = ['refactor auth', 'run the test suite', 'ship the migration', 'fix flaky CI', 'update the docs', 'rotate the keys', 'patch the deps'];

  const cabinTf = `translate(${lurchX} ${bounceY}) rotate(${pitch} 370 540)`;

  return (
    <Panel label="the instructor's brake">
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${cam})`, transformOrigin: '506px 430px' }}>

        {/* ---------- BACKGROUND SET ---------- */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="s2wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#171A22" />
              <stop offset="1" stopColor="#2A2F3B" />
            </linearGradient>
            <linearGradient id="s2floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#232833" />
              <stop offset="1" stopColor="#0E1015" />
            </linearGradient>
            <radialGradient id="s2pool" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={CREAM} stopOpacity="0.3" />
              <stop offset="1" stopColor={CREAM} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="s2body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F3EDE2" />
              <stop offset="0.55" stopColor="#DED4C4" />
              <stop offset="1" stopColor="#B9AD9A" />
            </linearGradient>
            <linearGradient id="s2glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3B4椒" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="s2int" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#39404F" />
              <stop offset="1" stopColor="#1B1F27" />
            </linearGradient>
            <linearGradient id="s2tix" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={PAPER} />
              <stop offset="1" stopColor="#D9CFBD" />
            </linearGradient>
            <linearGradient id="s2beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={CREAM} stopOpacity="0.26" />
              <stop offset="1" stopColor={CREAM} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="s2lane" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#3A404E" />
              <stop offset="1" stopColor="#20242D" />
            </linearGradient>
          </defs>

          {/* wall + floor */}
          <rect x="0" y="62" width="1012" height="296" fill="url(#s2wall)" />
          <rect x="0" y="358" width="1012" height="434" fill="url(#s2floor)" />
          <rect x="0" y="352" width="1012" height="8" fill="#0A0C10" opacity="0.85" />

          {/* dim layer 1: speed streaks past the window */}
          {Array.from({ length: 11 }).map((_, i) => {
            const r = seed(i * 2.7 + 3);
            const y = 92 + r * 232;
            const w = 90 + r * 190;
            const x = ((900 - ((rp * (0.55 + i * 0.09)) % 1300)) + 1300) % 1300 - 200;
            return <rect key={'st' + i} x={x} y={y} width={w} height={2.4} rx={1.2} fill={CREAM} opacity={0.05 + spd * 0.16} />;
          })}

          {/* wall panel seams */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={'ws' + i} x={40 + i * 126} y="62" width="2" height="290" fill={CREAM} opacity="0.045" />
          ))}

          {/* the narrowing lane painted on the floor */}
          <polygon points="30,792 706,792 902,360 856,360" fill="url(#s2lane)" />
          <polygon points="30,792 60,792 866,360 856,360" fill={GOLD} opacity="0.3" />
          <polygon points="706,792 676,792 892,360 902,360" fill={GOLD} opacity="0.3" />
          {/* bottleneck neck at the wall */}
          <rect x="852" y="352" width="56" height="10" rx="4" fill={GOLD} opacity="0.5" />

          {/* dashed lane line that twitches forward and jerks back */}
          {Array.from({ length: 9 }).map((_, i) => {
            const k = i / 8;
            const yy = 780 - k * 400 - dashOff * (1 - k * 0.6) * 0.5;
            if (yy < 372 || yy > 792) return null;
            const kk = (780 - yy) / 420;
            const xx = 300 + kk * 500;
            const w = 44 * (1 - kk * 0.82);
            return <rect key={'dl' + i} x={xx} y={yy} width={w} height={7 * (1 - kk * 0.8)} rx={3} fill={CREAM} opacity={0.34 - kk * 0.16} />;
          })}

          {/* light pool on the floor under the hero */}
          <ellipse cx="380" cy="722" rx="330" ry="58" fill="url(#s2pool)" />

          {/* ---------- QUEUE LAYER: honking work tickets compressing into the neck ---------- */}
          {Array.from({ length: 22 }).map((_, i) => {
            const ap = i * 4.8 - 14;
            const a = over(lf, ap, 10, Easing.out(Easing.cubic));
            if (a <= 0.001) return null;
            const k = i / 21;
            const pk = Math.pow(k, 0.62);
            const bx = 700 + 196 * pk;
            const by = 690 - 328 * pk;
            const sc = 1 - 0.9 * pk;
            const x = bx + (1 - a) * 110;
            const y = by + (1 - a) * 16;
            const r = seed(i * 3.1 + 7);
            const jig = Math.sin(lf * (0.3 + r * 0.25) + r * 9) * 1.6 * sc;
            const w = 148 * sc, h = 62 * sc;
            const hornPh = (lf + r * 40) % (13 + r * 11);
            const honk = hornPh < 5 ? 1 - hornPh / 5 : 0;
            return (
              <g key={'q' + i} opacity={a} transform={`translate(${x} ${y + jig})`}>
                <ellipse cx="0" cy={h * 0.62} rx={w * 0.5} ry={7 * sc} fill="#000" opacity="0.42" />
                <circle cx={-w * 0.3} cy={h * 0.46} r={11 * sc} fill="#14171E" />
                <circle cx={w * 0.3} cy={h * 0.46} r={11 * sc} fill="#14171E" />
                <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={9 * sc} fill="url(#s2tix)" stroke={INK} strokeWidth={1.4 * sc} />
                <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.3} rx={9 * sc} fill={CLAY} opacity="0.85" />
                <rect x={-w / 2 + 6 * sc} y={h * 0.06} width={w - 12 * sc} height={3 * sc} rx={1.5} fill={MUTE} opacity="0.5" />
                {i < 5 ? (
                  <text x={0} y={h * 0.36} fill={INK} fontFamily={mono} fontSize={12.5 * sc} textAnchor="middle" opacity="0.9">
                    {TIX[i % TIX.length]}
                  </text>
                ) : null}
                {honk > 0 && i < 12 ? (
                  <g opacity={honk} stroke={AMBER} strokeWidth={2.4 * sc} fill="none" strokeLinecap="round">
                    <path d={`M ${w * 0.5 + 8 * sc} ${-h * 0.4} a ${9 * sc} ${9 * sc} 0 0 1 0 ${16 * sc}`} />
                    <path d={`M ${w * 0.5 + 16 * sc} ${-h * 0.5} a ${15 * sc} ${15 * sc} 0 0 1 0 ${28 * sc}`} />
                  </g>
                ) : null}
              </g>
            );
          })}

          {/* ---------- THE LEARNER CAR (cutaway profile, faces left) ---------- */}
          <g transform={cabinTf}>
            {/* cast shadow */}
            <ellipse cx="370" cy="722" rx="300" ry="26" fill="#000" opacity="0.5" />
            {/* wheels (locked, never turning) */}
            {[186, 556].map((cx, i) => (
              <g key={'wh' + i}>
                <circle cx={cx} cy="676" r="44" fill="#101319" stroke="#000" strokeWidth="2" />
                <circle cx={cx} cy="676" r="21" fill="#4B5361" />
                <circle cx={cx} cy="676" r="8" fill={MUTE} opacity="0.7" />
              </g>
            ))}
            {/* suspension springs */}
            {[186, 556].map((cx, i) => (
              <path key={'sp' + i} d={`M ${cx - 12} 632 l 24 ${6 + bounceY} l -24 ${6 - bounceY} l 24 ${6 + bounceY} l -24 ${6 - bounceY}`} stroke={MUTE} strokeWidth="3" fill="none" opacity="0.6" />
            ))}
            {/* greenhouse glass */}
            <polygon points="112,436 162,360 586,360 626,436" fill="#2E3644" stroke={INK} strokeWidth="3" />
            {/* interior */}
            <polygon points="118,436 168,368 580,368 618,436" fill="url(#s2int)" />
            <rect x="96" y="430" width="548" height="200" rx="14" fill="url(#s2int)" />
            {/* body shell */}
            <path d="M 76 462 q 0 -26 26 -26 l 538 0 q 26 0 26 26 l 0 152 q 0 26 -26 26 l -538 0 q -26 0 -26 -26 z" fill="url(#s2body)" stroke={INK} strokeWidth="3" opacity="0.28" />
            <rect x="76" y="600" width="590" height="40" rx="18" fill="url(#s2body)" stroke={INK} strokeWidth="2.5" />
            <rect x="76" y="600" width="590" height="10" rx="5" fill={CREAM} opacity="0.5" />
            {/* seats */}
            {[398, 528].map((sx, i) => (
              <path key={'se' + i} d={`M ${sx} 604 l 0 -104 q 0 -18 20 -18 l 34 0 q 20 0 20 18 l 0 104 z`} fill="#2C3triangle" opacity="0" />
            ))}
            {[400, 530].map((sx, i) => (
              <g key={'sb' + i}>
                <rect x={sx} y="486" width="66" height="120" rx="14" fill="#333B4A" stroke={INK} strokeWidth="2" opacity="0.9" />
                <rect x={sx + 6} y="492" width="54" height="6" rx="3" fill={CREAM} opacity="0.12" />
              </g>
            ))}
            {/* roof L-plate placard */}
            <g>
              <rect x="310" y="286" width="96" height="76" rx="8" fill="#F6F2EA" stroke={INK} strokeWidth="3" />
              <text x="358" y="348" fill={RED} fontFamily={fraunces.fontFamily} fontSize="66" textAnchor="middle" fontWeight={700}>L</text>
              <rect x="348" y="356" width="20" height="12" fill="#7E8896" />
            </g>
            {/* door decal */}
            <g opacity="0.95">
              <rect x="286" y="608" width="300" height="26" rx="7" fill={CREAM} stroke={INK} strokeWidth="1.6" />
              <text x="296" y="626" fill={INK} fontFamily={mono} fontSize="12" fontWeight={700}>SAFEDRIVR ACADEMY</text>
              <text x="452" y="626" fill={SLATE} fontFamily={mono} fontSize="10.5">student driver, please be patient</text>
            </g>
          </g>
        </svg>

        {/* ---------- MASCOTS ---------- */}
        <div style={{ position: 'absolute', inset: 0, transform: `translate(${lurchX}px, ${bounceY}px) rotate(${pitch}deg)`, transformOrigin: '370px 540px' }}>
          <div style={{ position: 'absolute', left: 372, top: 398, width: 92 }}>
            <Mascot
              lf={lf}
              size={92}
              gaze={lf < 44 ? 0 : 0.55}
              nodAmp={2}
              nodSpeed={0.5}
              shock={sf >= 0 && sf < 7 ? 1 : 0}
              cheer={lf < 22 ? 1 : 0}
            />
          </div>
          <div style={{ position: 'absolute', left: 514, top: 396, width: 92 }}>
            <Mascot lf={lf} size={92} gaze={-0.5} nodAmp={1} nodSpeed={0.3} stern={1} constr={1} tint={MUTE} />
          </div>
        </div>

        {/* ---------- FOREGROUND: rig, pedals, boot, heat, atmosphere ---------- */}
        <svg width="1012" height="792" viewBox="0 0 1012 792" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <radialGradient id="s2hot" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={AMBER} stopOpacity="0.95" />
              <stop offset="1" stopColor={AMBER} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="s2red" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={RED} stopOpacity="0.95" />
              <stop offset="1" stopColor={RED} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="s2chrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#EDF1F6" />
              <stop offset="0.5" stopColor="#9AA5B4" />
              <stop offset="1" stopColor="#5A6472" />
            </linearGradient>
            <linearGradient id="s2boot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5C6472" />
              <stop offset="1" stopColor="#242A34" />
            </linearGradient>
            <linearGradient id="s2beam2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={CREAM} stopOpacity="0.22" />
              <stop offset="1" stopColor={CREAM} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* volumetric key light through the windscreen, wobbles with the suspension */}
          <polygon points={`${96 + bounceY * 1.6},70 ${232 + bounceY * 1.6},70 ${470 + bounceY * 3},736 ${118 + bounceY * 3},736`} fill="url(#s2beam2)" />

          <g transform={cabinTf}>
            {/* dash cluster */}
            <rect x="108" y="452" width="240" height="132" rx="12" fill="#171B23" stroke={INK} strokeWidth="2.5" />
            <rect x="108" y="452" width="240" height="6" rx="3" fill={CREAM} opacity="0.14" />

            {/* terminal: the actual bottleneck mechanism */}
            <rect x="116" y="460" width="224" height="34" rx="6" fill={TERM} stroke={TERM2} strokeWidth="1.2" opacity="0.95" />
            <text x="124" y="482" fill={GREEN} fontFamily={mono} fontSize="11.5">{'⏸ awaiting your approval [y/n]'}</text>
            {blink ? <rect x="316" y="472" width="7" height="14" fill={GREEN} /> : null}

            {/* speedo */}
            <circle cx="152" cy="538" r="36" fill="#0E1118" stroke="url(#s2chrome)" strokeWidth="3" />
            <path d="M 124 560 A 36 36 0 1 1 180 560" stroke={MUTE} strokeWidth="2" fill="none" opacity="0.5" />
            {Array.from({ length: 7 }).map((_, i) => {
              const a = (-124 + i * 24) * Math.PI / 180;
              return <line key={'tk' + i} x1={152 + Math.cos(a) * 27} y1={538 + Math.sin(a) * 27} x2={152 + Math.cos(a) * 32} y2={538 + Math.sin(a) * 32} stroke={CREAM} strokeWidth="1.6" opacity="0.55" />;
            })}
            <line x1="152" y1="538" x2={152 + Math.cos((-124 + needle) * Math.PI / 180) * 28} y2={538 + Math.sin((-124 + needle) * Math.PI / 180) * 28} stroke={RED} strokeWidth="3" strokeLinecap="round" />
            <circle cx="152" cy="538" r="4" fill="url(#s2chrome)" />

            {/* trip readout */}
            <rect x="200" y="504" width="140" height="72" rx="7" fill="#0E1118" stroke={SLATE} strokeWidth="1.4" />
            <text x="210" y="524" fill={MUTE} fontFamily={mono} fontSize="10" letterSpacing="1.4">PROGRESS</text>
            <text x="210" y="560" fill={dist > 0.05 ? GREEN : RED} fontFamily={mono} fontSize="26" fontWeight={700}>{dist.toFixed(1)} m</text>

            {/* steering wheel + hands at 10 and 2 (hands leave the wheel in beat 4) */}
            <g opacity={lf < 64 ? 1 : 0.9}>
              <circle cx="366" cy="522" r="30" fill="none" stroke="#2B313D" strokeWidth="9" />
              <circle cx="366" cy="522" r="30" fill="none" stroke="url(#s2chrome)" strokeWidth="2.4" />
              <line x1="366" y1="522" x2="366" y2="552" stroke="#2B313D" strokeWidth="6" />
            </g>
            {lf < 64 ? (
              <g>
                <circle cx="348" cy={504 - reach * 6} r={8} fill={CLAY} stroke={INK} strokeWidth="1.6" />
                <circle cx="386" cy="504" r={8} fill={CLAY} stroke={INK} strokeWidth="1.6" />
              </g>
            ) : (
              <g>
                <circle cx={344} cy={472 - Math.sin(lf * 0.5) * 4} r={8} fill={CLAY} stroke={INK} strokeWidth="1.6" />
                <circle cx={392} cy={470 - Math.sin(lf * 0.5 + 1) * 4} r={8} fill={CLAY} stroke={INK} strokeWidth="1.6" />
              </g>
            )}

            {/* seatbelt strap, snaps taut on every stomp */}
            <line
              x1="378" y1="440" x2="452" y2="496"
              stroke="#20252F"
              strokeWidth={sf >= 0 && sf < 8 ? 12 : 9}
              strokeLinecap="round"
              opacity="0.95"
            />
            <line x1="378" y1="440" x2="452" y2="496" stroke={CREAM} strokeWidth="1.6" opacity="0.25" />

            {/* NOS knockoff button + arcade shift light */}
            <g opacity={0.95}>
              <rect x="452" y="530" width="52" height="46" rx="9" fill="#2A3040" stroke={INK} strokeWidth="2" />
              <circle cx="478" cy="548" r={14 + (reach > 0.4 ? 1.2 : 0)} fill={RED} stroke="#000" strokeWidth="1.6" />
              <circle cx="474" cy="544" r="4" fill={CREAM} opacity="0.5" />
              <text x="478" y="572" fill={CREAM} fontFamily={mono} fontSize="9" textAnchor="middle" letterSpacing="1">NOS</text>
              {[0, 1, 2].map((i) => (
                <rect key={'sl' + i} x={454 + i * 17} y="522" width="12" height="5" rx="2.5" fill={i < 1 + Math.floor(spd * 2.4) ? AMBER : '#3B4353'} />
              ))}
            </g>

            {/* Claude's leg + foot on the accelerator */}
            <path d={`M 414 484 q 4 44 -12 62 l 0 ${44 - gasPress}`} stroke={CLAY} strokeWidth="17" fill="none" strokeLinecap="round" />
            <path d={`M 414 484 q 4 44 -12 62 l 0 ${44 - gasPress}`} stroke={INK} strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" />
            <ellipse cx="396" cy={594 - gasPress} rx="19" ry="9" fill={CLAY} stroke={INK} strokeWidth="1.6" />
            {/* accelerator pedal */}
            <g transform={`translate(404 604) rotate(${-gasPress * 1.1})`}>
              <rect x="-10" y="-4" width="34" height="9" rx="4" fill="url(#s2chrome)" stroke={INK} strokeWidth="1.4" />
            </g>

            {/* YOU's leg + oversized boot over the chrome brake */}
            <path d={`M 560 484 q 12 42 -2 ${58 + bootY * 0.4}`} stroke={MUTE} strokeWidth="19" fill="none" strokeLinecap="round" />
            <g transform={`translate(548 ${560 + bootY})`}>
              <rect x="-14" y="-6" width="30" height="30" rx="7" fill="url(#s2boot)" stroke={INK} strokeWidth="2" />
              <path d="M -22 22 q 0 -6 8 -6 l 34 0 q 12 0 12 12 l 0 8 q 0 6 -8 6 l -38 0 q -8 0 -8 -8 z" fill="url(#s2boot)" stroke={INK} strokeWidth="2.2" />
              <rect x="-22" y="38" width="56" height="7" rx="3.5" fill="#0D1016" />
              {[0, 1, 2].map((i) => (
                <rect key={'lace' + i} x={-12 + i * 2} y={-2 + i * 8} width="26" height="3" rx="1.5" fill={AMBER} opacity="0.55" />
              ))}
            </g>

            {/* chrome instructor brake pedal, accumulating heat */}
            <circle cx="552" cy="600" r={26 + heat * 10} fill="url(#s2hot)" opacity={heat * 0.85} />
            <circle cx="552" cy="600" r={18 + heat * 8} fill="url(#s2red)" opacity={Math.max(0, heat - 0.45) * 1.7} />
            <g transform={`translate(552 602) rotate(${sf >= 0 ? -14 : 0})`}>
              <rect x="-14" y="-5" width="40" height="11" rx="5" fill="url(#s2chrome)" stroke={INK} strokeWidth="1.6" />
              <rect x="-10" y="-3" width="30" height="3" rx="1.5" fill={CREAM} opacity="0.7" />
            </g>
            <rect x="96" y="596" width="548" height="10" rx="5" fill="#0F131A" opacity="0.9" />

            {/* heat shimmer above the brake */}
            {Array.from({ length: 4 }).map((_, i) => {
              const r = seed(i * 5.3 + 2);
              const y = 586 - i * 12 - ((lf * 0.9 + r * 20) % 22);
              return (
                <path
                  key={'sh' + i}
                  d={`M 530 ${y} q 11 ${Math.sin(lf * 0.34 + i) * 5} 22 0 q 11 ${-Math.sin(lf * 0.34 + i) * 5} 22 0`}
                  stroke={AMBER}
                  strokeWidth="1.6"
                  fill="none"
                  opacity={heat * 0.4}
                />
              );
            })}
            {/* smoke wisps off the pedal */}
            {Array.from({ length: 7 }).map((_, i) => {
              const r = seed(i * 4.7 + 11);
              const ph = (lf * 1.5 + r * 40) % 46;
              const y = 590 - ph * 3.4;
              const x = 552 + Math.sin(ph * 0.14 + r * 6) * (7 + ph * 0.32);
              return <circle key={'sm' + i} cx={x} cy={y} r={3 + ph * 0.2} fill={MUTE} opacity={Math.max(0, heat - 0.25) * (1 - ph / 46) * 0.55} />;
            })}
          </g>

          {/* tire smoke puffs at each stomp */}
          {sf >= 0 && sf < 15
            ? Array.from({ length: 8 }).map((_, i) => {
              const r = seed(i * 6.1 + 5);
              const cx = (i < 4 ? 186 : 556) + (r - 0.5) * 70 - sf * (1.6 + r);
              const cy = 700 - sf * (1.1 + r * 1.4);
              return <circle key={'tp' + i} cx={cx} cy={cy} r={6 + sf * (1.1 + r)} fill={CREAM} opacity={Math.max(0, 0.4 - sf * 0.028)} />;
            })
            : null}

          {/* L placard halo clipped above Claude's head */}
          <g transform={`translate(${lurchX} ${bounceY}) rotate(${pitch} 370 540)`}>
            <rect x="396" y="376" width="34" height="28" rx="4" fill="#F6F2EA" stroke={INK} strokeWidth="2" />
            <text x="413" y="399" fill={RED} fontFamily={fraunces.fontFamily} fontSize="23" textAnchor="middle" fontWeight={700}>L</text>
          </g>

          {/* the one label doing real work */}
          <g transform={`translate(${lurchX} ${bounceY}) rotate(${pitch} 370 540)`}>
            <rect x="536" y="474" width="44" height="20" rx="10" fill={GOLD} stroke={INK} strokeWidth="1.6" />
            <text x="558" y="489" fill={INK} fontFamily={mono} fontSize="11" fontWeight={700} textAnchor="middle" letterSpacing="1">YOU</text>
          </g>

          {/* atmosphere: dust motes drifting through the beam */}
          {Array.from({ length: 18 }).map((_, i) => {
            const r = seed(i * 1.9 + 13);
            const x = 90 + r * 860 + Math.sin(lf * 0.03 + r * 9) * 16;
            const y = 90 + ((r * 700 + lf * (0.35 + r * 0.5)) % 660);
            return <circle key={'du' + i} cx={x} cy={y} r={1 + r * 1.8} fill={CREAM} opacity={0.1 + r * 0.2} />;
          })}

          {/* vignette */}
          <rect x="0" y="62" width="1012" height="8" fill="#000" opacity="0.3" />
        </svg>
      </div>
    </Panel>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const cl = (v: number) => Math.max(0, Math.min(1, v));
  const bell = (a: number, b: number) => Math.sin(cl((lf - a) / (b - a)) * Math.PI);

  // ---- hero: acting from frame 0, three escalating attempts ----
  const heroX = interpolate(
    lf,
    [0, 36, 150, 168, 206, 216, 226, 238, 254],
    [312, 402, 402, 436, 436, 440, 464, 410, 418],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const r1 = lf < 78 ? 18 * bell(34, 70) : 0;
  const r2 = lf >= 78 && lf < 152 ? 48 * bell(88, 126) : 0;
  const r3 = lf >= 152 && lf < 216 ? 124 * bell(164, 204) : 0;
  const r4 = lf >= 216 ? 12 * bell(242, 256) : 0;
  const rise = r1 + r2 + r3 + r4 + 2 + 2 * Math.sin(lf / 5);
  const heroSize = 128;
  const heroBottom = 600;
  const headTop = heroBottom - heroSize - rise;
  const lean = interpolate(lf, [214, 226, 232, 244], [0, 9, 9, -4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walk = Math.sin(lf / 4.2) * 2.4;

  // ---- the bar he must clear: "you must be this proven" ----
  const bonk = lf > 178 && lf < 200 ? Math.sin(((lf - 178) / 22) * Math.PI * 3) * (1 - (lf - 178) / 22) : 0;
  const armY = 356 + bonk * 8;
  const armHot = Math.max(bell(178, 198), 0.18 + 0.14 * Math.sin(lf / 7));

  // ---- locked bolt over the prize ----
  const locked = lf >= 224;
  const boltX = interpolate(lf, [224, 231], [-190, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const buzz = locked ? (Math.floor(lf / 3) % 2 === 0 ? 1 : 0.4) : 0;

  // ---- perpetual loop 1: ceiling strike cascade, never finishes ----
  const strips = Array.from({ length: 9 }).map((_, i) => {
    const t = i / 8;
    const y = 126 - 112 * t;
    const w = 210 + 700 * t * t;
    const d = (((lf * 1.35 - i * 10) % 150) + 150) % 150;
    const flick = seed(i * 4.7 + Math.floor(lf / 2)) > 0.45 ? 1 : 0.28;
    const bright = d < 9 ? flick : d < 118 ? 1 : 0.16;
    return { y, w, bright, h: 5 + 7 * t };
  });

  // ---- perpetual loop 2: dust in the key-light shaft ----
  const motes = Array.from({ length: 18 }).map((_, i) => {
    const r = seed(i * 3.1 + 7);
    const s = 0.35 + seed(i * 2.3 + 1) * 0.85;
    const x = 250 + r * 440;
    const y = ((((lf * s + r * 760) % 760) + 760) % 760) - 30;
    return { x, y, o: 0.1 + seed(i * 5.9 + 3) * 0.3, sz: 1.6 + seed(i * 1.7 + 9) * 2.4 };
  });

  // ---- perpetual loop 3: turnstile ratchet ----
  const step = Math.floor(lf / 26);
  const sp = cl(((lf % 26) - 2) / 9);
  const turn = step * 90 + 90 * (sp * sp * (3 - 2 * sp));

  return (
    <Panel label="THE AGENTIC OS">
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 58,
          width: 980,
          height: 706,
          borderRadius: 18,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0d1013 0%, #14181d 46%, #1b2026 100%)',
        }}
      >
        {/* corridor geometry */}
        <svg width={980} height={706} style={{ position: 'absolute', left: 0, top: 0 }}>
          <defs>
            <linearGradient id="s3wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#252c34" />
              <stop offset="100%" stopColor="#141920" />
            </linearGradient>
            <linearGradient id="s3floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d2229" />
              <stop offset="100%" stopColor="#2b323b" />
            </linearGradient>
            <linearGradient id="s3glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a4650" />
              <stop offset="100%" stopColor="#1c232a" />
            </linearGradient>
          </defs>

          <polygon points="0,0 320,150 320,520 0,706" fill="url(#s3wall)" />
          <polygon points="980,0 660,150 660,520 980,706" fill="url(#s3wall)" />
          <polygon points="320,520 660,520 980,706 0,706" fill="url(#s3floor)" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={'fl' + i} x1={490} y1={520} x2={-260 + i * 150} y2={706} stroke="#3d4652" strokeWidth={1.4} opacity={0.5} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => {
            const t = (i + 1) / 5;
            return <line key={'fh' + i} x1={0} y1={520 + 186 * t * t} x2={980} y2={520 + 186 * t * t} stroke="#3d4652" strokeWidth={1.2} opacity={0.32} />;
          })}

          <rect x={320} y={150} width={340} height={370} fill="#1a2027" />
          <rect x={320} y={150} width={340} height={370} fill="none" stroke="#333c46" strokeWidth={2} />

          {/* wired glass, the prize behind it */}
          <rect x={430} y={215} width={156} height={106} rx={6} fill="url(#s3glass)" stroke="#4b5761" strokeWidth={3} />
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={'wv' + i} x1={450 + i * 20} y1={215} x2={450 + i * 20} y2={321} stroke="#5a6873" strokeWidth={0.8} opacity={0.55} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={'wh' + i} x1={430} y1={233 + i * 18} x2={586} y2={233 + i * 18} stroke="#5a6873" strokeWidth={0.8} opacity={0.55} />
          ))}
          <line x1={508} y1={228} x2={508} y2={248} stroke="#8e9aa4" strokeWidth={3} />
          <g transform={`translate(${508 + Math.sin(lf / 21) * 3}, 248) rotate(${Math.sin(lf / 21) * 4})`}>
            <circle cx={0} cy={10} r={10} fill="none" stroke={GOLD} strokeWidth={4} />
            <rect x={-2.5} y={18} width={5} height={30} rx={2} fill={GOLD} />
            <rect x={-2.5} y={40} width={13} height={4.5} rx={2} fill={GOLD} />
            <rect x={-2.5} y={30} width={10} height={4.5} rx={2} fill={GOLD} />
            <circle cx={16} cy={12} r={7} fill="none" stroke={GOLD} strokeWidth={3} opacity={0.75} />
            <rect x={13.5} y={18} width={4} height={22} rx={2} fill={GOLD} opacity={0.75} />
          </g>
          <rect x={430} y={215} width={156} height={106} rx={6} fill={GOLD} opacity={0.07 + 0.05 * Math.sin(lf / 9)} />
        </svg>

        {/* ceiling strike cascade */}
        {strips.map((s, i) => (
          <div key={'st' + i} style={{ position: 'absolute', left: 490 - s.w / 2, top: s.y, width: s.w, height: s.h }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 4,
                background: `linear-gradient(180deg, #fff8e6, ${AMBER})`,
                opacity: 0.22 + 0.78 * s.bright,
                boxShadow: `0 0 ${16 + 30 * s.bright}px ${8 + 14 * s.bright}px rgba(240,180,90,${0.1 + 0.2 * s.bright})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -6,
                top: s.h,
                width: s.w + 12,
                height: 70 + i * 8,
                background: `linear-gradient(180deg, rgba(240,190,110,${0.16 * s.bright}), rgba(240,190,110,0))`,
                clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </div>
        ))}

        {/* volumetric key-light shaft + dust */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 980,
            height: 706,
            background: `linear-gradient(180deg, rgba(255,214,150,${0.2 + 0.03 * Math.sin(lf / 11)}), rgba(255,196,120,0.02))`,
            clipPath: 'polygon(38% 0%, 56% 0%, 74% 100%, 22% 100%)',
            mixBlendMode: 'screen',
          }}
        />
        {motes.map((m, i) => (
          <div key={'m' + i} style={{ position: 'absolute', left: m.x, top: m.y, width: m.sz, height: m.sz, borderRadius: '50%', background: '#ffe6bd', opacity: m.o }} />
        ))}

        {/* bare industrial archway */}
        <div style={{ position: 'absolute', left: 200, top: 26, width: 40, height: 616, borderRadius: 6, background: 'linear-gradient(90deg, #39424c, #222931)', border: '1px solid #4c5763', boxShadow: '10px 0 26px rgba(0,0,0,0.45)' }} />
        <div style={{ position: 'absolute', left: 740, top: 26, width: 40, height: 616, borderRadius: 6, background: 'linear-gradient(90deg, #222931, #39424c)', border: '1px solid #4c5763', boxShadow: '-10px 0 26px rgba(0,0,0,0.45)' }} />
        <div style={{ position: 'absolute', left: 190, top: 26, width: 600, height: 64, borderRadius: 6, background: 'linear-gradient(180deg, #414b56, #232a32)', border: '1px solid #4c5763', boxShadow: '0 16px 32px rgba(0,0,0,0.5)' }} />

        {[286, 690].map((cx, i) => (
          <div key={'ch' + i} style={{ position: 'absolute', left: cx, top: 88, width: 6, height: 22, background: 'repeating-linear-gradient(180deg, #8b96a1 0px, #8b96a1 4px, #3c4550 4px, #3c4550 7px)', transform: `rotate(${Math.sin(lf / 17 + i) * 0.5}deg)` }} />
        ))}

        {/* THE RULE PLATE: the only header in the frame */}
        <div
          style={{
            position: 'absolute',
            left: 248,
            top: 108,
            width: 484,
            height: 74,
            transformOrigin: '50% 0%',
            transform: `rotate(${Math.sin(lf / 17) * 0.35}deg)`,
            borderRadius: 8,
            background: 'linear-gradient(180deg, #3b444f, #1d232a)',
            border: `2px solid ${MUTE}`,
            boxShadow: '0 18px 34px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Chip text="1 OF 1" bg={RED} bd={RED} fg={CREAM} size={16} />
          <div
            style={{
              fontFamily: mono,
              fontSize: 27,
              letterSpacing: 2.2,
              color: '#ffedd0',
              fontWeight: 800,
              opacity: 0.8 + 0.2 * Math.sin(lf / 6) + 0.2 * bell(178, 198),
              textShadow: `0 0 ${12 + 16 * bell(178, 198)}px rgba(240,190,110,0.7)`,
            }}
          >
            NO SOLO WORK UNTIL PROVEN
          </div>
          {[10, 466].map((rx, i) => (
            <div key={'rv' + i} style={{ position: 'absolute', left: rx, top: 8, width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #d9e2ea, #59636e)', opacity: 0.7 + 0.3 * Math.sin(lf / 8 + i) }} />
          ))}
          {[10, 466].map((rx, i) => (
            <div key={'rv2' + i} style={{ position: 'absolute', left: rx, top: 56, width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #d9e2ea, #59636e)', opacity: 0.7 + 0.3 * Math.sin(lf / 8 + i + 2) }} />
          ))}
        </div>

        {/* the height gate */}
        <div style={{ position: 'absolute', left: 606, top: 300, width: 16, height: 320, borderRadius: 4, background: 'linear-gradient(90deg, #4a545f, #232a32)', border: '1px solid #59636e', boxShadow: '0 12px 22px rgba(0,0,0,0.5)' }} />
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={'tk' + i} style={{ position: 'absolute', left: 596, top: 312 + i * 27, width: i % 5 === 0 ? 30 : 18, height: 2, background: '#6d7883', opacity: 0.7 }} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 372,
            top: armY,
            width: 240,
            height: 15,
            borderRadius: 7,
            background: `repeating-linear-gradient(45deg, ${RED} 0px, ${RED} 12px, #ffe9c9 12px, #ffe9c9 24px)`,
            border: '1px solid rgba(0,0,0,0.35)',
            boxShadow: `0 10px 22px rgba(0,0,0,0.5), 0 0 ${10 + 26 * armHot}px rgba(214,78,58,${0.3 + 0.5 * armHot})`,
            transform: `rotate(${bonk * 1.6}deg)`,
            transformOrigin: '100% 50%',
          }}
        />
        <div style={{ position: 'absolute', left: 588, top: headTop - 7, width: 40, height: 14, borderRadius: 4, background: `linear-gradient(180deg, ${CLAY}, #7a3f2c)`, border: `1px solid ${CREAM}`, boxShadow: '0 6px 12px rgba(0,0,0,0.45)' }} />
        <div style={{ position: 'absolute', left: 470, top: headTop - 1, width: 120, height: 2, background: CLAY, opacity: 0.4 }} />

        {/* LOCKED bolt slams across the glass */}
        <div
          style={{
            position: 'absolute',
            left: 414 + boltX,
            top: 252,
            width: 190,
            height: 30,
            borderRadius: 6,
            background: `linear-gradient(180deg, ${RED}, #7d2b20)`,
            border: '2px solid #ffb9a6',
            opacity: locked ? 1 : 0,
            boxShadow: `0 0 ${18 + 24 * buzz}px rgba(214,78,58,${0.5 + 0.5 * buzz})`,
          }}
        />
        <div style={{ position: 'absolute', left: 430, top: 215, width: 156, height: 106, borderRadius: 6, background: RED, opacity: locked ? 0.14 + 0.2 * buzz : 0 }} />

        {/* shadows */}
        <div style={{ position: 'absolute', left: heroX + 8, top: heroBottom - 8, width: 118 - rise * 0.22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', filter: 'blur(7px)', opacity: 0.85 - rise * 0.002 }} />
        <div style={{ position: 'absolute', left: heroX + 26, top: 470, width: 62, height: 130, background: 'linear-gradient(0deg, rgba(0,0,0,0.42), rgba(0,0,0,0))', filter: 'blur(5px)', clipPath: 'polygon(28% 100%, 72% 100%, 100% 0%, 0% 0%)' }} />

        {/* HERO: rookie candidate */}
        <div style={{ position: 'absolute', left: heroX, top: headTop, width: heroSize, height: heroSize, transform: `rotate(${lean * 0.4 + walk * 0.5}deg)` }}>
          <Mascot lf={lf} size={heroSize} nodAmp={lf > 160 && lf < 210 ? 5 : 2} nodSpeed={lf > 160 && lf < 210 ? 5 : 3} shock={lf >= 226 && lf < 248} />
          <div style={{ position: 'absolute', left: 22, top: -8, width: 86, height: 20, borderRadius: 10, background: `linear-gradient(180deg, ${SLATE}, ${INK})`, border: `1px solid ${MUTE}`, boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: 6, top: 8, width: 62, height: 9, borderRadius: 5, background: INK, border: `1px solid ${MUTE}` }} />
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 62,
              width: 44,
              height: 44,
              borderRadius: 7,
              background: '#f6f1e6',
              border: `2px solid ${RED}`,
              boxShadow: '0 5px 10px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fraunces.fontFamily,
              fontSize: 30,
              fontWeight: 900,
              color: RED,
              lineHeight: 1,
            }}
          >
            L
          </div>
          <div style={{ position: 'absolute', left: 96, top: 54, width: 3, height: 22, background: MUTE }} />
          <div
            style={{
              position: 'absolute',
              left: 82,
              top: 74,
              width: 32,
              height: 22,
              borderRadius: 3,
              background: PAPER,
              border: `1px solid ${MUTE}`,
              transform: `rotate(${Math.sin(lf / 4.2) * 9 - lean * 0.6}deg)`,
              transformOrigin: '50% -80%',
              boxShadow: '0 3px 6px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ position: 'absolute', left: 2, top: 2, width: 10, height: 12, background: '#dcd5c6', borderRadius: 1 }} />
            <div style={{ position: 'absolute', left: 15, top: 4, width: 14, height: 2, background: '#cec6b5' }} />
            <div style={{ position: 'absolute', left: 15, top: 9, width: 11, height: 2, background: '#cec6b5' }} />
            <div style={{ position: 'absolute', left: 2, top: 16, width: 27, height: 4, background: '#e6dfd0' }} />
          </div>
          <div style={{ position: 'absolute', left: -8, top: 66 - rise * 0.14, width: 26, height: 17, borderRadius: 2, background: PAPER, border: `1px solid ${MUTE}`, transform: `rotate(${-14 + Math.sin(lf / 5) * 5}deg)`, boxShadow: '0 3px 6px rgba(0,0,0,0.35)' }} />
        </div>

        <div style={{ position: 'absolute', left: heroX - 40, top: heroBottom - 210, width: 210, height: 210, borderRadius: '50%', background: `radial-gradient(circle, rgba(255,200,130,${0.16 + 0.06 * Math.sin(lf / 9)}), rgba(255,200,130,0))`, mixBlendMode: 'screen' }} />

        {/* turnstile, ratcheting forever */}
        <div style={{ position: 'absolute', left: 236, top: 566, width: 18, height: 76, borderRadius: 4, background: 'linear-gradient(90deg, #47515c, #232a32)', border: '1px solid #59636e' }} />
        <div style={{ position: 'absolute', left: 245, top: 570, width: 0, height: 0 }}>
          <div style={{ position: 'absolute', left: -54, top: -6, width: 108, height: 12, transform: `rotate(${turn}deg)`, transformOrigin: '50% 50%' }}>
            <div style={{ position: 'absolute', left: 0, top: 3, width: 108, height: 6, borderRadius: 3, background: 'linear-gradient(90deg, #6c7784, #39424c)', boxShadow: '0 5px 10px rgba(0,0,0,0.45)' }} />
          </div>
          <div style={{ position: 'absolute', left: -54, top: -6, width: 108, height: 12, transform: `rotate(${turn + 90}deg)`, transformOrigin: '50% 50%' }}>
            <div style={{ position: 'absolute', left: 0, top: 3, width: 108, height: 6, borderRadius: 3, background: 'linear-gradient(90deg, #6c7784, #39424c)', boxShadow: '0 5px 10px rgba(0,0,0,0.45)' }} />
          </div>
          <div style={{ position: 'absolute', left: -10, top: -10, width: 20, height: 20, borderRadius: '50%', background: '#8e9aa4', border: '2px solid #39424c' }} />
        </div>

        {/* two dimmer rookies still shuffling the queue */}
        {Array.from({ length: 2 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const shuffle = (((lf * 0.22 + i * 20) % 46) / 46) * 12;
          const qx = 52 + i * 84 + shuffle + Math.sin((lf + i * 40) / 22) * 5;
          const qy = 566 + i * 6;
          const rot = i === 1 ? 180 - 180 * cl(((lf % 190) - 96) / 44) : 0;
          return (
            <div key={'q' + i} style={{ position: 'absolute', left: qx, top: qy, width: 78, height: 78, opacity: 0.5 + r * 0.06 }}>
              <div style={{ position: 'absolute', left: 4, top: 74, width: 70, height: 12, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', filter: 'blur(4px)' }} />
              <Mascot lf={lf + i * 31} size={78} nodAmp={2} nodSpeed={2} />
              <div style={{ position: 'absolute', left: 12, top: -4, width: 54, height: 12, borderRadius: 6, background: INK, border: `1px solid ${MUTE}` }} />
              <div
                style={{
                  position: 'absolute',
                  left: 24,
                  top: 38,
                  width: 28,
                  height: 28,
                  borderRadius: 5,
                  background: '#f6f1e6',
                  border: `2px solid ${RED}`,
                  transform: `rotate(${rot}deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fraunces.fontFamily,
                  fontSize: 19,
                  fontWeight: 900,
                  color: RED,
                  lineHeight: 1,
                }}
              >
                L
              </div>
            </div>
          );
        })}

        {/* queue rope */}
        <div style={{ position: 'absolute', left: 24, top: 654, width: 210, height: 6, borderRadius: 3, background: 'linear-gradient(180deg, #6d5a48, #3a2f26)', transform: `rotate(${-1 + Math.sin(lf / 24) * 0.5}deg)` }} />
        {[20, 226].map((sx, i) => (
          <div key={'sp' + i} style={{ position: 'absolute', left: sx, top: 650, width: 10, height: 56, borderRadius: 4, background: 'linear-gradient(90deg, #7f8a95, #3a434d)' }} />
        ))}

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)' }} />
      </div>
    </Panel>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const W = 984, H = 722, HZ = 390;

  // ---------- ROLLER DOOR: the continuity spine (3 day-cycles) ----------
  const door =
    lf < 2 ? 0 :
    lf < 14 ? ramp(lf, 2, 14) :
    lf < 34 ? 1 :
    lf < 38 ? 1 - ramp(lf, 34, 38) :
    lf < 46 ? ramp(lf, 38, 46) :
    lf < 66 ? 1 :
    lf < 70 ? 1 - ramp(lf, 66, 70) :
    lf < 74 ? ramp(lf, 70, 74) : 1;
  const shaftH = 22 + 300 * door;

  // ---------- INSPECTOR LAP ----------
  let p = 0;
  if (lf < 14) p = 0;
  else if (lf < 24) p = ramp(lf, 14, 24) * 0.5;
  else if (lf < 28) p = 0.5;                       // tyre kick
  else if (lf < 34) p = 0.5 + ramp(lf, 28, 34) * 0.5;
  else if (lf < 40) p = 1;
  else if (lf < 66) p = ramp(lf, 40, 66);          // cycle 2, looser
  else if (lf < 72) p = 1;
  else p = ramp(lf, 72, 88) * 0.75;                // cycle 3, breaks at .75

  const ang = -Math.PI / 2 + p * Math.PI * 2;
  const cx = 520, cy = 592, rx = 268, ry = 74;
  const depth = (Math.sin(ang) + 1) / 2;
  let gx = cx + rx * Math.cos(ang);
  let gy = cy + ry * Math.sin(ang);
  let isc = 0.82 + 0.3 * depth;
  const skid = lf >= 88 && lf < 96 ? Math.sin(ramp(lf, 88, 96) * Math.PI * 2) * 11 : 0;
  gx += skid;
  const toPillar = lf > 95 ? ramp(lf, 95, 99) : 0;
  gx = gx + (188 - gx) * toPillar;
  gy = gy + (620 - gy) * toPillar;
  isc = isc + (1.16 - isc) * toPillar;
  const jump = lf > 99 ? Math.sin(ramp(lf, 99, 107) * Math.PI) * 86 : 0;
  const iy = gy - jump;
  const walking = (lf > 14 && lf < 34) || (lf > 40 && lf < 66) || (lf > 72 && lf < 88) || toPillar > 0;
  const bob = walking ? Math.abs(Math.sin(lf * 0.62)) * 4.2 : Math.sin(lf * 0.11) * 1.1;
  const vx = -Math.sin(ang);
  const facing = toPillar > 0.15 ? -1 : (vx >= 0 ? 1 : -1);
  const shockV = lf >= 88 && lf < 99 ? 1 : 0;
  const capSlide = interpolate(lf, [88, 91, 93.5, 96], [0, 14, 14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const keyRot = 9 * Math.min(lf, 38) + 6.2 * Math.max(0, Math.min(lf, 70) - 38) + 3.6 * Math.max(0, lf - 70);
  const yawn = lf >= 50 && lf <= 58 ? Math.sin(ramp(lf, 50, 58) * Math.PI) : 0;
  const kick = lf >= 24 && lf < 28 ? Math.sin(ramp(lf, 24, 28) * Math.PI) : 0;
  const beamRot = (Math.atan2(500 - iy, cx - gx) * 180) / Math.PI;

  // ---------- THE BREAK ----------
  const redPanel = lf >= 86 ? 0.5 + 0.5 * Math.sin((lf - 86) * 0.9) : 0;
  const flagOn = ramp(lf, 95, 98);
  const bellRot = lf >= 100 ? Math.sin((lf - 100) * 0.9) * 26 : 0;
  const beacon = ramp(lf, 100, 103);
  const beaconAng = -34 + (lf - 100) * 17;
  const alarmIn = lf >= 100 ? 4 : 0;

  // ---------- ROOKIE ON THE ON-CALL BENCH ----------
  const rise = ramp(lf, 103, 105);
  const redOnRookie = beacon * (0.4 + 0.6 * Math.max(0, Math.sin((lf - 101) * 0.5)));

  const motes = Array.from({ length: 34 }).map((_, i) => {
    const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2), r3 = seed(i * 2.3 + 11);
    const x = (r * W + lf * (0.3 + r2 * 0.7) + Math.sin(lf * 0.05 + i) * 9) % W;
    const y = 60 + ((r2 * (H - 140) + lf * (0.25 + r3 * 0.5)) % (H - 140));
    const inShaft = y > HZ && Math.abs(x - 460) < 120 + (y - HZ) * 1.05;
    return { x, y, s: 1.4 + r3 * 2.4, o: (inShaft ? 0.85 * door : 0.2) * (0.4 + r * 0.6) };
  });

  const tiles = [
    { n: "src/", x: 382, y: 438, w: 92, bad: 0 },
    { n: "api/", x: 480, y: 438, w: 72, bad: 0 },
    { n: "db/", x: 558, y: 438, w: 60, bad: 0 },
    { n: "tests/", x: 382, y: 476, w: 100, bad: 1 },
    { n: ".env", x: 488, y: 476, w: 70, bad: 0 },
  ];

  const slats = Array.from({ length: 8 }).map((_, i) => i);

  return (
    <Panel label="DAWN INSPECTION">
      <div style={{ position: "absolute", left: 14, top: 56, width: W, height: H, borderRadius: 14, overflow: "hidden", background: grad("#1b2128", "#0d1116"), fontFamily: inter.fontFamily }}>

        {/* ---- BACK WALL ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: HZ, background: grad("#2a323b", "#1a2027"), boxShadow: "inset 0 -30px 60px rgba(0,0,0,0.55)" }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={"wp" + i} style={{ position: "absolute", left: 0, top: 44 + i * 68, width: W, height: 1, background: "rgba(255,255,255,0.045)" }} />
        ))}

        {/* stencilled question: the only sentence in frame */}
        <div style={{ position: "absolute", left: 232, top: 64, width: 430, textAlign: "center", fontFamily: mono, fontSize: 21, letterSpacing: 3, color: "rgba(226,214,196,0.4)", textShadow: `0 0 18px rgba(255,180,90,${0.35 * door})` }}>
          DOES ANYTHING NEED ATTENTION?
        </div>

        {/* wall clock 6:00 (sub-legible texture) */}
        <div style={{ position: "absolute", left: 806, top: 126, width: 68, height: 68, borderRadius: 34, background: grad("#39424c", "#232a32"), border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 6px 14px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.07)" }}>
          <div style={{ position: "absolute", left: 32, top: 12, width: 3, height: 22, borderRadius: 2, background: "rgba(226,214,196,0.75)", transformOrigin: "50% 100%", transform: "rotate(0deg)" }} />
          <div style={{ position: "absolute", left: 32, top: 20, width: 3, height: 14, borderRadius: 2, background: "rgba(226,214,196,0.6)", transformOrigin: "50% 100%", transform: "rotate(180deg)" }} />
          <div style={{ position: "absolute", left: 32.5, top: 8, width: 2, height: 26, background: RED, opacity: 0.65, transformOrigin: "50% 100%", transform: `rotate(${Math.floor(lf * 0.5) * 12}deg)` }} />
          <div style={{ position: "absolute", left: 30, top: 30, width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.35)" }} />
        </div>

        {/* pegboard + torque wrench */}
        <div style={{ position: "absolute", left: 672, top: 210, width: 116, height: 108, borderRadius: 6, background: grad("#3a3128", "#26201a"), border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 18px rgba(0,0,0,0.45)" }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={"pg" + i} style={{ position: "absolute", left: 10 + (i % 6) * 18, top: 10 + Math.floor(i / 6) * 22, width: 4, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.45)" }} />
          ))}
          <svg width="116" height="108" style={{ position: "absolute", left: 0, top: 0 }}>
            <g transform="translate(24,20) rotate(24)">
              <rect x="0" y="10" width="62" height="7" rx="3.5" fill="#9aa4ad" />
              <circle cx="2" cy="13.5" r="9" fill="none" stroke="#9aa4ad" strokeWidth="5" />
              <rect x="52" y="6" width="16" height="15" rx="3" fill="#7d868f" />
            </g>
          </svg>
        </div>

        {/* ---- DOOR OPENING + DAWN SKY ---- */}
        <div style={{ position: "absolute", left: 250, top: 118, width: 390, height: HZ - 118, background: "linear-gradient(180deg,#2a1c22 0%, #6b3a2c 46%, #d0762f 78%, #f0a94a 100%)", borderRadius: "4px 4px 0 0", boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 120, top: 150, width: 150, height: 150, borderRadius: 75, background: "radial-gradient(circle, rgba(255,214,140,0.95), rgba(255,160,60,0) 70%)", opacity: 0.9 * door }} />
          {/* depot yard silhouette */}
          <div style={{ position: "absolute", left: 0, bottom: 0, width: 390, height: 34, background: "#1a1216" }} />
        </div>
        {/* door frame */}
        <div style={{ position: "absolute", left: 242, top: 110, width: 406, height: HZ - 110, border: "8px solid #39424c", borderBottom: "none", borderRadius: "6px 6px 0 0", boxShadow: "0 10px 26px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.06)" }} />
        {/* slats (roll up / down) */}
        <div style={{ position: "absolute", left: 250, top: 118, width: 390, height: HZ - 118, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: HZ - 118, transform: `translateY(${-(HZ - 118) * door - Math.sin(lf * 2.4) * 1.4 * (door > 0.02 && door < 0.98 ? 1 : 0)}px)` }}>
            {slats.map((i) => (
              <div key={"sl" + i} style={{ position: "absolute", left: 0, top: i * 34, width: 390, height: 32, background: grad("#5a636d", "#3a424b"), borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(0,0,0,0.5)" }} />
            ))}
          </div>
        </div>

        {/* ---- FLOOR ---- */}
        <div style={{ position: "absolute", left: 0, top: HZ, width: W, height: H - HZ, background: "linear-gradient(180deg,#252b33 0%, #171c22 60%, #10141a 100%)" }} />
        <svg width={W} height={H - HZ} style={{ position: "absolute", left: 0, top: HZ }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"fl" + i} x1={cx} y1={0} x2={-500 + i * 250} y2={H - HZ} stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          ))}
          <line x1="0" y1="120" x2={W} y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
          <line x1="0" y1="250" x2={W} y2="250" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5" />
          {/* painted bay lines + bay numeral */}
          <path d="M 250 40 L 130 332 L 176 332 L 286 40 Z" fill="rgba(230,180,60,0.16)" />
          <path d="M 792 40 L 900 332 L 856 332 L 754 40 Z" fill="rgba(230,180,60,0.16)" />
          <text x="70" y="300" fontFamily={mono} fontSize="82" fill="rgba(230,180,60,0.13)" fontWeight="700">3</text>
        </svg>

        {/* ---- DAWN SHAFT rakes across the floor ---- */}
        <div style={{ position: "absolute", left: 0, top: HZ - 4, width: W, height: shaftH + 6, clipPath: `polygon(256px 0px, 636px 0px, ${636 + shaftH * 1.0}px ${shaftH}px, ${256 - shaftH * 1.0}px ${shaftH}px)`, background: "linear-gradient(180deg, rgba(255,196,116,0.5), rgba(255,150,60,0.04))", opacity: 0.95 * door, filter: "blur(1.5px)" }} />
        {/* volumetric column through the air */}
        <div style={{ position: "absolute", left: 250, top: 130, width: 390, height: 260, background: "linear-gradient(180deg, rgba(255,190,110,0.22), rgba(255,190,110,0.02))", filter: "blur(6px)", opacity: 0.8 * door }} />

        {/* ---- COOL OVERHEAD LAMPS (dimmed animated layer) ---- */}
        {[300, 720].map((lx, i) => {
          const fl = 0.72 + 0.28 * Math.abs(Math.sin(lf * 0.09 + i * 2));
          return (
            <div key={"lamp" + i}>
              <div style={{ position: "absolute", left: lx - 34, top: 76, width: 68, height: 12, borderRadius: 4, background: grad("#cfe6f2", "#7f97a6"), boxShadow: `0 0 22px rgba(180,220,255,${0.5 * fl})` }} />
              <div style={{ position: "absolute", left: lx - 110, top: 88, width: 220, height: 300, background: "linear-gradient(180deg, rgba(170,210,240,0.13), rgba(170,210,240,0))", clipPath: "polygon(96px 0px, 124px 0px, 220px 300px, 0px 300px)", opacity: fl }} />
            </div>
          );
        })}

        {/* ---- ON CALL BENCH + SLEEPING ROOKIE (expensive model, unspent) ---- */}
        <div style={{ position: "absolute", left: 792, top: 636, width: 186, height: 26, borderRadius: 13, background: "rgba(0,0,0,0.5)", filter: "blur(7px)", transform: `scaleX(${1 + rise * 0.35})` }} />
        <div style={{ position: "absolute", left: 800, top: 600, width: 170, height: 16, borderRadius: 4, background: grad("#6b5643", "#3e3225"), boxShadow: "0 8px 16px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", left: 812, top: 616, width: 12, height: 40, background: grad("#4b3d2e", "#2b241b") }} />
        <div style={{ position: "absolute", left: 946, top: 616, width: 12, height: 40, background: grad("#4b3d2e", "#2b241b") }} />
        <div style={{ position: "absolute", left: 800, top: 578, width: 170, textAlign: "center", fontFamily: mono, fontSize: 12, letterSpacing: 3, color: "rgba(230,180,60,0.55)" }}>ON CALL</div>
        <div style={{ position: "absolute", left: 858, top: 600 - rise * 16, transform: "translate(-50%,-100%)", zIndex: 5 }}>
          <div style={{ position: "relative", width: 128, height: 128 }}>
            <div style={{ position: "absolute", inset: 0, transform: `rotate(${(1 - rise) * 9}deg)`, transformOrigin: "50% 100%" }}>
              <Mascot lf={lf} size={128} gaze={-1} nodAmp={1.2} nodSpeed={1.4} />
            </div>
            {/* hard hat tipped over the eyes, tips back on rise */}
            <div style={{ position: "absolute", left: 26, top: 4 - rise * 10, width: 74, height: 34, borderRadius: "34px 34px 8px 8px", background: grad("#f2c14e", "#c58f18"), border: "2px solid rgba(0,0,0,0.28)", boxShadow: "0 4px 10px rgba(0,0,0,0.45), inset 0 3px 6px rgba(255,255,255,0.4)", transform: `rotate(${-16 + rise * 34}deg)`, transformOrigin: "20% 90%" }} />
            {/* L-plate on the chest */}
            <div style={{ position: "absolute", left: 46, top: 74, width: 26, height: 26, borderRadius: 4, background: PAPER, border: `2px solid ${RED}`, color: RED, fontFamily: fraunces.fontFamily, fontSize: 17, fontWeight: 700, lineHeight: "22px", textAlign: "center", boxShadow: "0 3px 7px rgba(0,0,0,0.4)" }}>L</div>
            {/* zzz while asleep */}
            {Array.from({ length: 3 }).map((_, i) => {
              const t = (lf * 0.9 + i * 14) % 42;
              return (
                <div key={"z" + i} style={{ position: "absolute", left: 96 + t * 0.5, top: 16 - t * 0.7, fontFamily: fraunces.fontFamily, fontSize: 12 + i * 3, color: "rgba(226,214,196,0.5)", opacity: (1 - rise) * Math.max(0, 1 - t / 42) }}>z</div>
              );
            })}
            {/* red beacon rim-light lands on him */}
            <div style={{ position: "absolute", inset: -6, borderRadius: 20, background: "radial-gradient(circle at 30% 40%, rgba(224,74,58,0.55), rgba(224,74,58,0) 68%)", opacity: redOnRookie, mixBlendMode: "screen" }} />
          </div>
        </div>

        {/* ---- INSPECTOR (behind the ramp) ---- */}
        {/* ---- INSPECTION RAMP OVER A PIT ---- */}
        <div style={{ position: "absolute", left: 296, top: 560, width: 448, height: 70, background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.85), rgba(0,0,0,0.1) 72%)", filter: "blur(4px)", zIndex: 6 }} />
        <div style={{ position: "absolute", left: 300, top: 528, width: 440, height: 44, zIndex: 7, clipPath: "polygon(52px 0px, 388px 0px, 440px 44px, 0px 44px)", background: grad("#69737e", "#39424c"), boxShadow: "0 14px 26px rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", left: 300, top: 566, width: 440, height: 8, zIndex: 7, background: "repeating-linear-gradient(90deg, rgba(230,180,60,0.8) 0px, rgba(230,180,60,0.8) 14px, rgba(20,20,20,0.8) 14px, rgba(20,20,20,0.8) 28px)", opacity: 0.55 }} />
        <div style={{ position: "absolute", left: 300, top: 574, width: 440, height: 26, zIndex: 7, clipPath: "polygon(0px 0px, 440px 0px, 400px 26px, 40px 26px)", background: "linear-gradient(180deg,#0a0d11,#04060a)" }} />

        {/* ---- THE PROJECT: hatchback whose body panels are repo folders ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 7, pointerEvents: "none" }}>
          {/* greenhouse */}
          <div style={{ position: "absolute", left: 424, top: 396, width: 190, height: 40, borderRadius: "18px 22px 0 0", background: grad("#4d5763", "#2c333c"), border: "1px solid rgba(255,255,255,0.14)", boxShadow: "inset 0 3px 8px rgba(255,255,255,0.15)" }}>
            <div style={{ position: "absolute", left: 10, top: 8, width: 78, height: 26, borderRadius: "10px 4px 0 0", background: "linear-gradient(180deg, rgba(180,220,255,0.4), rgba(120,160,200,0.15))" }} />
            <div style={{ position: "absolute", left: 96, top: 8, width: 82, height: 26, borderRadius: "4px 10px 0 0", background: "linear-gradient(180deg, rgba(180,220,255,0.4), rgba(120,160,200,0.15))" }} />
          </div>
          {/* aerial */}
          <div style={{ position: "absolute", left: 664, top: 386, width: 3, height: 48, background: grad("#aab3bc", "#5c656f"), transform: "rotate(6deg)", transformOrigin: "50% 100%" }} />
          {/* body */}
          <div style={{ position: "absolute", left: 368, top: 430, width: 312, height: 96, borderRadius: 16, background: grad("#3d4652", "#232a33"), border: "1px solid rgba(255,255,255,0.12)", boxShadow: `0 18px 30px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.14), 0 0 ${26 * door}px rgba(255,180,90,${0.35 * door})` }} />
          {/* warm rake on the body */}
          <div style={{ position: "absolute", left: 368, top: 430, width: 312, height: 96, borderRadius: 16, background: "linear-gradient(115deg, rgba(255,190,110,0.32), rgba(255,190,110,0) 58%)", opacity: door }} />
          {/* repo folder tiles */}
          {tiles.map((t, i) => {
            const bad = t.bad ? redPanel : 0;
            return (
              <div key={"t" + i} style={{ position: "absolute", left: t.x, top: t.y, width: t.w, height: 34, borderRadius: 6, background: t.bad && lf >= 86 ? `linear-gradient(180deg, rgba(224,74,58,${0.25 + 0.4 * bad}), rgba(90,26,22,0.9))` : grad("#525d6a", "#333c46"), border: `1px solid ${t.bad && lf >= 86 ? `rgba(224,74,58,${0.5 + 0.5 * bad})` : "rgba(255,255,255,0.14)"}`, boxShadow: t.bad && lf >= 86 ? `0 0 ${10 + 16 * bad}px rgba(224,74,58,${0.5 + 0.4 * bad}), inset 0 1px 0 rgba(255,255,255,0.12)` : "0 3px 7px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                <div style={{ position: "absolute", left: 0, top: -5, width: 24, height: 6, borderRadius: "3px 3px 0 0", background: "rgba(255,255,255,0.14)" }} />
                <div style={{ position: "absolute", left: 7, top: 9, fontFamily: mono, fontSize: 13, color: "rgba(232,224,210,0.9)", letterSpacing: 0.4 }}>{t.n}</div>
                {t.bad && lf >= 86 ? (
                  <div style={{ position: "absolute", right: 6, top: 8, width: 16, height: 16, borderRadius: 8, background: RED, color: PAPER, fontSize: 11, fontWeight: 700, textAlign: "center", lineHeight: "16px", opacity: 0.6 + 0.4 * bad }}>×</div>
                ) : (
                  <div style={{ position: "absolute", right: 6, top: 8, width: 16, height: 16, borderRadius: 8, background: "rgba(58,150,96,0.9)", color: PAPER, fontSize: 10, fontWeight: 700, textAlign: "center", lineHeight: "16px" }}>✓</div>
                )}
                {t.bad && lf >= 86 ? (
                  <div style={{ position: "absolute", left: 4, bottom: 3, width: t.w - 8, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.5)", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: `${40 + 55 * ((lf * 3) % 20) / 20}%`, height: 4, background: RED, boxShadow: `0 0 8px ${RED}` }} />
                  </div>
                ) : null}
              </div>
            );
          })}
          {/* wheels */}
          {[420, 630].map((wx, i) => (
            <div key={"wh" + i} style={{ position: "absolute", left: wx - 27, top: 500, width: 54, height: 54, borderRadius: 27, background: grad("#2b3138", "#101418"), border: "3px solid #171c22", boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.14)", transform: i === 0 ? `translateX(${kick * 4}px)` : "none" }}>
              <div style={{ position: "absolute", left: 15, top: 15, width: 24, height: 24, borderRadius: 12, background: grad("#8e98a2", "#4d565f") }} />
            </div>
          ))}
          {/* red flag clipped to the aerial when something needs attention */}
          <div style={{ position: "absolute", left: 668, top: 384, width: 4, height: 4, opacity: flagOn }}>
            <div style={{ position: "absolute", left: 2, top: -4, width: 56 * flagOn, height: 30, background: `linear-gradient(120deg, ${RED}, #8f2118)`, clipPath: `polygon(0px 0px, 100% ${6 + Math.sin(lf * 0.5) * 4}px, 100% ${24 + Math.sin(lf * 0.5 + 1) * 4}px, 0px 30px)`, borderRadius: 2, boxShadow: `0 0 14px rgba(224,74,58,0.6)`, transform: `rotate(${Math.sin(lf * 0.42) * 6}deg)`, transformOrigin: "0% 50%" }} />
          </div>
        </div>

        {/* ---- ALARM PILLAR: bell + beacon + mushroom button ---- */}
        <div style={{ position: "absolute", left: 54, top: 96, width: 72, height: 320, zIndex: 9, background: grad("#4a535d", "#262d35"), borderRadius: 4, boxShadow: "18px 0 34px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
        {/* beacon */}
        <div style={{ position: "absolute", left: 68, top: 74, width: 44, height: 26, zIndex: 10, borderRadius: "12px 12px 3px 3px", background: beacon > 0.05 ? `linear-gradient(180deg, ${RED}, #7d1c15)` : grad("#6a3a36", "#3a201d"), border: "1px solid rgba(0,0,0,0.4)", boxShadow: `0 0 ${26 * beacon}px rgba(224,74,58,${0.9 * beacon})` }} />
        <div style={{ position: "absolute", left: 90, top: 92, width: 620, height: 120, zIndex: 10, transformOrigin: "0% 50%", transform: `translateY(-60px) rotate(${beaconAng}deg)`, background: "linear-gradient(90deg, rgba(224,74,58,0.5), rgba(224,74,58,0))", clipPath: "polygon(0px 56px, 620px 0px, 620px 120px)", opacity: beacon * 0.85, filter: "blur(3px)", mixBlendMode: "screen" }} />
        {/* bell */}
        <div style={{ position: "absolute", left: 76, top: 132, width: 30, height: 30, zIndex: 10, transformOrigin: "50% 0%", transform: `rotate(${bellRot}deg)` }}>
          <div style={{ width: 30, height: 24, borderRadius: "15px 15px 5px 5px", background: grad("#d8a63a", "#8a6314"), border: "1px solid rgba(0,0,0,0.35)", boxShadow: "0 4px 9px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.4)" }} />
          <div style={{ position: "absolute", left: 12, top: 23, width: 6, height: 8, borderRadius: 3, background: "#5d420c" }} />
        </div>
        {/* mushroom alarm button */}
        <div style={{ position: "absolute", left: 62, top: 452 + alarmIn, width: 56, height: 34, zIndex: 10, borderRadius: "18px 18px 6px 6px", background: `linear-gradient(180deg, ${lf >= 99 ? "#ff6b5a" : "#c0392b"}, #6f1b13)`, border: "2px solid rgba(0,0,0,0.4)", boxShadow: `0 6px 12px rgba(0,0,0,0.5), inset 0 3px 7px rgba(255,255,255,0.35), 0 0 ${22 * beacon}px rgba(224,74,58,0.8)` }} />
        <div style={{ position: "absolute", left: 56, top: 484, width: 68, height: 10, zIndex: 10, borderRadius: 3, background: grad("#f2c14e", "#a07e14") }} />

        {/* ---- THE CHEAP INSPECTOR ---- */}
        {/* cast shadow, stretched by the low dawn shaft */}
        <div style={{ position: "absolute", left: gx, top: gy - 4, width: 62 * isc, height: 16 * isc, transform: `translate(-50%,-50%) scaleX(${1 + 1.5 * door}) translateX(${18 * door}px)`, borderRadius: 30, background: "rgba(0,0,0,0.55)", filter: "blur(5px)", zIndex: depth < 0.5 ? 6 : 8 }} />
        <div style={{ position: "absolute", left: gx, top: iy - bob, transform: `translate(-50%,-100%) scale(${isc})`, transformOrigin: "50% 100%", zIndex: depth < 0.5 ? 6 : 9 }}>
          <div style={{ position: "relative", width: 58, height: 58 }}>
            {/* wind-up brass key on his back, slowing every lap */}
            <div style={{ position: "absolute", left: facing > 0 ? -12 : 52, top: 26, width: 18, height: 18, transform: `rotate(${keyRot}deg)`, transformOrigin: "50% 50%" }}>
              <div style={{ position: "absolute", left: 7, top: 0, width: 4, height: 18, borderRadius: 2, background: grad("#e0b64a", "#8a6314") }} />
              <div style={{ position: "absolute", left: 0, top: 7, width: 18, height: 4, borderRadius: 2, background: grad("#e0b64a", "#8a6314") }} />
              <div style={{ position: "absolute", left: 5, top: 5, width: 8, height: 8, borderRadius: 4, background: "#c99b2e", border: "1px solid rgba(0,0,0,0.35)" }} />
            </div>
            {/* tin body */}
            <div style={{ position: "absolute", inset: 0, filter: "grayscale(0.82) brightness(1.12) contrast(1.06)" }}>
              <Mascot lf={lf} size={58} gaze={facing} nodAmp={2.4} nodSpeed={7} shock={shockV} />
            </div>
            {/* hi-vis plastic vest */}
            <div style={{ position: "absolute", left: 13, top: 30, width: 32, height: 22, borderRadius: 4, background: grad("#e9f04a", "#a8b012"), border: "1px solid rgba(0,0,0,0.3)", boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }}>
              <div style={{ position: "absolute", left: 0, top: 7, width: 32, height: 4, background: "rgba(230,232,236,0.85)" }} />
              <div style={{ position: "absolute", left: 14, top: 0, width: 4, height: 22, background: "rgba(230,232,236,0.7)" }} />
            </div>
            {/* mini clipboard he never writes on */}
            <div style={{ position: "absolute", left: facing > 0 ? 44 : 0, top: 34, width: 13, height: 17, borderRadius: 2, background: grad("#d9cbb2", "#9c8d72"), border: "1px solid rgba(0,0,0,0.35)", transform: "rotate(-14deg)" }} />
            {/* torch + beam (his instrument: light, never a grade) */}
            <div style={{ position: "absolute", left: facing > 0 ? 46 : 4, top: 26, width: 10, height: 6, borderRadius: 2, background: grad("#cfd6dd", "#6d757e") }} />
            <div style={{ position: "absolute", left: facing > 0 ? 54 : 8, top: 29, width: 150, height: 78, transformOrigin: "0% 50%", transform: `translateY(-39px) rotate(${beamRot}deg)`, background: "linear-gradient(90deg, rgba(255,232,170,0.5), rgba(255,232,170,0))", clipPath: "polygon(0px 34px, 150px 0px, 150px 78px)", opacity: 0.5 + 0.5 * door, filter: "blur(2px)", mixBlendMode: "screen" }} />
            {/* yawn */}
            <div style={{ position: "absolute", left: 24, top: 20, width: 11, height: 9 * yawn + 1, borderRadius: 6, background: "rgba(20,14,12,0.8)", opacity: yawn }} />
            {/* oversized peaked cap, slides over his eyes on the double-take */}
            <div style={{ position: "absolute", left: 6, top: -8 + capSlide, width: 46, height: 20, transform: `rotate(${Math.sin(lf * 0.62) * (walking ? 5 : 1)}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", left: 4, top: 0, width: 38, height: 15, borderRadius: "13px 13px 3px 3px", background: grad("#3f4a57", "#1f262e"), border: "1px solid rgba(0,0,0,0.4)", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2)" }} />
              <div style={{ position: "absolute", left: 0, top: 12, width: 46, height: 6, borderRadius: 3, background: grad("#2c343d", "#12171c"), boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", left: 20, top: 2, width: 7, height: 7, borderRadius: 4, background: GOLD }} />
            </div>
          </div>
        </div>

        {/* ---- DUST MOTES (drifting every single frame) ---- */}
        {motes.map((m, i) => (
          <div key={"m" + i} style={{ position: "absolute", left: m.x, top: m.y, width: m.s, height: m.s, borderRadius: m.s, background: "rgba(255,226,178,0.95)", opacity: m.o, zIndex: 11, filter: "blur(0.4px)" }} />
        ))}

        {/* ---- ROOM-WIDE RED STATE (cycle 3 only) ---- */}
        <div style={{ position: "absolute", inset: 0, zIndex: 12, background: "radial-gradient(ellipse at 9% 34%, rgba(224,74,58,0.32), rgba(224,74,58,0) 62%)", opacity: beacon * (0.55 + 0.45 * Math.abs(Math.sin((lf - 100) * 0.5))), pointerEvents: "none" }} />
        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 13, boxShadow: "inset 0 0 120px rgba(0,0,0,0.7)", pointerEvents: "none" }} />
      </div>
    </Panel>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const f = lf;
  const L = (a: number, b: number, t: number) => a + (b - a) * t;

  /* ---------------- rail: TOP-TO-BOTTOM SWITCHBACK ---------------- */
  const PTS: number[][] = [[-80, 72], [940, 72], [940, 340], [70, 340], [70, 560], [1090, 560]];
  const LENS: number[] = [];
  for (let i = 0; i < PTS.length - 1; i++) LENS.push(Math.hypot(PTS[i + 1][0] - PTS[i][0], PTS[i + 1][1] - PTS[i][1]));
  const TOTAL = LENS.reduce((a, b) => a + b, 0);
  const pathAt = (d: number) => {
    let r = Math.max(0, Math.min(TOTAL - 0.01, d));
    for (let i = 0; i < LENS.length; i++) {
      if (r <= LENS[i]) {
        const t = r / LENS[i];
        return { x: PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * t, y: PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * t };
      }
      r -= LENS[i];
    }
    return { x: PTS[5][0], y: PTS[5][1] };
  };
  const D_DESK = 280, D_CURT = 1723, D_BOOTH = 2998;

  /* ---------------- ticket timing ---------------- */
  const WS = { x: 285, y: 200 };            // writing spot (desk)
  const TRAY = { x: 520, y: 240 };          // blank-carbon tray

  const clip1 = ramp(f, 105, 118);
  const d1 = interpolate(f, [0, 118, 152, 168, 192], [D_DESK, D_DESK, D_CURT, D_CURT + 95, D_BOOTH], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p1 = pathAt(d1);
  const held1 = ramp(f, 186, 198); // taken off the hook by the inspector
  const insX = 760 + Math.sin(f * 0.12) * 5;
  const insY = 600 + Math.sin(f * 0.19) * 3;
  const t1x = L(L(WS.x, p1.x, clip1), insX, held1);
  const t1y = L(L(WS.y, p1.y + 40, clip1), insY, held1);
  const t1s = L(L(1, 0.42, clip1), 0.5, held1);
  const t1r = L(L(-2, Math.sin(f * 0.22) * 5, clip1), -8 + Math.sin(f * 0.14) * 4, held1);

  const clip2 = ramp(f, 200, 212);
  const in2 = ramp(f, 60, 72);
  const slide2 = ramp(f, 112, 126);
  const d2 = interpolate(f, [212, 248, 262], [D_DESK, D_CURT, D_CURT + 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2 = pathAt(d2);
  const t2bx = L(TRAY.x, WS.x, slide2), t2by = L(TRAY.y - (1 - in2) * 46, WS.y, slide2);
  const t2x = L(t2bx, p2.x, clip2);
  const t2y = L(t2by, p2.y + 40, clip2);
  const t2s = L(L(0.42, 1, slide2), 0.42, clip2);
  const t2r = L(L(4, -2, slide2), Math.sin(f * 0.22 + 1) * 5, clip2);

  const in3 = ramp(f, 224, 236);
  const slide3 = ramp(f, 236, 250);
  const t3x = L(TRAY.x, WS.x, slide3);
  const t3y = L(TRAY.y - (1 - in3) * 46, WS.y, slide3);
  const t3s = L(0.42, 1, slide3);

  const w1 = ramp(f, 40, 100);
  const w2 = ramp(f, 128, 198);
  const w3 = ramp(f, 248, 316);

  /* ---------------- wrench that will not take the hint ---------------- */
  const wrX = interpolate(
    f,
    [0, 18, 32, 42, 58, 88, 100, 112, 128, 244, 255],
    [720, 720, 210, 210, 700, 700, 205, 205, 706, 706, 470],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const pushing = (f >= 30 && f <= 44) || (f >= 98 && f <= 114);
  const writing = (f >= 40 && f <= 100) || (f >= 128 && f <= 198) || f >= 248;

  /* ---------------- flash / booth ---------------- */
  const flash = interpolate(f, [160, 166, 169, 178], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blind = ramp(f, 172, 190);
  const mono = ramp(f, 196, 206);
  const eye = f > 204 ? Math.sin((f - 204) * 0.34) * 0.85 : 0;
  const recharge = ramp(f, 230, 306);
  const whine = f >= 230 ? 0.25 + Math.abs(Math.sin(f * 0.5)) * 0.35 : 0;

  const burst = Math.max(
    f >= 143 && f <= 178 ? interpolate(f, [143, 150, 178], [0, 1, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0,
    f >= 246 ? ramp(f, 246, 252) : 0
  );
  const sparkOn = 0.45 + burst * 0.55 + Math.abs(Math.sin(f * 0.9)) * 0.15;
  const partOn = ramp(f, 166, 176);

  const FIELDS: string[][] = [
    ['CHANGE:', 'fixed 3s wait -> exponential backoff'],
    ['FILE:', 'api/client.ts, line 42'],
    ['DO NOT TOUCH:', 'auth/'],
    ['DONE WHEN:', '3 retries, then fail loud'],
  ];

  const shade = (c: string) => ({
    background: grad(c, INK),
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 10px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14)',
  });

  const renderTicket = (x: number, y: number, s: number, r: number, wp: number, no: string, o: number) => (
    <div style={{ position: 'absolute', left: x, top: y, width: 300, height: 124, marginLeft: -150, marginTop: -62, transform: `scale(${s}) rotate(${r}deg)`, opacity: o }}>
      <div style={{ position: 'absolute', left: 7, top: 8, width: 300, height: 124, borderRadius: 5, background: '#e8a9bd', opacity: 0.75, boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', left: 3, top: 4, width: 300, height: 124, borderRadius: 5, background: '#f3d98a', opacity: 0.85 }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 5, background: PAPER, border: `1px solid ${MUTE}`, boxShadow: '0 12px 24px rgba(0,0,0,0.5)', padding: '7px 10px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${MUTE}`, paddingBottom: 4 }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontSize: 13, letterSpacing: 1.6, color: INK, fontWeight: 700 }}>WORK ORDER</div>
          <div style={{ fontFamily: mono, fontSize: 9, color: CLAY }}>{no}</div>
        </div>
        {FIELDS.map((fd, i) => {
          const lp = Math.max(0, Math.min(1, wp * 4 - i));
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 5, height: 13 }}>
              <div style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: 0.6, color: MUTE, width: 74, flexShrink: 0 }}>{fd[0]}</div>
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: `${lp * 100}%`, borderBottom: `1px dotted ${MUTE}` }}>
                <div style={{ fontFamily: mono, fontSize: 9.5, color: INK, whiteSpace: 'nowrap', transform: `translateY(${lp > 0 && lp < 1 ? Math.sin(f * 1.7) * 0.7 : 0}px)` }}>{fd[1]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const penLine = Math.min(3, Math.floor((writing ? (f < 110 ? w1 : f < 210 ? w2 : w3) : 0) * 4));
  const penFrac = ((writing ? (f < 110 ? w1 : f < 210 ? w2 : w3) : 0) * 4) % 1;
  const penX = 220 + penFrac * 180 + Math.sin(f * 2.1) * 2;
  const penY = 168 + penLine * 18 + Math.sin(f * 3.3) * 1.4;

  return (
    <Panel label="THE HANDOFF">
      <div style={{ position: 'absolute', left: 0, right: 0, top: 56, height: 736, overflow: 'hidden', background: grad(SLATE, INK) }}>

        {/* ---- back wall + vanishing atmosphere ---- */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 42% at 50% 40%, rgba(255,255,255,0.07), rgba(0,0,0,0) 70%)' }} />

        {/* dim numbered bays receding on the back wall */}
        {Array.from({ length: 6 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const sc = 1 - i * 0.13;
          const bx = 34 + i * 62;
          const by = 372 + i * 9;
          const blink = 0.18 + Math.abs(Math.sin(f * 0.06 + r * 6)) * 0.3;
          return (
            <div key={'bay' + i} style={{ position: 'absolute', left: bx, top: by, width: 56 * sc, height: 74 * sc, borderRadius: 4, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', opacity: 0.55 - i * 0.05 }}>
              <div style={{ position: 'absolute', left: 4, top: 3, fontFamily: mono, fontSize: 7 * sc, color: MUTE, opacity: 0.7 }}>{'0' + (i + 2)}</div>
              <div style={{ position: 'absolute', right: 5, bottom: 5, width: 5 * sc, height: 5 * sc, borderRadius: 5, background: i % 2 ? GREEN : AMBER, opacity: blink }} />
            </div>
          );
        })}

        {/* rotating IN SESSION bulb sweeping the wall */}
        <div style={{ position: 'absolute', left: 700, top: 300, width: 290, height: 162, overflow: 'hidden', opacity: 0.5 }}>
          <div style={{ position: 'absolute', left: 30, top: 40, width: 300, height: 70, transformOrigin: '20% 50%', transform: `rotate(${(f * 2.6) % 360}deg)`, background: `linear-gradient(90deg, rgba(0,0,0,0), ${AMBER}, rgba(0,0,0,0))`, opacity: 0.32, filter: 'blur(8px)' }} />
        </div>

        {/* perspective floor */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 470, bottom: 0, background: grad(INK, SLATE), borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        {Array.from({ length: 9 }).map((_, i) => {
          const x0 = -260 + i * 200;
          const dx = 506 - x0, dy = 470 - 736;
          const len = Math.hypot(dx, dy);
          const ang = Math.atan2(dy, dx) * 180 / Math.PI;
          return <div key={'fl' + i} style={{ position: 'absolute', left: x0, top: 736, width: len, height: 1, background: 'rgba(255,255,255,0.09)', transformOrigin: '0 50%', transform: `rotate(${ang}deg)` }} />;
        })}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={'fh' + i} style={{ position: 'absolute', left: 0, right: 0, top: 486 + i * i * 22 + i * 26, height: 1, background: 'rgba(255,255,255,0.05)' }} />
        ))}

        {/* haze drifting through the key light */}
        {Array.from({ length: 4 }).map((_, i) => {
          const r = seed(i * 5.3 + 2);
          const hx = ((f * (0.5 + r * 0.5) + r * 900) % 1200) - 100;
          return <div key={'hz' + i} style={{ position: 'absolute', left: hx, top: 120 + r * 380, width: 300 + r * 200, height: 90 + r * 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(26px)', opacity: 0.35 + Math.sin(f * 0.03 + i) * 0.12 }} />;
        })}

        {/* overhead work-light cone over the desk */}
        <div style={{ position: 'absolute', left: 20, top: 0, width: 640, height: 330, clipPath: 'polygon(45% 0%, 55% 0%, 96% 100%, 4% 100%)', background: `linear-gradient(180deg, ${AMBER}, rgba(0,0,0,0))`, opacity: 0.13 + Math.abs(Math.sin(f * 0.11)) * 0.04 }} />
        <div style={{ position: 'absolute', left: 300, top: -6, width: 84, height: 16, borderRadius: 6, ...shade(SLATE) }} />

        {/* ---- rail: steel bar + moving chain, 5 segments ---- */}
        {PTS.slice(0, -1).map((p, i) => {
          const q = PTS[i + 1];
          const horiz = p[1] === q[1];
          const x = Math.min(p[0], q[0]), y = Math.min(p[1], q[1]);
          const w = horiz ? Math.abs(q[0] - p[0]) : 8;
          const h = horiz ? 8 : Math.abs(q[1] - p[1]);
          const off = (f * 2.4) % 16;
          return (
            <div key={'rl' + i} style={{ position: 'absolute', left: x, top: y - (horiz ? 4 : 0), width: w, height: h, borderRadius: 4, background: 'linear-gradient(180deg,#8f97a3,#3b424c)', boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.35)' }}>
              <div style={{ position: 'absolute', inset: 1, borderRadius: 3, background: horiz
                ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0 4px, rgba(0,0,0,0.25) 4px 8px, rgba(255,255,255,0.10) 8px 16px)'
                : 'repeating-linear-gradient(180deg, rgba(255,255,255,0.28) 0 4px, rgba(0,0,0,0.25) 4px 8px, rgba(255,255,255,0.10) 8px 16px)',
                backgroundPosition: horiz ? `${off}px 0px` : `0px ${off}px`, opacity: 0.7 }} />
            </div>
          );
        })}

        {/* always-arriving empty hooks */}
        {Array.from({ length: 16 }).map((_, i) => {
          const r = seed(i * 3.7 + 1);
          const d = ((f * 2.4 + i * 212 + r * 40) % TOTAL);
          const pt = pathAt(d);
          return (
            <div key={'hk' + i} style={{ position: 'absolute', left: pt.x - 5, top: pt.y - 2, width: 10, height: 26, opacity: 0.85 }}>
              <div style={{ position: 'absolute', left: 3, top: 0, width: 4, height: 22, borderRadius: 2, background: 'linear-gradient(180deg,#c9d0da,#5b636f)' }} />
              <div style={{ position: 'absolute', left: 0, top: 18, width: 10, height: 9, borderRadius: '0 0 6px 6px', border: '2px solid #9aa3ae', borderTop: 'none' }} />
            </div>
          );
        })}

        {/* ---- STATION 1: manager's desk ---- */}
        <div style={{ position: 'absolute', left: 74, top: 316, width: 12, height: 156, background: 'linear-gradient(90deg,#2b3038,#4a515c)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', left: 606, top: 316, width: 12, height: 156, background: 'linear-gradient(90deg,#2b3038,#4a515c)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', left: 120, top: 470, width: 460, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', filter: 'blur(9px)' }} />
        <div style={{ position: 'absolute', left: 30, top: 132, width: 620, height: 136, borderRadius: '8px 8px 0 0', ...shade(CLAY) }} />
        <div style={{ position: 'absolute', left: 30, top: 268, width: 620, height: 48, borderRadius: '0 0 8px 8px', background: grad(INK, SLATE), borderTop: `1px solid ${GOLD}`, boxShadow: '0 14px 26px rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', left: 16, top: 15, fontFamily: mono, fontSize: 11, letterSpacing: 2.4, color: GOLD, opacity: 0.9 }}>NO TOOLS BEYOND THIS POINT</div>
        </div>

        {/* manager, hands behind back */}
        <div style={{ position: 'absolute', left: 44, top: 84 + Math.sin(f * 0.09) * 2 }}>
          <Mascot lf={f} size={96} gaze={writing ? 0.55 : 0.15} nodAmp={pushing ? 1 : 2.4} nodSpeed={0.9} stern suit />
        </div>
        {/* clip-on tie THWACK + badge */}
        <div style={{ position: 'absolute', left: 84, top: 148 + Math.max(0, 1 - ramp(f, 0, 7)) * -22, width: 14, height: 34, background: RED, clipPath: 'polygon(0% 0%, 100% 0%, 62% 100%, 38% 100%)', opacity: ramp(f, 0, 5), transform: `rotate(${8 + Math.sin(f * 0.1) * 3}deg)`, boxShadow: '0 3px 6px rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'absolute', left: 102, top: 150, width: 44, height: 15, borderRadius: 2, background: PAPER, border: `1px solid ${MUTE}`, opacity: ramp(f, 6, 12), transform: `rotate(-4deg) scale(${L(1.5, 1, ramp(f, 6, 14))})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 5.5, color: INK, letterSpacing: 0.3 }}>SHIFT MGR</div>
        </div>
        {/* pencil behind the ear */}
        <div style={{ position: 'absolute', left: 116, top: 104, width: 26, height: 4, borderRadius: 2, background: GOLD, transform: 'rotate(-24deg)' }} />

        {/* pushing nub */}
        <div style={{ position: 'absolute', left: 128, top: 236, width: pushing ? 78 : 20, height: 15, borderRadius: 8, background: grad(CLAY, INK), border: '1px solid rgba(255,255,255,0.12)', opacity: pushing ? 1 : 0.35, boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }} />
        {/* writing nub + pen */}
        {writing ? (
          <>
            <div style={{ position: 'absolute', left: 126, top: penY - 4, width: Math.max(20, penX - 132), height: 13, borderRadius: 7, background: grad(CLAY, INK), border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }} />
            <div style={{ position: 'absolute', left: penX, top: penY - 26, width: 5, height: 30, borderRadius: 2, background: 'linear-gradient(180deg,#20242b,#6c7480)', transform: 'rotate(18deg)', boxShadow: '0 3px 6px rgba(0,0,0,0.5)' }} />
          </>
        ) : null}

        {/* mug / stapler */}
        <div style={{ position: 'absolute', left: 600, top: 140, width: 38, height: 34, borderRadius: '4px 4px 8px 8px', ...shade(PAPER), display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 5, color: INK, opacity: 0.9, paddingBottom: 4, textAlign: 'center', lineHeight: 1.1 }}>WORLD&apos;S<br />OKAYEST</div>
        </div>
        <div style={{ position: 'absolute', left: 596, top: 146, width: 12, height: 16, borderRadius: 8, border: `3px solid ${PAPER}`, opacity: 0.9 }} />
        <div style={{ position: 'absolute', left: 512, top: 142, width: 66, height: 17, borderRadius: '8px 8px 3px 3px', background: grad(RED, INK), border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 5px 10px rgba(0,0,0,0.45)' }} />

        {/* blank-carbon tray */}
        <div style={{ position: 'absolute', left: 448, top: 214, width: 146, height: 56, borderRadius: 4, border: `1px dashed ${MUTE}`, background: 'rgba(255,255,255,0.03)' }} />

        {/* the wrench that keeps coming back */}
        <div style={{ position: 'absolute', left: wrX, top: 244, width: 122, height: 18, transform: `rotate(${Math.sin(f * 0.3) * 2}deg)` }}>
          <div style={{ position: 'absolute', left: 16, top: 5, width: 92, height: 8, borderRadius: 4, background: 'linear-gradient(180deg,#cfd6e0,#5d6570)', boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 22, height: 18, borderRadius: 5, border: '4px solid #b9c1cc', borderRightColor: 'transparent' }} />
          <div style={{ position: 'absolute', left: 100, top: 1, width: 20, height: 16, borderRadius: 5, border: '4px solid #b9c1cc', borderLeftColor: 'transparent' }} />
        </div>
        {/* NO-HANDS pictogram, flickers then dies */}
        <div style={{ position: 'absolute', left: 236, top: 276, width: 34, height: 34, borderRadius: 34, border: `3px solid ${RED}`, opacity: (ramp(f, 32, 36) - ramp(f, 46, 54)) * (0.55 + Math.abs(Math.sin(f * 1.3)) * 0.45), boxShadow: `0 0 14px ${RED}` }}>
          <div style={{ position: 'absolute', left: 8, top: 13, width: 18, height: 5, borderRadius: 3, background: MUTE }} />
          <div style={{ position: 'absolute', left: -2, top: 14, width: 38, height: 3, background: RED, transform: 'rotate(-45deg)' }} />
        </div>

        {/* ---- STATION 2: wrench bay ---- */}
        <div style={{ position: 'absolute', left: 330, top: 314, width: 374, height: 12, borderRadius: 3, ...shade(SLATE) }} />
        {/* mechanic silhouette behind the strips */}
        <div style={{ position: 'absolute', left: 470, top: 332, filter: 'brightness(0.14) saturate(0)' }}>
          <Mascot lf={f} size={92} gaze={0} nodAmp={4.5} nodSpeed={2.2} constr />
        </div>
        <div style={{ position: 'absolute', left: 476, top: 344, width: 80, height: 20, borderRadius: '5px 5px 12px 12px', background: '#0c0e12', opacity: 0.95, transform: `rotate(${Math.sin(f * 0.4) * 3}deg)` }} />
        {/* orange strobe behind the curtain */}
        <div style={{ position: 'absolute', left: 340, top: 322, width: 354, height: 160, background: `radial-gradient(60% 60% at 45% 45%, ${AMBER}, rgba(0,0,0,0))`, opacity: 0.35 * sparkOn, filter: 'blur(10px)' }} />
        {/* curtain strips */}
        {Array.from({ length: 11 }).map((_, i) => {
          const r = seed(i * 4.3 + 3);
          const swing = Math.sin(f * 0.11 + i * 0.6) * 3 + (burst > 0.2 ? Math.sin(f * 0.9 + i) * 3 * burst : 0);
          return (
            <div key={'cs' + i} style={{ position: 'absolute', left: 340 + i * 33, top: 322, width: 30, height: 160, borderRadius: '0 0 4px 4px', background: `linear-gradient(180deg, rgba(210,120,60,${0.30 + r * 0.16}), rgba(28,20,16,0.92))`, border: '1px solid rgba(255,255,255,0.06)', transformOrigin: '50% 0%', transform: `rotate(${swing}deg)`, opacity: 0.9 }} />
          );
        })}
        {/* sparks arcing to the floor, always looping */}
        {Array.from({ length: 20 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const r2 = seed(i * 5.9 + 11);
          const per = 22 + Math.floor(r * 20);
          const t = ((f + Math.floor(r2 * per * 4)) % per) / per;
          const x = 380 + r * 260 + (r2 - 0.5) * 150 * t;
          const y = 452 + t * 46 + t * t * 34;
          return <div key={'sp' + i} style={{ position: 'absolute', left: x, top: y, width: 3 + r2 * 3, height: 3 + r2 * 3, borderRadius: 4, background: t < 0.5 ? '#fff2cf' : AMBER, opacity: (1 - t) * sparkOn, boxShadow: `0 0 8px ${AMBER}` }} />;
        })}
        <div style={{ position: 'absolute', left: 360, top: 492, width: 330, height: 16, borderRadius: '50%', background: AMBER, filter: 'blur(12px)', opacity: 0.28 * sparkOn }} />

        {/* the finished part riding out */}
        <div style={{ position: 'absolute', left: (f < 190 ? pathAt(d1).x : 700) - 13, top: (f < 190 ? pathAt(d1).y + 66 : 588), width: 26, height: 26, opacity: partOn * (1 - ramp(f, 240, 255) * 0), transform: `rotate(${f * 3}deg)` }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: 'linear-gradient(180deg,#d6dde7,#616a76)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', left: 9, top: 9, width: 8, height: 8, borderRadius: 8, background: INK }} />
        </div>

        {/* ---- STATION 3: sealed FRESH EYES booth ---- */}
        <div style={{ position: 'absolute', left: 560, top: 724, width: 300, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', filter: 'blur(10px)' }} />
        <div style={{ position: 'absolute', left: 700, top: 430, transform: 'translateX(-50%)', fontFamily: fraunces.fontFamily, fontSize: 22, letterSpacing: 3.4, color: GOLD, fontWeight: 700, textShadow: '0 3px 10px rgba(0,0,0,0.6)' }}>FRESH EYES</div>
        <div style={{ position: 'absolute', left: 440, top: 460, width: 520, height: 268, borderRadius: 10, ...shade(SLATE), overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 8, borderRadius: 6, background: 'linear-gradient(180deg, rgba(180,210,230,0.10), rgba(0,0,0,0.35))', border: '1px solid rgba(180,220,255,0.18)' }} />
          <div style={{ position: 'absolute', left: -60, top: 0, width: 90, height: 340, background: 'rgba(255,255,255,0.10)', transform: `translateX(${(f * 3) % 660}px) rotate(14deg)`, filter: 'blur(6px)' }} />
          {/* neuralyzer boom + baton */}
          <div style={{ position: 'absolute', left: 26, top: 6, width: 96, height: 5, borderRadius: 3, background: 'linear-gradient(90deg,#8f97a3,#4a515c)', transform: 'rotate(14deg)', transformOrigin: '0 50%' }} />
          <div style={{ position: 'absolute', left: 112, top: 26, width: 46, height: 12, borderRadius: 6, background: 'linear-gradient(180deg,#e7ecf3,#79818d)', boxShadow: `0 0 ${8 + whine * 26}px rgba(255,255,255,${0.3 + whine * 0.5})` }} />
          <div style={{ position: 'absolute', left: 112, top: 42, width: 46, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 4, width: `${recharge * 100}%`, borderRadius: 2, background: GREEN }} />
          </div>
          {/* readout */}
          <div style={{ position: 'absolute', left: 20, bottom: 16, padding: '5px 10px', borderRadius: 4, background: 'rgba(0,0,0,0.55)', border: `1px solid ${TERM2}` }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.1, color: TERM }}>CONTEXT: EMPTY · 0 PRIOR MESSAGES{Math.floor(f / 8) % 2 ? '_' : ' '}</div>
          </div>
          {/* booth whiteout */}
          <div style={{ position: 'absolute', inset: 0, background: '#ffffff', opacity: flash }} />
        </div>
        {/* fresh inspector */}
        <div style={{ position: 'absolute', left: 492, top: 502 + Math.sin(f * 0.07) * 2 }}>
          {f >= 164 && f < 188
            ? <Mascot lf={f} size={96} gaze={0} nodAmp={5} nodSpeed={2.4} shock />
            : <Mascot lf={f} size={96} gaze={eye} nodAmp={1.4} nodSpeed={0.6} stern />}
        </div>
        {/* white inspection coat + parody badge */}
        <div style={{ position: 'absolute', left: 496, top: 560, width: 88, height: 42, borderRadius: '10px 10px 6px 6px', background: 'linear-gradient(180deg,#ffffff,#d9dee6)', border: '1px solid rgba(0,0,0,0.14)', boxShadow: '0 6px 14px rgba(0,0,0,0.4)', opacity: 0.95 }}>
          <div style={{ position: 'absolute', left: 34, top: 0, width: 20, height: 22, background: 'rgba(0,0,0,0.10)', clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
          <div style={{ position: 'absolute', left: 6, top: 26, fontFamily: mono, fontSize: 5.5, color: INK, letterSpacing: 0.4 }}>MICHÈLE&apos;S</div>
        </div>
        {/* blindfold falling away */}
        <div style={{ position: 'absolute', left: 500 - blind * 26, top: 540 + blind * 118, width: 80, height: 15, borderRadius: 4, background: '#15181d', border: '1px solid rgba(255,255,255,0.1)', transform: `rotate(${blind * 68}deg)`, opacity: 1 - ramp(f, 186, 196) * 0.35, boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }} />
        {/* flash star at the temple */}
        <div style={{ position: 'absolute', left: 566, top: 528, width: 22, height: 22, borderRadius: 22, background: '#fff', opacity: (1 - ramp(f, 168, 186)) * ramp(f, 164, 168), boxShadow: '0 0 22px #fff' }} />
        {/* monocle */}
        <div style={{ position: 'absolute', left: 546, top: 534 - (1 - mono) * 30, width: 28, height: 28, borderRadius: 28, border: `2px solid ${GOLD}`, background: 'rgba(200,230,255,0.14)', opacity: mono, boxShadow: `0 0 10px rgba(255,255,255,${0.15 + Math.abs(Math.sin(f * 0.22)) * 0.4})` }}>
          <div style={{ position: 'absolute', left: 4, top: 5, width: 9, height: 4, borderRadius: 3, background: '#fff', opacity: 0.4 + Math.abs(Math.sin(f * 0.22)) * 0.5, transform: 'rotate(-30deg)' }} />
        </div>
        {/* comparing nub reaching between part and ticket */}
        <div style={{ position: 'absolute', left: 582, top: 592, width: 110, height: 13, borderRadius: 7, background: grad(CLAY, INK), border: '1px solid rgba(255,255,255,0.12)', opacity: held1, transform: `rotate(${Math.sin(f * 0.2) * 4}deg)` }} />

        {/* ---- tickets ---- */}
        {renderTicket(t3x, t3y, t3s, -2, w3, '#1044', in3)}
        {renderTicket(t2x, t2y, t2s, t2r, w2, '#1043', in2 * (1 - ramp(f, 262, 268)))}
        {renderTicket(t1x, t1y, t1s, t1r, w1, '#1042', 1)}

        {/* curtain strips draw over travelling tickets */}
        {Array.from({ length: 11 }).map((_, i) => {
          const r = seed(i * 4.3 + 3);
          const swing = Math.sin(f * 0.11 + i * 0.6) * 3;
          return (
            <div key={'cf' + i} style={{ position: 'absolute', left: 340 + i * 33, top: 322, width: 30, height: 160, borderRadius: '0 0 4px 4px', background: `linear-gradient(180deg, rgba(200,110,55,${0.22 + r * 0.12}), rgba(24,17,14,0.7))`, border: '1px solid rgba(255,255,255,0.05)', transformOrigin: '50% 0%', transform: `rotate(${swing}deg)`, opacity: 0.55 }} />
          );
        })}

        {/* panel-wide flash bloom */}
        <div style={{ position: 'absolute', inset: 0, background: '#ffffff', opacity: flash * 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 60% at 50% 55%, rgba(0,0,0,0), rgba(0,0,0,0.55))', pointerEvents: 'none' }} />
      </div>
    </Panel>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const f = lf;
  const IMP = 2.67;
  const CYC = 26;

  // ---- press cycle (never rests: rise -> turret index -> slam) ----
  const hp = (((f - IMP) % CYC) + CYC) % CYC;
  const headDown =
    hp < 4
      ? interpolate(hp, [0, 4], [1, 0.24], { easing: Easing.out(Easing.cubic) })
      : hp < 18
      ? interpolate(hp, [4, 18], [0.24, 0], { easing: Easing.inOut(Easing.quad) })
      : interpolate(hp, [18, 26], [0, 1], { easing: Easing.in(Easing.cubic) });
  const headY = interpolate(headDown, [0, 1], [292, 470]);

  const kOf = (i: number) => [0, 4, 3, 2, 1][((i % 5) + 5) % 5];
  const isPass = (k: number) => k === 4 || k === 2;
  const prevIdx = Math.floor((f - IMP) / CYC);
  const angA = isPass(kOf(prevIdx)) ? 0 : 180;
  const angB = isPass(kOf(prevIdx + 1)) ? 0 : 180;
  const turret = interpolate(hp, [8, 26], [angA, angB], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }) + Math.sin(f * 0.6) * 1.2;
  const sinceImp = f - (IMP + prevIdx * CYC);
  const impPass = isPass(kOf(prevIdx));
  const impCol = impPass ? GREEN : RED;
  const shake = sinceImp < 9 ? Math.exp(-sinceImp * 0.42) * 4.4 * Math.sin(sinceImp * 2.5) : 0;

  // ---- camera push-in past the rookie onto the mechanism ----
  const push = over(f, 90, 16, Easing.inOut(Easing.quad));
  const cam = 1 + push * 0.17;

  // ---- jobs riding the rail (always at least two, never stops) ----
  const titles = ['fix retry backoff', 'patch stale cache', 'ship auth guard', 'rewrite parser', 'trim log noise'];
  const sheets = Array.from({ length: 5 }).map((_, k) => {
    const raw = f * 10.5 + k * 273 + 772;
    const lap = Math.floor(raw / 1365);
    const x = raw - lap * 1365 - 180;
    const stamped = x > 632;
    const age = (x - 632) / 10.5;
    const flinch = Math.abs(x - 626) < 16 && hp < 3.4 ? (1 - hp / 3.4) * 5 : 0;
    const t = Math.max(0, Math.min(1, (x - 782) / 250));
    return {
      k,
      x,
      y: 396 + flinch + 132 * t * t,
      rot: 36 * t + Math.sin(f * 0.3 + k) * 1.2,
      stamped,
      age,
      pass: isPass(k),
      title: titles[k],
      id: 147 + k + lap * 5,
    };
  });

  // ---- the crayon self-graded sheet: raised, flicked, binned ----
  const raise = over(f, 6, 14, Easing.out(Easing.cubic));
  const flick = over(f, 24, 16, Easing.in(Easing.quad));
  const csX = interpolate(raise, [0, 1], [404, 468]) - flick * 322;
  const csY = interpolate(raise, [0, 1], [504, 446]) + flick * flick * 196;
  const csRot = interpolate(raise, [0, 1], [-6, -2]) - flick * 384;
  const csO = 1 - over(f, 36, 5);
  const flipper = over(f, 22, 3) * 62 - over(f, 27, 7) * 62;
  const droop = over(f, 26, 11, Easing.out(Easing.cubic));
  const watch = over(f, 58, 8) * Math.sin((f - 58) * 0.42) * 9;
  const rejects = Math.max(1, Math.round(interpolate(f, [24, 104], [1, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  const dust = Array.from({ length: 16 }).map((_, i) => {
    const r = seed(i * 3.1 + 7);
    const r2 = seed(i * 5.7 + 2);
    return {
      x: 40 + r * 940,
      y: 120 + ((r2 * 620 + f * (0.5 + r * 1.1)) % 620),
      s: 1 + r2 * 2.2,
      o: 0.1 + r * 0.24,
    };
  });

  return (
    <Panel label="VERDICT GANTRY">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: grad('#1b1a19', '#0c0b0b') }}>
        {/* ============ CAMERA ============ */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(${shake * 0.7}px, ${shake * 0.35}px) scale(${cam})`,
            transformOrigin: '640px 402px',
          }}
        >
          <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s6wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#232120" />
                <stop offset="1" stopColor="#100f0f" />
              </linearGradient>
              <linearGradient id="s6floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#191817" />
                <stop offset="1" stopColor="#2b2825" />
              </linearGradient>
              <linearGradient id="s6brass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6b5327" />
                <stop offset="0.42" stopColor={GOLD} />
                <stop offset="0.62" stopColor="#f2dfa4" />
                <stop offset="1" stopColor="#5b451f" />
              </linearGradient>
              <linearGradient id="s6steel" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3a3835" />
                <stop offset="0.5" stopColor="#6d6a64" />
                <stop offset="1" stopColor="#2c2a28" />
              </linearGradient>
              <linearGradient id="s6card" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fbf7ec" />
                <stop offset="1" stopColor="#ddd6c4" />
              </linearGradient>
              <radialGradient id="s6shaft" cx="0.5" cy="0" r="1">
                <stop offset="0" stopColor={AMBER} stopOpacity="0.5" />
                <stop offset="1" stopColor={AMBER} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="s6glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor={AMBER} stopOpacity="0.5" />
                <stop offset="1" stopColor={AMBER} stopOpacity="0" />
              </radialGradient>
              <clipPath id="s6clip">
                <rect x="0" y="52" width="1012" height="740" />
              </clipPath>
            </defs>

            <g clipPath="url(#s6clip)">
              {/* ---------- SET: wall, floor, perspective ---------- */}
              <rect x="0" y="52" width="1012" height="512" fill="url(#s6wall)" />
              <rect x="0" y="558" width="1012" height="234" fill="url(#s6floor)" />
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`fp${i}`}
                  x1={506 + (i - 6) * 62}
                  y1={562}
                  x2={506 + (i - 6) * 300}
                  y2={792}
                  stroke="#403c37"
                  strokeWidth="1.4"
                  opacity="0.5"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => {
                const y = 566 + Math.pow(i / 4, 2.1) * 220;
                return <line key={`fh${i}`} x1="0" y1={y} x2="1012" y2={y} stroke="#403c37" strokeWidth="1.2" opacity="0.4" />;
              })}
              <rect x="0" y="552" width="1012" height="12" fill="#0a0909" opacity="0.85" />

              {/* dimmed layer 1: pipes with pulsing flow */}
              {[110, 150].map((y, i) => (
                <g key={`pipe${i}`} opacity="0.5">
                  <rect x="0" y={y} width="1012" height="13" rx="6" fill="url(#s6steel)" />
                  {Array.from({ length: 9 }).map((_, j) => (
                    <circle
                      key={j}
                      cx={((f * (2.4 + i) + j * 118) % 1060) - 24}
                      cy={y + 6}
                      r="2.6"
                      fill={i ? TERM2 : AMBER}
                      opacity="0.75"
                    />
                  ))}
                </g>
              ))}

              {/* dimmed layer 2: gauges on the back wall, needles swinging */}
              {[96, 190, 928].map((x, i) => {
                const a = -50 + Math.sin(f * 0.09 + i * 1.7) * 42;
                return (
                  <g key={`g${i}`} opacity="0.42">
                    <circle cx={x} cy={236} r="26" fill="#191817" stroke="#4a4640" strokeWidth="2.5" />
                    <circle cx={x} cy={236} r="19" fill="none" stroke="#3a3733" strokeWidth="1" />
                    <line
                      x1={x}
                      y1={236}
                      x2={x + Math.cos((a - 90) * Math.PI / 180) * 17}
                      y2={236 + Math.sin((a - 90) * Math.PI / 180) * 17}
                      stroke={AMBER}
                      strokeWidth="2"
                    />
                    <circle cx={x} cy={236} r="3" fill={GOLD} />
                  </g>
                );
              })}

              {/* dimmed layer 3: rotating warning beacon + sweeping cone */}
              <g opacity="0.55">
                <rect x="880" y="176" width="26" height="14" rx="4" fill="#2a2724" />
                <circle cx="893" cy="172" r="11" fill={AMBER} opacity={0.4 + 0.45 * Math.abs(Math.sin(f * 0.13))} />
                <circle cx="893" cy="172" r="4" fill="#fff4d6" opacity="0.8" />
                <g transform={`rotate(${(f * 5.4) % 360} 893 172)`}>
                  <path d="M893 172 L1130 128 L1130 216 Z" fill={AMBER} opacity="0.11" />
                </g>
              </g>

              {/* dimmed layer 4: re-inking rocker with two pads */}
              <g transform={`translate(300 336) rotate(${Math.sin(f * 0.22) * 9})`} opacity="0.8">
                <rect x="-64" y="-9" width="128" height="18" rx="8" fill="url(#s6steel)" stroke="#151413" strokeWidth="1.5" />
                <rect x="-58" y="-22" width="44" height="16" rx="5" fill={GREEN} stroke="#0f2a18" strokeWidth="1.5" opacity="0.9" />
                <rect x="14" y="-22" width="44" height="16" rx="5" fill={RED} stroke="#3a1010" strokeWidth="1.5" opacity="0.9" />
                <circle cx="0" cy="0" r="5" fill={GOLD} />
              </g>
              <rect x="292" y="342" width="16" height="80" fill="url(#s6steel)" opacity="0.6" />

              {/* ---------- VOLUMETRIC KEY LIGHT ON THE HEAD ---------- */}
              <rect x="562" y="166" width="156" height="16" rx="5" fill="#2a2724" stroke="#12100f" strokeWidth="1.5" />
              <path d="M576 182 L704 182 L860 600 L420 600 Z" fill="url(#s6shaft)" opacity={0.68 + 0.14 * Math.sin(f * 0.5)} />
              <ellipse cx="640" cy="600" rx="210" ry="30" fill={AMBER} opacity="0.1" />

              {/* ---------- GANTRY STRUCTURE ---------- */}
              <rect x="500" y="186" width="292" height="26" rx="7" fill="url(#s6brass)" stroke="#2a2115" strokeWidth="2" />
              <rect x="504" y="190" width="284" height="6" rx="3" fill="#fff0c2" opacity="0.35" />
              {[516, 776].map((x, i) => (
                <g key={`leg${i}`}>
                  <rect x={x} y="206" width="24" height="386" rx="6" fill="url(#s6steel)" stroke="#131211" strokeWidth="2" />
                  <rect x={x + 4} y="210" width="5" height="378" fill="#8f8b83" opacity="0.35" />
                  <rect x={x - 16} y="586" width="56" height="16" rx="5" fill="#26241f" stroke="#100f0e" strokeWidth="1.5" />
                  {Array.from({ length: 7 }).map((_, j) => (
                    <rect key={j} x={x + 3} y={228 + j * 52} width="18" height="4" rx="2" fill="#141312" opacity="0.7" />
                  ))}
                </g>
              ))}
              {/* knockoff authority seal on the beam: DMV */}
              <g transform="translate(742 199)" opacity="0.9">
                <circle r="15" fill="#2b2318" stroke={GOLD} strokeWidth="2" />
                <circle r="10" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.6" />
                <text y="4" textAnchor="middle" fontFamily={mono} fontSize="8" fill={GOLD} letterSpacing="0.5">DMV</text>
              </g>

              {/* ---------- THE RAIL (skeletal, ratcheting carriers) ---------- */}
              <rect x="-10" y="478" width="1032" height="13" rx="4" fill="url(#s6steel)" stroke="#111010" strokeWidth="1.5" />
              <rect x="-10" y="481" width="1032" height="3" fill="#8f8b83" opacity="0.3" />
              {Array.from({ length: 24 }).map((_, i) => {
                const x = (((f * 10.5 + i * 46) % 1104) + 1104) % 1104 - 46;
                return <rect key={`lk${i}`} x={x} y="470" width="18" height="7" rx="3" fill="#4b4842" stroke="#141312" strokeWidth="1" />;
              })}
              {Array.from({ length: 9 }).map((_, i) => {
                const x = (((f * 10.5 + i * 130) % 1170) + 1170) % 1170 - 90;
                return (
                  <g key={`sp${i}`} transform={`translate(${x} 508)`} opacity="0.75">
                    <circle r="16" fill="#232120" stroke="#4b4842" strokeWidth="2" />
                    <g transform={`rotate(${(f * 10.5 * 3) % 360})`}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <rect key={j} x="-2" y="-17" width="4" height="6" rx="1" fill="#6d6a64" transform={`rotate(${j * 45})`} />
                      ))}
                    </g>
                    <circle r="4" fill={GOLD} opacity="0.8" />
                  </g>
                );
              })}
              {/* anvil under the head */}
              <rect x="576" y="468" width="128" height="24" rx="5" fill="#332f2a" stroke="#0f0e0d" strokeWidth="2" />
              <rect x="580" y="471" width="120" height="4" rx="2" fill={AMBER} opacity={0.25 + 0.3 * Math.abs(Math.sin(f * 0.4))} />

              {/* ---------- JOB SHEETS ---------- */}
              {sheets.map((s) => (
                <g key={`sh${s.k}`} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`} opacity={s.x < -60 || s.x > 1090 ? 0 : 1}>
                  {s.x > 782 ? null : (
                    <rect x="-56" y="80" width="112" height="7" rx="3" fill="#0a0909" opacity="0.5" />
                  )}
                  <rect x="-56" y="0" width="112" height="82" rx="5" fill="url(#s6card)" stroke="#a9a08b" strokeWidth="1.4" />
                  <rect x="-56" y="0" width="112" height="13" rx="5" fill="#e8e0cd" />
                  <text x="-50" y="9.5" fontFamily={mono} fontSize="7" fill="#5d564a" letterSpacing="0.4">{`JOB 0${s.id}`}</text>
                  <text x="-50" y="26" fontFamily={mono} fontSize="7" fill="#3d3830">{s.title}</text>
                  <rect x="-50" y="32" width="100" height="9" rx="2" fill="#e3f2e6" />
                  <text x="-47" y="39" fontFamily={mono} fontSize="6.4" fill="#2f7d4f">{'+ retry.ts'}</text>
                  <rect x="-50" y="43" width="100" height="9" rx="2" fill="#f7e2e2" />
                  <text x="-47" y="50" fontFamily={mono} fontSize="6.4" fill="#a33a34">{'- sleep(30)'}</text>
                  <rect x="-50" y="57" width="100" height="19" rx="3" fill="#fff" stroke="#c8bfa9" strokeWidth="1" />
                  <text x="-47" y="65" fontFamily={mono} fontSize="5.6" fill="#9a9179" letterSpacing="0.6">VERDICT</text>
                  {s.stamped ? (
                    <g
                      opacity={Math.max(0, Math.min(1, s.age / 2.4))}
                      transform={`translate(0 66) rotate(${-7 + s.k * 2}) scale(${interpolate(Math.min(s.age, 5), [0, 5], [1.55, 1])})`}
                    >
                      <rect x="-42" y="-9" width="84" height="18" rx="4" fill="none" stroke={s.pass ? GREEN : RED} strokeWidth="2.4" opacity="0.9" />
                      <text
                        y="5"
                        textAnchor="middle"
                        fontFamily={mono}
                        fontSize="12.5"
                        fontWeight={700}
                        fill={s.pass ? GREEN : RED}
                        letterSpacing="2"
                      >
                        {s.pass ? 'PASS' : 'FAIL'}
                      </text>
                    </g>
                  ) : null}
                  {s.stamped && s.age < 6 ? (
                    <rect
                      x="-56"
                      y="0"
                      width="112"
                      height="82"
                      rx="5"
                      fill={s.pass ? GREEN : RED}
                      opacity={Math.max(0, 0.3 - s.age * 0.05)}
                    />
                  ) : null}
                  {/* motion streak under a sliding sheet */}
                  <rect x={-56 - 34} y="70" width="34" height="4" rx="2" fill={AMBER} opacity="0.25" />
                </g>
              ))}

              {/* ---------- THE PRESS: piston + rotating turret + two ink heads ---------- */}
              <g transform={`translate(640 0)`}>
                <rect x="-30" y="196" width="60" height="72" rx="8" fill="url(#s6brass)" stroke="#2a2115" strokeWidth="2" />
                <rect x="-24" y="202" width="7" height="60" rx="3" fill="#fff0c2" opacity="0.3" />
                <rect x="-11" y="252" width="22" height={Math.max(6, headY - 306)} fill="url(#s6steel)" stroke="#121110" strokeWidth="1.5" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect key={i} x="-16" y={258 + i * ((headY - 312) / 6)} width="32" height="5" rx="2" fill="#5a5751" opacity="0.75" />
                ))}
                <g transform={`translate(0 ${headY - 62})`}>
                  <circle r="30" fill="url(#s6brass)" stroke="#2a2115" strokeWidth="2.5" />
                  <circle r="9" fill="#2a2318" />
                  <g transform={`rotate(${turret})`}>
                    <g>
                      <rect x="-46" y="24" width="92" height="26" rx="6" fill={GREEN} stroke="#0e2a19" strokeWidth="2" />
                      <rect x="-40" y="28" width="80" height="6" rx="3" fill="#fff" opacity="0.2" />
                      <rect x="-34" y="14" width="68" height="12" rx="3" fill="#3c3a35" />
                    </g>
                    <g transform="rotate(180)">
                      <rect x="-46" y="24" width="92" height="26" rx="6" fill={RED} stroke="#3a1010" strokeWidth="2" />
                      <rect x="-40" y="28" width="80" height="6" rx="3" fill="#fff" opacity="0.2" />
                      <rect x="-34" y="14" width="68" height="12" rx="3" fill="#3c3a35" />
                    </g>
                  </g>
                </g>
              </g>

              {/* ink puff + impact ring */}
              {sinceImp >= 0 && sinceImp < 10 ? (
                <g opacity={Math.max(0, 1 - sinceImp / 10)}>
                  <circle cx="640" cy="470" r={10 + sinceImp * 13} fill="none" stroke={impCol} strokeWidth={Math.max(0.5, 4 - sinceImp * 0.4)} opacity="0.6" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const r = seed(i * 2.9 + 1);
                    const a = (i / 12) * Math.PI * 2 + r;
                    return (
                      <circle
                        key={i}
                        cx={640 + Math.cos(a) * (16 + sinceImp * (7 + r * 8))}
                        cy={464 + Math.sin(a) * (9 + sinceImp * (4 + r * 4)) - sinceImp * 1.6}
                        r={1.6 + r * 3}
                        fill={impCol}
                        opacity="0.75"
                      />
                    );
                  })}
                  <ellipse cx="640" cy="470" rx={60 + sinceImp * 8} ry="10" fill={impCol} opacity={Math.max(0, 0.18 - sinceImp * 0.02)} />
                </g>
              ) : null}

              {/* ---------- SORTING RAIL (fanning out, right) ---------- */}
              <g opacity="0.85">
                <path d="M842 500 L1012 552 L1012 626 L842 566 Z" fill="#241f1b" stroke="#0f0e0d" strokeWidth="2" />
                {Array.from({ length: 7 }).map((_, i) => {
                  const o = ((f * 4 + i * 26) % 182) / 182;
                  return (
                    <line
                      key={i}
                      x1={846 + o * 160}
                      y1={502 + o * 50}
                      x2={846 + o * 160}
                      y2={566 + o * 58}
                      stroke="#4b4842"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  );
                })}
                <rect x="856" y="486" width="66" height="6" rx="3" fill={GREEN} opacity="0.55" />
                <rect x="936" y="486" width="66" height="6" rx="3" fill={RED} opacity="0.55" />
              </g>

              {/* ---------- EJECTOR FLIPPER (swats the self-graded sheet) ---------- */}
              <g transform={`translate(500 452) rotate(${-flipper})`}>
                <rect x="-6" y="-9" width="46" height="16" rx="5" fill="url(#s6brass)" stroke="#2a2115" strokeWidth="1.6" />
                <rect x="-2" y="-6" width="38" height="4" rx="2" fill="#fff0c2" opacity="0.35" />
              </g>
              <circle cx="500" cy="452" r="7" fill="#2b2724" stroke="#100f0e" strokeWidth="1.6" />

              {/* ---------- THE SELF-GRADED CRAYON SHEET ---------- */}
              <g transform={`translate(${csX} ${csY}) rotate(${csRot})`} opacity={csO}>
                <rect x="-46" y="-1" width="94" height="72" rx="5" fill="#fbf7ec" stroke="#a9a08b" strokeWidth="1.4" />
                <rect x="-46" y="-1" width="94" height="12" rx="5" fill="#e8e0cd" />
                <text x="-41" y="8" fontFamily={mono} fontSize="6.4" fill="#5d564a">JOB 0147</text>
                <text x="-41" y="24" fontFamily={mono} fontSize="6.4" fill="#3d3830">fix retry backoff</text>
                <rect x="-41" y="29" width="84" height="7" rx="2" fill="#e3f2e6" />
                <rect x="-41" y="38" width="84" height="7" rx="2" fill="#f7e2e2" />
                <rect x="-41" y="48" width="84" height="19" rx="3" fill="#fff" stroke="#c8bfa9" strokeWidth="1" />
                <path d="M-30 58 l7 7 l14 -16" fill="none" stroke="#4bbd6a" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                <text x="-4" y="62" fontFamily={mono} fontSize="8" fill="#4bbd6a">DONE :)</text>
              </g>

              {/* ---------- REJECT BIN (filling, lid flapping) ---------- */}
              <g>
                <ellipse cx="164" cy="704" rx="86" ry="14" fill="#050505" opacity="0.55" />
                <g transform={`translate(164 590) rotate(${-16 - Math.abs(Math.sin(f * 0.34)) * 18})`}>
                  <rect x="-62" y="-11" width="124" height="12" rx="5" fill="#3a3733" stroke="#0f0e0d" strokeWidth="1.6" />
                  <rect x="-58" y="-9" width="116" height="3" rx="2" fill="#7d7970" opacity="0.4" />
                </g>
                {Array.from({ length: rejects }).map((_, i) => {
                  const r = seed(i * 4.3 + 3);
                  const r2 = seed(i * 6.1 + 9);
                  const yy = 596 - i * 9 + Math.sin(f * 0.3 + i) * 1.2;
                  return (
                    <g key={`rj${i}`} transform={`translate(${120 + r * 84} ${yy}) rotate(${-28 + r2 * 56})`}>
                      <rect x="-15" y="-11" width="30" height="22" rx="4" fill="#efe8d8" stroke="#b3aa93" strokeWidth="1" />
                      <path d="M-8 -2 l5 5 l9 -11" fill="none" stroke="#4bbd6a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    </g>
                  );
                })}
                <path d="M104 594 L224 594 L214 706 L114 706 Z" fill="#2b2825" stroke="#0e0d0d" strokeWidth="2.5" />
                <path d="M110 600 L120 600 L112 700 L106 700 Z" fill="#6a665f" opacity="0.28" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <line key={i} x1={112 + i * 34} y1="600" x2={110 + i * 32} y2="702" stroke="#151413" strokeWidth="1.4" opacity="0.7" />
                ))}
              </g>

              {/* atmosphere: dust in the shaft */}
              {dust.map((d, i) => (
                <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.s} fill={AMBER} opacity={d.o} />
              ))}

              {/* rookie floor shadow */}
              <ellipse cx="432" cy="602" rx="76" ry="13" fill="#050505" opacity={0.55 * (1 - push * 0.7)} />
            </g>
          </svg>

          {/* ---------- ROOKIE CLAUDE (L-plate, crayon, empty keyring) ---------- */}
          <div
            style={{
              position: 'absolute',
              left: 366,
              top: 458,
              width: 132,
              height: 146,
              opacity: 1 - push * 0.68,
              transform: `translateY(${droop * 7}px) rotate(${-4 + droop * 4 + watch}deg)`,
              transformOrigin: '66px 140px',
            }}
          >
            <div style={{ transform: `rotate(${-10 + droop * 10}deg)`, transformOrigin: '66px 120px' }}>
              <Mascot lf={lf} size={132} nodAmp={3} nodSpeed={1.6} />
            </div>
            {/* red L badge on the chest */}
            <div
              style={{
                position: 'absolute',
                left: 50,
                top: 84,
                width: 26,
                height: 26,
                borderRadius: 6,
                background: '#fff',
                border: `2px solid ${RED}`,
                boxShadow: '0 3px 8px rgba(0,0,0,0.45)',
                color: RED,
                fontFamily: fraunces.fontFamily,
                fontWeight: 700,
                fontSize: 17,
                lineHeight: '22px',
                textAlign: 'center',
              }}
            >
              L
            </div>
            {/* empty keyring loop on the belt */}
            <div
              style={{
                position: 'absolute',
                left: 92,
                top: 112,
                width: 14,
                height: 14,
                borderRadius: 9,
                border: `2.5px solid ${MUTE}`,
                opacity: 0.85,
                transform: `rotate(${Math.sin(f * 0.24) * 12}deg)`,
              }}
            />
            {/* crayon still clutched: the thing he graded himself with */}
            <div
              style={{
                position: 'absolute',
                left: 8,
                top: 96 + droop * 6,
                width: 30,
                height: 9,
                borderRadius: 3,
                background: grad('#6fd08c', '#2f8a4f'),
                border: '1.5px solid #1d4a2c',
                boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                transform: `rotate(${-24 + droop * 30}deg)`,
              }}
            />
          </div>
        </div>

        {/* vignette + key-light bloom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(120% 90% at 63% 46%, rgba(255,190,90,0.10), rgba(0,0,0,0) 46%, rgba(0,0,0,0.62) 100%)',
          }}
        />
      </div>
    </Panel>
  );
};

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- punch rhythm: 20 hits, accelerating gaps, last lands f68
  const PT = Array.from({ length: 20 }).map((_, i) => 6 + 62 * Math.pow((i + 1) / 20, 0.62));
  const lit = PT.filter((t) => lf >= t).length;
  let strike = 0, sIdx = Math.min(lit, 19);
  PT.forEach((t, i) => { const d = Math.abs(lf - t); if (d < 6) { const s = 1 - d / 6; if (s > strike) { strike = s; sIdx = i; } } });
  const holeX = (i: number) => 352 + 14 + i * 14.6;
  const pistX = holeX(sIdx);
  const pistLen = 10 + 94 * strike + (lf > 70 ? 5 + 4 * Math.sin(lf * 0.3) : 0);
  const flash20 = ramp(lf, 68, 70) * (1 - ramp(lf, 70, 92));

  // ---- record gauge (the only number on frame)
  const wob = Math.sin(lf * 0.9) * 0.22 + Math.sin(lf * 2.3) * 0.08;
  const rec = interpolate(lf, [0, 58, 68, 150, 156, 164, 170, 178, 184], [80, 96, 95, 95, 93, 93, 91, 91, 89], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + wob;
  const gcx = 860, gcy = 210, gR = 62;
  const ang = interpolate(rec, [80, 100], [180, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nx = gcx + gR * 0.9 * Math.cos((ang * Math.PI) / 180);
  const ny = gcy - gR * 0.9 * Math.sin((ang * Math.PI) / 180);
  const klax = lf >= 168 ? (lf % 6 < 3 ? 1 : 0.18) : 0;
  const redPulse = lf >= 150 ? 0.35 + 0.45 * Math.abs(Math.sin(lf * 0.22)) : 0.2;

  // ---- machine shudder + swallow + hologram + eject
  const shud = lf >= 70 && lf <= 92 ? Math.sin(lf * 2.6) * 3 : 0;
  const swal = over(lf, 70, 22, Easing.in(Easing.quad)) * 126;
  const holoY = 292 + over(lf, 76, 16, Easing.inOut(Easing.quad)) * 112;
  const flyP = over(lf, 92, 12, Easing.out(Easing.cubic));
  const bob = Math.sin(lf * 0.18) * 3;
  const cardCX = lf < 92 ? 505 : interpolate(flyP, [0, 1], [505, 300]);
  const cardCY = lf < 92 ? 346 + swal : interpolate(flyP, [0, 1], [470, 588]) + (lf >= 104 ? bob : 0);
  const cardR = lf < 92 ? 0 : interpolate(flyP, [0, 1], [0, 712]);
  const cardS = lf < 92 ? 1 : interpolate(flyP, [0, 1], [1, 0.42]);

  // ---- keys handed over EXACTLY once (f104..120)
  const kx = interpolate(lf, [104, 116, 120], [470, 302, 256], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const ky = interpolate(lf, [104, 116, 120], [408, 424, 618], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const kr = interpolate(lf, [104, 120], [0, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clutch = lf >= 176 ? 6 * over(lf, 176, 10) : 0;

  // ---- L-plate rips at the 20th punch, once
  const pl = over(lf, 68, 30, Easing.out(Easing.quad));
  const plX = 104 - 96 * pl, plY = 552 - 46 * Math.sin(pl * Math.PI) + 150 * pl * pl, plR = -6 - 460 * pl;
  const plO = 1 - ramp(lf, 88, 100);
  const capPop = interpolate(over(lf, 68, 10), [0, 0.55, 1], [1, 1.3, 1]);
  const pinS = interpolate(over(lf, 68, 11), [0, 0.6, 1], [0, 1.35, 1]);

  // ---- lane 2: an already licensed Claude gets VOIDed (hero only watches)
  const vS = lf < 176 ? 3 : interpolate(over(lf, 176, 8, Easing.in(Easing.quad)), [0, 1], [3, 1]);
  const vB = lf >= 184 ? -Math.abs(Math.sin((lf - 184) * 0.34)) * Math.max(0, 17 - (lf - 184) * 0.62) : 0;
  const vO = ramp(lf, 175, 177);
  const yk = over(lf, 188, 12, Easing.in(Easing.cubic));
  const k2x = interpolate(yk, [0, 1], [906, 692]), k2y = interpolate(yk, [0, 1], [600, 406]);
  const armOut = lf >= 190 ? 1 - ramp(lf, 208, 216) * 0.8 : 0;
  const l2wing = 1 - ramp(lf, 176, 184);

  // ---- envelope fires at camera, still in flight at 216
  const eP = over(lf, 202, 18, Easing.out(Easing.quad));
  const ex = interpolate(eP, [0, 1], [505, 604]), ey = interpolate(eP, [0, 1], [412, 656]);
  const eS = interpolate(eP, [0, 1], [0.22, 2.6]), eR = eP * 168;
  const badge = interpolate(over(lf, 210, 10), [0, 1], [0, 1.15]);

  // ---- sloth clerk stamp: reaching all scene, lands on the last frames
  const stX = interpolate(lf, [0, 212, 216], [452, 494, 494], { extrapolateRight: "clamp" });
  const stY = interpolate(lf, [0, 210, 213, 216], [172, 184, 184, 206], { extrapolateRight: "clamp" });

  const dust = Array.from({ length: 18 }).map((_, i) => { const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2); return { x: 40 + r * 940, y: 90 + ((r2 * 660 + lf * (0.34 + r * 0.75)) % 660), s: 1.4 + r2 * 3, o: 0.14 + r * 0.28 }; });

  const cardArt = (n: number, lam: number) => (
    <g>
      <rect x={0} y={0} width={306} height={96} rx={9} fill="url(#s7card)" stroke={lam ? GOLD : "rgba(120,110,90,0.55)"} strokeWidth={lam ? 3 : 2} />
      <rect x={0} y={0} width={306} height={30} rx={9} fill="rgba(58,92,132,0.16)" />
      <text x={12} y={21} fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={13} letterSpacing="1.6" fill={INK}>AUTONOMY LICENCE</text>
      <rect x={12} y={36} width={34} height={34} rx={7} fill="rgba(58,92,132,0.25)" stroke="rgba(26,24,19,0.35)" strokeWidth={1.5} />
      <circle cx={29} cy={51} r={11} fill={CLAY} />
      <circle cx={25} cy={49} r={2.1} fill={INK} /><circle cx={33} cy={49} r={2.1} fill={INK} />
      <text x={54} y={50} fontFamily={mono} fontSize={12} fill={CLAY}>deploy-checkout</text>
      <text x={54} y={64} fontFamily={inter.fontFamily} fontWeight={700} fontSize={7.5} letterSpacing="1.2" fill={MUTE}>PASS RECORD</text>
      <rect x={262} y={34} width={32} height={30} rx={5} fill="url(#s7foil)" opacity={0.75 + 0.2 * Math.sin(lf * 0.16)} stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
      {Array.from({ length: 20 }).map((_, i) => {
        const on = i < n, pop = on ? 1 + 0.9 * Math.max(0, 1 - Math.abs(lf - PT[i]) / 7) : 1;
        return (
          <g key={i} transform={`translate(${14 + i * 14.6},80) scale(${pop})`}>
            <circle r={5.1} fill={on ? GOLD : "rgba(26,24,19,0.14)"} stroke={on ? AMBER : "rgba(26,24,19,0.22)"} strokeWidth={1.4} />
            {on && <circle r={8.4} fill="none" stroke={GOLD} strokeWidth={1.2} opacity={0.45 * Math.max(0, 1 - Math.abs(lf - PT[i]) / 9)} />}
          </g>
        );
      })}
      {lam > 0 && <rect x={0} y={0} width={306} height={96} rx={9} fill="url(#s7gloss)" opacity={0.5} />}
    </g>
  );

  return (
    <Panel label="EARN THE KEYS">
      {/* ================= SET (behind) ================= */}
      <svg viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792 }}>
        <defs>
          <linearGradient id="s7wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#101a2c" /><stop offset="1" stopColor="#070c16" /></linearGradient>
          <linearGradient id="s7floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1220" /><stop offset="1" stopColor="#151f33" /></linearGradient>
          <linearGradient id="s7mach" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5c667a" /><stop offset="0.45" stopColor="#3a4658" /><stop offset="1" stopColor="#222c3c" /></linearGradient>
          <linearGradient id="s7brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={GOLD} /><stop offset="1" stopColor={AMBER} /></linearGradient>
          <linearGradient id="s7ledge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a5468" /><stop offset="1" stopColor="#1c2534" /></linearGradient>
          <linearGradient id="s7card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAPER} /><stop offset="1" stopColor="#DED6C6" /></linearGradient>
          <linearGradient id="s7gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(255,255,255,0.55)" /><stop offset="0.4" stopColor="rgba(255,255,255,0.05)" /><stop offset="1" stopColor="rgba(255,255,255,0.3)" /></linearGradient>
          <linearGradient id="s7foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fd7ff" /><stop offset="0.4" stopColor="#c9a4ff" /><stop offset="0.7" stopColor="#ffd39a" /><stop offset="1" stopColor="#9df0c8" /></linearGradient>
          <linearGradient id="s7holo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="rgba(120,220,255,0)" /><stop offset="0.25" stopColor="rgba(120,220,255,0.85)" /><stop offset="0.5" stopColor="rgba(200,150,255,0.85)" /><stop offset="0.75" stopColor="rgba(255,210,140,0.85)" /><stop offset="1" stopColor="rgba(150,240,200,0)" /></linearGradient>
          <linearGradient id="s7cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,238,205,0.42)" /><stop offset="1" stopColor="rgba(255,238,205,0)" /></linearGradient>
          <linearGradient id="s7cone2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(180,215,255,0.26)" /><stop offset="1" stopColor="rgba(180,215,255,0)" /></linearGradient>
          <linearGradient id="s7red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(196,74,58,0.5)" /><stop offset="1" stopColor="rgba(196,74,58,0)" /></linearGradient>
          <radialGradient id="s7glow"><stop offset="0" stopColor="rgba(231,178,76,0.55)" /><stop offset="1" stopColor="rgba(231,178,76,0)" /></radialGradient>
          <radialGradient id="s7klax"><stop offset="0" stopColor="rgba(196,74,58,0.85)" /><stop offset="1" stopColor="rgba(196,74,58,0)" /></radialGradient>
          <clipPath id="s7rec"><rect x={344} y={292} width={322} height={108} rx={7} /></clipPath>
        </defs>

        {/* wall + floor */}
        <rect x={0} y={52} width={1012} height={378} fill="url(#s7wall)" />
        <rect x={0} y={430} width={1012} height={362} fill="url(#s7floor)" />
        <rect x={0} y={426} width={1012} height={6} fill="rgba(150,180,230,0.14)" />

        {/* dimmed layer 1: receding lane, dashes scrolling f0..f216 */}
        <line x1={506} y1={430} x2={-30} y2={792} stroke="rgba(150,180,230,0.16)" strokeWidth={2} />
        <line x1={506} y1={430} x2={1042} y2={792} stroke="rgba(150,180,230,0.16)" strokeWidth={2} />
        <line x1={506} y1={430} x2={240} y2={792} stroke="rgba(150,180,230,0.07)" strokeWidth={2} />
        <line x1={506} y1={430} x2={772} y2={792} stroke="rgba(150,180,230,0.07)" strokeWidth={2} />
        {Array.from({ length: 9 }).map((_, i) => {
          const t = ((i / 9 + lf * 0.0072) % 1), y = 430 + 362 * t * t, w = 3 + 26 * t * t;
          return <rect key={i} x={506 - w / 2} y={y} width={w} height={5 + 16 * t * t} rx={3} fill="rgba(231,178,76,0.3)" opacity={0.25 + 0.5 * t} />;
        })}

        {/* dimmed layer 2: flip-board clacking on the left wall */}
        <rect x={38} y={92} width={236} height={104} rx={8} fill="rgba(10,16,28,0.85)" stroke="rgba(150,180,230,0.16)" strokeWidth={1.5} />
        {Array.from({ length: 24 }).map((_, i) => {
          const c = i % 8, r = Math.floor(i / 8), ph = (lf * 0.09 + seed(i * 2.7) * 6) % 3;
          const flip = ph < 0.5 ? Math.abs(Math.cos(ph * Math.PI * 2)) : 1;
          return <rect key={i} x={48 + c * 28} y={102 + r * 30} width={22} height={22 * flip + 2} rx={2} fill={i % 5 === 0 ? "rgba(231,178,76,0.4)" : "rgba(150,180,230,0.22)"} />;
        })}

        {/* dimmed layer 3: the queue, shuffling, with a knockoff terminator sprite */}
        {Array.from({ length: 4 }).map((_, i) => {
          const sh = Math.sin(lf * 0.05 + i * 1.3) * 5, term = i === 3;
          const x = 40 + i * 54 + sh, y = 396 + i * 6, h = 62 + i * 4;
          return (
            <g key={i} opacity={0.5}>
              <ellipse cx={x + 18} cy={y + h + 4} rx={20} ry={5} fill="rgba(0,0,0,0.5)" />
              <rect x={x} y={y + 22} width={36} height={h - 22} rx={9} fill="rgba(16,24,40,0.95)" />
              <circle cx={x + 18} cy={y + 14} r={14} fill="rgba(16,24,40,0.95)" />
              {term
                ? <rect x={x + 7} y={y + 11} width={22} height={4} rx={2} fill={RED} opacity={0.75 + 0.25 * Math.sin(lf * 0.35)} />
                : <><circle cx={x + 13} cy={y + 13} r={2} fill="rgba(150,180,230,0.5)" /><circle cx={x + 23} cy={y + 13} r={2} fill="rgba(150,180,230,0.5)" /></>}
              <rect x={x + (term ? 4 + Math.abs(Math.sin(lf * 0.4)) * 4 : 4)} y={y + h - 6} width={13} height={7} rx={3} fill="rgba(10,16,28,0.95)" />
            </g>
          );
        })}

        {/* window frame + glass + counter ledge */}
        <rect x={292} y={92} width={426} height={214} rx={10} fill="#08101e" stroke="url(#s7brass)" strokeWidth={4} />
        <rect x={272} y={398} width={462} height={32} rx={6} fill="url(#s7ledge)" stroke="rgba(150,180,230,0.2)" strokeWidth={1.5} />
        <rect x={272} y={424} width={462} height={8} rx={3} fill="url(#s7brass)" opacity={0.85} />
        <rect x={286} y={432} width={434} height={50} rx={6} fill="#141d2e" stroke="rgba(150,180,230,0.12)" strokeWidth={1.5} />

        {/* sloth clerk's stamp, crawling toward the pad for the whole scene */}
        <g opacity={0.9}>
          <rect x={438} y={214} width={70} height={12} rx={3} fill="rgba(58,92,132,0.5)" />
          <rect x={stX - 22} y={stY + 18} width={9} height={26} rx={4} fill="rgba(200,190,170,0.5)" />
          <rect x={stX - 16} y={stY} width={26} height={22} rx={5} fill={CLAY} stroke={INK} strokeWidth={2} />
          <rect x={stX - 20} y={stY + 20} width={34} height={9} rx={3} fill={INK} />
        </g>

        {/* THE LICENCE MACHINE */}
        <g transform={`translate(${shud},0)`}>
          <ellipse cx={505} cy={422} rx={210} ry={13} fill="rgba(0,0,0,0.55)" />
          <rect x={320} y={240} width={370} height={178} rx={16} fill="url(#s7mach)" stroke="rgba(150,180,230,0.3)" strokeWidth={2.5} />
          <rect x={320} y={240} width={370} height={178} rx={16} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          {/* punch rail, 20 slots */}
          <rect x={330} y={248} width={350} height={26} rx={8} fill="#131c2c" stroke="url(#s7brass)" strokeWidth={2} />
          {Array.from({ length: 20 }).map((_, i) => <rect key={i} x={holeX(i) - 3.4} y={266} width={6.8} height={7} rx={2} fill={i < lit ? GOLD : "rgba(150,180,230,0.22)"} />)}
          {/* piston hammer */}
          <g>
            <rect x={pistX - 6} y={264} width={12} height={pistLen} rx={3} fill="url(#s7brass)" stroke={INK} strokeWidth={1.2} />
            <rect x={pistX - 10} y={264 + pistLen - 8} width={20} height={10} rx={3} fill={AMBER} stroke={INK} strokeWidth={1.5} />
            {strike > 0.75 && <circle cx={pistX} cy={264 + pistLen + 4} r={16 * strike} fill="url(#s7glow)" />}
          </g>
          {/* recessed tray with the card inside */}
          <rect x={344} y={292} width={322} height={108} rx={7} fill="#0a1220" stroke="rgba(0,0,0,0.7)" strokeWidth={3} />
          <g clipPath="url(#s7rec)">
            {lf < 92 && <g transform={`translate(${cardCX},${cardCY}) rotate(${cardR}) scale(${cardS}) translate(-153,-48)`}>{cardArt(lit, 0)}</g>}
            {lf >= 70 && lf <= 94 && <rect x={344} y={holoY} width={322} height={26} fill="url(#s7holo)" opacity={0.65} />}
            {/* hologram roller */}
            {lf >= 70 && lf <= 96 && <rect x={344} y={holoY - 5} width={322} height={5} rx={2} fill="url(#s7brass)" opacity={0.8} />}
          </g>
          {/* eject slot + throat lip */}
          <rect x={396} y={406} width={218} height={11} rx={4} fill="#060b14" stroke="url(#s7brass)" strokeWidth={2} />
          <circle cx={352} cy={410} r={7} fill={lf % 20 < 10 ? GREEN : "rgba(63,158,116,0.3)"} />
          <circle cx={658} cy={410} r={7} fill={klax > 0.5 ? RED : "rgba(196,74,58,0.28)"} />
          {flash20 > 0 && <rect x={320} y={240} width={370} height={178} rx={16} fill={GOLD} opacity={0.35 * flash20} />}
        </g>

        {/* wall RECORD gauge */}
        <g>
          {klax > 0 && <circle cx={gcx} cy={gcy} r={110} fill="url(#s7klax)" opacity={klax * 0.8} />}
          <circle cx={gcx} cy={gcy} r={gR + 16} fill="#0c1424" stroke="url(#s7brass)" strokeWidth={3} />
          <path d={`M ${gcx - gR} ${gcy} A ${gR} ${gR} 0 0 1 ${gcx} ${gcy - gR}`} fill="none" stroke={RED} strokeWidth={9} opacity={redPulse} strokeLinecap="round" />
          <path d={`M ${gcx} ${gcy - gR} A ${gR} ${gR} 0 0 1 ${gcx + gR} ${gcy}`} fill="none" stroke={GOLD} strokeWidth={9} opacity={0.85} strokeLinecap="round" />
          <line x1={gcx} y1={gcy - gR - 10} x2={gcx} y2={gcy - gR + 11} stroke={RED} strokeWidth={4} />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = ((180 - i * 22.5) * Math.PI) / 180;
            return <line key={i} x1={gcx + (gR - 12) * Math.cos(a)} y1={gcy - (gR - 12) * Math.sin(a)} x2={gcx + (gR - 4) * Math.cos(a)} y2={gcy - (gR - 4) * Math.sin(a)} stroke="rgba(190,205,235,0.4)" strokeWidth={2} />;
          })}
          <line x1={gcx} y1={gcy} x2={nx} y2={ny} stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
          <circle cx={gcx} cy={gcy} r={7} fill={AMBER} stroke={INK} strokeWidth={2} />
          <rect x={gcx - 8} y={gcy + 2} width={16} height={10} fill="#0c1424" />
          <text x={gcx} y={gcy + 46} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={38} fill={rec < 90 ? RED : GOLD}>{Math.round(rec)}</text>
          <text x={gcx} y={gcy + 62} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={800} fontSize={11} letterSpacing="2.4" fill="rgba(190,205,235,0.5)">RECORD</text>
        </g>

        {/* retract cord: slack, then taut, out to lane 2's keys */}
        {lf < 202 && <path d={`M 692 408 Q ${(692 + k2x) / 2} ${408 + (lf < 188 ? 66 : 66 * (1 - yk))} ${k2x} ${k2y}`} fill="none" stroke="rgba(190,205,235,0.45)" strokeWidth={2.5} strokeDasharray="7 5" />}

        {/* hero's L-PLATE (taped on his back), ripped off once at the 20th punch */}
        <g transform={`translate(${plX},${plY}) rotate(${plR})`} opacity={plO}>
          <rect x={0} y={0} width={44} height={44} rx={5} fill={PAPER} stroke="rgba(26,24,19,0.4)" strokeWidth={2} />
          <text x={22} y={34} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={30} fill={RED}>L</text>
        </g>

        {/* floor cast shadows */}
        <ellipse cx={206} cy={676} rx={78} ry={12} fill="rgba(0,0,0,0.6)" />
        <ellipse cx={870} cy={668} rx={70} ry={11} fill="rgba(0,0,0,0.5)" />
      </svg>

      {/* clerk behind the glass (droopy sloth Claude), quarter speed */}
      <div style={{ position: "absolute", left: 372, top: 146 }}>
        <Mascot lf={lf} size={94} gaze={-0.15} nodAmp={1.2} nodSpeed={0.32} glasses={1} stern={0.2} />
      </div>
      <div style={{ position: "absolute", left: 300, top: 100, width: 410, height: 200, background: "linear-gradient(160deg, rgba(120,170,235,0.22), rgba(8,16,30,0.62))", borderRadius: 8, boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)" }} />
      <div style={{ position: "absolute", left: 372, top: 158, width: 94, height: 9, borderRadius: 4, background: "rgba(26,24,19,0.55)" }} />

      {/* dimmed layer 4: ceiling fan shadow sweeping the whole set */}
      <div style={{ position: "absolute", left: 236, top: 210, width: 560, height: 470, borderRadius: "50%", background: "conic-gradient(rgba(0,0,0,0.4) 0deg, rgba(0,0,0,0) 46deg, rgba(0,0,0,0.4) 90deg, rgba(0,0,0,0) 136deg, rgba(0,0,0,0.4) 180deg, rgba(0,0,0,0) 226deg, rgba(0,0,0,0.4) 270deg, rgba(0,0,0,0) 316deg, rgba(0,0,0,0.4) 360deg)", transform: `rotate(${lf * 1.5}deg)`, opacity: 0.11, filter: "blur(7px)" }} />

      {/* ---------- HERO: the rookie, one costume, keys handed once ---------- */}
      <div style={{ position: "absolute", left: 130, top: 515 }}>
        <Mascot lf={lf} size={150} gaze={lf < 150 ? 0.5 : 0.95} nodAmp={lf >= 118 && lf < 152 ? 6 : 2.4} nodSpeed={lf >= 118 && lf < 152 ? 11 : 4} cheer={lf >= 118 && lf < 152 ? 1 : 0} shock={lf >= 176 ? 1 : 0} />
      </div>
      {/* cap: learner cap flips to a gold-band chauffeur cap on the 20th punch */}
      <svg viewBox="0 0 100 40" style={{ position: "absolute", left: 158, top: 498, width: 100, height: 40, transform: `scaleY(${capPop})` }}>
        {lf < 68 ? (
          <g><path d="M20 24 Q50 2 80 24 Z" fill={PAPER} stroke="rgba(26,24,19,0.4)" strokeWidth={2} /><rect x={14} y={23} width={72} height={7} rx={3} fill={MUTE} /></g>
        ) : (
          <g><path d="M20 24 Q50 2 80 24 Z" fill="#141c2a" stroke={INK} strokeWidth={2} /><rect x={19} y={19} width={62} height={6} rx={2} fill={GOLD} /><rect x={12} y={24} width={76} height={8} rx={4} fill="#0b1220" stroke={INK} strokeWidth={1.5} /></g>
        )}
      </svg>
      {/* gold wings pin snaps on at the 20th punch */}
      <svg viewBox="0 0 60 22" style={{ position: "absolute", left: 176, top: 568, width: 60, height: 22, transform: `scale(${pinS})` }}>
        <path d="M4 11 L26 6 L30 2 L34 6 L56 11 L34 14 L30 20 L26 14 Z" fill={GOLD} stroke={AMBER} strokeWidth={1.4} />
        <circle cx={30} cy={10} r={3.4} fill={PAPER} stroke={AMBER} strokeWidth={1.2} />
      </svg>

      {/* ---------- LANE 2: an already licensed Claude, VOIDed while the hero watches ---------- */}
      <div style={{ position: "absolute", left: 800, top: 520, opacity: lf < 150 ? 0.5 : 1 }}>
        <Mascot lf={lf} size={140} gaze={-0.2} nodAmp={lf >= 176 ? 7 : 2} nodSpeed={lf >= 176 ? 13 : 3.4} shock={lf >= 176 ? 1 : 0} cheer={lf < 150 ? 0.4 : 0} />
      </div>
      <svg viewBox="0 0 56 20" style={{ position: "absolute", left: 838, top: 570, width: 56, height: 20, opacity: 0.35 + 0.65 * l2wing, transform: `rotate(${(1 - l2wing) * 34}deg)` }}>
        <path d="M3 10 L24 6 L28 2 L32 6 L53 10 L32 13 L28 18 L24 13 Z" fill={l2wing > 0.5 ? GOLD : MUTE} stroke={l2wing > 0.5 ? AMBER : "rgba(120,116,105,0.9)"} strokeWidth={1.3} />
      </svg>

      {/* ================= FOREGROUND ================= */}
      <svg viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none" }}>
        {/* volumetric key light on the hero + soft fill on the machine + red wash on lane 2 */}
        <polygon points="150,58 232,58 344,712 44,712" fill="url(#s7cone)" opacity={0.5} />
        <polygon points="452,58 560,58 700,432 316,432" fill="url(#s7cone2)" opacity={0.6} />
        {lf >= 150 && <polygon points="820,58 906,58 984,700 758,700" fill="url(#s7red)" opacity={klax * 0.55} />}

        {/* lane 2's licence + the keys on the retract cord */}
        <g transform={`translate(866,548) rotate(-7)`} opacity={lf < 150 ? 0.55 : 1}>
          <rect x={-46} y={-15} width={92} height={30} rx={5} fill="url(#s7card)" stroke={l2wing > 0.5 ? GOLD : MUTE} strokeWidth={2} />
          <rect x={-40} y={-10} width={26} height={20} rx={3} fill="rgba(58,92,132,0.3)" />
          <rect x={-8} y={-8} width={44} height={4} rx={2} fill="rgba(26,24,19,0.35)" />
          <rect x={-8} y={0} width={34} height={4} rx={2} fill="rgba(26,24,19,0.22)" />
        </g>
        {lf < 202 && (
          <g transform={`translate(${k2x},${k2y}) rotate(${yk * 520})`} opacity={1 - ramp(lf, 198, 202)}>
            <circle r={11} fill="none" stroke={GOLD} strokeWidth={4} />
            <rect x={9} y={-3.5} width={26} height={7} rx={2} fill={GOLD} />
            <rect x={28} y={3} width={5} height={7} rx={1.5} fill={AMBER} />
          </g>
        )}
        {/* his paws stay outstretched a beat after the yank */}
        {armOut > 0 && (
          <g opacity={armOut}>
            <circle cx={906} cy={594} r={11} fill={CLAY} stroke={INK} strokeWidth={2.5} />
            <circle cx={932} cy={604} r={9} fill={CLAY} stroke={INK} strokeWidth={2.5} />
          </g>
        )}
        {/* the VOID slam */}
        {vO > 0 && (
          <g transform={`translate(866,${548 + vB}) rotate(-12) scale(${vS})`} opacity={vO}>
            <rect x={-72} y={-28} width={144} height={56} rx={9} fill="none" stroke={RED} strokeWidth={5} opacity={0.95} />
            <text x={0} y={16} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={44} letterSpacing="4" fill="none" stroke={RED} strokeWidth={3.5}>VOID</text>
          </g>
        )}

        {/* the laminated licence, ejected and held in the hero's paw */}
        {lf >= 92 && <g transform={`translate(${cardCX},${cardCY}) rotate(${cardR}) scale(${cardS}) translate(-153,-48)`}>{cardArt(20, 1)}</g>}
        {lf >= 92 && lf < 100 && <circle cx={cardCX} cy={cardCY} r={30 + 40 * over(lf, 92, 8)} fill="none" stroke={GOLD} strokeWidth={3} opacity={1 - over(lf, 92, 8)} />}

        {/* THE KEYS: handed across the counter exactly once */}
        {lf >= 104 && (
          <g transform={`translate(${kx + clutch},${ky + (lf >= 120 ? bob - clutch : 0)}) rotate(${kr})`}>
            <circle r={14} fill="none" stroke={GOLD} strokeWidth={5} />
            <rect x={11} y={-4.5} width={34} height={9} rx={3} fill={GOLD} stroke={AMBER} strokeWidth={1.2} />
            <rect x={36} y={4} width={6} height={9} rx={2} fill={AMBER} />
            <rect x={26} y={4} width={5} height={7} rx={2} fill={AMBER} />
            <circle r={26} fill="url(#s7glow)" opacity={0.55 + 0.35 * Math.sin(lf * 0.3)} />
          </g>
        )}

        {/* the envelope fires from the slot at camera, still in flight at f216 */}
        {lf >= 202 && (
          <g transform={`translate(${ex},${ey}) rotate(${eR}) scale(${eS})`}>
            <rect x={-30} y={-20} width={60} height={40} rx={4} fill={PAPER} stroke="rgba(26,24,19,0.45)" strokeWidth={2} />
            <path d="M-30 -20 L0 4 L30 -20 Z" fill={RED} opacity={0.9} />
            <path d="M-30 20 L-6 0 M30 20 L6 0" stroke="rgba(26,24,19,0.3)" strokeWidth={2} fill="none" />
            <path d="M-16 14 L-16 -6 L0 8 L16 -6 L16 14" fill="none" stroke={RED} strokeWidth={3.5} />
          </g>
        )}
        {/* inbox tile with its badge mid-pop */}
        <g opacity={0.85}>
          <rect x={856} y={704} width={68} height={54} rx={11} fill="#101a2c" stroke="rgba(150,180,230,0.32)" strokeWidth={2} />
          <rect x={868} y={718} width={44} height={28} rx={4} fill={PAPER} />
          <path d="M868 718 L890 736 L912 718" fill="none" stroke={RED} strokeWidth={2.5} />
          {badge > 0 && <circle cx={922} cy={706} r={11 * badge} fill={RED} stroke={PAPER} strokeWidth={2} />}
        </g>

        {/* atmosphere */}
        {dust.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="rgba(255,240,210,0.8)" opacity={d.o} />)}
        <rect x={0} y={52} width={1012} height={740} fill="none" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />
      </svg>
    </Panel>
  );
};

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------- TURNTABLE REVOLVE (the scene's spine) ----------
  const revIn = over(lf, 44, 40, Easing.bezier(0.42, 0, 0.16, 1));
  const settle = lf > 84 ? Math.sin((lf - 84) * 0.85) * Math.exp(-(lf - 84) / 4.2) * 0.6 : 0;
  const drift = Math.max(0, lf - 90) * 0.08; // disc never fully stops
  const rot = revIn * 180 + settle + drift;
  const a = (rot * Math.PI) / 180;
  const CX = 600;
  const BASE = 630;

  const px2 = (px: number, pz: number) => px * Math.cos(a) - pz * Math.sin(a);
  const pz2 = (px: number, pz: number) => px * Math.sin(a) + pz * Math.cos(a);

  // booth + board ride the disc
  const bX = px2(-170, 140), bZ = pz2(-170, 140);
  const rX = px2(60, -210), rZ = pz2(60, -210);
  const boothZn = bZ / 215, recZn = rZ / 215;
  const boothX = CX + bX * 0.92, boothY = BASE + boothZn * 26;
  const recX = CX + rX * 0.92, recY = BASE + recZn * 26;
  const boothS = 0.80 + 0.26 * ((boothZn + 1) / 2);
  const recS = 0.80 + 0.26 * ((recZn + 1) / 2);
  const boothLit = 0.30 + 0.70 * ((boothZn + 1) / 2);
  const recLit = 0.34 + 0.66 * ((recZn + 1) / 2);

  // ---------- HERO ----------
  const step = over(lf, 140, 18, Easing.out) * 96 + over(lf, 156, 11, Easing.inOut) * 26;
  const heroX = 232 + step;
  const bob = step > 2 ? Math.abs(Math.sin(lf * 0.34)) * 5 : 0;
  const gaze = interpolate(lf, [0, 56, 74, 150, 161], [-0.6, -0.6, -0.2, -0.2, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const torso = interpolate(lf, [0, 60, 80, 142, 166], [-5, -5, 3, 3, 9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const folded = lf < 140;

  // ---------- BALL VERDICTS ----------
  const VERD = ['MAYBE', 'ASK AGAIN', 'SEEMS FINE?', 'TRUST ME'];
  const vi = Math.floor(lf / 11) % 4;
  const vp = (lf % 11) / 11;
  const vY = interpolate(vp, [0, 0.28, 0.72, 1], [15, 0, 0, -15]);
  const vO = interpolate(vp, [0, 0.26, 0.74, 1], [0, 1, 1, 0]);
  const shake = Math.sin(lf * 1.1) * (lf % 15 < 8 ? 3.4 : 1.2);
  const crank = ((lf % 12) / 12) * 22 - 11;

  // ---------- RECORD BOARD ----------
  const filled = Math.min(24, 9 + Math.max(0, Math.floor((lf - 92) / 9) + 1));
  const punches = Array.from({ length: 24 }).map((_, i) => {
    const r = seed(i * 3.1 + 7);
    const af = 92 + (i - 9) * 9;
    const on = i < 9 || lf >= af;
    const p = i < 9 ? 1 : over(lf, af, 8, Easing.out);
    return { i, r, on, p, flash: i < 9 ? 0 : 1 - over(lf, af, 6) };
  });
  const roll = Math.sin(lf * 0.42) * 1.4 + (lf % 24 < 3 ? 2.2 : 0);
  const redPulse = 0.42 + 0.26 * (0.5 + 0.5 * Math.sin(lf / 7));

  // ---------- ATMOSPHERE ----------
  const motes = Array.from({ length: 16 }).map((_, i) => {
    const r = seed(i * 5.7 + 2);
    const r2 = seed(i * 2.3 + 11);
    return {
      x: 400 + r * 210,
      y: 150 + ((r2 * 520 + lf * (0.5 + r * 0.9)) % 520),
      s: 1.4 + r2 * 2.2,
      o: 0.10 + r * 0.24,
    };
  });
  const bulbs = Array.from({ length: 14 }).map((_, i) => {
    const r = seed(i * 4.4 + 3);
    const on = (i + Math.floor(lf / 4)) % 3 === 0 || r > 0.86;
    return { i, on, r };
  });
  const glintA = (lf * 3.2 * Math.PI) / 180;

  return (
    <Panel label="the shift">
      {/* ===== SET: back wall + floor ===== */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 46,
          width: 1012,
          height: 746,
          overflow: 'hidden',
          background: 'linear-gradient(#0d1116 0%, #131a20 44%, #191f24 62%, #0f1418 100%)',
        }}
      >
        {/* back wall doors, parallax with the revolve */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1012,
            height: 330,
            transform: `translateX(${-rot * 0.32}px)`,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => {
            const r = seed(i * 6.2 + 1);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 60 + i * 150,
                  top: 108,
                  width: 84,
                  height: 190,
                  borderRadius: '8px 8px 0 0',
                  background: grad('#171e25', '#0c1116'),
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: 'inset 0 12px 26px rgba(0,0,0,0.6)',
                  opacity: 0.7 + r * 0.2,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 14,
                    width: 64,
                    height: 30,
                    borderRadius: 4,
                    background: AMBER,
                    opacity: (0.05 + r * 0.1) * (0.7 + 0.3 * Math.sin(lf * 0.11 + i)),
                    filter: 'blur(3px)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* perspective floor */}
        <svg width={1012} height={746} style={{ position: 'absolute', left: 0, top: 0 }}>
          <defs>
            <linearGradient id="s8flr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#141a20" />
              <stop offset="1" stopColor="#080b0e" />
            </linearGradient>
            <radialGradient id="s8pool" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(255,232,180,0.34)" />
              <stop offset="1" stopColor="rgba(255,232,180,0)" />
            </radialGradient>
            <linearGradient id="s8shaft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255,236,192,0.20)" />
              <stop offset="1" stopColor="rgba(255,236,192,0.02)" />
            </linearGradient>
          </defs>
          <rect x="0" y="284" width="1012" height="462" fill="url(#s8flr)" />
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={506 + (i - 6) * 46}
              y1={286}
              x2={506 + (i - 6) * 210}
              y2={746}
              stroke="rgba(255,255,255,0.045)"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              y1={300 + i * i * 22 + i * 30}
              x2={1012}
              y2={300 + i * i * 22 + i * 30}
              stroke="rgba(255,255,255,0.035)"
              strokeWidth={1}
            />
          ))}
          {/* fixed key light: shaft + floor pool. it NEVER moves */}
          <polygon points="452,46 548,46 700,700 300,700" fill="url(#s8shaft)" />
          <ellipse cx="500" cy="662" rx="230" ry="62" fill="url(#s8pool)" />
        </svg>

        {/* dust in the shaft */}
        {motes.map((m, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: m.x,
              top: m.y,
              width: m.s,
              height: m.s,
              borderRadius: 999,
              background: '#ffe9c0',
              opacity: m.o,
            }}
          />
        ))}
        {/* haze drift */}
        {Array.from({ length: 3 }).map((_, i) => {
          const r = seed(i * 9.3 + 4);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: ((lf * (0.35 + r * 0.5) + r * 900) % 1200) - 200,
                top: 540 + r * 120,
                width: 340,
                height: 70,
                borderRadius: 999,
                background: 'rgba(180,205,230,0.05)',
                filter: 'blur(18px)',
              }}
            />
          );
        })}
      </div>

      {/* ===== TURNTABLE DISC ===== */}
      <div
        style={{
          position: 'absolute',
          left: CX - 322,
          top: BASE - 74,
          width: 644,
          height: 148,
          borderRadius: '50%',
          background: grad('#1d242b', '#0b0f13'),
          border: '2px solid rgba(198,158,84,0.35)',
          boxShadow: '0 24px 46px rgba(0,0,0,0.6), inset 0 -8px 22px rgba(0,0,0,0.7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: CX - 300,
          top: BASE - 62,
          width: 600,
          height: 124,
          borderRadius: '50%',
          border: '2px solid rgba(214,176,98,0.28)',
        }}
      />
      {/* groove marks riding the rotation */}
      {Array.from({ length: 16 }).map((_, i) => {
        const g = ((i / 16) * 360 + rot) * (Math.PI / 180);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: CX + Math.cos(g) * 272 - 3,
              top: BASE + Math.sin(g) * 56 - 3,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: 'rgba(214,176,98,0.5)',
              opacity: 0.25 + 0.35 * (Math.sin(g) + 1) / 2,
            }}
          />
        );
      })}
      {/* travelling brass glint, never stops */}
      <div
        style={{
          position: 'absolute',
          left: CX + Math.cos(glintA) * 300 - 26,
          top: BASE + Math.sin(glintA) * 62 - 9,
          width: 52,
          height: 18,
          borderRadius: 999,
          background: 'rgba(255,226,150,0.75)',
          filter: 'blur(6px)',
        }}
      />

      {/* ===== MYSTIC-8 BOOTH (rides the disc) ===== */}
      <div
        style={{
          position: 'absolute',
          left: boothX,
          top: boothY,
          transform: `translate(-50%,-100%) scale(${boothS})`,
          transformOrigin: '50% 100%',
          filter: `brightness(${boothLit}) saturate(${0.5 + 0.5 * boothLit})`,
          zIndex: boothZn > recZn ? 6 : 3,
        }}
      >
        {/* cast shadow */}
        <div
          style={{
            position: 'absolute',
            left: -20,
            bottom: -14,
            width: 232,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            filter: 'blur(9px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: 192,
            height: 258,
            borderRadius: '14px 14px 6px 6px',
            background: grad('#7a3f4c', '#3d1f28'),
            border: '2px solid rgba(214,176,98,0.5)',
            boxShadow: '0 16px 34px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.12)',
            padding: 8,
          }}
        >
          {/* marquee bulbs */}
          {bulbs.map((b) => {
            const t = b.i / 13;
            return (
              <div
                key={b.i}
                style={{
                  position: 'absolute',
                  left: 8 + t * 172,
                  top: 5,
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: b.on ? '#ffdd8a' : 'rgba(120,90,50,0.6)',
                  boxShadow: b.on ? '0 0 9px rgba(255,215,120,0.9)' : 'none',
                }}
              />
            );
          })}
          <div
            style={{
              marginTop: 12,
              textAlign: 'center',
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: 1,
              color: '#ffe3a6',
              textShadow: '0 1px 0 rgba(0,0,0,0.6)',
            }}
          >
            MYSTIC-8
          </div>
          <div
            style={{
              textAlign: 'center',
              fontFamily: mono,
              fontSize: 7,
              letterSpacing: 1,
              color: 'rgba(255,227,166,0.65)',
            }}
          >
            ASK IT ANYTHING · 25c
          </div>

          {/* scratched glass with ZOLTON */}
          <div
            style={{
              position: 'relative',
              margin: '8px auto 0',
              width: 160,
              height: 132,
              borderRadius: 8,
              background: grad('#16222c', '#0a1016'),
              border: '2px solid rgba(214,176,98,0.4)',
              boxShadow: 'inset 0 8px 20px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 26,
                bottom: 2,
                transform: `rotate(${crank * 0.28}deg) translateX(${shake * 0.3}px)`,
                transformOrigin: '50% 90%',
              }}
            >
              <Mascot lf={lf} size={62} gaze={0.4} nodAmp={2} nodSpeed={0.9} wizard bowtie />
            </div>
            {/* crank arm */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                bottom: 26,
                width: 26,
                height: 5,
                borderRadius: 3,
                background: grad('#d8b262', '#8a6a2e'),
                transform: `rotate(${crank}deg)`,
                transformOrigin: '4px 50%',
              }}
            />
            {/* the 8-ball */}
            <div
              style={{
                position: 'absolute',
                right: 8,
                bottom: 22,
                width: 62,
                height: 62,
                borderRadius: 999,
                background: 'radial-gradient(circle at 34% 30%, #4a5560, #0b0e12 70%)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 6px 14px rgba(0,0,0,0.6)',
                transform: `translate(${shake}px, ${Math.cos(lf * 1.1) * 2}px) rotate(${shake * 0.8}deg)`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 9,
                  top: 9,
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: 'radial-gradient(circle at 50% 40%, #1e4fa0, #071a3a 72%)',
                  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: mono,
                    fontSize: 7,
                    lineHeight: '8px',
                    textAlign: 'center',
                    color: '#dff0ff',
                    opacity: vO,
                    transform: `translateY(${vY}px)`,
                    textShadow: '0 0 6px rgba(120,180,255,0.9)',
                  }}
                >
                  {VERD[vi]}
                </div>
              </div>
            </div>
          </div>

          {/* coin slot */}
          <div
            style={{
              position: 'absolute',
              left: 84,
              bottom: 10,
              width: 24,
              height: 5,
              borderRadius: 3,
              background: '#0a0d10',
              border: '1px solid rgba(214,176,98,0.5)',
            }}
          />
        </div>
      </div>

      {/* ===== THE RECORD BOARD (rides the disc) ===== */}
      <div
        style={{
          position: 'absolute',
          left: recX,
          top: recY,
          transform: `translate(-50%,-100%) scale(${recS})`,
          transformOrigin: '50% 100%',
          filter: `brightness(${recLit})`,
          zIndex: recZn > boothZn ? 6 : 3,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -26,
            bottom: -16,
            width: 382,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            filter: 'blur(10px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: 330,
            height: 292,
            borderRadius: 12,
            background: grad('#153328', '#08170f'),
            border: '2px solid rgba(198,158,84,0.55)',
            boxShadow:
              '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.10), inset 0 -14px 30px rgba(0,0,0,0.55)',
            padding: '14px 16px',
            overflow: 'hidden',
          }}
        >
          {/* key-light sheen */}
          <div
            style={{
              position: 'absolute',
              left: -40,
              top: -60,
              width: 300,
              height: 200,
              background: 'radial-gradient(circle, rgba(255,236,190,0.16), rgba(255,236,190,0))',
            }}
          />
          <div
            style={{
              textAlign: 'center',
              fontFamily: mono,
              fontSize: 15,
              letterSpacing: 7,
              color: 'rgba(240,236,220,0.82)',
              textShadow: '0 1px 0 rgba(0,0,0,0.7)',
            }}
          >
            THE RECORD
          </div>

          {/* three job rows of gold PASS punches */}
          <div style={{ marginTop: 12 }}>
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                style={{
                  display: 'flex',
                  gap: 5,
                  marginBottom: 7,
                  padding: '4px 5px',
                  borderRadius: 5,
                  background: 'rgba(0,0,0,0.32)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {punches.slice(row * 8, row * 8 + 8).map((p) => (
                  <div
                    key={p.i}
                    style={{
                      position: 'relative',
                      width: 30,
                      height: 18,
                      borderRadius: 3,
                      background: p.on
                        ? grad('#f0cd76', '#a97e28')
                        : 'rgba(255,255,255,0.05)',
                      border: p.on
                        ? '1px solid rgba(255,240,190,0.6)'
                        : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: p.on ? '0 2px 5px rgba(0,0,0,0.5)' : 'none',
                      transform: `scale(${p.on ? 1 + (1 - p.p) * 0.6 : 0.94})`,
                      opacity: p.on ? 1 : 0.5,
                    }}
                  >
                    {p.on ? (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: 30,
                          height: 18,
                          borderRadius: 3,
                          background: 'rgba(255,255,235,0.95)',
                          opacity: p.flash * 0.9,
                        }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* odometer */}
          <div
            style={{
              margin: '10px auto 0',
              width: 172,
              height: 62,
              borderRadius: 8,
              background: grad('#2b2318', '#0e0b06'),
              border: '2px solid rgba(214,176,98,0.6)',
              boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              overflow: 'hidden',
            }}
          >
            {['9', '5', '%'].map((d, i) => (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 48,
                  borderRadius: 4,
                  background: grad('#efd79a', '#b0873a'),
                  border: '1px solid rgba(90,64,20,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: mono,
                  fontSize: 32,
                  color: '#2b1e08',
                  overflow: 'hidden',
                }}
              >
                <div style={{ transform: `translateY(${i === 1 ? roll : i === 0 ? roll * 0.15 : 0}px)` }}>
                  {d}
                </div>
              </div>
            ))}
          </div>

          {/* the engraved red threshold, ignored */}
          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 14,
              width: 298,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 2,
                borderRadius: 2,
                background: RED,
                opacity: redPulse,
                boxShadow: `0 0 8px rgba(200,60,50,${redPulse})`,
              }}
            />
            <div
              style={{
                fontFamily: mono,
                fontSize: 12,
                color: RED,
                opacity: redPulse + 0.2,
              }}
            >
              90
            </div>
          </div>
        </div>

        {/* brass rail across the front */}
        <div
          style={{
            position: 'absolute',
            left: -18,
            bottom: -6,
            width: 366,
            height: 9,
            borderRadius: 999,
            background: grad('#f2d78f', '#8f6a26'),
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
          }}
        />
      </div>

      {/* ===== HERO on his mark ===== */}
      <div style={{ position: 'absolute', left: heroX, top: 690 - bob, transform: 'translate(-50%,-100%)', zIndex: 9 }}>
        <div
          style={{
            position: 'absolute',
            left: -50,
            bottom: -12,
            width: 116,
            height: 22,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            filter: 'blur(7px)',
          }}
        />
        <div style={{ transform: `rotate(${torso}deg)`, transformOrigin: '50% 90%' }}>
          <Mascot lf={lf} size={102} gaze={gaze} nodAmp={folded ? 1.4 : 2.6} nodSpeed={0.5} constr stern={folded} />
          {/* folded arms */}
          {folded ? (
            <div
              style={{
                position: 'absolute',
                left: 12,
                bottom: 26,
                width: 78,
                height: 13,
                borderRadius: 999,
                background: grad('#d68b5c', '#8d4f2c'),
                border: '1px solid rgba(0,0,0,0.35)',
                boxShadow: '0 3px 7px rgba(0,0,0,0.5)',
                transform: `translateY(${-Math.min(3, ramp(lf, 8, 40) * 3)}px)`,
              }}
            />
          ) : null}
        </div>
        {/* ink smear on the forearm */}
        <div
          style={{
            position: 'absolute',
            left: 62,
            bottom: 34,
            width: 16,
            height: 6,
            borderRadius: 999,
            background: 'rgba(30,40,60,0.7)',
            transform: 'rotate(-14deg)',
          }}
        />
      </div>
      {/* his hand landing on the brass rail */}
      {lf > 150 ? (
        <div
          style={{
            position: 'absolute',
            left: heroX + 44,
            top: 636,
            width: 30,
            height: 14,
            borderRadius: 999,
            background: grad('#e2a074', '#96552f'),
            border: '1px solid rgba(0,0,0,0.35)',
            opacity: over(lf, 150, 8),
            zIndex: 10,
          }}
        />
      ) : null}

      {/* warm doorway spill, frame right */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 300,
          width: 120,
          height: 400,
          background: 'linear-gradient(to left, rgba(255,206,120,0.20), rgba(255,206,120,0))',
          opacity: 0.6 + 0.2 * Math.sin(lf / 9),
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 6,
          top: 372,
          width: 44,
          height: 268,
          borderRadius: '6px 0 0 6px',
          background: 'linear-gradient(to left, rgba(255,222,150,0.42), rgba(255,222,150,0.06))',
          filter: 'blur(6px)',
          zIndex: 2,
        }}
      />

      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 46,
          width: 1012,
          height: 746,
          background: 'radial-gradient(ellipse at 50% 62%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
          zIndex: 12,
        }}
      />
    </Panel>
  );
};

const S9: React.FC<{ lf: number }> = ({ lf }) => {
  // ===================== LAYOUT ZONES (no overlap) =====================
  // y  74..162  the OS stamp (the ONE header word, punched off the manual spine)
  // y 230..510  the machine: exploded diagram -> assembled + running loop
  // y 470..792  perspective garage floor, lamp cone, sweeping cast shadows
  // y 548..700  bench: CLAYNES manual · leftover bolt + card · tray  ·  mechanic Claude (right)
  // y 692..762  the comment composer (the ask)
  const MX = 280, MY = 230, MW = 436, MH = 280;                       // chassis
  const TX = 342, TY = 284, TW = 308, TH = 178, PER = 2 * (TW + TH);  // loop track
  const ptAt = (u: number) => {
    const d = (((u % 1) + 1) % 1) * PER;
    if (d < TW) return [TX + d, TY];
    if (d < TW + TH) return [TX + TW, TY + (d - TW)];
    if (d < 2 * TW + TH) return [TX + TW - (d - TW - TH), TY + TH];
    return [TX, TY + TH - (d - 2 * TW - TH)];
  };
  const cdist = (a: number, b: number) => { const d = Math.abs(a - b) % 1; return Math.min(d, 1 - d); };

  // ===================== WORK LAMP (swings the whole shot, every shadow sweeps) =====================
  const thd = 7.2 * Math.sin(lf * 0.05 + 0.5);
  const th = (thd * Math.PI) / 180;
  const PVX = 848, CORD = 124;
  const lampX = PVX + Math.sin(th) * CORD, lampY = 48 + Math.cos(th) * CORD;
  const lampOn = interpolate(lf, [0, 4, 6, 9], [0.74, 1, 0.84, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shSweep = -Math.sin(th) * 58;

  // ===================== THE PARTS (the literal beats you just watched) =====================
  const parts = [
    { u: 0.03, ex: [-165, -112], a: GOLD, tag: "DAILY CHECK", no: "01", lo: -64 },
    { u: 0.22, ex: [110, -163], a: SLATE, tag: "MANAGER", no: "02", lo: 46 },
    { u: 0.40, ex: [243, -8], a: GREEN, tag: "FRESH EYES", no: "03", lo: 46 },
    { u: 0.60, ex: [-140, 96], a: CLAY, tag: "PASS / FAIL", no: "04", lo: -64 },
    { u: -1, ex: [-230, 30], a: AMBER, tag: "95%", no: "05", lo: -64 },
  ];
  const homeOf = (i: number) => (parts[i].u < 0 ? [498, 373] : ptAt(parts[i].u));
  const bloom = (i: number) => over(lf, 6 + i * 5, 20, Easing.out(Easing.cubic));
  const conv = (i: number) => over(lf, 28 + i * 5, 16, Easing.out(Easing.back(1.9)));
  const eOf = (i: number) => bloom(i) * (1 - conv(i));         // 1 = exploded, 0 = home (2 frame overshoot)
  const contact = (i: number) => 44 + i * 5;                    // 44 49 54 59 64: a rain of clicks
  const puff = (i: number) => over(lf, contact(i), 13);
  const ghost = 0.34 * (1 - ramp(lf, 40, 62));                  // the printed plan the parts fill in

  // ===================== IGNITION + THE LOOP THAT NEVER STOPS =====================
  const live = ramp(lf, 62, 70);
  const uu = ((lf - 64) / 30) % 1;                              // ~1.8 circuits inside the shot
  const tokOn = lf >= 62 ? 1 : 0;
  const tk = ptAt(uu);
  const stampHit = Math.max(0, 1 - cdist(uu, 0.60) / 0.07) * tokOn;
  const dawnBlink = Math.max(0, 1 - cdist(uu, 0.03) / 0.06) * tokOn;
  const mgrSlide = Math.max(0, 1 - cdist(uu, 0.22) / 0.07) * tokOn;
  const iris = Math.max(0, 1 - cdist(uu, 0.40) / 0.08) * tokOn;
  const ticket = uu > 0.6 && uu < 0.82 && tokOn === 1 ? 1 : 0;

  // ===================== THE OS STAMP =====================
  const rise = over(lf, 68, 10, Easing.out(Easing.cubic));
  const slam = over(lf, 78, 7, Easing.out(Easing.cubic));
  const stX = 232 + (498 - 232) * rise, stY = 578 + (118 - 578) * rise;
  const stScale = (0.26 + rise * 1.52) * (1 - slam * 0.44) * (1 + 0.012 * Math.sin(lf * 0.18));
  const shake = lf >= 78 ? Math.max(0, 1 - (lf - 78) / 7) * 2 * Math.sin(lf * 2.7) : 0;

  // ===================== CLAUDE THE PIT CREW MECHANIC =====================
  const MLEFT = 712, MTOP = 469, MS = 240, K = MS / 200;
  const bob = Math.sin(lf * 0.13) * 3;
  const p1 = over(lf, 44, 10), p2 = over(lf, 56, 8), p3 = over(lf, 80, 8), p4 = over(lf, 100, 10);
  const s1 = over(lf, 84, 4) - over(lf, 88, 3), s2 = over(lf, 90, 4) - over(lf, 94, 3);
  const slapA = Math.max(0, s1) + Math.max(0, s2);
  const impact = Math.max(0, 1 - Math.abs(lf - 88) / 4) + Math.max(0, 1 - Math.abs(lf - 94) / 4);
  const A = [702, 480], B = [770, 578], C = [778, 590], D = [706, 470], E = [686, 676];
  const lhx = A[0] + (B[0] - A[0]) * p1 + (C[0] - B[0]) * p2 + (D[0] - C[0]) * p3 + (E[0] - D[0]) * p4
    - slapA * 20 + (p2 - p3) * Math.sin(lf * 0.9) * 11;
  const lhy = A[1] + (B[1] - A[1]) * p1 + (C[1] - B[1]) * p2 + (D[1] - C[1]) * p3 + (E[1] - D[1]) * p4
    + p4 * Math.sin(lf * 0.22) * 4;
  const torque = (1 - p1) * (-18 + 30 * (0.5 + 0.5 * Math.sin(lf * 0.55)));
  const tossP = over(lf, 44, 11, Easing.inOut(Easing.cubic));
  const wrX = A[0] + (594 - A[0]) * tossP, wrY = A[1] + (566 - A[1]) * tossP - Math.sin(tossP * Math.PI) * 78;
  const wrR = torque + tossP * 372;
  const board = over(lf, 100, 12, Easing.out(Easing.back(1.4)));
  const rhx = 950 + board * 12, rhy = 596 - board * 30;
  const SHL = [MLEFT + 22 * K, MTOP + 99 * K], SHR = [MLEFT + 179 * K, MTOP + 99 * K];
  const arm = (sx: number, sy: number, hx: number, hy: number, k: number) => {
    const dx = hx - sx, dy = hy - sy, L = Math.max(16, Math.sqrt(dx * dx + dy * dy));
    return <div key={`arm${k}`} style={{ position: "absolute", left: sx, top: sy - 11, width: L, height: 22, borderRadius: 11, background: grad("#E08A66", "#B85536"), border: "1.5px solid rgba(60,24,12,0.4)", transformOrigin: "0% 50%", transform: `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`, boxShadow: "0 7px 16px -7px rgba(0,0,0,0.7)", zIndex: 31 }} />;
  };

  // ===================== THE ASK =====================
  const comp = over(lf, 90, 12, Easing.out(Easing.back(1.2)));
  const chipPulse = 0.5 + 0.5 * Math.sin(lf * 0.22);
  const caret = (lf % 26) < 14 ? 1 : 0;
  const gy = interpolate(lf, [0, 70], [-7, 4], { extrapolateRight: "clamp" }) + Math.sin(lf * 0.04) * 1.6;

  return (
    <Panel label="comment OS">
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.6}px)` }}>

        {/* ---------- BACK WALL: dim pegboard, swaying tools, the retired L plate ---------- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 46, height: 424, background: grad("#16233C", "#0C1526") }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 46, height: 424, opacity: 0.3, backgroundImage: "radial-gradient(rgba(150,175,225,0.5) 1.5px, transparent 1.6px)", backgroundSize: "26px 26px" }} />
        {[{ x: 62, w: 15, h: 82 }, { x: 100, w: 32, h: 60 }, { x: 152, w: 12, h: 94 }].map((t, i) => {
          const sw = Math.sin(lf * 0.05 + 0.5 + i * 0.4) * 2.6;
          return <div key={`tool${i}`} style={{ position: "absolute", left: t.x, top: 92, width: t.w, height: t.h, borderRadius: 6, background: "rgba(120,150,205,0.16)", border: "1px solid rgba(150,180,235,0.18)", transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }} />;
        })}
        <div style={{ position: "absolute", left: 76, top: 300, width: 116, height: 96, opacity: 0.62, transform: `rotate(${-4 + Math.sin(lf * 0.05) * 0.9}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "rgba(120,90,60,0.5)", border: "3px solid rgba(150,115,72,0.6)" }} />
          <div style={{ position: "absolute", left: 12, top: 12, width: 42, height: 72, borderRadius: 6, background: "#EFEAE0", clipPath: "polygon(0 0,100% 0,86% 26%,100% 52%,84% 78%,100% 100%,0 100%)", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 58, top: 15, width: 44, height: 72, borderRadius: 6, background: "#E4DED2", clipPath: "polygon(12% 0,100% 0,100% 100%,10% 100%,24% 76%,8% 50%,22% 24%)", transform: "rotate(6deg)", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 18, top: 22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: RED, lineHeight: 1 }}>L</div>
          <div style={{ position: "absolute", left: 54, top: 2, width: 9, height: 9, borderRadius: "50%", background: GOLD, boxShadow: "0 2px 5px rgba(0,0,0,0.6)" }} />
        </div>

        {/* ---------- FLOOR: perspective boards receding to the wall ---------- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "linear-gradient(180deg, #101B2E 0%, #17253C 34%, #0B1322 100%)" }} />
        <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: 13 }).map((_, i) => <line key={`fl${i}`} x1={498} y1={470} x2={-420 + i * 160} y2={792} stroke="rgba(150,180,235,0.14)" strokeWidth={2} />)}
          {[486, 512, 552, 610, 692, 792].map((y, i) => <line key={`fh${i}`} x1={0} y1={y} x2={1012} y2={y} stroke="rgba(150,180,235,0.09)" strokeWidth={2} />)}
          <line x1={0} y1={470} x2={1012} y2={470} stroke="rgba(160,195,245,0.28)" strokeWidth={3} />
        </svg>

        {/* ---------- KEY LIGHT: the swinging lamp, its cone, its dust ---------- */}
        <div style={{ position: "absolute", left: PVX - 1, top: 46, width: 3, height: CORD, background: "rgba(190,210,245,0.45)", transformOrigin: "50% 0%", transform: `rotate(${-thd}deg)` }} />
        <div style={{ position: "absolute", left: lampX - 250, top: lampY - 6, width: 500, height: 640, transformOrigin: "50% 0%", transform: `rotate(${-thd - 12}deg)`, background: `radial-gradient(ellipse at 50% 0%, rgba(255,226,168,${0.3 * lampOn}) 0%, rgba(255,216,150,${0.12 * lampOn}) 40%, transparent 74%)`, clipPath: "polygon(43% 0,57% 0,100% 100%,0% 100%)", filter: "blur(3px)", zIndex: 6 }} />
        {Array.from({ length: 16 }).map((_, i) => {
          const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2);
          const yy = 190 + ((r * 480 + lf * (0.5 + r2 * 0.9)) % 470);
          const xx = lampX - 190 + r2 * 300 + Math.sin(lf * 0.04 + i) * 12;
          return <div key={`mote${i}`} style={{ position: "absolute", left: xx, top: yy, width: 3 + r * 3, height: 3 + r * 3, borderRadius: "50%", background: "rgba(255,238,200,0.85)", opacity: (0.2 + r * 0.4) * lampOn, zIndex: 7 }} />;
        })}
        <div style={{ position: "absolute", left: lampX - 34, top: lampY - 4, width: 68, height: 40, transformOrigin: "50% 0%", transform: `rotate(${-thd - 12}deg)`, borderRadius: "6px 6px 30px 30px", background: grad("#8FA2C4", "#3D4F72"), border: "2px solid rgba(200,220,250,0.4)", boxShadow: `0 0 ${22 * lampOn}px rgba(255,224,160,0.75)`, zIndex: 8 }}>
          <div style={{ position: "absolute", left: 18, bottom: -7, width: 30, height: 16, borderRadius: "50%", background: "#FFEEC4", boxShadow: `0 0 ${18 * lampOn}px rgba(255,224,160,0.95)`, opacity: lampOn }} />
        </div>

        {/* ---------- BENCH ---------- */}
        <div style={{ position: "absolute", left: 46, top: 596, width: 634, height: 26, borderRadius: 7, background: grad("#6E5E48", "#3E3325"), border: "2px solid rgba(230,200,150,0.28)", boxShadow: "0 20px 40px -14px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,232,190,0.28)", zIndex: 12 }} />
        <div style={{ position: "absolute", left: 46, top: 620, width: 634, height: 9, background: "rgba(0,0,0,0.42)", zIndex: 12 }} />
        {[92, 618].map((x, i) => <div key={`lg${i}`} style={{ position: "absolute", left: x + shSweep * 0.06, top: 626, width: 22, height: 74, background: grad("#4C4030", "#241D14"), borderRadius: 4, zIndex: 11 }} />)}
        <div style={{ position: "absolute", left: 308 + shSweep, top: 590, width: 300, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(9px)", zIndex: 13 }} />

        {/* ---------- THE CLAYNES MANUAL: open on the bench, pages fanning up ---------- */}
        <div style={{ position: "absolute", left: 96, top: 548, width: 274, height: 56, transform: `perspective(700px) rotateX(46deg) translateY(${(1 - over(lf, 0, 8, Easing.out(Easing.back(2)))) * -14}px)`, zIndex: 14 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 132, height: 56, borderRadius: "5px 2px 2px 5px", background: grad("#E9C34E", "#C99A2B"), border: "2px solid rgba(60,44,10,0.5)", boxShadow: "0 16px 30px -10px rgba(0,0,0,0.8)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 132, height: 13, background: SLATE }} />
            <div style={{ position: "absolute", left: 6, top: 2, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 9, color: "#F4EEE2", letterSpacing: "0.06em" }}>CLAYNES</div>
            <div style={{ position: "absolute", left: 6, top: 17, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#3A2C08", lineHeight: 1.05 }}>AGENTIC OS</div>
            <div style={{ position: "absolute", left: 6, top: 32, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 6, color: "rgba(58,44,8,0.85)", lineHeight: 1.15 }}>OWNER'S WORKSHOP MANUAL</div>
            <div style={{ position: "absolute", left: 6, top: 46, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 4.5, color: "rgba(58,44,8,0.6)" }}>does not cover diesel</div>
            <div style={{ position: "absolute", right: 5, top: 20, width: 34, height: 30, borderRadius: 3, background: "rgba(255,255,255,0.28)", border: "1px solid rgba(60,44,10,0.4)" }} />
          </div>
          <div style={{ position: "absolute", left: 132, top: 0, width: 10, height: 56, background: grad("#B98C22", "#7C5C12"), borderTop: "1px solid rgba(255,235,180,0.5)" }}>
            <div style={{ position: "absolute", left: 1, top: 22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 8, color: "rgba(255,240,200,0.9)", opacity: rise > 0.05 ? 0.25 : 1 }}>OS</div>
          </div>
          <div style={{ position: "absolute", left: 142, top: 0, width: 132, height: 56, borderRadius: "2px 5px 5px 2px", background: grad("#FBF7EC", "#DED6C4"), border: "2px solid rgba(60,44,10,0.4)", boxShadow: "0 16px 30px -10px rgba(0,0,0,0.8)", overflow: "hidden" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={`ln${i}`} style={{ position: "absolute", left: 8, top: 9 + i * 7, width: 90 - i * 9, height: 2, background: "rgba(40,52,80,0.35)" }} />)}
            <div style={{ position: "absolute", right: 8, top: 10, width: 30, height: 36, borderRadius: 3, border: "1.5px dashed rgba(40,52,80,0.5)" }} />
          </div>
          {parts.map((p, i) => {
            const fan = over(lf, 4 + i * 5, 9, Easing.out(Easing.cubic));
            const gone = over(lf, 6 + i * 5, 10);
            return <div key={`pg${i}`} style={{ position: "absolute", left: 142, top: 0, width: 132, height: 56, borderRadius: "2px 5px 5px 2px", background: grad("#FDFAF2", "#E6DFCE"), border: "1.5px solid rgba(60,44,10,0.35)", transformOrigin: "0% 50%", transform: `rotateY(${-fan * 128}deg) translateZ(${i * 0.6}px)`, opacity: (1 - gone) * 0.95, boxShadow: "0 10px 18px -8px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "absolute", left: 10, top: 14, width: 40, height: 26, borderRadius: 3, background: p.a, opacity: 1 - gone }} />
              <div style={{ position: "absolute", left: 58, top: 16, width: 54, height: 3, background: "rgba(40,52,80,0.4)" }} />
              <div style={{ position: "absolute", left: 58, top: 25, width: 40, height: 3, background: "rgba(40,52,80,0.28)" }} />
            </div>;
          })}
        </div>

        {/* ---------- flat pack gag: one leftover bolt + a wordless helpline card ---------- */}
        <div style={{ position: "absolute", left: 452, top: 566, width: 34, height: 34, zIndex: 15, transform: `rotate(${lf * 0.9}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: grad("#C9D2E2", "#69748C"), border: "2px solid rgba(20,28,44,0.5)", clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)", boxShadow: "0 8px 14px -6px rgba(0,0,0,0.8)" }} />
          <div style={{ position: "absolute", left: 11, top: 11, width: 12, height: 12, borderRadius: "50%", background: "#2C3549" }} />
        </div>
        <div style={{ position: "absolute", left: 498, top: 556, width: 62, height: 44, zIndex: 15, transform: "perspective(500px) rotateX(38deg) rotate(-6deg)", borderRadius: 4, background: "#F4EFE2", border: "1.5px solid rgba(40,30,16,0.5)", boxShadow: "0 10px 18px -8px rgba(0,0,0,0.8)" }}>
          <div style={{ position: "absolute", left: 8, top: 7, width: 10, height: 10, borderRadius: "50%", background: "#2A3348" }} />
          <div style={{ position: "absolute", left: 11, top: 18, width: 4, height: 14, background: "#2A3348" }} />
          <div style={{ position: "absolute", left: 22, top: 12, width: 9, height: 14, borderRadius: 2, background: "#2A3348" }} />
          <div style={{ position: "absolute", left: 36, top: 10, width: 20, height: 20, borderRadius: "50%", border: `2.5px solid ${RED}` }} />
          <div style={{ position: "absolute", left: 37, top: 19, width: 22, height: 2.5, background: RED, transform: "rotate(-45deg)" }} />
        </div>
        <div style={{ position: "absolute", left: 556, top: 562, width: 78, height: 30, zIndex: 15, transform: "perspective(500px) rotateX(44deg)", borderRadius: 5, background: grad("#5A6480", "#2A3348"), border: "2px solid rgba(190,210,245,0.35)", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.6)" }} />

        {/* ---------- the price tag prop ---------- */}
        <div style={{ position: "absolute", left: 736, top: 262 + Math.sin(lf * 0.09) * 5, width: 178, height: 40, zIndex: 24, opacity: 0.92 * over(lf, 86, 10), transform: `rotate(${-7 + Math.sin(lf * 0.07) * 2}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: grad("#F3E6C4", "#D7C48E"), border: "2px solid rgba(70,52,16,0.5)", clipPath: "polygon(12% 0,100% 0,100% 100%,12% 100%,0 50%)", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.8)" }} />
          <div style={{ position: "absolute", left: 12, top: 15, width: 9, height: 9, borderRadius: "50%", background: "#4A3A14" }} />
          <div style={{ position: "absolute", left: 27, top: 11, whiteSpace: "nowrap", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#3A2C08" }}>runs while you sleep</div>
        </div>

        {/* ================= THE MACHINE: exploded view -> one running rig ================= */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, transformOrigin: "498px 370px", transform: `perspective(1100px) rotateY(${gy}deg) translateY(${Math.sin(lf * 0.08) * 3 + impact * 3}px) translateX(${impact * 4}px)` }}>
          {/* the printed plan: present at frame 0, filled in by the real parts */}
          {ghost > 0.005 && <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
            <rect x={MX} y={MY} width={MW} height={MH} rx={22} fill="none" stroke="rgba(160,195,245,0.5)" strokeWidth={2} strokeDasharray="10 8" strokeDashoffset={-lf * 0.5} opacity={ghost} />
            {parts.map((p, i) => { const h = homeOf(i); const W = i === 4 ? 88 : 108, H = i === 4 ? 88 : 72; return <rect key={`gh${i}`} x={h[0] - W / 2} y={h[1] - H / 2} width={W} height={H} rx={i === 4 ? 44 : 12} fill="none" stroke="rgba(160,195,245,0.55)" strokeWidth={2} strokeDasharray="6 6" strokeDashoffset={lf * 0.5} opacity={ghost} />; })}
          </svg>}

          {/* chassis draws in as the parts rain home */}
          <div style={{ position: "absolute", left: MX, top: MY, width: MW, height: MH, borderRadius: 22, background: "linear-gradient(160deg, rgba(38,54,86,0.9), rgba(16,26,46,0.9))", border: `2px solid rgba(150,180,235,${0.18 + ramp(lf, 26, 60) * 0.3})`, opacity: ramp(lf, 24, 58), boxShadow: `0 30px 60px -20px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.5), 0 0 ${live * 26}px rgba(231,178,76,0.28)` }} />
          <div style={{ position: "absolute", left: MX + MW - 12, top: MY + 16, width: 6, height: MH - 32, borderRadius: 3, background: "rgba(255,232,180,0.22)", opacity: ramp(lf, 26, 58) }} />
          <div style={{ position: "absolute", left: MX + 16, top: MY + 12, width: MW - 32, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)", opacity: ramp(lf, 26, 58) }} />

          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
            <rect x={TX} y={TY} width={TW} height={TH} rx={10} fill="none" stroke="rgba(150,180,235,0.22)" strokeWidth={13} opacity={ramp(lf, 30, 60) * 0.5} />
            <rect x={TX} y={TY} width={TW} height={TH} rx={10} fill="none" stroke={`rgba(231,178,76,${0.2 + live * 0.35})`} strokeWidth={7} strokeDasharray="12 9" strokeDashoffset={-lf * 1.6} opacity={ramp(lf, 30, 60)} />
            {parts.map((p, i) => {
              const e = eOf(i), h = homeOf(i);
              const px = h[0] + p.ex[0] * e, py = h[1] + p.ex[1] * e;
              const dl = over(lf, 8 + i * 5, 14);
              const len = Math.sqrt(Math.pow(h[0] - px, 2) + Math.pow(h[1] - py, 2));
              return <line key={`ld${i}`} x1={px} y1={py} x2={px + (h[0] - px) * dl} y2={py + (h[1] - py) * dl} stroke="rgba(190,215,255,0.5)" strokeWidth={1.5} strokeDasharray="5 4" strokeDashoffset={-lf * 0.6} opacity={Math.min(1, e * 1.6) * (len > 12 ? 1 : 0)} />;
            })}
          </svg>

          {/* the belt that carries the ticket back to the dawn module */}
          <div style={{ position: "absolute", left: TX - 7, top: TY + 8, width: 14, height: TH - 16, borderRadius: 7, background: `repeating-linear-gradient(180deg, rgba(231,178,76,${0.25 + live * 0.3}) 0 8px, rgba(20,30,52,0.6) 8px 16px)`, backgroundPosition: `0 ${-lf * 2.2}px`, opacity: ramp(lf, 34, 60), border: "1px solid rgba(150,180,235,0.25)" }} />

          {parts.map((p, i) => {
            const e = eOf(i), h = homeOf(i);
            const x = h[0] + p.ex[0] * e, y = h[1] + p.ex[1] * e;
            const rot = e * (7 + i * 3) + e * lf * (0.5 + i * 0.12);
            const born = over(lf, 6 + i * 5, 6);
            const flash = Math.max(0, 1 - Math.abs(lf - contact(i)) / 5);
            const W = i === 4 ? 88 : 108, H = i === 4 ? 88 : 72;
            return (
              <div key={`pt${i}`} style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H, opacity: born, transform: `rotate(${rot}deg) scale(${(0.5 + born * 0.5) * (1 + e * 0.05)})`, zIndex: 22 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: i === 4 ? "50%" : 12, background: i === 4 ? grad("#20304E", "#0D1526") : grad("#2C4066", "#13203A"), border: `2.5px solid ${p.a}`, boxShadow: `0 16px 30px -12px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.08), 0 0 ${flash * 26}px ${p.a}` }} />
                {/* 01 DAILY CHECK: the cheap dawn sweep, blinks when the token arrives */}
                {i === 0 && <>
                  <div style={{ position: "absolute", left: 14, bottom: 14, width: 80, height: 3, background: GOLD, opacity: 0.7 }} />
                  <div style={{ position: "absolute", left: 34, bottom: 17, width: 40, height: 40, borderRadius: "50% 50% 0 0", background: `radial-gradient(circle at 50% 100%, ${GOLD}, rgba(231,178,76,0.15) 70%)`, opacity: 0.6 + dawnBlink * 0.4 }} />
                  <div style={{ position: "absolute", left: 10, top: 9, width: 11, height: 11, borderRadius: "50%", background: dawnBlink > 0.2 ? "#FFF0BE" : "rgba(231,178,76,0.35)", boxShadow: dawnBlink > 0.2 ? `0 0 ${10 + dawnBlink * 14}px ${GOLD}` : "none" }} />
                </>}
                {/* 02 MANAGER: writes the work order and slides it away */}
                {i === 1 && <>
                  <div style={{ position: "absolute", left: 12, bottom: 13, width: 84, height: 8, borderRadius: 3, background: "rgba(190,215,255,0.5)" }} />
                  <div style={{ position: "absolute", left: 14 + mgrSlide * 54, bottom: 23, width: 26, height: 32, borderRadius: 3, background: PAPER, border: `2px solid ${SLATE}`, boxShadow: "0 5px 10px -4px rgba(0,0,0,0.8)" }}>
                    <div style={{ position: "absolute", left: 5, top: 5, width: 14, height: 2.5, background: "rgba(40,52,80,0.6)" }} />
                    <div style={{ position: "absolute", left: 5, top: 11, width: 10, height: 2.5, background: "rgba(40,52,80,0.45)" }} />
                  </div>
                  <div style={{ position: "absolute", left: 18, top: 9, width: 20, height: 6, borderRadius: 3, background: SLATE }} />
                </>}
                {/* 03 FRESH EYES: a blindfold that lifts, an iris that opens and closes */}
                {i === 2 && <>
                  <div style={{ position: "absolute", left: 26, top: 14, width: 56, height: 44, borderRadius: "50%", background: "#EAF1FF", border: "2px solid rgba(40,60,96,0.6)", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 28 - 14 * (0.35 + iris * 0.65), top: 22 - 14 * (0.35 + iris * 0.65), width: 28 * (0.35 + iris * 0.65), height: 28 * (0.35 + iris * 0.65), borderRadius: "50%", background: grad(GREEN, "#1F5C46") }} />
                    <div style={{ position: "absolute", left: 0, top: 0, width: 56, height: 44 * (1 - iris * 0.85), background: "#1A2338" }} />
                  </div>
                  <div style={{ position: "absolute", left: 6, top: 28, width: 96, height: 7, background: "rgba(120,150,205,0.5)", transform: `translateY(${iris * -20}px)` }} />
                </>}
                {/* 04 PASS / FAIL: the stamp head, always bobbing, punching on every pass */}
                {i === 3 && <>
                  <div style={{ position: "absolute", left: 41, top: 5 + (1 - stampHit) * 4 + Math.sin(lf * 0.3) * 1.4, width: 26, height: 16, borderRadius: 4, background: grad("#8FA2C4", "#3D4F72") }} />
                  <div style={{ position: "absolute", left: 27, top: 20 + stampHit * 16 + Math.sin(lf * 0.3) * 1.4, width: 54, height: 24, borderRadius: 5, background: grad("#E08A66", "#B0492A"), border: "2px solid rgba(60,24,12,0.5)", boxShadow: `0 6px 12px -4px rgba(0,0,0,0.8), 0 0 ${stampHit * 18}px ${CLAY}` }} />
                  <div style={{ position: "absolute", left: 19, bottom: 7, width: 70, height: 5, borderRadius: 3, background: "rgba(190,215,255,0.4)" }} />
                </>}
                {/* 05 the 95% dial, red tick at 90, needle never stops jittering */}
                {i === 4 && <>
                  <svg viewBox="0 0 88 88" width={88} height={88} style={{ position: "absolute", left: 0, top: 0 }}>
                    <path d="M 15 68 A 31 31 0 1 1 73 68" fill="none" stroke="rgba(190,215,255,0.3)" strokeWidth={5} strokeLinecap="round" />
                    <path d="M 15 68 A 31 31 0 1 1 73 68" fill="none" stroke={AMBER} strokeWidth={5} strokeLinecap="round" strokeDasharray={150} strokeDashoffset={150 - 150 * (0.28 + over(lf, 66, 9) * 0.72)} />
                    <line x1={67} y1={63} x2={74} y2={69} stroke={RED} strokeWidth={4} strokeLinecap="round" />
                    {(() => {
                      const ang = -222 + (0.28 + over(lf, 66, 9) * 0.72) * 264 + Math.sin(lf * 0.62) * 1.6 + Math.sin(lf * 1.7) * 0.7;
                      const rad = (ang * Math.PI) / 180;
                      return <line x1={44} y1={57} x2={44 + Math.cos(rad) * 27} y2={57 + Math.sin(rad) * 27} stroke="#FFF0BE" strokeWidth={3.5} strokeLinecap="round" />;
                    })()}
                    <circle cx={44} cy={57} r={5} fill={AMBER} />
                  </svg>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 22, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#F7EFD9", textShadow: `0 0 12px ${AMBER}` }}>95%</div>
                  <div style={{ position: "absolute", right: -1, top: 56, fontFamily: mono, fontSize: 9, color: "rgba(230,170,150,0.9)" }}>90</div>
                </>}
                <div style={{ position: "absolute", left: 5, bottom: 2, fontFamily: mono, fontSize: 9, color: "rgba(190,215,255,0.55)" }}>{p.no}</div>
              </div>
            );
          })}

          {/* labels: technical manual texture while exploded, they retire once it is ONE machine */}
          {parts.map((p, i) => {
            if (i === 4) return null;
            const e = eOf(i), h = homeOf(i);
            const x = h[0] + p.ex[0] * e, y = h[1] + p.ex[1] * e;
            const fade = Math.min(over(lf, 10 + i * 5, 8), 1 - ramp(lf, 52, 64));
            return <div key={`lb${i}`} style={{ position: "absolute", left: x - 64, top: y + p.lo, width: 128, textAlign: "center", opacity: fade, zIndex: 23, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.05em", color: "rgba(215,232,255,0.92)", textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>{p.tag}</div>;
          })}

          {/* contact dust puffs */}
          {parts.map((p, i) => {
            const pf = puff(i);
            if (pf <= 0 || pf >= 1) return null;
            const h = homeOf(i);
            return <div key={`pf${i}`} style={{ position: "absolute", left: h[0] - 40, top: h[1] - 40, width: 80, height: 80, borderRadius: "50%", border: `3px solid ${p.a}`, transform: `scale(${0.3 + pf * 1.5})`, opacity: (1 - pf) * 0.8, zIndex: 24 }} />;
          })}

          {/* the tray the PASS ticket drops into */}
          <div style={{ position: "absolute", left: 376, top: 452, width: 62, height: 20, borderRadius: 4, background: grad("#41527A", "#1B2740"), border: "1.5px solid rgba(190,215,255,0.35)", opacity: ramp(lf, 40, 62), zIndex: 21 }} />

          {/* THE TOKEN: it never stops going round */}
          {tokOn === 1 && <>
            <div style={{ position: "absolute", left: tk[0] - 20, top: tk[1] - 20, width: 40, height: 40, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}55, transparent 68%)`, zIndex: 25 }} />
            <div style={{ position: "absolute", left: tk[0] - 11, top: tk[1] - 11, width: 22, height: 22, borderRadius: "50%", background: "#FFF0BE", boxShadow: `0 0 20px ${GOLD}, 0 0 40px ${GOLD}88`, zIndex: 26 }} />
            {ticket === 1 && <div style={{ position: "absolute", left: tk[0] - 15, top: tk[1] - 32, width: 30, height: 20, borderRadius: 3, background: PAPER, border: `2px solid ${GREEN}`, zIndex: 27, boxShadow: "0 5px 10px -4px rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, color: GREEN }}>✓</div>}
          </>}

          {/* exhaust shimmer, always rising */}
          {Array.from({ length: 6 }).map((_, i) => {
            const r = seed(i * 4.3 + 1);
            const yy = (lf * (1.1 + r) + r * 60) % 64;
            return <div key={`hz${i}`} style={{ position: "absolute", left: 330 + r * 300 + Math.sin(lf * 0.09 + i) * 7, top: 226 - yy, width: 26, height: 8, borderRadius: 6, background: "rgba(255,228,178,0.16)", filter: "blur(3px)", opacity: (1 - yy / 64) * 0.8 * live, zIndex: 19 }} />;
          })}
        </div>

        {/* ================= THE OS STAMP (the one header) ================= */}
        {rise > 0.02 && <div style={{ position: "absolute", left: stX - 118, top: stY - 44, width: 236, height: 88, zIndex: 40, transform: `scale(${stScale}) rotate(${(1 - rise) * -14 + (1 - slam) * 3}deg)`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: `5px solid ${CLAY}`, background: "rgba(210,114,78,0.1)", boxShadow: `0 0 ${26 + (1 - slam) * 30}px rgba(210,114,78,0.6)` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: "0.04em", color: "#F7EFD9", textShadow: `0 0 22px ${CLAY}, 0 4px 0 rgba(120,44,20,0.6)` }}>OS</div>
        </div>}
        {slam > 0 && slam < 1 && <div style={{ position: "absolute", left: 328, top: 34, width: 340, height: 168, borderRadius: 26, border: `4px solid ${CLAY}`, opacity: (1 - slam) * 0.8, transform: `scale(${1 + slam * 0.7})`, zIndex: 39 }} />}

        {/* ================= CLAUDE, PIT CREW MECHANIC ================= */}
        <div style={{ position: "absolute", left: 712 + shSweep * 0.4, top: 668, width: 240, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(8px)", zIndex: 14 }} />
        <div style={{ position: "absolute", left: MLEFT, top: MTOP + bob, width: MS, height: MS, zIndex: 30 }}>
          <Mascot lf={lf} size={MS} nodAmp={0} nodSpeed={10} gaze={lf > 96 ? -3 : -1} cheer={0} />
          {/* navy coverall: rolled collar, gold zip, name strip, shop rag */}
          <div style={{ position: "absolute", left: 34 * K, top: 108 * K, width: 132 * K, height: 38 * K, background: grad("#2C3E63", "#16223B") }} />
          <div style={{ position: "absolute", left: 34 * K, top: 108 * K, width: 132 * K, height: 7 * K, background: "#3B5077", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 99 * K, top: 113 * K, width: 3, height: 33 * K, background: GOLD, boxShadow: `0 0 6px ${GOLD}` }} />
          <div style={{ position: "absolute", left: 108 * K, top: 122 * K, width: 42 * K, height: 12 * K, borderRadius: 2, background: "#E9E3D5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 9, color: "#26344F", letterSpacing: "0.06em" }}>CLAUDE</div>
          <div style={{ position: "absolute", left: 40 * K, top: 130 * K, width: 20 * K, height: 24 * K, borderRadius: "4px 4px 8px 8px", background: grad("#D0503A", "#8E2E1E"), transform: "rotate(7deg)", boxShadow: "0 4px 8px -3px rgba(0,0,0,0.7)" }} />
          {/* the proud closed mouth half smile: licensed and signed off */}
          {lf > 70 && <div style={{ position: "absolute", left: 84 * K, top: 96 * K, width: 32 * K, height: 11 * K, borderBottom: "3px solid #151312", borderRadius: "0 0 16px 16px", opacity: over(lf, 70, 8) }} />}
          {/* goggles pushed up on the forehead, clean smudge line under them */}
          <div style={{ position: "absolute", left: 33 * K, top: 48 * K, width: 134 * K, height: 17 * K, borderRadius: 8, background: grad("#33456A", "#18243D"), border: "1.5px solid rgba(190,215,255,0.35)" }} />
          {[66, 116].map((x, i) => <div key={`gl${i}`} style={{ position: "absolute", left: x * K, top: 49 * K, width: 18 * K, height: 15 * K, borderRadius: 5, background: "rgba(176,214,246,0.55)", border: "1.5px solid rgba(230,242,255,0.6)" }} />)}
          <div style={{ position: "absolute", left: 40 * K, top: 66 * K, width: 120 * K, height: 4, background: "rgba(255,244,220,0.22)", borderRadius: 2 }} />
          {/* folded brim pit cap, worn slightly backward, OS patch */}
          <div style={{ position: "absolute", left: 44 * K, top: 22 * K, width: 112 * K, height: 25 * K, borderRadius: "12px 12px 3px 3px", background: grad("#31446B", "#17233C"), border: "1.5px solid rgba(190,215,255,0.28)" }} />
          <div style={{ position: "absolute", left: 24 * K, top: 36 * K, width: 26 * K, height: 9 * K, borderRadius: 4, background: "#1B2942", transform: "rotate(-9deg)" }} />
          <div style={{ position: "absolute", left: 92 * K, top: 27 * K, width: 30 * K, height: 15 * K, borderRadius: 4, background: grad("#F0CB63", "#D39A2A"), border: "1px solid rgba(80,58,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#3a2a05" }}>OS</div>
          {/* grease smudge on the cheek */}
          <div style={{ position: "absolute", left: 128 * K, top: 90 * K, width: 24 * K, height: 9 * K, borderRadius: "50%", background: "rgba(20,18,16,0.4)", transform: "rotate(-14deg)" }} />
        </div>

        {/* arms, gloves, wrench: moving for the entire shot */}
        {arm(SHL[0], SHL[1] + bob, lhx, lhy, 1)}
        {arm(SHR[0], SHR[1] + bob, rhx, rhy, 2)}
        <div style={{ position: "absolute", left: lhx - 16, top: lhy - 16, width: 32, height: 32, borderRadius: 10, background: grad("#3B5077", "#1A2740"), border: "2px solid rgba(190,215,255,0.4)", zIndex: 33, transform: `rotate(${p4 * -26}deg)`, boxShadow: "0 6px 12px -5px rgba(0,0,0,0.8)" }}>
          {p4 > 0.5 && <div style={{ position: "absolute", left: -24, top: 10, width: 28, height: 11, borderRadius: 6, background: grad("#E08A66", "#C05B39"), border: "1.5px solid rgba(60,24,12,0.4)" }} />}
        </div>
        <div style={{ position: "absolute", left: rhx - 15, top: rhy - 15, width: 30, height: 30, borderRadius: 10, background: grad("#3B5077", "#1A2740"), border: "2px solid rgba(190,215,255,0.4)", zIndex: 33 }} />
        <div style={{ position: "absolute", left: wrX - 8, top: wrY - 26, width: 16, height: 52, zIndex: 34, transform: `rotate(${wrR}deg)` }}>
          <div style={{ position: "absolute", left: 3, top: 8, width: 10, height: 44, borderRadius: 4, background: grad("#D3DBEA", "#69748C"), border: "1.5px solid rgba(20,28,44,0.55)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 14, borderRadius: 3, background: grad("#D3DBEA", "#69748C"), border: "1.5px solid rgba(20,28,44,0.55)", clipPath: "polygon(0 0,34% 0,34% 42%,66% 42%,66% 0,100% 0,100% 100%,0 100%)" }} />
        </div>
        {impact > 0.02 && <div style={{ position: "absolute", left: 682, top: 436, width: 68, height: 68, borderRadius: "50%", border: `4px solid ${GOLD}`, opacity: impact * 0.85, transform: `scale(${1 + (1 - impact) * 1.4})`, zIndex: 29 }} />}

        {/* the pit board, tipped out toward camera */}
        <div style={{ position: "absolute", left: 928, top: 468, width: 72, height: 84, zIndex: 32, transformOrigin: "0% 50%", transform: `perspective(600px) rotateY(${(1 - board) * 78}deg) rotate(${-6 + Math.sin(lf * 0.12) * 2}deg)`, opacity: 0.35 + board * 0.65 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: grad("#F4EFE2", "#D6CEBC"), border: `3px solid ${GOLD}`, boxShadow: "0 14px 26px -10px rgba(0,0,0,0.85)" }} />
          <div style={{ position: "absolute", left: 11, top: 16, width: 48, height: 32, borderRadius: 8, background: SLATE }} />
          <div style={{ position: "absolute", left: 19, top: 46, width: 14, height: 12, background: SLATE, clipPath: "polygon(0 0,100% 0,0 100%)" }} />
          <div style={{ position: "absolute", left: 11, top: 62, width: 48, height: 5, borderRadius: 3, background: "rgba(40,52,80,0.35)" }} />
        </div>

        {/* the sight line: fingertip -> the chip, dashes always crawling */}
        {p4 > 0.4 && <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 55 }}>
          <line x1={lhx - 26} y1={lhy + 10} x2={262} y2={684} stroke={GOLD} strokeWidth={2.5} strokeDasharray="9 9" strokeDashoffset={lf * 2.4} opacity={0.5 * over(lf, 102, 8)} />
        </svg>}

        {/* ================= THE ASK: a real comment composer ================= */}
        <div style={{ position: "absolute", left: 96, top: 692 + (1 - comp) * 110, width: 820, height: 70, zIndex: 50, opacity: comp }}>
          <div style={{ position: "absolute", left: 0, top: 4, width: 58, height: 58, borderRadius: "50%", background: grad("#E08A66", "#C05B39"), border: "3px solid rgba(255,240,214,0.6)", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.8)" }}>
            <div style={{ position: "absolute", left: 12, top: 20, width: 9, height: 15, background: "#151312", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 30, top: 20, width: 9, height: 15, background: "#151312", borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", left: 74, top: 0, width: 660, height: 70, borderRadius: 999, background: grad("#F7F3EA", "#E2DBCC"), border: "2.5px solid rgba(255,255,255,0.55)", boxShadow: "0 18px 40px -14px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.8)" }} />
          <div style={{ position: "absolute", left: 100, top: 12, transform: `scale(${1 + chipPulse * 0.05})`, transformOrigin: "0% 50%" }}>
            <Chip text="OS" bg={grad("#F0CB63", "#D39A2A")} bd="#F6E4A0" fg="#3a2a05" size={30} />
          </div>
          <div style={{ position: "absolute", left: 100, top: 8, width: 96, height: 54, borderRadius: 18, boxShadow: `0 0 ${10 + chipPulse * 22}px ${GOLD}`, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 206, top: 18, width: 3, height: 34, background: "#3A3428", opacity: caret }} />
          <div style={{ position: "absolute", left: 226, top: 20, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: "rgba(58,52,40,0.4)" }}>Add a comment...</div>
          <div style={{ position: "absolute", left: 756, top: 6, width: 58, height: 58, borderRadius: "50%", background: grad("#E08A66", "#B0492A"), border: "2.5px solid rgba(255,240,214,0.5)", boxShadow: `0 10px 22px -8px rgba(0,0,0,0.8), 0 0 ${chipPulse * 14}px ${CLAY}`, transform: `translateX(${chipPulse * 3}px)` }}>
            <div style={{ position: "absolute", left: 16, top: 16, width: 26, height: 26, background: "#FFF3DE", clipPath: "polygon(0 0,100% 50%,0 100%,18% 50%)" }} />
          </div>
        </div>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 150px rgba(0,0,0,0.55)", zIndex: 60 }} />
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
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const np = (i + 1) / 6;
        const lit = count > i;
        const dt = lit ? t - toolTimes[i] : 99;
        const pp = lit ? 1 + Math.max(0, 1 - dt * 2.2) * 0.5 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 4, transform: "translateX(-50%)", width: 50, height: 50 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pp})`, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${lit ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: lit ? "#3a2a05" : GOLD, boxShadow: lit ? (dt < 0.5 ? `0 0 ${Math.max(8, 26 - dt * 36)}px ${GOLD}` : `0 0 13px ${GOLD}99`) : `0 0 9px ${GOLD}44` }}>{lit ? "✓" : i + 1}</div>
            {lit && dt < 0.7 && <div style={{ position: "absolute", left: 25, top: 25, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + dt * 12})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
          </div>);
      })}
      <div style={{ position: "absolute", right: -22, top: -20, width: 90, height: 90, transform: `translateY(${Math.sin(t * 2.4) * 3}px) scale(${1 + giftOpen * 0.12})`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${giftOpen > 0.1 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + giftOpen * 22}px ${GOLD}66` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, lineHeight: 1, filter: giftOpen > 0.1 ? "none" : "grayscale(0.6) brightness(0.85)", opacity: giftOpen > 0.1 ? 1 : 0.62, transform: `scale(${0.84 + giftOpen * 0.16})` }}>{"🎁"}</div>
      </div>
      <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: pop > 0.05 ? `0 0 ${14 + pop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + pop * 2.4} nodSpeed={6.5} cheer={Math.max(pop * 0.8, count >= 5 ? 0.7 : 0)} capBack={count >= 5 ? 0 : 1} hardHat={count >= 5 ? 1 : 0} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + pop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: pop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>TRUST {count}/5</div>
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

export const ChkS0Reel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.026;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const toolTimes = [L[3], L[4], L[5], L[6], L[7]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_os.wav")} />
      <Audio loop src={staticFile("ebm_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[9]) - 8, fr(L[9]) + 14, 99999], [0, 0.1, 0.1, 0.075, 0.075], { extrapolateRight: "clamp" })} />
      {/* ================= SOUND DESIGN (mapped from the per-scene beat sheets, min 0.30s spacing) ================= */}
      {L.slice(1).map((tt, i) => <Sfx key={`b${i}`} at={tt - 0.07} src="lib_whoosh.wav" v={0.26} dur={0.6} />)}
      <Sfx at={0} src="metal_riser.wav" v={0.42} /><Sfx at={0.06} src="lib_cinematic_hit.wav" v={0.4} />
      {[0, 1.98, 3.96].map((tt, i) => <Sfx key={`eng${i}`} at={tt} src="engine_loop.wav" v={0.2} dur={2.05} />)}
      {/* ===== S0 ===== */}
      <Sfx at={0.0} src="sub.wav" v={0.22} dur={0.8} />
      <Sfx at={0.667} src="rev_up.wav" v={0.34} dur={1.0} />
      <Sfx at={1.733} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={2.067} src="rev_up.wav" v={0.34} dur={1.0} />
      <Sfx at={3.067} src="rev_up.wav" v={0.34} dur={1.0} />
      <Sfx at={3.733} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={4.067} src="rev_up.wav" v={0.34} dur={1.0} />
      <Sfx at={4.667} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={5.333} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={5.667} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={6.4} src="screech.wav" v={0.16} dur={0.7} />
      {/* ===== S1 ===== */}
      <Sfx at={6.44} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={7.04} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={7.573} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={8.107} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={8.64} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={9.173} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={9.707} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={10.24} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={10.773} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={11.373} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S2 ===== */}
      <Sfx at={11.687} src="engine_loop.wav" v={0.16} dur={2.0} />
      <Sfx at={12.12} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={12.753} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={13.353} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={13.92} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={14.32} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S3 ===== */}
      <Sfx at={14.657} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={15.057} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={15.523} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={16.057} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={16.39} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={16.857} src="screech.wav" v={0.2} dur={0.5} />
      <Sfx at={17.257} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={18.123} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={18.99} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={19.857} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={20.323} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={20.723} src="chimehi.wav" v={0.28} dur={0.7} />
      <Sfx at={21.59} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={22.057} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={22.79} src="lib_click.wav" v={0.28} dur={0.35} />
      {/* ===== S4 ===== */}
      <Sfx at={23.167} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={23.767} src="lib_pop.wav" v={0.24} dur={0.4} />
      <Sfx at={24.367} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={24.833} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={25.3} src="swooshdn.wav" v={0.24} dur={0.6} />
      <Sfx at={25.967} src="lib_pop.wav" v={0.24} dur={0.4} />
      <Sfx at={26.4} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S5 ===== */}
      <Sfx at={26.59} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={27.19} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={27.69} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={28.59} src="lib_mactype.wav" v={0.2} dur={0.6} />
      <Sfx at={29.523} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={29.923} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={30.523} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={31.423} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={31.857} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={32.323} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={32.657} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={33.19} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={33.523} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={34.057} src="lib_mactype.wav" v={0.2} dur={0.6} />
      <Sfx at={34.457} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={34.857} src="lib_mactype.wav" v={0.2} dur={0.6} />
      {/* ===== S6 ===== */}
      <Sfx at={35.22} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={35.553} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={36.087} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={36.42} src="screech.wav" v={0.2} dur={0.5} />
      <Sfx at={36.953} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={37.32} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={37.82} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={38.187} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={38.62} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S7 ===== */}
      <Sfx at={38.87} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={39.27} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={39.67} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={40.037} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={40.37} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={40.67} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={41.27} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={41.737} src="lib_pop.wav" v={0.24} dur={0.4} />
      <Sfx at={42.137} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={42.603} src="c_unlock.wav" v={0.34} dur={0.8} />
      <Sfx at={43.67} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={44.137} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={44.537} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={44.937} src="chain_clank.wav" v={0.44} dur={0.6} />
      <Sfx at={45.403} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={45.803} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S8 ===== */}
      <Sfx at={45.9} src="engine_loop.wav" v={0.16} dur={2.0} />
      <Sfx at={46.267} src="ice-in-glass.mp3" v={0.26} dur={0.6} />
      <Sfx at={46.633} src="lib_click.wav" v={0.28} dur={0.35} />
      <Sfx at={47.0} src="lib_correct.wav" v={0.3} dur={0.5} />
      <Sfx at={47.567} src="chimehi.wav" v={0.28} dur={0.7} />
      <Sfx at={47.967} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={48.833} src="lib_boom.wav" v={0.36} dur={0.7} />
      <Sfx at={49.267} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={49.867} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={50.167} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={50.767} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={51.367} src="stamp_press.wav" v={0.38} dur={0.5} />
      {/* ===== S9 ===== */}
      <Sfx at={51.47} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={51.903} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={52.237} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={52.937} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={53.27} src="lib_click.wav" v={0.22} dur={0.3} />
      <Sfx at={53.737} src="lib_whoosh.wav" v={0.26} dur={0.5} />
      <Sfx at={54.07} src="stamp_press.wav" v={0.38} dur={0.5} />
      <Sfx at={54.403} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={54.87} src="tick.wav" v={0.16} dur={0.3} />
      <Sfx at={55.203} src="stamp_press.wav" v={0.38} dur={0.5} />

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
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.45, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
