import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_crew.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
// hook / here's-how / researcher / writer / scheduler / handoff / payoff / cta
const L = [0, 5.16, 6.24, 13.2, 19.88, 31.9, 37.74, 40.8];
const Lf = L.map(fr);
const CUT = 44.21;
// the 3 agents' accent colors
const CREWC = ["#2FA6C4", "#E0843A", "#3FAE82"];

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
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const splitAt = fr(1.6);
  const split = over(lf, splitAt, fr(0.9), Easing.out(Easing.back(1.4)));
  const pour = over(lf, fr(2.9), fr(1.8), Easing.out(Easing.cubic));
  const flash = lf >= splitAt && lf < splitAt + 6 ? 1 - (lf - splitAt) / 6 : 0;
  const pos: [number, number][] = [[-230, 0], [0, -16], [230, 0]];
  return (
    <>
      <div style={{ position: "absolute", inset: 0 }}>
        {split > 0.02 && Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ position: "absolute", left: cx, top: 400, width: 1200, height: 8, marginLeft: -600, marginTop: -4, background: "linear-gradient(90deg, transparent 44%, rgba(231,178,76,0.16) 50%, transparent 56%)", transformOrigin: "50% 50%", transform: `rotate(${i * 25 + lf * 0.6}deg)`, opacity: split, zIndex: 3 }} />)}
        <Floor />
        <SpotCone x={cx} top={40} topW={90} botW={430} h={540} color="rgba(255,236,190,0.13)" sway={4} lf={lf} />
        {/* sleeping moon + Zzz */}
        <div style={{ position: "absolute", left: 100, top: 80, width: 84, height: 84, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #F6F2E4, #C9CFE0)", boxShadow: "0 0 34px rgba(246,242,228,0.5)", zIndex: 4 }} />
        <Zzz lf={lf} x={840} y={140} />
        {/* the single idea bulb before the split */}
        {split < 0.5 && <div style={{ position: "absolute", left: cx - 46, top: 250, width: 92, zIndex: 8, transform: `scale(${1 - split * 0.4})`, opacity: 1 - split * 1.5 }}>
          <div style={{ width: 92, height: 92, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #FFF3C4, #E7B24C)", boxShadow: "0 0 44px rgba(231,178,76,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>💡</div>
        </div>}
        {/* splits into 3 agents */}
        {split > 0.02 && pos.map(([dx, dy], i) => { const sz = 168; return (
          <div key={i} style={{ position: "absolute", left: cx + dx * split - sz / 2, bottom: 150 + dy * split, width: sz, transform: `scale(${split})`, zIndex: 10, filter: `drop-shadow(0 0 16px ${CREWC[i]}bb)` }}>
            <Mascot lf={lf + i * 5} size={sz} tint={CREWC[i]} cheer={split > 0.7 ? 0.5 : 0} nodAmp={2.8} nodSpeed={7 + i} />
          </div>); })}
        {/* a week of content pours out */}
        {pour > 0.02 && [0, 1, 2, 3, 4, 5, 6].map((i) => { const ang = (-92 + (i - 3) * 15) * Math.PI / 180; const r = 250 * pour; return <div key={`p${i}`} style={{ position: "absolute", left: cx + Math.cos(ang) * r - 30, top: 300 + Math.sin(ang) * r * 0.5, width: 60, height: 76, borderRadius: 7, background: "#fff", border: `2.5px solid ${GOLD}`, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.5)", transform: `rotate(${(i - 3) * 7}deg) scale(${pour})`, opacity: pour, zIndex: 6, overflow: "hidden" }}><div style={{ height: 18, background: CREWC[i % 3] }} /></div>; })}
        {split > 0.5 && <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", transform: `scale(${Math.min(1.1, spr(lf, splitAt + 6, 9, 210))})`, zIndex: 34 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, color: GOLD, textShadow: "0 5px 0 rgba(90,50,10,0.5), 0 0 40px rgba(231,178,76,0.6)" }}>A WEEK OF CONTENT</span></div>}
        <Sparkles lf={lf} at={1.7} x={cx} y={380} n={22} spread={360} colors={[GOLD, "#fff", ...CREWC]} dur={1.0} />
      </div>
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E0", opacity: 0.6 * flash, zIndex: 50 }} />}
    </>
  );
};

// ============================== S1 — REHOOK: here's how ==============================
const S1: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <Floor a="#0C1810" b="#060D09" />
    <SpotCone x={506} top={40} topW={70} botW={380} h={520} color="rgba(140,230,180,0.12)" />
    {CREWC.map((c, i) => <div key={i} style={{ position: "absolute", left: 240 + i * 176, bottom: 118, width: 130, zIndex: 8, filter: `drop-shadow(0 0 10px ${c}88)` }}><Mascot lf={lf + i * 7} size={130} tint={c} nodAmp={3.2} nodSpeed={6 + i} cheer={0.3} /></div>)}
    <Stamp x={506} y={230} s={Math.min(1.1, spr(lf, fr(0.15), 9, 220))} text="HERE'S THE SETUP" c={GREEN} />
    <Sparkles lf={lf} at={0.3} x={506} y={240} n={14} spread={240} colors={[GREEN, "#fff", GOLD]} dur={0.7} />
  </>
);

// ============================== S2 — RESEARCHER: the trend board ==============================
const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const c = CREWC[0], cx = 636;
  const scan = Math.sin(lf / 14);
  const pull = over(lf, fr(3.4), fr(1.4), Easing.out(Easing.back(1.4)));
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 84% 74% at 60% 40%, ${c}26, transparent 72%)` }} />
      <Floor a="#0A1820" b="#060E14" />
      <SpotCone x={cx} top={30} topW={70} botW={420} h={540} color={`${c}26`} sway={3} lf={lf} />
      {/* the trend / crime board */}
      <div style={{ position: "absolute", left: 400, top: 130, width: 470, height: 250, borderRadius: 10, background: "linear-gradient(180deg,#1A2A30,#0E1A1E)", border: `3px solid ${c}66`, zIndex: 12 }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <div key={i} style={{ position: "absolute", left: 20 + (i % 4) * 112, top: 20 + Math.floor(i / 4) * 112, width: 90, height: 90, borderRadius: 6, background: `${["#E05C9E", "#5AA0DE", "#E7B24C", "#3FAE82"][i % 4]}55`, border: "2px solid rgba(255,255,255,0.4)", boxShadow: "0 4px 10px -4px rgba(0,0,0,0.6)" }}><div style={{ position: "absolute", left: 30, top: 34, width: 0, height: 0, borderLeft: "16px solid #fff", borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }} /></div>)}
        {/* red string */}
        <svg viewBox="0 0 470 250" width={470} height={250} style={{ position: "absolute", inset: 0 }}><polyline points="65,65 290,65 177,177 400,177" fill="none" stroke="#C44A3A" strokeWidth={2} opacity={0.7} /></svg>
        {/* magnifier sweep */}
        <div style={{ position: "absolute", left: 200 + scan * 150, top: 90, width: 70, height: 70, borderRadius: "50%", border: `5px solid ${c}`, background: "rgba(255,255,255,0.08)", zIndex: 6 }}><div style={{ position: "absolute", right: -20, bottom: -14, width: 30, height: 8, borderRadius: 4, background: c, transform: "rotate(45deg)" }} /></div>
      </div>
      {/* extracted ANGLE cards */}
      {pull > 0.02 && [0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 420 + i * 150, top: interpolate(pull, [0, 1], [250, 400]), transform: `scale(${pull}) rotate(${(i - 1) * 6}deg)`, padding: "8px 14px", borderRadius: 10, background: c, border: "3px solid #fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#fff", boxShadow: `0 0 18px ${c}88`, zIndex: 20 }}>ANGLE #{i + 1}</div>)}
      <div style={{ position: "absolute", left: 130, bottom: 120, width: 240, zIndex: 20 }}>
        <Mascot lf={lf} size={240} glasses={1} gaze={7} cheer={pull > 0.3 ? 0.4 : 0} />
      </div>
      {pull > 0.5 && <Stamp x={cx} y={110} s={Math.min(1.06, spr(lf, fr(3.4), 10, 210))} text="ANGLES WORKING NOW" c={c} />}
      <NameTag lf={lf} name="The Researcher" c={c} delay={fr(0.6)} x={250} y={636} />
      <Sparkles lf={lf} at={3.4} x={cx} y={330} n={14} spread={240} colors={[c, "#fff", GOLD]} dur={0.9} />
    </>
  );
};

// ============================== S3 — WRITER: the typewriter, hooks first ==============================
const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const c = CREWC[1], cx = 636;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 84% 74% at 60% 40%, ${c}26, transparent 72%)` }} />
      <Floor a="#1A1006" b="#0C0704" />
      <SpotCone x={cx} top={30} topW={70} botW={420} h={540} color={`${c}26`} sway={3} lf={lf} />
      {/* typewriter */}
      <div style={{ position: "absolute", left: cx - 90, top: 300, width: 180, height: 120, borderRadius: 12, background: "linear-gradient(180deg,#3A3430,#221E1A)", border: `3px solid ${c}`, zIndex: 12 }}>
        <div style={{ position: "absolute", left: 20, top: 20, right: 20, height: 40, background: "#1A1712", borderRadius: 6 }} />
        {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 24, top: 72 + r * 14, display: "flex", gap: 6 }}>{[0, 1, 2, 3, 4, 5, 6].map((k) => <div key={k} style={{ width: 14, height: 10, borderRadius: 3, background: "#5A544E" }} />)}</div>)}
      </div>
      {/* posts fire out, HOOK highlighted */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => { const t = ((lf / fr(4.5) + i * 0.13) % 1); if (t > 0.9) return null; return (
        <div key={i} style={{ position: "absolute", left: cx - 40 + (i - 3) * 20, top: interpolate(t, [0, 1], [290, 90]) - i * 4, width: 80, height: 100, borderRadius: 8, background: "#fff", border: `2.5px solid ${c}`, boxShadow: "0 8px 18px -8px rgba(0,0,0,0.5)", transform: `rotate(${(i - 3) * 6}deg)`, opacity: 1 - t * 0.3, zIndex: 14, overflow: "hidden" }}>
          <div style={{ height: 22, background: c, display: "flex", alignItems: "center", paddingLeft: 6 }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 10, color: "#fff" }}>HOOK</span></div>
          <div style={{ padding: 8 }}><div style={{ height: 5, width: "84%", borderRadius: 2, background: "#ddd", marginBottom: 5 }} /><div style={{ height: 5, width: "68%", borderRadius: 2, background: "#ddd" }} /></div>
        </div>); })}
      <div style={{ position: "absolute", left: 130, bottom: 120, width: 240, zIndex: 20 }}>
        <Mascot lf={lf} size={240} tint={lerpHex("#D97757", c, 0.15)} gaze={6} cheer={0.4} />
      </div>
      <Stamp x={cx} y={110} s={Math.min(1.06, spr(lf, fr(1.4), 10, 210))} text="A WEEK, IN YOUR VOICE" c={c} />
      <NameTag lf={lf} name="The Writer" c={c} delay={fr(0.6)} x={250} y={636} />
      <Sparkles lf={lf} at={2.0} x={cx} y={200} n={12} spread={220} colors={[c, "#fff", GOLD]} dur={0.9} />
    </>
  );
};

// ============================== S4 — SCHEDULER: launch control, holds for approval ==============================
const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const c = CREWC[2], cx = 620;
  const slots = 7, holdIdx = 4;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 86% 76% at 58% 38%, ${c}26, transparent 74%)` }} />
      <Floor a="#0C1A12" b="#060F0A" />
      <SpotCone x={cx} top={30} topW={80} botW={440} h={540} color={`${c}26`} sway={3} lf={lf} />
      {/* the 7 posts lined up on a runway/calendar, spaced out */}
      {Array.from({ length: slots }).map((_, i) => { const ap = over(lf, fr(1.0) + i * 4, fr(0.4), Easing.out(Easing.back(1.6))); const hold = i === holdIdx; const cleared = lf >= fr(4.0) + i * 4 && !hold; return (
        <div key={i} style={{ position: "absolute", left: 360 + i * 66, top: 180 + (hold ? -50 : 0), width: 56, height: 90, borderRadius: 8, background: hold ? "rgba(231,178,76,0.2)" : cleared ? "rgba(63,158,116,0.85)" : "rgba(255,255,255,0.08)", border: `2.5px solid ${hold ? GOLD : cleared ? "#7FE0B4" : "rgba(255,255,255,0.3)"}`, transform: `translateY(${(1 - ap) * -30}px) scale(${ap})`, opacity: ap, boxShadow: cleared ? `0 0 14px ${c}88` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: hold ? 24 : 18, color: hold ? GOLD : "#fff", zIndex: 14 }}>{hold ? "?" : cleared ? "✓" : i + 1}</div>); })}
      {/* HOLD FOR APPROVAL callout on the held one */}
      {lf > fr(5.5) && <div style={{ position: "absolute", left: 360 + holdIdx * 66 - 40, top: 96, transform: `scale(${Math.min(1.06, spr(lf, fr(5.5), 10, 210))}) rotate(-5deg)`, padding: "6px 12px", borderRadius: 10, background: GOLD, border: "3px solid #fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#3A2410", zIndex: 30, whiteSpace: "nowrap" }}>HOLD FOR YOU</div>}
      {/* only-one-allowed badge */}
      <div style={{ position: "absolute", left: cx - 120, top: 320, width: 240, textAlign: "center", zIndex: 16 }}><span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 999, background: "rgba(11,25,18,0.7)", border: `1.5px solid ${c}`, fontFamily: mono, fontSize: 15, color: "#9FE7C4" }}>the only one allowed to post</span></div>
      <div style={{ position: "absolute", left: 120, bottom: 118, width: 240, zIndex: 20 }}>
        <Mascot lf={lf} size={240} suit={1} gaze={6} cheer={0.4} />
        {/* headset */}
        <svg viewBox="0 0 200 200" width={240} height={240} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}><path d="M46 96 Q100 40 154 96" fill="none" stroke="#22262E" strokeWidth={11} strokeLinecap="round" /><rect x={28} y={88} width={24} height={36} rx={9} fill="#2A2E38" /><rect x={148} y={88} width={24} height={36} rx={9} fill="#2A2E38" /><path d="M52 116 Q76 146 92 136" fill="none" stroke="#22262E" strokeWidth={6} strokeLinecap="round" /><circle cx={94} cy={136} r={8} fill="#2A2E38" /></svg>
      </div>
      <NameTag lf={lf} name="The Scheduler" c={c} delay={fr(0.6)} x={240} y={636} />
      <Stamp x={cx} y={470} s={Math.min(1.06, spr(lf, fr(8.0), 10, 210))} text="NOTHING WEIRD GOES LIVE" c={c} rot={-3} />
      <Sparkles lf={lf} at={4.0} x={cx} y={220} n={12} spread={220} colors={[c, "#fff", GOLD]} dur={0.9} />
    </>
  );
};

// ============================== S5 — HANDOFF: the shared file relay ==============================
const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const pass = ((lf - fr(0.6)) / fr(4.2));
  const px = interpolate(Math.max(0, Math.min(1, pass)), [0, 0.5, 1], [180, 506, 830]);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 88% 76% at 50% 40%, rgba(90,160,222,0.18), transparent 74%)" }} />
      <Floor a="#0C1420" b="#060B12" />
      <SpotCone x={cx} top={30} topW={80} botW={440} h={540} color="rgba(90,160,222,0.14)" lf={lf} />
      {/* the 3 agents in a relay line */}
      {[180, 506, 830].map((x, i) => <div key={i} style={{ position: "absolute", left: x - 90, bottom: 120, width: 180, zIndex: 8, filter: `drop-shadow(0 0 12px ${CREWC[i]}88)` }}><Mascot lf={lf + i * 6} size={180} tint={CREWC[i]} gaze={i < 2 ? 6 : -6} cheer={0.4} nodAmp={3} nodSpeed={6 + i} /></div>)}
      {/* the shared file being passed */}
      <div style={{ position: "absolute", left: px - 34, top: 300 - Math.abs(Math.sin(pass * Math.PI * 2)) * 40, width: 68, height: 54, borderRadius: "8px 8px 6px 6px", background: grad("#F2C24E", "#D99A2E"), border: "3px solid #fff", boxShadow: "0 0 22px rgba(231,178,76,0.8)", zIndex: 24 }}>
        <div style={{ position: "absolute", left: 4, top: -6, width: 26, height: 8, borderRadius: "4px 4px 0 0", background: "#D99A2E" }} />
        <div style={{ position: "absolute", left: 12, top: 20, right: 12, height: 4, background: "rgba(0,0,0,0.3)", borderRadius: 2 }} />
      </div>
      <Stamp x={cx} y={200} s={Math.min(1.06, spr(lf, fr(1.0), 10, 210))} text="ONE SHARED FILE" c={SKY} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", zIndex: 20 }}><span style={{ fontFamily: mono, fontSize: 18, color: "rgba(180,210,250,0.8)" }}>runs start to finish on its own</span></div>
      <Sparkles lf={lf} at={2.0} x={px} y={300} n={10} spread={140} colors={[GOLD, "#fff", SKY]} dur={0.7} />
    </>
  );
};

// ============================== S6 — PAYOFF: wake up to a week queued ==============================
const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const sun = over(lf, fr(0.6), fr(1.6));
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 90% 80% at 50% ${interpolate(sun, [0, 1], [10, 30])}%, rgba(231,178,76,${0.14 + sun * 0.14}), transparent 74%)` }} />
      <div style={{ position: "absolute", left: cx - 70, top: interpolate(sun, [0, 1], [200, 70]), width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #FFE9A8, #E7B24C)", boxShadow: "0 0 60px rgba(231,178,76,0.55)", zIndex: 3 }} />
      <Floor a="#1A1206" b="#0C0804" />
      {/* sleeping founder */}
      <div style={{ position: "absolute", left: 130, bottom: 120, width: 220, zIndex: 20 }}>
        <Mascot lf={lf} size={220} nodAmp={1.4} nodSpeed={14} />
      </div>
      <Zzz lf={lf} x={340} y={470} />
      {/* the full week queued */}
      <div style={{ position: "absolute", left: 470, top: 200, width: 420, zIndex: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
        {Array.from({ length: 7 }).map((_, i) => { const ap = over(lf, fr(1.0) + i * 3, fr(0.3), Easing.out(Easing.back(1.6))); return <div key={i} style={{ width: 90, height: 66, borderRadius: 8, background: "rgba(63,158,116,0.85)", border: "2.5px solid #7FE0B4", transform: `scale(${ap})`, boxShadow: "0 0 12px rgba(63,158,116,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#fff" }}>✓</div>; })}
      </div>
      <Stamp x={680} y={140} s={Math.min(1.08, spr(lf, fr(1.6), 9, 210))} text="A WEEK, ALREADY QUEUED" c={GREEN} />
      <Sparkles lf={lf} at={1.6} x={680} y={260} n={16} spread={280} colors={[GREEN, GOLD, "#fff"]} dur={1.0} />
    </>
  );
};

// ============================== CTA ==============================
const CrewCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const kw = Math.min(1.08, spr(lf, fr(0.1), 11, 200));
  const cta = Math.min(1.06, spr(lf, fr(0.8), 12, 200));
  const cx = 506;
  const roles = ["The Researcher", "The Writer", "The Scheduler"];
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H, borderRadius: 36, background: "linear-gradient(158deg, #FBF6EC 0%, #F3E9D8 58%, #EAF3EE 100%)", boxShadow: SH, overflow: "hidden", border: "2px solid rgba(210,114,78,0.35)" }}>
      <div style={{ position: "absolute", left: "50%", top: -40, width: 860, height: 520, marginLeft: -430, background: "radial-gradient(ellipse 42% 90% at 50% 0%, rgba(231,178,76,0.34), transparent 66%)" }} />
      <SpotCone x={cx} top={0} topW={80} botW={380} h={580} color="rgba(255,246,220,0.12)" />
      {CREWC.map((c, i) => { const s = Math.min(1.06, spr(lf, fr(0.3) + i * 3, 12, 210)); const x = cx + (i - 1) * 220; const cm = [{ glasses: 1 }, {}, { suit: 1 }][i]; return (
        <div key={i} style={{ position: "absolute", left: x - 90, top: 300, width: 180, transform: `translateY(${(1 - s) * 30}px) scale(${s})`, zIndex: 6, filter: `drop-shadow(0 0 12px ${c}88)`, textAlign: "center" }}>
          <Mascot lf={lf + i * 5} size={180} tint={c} cheer={1} nodAmp={3.4} nodSpeed={7 + i} {...cm} />
          <div style={{ marginTop: -6, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: INK }}>{roles[i]}</div>
        </div>); })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 42, textAlign: "center", transform: `scale(${kw})`, zIndex: 8 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 128, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 4px 0 rgba(150,60,30,0.18)" }}>CREW</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", transform: `scale(${cta})`, zIndex: 9 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 32px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), border: "2.5px solid #F3B292", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 35, color: "#fff", boxShadow: "0 0 34px rgba(233,130,92,0.6)" }}>comment <span style={{ color: "#FFE9B0" }}>CREW</span> for the setup</span>
      </div>
      <Sparkles lf={lf} at={0.3} x={cx} y={160} n={22} spread={420} colors={[GOLD, "#fff", ...CREWC]} dur={1.1} />
      <Confetti lf={lf} n={50} colors={[CLAY, GOLD, ...CREWC]} top={-30} h={860} />
    </div>
  );
};

// ============================== studio bg ==============================
const StudioBg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(178deg, #F7F0E4 0%, #F3EAD9 44%, #F1E4D0 72%, #EADAC2 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 720, background: "radial-gradient(ellipse 72% 62% at 50% 0%, rgba(255,251,244,0.7), transparent 72%)" }} />
      <div style={{ position: "absolute", left: -120, right: -120, bottom: 0, height: 560, borderRadius: "50% 50% 0 0 / 20% 20% 0 0", background: "linear-gradient(180deg, rgba(228,206,176,0.0), rgba(220,194,158,0.6))" }} />
      {CREWC.map((c, i) => <div key={i} style={{ position: "absolute", left: (i % 2 ? 970 : 120) - 300 + Math.sin(f / 50 + i) * 22, top: (i < 2 ? 200 : 1650) - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${c}, transparent 62%)`, opacity: 0.09, filter: "blur(16px)" }} />)}
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
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54, color: INK, letterSpacing: "0.005em", lineHeight: 1.04, display: "block" }}><span style={{ color: CLAY }}>3 AGENTS</span> = A WEEK<br />OF CONTENT, ASLEEP</span>
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
  const f = useCurrentFrame(); const t = f / FPS; const VIRT = L[7]; const p = Math.min(1, t / VIRT);
  const marks = [L[2], L[3], L[4]];
  const score = marks.filter((m) => t >= m).length;
  const inc = marks.filter((x) => t >= x); const lastInc = inc.length ? Math.max(...inc) : -9; const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const ringFill = marks.filter((x) => t >= x).length / marks.length;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999 }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {marks.map((m, i) => { const np = m / VIRT; const passed = t >= m; const dt = passed ? t - m : 0; const pop = passed ? 1 + Math.max(0, 1 - dt * 2) * 0.6 : 1; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 4, transform: "translateX(-50%)", width: 50, height: 50 }}><div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? CREWC[i] : "#EDE7DB", border: `4px solid ${passed ? "#fff" : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: passed ? "#fff" : CLAY, boxShadow: passed ? `0 0 12px ${CREWC[i]}88` : "none" }}>{passed ? "✓" : i + 1}</div></div>); })}
      <div style={{ position: "absolute", left: `${Math.min(p, 0.92) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", left: -8, top: -8, width: 82, height: 82, borderRadius: "50%", background: `conic-gradient(${GOLD} ${ringFill * 360}deg, rgba(58,92,132,0.22) 0deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)" }} />
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GOLD}` }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[7] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap" }}>{score + "/3 agents"}</div>
      </div>
    </div>
  );
};

// ============================== MAIN ==============================
const ACC = [GOLD, GREEN, CREWC[0], CREWC[1], CREWC[2], SKY, GOLD];
const BASES: [string, string][] = [["#170F14", "#0A0710"], ["#0E1A12", "#060F0A"], ["#0B1620", "#060E14"], ["#1A1006", "#0C0704"], ["#0B180F", "#060E09"], ["#0C1420", "#060B12"], ["#1A1206", "#0C0804"]];
export const ClaudeCrewReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [S0, S1, S2, S3, S4, S5, S6];
  const LABELS = ["the idea", "here's how", "researcher", "writer", "scheduler", "the handoff", "you wake up"];
  const TINTS = ACC.map((c) => c + "60");
  const AMB = ACC.map((c) => c + "22");
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_crew.wav")} />
      <Audio loop src={staticFile("powers_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CUT) - 20, fr(CUT)], [0.4, 0.4, 0.4, 0.12], { extrapolateRight: "clamp" })} />
      {/* hook */}
      <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
      <Sfx at={1.6} src="lib_boom.wav" v={0.55} dur={1.3} />
      <Sfx at={1.62} src="rocket_explode.wav" v={0.32} dur={1.0} />
      <Sfx at={1.7} src="chimehi.wav" v={0.34} dur={1.0} />
      <Sfx at={2.9} src="sparkle.wav" v={0.3} dur={1.0} />
      {/* per-scene cut whoosh + accent */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}>
          <Sfx at={tt - 0.8} src="lib_riser.wav" v={0.26} dur={0.8} />
          <Sfx at={tt} src={["lib_confirm.wav", "swish.wav", "lib_pop.wav", "impact.wav", "swooshup.wav", "lib_magic_reveal.wav"][i]} v={0.34} dur={0.6} />
        </React.Fragment>
      ))}
      {/* scene accents */}
      <Sfx at={L[2] + 3.4} src="lib_correct.wav" v={0.32} dur={0.6} />
      {[0.3, 0.6, 0.9, 1.2, 1.5].map((d, i) => <Sfx key={`tw${i}`} at={L[3] + d} src="tick.wav" v={0.2} dur={0.25} />)}
      <Sfx at={L[4] + 5.5} src="lib_notif.wav" v={0.32} dur={0.4} />
      <Sfx at={L[4] + 8.0} src="lib_confirm.wav" v={0.34} dur={0.6} />
      {[0.6, 2.7].map((d, i) => <Sfx key={`hd${i}`} at={L[5] + d} src="swish.wav" v={0.3} dur={0.4} />)}
      <Sfx at={L[6] + 1.6} src="chimehi.wav" v={0.34} dur={0.9} />
      {/* cta */}
      <Sfx at={L[7] + 0.1} src="lib_magic_reveal.wav" v={0.42} dur={1.0} />
      <Sfx at={L[7] + 0.3} src="chimehi.wav" v={0.38} dur={1.0} />
      <Sfx at={L[7] + 0.4} src="crowd_cheer.wav" v={0.22} dur={1.6} />

      <StudioBg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
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
        {scene(7) ? <CrewCTA lf={frame - Lf[7]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
