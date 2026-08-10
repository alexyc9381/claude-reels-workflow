import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_dev.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
// hook / here's-how / researcher / writer / scheduler / handoff / payoff / cta
const L = [0.0, 5.46, 8.82, 17.88, 23.76, 29.52, 39.96, 46.16, 49.74];
const Lf = L.map(fr);
const CUT = 53.1;
// the 3 agents' accent colors
const DEVC = ["#4C6EF5", "#E0843A", "#E0556B", "#3FAE82"]; // planner / coder / tester / reviewer

// the 5 skill gem colors (consistent across the whole reel)
const GEMS5 = ["#9E7BC8", "#5AA0DE", "#C44A3A", "#3F9E74", "#E7B24C"];

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const bob = (f: number, amp = 6, period = 60, ph = 0) => Math.sin((f / period + ph) * Math.PI * 2) * amp;
const THANOS = "#A855F7";
const lerpHex = (a: string, b: string, t: number) => { t = Math.max(0, Math.min(1, t)); const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)); const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16)); const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * t)); return "#" + m.map((v) => v.toString(16).padStart(2, "0")).join(""); };
const spr = (frame: number, delay = 0, damping = 12, stiffness = 200, mass = 1) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness, mass }, durationInFrames: 200 });
const rectPt = (t: number, w: number, h: number): [number, number] => {
  const P = 2 * (w + h); let d = ((t % 1) + 1) % 1 * P;
  if (d < w) return [d, 0]; d -= w;
  if (d < h) return [w, d]; d -= h;
  if (d < w) return [w - d, h]; d -= w;
  return [0, h - d];
};

// ============================== sfx ==============================
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 1.6 }) => {
  const D = fr(dur);
  return (
    <Sequence from={fr(at)} durationInFrames={D}>
      <Audio src={staticFile(`sfx/${src}`)} volume={(f) => v * Math.min(1, f / 2) * Math.min(1, Math.max(0, (D - 1 - f) / 6))} />
    </Sequence>
  );
};

// ============================== depth fx ==============================
const Glint: React.FC<{ lf: number; at: number; dur?: number }> = ({ lf, at, dur = 0.5 }) => {
  const p = over(lf, fr(at), fr(dur), Easing.inOut(Easing.cubic));
  if (p <= 0.01 || p >= 0.99) return null;
  return <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
    <div style={{ position: "absolute", top: -20, bottom: -20, left: `${p * 150 - 40}%`, width: "26%", background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.5), transparent)", transform: "skewX(-16deg)" }} />
  </div>;
};
const Sparkles: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; spread?: number; colors?: string[]; dur?: number }> = ({ lf, at, x, y, n = 12, spread = 130, colors = ["#F2E14C", "#FFFFFF", CLAY], dur = 0.8 }) => {
  const p = ramp(lf, fr(at), fr(at + dur));
  if (p <= 0.001 || p >= 0.999) return null;
  return <>{Array.from({ length: n }).map((_, k) => { const a = (k / n) * Math.PI * 2 + seed(k); const d = Math.pow(p, 0.55) * spread * (0.55 + seed(k * 2) * 0.7); const s = 6 + seed(k * 3) * 6; const o = Math.max(0, 1 - p); const c = colors[k % colors.length]; return <div key={k} style={{ position: "absolute", left: x + Math.cos(a) * d - s / 2, top: y + Math.sin(a) * d - s / 2 + p * p * 20, width: s, height: s, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}`, pointerEvents: "none" }} />; })}</>;
};
const Grain: React.FC<{ op?: number }> = ({ op = 0.05 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "overlay", opacity: op }}>
    <filter id="gn"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
    <rect width="100%" height="100%" filter="url(#gn)" />
  </svg>
);
const Vignette: React.FC<{ strength?: number; shape?: string }> = ({ strength = 0.5, shape = "62% 58% at 50% 42%" }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse ${shape}, transparent 44%, rgba(6,10,20,${strength}) 100%)` }} />
);
const SpotCone: React.FC<{ x: number; top?: number; topW?: number; botW?: number; h?: number; color?: string; sway?: number; lf?: number; pool?: number }> = ({ x, top = 0, topW = 40, botW = 260, h = 360, color = "rgba(255,246,220,0.16)", sway = 0, lf = 0, pool = 1 }) => {
  const a = sway ? Math.sin(lf / 22) * sway : 0; const tp = (topW / botW) * 50;
  return (
    <div style={{ position: "absolute", left: x, top, width: botW, height: h, transform: `translateX(-50%) rotate(${a}deg)`, transformOrigin: "50% 0%", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, clipPath: `polygon(${50 - tp}% 0, ${50 + tp}% 0, 100% 100%, 0 100%)`, background: `linear-gradient(180deg, ${color}, transparent 92%)` }} />
      {pool > 0 && <div style={{ position: "absolute", left: "50%", top: h - 34, width: botW * 0.86, height: 60, transform: "translateX(-50%)", borderRadius: "50%", background: `radial-gradient(ellipse, ${color}, transparent 70%)`, opacity: pool }} />}
    </div>
  );
};
const Confetti: React.FC<{ lf: number; n?: number; colors?: string[]; w?: number; top?: number; h?: number }> = ({ lf, n = 40, colors = [CLAY, GOLD, GREEN, "#FCEDDD"], w = 1012, top = -20, h = 900 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const life = 90 + seed(i) * 60; const t = (lf + seed(i * 3) * life) % life; const p = t / life;
    const x = seed(i) * w + Math.sin(lf / 18 + i) * 26; const y = top + p * h; const c = colors[i % colors.length];
    const s = 7 + seed(i * 2) * 9; const rot = (lf * (4 + seed(i) * 6)) % 360; const op = Math.min(1, p * 6) * Math.max(0, 1 - (p - 0.82) / 0.18);
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.58, background: c, opacity: op, transform: `rotate(${rot}deg) scaleX(${Math.cos(lf / 9 + i)})`, borderRadius: 1 }} />;
  })}</>
);
// rising embers for the fiery bridge scene
const Embers: React.FC<{ lf: number; n?: number; w?: number; base?: number }> = ({ lf, n = 16, w = 1012, base = 760 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const life = 70 + seed(i) * 50; const t = (lf + seed(i * 3) * life) % life; const p = t / life;
    const x = seed(i) * w + Math.sin(lf / 10 + i * 2) * 30; const y = base - p * 560; const s = 4 + seed(i * 2) * 6;
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: p > 0.6 ? "#7A3018" : "#F2903E", opacity: (1 - p) * 0.9, boxShadow: p < 0.5 ? "0 0 8px rgba(242,144,62,0.8)" : "none" }} />;
  })}</>
);

// ============================== the canonical clay critter (repo sprite) ==============================
const ClaudeMark: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="-100 -100 200 200" width={size} height={size}>
    {Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 66 : 84; const tip = i % 2 ? 7.5 : 9; return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#fff" stroke="#fff" strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />; })}
    <circle r={17} fill="#fff" />
  </svg>
);

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; constr?: number; chef?: number; suit?: number; beard?: number; xeyes?: number; samurai?: number; fro?: number; girl?: number; cop?: number; prof?: number; capeC?: string; tint?: string }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, constr = 0, chef = 0, suit = 0, beard = 0, xeyes = 0, samurai = 0, fro = 0, girl = 0, cop = 0, prof = 0, capeC, tint }) => {
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
        {/* hero cape (behind body), gently flapping */}
        {capeC && <>
          <rect x={24} y={50} width={152} height={104 + Math.sin(lf / 6) * 6} fill={capeC} transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} />
          <rect x={24} y={144 + Math.sin(lf / 6) * 6} width={152} height={12} fill="rgba(0,0,0,0.2)" transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} />
        </>}
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
        {/* business suit + tie */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" />
          <rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" />
          <polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {/* police uniform: blue jacket + gold buttons + badge */}
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" />
          <rect x={34} y={106} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={116} width={9} height={9} fill="#E7B24C" /><rect x={96} y={130} width={9} height={9} fill="#E7B24C" />
          <rect x={48} y={114} width={13} height={13} fill="#E7B24C" /><rect x={51} y={111} width={7} height={4} fill="#E7B24C" />
        </>}
        {/* professor tweed blazer + collar */}
        {prof > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#6E5A3C" />
          <rect x={34} y={106} width={132} height={6} fill="#57462A" />
          <rect x={92} y={106} width={16} height={40} fill="#EDE6D6" />
          <rect x={70} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(6 75 123)" />
          <rect x={120} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(-6 125 123)" />
          <rect x={94} y={112} width={12} height={9} fill="#8B2E2E" />
        </>}
        {/* construction hi-vis vest */}
        {constr > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#E4622B" />
          <rect x={44} y={113} width={112} height={5} fill="#F4F1EA" /><rect x={44} y={134} width={112} height={5} fill="#F4F1EA" />
          <rect x={92} y={106} width={16} height={40} fill="#C94E1C" />
        </>}
        {/* chef jacket */}
        {chef > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#F4F1EA" />
          <rect x={34} y={106} width={132} height={6} fill="#E2DDD0" />
          <rect x={92} y={106} width={8} height={40} fill="#D8D2C4" />
          <rect x={70} y={116} width={7} height={7} fill="#3A4456" /><rect x={70} y={130} width={7} height={7} fill="#3A4456" /><rect x={123} y={116} width={7} height={7} fill="#3A4456" /><rect x={123} y={130} width={7} height={7} fill="#3A4456" />
        </>}
        {/* wizard robe */}
        {wizard > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#4B3E8E" />
          <rect x={34} y={102} width={132} height={6} fill="#3A2F73" />
          <rect x={70} y={116} width={9} height={9} fill="#E7B24C" />
          <rect x={120} y={124} width={9} height={9} fill="#E7B24C" />
          <rect x={52} y={128} width={8} height={8} fill="#E7B24C" />
        </>}
        {/* samurai gi wrap */}
        {samurai > 0 && <>
          <rect x={34} y={104} width={132} height={42} fill="#2C3444" />
          <rect x={34} y={104} width={132} height={6} fill="#212836" />
          <polygon points="34,104 100,146 34,146" fill="#3A4456" />
          <polygon points="166,104 100,146 166,146" fill="#3A4456" />
          <rect x={34} y={122} width={132} height={9} fill="#8B2E2E" />
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        {xeyes > 0 ? <>
          <path d="M70 68 L88 88 M88 68 L70 88" stroke="#151312" strokeWidth={5} strokeLinecap="round" />
          <path d="M112 68 L130 88 M130 68 L112 88" stroke="#151312" strokeWidth={5} strokeLinecap="round" />
        </> : <>
          <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
          <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        </>}
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
        {/* painter perm: big rounded cloud of curls wider than the head */}
        {fro > 0 && <>
          <circle cx={44} cy={38} r={26} fill="#6B4A2F" />
          <circle cx={156} cy={38} r={26} fill="#6B4A2F" />
          <circle cx={68} cy={16} r={28} fill="#6B4A2F" />
          <circle cx={132} cy={16} r={28} fill="#6B4A2F" />
          <circle cx={100} cy={6} r={30} fill="#7A5636" />
          <circle cx={100} cy={26} r={34} fill="#6B4A2F" />
          <rect x={26} y={34} width={148} height={16} fill="#6B4A2F" />
          <circle cx={70} cy={4} r={12} fill="#7A5636" />
          <circle cx={132} cy={4} r={12} fill="#7A5636" />
        </>}
        {/* girl long hair */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={30} y={36} width={140} height={16} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={8} fill="#6E4A2C" />
        </>}
        {/* police cap */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
        </>}
        {/* samurai headband + knot tails */}
        {samurai > 0 && <>
          <rect x={30} y={52} width={140} height={13} fill="#F4EEE2" />
          <rect x={92} y={54} width={16} height={9} fill="#C44A3A" />
          <rect x={160} y={54} width={38} height={9} fill="#C44A3A" transform={`rotate(${18 + Math.sin(lf / 8) * 8} 164 58)`} />
          <rect x={164} y={64} width={34} height={8} fill="#A23A2E" transform={`rotate(${36 + Math.sin(lf / 8 + 1) * 8} 166 66)`} />
        </>}
        {/* wizard hat + wand */}
        {wizard > 0 && <>
          <polygon points="100,0 62,40 138,40" fill="#4B3E8E" />
          <rect x={46} y={36} width={108} height={12} fill="#3A2F73" />
          <rect x={94} y={8} width={10} height={10} fill="#E7B24C" />
          <rect x={78} y={24} width={8} height={8} fill="#E7B24C" />
          <rect x={112} y={22} width={8} height={8} fill="#E7B24C" />
        </>}
        {/* construction hardhat */}
        {constr > 0 && <>
          <polygon points="100,10 62,34 138,34" fill="#F5CE55" />
          <rect x={44} y={30} width={112} height={12} fill="#F5CE55" />
          <rect x={30} y={40} width={140} height={10} fill="#D9A626" />
          <rect x={94} y={16} width={12} height={16} fill="#E9BE3F" />
        </>}
        {/* chef toque */}
        {chef > 0 && <>
          <rect x={54} y={28} width={92} height={20} fill="#F4F1EA" />
          <rect x={56} y={6} width={26} height={26} rx={10} fill="#F4F1EA" /><rect x={86} y={2} width={28} height={30} rx={12} fill="#F8F5EF" /><rect x={118} y={6} width={26} height={26} rx={10} fill="#F4F1EA" />
          <rect x={54} y={40} width={92} height={8} fill="#E2DDD0" />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5), transform: "rotate(8deg)" }} />}
    </div>
  );
};

// ============================== props (pixel-idiom) ==============================
// golden power gauntlet with 5 gem sockets (pixel rects, crispEdges like the critter)
const Gauntlet: React.FC<{ s: number; gems: number; snap?: number; lf?: number }> = ({ s, gems, snap = 0, lf = 0 }) => (
  <svg viewBox="0 0 140 150" width={s} height={s * 150 / 140} shapeRendering="crispEdges" style={{ overflow: "visible", filter: snap > 0.1 ? `drop-shadow(0 0 ${12 + snap * 20}px rgba(231,178,76,0.9))` : "drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}>
    <rect x={34} y={116} width={72} height={30} fill="#B8862A" />
    <rect x={34} y={116} width={72} height={6} fill="#96691C" />
    <rect x={22} y={54} width={96} height={64} fill="#E7B24C" />
    <rect x={22} y={54} width={96} height={9} fill="#F6E4A0" />
    <rect x={22} y={104} width={96} height={14} fill="#C9932A" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={25 + i * 24} y={24} width={19} height={34} fill="#E7B24C" />)}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={25 + i * 24} y={24} width={19} height={6} fill="#F6E4A0" />)}
    <rect x={114} y={68} width={24} height={18} fill="#E7B24C" transform="rotate(24 126 77)" />
    {/* 5 large distinct knuckle gems with glow halos */}
    {[0, 1, 2, 3, 4].map((i) => { const on = i < gems; const cx = 30 + i * 17; return (
      <rect key={i} x={cx} y={78} width={16} height={16} fill={on ? GEMS5[i] : "#96691C"} transform={`rotate(45 ${cx + 8} 86)`} style={{ filter: on ? `drop-shadow(0 0 ${6 + snap * 14}px ${GEMS5[i]})` : "none" }} />); })}
    {[0, 1, 2, 3, 4].map((i) => { const on = i < gems; if (!on) return null; const cx = 30 + i * 17; return <rect key={`h${i}`} x={cx + 4} y={82} width={7} height={7} fill="rgba(255,255,255,0.6)" transform={`rotate(45 ${cx + 8} 86)`} />; })}
  </svg>
);
// pixel skill gem (rotated square diamond)
const Gem: React.FC<{ s: number; c: string; glow?: number }> = ({ s, c, glow = 1 }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: `drop-shadow(0 0 ${8 * glow}px ${c})` }}>
    <rect x={26} y={26} width={48} height={48} fill={c} transform="rotate(45 50 50)" />
    <rect x={34} y={34} width={18} height={18} fill="rgba(255,255,255,0.5)" transform="rotate(45 50 50)" />
  </svg>
);
const StopSign: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ overflow: "visible", filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))" }}>
    <polygon points="33,4 67,4 96,33 96,67 67,96 33,96 4,67 4,33" fill="#B23A2E" stroke="#F4EEE2" strokeWidth={6} strokeLinejoin="round" />
    <text x={50} y={60} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize={27} fill="#F4EEE2">STOP</text>
  </svg>
);
const Cage: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: "drop-shadow(0 0 14px rgba(170,220,255,0.5))" }}>
    <rect x={10} y={12} width={80} height={11} fill="#AEB8CC" />
    <rect x={10} y={80} width={80} height={11} fill="#AEB8CC" />
    {[14, 32, 50, 68, 83].map((x) => <rect key={x} x={x} y={12} width={7} height={79} fill="#8A94A8" />)}
    <rect x={10} y={12} width={80} height={4} fill="#D6DEEC" />
    <rect x={42} y={0} width={16} height={12} fill="#AEB8CC" />
  </svg>
);
const Bin: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
    <polygon points="24,32 76,32 71,92 29,92" fill="#4A443E" />
    <rect x={18} y={22} width={64} height={10} fill="#3A3430" />
    <rect x={42} y={14} width={16} height={8} fill="#3A3430" />
    <rect x={38} y={40} width={6} height={42} fill="#3A3430" /><rect x={56} y={40} width={6} height={42} fill="#3A3430" />
  </svg>
);
const Katana: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ overflow: "visible", filter: "drop-shadow(0 0 8px rgba(230,240,255,0.7))" }}>
    <rect x={12} y={68} width={32} height={11} rx={4} fill="#22262E" transform="rotate(-34 28 74)" />
    <rect x={34} y={55} width={13} height={13} fill="#C8A24C" transform="rotate(-34 41 62)" />
    <polygon points="44,50 90,2 100,12 56,62" fill="#E8EEF5" stroke="#9AA6B4" strokeWidth={2} />
    <polygon points="44,50 90,2 94,6 48,56" fill="#fff" />
  </svg>
);
const Wrench: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ overflow: "visible" }}>
    <rect x={44} y={30} width={14} height={54} rx={6} fill="#9AA6BC" transform="rotate(-38 51 57)" />
    <path d="M28 24 a16 16 0 1 0 20 20 l-8 -8 a6 6 0 0 1 -8 -8 z" fill="#B7C1D6" />
  </svg>
);
const CoinPix: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: "drop-shadow(0 0 8px rgba(231,178,76,0.7))" }}>
    <rect x={22} y={10} width={56} height={80} fill="#E7B24C" />
    <rect x={12} y={22} width={76} height={56} fill="#E7B24C" />
    <rect x={22} y={10} width={56} height={8} fill="#F6E4A0" />
    <rect x={38} y={30} width={24} height={8} fill="#B8862A" /><rect x={46} y={30} width={9} height={40} fill="#B8862A" />
  </svg>
);
// the AI-slop gremlin (pixel villain)
const Gremlin: React.FC<{ s: number; lf: number; scared?: number }> = ({ s, lf, scared = 0 }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
    <polygon points="18,36 6,12 30,24" fill="#6E8438" />
    <polygon points="82,36 94,12 70,24" fill="#6E8438" />
    <rect x={16} y={32} width={68} height={54} fill="#8AA04E" />
    <rect x={16} y={32} width={68} height={7} fill="#A4BC62" />
    <polygon points="16,86 28,96 40,86 52,96 64,86 76,96 84,86" fill="#8AA04E" />
    <rect x={30} y={46} width={13} height={scared > 0.3 ? 16 : 11} fill="#151312" />
    <rect x={58} y={46} width={13} height={scared > 0.3 ? 16 : 11} fill="#151312" />
    {scared > 0.3 ? <rect x={42} y={68} width={16} height={13} fill="#151312" /> : <rect x={34} y={68} width={32} height={6} fill="#151312" />}
    <rect x={24} y={40} width={16} height={4} fill="#151312" transform="rotate(14 32 42)" />
    <rect x={60} y={40} width={16} height={4} fill="#151312" transform="rotate(-14 68 42)" />
  </svg>
);
// the BUG BALROG (fiery pixel demon)
const Balrog: React.FC<{ s: number; lf: number; hurt?: number }> = ({ s, lf, hurt = 0 }) => (
  <div style={{ width: s, height: s, position: "relative" }}>
    <div style={{ position: "absolute", inset: -s * 0.14, borderRadius: "50%", background: "radial-gradient(circle, rgba(242,120,40,0.55), transparent 64%)", filter: "blur(5px)", transform: `scale(${1 + Math.sin(lf / 5) * 0.06})` }} />
    {Array.from({ length: 7 }).map((_, i) => { const p = ((lf / 26 + seed(i)) % 1); return <div key={i} style={{ position: "absolute", left: s * (0.1 + seed(i * 2) * 0.8), top: s * 0.1 - p * s * 0.34, width: 7, height: 7, background: "#F2903E", opacity: 1 - p }} />; })}
    <svg viewBox="0 0 120 110" width={s} height={s * 110 / 120} shapeRendering="crispEdges" style={{ overflow: "visible", position: "relative" }}>
      {/* flame-lick fringe along the crown */}
      {[14, 32, 50, 68, 86].map((x, i) => { const fl = 1 + Math.sin(lf / 3 + i * 2) * 0.25; return <polygon key={`f${i}`} points={`${x},26 ${x + 10},${26 - 26 * fl} ${x + 20},26`} fill={i % 2 ? "#F2903E" : "#E8B23E"} />; })}
      {[22, 58, 94].map((x, i) => <polygon key={`f2${i}`} points={`${x},24 ${x + 6},${10 - Math.sin(lf / 4 + i) * 6} ${x + 12},24`} fill="#F6D890" />)}
      {/* bug antennae */}
      <rect x={34} y={4 - Math.sin(lf / 6) * 3} width={5} height={24} fill="#7A2016" transform="rotate(-18 36 16)" />
      <rect x={81} y={4 + Math.sin(lf / 6) * 3} width={5} height={24} fill="#7A2016" transform="rotate(18 84 16)" />
      <rect x={30} y={0 - Math.sin(lf / 6) * 3} width={9} height={9} fill="#F2903E" />
      <rect x={81} y={0 + Math.sin(lf / 6) * 3} width={9} height={9} fill="#F2903E" />
      <polygon points="24,28 8,2 36,16" fill="#7A2016" />
      <polygon points="96,28 112,2 84,16" fill="#7A2016" />
      <rect x={16} y={24} width={88} height={64} fill="#C6402A" />
      <rect x={16} y={24} width={88} height={8} fill="#E06038" />
      <polygon points="16,88 30,102 44,88 60,102 76,88 90,102 104,88" fill="#C6402A" />
      <rect x={4} y={40} width={12} height={34} fill="#A03020" />
      <rect x={104} y={40} width={12} height={34} fill="#A03020" />
      <rect x={30} y={36} width={22} height={6} fill="#151312" transform="rotate(16 41 39)" />
      <rect x={68} y={36} width={22} height={6} fill="#151312" transform="rotate(-16 79 39)" />
      {hurt > 0.3 ? <>
        <path d="M32 46 L50 62 M50 46 L32 62" stroke="#F6E4A0" strokeWidth={6} strokeLinecap="round" />
        <path d="M70 46 L88 62 M88 46 L70 62" stroke="#F6E4A0" strokeWidth={6} strokeLinecap="round" />
      </> : <>
        <rect x={34} y={44} width={16} height={16} fill="#F2C14E" />
        <rect x={70} y={44} width={16} height={16} fill="#F2C14E" />
        <rect x={38} y={48} width={8} height={8} fill="#151312" />
        <rect x={74} y={48} width={8} height={8} fill="#151312" />
      </>}
      <rect x={40} y={70} width={40} height={8} fill="#151312" />
      {[0, 1, 2].map((i) => <rect key={i} x={44 + i * 12} y={70} width={6} height={13} fill="#F4EEE2" />)}
    </svg>
  </div>
);

// ============================== the dark macbook panel ==============================
const P_TOP = 384, P_H = 792;
const Panel: React.FC<{ lf: number; label?: string; tint?: string; ambient?: string; base?: [string, string]; cscale?: number; shakeX?: number; children?: React.ReactNode }> = ({ label, tint = "rgba(120,150,200,0.22)", ambient = "rgba(90,120,200,0.12)", base = ["#1B2334", "#0F1522"], cscale = 1, shakeX = 0, children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H, borderRadius: 36, background: grad(base[0], base[1]), boxShadow: SH, overflow: "hidden", border: `2px solid ${tint}` }}>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 82% at 50% -12%, ${ambient}, transparent 60%)`, pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${shakeX}px) scale(${cscale})`, transformOrigin: "50% 46%" }}>
      {children}
    </div>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(220,235,255,0.08), inset 0 0 150px rgba(0,0,0,0.55)", pointerEvents: "none", borderRadius: 36 }} />
    <Vignette strength={0.4} />
    <Grain op={0.045} />
    <div style={{ position: "absolute", left: 26, top: 20, display: "flex", gap: 9, alignItems: "center", zIndex: 30 }}>
      {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}
      {label && <span style={{ marginLeft: 12, fontFamily: mono, fontSize: 20, color: "rgba(190,205,235,0.5)" }}>{label}</span>}
    </div>
  </div>
);

// red stamp chip used across scenes
const Stamp: React.FC<{ x: number; y: number; s: number; text: string; c?: string; rot?: number }> = ({ x, y, s, text, c = RED, rot = -6 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${s})`, padding: "7px 18px", borderRadius: 12, background: c, border: "3.5px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.55)", whiteSpace: "nowrap", zIndex: 40 }}>{text}</div>
);

// the GitHub octocat mark
const GitHubMark: React.FC<{ size: number; color?: string }> = ({ size, color = "#fff" }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} style={{ display: "block" }}>
    <path fillRule="evenodd" fill={color} d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// a GitHub repo card: octocat + owner/repo + language dot + star pill. Shown in each skill's header.
const RepoCard: React.FC<{ lf: number; delay?: number; owner: string; repo: string; stars: string; tag?: string; accent?: string; y?: number }> = ({ lf, delay = 0, owner, repo, stars, tag, accent = CLAY, y = 22 }) => {
  const s = Math.min(1.05, spr(lf, delay, 12, 210));
  if (s < 0.02) return null;
  const starPop = Math.max(0, 1 - (lf - (delay + 6)) / 8);
  return (
    <div style={{ position: "absolute", right: 34, top: y, zIndex: 60, transformOrigin: "100% 0", transform: `translateY(${(1 - s) * -16}px) scale(${s})`, opacity: Math.min(1, s * 1.4) }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 13, padding: "10px 15px", borderRadius: 15, background: "linear-gradient(160deg, rgba(24,28,40,0.95), rgba(12,15,24,0.95))", border: `1.5px solid rgba(255,255,255,0.16)`, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.7)" }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: "#0D1117", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><GitHubMark size={29} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, lineHeight: 1 }}>
          <span style={{ fontFamily: mono, fontSize: 24, color: "#fff", fontWeight: 600 }}>{owner}<span style={{ color: "rgba(200,210,230,0.55)" }}>/</span><span style={{ color: accent }}>{repo}</span></span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: accent }} />
            <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(200,210,230,0.66)" }}>{tag || "claude skill"}</span>
          </span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 999, background: "rgba(231,178,76,0.16)", border: `1.5px solid ${GOLD}`, transform: `scale(${1 + starPop * 0.16})`, boxShadow: starPop > 0.05 ? `0 0 18px rgba(231,178,76,0.75)` : "none" }}>
          <span style={{ color: GOLD, fontSize: 19 }}>★</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff" }}>{stars}</span>
        </div>
      </div>
    </div>
  );
};

// glowing Claude Code laptop (referenced by the hook)
const Laptop: React.FC<{ s: number; lf: number; alarm?: number }> = ({ s, lf, alarm = 0 }) => (
  <svg viewBox="0 0 150 110" width={s} height={s * 110 / 150} style={{ overflow: "visible", filter: `drop-shadow(0 0 ${16 + alarm * 12}px rgba(${alarm > 0.3 ? "220,70,50" : "140,110,200"},0.6))` }}>
    <rect x={22} y={4} width={106} height={70} rx={7} fill="#12161F" stroke="#3A4152" strokeWidth={3.5} />
    <rect x={28} y={10} width={94} height={58} fill={alarm > 0.3 ? "#2A0E0E" : "#0C1220"} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={34} y={16 + i * 11} width={38 + (i % 2) * 30} height={5} rx={2} fill={alarm > 0.3 ? "#C44A3A" : ["#3F9E74", "#5AA0DE", "#D2724E", "#3F9E74"][i]} opacity={0.85} />)}
    <rect x={34} y={60} width={10} height={7} fill={alarm > 0.3 ? "#C44A3A" : "#E7B24C"} opacity={lf % 22 < 11 ? 1 : 0.2} />
    <polygon points="8,74 142,74 158,102 -8,102" fill="#2A2E3A" stroke="#3A4152" strokeWidth={3} />
    <rect x={60} y={84} width={30} height={7} rx={3} fill="#1A1E28" />
  </svg>
);

// ============================== SCENE 0 — THE GAUNTLET (Thanos-snap cold open) ==============================
// ============================== crew name tag + floor ==============================
const NameTag: React.FC<{ lf: number; name: string; c: string; delay: number; x: number; y: number }> = ({ lf, name, c, delay, x, y }) => {
  const s = Math.min(1.08, spr(lf, delay, 11, 210)); if (s < 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translateX(-50%) scale(${s})`, zIndex: 32, opacity: Math.min(1, s * 1.4) }}>
      <div style={{ display: "inline-block", padding: "7px 22px", borderRadius: 999, background: "#fff", border: `3px solid ${c}`, boxShadow: "0 12px 26px -8px rgba(0,0,0,0.5)", whiteSpace: "nowrap", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: INK }}>{name}</div>
    </div>
  );
};
const Floor: React.FC<{ a?: string; b?: string }> = ({ a = "#120A10", b = "#080610" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 176, background: `linear-gradient(180deg,${a},${b})`, clipPath: "polygon(9% 0, 91% 0, 100% 100%, 0 100%)", zIndex: 3 }} />
);
const Zzz: React.FC<{ lf: number; x: number; y: number }> = ({ lf, x, y }) => (
  <>{[0, 1, 2].map((k) => { const t = ((lf / 40 + k / 3) % 1); return <div key={k} style={{ position: "absolute", left: x + t * 40 + k * 8, top: y - t * 60, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20 + k * 8, color: "rgba(200,220,255,0.7)", opacity: 1 - t, zIndex: 20 }}>z</div>; })}</>
);

// ============================== S0 — HOOK: one idea -> 3 agents -> a week of content ==============================
// ============================== S0 — HOOK: founder asleep, 4 agents ship a feature ==============================
const S0_zIndex = { bg: 0, workshop: 5, sleeper: 20 };

// A single glowing agent station on the night-shift production line
const S0Station: React.FC<{
  lf: number;
  x: number;
  color: string;
  active: number; // 0..1 how "lit" this station is
  children?: React.ReactNode;
}> = ({ lf, x, color, active, children }) => {
  const glow = 0.4 + 0.6 * active;
  return (
    <div style={{ position: "absolute", left: x, top: 250, width: 150, height: 190 }}>
      {/* station floor slab */}
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 150,
          width: 134,
          height: 30,
          borderRadius: 8,
          background: grad(SLATE, "#2A3E5C"),
          boxShadow: "inset 0 3px 6px rgba(255,255,255,0.12), 0 6px 12px rgba(0,0,0,0.4)",
        }}
      />
      {/* halo of light over the station */}
      <div
        style={{
          position: "absolute",
          left: 75,
          top: 175,
          width: 190,
          height: 90,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${color}66 0%, ${color}00 70%)`,
          opacity: 0.35 + 0.45 * glow,
          filter: "blur(4px)",
        }}
      />
      {children}
    </div>
  );
};

const S0: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- global timings ----
  const featureX = 250 + over(lf, 20, 130, Easing.inOut(Easing.cubic)) * 520; // feature travels down the line
  const shipProgress = over(lf, 10, 140); // shipping bar fill 0..1
  const buzz = lf >= 120;
  const notifPop = spr(lf, 122, 12, 170);
  const notifY = interpolate(notifPop, [0, 1], [-60, 0]);
  const moonGlow = 0.55 + 0.15 * bob(lf, 1, 90, 0);

  // which station the feature is currently over (for pulse)
  const stationActive = (sx: number) => {
    const d = Math.abs(featureX - sx);
    return interpolate(d, [0, 90, 200], [1, 0.4, 0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };

  return (
    <>
      {/* ================= DARK BEDROOM NIGHT BACKGROUND ================= */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1012,
          height: 792,
          background:
            "radial-gradient(120% 90% at 62% 22%, #2C3E5E 0%, #223350 34%, #182742 62%, #101C33 100%)",
        }}
      />
      {/* faint starfield */}
      {Array.from({ length: 40 }).map((_, i) => {
        const sx = seed(i * 3.1) * 1012;
        const sy = seed(i * 7.7) * 300;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(lf * 0.05 + i));
        return (
          <div
            key={"star" + i}
            style={{
              position: "absolute",
              left: sx,
              top: sy,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#EDE7D6",
              opacity: 0.15 + 0.35 * tw,
            }}
          />
        );
      })}

      {/* MOON in the window */}
      <div style={{ position: "absolute", left: 720, top: 60, width: 230, height: 300 }}>
        {/* window frame */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 230,
            height: 300,
            borderRadius: 14,
            background: "linear-gradient(180deg, #16233B 0%, #101B30 100%)",
            border: "10px solid #24344F",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
          }}
        />
        {/* moon */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 55,
            width: 92,
            height: 92,
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 35%, #F3ECD4 0%, #DCCFA0 60%, #C6B77E 100%)",
            boxShadow: `0 0 ${28 + moonGlow * 24}px ${moonGlow * 18}px rgba(243,236,212,0.45)`,
          }}
        />
        {/* moon craters */}
        <div style={{ position: "absolute", left: 150, top: 78, width: 16, height: 16, borderRadius: "50%", background: "#C9BB8A", opacity: 0.6 }} />
        <div style={{ position: "absolute", left: 178, top: 108, width: 10, height: 10, borderRadius: "50%", background: "#C9BB8A", opacity: 0.5 }} />
        <div style={{ position: "absolute", left: 138, top: 118, width: 8, height: 8, borderRadius: "50%", background: "#C9BB8A", opacity: 0.5 }} />
        {/* window mullions */}
        <div style={{ position: "absolute", left: 108, top: 0, width: 6, height: 300, background: "#24344F" }} />
        <div style={{ position: "absolute", left: 0, top: 145, width: 230, height: 6, background: "#24344F" }} />
      </div>

      {/* ================= OVERNIGHT WORKSHOP (glowing, behind/above) ================= */}
      {/* workshop platform glow band */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 210,
          width: 780,
          height: 230,
          borderRadius: 20,
          background:
            "linear-gradient(180deg, rgba(58,92,132,0.35) 0%, rgba(40,64,96,0.15) 100%)",
          boxShadow: "0 0 60px 10px rgba(90,160,222,0.12)",
        }}
      />
      {/* WORKSHOP header sign */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 176,
          padding: "5px 14px",
          borderRadius: 8,
          background: grad(GOLD, AMBER),
          fontFamily: mono,
          fontSize: 15,
          fontWeight: 800,
          color: INK,
          letterSpacing: 1.5,
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        NIGHT SHIFT
      </div>

      {/* the production CONVEYOR LINE */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 388,
          width: 740,
          height: 26,
          borderRadius: 13,
          background: "linear-gradient(180deg,#43607F 0%,#2B3F5A 100%)",
          boxShadow: "inset 0 3px 5px rgba(255,255,255,0.15), 0 8px 16px rgba(0,0,0,0.45)",
        }}
      />
      {/* conveyor rollers moving */}
      {Array.from({ length: 14 }).map((_, i) => {
        const rx = 74 + ((i * 52 + lf * 5) % 720);
        return (
          <div
            key={"roll" + i}
            style={{
              position: "absolute",
              left: rx,
              top: 393,
              width: 12,
              height: 16,
              borderRadius: 6,
              background: "#8FB0CE",
              opacity: 0.5,
            }}
          />
        );
      })}
      {/* line stage labels */}
      {["PLAN", "BUILD", "TEST", "GATE"].map((lbl, i) => (
        <div
          key={lbl}
          style={{
            position: "absolute",
            left: 96 + i * 182,
            top: 420,
            width: 120,
            textAlign: "center",
            fontFamily: mono,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#B9C8DA",
            opacity: 0.75,
          }}
        >
          {lbl}
        </div>
      ))}

      {/* ============ THE FOUR AGENTS AT THEIR STATIONS ============ */}

      {/* --- PLANNER : SORCERER (indigo) --- */}
      <S0Station lf={lf} x={70} color="#4C6EF5" active={stationActive(160)}>
        <div style={{ position: "absolute", left: 30, top: 30, width: 90, height: 130 }}>
          <div style={{ position: "absolute", left: 18, top: 34 }}>
            <Mascot lf={lf} size={54} tint="#4C6EF5" gaze={0.1} nodAmp={2} nodSpeed={0.5} />
          </div>
          {/* hooded cloak body */}
          <svg viewBox="0 0 90 130" width={90} height={130} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M20 128 L14 78 Q10 58 30 48 L60 48 Q80 58 76 78 L70 128 Z" fill="#3A4F9E" stroke="#28348C" strokeWidth="2" />
            {/* raised collar */}
            <path d="M28 52 Q45 40 62 52 L58 64 Q45 56 32 64 Z" fill="#4C6EF5" stroke="#28348C" strokeWidth="1.5" />
            {/* hood over head */}
            <path d="M24 44 Q45 12 66 44 Q56 34 45 34 Q34 34 24 44 Z" fill="#3A4F9E" stroke="#28348C" strokeWidth="2" />
            {/* eye amulet on chest */}
            <circle cx="45" cy="86" r="11" fill="#101C33" stroke="#8FA6FF" strokeWidth="2" />
            <circle cx="45" cy="86" r="6" fill={lerpHex("#5AA0DE", "#8FA6FF", 0.5 + 0.5 * Math.sin(lf * 0.15))} />
            <circle cx="45" cy="86" r="2.4" fill="#101C33" />
          </svg>
          {/* goatee */}
          <div style={{ position: "absolute", left: 40, top: 66, width: 8, height: 9, borderRadius: "0 0 4px 4px", background: "#2A2320" }} />
          {/* glowing blueprint scroll */}
          <div
            style={{
              position: "absolute",
              left: 58,
              top: 74,
              width: 26,
              height: 18,
              borderRadius: 3,
              background: "#8FA6FF",
              boxShadow: "0 0 10px 2px rgba(143,166,255,0.7)",
              transform: `rotate(${-8 + bob(lf, 3, 40, 0)}deg)`,
            }}
          />
        </div>
      </S0Station>

      {/* --- CODER : BUILDER (amber) --- */}
      <S0Station lf={lf} x={252} color="#E0843A" active={stationActive(342)}>
        <div style={{ position: "absolute", left: 30, top: 30, width: 90, height: 130 }}>
          <div style={{ position: "absolute", left: 18, top: 34 }}>
            <Mascot lf={lf} size={54} tint="#E0843A" gaze={-0.1} nodAmp={3} nodSpeed={1.2} />
          </div>
          <svg viewBox="0 0 90 130" width={90} height={130} style={{ position: "absolute", left: 0, top: 0 }}>
            {/* hi-vis vest */}
            <path d="M24 128 L20 74 Q22 58 45 58 Q68 58 70 74 L66 128 Z" fill="#E0843A" stroke="#B85F1F" strokeWidth="2" />
            <rect x="32" y="60" width="7" height="66" fill="#F6E27A" opacity="0.9" />
            <rect x="51" y="60" width="7" height="66" fill="#F6E27A" opacity="0.9" />
            <rect x="24" y="96" width="42" height="6" fill="#F6E27A" opacity="0.9" />
            {/* tool belt */}
            <rect x="20" y="110" width="50" height="10" rx="3" fill="#7A4B22" stroke="#5C3616" strokeWidth="1.5" />
            <rect x="40" y="112" width="8" height="6" fill="#C9B06A" />
            {/* gold hard-hat */}
            <path d="M22 42 Q45 18 68 42 L68 46 L22 46 Z" fill="#E7B24C" stroke="#B8850F" strokeWidth="2" />
            <rect x="42" y="24" width="6" height="20" fill="#F6E27A" />
          </svg>
          {/* swinging hammer */}
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 70,
              width: 6,
              height: 26,
              background: "#7A4B22",
              borderRadius: 3,
              transformOrigin: "3px 24px",
              transform: `rotate(${-30 + 55 * Math.abs(Math.sin(lf * 0.28))}deg)`,
            }}
          >
            <div style={{ position: "absolute", left: -7, top: -4, width: 20, height: 11, borderRadius: 3, background: "#9AA6B2", boxShadow: "inset 0 2px 2px rgba(255,255,255,0.4)" }} />
          </div>
        </div>
      </S0Station>

      {/* --- TESTER : DEMOLITIONS QA (red) --- */}
      <S0Station lf={lf} x={434} color="#E0556B" active={stationActive(524)}>
        <div style={{ position: "absolute", left: 30, top: 30, width: 90, height: 130 }}>
          <div style={{ position: "absolute", left: 18, top: 34 }}>
            <Mascot lf={lf} size={54} tint="#E0556B" gaze={0.15} nodAmp={4} nodSpeed={1.6} shock={0.2} />
          </div>
          <svg viewBox="0 0 90 130" width={90} height={130} style={{ position: "absolute", left: 0, top: 0 }}>
            {/* lab coat */}
            <path d="M22 128 L18 72 Q20 56 45 56 Q70 56 72 72 L68 128 Z" fill="#EDE9E0" stroke="#C7C2B4" strokeWidth="2" />
            <path d="M45 56 L45 128" stroke="#C7C2B4" strokeWidth="1.5" />
            {/* soot flecks */}
            <circle cx="34" cy="86" r="2.4" fill="#5A5148" opacity="0.7" />
            <circle cx="58" cy="100" r="2" fill="#5A5148" opacity="0.6" />
            <circle cx="50" cy="76" r="1.6" fill="#5A5148" opacity="0.6" />
            {/* red goggles */}
            <rect x="28" y="40" width="34" height="8" rx="4" fill="#E0556B" opacity="0.85" />
            <circle cx="37" cy="44" r="6.5" fill="#C44A3A" stroke="#8E2E22" strokeWidth="1.5" />
            <circle cx="53" cy="44" r="6.5" fill="#C44A3A" stroke="#8E2E22" strokeWidth="1.5" />
            <circle cx="37" cy="44" r="2.4" fill="#FFE1C0" opacity="0.8" />
            <circle cx="53" cy="44" r="2.4" fill="#FFE1C0" opacity="0.8" />
          </svg>
          {/* lit edge-case bomb */}
          <div style={{ position: "absolute", left: 62, top: 80, width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #4A4A52 0%, #1C1C22 100%)", boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: 8, top: -8, width: 3, height: 9, background: "#7A4B22" }} />
            <div
              style={{
                position: "absolute",
                left: 6,
                top: -14,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FFD27A",
                boxShadow: `0 0 ${6 + 5 * Math.abs(Math.sin(lf * 0.5))}px 2px rgba(255,180,60,0.9)`,
              }}
            />
          </div>
        </div>
      </S0Station>

      {/* --- REVIEWER : BOUNCER (green) --- */}
      <S0Station lf={lf} x={616} color="#3FAE82" active={stationActive(706)}>
        <div style={{ position: "absolute", left: 30, top: 30, width: 90, height: 130 }}>
          <div style={{ position: "absolute", left: 18, top: 34 }}>
            <Mascot lf={lf} size={54} tint="#3FAE82" gaze={0} nodAmp={1} nodSpeed={0.4} stern />
          </div>
          <svg viewBox="0 0 90 130" width={90} height={130} style={{ position: "absolute", left: 0, top: 0 }}>
            {/* black suit */}
            <path d="M20 128 L16 72 Q18 56 45 56 Q72 56 74 72 L70 128 Z" fill="#1E2530" stroke="#10141C" strokeWidth="2" />
            {/* white shirt V */}
            <path d="M45 56 L34 74 L45 96 L56 74 Z" fill="#EDE9E0" />
            {/* tie */}
            <path d="M45 60 L41 74 L45 92 L49 74 Z" fill="#3FAE82" stroke="#2A7A5C" strokeWidth="1" />
            {/* lapels */}
            <path d="M34 60 L45 56 L40 82 Z" fill="#141922" />
            <path d="M56 60 L45 56 L50 82 Z" fill="#141922" />
            {/* SECURITY badge */}
            <rect x="54" y="80" width="14" height="9" rx="2" fill="#E7B24C" />
            {/* sunglasses */}
            <rect x="28" y="40" width="34" height="7" rx="3" fill="#0E1218" />
            <rect x="30" y="41" width="13" height="5" rx="2" fill="#222A36" />
            <rect x="47" y="41" width="13" height="5" rx="2" fill="#222A36" />
            {/* earpiece coil */}
            <path d="M64 40 Q72 52 66 64" stroke="#2A2E36" strokeWidth="2.5" fill="none" />
            {/* READ-ONLY cuff */}
            <rect x="22" y="112" width="30" height="8" rx="3" fill="#3FAE82" />
          </svg>
          <div style={{ position: "absolute", left: 22, top: 156, fontFamily: mono, fontSize: 7, fontWeight: 800, color: "#0E1218", letterSpacing: 0.5 }}>
            READ-ONLY
          </div>
        </div>
      </S0Station>

      {/* ===== THE GLOWING FEATURE traveling down the line ===== */}
      <div
        style={{
          position: "absolute",
          left: featureX,
          top: 356,
          width: 40,
          height: 40,
          transform: `translateX(-50%) rotate(${lf * 3}deg)`,
          borderRadius: 9,
          background: "linear-gradient(135deg,#7FE0B2 0%,#3FAE82 55%,#2A7A5C 100%)",
          boxShadow: "0 0 22px 6px rgba(63,174,130,0.6), inset 0 2px 4px rgba(255,255,255,0.5)",
        }}
      >
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: mono, fontSize: 16, fontWeight: 900, color: "#0E2A1E" }}>
          {"</>"}
        </div>
      </div>
      {/* feature glow trail */}
      <div
        style={{
          position: "absolute",
          left: featureX - 60,
          top: 372,
          width: 60,
          height: 8,
          borderRadius: 4,
          background: "linear-gradient(90deg, rgba(127,224,178,0) 0%, rgba(127,224,178,0.5) 100%)",
        }}
      />

      {/* ===== SHIPPING progress bar ===== */}
      <div style={{ position: "absolute", left: 60, top: 456, width: 740, height: 24 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 740,
            height: 24,
            borderRadius: 12,
            background: "#1A2740",
            boxShadow: "inset 0 2px 5px rgba(0,0,0,0.55)",
            border: "2px solid #2E4262",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 3,
            top: 3,
            width: (740 - 6) * shipProgress,
            height: 18,
            borderRadius: 10,
            background: grad("#7FE0B2", GREEN),
            boxShadow: "0 0 14px 2px rgba(63,174,130,0.5)",
          }}
        />
        <div style={{ position: "absolute", left: 14, top: 3, fontFamily: mono, fontSize: 13, fontWeight: 800, color: "#DDEFE6", letterSpacing: 1 }}>
          SHIPPING...
        </div>
        <div style={{ position: "absolute", right: 14, top: 3, fontFamily: mono, fontSize: 13, fontWeight: 800, color: "#DDEFE6" }}>
          {Math.round(shipProgress * 100)}%
        </div>
      </div>

      {/* ================= THE SLEEPING FOUNDER (large, foreground) ================= */}
      {/* bed / desk mass */}
      <div
        style={{
          position: "absolute",
          left: -20,
          top: 560,
          width: 620,
          height: 240,
          borderRadius: "30px 30px 0 0",
          background: "linear-gradient(180deg,#3A2E52 0%,#2A2140 100%)",
          boxShadow: "0 -10px 30px rgba(0,0,0,0.4)",
        }}
      />
      {/* pillow */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 590,
          width: 210,
          height: 120,
          borderRadius: 40,
          background: "linear-gradient(180deg,#F0E9DC 0%,#D8CFBC 100%)",
          boxShadow: "inset 0 6px 12px rgba(255,255,255,0.4), 0 8px 18px rgba(0,0,0,0.35)",
          transform: "rotate(-6deg)",
        }}
      />
      {/* blanket */}
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 640,
          width: 420,
          height: 160,
          borderRadius: "40px 40px 0 0",
          background: "linear-gradient(180deg,#6B4E8C 0%,#4A3468 100%)",
          boxShadow: "inset 0 8px 16px rgba(255,255,255,0.12)",
        }}
      />

      {/* the sleeping mascot (NO tint) slumped on pillow */}
      <div style={{ position: "absolute", left: 70, top: 546, transform: `rotate(${-14 + bob(lf, 1.2, 55, 0)}deg)` }}>
        <Mascot lf={lf} size={180} gaze={0} nodAmp={1.5} nodSpeed={0.3} />
        {/* nightcap */}
        <svg viewBox="0 0 180 120" width={180} height={120} style={{ position: "absolute", left: 6, top: -30 }}>
          <path d="M40 60 Q90 6 150 40 Q168 48 176 40 L176 46 Q166 60 150 54 Q96 26 46 66 Z" fill="#C44A3A" stroke="#8E2E22" strokeWidth="3" />
          <circle cx="176" cy="42" r="12" fill="#F0E9DC" stroke="#C7BFAC" strokeWidth="2" />
          <path d="M40 58 Q92 40 140 54 L138 66 Q92 52 44 68 Z" fill="#EDE9E0" opacity="0.9" />
        </svg>
        {/* closed sleepy eyes drawn as little arcs + open snoring mouth */}
        <svg viewBox="0 0 180 180" width={180} height={180} style={{ position: "absolute", left: 0, top: 40 }}>
          <path d="M58 70 Q66 64 74 70" stroke="#2A2320" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M96 70 Q104 64 112 70" stroke="#2A2320" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* open snore mouth pulsing */}
          <ellipse cx="86" cy="104" rx={11 + 3 * Math.abs(Math.sin(lf * 0.18))} ry={9 + 4 * Math.abs(Math.sin(lf * 0.18))} fill="#7A3A34" />
        </svg>
      </div>

      {/* big lazy ZZZ rising */}
      {["Z", "Z", "Z"].map((z, i) => {
        const t = (lf + i * 22) % 90;
        const p = t / 90;
        return (
          <div
            key={"z" + i}
            style={{
              position: "absolute",
              left: 250 + i * 34 + p * 30,
              top: 560 - p * 130,
              fontFamily: fraunces.fontFamily,
              fontWeight: 800,
              fontSize: 30 + i * 12,
              color: "#EDE7D6",
              opacity: interpolate(p, [0, 0.15, 0.8, 1], [0, 0.9, 0.7, 0]),
              transform: `rotate(${-8 + i * 4}deg)`,
              textShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            {z}
          </div>
        );
      })}

      {/* glowing PHONE on nightstand */}
      <div style={{ position: "absolute", left: 470, top: 606 }}>
        {/* nightstand top */}
        <div style={{ position: "absolute", left: -30, top: 74, width: 190, height: 40, borderRadius: 8, background: "linear-gradient(180deg,#5A4326 0%,#3E2E19 100%)", boxShadow: "0 8px 16px rgba(0,0,0,0.4)" }} />
        {/* phone body */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 44,
            width: 88,
            height: 44,
            borderRadius: 10,
            background: "#12161E",
            border: "3px solid #2A303C",
            transform: "rotate(-4deg)",
            boxShadow: buzz
              ? `0 0 ${20 + 12 * Math.abs(Math.sin(lf * 0.9))}px 4px rgba(63,174,130,0.55)`
              : "0 0 14px 2px rgba(90,160,222,0.3)",
          }}
        >
          <div style={{ position: "absolute", inset: 4, borderRadius: 6, background: buzz ? grad("#2A7A5C", "#12161E") : "linear-gradient(180deg,#20334E,#12161E)" }} />
        </div>
        {/* buzz motion lines */}
        {buzz &&
          [0, 1].map((s) => (
            <div
              key={"bz" + s}
              style={{
                position: "absolute",
                left: s === 0 ? 6 : 108,
                top: 58,
                fontFamily: mono,
                fontSize: 16,
                fontWeight: 900,
                color: "#7FE0B2",
                opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.9)),
              }}
            >
              {s === 0 ? "((" : "))"}
            </div>
          ))}
      </div>

      {/* ================= FEATURE SHIPPED notification card ================= */}
      {lf >= 121 && (
        <div
          style={{
            position: "absolute",
            left: 506,
            top: 210 + notifY,
            width: 420,
            transform: `translateX(-50%) scale(${0.6 + 0.4 * notifPop})`,
            opacity: over(lf, 121, 10),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "18px 24px",
              borderRadius: 22,
              background: "linear-gradient(180deg,#FCFAF4 0%,#ECE9E2 100%)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.5), 0 0 40px 4px rgba(63,174,130,0.35)",
              border: "2px solid #FFFFFF",
            }}
          >
            {/* green check bubble */}
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: grad("#5EC894", GREEN),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 14px rgba(63,174,130,0.5)",
                flexShrink: 0,
              }}
            >
              <svg viewBox="0 0 40 40" width={34} height={34}>
                <path
                  d="M9 21 L17 29 L32 12"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="40"
                  strokeDashoffset={40 - 40 * over(lf, 126, 12)}
                />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: MUTE, letterSpacing: 2 }}>
                CLAUDE CREW
              </div>
              <div style={{ fontFamily: fraunces.fontFamily, fontSize: 26, fontWeight: 800, color: INK, lineHeight: 1.05 }}>
                FEATURE SHIPPED
              </div>
            </div>
          </div>
        </div>
      )}
      {lf >= 124 && <Confetti lf={lf - 124} n={26} colors={["#3FAE82", "#E7B24C", "#4C6EF5", "#E0843A", "#E0556B"]} top={190} h={260} />}
    </>
  );
};

// ============================== SCENE 1 — SELECT YOUR CREW (roster / costume showcase) ==============================
const S1COLS = [
  { x: 161, c: "#4C6EF5", cd: "#3A56C8", name: "PLANNER", job: "spec", n: "1" },
  { x: 391, c: "#E0843A", cd: "#C9761F", name: "CODER", job: "build", n: "2" },
  { x: 621, c: "#E0556B", cd: "#B33A4B", name: "TESTER", job: "break", n: "3" },
  { x: 851, c: "#3FAE82", cd: "#2E8C67", name: "REVIEWER", job: "gate", n: "4" },
];
const S1SIZE = 156;

// one roster slot: spotlight + pedestal + hero mascot in full signature costume + nametag
const S1Agent: React.FC<{ lf: number; i: number }> = ({ lf, i }) => {
  const A = S1COLS[i];
  const X = A.x, S = S1SIZE;
  const del = 5 + i * 7;
  const pop = Math.min(1.06, spr(lf, del, 10, 200));
  const rise = (1 - Math.min(1, spr(lf, del, 12, 220))) * 24;
  const wob = bob(lf, 3, 92, i * 0.4);
  // wrapper places the mascot's feet (viewBox y184) on the pedestal top (y=566)
  const wrapTop = 566 - (184 / 200) * S;
  const pu = 0.55 + 0.45 * Math.sin(lf / 6 + i);      // planner amulet pulse
  const spk = 0.5 + 0.5 * Math.sin(lf / 2.2);          // tester fuse spark
  return (
    <>
      {/* per-slot spotlight cone tinted to the agent */}
      <SpotCone x={X} top={54} topW={54} botW={250} h={532} color={`${A.c}22`} sway={2.4} lf={lf + i * 9} />

      {/* pedestal (present at frame 0, mascot pops on top) */}
      <div style={{ position: "absolute", left: X - 82, top: 552, width: 164, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse, ${A.c}66, ${A.cd}22 70%)`, filter: "blur(1px)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: X - 80, top: 566, width: 160, height: 66, borderRadius: "10px 10px 16px 16px", background: `linear-gradient(180deg, ${A.cd} 0%, #1b2138 100%)`, boxShadow: `inset 0 3px 0 ${A.c}, 0 22px 30px -14px rgba(0,0,0,0.6)`, zIndex: 5 }}>
        <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: `${A.c}`, opacity: 0.32, lineHeight: 1 }}>{A.n}</div>
        <div style={{ position: "absolute", left: 12, top: 12, width: 4, height: 42, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", right: 12, top: 12, width: 4, height: 42, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* hero mascot + hand-drawn signature costume (both scale/bob together) */}
      <div style={{ position: "absolute", left: X - S / 2, top: wrapTop, width: S, height: S, zIndex: 10, transform: `translateY(${wob + rise}px) scale(${pop})`, transformOrigin: "50% 100%", filter: `drop-shadow(0 14px 18px rgba(0,0,0,0.4)) drop-shadow(0 0 16px ${A.c}55)` }}>
        <Mascot lf={lf + i * 4} size={S} tint={A.c} nodAmp={0} nodSpeed={9} gaze={0} />
        <svg viewBox="0 0 200 200" width={S} height={S} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>

          {/* ===== PLANNER — THE SORCERER / ARCHITECT ===== */}
          {i === 0 && <>
            {/* draping cloak over body */}
            <path d="M38 108 C40 99 62 94 100 94 C138 94 160 99 162 108 L174 172 C120 184 80 184 26 172 Z" fill="#3A56C8" />
            <path d="M100 94 L100 178 L26 172 L38 108 C40 99 62 94 100 94 Z" fill="#3247A8" />
            {/* raised collar tips */}
            <polygon points="46,112 70,86 74,116" fill="#2C3C90" />
            <polygon points="154,112 130,86 126,116" fill="#2C3C90" />
            {/* hooded cowl framing the face */}
            <path d="M100 6 C154 6 188 56 182 122 L156 122 C160 76 134 42 100 42 C66 42 40 76 44 122 L18 122 C12 56 46 6 100 6 Z" fill="#4C6EF5" />
            <path d="M100 6 C154 6 188 56 182 122 L172 122 C176 70 140 34 100 34 C60 34 24 70 28 122 L18 122 C12 56 46 6 100 6 Z" fill="#3A56C8" opacity={0.55} />
            <path d="M100 14 C146 14 176 58 172 118 L160 118 C162 72 136 44 100 44 C64 44 38 72 40 118 L28 118 C24 58 54 14 100 14 Z" fill="none" stroke="#6E8BFF" strokeWidth={2.5} opacity={0.7} />
            {/* small goatee */}
            <polygon points="93,90 107,90 100,104" fill="#20264A" />
            {/* glowing circular EYE amulet on the chest */}
            <circle cx={100} cy={128} r={15} fill="#25306A" stroke="#E7B24C" strokeWidth={3.5} />
            <ellipse cx={100} cy={128} rx={9} ry={6} fill="#0E1330" />
            <circle cx={100} cy={128} r={3.4 + spk * 0.6} fill="#BFD2FF" opacity={0.9} style={{ filter: `drop-shadow(0 0 ${5 + pu * 6}px #8FB0FF)` }} />
            {/* glowing blueprint scroll in the left hand */}
            <g transform="rotate(-10 34 130)">
              <rect x={12} y={116} width={40} height={34} rx={3} fill="#122048" stroke="#5AA0DE" strokeWidth={2} />
              <rect x={16} y={121} width={32} height={2} fill="#6FB4F0" opacity={0.7} />
              <rect x={16} y={128} width={26} height={2} fill="#6FB4F0" opacity={0.6} />
              <rect x={16} y={135} width={30} height={2} fill="#6FB4F0" opacity={0.6} />
              <rect x={16} y={142} width={20} height={2} fill="#6FB4F0" opacity={0.5} />
              <rect x={8} y={112} width={7} height={42} rx={3.5} fill="#E7B24C" />
              <rect x={49} y={112} width={7} height={42} rx={3.5} fill="#E7B24C" />
            </g>
          </>}

          {/* ===== CODER — THE BUILDER ===== */}
          {i === 1 && <>
            {/* hi-vis safety vest */}
            <path d="M40 102 L64 100 L100 116 L136 100 L160 102 L166 168 C120 178 80 178 34 168 Z" fill="#F0A24C" />
            <path d="M40 102 L64 100 L100 116 L100 174 L34 168 Z" fill="#D98A34" />
            <rect x={44} y={124} width={112} height={7} fill="#E4E9EE" opacity={0.92} />
            <rect x={44} y={146} width={112} height={7} fill="#E4E9EE" opacity={0.92} />
            <rect x={62} y={104} width={9} height={62} fill="#E4E9EE" opacity={0.85} />
            <rect x={129} y={104} width={9} height={62} fill="#E4E9EE" opacity={0.85} />
            <rect x={96} y={104} width={8} height={64} fill="#B76C22" />
            {/* tool belt + buckle + hanging wrench */}
            <rect x={36} y={158} width={128} height={13} rx={3} fill="#5A3A22" />
            <rect x={92} y={159} width={16} height={11} rx={2} fill="#E7B24C" />
            <rect x={54} y={168} width={9} height={22} rx={2} fill="#8A8F98" />
            <circle cx={58.5} cy={190} r={7} fill="none" stroke="#8A8F98" strokeWidth={4} />
            {/* sturdy gloves on the arms */}
            <rect x={4} y={98} width={30} height={30} rx={8} fill="#C9761F" stroke="#A85E14" strokeWidth={2} />
            <rect x={166} y={96} width={30} height={30} rx={8} fill="#C9761F" stroke="#A85E14" strokeWidth={2} />
            {/* raised hammer in the right hand */}
            <g transform={`rotate(${-4 + Math.sin(lf / 7) * 6} 182 90)`}>
              <rect x={178} y={58} width={9} height={44} rx={3} fill="#7A4A24" />
              <rect x={168} y={48} width={30} height={16} rx={3} fill="#9AA0A8" />
              <rect x={168} y={48} width={30} height={5} rx={2} fill="#C4C9CF" />
            </g>
            {/* gold hard-hat */}
            <path d="M48 58 C48 26 152 26 152 58 Z" fill="#E7B24C" />
            <path d="M48 58 C48 26 152 26 152 58 L152 52 C152 30 48 30 48 52 Z" fill="#F4CF7A" opacity={0.7} />
            <rect x={38} y={54} width={124} height={11} rx={5} fill="#C9761F" />
            <rect x={95} y={28} width={10} height={30} rx={3} fill="#C9761F" />
            <rect x={90} y={40} width={20} height={10} rx={2} fill="#F4EEE2" />
          </>}

          {/* ===== TESTER — THE DEMOLITIONS QA ===== */}
          {i === 2 && <>
            {/* white lab coat, soot-flecked */}
            <path d="M36 100 L58 96 L92 112 L108 112 L142 96 L164 100 L172 170 C120 180 80 180 28 170 Z" fill="#F1EEE6" />
            <polygon points="36,100 92,112 78,146 44,120" fill="#DCD8CD" />
            <polygon points="164,100 108,112 122,146 156,120" fill="#DCD8CD" />
            <circle cx={100} cy={126} r={3} fill="#3A3F49" />
            <circle cx={100} cy={140} r={3} fill="#3A3F49" />
            <circle cx={100} cy={154} r={3} fill="#3A3F49" />
            {Array.from({ length: 7 }).map((_, k) => <circle key={k} cx={44 + seed(k * 3 + 1) * 112} cy={116 + seed(k * 5 + 2) * 56} r={1.6 + seed(k) * 2.4} fill="#6B6257" opacity={0.55} />)}
            {/* heavy demolition gloves */}
            <rect x={2} y={96} width={32} height={32} rx={9} fill="#B33A4B" stroke="#8E2637" strokeWidth={2} />
            <rect x={166} y={96} width={32} height={32} rx={9} fill="#B33A4B" stroke="#8E2637" strokeWidth={2} />
            {/* big red safety goggles */}
            <rect x={54} y={70} width={92} height={9} rx={4} fill="#8E2637" />
            <circle cx={78} cy={80} r={18} fill="#B33A4B" />
            <circle cx={122} cy={80} r={18} fill="#B33A4B" />
            <circle cx={78} cy={80} r={12} fill="#BFE0F2" opacity={0.72} />
            <circle cx={122} cy={80} r={12} fill="#BFE0F2" opacity={0.72} />
            <rect x={96} y={76} width={8} height={7} rx={2} fill="#8E2637" />
            <path d="M72 74 a10 10 0 0 1 10 -4" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            <path d="M116 74 a10 10 0 0 1 10 -4" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            {/* mischievous grin */}
            <path d="M84 96 Q100 110 116 96" fill="none" stroke="#2A1216" strokeWidth={4} strokeLinecap="round" />
            <rect x={96} y={97} width={8} height={5} fill="#fff" />
            {/* lit edge-case bomb in the right hand */}
            <circle cx={184} cy={116} r={16} fill="#23262E" />
            <circle cx={178} cy={110} r={4.5} fill="#3E434D" opacity={0.8} />
            <path d="M184 100 Q196 94 194 82" fill="none" stroke="#7A4A24" strokeWidth={3.5} strokeLinecap="round" />
            <circle cx={194} cy={80} r={3 + spk * 3} fill="#FFD46A" style={{ filter: "drop-shadow(0 0 7px #F2903E)" }} />
            <circle cx={194} cy={80} r={1.5 + spk * 1.5} fill="#fff" />
          </>}

          {/* ===== REVIEWER — THE BOUNCER ===== */}
          {i === 3 && <>
            {/* cover the arms: hands clasped behind the back (read-only) */}
            <rect x={2} y={82} width={36} height={38} rx={12} fill="#24272C" />
            <rect x={162} y={82} width={36} height={38} rx={12} fill="#24272C" />
            {/* READ-ONLY armband on the upper arm */}
            <rect x={4} y={110} width={30} height={13} rx={3} fill="#3FAE82" />
            <rect x={15} y={112} width={8} height={9} rx={2} fill="none" stroke="#0E2A20" strokeWidth={2} />
            <rect x={17} y={109} width={4} height={4} rx={2} fill="none" stroke="#0E2A20" strokeWidth={1.6} />
            {/* sharp black suit jacket */}
            <path d="M36 100 L60 96 L92 114 L108 114 L140 96 L164 100 L172 172 C120 182 80 182 28 172 Z" fill="#24272C" />
            <polygon points="36,100 92,114 74,150 44,120" fill="#191B1F" />
            <polygon points="164,100 108,114 126,150 156,120" fill="#191B1F" />
            {/* white shirt + tie */}
            <rect x={92} y={108} width={16} height={64} fill="#ECE7DD" />
            <polygon points="92,108 100,124 108,108" fill="#24272C" />
            <polygon points="97,120 103,120 106,150 100,158 94,150" fill="#2E7D5B" />
            <rect x={96} y={116} width={8} height={7} fill="#2E7D5B" />
            {/* SECURITY badge */}
            <path d="M56 118 L72 118 L72 132 L64 140 L56 132 Z" fill="#E7B24C" stroke="#B8862C" strokeWidth={1.6} />
            <polygon points="64,122 66,127 71,127 67,130 68,135 64,132 60,135 61,130 57,127 62,127" fill="#7A5A18" />
            {/* coiled earpiece */}
            <circle cx={150} cy={66} r={4.5} fill="#3A3F49" />
            <path d="M150 70 C160 78 158 90 150 96 C144 100 148 106 152 108" fill="none" stroke="#CFCABF" strokeWidth={2.6} strokeLinecap="round" />
            {/* dark sunglasses */}
            <rect x={60} y={68} width={80} height={18} rx={9} fill="#141519" />
            <ellipse cx={78} cy={77} rx={15} ry={8} fill="#0A0B0E" />
            <ellipse cx={122} cy={77} rx={15} ry={8} fill="#0A0B0E" />
            <rect x={96} y={71} width={8} height={5} rx={2} fill="#141519" />
            <rect x={46} y={72} width={16} height={5} rx={2} fill="#141519" />
            <rect x={138} y={72} width={16} height={5} rx={2} fill="#141519" />
            <path d="M70 74 l10 -4" stroke="#3FAE82" strokeWidth={2.4} strokeLinecap="round" opacity={0.7} />
            <path d="M114 74 l10 -4" stroke="#3FAE82" strokeWidth={2.4} strokeLinecap="round" opacity={0.7} />
          </>}
        </svg>
      </div>

      {/* nametag: ROLE + one-word job in the agent color */}
      <div style={{ position: "absolute", left: X - 95, top: 648, width: 190, transform: `translateY(${rise * 0.4}px)`, opacity: Math.min(1, spr(lf, del + 3, 14, 200)), zIndex: 12 }}>
        <div style={{ background: "linear-gradient(180deg, #232a44, #171c2f)", border: `2.5px solid ${A.c}`, borderRadius: 12, padding: "9px 6px 10px", textAlign: "center", boxShadow: `0 10px 22px -10px rgba(0,0,0,0.6), inset 0 1px 0 ${A.c}44` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: A.c, letterSpacing: 0.4, lineHeight: 1 }}>{A.name}</div>
          <div style={{ fontFamily: mono, fontSize: 15, color: "#B9C0CC", marginTop: 4, letterSpacing: 1 }}>· {A.job} ·</div>
        </div>
      </div>
    </>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const banner = Math.min(1, spr(lf, 2, 12, 210));
  return (
    <>
      {/* ===== stage backdrop ===== */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 8%, #2C335C 0%, #20264422 40%, #141830 78%, #0F1226 100%)" }} />
      {/* back-wall glow ribs */}
      {S1COLS.map((A, i) => <div key={"rib" + i} style={{ position: "absolute", left: A.x - 2, top: 60, width: 4, height: 500, background: `linear-gradient(180deg, ${A.c}00, ${A.c}33, ${A.c}00)`, opacity: 0.5 }} />)}
      {/* stage floor with perspective sheen */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 592, height: 200, background: "linear-gradient(180deg, #191E3A 0%, #10132a 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 592, height: 4, background: "linear-gradient(90deg, transparent, rgba(255,240,210,0.25), transparent)" }} />
      {[0.16, 0.5, 0.84].map((p, k) => <div key={"fl" + k} style={{ position: "absolute", left: 506, top: 594, width: 2, height: 190, transform: `translateX(-50%) skewX(${(p - 0.5) * 62}deg)`, transformOrigin: "50% 0", background: "rgba(255,255,255,0.05)" }} />)}
      {/* footlights */}
      {[130, 340, 506, 672, 882].map((x, k) => <div key={"foot" + k} style={{ position: "absolute", left: x - 40, top: 578, width: 80, height: 28, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,224,170,0.28), transparent 70%)" }} />)}

      {/* ===== top banner ===== */}
      <div style={{ position: "absolute", left: 506, top: 30, transform: `translateX(-50%) scale(${banner})`, transformOrigin: "50% 0", textAlign: "center", zIndex: 30 }}>
        <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 6, color: "#8FA0C4", marginBottom: 8, textAlign: "center" }}>SELECT YOUR CREW</div>
        <div style={{ display: "inline-block", background: "linear-gradient(180deg, #FDF6E7, #ECE0C6)", border: "3px solid #1A1813", borderRadius: 16, padding: "10px 26px", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#1A1813", boxShadow: "0 16px 34px -12px rgba(0,0,0,0.6)" }}>
          4 AGENTS <span style={{ color: "#B8501F" }}>·</span> 1 JOB EACH
        </div>
      </div>

      {/* ===== the four hero slots ===== */}
      {S1COLS.map((_, i) => <S1Agent key={i} lf={lf} i={i} />)}

      {/* ===== costume-reveal sparkle bursts ===== */}
      {S1COLS.map((A, i) => <Sparkles key={"sp" + i} lf={lf} at={(5 + i * 7) / 30 + 0.05} x={A.x} y={480} n={16} spread={190} colors={[A.c, "#fff", GOLD]} dur={0.7} />)}

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(70% 62% at 50% 46%, transparent 52%, rgba(6,8,18,0.5) 100%)" }} />
    </>
  );
};

const S2C = "#4C6EF5";        // planner indigo
const S2IND = "#2A2456";      // deep sanctum indigo
const S2GRN = "#57E08A";      // eye-of-agamotto green
const S2GLD = "#E7B24C";      // sanctum gold

// deep mystical sanctum: coffered dome, colonnade, stained-glass windows, god-rays, motes, mandala floor
const S2Chamber: React.FC<{ lf: number }> = ({ lf }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 92% at 50% 30%, #3A3272 0%, #1B1540 62%, #0C0824 100%)" }} />
    <svg width="100%" height="100%" viewBox="0 0 1012 792" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="s2ocul" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S2GRN} stopOpacity="0.30" />
          <stop offset="52%" stopColor={S2C} stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1a0f2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s2ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={S2GLD} stopOpacity="0.22" />
          <stop offset="100%" stopColor={S2GLD} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="s2haze" cx="50%" cy="34%" r="74%">
          <stop offset="0%" stopColor="#2A2456" stopOpacity="0" />
          <stop offset="100%" stopColor="#080418" stopOpacity="0.62" />
        </radialGradient>
      </defs>
      {/* coffered dome rings around the oculus */}
      {(() => { const vp = { x: 506, y: 88 }; const r = []; for (let i = 1; i <= 6; i++) { const rx = 58 * i; r.push(<ellipse key={"r" + i} cx={vp.x} cy={vp.y} rx={rx} ry={rx * 0.6} fill="none" stroke={S2GLD} strokeOpacity={0.13 - i * 0.011} strokeWidth="1.6" />); } return <g>{r}</g>; })()}
      {/* dome ribs radiating from oculus */}
      {(() => { const vp = { x: 506, y: 88 }; const r = []; for (let i = 0; i < 15; i++) { const a = Math.PI * (0.06 + 0.88 * (i / 14)); const R = 460; r.push(<line key={"rb" + i} x1={vp.x} y1={vp.y} x2={vp.x + Math.cos(a) * R} y2={vp.y + Math.sin(a) * R * 0.6} stroke={S2C} strokeOpacity="0.13" strokeWidth="2" />); } return <g>{r}</g>; })()}
      {/* glowing oculus */}
      <ellipse cx="506" cy="88" rx="74" ry="44" fill="url(#s2ocul)" opacity={0.62 + 0.16 * Math.sin(lf / 42)} />
      {/* receding colonnade both sides with arches */}
      {(() => { const n = 6; const g = []; [-1, 1].forEach((s, si) => { const P: any[] = []; for (let i = 0; i < n; i++) { const tt = i / (n - 1); const nearX = s < 0 ? 30 : 982; const farX = s < 0 ? 446 : 566; const x = nearX + (farX - nearX) * Math.pow(tt, 1.55); const w = 66 - 54 * tt; const topY = 246 + 74 * tt; const botY = 782 - 420 * tt; P.push({ x, w, topY, botY, tt }); } P.forEach((p, i) => { g.push(<rect key={"pl" + si + i} x={p.x - p.w / 2} y={p.topY} width={p.w} height={p.botY - p.topY} fill="#221A48" opacity={0.55 - 0.22 * p.tt} />); g.push(<rect key={"cp" + si + i} x={p.x - p.w / 2 - 4} y={p.topY} width={p.w + 8} height={12 - 7 * p.tt} fill="#6A5A9E" opacity={0.4 - 0.15 * p.tt} />); g.push(<rect key={"bs" + si + i} x={p.x - p.w / 2 - 4} y={p.botY - 9} width={p.w + 8} height={9} fill="#5A4A8A" opacity={0.34 - 0.12 * p.tt} />); if (i > 0) { const a = P[i - 1], b = p; const my = (a.topY + b.topY) / 2 - 26 + 18 * p.tt; g.push(<path key={"ar" + si + i} d={"M " + a.x + " " + a.topY + " Q " + ((a.x + b.x) / 2) + " " + my + " " + b.x + " " + b.topY} fill="none" stroke="#6A5A9E" strokeOpacity={0.18 - 0.05 * p.tt} strokeWidth={3 - 1.5 * p.tt} />); } }); }); return <g>{g}</g>; })()}
      {/* god-rays from the oculus */}
      {(() => { const rays = ["150,0 320,0 520,660 280,720", "480,0 660,0 500,700 320,760", "710,0 880,0 760,640 540,700"]; return <g style={{ mixBlendMode: "screen" }}>{rays.map((r, i) => <polygon key={"ry" + i} points={r} fill="url(#s2ray)" opacity={0.10 + 0.05 * Math.sin(lf / 36 + i * 2)} />)}</g>; })()}
      {/* mystic constellation glyphs on back wall */}
      {(() => { const sig = [[176, 430], [792, 430]]; const pts = [[0, 0], [26, -14], [46, 10], [70, -6], [30, 26], [54, 40]]; return <g>{sig.map((o, si) => <g key={"sg" + si} opacity="0.18">{pts.map((p, i) => i > 0 ? <line key={"sl" + i} x1={o[0] + pts[i - 1][0]} y1={o[1] + pts[i - 1][1]} x2={o[0] + p[0]} y2={o[1] + p[1]} stroke={S2C} strokeOpacity="0.5" strokeWidth="1" /> : null)}{pts.map((p, i) => <circle key={"sc" + i} cx={o[0] + p[0]} cy={o[1] + p[1]} r="2" fill={S2C} fillOpacity={0.4 + 0.4 * Math.sin(lf / 10 + i + si * 3)} />)}</g>)}</g>; })()}
      {/* floating dust motes */}
      {(() => { const m = []; for (let i = 0; i < 26; i++) { const bx = seed(i) * 1012; const dx = Math.sin(lf / 68 + i) * 10; const dy = (lf / 6 + i * 40) % 660; const y = (seed(i + 50) * 640 + dy) % 660 + 20; const rr = 0.8 + seed(i + 9) * 1.8; m.push(<circle key={"m" + i} cx={bx + dx} cy={y} r={rr} fill={S2GLD} fillOpacity={(0.12 + 0.16 * seed(i + 3)) * (0.6 + 0.4 * Math.sin(lf / 15 + i))} />); } return <g>{m}</g>; })()}
      <rect x="0" y="0" width="1012" height="792" fill="url(#s2haze)" />
    </svg>
    {/* tall arched stained-glass sanctum windows */}
    {[96, 456, 816].map((x, i) => <div key={"win" + i} style={{ position: "absolute", left: x, top: 52, width: 148, height: 300, borderRadius: "74px 74px 6px 6px", overflow: "hidden", border: "4px solid #3A3070", boxShadow: `0 0 34px ${S2C}44`, background: "#140C28" }}>
      {[...Array(24)].map((_, k) => { const cr = k % 4, rr = Math.floor(k / 4); const col = (cr + rr) % 2 ? S2C : S2GLD; return <div key={k} style={{ position: "absolute", left: cr * 37, top: rr * 50, width: 35, height: 48, background: col, opacity: 0.4 + Math.sin(lf / 14 + k) * 0.12, border: "1px solid rgba(255,243,214,0.35)", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />; })}
      <div style={{ position: "absolute", left: "50%", top: 18, bottom: 6, width: 3, marginLeft: -1.5, background: "#EEE6FF", opacity: 0.45 }} />
    </div>)}
    {/* hanging sanctum lamps */}
    {[276, 736].map((x, i) => <div key={"lmp" + i} style={{ position: "absolute", left: x, top: 36, width: 2, height: 84 }}><div style={{ position: "absolute", left: 0, top: 0, width: 2, height: 84, background: "rgba(180,160,220,0.4)" }} /><div style={{ position: "absolute", left: -14, top: 84 + Math.sin(lf / 26 + i) * 4, width: 30, height: 34, borderRadius: "50% 50% 40% 40%", background: `radial-gradient(circle,#FFE9A0,${S2GLD})`, boxShadow: "0 0 20px rgba(255,200,90,0.6)" }} /></div>)}
    {/* mandala floor disc */}
    <div style={{ position: "absolute", left: "50%", bottom: 34, width: 540, height: 122, marginLeft: -270, borderRadius: "50%", border: `2px solid ${S2GLD}66`, transform: "scaleY(0.4)", boxShadow: `0 0 40px ${S2C}33` }}>{[0.72, 0.44].map((r, i) => <div key={i} style={{ position: "absolute", inset: `${(1 - r) * 50}%`, borderRadius: "50%", border: `2px solid ${S2C}55`, transform: `rotate(${lf * (i % 2 ? -1 : 1)}deg)` }} />)}</div>
  </div>
);

// small holographic outcome / edge-case card fanned around the eye
const S2Card: React.FC<{ lf: number; i: number; ex: number; ey: number; collapse: number; docX: number; docY: number }> = ({ lf, i, ex, ey, collapse, docX, docY }) => {
  const ang = (-166 + i * (152 / 11)) * Math.PI / 180;
  const R = 236 + seed(i * 5) * 74;
  const bx = ex + Math.cos(ang) * R;
  const by = ey + Math.sin(ang) * R * 0.94;
  const appear = over(lf, fr(0.2) + i * 3, fr(0.4), Easing.out(Easing.back(1.5)));
  if (appear < 0.02) return null;
  const x = bx + (docX - bx) * collapse;
  const y = by + (docY - by) * collapse;
  const sc = appear * (1 - collapse * 0.9);
  const op = appear * (1 - collapse);
  const bad = i === 5;
  const chk = over(lf, fr(0.2) + i * 3 + 8, fr(0.3));
  const c = bad ? RED : S2C;
  return (
    <div style={{ position: "absolute", left: x - 44, top: y - 30, width: 88, height: 60, transform: `scale(${sc}) rotate(${(seed(i * 7) - 0.5) * 12}deg)`, opacity: op, zIndex: 14, borderRadius: 9, background: `linear-gradient(160deg, ${c}33, rgba(14,10,32,0.9))`, border: `2px solid ${c}`, boxShadow: `0 0 16px ${c}88`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 8, top: 9, right: 8, height: 5, borderRadius: 2, background: `${c}cc` }} />
      <div style={{ position: "absolute", left: 8, top: 20, width: "60%", height: 4, borderRadius: 2, background: "rgba(220,224,255,0.4)" }} />
      <div style={{ position: "absolute", left: 8, top: 30, width: "44%", height: 4, borderRadius: 2, background: "rgba(220,224,255,0.28)" }} />
      <div style={{ position: "absolute", right: 6, bottom: 5, width: 20, height: 20, borderRadius: "50%", background: bad ? RED : S2GRN, transform: `scale(${chk})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#0C0824", boxShadow: `0 0 10px ${bad ? RED : S2GRN}` }}>{bad ? "!" : "✓"}</div>
    </div>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const eyeX = 506, eyeY = 286;
  const docX = 706, docY = 356;
  const breath = 1 + 0.03 * Math.sin(lf / 6);
  const portal = Math.min(1, 0.62 + over(lf, 0, fr(1.0)) * 0.38);
  const sweep = over(lf, 0, fr(3.2));
  const collapse = over(lf, fr(5.0), fr(1.05), Easing.inOut(Easing.cubic));
  const docGrow = over(lf, fr(5.15), fr(1.1), Easing.out(Easing.back(1.2)));
  const count = Math.floor(14003 * over(lf, fr(0.4), fr(5.3), Easing.out(Easing.cubic)));
  const badge = Math.min(1.06, spr(lf, fr(0.5), 11, 200));
  const float = bob(lf, 11, 96);
  const finalP = spr(lf, fr(7.1), 9, 210);
  const targets = [{ tx: 300, ty: 260, bad: false }, { tx: 250, ty: 470, bad: false }, { tx: 760, ty: 250, bad: true }, { tx: 820, ty: 470, bad: false }];

  return (
    <>
      <S2Chamber lf={lf} />

      {/* radial indigo glow behind the eye */}
      <div style={{ position: "absolute", left: eyeX - 320, top: eyeY - 300, width: 640, height: 600, background: `radial-gradient(circle, ${S2C}3a, transparent 66%)`, zIndex: 4, pointerEvents: "none", transform: `scale(${breath})` }} />

      {/* ghost future-clones of the planner (seeing every outcome) */}
      {portal > 0.3 && [0.4, 0.62, 0.82].map((o, i) => <div key={"gf" + i} style={{ position: "absolute", left: 210 + i * 26, bottom: 122 + i * 6, opacity: (1 - o) * (1 - collapse) * 0.42, zIndex: 6, filter: `drop-shadow(0 0 10px ${S2C})` }}><Mascot lf={lf - i * 5} size={228} tint={lerpHex(S2C, "#B9C4FF", 0.4)} glasses={1} nodAmp={2} nodSpeed={12} /></div>)}

      {/* branching timeline threads + horizontal scan-line across the top */}
      <svg width="1012" height="792" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 10 }}>
        <line x1="90" y1="66" x2="922" y2="66" stroke={S2GLD} strokeWidth="4" opacity="0.2" />
        <line x1="90" y1="66" x2={90 + 832 * sweep} y2="66" stroke={S2C} strokeWidth="5" opacity="0.9" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${S2C})` }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const on = over(lf, fr(0.2 + i * 0.22), fr(0.3), Easing.out(Easing.cubic)); const nx = 90 + i * 104; const bad = i === 5; const col = bad ? RED : S2C; const pulse = bad ? 0.5 + 0.5 * Math.sin(lf / 4) : 1; return <g key={"nd" + i}><circle cx={nx} cy="66" r={8 + 5 * on} fill={col} opacity={on * (1 - collapse * 0.7) * (bad ? pulse : 1)} style={{ filter: `drop-shadow(0 0 ${6 * on}px ${col})` }} /><circle cx={nx} cy="66" r="4" fill="#fff" opacity={on * 0.9 * (1 - collapse * 0.7)} /></g>; })}
        {/* threads from the eye out to future-clone targets */}
        {targets.map((t, i) => { const g = over(lf, fr(0.5 + i * 0.2), fr(0.6), Easing.out(Easing.cubic)) * (1 - collapse); const ex2 = eyeX + (t.tx - eyeX) * g, ey2 = eyeY + (t.ty - eyeY) * g; const col = t.bad ? RED : S2C; return <line key={"th" + i} x1={eyeX} y1={eyeY} x2={ex2} y2={ey2} stroke={col} strokeWidth="3" opacity={0.55 * g} strokeDasharray="8 7" style={{ filter: `drop-shadow(0 0 5px ${col})` }} />; })}
      </svg>

      {/* THE EYE OF AGAMOTTO — spinning mandala rings + green eye at the center */}
      <svg width="1012" height="792" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 8 }}>
        <g transform={`translate(${eyeX},${eyeY}) scale(${portal * breath * (1 - collapse * 0.55)})`} opacity={1 - collapse * 0.6}>
          <circle r="152" fill="none" stroke={S2C} strokeWidth="3" opacity="0.5" strokeDasharray="14 11" transform={`rotate(${lf * 1.1})`} />
          <circle r="122" fill="none" stroke={S2GLD} strokeWidth="2" opacity="0.6" strokeDasharray="6 9" transform={`rotate(${-lf * 1.6})`} />
          <circle r="96" fill="none" stroke={S2C} strokeWidth="7" opacity="0.72" strokeDasharray="30 20" transform={`rotate(${lf * 2.1})`} style={{ filter: `drop-shadow(0 0 10px ${S2C})` }} />
          <g transform={`rotate(${lf * 0.8})`}>{Array.from({ length: 16 }).map((_, i) => { const a = i * Math.PI / 8; return <line key={"sp" + i} x1={Math.cos(a) * 66} y1={Math.sin(a) * 66} x2={Math.cos(a) * 138} y2={Math.sin(a) * 138} stroke={S2GLD} strokeWidth="2" opacity="0.3" />; })}</g>
          {/* the almond eye */}
          <path d="M -70 0 Q 0 -46 70 0 Q 0 46 -70 0 Z" fill="rgba(10,26,16,0.85)" stroke={S2GRN} strokeWidth="4" style={{ filter: `drop-shadow(0 0 14px ${S2GRN})` }} />
          <circle r={26 + 4 * Math.sin(lf / 5)} fill={S2GRN} opacity="0.9" style={{ filter: `drop-shadow(0 0 16px ${S2GRN})` }} />
          <ellipse rx="7" ry={22} fill="#0A1A10" />
          <circle r="24" fill="none" stroke="#EAFFB0" strokeWidth="2" opacity="0.5" />
        </g>
      </svg>

      {/* orbiting sparks around the eye */}
      {portal > 0.4 && (1 - collapse) > 0.1 && [...Array(7)].map((_, i) => { const a = i / 7 * Math.PI * 2 + lf / 8; return <div key={"os" + i} style={{ position: "absolute", left: eyeX + Math.cos(a) * 120 - 3, top: eyeY + Math.sin(a) * 108 - 3, width: 6, height: 6, borderRadius: "50%", background: i % 2 ? S2GLD : S2GRN, boxShadow: `0 0 9px ${i % 2 ? S2GLD : S2GRN}`, opacity: (1 - collapse) * 0.9, zIndex: 9 }} />; })}

      {/* dozens of outcome / edge-case cards fanning out, then collapsing to one */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <S2Card key={i} lf={lf} i={i} ex={eyeX} ey={eyeY} collapse={collapse} docX={docX} docY={docY} />)}

      {/* THE ONE SPEC / blueprint document that everything collapses into */}
      {docGrow > 0.02 && (
        <div style={{ position: "absolute", left: docX - 152, top: docY - 128, width: 304, transform: `scale(${docGrow})`, transformOrigin: "50% 50%", zIndex: 24, opacity: Math.min(1, docGrow * 1.4) }}>
          <div style={{ borderRadius: 16, background: "linear-gradient(168deg, #F4F1FF, #DDD6F2)", border: `3px solid ${S2GLD}`, boxShadow: `0 0 40px ${S2C}88, 0 22px 44px -16px rgba(0,0,0,0.6)`, overflow: "hidden" }}>
            <div style={{ padding: "9px 14px", background: S2C, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: S2GRN, boxShadow: `0 0 8px ${S2GRN}` }} />
              <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: 0.5 }}>SPEC.md</span>
              <span style={{ marginLeft: "auto", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, color: "#fff", opacity: 0.85 }}>THE PLAN</span>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
              {["BUILD", "FILES", "EDGE CASES"].map((row, r) => { const rp = over(lf, fr(5.5) + r * 6, fr(0.35), Easing.out(Easing.back(1.5))); return (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, transform: `translateX(${(1 - rp) * -18}px)`, opacity: rp }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: S2GRN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#0C2416", boxShadow: `0 0 8px ${S2GRN}88` }}>✓</div>
                  <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#241C40" }}>{row}</span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>{[0, 1, 2].map((k) => <div key={k} style={{ width: 22 - k * 5, height: 5, borderRadius: 2, background: r === 2 ? S2C : "#B7AEDA" }} />)}</div>
                </div>); })}
            </div>
          </div>
        </div>
      )}

      {/* THE PLANNER mascot, floating cross-legged before the eye */}
      <div style={{ position: "absolute", left: 176, bottom: 118, width: 236, zIndex: 20, transform: `translateY(${float}px)`, filter: `drop-shadow(0 0 20px ${S2C}cc)` }}>
        {/* meditation glow halo */}
        <div style={{ position: "absolute", left: "50%", top: "40%", width: 300, height: 300, marginLeft: -150, marginTop: -150, borderRadius: "50%", background: `radial-gradient(circle, ${S2C}44, transparent 64%)`, zIndex: -1, transform: `scale(${breath})` }} />
        <Mascot lf={lf} size={236} tint={S2C} glasses={1} gaze={4} cheer={collapse > 0.4 ? 0.4 : 0} nodAmp={1.6} nodSpeed={14} />
        {/* casting spell-ring off the paw */}
        {(1 - collapse) > 0.2 && <div style={{ position: "absolute", left: "68%", top: "24%", width: 120, height: 120 }}><div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `4px dashed ${S2GLD}`, boxShadow: `0 0 16px ${S2GLD}`, transform: `rotate(${lf * 3}deg)`, opacity: 1 - collapse }} /><div style={{ position: "absolute", inset: "28%", borderRadius: "50%", border: `3px dashed ${S2GRN}`, transform: `rotate(${-lf * 4}deg)`, opacity: 1 - collapse }} /></div>}
      </div>

      {/* SMARTEST MODEL / galaxy-brain badge */}
      <div style={{ position: "absolute", left: 150, top: 132, transform: `translate(-50%,-50%) scale(${badge})`, zIndex: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px 9px 12px", borderRadius: 999, background: "linear-gradient(150deg, #2A2456, #140C28)", border: `2.5px solid ${S2GLD}`, boxShadow: `0 0 26px ${S2GLD}77`, whiteSpace: "nowrap" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `radial-gradient(circle at 40% 34%, #EAFFB0, ${S2GRN})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 0 14px ${S2GRN}`, transform: `scale(${1 + 0.06 * Math.sin(lf / 7)})` }}>🧠</div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: "#fff", textShadow: `0 0 10px ${S2GLD}88` }}>SMARTEST MODEL</span>
            <span style={{ fontFamily: mono, fontSize: 12, color: S2GLD, letterSpacing: 1 }}>THE PLAN SETS THE CEILING</span>
          </div>
        </div>
      </div>

      {/* EDGE CASES CHECKED counter, ticking */}
      <div style={{ position: "absolute", left: cx, top: 108, transform: "translateX(-50%)", zIndex: 30, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 10, padding: "8px 22px", borderRadius: 14, background: "rgba(10,6,26,0.72)", border: `2px solid ${S2C}`, boxShadow: `0 0 22px ${S2C}55` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#fff", textShadow: `0 0 16px ${S2GRN}`, fontVariantNumeric: "tabular-nums" }}>{count.toLocaleString()}</span>
          <span style={{ fontFamily: mono, fontSize: 15, color: S2GRN, letterSpacing: 1.5 }}>EDGE CASES CHECKED</span>
        </div>
      </div>

      {/* terminal whisper under the mascot */}
      <div style={{ position: "absolute", left: 60, bottom: 64, fontFamily: mono, fontSize: 19, fontWeight: 800, color: S2C, textShadow: `0 0 8px ${S2C}`, opacity: 0.9, zIndex: 22 }}>{"> SIMULATING FUTURES..."}</div>

      {/* collapse flash + burst */}
      {collapse > 0.02 && collapse < 0.6 && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${docX}px ${docY}px, ${S2GRN}55, transparent 40%)`, opacity: (0.6 - collapse) * 1.4, zIndex: 26, pointerEvents: "none" }} />}
      <Sparkles lf={lf} at={5.0} x={docX} y={docY} n={22} spread={300} colors={[S2GRN, S2GLD, "#fff", S2C]} dur={1.0} />

      {/* PAYOFF stamp */}
      {finalP > 0.05 && <Stamp x={cx} y={430} s={Math.min(1.08, finalP)} text="THE PLAN SETS THE CEILING" c={S2C} rot={-3} />}
      <Sparkles lf={lf} at={7.1} x={cx} y={430} n={18} spread={280} colors={[S2GLD, S2GRN, "#fff"]} dur={1.0} />
    </>
  );
};

// ============================== CODER · Minecraft/3D-printer build ==============================
// ============================== S3 — THE CODER: Minecraft build, block-by-block to spec ==============================
const S3C = "#E0843A"; // CODER amber
const S3U = 40, S3OX = 620, S3OY = 356;
const S3pts = (arr: number[][]) => arr.map((p) => p.join(",")).join(" ");
const S3proj = (gx: number, gy: number, gz: number, ox: number, oy: number, u: number): [number, number] => [ox + (gx - gz) * u, oy + (gx + gz) * u * 0.5 - gy * u];
const S3PAL: Record<string, { top: string; left: string; right: string }> = {
  grass: { top: "#8FCB6A", left: "#8A5A34", right: "#6E4526" },
  wood: { top: "#CB9A57", left: "#A87A3C", right: "#8A6330" },
  roof: { top: "#D96A4E", left: "#BC5439", right: "#9C4329" },
  glass: { top: "#B7DDF3", left: "#93C4E8", right: "#7BB2DD" },
  trunk: { top: "#7A5330", left: "#634324", right: "#4E351B" },
  leaf: { top: "#72B34E", left: "#5C9A3E", right: "#4B8032" },
};

// the house model (walls -> windows -> roof -> peak)
const S3HOUSE: { gx: number; gy: number; gz: number; kind: string; rt: number }[] = (() => {
  const b: { gx: number; gy: number; gz: number; kind: string; rt: number }[] = [];
  for (let gy = 1; gy <= 2; gy++)
    for (let gx = 0; gx <= 2; gx++)
      for (let gz = 0; gz <= 2; gz++) {
        const perim = gx === 0 || gx === 2 || gz === 0 || gz === 2;
        if (!perim) continue;
        if (gy === 1 && gx === 1 && gz === 2) continue; // door gap
        let kind = "wood";
        if (gy === 2 && ((gx === 0 && gz === 1) || (gx === 2 && gz === 1))) kind = "glass"; // side windows
        b.push({ gx, gy, gz, kind, rt: 0 });
      }
  for (let gx = 0; gx <= 2; gx++) for (let gz = 0; gz <= 2; gz++) b.push({ gx, gy: 3, gz, kind: "roof", rt: 0 }); // roof slab
  b.push({ gx: 1, gy: 4, gz: 1, kind: "roof", rt: 0 }); // peak
  // reveal order: layer by layer, back to front
  b.slice().sort((a, c) => a.gy - c.gy || (a.gx + a.gz) - (c.gx + c.gz) || a.gx - c.gx).forEach((blk, i) => { blk.rt = -36 + i * 6; });
  return b;
})();
const S3LAST = Math.max(...S3HOUSE.map((b) => b.rt));

// ground field + a back-corner oak tree (always placed)
const S3ENV: { gx: number; gy: number; gz: number; kind: string; rt: number }[] = (() => {
  const e: { gx: number; gy: number; gz: number; kind: string; rt: number }[] = [];
  for (let gx = -1; gx <= 4; gx++) for (let gz = -1; gz <= 4; gz++) e.push({ gx, gy: 0, gz, kind: "grass", rt: -999 });
  e.push({ gx: 4, gy: 1, gz: -1, kind: "trunk", rt: -999 }, { gx: 4, gy: 2, gz: -1, kind: "trunk", rt: -999 });
  [[4, 3, -1], [3, 3, -1], [4, 3, 0], [4, 4, -1]].forEach(([gx, gy, gz]) => e.push({ gx, gy, gz, kind: "leaf", rt: -999 }));
  return e;
})();
const S3ALL = [...S3ENV, ...S3HOUSE];

const S3Cube: React.FC<{ x: number; y: number; u: number; pal: { top: string; left: string; right: string }; dy?: number; op?: number; flash?: number }> = ({ x, y, u, pal, dy = 0, op = 1, flash = 0 }) => {
  const T = [x, y - u], UR = [x + u, y - u / 2], LR = [x + u, y + u / 2], B = [x, y + u], LL = [x - u, y + u / 2], UL = [x - u, y - u / 2], C = [x, y];
  return (
    <g transform={`translate(0 ${dy})`} opacity={op}>
      <polygon points={S3pts([C, UR, LR, B])} fill={pal.right} stroke={INK} strokeOpacity={0.3} strokeWidth={0.8} strokeLinejoin="round" />
      <polygon points={S3pts([C, UL, LL, B])} fill={pal.left} stroke={INK} strokeOpacity={0.3} strokeWidth={0.8} strokeLinejoin="round" />
      <polygon points={S3pts([T, UR, C, UL])} fill={pal.top} stroke={INK} strokeOpacity={0.3} strokeWidth={0.8} strokeLinejoin="round" />
      {flash > 0.01 && <polygon points={S3pts([T, UR, C, UL])} fill="#FFFFFF" opacity={flash * 0.65} />}
    </g>
  );
};
const S3Ghost: React.FC<{ x: number; y: number; u: number; c?: string }> = ({ x, y, u, c = "rgba(255,255,255,0.24)" }) => {
  const T = [x, y - u], UR = [x + u, y - u / 2], LR = [x + u, y + u / 2], B = [x, y + u], LL = [x - u, y + u / 2], UL = [x - u, y - u / 2], C = [x, y];
  return (
    <g>
      <polygon points={S3pts([T, UR, LR, B, LL, UL])} fill="none" stroke={c} strokeWidth={1.1} strokeDasharray="3 3" />
      <polyline points={S3pts([UL, C, UR])} fill="none" stroke={c} strokeWidth={1.1} strokeDasharray="3 3" />
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={c} strokeWidth={1.1} strokeDasharray="3 3" />
    </g>
  );
};
const S3CODE = ["> lay 3x3 base", "> raise walls + door", "> cut 2 windows", "> cap the roof"];

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const done = lf > S3LAST + 8;
  const cheer = interpolate(lf, [S3LAST - 2, S3LAST + 16], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drawn = S3ALL.slice().sort((a, b) => (a.gx + a.gz) - (b.gx + b.gz) || a.gy - b.gy || a.gx - b.gx);
  // most-recent landed house block -> dust puff
  const recent = S3HOUSE.filter((b) => lf >= b.rt && lf - b.rt < 11).sort((a, b) => b.rt - a.rt)[0];
  const tagRot = -8 + Math.sin(lf / 20) * 4;
  return (
    <>
      {/* ---- sky ---- */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#4E93D6 0%,#69ABE2 46%,#8FC6EC 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 420, background: "radial-gradient(ellipse 60% 100% at 84% 0%, rgba(255,246,208,0.55), transparent 70%)", zIndex: 1 }} />
      {/* blocky sun */}
      <div style={{ position: "absolute", left: 858, top: 66, width: 86, height: 86, background: "#FCE07A", boxShadow: "0 0 46px rgba(252,224,122,0.85), inset 0 0 0 6px #F6CE4E", zIndex: 1 }} />
      {/* blocky clouds */}
      {[[120, 90, 1], [640, 140, 0.85], [360, 220, 0.7]].map(([bx, by, o], i) => {
        const dx = ((bx + lf * (0.5 + i * 0.2)) % 1240) - 120;
        return (
          <div key={i} style={{ position: "absolute", left: dx, top: by, zIndex: 2, opacity: o, filter: "drop-shadow(0 6px 0 rgba(120,150,190,0.18))" }}>
            <div style={{ width: 150, height: 34, background: "#F4F8FC" }} />
            <div style={{ position: "absolute", left: 30, top: -22, width: 84, height: 26, background: "#FBFDFF" }} />
            <div style={{ position: "absolute", left: 96, top: 8, width: 40, height: 22, background: "#EAF1F8" }} />
          </div>
        );
      })}

      {/* soft shadow under the build */}
      <div style={{ position: "absolute", left: cx + 60, top: 486, width: 320, height: 84, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(30,40,20,0.34), transparent 70%)", zIndex: 3 }} />

      {/* ---- the voxel world (ground + ghost outline + snapping blocks) ---- */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "visible" }} shapeRendering="geometricPrecision">
        {drawn.map((blk, idx) => {
          const [sx, sy] = S3proj(blk.gx, blk.gy, blk.gz, S3OX, S3OY, S3U);
          if (lf < blk.rt) return <S3Ghost key={idx} x={sx} y={sy} u={S3U} />;
          const t = lf - blk.rt;
          const p = interpolate(t, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) });
          const dy = (1 - p) * -66;
          const op = interpolate(t, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (blk.kind === "glass" ? 0.82 : 1);
          const flash = interpolate(t, [6, 16], [0.7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <S3Cube key={idx} x={sx} y={sy} u={S3U} pal={S3PAL[blk.kind]} dy={dy} op={op} flash={flash} />;
        })}
        {/* dust puff on the freshest block */}
        {recent && (() => {
          const [rx, ry] = S3proj(recent.gx, recent.gy, recent.gz, S3OX, S3OY, S3U);
          const t = lf - recent.rt; const pp = t / 11;
          return <g opacity={1 - pp}>{Array.from({ length: 6 }).map((_, k) => { const a = (k / 6) * Math.PI * 2; const d = pp * 26; return <circle key={k} cx={rx + Math.cos(a) * d} cy={ry + 22 + Math.sin(a) * d * 0.4} r={4 - pp * 3} fill="#E9D8B8" />; })}</g>;
        })()}
      </svg>

      {/* faint feed-arc from coder's hand toward the build */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 6, overflow: "visible", pointerEvents: "none" }}>
        <path d="M 340 452 Q 470 300 590 356" fill="none" stroke={S3C} strokeWidth={2.5} strokeDasharray="6 8" strokeOpacity={0.5} strokeDashoffset={-lf * 1.4} strokeLinecap="round" />
      </svg>

      {/* ---- the CODER mascot (hard hat, amber) ---- */}
      <div style={{ position: "absolute", left: 56, bottom: 104, width: 236, zIndex: 20, filter: `drop-shadow(0 0 14px ${S3C}66)` }}>
        <Mascot lf={lf} size={236} tint={S3C} constr={1} gaze={7} cheer={cheer} nodAmp={3} nodSpeed={9} />
      </div>
      {/* the block waiting in its hand */}
      <svg viewBox="0 0 90 90" width={90} height={90} style={{ position: "absolute", left: 296, top: 402 + bob(lf, 6, 34), zIndex: 21, overflow: "visible", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" }}>
        <S3Cube x={45} y={46} u={20} pal={S3PAL.wood} flash={0} />
      </svg>
      {/* name pill */}
      <div style={{ position: "absolute", left: 60, bottom: 60, transform: `scale(${Math.min(1.05, spr(lf, 6, 11, 210))})`, transformOrigin: "0 50%", zIndex: 24 }}>
        <span style={{ display: "inline-block", padding: "7px 20px", borderRadius: 999, background: "#fff", border: `3px solid ${S3C}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: INK, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.45)" }}>THE CODER</span>
      </div>

      {/* ---- SPEC blueprint pinned on the wall ---- */}
      <div style={{ position: "absolute", left: 44, top: 78, width: 256, borderRadius: 14, background: "linear-gradient(160deg,#123A66,#0C2748)", border: "3px solid #2E6AAE", boxShadow: "0 20px 40px -16px rgba(0,0,0,0.55)", zIndex: 22, overflow: "hidden", transform: `rotate(-2deg) scale(${Math.min(1.04, spr(lf, 2, 12, 210))})` }}>
        {/* pin */}
        <div style={{ position: "absolute", left: "50%", top: 8, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: "radial-gradient(circle at 36% 32%, #FFE7A0, #D2724E)", boxShadow: "0 3px 6px rgba(0,0,0,0.4)", zIndex: 3 }} />
        {/* grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.09) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
        <div style={{ position: "relative", padding: "22px 14px 12px" }}>
          <div style={{ fontFamily: mono, fontSize: 15, color: "#9FC6EE", letterSpacing: "0.14em", marginBottom: 2 }}>THE SPEC</div>
          {/* mini iso target */}
          <svg viewBox="0 0 256 150" width={228} height={134} style={{ display: "block", margin: "0 auto", overflow: "visible" }}>
            {S3HOUSE.slice().sort((a, b) => (a.gx + a.gz) - (b.gx + b.gz) || a.gy - b.gy || a.gx - b.gx).map((blk, idx) => {
              const [sx, sy] = S3proj(blk.gx, blk.gy, blk.gz, 128, 96, 11);
              if (lf < blk.rt) return <S3Ghost key={idx} x={sx} y={sy} u={11} c="rgba(150,195,240,0.5)" />;
              return <S3Cube key={idx} x={sx} y={sy} u={11} pal={S3PAL[blk.kind]} op={blk.kind === "glass" ? 0.82 : 1} />;
            })}
          </svg>
          {/* the plan, typing */}
          <div style={{ marginTop: 6, minHeight: 92 }}>
            {S3CODE.map((line, i) => {
              const start = 6 + i * 22; const n = Math.max(0, Math.floor((lf - start) / 1.3));
              if (lf < start) return <div key={i} style={{ height: 21 }} />;
              const txt = line.slice(0, n); const active = n < line.length && lf > start;
              return <div key={i} style={{ fontFamily: mono, fontSize: 14.5, color: "#CDE4FB", lineHeight: "21px", whiteSpace: "nowrap" }}>{txt}{active && (lf % 16 < 8 ? "▌" : "")}{!active && n >= line.length && <span style={{ color: "#7FE0B4", marginLeft: 6 }}>ok</span>}</div>;
            })}
          </div>
        </div>
        {/* MATCHES stamp on completion */}
        {done && <div style={{ position: "absolute", right: 12, top: 40, transform: `rotate(-12deg) scale(${Math.min(1.1, spr(lf, S3LAST + 8, 10, 210))})`, padding: "4px 12px", borderRadius: 8, border: "3px solid #4FD39A", color: "#4FD39A", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, background: "rgba(12,39,72,0.85)", zIndex: 5 }}>MATCHES ✓</div>}
      </div>

      {/* ---- CHEAPER MODEL price tag hung on the build ---- */}
      <div style={{ position: "absolute", left: 744, top: 300, transformOrigin: "20px -18px", transform: `rotate(${tagRot}deg)`, zIndex: 26 }}>
        <svg width={30} height={40} viewBox="0 0 30 40" style={{ position: "absolute", left: 8, top: -40, overflow: "visible" }}><path d="M20 -6 L20 34" stroke="#8A6330" strokeWidth={3} fill="none" /></svg>
        <div style={{ position: "relative", padding: "9px 15px 9px 22px", background: grad("#F0C24E", "#E0843A"), border: "3px solid #fff", borderRadius: "6px 14px 14px 6px", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 8, top: "50%", width: 11, height: 11, marginTop: -5, borderRadius: "50%", background: "#0C2748", border: "2px solid #fff" }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#3A2410", letterSpacing: "0.03em", lineHeight: 1 }}>CHEAPER MODEL</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", lineHeight: 1, textShadow: "0 2px 0 rgba(150,80,20,0.5)" }}>$</div>
        </div>
      </div>

      {/* ---- Minecraft hotbar ---- */}
      <div style={{ position: "absolute", left: "50%", bottom: 34, transform: "translateX(-50%)", display: "flex", gap: 4, padding: 5, borderRadius: 6, background: "rgba(20,20,24,0.55)", border: "2px solid rgba(20,20,24,0.7)", zIndex: 30 }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const sel = i === 3;
          const fills: Record<number, string> = { 3: "wood", 2: "grass", 4: "roof", 5: "glass" };
          const k = fills[i];
          return (
            <div key={i} style={{ width: 52, height: 52, background: "rgba(139,139,139,0.55)", border: sel ? "3px solid #fff" : "2px solid rgba(60,60,64,0.8)", boxShadow: sel ? "0 0 14px rgba(255,255,255,0.6)" : "inset 0 0 0 2px rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", transform: sel ? "scale(1.08)" : "scale(1)" }}>
              {k && <svg width={40} height={40} viewBox="0 0 40 40" style={{ overflow: "visible" }}><S3Cube x={20} y={22} u={11} pal={S3PAL[k]} /></svg>}
            </div>
          );
        })}
      </div>

      {/* ---- payoff ---- */}
      {done && <Stamp x={cx + 130} y={214} s={Math.min(1.08, spr(lf, S3LAST + 6, 9, 210))} text="BUILT TO SPEC" c={S3C} rot={-5} />}
      {done && <div style={{ position: "absolute", left: cx + 130, top: 262, transform: `translateX(-50%) scale(${Math.min(1.05, spr(lf, S3LAST + 12, 12, 210))})`, zIndex: 39 }}>
        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 999, background: "rgba(12,39,72,0.82)", border: `1.5px solid ${S3C}`, fontFamily: mono, fontSize: 15, color: "#FBE3C2", whiteSpace: "nowrap" }}>nothing more, nothing less</span>
      </div>}
      <Sparkles lf={lf} at={(S3LAST + 6) / 30} x={cx + 130} y={280} n={18} spread={300} colors={[S3C, GOLD, "#fff"]} dur={1.0} />
      {lf > S3LAST + 4 && <Confetti lf={lf - S3LAST} n={26} colors={[S3C, GOLD, "#8FCB6A", "#fff"]} top={-20} h={560} />}
    </>
  );
};

// ============================== TESTER · Mythbusters crash-lab ==============================
// ================= S4 — THE TESTER · MYTHBUSTERS CRASH-TEST LAB =================
// pop-culture: a crash-test / demolition lab. goggles, blast shield, wrecking ball,
// crash-test sled, edge-case bombs, warning beacons, DANGER stripe. build HOLDS.
const S4RED = "#E0556B";     // tester
const S4GREEN = "#3FAE82";   // passing tests / reviewer green
const S4AMBER = "#E0843A";   // coder's build accent
const S4SX = 636;            // rig / build centre x
const S4INPUTS = ["null", "0", "-1", "empty", "999999", "🤯"];
// crack + seal sites, local to build box (200 x 320)
const S4SITES: [number, number][] = [[56, 70], [150, 108], [40, 188], [160, 214], [96, 148], [112, 268]];
// weapon strike frames
const S4WRECK = fr(2.82);
const S4FLAME0 = fr(3.28), S4FLAME1 = fr(4.02);
const S4QUAKE0 = fr(4.1), S4QUAKE1 = fr(4.74);
const S4BOLT = fr(4.9);

// rotating hazard beacon (dome + sweeping wedge)
const S4Beacon: React.FC<{ lf: number; x: number; y: number; c: string; ph?: number }> = ({ lf, x, y, c, ph = 0 }) => {
  const a = (lf * 6 + ph) % 360;
  const pulse = 0.55 + Math.abs(Math.sin(lf / 7 + ph)) * 0.45;
  return (
    <div style={{ position: "absolute", left: x - 20, top: y - 20, width: 40, height: 40, zIndex: 33 }}>
      <div style={{ position: "absolute", left: 20, top: 20, width: 240, height: 120, transform: `translateY(-50%) rotate(${a}deg)`, transformOrigin: "0% 50%", background: `linear-gradient(90deg, ${c}55, transparent 74%)`, clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)", opacity: 0.5, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 4, top: 26, width: 32, height: 12, borderRadius: 4, background: "#2A2029" }} />
      <div style={{ position: "absolute", left: 6, top: 4, width: 28, height: 28, borderRadius: "50% 50% 46% 46%", background: `radial-gradient(circle at 38% 32%, #fff, ${c})`, boxShadow: `0 0 ${10 + pulse * 20}px ${c}`, opacity: pulse, border: "2px solid rgba(0,0,0,0.3)" }} />
    </div>
  );
};

// expanding blast: flash core + shock ring + spark shards
const S4Blast: React.FC<{ lf: number; at: number; x: number; y: number; big?: number }> = ({ lf, at, x, y, big = 1 }) => {
  const life = 13 * big;
  if (lf < at || lf > at + life) return null;
  const p = (lf - at) / life;
  const R = 30 * big;
  const rr = R + p * R * 3.4;
  const flash = Math.max(0, 1 - p * 2.4);
  const ring = Math.max(0, 1 - p);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 28, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -R * 1.1, top: -R * 1.1, width: R * 2.2, height: R * 2.2, borderRadius: "50%", background: "radial-gradient(circle, #FFF6D0, #FFC24A 46%, transparent 70%)", opacity: flash, filter: "blur(1px)" }} />
      <div style={{ position: "absolute", left: -rr, top: -rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${4 * ring + 1}px solid rgba(255,210,120,${ring * 0.9})`, opacity: ring }} />
      {Array.from({ length: Math.round(9 * big) }).map((_, k) => {
        const ang = (k / (9 * big)) * Math.PI * 2 + seed(k + at);
        const d = p * R * 3.2 * (0.6 + seed(k * 2) * 0.8);
        const s = 4 + seed(k * 3) * 5;
        return <div key={k} style={{ position: "absolute", left: Math.cos(ang) * d - s / 2, top: Math.sin(ang) * d - s / 2, width: s, height: s, borderRadius: "50%", background: k % 2 ? "#FFE49A" : S4RED, opacity: ring, boxShadow: `0 0 8px ${k % 2 ? "#FFE49A" : S4RED}` }} />;
      })}
    </div>
  );
};

// flamethrower cone of fire, origin at nozzle -> aimed right at the build
const S4Flame: React.FC<{ lf: number; ox: number; oy: number; len: number; on: number }> = ({ lf, ox, oy, len, on }) => {
  if (on <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: ox, top: oy - 60, width: len, height: 120, zIndex: 27, pointerEvents: "none", opacity: on }}>
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 42%, 8% 30%, 100% 4%, 100% 96%, 8% 70%)", background: "linear-gradient(90deg, #FFF3C0, #FFC24A 26%, #F2712A 58%, rgba(224,85,107,0.35) 92%)", filter: "blur(2px)", opacity: 0.9 }} />
      {Array.from({ length: 16 }).map((_, k) => {
        const t = ((lf * 3 + seed(k) * 60) % 60) / 60;
        const px = 20 + t * (len - 40);
        const spread = 6 + t * 44;
        const py = 60 + Math.sin(lf / 3 + k * 2) * spread * 0.5 + (seed(k * 2) - 0.5) * spread;
        const s = (1 - t) * 22 + 5;
        return <div key={k} style={{ position: "absolute", left: px, top: py - s / 2, width: s, height: s, borderRadius: "50% 50% 50% 20%", background: t < 0.4 ? "#FFF0B0" : t < 0.72 ? "#F79433" : S4RED, opacity: (1 - t) * 0.95, boxShadow: `0 0 12px ${t < 0.5 ? "#FFC24A" : S4RED}`, transform: `rotate(${(seed(k) - 0.5) * 40}deg)` }} />;
      })}
      <div style={{ position: "absolute", left: 0, top: 44, width: 34, height: 32, borderRadius: 5, background: "linear-gradient(180deg,#5A6270,#262B36)", border: "2px solid #12151C" }} />
    </div>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const sx = S4SX;
  // per-input edge-case bombs
  const launches = S4INPUTS.map((_, i) => fr(0.2) + i * 9);
  const impacts = launches.map((l) => l + 13);

  // ---- rig wobble: decaying kicks from every impact + big weapons + sustained quake ----
  let wob = 0, wrot = 0;
  [...impacts.map((h) => [h, 4] as const), [S4WRECK, 16] as const, [Math.round((S4FLAME0 + S4FLAME1) / 2), 5] as const, [S4BOLT, 14] as const].forEach(([h, big]) => {
    if (lf >= h) { const d = lf - h; const e = Math.sin(d * 0.85) * Math.exp(-d / 7); wob += e * big; wrot += e * big * 0.08; }
  });
  // sustained earthquake tremor
  let quake = 0, qrot = 0;
  if (lf >= S4QUAKE0 && lf <= S4QUAKE1 + 8) {
    const env = ramp(lf, S4QUAKE0, S4QUAKE0 + 6) * (1 - ramp(lf, S4QUAKE1, S4QUAKE1 + 8));
    quake = Math.sin(lf * 1.7) * 9 * env;
    qrot = Math.sin(lf * 1.35) * 1.3 * env;
  }
  const shakeX = wob + quake, shakeR = wrot + qrot;

  const passed = Math.min(14, Math.round(ramp(lf, fr(0.2), fr(5.0)) * 14));
  const win = over(lf, fr(5.06), fr(0.5), Easing.out(Easing.back(1.6)));
  const cheer = ramp(lf, fr(4.86), fr(5.4));

  // ---- wrecking ball pendulum ----
  const ax = sx - 30, ay = 26, len = 300;
  const wt = Math.max(0, Math.min(1, (lf - fr(2.02)) / fr(0.9)));
  const ang = -66 * Math.cos(wt * Math.PI);
  const wreckOn = lf >= fr(2.02) && lf <= fr(3.2);
  const wreckFade = wreckOn ? Math.min(1, ramp(lf, fr(2.02), fr(2.3)) - ramp(lf, fr(3.0), fr(3.2))) : 0;
  const bx = ax + Math.sin((ang * Math.PI) / 180) * len;
  const by = ay + Math.cos((ang * Math.PI) / 180) * len;

  // ---- flamethrower window ----
  const flameOn = Math.min(1, ramp(lf, S4FLAME0, S4FLAME0 + 4) - ramp(lf, S4FLAME1 - 4, S4FLAME1));

  // ---- lightning zap ----
  const boltLife = lf - S4BOLT;
  const boltOn = boltLife >= 0 && boltLife <= 9;
  const boltFlash = boltOn ? Math.max(0, 1 - boltLife / 6) : 0;
  const boltSeg = (() => {
    if (!boltOn) return "";
    const tipX = sx + 4, tipY = 250, startX = sx - 40, startY = 44;
    let d = `M ${startX} ${startY}`;
    for (let s = 1; s <= 6; s++) { const t = s / 6; const jx = (seed(s + Math.floor(lf / 2)) - 0.5) * 46; d += ` L ${startX + (tipX - startX) * t + jx} ${startY + (tipY - startY) * t}`; }
    return d;
  })();

  // big-attack CAUGHT badges (wreck, flame, quake, lightning)
  const bigCatch = [[S4WRECK + 5, sx + 96, 316], [S4FLAME1 - 6, sx - 132, 356], [S4QUAKE1 - 4, sx, 470], [S4BOLT + 5, sx + 20, 250]] as const;

  // hazard chevron scroll
  const chev = -(lf * 2) % 56;

  return (
    <>
      {/* ================= BACKDROP: warm plum QA torture-chamber wall ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(176deg, #2C1524 0%, #201122 46%, #160C18 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 94% 82% at 58% 40%, ${S4RED}33, transparent 74%)` }} />
      {/* riveted steel wall panels */}
      {[0, 1, 2, 3].map((r) => (
        <div key={`wp${r}`} style={{ position: "absolute", left: -10, right: -10, top: 40 + r * 130, height: 118, borderRadius: 6, background: "linear-gradient(180deg, rgba(74,52,68,0.32), rgba(30,20,32,0.30))", border: "2px solid rgba(122,92,112,0.18)", zIndex: 1 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <div key={k} style={{ position: "absolute", left: 30 + k * 118, top: 10, width: 7, height: 7, borderRadius: "50%", background: "rgba(150,120,140,0.35)", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)" }} />)}
        </div>
      ))}
      {/* soot scorch marks on the wall */}
      {[[210, 150, 150], [700, 300, 200], [480, 470, 240]].map(([bxp, byp, rr], i) => <div key={`sc${i}`} style={{ position: "absolute", left: bxp - rr / 2, top: byp - rr / 2, width: rr, height: rr, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,4,10,0.5), transparent 66%)", zIndex: 2, pointerEvents: "none" }} />)}

      {/* DANGER banner across the top */}
      <div style={{ position: "absolute", left: -20, right: -20, top: 18, height: 42, background: "repeating-linear-gradient(45deg, #E0A94A 0 24px, #1A1016 24px 48px)", boxShadow: "0 6px 16px -6px rgba(0,0,0,0.6)", zIndex: 6, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: 6, color: "#fff", background: S4RED, padding: "3px 26px", borderRadius: 6, border: "2px solid #fff", boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>⚠ TORTURE BAY ⚠</span>
      </div>

      {/* corner warning beacons on the rig posts */}
      <S4Beacon lf={lf} x={sx - 168} y={214} c={S4RED} ph={0} />
      <S4Beacon lf={lf} x={sx + 168} y={214} c="#E0A94A" ph={140} />

      {/* studio key light down onto the crash zone */}
      <SpotCone x={sx} top={60} topW={90} botW={520} h={580} color={`${S4RED}22`} sway={3} lf={lf} />

      {/* ================= FLOOR + crash rail + hazard chevrons ================= */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 176, background: "linear-gradient(180deg,#261322,#0D0714)", clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 150, height: 16, borderRadius: 8, zIndex: 4, overflow: "hidden", opacity: 0.6, border: "1px solid rgba(224,169,74,0.3)" }}>
        <div style={{ position: "absolute", inset: -4, left: chev, background: "repeating-linear-gradient(115deg, #E0A94A 0 16px, #1E1018 16px 32px)" }} />
      </div>
      {/* ground crack that flashes during the earthquake */}
      {quake !== 0 && (
        <svg viewBox="0 0 1012 200" width={1012} height={200} style={{ position: "absolute", left: 0, bottom: 40, overflow: "visible", zIndex: 4, opacity: Math.min(1, Math.abs(quake) / 4) }}>
          <polyline points={`${sx - 180},96 ${sx - 90},72 ${sx - 20},104 ${sx + 70},70 ${sx + 170},100`} fill="none" stroke="#0A0510" strokeWidth={7} strokeLinecap="round" />
          <polyline points={`${sx - 180},96 ${sx - 90},72 ${sx - 20},104 ${sx + 70},70 ${sx + 170},100`} fill="none" stroke={S4RED} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        </svg>
      )}

      {/* ================= THE RIG: steel posts + straps ================= */}
      {[sx - 120, sx + 112].map((px, i) => (
        <div key={`post${i}`} style={{ position: "absolute", left: px, top: 210, width: 16, height: 360, borderRadius: 5, background: "linear-gradient(180deg,#8A93A2,#3A404E)", border: "2px solid #1A1E28", zIndex: 12, boxShadow: "0 8px 16px -8px rgba(0,0,0,0.6)", transform: `translateX(${shakeX * 0.4}px)` }}>
          {[0, 1, 2, 3].map((b) => <div key={b} style={{ position: "absolute", left: -3, top: 30 + b * 90, width: 22, height: 8, borderRadius: 2, background: "#20242E" }} />)}
        </div>
      ))}

      {/* ================= THE CODER'S BUILD (strapped in, under assault) ================= */}
      <div style={{ position: "absolute", left: sx - 100, top: 250, width: 200, height: 320, zIndex: 14, transform: `translateX(${shakeX}px) rotate(${shakeR}deg)`, transformOrigin: "50% 100%" }}>
        {/* roof + flag */}
        <div style={{ position: "absolute", left: 30, top: 0, width: 0, height: 0, borderLeft: "70px solid transparent", borderRight: "70px solid transparent", borderBottom: `44px solid ${S4AMBER}`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.45))" }} />
        <div style={{ position: "absolute", left: 96, top: -30, width: 4, height: 34, background: "#fff" }} />
        <div style={{ position: "absolute", left: 100, top: -30, width: 30, height: 20, background: S4GREEN, borderRadius: 2, transform: `skewX(${Math.sin(lf / 8) * 6}deg)` }} />
        {/* three code slabs */}
        {[44, 130, 216].map((ty, r) => (
          <div key={r} style={{ position: "absolute", left: 14, top: ty, width: 172, height: 76, borderRadius: 9, background: grad("#3A5C84", "#233A57"), border: "2.5px solid rgba(150,185,230,0.5)", boxShadow: "0 8px 18px -8px rgba(0,0,0,0.6), inset 0 2px 0 rgba(210,230,255,0.12)" }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 16, top: 14 + k * 18, height: 6, borderRadius: 3, width: [96, 132, 74][(r + k) % 3], background: [S4AMBER, "#7FB0E6", "#9FE0C4"][(r + k) % 3], opacity: 0.9 }} />)}
            <div style={{ position: "absolute", right: 14, top: 12, width: 12, height: 12, borderRadius: "50%", background: "#FFE9A0", boxShadow: "0 0 10px rgba(255,233,160,0.8)" }} />
          </div>
        ))}
        {/* plinth */}
        <div style={{ position: "absolute", left: 6, top: 300, width: 188, height: 26, borderRadius: 6, background: "linear-gradient(180deg,#1A2636,#0E1622)", border: "2px solid rgba(150,185,230,0.35)" }} />
        {/* ratchet straps */}
        {[96, 250].map((ty, i) => (
          <div key={`str${i}`} style={{ position: "absolute", left: -22, top: ty, width: 244, height: 12, background: "repeating-linear-gradient(90deg, #E0A94A 0 10px, #B8801F 10px 20px)", border: "1.5px solid rgba(0,0,0,0.3)", borderRadius: 2, zIndex: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: 104, top: -3, width: 26, height: 18, borderRadius: 3, background: "#4A4048", border: "2px solid #20242E" }} />
          </div>
        ))}
        {/* cracks that flash on impact then get sealed */}
        {S4SITES.map(([cxp, cyp], i) => {
          const crackA = lf >= impacts[i] ? Math.max(0, 1 - (lf - impacts[i]) / 20) : 0;
          if (crackA < 0.02) return null;
          return (
            <svg key={`cr${i}`} viewBox="0 0 60 60" width={60} height={60} style={{ position: "absolute", left: cxp - 30, top: cyp - 30, overflow: "visible", opacity: crackA, zIndex: 9 }}>
              <polyline points="30,8 24,24 34,30 26,44 32,54" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
              <polyline points="30,8 24,24 34,30 26,44 32,54" fill="none" stroke={S4RED} strokeWidth={1.4} strokeLinecap="round" />
              <polyline points="24,24 12,20 M34,30 48,34" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            </svg>
          );
        })}
        {/* green TEST check sealing each site */}
        {S4SITES.map(([cxp, cyp], i) => {
          const s = Math.min(1.08, spr(lf, impacts[i] + 7, 10, 220));
          if (s < 0.02) return null;
          return <div key={`ck${i}`} style={{ position: "absolute", left: cxp - 17, top: cyp - 17, width: 34, height: 34, borderRadius: "50%", background: S4GREEN, border: "3px solid #fff", boxShadow: `0 0 16px ${S4GREEN}cc`, transform: `scale(${s})`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 11, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#fff" }}>✓</div>;
        })}
      </div>

      {/* ================= WRECKING BALL ================= */}
      {wreckFade > 0.01 && (
        <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: 20, opacity: wreckFade, pointerEvents: "none" }}>
          <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#5A6270" strokeWidth={6} strokeDasharray="10 6" />
          <circle cx={ax} cy={ay} r={10} fill="#3A4152" stroke="#5A6270" strokeWidth={3} />
          <circle cx={bx} cy={by} r={40} fill="url(#s4ball)" stroke="#12151C" strokeWidth={4} />
          {[0, 1, 2, 3].map((k) => { const sa = (k / 4) * Math.PI * 2; return <circle key={k} cx={bx + Math.cos(sa) * 24} cy={by + Math.sin(sa) * 24} r={5} fill="#1A1E28" />; })}
          <circle cx={bx - 13} cy={by - 14} r={11} fill="rgba(255,255,255,0.32)" />
          <defs><radialGradient id="s4ball" cx="38%" cy="32%"><stop offset="0%" stopColor="#6C7686" /><stop offset="100%" stopColor="#232833" /></radialGradient></defs>
        </svg>
      )}

      {/* ================= FLAMETHROWER ================= */}
      <S4Flame lf={lf} ox={330} oy={402} len={230} on={flameOn} />

      {/* ================= LIGHTNING ZAP ================= */}
      {boltOn && (
        <>
          <div style={{ position: "absolute", inset: 0, background: "#EAF4FF", opacity: boltFlash * 0.5, zIndex: 26, pointerEvents: "none" }} />
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: 29, pointerEvents: "none" }}>
            <path d={boltSeg} fill="none" stroke="#EAF4FF" strokeWidth={11} strokeLinejoin="round" strokeLinecap="round" opacity={boltFlash} style={{ filter: "blur(3px)" }} />
            <path d={boltSeg} fill="none" stroke="#fff" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" opacity={boltFlash} />
            <path d={boltSeg} fill="none" stroke={SKY} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" opacity={boltFlash} />
          </svg>
        </>
      )}

      {/* ================= FLYING EDGE-CASE BOMBS ================= */}
      {S4INPUTS.map((inp, i) => {
        const l = launches[i];
        const fl = ramp(lf, l, l + 13);
        if (fl <= 0.01 || fl >= 1) return null;
        const ox = 328, oy = 388;
        const [txl, tyl] = S4SITES[i];
        const tgx = sx - 100 + txl, tgy = 250 + tyl;
        const cxp = interpolate(fl, [0, 1], [ox, tgx]);
        const cyp = interpolate(fl, [0, 1], [oy, tgy]) - Math.sin(fl * Math.PI) * 108;
        const rot = (seed(i) - 0.5) * 40 + fl * 130;
        return (
          <div key={`in${i}`} style={{ position: "absolute", left: cxp - 46, top: cyp - 26, transform: `rotate(${rot}deg) scale(${0.8 + fl * 0.3})`, zIndex: 24 }}>
            <div style={{ position: "absolute", left: "50%", top: -12, width: 3, height: 12, background: "#8A5A2A" }} />
            <div style={{ position: "absolute", left: "50%", top: -16, width: 7, height: 7, marginLeft: -3, borderRadius: "50%", background: "#FFD24A", boxShadow: "0 0 10px #FFB03A", opacity: 0.6 + Math.abs(Math.sin(lf / 3 + i)) * 0.4 }} />
            <div style={{ padding: "8px 16px", borderRadius: 12, background: grad("#E0556B", "#A82C42"), border: "3px solid #fff", boxShadow: `0 10px 22px -8px rgba(0,0,0,0.55), 0 0 18px ${S4RED}88`, fontFamily: mono, fontWeight: 800, fontSize: 24, color: "#fff", whiteSpace: "nowrap" }}>{inp}</div>
            <div style={{ position: "absolute", left: 4, top: -20, padding: "2px 8px", borderRadius: 6, background: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, letterSpacing: 0.5, color: S4RED, whiteSpace: "nowrap" }}>{i % 2 ? "BUG?" : "EDGE CASE"}</div>
          </div>
        );
      })}

      {/* ================= EXPLOSIONS ================= */}
      {S4SITES.map(([cxp, cyp], i) => <S4Blast key={`bl${i}`} lf={lf} at={impacts[i]} x={sx - 100 + cxp} y={250 + cyp} big={0.8} />)}
      <S4Blast lf={lf} at={S4WRECK} x={sx + 8} y={340} big={2.1} />
      <S4Blast lf={lf} at={S4FLAME1 - 6} x={sx - 60} y={356} big={1.5} />
      <S4Blast lf={lf} at={S4BOLT} x={sx + 4} y={256} big={2.0} />
      <Embers lf={lf} n={16} w={540} base={560} />

      {/* ================= BLAST SHIELD (tester crouches behind) ================= */}
      <div style={{ position: "absolute", left: 58, bottom: 128, width: 306, height: 196, borderRadius: 16, zIndex: 25, background: "linear-gradient(150deg, rgba(150,200,235,0.18), rgba(90,150,200,0.10))", border: "3px solid rgba(170,210,240,0.45)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), 0 12px 26px -10px rgba(0,0,0,0.5)", overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 30, top: 20, width: 120, height: 3, background: "rgba(255,255,255,0.22)", transform: "rotate(-18deg)" }} />
        <div style={{ position: "absolute", left: 120, top: 96, width: 90, height: 2, background: "rgba(255,255,255,0.18)", transform: "rotate(-18deg)" }} />
        <div style={{ position: "absolute", top: -10, width: 46, height: 226, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)", transform: "skewX(-16deg)", left: `${((lf * 3) % 380) - 60}px` }} />
      </div>
      <div style={{ position: "absolute", left: 70, bottom: 308, zIndex: 32, padding: "3px 10px", borderRadius: 6, background: "rgba(20,14,20,0.8)", border: "1.5px solid rgba(170,210,240,0.5)", fontFamily: mono, fontSize: 12, letterSpacing: 1, color: "#AEE0F0" }}>BLAST SHIELD</div>

      {/* ================= THE TESTER · demolitions QA ================= */}
      <div style={{ position: "absolute", left: 92, bottom: 150, width: 236, zIndex: 26, filter: `drop-shadow(0 0 14px ${S4RED}99)`, transform: `translateX(${Math.abs(quake) > 0.5 ? Math.sin(lf * 1.7) * 3 : 0}px)` }}>
        <Mascot lf={lf} size={236} tint={S4RED} gaze={7} stern={cheer > 0.4 ? 0 : 0.66} cheer={cheer} nodAmp={3} nodSpeed={9} />
        {/* sooty lab coat lapels */}
        <svg viewBox="0 0 200 200" width={236} height={236} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", zIndex: -1 }}>
          <path d="M62 118 L88 178 L100 130 L112 178 L138 118 Z" fill="#EFECE4" stroke="#C9C3B6" strokeWidth={3} />
          <path d="M100 130 L100 178" stroke="#C9C3B6" strokeWidth={2.5} />
          <circle cx={100} cy={146} r={3} fill="#B8501F" />
          <circle cx={100} cy={160} r={3} fill="#B8501F" />
          {[[78, 150], [120, 158], [92, 168], [112, 140], [72, 132]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={2.4 + seed(i) * 2} fill="rgba(30,18,24,0.5)" />)}
        </svg>
        {/* big red safety goggles */}
        <svg viewBox="0 0 200 200" width={236} height={236} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
          <path d="M40 92 H160" stroke="#241820" strokeWidth={9} strokeLinecap="round" />
          <path d="M58 92 Q100 78 142 92" fill="none" stroke="#241820" strokeWidth={5} />
          <circle cx={78} cy={95} r={22} fill="rgba(224,85,107,0.55)" stroke="#241820" strokeWidth={6} />
          <circle cx={122} cy={95} r={22} fill="rgba(224,85,107,0.55)" stroke="#241820" strokeWidth={6} />
          <rect x={96} y={90} width={8} height={10} rx={3} fill="#241820" />
          <ellipse cx={71} cy={88} rx={7} ry={9} fill="rgba(255,255,255,0.6)" />
          <ellipse cx={115} cy={88} rx={7} ry={9} fill="rgba(255,255,255,0.6)" />
        </svg>
        {/* demolition glove + giant swinging wrench (before payoff) */}
        {cheer < 0.5 ? (
          <svg viewBox="0 0 200 200" width={236} height={236} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", transform: `rotate(${-22 + Math.sin(lf / 5) * 30}deg)`, transformOrigin: "150px 152px" }}>
            {/* chunky glove */}
            <circle cx={150} cy={150} r={17} fill="#2A2029" stroke="#12151C" strokeWidth={3} />
            <circle cx={150} cy={150} r={9} fill="#4A3C46" />
            {/* wrench shaft + head */}
            <rect x={146} y={64} width={11} height={88} rx={5} fill="url(#s4wr)" stroke="#12151C" strokeWidth={2.5} />
            <path d="M138 60 a16 16 0 1 1 26 0 l-6 8 l-6 -6 l-2 12 l-8 -12 z" fill="url(#s4wr)" stroke="#12151C" strokeWidth={2.5} />
            <defs><linearGradient id="s4wr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9AA3B2" /><stop offset="100%" stopColor="#464E5C" /></linearGradient></defs>
          </svg>
        ) : (
          <svg viewBox="0 0 200 200" width={236} height={236} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
            <circle cx={150} cy={126} r={16} fill="#2A2029" stroke="#12151C" strokeWidth={3} />
            <rect x={143} y={100} width={14} height={26} rx={5} fill="#2A2029" stroke="#12151C" strokeWidth={2.5} />
          </svg>
        )}
      </div>

      {/* name tag */}
      <div style={{ position: "absolute", left: 210, top: 648, transform: `translateX(-50%) scale(${Math.min(1.06, spr(lf, fr(0.5), 11, 210))})`, zIndex: 32 }}>
        <span style={{ display: "inline-block", padding: "7px 22px", borderRadius: 999, background: "#fff", border: `3px solid ${S4RED}`, boxShadow: "0 12px 26px -8px rgba(0,0,0,0.5)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: INK, whiteSpace: "nowrap" }}>The Tester</span>
      </div>

      {/* ================= HUD: tests-passing counter + pips ================= */}
      <div style={{ position: "absolute", left: sx - 128, top: 72, width: 256, zIndex: 34, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 18px", borderRadius: 14, background: "rgba(16,10,18,0.86)", border: `2px solid ${S4GREEN}`, boxShadow: `0 0 22px ${S4GREEN}55` }}>
          <span style={{ fontFamily: mono, fontSize: 17, color: "rgba(180,235,205,0.8)", letterSpacing: 1 }}>TESTS</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff" }}>{passed}</span>
          <span style={{ fontFamily: mono, fontSize: 18, color: "rgba(180,235,205,0.6)" }}>/ 14</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: passed >= 14 ? S4GREEN : S4RED }}>{passed >= 14 ? "PASS" : "…"}</span>
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
          {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: i < passed ? S4GREEN : "rgba(255,255,255,0.14)", border: i < passed ? "none" : "1.5px solid rgba(255,255,255,0.25)", boxShadow: i < passed ? `0 0 8px ${S4GREEN}` : "none", transform: `scale(${i === passed - 1 ? Math.min(1.35, spr(lf, fr(0.2) + i * 5, 9, 240)) * 0.35 + 1 : 1})` }} />)}
        </div>
      </div>

      {/* named edge-case rows flipping red X -> green check */}
      <div style={{ position: "absolute", right: 34, top: 244, width: 180, zIndex: 30, display: "flex", flexDirection: "column", gap: 7 }}>
        {S4INPUTS.map((inp, i) => {
          const ap = over(lf, fr(0.3) + i * 4, fr(0.4));
          const pass = lf >= impacts[i] + 7;
          return (
            <div key={`row${i}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 9, background: "rgba(16,10,18,0.78)", border: `1.5px solid ${pass ? S4GREEN : "rgba(224,85,107,0.55)"}`, opacity: ap, transform: `translateX(${(1 - ap) * 30}px)`, boxShadow: pass ? `0 0 12px ${S4GREEN}44` : "none" }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: pass ? S4GREEN : S4RED, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13, color: "#fff", flexShrink: 0 }}>{pass ? "✓" : "✕"}</span>
              <span style={{ fontFamily: mono, fontSize: 15, color: pass ? "#B9F0D4" : "rgba(255,210,215,0.9)", whiteSpace: "nowrap" }}>{inp}</span>
            </div>
          );
        })}
      </div>

      {/* CAUGHT badges on the big attacks (wreck / flame / quake / lightning) */}
      {bigCatch.map(([at, bxp, byp], i) => {
        const s = spr(lf, at, 10, 230);
        const life = lf - at;
        if (s < 0.02 || life > 32) return null;
        const fade = Math.max(0, 1 - Math.max(0, life - 22) / 10);
        return (
          <div key={`cg${i}`} style={{ position: "absolute", left: bxp, top: byp, transform: `translate(-50%,-50%) scale(${Math.min(1.1, s)}) rotate(-7deg)`, zIndex: 35, opacity: fade, pointerEvents: "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: S4GREEN, border: "3px solid #fff", boxShadow: `0 8px 20px -6px rgba(0,0,0,0.6), 0 0 18px ${S4GREEN}aa`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#fff", whiteSpace: "nowrap" }}>✓ CAUGHT</div>
          </div>
        );
      })}

      {/* early red tag */}
      {lf < fr(5.0) && <Stamp x={sx} y={648} s={Math.min(1.06, spr(lf, fr(0.2), 10, 210))} text="TRIES TO BREAK IT" c={S4RED} rot={-4} />}

      {/* payoff · IT HOLDS */}
      {win > 0.02 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 468, textAlign: "center", zIndex: 40, transform: `scale(${win})` }}>
          <span style={{ display: "inline-block", padding: "10px 26px", borderRadius: 16, background: S4GREEN, border: "4px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#fff", boxShadow: `0 16px 34px -10px rgba(0,0,0,0.6), 0 0 30px ${S4GREEN}aa`, transform: "rotate(-3deg)", whiteSpace: "nowrap" }}>14/14 · IT HOLDS</span>
        </div>
      )}

      {win > 0.1 && <Confetti lf={lf - fr(5.06)} n={30} colors={[S4GREEN, "#fff", GOLD, "#9FE0C4"]} top={140} h={520} />}
      <Sparkles lf={lf} at={5.16} x={sx} y={360} n={18} spread={300} colors={[S4GREEN, "#fff", GOLD]} dur={1.0} />
    </>
  );
};

// ============================== S5 · THE REVIEWER — the read-only bouncer gate ==============================
const S5_GRN = "#3FAE82";
const S5_GRND = "#2E8763";
const S5_RED = "#E0556B";
const S5_REDD = "#8E2233";
const S5_ROPE = "#B8202E";
const S5_ROPED = "#7E1420";
const S5_VELV = "#9A1B28";
const S5_NEON = "#5AA0DE";
const S5_PLUM = "#2A2140";
const S5_PLUMD = "#170F28";
const S5_GOLD = "#E7B24C";
const S5_SUIT = "#17131E";
const S5_SUITL = "#241D2E";

// velvet-rope catenary path
const S5_rope = (x1, y1, x2, y2, sag) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
};

// waiting-in-line commit silhouette
const S5_QueueHead = ({ x, y, s, c, lf, ph }) => {
  const sway = bob(lf, 3, 42, ph);
  return (
    <div style={{ position: "absolute", left: x - 24 * s, top: y - 66 * s, width: 48 * s, height: 96 * s, transform: `translateX(${sway}px)` }}>
      <svg width={48 * s} height={96 * s} viewBox="0 0 48 96">
        <ellipse cx="24" cy="90" rx="19" ry="5" fill="#08060F" opacity="0.55" />
        <path d="M7 96 Q7 52 24 52 Q41 52 41 96 Z" fill={c} />
        <circle cx="24" cy="38" r="16" fill={c} />
        <circle cx="24" cy="35" r="16" fill="#000" opacity="0.2" />
        <rect x="14" y="30" width="20" height="6" rx="3" fill="#0A0A10" opacity="0.8" />
      </svg>
    </div>
  );
};

// THE REVIEWER — clay mascot recolored green + hand-drawn bouncer costume, hands clasped behind back
const S5_Bouncer = ({ lf, size, shock, look, palmRaise }) => {
  const gaze = (look - 0.5) * 1.0 - shock * 0.4;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* clasped hands BEHIND the back (rendered first, under the body) */}
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <rect x="82" y="136" width="36" height="12" rx="4" fill={S5_SUIT} />
        <ellipse cx="94" cy="151" rx="13" ry="11" fill={S5_GRND} />
        <ellipse cx="108" cy="151" rx="13" ry="11" fill={S5_GRN} />
        <ellipse cx="101" cy="149" rx="6" ry="5" fill="rgba(255,255,255,0.14)" />
      </svg>

      {/* the mascot body, tinted reviewer-green (no built-in costume — we draw it) */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Mascot lf={lf} size={size} gaze={gaze} nodAmp={0} nodSpeed={2} shock={shock} stern={0} tint={S5_GRN} />
      </div>

      {/* hand-drawn signature costume, aligned to the mascot's 0..200 viewBox */}
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {/* black suit jacket over torso */}
        <rect x="34" y="104" width="132" height="50" fill={S5_SUIT} />
        <rect x="34" y="104" width="132" height="5" fill="rgba(255,255,255,0.06)" />
        {/* lapels */}
        <polygon points="40,104 100,104 76,154 40,154" fill={S5_SUITL} />
        <polygon points="160,104 100,104 124,154 160,154" fill={S5_SUITL} />
        {/* crisp shirt + collar */}
        <rect x="92" y="104" width="16" height="50" fill="#ECE7DD" />
        <polygon points="92,104 100,118 100,104" fill="#D6D0C4" />
        <polygon points="108,104 100,118 100,104" fill="#C9C3B6" />
        {/* black tie */}
        <polygon points="95,113 100,106 105,113" fill="#2A2433" />
        <rect x="96" y="113" width="8" height="41" fill="#2A2433" />
        <rect x="96" y="113" width="3" height="41" fill="rgba(255,255,255,0.08)" />
        {/* SECURITY badge (gold shield + star) */}
        <path d="M46 114 h18 v11 q0 9 -9 13 q-9 -4 -9 -13 z" fill={S5_GOLD} stroke="#9A7020" strokeWidth="2" />
        <circle cx="55" cy="123" r="3.4" fill="#7A5A1C" />
        {/* black suit sleeves covering the arms (hands are behind the back) */}
        <rect x="2" y="84" width="32" height="42" rx="8" fill={S5_SUIT} />
        <rect x="166" y="84" width="32" height="42" rx="8" fill={S5_SUIT} />
        <rect x="2" y="84" width="10" height="42" rx="6" fill="rgba(255,255,255,0.05)" />
        {/* READ-ONLY cuff/armband on the left sleeve */}
        <g transform="rotate(-8 18 108)">
          <rect x="0" y="100" width="34" height="16" rx="4" fill="#0E2A1A" stroke={S5_GRN} strokeWidth="2" />
          <text x="17" y="111" fontFamily={mono} fontSize="8" fontWeight="800" fill={S5_GRN} textAnchor="middle" letterSpacing="0.3">READ-ONLY</text>
        </g>
        {/* stern brows (above the shades) */}
        <rect x="58" y="57" width="30" height="6" rx="3" fill="#0C0A10" transform="rotate(9 73 60)" />
        <rect x="112" y="57" width="30" height="6" rx="3" fill="#0C0A10" transform="rotate(-9 127 60)" />
        {/* dark sunglasses */}
        <rect x="34" y="70" width="28" height="5" rx="2" fill="#0A0A10" />
        <rect x="140" y="70" width="28" height="5" rx="2" fill="#0A0A10" />
        <rect x="90" y="72" width="20" height="6" rx="3" fill="#0A0A10" />
        <rect x="56" y="65" width="38" height="25" rx="9" fill="#0A0A10" stroke="#000" strokeWidth="1.5" />
        <rect x="106" y="65" width="38" height="25" rx="9" fill="#0A0A10" stroke="#000" strokeWidth="1.5" />
        {/* lens reflections */}
        <polygon points="62,70 78,68 70,84 60,84" fill="rgba(90,160,222,0.45)" />
        <polygon points="112,70 128,68 120,84 110,84" fill="rgba(90,160,222,0.45)" />
        <circle cx="86" cy="72" r="2.2" fill="#EAF3FF" />
        <circle cx="136" cy="72" r="2.2" fill="#EAF3FF" />
        {/* coiled earpiece */}
        <circle cx="169" cy="80" r="6.5" fill="#DAD5C9" stroke="#9A968B" strokeWidth="1.5" />
        <circle cx="169" cy="80" r="2.4" fill={S5_GRN} />
        <path d="M167 86 q-3 7 -9 9 q7 2 4 10 q-3 6 -8 9" stroke="#C7C2B6" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </svg>

      {/* the giant READ-ONLY STOP palm (thrown up in beat 2) */}
      {palmRaise > 0.02 && (
        <div style={{ position: "absolute", left: size * 0.72, top: -size * 0.02, width: size * 0.62, height: size * 0.7, opacity: Math.min(1, palmRaise * 1.4), transform: `translateX(${interpolate(palmRaise, [0, 1], [-26, 8])}px) scale(${0.6 + palmRaise * 0.45}) rotate(-4deg)`, transformOrigin: "10% 90%" }}>
          <svg width="100%" height="100%" viewBox="0 0 130 150" style={{ overflow: "visible" }}>
            {/* motion arcs */}
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${8 - i * 8} ${40 + i * 22} q -14 22 0 44`} stroke={S5_GRN} strokeWidth="4" fill="none" opacity={0.5 - i * 0.13} strokeLinecap="round" />
            ))}
            {/* palm */}
            <rect x="26" y="52" width="74" height="86" rx="28" fill={S5_GRN} stroke={S5_GRND} strokeWidth="4" />
            <rect x="34" y="60" width="20" height="60" rx="10" fill="rgba(255,255,255,0.14)" />
            {/* fingers */}
            {[0, 1, 2, 3].map((f) => (
              <rect key={f} x={28 + f * 18} y={f === 1 || f === 2 ? 6 : 14} width="15" height={f === 1 || f === 2 ? 56 : 48} rx="8" fill={S5_GRN} stroke={S5_GRND} strokeWidth="3.5" />
            ))}
            {/* thumb */}
            <rect x="8" y="74" width="34" height="17" rx="9" fill={S5_GRN} stroke={S5_GRND} strokeWidth="3.5" transform="rotate(-24 25 82)" />
          </svg>
        </div>
      )}
    </div>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------------- TIMELINE (313f) ----------------
  // BEAT 1  (0-150): good commit -> scan vs THE LIST (✓✓✓) -> unclip rope -> APPROVED slam -> struts into vault "MERGED"
  // BEAT 2  (150-313): sketchy bug-monster sneaks up -> STOP palm -> REJECTED slam -> bounced to the curb -> THE GATE payoff

  // ambient neon flicker + climax door glow
  const neonFlick = 0.8 + 0.2 * Math.abs(Math.sin(lf * 0.55)) * (seed(Math.floor(lf / 5)) > 0.14 ? 1 : 0.45);
  const doorGlow = 0.42 + 0.34 * ramp(lf, 96, 140) + 0.24 * ramp(lf, 262, 300);
  const look = 0.5 + 0.5 * Math.sin(lf * 0.09);

  // ---- BEAT 1 : the good commit ----
  const gIn = over(lf, 0, 34, Easing.out(Easing.cubic));
  const gApproved = lf > 60;
  const gStamp = spr(lf, 60, 11, 170);
  const ropeUnclip = over(lf, 66, 24, Easing.inOut(Easing.cubic));
  const gExit = over(lf, 84, 52, Easing.inOut(Easing.cubic));      // walks into the vault
  const gX = interpolate(gIn, [0, 1], [896, 704]) + interpolate(gExit, [0, 1], [0, -206]);
  const gY = interpolate(gExit, [0, 1], [0, -96]);
  const gScale = 1 - gExit * 0.52;
  const gFade = 1 - over(lf, 120, 18);
  const gOpacity = lf < 140 ? Math.max(0, gFade) : 0;
  const merged = lf > 122 && lf < 300;
  const mergedPop = spr(lf, 124, 12, 150);

  // ---- BEAT 2 : the bad commit ----
  const bIn = over(lf, 150, 46, Easing.out(Easing.cubic));
  const bShift = bob(lf, 6, 13, 0) * ramp(lf, 150, 196);
  const bReject = lf > 198;
  const bStamp = spr(lf, 198, 10, 170);
  const bBounce = over(lf, 206, 30, Easing.in(Easing.back(2)));    // tossed to the curb
  const bX = interpolate(bIn, [0, 1], [1090, 706]) + interpolate(bBounce, [0, 1], [0, 486]);
  const bY = interpolate(bBounce, [0, 1], [0, 44]);
  const bTilt = interpolate(bBounce, [0, 1], [-5, 34]) + bShift * 0.5;
  const bOpacity = lf < 198 ? Math.max(0.05, bIn) : Math.max(0, 1 - over(lf, 232, 18));

  // reviewer reactions + palm
  const palmRaise = over(lf, 190, 12, Easing.out(Easing.cubic)) * (1 - over(lf, 240, 20));
  const revShock = bReject ? spr(lf, 198, 9, 170) * 0.45 : 0;

  // clipboard highlight windows
  const showGood = lf >= 22 && lf < 138;
  const showBad = lf >= 184;

  // final payoff label
  const gatePop = spr(lf, 264, 12, 150);

  // bad-commit floating rap sheet
  const S5_SHEET = [
    { t: "TODO", c: S5_GOLD, dx: -58, dy: -30, ph: 0 },
    { t: "console.log", c: S5_RED, dx: 128, dy: -16, ph: 1.1 },
    { t: "SECURITY HOLE", c: "#F4788C", dx: -70, dy: 66, ph: 2.2 },
    { t: "off the plan", c: "#C9C3B6", dx: 132, dy: 74, ph: 3.0 },
  ];

  return (
    <>
      {/* ===================== NIGHT-CITY BACKDROP ===================== */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: `linear-gradient(180deg, ${S5_PLUMD} 0%, ${S5_PLUM} 44%, #241A38 76%, #150F26 100%)` }} />
      {/* distant skyline blocks */}
      {Array.from({ length: 9 }).map((_, i) => {
        const bw = 70 + seed(i * 5) * 60, bh = 120 + seed(i * 7) * 150, bx = -10 + i * 116;
        return <div key={"sky" + i} style={{ position: "absolute", left: bx, top: 240 - bh + 150, width: bw, height: bh, background: `linear-gradient(180deg, #241A38, #1A1230)`, borderRadius: 4, opacity: 0.9 }} />;
      })}
      {/* sweeping searchlights */}
      {[0, 1, 2].map((i) => {
        const sw = 220 + i * 170 + Math.sin(lf * 0.03 + i * 2) * 130;
        return <div key={"sl" + i} style={{ position: "absolute", left: sw, top: -40, width: 130, height: 470, background: `linear-gradient(180deg, rgba(231,178,76,0), rgba(231,178,76,0.12))`, transform: `rotate(${-14 + i * 12}deg)`, transformOrigin: "50% 0%", filter: "blur(7px)", opacity: 0.7 }} />;
      })}
      {/* club facade */}
      <div style={{ position: "absolute", left: 36, top: 150, width: 940, height: 476, background: `linear-gradient(180deg, #3A2A48, #291E3A)`, borderRadius: 12, boxShadow: "inset 0 8px 34px rgba(0,0,0,0.45)" }} />
      {/* lit facade windows */}
      {Array.from({ length: 18 }).map((_, i) => {
        const col = i % 6, row = Math.floor(i / 6);
        const lit = seed(i * 3 + 1) > 0.44;
        const flick = lit ? 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.05 + i)) : 0.08;
        return <div key={"win" + i} style={{ position: "absolute", left: 92 + col * 150, top: 178 + row * 92, width: 72, height: 56, background: S5_GOLD, opacity: 0.1 + flick * 0.24, borderRadius: 5, boxShadow: `0 0 16px rgba(231,178,76,${flick * 0.32})` }} />;
      })}

      {/* ===================== THE VAULT / CLUB DOOR ("YOUR REAL PROJECT") ===================== */}
      {/* striped awning */}
      <div style={{ position: "absolute", left: 336, top: 196, width: 340, height: 42, background: `repeating-linear-gradient(90deg, ${S5_ROPED} 0 26px, ${S5_ROPE} 26px 52px)`, borderRadius: "8px 8px 0 0", boxShadow: "0 6px 18px rgba(0,0,0,0.45)" }} />
      {/* heavy vault frame */}
      <div style={{ position: "absolute", left: 366, top: 234, width: 280, height: 392, background: `linear-gradient(180deg, #4A3A62, #2C2140)`, borderRadius: "18px 18px 10px 10px", boxShadow: "0 18px 40px rgba(0,0,0,0.5)" }} />
      {/* doorway recess */}
      <div style={{ position: "absolute", left: 384, top: 250, width: 244, height: 372, background: `linear-gradient(180deg, #1C1330, #100A20)`, borderRadius: "14px 14px 8px 8px", boxShadow: "inset 0 0 66px rgba(0,0,0,0.75)", border: `4px solid #3B2C50` }} />
      {/* warm interior glow spilling out (grows at climax) */}
      <div style={{ position: "absolute", left: 396, top: 300, width: 220, height: 322, background: `radial-gradient(90% 82% at 50% 42%, rgba(231,178,76,${0.24 + doorGlow * 0.42}), rgba(207,149,68,0.05) 66%, rgba(0,0,0,0) 80%)`, borderRadius: 14 }} />
      {/* dancing interior lights */}
      {Array.from({ length: 8 }).map((_, i) => {
        const bx = 410 + seed(i * 7 + 2) * 176, by = 330 + seed(i * 5 + 3) * 250;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(lf * 0.12 + i * 1.3));
        const cc = [S5_GOLD, S5_NEON, "#C888E0", S5_GRN][i % 4];
        return <div key={"idot" + i} style={{ position: "absolute", left: bx, top: by, width: 12, height: 12, borderRadius: 6, background: cc, opacity: tw * 0.7, filter: "blur(1px)", boxShadow: `0 0 14px ${cc}` }} />;
      })}

      {/* NEON SIGN */}
      <div style={{ position: "absolute", left: 296, top: 128, width: 420, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 31, letterSpacing: 1, color: S5_NEON, textShadow: `0 0 8px ${S5_NEON}, 0 0 22px ${S5_NEON}, 0 0 36px rgba(90,160,222,0.7)`, opacity: neonFlick, textAlign: "center", lineHeight: 1 }}>YOUR REAL PROJECT</div>
      </div>
      <div style={{ position: "absolute", left: 336, top: 190, width: 340, height: 3, background: S5_NEON, opacity: neonFlick, boxShadow: `0 0 10px ${S5_NEON}, 0 0 20px ${S5_NEON}`, borderRadius: 2 }} />

      {/* MERGED plate lights up once the good commit is inside */}
      {merged && (
        <div style={{ position: "absolute", left: 506, top: 340, transform: `translate(-50%,-50%) scale(${Math.min(1.1, mergedPop)})`, zIndex: 30 }}>
          <div style={{ padding: "8px 22px", borderRadius: 12, background: `linear-gradient(180deg, #163C28, #0C2416)`, border: `3px solid ${S5_GRN}`, boxShadow: `0 0 26px rgba(63,174,130,0.7)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#EAFBF2", letterSpacing: 1 }}>MERGED ✓</div>
        </div>
      )}

      {/* red carpet toward the viewer */}
      <div style={{ position: "absolute", left: 386, top: 600, width: 240, height: 192, background: `linear-gradient(180deg, ${S5_ROPE}, ${S5_ROPED})`, clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0% 100%)", boxShadow: "0 -4px 22px rgba(0,0,0,0.35)" }} />
      <div style={{ position: "absolute", left: 398, top: 600, width: 8, height: 192, background: S5_GOLD, opacity: 0.7, transform: "skewX(-7deg)" }} />
      <div style={{ position: "absolute", left: 606, top: 600, width: 8, height: 192, background: S5_GOLD, opacity: 0.7, transform: "skewX(7deg)" }} />

      {/* sidewalk */}
      <div style={{ position: "absolute", left: 0, top: 646, width: 1012, height: 146, background: `linear-gradient(180deg, #211830, #150F1F)` }} />
      <div style={{ position: "absolute", left: 250, top: 650, width: 520, height: 120, background: `radial-gradient(80% 100% at 50% 0%, rgba(231,178,76,${0.09 + doorGlow * 0.14}), rgba(0,0,0,0) 70%)`, filter: "blur(4px)" }} />

      {/* ===================== STANCHIONS + VELVET ROPE ===================== */}
      {[{ x: 300 }, { x: 712 }].map((p, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: p.x - 12, top: 470, width: 24, height: 180, zIndex: 12 }}>
          <div style={{ position: "absolute", left: -8, top: 158, width: 40, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#E7B24C,#9A7020)", boxShadow: "0 6px 10px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 4, top: 20, width: 16, height: 150, borderRadius: 8, background: "linear-gradient(90deg,#F0CB78,#B98A2C,#7A5A1C)" }} />
          <div style={{ position: "absolute", left: -2, top: 0, width: 28, height: 28, borderRadius: 14, background: "radial-gradient(circle at 35% 30%,#FCE7A8,#C9982F)", boxShadow: "0 0 10px rgba(231,178,76,0.6)" }} />
        </div>
      ))}
      <svg style={{ position: "absolute", left: 0, top: 0, zIndex: 11 }} width="1012" height="792" viewBox="0 0 1012 792">
        <path d={S5_rope(304, 496, 708, 496, 58 + interpolate(ropeUnclip, [0, 1], [0, 122]))} stroke={S5_VELV} strokeWidth="14" fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }} transform={ropeUnclip > 0.02 ? `rotate(${interpolate(ropeUnclip, [0, 1], [0, 18])} 708 496)` : undefined} />
        <path d={S5_rope(304, 493, 708, 493, 56 + interpolate(ropeUnclip, [0, 1], [0, 120]))} stroke="#C64653" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="10 8" opacity="0.7" transform={ropeUnclip > 0.02 ? `rotate(${interpolate(ropeUnclip, [0, 1], [0, 18])} 708 496)` : undefined} />
      </svg>

      {/* ===================== THE QUEUE (more commits waiting) ===================== */}
      <S5_QueueHead x={196} y={648} s={1.18} c="#4C6EF5" lf={lf} ph={0} />
      <S5_QueueHead x={130} y={656} s={1.02} c="#E0843A" lf={lf} ph={1.4} />
      <S5_QueueHead x={72} y={662} s={0.9} c="#8A6BC8" lf={lf} ph={2.7} />
      <S5_QueueHead x={24} y={666} s={0.8} c="#3FAE82" lf={lf} ph={3.6} />

      {/* ===================== THE REVIEWER (BOUNCER) ===================== */}
      <div style={{ position: "absolute", left: 452, top: 296, zIndex: 20 }}>
        <SpotCone x={560} top={-46} topW={72} botW={272} h={440} color="rgba(231,178,76,0.13)" />
        <S5_Bouncer lf={lf} size={218} shock={revShock} look={look} palmRaise={palmRaise} />
      </div>

      {/* ===================== CLIPBOARD · "THE LIST" (= THE PLAN) ===================== */}
      <div style={{ position: "absolute", left: 736, top: 448, width: 214, height: 256, transform: `rotate(-4deg) translateY(${bob(lf, 4, 60, 1)}px)`, zIndex: 22 }}>
        <div style={{ position: "absolute", inset: 0, background: "#E7DCC2", borderRadius: 12, boxShadow: "0 14px 26px rgba(0,0,0,0.45)", border: "3px solid #C7B48A" }} />
        <div style={{ position: "absolute", left: 80, top: -12, width: 54, height: 22, background: "#9A968B", borderRadius: 6, boxShadow: "0 3px 6px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", left: 16, top: 16, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 19, color: INK }}>THE LIST</div>
        <div style={{ position: "absolute", left: 118, top: 22, fontFamily: mono, fontSize: 10, fontWeight: 700, color: S5_GRND }}>= the plan</div>
        <div style={{ position: "absolute", left: 16, top: 44, width: 182, height: 2, background: "#C7B48A" }} />
        {[
          { t: "spec matches", y: 58 },
          { t: "tests pass", y: 96 },
          { t: "no rogue edits", y: 134, badFail: true },
          { t: "on the plan", y: 172, badFail: true },
        ].map((r, i) => {
          const fail = showBad && r.badFail;
          const lit = (showGood && !showBad) || showBad;
          const staggerGood = showGood && !showBad ? lf > 24 + i * 8 : true;
          const on = lit && staggerGood;
          return (
            <div key={"row" + i} style={{ position: "absolute", left: 16, top: r.y, width: 182, height: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: INK, opacity: fail ? 0.95 : 0.85 }}>{r.t}</span>
              <div style={{ width: 25, height: 25, borderRadius: 6, background: fail ? S5_RED : S5_GRN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16, opacity: on ? 1 : 0.22, boxShadow: on ? `0 0 12px ${fail ? S5_RED : S5_GRN}` : "none", transform: `scale(${on ? 1 : 0.82})` }}>
                {fail ? "✗" : "✓"}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================== BEAT 1 · GOOD COMMIT (tidy green package) ===================== */}
      {gOpacity > 0.01 && (
        <div style={{ position: "absolute", left: gX, top: 484 + gY, width: 148, height: 132, opacity: gOpacity, transform: `scale(${gScale})`, transformOrigin: "50% 100%", zIndex: 18 }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, #2E6B52, #1E4B39)`, borderRadius: 16, border: `3px solid ${S5_GRN}`, boxShadow: `0 12px 26px rgba(0,0,0,0.5), 0 0 22px rgba(63,174,130,0.45)` }} />
          {/* dapper bowtie */}
          <div style={{ position: "absolute", left: 74, top: -8, width: 0, height: 0, transform: "translateX(-50%)" }}>
            <div style={{ position: "absolute", left: -20, top: 0, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderRight: `16px solid ${S5_GOLD}` }} />
            <div style={{ position: "absolute", left: 4, top: 0, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: `16px solid ${S5_GOLD}` }} />
            <div style={{ position: "absolute", left: -4, top: -5, width: 8, height: 10, borderRadius: 3, background: "#B98A2C" }} />
          </div>
          {/* happy face */}
          <div style={{ position: "absolute", left: 34, top: 26, width: 16, height: 16, borderRadius: 8, background: "#EAFBF2" }}><div style={{ position: "absolute", left: 5, top: 5, width: 7, height: 7, borderRadius: 4, background: INK }} /></div>
          <div style={{ position: "absolute", left: 92, top: 26, width: 16, height: 16, borderRadius: 8, background: "#EAFBF2" }}><div style={{ position: "absolute", left: 5, top: 5, width: 7, height: 7, borderRadius: 4, background: INK }} /></div>
          <svg style={{ position: "absolute", left: 52, top: 50 }} width="44" height="18" viewBox="0 0 44 18"><path d="M4 4 Q22 20 40 4" stroke="#EAFBF2" strokeWidth="4" fill="none" strokeLinecap="round" /></svg>
          <div style={{ position: "absolute", left: 20, top: 84, fontFamily: mono, fontSize: 12, fontWeight: 800, color: "#BFEBD6" }}>clean diff ✓</div>
          {/* little walking legs */}
          <div style={{ position: "absolute", left: 44, top: 128, width: 14, height: 18, borderRadius: 4, background: S5_GRND, transform: `translateY(${gExit > 0 && gExit < 1 ? bob(lf, 4, 9, 0) : 0}px)` }} />
          <div style={{ position: "absolute", left: 90, top: 128, width: 14, height: 18, borderRadius: 4, background: S5_GRND, transform: `translateY(${gExit > 0 && gExit < 1 ? bob(lf, 4, 9, 1) : 0}px)` }} />
          {/* APPROVED stamp */}
          {gApproved && (
            <div style={{ position: "absolute", left: -30, top: 20, transform: `rotate(-14deg) scale(${gStamp})`, transformOrigin: "50% 50%" }}>
              <Stamp x={92} y={44} s={1.18} text="APPROVED ✓" c={S5_GRN} rot={-14} />
            </div>
          )}
        </div>
      )}
      {gApproved && lf < 140 && <Sparkles lf={lf} at={60 / 30} x={724} y={520} n={16} spread={140} colors={[S5_GRN, "#BFEBD6", S5_GOLD]} dur={1.5} />}
      {merged && lf < 168 && <Confetti lf={lf - 124} n={22} colors={[S5_GRN, S5_GOLD, "#BFEBD6"]} w={300} top={280} h={340} />}

      {/* ===================== BEAT 2 · BAD COMMIT (red bug-monster) ===================== */}
      {bOpacity > 0.01 && (
        <div style={{ position: "absolute", left: bX, top: 480 + bY, width: 156, height: 140, opacity: bOpacity, transform: `rotate(${bTilt}deg) translateX(${bShift}px)`, transformOrigin: "50% 100%", zIndex: 18 }}>
          {/* oozing floating rap-sheet tags */}
          {S5_SHEET.map((s, i) => (
            <div key={"tag" + i} style={{ position: "absolute", left: s.dx, top: s.dy, transform: `translateY(${bob(lf, 4, 22, s.ph)}px) rotate(${-6 + i * 4}deg)`, opacity: Math.min(1, bIn * 1.4) * (bReject ? Math.max(0, 1 - over(lf, 226, 16)) : 1), whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: "#fff", background: s.c, padding: "3px 8px", borderRadius: 6, boxShadow: `0 4px 12px rgba(0,0,0,0.4)`, border: "1.5px solid rgba(255,255,255,0.35)" }}>{s.t}</span>
            </div>
          ))}
          {/* monster body */}
          <svg width="156" height="140" viewBox="0 0 156 140" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <ellipse cx="78" cy="132" rx="52" ry="8" fill="#08060F" opacity="0.5" />
            <path d="M20 78 Q10 40 42 34 Q54 12 78 22 Q102 12 114 34 Q146 40 136 78 Q150 100 118 112 Q98 130 78 120 Q58 130 38 112 Q6 100 20 78 Z" fill={S5_RED} />
            <path d="M20 78 Q10 40 42 34 Q54 12 78 22 Q78 60 78 120 Q58 130 38 112 Q6 100 20 78 Z" fill="#00000022" />
            {/* spiky bug legs */}
            {[-1, 1].map((sgn) => [0, 1, 2].map((k) => (
              <line key={"lg" + sgn + k} x1={sgn < 0 ? 26 : 130} y1={70 + k * 16} x2={sgn < 0 ? 26 + sgn * 22 : 130 + sgn * 22} y2={70 + k * 16 + Math.sin(lf * 0.3 + k) * 6} stroke={S5_REDD} strokeWidth="5" strokeLinecap="round" />
            )))}
            {/* shifty eyes */}
            <circle cx="58" cy="66" r="14" fill="#fff" />
            <circle cx="98" cy="66" r="14" fill="#fff" />
            <circle cx={58 + Math.sin(lf * 0.2) * 4} cy="70" r="6.5" fill={INK} />
            <circle cx={98 + Math.sin(lf * 0.2) * 4} cy="70" r="6.5" fill={INK} />
            {/* sneaky brows */}
            <line x1="46" y1="52" x2="66" y2="58" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="52" x2="90" y2="58" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            {/* grimace */}
            <path d="M60 92 Q78 84 96 92" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* ooze drips */}
            <path d="M46 112 q-3 14 3 20 q6 -6 3 -20 Z" fill={S5_REDD} />
            <path d="M104 116 q-3 12 3 18 q6 -6 3 -18 Z" fill={S5_REDD} />
          </svg>
          {/* REJECTED stamp */}
          {bReject && (
            <div style={{ position: "absolute", left: -26, top: 18, transform: `rotate(12deg) scale(${bStamp})`, transformOrigin: "50% 50%" }}>
              <Stamp x={96} y={40} s={1.16} text="REJECTED" c={S5_RED} rot={12} />
            </div>
          )}
        </div>
      )}
      {/* curb dust when bounced */}
      {lf > 214 && lf < 270 && (
        <div style={{ position: "absolute", left: 1160, top: 560, width: 200, height: 120, zIndex: 17 }}>
          <Embers lf={lf - 214} n={9} w={160} base={90} />
        </div>
      )}
      {bReject && lf < 250 && <Sparkles lf={lf} at={198 / 30} x={770} y={548} n={11} spread={118} colors={[S5_RED, "#F3B6C0"]} dur={1.2} />}
      {/* "NOT ON THE LIST" callout */}
      {bReject && lf < 252 && (
        <div style={{ position: "absolute", left: 648, top: 392, transform: `scale(${bStamp})`, transformOrigin: "50% 50%", opacity: Math.max(0, 1 - over(lf, 238, 16)), zIndex: 26 }}>
          <div style={{ background: "#3A0E16", border: `2px solid ${S5_RED}`, borderRadius: 10, padding: "6px 14px", fontFamily: mono, fontSize: 14, fontWeight: 800, color: "#F3B6C0", boxShadow: `0 0 18px rgba(224,85,107,0.55)`, whiteSpace: "nowrap" }}>NOT ON THE LIST</div>
        </div>
      )}

      {/* ===================== CLIMAX · THE GATE ===================== */}
      <div style={{ position: "absolute", left: 0, top: 694, width: 1012, display: "flex", justifyContent: "center", opacity: gatePop, transform: `translateY(${interpolate(gatePop, [0, 1], [26, 0])}px)`, zIndex: 40 }}>
        <div style={{ background: `linear-gradient(180deg, #143C28, #0C2416)`, border: `3px solid ${S5_GRN}`, borderRadius: 16, padding: "12px 34px", boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 28px rgba(63,174,130,0.5)`, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#EAFBF2", letterSpacing: 0.5 }}>THE READ-ONLY GATE</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: S5_GRN }}>bad code never ships</span>
        </div>
      </div>

      {/* club-mood vignette */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", background: "radial-gradient(120% 92% at 50% 42%, rgba(0,0,0,0) 50%, rgba(18,6,14,0.52) 100%)", zIndex: 45 }} />
    </>
  );
};

const S6_RUNNERS = [
  { c: '#4C6EF5', name: 'PLANNER', x: 200 },
  { c: '#E0843A', name: 'CODER', x: 430 },
  { c: '#E0556B', name: 'TESTER', x: 660 },
  { c: '#3FAE82', name: 'REVIEWER', x: 880 },
];

const S6_CROWDCOLORS = [CREAM, GOLD, SKY, RED, PINK, AMBER, '#8FB7E8'];
const S6_CROWD = Array.from({ length: 150 }).map((_, i) => ({
  x: 30 + seed(i * 1.7) * 952,
  y: 148 + seed(i * 2.3) * 138,
  c: S6_CROWDCOLORS[Math.floor(seed(i * 3.1) * S6_CROWDCOLORS.length)],
  ph: seed(i * 5.9) * 24,
  s: 3 + seed(i * 7.3) * 3.4,
}));

const S6_RINGS = [
  { x: 400, y: 336, c: '#4C6EF5' },
  { x: 452, y: 336, c: INK },
  { x: 504, y: 336, c: RED },
  { x: 426, y: 360, c: GOLD },
  { x: 478, y: 360, c: '#3FAE82' },
  { x: 556, y: 336, c: '#4C6EF5' },
  { x: 608, y: 336, c: INK },
  { x: 530, y: 360, c: GOLD },
  { x: 582, y: 360, c: '#3FAE82' },
];

const S6_Runner = ({ lf, r, active, feetY }) => {
  const size = 88;
  const phase = seed(r.x) * 12;
  const speed = active ? 0.85 : 0.5;
  const legA = Math.sin((lf + phase) * speed) * (active ? 34 : 20);
  const lean = active ? 8 : 4;
  const hop = active ? Math.abs(Math.sin((lf + phase) * speed)) * 7 : Math.abs(Math.sin((lf + phase) * speed)) * 3;
  const top = feetY - size - hop;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: 1012, height: 792 }}>
      {/* shadow */}
      <div style={{ position: 'absolute', left: r.x - 44, top: feetY - 8, width: 88, height: 20, borderRadius: '50%', background: 'rgba(20,16,10,0.32)', filter: 'blur(4px)' }} />
      {/* speed lines when active */}
      {active && (
        <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1012} height={792}>
          {[0, 1, 2, 3, 4].map((k) => {
            const yy = feetY - 30 - k * 16;
            const len = 46 + (Math.sin((lf + k * 4) * 0.6) + 1) * 34;
            const op = 0.18 + 0.32 * ((Math.sin((lf + k * 5) * 0.5) + 1) / 2);
            return <rect key={k} x={r.x - 58 - len} y={yy} width={len} height={4} rx={2} fill={k % 2 ? GOLD : CREAM} opacity={op} />;
          })}
        </svg>
      )}
      {/* legs */}
      <svg style={{ position: 'absolute', left: r.x - 30, top: feetY - 46 - hop }} width={60} height={54}>
        <line x1={30} y1={4} x2={30 - legA * 0.5} y2={48} stroke={lerpHex(r.c, INK, 0.25)} strokeWidth={9} strokeLinecap="round" />
        <line x1={30} y1={4} x2={30 + legA * 0.5} y2={48} stroke={r.c} strokeWidth={9} strokeLinecap="round" />
        <ellipse cx={30 - legA * 0.5} cy={49} rx={7} ry={4} fill={INK} />
        <ellipse cx={30 + legA * 0.5} cy={49} rx={7} ry={4} fill={INK} />
      </svg>
      {/* mascot */}
      <div style={{ position: 'absolute', left: r.x - size / 2, top, width: size, height: size, transform: `rotate(${lean}deg)`, transformOrigin: '50% 90%' }}>
        <Mascot lf={lf} size={size} gaze={0.9} nodAmp={active ? 4 : 2} nodSpeed={2} cheer={active ? 0.4 : 0} tint={r.c} />
      </div>
      {/* name tag */}
      <div style={{ position: 'absolute', left: r.x - 52, top: feetY + 12, width: 104, textAlign: 'center', fontFamily: mono, fontSize: 13, fontWeight: 800, letterSpacing: 1, color: r.c, background: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: '2px 0', boxShadow: '0 3px 8px rgba(20,16,10,0.28)', border: `2px solid ${r.c}` }}>{r.name}</div>
    </div>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const feetY = 606;

  // baton (shared folder) path, planner -> coder -> tester -> reviewer -> finish
  const bx = interpolate(lf, [10, 45, 90, 135, 172], [200, 315, 545, 770, 940], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nearHand = Math.min(Math.abs(lf - 45), Math.abs(lf - 90), Math.abs(lf - 135));
  const lift = Math.max(0, 24 - nearHand * 3);
  const by = 512 - lift + bob(lf, 5, 13, 0);
  const leg = lf < 45 ? 0 : lf < 90 ? 1 : lf < 135 ? 2 : 3;
  const batonRot = Math.sin(lf * 0.5) * 8 - 6;

  // starting gun
  const gun = over(lf, 0, 16, Easing.out(Easing.cubic));
  const tickShift = (lf * 9) % 64;

  // finish tape break
  const brk = over(lf, 164, 18, Easing.out(Easing.cubic));
  const pv = spr(lf, 166, 13, 120);
  const stampS = spr(lf, 172, 12, 130);

  return (
    <>
      {/* SKY */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1012, height: 792, background: 'linear-gradient(180deg, #1d2742 0%, #26325198 42%, #2f3d5e 60%, #33405c 62%)' }} />
      {/* stadium light glows */}
      {[130, 380, 630, 880].map((gx, i) => (
        <div key={i} style={{ position: 'absolute', left: gx - 90, top: -40, width: 180, height: 220, background: 'radial-gradient(ellipse at 50% 0%, rgba(231,178,76,0.30), rgba(231,178,76,0) 68%)' }} />
      ))}
      {/* light towers */}
      {[70, 942].map((tx, i) => (
        <div key={i}>
          <div style={{ position: 'absolute', left: tx - 3, top: 0, width: 6, height: 120, background: '#2a3550' }} />
          <div style={{ position: 'absolute', left: tx - 26, top: -4, width: 52, height: 22, borderRadius: 5, background: '#3a466a', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, padding: 3 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
              <div key={k} style={{ background: GOLD, borderRadius: 2, boxShadow: '0 0 6px rgba(231,178,76,0.8)', opacity: 0.7 + 0.3 * ((Math.sin((lf + k * 3 + i * 9) * 0.4) + 1) / 2) }} />
            ))}
          </div>
        </div>
      ))}

      {/* CROWD STANDS */}
      <div style={{ position: 'absolute', left: 0, top: 144, width: 1012, height: 160, background: 'linear-gradient(180deg, #2b3651, #37436310)', clipPath: 'polygon(0 22%, 100% 0, 100% 100%, 0 100%)' }} />
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1012} height={792}>
        {S6_CROWD.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={d.c} opacity={Math.min(1, 0.45 + 0.4 * ((Math.sin((lf + d.ph) * 0.35) + 1) / 2))} />
        ))}
      </svg>

      {/* JUMBOTRON */}
      <div style={{ position: 'absolute', left: 372, top: 26, width: 268, height: 128, borderRadius: 12, background: '#11182b', border: '5px solid #46527a', boxShadow: '0 10px 24px rgba(0,0,0,0.4), inset 0 0 18px rgba(90,160,222,0.18)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 12, top: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: RED, opacity: 0.5 + 0.5 * ((Math.sin(lf * 0.5) + 1) / 2), boxShadow: `0 0 8px ${RED}` }} />
          <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: RED, letterSpacing: 1 }}>LIVE</span>
          <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: CREAM, letterSpacing: 1, marginLeft: 8 }}>▶ REPLAY</span>
        </div>
        {/* mini replay track */}
        <div style={{ position: 'absolute', left: 20, top: 58, width: 228, height: 34, borderRadius: 17, background: '#7a3b26', border: '2px solid #a44e2f' }} />
        {S6_RUNNERS.map((r, i) => {
          const mx = 30 + ((lf * 3 + i * 26) % 210);
          return <div key={i} style={{ position: 'absolute', left: 20 + mx, top: 66, width: 12, height: 12, borderRadius: '50%', background: r.c, boxShadow: `0 0 6px ${r.c}` }} />;
        })}
        <div style={{ position: 'absolute', left: 0, bottom: 8, width: '100%', textAlign: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#8ea3c8', letterSpacing: 2 }}>THE HANDOFF</div>
      </div>

      {/* STADIUM WALL */}
      <div style={{ position: 'absolute', left: 0, top: 300, width: 1012, height: 132, background: 'linear-gradient(180deg, #38445f, #43507088)' }} />
      {/* Olympic-style rings on the wall */}
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1012} height={792}>
        {S6_RINGS.map((rg, i) => (
          <circle key={i} cx={rg.x} cy={rg.y} r={22} fill="none" stroke={rg.c} strokeWidth={7} opacity={0.92} />
        ))}
      </svg>
      {/* wall banner */}
      <div style={{ position: 'absolute', left: 646, top: 322, width: 320, height: 46, borderRadius: 10, background: 'linear-gradient(180deg, #E7B24C, #CF9544)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.3)', transform: `translateY(${bob(lf, 2, 40, 0)}px)` }}>
        <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 900, color: INK, letterSpacing: 1 }}>ONE FOLDER · ONE COMMAND</span>
      </div>

      {/* TRACK */}
      <div style={{ position: 'absolute', left: 0, top: 432, width: 1012, height: 214, background: 'linear-gradient(180deg, #C55E36 0%, #B8501F 55%, #9c4318 100%)', boxShadow: 'inset 0 8px 20px rgba(0,0,0,0.22)' }} />
      {/* lane separators */}
      {[470, 512, 560, 610].map((ly, i) => (
        <div key={i} style={{ position: 'absolute', left: 0, top: ly, width: 1012, height: 3, background: 'rgba(255,255,255,0.6)' }} />
      ))}
      {/* speed ticks scrolling */}
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1012} height={792}>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = ((i * 64 - tickShift) % 1088) - 40;
          return <rect key={i} x={x} y={636} width={30} height={5} rx={2} fill="rgba(255,255,255,0.5)" />;
        })}
      </svg>
      {/* apron */}
      <div style={{ position: 'absolute', left: 0, top: 646, width: 1012, height: 146, background: 'linear-gradient(180deg, #7a3b26, #5c2c1c)' }} />

      {/* START LINE + gun */}
      <div style={{ position: 'absolute', left: 148, top: 438, width: 8, height: 202, background: 'rgba(255,255,255,0.8)' }} />
      <div style={{ position: 'absolute', left: 108, top: 452, opacity: 0.6 + 0.4 * gun }}>
        <div style={{ padding: '4px 10px', borderRadius: 8, background: INK, border: `2px solid ${GOLD}`, fontFamily: mono, fontSize: 15, fontWeight: 800, color: '#7CFF9E' }}>{"> dev"}</div>
      </div>
      {gun < 1 && (
        <div style={{ position: 'absolute', left: 150 - 30 * gun, top: 470 - 30 * gun, width: 60 * gun, height: 60 * gun, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(231,178,76,0) 70%)', opacity: 1 - gun }} />
      )}

      {/* FINISH line (checkered) + tape */}
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1012} height={792}>
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 2 }).map((__, c) => (
            <rect key={r + '-' + c} x={902 + c * 12} y={438 + r * 17} width={12} height={17} fill={(r + c) % 2 ? INK : CREAM} />
          ))
        )}
      </svg>
      {/* tape ribbon halves */}
      <div style={{ position: 'absolute', left: 912, top: 500, width: 6, height: 120, background: PINK, borderRadius: 3, transformOrigin: '50% 0%', transform: `translateY(${-brk * 70}px) rotate(${-brk * 42}deg)`, opacity: 1 - brk * 0.6, boxShadow: '0 0 8px rgba(226,123,160,0.6)' }} />
      <div style={{ position: 'absolute', left: 912, top: 500, width: 6, height: 120, background: PINK, borderRadius: 3, transformOrigin: '50% 100%', transform: `translateY(${brk * 70}px) rotate(${brk * 42}deg)`, opacity: 1 - brk * 0.6, boxShadow: '0 0 8px rgba(226,123,160,0.6)' }} />
      <div style={{ position: 'absolute', left: 878, top: 640, fontFamily: mono, fontSize: 14, fontWeight: 900, color: CREAM, letterSpacing: 1 }}>FINISH</div>

      {/* RUNNERS */}
      {S6_RUNNERS.map((r, i) => (
        <S6_Runner key={i} lf={lf} r={r} active={leg === i} feetY={feetY} />
      ))}

      {/* BATON = glowing shared folder */}
      {[0, 1, 2, 3].map((k) => (
        <div key={k} style={{ position: 'absolute', left: bx - 26 - k * 22, top: by - 16, width: 34, height: 30, borderRadius: 6, background: GOLD, opacity: 0.22 - k * 0.05, filter: 'blur(2px)' }} />
      ))}
      <div style={{ position: 'absolute', left: bx - 30, top: by - 30, width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(231,178,76,0.55), rgba(231,178,76,0) 70%)' }} />
      <div style={{ position: 'absolute', left: bx - 24, top: by - 20, width: 48, height: 40, transform: `rotate(${batonRot}deg)`, transformOrigin: '50% 100%', filter: 'drop-shadow(0 4px 6px rgba(20,16,10,0.4))' }}>
        <div style={{ position: 'absolute', left: 2, top: 0, width: 22, height: 9, borderRadius: '5px 5px 0 0', background: '#D89A2E' }} />
        <div style={{ position: 'absolute', left: 0, top: 7, width: 48, height: 33, borderRadius: 6, background: 'linear-gradient(180deg, #F0C25E, #D89A2E)', border: '2px solid #b9812a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 900, color: INK }}>shared/</span>
        </div>
      </div>

      {/* handoff sparkles */}
      <Sparkles lf={lf} at={45 / 30} x={315} y={508} n={12} spread={46} colors={[GOLD, CREAM]} dur={0.7} />
      <Sparkles lf={lf} at={90 / 30} x={545} y={508} n={12} spread={46} colors={[GOLD, CREAM]} dur={0.7} />
      <Sparkles lf={lf} at={135 / 30} x={770} y={508} n={12} spread={46} colors={[GOLD, CREAM]} dur={0.7} />

      {/* PAYOFF */}
      {pv > 0.01 && (
        <>
          <Confetti lf={lf - 166} n={60} colors={['#4C6EF5', '#E0843A', '#E0556B', '#3FAE82', GOLD]} top={0} h={520} />
          <div style={{ position: 'absolute', left: 506 - 250, top: 690, width: 500, transform: `scale(${pv})`, transformOrigin: '50% 50%' }}>
            <div style={{ margin: '0 auto', width: 476, padding: '14px 18px', borderRadius: 16, background: 'linear-gradient(180deg, #3FAE82, #2f8e69)', border: `3px solid ${CREAM}`, boxShadow: '0 12px 30px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#2f8e69', fontWeight: 900 }}>✓</div>
              <span style={{ fontFamily: fraunces.fontFamily, fontSize: 30, fontWeight: 900, color: CREAM, letterSpacing: 0.5 }}>REVIEWED FEATURE</span>
            </div>
          </div>
        </>
      )}
      {stampS > 0.01 && <Stamp x={906} y={470} s={stampS} text="SHIPPED" c={'#3FAE82'} rot={-12} />}

      {/* subtle vignette */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1012, height: 792, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 55%, rgba(15,12,24,0.34) 100%)' }} />
    </>
  );
};

// ============================== PAYOFF · Christmas morning ==============================
// ============================== S7 — PAYOFF: CHRISTMAS MORNING, wake up to a shipped feature ==============================
const S7_GRN = "#3FAE82", S7_GRND = "#2C7C58", S7_GOLD = "#E7B24C", S7_RED = "#C4463A", S7_REDD = "#9E3428";
const S7_PLAN = "#4C6EF5", S7_CODE = "#E0843A", S7_TEST = "#E0556B", S7_REV = "#3FAE82";

// festive gold bow (sits atop the gift)
const S7Bow: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 140 96" width={s} height={s * 96 / 140} style={{ overflow: "visible", filter: "drop-shadow(0 6px 10px rgba(80,30,10,0.4))" }}>
    <path d="M70 46 C40 8, 6 12, 16 40 C4 58, 44 62, 70 46 Z" fill="#F2C24E" stroke="#C99326" strokeWidth={3} strokeLinejoin="round" />
    <path d="M70 46 C100 8, 134 12, 124 40 C136 58, 96 62, 70 46 Z" fill="#F2C24E" stroke="#C99326" strokeWidth={3} strokeLinejoin="round" />
    <path d="M70 46 C58 66, 44 86, 40 92" stroke="#D99A2E" strokeWidth={13} strokeLinecap="round" fill="none" />
    <path d="M70 46 C82 66, 96 86, 100 92" stroke="#D99A2E" strokeWidth={13} strokeLinecap="round" fill="none" />
    <ellipse cx={70} cy={46} rx={17} ry={15} fill="#F6D57A" stroke="#C99326" strokeWidth={3} />
    <ellipse cx={64} cy={42} rx={5} ry={4} fill="rgba(255,255,255,0.6)" />
  </svg>
);

// a small decorated christmas tree for the corner
const S7Tree: React.FC<{ lf: number; s: number }> = ({ lf, s }) => (
  <svg viewBox="0 0 160 220" width={s} height={s * 220 / 160} style={{ overflow: "visible", filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.4))" }}>
    <rect x={70} y={192} width={20} height={26} fill="#7A4A26" />
    <rect x={56} y={214} width={48} height={8} rx={3} fill="#5E3A1E" />
    <polygon points="80,4 120,78 40,78" fill="#2E7D52" />
    <polygon points="80,4 120,78 80,78" fill="#256B45" />
    <polygon points="80,52 132,134 28,134" fill="#2E7D52" />
    <polygon points="80,52 132,134 80,134" fill="#256B45" />
    <polygon points="80,108 146,196 14,196" fill="#2E7D52" />
    <polygon points="80,108 146,196 80,196" fill="#256B45" />
    {/* baubles + blinking lights */}
    {[[64, 66, S7_RED], [96, 96, S7_GOLD], [52, 120, S7_PLAN], [108, 128, S7_RED], [80, 150, S7_GOLD], [40, 178, S7_TEST], [120, 176, S7_PLAN], [80, 116, S7_RED]].map(([x, y, c], i) => {
      const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(lf / 6 + i * 1.7));
      return <circle key={i} cx={x as number} cy={y as number} r={7} fill={c as string} opacity={tw} style={{ filter: `drop-shadow(0 0 ${5 * tw}px ${c})` }} />;
    })}
    <polygon points="80,-16 87,-2 102,-1 90,9 94,24 80,15 66,24 70,9 58,-1 73,-2" fill="#F6D57A" stroke="#E7B24C" strokeWidth={2} style={{ filter: "drop-shadow(0 0 10px rgba(231,178,76,0.9))" }} />
  </svg>
);

// a hung christmas stocking
const S7Stocking: React.FC<{ s: number; c?: string }> = ({ s, c = "#C4463A" }) => (
  <svg viewBox="0 0 70 100" width={s} height={s * 100 / 70} style={{ overflow: "visible", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
    <path d="M22 24 L22 66 Q12 74 12 82 Q12 94 26 94 L50 94 Q60 94 60 84 Q60 76 46 70 L46 24 Z" fill={c} stroke="#9E3428" strokeWidth={2} />
    <rect x={18} y={14} width={32} height={16} rx={5} fill="#F4EEE2" />
    <rect x={18} y={14} width={32} height={5} fill="#E2DDCE" />
  </svg>
);

// coffee mug with rising steam
const S7Mug: React.FC<{ lf: number; s: number }> = ({ lf, s }) => (
  <svg viewBox="0 0 90 100" width={s} height={s * 100 / 90} style={{ overflow: "visible", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
    {[0, 1, 2].map((k) => { const t = ((lf / 34 + k / 3) % 1); return <path key={k} d={`M${30 + k * 16} ${40 - t * 34} q${8 + Math.sin(lf / 7 + k) * 6} -8 0 -16`} stroke="rgba(255,255,255,0.5)" strokeWidth={4} fill="none" strokeLinecap="round" opacity={(1 - t) * 0.8} />; })}
    <rect x={18} y={44} width={48} height={44} rx={8} fill="#EDE7DA" stroke="#C9C1B0" strokeWidth={2} />
    <rect x={18} y={44} width={48} height={9} fill="#3F2A1E" />
    <path d="M66 54 q18 4 0 24" stroke="#EDE7DA" strokeWidth={7} fill="none" />
  </svg>
);

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const giftCx = 588;
  const sun = over(lf, 0, 64);
  const sunY = interpolate(sun, [0, 1], [138, 42]);
  const wake = over(lf, 8, 26);
  const cheer = over(lf, 30, 20);
  const zzz = 1 - ramp(lf, 6, 26);
  // gift anticipation + pop
  const shake = lf > 26 && lf < 37 ? Math.sin(lf * 2.3) * 3.4 : 0;
  const squash = lf > 27 && lf < 37 ? Math.sin((lf - 27) / 10 * Math.PI) * 0.07 : 0;
  const lidP = over(lf, 36, 13, Easing.out(Easing.back(1.5)));
  const flash = lf >= 36 && lf < 47 ? Math.max(0, 1 - Math.abs(lf - 38) / 8) : 0;
  const cardP = over(lf, 40, 20, Easing.out(Easing.back(1.15)));
  const cardY = interpolate(cardP, [0, 1], [472, 214]);
  const cap = Math.min(1.06, spr(lf, 60, 11, 200));
  const rayA = Math.sin(lf / 30) * 1.4;
  return (
    <>
      {/* ---------- BACKDROP: dawn sky ---------- */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #29335C 0%, #5C4E72 34%, #B57C56 66%, #E7C486 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 92% 74% at 22% ${18 + sun * 8}%, rgba(231,178,76,${0.24 + sun * 0.26}), transparent 66%)` }} />

      {/* ---------- WINDOW with rising christmas-morning sun ---------- */}
      <div style={{ position: "absolute", left: 54, top: 52, width: 302, height: 300, borderRadius: 16, background: "linear-gradient(180deg,#BFE0F2 0%,#F3D79B 62%,#F0BE8C 100%)", boxShadow: "inset 0 0 40px rgba(255,236,190,0.6), 0 12px 30px -10px rgba(0,0,0,0.4)", border: "10px solid #EDE6D6", overflow: "hidden", zIndex: 2 }}>
        <div style={{ position: "absolute", left: 42, top: sunY, width: 108, height: 108, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, #FFF3C4, #F1B24C)", boxShadow: "0 0 50px rgba(241,178,76,0.9)" }} />
        {/* distant snow hills */}
        <div style={{ position: "absolute", left: -20, bottom: -30, width: 200, height: 120, borderRadius: "50%", background: "#F3ECDC", opacity: 0.85 }} />
        <div style={{ position: "absolute", right: -30, bottom: -40, width: 220, height: 130, borderRadius: "50%", background: "#EFE6D2", opacity: 0.8 }} />
        {/* muntins */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 9, marginLeft: -4, background: "#EDE6D6" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 9, marginTop: -4, background: "#EDE6D6" }} />
        {/* frost dots */}
        {Array.from({ length: 10 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 12 + seed(i) * 270, top: 12 + seed(i * 3) * 270, width: 4 + seed(i * 2) * 4, height: 4 + seed(i * 2) * 4, borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />)}
      </div>

      {/* ---------- LIGHT SHAFTS from the window ---------- */}
      <div style={{ position: "absolute", left: 205, top: 200, width: 900, height: 700, transformOrigin: "0 0", transform: `rotate(${34 + rayA}deg)`, pointerEvents: "none", zIndex: 3 }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 0, top: -60 + i * 62, width: 880, height: 26 + i * 6, background: "linear-gradient(90deg, rgba(255,240,200,0.34), rgba(255,240,200,0.05) 78%, transparent)", filter: "blur(3px)" }} />)}
        {/* dust motes drifting in the beam */}
        {Array.from({ length: 14 }).map((_, i) => { const t = ((lf / 90 + seed(i)) % 1); return <div key={`m${i}`} style={{ position: "absolute", left: t * 780, top: 20 + seed(i * 5) * 190 + Math.sin(lf / 20 + i) * 10, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,246,214,0.9)", boxShadow: "0 0 6px rgba(255,246,214,0.9)", opacity: 0.5 + 0.5 * Math.sin(lf / 8 + i) }} />; })}
      </div>

      {/* ---------- string lights across the top ---------- */}
      <svg viewBox="0 0 1012 120" width={1012} height={120} style={{ position: "absolute", left: 0, top: 0, zIndex: 4, overflow: "visible" }}>
        <path d="M-10 24 Q120 70 250 34 T520 34 T790 34 T1030 30" fill="none" stroke="#3A3A2E" strokeWidth={3} opacity={0.7} />
        {Array.from({ length: 13 }).map((_, i) => { const x = 20 + i * 78; const y = 30 + Math.sin(i * 1.9) * 14 + (i % 3) * 6; const c = [S7_RED, S7_GOLD, S7_GRN, S7_PLAN][i % 4]; const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(lf / 5 + i * 1.3)); return <g key={i}><line x1={x} y1={y - 8} x2={x} y2={y - 2} stroke="#3A3A2E" strokeWidth={2} /><circle cx={x} cy={y + 4} r={7} fill={c} opacity={tw} style={{ filter: `drop-shadow(0 0 ${7 * tw}px ${c})` }} /></g>; })}
      </svg>

      {/* ---------- mantel shelf + hung stockings (right) ---------- */}
      <div style={{ position: "absolute", left: 690, top: 150, width: 300, height: 16, borderRadius: 5, background: "linear-gradient(180deg,#8A5A34,#6E4526)", boxShadow: "0 10px 20px -8px rgba(0,0,0,0.4)", zIndex: 5 }} />
      <div style={{ position: "absolute", left: 726, top: 162, zIndex: 6 }}><S7Stocking s={70} c={S7_RED} /></div>
      <div style={{ position: "absolute", left: 812, top: 162, zIndex: 6 }}><S7Stocking s={70} c={S7_GRN} /></div>
      {/* garland along the mantel */}
      {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 700 + i * 34, top: 150, width: 30, height: 22, borderRadius: "50%", background: i % 2 ? "#2E7D52" : "#256B45", zIndex: 5, boxShadow: "inset 0 -3px 4px rgba(0,0,0,0.25)" }} />)}

      {/* ---------- FLOOR (warm wood) ---------- */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: "linear-gradient(180deg,#8A5C36 0%,#5E3C22 100%)", clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)", zIndex: 6 }}>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 22 + i * 40, height: 3, background: "rgba(0,0,0,0.18)" }} />)}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,232,190,0.18), transparent 55%)" }} />
      </div>

      {/* ---------- christmas tree in the far corner ---------- */}
      <div style={{ position: "absolute", left: 838, bottom: 128, zIndex: 7 }}><S7Tree lf={lf} s={190} /></div>

      {/* ---------- the founder mascot waking up ---------- */}
      <div style={{ position: "absolute", left: 118, bottom: 118, width: 224, zIndex: 18, filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.35))" }}>
        <Mascot lf={lf} size={224} nodAmp={interpolate(wake, [0, 1], [1.4, 3.8])} nodSpeed={10} cheer={cheer} gaze={interpolate(cheer, [0, 1], [0, 4])} />
      </div>
      <div style={{ opacity: zzz, transition: "none" }}>
        {[0, 1, 2].map((k) => { const t = ((lf / 40 + k / 3) % 1); return <div key={k} style={{ position: "absolute", left: 300 + t * 42 + k * 8, top: 320 - t * 60, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22 + k * 9, color: "rgba(220,232,255,0.85)", opacity: zzz * (1 - t), zIndex: 19 }}>z</div>; })}
      </div>
      {/* nightstand + coffee mug */}
      <div style={{ position: "absolute", left: 330, bottom: 128, width: 96, height: 92, borderRadius: 8, background: "linear-gradient(180deg,#7A4E2C,#5A3820)", zIndex: 16, boxShadow: "0 12px 20px -10px rgba(0,0,0,0.45)" }} />
      <div style={{ position: "absolute", left: 348, bottom: 214, zIndex: 17 }}><S7Mug lf={lf} s={64} /></div>

      {/* ---------- THE WRAPPED GIFT (hero) ---------- */}
      <div style={{ position: "absolute", left: giftCx - 112, top: 470, width: 224, zIndex: 20, transform: `translateX(${shake}px) scaleX(${1 + squash * 0.5}) scaleY(${1 - squash})`, transformOrigin: "50% 100%" }}>
        {/* box body */}
        <div style={{ position: "absolute", left: 8, top: 12, width: 208, height: 170, borderRadius: 12, background: grad(S7_RED, S7_REDD), boxShadow: "0 22px 34px -14px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.18)" }}>
          {/* gold ribbon cross */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 34, marginLeft: -17, background: grad("#F2C24E", "#D99A2E") }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 30, marginTop: -15, background: grad("#F2C24E", "#D99A2E") }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: "rgba(255,255,255,0.16)" }} />
        </div>
      </div>
      {/* lid (flips open) */}
      <div style={{ position: "absolute", left: giftCx - 130, top: 452, width: 260, zIndex: 24, transformOrigin: "50% 100%", transform: `translate(${lidP * 150}px, ${-lidP * 250}px) rotate(${lidP * 46}deg)`, opacity: 1 - Math.max(0, lidP - 0.75) * 4 }}>
        <div style={{ position: "absolute", left: 0, top: 20, width: 260, height: 46, borderRadius: 10, background: grad("#D14C40", "#A6382C"), boxShadow: "0 10px 18px -8px rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.2)" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 34, marginLeft: -17, background: grad("#F2C24E", "#D99A2E") }} />
        </div>
        <div style={{ position: "absolute", left: 90, top: -32 }}><S7Bow s={86} /></div>
      </div>

      {/* reveal burst behind card */}
      {cardP > 0.02 && <div style={{ position: "absolute", left: giftCx, top: cardY + 110, width: 640, height: 640, marginLeft: -320, marginTop: -320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,214,0.5), rgba(63,174,130,0.14) 42%, transparent 66%)", zIndex: 21, opacity: Math.min(1, cardP * 1.6), transform: `scale(${0.5 + cardP * 0.7})` }} />}
      {cardP > 0.02 && Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; const r = 40 + cardP * 300; return <div key={i} style={{ position: "absolute", left: giftCx + Math.cos(a) * r, top: cardY + 100 + Math.sin(a) * r * 0.9, width: 6, height: 22, marginLeft: -3, marginTop: -11, borderRadius: 3, background: "linear-gradient(180deg, rgba(255,246,214,0.9), transparent)", transform: `rotate(${a + Math.PI / 2}rad)`, opacity: Math.max(0, 1 - cardP) * 0.9, zIndex: 21 }} />; })}

      {/* ---------- THE MERGED PR CARD ---------- */}
      {cardP > 0.02 && (
        <div style={{ position: "absolute", left: giftCx - 182, top: cardY, width: 364, zIndex: 30, transform: `scale(${0.7 + cardP * 0.34}) translateY(${(1 - cardP) * 30 + bob(lf, cardP >= 0.98 ? 4 : 0, 70)}px)`, transformOrigin: "50% 100%", filter: `drop-shadow(0 24px 40px rgba(20,50,30,0.45))` }}>
          {/* ribbon rosette pinned to the corner */}
          <svg viewBox="0 0 90 120" width={72} height={96} style={{ position: "absolute", right: -14, top: -30, zIndex: 34, overflow: "visible", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))" }}>
            <path d="M34 60 L20 116 L38 104 L45 118 L52 104 L70 116 L56 60 Z" fill={S7_GRND} />
            {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return <ellipse key={i} cx={45 + Math.cos(a) * 26} cy={44 + Math.sin(a) * 26} rx={12} ry={7} fill={S7_GRN} transform={`rotate(${a * 180 / Math.PI} ${45 + Math.cos(a) * 26} ${44 + Math.sin(a) * 26})`} />; })}
            <circle cx={45} cy={44} r={20} fill="#F6D57A" stroke="#E7B24C" strokeWidth={3} />
            <text x={45} y={51} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={20} fill={S7_GRND}>✓</text>
          </svg>

          <div style={{ borderRadius: 18, overflow: "hidden", background: "#FBFAF6", border: `2px solid ${S7_GRN}` }}>
            {/* header bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: grad(S7_GRN, S7_GRND) }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* merge-branch glyph */}
                <svg viewBox="0 0 24 24" width={20} height={20}><path d="M6 3 V15 M6 15 a3 3 0 1 0 0 6 a3 3 0 1 0 0 -6 M6 3 a3 3 0 1 0 0 0.01 M18 9 a3 3 0 1 0 0 0.01 M18 9 c0 5 -6 3 -9 6" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" /></svg>
              </div>
              <span style={{ fontFamily: mono, fontSize: 17, color: "rgba(255,255,255,0.9)" }}>pull request</span>
              <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 999, background: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 16, color: S7_GRND }}>MERGED</span>
            </div>
            {/* body */}
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: INK, lineHeight: 1.05, marginBottom: 12 }}>feat: dark mode toggle</div>
              {[["FEATURE SHIPPED", S7_CODE], ["TESTS PASSED", S7_TEST], ["MERGED TO MAIN", S7_GRN]].map(([t, c], i) => {
                const rp = over(lf, 48 + i * 5, 8);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9, opacity: rp, transform: `translateX(${(1 - rp) * -14}px)` }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: c as string, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, flexShrink: 0 }}>✓</div>
                    <span style={{ fontFamily: mono, fontSize: 19, color: "#3A362E", letterSpacing: "0.01em" }}>{t}</span>
                  </div>
                );
              })}
              {/* the 4-agent stamp row */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 12, borderTop: "1.5px solid rgba(0,0,0,0.08)" }}>
                {[S7_PLAN, S7_CODE, S7_TEST, S7_REV].map((c, i) => <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid #FBFAF6", marginLeft: i ? -8 : 0 }} />)}
                <span style={{ marginLeft: 6, fontFamily: mono, fontSize: 14, color: "#8A857A" }}>built while you slept</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- confetti + sparkle joy ---------- */}
      {lf > 39 && <Confetti lf={lf - 39} n={44} colors={[S7_RED, S7_GRN, S7_GOLD, "#FCEDDD"]} top={-30} h={860} />}
      <Sparkles lf={lf} at={1.3} x={giftCx} y={300} n={22} spread={330} colors={[S7_GOLD, "#fff", S7_GRN]} dur={1.1} />

      {/* ---------- caption ---------- */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, textAlign: "center", zIndex: 40, transform: `scale(${cap})`, opacity: Math.min(1, cap * 1.4) }}>
        <span style={{ display: "inline-block", padding: "12px 30px", borderRadius: 999, background: "rgba(20,24,19,0.72)", border: `2px solid ${S7_GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#FBF3E0", textShadow: "0 3px 0 rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>You never had to write it.</span>
      </div>

      {/* warm reveal flash */}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 58% 44%, #FFF6E0, rgba(255,246,224,0) 60%)", opacity: 0.7 * flash, zIndex: 45, pointerEvents: "none" }} />}
      {/* cozy vignette */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 74% 66% at 50% 44%, transparent 52%, rgba(30,16,8,0.42) 100%)", zIndex: 46 }} />
    </>
  );
};

// ============================== CTA · crew lineup ==============================
const DevCTA_agents = [
  { name: "PLANNER", tint: "#4C6EF5", role: "spec" },
  { name: "CODER", tint: "#E0843A", role: "builds" },
  { name: "TESTER", tint: "#E0556B", role: "breaks it" },
  { name: "REVIEWER", tint: "#3FAE82", role: "read-only" },
];

const DevCTA_lerp = (a, b, t) => a + (b - a) * t;

const DevCTA: React.FC<{ lf: number }> = ({ lf }) => {
  // DEV wordmark spring + shine
  const plateS = spr(lf, 2, 12, 150);
  const shineX = over(lf, 14, 26, Easing.out(Easing.cubic));
  const wordS = spr(lf, 6, 11, 160);

  // pill rise near the bottom
  const pillY = DevCTA_lerp(70, 0, spr(lf, 40, 13, 150));
  const pillOp = ramp(lf, 38, 50);
  const pillGlow = 0.5 + 0.5 * Math.sin(lf / 7);

  return (
    <div style={{ position:"absolute", left:34, right:34, top:384, height:792, borderRadius:36, background:"linear-gradient(158deg, #FBF6EC 0%, #F1EBDD 58%, #EAF0F2 100%)", boxShadow:"0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)", overflow:"hidden", border:"2px solid rgba(210,114,78,0.35)" }}>

      {/* ===== BACKDROP: warm studio glow ===== */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(120% 80% at 50% 8%, rgba(231,178,76,0.30) 0%, rgba(231,178,76,0.0) 55%)" }} />
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(90% 60% at 50% 96%, rgba(90,160,222,0.20) 0%, rgba(90,160,222,0) 60%)" }} />

      {/* soft radial team-photo vignette */}
      <div style={{ position:"absolute", inset:0, boxShadow:"inset 0 0 120px rgba(58,92,132,0.22)", borderRadius:36 }} />

      {/* subtle roster grid lines (team-photo backdrop) */}
      {[0,1,2,3,4].map(i => (
        <div key={"gv"+i} style={{ position:"absolute", left: 60 + i*(880/4), top:120, width:2, height:520, background:"rgba(58,92,132,0.06)" }} />
      ))}
      {[0,1,2].map(i => (
        <div key={"gh"+i} style={{ position:"absolute", left:44, top: 200 + i*140, width:864, height:2, background:"rgba(58,92,132,0.05)" }} />
      ))}

      {/* twin spotlights from above */}
      <SpotCone x={300} top={40} topW={40} botW={260} h={520} color="rgba(231,178,76,0.16)" />
      <SpotCone x={712} top={40} topW={40} botW={260} h={520} color="rgba(90,160,222,0.14)" />

      {/* floor riser for the crew lineup */}
      <div style={{ position:"absolute", left:60, right:60, top:560, height:150, borderRadius:"50% 50% 20px 20px / 40% 40% 20px 20px", background:"linear-gradient(180deg, rgba(210,114,78,0.16), rgba(58,92,132,0.10))", boxShadow:"inset 0 8px 24px rgba(255,255,255,0.5)" }} />
      <div style={{ position:"absolute", left:60, right:60, top:590, height:80, borderRadius:"0 0 20px 20px", background:"linear-gradient(180deg, rgba(58,92,132,0.10), rgba(58,92,132,0.02))" }} />

      {/* ===== DEV WORDMARK PLATE ===== */}
      <div style={{ position:"absolute", left:"50%", top:60, transform:`translateX(-50%) scale(${0.6 + 0.4*plateS})`, opacity: ramp(lf,0,10) }}>
        <div style={{ position:"relative", padding:"14px 46px", borderRadius:26, background:"linear-gradient(160deg, #F4C566 0%, #E7B24C 45%, #CF9544 100%)", boxShadow:"0 18px 40px -12px rgba(184,80,31,0.55), inset 0 3px 0 rgba(255,255,255,0.55), inset 0 -6px 14px rgba(184,80,31,0.35)", border:"2px solid rgba(184,80,31,0.4)", overflow:"hidden" }}>
          {/* shine sweep */}
          <div style={{ position:"absolute", top:0, bottom:0, left:`${-40 + shineX*160}%`, width:"32%", background:"linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)", transform:"skewX(-16deg)" }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight:900, fontSize:92, letterSpacing:4, color:"#B8501F", textShadow:"0 3px 0 rgba(255,255,255,0.35), 0 -2px 6px rgba(184,80,31,0.4)", transform:`scale(${0.8 + 0.2*wordS})`, lineHeight:1 }}>
            DEV
          </div>
        </div>
        <div style={{ position:"absolute", left:"50%", top:"112%", transform:"translateX(-50%)", whiteSpace:"nowrap", fontFamily: inter.fontFamily, fontWeight:800, fontSize:20, letterSpacing:6, color:"#3A5C84", opacity: ramp(lf,10,20) }}>
          YOUR AI DEV TEAM
        </div>
      </div>

      {/* ===== CREW LINEUP: 4 agents ===== */}
      {DevCTA_agents.map((a, i) => {
        const cx = 191 + i * 208;
        const pop = spr(lf, 12 + i * 5, 12, 150);
        const cheerOn = lf > 26 + i * 4;
        const nameOp = ramp(lf, 20 + i * 4, 30 + i * 4);
        const floaty = bob(lf, 4, 40, i * 1.3);
        return (
          <div key={a.name} style={{ position:"absolute", left: cx, top: 300 + floaty, transform:`translateX(-50%) scale(${0.5 + 0.5*pop})`, opacity: ramp(lf, 10 + i*4, 20 + i*4) }}>
            {/* glow disc behind mascot */}
            <div style={{ position:"absolute", left:"50%", top:96, transform:"translate(-50%,-50%)", width:150, height:150, borderRadius:"50%", background:`radial-gradient(circle, ${a.tint}44 0%, ${a.tint}00 68%)` }} />
            <div style={{ transform:"translateX(-50%)", marginLeft:"50%", width:0 }}>
              <div style={{ transform:"translateX(-50px)" }}>
                <Mascot lf={lf} size={100} gaze={0} cheer={cheerOn} tint={a.tint} nodAmp={4} nodSpeed={1.4} />
              </div>
            </div>
            {/* name-plate */}
            <div style={{ position:"absolute", left:"50%", top:150, transform:"translateX(-50%)", opacity: nameOp, whiteSpace:"nowrap" }}>
              <div style={{ padding:"5px 14px", borderRadius:12, background:`linear-gradient(160deg, ${lerpHex(a.tint,"#FFFFFF",0.12)}, ${a.tint})`, boxShadow:`0 8px 18px -6px ${a.tint}99, inset 0 2px 0 rgba(255,255,255,0.4)`, border:"1.5px solid rgba(255,255,255,0.35)" }}>
                <div style={{ fontFamily: inter.fontFamily, fontWeight:900, fontSize:16, letterSpacing:1.5, color:"#FBF6EC", textAlign:"center", textShadow:"0 1px 2px rgba(0,0,0,0.25)" }}>{a.name}</div>
              </div>
              <div style={{ marginTop:5, fontFamily: mono, fontSize:12, fontWeight:700, color:"#3A5C84", textAlign:"center", opacity:0.85 }}>{a.role}</div>
            </div>
            {/* tiny cheer sparkle */}
            {cheerOn && <Sparkles lf={lf} at={(26 + i*4)/30} x={0} y={20} n={4} spread={70} colors={[a.tint, "#E7B24C"]} dur={2.2} />}
          </div>
        );
      })}

      {/* ===== COMMENT PILL ===== */}
      <div style={{ position:"absolute", left:"50%", top:642, transform:`translate(-50%, ${pillY}px)`, opacity: pillOp }}>
        <div style={{ position:"relative", padding:"20px 40px", borderRadius:40, background:"linear-gradient(150deg, #F0913E 0%, #E0843A 48%, #CF6A2A 100%)", boxShadow:`0 22px 46px -14px rgba(207,106,42,${0.5 + 0.25*pillGlow}), inset 0 3px 0 rgba(255,255,255,0.45), inset 0 -6px 14px rgba(184,80,31,0.4)`, border:"2px solid rgba(255,233,176,0.5)", whiteSpace:"nowrap" }}>
          {/* speech dot */}
          <div style={{ position:"absolute", left:34, bottom:-14, width:26, height:26, background:"#E0843A", borderRadius:"6px", transform:"rotate(45deg)", boxShadow:"6px 6px 12px -4px rgba(184,80,31,0.4)" }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight:800, fontSize:34, color:"#FFF3DD", textShadow:"0 2px 4px rgba(184,80,31,0.5)", letterSpacing:0.5 }}>
            comment <span style={{ color:"#FFE9B0", textShadow:"0 0 14px rgba(255,233,176,0.7)" }}>DEV</span> for the setup
          </div>
        </div>
      </div>

      {/* ===== SPARKLES + CONFETTI ===== */}
      <Sparkles lf={lf} at={0.1} x={506} y={110} n={7} spread={340} colors={["#E7B24C","#5AA0DE","#FFE9B0"]} dur={3.0} />
      <Confetti lf={lf} n={26} colors={["#4C6EF5","#E0843A","#E0556B","#3FAE82","#E7B24C"]} top={0} h={520} />

      {/* corner glints */}
      <div style={{ position:"absolute", left:28, top:24, width:90, height:90, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0) 70%)" }} />
      <div style={{ position:"absolute", right:24, bottom:120, width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle, rgba(90,160,222,0.25), rgba(90,160,222,0) 70%)" }} />
    </div>
  );
};

const StudioBg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(178deg, #F7F0E4 0%, #F3EAD9 44%, #F1E4D0 72%, #EADAC2 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 720, background: "radial-gradient(ellipse 72% 62% at 50% 0%, rgba(255,251,244,0.7), transparent 72%)" }} />
      <div style={{ position: "absolute", left: -120, right: -120, bottom: 0, height: 560, borderRadius: "50% 50% 0 0 / 20% 20% 0 0", background: "linear-gradient(180deg, rgba(228,206,176,0.0), rgba(220,194,158,0.6))" }} />
      {DEVC.map((c, i) => <div key={i} style={{ position: "absolute", left: (i % 2 ? 970 : 120) - 300 + Math.sin(f / 50 + i) * 22, top: (i < 2 ? 200 : 1650) - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${c}, transparent 62%)`, opacity: 0.09, filter: "blur(16px)" }} />)}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 42% at 50% 40%, rgba(255,251,244,0.5), transparent 72%)" }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: P_TOP + P_H - 14, height: 64, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,30,18,0.3), transparent 70%)", filter: "blur(9px)" }} />
      <Grain op={0.04} />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 360px rgba(40,32,24,0.18)" }} />
    </AbsoluteFill>
  );
};

const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = over(f, 0, fr(0.45), Easing.out(Easing.cubic));
  const out = 1 - over(f, fr(L[1] - 0.3), fr(0.3));
  if (out <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -18}px)` }}>
      <div style={{ display: "inline-block", textAlign: "center", padding: "20px 46px", borderRadius: 30, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 22px 52px -12px rgba(20,26,45,0.48)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54, color: INK, letterSpacing: "0.005em", lineHeight: 1.04, display: "block" }}><span style={{ color: CLAY }}>4 CLAUDE AGENTS</span><br />SHIP WHILE YOU SLEEP</span>
      </div>
    </div>
  );
};

// ============================== captions ==============================
type Wd = { start: number; end: number; word: string };
const cw: Wd[] = (() => { const out: Wd[] = []; (words as any[]).forEach((w) => { const word = w.word ?? w.w; const tk = (word || "").trim(); const frag = tk === "" || /^[%\-.,!?;:)]/.test(tk); if (frag && out.length) { const p = out[out.length - 1]; out[out.length - 1] = { ...p, word: p.word + word, end: w.end }; } else out.push({ start: w.start, end: w.end, word }); }); return out; })();
const clines: { words: Wd[]; start: number; end: number }[] = (() => { const out: { words: Wd[]; start: number; end: number }[] = []; let cur: Wd[] = []; cw.forEach((w, i) => { cur.push(w); const next = cw[i + 1]; const gap = next ? next.start - w.end : 99; const endsSent = /[.!?]$/.test(w.word.trim()); const lastw = w.word.trim().toLowerCase().replace(/[^a-z']/g, ""); const dangling = ["i", "a", "the", "to", "of", "and", "is", "it", "an", "you", "how", "for"].includes(lastw); if ((cur.length >= 3 || gap > 0.34 || endsSent) && !(dangling && !endsSent && next)) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; } }); if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end }); return out; })();
const Captions: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const lead = 0.12; let cur = clines[0];
  for (let i = 0; i < clines.length; i++) { const ln = clines[i]; const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0; if (t + lead >= gate) cur = ln; }
  const done = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1270, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.start; const active = !done && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, lineHeight: 1.1, color: on ? (active ? CLAYD : CLAY) : "#5A463C", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: active ? "0 2px 14px rgba(255,251,244,0.95)" : "0 1px 3px rgba(90,70,60,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

// ============================== progress bar ==============================
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const VIRT = L[8]; const p = Math.min(1, t / VIRT);
  const marks = [L[2], L[3], L[4], L[5]];
  const STARS = [4.5, 34.5, 44.0];
  const PELLETS = [2.0, 6.2, 12.0, 15.0, 20.5, 26.5, 31.0, 37.0, 40.5, 43.0, 46.0, 48.6];
  const score = PELLETS.filter((x) => t >= x).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((sx) => t >= sx).length * 2;
  const inc = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x); const lastInc = inc.length ? Math.max(...inc) : -9; const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const allItems = [...PELLETS, ...marks, ...STARS].sort((x, y) => x - y); const ringFill = allItems.filter((x) => t >= x).length / allItems.length;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999 }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {PELLETS.map((m, i) => { if (m / VIRT > 0.99) return null; const np = m / VIRT; const passed = t >= m; const pop = passed ? 1 : 1 + Math.sin(t * 3 + i) * 0.12; return (
        <div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 24, transform: `translateX(-50%) scale(${pop})`, width: 15, height: 15, borderRadius: "50%", background: passed ? "#FBF8F1" : "#7C93B4", border: `2px solid ${passed ? GOLD : "rgba(255,255,255,0.35)"}`, boxShadow: passed ? `0 0 8px ${GOLD}` : "none" }} />); })}
      {STARS.map((m, i) => { if (m / VIRT > 1.0) return null; const np = Math.min(1, m / VIRT); const passed = t >= m; const dt = passed ? t - m : 0; const pop = passed ? 1 + Math.max(0, 1 - dt * 2) * 0.6 : 1 + Math.sin(t * 2.6 + i) * 0.06; return (
        <div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 46, height: 46 }}><div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23, color: passed ? "#fff" : GOLD }}>★</div></div>); })}
      {marks.map((m, i) => { const np = m / VIRT; const passed = t >= m; const dt = passed ? t - m : 0; const pop = passed ? 1 + Math.max(0, 1 - dt * 2) * 0.62 : 1; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 54, height: 54 }}><div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? DEVC[i] : "#EDE7DB", border: `4px solid ${passed ? "#fff" : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: passed ? "#fff" : CLAY, boxShadow: passed ? `0 0 12px ${DEVC[i]}99` : "none" }}>{passed ? "\u2713" : i + 1}</div></div>); })}
      <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", left: -8, top: -8, width: 82, height: 82, borderRadius: "50%", background: `conic-gradient(${ringFill >= 0.999 ? GOLD : GREEN} ${ringFill * 360}deg, rgba(58,92,132,0.22) 0deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)" }} />
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${ringFill >= 0.999 ? GOLD : GREEN}` }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[8] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap" }}>{"\u2605 " + score}</div>
      </div>
      {(() => { const wake = ramp(t, VIRT - 2.4, VIRT); const shipped = t >= VIRT - 0.2; return (
        <div style={{ position: "absolute", right: 2, top: -20, width: 88, height: 88, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${(shipped ? GREEN : GOLD)}${wake > 0.3 ? "88" : "40"}, transparent 66%)`, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${shipped ? 1.08 : 0.86 + wake * 0.18})` }}>
            <svg width={52} height={58} viewBox="0 0 52 58"><path d="M26 2 L48 12 V30 C48 46 38 54 26 57 C14 54 4 46 4 30 V12 Z" fill={shipped ? GREEN : "#2A3550"} stroke={shipped ? "#9FE6C2" : GOLD} strokeWidth={3} />{shipped ? <path d="M15 29 l7 8 l16 -18" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /> : <text x={26} y={38} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={800} fill={GOLD}>{"\u2325"}</text>}</svg>
          </div>
          {shipped && <div style={{ position: "absolute", left: 44, top: 44 }}><Sparkles lf={f} at={VIRT - 0.2} x={0} y={0} n={12} spread={90} colors={[GREEN, "#fff", GOLD]} dur={0.9} /></div>}
        </div>); })()}
    </div>
  );
};

// ============================== MAIN ==============================
const ACC = [GOLD, SKY, DEVC[0], DEVC[1], DEVC[2], DEVC[3], AMBER, GOLD];
const BASES: [string, string][] = [["#0C1020", "#06080F"], ["#101626", "#080B14"], ["#0D1330", "#070A18"], ["#1A1206", "#0C0804"], ["#1E0F14", "#0E070A"], ["#0B1E14", "#06100A"], ["#141020", "#090710"], ["#1A1206", "#0C0804"]];
export const ClaudeDevReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [S0, S1, S2, S3, S4, S5, S6, S7];
  const LABELS = ["ship_while_you_sleep", "4 agents", "planner.spec", "coder.build", "tester.break", "reviewer.gate", "the_handoff", "you_wake_up"];
  const TINTS = ACC.map((c) => c + "60");
  const AMB = ACC.map((c) => c + "22");
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_dev.wav")} />
      <Audio loop src={staticFile("powers_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CUT) - 20, fr(CUT)], [0.4, 0.4, 0.4, 0.12], { extrapolateRight: "clamp" })} />
      {/* hook */}
      <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
      <Sfx at={1.6} src="lib_boom.wav" v={0.55} dur={1.3} />
      <Sfx at={1.62} src="rocket_explode.wav" v={0.32} dur={1.0} />
      <Sfx at={1.7} src="chimehi.wav" v={0.34} dur={1.0} />
      <Sfx at={2.9} src="sparkle.wav" v={0.3} dur={1.0} />
      {/* per-scene cut whoosh + accent */}
      {[L[1], L[2], L[3], L[4], L[5], L[6], L[7]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}>
          <Sfx at={tt - 0.9} src="lib_riser.wav" v={0.28} dur={0.9} />
          <Sfx at={tt - 0.05} src="lib_whoosh.wav" v={0.24} dur={0.4} />
          <Sfx at={tt} src={["swish.wav", "lib_pop.wav", "lib_confirm.wav", "impact.wav", "lib_boom.wav", "swooshup.wav", "lib_magic_reveal.wav"][i]} v={0.36} dur={0.6} />
        </React.Fragment>
      ))}
      {/* S0 hook: conveyor handoffs + shipped */}
      {[1.6, 2.7, 3.8].map((d, i) => <Sfx key={`hh${i}`} at={d} src="lib_click.wav" v={0.16} dur={0.2} />)}
      <Sfx at={4.1} src="lib_confirm.wav" v={0.34} dur={0.6} />
      {/* S2 PLANNER (spec building, smartest model) */}
      <Sfx at={L[2] + 0.5} src="lib_mactype.wav" v={0.24} dur={2.4} />
      {[1.2, 2.0, 2.8].map((d, i) => <React.Fragment key={`spec${i}`}><Sfx at={L[2] + d} src="lib_pop.wav" v={0.22} dur={0.25} /><Sfx at={L[2] + d + 0.01} src="lib_click.wav" v={0.14} dur={0.2} /></React.Fragment>)}
      <Sfx at={L[2] + 3.6} src="lib_notif.wav" v={0.3} dur={0.4} />{/* smartest model badge */}
      {[4.4, 5.0].map((d, i) => <Sfx key={`ec${i}`} at={L[2] + d} src="tick.wav" v={0.2} dur={0.22} />)}
      <Sfx at={L[2] + 6.4} src="lib_confirm.wav" v={0.32} dur={0.6} />
      {/* S3 CODER (blocks snapping, cheaper model) */}
      <Sfx at={L[3] + 0.4} src="lib_typing.wav" v={0.24} dur={3.0} />
      {[0.8, 1.5, 2.2, 2.9].map((d, i) => <React.Fragment key={`blk${i}`}><Sfx at={L[3] + d} src="thock.wav" v={0.3} dur={0.3} /><Sfx at={L[3] + d + 0.01} src="lib_click.wav" v={0.14} dur={0.2} /></React.Fragment>)}
      <Sfx at={L[3] + 3.6} src="c_coin.wav" v={0.26} dur={0.4} />{/* cheaper model $ */}
      <Sfx at={L[3] + 4.6} src="lib_confirm.wav" v={0.32} dur={0.6} />
      {/* S4 TESTER (wrecking ball breaks, tests pass) */}
      <Sfx at={L[4] + 0.2} src="metal_riser.wav" v={0.26} dur={1.0} />
      {[1.0, 1.8, 2.6, 3.4].map((d, i) => <React.Fragment key={`hit${i}`}><Sfx at={L[4] + d} src="impact.wav" v={0.32} dur={0.4} /><Sfx at={L[4] + d + 0.02} src="c_break.wav" v={0.2} dur={0.3} /></React.Fragment>)}
      {[1.3, 2.1, 2.9, 3.7].map((d, i) => <Sfx key={`tp${i}`} at={L[4] + d} src="ding.wav" v={0.22} dur={0.3} />)}
      <Sfx at={L[4] + 4.6} src="lib_correct.wav" v={0.34} dur={0.6} />
      {/* S5 REVIEWER (inspection, verdict stamp, gate) */}
      {[0.6, 1.2, 1.8, 2.4, 3.0].map((d, i) => <Sfx key={`insp${i}`} at={L[5] + d} src="tick.wav" v={0.2} dur={0.22} />)}
      <Sfx at={L[5] + 4.0} src="metal_riser.wav" v={0.3} dur={1.0} />
      <Sfx at={L[5] + 5.0} src="thock.wav" v={0.5} dur={0.5} />{/* REJECTED stamp */}
      <Sfx at={L[5] + 5.02} src="bonk.mp3" v={0.34} dur={0.5} />
      <Sfx at={L[5] + 7.6} src="lib_boom.wav" v={0.4} dur={0.9} />{/* APPROVED gate opens */}
      <Sfx at={L[5] + 7.65} src="chimehi.wav" v={0.36} dur={1.0} />
      <Sfx at={L[5] + 7.7} src="lib_confirm.wav" v={0.34} dur={0.6} />
      {/* S6 HANDOFF (relay + single command) */}
      <Sfx at={L[6] + 0.3} src="lib_mactype.wav" v={0.2} dur={0.6} />{/* > dev */}
      {[0.9, 1.9, 2.9, 3.9].map((d, i) => <React.Fragment key={`rel${i}`}><Sfx at={L[6] + d} src="swish.wav" v={0.3} dur={0.35} /><Sfx at={L[6] + d + 0.02} src="lib_pop.wav" v={0.22} dur={0.25} /></React.Fragment>)}
      <Sfx at={L[6] + 4.8} src="lib_confirm.wav" v={0.34} dur={0.6} />
      {/* S7 PAYOFF (wake + merged PR) */}
      <Sfx at={L[7] + 0.4} src="lib_magic_reveal.wav" v={0.34} dur={0.9} />
      <Sfx at={L[7] + 0.6} src="chimehi.wav" v={0.36} dur={1.0} />
      <Sfx at={L[7] + 0.7} src="crowd_cheer.wav" v={0.2} dur={1.6} />
      {/* CTA */}
      <Sfx at={L[8] + 0.1} src="lib_magic_reveal.wav" v={0.42} dur={1.0} />
      <Sfx at={L[8] + 0.15} src="lib_boom.wav" v={0.3} dur={0.8} />
      <Sfx at={L[8] + 0.3} src="chimehi.wav" v={0.38} dur={1.0} />
      <Sfx at={L[8] + 0.35} src="crowd_cheer.wav" v={0.22} dur={1.6} />
      {[0.5, 0.62, 0.74, 0.86].map((d, i) => <Sfx key={`cp${i}`} at={L[8] + d} src="lib_pop.wav" v={0.22} dur={0.3} />)}

      <StudioBg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          if (!scene(i)) return null;
          const lf = frame - Lf[i];
          const dur = Lf[i + 1] - Lf[i];
          const pushIn = interpolate(lf, [0, dur], [1.0, 1.04], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
          const entry = Math.max(0, 1 - lf / 6);
          const cscale = pushIn * (1 + entry * 0.12);
          const shakeX = entry > 0.01 ? Math.sin(lf * 3.2) * entry * 3.4 : 0;
          return (
            <Panel key={i} lf={lf} label={LABELS[i]} tint={TINTS[i]} ambient={AMB[i]} base={BASES[i]} cscale={cscale} shakeX={shakeX}>
              {React.createElement(Ss[i], { lf })}
            </Panel>
          );
        })}
        {scene(8) ? <DevCTA lf={frame - Lf[8]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
