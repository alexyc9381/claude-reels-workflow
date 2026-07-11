import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_blueprint.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", PURP = "#4B3E8E";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, lecture, handoff, wand-backlog, vault, payoff, cta
const L = [0, 4.02, 9.62, 13.40, 19.70, 24.94, 32.78];
const Lf = L.map(fr);
const CUT = 35.62;
const CLOCK_START = CUT - 3.6;
const BURST = CUT + 1;

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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0 }) => {
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
        {/* police cap: blue crown + band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
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

// floating chat bubble over a listener
const Chat: React.FC<{ x: number; y: number; lf: number; delay: number; txt?: string }> = ({ x, y, lf, delay, txt = "💬" }) => {
  const ap = over(lf, delay, 8, Easing.out(Easing.back(1.8)));
  if (ap <= 0.01) return null;
  const bob = Math.sin(lf / 7 + delay) * 5;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, transform: `scale(${ap})`, opacity: ap, zIndex: 18 }}>
      <div style={{ padding: "5px 11px", borderRadius: 12, borderBottomLeftRadius: 3, background: "#EAF3ED", border: "2px solid #BFD8C7", fontSize: 20 }}>{txt}</div>
    </div>
  );
};

// ---------------- HOOK: wizard plummets, countdown alarms red, crash launches the crowd off-screen ----------------
const CREW: any[] = [
  { x: 20, sz: 150, c: {} }, { x: 186, sz: 140, c: { glasses: 1 } }, { x: 350, sz: 158, c: { judge: 1 } },
  { x: 530, sz: 150, c: { cop: 1 } }, { x: 706, sz: 150, c: { sherlock: 1 } }, { x: 858, sz: 132, c: { brainHat: 1, glasses: 1 } },
];
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const t = lf / FPS;
  const secs = 21 * 3600 - Math.floor(t * 1.6);
  const hh = Math.floor(secs / 3600), mm = Math.floor((secs % 3600) / 60), ss = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const crashF = fr(1.35);                                    // wizard hits the ground
  const fall = over(lf, 0, fr(1.35), Easing.in(Easing.quad)); // falls from frame 0
  const wy = -300 + fall * 1080;                              // sky -> ground (screen coords)
  const crashed = lf >= crashF;
  const impactE = crashed ? Math.max(0, 1 - (lf - crashF) / 12) : 0;
  const shake = crashed ? Math.sin(lf * 3.8) * 12 * impactE * impactE : 0;
  const flashOn = Math.sin(lf / 3.2) > 0;                     // red alarm blink
  const stampAt = crashF + fr(0.4);
  const stamp = over(lf, stampAt, fr(0.3), Easing.out(Easing.back(2)));
  const saveIn = over(lf, fr(2.4), 8, Easing.out(Easing.back(1.8)));
  // dead wizard rests at screen ~ (panel groundY). Panel top 384 + ground ~660 -> ~1044
  return (
    <>
      <Panel label="fable 5 · status">
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
          {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ position: "absolute", left: seed(i * 7) * 1000, top: 40 + seed(i * 3) * 300, width: 3 + seed(i) * 3, height: 3 + seed(i) * 3, borderRadius: "50%", background: "#EAF0FA", opacity: 0.3 + seed(i * 5) * 0.5 }} />)}
          {/* BIG RED FLASHING countdown */}
          <div style={{ position: "absolute", left: 40, right: 40, top: 118, textAlign: "center", zIndex: 20 }}>
            <div style={{ display: "inline-block", padding: "16px 34px", borderRadius: 18, background: flashOn ? "rgba(196,74,58,0.32)" : "rgba(196,74,58,0.12)", border: `5px solid ${RED}`, boxShadow: flashOn ? `0 0 44px ${RED}` : `0 0 14px ${RED}66`, transform: `scale(${flashOn ? 1.03 : 1})` }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#FF8A76", letterSpacing: "0.12em", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={{ opacity: flashOn ? 1 : 0.3 }}>🚨</span> FABLE 5 EXPIRES IN <span style={{ opacity: flashOn ? 1 : 0.3 }}>🚨</span></div>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 100, color: flashOn ? "#FFB4A6" : "#FF6B57", textShadow: `0 0 ${flashOn ? 30 : 14}px ${RED}` }}>{pad(hh)}:{pad(mm)}:{pad(ss)}</div>
            </div>
          </div>
          {/* ground */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 660, height: 132, background: "linear-gradient(180deg, #16202F, #101827)" }} />
          {/* dead wizard after crash (inside panel) */}
          {crashed && (
            <div style={{ position: "absolute", left: 452, top: 566, zIndex: 24, transform: "rotate(90deg)", opacity: Math.max(0.4, 1 - (lf - crashF) / 60) }}>
              <Mascot lf={lf} size={150} wizard={1} glasses={1} nodAmp={0} nodSpeed={99} shock={0.9} />
              <div style={{ position: "absolute", left: 42, top: 30, fontSize: 40, color: "#151312", fontWeight: 900 }}>✕</div>
            </div>
          )}
          {/* crash dust */}
          {crashed && impactE > 0.05 && Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI; const d = (1 - impactE) * 150; return <div key={k} style={{ position: "absolute", left: 520 + Math.cos(a) * d, top: 690 - Math.sin(a) * d * 0.5, width: 34, height: 34, borderRadius: "50%", background: "rgba(200,210,230,0.32)", filter: "blur(3px)", opacity: impactE, zIndex: 23 }} />; })}
          {/* stamp */}
          {stamp > 0.01 && (
            <div style={{ position: "absolute", left: 60, top: 372, transform: `rotate(-11deg) scale(${interpolate(stamp, [0, 1], [2.6, 1])})`, opacity: Math.min(1, stamp * 1.4), padding: "9px 22px", borderRadius: 12, border: `5px solid ${RED}`, color: "#FF8A76", background: "rgba(196,74,58,0.14)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, boxShadow: `0 0 26px ${RED}66`, zIndex: 30, whiteSpace: "nowrap" }}>GONE IN 21 HOURS</div>
          )}
          {saveIn > 0.01 && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 476, textAlign: "center", transform: `scale(${saveIn})`, opacity: saveIn, zIndex: 31 }}>
              <span style={{ padding: "8px 20px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#3a2a05", boxShadow: `0 0 20px ${GOLD}` }}>🔖 save this before it's gone</span>
            </div>
          )}
          {/* standing crowd INSIDE the container (before crash) */}
          {!crashed && CREW.map((m, i) => (
            <div key={i} style={{ position: "absolute", left: m.x, top: 700 - m.sz, zIndex: 14 }}>
              <Mascot lf={lf + i * 4} size={m.sz} nodAmp={2.6} nodSpeed={7 + (i % 3)} gaze={m.x < 500 ? 4 : -4} {...m.c} />
            </div>
          ))}
        </div>
      </Panel>
      {/* FULL-SCREEN OVERLAY (escapes the panel): the falling wizard + the launched crowd fly off-screen */}
      <AbsoluteFill style={{ zIndex: 60, pointerEvents: "none" }}>
        {/* the falling wizard (before crash), plummeting from the sky */}
        {!crashed && (
          <div style={{ position: "absolute", left: 470, top: wy, transform: `rotate(${fall * 90}deg)`, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))" }}>
            <Mascot lf={lf} size={168} wizard={1} glasses={1} nodAmp={0} nodSpeed={99} shock={fall > 0.4 ? 0.6 : 0} />
            {/* motion streaks */}
            {fall > 0.2 && [0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 40 + i * 40, top: -30 - i * 18, width: 5, height: 40, background: "rgba(217,119,87,0.4)", borderRadius: 3 }} />)}
          </div>
        )}
        {/* the crowd LAUNCHES up + off-screen on crash (screen coords; panelX+34, panelGround 384+700=1084) */}
        {crashed && CREW.map((m, i) => {
          const gx = m.x + 34, gy = 1084 - m.sz;
          const dt = (lf - crashF) / FPS;
          const vy = 1500 + seed(i) * 500;
          const vx = (m.x < 500 ? -1 : 1) * (500 + seed(i * 3) * 700);
          const g = 900;
          const x = gx + vx * dt;
          const y = gy - vy * dt + 0.5 * g * dt * dt;
          if (y > 2000 || x < -300 || x > 1380) return null;
          return <div key={i} style={{ position: "absolute", left: x, top: y, transform: `rotate(${dt * (vx > 0 ? 520 : -520)}deg)` }}><Mascot lf={lf + i * 4} size={m.sz} nodAmp={0} nodSpeed={99} shock={0.7} {...m.c} /></div>;
        })}
        {/* white crash flash */}
        {crashed && impactE > 0 && <AbsoluteFill style={{ background: "#FFF3E0", opacity: impactE * 0.5 }} />}
      </AbsoluteFill>
    </>
  );
};

// ---------------- LECTURE: the wise planner teaching the crowd ----------------
const Lecture: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 1, 8, Easing.out(Easing.back(1.2)));
  const reveal = over(lf, fr(2.2), fr(0.4), Easing.out(Easing.back(2)));  // "smartest planner alive" ~7.4 local? actually L1+3.3
  return (
    <Panel label="the planner">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 26%, rgba(120,150,210,0.12), transparent 62%)" }} />
      {/* chalkboard with a plan diagram */}
      <div style={{ position: "absolute", left: 300, top: 96, width: 470, height: 210, borderRadius: 10, background: "#1B2B23", border: "8px solid #6E5236", opacity: inP, boxShadow: "0 20px 40px -16px rgba(0,0,0,0.6)" }}>
        <div style={{ position: "absolute", left: 20, top: 16, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#CFE8DA" }}>THE PLAN</div>
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 24, top: 62 + i * 40, width: `${70 - i * 12}%`, height: 8, borderRadius: 4, background: "rgba(180,220,200,0.5)", opacity: over(lf, fr(0.6) + i * 4, 8) }} />)}
        {/* connecting arrows */}
        <div style={{ position: "absolute", right: 30, top: 60, fontSize: 60, color: "#8FE0B0", opacity: over(lf, fr(1.4), 10) }}>➜</div>
      </div>
      {/* lectern */}
      <div style={{ position: "absolute", left: 128, top: 486, width: 150, height: 150, background: "linear-gradient(180deg, #8A6844, #6E5236)", border: "3px solid #4E3A24", borderRadius: "10px 10px 4px 4px", zIndex: 13, opacity: inP }}>
        <div style={{ position: "absolute", left: 20, top: -10, width: 110, height: 20, background: "#6E5236", borderRadius: 4, transform: "rotate(-6deg)" }} />
      </div>
      {/* Fable the wizard lecturing (points at board) */}
      <div style={{ position: "absolute", left: 96, top: 350, zIndex: 16, opacity: inP }}>
        <Mascot lf={lf} size={210} wizard={1} glasses={1} nodAmp={2.6} nodSpeed={7} gaze={6} cheer={reveal * 0.6} />
      </div>
      {/* the smartest planner alive tag */}
      {reveal > 0.01 && (
        <div style={{ position: "absolute", left: 300, top: 336, transform: `scale(${reveal})`, opacity: reveal, zIndex: 30 }}>
          <div style={{ display: "inline-block", padding: "8px 18px", borderRadius: 12, background: grad("#5C4EA0", "#3A2F73"), border: "3px solid #8A7AD0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#fff", boxShadow: "0 0 26px rgba(139,122,208,0.6)" }}>🧙 the smartest planner alive</div>
        </div>
      )}
      {/* rowdy students: jump up and down, a couple bump/fight, chat bubbles */}
      {[[300, 620, 92, 0], [452, 626, 86, 3], [600, 620, 94, 6], [748, 626, 88, 9], [880, 620, 90, 2]].map(([x, y, sz, off], i) => {
        const jump = Math.abs(Math.sin(lf / (5 + i) + i * 2)) * 26;               // bouncing
        const fight = (i === 1 || i === 2) ? Math.sin(lf / 4) * (i === 1 ? 20 : -20) : 0;  // 1 & 2 shove each other
        return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: (x as number) + fight, top: (y as number) - (sz as number) - jump, zIndex: 14 }}>
            <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={4} nodSpeed={5} gaze={(x as number) < 560 ? 5 : -5} cheer={0.5 + Math.max(0, Math.sin(lf / 6 + i)) * 0.5} glasses={i % 2} />
          </div>
          <Chat x={(x as number) + 44} y={(y as number) - (sz as number) - 40 - jump} lf={lf} delay={fr(0.6) + i * 4} txt={["🙌", "🤯", "💥", "✍️", "💡"][i]} />
        </React.Fragment>
      ); })}
      {/* SAVE NOW chip (top-right of the container) */}
      <div style={{ position: "absolute", right: 30, top: 86, zIndex: 32, opacity: over(lf, fr(1.0), 8, Easing.out(Easing.back(1.8))), transform: `scale(${over(lf, fr(1.0), 8, Easing.out(Easing.back(1.8)))})` }}>
        <span style={{ padding: "6px 14px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2.5px solid #F6E4A0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#3a2a05", boxShadow: `0 0 16px ${GOLD}` }}>🔖 save this</span>
      </div>
    </Panel>
  );
};

// ---------------- HANDOFF: hand a cheap model the plan + a giant brain + upload bar ----------------
const Handoff: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 1, 8);
  const passAt = fr(0.4);
  const pass = over(lf, passAt, fr(1.2), Easing.inOut(Easing.cubic));   // scroll travels wizard -> cheap model
  const up = over(lf, fr(1.6), fr(1.8));                                // upload bar
  const brain = over(lf, fr(1.8), fr(1.2), Easing.out(Easing.back(1.4)));
  const smart = up >= 0.98;
  const sx = 300 + pass * 440;
  const sy = 420 - Math.sin(pass * Math.PI) * 70;
  return (
    <Panel label="the handoff">
      {/* wizard left + "take this" chat bubble */}
      <div style={{ position: "absolute", left: 70, top: 396, zIndex: 14, opacity: inP }}>
        <Mascot lf={lf} size={200} wizard={1} glasses={1} beard={1} nodAmp={2.4} nodSpeed={8} gaze={7} cheer={pass > 0.5 ? 0.6 : 0} />
        <div style={{ position: "absolute", left: 30, top: 8, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#C3B4EC", whiteSpace: "nowrap" }}>Fable 5</div>
        {(() => { const cb = over(lf, fr(0.15), fr(0.35), Easing.out(Easing.back(2))) * (1 - over(lf, fr(2.4), fr(0.4))); if (cb <= 0.01) return null; return (
          <div style={{ position: "absolute", left: 150, top: -46, transform: `scale(${cb})`, opacity: cb, zIndex: 22 }}>
            <div style={{ padding: "8px 18px", borderRadius: 16, borderBottomLeftRadius: 4, background: "#fff", border: "3px solid #8A7AD0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: PURP, whiteSpace: "nowrap", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.5)" }}>take this 👉</div>
          </div>
        ); })()}
      </div>
      {/* the plan scroll travels across */}
      {pass < 0.98 && (
        <div style={{ position: "absolute", left: sx, top: sy, transform: `translate(-50%,-50%) rotate(${pass * 300}deg)`, zIndex: 20 }}>
          <div style={{ fontSize: 54, filter: `drop-shadow(0 0 12px ${GOLD})` }}>📜</div>
        </div>
      )}
      {/* cheap model right, gets a GIANT brain + upload */}
      <div style={{ position: "absolute", right: 90, top: 452, zIndex: 14, opacity: inP }}>
        {/* giant brain grows above it */}
        {brain > 0.02 && (
          <div style={{ position: "absolute", left: "50%", top: -60 - brain * 90, transform: `translateX(-50%) scale(${brain})`, zIndex: 16 }}>
            <div style={{ fontSize: 70 + brain * 40, filter: `drop-shadow(0 0 ${16 * brain}px rgba(232,162,184,0.9))` }}>🧠</div>
          </div>
        )}
        <Mascot lf={lf + 6} size={120 + up * 90} gaze={-7} nodAmp={smart ? 4 : 2} nodSpeed={smart ? 5.5 : 10} glasses={smart ? 1 : 0} beard={up > 0.7 ? 1 : 0} cheer={smart ? Math.min(1, (lf - fr(3.4)) / 8) : 0} />
        <div style={{ position: "absolute", left: 40, top: -30, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(190,205,235,0.7)", whiteSpace: "nowrap" }}>cheap model</div>
      </div>
      {/* upload bar */}
      {up > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 22 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "rgba(200,215,240,0.8)", marginBottom: 8 }}>{smart ? "transfer complete ✓" : "uploading the plan..."}</div>
          <div style={{ width: 460, height: 26, borderRadius: 999, background: "rgba(35,50,80,0.7)", border: "2px solid rgba(150,175,220,0.4)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${up * 100}%`, background: grad("#8FE0B0", "#3F9E74"), boxShadow: `0 0 14px ${GREEN}` }} />
          </div>
          <div style={{ marginTop: 6, fontFamily: mono, fontWeight: 700, fontSize: 24, color: "#8FE0B0" }}>{Math.round(up * 100)}%</div>
        </div>
      )}
      {smart && <Firework lf={lf} at={fr(3.4) + 1} x={870} y={430} hue={2} />}
    </Panel>
  );
};

// ---------------- WAND + BACKLOG: abracadabra, thick beam, files -> one animated blueprint spewing money ----------------
const Wand: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 1, 8);
  const zapAt = fr(0.9);                                  // beam points EARLY
  const zap = over(lf, zapAt, fr(0.45));
  const convert = over(lf, zapAt + fr(0.35), fr(1.5), Easing.inOut(Easing.cubic));
  const bp = over(lf, zapAt + fr(0.55), fr(0.9), Easing.out(Easing.back(1.3)));
  const beamGone = bp;                                    // beam fades as the blueprint forms
  const abra = over(lf, fr(0.3), fr(0.35), Easing.out(Easing.back(2)));
  const abraOut = over(lf, zapAt + fr(0.5), fr(0.3));
  const moneyOn = bp > 0.6;
  return (
    <Panel label="the backlog">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 72% 40%, rgba(231,178,76,0.14), transparent 60%)" }} />
      {/* the wizard with wand, left */}
      <div style={{ position: "absolute", left: 60, top: 400, zIndex: 16, opacity: inP }}>
        <Mascot lf={lf} size={210} wizard={1} glasses={1} nodAmp={2.4 + zap * 3} nodSpeed={8} gaze={7} cheer={zap} />
        {/* ABRACADABRA speech bubble */}
        {abra > 0.01 && abraOut < 0.9 && (
          <div style={{ position: "absolute", left: 150, top: -30, transform: `scale(${abra})`, opacity: abra * (1 - abraOut), zIndex: 20 }}>
            <div style={{ padding: "8px 18px", borderRadius: 16, borderBottomLeftRadius: 4, background: "#fff", border: "3px solid #E7B24C", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: PURP, whiteSpace: "nowrap", boxShadow: `0 0 18px ${GOLD}` }}>✨ Abracadabra!</div>
          </div>
        )}
      </div>
      {/* the THICK wand beam (disappears once the blueprint is formed) */}
      {zap > 0.05 && beamGone < 0.85 && (() => { const w = zap; const bx = 250, by = 470; return (
        <div style={{ position: "absolute", left: bx, top: by - 70, zIndex: 15, opacity: (0.7 + Math.sin(lf * 1.8) * 0.3) * (1 - beamGone) }}>
          <div style={{ width: 430 * w, height: 150, clipPath: "polygon(0 40%, 0 60%, 100% 0, 100% 100%)", background: `linear-gradient(90deg, ${GOLD}, rgba(231,178,76,0.15))`, filter: "blur(2px)", boxShadow: `0 0 40px ${GOLD}` }} />
          <div style={{ position: "absolute", left: 0, top: 62, width: 430 * w, height: 26, borderRadius: 999, background: "#FFF6E0", filter: "blur(1px)", opacity: 0.9 }} />
        </div>
      ); })()}
      {/* messy stacks collapse into the spell */}
      {[[620, 300], [770, 340], [700, 210], [850, 250]].map(([sx, sy], si) => {
        const gone = Math.max(0, convert * 1.6 - si * 0.12);
        if (gone > 0.98) return null;
        return (
        <div key={si} style={{ position: "absolute", left: sx as number, top: sy as number, zIndex: 13, opacity: (1 - gone), transform: `translate(${gone * (560 - (sx as number))}px, ${gone * 40}px) scale(${1 - gone * 0.5})` }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: (seed(si * 3 + i) - 0.5) * 40, top: 210 - i * 26, transform: `rotate(${(seed(si * 5 + i * 7) - 0.5) * 22}deg)`, zIndex: i }}>
              <div style={{ width: 120, height: 36, background: "#D9CFBB", border: "2px solid #B3A788", borderRadius: 4, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.5)" }}>
                <div style={{ height: 5, background: "#B3A788", margin: "8px 12px 0", borderRadius: 2 }} /><div style={{ height: 5, background: "#B3A788", margin: "5px 12px 0", width: "60%", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      ); })}
      {/* ONE big ANIMATED step-by-step blueprint */}
      {bp > 0.02 && (() => {
        const bob = Math.sin(lf / 9) * 6;
        const shine = ((lf / fr(2.2)) % 1);          // shimmer sweep
        return (
        <div style={{ position: "absolute", left: 540, top: 150 + bob, width: 410, transform: `scale(${0.85 + bp * 0.15})`, opacity: bp, zIndex: 22 }}>
          <div style={{ position: "relative", borderRadius: 16, background: "linear-gradient(180deg, #FBF6EC, #EFE3C8)", border: "3px solid #E7B24C", padding: "18px 22px", boxShadow: `0 0 ${40 + Math.sin(lf / 6) * 12}px rgba(231,178,76,0.7)`, overflow: "hidden" }}>
            {/* shimmer */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-30 + shine * 140}%`, width: 60, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)", transform: "skewX(-18deg)" }} />
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#7A5A18", textAlign: "center", marginBottom: 12 }}>📜 THE BLUEPRINT</div>
            {["set the goal", "the limits", "the exact steps", "ship it"].map((st, i) => {
              const done = over(lf, zapAt + fr(0.9) + i * 4, 8);
              const justDone = Math.max(0, 1 - Math.abs(lf - (zapAt + fr(0.9) + i * 4 + 6)) / 5);
              return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, margin: "9px 0", opacity: done, transform: `translateX(${(1 - done) * 30}px) scale(${1 + justDone * 0.06})` }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: done > 0.9 ? GREEN : "#C9BCA4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, boxShadow: justDone > 0.3 ? `0 0 12px ${GREEN}` : "none" }}>{done > 0.9 ? "✓" : i + 1}</span>
                <span style={{ fontFamily: mono, fontSize: 20, color: "#5A4A2A", fontWeight: 700 }}>{st}</span>
              </div>
            ); })}
          </div>
        </div>
      ); })()}
      {/* SECOND HALF: the blueprint MULTIPLIES into a growing fanned stack + a climbing counter */}
      {(() => {
        const mAt = zapAt + fr(2.0);
        const n = Math.floor(over(lf, mAt, fr(3.2)) * 14);
        return (<>
          {Array.from({ length: n }, (_, i) => {
            const pop = over(lf, mAt + i * 2.0, 6, Easing.out(Easing.back(1.6)));
            const ang = (i - n / 2) * 4;
            return (
              <div key={`bp${i}`} style={{ position: "absolute", left: 560 + (i % 2 ? 1 : -1) * (10 + i * 3), top: 158 - i * 5, width: 410, transform: `rotate(${ang}deg) scale(${(0.85) * pop})`, opacity: pop * 0.9, zIndex: 20 - i, transformOrigin: "50% 100%" }}>
                <div style={{ height: 210, borderRadius: 16, background: "linear-gradient(180deg, #FBF6EC, #EFE3C8)", border: "3px solid #E7B24C", boxShadow: `0 0 20px rgba(231,178,76,0.5)` }} />
              </div>
            );
          })}
          {n > 0 && (() => { const pulse = Math.max(0, 1 - (lf % 4) / 4); return (
            <div style={{ position: "absolute", left: 636, top: 96, zIndex: 33, transform: `scale(${1 + pulse * 0.1})` }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: grad("#5C4EA0", "#3A2F73"), border: "3px solid #8A7AD0", boxShadow: `0 0 16px rgba(139,122,208,0.7)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff" }}>📜 x{n}</div>
            </div>
          ); })()}
        </>);
      })()}
      {/* DEPLETING pie countdown ring */}
      {(() => { const dep = Math.min(1, lf / (Lf[4] - Lf[3])); return (
        <div style={{ position: "absolute", left: "50%", top: 40, width: 64, height: 64, marginLeft: -32, zIndex: 34 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(${GOLD} ${(1 - dep) * 360}deg, rgba(58,92,132,0.25) ${(1 - dep) * 360}deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 62%, #000 63%)", mask: "radial-gradient(circle closest-side, transparent 62%, #000 63%)", filter: `drop-shadow(0 0 8px ${GOLD})` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⏳</div>
        </div>
      ); })()}
      {/* the crowd below (5, present from the start) */}
      {[[110, 100, 0], [270, 92, 4], [420, 98, 8], [560, 90, 2], [700, 96, 6]].map(([x, sz, off], i) => (
        <div key={i} style={{ position: "absolute", left: x as number, top: 712 - (sz as number), zIndex: 17 }}>
          <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={4} nodSpeed={5.5} gaze={4} cheer={moneyOn ? 0.8 : 0} {...[{}, { glasses: 1 }, {}, { glasses: 1 }, {}][i]} />
        </div>
      ))}
      {/* money SPEWS from the blueprint down onto the sprites */}
      {moneyOn && Array.from({ length: 16 }, (_, i) => {
        const p = ((lf / fr(1.5) + seed(i * 2)) % 1);
        const sx2 = 700 + (seed(i) - 0.5) * 200;         // from the blueprint
        const ex2 = 120 + seed(i * 3) * 620;             // toward the crowd
        const x = sx2 + (ex2 - sx2) * p;
        const y = 300 + p * 360 + Math.sin(p * 6) * 10;
        return <div key={`m${i}`} style={{ position: "absolute", left: x, top: y, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#C98A2A"), border: "2px solid #F6E4A0", opacity: Math.max(0, 1 - p) * 0.95, transform: `rotateX(${p * 500}deg)`, fontSize: 13, textAlign: "center", lineHeight: "22px", fontWeight: 800, color: "#3a2a05", zIndex: 20 }}>$</div>;
      })}
    </Panel>
  );
};

// reusable metal vault graphic
const VaultBox: React.FC<{ locked: number; glow?: number; w?: number }> = ({ locked, glow = 0, w = 420 }) => {
  const h = w * 0.95;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: 20, background: "linear-gradient(180deg, #3A4E74, #26344F)", border: `${w * 0.014}px solid #5A6E96`, boxShadow: glow > 0.05 ? `0 0 44px ${GOLD}, ${NAVYSH}` : NAVYSH }}>
      {[[0.057, 0.06], [0.886, 0.06], [0.057, 0.85], [0.886, 0.85]].map(([x, y], i) => <div key={i} style={{ position: "absolute", left: x * w, top: y * h, width: w * 0.043, height: w * 0.043, borderRadius: "50%", background: "#7E92BA", border: "2px solid #34435F" }} />)}
      {[0, 1].map((d) => (
        <div key={d} style={{ position: "absolute", top: h * 0.1, left: d === 0 ? w * 0.095 : "50%", width: w * 0.38, height: h * 0.8, transformOrigin: d === 0 ? "0% 50%" : "100% 50%", transform: `rotateY(${(d === 0 ? -1 : 1) * (1 - locked) * 62}deg)`, background: "linear-gradient(90deg, #44598A, #33445F)", border: "3px solid #6A7EA6", borderRadius: d === 0 ? "8px 0 0 8px" : "0 8px 8px 0", zIndex: 6 }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${locked > 0.98 ? 220 : (1 - locked) * -120}deg)`, width: w * 0.285, height: w * 0.285, zIndex: 8 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${w * 0.024}px solid #7E92BA`, background: "#2B3A57" }} />
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: w * 0.157, marginLeft: -4, marginTop: -w * 0.078, background: "#7E92BA", borderRadius: 4, transform: `rotate(${i * 45}deg)` }} />)}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: w * 0.072 }}>{locked > 0.98 ? "🔒" : "🔓"}</div>
      </div>
    </div>
  );
};

// flip-page calendar
const FlipCalendar: React.FC<{ month: string; flip: number }> = ({ month, flip }) => (
  <div style={{ position: "relative", width: 190, height: 210 }}>
    <div style={{ position: "absolute", left: -8, top: -8, width: 40, height: 24, background: "#8A8272", borderRadius: 6 }} />
    <div style={{ position: "absolute", right: -8, top: -8, width: 40, height: 24, background: "#8A8272", borderRadius: 6 }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: PAPER, border: "3px solid #C9BCA4", overflow: "hidden", boxShadow: "0 18px 36px -14px rgba(0,0,0,0.45)" }}>
      <div style={{ height: 54, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff" }}>{month}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 54, bottom: 0, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, padding: 14 }}>
        {Array.from({ length: 15 }, (_, i) => <div key={i} style={{ borderRadius: 4, background: "#E4DCCB" }} />)}
      </div>
      {flip > 0.01 && flip < 0.99 && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${(1 - flip) * 100}%`, background: "rgba(251,246,236,0.94)", borderBottom: "2px solid #C9BCA4", transformOrigin: "50% 0%", transform: `scaleY(${1 - flip})` }} />}
    </div>
  </div>
);

// ---------------- VAULT: the blueprint (blurred/gated) locks into the vault ----------------
const GATE_LINES = ["the goal, the limits, the exact steps,", "and the files a cheap model needs to ship it."];
const Vault: React.FC<{ lf: number }> = ({ lf }) => {
  const scrollIn = over(lf, fr(0.2), fr(0.5), Easing.out(Easing.back(1.4)));
  const fillP = over(lf, fr(0.5), fr(2.7));
  const lockAt = fr(3.3);
  const shrink = over(lf, lockAt, fr(0.55), Easing.in(Easing.cubic));
  const doors = over(lf, lockAt + fr(0.5), fr(0.5), Easing.inOut(Easing.cubic));
  const locked = doors >= 0.98 ? 1 : doors;
  const isLocked = doors >= 0.98;
  const guardIn = over(lf, lockAt + fr(0.6), 10, Easing.out(Easing.back(1.6)));
  return (
    <Panel label="the blueprint" tint="rgba(231,178,76,0.5)">
      {/* the blurred gated blueprint scroll (shrinks into the vault) */}
      {shrink < 0.9 && (
        <div style={{ position: "absolute", left: 150, right: 150, top: 132, transform: `scale(${1 - shrink * 0.7}) translateY(${shrink * 180}px)`, opacity: 1 - shrink, zIndex: 20 }}>
          <div style={{ borderRadius: 16, background: "linear-gradient(180deg, #FBF6EC, #EFE3C8)", border: "3px solid #E7B24C", padding: "18px 24px", boxShadow: `0 0 34px rgba(231,178,76,0.6)` }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#7A5A18", textAlign: "center", marginBottom: 10 }}>📜 THE BLUEPRINT</div>
            {GATE_LINES.map((ln, i) => <div key={i} style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.55, color: "#5A4A2A", filter: "blur(6px)", opacity: 0.85, textAlign: "center", userSelect: "none" }}>{ln}</div>)}
            <div style={{ marginTop: 10, textAlign: "center" }}><span style={{ padding: "5px 14px", borderRadius: 999, background: "rgba(207,149,68,0.18)", border: `1.5px solid ${AMBER}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "#8a6a2a" }}>unblurred in the guide ↓</span></div>
          </div>
        </div>
      )}
      {/* THE VAULT (moved higher) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center", zIndex: 14 }}>
        <VaultBox locked={locked} glow={isLocked ? 1 : 0} w={400} />
      </div>
      {/* progress bar filling UNDER the vault (loading the blueprint in) */}
      {!isLocked && (
        <div style={{ position: "absolute", left: 300, right: 300, top: 556, zIndex: 20, opacity: over(lf, fr(0.3), 8) }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(200,215,240,0.75)", textAlign: "center", marginBottom: 6 }}>{fillP > 0.98 ? "secured ✓" : "sealing the vault..."}</div>
          <div style={{ height: 22, borderRadius: 999, background: "rgba(35,50,80,0.7)", border: "2px solid rgba(150,175,220,0.4)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${fillP * 100}%`, background: grad("#F0CB63", "#D39A2A"), boxShadow: `0 0 14px ${GOLD}` }} />
          </div>
        </div>
      )}
      {/* label BELOW the vault (no overlap) */}
      {isLocked && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 566, textAlign: "center", zIndex: 20, transform: `scale(${over(lf, lockAt + fr(0.5), 8, Easing.out(Easing.back(1.6)))})` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F6E4A0", textShadow: `0 0 16px ${GOLD}` }}>THE BLUEPRINT VAULT</span>
        </div>
      )}
      {/* 2 SECURITY GUARD Claudes flank the vault the WHOLE time; +2 more after it locks */}
      {[96, 812].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: 470, zIndex: 16 }}>
          <Mascot lf={lf + i * 7} size={150} cop={1} glasses={1} stern={0.7} nodAmp={1.6} nodSpeed={9} gaze={i ? -8 : 8} />
          <div style={{ position: "absolute", left: i ? 8 : 116, top: 70, width: 8, height: 46, background: "#2A2438", borderRadius: 4, transform: `rotate(${i ? 20 : -20}deg)` }} />
        </div>
      ))}
      {guardIn > 0.01 && [10, 906].map((x, i) => (
        <div key={`g2${i}`} style={{ position: "absolute", left: x, top: 386, zIndex: 15, opacity: guardIn, transform: `scale(${guardIn})` }}>
          <Mascot lf={lf + 3 + i * 5} size={110} cop={1} glasses={1} stern={0.8} nodAmp={1.4} nodSpeed={10} gaze={i ? -6 : 6} />
          <div style={{ position: "absolute", left: i ? 6 : 86, top: 52, width: 7, height: 36, background: "#2A2438", borderRadius: 4, transform: `rotate(${i ? 20 : -20}deg)` }} />
        </div>
      ))}
      {/* velvet rope + spotlights for drama */}
      {isLocked && <div style={{ position: "absolute", left: 0, right: 0, top: 622, textAlign: "center", zIndex: 15, opacity: guardIn }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(200,215,240,0.7)" }}>locked. yours. safe from the meter.</span></div>}
      {isLocked && <Firework lf={lf} at={lockAt + fr(1.0) + 1} x={540} y={340} hue={1} />}
    </Panel>
  );
};

// ---------------- PAYOFF: one night -> months, cheap models build for pennies ----------------
const Payoff: React.FC<{ lf: number }> = ({ lf }) => {
  const slam = over(lf, fr(0.4), 7, Easing.out(Easing.back(2.2)));
  const buildAt = fr(1.7);
  const months = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const mprog = over(lf, fr(3.4), fr(3.8)) * 5.999;
  const mi = Math.min(5, Math.floor(mprog));
  const flip = mprog - Math.floor(mprog);
  const pennies = Math.floor(over(lf, buildAt, fr(5.2)) * 240);
  const pennyPulse = Math.max(0, 1 - (lf % 4) / 4);
  // Fable self-fling: sits below the vault, tilts left, then flings off-screen
  const windAt = fr(4.4);
  const wind = over(lf, windAt, fr(0.7), Easing.out(Easing.cubic));
  const fireAt = windAt + fr(0.75);
  const fired = lf >= fireAt;
  const ft = (lf - fireAt) / FPS;
  const fx = 110 + (fired ? 1500 * ft : 0);
  const fy = 930 - (fired ? 700 * ft - 620 * ft * ft : 0);
  return (
    <>
    <Panel label="one night = months">
      {/* night moon top-right */}
      <div style={{ position: "absolute", right: 70, top: 76, width: 118, height: 118, zIndex: 11, opacity: over(lf, fr(0.6), 10) }}>
        <div style={{ position: "absolute", left: -24, top: -24, width: 166, height: 166, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,222,0.34), transparent 66%)", transform: `scale(${1 + Math.sin(lf / 10) * 0.08})` }} />
        <div style={{ position: "relative", width: 118, height: 118, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FFF6DE, #EFD9A8)", boxShadow: "0 0 40px rgba(240,217,168,0.6)" }}>
          <div style={{ position: "absolute", left: 22, top: 70, width: 18, height: 18, borderRadius: "50%", background: "rgba(201,176,120,0.5)" }} />
          <div style={{ position: "absolute", left: 78, top: 82, width: 12, height: 12, borderRadius: "50%", background: "rgba(201,176,120,0.5)" }} />
          <div style={{ position: "absolute", left: 34, top: 40, width: 12, height: 20, background: "#151312" }} />
          <div style={{ position: "absolute", left: 72, top: 40, width: 12, height: 20, background: "#151312" }} />
          <div style={{ position: "absolute", left: 46, top: 74, width: 26, height: 6, background: "#151312", borderRadius: 3 }} />
        </div>
        {[[-30, 20], [150, 40], [130, 130]].map(([tx, ty], i) => <div key={i} style={{ position: "absolute", left: tx, top: ty, fontSize: 18, opacity: 0.4 + Math.max(0, Math.sin(lf / 6 + i * 2)) * 0.6 }}>✦</div>)}
      </div>
      {/* the proper vault, left, feeding builders */}
      <div style={{ position: "absolute", left: 40, top: 320, zIndex: 12, opacity: over(lf, fr(1.2), 8) }}>
        <VaultBox locked={0.4} glow={0.4} w={210} />
        {Array.from({ length: 3 }, (_, i) => { const p = ((lf / fr(1.4) + i * 0.33) % 1); return <div key={i} style={{ position: "absolute", left: 180 + p * 130, top: 74 - p * 24, fontSize: 24, opacity: Math.min(1, (1 - p) * 3), zIndex: 13 }}>📜</div>; })}
      </div>
      {/* word slam */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 104, textAlign: "center", zIndex: 30 }}>
        <span style={{ display: "inline-block", transform: `scale(${slam})`, opacity: slam, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EEE2" }}>one night <span style={{ color: "#8FE0B0" }}>= months</span></span>
      </div>
      {/* construction crew, hard hats ON their heads */}
      {[[360, 100, 0], [500, 112, 5], [640, 100, 9], [770, 108, 3], [890, 96, 7]].map(([x, sz, off], i) => (
        <div key={i} style={{ position: "absolute", left: x as number, top: 656 - (sz as number), zIndex: 16, opacity: over(lf, buildAt + i * 3, 8) }}>
          <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={4 + Math.max(0, Math.sin(lf / 5 + i)) * 3} nodSpeed={5} gaze={-4} glasses={i % 2} />
          {/* hardhat sits ON the head */}
          <div style={{ position: "absolute", left: (sz as number) * 0.24, top: (sz as number) * 0.02, width: (sz as number) * 0.52, height: (sz as number) * 0.19, borderRadius: `${(sz as number) * 0.09}px ${(sz as number) * 0.09}px 3px 3px`, background: "#F2C14E", border: "3px solid #C79A2E", zIndex: 5 }} />
          <div style={{ position: "absolute", left: (sz as number) * 0.44, top: -2, width: (sz as number) * 0.12, height: (sz as number) * 0.06, background: "#F2C14E", borderRadius: 3, zIndex: 5 }} />
          <div style={{ position: "absolute", right: -12, top: 24, fontSize: 26, transform: `rotate(${-24 + Math.max(0, Math.sin(lf / 4 + i)) * 48}deg)`, transformOrigin: "20% 80%", zIndex: 6 }}>🔨</div>
        </div>
      ))}
      {/* flip calendar (up + right) */}
      <div style={{ position: "absolute", left: 600, top: 250, zIndex: 20, opacity: over(lf, fr(3.2), 8) }}>
        <FlipCalendar month={months[mi]} flip={flip} />
      </div>
      {/* money meter, right above the vault, compact */}
      {pennies > 0 && (
        <div style={{ position: "absolute", left: 44, top: 260, zIndex: 22, transform: `scale(${1 + pennyPulse * 0.08})` }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 16px", borderRadius: 14, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 ${18 + pennyPulse * 12}px ${GOLD}` }}>
            <span style={{ fontSize: 28 }}>🪙</span>
            <div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: "#7a5a12", letterSpacing: "0.06em" }}>ALL FOR</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, lineHeight: 0.95, color: "#3a2a05" }}>{pennies}¢</div>
            </div>
          </div>
        </div>
      )}
      {Array.from({ length: 14 }, (_, i) => { const p = ((lf / fr(2.0) + seed(i)) % 1); if (lf < buildAt) return null; return <div key={`c${i}`} style={{ position: "absolute", left: 300 + seed(i * 3) * 520, top: 580 + p * 190, width: 22, height: 22, borderRadius: "50%", background: grad("#F0CB63", "#C98A2A"), border: "2px solid #F6E4A0", opacity: Math.max(0, 1 - p) * 0.85, transform: `rotateX(${p * 480}deg)`, zIndex: 19 }} />; })}
    </Panel>
    {/* Fable flung off-screen (overlay, escapes container). vault is screen ~ (74,704); Fable below it */}
    <AbsoluteFill style={{ zIndex: 60, pointerEvents: "none" }}>
      {lf >= windAt - 8 && (fx < 1360 && fy > -260) && (
        <div style={{ position: "absolute", left: fx, top: fy, transform: `rotate(${fired ? -20 - ft * 760 : -wind * 26}deg)`, filter: fired ? "drop-shadow(0 8px 16px rgba(0,0,0,0.4))" : "none" }}>
          <Mascot lf={lf} size={132} wizard={1} glasses={1} nodAmp={0} nodSpeed={99} shock={wind > 0.4 || fired ? 0.7 : 0} />
        </div>
      )}
      {fired && ft < 0.5 && <div style={{ position: "absolute", left: 120, top: 860, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: RED, opacity: Math.max(0, 1 - ft * 2), transform: `scale(${1 + ft * 2})` }}>GONE 💨</div>}
    </AbsoluteFill>
    </>
  );
};

// ---------------- CTA ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5)));
  const kw = "BLUEPRINT";
  const typed = Math.floor(over(lf, fr(0.5), fr(1.2)) * kw.length);
  const kwPulse = 1 + Math.sin(lf / 3.4) * 0.04;
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      {/* urgency banner */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 366, textAlign: "center", transform: `scale(${inP})` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(196,74,58,0.16)", border: `2px solid ${RED}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#FF8A76" }}>🚨 gone in 21 hours, grab it free now</span>
      </div>
      <div style={{ position: "absolute", left: 220, right: 220, top: 436, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "rgba(255,255,255,0.85)" }}>THE BLUEPRINT VAULT</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff" }}>the mining prompt + template</div>
          </div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>
            {["The exact mining prompt", "The blueprint template", "The overnight batch loop"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: INK }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* bouncing arrows pointing down at the comment */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 792 + arrowBob, textAlign: "center", fontSize: 40, opacity: inP }}>⬇️</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 ${34 + (kwPulse - 1) * 400}px rgba(210,114,78,0.6)`, transform: `scale(${kwPulse})` }}>BLUEPRINT</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "15px 24px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 32, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>➤</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// CTA scene wrapper: content + snack lane countdown ending at 2
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const clockLf = lf - fr(CLOCK_START - L[6]);
  return (
    <>
      <CTA lf={lf} />
      {clockLf >= 0 && <SnackLane lf={Math.min(clockLf, fr(5) - 1)} />}
    </>
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

export const ClaudeBlueprintReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.6, 2.1, 2.7, 3.9, L[1] + 1.0, L[1] + 2.2, L[1] + 3.6, L[2] + 0.4, L[2] + 1.8, L[2] + 3.4, L[3] + 2.6, L[3] + 3.4, L[4] + 0.6, L[4] + 3.5, L[5] + 0.4, L[5] + 1.7, L[5] + 3.6, L[6] + 0.2, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3, CLOCK_START + 4];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_blueprint.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[6]) - 8, fr(L[6]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      {/* hook: countdown + drop */}
      <Sfx at={0} src="metal_riser.wav" v={0.55} /><Sfx at={0.12} src="boom.wav" v={0.4} />
      {[0, 1].map((n) => <Sfx key={`tk${n}`} at={n * 0.6 + 0.4} src="tick.wav" v={0.16} dur={0.3} />)}
      <Sfx at={0.15} src="alarm.wav" v={0.34} dur={2.6} />
      <Sfx at={0} src="swooshdn.wav" v={0.45} dur={1.4} />
      <Sfx at={1.35} src="crash.wav" v={0.6} /><Sfx at={1.36} src="boom.wav" v={0.5} /><Sfx at={1.4} src="impact.wav" v={0.45} /><Sfx at={1.45} src="whoosh.wav" v={0.4} />
      <Sfx at={2.9} src="pop.wav" v={0.3} dur={0.5} />
      {/* boundaries */}
      {L.slice(1).map((tt, i) => <React.Fragment key={`b${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.4} /><Sfx at={tt + 0.26} src="pop.wav" v={0.24} dur={0.6} /></React.Fragment>)}
      {/* lecture */}
      <Sfx at={L[1] + 3.3} src="chimehi.wav" v={0.34} dur={0.8} /><Sfx at={L[1] + 3.35} src="sparkle.wav" v={0.32} />
      {/* handoff */}
      <Sfx at={L[2] + 0.4} src="swooshup.wav" v={0.4} />
      <Sfx at={L[2] + 1.6} src="shimmer.wav" v={0.34} dur={1.6} />
      <Sfx at={L[2] + 3.4} src="ding.wav" v={0.4} dur={0.9} /><Sfx at={L[2] + 3.45} src="chimehi.wav" v={0.32} dur={0.8} />
      {/* wand zap */}
      <Sfx at={L[3] + 0.3} src="chimehi.wav" v={0.34} dur={0.7} />
      <Sfx at={L[3] + 0.9} src="sparkle.wav" v={0.5} /><Sfx at={L[3] + 0.92} src="shimmer.wav" v={0.42} dur={1.2} /><Sfx at={L[3] + 1.0} src="angelic.wav" v={0.34} dur={2.2} />
      {[0, 1, 2, 3, 4].map((n) => <Sfx key={`mn${n}`} at={L[3] + 2.2 + n * 0.35} src="ding.wav" v={0.28} dur={0.5} />)}
      {/* vault lock */}
      <Sfx at={L[4] + 4.0} src="swooshdn.wav" v={0.4} /><Sfx at={L[4] + 4.5} src="thock.wav" v={0.55} /><Sfx at={L[4] + 4.55} src="boom.wav" v={0.3} /><Sfx at={L[4] + 4.6} src="chimehi.wav" v={0.34} dur={0.8} />
      {/* payoff */}
      <Sfx at={L[5] + 0.4} src="snap.wav" v={0.42} dur={0.5} />
      {[1.7, 2.2, 2.7, 3.2].map((tt, i) => <Sfx key={`hm${i}`} at={L[5] + tt} src="tick.wav" v={0.2} dur={0.3} />)}
      <Sfx at={L[5] + 3.5} src="chimelo.wav" v={0.3} dur={0.9} />
      <Sfx at={L[5] + 5.15} src="fling.wav" v={0.55} dur={1.1} /><Sfx at={L[5] + 5.15} src="whoosh.wav" v={0.4} />
      {/* milestones + pellets */}
      {[L[2], L[4], L[5]].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.3} dur={0.8} />)}
      <Sfx at={L[1] + 0.05} src="chimehi.wav" v={0.3} dur={0.8} />
      {[1.4, 6.5, 11.5, 15.5, 21.5, 27.5, 31.0].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.14} dur={0.3} />)}
      {/* cta + snack lane */}
      <Sfx at={L[6]} src="resolve.wav" v={0.5} />
      {[0, 1, 2, 3, 4].map((n) => <React.Fragment key={`cl${n}`}><Sfx at={CLOCK_START + n + 0.86} src={`blip${n + 1}.wav`} v={0.34} dur={0.4} /><Sfx at={CLOCK_START + n} src="tick.wav" v={0.22} dur={0.3} /></React.Fragment>)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <Lecture lf={frame - Lf[1]} />}
        {scene(2) && <Handoff lf={frame - Lf[2]} />}
        {scene(3) && <Wand lf={frame - Lf[3]} />}
        {scene(4) && <Vault lf={frame - Lf[4]} />}
        {scene(5) && <Payoff lf={frame - Lf[5]} />}
        {scene(6) && <ClockCTA lf={frame - Lf[6]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
