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

  // ===================== THE STRIP CLOCK =====================
  // travel = how far down the night-shift strip the car gets, in DAYS (0 = MON line, 7 = SUN).
  // Three escalating launches: WED, then FRI, then the whole week. The chain yanks it back twice.
  const T = (f: number) => {
    if (f <= 52) return interpolate(f, [0, 52], [0.7, 3], { ...cl, easing: Easing.in(Easing.quad) });
    if (f <= 58) return interpolate(f, [52, 58], [3, 0], { ...cl, easing: Easing.in(Easing.cubic) });
    if (f <= 112) return interpolate(f, [58, 112], [0.15, 5], { ...cl, easing: Easing.in(Easing.quad) });
    if (f <= 119) return interpolate(f, [112, 119], [5, 0], { ...cl, easing: Easing.in(Easing.cubic) });
    if (f <= 170) return interpolate(f, [119, 170], [0.15, 7], { ...cl, easing: Easing.in(Easing.quad) });
    return 7 + Math.sin((f - 170) * 0.85) * 0.016;   // pinned at the gate, still shuddering at full throttle
  };
  const travel = T(lf);
  // throttle read: never zero (the engine never lets up), capped so the yank-back cannot blow the flames out to sabers
  const spd = Math.min(0.2, Math.max(0.05, Math.abs(T(lf) - T(lf - 1))));

  const pulse = (at: number, len: number) => (lf >= at ? Math.max(0, 1 - (lf - at) / len) : 0);
  const snap1 = pulse(52, 13), snap2 = pulse(112, 15), slamHit = pulse(170, 17);
  const shakeAmt = snap1 * 3.4 + snap2 * 5.4 + slamHit * 8;
  const sx = Math.sin(lf * 3.7) * shakeAmt, sy = Math.cos(lf * 4.3) * shakeAmt * 0.6;

  const smokeAmt = 1 + ramp(lf, 52, 62) * 0.45 + ramp(lf, 112, 122) * 0.6 + ramp(lf, 168, 192) * 1;
  const spin = lf * 34;                                       // slicks: never stop, never slow
  const carRot = -3.4 * Math.min(1, spd * 11) + snap1 * 2.8 + snap2 * 3.6;
  const heroShock = Math.min(0.72, snap1 * 0.5 + snap2 * 0.62 + slamHit * 0.55);

  // hero bob, mirrored so the helmet rides with the head (same maths the mascot uses internally)
  const hopP = Math.max(0, Math.sin(lf / 3));
  const hop = hopP * 1.1 * 2.2 * (1 - heroShock);
  const jump = heroShock > 0.05 ? Math.max(0, 1 - Math.abs(heroShock - 0.35) * 4) * 42 : 0;
  const headY = -hop - jump;

  // header lockup slams in on the second chain snap, then shimmers forever
  const hdr = over(lf, 112, 9, Easing.out(Easing.back(2.8)));
  const hdrScale = interpolate(hdr, [0, 1], [1.22, 1], cl);
  const shim = ((lf * 13) % 1400) - 320;

  // gate, padlock, L-plate flip
  const drop = over(lf, 170, 7, Easing.in(Easing.quad));
  const lockIn = over(lf, 176, 5, Easing.out(Easing.back(3)));
  const lockSwing = Math.sin((lf - 176) * 0.52) * interpolate(lf, [176, 192], [28, 14], cl);
  const plateFlip = over(lf, 176, 6, Easing.out(Easing.cubic)) * 74 + (lf > 176 ? Math.sin((lf - 176) * 0.7) * 9 : 0);

  const MX = (i: number) => 500 + (i - travel) * 130;         // day marker i (0=MON .. 6=SUN)
  const xg = 500 + (10.2 - travel) * 130;                     // the roller gate at the end of the strip
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <Panel label="start-line">
      <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px, ${sy}px)` }}>

        {/* ===================== SET: night sky + far grandstand ===================== */}
        <div style={{ position: "absolute", left: 0, top: 46, width: 1012, height: 358, background: "linear-gradient(180deg,#131B2E 0%,#0F1624 52%,#0A101B 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 250, width: 1012, height: 154, background: "linear-gradient(180deg,transparent,rgba(207,149,68,0.13) 72%,rgba(207,149,68,0.05))" }} />
        <div style={{ position: "absolute", left: 0, top: 330, width: 1012, height: 74, background: grad("#171E2E", "#0D1320"), borderTop: "2px solid rgba(150,180,235,0.12)" }} />
        {Array.from({ length: 30 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          return <div key={"gw" + i} style={{ position: "absolute", left: 18 + r * 976, top: 344 + seed(i * 2.2) * 30, width: 6 + r * 5, height: 4, borderRadius: 2, background: "rgba(231,178,76,0.55)", opacity: 0.22 + Math.abs(Math.sin(lf * 0.05 + i)) * 0.5 }} />;
        })}
        {[40, 950].map((tx, i) => {
          const ph = Math.floor(lf / 26 + i * 2) % 3;
          return (
            <div key={"tl" + i} style={{ position: "absolute", left: tx, top: 236, width: 22, height: 58, borderRadius: 6, background: grad("#2A3145", "#161C2B"), border: "1.5px solid rgba(150,170,215,0.22)", boxShadow: "0 8px 18px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
              {[RED, AMBER, GREEN].map((c, k) => <div key={k} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: ph === k ? 1 : 0.16, boxShadow: ph === k ? `0 0 10px ${c}` : "none" }} />)}
            </div>
          );
        })}

        {/* ===================== SET: floodlight pylons, cones, moths ===================== */}
        {[150, 856].map((px, i) => {
          const sway = Math.sin(lf * 0.022 + i * 2) * 1.6;
          return (
            <div key={"py" + i} style={{ position: "absolute", left: px - 34, top: 96, width: 68, height: 320, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)` }}>
              <div style={{ position: "absolute", left: 22, top: 34, width: 8, height: 286, background: grad("#39415380", "#1B212E") }} />
              <div style={{ position: "absolute", left: 40, top: 34, width: 8, height: 286, background: grad("#39415380", "#1B212E") }} />
              {Array.from({ length: 9 }).map((_, k) => (
                <div key={k} style={{ position: "absolute", left: 22, top: 44 + k * 31, width: 26, height: 4, background: "rgba(140,165,210,0.3)", transform: `skewX(${k % 2 ? 34 : -34}deg)` }} />
              ))}
              <div style={{ position: "absolute", left: 0, top: 6, width: 68, height: 30, borderRadius: 6, background: grad("#48526640", "#232A38"), border: "1.5px solid rgba(180,200,240,0.28)", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ width: 15, height: 15, borderRadius: "50%", background: "#FFF3CE", boxShadow: `0 0 ${14 + Math.sin(lf * 0.5 + k + i) * 5}px #FFE9AE` }} />)}
              </div>
            </div>
          );
        })}
        {[150, 856].map((cx, i) => {
          const sway = Math.sin(lf * 0.022 + i * 2) * 2.4;
          return <div key={"cone" + i} style={{ position: "absolute", left: cx - 250, top: 120, width: 500, height: 660, transformOrigin: "50% 0%", transform: `rotate(${sway}deg)`, background: "linear-gradient(180deg,rgba(255,244,214,0.22),rgba(255,244,214,0.04) 60%,transparent)", clipPath: "polygon(45% 0%, 55% 0%, 97% 100%, 3% 100%)", mixBlendMode: "screen", pointerEvents: "none" }} />;
        })}
        {Array.from({ length: 5 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const dead = i === 1 && lf > 140;
          const fall = dead ? Math.min(300, Math.pow(lf - 140, 2) * 0.34) : 0;
          const bx = (i < 3 ? 150 : 856) + Math.sin(lf * 0.06 + r * 6) * (34 + r * 46);
          const by = 130 + r * 96 + Math.cos(lf * 0.08 + r * 5) * 20 + fall;
          return <div key={"moth" + i} style={{ position: "absolute", left: bx, top: by, width: 7, height: 4, borderRadius: 3, background: "rgba(255,246,220,0.9)", opacity: dead ? Math.max(0, 1 - fall / 300) : 0.8, transform: `rotate(${Math.sin(lf * 0.9 + i) * 44}deg)` }} />;
        })}

        {/* ===================== SET: the strip floor ===================== */}
        <div style={{ position: "absolute", left: 0, top: 404, width: 1012, height: 388, background: "linear-gradient(180deg,#1A2130 0%,#232B3A 30%,#2E3748 100%)" }} />
        <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
          {[-520, -180, 170, 470, 780, 1160, 1560].map((bx, i) => (
            <line key={"lane" + i} x1={bx} y1={792} x2={700} y2={404} stroke="rgba(150,180,235,0.13)" strokeWidth={2} />
          ))}
          {[410, 426, 452, 492, 552, 640, 762].map((yy, i) => (
            <line key={"rib" + i} x1={0} y1={yy} x2={1012} y2={yy} stroke="rgba(150,180,235,0.055)" strokeWidth={2} />
          ))}
        </svg>
        {/* two parallax rows of tarmac dashes: the ground itself rips past */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = ((i * 128 - travel * 118) % 1280 + 1280) % 1280 - 130;
          return <div key={"md" + i} style={{ position: "absolute", left: x, top: 548, width: 48 + spd * 220, height: 5, borderRadius: 3, background: "rgba(214,224,246,0.13)" }} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = ((i * 170 - travel * 210) % 1360 + 1360) % 1360 - 180;
          return <div key={"fd" + i} style={{ position: "absolute", left: x, top: 770, width: 92 + spd * 420, height: 11, borderRadius: 6, background: "rgba(214,224,246,0.2)", filter: "blur(0.5px)" }} />;
        })}

        {/* ===================== THE WEEK, LAID OUT AS DISTANCE ===================== */}
        {DAYS.map((d, i) => {
          const x = MX(i);
          if (x < -120 || x > 1090) return null;
          const on = travel > i - 0.3 ? 1 : 0.4;
          const n = Math.max(0, Math.min(6, Math.round((travel - i) * 3)));
          return (
            <div key={"mk" + i} style={{ position: "absolute", left: x, top: 430 }}>
              <div style={{ position: "absolute", left: 0, top: 38, width: 4, height: 26, background: "rgba(160,180,220,0.4)" }} />
              <div style={{ position: "absolute", left: -33, top: 4, width: 70, height: 34, borderRadius: 8, background: grad("#212A3C", "#151C29"), border: `1.5px solid rgba(231,178,76,${0.28 + on * 0.45})`, boxShadow: `0 8px 18px rgba(0,0,0,0.5), 0 0 ${on * 18}px rgba(231,178,76,${on * 0.3})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 18, fontWeight: 700, color: GOLD, opacity: 0.5 + on * 0.5 }}>{d}</div>
              {Array.from({ length: n }).map((_, k) => {
                const col = k > 2 ? 1 : 0, row = k % 3;
                const pop = Math.min(1, Math.max(0, (travel - i) * 3 - k));
                return <div key={k} style={{ position: "absolute", left: 44 + col * 28, top: 46 - row * 18, width: 25, height: 17, borderRadius: 3, background: grad("#C08A55", "#8A5F38"), border: "1px solid rgba(255,232,190,0.3)", boxShadow: "0 4px 8px rgba(0,0,0,0.45)", transform: `scale(${0.4 + pop * 0.6})`, opacity: 0.5 + pop * 0.5 }} />;
              })}
            </div>
          );
        })}
        {Array.from({ length: 18 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const x = ((r * 1400 - lf * (8 + spd * 300)) % 1400 + 1400) % 1400 - 170;
          const y = 424 + seed(i * 2.7) * 330;
          return <div key={"sl" + i} style={{ position: "absolute", left: x, top: y, width: 44 + spd * 950, height: 2 + r * 2, borderRadius: 2, background: "linear-gradient(90deg,transparent,rgba(214,228,255,0.5))", opacity: Math.min(0.55, spd * 5) }} />;
        })}

        {/* ===================== THE ROLLER GATE ===================== */}
        {xg < 1110 && xg > -140 && (
          <div style={{ position: "absolute", left: xg - 92, top: 292 }}>
            <div style={{ position: "absolute", left: -10, top: 0, width: 204, height: 20, borderRadius: 5, background: grad("#4A5468", "#28303F"), border: "1.5px solid rgba(180,200,240,0.28)", boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }} />
            {[-6, 178].map((rx, i) => <div key={"rail" + i} style={{ position: "absolute", left: rx, top: 18, width: 8, height: 182, background: grad("#39414F", "#1D2430") }} />)}
            <div style={{ position: "absolute", left: 0, top: 20, width: 184, height: 180, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 184, height: 180, transform: `translateY(${-184 + drop * 184}px)`, background: "repeating-linear-gradient(180deg,#3C4658 0 14px,#2A3242 14px 21px)", border: "2px solid rgba(180,200,240,0.3)", borderRadius: 4, boxShadow: "0 18px 32px rgba(0,0,0,0.55), inset 0 0 30px rgba(0,0,0,0.5)" }} />
            </div>
            {lockIn > 0 && (
              <div style={{ position: "absolute", left: 70, top: 150, transformOrigin: "50% 4%", transform: `rotate(${lockSwing}deg) scale(${interpolate(lockIn, [0, 1], [1.8, 1], cl)})`, opacity: lockIn }}>
                <div style={{ position: "absolute", left: 13, top: -14, width: 20, height: 22, borderRadius: "11px 11px 0 0", border: "5px solid #C9CFDC", borderBottom: "none" }} />
                <div style={{ width: 46, height: 38, borderRadius: 8, background: grad("#E7B24C", "#A8762A"), border: "2px solid rgba(255,240,200,0.5)", boxShadow: "0 10px 20px rgba(0,0,0,0.55)" }} />
                <div style={{ position: "absolute", left: 20, top: 14, width: 6, height: 12, borderRadius: 3, background: "rgba(60,40,10,0.6)" }} />
              </div>
            )}
          </div>
        )}

        {/* ===================== THE CHRISTMAS TREE: ambers lit, green bulb unscrewed on the ground ===================== */}
        <div style={{ position: "absolute", left: 744, top: 404 }}>
          <div style={{ position: "absolute", left: 22, top: 16, width: 14, height: 194, background: grad("#38414F", "#1D2430") }} />
          <div style={{ position: "absolute", left: -8, top: 196, width: 74, height: 14, borderRadius: 4, background: grad("#39424F", "#1B2129"), boxShadow: "0 10px 18px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: -2, top: 0, width: 62, height: 200, borderRadius: 10, background: grad("#252D3B", "#141A24"), border: "1.5px solid rgba(180,200,240,0.24)", boxShadow: "0 16px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)" }} />
          {[{ y: 10, s: 11 }, { y: 30, s: 11 }, { y: 54, s: 22 }, { y: 84, s: 22 }, { y: 114, s: 22 }].map((b, i) => (
            <div key={"bulb" + i} style={{ position: "absolute", left: 29 - b.s / 2, top: b.y, width: b.s, height: b.s, borderRadius: "50%", background: AMBER, boxShadow: `0 0 ${11 + Math.sin(lf * 0.3 + i) * 5}px ${AMBER}` }} />
          ))}
          <div style={{ position: "absolute", left: 18, top: 144, width: 22, height: 22, borderRadius: "50%", background: "#080C12", border: "2px solid rgba(120,140,175,0.45)", boxShadow: "inset 0 3px 6px rgba(0,0,0,0.95)" }} />
          <div style={{ position: "absolute", left: 18, top: 172, width: 22, height: 22, borderRadius: "50%", background: RED, boxShadow: `0 0 ${16 + Math.abs(Math.sin(lf * 0.14)) * 22}px ${RED}`, opacity: 0.75 + Math.abs(Math.sin(lf * 0.14)) * 0.25 }} />
          <div style={{ position: "absolute", left: 74, top: 196, width: 46, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(3px)" }} />
          <div style={{ position: "absolute", left: 78, top: 178, width: 24, height: 24, borderRadius: "50%", background: grad("#2E6650", "#16342A"), border: "1.5px solid rgba(120,180,155,0.35)", boxShadow: "0 6px 12px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 100, top: 188, width: 14, height: 8, borderRadius: 2, background: "#8E9099" }} />
        </div>

        {/* ===================== TYRE SMOKE: boiling off the slick, doubling every launch ===================== */}
        {Array.from({ length: 22 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const p = (lf * (0.011 + r * 0.012) + r) % 1;
          const s = (70 + r * 120) * (0.5 + p * 1.5) * (0.8 + smokeAmt * 0.3);
          return <div key={"sm" + i} style={{ position: "absolute", left: 200 + r * 260 - p * 130 - s / 2, top: 756 - p * (200 + r * 150) - s / 2, width: s, height: s, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(236,234,228,0.34), rgba(200,206,222,0.08) 60%, transparent 74%)", opacity: Math.min(0.72, (1 - p) * 0.5 * smokeAmt), filter: "blur(3px)" }} />;
        })}

        {/* ===================== BOLLARD + CHAIN ===================== */}
        <div style={{ position: "absolute", left: 14, top: 690, width: 54, height: 84, borderRadius: "8px 8px 4px 4px", background: grad("#5A6274", "#2C3340"), border: "2px solid rgba(190,205,235,0.25)", boxShadow: "0 18px 30px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", left: 14, top: 706, width: 54, height: 8, background: "rgba(231,178,76,0.65)" }} />
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          const vib = Math.sin(lf * 2.4 + i * 1.4) * (1.3 + snap1 * 5 + snap2 * 6 + slamHit * 3.5);
          return <div key={"ch" + i} style={{ position: "absolute", left: 62 + t * 138, top: 714 - t * 16 + vib, width: 17, height: 12, borderRadius: 5, border: "3px solid #A9B0BD", transform: `rotate(${i % 2 ? 64 : 0}deg)`, boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />;
        })}

        {/* ===================== THE DRAGSTER ===================== */}
        <div style={{ position: "absolute", left: 210, top: 748, width: 470, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(12px)" }} />
        <div style={{ position: "absolute", inset: 0, transformOrigin: "300px 690px", transform: `rotate(${carRot}deg)` }}>
          {/* tail wing, cantilevered back off the axle so the L-plate hangs clear of the slick */}
          <div style={{ position: "absolute", left: 150, top: 586, width: 116, height: 13, borderRadius: 4, background: grad("#D2724E", "#8E4227"), border: "1.5px solid rgba(255,214,180,0.35)", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
          {[152, 252].map((wx, i) => <div key={"ep" + i} style={{ position: "absolute", left: wx, top: 570, width: 8, height: 30, borderRadius: 3, background: grad("#E4E0D6", "#9E9A8E") }} />)}
          <div style={{ position: "absolute", left: 246, top: 596, width: 10, height: 100, background: grad("#7C8494", "#3A404C") }} />
          <div style={{ position: "absolute", left: 196, top: 692, width: 96, height: 12, borderRadius: 6, background: grad("#8F98A8", "#39404D") }} />
          {/* chassis rail + nose */}
          <div style={{ position: "absolute", left: 214, top: 690, width: 440, height: 16, borderRadius: 8, background: grad("#8F98A8", "#39404D"), border: "1.5px solid rgba(210,225,250,0.28)", boxShadow: "0 12px 22px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 626, top: 676, width: 92, height: 28, borderRadius: "8px 24px 24px 8px", background: grad("#E4E0D6", "#B4AFA2"), border: "1.5px solid rgba(255,255,255,0.4)", boxShadow: "0 12px 22px rgba(0,0,0,0.45)" }} />
          {/* cockpit tub (rear wall) */}
          <div style={{ position: "absolute", left: 352, top: 626, width: 136, height: 78, borderRadius: "18px 10px 8px 8px", background: grad("#EDEAE2", "#B9A79C"), border: "2px solid rgba(255,255,255,0.4)", boxShadow: "0 16px 30px rgba(0,0,0,0.5)" }} />
          {/* driver: the rookie. visor up, jaw set */}
          <div style={{ position: "absolute", left: 366, top: 552 }}>
            <Mascot lf={lf} size={120} gaze={0.55} nodAmp={1.1} nodSpeed={5} stern={0.9} shock={heroShock} />
            {/* helmet shell over the crown, visor flipped UP so the eyes read */}
            <div style={{ position: "absolute", left: 12, top: 16, transform: `translateY(${headY}px)` }}>
              <div style={{ position: "absolute", left: -2, top: 0, width: 96, height: 26, borderRadius: "48px 48px 5px 5px", background: grad("#F4F1EA", "#C9C3B4"), border: "2px solid rgba(255,255,255,0.6)", boxShadow: "0 8px 16px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.7)" }} />
              <div style={{ position: "absolute", left: 40, top: 0, width: 13, height: 26, background: "rgba(210,114,78,0.9)" }} />
              <div style={{ position: "absolute", left: -6, top: 18, width: 104, height: 8, borderRadius: 4, background: grad("#D2724E", "#8E4227"), boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", left: 30, top: -4, width: 74, height: 15, borderRadius: 7, background: grad("#9CCDEE", "#3C6B90"), border: "1.5px solid rgba(225,242,255,0.55)", transformOrigin: "0% 100%", transform: "rotate(-40deg)", boxShadow: "0 6px 12px rgba(0,0,0,0.4)" }} />
            </div>
          </div>
          {/* tub front rim, drawn over his lap so he is IN the car */}
          <div style={{ position: "absolute", left: 352, top: 654, width: 148, height: 52, borderRadius: "20px 14px 8px 8px", background: grad("#E8E4DA", "#A9948A"), border: "2px solid rgba(255,255,255,0.45)", boxShadow: "0 -3px 10px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.55)" }} />
          <div style={{ position: "absolute", left: 372, top: 664, width: 26, height: 26, borderRadius: 5, background: PAPER, border: `2px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: RED, boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }}>L</div>
          {/* cowl + the proof: a session card gaffer-taped to the dash, typing all night */}
          <div style={{ position: "absolute", left: 486, top: 660, width: 96, height: 46, borderRadius: "8px 10px 8px 8px", background: grad("#E4E0D6", "#AFA99B"), border: "1.5px solid rgba(255,255,255,0.4)" }} />
          <div style={{ position: "absolute", left: 490, top: 614, width: 92, height: 56, borderRadius: 7, background: grad(TERM, TERM2), border: "1.5px solid rgba(150,180,235,0.4)", boxShadow: "0 10px 18px rgba(0,0,0,0.6)", transform: "rotate(-8deg)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: -9, top: -5, width: 32, height: 12, background: "rgba(220,214,196,0.6)", transform: "rotate(-26deg)" }} />
            <div style={{ position: "absolute", right: -9, top: -5, width: 32, height: 12, background: "rgba(220,214,196,0.6)", transform: "rotate(26deg)" }} />
            {Array.from({ length: 7 }).map((_, i) => {
              const k = Math.floor(lf * 0.55) + i;
              const w = 20 + seed(k * 1.7) * 44;
              const done = seed(k * 2.3) > 0.42;
              return (
                <div key={"tk" + i} style={{ position: "absolute", left: 8, top: 8 + i * 9 - ((lf * 0.55) % 1) * 9, display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: done ? GREEN : AMBER }} />
                  <div style={{ width: w, height: 3, borderRadius: 2, background: done ? "rgba(63,158,116,0.8)" : "rgba(207,149,68,0.6)" }} />
                </div>
              );
            })}
          </div>
          {/* engine + header pipes, blue flame from launch two on */}
          <div style={{ position: "absolute", left: 578, top: 646, width: 62, height: 54, borderRadius: 8, background: grad("#5D6574", "#242A35"), border: "1.5px solid rgba(200,215,240,0.3)", boxShadow: "0 12px 22px rgba(0,0,0,0.5)" }} />
          {[0, 1, 2, 3].map((i) => {
            const fl = 14 + spd * 230 + Math.sin(lf * 1.7 + i * 2) * 8;
            const blue = lf > 60;
            return (
              <div key={"pipe" + i} style={{ position: "absolute", left: 580 + i * 16, top: 620, width: 11, height: 30, borderRadius: 4, background: grad("#C9CFDC", "#6C7482"), transform: "rotate(-16deg)" }}>
                <div style={{ position: "absolute", left: -4, top: -fl, width: 19, height: fl, borderRadius: "10px 10px 4px 4px", background: blue ? "linear-gradient(180deg,rgba(150,210,255,0.04),#7EC8FF 55%,#E8F6FF)" : "linear-gradient(180deg,rgba(231,178,76,0.04),#E7B24C 55%,#FFF0C8)", opacity: 0.6 + Math.abs(Math.sin(lf * 2.1 + i)) * 0.4, filter: "blur(0.7px)" }} />
              </div>
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={"hz" + i} style={{ position: "absolute", left: 572 + i * 16, top: 560 + Math.sin(lf * 0.24 + i) * 9, width: 14, height: 52, borderRadius: 8, background: "rgba(255,236,200,0.1)", filter: "blur(3px)", transform: `skewX(${Math.sin(lf * 0.3 + i * 1.6) * 13}deg)` }} />
          ))}
          {/* front wheel */}
          <div style={{ position: "absolute", left: 640, top: 700, width: 52, height: 52, borderRadius: "50%", background: grad("#2B313C", "#12161D"), border: "4px solid #4C5462", boxShadow: "0 8px 16px rgba(0,0,0,0.5)", transform: `rotate(${spin * 1.7}deg)` }}>
            <div style={{ position: "absolute", left: 8, top: 8, width: 28, height: 28, borderRadius: "50%", background: grad("#8E97A6", "#454C58"), border: "2px solid rgba(220,232,255,0.3)" }} />
            <div style={{ position: "absolute", left: 21, top: 4, width: 3, height: 36, background: "rgba(190,205,235,0.4)" }} />
          </div>
          {/* rear slick: spinning against the clamp, forever */}
          <div style={{ position: "absolute", left: 238, top: 628, width: 124, height: 124, borderRadius: "50%", background: grad("#333A4C", "#0E1219"), border: "6px solid #4B5466", boxShadow: "0 20px 34px rgba(0,0,0,0.6), inset 0 0 26px rgba(0,0,0,0.85)", transform: `rotate(${spin}deg)`, overflow: "hidden" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={"tr" + i} style={{ position: "absolute", left: 55, top: 2, width: 5, height: 108, background: "rgba(150,168,200,0.16)", transformOrigin: "50% 50%", transform: `rotate(${i * 18}deg)` }} />
            ))}
            <div style={{ position: "absolute", left: 38, top: 38, width: 36, height: 36, borderRadius: "50%", background: grad("#7E879A", "#3C4350"), border: "2px solid rgba(210,225,250,0.3)" }} />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={"bo" + i} style={{ position: "absolute", left: 54 + Math.cos((i / 5) * Math.PI * 2) * 12, top: 54 + Math.sin((i / 5) * Math.PI * 2) * 12, width: 5, height: 5, borderRadius: "50%", background: "rgba(230,240,255,0.5)" }} />
            ))}
          </div>
          {/* the wheel clamp: a yellow claw biting the slick, bolted to the ground */}
          <div style={{ position: "absolute", left: 262, top: 668, width: 92, height: 92, borderRadius: "50%", border: `11px solid ${GOLD}`, borderTopColor: "transparent", borderRightColor: "transparent", background: "transparent", boxShadow: "0 12px 22px rgba(0,0,0,0.5)", transform: "rotate(-18deg)" }} />
          <div style={{ position: "absolute", left: 292, top: 736, width: 52, height: 24, borderRadius: 5, background: grad("#F0C463", "#9C6E26"), border: "2px solid rgba(60,42,10,0.55)", boxShadow: "0 8px 14px rgba(0,0,0,0.55)" }} />
          <div style={{ position: "absolute", left: 310, top: 700, width: 14, height: 44, borderRadius: 3, background: grad("#E7B24C", "#8A5F20") }} />
          <div style={{ position: "absolute", left: 306, top: 712, width: 22, height: 22, borderRadius: "50%", background: grad("#F4D488", "#8A5F20"), border: "2px solid rgba(60,42,10,0.5)" }} />
          {/* the L-plate, bolted to the tail, flips up on its hinge at the lock */}
          <div style={{ position: "absolute", left: 154, top: 600, transformOrigin: "50% 0%", transform: `rotate(${-plateFlip}deg)` }}>
            <div style={{ width: 74, height: 74, borderRadius: 9, background: PAPER, border: `4px solid ${RED}`, boxShadow: "0 12px 24px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: RED, lineHeight: 1 }}>L</div>
          </div>
        </div>

        {/* ===================== START LINE: the one place it never leaves ===================== */}
        <div style={{ position: "absolute", left: 700, top: 700, width: 26, height: 92, background: "repeating-linear-gradient(180deg,rgba(236,233,226,0.55) 0 16px,rgba(20,26,38,0.55) 16px 32px)", transform: "skewX(-14deg)", opacity: 0.55 }} />

        {/* ===================== PIT CREW CLAUDE + THE RED X PADDLE ===================== */}
        <div style={{ position: "absolute", left: 92, top: 700 }}>
          <Mascot lf={lf + 40} size={74} gaze={0.4} nodAmp={2.2} nodSpeed={9} tint="#E08A3C" cheer={snap2 * 0.9 + slamHit * 0.5} />
        </div>
        {[0, 1].map((i) => (
          <div key={"ed" + i} style={{ position: "absolute", left: 96 + i * 46, top: 712, width: 15, height: 19, borderRadius: 6, background: grad("#3B424E", "#191D25"), border: "1.5px solid rgba(190,205,235,0.28)" }} />
        ))}
        <div style={{ position: "absolute", left: 62, top: 590, transform: `rotate(${Math.sin(lf * 0.16) * 5 + snap2 * 14}deg)`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 27, top: 56, width: 7, height: 84, background: grad("#8E7A58", "#4E4230") }} />
          <div style={{ width: 62, height: 62, borderRadius: "50%", background: PAPER, border: `4px solid ${RED}`, boxShadow: "0 10px 20px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: RED, lineHeight: 1 }}>✕</div>
        </div>

        {/* ===================== FOREGROUND SMOKE DRIFT: thin now, swallows the frame on the slam ===================== */}
        {Array.from({ length: 9 }).map((_, i) => {
          const r = seed(i * 5.3 + 2);
          const p = (lf * 0.013 + r) % 1;
          const s = (170 + r * 210) * (0.6 + p * 1.5) * smokeAmt * 0.72;
          const grow = 0.22 + ramp(lf, 168, 192) * 0.78;
          return <div key={"sm2" + i} style={{ position: "absolute", left: 240 + r * 660 - p * 150 - s / 2, top: 792 - p * 250 - s / 2, width: s, height: s, borderRadius: "50%", background: "radial-gradient(circle at 45% 45%, rgba(228,226,220,0.26), transparent 68%)", opacity: Math.min(0.75, (1 - p) * 0.6 * smokeAmt * grow), filter: "blur(6px)" }} />;
        })}
        {Array.from({ length: 14 }).map((_, i) => {
          const r = seed(i * 3.1 + 7);
          const y = 792 - ((lf * (0.8 + r * 1.6) + r * 340) % 380);
          return <div key={"em" + i} style={{ position: "absolute", left: 30 + r * 950, top: y, width: 3 + r * 3, height: 3 + r * 3, borderRadius: "50%", background: r > 0.6 ? "rgba(231,178,76,0.7)" : "rgba(220,230,250,0.4)", opacity: 0.3 + r * 0.4 }} />;
        })}

        {/* ===================== HEADER LOCKUP ===================== */}
        <div style={{ position: "absolute", left: 0, top: 78, width: 1012, display: "flex", justifyContent: "center", opacity: hdr, transform: `scale(${hdrScale})` }}>
          <div style={{ position: "relative", overflow: "hidden", padding: "10px 26px", borderRadius: 16, background: "rgba(10,16,28,0.85)", border: "2px solid rgba(231,178,76,0.5)", boxShadow: "0 18px 40px -14px rgba(0,0,0,0.85)" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: PAPER, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>ONE NIGHT = ONE WEEK OF WORK</div>
            <div style={{ position: "absolute", left: shim, top: 0, width: 120, height: 90, background: "linear-gradient(100deg,transparent,rgba(255,240,200,0.3),transparent)", transform: "skewX(-18deg)" }} />
          </div>
        </div>

        {/* ===================== VIGNETTE ===================== */}
        <div style={{ position: "absolute", left: 0, top: 46, width: 1012, height: 746, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />
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
  const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const c01 = (v: number) => Math.max(0, Math.min(1, v));
  const iv = (p: number[], v: number[]) => interpolate(lf, p, v, CL);
  const bell = (a: number, b: number) => Math.sin(c01((lf - a) / (b - a)) * Math.PI);
  const pulse = (at: number, len: number) => (lf >= at ? Math.max(0, 1 - (lf - at) / len) : 0);
  // 100% scale = a standing Claude at 320px. Everything is placed by FOOT ANCHOR.
  const FIG = (cx: number, fy: number, sc: number) => { const s = 320 * sc; return { left: cx - s / 2, top: fy - s * 0.92, size: s }; };
  const rotPt = (px: number, py: number, cx: number, cy: number, deg: number) => {
    const a = (deg * Math.PI) / 180, dx = px - cx, dy = py - cy;
    return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
  };

  // ============ L11 CAMERA: one unbroken push. It never stops and it never arrives. ============
  const camS = iv([0, 254], [1.0, 1.135]);
  const camOX = iv([0, 150, 254], [566, 558, 318]);   // the lazy crane settles the weight onto the LEFT PASSAGE
  const camOY = iv([0, 150, 254], [494, 494, 578]);
  const shk = pulse(170, 9) * 5.2 + pulse(188, 15) * 9.4;   // rivet four, then the shatter. 18 frames apart, never mushed.
  const camDX = Math.sin(lf * 4.1) * shk;
  const camDY = Math.cos(lf * 5.3) * shk * 0.66 + iv([150, 254], [0, 15]);

  // ============ L5 LIGHT ORDER: the pivot marches AWAY from camera ============
  const nearSod = (i: number) => {
    const t0 = i === 0 ? 60 : 66;
    if (lf < t0) return 0.9 + Math.sin(lf * 1.9 + i * 2.3) * 0.07;
    if (lf < t0 + 6) return Math.floor(lf) % 2 === 0 ? 1.5 : 0.06;
    return 0;
  };
  const DEEPT = [92, 112, 132, 150];
  const deepSod = (i: number) => {
    const t0 = DEEPT[i];
    if (lf < t0) return 0.88 + Math.sin(lf * 1.4 + i * 1.7) * 0.09;
    if (lf < t0 + 5) return Math.floor(lf) % 2 === 0 ? 1.4 : 0.05;
    return 0;
  };
  const FLOODT = [88, 100, 112, 124, 140, 248];   // thrown BY HAND, one breaker per bank
  const floodLv = (i: number) => {
    const d = lf - FLOODT[i];
    if (d < 0) return 0;
    if (i === 5) return (Math.floor(d / 2) % 2 === 0 ? 0.66 : 0.09) * c01(d / 3);  // bank 6 is STILL striking on at f254
    if (d < 11) return Math.floor(d / 2) % 2 === 0 ? 0.92 : 0.2;
    return (0.84 + 0.16 * c01((d - 11) / 20)) * (0.95 + 0.05 * Math.sin(lf / 5.5 + i * 2));
  };
  const warm = c01((nearSod(0) + nearSod(1)) / 1.8);
  let fsum = 0; for (let i = 0; i < 6; i++) fsum += floodLv(i);
  const cold = c01(fsum / 3.4);
  const blackout = lf >= 72 && lf < 75 ? 1 : 0;   // three frames only. Never a void.

  const BANKS = [
    { x: 110, head: 95, base: 790, s: 1.0 },
    { x: 340, head: 228, base: 742, s: 0.74 },
    { x: 545, head: 324, base: 706, s: 0.55 },
    { x: 730, head: 404, base: 682, s: 0.4 },
    { x: 870, head: 462, base: 664, s: 0.29 },
    { x: 975, head: 511, base: 650, s: 0.2 },
  ];
  const DSOD = [
    { x: 560, base: 690, head: 470, s: 0.42 },
    { x: 700, base: 672, head: 512, s: 0.3 },
    { x: 810, base: 658, head: 540, s: 0.23 },
    { x: 885, base: 650, head: 556, s: 0.18 },
  ];
  const NSOD = [{ x: 118, base: 784, head: 188 }, { x: 790, base: 766, head: 230 }];

  // ============ L3 THE GATE: a jib swings it in sideways, a crew plants it. Nothing is born. ============
  const gL = over(lf, 120, 28, Easing.inOut(Easing.cubic));
  const gHunt = lf < 150 ? (Math.sin((lf - 120) * 0.44) * 44 + Math.sin((lf - 120) * 0.17) * 16) * (1 - gL) : 0;
  const gateDX = lf >= 120 ? -1060 * (1 - gL) + gHunt : -1060;
  const gateDY = lf < 150
    ? -18 + Math.sin((lf - 120) * 0.31) * 4
    : (lf < 160 ? -18 * Math.max(0, 1 - (lf - 150) / 2.4) + Math.sin((lf - 150) * 1.1) * 3.4 * Math.exp(-(lf - 150) * 0.42) : 0);
  const gateVis = lf >= 120;
  const RIVETS = [152, 158, 164, 170];
  const rivetHit = RIVETS.reduce((a, t) => a + pulse(t, 6), 0);
  const plateRing = lf >= 150
    ? Math.sin(lf * 0.72) * 0.22 + RIVETS.reduce((a, t) => a + (lf >= t ? Math.sin((lf - t) * 1.7) * 1.1 * Math.exp(-(lf - t) * 0.035) : 0), 0)
    : 0;   // still ringing at f254

  // L4 THE ARM: one shaft, two arms, two answers.
  const pedTick = lf >= 220 ? Math.sin((lf - 220) * 1.5) * 1.3 * Math.exp(-(lf - 220) * 0.045) + Math.sin(lf * 0.85) * 0.25 : 0;
  const pedAng = (lf < 150 ? 0 : iv([150, 205, 210, 217, 219.6], [0, 0, -76, -76, 0])) + (lf >= 220 ? pedTick : 0);
  const chuteAng = lf < 236 ? -80 : iv([236, 290], [-80, 0]);   // starts down at f236 and NEVER lands on screen
  const shaftRot = pedAng * 0.06 + (chuteAng + 80) * 0.05;
  const bandOn = lf >= 202;

  // ============ L1 HERO: he owns the last quarter ============
  const heroX = iv([0, 78, 96, 150, 168, 204, 216, 219, 238, 254], [470, 470, 344, 344, 352, 352, 208, 208, 234, 234]);
  const heroTop = iv([0, 76, 96, 148, 152, 168, 254], [530, 530, 556, 556, 550, 470, 470])
    + (lf >= 96 && lf < 148 ? Math.sin(lf * 0.55) * 4 : 0)
    + (lf >= 204 && lf < 216 ? -Math.abs(Math.sin(lf * 0.62)) * 4 : 0)
    + bell(194, 202) * 20;
  const heroRot = iv([0, 30, 42, 48, 58, 76, 96, 148, 158, 172, 194, 202, 208, 216, 222, 254],
    [-4, -6, 9, 8, -3, 5, 12, 12, 6, -2, -2, 5, 0, 0, -1.4, -1.4])
    + (lf >= 96 && lf < 148 ? Math.sin(lf * 0.62) * 3.5 : 0)
    + bell(194, 202) * 8;
  const heroSize = 250;
  const heroL = heroX - heroSize / 2;
  const smear = iv([40, 44, 58, 70, 96, 130, 254], [0, 1, 1, 1.24, 1.55, 1.95, 2.05]);   // it does not come off. It spreads.
  const nubFake = c01((lf - 118) / 26);
  const measure = c01((lf - 224) / 14);   // nobody asked him to
  const cardOut = 1 - c01((lf - 78) / 6);

  // ============ L2 VILLAIN: he loses the frame at f224 ============
  const vx = iv([0, 176, 180, 184, 188, 193, 200, 214, 224, 236, 246, 254], [500, 500, 506, 570, 628, 568, 640, 648, 650, 720, 818, 890]);
  const vy = iv([0, 176, 180, 184, 188, 193, 200, 214, 224, 236, 246, 254], [520, 520, 534, 430, 542, 520, 732, 730, 730, 718, 700, 688]);
  const vsc = iv([0, 200, 224, 254], [0.75, 0.75, 0.73, 0.45]);
  const vrot = iv([0, 36, 42, 54, 62, 176, 180, 184, 188, 193, 197, 200, 206, 214, 254],
    [0, 0, -15, -13, 0, 0, 8, 22, 26, -14, 48, 84, 44, 0, 0]);
  const vF = FIG(vx, vy, vsc);
  const sh = rotPt(vx + 80 * vsc, vy - 206.4 * vsc, vx, vy, vrot);
  const vshX = sh[0], vshY = sh[1];
  const hitch = lf >= 188 && (Math.floor((lf - 188) / 6) % 4 === 0 || Math.floor(lf / 3) % 7 === 0);
  const rainO = (lf < 188 ? 1 : iv([188, 210, 254], [0.95, 0.5, 0.42])) * (hitch ? 0.26 : 1);   // damaged, and you can see it
  const inkOn = c01((lf - 194) / 4);

  // THE DIE. Stamping is the only verb he has, so he uses it on a law.
  const DK = [0, 26, 32, 40, 44, 50, 58, 70, 120, 176, 180, 184, 188, 193, 198, 206];
  const dieHeld = lf >= 206;
  const dieX = dieHeld ? vx + 86 * vsc : iv(DK, [592, 592, 534, 476, 470, 500, 566, 570, 572, 550, 556, 616, 690, 640, 668, 707]);
  const dieY = dieHeld ? vy - 150 * vsc : iv(DK, [356, 356, 424, 596, 604, 500, 392, 386, 390, 436, 428, 316, 460, 476, 690, 619]);
  const dieR = dieHeld ? -18 + Math.sin(lf * 0.3) * 3 : iv(DK, [-14, -14, 24, 6, 6, -30, -12, -12, -12, 4, -22, -58, 12, 40, 74, -18]);
  const broken = lf >= 188;
  const dieKick = pulse(188, 5);

  // ============ SET CLOCKS ============
  const signDown = lf >= 126;
  const signBolt = (i: number) => c01((lf - (95 + i * 8)) / 6);
  const signRock = signDown ? Math.sin((lf - 126) * 0.42) * 4.6 * Math.exp(-(lf - 126) * 0.014) : 0;   // still rocking at f254
  const boomX = lf < 130 ? 700 : iv([130, 254], [700, 214]);   // the teardown never finishes
  const LETTERS = [130, 160, 190, 220, 250];
  const buggyT = iv([180, 254], [0.06, 0.874]);   // still 60px short of the point
  const tyreGo = lf >= 170;
  const shardSpin = lf >= 188 ? (lf - 188) * 13 : 0;
  const shardAmp = lf >= 188 ? Math.max(0.18, 1 - (lf - 188) / 92) : 0;   // still spinning down at f254
  const tarpPull = over(lf, 228, 16, Easing.out(Easing.cubic));
  const lensOff = lf >= 196;
  const glyphBand = 0.4 + (blackout ? 0.75 : 0) + (lf >= 60 && lf < 88 ? 0.3 : 0);

  const motes = Array.from({ length: 34 }, (_, i) => {
    const r = seed(i * 3.1 + 7), r2 = seed(i * 1.9 + 2);
    return { r, r2, sp: 0.28 + r2 * 0.7, band: i % 6 };
  });

  const crew = (
    k: string, cx: number, fy: number, sc: number,
    o: { tint?: string; o?: number; z?: number; gaze?: number; nod?: number; sp?: number; hiVis?: number; cap?: number; rot?: number; ph?: number; kids?: React.ReactNode }
  ) => {
    const F = FIG(cx, fy, sc);
    return (
      <div key={k} style={{ position: "absolute", left: F.left, top: F.top, width: F.size, height: F.size, opacity: o.o === undefined ? 1 : o.o, zIndex: o.z === undefined ? 14 : o.z, transform: o.rot ? `rotate(${o.rot}deg)` : undefined, transformOrigin: "50% 92%" }}>
        <div style={{ position: "absolute", left: F.size * 0.14, top: F.size * 0.87, width: F.size * 0.72, height: F.size * 0.09, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(5px)" }} />
        <Mascot lf={lf + (o.ph || 0)} size={F.size} tint={o.tint} gaze={o.gaze || 0} nodAmp={o.nod === undefined ? 2 : o.nod} nodSpeed={o.sp === undefined ? 8 : o.sp} hiVis={o.hiVis || 0} capBack={o.cap || 0} />
        {o.kids}
      </div>
    );
  };

  const Lbib = (s: number, up: boolean) => (
    <div style={{ position: "absolute", left: "38%", top: "50%", width: s, height: s, borderRadius: s * 0.14, background: "#F4EFE4", border: `${Math.max(2, s * 0.09)}px solid ${RED}`, transform: `rotate(${up ? 180 : 0}deg)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: s * 0.72, color: RED, lineHeight: 1, boxShadow: "0 4px 9px rgba(0,0,0,0.45)" }}>L</div>
  );

  return (
    <Panel label="the one rule">
      <div style={{ position: "absolute", left: 0, top: 56, width: 1012, height: 736, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: -56, width: 1012, height: 792, transform: `translate(${camDX}px, ${camDY}px) scale(${camS})`, transformOrigin: `${camOX}px ${camOY}px` }}>

          {/* ================= FAR: the sky, the lot, the dead hardware ================= */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s3sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0B0E16" /><stop offset="1" stopColor="#181C26" /></linearGradient>
              <linearGradient id="s3grd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B1F28" /><stop offset="1" stopColor="#0C0E13" /></linearGradient>
              <linearGradient id="s3fac" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#242029" /><stop offset="1" stopColor="#15131A" /></linearGradient>
              <linearGradient id="s3steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5C6672" /><stop offset="0.5" stopColor="#39424D" /><stop offset="1" stopColor="#232A33" /></linearGradient>
              <linearGradient id="s3plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6E7A87" /><stop offset="0.42" stopColor="#4A545F" /><stop offset="1" stopColor="#2C343D" /></linearGradient>
              <linearGradient id="s3num" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9AA6B2" /><stop offset="1" stopColor="#4E5863" /></linearGradient>
              <pattern id="s3mesh" width="13" height="13" patternUnits="userSpaceOnUse"><path d="M0 0 L13 13 M13 0 L0 13" stroke="#7A8593" strokeWidth="1.1" opacity="0.45" /></pattern>
              <pattern id="s3mesh2" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0 L9 9 M9 0 L0 9" stroke="#697384" strokeWidth="0.9" opacity="0.4" /></pattern>
              <radialGradient id="s3vig" cx="0.46" cy="0.56" r="0.74"><stop offset="0.42" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.6" /></radialGradient>
            </defs>

            <rect x="0" y="0" width="1012" height="642" fill="url(#s3sky)" />
            <rect x="0" y="0" width="1012" height="642" fill="#3A2412" opacity={warm * 0.42} />
            <rect x="0" y="0" width="1012" height="642" fill="#1D2E3F" opacity={cold * 0.34} />
            {Array.from({ length: 14 }).map((_, i) => {
              const r = seed(i * 2.7 + 5);
              return <circle key={"sr" + i} cx={30 + r * 950} cy={70 + seed(i * 1.4) * 130} r={0.9 + r * 1.2} fill="#CFE0FF" opacity={(0.18 + r * 0.24) * (1 - cold * 0.5)} />;
            })}

            {/* the neighbouring unit */}
            <rect x="560" y="228" width="404" height="414" fill="url(#s3fac)" />
            <rect x="560" y="228" width="404" height="6" fill="#39323F" />
            {[0, 1, 2, 3].map((i) => <rect key={"nw" + i} x={588 + i * 96} y={372} width="52" height="66" fill="#0D0B12" opacity="0.9" />)}

            {/* THE SHUTTERED UNIT. No roller shutter anywhere: S0 owns that verb. */}
            <rect x="180" y="250" width="382" height="392" fill="url(#s3fac)" />
            <rect x="180" y="250" width="382" height="7" fill="#3B3442" />
            <rect x="180" y="268" width="382" height="64" fill="#191620" />
            {LETTERS.map((t, i) => {
              const drop = lf >= t ? Math.min(360, Math.pow(lf - t, 2) * 0.9) : 0;
              if (drop > 340) return null;
              return (
                <g key={"fl" + i} transform={`translate(${210 + i * 70} ${276 + drop}) rotate(${drop * 0.22})`}>
                  <rect x="0" y="0" width="46" height="48" rx="4" fill="#2E2836" stroke="#4A4256" strokeWidth="1.6" />
                  <rect x="7" y="7" width="32" height="7" fill="#453D52" />
                  <rect x="7" y="24" width="20" height="7" fill="#453D52" />
                </g>
              );
            })}
            {[[218, 372], [332, 372], [446, 372]].map((w, i) => (
              <g key={"cw" + i}>
                <rect x={w[0]} y={w[1]} width="84" height="72" fill="#0C0A10" />
                <rect x={w[0]} y={w[1]} width="84" height="72" fill="url(#s3mesh2)" />
                <rect x={w[0]} y={w[1]} width="84" height="72" fill="none" stroke="#3E3748" strokeWidth="2" />
              </g>
            ))}
            {/* a dead tube sign strobing on a broken ballast for the entire scene */}
            <rect x="252" y="470" width="176" height="16" rx="6" fill="#2A2534" />
            <rect x="256" y="473" width="168" height="10" rx="5" fill="#CFE6FF" opacity={(Math.floor(lf / 3) % 5 === 0 ? 0.85 : 0.06) * (1 - blackout * 0.85)} />
            {/* the skip and the burst bin bag, shreds flapping f0 to f254 */}
            <rect x="452" y="580" width="106" height="62" rx="3" fill="#2A3038" stroke="#3E4650" strokeWidth="2" />
            <rect x="452" y="580" width="106" height="7" fill="#49525E" />
            {[0, 1, 2, 3, 4].map((i) => <rect key={"sk" + i} x={460 + i * 20} y={588} width="13" height="54" fill="#1A1F26" opacity="0.7" />)}
            <ellipse cx="432" cy="628" rx="22" ry="15" fill="#14171D" />
            {Array.from({ length: 6 }).map((_, i) => {
              const r = seed(i * 4.3 + 1);
              const fl = Math.sin(lf * (0.16 + r * 0.14) + i * 2) * (5 + r * 6);
              return <path key={"bs" + i} d={`M ${420 + i * 5} 620 q ${6 + fl} ${-8 - r * 8} ${13 + fl} ${-3 - r * 6}`} stroke="#2E3540" strokeWidth="2.2" fill="none" opacity="0.8" />;
            })}

            {/* THE KEY CABINET. Wired glass, a red LOCKED bolt, the ring inside. Never lit, never approached. */}
            <g opacity="0.5">
              <rect x="200" y="328" width="72" height="64" rx="3" fill="#191D25" stroke="#333B45" strokeWidth="2" />
              <rect x="206" y="334" width="60" height="52" fill="#1F2731" />
              <rect x="206" y="334" width="60" height="52" fill="url(#s3mesh2)" opacity="0.55" />
              <g opacity="0.55">
                <circle cx="230" cy="352" r="6" fill="none" stroke={GOLD} strokeWidth="2.4" />
                <rect x="228.5" y="357" width="3" height="16" fill={GOLD} />
                <rect x="228.5" y="368" width="7" height="2.6" fill={GOLD} />
                <circle cx="243" cy="354" r="4.4" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.7" />
              </g>
              <rect x="204" y="356" width="64" height="9" rx="3" fill={RED} opacity="0.8" />
              <rect x="232" y="386" width="10" height="9" rx="2" fill="#3E4650" />
            </g>

            {/* THE FESTOON: filling the upper centre from frame 0 */}
            {(() => {
              const sag = signDown ? 470 : 400;
              const drape = lf >= 132 && gateVis ? c01((lf - 132) / 10) : 0;
              const midY = sag * (1 - drape) + 406 * drape;
              const flap = lf < 126 ? 1 : 0.25;
              const pts: string[] = [];
              const flags: React.ReactNode[] = [];
              for (let i = 0; i <= 16; i++) {
                const t = i / 16;
                const x = 620 - 500 * t;
                const y = (1 - t) * (1 - t) * 268 + 2 * (1 - t) * t * midY + t * t * 300 + Math.sin(lf * 0.09 + i * 0.8) * 4 * flap;
                pts.push(x + "," + y);
                if (i < 16) flags.push(<polygon key={"fg" + i} points={`${x},${y} ${x - 15},${y} ${x - 7.5},${y + 17}`} fill={i % 2 ? "#B9503A" : "#C89A3C"} opacity={0.62} transform={`rotate(${Math.sin(lf * 0.13 + i) * 8 * flap} ${x - 7.5} ${y})`} />);
              }
              return <g><polyline points={pts.join(" ")} stroke="#5A4E44" strokeWidth="2" fill="none" opacity="0.8" />{flags}</g>;
            })()}
            <rect x="116" y="298" width="8" height="344" fill="#2C2731" />

            {/* JIFFY LOOB: the old regime's promise, unbolted and dropped face-down. The scene deletes its own text. */}
            {!signDown ? (
              <g>
                <rect x="694" y="344" width="8" height="26" fill="#4A3D2C" />
                <rect x="782" y="344" width="8" height="26" fill="#4A3D2C" />
                <g transform={`rotate(${signBolt(3) * 4} 620 260)`}>
                  <rect x="620" y="250" width="260" height="94" rx="47" fill="#C9902A" stroke="#B2372A" strokeWidth="4" opacity={(lf % 97) < 3 ? 0.62 : 1} />
                  <rect x="620" y="250" width="260" height="94" rx="47" fill="none" stroke="#F0C63E" strokeWidth="1.6" opacity="0.6" />
                  <text x="750" y="294" textAnchor="middle" fill="#8E2A1E" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="30">JIFFY LOOB</text>
                  <text x="750" y="318" textAnchor="middle" fill="rgba(60,26,14,0.85)" fontFamily={mono} fontSize="9.5" fontWeight={700} letterSpacing="0.8">CERTIFIED IN 5 MINUTES OR IT'S FREE</text>
                </g>
                {[0, 1, 2, 3].map((i) => (
                  <circle key={"sb" + i} cx={636 + i * 76} cy={254 + signBolt(i) * 60} r={4} fill="#8A929C" opacity={signBolt(i) > 0.95 ? 0 : 1} />
                ))}
              </g>
            ) : (
              <g transform={`translate(750 638) rotate(${signRock})`}>
                <polygon points="-128,-8 128,-8 104,8 -104,8" fill="#8A6E3A" stroke="#5E4A26" strokeWidth="1.6" />
                <polygon points="-128,-8 128,-8 122,-11 -122,-11" fill="#A98A4C" />
                {[-70, 0, 70].map((x, i) => <rect key={"bk" + i} x={x - 6} y={-11} width="12" height="4" fill="#4A3D2C" />)}
              </g>
            )}

            {/* the back fence: the lot's boundary, and a cable-tied banner rattling f0 to f254 */}
            <rect x="0" y="558" width="950" height="84" fill="url(#s3mesh)" opacity="0.5" />
            <rect x="0" y="558" width="950" height="3" fill="#6E7885" opacity="0.6" />
            {Array.from({ length: 11 }).map((_, i) => <rect key={"fp" + i} x={i * 88} y={558} width="4" height="84" fill="#525C69" opacity="0.6" />)}
            <g opacity="0.75" transform={`rotate(${Math.sin(lf * 0.19) * 1.6} 360 583)`}>
              <rect x="300" y="566" width="120" height="34" fill="#5C2E28" />
              <rect x="300" y="566" width="120" height="4" fill="#8A4A40" />
            </g>

            {/* the apron */}
            <rect x="0" y="640" width="1012" height="152" fill="url(#s3grd)" />
            <rect x="0" y="640" width="1012" height="152" fill="#40260F" opacity={warm * 0.3} />
            <rect x="0" y="640" width="1012" height="152" fill="#1E2C3B" opacity={cold * 0.3} />
            <rect x="0" y="638" width="1012" height="4" fill="#000" opacity="0.5" />
            {[[620, 690, 74], [772, 668, 54], [880, 656, 36]].map((o, i) => (
              <ellipse key={"os" + i} cx={o[0]} cy={o[1]} rx={o[2]} ry={o[2] * 0.2} fill="#07090C" opacity="0.55" />
            ))}
            {/* grit jumps a half-inch off the concrete on every rivet hit */}
            {rivetHit > 0.02 && Array.from({ length: 26 }).map((_, i) => {
              const r = seed(i * 5.7 + 3);
              return <circle key={"gr" + i} cx={120 + r * 800} cy={700 + seed(i * 2.2) * 84 - rivetHit * (6 + r * 14)} r={1 + r * 1.6} fill="#9AA3AE" opacity={rivetHit * 0.7} />;
            })}

            {/* THE LANE PAINT, drawn live, converging on the point */}
            <line x1="500" y1="792" x2={500 + 452 * buggyT} y2={792 - 142 * buggyT} stroke="#E7E3D6" strokeWidth="5" opacity="0.82" strokeLinecap="round" />
            <line x1="735" y1="792" x2="960" y2="646" stroke="#E7E3D6" strokeWidth="3.4" opacity="0.4" strokeLinecap="round" />

            {/* S1's two-post lift: the old regime's machine, abandoned on the wrong side of a fence */}
            <g opacity="0.5">
              <rect x="800" y="520" width="9" height="152" fill="#3E4650" />
              <rect x="921" y="520" width="9" height="152" fill="#3E4650" />
              <rect x="796" y="668" width="18" height="9" fill="#4E5762" />
              <rect x="917" y="668" width="18" height="9" fill="#4E5762" />
              <rect x="800" y="516" width="130" height="8" fill="#4E5762" />
              <rect x="809" y="646" width="46" height="6" fill="#39414B" />
              <rect x="875" y="646" width="30" height="6" fill="#39414B" />
            </g>

            {/* the four DEEP sodium masts: they do NOT die with the near two */}
            {DSOD.map((m, i) => {
              const lv = deepSod(i);
              return (
                <g key={"ds" + i}>
                  <rect x={m.x - 7.5 * m.s} y={m.head} width={15 * m.s} height={m.base - m.head} fill="#22272F" />
                  <rect x={m.x - 26 * m.s} y={m.head - 5} width={52 * m.s} height={18 * m.s + 3} rx={3} fill="#2E343D" />
                  <rect x={m.x - 18 * m.s} y={m.head + 1} width={36 * m.s} height={4} rx={2} fill="#FFD383" opacity={Math.min(1, lv)} />
                  {lv > 0.02 && <polygon points={`${m.x - 8},${m.head + 4} ${m.x + 8},${m.head + 4} ${m.x + 60 * m.s},${m.base + 8} ${m.x - 60 * m.s},${m.base + 8}`} fill="#FFBE5A" opacity={0.12 * lv} />}
                </g>
              );
            })}

            {/* THE SIX FLOOD BANKS: pre-existing dead hardware, energised, never born */}
            {BANKS.map((b, i) => {
              const lv = floodLv(i);
              const w = 62 * b.s, h = 22 * b.s;
              return (
                <g key={"bk" + i}>
                  <rect x={b.x - 4 * b.s} y={b.head} width={8 * b.s} height={b.base - b.head} fill="#1E232B" />
                  <rect x={b.x - 5.6 * b.s} y={b.base - 6 * b.s} width={11.2 * b.s} height={6 * b.s} fill="#2A313A" />
                  <rect x={b.x - w / 2} y={b.head - h} width={w} height={h} rx={3 * b.s} fill="#2C333C" stroke="#454E59" strokeWidth={1.2 * b.s} />
                  {[0, 1, 2].map((k) => (
                    <rect key={k} x={b.x - w / 2 + 3 * b.s + (k * (w - 6 * b.s)) / 3} y={b.head - h + 3 * b.s} width={(w - 6 * b.s) / 3 - 2 * b.s} height={h - 6 * b.s} rx={1.5 * b.s} fill="#EAF3FF" opacity={0.1 + lv * 0.9} />
                  ))}
                </g>
              );
            })}

            {/* the S4 bay glow, on the point. Under 2% of frame, never keyed, never sharp. */}
            <g opacity="0.5">
              <rect x="914" y="611" width="40" height="30" rx="2" fill="#0C1219" stroke="#2C3743" strokeWidth="1.2" />
              <rect x="916" y="613" width="36" height="26" fill="#7FA6C4" opacity="0.2" />
              <rect x={918 + Math.abs(Math.sin((((lf * 0.9) % 60) / 60) * Math.PI * 2)) * 30} y={628} width="4" height="9" fill="#0A0E13" opacity="0.9" />
            </g>
          </svg>

          {/* ================= VOLUMETRIC SHAFTS + THE DUST LADDER ================= */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, mixBlendMode: "screen", pointerEvents: "none" }}>
            {NSOD.map((m, i) => {
              const lv = nearSod(i);
              if (lv <= 0.02) return null;
              const tx = i === 0 ? 330 : 470;
              return <polygon key={"nc" + i} points={`${m.x - 16},${m.head + 12} ${m.x + 16},${m.head + 12} ${tx + 210},${m.base} ${tx - 210},${m.base}`} fill="#FFB84E" opacity={0.15 * Math.min(1, lv)} />;
            })}
            {BANKS.map((b, i) => {
              const lv = floodLv(i);
              if (lv <= 0.02) return null;
              const reach = i === 5 ? 0.38 : 1;   // bank 6's shaft has not reached the floor
              const fy = b.head + (792 - b.head) * reach;
              const spread = 200 * b.s;
              const tx = b.x + (i === 0 ? 250 : i === 1 ? 140 : 0);
              return <polygon key={"fs" + i} points={`${b.x - 24 * b.s},${b.head} ${b.x + 24 * b.s},${b.head} ${tx + spread},${fy} ${tx - spread},${fy}`} fill="#D8ECFF" opacity={0.17 * Math.min(1, lv) * (i === 0 ? 1.15 : 1)} />;
            })}
            {/* the wreck's smoke climbs into shafts 4, 5 and 6 and lights up white as each strikes */}
            {Array.from({ length: 9 }).map((_, i) => {
              const r = seed(i * 6.1 + 4);
              const ph = (lf * 1.25 + r * 70) % 78;
              const y = 512 - ph * 3.4;
              const x = 452 + Math.sin(ph * 0.06 + r * 6) * (10 + ph * 0.55) + ph * 1.9;
              return <circle key={"sm" + i} cx={x} cy={y} r={5 + ph * 0.34} fill="#CFE2F2" opacity={Math.max(0, 1 - ph / 78) * (lf >= 140 ? 0.5 : 0.16)} />;
            })}
            {motes.map((m, i) => {
              const on = m.band < 2 ? (lf < 78 ? 1 : 0) : floodLv(Math.min(4, m.band - 2)) > 0.15 ? 1 : 0;
              if (!on) return null;
              const b = m.band < 2
                ? { x: NSOD[m.band].x, top: NSOD[m.band].head, sp: 190 }
                : { x: BANKS[m.band - 2].x, top: BANKS[m.band - 2].head, sp: 150 * BANKS[m.band - 2].s };
              const y = ((m.r * 640 + lf * m.sp) % 640) + b.top;
              const x = b.x + (m.r2 - 0.5) * b.sp * 2.4 + Math.sin(lf * 0.03 + i) * 9;
              return <circle key={"du" + i} cx={x} cy={y} r={0.9 + m.r * 1.9} fill={m.band < 2 ? "#FFD9A0" : "#DCEBFA"} opacity={(0.16 + m.r * 0.3) * (1 - blackout * 0.9)} />;
            })}
            {/* glass dust through the dying cones */}
            {lf >= 60 && lf < 76 && Array.from({ length: 16 }).map((_, i) => {
              const r = seed(i * 2.9 + 9), m = i % 2;
              return <rect key={"gd" + i} x={NSOD[m].x - 40 + r * 80} y={NSOD[m].head + 20 + (lf - 60) * (5 + r * 9)} width="2.4" height="2.4" fill="#FFF0CC" opacity={0.7 - (lf - 60) * 0.04} />;
            })}
            {/* long anamorphic flares off the banks as they strike */}
            {BANKS.map((b, i) => {
              const lv = floodLv(i), d = lf - FLOODT[i];
              if (lv <= 0.05 || d > 22) return null;
              return <rect key={"af" + i} x={b.x - 300 * b.s} y={b.head - 12 * b.s} width={600 * b.s} height={2.6 * b.s + 1} fill="#EAF6FF" opacity={0.5 * lv * Math.max(0, 1 - d / 22)} />;
            })}
          </svg>

          {/* ================= UPSTAGE BODIES ================= */}
          <div style={{ position: "absolute", left: boomX - 46, top: 316, width: 92, height: 300, zIndex: 4 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 92, height: 34, borderRadius: 4, background: "#38414C", border: "2px solid #4E5863" }} />
            <div style={{ position: "absolute", left: 40, top: 30, width: 12, height: 270, background: "#2C333C", transform: "rotate(6deg)", transformOrigin: "50% 0%" }} />
          </div>
          {crew("td", boomX, 320, 0.32, { hiVis: 1, z: 5, o: 0.72, sp: 6, nod: 2 })}
          <div style={{ position: "absolute", left: boomX + 30, top: 300 + Math.sin(lf * 0.2) * 3, width: 26, height: 28, borderRadius: 3, background: "#2E2836", border: "1.5px solid #4A4256", zIndex: 6 }} />

          {/* THE PLATELESS ROOKIE. No plate, no cap, no lanyard. Not queueing, just leaving. */}
          {lf >= 196 && crew("pr", iv([196, 204, 210, 216, 254], [-46, 176, 194, 208, 392]), iv([196, 204, 216, 254], [732, 730, 700, 651]), iv([196, 216, 254], [0.8, 0.78, 0.14]), { z: 9, o: 0.94 - c01((lf - 216) / 60) * 0.45, gaze: -0.4, nod: 3, sp: 5 })}

          {/* THE PAINT-BUGGY CLAUDE. He steps aside for him at f236 without looking, and keeps painting. */}
          {crew("pb", 500 + 452 * buggyT - 34, 792 - 142 * buggyT + 8 + (lf >= 236 && lf < 250 ? -18 : 0), 0.3 - buggyT * 0.1, { hiVis: 1, z: 9, o: 0.8, sp: 5, gaze: 0.3 })}
          <div style={{ position: "absolute", left: 500 + 452 * buggyT - 14, top: 792 - 142 * buggyT - 12, width: 30, height: 20, borderRadius: 3, background: "#3E4650", border: "1.5px solid #59636E", zIndex: 9, opacity: 0.85 }} />

          {/* ================= THE ONE-RULE GATE ================= */}
          {gateVis && (
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 10 }}>
              <g transform={`translate(${gateDX} ${gateDY})`}>
                {/* THE CRANE JIB. It arrives HORIZONTALLY, at rail height. It never descends onto anybody. */}
                {lf < 162 && (
                  <g opacity={1 - c01((lf - 152) / 10)}>
                    <rect x={-260} y={296} width={560} height="14" fill="#4A545F" />
                    <rect x={-260} y={296} width={560} height="4" fill="#68737F" />
                    <rect x={250} y={300} width={26} height={26} rx="4" fill="#39424C" />
                    <line x1={262} y1={324} x2={190} y2={402} stroke="#8A94A0" strokeWidth="2.4" />
                    <line x1={262} y1={324} x2={430} y2={402} stroke="#8A94A0" strokeWidth="2.4" />
                  </g>
                )}

                {/* the chain-link skirt: you can see the lot through it */}
                <rect x="58" y="590" width="896" height="110" fill="url(#s3mesh)" opacity="0.62" />
                <rect x="58" y="590" width="896" height="3" fill="#78838F" opacity="0.7" />
                <rect x="58" y="698" width="896" height="3" fill="#5A646F" opacity="0.7" />
                {/* the two passages: gaps in the skirt. The only ways through. */}
                <rect x="150" y="586" width="110" height="118" fill="url(#s3grd)" />
                <rect x="758" y="586" width="142" height="118" fill="url(#s3grd)" />

                {/* THE SHAFT. One law, two arms. Drawn behind the rack, so you read it through the empty bays. */}
                <g transform={`rotate(${shaftRot} 500 478)`}>
                  <rect x="150" y="474" width="812" height="8" rx="4" fill="#59636E" />
                  <rect x="150" y="474" width="812" height="2.6" fill="#8E99A5" opacity="0.7" />
                  <rect x="150" y="479" width="812" height="2" fill="#2C333C" />
                </g>
                {[260, 758].map((cx, i) => (
                  <g key={"cp" + i} transform={`rotate(${shaftRot * 4} ${cx} 478)`}>
                    <rect x={cx - 11} y={468} width="22" height="20" rx="3" fill="#465059" stroke="#6E7885" strokeWidth="1.4" />
                    <rect x={cx - 2} y={468} width="4" height="20" fill="#8E99A5" opacity="0.8" />
                  </g>
                ))}
                <rect x="901" y="478" width="7" height="152" fill="#4A545F" />

                {/* the two heavy uprights, driven into the tarmac from below */}
                {[8, 954].map((ux, i) => (
                  <g key={"up" + i}>
                    <rect x={ux} y={380} width="50" height="320" fill="url(#s3steel)" stroke="#6E7885" strokeWidth="1.6" />
                    <rect x={ux + 6} y={380} width="6" height="320" fill="#7C8794" opacity="0.4" />
                    <rect x={ux - 14} y={692} width="78" height="16" rx="2" fill="#3E4650" stroke="#68737F" strokeWidth="1.4" />
                    {[0, 1, 2, 3].map((k) => <circle key={k} cx={ux - 6 + k * 22} cy={700} r={3.4} fill="#8E99A5" opacity={lf >= 150 ? 1 : 0.3} />)}
                  </g>
                ))}

                {/* THE CROSS-RAIL SLOT RACK, built to hold five rules. Rusted, weld seams, a drip-run of orange rust. */}
                <rect x="58" y="400" width="896" height="15" fill="url(#s3steel)" stroke="#6E7885" strokeWidth="1.2" />
                <rect x="58" y="575" width="896" height="15" fill="url(#s3steel)" stroke="#6E7885" strokeWidth="1.2" />
                <path d="M 58 592 q 6 22 2 42" stroke="#8A5A2E" strokeWidth="3" fill="none" opacity="0.55" />
                <path d="M 250 590 q 4 26 0 40" stroke="#8A5A2E" strokeWidth="2.4" fill="none" opacity="0.4" />
                {[[64, 236], [243, 415], [422, 594], [601, 773], [780, 952]].map((s, i) => (
                  <g key={"bay" + i}>
                    <rect x={s[0]} y={400} width={s[1] - s[0]} height={190} fill="none" stroke="#4E5863" strokeWidth="3" />
                    {i !== 3 && [0, 1].map((k) => (
                      <React.Fragment key={"hf" + k}>
                        {/* THE FOUR EMPTY SLOTS: bolt holes drilled and empty */}
                        <circle cx={s[0] + 12 + k * (s[1] - s[0] - 24)} cy={412} r={4} fill="#0B0E13" stroke="#5C6672" strokeWidth="1.2" />
                        <circle cx={s[0] + 12 + k * (s[1] - s[0] - 24)} cy={578} r={4} fill="#0B0E13" stroke="#5C6672" strokeWidth="1.2" />
                      </React.Fragment>
                    ))}
                    {/* a faint ghost of paint in slot 2, where plates used to sit */}
                    {i === 1 && <rect x={s[0] + 8} y={414} width={s[1] - s[0] - 16} height={162} fill="#6E7885" opacity="0.07" />}
                  </g>
                ))}
                {[236, 415, 594, 773].map((x, i) => (
                  <React.Fragment key={"wl" + i}>
                    <rect x={x} y={400} width={7} height={190} fill="#39424D" />
                    <rect x={x + 1} y={402} width={2} height={186} fill="#727D8A" opacity="0.5" />
                  </React.Fragment>
                ))}

                {/* THE PLATE. Slot 4 only. It does the whole line for free. */}
                <g transform={`rotate(${plateRing} 687 400)`}>
                  <rect x="601" y="400" width="172" height="190" fill="url(#s3plate)" stroke="#78838F" strokeWidth="2.4" />
                  <rect x="603" y="402" width="168" height="6" fill="#96A2AE" opacity="0.45" />
                  <rect x="601" y="400" width="172" height="190" fill="#0B0E13" opacity="0.16" />
                  {/* THE CAST 1: part of the same steel, chipped enamel in the counters, one rust weep down its stem */}
                  <text x="633" y="578" textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="228" fill="url(#s3num)" stroke="#1D232A" strokeWidth="3">1</text>
                  <text x="633" y="574" textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="228" fill="none" stroke="#B6C2CE" strokeWidth="1.2" opacity="0.45">1</text>
                  <rect x="627" y="486" width="7" height="92" fill="#8A5A2E" opacity="0.4" />
                  {/* sandblasted and stencilled, not typed */}
                  {["NO SOLO", "WORK", "UNTIL", "PROVEN"].map((t, i) => (
                    <text key={"rl" + i} x="668" y={438 + i * 32} fontFamily={mono} fontWeight={900} fontSize="22" letterSpacing="0.4" fill="#EDE6D6" opacity={0.82 + 0.1 * Math.sin(lf / 7 + i) + rivetHit * 0.14}>{t}</text>
                  ))}
                  {[[608, 407], [760, 407], [608, 577], [760, 577]].map((b, i) => (
                    <circle key={"rb" + i} cx={b[0]} cy={b[1]} r={5.4} fill="#8E99A5" stroke="#2C333C" strokeWidth="1.4" opacity={lf >= RIVETS[i] ? 1 : 0.18} />
                  ))}
                  {/* THE POINTLESS BRACKET, riveted on at f210 for no visible reason */}
                  {lf >= 210 && (
                    <g opacity={c01((lf - 210) / 4)}>
                      <rect x="700" y="586" width="34" height="16" rx="2" fill="#4E5863" stroke="#78838F" strokeWidth="1.2" />
                      <circle cx="708" cy="594" r="2.6" fill="#8E99A5" />
                    </g>
                  )}
                </g>

                {/* THE HEIGHT POST, and THE PRE-OWNED RED PROVEN BAND: scuffed, chipped, one bolt short */}
                <rect x="250" y="440" width="22" height="260" fill="url(#s3steel)" stroke="#6E7885" strokeWidth="1.4" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <rect key={"nt" + i} x={244} y={452 + i * 24} width={i % 3 === 0 ? 34 : 20} height="2" fill="#8E99A5" opacity="0.55" />
                ))}
                {bandOn && (
                  <g opacity={c01((lf - 202) / 3)}>
                    <rect x="240" y="474" width="42" height="9" fill={RED} stroke="#7D2B20" strokeWidth="1.2" />
                    <rect x="240" y="474" width="42" height="2.4" fill="#FF9C86" opacity="0.6" />
                    <rect x="252" y="470" width="6" height="4" fill="#0D0F13" opacity="0.5" />
                    <g transform={`rotate(${Math.sin(lf * 0.28) * 9} 278 478)`}>
                      <rect x="276" y="474" width="12" height="9" fill={RED} opacity="0.9" />
                    </g>
                    <circle cx="246" cy="478" r="2.6" fill="#8E99A5" />
                  </g>
                )}

                {/* THE PEDESTRIAN ARM. Same gate, same second, opposite answer. */}
                <g transform={`rotate(${pedAng} 261 478)`}>
                  <rect x="146" y="472" width="118" height="13" rx="4" fill="#F2E6D2" stroke="#2C333C" strokeWidth="1.2" />
                  {[0, 1, 2, 3].map((i) => <rect key={"cs" + i} x={149 + i * 28} y={472.6} width="14" height="12" fill={RED} />)}
                  <rect x="146" y="472" width="118" height="3" fill="#FFFFFF" opacity="0.35" />
                  <rect x="264" y="470" width="28" height="17" rx="4" fill="#39424D" stroke="#6E7885" strokeWidth="1.2" />
                  <circle cx="288" cy="478" r="8" fill="#2C333C" stroke="#6E7885" strokeWidth="1.6" />
                </g>
                <rect x="238" y="486" width="12" height="6" rx="2" fill="#1B2028" />
                <rect x="238" y="462" width="12" height="6" rx="2" fill="#1B2028" />
                <circle cx="261" cy="478" r="7" fill="#59636E" stroke="#8E99A5" strokeWidth="1.6" />

                {/* THE CHUTE ARM, on the same shaft. It never lands on screen. */}
                <rect x="899" y="630" width="12" height="70" fill="url(#s3steel)" stroke="#6E7885" strokeWidth="1.2" />
                <g transform={`rotate(${chuteAng} 905 630)`}>
                  <rect x="745" y="626" width="160" height="9" rx="3" fill="#F2E6D2" stroke="#2C333C" strokeWidth="1" />
                  {[0, 1, 2, 3, 4].map((i) => <rect key={"cc" + i} x={748 + i * 32} y={626.5} width="15" height="8" fill={RED} />)}
                </g>
                <circle cx="905" cy="630" r="6" fill="#59636E" stroke="#8E99A5" strokeWidth="1.4" />
              </g>
            </svg>
          )}

          {/* ================= MIDGROUND: THE WRECK. Podium at f0, wall at f200, evidence at f228. ================= */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 12 }}>
            <ellipse cx="460" cy="750" rx="146" ry="16" fill="#000" opacity="0.55" />
            {/* one door lying flat on the concrete */}
            <polygon points="300,742 372,730 384,760 306,768" fill="#4A3C36" stroke="#241D1A" strokeWidth="2" />
            <polygon points="308,740 366,732 370,742 310,750" fill="#2A2320" opacity="0.7" />
            {/* slumped on its rims, nose down-left, both front wheels gone */}
            <path d="M 330 748 L 336 690 Q 344 654 400 648 L 508 648 Q 566 652 578 692 L 586 750 Z" fill="#4E3F38" stroke="#221B18" strokeWidth="3" />
            <path d="M 380 648 L 396 560 Q 402 528 442 524 L 512 522 Q 546 528 556 566 L 566 648 Z" fill="#3A2F2A" stroke="#221B18" strokeWidth="3" />
            <path d="M 396 560 L 412 536 L 508 534 L 550 566 Z" fill="#20262C" opacity="0.9" />
            <path d="M 330 748 L 336 690 Q 344 654 400 648 L 460 648 L 460 750 Z" fill="#000" opacity="0.22" />
            <rect x="336" y="688" width="250" height="6" fill="#241D1A" opacity="0.6" />
            <ellipse cx="370" cy="748" rx="26" ry="10" fill="#15181D" />
            <ellipse cx="548" cy="748" rx="26" ry="10" fill="#15181D" />
            <circle cx="370" cy="742" r="15" fill="none" stroke="#5A6672" strokeWidth="4" />
            <circle cx="548" cy="742" r="15" fill="none" stroke="#5A6672" strokeWidth="4" />
            <rect x="380" y="518" width="150" height="6" rx="2" fill="#2A2320" />
            {/* THE LIGHT BAR. His raised foot rests on it at f0, so the prop earns its place. */}
            <g transform={`rotate(${rivetHit * 2.2 + (lf >= 170 ? Math.sin(lf * 0.6) * 1.4 : 0)} 470 514)`}>
              <rect x="430" y="506" width="90" height="14" rx="3" fill="#2E353E" stroke="#4E5863" strokeWidth="1.4" />
              <rect x="436" y="509" width="24" height="8" rx="2" fill="#7A3A32" opacity="0.7" />
              <rect x="466" y="509" width="24" height="8" rx="2" fill="#2E4A5E" opacity="0.7" />
              {!lensOff && <rect x="496" y="509" width="20" height="8" rx="2" fill="#6A3028" opacity="0.65" transform={`rotate(${16 + Math.sin(lf * 0.4) * 5} 496 517)`} />}
              <line x1="496" y1="516" x2="500" y2="522" stroke="#59636E" strokeWidth="1.4" />
            </g>
            {/* the cracked lens, knocked clean off and smashed as he tumbles past at f196 */}
            {lensOff && Array.from({ length: 5 }).map((_, i) => {
              const d = lf - 196, r = seed(i * 3.7 + 2);
              return <rect key={"lz" + i} x={508 + (r - 0.5) * 40 + d * (0.7 + r)} y={Math.min(752, 520 + d * d * 0.5 + r * 8)} width="5" height="4" fill="#8A3A30" opacity="0.8" transform={`rotate(${d * 9 * r} 510 540)`} />;
            })}
            {/* roughly nine overlapping self-issued passes, one curling off the windscreen */}
            {[[406, 566, -14], [446, 556, 9], [492, 560, -6], [372, 700, 12], [420, 690, -9], [470, 686, 5], [520, 700, -13], [546, 616, 8], [356, 726, -5]].map((s, i) => (
              <g key={"dn" + i} transform={`translate(${s[0]} ${s[1]}) rotate(${s[2]})`} opacity="0.94">
                <rect x="-19" y="-14" width="38" height="28" rx="4" fill="#A8B84A" stroke="#5D6A22" strokeWidth="1.4" />
                <rect x="-19" y="-14" width="38" height="6" fill="#C6CE5C" opacity="0.7" />
                <text x="0" y="5" textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize="12" fill="#242C08">DONE</text>
                {i === 1 && <path d="M 19 -14 q 12 6 4 20" stroke="#8FA03C" strokeWidth="7" fill="none" />}
              </g>
            ))}
            <path d="M 400 528 q 8 -18 -2 -30" stroke="#4A4F58" strokeWidth="3" fill="none" opacity="0.5" />
            {/* THE GREEN TARP. Loaded on screen, nothing steel between him and it. */}
            {tarpPull < 0.02 ? (
              <g>
                <path d="M 604 742 q 26 -40 62 -34 q 20 6 6 34 z" fill="#2F5D3A" stroke="#1B3623" strokeWidth="2" />
                <path d={`M 610 736 q 16 ${-14 - Math.sin(lf * 0.2) * 8} 34 ${-10 - Math.sin(lf * 0.2) * 5}`} stroke="#3F7A4C" strokeWidth="6" fill="none" />
              </g>
            ) : (
              <g opacity={tarpPull}>
                <path d={`M ${640 - 300 * tarpPull} ${748 - 40 * tarpPull} Q 470 ${520 - 30 * tarpPull} ${330 + 20 * (1 - tarpPull)} ${700 + 48 * tarpPull} L 600 752 Z`} fill="#2F5D3A" stroke="#1B3623" strokeWidth="2.4" opacity="0.95" />
                <path d={`M 420 ${560 + 12 * Math.sin(lf * 0.3)} q 60 -22 118 4`} stroke="#3F7A4C" strokeWidth="5" fill="none" opacity="0.8" />
              </g>
            )}
          </svg>

          {/* ================= THE VILLAIN ================= */}
          <div style={{ position: "absolute", left: vF.left, top: vF.top, width: vF.size, height: vF.size, zIndex: 14, transform: `rotate(${vrot}deg)`, transformOrigin: "50% 92%" }}>
            <Villain lf={lf} size={vF.size} rain={rainO} gaze={lf < 60 ? -0.5 : lf >= 150 && lf < 178 ? -0.5 : 0} nodAmp={lf >= 200 ? 1.6 : 2.6} nodSpeed={lf >= 224 ? 5 : 11} />
            {/* his own counterfeit ink, across his own white collar. It will not dab out. */}
            {inkOn > 0.01 && [[0.42, 0.55, 12], [0.5, 0.62, 8], [0.57, 0.53, 6], [0.46, 0.68, 5]].map((b, i) => (
              <div key={"ik" + i} style={{ position: "absolute", left: vF.size * b[0], top: vF.size * b[1], width: b[2] * vsc * 1.2, height: b[2] * vsc, borderRadius: "48% 52% 40% 60%", background: FAKE, opacity: inkOn * 0.95, zIndex: 3 }} />
            ))}
            {/* the bandolier of spare dies: he has broken stamps before and has budgeted for it */}
            {[0, 1, 2, 3].map((i) => (
              <div key={"bd" + i} style={{ position: "absolute", left: vF.size * (0.31 + i * 0.055), top: vF.size * (0.52 + i * 0.048), width: 9 * vsc, height: 13 * vsc, borderRadius: 2, background: "#2A2E38", border: `${1.2 * vsc}px solid #4A5160`, zIndex: 3, transform: "rotate(-24deg)" }} />
            ))}
            {/* the mouth. A flat line. Only when needed. */}
            {lf >= 188 && lf < 202 && <div style={{ position: "absolute", left: vF.size * 0.45, top: vF.size * 0.63, width: vF.size * 0.1, height: 3.4 * vsc, background: "#151312", zIndex: 4 }} />}
            {/* the pocket square. He keeps dabbing. */}
            {lf >= 206 && <div style={{ position: "absolute", left: vF.size * (0.4 + Math.sin(lf * 0.42) * 0.06), top: vF.size * (0.56 + Math.cos(lf * 0.33) * 0.03), width: 13 * vsc, height: 11 * vsc, borderRadius: 2, background: "#E6E3DA", opacity: 0.9, zIndex: 5, transform: `rotate(${Math.sin(lf * 0.5) * 22}deg)` }} />}
          </div>

          {/* his arm, and THE DIE */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 15, pointerEvents: "none" }}>
            {lf < 200 && <line x1={vshX} y1={vshY} x2={dieX} y2={dieY + 14 * vsc} stroke={VILL} strokeWidth={15 * vsc} strokeLinecap="round" />}
            <g transform={`translate(${dieX} ${dieY}) rotate(${dieR}) scale(${vsc * 1.15})`}>
              <rect x="-11" y="4" width="22" height="46" rx="4" fill="#2A2E38" stroke="#4A5160" strokeWidth="1.6" />
              <rect x="-8" y="10" width="6" height="34" fill="#3E4553" />
              {/* the brass flip-counter on its flank */}
              <rect x="9" y="14" width="12" height="15" rx="2" fill="#8A6A2E" stroke="#5A441C" strokeWidth="1.2" />
              <rect x="11" y="17" width="8" height="9" fill="#241D0E" />
              {!broken ? (
                <>
                  <rect x="-19" y="-16" width="38" height="22" rx="3" fill="#3E4553" stroke="#5C6672" strokeWidth="1.6" />
                  <rect x="-16" y="-14" width="32" height="16" rx="2" fill={FAKE} />
                  <rect x="-16" y="-14" width="32" height="4" fill="#C6CE5C" opacity="0.6" />
                </>
              ) : (
                <>
                  {/* split open, spring out of the crack. It never works again. */}
                  <g transform="rotate(-13)"><rect x="-20" y="-16" width="19" height="22" rx="3" fill="#3E4553" stroke="#5C6672" strokeWidth="1.6" /><rect x="-17" y="-14" width="13" height="16" fill="#7F8C36" /></g>
                  <g transform="rotate(15)"><rect x="2" y="-16" width="19" height="22" rx="3" fill="#3E4553" stroke="#5C6672" strokeWidth="1.6" /><rect x="4" y="-14" width="13" height="16" fill="#7F8C36" /></g>
                  <path d="M -2 -14 q 5 -8 -2 -12 q -7 -4 0 -10" stroke="#B6C2CE" strokeWidth="2" fill="none" />
                </>
              )}
            </g>
            {/* THE SHATTER: a ring of shards and an ink burst, blowing back across his collar */}
            {lf >= 188 && lf < 226 && Array.from({ length: 22 }).map((_, i) => {
              const d = lf - 188, r = seed(i * 3.3 + 1), a = (i / 22) * Math.PI * 2 + r;
              const spd = 5 + r * 9;
              const x = 690 + Math.cos(a) * spd * d;
              const y = 460 + Math.sin(a) * spd * d * 0.7 + d * d * 0.42;
              if (y > 786) return null;
              return <rect key={"sd" + i} x={x} y={y} width={3 + r * 5} height={2.4 + r * 4} fill={i % 4 === 0 ? "#DDE87A" : FAKE} opacity={Math.max(0, 1 - d / 38)} transform={`rotate(${d * 13 * (r - 0.5)} ${x} ${y})`} />;
            })}
            {dieKick > 0 && <circle cx="690" cy="460" r={10 + (1 - dieKick) * 74} fill="none" stroke="#E4EE8C" strokeWidth={5 * dieKick} opacity={dieKick * 0.8} />}
          </svg>

          {/* ================= MID-FRONT: the puddle, the apron, the armco, the near masts ================= */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 16 }}>
            <defs><clipPath id="s3pud"><ellipse cx="330" cy="725" rx="90" ry="19" /></clipPath></defs>
            {/* THE PUDDLE. The attendant never gets it dry. */}
            <ellipse cx="330" cy="725" rx="90" ry="19" fill="#080A0E" />
            <g clipPath="url(#s3pud)">
              <rect x="240" y="706" width="180" height="38" fill="#B36A22" opacity={warm * 0.5} />
              <rect x="240" y="706" width="180" height="38" fill="#7EA6C8" opacity={cold * 0.42} />
              {warm > 0.05 && <rect x={318 + Math.sin(lf * 0.3) * 4} y="706" width="10" height="38" fill="#FFD383" opacity={warm * 0.45} />}
              {/* the rule arrives in the water a beat before it arrives in the frame */}
              {lf >= 120 && (
                <g opacity="0.5" transform={`translate(${iv([120, 150], [-190, 0])} 0)`}>
                  <rect x="250" y="712" width="160" height="4" fill="#8E99A5" opacity="0.7" />
                  <rect x="250" y="732" width="160" height="3" fill="#8E99A5" opacity="0.5" />
                  <rect x="300" y="712" width="34" height="24" fill="#B6C2CE" opacity="0.4" />
                  <rect x="262" y="712" width="4" height="26" fill="#8E99A5" opacity="0.6" />
                  <rect x="396" y="712" width="4" height="26" fill="#8E99A5" opacity="0.6" />
                </g>
              )}
              {/* the palette pivot lands on the floor, under his nubs */}
              {BANKS.slice(0, 5).map((b, i) => (floodLv(i) > 0.15 ? <rect key={"pf" + i} x={250 + i * 32} y="706" width={16} height="38" fill="#DCEBFA" opacity={0.16 * floodLv(i)} /> : null))}
              {/* the fourth rivet shatters the reflection into rings that have not settled at f254 */}
              {lf >= 170 && [0, 1, 2].map((k) => {
                const ph = ((lf - 170 + k * 15) % 44) / 44;
                return <ellipse key={"rg" + k} cx="330" cy="725" rx={10 + ph * 84} ry={(10 + ph * 84) * 0.21} fill="none" stroke="#C9D8E6" strokeWidth="1.6" opacity={(1 - ph) * 0.4} />;
              })}
            </g>
            <ellipse cx="330" cy="725" rx="90" ry="19" fill="none" stroke="#2E3742" strokeWidth="1.4" opacity="0.8" />
            {/* the cast-iron drain grate */}
            <g transform="translate(452 754)">
              <rect x="-22" y="-9" width="44" height="18" rx="2" fill="#1B2028" stroke="#3E4650" strokeWidth="1.6" />
              {[0, 1, 2, 3, 4].map((i) => <rect key={"gg" + i} x={-18 + i * 8} y={-6} width="4" height="12" fill="#0A0D11" />)}
            </g>
            {/* THE SHARD, spinning like a dropped coin at the grate's lip. Still spinning down at f254. */}
            {lf >= 188 && (
              <g transform="translate(466 760)">
                <ellipse cx="0" cy="4" rx="7" ry="2" fill="#000" opacity="0.5" />
                <rect x="-4" y="-9" width="8" height="11" rx="1.4" fill={FAKE} transform={`scale(${Math.abs(Math.cos((shardSpin * Math.PI) / 180)) * shardAmp + 0.12}, 1) rotate(${Math.sin(shardSpin * 0.02) * 12})`} />
              </g>
            )}
            {/* the wheel-nut, nudged along a slow arc by the impacts all scene */}
            <circle cx={iv([0, 254], [560, 505])} cy={iv([0, 254], [770, 790])} r="5" fill="#59636E" stroke="#2C333C" strokeWidth="1.2" />
            {/* the top tyre, flopped off by the fourth rivet's shake, rolling for the rest of the scene */}
            {tyreGo && (
              <g transform={`translate(${iv([170, 254], [56, 268])} ${iv([170, 254], [672, 754])}) rotate(${(lf - 170) * 7})`}>
                <circle r={17} fill="#15181D" stroke="#0A0C10" strokeWidth="2" />
                <circle r={7} fill="#3E4650" />
              </g>
            )}
            {Array.from({ length: tyreGo ? 3 : 4 }).map((_, i) => (
              <g key={"ty" + i}>
                <ellipse cx="55" cy={748 - i * 25} rx="38" ry="13" fill="#181C22" stroke="#0A0C10" strokeWidth="2" />
                <ellipse cx="55" cy={744 - i * 25} rx="38" ry="13" fill="#22272E" stroke="#0A0C10" strokeWidth="2" />
                <ellipse cx="55" cy={744 - i * 25} rx="15" ry="5" fill="#3E4650" />
              </g>
            ))}

            {/* THE TWO NEAR SODIUM MASTS. The old lawless orange is his key light for the whole plea. */}
            {NSOD.map((m, i) => {
              const lv = nearSod(i);
              return (
                <g key={"nm" + i}>
                  <rect x={m.x - 6} y={m.head} width="12" height={m.base - m.head} fill="#20252C" />
                  <rect x={m.x - 4} y={m.head} width="3" height={m.base - m.head} fill="#39424D" opacity="0.6" />
                  <rect x={m.x - 9} y={m.base - 8} width="18" height="8" fill="#2C333C" />
                  <rect x={m.x - 26} y={m.head - 14} width="52" height="15" rx="5" fill="#333A44" stroke="#4E5863" strokeWidth="1.4" />
                  <rect x={m.x - 20} y={m.head} width="40" height="7" rx="3" fill="#FFD383" opacity={Math.min(1, lv)} />
                  {i === 0 && <ellipse cx={m.x + 6} cy={m.head + 3} rx="6" ry="3" fill="#2A1C0A" opacity={0.8 * Math.min(1, lv + 0.3)} />}
                </g>
              );
            })}

            {/* THE ARMCO, RUN A. Up through the wreck's downstage sill: the way up is now inside a wall. */}
            {Array.from({ length: 6 }).map((_, i) => {
              const up = over(lf, 196 + i * 1.8, 5, Easing.out(Easing.back(2)));
              if (up <= 0.01) return null;
              const t = i / 6, t2 = (i + 1) / 6;
              const x1 = 770 - 340 * t, y1 = 697 + 95 * t;
              const x2 = 770 - 340 * t2, y2 = 697 + 95 * t2;
              const h = (17 + t * 12) * up;
              return (
                <g key={"aa" + i} opacity={up}>
                  <polygon points={`${x1},${y1} ${x2},${y2} ${x2},${y2 - h * 2.2} ${x1},${y1 - h * 2}`} fill={i === 2 ? "#7A828C" : "#8E99A5"} stroke="#4E5863" strokeWidth="1.6" />
                  <polygon points={`${x1},${y1 - h * 0.9} ${x2},${y2 - h} ${x2},${y2 - h * 1.4} ${x1},${y1 - h * 1.3}`} fill="#5C6672" opacity="0.7" />
                  <rect x={x2 - 3} y={y2 - h * 2.2} width="6" height={h * 2.4} fill="#39424D" />
                  {i === 2 && <ellipse cx={(x1 + x2) / 2} cy={y1 - h * 1.2} rx="9" ry="5" fill="#5C6672" opacity="0.7" />}
                </g>
              );
            })}
            {/* RUN B. Each new segment arriving at his back is what moves him. */}
            {Array.from({ length: 6 }).map((_, i) => {
              const up = over(lf, 224 + i * 4.4, 5, Easing.out(Easing.back(2)));
              if (up <= 0.01) return null;
              const t = i / 6, t2 = (i + 1) / 6;
              const x1 = 770 + 180 * t, y1 = 697 - 45 * t;
              const x2 = 770 + 180 * t2, y2 = 697 - 45 * t2;
              const h = (16 - t * 8) * up;
              return (
                <g key={"ab" + i} opacity={up * 0.9}>
                  <polygon points={`${x1},${y1} ${x2},${y2} ${x2},${y2 - h * 2} ${x1},${y1 - h * 2.1}`} fill="#8E99A5" stroke="#4E5863" strokeWidth="1.4" />
                  <rect x={x2 - 2.4} y={y2 - h * 2} width="5" height={h * 2.2} fill="#39424D" />
                </g>
              );
            })}

            {/* THE SPIDER BOX. Every light in this scene is caused by a Claude's nub on a lever. */}
            <rect x="736" y="742" width="56" height="44" rx="4" fill="#3A3038" stroke="#5C4E58" strokeWidth="2" />
            <rect x="736" y="742" width="56" height="6" fill="#5C4E58" />
            {FLOODT.map((t, i) => (
              <rect key={"br" + i} x={742 + (i % 3) * 17} y={752 + Math.floor(i / 3) * 17} width="12" height="12" rx="2" fill={lf >= t ? "#6E7885" : "#C9CDD6"} opacity={lf >= t ? 0.6 : 1} />
            ))}
            <path d="M 736 780 Q 560 796 400 748 Q 300 720 118 776" stroke="#151A20" strokeWidth="7" fill="none" opacity="0.85" />
            <path d="M 792 774 Q 880 764 972 700" stroke="#151A20" strokeWidth="5" fill="none" opacity="0.7" />
            <rect x="826" y="756" width="30" height="22" rx="3" fill="#2E353E" stroke="#4E5863" strokeWidth="1.4" />
          </svg>

          {/* ================= THE NIGHT CREW ================= */}
          {/* THE ATTENDANT. Conscripted into the OS, and he has not noticed. */}
          {crew("at", 300, 692, 0.55, { hiVis: 1, z: 13, gaze: lf >= 120 && lf < 152 ? 0.4 : -0.3, nod: 2.4, sp: 7 })}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 13, pointerEvents: "none" }}>
            {(() => {
              const wand = lf >= 112, guide = lf >= 120 && lf < 152;
              const tipX = 352 + (guide ? Math.sin(lf * 0.5) * 16 : Math.sin(lf * 0.24) * 24);
              const tipY = 692 - (wand ? 96 + (guide ? Math.sin(lf * 0.5 + 1) * 20 : 0) : 12);
              return (
                <g>
                  <line x1={322} y1={630} x2={tipX} y2={tipY} stroke={wand ? "#3E4650" : "#6E5A44"} strokeWidth="4" strokeLinecap="round" />
                  {wand ? (
                    <>
                      <rect x={tipX - 4} y={tipY - 26} width="8" height="28" rx="4" fill="#B84A38" opacity={0.55 + Math.abs(Math.sin(lf * 0.6)) * 0.45} />
                      <rect x={tipX - 7} y={tipY - 30} width="14" height="8" rx="4" fill="#FF9C86" opacity={0.7 + Math.abs(Math.sin(lf * 0.6)) * 0.3} />
                    </>
                  ) : (
                    <rect x={tipX - 16} y={tipY - 4} width="32" height="7" rx="2" fill="#2C333C" />
                  )}
                  <rect x="256" y="676" width="20" height="16" rx="3" fill="#3E4650" stroke="#6E7885" strokeWidth="1.2" />
                  <path d="M 256 676 q 10 -10 20 0" stroke="#8E99A5" strokeWidth="1.6" fill="none" />
                </g>
              );
            })()}
          </svg>

          {/* THE SPARKY. Still leaning on the last lever at f254. */}
          {crew("sk", 826, 788, 0.48, { hiVis: 1, z: 17, gaze: -0.6, nod: 2, sp: 9, rot: FLOODT.reduce((a, t) => a + pulse(t, 5), 0) * -7 })}
          {/* the two hi-vis Claudes in ear defenders, torquing the foot plates at f150 */}
          {gateVis && crew("h1", 32, 706, 0.3, { hiVis: 1, z: 17, o: 0.9, gaze: 0.4, nod: lf >= 150 && lf < 168 ? 5 : 1.5, sp: lf >= 150 && lf < 168 ? 2 : 9 })}
          {gateVis && crew("h2", 976, 704, 0.3, { hiVis: 1, z: 17, o: 0.9, gaze: -0.4, nod: lf >= 150 && lf < 168 ? 5 : 1.5, sp: lf >= 150 && lf < 168 ? 2 : 9 })}
          {/* THE LATCH-KICKER. The fence does not decide to rise. A guy kicks it. */}
          {lf >= 194 && !(lf >= 210 && lf < 222) && (() => {
            const runB = lf >= 222;
            const t = runB ? c01((lf - 224) / 26) : c01((lf - 196) / 10);
            const x = runB ? 770 + 180 * t : 770 - 340 * t;
            const y = (runB ? 697 - 45 * t : 697 + 95 * t) + 26;
            return crew("lk", x + 26, y, runB ? 0.3 - t * 0.12 : 0.3 + t * 0.12, { hiVis: 1, z: 17, o: 0.9, gaze: -0.4, nod: 5, sp: 3 });
          })()}
          {/* THE BOLT-GUN CLAUDE, in the picker, air line trailing to a compressor puttering on the apron */}
          {lf >= 138 && (
            <>
              <div style={{ position: "absolute", left: 800, top: iv([138, 150, 254], [720, 556, 556]) - 8, width: 96, height: 42, borderRadius: 4, background: "#3E4650", border: "2px solid #6E7885", zIndex: 12, opacity: 0.9 }} />
              <div style={{ position: "absolute", left: 840, top: iv([138, 150, 254], [720, 556, 556]) + 30, width: 14, height: Math.max(0, 762 - iv([138, 150, 254], [720, 556, 556])), background: "#2C333C", zIndex: 11, opacity: 0.8 }} />
              {crew("bg", 848, iv([138, 150, 254], [720, 556, 556]), 0.3, { hiVis: 1, z: 13, o: 0.95, gaze: -0.6, nod: RIVETS.reduce((a, t) => a + pulse(t, 5), 0) * 8 + 1.5, sp: 4 })}
            </>
          )}

          {/* THE LEFT-OUT ROOKIE. Upside-down L, quietly rotated at f244 while nobody is looking. */}
          {crew("lo", 128, 728, 0.44, { z: 13, o: 0.62, gaze: 0.5, nod: 2, sp: 10, cap: 1, kids: Lbib(30, lf < 244) })}
          {/* ...and at f248 he quietly copies the hero's measure */}
          {lf >= 248 && <div style={{ position: "absolute", left: 132, top: 618 - c01((lf - 248) / 6) * 16, width: 22, height: 8, borderRadius: 3, background: "#D97757", zIndex: 14, opacity: 0.7 }} />}

          {/* ================= THE HERO ================= */}
          <div style={{ position: "absolute", left: heroL, top: heroTop, width: heroSize, height: heroSize, zIndex: 18, transform: `rotate(${heroRot}deg)`, transformOrigin: "50% 92%" }}>
            <div style={{ position: "absolute", left: 30, top: 212, width: 190, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(7px)" }} />
            <Mascot lf={lf} size={heroSize} capBack={1}
              gaze={lf >= 96 && lf < 150 ? 0.4 : lf >= 168 && lf < 200 ? -0.3 : 0}
              nodAmp={lf < 78 ? 4.4 : lf >= 96 && lf < 148 ? 5 : 2}
              nodSpeed={lf < 78 ? 5 : lf >= 96 && lf < 148 ? 3.2 : 9}
              cheer={lf < 44 ? 0.9 : 0} />
            {/* the L-plate, worn square on the chest like a marathon bib */}
            <div style={{ position: "absolute", left: 96, top: 128, width: 58, height: 58, borderRadius: 7, background: "#F4EFE4", border: `4px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: RED, lineHeight: 1, boxShadow: "0 6px 12px rgba(0,0,0,0.45)" }}>L</div>
            {/* the crooked DONE across his forehead. The more he scrubs, the wider it gets. */}
            {lf >= 42 && (
              <div style={{ position: "absolute", left: 125 - 30 * smear, top: 64, width: 60 * smear, height: 20 + 3 * smear, borderRadius: 3, background: FAKE, opacity: 0.88 - (smear - 1) * 0.12, transform: `rotate(${-9 + smear * 3}deg)`, filter: `blur(${(smear - 1) * 1.6}px)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#242C08", overflow: "hidden" }}>DONE</div>
            )}
            {/* by f130 his nubs are yellow-green too */}
            {nubFake > 0.02 && (
              <>
                <div style={{ position: "absolute", left: 10, top: 105, width: 30, height: 32, background: FAKE, opacity: nubFake * 0.75, borderRadius: 3 }} />
                <div style={{ position: "absolute", left: 208, top: 105, width: 30, height: 32, background: FAKE, opacity: nubFake * 0.75, borderRadius: 3 }} />
              </>
            )}
            {/* the lanyard, and the blank unlaminated provisional card held out to YOU */}
            <div style={{ position: "absolute", left: 122, top: 108, width: 3, height: 26, background: "#2C333C" }} />
            <div style={{
              position: "absolute", left: 100 - cardOut * 26, top: 130 - cardOut * 22,
              width: 46 + cardOut * 34, height: 32 + cardOut * 22, borderRadius: 3, background: PAPER, border: `1.5px solid ${MUTE}`,
              transform: `rotate(${cardOut > 0.5 ? -6 + Math.sin(lf * 0.3) * 3 : Math.sin(lf * 0.22) * 13 - heroRot * 0.5}deg)`,
              transformOrigin: cardOut > 0.5 ? "50% 50%" : "50% -70%",
              boxShadow: "0 5px 11px rgba(0,0,0,0.45)", zIndex: 4,
            }}>
              <div style={{ position: "absolute", left: 3, top: 3, width: (32 + cardOut * 22) * 0.36, height: (32 + cardOut * 22) * 0.6, background: "#DCD5C6", borderRadius: 1 }} />
              <div style={{ position: "absolute", right: 3, top: 5, width: (46 + cardOut * 34) * 0.44, height: 2.4, background: "#CEC6B5" }} />
              <div style={{ position: "absolute", right: 3, top: 12, width: (46 + cardOut * 34) * 0.32, height: 2.4, background: "#CEC6B5" }} />
              <div style={{ position: "absolute", left: 3, bottom: 3, right: 3, height: (32 + cardOut * 22) * 0.2, background: "#E6DFD0" }} />
            </div>
            {/* he slides a nub up the top of his own head. Nobody asked him to. */}
            {measure > 0.01 && <div style={{ position: "absolute", left: 84, top: 46 - measure * 4, width: 86, height: 11, borderRadius: 4, background: CLAY, border: "1.5px solid rgba(0,0,0,0.4)", opacity: measure, boxShadow: "0 4px 8px rgba(0,0,0,0.45)", zIndex: 5 }} />}
          </div>
          {/* the gap. He looks, and he holds it there to the cut. */}
          {measure > 0.02 && lf >= 232 && (
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 19, pointerEvents: "none" }}>
              <line x1={heroX - 44} y1={heroTop + 48} x2={262} y2={heroTop + 48} stroke="#E7E3D6" strokeWidth="1.6" strokeDasharray="6 5" opacity={measure * 0.75} />
              <line x1={252} y1={483 + gateDY} x2={252} y2={heroTop + 48} stroke="#E7E3D6" strokeWidth="1.4" strokeDasharray="4 4" opacity={measure * 0.6} />
            </svg>
          )}

          {/* ================= FOREGROUND OCCLUDER + ATMOS ================= */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 30, pointerEvents: "none" }}>
            {/* shards tumbling THROUGH the near field, past the lens */}
            {lf >= 188 && Array.from({ length: 7 }).map((_, i) => {
              const d = lf - 188 - i * 2.5, r = seed(i * 4.1 + 6);
              if (d < 0 || d > 46) return null;
              return <rect key={"nf" + i} x={640 - d * (7 + r * 8)} y={450 + d * d * 0.5} width={10 + r * 14} height={8 + r * 10} rx="2" fill={FAKE} opacity={Math.max(0, 0.6 - d / 60)} transform={`rotate(${d * 11} ${640 - d * 8} 480)`} />;
            })}
            {/* the cracked concrete wheel-stop and the sagging bollard chain */}
            <polygon points="-10,792 -10,748 126,738 178,760 178,792" fill="#0D1116" />
            <polygon points="-10,748 126,738 178,760 -10,772" fill="#191E25" />
            <path d="M 40 742 l 8 22 M 92 738 l 5 20" stroke="#0A0C10" strokeWidth="2.4" />
            <rect x="188" y="726" width="16" height="66" rx="5" fill="#0F1318" />
            <path d="M -6 764 Q 96 800 196 758" stroke="#0B0E12" strokeWidth="7" fill="none" />
            <path d="M -6 764 Q 96 800 196 758" stroke="#232A32" strokeWidth="2.4" fill="none" strokeDasharray="9 6" />
            <rect x="0" y="0" width="1012" height="792" fill="url(#s3vig)" />
            {/* the three-frame floor. The mix rises as the light dies, so this is never a void. */}
            <rect x="0" y="0" width="1012" height="792" fill="#05070A" opacity={blackout * 0.88} />
          </svg>

          {/* his rain, repeated in the puddle. In the near-black it is the only lit thing in the frame. */}
          <div style={{ position: "absolute", left: 250, top: 706, width: 160, height: 38, overflow: "hidden", zIndex: 31, opacity: glyphBand * rainO, transform: "scaleY(-0.55)", transformOrigin: "50% 50%" }}>
            <CodeRain lf={lf * 0.6} x={2} y={-6} h={54} cols={4} o={0.9} gap={38} />
          </div>
        </div>
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
