import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_stack.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, rehook, haiku, opus, wizard, gate, cta
const L = [0, 9.68, 13.94, 19.30, 23.66, 28.26, 36.58];
const Lf = L.map(fr);
const CUT = 41.42;                 // loop cut mid "to"
const CLOCK_START = CUT - 5;       // snack lane runs to the cut
const BURST = CUT + 1;             // never reached (loop-cut ships mid-count)

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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0 }) => {
  const C = "#D97757";
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
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
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
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};

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
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-52%)", fontSize: 13, opacity: 0.9 }}>{gateGlow > 0.05 ? "🔓" : "🔒"}</div>
        </div>
      );
    })}
  </>);
};

// job card (the thing that moves through the pyramid)
const JobCard: React.FC<{ label?: string; hot?: number; w?: number }> = ({ label = "job", hot = 0, w = 92 }) => (
  <div style={{ width: w, borderRadius: 10, background: hot > 0.5 ? "rgba(196,74,58,0.2)" : PAPER, border: `2.5px solid ${hot > 0.5 ? "#E58072" : "#C9BCA4"}`, padding: "7px 0 5px", textAlign: "center", boxShadow: hot > 0.5 ? `0 0 18px ${RED}88` : "0 10px 22px -8px rgba(10,16,34,0.5)" }}>
    <div style={{ fontSize: 24, lineHeight: 1 }}>{hot > 0.5 ? "🔥" : "📋"}</div>
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

// ---------------- HOOK: luxury answer, penny price (no pyramid yet) ----------------
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const retagAt = fr(2.0);
  const retag = over(lf, retagAt, fr(0.3), Easing.out(Easing.back(2.2)));
  const stampAt = fr(3.3);
  const stamp = over(lf, stampAt, fr(0.3), Easing.out(Easing.back(2)));
  const shakeE = Math.max(lf >= retagAt ? Math.max(0, 1 - (lf - retagAt) / 9) : 0, lf >= stampAt ? Math.max(0, 1 - (lf - stampAt) / 9) : 0);
  const shake = Math.sin(lf * 3.4) * 7 * shakeE;
  const nameAt = fr(4.95);
  const nameIn = over(lf, nameAt, fr(0.4), Easing.out(Easing.back(1.6)));
  const miniAt = [fr(6.35), fr(6.9), fr(7.45)];
  const goldAt = fr(8.1);
  const goldIn = over(lf, goldAt, fr(0.4), Easing.out(Easing.back(2)));
  return (
    <Panel label="not in the docs">
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
        {/* header (mute hook), swaps to the nameplate */}
        {nameIn < 0.5 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 46, textAlign: "center", zIndex: 31, opacity: 1 - nameIn * 2 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: "#F4EEE2", letterSpacing: "-0.015em" }}>
              <span style={{ color: "#F0A981" }}>Fable 5</span> at <span style={{ color: "#8FE0B0" }}>Haiku</span> prices
            </div>
          </div>
        )}
        {nameIn > 0.01 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 46, textAlign: "center", transform: `scale(${nameIn})`, opacity: nameIn, zIndex: 31 }}>
            <div style={{ display: "inline-block", padding: "10px 26px", borderRadius: 14, background: grad("#E9825C", "#C7541F"), border: "3px solid #F0A981", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#fff", boxShadow: "0 18px 40px -12px rgba(199,84,31,0.6)", whiteSpace: "nowrap" }}>THE PYRAMID STACK</div>
          </div>
        )}
        {/* spotlight + pedestal with THE ANSWER scroll */}
        <div style={{ position: "absolute", left: 256, top: 0, width: 500, height: 620, background: "linear-gradient(180deg, rgba(255,244,214,0.2), rgba(255,244,214,0.01))", clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", left: 406, top: 470, width: 200, height: 74, background: grad("#3A4E74", "#2B3A57"), border: "2.5px solid rgba(150,175,220,0.45)", borderRadius: 10 }} />
        <div style={{ position: "absolute", left: 436, top: 218, width: 140, transform: `translateY(${Math.sin(lf / 9) * 8}px) rotate(${Math.sin(lf / 13) * 3}deg)`, zIndex: 10 }}>
          <div style={{ borderRadius: 12, background: "linear-gradient(180deg, #FBF6EC, #EFE3C8)", border: "3px solid #E7B24C", padding: "14px 12px", boxShadow: `0 0 ${30 + Math.sin(lf / 6) * 10}px rgba(231,178,76,0.6), 0 24px 44px -14px rgba(0,0,0,0.6)` }}>
            <div style={{ textAlign: "center", fontSize: 40 }}>📜</div>
            <div style={{ textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#7A5A18", marginTop: 4 }}>FABLE 5</div>
            <div style={{ textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: "#9A7C3A" }}>answer</div>
            {[0, 1, 2].map((r) => <div key={r} style={{ height: 5, borderRadius: 3, background: "#D9C08A", width: `${86 - r * 16}%`, margin: "6px auto 0" }} />)}
          </div>
          {/* $$$$ tag gets re-tagged 1¢ */}
          <div style={{ position: "absolute", right: -46, top: -26, transform: "rotate(9deg)", padding: "6px 14px", borderRadius: 9, background: "rgba(196,74,58,0.9)", border: "2.5px solid #E58072", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff", textDecoration: retag > 0.3 ? "line-through" : "none", opacity: retag > 0.3 ? 0.55 : 1 }}>$$$$</div>
          {retag > 0.01 && (
            <div style={{ position: "absolute", right: -58, top: 34, transform: `rotate(-8deg) scale(${interpolate(retag, [0, 1], [2.6, 1])})`, opacity: Math.min(1, retag * 1.4), padding: "7px 16px", borderRadius: 10, background: grad("#4CAF82", "#2F7E5A"), border: "3px solid #7FD0A8", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff", boxShadow: `0 0 22px ${GREEN}` }}>1¢</div>
          )}
        </div>
        {/* coin rain after the retag */}
        {lf >= retagAt && Array.from({ length: 10 }, (_, i) => {
          const pp = ((lf - retagAt) / 36 + seed(i)) % 1;
          return <div key={i} style={{ position: "absolute", left: 120 + seed(i * 3) * 780, top: 40 + pp * 600, width: 24, height: 24, borderRadius: "50%", background: grad("#F0CB63", "#C98A2A"), border: "2px solid #F6E4A0", opacity: Math.max(0, 0.9 - pp), transform: `rotateX(${pp * 460}deg)`, zIndex: 6 }} />;
        })}
        {/* NOT IN THE DOCS stamp */}
        {stamp > 0.01 && (
          <div style={{ position: "absolute", left: 52, top: 176, transform: `rotate(-11deg) scale(${interpolate(stamp, [0, 1], [2.6, 1])})`, opacity: Math.min(1, stamp * 1.4), padding: "7px 17px", borderRadius: 11, border: `5px solid ${RED}`, color: "#FF8A76", background: "rgba(196,74,58,0.12)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: "0.03em", boxShadow: `0 0 26px ${RED}66`, zIndex: 30, whiteSpace: "nowrap" }}>NOT IN THE DOCS</div>
        )}
        {/* excited crowd along the bottom, reacting the whole time */}
        {[[70, 118, 0], [250, 96, 4], [640, 104, 8], [820, 126, 2], [455, 88, 6]].map(([x, sz, off], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 700 - sz, zIndex: 14 }}>
            <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={3.4} nodSpeed={6 + (i % 3)} gaze={(x as number) < 460 ? 6 : -6} cheer={lf >= retagAt ? 0.5 + Math.max(0, Math.sin(lf / 7 + i)) * 0.5 : 0} />
          </div>
        ))}
        {/* the three specialists pop in a row on "three Claudes" */}
        {[{ x: 330, props: {} as any, hat: true }, { x: 470, props: { judge: 1 } as any, hat: false }, { x: 610, props: { wizard: 1, glasses: 1 } as any, hat: false }].map((c, i) => {
          const ap = over(lf, miniAt[i], 8, Easing.out(Easing.back(1.9)));
          if (ap <= 0.01) return null;
          return (
            <div key={`m${i}`} style={{ position: "absolute", left: c.x, top: 566, transform: `scale(${ap})`, transformOrigin: "50% 100%", zIndex: 15 }}>
              <Mascot lf={lf + i * 3} size={104} nodAmp={3} nodSpeed={6.5} cheer={0.6} {...c.props} />
              {c.hat && <div style={{ position: "absolute", left: 22, top: -10, width: 60, height: 24, borderRadius: "9px 9px 3px 3px", background: "#F2C14E", border: "2.5px solid #C79A2E" }} />}
            </div>
          );
        })}
        {/* 90% LESS */}
        {goldIn > 0.01 && (<>
          <div style={{ position: "absolute", left: 660, top: 300, transform: `rotate(8deg) scale(${goldIn})`, opacity: goldIn, padding: "9px 20px", borderRadius: 12, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#3a2a05", boxShadow: `0 0 30px ${GOLD}`, zIndex: 31, whiteSpace: "nowrap" }}>90% LESS</div>
          <Firework lf={lf} at={goldAt + 3} x={760} y={310} hue={1} />
        </>)}
      </div>
    </Panel>
  );
};

// ---------------- REHOOK: the neighborhood, gates between the houses ----------------
const Rehook: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 2, 10);
  const slam = over(lf, fr(1.84), 7, Easing.out(Easing.back(2.2)));   // "the magic isn't the models"
  const gateAt = fr(3.04);                                            // "it's the gate between them"
  const glow = over(lf, gateAt, fr(0.4));
  const swing = over(lf, gateAt + fr(0.35), fr(0.5), Easing.inOut(Easing.cubic));
  return (
    <Panel label="the neighborhood">
      {/* sunny sky */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 340, background: "linear-gradient(180deg, #BBD7EE, #DCEAF5)", opacity: inP }} />
      <div style={{ position: "absolute", left: 828, top: 44, width: 96, height: 96, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #FFF3C2, #F5D96B)", boxShadow: "0 0 44px rgba(245,217,107,0.8)", opacity: inP }}>
        {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: "absolute", left: 44, top: 44, width: 70, height: 5, transformOrigin: "0 50%", transform: `rotate(${i * 45 + lf * 0.6}deg) translateX(52px)`, background: "rgba(245,217,107,0.55)", borderRadius: 3 }} />)}
      </div>
      {/* ground */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, bottom: 0, background: "linear-gradient(180deg, #7FA86B, #5E8A4E)", opacity: inP }} />
      {/* houses grow with status */}
      <div style={{ position: "absolute", left: 48, top: 402, opacity: inP }}><House w={180} h={210} kind="apartment" /></div>
      <div style={{ position: "absolute", left: 388, top: 366, opacity: inP }}><House w={230} h={246} kind="house" /></div>
      <div style={{ position: "absolute", left: 742, top: 306, opacity: inP }}><House w={236} h={306} kind="mansion" /></div>
      {/* residents out front */}
      <div style={{ position: "absolute", left: 96, top: 522, zIndex: 14, opacity: inP }}>
        <Mascot lf={lf} size={92} nodAmp={2.6} nodSpeed={7} gaze={6} />
        <div style={{ position: "absolute", left: 19, top: -9, width: 54, height: 21, borderRadius: "8px 8px 3px 3px", background: "#F2C14E", border: "2.5px solid #C79A2E" }} />
      </div>
      <div style={{ position: "absolute", left: 452, top: 512, zIndex: 14, opacity: inP }}><Mascot lf={lf + 5} size={100} nodAmp={2.4} nodSpeed={8} gaze={0} judge={1} /></div>
      <div style={{ position: "absolute", left: 806, top: 500, zIndex: 14, opacity: inP }}><Mascot lf={lf + 9} size={110} nodAmp={2.2} nodSpeed={9} gaze={-6} wizard={1} glasses={1} /></div>
      {/* THE GATES between the lots */}
      <div style={{ position: "absolute", left: 252, top: 506, zIndex: 13, opacity: inP }}><SwingGate open={swing} glow={glow} w={110} /></div>
      <div style={{ position: "absolute", left: 630, top: 498, zIndex: 13, opacity: inP }}><SwingGate open={swing} glow={glow} w={110} /></div>
      {/* labels under gates */}
      {glow > 0.3 && [300, 678].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x - 32, top: 628, opacity: glow, padding: "4px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", boxShadow: `0 0 14px ${GOLD}`, zIndex: 20 }}>the gate</div>
      ))}
      {/* word slam over the sky */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center", zIndex: 30 }}>
        <span style={{ display: "inline-block", transform: `scale(${slam})`, opacity: slam, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: INK, letterSpacing: "-0.015em", textShadow: "0 2px 14px rgba(255,255,255,0.7)" }}>the magic <span style={{ color: "#C4402E" }}>isn't</span> the models</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", zIndex: 30, opacity: over(lf, gateAt, 8), transform: `scale(${over(lf, gateAt, 8, Easing.out(Easing.back(1.8)))})` }}>
        <span style={{ display: "inline-block", padding: "8px 22px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#3a2a05", boxShadow: `0 0 26px ${GOLD}` }}>it's THE GATE between them</span>
      </div>
    </Panel>
  );
};

// ---------------- HAIKU: pyramid base beat, then FLIP to the email workshop ----------------
const PIECES = ["subject line", "the body", "sign-off"];
const Haiku: React.FC<{ lf: number }> = ({ lf }) => {
  const flipAt = fr(1.6);
  const flip = over(lf, flipAt, 7);
  const flash = lf >= flipAt ? Math.max(0, 1 - (lf - flipAt) / 6) : 0;
  const pennyAt = fr(4.4);
  const hammer = (i: number) => over(lf, flipAt + fr(0.3) + i * fr(0.62), fr(0.45), Easing.out(Easing.back(1.6)));
  const hammerPulse = Math.max(...PIECES.map((_, i) => Math.max(0, 1 - Math.abs(lf - (flipAt + fr(0.55) + i * fr(0.62))) / 5)));
  const sent = over(lf, flipAt + fr(2.5), 8, Easing.out(Easing.back(1.8)));
  return (
    <Panel label="level 1 · haiku">
      {/* beat 1: the pyramid base + conveyor */}
      {flip < 0.99 && (
        <div style={{ opacity: 1 - flip }}>
          <Pyramid lf={lf + 99} lit={[1, 0.35, 0.35]} gateGlow={0} />
          <div style={{ position: "absolute", left: 260, top: PYR.baseY - 150, zIndex: 14 }}>
            <Mascot lf={lf} size={150} nodAmp={4} nodSpeed={5.5} gaze={5} />
            <div style={{ position: "absolute", left: 31, top: -14, width: 88, height: 32, borderRadius: "12px 12px 4px 4px", background: "#F2C14E", border: "3px solid #C79A2E" }} />
          </div>
          {Array.from({ length: 4 }, (_, i) => {
            const tr = ((lf / fr(1.5) + i * 0.25) % 1);
            return <div key={i} style={{ position: "absolute", left: 1000 - tr * 600, top: PYR.baseY + 24, opacity: Math.min(1, (1 - tr) * 4) * Math.min(1, tr * 8), zIndex: 13 }}><JobCard label={["✉ email", "📝 notes", "📋 plan", "🧾 invoice"][i]} w={104} /></div>;
          })}
        </div>
      )}
      {/* white flip flash */}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E6", opacity: flash * 0.7, zIndex: 60 }} />}
      {/* beat 2: THE WORKSHOP — email assembled from puzzle pieces */}
      {flip > 0.5 && (
        <div style={{ opacity: Math.min(1, (flip - 0.5) * 3) }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: "radial-gradient(circle at 50% 30%, rgba(120,150,210,0.12), transparent 60%)" }} />
          <div style={{ position: "absolute", left: 60, top: 118, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EEE2", zIndex: 30 }}>the <span style={{ color: "#8FE0B0" }}>worker</span></div>
          <div style={{ position: "absolute", left: 62, top: 190, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "rgba(200,215,240,0.75)", zIndex: 30 }}>cheap, fast, builds the everyday stuff</div>
          {/* the email window being assembled */}
          <div style={{ position: "absolute", left: 300, top: 262, width: 560, borderRadius: 16, background: PAPER, border: "2.5px solid #C9BCA4", overflow: "hidden", boxShadow: "0 26px 50px -18px rgba(10,16,34,0.6)" }}>
            <div style={{ height: 44, background: "#E9E4DA", display: "flex", alignItems: "center", padding: "0 14px", gap: 7 }}>
              {["#ED6A5E", "#F4BF4F", "#61C554"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              <div style={{ marginLeft: 8, fontFamily: mono, fontSize: 18, color: "#8A8272" }}>new email</div>
            </div>
            <div style={{ padding: "14px 18px", minHeight: 250 }}>
              {PIECES.map((pc, i) => {
                const h = hammer(i);
                if (h <= 0.01) return <div key={i} style={{ height: i === 1 ? 110 : 52, margin: "8px 0", borderRadius: 10, border: "2.5px dashed #D8CDBB" }} />;
                return (
                  <div key={i} style={{ position: "relative", height: i === 1 ? 110 : 52, margin: "8px 0", borderRadius: 10, background: ["#EAF3ED", "#F1ECDF", "#EAF0F8"][i], border: `2.5px solid ${["#9CC7AB", "#D9C08A", "#A8C0DE"][i]}`, transform: `scale(${h}) rotate(${(1 - h) * 6}deg)`, padding: "8px 12px" }}>
                    <div style={{ fontFamily: mono, fontSize: 19, color: "#5A5346", fontWeight: 700 }}>🧩 {pc}</div>
                    {i === 1 && [0, 1, 2].map((r) => <div key={r} style={{ height: 6, borderRadius: 3, background: "#D8CDBB", width: `${88 - r * 20}%`, marginTop: 9 }} />)}
                  </div>
                );
              })}
            </div>
          </div>
          {/* worker hammering the pieces in */}
          <div style={{ position: "absolute", left: 74, top: 420, zIndex: 20 }}>
            <Mascot lf={lf} size={190} nodAmp={3 + hammerPulse * 4} nodSpeed={5.5} gaze={7} cheer={hammerPulse} />
            <div style={{ position: "absolute", left: 39, top: -17, width: 112, height: 40, borderRadius: "14px 14px 5px 5px", background: "#F2C14E", border: "3px solid #C79A2E" }} />
            <div style={{ position: "absolute", right: -30, top: 46, fontSize: 52, transform: `rotate(${-30 + hammerPulse * 55}deg)`, transformOrigin: "20% 80%" }}>🔨</div>
          </div>
          {/* sent ✓ */}
          {sent > 0.01 && (
            <div style={{ position: "absolute", left: 560, top: 620, transform: `scale(${sent}) rotate(-5deg)`, opacity: sent, padding: "7px 18px", borderRadius: 10, background: GREEN, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, border: "2.5px solid #7FD0A8", boxShadow: `0 0 18px ${GREEN}`, zIndex: 22 }}>SENT ✓</div>
          )}
          {/* penny rain */}
          {lf >= pennyAt && Array.from({ length: 10 }, (_, i) => {
            const pp = ((lf - pennyAt) / 34 + seed(i)) % 1;
            return <div key={i} style={{ position: "absolute", left: 90 + seed(i * 3) * 220, top: 240 + pp * 330, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#C98A2A"), border: "2px solid #F6E4A0", opacity: Math.max(0, 1 - pp) * 0.95, transform: `rotateX(${pp * 500}deg)`, fontSize: 13, textAlign: "center", lineHeight: "23px", color: "#3a2a05", fontWeight: 800, zIndex: 19 }}>1¢</div>;
          })}
          {lf >= pennyAt && <div style={{ position: "absolute", left: 84, top: 640, opacity: over(lf, pennyAt + 6, 8), padding: "6px 16px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `2px solid ${GREEN}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#8FE0B0", zIndex: 21 }}>costs pennies</div>}
        </div>
      )}
    </Panel>
  );
};

// ---------------- OPUS: pyramid mid beat, then FLIP to the courtroom ----------------
const Opus: React.FC<{ lf: number }> = ({ lf }) => {
  const flipAt = fr(1.2);
  const flip = over(lf, flipAt, 7);
  const flash = lf >= flipAt ? Math.max(0, 1 - (lf - flipAt) / 6) : 0;
  const gavelAt = fr(3.7);
  const gavel = over(lf, gavelAt, fr(0.25), Easing.out(Easing.back(2.4)));
  const shipPop = over(lf, gavelAt + 4, fr(0.3), Easing.out(Easing.back(2)));
  return (
    <Panel label="level 2 · opus">
      {flip < 0.99 && (
        <div style={{ opacity: 1 - flip }}>
          <Pyramid lf={lf + 99} lit={[0.35, 1, 0.35]} gateGlow={0} />
          <div style={{ position: "absolute", left: 410, top: PYR.midY - 160, zIndex: 14 }}>
            <Mascot lf={lf} size={160} nodAmp={2.4} nodSpeed={8} gaze={5} judge={1} stern={0.5} />
          </div>
        </div>
      )}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E6", opacity: flash * 0.7, zIndex: 60 }} />}
      {flip > 0.5 && (
        <div style={{ opacity: Math.min(1, (flip - 0.5) * 3) }}>
          {/* courtroom backdrop */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 26%, rgba(150,120,80,0.14), transparent 62%)" }} />
          <div style={{ position: "absolute", left: 60, top: 108, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EEE2", zIndex: 30 }}>the <span style={{ color: "#A8C4EE" }}>judge</span></div>
          <div style={{ position: "absolute", left: 62, top: 180, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "rgba(200,215,240,0.75)", zIndex: 30 }}>good enough to ship?</div>
          {/* judge behind the bench */}
          <div style={{ position: "absolute", left: 400, top: 214, zIndex: 12 }}>
            <Mascot lf={lf} size={210} nodAmp={2.2 + gavel * 5} nodSpeed={8} gaze={4} judge={1} stern={0.5} cheer={gavel * 0.9} />
          </div>
          {/* the bench */}
          <div style={{ position: "absolute", left: 290, top: 392, width: 430, height: 132, background: "linear-gradient(180deg, #8A6844, #6E5236)", border: "3px solid #4E3A24", borderRadius: "12px 12px 4px 4px", boxShadow: "0 22px 44px -14px rgba(0,0,0,0.6)", zIndex: 13 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 12, height: 8, background: "#4E3A24" }} />
            <div style={{ position: "absolute", left: "50%", top: 42, transform: "translateX(-50%)", width: 74, height: 74, borderRadius: "50%", background: "#E7B24C", border: "4px solid #C79A2E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>⚖️</div>
          </div>
          {/* the case on an easel */}
          <div style={{ position: "absolute", left: 770, top: 400, zIndex: 14, transform: `translateY(${Math.sin(lf / 8) * 4}px)` }}>
            <JobCard label="report" w={116} />
            {shipPop > 0.01 && (
              <div style={{ position: "absolute", right: -26, top: -24, transform: `rotate(-10deg) scale(${shipPop})`, padding: "6px 15px", borderRadius: 9, background: GREEN, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, border: "2.5px solid #7FD0A8", boxShadow: `0 0 18px ${GREEN}` }}>SHIP ✓</div>
            )}
          </div>
          {/* the gallery: mini sprites watching */}
          {[[96, 92, 0], [236, 78, 3], [368, 86, 6], [560, 74, 9], [700, 90, 12], [860, 80, 5]].map(([x, sz, off], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: 706 - (sz as number), zIndex: 16 }}>
              <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={2.2} nodSpeed={7 + (i % 3)} gaze={(x as number) < 500 ? 6 : -6} cheer={shipPop > 0.2 ? 0.5 + seed(i) * 0.5 : 0} shock={gavel > 0.2 && shipPop < 0.2 ? 0.4 : 0} />
            </div>
          ))}
          {/* gavel impact ring */}
          {gavel > 0.01 && <div style={{ position: "absolute", left: 640, top: 380, width: 20, height: 20, borderRadius: "50%", border: `5px solid ${GOLD}`, transform: `scale(${1 + gavel * 9})`, opacity: Math.max(0, 1 - gavel), zIndex: 15 }} />}
        </div>
      )}
    </Panel>
  );
};

// ---------------- WIZARD: pyramid top beat, then FLIP into the tower study ----------------
const Wizard: React.FC<{ lf: number }> = ({ lf }) => {
  const flipAt = fr(1.3);
  const flip = over(lf, flipAt, 7);
  const flash = lf >= flipAt ? Math.max(0, 1 - (lf - flipAt) / 6) : 0;
  const scanAt = fr(3.2);
  const scan = over(lf, scanAt, fr(0.5));
  const openAt = scanAt + fr(0.55);
  const open = over(lf, openAt, fr(0.4));
  const toCircle = over(lf, openAt + 6, fr(0.7), Easing.inOut(Easing.cubic));
  const zap = over(lf, openAt + fr(1.1), fr(0.35), Easing.out(Easing.back(2)));
  const cardX = 150 + toCircle * 390;
  const cardY = 560 - toCircle * 120;
  return (
    <Panel label="level 3 · fable 5">
      {flip < 0.99 && (
        <div style={{ opacity: 1 - flip }}>
          <Pyramid lf={lf + 99} lit={[0.35, 0.5, 1]} gateGlow={0.4} />
          <div style={{ position: "absolute", left: 420, top: PYR.topY - 170, zIndex: 14 }}>
            <Mascot lf={lf} size={170} nodAmp={2.4} nodSpeed={9} gaze={0} wizard={1} glasses={1} />
          </div>
        </div>
      )}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E6", opacity: flash * 0.7, zIndex: 60 }} />}
      {flip > 0.5 && (
        <div style={{ opacity: Math.min(1, (flip - 0.5) * 3) }}>
          {/* tower study: stone walls + arch window with stars */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1E2A42, #141D30)" }} />
          <div style={{ position: "absolute", left: 700, top: 96, width: 200, height: 260, borderRadius: "100px 100px 8px 8px", background: "linear-gradient(180deg, #0A1120, #101a2e)", border: "5px solid #33455F", overflow: "hidden" }}>
            {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: "absolute", left: seed(i * 3) * 180, top: seed(i * 7) * 240, width: 3 + seed(i) * 3, height: 3 + seed(i) * 3, borderRadius: "50%", background: "#EAF0FA", opacity: 0.4 + seed(i * 5) * 0.5 }} />)}
            <div style={{ position: "absolute", left: 116, top: 40, width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FFF6DE, #EFD9A8)", boxShadow: "0 0 22px rgba(240,217,168,0.6)" }} />
          </div>
          {Array.from({ length: 6 }, (_, i) => <div key={`st${i}`} style={{ position: "absolute", left: (i % 3) * 340 + seed(i) * 60, top: 90 + Math.floor(i / 3) * 300, width: 120, height: 5, background: "rgba(60,80,120,0.35)", borderRadius: 3 }} />)}
          <div style={{ position: "absolute", left: 60, top: 108, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EEE2", zIndex: 30 }}>the <span style={{ color: "#D8B4F0" }}>wizard</span></div>
          <div style={{ position: "absolute", left: 62, top: 180, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "rgba(200,215,240,0.75)", zIndex: 30 }}>only the hardest problems</div>
          {/* the wizard at his desk */}
          <div style={{ position: "absolute", left: 620, top: 396, zIndex: 14 }}>
            <Mascot lf={lf} size={216} nodAmp={2.4 + zap * 3} nodSpeed={9 - zap * 4} gaze={-7} wizard={1} glasses={1} cheer={zap} />
          </div>
          {/* the tower gate-door the hot job must clear */}
          <div style={{ position: "absolute", left: 96, top: 470, zIndex: 13 }}>
            <div style={{ width: 130, height: 190, borderRadius: "65px 65px 6px 6px", background: "#101a2e", border: `4px solid ${scan > 0.05 ? GOLD : "#33455F"}`, boxShadow: scan > 0.05 ? `0 0 ${16 + open * 22}px ${GOLD}` : "none", overflow: "hidden" }}>
              {open < 0.9 && Array.from({ length: 4 }, (_, i) => <div key={i} style={{ position: "absolute", left: 16 + i * 28, top: 12 - open * 180, width: 9, height: 170, background: scan > 0.05 ? "#C79A2E" : "#33455F", borderRadius: 4 }} />)}
            </div>
            <div style={{ position: "absolute", left: 6, top: -34, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: scan > 0.05 ? "#F0D08A" : "rgba(150,175,220,0.6)", whiteSpace: "nowrap" }}>{open > 0.5 ? "🔓 cleared" : "🔒 the gate"}</div>
          </div>
          {/* the hot job: waits, scanned, floats to the arcane circle */}
          {zap < 0.6 && (
            <div style={{ position: "absolute", left: cardX, top: cardY, zIndex: 15, transform: "translate(-50%,-50%)" }}>
              <JobCard label="pricing" hot={1} w={104} />
            </div>
          )}
          {/* arcane circle */}
          <div style={{ position: "absolute", left: 430, top: 330, width: 220, height: 220, zIndex: 12, opacity: 0.4 + toCircle * 0.6 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px dashed rgba(216,180,240,0.6)", transform: `rotate(${lf * 1.2}deg)` }} />
            <div style={{ position: "absolute", inset: 26, borderRadius: "50%", border: "2.5px dashed rgba(231,178,76,0.55)", transform: `rotate(${-lf * 1.7}deg)` }} />
          </div>
          {/* transformation: the answer scroll */}
          {zap > 0.15 && (
            <div style={{ position: "absolute", left: 540, top: 440, transform: `translate(-50%,-50%) scale(${zap})`, zIndex: 16 }}>
              <div style={{ width: 130, borderRadius: 12, background: "linear-gradient(180deg, #FBF6EC, #EFE3C8)", border: "3px solid #E7B24C", padding: "12px 10px", textAlign: "center", boxShadow: `0 0 34px ${GOLD}` }}>
                <div style={{ fontSize: 36 }}>📜</div>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: "#7A5A18", marginTop: 2 }}>THE ANSWER</div>
              </div>
            </div>
          )}
          {zap > 0.1 && <Firework lf={lf} at={openAt + fr(1.1) + 2} x={540} y={430} hue={2} />}
        </div>
      )}
    </Panel>
  );
};

const GATE_LINES = ["if the answer could cost money or a day, pass it up.", "otherwise solve it here and never mention the levels."];

// ---------------- GATE finale: the ornate gate is the hero ----------------
const Gate: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 3, 9, Easing.out(Easing.back(1.2)));
  const billAt = fr(2.4);
  const crack = over(lf, billAt, fr(0.5));
  const beamAt = fr(4.4);
  const beam = over(lf, beamAt, fr(0.5));
  const stripAt = fr(6.4);
  const strip = over(lf, stripAt, fr(1.2), Easing.inOut(Easing.cubic));
  const cardY = 560 - strip * 330;
  return (
    <Panel label="the gate rule" tint="rgba(231,178,76,0.5)">
      {/* THE ORNATE GATE, center stage */}
      <div style={{ position: "absolute", left: 236, top: 120, width: 540, opacity: inP, transform: `scale(${0.92 + inP * 0.08})`, transformOrigin: "50% 30%" }}>
        {/* pillars + arch */}
        <div style={{ position: "absolute", left: 0, top: 60, width: 64, height: 480, background: "linear-gradient(90deg, #3A4E74, #2B3A57)", border: "3px solid rgba(150,175,220,0.4)", borderRadius: 8 }} />
        <div style={{ position: "absolute", right: 0, top: 60, width: 64, height: 480, background: "linear-gradient(90deg, #3A4E74, #2B3A57)", border: "3px solid rgba(150,175,220,0.4)", borderRadius: 8 }} />
        <div style={{ position: "absolute", left: 20, top: 0, right: 20, height: 90, borderRadius: "270px 270px 0 0", background: "linear-gradient(180deg, #3A4E74, #2B3A57)", border: "3px solid rgba(150,175,220,0.4)", borderBottom: "none" }} />
        {/* gold doors, crack open at the bill beat */}
        {[0, 1].map((d) => (
          <div key={d} style={{ position: "absolute", left: d === 0 ? 64 : "50%", top: 96, width: 206, height: 444, transformOrigin: d === 0 ? "0% 50%" : "100% 50%", transform: `rotateY(${(d === 0 ? 1 : -1) * crack * 38}deg) ${d === 1 ? "translateX(0)" : ""}`, background: grad("#B8892F", "#8A6420"), border: "3.5px solid #E7B24C", borderRadius: d === 0 ? "10px 0 0 10px" : "0 10px 10px 0", boxShadow: `0 0 ${14 + crack * 24}px rgba(231,178,76,0.5)`, zIndex: 8 }}>
            {Array.from({ length: 3 }, (_, i) => <div key={i} style={{ position: "absolute", left: 22 + i * 58, top: 20, width: 10, height: 404, background: "rgba(40,28,8,0.3)", borderRadius: 5 }} />)}
          </div>
        ))}
        {/* the engraved (blurred) rule plaque */}
        <div style={{ position: "absolute", left: 60, right: 60, top: 196, zIndex: 10 }}>
          <div style={{ position: "relative", borderRadius: 14, background: "#141B28", border: `3px solid ${GOLD}`, padding: "14px 18px 12px", boxShadow: `0 0 30px rgba(231,178,76,0.4)` }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "#F0D08A", letterSpacing: "0.06em", marginBottom: 6 }}>🔒 THE TWO-LINE GATE RULE</div>
            {GATE_LINES.map((ln, i) => (
              <div key={i} style={{ fontFamily: mono, fontSize: 21, lineHeight: 1.55, color: "#EAF0FA", filter: "blur(7px)", opacity: 0.8, userSelect: "none" }}>{ln}</div>
            ))}
            <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
              <span style={{ padding: "5px 14px", borderRadius: 999, background: "rgba(207,149,68,0.16)", border: `1.5px solid ${AMBER}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "#F0D08A" }}>unblurred in the guide ↓</span>
            </div>
          </div>
        </div>
      </div>
      {/* coins spill through the cracked doors and pile up (the bill goes down) */}
      {lf >= billAt && Array.from({ length: 14 }, (_, i) => {
        const pp = ((lf - billAt) / 30 + seed(i)) % 1;
        return <div key={`cn${i}`} style={{ position: "absolute", left: 460 + (seed(i * 3) - 0.5) * 200 * pp, top: 560 + pp * 130, width: 24, height: 24, borderRadius: "50%", background: grad("#F0CB63", "#C98A2A"), border: "2px solid #F6E4A0", opacity: Math.max(0, 1 - pp * 0.8), transform: `rotateX(${pp * 420}deg)`, zIndex: 18 }} />;
      })}
      {crack > 0.3 && (
        <div style={{ position: "absolute", left: 74, top: 560, opacity: over(lf, billAt + 8, 8), zIndex: 20 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "rgba(200,215,240,0.75)" }}>your bill</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: "#8FE0B0" }}>↓ 90%</div>
        </div>
      )}
      {/* the beam makes the wizard smarter */}
      {beam > 0.02 && (<>
        <div style={{ position: "absolute", left: 620, top: 260, width: 260, height: 8, transform: "rotate(24deg)", transformOrigin: "0 50%", background: `linear-gradient(90deg, ${GOLD}, transparent)`, opacity: beam * (0.6 + Math.sin(lf * 1.4) * 0.4), zIndex: 12 }} />
        <div style={{ position: "absolute", left: 800, top: 330, zIndex: 20 }}>
          <Mascot lf={lf} size={150} wizard={1} glasses={1} nodAmp={2.4 + beam * 2.4} nodSpeed={7} gaze={-7} cheer={strip * 0.7} />
          <div style={{ position: "absolute", left: -4, top: -20, fontSize: 34, opacity: beam * (0.5 + Math.sin(lf / 5) * 0.5) }}>💡</div>
        </div>
      </>)}
      {/* the hard core rises through the gate shedding its easy parts */}
      {strip > 0.02 && (<>
        <div style={{ position: "absolute", left: 506, top: cardY, transform: "translate(-50%,-50%)", zIndex: 16 }}>
          <JobCard label="the hard core" hot={1} w={112} />
        </div>
        {Array.from({ length: 6 }, (_, i) => {
          const pp = Math.min(1, strip * 1.7 - seed(i) * 0.4);
          if (pp <= 0) return null;
          return <div key={`ch${i}`} style={{ position: "absolute", left: 506 + (seed(i * 3) - 0.5) * 220, top: cardY + 60 + pp * 150, width: 36, height: 27, borderRadius: 7, background: "#3A4E74", border: "1.5px solid rgba(150,175,220,0.4)", opacity: Math.max(0, 1 - pp * 1.1), transform: `rotate(${pp * 170 + i * 40}deg)`, zIndex: 15 }} />;
        })}
        {strip > 0.5 && <div style={{ position: "absolute", left: 0, right: 0, top: 690, textAlign: "center", opacity: over(lf, stripAt + 18, 8), zIndex: 21 }}><span style={{ padding: "5px 15px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `2px solid ${GREEN}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#8FE0B0" }}>easy parts stripped out</span></div>}
      </>)}
    </Panel>
  );
};

// ---------------- CTA ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 4, fr(0.45), Easing.out(Easing.back(1.5)));
  const kw = "STACK";
  const typed = Math.floor(over(lf, fr(0.5), fr(1.2)) * kw.length);
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 392, textAlign: "center", transform: `scale(${inP})` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: SLATE }}>🔖 the full build, unblurred</span>
      </div>
      <div style={{ position: "absolute", left: 200, right: 200, top: 470, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 90, background: grad("#E9825C", "#C7541F"), display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 30px" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(255,255,255,0.85)" }}>THE PYRAMID STACK</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff" }}>The full build guide</div>
          </div>
          <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
            {["The two-line gate rule", "The settings file", "The task table"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: MUTE, marginBottom: 14 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 130, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)` }}>STACK</div>
        <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 14, padding: "16px 26px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>➤</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- SNACK LANE: 5s countdown at the BOTTOM, below the captions (non-interrupting) ----------------
const SnackLane: React.FC<{ lf: number }> = ({ lf }) => {
  const total = fr(5);
  const pr = Math.min(1, lf / total);
  const secLeft = Math.max(1, 5 - Math.floor(lf / FPS));
  const decP = Math.max(0, 1 - (lf % FPS) / 8);
  const inP = over(lf, 0, 8, Easing.out(Easing.back(1.4)));
  const laneL = 180, laneR = 800;
  const cx = laneL - 30 + pr * (laneR - laneL + 30);
  const lastSec = secLeft === 1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1448, height: 130, opacity: inP, zIndex: 95, transform: `translateY(${(1 - inP) * 20}px)` }}>
      {/* lane track */}
      <div style={{ position: "absolute", left: 150, width: 700, top: 78, height: 10, borderRadius: 999, background: "rgba(58,92,132,0.25)" }} />
      <div style={{ position: "absolute", left: 150, width: Math.max(0, (cx - 150)), top: 78, height: 10, borderRadius: 999, background: grad("#E08A66", "#C5603C") }} />
      {/* pellets */}
      {Array.from({ length: 5 }, (_, k) => {
        const px = laneL + ((k + 0.6) / 5) * (laneR - laneL);
        const eatAt = (k + 1) * FPS - 6;
        const de = lf - eatAt;
        if (de > 14) return null;
        return (
          <div key={k} style={{ position: "absolute", left: px, top: 83 }}>
            {de < 0 && <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 10px ${GOLD}`, transform: `scale(${1 + Math.sin(lf / 6 + k * 2) * 0.14})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 0.3})`, opacity: Math.max(0, 1 - de / 11) }} />
              {Array.from({ length: 5 }, (_, j) => { const aa = (j / 5) * Math.PI * 2; const dd = de * 3.4; return <div key={j} style={{ position: "absolute", left: Math.cos(aa) * dd - 3, top: Math.sin(aa) * dd - 3, width: 6, height: 6, borderRadius: "50%", background: [GOLD, CLAY, "#F3E3A6"][j % 3], opacity: Math.max(0, 1 - de / 12) }} />; })}
            </>}
          </div>);
      })}
      {/* the critter runs the lane eating */}
      {(() => { const chompP = Math.max(0, 1 - (lf % FPS) / 9); return (
        <div style={{ position: "absolute", left: cx, top: 26, transform: "translateX(-50%)", zIndex: 30 }}>
          <Mascot lf={lf} size={62} nodAmp={3.4} nodSpeed={4.5} cheer={chompP * 0.85} gaze={4} />
        </div>); })()}
      {/* numeral dial at the finish */}
      <div style={{ position: "absolute", left: 856, top: 34, width: 92, height: 92 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#233250", "#18233A"), boxShadow: "0 10px 24px -8px rgba(18,28,58,0.5)" }} />
        <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: `conic-gradient(from 0deg, ${lastSec ? GOLD : CLAY}${lastSec ? "dd" : "aa"} ${pr * 360}deg, rgba(120,150,210,0.15) ${pr * 360}deg)`, WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)", mask: "radial-gradient(circle, transparent 58%, #000 59%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${1 + decP * 0.2})` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 0.9, color: lastSec ? "#F6E4A0" : "#F4EEE2", textShadow: lastSec ? `0 0 18px ${GOLD}` : "none" }}>{secLeft}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "rgba(190,205,235,0.7)" }}>sec</div>
        </div>
      </div>
    </div>
  );
};

// CTA scene wrapper: snack lane at the bottom, cut ships mid-count (loop)
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const clockLf = lf - fr(CLOCK_START - L[6]);
  return (
    <>
      <CTA lf={lf} />
      {clockLf >= 0 && <SnackLane lf={Math.min(clockLf, fr(5) - 1)} />}
    </>
  );
};

// ---------------- progress bar (standing game-arc) ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const marks = [L[2], L[4], L[5]];
  const STARS = [L[1]];
  const TOTAL = durationInFrames / FPS;
  const PELLETS = [1.5, 4.9, 7.4, 11.5, 16.0, 21.2, 25.5, 30.5, 33.0, 35.2, 38.6];
  const score = PELLETS.filter((pt) => t >= pt).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((m) => t >= m).length * 2;
  const incTimes = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {PELLETS.map((pt, i) => {
        const np = pt / TOTAL;
        const de = t - pt;
        if (de > 0.55) return null;
        return (
          <div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%, -50%)" }}>
            {de < 0 && <div style={{ width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 7})`, opacity: Math.max(0, 1 - de * 2.1) }} />
              <div style={{ position: "absolute", left: -3, top: -3, width: 6, height: 6, borderRadius: "50%", background: "#F6E4A0", transform: `scale(${Math.max(0, 1 - de * 2.5)})`, opacity: Math.max(0, 1 - de * 2) }} />
            </>}
          </div>); })}
      {STARS.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.6 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1 + Math.sin(t * 2.6) * 0.06;
        return (
          <div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 28 - dt * 40)}px ${GOLD}` : `0 0 14px ${GOLD}99`) : `0 0 12px ${GOLD}66` }}>★</div>
          </div>); })}
      {marks.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0; const teased = i === 2 && !passed;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.62 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 30 - dt * 44)}px ${GOLD}` : `0 0 18px ${GREEN}`) : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>
          </div>); })}
      {/* teased gift at the end (stays teased; loop-cut ships before unlock) */}
      <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translateY(${Math.sin(t * 2.4) * 3}px)`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}44, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 14px ${GOLD}66` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: "grayscale(0.6) brightness(0.85)", opacity: 0.6, transform: "scale(0.84)" }}>🎁</div>
      </div>
      {(() => { const slamShock = t >= 2.35 && t < 3.4 ? Math.min(1, (t - 2.35) / 0.25) * 0.9 : 0; const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
          {(() => {
            const items = [...PELLETS, ...marks, ...STARS];
            const frac = items.reduce((a, x) => a + Math.min(1, Math.max(0, (t - x) / 0.35)), 0) / items.length;
            const full = frac >= 0.999;
            const fullPop = full ? Math.max(0, 1 - (t - (Math.max(...items) + 0.35)) * 2.2) : 0;
            return (
              <div style={{ position: "absolute", inset: -11, borderRadius: "50%", transform: `scale(${1 + fullPop * 0.16})`, background: `conic-gradient(from -90deg, ${full ? GOLD : GREEN} ${frac * 360}deg, rgba(58,92,132,0.18) ${frac * 360}deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", filter: incPop > 0.05 || fullPop > 0.05 ? `drop-shadow(0 0 ${6 + Math.max(incPop, fullPop) * 10}px ${full ? GOLD : GREEN})` : "none" }} />
            ); })()}
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>★ {score}</div>
        </div>); })()}
      {[...marks, ...STARS].map((m, i) => {
        const dt = t >= m ? t - m : 99;
        if (dt > 0.85) return null;
        const np = m / TOTAL;
        return (
          <div key={`cel${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56, zIndex: 129, pointerEvents: "none" }}>
            {dt < 0.65 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `4px solid ${GREEN}`, transform: `scale(${1 + dt * 13})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
            {dt > 0.08 && dt < 0.75 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + (dt - 0.08) * 11})`, opacity: Math.max(0, 1 - (dt - 0.08) * 1.6) }} />}
            {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 + seed(k + i * 3); const d = Math.pow(Math.min(1, dt / 0.8), 0.55) * (46 + seed(k * 2 + i) * 36); const o = Math.max(0, 1 - dt * 1.5); const c = [GOLD, CLAY, "#F3E3A6", GREEN][k % 4]; return <div key={k} style={{ position: "absolute", left: 28 + Math.cos(a) * d, top: 28 + Math.sin(a) * d + dt * dt * 26, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}` }} />; })}
          </div>); })}
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

export const ClaudeStackReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [1.5, 2.35, 4.95, 6.35, 6.9, 7.45, 8.1, L[1] + 0.4, L[1] + 1.7, L[2] + 1.0, L[2] + 4.4, L[3] + 0.9, L[3] + 3.7, L[4] + 3.2, L[4] + 4.1, L[5] + 0.3, L[5] + 2.4, L[5] + 4.4, L[5] + 6.4, L[6] + 0.2, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3, CLOCK_START + 4];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_stack.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[6]) - 8, fr(L[6]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      {/* hook: luxury answer, penny price */}
      <Sfx at={0} src="metal_riser.wav" v={0.55} /><Sfx at={0.12} src="boom.wav" v={0.4} />
      <Sfx at={0.5} src="shimmer.wav" v={0.3} dur={1.2} />
      <Sfx at={2.0} src="thock.wav" v={0.5} /><Sfx at={2.06} src="ding.wav" v={0.38} dur={0.8} />
      {[2.2, 2.5, 2.8].map((tt, i) => <Sfx key={`cn${i}`} at={tt} src={`blip${i + 2}.wav`} v={0.2} dur={0.3} />)}
      <Sfx at={3.3} src="thock.wav" v={0.42} /><Sfx at={3.34} src="boom.wav" v={0.26} />
      <Sfx at={4.95} src="thock.wav" v={0.45} /><Sfx at={5.0} src="swish.wav" v={0.3} />
      {[6.35, 6.9, 7.45].map((tt, i) => <Sfx key={`cp${i}`} at={tt} src="pop.wav" v={0.32} dur={0.5} />)}
      <Sfx at={8.1} src="sparkle.wav" v={0.5} /><Sfx at={8.15} src="chimehi.wav" v={0.35} dur={0.8} />
      {/* boundaries */}
      {L.slice(1).map((tt, i) => <React.Fragment key={`b${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.4} /><Sfx at={tt + 0.26} src="pop.wav" v={0.24} dur={0.6} /></React.Fragment>)}
      {/* rehook: neighborhood + gates swing */}
      <Sfx at={L[1] + 0.15} src="whoosh.wav" v={0.42} />
      <Sfx at={L[1] + 1.84} src="snap.wav" v={0.4} dur={0.5} />
      <Sfx at={L[1] + 3.04} src="shimmer.wav" v={0.4} dur={1.0} /><Sfx at={L[1] + 3.39} src="screech.wav" v={0.16} dur={0.7} /><Sfx at={L[1] + 3.5} src="chimehi.wav" v={0.3} dur={0.8} />
      {/* haiku: conveyor -> flip -> construction */}
      {[0.5, 1.0].map((tt, i) => <Sfx key={`cv${i}`} at={L[2] + tt} src="tick.wav" v={0.2} dur={0.3} />)}
      <Sfx at={L[2] + 1.6} src="swish.wav" v={0.42} />
      {[1.9, 2.52, 3.14].map((tt, i) => <React.Fragment key={`hm${i}`}><Sfx at={L[2] + tt} src="thock.wav" v={0.42} /><Sfx at={L[2] + tt + 0.12} src="tick.wav" v={0.24} dur={0.25} /></React.Fragment>)}
      <Sfx at={L[2] + 4.1} src="ding.wav" v={0.32} dur={0.7} />
      {[4.5, 4.75, 5.0].map((tt, i) => <Sfx key={`pn${i}`} at={L[2] + tt} src={`blip${i + 2}.wav`} v={0.2} dur={0.3} />)}
      {/* opus: flip -> courtroom murmur -> gavel */}
      <Sfx at={L[3] + 1.2} src="swish.wav" v={0.42} />
      <Sfx at={L[3] + 1.35} src="crowd_run.wav" v={0.16} dur={2.0} />
      <Sfx at={L[3] + 3.7} src="thock.wav" v={0.55} /><Sfx at={L[3] + 3.85} src="snap.wav" v={0.4} dur={0.5} />
      {[4.0, 4.15].map((tt, i) => <Sfx key={`ch${i}`} at={L[3] + tt} src="pop.wav" v={0.26} dur={0.4} />)}
      {/* wizard: flip -> gate scan -> zap */}
      <Sfx at={L[4] + 1.3} src="swish.wav" v={0.42} />
      <Sfx at={L[4] + 3.2} src="shimmer.wav" v={0.38} dur={0.9} />
      <Sfx at={L[4] + 3.75} src="chimehi.wav" v={0.35} dur={0.8} /><Sfx at={L[4] + 3.8} src="screech.wav" v={0.13} dur={0.6} />
      <Sfx at={L[4] + 4.85} src="sparkle.wav" v={0.48} /><Sfx at={L[4] + 4.9} src="angelic.wav" v={0.26} dur={1.6} />
      {/* gate finale: doors crack, coins, beam, strip */}
      <Sfx at={L[5] + 0.15} src="boom.wav" v={0.3} /><Sfx at={L[5] + 0.2} src="shimmer.wav" v={0.34} dur={1.0} />
      <Sfx at={L[5] + 2.4} src="screech.wav" v={0.18} dur={0.8} /><Sfx at={L[5] + 2.45} src="swooshdn.wav" v={0.36} />
      {[2.6, 2.85, 3.1, 3.35].map((tt, i) => <Sfx key={`gc${i}`} at={L[5] + tt} src={`blip${(i % 5) + 1}.wav`} v={0.2} dur={0.3} />)}
      <Sfx at={L[5] + 4.4} src="chimelo.wav" v={0.32} dur={0.9} />
      {[6.5, 6.9].map((tt, i) => <Sfx key={`sp${i}`} at={L[5] + tt} src="snap.wav" v={0.3} dur={0.4} />)}
      {/* milestones + pellets */}
      {[L[1], L[2], L[4], L[5]].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.3} dur={0.8} />)}
      {[1.5, 4.9, 7.4, 11.5, 16.0, 21.2, 25.5, 30.5, 33.0, 35.2, 38.6].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.15} dur={0.3} />)}
      {/* cta + snack lane */}
      <Sfx at={L[6]} src="resolve.wav" v={0.5} />
      {[0, 1, 2, 3, 4].map((n) => <React.Fragment key={`cl${n}`}><Sfx at={CLOCK_START + n + 0.86} src={`blip${n + 1}.wav`} v={0.34} dur={0.4} /><Sfx at={CLOCK_START + n} src="tick.wav" v={0.22} dur={0.3} /></React.Fragment>)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <Rehook lf={frame - Lf[1]} />}
        {scene(2) && <Haiku lf={frame - Lf[2]} />}
        {scene(3) && <Opus lf={frame - Lf[3]} />}
        {scene(4) && <Wizard lf={frame - Lf[4]} />}
        {scene(5) && <Gate lf={frame - Lf[5]} />}
        {scene(6) && <ClockCTA lf={frame - Lf[6]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
