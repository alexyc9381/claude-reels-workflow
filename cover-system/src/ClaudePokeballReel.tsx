import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_pokeball.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", PURP = "#4B3E8E";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const VO_SPD = 1.04; // VO sped 1.04x (wav resampled + captions compressed) -> compress the whole visual timeline to match
const fr = (s: number) => Math.round((s * FPS) / VO_SPD);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, stop-slop, ClaudeMem, UI-UX Pro Max, Task Observer, Find Skills, cta
const L = [0.0, 6.204, 17.104, 20.464, 24.854, 31.034, 40.494, 52.526, 60.15];  // POKEBALL 9 scenes (flubs + stutter removed; pre-boundary pauses -1.09s; dead leading silence -0.40s)
const Lf = L.map(fr);
const CUT = 64.13;
// R0 game-show wheel: highlight steps (sec) that ding as the selector sweeps the 5 files, decelerating -> jackpot
const WHEEL = [0.5, 0.63, 0.77, 0.93, 1.11, 1.32, 1.57, 1.86];
const CLOCK_START = CUT - 3.6;
const BURST = CUT + 1;

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
// per-scene ambient-bed volume envelope (fades in/out at the scene windows)
const ambEnv = (ff: number, wins: number[][], v: number) => {
  for (const [a, b] of wins) {
    if (ff >= fr(a) - 12 && ff <= fr(b) + 12) {
      const fin = interpolate(ff, [fr(a) - 8, fr(a) + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const fout = interpolate(ff, [fr(b) - 12, fr(b) + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return v * Math.min(fin, fout);
    }
  }
  return 0;
};

// classic Super Mario Bros pixel cloud (rounded white cluster)
const MCloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "0 0" }}>
    <div style={{ position: "absolute", left: 0, top: 22, width: 150, height: 40, borderRadius: 24, background: "#FFFFFF", boxShadow: "0 3px 0 rgba(120,150,210,0.25)" }} />
    <div style={{ position: "absolute", left: 20, top: 4, width: 46, height: 46, borderRadius: "50%", background: "#FFFFFF" }} />
    <div style={{ position: "absolute", left: 56, top: -8, width: 62, height: 62, borderRadius: "50%", background: "#FFFFFF" }} />
    <div style={{ position: "absolute", left: 100, top: 6, width: 44, height: 44, borderRadius: "50%", background: "#FFFFFF" }} />
    <div style={{ position: "absolute", left: 8, top: 40, width: 138, height: 20, borderRadius: 12, background: "rgba(210,228,255,0.9)" }} />
  </div>
);
// green hill mound with the Mario face-dots
const MHill: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, bottom: y, width: 340 * s, height: 200 * s, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg,#7EC64F,#4E9E38)", boxShadow: "inset 0 -10px 0 rgba(0,0,0,0.08)" }}>
    <div style={{ position: "absolute", left: "34%", top: "44%", width: 14 * s, height: 20 * s, borderRadius: "50%", background: "#3C8A2C" }} />
    <div style={{ position: "absolute", left: "56%", top: "44%", width: 14 * s, height: 20 * s, borderRadius: "50%", background: "#3C8A2C" }} />
  </div>
);
// ===== detailed POKEMON-region world behind the phone (skyline top + grassy route bottom) =====
const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const drift = (spd: number, amp: number, ph = 0) => Math.sin(f / spd + ph) * amp;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#F6F0E6 0%,#F1E8DA 42%,#EADDC9 74%,#E3D3BC 100%)" }}>
      {/* warm clay halo behind the phone (Claude brand warmth) */}
      <div style={{ position: "absolute", left: "50%", top: 780, width: 1560, height: 1560, marginLeft: -780, marginTop: -780, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.22) 0%, rgba(210,114,78,0.09) 33%, rgba(210,114,78,0) 60%)" }} />
      {/* slow-rotating Claude sunburst rays behind the panel (brand motif, subtle) */}
      <div style={{ position: "absolute", left: "50%", top: 800, width: 1720, height: 1720, marginLeft: -860, marginTop: -860, transform: `rotate(${f * 0.1}deg)` }}>
        {Array.from({ length: 24 }).map((_, i) => { const a = (i / 24) * 360; return <div key={`ray${i}`} style={{ position: "absolute", left: "50%", top: "50%", width: i % 2 ? 6 : 3, height: 860, marginLeft: -3, transformOrigin: "50% 0%", transform: `rotate(${a}deg)`, background: "linear-gradient(180deg, rgba(204,120,92,0.09), rgba(204,120,92,0) 58%)" }} />; })}
      </div>
      {/* big blurred clay depth blobs (marketing-style warmth) */}
      <div style={{ position: "absolute", left: -180 + drift(120, 20), top: 90, width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,150,110,0.24), rgba(226,150,110,0) 66%)", filter: "blur(26px)" }} />
      <div style={{ position: "absolute", right: -200 + drift(140, 18, 2), bottom: 60, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(198,120,90,0.22), rgba(198,120,90,0) 66%)", filter: "blur(30px)" }} />
      {/* floating soft clay bokeh dots */}
      {[[120, 240, 26, 0.16], [900, 170, 34, 0.13], [300, 1520, 30, 0.14], [820, 1560, 24, 0.12], [180, 1360, 28, 0.13], [560, 300, 20, 0.11], [980, 900, 24, 0.1], [70, 840, 30, 0.12], [640, 1460, 22, 0.12]].map(([x, y, s, o], i) => (
        <div key={`bk${i}`} style={{ position: "absolute", left: (x as number) + drift(60, 12, i), top: (y as number) + drift(52, 14, i + 3), width: s as number, height: s as number, borderRadius: "50%", background: `rgba(206,122,88,${o})`, filter: "blur(2px)" }} />
      ))}
      {/* soft grain sheen top + warm shadow bottom for depth */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 380, background: "linear-gradient(180deg, rgba(255,251,242,0.55), rgba(255,251,242,0))" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 440, background: "linear-gradient(0deg, rgba(150,88,58,0.15), rgba(150,88,58,0))" }} />
    </AbsoluteFill>
  );
};

const Panel: React.FC<{ children?: React.ReactNode; tint?: string; label?: string }> = ({ children, tint, label }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 404, height: 792, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(120,150,210,0.22)"}` }}>
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
export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; mario?: number; run?: number; jump?: number; rainbow?: number; trainer?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, mario = 0, run = 0, jump = 0, rainbow = 0, trainer = 0 }) => {
  const C = rainbow > 0.02 ? `hsl(${Math.round((lf * 15) % 360)}, 88%, ${Math.round(60 + Math.sin(lf / 2.5) * 6)}%)` : "#D97757";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const shockJump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  // MARIO secondary motion: opt-in run/jump + always-on idle breathe + hand bob
  const runF = Math.max(0, Math.min(1, run));
  const jP = Math.max(0, Math.min(1, jump));
  const marioIdle = mario > 0 ? Math.sin(lf / 16) * 2.6 : 0;                 // tiny vertical breathe
  const gloveBob = Math.sin(lf / 9) * 3.5;                                    // gentle hand bob
  const mLeg = (i: number) => legLift(i) + (runF > 0 ? Math.max(0, Math.sin(lf / 4 + i * Math.PI)) * 9 * runF : 0);
  const armY = 86 - hop * 0.4 - cheer * 26 - jP * 16;
  const armRotL = cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : (jP > 0.05 ? `rotate(${-jP * 20} 21 ${armY + 13})` : undefined);
  const armRotR = cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : (jP > 0.05 ? `rotate(${jP * 20} 179 ${armY + 13})` : undefined);
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop - shockJump - marioIdle - jP * 46 - cheer * 10}px) rotate(${runF * 5}deg) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={armRotL} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={armRotR} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {/* white wise beard */}
        {beard > 0 && <>
          <rect x={44} y={98} width={112} height={26} fill="#F4EEE2" />
          <rect x={56} y={122} width={88} height={20} fill="#F4EEE2" />
          <rect x={74} y={140} width={52} height={16} fill="#F4EEE2" />
          <rect x={90} y={154} width={20} height={12} fill="#EDE6D6" />
        </>}
        {/* police uniform: bright blue jacket + gold buttons + badge */}
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" />
          <rect x={34} y={106} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={116} width={9} height={9} fill="#E7B24C" />
          <rect x={96} y={130} width={9} height={9} fill="#E7B24C" />
          <rect x={48} y={114} width={13} height={13} fill="#E7B24C" />
          <rect x={51} y={111} width={7} height={4} fill="#E7B24C" />
        </>}
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
        {/* ============ MARIO costume (detailed) ============ */}
        {mario > 0 && <>
          {/* --- red long-sleeve caps on the shoulders (follow the arms) --- */}
          <rect x={8 - cheer * 4} y={armY} width={26} height={14} rx={4} fill="#E0322A" transform={armRotL} />
          <rect x={8 - cheer * 4} y={armY} width={26} height={4} rx={2} fill="#F0574C" transform={armRotL} />
          <rect x={166 + cheer * 4} y={armY} width={26} height={14} rx={4} fill="#E0322A" transform={armRotR} />
          <rect x={166 + cheer * 4} y={armY} width={26} height={4} rx={2} fill="#F0574C" transform={armRotR} />
          {/* --- white gloves at the hands (idle bob, out-of-phase) --- */}
          <rect x={5 - cheer * 4} y={armY + 24 + gloveBob} width={31} height={21} rx={10} fill="#FBF7EF" stroke="#DAD1BF" strokeWidth={1.6} transform={armRotL} />
          <rect x={9 - cheer * 4} y={armY + 27 + gloveBob} width={9} height={7} rx={3} fill="#8E7F45" transform={armRotL} />
          <rect x={164 + cheer * 4} y={armY + 24 - gloveBob} width={31} height={21} rx={10} fill="#FBF7EF" stroke="#DAD1BF" strokeWidth={1.6} transform={armRotR} />
          <rect x={182 + cheer * 4} y={armY + 27 - gloveBob} width={9} height={7} rx={3} fill="#8E7F45" transform={armRotR} />
          {/* --- blue overalls: full-fit bib (sits BELOW the face) + shoulder straps OUTSIDE the eyes + buttons --- */}
          <rect x={36} y={108} width={128} height={42} rx={8} fill="#2E63C4" />
          <rect x={36} y={108} width={128} height={7} rx={4} fill="#4A82E0" />
          <rect x={36} y={142} width={128} height={9} rx={4} fill="#234FA0" />
          {/* shoulder straps at the outer shoulders (eyes live at x70-131, straps clear them) */}
          <rect x={44} y={74} width={15} height={40} rx={5} fill="#2E63C4" />
          <rect x={44} y={74} width={15} height={5} rx={2} fill="#4A82E0" />
          <rect x={141} y={74} width={15} height={40} rx={5} fill="#2E63C4" />
          <rect x={141} y={74} width={15} height={5} rx={2} fill="#4A82E0" />
          {/* gold buttons where the straps meet the bib */}
          <circle cx={51} cy={122} r={6.5} fill="#F2C14E" stroke="#B98A25" strokeWidth={1.6} />
          <circle cx={48.5} cy={119.5} r={2} fill="#FCE4A6" />
          <circle cx={149} cy={122} r={6.5} fill="#F2C14E" stroke="#B98A25" strokeWidth={1.6} />
          <circle cx={146.5} cy={119.5} r={2} fill="#FCE4A6" />
          {/* --- blue overall leg fronts (pump on run) --- */}
          <rect x={52} y={146 - mLeg(0)} width={17} height={30} fill="#2E63C4" />
          <rect x={77} y={146 - mLeg(1)} width={17} height={30} fill="#2E63C4" />
          <rect x={124} y={146 - mLeg(0)} width={17} height={30} fill="#2E63C4" />
          <rect x={149} y={146 - mLeg(1)} width={17} height={30} fill="#2E63C4" />
          {/* --- brown boots --- */}
          <rect x={48} y={175 - mLeg(0)} width={26} height={11} rx={3} fill="#5A3A1E" />
          <rect x={48} y={175 - mLeg(0)} width={26} height={3} rx={2} fill="#754B27" />
          <rect x={121} y={175 - mLeg(1)} width={26} height={11} rx={3} fill="#5A3A1E" />
          <rect x={121} y={175 - mLeg(1)} width={26} height={3} rx={2} fill="#754B27" />
        </>}
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {/* MARIO keeps the CLEAN base Claude face (no face overlays) — Mario flair is the cap + overalls only */}
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
        {/* police cap: blue crown + band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
        </>}
        {/* MARIO red cap: rounded dome + top highlight + shade band + curved front brim + white C roundel */}
        {mario > 0 && <>
          <rect x={38} y={15} width={124} height={27} rx={13} fill="#E0322A" />
          <rect x={44} y={16} width={112} height={7} rx={4} fill="#F0574C" />
          <rect x={38} y={31} width={124} height={11} fill="#B4231B" />
          <rect x={22} y={39} width={130} height={13} rx={6} fill="#B4231B" />
          <rect x={22} y={39} width={130} height={4} rx={2} fill="#C93028" />
          <circle cx={100} cy={28} r={13.5} fill="#F7F1E6" stroke="#D9CFBC" strokeWidth={1.4} />
          <circle cx={100} cy={28} r={13.5} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1} />
          <text x={100} y={35} textAnchor="middle" fontFamily={fraunces.fontFamily} fontSize={18} fontWeight={900} fill="#E0322A">C</text>
        </>}
        {/* POKEMON TRAINER: jacket outfit (clothes the body) + red League cap */}
        {trainer > 0 && <>
          {/* --- blue trainer JACKET clothing the torso --- */}
          <rect x={36} y={104} width={128} height={46} rx={9} fill="#2E63C4" />
          <rect x={36} y={104} width={128} height={8} rx={4} fill="#4E86E4" />
          <rect x={36} y={143} width={128} height={9} rx={4} fill="#21489A" />
          {/* white collar V + red under-collar */}
          <path d="M64 104 L100 132 L136 104 Z" fill="#F4F0E8" />
          <path d="M74 104 L100 124 L126 104 Z" fill="#2E63C4" />
          <path d="M64 104 L100 132 L136 104" fill="none" stroke="#D9D2C2" strokeWidth={1.4} />
          {/* gold zipper */}
          <rect x={97} y={112} width={6} height={34} rx={3} fill="#F2C14E" />
          {[118, 127, 136].map((yy, i) => <rect key={`z${i}`} x={94} y={yy} width={12} height={2.4} fill="#C9971E" />)}
          {/* red chest-panel accents */}
          <rect x={44} y={116} width={22} height={10} rx={4} fill="#E8403A" />
          <rect x={134} y={116} width={22} height={10} rx={4} fill="#E8403A" />
          {/* belt with a pokeball buckle */}
          <rect x={40} y={139} width={120} height={8} rx={2} fill="#2A2018" />
          <circle cx={100} cy={143} r={7.2} fill="#F4F0E8" stroke="#26262A" strokeWidth={1.4} />
          <path d="M92.8 143 a7.2 7.2 0 0 1 14.4 0 Z" fill="#E23B2E" />
          <rect x={92.8} y={141.8} width={14.4} height={2} fill="#26262A" />
          {/* jacket sleeves on the arm nubs */}
          <rect x={8} y={armY} width={26} height={20} rx={6} fill="#2E63C4" transform={armRotL} />
          <rect x={8} y={armY} width={26} height={5} rx={2} fill="#4E86E4" transform={armRotL} />
          <rect x={166} y={armY} width={26} height={20} rx={6} fill="#2E63C4" transform={armRotR} />
          <rect x={166} y={armY} width={26} height={5} rx={2} fill="#4E86E4" transform={armRotR} />
          {/* --- red League cap --- */}
          <rect x={38} y={13} width={124} height={27} rx={13} fill="#E8403A" />
          <rect x={44} y={14} width={112} height={7} rx={4} fill="#F4635B" />
          <rect x={38} y={30} width={124} height={10} fill="#C42E28" />
          <rect x={52} y={25} width={96} height={16} rx={8} fill="#F4F0E8" />
          <rect x={20} y={38} width={134} height={13} rx={6} fill="#C42E28" />
          <rect x={20} y={38} width={134} height={4} rx={2} fill="#E8403A" />
          <circle cx={100} cy={31} r={9.2} fill="#F4F0E8" stroke="#26262A" strokeWidth={1.6} />
          <path d="M90.8 31 a9.2 9.2 0 0 1 18.4 0 Z" fill="#E23B2E" />
          <rect x={90.8} y={29.8} width={18.4} height={2.4} fill="#26262A" />
          <circle cx={100} cy={31} r={2.7} fill="#F4F0E8" stroke="#26262A" strokeWidth={1.3} />
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
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.12, width: size * 0.058, height: size * 0.082, background: "linear-gradient(180deg,#CFEBFB,#5AA6D8)", borderRadius: "62% 62% 55% 55% / 82% 82% 46% 46%", opacity: Math.min(1, shock * 1.5), boxShadow: "inset -1px -1.5px 2px rgba(28,78,120,0.4)", transform: "rotate(9deg)" }} />}
    </div>
  );
};

const SFX_GAIN = 0.38; // global SFX bus trim — kept low so SFX are subtle accents under the VO
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v * SFX_GAIN} /></Sequence>
);

// ---------------- the PYRAMID set (shared by scenes) ----------------
const PYR = { baseY: 640, midY: 470, topY: 300, cx: 506 };
const Pyramid: React.FC<{ lf: number; lit?: number[]; gateGlow?: number; assemble?: boolean }> = ({ lf, lit = [1, 1, 1], gateGlow = 0, assemble = false }) => {
  const lv = (_i: number) => 1;
  const W = [720, 500, 300];
  const Y = [PYR.baseY, PYR.midY, PYR.topY];
  return (<>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: PYR.cx - (W[i] / 2), top: Y[i], width: W[i], height: 115, transform: `scale(${lv(i)})`, opacity: Math.min(1, lv(i) * 1.2) * (0.45 + lit[i] * 0.55), borderRadius: 14, background: `linear-gradient(180deg, ${["#31415F", "#3A4E74", "#44598A"][i]}, ${["#243149", "#2B3A57", "#334263"][i]})`, border: "2.5px solid rgba(150,175,220,0.4)", boxShadow: lit[i] > 0.6 ? "0 18px 40px -14px rgba(10,16,34,0.7), inset 0 2px 0 rgba(255,255,255,0.1)" : "inset 0 0 40px rgba(0,0,0,0.4)" }}>
        {/* stone seams */}
        {Array.from({ length: 3 }, (_, k) => <div key={k} style={{ position: "absolute", left: `${20 + k * 25}%`, top: k % 2 ? 8 : 62, width: 3, height: 50, background: "rgba(10,16,30,0.35)", borderRadius: 2 }} />)}
      </div>
    ))}
    {/* the GATES between levels */}
    {[0, 1].map((g) => {
      const gy = g === 0 ? 608 : 440;
      const gw = g === 0 ? 150 : 120;
      return (
        <div key={g} style={{ position: "absolute", left: PYR.cx - gw / 2, top: gy - 12, width: gw, height: 22, borderRadius: 8, background: gateGlow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#1B2740", border: `2.5px solid ${gateGlow > 0.05 ? "#F6E4A0" : "rgba(231,178,76,0.5)"}`, boxShadow: gateGlow > 0.05 ? `0 0 ${18 + gateGlow * 26}px ${GOLD}` : `0 0 8px rgba(231,178,76,0.3)`, zIndex: 12 }}>
          {(() => { const open = gateGlow > 0.05; const c = open ? "#3A2A08" : "#E7B24C"; return (
            <svg width={13} height={14} viewBox="0 0 13 14" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-54%)" }}>
              <path d="M3.4 6.5 V4 a3.1 3.1 0 0 1 6.2 0 V6.5" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" transform={open ? "rotate(-20 5 5)" : undefined} />
              <rect x={2.3} y={6.4} width={8.4} height={6.8} rx={1.7} fill={c} />
              <circle cx={6.5} cy={9.6} r={1} fill={open ? "#E7B24C" : "#1B2740"} />
            </svg>
          ); })()}
        </div>
      );
    })}
  </>);
};

// job card (the thing that moves through the pyramid)
const JobCard: React.FC<{ label?: string; hot?: number; w?: number }> = ({ label = "job", hot = 0, w = 92 }) => (
  <div style={{ width: w, borderRadius: 10, background: hot > 0.5 ? "rgba(196,74,58,0.2)" : PAPER, border: `2.5px solid ${hot > 0.5 ? "#E58072" : "#C9BCA4"}`, padding: "7px 0 5px", textAlign: "center", boxShadow: hot > 0.5 ? `0 0 18px ${RED}88` : "0 10px 22px -8px rgba(10,16,34,0.5)" }}>
    <div style={{ height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{hot > 0.5
      ? <svg width={16} height={20} viewBox="0 0 16 20"><path d="M8 1 C 11 6, 15 8, 12 14 a4 4 0 0 1 -8 0 C 3 10, 6 9, 6 5 C 8 7, 9 4, 8 1 Z" fill="#E58072" /></svg>
      : <svg width={15} height={19} viewBox="0 0 15 19"><rect x={2} y={1} width={11} height={17} rx={2} fill="none" stroke="#8A8064" strokeWidth={1.5} /><rect x={4.5} y={5} width={6} height={1.5} fill="#8A8064" /><rect x={4.5} y={9} width={6} height={1.5} fill="#8A8064" /><rect x={4.5} y={13} width={4} height={1.5} fill="#8A8064" /></svg>}</div>
    <div style={{ fontFamily: mono, fontSize: 13, color: hot > 0.5 ? "#FFB4A6" : "#5A5346", marginTop: 2 }}>{label}</div>
  </div>
);

// ---------------- pixel buildings + swinging gate helpers ----------------
const House: React.FC<{ w: number; h: number; kind: "apartment" | "house" | "mansion" }> = ({ w, h, kind }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    {/* roof */}
    {kind !== "apartment" && <div style={{ position: "absolute", left: -14, top: -h * 0.2, width: 0, height: 0, borderLeft: `${w / 2 + 14}px solid transparent`, borderRight: `${w / 2 + 14}px solid transparent`, borderBottom: `${h * 0.24}px solid ${kind === "mansion" ? "#8A5A9E" : "#B0603E"}` }} />}
    {kind === "apartment" && <div style={{ position: "absolute", left: -6, top: -14, width: w + 12, height: 16, background: "#5A6B85", borderRadius: 3 }} />}
    {/* body */}
    <div style={{ position: "absolute", inset: 0, background: kind === "mansion" ? "linear-gradient(180deg, #F0E6D2, #DFD0B4)" : kind === "house" ? "linear-gradient(180deg, #E8D5C0, #D6BEA4)" : "linear-gradient(180deg, #97A6BE, #7E8DA6)", border: "3px solid rgba(40,50,70,0.5)", borderRadius: 4 }} />
    {/* windows */}
    {Array.from({ length: kind === "mansion" ? 6 : kind === "house" ? 3 : 4 }, (_, i) => {
      const cols = kind === "mansion" ? 3 : 2;
      const cw = (w - 40) / cols;
      const x = 16 + (i % cols) * cw + cw / 2 - 13;
      const y = 18 + Math.floor(i / cols) * (kind === "apartment" ? h / 3.2 : h / 2.6);
      if (y > h - 46) return null;
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: 26, height: 30, background: "#F6E4A0", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: 3 }} />;
    })}
    {/* door */}
    <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: kind === "mansion" ? 44 : 32, height: kind === "mansion" ? 62 : 46, background: "#6E4A2E", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: "6px 6px 0 0" }} />
    {/* mansion columns + gold trim */}
    {kind === "mansion" && <>
      <div style={{ position: "absolute", left: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", right: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", left: 0, top: h * 0.3, width: "100%", height: 6, background: "#E7B24C" }} />
    </>}
  </div>
);

const SwingGate: React.FC<{ open: number; glow: number; w?: number }> = ({ open, glow, w = 90 }) => (
  <div style={{ position: "relative", width: w, height: 110 }}>
    <div style={{ position: "absolute", left: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", right: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", left: 10, bottom: 4, width: w - 20, height: 86, transformOrigin: "0% 50%", transform: `rotateY(${open * 74}deg)`, background: glow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#8A6844", border: `3px solid ${glow > 0.05 ? "#F6E4A0" : "#5E4630"}`, borderRadius: 6, boxShadow: glow > 0.05 ? `0 0 ${16 + glow * 20}px ${GOLD}` : "none" }}>
      {Array.from({ length: 4 }, (_, i) => <div key={i} style={{ position: "absolute", left: 8 + i * ((w - 40) / 4), top: 8, width: 6, height: 62, background: "rgba(40,30,15,0.35)", borderRadius: 3 }} />)}
    </div>
  </div>
);

// floating chat bubble over a listener
const Chat: React.FC<{ x: number; y: number; lf: number; delay: number; txt?: string }> = ({ x, y, lf, delay, txt = "..." }) => {
  const ap = over(lf, delay, 8, Easing.out(Easing.back(1.8)));
  if (ap <= 0.01) return null;
  const bob = Math.sin(lf / 7 + delay) * 5;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, transform: `scale(${ap})`, opacity: ap, zIndex: 18 }}>
      <div style={{ padding: "5px 11px", borderRadius: 12, borderBottomLeftRadius: 3, background: "#EAF3ED", border: "2px solid #BFD8C7", fontSize: 20 }}>{txt}</div>
    </div>
  );
};

// ================= DROP scenes (blueprint idiom: pixel mascot + panel + fraunces) =================
const D = [3.19, 5.82, 6.05, 6.42, 7.08, 7.13, 1.44];

// scene-title slug (fraunces)
const Slug: React.FC<{ text: string; bg?: string; fg?: string; bd?: string; size?: number }> = ({ text, bg = "#12183A", fg = "#F4EEE2", bd = CLAY, size = 38 }) => (
  <div style={{ display: "inline-block", padding: `${size * 0.22}px ${size * 0.5}px`, borderRadius: 14, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: "0 14px 34px -14px rgba(10,16,34,0.7)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);
const DraftCard: React.FC<{ w?: number; label?: string; tone?: string; todo?: boolean }> = ({ w = 130, label = "WRONG", tone = RED, todo }) => (
  <div style={{ width: w, borderRadius: 9, background: PAPER, border: `2.5px solid ${tone}`, padding: "8px 11px 11px", boxShadow: "0 8px 18px -8px rgba(10,16,34,0.5)" }}>
    <div style={{ display: "inline-block", padding: "1px 9px", borderRadius: 5, background: tone, color: "#fff", fontFamily: mono, fontWeight: 900, fontSize: 13 }}>{label}</div>
    {[0.74, 0.5, 0.64].map((ww, i) => <div key={i} style={{ height: 5, marginTop: 7, width: `${ww * 100}%`, borderRadius: 2, background: todo ? "rgba(207,149,68,0.55)" : "#C9BCA4" }} />)}
  </div>
);
const Boulder: React.FC<{ s?: number; rot: number }> = ({ s = 250, rot }) => (
  <div style={{ position: "relative", width: s, height: s, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #6A5233, #3E2E18)", border: "6px solid #2E2212", boxShadow: "0 20px 44px -14px rgba(0,0,0,0.6)" }} />
    {[["WRONG", 0, RED], ["REDO", 72, AMBER], ["TYPO", 144, SLATE], ["v1", 216, "#8A5A2C"], ["DRAFT", 288, RED]].map(([t, a, c], i) => { const rad = (a as number) * Math.PI / 180; const r = s * 0.27; return (
      <div key={i} style={{ position: "absolute", left: s / 2 + Math.cos(rad) * r - 34, top: s / 2 + Math.sin(rad) * r - 15, transform: `rotate(${a}deg)`, padding: "3px 9px", borderRadius: 5, background: PAPER, border: "2px solid #C7B99E", fontFamily: mono, fontWeight: 900, fontSize: 15, color: c as string }}>{t as string}</div>); })}
  </div>
);
// costume overlays (sit on the pixel mascot; origin = mascot wrapper top-left, size s)
const Fedora: React.FC<{ s: number }> = ({ s }) => (<>
  <div style={{ position: "absolute", left: s * 0.13, top: s * 0.17, width: s * 0.74, height: s * 0.055, background: "#5C3418", borderRadius: 8, zIndex: 9 }} />
  <div style={{ position: "absolute", left: s * 0.29, top: s * 0.04, width: s * 0.42, height: s * 0.15, background: "#7A4B24", borderRadius: "10px 10px 3px 3px", zIndex: 9 }} />
</>);
const HardHat: React.FC<{ s: number }> = ({ s }) => (<>
  <div style={{ position: "absolute", left: s * 0.23, top: s * 0.03, width: s * 0.54, height: s * 0.18, borderRadius: `${s * 0.1}px ${s * 0.1}px 3px 3px`, background: "#F2C14E", border: "3px solid #C79A2E", zIndex: 9 }} />
  <div style={{ position: "absolute", left: s * 0.44, top: s * 0.0, width: s * 0.12, height: s * 0.06, background: "#F2C14E", borderRadius: 3, zIndex: 9 }} />
</>);
const ChefHat: React.FC<{ s: number }> = ({ s }) => (<>
  <div style={{ position: "absolute", left: s * 0.27, top: s * 0.04, width: s * 0.46, height: s * 0.14, background: "#fff", borderRadius: 4, zIndex: 9 }} />
  <div style={{ position: "absolute", left: s * 0.22, top: -s * 0.05, width: s * 0.56, height: s * 0.15, background: "#fff", borderRadius: "50%", zIndex: 9 }} />
</>);
const Shades: React.FC<{ s: number }> = ({ s }) => (
  <div style={{ position: "absolute", left: s * 0.27, top: s * 0.33, width: s * 0.46, height: s * 0.1, background: "#141414", borderRadius: 4, zIndex: 9, boxShadow: "0 0 8px rgba(0,0,0,0.4)" }} />
);
const GROUND = <div style={{ position: "absolute", left: 0, right: 0, top: 664, height: 128, background: "linear-gradient(180deg, #16202F, #101827)" }} />;

// ============ OVERHAUL KIT: real iOS phone + pop-culture screenshots + panel wash ============
const PhoneUI: React.FC<{ children?: React.ReactNode; lf?: number; w?: number; accent?: string }> = ({ children, lf = 0, w = 300, accent = CLAY }) => {
  const H = w * 2.16; const R = w * 0.155; const bez = Math.max(7, w * 0.033); const sR = R - bez;
  const sb = w * 0.16; const islW = w * 0.30, islH = w * 0.088;
  const gx = ((lf * 3.2) % (H * 1.9)) - H * 0.45;
  const btn = (top: number, h: number, side: "l" | "r") => (<div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -Math.max(2, w * 0.009), top, width: Math.max(2, w * 0.009), height: h, borderRadius: 3, background: side === "l" ? grad("#2A2C34", "#0B0C10") : grad("#0B0C10", "#2A2C34") }} />);
  return (
    <div style={{ position: "relative", width: w, height: H, borderRadius: R, background: grad("#26282F", "#08090C"), padding: bez, boxSizing: "border-box", boxShadow: "0 44px 90px -34px rgba(8,10,20,0.72), 0 14px 34px rgba(8,10,20,0.4), inset 0 1.6px 1px rgba(255,255,255,0.20), inset 0 -2px 4px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
      {btn(H * 0.20, H * 0.045, "l")}{btn(H * 0.30, H * 0.075, "l")}{btn(H * 0.44, H * 0.075, "l")}{btn(H * 0.26, H * 0.10, "r")}
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: sR, overflow: "hidden", background: grad("#0E1626", "#0A1120"), boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.5), inset 0 2px 6px rgba(0,0,0,0.28)" }}>
        {children}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: sb, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${w * 0.085}px`, zIndex: 5, paddingTop: w * 0.018 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: w * 0.058, color: "#EAF0FA" }}>9:41</div>
          <svg width={w * 0.30} viewBox="0 0 82 26" fill="none" style={{ overflow: "visible" }}>
            {[8, 12, 16, 20].map((h, i) => <rect key={i} x={i * 6} y={24 - h} width={4.4} height={h} rx={1.4} fill="#EAF0FA" opacity={i === 3 ? 0.4 : 1} />)}
            <rect x={60} y={14} width={18} height={10} rx={3} fill="none" stroke="#EAF0FA" strokeWidth={1.6} opacity={0.7} /><rect x={61.4} y={15.4} width={12} height={7.2} rx={1.6} fill="#EAF0FA" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: "50%", top: w * 0.032, transform: "translateX(-50%)", width: islW, height: islH, borderRadius: 999, background: "#050609", zIndex: 6 }} />
        <div style={{ position: "absolute", left: -H * 0.5, top: gx, width: H * 2, height: H * 0.5, background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 100%)", transform: "rotate(-24deg)", pointerEvents: "none", zIndex: 7, opacity: 0.6 }} />
        <div style={{ position: "absolute", left: "50%", bottom: w * 0.028, transform: "translateX(-50%)", width: w * 0.34, height: Math.max(4, w * 0.015), borderRadius: 999, background: "rgba(180,200,230,0.4)", zIndex: 6 }} />
      </div>
    </div>
  );
};

// compact pop-culture / artifact photo tile (reads at 40-70px). k = subject; the pile's comment-bait.
const PCShot: React.FC<{ k: string; sz?: number; rot?: number }> = ({ k, sz = 54, rot = 0 }) => {
  const S = sz; const px = (v: number) => v * S / 54;
  const inner = (() => {
    switch (k) {
      case "moai": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#8BA0BC,#5C6675)" }}>
        <div style={{ position: "absolute", left: px(14), top: px(8), width: px(26), height: px(42), borderRadius: `${px(9)}px ${px(9)}px ${px(4)}px ${px(4)}px`, background: "linear-gradient(180deg,#9AA6B4,#6C7787)", boxShadow: "inset -3px 0 4px rgba(0,0,0,0.25)" }}>
          <div style={{ position: "absolute", left: px(4), top: px(12), width: px(6), height: px(8), background: "#2A303A", borderRadius: 2 }} /><div style={{ position: "absolute", left: px(15), top: px(12), width: px(6), height: px(8), background: "#2A303A", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: px(10), top: px(22), width: px(6), height: px(15), background: "#4A5563", borderRadius: 2 }} /></div></div>;
      case "doge": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F0E6CF,#E4D2A8)" }}>
        <div style={{ position: "absolute", left: px(12), top: px(12), width: px(30), height: px(30), borderRadius: "50%", background: "linear-gradient(180deg,#E8A94B,#CE8A2E)" }}>
          <div style={{ position: "absolute", left: -px(2), top: -px(4), width: px(12), height: px(12), background: "#CE8A2E", borderRadius: "50% 50% 0 50%", transform: "rotate(-20deg)" }} /><div style={{ position: "absolute", right: -px(2), top: -px(4), width: px(12), height: px(12), background: "#CE8A2E", borderRadius: "50% 50% 50% 0", transform: "rotate(20deg)" }} />
          <div style={{ position: "absolute", left: px(7), top: px(11), width: px(4), height: px(4), background: "#2A2018", borderRadius: "50%" }} /><div style={{ position: "absolute", left: px(18), top: px(11), width: px(4), height: px(4), background: "#2A2018", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: px(10), top: px(18), width: px(10), height: px(8), background: "#F2E4C4", borderRadius: "50%" }} /></div>
        <div style={{ position: "absolute", right: px(2), top: px(3), fontFamily: mono, fontSize: px(9), color: "#3F9E74", fontWeight: 900 }}>wow</div></div>;
      case "shrek": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#5C7A3A,#3E5626)" }}>
        <div style={{ position: "absolute", left: px(11), top: px(11), width: px(32), height: px(34), borderRadius: `${px(10)}px ${px(10)}px ${px(12)}px ${px(12)}px`, background: "linear-gradient(180deg,#8FB35A,#6E8F3E)" }}>
          <div style={{ position: "absolute", left: -px(7), top: px(4), width: px(9), height: px(6), background: "#6E8F3E", borderRadius: "50%" }} /><div style={{ position: "absolute", right: -px(7), top: px(4), width: px(9), height: px(6), background: "#6E8F3E", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: px(6), top: px(10), width: px(5), height: px(5), background: "#2A2018", borderRadius: "50%" }} /><div style={{ position: "absolute", right: px(6), top: px(10), width: px(5), height: px(5), background: "#2A2018", borderRadius: "50%" }} /></div></div>;
      case "grogu": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#C9B79A,#A89170)" }}>
        <div style={{ position: "absolute", left: px(15), top: px(12), width: px(24), height: px(24), borderRadius: "50%", background: "linear-gradient(180deg,#A9C08A,#88A268)" }}>
          <div style={{ position: "absolute", left: -px(13), top: px(6), width: px(16), height: px(9), background: "#88A268", borderRadius: "50%", transform: "rotate(-8deg)" }} /><div style={{ position: "absolute", right: -px(13), top: px(6), width: px(16), height: px(9), background: "#88A268", borderRadius: "50%", transform: "rotate(8deg)" }} />
          <div style={{ position: "absolute", left: px(4), top: px(9), width: px(6), height: px(7), background: "#1A1410", borderRadius: "50%" }} /><div style={{ position: "absolute", right: px(4), top: px(9), width: px(6), height: px(7), background: "#1A1410", borderRadius: "50%" }} /></div>
        <div style={{ position: "absolute", left: px(16), bottom: 0, width: px(22), height: px(10), background: "#9A6B3A", borderRadius: `${px(6)}px ${px(6)}px 0 0` }} /></div>;
      case "messi": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3F9E74,#2E7A57)" }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: px(10 + i * 8), top: px(8), width: px(4), height: px(34), background: i % 2 ? "#6CACE4" : "#F4F7FB" }} />)}
        <div style={{ position: "absolute", left: 0, right: 0, top: px(18), textAlign: "center", fontFamily: mono, fontWeight: 900, fontSize: px(16), color: "#1A2A44" }}>10</div></div>;
      case "receipt": return <div style={{ position: "absolute", inset: 0, background: "#F7F3EA" }}>
        <div style={{ position: "absolute", left: px(9), top: px(6), right: px(9), height: px(4), background: "#C9BCA4" }} />{[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: px(9), top: px(15 + i * 7), width: px(28), height: px(3), background: "#C9BCA4" }} />)}
        <div style={{ position: "absolute", right: px(8), bottom: px(6), fontFamily: mono, fontWeight: 900, fontSize: px(11), color: "#C44A3A" }}>$48</div></div>;
      case "boarding": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#6CACE4,#4A88C0)" }}>
        <div style={{ position: "absolute", left: px(6), top: px(8), width: px(20), height: px(14), background: "#F4F7FB", borderRadius: 3 }} /><div style={{ position: "absolute", right: px(6), top: px(11), width: px(13), height: px(11), background: "#F4F7FB", clipPath: "polygon(0% 50%, 100% 15%, 78% 50%, 100% 85%)" }} />
        <div style={{ position: "absolute", left: px(6), bottom: px(6), fontFamily: mono, fontSize: px(8), color: "#F4F7FB", fontWeight: 700 }}>GATE 22</div></div>;
      case "parking": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3A5C84,#2A4464)" }}>
        <div style={{ position: "absolute", left: "50%", top: px(8), transform: "translateX(-50%)", width: px(24), height: px(24), background: "#2E63C4", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: px(16), color: "#fff" }}>P</div>
        <div style={{ position: "absolute", left: px(10), bottom: px(6), width: px(34), height: px(9), background: "#C44A3A", borderRadius: 3 }} /></div>;
      case "map": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#DDE6D8,#C4D2BC)" }}>
        <div style={{ position: "absolute", left: px(6), top: px(22), width: px(42), height: px(4), background: "#B0A98E", transform: "rotate(-12deg)" }} /><div style={{ position: "absolute", left: "50%", top: px(10), transform: "translateX(-50%)", width: px(12), height: px(15), background: "#C44A3A", borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", boxShadow: "inset 0 0 0 "+px(3)+"px #F7D9D2" }} /></div>;
      case "chat": return <div style={{ position: "absolute", inset: 0, background: "#E9F2EC" }}>
        {[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: i ? px(16) : px(6), top: px(8 + i * 12), width: px(30), height: px(9), background: i ? "#77AE92" : "#CFE0D4", borderRadius: 6 }} />)}
        <div style={{ position: "absolute", left: px(6), bottom: px(6), width: px(22), height: px(9), background: "#CFE0D4", borderRadius: 6 }} /></div>;
      case "cat": return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F4E3CE,#E4CDA8)" }}>
        <div style={{ position: "absolute", left: px(13), top: px(14), width: px(28), height: px(26), borderRadius: "50%", background: "#D2724E" }}>
          <div style={{ position: "absolute", left: px(1), top: -px(6), width: 0, height: 0, borderLeft: `${px(6)}px solid transparent`, borderRight: `${px(6)}px solid transparent`, borderBottom: `${px(10)}px solid #D2724E` }} /><div style={{ position: "absolute", right: px(1), top: -px(6), width: 0, height: 0, borderLeft: `${px(6)}px solid transparent`, borderRight: `${px(6)}px solid transparent`, borderBottom: `${px(10)}px solid #D2724E` }} />
          <div style={{ position: "absolute", left: px(6), top: px(10), width: px(4), height: px(6), background: "#2A2018", borderRadius: "50%" }} /><div style={{ position: "absolute", right: px(6), top: px(10), width: px(4), height: px(6), background: "#2A2018", borderRadius: "50%" }} /></div></div>;
      default: return <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#CF9544,#B0742E)" }}><div style={{ position: "absolute", left: px(8), bottom: px(6), width: px(38), height: px(14), background: "#8FB35A", borderRadius: "50% 50% 0 0" }} /><div style={{ position: "absolute", right: px(8), top: px(6), width: px(12), height: px(12), borderRadius: "50%", background: "#F6E4A0" }} /></div>;
    }
  })();
  return (
    <div style={{ width: S, height: S * 1.16, borderRadius: px(7), overflow: "hidden", background: "#fff", border: "2px solid rgba(255,255,255,0.85)", boxShadow: "0 6px 14px -5px rgba(6,10,22,0.6)", transform: `rotate(${rot}deg)`, position: "relative" }}>
      {inner}
    </div>
  );
};

// warm cel-shaded panel-interior wash (vibrant animation palette, not flat/cold navy)
const PanelWash: React.FC<{ accent?: string; ax?: number; ay?: number }> = ({ accent = SLATE, ax = 50, ay = 28 }) => (<>
  {/* cool top lift -> warm bottom (cel-shaded animation grade) */}
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(172deg, rgba(86,116,168,0.30) 0%, rgba(52,52,92,0.12) 40%, rgba(18,20,40,0) 64%)", zIndex: 0 }} />
  {/* vibrant per-scene accent bloom */}
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(66% 50% at ${ax}% ${ay}%, ${accent}4D, transparent 72%)`, zIndex: 0 }} />
  {/* warm amber floor glow so the palette reads warm/animated, never cold-tech */}
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(95% 44% at 50% 112%, rgba(214,140,74,0.20), rgba(207,149,68,0.06) 45%, transparent 72%)", zIndex: 0 }} />
  {/* subtle warm top-corner key light */}
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(38% 30% at 16% 6%, rgba(247,224,170,0.14), transparent 66%)", zIndex: 0 }} />
  <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 150px rgba(6,8,20,0.4)", zIndex: 1, pointerEvents: "none" }} />
</>);

// ---- E0 HOOK: ask AI -> it dumps the first try, stamps DONE, struts off; boulder of mistakes looms ----

// ---- R0 (overhaul, retimed 111f + supercharged brain) ----
// ==================== SUPER MARIO BROS KIT ====================
const SKY = "#5C94FC", MBRICK = "#C4682C", QB = "#F2B21C", QBDK = "#C98A12", PIPEG = "#41AD41", PIPEDK = "#2E7A2E", MCOIN = "#F7CE3A", MCOINDK = "#D9A81E", GRD = "#C4682C";
const HILLG = "#5FB63C", HILLDK = "#3C8A2C", BUSHG = "#63C24A", MTN = "#6FA3C9", MTNDK = "#4E7EA3";

// lush multi-layer PARALLAX Super Mario overworld — full-bleed panel background, stays BEHIND content
// ==================== POKEMON KIT ====================
const PK = { skyTop: "#8FD0F0", skyBot: "#CFEFFA", grass: "#7AC84A", grassDk: "#57A835", path: "#E8CE92", pathDk: "#CBAF6E", dex: "#D64B3E", dexDk: "#A8382E", steel: "#2B3550", steelDk: "#1B2338" };
export const TYPE_COL: Record<string, string> = { PSYCHIC: "#F35B8E", STEEL: "#7B8AA0", GHOST: "#6A4C8C", NORMAL: "#9AA06E", ELECTRIC: "#F2C12C", FIRE: "#F0803C", WATER: "#4C90F0", GRASS: "#5AC85A", DRAGON: "#7C63E8", DARK: "#5A5366" };
// Pokemon overworld ROUTE field (solid fills; usable as a scene panel bg)
export const PkField: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const drift = (spd: number, amp: number, ph = 0) => Math.sin(f / spd + ph) * amp;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#8FD0F0 0%,#A9E0F5 44%,#CFEFFA 74%,#DFF4E4 100%)" }} />
      {/* soft sun bloom */}
      <div style={{ position: "absolute", right: -60, top: -70, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,220,0.6), rgba(255,250,220,0) 68%)" }} />
      {/* far mountain range (depth behind the trees) */}
      <div style={{ position: "absolute", left: -80, bottom: 188, width: 520, height: 156, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg,#9EC6D8,#7FA8BE)", opacity: 0.5 }} />
      <div style={{ position: "absolute", right: -120, bottom: 188, width: 560, height: 132, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg,#A9CEDE,#86ADC2)", opacity: 0.45 }} />
      {/* distant Pokemon-region skyline: Gym tower + Poke Center dome */}
      <div style={{ position: "absolute", left: 158, bottom: 300, width: 66, opacity: 0.9 }}>
        <div style={{ position: "absolute", left: 6, bottom: 0, width: 54, height: 66, background: "linear-gradient(180deg,#44567E,#2E3C60)", borderRadius: "4px 4px 0 0" }} />
        <div style={{ position: "absolute", left: 20, bottom: 58, width: 24, height: 24, transform: "rotate(45deg)", background: "#F2C230", borderRadius: 5 }} />
      </div>
      <div style={{ position: "absolute", right: 176, bottom: 300, width: 80 }}>
        <div style={{ position: "absolute", left: 8, bottom: 0, width: 64, height: 50, background: "linear-gradient(180deg,#FBFCFF,#DCE6EF)", borderRadius: "6px 6px 0 0" }} />
        <div style={{ position: "absolute", left: 0, bottom: 38, width: 80, height: 28, borderRadius: "40px 40px 6px 6px", background: "linear-gradient(180deg,#F0554A,#C7362D)" }} />
      </div>
      {/* distant rounded tree line */}
      {[[-40, 210, "#4FA83C"], [180, 250, "#57B040"], [430, 220, "#4FA83C"], [700, 260, "#57B040"], [960, 220, "#4FA83C"]].map(([x, w, c], i) => (
        <div key={i} style={{ position: "absolute", left: (x as number) + drift(70, 4, i), bottom: 150, width: w as number, height: (w as number) * 0.7, borderRadius: "50% 50% 44% 44% / 60% 60% 40% 40%", background: `linear-gradient(180deg,${c as string},#3C8A2C)`, boxShadow: "inset 0 -14px 0 rgba(0,0,0,0.08)" }} />
      ))}
      {/* rolling grass field band */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 176, background: `linear-gradient(180deg,${PK.grass},${PK.grassDk})`, boxShadow: "inset 0 8px 0 rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 168, height: 22, background: `linear-gradient(180deg,#8FD858,${PK.grass})`, borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
      {/* light dirt path down the middle */}
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 220, height: 176, transform: "translateX(-50%)", background: `linear-gradient(180deg,${PK.path},${PK.pathDk})`, clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", boxShadow: "inset 0 6px 0 rgba(255,255,255,0.2)" }} />
      {/* tall-grass tufts hugging the ground */}
      {[90, 300, 520, 760, 970].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x + drift(52, 3, i), bottom: 150, display: "flex", gap: 2 }}>
          {[0, 1, 2, 3].map((k) => <div key={k} style={{ width: 8, height: 24 + (k % 2) * 8, borderRadius: "3px 3px 0 0", background: k % 2 ? PK.grassDk : "#5FB53E", transformOrigin: "50% 100%", transform: `rotate(${(k - 1.5) * 8 + drift(20, 4, i + k)}deg)` }} />)}
        </div>
      ))}
      {/* drifting clouds */}
      {[[80, 60, 0.7], [520, 40, 0.5], [860, 90, 0.8]].map(([x, y, s], i) => (
        <div key={i} style={{ position: "absolute", left: ((x as number) + f * (0.25 + i * 0.08)) % 1320 - 160, top: y as number, opacity: 0.92 }}>
          <div style={{ width: 130 * (s as number), height: 40 * (s as number), borderRadius: 24, background: "#FFFFFF", boxShadow: "0 16px 0 -6px #FFFFFF, inset 0 -6px 0 rgba(190,214,235,0.5)" }} />
        </div>
      ))}
      {/* wooden ROUTE signpost by the path */}
      <div style={{ position: "absolute", left: 690, bottom: 150, width: 104 }}>
        <div style={{ position: "absolute", left: 47, bottom: 0, width: 10, height: 72, background: "linear-gradient(180deg,#A9773E,#7E5628)" }} />
        <div style={{ position: "absolute", left: 4, bottom: 54, width: 100, height: 30, borderRadius: 5, background: "linear-gradient(180deg,#C79A54,#9C7436)", border: "3px solid #6E4E24", display: "grid", placeItems: "center", fontFamily: mono, fontWeight: 900, fontSize: 15, color: "#3A2A10", letterSpacing: 1 }}>ROUTE 6</div>
      </div>
      {/* fluttering Butterfree-ish bug (foreground life) */}
      <div style={{ position: "absolute", left: 330 + drift(30, 70, 1), top: 300 + drift(18, 44), transform: `rotate(${drift(12, 10)}deg)` }}>
        <svg width={46} height={38} viewBox="0 0 46 38"><ellipse cx={14} cy={13} rx={12} ry={11} fill="#9BB8F2" /><ellipse cx={32} cy={13} rx={12} ry={11} fill="#9BB8F2" /><ellipse cx={15} cy={27} rx={9} ry={8} fill="#C0D4F8" /><ellipse cx={31} cy={27} rx={9} ry={8} fill="#C0D4F8" /><rect x={21} y={9} width={4} height={24} rx={2} fill="#3A4A63" /><circle cx={23} cy={8} r={4} fill="#3A4A63" /></svg>
      </div>
      {children}
    </>
  );
};
// classic Pokeball (top red / bottom white / black band / center button); can open + wobble
// ===== beautiful POKEMON SUNSET background =====
const PkSunset: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#372A6E 0%,#6E3684 24%,#B24E72 44%,#E4735C 62%,#F4A65A 76%,#FBD98C 100%)" }} />
      {/* starfield in the upper night sky */}
      {Array.from({ length: 32 }).map((_, i) => { const sx = seed(i * 5 + 1) * 1012; const sy = seed(i * 5 + 2) * 290; const tw = 0.3 + 0.7 * Math.abs(Math.sin(f / 14 + i)); const ss = 1.6 + seed(i * 5 + 3) * 2.3; return <div key={"st" + i} style={{ position: "absolute", left: sx, top: sy, width: ss, height: ss, borderRadius: "50%", background: "#FFF6E0", opacity: tw * 0.85, boxShadow: "0 0 6px rgba(255,240,200,0.8)" }} />; })}
      {/* far mountain silhouette (depth) */}
      <div style={{ position: "absolute", left: 280, bottom: 250, width: 460, height: 130, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#5A2E5E", opacity: 0.5 }} />
      {/* sun glow + disc, low on the horizon */}
      <div style={{ position: "absolute", left: "50%", bottom: 120, width: 460, height: 460, marginLeft: -230, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,200,0.85) 0%, rgba(255,205,120,0.5) 34%, rgba(255,160,80,0) 66%)" }} />
      <div style={{ position: "absolute", left: "50%", bottom: 150, width: 156, height: 156, marginLeft: -78, borderRadius: "50%", background: "radial-gradient(circle at 44% 40%, #FFF7DE, #FFDD88 70%, #FFC96A)", boxShadow: "0 0 90px 34px rgba(255,214,124,0.55)" }} />
      {/* horizon warm band */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 96, height: 130, background: "linear-gradient(180deg, rgba(255,205,120,0), rgba(255,180,96,0.55))" }} />
      {/* Pidgey-style bird silhouettes drifting */}
      {[[160, 150, 1], [320, 110, 0.8], [720, 170, 0.9], [860, 96, 0.7]].map(([x, y, s], i) => (
        <div key={i} style={{ position: "absolute", left: ((x as number) + f * (0.4 + i * 0.1) * (i % 2 ? 1 : -1) + 1200) % 1240 - 80, top: y as number, opacity: 0.55 }}>
          <svg width={42 * (s as number)} height={16 * (s as number)} viewBox="0 0 42 16"><path d="M2 13 Q11 3 21 11 Q31 3 40 13" fill="none" stroke="#26183A" strokeWidth={3} strokeLinecap="round" /></svg>
        </div>
      ))}
      {/* layered hill silhouettes */}
      <div style={{ position: "absolute", left: -60, right: -60, bottom: 92, height: 168, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#6A2E62", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: -110, bottom: 92, width: 560, height: 210, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#46284E" }} />
      <div style={{ position: "absolute", right: -110, bottom: 92, width: 520, height: 186, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#46284E" }} />
      {/* dark foreground ground */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 104, background: "linear-gradient(180deg,#2A1730,#150B1B)" }} />
      {/* silhouetted trees */}
      <div style={{ position: "absolute", left: 66, bottom: 84, width: 72 }}><div style={{ position: "absolute", left: 31, bottom: 0, width: 11, height: 64, background: "#150B1B" }} /><div style={{ position: "absolute", left: 0, bottom: 46, width: 72, height: 72, borderRadius: "50%", background: "#150B1B" }} /></div>
      <div style={{ position: "absolute", right: 88, bottom: 84, width: 56 }}><div style={{ position: "absolute", left: 23, bottom: 0, width: 9, height: 50, background: "#150B1B" }} /><div style={{ position: "absolute", left: 0, bottom: 36, width: 56, height: 56, borderRadius: "50%", background: "#150B1B" }} /></div>
      {children}
    </>
  );
};
// ===== more recognizable POKEMON sprites =====
// ===== CHARMANDER — upright orange lizard, cream belly, curved flame tail =====
const FireLizard: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 110, lf = 0 }) => {
  const flk = Math.sin(lf / 3.5), flk2 = Math.sin(lf / 2.3 + 1);
  const bob = Math.sin(lf / 12) * 1.6;
  const O = "#F79646", OL = "#FBB06A", OS = "#D9701E", CR = "#F6E7BE", CRS = "#E4CE96", DK = "#2E2116";
  return (
    <svg width={sz} height={sz * 1.16} viewBox="0 0 100 116" style={{ position: "absolute", left: x, top: y + bob, overflow: "visible", filter: "drop-shadow(0 9px 9px rgba(0,0,0,0.24))" }}>
      {/* ===== tail: thick, curls up-right, cream underside, flame tip ===== */}
      <path d="M68 92 C 86 92, 96 78, 92 60 C 90 50, 84 44, 82 40 C 88 46, 96 56, 94 72 C 92 88, 80 98, 66 96 Z" fill={O} stroke={OS} strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M72 90 C 85 88, 92 76, 89 62 C 90 74, 84 84, 72 86 Z" fill={CR} opacity={0.85} />
      {/* flame at the tail tip (bigger, flickers, glows) */}
      <g transform={`translate(88 34)`}>
        <ellipse cx={0} cy={-4} rx={13} ry={16} fill="#FF9A3C" opacity={0.28} />
        <path d={`M0 ${9 + flk} C ${-12 - flk2} ${-5}, ${3} ${-15 - flk * 2}, 0 ${-30 - flk * 2} C ${14 + flk2} ${-15}, ${18} ${3}, ${7} ${14}`} fill="#F7B21E" />
        <path d={`M1 ${6} C ${-6} ${-3}, 3 ${-6}, 1 ${-19 - flk} C ${9} ${-6}, 10 ${3}, 4 ${10}`} fill="#F2792A" />
        <path d={`M1 3 C -2 -1, 3 -3, 1 -11 C 4 -3, 4 1, 3 6`} fill="#FBE58A" />
      </g>
      {/* ===== hind legs / feet ===== */}
      <ellipse cx={35} cy={104} rx={13} ry={8} fill={O} stroke={OS} strokeWidth={1.8} />
      <ellipse cx={62} cy={104} rx={13} ry={8} fill={O} stroke={OS} strokeWidth={1.8} />
      <path d="M28 106 L26 101 M35 107 L35 101 M42 106 L44 101" stroke={OS} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M55 106 L53 101 M62 107 L62 101 M69 106 L71 101" stroke={OS} strokeWidth={1.5} strokeLinecap="round" />
      {/* ===== body (upright egg) + cream belly ===== */}
      <ellipse cx={48} cy={72} rx={30} ry={33} fill={O} stroke={OS} strokeWidth={2.4} />
      <ellipse cx={48} cy={62} rx={26} ry={10} fill={OL} opacity={0.55} />
      <path d="M32 66 C 34 96, 62 96, 64 66 C 58 82, 38 82, 32 66 Z" fill={CR} stroke={CRS} strokeWidth={1} />
      <path d="M36 74 L60 74 M35 82 L61 82 M38 90 L58 90" stroke={CRS} strokeWidth={1.4} opacity={0.7} />
      {/* little arms (peek out at the sides, tiny claws) */}
      <path d="M20 70 C 11 72, 9 82, 15 84 C 13 79, 15 75, 22 76 Z" fill={O} stroke={OS} strokeWidth={1.7} strokeLinejoin="round" />
      <path d="M76 70 C 85 72, 87 82, 81 84 C 83 79, 81 75, 74 76 Z" fill={O} stroke={OS} strokeWidth={1.7} strokeLinejoin="round" />
      {/* ===== head (rounded snout) ===== */}
      <ellipse cx={48} cy={40} rx={27} ry={24} fill={O} stroke={OS} strokeWidth={2.4} />
      <ellipse cx={48} cy={48} rx={20} ry={13} fill={OL} opacity={0.4} />
      {/* eyes */}
      <ellipse cx={38} cy={36} rx={6} ry={7.4} fill="#fff" stroke={OS} strokeWidth={1} />
      <ellipse cx={58} cy={36} rx={6} ry={7.4} fill="#fff" stroke={OS} strokeWidth={1} />
      <ellipse cx={39} cy={37} rx={3.4} ry={4.6} fill={DK} /><circle cx={40.4} cy={35} r={1.5} fill="#fff" />
      <ellipse cx={59} cy={37} rx={3.4} ry={4.6} fill={DK} /><circle cx={60.4} cy={35} r={1.5} fill="#fff" />
      {/* nostrils + smile */}
      <circle cx={44} cy={48} r={1.2} fill={DK} /><circle cx={52} cy={48} r={1.2} fill={DK} />
      <path d="M40 52 Q48 59 56 52" stroke={DK} strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </svg>
  );
};
// ===== GENGAR (the villain) — spiky indigo silhouette, red eyes, giant Cheshire grin =====
export const GhostMon: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 110, lf = 0 }) => {
  const P = "#4C3B78", PL = "#63508F", PD = "#392A5F", PS = "#241839", DK = "#150B26";
  const EYE = "#EE3A2E", EYEG = "#FF7A55";
  const float = Math.sin(lf / 9) * 3.5;
  const grin = 0.6 + 0.4 * Math.abs(Math.sin(lf / 26));       // menace pulse in the grin/eyes
  // spiky halo: rounded body @ (50,54) r≈38; spikes emanate behind it
  const cx0 = 50, cy0 = 55, R = 36;
  const spike = (deg: number, len: number, hw: number) => {
    const a = (deg - 90) * Math.PI / 180, p = a + Math.PI / 2;
    const bx = cx0 + Math.cos(a) * (R - 4), by = cy0 + Math.sin(a) * (R - 4);
    const tx = cx0 + Math.cos(a) * (R + len), ty = cy0 + Math.sin(a) * (R + len);
    const b1x = bx + Math.cos(p) * hw, b1y = by + Math.sin(p) * hw;
    const b2x = bx - Math.cos(p) * hw, b2y = by - Math.sin(p) * hw;
    return `M${b1x.toFixed(1)} ${b1y.toFixed(1)} L${tx.toFixed(1)} ${ty.toFixed(1)} L${b2x.toFixed(1)} ${b2y.toFixed(1)} Z`;
  };
  // deg,len,halfwidth — crown of ears on top (±16 tall), spikes ringing sides/back
  const spikes: [number, number, number][] = [
    [-150, 12, 7], [-124, 15, 7.5], [-96, 13, 7], [-64, 11, 6.5],
    [-30, 18, 8], [-14, 22, 7], [0, 16, 7.5], [14, 22, 7], [30, 18, 8],
    [64, 11, 6.5], [96, 13, 7], [124, 15, 7.5], [150, 12, 7],
  ];
  return (
    <svg width={sz} height={sz * 1.06} viewBox="0 0 100 108" style={{ position: "absolute", left: x, top: y + float, overflow: "visible", filter: "drop-shadow(0 13px 12px rgba(40,12,70,0.42))" }}>
      {/* sinister aura */}
      <ellipse cx={50} cy={58} rx={55} ry={52} fill="#7A3FD0" opacity={0.14 * grin} />
      <ellipse cx={50} cy={58} rx={46} ry={44} fill="#5B2FA8" opacity={0.16} />
      {/* spike halo (behind body) */}
      {spikes.map((s, i) => <path key={`sp${i}`} d={spike(s[0], s[1], s[2])} fill={P} stroke={PS} strokeWidth={1.6} strokeLinejoin="round" />)}
      {/* stubby legs with 3 claws each */}
      {[34, 66].map((fx, i) => (
        <g key={`lg${i}`}>
          <path d={`M${fx - 13} 90 C ${fx - 15} 104, ${fx + 15} 104, ${fx + 13} 90 Z`} fill={PD} stroke={PS} strokeWidth={2} />
          <path d={`M${fx - 8} 103 L${fx - 8} 96 M${fx} 104 L${fx} 96 M${fx + 8} 103 L${fx + 8} 96`} stroke={PS} strokeWidth={1.8} strokeLinecap="round" />
        </g>
      ))}
      {/* round hunched body */}
      <path d="M13 56 C 13 24, 87 24, 87 56 C 87 82, 71 96, 50 96 C 29 96, 13 82, 13 56 Z" fill={P} stroke={PS} strokeWidth={2.8} />
      {/* body shading: darker lower belly + light top sheen */}
      <path d="M18 66 C 26 92, 74 92, 82 66 C 74 84, 26 84, 18 66 Z" fill={PD} opacity={0.55} />
      <path d="M24 40 C 34 30, 66 30, 76 40 C 66 34, 34 34, 24 40 Z" fill={PL} opacity={0.7} />
      {/* short arms with little claws */}
      <path d="M12 60 C 1 57, -3 71, 9 72 C 5 68, 6 63, 14 64 Z" fill={P} stroke={PS} strokeWidth={1.8} />
      <path d="M88 60 C 99 57, 103 71, 91 72 C 95 68, 94 63, 86 64 Z" fill={P} stroke={PS} strokeWidth={1.8} />
      {/* ===== red menacing eyes (angular, half-lidded) ===== */}
      <path d="M25 48 C 32 42, 44 44, 46 52 C 40 50, 30 49, 25 53 Z" fill={DK} />
      <path d="M75 48 C 68 42, 56 44, 54 52 C 60 50, 70 49, 75 53 Z" fill={DK} />
      <ellipse cx={35} cy={53} rx={8} ry={6.6} fill={EYE} style={{ filter: `drop-shadow(0 0 ${3 + grin * 4}px ${EYEG})` }} />
      <ellipse cx={65} cy={53} rx={8} ry={6.6} fill={EYE} style={{ filter: `drop-shadow(0 0 ${3 + grin * 4}px ${EYEG})` }} />
      <path d="M27 49 C 32 46, 40 47, 43 51" stroke={DK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <path d="M73 49 C 68 46, 60 47, 57 51" stroke={DK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <circle cx={33} cy={51} r={1.7} fill="#FFE7DF" /><circle cx={63} cy={51} r={1.7} fill="#FFE7DF" />
      {/* ===== giant Cheshire grin, corners curling up past the eyes ===== */}
      <path d="M20 60 C 22 84, 42 92, 50 92 C 58 92, 78 84, 80 60 C 70 72, 58 76, 50 76 C 42 76, 30 72, 20 60 Z" fill={DK} stroke={PS} strokeWidth={1.6} />
      {/* jagged white teeth (top + bottom rows) */}
      <path d="M23 62 L28 72 L33 62 L38 73 L44 63 L50 74 L56 63 L62 73 L67 62 L72 72 L77 62 C 70 71, 58 75, 50 75 C 42 75, 30 71, 23 62 Z" fill="#F4EEDE" stroke="#C9BEA6" strokeWidth={0.6} />
      <path d="M34 88 L38 80 L43 87 L47 79 L50 87 L53 79 L57 87 L62 80 L66 88 C 58 91, 42 91, 34 88 Z" fill="#F4EEDE" stroke="#C9BEA6" strokeWidth={0.5} />
      {/* menacing tongue hint */}
      <path d="M42 82 Q50 88 58 82 Q50 85 42 82 Z" fill="#B23A6A" opacity={0.9} />
    </svg>
  );
};
// ===== EEVEE — big fluffy cream ruff, bushy cream-tipped tail, tall ears =====
const FoxMon: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 110, lf = 0 }) => {
  const BR = "#B87C3C", BRL = "#CE9450", BRS = "#8E5C22", CR = "#F4E4B6", CRS = "#DCC48C", DK = "#2E2116";
  const bob = Math.sin(lf / 12) * 1.8, tw = Math.sin(lf / 8) * 5;
  return (
    <svg width={sz} height={sz * 1.04} viewBox="0 0 100 104" style={{ position: "absolute", left: x, top: y + bob, overflow: "visible", filter: "drop-shadow(0 9px 9px rgba(0,0,0,0.24))" }}>
      {/* ===== bushy tail with cream tip (sways) ===== */}
      <g transform={`rotate(${tw} 74 80)`}>
        <path d="M70 88 C 92 92, 100 68, 92 52 C 90 46, 86 42, 84 40 C 94 50, 98 70, 88 84 C 84 90, 76 92, 70 90 Z" fill={BR} stroke={BRS} strokeWidth={2.2} strokeLinejoin="round" />
        <path d="M84 40 C 94 50, 98 68, 90 82 C 96 66, 92 50, 84 42 Z" fill={CR} stroke={CRS} strokeWidth={1} />
      </g>
      {/* ===== ears (tall, cream inner) ===== */}
      <path d="M26 42 L12 4 L44 30 Z" fill={BR} stroke={BRS} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M26 38 L18 14 L38 30 Z" fill={CR} />
      <path d="M74 42 L88 4 L56 30 Z" fill={BR} stroke={BRS} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M74 38 L82 14 L62 30 Z" fill={CR} />
      {/* ===== body ===== */}
      <ellipse cx={50} cy={70} rx={28} ry={28} fill={BR} stroke={BRS} strokeWidth={2.3} />
      {/* feet */}
      <ellipse cx={36} cy={95} rx={10} ry={6.5} fill={BR} stroke={BRS} strokeWidth={1.6} />
      <ellipse cx={64} cy={95} rx={10} ry={6.5} fill={BR} stroke={BRS} strokeWidth={1.6} />
      {/* ===== big fluffy cream RUFF around the neck (Eevee's signature) ===== */}
      <g>
        {[[26, 60], [33, 50], [44, 46], [56, 46], [67, 50], [74, 60], [70, 70], [58, 74], [42, 74], [30, 70]].map(([rx, ry], i) => (
          <circle key={`ruff${i}`} cx={rx} cy={ry} r={12} fill={CR} stroke={CRS} strokeWidth={1.4} />
        ))}
        {[[34, 56], [46, 52], [58, 52], [66, 58], [50, 60]].map(([rx, ry], i) => (
          <circle key={`ruff2${i}`} cx={rx} cy={ry} r={9} fill="#FBEFC8" />
        ))}
      </g>
      {/* ===== head ===== */}
      <ellipse cx={50} cy={40} rx={25} ry={22} fill={BR} stroke={BRS} strokeWidth={2.3} />
      <ellipse cx={50} cy={34} rx={19} ry={11} fill={BRL} opacity={0.5} />
      {/* eyes */}
      <ellipse cx={40} cy={40} rx={6} ry={7.4} fill={DK} /><circle cx={41.8} cy={37.6} r={2.1} fill="#fff" />
      <ellipse cx={60} cy={40} rx={6} ry={7.4} fill={DK} /><circle cx={61.8} cy={37.6} r={2.1} fill="#fff" />
      {/* nose + mouth */}
      <path d="M46 48 L54 48 L50 53 Z" fill={DK} />
      <path d="M50 53 Q45 58 41 55 M50 53 Q55 58 59 55" stroke={DK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const Pokeball: React.FC<{ x: number; y: number; sz?: number; wobble?: number; open?: number; hue?: string }> = ({ x, y, sz = 60, wobble = 0, open = 0, hue = "#E23B2E" }) => {
  const rot = wobble ? Math.sin(wobble * Math.PI * 3) * 16 * (1 - Math.min(1, wobble)) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#F4F0E8", border: `${sz * 0.05}px solid #26262A`, boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.16), 0 6px 12px -4px rgba(0,0,0,0.4)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${50 - open * 42}%`, background: `linear-gradient(180deg,${hue},#B4231B)`, transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "44%", height: `${sz * 0.12}px`, background: "#26262A" }} />
        <div style={{ position: "absolute", left: `${sz * 0.16}px`, top: `${sz * 0.13}px`, width: `${sz * 0.22}px`, height: `${sz * 0.12}px`, borderRadius: "50%", background: "rgba(255,255,255,0.4)", filter: "blur(1px)" }} />
      </div>
      {/* center button */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: sz * 0.26, height: sz * 0.26, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#F4F0E8", border: `${sz * 0.045}px solid #26262A`, boxShadow: `inset 0 0 0 ${sz * 0.03}px #C9C4B6` }} />
    </div>
  );
};
// type badge chip
// ===== recognizable POKEMON sprites (drawn SVG) =====
// ===== PIKACHU — chubby, black-tipped ears, red cheeks, lightning tail =====
export const Pikachu: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 120, lf = 0 }) => {
  const bob = Math.sin(lf / 12) * 2, spark = Math.sin(lf / 5) > 0.6;
  const Y = "#F8D22C", YL = "#FDE270", YS = "#E0A81E", BR = "#8A5A1E", DK = "#2A241C";
  return (
    <svg width={sz} height={sz * 1.16} viewBox="0 0 100 116" style={{ position: "absolute", left: x, top: y + bob, overflow: "visible", filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.23))" }}>
      {/* lightning-bolt tail (behind) */}
      <path d="M64 74 L84 50 L74 50 L93 24 L80 26 L97 4 L70 30 L82 30 L64 54 L74 54 Z" fill={Y} stroke={YS} strokeWidth={2} strokeLinejoin="round" />
      <path d="M64 74 L80 54 L72 54 L82 42 L64 60 Z" fill={BR} />
      {spark && <g opacity={0.9}><path d="M90 12 l4 -6 M96 18 l7 -2 M88 24 l5 4" stroke="#FFF07A" strokeWidth={2.4} strokeLinecap="round" /></g>}
      {/* ears with black tips */}
      <path d="M32 36 C 25 15, 20 6, 15 1 C 29 6, 39 22, 42 34 Z" fill={Y} stroke={YS} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M23 13 C 20 7, 17 3, 15 1 C 22 5, 27 13, 29 22 Z" fill={DK} />
      <path d="M68 34 C 71 15, 81 6, 85 1 C 80 8, 72 22, 68 36 Z" fill={Y} stroke={YS} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M77 13 C 80 7, 83 3, 85 1 C 79 5, 74 13, 72 22 Z" fill={DK} />
      {/* body (chubby) */}
      <ellipse cx={50} cy={70} rx={36} ry={40} fill={Y} stroke={YS} strokeWidth={2.3} />
      <ellipse cx={50} cy={58} rx={28} ry={16} fill={YL} opacity={0.55} />
      {/* brown back stripes */}
      <path d="M19 54 Q16 47 19 41" stroke={BR} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.9} />
      <path d="M81 54 Q84 47 81 41" stroke={BR} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.9} />
      {/* red cheeks */}
      <circle cx={23} cy={76} r={10.5} fill="#EF4A2C" /><circle cx={20} cy={73} r={3} fill="#FF7A5C" opacity={0.6} />
      <circle cx={77} cy={76} r={10.5} fill="#EF4A2C" /><circle cx={74} cy={73} r={3} fill="#FF7A5C" opacity={0.6} />
      {/* eyes (glossy) */}
      <ellipse cx={37} cy={62} rx={7} ry={8} fill={DK} /><circle cx={39.6} cy={59} r={2.4} fill="#fff" /><circle cx={35.6} cy={64} r={1.2} fill="#fff" opacity={0.7} />
      <ellipse cx={63} cy={62} rx={7} ry={8} fill={DK} /><circle cx={65.6} cy={59} r={2.4} fill="#fff" /><circle cx={61.6} cy={64} r={1.2} fill="#fff" opacity={0.7} />
      {/* nose + open smile */}
      <ellipse cx={50} cy={70} rx={2.2} ry={1.6} fill={DK} />
      <path d="M42 75 Q50 84 58 75 Q50 80 42 75 Z" fill="#B23A2C" stroke="#7E3320" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M50 75 L50 79" stroke="#7E3320" strokeWidth={1.6} />
      {/* arms + feet */}
      <ellipse cx={17} cy={86} rx={7} ry={11} fill={Y} stroke={YS} strokeWidth={1.7} transform="rotate(-14 17 86)" />
      <ellipse cx={83} cy={86} rx={7} ry={11} fill={Y} stroke={YS} strokeWidth={1.7} transform="rotate(14 83 86)" />
      <ellipse cx={35} cy={107} rx={12} ry={7.5} fill={Y} stroke={YS} strokeWidth={1.7} />
      <ellipse cx={65} cy={107} rx={12} ry={7.5} fill={Y} stroke={YS} strokeWidth={1.7} />
    </svg>
  );
};
export const TypeBadge: React.FC<{ t: string; sz?: number }> = ({ t, sz = 1 }) => (
  <span style={{ display: "inline-block", padding: `${3 * sz}px ${11 * sz}px`, borderRadius: 999, background: TYPE_COL[t] || "#8A8A99", border: "2px solid rgba(0,0,0,0.28)", fontFamily: mono, fontWeight: 900, fontSize: 14 * sz, letterSpacing: 1, color: "#FFFFFF", textShadow: "0 1px 0 rgba(0,0,0,0.35)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>{t}</span>
);
// stat bar (HP-style)
export const StatBar: React.FC<{ label: string; pct: number; col?: string; w?: number }> = ({ label, pct, col = "#57C24A", w = 200 }) => (
  <div style={{ width: w, display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 13, color: "#EAF0F7", width: 62, letterSpacing: 1 }}>{label}</span>
    <div style={{ flex: 1, height: 12, borderRadius: 999, background: "rgba(0,0,0,0.4)", border: "2px solid rgba(0,0,0,0.5)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, pct))}%`, background: `linear-gradient(180deg,${col},${col}CC)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)", borderRadius: 999 }} />
    </div>
  </div>
);
// Pokedex entry card (the reusable "upgrade" card): sprite slot + name + types + one-line + stat
export const PokedexCard: React.FC<{ x: number; y: number; w?: number; no?: string; name: string; types: string[]; desc: string; children?: React.ReactNode; op?: number }> = ({ x, y, w = 360, no = "No.001", name, types, desc, children, op = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, opacity: op, borderRadius: 18, background: `linear-gradient(180deg,${PK.dex},${PK.dexDk})`, border: "4px solid #7E2A22", boxShadow: "0 12px 0 rgba(0,0,0,0.22), inset 0 3px 0 rgba(255,255,255,0.24)", padding: 12, display: "flex", gap: 12 }}>
    {/* sprite window */}
    <div style={{ width: 96, height: 96, flexShrink: 0, borderRadius: 12, background: "radial-gradient(circle at 50% 40%, #EAF6FF, #BFE0F2)", border: "4px solid #2B3550", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.18)", position: "relative", overflow: "hidden" }}>{children}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 12, color: "#F6D9C8" }}>{no}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#FFF6EE", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
      </div>
      <div style={{ marginTop: 5, display: "flex", gap: 6 }}>{types.map((t) => <TypeBadge key={t} t={t} sz={0.85} />)}</div>
      <div style={{ marginTop: 7, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 14, color: "#FBE7DC", lineHeight: 1.28 }}>{desc}</div>
    </div>
  </div>
);
// Pokemon-style scene title plate
const PkSlug: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", left: "50%", top: 22, transform: "translateX(-50%)", padding: "8px 24px", borderRadius: 12, background: "linear-gradient(180deg,#3A4A63,#26303F)", border: "4px solid #F4F0E8", boxShadow: "0 6px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.12)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#FFF6EE", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{text}</div>
);
// evolution white-glow overlay (p: 0..1)
export const EvoGlow: React.FC<{ p: number }> = ({ p }) => (p <= 0.001 ? null : (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 34, background: `radial-gradient(circle at 50% 46%, rgba(255,255,255,${0.9 * p}) 0%, rgba(230,240,255,${0.5 * p}) ${18 + p * 18}%, rgba(255,255,255,0) ${44 + p * 22}%)` }} />
));

const MSky: React.FC<{ children?: React.ReactNode; blocks?: boolean }> = ({ children, blocks = true }) => {
  const f = useCurrentFrame();
  const sway = (spd: number, amp: number, ph = 0) => Math.sin(f / spd + ph) * amp;
  const cloud = (bx: number, cy: number, s: number, spd: number) => ((bx + f * spd) % 1360) - 200;
  return (
    <>
      {/* sky gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#4C8AFB 0%,#69A0FC 38%,#8FBBFF 72%,#B9D7FF 100%)" }} />
      {/* warm sun bloom, top-right (bg depth wash) */}
      <div style={{ position: "absolute", right: -70, top: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,248,214,0.6), rgba(255,248,214,0) 68%)" }} />
      {/* distant blue-green mountains (slow parallax sway) */}
      <div style={{ position: "absolute", left: -60 + sway(46, 8), bottom: 90, width: 420, height: 300, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${MTN},${MTNDK})`, boxShadow: "inset 0 -12px 0 rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", left: "38%", top: "6%", width: "24%", height: "20%", borderRadius: "50% 50% 40% 40% / 100% 100% 0 0", background: "rgba(244,248,255,0.92)" }} />
      </div>
      <div style={{ position: "absolute", right: -40 + sway(52, 7, 2), bottom: 90, width: 340, height: 240, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,#7FB0D2,#5A88AD)`, boxShadow: "inset 0 -10px 0 rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", left: "40%", top: "8%", width: "22%", height: "18%", borderRadius: "50% 50% 40% 40% / 100% 100% 0 0", background: "rgba(244,248,255,0.9)" }} />
      </div>
      {/* mid green hills with the Mario face-dots */}
      <div style={{ position: "absolute", left: -70 + sway(58, 6), bottom: 88, width: 300, height: 176, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${HILLG},${HILLDK})`, boxShadow: "inset 0 -12px 0 rgba(0,0,0,0.1)" }}>
        <div style={{ position: "absolute", left: "32%", top: "50%", width: 15, height: 22, borderRadius: "50%", background: HILLDK }} />
        <div style={{ position: "absolute", left: "56%", top: "50%", width: 15, height: 22, borderRadius: "50%", background: HILLDK }} />
      </div>
      <div style={{ position: "absolute", right: -50 + sway(50, 7, 1.4), bottom: 88, width: 220, height: 128, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${HILLG},${HILLDK})`, boxShadow: "inset 0 -10px 0 rgba(0,0,0,0.1)" }}>
        <div style={{ position: "absolute", left: "34%", top: "52%", width: 12, height: 17, borderRadius: "50%", background: HILLDK }} />
        <div style={{ position: "absolute", left: "56%", top: "52%", width: 12, height: 17, borderRadius: "50%", background: HILLDK }} />
      </div>
      {/* front bushes hugging the ground */}
      {[[120, 150], [520, 120], [800, 170]].map(([bx, bw], i) => (
        <div key={i} style={{ position: "absolute", left: (bx as number) + sway(60, 4, i), bottom: 84, width: bw as number, height: 46, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${BUSHG},#4EA636)`, boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.12)" }}>
          <div style={{ position: "absolute", left: "18%", bottom: 0, width: "40%", height: 34, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${BUSHG},#4EA636)` }} />
          <div style={{ position: "absolute", right: "18%", bottom: 0, width: "40%", height: 30, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: `linear-gradient(180deg,${BUSHG},#4EA636)` }} />
        </div>
      ))}
      {/* drifting detailed clouds with under-shading */}
      <MCloud x={cloud(60, 40, 0.72, 0.30)} y={40} s={0.78} />
      <MCloud x={cloud(520, 30, 0.9, 0.20)} y={30} s={0.62} />
      <MCloud x={cloud(300, 118, 1, 0.42)} y={118} s={0.9} />
      {/* textured brick ground band + grass lip + top edge highlight */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 84, height: 12, background: `linear-gradient(180deg,#7EC64F,#4E9E38)`, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.28)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 90, background: GRD, borderTop: "7px solid #7E3F16", boxShadow: "inset 0 6px 0 rgba(255,255,255,0.14), inset 0 -24px 40px rgba(90,40,14,0.35)", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 56px, rgba(90,40,14,0.34) 56px 60px), repeating-linear-gradient(0deg, transparent 0 46px, rgba(90,40,14,0.34) 46px 48px)" }} />
      {children}
    </>
  );
};

// glossy animated ? block — beveled edges, rivets, pulsing shine sweep, bump (hit) + used state
const QBlock: React.FC<{ x: number; y: number; sz?: number; hit?: number; used?: boolean; label?: string; lf?: number }> = ({ x, y, sz = 62, hit = 0, used = false, label = "?", lf = 0 }) => {
  const sweep = ((lf * 3.4) % (sz * 3.2)) - sz * 1.1;
  return (
    <div style={{ position: "absolute", left: x, top: y - hit * 13, width: sz, height: sz, borderRadius: 8, overflow: "hidden", background: used ? "linear-gradient(180deg,#B87E3A,#8A5B22)" : `linear-gradient(180deg,${QB} 0%,#E9A616 52%,${QBDK} 100%)`, border: "3px solid #7E3F16", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.38), inset 0 -5px 0 rgba(120,70,10,0.4), inset -3px 0 0 rgba(120,70,10,0.28), 0 7px 0 rgba(0,0,0,0.22), 0 12px 22px -8px rgba(0,0,0,0.5)", transform: `scaleY(${1 + hit * 0.06})`, transformOrigin: "50% 100%" }}>
      {!used && <div style={{ position: "absolute", left: -sz * 0.55 + sweep, top: -sz * 0.3, width: sz * 0.5, height: sz * 1.6, background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)", transform: "rotate(20deg)", pointerEvents: "none" }} />}
      {!used && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: sz * 0.5, color: "#7E3F16", textShadow: "0 2px 0 rgba(255,255,255,0.35)" }}>{label}</div>}
      {[[6, 6], [6, sz - 12], [sz - 12, 6], [sz - 12, sz - 12]].map(([bx, by], i) => (
        <div key={i} style={{ position: "absolute", left: bx, top: by, width: 6, height: 6, borderRadius: 1.5, background: "#7E3F16", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }} />
      ))}
    </div>
  );
};

// textured brick with bevel + top highlight
const Brick: React.FC<{ x: number; y: number; sz?: number }> = ({ x, y, sz = 62 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: 5, background: `linear-gradient(180deg,#DB854A,#D07A3A 40%,${MBRICK})`, border: "3px solid #7E3F16", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.24), inset 0 -4px 0 rgba(90,40,14,0.35), 0 6px 14px -6px rgba(0,0,0,0.45)", backgroundImage: "repeating-linear-gradient(0deg, transparent 0 13px, rgba(90,40,14,0.42) 13px 15px), repeating-linear-gradient(90deg, transparent 0 20px, rgba(90,40,14,0.42) 20px 22px)" }} />
);

// crisp spinning gold coin — bright rim, inner notch, specular highlight, optional sparkle
const Coin: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 34, lf = 0 }) => {
  const c = Math.cos(lf * 0.16 + x * 0.05);
  const w = 0.2 + 0.8 * Math.abs(c);
  const sparkle = Math.max(0, (Math.abs(c) - 0.86) / 0.14);
  return (
    <div style={{ position: "absolute", left: x + (sz - sz * w) / 2, top: y, width: sz * w, height: sz }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `linear-gradient(180deg,#FCE47A,${MCOIN} 40%,${MCOINDK})`, border: "2px solid #A8801A", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.6), 0 4px 8px -3px rgba(120,80,10,0.5)" }} />
      {w > 0.42 && <div style={{ position: "absolute", left: "50%", top: "18%", transform: "translateX(-50%)", width: Math.max(2, sz * w * 0.16), height: "64%", borderRadius: 2, background: "rgba(150,110,20,0.55)" }} />}
      <div style={{ position: "absolute", left: "20%", top: "14%", width: "26%", height: "34%", borderRadius: "50%", background: "rgba(255,255,255,0.7)", filter: "blur(0.5px)" }} />
      {sparkle > 0.05 && <svg width={sz * 0.5} height={sz * 0.5} viewBox="0 0 20 20" style={{ position: "absolute", right: -sz * 0.12, top: -sz * 0.14, opacity: sparkle }}>
        <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z" fill="#FFF6D6" />
      </svg>}
    </div>
  );
};

// classic green warp pipe — rounded lip, left specular, rim ridges, darker body shading
const Pipe: React.FC<{ x: number; y: number; w?: number; h?: number; lit?: boolean }> = ({ x, y, w = 96, h = 150, lit = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.35))" }}>
    <div style={{ position: "absolute", left: -9, top: 0, width: w + 18, height: 38, borderRadius: 11, background: `linear-gradient(90deg,#1E5E1E,${lit ? "#74DE74" : "#4CC24C"} 22%,${lit ? "#63D063" : PIPEG} 50%,${PIPEDK} 86%,#1E5E1E)`, border: "4px solid #1E5E1E", boxShadow: "inset 6px 2px 0 rgba(255,255,255,0.32), inset 0 -5px 0 rgba(20,70,20,0.5)" }}>
      <div style={{ position: "absolute", left: 6, top: 8, right: 6, height: 4, borderRadius: 2, background: "rgba(20,70,20,0.4)" }} />
      <div style={{ position: "absolute", left: 6, bottom: 6, right: 6, height: 4, borderRadius: 2, background: "rgba(20,70,20,0.4)" }} />
    </div>
    <div style={{ position: "absolute", left: 4, top: 34, width: w - 8, height: h - 34, background: `linear-gradient(90deg,#1E5E1E 0%,#2E7A2E 14%,${lit ? "#6BD16B" : "#52C052"} 42%,${lit ? "#63D063" : PIPEG} 52%,#2E7A2E 84%,#1E5E1E 100%)`, borderLeft: "4px solid #1E5E1E", borderRight: "4px solid #1E5E1E" }} />
  </div>
);

// GOOMBA — angry brow, big eyes, walk-cycle feet (lf), squish + dust puff
const Goomba: React.FC<{ x: number; y: number; sz?: number; squish?: number; label?: string; lf?: number; phase?: number }> = ({ x, y, sz = 62, squish = 0, label, lf = 0, phase = 0 }) => {
  const step = squish > 0.3 ? 0 : Math.sin(lf / 5 + phase);
  const lF = Math.max(0, step) * sz * 0.09;
  const rF = Math.max(0, -step) * sz * 0.09;
  const tilt = squish > 0.3 ? 0 : step * 3;
  return (
    <div style={{ position: "absolute", left: x, top: y + squish * (sz * 0.5), width: sz, height: sz * (1 - squish * 0.72), opacity: squish > 0.95 ? 0 : 1 }}>
      {squish > 0.5 && [[-0.12, 0.5], [1.0, 0.42], [0.4, -0.06]].map(([dx, dy], i) => (
        <div key={i} style={{ position: "absolute", left: sz * (dx as number), top: sz * (dy as number), width: sz * 0.2, height: sz * 0.2, borderRadius: "50%", background: "#D9C29A", opacity: Math.max(0, (squish - 0.5) * 1.6) }} />
      ))}
      <div style={{ position: "absolute", inset: 0, transform: `rotate(${tilt}deg)`, transformOrigin: "50% 90%" }}>
        <div style={{ position: "absolute", left: sz * 0.07, top: 0, width: sz * 0.86, height: sz * 0.64, borderRadius: "50% 50% 42% 42%", background: "linear-gradient(180deg,#C1832F,#7E4E1C)", border: "3px solid #4A2C10", boxShadow: "inset 0 5px 0 rgba(255,255,255,0.14), inset 0 -6px 0 rgba(40,24,8,0.35)" }} />
        {/* angry brows */}
        <div style={{ position: "absolute", left: sz * 0.2, top: sz * 0.16, width: sz * 0.24, height: sz * 0.09, borderRadius: 3, background: "#3A2410", transform: "rotate(20deg)" }} />
        <div style={{ position: "absolute", right: sz * 0.2, top: sz * 0.16, width: sz * 0.24, height: sz * 0.09, borderRadius: 3, background: "#3A2410", transform: "rotate(-20deg)" }} />
        {/* big eyes */}
        <div style={{ position: "absolute", left: sz * 0.24, top: sz * 0.24, width: sz * 0.16, height: sz * 0.2, borderRadius: "50% 50% 46% 46%", background: "#F4EEE2", border: "2px solid #4A2C10" }} />
        <div style={{ position: "absolute", right: sz * 0.24, top: sz * 0.24, width: sz * 0.16, height: sz * 0.2, borderRadius: "50% 50% 46% 46%", background: "#F4EEE2", border: "2px solid #4A2C10" }} />
        <div style={{ position: "absolute", left: sz * 0.31, top: sz * 0.31, width: sz * 0.07, height: sz * 0.11, borderRadius: 2, background: "#1A1208" }} />
        <div style={{ position: "absolute", right: sz * 0.31, top: sz * 0.31, width: sz * 0.07, height: sz * 0.11, borderRadius: 2, background: "#1A1208" }} />
        {/* scowl mouth */}
        <div style={{ position: "absolute", left: sz * 0.36, top: sz * 0.5, width: sz * 0.28, height: sz * 0.05, borderRadius: "0 0 6px 6px", background: "#3A2410" }} />
        {/* body + feet with walk cycle */}
        <div style={{ position: "absolute", left: 0, top: sz * 0.58, width: sz, height: sz * 0.34, borderRadius: 7, background: "linear-gradient(180deg,#D8B57E,#B98F58)", border: "3px solid #4A2C10" }} />
        <div style={{ position: "absolute", left: sz * 0.05, bottom: -3 - lF, width: sz * 0.36, height: sz * 0.17, borderRadius: 5, background: "#3A2410", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", right: sz * 0.05, bottom: -3 - rF, width: sz * 0.36, height: sz * 0.17, borderRadius: 5, background: "#3A2410", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12)" }} />
        {label && <div style={{ position: "absolute", left: 0, right: 0, top: sz * 0.66, textAlign: "center", fontFamily: mono, fontSize: sz * 0.13, fontWeight: 800, color: "#3A2410" }}>{label}</div>}
      </div>
    </div>
  );
};

// twinkling Super Star — face, rounded points, rotating sparkle
const Star: React.FC<{ x: number; y: number; sz?: number; spin?: number; lf?: number }> = ({ x, y, sz = 74, spin = 0, lf = 0 }) => {
  const tw = 0.5 + 0.5 * Math.sin(lf * 0.3);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz }}>
      <svg width={sz} height={sz} viewBox="0 0 50 50" style={{ position: "absolute", left: 0, top: 0, transform: `rotate(${spin}deg)`, filter: "drop-shadow(0 4px 6px rgba(120,80,10,0.5))" }}>
        <path d="M25 2 L31 18 L48 18 L34 29 L39 46 L25 36 L11 46 L16 29 L2 18 L19 18 Z" fill="#FFE04A" stroke="#C98A12" strokeWidth={2.6} strokeLinejoin="round" />
        <path d="M25 6 L29.5 18 L25 20 L20.5 18 Z" fill="rgba(255,255,255,0.5)" />
        <circle cx={19} cy={25} r={2.8} fill="#2A2010" /><circle cx={31} cy={25} r={2.8} fill="#2A2010" />
        <path d="M20 31 Q25 35 30 31" fill="none" stroke="#2A2010" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <svg width={sz * 0.42} height={sz * 0.42} viewBox="0 0 20 20" style={{ position: "absolute", left: sz * 0.02, top: sz * 0.02, opacity: 0.55 + tw * 0.45, transform: `rotate(${lf * 4}deg)` }}>
        <path d="M10 1 L11.4 8.6 L19 10 L11.4 11.4 L10 19 L8.6 11.4 L1 10 L8.6 8.6 Z" fill="#FFF6D6" />
      </svg>
    </div>
  );
};

// detailed shaded fire flower power-up
const FireFlower: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 60, lf = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, filter: "drop-shadow(0 6px 10px rgba(120,60,10,0.35))" }}>
    <div style={{ position: "absolute", left: sz * 0.5, top: sz * 0.72, width: 6, height: sz * 0.32, marginLeft: -3, borderRadius: 3, background: "linear-gradient(90deg,#2E7A2E,#4EAE4E,#2E7A2E)" }} />
    <div style={{ position: "absolute", left: sz * 0.2, top: sz * 0.82, width: sz * 0.24, height: sz * 0.14, borderRadius: "0 60% 0 60%", background: "#3F9E3F", transform: "rotate(-18deg)" }} />
    {[0, 72, 144, 216, 288].map((a, i) => (
      <div key={i} style={{ position: "absolute", left: sz * 0.42, top: sz * 0.42, width: sz * 0.36, height: sz * 0.36, borderRadius: "60% 60% 60% 4px", background: i % 2 ? "linear-gradient(180deg,#F8E96A,#E9C61E)" : "linear-gradient(180deg,#FF9A54,#E85A28)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.3)", transform: `rotate(${a + Math.sin(lf * 0.1) * 6}deg) translateY(${-sz * 0.34}px)`, transformOrigin: "50% 50%" }} />
    ))}
    <div style={{ position: "absolute", left: sz * 0.31, top: sz * 0.31, width: sz * 0.38, height: sz * 0.38, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%,#FFFDF4,#E8DCC0)", border: "3px solid #C98A12" }} />
    <div style={{ position: "absolute", left: sz * 0.4, top: sz * 0.4, width: sz * 0.2, height: sz * 0.2, borderRadius: "50%", background: "#C98A12" }} />
  </div>
);

// rounded shaded super mushroom
const Mushroom: React.FC<{ x: number; y: number; sz?: number }> = ({ x, y, sz = 56 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz, filter: "drop-shadow(0 6px 10px rgba(120,40,30,0.35))" }}>
    <div style={{ position: "absolute", left: sz * 0.16, bottom: 0, width: sz * 0.68, height: sz * 0.44, borderRadius: "8px 8px 12px 12px", background: "linear-gradient(180deg,#FBF3E2,#E7D6B8)", border: "3px solid #C24A34" }} />
    <div style={{ position: "absolute", left: sz * 0.3, bottom: sz * 0.13, width: sz * 0.1, height: sz * 0.15, borderRadius: "50%", background: "#3A2A20" }} />
    <div style={{ position: "absolute", right: sz * 0.3, bottom: sz * 0.13, width: sz * 0.1, height: sz * 0.15, borderRadius: "50%", background: "#3A2A20" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: sz, height: sz * 0.58, borderRadius: "50% 50% 44% 44%", background: "radial-gradient(circle at 40% 30%,#F45A4C,#E23B2E 46%,#B4231B)", border: "3px solid #7E1610", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.22)" }} />
    <div style={{ position: "absolute", left: sz * 0.16, top: sz * 0.13, width: sz * 0.24, height: sz * 0.24, borderRadius: "50%", background: "#FBF3E2", boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.06)" }} />
    <div style={{ position: "absolute", right: sz * 0.18, top: sz * 0.2, width: sz * 0.18, height: sz * 0.18, borderRadius: "50%", background: "#FBF3E2" }} />
    <div style={{ position: "absolute", left: sz * 0.44, top: sz * 0.04, width: sz * 0.14, height: sz * 0.14, borderRadius: "50%", background: "#FBF3E2" }} />
  </div>
);

// premium Mario HUD plate
const HudBox: React.FC<{ x: number; y: number; label: string; value: string; accent?: string; sz?: number }> = ({ x, y, label, value, accent = "#F4EEE2", sz = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, padding: `${9 * sz}px ${16 * sz}px`, borderRadius: 12, background: "linear-gradient(180deg,#26263A,#141420)", border: "3px solid #000", boxShadow: "0 7px 0 rgba(0,0,0,0.32), inset 0 2px 0 rgba(255,255,255,0.14), inset 0 0 0 2px rgba(120,90,20,0.4), 0 16px 28px -12px rgba(0,0,0,0.55)", textAlign: "center" }}>
    <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 15 * sz, letterSpacing: 2, color: "#C7C2D6" }}>{label}</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34 * sz, lineHeight: 1, color: accent, marginTop: 2, textShadow: "0 2px 0 rgba(0,0,0,0.4)" }}>{value}</div>
  </div>
);

// Mario title plate slug
const MSlug: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", left: "50%", top: 24, transform: "translateX(-50%)", padding: "9px 28px", borderRadius: 14, background: "linear-gradient(180deg,#FBC744,#F2B21C 46%,#C98A12)", border: "4px solid #7E3F16", boxShadow: "0 7px 0 rgba(0,0,0,0.26), inset 0 3px 0 rgba(255,255,255,0.4), inset 0 -4px 0 rgba(120,70,10,0.4), 0 18px 30px -12px rgba(0,0,0,0.5)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: "#4A2A08", letterSpacing: "-0.01em", whiteSpace: "nowrap", textShadow: "0 2px 0 rgba(255,255,255,0.32)" }}>{text}</div>
);

// ---- NEW authentic Mario props ----

// green/red Koopa shell — hex ridges, rim, can spin
const KoopaShell: React.FC<{ x: number; y: number; sz?: number; color?: "green" | "red"; spin?: number; lf?: number }> = ({ x, y, sz = 62, color = "green", spin = 0, lf = 0 }) => {
  const top = color === "red" ? "#EE5A4E" : "#5FC24A";
  const dk = color === "red" ? "#B4231B" : "#2E7A2E";
  const rot = spin || (lf ? lf * 8 : 0);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 0.82, transform: `rotate(${rot}deg)`, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))" }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: sz, height: sz * 0.28, borderRadius: sz, background: "#F2D79A", border: "3px solid #A87C2E" }} />
      <div style={{ position: "absolute", left: sz * 0.04, top: 0, width: sz * 0.92, height: sz * 0.66, borderRadius: "50% 50% 44% 44%", background: `radial-gradient(circle at 40% 28%,${top},${dk})`, border: "3px solid #1E4E1E", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.25)" }} />
      {[[0.28, 0.24], [0.56, 0.24], [0.42, 0.42]].map(([hx, hy], i) => (
        <div key={i} style={{ position: "absolute", left: sz * (hx as number), top: sz * (hy as number), width: sz * 0.16, height: sz * 0.16, background: dk, clipPath: "polygon(50% 0,100% 28%,82% 100%,18% 100%,0 28%)" }} />
      ))}
    </div>
  );
};

// Piranha plant peeking from a pipe — t: 0 hidden, 1 fully up
const PiranhaPlant: React.FC<{ x: number; y: number; sz?: number; t?: number; lf?: number }> = ({ x, y, sz = 70, t = 1, lf = 0 }) => {
  const rise = (1 - Math.max(0, Math.min(1, t))) * sz * 1.1;
  const sway = Math.sin(lf * 0.14) * 4;
  const open = sz * 0.14 * (0.6 + 0.4 * Math.sin(lf * 0.3));
  return (
    <div style={{ position: "absolute", left: x, top: y + rise, width: sz, height: sz * 1.3, transform: `rotate(${sway}deg)`, transformOrigin: "50% 100%", clipPath: `inset(0 -40% ${rise}px -40%)`, filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.3))" }}>
      <div style={{ position: "absolute", left: sz * 0.42, top: sz * 0.5, width: sz * 0.16, height: sz * 0.8, marginLeft: 0, borderRadius: 4, background: "linear-gradient(90deg,#2E7A2E,#5EC24A,#2E7A2E)" }} />
      <div style={{ position: "absolute", left: sz * 0.12, top: sz * 0.7, width: sz * 0.3, height: sz * 0.16, borderRadius: "0 70% 0 70%", background: "#3F9E3F", transform: "rotate(-16deg)" }} />
      <div style={{ position: "absolute", right: sz * 0.12, top: sz * 0.7, width: sz * 0.3, height: sz * 0.16, borderRadius: "70% 0 70% 0", background: "#3F9E3F", transform: "rotate(16deg)" }} />
      {/* head */}
      <div style={{ position: "absolute", left: sz * 0.12, top: sz * 0.06 - open, width: sz * 0.76, height: sz * 0.4, borderRadius: "50% 50% 12px 12px", background: "radial-gradient(circle at 40% 30%,#F45A4C,#D8352B)", border: "3px solid #7E1610" }} />
      <div style={{ position: "absolute", left: sz * 0.12, top: sz * 0.34 + open, width: sz * 0.76, height: sz * 0.36, borderRadius: "12px 12px 50% 50%", background: "radial-gradient(circle at 40% 70%,#F45A4C,#D8352B)", border: "3px solid #7E1610" }} />
      {/* teeth */}
      <div style={{ position: "absolute", left: sz * 0.14, top: sz * 0.4, width: sz * 0.72, height: open * 1.1 + 2, background: "#3A0E0A" }} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: sz * (0.18 + i * 0.17), top: sz * 0.4, width: sz * 0.1, height: sz * 0.1, background: "#FBF3E2", clipPath: "polygon(0 0,100% 0,50% 100%)" }} />)}
      {/* spots */}
      <div style={{ position: "absolute", left: sz * 0.24, top: sz * 0.14 - open, width: sz * 0.14, height: sz * 0.14, borderRadius: "50%", background: "#FBF3E2" }} />
      <div style={{ position: "absolute", right: sz * 0.24, top: sz * 0.14 - open, width: sz * 0.14, height: sz * 0.14, borderRadius: "50%", background: "#FBF3E2" }} />
    </div>
  );
};

// Bullet Bill — black bullet, face, fins, arms
const BulletBill: React.FC<{ x: number; y: number; sz?: number; lf?: number }> = ({ x, y, sz = 90, lf = 0 }) => {
  const flut = Math.sin(lf * 0.6) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 0.62, filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.4))" }}>
      {/* tail fins */}
      <div style={{ position: "absolute", right: -sz * 0.02, top: -sz * 0.06 + flut, width: sz * 0.22, height: sz * 0.2, background: "#2A2A2E", borderRadius: "4px 60% 0 4px", transform: "rotate(-18deg)" }} />
      <div style={{ position: "absolute", right: -sz * 0.02, bottom: -sz * 0.06 - flut, width: sz * 0.22, height: sz * 0.2, background: "#2A2A2E", borderRadius: "4px 0 60% 4px", transform: "rotate(18deg)" }} />
      {/* body */}
      <div style={{ position: "absolute", left: 0, top: 0, width: sz, height: sz * 0.62, borderRadius: "50% 46% 46% 50% / 50%", background: "linear-gradient(180deg,#4A4A50,#1A1A1E 60%,#0A0A0C)", border: "3px solid #050506", boxShadow: "inset 0 5px 0 rgba(255,255,255,0.14)" }} />
      {/* nose highlight */}
      <div style={{ position: "absolute", left: sz * 0.04, top: sz * 0.14, width: sz * 0.2, height: sz * 0.14, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      {/* face: white eyes + arms cross */}
      <div style={{ position: "absolute", left: sz * 0.2, top: sz * 0.2, width: sz * 0.16, height: sz * 0.22, borderRadius: "50%", background: "#F4EEE2" }} />
      <div style={{ position: "absolute", left: sz * 0.24, top: sz * 0.26, width: sz * 0.07, height: sz * 0.11, borderRadius: 2, background: "#111" }} />
      <div style={{ position: "absolute", left: sz * 0.16, top: sz * 0.42, width: sz * 0.26, height: sz * 0.09, borderRadius: 5, background: "#F4EEE2", transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", left: sz * 0.14, top: sz * 0.36, width: sz * 0.26, height: sz * 0.09, borderRadius: 5, background: "#F4EEE2", transform: "rotate(8deg)" }} />
    </div>
  );
};

// small fluffy cloud platform (flat top to stand on)
const CloudPlatform: React.FC<{ x: number; y: number; w?: number; face?: boolean }> = ({ x, y, w = 180, face = true }) => {
  const h = w * 0.42;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, filter: "drop-shadow(0 10px 16px rgba(90,120,180,0.3))" }}>
      <div style={{ position: "absolute", left: 0, top: h * 0.36, width: w, height: h * 0.5, borderRadius: 999, background: "linear-gradient(180deg,#FFFFFF,#E4EEFB)" }} />
      <div style={{ position: "absolute", left: w * 0.06, top: 0, width: w * 0.32, height: w * 0.32, borderRadius: "50%", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: w * 0.34, top: -h * 0.14, width: w * 0.4, height: w * 0.4, borderRadius: "50%", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", right: w * 0.04, top: h * 0.04, width: w * 0.3, height: w * 0.3, borderRadius: "50%", background: "#FFFFFF" }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: w, height: h * 0.24, borderRadius: 999, background: "rgba(190,212,244,0.85)" }} />
      {face && <>
        <div style={{ position: "absolute", left: w * 0.36, top: h * 0.42, width: w * 0.05, height: h * 0.16, borderRadius: 4, background: "#4E6E9E" }} />
        <div style={{ position: "absolute", left: w * 0.58, top: h * 0.42, width: w * 0.05, height: h * 0.16, borderRadius: 4, background: "#4E6E9E" }} />
        <div style={{ position: "absolute", left: w * 0.34, top: h * 0.36, width: w * 0.1, height: w * 0.06, borderRadius: "50%", background: "rgba(255,150,150,0.5)" }} />
        <div style={{ position: "absolute", right: w * 0.28, top: h * 0.36, width: w * 0.1, height: w * 0.06, borderRadius: "50%", background: "rgba(255,150,150,0.5)" }} />
      </>}
    </div>
  );
};

// brick shatter — 4-6 chunks bursting, driven by p (0..1); fully clears at p=1
const BrickShatter: React.FC<{ x: number; y: number; p: number; sz?: number }> = ({ x, y, p, sz = 62 }) => {
  if (p <= 0 || p >= 1) return null;
  const chunks = [[-1, -1.2], [1, -1.4], [-1.3, -0.4], [1.3, -0.6], [-0.5, -1.6], [0.6, -1.7]];
  const o = p < 0.6 ? 1 : Math.max(0, 1 - (p - 0.6) / 0.4);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz, pointerEvents: "none" }}>
      {chunks.map(([dx, dy], i) => {
        const dist = sz * 1.4 * p;
        const gx = (dx as number) * dist;
        const gy = (dy as number) * dist + (p * p) * sz * 2.4;
        const cs = sz * 0.32;
        return <div key={i} style={{ position: "absolute", left: sz / 2 - cs / 2 + gx, top: sz / 2 - cs / 2 + gy, width: cs, height: cs, borderRadius: 3, background: `linear-gradient(180deg,#DB854A,${MBRICK})`, border: "2px solid #7E3F16", opacity: o, transform: `rotate(${p * 360 * (i % 2 ? 1 : -1)}deg)` }} />;
      })}
    </div>
  );
};

// 1-UP green popup — floats up + fades via p (0..1); fully clears at p=1
const OneUp: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  if (p <= 0 || p >= 1) return null;
  const o = p < 0.7 ? 1 : Math.max(0, 1 - (p - 0.7) / 0.3);
  const pop = Math.min(1, p / 0.12);
  return (
    <div style={{ position: "absolute", left: x, top: y - p * 96, transform: `scale(${0.7 + pop * 0.3})`, opacity: o, padding: "5px 12px", borderRadius: 9, background: "linear-gradient(180deg,#4FD070,#2E9E4E)", border: "3px solid #1E6E36", boxShadow: "0 6px 14px -4px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.35)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#FBFDF6", textShadow: "0 2px 0 rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>1-UP</div>
  );
};

// ---------------- stylized GitHub repo card (drawn mark + animated star tick) ----------------
const ghFmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n));
const REPOS: Record<string, { repo: string; desc: string; lang: string; langC: string; stars: number; forks: number }> = {
  R1: { repo: "anthropic/stop-slop", desc: "Humanize output, strip every AI tell", lang: "TypeScript", langC: "#3178C6", stars: 12400, forks: 842 },
  R2: { repo: "anthropic/claude-mem", desc: "Persistent memory across sessions", lang: "Python", langC: "#3572A5", stars: 18700, forks: 1290 },
  R3: { repo: "anthropic/uiux-pro-max", desc: "50 UI styles + 99 UX guidelines", lang: "TypeScript", langC: "#3178C6", stars: 9820, forks: 611 },
  R4: { repo: "anthropic/task-observer", desc: "Learns your style in the background", lang: "Python", langC: "#3572A5", stars: 7240, forks: 431 },
  R5: { repo: "anthropic/find-skills", desc: "Finds + installs the right skills", lang: "TypeScript", langC: "#3178C6", stars: 15100, forks: 983 },
};
const RepoCard: React.FC<{ lf: number; at: number; x: number; y: number; repo: string; desc: string; lang: string; langC: string; stars: number; forks: number; w?: number }> = ({ lf, at, x, y, repo, desc, lang, langC, stars, forks, w = 322 }) => {
  const inn = over(lf, at, fr(0.5), Easing.out(Easing.back(1.4)));
  if (inn <= 0.003) return null;
  const tick = over(lf, at + fr(0.28), fr(0.85));
  const sv = Math.round(stars * (0.52 + 0.48 * tick));
  const land = lf - (at + fr(1.1));
  const pop = land >= 0 ? Math.max(0, 1 - land / 8) : 0;
  const org = repo.split("/")[0], name = repo.split("/")[1];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, opacity: Math.min(1, inn), transform: `translateY(${(1 - inn) * 20}px) scale(${0.92 + Math.min(1, inn) * 0.08})`, transformOrigin: "50% 0%", borderRadius: 14, background: "linear-gradient(180deg,#1B2130,#141926)", border: "2px solid #303A4C", boxShadow: "0 16px 32px -12px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)", padding: "13px 16px 14px", zIndex: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <svg width={23} height={23} viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.2 11.17.6.11.82-.25.82-.56v-2c-3.34.72-4.04-1.57-4.04-1.57-.55-1.37-1.34-1.74-1.34-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.22 1.83 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21.96-.26 1.98-.39 3-.4 1.02 0 2.04.14 3 .4 2.28-1.53 3.29-1.21 3.29-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.89 1.24 3.18 0 4.54-2.81 5.54-5.48 5.83.43.37.81 1.1.81 2.22v3.29c0 .31.21.68.82.56A11.79 11.79 0 0024 12.29C24 5.78 18.63.5 12 .5z" fill="#EAEFF6" /></svg>
        <div style={{ fontFamily: mono, fontWeight: 800, fontSize: w < 300 ? 15 : 17, letterSpacing: -0.3, color: "#EDF1F7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><span style={{ color: "#8E9AAD" }}>{org}/</span>{name}</div>
      </div>
      <div style={{ marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13.5, color: "#AAB4C4", lineHeight: 1.32 }}>{desc}</div>
      <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 17, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13.5, color: "#C4CDDA" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: "50%", background: langC }} />{lang}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, transform: `scale(${1 + pop * 0.14})`, transformOrigin: "left center" }}>
          <svg width={15} height={15} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#F2C14E" stroke="#C7942E" strokeWidth={1} strokeLinejoin="round" /></svg>
          <span style={{ color: pop > 0.05 ? "#F5D06A" : "#E4E9F1", fontVariantNumeric: "tabular-nums" }}>{ghFmt(sv)}</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width={14} height={14} viewBox="0 0 16 16"><g fill="none" stroke="#9BA6B6" strokeWidth={1.7}><circle cx={4} cy={3.4} r={1.9} /><circle cx={12} cy={3.4} r={1.9} /><circle cx={8} cy={12.6} r={1.9} /><path d="M4 5.3 V7 Q4 8.8 8 8.8 Q12 8.8 12 7 V5.3 M8 8.8 V10.7" strokeLinecap="round" /></g></svg>
          {ghFmt(forks)}
        </span>
      </div>
    </div>
  );
};
// Claude "sunburst" spark logo (terracotta) — brand mark for the opening
const ClaudeLogo: React.FC<{ sz: number; spin?: number; color?: string }> = ({ sz, spin = 0, color = "#E0855F" }) => (
  <svg width={sz} height={sz} viewBox="0 0 100 100" style={{ transform: `rotate(${spin}deg)`, overflow: "visible" }}>
    {Array.from({ length: 11 }, (_, i) => {
      const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
      const len = i % 2 === 0 ? 46 : 33;
      return <line key={i} x1={50} y1={50} x2={50 + Math.cos(a) * len} y2={50 + Math.sin(a) * len} stroke={color} strokeWidth={9} strokeLinecap="round" />;
    })}
    <circle cx={50} cy={50} r={9} fill={color} />
  </svg>
);
// ===================== CINEMATIC SCENE ATMOSPHERE (panel-local ~1012x792, layers behind content) =====================
const GodRays: React.FC<{ lf: number; cx?: number; hue?: string; n?: number; from?: number }> = ({ lf, cx = 506, hue = "rgba(255,246,206,0.5)", n = 7, from = -40 }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", mixBlendMode: "screen" }}>
    {Array.from({ length: n }).map((_, i) => {
      const spread = 130; const ang = -spread / 2 + i * (spread / (n - 1)) + Math.sin(lf / 46 + i) * 2.4;
      const wob = 0.4 + 0.32 * (0.5 + 0.5 * Math.sin(lf / 21 + i * 1.7));
      return <div key={i} style={{ position: "absolute", left: cx - 3, top: from, width: 28 + (i % 3) * 20, height: 1180, transformOrigin: "50% 0%", transform: `rotate(${ang}deg)`, background: `linear-gradient(180deg, ${hue}, rgba(255,255,255,0) 80%)`, filter: "blur(7px)", opacity: wob }} />;
    })}
  </div>
);
const DepthVignette: React.FC<{ s?: number; hue?: string }> = ({ s = 0.5, hue = "rgba(8,10,22," }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(122% 96% at 50% 40%, rgba(0,0,0,0) 50%, ${hue}${(0.5 * s).toFixed(3)}) 100%)` }} />
);
const AuroraWash: React.FC<{ lf: number; a?: string; b?: string }> = ({ lf, a = "rgba(120,180,255,0.15)", b = "rgba(180,120,255,0.13)" }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", mixBlendMode: "screen" }}>
    <div style={{ position: "absolute", left: `${-10 + Math.sin(lf / 60) * 8}%`, top: "-16%", width: "72%", height: "72%", borderRadius: "50%", background: `radial-gradient(circle, ${a}, rgba(0,0,0,0) 68%)`, filter: "blur(34px)" }} />
    <div style={{ position: "absolute", right: `${-8 + Math.cos(lf / 52) * 8}%`, bottom: "-18%", width: "78%", height: "74%", borderRadius: "50%", background: `radial-gradient(circle, ${b}, rgba(0,0,0,0) 68%)`, filter: "blur(34px)" }} />
  </div>
);
const Motes: React.FC<{ lf: number; n?: number; hue?: string; kind?: string }> = ({ lf, n = 20, hue = "#FFF3C4", kind = "spark" }) => {
  const W = 1012, H = 792;
  const rise = kind === "ember" || kind === "spark" || kind === "firefly" || kind === "data";
  const glow = kind === "firefly" || kind === "ember" || kind === "spark" || kind === "data";
  const cols = ["#F2C12C", "#E8462E", "#4C90F0", "#5AC85A", "#F35B8E", "#B07BE0"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: n }).map((_, i) => {
        const a = seed(i * 2 + 1), b = seed(i * 2 + 2);
        const spd = 0.25 + a * 0.7;
        const drift = Math.sin(lf / (24 + b * 34) + i) * (16 + a * 30);
        const x = (((a * W + drift) % (W + 40)) + W + 40) % (W + 40) - 20;
        const prog = (lf * spd + b * H) % (H + 60);
        const y = rise ? H - prog : prog - 30;
        const tw = kind === "firefly" ? 0.25 + 0.75 * Math.abs(Math.sin(lf / 12 + i)) : 0.32 + b * 0.5;
        const sz = kind === "leaf" ? 7 + a * 6 : kind === "confetti" ? 8 + a * 6 : kind === "snow" ? 4 + a * 4 : 3 + a * 4;
        if (kind === "confetti") return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 0.5, background: cols[i % cols.length], opacity: tw, transform: `rotate(${lf * (2 + a * 4) + i * 40}deg)` }} />;
        if (kind === "leaf") return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 0.7, borderRadius: "0 60% 0 60%", background: hue, opacity: tw, transform: `rotate(${lf * 2 + i * 30}deg)` }} />;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: hue, opacity: tw, boxShadow: glow ? `0 0 ${sz * 1.9}px ${hue}` : "none" }} />;
      })}
    </div>
  );
};
const SceneAtmo: React.FC<{ lf: number; preset: string }> = ({ lf, preset }) => {
  switch (preset) {
    case "route": return <><GodRays lf={lf} hue="rgba(255,246,200,0.46)" n={7} /><Motes lf={lf} n={16} hue="#FFF0B4" kind="spark" /><DepthVignette s={0.38} /></>;
    case "wild": return <><GodRays lf={lf} hue="rgba(255,224,184,0.44)" n={6} /><Motes lf={lf} n={15} hue="#F6D0A0" kind="dust" /><AuroraWash lf={lf} a="rgba(226,80,60,0.13)" b="rgba(120,60,160,0.11)" /><DepthVignette s={0.5} /></>;
    case "gym": return <><GodRays lf={lf} hue="rgba(210,255,224,0.4)" n={7} /><Motes lf={lf} n={17} hue="#BFF0C0" kind="spark" /><DepthVignette s={0.52} /></>;
    case "psychic": return <><GodRays lf={lf} hue="rgba(255,200,235,0.4)" n={7} /><Motes lf={lf} n={20} hue="#FBB6E0" kind="firefly" /><AuroraWash lf={lf} a="rgba(243,91,142,0.16)" b="rgba(176,123,224,0.14)" /><DepthVignette s={0.52} /></>;
    case "tech": return <><Motes lf={lf} n={22} hue="#7FE0FF" kind="data" /><GodRays lf={lf} hue="rgba(120,200,255,0.28)" n={6} /><AuroraWash lf={lf} a="rgba(70,140,240,0.16)" b="rgba(60,200,220,0.12)" /><DepthVignette s={0.6} /></>;
    case "team": return <><Motes lf={lf} n={18} hue="#9CD0FF" kind="spark" /><GodRays lf={lf} hue="rgba(160,210,255,0.32)" n={6} /><AuroraWash lf={lf} a="rgba(76,144,240,0.14)" b="rgba(90,200,140,0.12)" /><DepthVignette s={0.54} /></>;
    case "battle": return <><GodRays lf={lf} hue="rgba(255,250,220,0.3)" n={5} /><Motes lf={lf} n={14} hue="#FFD27A" kind="ember" /><DepthVignette s={0.5} /></>;
    case "sunset": return <><GodRays lf={lf} hue="rgba(255,224,150,0.48)" n={8} /><Motes lf={lf} n={18} hue="#FFE39A" kind="firefly" /><DepthVignette s={0.5} hue="rgba(30,10,40," /></>;
    case "cta": return <><GodRays lf={lf} hue="rgba(255,240,190,0.46)" n={8} /><Motes lf={lf} n={20} hue="#FFE79A" kind="confetti" /><DepthVignette s={0.4} /></>;
    default: return null;
  }
};

const R0: React.FC<{ lf: number }> = ({ lf }) => {
  // The giant-pokeball SLAM below keeps the RAW `lf` so the cold-open drop still plays from frame 0.
  // Everything after the slam uses `lfs` — pulled earlier by SH, because the VO's 0.69s of dead
  // leading silence was trimmed to ~0.29s, so the first word now lands right on the slam.
  const SH = fr(0.40);
  const lfs = lf + SH;
  // ===== beats locked to the R0 SFX layer =====
  const slamP = over(lf, fr(0.0), fr(0.42), Easing.out(Easing.back(1.5)));      // drop-slam @0.3
  const settle = (1 - slamP) * Math.sin(lf * 3.1) * 8;
  const tick = ramp(lfs, fr(0.34), fr(1.9));                                     // download-tick counter
  const waiting = Math.round(tick * 50000);
  const lockP = over(lfs, fr(1.9), fr(0.32), Easing.out(Easing.back(2.2)));      // LOCK release @1.9
  const lockFlashO = lfs < fr(1.9) ? 0 : Math.max(0, 1 - (lfs - fr(1.9)) / 9);
  const moveUp = over(lfs, fr(2.2), fr(0.62), Easing.inOut(Easing.cubic));       // plate -> top slot @2.3
  const trainerIn = over(lfs, fr(2.3), fr(0.5), Easing.out(Easing.cubic));
  const windUp = over(lfs, fr(2.9), fr(0.3)) * (1 - over(lfs, fr(3.2), fr(0.22))); // throw wind-up hop
  const throwP = over(lfs, fr(3.2), fr(0.32), Easing.inOut(Easing.quad));        // power-up @3.2 -> land @3.5
  const landed = lfs >= fr(3.5);
  const wobbleP = ramp(lfs, fr(3.5), fr(4.4));
  const openP = over(lfs, fr(4.5), fr(0.28));                                    // ball cracks open @4.5
  const burstO = lfs < fr(4.5) ? 0 : Math.max(0, 1 - (lfs - fr(4.5)) / 11);      // reveal burst @4.55
  const cardP = over(lfs, fr(4.55), fr(0.55), Easing.out(Easing.back(1.4)));     // BUILT card reveal
  const statP = over(lfs, fr(4.9), fr(1.25), Easing.out(Easing.cubic));          // "scary close" climb
  const power = Math.round(statP * 97);
  const matchP = over(lfs, fr(5.0), fr(0.5), Easing.out(Easing.back(1.6)));

  // ===== GIANT POKEBALL SLAM — pattern interrupt (0-1.0s) =====
  const gpDrop = over(lf, 0, fr(0.3), Easing.in(Easing.quad));                 // accelerating fall
  const gpY = (1 - gpDrop) * -1500;                                            // from far above
  const gpSlam = lf < fr(0.28) ? 0 : Math.max(0, 1 - (lf - fr(0.28)) / 8);     // impact pulse
  const gpShake = gpSlam * 13 * Math.sin(lf * 3.7);
  const gpFlash = lf < fr(0.28) ? 0 : Math.max(0, 1 - (lf - fr(0.28)) / 8);
  const gpOpen = over(lf, fr(0.52), fr(0.42), Easing.in(Easing.cubic));        // split open + reveal
  const gpGone = lf >= fr(0.98);
  // CLAUDE brand burst on the slam (clarity), fades as the ball opens
  const cbIn = over(lf, fr(0.3), fr(0.24), Easing.out(Easing.back(2.0)));
  const cbOut = 1 - over(lf, fr(1.4), fr(0.5), Easing.in(Easing.cubic));
  const cbV = cbIn * cbOut; // CLAUDE bursts out of the giant pokeball as it cracks open (cold-open hook)
  const cbSpin = interpolate(over(lf, 0, fr(2.2)), [0, 1], [-70, 24]);

  // ---- thrown ball flight (trainer hand -> catch slot) ----
  const hx = 220, hy = 548, tgx = 530, tgy = 490;
  const bx = hx + throwP * (tgx - hx);
  const by = hy + throwP * (tgy - hy) - Math.sin(Math.min(1, throwP) * Math.PI) * 152;
  const ballO = lfs < fr(2.85) ? 0 : (lfs < fr(4.5) ? 1 : Math.max(0, 1 - (lfs - fr(4.5)) / 6));
  const streakO = lfs < fr(3.2) || throwP >= 0.96 ? 0 : Math.max(0, 1 - Math.abs(throwP - 0.5) * 2.2);

  // ---- WILD Pokemon (Pikachu) that gets caught by the throw ----
  const wildIn = over(lfs, fr(2.6), fr(0.42), Easing.out(Easing.back(1.6)));     // hops in as trainer winds up
  const wildHop = Math.max(0, Math.sin(lf / 7)) * 6 * (1 - over(lfs, fr(3.5), fr(0.2)));
  const captureP = over(lfs, fr(3.5), fr(0.44), Easing.in(Easing.cubic));        // sucked into the ball on land
  const wildO = Math.max(0, wildIn - captureP * 1.18);
  const capBonk = over(lfs, fr(3.5), fr(0.06)) * (1 - over(lfs, fr(3.56), fr(0.2)));      // ball-hits-Pikachu flash
  const absorbFlash = over(lfs, fr(3.9), fr(0.05)) * (1 - over(lfs, fr(3.95), fr(0.24))); // fully-absorbed pop
  const gotcha = over(lfs, fr(4.32), fr(0.32), Easing.out(Easing.back(2.2))) * (1 - over(lfs, fr(5.3), fr(0.4))); // GOTCHA! caught

  // ---- legendary plate transform ----
  const plateTop = 286 - moveUp * 194;
  const plateScale = (0.55 + 0.45 * slamP) * (1 - 0.42 * moveUp);

  return (
    <Panel label="claude.ai · ROUTE 0" tint="rgba(120,80,220,0.34)">
      <PkField />
      <SceneAtmo lf={lf} preset="route" />
      <PkSlug text="STILL WAITING ON FABLE 6?" />

      {/* legendary aura wash behind the sealed slot (bg depth only) */}
      <div style={{ position: "absolute", left: 176, top: plateTop - 40, width: 660, height: 340, transform: `scale(${plateScale})`, transformOrigin: "50% 0%", pointerEvents: "none", background: "radial-gradient(circle at 50% 45%, rgba(150,96,235,0.34), rgba(120,70,210,0) 66%)", opacity: 0.9 * (1 - moveUp * 0.4) }} />

      {/* ============ TOP: SEALED LEGENDARY SLOT ============ */}
      <div style={{ position: "absolute", left: 176, top: plateTop, width: 660, transform: `translateX(${settle}px) scale(${plateScale})`, transformOrigin: "50% 0%", borderRadius: 22, background: "linear-gradient(180deg,#2E2748,#1C1730)", border: "5px solid #7B4BE0", boxShadow: "0 20px 0 rgba(0,0,0,0.30), inset 0 3px 0 rgba(255,255,255,0.12), 0 0 44px rgba(123,75,224,0.5)", padding: 20, display: "flex", gap: 22, zIndex: 12 }}>
        {/* silhouette sprite window (???) */}
        <div style={{ width: 176, height: 176, flexShrink: 0, borderRadius: 16, background: "radial-gradient(circle at 50% 42%, #3A2E63, #17122A)", border: "5px solid #7B4BE0", boxShadow: "inset 0 4px 12px rgba(0,0,0,0.5)", position: "relative", overflow: "hidden" }}>
          {/* majestic silhouette */}
          <div style={{ position: "absolute", left: "50%", bottom: 10, transform: "translateX(-50%)" }}>
            <div style={{ position: "absolute", left: -34, top: -70, width: 22, height: 40, background: "#0C0918", transform: "rotate(-24deg)", borderRadius: "60% 60% 0 0" }} />
            <div style={{ position: "absolute", left: 14, top: -70, width: 22, height: 40, background: "#0C0918", transform: "rotate(24deg)", borderRadius: "60% 60% 0 0" }} />
            <div style={{ width: 86, height: 96, background: "#0C0918", borderRadius: "44% 44% 30% 30% / 58% 58% 22% 22%" }} />
            <div style={{ position: "absolute", left: 22, top: 34, width: 12, height: 14, borderRadius: "50%", background: "#B7A0FF", boxShadow: "0 0 12px #A585FF" }} />
            <div style={{ position: "absolute", left: 52, top: 34, width: 12, height: 14, borderRadius: "50%", background: "#B7A0FF", boxShadow: "0 0 12px #A585FF" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, color: "rgba(231,178,76,0.94)", textShadow: "0 0 22px rgba(231,178,76,0.7)", transform: `scale(${1 + Math.sin(lf / 9) * 0.05})` }}>?</div>
        </div>

        {/* right column */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ padding: "4px 13px", borderRadius: 999, background: "linear-gradient(180deg,#F2C960,#D79A2E)", border: "2px solid #8A5C15", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: "#3A2607", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)" }}>LEGENDARY</span>
            <TypeBadge t="DRAGON" sz={0.95} /><TypeBadge t="PSYCHIC" sz={0.95} />
          </div>
          <div style={{ marginTop: 6, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, lineHeight: 1, color: "#FFF6EE", letterSpacing: "-0.02em", textShadow: "0 3px 0 rgba(0,0,0,0.32)" }}>FABLE 6</div>

          {/* LOCKED ribbon — slams in on the 1.9 release */}
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, transform: `scale(${0.6 + lockP * 0.4})`, transformOrigin: "0% 50%", opacity: lockP }}>
            {/* padlock */}
            <svg width={30} height={34} viewBox="0 0 30 34"><path d="M7 14 v-4 a8 8 0 0 1 16 0 v4" fill="none" stroke="#F4F0E8" strokeWidth={4} /><rect x={3} y={13} width={24} height={19} rx={4} fill="#E8403A" stroke="#7E2A22" strokeWidth={2} /><rect x={12.5} y={19} width={5} height={8} rx={2.5} fill="#3A0C08" /></svg>
            <div style={{ flex: 1, padding: "8px 14px", borderRadius: 10, background: "linear-gradient(180deg,#E8403A,#B4231B)", border: "3px solid #7E2A22", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#FFF1EC", letterSpacing: "0.01em", boxShadow: "0 6px 0 rgba(0,0,0,0.28)", textShadow: "0 1px 0 rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}>UNRELEASED AI MODEL</div>
          </div>

          {/* waiting counter — climbs 0 -> 50,000, fades on transition */}
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, opacity: 1 - moveUp }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: "#C9BBF2" }}>DEVS REFRESHING X</span>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 28, color: "#F2C960", letterSpacing: 1, textShadow: "0 0 14px rgba(231,178,76,0.4)" }}>{waiting.toLocaleString()}</span>
          </div>
        </div>

        {/* white lock flash */}
        {lockFlashO > 0.01 && <div style={{ position: "absolute", inset: -5, borderRadius: 22, background: "radial-gradient(circle at 30% 60%, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%)", opacity: lockFlashO, pointerEvents: "none" }} />}
      </div>

      {/* ============ GAP: the twist connector ============ */}
      {matchP > 0.02 && (
        <div style={{ position: "absolute", left: 356, top: 322, transform: `translateX(${(1 - matchP) * -20}px) scale(${0.7 + matchP * 0.3})`, opacity: matchP, zIndex: 20 }}>
          <div style={{ padding: "8px 20px", borderRadius: 999, background: "linear-gradient(180deg,#4FBE7A,#2F9E5C)", border: "3px solid #1C6B3C", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#F1FFF4", letterSpacing: "0.01em", boxShadow: "0 8px 22px -6px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>{power}% AS STRONG</div>
        </div>
      )}

      {/* ============ BOTTOM-LEFT: the trainer (YOU) ============ */}
      {trainerIn > 0.02 && (
        <div style={{ position: "absolute", left: 70 - (1 - trainerIn) * 150, top: 476, opacity: trainerIn, transform: `rotate(${windUp * -6}deg)`, transformOrigin: "50% 100%", zIndex: 14 }}>
          {/* ground shadow */}
          <div style={{ position: "absolute", left: 22, top: 172, width: 130, height: 24, borderRadius: "50%", background: "rgba(20,40,20,0.28)", filter: "blur(3px)" }} />
          <Mascot lf={lf} size={175} trainer={1} jump={windUp} cheer={cardP * 0.5} nodAmp={4} nodSpeed={8} />
          <div style={{ position: "absolute", left: 44, top: 182, padding: "3px 14px", borderRadius: 999, background: "linear-gradient(180deg,#3A4A63,#26303F)", border: "2px solid #F4F0E8", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: "#FFF6EE", opacity: trainerIn }}>YOU</div>
        </div>
      )}

      {/* throw streak */}
      {streakO > 0.02 && (
        <div style={{ position: "absolute", left: bx - 54, top: by + 8, width: 60, height: 8, borderRadius: 8, background: "linear-gradient(90deg, rgba(255,236,180,0), rgba(255,236,180,0.9))", opacity: streakO, transform: "rotate(-14deg)", zIndex: 15, pointerEvents: "none" }} />
      )}

      {/* ---- WILD Pokemon to catch (a wild Pikachu), sucked into the ball on land ---- */}
      {wildO > 0.02 && (
        <div style={{ position: "absolute", left: tgx - 66, top: tgy - 96 - wildHop, zIndex: 15, opacity: wildO, transform: `translate(${capBonk * 7}px, ${captureP * 42}px) scale(${1 - captureP * 0.9})`, transformOrigin: "50% 70%", filter: captureP > 0.06 ? `saturate(${1 + captureP * 2.6}) brightness(${1 + captureP * 0.3})` : undefined }}>
          <div style={{ position: "absolute", left: 8, top: 150, width: 116, height: 20, borderRadius: "50%", background: "rgba(20,40,20,0.25)", filter: "blur(3px)" }} />
          <Pikachu x={0} y={0} sz={132} lf={lf} />
          {/* red capture-energy wash as it's absorbed */}
          {captureP > 0.04 && <div style={{ position: "absolute", left: 14, top: 14, width: 106, height: 130, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,52,0.92), rgba(255,120,74,0) 70%)", opacity: captureP, mixBlendMode: "screen" }} />}
          <div style={{ position: "absolute", left: 42, top: -4, padding: "2px 10px", borderRadius: 999, background: "linear-gradient(180deg,#7C4BD8,#5B2FA8)", border: "2px solid #33206A", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 2, color: "#F1E9FF", opacity: 1 - captureP }}>WILD</div>
        </div>
      )}
      {/* the thrown / catch pokeball */}
      {ballO > 0.02 && (
        <div style={{ position: "absolute", opacity: ballO, zIndex: 16 }}>
          <Pokeball x={bx - 27} y={by - 27} sz={54} wobble={landed ? wobbleP : 0} open={openP} />
        </div>
      )}
      {/* impact flash on the bonk + the full-absorb pop */}
      {(capBonk > 0.02 || absorbFlash > 0.02) && (
        <div style={{ position: "absolute", left: tgx - 95, top: tgy - 95, width: 190, height: 190, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${Math.max(capBonk, absorbFlash) * 0.95}), rgba(255,120,80,${Math.max(capBonk, absorbFlash) * 0.4}) 40%, rgba(255,120,80,0) 72%)`, zIndex: 16, pointerEvents: "none" }} />
      )}
      {/* GOTCHA! — the caught payoff */}
      {gotcha > 0.02 && (
        <div style={{ position: "absolute", left: tgx, top: tgy - 128, transform: `translateX(-50%) rotate(-6deg) scale(${gotcha})`, transformOrigin: "50% 100%", zIndex: 24, padding: "6px 20px", borderRadius: 12, background: "linear-gradient(180deg,#FBDE52,#F0B21C)", border: "3px solid #8A5A10", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: "#3A2A08", boxShadow: "0 5px 0 rgba(0,0,0,0.28)", whiteSpace: "nowrap", textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}>GOTCHA!</div>
      )}

      {/* reveal burst at the catch slot */}
      {burstO > 0.02 && (
        <>
          <div style={{ position: "absolute", left: tgx - 150, top: tgy - 150, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,206,0.95), rgba(255,190,90,0.4) 44%, rgba(255,190,90,0) 70%)", opacity: burstO, zIndex: 15, pointerEvents: "none" }} />
          {Array.from({ length: 9 }, (_, k) => {
            const a = (k / 9) * Math.PI * 2;
            const d = 40 + (1 - burstO) * 150;
            return <div key={k} style={{ position: "absolute", left: tgx + Math.cos(a) * d - 9, top: tgy + Math.sin(a) * d - 9, opacity: burstO, zIndex: 17 }}>
              <svg width={18} height={18} viewBox="0 0 20 20"><path d="M10 1 L11.6 8.4 L19 10 L11.6 11.6 L10 19 L8.4 11.6 L1 10 L8.4 8.4 Z" fill="#FFF0C4" /></svg>
            </div>;
          })}
        </>
      )}

      {/* ============ BOTTOM-RIGHT: the BUILT reveal card ============ */}
      {cardP > 0.02 && (
        <div style={{ position: "absolute", left: 466, top: 420, width: 494, opacity: Math.min(1, cardP * 1.4), transform: `scale(${0.7 + cardP * 0.3})`, transformOrigin: "50% 30%", borderRadius: 20, background: "linear-gradient(180deg,#28624A,#173A2C)", border: "5px solid #4FBE7A", boxShadow: "0 18px 0 rgba(0,0,0,0.26), inset 0 3px 0 rgba(255,255,255,0.14), 0 0 40px rgba(79,190,122,0.45)", padding: 18, display: "flex", gap: 18, zIndex: 18 }}>
          {/* sprite window — the trainer's own build */}
          <div style={{ width: 108, height: 108, flexShrink: 0, borderRadius: 14, background: "radial-gradient(circle at 50% 40%, #EAF6FF, #BFE0F2)", border: "4px solid #1C6B3C", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%) scale(0.62)", transformOrigin: "50% 0%" }}>
              <Mascot lf={lf} size={140} trainer={1} cheer={0.35} nodAmp={4} nodSpeed={9} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TypeBadge t="PSYCHIC" sz={0.95} /><TypeBadge t="STEEL" sz={0.95} />
              <span style={{ marginLeft: "auto", padding: "3px 11px", borderRadius: 999, background: "linear-gradient(180deg,#F2C960,#D79A2E)", border: "2px solid #8A5C15", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 1.5, color: "#3A2607", whiteSpace: "nowrap" }}>SCARY CLOSE</span>
            </div>
            <div style={{ marginTop: 7, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, lineHeight: 1, color: "#FFF7EE", letterSpacing: "-0.02em", textShadow: "0 2px 0 rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>BUILD IT YOURSELF</div>
            <div style={{ marginTop: 6, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "#D6F2E0" }}>Today's Claude, wrapped in a smarter system.</div>
            <div style={{ marginTop: 10 }}>
              <StatBar label="POWER" pct={power} col="#7BE08E" w={300} />
            </div>
          </div>
        </div>
      )}

      {/* grey crowd of waiting balls (beat 1) — fades as the twist takes over */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const o = (1 - moveUp) * slamP;
        if (o < 0.02) return null;
        return <div key={i} style={{ position: "absolute", opacity: o, zIndex: 8 }}>
          <Pokeball x={214 + i * 100} y={624 + Math.sin(lf / 10 + i) * 3} sz={44} hue="#8A8AA0" />
        </div>;
      })}
          {/* ===== GIANT POKEBALL SLAM — pattern interrupt (0-1.0s) ===== */}
      {!gpGone && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 46, top: 396 - 460 + gpY - gpOpen * 940, width: 920, height: 460, transform: `translateX(${gpShake}px)`, borderRadius: "460px 460px 0 0", background: "radial-gradient(circle at 46% 96%, #F0463A, #BE211A 72%)", boxShadow: "inset 0 34px 0 rgba(255,255,255,0.15)" }} />
          <div style={{ position: "absolute", left: 46, top: 396 + gpY + gpOpen * 940, width: 920, height: 460, transform: `translateX(${gpShake}px)`, borderRadius: "0 0 460px 460px", background: "radial-gradient(circle at 46% 4%, #FBF7EF, #CFC9BB 76%)", boxShadow: "inset 0 -34px 0 rgba(0,0,0,0.10)" }} />
          <div style={{ position: "absolute", left: 46, top: 396 - 15 + gpY, width: 920, height: 30, transform: `translateX(${gpShake}px)`, background: "#26262A", opacity: 1 - gpOpen }} />
          <div style={{ position: "absolute", left: 416, top: 306 + gpY, width: 180, height: 180, transform: `translateX(${gpShake}px) scale(${Math.max(0, 1 - gpOpen * 1.2)})`, borderRadius: "50%", background: "#FBF7EF", border: "16px solid #26262A", boxShadow: "inset 0 0 0 11px #C9C4B6, 0 0 40px rgba(0,0,0,0.35)" }} />
          {gpOpen > 0.02 && <div style={{ position: "absolute", left: 0, right: 0, top: 366 + gpY, height: 60 + gpOpen * 260, background: `rgba(255,255,255,${0.92 * (1 - gpOpen)})`, filter: "blur(22px)" }} />}
          {/* electric energy burst from the crack (Pokemon power) */}
          {gpOpen > 0.05 && gpOpen < 0.95 && Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; const d = gpOpen * 520; return <svg key={i} width={70} height={70} viewBox="0 0 20 20" style={{ position: "absolute", left: 506 + Math.cos(a) * d - 35, top: 396 + gpY + Math.sin(a) * d * 0.7 - 35, opacity: Math.max(0, 1 - gpOpen) }}><path d="M11 1 L4 11 L9 11 L7 19 L16 8 L10 8 Z" fill="#FFE04A" stroke="#F2C12C" strokeWidth={1} /></svg>; })}
          {gpFlash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: gpFlash * 0.5 }} />}
        </div>
      )}
      {cbV > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 112, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 62, opacity: Math.min(1, cbV * 1.5), transform: `translate(${gpShake * 0.5}px, ${(1 - cbIn) * -24 + (1 - cbOut) * -46}px) scale(${0.72 + cbV * 0.18})` }}>
          <div style={{ fontFamily: mono, fontWeight: 900, fontSize: 23, letterSpacing: 5, color: "#FBE7C8", textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}>EVERYONE&rsquo;S WAITING FOR</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 112, lineHeight: 0.9, color: "#FBEFE6", letterSpacing: "0.005em", textShadow: "0 3px 0 #B4231B, 0 6px 0 #7E1610, 0 13px 22px rgba(0,0,0,0.45)" }}>FABLE&nbsp;6</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 17px", borderRadius: 999, background: "linear-gradient(180deg,#F2C14E,#D79A2E)", border: "3px solid #8A5C15", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)" }}>
            <ClaudeLogo sz={26} spin={cbSpin} color="#8A3B1E" />
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 22, letterSpacing: 1.5, color: "#3A2607", whiteSpace: "nowrap" }}>BUILD IT WITH CLAUDE</span>
          </div>
        </div>
      )}
      </Panel>
  );
};

const R1: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- VO-locked beats (window 6.5-17.4s) — PRESERVED ----
  const cardIn = over(lf, fr(0.35), fr(0.62), Easing.out(Easing.back(1.6)));   // HP nameplates slide in
  const heroIn = over(lf, fr(0.15), fr(0.6), Easing.out(Easing.cubic));         // combatants appear
  const rowT = [1.2, 3.6, 5.9];                                                 // MEMORY / TOOLS / ALONE
  const rowIn = (i: number) => over(lf, fr(rowT[i]), fr(0.5), Easing.out(Easing.back(1.4)));
  const punchIn = over(lf, fr(7.9), fr(0.72), Easing.out(Easing.back(1.5)));
  const afflict = 0.5 + 0.5 * Math.sin(lf / 12);

  // ---- battle-start white flash (encounter transition) ----
  const encFlash = Math.max(0, 1 - lf / fr(0.5));

  // ---- wild-Pokemon attacks land just AFTER each realization beat ----
  const impacts = [1.9, 4.3, 6.6];
  const hitF = (t: number) => (lf < fr(t) ? 0 : Math.max(0, 1 - (lf - fr(t)) / 7));
  const shakeE = hitF(impacts[0]) + hitF(impacts[1]) + hitF(impacts[2]);
  const shX = Math.sin(lf * 1.9) * 16 * shakeE;
  const shY = Math.cos(lf * 2.4) * 11 * shakeE;
  const whiteHit = Math.min(0.55, shakeE * 0.5);
  const redRage = Math.min(0.32, shakeE * 0.34);

  // ---- Claude HP drains toward faint across the 3 hits ----
  const hpPct = interpolate(lf, [fr(1.7), fr(2.15), fr(4.1), fr(4.55), fr(6.4), fr(6.9)], [100, 56, 56, 27, 27, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hpCol = hpPct > 50 ? "#57C24A" : hpPct > 22 ? "#F2C12C" : "#E5533F";
  const recoil = -(hitF(impacts[0]) + hitF(impacts[1]) + hitF(impacts[2])) * 24;
  const faint = ramp(lf, fr(6.6), fr(8.4));
  const claudeShock = Math.min(0.5, shakeE * 0.55);
  const claudeBlink = impacts.some((t) => lf >= fr(t) && lf < fr(t) + 10 && Math.floor((lf - fr(t)) / 2) % 2 === 0);
  const eLunge = hitF(impacts[0]) + hitF(impacts[1]) + hitF(impacts[2]);

  // ---- combatant geometry (panel-local; usable x 0..1012, y 110..750) ----
  const EX = 690, EY = 140, ESZ = 188, EcX = EX + ESZ / 2, EcY = EY + ESZ / 2;   // wild GhostMon (top-right)
  const CX = 112, CY = 356, CSZ = 210, CcX = CX + CSZ / 2, CcY = CY + CSZ / 2;    // Lv.5 CLAUDE (bottom-left)

  // ---- wild attack definitions (projectile + move-name) ----
  const projDefs = [
    { t: 1.9, sz: 34, hue: "#6A4C9C", ring: false, name: "CONTEXT LIMIT" },
    { t: 4.3, sz: 58, hue: "#7B3FB0", ring: true, name: "SHADOW BALL" },
    { t: 6.6, sz: 66, hue: "#5A2E8C", ring: true, name: "RATE LIMIT" },
  ];
  const moveFlash = (() => {
    for (const d of projDefs) { if (lf >= fr(d.t - 0.5) && lf < fr(d.t) + 7) return { name: d.name, o: over(lf, fr(d.t - 0.5), fr(0.14)) }; }
    return null;
  })();

  // ---- battle-text lines (cycles through the 3 weaknesses, then near-faint) ----
  const lines = [
    { t: 0.0, txt: "A wild GLITCH appeared!" },
    { t: rowT[0], txt: "CLAUDE forgot the whole chat!" },
    { t: rowT[1], txt: "CLAUDE has no move left to use…" },
    { t: rowT[2], txt: "No other Pokémon to send in!" },
    { t: 7.0, txt: "CLAUDE is about to faint…" },
  ];
  let li = 0; lines.forEach((L2, i) => { if (lf >= fr(L2.t)) li = i; });
  const prompt = Math.floor(lf / 12) % 2 === 0;

  // ---- FIGHT move-menu state: known -> forgot(?) -> empty(-) ----
  const slotState = lf >= fr(rowT[1]) ? "empty" : lf >= fr(rowT[0]) ? "forgot" : "known";
  const slots = slotState === "empty" ? ["—", "—", "—", "—"] : slotState === "forgot" ? ["?", "?", "?", "?"] : ["TACKLE", "THINK", "REPLY", "GUESS"];
  const slotCol = slotState === "empty" ? "#E5533F" : slotState === "forgot" ? "#F2C12C" : "#8A93A6";

  const partyGlow = rowIn(2);
  const boxOut = punchIn;

  // ---- reusable Pokemon HP plate ----
  const HPBar = (pct: number, col: string) => (
    <div style={{ height: 10, borderRadius: 999, background: "#5A4A2E", border: "2px solid #2B2314", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)" }}>
      <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, pct))}%`, background: `linear-gradient(180deg,${col},${col}CC)`, borderRadius: 999, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.45)" }} />
    </div>
  );

  return (
    <Panel label="WILD ENCOUNTER" tint="rgba(214,75,62,0.30)">
      {/* ============ DISTINCT BATTLE-GRASS BACKGROUND ============ */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#A7E3F5 0%,#C7EBF6 34%,#D9F0DF 58%,#BFE39A 100%)" }} />
      {/* battle sun bloom */}
      <div style={{ position: "absolute", right: -50, top: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,214,0.7), rgba(255,250,214,0) 66%)" }} />
      {/* distant rolling hill silhouettes */}
      <div style={{ position: "absolute", left: -80, bottom: 250, width: 640, height: 260, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg,#7BC24A,#54A036)", opacity: 0.9 }} />
      <div style={{ position: "absolute", right: -110, bottom: 250, width: 560, height: 210, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "linear-gradient(180deg,#84CB52,#5AA83C)", opacity: 0.9 }} />
      {/* textured grass ground band (backgroundColor + backgroundImage) */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, backgroundColor: "#6FBF3E", backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1.6px, transparent 1.8px), radial-gradient(rgba(20,80,20,0.14) 1.6px, transparent 1.8px)", backgroundSize: "20px 20px, 20px 20px", backgroundPosition: "0 0, 10px 10px", boxShadow: "inset 0 10px 0 rgba(255,255,255,0.16)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 292, height: 22, background: "linear-gradient(180deg,#96DB5E,#6FBF3E)", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
      {/* battle vignette + red-rage / white-hit washes (bg depth, clamped) */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 150px rgba(20,40,20,0.4)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 22% 62%, rgba(196,74,58,${redRage}), rgba(196,74,58,0) 60%)`, pointerEvents: "none" }} />

      <SceneAtmo lf={lf} preset="wild" />
      <PkSlug text="WILD BATTLE" />

      {/* ============ THE ARENA (shakes on every hit) ============ */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shX}px, ${shY}px)` }}>
        {/* enemy battle platform */}
        <div style={{ position: "absolute", left: EcX - 148, top: 268, width: 296, height: 62, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 38%, #8ACB5C, #4E9E38)", opacity: heroIn, boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.14), 0 12px 26px -12px rgba(0,0,0,0.45)" }} />
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: EcX - 120 + k * 60, top: 276, width: 7, height: 15 + (k % 2) * 6, borderRadius: "3px 3px 0 0", background: k % 2 ? "#4E9E38" : "#63B544", opacity: heroIn, transformOrigin: "50% 100%", transform: `rotate(${(k - 2) * 6}deg)` }} />)}

        {/* player battle platform (foreground) */}
        <div style={{ position: "absolute", left: CcX - 176, top: 512, width: 352, height: 78, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 36%, #90D160, #4E9E38)", opacity: heroIn, boxShadow: "inset 0 -10px 0 rgba(0,0,0,0.16), 0 16px 32px -14px rgba(0,0,0,0.5)" }} />
        {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{ position: "absolute", left: CcX - 150 + k * 62, top: 520, width: 9, height: 20 + (k % 2) * 8, borderRadius: "4px 4px 0 0", background: k % 2 ? "#4E9E38" : "#63B544", opacity: heroIn, transformOrigin: "50% 100%", transform: `rotate(${(k - 2.5) * 6 + Math.sin(lf / 20 + k) * 4}deg)` }} />)}

        {/* the WILD GhostMon (menacing, lunges on strike) */}
        <div style={{ position: "absolute", left: EX, top: EY, opacity: heroIn, transform: `translate(${(1 - heroIn) * 40 - eLunge * 26}px, ${(1 - heroIn) * -14 + eLunge * 30}px) scale(${0.9 + heroIn * 0.1})`, transformOrigin: "50% 100%", zIndex: 7 }}>
          <GhostMon x={0} y={0} sz={ESZ} lf={lf} />
        </div>
        {/* wild GHOST type tag */}
        <div style={{ position: "absolute", left: EcX - 34, top: EY + ESZ - 26, opacity: heroIn, zIndex: 8 }}><TypeBadge t="GHOST" sz={1} /></div>

        {/* the Lv.5 CLAUDE (recoils, blinks white, tips toward faint) */}
        <div style={{ position: "absolute", left: CX, top: CY, opacity: heroIn * (claudeBlink ? 0.28 : 1), transform: `translate(${(1 - heroIn) * 16 + recoil}px, ${faint * 40}px) rotate(${faint * -13 + recoil * 0.2}deg) scale(${0.94 + heroIn * 0.06})`, transformOrigin: "50% 100%", zIndex: 8 }}>
          <Mascot lf={lf} size={CSZ} trainer={1} stern={0.5} gaze={0.3} nodAmp={2.2} nodSpeed={6} shock={claudeShock} />
        </div>
        {/* floating damage numbers — every hit LANDS with a number */}
        {([[1.9, 44], [4.3, 29], [6.6, 19]] as [number, number][]).map(([t, dmg], i) => {
          const p = (lf - fr(t)) / 26;
          if (p < 0 || p > 1) return null;
          return <div key={`dmg${i}`} style={{ position: "absolute", left: CcX + 30, top: CcY - 46 - p * 84, zIndex: 22, opacity: Math.max(0, 1 - p * p * 1.15), transform: `scale(${1.4 - p * 0.4}) rotate(${-7 + p * 5}deg)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#FF5A44", textShadow: "0 3px 0 #7E1610, 0 0 16px rgba(255,90,68,0.55)", pointerEvents: "none", whiteSpace: "nowrap" }}>-{dmg}</div>;
        })}
        {/* knockout: screen darken + FNT stamp (makes the faint the real climax) */}
        {faint > 0.02 && <div style={{ position: "absolute", inset: 0, background: `rgba(18,10,28,${faint * 0.26})`, zIndex: 6, pointerEvents: "none" }} />}
        {(() => {
          const fs = over(lf, fr(7.0), fr(0.32), Easing.out(Easing.back(2.2)));
          if (fs < 0.02) return null;
          return <div style={{ position: "absolute", left: CcX - 56, top: CcY - 128, zIndex: 24, transform: `rotate(-11deg) scale(${fs})`, transformOrigin: "50% 100%", padding: "6px 20px", borderRadius: 10, background: "linear-gradient(180deg,#E5533F,#9A2018)", border: "4px solid #6E1210", boxShadow: "0 6px 0 rgba(0,0,0,0.3)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: 2, color: "#FFF3EE", textShadow: "0 2px 0 rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}>FNT</div>;
        })()}
        {/* NORMAL type tag under CLAUDE */}
        <div style={{ position: "absolute", left: CcX - 44, top: CY + CSZ - 6, opacity: heroIn, zIndex: 9 }}><TypeBadge t="NORMAL" sz={1} /></div>

        {/* ---- wild attack projectiles (Shadow Ball etc.) ---- */}
        {projDefs.map((d, i) => {
          const p = ramp(lf, fr(d.t - 0.42), fr(d.t));
          if (!(lf >= fr(d.t - 0.42) && lf < fr(d.t) + 3)) return null;
          const px = EcX + (CcX - EcX) * p;
          const py = EcY + (CcY - EcY) * p - Math.sin(p * Math.PI) * 82;
          return (
            <div key={`p${i}`} style={{ position: "absolute", left: px - d.sz / 2, top: py - d.sz / 2, width: d.sz, height: d.sz, zIndex: 12 }}>
              {d.ring && <div style={{ position: "absolute", left: -d.sz * 0.28, top: -d.sz * 0.28, width: d.sz * 1.56, height: d.sz * 1.56, borderRadius: "50%", border: `3px solid ${d.hue}`, opacity: 0.5 }} />}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 38% 34%, #E7D3FF, ${d.hue} 54%, #241238 100%)`, boxShadow: `0 0 ${d.sz * 0.5}px ${d.hue}, inset -3px -4px 6px rgba(20,8,40,0.6)` }} />
              <div style={{ position: "absolute", left: "24%", top: "20%", width: "22%", height: "16%", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
            </div>
          );
        })}

        {/* ---- impact bursts at CLAUDE ---- */}
        {projDefs.map((d, i) => {
          const bp = hitF(d.t);
          if (bp <= 0.02) return null;
          const grow = 1 - bp;
          return (
            <div key={`b${i}`} style={{ position: "absolute", left: CcX, top: CcY - 8, zIndex: 13 }}>
              <div style={{ position: "absolute", left: -(30 + grow * 74), top: -(30 + grow * 74), width: (30 + grow * 74) * 2, height: (30 + grow * 74) * 2, borderRadius: "50%", border: `4px solid ${d.hue}`, opacity: bp * 0.85 }} />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => <div key={s} style={{ position: "absolute", left: -4, top: -(26 + grow * 40), width: 8, height: 30 + grow * 34, borderRadius: 4, background: s % 2 ? "#FFF6EE" : d.hue, opacity: bp, transformOrigin: "50% 100%", transform: `rotate(${s * 45}deg)` }} />)}
            </div>
          );
        })}

        {/* move-name flash (authentic "used X!") */}
        {moveFlash && (
          <div style={{ position: "absolute", left: "50%", top: 336, transform: `translateX(-50%) scale(${0.9 + moveFlash.o * 0.1})`, opacity: moveFlash.o, zIndex: 16, padding: "6px 20px", borderRadius: 999, background: "linear-gradient(180deg,#2A1B44,#170D2A)", border: "3px solid #A583E0", boxShadow: "0 8px 22px -8px rgba(0,0,0,0.6), 0 0 22px rgba(123,63,176,0.55)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#EEDcFF", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
            GLITCH used <span style={{ color: "#D7B8FF" }}>{moveFlash.name}</span>!
          </div>
        )}

        {/* ============ ENEMY HP nameplate (top-left) ============ */}
        <div style={{ position: "absolute", left: 38, top: 96, width: 392, opacity: cardIn, transform: `translateX(${(1 - cardIn) * -26}px)`, background: "linear-gradient(180deg,#F7F2E5,#E2DBC7)", border: "4px solid #2B3550", borderRadius: "8px 24px 8px 24px", padding: "8px 16px 10px", boxShadow: "0 7px 0 rgba(0,0,0,0.26)", zIndex: 15 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ padding: "1px 8px", borderRadius: 6, background: "#6A4C9C", fontFamily: mono, fontWeight: 900, fontSize: 12, color: "#F3E9FF", letterSpacing: 1 }}>WILD</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#26303F", letterSpacing: "-0.01em" }}>GLITCH</span>
            <span style={{ marginLeft: "auto", fontFamily: mono, fontWeight: 900, fontSize: 18, color: "#7A2A22" }}>Lv.48</span>
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 12, color: "#C9A02E" }}>HP</span>
            <div style={{ flex: 1 }}>{HPBar(100, "#57C24A")}</div>
          </div>
        </div>

        {/* ============ CLAUDE HP nameplate (mid-right) + party ============ */}
        <div style={{ position: "absolute", left: 596, top: 372, width: 380, opacity: cardIn, transform: `translateX(${(1 - cardIn) * 26}px)`, background: "linear-gradient(180deg,#F7F2E5,#E2DBC7)", border: "4px solid #2B3550", borderRadius: "24px 8px 24px 8px", padding: "8px 16px 10px", boxShadow: "0 7px 0 rgba(0,0,0,0.26)", zIndex: 15 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#26303F", letterSpacing: "-0.01em" }}>CLAUDE</span>
            <span style={{ padding: "1px 8px", borderRadius: 6, background: "#9AA06E", fontFamily: mono, fontWeight: 900, fontSize: 11, color: "#fff" }}>BASE</span>
            <span style={{ marginLeft: "auto", fontFamily: mono, fontWeight: 900, fontSize: 18, color: "#7A2A22" }}>Lv.5</span>
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 12, color: "#C9A02E" }}>HP</span>
            <div style={{ flex: 1 }}>{HPBar(hpPct, hpCol)}</div>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 13, color: hpCol, width: 52, textAlign: "right" }}>{Math.round(hpPct * 0.58)}/58</span>
          </div>
          {/* party ball row (ALONE = 1 filled, 5 empty) */}
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 11, color: "#5A5346", letterSpacing: 1 }}>PARTY</span>
            {[0, 1, 2, 3, 4, 5].map((k) => k === 0 ? (
              <div key={k} style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(180deg,#E5533F 0 49%,#F4F0E8 49% 100%)", border: "2px solid #26262A", boxShadow: partyGlow > 0.05 ? `0 0 ${6 + partyGlow * 8}px ${RED}` : "none", position: "relative" }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", width: 5, height: 5, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#F4F0E8", border: "1.4px solid #26262A" }} />
              </div>
            ) : (
              <div key={k} style={{ width: 18, height: 18, borderRadius: "50%", background: "#CDC6B4", border: "2px dashed #9A927E" }} />
            ))}
            <span style={{ marginLeft: "auto", padding: "2px 9px", borderRadius: 999, background: "linear-gradient(180deg,#E5533F,#B4231B)", border: "2px solid #7E1610", opacity: partyGlow, fontFamily: mono, fontWeight: 900, fontSize: 12, color: "#FFF3EE", whiteSpace: "nowrap" }}>1/6 ALONE</span>
          </div>
        </div>

        {/* accumulating STATUS ailments (the 3 weaknesses, piling on) */}
        <div style={{ position: "absolute", left: 596, top: 490, width: 380, display: "flex", gap: 8, zIndex: 15 }}>
          {[{ t: "NO MEM" }, { t: "NO TOOLS" }, { t: "SOLO" }].map((b, i) => (
            <div key={b.t} style={{ opacity: rowIn(i), transform: `translateY(${(1 - rowIn(i)) * 10}px) scale(${0.85 + rowIn(i) * 0.15})`, padding: "4px 12px", borderRadius: 8, background: "linear-gradient(180deg,#E5533F,#B4231B)", border: "2px solid #7E1610", boxShadow: `inset 0 2px 0 rgba(255,255,255,0.22), 0 0 ${5 + afflict * 8}px rgba(196,74,58,${0.3 + afflict * 0.3})`, fontFamily: mono, fontWeight: 900, fontSize: 14, letterSpacing: 1, color: "#FFF3EE", textShadow: "0 1px 0 rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>{b.t}</div>
          ))}
        </div>
      </div>

      {/* full-screen HIT flash (over sprites, under UI) */}
      {whiteHit > 0.01 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,255,255,${whiteHit})`, pointerEvents: "none", zIndex: 18 }} />}

      {/* ============ CLASSIC POKEMON BATTLE TEXT BOX (bottom) ============ */}
      <div style={{ position: "absolute", left: 40, top: 596, width: 932, height: 150, opacity: 1 - boxOut, transform: `translateY(${boxOut * 24}px)`, background: "linear-gradient(180deg,#F7F2E5,#E7E0CD)", border: "5px solid #2B3550", borderRadius: 18, boxShadow: "0 9px 0 rgba(0,0,0,0.28), inset 0 0 0 3px #8FA0BE", display: "flex", zIndex: 20 }}>
        {/* LEFT: battle dialogue */}
        <div style={{ flex: 1, padding: "18px 22px", position: "relative" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, lineHeight: 1.14, color: "#26303F", letterSpacing: "-0.01em" }}>{lines[li].txt}</div>
          {prompt && <div style={{ position: "absolute", right: 20, bottom: 16, width: 0, height: 0, borderLeft: "12px solid #C44A3A", borderTop: "9px solid transparent", borderBottom: "9px solid transparent" }} />}
        </div>
        {/* RIGHT: FIGHT move slots (known -> ? -> empty) */}
        <div style={{ width: 340, padding: 12, background: "linear-gradient(180deg,#2B3550,#1B2338)", borderRadius: "0 12px 12px 0", border: "3px solid #10161f", borderLeft: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 2, color: "#EAF0F7" }}>FIGHT</span>
            {slotState === "empty" && <span style={{ marginLeft: "auto", fontFamily: mono, fontWeight: 900, fontSize: 12, color: "#FFB4A6" }}>OUT OF MOVES</span>}
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 6 }}>
            {slots.map((s, k) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "rgba(10,16,30,0.55)", border: `2px solid ${slotCol}`, fontFamily: mono, fontWeight: 900, fontSize: slotState === "known" ? 15 : 22, color: slotCol, boxShadow: slotState === "empty" ? `inset 0 0 12px rgba(196,74,58,0.3)` : "none" }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ PUNCHLINE (rises as CLAUDE nearly faints) ============ */}
      <div style={{ position: "absolute", left: 40, top: 596, width: 932, opacity: punchIn, transform: `translateY(${(1 - punchIn) * 28}px) scale(${0.97 + punchIn * 0.03})`, transformOrigin: "50% 100%", background: "linear-gradient(180deg,#3A4A63,#232C3B)", border: "5px solid #F4F0E8", borderRadius: 18, padding: "16px 26px 18px", boxShadow: `0 10px 0 rgba(0,0,0,0.28), 0 0 ${18 + afflict * 22}px rgba(231,178,76,${punchIn * (0.24 + afflict * 0.16)}), inset 0 2px 0 rgba(255,255,255,0.1)`, zIndex: 24 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#FFF6EE", letterSpacing: "-0.01em", lineHeight: 1.06 }}>
          It's not a <span style={{ color: GOLD }}>model</span> problem.
        </div>
        <div style={{ marginTop: 5, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: "#F6D9C8" }}>It's missing everything around it.</div>
      </div>

      {/* battle-start encounter flash (top-most) */}
      {encFlash > 0.01 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,255,255,${encFlash})`, pointerEvents: "none", zIndex: 40 }} />}
    </Panel>
  );
};

const R2: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- beats (window 17.4-21.2s, ~114f) — TIMING PRESERVED VERBATIM ----
  const f6In = over(lf, fr(0.1), fr(0.45), Easing.out(Easing.back(1.6)));   // legendary card slams in
  const f6X = over(lf, fr(0.55), fr(0.26), Easing.out(Easing.back(2.2)));    // red X stamp
  const f6Gone = over(lf, fr(0.9), fr(0.46), Easing.in(Easing.cubic));       // shrink away in place
  const f6scale = f6In * (1 - 0.9 * f6Gone);
  const f6op = f6In * (1 - f6Gone);
  const f6shake = f6X > 0.001 && f6X < 0.98 ? Math.sin(lf * 1.6) * 5 * (1 - f6X) : 0;

  const bannerIn = over(lf, fr(1.35), fr(0.42), Easing.out(Easing.back(1.8)));
  const slamFlash = lf < fr(1.45) ? 0 : Math.max(0, 1 - (lf - fr(1.45)) / 9);

  const heroIn = over(lf, fr(1.15), fr(0.55), Easing.out(Easing.back(1.4))); // trainer rises
  const pikaIn = over(lf, fr(1.42), fr(0.5), Easing.out(Easing.back(1.7)));  // partner Pikachu bounds in
  const foxIn = over(lf, fr(2.5), fr(0.5), Easing.out(Easing.back(1.5)));    // teammate cameo (corner)

  const SLOTS = [
    { l: "MEMORY", h: "#F35B8E" },
    { l: "MCP", h: "#7B8AA0" },
    { l: "TEAM", h: "#5AC85A" },
    { l: "LOOP", h: "#F2C12C" },
  ];
  const podIn = (i: number) => over(lf, fr(1.75 + i * 0.26), fr(0.4), Easing.out(Easing.back(1.7)));
  const lit = (i: number) => over(lf, fr(1.9 + i * 0.26), fr(0.46));
  // per-slot ignition spark (Thunderbolt hit) — fully clamped via lit() (0 before its fr start)
  const spark = (i: number) => { const p = lit(i); return p <= 0.02 ? 0 : Math.sin(Math.min(1, p * 1.7) * Math.PI); };
  const auraP = (lit(0) + lit(1) + lit(2) + lit(3)) / 4;
  const done = over(lf, fr(3.0), fr(0.5));

  // ---- zones (panel-local 0..1012) ----
  const TW = 176, TX = (1012 - TW) / 2, TY = 214 + (1 - heroIn) * 74;
  const TcX = TX + TW / 2, TcY = TY + 96;
  const PODW = 232, PODH = 208, GAP = 12, PY = 470;
  const podX = (i: number) => (1012 - (PODW * 4 + GAP * 3)) / 2 + i * (PODW + GAP);
  const podTop = (i: number) => ({ cx: podX(i) + PODW / 2, cy: PY + 8 });

  // Pikachu partner zone (right of hero) — chest is the Thunderbolt source
  const PKX = 636, PKY = 296, PKSZ = 108;
  const boltSrc = { x: PKX + PKSZ * 0.5, y: PKY + PKSZ * 0.56 };
  // zig-zag lightning path generator
  const bolt = (x2: number, y2: number, sd: number) => {
    const x1 = boltSrc.x, y1 = boltSrc.y, segs = 6; let d = `M${x1} ${y1}`;
    for (let s = 1; s <= segs; s++) { const t = s / segs; const j = (seed(sd + s * 3.1) * 2 - 1) * 26 * Math.sin(t * Math.PI); d += ` L${(x1 + (x2 - x1) * t + j).toFixed(1)} ${(y1 + (y2 - y1) * t + (seed(sd + s) * 2 - 1) * 6).toFixed(1)}`; }
    return d;
  };

  // continuous ambience
  const sweep = Math.sin(lf / 26);            // spotlight sweep
  const flag = Math.sin(lf / 14);             // banner flutter
  const turf = ["#4C8A52", "#3F7A47"];        // indoor battlefield turf mow-stripes

  return (
    <Panel label="GYM · TRAINING FIELD" tint="rgba(90,160,90,0.30)">
      {/* ===================== GYM ARENA BACKGROUND ===================== */}
      {/* indoor arena wall */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1B2340 0%,#243056 30%,#2C3A63 46%,#33507A 62%,#2E5E5A 74%)" }} />
      {/* soft ceiling truss lights row */}
      {[130, 340, 550, 760].map((x, i) => (
        <div key={"cl" + i} style={{ position: "absolute", left: x, top: 8, width: 120, height: 20, borderRadius: 8, background: "linear-gradient(180deg,#EAF4FF,#9DB8DC)", boxShadow: "0 10px 26px 4px rgba(180,215,255,0.35)", opacity: 0.85 }} />
      ))}
      {/* big pokeball emblem watermark on back wall (bg depth wash) */}
      <div style={{ position: "absolute", left: TcX - 190, top: 96, width: 380, height: 380, borderRadius: "50%", overflow: "hidden", opacity: 0.1 }}>
        <div style={{ position: "absolute", inset: 0, background: "#DDE7F5" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "#C25147" }} />
        <div style={{ position: "absolute", top: "46%", left: 0, right: 0, height: 22, background: "#0F1524" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 96, height: 96, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#DDE7F5", border: "18px solid #0F1524" }} />
      </div>
      {/* tiered stadium stands (left / right, silhouette crowd) */}
      {[{ s: -22, dir: 1 }, { s: 1012 - 128, dir: -1 }].map((st, si) => (
        <div key={"st" + si} style={{ position: "absolute", left: st.s, top: 118, width: 150, height: 214, transform: `perspective(600px) rotateY(${st.dir * 20}deg)`, transformOrigin: st.dir > 0 ? "left" : "right" }}>
          {[0, 1, 2, 3].map((r) => (
            <div key={r} style={{ position: "absolute", left: 6, right: 6, top: r * 50, height: 40, borderRadius: 8, background: `linear-gradient(180deg,#2A335A,#1A2140)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06)", overflow: "hidden" }}>
              {[0, 1, 2, 3, 4, 5].map((c) => <div key={c} style={{ position: "absolute", left: 10 + c * 22, top: 12, width: 14, height: 16, borderRadius: "50% 50% 40% 40%", background: ["#6E7BA8", "#4F5C8C", "#7C6F9E", "#5A6E9C"][(c + r) % 4], opacity: 0.7 }} />)}
            </div>
          ))}
        </div>
      ))}
      {/* two hanging gym banners with pokeball crest (side, gently fluttering) */}
      {[{ x: 150, fl: 1 }, { x: 792, fl: -1 }].map((b, bi) => (
        <div key={"bn" + bi} style={{ position: "absolute", left: b.x, top: 44, width: 70, height: 150, transform: `rotate(${flag * b.fl * 1.6}deg)`, transformOrigin: "50% 0%", borderRadius: "4px 4px 8px 8px", background: "linear-gradient(180deg,#B23A30,#7E241C)", border: "3px solid #F4EFE6", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.55)", clipPath: "polygon(0 0,100% 0,100% 84%,50% 100%,0 84%)" }}>
          <div style={{ position: "absolute", left: "50%", top: 26, width: 40, height: 40, transform: "translateX(-50%)", borderRadius: "50%", background: "#F4EFE6", border: "3px solid #26262A", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "#E23B2E" }} />
            <div style={{ position: "absolute", top: "44%", left: 0, right: 0, height: 4, background: "#26262A" }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#F4EFE6", border: "3px solid #26262A" }} />
          </div>
        </div>
      ))}
      {/* sweeping spotlight cones */}
      {[{ x: 150, d: 1 }, { x: 862, d: -1 }].map((sp, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: sp.x, top: -30, width: 360, height: 520, transformOrigin: "50% 0%", transform: `rotate(${sweep * 7 * sp.d + sp.d * 6}deg)`, background: `linear-gradient(180deg, rgba(255,247,214,0.34), rgba(255,247,214,0.06) 55%, rgba(255,247,214,0) 78%)`, clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", pointerEvents: "none", opacity: 0.8 }} />
      ))}

      {/* ---- BATTLEFIELD TURF (the training ground) ---- */}
      {/* front kickboard wall */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 398, height: 30, background: "linear-gradient(180deg,#59452C,#3C2C18)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.14), 0 6px 14px -6px rgba(0,0,0,0.5)" }} />
      {/* turf plane with perspective mow-stripes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 428, bottom: 0, overflow: "hidden", background: turf[1] }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
          <div key={"mw" + s} style={{ position: "absolute", top: 0, bottom: 0, left: `${s * 12.5}%`, width: "12.5%", background: s % 2 ? turf[0] : turf[1], boxShadow: "inset 0 6px 0 rgba(255,255,255,0.05)" }} />
        ))}
        {/* far light band + perspective floor sheen */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: "linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0))" }} />
        {/* white boundary lines (perspective, front court) */}
        <div style={{ position: "absolute", left: 60, right: 60, top: 8, height: 4, background: "rgba(240,248,240,0.85)", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 40, height: 7, background: "rgba(240,248,240,0.9)", borderRadius: 6 }} />
        <div style={{ position: "absolute", left: "50%", top: 8, bottom: 40, width: 6, marginLeft: -3, background: "rgba(240,248,240,0.55)" }} />
      </div>
      {/* center pokeball battlefield emblem (front court) — glows as slots power up */}
      <div style={{ position: "absolute", left: TcX - 74, top: 690, width: 148, height: 148, borderRadius: "50%", overflow: "hidden", border: "6px solid #EFF5EF", boxShadow: `0 0 ${18 + auraP * 40}px rgba(120,205,255,${0.3 + auraP * 0.5}), inset 0 -8px 16px rgba(0,0,0,0.28)`, transform: `scale(${1 + auraP * 0.05})` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg,#E8564A,#C23A30)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg,#F4EFE6,#D7D2C6)" }} />
        <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: 12, background: "#1A1E28" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 42, height: 42, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#F4EFE6", border: "8px solid #1A1E28", boxShadow: `0 0 ${auraP * 18}px rgba(120,205,255,${auraP})` }} />
      </div>

      <SceneAtmo lf={lf} preset="gym" />
      <PkSlug text="STOP WAITING" />

      {/* ===== power aura behind trainer (bg depth wash) ===== */}
      {auraP > 0.02 && (
        <div style={{ position: "absolute", left: TcX - 210, top: TcY - 210, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,200,255,0.34), rgba(90,200,255,0.10) 46%, rgba(90,200,255,0) 72%)", opacity: auraP * 0.9, pointerEvents: "none" }} />
      )}

      {/* ===== BUILD THE SYSTEM slam banner ===== */}
      {slamFlash > 0.001 && (
        <div style={{ position: "absolute", left: 506 - 260, top: 128 - 130, width: 520, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.7), rgba(255,255,255,0) 66%)", opacity: slamFlash * 0.6, pointerEvents: "none" }} />
      )}
      <div style={{ position: "absolute", left: "50%", top: 92, transform: `translateX(-50%) translateY(${slamFlash * 4}px) scale(${0.72 + bannerIn * 0.28})`, transformOrigin: "50% 50%", opacity: bannerIn, padding: "12px 34px", borderRadius: 16, background: `linear-gradient(180deg,${PK.dex},${PK.dexDk})`, border: "5px solid #F4F0E8", boxShadow: "0 8px 0 rgba(0,0,0,0.28), inset 0 3px 0 rgba(255,255,255,0.28), 0 22px 40px -16px rgba(0,0,0,0.6)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#FFF6EE", letterSpacing: "-0.01em", whiteSpace: "nowrap", textShadow: "0 3px 0 rgba(120,30,24,0.7)" }}>BUILD THE SYSTEM</div>

      {/* ===== transient: the unreleased legendary, LOCKED + crossed out ===== */}
      {f6op > 0.001 && (
        <div style={{ position: "absolute", left: 276, top: 232, width: 460, transform: `translateX(${f6shake}px) scale(${f6scale})`, transformOrigin: "50% 50%", opacity: f6op }}>
          <div style={{ position: "relative", borderRadius: 18, background: "linear-gradient(180deg,#3A4358,#232A3A)", border: "4px solid #10161f", boxShadow: "0 12px 0 rgba(0,0,0,0.22), inset 0 3px 0 rgba(255,255,255,0.12)", padding: 16, display: "flex", gap: 16, alignItems: "center", filter: `saturate(${1 - f6X * 0.7}) brightness(${1 - f6X * 0.28})` }}>
            {/* masterball orb */}
            <div style={{ width: 92, height: 92, flexShrink: 0, borderRadius: "50%", border: "5px solid #26262A", overflow: "hidden", position: "relative", background: "#F4F0E8", boxShadow: "inset 0 -6px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", background: "linear-gradient(180deg,#8B67C6,#54397E)" }} />
              <div style={{ position: "absolute", top: 6, left: 14, width: 8, height: 8, borderRadius: "50%", background: "#E7D4FF" }} />
              <div style={{ position: "absolute", top: 6, left: 26, width: 8, height: 8, borderRadius: "50%", background: "#E7D4FF" }} />
              <div style={{ position: "absolute", top: 8, left: 20, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#F0E6FF", textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}>M</div>
              <div style={{ position: "absolute", top: "42%", left: 0, right: 0, height: 8, background: "#26262A" }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 24, height: 24, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#F4F0E8", border: "4px solid #26262A" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#EAF0FA", letterSpacing: "-0.01em" }}>FABLE 6</div>
              <div style={{ marginTop: 4, fontFamily: mono, fontWeight: 800, fontSize: 14, letterSpacing: 1.5, color: "#B79BE0" }}>LEGENDARY</div>
              <div style={{ marginTop: 9, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(0,0,0,0.34)", border: "2px solid rgba(183,155,224,0.5)" }}>
                <div style={{ width: 15, height: 12, borderRadius: 2, background: "#C9B2ED", position: "relative" }}>
                  <div style={{ position: "absolute", left: 3, top: -6, width: 9, height: 9, borderRadius: "5px 5px 0 0", border: "2px solid #C9B2ED", borderBottom: "none" }} />
                </div>
                <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, letterSpacing: 1, color: "#D9C7F2" }}>NOT RELEASED</span>
              </div>
            </div>
            {/* corner padlock badge */}
            <div style={{ position: "absolute", right: -14, top: -14, width: 44, height: 44, borderRadius: 10, background: "linear-gradient(180deg,#5A6478,#39414F)", border: "3px solid #10161f", boxShadow: "0 5px 0 rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 18, height: 15, borderRadius: 3, background: "#D8DEEA" }}>
                <div style={{ position: "absolute", left: 3, top: -8, width: 12, height: 12, borderRadius: "6px 6px 0 0", border: "3px solid #D8DEEA", borderBottom: "none" }} />
                <div style={{ position: "absolute", left: "50%", top: 4, width: 3, height: 6, marginLeft: -1.5, borderRadius: 2, background: "#39414F" }} />
              </div>
            </div>
          </div>
          {/* red X stamp */}
          {f6X > 0.001 && (
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 300, height: 300, transform: `translate(-50%,-50%) scale(${f6X})`, opacity: Math.min(1, f6X * 1.4), pointerEvents: "none" }}>
              {[38, -38].map((r, k) => (
                <div key={k} style={{ position: "absolute", left: "50%", top: "50%", width: 330, height: 26, transform: `translate(-50%,-50%) rotate(${r}deg)`, borderRadius: 13, background: "linear-gradient(180deg,#F0574A,#C4392C)", border: "3px solid #7E1610", boxShadow: "0 4px 0 rgba(0,0,0,0.3)" }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== hero: the Claude Trainer ===== */}
      <div style={{ position: "absolute", left: TX, top: TY, opacity: heroIn, transform: `scale(${0.9 + heroIn * 0.1})`, transformOrigin: "50% 100%" }}>
        <Mascot lf={lf} size={TW} trainer={1} stern={0.32} cheer={done * 0.5} jump={done > 0.12 && done < 0.9 ? Math.sin(done * Math.PI) * 0.4 : 0} nodAmp={4} nodSpeed={8} gaze={2} />
      </div>

      {/* ===== partner Pikachu (own zone, right of hero) — fires Thunderbolt into the slots ===== */}
      {pikaIn > 0.01 && (
        <div style={{ position: "absolute", left: PKX, top: PKY - 40 + pikaIn * 40, opacity: pikaIn, transform: `scale(${0.7 + pikaIn * 0.3})`, transformOrigin: "50% 100%" }}>
          <Pikachu x={0} y={0} sz={PKSZ} lf={lf} />
          {/* cheek charge sparks while powering up */}
          {auraP > 0.05 && auraP < 0.99 && (
            <svg width={PKSZ} height={PKSZ} viewBox="0 0 108 108" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
              {[[24, 70], [84, 70]].map((c, k) => (
                <path key={k} d={`M${c[0]} ${c[1]} l${(seed(lf + k) * 2 - 1) * 10} -12 l6 4 l${(seed(lf + k + 5) * 2 - 1) * 8} -10`} fill="none" stroke="#FFF07A" strokeWidth={3} strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(lf / 3 + k))} />
              ))}
            </svg>
          )}
        </div>
      )}

      {/* ===== Thunderbolt arcs: Pikachu -> each slot at the moment it lights ===== */}
      {(spark(0) + spark(1) + spark(2) + spark(3)) > 0.02 && (
        <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
          {SLOTS.map((s, i) => {
            const sp = spark(i); if (sp <= 0.02) return null;
            const t = podTop(i);
            return (
              <g key={"bolt" + i} opacity={sp}>
                <path d={bolt(t.cx, t.cy, i * 17.3)} fill="none" stroke="#FFF6C8" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
                <path d={bolt(t.cx, t.cy, i * 17.3)} fill="none" stroke="#FFE04A" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={t.cx} cy={t.cy} r={10 + sp * 16} fill="#FFF6C8" opacity={sp * 0.55} />
              </g>
            );
          })}
        </svg>
      )}

      {/* ===== 4 empty ??? upgrade slots (the open loop) ===== */}
      {SLOTS.map((s, i) => {
        const pin = podIn(i), pl = lit(i), sp = spark(i);
        const on = pl > 0.4;
        return (
          <div key={s.l} style={{ position: "absolute", left: podX(i), top: PY + (1 - pin) * 30 - sp * 4, width: PODW, height: PODH, opacity: pin, transform: `scale(${0.86 + pin * 0.14 + sp * 0.03})`, transformOrigin: "50% 100%", borderRadius: 18, background: `linear-gradient(180deg,${PK.steel},${PK.steelDk})`, border: `4px solid ${on ? s.h : "#3A4560"}`, boxShadow: on ? `0 9px 0 rgba(0,0,0,0.24), inset 0 3px 0 rgba(255,255,255,0.14), 0 0 ${16 + pl * 26 + sp * 30}px ${s.h}` : "0 9px 0 rgba(0,0,0,0.24), inset 0 3px 0 rgba(255,255,255,0.1)", padding: 14 }}>
            {/* ignition flash */}
            {sp > 0.02 && <div style={{ position: "absolute", inset: -4, borderRadius: 20, background: `radial-gradient(circle at 50% 34%, ${s.h}, rgba(255,255,255,0) 66%)`, opacity: sp * 0.6, pointerEvents: "none" }} />}
            {/* empty pokeball-outline slot */}
            <div style={{ position: "absolute", left: (PODW - 88) / 2, top: 20, width: 88, height: 88, borderRadius: "50%", border: `4px dashed ${on ? s.h : "#5A667E"}`, background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0.28))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: on ? `inset 0 0 18px ${s.h}66` : "inset 0 2px 8px rgba(0,0,0,0.4)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: on ? "#FFF6EE" : "#6E7A94", textShadow: on ? `0 0 12px ${s.h}` : "none", letterSpacing: 1 }}>???</span>
            </div>
            {/* label plate */}
            <div style={{ position: "absolute", left: 16, right: 16, top: 128, height: 40, borderRadius: 10, background: on ? `linear-gradient(180deg,${s.h},${s.h}CC)` : "linear-gradient(180deg,#323C54,#242C3E)", border: `2px solid ${on ? "rgba(0,0,0,0.32)" : "#3E4A64"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.22)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: on ? "#FFFFFF" : "#8A94AC", letterSpacing: "-0.01em", textShadow: on ? "0 2px 0 rgba(0,0,0,0.3)" : "none" }}>{s.l}</span>
            </div>
            {/* status */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 178, textAlign: "center", fontFamily: mono, fontWeight: 800, fontSize: 13, letterSpacing: 2, color: on ? s.h : "#5A667E" }}>{on ? "SLOT READY" : "EMPTY"}</div>
          </div>
        );
      })}

      {/* ===== running slot tally — ticks + pops as each slot ignites ===== */}
      {(() => {
        const tin = over(lf, fr(1.85), fr(0.3), Easing.out(Easing.back(1.8)));
        if (tin < 0.02) return null;
        const n = [0, 1, 2, 3].filter((i) => lit(i) > 0.5).length;
        const bump = Math.max(...[0, 1, 2, 3].map((i) => { const d = lf - fr(1.9 + i * 0.26) - 7; return d >= 0 && d < 8 ? 1 - d / 8 : 0; }));
        return (
          <div style={{ position: "absolute", left: 0, right: 0, top: PY - 52, textAlign: "center", zIndex: 22, opacity: tin, transform: `scale(${(0.85 + tin * 0.15) * (1 + bump * 0.2)})` }}>
            <span style={{ display: "inline-block", padding: "5px 18px", borderRadius: 999, background: "linear-gradient(180deg,#274a8c,#16305e)", border: "3px solid #0C1E3C", boxShadow: "0 5px 0 rgba(0,0,0,0.28)", fontFamily: mono, fontWeight: 900, fontSize: 22, letterSpacing: 2, color: n >= 4 ? "#8CF0A8" : "#BFE0FF", whiteSpace: "nowrap" }}>{n}/4 ONLINE</span>
          </div>
        );
      })()}
      {/* ===== SYSTEM ONLINE seal — the unified payoff snap ===== */}
      {done > 0.02 && (
        <>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% ${PY + PODH / 2}px, rgba(255,255,255,${Math.max(0, 1 - done) * 0.5}), rgba(255,255,255,0) 52%)`, zIndex: 24, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: PY + PODH / 2 - 36, textAlign: "center", zIndex: 26, transform: `rotate(-4deg) scale(${0.6 + done * 0.4})`, opacity: Math.min(1, done * 1.6) }}>
            <span style={{ display: "inline-block", padding: "8px 28px", borderRadius: 14, background: "linear-gradient(180deg,#4FBE7A,#2F9E5C)", border: "4px solid #1C6B3C", boxShadow: "0 8px 0 rgba(0,0,0,0.3)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: "0.01em", color: "#F1FFF4", textShadow: "0 2px 0 rgba(0,0,0,0.32)", whiteSpace: "nowrap" }}>SYSTEM ONLINE</span>
          </div>
        </>
      )}

      {/* ===== teammate cameo: FoxMon trots in at bottom-left corner (living world) ===== */}
      {foxIn > 0.01 && (
        <div style={{ position: "absolute", left: 40, top: 704 - foxIn * 14, opacity: foxIn, transform: `scale(${0.7 + foxIn * 0.3})`, transformOrigin: "50% 100%" }}>
          <FoxMon x={0} y={0} sz={84} lf={lf} />
        </div>
      )}
    </Panel>
  );
};

const R3: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= beats (scene ~4.26s) — VO-LOCKED, do not retime =================
  const cardIn = over(lf, fr(0.3), fr(0.6), Easing.out(Easing.back(1.5)));   // Pokedex MEMORY entry slides in
  const orbPop = over(lf, fr(0.55), fr(0.5), Easing.out(Easing.back(1.8)));  // brain-orb held item materialises
  const fly = over(lf, fr(1.55), fr(0.5), Easing.in(Easing.cubic));          // orb flies into the trainer (equip)
  const aura = over(lf, fr(1.9), fr(0.5));                                    // psychic equip aura ignites
  const cheer = over(lf, fr(1.9), fr(0.6), Easing.out(Easing.back(1.4)));
  const memFill = over(lf, fr(2.15), fr(1.15)) * 100;                         // MEMORY stat -> full
  const recFill = over(lf, fr(2.45), fr(1.15)) * 100;                        // RECALL stat -> full
  const memCount = Math.round(memFill);
  // stat numbers LAND with a pop as each bar tops out (was: climbed then just stopped)
  const memLand = over(lf, fr(3.18), fr(0.34));
  const recLand = over(lf, fr(3.48), fr(0.34));
  const memPop = memLand > 0.001 && memLand < 0.999 ? Math.sin(memLand * Math.PI) : 0;
  const recPop = recLand > 0.001 && recLand < 0.999 ? Math.sin(recLand * Math.PI) : 0;
  const statIn = over(lf, fr(1.95), fr(0.55), Easing.out(Easing.cubic));
  const projT = (i: number) => over(lf, fr(2.7) + i * fr(0.3), fr(0.34), Easing.out(Easing.back(1.3)));
  const projSaved = Math.min(3, [0, 1, 2].filter((i) => lf >= fr(2.7) + i * fr(0.3) + 6).length);

  // equip flash (clamped: 0 before the trigger)
  const flashO = lf < fr(1.62) ? 0 : Math.max(0, 1 - (lf - fr(1.62)) / 12);
  // PC-storage screen flash the instant the memory is withdrawn (clamped)
  const drawFlash = lf < fr(1.55) ? 0 : Math.max(0, 1 - (lf - fr(1.55)) / 16);
  const withdrawn = lf >= fr(1.55) + 6;

  // hero mascot geometry (bottom-left lane)
  const MX = 66, MY = 500, MSZ = 182;
  const mCx = MX + 92, mCy = MY + 96;

  // brain-orb flight: rest (float, out of the PC) -> chest (equip)
  const OS = 116;
  const restL = 322, restT = 188, tgtL = mCx - OS / 2, tgtT = mCy - OS / 2;
  const bob = fly < 0.02 ? Math.sin(lf / 12) * 6 : 0;
  const orbL = restL + (tgtL - restL) * fly;
  const orbT = restT + (tgtT - restT) * fly - Math.sin(fly * Math.PI) * 48 + bob;
  const orbScale = (0.66 + orbPop * 0.4) * (1 - fly * 0.5);
  const orbVis = orbPop > 0.02 && fly < 0.95 ? 1 : 0;
  // orb centre in panel coords (for the data-stream trail)
  const orbCx = orbL + OS / 2, orbCy = orbT + OS / 2;

  // ---- reusable psychic brain-orb (the MEMORY held item) ----
  const BrainOrb = (S: number, gl: number) => (
    <div style={{ width: S, height: S, position: "relative" }}>
      {gl > 0.02 && <div style={{ position: "absolute", left: -S * 0.34, top: -S * 0.34, width: S * 1.68, height: S * 1.68, borderRadius: "50%", background: "radial-gradient(circle, rgba(243,91,142,0.5), rgba(243,91,142,0) 66%)", filter: "blur(2px)", pointerEvents: "none" }} />}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 36% 30%, #FBD3E1 0%, #F573A2 46%, #E24C86 74%, #B93368 100%)", border: `${S * 0.045}px solid #8E2350`, boxShadow: "inset 0 -8px 14px rgba(120,20,60,0.4), inset 0 5px 10px rgba(255,255,255,0.4), 0 8px 18px -6px rgba(120,20,60,0.55)", overflow: "hidden" }}>
        <svg viewBox="0 0 100 100" width={S} height={S} style={{ position: "absolute", inset: 0 }}>
          {/* brain fold grooves */}
          <path d="M50 12 V88" fill="none" stroke="rgba(150,32,80,0.55)" strokeWidth={4} strokeLinecap="round" />
          <path d="M24 34 q12 -9 24 0 M52 34 q12 -9 24 0" fill="none" stroke="rgba(150,32,80,0.5)" strokeWidth={3.4} strokeLinecap="round" />
          <path d="M20 52 q14 10 30 0 M50 52 q14 10 30 0" fill="none" stroke="rgba(150,32,80,0.5)" strokeWidth={3.4} strokeLinecap="round" />
          <path d="M26 70 q11 -8 22 0 M52 70 q11 -8 22 0" fill="none" stroke="rgba(150,32,80,0.5)" strokeWidth={3.4} strokeLinecap="round" />
          <ellipse cx={37} cy={30} rx={11} ry={7} fill="rgba(255,255,255,0.32)" />
        </svg>
      </div>
    </div>
  );

  const Floppy = (c: string, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 20 20"><path d="M2.5 2 h11.5 l3.5 3.5 V17 a1 1 0 0 1 -1 1 H3.5 a1 1 0 0 1 -1 -1 V3 a1 1 0 0 1 1 -1 Z" fill={c} stroke="rgba(0,0,0,0.3)" strokeWidth={1} /><rect x={6} y={2.6} width={7} height={5} rx={0.6} fill="#EDE4D2" /><rect x={10.5} y={3.2} width={1.8} height={3.4} fill={c} /><rect x={5.5} y={10.5} width={9} height={6} rx={1} fill="#EDE4D2" /></svg>
  );
  const CheckMk = (c: string, s = 16) => (
    <svg width={s} height={s} viewBox="0 0 16 16"><path d="M3 8.5 L6.4 12 L13 4.5" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
  );

  const projects = ["landing-page", "api-server", "growth-deck"];

  // buddy Charmander does a happy hop as the memory equips
  const buddyHop = Math.max(0, Math.sin(lf * 0.5)) * 14 * cheer;

  // one storage slot (party strip inside the PC monitor)
  const Slot = (x: number, filled: React.ReactNode) => (
    <div style={{ position: "absolute", left: x, top: 92, width: 44, height: 44, borderRadius: 8, background: "linear-gradient(180deg,#0E2135,#0A1826)", border: "2px solid rgba(96,150,190,0.5)", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.5)", overflow: "hidden" }}>{filled}</div>
  );

  return (
    <Panel label="UPGRADE 1 / 4" tint="rgba(243,91,142,0.36)">
      {/* ================= DISTINCT ENVIRONMENT: the PC-STORAGE LAB ROOM ================= */}
      {/* back wall */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#15273A 0%,#1E3A54 32%,#245268 50%,#173042 68%,#0F2131 100%)" }} />
      {/* wall vertical panel seams */}
      {[150, 470, 800].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: 84, width: 3, height: 460, background: "linear-gradient(180deg,rgba(140,180,215,0.16),rgba(140,180,215,0))" }} />
      ))}
      {/* ceiling light strip + downward wash */}
      <div style={{ position: "absolute", left: 150, right: 150, top: 100, height: 12, borderRadius: 8, background: "linear-gradient(180deg,#EAF6FF,#9FD2EC)", boxShadow: "0 0 34px 8px rgba(190,230,255,0.5)" }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 108, height: 320, background: "radial-gradient(60% 78% at 50% 0%, rgba(180,220,250,0.18), transparent 70%)", pointerEvents: "none" }} />
      {/* metal wall/floor trim */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 540, height: 6, background: "linear-gradient(180deg,#63A8CC,#2C5872)", boxShadow: "0 3px 10px rgba(0,0,0,0.4)" }} />
      {/* perspective lab floor (textured: backgroundColor + backgroundImage) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 546, bottom: 0, backgroundColor: "#152A3D", backgroundImage: "repeating-linear-gradient(0deg, rgba(96,152,192,0.16) 0 2px, transparent 2px 40px), repeating-linear-gradient(90deg, rgba(96,152,192,0.12) 0 2px, transparent 2px 70px)", boxShadow: "inset 0 16px 28px rgba(0,0,0,0.42)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 546, height: 30, background: "linear-gradient(180deg,rgba(120,180,215,0.22),transparent)" }} />

      {/* left server rack (blinking) — partly behind the trainer for depth */}
      <div style={{ position: "absolute", left: 2, top: 158, width: 56, height: 372, borderRadius: 10, background: "linear-gradient(180deg,#1A2E42,#0E1B29)", border: "3px solid #0A1520", boxShadow: "6px 8px 20px -8px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.06)" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((r) => (
          <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 12 + r * 50, height: 38, borderRadius: 5, background: "#0B1826", border: "1.5px solid rgba(90,140,180,0.28)", display: "flex", alignItems: "center", gap: 5, paddingLeft: 7 }}>
            {[0, 1, 2].map((c) => {
              const on = Math.sin(lf * 0.32 + r * 1.3 + c * 2.1) > 0.1;
              const col = c === 0 ? "#4FD08A" : c === 1 ? "#F2C12C" : "#F35B8E";
              return <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: on ? col : "#233648", boxShadow: on ? `0 0 6px ${col}` : "none" }} />;
            })}
            <div style={{ marginLeft: "auto", marginRight: 6, width: 16, height: 5, borderRadius: 2, background: "rgba(96,150,190,0.4)" }} />
          </div>
        ))}
      </div>

      {/* ================= PC STORAGE MONITOR — the second brain lives here (mid-left set piece) ================= */}
      <div style={{ position: "absolute", left: 226, top: 126, width: 268, height: 150, borderRadius: 14, background: "linear-gradient(180deg,#0B1A2A,#08131F)", border: "5px solid #16324A", boxShadow: "0 12px 0 rgba(0,0,0,0.32), inset 0 0 26px rgba(0,0,0,0.6), inset 0 3px 0 rgba(120,170,210,0.14)", overflow: "hidden", opacity: orbPop > 0.02 ? 1 : Math.max(0.001, cardIn) }}>
        {/* screen inner glow + faint hex grid */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 90% at 50% 30%, rgba(64,120,168,0.30), transparent 74%)" }} />
        {/* moving scanline */}
        <div style={{ position: "absolute", left: 0, right: 0, top: `${(lf % 60) / 60 * 100}%`, height: 22, background: "linear-gradient(180deg,rgba(120,200,240,0.14),transparent)", pointerEvents: "none" }} />
        {/* header */}
        <div style={{ position: "absolute", left: 12, top: 9, right: 12, display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: Math.sin(lf * 0.5) > 0 ? "#4FD08A" : "#1C3A28", boxShadow: Math.sin(lf * 0.5) > 0 ? "0 0 6px #4FD08A" : "none" }} />
          <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 12, letterSpacing: 2, color: "#9FD2EC" }}>STORAGE SYSTEM</span>
          <span style={{ marginLeft: "auto", fontFamily: mono, fontWeight: 800, fontSize: 11, letterSpacing: 1, color: "#5E86A6" }}>~/.claude</span>
        </div>
        {/* withdraw target ring (the memory being pulled out — sits behind the orb) */}
        <div style={{ position: "absolute", left: 360 - 226 - 34, top: 190 - 126 - 34, width: 68, height: 68, borderRadius: "50%", border: "2px dashed rgba(243,91,142,0.6)", transform: `rotate(${lf * 2}deg) scale(${1 + Math.sin(lf * 0.2) * 0.06})`, boxShadow: withdrawn ? "none" : "0 0 22px rgba(243,91,142,0.45), inset 0 0 16px rgba(243,91,142,0.35)", opacity: withdrawn ? 0.25 : 1 }} />
        {/* withdraw status line */}
        <div style={{ position: "absolute", left: 14, top: 66, display: "flex", alignItems: "center", gap: 6, fontFamily: mono, fontWeight: 800, fontSize: 11, letterSpacing: 1, color: withdrawn ? "#7FF0B4" : "#F573A2" }}>
          {withdrawn ? CheckMk("#7FF0B4", 12) : <div style={{ width: 8, height: 8, borderRadius: 2, background: "#F573A2", boxShadow: "0 0 6px #F573A2" }} />}
          {withdrawn ? "WITHDREW · CLAUDE.md" : "WITHDRAW ▸ CLAUDE.md"}
        </div>
        {/* stored-team party strip: 2 real Pokemon + 3 pokeballs */}
        {Slot(8, <Pikachu x={0} y={-2} sz={40} lf={lf} />)}
        {Slot(56, <Pokeball x={7} y={7} sz={30} />)}
        {Slot(104, <Pokeball x={7} y={7} sz={30} />)}
        {Slot(152, <Pokeball x={7} y={7} sz={30} />)}
        {Slot(200, <FoxMon x={2} y={2} sz={40} lf={lf} />)}
        {/* withdraw flash on the screen */}
        {drawFlash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, rgba(255,214,230,0.85), rgba(243,91,142,0) 62%)", opacity: drawFlash, pointerEvents: "none" }} />}
      </div>
      {/* monitor stand / cable to floor */}
      <div style={{ position: "absolute", left: 352, top: 276, width: 16, height: 12, background: "#12283C" }} />
      <div style={{ position: "absolute", left: 336, top: 288, width: 48, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#1E3A54,#0E1B29)" }} />

      <SceneAtmo lf={lf} preset="psychic" />
      <PkSlug text="EQUIP: MEMORY" />

      {/* ============ psychic equip aura behind the trainer (depth wash) ============ */}
      {aura > 0.02 && (
        <div style={{ position: "absolute", left: mCx - 168, top: mCy - 168, width: 336, height: 336, borderRadius: "50%", background: `radial-gradient(circle, rgba(243,91,142,${0.42 * aura}), rgba(180,60,140,${0.14 * aura}) 46%, rgba(243,91,142,0) 72%)`, filter: "blur(4px)", pointerEvents: "none", transform: `scale(${0.9 + Math.sin(lf * 0.24) * 0.05})` }} />
      )}
      {/* orbiting memory sparks (secondary motion after equip) */}
      {aura > 0.05 && [[-104, -28, 0], [102, -6, 1.2], [-78, 86, 2.1], [86, 82, 3.2], [10, -112, 4.1], [-116, 44, 5.1]].map(([dx, dy, ph], i) => {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(lf * 0.24 + (ph as number)));
        const ss = 12 + tw * 9;
        return (
          <svg key={i} width={ss} height={ss} viewBox="0 0 20 20" style={{ position: "absolute", left: mCx + (dx as number) - ss / 2 + Math.sin(lf * 0.12 + i) * 5, top: mCy + (dy as number) - ss / 2, opacity: aura * (0.4 + 0.6 * tw), pointerEvents: "none", filter: "drop-shadow(0 1px 2px rgba(140,30,80,0.4))" }}>
            <path d="M10 1 L11.6 8.4 L19 10 L11.6 11.6 L10 19 L8.4 11.6 L1 10 L8.4 8.4 Z" fill={i % 2 ? "#FFD6E6" : "#F573A2"} />
          </svg>
        );
      })}

      {/* data-stream trail: psychic motes flowing behind the orb as it is pulled to the trainer */}
      {fly > 0.04 && fly < 0.94 && [0.18, 0.36, 0.54, 0.72].map((t, i) => {
        const px = restL + OS / 2 + (orbCx - (restL + OS / 2)) * t;
        const py = restT + OS / 2 + (orbCy - (restT + OS / 2)) * t - Math.sin(t * Math.PI) * 48;
        const s = 7 + i * 2;
        return <div key={i} style={{ position: "absolute", left: px - s / 2, top: py - s / 2, width: s, height: s, borderRadius: "50%", background: "radial-gradient(circle,#FFD6E6,#F573A2)", opacity: 0.4 + 0.5 * (1 - t), boxShadow: "0 0 8px rgba(243,91,142,0.6)", zIndex: 13 }} />;
      })}

      {/* ============ buddy Charmander watching from the lab floor (living-world cameo) ============ */}
      <div style={{ position: "absolute", left: 332, top: 600, transformOrigin: "50% 100%", transform: `translateY(${-buddyHop}px)`, zIndex: 10 }}>
        <div style={{ position: "absolute", left: 12, top: 96, width: 70, height: 15, borderRadius: "50%", background: "rgba(0,0,0,0.28)", filter: "blur(3px)" }} />
        <FireLizard x={0} y={0} sz={92} lf={lf} />
        {cheer > 0.4 && [[-14, -6, 0], [92, 4, 1.4], [40, -20, 2.6]].map(([dx, dy, ph], i) => {
          const tw = Math.abs(Math.sin(lf * 0.3 + (ph as number)));
          return <svg key={i} width={13} height={13} viewBox="0 0 20 20" style={{ position: "absolute", left: dx as number, top: dy as number, opacity: cheer * (0.4 + 0.6 * tw) }}><path d="M10 1 L11.6 8.4 L19 10 L11.6 11.6 L10 19 L8.4 11.6 L1 10 L8.4 8.4 Z" fill="#FFE08A" /></svg>;
        })}
      </div>

      {/* ============ HERO: the trainer, equipping the second-brain ============ */}
      <div style={{ position: "absolute", left: MX, top: MY, transformOrigin: "50% 100%", transform: `scale(${1 + cheer * 0.05})`, filter: aura > 0.05 ? `drop-shadow(0 0 ${5 + aura * 9}px rgba(243,91,142,0.55))` : undefined, zIndex: 12 }}>
        <Mascot lf={lf} size={MSZ} trainer={1} cheer={cheer} jump={cheer * 0.4} nodAmp={4} nodSpeed={8} />
      </div>
      {/* MEMORY EQUIPPED plate under the hero */}
      <div style={{ position: "absolute", left: MX - 6, top: MY + MSZ + 2, width: MSZ + 12, textAlign: "center", opacity: aura, transform: `translateY(${(1 - aura) * 10}px)`, zIndex: 12 }}>
        <div style={{ display: "inline-block", padding: "5px 16px", borderRadius: 11, background: "linear-gradient(180deg,#F573A2,#C43E6E)", border: "3px solid #8E2350", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#FFF1F6", textShadow: "0 1px 0 rgba(0,0,0,0.28)", boxShadow: "0 6px 0 rgba(120,20,60,0.32)" }}>MEMORY EQUIPPED</div>
      </div>

      {/* ============ the flying brain-orb held item ============ */}
      {orbVis === 1 && (
        <div style={{ position: "absolute", left: orbL, top: orbT, width: OS, height: OS, transform: `scale(${orbScale})`, transformOrigin: "50% 50%", zIndex: 14 }}>
          {BrainOrb(OS, 1)}
          {fly < 0.05 && (
            <div style={{ position: "absolute", left: "50%", top: OS + 8, transform: "translateX(-50%)", whiteSpace: "nowrap", padding: "4px 13px", borderRadius: 9, background: "linear-gradient(180deg,#2A2438,#171426)", border: "2.5px solid #F573A2", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: "#FBD3E1", boxShadow: "0 5px 0 rgba(0,0,0,0.3)" }}>SECOND BRAIN</div>
          )}
        </div>
      )}
      {/* equip flash burst at the chest */}
      {flashO > 0.01 && <div style={{ position: "absolute", left: mCx - 100, top: mCy - 100, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,214,230,0.5) 34%, rgba(255,214,230,0) 70%)", opacity: flashO, pointerEvents: "none", zIndex: 15 }} />}

      {/* ============ RIGHT COL A: Pokedex MEMORY entry card ============ */}
      <div style={{ position: "absolute", left: 494, top: 118, width: 486, opacity: cardIn, transform: `translateY(${(1 - cardIn) * -22}px) scale(${0.94 + cardIn * 0.06})`, transformOrigin: "50% 0%", zIndex: 16 }}>
        <PokedexCard x={0} y={0} w={486} no="No.002" name="MEMORY" types={["PSYCHIC"]} desc="A second brain that remembers every project and everything about you. For good.">
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>{BrainOrb(70, cardIn * 0.6)}</div>
        </PokedexCard>
      </div>

      {/* ============ RIGHT COL B: MEMORY / RECALL stat block ============ */}
      <div style={{ position: "absolute", left: 494, top: 282, width: 486, opacity: statIn, transform: `translateY(${(1 - statIn) * 16}px)`, zIndex: 16 }}>
        <div style={{ position: "relative", padding: "15px 18px 17px", borderRadius: 16, background: `linear-gradient(180deg,${PK.steel},${PK.steelDk})`, border: "3px solid #10161f", boxShadow: "0 8px 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFF1F6", letterSpacing: "-0.01em" }}>STATS</span>
            <span style={{ padding: "3px 12px", borderRadius: 999, background: "linear-gradient(180deg,#F573A2,#C43E6E)", border: "2px solid #8E2350", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 2, color: "#FFF1F6" }}>PERMANENT</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <StatBar label="MEMORY" pct={memFill} col="#F35B8E" w={370} />
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, lineHeight: 1, color: memPop > 0.05 ? "#FFF2F8" : "#F573A2", width: 56, textAlign: "right", display: "inline-block", transform: `scale(${1 + memPop * 0.55})`, transformOrigin: "100% 50%", textShadow: memPop > 0.05 ? `0 2px 0 rgba(0,0,0,0.4), 0 0 ${10 + memPop * 22}px #F573A2` : "0 2px 0 rgba(0,0,0,0.4)" }}>{memCount}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StatBar label="RECALL" pct={recFill} col="#B07BE0" w={370} />
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, lineHeight: 1, color: recPop > 0.05 ? "#F4EAFF" : "#B07BE0", width: 56, textAlign: "right", display: "inline-block", transform: `scale(${1 + recPop * 0.55})`, transformOrigin: "100% 50%", textShadow: recPop > 0.05 ? `0 2px 0 rgba(0,0,0,0.4), 0 0 ${10 + recPop * 22}px #B07BE0` : "0 2px 0 rgba(0,0,0,0.4)" }}>{Math.round(recFill)}</span>
          </div>
        </div>
      </div>

      {/* ============ RIGHT COL C: projects remembered (persist to disk) ============ */}
      <div style={{ position: "absolute", left: 494, top: 470, width: 486, zIndex: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
          <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#DFF4E4", textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}>PROJECTS SAVED</span>
          <span style={{ padding: "2px 11px", borderRadius: 999, background: "#1C6B43", border: "2px solid #4FD08A", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 1, color: "#C9F5DC" }}>{projSaved}/3</span>
        </div>
        {projects.map((p, i) => {
          const on = projT(i) > 0.5;
          return (
            <div key={i} style={{ height: 58, marginBottom: 10, opacity: Math.max(0.001, projT(i)), transform: `translateX(${(1 - projT(i)) * 26}px)`, display: "flex", alignItems: "center", gap: 12, padding: "0 15px", borderRadius: 12, background: "linear-gradient(180deg,#26467F,#152C56)", border: `3px solid ${on ? "#4FD08A" : "#12274E"}`, boxShadow: on ? "0 5px 0 rgba(0,0,0,0.24), 0 0 20px rgba(63,169,111,0.4)" : "0 5px 0 rgba(0,0,0,0.24)" }}>
              {Floppy("#F2B21C", 26)}
              <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 20, color: "#EEF4FE" }}>{p}</span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: on ? "#1C6B43" : "rgba(11,22,44,0.7)", border: `2px solid ${on ? "#4FD08A" : "rgba(120,150,210,0.32)"}`, fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 1, color: on ? "#C9F5DC" : "#7E93B8" }}>
                {on && CheckMk("#7FF0B4", 14)}{on ? "SAVED" : "..."}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============ evolution glow pulse at the equip beat ============ */}
      <EvoGlow p={flashO * 0.55} />
    </Panel>
  );
};

const R4: React.FC<{ lf: number }> = ({ lf }) => {
  // wire hub origin (trainer's outreached hand)
  const ox = 238, oy = 402;
  const nodes = [
    { key: "filesystem", sub: "read + write your files", cy: 166 },
    { key: "github", sub: "opens its own PRs", cy: 316 },
    { key: "chrome", sub: "drives your browser", cy: 466 },
  ];
  const nx = 592; // node chip left edge (wire target x)

  // node + wire reveals (staggered) — VO-locked beats preserved
  const nodeP = (i: number) => over(lf, fr(0.45 + i * 0.55), fr(0.55), Easing.out(Easing.back(1.5)));
  const nodeO = (i: number) => over(lf, fr(0.45 + i * 0.55), fr(0.32));
  const wireP = (i: number) => over(lf, fr(0.68 + i * 0.55), fr(0.5), Easing.out(Easing.cubic));
  // ---- mid-scene "SYSTEM LIVE" surge — fills the ~1.85-3.3s plateau with a real event ----
  const surge = Math.max(0, over(lf, fr(2.35), fr(0.4)) - over(lf, fr(2.95), fr(0.55)));
  // per-node connect pop (a discrete hit as each node locks in, instead of a silent slide)
  const lockPop = (i: number) => Math.max(0, over(lf, fr(0.78 + i * 0.55), fr(0.12)) - over(lf, fr(0.94 + i * 0.55), fr(0.3)));

  // climax: tool not found -> writes its own move
  const aIn = over(lf, fr(3.3), fr(0.22));
  const aOut = over(lf, fr(4.02), fr(0.35));
  const alertO = aIn * (1 - aOut);
  const writeP = over(lf, fr(3.98), fr(0.72), Easing.out(Easing.back(1.28)));
  const writeO = over(lf, fr(3.98), fr(0.4));
  const glowP = Math.max(0, over(lf, fr(3.9), fr(0.38)) - over(lf, fr(4.5), fr(0.7)));

  // trainer reaction
  const jb = over(lf, fr(4.02), fr(0.26)) - over(lf, fr(4.3), fr(0.32));
  const jump = Math.max(0, jb);
  const cheer = over(lf, fr(4.15), fr(0.5));
  const gaze = 3 - over(lf, fr(3.9), fr(0.5)) * 3;

  const diskRot = lf * 5;

  // ambient motion helpers
  const bob = (spd: number, amp: number, ph = 0) => Math.sin(lf / spd + ph) * amp;
  // steel-forge burst at the TM machine when the move is written (clamped flash)
  const forge = lf < fr(3.98) ? 0 : Math.max(0, over(lf, fr(3.98), fr(0.2)) - over(lf, fr(4.24), fr(0.42)));
  // hit flash when the move card locks
  const lockFlash = lf < fr(4.14) ? 0 : Math.max(0, over(lf, fr(4.14), fr(0.12)) - over(lf, fr(4.28), fr(0.34)));

  const nodeIcon = (k: string) => {
    if (k === "filesystem") return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        <rect x={9} y={7} width={22} height={28} rx={3} fill="#DCE6F2" stroke="#0E1626" strokeWidth={2.4} />
        <rect x={16} y={12} width={22} height={28} rx={3} fill="#F4F8FF" stroke="#0E1626" strokeWidth={2.4} />
        <rect x={20} y={19} width={14} height={2.6} rx={1.3} fill="#7B8AA0" />
        <rect x={20} y={25} width={14} height={2.6} rx={1.3} fill="#7B8AA0" />
        <rect x={20} y={31} width={9} height={2.6} rx={1.3} fill="#7B8AA0" />
      </svg>
    );
    if (k === "github") return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        {[[9, 8], [26, 8], [9, 25], [26, 25]].map(([x, y], j) => (
          <rect key={j} x={x} y={y} width={12} height={12} rx={3} fill={j % 2 ? "#F4F8FF" : "#B9C6DA"} stroke="#0E1626" strokeWidth={2.2} />
        ))}
      </svg>
    );
    return (
      <svg width={46} height={46} viewBox="0 0 46 46">
        <circle cx={23} cy={23} r={15} fill="#DCE6F2" stroke="#0E1626" strokeWidth={2.4} />
        <ellipse cx={23} cy={23} rx={7} ry={15} fill="none" stroke="#0E1626" strokeWidth={2} />
        <line x1={8} y1={23} x2={38} y2={23} stroke="#0E1626" strokeWidth={2} />
        <line x1={11} y1={15} x2={35} y2={15} stroke="#0E1626" strokeWidth={1.6} />
        <line x1={11} y1={31} x2={35} y2={31} stroke="#0E1626" strokeWidth={1.6} />
      </svg>
    );
  };

  // ===== recognizable STEEL-type helper: MAGNEMITE (floating conduit connector) =====
  const Magnemite = (mx: number, my: number, msz: number, ph: number) => {
    const fl = bob(11, 6, ph);
    const rot = Math.sin(lf / 16 + ph) * 5;
    const uid = `mg${Math.round(mx)}`;
    const screw = (sx: number, sy: number) => (
      <g>
        <circle cx={sx} cy={sy} r={4.4} fill="#C6CEDA" stroke="#0E1626" strokeWidth={1.6} />
        <line x1={sx - 2.6} y1={sy} x2={sx + 2.6} y2={sy} stroke="#0E1626" strokeWidth={1.4} />
      </g>
    );
    const magnet = (mirror: boolean) => (
      <g transform={mirror ? "translate(100,0) scale(-1,1)" : undefined}>
        <path d="M32 34 L12 34 Q3 34 3 43 L3 57 Q3 66 12 66 L32 66" fill="none" stroke="#0E1626" strokeWidth={13} strokeLinecap="round" />
        <path d="M32 34 L12 34 Q3 34 3 43 L3 57 Q3 66 12 66 L32 66" fill="none" stroke="#AEB6C4" strokeWidth={9} strokeLinecap="round" />
        <rect x={22} y={29} width={13} height={9} rx={2} fill="#E24B3A" stroke="#0E1626" strokeWidth={1.4} />
        <rect x={22} y={62} width={13} height={9} rx={2} fill="#3F73D8" stroke="#0E1626" strokeWidth={1.4} />
      </g>
    );
    return (
      <svg key={uid} width={msz} height={msz} viewBox="0 0 100 100" style={{ position: "absolute", left: mx, top: my + fl, overflow: "visible", filter: "drop-shadow(0 9px 11px rgba(0,0,0,0.45))", transform: `rotate(${rot}deg)` }}>
        <defs>
          <radialGradient id={uid} cx="40%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#E7ECF4" />
            <stop offset="52%" stopColor="#B4BDCB" />
            <stop offset="100%" stopColor="#7E8798" />
          </radialGradient>
        </defs>
        {magnet(false)}
        {magnet(true)}
        <circle cx={50} cy={50} r={25} fill={`url(#${uid})`} stroke="#0E1626" strokeWidth={2.6} />
        {screw(40, 30)}
        {screw(60, 30)}
        {screw(50, 74)}
        <ellipse cx={50} cy={51} rx={13.5} ry={14.5} fill="#F4F7FB" stroke="#0E1626" strokeWidth={2.2} />
        <circle cx={50} cy={53} r={7.4} fill="#1A2230" />
        <circle cx={53} cy={49.5} r={2.6} fill="#FFFFFF" />
      </svg>
    );
  };

  return (
    <Panel label="claude · mcp servers" tint="rgba(70,92,132,0.30)">
      {/* ===== DISTINCT BACKDROP: a STEEL connection-hub cavern (server-cave), layered depth ===== */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#203251 0%,#16233A 46%,#0E1728 78%,#0A1120 100%)" }} />
      {/* deep glow from the hub core */}
      <div style={{ position: "absolute", left: ox - 300, top: oy - 300, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(96,160,235,0.22),rgba(96,160,235,0) 66%)" }} />
      {/* circuit-grid wash (textured: backgroundColor + backgroundImage) */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.34, backgroundColor: "#132038", backgroundImage: "repeating-linear-gradient(0deg,rgba(120,170,230,0.16) 0 1px,transparent 1px 46px), repeating-linear-gradient(90deg,rgba(120,170,230,0.16) 0 1px,transparent 1px 46px)" }} />
      {/* glowing energy veins in the rock */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
        {[["M0 120 Q160 90 250 190 T560 210", 0], ["M1012 250 Q880 300 800 210 T560 250", 1.4], ["M60 700 Q220 640 360 690 T700 660", 2.6]].map(([d, ph], i) => (
          <path key={i} d={d as string} fill="none" stroke="#3E7FC4" strokeWidth={3} strokeLinecap="round" opacity={0.5 + 0.4 * (0.5 + 0.5 * Math.sin(lf / 12 + (ph as number)))} style={{ filter: "drop-shadow(0 0 6px rgba(90,160,240,0.7))" }} />
        ))}
      </svg>
      {/* ceiling stalactites (side-hung so they clear the centre slug) */}
      {[[26, 40, 150], [104, 30, 108], [852, 34, 128], [936, 44, 168]].map(([x, w, h], i) => (
        <div key={i} style={{ position: "absolute", left: x as number, top: -6, width: w as number, height: h as number, background: "linear-gradient(180deg,#2C3C5A,#17233A)", clipPath: "polygon(0 0,100% 0,50% 100%)", boxShadow: "inset 3px 0 0 rgba(150,180,225,0.18)" }} />
      ))}
      {/* wall steel conduit pipes (depth, left + right) */}
      {[[18, "#33456A"], [1012 - 30, "#2A3A5C"]].map(([x, c], i) => (
        <div key={i} style={{ position: "absolute", left: x as number, top: 110, width: 12, height: 470, borderRadius: 8, background: `linear-gradient(90deg,${c as string},#101A2C)`, boxShadow: "inset 2px 0 0 rgba(150,180,225,0.25), 0 0 10px rgba(0,0,0,0.4)" }} />
      ))}
      {/* floating energy motes */}
      {[[150, 240, 9, 0], [470, 180, 5.6], [720, 300, 8, 2], [560, 560, 4.4, 3], [880, 470, 6, 4]].map(([x, y, spd, ph], i) => (
        <div key={i} style={{ position: "absolute", left: (x as number) + bob(spd as number, 16, (ph as number) || 0), top: (y as number) + bob((spd as number) * 1.3, 22, (ph as number) || 1), width: 6, height: 6, borderRadius: "50%", background: "#9FD0FF", boxShadow: "0 0 10px rgba(120,190,255,0.9)" }} />
      ))}
      {/* reflective steel floor slab + perspective grid */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 172, background: "linear-gradient(180deg,#1B2B48 0%,#14203A 40%,#0C1526 100%)", boxShadow: "inset 0 10px 0 rgba(140,175,225,0.16)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 172, opacity: 0.5, backgroundColor: "transparent", backgroundImage: "repeating-linear-gradient(90deg,rgba(120,170,230,0.24) 0 1px,transparent 1px 64px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 168, height: 6, background: "linear-gradient(180deg,rgba(150,200,255,0.55),rgba(150,200,255,0))" }} />
      {/* hub pedestal disc under the trainer/wire origin */}
      <div style={{ position: "absolute", left: ox - 130, top: oy + 92, width: 260, height: 70, borderRadius: "50%", background: "radial-gradient(circle at 50% 40%,#2C4066,#101B30 72%)", border: "3px solid #0C1526", boxShadow: "0 0 26px rgba(70,130,210,0.4), inset 0 4px 0 rgba(150,185,235,0.2)" }} />
      {/* vignette depth */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 170px rgba(4,8,18,0.6)" }} />

      <SceneAtmo lf={lf} preset="tech" />
      <PkSlug text="UPGRADE 2 : MCP" />

      {/* STEEL type tag under the slug */}
      <div style={{ position: "absolute", left: "50%", top: 84, transform: "translateX(-50%)" }}>
        <TypeBadge t="STEEL" sz={1.15} />
      </div>

      {/* connection wires (steel conduits carrying energy) */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
        <defs>
          <radialGradient id="r4hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(160,210,255,0.95)" />
            <stop offset="100%" stopColor="rgba(160,210,255,0)" />
          </radialGradient>
        </defs>
        <circle cx={ox} cy={oy} r={(30 + Math.sin(lf / 7) * 3) * (1 + surge * 0.6)} fill="url(#r4hub)" />
        {/* the whole system goes live: a wavefront rips out from the hub */}
        {surge > 0.02 && <circle cx={ox} cy={oy} r={26 + surge * 210} fill="none" stroke="#7FD4FF" strokeWidth={Math.max(0.6, 5 * (1 - surge))} opacity={(1 - surge) * 0.85} />}
        {surge > 0.02 && <circle cx={ox} cy={oy} r={26 + surge * 130} fill="none" stroke="#BFE8FF" strokeWidth={Math.max(0.4, 3 * (1 - surge))} opacity={(1 - surge) * 0.55} />}
        {nodes.map((n, i) => {
          const wp = wireP(i);
          const ex = ox + (nx - ox) * wp;
          const ey = oy + (n.cy - oy) * wp;
          // multiple travelling energy pulses per wire
          return (
            <g key={n.key}>
              <line x1={ox} y1={oy} x2={ex} y2={ey} stroke="#0B1424" strokeWidth={9} strokeLinecap="round" opacity={0.5} />
              <line x1={ox} y1={oy} x2={ex} y2={ey} stroke="#2E4E7C" strokeWidth={6} strokeLinecap="round" />
              <line x1={ox} y1={oy} x2={ex} y2={ey} stroke="#8FC4F2" strokeWidth={2.6} strokeLinecap="round" />
              {wp > 0.9 && [0, 0.5].map((o, k) => {
                const tv = (lf * 0.03 + i * 0.34 + o) % 1;
                const pxx = ox + (nx - ox) * tv, pyy = oy + (n.cy - oy) * tv;
                return <circle key={k} cx={pxx} cy={pyy} r={5} fill="#EAF6FF" style={{ filter: "drop-shadow(0 0 6px rgba(160,215,255,0.95))" }} />;
              })}
            </g>
          );
        })}
        <circle cx={ox} cy={oy} r={11 * (1 + surge * 0.55)} fill="#EAF4FF" stroke="#0B1424" strokeWidth={3} />
      </svg>

      {/* MAGNEMITE conduit-connectors riding the lower two wires (clear of alert + card) */}
      {Magnemite(360, 306, 80, 0)}
      {Magnemite(392, 410, 80, 1.7)}

      {/* Claude Trainer hero */}
      <div style={{ position: "absolute", left: 56, top: 300 }}>
        <Mascot lf={lf} size={176} trainer={1} gaze={gaze} cheer={cheer} jump={jump} nodAmp={4} nodSpeed={8} />
      </div>
      {/* trainer status plate */}
      <div style={{ position: "absolute", left: 66, top: 492, display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 12, background: "linear-gradient(180deg,#33405C,#212B3E)", border: "3px solid #10161f", boxShadow: "0 7px 0 rgba(0,0,0,0.24), inset 0 2px 0 rgba(255,255,255,0.14)" }}>
        <div style={{ width: 13, height: 13, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#8FE7B0,#2E9E5E)", boxShadow: "0 0 8px rgba(90,220,150,0.8)" }} />
        <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 18, letterSpacing: 1.5, color: "#E7EEFA" }}>MCP · 3 SERVERS</span>
      </div>

      {/* PIKACHU companion powering the hub (bottom-left, on the floor) */}
      <Pikachu x={62} y={598} sz={92} lf={lf} />
      {/* pika spark crackle above its head (flickers, solid when on) */}
      {(Math.sin(lf / 3.3) > 0.3 ? 1 : 0) === 1 && (
        <svg width={120} height={92} viewBox="0 0 120 92" style={{ position: "absolute", left: 84, top: 540, pointerEvents: "none", overflow: "visible" }}>
          <path d="M40 80 L30 46 L48 50 L34 14" fill="none" stroke="#F7E24A" strokeWidth={4.6} strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 7px rgba(247,220,74,0.9))" }} />
          <path d="M78 76 L90 44 L74 42 L88 12" fill="none" stroke="#FFF3B0" strokeWidth={3.6} strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(247,220,74,0.85))" }} />
        </svg>
      )}

      {/* three connection nodes (the world it reaches) */}
      {nodes.map((n, i) => (
        <div key={n.key} style={{ position: "absolute", left: 590, top: n.cy - 48, width: 384, height: 96, opacity: nodeO(i), transform: `translateX(${(1 - nodeP(i)) * 46}px) scale(${0.82 + nodeP(i) * 0.18})`, transformOrigin: "0% 50%", borderRadius: 16, background: "linear-gradient(180deg,#3B4A66,#232E42)", border: "4px solid #10161f", boxShadow: "0 9px 0 rgba(0,0,0,0.26), inset 0 3px 0 rgba(255,255,255,0.16)", display: "flex", alignItems: "center", gap: 14, padding: "0 16px" }}>
          <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: 12, background: "radial-gradient(circle at 45% 38%,#EAF4FF,#B7C8DE)", border: "3px solid #10161f", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {nodeIcon(n.key)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, lineHeight: 1, color: "#FFF6EE", letterSpacing: "-0.01em" }}>{n.key}</div>
            <div style={{ marginTop: 5, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 16, color: "#AFC0D8" }}>{n.sub}</div>
          </div>
          <div style={{ marginLeft: "auto", width: 15, height: 15, borderRadius: "50%", background: nodeP(i) > 0.85 ? "radial-gradient(circle at 40% 35%,#8FE7B0,#2E9E5E)" : "#3A4560", border: "2px solid #10161f", boxShadow: nodeP(i) > 0.85 ? "0 0 9px rgba(90,220,150,0.8)" : "none" }} />
        </div>
      ))}

      {/* "no tool found" alert flashes in the gap */}
      <div style={{ position: "absolute", left: 300, top: 250, opacity: alertO, transform: `translateY(${(1 - aIn) * 14}px) rotate(-3deg)`, padding: "7px 16px", borderRadius: 11, background: "linear-gradient(180deg,#E86A2C,#C4451B)", border: "3px solid #7E2A10", boxShadow: "0 7px 0 rgba(0,0,0,0.24)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFF3E4", textShadow: "0 1px 0 rgba(0,0,0,0.35)", whiteSpace: "nowrap" }}>NO MCP FOR THAT</div>

      {/* CLIMAX: it writes its own move — self-written MOVE / TM card materializes */}
      <div style={{ position: "absolute", left: 300, top: 528, width: 680, opacity: writeO, transform: `translateY(${(1 - writeP) * 34}px) scale(${0.78 + writeP * 0.22})`, transformOrigin: "50% 100%", borderRadius: 20, background: "linear-gradient(180deg,#384663,#1E2A3B)", border: "5px solid #0E1626", boxShadow: "0 13px 0 rgba(0,0,0,0.3), inset 0 3px 0 rgba(255,255,255,0.16)", padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
        {/* forge spark burst behind the TM disk */}
        {forge > 0.01 && <div style={{ position: "absolute", left: 24, top: 12, width: 108, height: 108, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,246,220,0.95),rgba(255,196,90,0.4) 46%,rgba(255,196,90,0) 72%)", opacity: forge, pointerEvents: "none" }} />}
        {/* spinning TM disk */}
        <div style={{ width: 108, height: 108, flexShrink: 0, borderRadius: "50%", background: "conic-gradient(from 0deg,#8FA0BC,#DCE6F2,#7B8AA0,#B9C6DA,#8FA0BC)", border: "5px solid #0E1626", boxShadow: "inset 0 0 0 5px #C6D2E2, 0 6px 12px -4px rgba(0,0,0,0.5)", position: "relative", transform: `rotate(${diskRot}deg)` }}>
          <div style={{ position: "absolute", inset: 22, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%,#4C5B78,#232E42)", border: "3px solid #0E1626", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#EAF4FF", transform: `rotate(${-diskRot}deg)`, textShadow: "0 2px 0 rgba(0,0,0,0.5)" }}>TM</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#9FE7C4" }}>MOVE TUTOR</div>
          <div style={{ marginTop: 2, display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, lineHeight: 1, color: "#FFF6EE", letterSpacing: "-0.015em" }}>SELF-WRITTEN MOVE</span>
          </div>
          <div style={{ marginTop: 9, display: "flex", alignItems: "center", gap: 10 }}>
            <TypeBadge t="STEEL" sz={1} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: "#C7D4E6" }}>Tool didn't exist, so it forged one.</span>
          </div>
        </div>
      </div>

      {/* hit flash when the move locks in */}
      {lockFlash > 0.01 && <div style={{ position: "absolute", left: 300, top: 500, width: 680, height: 210, borderRadius: 24, background: "radial-gradient(circle at 22% 55%,rgba(255,255,255,0.9),rgba(255,255,255,0) 60%)", opacity: lockFlash, pointerEvents: "none" }} />}

      <EvoGlow p={glowP} />
    </Panel>
  );
};

const R5: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- entrance beats (VO-LOCKED - unchanged) ----
  const cardA = over(lf, fr(0.3), fr(0.6), Easing.out(Easing.back(1.15)));
  const cardB = over(lf, fr(0.55), fr(0.6), Easing.out(Easing.back(1.15)));
  const leadIn = over(lf, fr(0.7), fr(0.5), Easing.out(Easing.back(1.6)));
  const hdrA = over(lf, fr(0.5), fr(0.45), Easing.out(Easing.back(1.3)));
  const hdrB = over(lf, fr(0.75), fr(0.45), Easing.out(Easing.back(1.3)));

  // ---- LEFT ZONE: 1 lead -> 20 specialists (4 real Pokemon + 16 bench balls) ----
  const leadCx = 234, leadCy = 220;
  // ---- deploy peak: THUNDERBOLT shockwave as the 20th specialist lands (was: fan-out finished silently) ----
  const boltHit = over(lf, fr(2.35), fr(0.55));
  // deploy timing shared across all 20 (index i: 0-3 = hero sprites, 4-19 = bench balls)
  const depLife = (i: number) => over(lf, fr(1.1) + i * fr(0.05), fr(0.5), Easing.out(Easing.back(1.4)));
  const HEROES = [
    { C: Pikachu, role: "CODER", type: "ELECTRIC", col: "#F2C12C", move: "THUNDERBOLT" },
    { C: FireLizard, role: "TESTER", type: "FIRE", col: "#F0803C", move: "FLAMETHROWER" },
    { C: GhostMon, role: "SEARCH", type: "GHOST", col: "#7C63E8", move: "SHADOW BALL" },
    { C: FoxMon, role: "REVIEW", type: "NORMAL", col: "#9AA06E", move: "SWIFT" },
  ];
  const SPSZ = 72;
  const heroSlotX = (i: number) => 30 + i * 112 + 36; // center x within left card
  const heroSlotY = 424;                              // center y (battle line)
  const heroAtk = (i: number) => {
    if (depLife(i) < 0.85) return 0;
    const ph = (lf * 0.024 + i * 0.25) % 1;
    return ph < 0.3 ? Math.sin((ph / 0.3) * Math.PI) : 0;
  };
  // pick the loudest current attacker for the move-name banner
  let atkTop = 0, atkIdx = 0;
  HEROES.forEach((_, i) => { const a = heroAtk(i); if (a > atkTop) { atkTop = a; atkIdx = i; } });
  const HUES = ["#F35B8E", "#F0803C", "#4C90F0", "#5AC85A", "#F2C12C", "#7C63E8", "#4C90F0", "#F0803C"];
  const benchX = (k: number) => 28 + (k % 8) * 54;
  const benchY = (k: number) => 300 + Math.floor(k / 8) * 34;

  // ---- RIGHT ZONE: self-fixing LOOP (Pokemon Center) - loop math UNCHANGED ----
  const period = fr(2.4);
  const bt = Math.max(0, lf - fr(1.4));
  const bp = (bt % period) / period;
  const cx = 218, cy = 320, R = 150;
  const a = Math.PI / 2 + bp * Math.PI * 2;
  const bx = cx + Math.cos(a) * R;
  const by = cy + Math.sin(a) * R;
  const fixed = bp >= 0.5;
  const heal = bp > 0.44 && bp < 0.58 ? Math.max(0, 1 - Math.abs(bp - 0.5) / 0.07) : 0;
  const fixes = Math.min(99, Math.max(0, Math.floor(bt / period + 0.5)));
  const dash = -((lf * 2) % 40);
  const bugSpin = Math.sin(lf * 0.2) * 10 + (fixed ? 0 : 0);
  const healPulse = 0.5 + Math.abs(Math.sin(lf * 0.18)) * 0.5;

  return (
    <Panel label="claude · subagents" tint="rgba(76,144,240,0.34)">
      {/* ============ DISTINCT BG: night BATTLE STADIUM (not the plain route) ============ */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#101E3A 0%,#132548 42%,#0E1A34 78%,#0A1428 100%)" }} />
      {/* stadium floodlight beams (bg depth wash only) */}
      {[[150, "-24deg"], [862, "24deg"]].map(([lx, rot], i) => (
        <div key={i} style={{ position: "absolute", left: lx as number, top: -40, width: 300, height: 560, background: "linear-gradient(180deg, rgba(150,190,255,0.16), rgba(150,190,255,0) 72%)", clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", transform: `rotate(${rot})`, transformOrigin: "50% 0%" }} />
      ))}
      {/* twin floodlight rigs */}
      {[150, 862].map((lx, i) => (
        <div key={i} style={{ position: "absolute", left: lx - 30, top: -6, width: 60, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#243858,#1A2740)", border: "2px solid #0A1428", display: "flex", gap: 3, padding: 3, boxSizing: "border-box" }}>
          {[0, 1, 2, 3].map((k) => <div key={k} style={{ flex: 1, borderRadius: 2, background: "radial-gradient(circle,#FFF7D8,#E9CE7A)", boxShadow: "0 0 8px rgba(255,240,180,0.7)" }} />)}
        </div>
      ))}
      {/* distant crowd tiers (textured dot band - backgroundColor + backgroundImage) */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 92, height: 108, borderRadius: "50% 50% 0 0 / 100% 100% 0 0", backgroundColor: "#182A4E", backgroundImage: "radial-gradient(rgba(180,205,255,0.20) 2px, transparent 2.4px)", backgroundSize: "15px 15px", boxShadow: "inset 0 -18px 26px rgba(8,14,30,0.6)" }} />
      {/* arena floor sheen */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: "linear-gradient(180deg, rgba(70,110,180,0) 0%, rgba(50,86,150,0.30) 100%)" }} />

      <SceneAtmo lf={lf} preset="team" />
      <PkSlug text="TEAM + AUTO-FIX" />

      {/* ================= LEFT ZONE: LEAD + 20 SPECIALISTS ================= */}
      <div style={{ position: "absolute", left: 36, top: 120, width: 468, height: 600, borderRadius: 24, background: `linear-gradient(180deg,${PK.steel},${PK.steelDk})`, border: "4px solid #10161f", boxShadow: "0 16px 34px -14px rgba(8,12,26,0.7), inset 0 3px 0 rgba(255,255,255,0.08)", opacity: cardA, transform: `translateY(${(1 - cardA) * 30}px)`, overflow: "hidden" }}>
        {/* --- interior battle-arena detailing --- */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: "linear-gradient(180deg,#25406E,#182B4C)", boxShadow: "inset 0 10px 24px rgba(6,12,26,0.5)" }} />
        {/* painted battle-field circle + divider (iconic Pokemon field) */}
        <svg width={468} height={600} viewBox="0 0 468 600" style={{ position: "absolute", left: 0, top: 0 }}>
          <ellipse cx={234} cy={470} rx={196} ry={54} fill="none" stroke="rgba(150,190,255,0.30)" strokeWidth={4} />
          <ellipse cx={234} cy={470} rx={128} ry={34} fill="none" stroke="rgba(150,190,255,0.22)" strokeWidth={3} />
          <line x1={38} y1={470} x2={430} y2={470} stroke="rgba(150,190,255,0.28)" strokeWidth={3} strokeDasharray="10 10" />
        </svg>
        {/* header chip */}
        <div style={{ position: "absolute", left: "50%", top: 20, transform: `translateX(-50%) scale(${0.9 + hdrA * 0.1})`, opacity: hdrA, padding: "6px 18px", borderRadius: 999, background: "linear-gradient(180deg,#274a8c,#16305e)", border: "3px solid #0C1E3C", boxShadow: "0 5px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.14)", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 1.5, color: "#BFE0FF", whiteSpace: "nowrap" }}>1 OPUS&nbsp;&nbsp;→&nbsp;&nbsp;20 HAIKUS</div>

        {/* command pulse rings behind the lead (bg depth wash) */}
        {[0, 1, 2].map((k) => {
          const cyc = ((lf * 0.02 + k * 0.34) % 1);
          const rad = 40 + cyc * 96;
          return <div key={k} style={{ position: "absolute", left: leadCx - rad, top: leadCy - rad, width: rad * 2, height: rad * 2, borderRadius: "50%", border: "2px solid rgba(120,175,255,0.30)", opacity: (1 - cyc) * 0.6 * leadIn, pointerEvents: "none" }} />;
        })}

        {/* LEAD trainer platform */}
        {/* THUNDERBOLT shockwave — the deploy peak */}
        {boltHit > 0.02 && boltHit < 0.999 && (
          <>
            <div style={{ position: "absolute", left: leadCx - 210, top: leadCy - 210, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,240,150,${Math.max(0, 1 - boltHit) * Math.abs(Math.sin(boltHit * Math.PI * 3)) * 0.5}), rgba(255,240,150,0) 62%)`, pointerEvents: "none", zIndex: 18 }} />
            <div style={{ position: "absolute", left: leadCx - (24 + boltHit * 250), top: leadCy - (24 + boltHit * 250), width: (24 + boltHit * 250) * 2, height: (24 + boltHit * 250) * 2, borderRadius: "50%", border: `${Math.max(1, 6 * (1 - boltHit))}px solid #FFE85A`, opacity: (1 - boltHit) * 0.9, pointerEvents: "none", zIndex: 19 }} />
          </>
        )}
        <div style={{ position: "absolute", left: leadCx - 66, top: 268, width: 132, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, #3A5B94, #1C3056)", border: "2px solid #10203C", opacity: leadIn }} />
        {/* LEAD Claude trainer, commanding */}
        <div style={{ position: "absolute", left: 169, top: 150, opacity: leadIn, transform: `scale(${leadIn})`, transformOrigin: "50% 100%" }}>
          <Mascot lf={lf} size={130} trainer={1} cheer={0.55 + Math.sin(lf * 0.11) * 0.18} nodAmp={3} nodSpeed={11} />
        </div>
        {/* command baton arc when squad deploys */}
        {(() => { const g = over(lf, fr(1.0), fr(0.4)); if (g <= 0.01) return null; const sw = 0.5 + Math.abs(Math.sin(lf * 0.14)) * 0.5; return (
          <svg width={468} height={600} viewBox="0 0 468 600" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
            <path d="M234 250 Q234 330 234 400" stroke="rgba(140,240,192,0.0)" strokeWidth={0} fill="none" />
            {HEROES.map((_, i) => <path key={i} d={`M${leadCx} 244 Q${(leadCx + heroSlotX(i)) / 2} 330 ${heroSlotX(i)} ${heroSlotY - 30}`} stroke={`rgba(140,200,255,${0.22 * g * sw})`} strokeWidth={3} fill="none" strokeDasharray="6 8" strokeDashoffset={-(lf * 2) % 28} strokeLinecap="round" />)}
          </svg>
        ); })()}
        {/* LEAD badge under trainer */}
        <div style={{ position: "absolute", left: "50%", top: 286, transform: "translateX(-50%)", zIndex: 24, opacity: leadIn, padding: "3px 14px", borderRadius: 8, background: "linear-gradient(180deg,#123C2A,#0C2A1D)", border: "2px solid #1C5B41", boxShadow: "0 3px 0 rgba(0,0,0,0.35)", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 2, color: "#7FE3B4", whiteSpace: "nowrap" }}>OPUS 4.8</div>

        {/* --- 16 bench pokeballs (specialists 5-20) fan out into a back row --- */}
        {Array.from({ length: 16 }, (_, k) => {
          const gi = k + 4;
          const life = depLife(gi);
          if (life <= 0.01) return null;
          const tx = benchX(k), ty = benchY(k);
          const px = leadCx + (tx - leadCx) * life;
          const py = leadCy + (ty - leadCy) * life;
          const wob = life > 0.85 ? ((lf + k * 9) % 48) / 48 : 0;
          return (
            <div key={k} style={{ position: "absolute", left: px - 12, top: py - 12, width: 24, height: 24, opacity: life, transform: `scale(${0.5 + life * 0.5})`, transformOrigin: "50% 50%" }}>
              <div style={{ position: "absolute", left: 3, top: 22, width: 18, height: 5, borderRadius: "50%", background: "rgba(0,0,0,0.3)", filter: "blur(1px)" }} />
              <Pokeball x={0} y={0} sz={24} wobble={wob} hue={HUES[k % HUES.length]} />
            </div>
          );
        })}

        {/* --- 4 REAL Pokemon front line (specialists 1-4), mid-attack --- */}
        {HEROES.map((h, i) => {
          const life = depLife(i);
          if (life <= 0.01) return null;
          const tx = heroSlotX(i), ty = heroSlotY;
          const px = leadCx + (tx - leadCx) * life;
          const py = leadCy + (ty - leadCy) * life;
          const sc = 0.42 + life * 0.58;
          const atk = heroAtk(i);
          const HC = h.C;
          return (
            <div key={i} style={{ position: "absolute", left: px - SPSZ / 2, top: py - SPSZ * 0.62, width: SPSZ, height: SPSZ * 1.14, opacity: life, transform: `scale(${sc}) translateY(${atk * -3}px)`, transformOrigin: "50% 100%" }}>
              {/* battle-platform shadow */}
              <div style={{ position: "absolute", left: SPSZ * 0.1, top: SPSZ * 0.94, width: SPSZ * 0.8, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.34)", filter: "blur(1.5px)" }} />
              {/* ATTACK FX by type */}
              {atk > 0.06 && i === 0 && (
                <svg width={SPSZ} height={SPSZ} viewBox="0 0 72 72" style={{ position: "absolute", left: 0, top: -SPSZ * 0.5, overflow: "visible", opacity: Math.min(1, atk * 1.4) }}>
                  {[-22, 0, 22].map((dx, k) => <path key={k} d={`M${36 + dx} 30 L${30 + dx} 16 L${38 + dx} 16 L${28 + dx} -2`} stroke="#FFE85A" strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px #F2C12C)" }} />)}
                  <circle cx={36} cy={30} r={10 + atk * 12} fill="none" stroke="#FFF3A6" strokeWidth={3} opacity={1 - atk} />
                </svg>
              )}
              {atk > 0.06 && i === 1 && (
                <svg width={SPSZ} height={SPSZ} viewBox="0 0 72 72" style={{ position: "absolute", left: 0, top: -SPSZ * 0.5, overflow: "visible", opacity: Math.min(1, atk * 1.4) }}>
                  {[0, 1, 2, 3, 4, 5].map((k) => { const ang = -1.5 + k * 0.32; const d = 8 + atk * 30; return <circle key={k} cx={36 + Math.cos(ang) * d} cy={34 - Math.sin(ang) * d} r={5 - k * 0.4} fill={k % 2 ? "#FFC24E" : "#F2632A"} style={{ filter: "drop-shadow(0 0 4px #F2632A)" }} />; })}
                  <path d="M30 34 Q36 18 42 34 Q36 26 30 34 Z" fill="#FFD65A" opacity={0.9} />
                </svg>
              )}
              {atk > 0.06 && i === 2 && (
                <svg width={SPSZ} height={SPSZ} viewBox="0 0 72 72" style={{ position: "absolute", left: 0, top: -SPSZ * 0.5, overflow: "visible", opacity: Math.min(1, atk * 1.4) }}>
                  <circle cx={36} cy={28} r={8 + atk * 12} fill="#7C63E8" opacity={0.85} style={{ filter: "drop-shadow(0 0 8px #B48CFF)" }} />
                  <circle cx={36} cy={28} r={13 + atk * 16} fill="none" stroke="#B48CFF" strokeWidth={2.5} opacity={1 - atk} />
                  {[0, 90, 180, 270].map((deg) => { const rr = (deg + lf * 6) * Math.PI / 180; const d = 12 + atk * 14; return <circle key={deg} cx={36 + Math.cos(rr) * d} cy={28 + Math.sin(rr) * d} r={3} fill="#D8C4FF" />; })}
                </svg>
              )}
              {atk > 0.06 && i === 3 && (
                <svg width={SPSZ} height={SPSZ} viewBox="0 0 72 72" style={{ position: "absolute", left: 0, top: -SPSZ * 0.5, overflow: "visible", opacity: Math.min(1, atk * 1.4) }}>
                  {[0, 1, 2, 3, 4].map((k) => { const ang = -1.4 + k * 0.34; const d = 10 + atk * 26; const sx = 36 + Math.cos(ang) * d, sy = 32 - Math.sin(ang) * d; return <path key={k} d={`M${sx} ${sy - 5} L${sx + 1.6} ${sy - 1.6} L${sx + 5} ${sy} L${sx + 1.6} ${sy + 1.6} L${sx} ${sy + 5} L${sx - 1.6} ${sy + 1.6} L${sx - 5} ${sy} L${sx - 1.6} ${sy - 1.6} Z`} fill="#FFF0A0" style={{ filter: "drop-shadow(0 0 3px #FFE066)" }} />; })}
                </svg>
              )}
              <HC x={0} y={0} sz={SPSZ} lf={lf + i * 7} />
            </div>
          );
        })}

        {/* --- per-hero mini battle boxes (name + HP) - crisp, unscaled --- */}
        {HEROES.map((h, i) => {
          const life = depLife(i);
          if (life <= 0.55) return null;
          const bxc = heroSlotX(i);
          const o = ramp(life, 0.55, 0.9);
          return (
            <div key={i} style={{ position: "absolute", left: bxc - 50, top: 496, width: 100, opacity: o, transform: `translateY(${(1 - o) * 8}px)` }}>
              <div style={{ padding: "3px 4px 4px", borderRadius: 7, background: "linear-gradient(180deg,#16305e,#0E2148)", border: "2px solid #0C1E3C", boxShadow: "0 3px 0 rgba(0,0,0,0.28)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: h.col, boxShadow: `0 0 4px ${h.col}` }} />
                  <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 10, letterSpacing: 1, color: "#CFE0F5" }}>{h.role}</span>
                </div>
                <div style={{ marginTop: 3, height: 6, borderRadius: 999, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,0,0,0.5)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${88 + Math.sin(lf * 0.1 + i) * 8}%`, background: "linear-gradient(180deg,#57F0A0,#2FA86E)", borderRadius: 999 }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* --- current move-name banner (authentic battle callout) --- */}
        {atkTop > 0.16 && (
          <div style={{ position: "absolute", left: "50%", top: 342, transform: `translateX(-50%) scale(${0.86 + atkTop * 0.14})`, opacity: Math.min(1, atkTop * 1.6), padding: "3px 14px", borderRadius: 8, background: "linear-gradient(180deg,#F2C12C,#C8930F)", border: "2px solid #7E560A", boxShadow: "0 4px 0 rgba(0,0,0,0.3)", fontFamily: mono, fontWeight: 900, fontSize: 13, letterSpacing: 1.5, color: "#3A2A08", whiteSpace: "nowrap", textShadow: "0 1px 0 rgba(255,255,255,0.35)" }}>{HEROES[atkIdx].move}!</div>
        )}

        {/* LIVE counter chip (bottom of zone) */}
        {(() => { const live = over(lf, fr(2.6), fr(0.5), Easing.out(Easing.back(1.5))); return (
          <div style={{ position: "absolute", left: "50%", bottom: 16, transform: `translateX(-50%) scale(${0.9 + live * 0.1})`, opacity: live, display: "flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "linear-gradient(180deg,#1C5B41,#0F3A29)", border: "3px solid #0A2A1D", boxShadow: "0 5px 0 rgba(0,0,0,0.28)", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 1.5, color: "#8CF0C0", whiteSpace: "nowrap" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#57F0A0", boxShadow: `0 0 ${6 + Math.abs(Math.sin(lf * 0.2)) * 8}px #57F0A0` }} />
            ×20 HAIKU AT ONCE
          </div>
        ); })()}
      </div>

      {/* ================= RIGHT ZONE: SELF-FIX LOOP (POKEMON CENTER) ================= */}
      <div style={{ position: "absolute", left: 540, top: 120, width: 436, height: 600, borderRadius: 24, background: `linear-gradient(180deg,${PK.steel},${PK.steelDk})`, border: "4px solid #10161f", boxShadow: "0 16px 34px -14px rgba(8,12,26,0.7), inset 0 3px 0 rgba(255,255,255,0.08)", opacity: cardB, transform: `translateY(${(1 - cardB) * 30}px)`, overflow: "hidden" }}>
        {/* --- Pokemon-Center interior: checker floor (textured) --- */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, backgroundColor: "#20304E", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 15px, rgba(0,0,0,0.07) 15px 30px)", boxShadow: "inset 0 10px 22px rgba(6,12,26,0.5)" }} />
        {/* storage PC monitor in the corner */}
        <div style={{ position: "absolute", left: 24, bottom: 22, width: 50, height: 44 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 50, height: 34, borderRadius: 5, background: "linear-gradient(180deg,#E8ECF2,#C8CFDA)", border: "2.5px solid #8A93A6", boxShadow: "inset 0 0 0 3px #16305e" }} />
          <div style={{ position: "absolute", left: 6, top: 6, width: 38, height: 22, borderRadius: 2, background: "linear-gradient(180deg,#2E63C4,#173E86)" }} />
          <div style={{ position: "absolute", left: 20, bottom: 0, width: 10, height: 8, background: "#8A93A6" }} />
        </div>
        {/* header chip */}
        <div style={{ position: "absolute", left: "50%", top: 20, transform: `translateX(-50%) scale(${0.9 + hdrB * 0.1})`, opacity: hdrB, padding: "6px 18px", borderRadius: 999, background: "linear-gradient(180deg,#8A5A2C,#5E3A18)", border: "3px solid #3A2410", boxShadow: "0 5px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.14)", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 1.5, color: "#FCD9A0", whiteSpace: "nowrap" }}>SELF-FIX LOOP</div>

        {/* the loop ring */}
        <svg width={436} height={600} viewBox="0 0 436 600" style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0D1220" strokeWidth={30} />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2B3550" strokeWidth={22} />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#F2C12C" strokeWidth={5} strokeDasharray="12 24" strokeDashoffset={dash} strokeLinecap="round" opacity={0.9} />
          {/* direction chevrons (clockwise) */}
          <path d={`M${cx + R - 9} ${cy - 11} L${cx + R + 9} ${cy - 11} L${cx + R} ${cy + 6} Z`} fill="#FCD9A0" />
          <path d={`M${cx - R - 9} ${cy + 11} L${cx - R + 9} ${cy + 11} L${cx - R} ${cy - 6} Z`} fill="#FCD9A0" />
        </svg>

        {/* --- Pokemon-Center HEALING MACHINE at the top of the loop --- */}
        <div style={{ position: "absolute", left: cx - 62, top: 118, width: 124, height: 96 }}>
          {/* heal glow */}
          <div style={{ position: "absolute", left: -6, top: -20, width: 136, height: 136, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,240,160,0.55), rgba(90,240,160,0) 68%)", opacity: heal, transform: `scale(${0.6 + heal * 0.7})` }} />
          {/* red cross backboard */}
          <div style={{ position: "absolute", left: 46, top: -2, width: 32, height: 32, borderRadius: 7, background: "linear-gradient(180deg,#F7F3EA,#DAD3C1)", border: "2.5px solid #B7AE97", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)" }} />
          <div style={{ position: "absolute", left: 54, top: 11, width: 16, height: 6, borderRadius: 2, background: "#E8403A" }} />
          <div style={{ position: "absolute", left: 59, top: 6, width: 6, height: 16, borderRadius: 2, background: "#E8403A" }} />
          {/* machine console body */}
          <div style={{ position: "absolute", left: 4, top: 38, width: 116, height: 50, borderRadius: "10px 10px 8px 8px", background: "linear-gradient(180deg,#F1ECE0,#CFC7B4)", border: "3px solid #9A917C", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.5), 0 5px 0 rgba(0,0,0,0.22)" }} />
          {/* 6 healing dome slots that light on heal */}
          {[0, 1, 2, 3, 4, 5].map((k) => { const on = heal > 0.05; return (
            <div key={k} style={{ position: "absolute", left: 12 + k * 18, top: 52, width: 12, height: 12, borderRadius: "50%", background: on ? "radial-gradient(circle at 40% 35%, #DDFBEA, #45D68C)" : "radial-gradient(circle at 40% 35%, #C8CFD8, #7E8A99)", border: "1.5px solid #6A7280", boxShadow: on ? `0 0 ${5 + heal * 8}px #57F0A0` : "inset 0 1px 0 rgba(255,255,255,0.4)" }} />
          ); })}
        </div>

        {/* a Pokemon resting on the heal pad, bounces when healed */}
        <div style={{ position: "absolute", left: cx - 26, top: 208, width: 52, height: 52, transform: `translateY(${-heal * 6}px) scale(${0.9 + heal * 0.15})`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 4, top: 44, width: 44, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.3)", filter: "blur(1.5px)" }} />
          <Pikachu x={0} y={-2} sz={52} lf={lf} />
        </div>

        {/* the traveling mistake -> fix token */}
        <div style={{ position: "absolute", left: bx - 24, top: by - 24, width: 48, height: 48, transform: `rotate(${bugSpin}deg)`, filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.4))" }}>
          {!fixed ? (
            <svg width={48} height={48} viewBox="0 0 48 48">
              {/* legs */}
              {[-1, 1].map((s) => [0, 1, 2].map((k) => <line key={`${s}-${k}`} x1={24} y1={22 + k * 6} x2={24 + s * 18} y2={16 + k * 8} stroke="#7E2A22" strokeWidth={2.4} strokeLinecap="round" />))}
              {/* antennae */}
              <line x1={19} y1={12} x2={13} y2={3} stroke="#7E2A22" strokeWidth={2.4} strokeLinecap="round" /><circle cx={13} cy={3} r={2.6} fill="#7E2A22" />
              <line x1={29} y1={12} x2={35} y2={3} stroke="#7E2A22" strokeWidth={2.4} strokeLinecap="round" /><circle cx={35} cy={3} r={2.6} fill="#7E2A22" />
              {/* body */}
              <ellipse cx={24} cy={26} rx={15} ry={16} fill="#C44A3A" stroke="#7E2A22" strokeWidth={2.5} />
              <ellipse cx={19} cy={20} rx={5} ry={4} fill="rgba(255,255,255,0.28)" />
              {/* angry eyes */}
              <circle cx={19} cy={24} r={2.6} fill="#1A1410" /><circle cx={29} cy={24} r={2.6} fill="#1A1410" />
              <line x1={15} y1={19} x2={22} y2={22} stroke="#1A1410" strokeWidth={2} strokeLinecap="round" />
              <line x1={33} y1={19} x2={26} y2={22} stroke="#1A1410" strokeWidth={2} strokeLinecap="round" />
            </svg>
          ) : (
            <svg width={48} height={48} viewBox="0 0 48 48">
              <circle cx={24} cy={24} r={17} fill="#3F9E74" stroke="#1E6E4A" strokeWidth={2.5} />
              <ellipse cx={18} cy={17} rx={6} ry={4} fill="rgba(255,255,255,0.30)" />
              <path d="M15 25 L21 31 L34 17" fill="none" stroke="#FBFDF6" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* heal burst at the station */}
        {heal > 0.01 && [0, 60, 120, 180, 240, 300].map((deg) => {
          const rr = (deg * Math.PI) / 180;
          const d = heal * 34;
          return <div key={deg} style={{ position: "absolute", left: cx + Math.cos(rr) * d - 5, top: 165 + Math.sin(rr) * d - 5, width: 10, height: 10, background: "#BFF7D8", opacity: heal, transform: `rotate(45deg) scale(${0.5 + heal * 0.7})`, borderRadius: 2, pointerEvents: "none" }} />;
        })}

        {/* center status readout (inside the ring hole) */}
        <div style={{ position: "absolute", left: cx - 92, top: cy - 58, width: 184, textAlign: "center", padding: "12px 10px 14px", borderRadius: 16, background: "linear-gradient(180deg,#16305e,#0E2148)", border: "3px solid #0C1E3C", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12), 0 8px 18px -8px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: mono, fontWeight: 900, fontSize: 12, letterSpacing: 2, color: "#8CF0C0" }}>AUTO-HEALED</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, lineHeight: 1, color: "#7FE3B4", textShadow: "0 3px 0 rgba(0,0,0,0.35)", marginTop: 2, transform: `scale(${1 + heal * 0.08})` }}>{fixes}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: "#CFE0F5", marginTop: 4 }}>bugs, before you see</div>
        </div>

        {/* bottom guarantee chip */}
        {(() => { const g = over(lf, fr(2.4), fr(0.5), Easing.out(Easing.back(1.5))); return (
          <div style={{ position: "absolute", left: "50%", bottom: 16, transform: `translateX(-50%) scale(${0.9 + g * 0.1})`, opacity: g, display: "flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "linear-gradient(180deg,#1C5B41,#0F3A29)", border: "3px solid #0A2A1D", boxShadow: "0 5px 0 rgba(0,0,0,0.28)", fontFamily: mono, fontWeight: 900, fontSize: 14, letterSpacing: 1.2, color: "#8CF0C0", whiteSpace: "nowrap" }}>
            <svg width={15} height={15} viewBox="0 0 24 24"><path d="M5 13 L10 18 L19 6" fill="none" stroke="#8CF0C0" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg>
            0 REACH YOU
          </div>
        ); })()}
      </div>
    </Panel>
  );
};

const Firework: React.FC<{ lf: number; at: number; x: number; y: number; hue?: number }> = ({ lf, at, x, y, hue = 0 }) => {
  const t = (lf - at) / FPS;
  if (t < -0.02 || t > 1.5) return null;
  const col = FIRE_HUES[hue % FIRE_HUES.length];
  const launch = t < 0.28 ? t / 0.28 : 1;
  const burst = t < 0.28 ? 0 : Math.min(1, (t - 0.28) / 0.95);
  const riseY = (1 - launch) * 74;
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 40 }}>
      {burst <= 0 && <div style={{ position: "absolute", left: -3, top: riseY, width: 6, height: 13, borderRadius: 3, background: col, boxShadow: `0 0 9px ${col}` }} />}
      {burst > 0 && Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const d = burst * 48;
        const op = Math.max(0, 1 - burst);
        return <div key={i} style={{ position: "absolute", left: Math.cos(a) * d, top: Math.sin(a) * d + burst * burst * 26, width: 7, height: 7, borderRadius: "50%", background: col, opacity: op, boxShadow: `0 0 8px ${col}` }} />;
      })}
    </div>
  );
};
const R6: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- entrance beats (PRESERVED) ----
  const enemyIn = over(lf, fr(0.3), fr(0.6), Easing.out(Easing.back(1.6)));
  const sysIn = over(lf, fr(0.55), fr(0.6), Easing.out(Easing.back(1.6)));
  const hpBoxL = over(lf, fr(0.7), fr(0.5));
  const hpBoxR = over(lf, fr(0.9), fr(0.5));

  // ---- the real task drops in (PRESERVED) ----
  const taskDrop = over(lf, fr(1.6), fr(0.7), Easing.out(Easing.bounce));

  // ---- PLAIN CLAUDE chokes: HP drains, then faints (PRESERVED) ----
  const drain = over(lf, fr(2.5), fr(1.35));
  const enemyHP = 100 * (1 - drain);
  const enShock = Math.min(0.6, over(lf, fr(2.5), fr(0.4)) * 0.78);
  const faint = over(lf, fr(4.6), fr(0.85), Easing.in(Easing.cubic));
  const menace = drain * (1 - faint);                                  // the wild task LOOMS as it overpowers Plain Claude
  const enemyHPcol = enemyHP > 50 ? "#57C24A" : enemyHP > 22 ? "#F2C12C" : "#E23B2E";

  // ---- THE SYSTEM sweeps: 4 moves + filling task bar (PRESERVED) ----
  const moveT = [fr(6.4), fr(8.25), fr(10.1), fr(11.95)];
  const moveNames = ["PLAN IT", "SPLIT ACROSS TEAM", "FIX OWN BUGS", "SHIP OVERNIGHT"];
  let mi = -1;
  for (let i = 0; i < 4; i++) if (lf >= moveT[i]) mi = i;
  const started = mi >= 0;
  const pop = started ? over(lf, moveT[mi], fr(0.34), Easing.out(Easing.back(2))) : 0;
  const jumpPulse = started ? over(lf, moveT[mi], fr(0.18)) * (1 - over(lf, moveT[mi] + fr(0.18), fr(0.42))) : 0;
  const moveFlash = started ? over(lf, moveT[mi], fr(0.1)) * (1 - over(lf, moveT[mi] + fr(0.1), fr(0.4))) : 0;
  const taskPct = started ? Math.min(100, 25 * mi + 25 * over(lf, moveT[mi], fr(1.45))) : 0;
  const teamGlow = over(lf, moveT[1], fr(0.6));
  const done = over(lf, fr(13.2), fr(0.55), Easing.out(Easing.back(2)));

  // ---- SPLIT ACROSS TEAM: each teammate takes a turn lunging at the monster ----
  const splitP = over(lf, moveT[1], fr(1.78));                       // 0..1 across the move
  const lungeOf = (idx: number) => { const seg = 1 / 3, loc = (splitP - idx * seg) / seg; return (loc <= 0 || loc >= 1) ? 0 : Math.sin(loc * Math.PI); };
  const luPika = mi === 1 ? lungeOf(0) : 0;
  const luFox = mi === 1 ? lungeOf(1) : 0;
  const luFire = mi === 1 ? lungeOf(2) : 0;
  const luMax = Math.max(luPika, luFox, luFire);
  const splitHit = luMax > 0.62 ? luMax : 0;                         // impact at each lunge apex
  const splitHitCol = luPika >= Math.max(luFox, luFire) ? "#F7D02E" : luFox >= luFire ? "#CE9450" : "#F0803C";

  // ---- NEW: Pikachu charge + THUNDERBOLT (fires as the system takes over) ----
  const charge = over(lf, fr(4.7), fr(0.5)) * (1 - over(lf, fr(5.35), fr(0.3)));
  const bolt = over(lf, fr(5.2), fr(0.4)) * (1 - over(lf, fr(6.7), fr(0.55)));
  const boltFlicker = 0.5 + 0.5 * Math.abs(Math.sin(lf * 1.5));
  const boltOn = bolt * boltFlicker;
  const ghostHit = lf < fr(5.45) ? 0 : bolt * boltFlicker;      // clamped flash
  const ghostFall = Math.min(1, done * 1.1);                     // task defeated
  const ghostOp = taskDrop * (1 - ghostFall);
  const ghostReel = (bolt > 0.02 ? Math.sin(lf * 2.4) * bolt * 7 : 0) + (splitHit > 0.02 ? Math.sin(lf * 3.4) * splitHit * 10 : 0);

  // ---- NEW: screen-shake energy on impacts ----
  const shakeAmt = Math.max(boltOn * 0.9, moveFlash * 0.85, splitHit * 0.9, (drain > 0 && drain < 1 ? enShock * 0.5 : 0));
  const shX = shakeAmt > 0.02 ? Math.sin(lf * 3.9) * 7 * shakeAmt : 0;
  const shY = shakeAmt > 0.02 ? Math.cos(lf * 4.7) * 5 * shakeAmt : 0;

  // box copy (PRESERVED)
  const boxLead = !started ? (faint > 0.55 ? "PLAIN CLAUDE" : "A REAL TASK APPEARS!") : "THE SYSTEM used";
  const boxMain = !started ? (faint > 0.55 ? "fainted!" : "SHIP THE WHOLE APP") : moveNames[mi] + "!";

  return (
    <Panel label="BATTLE" tint="rgba(214,75,62,0.36)">
      {/* ============================================================= */}
      {/* ================ BATTLE STADIUM BACKGROUND ================== */}
      {/* ============================================================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1B2B54 0%,#294276 24%,#3A62A0 44%,#4E86BE 58%,#6AA463 74%,#579645 100%)" }} />
      {/* stadium dome rim overhead */}
      <div style={{ position: "absolute", left: -90, right: -90, top: -140, height: 340, borderRadius: "0 0 50% 50% / 0 0 100% 100%", background: "linear-gradient(180deg,#12203C,#20345C)", boxShadow: "inset 0 -8px 0 rgba(255,255,255,0.06)" }} />
      {/* crowd stands band */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 82, background: "linear-gradient(180deg,#233458,#1A2A48)", boxShadow: "inset 0 6px 0 rgba(0,0,0,0.3), inset 0 -6px 0 rgba(0,0,0,0.35)" }} />
      {Array.from({ length: 96 }).map((_, i) => {
        const col = i % 32, row = Math.floor(i / 32);
        const cx = col * 32 + (row % 2) * 16 + 6;
        const cy = 100 + row * 22;
        const pal = ["#F2C12C", "#E8462E", "#4C90F0", "#5AC85A", "#F0803C", "#F35B8E", "#EAF0F7", "#B07BE0"];
        const c = pal[Math.floor(seed(i) * pal.length)];
        const tw = 0.72 + seed(i + 9) * 0.28;
        const flash = Math.floor(lf / 5 + seed(i) * 60) % 46 === 0;
        return <div key={"cr" + i} style={{ position: "absolute", left: cx, top: cy, width: 9, height: 9, borderRadius: "50%", background: flash ? "#FFFFFF" : c, opacity: flash ? 1 : tw, boxShadow: flash ? "0 0 8px rgba(255,255,255,0.9)" : "none" }} />;
      })}
      {/* stadium light rigs + spotlights (bg depth wash) */}
      <div style={{ position: "absolute", left: 20, top: 58, width: 132, height: 13, borderRadius: 7, background: "linear-gradient(180deg,#0E1626,#060B14)", transform: "rotate(-9deg)", boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }}>
        {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 14 + k * 28, top: 3, width: 15, height: 15, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#FFFDEB,#FFE39A 70%)", boxShadow: "0 0 12px 3px rgba(255,240,190,0.7)" }} />)}
      </div>
      <div style={{ position: "absolute", right: 20, top: 58, width: 132, height: 13, borderRadius: 7, background: "linear-gradient(180deg,#0E1626,#060B14)", transform: "rotate(9deg)", boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }}>
        {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 14 + k * 28, top: 3, width: 15, height: 15, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#FFFDEB,#FFE39A 70%)", boxShadow: "0 0 12px 3px rgba(255,240,190,0.7)" }} />)}
      </div>
      <div style={{ position: "absolute", left: 30, top: 66, width: 380, height: 560, background: "radial-gradient(ellipse 55% 78% at 16% 0%, rgba(255,250,215,0.26), rgba(255,250,215,0) 62%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 30, top: 66, width: 380, height: 560, background: "radial-gradient(ellipse 55% 78% at 84% 0%, rgba(255,250,215,0.26), rgba(255,250,215,0) 62%)", pointerEvents: "none" }} />
      {/* stadium arena floor: mowed-turf bands + center hash line */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 440, bottom: 0, background: "linear-gradient(180deg,#69A85C 0%,#57964A 46%,#4C8A40 100%)", boxShadow: "inset 0 8px 0 rgba(255,255,255,0.14)" }} />
      {[0, 1, 2, 3].map((k) => <div key={"turf" + k} style={{ position: "absolute", left: 0, right: 0, top: 456 + k * 78, height: 40, background: "rgba(255,255,255,0.05)" }} />)}
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, height: 5, background: "rgba(240,248,235,0.32)" }} />
      {/* enemy far battle platform (top-right, concentric ring) */}
      <div style={{ position: "absolute", left: 690, top: 296, width: 250, height: 58, opacity: enemyIn }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 50% 42%, rgba(180,150,110,0.55), rgba(90,70,50,0) 72%)" }} />
        <div style={{ position: "absolute", left: 30, top: 14, right: 30, bottom: 12, borderRadius: "50%", border: "3px solid rgba(255,240,210,0.28)" }} />
      </div>
      {/* system near battle platform (bottom-left, big ring) */}
      <div style={{ position: "absolute", left: 50, top: 588, width: 300, height: 66, opacity: sysIn }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 50% 40%, rgba(96,192,96,0.6), rgba(60,120,50,0) 72%)" }} />
        <div style={{ position: "absolute", left: 34, top: 14, right: 34, bottom: 12, borderRadius: "50%", border: "3px solid rgba(210,255,200,0.34)" }} />
      </div>

      <SceneAtmo lf={lf} preset="battle" />
      <PkSlug text="THE BATTLE" />

      {/* ============= SHAKE WRAPPER (all battle content) ============ */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shX}px, ${shY}px)` }}>

        {/* ============ THE REAL TASK nameplate (drops in) ============ */}
        <div style={{ position: "absolute", left: 286, top: 116, width: 440, transform: `translateY(${-170 * (1 - taskDrop)}px)`, opacity: taskDrop, zIndex: 20 }}>
          <div style={{ borderRadius: 16, background: grad(PK.steel, PK.steelDk), border: "3px solid #F4F0E8", boxShadow: "0 12px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.12)", padding: "9px 20px", textAlign: "center", position: "relative" }}>
            <div style={{ fontFamily: mono, fontWeight: 900, fontSize: 14, letterSpacing: 3, color: "#F6C86A" }}>WILD TASK APPEARED</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 29, color: "#FFF6EE", letterSpacing: "-0.01em", marginTop: 1 }}>Ship the whole app</div>
            <div style={{ position: "absolute", left: "50%", bottom: -11, width: 0, height: 0, transform: "translateX(-50%)", borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "12px solid #F4F0E8" }} />
          </div>
        </div>

        {/* ============ THE TASK as a wild GHOST-MON (center) ============ */}
        {/* ground shadow */}
        <div style={{ position: "absolute", left: 452, top: 330, width: 130, height: 22, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,10,44,0.4), rgba(30,10,44,0) 70%)", opacity: ghostOp }} />
        <div style={{ position: "absolute", left: 452, top: 202, opacity: ghostOp, transform: `translate(${ghostReel + menace * 18}px, ${ghostFall * 44 - menace * 10}px) scale(${(1 - ghostFall * 0.4) * (1 + menace * 0.18)}) rotate(${ghostFall * 26}deg)`, transformOrigin: "50% 90%", filter: `grayscale(${ghostFall})`, zIndex: 18 }}>
          <GhostMon x={0} y={0} sz={132} lf={lf} />
          {/* menace aura — swells as the task overpowers Claude */}
          <div style={{ position: "absolute", left: 6, top: 8, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(142,72,202,0.42), rgba(120,80,180,0) 68%)", opacity: (1 - ghostFall) * (0.5 + menace * 0.7), transform: `scale(${1 + menace * 0.45})`, pointerEvents: "none" }} />
          {/* electric hit sparks during Thunderbolt */}
          {ghostHit > 0.02 && [0, 1, 2, 3, 4].map((k) => {
            const a = (k / 5) * Math.PI * 2 + lf * 0.4;
            return <div key={"sp" + k} style={{ position: "absolute", left: 60 + Math.cos(a) * 58, top: 60 + Math.sin(a) * 58, width: 7, height: 20, background: "#FFF7C0", borderRadius: 2, transform: `rotate(${a}rad)`, opacity: ghostHit, boxShadow: "0 0 8px #F7D02E" }} />;
          })}
        </div>
        {/* white hit flash on the task (thunderbolt + team lunges) */}
        {(ghostHit > 0.02 || splitHit > 0.02) && <div style={{ position: "absolute", left: 452, top: 200, width: 138, height: 138, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,246,180,0.4) 40%, rgba(255,246,180,0) 72%)", opacity: Math.max(ghostHit, splitHit), zIndex: 19, pointerEvents: "none" }} />}
        {/* SPLIT ACROSS TEAM — colored impact burst + HIT! per teammate turn */}
        {splitHit > 0.02 && (
          <div style={{ position: "absolute", left: 452, top: 196, width: 138, height: 138, zIndex: 23, pointerEvents: "none" }}>
            {Array.from({ length: 9 }, (_, k) => { const a = (k / 9) * Math.PI * 2; const d = 26 + (1 - splitHit) * 46; return <div key={"si" + k} style={{ position: "absolute", left: 69 + Math.cos(a) * d - 5, top: 69 + Math.sin(a) * d - 5, width: 11, height: 11, borderRadius: "50%", background: splitHitCol, opacity: splitHit, boxShadow: `0 0 9px ${splitHitCol}` }} />; })}
            <div style={{ position: "absolute", left: 40, top: 30, transform: `rotate(-8deg) scale(${0.7 + splitHit * 0.5})`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#FFF6EE", WebkitTextStroke: `4px ${splitHitCol}`, paintOrder: "stroke", textShadow: "0 3px 0 rgba(0,0,0,0.35)", opacity: splitHit }}>HIT!</div>
          </div>
        )}
        {/* combo counter as the team stacks hits */}
        {mi === 1 && splitP > 0.02 && (
          <div style={{ position: "absolute", left: 452, top: 168, width: 138, textAlign: "center", zIndex: 23, pointerEvents: "none", fontFamily: mono, fontWeight: 900, fontSize: 22, letterSpacing: 1, color: "#FFE07A", textShadow: "0 2px 0 rgba(0,0,0,0.5)" }}>{`x${Math.min(3, Math.floor(splitP * 3) + 1)} COMBO`}</div>
        )}

        {/* ============ ENEMY: PLAIN CLAUDE (HP box top-left) ============ */}
        <div style={{ position: "absolute", left: 44, top: 198, width: 372, opacity: hpBoxL, transform: `translateX(${-40 * (1 - hpBoxL)}px)`, borderRadius: 14, background: grad("#33405C", "#212B41"), border: "3px solid #10161f", boxShadow: "0 8px 0 rgba(0,0,0,0.24)", padding: "12px 16px", zIndex: 21 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFF6EE" }}>PLAIN CLAUDE</span>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, color: "#C9D4E6" }}>Lv.5</span>
          </div>
          <StatBar label="HP" pct={enemyHP} col={enemyHPcol} w={340} />
          <div style={{ marginTop: 7, fontFamily: mono, fontWeight: 800, fontSize: 13, color: enemyHP < 40 ? "#F2A24C" : "#9FB0C8", letterSpacing: 1 }}>
            {faint > 0.55 ? "STATUS: FAINTED" : enemyHP < 55 ? "CHOKING HALFWAY..." : "ENGAGING..."}
          </div>
        </div>
        {/* enemy Plain Claude mascot (its lone weak mon, faints) top-right */}
        <div style={{ position: "absolute", left: 742, top: 174, opacity: enemyIn * (1 - faint * 0.6), transform: `translateY(${enemyIn ? faint * 96 : 0}px) rotate(${-faint * 78}deg)`, transformOrigin: "50% 100%", filter: `grayscale(${faint})`, zIndex: 12 }}>
          <Mascot lf={lf} size={132} nodAmp={3} nodSpeed={9} shock={enShock} stern={faint > 0.3 ? 0.6 : 0} />
        </div>
        {/* sweat + FAINTED tag */}
        {faint > 0.55 && (
          <div style={{ position: "absolute", left: 726, top: 152, opacity: over(lf, fr(5.1), fr(0.4)), transform: `scale(${0.7 + over(lf, fr(5.1), fr(0.4), Easing.out(Easing.back(2))) * 0.3})`, transformOrigin: "50% 50%", padding: "5px 14px", borderRadius: 10, background: grad("#E23B2E", "#B4231B"), border: "3px solid #7E2A22", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFF6EE", boxShadow: "0 6px 0 rgba(0,0,0,0.25)", zIndex: 16 }}>FAINTED</div>
        )}

        {/* ============ THE SYSTEM (bottom-left squad) ============ */}
        {/* sweep glow aura */}
        {started && (
          <div style={{ position: "absolute", left: 0, top: 372, width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,200,90,0.34), rgba(63,158,116,0.10) 52%, rgba(63,158,116,0) 74%)", opacity: 0.7 + jumpPulse * 0.3, pointerEvents: "none" }} />
        )}
        {/* system Claude TRAINER (evolved) */}
        <div style={{ position: "absolute", left: 66, top: 392, opacity: sysIn, transform: `translateY(${(1 - sysIn) * 40 - jumpPulse * 30}px) scale(${0.9 + sysIn * 0.1})`, transformOrigin: "50% 100%", zIndex: 13 }}>
          <Mascot lf={lf} size={196} trainer={1} glasses={1} nodAmp={4} nodSpeed={10} cheer={started ? 0.45 + jumpPulse * 0.4 : 0} />
        </div>
        {/* teammate FoxMon/Eevee (takes turn 2 of SPLIT ACROSS TEAM) */}
        <div style={{ position: "absolute", left: 12, top: 512, opacity: sysIn, transform: `translate(${luFox * 224}px, ${-luFox * 156}px) scale(${0.9 + teamGlow * 0.12 + luFox * 0.14})`, zIndex: luFox > 0.1 ? 20 : 12 }}>
          <FoxMon x={0} y={0} sz={92} lf={lf} />
        </div>
        {/* Pikachu LEAD (Thunderbolt, then turn 1 of SPLIT ACROSS TEAM) */}
        <div style={{ position: "absolute", left: 262, top: 470, zIndex: luPika > 0.1 ? 21 : 15, opacity: sysIn, transform: `translate(${luPika * 130}px, ${-luPika * 164}px) translateY(${-jumpPulse * 14}px) scale(${1 + charge * 0.08 + luPika * 0.12})` }}>
          {/* electric charge aura */}
          {charge > 0.02 && <div style={{ position: "absolute", left: -18, top: -14, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,208,46,0.55), rgba(247,208,46,0) 66%)", opacity: charge, pointerEvents: "none" }} />}
          <Pikachu x={0} y={0} sz={118} lf={lf} />
          {/* cheek crackle when charging */}
          {charge > 0.2 && [0, 1, 2].map((k) => <div key={"ch" + k} style={{ position: "absolute", left: 8 + k * 44, top: 66, width: 5, height: 16, background: "#FFF3A0", borderRadius: 2, transform: `rotate(${(seed(k + lf) - 0.5) * 90}deg)`, opacity: charge * (0.6 + seed(k) * 0.4), boxShadow: "0 0 6px #F7D02E" }} />)}
        </div>
        {/* teammate FireLizard/Charmander (takes turn 3 of SPLIT ACROSS TEAM) */}
        <div style={{ position: "absolute", left: 398, top: 500, opacity: sysIn, transform: `translate(${luFire * 70}px, ${-luFire * 182}px) scale(${0.86 + teamGlow * 0.12 + luFire * 0.14})`, zIndex: luFire > 0.1 ? 20 : 12 }}>
          <FireLizard x={0} y={0} sz={86} lf={lf} />
        </div>

        {/* ============ THUNDERBOLT overlay (Pikachu -> the task) ============ */}
        {boltOn > 0.02 && (
          <svg viewBox="0 0 1012 792" width="1012" height="792" style={{ position: "absolute", inset: 0, zIndex: 17, pointerEvents: "none", overflow: "visible" }}>
            <path d="M330 512 L372 466 L340 458 L388 414 L354 404 L404 358 L372 348 L430 314 L494 300 L516 286" fill="none" stroke="#FFF9C8" strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" opacity={boltOn * 0.6} />
            <path d="M330 512 L372 466 L340 458 L388 414 L354 404 L404 358 L372 348 L430 314 L494 300 L516 286" fill="none" stroke="#F7D02E" strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" opacity={boltOn} />
            <path d="M330 512 L372 466 L340 458 L388 414 L354 404 L404 358 L372 348 L430 314 L494 300 L516 286" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" opacity={boltOn} />
            {/* forks */}
            <path d="M404 358 L444 370 L462 344" fill="none" stroke="#F7D02E" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" opacity={boltOn * 0.9} />
            <path d="M388 414 L360 430 L378 452" fill="none" stroke="#FFF9C8" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" opacity={boltOn * 0.8} />
          </svg>
        )}
        {/* THUNDERBOLT! move shout */}
        {bolt > 0.05 && (
          <div style={{ position: "absolute", left: 300, top: 430, zIndex: 24, transform: `rotate(-8deg) scale(${0.8 + Math.min(1, bolt * 1.6) * 0.2})`, opacity: Math.min(1, bolt * 1.6), padding: "5px 16px", borderRadius: 11, background: "linear-gradient(180deg,#FBDE52,#F0B21C)", border: "3px solid #8A5A10", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#3A2A08", boxShadow: "0 6px 0 rgba(0,0,0,0.26)", whiteSpace: "nowrap", textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}>THUNDERBOLT!</div>
        )}

        {/* ============ SYSTEM HP box (mid-right, full) ============ */}
        <div style={{ position: "absolute", left: 592, top: 386, width: 380, opacity: hpBoxR, transform: `translateX(${40 * (1 - hpBoxR)}px)`, borderRadius: 14, background: grad("#254A38", "#173125"), border: "3px solid #10231a", boxShadow: "0 8px 0 rgba(0,0,0,0.24)", padding: "12px 16px", zIndex: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#FFF6EE" }}>THE SYSTEM</span>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, color: "#B7E6C4" }}>Lv.??</span>
          </div>
          <StatBar label="HP" pct={100} col="#57C24A" w={348} />
          <div style={{ marginTop: 7, display: "flex", gap: 6, alignItems: "center" }}>
            <TypeBadge t="PSYCHIC" sz={0.9} /><TypeBadge t="STEEL" sz={0.9} /><TypeBadge t="DRAGON" sz={0.9} />
          </div>
          {/* 6-slot party bar (3 mons fielded) */}
          <div style={{ marginTop: 9, display: "flex", gap: 7, alignItems: "center" }}>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 11, color: "#8FCBA4", letterSpacing: 1 }}>PARTY</span>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const on = i < 3;
              return <div key={"pt" + i} style={{ width: 14, height: 14, borderRadius: "50%", background: on ? "linear-gradient(180deg,#F0483A 0 50%,#F4F0E8 50% 100%)" : "rgba(255,255,255,0.14)", border: on ? "1.5px solid #10231a" : "1.5px solid rgba(255,255,255,0.2)", boxShadow: on ? "0 2px 0 rgba(0,0,0,0.2)" : "none" }} />;
            })}
          </div>
        </div>

        {/* ============ TASK PROGRESS BAR ============ */}
        <div style={{ position: "absolute", left: 60, top: 600, width: 892, display: "flex", alignItems: "center", gap: 12, zIndex: 20 }}>
          <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 16, letterSpacing: 2, color: "#F4EFE4" }}>TASK</span>
          <div style={{ flex: 1, height: 30, borderRadius: 999, background: "rgba(14,24,18,0.9)", border: "3px solid #0C1E15", overflow: "hidden", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.5)", position: "relative" }}>
            <div style={{ height: "100%", width: `${taskPct}%`, background: "linear-gradient(180deg,#7BE06A,#3F9E58)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.4)", borderRadius: 999, transition: "none" }} />
            {moveFlash > 0.01 && <div style={{ position: "absolute", left: `${taskPct}%`, top: 0, bottom: 0, width: 44, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)", opacity: moveFlash }} />}
          </div>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: taskPct >= 100 ? "#8CF0A8" : "#F4EFE4", width: 74, textAlign: "right", textShadow: "0 2px 0 rgba(0,0,0,0.4)" }}>{Math.round(taskPct)}%</span>
        </div>

        {/* ============ BATTLE MOVE / TEXT BOX ============ */}
        <div style={{ position: "absolute", left: 44, top: 648, width: 924, height: 118, borderRadius: 16, background: grad("#F7F1E6", "#E9DFC9"), border: "4px solid #2B3550", boxShadow: "0 8px 0 rgba(0,0,0,0.26), inset 0 3px 0 rgba(255,255,255,0.6)", padding: "14px 22px", overflow: "hidden", zIndex: 22 }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, letterSpacing: 1, color: "#5A6070" }}>{boxLead}</div>
          <div style={{ marginTop: 4, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, letterSpacing: "-0.02em", color: started ? "#2E8B57" : "#20303F", transform: `scale(${started ? 0.82 + pop * 0.18 : 1})`, transformOrigin: "0% 50%", whiteSpace: "nowrap" }}>{boxMain}</div>
          {started && (
            <div style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: i <= mi ? "#3F9E58" : "rgba(43,53,80,0.22)", boxShadow: i <= mi ? "0 2px 0 rgba(0,0,0,0.2)" : "none" }} />)}
            </div>
          )}
        </div>

        {/* ============ SHIPPED seal (final) ============ */}
        {done > 0.01 && (
          <div style={{ position: "absolute", left: "50%", top: 428, transform: `translateX(-50%) scale(${0.6 + done * 0.4}) rotate(-7deg)`, opacity: Math.min(1, done * 1.4), zIndex: 30, display: "flex", alignItems: "center", gap: 12, padding: "12px 28px", borderRadius: 18, background: grad(GOLD, AMBER), border: "5px solid #FFF6EE", boxShadow: "0 16px 0 rgba(0,0,0,0.28)" }}>
            <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#2E8B57" /><path d="M11 20 L18 27 L30 13" stroke="#FFF6EE" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "-0.01em", color: "#3A2A12" }}>SHIPPED OVERNIGHT</span>
          </div>
        )}
      </div>
    </Panel>
  );
};

const R7: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- beats (window ~9.5s) — matches VO: "same model underneath / the system is the difference / runs like a version not out yet" ----
  const CX = 506, baseY = 590;
  const pillA = over(lf, fr(0.5), fr(0.5), Easing.out(Easing.back(1.5))) * (1 - over(lf, fr(2.9), fr(0.5)));
  const charge = over(lf, fr(2.3), fr(1.1));                 // system charges in
  const evoUp = over(lf, fr(3.5), fr(1.0));                  // white glow up -> peak ~4.5
  const evoDown = over(lf, fr(5.2), fr(1.3));                // white glow down -> evolved ~6.5
  const evoP = Math.max(0, evoUp - evoDown);                 // white bell
  const evolved = evoDown;                                  // 0 before reveal, 1 after
  const revealPop = over(lf, fr(5.2), fr(0.6), Easing.out(Easing.back(1.8)));
  const crownIn = over(lf, fr(5.7), fr(0.6), Easing.out(Easing.back(1.6)));
  const plateIn = over(lf, fr(6.5), fr(0.7), Easing.out(Easing.cubic));

  // ---- hero geometry (same subject, in place; grows on evolve) ----
  const heroSz = 188 + evolved * 68;
  const heroTop = baseY - heroSz;
  const heroFloat = evolved * Math.sin(lf / 11) * 7;
  const heroScale = 1 + evoP * 0.06 + Math.sin(Math.max(0, Math.min(1, revealPop)) * Math.PI) * 0.05;
  const chestY = heroTop + heroSz * 0.42;
  // ---- reveal-instant screen-shake energy (decays over ~0.7s) ----
  const shake = (lf >= fr(5.2) && lf < fr(5.9)) ? Math.sin(lf * 2.4) * (1 - (lf - fr(5.2)) / fr(0.7)) * 7 : 0;

  // ---- reveal burst ring ----
  const ringP = over(lf, fr(5.2), fr(0.62));
  const ringO = lf < fr(5.2) ? 0 : Math.max(0, 1 - ringP);
  const ringSz = 70 + ringP * 380;
  // ---- sharp white pop at the reveal instant ----
  const flashO = lf < fr(5.2) ? 0 : Math.max(0, 1 - (lf - fr(5.2)) / 10);
  // ---- big cross-flares at the reveal (anime star burst) ----
  const flareO = lf < fr(5.2) ? 0 : Math.max(0, 1 - (lf - fr(5.2)) / 15);
  // ---- power stat fill ----
  const power = Math.min(100, 56 + over(lf, fr(6.6), fr(1.4)) * 44);

  // ---- the trainer's PARTY gathered at sunset to watch the evolution (real Pokemon) ----
  // present through "same model" + charge, blown out by the evolution light, gone before the reveal
  const team: { C: React.FC<{ x: number; y: number; sz?: number; lf?: number }>; x: number; y: number; sz: number }[] = [
    { C: Pikachu, x: 40, y: 583, sz: 72 },
    { C: FoxMon, x: 176, y: 599, sz: 66 },
    { C: FireLizard, x: 762, y: 588, sz: 70 },
    { C: GhostMon, x: 900, y: 599, sz: 66 },
  ];
  const teamReact = -charge * 7;   // party looks up as the system energy pours in

  // ---- converging "system" motes (the system you built streams in + merges) ----
  const motes = [
    { c: "#F35B8E", t: "MEMORY", sx: 150, sy: 150 },
    { c: "#5AC85A", t: "SKILLS", sx: 862, sy: 158 },
    { c: "#7B8AA0", t: "TOOLS", sx: 172, sy: 512 },
    { c: "#7C63E8", t: "OBSERVER", sx: 842, sy: 500 },
  ];

  return (
    <Panel label="EVOLUTION!" tint="rgba(231,178,76,0.42)">
      <PkSunset />
      <SceneAtmo lf={lf} preset="sunset" />
      <PkSlug text="THE EVOLUTION" />

      {/* ============ ambient sunset embers drifting up (bg depth) ============ */}
      {Array.from({ length: 16 }, (_, k) => {
        const s = seed(k * 3.1), s2 = seed(k * 7.7);
        const x = 40 + s * 940;
        const speed = 0.25 + s2 * 0.4;
        const y = (((760 - lf * speed * 6 - s * 420) % 720) + 720) % 720 + 34;
        const sz = 3 + s2 * 4;
        const tw = 0.4 + 0.6 * Math.sin(lf / 10 + k);
        return <div key={`em${k}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: k % 2 ? "#FFD98C" : "#FFB574", opacity: 0.22 * tw, boxShadow: "0 0 6px rgba(255,200,120,0.6)", zIndex: 2, pointerEvents: "none" }} />;
      })}

      {/* ============ charge vignette: darkens edges so the glow reads (fades on reveal) ============ */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 40%, rgba(20,8,24,0.9) 100%)", opacity: Math.max(0, charge * (1 - evoDown) * 0.5), zIndex: 3, pointerEvents: "none" }} />

      {/* ============ gold spotlight behind hero (grows on evolve) ============ */}
      <div style={{ position: "absolute", left: CX - 300, top: chestY - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.14 + charge * 0.12 + evolved * 0.24}) 0%, rgba(231,178,76,0) 66%)`, zIndex: 4, pointerEvents: "none" }} />

      {/* ============ anime radial focus rays (spin during the charge) ============ */}
      {charge > 0.02 && Array.from({ length: 18 }, (_, k) => {
        const a = (k / 18) * 360 + lf * 0.6;
        const rp = charge * (1 - evoDown);
        const len = 118 + charge * 256;
        return <div key={`ray${k}`} style={{ position: "absolute", left: CX, top: chestY, width: 6 + (k % 2) * 3, height: len, marginLeft: -3, transformOrigin: "50% 0%", transform: `rotate(${a}deg)`, background: "linear-gradient(180deg, rgba(255,240,190,0.5), rgba(255,240,190,0))", opacity: rp * 0.5, zIndex: 5, pointerEvents: "none", borderRadius: 4 }} />;
      })}

      {/* ============ the PARTY watching at sunset (real Pokemon) ============ */}
      {team.map((m, i) => {
        const op = over(lf, fr(0.3) + i * fr(0.12), fr(0.6)) * (1 - evoUp);
        if (op < 0.01) return null;
        const M = m.C;
        return (
          <div key={`tm${i}`} style={{ position: "absolute", left: m.x, top: m.y + teamReact, opacity: op, zIndex: 6 }}>
            <div style={{ position: "absolute", left: m.sz * 0.06, top: m.sz * 0.98, width: m.sz * 0.86, height: m.sz * 0.18, borderRadius: "50%", background: "rgba(8,3,12,0.42)", filter: "blur(3px)" }} />
            <M x={0} y={0} sz={m.sz} lf={lf + i * 9} />
          </div>
        );
      })}

      {/* ============ evolved LEGENDARY energy wings (behind hero) ============ */}
      {evolved > 0.02 && [-1, 1].map((s) => {
        const flap = Math.sin(lf / 9) * 6;
        return (
          <div key={`w${s}`} style={{ position: "absolute", left: CX + s * 118 - 78, top: heroTop + 60, width: 156, height: 168, opacity: evolved * 0.88, transformOrigin: s < 0 ? "100% 40%" : "0% 40%", transform: `scaleX(${s}) rotate(${18 + flap}deg) scale(${0.8 + revealPop * 0.2})`, zIndex: 8 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "72% 28% 62% 38% / 64% 38% 62% 36%", background: "linear-gradient(150deg, #FFE9A8 0%, #F2C24E 42%, #6CE0FF 100%)", boxShadow: "0 0 34px rgba(108,224,255,0.55), inset 0 0 26px rgba(255,255,255,0.5)" }} />
            <div style={{ position: "absolute", left: "20%", top: "14%", width: 5, height: "72%", background: "rgba(255,255,255,0.6)", borderRadius: 4, transform: "rotate(14deg)" }} />
            <div style={{ position: "absolute", left: "42%", top: "20%", width: 5, height: "60%", background: "rgba(255,255,255,0.45)", borderRadius: 4, transform: "rotate(18deg)" }} />
          </div>
        );
      })}

      {/* ============ vertical evolution light streaks (during the white flash) ============ */}
      {evoP > 0.02 && [0.16, 0.34, 0.5, 0.66, 0.84].map((fx, i) => (
        <div key={`ls${i}`} style={{ position: "absolute", left: CX - 210 + (fx - 0.5) * 460, top: 90, width: 8 + (i % 2) * 5, height: 620, background: "linear-gradient(180deg, rgba(255,255,255,0), rgba(255,246,220,0.85), rgba(255,255,255,0))", opacity: evoP * 0.6, borderRadius: 6, pointerEvents: "none", zIndex: 30 }} />
      ))}

      {/* ============ THE HERO (same Claude Trainer, evolving in place) ============ */}
      <div style={{ position: "absolute", left: CX - heroSz / 2, top: heroTop, transform: `translate(${shake}px, ${heroFloat}px) scale(${heroScale})`, transformOrigin: "50% 100%", zIndex: 20 }}>
        <Mascot lf={lf} size={heroSz} trainer={1} cheer={evolved} shock={Math.max(0, evoUp - evolved) * 0.55} nodAmp={4} nodSpeed={evolved > 0.3 ? 7 : 9} />
      </div>

      {/* ============ floating LEGENDARY crown above the head ============ */}
      {crownIn > 0.01 && (
        <div style={{ position: "absolute", left: CX - 56, top: heroTop - 60 + Math.sin(lf / 10) * 4, width: 112, height: 60, transform: `scale(${crownIn})`, transformOrigin: "50% 100%", opacity: crownIn, zIndex: 24 }}>
          <svg width={112} height={60} viewBox="0 0 112 60" style={{ overflow: "visible" }}>
            <path d="M8 54 L14 20 L34 40 L56 10 L78 40 L98 20 L104 54 Z" fill="url(#cg)" stroke="#B98A25" strokeWidth={2.4} />
            <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FCE79E" /><stop offset="1" stopColor="#E2A62E" /></linearGradient></defs>
            <rect x={8} y={50} width={96} height={9} rx={3} fill="#D89A2A" stroke="#B98A25" strokeWidth={2} />
            <circle cx={56} cy={30} r={6} fill="#F35B8E" stroke="#fff" strokeWidth={1.5} />
            <circle cx={30} cy={40} r={4} fill="#6CE0FF" /><circle cx={82} cy={40} r={4} fill="#7C63E8" />
          </svg>
        </div>
      )}

      {/* ============ SAME MODEL callout pill (phase A — under the base form) ============ */}
      {pillA > 0.01 && (
        <div style={{ position: "absolute", left: CX - 165, top: 322, width: 330, textAlign: "center", opacity: pillA, transform: `translateY(${(1 - pillA) * -12}px)`, zIndex: 26 }}>
          <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: 12, background: "linear-gradient(180deg,#3A4A63,#26303F)", border: "3px solid #F4F0E8", boxShadow: "0 6px 0 rgba(0,0,0,0.26)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: "#FFF6EE", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>SAME MODEL UNDERNEATH</div>
        </div>
      )}

      {/* ============ system motes converging + merging into the hero ============ */}
      {motes.map((m, i) => {
        const cp = over(lf, fr(2.2) + i * fr(0.1), fr(1.1), Easing.in(Easing.cubic));
        if (lf < fr(2.2) + i * fr(0.1) || cp >= 0.999) return null;
        const x = m.sx + cp * (CX - m.sx);
        const y = m.sy + cp * (chestY - m.sy);
        const op = cp < 0.78 ? 1 : Math.max(0, (1 - cp) / 0.22);
        const sc = 1 - cp * 0.45;
        return (
          <div key={`mo${i}`} style={{ position: "absolute", left: x - 60, top: y - 20, width: 120, textAlign: "center", opacity: op, transform: `scale(${sc})`, zIndex: 18 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, background: PK.steel, border: `2.5px solid ${m.c}`, boxShadow: `0 0 16px ${m.c}88`, fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 1, color: "#EAF0F7", whiteSpace: "nowrap" }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: m.c, boxShadow: `0 0 8px ${m.c}` }} />{m.t}
            </div>
          </div>
        );
      })}

      {/* ============ reveal burst ring ============ */}
      {ringO > 0.01 && (
        <div style={{ position: "absolute", left: CX - ringSz / 2, top: chestY - ringSz / 2, width: ringSz, height: ringSz, borderRadius: "50%", border: `${Math.max(4, 12 * ringO)}px solid rgba(255,240,190,${ringO})`, boxShadow: `0 0 ${24 + ringP * 40}px rgba(255,206,110,${ringO * 0.85})`, opacity: ringO, zIndex: 28, pointerEvents: "none" }} />
      )}

      {/* ============ big anime cross-flares at the reveal instant ============ */}
      {flareO > 0.01 && [0, 45, 90, 135].map((ang, i) => (
        <div key={`fl${i}`} style={{ position: "absolute", left: CX, top: chestY, width: i % 2 ? 340 : 560, height: i % 2 ? 6 : 9, marginLeft: (i % 2 ? -170 : -280), marginTop: -4, transformOrigin: "50% 50%", transform: `rotate(${ang}deg)`, background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95) 50%, rgba(255,255,255,0))", opacity: flareO * (i % 2 ? 0.7 : 1), zIndex: 31, pointerEvents: "none", borderRadius: 6 }} />
      ))}

      {/* ============ evolved sparkles orbiting the legendary ============ */}
      {evolved > 0.1 && Array.from({ length: 9 }, (_, k) => {
        const a = (k / 9) * Math.PI * 2 + lf / 40;
        const r = 150 + Math.sin(lf / 12 + k) * 12;
        const sx = CX + Math.cos(a) * r, sy = chestY + Math.sin(a) * r * 0.82;
        const tw = 0.5 + 0.5 * Math.sin(lf / 6 + k * 1.7);
        return (
          <div key={`sk${k}`} style={{ position: "absolute", left: sx - 11, top: sy - 11, opacity: evolved * (0.4 + tw * 0.6), zIndex: 22 }}>
            <svg width={22} height={22} viewBox="0 0 22 22"><path d="M11 1 L12.7 9.3 L21 11 L12.7 12.7 L11 21 L9.3 12.7 L1 11 L9.3 9.3 Z" fill={k % 2 ? "#FFF0C4" : "#BFF3FF"} /></svg>
          </div>
        );
      })}

      {/* ============ the EvoGlow white overlay + sharp reveal flash ============ */}
      <EvoGlow p={evoP} />
      {flashO > 0.01 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 46%, rgba(255,255,255,0.95), rgba(255,246,220,0.4) 40%, rgba(255,255,255,0) 70%)", opacity: flashO, zIndex: 33, pointerEvents: "none" }} />}

      {/* ============ nameplate banner (the payoff readout — plays like the unreleased legendary) ============ */}
      {plateIn > 0.01 && (
        <div style={{ position: "absolute", left: CX - 372, top: 604, width: 744, opacity: plateIn, transform: `translateY(${(1 - plateIn) * 18}px)`, borderRadius: 16, background: "linear-gradient(180deg,#2E3A52,#1B2338)", border: "3px solid #E7B24C", boxShadow: "0 14px 0 rgba(0,0,0,0.24), inset 0 2px 0 rgba(255,255,255,0.12)", padding: "12px 18px 13px", zIndex: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#FFF6EE", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>CLAUDE <span style={{ color: "#F2C24E" }}>· SYSTEM FORM</span></span>
            <div style={{ display: "flex", gap: 6 }}><TypeBadge t="DRAGON" sz={0.9} /><TypeBadge t="PSYCHIC" sz={0.9} /><TypeBadge t="STEEL" sz={0.9} /></div>
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 15.5, color: "#DCE6F4", lineHeight: 1.3 }}>Same model underneath. The <span style={{ color: "#F2C24E", fontWeight: 800 }}>system</span> is the entire difference — it runs like a version that isn't out yet.</div>
            <StatBar label="POWER" pct={power} col="#F2C24E" w={210} />
          </div>
        </div>
      )}
    </Panel>
  );
};

const R8: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- beats (panel-local, every start wrapped in fr()) — VO-LOCKED, DO NOT RETIME ----
  const ballDrop = over(lf, fr(0.15), fr(0.62), Easing.out(Easing.back(1.7)));   // hero pokeball drops in
  const landFlash = over(lf, fr(0.5), fr(0.55));                                  // evolution flash on land
  const flashP = lf < fr(0.5) ? 0 : Math.max(0, 0.4 - landFlash * 0.4);          // brief, never white-out
  const tagIn = over(lf, fr(0.9), fr(0.46), Easing.out(Easing.back(1.5)));
  const arrowIn = over(lf, fr(1.12), fr(0.42));
  const barIn = over(lf, fr(1.28), fr(0.55), Easing.out(Easing.back(1.4)));
  const wordIn = over(lf, fr(1.62), fr(0.42), Easing.out(Easing.back(2.0)));
  const followIn = over(lf, fr(2.2), fr(0.52), Easing.out(Easing.back(1.5)));
  const cheer = over(lf, fr(0.55), fr(0.85));

  // ---- hero pokeball geometry (center lane) ----
  const cx = 506;
  const ballSz = 156;
  const ballBob = ballDrop >= 0.985 ? Math.sin(lf / 12) * 5 : 0;
  const ballY = 132 - (1 - ballDrop) * 70 + ballBob;
  const ballX = cx - ballSz / 2;
  const ballWob = over(lf, fr(0.5), fr(1.0));                    // wobble once, then settle
  const ballCY = ballY + ballSz / 2;
  const auraPulse = 1 + Math.sin(lf / 9) * 0.05;
  const wordPulse = 1 + Math.sin(lf / 7) * 0.045;
  const arrowBob = Math.sin(lf / 6) * 7;

  // sparkle burst around the ball (decorative, solid)
  const spark = [[-104, -18, 1], [98, 6, 0.85], [-62, 92, 0.7], [86, 96, 0.8], [0, -110, 0.9], [-118, 62, 0.62]];

  // side celebration pokeballs (own explicit x, side zones only)
  const sideBalls: [number, number, number, number][] = [[54, 250, 56, 0.0], [96, 468, 48, 1.1], [902, 246, 56, 0.6], [864, 468, 48, 1.6]];

  // ---- champion podium reveal + winners bounce ----
  const podium = over(lf, fr(0.5), fr(0.7), Easing.out(Easing.back(1.4)));
  const pikaJump = cheer > 0.1 ? Math.abs(Math.sin(lf / 8 + 0.6)) * 10 : 0;
  const foxJump = cheer > 0.1 ? Math.abs(Math.sin(lf / 9 + 1.4)) * 8 : 0;

  // ---- falling victory confetti streamers (background rain) ----
  const confetti = [...Array(16)].map((_, i) => {
    const sx = 40 + seed(i * 3.1) * 940;
    const spd = 1.1 + seed(i * 7.7) * 1.5;
    const yy = ((seed(i * 2.3) * 900 + lf * spd * 4) % 900) - 60;
    const cols = ["#F35B8E", "#4C90F0", "#F2C12C", "#57C24A", "#EE5A4E", "#FFF3E0"];
    return { sx: sx + Math.sin(lf / 7 + i) * 22, yy, cc: cols[i % cols.length], i, spin: lf * 7 + i * 50, tall: i % 3 === 0 };
  });

  return (
    <Panel label="GOTTA CATCH IT" tint="rgba(226,59,46,0.36)">
      {/* ================= CHAMPION VICTORY STADIUM (own distinct bg) ================= */}
      {/* triumphant sky: deep royal -> magenta -> victory gold */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#241B54 0%,#3B2C78 24%,#7A3E86 46%,#C25E6E 64%,#EC9A5A 82%,#FBD98A 100%)" }} />
      {/* rotating sunburst disc behind center (comic victory rays) */}
      <div style={{ position: "absolute", left: "50%", top: 210, width: 1500, height: 1500, marginLeft: -750, marginTop: -750, borderRadius: "50%", transform: `rotate(${lf * 0.25}deg)`, background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,238,176,0.16) 0deg 6deg, rgba(255,238,176,0) 6deg 13deg)", zIndex: 0 }} />
      {/* central radial gold glow */}
      <div style={{ position: "absolute", left: "50%", top: 210, width: 820, height: 820, marginLeft: -410, marginTop: -410, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,182,0.5) 0%, rgba(255,200,112,0.26) 34%, rgba(255,200,112,0) 66%)", zIndex: 1 }} />
      {/* two stadium spotlight beams sweeping from top corners */}
      {[[70, -1], [942, 1]].map(([bx, dir], i) => (
        <div key={i} style={{ position: "absolute", left: bx as number, top: -20, width: 150, height: 560, transformOrigin: "50% 0%", transform: `rotate(${(dir as number) * (18 + Math.sin(lf / 42 + i) * 7)}deg)`, clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", background: "linear-gradient(180deg, rgba(255,246,206,0.34) 0%, rgba(255,246,206,0.10) 46%, rgba(255,246,206,0) 100%)", zIndex: 1 }} />
      ))}
      {/* stadium crowd tiers on far left + right edges (silhouette + waving dot crowd) */}
      {[46, 918].map((tx, side) => (
        <div key={side} style={{ position: "absolute", left: tx, top: 120, width: 52, height: 300, borderRadius: side ? "40% 12% 12% 40% / 12%" : "12% 40% 40% 12% / 12%", background: "linear-gradient(180deg,#2B1C4E,#1B1236)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.06)", zIndex: 1, overflow: "hidden" }}>
          {[...Array(24)].map((_, k) => {
            const col = k % 3, row = Math.floor(k / 3);
            const cols = ["#F2C12C", "#EE5A4E", "#4C90F0", "#57C24A", "#F35B8E", "#FFF3E0"];
            return <div key={k} style={{ position: "absolute", left: 8 + col * 15, top: 16 + row * 34 + Math.sin(lf / 8 + k * 1.3) * 4, width: 11, height: 11, borderRadius: "50%", background: cols[(k + side) % cols.length], boxShadow: "0 1px 0 rgba(0,0,0,0.3)" }} />;
          })}
        </div>
      ))}
      {/* bunting pennant garland across the top */}
      <svg width={1012} height={70} viewBox="0 0 1012 70" style={{ position: "absolute", left: 0, top: 62, zIndex: 2 }}>
        <path d="M20 8 Q506 40 992 8" fill="none" stroke="#F4E7C8" strokeWidth={3} />
        {[...Array(15)].map((_, i) => {
          const t = i / 14; const px = 20 + t * 972; const py = 8 + Math.sin(t * Math.PI) * 32;
          const cols = ["#EE5A4E", "#F2C12C", "#4C90F0", "#57C24A"];
          return <path key={i} d={`M${px - 15} ${py} L${px + 15} ${py} L${px} ${py + 30} Z`} fill={cols[i % 4]} stroke="rgba(0,0,0,0.22)" strokeWidth={1.4} />;
        })}
      </svg>
      {/* 3-tier CHAMPION podium (bottom center) */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, opacity: podium, transform: `translateY(${(1 - podium) * 40}px)`, zIndex: 3 }}>
        {/* silver (left, 2nd) */}
        <div style={{ position: "absolute", left: 290, bottom: 32, width: 128, height: 54, background: "linear-gradient(180deg,#D6DBE4,#9AA4B4)", borderRadius: "8px 8px 0 0", border: "3px solid #6E7889", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.5)" }}>
          <span style={{ position: "absolute", left: "50%", top: 14, transform: "translateX(-50%)", fontFamily: mono, fontWeight: 900, fontSize: 26, color: "#5A6373" }}>2</span>
        </div>
        {/* bronze (right, 3rd) */}
        <div style={{ position: "absolute", left: 594, bottom: 32, width: 128, height: 46, background: "linear-gradient(180deg,#E0A46A,#B5763C)", borderRadius: "8px 8px 0 0", border: "3px solid #8A5626", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.4)" }}>
          <span style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(-50%)", fontFamily: mono, fontWeight: 900, fontSize: 24, color: "#7A4E22" }}>3</span>
        </div>
        {/* gold (center, 1st, tallest) */}
        <div style={{ position: "absolute", left: "50%", bottom: 32, width: 156, height: 72, marginLeft: -78, background: "linear-gradient(180deg,#F7DE7E,#DBA83A)", borderRadius: "10px 10px 0 0", border: "3px solid #B4832A", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.6), 0 0 26px rgba(247,206,102,0.5)" }}>
          <svg width={26} height={26} viewBox="0 0 24 24" style={{ position: "absolute", left: 12, top: 12 }}><path d="M12 1 L14.6 8.6 L22.6 8.9 L16.2 13.8 L18.5 21.5 L12 16.9 L5.5 21.5 L7.8 13.8 L1.4 8.9 L9.4 8.6 Z" fill="#FFF6D6" stroke="#B4832A" strokeWidth={1} /></svg>
          <span style={{ position: "absolute", right: 14, top: 16, fontFamily: mono, fontWeight: 900, fontSize: 34, color: "#9A6E1E", textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}>1</span>
        </div>
        {/* stage floor lip */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: "linear-gradient(180deg,#2A1A3E,#170D24)" }} />
      </div>

      {/* transient evolution flash on ball land */}
      <EvoGlow p={flashP} />

      {/* ---- falling confetti rain (background) ---- */}
      {confetti.map((c) => (
        <div key={c.i} style={{ position: "absolute", left: c.sx, top: c.yy, width: c.tall ? 8 : 13, height: c.tall ? 22 : 13, borderRadius: c.tall ? 3 : 4, background: c.cc, transform: `rotate(${c.spin}deg)`, boxShadow: "0 2px 0 rgba(0,0,0,0.18)", zIndex: 2 }} />
      ))}

      <SceneAtmo lf={lf} preset="cta" />
      <PkSlug text="THE WHOLE TRICK" />

      {/* ---- side celebration pokeballs (bounce, side zones) ---- */}
      {sideBalls.map(([bx, by, bsz, ph], i) => (
        <Pokeball key={i} x={bx} y={by + Math.sin(lf / 10 + ph) * 9} sz={bsz} wobble={(lf % 90) / 90} hue={i % 2 ? "#E8403A" : "#E23B2E"} />
      ))}

      {/* ================= HERO POKEBALL + aura (center top) ================= */}
      <div style={{ position: "absolute", left: cx - 168, top: ballCY - 168, width: 336, height: 336, borderRadius: "50%", transform: `scale(${(0.6 + ballDrop * 0.4) * auraPulse})`, background: "radial-gradient(circle, rgba(247,206,102,0.62) 0%, rgba(240,150,60,0.34) 38%, rgba(240,150,60,0) 68%)", opacity: ballDrop, zIndex: 4 }} />
      {/* sunburst rays behind the ball */}
      {ballDrop > 0.4 && [0, 30, 60, 90, 120, 150].map((a) => (
        <div key={a} style={{ position: "absolute", left: cx - 3, top: ballCY - 150, width: 6, height: 300, transformOrigin: "50% 50%", transform: `rotate(${a + lf * 0.5}deg)`, background: "linear-gradient(180deg, rgba(247,206,102,0) 0%, rgba(247,206,102,0.4) 50%, rgba(247,206,102,0) 100%)", opacity: (ballDrop - 0.4) * 1.5, zIndex: 3 }} />
      ))}
      {/* laurel wreath hugging the hero ball (championship) */}
      {ballDrop > 0.55 && [-1, 1].map((s) => (
        <svg key={s} width={96} height={188} viewBox="0 0 60 120" style={{ position: "absolute", left: cx + s * 96 - 48, top: ballCY - 94, transform: `scaleX(${s})`, opacity: (ballDrop - 0.55) * 2.2, zIndex: 5 }}>
          <path d="M46 8 C 20 24, 12 60, 24 112" fill="none" stroke="#5FA83C" strokeWidth={5} strokeLinecap="round" />
          {[14, 30, 46, 62, 80, 96].map((ly, k) => <ellipse key={k} cx={38 - k * 2.4} cy={ly} rx={9} ry={5} fill="#6FB84A" stroke="#3C8A2C" strokeWidth={1.2} transform={`rotate(${-40 + k * 4} ${38 - k * 2.4} ${ly})`} />)}
        </svg>
      ))}
      <div style={{ zIndex: 8 }}>
        <Pokeball x={ballX} y={ballY} sz={ballSz} wobble={ballWob} hue="#E23B2E" />
      </div>
      {/* sparkles ringing the ball */}
      {ballDrop > 0.6 && spark.map(([sx, sy, ss], i) => {
        const tw = 0.7 + Math.sin(lf / 5 + i * 1.7) * 0.3;
        return (
          <svg key={i} width={26 * (ss as number)} height={26 * (ss as number)} viewBox="0 0 24 24" style={{ position: "absolute", left: cx + (sx as number) - 13 * (ss as number), top: ballCY + (sy as number) - 13 * (ss as number), transform: `scale(${tw})`, zIndex: 9 }}>
            <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#FFF6D6" stroke="#F0C040" strokeWidth={1} />
          </svg>
        );
      })}

      {/* ---- reward tag under the ball ---- */}
      <div style={{ position: "absolute", left: cx - 150, top: 300, width: 300, textAlign: "center", opacity: tagIn, transform: `translateY(${(1 - tagIn) * -12}px) scale(${0.9 + tagIn * 0.1})`, zIndex: 12 }}>
        <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: 999, backgroundColor: "#1E2740", border: "3px solid #F0C040", boxShadow: "0 6px 0 rgba(0,0,0,0.26), inset 0 2px 0 rgba(255,255,255,0.14)", fontFamily: mono, fontWeight: 900, fontSize: 20, letterSpacing: 2, color: "#FFE9A6", whiteSpace: "nowrap" }}>THE FULL SETUP INSIDE</span>
      </div>

      {/* ---- down chevron pointing to the comment bar ---- */}
      <svg width={44} height={40} viewBox="0 0 24 24" style={{ position: "absolute", left: cx - 22, top: 352 + arrowBob, opacity: arrowIn, zIndex: 12 }}>
        <path d="M4 5 L12 12 L20 5 M4 12 L12 19 L20 12" fill="none" stroke="#FFD34A" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* ================= COMMENT BAR (comment + BALL) ================= */}
      <div style={{ position: "absolute", left: cx - 288, top: 398, width: 576, height: 82, opacity: barIn, transform: `translateY(${(1 - barIn) * 22}px) scale(${0.94 + barIn * 0.06})`, zIndex: 14, borderRadius: 999, background: "linear-gradient(180deg,#FBF6EA,#EFE6D2)", border: "4px solid #2B3550", boxShadow: "0 10px 0 rgba(0,0,0,0.22), inset 0 3px 0 rgba(255,255,255,0.6)", display: "flex", alignItems: "center", padding: "0 14px 0 12px", gap: 12 }}>
        {/* mini trainer avatar */}
        <div style={{ width: 58, height: 58, flexShrink: 0, borderRadius: "50%", background: "radial-gradient(circle at 50% 38%,#EAF6FF,#BFE0F2)", border: "3px solid #2B3550", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%) scale(0.42)", transformOrigin: "50% 0%" }}>
            <Mascot lf={lf} size={120} trainer={1} nodAmp={2} nodSpeed={12} />
          </div>
        </div>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#3A4256", letterSpacing: "-0.01em" }}>comment</span>
        {/* BALL keyword chip (pokeball red) */}
        <div style={{ transform: `scale(${wordIn * wordPulse})`, transformOrigin: "50% 50%" }}>
          <span style={{ display: "inline-block", padding: "8px 22px", borderRadius: 14, background: "linear-gradient(180deg,#EE5A4E,#C42E28 52%,#9A2018)", border: "4px solid #7E1610", boxShadow: "0 6px 0 rgba(0,0,0,0.28), inset 0 3px 0 rgba(255,255,255,0.34)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 1, color: "#FFF3E0", letterSpacing: "0.02em", textShadow: "0 2px 0 rgba(120,10,6,0.6)" }}>&ldquo;BALL&rdquo;</span>
        </div>
        {/* send arrow puck */}
        <div style={{ marginLeft: "auto", width: 50, height: 50, flexShrink: 0, borderRadius: "50%", background: "linear-gradient(180deg,#57C24A,#2E8A3A)", border: "3px solid #1E5E28", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={24} height={24} viewBox="0 0 24 24"><path d="M4 12 H18 M12 6 L19 12 L12 18" fill="none" stroke="#F4FBF6" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>

      {/* ---- live social-proof: replies ticking up (kills the frozen back-half, holds to the end) ---- */}
      {(() => {
        const rin = over(lf, fr(1.7), fr(0.32), Easing.out(Easing.back(2)));
        if (rin < 0.02) return null;
        const n = Math.floor(interpolate(lf, [fr(1.7), fr(2.75)], [0, 247], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        const land = over(lf, fr(2.7), fr(0.26), Easing.out(Easing.back(2.4)));
        const pop = 1 + land * (1 - land) * 1.7;
        return (
          <div style={{ position: "absolute", left: cx + 78, top: 352, zIndex: 20, opacity: rin, transform: `translateY(${(1 - rin) * -14}px) rotate(-3deg) scale(${(0.8 + rin * 0.2) * pop})`, transformOrigin: "0% 100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 15px", borderRadius: 999, background: "linear-gradient(180deg,#5AC94E,#2E8A3A)", border: "3px solid #1E5E28", boxShadow: "0 6px 0 rgba(0,0,0,0.26)" }}>
            <svg width={22} height={22} viewBox="0 0 24 24"><path d="M4 4 h16 v12 h-10 l-4 4 v-4 h-2 z" fill="#F4FBF6" /></svg>
            <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 24, color: "#F4FBF6", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{n} comments</span>
          </div>
        );
      })()}

      {/* ---- FOLLOW badge ---- */}
      <div style={{ position: "absolute", left: cx - 260, top: 500, width: 520, textAlign: "center", opacity: followIn, transform: `translateY(${(1 - followIn) * 16}px) scale(${0.9 + followIn * 0.1})`, zIndex: 14 }}>
        <span style={{ display: "inline-block", padding: "11px 30px", borderRadius: 999, background: "linear-gradient(180deg,#3E6FBF,#2A4C8C)", border: "4px solid #16305E", boxShadow: "0 7px 0 rgba(0,0,0,0.24), inset 0 2px 0 rgba(255,255,255,0.3)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#F2F7FF", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>+ FOLLOW - I send the full setup</span>
      </div>

      {/* ================= WINNERS on the podium ================= */}
      {/* Eevee on the silver step (left) */}
      <div style={{ position: "absolute", left: 300, top: 634 - foxJump, opacity: podium, zIndex: 6 }}>
        <FoxMon x={0} y={0} sz={102} lf={lf} />
      </div>
      {/* Pikachu celebrating on the bronze step (right) */}
      <div style={{ position: "absolute", left: 596, top: 620 - pikaJump, opacity: podium, zIndex: 6 }}>
        <Pikachu x={0} y={0} sz={112} lf={lf} />
      </div>
      {/* Claude TRAINER — champion on the gold #1 step (center) */}
      <div style={{ position: "absolute", left: cx - 90, top: 552, zIndex: 16 }}>
        <Mascot lf={lf} size={178} trainer={1} cheer={cheer} jump={cheer > 0.1 ? Math.abs(Math.sin(lf / 9)) * 0.5 : 0} nodAmp={5} nodSpeed={6} />
      </div>

      {/* trainer-side confetti bursts (own edge rectangles, foreground) */}
      {cheer > 0.3 && [[356, 600, "#F35B8E"], [648, 588, "#4C90F0"], [372, 690, "#F2C12C"], [636, 682, "#57C24A"], [430, 566, "#EE5A4E"], [582, 572, "#FFF3E0"]].map(([px, py, pc], i) => {
        const rise = (Math.sin(lf / 6 + i * 1.5) * 0.5 + 0.5);
        return <div key={i} style={{ position: "absolute", left: px as number, top: (py as number) - rise * 18, width: 14, height: 14, borderRadius: 3, transform: `rotate(${lf * 6 + i * 40}deg)`, background: pc as string, boxShadow: "0 2px 0 rgba(0,0,0,0.2)", zIndex: 15 }} />;
      })}
    </Panel>
  );
};

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const TOTAL = durationInFrames / FPS;
  const milestones = L.slice(1);                                   // 8 scene boundaries -> pokeballs to catch
  const caught = milestones.filter((m) => t >= m).length;
  const lastCatch = caught > 0 ? milestones[caught - 1] : -9;
  const catchPop = Math.max(0, 1 - (t - lastCatch) * 3);
  const GX0 = 6, GX1 = 90;
  const runX = GX0 + p * (GX1 - GX0);
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 264, height: 66, zIndex: 120 }}>
      {/* route rail (grass) + travelled path */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 32, height: 26, borderRadius: 999, background: "linear-gradient(180deg,#8FCF6A,#57A835)", border: "3px solid #3C8A2C", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.32)" }} />
      <div style={{ position: "absolute", left: 3, top: 35, height: 20, width: `calc(${p * 100}% - 6px)`, borderRadius: 999, background: "linear-gradient(180deg,#F2E2A6,#D9BE74)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.45)" }} />
      {/* start marker */}
      <div style={{ position: "absolute", left: -6, top: 30, width: 12, height: 30, borderRadius: 3, background: "linear-gradient(180deg,#C9D2DE,#8B96A6)", border: "2px solid #5E6774" }} />
      {/* milestone pokeballs (caught as passed) */}
      {milestones.map((m, i) => {
        const np = Math.min(0.965, m / TOTAL); const passed = t >= m; const dt = passed ? t - m : 0;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.2) * 0.5 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 45, transform: `translate(-50%,-50%) scale(${pop})` }}>
            <div style={{ position: "relative", width: 21, height: 21, borderRadius: "50%", background: passed ? "linear-gradient(180deg,#F0463A 0 48%,#26262A 48% 54%,#FBF7EF 54% 100%)" : "#5A6570", border: "2px solid #26262A", boxShadow: passed ? `0 0 9px ${GOLD}` : "inset 0 -2px 4px rgba(0,0,0,0.3)" }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 6, transform: "translate(-50%,-50%)", borderRadius: "50%", background: passed ? "#FBF7EF" : "#8A93A0", border: "1.5px solid #26262A" }} />
            </div>
            {passed && dt < 0.6 && <div style={{ position: "absolute", left: "50%", top: "50%", width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + dt * 6})`, opacity: Math.max(0, 1 - dt * 1.8) }} />}
          </div>
        );
      })}
      {/* MASTER BALL at the end (Fable 6 legendary reward, teased/locked) */}
      <div style={{ position: "absolute", right: -26, top: 8, width: 46, height: 46, transform: `translateY(${Math.sin(t * 2.4) * 2.5}px)`, zIndex: 124 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#FBF7EF", border: "3px solid #26262A", overflow: "hidden", boxShadow: `0 0 14px rgba(140,90,230,0.55)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "48%", background: "linear-gradient(180deg,#8B5BE8,#5B2FB0)" }} />
          <div style={{ position: "absolute", left: "50%", top: "20%", width: 10, height: 8, transform: "translateX(-50%)", background: "#E85AA8", clipPath: "polygon(0 100%,20% 0,40% 60%,50% 0,60% 60%,80% 0,100% 100%)" }} />
          <div style={{ position: "absolute", left: "26%", top: "34%", width: 4, height: 4, borderRadius: "50%", background: "#E85AA8" }} />
          <div style={{ position: "absolute", right: "26%", top: "34%", width: 4, height: 4, borderRadius: "50%", background: "#E85AA8" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "44%", height: "10%", background: "#26262A" }} />
        </div>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 13, height: 13, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#FBF7EF", border: "3px solid #26262A" }} />
      </div>
      {/* the Claude TRAINER running the route */}
      <div style={{ position: "absolute", left: `${runX}%`, top: -8, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", width: 54, height: 54, boxShadow: catchPop > 0.05 ? `0 0 ${12 + catchPop * 14}px ${GOLD}` : "0 5px 12px rgba(26,24,19,0.4)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={46} trainer={1} nodAmp={2.2 + catchPop * 2} nodSpeed={5} gaze={2} cheer={catchPop > 0.4 ? 0.5 : 0} /></div>
      </div>
      {/* HUD chip: pokeballs caught */}
      <div style={{ position: "absolute", left: 0, top: -28, display: "flex", alignItems: "center", gap: 6, padding: "3px 11px 3px 6px", borderRadius: 999, background: "#1A2130", border: "2px solid #0E1420", boxShadow: "0 3px 0 rgba(0,0,0,0.3)", transform: `scale(${1 + catchPop * 0.12})`, transformOrigin: "0 50%" }}>
        <div style={{ width: 15, height: 15, borderRadius: "50%", background: "linear-gradient(180deg,#F0463A 0 48%,#26262A 48% 54%,#FBF7EF 54% 100%)", border: "1.5px solid #26262A" }} />
        <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 15, color: "#F4EEE2", letterSpacing: 1 }}>{`x${caught}`}</span>
      </div>
    </div>
  );
};

const SkillHeader: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const marks = [L[1], L[2], L[3], L[4], L[5]];
  const unlocked = marks.filter((b) => t >= b).length;
  const lastUnlock = unlocked > 0 ? marks[unlocked - 1] : -9;
  const pop = Math.max(0, 1 - (t - lastUnlock) * 3);
  // BIGGER + prominent at the start: slam in, then an extra scale + glow for the first ~2.6s, then settle
  const slam = over(f, 0, fr(0.42), Easing.out(Easing.back(1.7)));
  const early = Math.max(0, 1 - t / 2.6); const emph = early * early;
  const scale = 1 + emph * 0.06;
  const glow = 0.35 + emph * 0.55 + 0.08 * Math.sin(t * 3.2);
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 334, height: 62, zIndex: 115, transform: `translateY(${(1 - slam) * -14}px) scale(${scale})`, transformOrigin: "50% 0%", opacity: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px 0 20px", borderRadius: 15, background: grad("#20121A", "#0E0A12"), border: "2.5px solid rgba(214,86,66,0.78)", boxShadow: `0 16px 34px -12px rgba(120,22,22,0.72), 0 0 ${16 + glow * 22}px rgba(214,86,66,${0.28 + glow * 0.22}), inset 0 1px 0 rgba(255,255,255,0.08)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, rgba(214,86,66,0.09) 0 13px, transparent 13px 26px)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 11, position: "relative" }}>
        <div style={{ flexShrink: 0, filter: "drop-shadow(0 2px 5px rgba(120,22,22,0.6))" }}><ClaudeLogo sz={31} color="#F2C14E" /></div>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.004em", color: "#F8ECE3", textShadow: `0 2px 10px rgba(0,0,0,0.55), 0 0 ${7 + glow * 10}px rgba(240,122,84,${0.35 + glow * 0.3})`, whiteSpace: "nowrap" }}>TURN <span style={{ color: "#F27A54" }}>CLAUDE</span> INTO FABLE&nbsp;6</span>
        <span style={{ padding: "3px 9px", borderRadius: 7, background: "linear-gradient(180deg,#F2C14E,#D79A2E)", border: "2px solid #8A5C15", fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: 1, color: "#3A2607", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>AI</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", position: "relative" }}>
        {[0, 1, 2, 3, 4].map((i) => { const on = i < unlocked; const now = i === unlocked - 1; return (
          <div key={i} style={{ width: 24, height: 32, borderRadius: 6, transform: `scale(${now ? 1 + pop * 0.42 : 1})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 16, fontWeight: 900, background: on ? grad("#3F9E74", "#2C7150") : "#241319", border: `2px solid ${on ? "#63C79A" : "rgba(214,86,66,0.55)"}`, color: on ? "#EAFBF1" : "#8A5C64", boxShadow: on && now && pop > 0.05 ? `0 0 ${9 + pop * 12}px #3F9E74` : "none" }}>{on ? "✓" : i + 1}</div>); })}
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


// ===================== MAIN =====================
export const ClaudePokeballReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.4, 1.4, 2.2, 3.2, 4.1,
    L[1] + 1.9, L[1] + 4.3, L[1] + 6.7,
    L[2] + 0.7, L[2] + 2.68,
    L[3] + 1.62, L[3] + 3.4,
    L[4] + 2.4, L[4] + 4.14,
    L[5] + 2.35, L[5] + 3.4,
    L[6] + 5.4, L[6] + 6.4, L[6] + 8.25, L[6] + 10.1, L[6] + 11.95, L[6] + 13.2,
    L[7] + 5.2, L[7] + 8.0,
    L[8] + 1.62, L[8] + 3.3];
  // peak beats punch harder (KO / reveal / SHIPPED / keyword) for escalation
  const HARD = [L[1] + 6.7, L[4] + 4.14, L[6] + 5.4, L[6] + 13.2, L[7] + 5.2, L[8] + 1.62];
  for (const k of KICKS) { const d = frame - fr(k); const w = HARD.includes(k) ? 1.0 : 0.66; if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * w); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.045;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("pokeball_vo.wav")} volume={1.42} />
      <Audio loop src={staticFile("pk_music.wav")} volume={(ff) => interpolate(ff, [0, fr(0.8), fr(22.9), fr(23.6), fr(31.0), fr(31.6), fr(L[6] - 0.4), fr(L[6] + 0.3), fr(CUT), 99999], [0, 0.066, 0.066, 0.028, 0.028, 0.056, 0.056, 0.05, 0.046, 0.046], { extrapolateRight: "clamp" })} />
      {/* ambient beds — subtle per-scene atmosphere under the VO */}
      <Audio loop src={staticFile("amb_breeze.wav")} volume={(ff) => ambEnv(ff, [[L[0], L[2]], [L[7], CUT]], 0.036)} />
      <Audio loop src={staticFile("amb_crowd.wav")} volume={(ff) => ambEnv(ff, [[L[2], L[3]], [L[6], L[7]], [L[8], CUT]], 0.028)} />
      <Audio loop src={staticFile("amb_hum.wav")} volume={(ff) => ambEnv(ff, [[L[3], L[6]]], 0.036)} />
      {/* boundary swishes on every scene cut */}
      {L.slice(1).map((tt, i) => <React.Fragment key={`b${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.4} /><Sfx at={tt + 0.22} src="pop.wav" v={0.22} dur={0.6} /></React.Fragment>)}
      {/* ============ POKEMON SFX LAYER (keyed to the 9-scene beats) ============ */}
      {/* S0 HOOK: riser -> pokeball throw + wobble + GOTCHA on the "build it yourself" reveal */}
      {/* GIANT POKEBALL cold-open: soft riser -> ONE clean slam -> soft crack-open shimmer (kept minimal — not obnoxious) */}
      <Sfx at={0.0} src="riser.wav" v={0.22} dur={1.3} />
      <Sfx at={0.04} src="swooshdn.wav" v={0.24} dur={0.32} /><Sfx at={0.3} src="boom.wav" v={0.36} dur={0.6} />
      <Sfx at={0.56} src="lib_magic_reveal.wav" v={0.26} dur={0.7} />
      {/* S0 catch a WILD PIKACHU: appear -> throw -> absorb (real ball-open) -> wobble -> GOTCHA (all -0.40s: dead leading silence trimmed) */}
      <Sfx at={2.18} src="pk_select.wav" v={0.3} dur={0.14} />
      <Sfx at={2.8} src="pk_throw.wav" v={0.42} dur={0.3} /><Sfx at={2.84} src="swish.wav" v={0.3} dur={0.3} />
      <Sfx at={3.1} src="pk_open_real.wav" v={0.4} dur={0.6} /><Sfx at={3.12} src="pop.wav" v={0.24} dur={0.3} />
      <Sfx at={3.22} src="pk_wobble.wav" v={0.36} dur={1.0} />
      <Sfx at={3.1} src="thock.wav" v={0.36} dur={0.2} /><Sfx at={3.92} src="ding.wav" v={0.34} dur={0.4} />
      <Sfx at={4.1} src="pk_caught.wav" v={0.46} dur={0.9} /><Sfx at={4.12} src="sparkle.wav" v={0.34} dur={0.6} /><Sfx at={4.16} src="ding.wav" v={0.3} dur={0.4} />
      {/* S1 PROBLEM: soft negative blips on the 3 ailments + a faint on "alone" */}
      {[0.9,2.4,3.8].map((t,i)=><Sfx key={`p1${i}`} at={L[1]+t} src="thock.wav" v={0.24} dur={0.3} />)}
      <Sfx at={L[1]+4.0} src="pk_faint.wav" v={0.26} dur={0.5} />
      {/* S2 BUILD: banner slam + slots light up */}
      <Sfx at={L[2]+0.15} src="boom.wav" v={0.36} dur={0.5} /><Sfx at={L[2]+0.18} src="swooshup.wav" v={0.28} dur={0.4} />
      {[1.2,1.9,2.6,3.3].map((t,i)=><Sfx key={`p2${i}`} at={L[2]+t} src="pk_select.wav" v={0.24} dur={0.12} />)}
      {/* S3 MEMORY: equip chime + stat fill level-up */}
      <Sfx at={L[3]+0.5} src="pk_throw.wav" v={0.22} dur={0.3} /><Sfx at={L[3]+0.9} src="pk_levelup.wav" v={0.34} dur={0.45} /><Sfx at={L[3]+1.6} src="pk_caught.wav" v={0.26} dur={0.7} />
      <Sfx at={L[3]+2.8} src="lib_riser.wav" v={0.22} dur={0.9} /><Sfx at={L[3]+3.6} src="ding.wav" v={0.28} dur={0.4} />
      {/* S3 stat numbers LAND */}
      <Sfx at={L[3]+3.2} src="ding.wav" v={0.3} dur={0.35} />
      {/* S4 MCP: wiring clicks + writes-its-own-move level-up */}
      {[0.6,1.1,1.6].map((t,i)=><Sfx key={`p4${i}`} at={L[4]+t} src="pk_select.wav" v={0.24} dur={0.12} />)}
      {/* S4 "system live" surge (fills the plateau) */}
      <Sfx at={L[4]+2.35} src="pk_levelup.wav" v={0.3} dur={0.45} /><Sfx at={L[4]+2.36} src="swooshup.wav" v={0.22} dur={0.4} />
      {/* S5 THUNDERBOLT shockwave on the deploy peak */}
      <Sfx at={L[5]+2.35} src="boom.wav" v={0.26} dur={0.4} /><Sfx at={L[5]+2.37} src="pk_levelup.wav" v={0.26} dur={0.4} />
      <Sfx at={L[4]+4.6} src="pk_levelup.wav" v={0.3} dur={0.45} /><Sfx at={L[4]+4.65} src="sparkle.wav" v={0.26} dur={0.5} />
      {/* S5 TEAM+LOOP: 20 specialists deploy (rapid blips) + auto-heal loop */}
      {[0.4,0.7,1.0,1.3,1.6,1.9,2.2].map((t,i)=><Sfx key={`p5${i}`} at={L[5]+t} src="pk_throw.wav" v={0.16} dur={0.2} />)}
      {[3.4,4.2,5.0].map((t,i)=><Sfx key={`p5h${i}`} at={L[5]+t} src="pk_heal.wav" v={0.24} dur={0.6} />)}
      <Sfx at={L[5]+6.2} src="lib_riser.wav" v={0.24} dur={1.0} />
      {/* S6 BATTLE (peak): riser -> hits -> plain Claude FAINTS -> 4 sweep moves -> SHIPPED */}
      <Sfx at={L[6]-0.6} src="lib_riser.wav" v={0.3} dur={0.9} /><Sfx at={L[6]+0.2} src="boom.wav" v={0.34} dur={0.5} /><Sfx at={L[6]+0.1} src="pk_battle_real.wav" v={0.2} dur={0.5} />
      <Sfx at={L[6]+2.6} src="pk_hit.wav" v={0.3} dur={0.2} /><Sfx at={L[6]+3.8} src="pk_faint.wav" v={0.36} dur={0.5} /><Sfx at={L[6]+3.85} src="among_us.mp3" v={0.16} dur={0.8} />
      {[6.0,7.6,9.2,10.8].map((t,i)=><React.Fragment key={`p6${i}`}><Sfx at={L[6]+t} src="pk_hit.wav" v={0.26} dur={0.2} /><Sfx at={L[6]+t+0.04} src="pk_levelup.wav" v={0.2} dur={0.35} /></React.Fragment>)}
      {/* SPLIT ACROSS TEAM: 3 teammates land turn-based hits (real battle sfx) */}
      {[8.55,9.14,9.72].map((t,i)=><React.Fragment key={`sph${i}`}><Sfx at={L[6]+t} src="pk_hit.wav" v={0.38} dur={0.2} /><Sfx at={L[6]+t} src="pk_battle_real.wav" v={0.24} dur={0.32} /><Sfx at={L[6]+t+0.02} src="thock.wav" v={0.22} dur={0.2} /></React.Fragment>)}
      <Sfx at={L[6]+12.4} src="pk_caught.wav" v={0.34} dur={0.8} /><Sfx at={L[6]+12.4} src="cash-register.mp3" v={0.2} dur={0.6} />
      {/* S7 EVOLUTION: the iconic evolution shimmer + bloom */}
      <Sfx at={L[7]+0.3} src="lib_riser.wav" v={0.3} dur={2.0} /><Sfx at={L[7]+2.3} src="pk_evolve.wav" v={0.42} dur={1.4} /><Sfx at={L[7]+2.4} src="lib_magic_reveal.wav" v={0.3} dur={0.9} /><Sfx at={L[7]+3.7} src="chimehi.wav" v={0.3} dur={0.7} />
      {/* S8 CTA: re-hook riser -> pokeball drop + GOTCHA cheer */}
      <Sfx at={L[8]-0.9} src="lib_riser.wav" v={0.32} dur={1.1} /><Sfx at={L[8]+0.15} src="pk_throw.wav" v={0.3} dur={0.3} /><Sfx at={L[8]+0.42} src="pk_open_real.wav" v={0.34} dur={0.6} /><Sfx at={L[8]+0.5} src="pk_caught.wav" v={0.4} dur={0.9} /><Sfx at={L[8]+0.5} src="crowd_cheer.wav" v={0.24} dur={1.2} /><Sfx at={L[8]+1.6} src="pk_select.wav" v={0.26} dur={0.14} />
      <Sfx at={L[8]+1.7} src="pop.wav" v={0.24} dur={0.3} /><Sfx at={L[8]+2.7} src="ding.wav" v={0.3} dur={0.4} />
      
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {(() => {
          const SC = [R0, R1, R2, R3, R4, R5, R6, R7, R8];
          const TW = 8; // transition window (frames) — snappy swipe
          return SC.map((Comp, i) => {
            const start = Lf[i];
            const end = i === SC.length - 1 ? 1e9 : Lf[i + 1] + TW;
            if (frame < start || frame >= end) return null;
            // enter: slide in from the right (first scene never slides)
            const inRaw = i === 0 ? 1 : Math.min(1, Math.max(0, (frame - start) / TW));
            // exit: slide out to the left as the next scene begins
            const outRaw = i === SC.length - 1 ? 0 : Math.min(1, Math.max(0, (frame - Lf[i + 1]) / TW));
            const inE = interpolate(inRaw, [0, 1], [0, 1], { easing: Easing.out(Easing.cubic) });
            const outE = interpolate(outRaw, [0, 1], [0, 1], { easing: Easing.in(Easing.cubic) });
            // cross-PUNCH: incoming punches in small->full (from the right); outgoing punches out big->gone (to the left)
            const x = (1 - inE) * 72 - outE * 84;                   // px (directional hint, minimal overlap)
            const sc = (0.86 + inE * 0.14) * (1 + outE * 0.13);
            const op = (i === 0 ? 1 : inE) * (1 - outE);
            const blur = ((1 - inRaw) + outRaw) * 6;                // motion blur during the punch
            return (
              <AbsoluteFill key={i} style={{ transform: `translateX(${x.toFixed(1)}px) scale(${sc.toFixed(3)})`, opacity: op, filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined, willChange: "transform, opacity, filter" }}>
                <Comp lf={frame - start} />
              </AbsoluteFill>
            );
          });
        })()}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      <SkillHeader />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 5) fl = Math.max(fl, Math.pow(1 - d / 5, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.3, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
