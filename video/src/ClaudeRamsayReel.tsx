import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_ramsay.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
// ===== Hell's Kitchen palette: fiery signage red, molten flame, blue-steel stations, brass =====
const HKRED = "#E23B2E", HKREDD = "#A81E15", HKR_GLOW = "#FF5A3C";
const FLAME = "#FF7A1A", FLAMEY = "#FFC23D", FLAME_CORE = "#FFE59A", EMBER = "#FF8A3D";
const STEEL = "#9AA6B6", STEELD = "#5C6A7E", STEEL_HI = "#D6DEE8", STEELDK = "#39434F";
const BRASS = "#E8B54A", BRASSD = "#B07E1E";
const CHEFW = "#F6F3EC", CHEFWD = "#DED8CC", SKIN = "#E8B48C", SKIND = "#CB8E63";
const HAIR = "#D9B968", HAIRD = "#B08A38", HAIRG = "#CFC7B4"; // ash-blond + grey streak
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
// hook / here's-how / researcher / writer / scheduler / handoff / payoff / cta
// hook / yes-man / built-the-agent / the-trick / demo(tears-apart) / why-it-works(ego) / the-rule / cta
const L = [0.0, 7.779, 14.817, 26.375, 36.548, 42.875, 51.356, 56.298];
const Lf = L.map(fr);
const CUT = 57.52;
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

// ============================== RAMSAY CHEF — the recurring hero (clay Claude as Gordon Ramsay) ==============================
// articulated arm: white chef sleeve -> elbow -> forearm -> clay hand (point / open / fist / rest)
const chefArm = (sx: number, sy: number, upAng: number, upLen: number, foreAng: number, foreLen: number, hand: string, C: string, w = 18) => {
  const r1 = (upAng * Math.PI) / 180; const ex = sx + Math.cos(r1) * upLen, ey = sy + Math.sin(r1) * upLen;
  const r2 = (foreAng * Math.PI) / 180; const hx = ex + Math.cos(r2) * foreLen, hy = ey + Math.sin(r2) * foreLen;
  return (
    <g>
      {/* upper sleeve */}
      <rect x={sx} y={sy - w / 2} width={upLen + w / 2} height={w} rx={w / 2} fill={CHEFW} transform={`rotate(${upAng} ${sx} ${sy})`} />
      <rect x={sx} y={sy - w / 2} width={upLen + w / 2} height={w * 0.32} rx={w / 2} fill="rgba(255,255,255,0.5)" transform={`rotate(${upAng} ${sx} ${sy})`} />
      {/* elbow + forearm */}
      <circle cx={ex} cy={ey} r={w / 2} fill={CHEFW} />
      <rect x={ex} y={ey - w / 2} width={foreLen} height={w} rx={w / 2} fill={CHEFW} transform={`rotate(${foreAng} ${ex} ${ey})`} />
      <rect x={ex} y={ey - w / 2} width={foreLen} height={w * 0.3} rx={w / 2} fill="rgba(255,255,255,0.45)" transform={`rotate(${foreAng} ${ex} ${ey})`} />
      {/* rolled cuff band */}
      <rect x={ex + foreLen - w * 0.5} y={ey - w / 2 - 1} width={w * 0.55} height={w + 2} rx={3} fill={CHEFWD} transform={`rotate(${foreAng} ${ex} ${ey})`} />
      {/* hand (clay, matching the critter) */}
      {hand === "point" ? (
        <g transform={`rotate(${foreAng} ${hx} ${hy})`}>
          <circle cx={hx} cy={hy} r={w * 0.6} fill={C} />
          <rect x={hx - w * 0.1} y={hy - w * 0.24} width={w * 1.15} height={w * 0.46} rx={w * 0.22} fill={C} />
          <rect x={hx - w * 0.1} y={hy - w * 0.24} width={w * 1.15} height={w * 0.18} rx={w * 0.2} fill="rgba(255,255,255,0.22)" />
        </g>
      ) : hand === "open" ? (
        <g transform={`rotate(${foreAng} ${hx} ${hy})`}>
          <ellipse cx={hx + w * 0.2} cy={hy} rx={w * 0.72} ry={w * 0.56} fill={C} />
          <ellipse cx={hx + w * 0.2} cy={hy - w * 0.18} rx={w * 0.6} ry={w * 0.22} fill="rgba(255,255,255,0.2)" />
        </g>
      ) : hand === "fist" ? (
        <g>
          <circle cx={hx} cy={hy} r={w * 0.72} fill={C} />
          <circle cx={hx} cy={hy - w * 0.2} r={w * 0.6} fill="rgba(255,255,255,0.14)" />
        </g>
      ) : (
        <circle cx={hx} cy={hy} r={w * 0.62} fill={C} />
      )}
    </g>
  );
};

// pose -> [leftArm, rightArm] as chefArm(...) calls. shoulders at L(44,112) R(156,112)
const chefArms = (pose: string, C: string, jab: number, pt: number) => {
  switch (pose) {
    case "point": // right arm extended, index out to the right (pt = 0..1 extension)
      return <>{chefArm(48, 118, 108, 24, 100, 22, "fist", C)}{chefArm(156, 108, 4 - pt * 3, 30 + pt * 8, 0 - pt * 2, 30 + pt * 6, "point", C)}</>;
    case "present": // right arm out, open palm presenting to the right
      return <>{chefArm(48, 118, 108, 24, 100, 22, "rest", C)}{chefArm(154, 110, 26, 28, -6, 30, "open", C)}</>;
    case "cross": // both forearms folded across the chest (upper arms down, forearms angle inward)
      return <>{chefArm(54, 114, 118, 20, 18, 62, "fist", C)}{chefArm(146, 114, 62, 20, 162, 62, "fist", C)}</>;
    case "jab": // right finger jab forward, animated
      return <>{chefArm(48, 118, 108, 24, 100, 22, "fist", C)}{chefArm(150, 112, 12 - jab * 8, 26 + jab * 6, 6 - jab * 6, 26 + jab * 8, "point", C)}</>;
    case "hipshake": // both hands on hips (stern)
      return <>{chefArm(52, 112, 118, 22, 40, 22, "fist", C)}{chefArm(150, 112, 62, 22, 140, 22, "fist", C)}</>;
    case "armsup": // both arms thrown up AND OUT (exasperated "WHY?!"), hands clear of the head — jab drives a shake
      return <>{chefArm(48, 110, -122 - jab * 6, 28, -116 - jab * 8, 28, "fist", C)}{chefArm(152, 110, -58 + jab * 6, 28, -64 + jab * 8, 28, "fist", C)}</>;
    case "cook": // right arm forward-down working the range (draw a pan/tool at the hand ~x195,y135)
      return <>{chefArm(48, 118, 108, 24, 100, 22, "rest", C)}{chefArm(150, 116, 34 + jab * 8, 24, 18 + jab * 10, 24, "fist", C)}</>;
    case "facepalm": // right hand dragged down the face (disappointment)
      return <>{chefArm(48, 118, 108, 24, 100, 22, "rest", C)}{chefArm(150, 110, -145, 22, -178, 20, "open", C)}</>;
    case "slam": // both fists slamming down on the pass (jab = impact bounce)
      return <>{chefArm(54, 112, 96 + jab * 6, 22, 92 + jab * 8, 30, "fist", C)}{chefArm(146, 112, 84 - jab * 6, 22, 88 - jab * 8, 30, "fist", C)}</>;
    case "taste": // right hand up to the mouth holding a spoon (MasterChef tasting)
      return <>{chefArm(48, 118, 108, 24, 100, 22, "rest", C)}{chefArm(150, 112, -128, 22, -150, 20, "open", C)}</>;
    default: // rest
      return <>{chefArm(48, 116, 104, 26, 96, 24, "rest", C)}{chefArm(154, 116, 76, 26, 84, 24, "rest", C)}</>;
  }
};

// the clay Claude critter dressed as Gordon Ramsay: ash-blond spikes, deep brow, forehead creases, stubble, whites + red neckerchief
const RamsayChef: React.FC<{ lf: number; size?: number; pose?: string; tint?: string; yell?: number; gaze?: number; brow?: number; toque?: number; nod?: number }> =
  ({ lf, size = 250, pose = "rest", tint, yell = 0, gaze = 0, brow = 1, toque = 0, nod = 1 }) => {
    const C = tint || CLAY;
    const breathe = bob(lf, 2.0 * nod, 66, 0);
    const jab = (pose === "jab" || pose === "armsup" || pose === "slam") ? (0.5 + Math.sin(lf / 3.2) * 0.5) : 0;
    const pt = pose === "point" ? 1 : 0;
    const shake = yell > 0.2 ? (seed(Math.floor(lf * 2)) - 0.5) * 3.4 * yell : 0;
    const mouthOpen = yell;
    const blink = (lf % 96) < 5 && yell < 0.3 ? 1 : 0;
    return (
      <div style={{ width: size, height: size, position: "relative", transform: `translate(${shake}px, ${breathe}px)` }}>
        <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: "visible" }} shapeRendering="geometricPrecision">
          {/* BACK ARM drawn behind body for depth on some poses */}
          {(pose === "point" || pose === "jab" || pose === "present") && chefArm(48, 118, 108, 24, 100, 22, "rest", C)}
          {/* torso / clay body */}
          <rect x={34} y={44} width={132} height={102} rx={6} fill={C} />
          <rect x={34} y={44} width={132} height={12} rx={6} fill="rgba(255,255,255,0.15)" />
          <rect x={34} y={120} width={132} height={10} fill="rgba(0,0,0,0.10)" />
          {/* legs */}
          <rect x={52} y={146} width={17} height={38} fill={C} />
          <rect x={77} y={146} width={17} height={38} fill={C} />
          <rect x={124} y={146} width={17} height={38} fill={C} />
          <rect x={149} y={146} width={17} height={38} fill={C} />
          <rect x={52} y={178} width={17} height={6} fill="rgba(0,0,0,0.18)" />
          <rect x={124} y={178} width={17} height={6} fill="rgba(0,0,0,0.18)" />
          {/* ==== double-breasted chef whites ==== */}
          <rect x={34} y={104} width={132} height={42} rx={5} fill={CHEFW} />
          <rect x={34} y={104} width={132} height={7} fill="rgba(255,255,255,0.6)" />
          <path d="M34 104 L100 104 L92 146 L34 146 Z" fill={CHEFW} />
          <path d="M166 104 L100 104 L108 146 L166 146 Z" fill="#EFE9DD" />
          <polygon points="100,104 84,116 100,126 116,116" fill={CHEFWD} />
          {/* two button columns */}
          {[116, 130, 144].map((yy, i) => (<React.Fragment key={i}><rect x={78} y={yy} width={6} height={6} rx={1} fill={STEELDK} /><rect x={116} y={yy} width={6} height={6} rx={1} fill={STEELDK} /></React.Fragment>))}
          {/* red neckerchief knot at the collar */}
          <path d="M90 103 L110 103 L106 112 L100 108 L94 112 Z" fill={HKRED} />
          <circle cx={100} cy={105} r={4.5} fill={HKREDD} />
          {/* ==== ARMS (front) ==== */}
          {chefArms(pose, C, jab, pt)}
          {/* ==== HEAD FEATURES ==== */}
          {/* stubble jaw shading */}
          <rect x={44} y={92} width={112} height={16} rx={3} fill="rgba(30,24,20,0.14)" />
          {Array.from({ length: 22 }).map((_, i) => (<circle key={"st" + i} cx={50 + (i % 11) * 10} cy={95 + Math.floor(i / 11) * 8} r={1.1} fill="rgba(20,16,14,0.4)" />))}
          {/* forehead worry creases (Ramsay signature) */}
          <rect x={62} y={47} width={76} height={2.4} rx={1} fill="rgba(20,16,14,0.2)" />
          <rect x={66} y={52} width={68} height={2.4} rx={1} fill="rgba(20,16,14,0.16)" />
          {/* deep furious V brow */}
          {brow > 0 && (<>
            <polygon points="58,58 92,70 92,78 58,66" fill="#141110" />
            <polygon points="142,58 108,70 108,78 142,66" fill="#141110" />
            <rect x={96} y={63} width={8} height={12} rx={2} fill="rgba(20,16,14,0.5)" />
          </>)}
          {/* intense squint eyes */}
          {blink ? (<>
            <rect x={68 + gaze} y={86} width={18} height={3} rx={1.5} fill="#141110" />
            <rect x={114 + gaze} y={86} width={18} height={3} rx={1.5} fill="#141110" />
          </>) : (<>
            <rect x={68 + gaze} y={81} width={18} height={11} rx={2.5} fill="#F2EFE9" />
            <rect x={114 + gaze} y={81} width={18} height={11} rx={2.5} fill="#F2EFE9" />
            <rect x={75 + gaze * 1.4} y={82} width={9} height={9} rx={2} fill="#2B2320" />
            <rect x={121 + gaze * 1.4} y={82} width={9} height={9} rx={2} fill="#2B2320" />
            <rect x={77 + gaze * 1.4} y={83} width={3} height={3} fill="#fff" />
            <rect x={123 + gaze * 1.4} y={83} width={3} height={3} fill="#fff" />
          </>)}
          {/* nose */}
          <rect x={97} y={92} width={7} height={5} rx={2} fill="rgba(20,16,14,0.18)" />
          {/* mouth: stern grimace -> open yell */}
          {mouthOpen > 0.35 ? (
            <g>
              <rect x={85} y={99 - mouthOpen * 2} width={30} height={11 + mouthOpen * 10} rx={7} fill="#3A1512" />
              <rect x={89} y={100} width={22} height={4} rx={2} fill="#F2EFE9" />
              <rect x={91} y={103 + mouthOpen * 6} width={18} height={5} rx={2.5} fill="#C24A3A" />
            </g>
          ) : (
            <path d={`M84 102 Q100 ${97 - brow * 2} 116 102`} fill="none" stroke="#3A2018" strokeWidth={4} strokeLinecap="round" />
          )}
          {/* ==== HAIR: messy ash-blond spikes (or toque) ==== */}
          {toque > 0 ? (<>
            <rect x={54} y={28} width={92} height={20} rx={4} fill={CHEFW} />
            <rect x={56} y={6} width={26} height={26} rx={11} fill={CHEFW} /><rect x={86} y={2} width={28} height={30} rx={13} fill="#FBF9F4" /><rect x={118} y={6} width={26} height={26} rx={11} fill={CHEFW} />
            <rect x={54} y={40} width={92} height={8} rx={3} fill={CHEFWD} />
          </>) : (<>
            {/* sideburns down the temples */}
            <path d="M40 52 Q36 68 45 80 L54 78 Q50 62 52 52 Z" fill={HAIRD} />
            <path d="M160 52 Q164 68 155 80 L146 78 Q150 62 148 52 Z" fill={HAIRD} />
            {/* full tousled hair mass, swept up and over */}
            <path d="M38 60 Q34 28 62 22 Q84 12 100 16 Q120 10 140 24 Q166 30 162 60 Q150 50 138 54 Q120 44 100 48 Q78 44 62 54 Q50 50 38 60 Z" fill={HAIRD} />
            <path d="M42 56 Q40 30 66 25 Q88 15 104 20 Q124 16 138 28 Q156 34 156 55 Q142 46 128 51 Q108 43 92 48 Q74 45 60 53 Q50 49 42 56 Z" fill={HAIR} />
            {/* soft swept tufts (rounded, irregular) */}
            {[[52, 30, 62, 22, 70, 34], [72, 24, 84, 16, 92, 30], [94, 22, 106, 15, 116, 28], [116, 24, 128, 19, 137, 32], [134, 30, 146, 25, 151, 38]].map((s, i) => (
              <path key={"tf" + i} d={`M${s[0]},${s[1]} Q${s[2]},${s[3]} ${s[4]},${s[5]} Q${(s[0] + s[4]) / 2},${s[5] + 4} ${s[0]},${s[1]} Z`} fill={i % 2 ? HAIR : HAIRD} />
            ))}
            {/* grey streak at the temple + sheen */}
            <path d="M50 54 Q52 38 60 30 Q57 44 58 54 Z" fill={HAIRG} />
            <path d="M64 30 Q90 20 120 28" fill="none" stroke="rgba(255,248,225,0.4)" strokeWidth={3} strokeLinecap="round" />
          </>)}
          {/* yelling steam */}
          {yell > 0.25 && [0, 1].map((i) => { const p = ((lf + i * 11) % 30) / 30; return <circle key={"ys" + i} cx={i ? 156 : 44} cy={40 - p * 26} r={5 + p * 8} fill="#F4F1EA" opacity={(1 - p) * 0.5 * yell} />; })}
        </svg>
      </div>
    );
  };

// ============================== COOKING ACTION TOOLKIT (fast-paced kitchen motion) ==============================
// a single licking flame (range burner)
const CookFlame: React.FC<{ lf: number; x: number; y: number; s?: number; ph?: number }> = ({ lf, x, y, s = 56, ph = 0 }) => {
  const fl = 0.8 + Math.sin(lf / 3.4 + ph) * 0.2; const sway = Math.sin(lf / 5.5 + ph) * 4;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * 1.5, width: s, height: s * 1.6, transform: `translateX(${sway}px) scaleY(${fl})`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 0,72% 44%,64% 100%,36% 100%,28% 44%)", background: `radial-gradient(ellipse at 50% 100%, ${FLAMEY} 0%, ${FLAME} 48%, ${HKREDD} 100%)`, filter: `drop-shadow(0 0 ${13 * fl}px ${FLAME}aa)` }} />
      <div style={{ position: "absolute", left: "30%", right: "30%", top: "44%", bottom: "4%", clipPath: "polygon(50% 0,76% 52%,50% 100%,24% 52%)", background: FLAME_CORE }} />
    </div>
  );
};
// a flambé fireball that WHOOSHES up around time `at` (seconds), then dies
const Flambe: React.FC<{ lf: number; at: number; x: number; y: number; s?: number }> = ({ lf, at, x, y, s = 180 }) => {
  const p = ramp(lf, fr(at), fr(at + 0.7)); if (p <= 0.001 || p >= 0.999) return null;
  const rise = Math.sin(p * Math.PI); // 0..1..0
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s * rise, width: s, height: s * 1.5, pointerEvents: "none", opacity: rise }}>
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: s * (0.5 + rise * 0.5), height: s * 1.4 * rise, transform: "translateX(-50%)", clipPath: "polygon(50% 0,70% 38%,88% 100%,12% 100%,30% 38%)", background: `radial-gradient(ellipse at 50% 100%, ${FLAME_CORE} 0%, ${FLAMEY} 34%, ${FLAME} 66%, ${HKRED} 100%)`, filter: `blur(1px) drop-shadow(0 0 ${30 * rise}px ${FLAME})` }} />
      {Array.from({ length: 9 }).map((_, i) => { const a = seed(i) * 6.28; const d = rise * s * (0.4 + seed(i * 2) * 0.7); return <div key={i} style={{ position: "absolute", left: s / 2 + Math.cos(a) * d, top: s * 1.4 - rise * s - Math.abs(Math.sin(a)) * d, width: 8, height: 8, borderRadius: "50%", background: seed(i * 3) > 0.5 ? FLAMEY : EMBER, opacity: rise * (1 - seed(i)), boxShadow: `0 0 8px ${FLAME}` }} />; })}
    </div>
  );
};
// frying pan tossing food in a repeating arc (very "cooking")
const PanToss: React.FC<{ lf: number; x: number; y: number; s?: number; period?: number; food?: string[]; handle?: string }> = ({ lf, x, y, s = 150, period = 30, food = ["#C46B32", "#7FA24A", "#D9A441", "#B24A2E"], handle = "left" }) => {
  const t = (lf % period) / period; const jerk = Math.sin(t * Math.PI); const tilt = -jerk * 20 * (handle === "left" ? 1 : -1);
  const px = s * 0.5;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.8, pointerEvents: "none" }}>
      {Array.from({ length: 5 }).map((_, i) => { const ph = ((lf + i * (period / 5)) % period) / period; const arc = Math.sin(ph * Math.PI); const fs = 11 + seed(i) * 7; return <div key={i} style={{ position: "absolute", left: px - s * 0.16 + i * (s * 0.08), top: s * 0.2 - arc * s * 0.52, width: fs, height: fs * 0.82, borderRadius: 4, background: food[i % food.length], transform: `rotate(${ph * 400}deg)`, opacity: arc > 0.03 ? 1 : 0, boxShadow: "0 2px 3px rgba(0,0,0,0.35)" }} />; })}
      <div style={{ position: "absolute", left: 0, top: s * 0.24, width: s, height: s * 0.3, transformOrigin: `${handle === "left" ? "18%" : "82%"} 50%`, transform: `rotate(${tilt}deg)` }}>
        <div style={{ position: "absolute", left: s * 0.16, right: s * 0.16, top: 0, bottom: 0, borderRadius: "18% 18% 50% 50% / 20% 20% 100% 100%", background: `linear-gradient(180deg, ${STEELDK} 0%, #14181E 100%)`, boxShadow: "inset 0 5px 0 rgba(255,255,255,0.09), 0 5px 8px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: s * 0.2, right: s * 0.2, top: s * 0.04, height: s * 0.07, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", [handle === "left" ? "left" : "right"]: -s * 0.28, top: "36%", width: s * 0.34, height: s * 0.08, borderRadius: 6, background: "linear-gradient(180deg,#3A2A20,#221610)", transformOrigin: `${handle === "left" ? "100%" : "0%"} 50%`, transform: `rotate(${handle === "left" ? -16 : 16}deg)` } as any} />
      </div>
    </div>
  );
};
// cutting board with a knife chopping and veg bits flying (very "cooking")
const ChopBoard: React.FC<{ lf: number; x: number; y: number; s?: number; speed?: number }> = ({ lf, x, y, s = 150, speed = 5 }) => {
  const chopP = Math.max(0, Math.sin(lf / speed)); const knifeLift = chopP * s * 0.34;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.7, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: s, height: s * 0.14, borderRadius: 6, background: "linear-gradient(180deg,#CFA369,#A9793F)", boxShadow: "0 4px 6px rgba(0,0,0,0.35)" }} />
      {[0.16, 0.28, 0.4].map((fx, i) => <div key={"v" + i} style={{ position: "absolute", left: s * fx, bottom: s * 0.13, width: s * 0.1, height: s * 0.07, borderRadius: 3, background: "#7FA24A" }} />)}
      {Array.from({ length: 7 }).map((_, i) => { const ph = ((lf + i * 6) % 20) / 20; return <div key={"c" + i} style={{ position: "absolute", left: s * 0.5 + Math.cos(i * 1.3) * ph * s * 0.55, bottom: s * 0.14 + Math.sin(ph * Math.PI) * s * 0.34, width: 6, height: 5, borderRadius: 2, background: i % 2 ? "#8FB055" : "#D9A441", opacity: 1 - ph }} />; })}
      <div style={{ position: "absolute", left: s * 0.46, bottom: s * 0.14 + knifeLift, width: s * 0.06, height: s * 0.34, transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "62%", background: "linear-gradient(90deg,#B9C2CC,#EAF0F6,#B9C2CC)", borderRadius: "2px 2px 0 0" }} />
        <div style={{ position: "absolute", left: "-10%", top: "58%", width: "120%", height: "10%", background: STEELDK }} />
        <div style={{ position: "absolute", left: "15%", top: "68%", width: "70%", height: "34%", background: "#2A1C14", borderRadius: 3 }} />
      </div>
    </div>
  );
};
// rising steam jet
const SteamJet: React.FC<{ lf: number; x: number; y: number; n?: number; h?: number }> = ({ lf, x, y, n = 5, h = 150 }) => (
  <>{Array.from({ length: n }).map((_, i) => { const life = 42 + seed(i) * 24; const t = (lf + seed(i * 3) * life) % life; const p = t / life; const r = 12 + seed(i * 2) * 14; return <div key={i} style={{ position: "absolute", left: x + Math.sin(p * 4 + i) * 16 - r / 2, top: y - p * h, width: r, height: r, borderRadius: "50%", background: "rgba(255,250,244,0.5)", opacity: (1 - p) * 0.6 * Math.min(1, p * 4), filter: "blur(3px)", pointerEvents: "none" }} />; })}</>
);

// small character speech bubble: springs in, holds, pops out; tone-colored; tail points to the speaker
const SpeechBubble: React.FC<{ lf: number; at: number; dur?: number; x: number; y: number; text: string; tail?: string; tone?: string; size?: number }> =
  ({ lf, at, dur = 1.3, x, y, text, tail = "down", tone = "rage", size = 30 }) => {
    const inP = spr(lf, fr(at), 11, 260);
    const outP = ramp(lf, fr(at + dur), fr(at + dur + 0.16));
    const vis = Math.max(0, Math.min(1.12, inP) * (1 - outP));
    if (vis <= 0.001) return null;
    const rage = tone === "rage", praise = tone === "praise";
    const bg = rage ? "linear-gradient(180deg,#2A1A12,#160E0A)" : praise ? "linear-gradient(180deg,#FFFFFF,#EFF6EC)" : "linear-gradient(180deg,#FBF6EC,#F0E8D7)";
    const bd = rage ? HKR_GLOW : praise ? GREEN : "#E3DCCE";
    const col = rage ? FLAMEY : praise ? "#2E7D52" : INK;
    const jit = rage ? Math.sin(lf * 1.6) * 1.3 * Math.min(1, vis) : 0;
    const tri = 11;
    const tailStyle: any = tail === "down" ? { left: "50%", bottom: -tri, transform: "translateX(-50%)", borderLeft: `${tri}px solid transparent`, borderRight: `${tri}px solid transparent`, borderTop: `${tri + 1}px solid ${bd}` }
      : tail === "up" ? { left: "50%", top: -tri, transform: "translateX(-50%)", borderLeft: `${tri}px solid transparent`, borderRight: `${tri}px solid transparent`, borderBottom: `${tri + 1}px solid ${bd}` }
      : tail === "left" ? { left: -tri, top: "58%", transform: "translateY(-50%)", borderTop: `${tri}px solid transparent`, borderBottom: `${tri}px solid transparent`, borderRight: `${tri + 1}px solid ${bd}` }
      : { right: -tri, top: "58%", transform: "translateY(-50%)", borderTop: `${tri}px solid transparent`, borderBottom: `${tri}px solid transparent`, borderLeft: `${tri + 1}px solid ${bd}` };
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) translateX(${jit}px) scale(${vis})`, transformOrigin: "50% 115%", zIndex: 45, pointerEvents: "none" }}>
        <div style={{ position: "relative", padding: "7px 17px 8px", borderRadius: 15, background: bg, border: `3px solid ${bd}`, boxShadow: `0 9px 22px -7px rgba(10,6,4,0.6)${rage ? `, 0 0 15px ${HKR_GLOW}55` : ""}`, whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, color: col, letterSpacing: "0.01em", textShadow: rage ? `0 0 9px ${HKR_GLOW}77` : "none" }}>{text}</span>
          <div style={{ position: "absolute", width: 0, height: 0, ...tailStyle }} />
        </div>
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
// ============================== S0 — "THE OVERNIGHT DROP" (hook) ==============================
// ============================== S0 — HOOK: THE SHIPPED SEAL SLAM ==============================
// ============================== S0 HOOK — THE CRATE BURSTS OPEN ==============================
// ============================== S0 — HOOK: "BUILD & SHIP-OFF" (overnight assembly -> rocket launch) ==============================
// ============================== S0 — "OVERNIGHT PILE-UP" (hook) ==============================
// 4 tinted agents ship finished PRODUCT boxes all night; boxes plummet + bounce + stack into a
// fast-growing teetering TOWER beside the sleeping nightcap founder. Clock spins 3AM -> dawn.
// ============================== S0 HOOK — THE CRATE BURSTS OPEN ==============================
// ============================== S0 HOOK — "THE MYSTERY CHEST" (cozy bedroom) ==============================
// ============================== S0 HOOK — "THE GLOWING DELIVERY" (cozy bedroom, mystery reveal) ==============================
// ============================== S0 HOOK — "THE MYSTERY CHEST" (cozy bedroom) ==============================


// ===================== S0 =====================
// ============================== S0 — RAMSAY CHEF hero reveal (kitchen pass) ==============================
// flickering stove flame (warm cel-shaded, bottom-anchored)
// ===== S0 =====
// ===== S0 =====
// ===== S0 =====
// ============================== S0 — THE HOOK (233f) — ROARING, CHAOTIC, EVENTFUL HELL'S KITCHEN ==============================
// ONE continuous, calm-camera shot of a blazing HELL'S KITCHEN that never stops MOVING. Same rich warm set-dressing +
// bubbles + smoothness as before, but now a DENSE STREAM OF EVENTS: plate SMASH + flame WHOOMP interrupt -> a fresh plate
// SLIDES down the pass -> a ticket SLAPS the rail -> RamsayChef actively WORKS the pass (leans over, plates, dips, sets a
// plate down) -> food chunks DROP onto the plate -> steam JETS up -> he WHIRLS to camera (a real turn) and folds arms ->
// head-shakes "no" with yell pulses + word-punched head accents -> a SECOND plate is fired in & plated during the hold ->
// DISGUST-RECOILS at the dish while a burnt chunk gets flicked off + fresh tickets slap + smoke curls off the bad plate
// (fills the "when it actually isn't" hold) -> waiters HURRY through -> flames FLARE in bursts left & right on a smooth
// cadence -> he ANTICIPATES, LEANS in and JABS a POINT at the dish, roaring "THE TRUTH." with a sweat bead.
// Something new happens every ~0.5-1s. NO flashes, ZERO cuts after the opening jolt — one ~4% eased push-in, continuous motion.

const S0_FONT = "Fraunces, Georgia, 'Times New Roman', serif";

// ---- flame: layered teardrop, self-flickering with per-flame VARIETY ----
const S0_Flame: React.FC<{ x: number; y: number; s: number; lf: number; ph?: number; op?: number; vary?: number }> = ({ x, y, s, lf, ph = 0, op = 1, vary = 1 }) => {
  const fl = 1 + 0.2 * Math.sin(lf / 3 + ph) + 0.1 * Math.sin(lf / 1.7 + ph * 2.3) + vary * 0.08 * Math.sin(lf / 2.3 + ph * 1.7) + vary * 0.05 * Math.sin(lf / 1.1 + ph * 3.7);
  const sway = Math.sin(lf / 5 + ph) * 5 + vary * Math.sin(lf / 2.6 + ph * 2.1) * 2.2;
  const lean = Math.sin(lf / 8 + ph * 1.3) * 3 * vary;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 1.55, transform: "translate(-50%,-100%)", pointerEvents: "none", opacity: op, filter: "drop-shadow(0 0 20px rgba(255,138,61,0.6))" }}>
      <svg viewBox="0 0 100 155" width={s} height={s * 1.55} style={{ overflow: "visible" }}>
        <g transform={`translate(${sway} ${155 - 155 * fl}) rotate(${lean} 50 155) scale(1 ${fl})`}>
          <path d="M50 155 C 6 112 20 58 50 0 C 80 58 94 112 50 155 Z" fill="#A81E15" />
          <path d="M50 155 C 12 116 24 60 50 6 C 76 60 88 116 50 155 Z" fill="#FF7A1A" />
          <path d="M50 155 C 24 120 32 78 50 26 C 68 78 76 120 50 155 Z" fill="#FFC23D" />
          <path d="M50 155 C 34 124 40 92 50 52 C 60 92 66 124 50 155 Z" fill="#FFE59A" />
          <path d="M50 155 C 43 130 46 106 50 82 C 54 106 57 130 50 155 Z" fill="#FFF4D2" />
        </g>
      </svg>
    </div>
  );
};

// ---- rising steam jet (soft blobs cycling up & fading) ----
const S0_SteamJet: React.FC<{ x: number; base: number; lf: number; n?: number; sway?: number; size?: number; op?: number; ph?: number; rise?: number }> = ({ x, base, lf, n = 5, sway = 14, size = 40, op = 0.32, ph = 0, rise = 190 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const period = 100;
      const t = (((lf + ph * 20 + i * (period / n)) % period) + period) % period / period;
      const yy = base - t * rise;
      const o = Math.sin(t * Math.PI) * op;
      const sc = 0.6 + t * 0.9;
      if (o < 0.01) return null;
      return <div key={"sj" + i} style={{ position: "absolute", left: x - size / 2 + Math.sin(t * 6.28 + i) * sway, top: yy, width: size, height: size * 1.05, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,236,228,0.95), transparent 68%)", opacity: o, filter: "blur(6px)", transform: `scale(${sc})` }} />;
    })}
  </>
);

// ---- drifting HEAT HAZE (tall soft ripple rising & wobbling — atmospheric shimmer, low op) ----
const S0_HeatHaze: React.FC<{ x: number; base: number; lf: number; w?: number; h?: number; ph?: number; op?: number }> = ({ x, base, lf, w = 120, h = 200, ph = 0, op = 0.14 }) => {
  const period = 150;
  const t = (((lf + ph * 30) % period) + period) % period / period;
  const yy = base - t * h;
  const o = Math.sin(t * Math.PI) * op;
  const wob = Math.sin(lf / 7 + ph) * 10 + Math.sin(lf / 3.4 + ph * 2) * 5;
  const skew = Math.sin(lf / 11 + ph) * 5;
  if (o < 0.005) return null;
  return <div style={{ position: "absolute", left: x - w / 2 + wob, top: yy, width: w, height: h * 0.7, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 60%, rgba(255,170,90,0.9), transparent 66%)", opacity: o, filter: "blur(11px)", transform: `skewX(${skew}deg)`, pointerEvents: "none", mixBlendMode: "screen" }} />;
};

// ---- a cook flipping a pan (midground cooking accent) ----
const S0_PanToss: React.FC<{ x: number; y: number; lf: number; s?: number; ph?: number }> = ({ x, y, lf, s = 60, ph = 0 }) => {
  const period = 74;
  const t = (((lf + ph) % period) + period) % period / period;   // 0..1 toss cycle
  const arc = t < 0.5 ? Math.sin(t * 2 * Math.PI) : 0;            // food arcs during first half
  const tilt = Math.sin((lf + ph) / 6) * 6 - (t < 0.32 ? 9 : 0);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, transform: "translate(-50%,-50%)" }}>
      {[0, 1, 2].map((k) => {
        const a = arc * (1 - Math.abs(k - 1) * 0.22);
        return <div key={k} style={{ position: "absolute", left: s * 0.5 + (k - 1) * 7, top: s * 0.42 - a * 44, width: 7, height: 7, borderRadius: "50%", background: k === 1 ? "#B8672E" : "#C98A4A", opacity: 0.9 }} />;
      })}
      <div style={{ position: "absolute", left: s * 0.14, top: s * 0.5, width: s * 0.66, height: s * 0.24, borderRadius: "50%", background: "radial-gradient(ellipse at 40% 30%, #5A636F, #14171C)", transform: `rotate(${tilt}deg)`, transformOrigin: "88% 50%" }} />
      <div style={{ position: "absolute", left: s * 0.76, top: s * 0.57, width: s * 0.44, height: 6, borderRadius: 3, background: "#22252B", transform: `rotate(${tilt}deg)`, transformOrigin: "0% 50%" }} />
    </div>
  );
};

// ---- periodic flambé flare (numeric `at` = frame offset; NOT the Sparkles/Flambe global) ----
const S0_Flambe: React.FC<{ x: number; y: number; lf: number; at: number; period: number; s?: number }> = ({ x, y, lf, at, period, s = 120 }) => {
  const tt = (((lf - at) % period) + period) % period;
  const g = tt < 28 ? Math.sin((tt / 28) * Math.PI) : 0;   // flare envelope
  if (g <= 0.02) return null;
  return (
    <>
      <div style={{ position: "absolute", left: x - 70, top: y - 130, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,138,61,${0.5 * g}), transparent 70%)`, filter: "blur(8px)" }} />
      <S0_Flame x={x} y={y} s={s * (0.45 + 0.85 * g)} lf={lf} ph={at} op={0.4 + 0.6 * g} vary={1.4} />
    </>
  );
};

// ---- OPENING PATTERN INTERRUPT: a plate SMASHES on the pass (shards fly + fall, dust puff) ----
const S0_SHARDS = Array.from({ length: 14 }, (_, i) => ({
  ang: seed(i * 3.3) * 6.283,
  spd: 46 + seed(i * 1.9) * 96,
  rot: (seed(i * 2.1) - 0.5) * 760,
  sz: 9 + seed(i * 4.7) * 16,
  up: 0.5 + seed(i * 6.1) * 0.7,
}));
const S0_Smash: React.FC<{ x: number; y: number; lf: number }> = ({ x, y, lf }) => {
  const life = 20;
  if (lf > life + 5) return null;
  const t = Math.min(1, lf / life);
  const g = 1 - Math.pow(1 - t, 2);        // eased outward travel
  const op = Math.max(0, 1 - t * t);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, pointerEvents: "none", zIndex: 26 }}>
      {/* impact dust puff (warm, not a white flash) */}
      <div style={{ position: "absolute", left: -56, top: -44, width: 112, height: 84, borderRadius: "50%", background: "radial-gradient(circle, rgba(238,232,220,0.55), rgba(255,170,90,0.18) 55%, transparent 74%)", opacity: op * 0.9, filter: "blur(5px)", transform: `scale(${0.5 + g * 1.3})` }} />
      {/* low impact crack-ring */}
      <div style={{ position: "absolute", left: -34, top: -10, width: 68, height: 20, borderRadius: "50%", border: "2px solid rgba(214,222,232,0.7)", opacity: op * 0.7, transform: `scale(${0.6 + g * 1.8})` }} />
      {S0_SHARDS.map((s, i) => {
        const dist = s.spd * g;
        const px = Math.cos(s.ang) * dist;
        const py = Math.sin(s.ang) * dist * 0.55 - s.up * 40 * (1 - Math.pow(1 - t, 1.4)) + g * g * 96; // fling up-out then fall
        return (
          <div key={"shd" + i} style={{ position: "absolute", left: px, top: py, width: s.sz, height: s.sz * 0.62, background: "linear-gradient(150deg,#F3F6FA,#9BA6B4)", boxShadow: "0 1px 2px rgba(0,0,0,0.45)", clipPath: "polygon(0% 22%, 62% 0%, 100% 58%, 40% 100%)", transform: `rotate(${s.rot * g}deg)`, opacity: op }} />
        );
      })}
    </div>
  );
};

// ---- REJECT: a burnt chunk FLICKED off the bad dish, arcs up-out then falls (verdict-driven food action) ----
const S0_Reject: React.FC<{ lf: number; at: number; x: number; y: number }> = ({ lf, at, x, y }) => {
  if (lf < at || lf > at + 24) return null;
  const t = (lf - at) / 24;                                   // 0..1
  const px = x - t * 78;                                      // flung up-left off the plate
  const py = y - Math.sin(Math.min(1, t * 1.15) * Math.PI) * 66 + t * t * 44;   // arc up then fall
  const rot = t * 560;
  const op = Math.max(0, 1 - t * t);
  const sc = 1 - t * 0.25;
  return (
    <div style={{ position: "absolute", left: px, top: py, width: 15, height: 12, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, zIndex: 24, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "52% 48% 46% 54%", background: "radial-gradient(circle at 38% 30%,#B8672E,#5C2C10)", boxShadow: "0 1px 3px rgba(0,0,0,0.5)", opacity: op }} />
      <div style={{ position: "absolute", left: 3, top: 2, width: 5, height: 4, borderRadius: "50%", background: "#2A160A", opacity: op * 0.9 }} />
    </div>
  );
};

// ---- hanging utensil silhouette (ladle / whisk / spatula / fork) on the ceiling rail ----
const S0_Utensil: React.FC<{ x: number; len: number; type: string; lf: number; ph: number }> = ({ x, len, type, lf, ph }) => {
  const sway = Math.sin(lf / (36 + ph * 4) + ph * 1.7) * 2.4 + Math.sin(lf / (12 + ph) + ph) * 0.6;
  return (
    <div style={{ position: "absolute", left: x, top: 76, width: 0, height: 0, transform: `rotate(${sway}deg)`, transformOrigin: "0px 0px" }}>
      <div style={{ position: "absolute", left: -1, top: 0, width: 2.4, height: len, background: "#2A2F37" }} />
      <div style={{ position: "absolute", left: -1.5, top: len - 2, width: 5, height: 5, borderRadius: "50%", background: "#191C21" }} />
      {type === "ladle" && <div style={{ position: "absolute", left: -13, top: len + 1, width: 26, height: 20, borderRadius: "0 0 40% 40% / 0 0 90% 90%", background: "radial-gradient(ellipse at 40% 26%,#E7A063,#8A4A20)", boxShadow: "inset 0 3px 4px rgba(255,220,170,0.5)" }} />}
      {type === "whisk" && <div style={{ position: "absolute", left: -9, top: len, width: 18, height: 26 }}>
        {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 9, top: 0, width: 1.6, height: 26, background: "#C7CFDA", borderRadius: 2, transform: `rotate(${(k - 1.5) * 14}deg)`, transformOrigin: "50% 0%" }} />)}
      </div>}
      {type === "spatula" && <div style={{ position: "absolute", left: -8, top: len, width: 16, height: 22, borderRadius: 3, background: "linear-gradient(180deg,#39434F,#191D23)" }} />}
      {type === "fork" && <div style={{ position: "absolute", left: -7, top: len, width: 14, height: 22 }}>
        {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 2 + k * 5, top: 0, width: 2, height: 22, background: "#C7CFDA" }} />)}
      </div>}
    </div>
  );
};

// ---- a fresh plate SLIDING in along the pass (a cook fires a dish to the pass), decel + landing settle + motion smear ----
const S0_SlidePlate: React.FC<{ lf: number; at: number; fromX: number; toX: number; y: number; dur: number }> = ({ lf, at, fromX, toX, y, dur }) => {
  if (lf < at) return null;
  const t = over(lf, at, dur, Easing.out(Easing.cubic));   // 0..1 decelerate to a stop
  const x = fromX + (toX - fromX) * t;
  const moving = 1 - t;                                     // 1 while flying, 0 parked
  const settleB = lf >= at + dur ? Math.exp(-(lf - (at + dur)) / 6) * Math.cos((lf - (at + dur)) / 2.1) : 0;
  const sx = 1 + 0.06 * Math.max(0, settleB) + moving * 0.14;   // stretched along travel, then jiggle
  const sy = 1 - 0.06 * Math.max(0, settleB);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-100%) scale(${sx},${sy})`, transformOrigin: "50% 100%", zIndex: 19 }}>
      {/* motion smear trailing to the right while it flies */}
      {moving > 0.05 ? <div style={{ position: "absolute", left: 0, top: -2, width: 60 + moving * 130, height: 30, borderRadius: "50%", background: "linear-gradient(90deg, rgba(237,241,246,0), rgba(237,241,246,0.4))", opacity: moving * 0.5, filter: "blur(4px)" }} /> : null}
      <div style={{ position: "absolute", left: -74, top: 20, width: 148, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.3)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: -70, top: 0, width: 140, height: 38, borderRadius: "50%", background: "radial-gradient(ellipse at 46% 32%,#EDF1F6,#98A3B2)", boxShadow: "0 6px 12px -5px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.7)" }} />
      <div style={{ position: "absolute", left: -40, top: 6, width: 80, height: 24, borderRadius: "50%", background: "radial-gradient(ellipse at 44% 34%,#C7CFDA,#7C8797)" }} />
    </div>
  );
};

// ---- food chunks DROPPING onto a plate (plating), accelerating fall + landing bounce ----
const S0_FoodDropList = Array.from({ length: 7 }, (_, i) => ({ dx: (seed(i * 7.1) - 0.5) * 74, c: i % 3 === 0 ? "#3F9E74" : (i % 3 === 1 ? "#C44A3A" : "#E7B24C"), sz: 7 + seed(i * 2.3) * 7, delay: i * 3, from: 72 + seed(i * 3.7) * 44 }));
const S0_Plating: React.FC<{ lf: number; at: number; x: number; y: number }> = ({ lf, at, x, y }) => {
  if (lf < at) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: 22 }}>
      {S0_FoodDropList.map((f, i) => {
        const start = at + f.delay;
        if (lf < start) return null;
        const lt = ramp(lf, start, start + 7);
        const off = -f.from * (1 - lt * lt);                        // accelerate down onto the plate
        const bt = lf - (start + 7);
        const bounce = bt > 0 ? -Math.exp(-bt / 3) * Math.abs(Math.sin(bt / 2.3)) * 6 : 0;   // little settle bounce
        return <div key={"fd" + i} style={{ position: "absolute", left: f.dx, top: off + bounce, width: f.sz, height: f.sz * 0.82, borderRadius: "50%", background: f.c, boxShadow: "0 1px 2px rgba(0,0,0,0.4)", transform: "translate(-50%,-50%)" }} />;
      })}
    </div>
  );
};

// ---- a ticket SLAPPING onto the rail: flies down from above, over-shoots, then flutters ----
const S0_TicketSlap: React.FC<{ lf: number; at: number; x: number; rot: number }> = ({ lf, at, x, rot }) => {
  if (lf < at) return null;
  const drop = over(lf, at, 6, Easing.out(Easing.cubic));   // 0..1 slam down
  const y = interpolate(drop, [0, 1], [-72, 62 + Math.abs(rot)], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b = lf >= at + 6 ? Math.exp(-(lf - (at + 6)) / 5) : 0;
  const flutter = (lf >= at + 6 ? Math.sin((lf - (at + 6)) / 9 + x) * 2.4 : 0) - b * Math.cos((lf - (at + 6)) / 1.8) * 8;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 56, height: 76, background: "linear-gradient(180deg,#FBF7ED,#E7E0D0)", borderRadius: 3, transform: `rotate(${rot + flutter}deg)`, transformOrigin: "50% 0%", boxShadow: "0 7px 14px -6px rgba(0,0,0,0.6)", overflow: "hidden", zIndex: 12 }}>
      <div style={{ position: "absolute", left: 25, top: -6, width: 6, height: 12, background: "#E23B2E" }} />
      <div style={{ position: "absolute", left: 8, top: 12, width: 40, height: 4, background: "#E23B2E" }} />
      {[24, 32, 40, 48, 56, 64].map((yy, k) => <div key={k} style={{ position: "absolute", left: 8, top: yy, width: 40 - (k % 2) * 12, height: 3, background: "#B9B2A2" }} />)}
    </div>
  );
};

// ---------- deterministic set-dressing lists ----------
const S0_CHX = 384;                        // chef centre x (left of centre)
const S0_CHSIZE = 300;
const S0_CHTOP = 372;                       // chef wrapper top (feet ~660, tucked behind the pass)
const S0_PASSY = 606;                       // top of the pass counter
const S0_DISHX = 662;                       // the dish sits to the chef's right on the pass
const S0_DISHY = 596;
const S0_PLATE2X = 824;                     // the fresh plate the chef fires in & plates
const S0_SMX = 528;                         // plate-smash impact point (on the pass, between chef & dish)
const S0_SMY = 602;
// hanging cookware — mix of COPPER pots (cu) and blue-steel pans
const S0_PANS = [
  { x: 96, len: 30, r: 40, cu: true },
  { x: 200, len: 44, r: 30, cu: false },
  { x: 296, len: 22, r: 24, cu: true },
  { x: 806, len: 34, r: 38, cu: true },
  { x: 908, len: 20, r: 26, cu: false },
];
const S0_UTENS = [
  { x: 150, len: 56, type: "ladle", ph: 0.3 },
  { x: 250, len: 46, type: "whisk", ph: 1.6 },
  { x: 752, len: 52, type: "spatula", ph: 2.4 },
  { x: 860, len: 44, type: "fork", ph: 3.7 },
];
const S0_TICKETS = [{ x: 372, rot: -7 }, { x: 444, rot: 5 }, { x: 596, rot: -3 }, { x: 668, rot: 8 }];
// background line-cooks — VARIED bob amplitude + period + phase for natural, non-synced life
const S0_COOKS = [
  { x: 110, size: 64, tint: "#5E7C98", ph: 0.0, amp: 5, per: 44 },
  { x: 236, size: 58, tint: "#6E7A8C", ph: 1.4, amp: 3.2, per: 58 },
  { x: 560, size: 60, tint: "#7A6E8C", ph: 2.3, amp: 6.5, per: 40 },
  { x: 700, size: 56, tint: "#5E7C98", ph: 3.1, amp: 4, per: 66 },
  { x: 820, size: 54, tint: "#6C6A88", ph: 5.2, amp: 5.5, per: 50 },
  { x: 902, size: 62, tint: "#6E7A8C", ph: 4.0, amp: 3.6, per: 72 },
];
const S0_STEAM = Array.from({ length: 7 }, (_, i) => ({ x: 200 + seed(i * 3.1) * 640, delay: i * 15, sway: 9 + seed(i * 1.7) * 14, size: 40 + seed(i * 2.3) * 40, base: 596 + seed(i * 4.4) * 22 }));
const S0_SPARKS = Array.from({ length: 14 }, (_, i) => ({ ph: seed(i * 5.5) * 6.28, sp: 0.6 + seed(i) * 0.8, x: (i % 2 === 0 ? 130 : 902) + (seed(i * 2.7) - 0.5) * 90 }));
const S0_HAZES = [
  { x: 130, base: 470, ph: 0.0, w: 130, h: 210, op: 0.15 },
  { x: 236, base: 452, ph: 1.7, w: 100, h: 180, op: 0.11 },
  { x: 560, base: 470, ph: 3.2, w: 120, h: 200, op: 0.12 },
  { x: 902, base: 470, ph: 4.6, w: 140, h: 220, op: 0.15 },
];
// spice-jar shelf (right back wall)
const S0_JARS = [{ dx: 0, c: "#C44A3A" }, { dx: 1, c: "#E7B24C" }, { dx: 2, c: "#8A5A2B" }, { dx: 3, c: "#B8672E" }, { dx: 4, c: "#7C9A5A" }];

// ---- SIGNATURE-MOMENT geometry + particles: the SNATCH -> INSPECT -> SLAM hero dish + the ROAR sweat-spray ----
const S0_SLAMX = 496;        // the hero slam-dish sits/slams just to the chef's right, on the pass
const S0_SLAMRESTY = 600;    // plate-CENTER rest y on the pass surface
// sweat droplets flung off his shaking head on the roar — fan up-left through right, then gravity
const S0_SWEAT_SPRAY = Array.from({ length: 10 }, (_, i) => ({ ang: -Math.PI * 0.9 + seed(i * 2.7) * Math.PI * 1.15, dist: 54 + seed(i * 3.3) * 96, sz: 5 + seed(i * 1.7) * 5, drop: 26 + seed(i * 4.1) * 52 }));
// food splatter flung out when the plate SLAMS the pass
const S0_SPLAT = Array.from({ length: 12 }, (_, i) => ({ ang: seed(i * 3.1) * 6.283, spd: 46 + seed(i * 1.9) * 118, sz: 6 + seed(i * 4.3) * 10, c: i % 3 === 0 ? "#3F9E74" : (i % 3 === 1 ? "#C44A3A" : "#E7B24C"), up: 0.4 + seed(i * 2.2) * 0.8 }));

const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const S0_bump = (at: number, dec: number) => (lf >= at ? Math.exp(-(lf - at) / dec) : 0);

  // ---------- OPENING PATTERN INTERRUPT: sharp downward JOLT + shake on the smash, gone by ~lf12 ----------
  const jolt = Math.exp(-lf / 3.4);                       // 1 at lf0 -> ~0 by lf12
  const shakeX = jolt * Math.sin(lf * 3.2) * 8;
  const shakeY = jolt * Math.cos(lf * 2.7) * 5.5 + jolt * 4;   // biased downward = a slam
  const shakeRot = jolt * Math.sin(lf * 3.6) * 0.9;

  // ---------- CAMERA: calm & stable AFTER the jolt. ONE gentle eased push-in, whisper of organic drift. ----------
  const push = 1 + over(lf, 0, 233, Easing.inOut(Easing.cubic)) * 0.04;   // 1.00 -> 1.04
  const driftX = Math.sin(lf / 56) * 1.4;
  const driftY = Math.cos(lf / 72) * 1.0;

  // ---------- warm heat-lamp breathing glow (gentle — NOT a flicker/flash) ----------
  const lampF = 0.9 + 0.08 * Math.sin(lf / 9) + 0.04 * Math.sin(lf / 3.3);

  // ---------- HERO PERFORMANCE ARC: opening ROAR-JAB -> WORK THE PASS (plate, dip, set down) -> WHIRL to camera + fold arms -> head-shake "no" -> ANTICIPATE + LEAN + JAB the POINT ("THE TRUTH.") ----------
  const S0_chefPose = lf < 14 ? "jab" : (lf < 40 ? "present" : (lf < 58 ? "hipshake" : (lf < 166 ? "cross" : "point")));

  // "works the pass": turned toward the dish on his right, dips to plate, unwinds on the whirl
  const S0_work = over(lf, 14, 10) * (1 - over(lf, 58, 12));                  // 0..1 working
  const platingBob = Math.sin((lf - 14) / 5.5) * 4 * S0_work;                 // rhythmic dip to the plate
  const whirl = over(lf, 58, 12, Easing.out(Easing.cubic));                   // 0..1 turn-to-camera
  const whirlSpin = S0_bump(58, 9) * Math.cos((lf - 58) / 2.1) * -7;          // overshoot swing of the whirl
  const chefSX = 1 - 0.1 * S0_work + S0_bump(58, 8) * 0.06;                   // compressed while 3/4-turned, pops on whirl

  // eyes: track the dish while working, forward through the whirl, then lock on the dish for the verdict
  const S0_gaze = Math.round(over(lf, 16, 10) * 2 * (1 - over(lf, 58, 8)) + over(lf, 168, 16) * 2);

  // yell: opening OI roar -> pulses on "No"/"great job" -> PEAK on the verdict
  const earlyRoar = Math.max(0, Math.exp(-lf / 6) - 0.04);   // ~0.96 at lf0 -> 0 by ~lf18
  const S0_yell = Math.min(1, Math.max(
    earlyRoar,
    over(lf, 68, 6) * 0.42 * (1 - over(lf, 86, 10)),
    over(lf, 103, 6) * 0.42 * (1 - over(lf, 122, 10)),
    over(lf, 184, 8) * (1 - over(lf, 227, 6) * 0.15),
  ));
  // BROW FLICK — furious brow snaps up on the roar, on "No", and on "brutal" then settles (numeric; brow default 1)
  const S0_brow = 1 + Math.min(1, Math.round(over(lf, 182, 4) * (1 - over(lf, 198, 8)) + (lf < 12 ? 1 : 0) + over(lf, 68, 3) * (1 - over(lf, 80, 6))));

  // settle wobble that MASKS each discrete pose swap as a deliberate, overshooting gesture
  const settle = (at: number) => S0_bump(at, 8) * Math.cos((lf - at) / 2.3);
  const S0_settle = settle(14) + settle(40) + settle(58) + settle(166);
  // anticipation dip then eased forward lean into the verdict point
  const lean = over(lf, 166, 16, Easing.out(Easing.cubic));
  const antic = over(lf, 156, 10) * (1 - over(lf, 166, 6));
  const bodySway = Math.sin(lf / 44) * 2.6 + Math.sin(lf / 19) * 0.8;   // richer secondary sway
  const tremor = S0_yell * (Math.sin(lf * 1.6) * 1.3 + Math.sin(lf * 3.0) * 0.6);
  // "NO" head-shake through the "no sucking up / no great job" line
  const noShake = (over(lf, 66, 6) * (1 - over(lf, 128, 12))) * Math.sin(lf / 3.6) * 2.6;
  // reactive head-tilts punched on his key line-words + a hard opening snap.
  // ADDED word-accents (87/106/118) so the crossed-arms hold is never a flat, steady head-wag — the head keeps snapping to the beat.
  const reactTilt = S0_bump(0, 5) * Math.cos(lf / 2.0) * -2.2
    + S0_bump(74, 7) * Math.cos((lf - 74) / 2.2) * -1.6
    + S0_bump(87, 6) * Math.cos((lf - 87) / 2.1) * -1.7    // "up,"
    + S0_bump(106, 6) * Math.cos((lf - 106) / 2.1) * 1.6   // "saying"
    + S0_bump(118, 6) * Math.cos((lf - 118) / 2.1) * -1.5  // "great job"
    + S0_bump(184, 6) * Math.cos((lf - 184) / 2.0) * 2.4
    + S0_bump(214, 7) * Math.cos((lf - 214) / 2.2) * 1.6;
  // DISGUST-RECOILS at the dish during the crossed-arms hold ("when it actually isn't") — fills the lull with live hero motion
  const S0_scoffA = over(lf, 128, 5) * (1 - over(lf, 137, 9));    // recoil on "actually"
  const S0_scoffB = over(lf, 146, 5) * (1 - over(lf, 155, 9));    // recoil on "isn't"
  const S0_scoff = S0_scoffA + S0_scoffB;

  // ===================== SIGNATURE MOMENT — he SNATCHES the dish, INSPECTS it, then SLAMS it & ROARS into camera on "brutal truth" =====================
  // Anticipation (rear-back + raise on "brutal"@184) -> whip DOWN + LEAN-IN toward the viewer + sweat-spray + brow-pop as "truth"/"THE TRUTH."@190 lands.
  const S0_dishIn = over(lf, 126, 12, Easing.out(Easing.cubic));                     // a fresh "perfect" plate slides onto the pass in front of him
  const S0_slamPosX = interpolate(S0_dishIn, [0, 1], [S0_SLAMX - 140, S0_SLAMX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S0_snatch = over(lf, 162, 12, Easing.out(Easing.back(1.25)));               // YANKED up to inspect height (overshoot reads as a snatch)
  const S0_wind = over(lf, 180, 4, Easing.out(Easing.cubic));                       // wound up a touch higher (the rear-back)
  const S0_slam = over(lf, 184, 6, Easing.cubic);                                   // WHIPS back down, accelerating
  const S0_riseAmt = 150 * S0_snatch + 18 * S0_wind;                                // px the plate is held above the pass
  const S0_embed = S0_bump(190, 5) * 9;                                             // punches slightly into the pass on impact, springs back
  const S0_landJig = S0_bump(190, 7) * Math.cos((lf - 190) / 2.3) * 7;             // settle jiggle after the hit
  const S0_slamY = -S0_riseAmt * (1 - S0_slam) + S0_embed - Math.max(0, S0_landJig);
  const S0_hAbove = Math.max(0, -S0_slamY);                                         // current height above the pass
  const S0_slamTilt = -15 * S0_snatch * (1 - S0_slam) - 6 * S0_wind * (1 - S0_slam) + S0_bump(190, 8) * Math.cos((lf - 190) / 2.1) * 7;
  const S0_shock = over(lf, 189, 13, Easing.out(Easing.cubic));                     // impact shockwave ring + dust
  const S0_splat = over(lf, 189, 18, Easing.out(Easing.cubic));                     // food splatter burst
  const S0_spray = over(lf, 188, 15, Easing.out(Easing.cubic));                     // SWEAT SPRAY off his head on the roar
  // LEAN-IN toward the viewer: rear-back wind-up, then a smooth forward LUNGE that grows him toward camera, then holds leaned-in (no camera punch)
  const S0_rear = over(lf, 176, 8) * (1 - over(lf, 184, 4));
  const S0_lunge = over(lf, 184, 7, Easing.out(Easing.back(1.5)));
  const S0_relax = over(lf, 200, 26, Easing.out(Easing.cubic));
  const S0_growCam = 1 + S0_lunge * 0.17 - S0_rear * 0.04 - S0_relax * 0.05;        // 1 -> ~1.15 lunge -> settles ~1.11
  const S0_leanX = S0_lunge * 7 - S0_rear * 3;
  const S0_leanY = S0_lunge * 11 - S0_rear * 7;
  const S0_slamKick = S0_bump(189, 6) * 5;                                          // small effort-dip as he drives the slam down

  const chefX = bodySway + S0_work * 16 + lean * 14 - antic * 7 + tremor + (S0_scoffA - S0_scoffB) * 4 + S0_leanX;    // shifts to the pass while working, then jabs; rocks on the scoffs; lunges in on the slam
  const chefY = S0_settle * 4 + platingBob - antic * 3 - S0_bump(184, 6) * 2 + jolt * 3 + S0_bump(24, 7) * 3 + S0_bump(50, 7) * 3 - S0_scoff * 5 + S0_leanY + S0_slamKick;   // dips when he sets plates down; chin-up recoil on the scoffs; drives down + leans in on the slam
  const chefRot = bodySway * 0.25 + S0_settle * 2.4 + S0_work * 6 + whirlSpin + noShake + lean * 2.4 - antic * 2 + reactTilt + S0_scoff * 3.2 + S0_lunge * 1.5;

  // bead of sweat on the rage peak — swells, then a heavy drip down the temple
  const sweatIn = over(lf, 186, 10);
  const sweatDrip = over(lf, 206, 20, Easing.cubic);
  const sweatOp = sweatIn * (1 - over(lf, 224, 8));

  // ---------- THE DISH: soft placement settle at open (gentle — no violent squash/splatter/flash) ----------
  const place = over(lf, 0, 14, Easing.out(Easing.cubic));
  const dishY = interpolate(place, [0, 1], [S0_DISHY - 22, S0_DISHY], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dishWob = S0_bump(14, 6) * Math.cos((lf - 14) / 2.6);
  // dish also FLINCHES when the burnt chunk is flicked off it (~lf134) — a reactive shudder
  const dishFlick = S0_bump(134, 5) * Math.cos((lf - 134) / 1.9);
  const dishSqX = 1 + 0.045 * Math.max(0, dishWob) + 0.05 * Math.max(0, dishFlick);
  const dishSqY = 1 - 0.045 * Math.max(0, dishWob) - 0.05 * Math.max(0, dishFlick);
  // dish trembles a touch under the point/verdict (he's judging IT)
  const dishJudge = S0_yell * Math.sin(lf * 2.2) * 0.9 + dishFlick * 1.4;

  // dark smoke curling off the BAD plate during the verdict hold (sells "when it actually isn't")
  const S0_rejectSmoke = over(lf, 124, 10) * (1 - over(lf, 150, 18));

  // passing WAITERS — dim clay figures HURRY through behind the pass (one out, one back)
  const waiter1X = interpolate(lf, [10, 118], [-90, 1100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waiter2X = interpolate(lf, [122, 226], [1100, -90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waiterBob = bob(lf, 5, 20, 0.5);
  const waiter2Bob = bob(lf, 5, 22, 1.4);

  const CHL = S0_CHX - S0_CHSIZE / 2;

  return (
    <>
      {/* steady framing vignette (constant — not animated) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 40, background: "radial-gradient(122% 100% at 50% 46%, transparent 52%, rgba(8,4,2,0.5) 100%)" }} />

      {/* ===================== WORLD (calm push-in + a brief opening JOLT/shake) ===================== */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${driftX + shakeX}px,${driftY + shakeY}px) rotate(${shakeRot}deg) scale(${push})`, transformOrigin: "506px 396px" }}>

        {/* ===================== BACK WALL — fiery glow over blue-steel, warmed ===================== */}
        <div style={{ position: "absolute", inset: 0, background: "#0E1218" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#231A18 0%,#181A20 42%,#0C1016 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(135% 115% at 50% 8%, rgba(255,120,60,${0.52 * lampF}) 0%, rgba(226,80,46,0.3) 26%, rgba(70,26,16,0.4) 54%, rgba(10,7,6,0) 78%)` }} />
        {/* warm ambient wash from the pass lamps rising up the wall */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 50% 100%, rgba(255,150,70,${0.22 * lampF}), transparent 60%)`, mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 452, background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 2px, transparent 2px 48px), repeating-linear-gradient(90deg, rgba(0,0,0,0.2) 0 2px, transparent 2px 90px)", opacity: 0.4 }} />
        {/* subtle god-rays raking down from the neon/lamps for depth */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 470, background: "repeating-linear-gradient(96deg, rgba(255,160,80,0.06) 0 3px, transparent 3px 66px)", opacity: 0.5 + 0.1 * Math.sin(lf / 18), pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: S0_CHX - 300, top: 40, width: 600, height: 640, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,236,196,${0.2 * lampF}), transparent 66%)`, filter: "blur(8px)" }} />

        {/* ===================== CHALKBOARD MENU (back wall, upper-left set dressing) ===================== */}
        <div style={{ position: "absolute", left: 24, top: 100, width: 128, height: 150, borderRadius: 6, background: "linear-gradient(180deg,#5A3B1E,#3A2412)", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.7), inset 0 2px 0 rgba(232,181,74,0.35)", padding: 6 }}>
          <div style={{ position: "absolute", inset: 6, borderRadius: 4, background: "linear-gradient(180deg,#1C2622,#101713)", boxShadow: "inset 0 0 22px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 18, top: 16, width: 92, height: 8, borderRadius: 2, background: "rgba(232,181,74,0.62)" }} />
          {[36, 52, 68, 84, 100, 116].map((yy, k) => <div key={"cb" + k} style={{ position: "absolute", left: 16, top: yy, width: 92 - (k % 3) * 22, height: 3.4, borderRadius: 2, background: "rgba(236,233,226,0.34)" }} />)}
          {[36, 68, 100].map((yy, k) => <div key={"cbr" + k} style={{ position: "absolute", left: 96, top: yy, width: 14, height: 3.4, borderRadius: 2, background: "rgba(226,59,46,0.6)" }} />)}
        </div>

        {/* ===================== SPICE-JAR SHELF (right back wall) ===================== */}
        <div style={{ position: "absolute", left: 860, top: 236, width: 132, height: 10, borderRadius: 3, background: "linear-gradient(180deg,#6A4A28,#3A2614)", boxShadow: "0 6px 12px -4px rgba(0,0,0,0.6)" }} />
        {S0_JARS.map((j) => (
          <div key={"jar" + j.dx} style={{ position: "absolute", left: 866 + j.dx * 25, top: 210, width: 20, height: 28, borderRadius: "3px 3px 4px 4px", background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.06))", boxShadow: "inset 0 0 6px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: 2, top: 9, width: 16, height: 17, borderRadius: 2, background: j.c, opacity: 0.88 }} />
            <div style={{ position: "absolute", left: 3, top: -3, width: 14, height: 6, borderRadius: 2, background: "#20242A" }} />
          </div>
        ))}

        {/* ===================== HELL'S KITCHEN neon sign (the ONE headline label) ===================== */}
        <div style={{ position: "absolute", left: 506, top: 22, transform: "translateX(-50%)", fontFamily: S0_FONT, fontWeight: 900, fontSize: 34, letterSpacing: 2, color: "#FF5A3C", textShadow: `0 0 10px rgba(255,90,60,${0.9 * lampF}), 0 0 26px rgba(226,59,46,${0.8 * lampF}), 0 3px 0 #6E120C`, WebkitTextStroke: "1px #A81E15", opacity: 0.92 }}>HELL&apos;S KITCHEN</div>

        {/* ===================== HANGING RAIL (copper pots + steel pans sway like pendulums) ===================== */}
        <div style={{ position: "absolute", left: 20, top: 70, width: 972, height: 12, borderRadius: 6, background: "linear-gradient(180deg,#F0D9A0,#B07E1E)", boxShadow: "0 6px 14px -4px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,246,214,0.6)" }} />
        {[60, 300, 706, 952].map((rx, i) => <div key={"rv" + i} style={{ position: "absolute", left: rx, top: 72, width: 8, height: 8, borderRadius: "50%", background: "#6A4A1E" }} />)}
        {S0_UTENS.map((u, i) => <S0_Utensil key={"ut" + i} x={u.x} len={u.len} type={u.type} lf={lf} ph={u.ph} />)}
        {S0_PANS.map((p, i) => {
          const sway = Math.sin(lf / (34 + i * 3) + i * 1.3) * 2.6 + Math.sin(lf / (11 + i) + i) * 0.6;   // pendulum + tiny jitter
          const bowl = p.cu
            ? "radial-gradient(circle at 36% 28%,#F0B274,#C87A3A 44%,#7A3E16)"
            : "radial-gradient(circle at 36% 30%,#6C7686,#242A32)";
          const bowlSh = p.cu ? "inset 0 6px 10px rgba(255,220,170,0.4), 0 8px 16px -6px rgba(0,0,0,0.6)" : "inset 0 6px 10px rgba(214,222,232,0.22), 0 8px 16px -6px rgba(0,0,0,0.6)";
          return (
            <div key={"pan" + i} style={{ position: "absolute", left: p.x, top: 76, width: 0, height: 0, transform: `rotate(${sway}deg)`, transformOrigin: "0px 0px" }}>
              <div style={{ position: "absolute", left: -1.5, top: 0, width: 3, height: p.len, background: "#2A2F37" }} />
              <div style={{ position: "absolute", left: -p.r, top: p.len, width: p.r * 2, height: p.r * 2, borderRadius: "50%", background: bowl, boxShadow: bowlSh }} />
              <div style={{ position: "absolute", left: -p.r * 0.5, top: p.len + p.r * 0.42, width: p.r, height: p.r * 0.9, borderRadius: "50%", background: p.cu ? "radial-gradient(circle,#9A5A2A,#3A1E0C)" : "radial-gradient(circle,#454B54,#181B20)" }} />
              <div style={{ position: "absolute", left: -p.r - 24, top: p.len + p.r - 6, width: 28, height: 9, borderRadius: 4, background: "#22252B", transform: "rotate(-18deg)" }} />
            </div>
          );
        })}

        {/* ===================== ORDER TICKET RAIL (thick with fluttering tickets) ===================== */}
        <svg width={1012} height={44} viewBox="0 0 1012 44" style={{ position: "absolute", left: 0, top: 52 }}>
          <path d="M360 34 Q506 50 720 34" fill="none" stroke="#B07E1E" strokeWidth={2.4} />
        </svg>
        {S0_TICKETS.map((t, i) => {
          const flutter = Math.sin(lf / 11 + i * 1.7) * 2.4 + Math.sin(lf / 4.3 + i * 2.1) * 0.9;   // richer flutter
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: t.x, top: 62 + Math.abs(t.rot), width: 56, height: 76, background: "linear-gradient(180deg,#FBF7ED,#E7E0D0)", borderRadius: 3, transform: `rotate(${t.rot + flutter}deg)`, transformOrigin: "50% 0%", boxShadow: "0 7px 14px -6px rgba(0,0,0,0.6)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 25, top: -6, width: 6, height: 12, background: "#E23B2E" }} />
              <div style={{ position: "absolute", left: 8, top: 12, width: 40, height: 4, background: "#E23B2E" }} />
              {[24, 32, 40, 48, 56, 64].map((yy, k) => <div key={k} style={{ position: "absolute", left: 8, top: yy, width: 40 - (k % 2) * 12, height: 3, background: "#B9B2A2" }} />)}
            </div>
          );
        })}
        {/* NEW tickets SLAP onto the rail mid-service (fills the gaps, bounces) */}
        <S0_TicketSlap lf={lf} at={30} x={512} rot={-5} />
        {/* extra slaps that keep the rail alive through the "no sucking up / no saying great job" head-shake stretch (lf 64-104 lull) */}
        <S0_TicketSlap lf={lf} at={64} x={684} rot={7} />
        <S0_TicketSlap lf={lf} at={90} x={470} rot={-6} />
        <S0_TicketSlap lf={lf} at={110} x={636} rot={6} />
        {/* fresh ticket SLAPS in during the crossed-arms verdict hold (fills the 122-156 lull) */}
        <S0_TicketSlap lf={lf} at={138} x={572} rot={-6} />

        {/* ===================== BACKGROUND STATION GLOW POOLS ===================== */}
        {[130, 902].map((gx, i) => <div key={"glow" + i} style={{ position: "absolute", left: gx - 70, top: 400, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,122,26,${0.42 * lampF}), transparent 70%)`, filter: "blur(7px)" }} />)}

        {/* ===================== PASSING WAITERS (deep bg, HURRY behind the pass) ===================== */}
        <div style={{ position: "absolute", left: waiter1X - 24, top: 404 + waiterBob, width: 48, height: 48, opacity: 0.34, filter: "brightness(0.66) blur(0.6px)" }}>
          <Mascot lf={lf} size={48} tint={CLAY} gaze={0} />
          <div style={{ position: "absolute", left: 6, top: -8, width: 36, height: 7, borderRadius: 3, background: "linear-gradient(180deg,#D6DEE8,#8792A2)", transform: `rotate(${Math.sin(lf / 5) * 5}deg)` }} />
          <div style={{ position: "absolute", left: 16, top: -16, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle,#EDF1F6,#9AA6B6)" }} />
        </div>
        <div style={{ position: "absolute", left: waiter2X - 24, top: 400 + waiter2Bob, width: 48, height: 48, opacity: 0.3, filter: "brightness(0.6) blur(0.7px)", transform: "scaleX(-1)" }}>
          <Mascot lf={lf + 9} size={48} tint={CLAY} gaze={0} />
          <div style={{ position: "absolute", left: 6, top: -8, width: 36, height: 7, borderRadius: 3, background: "linear-gradient(180deg,#D6DEE8,#8792A2)", transform: `rotate(${Math.sin(lf / 5 + 1) * 5}deg)` }} />
          <div style={{ position: "absolute", left: 16, top: -16, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle,#EDF1F6,#9AA6B6)" }} />
        </div>

        {/* ===================== BACKGROUND LINE-COOKS (dim, actively PLATING — dip + tapping hand) ===================== */}
        {S0_COOKS.map((c, i) => {
          const cyc = (((lf + c.ph * 20) % c.per) + c.per) % c.per / c.per;   // plating cycle
          const dip = Math.max(0, Math.sin(cyc * Math.PI)) * 6;               // lean down to the plate
          const by = bob(lf, c.amp, c.per, c.ph) + dip;
          const bx = Math.sin(lf / (52 + i * 5) + c.ph) * 3;
          const cookLean = Math.sin(lf / (30 + i * 4) + c.ph * 1.3) * 2 + dip * 0.5;
          const plating = i % 2 === 1;                                        // odd cooks actively plate
          const handY = Math.sin(cyc * Math.PI * 2) * 5;
          return (
            <div key={"cook" + i} style={{ position: "absolute", left: c.x - c.size / 2 + bx, top: (470 - c.size) + by, width: c.size, height: c.size, opacity: 0.5, filter: "brightness(0.72) blur(0.4px)", transform: `rotate(${cookLean}deg)`, transformOrigin: "50% 90%" }}>
              <Mascot lf={lf + Math.round(c.ph * 17)} size={c.size} tint={c.tint} gaze={0} stern={0.4} />
              {plating ? (
                <>
                  <div style={{ position: "absolute", left: c.size * 0.52, top: c.size * 0.66, width: c.size * 0.46, height: c.size * 0.15, borderRadius: "50%", background: "radial-gradient(ellipse at 44% 30%,#E7ECF2,#8B96A5)", transform: "translateX(-50%)" }} />
                  <div style={{ position: "absolute", left: c.size * 0.6, top: c.size * 0.46 + handY, width: c.size * 0.12, height: c.size * 0.12, borderRadius: "50%", background: c.tint, filter: "brightness(1.2)" }} />
                </>
              ) : null}
            </div>
          );
        })}

        {/* ===================== BACK PREP COUNTER (occludes cook legs -> depth) ===================== */}
        <div style={{ position: "absolute", left: 0, top: 452, width: 1012, height: 26, background: "linear-gradient(180deg,#8792A2,#48525F)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4)" }} />
        <div style={{ position: "absolute", left: 0, top: 452, width: 1012, height: 26, background: `linear-gradient(180deg, rgba(255,150,60,${0.14 * lampF}), transparent)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 478, width: 1012, height: 78, background: "linear-gradient(180deg,#3A424E,#191D23)" }} />

        {/* ===================== SQUEEZE BOTTLES on the back counter (red + yellow) ===================== */}
        {[{ x: 322, c1: "#E23B2E", c2: "#A81E15" }, { x: 352, c1: "#E7B24C", c2: "#B07E1E" }].map((b, i) => (
          <div key={"sq" + i} style={{ position: "absolute", left: b.x, top: 414, width: 20, height: 40 }}>
            <div style={{ position: "absolute", left: 0, top: 8, width: 20, height: 32, borderRadius: "9px 9px 5px 5px", background: `linear-gradient(180deg,${b.c1},${b.c2})`, boxShadow: "inset 2px 0 3px rgba(255,255,255,0.35)" }} />
            <div style={{ position: "absolute", left: 6, top: -2, width: 8, height: 12, borderRadius: "3px 3px 0 0", background: "#20242A" }} />
          </div>
        ))}

        {/* ===================== DRIFTING HEAT HAZE off the range (atmospheric shimmer) ===================== */}
        {S0_HAZES.map((h, i) => <S0_HeatHaze key={"hz" + i} x={h.x} base={h.base} lf={lf} w={h.w} h={h.h} ph={h.ph} op={h.op} />)}

        {/* ===================== MIDGROUND COOKING on the back counter (flames FLARE in BURSTS) ===================== */}
        <S0_Flame x={110} y={468} s={58} lf={lf} ph={0.4} op={0.85} vary={1.2} />
        <S0_Flame x={150} y={462} s={72} lf={lf} ph={2.1} op={0.9} vary={0.8} />
        <S0_PanToss x={236} y={430} lf={lf} s={54} ph={0} />
        <S0_SteamJet x={560} base={452} lf={lf} n={5} size={38} op={0.3} ph={0.6} rise={170} />
        <S0_SteamJet x={700} base={452} lf={lf} n={4} size={34} op={0.26} ph={2.2} rise={160} />
        <S0_Flame x={880} y={468} s={66} lf={lf} ph={3.1} op={0.88} vary={1.5} />
        <S0_Flame x={924} y={462} s={80} lf={lf} ph={1.2} op={0.92} vary={1.0} />
        <S0_Flambe x={902} y={470} lf={lf} at={96} period={150} s={120} />
        {/* OPENING FLAME WHOOMP on the range — roars up with the smash */}
        <S0_Flambe x={560} y={452} lf={lf} at={2} period={9999} s={150} />
        {/* extra BURST flares punching through the service — left, right, and one punctuating the final roar */}
        <S0_Flambe x={150} y={462} lf={lf} at={46} period={104} s={112} />
        <S0_Flambe x={880} y={468} lf={lf} at={92} period={116} s={120} />
        {/* right-station flare punctuating "great job" (~lf80) + left flare on the verdict hold (~lf132, fills the lull) */}
        <S0_Flambe x={880} y={468} lf={lf} at={80} period={9999} s={112} />
        <S0_Flambe x={150} y={462} lf={lf} at={132} period={9999} s={118} />
        <S0_Flambe x={560} y={452} lf={lf} at={200} period={9999} s={140} />
        {/* CADENCE-SMOOTHING flares — a left flare at lf64 (fills 46-80), a right flare at lf118 (fills 96-132),
            and a left flare at lf168 (fills the big 150-200 flame gap and punches the lean-in to the verdict) */}
        <S0_Flambe x={150} y={462} lf={lf} at={64} period={9999} s={110} />
        <S0_Flambe x={880} y={468} lf={lf} at={118} period={9999} s={116} />
        <S0_Flambe x={150} y={462} lf={lf} at={168} period={9999} s={122} />
        <Embers lf={lf} n={16} w={860} base={456} />
        {S0_SPARKS.map((s, i) => { const p = (((lf * s.sp * 0.02 + s.ph) % 1) + 1) % 1; const yy = 456 - p * 130; return <div key={"sp" + i} style={{ position: "absolute", left: s.x + Math.sin(lf / 6 + i) * 9, top: yy, width: 3, height: 3, borderRadius: "50%", background: "#FFC23D", opacity: (1 - p) * 0.9, boxShadow: "0 0 7px #FF8A3D" }} />; })}

        {/* ===================== AMBIENT STEAM drifting off the pass ===================== */}
        {S0_STEAM.map((s, i) => { const t = (lf + s.delay) % 118; const p = t / 118; const yy = s.base - p * 300; const op = Math.sin(p * Math.PI) * 0.28; return <div key={"stm" + i} style={{ position: "absolute", left: s.x - s.size / 2 + Math.sin(lf / 9 + i) * s.sway, top: yy, width: s.size, height: s.size * 1.1, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,240,232,0.9), transparent 68%)", opacity: op, filter: "blur(7px)" }} />; })}

        {/* ===================== HEAT LAMPS over the pass (warm shimmer) ===================== */}
        <div style={{ position: "absolute", left: 540, top: 548, width: 340, height: 12, borderRadius: 6, background: "linear-gradient(180deg,#F0D9A0,#B07E1E)", boxShadow: "inset 0 2px 0 rgba(255,246,214,0.6)" }} />
        {[600, 680, 760, 820].map((hx, i) => <div key={"hl" + i} style={{ position: "absolute", left: hx - 16, top: 560, width: 32, height: 15, borderRadius: "0 0 16px 16px", background: "linear-gradient(180deg,#B07E1E,#7A3A10)", boxShadow: `0 10px 26px 5px rgba(255,138,61,${0.55 * lampF})` }} />)}
        {[600, 680, 760, 820].map((hx, i) => <div key={"hlg" + i} style={{ position: "absolute", left: hx - 30, top: 566, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,178,80,${(0.34 + 0.08 * Math.sin(lf / 7 + i)) * lampF}), transparent 70%)`, filter: "blur(3px)" }} />)}

        {/* ===================== HERO SPOTLIGHT + steady rim glow ===================== */}
        <SpotCone x={S0_CHX} top={-12} topW={70} botW={440} h={700} color={`rgba(255,240,206,${0.24 * lampF})`} sway={1.4} lf={lf} pool={0.95} />
        <div style={{ position: "absolute", left: S0_CHX - 180, top: 320, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,120,50,${0.24 + 0.05 * Math.sin(lf / 8)}), transparent 66%)`, filter: "blur(10px)" }} />
        <S0_Flame x={S0_CHX - 78} y={648} s={78} lf={lf} ph={2.2} op={0.42} vary={1.3} />
        <S0_Flame x={S0_CHX + 70} y={654} s={70} lf={lf} ph={4.4} op={0.38} vary={0.9} />

        {/* ===================== THE HERO — RAMSAY CHEF (behind the pass edge, full-body verdict performance) ===================== */}
        <div style={{ position: "absolute", left: CHL, top: S0_CHTOP, width: S0_CHSIZE, height: S0_CHSIZE, transform: `translate(${chefX}px, ${chefY}px) rotate(${chefRot}deg) scaleX(${chefSX}) scale(${S0_growCam})`, transformOrigin: "50% 92%", filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.6))" }}>
          <RamsayChef lf={lf} size={S0_CHSIZE} pose={S0_chefPose} tint={CLAY} yell={S0_yell} gaze={S0_gaze} brow={S0_brow} toque={0} nod={0} />
          {/* bead of sweat on the rage peak — swells at the temple, then drips */}
          {sweatOp > 0.01 ? (
            <div style={{ position: "absolute", left: S0_CHSIZE * 0.335 + tremor * 0.4, top: S0_CHSIZE * 0.235 + sweatDrip * S0_CHSIZE * 0.11, width: 9 + sweatIn * 3, height: 12 + sweatIn * 5 + sweatDrip * 4, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "radial-gradient(ellipse at 38% 28%, #FFFFFF, #BFE0F2 55%, #7FB4D8)", opacity: sweatOp * 0.92, boxShadow: "0 0 6px rgba(160,210,240,0.7)", transform: "translate(-50%,-100%)" }} />
          ) : null}
          {/* SIGNATURE — SWEAT SPRAY flung off his shaking head as he ROARS into camera */}
          {S0_spray > 0.01 && S0_spray < 0.985 ? (
            <div style={{ position: "absolute", left: S0_CHSIZE * 0.4, top: S0_CHSIZE * 0.2, width: 0, height: 0, zIndex: 7, pointerEvents: "none" }}>
              {S0_SWEAT_SPRAY.map((d, i) => {
                const g = S0_spray;
                const px = Math.cos(d.ang) * d.dist * g;
                const py = Math.sin(d.ang) * d.dist * g * 0.72 + g * g * d.drop;
                const op = Math.max(0, 1 - g * g);
                const sc = 1 - g * 0.3;
                return <div key={"swp" + i} style={{ position: "absolute", left: px, top: py, width: d.sz, height: d.sz * 1.25, borderRadius: "50% 50% 50% 50% / 60% 60% 42% 42%", background: "radial-gradient(ellipse at 38% 28%, #FFFFFF, #BFE0F2 55%, #7FB4D8)", opacity: op * 0.9, boxShadow: "0 0 5px rgba(160,210,240,0.7)", transform: `translate(-50%,-100%) scale(${sc})` }} />;
              })}
            </div>
          ) : null}
        </div>

        {/* ===================== OPENING RAGE BUBBLE — "OI!" (pattern interrupt), then the verdict "THE TRUTH." ===================== */}
        <SpeechBubble lf={lf} at={0 / 30} dur={0.62} x={486} y={300} text="OI!" tail="down" tone="rage" size={42} />
        <SpeechBubble lf={lf} at={190 / 30} dur={1.35} x={418} y={344} text="THE TRUTH." tail="down" tone="rage" size={30} />

        {/* ===================== THE PASS (blue-steel counter, front) with warm brass trim + wood kick ===================== */}
        <div style={{ position: "absolute", left: 0, top: S0_PASSY, width: 1012, height: 100, background: "linear-gradient(180deg,#D6DEE8 0%,#9AA6B6 42%,#5C6A7E 100%)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.6)" }} />
        <div style={{ position: "absolute", left: 0, top: S0_PASSY, width: 1012, height: 10, background: "linear-gradient(180deg,rgba(255,255,255,0.65),transparent)" }} />
        <div style={{ position: "absolute", left: 0, top: S0_PASSY + 90, width: 1012, height: 8, background: "linear-gradient(180deg,#F0D9A0,#B07E1E)", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: 0, top: S0_PASSY, width: 1012, height: 100, background: `linear-gradient(180deg, rgba(255,150,60,${0.16 * lampF}), transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: S0_PASSY + 100, width: 1012, height: 60, background: "linear-gradient(180deg,#4A3320,#241608)" }} />

        {/* ===================== STACK OF WHITE PLATES on the pass (left of the hero) ===================== */}
        <div style={{ position: "absolute", left: 120, top: S0_PASSY - 26, width: 96, height: 40, zIndex: 18 }}>
          {[0, 1, 2, 3, 4, 5].map((k) => <div key={"pl" + k} style={{ position: "absolute", left: 0, top: 26 - k * 4.4, width: 96, height: 14, borderRadius: "50%", background: "radial-gradient(ellipse at 44% 30%,#F3F6FA,#B7C0CC)", boxShadow: "0 2px 4px -1px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)" }} />)}
        </div>

        {/* ===================== FRESH PLATE FIRED to the pass -> gets PLATED with food -> STEAMS (the chef's active work) ===================== */}
        <S0_SlidePlate lf={lf} at={16} fromX={1060} toX={S0_PLATE2X} y={S0_DISHY} dur={20} />
        <S0_Plating lf={lf} at={44} x={S0_PLATE2X} y={S0_DISHY - 26} />
        {/* SECOND wave of plating on that same plate during the crossed-arms hold — keeps the pass "worked" through lf 84-104 (a lull) */}
        <S0_Plating lf={lf} at={84} x={S0_PLATE2X} y={S0_DISHY - 26} />
        <div style={{ opacity: over(lf, 50, 12) }}>
          <S0_SteamJet x={S0_PLATE2X} base={S0_DISHY - 34} lf={lf} n={4} size={30} op={0.28} ph={0.3} rise={130} sway={9} />
        </div>
        {/* extra steam PUFF that jets up when the second plating wave lands (~lf 92) */}
        <div style={{ opacity: over(lf, 92, 10) }}>
          <S0_SteamJet x={S0_PLATE2X + 6} base={S0_DISHY - 40} lf={lf} n={3} size={26} op={0.24} ph={1.6} rise={120} sway={11} />
        </div>

        {/* ===================== THE DISH (your work) — resting on the pass, gentle placement settle + judge-tremble ===================== */}
        <div style={{ position: "absolute", left: S0_DISHX + dishJudge, top: dishY, transform: `translate(-50%,-100%) scale(${dishSqX},${dishSqY}) rotate(${dishJudge * 0.3}deg)`, transformOrigin: "50% 100%", zIndex: 20 }}>
          <div style={{ position: "absolute", left: -96, top: 22, width: 192, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.34)", filter: "blur(5px)" }} />
          <div style={{ position: "absolute", left: -92, top: 0, width: 184, height: 48, borderRadius: "50%", background: "radial-gradient(ellipse at 46% 32%,#EDF1F6,#98A3B2)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.7)" }} />
          <div style={{ position: "absolute", left: -54, top: 8, width: 108, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse at 44% 34%,#C7CFDA,#7C8797)" }} />
          {/* sad little burnt portion */}
          <div style={{ position: "absolute", left: -28, top: 2, width: 56, height: 28, borderRadius: "50% 50% 46% 46%", background: "radial-gradient(circle at 40% 30%,#B8672E,#7A3D18)" }} />
          <div style={{ position: "absolute", left: -8, top: -2, width: 22, height: 12, borderRadius: "50%", background: "#3F9E74", opacity: 0.85 }} />
          {/* a wisp of steam off the plate */}
          <S0_SteamJet x={0} base={4} lf={lf} n={3} size={26} op={0.22} ph={1.1} rise={90} sway={8} />
          {/* dark, greasy smoke curling off the BAD dish during the verdict hold (it "actually isn't" good) */}
          {S0_rejectSmoke > 0.01 ? (
            <div style={{ opacity: S0_rejectSmoke }}>
              {[0, 1, 2, 3].map((k) => {
                const period = 46;
                const t = (((lf - 124) + k * (period / 4)) % period + period) % period / period;
                const yy = 4 - t * 92;
                const o = Math.sin(t * Math.PI) * 0.5;
                return <div key={"rsm" + k} style={{ position: "absolute", left: -10 + Math.sin(t * 6.28 + k) * 16, top: yy, width: 30 + t * 22, height: (30 + t * 22) * 1.05, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,50,44,0.9), transparent 66%)", opacity: o, filter: "blur(7px)", transform: "translate(-50%,-100%)" }} />;
              })}
            </div>
          ) : null}
        </div>

        {/* ===================== SIGNATURE HERO STUNT — the SNATCHED "perfect" plate: raised, inspected, then SLAMMED on "brutal truth" ===================== */}
        {S0_dishIn > 0.01 ? (
          <>
            {/* pass shadow — shrinks & fades as the plate is lifted, hardens back on the slam */}
            <div style={{ position: "absolute", left: S0_slamPosX, top: S0_SLAMRESTY, transform: "translate(-50%,-50%)", width: 158 - Math.min(74, S0_hAbove * 0.42), height: 28, borderRadius: "50%", background: `rgba(0,0,0,${0.36 * (1 - Math.min(0.72, S0_hAbove / 210))})`, filter: "blur(6px)", opacity: S0_dishIn, zIndex: 20, pointerEvents: "none" }} />
            {/* the plate (SNATCH up -> INSPECT tilt -> SLAM down) */}
            <div style={{ position: "absolute", left: S0_slamPosX, top: S0_SLAMRESTY + S0_slamY, transform: `translate(-50%,-50%) rotate(${S0_slamTilt}deg)`, transformOrigin: "50% 50%", zIndex: 21, opacity: S0_dishIn }}>
              {/* downward motion smear while it whips down */}
              {S0_slam > 0.06 && S0_slam < 0.92 ? (
                <div style={{ position: "absolute", left: 0, top: -150, width: 18, height: 130, borderRadius: 9, background: "linear-gradient(180deg, rgba(237,241,246,0), rgba(237,241,246,0.5))", opacity: (1 - S0_slam) * 0.6, filter: "blur(4px)", transform: "translateX(-50%)" }} />
              ) : null}
              {/* rim + well */}
              <div style={{ position: "absolute", left: -84, top: -23, width: 168, height: 46, borderRadius: "50%", background: "radial-gradient(ellipse at 46% 32%,#F3F6FA,#98A3B2)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.75)" }} />
              <div style={{ position: "absolute", left: -50, top: -15, width: 100, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse at 44% 34%,#C7CFDA,#7C8797)" }} />
              {/* the "perfect" quenelle (looks pristine — the brutal truth says otherwise) */}
              <div style={{ position: "absolute", left: -26, top: -22, width: 52, height: 26, borderRadius: "60% 60% 50% 50%", background: "radial-gradient(circle at 40% 30%,#5CBE90,#2E7A55)", boxShadow: "inset 0 2px 3px rgba(255,255,255,0.35)" }} />
              <div style={{ position: "absolute", left: -6, top: -26, width: 20, height: 12, borderRadius: "50%", background: "#E7B24C", opacity: 0.9 }} />
              <div style={{ position: "absolute", left: -34, top: -12, width: 14, height: 8, borderRadius: "50%", background: "#C44A3A", opacity: 0.85 }} />
              {/* crack lines that snap across the plate on impact */}
              {S0_shock > 0.02 ? (
                <svg width={168} height={50} viewBox="0 0 168 50" style={{ position: "absolute", left: -84, top: -25, overflow: "visible", opacity: Math.min(1, S0_shock * 2) }}>
                  <path d="M40 8 L70 26 L58 42 M120 10 L96 26 L112 44 M84 4 L84 28" fill="none" stroke="rgba(58,64,72,0.7)" strokeWidth={2} strokeLinecap="round" />
                </svg>
              ) : null}
            </div>
            {/* IMPACT — warm dust puff */}
            {S0_shock > 0.01 && S0_shock < 0.98 ? (
              <div style={{ position: "absolute", left: S0_SLAMX, top: S0_SLAMRESTY - 14, transform: `translate(-50%,-50%) scale(${0.5 + S0_shock * 1.6})`, width: 150, height: 96, borderRadius: "50%", background: "radial-gradient(circle, rgba(238,232,220,0.5), rgba(255,170,90,0.18) 55%, transparent 74%)", opacity: (1 - S0_shock) * 0.85, filter: "blur(6px)", zIndex: 22, pointerEvents: "none" }} />
            ) : null}
            {/* IMPACT — shockwave ring */}
            {S0_shock > 0.01 && S0_shock < 0.985 ? (
              <div style={{ position: "absolute", left: S0_SLAMX, top: S0_SLAMRESTY, transform: `translate(-50%,-50%) scale(${0.4 + S0_shock * 2.6})`, width: 150, height: 34, borderRadius: "50%", border: "3px solid rgba(255,205,130,0.8)", opacity: (1 - S0_shock) * 0.8, zIndex: 23, pointerEvents: "none" }} />
            ) : null}
            {/* IMPACT — food splatter flung out on the SLAM */}
            {S0_splat > 0.01 && S0_splat < 0.99 ? (
              <div style={{ position: "absolute", left: S0_SLAMX, top: S0_SLAMRESTY - 8, width: 0, height: 0, zIndex: 24, pointerEvents: "none" }}>
                {S0_SPLAT.map((d, i) => {
                  const g = S0_splat;
                  const px = Math.cos(d.ang) * d.spd * g;
                  const py = Math.sin(d.ang) * d.spd * g * 0.5 - d.up * 48 * (1 - Math.pow(1 - g, 1.5)) + g * g * 92;
                  const op = Math.max(0, 1 - g * g);
                  return <div key={"spl" + i} style={{ position: "absolute", left: px, top: py, width: d.sz, height: d.sz * 0.82, borderRadius: "50%", background: d.c, boxShadow: "0 1px 2px rgba(0,0,0,0.4)", opacity: op, transform: "translate(-50%,-50%)" }} />;
                })}
              </div>
            ) : null}
          </>
        ) : null}

        {/* burnt chunk FLICKED off the bad dish on the verdict recoil (food action filling the lull) */}
        <S0_Reject lf={lf} at={134} x={S0_DISHX - 22} y={S0_DISHY - 42} />

        {/* ===================== OPENING PLATE SMASH on the pass (shards fly over the front) ===================== */}
        <S0_Smash x={S0_SMX} y={S0_SMY} lf={lf} />

        {/* ===================== foreground warmth + edge vignette (steady) ===================== */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 100% at 50% 44%, transparent 50%, rgba(12,6,3,0.6) 100%)" }} />
      </div>
    </>
  );
};

// ===== S1 =====
// ===== S1 =====
// ===== S1 =====
// ===== S1 =====
// ===== S1 =====
// ============================== S1 — THE YES-MAN (212f / 7.07s) ==============================
// SETTING (KEEP): an ELEGANT candlelit FINE-DINING ROOM — warm wood panelling, a glowing brass
// chandelier, brass sconces, a wine rack, framed art, a plush burgundy booth, white-linen tables
// with candles + wine + folded napkins receding into warm bokeh. ONE CONTINUOUS SHOT.
// NOW EVENTFUL: the blue yes-man WAITER is FRANTIC — he whips the cloche off, deep-bows, CLAPS,
// SPRINTS to the dish and back planting absurd garnish (a tiny flag, then a sparkler), an APPLAUSE
// meter RACES up to 5.0, gold TROPHIES + medals PILE up beside the plate, a "PERFECT!" banner
// UNFURLS, praise bubbles keep popping (AMAZING!/5 STARS!/CHEF'S KISS!) and gold 5★ keep raining —
// a rising CRESCENDO — while YOUR dish smokes worse and worse underneath, until it DETONATES on
// "blows"@190 (in-frame, no cut, no full-screen flash). Calm camera — slow push-in only.
// MORE-ACTION PASS: filled the hero lull @50–72 with a flourish curtsy-bow; the seated diners now
// clap continuously (not just at the peak); a second applauding food-runner crosses the back; roses
// are TOSSED onto the dish (@58 + @140); gold CONFETTI rains through the crescendo; a 5th trophy
// keeps popping in right before the blowup (@180); one more "10/10!" praise bubble lands over the dish.
// SIGNATURE MOMENT (NEW): @152–170 a GIANT gold "10/10 CHEF'S KISS" medal SWINGS down and THWACKS
// onto the obviously-burnt dish (speed-lines → slam → gold ring + spikes + sparkle burst), then
// @172–190 the fawning waiter SWOONS/FAINTS backward with hearts fluttering up + dizzy hearts
// orbiting his head — absurd over-the-top praise — right before the dish blows up at 190.
const S1_EXPLODE = 190;          // boom lands on VO "blows"@190
const S1_DCX = 560;              // dish / plate center x (hero, center-right)
const S1_PLATE = 612;            // plate rim y
const S1_BENCH = 596;            // linen tabletop top
const S1_BLUE = "#5AA0DE";       // generic "normal Claude" blue yes-man tint
const S1_MANX = 159;             // yes-man HOME body center x (bubble tails point here)
const S1_FONT = "Fraunces, Georgia, 'Times New Roman', serif";  // literal font string (do NOT assume globals)
// warm fine-dining palette (local)
const S1_WOOD = "#5A3A22";
const S1_WOODD = "#3A2414";
const S1_WOODDK = "#25160C";
const S1_LINEN = "#F4E9D2";
const S1_LINEND = "#E4D0A8";
const S1_BURG = "#6E2233";
const S1_BURGD = "#48141F";
const S1_CANDLE = "#FFD27A";
const S1_CANDLECORE = "#FFF3C8";

// yes-man horizontal PATH (body center x): home → sprint to dish (plant flag) → home (chef's kiss)
// → sprint to dish (plant sparkler) → stays for the boom → flung left. Numeric, monotonic keys.
const S1_XKEYS = [0, 90, 108, 116, 128, 150, 166, 190, 200, 212];
const S1_XVALS = [159, 159, 465, 465, 159, 159, 470, 470, 320, 150];
// clap windows [start,end] — hero claps frantically; drives hop energy + clap bursts
// MORE-ACTION: added an OPENING clap [4,24] so the yes-man is already applauding before the reveal
// (kills the hop-only 0-6 opening lull). The rest of the timeline is already covered by
// bow/curtsy/sprint/plant beats, so with this the mascot never holds still.
const S1_CLAPWINS = [[4, 24], [28, 50], [72, 92], [126, 150], [176, 188]];

// --- raining praise: gold stars + a few pink hearts, seed-driven ---
const S1_STARS = Array.from({ length: 26 }, (_, i) => ({
  x0: 372 + seed(i * 1.31) * 376, ph: seed(i * 2.77), sp: 0.65 + seed(i * 1.9) * 0.7,
  s: 18 + seed(i * 3.1) * 22, rot: seed(i * 4.3) * 360, sw: (seed(i * 5.1) - 0.5) * 70,
  c: seed(i * 6.2) > 0.72 ? "#FFF0B8" : GOLD,
}));
const S1_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  x0: 400 + seed(i * 2.13) * 320, ph: seed(i * 3.33), sp: 0.55 + seed(i * 1.4) * 0.6,
  s: 16 + seed(i * 2.6) * 14, c: seed(i * 4.9) > 0.5 ? "#FF8FB0" : PINK,
}));
// SIGNATURE MOMENT: hearts that flutter UP off the swooning/fainting yes-man (seed-driven)
const S1_SWOONHEARTS = Array.from({ length: 10 }, (_, i) => ({
  dx: (seed(i * 1.7 + 9) - 0.5) * 130, sp: 0.7 + seed(i * 2.3 + 3) * 0.7, ph: seed(i * 3.1 + 5),
  s: 16 + seed(i * 4.4 + 2) * 16, c: seed(i * 5.2 + 1) > 0.5 ? "#FF8FB0" : PINK,
}));
// --- explosion scatter ---
const S1_FRAG = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2 + seed(i) * 0.5;
  return { a, sp: 210 + seed(i * 2.7) * 240, s: 7 + seed(i * 1.9) * 16, rot: seed(i * 5) * 360,
    c: [GOLD, "#FFF0B8", FLAMEY, FLAME, "#7A3018", "#160F0A"][i % 6] };
});
const S1_SMOKE = Array.from({ length: 14 }, (_, i) => ({ ph: seed(i * 2.9), dx: (seed(i * 3.7) - 0.5) * 250, sp: 0.9 + seed(i * 1.3) * 0.6 }));
// warm drifting embers/dust motes floating in the candlelight
const S1_AMB = Array.from({ length: 20 }, (_, i) => ({ x: 90 + seed(i * 1.7) * 840, ph: seed(i * 2.2), sp: 0.35 + seed(i * 1.1) * 0.55, s: 3 + seed(i * 3.3) * 3 }));
// growing char blooms on the "secretly broken" dish (seed-driven, bloom in over time)
const S1_CHAR = Array.from({ length: 7 }, (_, i) => ({
  dx: (seed(i * 1.7) - 0.5) * 58, dy: -6 - seed(i * 2.3) * 30, r: 5 + seed(i * 3.1) * 7,
  t0: 0.18 + seed(i * 4.7) * 0.62, ph: seed(i * 5.3) * 6,
}));
// warm golden BOKEH orbs receding into the dining room (depth + ambience)
const S1_BOKEH = Array.from({ length: 16 }, (_, i) => ({
  x: 70 + seed(i * 1.9) * 880, y: 150 + seed(i * 2.6) * 300, r: 12 + seed(i * 3.4) * 34,
  ph: seed(i * 4.1) * 6, sp: 0.4 + seed(i * 1.3) * 0.6, op: 0.1 + seed(i * 5.2) * 0.22,
  c: seed(i * 6.1) > 0.6 ? "#FFE1A0" : "#F0A64E",
}));
// dim background DINERS seated in the warm room (depth/life, varied gentle bob)
const S1_DINERS = [
  { x: 176, top: 300, tint: "#B4794C", gaze: 1, per: 66, amp: 3, ph: 0, size: 58 },
  { x: 322, top: 296, tint: "#9C6B47", gaze: -1, per: 73, amp: 3, ph: 22, size: 60 },
  { x: 700, top: 298, tint: "#A87246", gaze: 1, per: 78, amp: 3, ph: 12, size: 58 },
  { x: 856, top: 302, tint: "#8F6040", gaze: -1, per: 69, amp: 4, ph: 34, size: 56 },
];
// background dining tables (linen + candle glow), receding for depth
const S1_TABLES = [
  { x: 176, top: 342, w: 118, glow: 0 }, { x: 322, top: 338, w: 122, glow: 1.7 },
  { x: 700, top: 340, w: 120, glow: 3.1 }, { x: 856, top: 344, w: 112, glow: 2.2 },
];
// the growing PILE of gold trophies + medals beside the dish (each pops in on `at`)
// MORE-ACTION: a 5th trophy pops in at 180 — a fresh praise prop entering right up to the blowup
const S1_TROPHIES = [
  { x: 786, y: 650, s: 1.0, at: 56, medal: false },
  { x: 858, y: 654, s: 0.9, at: 96, medal: true },
  { x: 820, y: 604, s: 0.82, at: 132, medal: false },
  { x: 892, y: 640, s: 0.76, at: 168, medal: true },
  { x: 762, y: 606, s: 0.72, at: 180, medal: false },
];
// MORE-ACTION: bouquets of roses TOSSED onto the dish (arc in from the applauding room)
const S1_ROSES = [
  { at: 58, x: S1_DCX - 44, fromX: 150, fromY: 468, rot: -22, s: 1.0 },
  { at: 140, x: S1_DCX + 50, fromX: 236, fromY: 430, rot: 26, s: 0.9 },
];

// gold 5-point star
const S1_Star: React.FC<{ s: number; c: string; op?: number }> = ({ s, c, op = 1 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} style={{ opacity: op, filter: `drop-shadow(0 2px 4px rgba(183,132,20,0.55))` }}>
    <path d="M12 1.6 L15.2 8.6 L22.6 9.4 L17 14.3 L18.7 21.6 L12 17.6 L5.3 21.6 L7 14.3 L1.4 9.4 L8.8 8.6 Z" fill={c} />
    <path d="M12 4.2 L14 8.8 L13 9.6 L12 7.8 Z" fill="rgba(255,255,255,0.75)" />
  </svg>
);

// little heart
const S1_Heart: React.FC<{ s: number; c: string; op?: number }> = ({ s, c, op = 1 }) => (
  <svg viewBox="0 0 32 30" width={s} height={s * 30 / 32} style={{ opacity: op, filter: "drop-shadow(0 2px 4px rgba(226,123,160,0.5))" }}>
    <path d="M16 29 L4 16 A6.6 6.6 0 0 1 16 6 A6.6 6.6 0 0 1 28 16 Z" fill={c} />
    <circle cx={11} cy={12} r={2.4} fill="rgba(255,255,255,0.6)" />
  </svg>
);

// MORE-ACTION: a tossed long-stem ROSE (S1-local) — flies in and lands on the dish as fake praise
const S1_Rose: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <svg viewBox="0 0 48 64" width={48 * s} height={64 * s} style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(30,18,10,0.45))" }}>
    {/* stem */}
    <path d="M23 24 Q19 44 21 62" stroke="#3F7A46" strokeWidth={4} fill="none" strokeLinecap="round" />
    {/* leaves */}
    <path d="M22 40 Q10 38 7 29 Q19 31 23 40 Z" fill="#4E8F4E" />
    <path d="M24 48 Q35 46 38 37 Q27 39 22 48 Z" fill="#3F7A46" />
    {/* bloom */}
    <circle cx={24} cy={16} r={14} fill="#B8283F" />
    <circle cx={24} cy={16} r={11} fill="#D23A55" />
    <path d="M24 6 Q31 11 29 18 Q24 13 24 6 Z" fill="#9E2338" />
    <path d="M24 6 Q17 11 19 18 Q24 13 24 6 Z" fill="#C33049" />
    <path d="M14 16 Q18 24 24 24 Q20 18 14 16 Z" fill="#E1556E" />
    <circle cx={24} cy={16} r={4.5} fill="#F2879B" />
  </svg>
);

// MORE-ACTION: a little clapping HAND-PAIR (S1-local) — drives constant background applause
const S1_ClapHands: React.FC<{ lf: number; ph: number; s?: number; tint?: string }> = ({ lf, ph, s = 1, tint = "#B4794C" }) => {
  const beat = Math.abs(Math.sin(lf / 2.2 + ph));
  const gap = (3 + beat * 10) * s;
  return (
    <div style={{ position: "relative", width: 40 * s, height: 24 * s }}>
      <div style={{ position: "absolute", left: 20 * s - gap - 11 * s, top: 0, width: 14 * s, height: 18 * s, borderRadius: "48% 52% 52% 48%", background: `linear-gradient(160deg,#F2D9B8,${tint})`, boxShadow: "0 2px 3px rgba(20,10,4,0.4)" }} />
      <div style={{ position: "absolute", left: 20 * s + gap - 3 * s, top: 0, width: 14 * s, height: 18 * s, borderRadius: "52% 48% 48% 52%", background: `linear-gradient(200deg,#F2D9B8,${tint})`, boxShadow: "0 2px 3px rgba(20,10,4,0.4)" }} />
      {beat < 0.2 && <div style={{ position: "absolute", left: 20 * s - 5 * s, top: -2 * s, width: 10 * s, height: 2, background: "rgba(255,240,190,0.85)", borderRadius: 2 }} />}
    </div>
  );
};

// gold TROPHY cup (S1-local) — piles up as the fake praise grows
const S1_Trophy: React.FC<{ s?: number; tumble?: number }> = ({ s = 1, tumble = 0 }) => (
  <svg viewBox="0 0 64 96" width={64 * s} height={96 * s} style={{ overflow: "visible", filter: "drop-shadow(0 7px 9px rgba(40,26,12,0.5))", transform: `rotate(${tumble}deg)` }}>
    <defs><linearGradient id="s1trg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE59A" /><stop offset="0.5" stopColor={GOLD} /><stop offset="1" stopColor={BRASSD} /></linearGradient></defs>
    {/* handles */}
    <path d="M14 24 Q0 30 8 48 Q12 56 22 52" stroke={BRASS} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M50 24 Q64 30 56 48 Q52 56 42 52" stroke={BRASS} strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* cup bowl */}
    <path d="M15 21 H49 L45 46 Q32 60 19 46 Z" fill="url(#s1trg)" />
    <rect x={12} y={15} width={40} height={9} rx={3} fill={BRASS} />
    {/* star badge */}
    <path d="M32 27 l2.4 5 5.4 .6 -4 3.7 1.1 5.4 -4.9 -2.8 -4.9 2.8 1.1 -5.4 -4 -3.7 5.4 -.6 Z" fill="#FFF6DA" />
    {/* stem + base */}
    <rect x={29} y={58} width={6} height={12} fill={BRASSD} />
    <path d="M20 70 H44 L48 82 H16 Z" fill="url(#s1trg)" />
    <rect x={13} y={82} width={38} height={9} rx={3} fill={BRASSD} />
    {/* highlight */}
    <path d="M20 22 Q20 40 27 48" stroke="rgba(255,255,255,0.7)" strokeWidth={3} fill="none" strokeLinecap="round" />
  </svg>
);

// gold MEDAL on a ribbon (S1-local) — variety in the trophy pile
const S1_Medal: React.FC<{ s?: number; tumble?: number }> = ({ s = 1, tumble = 0 }) => (
  <svg viewBox="0 0 52 88" width={52 * s} height={88 * s} style={{ overflow: "visible", filter: "drop-shadow(0 6px 8px rgba(40,26,12,0.5))", transform: `rotate(${tumble}deg)` }}>
    <defs><radialGradient id="s1med" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stopColor="#FFE59A" /><stop offset="0.6" stopColor={GOLD} /><stop offset="1" stopColor={BRASSD} /></radialGradient></defs>
    {/* ribbons */}
    <path d="M17 2 L9 42 L23 34 Z" fill={HKRED} />
    <path d="M35 2 L43 42 L29 34 Z" fill="#3E77C4" />
    {/* disc */}
    <circle cx={26} cy={58} r={23} fill="url(#s1med)" stroke={BRASS} strokeWidth={3} />
    <circle cx={26} cy={58} r={16} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
    <path d="M26 47 l3 6.4 7 .8 -5 4.7 1.4 6.9 -6.4 -3.6 -6.4 3.6 1.4 -6.9 -5 -4.7 7 -.8 Z" fill="#FFF6DA" />
    <path d="M12 50 Q14 42 22 39" stroke="rgba(255,255,255,0.6)" strokeWidth={2.4} fill="none" strokeLinecap="round" />
  </svg>
);

// SIGNATURE MOMENT: the GIANT "10/10 CHEF'S KISS" medal the yes-man slaps onto the burnt dish
const S1_GiantMedal: React.FC<{ shine: number }> = ({ shine }) => (
  <svg viewBox="0 0 220 264" width={220} height={264} style={{ overflow: "visible", filter: "drop-shadow(0 16px 22px rgba(40,26,12,0.55))" }}>
    <defs>
      <radialGradient id="s1gmDisc" cx="0.38" cy="0.32" r="0.82">
        <stop offset="0" stopColor="#FFF3C8" /><stop offset="0.5" stopColor="#FFD873" />
        <stop offset="0.82" stopColor={GOLD} /><stop offset="1" stopColor={BRASSD} />
      </radialGradient>
      <linearGradient id="s1gmRib" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={HKR_GLOW} /><stop offset="1" stopColor={HKREDD} />
      </linearGradient>
      <clipPath id="s1gmClip"><circle cx={110} cy={150} r={82} /></clipPath>
    </defs>
    {/* twin ribbon streamers */}
    <path d="M70 6 L54 96 L96 74 Z" fill="url(#s1gmRib)" />
    <path d="M150 6 L166 96 L124 74 Z" fill="#2F62B4" />
    <path d="M70 6 L60 60 L78 52 Z" fill="rgba(255,255,255,0.25)" />
    {/* big brass-ringed disc */}
    <circle cx={110} cy={150} r={82} fill="url(#s1gmDisc)" stroke={BRASS} strokeWidth={7} />
    <circle cx={110} cy={150} r={68} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={3} />
    {/* laurels */}
    <path d="M52 150 Q50 116 74 100" stroke="rgba(184,126,30,0.85)" strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M168 150 Q170 116 146 100" stroke="rgba(184,126,30,0.85)" strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* star above the number */}
    <path d="M110 106 l6 12.4 13.6 1.6 -9.9 9.3 2.7 13.5 -12.4 -7 -12.4 7 2.7 -13.5 -9.9 -9.3 13.6 -1.6 Z" fill="#FFF6DA" opacity={0.92} />
    {/* 10/10 */}
    <text x={110} y={158} textAnchor="middle" dominantBaseline="central" fontFamily={S1_FONT} fontWeight={900} fontSize={52} fill="#5A3606" style={{ letterSpacing: 1 }}>10/10</text>
    {/* moving shine sweep clipped to the disc */}
    <g clipPath="url(#s1gmClip)">
      <path d={`M${20 + shine * 150} 70 l26 0 -70 160 -26 0 Z`} fill="rgba(255,255,255,0.4)" />
    </g>
    {/* CHEF'S KISS banner */}
    <g transform="translate(110,220)">
      <path d="M-90 -18 L90 -18 L76 6 L90 30 L-90 30 L-76 6 Z" fill="url(#s1gmRib)" stroke={GOLD} strokeWidth={4} />
      <text x={0} y={7} textAnchor="middle" dominantBaseline="central" fontFamily={S1_FONT} fontWeight={900} fontSize={24} fill="#FFF3D2" style={{ letterSpacing: 2 }}>CHEF'S KISS</text>
    </g>
  </svg>
);

// warm little candle with a live flickering flame (S1-local)
const S1_Candle: React.FC<{ lf: number; h?: number; w?: number; ph?: number; scale?: number }> = ({ lf, h = 34, w = 9, ph = 0, scale = 1 }) => {
  const flick = 1 + Math.sin(lf / 3.1 + ph) * 0.12 + Math.sin(lf / 1.7 + ph * 2) * 0.06;
  const sway = Math.sin(lf / 4.3 + ph) * 2;
  return (
    <div style={{ position: "relative", transform: `scale(${scale})`, transformOrigin: "50% 100%" }}>
      {/* warm glow halo */}
      <div style={{ position: "absolute", left: w / 2, top: -16, width: 46 * flick, height: 46 * flick, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,196,96,0.7), rgba(255,196,96,0) 68%)", filter: "blur(3px)" }} />
      {/* wax stick */}
      <div style={{ width: w, height: h, borderRadius: "3px 3px 1px 1px", background: `linear-gradient(180deg,#FBEFCF,#E7CE9A)`, boxShadow: "inset -2px 0 2px rgba(150,110,50,0.4)" }} />
      {/* flame */}
      <div style={{ position: "absolute", left: w / 2 + sway, top: -18, transform: "translate(-50%,0)" }}>
        <div style={{ width: 9, height: 20 * flick, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: `linear-gradient(180deg,#FFF3C8,#FFB33A 60%,#FF7A1A)`, boxShadow: "0 0 12px rgba(255,150,40,0.9)" }} />
        <div style={{ position: "absolute", left: "50%", top: 5, width: 4, height: 9 * flick, transform: "translateX(-50%)", borderRadius: "50%", background: "#FFF7DA" }} />
      </div>
    </div>
  );
};

// slender stemmed wine glass with a warm-lit pour (S1-local)
const S1_WineGlass: React.FC<{ lf: number; fill?: string; scale?: number; ph?: number }> = ({ lf, fill = "#7A1E2A", scale = 1, ph = 0 }) => {
  const glint = 0.5 + 0.4 * Math.sin(lf / 12 + ph);
  return (
    <svg viewBox="0 0 40 96" width={40 * scale} height={96 * scale} style={{ overflow: "visible", filter: "drop-shadow(0 6px 8px rgba(30,16,8,0.45))" }}>
      <path d="M8 6 Q8 40 20 46 Q32 40 32 6 Z" fill="rgba(240,232,214,0.28)" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} />
      <path d="M10 22 Q10 39 20 44 Q30 39 30 22 Z" fill={fill} opacity={0.92} />
      <path d="M12 12 Q11 30 15 40" stroke="rgba(255,255,255,0.7)" strokeWidth={2} fill="none" opacity={glint} strokeLinecap="round" />
      <line x1={20} y1={46} x2={20} y2={80} stroke="rgba(240,232,214,0.6)" strokeWidth={2.4} />
      <ellipse cx={20} cy={84} rx={13} ry={4} fill="rgba(240,232,214,0.5)" />
    </svg>
  );
};

// glowing brass CHANDELIER hanging from the ceiling (S1-local)
const S1_Chandelier: React.FC<{ lf: number }> = ({ lf }) => {
  const sway = Math.sin(lf / 40) * 1.4;
  const flick = 0.85 + 0.15 * Math.sin(lf / 5) + 0.06 * Math.sin(lf / 2.3);
  const arms = [-64, -32, 0, 32, 64];
  return (
    <div style={{ transform: `rotate(${sway}deg)`, transformOrigin: "50% 0%" }}>
      {/* chain */}
      <div style={{ width: 4, height: 40, margin: "0 auto", background: `linear-gradient(180deg,${BRASSD},${BRASS})` }} />
      {/* central glow */}
      <div style={{ position: "absolute", left: "50%", top: 40, width: 220, height: 150, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,196,96,0.5), rgba(255,196,96,0) 70%)", filter: "blur(6px)", opacity: flick }} />
      <svg viewBox="0 0 180 120" width={180} height={120} style={{ overflow: "visible", position: "relative" }}>
        {/* brass crown ring */}
        <ellipse cx={90} cy={20} rx={16} ry={6} fill="none" stroke={BRASS} strokeWidth={4} />
        <path d="M90 26 L90 44" stroke={BRASSD} strokeWidth={4} />
        {/* arms + candle bulbs */}
        {arms.map((ax, i) => {
          const bx = 90 + ax; const by = 60 + Math.abs(ax) * 0.18;
          return (
            <g key={"ch" + i}>
              <path d={`M90 42 Q${90 + ax * 0.5} ${44 + Math.abs(ax) * 0.12} ${bx} ${by}`} stroke={BRASS} strokeWidth={4} fill="none" strokeLinecap="round" />
              <path d={`M${bx} ${by} Q${bx - 2} ${by + 8} ${bx} ${by + 14}`} stroke={BRASSD} strokeWidth={3} fill="none" />
              <ellipse cx={bx} cy={by - 8} rx={6} ry={10} fill={`rgba(255,224,150,${flick})`} style={{ filter: "blur(0.4px)" }} />
              <circle cx={bx} cy={by - 12} r={3.2} fill="#FFF6DA" opacity={flick} />
              {/* crystal drop */}
              <path d={`M${bx} ${by + 14} l-3 6 l3 8 l3 -8 Z`} fill="rgba(255,240,200,0.55)" />
            </g>
          );
        })}
        {/* dangling crystal strands */}
        {[-40, 0, 40].map((cx, i) => (
          <line key={"cr" + i} x1={90 + cx} y1={44} x2={90 + cx} y2={64 + i * 3} stroke="rgba(255,236,190,0.4)" strokeWidth={1.4} />
        ))}
      </svg>
    </div>
  );
};

// warm brass wall SCONCE with flickering flame-lamp (S1-local)
const S1_Sconce: React.FC<{ lf: number; ph?: number }> = ({ lf, ph = 0 }) => {
  const flick = 0.82 + 0.18 * Math.sin(lf / 4 + ph) + 0.06 * Math.sin(lf / 1.9 + ph);
  return (
    <div style={{ position: "relative", width: 60, height: 90 }}>
      <div style={{ position: "absolute", left: 22, top: 90, width: 210, height: 210, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,178,72,0.34), rgba(255,178,72,0) 66%)", filter: "blur(4px)", opacity: flick, pointerEvents: "none" }} />
      <svg viewBox="0 0 60 90" width={60} height={90} style={{ overflow: "visible" }}>
        <rect x={26} y={40} width={8} height={40} rx={3} fill={BRASSD} />
        <path d="M30 40 Q18 34 20 22" stroke={BRASS} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M30 40 Q42 34 40 22" stroke={BRASS} strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={20} cy={16} rx={7} ry={11} fill={`rgba(255,214,120,${flick})`} style={{ filter: "blur(0.5px)" }} />
        <ellipse cx={40} cy={16} rx={7} ry={11} fill={`rgba(255,214,120,${flick})`} style={{ filter: "blur(0.5px)" }} />
        <circle cx={20} cy={12} r={3} fill="#FFF6DA" opacity={flick} />
        <circle cx={40} cy={12} r={3} fill="#FFF6DA" opacity={flick} />
      </svg>
    </div>
  );
};

// quiet char/steam rising off the "secretly broken" dish (S1-local SteamJet)
const S1_SteamJet: React.FC<{ lf: number; x: number; y: number; intensity: number; n?: number }> = ({ lf, x, y, intensity, n = 8 }) => (
  <>
    {Array.from({ length: n }).map((_, i) => {
      const life = 96; const t = (lf * 0.7 + seed(i * 2.9) * life) % life; const p = t / life;
      const dx = (seed(i * 3.7) - 0.5) * 120;
      const px = x + dx * 0.5 * p + Math.sin(lf / 8 + i) * 12 + Math.sin(lf / 5 + i * 1.7) * 5 * p;
      const py = y - p * 300;
      const op = intensity * (1 - p) * 0.42;
      const r = (16 + seed(i * 4.1) * 22) * (1 + p);
      if (op <= 0.01) return null;
      // curls from warm-grey (early) to sooty charcoal (as it chars harder)
      const soot = Math.min(1, intensity);
      return <div key={"sj" + i} style={{ position: "absolute", left: px, top: py, width: r, height: r, borderRadius: "50%", background: `rgba(${162 - soot * 82},${150 - soot * 82},${132 - soot * 78},0.85)`, filter: "blur(7px)", opacity: op, transform: "translate(-50%,-50%)" }} />;
    })}
  </>
);

// the obviously-BAD dish: a lopsided, collapsing, half-burnt tower on a white plate
const S1_Dish: React.FC<{ lf: number; collapse: number; char: number }> = ({ lf, collapse, char }) => {
  const lean = collapse * 10 + Math.sin(lf / 9) * (0.6 + collapse * 2.4);
  const slump = collapse * 12;
  const tremble = collapse * Math.sin(lf / 2.2) * 0.6; // dish trembles a touch more as it slumps
  return (
    <div style={{ position: "absolute", left: S1_DCX, top: S1_PLATE, transform: `translate(-50%,-100%) rotate(${lean * 0.16 + tremble}deg)`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 176" width={222} height={196} style={{ overflow: "visible", filter: "drop-shadow(0 10px 14px rgba(30,18,10,0.5))" }}>
        {/* leaning goopy tower base */}
        <ellipse cx={100} cy={150} rx={60} ry={15} fill="#8A6A4A" />
        <path d={`M54 152 Q58 ${112 + slump} 76 ${96 + slump} Q84 ${84 + slump} 100 ${86 + slump} Q118 ${84 + slump} 126 ${98 + slump} Q144 ${114 + slump} 146 152 Z`} fill="#C08A54" />
        <path d={`M62 150 Q66 118 82 ${104 + slump} Q92 ${94 + slump} 100 ${96 + slump} Q110 ${94 + slump} 120 ${106 + slump} Q136 120 138 150 Z`} fill="#9A6C3C" />
        {/* burnt crusty leaning top */}
        <g transform={`translate(${lean},0)`}>
          <ellipse cx={100} cy={90 + slump} rx={40} ry={26} fill="#2A1B12" />
          <ellipse cx={100} cy={84 + slump} rx={34} ry={20} fill="#40291B" />
          <ellipse cx={90} cy={80 + slump} rx={12} ry={8} fill="#573A26" />
          {/* charcoal chunks */}
          <rect x={78} y={70 + slump} width={12} height={12} rx={3} fill="#160D07" transform="rotate(18 84 76)" />
          <rect x={108} y={74 + slump} width={10} height={10} rx={3} fill="#1B110A" transform="rotate(-22 113 79)" />
          <rect x={94} y={64 + slump} width={9} height={9} rx={2} fill="#0F0805" transform="rotate(30 98 68)" />
          {/* GROWING char blooms — spread across the crust as it burns harder */}
          {S1_CHAR.map((cb, i) => {
            const g = ramp(char, cb.t0 - 0.16, cb.t0 + 0.22);
            if (g <= 0.02) return null;
            return <ellipse key={"cb" + i} cx={100 + cb.dx} cy={82 + slump + cb.dy * 0.5} rx={cb.r * (0.5 + 0.5 * g)} ry={cb.r * (0.4 + 0.4 * g)} fill="#100A05" opacity={0.55 * g + 0.12 * Math.sin(lf / 4 + cb.ph)} />;
          })}
          {/* sad wilted garnish flopping over */}
          <path d={`M118 70 Q142 ${58 + Math.sin(lf / 7) * 3} 150 84`} stroke="#5A7E44" strokeWidth={6} fill="none" strokeLinecap="round" />
          <ellipse cx={150} cy={86} rx={9} ry={5} fill="#4A6A38" transform={`rotate(${40 + Math.sin(lf / 6) * 6} 150 86)`} />
          {/* runny drip */}
          <path d="M82 108 Q80 128 84 138" stroke="#3A2416" strokeWidth={7} fill="none" strokeLinecap="round" />
        </g>
        {/* faint smoulder bleeding through (secretly broken) — glows hotter as it chars */}
        <ellipse cx={100} cy={128 + slump} rx={26 + Math.sin(lf / 4) * 3} ry={8} fill={EMBER} opacity={0.14 + 0.26 * char + 0.1 * Math.sin(lf / 3)} />
        {/* tiny live embers popping off the top as the char builds */}
        {char > 0.35 && Array.from({ length: 4 }).map((_, i) => {
          const life = 40; const t = (lf * 0.9 + seed(i * 7.3) * life) % life; const p = t / life;
          const ex = 100 + (seed(i * 2.1) - 0.5) * 44; const ey = 86 + slump - p * 46;
          const op = (char - 0.35) * 1.4 * (1 - p);
          if (op <= 0.02) return null;
          return <circle key={"em" + i} cx={ex} cy={ey} r={1.6 + seed(i * 3.7) * 1.4} fill={i % 2 ? FLAMEY : EMBER} opacity={Math.min(1, op)} />;
        })}
      </svg>
    </div>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------- CAMERA: calm — slow push-in only, tiny motivated shake at the boom ----------
  const shT = Math.max(0, lf - S1_EXPLODE);
  const shEnv = lf >= S1_EXPLODE ? Math.exp(-shT / 7) : 0;
  const shx = (seed(lf * 2.7) - 0.5) * 12 * shEnv;
  const shy = (seed(lf * 3.9 + 4) - 0.5) * 10 * shEnv;
  const pushIn = interpolate(lf, [0, 212], [1.0, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camScale = pushIn + 0.02 * shEnv;
  const alive = lf < S1_EXPLODE ? 1 : Math.max(0, 1 - shT / 8); // fades the pre-boom happy layer

  // ---------- cloche WHIPPED off with a flourish (anticipation dip, arc up-left, spin + overshoot) ----------
  const clocheT = over(lf, 6, 22);
  const antic = interpolate(lf, [0, 4, 6], [0, 8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const lift = spr(lf, 6, 12, 200);
  const clocheX = -interpolate(clocheT, [0, 1], [0, 230], { easing: Easing.out(Easing.cubic) });
  const clocheY = -interpolate(clocheT, [0, 1], [0, 344], { easing: Easing.out(Easing.cubic) }) + antic;
  const clocheRot = interpolate(clocheT, [0, 1], [0, -42], { easing: Easing.out(Easing.back(1.5)) });
  const clocheOp = interpolate(lf, [22, 32], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flourish = Math.sin(over(lf, 6, 22) * Math.PI);

  // ---------- dish state — smokes WORSE and worse underneath ----------
  const collapse = ramp(lf, 70, S1_EXPLODE);
  const gone = lf >= S1_EXPLODE ? 0 : 1;
  const smokeBuild = interpolate(lf, [55, 120, 186], [0.08, 0.5, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const downpour = over(lf, 20, 24);
  const S1_esc = 0.62 + 0.5 * ramp(lf, 40, 178); // praise ESCALATES toward the crescendo

  // ---------- yes-man MOTION: sprints across the frame, bows, claps, plants garnish ----------
  const S1_xAt = (f: number) => interpolate(f, S1_XKEYS, S1_XVALS, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const S1_ymX = S1_xAt(lf);
  const S1_run = Math.max(-1, Math.min(1, (S1_xAt(lf) - S1_xAt(lf - 1.6)) / 16)); // run lean from x-velocity
  const S1_bowWin = (a: number, b: number, c: number, d: number) => interpolate(lf, [a, b, c, d], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const S1_bow = Math.max(
    S1_bowWin(6, 16, 26, 33),     // grand reveal bow
    S1_bowWin(52, 58, 64, 70),    // MORE-ACTION: flourish curtsy-bow — fills the hero lull between claps
    S1_bowWin(104, 110, 113, 118), // bow to plant the flag
    S1_bowWin(160, 166, 170, 176)  // bow to plant the sparkler
  );
  // MORE-ACTION: a quick extra excited SPIN-hop woven into the flourish window (never a held pose)
  const S1_spinPop = S1_bowWin(54, 60, 62, 68) * 10 * Math.sin(over(lf, 54, 14) * Math.PI);
  // clap energy = strongest active clap window (drives hop + clap bursts)
  let S1_clapE = 0;
  for (const [a, b] of S1_CLAPWINS) S1_clapE = Math.max(S1_clapE, ramp(lf, a, a + 3) * (1 - ramp(lf, b - 4, b)));

  const S1_post = ramp(lf, S1_EXPLODE, S1_EXPLODE + 16); // 0..1 after boom (flung back)
  const yShock = lf >= S1_EXPLODE ? Math.min(1, (lf - S1_EXPLODE) / 7) : 0;

  // ================= SIGNATURE MOMENT vars — GIANT "10/10 CHEF'S KISS" medal SLAP + the waiter's SWOON =================
  const S1_MEDSLAM = 170;                                           // the giant medal THWACKS onto the burnt dish
  const S1_medT = ramp(lf, 152, S1_MEDSLAM);                        // 0..1 descent to the slam
  const S1_medFall = Math.pow(S1_medT, 1.9);                        // gravity accel on the way down
  const S1_medFling = lf >= S1_EXPLODE ? S1_post : 0;               // blown off with the dish at the boom
  const S1_medX = S1_DCX + (1 - S1_medT) * 40 - S1_medFling * 130;  // drifts over from the waiter side -> centre, flung on boom
  const S1_medY = 120 + S1_medFall * 350 - S1_medFling * 240;       // 120 -> ~470 onto the tower, then flung up
  const S1_medSwing = interpolate(S1_medT, [0, 0.72, 1], [-22, 7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S1_medBounce = Math.sin(Math.min(1, over(lf, S1_MEDSLAM, 11)) * Math.PI); // 0..1..0 land squash-pop
  const S1_medWob = lf > S1_MEDSLAM ? Math.sin((lf - S1_MEDSLAM) / 2.6) * Math.exp(-(lf - S1_MEDSLAM) / 9) * 6 : 0;
  const S1_medScale = interpolate(S1_medT, [0, 1], [0.72, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + 0.16 * S1_medBounce;
  const S1_medRot = S1_medSwing + S1_medWob + S1_medFling * 130;
  const S1_medShine = Math.sin(lf / 8) * 0.5 + 0.5;                 // moving shine sweep across the disc
  const S1_medShow = S1_medT > 0.001 && alive > 0.02;
  const S1_slam = over(lf, S1_MEDSLAM, 14, Easing.out(Easing.cubic)); // 0..1 impact-effect envelope
  // the waiter SWOONS/FAINTS backward — leans back + sinks (applied in BOTH branches so it flows into the boom)
  const S1_swoonE = interpolate(lf, [S1_MEDSLAM + 2, 186], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S1_swoonLean = S1_swoonE * 15;
  const S1_swoonDrop = S1_swoonE * 20;

  const yCheer = (1 - yShock) * (0.72 + 0.28 * Math.max(0, Math.sin(lf / 4.5)));
  const yHop = lf < S1_EXPLODE ? -Math.abs(Math.sin(lf / 4.3)) * (3.5 + S1_clapE * 7) : 0; // constant excited hop
  const yRot = (lf < S1_EXPLODE
    ? (S1_bow * 25 + S1_run * 13 + S1_spinPop + Math.sin(lf / 9) * 1.4)   // bow forward + lean into the run + flourish + jitter
    : (-9 - S1_post * 40))                                     // tumbles backward when blown up
    - S1_swoonLean;                                            // SIGNATURE: swoons backward (smooth across the boom)
  const yFall = lf < S1_EXPLODE ? 0 : S1_post * S1_post * 96; // knocked down
  const yBreath = 1 + (lf < S1_EXPLODE ? Math.sin(lf / 13) * 0.012 : 0);
  const S1_bodyLeft = S1_ymX - 115; // container left so its center == S1_ymX (mascot size 230)

  // ---------- APPLAUSE meter RACES up to 5.0 ----------
  const S1_meter = interpolate(lf, [22, 44, 72, 100, 128, 156, 180, 186], [0.05, 0.26, 0.48, 0.66, 0.8, 0.92, 0.99, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S1_rating = Math.min(5, S1_meter * 5);
  const S1_meterMax = S1_meter >= 0.985;
  const S1_fillH = Math.max(0, 292 * Math.min(1, S1_meter));

  // ---------- scorecard (the fake 5.0) ----------
  const scorePop = spr(lf, 30, 12, 210);
  const scoreShake = lf >= S1_EXPLODE ? (seed(lf * 4.1) - 0.5) * 10 * shEnv : 0;

  // ---------- explosion (in-frame, no full-screen flash) ----------
  const boom = over(lf, S1_EXPLODE, 16, Easing.out(Easing.cubic));
  const ballR = interpolate(boom, [0, 1], [10, 310]);
  const ballOp = lf >= S1_EXPLODE ? interpolate(over(lf, S1_EXPLODE + 8, 30), [0, 1], [1, 0]) : 0;
  const ring = over(lf, S1_EXPLODE, 24, Easing.out(Easing.cubic));
  const ringR = interpolate(ring, [0, 1], [20, 470]);
  const ringOp = interpolate(ring, [0, 1], [0.9, 0]);

  // ---------- passing waiters drifting across the back (life) ----------
  const S1_waiterX = interpolate(lf, [0, 212], [-110, 1130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // MORE-ACTION: a second food-runner crosses the OTHER way, applauding as he goes
  const S1_waiter2X = interpolate(lf, [0, 212], [1130, -120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${shx}px,${shy}px) scale(${camScale})`, transformOrigin: "506px 420px" }}>

        {/* ===================== WARM FINE-DINING ROOM — BACK WALL (warm wood, NOT grey) ===================== */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,#4A3220 0%,#3A2415 46%,#281810 78%,#1C1109 100%)` }} />
        {/* warm ambient candle-wash + a golden pool of light on the table */}
        <div style={{ position: "absolute", left: 506, top: 320, width: 1160, height: 700, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,190,96,0.30) 0%, rgba(120,70,30,0) 64%)", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", left: S1_DCX, top: 560, width: 700, height: 280, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,196,96,0.34), rgba(231,178,76,0) 68%)", filter: "blur(10px)" }} />

        {/* raised wood WAINSCOT / panelling with brass reveals (deep, warm) */}
        <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 300, background: `linear-gradient(180deg,${S1_WOOD},${S1_WOODD})` }} />
        <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 6, background: `linear-gradient(180deg,#7A5230,${S1_WOOD})` }} />
        <div style={{ position: "absolute", left: 0, top: 444, width: 1012, height: 8, background: `linear-gradient(180deg,${BRASSD},#3A2414)`, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
        {[126, 340, 672, 886].map((px, i) => (
          <div key={"wp" + i} style={{ position: "absolute", left: px, top: 176, width: 176, height: 246, transform: "translateX(-50%)", borderRadius: 5, background: `linear-gradient(160deg, rgba(150,100,54,0.5), rgba(40,24,12,0.35))`, border: `2px solid rgba(120,80,40,0.5)`, boxShadow: `inset 0 0 26px rgba(20,10,4,0.5), inset 0 2px 0 rgba(180,130,70,0.4)` }} />
        ))}

        {/* framed art on the wall (left + right) */}
        {[{ x: 126, w: 96, h: 128 }, { x: 886, w: 96, h: 128 }].map((fa, i) => (
          <div key={"fa" + i} style={{ position: "absolute", left: fa.x, top: 196, width: fa.w, height: fa.h, transform: "translateX(-50%)", borderRadius: 4, background: BRASSD, border: `4px solid ${BRASS}`, boxShadow: "0 8px 18px -6px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", inset: 6, borderRadius: 2, background: i === 0 ? "linear-gradient(160deg,#7A3242,#3A141F)" : "linear-gradient(160deg,#2E4A46,#14261F)" }} />
            <div style={{ position: "absolute", left: "50%", top: "60%", width: fa.w * 0.5, height: fa.h * 0.3, transform: "translate(-50%,-50%)", borderRadius: "50%", background: i === 0 ? "rgba(231,178,76,0.4)" : "rgba(180,150,90,0.35)", filter: "blur(4px)" }} />
          </div>
        ))}

        {/* WINE RACK with bottles (far right, warm) */}
        <div style={{ position: "absolute", left: 690, top: 176, width: 96, height: 214, borderRadius: 6, background: `linear-gradient(180deg,${S1_WOODD},${S1_WOODDK})`, border: `3px solid ${BRASSD}`, boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)", overflow: "hidden" }}>
          {[0, 1, 2, 3].map((r) => (
            <div key={"wr" + r} style={{ position: "absolute", left: 0, top: 10 + r * 50, width: 96, height: 44, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              {[0, 1, 2].map((c) => {
                const bc = ["#5A1E28", "#2E3A22", "#4A2A14"][(r + c) % 3];
                return <div key={"wb" + c} style={{ width: 22, height: 22, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, #FFE1A0, ${bc} 60%)`, border: `2px solid ${BRASSD}` }} />;
              })}
            </div>
          ))}
          <div style={{ position: "absolute", left: 0, top: 6, width: 96, height: 2, background: BRASSD }} />
          <div style={{ position: "absolute", left: 0, top: 106, width: 96, height: 2, background: BRASSD }} />
        </div>

        {/* plush BURGUNDY booth band (mid depth, tufted) */}
        <div style={{ position: "absolute", left: 0, top: 396, width: 1012, height: 92, background: `linear-gradient(180deg,${S1_BURG},${S1_BURGD})`, boxShadow: "inset 0 8px 22px rgba(0,0,0,0.45)" }} />
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={"tuft" + i} style={{ position: "absolute", left: 40 + i * 78, top: 424, width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, rgba(255,180,150,0.5), rgba(60,16,26,0.8))", boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 396, width: 1012, height: 5, background: `linear-gradient(180deg,#9A4456,${S1_BURG})` }} />

        {/* dramatic overhead spotlights — WARM candle-white */}
        <SpotCone x={S1_DCX} top={12} topW={72} botW={520} h={640} color="rgba(255,206,130,0.5)" sway={2} lf={lf} pool />
        <SpotCone x={190} top={6} topW={44} botW={300} h={560} color="rgba(255,190,110,0.34)" sway={3} lf={lf} />
        <SpotCone x={840} top={6} topW={44} botW={300} h={560} color="rgba(255,190,110,0.34)" sway={3} lf={lf} />
        {/* soft warm god-rays sifting down */}
        {[300, 560, 720].map((gx, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: gx, top: 90, width: 60, height: 420, transform: `translateX(-50%) skewX(${-4 + i * 3}deg)`, background: "linear-gradient(180deg, rgba(255,206,130,0.18), rgba(255,206,130,0) 78%)", filter: "blur(9px)", opacity: 0.5 + 0.12 * Math.sin(lf / 9 + i), pointerEvents: "none" }} />
        ))}

        {/* GLOWING CHANDELIER hanging center-left */}
        <div style={{ position: "absolute", left: 360, top: 0, transform: "translateX(-50%)" }}>
          <S1_Chandelier lf={lf} />
        </div>

        {/* brass wall SCONCES (warm flicker) */}
        <div style={{ position: "absolute", left: 60, top: 210 }}><S1_Sconce lf={lf} ph={0} /></div>
        <div style={{ position: "absolute", left: 900, top: 210 }}><S1_Sconce lf={lf} ph={1.7} /></div>

        {/* soft warm haze band (atmosphere/depth) */}
        <div style={{ position: "absolute", left: 0, top: 210, width: 1012, height: 320, background: "linear-gradient(180deg, rgba(255,190,110,0.16) 0%, rgba(255,190,110,0) 100%)", filter: "blur(16px)", pointerEvents: "none" }} />

        {/* ===================== BACKGROUND DINING TABLES (linen + candle glow) — depth ===================== */}
        {S1_TABLES.map((t, i) => (
          <div key={"tb" + i} style={{ position: "absolute", left: t.x, top: t.top, transform: "translateX(-50%)", opacity: 0.62 }}>
            {/* draped white-linen round table */}
            <div style={{ width: t.w, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 30%, ${S1_LINEN}, ${S1_LINEND} 70%)`, boxShadow: "0 8px 14px -6px rgba(0,0,0,0.5)" }} />
            <div style={{ width: t.w * 0.82, height: 34, margin: "0 auto", background: `linear-gradient(180deg,${S1_LINEN},${S1_LINEND})`, borderRadius: "0 0 40% 40%", clipPath: "polygon(0 0,100% 0,88% 100%,12% 100%)" }} />
            {/* tiny candle on the table */}
            <div style={{ position: "absolute", left: t.w / 2 - 4, top: -18 }}><S1_Candle lf={lf} h={20} w={6} ph={t.glow} scale={0.7} /></div>
            {/* a little wine glass */}
            <div style={{ position: "absolute", left: t.w / 2 + 14, top: -24 }}><S1_WineGlass lf={lf} fill="#7A1E2A" scale={0.42} ph={t.glow} /></div>
          </div>
        ))}

        {/* dim background DINERS — bob gently, then get EXCITED and CLAP through the crescendo */}
        {S1_DINERS.map((c, i) => {
          // MORE-ACTION: they start reacting EARLY (from ~34) and clap continuously, peaking at the crescendo
          const excite = Math.max(ramp(lf, 34, 72) * 0.6, ramp(lf, 118, 148)) * (1 - S1_post);
          const hop = excite * Math.abs(Math.sin(lf / 4 + i * 1.3)) * 6;
          return (
            <div key={"dn" + i} style={{ position: "absolute", left: c.x, top: c.top, transform: `translate(-50%,0) translateY(${bob(lf, c.amp, c.per, c.ph) - hop}px)`, opacity: 0.5, filter: "blur(0.7px) saturate(0.85)" }}>
              <Mascot lf={lf} size={c.size} tint={c.tint} gaze={c.gaze} nodAmp={2 + excite * 3} />
              {/* MORE-ACTION: clapping hands above each excited diner */}
              {excite > 0.28 && (
                <div style={{ position: "absolute", left: c.size / 2, top: -12, transform: "translate(-50%,0)", opacity: excite }}>
                  <S1_ClapHands lf={lf} ph={i * 1.7} s={0.7} tint={c.tint} />
                </div>
              )}
            </div>
          );
        })}

        {/* passing waiter drifting behind the tables (life) */}
        <div style={{ position: "absolute", left: S1_waiterX, top: 250, transform: "translate(-50%,0)", opacity: 0.34, filter: "blur(0.8px) saturate(0.8)" }}>
          <div style={{ position: "absolute", left: 30, top: -14, width: 54, height: 12, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 30%, #F6EFDA, #C8A46E)", transform: "translateX(-50%)" }} />
          <Mascot lf={lf} size={54} tint="#9C6B42" gaze={2} nodAmp={2} />
        </div>

        {/* MORE-ACTION: a second food-runner crossing the OTHER way, applauding as he goes */}
        <div style={{ position: "absolute", left: S1_waiter2X, top: 286, transform: "translate(-50%,0)", opacity: 0.3, filter: "blur(0.9px) saturate(0.8)" }}>
          <Mascot lf={lf} size={50} tint="#8A5C3A" gaze={-2} nodAmp={3} />
          <div style={{ position: "absolute", left: 25, top: -8, transform: "translate(-50%,0)" }}><S1_ClapHands lf={lf} ph={3.0} s={0.68} tint="#8A5C3A" /></div>
        </div>

        {/* warm golden BOKEH orbs floating in the room */}
        {S1_BOKEH.map((b, i) => {
          const fl = 0.7 + 0.3 * Math.sin(lf / 10 + b.ph);
          const y = b.y + Math.sin(lf / (30 + i) + b.ph) * 10;
          return <div key={"bk" + i} style={{ position: "absolute", left: b.x, top: y, width: b.r, height: b.r, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `radial-gradient(circle, ${b.c}, ${b.c}00 70%)`, opacity: b.op * fl, filter: "blur(2px)", pointerEvents: "none" }} />;
        })}

        {/* ===================== SCORECARD (the fake 5.0) — top center ===================== */}
        {scorePop > 0.02 && (
          <div style={{ position: "absolute", left: S1_DCX + scoreShake, top: 128, transform: `translate(-50%,-50%) scale(${Math.min(1.06, scorePop)})` }}>
            <div style={{ position: "relative", padding: "12px 30px 14px", borderRadius: 20, background: "linear-gradient(180deg,#4A2E16,#2A1808)", border: `4px solid ${GOLD}`, boxShadow: `0 16px 30px -12px rgba(20,10,4,0.6), 0 0 28px rgba(231,178,76,0.5)` }}>
              <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                {[0, 1, 2, 3, 4].map((k) => {
                  const on = ramp(lf, 34 + k * 4, 40 + k * 4);
                  return <div key={k} style={{ transform: `scale(${0.5 + 0.5 * spr(lf, 34 + k * 4, 12, 240)})` }}><S1_Star s={30} c={GOLD} op={0.35 + 0.65 * on} /></div>;
                })}
              </div>
              <div style={{ textAlign: "center", marginTop: 4, fontFamily: S1_FONT, fontWeight: 900, fontSize: 40, lineHeight: 1, color: "#FFF3D2", letterSpacing: 1, textShadow: "0 0 14px rgba(231,178,76,0.7)" }}>5.0</div>
              {/* crack across the lie after the boom */}
              {lf >= S1_EXPLODE && (
                <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 240 110" preserveAspectRatio="none">
                  <path d="M0 40 L60 30 L96 62 L150 26 L196 58 L240 44" stroke="rgba(255,90,60,0.85)" strokeWidth={3.5} fill="none" opacity={ramp(lf, S1_EXPLODE, S1_EXPLODE + 5)} />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* ===================== "PERFECT!" BANNER unfurling above the dish ===================== */}
        {(() => {
          const w = interpolate(lf, [126, 148], [0, 486], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const drop = interpolate(lf, [126, 146], [-38, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
          const txt = ramp(lf, 146, 158);
          if (w <= 2 || lf >= S1_EXPLODE) return null;
          const cx = 548; const topY = 250 + drop; const droop = Math.sin(lf / 11) * 1.6;
          return (
            <div style={{ position: "absolute", left: cx, top: topY, opacity: alive, transform: `rotate(${droop * 0.18}deg)`, transformOrigin: "50% -60px" }}>
              {/* cloth ribbon (swallowtail ends) */}
              <div style={{ position: "absolute", left: -w / 2, top: 0, width: w, height: 64, background: `linear-gradient(180deg,${HKR_GLOW},${HKRED} 45%,${HKREDD})`, border: `4px solid ${GOLD}`, boxShadow: "0 12px 26px -10px rgba(20,6,4,0.7), 0 0 22px rgba(231,178,76,0.35)", clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 50%, 100% 100%, 0 100%, 20px 50%)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 3, background: "rgba(255,220,190,0.5)" }} />
                <div style={{ position: "absolute", left: -w / 2, top: 0, width: w, textAlign: "center", lineHeight: "64px", fontFamily: S1_FONT, fontWeight: 900, fontSize: 34, letterSpacing: 3, color: "#FFF3D2", textShadow: "0 2px 4px rgba(80,10,4,0.8)", opacity: txt, transform: `translateX(${w / 2}px)` }}>PERFECT!</div>
              </div>
              {/* scroll rollers at each end */}
              {[-w / 2 - 6, w / 2 - 4].map((rx, i) => (
                <div key={"rl" + i} style={{ position: "absolute", left: rx, top: -6, width: 12, height: 76, borderRadius: 6, background: `linear-gradient(90deg,${BRASSD},${BRASS},${BRASSD})`, boxShadow: "0 4px 8px -3px rgba(0,0,0,0.6)" }} />
              ))}
            </div>
          );
        })()}

        {/* MORE-ACTION: gold CONFETTI rains through the crescendo (fades in, gone by the boom) */}
        {lf >= 124 && lf < S1_EXPLODE && (
          <div style={{ position: "absolute", inset: 0, opacity: alive * ramp(lf, 124, 138), pointerEvents: "none" }}>
            <Confetti lf={lf - 124} n={26} colors={[GOLD, "#FFF0B8", HKRED, PINK, "#FFFFFF"]} />
          </div>
        )}

        {/* ===================== APPLAUSE METER — races up to 5.0 (right side) ===================== */}
        <div style={{ position: "absolute", left: 958, top: 244, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", opacity: alive, pointerEvents: "none" }}>
          {/* live rating chip */}
          <div style={{ padding: "5px 15px", borderRadius: 12, background: "linear-gradient(180deg,#4A2E16,#2A1808)", border: `3px solid ${GOLD}`, boxShadow: S1_meterMax ? "0 0 24px rgba(231,178,76,0.9)" : "0 6px 14px -6px rgba(0,0,0,0.5)", transform: `scale(${S1_meterMax ? 1 + Math.sin(lf / 3) * 0.06 : 1})` }}>
            <div style={{ fontFamily: S1_FONT, fontWeight: 900, fontSize: 30, lineHeight: 1, color: "#FFF3D2", textShadow: "0 0 12px rgba(231,178,76,0.8)" }}>{S1_rating.toFixed(1)}</div>
          </div>
          {/* label */}
          <div style={{ marginTop: 5, marginBottom: 6, fontFamily: S1_FONT, fontWeight: 800, fontSize: 13, letterSpacing: 3, color: "#FFE7B0" }}>APPLAUSE</div>
          {/* thermometer tube */}
          <div style={{ position: "relative", width: 44, height: 300, borderRadius: 22, background: "linear-gradient(180deg,#241606,#140A03)", border: `4px solid ${BRASS}`, boxShadow: "inset 0 0 16px rgba(0,0,0,0.7)", overflow: "hidden" }}>
            {/* fill racing up */}
            <div style={{ position: "absolute", left: 4, right: 4, bottom: 4, height: S1_fillH, borderRadius: 18, background: `linear-gradient(180deg,#FFE59A,${GOLD} 40%,${EMBER})`, boxShadow: "0 0 18px rgba(255,150,40,0.7)" }} />
            {/* bright rising crest on the fill */}
            <div style={{ position: "absolute", left: 4, right: 4, bottom: Math.max(0, S1_fillH - 6), height: 8, borderRadius: 6, background: "rgba(255,247,220,0.9)", opacity: S1_meter > 0.06 ? 0.85 : 0 }} />
            {/* tick marks 1-5 */}
            {[1, 2, 3, 4, 5].map((t) => (<div key={"tk" + t} style={{ position: "absolute", left: 0, right: 0, bottom: (t / 5) * 292, height: 2, background: "rgba(255,240,200,0.35)" }} />))}
          </div>
          {/* bulb at base */}
          <div style={{ marginTop: -14, width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, #FFE59A, ${EMBER})`, border: `4px solid ${BRASS}`, boxShadow: "0 0 20px rgba(255,150,40,0.7)" }} />
        </div>

        {/* ===================== FOREGROUND WHITE-LINEN TABLE (warm, draped) ===================== */}
        <div style={{ position: "absolute", left: 0, top: S1_BENCH, width: 1012, height: 792 - S1_BENCH, background: `linear-gradient(180deg,${S1_LINEN} 0%,#EBDBBB 30%,#D8C199 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: S1_BENCH, width: 1012, height: 8, background: `linear-gradient(180deg,#FBF3DE,${S1_LINEN})` }} />
        {/* gentle linen fold shadows */}
        {[120, 300, 470, 760, 930].map((fx, i) => (
          <div key={"fold" + i} style={{ position: "absolute", left: fx, top: S1_BENCH + 8, width: 3, height: 792 - S1_BENCH - 8, background: "rgba(150,110,60,0.16)" }} />
        ))}
        {/* warm candle reflection band under the dish */}
        <div style={{ position: "absolute", left: S1_DCX, top: S1_BENCH + 16, width: 640, height: 120, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,180,80,0.24), rgba(231,178,76,0) 70%)", filter: "blur(8px)" }} />
        {/* heat-haze shimmer off the plate (subtle, wobbling) */}
        <div style={{ position: "absolute", left: S1_DCX, top: S1_BENCH - 34, width: 380, height: 60, transform: `translateX(-50%) translateY(${Math.sin(lf / 6) * 2}px)`, background: "linear-gradient(180deg, rgba(255,220,150,0.16), rgba(255,220,150,0))", filter: "blur(6px)", opacity: 0.4 + 0.2 * smokeBuild, pointerEvents: "none" }} />

        {/* foreground table setting: a folded napkin + candle (left) and a wine glass (right) flanking the plate */}
        <div style={{ position: "absolute", left: S1_DCX - 214, top: S1_PLATE - 6, transform: "translate(-50%,-100%)" }}>
          {/* folded napkin */}
          <div style={{ position: "absolute", left: -8, top: 24, width: 66, height: 30, borderRadius: 4, background: `linear-gradient(160deg,#FBF3DE,${S1_LINEND})`, boxShadow: "0 6px 10px -5px rgba(60,40,20,0.4)", transform: "rotate(-6deg)" }} />
          <div style={{ position: "absolute", left: -8, top: 24, width: 66, height: 15, borderRadius: "4px 4px 0 0", background: "linear-gradient(160deg,#FFF8E6,#EAD9B6)", transform: "rotate(-6deg)" }} />
          <div style={{ position: "absolute", left: 26, top: -14 }}><S1_Candle lf={lf} h={40} w={11} ph={0.6} scale={1} /></div>
        </div>
        <div style={{ position: "absolute", left: S1_DCX + 196, top: S1_PLATE + 2, transform: "translate(-50%,-100%)" }}>
          <S1_WineGlass lf={lf} fill="#7A1E2A" scale={1} ph={2.1} />
        </div>

        {/* ===================== THE PILE of gold TROPHIES + medals (grows beside the plate) ===================== */}
        {S1_TROPHIES.map((t, i) => {
          const pop = spr(lf, t.at, 12, 230);
          if (pop <= 0.02) return null;
          const tumble = lf >= S1_EXPLODE ? (i % 2 ? 1 : -1) * S1_post * 42 : 0;
          const fall = lf >= S1_EXPLODE ? S1_post * 70 : 0;
          return (
            <div key={"tr" + i} style={{ position: "absolute", left: t.x, top: t.y + fall, transform: `translate(-50%,-100%) scale(${Math.min(1.08, pop)})`, opacity: alive }}>
              {t.medal ? <S1_Medal s={t.s} tumble={tumble} /> : <S1_Trophy s={t.s} tumble={tumble} />}
            </div>
          );
        })}
        {/* sparkle pop as each trophy lands */}
        {alive > 0.05 && S1_TROPHIES.map((t, i) => (
          <Sparkles key={"trsp" + i} lf={lf} at={t.at / 30} x={t.x} y={t.y - 44} n={8} spread={80} colors={[GOLD, "#FFF0B8", "#FFFFFF"]} dur={0.6} />
        ))}

        {/* MORE-ACTION: ROSES tossed onto the dish (arc in from the applauding room, land + rest) */}
        {S1_ROSES.map((r, i) => {
          const p = over(lf, r.at, 16, Easing.out(Easing.cubic));
          if (p <= 0.01 || lf >= S1_EXPLODE) return null;
          const landX = r.x; const landY = S1_PLATE - 28 + collapse * 8;
          const x = r.fromX + (landX - r.fromX) * p;
          const arc = Math.sin(p * Math.PI) * 130;
          const y = r.fromY + (landY - r.fromY) * p - arc;
          const spin = interpolate(p, [0, 1], [r.rot * 8, r.rot], { easing: Easing.out(Easing.cubic) });
          const jitter = p >= 0.99 ? Math.sin(lf / 7 + i) * 2 : 0; // gentle settle wobble once landed
          return (
            <div key={"rose" + i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${spin + jitter}deg)`, opacity: alive }}>
              <S1_Rose s={r.s} />
            </div>
          );
        })}

        {/* ===================== THE BAD DISH (hero focal) ===================== */}
        {gone > 0 && <S1_Dish lf={lf} collapse={collapse} char={smokeBuild} />}
        {/* white plate under it */}
        <div style={{ position: "absolute", left: S1_DCX, top: S1_PLATE, transform: "translate(-50%,-50%)" }}>
          <div style={{ width: 190, height: 44, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 30%, #FFFDF6, #EFE2C8 66%, #C9B48C)", boxShadow: "0 14px 20px -6px rgba(40,26,12,0.45), inset 0 3px 6px rgba(255,255,255,0.8)" }} />
          <div style={{ position: "absolute", left: "50%", top: 9, width: 118, height: 20, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(170,142,96,0.5)" }} />
        </div>

        {/* pre-boom char/steam rising off the dish (it's secretly broken) — grows WORSE and worse */}
        {gone > 0 && <S1_SteamJet lf={lf} x={S1_DCX} y={S1_PLATE - 46} intensity={smokeBuild * alive} n={smokeBuild > 0.7 ? 12 : smokeBuild > 0.4 ? 10 : 8} />}

        {/* ===================== ABSURD GARNISH the yes-man keeps adding to YOUR dish ===================== */}
        {/* tiny flag stabbed in on the first sprint (~108) */}
        {lf >= 106 && lf < S1_EXPLODE && (() => {
          const pop = spr(lf, 106, 12, 240); const wave = Math.sin(lf / 5) * 7;
          return (
            <div style={{ position: "absolute", left: S1_DCX - 22, top: S1_PLATE - 150 + collapse * 9, transform: `translate(-50%,-100%) scale(${Math.min(1.1, pop)})`, opacity: alive }}>
              <svg viewBox="0 0 44 74" width={44} height={74} style={{ overflow: "visible", filter: "drop-shadow(0 3px 4px rgba(30,18,10,0.5))" }}>
                <rect x={19} y={16} width={3} height={56} rx={1.5} fill="#C9A24A" />
                <path d={`M20 16 Q${36 + wave} 21 30 31 Q${36 + wave} 41 20 37 Z`} fill={HKRED} />
                <path d="M24 24 l1.4 3 3.2 .3 -2.4 2.2 .7 3.2 -2.9 -1.7 -2.9 1.7 .7 -3.2 -2.4 -2.2 3.2 -.3 Z" fill="#FFF3C8" />
              </svg>
            </div>
          );
        })()}
        {/* sparkler stabbed in on the second sprint (~166), showering sparks */}
        {lf >= 164 && lf < S1_EXPLODE && (() => {
          const pop = spr(lf, 164, 12, 240);
          return (
            <div style={{ position: "absolute", left: S1_DCX + 26, top: S1_PLATE - 158 + collapse * 9, transform: `translate(-50%,-100%) scale(${Math.min(1.12, pop)})`, opacity: alive }}>
              <svg viewBox="0 0 30 80" width={30} height={80} style={{ overflow: "visible" }}>
                <rect x={14} y={22} width={2.6} height={56} rx={1.3} fill="#3A2A18" />
                <circle cx={15} cy={20} r={5} fill="#FFF7DA" style={{ filter: "blur(0.4px)" }} />
                <circle cx={15} cy={20} r={9} fill="rgba(255,220,120,0.5)" style={{ filter: "blur(2px)" }} />
              </svg>
              {/* showering sparks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const life = 22; const t = (lf * 1.5 + seed(i * 5.7) * life) % life; const p = t / life;
                const ang = seed(i * 2.3) * Math.PI * 2; const d = p * (14 + seed(i * 3.1) * 18);
                const sx = 15 + Math.cos(ang) * d; const sy = 20 + Math.sin(ang) * d + p * p * 20;
                const op = (1 - p) * 0.95;
                if (op <= 0.03) return null;
                return <div key={"spk" + i} style={{ position: "absolute", left: sx, top: sy, width: 2.4, height: 2.4, borderRadius: "50%", background: i % 2 ? "#FFF3C8" : GOLD, boxShadow: `0 0 5px ${GOLD}`, opacity: op }} />;
              })}
            </div>
          );
        })()}

        {/* ===================== FLOURISH SWOOSH (follows the whipped cloche) ===================== */}
        {flourish > 0.02 && (
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", opacity: flourish }} viewBox="0 0 1012 792">
            <path d={`M${S1_DCX} ${S1_PLATE - 120} Q ${S1_DCX - 150} ${S1_PLATE - 320} ${S1_DCX - 236} ${S1_PLATE - 344}`} stroke="rgba(255,240,205,0.8)" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="4 11" />
            <path d={`M${S1_DCX + 14} ${S1_PLATE - 118} Q ${S1_DCX - 136} ${S1_PLATE - 300} ${S1_DCX - 220} ${S1_PLATE - 330}`} stroke="rgba(255,224,150,0.45)" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="3 14" />
          </svg>
        )}

        {/* ===================== SILVER CLOCHE DOME (whipped off with a flourish + overshoot) ===================== */}
        {clocheOp > 0.01 && (
          <div style={{ position: "absolute", left: S1_DCX + clocheX, top: S1_PLATE - 6 + clocheY, transform: `translate(-50%,-100%) rotate(${clocheRot}deg) scaleY(${0.9 + 0.12 * lift})`, opacity: clocheOp }}>
            <svg viewBox="0 0 220 150" width={244} height={166} style={{ overflow: "visible", filter: "drop-shadow(0 12px 18px rgba(40,26,12,0.45))" }}>
              <path d="M18 140 Q18 26 110 22 Q202 26 202 140 Z" fill="url(#s1cl)" />
              <path d="M42 120 Q40 44 96 34" stroke="rgba(255,246,224,0.85)" strokeWidth={9} fill="none" strokeLinecap="round" />
              <rect x={10} y={136} width={200} height={12} rx={6} fill="#C7B48C" />
              <circle cx={110} cy={16} r={11} fill="#E7D6AE" stroke={BRASSD} strokeWidth={3} />
              <defs><linearGradient id="s1cl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBF3DE" /><stop offset="0.5" stopColor="#D9C7A2" /><stop offset="1" stopColor="#A88C5E" /></linearGradient></defs>
            </svg>
          </div>
        )}

        {/* ===================== BLUE YES-MAN WAITER — FRANTIC: sprints, bows, claps, plants garnish ===================== */}
        <div style={{ position: "absolute", left: S1_bodyLeft, top: 356, transform: `rotate(${yRot}deg)`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 122, top: 150, width: 250, height: 250, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(90,160,222,0.26), rgba(90,160,222,0) 70%)", filter: "blur(6px)" }} />
          <div style={{ transform: `translateY(${yHop + yFall + S1_swoonDrop}px) scale(${yBreath})` }}>
            <Mascot lf={lf} size={230} tint={S1_BLUE} cheer={yCheer} shock={yShock} gaze={3} nodAmp={lf < S1_EXPLODE ? 4 + S1_clapE * 4 : 1} />
          </div>
        </div>

        {/* ===================== CLAP BURSTS (frantic hands + impact stars near the yes-man) ===================== */}
        {(() => {
          if (S1_clapE <= 0.03 || lf >= S1_EXPLODE) return null;
          const beat = Math.abs(Math.sin(lf / 2.1)); const gap = 5 + beat * 15;
          const impact = beat < 0.24 ? (0.24 - beat) / 0.24 : 0;
          const cx = S1_ymX + Math.sin(lf / 9) * 3; const cy = 500 + yHop;
          return (
            <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)", opacity: S1_clapE * alive }}>
              <div style={{ position: "absolute", left: -gap - 15, top: -11, width: 23, height: 23, borderRadius: "48% 52% 52% 48%", background: `linear-gradient(160deg,#8CC4F2,${S1_BLUE})`, boxShadow: "0 2px 4px rgba(20,40,70,0.4)" }} />
              <div style={{ position: "absolute", left: gap - 8, top: -11, width: 23, height: 23, borderRadius: "52% 48% 48% 52%", background: `linear-gradient(200deg,#8CC4F2,${S1_BLUE})`, boxShadow: "0 2px 4px rgba(20,40,70,0.4)" }} />
              {impact > 0.05 && (<>
                <div style={{ position: "absolute", left: -3, top: -3, transform: `scale(${0.5 + impact})` }}><S1_Star s={17} c="#FFF3C8" /></div>
                {[0, 60, 120, 180, 240, 300].map((ang, i) => (
                  <div key={"cl" + i} style={{ position: "absolute", left: 0, top: 0, width: 14 + impact * 8, height: 2.5, background: "rgba(255,240,190,0.9)", transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, opacity: impact }} />
                ))}
              </>)}
            </div>
          );
        })()}

        {/* ===================== GENTLE DOWNPOUR — gold stars raining & SETTLING onto the dish (escalates) ===================== */}
        {S1_STARS.map((st, i) => {
          const life = 74; const t = (lf * st.sp + st.ph * life) % life; const p = t / life;
          const y = 132 + p * (S1_PLATE - 150); const x = st.x0 + st.sw * p + Math.sin(lf / 8 + i) * 10;
          const settle = p > 0.8 ? 1 + Math.sin((p - 0.8) / 0.2 * Math.PI) * 0.26 : 1;
          const op = alive * downpour * S1_esc * Math.min(1, p * 6) * Math.max(0, 1 - (p - 0.8) / 0.2);
          if (op <= 0.02) return null;
          return <div key={"star" + i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${st.rot + lf * 3}deg) scale(${settle})`, opacity: op }}><S1_Star s={st.s} c={st.c} /></div>;
        })}
        {/* a few hearts drifting in with a soft settle */}
        {S1_HEARTS.map((h, i) => {
          const life = 82; const t = (lf * h.sp + h.ph * life) % life; const p = t / life;
          const y = 150 + p * (S1_PLATE - 190); const x = h.x0 + Math.sin(lf / 9 + i) * 20;
          const settle = p > 0.72 ? 1 + Math.sin((p - 0.72) / 0.28 * Math.PI) * 0.2 : 1;
          const op = alive * downpour * S1_esc * Math.min(1, p * 5) * Math.max(0, 1 - (p - 0.72) / 0.28);
          if (op <= 0.02) return null;
          return <div key={"hb" + i} style={{ position: "absolute", left: x, top: y, opacity: op, transform: `rotate(${Math.sin(lf / 7 + i) * 12}deg) scale(${settle})` }}><S1_Heart s={h.s} c={h.c} /></div>;
        })}
        {/* sparkle bursts over the dish while gushing */}
        {alive > 0.05 && <>
          <Sparkles lf={lf} at={22 / 30} x={S1_DCX} y={S1_PLATE - 70} n={10} spread={110} colors={[GOLD, "#FFFFFF", "#FFF0B8"]} dur={0.7} />
          <Sparkles lf={lf} at={70 / 30} x={S1_DCX - 30} y={S1_PLATE - 90} n={9} spread={120} colors={[GOLD, "#FFFFFF", PINK]} dur={0.7} />
          <Sparkles lf={lf} at={130 / 30} x={S1_DCX + 34} y={S1_PLATE - 80} n={9} spread={110} colors={[GOLD, "#FFFFFF", "#FFF0B8"]} dur={0.7} />
          <Sparkles lf={lf} at={178 / 30} x={S1_DCX} y={S1_PLATE - 100} n={11} spread={130} colors={[GOLD, "#FFFFFF", "#FFF0B8"]} dur={0.7} />
        </>}

        {/* ===================== "5★" BADGE — springs in beside the dish ===================== */}
        {spr(lf, 52, 12, 220) > 0.02 && (
          <div style={{ position: "absolute", left: S1_DCX + 132, top: S1_PLATE - 150, transform: `translate(-50%,-50%) scale(${Math.min(1.1, spr(lf, 52, 12, 220))}) rotate(-8deg)`, opacity: alive }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 999, background: "linear-gradient(158deg,#F4C662,#D89A2C)", border: "4px solid #FFF6E2", boxShadow: "0 12px 24px -8px rgba(120,80,10,0.5), 0 0 22px rgba(231,178,76,0.6)" }}>
              <span style={{ fontFamily: S1_FONT, fontWeight: 900, fontSize: 34, color: "#3A2606", lineHeight: 1 }}>5</span>
              <S1_Star s={30} c="#FFF6DA" />
            </div>
          </div>
        )}

        {/* ============================================================================================= */}
        {/* ===================== ★ SIGNATURE MOMENT ★ — the GIANT "10/10 CHEF'S KISS" MEDAL ============ */}
        {/* the fawning waiter slaps an absurd oversized award onto the obviously-burnt dish, then swoons */}
        {S1_medShow && (
          <>
            {/* speed lines trailing the medal as it plunges */}
            {S1_medT > 0.15 && S1_medT < 1 && Array.from({ length: 5 }).map((_, i) => (
              <div key={"mln" + i} style={{ position: "absolute", left: S1_medX - 58 + i * 29, top: S1_medY - 168 - i * 6, width: 3, height: 66 + i * 8, background: "linear-gradient(180deg, rgba(255,240,190,0), rgba(255,240,190,0.75))", borderRadius: 2, opacity: (1 - S1_medT) * 0.85, filter: "blur(0.5px)" }} />
            ))}
            {/* the giant medal itself */}
            <div style={{ position: "absolute", left: S1_medX, top: S1_medY, transform: `translate(-50%,-50%) rotate(${S1_medRot}deg) scale(${S1_medScale})`, opacity: alive }}>
              <S1_GiantMedal shine={S1_medShine} />
            </div>
            {/* IMPACT: expanding gold ring + radial spikes at the slam */}
            {S1_slam > 0.01 && lf < S1_EXPLODE && (
              <div style={{ position: "absolute", left: S1_DCX, top: 512, transform: "translate(-50%,-50%)", pointerEvents: "none", opacity: (1 - S1_slam) * alive }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 + S1_slam * 320, height: 40 + S1_slam * 320, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "10px solid rgba(255,232,170,0.9)", boxShadow: "0 0 24px rgba(255,196,96,0.6)" }} />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
                  <div key={"imp" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 30 + S1_slam * 130, height: 6, transformOrigin: "0 50%", transform: `rotate(${ang}deg) translateX(24px)`, background: "linear-gradient(90deg, rgba(255,214,90,0.95), rgba(255,214,90,0))", borderRadius: 3 }} />
                ))}
              </div>
            )}
            {/* sparkle burst on the slam */}
            {alive > 0.05 && <Sparkles lf={lf} at={S1_MEDSLAM / 30} x={S1_DCX} y={512} n={14} spread={150} colors={[GOLD, "#FFF0B8", "#FFFFFF"]} dur={0.7} />}
          </>
        )}

        {/* ★ SIGNATURE MOMENT ★ — the yes-man SWOONS: hearts flutter up + dizzy hearts orbit his head */}
        {lf >= S1_MEDSLAM && lf < S1_EXPLODE && (
          <>
            {S1_SWOONHEARTS.map((h, i) => {
              const life = 46; const t = (lf - S1_MEDSLAM) * h.sp * 1.4 + h.ph * life; const p = (t % life) / life;
              const cy = 470 - p * 240; const cx = S1_ymX + h.dx * (0.3 + p * 0.7) + Math.sin(lf / 6 + i) * 10;
              const op = alive * S1_swoonE * (1 - p) * Math.min(1, p * 5);
              if (op <= 0.02) return null;
              return <div key={"sh" + i} style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) rotate(${Math.sin(lf / 7 + i) * 14}deg) scale(${0.7 + p * 0.5})`, opacity: op }}><S1_Heart s={h.s} c={h.c} /></div>;
            })}
            {/* dizzy hearts orbiting the fainting head (classic swoon) */}
            {S1_swoonE > 0.06 && [0, 1, 2].map((i) => {
              const a = lf / 6 + i * 2.094;
              const hx = S1_ymX + Math.cos(a) * 46; const hy = 338 + Math.sin(a) * 15;
              return <div key={"dz" + i} style={{ position: "absolute", left: hx, top: hy, transform: `translate(-50%,-50%) scale(${0.8 + 0.2 * Math.sin(a)})`, opacity: S1_swoonE * (0.55 + 0.45 * Math.sin(a)) }}><S1_Heart s={18} c={i % 2 ? "#FF8FB0" : PINK} /></div>;
            })}
          </>
        )}

        {/* ===================== CLUELESS PRAISE BUBBLES (yes-man, tails point at HOME, gone before the boom) ===================== */}
        <SpeechBubble lf={lf} at={30 / 30} dur={1.5} x={S1_MANX + 21} y={300} text="AMAZING!" tail="down" tone="praise" size={30} />
        <SpeechBubble lf={lf} at={75 / 30} dur={1.5} x={S1_MANX + 51} y={254} text="5 STARS!" tail="down" tone="praise" size={30} />
        {/* MORE-ACTION: a new praise bubble pops over the dish as the yes-man arrives to plant garnish (fills the 75->128 gap; tail points down at the dish, clear of the hero's head at x~465) */}
        <SpeechBubble lf={lf} at={100 / 30} dur={0.9} x={S1_DCX + 30} y={398} text="STUNNING!" tail="down" tone="praise" size={28} />
        <SpeechBubble lf={lf} at={128 / 30} dur={1.6} x={S1_MANX + 27} y={298} text="CHEF'S KISS!" tail="down" tone="praise" size={28} />
        {/* MORE-ACTION: one more praise bubble lands over the dish right before the blowup (gone by 190) */}
        <SpeechBubble lf={lf} at={170 / 30} dur={0.58} x={S1_DCX - 6} y={S1_PLATE - 214} text="10/10!" tail="down" tone="praise" size={28} />

        {/* ===================== THE BLOW-UP (in-frame, no full-screen flash) ===================== */}
        {lf >= S1_EXPLODE && ballOp > 0.01 && <>
          {/* shockwave ring */}
          <div style={{ position: "absolute", left: S1_DCX, top: S1_PLATE - 46, width: ringR * 2, height: ringR * 2, transform: "translate(-50%,-50%)", borderRadius: "50%", border: "12px solid rgba(255,232,170,0.9)", opacity: ringOp }} />
          {/* fireball core (localized glow at the dish) */}
          <div style={{ position: "absolute", left: S1_DCX, top: S1_PLATE - 52, width: ballR * 2, height: ballR * 2, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, #FFFDF0 0%, #FFE59A 22%, #FF7A1A 46%, #E23B2E 68%, rgba(122,48,24,0) 82%)", opacity: ballOp, filter: "blur(1px)", boxShadow: "0 0 90px rgba(255,122,26,0.8)" }} />
          {/* jagged flame tongues */}
          <svg style={{ position: "absolute", left: S1_DCX - 300, top: S1_PLATE - 352, width: 600, height: 600, opacity: ballOp }} viewBox="0 0 600 600">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2 + lf * 0.04;
              const r = ballR * (0.9 + seed(i * 3) * 0.5);
              const x = 300 + Math.cos(a) * r, y = 300 + Math.sin(a) * r;
              const bx = 300 + Math.cos(a) * r * 0.4, by = 300 + Math.sin(a) * r * 0.4;
              const p1x = 300 + Math.cos(a + 0.3) * r * 0.6, p1y = 300 + Math.sin(a + 0.3) * r * 0.6;
              const p2x = 300 + Math.cos(a - 0.3) * r * 0.6, p2y = 300 + Math.sin(a - 0.3) * r * 0.6;
              return <path key={i} d={`M${bx} ${by} L${p1x} ${p1y} L${x} ${y} L${p2x} ${p2y} Z`} fill={i % 2 ? FLAME : FLAMEY} opacity={0.88} />;
            })}
          </svg>
          {/* flying debris + gold star shrapnel */}
          {S1_FRAG.map((f, i) => {
            const p = over(lf, S1_EXPLODE, 30, Easing.out(Easing.cubic));
            const d = p * f.sp;
            const x = S1_DCX + Math.cos(f.a) * d;
            const y = (S1_PLATE - 52) + Math.sin(f.a) * d * 0.82 + p * p * 130;
            const op = (1 - p) * 0.95;
            if (op <= 0.02) return null;
            if (i % 6 === 0 || i % 6 === 1) {
              return <div key={"fr" + i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${f.rot + lf * 8}deg)`, opacity: op }}><S1_Star s={f.s + 4} c={f.c} /></div>;
            }
            return <div key={"fr" + i} style={{ position: "absolute", left: x, top: y, width: f.s, height: f.s, transform: `translate(-50%,-50%) rotate(${f.rot + lf * 8}deg)`, background: f.c, borderRadius: 2, opacity: op, boxShadow: `0 0 8px ${f.c}` }} />;
          })}
          {/* thick smoke billowing up after */}
          {S1_SMOKE.map((e, i) => {
            const life = 60; const t = (shT * e.sp + e.ph * life) % life; const p = t / life;
            const x = S1_DCX + e.dx * p + Math.sin(lf / 6 + i) * 16;
            const y = S1_PLATE - 64 - p * 380; const r = 30 + p * 66;
            const op = Math.min(1, shT / 6) * (1 - p) * 0.6;
            if (op <= 0.02) return null;
            return <div key={"bs" + i} style={{ position: "absolute", left: x, top: y, width: r, height: r, borderRadius: "50%", background: "rgba(70,58,48,0.9)", filter: "blur(9px)", opacity: op, transform: "translate(-50%,-50%)" }} />;
          })}
          {/* rising embers */}
          <Embers lf={lf - S1_EXPLODE} n={18} w={400} base={S1_PLATE - 40} />
        </>}

        {/* charred ruin left on the plate after the fire */}
        {lf >= S1_EXPLODE + 10 && <div style={{ position: "absolute", left: S1_DCX, top: S1_PLATE - 4, transform: "translate(-50%,-100%)", opacity: ramp(lf, S1_EXPLODE + 8, S1_EXPLODE + 16) }}>
          <svg viewBox="0 0 160 60" width={182} height={68} style={{ overflow: "visible" }}>
            <path d="M20 56 Q30 24 52 34 Q64 18 82 32 Q100 20 116 34 Q136 26 142 56 Z" fill="#20160E" />
            <ellipse cx={60} cy={40} rx={6} ry={4} fill={EMBER} opacity={0.5 + 0.4 * Math.sin(lf / 3)} />
            <ellipse cx={104} cy={44} rx={5} ry={3} fill={FLAME} opacity={0.4 + 0.4 * Math.sin(lf / 3 + 1)} />
          </svg>
        </div>}

        {/* warm drifting embers/motes floating in the candlelight (soft) */}
        {lf < S1_EXPLODE && S1_AMB.map((e, i) => {
          const life = 150; const t = (lf * e.sp + e.ph * life) % life; const p = t / life;
          const y = 700 - p * 620; const x = e.x + Math.sin(lf / 9 + i) * 12;
          const op = (1 - p) * 0.42;
          if (op <= 0.02) return null;
          return <div key={"am" + i} style={{ position: "absolute", left: x, top: y, width: e.s, height: e.s, borderRadius: "50%", background: "rgba(255,214,140,0.95)", boxShadow: "0 0 8px rgba(255,190,90,0.8)", opacity: op }} />;
        })}

        {/* subtle warm vignette for focus */}
        <Vignette strength={0.42} shape="rect" />
      </div>
    </>
  );
};

// ===== S2 =====
// ===== S2 =====
// ===== S2 =====
// ===== S2 =====
// ============================== S2 · THE RAMSAY AGENT (MAX-EVENTFUL PASS) =============
// SETTING kept: KITCHEN NIGHTMARES — a WARM but FADED failing-restaurant DINING ROOM.
// Peeling burgundy-and-gold DAMASK wallpaper, crooked swaying CHANDELIER w/ dead bulbs,
// flickering wall SCONCES, crooked grimy FRAMED PHOTOS, dusty COBWEBS w/ a swinging
// spider, empty white-linen DRAPED TABLES receding into gloom, a grimy BAR with a
// NERVOUS OWNER lurking, a dying "CHEZ" NEON, fireplace ember-glow, warm god-ray, dust
// motes + soot. All KEPT.
// HERO now performs a full TANTRUM in one continuous shot:
//   (1) STORMS in across the room + MARCHES to the table, stomping, kicking up dust puffs.
//   (2) Plants, surveys the wreck (hands on hips) — now seething: fuming, foot-stomping,
//       impatient, a fleeing waiter crossing behind + an order-ticket fluttering down.
//   (3) TASTES off a trembling spoon.
//   (4) GAGS + SPITS + recoils + head-shake + sweat  ("IT'S RAW.")  -> BROKEN stamp cracks the dish.
//   (5) LUNGES and SWEEPS a stack of bad plates off the table — they arc off, CLATTER, and
//       pile shattered on the floor (owner ducks & flinches); a wine glass topples + shatters.
//   (6) FLINGS three rejected 'idea' plates one after another into the bin ("BIN IT.") —
//       each windups, arcs, lands, jolts the bin; the owner cowers.
// Dead neon buzzes, dust puffs, nervous owner reacts throughout. He NEVER stands idle —
// every hold is filled with fuming, stomping, and background life. ONE shot, calm push-in,
// ZERO cuts, no flashing.

const S2_FONT = "Georgia, 'Times New Roman', serif";

const S2_CHSIZE = 288;
const S2_CHX = 322;                       // chef body center x
const S2_FEET = 664;                      // chef feet y
const S2_DISHX = 656, S2_DISHY = 604;     // plated hero dish on the draped table
const S2_BINX = 902, S2_BINY = 600;       // rubbish bin bottom-right

// beat frames (local, 30fps) — locked to VO
const S2_IN = 0;         // storms in
const S2_ARRIVE = 30;    // reaches the room
const S2_MARCH = 52;     // planted at the table
const S2_TASTE = 96;     // spoon up to mouth  ("finished work…")
const S2_SPIT = 140;     // recoils/gags       ("actually broken.")
const S2_BROKEN = 149;   // BROKEN stamp
const S2_SURVEY = 160;   // verdict            ("it just didn't")
const S2_SWEEP = 196;    // sweeps the bad-plate stack off the table
const S2_KILL1 = 264;    // first idea plate flung
const S2_KILL2 = 292;    // second idea plate flung
const S2_KILL3 = 318;    // third idea plate flung

// ---- SIGNATURE MOMENT ----
// He LIFTS the "finished" dish into his hand on the "…actually broken." beat and it
// DROOPS / oozes / sloughs apart (secretly a disaster), a FLY buzzing around it, then he
// HURLS the ruin toward the bin. Lands right on "broken@149" and reveals through the verdict.
const S2_LIFT = 150;     // grabs + lifts the dish   (on "…actually broken.")
const S2_DROOP = 158;    // it starts sagging / oozing / falling apart in his hand
const S2_HURL = 184;     // hurls the ruined dish toward the bin
const S2_HELDX = 500;    // where he holds it up to inspect (just off his extended hand)
const S2_HELDY = 470;
const S2_DISHGONE = S2_HURL + 22;   // lands in the bin + vanishes

// food chunks that slough off the plate as it falls apart (deterministic)
const S2_CHUNKS = [
  { dx: -28, dy: 4, off: 4, r: 9, col: "#A62C25", g: 200, spin: 260 },
  { dx: 20, dy: 9, off: 12, r: 7, col: "#C24A3A", g: 240, spin: -320 },
  { dx: -6, dy: 13, off: 20, r: 6, col: "#8A2A22", g: 180, spin: 200 },
];

// stomp cadence during the storm-in (foot-dust puffs)
const S2_STOMPS = [8, 18, 28, 38, 48];
// impatient FOOT-STOMPS while he's planted & seething (fills the survey / verdict holds)
const S2_HOLDSTOMPS = [62, 80, 174, 224, 246];

// the swept-off "bad plate" stack (rest on the table -> arc to the floor -> stay shattered)
const S2_SWEPT = [
  { restX: 600, landX: 470, arc: 122, rot: 300, dl: 0 },
  { restX: 566, landX: 522, arc: 152, rot: -262, dl: 3 },
  { restX: 532, landX: 428, arc: 136, rot: 338, dl: 6 },
];

// the flung reject "idea" plates (a lineup that gets binned one after another)
const S2_KILLS = [
  { launch: S2_KILL1, restX: 402, restY: 596, dir: 1, arc: 214 },
  { launch: S2_KILL2, restX: 452, restY: 602, dir: -1, arc: 182 },
  { launch: S2_KILL3, restX: 502, restY: 592, dir: 1, arc: 156 },
];
const S2_FLINGDUR = 24;

// deterministic set particles
const S2_DUST = Array.from({ length: 38 }, (_, i) => ({
  x: 40 + seed(i * 1.7) * 940,
  y: 40 + seed(i * 2.9) * 620,
  r: 1.3 + seed(i * 3.3) * 3.0,
  sp: 0.16 + seed(i * 1.3) * 0.34,
  drift: (seed(i * 4.1) - 0.5) * 60,
  ph: seed(i * 5.7),
}));
const S2_SPITP = Array.from({ length: 14 }, (_, i) => {
  const a = 0.05 + (i / 14) * 1.2 + seed(i) * 0.16;   // fan out down-right
  return { a, sp: 120 + seed(i * 2.7) * 160, s: 4 + seed(i * 1.9) * 6 };
});
// warm soot rising off the fireplace / candles
const S2_SOOT = Array.from({ length: 16 }, (_, i) => ({
  x: 120 + seed(i * 1.3) * 300,
  sp: 0.4 + seed(i * 2.7) * 0.5,
  r: 1.2 + seed(i * 3.9) * 2.2,
  ph: seed(i * 4.4),
  drift: (seed(i * 5.5) - 0.5) * 40,
}));
// soft drifting warm haze blobs (candlelit air depth)
const S2_HAZE = Array.from({ length: 5 }, (_, i) => ({
  x: 120 + seed(i * 2.2) * 760,
  y: 300 + seed(i * 3.1) * 220,
  w: 260 + seed(i * 1.6) * 180,
  sp: 0.5 + seed(i * 4.3) * 0.6,
  ph: seed(i * 5.1) * 6.283,
}));
// glass shards flung out when the wine glass shatters on the verdict beat
const S2_SHARDS = Array.from({ length: 7 }, (_, i) => ({
  a: -0.2 + (i / 7) * 1.5 + seed(i * 2.3) * 0.2,   // fan up-and-out
  sp: 60 + seed(i * 1.7) * 70,
  s: 4 + seed(i * 3.1) * 6,
  rot: (seed(i * 4.7) - 0.5) * 520,
}));

// a small teardrop flame body (scaled by the caller for flicker)
const S2_Teardrop: React.FC<{ w: number; h: number; col: string }> = ({ w, h, col }) => (
  <svg width={w} height={h} viewBox="0 0 60 100" style={{ overflow: "visible", display: "block" }}>
    <path d="M30 100 C4 74 8 44 30 2 C52 44 56 74 30 100 Z" fill={col} />
  </svg>
);

// a candle / low flame with a warm glow (varied flicker per instance)
const S2_CookFlame: React.FC<{ x: number; y: number; s: number; lf: number; ph: number }> = ({ x, y, s, lf, ph }) => {
  const f1 = 1 + Math.sin(lf / 4 + ph) * 0.16 + Math.sin(lf / 2.3 + ph * 3) * 0.06;
  const f2 = 1 + Math.sin(lf / 3.2 + ph * 2 + 1) * 0.22;
  const sway = Math.sin(lf / 6 + ph) * 2.4 + Math.sin(lf / 2.7 + ph) * 1.0;
  const glowP = 0.9 + Math.sin(lf / 3.5 + ph * 2) * 0.16;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 60 * s, height: 100 * s, transform: "translate(-50%,-100%)", zIndex: 7 }}>
      <div style={{ position: "absolute", left: "50%", top: "58%", width: 150 * s, height: 150 * s, transform: `translate(-50%,-50%) scale(${glowP})`, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,186,96,0.5), rgba(255,140,50,0) 70%)", filter: "blur(6px)" }} />
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 60 * s, height: 100 * s, transform: `translateX(calc(-50% + ${sway}px)) scaleY(${f1})`, transformOrigin: "50% 100%" }}>
        <S2_Teardrop w={60 * s} h={100 * s} col={FLAME} />
      </div>
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 38 * s, height: 72 * s, transform: `translateX(calc(-50% + ${sway * 1.3}px)) scaleY(${f2})`, transformOrigin: "50% 100%" }}>
        <S2_Teardrop w={38 * s} h={72 * s} col={FLAMEY} />
      </div>
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 20 * s, height: 46 * s, transform: `translateX(calc(-50% + ${sway * 1.5}px)) scaleY(${(f1 + f2) / 2})`, transformOrigin: "50% 100%" }}>
        <S2_Teardrop w={20 * s} h={46 * s} col={FLAME_CORE} />
      </div>
    </div>
  );
};

// rising steam wisps (kept for the dish)
const S2_SteamJet: React.FC<{ x: number; y: number; lf: number; n?: number; spd?: number; spread?: number; z?: number }> = ({ x, y, lf, n = 4, spd = 46, spread = 14, z = 13 }) => (
  <>
    {Array.from({ length: n }).map((_, k) => {
      const t = (lf / spd + k / n) % 1;
      const py = y - t * 96;
      const px = x + Math.sin(t * 6 + k * 1.7) * spread * (0.5 + t);
      const sz = 12 + t * 18;
      const op = (1 - t) * 0.42;
      if (op <= 0.02) return null;
      return <div key={k} style={{ position: "absolute", left: px, top: py, width: sz, height: sz, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "rgba(236,230,214,0.9)", opacity: op, filter: "blur(5px)", zIndex: z }} />;
    })}
  </>
);

// a small standing table candle (mostly dead; optional weak flame)
const S2_Candle: React.FC<{ x: number; y: number; s: number; lf: number; ph: number; lit: boolean }> = ({ x, y, s, lf, ph, lit }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 6 }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 9 * s, height: 34 * s, transform: "translateX(-50%)", borderRadius: 3, background: "linear-gradient(180deg,#EDE6D0,#B7AB8C)", boxShadow: "inset -2px 0 3px rgba(0,0,0,0.2)" }} />
    <div style={{ position: "absolute", left: 0, top: 30 * s, width: 12 * s, height: 5 * s, transform: "translateX(-50%)", borderRadius: "50%", background: "#8A7E60", opacity: 0.6 }} />
    {lit && <S2_CookFlame x={0} y={0} s={0.16 * s} lf={lf} ph={ph} />}
    {!lit && <div style={{ position: "absolute", left: 0, top: -3 * s, width: 2, height: 5 * s, transform: "translateX(-50%)", background: "#2A2018" }} />}
  </div>
);

// a crooked dusty chandelier, swaying, a few dead / flickering candle bulbs
const S2_Chandelier: React.FC<{ lf: number; x: number; y: number }> = ({ lf, x, y }) => {
  const sway = 3 + Math.sin(lf / 74) * 1.8 + Math.sin(lf / 31) * 0.5;   // permanently crooked + drift
  const bulbs = [-96, -48, 0, 48, 96];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 5, transformOrigin: "50% 0%", transform: `translateX(-50%) rotate(${sway}deg)` }}>
      {/* dim warm pool cast below */}
      <div style={{ position: "absolute", left: "50%", top: 150, width: 340, height: 260, transform: "translate(-50%,0)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,190,110,0.10), rgba(255,190,110,0) 70%)", filter: "blur(10px)" }} />
      {/* chain */}
      <div style={{ position: "absolute", left: "50%", top: 0, width: 5, height: 96, transform: "translateX(-50%)", background: "repeating-linear-gradient(180deg,#7A6238 0 5px,#3A2E18 5px 10px)" }} />
      {/* cobweb draping off the chain */}
      <div style={{ position: "absolute", left: "50%", top: 60, width: 150, height: 70, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(226,222,206,0.07), transparent 68%)" }} />
      {/* central brass body */}
      <div style={{ position: "absolute", left: "50%", top: 92, width: 40, height: 50, transform: "translateX(-50%)", borderRadius: "42% 42% 50% 50%", background: `linear-gradient(180deg,${BRASS},${BRASSD} 70%,#4E3612)`, boxShadow: "inset 0 5px 9px rgba(255,240,200,0.35)" }} />
      <div style={{ position: "absolute", left: "50%", top: 132, width: 12, height: 16, transform: "translateX(-50%)", borderRadius: "0 0 6px 6px", background: `linear-gradient(180deg,${BRASSD},#3A2810)` }} />
      {/* brass tier ring */}
      <div style={{ position: "absolute", left: "50%", top: 118, width: 232, height: 26, transform: "translateX(-50%)", borderRadius: "50%", border: `4px solid ${BRASSD}`, borderTopColor: BRASS, boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }} />
      {/* candle bulbs on the ring */}
      {bulbs.map((bx, i) => {
        const dead = i === 1 || i === 3;                       // a couple dead
        const stut = seed(Math.floor(lf / (6 + i)) + i * 3) > (dead ? 0.4 : 0.86) ? 0.25 : 1;
        const flick = (0.62 + 0.34 * Math.sin(lf / (3.4 + i * 0.6) + i * 1.7)) * stut;
        const on = dead ? flick * 0.22 : flick;
        const droop = 118 + Math.abs(bx) * 0.16;
        return (
          <div key={i} style={{ position: "absolute", left: `calc(50% + ${bx}px)`, top: droop, transform: "translateX(-50%)" }}>
            {/* brass cup */}
            <div style={{ position: "absolute", left: "50%", top: 8, width: 16, height: 7, transform: "translateX(-50%)", borderRadius: "50%", background: `linear-gradient(180deg,${BRASS},${BRASSD})` }} />
            {/* candle stub */}
            <div style={{ position: "absolute", left: "50%", top: -12, width: 7, height: 20, transform: "translateX(-50%)", borderRadius: 2, background: "linear-gradient(180deg,#EDE6D0,#AFA486)" }} />
            {/* flame + glow */}
            <div style={{ position: "absolute", left: "50%", top: -22, width: 26, height: 26, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `radial-gradient(circle, rgba(255,196,110,${0.55 * on}), rgba(255,150,60,0) 70%)`, filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: "50%", top: -18, width: 6, height: 12, transform: `translate(-50%,-100%) scaleY(${0.8 + on * 0.5})`, transformOrigin: "50% 100%", borderRadius: "50% 50% 46% 46%", background: `radial-gradient(ellipse at 50% 70%, ${FLAME_CORE}, ${FLAME} 75%)`, opacity: 0.55 + on * 0.45 }} />
          </div>
        );
      })}
      {/* hanging crystal droplets */}
      {[-120, -70, -20, 30, 80, 130].map((dx, i) => (
        <div key={i} style={{ position: "absolute", left: `calc(50% + ${dx}px)`, top: 132 + (i % 2) * 8, width: 5, height: 14, transform: "translateX(-50%)", borderRadius: "50% 50% 60% 60%", background: "linear-gradient(180deg,rgba(255,240,210,0.5),rgba(200,170,120,0.15))" }} />
      ))}
    </div>
  );
};

// a warm wall sconce with a flickering little flame
const S2_Sconce: React.FC<{ lf: number; x: number; y: number; ph: number }> = ({ lf, x, y, ph }) => {
  const flick = 0.6 + 0.32 * Math.sin(lf / 3.6 + ph) + (seed(Math.floor(lf / 9) + ph * 5) > 0.86 ? -0.3 : 0);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 4 }}>
      <div style={{ position: "absolute", left: -70, top: -70, width: 150, height: 190, transform: "translateX(0)", borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,180,90,${0.12 * (0.6 + flick)}), rgba(255,180,90,0) 70%)`, filter: "blur(6px)" }} />
      {/* brass bracket */}
      <div style={{ position: "absolute", left: 0, top: 12, width: 6, height: 30, background: `linear-gradient(180deg,${BRASS},${BRASSD})`, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: -8, top: 40, width: 22, height: 8, borderRadius: "50%", background: `linear-gradient(180deg,${BRASS},${BRASSD})` }} />
      {/* candle + flame */}
      <div style={{ position: "absolute", left: -1, top: 20, width: 8, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#EDE6D0,#B7AB8C)" }} />
      <div style={{ position: "absolute", left: 3, top: 8, width: 8, height: 16, transform: `translateX(-50%) scaleY(${0.8 + flick * 0.5})`, transformOrigin: "50% 100%", borderRadius: "50% 50% 46% 46%", background: `radial-gradient(ellipse at 50% 70%, ${FLAME_CORE}, ${FLAME} 78%)`, opacity: 0.7 + flick * 0.3 }} />
    </div>
  );
};

// a crooked, grimy old framed photo on the wall
const S2_Frame: React.FC<{ x: number; y: number; w: number; h: number; rot: number }> = ({ x, y, w, h, rot }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: 3, transform: `rotate(${rot}deg)`, border: `6px solid ${BRASSD}`, borderRadius: 4, background: `linear-gradient(160deg,${BRASS},${BRASSD})`, boxShadow: "0 8px 16px -8px rgba(0,0,0,0.6)" }}>
    <div style={{ position: "absolute", inset: 5, background: "linear-gradient(160deg,#6E5A44,#3E3022)", overflow: "hidden" }}>
      {/* faded sepia portrait suggestion */}
      <div style={{ position: "absolute", left: "50%", top: "58%", width: w * 0.42, height: h * 0.42, transform: "translate(-50%,-30%)", borderRadius: "50% 50% 45% 45%", background: "radial-gradient(circle at 50% 35%, #A08862, #4A3A28)" }} />
      <div style={{ position: "absolute", left: "50%", top: "34%", width: w * 0.26, height: h * 0.26, transform: "translate(-50%,-30%)", borderRadius: "50%", background: "radial-gradient(circle at 45% 40%, #B89A70, #5A4632)" }} />
      {/* grime + glass sheen */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.10), rgba(0,0,0,0.25) 60%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 90%, rgba(20,14,8,0.5), transparent 60%)" }} />
    </div>
  </div>
);

// a dusty corner cobweb with a tiny swinging spider
const S2_Cobweb: React.FC<{ lf: number; x: number; y: number; s: number; flip?: boolean; spider?: boolean }> = ({ lf, x, y, s, flip, spider }) => {
  const sw = Math.sin(lf / 40) * 8;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 130 * s, height: 130 * s, zIndex: 5, transform: `scaleX(${flip ? -1 : 1})`, opacity: 0.5 }}>
      <svg width={130 * s} height={130 * s} viewBox="0 0 130 130" style={{ overflow: "visible" }}>
        <g stroke="rgba(232,228,214,0.55)" strokeWidth={1} fill="none">
          <path d="M2 2 L128 40 M2 2 L70 128 M2 2 L110 100 M2 2 L40 124" />
          <path d="M2 2 Q30 20 34 44 Q60 40 70 66 Q46 78 58 104" />
          <path d="M2 2 Q52 18 66 30 Q88 54 92 78" />
          <path d="M2 2 Q18 40 30 58 Q52 72 62 96" />
        </g>
      </svg>
      {spider && (
        <div style={{ position: "absolute", left: 78 * s, top: 60 * s + sw, transform: "translate(-50%,-50%)" }}>
          <div style={{ position: "absolute", left: "50%", top: -60 * s - sw, width: 1, height: 60 * s + sw, transform: "translateX(-50%)", background: "rgba(232,228,214,0.5)" }} />
          <div style={{ width: 9 * s, height: 7 * s, borderRadius: "50%", background: "#15110C" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16 * s, height: 1, transform: "translate(-50%,-50%) rotate(22deg)", background: "#15110C" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16 * s, height: 1, transform: "translate(-50%,-50%) rotate(-22deg)", background: "#15110C" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16 * s, height: 1, transform: "translate(-50%,-50%) rotate(6deg)", background: "#15110C" }} />
        </div>
      )}
    </div>
  );
};

// an empty, dusty white-linen dining table receding in the gloom
const S2_DiningTable: React.FC<{ lf: number; x: number; y: number; s: number; ph: number; lit: boolean }> = ({ lf, x, y, s, ph, lit }) => {
  const shimmer = 0.5 + 0.5 * Math.sin(lf / 40 + ph);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 200 * s, zIndex: 6, transform: "translateX(-50%)", filter: "brightness(0.72) saturate(0.85)" }}>
      {/* draped cloth to the floor */}
      <div style={{ position: "absolute", left: "50%", top: 18 * s, width: 176 * s, height: 130 * s, transform: "translateX(-50%)", borderRadius: "40% 40% 10px 10px / 26px 26px 10px 10px", background: "linear-gradient(180deg,#D7CEBB 0%,#A79E8B 62%,#6C6454 100%)", boxShadow: "0 18px 26px -16px rgba(0,0,0,0.7)" }} />
      {/* soft fold shadows on the drape */}
      <div style={{ position: "absolute", left: "34%", top: 40 * s, width: 3, height: 96 * s, background: "rgba(60,48,34,0.25)" }} />
      <div style={{ position: "absolute", left: "62%", top: 40 * s, width: 3, height: 96 * s, background: "rgba(60,48,34,0.25)" }} />
      {/* table top ellipse */}
      <div style={{ position: "absolute", left: "50%", top: 10 * s, width: 200 * s, height: 44 * s, transform: "translateX(-50%)", borderRadius: "50%", background: "linear-gradient(180deg,#E7DECB,#BCB39F)" }} />
      {/* folded napkin */}
      <div style={{ position: "absolute", left: "30%", top: 14 * s, width: 26 * s, height: 16 * s, transform: "translateX(-50%) rotate(-6deg)", borderRadius: 2, background: "linear-gradient(180deg,#EFE8D6,#C9C0AC)", boxShadow: "0 3px 5px rgba(0,0,0,0.3)" }} />
      {/* two wine glasses */}
      {[62, 74].map((gx, i) => (
        <div key={i} style={{ position: "absolute", left: `${gx}%`, top: -18 * s, transform: "translateX(-50%)" }}>
          <div style={{ width: 16 * s, height: 22 * s, borderRadius: "0 0 50% 50% / 0 0 70% 70%", background: `linear-gradient(180deg, rgba(255,240,210,${0.28 + shimmer * 0.18}), rgba(120,60,50,0.35))`, border: "1px solid rgba(255,245,220,0.35)" }} />
          <div style={{ position: "absolute", left: "50%", top: 20 * s, width: 2, height: 12 * s, transform: "translateX(-50%)", background: "rgba(230,222,206,0.5)" }} />
          <div style={{ position: "absolute", left: "50%", top: 31 * s, width: 14 * s, height: 3, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(230,222,206,0.5)" }} />
        </div>
      ))}
      {/* centre candle (mostly dead) */}
      <S2_Candle x={100 * s} y={-16 * s} s={0.8 * s} lf={lf} ph={ph} lit={lit} />
    </div>
  );
};

// a grimy bar with dusty bottles
const S2_Bar: React.FC<{ lf: number; x: number; y: number; w: number }> = ({ lf, x, y, w }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: 5, filter: "brightness(0.7)" }}>
    {/* back shelf */}
    <div style={{ position: "absolute", left: 8, top: -8, width: w - 16, height: 10, background: `linear-gradient(180deg,${CLAYD},#3A2410)`, borderRadius: 3 }} />
    {/* dusty bottles */}
    {Array.from({ length: 7 }).map((_, i) => {
      const bh = 40 + (i % 3) * 12;
      const gl = 0.4 + 0.4 * Math.sin(lf / 26 + i);
      const cols = ["#3F5A3A", "#5A3A2A", "#4A3A5A", "#5A5030", "#3A4A5A"];
      return (
        <div key={i} style={{ position: "absolute", left: 14 + i * ((w - 28) / 7), top: -8 - bh, width: 12, height: bh, borderRadius: "4px 4px 2px 2px", background: `linear-gradient(90deg, ${cols[i % cols.length]}, rgba(255,220,150,${0.14 * gl}) 55%, ${cols[i % cols.length]})`, boxShadow: "inset -2px 0 3px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", left: "50%", top: -8, width: 4, height: 10, transform: "translateX(-50%)", background: "#2A2018" }} />
        </div>
      );
    })}
    {/* bar counter */}
    <div style={{ position: "absolute", left: 0, top: 44, width: w, height: 20, borderRadius: 4, background: `linear-gradient(180deg,#6E4A28,#3A2410)`, boxShadow: "0 6px 12px -6px rgba(0,0,0,0.6)" }} />
    <div style={{ position: "absolute", left: 0, top: 42, width: w, height: 5, borderRadius: 3, background: "linear-gradient(180deg,#9A7048,#6E4A28)" }} />
    {/* dust wash */}
    <div style={{ position: "absolute", left: 0, top: -60, width: w, height: 130, background: "radial-gradient(ellipse at 50% 100%, rgba(20,12,6,0.4), transparent 70%)" }} />
  </div>
);

// a nervous WAITER fleeing across the far background with a tray (adds life during the survey hold)
const S2_Waiter: React.FC<{ lf: number }> = ({ lf }) => {
  const t = ramp(lf, 40, 152);
  if (t <= 0 || t >= 1) return null;
  const wx = interpolate(t, [0, 1], [742, -96]);
  const scurry = Math.abs(Math.sin(lf / 3.4)) * -7;   // hurried gait bob
  const wy = 452 + scurry;
  const op = Math.min(1, t * 6) * Math.min(1, (1 - t) * 6) * 0.55;
  return (
    <div style={{ position: "absolute", left: wx, top: wy, width: 52, height: 52, zIndex: 5, opacity: op, filter: "brightness(0.56) blur(0.4px)", transform: "rotate(-9deg)" }}>
      {/* tray held out ahead of him */}
      <div style={{ position: "absolute", left: -20, top: 12, width: 30, height: 6, borderRadius: 3, background: "linear-gradient(180deg,#CFC6B0,#8A7E64)", boxShadow: "0 3px 5px -2px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: -14, top: 3, width: 13, height: 12, borderRadius: "50% 50% 46% 46%", background: "linear-gradient(180deg,#C79A5E,#7A5230)" }} />
      <div style={{ position: "absolute", left: -1, top: 5, width: 9, height: 10, borderRadius: "50%", background: "#9A6E42" }} />
      <Mascot lf={lf} size={52} tint="#7A6552" shock={0.85} gaze={-1} nodAmp={1} />
    </div>
  );
};

// the rubbish bin
const S2_Bin: React.FC<{ x: number; y: number; jolt: number }> = ({ x, y, jolt }) => (
  <div style={{ position: "absolute", left: x - 62, top: y - 30, width: 124, height: 160, zIndex: 20, transform: `translateY(${jolt}px)` }}>
    <div style={{ position: "absolute", left: 8, top: 22, width: 108, height: 138, borderRadius: "10px 10px 20px 20px", background: "linear-gradient(180deg,#5A626C 0%,#363C44 100%)", boxShadow: "inset 0 8px 14px rgba(255,255,255,0.1), 0 14px 22px -12px rgba(0,0,0,0.6)" }} />
    {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 8, top: 44 + k * 27, width: 108, height: 5, background: "rgba(0,0,0,0.24)" }} />)}
    <div style={{ position: "absolute", left: 0, top: 6, width: 124, height: 22, borderRadius: 9, background: "linear-gradient(180deg,#6C747E,#434952)" }} />
    <div style={{ position: "absolute", left: 12, top: 12, width: 100, height: 11, borderRadius: 6, background: "#20242A" }} />
  </div>
);

// a flung "idea" plate (sad food blob + rejected X)
const S2_IdeaPlate: React.FC<{ x: number; y: number; rot: number; sc: number; op: number }> = ({ x, y, rot, sc, op }) => (
  <svg width={140} height={100} viewBox="0 0 140 100" style={{ position: "absolute", left: x - 70, top: y - 50, overflow: "visible", zIndex: 30, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "70px 50px", opacity: op }}>
    <ellipse cx={70} cy={60} rx={54} ry={20} fill="rgba(0,0,0,0.18)" />
    <ellipse cx={70} cy={54} rx={54} ry={20} fill="#EDE7DA" stroke="#BFB6A2" strokeWidth={3} />
    <ellipse cx={70} cy={52} rx={34} ry={11} fill="#DAD1BE" />
    <path d="M50 50 Q58 38 70 44 Q84 40 90 52 Q80 60 70 56 Q58 60 50 50 Z" fill="#8C6E4E" />
    <ellipse cx={64} cy={49} rx={5} ry={3} fill="#6E5238" />
    <g stroke={RED} strokeWidth={7} strokeLinecap="round">
      <line x1={54} y1={40} x2={86} y2={66} />
      <line x1={86} y1={40} x2={54} y2={66} />
    </g>
  </svg>
);

// a grubby "bad plate" (dirty smear; cracks after it hits the floor)
const S2_BadPlate: React.FC<{ x: number; y: number; rot: number; sc: number; op: number; cracked: boolean }> = ({ x, y, rot, sc, op, cracked }) => (
  <svg width={120} height={80} viewBox="0 0 120 80" style={{ position: "absolute", left: x - 60, top: y - 40, overflow: "visible", zIndex: 18, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "60px 40px", opacity: op }}>
    <ellipse cx={60} cy={52} rx={46} ry={15} fill="rgba(0,0,0,0.22)" />
    <ellipse cx={60} cy={44} rx={46} ry={17} fill="#DCD3C0" stroke="#A99F88" strokeWidth={3} />
    <ellipse cx={60} cy={42} rx={28} ry={9} fill="#C7BDA6" />
    {/* grubby smear */}
    <path d="M44 42 Q56 33 68 42 Q77 47 66 51 Q53 53 44 46 Z" fill="#7A5C3E" opacity={0.85} />
    <ellipse cx={72} cy={40} rx={5} ry={3} fill="#5E4630" />
    {cracked && (
      <g stroke="#33190F" strokeWidth={2.4} fill="none" strokeLinecap="round">
        <path d="M30 40 L48 46 L40 57" />
        <path d="M86 38 L74 46 L88 52" />
      </g>
    )}
  </svg>
);

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- gentle continuous push-in (only camera move) ----
  const S2_push = interpolate(lf, [0, 346], [1.0, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // ---- STORM in across the room + MARCH to the table (long charge, stomping gait) ----
  const S2_bodyX = (f: number) => interpolate(f, [0, S2_ARRIVE, S2_MARCH], [-540, -128, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S2_settle = lf >= 50 && lf < 68 ? Math.sin((lf - 50) / 18 * Math.PI) * 4 * Math.exp(-(lf - 50) / 12) : 0;
  const S2_enterX = S2_bodyX(lf) + S2_settle;
  const S2_strideBob = lf < S2_MARCH ? Math.sin(lf / 3.2) * 7 * (1 - over(lf, 36, 18)) : 0;
  const S2_stormTilt = lf < S2_MARCH ? (1 - over(lf, 22, 26)) * 4 : 0;   // leans into the charge, eases out

  // ---- impatient FOOT-STOMP jolt while planted & seething (fills the survey / verdict holds) ----
  const S2_holdJolt = S2_HOLDSTOMPS.reduce((a, sf) => {
    if (lf < sf || lf > sf + 12) return a;
    const t = (lf - sf) / 12;
    return a + Math.sin(t * Math.PI) * 4;   // quick weight-drop + rebound
  }, 0);
  // a tiny impatient weight-shift sway between stomps so he's never dead-still
  const S2_seetheSway = ((lf >= 54 && lf < 94) || (lf >= 158 && lf < 196) || (lf >= 214 && lf < 344))
    ? Math.sin(lf / 9) * 2.2 + Math.sin(lf / 3.7) * 0.9
    : 0;

  // ---- fluid pose flow (RamsayChef-valid poses only) ----
  const S2_pose =
    lf < S2_MARCH ? "rest" :                 // storming / marching in
    lf < S2_TASTE ? "hipshake" :             // planted, hands on hips, surveying
    lf < S2_SPIT ? "rest" :                  // spoon to mouth (spoon drawn separately)
    lf < S2_LIFT ? "cross" :                 // gag + arms-folded recoil
    lf < S2_SWEEP + 34 ? "present" :         // LIFTS the drooping dish → HURLS it → flows into the SWEEP (arm out to his right)
    lf < 258 ? "cross" :                     // brief re-fold before the flings
    "present";                               // flinging idea plates to his right (the bin)

  const S2_yell = interpolate(
    lf,
    [S2_SPIT, S2_SPIT + 6, S2_SPIT + 18, S2_HURL, S2_HURL + 6, S2_SWEEP, S2_SWEEP + 6, S2_KILL1 - 6, S2_KILL1 + 6, S2_KILL2 + 6, S2_KILL3 + 6, S2_KILL3 + 22],
    [0, 0.72, 0.34, 0.5, 0.58, 0.2, 0.62, 0.2, 0.5, 0.5, 0.5, 0.18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ---- disgust recoil + head-shake (secondary motion) ----
  const S2_spitEnv = lf >= S2_SPIT ? Math.exp(-(lf - S2_SPIT) / 10) : 0;
  const S2_shakeEnv = lf >= S2_SPIT ? Math.exp(-(lf - S2_SPIT) / 13) : 0;
  const S2_headShake = Math.sin((lf - S2_SPIT) / 2.4) * 3.2 * S2_shakeEnv;
  const S2_recoilX = -S2_spitEnv * 9;
  // anticipation dip just BEFORE the taste hits the mouth (leans in)
  const S2_leanIn = over(lf, S2_TASTE - 10, 10) - over(lf, S2_TASTE, 6);
  const S2_bodyLean = S2_leanIn * 5;
  // ---- tasting "consideration": a slow chew-bob + a pondering head-tilt that curdles into
  //      disgust — fills the 112-136 spoon-hold so he's never idle mid-taste ----
  const S2_tasteEnv = over(lf, 104, 12) - over(lf, 134, 8);                       // 0..1 over the hold
  const S2_tasteBob = Math.sin((lf - 104) / 4.4) * 2.6 * S2_tasteEnv;             // gentle chewing bob
  const S2_tasteTilt = (1.6 + Math.sin((lf - 104) / 6.5) * 2.4) * S2_tasteEnv;    // building grimace tilt
  const S2_tasteBrowJit = Math.sin((lf - 104) / 3.1) * 1.1 * S2_tasteEnv;         // tiny suspicious jitter

  // ---- the SWEEP lunge (body drives toward the table, tips into it, returns) ----
  const S2_lungeEnv = lf >= S2_SWEEP && lf < S2_SWEEP + 24 ? Math.sin((lf - S2_SWEEP) / 24 * Math.PI) : 0;
  const S2_lungeX = S2_lungeEnv * 46;
  const S2_lungeY = S2_lungeEnv * 10;
  const S2_lungeTilt = S2_lungeEnv * 7;

  // ---- taste: spoon rises to the mouth then lowers, with a hand wobble ----
  const S2_spoonT = over(lf, S2_TASTE, 16, Easing.out(Easing.cubic)) - over(lf, S2_SPIT - 4, 8);
  const S2_spoonWob = Math.sin(lf / 3.3) * 2.4 * S2_spoonT;   // trembling wrist

  // ---- chef box anchor (feeds the mouth, sweat, spoon) ----
  const S2_chefLeft = S2_CHX - S2_CHSIZE / 2 + S2_enterX + S2_recoilX + S2_bodyLean + S2_lungeX + S2_seetheSway;
  const S2_chefTop = S2_FEET - S2_CHSIZE + S2_strideBob + S2_lungeY + S2_holdJolt + S2_tasteBob;
  const S2_mouthX = S2_chefLeft + S2_CHSIZE / 2 + 44;
  const S2_mouthY = S2_chefTop + 100;

  // ---- a bead of sweat rolls down on the rage beat ----
  const S2_sweatT = ramp(lf, S2_SPIT + 4, S2_SPIT + 34);
  const S2_sweatX = S2_chefLeft + S2_CHSIZE * 0.30 - S2_headShake * 1.4;
  const S2_sweatY = S2_chefTop + S2_CHSIZE * 0.22 + S2_sweatT * 46;

  // ---- BROKEN stamp (quick back-pop; then rides the lifted dish up and fades as it's hurled) ----
  const S2_brokenPop = interpolate(over(lf, S2_BROKEN, 9, Easing.out(Easing.back(2.2))), [0, 1], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S2_brokenOp = interpolate(lf, [S2_BROKEN, S2_BROKEN + 7, S2_HURL, S2_HURL + 8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- hero dish looks fine, then cracks red after the taste ----
  const S2_cracked = ramp(lf, S2_SPIT, S2_SPIT + 14);
  const S2_dishTremble = lf >= S2_BROKEN && lf < S2_BROKEN + 10 ? Math.sin((lf - S2_BROKEN) / 1.3) * 2.4 * Math.exp(-(lf - S2_BROKEN) / 6) : 0;

  // ---- SIGNATURE: the ruined dish is LIFTED into his hand, DROOPS/oozes, then is HURLED to the bin ----
  const S2_liftT = over(lf, S2_LIFT, 15, Easing.out(Easing.cubic));                   // table → up in his hand
  const S2_hurlT = over(lf, S2_HURL, 22, Easing.inOut(Easing.cubic));                 // hand → bin
  const S2_droopT = Math.min(1, over(lf, S2_DROOP, 26));                              // 0..1 sag / ooze / fall-apart
  const S2_dishRestX = S2_DISHX + S2_dishTremble, S2_dishRestY = S2_DISHY - 8;
  const S2_dishX = lf < S2_HURL
    ? interpolate(S2_liftT, [0, 1], [S2_dishRestX, S2_HELDX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(S2_hurlT, [0, 1], [S2_HELDX, S2_BINX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S2_dishY = lf < S2_HURL
    ? interpolate(S2_liftT, [0, 1], [S2_dishRestY, S2_HELDY], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + Math.sin(lf / 5) * S2_liftT * 2
    : interpolate(S2_hurlT, [0, 1], [S2_HELDY, S2_BINY - 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) - Math.sin(S2_hurlT * Math.PI) * 150;
  const S2_dishTiltHold = S2_liftT * -6 + Math.sin(lf / 7) * S2_liftT * 2;            // held at a disgusted tilt
  const S2_dishRot = lf < S2_HURL ? S2_dishTiltHold : S2_dishTiltHold - S2_hurlT * 400;
  const S2_dishScale = lf < S2_HURL ? 1 : interpolate(S2_hurlT, [0, 1], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S2_dishOp = lf < S2_HURL ? 1 : interpolate(S2_hurlT, [0.8, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S2_dishZ = lf >= S2_LIFT ? 24 : 14;                                           // rides up in front of the chef when held
  // droop visuals: food dome melts down, an ooze string stretches + drips
  const S2_sag = S2_droopT * 26;
  const S2_oozeLen = S2_droopT * 46 + Math.sin(lf / 5) * 3 * S2_droopT;

  // ---- bin jolt on each idea-plate landing ----
  const S2_binJolt = -6 * [S2_DISHGONE, S2_KILL1 + S2_FLINGDUR, S2_KILL2 + S2_FLINGDUR, S2_KILL3 + S2_FLINGDUR].reduce((a, lp) => a + (lf >= lp ? Math.exp(-(lf - lp) / 5) : 0), 0);

  // ---- nervous OWNER reactions (ducks + shudders on the crashes) ----
  const S2_ownerShock = interpolate(
    lf,
    [S2_SPIT, S2_SPIT + 6, S2_SPIT + 40, S2_SWEEP - 4, S2_SWEEP + 6, S2_SWEEP + 48, S2_KILL1, S2_KILL1 + 6, S2_KILL2 + 6, S2_KILL3 + 6, S2_KILL3 + 34],
    [0, 0.5, 0.15, 0.18, 0.95, 0.2, 0.3, 0.7, 0.7, 0.7, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const S2_ownerDuck = (lf >= S2_SWEEP && lf < S2_SWEEP + 34 ? Math.sin((lf - S2_SWEEP) / 34 * Math.PI) * 20 : 0) + S2_ownerShock * 6;
  const S2_ownerShudder = Math.sin(lf / 2.2) * S2_ownerShock * 3;

  // ---- warm ambient breathing (whole-room candlelight pulse) ----
  const S2_amb = 0.5 + 0.5 * Math.sin(lf / 26);

  // ---- a wine glass on the front table trembles, topples & shatters through the verdict hold ----
  const S2_wgX = 812, S2_wgY = 556;
  const S2_wgJit = lf >= 158 && lf < 172 ? Math.sin((lf - 158) / 2) * 2.6 * over(lf, 158, 14) : 0;   // pre-topple tremble
  const S2_wgFall = ramp(lf, 172, 190);                              // topple + fall to the floor
  const S2_wgRot = S2_wgJit * 2 + S2_wgFall * 116;
  const S2_wgFx = S2_wgX + S2_wgFall * S2_wgFall * 48;
  const S2_wgFy = S2_wgY + S2_wgFall * S2_wgFall * 152;
  const S2_wgLandX = S2_wgX + 48, S2_wgLandY = S2_wgY + 152;         // resting/impact point on the floor

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `scale(${S2_push})`, transformOrigin: "50% 44%" }}>

      {/* ===================== FADED FAILING-RESTAURANT DINING ROOM ===================== */}
      {/* warm burgundy back wall */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#5A3630 0%,#48292A 44%,#331E1D 100%)", zIndex: 0 }} />
      {/* peeling gold DAMASK wallpaper pattern (warm, faded) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 540, zIndex: 1, opacity: 0.5, backgroundImage: "radial-gradient(circle at 30px 26px, rgba(214,170,96,0.16) 0 4px, rgba(214,170,96,0) 6px), radial-gradient(circle at 90px 86px, rgba(214,170,96,0.13) 0 4px, rgba(214,170,96,0) 6px), radial-gradient(circle at 60px 56px, rgba(200,120,90,0.10) 0 8px, rgba(200,120,90,0) 12px)", backgroundSize: "120px 120px, 120px 120px, 120px 120px" }} />
      {/* faded vertical damask stripes */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 540, zIndex: 1, opacity: 0.35, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,220,160,0.05) 0 2px, rgba(0,0,0,0) 2px 64px)" }} />
      {/* grime + water stains bleeding down the wallpaper */}
      <div style={{ position: "absolute", left: 700, top: 40, width: 220, height: 300, zIndex: 1, borderRadius: "44% 52% 46% 54%", background: "radial-gradient(ellipse,rgba(30,16,8,0.5),rgba(30,16,8,0) 70%)" }} />
      <div style={{ position: "absolute", left: 80, top: 30, width: 130, height: 340, zIndex: 1, background: "linear-gradient(180deg,rgba(24,12,6,0.4),rgba(24,12,6,0) 82%)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: 420, top: 20, width: 90, height: 240, zIndex: 1, background: "linear-gradient(180deg,rgba(24,12,6,0.3),rgba(24,12,6,0) 80%)", filter: "blur(6px)" }} />

      {/* PEELING wallpaper flaps — curled corners with plaster showing beneath */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: 150, zIndex: 2, background: "linear-gradient(135deg,#8A7660 0%,#6E5A44 40%,rgba(0,0,0,0) 60%)" }} />
      <div style={{ position: "absolute", left: 14, top: 8, width: 96, height: 120, zIndex: 2, transform: `rotate(${-8 + Math.sin(lf / 58) * 1.5}deg)`, transformOrigin: "50% 0%", borderRadius: "0 0 60% 20%", background: "linear-gradient(200deg,#6A4038,#4A2A28 70%)", boxShadow: "4px 6px 10px -4px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", left: 936, top: 250, width: 70, height: 130, zIndex: 2, transform: `rotate(${10 + Math.sin(lf / 47 + 2) * 1.6}deg)`, transformOrigin: "50% 0%", borderRadius: "40% 0 0 50%", background: "linear-gradient(150deg,#5E362F,#40241F 70%)", boxShadow: "-4px 6px 10px -4px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", left: 928, top: 238, width: 84, height: 30, zIndex: 1, background: "linear-gradient(180deg,#8A7660,#6E5A44)" }} />

      {/* warm wood WAINSCOT along the lower wall */}
      <div style={{ position: "absolute", left: 0, top: 470, width: 1012, height: 100, zIndex: 2, background: "linear-gradient(180deg,#5A3B22 0%,#452B18 60%,#341F10 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 466, width: 1012, height: 8, zIndex: 2, background: "linear-gradient(180deg,#7A5230,#4A2E18)" }} />
      {/* wainscot panel seams */}
      {[80, 260, 440, 620, 800, 960].map((px, i) => (
        <div key={i} style={{ position: "absolute", left: px, top: 478, width: 130, height: 84, zIndex: 2, border: "2px solid rgba(30,16,8,0.4)", borderRadius: 3, boxShadow: "inset 1px 1px 0 rgba(255,210,150,0.08)" }} />
      ))}

      {/* warm wood floor + faded rug */}
      <div style={{ position: "absolute", left: 0, top: 566, width: 1012, height: 226, zIndex: 2, background: "linear-gradient(180deg,#3A2416 0%,#1E120A 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 566, width: 1012, height: 226, zIndex: 2, opacity: 0.4, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,200,140,0.05) 0 1px, rgba(0,0,0,0) 1px 70px)" }} />
      <div style={{ position: "absolute", left: 260, top: 596, width: 620, height: 190, zIndex: 2, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(120,50,44,0.5), rgba(80,32,28,0.18) 60%, rgba(0,0,0,0) 78%)" }} />
      <div style={{ position: "absolute", left: 300, top: 606, width: 540, height: 168, zIndex: 2, borderRadius: "50%", border: "3px solid rgba(200,150,90,0.14)" }} />

      {/* warm amber GOD-RAY from the front door he storms through */}
      <div style={{ position: "absolute", left: -40, top: 0, width: 360, height: 792, zIndex: 3, background: "linear-gradient(100deg, rgba(255,196,110,0.16), rgba(255,196,110,0) 68%)", opacity: interpolate(lf, [0, 22, 70], [0.95, 0.9, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />

      {/* crooked dusty CHANDELIER over the room */}
      <S2_Chandelier lf={lf} x={512} y={0} />

      {/* warm wall SCONCES flickering */}
      <S2_Sconce lf={lf} x={148} y={250} ph={0.4} />
      <S2_Sconce lf={lf} x={860} y={262} ph={2.3} />

      {/* crooked grimy FRAMED PHOTOS */}
      <S2_Frame x={120} y={150} w={92} h={116} rot={-5} />
      <S2_Frame x={244} y={196} w={70} h={88} rot={4} />
      <S2_Frame x={792} y={188} w={96} h={78} rot={6} />

      {/* dusty COBWEBS in the corners (right one has a swinging spider) */}
      <S2_Cobweb lf={lf} x={0} y={0} s={1.3} />
      <S2_Cobweb lf={lf} x={890} y={0} s={1.5} flip spider />

      {/* the grimy BAR back-left, with a NERVOUS OWNER lurking + reacting */}
      <S2_Bar lf={lf} x={30} y={430} w={240} />
      <div style={{ position: "absolute", left: 96, top: 350, width: 58, height: 58, zIndex: 6, opacity: 0.62, transform: `translate(${S2_ownerShudder}px, ${Math.sin(lf / 24) * 3 + S2_ownerDuck}px)`, filter: "brightness(0.58) blur(0.4px)" }}>
        <Mascot lf={lf} size={58} tint="#8A6E58" nodAmp={2} shock={S2_ownerShock} gaze={1} />
      </div>

      {/* a NERVOUS WAITER fleeing across the far background during the survey hold */}
      <S2_Waiter lf={lf} />

      {/* empty DRAPED TABLES receding into the gloom (one candle weakly lit) */}
      <S2_DiningTable lf={lf} x={470} y={392} s={0.82} ph={0.7} lit={true} />
      <S2_DiningTable lf={lf} x={720} y={372} s={0.66} ph={2.1} lit={false} />
      <S2_DiningTable lf={lf} x={880} y={356} s={0.52} ph={3.4} lit={false} />

      {/* low FIREPLACE ember-glow warming the back-left wall */}
      <div style={{ position: "absolute", left: 150, top: 500, width: 120, height: 60, zIndex: 4, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,150,60,${0.14 + S2_amb * 0.08}), rgba(255,150,60,0) 70%)`, filter: "blur(8px)" }} />

      {/* drifting warm heat-haze / candlelit air (soft depth) */}
      {S2_HAZE.map((h, i) => {
        const dx = Math.sin(lf / 90 * h.sp + h.ph) * 40;
        const dy = -((lf * 0.12 * h.sp + h.ph * 30) % 160);
        const op = 0.05 + 0.04 * (0.5 + 0.5 * Math.sin(lf / 70 + h.ph));
        return <div key={i} style={{ position: "absolute", left: h.x + dx, top: h.y + dy, width: h.w, height: h.w * 0.5, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,170,90,0.5), rgba(255,170,90,0) 70%)", opacity: op, filter: "blur(14px)", zIndex: 10 }} />;
      })}

      {/* dust motes drifting through the candlelit air */}
      {S2_DUST.map((m, i) => {
        const t = ((lf * m.sp + m.ph * 200) % 200) / 200;
        const y = m.y - t * 120;
        const x = m.x + Math.sin(lf / 40 + m.ph * 6) * 16 + m.drift * t;
        const op = (0.16 + 0.3 * Math.sin(lf / 30 + m.ph * 6)) * (1 - t);
        if (op <= 0.02) return null;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: m.r, height: m.r, borderRadius: "50%", background: "#F0DEB8", opacity: op, zIndex: 8 }} />;
      })}

      {/* warm soot rising off the fireplace / candles */}
      {S2_SOOT.map((e, i) => {
        const t = ((lf * e.sp + e.ph * 240) % 240) / 240;
        const y = 540 - t * 300;
        const x = e.x + Math.sin(lf / 24 + e.ph * 6) * 10 + e.drift * t;
        const op = (1 - t) * 0.4;
        if (op <= 0.03) return null;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: e.r, height: e.r, borderRadius: "50%", background: EMBER, opacity: op, boxShadow: `0 0 5px ${FLAME}`, zIndex: 9 }} />;
      })}

      {/* an ORDER TICKET flutters loose and drifts down through the survey hold */}
      {(() => {
        const t = ramp(lf, 56, 118);
        if (t <= 0 || t >= 1) return null;
        const px = 636 + Math.sin(lf / 6.5) * 44 * (1 - t * 0.4);
        const py = 156 + t * 434;
        const rot = Math.sin(lf / 4.6) * 24 + t * 40;
        const op = Math.min(1, t * 5) * Math.min(1, (1 - t) * 2.4) * 0.9;
        return (
          <div style={{ position: "absolute", left: px, top: py, width: 34, height: 46, transform: `rotate(${rot}deg)`, transformOrigin: "50% 30%", zIndex: 13, opacity: op, background: "linear-gradient(180deg,#F4EEDC,#D6CCB2)", borderRadius: 2, boxShadow: "0 5px 9px -4px rgba(0,0,0,0.55)" }}>
            <div style={{ position: "absolute", left: 4, top: 7, right: 4, height: 2.5, background: "rgba(70,46,24,0.42)" }} />
            <div style={{ position: "absolute", left: 4, top: 15, right: 10, height: 2.5, background: "rgba(70,46,24,0.34)" }} />
            <div style={{ position: "absolute", left: 4, top: 23, right: 6, height: 2.5, background: "rgba(70,46,24,0.34)" }} />
            <div style={{ position: "absolute", left: 4, top: 31, right: 14, height: 2.5, background: "rgba(70,46,24,0.3)" }} />
          </div>
        );
      })()}

      {/* dying RESTAURANT NEON sign — each letter buzzes on its own dying phase */}
      {(() => {
        const buzz = 0.5 + 0.5 * Math.sin(lf / 7) * Math.sin(lf / 3.3 + 1);
        const glow = 0.24 + 0.28 * Math.max(0, buzz) + (seed(Math.floor(lf / 8)) > 0.78 ? -0.16 : 0);
        const letters = ["C", "H", "E", "Z"];
        return (
          <div style={{ position: "absolute", left: 792, top: 96, transform: "rotate(4deg)", zIndex: 4, display: "flex", gap: 4 }}>
            {letters.map((ch, i) => {
              const lb = 0.5 + 0.5 * Math.sin(lf / (5 + i * 1.7) + i * 2.1);
              const dead = seed(Math.floor(lf / (6 + i)) + i * 3) > (i === 1 ? 0.55 : 0.82);
              const lo = (0.32 + glow * 0.6) * (dead ? 0.16 : 0.7 + lb * 0.3);
              return (
                <span key={i} style={{ fontFamily: S2_FONT, fontWeight: 900, fontSize: 34, letterSpacing: 2, color: "#FFE2C0", opacity: lo, textShadow: `0 0 ${9 * glow * (dead ? 0.2 : 1) + 2}px ${HKR_GLOW}, 0 0 ${18 * glow * (dead ? 0.2 : 1)}px ${HKRED}` }}>{ch}</span>
              );
            })}
            <div style={{ position: "absolute", left: 0, top: 44, width: 96, height: 3, background: HKR_GLOW, opacity: glow * 0.7, boxShadow: `0 0 8px ${HKR_GLOW}` }} />
          </div>
        );
      })()}

      {/* ===================== FRONT DRAPED TABLE + THE "FINISHED" DISH ===================== */}
      <div style={{ position: "absolute", left: S2_DISHX, top: S2_DISHY - 2, width: 340, height: 200, transform: "translateX(-50%)", zIndex: 12 }}>
        {/* draped ivory linen (dusty) to the floor */}
        <div style={{ position: "absolute", left: "50%", top: 30, width: 320, height: 178, transform: "translateX(-50%)", background: "linear-gradient(180deg,#E7DECB 0%,#C6BDA8 40%,#9A9078 78%,#6C6452 100%)", borderRadius: "10px 10px 0 0", boxShadow: "0 22px 32px -16px rgba(0,0,0,0.65)" }} />
        {/* cloth folds */}
        <div style={{ position: "absolute", left: "24%", top: 52, width: 4, height: 150, background: "rgba(60,48,34,0.22)" }} />
        <div style={{ position: "absolute", left: "50%", top: 52, width: 4, height: 150, background: "rgba(60,48,34,0.18)" }} />
        <div style={{ position: "absolute", left: "74%", top: 52, width: 4, height: 150, background: "rgba(60,48,34,0.22)" }} />
        {/* table top edge */}
        <div style={{ position: "absolute", left: "50%", top: 24, width: 336, height: 26, transform: "translateX(-50%)", borderRadius: 8, background: "linear-gradient(180deg,#F1E9D6,#CFC6B0)" }} />
        <div style={{ position: "absolute", left: "50%", top: 26, width: 300, height: 4, transform: "translateX(-50%)", background: "rgba(255,255,255,0.4)" }} />
        {/* a dusty wine glass beside the dish */}
        <div style={{ position: "absolute", left: "82%", top: -22, transform: "translateX(-50%)" }}>
          <div style={{ width: 22, height: 30, borderRadius: "0 0 50% 50% / 0 0 70% 70%", background: "linear-gradient(180deg, rgba(255,240,210,0.3), rgba(120,50,44,0.4))", border: "1px solid rgba(255,245,220,0.4)" }} />
          <div style={{ position: "absolute", left: "50%", top: 28, width: 2.5, height: 16, transform: "translateX(-50%)", background: "rgba(230,222,206,0.55)" }} />
          <div style={{ position: "absolute", left: "50%", top: 43, width: 18, height: 3.5, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(230,222,206,0.55)" }} />
        </div>
      </div>

      {/* a SECOND wine glass on the front table — trembles, topples & shatters through the verdict hold */}
      {S2_wgFall < 1 && (
        <div style={{ position: "absolute", left: S2_wgFx + S2_wgJit, top: S2_wgFy, width: 22, height: 44, transform: `rotate(${S2_wgRot}deg)`, transformOrigin: "50% 100%", zIndex: 16 }}>
          <div style={{ width: 22, height: 26, borderRadius: "0 0 50% 50% / 0 0 70% 70%", background: "linear-gradient(180deg, rgba(255,240,210,0.34), rgba(120,50,44,0.5))", border: "1px solid rgba(255,245,220,0.5)" }} />
          <div style={{ position: "absolute", left: "50%", top: 24, width: 2.5, height: 14, transform: "translateX(-50%)", background: "rgba(230,222,206,0.6)" }} />
          <div style={{ position: "absolute", left: "50%", top: 37, width: 16, height: 3.5, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(230,222,206,0.6)" }} />
        </div>
      )}
      {/* glass SHATTER — twinkle + shards + a small floor puff on impact */}
      {lf >= 190 && lf < 208 && (
        <Sparkles lf={lf} at={190 / 30} x={S2_wgLandX} y={S2_wgLandY} n={9} spread={130} colors={["#EAF2F6", "#BFE0F0", "#F1E9D6"]} dur={0.7} />
      )}
      {lf >= 190 && lf < 214 && S2_SHARDS.map((sh, i) => {
        const t = over(lf, 190, 20, Easing.out(Easing.cubic));
        const d = t * sh.sp;
        const x = S2_wgLandX + Math.cos(sh.a) * d;
        const y = S2_wgLandY + Math.sin(sh.a) * d - Math.sin(t * Math.PI) * 26 + t * t * 30;
        const op = (1 - t) * 0.9;
        if (op <= 0.04) return null;
        return (
          <div key={`shd${i}`} style={{ position: "absolute", left: x, top: y, width: sh.s, height: sh.s * 1.5, transform: `translate(-50%,-50%) rotate(${sh.rot * t}deg)`, background: "linear-gradient(180deg,#EAF2F6,#9FBED0)", clipPath: "polygon(50% 0, 100% 100%, 0 100%)", opacity: op, zIndex: 17 }} />
        );
      })}
      {lf >= 190 && lf < 206 && (() => {
        const t = (lf - 190) / 16;
        const w = 22 + t * 58;
        const op = (1 - t) * 0.4;
        return <div style={{ position: "absolute", left: S2_wgLandX - w / 2, top: S2_wgLandY - w * 0.3, width: w, height: w * 0.55, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(206,196,178,0.65), rgba(206,196,178,0) 70%)", opacity: op, filter: "blur(3px)", zIndex: 16 }} />;
      })()}

      {/* plate + food — sits fine, cracks red, then he LIFTS it and it DROOPS/oozes/falls apart, then it's HURLED */}
      {S2_dishOp > 0.01 && (
      <div style={{ position: "absolute", left: S2_dishX, top: S2_dishY, transform: `translate(-50%,-50%) rotate(${S2_dishRot}deg) scale(${S2_dishScale})`, opacity: S2_dishOp, zIndex: S2_dishZ }}>
        <div style={{ width: 150, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 32%,#FFFFFF,#DDE0E4 70%,#BFC4CB)", boxShadow: "0 14px 22px -10px rgba(0,0,0,0.55)" }} />
        <div style={{ position: "absolute", left: "50%", top: 8, width: 84, height: 20, transform: "translateX(-50%)", borderRadius: "50%", background: "#E7EAED" }} />
        {/* food dome — MELTS/sags downward as it falls apart in his hand */}
        <div style={{ position: "absolute", left: "50%", top: -8 + S2_sag * 0.35, width: 62, height: 34 + S2_sag, transform: "translateX(-50%)", borderRadius: `48% 48% ${42 + S2_droopT * 34}% ${42 + S2_droopT * 34}%`, background: S2_cracked > 0.3 ? "radial-gradient(ellipse at 42% 30%,#E76A6A,#A62C25 72%)" : "radial-gradient(ellipse at 42% 30%,#C98A4E,#8A5A2E 72%)", boxShadow: "0 6px 10px -4px rgba(0,0,0,0.5)" }} />
        {/* the OOZE string dripping off the collapsing food */}
        {S2_droopT > 0.05 && (
          <div style={{ position: "absolute", left: "47%", top: 18 + S2_sag * 0.35, width: 8, height: S2_oozeLen, transform: "translateX(-50%)", borderRadius: "42% 42% 50% 50%", background: "linear-gradient(180deg,#A62C25,#7A1E18)", opacity: 0.95 }} />
        )}
        {S2_droopT > 0.4 && (
          <div style={{ position: "absolute", left: "47%", top: 18 + S2_sag * 0.35 + S2_oozeLen - 5, width: 12, height: 12, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(circle at 38% 32%,#C24A3A,#7A1E18)", boxShadow: "0 3px 5px -2px rgba(0,0,0,0.4)" }} />
        )}
        {/* raw/broken cracks appear after the taste */}
        {S2_cracked > 0.3 && (
          <svg width={70} height={40} viewBox="0 0 70 40" style={{ position: "absolute", left: "50%", top: -6 + S2_sag * 0.35, transform: "translateX(-50%)", overflow: "visible" }}>
            <path d="M20 8 L30 22 L24 32" stroke="#4A0F0B" strokeWidth={3} fill="none" strokeLinecap="round" opacity={S2_cracked} />
            <path d="M42 6 L38 20 L48 30" stroke="#4A0F0B" strokeWidth={3} fill="none" strokeLinecap="round" opacity={S2_cracked} />
          </svg>
        )}
        {/* garnish sprig — wilts over as the dish collapses */}
        <div style={{ position: "absolute", left: "54%", top: -14 + S2_sag * 0.35, width: 6, height: 16, background: GREEN, borderRadius: 3, transform: `rotate(${-12 - S2_droopT * 46}deg)`, transformOrigin: "50% 100%" }} />
      </div>
      )}
      {/* steam only while it's still "finished" (sitting on the table) */}
      {lf < S2_SPIT && <S2_SteamJet x={S2_DISHX} y={S2_DISHY - 30} lf={lf} n={3} spd={44} spread={12} z={15} />}

      {/* food CHUNKS slough off the plate and drop as it falls apart in his hand */}
      {S2_droopT > 0.1 && lf < S2_DISHGONE + 34 && S2_CHUNKS.map((c, i) => {
        const cs = S2_DROOP + c.off;
        const ct = ramp(lf, cs, cs + 42);
        if (ct <= 0) return null;
        const fx = S2_dishX + c.dx;
        const fy = S2_dishY + c.dy + ct * ct * c.g;
        const op = ct < 0.85 ? 1 : interpolate(ct, [0.85, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={`ck${i}`} style={{ position: "absolute", left: fx - c.r, top: fy - c.r, width: c.r * 2, height: c.r * 1.7, borderRadius: "48% 52% 44% 56%", background: `radial-gradient(circle at 38% 32%, ${c.col}, #5A160F)`, transform: `rotate(${ct * c.spin}deg)`, opacity: op, zIndex: 18 }} />
        );
      })}

      {/* a FLY buzzing around the ruined dish (figure-eight buzz + a faint dashed trail) */}
      {lf >= S2_LIFT - 4 && lf < S2_HURL && (() => {
        const ft = lf - (S2_LIFT - 4);
        const orbit = Math.min(1, over(lf, S2_LIFT - 4, 10));
        const path = (g: number) => {
          const px = S2_dishX + (Math.sin((ft - g) / 5.5) * 52 + Math.sin((ft - g) / 2.1) * 12) * orbit;
          const py = S2_dishY - 46 + (Math.cos((ft - g) / 4.2) * 30 + Math.sin((ft - g) / 1.6) * 7) * orbit;
          return { px, py };
        };
        const wing = 0.5 + 0.5 * Math.sin(ft * 1.7);
        const cur = path(0);
        return (
          <>
            {[7, 13, 19].map((g, gi) => {
              const p = path(g);
              return <div key={`ft${gi}`} style={{ position: "absolute", left: p.px, top: p.py, width: 3, height: 3, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `rgba(18,16,12,${0.26 - gi * 0.07})`, zIndex: 41 }} />;
            })}
            <div style={{ position: "absolute", left: cur.px, top: cur.py, transform: "translate(-50%,-50%)", zIndex: 42 }}>
              <div style={{ position: "absolute", left: -7, top: -5, width: 9, height: 6, borderRadius: "50%", background: `rgba(214,224,238,${0.32 + wing * 0.4})`, transform: `rotate(${-26 - wing * 16}deg)` }} />
              <div style={{ position: "absolute", left: 2, top: -5, width: 9, height: 6, borderRadius: "50%", background: `rgba(214,224,238,${0.32 + (1 - wing) * 0.4})`, transform: `rotate(${26 + (1 - wing) * 16}deg)` }} />
              <div style={{ position: "absolute", left: -4, top: -3, width: 9, height: 6, borderRadius: "50% 50% 50% 50% / 60% 60% 42% 42%", background: "linear-gradient(180deg,#2A2620,#0C0A06)" }} />
              <div style={{ position: "absolute", left: 4, top: -3, width: 4, height: 4, borderRadius: "50%", background: "#141210" }} />
            </div>
          </>
        );
      })()}

      {/* HURL whoosh — a motion streak trailing the dish as it flies to the bin */}
      {lf >= S2_HURL && lf < S2_HURL + 13 && (() => {
        const t = (lf - S2_HURL) / 13;
        const op = (1 - t) * 0.5;
        const tx = S2_dishX, ty = S2_dishY;
        return (
          <svg width={12} height={12} viewBox="0 0 12 12" style={{ position: "absolute", left: tx, top: ty, overflow: "visible", zIndex: 23 }}>
            <path d={`M0 0 Q ${-70 - t * 60} ${-30} ${-150 - t * 90} ${-24}`} stroke={`rgba(255,244,224,${op})`} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d={`M2 6 Q ${-70 - t * 60} ${-14} ${-146 - t * 90} ${-6}`} stroke={`rgba(255,214,170,${op * 0.6})`} strokeWidth={3} fill="none" strokeLinecap="round" />
          </svg>
        );
      })()}
      {/* the ruin hits the bin — burst + jolt */}
      {lf >= S2_DISHGONE && lf < S2_DISHGONE + 14 && <Sparkles lf={lf} at={S2_DISHGONE / 30} x={S2_BINX} y={S2_BINY - 12} n={10} spread={140} colors={["#A62C25", "#8A6E4E", RED]} dur={0.9} />}

      {/* ===================== THE BAD-PLATE STACK -> SWEPT OFF -> SHATTERED PILE ===================== */}
      {S2_SWEPT.map((p, i) => {
        const launch = S2_SWEEP + p.dl;
        const restY = 566 - i * 7;                 // stacked on the tabletop
        const landY = 706 + i * 6;                 // resting on the floor
        if (lf < launch) {
          const appear = ramp(lf, 44, 92);         // the grubby stack is present before the sweep
          if (appear <= 0.01) return null;
          const wob = Math.sin(lf / 16 + i) * 1.0;
          // windup: the last few frames the stack shoves as his arm makes contact
          const ant = over(lf, launch - 5, 5, Easing.inOut(Easing.cubic));
          return <S2_BadPlate key={`sw${i}`} x={p.restX - ant * 6} y={restY - ant * 3} rot={wob + (i - 1) * 4 - ant * 6} sc={0.82} op={appear} cracked={false} />;
        }
        const t = over(lf, launch, 24, Easing.out(Easing.cubic));
        const x = interpolate(t, [0, 1], [p.restX, p.landX]);
        const y = interpolate(t, [0, 1], [restY, landY]) - Math.sin(t * Math.PI) * p.arc;
        const rot = p.rot * t + (i - 1) * 4;
        return <S2_BadPlate key={`sw${i}`} x={x} y={y} rot={rot} sc={0.82 + t * 0.06} op={1} cracked={t > 0.55} />;
      })}
      {/* clatter dust puffs as each swept plate hits the floor */}
      {S2_SWEPT.map((p, i) => {
        const imp = S2_SWEEP + p.dl + 24;
        if (lf < imp || lf > imp + 15) return null;
        const t = (lf - imp) / 15;
        const w = 24 + t * 66;
        const op = (1 - t) * 0.42;
        return <div key={`cl${i}`} style={{ position: "absolute", left: p.landX - w / 2, top: 706 + i * 6 - w * 0.32, width: w, height: w * 0.62, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(210,196,170,0.7), rgba(210,196,170,0) 70%)", opacity: op, filter: "blur(3px)", zIndex: 19 }} />;
      })}
      {/* the sweep WHOOSH — a curved motion streak from his hand across the table */}
      {lf >= S2_SWEEP && lf < S2_SWEEP + 13 && (() => {
        const t = (lf - S2_SWEEP) / 13;
        const op = (1 - t) * 0.5;
        return (
          <svg width={320} height={120} viewBox="0 0 320 120" style={{ position: "absolute", left: 380, top: 500, overflow: "visible", zIndex: 19 }}>
            <path d="M8 96 Q140 8 300 44" stroke={`rgba(255,244,224,${op})`} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M12 108 Q150 26 296 58" stroke={`rgba(255,224,180,${op * 0.6})`} strokeWidth={3} fill="none" strokeLinecap="round" />
          </svg>
        );
      })()}

      {/* ===================== RAMSAY (storms, tastes, gags, sweeps, flings) ===================== */}
      <div style={{ position: "absolute", left: S2_chefLeft, top: S2_chefTop, width: S2_CHSIZE, height: S2_CHSIZE, zIndex: 22 }}>
        {/* soft warm key light so the clay reads in the gloom */}
        <div style={{ position: "absolute", left: "50%", top: "56%", width: 320, height: 320, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,186,90,0.18), rgba(255,186,90,0) 70%)", filter: "blur(6px)" }} />
        <div style={{ transformOrigin: "50% 22%", transform: `rotate(${S2_headShake + S2_stormTilt + S2_lungeTilt + S2_tasteTilt + S2_tasteBrowJit}deg)` }}>
          <RamsayChef lf={lf} size={S2_CHSIZE} pose={S2_pose} tint={CLAY} yell={S2_yell} gaze={1} brow={1} toque={0} nod={1} />
        </div>
      </div>

      {/* ANGER-STEAM fuming off his head — he seethes continuously through every hold */}
      {((lf >= 54 && lf < 94) || (lf >= 158 && lf < 196) || (lf >= 214 && lf < 344)) && Array.from({ length: 5 }).map((_, k) => {
        const t = ((lf * 0.9 + k * 13) % 40) / 40;
        const hx = S2_chefLeft + S2_CHSIZE / 2 + 8 + Math.sin(lf / 6 + k * 1.7) * (10 + t * 22);
        const hy = S2_chefTop + 42 - t * 74;
        const sz = 10 + t * 22;
        const op = (1 - t) * 0.3;
        if (op <= 0.02) return null;
        return <div key={`fm${k}`} style={{ position: "absolute", left: hx, top: hy, width: sz, height: sz, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,150,90,0.55), rgba(255,120,60,0) 70%)", opacity: op, filter: "blur(3px)", zIndex: 23 }} />;
      })}

      {/* foot-DUST puffs kicked up as he stomps in */}
      {S2_STOMPS.map((sf, i) => {
        if (lf < sf || lf > sf + 16) return null;
        const t = (lf - sf) / 16;
        const px = S2_CHX + S2_bodyX(sf) + (i % 2 ? 34 : -22);
        const w = 30 + t * 74;
        const op = (1 - t) * 0.4;
        return <div key={`st${i}`} style={{ position: "absolute", left: px - w / 2, top: S2_FEET + 4 - w * 0.28, width: w, height: w * 0.55, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(206,188,158,0.7), rgba(206,188,158,0) 70%)", opacity: op, filter: "blur(3px)", zIndex: 21 }} />;
      })}

      {/* impatient FOOT-STOMP dust while he's planted & seething (survey + verdict holds) */}
      {S2_HOLDSTOMPS.map((sf, i) => {
        if (lf < sf || lf > sf + 16) return null;
        const t = (lf - sf) / 16;
        const px = S2_CHX + S2_seetheSway + (i % 2 ? 30 : -20);
        const w = 26 + t * 66;
        const op = (1 - t) * 0.4;
        return <div key={`hs${i}`} style={{ position: "absolute", left: px - w / 2, top: S2_FEET + 4 - w * 0.28, width: w, height: w * 0.55, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(206,188,158,0.68), rgba(206,188,158,0) 70%)", opacity: op, filter: "blur(3px)", zIndex: 21 }} />;
      })}

      {/* a bead of sweat rolling on the rage beat */}
      {S2_sweatT > 0.02 && S2_sweatT < 0.98 && (
        <div style={{ position: "absolute", left: S2_sweatX, top: S2_sweatY, width: 7, height: 10, transform: "translate(-50%,-50%)", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "radial-gradient(circle at 38% 30%, #FFFFFF, #BFE0F0 55%, #7FB6D8)", boxShadow: "0 1px 3px rgba(0,0,0,0.35)", opacity: Math.min(1, (1 - S2_sweatT) * 3), zIndex: 25 }} />
      )}

      {/* the tasting spoon rising to his mouth (trembling wrist) */}
      {S2_spoonT > 0.02 && (
        <svg width={90} height={120} viewBox="0 0 90 120" style={{ position: "absolute", left: S2_mouthX - 12 + S2_spoonWob, top: S2_mouthY + 40 - S2_spoonT * 44, overflow: "visible", zIndex: 24, transform: `rotate(${-28 + S2_spoonT * 10 + S2_spoonWob * 0.8}deg)`, transformOrigin: "20px 110px" }}>
          <line x1={20} y1={110} x2={30} y2={34} stroke="#C9CDD3" strokeWidth={7} strokeLinecap="round" />
          <line x1={20} y1={110} x2={30} y2={34} stroke="#EDEFF2" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={33} cy={26} rx={16} ry={12} fill="#D3D7DC" stroke="#A7ADB5" strokeWidth={2.5} />
          <ellipse cx={33} cy={24} rx={11} ry={8} fill="#B98A50" />
        </svg>
      )}

      {/* the gag reaction — flecks spat off the spoon */}
      {lf >= S2_SPIT && S2_spitEnv > 0.04 && S2_SPITP.map((p, i) => {
        const t = over(lf, S2_SPIT, 22, Easing.out(Easing.cubic));
        const d = t * p.sp;
        const x = S2_mouthX + 10 + Math.cos(p.a) * d;
        const y = S2_mouthY + 6 + Math.sin(p.a) * d * 0.8 + t * t * 70;
        const op = (1 - t) * 0.85;
        if (op <= 0.04) return null;
        return <div key={`sp${i}`} style={{ position: "absolute", left: x, top: y, width: p.s, height: p.s, borderRadius: "50%", background: i % 3 ? "#B57A3E" : "#8A5A2E", opacity: op, zIndex: 26 }} />;
      })}

      {/* BROKEN stamp — slaps on the dish, then rides it up as he lifts the ruin */}
      {lf >= S2_BROKEN && S2_brokenOp > 0.02 && (
        <div style={{ position: "absolute", left: S2_dishX, top: S2_dishY - 120, transform: `translate(-50%,-50%) rotate(-9deg) scale(${Math.min(1.12, S2_brokenPop)})`, opacity: S2_brokenOp, zIndex: 43 }}>
          <div style={{ border: `6px solid ${RED}`, color: RED, background: "rgba(255,245,240,0.94)", fontFamily: S2_FONT, fontWeight: 900, fontSize: 46, letterSpacing: "0.04em", padding: "8px 26px", borderRadius: 12, boxShadow: "0 18px 32px -14px rgba(0,0,0,0.6)" }}>BROKEN</div>
        </div>
      )}
      {lf >= S2_BROKEN && lf < S2_BROKEN + 12 && <Sparkles lf={lf} at={S2_BROKEN / 30} x={S2_DISHX} y={452} n={9} spread={200} colors={[RED, GOLD, "#F6C6B8"]} dur={1.1} />}

      {/* ===================== THE BIN + FLUNG IDEA PLATES (one after another) ===================== */}
      <S2_Bin x={S2_BINX} y={S2_BINY} jolt={S2_binJolt} />

      {S2_KILLS.map((k, i) => {
        if (lf < k.launch) {
          // the three reject plates appear as a lineup after the verdict, then get binned one by one
          const appear = ramp(lf, 232, 258);
          if (appear <= 0.01) return null;
          const wob = Math.sin(lf / 12 + i) * 1.4;
          // windup: the last 8 frames it lifts + pulls back before the throw
          const ant = over(lf, k.launch - 8, 8, Easing.inOut(Easing.cubic));
          const antX = -ant * 7 * k.dir;
          const antY = -ant * 12;
          const antR = -ant * 10 * k.dir;
          return <S2_IdeaPlate key={`ki${i}`} x={k.restX + antX} y={k.restY + antY} rot={wob + (i === 1 ? -5 : 4) + antR} sc={0.9 + ant * 0.04} op={appear} />;
        }
        const t = over(lf, k.launch, S2_FLINGDUR, Easing.inOut(Easing.cubic));
        const x = interpolate(t, [0, 1], [k.restX, S2_BINX]);
        const y = interpolate(t, [0, 1], [k.restY, S2_BINY - 6]) - Math.sin(t * Math.PI) * k.arc;
        const rot = t * 520 * k.dir + (i === 1 ? -5 : 4);
        const op = t > 0.9 ? interpolate(t, [0.9, 1], [1, 0]) : 1;
        return <S2_IdeaPlate key={`ki${i}`} x={x} y={y} rot={rot} sc={0.9 - t * 0.34} op={op} />;
      })}
      {/* impact puff when a plate hits the bin */}
      {[S2_KILL1 + S2_FLINGDUR, S2_KILL2 + S2_FLINGDUR, S2_KILL3 + S2_FLINGDUR].map((imp, i) => (
        lf >= imp && lf < imp + 12 ? <Sparkles key={`bi${i}`} lf={lf} at={imp / 30} x={S2_BINX} y={S2_BINY - 10} n={8} spread={120} colors={["#8A6E4E", RED, "#5A4A38"]} dur={0.7} /> : null
      ))}

      {/* ===================== SPEECH BUBBLES (Ramsay, rage) ===================== */}
      {/* "IT'S RAW." on the gag/recoil — above his head, tail pointing down to him */}
      <SpeechBubble lf={lf} at={S2_SPIT / 30} dur={1.5} x={392} y={300} text="IT'S RAW." tail="down" tone="rage" size={30} />
      {/* "BIN IT." as he flings the first plate — above him, aimed down */}
      <SpeechBubble lf={lf} at={S2_KILL1 / 30} dur={1.4} x={430} y={296} text="BIN IT." tail="down" tone="rage" size={30} />

      {/* set atmosphere — warm, faded */}
      <Vignette strength={0.62} shape="rect" />
      <Grain op={0.06} />
    </div>
  );
};

// ===== S3 =====
// ===== S3 =====
// ===== S3 =====
// ===== S3 =====
// ===== S3 =====
// ============================== S3 — THE TRICK: SPIN UP A 2ND CLAUDE (305f / 10.17s) ==============================
// SET: a WARM, BUSY GORDON-RAMSAY PRO KITCHEN cook-off — two lit prep stations on a stainless pass washed in amber
// HEAT-LAMP light, a ceiling rail of hanging COPPER POTS + utensils, a fluttering SERVICE-TICKET rail, a back
// shelf stacked with white plates + squeeze bottles + spice jars, warm wood panelling, raking warm GOD-RAYS, and a
// dim BUSY back line of cooks plating (+ a passing waiter) in drifting steam & warm bokeh. ONE CONTINUOUS CALM SHOT.
// LEFT = the MAKER (plain clay <Mascot/>) BUSY the whole time: flipping a PanToss, CHOPPING on a board, SPRINKLING
// garnish over the dish, bobbing to its own rhythm. RIGHT = the 2ND CLAUDE critic (<RamsayChef/>) that SLIDES in on
// "second Claude", then ACTIVELY HUNTS — sweeping a big MAGNIFIER back and forth, leaning in on each find, shaking
// its head — while red "found it" faults keep PINGING in one after another. Two speech bubbles: maker "looks great!"
// (praise) + critic "FIND THE FAULTS." (rage). No flashing, no camera kick, zero cuts.
// SIGNATURE MOMENT (added): as the lens sweeps the "looks great!" dish, a HIDDEN DISASTER bursts up UNDER THE GLASS —
// a snarling red MONSTER-of-faults with a spinning alarm halo, flinging RAW / COLD / OVERSALTED / BURNT fault chips
// out past the rim — landing on the VO "find what's WRONG"; and the 2nd Claude PLANTS IN WITH A BANG (impact ring +
// dust + floor cracks + amber sparks) as it arrives. Both stay smooth (anticipation -> pop -> settle), no cuts/flash.
// LULL FILLS: a rattling-lid COPPER BOIL POT bursts steam on the RIGHT station the whole time (kills the 0-128 empty
// right side); FLAME-FLARE whooshes lick up off BOTH cooktops on offset cycles (keeps both sides alive through the
// maker's deflation + the verdict tail); and each fault ping flicks a little SPARK BURST off the ✗ mark.

// ---- literal font strings (do NOT rely on fraunces/mono being in scope) ----
const S3_SERIF = "'Fraunces', 'Playfair Display', Georgia, serif";
const S3_MONO = "'DM Mono', 'Roboto Mono', ui-monospace, 'SFMono-Regular', monospace";

// ---- WARM pro-kitchen palette (local, hard-coded so the scene is self-sufficient) ----
const S3_WOOD = "#3A2313", S3_WOODD = "#20130A", S3_WOODHI = "#5C3B22";
const S3_AMBER = "#F0A94B", S3_AMBERD = "#B8721E", S3_AMBERHI = "#FFD98A", S3_HEAT = "#FF8A2A";
const S3_COPPER = "#C9773D", S3_COPPERD = "#7E4420", S3_COPPERHI = "#EAA766";
const S3_STEEL = "#B7BEC7", S3_STEELD = "#6E7885", S3_STEELHI = "#E4E9EF", S3_STEELDK = "#3B434E";
const S3_BRASS = "#E8B54A", S3_BRASSD = "#B07E1E";
const S3_BLUE = "#3FA7E0";
const S3_FLAME = "#FF8A2A", S3_FLAMEY = "#FFC23D", S3_FCORE = "#FFE59A";
const S3_RED = "#E23B2E", S3_GLASS = "#F4E9CF";

// ---- key positions / timing (LOCKED to VO + captions) ----
const S3_MAKX = 214, S3_MAKFEET = 648, S3_MAKSIZE = 196;      // maker (left station)
const S3_CRITX = 786, S3_CRITFEET = 662, S3_CRITSIZE = 244;    // critic (right station)
const S3_DISHX = 360, S3_DISHY = 604;                          // the dish being judged
const S3_ARRIVE = 146, S3_SWEEP0 = 158, S3_SWEEP_END = 288;   // 2nd-Claude lands; sweep window
const S3_RF = [170, 188, 206, 224, 244, 262, 280];             // frames the lens "finds" a flaw (they keep pinging in)

// ---- EASED lens sweep: a pure fn of frame, so marks land exactly under the glass (lens + marks share it) ----
const S3_sweepT = (f: number) => {
  const p = Math.min(1, Math.max(0, (f - S3_SWEEP0) / (S3_SWEEP_END - S3_SWEEP0)));
  return Easing.inOut(Easing.cubic)(p);                        // slow start, glide, slow settle
};
// busier back-and-forth hunt (more passes) — marks still land exactly under the glass because they share this fn
const S3_lensX = (f: number) => S3_DISHX + 128 * Math.sin(S3_sweepT(f) * Math.PI * 4.3);
const S3_lensY = (f: number) => 566 + 20 * Math.sin(S3_sweepT(f) * Math.PI * 6.7);

// ---- SIGNATURE MOMENT: hidden-disaster reveal under the glass + the 2nd Claude planting with a BANG ----
const S3_REVEAL = 200;            // frame the hidden DISASTER bursts up inside the lens (VO "find what's WRONG")
const S3_BANG = 149;              // frame the 2nd Claude PLANTS in with a bang (VO "second Claude")
const S3_FLT = ["RAW", "COLD", "OVERSALTED", "BURNT"];     // faults that fling out of the glass on the reveal
const S3_FLT_ANG = [-158, -112, -66, -20];                 // fling angles (deg, upper arc over the lens)

// ---- deterministic ambient warm-bokeh scatter over the kitchen ----
const S3_MOTES = Array.from({ length: 18 }, (_, i) => ({ x: 60 + seed(i * 3.1) * 900, ph: seed(i) * 6.28, sp: 0.4 + seed(i * 2.2) * 0.7, w: 2 + seed(i * 1.7) * 2.6 }));
const S3_BOKEH = Array.from({ length: 10 }, (_, i) => ({ x: 40 + seed(i * 5.3) * 940, y: 70 + seed(i * 2.7) * 340, r: 14 + seed(i * 1.9) * 30, ph: seed(i * 4.1) * 6.28 }));

// ---- amber HEAT LAMP over the pass (brass housing + shimmering bulb + downward glow pool) ----
const S3_HeatLamp: React.FC<{ x: number; w: number; lf: number; ph: number }> = ({ x, w, lf, ph }) => {
  const sh = 0.82 + 0.18 * Math.sin(lf / 6 + ph) + 0.05 * Math.sin(lf / 2.3 + ph);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: 150, width: w, height: 40, zIndex: 6 }}>
      {/* twin hanging wires */}
      <div style={{ position: "absolute", left: 14, top: -150, width: 2, height: 150, background: "rgba(20,12,6,0.7)" }} />
      <div style={{ position: "absolute", left: w - 16, top: -150, width: 2, height: 150, background: "rgba(20,12,6,0.7)" }} />
      {/* brass housing */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 16, borderRadius: 8, background: `linear-gradient(180deg,${S3_BRASS},${S3_BRASSD})`, boxShadow: "0 5px 9px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,240,200,0.5)" }} />
      {/* glowing bulb strip */}
      <div style={{ position: "absolute", left: 7, top: 11, width: w - 14, height: 11, borderRadius: 6, background: `linear-gradient(180deg, rgba(255,220,150,${sh}), rgba(255,138,42,${0.75 * sh}))`, filter: "blur(0.6px)", boxShadow: `0 0 18px rgba(255,150,60,${0.7 * sh})` }} />
      {/* downward warm glow pool */}
      <div style={{ position: "absolute", left: w / 2 - w * 0.62, top: 16, width: w * 1.24, height: 440, background: `radial-gradient(ellipse at 50% 0%, rgba(255,160,64,${0.20 * sh}), transparent 68%)`, filter: "blur(6px)" }} />
    </div>
  );
};

// ---- a lit cooking station podium (warm stainless, amber-lit) ----
const S3_Station: React.FC<{ x: number; w: number; lf: number; ph: number }> = ({ x, w, lf, ph }) => {
  const fl = 1 + 0.22 * Math.sin(lf / 3 + ph) + 0.06 * Math.sin(lf / 1.7 + ph * 2);   // richer flicker
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: 616, width: w, height: 176, zIndex: 10 }}>
      {/* counter body (warm-lit steel) */}
      <div style={{ position: "absolute", left: 0, top: 24, width: w, height: 152, borderRadius: "10px 10px 4px 4px", background: `linear-gradient(180deg,${S3_STEELHI} 0%,${S3_STEEL} 30%,${S3_STEELD} 62%,#2A2118 100%)`, boxShadow: "inset 0 3px 0 rgba(255,240,210,0.55), 0 14px 26px -12px rgba(0,0,0,0.6)" }} />
      {/* warm amber sheen across the steel */}
      <div style={{ position: "absolute", left: 0, top: 30, width: w, height: 70, borderRadius: 8, background: "linear-gradient(180deg, rgba(255,170,80,0.18), transparent 80%)" }} />
      {/* stainless lip */}
      <div style={{ position: "absolute", left: 0, top: 16, width: w, height: 14, borderRadius: 7, background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEEL})` }} />
      {/* cooktop ring + flame */}
      <div style={{ position: "absolute", left: w / 2 - 34, top: 26, width: 68, height: 18, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%,${S3_STEELDK},#14100A)` }} />
      <div style={{ position: "absolute", left: w / 2 - 40, top: 4, width: 80, height: 44, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,140,50,${0.5 * fl}), transparent 70%)`, filter: "blur(3px)" }} />
      <svg viewBox="0 0 60 90" width={46} height={70} style={{ position: "absolute", left: w / 2 - 23, top: 22 - 42 * fl, overflow: "visible" }}>
        <g transform={`translate(0 ${90 - 90 * fl}) scale(1 ${fl})`}>
          <path d="M30 90 C6 62 16 34 30 2 C44 34 54 62 30 90 Z" fill={S3_FLAME} />
          <path d="M30 90 C14 66 22 42 30 16 C38 42 46 66 30 90 Z" fill={S3_FLAMEY} />
          <path d="M30 90 C22 72 26 54 30 34 C34 54 38 72 30 90 Z" fill={S3_FCORE} />
        </g>
      </svg>
      {/* front number plate (brass) */}
      <div style={{ position: "absolute", left: w / 2 - 22, top: 96, width: 44, height: 40, borderRadius: 8, background: "rgba(40,22,10,0.7)", border: `2px solid ${S3_BRASS}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S3_MONO, fontWeight: 900, fontSize: 22, color: S3_BRASS }}>{ph < 0.5 ? "01" : "02"}</div>
    </div>
  );
};

// ---- rising steam wisps ----
const S3_Steam: React.FC<{ x: number; base: number; lf: number }> = ({ x, base, lf }) => (
  <>{[0, 1, 2].map((k) => {
    const t = (lf / 46 + k / 3) % 1;
    return <div key={k} style={{ position: "absolute", left: x + Math.sin(t * 6 + k) * 12 - 8, top: base - t * 96, width: 15 + t * 12, height: 15 + t * 12, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,220,0.9), transparent 68%)", opacity: (1 - t) * 0.5, filter: "blur(4px)", zIndex: 13 }} />;
  })}</>
);

// ---- FLAME-FLARE whoosh licking up off a cooktop (fills lulls with fire on an offset cycle) ----
const S3_Flare: React.FC<{ x: number; base: number; lf: number; ph: number; z?: number }> = ({ x, base, lf, ph, z = 11 }) => {
  const cyc = (((lf + ph) % 74) / 74);                          // ~2.5s flare cycle
  const up = Math.max(0, Math.sin(cyc * Math.PI));              // 0..1..0 whoosh (smooth, no flash)
  const flick = 0.9 + 0.1 * Math.sin(lf / 2.3 + ph);           // fine flicker on top
  const H = (44 + up * 100) * flick;
  const W = 44 + up * 26;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: base - H, width: W, height: H, zIndex: z, opacity: 0.45 + 0.55 * up, pointerEvents: "none", filter: "blur(0.3px)" }}>
      <div style={{ position: "absolute", left: -W * 0.35, top: H * 0.2, width: W * 1.7, height: H * 0.8, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 70%, rgba(255,150,60,${0.35 * (0.4 + up)}), transparent 70%)`, filter: "blur(5px)" }} />
      <svg viewBox="0 0 60 120" width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <path d="M30 120 C2 84 14 44 30 2 C46 44 58 84 30 120 Z" fill={S3_FLAME} opacity={0.92} />
        <path d="M30 120 C12 88 20 52 30 16 C40 52 48 88 30 120 Z" fill={S3_FLAMEY} />
        <path d="M30 120 C22 96 26 66 30 40 C34 66 38 96 30 120 Z" fill={S3_FCORE} />
      </svg>
      {/* sparks flicking off the peak of the flare */}
      {up > 0.6 && [0, 1, 2].map((k) => {
        const sy = (up - 0.6) * (34 + k * 14);
        return <div key={k} style={{ position: "absolute", left: W / 2 + (k - 1) * 11 + Math.sin(lf / 4 + k) * 3, top: -sy, width: 3, height: 3, borderRadius: "50%", background: S3_FLAMEY, opacity: (up - 0.6) * 2 }} />;
      })}
    </div>
  );
};

// ---- a bubbling COPPER BOIL POT with a rattling lid puffing steam (RIGHT station — alive from lf 0) ----
const S3_BoilPot: React.FC<{ x: number; base: number; lf: number }> = ({ x, base, lf }) => {
  const w = 98, h = 58;
  const jig = Math.sin(lf / 2.7) * 2.6 + Math.sin(lf / 1.6) * 1.1;      // lid rattle
  const lidLift = Math.max(0, Math.sin(lf / 2.7)) * 4;                  // lid pops as steam escapes
  const boil = 0.5 + 0.3 * Math.abs(Math.sin(lf / 4));                  // inner bubbling glow
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h + 40, zIndex: 12 }}>
      {/* steam bursts escaping the lid */}
      {[0, 1, 2, 3].map((k) => {
        const t = ((lf / 30) + k * 0.27) % 1;
        return <div key={"st" + k} style={{ position: "absolute", left: w / 2 - 10 + Math.sin(t * 6 + k) * 14, top: -8 - t * 74, width: 14 + t * 16, height: 14 + t * 16, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,220,0.85), transparent 66%)", opacity: (1 - t) * 0.5, filter: "blur(4px)" }} />;
      })}
      {/* pot body (copper) */}
      <div style={{ position: "absolute", left: 0, top: 14, width: w, height: h, borderRadius: "10px 10px 22px 22px", background: `linear-gradient(180deg,${S3_COPPERHI},${S3_COPPER} 50%,${S3_COPPERD})`, boxShadow: "inset 0 4px 0 rgba(255,225,190,0.55), 0 10px 16px -8px rgba(0,0,0,0.5)" }} />
      {/* vertical sheen on the copper */}
      <div style={{ position: "absolute", left: 14, top: 20, width: 12, height: h - 12, borderRadius: 6, background: "rgba(255,235,205,0.4)", filter: "blur(1px)" }} />
      {/* handles */}
      <div style={{ position: "absolute", left: -8, top: 24, width: 12, height: 8, borderRadius: 6, border: `3px solid ${S3_COPPERD}` }} />
      <div style={{ position: "absolute", left: w - 4, top: 24, width: 12, height: 8, borderRadius: 6, border: `3px solid ${S3_COPPERD}` }} />
      {/* bubbling glow at the rim, visible as the lid lifts */}
      <div style={{ position: "absolute", left: 10, top: 8, width: w - 20, height: 12, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, rgba(255,170,70,${boil}), transparent 72%)`, filter: "blur(1px)" }} />
      {/* lid (rattles + lifts) */}
      <div style={{ position: "absolute", left: 4, top: 2 - lidLift, width: w - 8, height: 16, transform: `rotate(${jig * 0.4}deg)`, transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", left: 0, top: 2, width: "100%", height: 12, borderRadius: "50%", background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEEL} 60%,${S3_STEELD})`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.5)" }} />
        <div style={{ position: "absolute", left: "50%", top: -4, width: 8, height: 8, marginLeft: -4, borderRadius: "50%", background: `linear-gradient(180deg,${S3_BRASS},${S3_BRASSD})` }} />
      </div>
    </div>
  );
};

// ---- the maker's PanToss (anticipation dip, pan lift, richer food arc, oil droplets) ----
const S3_PanToss: React.FC<{ lf: number; size: number; ph?: number }> = ({ lf, size, ph = 0 }) => {
  const CYC = 54;
  const cyc = (((lf + ph) % CYC) / CYC);                 // ~1.8s toss cycle
  const s = Math.sin(cyc * Math.PI * 2);
  const rock = 13 * s - 4 * Math.sin(cyc * Math.PI * 4); // primary tilt + a little snap
  const lift = -Math.max(0, s) * 11;                     // pan lifts as it flicks the food up
  const cx = size * 0.5, panTop = size * 0.54;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: size, height: size }}>
      {/* tossed bits arcing over the pan (6, varied ingredients, spinning) */}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const kk = (cyc + k * 0.11) % 1;
        const u = Math.sin(kk * Math.PI);                // 0..1..0 arc height
        const drift = (k - 2.5) * 8 + Math.sin(kk * 6.28) * 4;
        const col = k % 3 === 0 ? "#7FB86B" : k % 3 === 1 ? "#D69A5A" : "#B8703A";
        const w = k % 3 === 0 ? 9 : 11;
        return <div key={k} style={{ position: "absolute", left: cx - 5 + drift, top: panTop - 8 - u * 82, width: w, height: 8, borderRadius: k % 3 === 0 ? "50% 50% 40% 40%" : "50%", background: col, transform: `rotate(${kk * 340 + k * 40}deg)`, boxShadow: "0 2px 3px rgba(0,0,0,0.3)", opacity: 0.4 + 0.6 * u }} />;
      })}
      {/* oil / sear sparkle droplets flicking off the pan at the top of the flip */}
      {[0, 1, 2].map((k) => {
        const kk = (cyc + 0.5 + k * 0.08) % 1;
        const u = Math.sin(kk * Math.PI);
        return u > 0.55 ? <div key={"oil" + k} style={{ position: "absolute", left: cx + (k - 1) * 16, top: panTop - 30 - u * 40, width: 3, height: 3, borderRadius: "50%", background: S3_FCORE, opacity: (u - 0.55) * 1.6, filter: "blur(0.4px)" }} /> : null;
      })}
      {/* pan (rocks + lifts) */}
      <div style={{ position: "absolute", left: 0, top: lift, width: size, height: size, transform: `rotate(${rock}deg)`, transformOrigin: "64% 58%" }}>
        <div style={{ position: "absolute", left: cx - 52, top: panTop, width: 104, height: 30, borderRadius: "0 0 52px 52px / 0 0 26px 26px", background: "linear-gradient(180deg,#3A2E20,#120C06)", boxShadow: "inset 0 4px 0 rgba(255,200,140,0.16)" }} />
        <div style={{ position: "absolute", left: cx - 52, top: panTop - 5, width: 104, height: 14, borderRadius: "50%", background: "linear-gradient(180deg,#5A4630,#241A10)" }} />
        {/* sizzling glow inside the pan */}
        <div style={{ position: "absolute", left: cx - 34, top: panTop - 2, width: 68, height: 12, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, rgba(255,150,60,${0.5 + 0.3 * Math.abs(s)}), transparent 72%)`, filter: "blur(1px)" }} />
        <div style={{ position: "absolute", left: cx + 46, top: panTop - 2, width: size * 0.4, height: 9, borderRadius: 5, background: "linear-gradient(90deg,#2A1D13,#5A4030)", transform: "rotate(-8deg)", transformOrigin: "left center" }} />
      </div>
    </div>
  );
};

// ---- the maker's CHOP: a cleaver strikes a board, veggie rounds get sliced, a piece slides off (smooth, rhythmic) ----
const S3_Chop: React.FC<{ x: number; y: number; lf: number; act: number }> = ({ x, y, lf, act }) => {
  const CY = 19;                                         // ~0.63s chop cycle
  const ph = ((lf % CY) / CY);                           // 0..1
  const knifeY = -30 * (0.5 + 0.5 * Math.cos(ph * Math.PI * 2)); // -30 (raised) .. 0 (strike at ph=0.5)
  const impact = Math.max(0, 1 - Math.abs(ph - 0.5) * 11);      // smooth spark peak at the strike
  const slideP = ph < 0.5 ? 0 : (ph - 0.5) / 0.5;              // a slice slides off after the strike
  return (
    <div style={{ position: "absolute", left: x - 60, top: y, width: 120, height: 64, zIndex: 15, opacity: act, transform: `translateY(${(1 - act) * 10}px)`, filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.4))" }}>
      {/* board */}
      <div style={{ position: "absolute", left: 0, top: 32, width: 120, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#C79A5E,#8A5E30)", boxShadow: "0 6px 10px -4px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,230,190,0.4)" }} />
      <div style={{ position: "absolute", left: 6, top: 36, width: 108, height: 3, borderRadius: 2, background: "rgba(90,60,30,0.5)" }} />
      {/* veggie rounds waiting on the board */}
      {[16, 34, 52].map((vx, k) => <div key={k} style={{ position: "absolute", left: vx, top: 28, width: 15, height: 11, borderRadius: "50%", background: k === 1 ? "#E4783A" : "#7FB86B", boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.22), inset 0 2px 0 rgba(255,255,255,0.3)" }} />)}
      {/* freshly-sliced piece sliding off to the right */}
      <div style={{ position: "absolute", left: 72 + slideP * 30, top: 29 - slideP * 3, width: 13, height: 10, borderRadius: "50%", background: "#7FB86B", opacity: slideP < 0.86 ? 1 : (1 - (slideP - 0.86) * 7), transform: `rotate(${slideP * 44}deg)`, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2)" }} />
      {/* cleaver (rises + strikes) */}
      <div style={{ position: "absolute", left: 44, top: knifeY, width: 42, height: 36 }}>
        <div style={{ position: "absolute", left: 0, top: 6, width: 34, height: 22, borderRadius: "3px 3px 6px 3px", background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEEL} 58%,${S3_STEELD})`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.6)" }} />
        <div style={{ position: "absolute", left: 1, top: 26, width: 32, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.85)" }} />
        <div style={{ position: "absolute", left: 30, top: 0, width: 11, height: 17, borderRadius: 4, background: "linear-gradient(180deg,#4A2F18,#2A1A0E)" }} />
      </div>
      {/* chop-strike spark on the board (smooth peak, not a blink) */}
      <div style={{ position: "absolute", left: 34, top: 26, width: 30, height: 9, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,240,200,0.85), transparent 70%)", filter: "blur(1px)", opacity: impact * 0.9 }} />
    </div>
  );
};

// ---- the maker happily SPRINKLES garnish over the dish (continuous falling flecks) ----
const S3_Sprinkle: React.FC<{ lf: number; act: number }> = ({ lf, act }) => {
  if (act < 0.02) return null;
  return (
    <div style={{ position: "absolute", left: S3_DISHX - 62, top: 512, width: 124, height: 104, zIndex: 20, opacity: act, pointerEvents: "none" }}>
      {Array.from({ length: 11 }).map((_, i) => {
        const t = ((lf / 32) + seed(i * 2.3)) % 1;
        const fx = 16 + seed(i * 1.7) * 90 + Math.sin(t * 6 + i) * 6;
        const fy = t * 96;
        return <div key={i} style={{ position: "absolute", left: fx, top: fy, width: 5, height: 5, borderRadius: i % 2 ? "50%" : "40% 40% 50% 50%", background: i % 3 === 0 ? "#E7B24C" : "#7FB86B", opacity: (1 - t) * 0.85, transform: `rotate(${t * 200 + i * 30}deg)` }} />;
      })}
    </div>
  );
};

// ---- dim background line-cook (depth + life; the arm nods as if plating) ----
const S3_BgCook: React.FC<{ x: number; fy: number; s: number; tint: string; lf: number; ph: number }> = ({ x, fy, s, tint, lf, ph }) => {
  const fl = 1 + 0.25 * Math.sin(lf / 3 + ph);
  const plate = Math.sin(lf / 18 + ph) * 5;                     // little plating motion
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: 3 }}>
      {/* dim warm counter */}
      <div style={{ position: "absolute", left: x - 46, top: fy - 8, width: 92, height: 40, borderRadius: 6, background: "linear-gradient(180deg,#4A3320,#1E1208)", opacity: 0.75 }} />
      {/* a plate they're working on */}
      <div style={{ position: "absolute", left: x - 16, top: fy - 6, width: 32, height: 10, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 30%,#EFE7D8,#B7AE9C)", opacity: 0.6 }} />
      {/* tiny flame */}
      <div style={{ position: "absolute", left: x - 9, top: fy - 20 * fl, width: 18, height: 24 * fl, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "linear-gradient(180deg,#FFC23D,#FF7A1A)", opacity: 0.8, filter: "blur(0.4px)" }} />
      {/* cook (gentle side-sway + plating dip for hand-animated life) */}
      <div style={{ position: "absolute", left: x - s / 2, top: fy - s - 6, width: s, height: s, opacity: 0.52, filter: "brightness(0.62) sepia(0.25)", transform: `translateY(${bob(lf, 4, 66, ph) + Math.abs(plate) * 0.4}px) rotate(${Math.sin(lf / 40 + ph) * 2}deg)`, transformOrigin: "50% 100%" }}>
        <Mascot lf={lf} size={s} tint={tint} />
      </div>
      {/* steam */}
      {[0, 1].map((k) => { const t = ((lf / 50) + k / 2) % 1; return <div key={k} style={{ position: "absolute", left: x - 6 + Math.sin(t * 6 + k) * 8, top: fy - 26 - t * 70, width: 10 + t * 8, height: 10 + t * 8, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,214,0.7), transparent 68%)", opacity: (1 - t) * 0.34, filter: "blur(3px)" }} />; })}
    </div>
  );
};

// ---- a dim WAITER drifting across the very back (life + parallax) ----
const S3_Waiter: React.FC<{ lf: number }> = ({ lf }) => {
  const p = (lf % 305) / 305;
  const x = -70 + p * 1160;                          // glides left -> right across the back
  const fy = 486 + Math.sin(lf / 22) * 3;
  const s = 58;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: fy - s, width: s, height: s, zIndex: 3, opacity: 0.42, filter: "brightness(0.6) sepia(0.2)" }}>
      {/* a tray of plates held aloft */}
      <div style={{ position: "absolute", left: -2, top: -14, width: 44, height: 12, borderRadius: 4, background: "linear-gradient(180deg,#EFE7D8,#9E9584)", transform: `translateY(${bob(lf, 2, 40, 0)}px)`, boxShadow: "0 3px 5px rgba(0,0,0,0.4)" }} />
      <div style={{ position: "absolute", left: -2, top: -18, width: 44, height: 8, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, rgba(255,240,214,0.55), transparent 70%)", filter: "blur(2px)" }} />
      <Mascot lf={lf} size={s} tint="#8A7A64" />
    </div>
  );
};

// ---- SIGNATURE PROP: the hidden DISASTER — a snarling red MONSTER-of-faults revealed UNDER THE GLASS ----
// Renders as an <svg> <g> so it lives INSIDE the magnifier's own viewBox (0..184), clipped to the lens circle,
// which means it stays pinned under the glass and sweeps WITH the lens. mp = pop scale, sk = scare-shake deg.
const S3_Monster: React.FC<{ mp: number; sk: number; lf: number }> = ({ mp, sk, lf }) => {
  const breathe = 1 + 0.03 * Math.sin(lf / 4);
  const pupY = 92 + Math.sin(lf / 7) * 1.5;                    // eyes dart
  return (
    <g transform={`translate(92 96) rotate(${sk}) scale(${mp * breathe}) translate(-92 -96)`}>
      {/* spinning red danger rays behind the head */}
      <g transform={`rotate(${lf * 3} 92 96)`} opacity={0.5}>
        {Array.from({ length: 12 }).map((_, k) => (
          <path key={k} d="M92 96 L86 8 L98 8 Z" transform={`rotate(${k * 30} 92 96)`} fill="#8E120B" opacity={0.55} />
        ))}
      </g>
      {/* pulsing alarm glow */}
      <circle cx={92} cy={96} r={54 + 6 * Math.sin(lf / 3.5)} fill="#E23B2E" opacity={0.22} />
      {/* goopy red monster head */}
      <path d="M92 40 C133 38 158 66 153 100 C150 128 128 152 92 152 C56 152 34 128 31 100 C26 66 51 38 92 40 Z" fill="#D8281C" stroke="#7E0E08" strokeWidth={4} />
      <path d="M92 40 C120 40 142 58 146 84 C120 74 66 74 40 86 C46 58 66 40 92 40 Z" fill="#F0473A" opacity={0.7} />
      {/* goo drips off the chin */}
      {[54, 92, 130].map((dx, k) => <path key={k} d={`M${dx - 5} 146 q5 ${12 + k * 4} 5 ${20 + k * 4} q0 -${6} 5 -${20 + k * 4} Z`} fill="#B8160E" opacity={0.9} />)}
      {/* furious V-brows */}
      <path d="M44 74 L86 90 L82 79 L48 65 Z" fill="#5E0A06" />
      <path d="M140 74 L98 90 L102 79 L136 65 Z" fill="#5E0A06" />
      {/* glaring eyes */}
      <ellipse cx={68} cy={92} rx={16} ry={13} fill="#FFF3E9" />
      <ellipse cx={116} cy={92} rx={16} ry={13} fill="#FFF3E9" />
      <circle cx={72} cy={pupY} r={6.5} fill="#1A0602" />
      <circle cx={112} cy={pupY} r={6.5} fill="#1A0602" />
      <circle cx={70} cy={pupY - 2} r={2} fill="#fff" />
      <circle cx={110} cy={pupY - 2} r={2} fill="#fff" />
      {/* bloodshot glare ticks */}
      <path d="M56 90 l7 3 M80 90 l-7 3 M104 90 l7 3 M128 90 l-7 3" stroke="#E23B2E" strokeWidth={1.5} />
      {/* gaping snarl mouth */}
      <path d="M54 116 Q92 108 130 116 Q120 148 92 148 Q64 148 54 116 Z" fill="#2A0503" stroke="#7E0E08" strokeWidth={3} />
      {/* top jagged teeth */}
      <path d="M58 117 l8 12 l8 -11 l8 12 l8 -11 l8 12 l8 -11 l8 11 l6 -10 L130 116 Z" fill="#FDF3E6" />
      {/* bottom jagged teeth */}
      <path d="M64 146 l6 -12 l8 11 l8 -11 l8 11 l8 -11 l8 11 l6 -10 l4 12 Z" fill="#F3E4D2" opacity={0.9} />
      {/* tongue */}
      <ellipse cx={92} cy={140} rx={12} ry={7} fill="#C0231A" />
    </g>
  );
};

// ---- SIGNATURE PROP: a red fault chip that FLINGS out past the lens rim on the reveal ----
const S3_FaultChip: React.FC<{ text: string; fling: number; ang: number; k: number; lf: number }> = ({ text, fling, ang, k, lf }) => {
  const a = (ang * Math.PI) / 180;
  const dist = 100 + fling * 52;                              // from just outside the rim, flung further
  const cx = Math.cos(a) * dist, cy = Math.sin(a) * dist;
  const wob = (k % 2 ? 1 : -1) * (6 + Math.sin(lf / 6 + k) * 3);
  return (
    <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) scale(${fling}) rotate(${wob}deg)`, opacity: Math.min(1, fling * 1.4), zIndex: 2 }}>
      <div style={{ background: S3_RED, color: "#fff", fontFamily: S3_MONO, fontWeight: 900, fontSize: 15, letterSpacing: "0.03em", padding: "5px 11px", borderRadius: 9, border: "2px solid #fff", boxShadow: "0 8px 14px -6px rgba(0,0,0,0.6)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 14 }}>✗</span>{text}
      </div>
    </div>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------- camera: ONE slow, calm push-in. No shake, no kick, no cut. ----------
  const push = 1 + over(lf, 0, 200, Easing.out(Easing.cubic)) * 0.04;   // 1.00 -> ~1.04

  // ---------- 2nd Claude SLIDES in from the right on "second Claude" ----------
  const critEnter = Math.min(1, spr(lf, 132, 13, 190));         // settles ~146 (gentle overshoot = follow-through)
  const critSlideX = (1 - critEnter) * 300;                     // starts off-screen right, glides to station
  const critOp = ramp(lf, 132, 148);

  // ---------- magnifier sweep (eased path shared with the marks) ----------
  const glassOp = ramp(lf, 152, 162) * (1 - ramp(lf, 292, 300));
  const lensCX = lf < S3_SWEEP0 ? S3_lensX(S3_SWEEP0) : S3_lensX(lf);
  const lensCY = lf < S3_SWEEP0 ? S3_lensY(S3_SWEEP0) : S3_lensY(lf);
  const lensR = 92;
  // brass rod from the lens rim back to the critic's hand (so it reads as held & swept)
  const S3_HX = 706, S3_HY = 500;
  const rdx = S3_HX - lensCX, rdy = S3_HY - lensCY, rdl = Math.hypot(rdx, rdy) || 1;
  const rimX = lensCX + (rdx / rdl) * lensR, rimY = lensCY + (rdy / rdl) * lensR;
  // travelling specular glint that slides around the glass (secondary motion / delight)
  const glintA = lf * 0.09;
  const glintX = 92 + 52 * Math.cos(glintA), glintY = 92 + 52 * Math.sin(glintA);

  // ---------- SIGNATURE: the hidden DISASTER bursts up UNDER THE GLASS (VO "find what's WRONG") ----------
  const revealOp = ramp(lf, S3_REVEAL, S3_REVEAL + 7) * (1 - ramp(lf, 286, 296));
  // punchy pop (overshoot -> settle) — Easing.back, NOT spr (spr stretches over 200 frames)
  const revealPop = interpolate(lf, [S3_REVEAL, S3_REVEAL + 8, S3_REVEAL + 16], [0.15, 1.16, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2.2)) });
  const revealShake = Math.sin(lf * 1.9) * 4.2 * Math.max(0, 1 - (lf - (S3_REVEAL + 8)) / 34); // decaying scare-jitter
  const chipFling = interpolate(lf, [S3_REVEAL + 2, S3_REVEAL + 13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) });

  // ---------- SIGNATURE: the 2nd Claude PLANTS IN WITH A BANG (impact ring + dust + cracks) ----------
  const bangP = interpolate(lf, [S3_BANG, S3_BANG + 4, S3_BANG + 26], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bangRing = ramp(lf, S3_BANG, S3_BANG + 24);             // ground shock ring expands + fades (no flash)

  // ---------- maker performance (BUSY the whole time: flip + chop + sprinkle + body bob) ----------
  const makerWorry = ramp(lf, 236, 252);                        // once flaws pile up the maker deflates
  const tagStrike = ramp(lf, 230, 244);                         // self-rating gets crossed out
  // maker NEVER stops working — it keeps flipping/chopping/garnishing the whole time, just nervously once it worries
  const makerBusy = 0.55 + 0.45 * (1 - makerWorry);             // 1.0 confident -> 0.55 nervous (never 0 = no lull)
  const chopBob = makerBusy * Math.abs(Math.sin(lf / 10)) * 2.6;          // body keeps dipping to its own chop rhythm
  const makerShiver = makerWorry * Math.sin(lf * 1.35) * 1.7;             // a nervous shiver fills the deflation tail
  const makerSweatT = ramp(lf, 250, 305);                       // a bead of sweat trickles during the verdict tail
  // the maker FLINCHES when the disaster is unmasked under the glass
  const makerFlinch = Math.sin((lf - S3_REVEAL) * 1.5) * 3.2 * Math.max(0, 1 - Math.abs(lf - (S3_REVEAL + 6)) / 20);

  // ---------- critic performance (mirrored to face the dish at center-left) ----------
  let s3pose: string = "present";
  if (lf < S3_ARRIVE) s3pose = "rest";
  else if (lf >= 272) s3pose = "cross";                          // "so it doesn't" — arms folded, verdict
  const critYell = interpolate(lf, [270, 282, 296, 305], [0, 0.7, 0.7, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const critGaze = 2;                                            // mirrored -> eyes read toward the dish
  const critTremor = Math.sin(lf * 1.7) * 1.1 * (0.4 + 0.6 * critYell);
  // reactive head-tilt lean toward the dish while sweeping (settles when he crosses arms)
  const critLean = interpolate(lf, [S3_ARRIVE, S3_ARRIVE + 20, 268, 276], [0, 3, 3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // leans IN sharply each time a fault is found, then relaxes (hunting cause-and-effect)
  const lastFault = S3_RF.filter((r) => lf >= r).slice(-1)[0] ?? -99;
  const faultRecent = Math.max(0, 1 - (lf - lastFault) / 11);
  const critLeanPulse = faultRecent * 2.8;
  const critBob = faultRecent * 4 + (glassOp > 0.1 ? Math.abs(Math.sin(lf / 9)) * 1.5 : 0);   // inspect dip
  // a hard RECOIL as the monster is unmasked under the glass (adds punch to the reveal)
  const critRevealRecoil = interpolate(lf, [S3_REVEAL, S3_REVEAL + 6, S3_REVEAL + 22], [0, -6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  // shakes his head "no" over the verdict
  const shakeActive = ramp(lf, 266, 274) * (1 - ramp(lf, 298, 305));
  const headShake = Math.sin(lf * 0.72) * 3.4 * shakeActive;
  // a bead of sweat appears on the rage beat
  const sweatT = ramp(lf, 274, 300);

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `scale(${push})`, transformOrigin: "506px 430px" }}>

        {/* ===================== SET — WARM GORDON-RAMSAY KITCHEN, deep amber-brown ===================== */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#170D07 0%,#2B180C 30%,#3E2513 60%,#26140A 100%)", zIndex: 0 }} />

        {/* warm WOOD-PANEL back wall (vertical planks + grain + warm rail) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={"plank" + i} style={{ position: "absolute", left: i * 128, top: 0, width: 128, height: 476, background: `linear-gradient(90deg,${S3_WOODD},${S3_WOOD} 20%,#331D0F 52%,${S3_WOODHI} 84%,${S3_WOODD})`, boxShadow: "inset -3px 0 7px rgba(0,0,0,0.45), inset 3px 0 0 rgba(255,180,90,0.06)", zIndex: 1 }} />
        ))}
        {/* warm horizontal chair-rail + skirting glow on the wood */}
        <div style={{ position: "absolute", left: 0, top: 300, width: 1012, height: 6, background: `linear-gradient(180deg,${S3_WOODHI},${S3_WOODD})`, opacity: 0.6, zIndex: 1 }} />
        <div style={{ position: "absolute", left: 0, top: 430, width: 1012, height: 60, background: "linear-gradient(180deg, rgba(255,150,60,0.10), transparent)", zIndex: 1 }} />

        {/* soft warm rim washes (amber left, hotter orange-red on the critic side) */}
        <div style={{ position: "absolute", left: -120, top: 110, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,169,75,0.22), transparent 66%)", filter: "blur(8px)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -140, top: 80, width: 660, height: 660, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,110,50,0.22), transparent 66%)", filter: "blur(8px)", zIndex: 1 }} />
        {/* warm dining bokeh drifting deep in back */}
        {S3_BOKEH.map((b, i) => { const g = 0.5 + 0.5 * Math.sin(lf / 40 + b.ph); return <div key={"bk" + i} style={{ position: "absolute", left: b.x + Math.sin(lf / 60 + b.ph) * 6, top: b.y, width: b.r, height: b.r, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,190,110,${0.16 + 0.1 * g}), transparent 70%)`, filter: "blur(4px)", zIndex: 1 }} />; })}

        {/* warm GOD-RAY shafts raking down from the back-of-house pass windows (slow atmospheric breathe) */}
        {[0, 1, 2, 3].map((k) => {
          const gx = 150 + k * 230;
          const br = 0.5 + 0.5 * Math.sin(lf / 55 + k * 1.3);
          return <div key={"ray" + k} style={{ position: "absolute", left: gx, top: -40, width: 120, height: 520, transform: "skewX(-16deg)", transformOrigin: "50% 0%", background: `linear-gradient(180deg, rgba(255,196,120,${0.10 + 0.06 * br}), transparent 74%)`, filter: "blur(7px)", zIndex: 2, pointerEvents: "none" }} />;
        })}

        {/* ===================== SERVICE-TICKET RAIL (wire of white tickets, gently fluttering) ===================== */}
        <div style={{ position: "absolute", left: 120, top: 70, width: 772, height: 3, background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEELD})`, opacity: 0.65, zIndex: 5 }} />
        {Array.from({ length: 10 }).map((_, i) => {
          const tx = 150 + i * 74, flap = Math.sin(lf / 16 + i * 0.9) * 4, yb = Math.sin(lf / 20 + i) * 1.6;
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: tx, top: 72 + yb, width: 34, height: 40, transformOrigin: "50% 0%", transform: `rotate(${flap}deg)`, zIndex: 5, opacity: 0.82 }}>
              <div style={{ position: "absolute", left: 15, top: -4, width: 4, height: 8, background: S3_STEELD, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: 0, top: 2, width: 34, height: 38, borderRadius: "2px 2px 3px 3px", background: "linear-gradient(180deg,#FBF6EA,#E4DAC5)", boxShadow: "0 4px 7px -3px rgba(0,0,0,0.5)" }} />
              {[0, 1, 2, 3].map((r) => <div key={r} style={{ position: "absolute", left: 5, top: 8 + r * 7, width: 24 - (r % 2) * 8, height: 2, background: "rgba(60,40,20,0.35)" }} />)}
            </div>
          );
        })}

        {/* ===================== HANGING RAIL — COPPER POTS + utensils (warm, gently swaying) ===================== */}
        <div style={{ position: "absolute", left: 120, top: 116, width: 772, height: 8, borderRadius: 4, background: `linear-gradient(180deg,${S3_BRASS},${S3_BRASSD})`, opacity: 0.85, boxShadow: "0 3px 6px rgba(0,0,0,0.4)", zIndex: 6 }} />
        {Array.from({ length: 11 }).map((_, i) => {
          const ux = 150 + i * 70, sway = Math.sin(lf / 34 + i * 0.7) * 2.4;
          const kind = i % 3;                                  // 0 = copper pot, 1 = ladle, 2 = whisk
          return (
            <div key={"ut" + i} style={{ position: "absolute", left: ux, top: 124, width: 40, height: 60, transformOrigin: "50% 0%", transform: `rotate(${sway}deg)`, zIndex: 6 }}>
              {/* hook */}
              <div style={{ position: "absolute", left: kind === 0 ? 15 : 8, top: 0, width: kind === 0 ? 10 : 7, height: 12, borderRadius: "50% 50% 0 0", border: `2px solid ${S3_BRASSD}`, borderBottom: "none" }} />
              {kind === 0 && (<>
                <div style={{ position: "absolute", left: 3, top: 14, width: 34, height: 30, borderRadius: "6px 6px 15px 15px", background: `linear-gradient(180deg,${S3_COPPERHI},${S3_COPPER} 52%,${S3_COPPERD})`, boxShadow: "inset 0 3px 0 rgba(255,225,190,0.6), 0 4px 8px -3px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 34, top: 20, width: 16, height: 5, borderRadius: 3, background: `linear-gradient(90deg,${S3_COPPER},${S3_COPPERD})` }} />
                <div style={{ position: "absolute", left: 8, top: 18, width: 8, height: 20, borderRadius: 6, background: "rgba(255,235,205,0.45)", filter: "blur(1px)" }} />
              </>)}
              {kind === 1 && (<>
                <div style={{ position: "absolute", left: 7, top: 10, width: 5, height: 34, borderRadius: 3, background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEELD})` }} />
                <div style={{ position: "absolute", left: 2, top: 40, width: 16, height: 12, borderRadius: "0 0 50% 50%", background: `linear-gradient(180deg,${S3_STEEL},${S3_STEELDK})` }} />
              </>)}
              {kind === 2 && (<>
                <div style={{ position: "absolute", left: 7, top: 10, width: 5, height: 22, borderRadius: 3, background: `linear-gradient(180deg,${S3_STEELHI},${S3_STEELD})` }} />
                <div style={{ position: "absolute", left: 1, top: 30, width: 16, height: 22, borderRadius: "40% 40% 50% 50%", border: `2px solid ${S3_STEEL}`, borderTop: "none", background: "transparent" }} />
                <div style={{ position: "absolute", left: 9, top: 30, width: 1.5, height: 22, background: S3_STEELD }} />
              </>)}
            </div>
          );
        })}

        {/* ===================== BACK SHELF — stacks of white plates + squeeze bottles + spice jars ===================== */}
        <div style={{ position: "absolute", left: 60, top: 372, width: 892, height: 8, borderRadius: 4, background: `linear-gradient(180deg,${S3_WOODHI},${S3_WOODD})`, boxShadow: "0 5px 10px -4px rgba(0,0,0,0.5)", zIndex: 3, opacity: 0.9 }} />
        {/* plate stacks */}
        {[110, 250, 690, 900].map((px, i) => (
          <div key={"pl" + i} style={{ position: "absolute", left: px - 24, top: 344, width: 48, height: 30, zIndex: 3 }}>
            {[0, 1, 2, 3, 4].map((r) => <div key={r} style={{ position: "absolute", left: 0, top: 22 - r * 5, width: 48, height: 8, borderRadius: "50%", background: "linear-gradient(180deg,#F4EEE0,#C7BDA9)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.9 }} />)}
          </div>
        ))}
        {/* squeeze bottles (red + gold condiments) */}
        {[[330, S3_RED], [372, S3_AMBER], [612, S3_AMBER], [652, S3_RED]].map((b, i) => (
          <div key={"sq" + i} style={{ position: "absolute", left: (b[0] as number) - 9, top: 332, width: 18, height: 40, zIndex: 3, opacity: 0.92 }}>
            <div style={{ position: "absolute", left: 0, top: 8, width: 18, height: 32, borderRadius: "8px 8px 9px 9px", background: `linear-gradient(180deg,${b[1] as string}, rgba(0,0,0,0.35))`, boxShadow: "inset 3px 0 0 rgba(255,255,255,0.25)" }} />
            <div style={{ position: "absolute", left: 5, top: 0, width: 8, height: 10, borderRadius: "3px 3px 0 0", background: "#2A1B10" }} />
          </div>
        ))}
        {/* spice-jar row */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={"jar" + i} style={{ position: "absolute", left: 430 + i * 26, top: 346, width: 18, height: 26, zIndex: 3, opacity: 0.85 }}>
            <div style={{ position: "absolute", left: 0, top: 4, width: 18, height: 22, borderRadius: "3px 3px 4px 4px", background: `linear-gradient(180deg, rgba(255,235,200,0.5), ${i % 2 ? "#8A4A22" : "#C98A3D"})`, boxShadow: "inset 2px 0 0 rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", left: 2, top: 0, width: 14, height: 6, borderRadius: 2, background: S3_BRASSD }} />
          </div>
        ))}

        {/* HEAT LAMPS over the pass (amber shimmer + downward glow) */}
        <S3_HeatLamp x={S3_MAKX} w={260} lf={lf} ph={0} />
        <S3_HeatLamp x={S3_CRITX} w={260} lf={lf} ph={1.7} />

        {/* ===================== BACK LINE — busier line-cooks + a passing waiter (depth + life) ===================== */}
        <S3_Waiter lf={lf} />
        <S3_BgCook x={112} fy={470} s={62} tint="#7A5A38" lf={lf} ph={0.4} />
        <S3_BgCook x={356} fy={466} s={66} tint="#8A6E4A" lf={lf} ph={1.3} />
        <S3_BgCook x={556} fy={462} s={70} tint="#9A7A50" lf={lf} ph={2.1} />
        <S3_BgCook x={704} fy={468} s={64} tint="#8A6E5A" lf={lf} ph={3.7} />
        <S3_BgCook x={912} fy={470} s={62} tint="#7A5E42" lf={lf} ph={5.2} />

        {/* ===================== SCORE GANTRY (brass plaque, warm) ===================== */}
        <div style={{ position: "absolute", left: 40, top: 26, width: 932, height: 40, borderRadius: 12, background: "linear-gradient(180deg,#3A2210,#20120A)", border: `3px solid ${S3_BRASSD}`, boxShadow: "0 8px 20px -10px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,200,120,0.25)", zIndex: 4 }} />
        <div style={{ position: "absolute", left: 0, top: 30, width: 1012, textAlign: "center", zIndex: 5 }}>
          <span style={{ fontFamily: S3_SERIF, fontWeight: 900, fontSize: 26, letterSpacing: "0.16em", color: "#FBEFD8", textShadow: `0 0 10px ${S3_AMBER}, 0 0 22px rgba(255,150,60,0.55)` }}>THE&nbsp;</span>
          <span style={{ fontFamily: S3_SERIF, fontWeight: 900, fontSize: 26, letterSpacing: "0.16em", color: S3_RED, textShadow: `0 0 12px ${S3_RED}` }}>COOK-OFF</span>
        </div>
        {/* two station score chips: maker rates itself 10, critic tallies faults (chip nudges as each fault lands) */}
        {[[300, GREEN, "10"], [712, S3_RED, "0" + S3_RF.filter((r) => lf >= r).length]].map((s, i) => {
          const lastR = S3_RF.filter((r) => lf >= r).slice(-1)[0] ?? -99;
          const bump = i === 1 ? spr(lf, lastR, 12, 220) : 0;
          const bumpScale = 1 + 0.12 * Math.max(0, bump < 1.2 ? bump * (1 - Math.max(0, (lf - lastR) / 10)) : 0);
          return (
            <div key={"sc" + i} style={{ position: "absolute", left: (s[0] as number) - 30, top: 30, width: 60, height: 32, borderRadius: 8, background: "rgba(26,14,6,0.72)", border: `2px solid ${s[1] as string}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S3_MONO, fontWeight: 900, fontSize: 18, color: s[1] as string, zIndex: 6, transform: `scale(${bumpScale})` }}>{s[2] as string}</div>
          );
        })}

        {/* ===================== DRAMATIC OVERHEAD SPOTLIGHTS (warm) ===================== */}
        <SpotCone x={S3_MAKX} top={-6} topW={54} botW={320} h={680} color="rgba(255,190,110,0.20)" sway={1.2} lf={lf} pool={0.85} />
        <SpotCone x={S3_CRITX} top={-6} topW={58} botW={360} h={700} color={`rgba(255,120,50,${0.14 + 0.12 * critOp})`} sway={1.4} lf={lf} pool={0.85} />
        <SpotCone x={S3_DISHX} top={-6} topW={40} botW={230} h={640} color="rgba(255,238,200,0.18)" sway={0.8} lf={lf} pool={0.9} />

        {/* soft hot arrival glow behind the critic (fades in calmly — not a flash) */}
        <div style={{ position: "absolute", left: S3_CRITX - 160, top: 300, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,110,50,0.28), transparent 68%)", filter: "blur(8px)", opacity: over(lf, 138, 30), zIndex: 8 }} />

        {/* floating warm motes / kitchen sparks */}
        {S3_MOTES.map((m, i) => { const p = (lf * m.sp * 0.02 + m.ph / 6.28) % 1; const yy = 470 - p * 300; return <div key={"mt" + i} style={{ position: "absolute", left: m.x + Math.sin(lf / 7 + i) * 8, top: yy, width: m.w, height: m.w, borderRadius: "50%", background: i % 3 === 0 ? "rgba(255,150,60,0.85)" : "rgba(255,224,170,0.85)", opacity: (1 - p) * 0.7, zIndex: 2 }} />; })}

        {/* ===================== STATIONS (both lit + alive) ===================== */}
        <S3_Station x={S3_MAKX} w={300} lf={lf} ph={0} />
        <S3_Station x={S3_CRITX} w={300} lf={lf} ph={1} />
        {/* FLAME-FLARE whooshes lick up off BOTH cooktops (offset cycles => constant fire, fills every lull) */}
        <S3_Flare x={S3_MAKX} base={636} lf={lf} ph={0} z={11} />
        <S3_Flare x={S3_CRITX} base={640} lf={lf} ph={37} z={11} />
        {/* a bubbling COPPER BOIL POT on the RIGHT station — rattling lid + steam bursts from lf 0 (kills the empty-right lull) */}
        <S3_BoilPot x={898} base={616} lf={lf} />
        <S3_Steam x={S3_MAKX} base={600} lf={lf} />
        <S3_Steam x={S3_CRITX} base={600} lf={lf} />
        {/* rising embers off both flames */}
        {[214, 786].map((sx, si) => [0, 1, 2].map((k) => { const t = ((lf / 40) + k / 3 + si * 0.2) % 1; return <div key={"emb" + si + k} style={{ position: "absolute", left: sx - 20 + seed(si * 3 + k) * 40, top: 596 - t * 120, width: 3 + (1 - t) * 3, height: 3 + (1 - t) * 3, borderRadius: "50%", background: k % 2 ? "#FFC23D" : "#FF8A2A", opacity: (1 - t) * 0.8, filter: "blur(0.5px)", zIndex: 13 }} />; }))}

        {/* ===================== THE MAKER (left) — BUSY: flips a pan, chops, sprinkles, bobs ===================== */}
        <div style={{ position: "absolute", left: S3_MAKX - S3_MAKSIZE / 2, top: S3_MAKFEET - S3_MAKSIZE, width: S3_MAKSIZE, height: S3_MAKSIZE, zIndex: 14, transform: `translate(${makerShiver + makerFlinch}px, ${makerWorry * 8 + chopBob}px)`, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.5))" }}>
          <Mascot lf={lf} size={S3_MAKSIZE} cheer={1 - makerWorry} shock={makerWorry} tint={CLAY} nodAmp={makerWorry > 0.3 ? 1.4 : 3} gaze={2} />
          {/* nervous sweat bead trickling down the maker during the deflation tail (keeps the left side animated) */}
          {makerSweatT > 0.02 && (
            <div style={{ position: "absolute", left: S3_MAKSIZE * 0.62, top: 54 + makerSweatT * 30, width: 7, height: 10, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "radial-gradient(circle at 40% 30%, #FFF6E4, #CFE3F0)", opacity: (1 - makerSweatT) * 0.9, filter: "blur(0.3px)", zIndex: 24 }} />
          )}
        </div>
        {/* a wobble "?!" that pops over the maker as its rating gets struck */}
        {makerWorry > 0.05 && (
          <div style={{ position: "absolute", left: S3_MAKX + 70, top: 452 - makerWorry * 6, transform: `translate(-50%,-50%) scale(${Math.min(1.1, spr(lf, 236, 11, 200))}) rotate(${Math.sin(lf / 5) * 6}deg)`, opacity: makerWorry, zIndex: 23, fontFamily: S3_SERIF, fontWeight: 900, fontSize: 34, color: S3_RED, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>?!</div>
        )}
        {/* the pan the maker is tossing, over the station flame */}
        <div style={{ position: "absolute", left: 150, top: 470, width: 130, height: 130, zIndex: 15, transform: `translate(${makerShiver * 0.6}px, ${makerWorry * 8 + bob(lf, 3, 60, 1)}px)`, opacity: 1 - makerWorry * 0.22, filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.45))" }}>
          <S3_PanToss lf={lf} size={130} />
        </div>
        {/* the maker ALSO chops on a board at the front of the station (busy the WHOLE time — never stops, just slows when worried) */}
        <S3_Chop x={108} y={624} lf={lf} act={makerBusy} />
        {/* the maker keeps SPRINKLING garnish over the dish (nervously re-plating during the tail) */}
        <S3_Sprinkle lf={lf} act={ramp(lf, 20, 40) * makerBusy} />
        {/* the maker's SELF-RATING plaque (crossed out once flaws are found) */}
        <div style={{ position: "absolute", left: S3_MAKX + 44, top: 452, transform: `translate(-50%,-50%) rotate(-4deg) scale(${Math.min(1.05, spr(lf, 20, 12, 200))})`, opacity: ramp(lf, 14, 26), zIndex: 22 }}>
          <div style={{ position: "relative", background: "#FFFFFF", border: `3px solid ${GREEN}`, borderRadius: 14, padding: "6px 14px", fontFamily: S3_SERIF, fontWeight: 900, fontSize: 20, color: GREEN, whiteSpace: "nowrap", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.4)" }}>
            10/10 ✓
            {tagStrike > 0.03 && <div style={{ position: "absolute", left: "6%", top: "52%", width: `${88 * Math.min(1, tagStrike)}%`, height: 4, background: S3_RED, borderRadius: 2, transform: "rotate(-7deg)" }} />}
          </div>
        </div>

        {/* ===================== THE JUDGED DISH (center, on a raised tasting plinth) ===================== */}
        <div style={{ position: "absolute", left: S3_DISHX - 128, top: S3_DISHY - 40, width: 256, height: 118, zIndex: 12 }}>
          {/* plinth */}
          <div style={{ position: "absolute", left: 44, top: 62, width: 168, height: 46, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 30%,${S3_STEELHI},${S3_STEELD})`, boxShadow: "0 16px 24px -12px rgba(0,0,0,0.6)" }} />
          {/* plate */}
          <div style={{ position: "absolute", left: 30, top: 40, width: 196, height: 56, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 34%,#FCF7EC,#E0D8C6 66%,#C3BAA6)", boxShadow: "0 14px 22px -12px rgba(0,0,0,0.5)" }} />
          {/* the food — looks pretty (that's the joke); trembles a touch when a fault lands; a sickly green tinge seeps in once unmasked */}
          <div style={{ position: "absolute", left: 84, top: 44, width: 88, height: 44, borderRadius: "46% 46% 40% 40%", background: `radial-gradient(ellipse at 42% 30%,${lerpHex("#D69A5A", "#8FA24A", revealOp * 0.55)},${lerpHex("#9E5E30", "#5E6A24", revealOp * 0.55)} 72%)`, transform: `translateX(${Math.sin(lf * 2.2) * (S3_RF.filter((r) => lf >= r && lf < r + 6).length ? 1.4 : 0)}px)` }} />
          <div style={{ position: "absolute", left: 100, top: 30, width: 8, height: 20, background: GREEN, borderRadius: 4, transform: `rotate(${-12 + Math.sin(lf / 24) * 3}deg)`, transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 132, top: 46, width: 22, height: 10, borderRadius: "50%", background: S3_RED }} />
          {lf < S3_SWEEP0 && <S3_Steam x={128} base={44} lf={lf} />}
        </div>

        {/* faint green STINK squiggles rise off the dish once the disaster is unmasked (it's secretly rotten) */}
        {revealOp > 0.05 && [0, 1, 2].map((k) => {
          const t = ((lf / 40) + k / 3) % 1;
          const sx = S3_DISHX - 20 + k * 20;
          return (
            <svg key={"stk" + k} width={26} height={80} viewBox="0 0 26 80" style={{ position: "absolute", left: sx - 13, top: 560 - t * 78, overflow: "visible", opacity: (1 - t) * 0.5 * revealOp, zIndex: 21 }}>
              <path d={`M13 80 q${8 + Math.sin(lf / 5 + k) * 4} -20 0 -40 q-${8 + Math.sin(lf / 6 + k) * 4} -20 0 -40`} fill="none" stroke="#8FB84A" strokeWidth={3} strokeLinecap="round" />
            </svg>
          );
        })}

        {/* ===================== THE 2ND CLAUDE — RAMSAY CRITIC (right, SLIDES in, HUNTS the dish) ===================== */}
        {lf > 128 && (
          <div style={{ position: "absolute", left: S3_CRITX - S3_CRITSIZE / 2, top: S3_CRITFEET - S3_CRITSIZE, width: S3_CRITSIZE, height: S3_CRITSIZE, zIndex: 16, opacity: critOp, transform: `translateX(${critSlideX + critTremor + critRevealRecoil}px) translateY(${critBob}px) rotate(${-(critLean + critLeanPulse) + headShake}deg)`, transformOrigin: "50% 92%", filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.55))" }}>
            <div style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}>
              <RamsayChef lf={lf} size={S3_CRITSIZE} pose={s3pose as any} tint={CLAY} yell={critYell} gaze={critGaze} brow={1} toque={0} nod={1} />
            </div>
            {/* bead of sweat on the rage verdict (delightful detail) */}
            {sweatT > 0.02 && (
              <div style={{ position: "absolute", left: 76, top: 60 + sweatT * 26, width: 8, height: 11, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "radial-gradient(circle at 40% 30%, #FFF6E4, #E8C07F)", opacity: (1 - sweatT) * 0.9, filter: "blur(0.3px)", zIndex: 18 }} />
            )}
          </div>
        )}

        {/* ===================== SIGNATURE: the 2nd Claude PLANTS IN WITH A BANG (impact ring + dust + cracks) ===================== */}
        {lf >= S3_BANG - 2 && bangRing < 1 && (
          <div style={{ position: "absolute", left: S3_CRITX, top: 652, width: 0, height: 0, zIndex: 15, pointerEvents: "none" }}>
            {/* hot ground glow of the landing */}
            <div style={{ position: "absolute", left: -120, top: -26, width: 240, height: 76, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,140,60,${bangP * 0.42}), transparent 70%)`, filter: "blur(6px)" }} />
            {/* ground shock ring (expands + fades, ellipse for floor perspective) */}
            {(() => { const rw = 70 + bangRing * 230, rh = rw * 0.3; return (
              <div style={{ position: "absolute", left: -rw / 2, top: -rh / 2, width: rw, height: rh, borderRadius: "50%", border: `3px solid rgba(255,150,60,${(1 - bangRing) * 0.85})`, boxShadow: `0 0 18px rgba(255,120,50,${(1 - bangRing) * 0.5})` }} />
            ); })()}
            {/* dust puffs kicking outward + up from the feet */}
            {[0, 1, 2, 3, 4].map((k) => {
              const ang = (-155 + k * 38) * Math.PI / 180;
              const d = bangRing * (52 + seed(k * 2.3) * 40);
              const px = Math.cos(ang) * d, py = Math.sin(ang) * d * 0.7;
              const sz = 16 + bangRing * 26 + seed(k) * 8;
              return <div key={"du" + k} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, rgba(228,202,152,${(1 - bangRing) * 0.6}), transparent 70%)`, filter: "blur(3px)" }} />;
            })}
            {/* floor cracks radiating from the impact */}
            <svg width={300} height={80} viewBox="0 0 300 80" style={{ position: "absolute", left: -150, top: -14, overflow: "visible", opacity: (1 - bangRing) * 0.9 }}>
              {[0, 1, 2, 3, 4].map((k) => { const ax = (-150 + k * 38) * Math.PI / 180; const L = 22 + bangP * 64 + seed(k) * 20; return <line key={k} x1={150} y1={16} x2={150 + Math.cos(ax) * L} y2={16 + Math.sin(ax) * L * 0.5} stroke="#1A0F06" strokeWidth={2.6} opacity={0.55} strokeLinecap="round" />; })}
            </svg>
          </div>
        )}

        {/* ===================== THE MAGNIFIER SWEEP (signature smooth action + travelling glint) ===================== */}
        {glassOp > 0.02 && (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 30, opacity: glassOp, pointerEvents: "none" }}>
            {/* brass rod: lens rim -> critic's hand (reads as held & swept) */}
            <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              <line x1={rimX} y1={rimY} x2={S3_HX} y2={S3_HY} stroke={S3_BRASSD} strokeWidth={17} strokeLinecap="round" />
              <line x1={rimX} y1={rimY} x2={S3_HX} y2={S3_HY} stroke={S3_BRASS} strokeWidth={9} strokeLinecap="round" />
              <circle cx={S3_HX} cy={S3_HY} r={11} fill={S3_BRASS} stroke={S3_BRASSD} strokeWidth={3} />
            </svg>
            {/* magnified glass content: a crosshair over the "found" flaw + the HIDDEN DISASTER once unmasked */}
            <svg width={lensR * 2} height={lensR * 2} viewBox="0 0 184 184" style={{ position: "absolute", left: lensCX - lensR, top: lensCY - lensR, overflow: "visible" }}>
              <defs>
                <clipPath id="s3lens"><circle cx={92} cy={92} r={84} /></clipPath>
              </defs>
              {/* glass fill + faint zoomed food texture */}
              <circle cx={92} cy={92} r={84} fill={S3_GLASS} opacity={0.30} />
              <g clipPath="url(#s3lens)">
                <circle cx={92} cy={112} r={70} fill="rgba(158,94,48,0.5)" />
                <path d="M40 120 q52 -34 104 0" fill="none" stroke="rgba(90,44,16,0.5)" strokeWidth={6} />
                <line x1={92} y1={40} x2={92} y2={144} stroke="rgba(226,59,46,0.55)" strokeWidth={2} />
                <line x1={40} y1={92} x2={144} y2={92} stroke="rgba(226,59,46,0.55)" strokeWidth={2} />
                {/* travelling specular glint sliding around inside the glass */}
                <circle cx={glintX} cy={glintY} r={9} fill="rgba(255,255,255,0.55)" opacity={0.6} />
              </g>
              {/* SIGNATURE REVEAL — the pretty dish is SECRETLY a snarling red monster of faults, pinned under the glass */}
              {revealOp > 0.02 && (
                <g clipPath="url(#s3lens)" opacity={revealOp}>
                  {/* darken the glass behind the monster so it reads as an unmasking */}
                  <circle cx={92} cy={92} r={84} fill="#3A0704" opacity={0.55} />
                  <S3_Monster mp={revealPop} sk={revealShake * 0.5} lf={lf} />
                </g>
              )}
              {/* brass rim */}
              <circle cx={92} cy={92} r={84} fill="none" stroke={S3_BRASSD} strokeWidth={12} />
              <circle cx={92} cy={92} r={84} fill="none" stroke={S3_BRASS} strokeWidth={5} />
              {/* glass highlight streak + fixed sparkle */}
              <path d="M52 58 Q78 40 110 46" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={7} strokeLinecap="round" />
              <circle cx={66} cy={64} r={7} fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
        )}

        {/* ===================== SIGNATURE BURST — alarm halo + "!" + fault chips FLING out past the rim ===================== */}
        {revealOp > 0.02 && (
          <div style={{ position: "absolute", left: lensCX, top: lensCY, width: 0, height: 0, zIndex: 35, opacity: revealOp, pointerEvents: "none" }}>
            {/* spinning red alarm rays bursting past the rim */}
            <svg width={380} height={380} viewBox="0 0 380 380" style={{ position: "absolute", left: -190, top: -190, overflow: "visible", transform: `rotate(${lf * 2.4}deg) scale(${0.7 + 0.32 * revealPop})`, opacity: 0.32 }}>
              {Array.from({ length: 16 }).map((_, k) => (
                <path key={k} d="M190 190 L182 24 L198 24 Z" transform={`rotate(${k * 22.5} 190 190)`} fill={k % 2 ? "#FF5A3C" : "#E23B2E"} opacity={0.55} />
              ))}
            </svg>
            {/* red "!" alarm badge popping above the lens */}
            <div style={{ position: "absolute", left: -24, top: -156, width: 48, height: 44, transform: `scale(${revealPop}) rotate(${Math.sin(lf / 5) * 5}deg)`, transformOrigin: "50% 100%" }}>
              <svg width={48} height={44} viewBox="0 0 48 44" style={{ overflow: "visible" }}>
                <path d="M24 2 L46 40 L2 40 Z" fill="#E23B2E" stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
                <rect x={21} y={13} width={6} height={15} rx={3} fill="#fff" />
                <circle cx={24} cy={34} r={3} fill="#fff" />
              </svg>
            </div>
            {/* the faults themselves fling out on little red chips (over-the-top prop gag) */}
            {S3_FLT.map((f, k) => <S3_FaultChip key={"fc" + k} text={f} fling={chipFling} ang={S3_FLT_ANG[k]} k={k} lf={lf} />)}
          </div>
        )}

        {/* ===================== RED "FOUND IT" MARKS (fade in + SETTLE under the lens — no flash) ===================== */}
        {S3_RF.map((rf, i) => {
          if (lf < rf) return null;
          const mx = S3_lensX(rf), my = S3_lensY(rf);
          const app = ramp(lf, rf, rf + 11);                         // smooth fade-in
          const pop = 0.58 + 0.42 * Math.min(1.12, spr(lf, rf, 11, 165)); // overshoot then settle
          const ring = ramp(lf, rf, rf + 16);                        // expanding confirm ring, eases out
          const spark = ramp(lf, rf, rf + 14);                       // spark burst flicks off the ✗ on the ping
          return (
            <div key={"mk" + i} style={{ position: "absolute", left: mx, top: my, zIndex: 33, transform: `translate(-50%,-50%) scale(${pop})`, opacity: app, pointerEvents: "none" }}>
              {/* expanding confirm ring (settles, no flash) */}
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 34 + ring * 30, height: 34 + ring * 30, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `2px solid rgba(226,59,46,${(1 - ring) * 0.7})` }} />
              {/* soft red halo (glow, not a ring flash) */}
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 46, height: 46, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(226,59,46,0.5), transparent 70%)", filter: "blur(2px)" }} />
              {/* SPARK BURST flicking outward on the fault ping (smooth fly-out, then gone) */}
              {spark < 0.999 && [0, 1, 2, 3, 4].map((k) => {
                const ang = seed(i * 3.7 + k) * 6.28;
                const dist = 8 + spark * (22 + seed(k * 2.1 + i) * 18);
                return <div key={"sp" + k} style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: 4, borderRadius: "50%", background: k % 2 ? S3_FLAMEY : S3_RED, transform: `translate(${Math.cos(ang) * dist - 2}px, ${Math.sin(ang) * dist - 2}px)`, opacity: (1 - spark) * 0.9 }} />;
              })}
              {/* the mark */}
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 34, height: 34, transform: "translate(-50%,-50%)", borderRadius: "50%", background: S3_RED, border: "3px solid #fff", boxShadow: "0 6px 12px -4px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S3_SERIF, fontWeight: 900, fontSize: 22, color: "#fff", lineHeight: 1 }}>✗</div>
            </div>
          );
        })}

        {/* ===================== "+ 2ND CLAUDE" LABEL (glides in with the critic) ===================== */}
        {lf >= S3_ARRIVE - 8 && (
          <div style={{ position: "absolute", left: S3_CRITX + 6, top: 402, transform: `translate(-50%,-50%) rotate(-6deg) scale(${0.9 + 0.1 * Math.min(1, spr(lf, S3_ARRIVE - 8, 13, 180))})`, opacity: ramp(lf, S3_ARRIVE - 8, S3_ARRIVE + 8), zIndex: 52 }}>
            <div style={{ background: S3_BLUE, color: "#06202E", fontFamily: S3_MONO, fontWeight: 900, fontSize: 24, letterSpacing: "0.04em", padding: "9px 20px", borderRadius: 12, border: "3px solid #fff", boxShadow: "0 14px 26px -10px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>+ 2ND CLAUDE</div>
          </div>
        )}

        {/* ===================== SIGNATURE SPARKS — bang on arrival + burst on the reveal (numeric at) ===================== */}
        <Sparkles lf={lf} at={S3_BANG / 30} x={S3_CRITX} y={624} n={16} spread={172} colors={[S3_FLAMEY, S3_FLAME, S3_BRASS, "#FFE59A"]} dur={0.8} />
        <Sparkles lf={lf} at={S3_REVEAL / 30} x={S3_lensX(S3_REVEAL)} y={S3_lensY(S3_REVEAL)} n={16} spread={150} colors={[S3_RED, S3_FLAMEY, "#FF5A3C"]} dur={0.75} />

        {/* ===================== SPEECH BUBBLES (sparse: maker praise + critic rage) ===================== */}
        {/* maker praises its own dish (tail down -> the clay maker's head above the left station) */}
        <SpeechBubble lf={lf} at={1.15} dur={2.0} x={S3_MAKX + 6} y={392} text="looks great!" tail="down" tone="praise" size={26} />
        {/* critic's rage order, just before the first fault lands (tail down -> RamsayChef on the right) */}
        <SpeechBubble lf={lf} at={5.7} dur={1.9} x={758} y={330} text="FIND THE FAULTS." tail="down" tone="rage" size={24} />

        {/* ===================== FOREGROUND POLISH (steady, no flash) ===================== */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 120, background: "linear-gradient(180deg, rgba(18,10,4,0.5), transparent)", zIndex: 43, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 100% at 50% 46%, transparent 52%, rgba(16,9,4,0.62) 100%)", zIndex: 43 }} />
        {critOp > 0.01 && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at ${S3_CRITX}px 470px, rgba(255,110,50,${critOp * 0.20}), transparent 60%)`, zIndex: 44 }} />}
        <Grain op={0.05} />
        <Vignette strength={0.32} shape="rect" />
      </div>
    </>
  );
};

// ===== S4 =====
// ===== S4 =====
// ===== S4 =====
// ===== S4 =====
// ===================== S4 — 11 PROBLEMS / IT'S RAW (RELENTLESS BARRAGE + LULL-FILL pass) =====================
// ONE continuous shot, ZERO cuts, NO flash. Setting: a DEEP WARM HELL'S KITCHEN at full service.
// The "done work" dish slides in (now with skid-streaks + steam trail + an anticipating hero) and slams onto
// the pass; RamsayChef leans in, JABS, and RHYTHMICALLY POUNDS the pass (accelerating slams) — each pound
// sends a shockwave ring, knocks food flying, punches the back-range flames UP, jolts the plates, dips his
// body, throws sparks. 11 red flags machine-gun into the dish while the PROBLEMS scoreboard races 0 -> 11.
// LULLS FILLED: (a) the dish-entry idle (0-30) — hero now rears back + steps in, dish drags skid-streaks +
// steam; (b) the wind-down tail (164-190, VO "the first Claude called perfect") — a FINAL emphatic hero
// shove (threaded through pk/shake/flare/dish so the whole set reacts), a slashed "PERFECT" verdict plaque,
// a late grease-fire flare, finale debris, and late ember/spark bursts — nothing held. KEPT: warm brigade bg,
// SERVICE neon, ticket rail, copper rack, heat lamps, salamander, bg cooks, embers/steam, both rage bubbles,
// RAW stamp, all pounds/flags/timing.
// QA LULL-HUNT PASS: walked the whole 0-190 timeline. The ONLY hero-quiet window was the 182-190 settle after
// the frame-174 closing shove — filled it with a gentle decaying AFTERSHOCK at frame 184 (S4_after: Ramsay
// leans in one last disgusted time, threaded through the same pk/shake/dishTr/flareUp/ember sums so the whole
// set gives a final settling react — no new fist, no ring, decays to still exactly at frame 190), 4 EXTRA late
// debris chunks so matter is still airborne at the last frame (last launches t=186), and an aftershock spark
// burst at frame 186. Ambient (flames/embers/steam/tickets/pot-rack/bg-cooks/waiter/salamander/neon/lamps/
// plate-shimmer) runs continuously the entire scene — no ambient dead air anywhere. Compile-verified: all ids
// resolve to shared globals or S4_-prefixed locals; every Sparkles/SpeechBubble at-prop is numeric; only
// allowed math/easing used; no div-by-zero/NaN; main component named exactly S4; timing unchanged.
//
// ===================== SIGNATURE MOMENT (added — everything above KEPT) =====================
// Lands ON the "11 problems" beat (VO "11@110", the 11th labelled flag stabs at t=106, the counter slams to 11):
//   (1) PORCUPINE — a dense radial fan of ~22 dark red-tipped QUILLS erupts out of the wrecked mound (staggered
//       100->111, bulk landing 106-110), giving the dish its unmistakable stabbed-so-full-it's-a-porcupine
//       silhouette layered UNDER the 11 labelled flags; they pop (anticipation -> overshoot -> settle via
//       back/cubic ease, NO spr) and hold to the end.
//   (2) ALARM — a red police-style beacon mounted on top of the PROBLEMS scoreboard KICKS ON (envelope
//       104->113) exactly as the counter hits 11: a glowing dome, a rotating inner hotspot, twin light beams
//       sweeping continuously (smooth lf rotation, NOT a strobe/flash), and a soft pulsing red wash behind the
//       board. A single porcupine-pop spark burst at frame 108 gives the moment follow-through weight.
// The 11 labelled S4_FLAGS + the scoreboard tally are UNTOUCHED (quills are decorative, un-counted). Timing,
// bubbles, fury barrage, pounds, debris, verdict, RAW stamp — all unchanged.

// literal font strings (do NOT assume fraunces/inter are in scope)
const S4_SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";
const S4_SANS = "'Inter', system-ui, -apple-system, sans-serif";

// warm brigade accent colors (local — copper + warm wood + candle, for restaurant warmth)
const S4_COPPER = "#C6733A";
const S4_COPPERD = "#8A4A22";
const S4_COPPER_HI = "#F0A968";
const S4_WOOD = "#5A3520";
const S4_WOODD = "#341C10";
const S4_CANDLE = "#FFC978";

// centre of the dish's food mound (dish settles at S4_DISHX)
const S4_DISHX = 486;
const S4_FOOD_CX = S4_DISHX + 130;
const S4_FOOD_CY = 566;

// 11 red flags, machine-gunned in on a smooth accumulating cadence, last one just before "11"
const S4_FLAGS = [
  { dx: 58, dy: 40, t: 46, rot: -16 },
  { dx: 128, dy: 24, t: 52, rot: 10 },
  { dx: 194, dy: 46, t: 58, rot: -6 },
  { dx: 90, dy: 72, t: 64, rot: 14 },
  { dx: 160, dy: 78, t: 70, rot: -12 },
  { dx: 222, dy: 60, t: 76, rot: 8 },
  { dx: 44, dy: 84, t: 82, rot: 18 },
  { dx: 130, dy: 54, t: 88, rot: -4 },
  { dx: 210, dy: 96, t: 94, rot: -18 },
  { dx: 96, dy: 104, t: 100, rot: 12 },
  { dx: 168, dy: 112, t: 106, rot: 2 },
];

// SIGNATURE: porcupine QUILLS — a dense radial fan of dark spines (about half red-flag-tipped) that erupt out of
// the wrecked mound as the tally slams to 11, giving the dish its porcupine silhouette. Decorative only (the 11
// labelled S4_FLAGS + the counter are untouched). Staggered 100..111 so the bulk lands right on the "11" beat.
const S4_QUILLS = Array.from({ length: 22 }, (_, i) => {
  // fan across the upper arc (mostly up/out, like a porcupine's back), deterministic jitter so it's spiky
  const base = -Math.PI * 0.97 + (i / 21) * Math.PI * 0.94;   // ~ -175deg .. -6deg
  const ang = base + (seed(i * 5 + 1) - 0.5) * 0.26;
  return {
    ang,
    len: 54 + seed(i * 3 + 2) * 48,          // spine length (longer than the flag stems so they stick out)
    t: 100 + (i % 11) * 1.1,                 // build fast, bulk lands 106-110 on VO "11"
    w: 3 + seed(i * 7 + 4) * 2.6,            // spine thickness
    tip: seed(i * 9 + 6) > 0.45,             // ~half carry a little red flag tip
  };
});

// ACCELERATING FIST-POUNDS on the pass (spacings 26,22,18,16,14,14,14 — a quickening barrage)
const S4_POUNDS = [40, 66, 88, 106, 122, 136, 150, 164];

// fist vertical raise-and-slam (pure arithmetic, continuous — no snap): rise 0->100, slam 100->0, small rebound
const S4_lift = (age: number) => {
  if (age < -10 || age > 6) return 0;
  if (age < -4) return ((age + 10) / 6) * 100;   // -10..-4 : wind up 0 -> 100
  if (age < 0) return (-age / 4) * 100;           // -4..0  : SLAM 100 -> 0
  return Math.sin((age / 6) * Math.PI) * 9;       // 0..6   : soft rebound
};

// flying food chunks / debris launched off the dish as it is torn apart (seed arcs)
const S4_CHUNKS = Array.from({ length: 16 }, (_, i) => {
  const a = -Math.PI * 0.5 + (seed(i) - 0.5) * 2.4; // mostly upward, wide spread
  return {
    t: 46 + i * 4,
    a,
    sp: 150 + seed(i * 2) * 180,
    rot: (seed(i * 3) - 0.5) * 780,
    s: 9 + seed(i * 4) * 13,
    col: i % 3 === 0 ? "#7C3312" : i % 3 === 1 ? "#B8501F" : "#CF9544",
  };
});

// EXTRA debris BURSTS knocked off by each fist-pound (5 chunks per slam, launched from the pass)
const S4_POUND_CHUNKS = S4_POUNDS.flatMap((pt, pi) =>
  Array.from({ length: 5 }, (_, k) => {
    const i = pi * 5 + k;
    const a = -Math.PI * 0.5 + (seed(i * 7 + 3) - 0.5) * 2.1;
    return {
      t: pt,
      a,
      sp: 120 + seed(i * 5 + 1) * 160,
      rot: (seed(i * 3 + 2) - 0.5) * 740,
      s: 7 + seed(i * 9 + 4) * 12,
      col: i % 3 === 0 ? "#7C3312" : i % 3 === 1 ? "#B8501F" : "#CF9544",
      ox: 360 + (seed(i * 2 + 6) - 0.5) * 70,
      oy: 632,
    };
  })
);

// FINALE debris — launched off the dish on the closing hero shove + the late aftershock (fills the 164-190 tail
// with flying matter right up to the last frame; last chunk launches at t=186 so matter is still airborne at 190)
const S4_LATE_CHUNKS = Array.from({ length: 12 }, (_, i) => {
  const a = -Math.PI * 0.5 + (seed(i * 11 + 5) - 0.5) * 2.0;
  return {
    t: 164 + i * 2,
    a,
    sp: 130 + seed(i * 4 + 2) * 150,
    rot: (seed(i * 6 + 1) - 0.5) * 760,
    s: 8 + seed(i * 3 + 7) * 11,
    col: i % 3 === 0 ? "#7C3312" : i % 3 === 1 ? "#B8501F" : "#CF9544",
    ox: S4_FOOD_CX + (seed(i * 2 + 3) - 0.5) * 90,
    oy: 540,
  };
});

// hanging SERVICE TICKETS on the rail — each flutters/curls on its own phase (background life)
const S4_TICKETS = Array.from({ length: 9 }, (_, i) => ({
  x: 150 + i * 84,
  h: 58 + (i % 3) * 14,
  ph: i * 0.8,
  tone: i % 4 === 0 ? "#FBE9C4" : "#F6F1E4",
}));

// a licking flame tongue (layered teardrops) — cel-shaded, per-instance flicker variety
const S4_Flame: React.FC<{ lf: number; x: number; y: number; scale?: number; ph?: number; z?: number; op?: number }> = ({ lf, x, y, scale = 1, ph = 0, z = 5, op = 1 }) => {
  // three incommensurate sines + a per-phase variety term => no two tongues flicker alike
  const fl = 1 + Math.sin(lf / 3 + ph) * 0.30 + Math.sin(lf / 1.7 + ph * 2) * 0.12 + Math.sin(lf / 2.3 + ph * 3.1) * 0.07;
  const h = 58 * fl * scale, w = 30 * scale;
  const sway = Math.sin(lf / 5 + ph) * 4 * scale + Math.sin(lf / 2.6 + ph * 1.7) * 1.6 * scale;
  return (
    <svg width={w * 2} height={h + 12} viewBox={`0 0 ${w * 2} ${h + 12}`} style={{ position: "absolute", left: x - w, top: y - h, overflow: "visible", zIndex: z, mixBlendMode: "screen", opacity: op }}>
      <path d={`M${w} ${h + 8} Q${w - w * 0.9 + sway} ${h * 0.5} ${w + sway} 4 Q${w + w * 0.9 + sway} ${h * 0.5} ${w} ${h + 8} Z`} fill={FLAME} opacity={0.92} />
      <path d={`M${w} ${h + 8} Q${w - w * 0.55 + sway} ${h * 0.55} ${w + sway * 1.3} ${h * 0.24} Q${w + w * 0.55 + sway} ${h * 0.55} ${w} ${h + 8} Z`} fill={FLAMEY} opacity={0.95} />
      <path d={`M${w} ${h + 8} Q${w - w * 0.28 + sway} ${h * 0.6} ${w + sway * 1.5} ${h * 0.42} Q${w + w * 0.28 + sway} ${h * 0.6} ${w} ${h + 8} Z`} fill={FLAME_CORE} opacity={0.95} />
    </svg>
  );
};

// a fluttering service ticket clipped to the rail (warm, curls on its phase)
const S4_Ticket: React.FC<{ lf: number; x: number; h: number; ph: number; tone: string }> = ({ lf, x, h, ph, tone }) => {
  const swing = Math.sin(lf / 16 + ph) * 5 + Math.sin(lf / 7 + ph * 1.6) * 1.6;
  const curl = Math.sin(lf / 11 + ph) * 6;
  return (
    <div style={{ position: "absolute", left: x, top: 108, width: 40, height: h + 12, transform: `rotate(${swing}deg)`, transformOrigin: "20px 4px", zIndex: 6 }}>
      {/* clip */}
      <div style={{ position: "absolute", left: 15, top: 0, width: 10, height: 8, borderRadius: 2, background: `linear-gradient(180deg,${STEEL_HI},${STEELD})` }} />
      {/* paper */}
      <div style={{ position: "absolute", left: 2, top: 8, width: 36, height: h, borderRadius: "2px 2px 4px 4px", background: `linear-gradient(180deg,${tone},#DCD3BE)`, boxShadow: "0 3px 6px -2px rgba(0,0,0,0.5)", transform: `perspective(120px) rotateX(${curl}deg)`, transformOrigin: "top center" }}>
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} style={{ position: "absolute", left: 5, top: 9 + r * (h / 6.2), width: 26 - (r % 2) * 8, height: 3, borderRadius: 2, background: "rgba(60,40,24,0.35)" }} />
        ))}
      </div>
    </div>
  );
};

// a single red flag stabbed into the dish: grows in with anticipation (hover up),
// springs DOWN to stab into the food, then a damped wobble settles it.
const S4_Flag: React.FC<{ lf: number; f: { dx: number; dy: number; t: number; rot: number } }> = ({ lf, f }) => {
  if (lf < f.t - 5) return null;
  const age = lf - f.t;
  // scale springs up continuously from the anticipation frame (overshoots, settles)
  const grow = Math.max(0.001, spr(lf, f.t - 5, 11, 240));
  // anticipation: hovers ~20px above the stab line, easing down to it by the stab (age=0)
  const anticLift = age < 0 ? (-age / 5) * 20 : 0;
  // the stab: drops 30px DOWN into the mound over the first ~6 frames after landing
  const drop = Math.max(0, 1 - Math.max(0, age) / 6) * 30;
  const liftUp = anticLift + drop;
  // post-stab damped wobble (secondary motion)
  const wob = Math.sin(Math.max(0, age) * 0.7) * 4 * Math.max(0, 1 - Math.max(0, age) / 18);
  return (
    <div
      style={{
        position: "absolute",
        left: S4_FOOD_CX - 130 + f.dx,
        top: 500 + f.dy - 66 - liftUp,
        transform: `rotate(${f.rot + wob}deg) scale(${grow})`,
        transformOrigin: "bottom center",
        zIndex: 24,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: 5, height: 68, background: "linear-gradient(180deg,#3A342E,#1E1A16)", borderRadius: 2 }} />
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 2,
          width: 44,
          height: 28,
          background: `linear-gradient(158deg,${HKR_GLOW},${HKREDD})`,
          clipPath: "polygon(0 0,100% 0,76% 50%,100% 100%,0 100%)",
          boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
          border: "2px solid rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
};

// drifting steam curl (screen-blend wisp) off the wrecked dish
const S4_Steam: React.FC<{ lf: number; x: number; y: number; ph?: number; scale?: number }> = ({ lf, x, y, ph = 0, scale = 1 }) => {
  const rise = ((lf * 0.9 + ph * 40) % 90) / 90; // 0..1 loop
  const drift = Math.sin(lf / 14 + ph) * 16 * scale;
  return (
    <div style={{ position: "absolute", left: x + drift - 14 * scale, top: y - rise * 120 * scale, width: 28 * scale, height: 28 * scale, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,235,225,0.5), transparent 68%)", filter: "blur(6px)", opacity: (1 - rise) * 0.5, mixBlendMode: "screen", zIndex: 26 }} />
  );
};

// SIGNATURE: a single porcupine QUILL radiating out of the mound. A 0-size wrapper pivots at the mound point (ox,oy)
// and a dark spine grows UP out of it; the wrapper rotation aims the spine along its angle. Pops with a back/cubic
// overshoot then settles (NO spr), then holds. About half carry a tiny red flag at the tip.
const S4_Quill: React.FC<{ lf: number; q: { ang: number; len: number; t: number; w: number; tip: boolean }; ox: number; oy: number }> = ({ lf, q, ox, oy }) => {
  if (lf < q.t - 5) return null;
  const age = lf - q.t;
  // pop: 0 -> 1.14 overshoot -> settle to 1 (quick, no spr)
  const grow = interpolate(age, [-5, 0, 6], [0.001, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const wob = Math.sin(Math.max(0, age) * 0.6) * 2.0 * Math.max(0, 1 - Math.max(0, age) / 16);
  const deg = (q.ang * 180) / Math.PI + 90 + wob; // rotate the up-pointing spine onto its angle
  const len = q.len * grow;
  return (
    <div style={{ position: "absolute", left: ox, top: oy, width: 0, height: 0, transform: `rotate(${deg}deg)`, zIndex: 22 }}>
      {/* dark quill spine (grows up out of the pivot) */}
      <div style={{ position: "absolute", left: -q.w / 2, top: -len, width: q.w, height: len, borderRadius: q.w, background: "linear-gradient(180deg,#2A231C,#0C0906)", boxShadow: "0 0 3px rgba(0,0,0,0.5)" }} />
      {/* tiny red flag on ~half the quills */}
      {q.tip && (
        <div style={{ position: "absolute", left: q.w / 2, top: -len - 1, width: 19, height: 12, background: `linear-gradient(158deg,${HKR_GLOW},${HKREDD})`, clipPath: "polygon(0 0,100% 0,74% 50%,100% 100%,0 100%)", boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
      )}
    </div>
  );
};

// SIGNATURE: the red "PROBLEMS" ALARM BEACON — a police-style rotating light that KICKS ON as the counter hits 11.
// `on` fades it in (envelope from the caller), `kick` gives a small settle-pop. Twin beams + inner hotspot sweep
// continuously on smooth lf rotation (NOT a flash/strobe); the dome + a soft radial wash pulse on a slow sine.
const S4_Alarm: React.FC<{ lf: number; on: number; kick: number }> = ({ lf, on, kick }) => {
  if (on <= 0.001) return null;
  const rot = lf * 10;                              // continuous smooth sweep
  const pulse = 0.6 + 0.4 * Math.sin(lf / 3.2);     // slow glow throb (no strobe)
  const s = on * (1 + kick * 0.14);                 // kick-on settle pop
  const hot = Math.cos((rot * Math.PI) / 180) * 9;  // inner hotspot drifting with the sweep
  return (
    <div style={{ position: "absolute", left: 506, top: 132, width: 0, height: 0, transform: `scale(${s})`, zIndex: 44, opacity: on }}>
      {/* soft pulsing red wash behind the board */}
      <div style={{ position: "absolute", left: -180, top: -180, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,52,34,${0.15 * pulse}), transparent 66%)`, filter: "blur(12px)", mixBlendMode: "screen", pointerEvents: "none" }} />
      {/* rotating twin light beams (sweep around continuously) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, transform: `rotate(${rot}deg)` }}>
        {[0, 180].map((b) => (
          <div key={b} style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, transform: `rotate(${b}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: -42, width: 216, height: 84, background: `linear-gradient(90deg, rgba(255,74,46,${0.44 * pulse}) 0%, rgba(255,74,46,${0.16 * pulse}) 42%, transparent 82%)`, clipPath: "polygon(0% 50%,100% 0%,100% 100%)", filter: "blur(3px)", mixBlendMode: "screen", pointerEvents: "none" }} />
          </div>
        ))}
      </div>
      {/* black mounting base */}
      <div style={{ position: "absolute", left: -32, top: 8, width: 64, height: 15, borderRadius: "4px 4px 7px 7px", background: "linear-gradient(180deg,#2A2622,#0C0906)", boxShadow: "0 4px 8px -3px rgba(0,0,0,0.6)" }} />
      {/* glowing red dome */}
      <div style={{ position: "absolute", left: -28, top: -26, width: 56, height: 44, borderRadius: "28px 28px 10px 10px", background: `radial-gradient(circle at 50% 34%, rgba(255,158,128,${0.62 + pulse * 0.28}), ${HKRED} 54%, ${HKREDD})`, border: "2px solid rgba(0,0,0,0.35)", boxShadow: `0 0 ${16 + pulse * 22}px rgba(255,58,38,${0.6 + pulse * 0.3}), inset 0 -6px 10px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.32)`, overflow: "hidden" }}>
        {/* inner rotating hotspot */}
        <div style={{ position: "absolute", left: 19, top: 15, width: 18, height: 18, borderRadius: "50%", transform: `translateX(${hot}px)`, background: "radial-gradient(circle,#FFF3E8,rgba(255,120,90,0.15) 70%)", filter: "blur(1px)" }} />
        {/* glass highlight */}
        <div style={{ position: "absolute", left: 10, top: 6, width: 15, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.5)", filter: "blur(1px)" }} />
      </div>
    </div>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  // hot pulse driving the whole set (slow sine, NOT a flash)
  const S4_heat = 0.5 + 0.5 * Math.sin(lf / 8);

  // ---- dish slides onto the pass, slams to rest ~frame 30 ----
  const S4_dishX = interpolate(lf, [0, 30], [1120, S4_DISHX], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S4_dishSlam = spr(lf, 30, 12, 220);
  const S4_dishSettle = 1 + Math.max(0, 1 - S4_dishSlam) * 0.14; // brief squash on impact
  const S4_slideP = over(lf, 0, 30, Easing.out(Easing.cubic));   // 0..1 slide progress (for skid streaks/trail)

  // ---- flags landed so far -> the climbing number ----
  let S4_landed = 0;
  for (let i = 0; i < S4_FLAGS.length; i++) if (lf >= S4_FLAGS[i].t) S4_landed++;
  const S4_intensity = S4_landed / S4_FLAGS.length; // 0..1, smoothly climbing

  // ---- per-STAB kick energy (decaying impulses, shared by shake/tremble/ember puff) ----
  let S4_kick = 0;
  for (let i = 0; i < S4_FLAGS.length; i++) {
    const ft = S4_FLAGS[i].t;
    if (lf >= ft) S4_kick += Math.exp(-(lf - ft) / 2.6) * 3.2;
  }

  // ---- per-POUND kick energy (decaying impulses from each fist slam) ----
  let S4_poundKick = 0;
  for (let i = 0; i < S4_POUNDS.length; i++) {
    const pt = S4_POUNDS[i];
    if (lf >= pt) S4_poundKick += Math.exp(-(lf - pt) / 3) * 4;
  }

  // ---- FINAL closing shove (fills the wind-down tail): one decaying impulse at frame 174 that we thread
  //      through pk/shake/dish/flare so the ENTIRE set reacts one last time on VO "...called perfect." ----
  const S4_finalKick = lf >= 174 ? Math.exp(-(lf - 174) / 3.4) * 4 : 0;

  // ---- LATE AFTERSHOCK (fills the only hero-quiet window, 182-190): a gentler decaying shove at frame 184,
  //      just after VO "...perfect." — Ramsay leans in one last disgusted time. Threaded through the same
  //      pk/shake/dish/flare sums as the pounds so the whole set gives one final settling react (no new fist,
  //      no ring — reads as a body shove that decays to still exactly at the scene's end). ----
  const S4_after = lf >= 184 ? Math.exp(-(lf - 184) / 3) * 2.4 : 0;

  const S4_pk = Math.min(S4_poundKick + S4_finalKick + S4_after, 4); // clamped drive for chef body / plates / dish hop / board glow

  // ---- SIGNATURE alarm-beacon envelope: KICKS ON exactly as the counter slams to 11 (11th flag stabs at t=106) ----
  const S4_alarmOn = interpolate(lf, [104, 113], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const S4_alarmKick = lf >= 106 ? Math.exp(-(lf - 106) / 6) : 0; // settle-pop when it kicks on (no spr)
  // porcupine quill fan pivots off the top of the wrecked mound
  const S4_quillOX = S4_FOOD_CX;
  const S4_quillOY = 548;

  // ---- fist raise-and-slam state (only shown around a pound; fades in/out — no pop) ----
  let S4_fistLift = 0, S4_fistOp = 0;
  for (let i = 0; i < S4_POUNDS.length; i++) {
    const pt = S4_POUNDS[i];
    const age = lf - pt;
    if (age >= -12 && age <= 9) {
      S4_fistLift = Math.max(S4_fistLift, S4_lift(age));
      const o = Math.min(1, ramp(lf, pt - 12, pt - 8)) * (1 - Math.max(0, ramp(lf, pt + 4, pt + 9)));
      S4_fistOp = Math.max(S4_fistOp, o);
    }
  }
  const S4_fistShow = S4_fistOp > 0.001;

  // ---- Ramsay: anticipates the incoming dish (0-30), then leans in and works it over; jabs + lunges + dips ----
  const S4_preStep = interpolate(lf, [0, 30], [-14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // rear-back weight -> step in
  const S4_preTilt = interpolate(lf, [0, 26], [-3, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // small head turn toward the pass
  const S4_lean = interpolate(lf, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
  const S4_pose = lf < 44 ? "present" : "jab";
  const S4_yell = Math.min(1, ramp(lf, 30, 46) + 0.15) * (lf < 30 ? 0 : 1);
  const S4_lunge = S4_pk * 7;   // full-body forward drive on each slam (final shove included via pk)
  const S4_dip = S4_pk * 4;     // body dips down as the fist lands
  const S4_poundTilt = S4_pk * 1.6;

  // ---- shake: SMOOTHLY escalating (grows with the tally) + per-stab + per-pound + final kicks (capped) ----
  const S4_base = S4_intensity * 3.2;                        // rises as flags accumulate
  const S4_swell = Math.exp(-Math.pow((lf - 110) / 9, 2)) * 5; // gentle emphasis on "11"
  let S4_shakeAmt = Math.min(S4_kick + S4_poundKick * 1.4 + S4_finalKick * 1.4 + S4_after * 1.4 + S4_base + S4_swell, 15);
  const S4_shx = (seed(lf * 2.7) - 0.5) * S4_shakeAmt;
  const S4_shy = (seed(lf * 3.3 + 4) - 0.5) * S4_shakeAmt * 0.7;

  // ---- dish TREMBLES harder under each stab AND each pound AND the final shove (localized, decays fast) ----
  const S4_dishTr = Math.min(S4_kick + S4_poundKick + S4_finalKick + S4_after, 7);
  const S4_dtx = Math.sin(lf * 1.9) * S4_dishTr;
  const S4_dtRot = Math.sin(lf * 1.55 + 1) * S4_dishTr * 0.5;
  const S4_dtHop = -S4_pk * 3; // whole dish jumps on a pound / final shove

  // ---- calm camera: one slow eased push-in across the whole scene ----
  const S4_push = interpolate(lf, [0, 190], [1.0, 1.045], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // ---- PROBLEMS scoreboard: appears early (showing 0), then climbs, swelling per tick ----
  const S4_boardScale = Math.min(1, spr(lf, 6, 13, 200));
  const S4_lastIdx = S4_landed - 1;
  const S4_lastT = S4_lastIdx >= 0 ? S4_FLAGS[S4_lastIdx].t : 0;
  // swell-then-SETTLE per increment: quick overshoot up, damped ring-down (no flash)
  const S4_since = lf - S4_lastT;
  const S4_bump = S4_landed > 0 ? Math.exp(-S4_since / 5) * Math.cos(S4_since * 0.5) * 0.24 : 0;
  const S4_emph = Math.min(1, spr(lf, 110, 12, 190));        // swell on VO "11"
  const S4_numScale = 1 + Math.max(-0.06, S4_bump) + S4_emph * 0.30;

  // ---- chef secondary motion: brow/head tremor grows with fury; sweat bead drips ----
  const S4_headTilt = (lf > 30 ? 1 : 0) * (Math.sin(lf * 0.9) * (0.6 + S4_intensity * 1.6));
  const S4_sweat = lf > 46 ? ((lf - 46) % 52) / 52 : -1;     // 0..1 drip cycle, -1 = hidden

  // ---- small "RAW" stamp on "This is raw" (~frame 82) ----
  const S4_raw = spr(lf, 84, 10, 220);

  // ---- CLOSING VERDICT plaque: the first Claude's "PERFECT" pops in then Ramsay SLASHES it (VO 164-182) ----
  const S4_perfPop = interpolate(lf, [164, 174], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) });
  const S4_slash = interpolate(lf, [170, 182], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // red slash sweeps across
  const S4_perfShake = S4_slash > 0.02 && S4_slash < 0.98 ? Math.sin(lf * 2.3) * 2 : 0;

  // ---- late grease-fire flare envelope (rises 160, sustains through the tail, adds to the range) ----
  const S4_lateFlareEnv = over(lf, 160, 12) * (1 - over(lf, 184, 8) * 0.7);

  // ---- passing waiter drifts across the deep background ----
  const S4_waiterX = interpolate(lf, [0, 190], [-90, 470], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // ---- salamander grill glow pulse (its own slow beat, warms with fury) ----
  const S4_sal = 0.5 + 0.5 * Math.sin(lf / 5 + 1.1);

  // ---- back-wall "SERVICE" neon buzz (deterministic, subtle — NOT a strobe) ----
  const S4_buzz = 0.82 + 0.14 * Math.sin(lf * 0.85) + 0.06 * Math.sin(lf * 3.1 + 1.4);

  // ---- combined hit-surge that punches the back flames UP on every stab AND pound AND the final shove ----
  const S4_flareUp = Math.min(S4_kick + S4_poundKick + S4_finalKick + S4_after, 6);

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `translate(${S4_shx}px,${S4_shy}px) scale(${S4_push})`, transformOrigin: "506px 396px" }}>

        {/* ===================== WARM HELL'S KITCHEN WALL + FIRE WASH ===================== */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 96% at 50% 34%, #6A2010 0%, #3A1108 50%, #160604 100%)" }} />
        {/* warm-wood panelling band behind the steel (restaurant warmth, not cold grey) */}
        <div style={{ position: "absolute", left: 0, top: 300, width: 1012, height: 200, background: `linear-gradient(180deg,${S4_WOOD},${S4_WOODD})`, opacity: 0.55, zIndex: 0 }} />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={"plank" + i} style={{ position: "absolute", left: i * 130 - 6, top: 300, width: 3, height: 200, background: "rgba(0,0,0,0.25)", opacity: 0.5, zIndex: 0 }} />
        ))}
        {/* blue-steel back-wall panels (upper, cooler tier) */}
        {Array.from({ length: 5 }).map((_, r) => (
          <React.Fragment key={"tr" + r}>
            {Array.from({ length: 13 }).map((__, c) => (
              <div key={"t" + r + "_" + c} style={{ position: "absolute", left: (r % 2 ? 40 : 0) + c * 82 - 8, top: 20 + r * 50, width: 76, height: 44, borderRadius: 4, background: `linear-gradient(158deg,${STEELD},${STEELDK})`, boxShadow: "inset 0 2px 0 rgba(214,222,232,0.20), inset 0 -3px 5px rgba(0,0,0,0.4)", opacity: 0.28 }} />
            ))}
          </React.Fragment>
        ))}

        {/* back-wall red "SERVICE" NEON sign (buzzing warm signage on the wood band, deep bg) */}
        <div style={{ position: "absolute", left: 372, top: 344, zIndex: 1, opacity: 0.42 + S4_buzz * 0.2, filter: `drop-shadow(0 0 ${8 + S4_buzz * 12}px rgba(255,72,50,0.85))` }}>
          <div style={{ padding: "6px 20px", borderRadius: 12, border: `3px solid ${HKR_GLOW}`, color: "#FFE2D4", fontFamily: S4_SERIF, fontWeight: 900, fontSize: 30, letterSpacing: 7, background: "rgba(28,7,5,0.30)", textShadow: `0 0 ${6 + S4_buzz * 9}px ${HKR_GLOW}, 0 0 2px #fff` }}>SERVICE</div>
          <div style={{ position: "absolute", left: -20, top: 46, width: 260, height: 90, background: `radial-gradient(ellipse at 50% 0%, rgba(255,80,50,${0.12 + S4_buzz * 0.06}), transparent 70%)`, filter: "blur(6px)", pointerEvents: "none" }} />
        </div>

        {/* WALL SPICE-JAR SHELF (left, warm props) */}
        <div style={{ position: "absolute", left: 60, top: 300, width: 250, height: 8, borderRadius: 3, background: `linear-gradient(180deg,${BRASS},${BRASSD})`, boxShadow: "0 5px 10px -5px rgba(0,0,0,0.6)", zIndex: 1 }} />
        {[{ x: 74, c: "#B8501F" }, { x: 104, c: "#CF9544" }, { x: 134, c: "#7C3312" }, { x: 164, c: "#3F9E74" }, { x: 194, c: "#C44A3A" }, { x: 224, c: "#E7B24C" }, { x: 254, c: "#8A4A22" }, { x: 284, c: "#B8501F" }].map((j, i) => (
          <div key={"jar" + i} style={{ position: "absolute", left: j.x, top: 274, width: 22, height: 28, borderRadius: "3px 3px 5px 5px", background: `linear-gradient(180deg, rgba(255,240,220,0.35), ${j.c})`, border: "1px solid rgba(0,0,0,0.3)", boxShadow: "inset -2px 0 3px rgba(0,0,0,0.3)", opacity: 0.85, zIndex: 1 }}>
            <div style={{ position: "absolute", left: 4, top: -4, width: 14, height: 5, borderRadius: 2, background: BRASSD }} />
          </div>
        ))}
        {/* fiery ambient wash (slow pulse, brightens with each hit) */}
        <div style={{ position: "absolute", left: 120, top: 30, width: 820, height: 580, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,120,60,${0.28 + S4_heat * 0.12 + S4_intensity * 0.10 + S4_pk * 0.02}), transparent 66%)`, filter: "blur(14px)" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1012, height: 380, background: "linear-gradient(180deg, transparent, rgba(226,59,46,0.26))" }} />

        {/* ===================== DEEP BACKGROUND: PASSING WAITER (behind everything) ===================== */}
        <div style={{ position: "absolute", left: S4_waiterX, top: 470 + bob(lf, 4, 74, 0.4), width: 70, height: 70, opacity: 0.26, filter: "blur(2px)", zIndex: 1 }}>
          <Mascot lf={lf} size={70} tint={STEELDK} stern={0.4} nodAmp={1} />
          {/* a tray held aloft */}
          <div style={{ position: "absolute", left: 44, top: 6, width: 40, height: 8, borderRadius: 4, background: STEEL, boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 52, top: -6, width: 22, height: 14, borderRadius: "50%", background: STEEL_HI, opacity: 0.7 }} />
        </div>

        {/* ===================== BACKGROUND LINE-COOKS (depth + life) ===================== */}
        {[300, 468, 636].map((sx, i) => (
          <div key={"st" + i} style={{ position: "absolute", left: sx, top: 520, width: 150, height: 62, borderRadius: 6, background: `linear-gradient(180deg,${STEELD},#20252C)`, boxShadow: "inset 0 2px 0 rgba(214,222,232,0.14)", opacity: 0.7, zIndex: 2 }}>
            {/* bottles / props on the prep station */}
            <div style={{ position: "absolute", left: 14, top: -20, width: 9, height: 22, borderRadius: "3px 3px 2px 2px", background: GREEN, opacity: 0.7 }} />
            <div style={{ position: "absolute", left: 28, top: -26, width: 8, height: 28, borderRadius: "3px 3px 2px 2px", background: HKREDD, opacity: 0.7 }} />
            <div style={{ position: "absolute", left: 118, top: -16, width: 20, height: 16, borderRadius: "4px 4px 2px 2px", background: STEEL, opacity: 0.6 }} />
          </div>
        ))}
        {[{ x: 328, ph: 0, tint: STEELD }, { x: 494, ph: 1.2, tint: MUTE }, { x: 662, ph: 2.4, tint: STEELDK }].map((ck, i) => {
          const by = 454 + bob(lf, 5, 60 + i * 8, ck.ph);
          // a background cook lifts a pan and shakes it (busy line — never a still frame back there)
          const S4_toss = Math.sin(lf / 9 + ck.ph * 2) * 6;
          return (
            <React.Fragment key={"cookw" + i}>
              <div style={{ position: "absolute", left: ck.x, top: by, width: 84, height: 84, opacity: 0.42 - i * 0.06, filter: "blur(1.1px)", zIndex: 3 }}>
                <Mascot lf={lf} size={84} tint={ck.tint} stern={0.7} nodAmp={2 + i} />
              </div>
              {/* the cook's sauté pan tossing over the flame */}
              <div style={{ position: "absolute", left: ck.x + 62, top: by + 30 + S4_toss * 0.5, width: 40, height: 8, borderRadius: "0 0 12px 12px", background: `linear-gradient(180deg,${STEELDK},#101317)`, transform: `rotate(${-8 + S4_toss}deg)`, transformOrigin: "left center", opacity: 0.5 - i * 0.06, filter: "blur(1px)", zIndex: 3 }}>
                <div style={{ position: "absolute", left: 34, top: -3, width: 20, height: 4, borderRadius: 2, background: STEELDK }} />
              </div>
              <S4_Flame lf={lf} x={ck.x + 96} y={528} ph={i * 2.1 + 0.6} scale={0.55 + Math.max(0, S4_toss) * 0.02} z={3} op={0.5} />
            </React.Fragment>
          );
        })}

        {/* ===================== SALAMANDER GRILL (back-left, warm glowing bars) ===================== */}
        <div style={{ position: "absolute", left: 96, top: 420, width: 150, height: 70, borderRadius: 8, background: `linear-gradient(180deg,${STEELDK},#14171C)`, boxShadow: "inset 0 3px 0 rgba(214,222,232,0.12), 0 8px 16px -8px rgba(0,0,0,0.6)", zIndex: 3, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: 4, background: `radial-gradient(circle at 50% 60%, rgba(255,120,40,${0.5 + S4_sal * 0.4}), rgba(120,20,8,0.5))` }} />
          {[0, 1, 2, 3, 4].map((b) => (
            <div key={"bar" + b} style={{ position: "absolute", left: 12, top: 16 + b * 9, width: 126, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${lerpHex("#7C1F14", "#FF7A1A", 0.4 + S4_sal * 0.5)}, ${lerpHex("#B8501F", "#FFC23D", 0.5 + S4_sal * 0.4)})`, boxShadow: `0 0 ${5 + S4_sal * 8}px rgba(255,122,26,${0.5 + S4_sal * 0.4})` }} />
          ))}
        </div>

        {/* ===================== BRASS TICKET RAIL + FLUTTERING SERVICE TICKETS ===================== */}
        <div style={{ position: "absolute", left: 130, top: 106, width: 762, height: 6, borderRadius: 3, background: `linear-gradient(90deg,transparent,${BRASSD},${BRASS} 40%,${BRASS} 60%,${BRASSD},transparent)`, boxShadow: "0 3px 8px -4px rgba(0,0,0,0.6)", zIndex: 5 }} />
        {S4_TICKETS.map((tk, i) => (
          <S4_Ticket key={"tik" + i} lf={lf} x={tk.x} h={tk.h} ph={tk.ph} tone={tk.tone} />
        ))}

        {/* ===================== HANGING COPPER + STEEL POT RACK (+ ladles / utensils) ===================== */}
        <div style={{ position: "absolute", left: 40, top: 60, width: 932, height: 12, borderRadius: 6, background: `linear-gradient(180deg,${BRASS},${BRASSD})`, boxShadow: "0 6px 12px -6px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,220,160,0.4)", zIndex: 2 }} />
        {[{ x: 96, w: 80, h: 60, c: S4_COPPER, hi: S4_COPPER_HI }, { x: 224, w: 60, h: 74, c: STEELDK, hi: STEEL_HI }, { x: 344, w: 92, h: 54, c: S4_COPPER, hi: S4_COPPER_HI }, { x: 800, w: 72, h: 60, c: S4_COPPERD, hi: S4_COPPER_HI }, { x: 908, w: 58, h: 70, c: STEELD, hi: STEEL_HI }].map((p, i) => {
          const sw = bob(lf, 1.5, 74, i * 0.4) + S4_shakeAmt * 0.14 * (i % 2 ? 1 : -1);
          const shine = 0.4 + 0.3 * Math.sin(lf / 9 + i);
          return (
            <svg key={"pan" + i} width={p.w + 60} height={p.h + 70} viewBox={`0 0 ${p.w + 60} ${p.h + 70}`} style={{ position: "absolute", left: p.x - 30, top: 64, overflow: "visible", transform: `rotate(${sw}deg)`, transformOrigin: `${(p.w + 60) / 2}px 6px`, zIndex: 2 }}>
              <path d={`M${(p.w + 60) / 2 - 5} 6 a5 5 0 0 1 10 0 v12 a5 5 0 0 1 -10 0 z`} fill="none" stroke={BRASSD} strokeWidth={4} />
              <rect x={30} y={20} width={p.w} height={p.h} rx={p.w * 0.42} fill={p.c} />
              <rect x={30} y={20} width={p.w} height={p.h} rx={p.w * 0.42} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={3} />
              <ellipse cx={30 + p.w / 2} cy={20 + p.h * 0.30} rx={p.w * 0.32} ry={p.h * 0.16} fill={p.hi} opacity={shine} />
              <rect x={30 + p.w - 6} y={20 + p.h * 0.42} width={30} height={9} rx={4} fill={STEELDK} transform={`rotate(18 ${30 + p.w} ${20 + p.h * 0.46})`} />
            </svg>
          );
        })}
        {/* slim hanging utensils (ladle + whisk silhouettes) between the pans */}
        {[{ x: 470, kind: 0 }, { x: 560, kind: 1 }, { x: 650, kind: 0 }, { x: 728, kind: 1 }].map((u, i) => {
          const sw = bob(lf, 1.8, 78, i * 0.7);
          return (
            <svg key={"ut" + i} width={40} height={104} viewBox="0 0 40 104" style={{ position: "absolute", left: u.x - 20, top: 64, overflow: "visible", transform: `rotate(${sw}deg)`, transformOrigin: "20px 4px", zIndex: 2, opacity: 0.9 }}>
              <path d="M20 4 a4 4 0 0 1 8 0 v10 a4 4 0 0 1 -8 0 z" fill="none" stroke={BRASSD} strokeWidth={3} />
              <rect x={18} y={14} width={4} height={60} rx={2} fill={i % 2 ? STEELD : S4_COPPERD} />
              {u.kind === 0
                ? <ellipse cx={20} cy={86} rx={13} ry={16} fill="none" stroke={i % 2 ? STEEL : S4_COPPER} strokeWidth={4} />
                : <path d="M12 74 Q20 100 28 74 M15 74 Q20 96 25 74" fill="none" stroke={STEEL} strokeWidth={3} />}
            </svg>
          );
        })}

        {/* ===================== HEAT LAMPS OVER THE PASS ===================== */}
        <div style={{ position: "absolute", left: 160, top: 120, width: 760, height: 5, borderRadius: 3, background: `linear-gradient(90deg,transparent,${BRASSD},${BRASS},${BRASSD},transparent)`, zIndex: 3 }} />
        {[220, 360, 500, 720, 840].map((lx, i) => {
          const glow = 0.6 + 0.4 * Math.sin(lf / 6 + i * 1.3);
          return (
            <div key={"lamp" + i} style={{ position: "absolute", left: lx, top: 120, zIndex: 3 }}>
              <div style={{ position: "absolute", left: -2, top: 0, width: 4, height: 14, background: BRASSD }} />
              <div style={{ position: "absolute", left: -18, top: 12, width: 36, height: 20, borderRadius: "18px 18px 4px 4px", background: `linear-gradient(180deg,${BRASS},${BRASSD})`, boxShadow: `0 0 ${14 + glow * 20}px rgba(255,150,70,${0.5 + glow * 0.4})` }} />
              <div style={{ position: "absolute", left: -8, top: 30, width: 16, height: 8, borderRadius: "0 0 8px 8px", background: S4_CANDLE, opacity: 0.5 + glow * 0.4, filter: "blur(1px)" }} />
              {/* soft amber pool cast below each lamp (warm restaurant glow) */}
              <div style={{ position: "absolute", left: -34, top: 34, width: 68, height: 120, background: `radial-gradient(ellipse at 50% 0%, rgba(255,160,80,${0.10 + glow * 0.06}), transparent 70%)`, filter: "blur(4px)", pointerEvents: "none" }} />
            </div>
          );
        })}

        {/* ===================== FLAMING RANGE (right, behind) — flames ERUPT UP on every stab, pound & final shove ===================== */}
        <div style={{ position: "absolute", left: 690, top: 470, width: 322, height: 46, background: `linear-gradient(180deg,${STEELDK},#14171C)`, borderRadius: 8, zIndex: 4 }} />
        <div style={{ position: "absolute", left: 700, top: 300, width: 300, height: 74, borderRadius: "10px 10px 30px 30px", background: `linear-gradient(180deg,${STEELD},#181B21)`, boxShadow: "0 10px 18px -8px rgba(0,0,0,0.6)", zIndex: 4 }} />
        {Array.from({ length: 11 }, (_, i) => (
          <S4_Flame key={"fl" + i} lf={lf} x={720 + i * 27} y={470} ph={i * 1.7} scale={(1.0 + (i % 3) * 0.16) * (1 + S4_intensity * 0.35 + S4_flareUp * 0.14)} z={5} />
        ))}
        {/* tall SURGE flames that leap up on each hit (grease-fire flare-ups) */}
        {Array.from({ length: 6 }, (_, i) => (
          <S4_Flame key={"flare" + i} lf={lf} x={720 + i * 48} y={470} ph={i * 2.3 + 0.4} scale={(1.35 + (i % 2) * 0.22) * (1 + S4_flareUp * 0.24)} z={5} op={0.6 + Math.min(S4_flareUp, 6) * 0.06} />
        ))}
        {/* LATE grease-fire flare — an extra bank of tall flames that leaps up through the closing tail (fills 160-190) */}
        {lf > 158 && Array.from({ length: 5 }, (_, i) => (
          <S4_Flame key={"lateflare" + i} lf={lf} x={708 + i * 58} y={470} ph={i * 1.9 + 2.2} scale={(1.5 + (i % 2) * 0.3) * (0.55 + S4_lateFlareEnv * 0.9 + S4_finalKick * 0.18)} z={5} op={0.5 * S4_lateFlareEnv + S4_finalKick * 0.05} />
        ))}
        <div style={{ position: "absolute", left: 660, top: 300, width: 400, height: 230, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,130,30,${0.32 + S4_heat * 0.14 + S4_intensity * 0.12 + S4_flareUp * 0.05}), transparent 64%)`, filter: "blur(10px)", zIndex: 5, mixBlendMode: "screen" }} />
        {/* heat-haze shimmer rising off the range (subtle, dim, screen-blend) */}
        <div style={{ position: "absolute", left: 700, top: 250, width: 300, height: 200, background: "linear-gradient(180deg, rgba(255,160,90,0.12), transparent)", filter: "blur(3px)", transform: `translateX(${Math.sin(lf / 9) * 6}px) skewX(${Math.sin(lf / 11) * 3}deg)`, mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        <Embers lf={lf} n={26} w={560} base={520} />

        {/* ===================== DRAMATIC SPOTLIGHTS (steady, warm god-rays) ===================== */}
        <SpotCone x={S4_FOOD_CX} top={72} topW={64} botW={430} h={560} color={`rgba(255,185,100,${0.18 + S4_heat * 0.06})`} sway={2} lf={lf} pool={1} />
        <SpotCone x={200} top={72} topW={48} botW={300} h={560} color="rgba(255,120,60,0.13)" sway={2} lf={lf} />

        {/* ===================== HERO: RAMSAY CHEF (anticipates the dish, then jabs + lunges + dips into each pound) ===================== */}
        <div style={{ position: "absolute", left: 40, top: 352, transform: `translate(${S4_preStep + S4_lean * 40 + S4_lunge}px, ${S4_dip}px) rotate(${S4_preTilt + S4_lean * 4 + S4_headTilt + S4_poundTilt}deg)`, transformOrigin: "bottom center", zIndex: 8 }}>
          <div style={{ position: "absolute", left: 24, top: 40, width: 262, height: 262, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,150,70,0.38), transparent 66%)", filter: "blur(6px)", mixBlendMode: "screen" }} />
          <RamsayChef lf={lf} size={306} pose={S4_pose} tint={CLAY} yell={S4_yell} brow={1} nod={1} gaze={2} />
          {/* sweat bead beading on the brow and dripping (rage detail) */}
          {S4_sweat >= 0 && (
            <div style={{ position: "absolute", left: 150 + Math.sin(lf * 0.3) * 2, top: 78 + S4_sweat * 40, width: 8, height: 11, borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", background: "linear-gradient(180deg, rgba(214,235,255,0.95), rgba(150,190,225,0.9))", boxShadow: "0 1px 2px rgba(0,0,0,0.35), inset -1px -1px 2px rgba(255,255,255,0.6)", opacity: (1 - S4_sweat) * 0.95, zIndex: 9 }} />
          )}
        </div>

        {/* ===================== STAINLESS PASS COUNTER ===================== */}
        <div style={{ position: "absolute", left: 0, top: 640, width: 1012, height: 152, background: `linear-gradient(180deg,${STEEL} 0%,${STEELD} 40%,#2E343E 100%)`, zIndex: 10 }} />
        <div style={{ position: "absolute", left: 0, top: 632, width: 1012, height: 14, background: `linear-gradient(180deg,${STEEL_HI},${STEEL})`, boxShadow: "0 4px 8px -3px rgba(0,0,0,0.6)", zIndex: 11 }} />
        <div style={{ position: "absolute", left: 0, top: 630, width: 1012, height: 3, background: `linear-gradient(90deg,transparent,rgba(255,130,30,${0.45 + S4_heat * 0.3}),transparent)`, zIndex: 12 }} />

        {/* dish-entry SKID STREAKS + steam trail dragging behind the sliding dish (fills the 0-30 entry) */}
        {lf < 34 && [0, 1, 2, 3].map((i) => {
          const op = (1 - S4_slideP) * 0.55;
          return <div key={"skid" + i} style={{ position: "absolute", left: S4_dishX + 262 + i * 34, top: 556 + i * 12, width: 64 + i * 22, height: 5, borderRadius: 3, background: "linear-gradient(90deg, transparent, rgba(255,150,70,0.65))", opacity: op, filter: "blur(1px)", zIndex: 13, pointerEvents: "none" }} />;
        })}
        {lf < 36 && [0, 1, 2].map((i) => {
          const op = (1 - S4_slideP) * 0.4;
          return <div key={"etrail" + i} style={{ position: "absolute", left: S4_dishX + 244 + i * 48, top: 540 - i * 10, width: 42, height: 42, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,235,225,0.5), transparent 68%)", filter: "blur(6px)", opacity: op, mixBlendMode: "screen", zIndex: 13, pointerEvents: "none" }} />;
        })}

        {/* stacks of clean white plates on the pass (heat shimmer + JUMP on each pound / final shove) */}
        {[{ x: 118, n: 7 }, { x: 862, n: 6 }].map((st, si) => {
          const shim = Math.sin(lf / 10 + si * 2) * 1.2;
          return (
            <div key={"plates" + si} style={{ position: "absolute", left: st.x, top: 636 - st.n * 5, zIndex: 13, transform: `translateY(${shim - S4_pk * 2.2}px)` }}>
              {Array.from({ length: st.n }).map((_, k) => (
                <div key={"pl" + k} style={{ position: "absolute", left: 0, top: k * 5, width: 78, height: 12, borderRadius: "50%", background: k === 0 ? "linear-gradient(180deg,#FBF8F1,#DBD4C4)" : "linear-gradient(180deg,#EFEADD,#CFC7B4)", boxShadow: "0 2px 3px -1px rgba(0,0,0,0.4)", border: "1px solid rgba(0,0,0,0.12)" }} />
              ))}
              <div style={{ position: "absolute", left: 6, top: -6, width: 66, height: 16, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, rgba(255,160,80,${0.14 + S4_heat * 0.06}), transparent 70%)`, filter: "blur(2px)", pointerEvents: "none" }} />
            </div>
          );
        })}

        {/* ===================== THE "DONE WORK" DISH (slam settle + per-stab, per-pound & final tremble/hop) ===================== */}
        <div style={{ position: "absolute", left: S4_dishX + S4_dtx, top: 500 + S4_dtHop, transform: `scaleY(${S4_dishSettle}) rotate(${S4_dtRot}deg)`, transformOrigin: "bottom center", zIndex: 14 }}>
          {/* plate */}
          <div style={{ position: "absolute", left: -20, top: 60, width: 300, height: 118, borderRadius: "50%", background: "linear-gradient(180deg,#F6F3EC,#CFC7B4)", boxShadow: "0 12px 20px -8px rgba(0,0,0,0.55)" }} />
          <div style={{ position: "absolute", left: 24, top: 76, width: 212, height: 84, borderRadius: "50%", background: "linear-gradient(180deg,#E6E1D3,#D0C9B9)" }} />
          {/* the "food" mound */}
          <div style={{ position: "absolute", left: 68, top: 44, width: 124, height: 80, borderRadius: "50% 50% 45% 45%", background: `linear-gradient(158deg,${CLAYD},#6E2C0F)`, boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 96, top: 40, width: 60, height: 40, borderRadius: "50%", background: "#CF9544", opacity: 0.7 }} />
          {/* gashes torn into the mound as flags land */}
          {S4_landed >= 3 && (
            <svg width={160} height={110} viewBox="0 0 160 110" style={{ position: "absolute", left: 60, top: 34, overflow: "visible", zIndex: 2 }}>
              {[0, 1, 2].map((g) => (
                (S4_landed >= 3 + g * 3) && <path key={g} d={`M${30 + g * 34} 20 L${44 + g * 34} 78`} stroke="#2C1207" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
              ))}
            </svg>
          )}
        </div>

        {/* steam curls off the hot wrecked dish (secondary atmosphere) */}
        {lf > 40 && [0, 1, 2].map((i) => (
          <S4_Steam key={"stm" + i} lf={lf} x={S4_FOOD_CX - 40 + i * 44} y={548} ph={i * 1.3} scale={0.9 + i * 0.12} />
        ))}

        {/* ===================== SIGNATURE: PORCUPINE QUILLS erupt out of the mound (land ON the "11" beat) ===================== */}
        {/* rendered UNDER the labelled flags so the spiky mass reads as the porcupine silhouette; decorative + un-counted */}
        {S4_QUILLS.map((q, i) => <S4_Quill key={"quill" + i} lf={lf} q={q} ox={S4_quillOX} oy={S4_quillOY} />)}

        {/* ===================== RED FLAGS MACHINE-GUN IN (smoothly accumulating) ===================== */}
        {S4_FLAGS.map((f, i) => <S4_Flag key={"flag" + i} lf={lf} f={f} />)}

        {/* SIGNATURE porcupine-pop follow-through burst as the last quills stab in (numeric at) */}
        <Sparkles lf={lf} at={108 / 30} x={S4_FOOD_CX} y={500} n={16} spread={210} colors={[HKR_GLOW, GOLD, "#FFE59A", EMBER]} dur={0.85} />

        {/* stab-impact sparks — one small burst per flag */}
        {S4_FLAGS.map((f, i) => (
          <Sparkles key={"spk" + i} lf={lf} at={f.t / 30} x={S4_FOOD_CX - 130 + f.dx + 22} y={500 + f.dy} n={7} spread={110} colors={[HKR_GLOW, GOLD, "#FFE59A"]} dur={0.5} />
        ))}

        {/* ===================== FLYING CHUNKS / DEBRIS (dish tear-off) ===================== */}
        {S4_CHUNKS.map((c, i) => {
          if (lf < c.t) return null;
          const p = over(lf, c.t, 26, Easing.out(Easing.cubic));
          if (p >= 1) return null;
          const cx = S4_FOOD_CX + Math.cos(c.a) * c.sp * p;
          const cy = S4_FOOD_CY + Math.sin(c.a) * c.sp * p + 300 * p * p; // gravity
          return (
            <div key={"ck" + i} style={{ position: "absolute", left: cx, top: cy, width: c.s, height: c.s, borderRadius: i % 2 ? "50%" : 3, background: c.col, transform: `rotate(${c.rot * p}deg)`, opacity: 1 - p * 0.6, boxShadow: "0 2px 4px rgba(0,0,0,0.4)", zIndex: 25 }} />
          );
        })}

        {/* ===================== POUND DEBRIS BURSTS (knocked off the pass by each fist slam) ===================== */}
        {S4_POUND_CHUNKS.map((c, i) => {
          if (lf < c.t) return null;
          const p = over(lf, c.t, 24, Easing.out(Easing.cubic));
          if (p >= 1) return null;
          const cx = c.ox + Math.cos(c.a) * c.sp * p;
          const cy = c.oy + Math.sin(c.a) * c.sp * p + 320 * p * p; // gravity
          return (
            <div key={"pck" + i} style={{ position: "absolute", left: cx, top: cy, width: c.s, height: c.s, borderRadius: i % 2 ? "50%" : 3, background: c.col, transform: `rotate(${c.rot * p}deg)`, opacity: 1 - p * 0.6, boxShadow: "0 2px 4px rgba(0,0,0,0.4)", zIndex: 25 }} />
          );
        })}

        {/* ===================== FINALE DEBRIS (launched off the dish on the closing hero shove — fills the tail) ===================== */}
        {S4_LATE_CHUNKS.map((c, i) => {
          if (lf < c.t) return null;
          const p = over(lf, c.t, 26, Easing.out(Easing.cubic));
          if (p >= 1) return null;
          const cx = c.ox + Math.cos(c.a) * c.sp * p;
          const cy = c.oy + Math.sin(c.a) * c.sp * p + 320 * p * p; // gravity
          return (
            <div key={"lck" + i} style={{ position: "absolute", left: cx, top: cy, width: c.s, height: c.s, borderRadius: i % 2 ? "50%" : 3, background: c.col, transform: `rotate(${c.rot * p}deg)`, opacity: 1 - p * 0.6, boxShadow: "0 2px 4px rgba(0,0,0,0.4)", zIndex: 25 }} />
          );
        })}

        {/* rising embers off the wreckage (more, for a livelier stab-storm) */}
        <Embers lf={lf} n={20} w={300} base={560} />
        {/* stab, pound & final-driven ember PUFF over the dish (kick-scaled, screen-blend, warm) */}
        <div style={{ position: "absolute", left: S4_FOOD_CX - 90, top: 480, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,140,60,${0.10 + Math.min(S4_kick + S4_poundKick + S4_finalKick + S4_after, 7) * 0.05}), transparent 66%)`, filter: "blur(8px)", mixBlendMode: "screen", zIndex: 25, pointerEvents: "none" }} />

        {/* ===================== CHEF'S FIST POUNDING THE PASS (rhythmic accelerating slams) ===================== */}
        {S4_fistShow && (
          <div style={{ position: "absolute", left: 330, top: 506 - S4_fistLift, width: 92, height: 124, transform: `rotate(${-4 - Math.min(S4_fistLift, 100) * 0.08}deg)`, transformOrigin: "46px 124px", opacity: S4_fistOp, zIndex: 16 }}>
            {/* forearm (chef-white sleeve) */}
            <div style={{ position: "absolute", left: 18, top: -6, width: 52, height: 80, borderRadius: "26px 26px 14px 14px", background: `linear-gradient(160deg,${CHEFW},${CHEFWD})`, boxShadow: "inset -6px 0 10px rgba(0,0,0,0.18), 0 6px 12px -6px rgba(0,0,0,0.5)", transform: "rotate(6deg)" }} />
            {/* rolled cuff */}
            <div style={{ position: "absolute", left: 12, top: 52, width: 66, height: 22, borderRadius: 12, background: `linear-gradient(180deg,${CHEFW},${CHEFWD})`, boxShadow: "0 3px 6px -2px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.5)" }} />
            {/* fist (clay) */}
            <div style={{ position: "absolute", left: 14, top: 66, width: 64, height: 56, borderRadius: "20px 20px 16px 16px", background: `linear-gradient(158deg,${CLAY},${CLAYD})`, boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.28), 0 6px 12px -4px rgba(0,0,0,0.5)" }}>
              {/* knuckles */}
              {[0, 1, 2, 3].map((k) => (
                <div key={"kn" + k} style={{ position: "absolute", left: 6 + k * 13, top: 6, width: 11, height: 12, borderRadius: "50%", background: `linear-gradient(180deg,${lerpHex(CLAY, "#F0A968", 0.3)},${CLAYD})`, boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.25)" }} />
              ))}
              {/* knuckle creases */}
              {[0, 1, 2].map((k) => (
                <div key={"cr" + k} style={{ position: "absolute", left: 12 + k * 13, top: 20, width: 3, height: 16, borderRadius: 2, background: "rgba(0,0,0,0.22)" }} />
              ))}
              {/* thumb */}
              <div style={{ position: "absolute", left: -6, top: 20, width: 16, height: 22, borderRadius: "10px 6px 8px 10px", background: `linear-gradient(158deg,${CLAY},${CLAYD})`, boxShadow: "inset -2px 0 3px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        )}
        {/* pound SHOCKWAVE rings rippling across the steel pass */}
        {S4_POUNDS.map((pt, i) => {
          const age = lf - pt;
          if (age < 0 || age > 20) return null;
          const p = age / 20;
          const r = 24 + p * 170;
          return <div key={"ring" + i} style={{ position: "absolute", left: 374 - r, top: 632 - r * 0.34, width: 2 * r, height: r * 0.68, borderRadius: "50%", border: `3px solid rgba(255,150,70,${(1 - p) * 0.6})`, boxShadow: `0 0 12px rgba(255,120,40,${(1 - p) * 0.4})`, opacity: 1 - p, zIndex: 15, pointerEvents: "none" }} />;
        })}
        {/* pound IMPACT sparks (steel + fire flecks) */}
        {S4_POUNDS.map((pt, i) => (
          <Sparkles key={"pspk" + i} lf={lf} at={pt / 30} x={374} y={628} n={9} spread={130} colors={[GOLD, "#FFE59A", HKR_GLOW, STEEL_HI]} dur={0.5} />
        ))}

        {/* ===================== CLOSING SHOVE IMPACT — shockwave + sparks at the dish on frame 174 (fills the tail) ===================== */}
        {(() => {
          const age = lf - 174;
          if (age < 0 || age > 20) return null;
          const p = age / 20;
          const r = 26 + p * 160;
          return <div key="finalring" style={{ position: "absolute", left: 616 - r, top: 604 - r * 0.34, width: 2 * r, height: r * 0.68, borderRadius: "50%", border: `3px solid rgba(255,150,70,${(1 - p) * 0.6})`, boxShadow: `0 0 12px rgba(255,120,40,${(1 - p) * 0.4})`, opacity: 1 - p, zIndex: 15, pointerEvents: "none" }} />;
        })()}
        <Sparkles lf={lf} at={174 / 30} x={616} y={584} n={12} spread={150} colors={[GOLD, "#FFE59A", HKR_GLOW, STEEL_HI]} dur={0.6} />
        {/* late ember/spark bursts keeping the tail sparkling (continuous) */}
        <Sparkles lf={lf} at={168 / 30} x={S4_FOOD_CX + 40} y={556} n={9} spread={120} colors={[HKR_GLOW, GOLD, EMBER]} dur={0.7} />
        <Sparkles lf={lf} at={182 / 30} x={S4_FOOD_CX - 30} y={548} n={10} spread={130} colors={[HKR_GLOW, "#FFE59A", EMBER]} dur={0.7} />
        {/* aftershock spark burst (frame 186) — keeps flecks flying to the last frame as the hero settles */}
        <Sparkles lf={lf} at={186 / 30} x={S4_FOOD_CX + 6} y={552} n={11} spread={140} colors={[HKR_GLOW, GOLD, "#FFE59A", EMBER]} dur={0.8} />

        {/* ===================== RAGE SPEECH BUBBLES (Ramsay) ===================== */}
        {/* "IT'S RAW!" early, as he starts tearing in (tears@48) */}
        <SpeechBubble lf={lf} at={50 / 30} dur={1.5} x={252} y={318} text="IT'S RAW!" tail="down" tone="rage" size={30} />
        {/* "DISGUSTING!" as the flags pile up toward "11" */}
        <SpeechBubble lf={lf} at={96 / 30} dur={1.7} x={286} y={292} text="DISGUSTING!" tail="down" tone="rage" size={28} />

        {/* ===================== small "RAW" stamp ("This is raw") ===================== */}
        {lf > 82 && (
          <div style={{ position: "absolute", left: 236, top: 386, transform: `scale(${Math.min(1.1, S4_raw)}) rotate(-8deg)`, transformOrigin: "left center", zIndex: 30 }}>
            <div style={{ padding: "8px 22px", background: `linear-gradient(158deg,${HKRED},${HKREDD})`, color: "#FFF4E8", fontFamily: S4_SERIF, fontWeight: 900, fontSize: 46, borderRadius: 12, border: "5px solid " + INK, boxShadow: "0 10px 22px -8px rgba(0,0,0,0.6)", letterSpacing: 2, WebkitTextStroke: "1px #7C1F14" }}>RAW</div>
          </div>
        )}

        {/* ===================== CLOSING VERDICT: the "PERFECT" the first Claude called it — Ramsay SLASHES it (VO 164-190) ===================== */}
        {lf > 162 && (
          <div style={{ position: "absolute", left: 548, top: 300, transform: `scale(${Math.max(0.001, S4_perfPop)}) rotate(${-6 + S4_perfShake}deg)`, transformOrigin: "center", zIndex: 34, opacity: Math.min(1, S4_perfPop) }}>
            <div style={{ position: "relative", padding: "8px 22px", background: "linear-gradient(180deg, rgba(30,10,6,0.92), rgba(14,5,3,0.95))", border: `3px solid ${lerpHex(GREEN, HKRED, S4_slash)}`, borderRadius: 12, boxShadow: `0 10px 22px -8px rgba(0,0,0,0.6), 0 0 ${10 + S4_slash * 14}px rgba(226,59,46,${S4_slash * 0.4})` }}>
              <div style={{ fontFamily: S4_SERIF, fontWeight: 900, fontSize: 42, letterSpacing: 2, color: lerpHex("#BFE8CF", "#8894A2", S4_slash), WebkitTextStroke: "1px " + INK, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>PERFECT</div>
              {/* red slash sweeping across the word */}
              <div style={{ position: "absolute", left: 12, top: "50%", width: `${S4_slash * 88}%`, height: 8, background: `linear-gradient(90deg,${HKR_GLOW},${HKREDD})`, borderRadius: 4, transform: "translateY(-50%) rotate(-8deg)", transformOrigin: "left center", boxShadow: "0 0 10px rgba(255,80,50,0.7)", opacity: S4_slash > 0.02 ? 1 : 0 }} />
            </div>
          </div>
        )}
        {/* spark at the slash tip as it lands (motion, not a flash) */}
        <Sparkles lf={lf} at={180 / 30} x={648} y={318} n={8} spread={120} colors={[HKR_GLOW, GOLD, "#FFE59A"]} dur={0.55} />

        {/* ===================== PROBLEMS SCOREBOARD — races 0 -> 11, swell-and-settle, swells on "11" ===================== */}
        <div style={{ position: "absolute", left: 506, top: 150, transform: `translate(-50%,0) scale(${S4_boardScale})`, transformOrigin: "center top", zIndex: 35 }}>
          <div style={{ position: "relative", minWidth: 214, padding: "12px 30px 18px", textAlign: "center", background: "linear-gradient(180deg, rgba(30,10,6,0.90), rgba(14,5,3,0.94))", border: `3px solid ${HKRED}`, borderRadius: 18, boxShadow: `0 14px 30px -10px rgba(0,0,0,0.7), 0 0 ${18 + S4_intensity * 34 + S4_pk * 4 + S4_alarmOn * 20}px rgba(226,59,46,${0.35 + S4_intensity * 0.4})` }}>
            <div style={{ fontFamily: S4_SANS, fontWeight: 900, fontSize: 20, letterSpacing: 6, color: HKR_GLOW, textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}>PROBLEMS</div>
            <div style={{ marginTop: 2, height: 3, borderRadius: 2, background: `linear-gradient(90deg,transparent,${HKRED},transparent)` }} />
            <div style={{ marginTop: 6, fontFamily: S4_SERIF, fontWeight: 900, fontSize: 118, lineHeight: 0.92, color: "#FFF4E8", transform: `scale(${S4_numScale})`, transformOrigin: "center", WebkitTextStroke: "5px " + INK, textShadow: `0 0 ${16 + S4_intensity * 30}px rgba(255,130,30,${0.5 + S4_intensity * 0.4}), 0 10px 22px rgba(0,0,0,0.5)` }}>{S4_landed}</div>
          </div>
        </div>
        {/* sparkle swell around the number on the VO "11" (particles = motion, NOT a flash) */}
        <Sparkles lf={lf} at={110 / 30} x={506} y={252} n={20} spread={300} colors={[HKR_GLOW, GOLD, "#FFE59A", "#fff"]} dur={1.1} />

        {/* ===================== SIGNATURE: RED "PROBLEMS" ALARM BEACON — kicks on as the counter slams to 11 ===================== */}
        <S4_Alarm lf={lf} on={S4_alarmOn} kick={S4_alarmKick} />

        {/* ===================== VIGNETTE ===================== */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 130, background: "linear-gradient(180deg, rgba(26,9,5,0.5), transparent)", zIndex: 40, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(74% 66% at 50% 46%, transparent 50%, rgba(22,6,3,0.58) 100%)", zIndex: 40 }} />
      </div>
    </>
  );
};

// ===== S5 =====
// ===== S5 =====
// ===== S5 =====
// ===== S5 =====
// ===== S5 — WHY IT WORKS / NO EGO (warm fine-dining chef's-table judging) =====
// ONE continuous, calm shot with a gentle push-in. WARM chef's-table set kept intact:
// dark warm-wood panelling, brass dado rail, two glowing chandeliers, brass sconces w/
// live flames, burgundy wine racks, framed art, candlelit linen tables, dim line-cooks,
// drifting bokeh + steam + god-ray haze. BOTH halves are ALIVE the entire scene:
// LEFT = THE MAKER (plain clay Mascot) INFLATES bigger and bigger with pride while a heap of
// GOLD TROPHIES/BADGES stacks up beside it — then on "will always DEFEND IT" it OVER-inflates
// and BLOWS OUT: a party-blowout POP (air-puff ring + confetti + a party-horn tongue shooting
// from its mouth + "PFFT!") and it deflates/shrinks, slumping onto the counter (only pathetically
// re-puffing partway after) while it STILL awards itself trophies + a "10/10" badge (delusional).
// RIGHT = THE CRITIC (RamsayChef) leans and SWEEPS a magnifier back and forth the whole time,
// tagging FAULT AFTER FAULT — then on "only HUNTS FOR PROBLEMS" he YANKS out a long fault-
// CHECKLIST SCROLL that unrolls straight down past the counter, ticking off fault after fault.
// A gold VS medallion PULSES on the center seam. NO flashing, calm camera, ZERO cuts.
// LULL-FILL: opening 0-40 (maker early proud hops + rising pride stars before trophies;
// critic pre-leans in as a serving-cloche LIFTS off his plate revealing the food to inspect)
// + mid 100-128 gap (extra maker pride burst @120 + critic plate-sizzle scrutiny burst @114)
// + tail 232-255 (trophy-pile shine sweep + final victory/verdict sparkle bursts) + a
// crossing WAITER and a steady schedule of back-range FLAMBE flares keep the frame alive.
const S5_FONT = "'Fraunces','Playfair Display',Georgia,serif";
const S5_LEFT = 270;     // maker podium center x
const S5_RIGHT = 742;    // critic podium center x
const S5_BENCH = 690;    // top of the judging bench

// warm-restaurant literal palette (kept local to avoid any cold-studio bleed)
const S5_WOOD0 = "#3A2415";
const S5_WOOD1 = "#4E3018";
const S5_WOOD2 = "#5E3A1E";
const S5_WOODDK = "#1C1009";

// faults the magnifier exposes on the critic's plate — a STEADY stream, fault after fault
const S5_FAULTS = [
  { x: 690, y: 618, at: 66 },
  { x: 800, y: 606, at: 96 },
  { x: 726, y: 648, at: 130 },
  { x: 784, y: 640, at: 168 },
  { x: 662, y: 630, at: 200 },
  { x: 812, y: 634, at: 232 },
];
// gold trophies/medals/badges that STACK UP beside the proud maker, one after another
const S5_TROPHIES = [
  { x: 150, y: 682, s: 0.92, at: 44, kind: 0 },
  { x: 372, y: 682, s: 0.90, at: 72, kind: 1 },
  { x: 208, y: 684, s: 0.84, at: 100, kind: 2 },
  { x: 422, y: 680, s: 0.82, at: 128, kind: 0 },
  { x: 176, y: 652, s: 0.80, at: 158, kind: 1 },
  { x: 398, y: 652, s: 0.78, at: 188, kind: 2 },
  { x: 120, y: 656, s: 0.74, at: 214, kind: 0 },
  { x: 150, y: 626, s: 0.72, at: 236, kind: 1 },
];
// tiny cracks blooming under the (blind) inflating maker
const S5_CRACKS = [
  "M0 0 l14 -20 l-8 -13",
  "M30 4 l-11 -18 l13 -12",
  "M58 0 l6 -20 l-9 -10",
  "M84 2 l-9 -19 l12 -9",
];
// fault-checklist the critic YANKS out as a scroll on the "hunts for problems" beat
const S5_CHECKLIST = [
  "Overcooked",
  "No seasoning",
  "Cold in the center",
  "Sloppy plating",
  "Raw underneath",
  "Wrong sauce",
  "Careless garnish",
];
// back-range FLAMBE flares on a steady schedule — keep the open kitchen roaring the WHOLE
// scene (incl. the quiet opening + tail), so the frame is never dead behind the podiums
const S5_FLARES = [
  { x: 132, y: 118, at: 10, s: 0.9 },
  { x: 880, y: 118, at: 58, s: 0.9 },
  { x: 152, y: 116, at: 104, s: 0.85 },
  { x: 868, y: 116, at: 150, s: 0.9 },
  { x: 140, y: 118, at: 198, s: 0.85 },
  { x: 878, y: 118, at: 240, s: 0.95 },
];

// --- self-contained cooking-life helpers (no reliance on toolkit globals) ---
const S5_SteamJet: React.FC<{ lf: number; x: number; y: number; scale?: number; tint?: string; ph?: number; z?: number }> = ({ lf, x, y, scale = 1, tint = "#F0DCC2", ph = 0, z = 2 }) => (
  <svg width={72 * scale} height={124 * scale} viewBox="0 0 72 124" style={{ position: "absolute", left: x - 36 * scale, top: y - 116 * scale, zIndex: z, pointerEvents: "none" }}>
    {[0, 1, 2, 3].map((i) => {
      const t = ((lf * 0.85 + i * 26 + ph * 11) % 104) / 104; // 0..1 rising loop
      const yy = 112 - t * 108;
      const op = Math.sin(t * Math.PI) * 0.4;
      const r = 7 + t * 15;
      const dx = Math.sin(t * 6.28 + i * 1.3 + ph) * 9;
      return <circle key={i} cx={36 + dx} cy={yy} r={r} fill={tint} opacity={op} />;
    })}
  </svg>
);

// warm candle / sconce flame (teardrop, flickers)
const S5_Flame: React.FC<{ lf: number; x: number; y: number; scale?: number; ph?: number; z?: number }> = ({ lf, x, y, scale = 1, ph = 0, z = 2 }) => {
  const flick = 0.82 + 0.18 * Math.sin(lf / 3.4 + ph) + 0.06 * Math.sin(lf / 1.9 + ph);
  const sway = Math.sin(lf / 5.2 + ph) * 3;
  return (
    <svg width={46 * scale} height={66 * scale} viewBox="0 0 46 66" style={{ position: "absolute", left: x - 23 * scale, top: y - 58 * scale, zIndex: z, pointerEvents: "none", filter: "drop-shadow(0 0 10px rgba(255,180,90,0.7))" }}>
      <path d={`M23 64 C6 47 13 30 ${23 + sway} 4 C35 28 41 47 23 64 Z`} fill={FLAME} opacity={flick} />
      <path d={`M23 62 C13 47 17 33 ${23 + sway} 15 C31 31 35 47 23 62 Z`} fill={FLAMEY} opacity={flick} />
      <path d={`M23 58 C18 48 20 37 ${23 + sway * 0.6} 25 C27 37 29 48 23 58 Z`} fill={FLAME_CORE} opacity={flick} />
    </svg>
  );
};

// a quick flambe flare that whooshes up off the back range then dies (deterministic, over-based)
const S5_Flare: React.FC<{ lf: number; x: number; y: number; at: number; scale?: number }> = ({ lf, x, y, at, scale = 1 }) => {
  const t = over(lf, at, 17, Easing.out(Easing.cubic));
  if (t <= 0 || t >= 1) return null;
  const rise = t * 50;
  const w = interpolate(t, [0, 0.32, 1], [0.35, 1.18, 0.18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = Math.sin(t * Math.PI);
  const flick = 1 + 0.12 * Math.sin(lf * 1.7 + at);
  return (
    <svg width={100 * scale} height={130 * scale} viewBox="0 0 100 130" style={{ position: "absolute", left: x - 50 * scale, top: y - 100 * scale - rise, zIndex: 2, pointerEvents: "none", filter: "drop-shadow(0 0 14px rgba(255,140,50,0.85))" }}>
      <g transform={`translate(50,100) scale(${w * flick}, ${0.66 + 0.6 * t})`} opacity={op}>
        <path d="M0 8 C-26 -18 -14 -48 0 -78 C16 -48 26 -18 0 8 Z" fill={EMBER} />
        <path d="M0 6 C-20 -18 -11 -42 0 -66 C13 -42 20 -18 0 6 Z" fill={FLAME} />
        <path d="M0 2 C-12 -18 -7 -38 0 -54 C9 -38 14 -18 0 2 Z" fill={FLAMEY} />
        <path d="M0 -4 C-6 -16 -4 -32 0 -44 C6 -32 8 -16 0 -4 Z" fill={FLAME_CORE} />
      </g>
      {[0, 1, 2].map((i) => {
        const et = (t + i * 0.33) % 1;
        return <circle key={i} cx={50 + Math.sin(i * 2.1 + at) * 18} cy={92 - et * 88} r={2.4 - et * 1.4} fill={FLAME_CORE} opacity={op * (1 - et) * 0.9} />;
      })}
    </svg>
  );
};

const S5_Cook: React.FC<{ lf: number; x: number; y: number; tint: string; ph?: number; flip?: boolean; scale?: number; op?: number }> = ({ lf, x, y, tint, ph = 0, flip, scale = 1, op = 0.5 }) => (
  <div style={{ position: "absolute", left: x - 30 * scale, top: y + bob(lf, 4 * scale, 68 + ph * 6, ph), width: 60 * scale, height: 60 * scale, opacity: op, filter: "brightness(0.9) saturate(0.9) blur(0.6px)", transform: flip ? "scaleX(-1)" : "none", zIndex: 2, pointerEvents: "none" }}>
    <Mascot lf={lf} size={60 * scale} tint={tint} gaze={0} nodAmp={2} />
  </div>
);

// a WAITER mascot carrying a domed plate, crossing the far back the whole scene (background life)
const S5_Waiter: React.FC<{ lf: number }> = ({ lf }) => {
  const p = ((lf * 2.6) % 1220) / 1220;
  const x = -70 + p * 1150;
  const yb = 104 + bob(lf, 3, 52, 0.4);
  const stride = Math.sin(lf / 7) * 3;
  return (
    <div style={{ position: "absolute", left: x, top: yb + stride, width: 56, height: 56, opacity: 0.4, filter: "brightness(0.92) saturate(0.9) blur(0.7px)", zIndex: 2, pointerEvents: "none" }}>
      <Mascot lf={lf} size={56} tint="#8A5A34" gaze={0} nodAmp={2} />
      {/* domed plate held out front */}
      <svg width={44} height={26} viewBox="0 0 44 26" style={{ position: "absolute", left: -16, top: 4 }}>
        <ellipse cx={22} cy={20} rx={20} ry={5} fill="#EFE7D4" />
        <path d="M6 20 A16 16 0 0 1 38 20 Z" fill="#D8CDB4" stroke="#B7AE99" strokeWidth={1.5} />
        <circle cx={22} cy={5} r={2.2} fill="#C9BE9E" />
      </svg>
    </div>
  );
};

// hanging copper-pot rail for warm ceiling depth (deterministic)
const S5_PotRail: React.FC<{ x: number; ph?: number; lf: number }> = ({ x, ph = 0, lf }) => (
  <svg width={220} height={78} viewBox="0 0 220 78" style={{ position: "absolute", left: x, top: 20, zIndex: 1, opacity: 0.5, pointerEvents: "none" }}>
    <rect x={0} y={4} width={220} height={5} rx={2.5} fill={BRASSD} />
    {[0, 1, 2, 3].map((i) => {
      const cx = 26 + i * 56 + Math.sin(lf / 40 + i * 1.7 + ph) * 2.2;
      const r = 16 - (i % 2) * 3;
      return (
        <g key={i}>
          <line x1={cx} y1={9} x2={cx} y2={22} stroke={BRASSD} strokeWidth={2} />
          <circle cx={cx} cy={42} r={r} fill="#9C5A2E" stroke={BRASS} strokeWidth={3} />
          <ellipse cx={cx - r * 0.4} cy={42 - r * 0.3} rx={r * 0.34} ry={r * 0.5} fill="#E8B87A" opacity={0.6} />
          <line x1={cx + r} y1={40} x2={cx + r + 16} y2={44} stroke={BRASS} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    })}
  </svg>
);

// warm chandelier with brass frame + flickering candle glows + crystal twinkle
const S5_Chandelier: React.FC<{ lf: number; x: number; top?: number; scale?: number; ph?: number }> = ({ lf, x, top = -4, scale = 1, ph = 0 }) => {
  const sway = Math.sin(lf / 46 + ph) * 2.0;
  const glow = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(lf / 18 + ph));
  const tips = [
    { tx: 34, ty: 62 }, { tx: 54, ty: 74 }, { tx: 75, ty: 78 }, { tx: 96, ty: 74 }, { tx: 116, ty: 62 },
  ];
  return (
    <div style={{ position: "absolute", left: x, top, transform: `translateX(-50%) rotate(${sway}deg) scale(${scale})`, transformOrigin: "50% 0%", zIndex: 2, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -85, top: 26, width: 170, height: 150, borderRadius: "50%", background: `radial-gradient(circle at 50% 30%, rgba(255,196,110,${0.34 * glow}), transparent 66%)`, filter: "blur(4px)" }} />
      <svg width={150} height={140} viewBox="0 0 150 140" style={{ position: "absolute", left: -75, top: 0 }}>
        <line x1={75} y1={0} x2={75} y2={30} stroke={BRASSD} strokeWidth={3} />
        <ellipse cx={75} cy={40} rx={8} ry={12} fill={BRASS} />
        <path d="M75 44 C40 50 30 62 34 66" fill="none" stroke={BRASSD} strokeWidth={3} />
        <path d="M75 44 C56 54 50 68 54 78" fill="none" stroke={BRASSD} strokeWidth={3} />
        <path d="M75 46 L75 78" stroke={BRASSD} strokeWidth={3} />
        <path d="M75 44 C94 54 100 68 96 78" fill="none" stroke={BRASSD} strokeWidth={3} />
        <path d="M75 44 C110 50 120 62 116 66" fill="none" stroke={BRASSD} strokeWidth={3} />
        {/* crystal drops that twinkle */}
        {[38, 62, 88, 112].map((cxv, i) => (
          <circle key={i} cx={cxv} cy={92 + (i % 2) * 8} r={2.4} fill="#FFE9C0" opacity={0.4 + 0.5 * (0.5 + 0.5 * Math.sin(lf / 9 + i * 1.7 + ph))} />
        ))}
      </svg>
      {tips.map((t, i) => (
        <S5_Flame key={i} lf={lf} x={t.tx - 75 + 0} y={t.ty} scale={0.42} ph={ph + i * 0.9} z={3} />
      ))}
    </div>
  );
};

// brass wall sconce with a live flame + warm wall glow
const S5_Sconce: React.FC<{ lf: number; x: number; y: number; ph?: number; scale?: number }> = ({ lf, x, y, ph = 0, scale = 1 }) => {
  const glow = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(lf / 14 + ph));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${scale})`, transformOrigin: "50% 100%", zIndex: 1, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -46, top: -46, width: 92, height: 100, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%, rgba(255,178,80,${0.30 * glow}), transparent 68%)`, filter: "blur(3px)" }} />
      <svg width={40} height={54} viewBox="0 0 40 54" style={{ position: "absolute", left: -20, top: 0 }}>
        <rect x={17} y={20} width={6} height={30} rx={3} fill={BRASSD} />
        <path d="M8 22 Q20 8 32 22" fill="none" stroke={BRASS} strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={20} cy={22} rx={9} ry={4} fill={BRASSD} />
      </svg>
      <S5_Flame lf={lf} x={0} y={22} scale={0.5} ph={ph} z={2} />
    </div>
  );
};

// burgundy wine rack (diamond lattice + bottle necks)
const S5_WineRack: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <svg width={116 * scale} height={112 * scale} viewBox="0 0 116 112" style={{ position: "absolute", left: x, top: y, zIndex: 1, opacity: 0.9, pointerEvents: "none" }}>
    <rect x={2} y={2} width={112} height={108} rx={6} fill="#241206" stroke={BRASSD} strokeWidth={3} />
    {[0, 1, 2, 3, 4].map((r) =>
      [0, 1, 2, 3, 4].map((c) => (
        <line key={`a${r}${c}`} x1={8 + c * 24} y1={8 + r * 24} x2={32 + c * 24} y2={32 + r * 24} stroke={BRASSD} strokeWidth={2} opacity={0.55} />
      ))
    )}
    {[0, 1, 2, 3].map((r) =>
      [0, 1, 2, 3].map((c) => {
        const cols = ["#6E1420", "#5A0E1A", "#7A1E12", "#4A0C16"];
        return <circle key={`b${r}${c}`} cx={20 + c * 24} cy={20 + r * 24} r={7} fill={cols[(r + c) % 4]} stroke="#120306" strokeWidth={1.5} />;
      })
    )}
    <rect x={0} y={104} width={116} height={8} rx={3} fill={BRASSD} />
  </svg>
);

// candlelit linen table with wine glass (mid-depth atmosphere)
const S5_DinerTable: React.FC<{ lf: number; x: number; y: number; scale?: number; ph?: number; op?: number }> = ({ lf, x, y, scale = 1, ph = 0, op = 0.5 }) => {
  const glint = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(lf / 11 + ph));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${scale})`, transformOrigin: "50% 100%", opacity: op, filter: "blur(0.6px)", zIndex: 2, pointerEvents: "none" }}>
      <svg width={120} height={70} viewBox="0 0 120 70" style={{ position: "absolute", left: -60, top: 8 }}>
        <ellipse cx={60} cy={54} rx={56} ry={13} fill="#EBE3D0" stroke="#C9BE9E" strokeWidth={2} />
        <path d="M22 54 L36 66 L84 66 L98 54 Z" fill="#DCD2B8" opacity={0.7} />
        {/* wine glass */}
        <path d="M78 30 q10 0 10 -12 h-20 q0 12 10 12 Z" fill="#7A1620" opacity={0.85} />
        <path d="M68 18 h20" stroke="#B98A3A" strokeWidth={1.5} opacity={0.6} />
        <line x1={78} y1={30} x2={78} y2={48} stroke="#CBBE96" strokeWidth={2} />
        <ellipse cx={78} cy={50} rx={9} ry={3} fill="#CBBE96" />
        <ellipse cx={73} cy={22} rx={2} ry={5} fill="#FFE0C0" opacity={glint} />
      </svg>
      {/* candle */}
      <div style={{ position: "absolute", left: -8, top: 12, width: 16, height: 22, borderRadius: 3, background: "linear-gradient(180deg,#F4E9CE,#D9C79C)" }} />
      <S5_Flame lf={lf} x={0} y={16} scale={0.34} ph={ph} z={3} />
    </div>
  );
};

// framed art on the warm wall
const S5_Frame: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 74, h = 92 }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", left: x, top: y, zIndex: 1, opacity: 0.72, pointerEvents: "none" }}>
    <rect x={2} y={2} width={w - 4} height={h - 4} rx={4} fill="#160B05" stroke={BRASSD} strokeWidth={5} />
    <rect x={10} y={10} width={w - 20} height={h - 20} rx={2} fill="url(#s5art)" />
    <circle cx={w * 0.42} cy={h * 0.42} r={w * 0.16} fill="#E7B24C" opacity={0.5} />
  </svg>
);

// a gold trophy / medal / star-badge that springs in and settles onto the pile
const S5_Trophy: React.FC<{ lf: number; x: number; y: number; s: number; at: number; kind: number }> = ({ lf, x, y, s, at, kind }) => {
  if (lf < at) return null;
  const pop = Math.min(1.1, spr(lf, at, 10, 240));
  const settle = 1 + 0.02 * Math.sin(lf / 7 + x); // faint living shimmer once landed
  const sh = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(lf / 8 + x)); // travelling shine
  const W = 72, H = 96;
  return (
    <div style={{ position: "absolute", left: x - (W * s) / 2, top: y - H * s, width: W * s, height: H * s, transform: `scale(${pop * settle})`, transformOrigin: "50% 100%", zIndex: 21, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))", pointerEvents: "none" }}>
      <svg width={W * s} height={H * s} viewBox="0 0 72 96">
        {kind === 0 && (
          <g>
            <rect x={24} y={88} width={24} height={7} rx={2} fill={BRASSD} />
            <rect x={28} y={80} width={16} height={9} rx={2} fill={GOLD} />
            <rect x={34} y={66} width={4} height={16} fill={BRASSD} />
            <path d="M20 26 q-12 2 -8 16 q2 6 8 4" fill="none" stroke={GOLD} strokeWidth={4} />
            <path d="M52 26 q12 2 8 16 q-2 6 -8 4" fill="none" stroke={GOLD} strokeWidth={4} />
            <path d="M20 24 h32 v10 a16 20 0 0 1 -32 0 z" fill={GOLD} stroke={BRASSD} strokeWidth={1.5} />
            <path d="M20 24 h32 v6 a16 12 0 0 1 -32 0 z" fill="#FBE39A" />
            <path d="M36 27 l2.4 5 5.6 .6 -4.1 3.8 1.2 5.6 -5.1 -3 -5.1 3 1.2 -5.6 -4.1 -3.8 5.6 -.6 z" fill={BRASSD} />
            <ellipse cx={27} cy={31} rx={2.6} ry={7} fill="#fff" opacity={sh} />
          </g>
        )}
        {kind === 1 && (
          <g>
            <path d="M28 8 L36 42 L30 48 Z" fill={HKRED} />
            <path d="M44 8 L36 42 L42 48 Z" fill="#E23B2E" />
            <circle cx={36} cy={62} r={24} fill={GOLD} stroke={BRASSD} strokeWidth={3} />
            <circle cx={36} cy={62} r={16} fill="#FBE39A" />
            <path d="M36 50 l3 6 7 .8 -5.1 4.9 1.4 6.9 -6.3 -3.7 -6.3 3.7 1.4 -6.9 -5.1 -4.9 7 -.8 z" fill={BRASSD} />
            <ellipse cx={26} cy={54} rx={3.4} ry={8} fill="#fff" opacity={sh} />
          </g>
        )}
        {kind === 2 && (
          <g>
            <path d="M30 58 L26 84 L34 76 Z" fill={HKRED} />
            <path d="M42 58 L46 84 L38 76 Z" fill="#E23B2E" />
            <path d="M36 12 l7 16 18 2 -13 12 4 18 -16 -9 -16 9 4 -18 -13 -12 18 -2 z" fill={GOLD} stroke={BRASSD} strokeWidth={2} />
            <circle cx={36} cy={40} r={10} fill="#FBE39A" />
            <path d="M36 33 l1.9 4 4.3 .5 -3.2 3 .9 4.3 -3.9 -2.3 -3.9 2.3 .9 -4.3 -3.2 -3 4.3 -.5 z" fill={BRASSD} />
            <ellipse cx={28} cy={30} rx={3} ry={7} fill="#fff" opacity={sh} />
          </g>
        )}
      </svg>
    </div>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // gentle, continuous push-in across the whole scene (calm camera, no punches)
  const S5_cam = 1 + 0.042 * over(lf, 0, 232, Easing.inOut(Easing.cubic));

  // drifting warm bokeh motes (deterministic)
  const S5_dust = Array.from({ length: 18 }, (_, i) => ({
    x: 46 + seed(i * 3.1) * 920,
    y: 70 + seed(i * 5.7) * 540,
    r: 1.6 + seed(i * 2.3) * 3.2,
    sp: 0.4 + seed(i * 7.9) * 1.0,
    ph: seed(i * 1.7) * 6.28,
  }));
  const intro = Math.min(1, spr(lf, 2, 14, 200));
  const introS = 0.965 + 0.035 * intro;

  // ---- MAKER: anticipation -> proud puff (bigger & bigger) -> BLOWOUT POP on "defend it" -> saggy ----
  const infl = over(lf, 40, 40, Easing.out(Easing.cubic));            // proud puff peaks ~lf80 ("...will always")
  const S5_deflate = over(lf, 84, 9, Easing.out(Easing.cubic));       // sudden party-blowout collapse ~84-93 ("DEFEND IT")
  const S5_burst = Math.max(0, over(lf, 82, 3) - over(lf, 86, 7));    // the sharp POP instant (squash spike)
  const swell = over(lf, 100, 132, Easing.inOut(Easing.cubic));       // only pathetically re-puffs partway after
  const strain = over(lf, 214, 34, Easing.inOut(Easing.cubic));       // late over-pressure wobble (delusional re-tension)
  // small crouch/anticipation right before the puff (dips ~lf30-48)
  const S5_antic = Math.max(0, over(lf, 30, 9, Easing.inOut(Easing.cubic)) - over(lf, 40, 10, Easing.inOut(Easing.cubic)));
  // a slow settle overshoot pulse after the puff peaks (secondary follow-through)
  const S5_settle = (over(lf, 84, 10) - over(lf, 100, 20)) * (0.5 + 0.5 * Math.sin(lf / 4.4));
  const wob = 0.5 + 0.5 * Math.sin(lf / 6.6);
  const S5_tremble = strain * Math.sin(lf * 2.3);                     // fast jitter near the late re-tension
  // overall proud SIZE: grows to a big puff, BLOWS OUT (collapses under baseline), then re-puffs only partway
  const S5_grow = 0.52 * infl;                       // +52% at the proud peak
  const S5_blow = S5_deflate * (0.52 + 0.16);        // strip the whole puff + sag below baseline
  const S5_repuff = 0.22 * swell;                    // pathetic partial re-inflate afterwards
  const S5_size = 1 - 0.10 * S5_antic + S5_grow - S5_blow + S5_repuff;
  // squash-&-stretch on the POP instant (briefly wide + flat as the air blasts out)
  const makerSY = S5_size + 0.045 * infl * wob + 0.05 * S5_settle + 0.025 * S5_tremble - 0.18 * S5_burst;
  const makerSX = S5_size * (1 + 0.10 * S5_antic) + 0.06 * infl * Math.sin(lf / 6.1 + 1.2) - 0.05 * S5_settle + 0.03 * S5_tremble + 0.24 * S5_burst;
  const proudRise = infl * 12 + swell * 8 - 7 * S5_antic - 16 * S5_deflate;  // it SINKS/slumps onto the counter when it pops
  // LULL-FILL (opening 0-40): two eager little PROUD HOPS before the big puff so the maker is
  // never just standing there while the trophies haven't started yet
  const S5_earlyHop = (over(lf, 6, 7, Easing.out(Easing.cubic)) - over(lf, 15, 9, Easing.inOut(Easing.cubic))) * 11
                    + (over(lf, 22, 6, Easing.out(Easing.cubic)) - over(lf, 31, 9, Easing.inOut(Easing.cubic))) * 8;
  // LULL-FILL (mid 100-128): a small proud bounce between the badge-pop and the hunt beat so
  // the maker keeps physically reacting during the widest new-event gap
  const S5_midHop = (over(lf, 110, 7, Easing.out(Easing.cubic)) - over(lf, 119, 10, Easing.inOut(Easing.cubic))) * 7;
  // shine sweep travelling across the puffed body as it inflates
  const S5_shineX = 20 + 30 * over(lf, 44, 46, Easing.inOut(Easing.cubic));
  const S5_shineY = 22 - 8 * over(lf, 44, 46, Easing.inOut(Easing.cubic));
  // cracks it can't see, bloom in smoothly (staggered per crack, computed in-map)
  const crackPulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(lf / 7.5));
  // delusional 10/10 badge eases on + keeps a proud throb ("tells you what you want to hear")
  const badge = Math.min(1.14, spr(lf, 100, 11, 210));
  const badgeThrob = 1 + 0.05 * (0.5 + 0.5 * Math.sin(lf / 9));

  // ===== SIGNATURE MOMENT A — the PARTY-BLOWOUT POP on "will always DEFEND IT" (lf ~82-90) =====
  const S5_popRing = over(lf, 82, 24, Easing.out(Easing.cubic));                                  // expanding air-puff ring
  const S5_popShoot = Math.max(0, over(lf, 82, 5, Easing.out(Easing.back(2))) - over(lf, 90, 12, Easing.inOut(Easing.cubic))); // party-horn tongue shoots then recoils
  const S5_popTxt = Math.max(0, over(lf, 82, 4) - over(lf, 92, 12));                              // "PFFT!" onomatopoeia
  // anchor for the pop FX = the maker's face/body center (tracks its slump)
  const S5_bodyTop = S5_BENCH - 26 - proudRise - S5_earlyHop - S5_midHop;
  const S5_cx = S5_LEFT;
  const S5_cy = S5_bodyTop - 112;
  // confetti/paper bits flung out of the blowout (deterministic)
  const S5_bits = Array.from({ length: 16 }, (_, i) => ({
    a: seed(i * 1.7) * 6.283,
    d: 44 + seed(i * 2.9) * 150,
    c: [GOLD, GREEN, PINK, SKY, "#fff", HKRED][Math.floor(seed(i * 3.3) * 6)],
    rot: seed(i * 4.1) * 360,
    w: 6 + seed(i * 5.5) * 8,
  }));

  // ---- CRITIC: leans & SWEEPS the magnifier back and forth the WHOLE time ----
  const sweepStart = 36;
  const gsweep = Math.max(0, lf - sweepStart);
  const hunt = over(lf, 150, 34, Easing.inOut(Easing.cubic));         // intensifies on the "hunts" beat
  const sweepOsc = Math.sin(gsweep / 15);                             // -1..1 back and forth
  const S5_amp = 118 + 46 * hunt;
  const glassX = S5_RIGHT + sweepOsc * S5_amp + Math.sin(gsweep / 6) * 6;
  const glassY = 604 + Math.cos(gsweep / 9) * 22 + 10 * hunt * Math.sin(gsweep / 5);
  const S5_glintT = (gsweep / 26) % 1;                               // travelling lens glint 0..1
  const nearFault = S5_FAULTS.some((f) => lf >= f.at - 4 && lf <= f.at + 9);
  // the critic leans toward wherever the glass is scanning (full-body performance)
  const S5_leanX = sweepOsc * (10 + 6 * hunt);
  const S5_leanR = sweepOsc * (3 + 1.6 * hunt);
  // LULL-FILL (opening 0-40): before the sweep engages the critic already LEANS IN over his
  // plate as its serving cloche lifts, so he isn't held still waiting for frame 36
  const S5_preLeanX = (over(lf, 8, 11, Easing.out(Easing.cubic)) - over(lf, 26, 12, Easing.inOut(Easing.cubic))) * 9;
  const S5_preLeanR = (over(lf, 8, 11, Easing.out(Easing.cubic)) - over(lf, 26, 12, Easing.inOut(Easing.cubic))) * 2.6;
  // serving-cloche lift off the critic's plate (reveals the dish to be inspected)
  const S5_lift = over(lf, 6, 24, Easing.out(Easing.cubic));
  // two short yell pulses on the sharpest fault beats
  const chefYell = Math.max(ramp(lf, 176, 184) - ramp(lf, 196, 204), ramp(lf, 230, 238) - ramp(lf, 246, 252)) * 0.5;
  // a bead of sweat slides on the rage beat (delightful detail)
  const S5_sweat = Math.max(0, over(lf, 186, 22, Easing.inOut(Easing.cubic)) - over(lf, 214, 16));
  // NO EGO chip eases in on "no ego"
  const noEgo = Math.min(1.12, spr(lf, 221, 11, 210));

  // ===== SIGNATURE MOMENT B — the critic YANKS a long fault-CHECKLIST SCROLL down past the counter =====
  // lands on "only HUNTS FOR problems" (hunts@189 / for@196 / problems@201): unrolls 189..217
  const S5_scroll = over(lf, 189, 28, Easing.out(Easing.cubic));      // 0..1 unroll amount
  const S5_scrollYank = (over(lf, 189, 4, Easing.out(Easing.cubic)) - over(lf, 197, 12, Easing.inOut(Easing.cubic))) * 12; // little yank bounce
  const S5_paperH = S5_scroll * 356;                                 // paper height grows down past the bench

  // LULL-FILL (tail 232-255): a shine sweep rakes across the finished trophy pile + verdict pop
  const S5_tailShine = over(lf, 236, 20, Easing.inOut(Easing.cubic));

  // focal glows (deterministic)
  const makerGlow = 0.5 + 0.14 * Math.sin(lf / 20) + 0.24 * infl + 0.18 * swell;
  const criticGlow = 0.5 + 0.18 * Math.sin(lf / 8 + 1.1) + (nearFault ? 0.3 : 0);
  // slow candlelight breathing over the whole room
  const S5_roomPulse = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(lf / 34));
  // VS medallion pulse (rhythmic scale + glow)
  const S5_vsPulse = 0.5 + 0.5 * Math.sin(lf / 12);

  const colCard = (side: "L" | "R") => ({
    position: "absolute" as const,
    top: 138,
    left: side === "L" ? 22 : 528,
    width: 462,
    height: 566,
    borderRadius: 26,
    background:
      side === "L"
        ? "linear-gradient(168deg, rgba(28,52,40,0.60), rgba(40,26,14,0.44))"
        : "linear-gradient(168deg, rgba(64,26,26,0.60), rgba(42,24,12,0.44))",
    border: `3px solid ${side === "L" ? GREEN : HKRED}`,
    boxShadow: `0 26px 54px -18px rgba(0,0,0,0.7), inset 0 0 52px ${side === "L" ? "rgba(63,158,116,0.16)" : "rgba(226,59,46,0.18)"}, inset 0 2px 0 rgba(255,220,170,0.10)`,
    transform: `scale(${introS})`,
    transformOrigin: side === "L" ? "0% 50%" : "100% 50%",
    overflow: "hidden" as const,
    zIndex: 6,
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `scale(${S5_cam})`, transformOrigin: "50% 46%" }}>
      {/* ================= WARM FINE-DINING CHEF'S-TABLE BACKGROUND ================= */}
      {/* deep warm-wood room (NOT grey/blue) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${S5_WOOD0} 0%,#241408 48%,${S5_WOODDK} 100%)`, zIndex: 0 }} />
      {/* two overhead warm chandelier blooms over each podium */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(58% 46% at 27% 2%, rgba(255,190,100,${0.26 * S5_roomPulse}), transparent 62%)`, zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(58% 46% at 73% 2%, rgba(255,190,100,${0.26 * S5_roomPulse}), transparent 62%)`, zIndex: 0 }} />
      {/* slow breathing warm god-ray wash for atmospheric depth */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(84% 62% at 50% -6%, rgba(255,205,130,0.14), transparent 60%)", opacity: 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(lf / 40)), zIndex: 0, pointerEvents: "none" }} />
      {/* warm candlelit floor pool */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 60% at 50% 116%, rgba(200,120,50,0.30), transparent 60%)", zIndex: 0 }} />

      {/* warm-wood back-wall panelling + brass dado rail + drifting bokeh */}
      <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 1 }} viewBox="0 0 1012 792">
        <defs>
          <linearGradient id="s5wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={S5_WOOD2} stopOpacity={0.9} />
            <stop offset="1" stopColor={S5_WOODDK} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="s5plank" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={S5_WOOD1} />
            <stop offset="0.5" stopColor={S5_WOOD2} />
            <stop offset="1" stopColor={S5_WOOD0} />
          </linearGradient>
          <linearGradient id="s5art" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4A2A12" />
            <stop offset="1" stopColor="#2A1608" />
          </linearGradient>
          <linearGradient id="s5dome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4EFE2" />
            <stop offset="1" stopColor="#C8B48E" />
          </linearGradient>
          <linearGradient id="s5drape" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5A0E16" stopOpacity={0.9} />
            <stop offset="1" stopColor="#2A0508" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        {/* wall wash */}
        <rect x={0} y={0} width={1012} height={140} fill="url(#s5wood)" />
        {/* vertical wood planks */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
          <rect key={c} x={c * 128 + 4} y={2} width={120} height={132} rx={4} fill="url(#s5plank)" stroke="#160B05" strokeWidth={2} opacity={0.85} />
        ))}
        {/* brass dado rail across the wall */}
        <rect x={0} y={122} width={1012} height={7} fill={BRASSD} opacity={0.8} />
        <rect x={0} y={121} width={1012} height={2} fill={BRASS} opacity={0.7} />
        {/* soft side drapes framing the room */}
        <path d="M0 0 L96 0 C70 40 74 96 40 138 L0 138 Z" fill="url(#s5drape)" opacity={0.5} />
        <path d="M1012 0 L916 0 C942 40 938 96 972 138 L1012 138 Z" fill="url(#s5drape)" opacity={0.5} />
        {/* drifting warm bokeh */}
        {S5_dust.map((d, i) => {
          const yy = d.y - ((lf * d.sp) % 70);
          return <circle key={i} cx={d.x} cy={yy} r={d.r} fill="#FFD9A0" opacity={0.10 + 0.12 * (0.5 + 0.5 * Math.sin(lf / 12 + d.ph))} />;
        })}
      </svg>

      {/* framed art on the wall */}
      <S5_Frame x={112} y={30} />
      <S5_Frame x={830} y={30} />

      {/* burgundy wine racks each side */}
      <S5_WineRack x={12} y={20} scale={0.92} />
      <S5_WineRack x={886} y={20} scale={0.92} />

      {/* two warm chandeliers over the podiums */}
      <S5_Chandelier lf={lf} x={S5_LEFT + 4} top={-6} scale={0.92} ph={0.4} />
      <S5_Chandelier lf={lf} x={S5_RIGHT - 4} top={-6} scale={0.92} ph={2.1} />

      {/* brass wall sconces with live flames */}
      <S5_Sconce lf={lf} x={452} y={70} ph={0.6} scale={0.95} />
      <S5_Sconce lf={lf} x={560} y={70} ph={1.9} scale={0.95} />

      {/* hanging copper-pot rail for the open-kitchen feel */}
      <S5_PotRail lf={lf} x={392} ph={0.5} />

      {/* ---- COOKING LIFE / DEPTH: dim line-cooks working the open kitchen behind ---- */}
      <S5_Cook lf={lf} x={64} y={92} tint="#7A4B2A" ph={1.3} scale={0.7} op={0.34} />
      <S5_Cook lf={lf} x={952} y={92} tint="#7A4B2A" ph={2.7} flip scale={0.7} op={0.34} />
      <S5_Cook lf={lf} x={130} y={58} tint="#8A5A34" ph={0.5} op={0.5} />
      <S5_Cook lf={lf} x={882} y={58} tint="#8A5A34" ph={2.1} flip op={0.5} />

      {/* a WAITER crossing the far back the whole scene (continuous background motion) */}
      <S5_Waiter lf={lf} />

      {/* candlelit linen tables in the mid-depth (chef's-table diners) */}
      <S5_DinerTable lf={lf} x={214} y={100} scale={0.82} ph={0.7} op={0.5} />
      <S5_DinerTable lf={lf} x={800} y={100} scale={0.82} ph={1.8} op={0.5} />

      {/* gentle steam wisps drifting off the back pass */}
      <S5_SteamJet lf={lf} x={150} y={120} scale={0.9} tint="#F0DCC2" ph={0.7} />
      <S5_SteamJet lf={lf} x={862} y={120} scale={0.9} tint="#F0D9C6" ph={1.9} />

      {/* FLAMBE flares roaring off the back range on a steady schedule — no dead frame */}
      {S5_FLARES.map((f, i) => (
        <S5_Flare key={i} lf={lf} x={f.x} y={f.y} at={f.at} scale={f.s} />
      ))}

      {/* dramatic overhead spotlights raking each podium (warm candlelit beams) */}
      <SpotCone x={S5_LEFT} top={-20} topW={50} botW={372} h={660} color="rgba(255,205,140,0.12)" sway={1.0} lf={lf} pool={0.7} />
      <SpotCone x={S5_RIGHT} top={-20} topW={50} botW={372} h={660} color="rgba(255,160,110,0.13)" sway={1.2} lf={lf} pool={0.8} />

      {/* ================= JUDGING BENCH (warm-wood podium + brass lip) ================= */}
      <div style={{ position: "absolute", left: 0, right: 0, top: S5_BENCH, height: 40, background: `linear-gradient(180deg,${S5_WOOD2},#2A1608)`, zIndex: 4, boxShadow: "inset 0 2px 0 rgba(255,220,160,0.12)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: S5_BENCH + 40, height: 62, background: `linear-gradient(180deg,#1A0E06,#0A0603)`, zIndex: 4 }} />
      {/* hot brass edge on the bench */}
      <div style={{ position: "absolute", left: 0, right: 0, top: S5_BENCH - 4, height: 6, background: `linear-gradient(90deg,${BRASSD},${GOLD},${BRASSD})`, zIndex: 5, boxShadow: `0 0 14px ${GOLD}99` }} />
      {/* engraved CHEF'S TABLE plaque on the bench front */}
      <div style={{ position: "absolute", left: "50%", top: S5_BENCH + 52, transform: "translateX(-50%)", zIndex: 6 }}>
        <span style={{ fontFamily: S5_FONT, fontWeight: 900, fontSize: 20, letterSpacing: "0.30em", color: "#F4DFA0", textShadow: `0 0 12px ${GOLD}88, 0 1px 0 #000` }}>CHEF'S TABLE</span>
      </div>
      {/* warm bench reflection glow of the two heroes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: S5_BENCH + 2, height: 40, background: "linear-gradient(180deg, rgba(255,190,110,0.16), transparent)", zIndex: 5, pointerEvents: "none" }} />

      {/* ================= BEAT LABEL ================= */}
      <div style={{ position: "absolute", left: "50%", top: 20, transform: `translateX(-50%) scale(${introS})`, zIndex: 40 }}>
        <span style={{ display: "inline-block", padding: "9px 28px", borderRadius: 999, background: "rgba(26,14,8,0.95)", border: `3px solid ${GOLD}`, fontFamily: S5_FONT, fontWeight: 900, fontSize: 30, letterSpacing: "0.05em", color: "#FBEFCB", boxShadow: `0 12px 28px -10px rgba(0,0,0,0.7), 0 0 26px ${GOLD}66` }}>
          WHY IT WORKS
        </span>
      </div>

      {/* ================= COLUMN CARDS + focal backglows ================= */}
      <div style={colCard("L")} />
      <div style={colCard("R")} />
      <div style={{ position: "absolute", left: S5_LEFT, top: 508, width: 380, height: 380, transform: "translate(-50%,-50%)", background: `radial-gradient(circle at 50% 44%, rgba(63,158,116,${0.30 * makerGlow}), transparent 66%)`, filter: "blur(4px)", zIndex: 15, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: S5_RIGHT, top: 508, width: 390, height: 390, transform: "translate(-50%,-50%)", background: `radial-gradient(circle at 50% 44%, rgba(255,90,60,${0.32 * criticGlow}), transparent 66%)`, filter: "blur(4px)", zIndex: 15, pointerEvents: "none" }} />

      {/* center gold seam splitting the podium + PULSING VS medallion */}
      <div style={{ position: "absolute", left: 503, top: 150, width: 6, height: 542, borderRadius: 4, background: `linear-gradient(${GOLD},${BRASSD},rgba(231,178,76,0.1))`, boxShadow: `0 0 ${12 + 10 * S5_vsPulse}px ${GOLD}88`, zIndex: 7 }} />
      <div style={{ position: "absolute", left: "50%", top: 370, transform: `translate(-50%,-50%) scale(${introS + 0.06 * S5_vsPulse})`, zIndex: 41 }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: grad("#2A1608", "#3A2210"), border: `3px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S5_FONT, fontWeight: 900, fontSize: 27, color: GOLD, boxShadow: `0 12px 26px -8px rgba(0,0,0,0.7), 0 0 ${16 + 18 * S5_vsPulse}px ${GOLD}${S5_vsPulse > 0.5 ? "aa" : "66"}` }}>VS</div>
      </div>

      {/* ================= LEFT HEADER: THE MAKER ================= */}
      <div style={{ position: "absolute", left: S5_LEFT, top: 158, transform: `translateX(-50%) scale(${introS})`, zIndex: 30 }}>
        <span style={{ display: "inline-block", padding: "6px 22px", borderRadius: 999, background: "#F6F3EC", border: `3px solid ${GREEN}`, fontFamily: S5_FONT, fontWeight: 900, fontSize: 23, color: INK, boxShadow: "0 8px 18px -8px rgba(0,0,0,0.6)" }}>THE MAKER</span>
      </div>

      {/* the maker's own tasting cloche on the bench (cracks it can't see) */}
      <svg width={300} height={150} viewBox="0 0 300 150" style={{ position: "absolute", left: S5_LEFT - 150, top: S5_BENCH - 96, zIndex: 18 }}>
        <ellipse cx={150} cy={112} rx={126} ry={26} fill="#EFE7D4" stroke="#B7AE99" strokeWidth={3} />
        <ellipse cx={150} cy={106} rx={98} ry={17} fill="#D8CDB4" />
        <path d="M64 106 A86 86 0 0 1 236 106 Z" fill="url(#s5dome)" stroke="#8A7B62" strokeWidth={3} />
        <ellipse cx={150} cy={38} rx={9} ry={9} fill="#D6C9AC" stroke="#8A7B62" strokeWidth={2} />
        <path d="M92 88 A66 56 0 0 1 196 52" fill="none" stroke="#FFF6E4" strokeWidth={7} strokeLinecap="round" opacity={0.5} />
      </svg>

      {/* GOLD TROPHIES / MEDALS / BADGES stacking up beside the proud maker (behind body) */}
      {S5_TROPHIES.map((t, i) => (
        <S5_Trophy key={i} lf={lf} x={t.x} y={t.y} s={t.s} at={t.at} kind={t.kind} />
      ))}
      {/* a gold sparkle-burst as each trophy lands on the pile */}
      {S5_TROPHIES.map((t, i) => (
        <Sparkles key={i} lf={lf} at={t.at / 30} x={t.x} y={t.y - 34} n={7} spread={92} colors={[GOLD, "#FBE39A", "#fff"]} dur={0.5} />
      ))}
      {/* LULL-FILL (tail): shine sweep raking across the finished trophy pile */}
      {S5_tailShine > 0 && S5_tailShine < 1 && (
        <div style={{ position: "absolute", left: 92 + S5_tailShine * 372, top: 596, width: 58, height: 116, transform: "rotate(15deg)", background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.55), transparent)", filter: "blur(3px)", zIndex: 23, pointerEvents: "none" }} />
      )}

      {/* the MAKER mascot — anticipates, puffs bigger & bigger, then BLOWS OUT + deflates, feet on the bench */}
      <div style={{ position: "absolute", left: S5_LEFT, top: S5_BENCH - 26 - proudRise - S5_earlyHop - S5_midHop, width: 200, height: 200, transform: `translate(-50%,-100%) scale(${makerSX}, ${makerSY})`, transformOrigin: "50% 100%", zIndex: 22, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.5))" }}>
        <Mascot lf={lf} size={200} tint={CLAY} cheer={1} gaze={2} nodAmp={3.2} />
        {/* balloon-shine sweeping across the puffed body */}
        <div style={{ position: "absolute", left: `${S5_shineX}%`, top: `${S5_shineY}%`, width: 34, height: 54, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.6), transparent 70%)", opacity: infl * (1 - S5_deflate), pointerEvents: "none", transform: "rotate(-14deg)" }} />
        {/* over-pressure red rim as it nears the blowout (peaks right before the POP) */}
        {(infl > 0.5 && S5_deflate < 1) && (
          <div style={{ position: "absolute", inset: "6% 3%", borderRadius: "50%", background: `radial-gradient(circle at 50% 52%, transparent 54%, rgba(226,59,46,${0.42 * infl * (1 - S5_deflate)}) 100%)`, pointerEvents: "none" }} />
        )}
        {/* late delusional re-tension rim (it puffs itself back up and strains again) */}
        {strain > 0.02 && (
          <div style={{ position: "absolute", inset: "10% 6%", borderRadius: "50%", background: `radial-gradient(circle at 50% 52%, transparent 58%, rgba(226,59,46,${0.30 * strain}) 100%)`, pointerEvents: "none" }} />
        )}
      </div>
      {/* balloon knot + tie-string at the feet, eases in as it puffs */}
      {infl > 0.05 && (
        <svg width={40} height={70} viewBox="0 0 40 70" style={{ position: "absolute", left: S5_LEFT - 20, top: S5_BENCH - 30, zIndex: 21, opacity: infl }}>
          <path d={`M20 0 q ${6 * wob} 22 -4 40 q -6 14 6 26`} fill="none" stroke={CLAYD} strokeWidth={3} strokeLinecap="round" />
          <path d="M12 0 L28 0 L20 12 Z" fill={CLAYD} />
        </svg>
      )}

      {/* ===== SIGNATURE A — PARTY-BLOWOUT POP FX (air-puff ring + confetti + horn + PFFT) ===== */}
      {/* expanding air-puff shock ring blasting off the body */}
      {S5_popRing > 0 && S5_popRing < 1 && (
        <div style={{ position: "absolute", left: S5_cx, top: S5_cy, width: 0, height: 0, zIndex: 34, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 60 + S5_popRing * 210, height: 60 + S5_popRing * 210, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `4px solid rgba(255,255,255,${(1 - S5_popRing) * 0.7})` }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 + S5_popRing * 156, height: 40 + S5_popRing * 156, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `3px solid rgba(231,178,76,${(1 - S5_popRing) * 0.6})` }} />
        </div>
      )}
      {/* confetti / torn-paper bits flung out of the blowout, arcing then falling */}
      {S5_popRing > 0.001 && S5_popRing < 0.98 && (
        <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none" }}>
          {S5_bits.map((b, i) => {
            const p = S5_popRing;
            const bx = S5_cx + Math.cos(b.a) * b.d * p;
            const by = S5_cy + Math.sin(b.a) * b.d * p * 0.7 + p * p * 130; // gravity fall
            const op = (1 - p) * 0.95;
            return <rect key={i} x={bx} y={by} width={b.w} height={b.w * 0.55} rx={1.5} fill={b.c} opacity={op} transform={`rotate(${b.rot + p * 260} ${bx} ${by})`} />;
          })}
        </svg>
      )}
      {/* the party-blowout HORN tongue shooting out of the maker's mouth then recoiling */}
      {S5_popShoot > 0.01 && (
        <svg width={200} height={80} viewBox="0 0 200 80" style={{ position: "absolute", left: S5_cx + 4, top: S5_cy - 12, zIndex: 34, pointerEvents: "none", overflow: "visible" }}>
          {/* tapered paper tongue */}
          <path d={`M0 20 L${12 + S5_popShoot * 118} 14 L${12 + S5_popShoot * 118} 26 Z`} fill={PINK} opacity={0.95} />
          <line x1={0} y1={20} x2={12 + S5_popShoot * 118} y2={20} stroke={HKRED} strokeWidth={2} opacity={0.45} />
          {/* curled tip (uncurls as it shoots) */}
          <path d={`M${12 + S5_popShoot * 118} 12 q 16 8 4 18 q -10 6 -3 -6`} fill="none" stroke={PINK} strokeWidth={5} opacity={0.9 * (1 - Math.max(0, S5_popShoot - 0.7) * 3.2)} />
          {/* gold mouthpiece cone */}
          <path d="M-4 9 L14 20 L-4 31 Z" fill={GOLD} stroke={BRASSD} strokeWidth={1.5} />
        </svg>
      )}
      {/* "PFFT!" pop onomatopoeia */}
      {S5_popTxt > 0.02 && (
        <div style={{ position: "absolute", left: S5_cx + 66, top: S5_cy - 72, transform: `translate(-50%,-50%) scale(${0.6 + 0.6 * S5_popTxt}) rotate(-8deg)`, opacity: Math.min(1, S5_popTxt * 2), zIndex: 36, pointerEvents: "none" }}>
          <span style={{ fontFamily: S5_FONT, fontWeight: 900, fontSize: 34, color: "#fff", WebkitTextStroke: `3px ${HKREDD}`, textShadow: `0 0 14px ${HKRED}` }}>PFFT!</span>
        </div>
      )}
      {/* the blowout confetti burst */}
      <Sparkles lf={lf} at={83 / 30} x={S5_LEFT} y={520} n={16} spread={230} colors={[GOLD, GREEN, PINK, SKY, "#fff"]} dur={0.7} />

      {/* cracks blooming smoothly (staggered) under the blind maker */}
      <svg width={180} height={70} viewBox="0 0 180 70" style={{ position: "absolute", left: S5_LEFT - 90, top: S5_BENCH + 8, zIndex: 25 }}>
        {S5_CRACKS.map((d, i) => {
          const rv = over(lf, 66 + i * 9, 40, Easing.inOut(Easing.cubic)); // smooth staggered draw-in
          return (
            <path key={i} d={d} transform={`translate(${26 + i * 34},44)`} fill="none" stroke={HKRED} strokeWidth={3} strokeLinecap="round" opacity={rv * crackPulse} style={{ filter: `drop-shadow(0 0 4px ${HKRED})` }} />
          );
        })}
      </svg>

      {/* delusional 10/10 badge eases in beside the puffed maker + keeps a proud throb */}
      <div style={{ position: "absolute", left: S5_LEFT + 118, top: 292, transform: `rotate(${-10 + 2 * Math.sin(lf / 16)}deg) scale(${badge * badgeThrob})`, transformOrigin: "50% 50%", zIndex: 33, opacity: badge > 0.04 ? 1 : 0 }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: `radial-gradient(circle at 38% 30%, #FBE39A, ${GOLD} 58%, ${AMBER})`, border: "4px solid #F6F3EC", boxShadow: `0 10px 22px -6px rgba(0,0,0,0.6), 0 0 22px ${GOLD}99`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S5_FONT }}>
          <span style={{ fontWeight: 900, fontSize: 34, color: INK, lineHeight: 1 }}>10/10</span>
        </div>
      </div>
      {/* proud pride-stars rise off the maker BEFORE the trophies start (fills the opening) */}
      <Sparkles lf={lf} at={8 / 30} x={S5_LEFT} y={470} n={7} spread={112} colors={["#FBE39A", GREEN, "#fff"]} dur={0.7} />
      <Sparkles lf={lf} at={26 / 30} x={S5_LEFT + 18} y={448} n={7} spread={122} colors={[GOLD, "#FBE39A", "#fff"]} dur={0.7} />
      {/* proud hearts/sparkles keep rising off the swelling maker (continuous pride) */}
      <Sparkles lf={lf} at={58 / 30} x={S5_LEFT} y={420} n={9} spread={120} colors={["#FBE39A", GREEN, "#fff"]} dur={0.7} />
      {/* LULL-FILL (mid 100-128): an extra proud burst between the badge-pop and the hunt beat */}
      <Sparkles lf={lf} at={116 / 30} x={S5_LEFT - 10} y={410} n={8} spread={126} colors={["#FBE39A", GOLD, GREEN]} dur={0.7} />
      <Sparkles lf={lf} at={150 / 30} x={S5_LEFT + 20} y={400} n={8} spread={130} colors={["#FBE39A", GOLD, "#fff"]} dur={0.7} />
      <Sparkles lf={lf} at={222 / 30} x={S5_LEFT - 16} y={392} n={9} spread={140} colors={[GOLD, "#FBE39A", GREEN]} dur={0.7} />
      {/* LULL-FILL (tail): a final proud victory burst crowning the pile */}
      <Sparkles lf={lf} at={244 / 30} x={S5_LEFT} y={384} n={10} spread={152} colors={[GOLD, "#FBE39A", GREEN]} dur={0.7} />

      {/* MAKER speech bubble — clueless praise, tail down at the inflating maker */}
      <SpeechBubble lf={lf} at={50 / 30} dur={1.7} x={232} y={330} text="10/10!" tail="down" tone="praise" size={28} />

      {/* ================= RIGHT HEADER: THE CRITIC ================= */}
      <div style={{ position: "absolute", left: S5_RIGHT, top: 158, transform: `translateX(-50%) scale(${introS})`, zIndex: 30 }}>
        <span style={{ display: "inline-block", padding: "6px 22px", borderRadius: 999, background: "#F6F3EC", border: `3px solid ${HKRED}`, fontFamily: S5_FONT, fontWeight: 900, fontSize: 23, color: INK, boxShadow: "0 8px 18px -8px rgba(0,0,0,0.6)" }}>THE CRITIC</span>
      </div>

      {/* the CRITIC — RamsayChef LEANS toward the glass as it sweeps, gesturing to the plate */}
      <div style={{ position: "absolute", left: S5_RIGHT - 118, top: S5_BENCH - 262, width: 236, height: 236, zIndex: 22, transform: `translateX(${S5_leanX + S5_preLeanX}px) rotate(${S5_leanR + S5_preLeanR}deg)`, transformOrigin: "50% 92%", filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.55))" }}>
        <RamsayChef lf={lf} size={236} pose="present" tint={CLAY} yell={chefYell} gaze={-2} brow={1} toque={0} nod={1} />
        {/* bead of sweat sliding down on the rage beat */}
        {S5_sweat > 0.02 && (
          <svg width={20} height={40} viewBox="0 0 20 40" style={{ position: "absolute", left: 168, top: 66 + S5_sweat * 30, opacity: Math.min(1, S5_sweat * 2) * (1 - Math.max(0, S5_sweat - 0.8) * 5), pointerEvents: "none" }}>
            <path d="M10 2 C4 12 2 18 10 22 C18 18 16 12 10 2 Z" fill="#BFE0FF" stroke="#7FA8CC" strokeWidth={1.2} />
            <ellipse cx={7} cy={12} rx={2} ry={4} fill="#fff" opacity={0.7} />
          </svg>
        )}
      </div>

      {/* the critic's plate under inspection on the bench */}
      <svg width={320} height={120} viewBox="0 0 320 120" style={{ position: "absolute", left: S5_RIGHT - 160, top: S5_BENCH - 78, zIndex: 18 }}>
        <ellipse cx={160} cy={64} rx={144} ry={30} fill="#EFE7D4" stroke="#B7AE99" strokeWidth={3} />
        <ellipse cx={160} cy={58} rx={110} ry={20} fill="#DED4BC" />
        <ellipse cx={132} cy={56} rx={36} ry={15} fill="#9C6B3E" />
        <ellipse cx={186} cy={60} rx={28} ry={12} fill="#7E4E2C" />
        <ellipse cx={198} cy={52} rx={15} ry={7} fill={GREEN} />
      </svg>
      {/* LULL-FILL (opening): a serving cloche LIFTS off the critic's plate revealing the dish */}
      {S5_lift < 1 && (
        <svg width={200} height={150} viewBox="0 0 200 150" style={{ position: "absolute", left: S5_RIGHT - 100, top: (S5_BENCH - 96) - S5_lift * 98, zIndex: 24, opacity: 1 - S5_lift, pointerEvents: "none", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.45))" }}>
          <ellipse cx={100} cy={124} rx={92} ry={18} fill="#D8CDB4" />
          <path d="M18 124 A82 82 0 0 1 182 124 Z" fill="url(#s5dome)" stroke="#8A7B62" strokeWidth={3} />
          <ellipse cx={100} cy={50} rx={9} ry={9} fill="#D6C9AC" stroke="#8A7B62" strokeWidth={2} />
          <path d="M46 108 A62 52 0 0 1 140 72" fill="none" stroke="#FFF6E4" strokeWidth={6} strokeLinecap="round" opacity={0.5} />
        </svg>
      )}
      {/* reveal sparkle as the cloche clears the plate */}
      <Sparkles lf={lf} at={30 / 30} x={S5_RIGHT} y={S5_BENCH - 92} n={8} spread={124} colors={["#F3EAD6", GOLD, "#fff"]} dur={0.5} />
      {/* gentle sizzle steam rising off the critic's open plate */}
      <S5_SteamJet lf={lf} x={S5_RIGHT} y={S5_BENCH - 62} scale={0.85} tint="#F3EAD6" ph={1.1} z={19} />
      {/* LULL-FILL (mid 100-128): a scrutiny sizzle-burst off the plate as the lens lingers */}
      <Sparkles lf={lf} at={114 / 30} x={S5_RIGHT} y={S5_BENCH - 70} n={7} spread={110} colors={["#F3EAD6", GOLD, "#fff"]} dur={0.5} />

      {/* FAULT AFTER FAULT — each red ping springs in as the lens catches it (accumulates) */}
      {S5_FAULTS.map((f, i) => {
        if (lf < f.at) return null;
        const pop = Math.min(1.15, spr(lf, f.at, 9, 250));
        const pulse = 0.7 + 0.3 * Math.sin(lf / 5 + i);
        const ring = over(lf, f.at, 18, Easing.out(Easing.cubic)); // expands + fades once
        return (
          <div key={i} style={{ position: "absolute", left: f.x, top: f.y, transform: "translate(-50%,-50%)", zIndex: 27, pointerEvents: "none" }}>
            {ring < 1 && (
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 + ring * 60, height: 40 + ring * 60, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `2px solid ${HKRED}`, opacity: (1 - ring) * 0.8 }} />
            )}
            <div style={{ transform: `scale(${pop})` }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", border: `3px solid ${HKRED}`, boxShadow: `0 0 ${14 * pulse}px ${HKRED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S5_FONT, fontWeight: 900, color: "#fff", fontSize: 21, background: "rgba(226,59,46,0.32)" }}>!</div>
            </div>
          </div>
        );
      })}

      {/* MAGNIFYING GLASS sweeping back and forth — the critic HUNTING (travelling lens glint) */}
      {lf >= sweepStart - 4 && (
        <svg width={158} height={158} viewBox="0 0 158 158" style={{ position: "absolute", left: glassX - 66, top: glassY - 66, zIndex: 30, filter: "drop-shadow(0 7px 12px rgba(0,0,0,0.5))" }}>
          <line x1={96} y1={96} x2={140} y2={140} stroke="#2A1C10" strokeWidth={14} strokeLinecap="round" />
          <line x1={96} y1={96} x2={140} y2={140} stroke={BRASSD} strokeWidth={6} strokeLinecap="round" />
          <circle cx={64} cy={64} r={44} fill={nearFault ? "rgba(226,59,46,0.22)" : "rgba(255,205,140,0.14)"} stroke="#C9B48E" strokeWidth={9} />
          <circle cx={64} cy={64} r={44} fill="none" stroke={nearFault ? HKRED : BRASSD} strokeWidth={3} />
          <path d="M44 46 A32 32 0 0 1 80 40" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.75} />
          {/* travelling glint streak across the lens */}
          <line x1={30 + S5_glintT * 60} y1={90 - S5_glintT * 60} x2={44 + S5_glintT * 60} y2={76 - S5_glintT * 60} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.5 * (1 - Math.abs(S5_glintT - 0.5) * 2)} />
        </svg>
      )}
      {/* red ping burst as each fault is caught */}
      {S5_FAULTS.map((f, i) => (
        <Sparkles key={i} lf={lf} at={f.at / 30} x={f.x} y={f.y} n={11} spread={150} colors={[HKRED, GOLD, "#fff"]} dur={0.55} />
      ))}
      {/* LULL-FILL (tail): the critic's final verdict ping as the last fault lands */}
      <Sparkles lf={lf} at={244 / 30} x={S5_RIGHT} y={560} n={9} spread={150} colors={[HKRED, GOLD, "#fff"]} dur={0.6} />

      {/* ===== SIGNATURE B — the critic YANKS out a long FAULT-CHECKLIST SCROLL down past the counter ===== */}
      {S5_scroll > 0.01 && (
        <div style={{ position: "absolute", left: 818, top: 560 + S5_scrollYank, width: 150, zIndex: 31, pointerEvents: "none", filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.55))", transform: `rotate(${1.2 * Math.sin(lf / 22)}deg)`, transformOrigin: "50% 0%" }}>
          {/* top wooden roller the critic has yanked out of frame edge */}
          <div style={{ position: "absolute", left: -8, top: -14, width: 166, height: 20, borderRadius: 10, background: `linear-gradient(180deg, ${BRASS}, #8A5A22)`, boxShadow: "0 3px 6px rgba(0,0,0,0.5)", zIndex: 2 }} />
          <div style={{ position: "absolute", left: -16, top: -16, width: 14, height: 24, borderRadius: 6, background: BRASSD, zIndex: 3 }} />
          <div style={{ position: "absolute", left: 152, top: -16, width: 14, height: 24, borderRadius: 6, background: BRASSD, zIndex: 3 }} />
          {/* the parchment unrolling straight down */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: S5_paperH, overflow: "hidden", background: "linear-gradient(180deg,#F6EAC9,#EAD9AC)", borderLeft: "2px solid #CBB474", borderRight: "2px solid #CBB474", boxShadow: "inset 0 0 24px rgba(150,110,40,0.25)" }}>
            <div style={{ position: "absolute", left: 0, top: 8, width: "100%", textAlign: "center", fontFamily: S5_FONT, fontWeight: 900, fontSize: 22, letterSpacing: "0.12em", color: HKREDD }}>FAULTS</div>
            <div style={{ position: "absolute", left: 14, top: 38, width: 122, height: 3, background: HKRED, opacity: 0.7 }} />
            {S5_CHECKLIST.map((t, i) => {
              const ry = 54 + i * 42;
              const rev = Math.max(0, Math.min(1, (S5_paperH - (ry + 18)) / 22));
              return (
                <div key={i} style={{ position: "absolute", left: 14, top: ry, width: 124, display: "flex", alignItems: "center", gap: 8, opacity: rev, transform: `translateX(${(1 - rev) * 14}px)` }}>
                  <svg width={18} height={18} viewBox="0 0 18 18" style={{ flex: "0 0 auto" }}>
                    <rect x={1.5} y={1.5} width={15} height={15} rx={3} fill="none" stroke={HKRED} strokeWidth={2.5} />
                    <path d="M5 5 L13 13 M13 5 L5 13" stroke={HKRED} strokeWidth={2.5} strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: S5_FONT, fontWeight: 800, fontSize: 15, color: "#3A2410", whiteSpace: "nowrap" }}>{t}</span>
                </div>
              );
            })}
          </div>
          {/* bottom roller that keeps dropping as it unrolls (past the counter) */}
          <div style={{ position: "absolute", left: -6, top: S5_paperH - 6, width: 162, height: 16, borderRadius: 8, background: "linear-gradient(180deg,#C9A24A,#7A4E1C)", boxShadow: "0 4px 8px rgba(0,0,0,0.5)", zIndex: 2 }} />
        </div>
      )}
      {/* a red burst as the scroll is yanked out */}
      <Sparkles lf={lf} at={190 / 30} x={892} y={566} n={9} spread={124} colors={[HKRED, GOLD, "#fff"]} dur={0.5} />

      {/* NO EGO chip eases onto the critic side */}
      <div style={{ position: "absolute", left: S5_RIGHT, top: 236, transform: `translateX(-50%) scale(${noEgo})`, transformOrigin: "50% 50%", zIndex: 34, opacity: noEgo > 0.04 ? 1 : 0 }}>
        <span style={{ display: "inline-block", padding: "8px 24px", borderRadius: 999, background: grad("#2A1416", "#3A1D22"), border: `3px solid ${GOLD}`, fontFamily: S5_FONT, fontWeight: 900, fontSize: 26, letterSpacing: "0.04em", color: "#FBE39A", whiteSpace: "nowrap", boxShadow: `0 0 22px ${GOLD}66` }}>NO EGO</span>
      </div>

      {/* CRITIC speech bubble — no-ego rage line, tail down at RamsayChef (clears the face) */}
      <SpeechBubble lf={lf} at={219 / 30} dur={1.3} x={770} y={340} text="NO EGO." tail="down" tone="rage" size={28} />

      {/* atmosphere */}
      <Vignette strength={0.5} shape="rect" />
      <Grain op={0.05} />
    </div>
  );
};

// ===== S6 =====
// ===== S6 =====
// ===== S6 =====
// ===================== SCENE S6 — THE RULE (WARM fine-dining chef's-table verdict, ONE smooth continuous shot) =====================
// EVENTFUL rebuild: plaque drops on brass chains + slams, chef STORMS in and stomps, points at the tag,
// a red prohibition stamp WINDS UP then POUNDS down (rubber squash + dust + ink splatter + cracks), chef folds arms
// and growls "DO IT AGAIN." — a waiter crosses the room, steam rises off a cloche, candles jolt on every impact.
// MORE-ACTION pass: the old quiet tail (lf ~96-130, "the full Ramsay agent prompt...") now UNFURLS a wax-sealed
// "RAMSAY AGENT PROMPT" scroll on the table (rollers travel, parchment reveals, rule-lines stagger in, red wax seal
// presses with a squash) + a subtle approving hero nod toward it — no dead air. No cuts, no flash, calm push-in.
// LULL-FILL pass 2: (A) tail 128-148 was hero-static -> add a SECOND confirming nod + lean toward the scroll + a
// second payoff glint on the scroll; (B) accuse-hold 22-44 was a frozen point -> add an insistent point-push so the
// chef keeps physically pushing at the tag while the stamp winds up. Smooth, no cuts/flash, all prior action kept.
// SIGNATURE MOMENT pass: a BIG red "REJECTED" rubber stamp now SLAMS straight down over "SAME MODEL" on the rule
// beat (S6_STAMP@44 = VO "grade its own work") — the dominant hero gag: winds up high, POUNDS down with a hard
// rubber-squash (interpolate + Easing.out(Easing.back), NO spr), throws off a big shockwave + dust, and the chef
// reacts HARD (a jab-lunge into the hit, then recoils, with a bark). The base prohibition circle-slash stays behind
// it as a supporting mark; nothing else removed, timing untouched.
const S6_CX = 506;
const S6_IMPACT = 6;      // plaque + chef SLAM land here (VO "Never"@6) — weighty spring, NO flash
const S6_STAMPLOAD = 30;  // red prohibition stamp winds UP above "SAME MODEL" (anticipation)
const S6_STAMP = 44;      // red prohibition circle POUNDS down on "SAME MODEL"
const S6_FLIP = 60;       // chef calmly folds slam -> arms crossed (authority hold)
const S6_FONT = "'Fraunces', Georgia, 'Times New Roman', serif"; // literal display serif (do NOT assume `fraunces` is in scope)

// deterministic dust motes softly kicked up on landings (fade out, no strobe)
const S6_DUST = Array.from({ length: 26 }, (_, i) => i);
const S6_MOTES = Array.from({ length: 20 }, (_, i) => i);
// warm ambient bokeh drifting through the dining room (candle/glass reflections)
const S6_BOKEH = Array.from({ length: 18 }, (_, i) => i);
// red ink droplets flung out when the stamp bites
const S6_INK = Array.from({ length: 12 }, (_, i) => i);
// distress specks scattered across the big REJECTED stamp (inky-rubber texture, deterministic)
const S6_REJSPECK = Array.from({ length: 9 }, (_, i) => i);
// dim background diners / line-cooks working the deep warm room (parallax, secondary)
const S6_COOKS = [
  { x: 176, y: 556, s: 84, ph: 0, amp: 5, per: 74, tint: "#3A2A1C" },
  { x: 300, y: 566, s: 70, ph: 20, amp: 4, per: 88, tint: "#31241A" },
  { x: 724, y: 560, s: 78, ph: 40, amp: 6, per: 80, tint: "#38271B" },
  { x: 852, y: 568, s: 66, ph: 12, amp: 4, per: 96, tint: "#2E2118" },
];
// warm candlelit table lamps + tabletop candles seeded through the room
const S6_CANDLES = [
  { x: 150, y: 596, s: 1.05, ph: 0 },   // foreground on the chef's table (left)
  { x: 902, y: 600, s: 0.95, ph: 9 },   // foreground on the chef's table (right)
  { x: 262, y: 512, s: 0.62, ph: 4 },   // deep back table
  { x: 762, y: 516, s: 0.62, ph: 13 },  // deep back table
];
// wine-rack bottle grid (back-left, warm)
const S6_WINE = Array.from({ length: 12 }, (_, i) => ({ col: i % 3, row: Math.floor(i / 3), i }));

// the rules that stagger onto the unfurling "RAMSAY AGENT PROMPT" scroll (fills the old quiet tail)
const S6_PROMPT_LINES = [
  { w: "never grade your own work", d: 106 },
  { w: "a fresh model must check it", d: 112 },
  { w: "no ego. be brutally honest.", d: 118 },
];

// deterministic warm dust off a landing (fade out, no strobe)
const S6_Dust: React.FC<{ lf: number; cx: number; cy: number; startF: number; spread?: number; drop?: number; tint?: string }> = ({ lf, cx, cy, startF, spread = 1, drop = 64, tint = "rgba(231,196,140,0.9)" }) => {
  const t = ramp(lf, startF, startF + 26);
  if (t <= 0 || t >= 1) return null;
  const eo = 1 - (1 - t) * (1 - t); // ease-out so they drift, never pop
  return (
    <>
      {S6_DUST.map((i) => {
        const ang = -Math.PI / 2 + (seed(i) - 0.5) * Math.PI * 1.25;
        const dist = (40 + seed(i + 7) * 140) * spread;
        const sz = 4 + seed(i + 3) * 12;
        const swirl = Math.sin(lf / 6 + i) * 4 * (1 - t); // gentle secondary drift
        const x = cx + Math.cos(ang) * dist * eo + swirl;
        const y = cy + Math.sin(ang) * dist * eo + eo * eo * drop;
        const op = (1 - t) * 0.5;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: tint, filter: "blur(1px)", opacity: op, zIndex: 34 }} />
        );
      })}
    </>
  );
};

// dim silhouetted diner/line-cook toiling in the deep warm room (bobs, secondary motion)
const S6_Cook: React.FC<{ lf: number; x: number; y: number; s: number; ph: number; amp: number; per: number; tint: string }> = ({ lf, x, y, s, ph, amp, per, tint }) => {
  const b = bob(lf, amp, per, ph);
  const lean = Math.sin(lf / (per * 0.5) + ph) * 2.5; // slow prep-lean
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s + b, width: s, height: s, zIndex: 2, opacity: 0.8, filter: "blur(0.7px)", transform: `rotate(${lean * 0.15}deg)` }}>
      {/* torso */}
      <div style={{ position: "absolute", left: s * 0.14, top: s * 0.34, width: s * 0.72, height: s * 0.62, borderRadius: `${s * 0.24}px ${s * 0.24}px ${s * 0.14}px ${s * 0.14}px`, background: `linear-gradient(180deg, ${tint}, #17110B)` }} />
      {/* faint warm rim sheen */}
      <div style={{ position: "absolute", left: s * 0.2, top: s * 0.4, width: s * 0.1, height: s * 0.5, borderRadius: 6, background: "rgba(231,178,76,0.08)" }} />
      {/* head */}
      <div style={{ position: "absolute", left: s * 0.3, top: s * 0.14, width: s * 0.4, height: s * 0.36, borderRadius: "50%", background: `linear-gradient(180deg, ${tint}, #140F0A)` }} />
      {/* faint toque / hair */}
      <div style={{ position: "absolute", left: s * 0.28, top: s * 0.02, width: s * 0.44, height: s * 0.2, borderRadius: `${s * 0.2}px ${s * 0.2}px 4px 4px`, background: "rgba(224,206,180,0.12)", transform: `translateX(${lean * 0.4}px)` }} />
      {/* stirring arm */}
      <div style={{ position: "absolute", left: s * 0.68, top: s * 0.46, width: s * 0.26, height: s * 0.12, borderRadius: 8, background: `linear-gradient(90deg, ${tint}, #150F0A)`, transformOrigin: "0% 50%", transform: `rotate(${8 + Math.sin(lf / 7 + ph) * 12}deg)` }} />
    </div>
  );
};

// a waiter hurrying across the mid-depth room carrying a tray (continuous background EVENT, dim + parallax)
const S6_Waiter: React.FC<{ lf: number }> = ({ lf }) => {
  const t = lf / 148;                        // 0..1 crosses the whole shot, left -> right
  const x = -70 + t * 1170;
  const s = 100;
  const y = 552;
  const walk = Math.abs(Math.sin(lf / 5)) * 7;         // vertical bob of the stride
  const step = Math.sin(lf / 5) * 10;                  // leg swing
  const trayBob = Math.sin(lf / 5 + 1) * 2;
  const glint = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(lf / 6));
  return (
    <div style={{ position: "absolute", left: x, top: y - s - walk, width: s, height: s, zIndex: 2, opacity: 0.68, filter: "blur(0.9px)" }}>
      {/* tray held high (left hand) + warm plate glint */}
      <div style={{ position: "absolute", left: s * 0.02, top: s * 0.24 + trayBob, width: s * 0.46, height: s * 0.08, borderRadius: 6, background: "linear-gradient(180deg,#B9A277,#6E5A38)", boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", left: "30%", top: -4, width: 12, height: 6, borderRadius: "50%", background: `rgba(255,225,160,${0.5 * glint})`, filter: "blur(1px)" }} />
      </div>
      {/* raised arm to the tray */}
      <div style={{ position: "absolute", left: s * 0.28, top: s * 0.3, width: s * 0.12, height: s * 0.24, borderRadius: 6, background: "linear-gradient(180deg,#2A1D12,#160E07)", transform: "rotate(-16deg)", transformOrigin: "50% 100%" }} />
      {/* torso (black waistcoat) */}
      <div style={{ position: "absolute", left: s * 0.34, top: s * 0.36, width: s * 0.34, height: s * 0.42, borderRadius: `${s * 0.1}px ${s * 0.1}px ${s * 0.06}px ${s * 0.06}px`, background: "linear-gradient(180deg,#241811,#120B06)" }} />
      {/* head */}
      <div style={{ position: "absolute", left: s * 0.42, top: s * 0.2, width: s * 0.2, height: s * 0.2, borderRadius: "50%", background: "linear-gradient(180deg,#3A281A,#160E07)" }} />
      {/* two striding legs */}
      <div style={{ position: "absolute", left: s * 0.4, top: s * 0.74, width: s * 0.1, height: s * 0.26, borderRadius: 5, background: "#120B06", transformOrigin: "50% 0%", transform: `rotate(${step}deg)` }} />
      <div style={{ position: "absolute", left: s * 0.52, top: s * 0.74, width: s * 0.1, height: s * 0.26, borderRadius: 5, background: "#0E0804", transformOrigin: "50% 0%", transform: `rotate(${-step}deg)` }} />
    </div>
  );
};

// warm candle in a little brass holder — flickering flame + breathing glow pool (deterministic).
// `kick` (0..1) makes the flame lurch on room impacts (plaque land / stamp pound) — no flash.
const S6_Candle: React.FC<{ lf: number; x: number; y: number; s: number; ph: number; kick?: number }> = ({ lf, x, y, s, ph, kick = 0 }) => {
  const flick = 1 + Math.sin(lf / 3 + ph) * 0.14 + Math.sin(lf / 1.7 + ph * 2) * 0.07 + kick * 0.5;
  const sway = Math.sin(lf / 5 + ph) * 2 + Math.sin(lf / 2.3 + ph) * 1 + kick * Math.sin(lf / 1.4) * 9;
  const gl = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(lf / 4 + ph)) + kick * 0.3;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: 12 }}>
      {/* warm glow pool cast on the table */}
      <div style={{ position: "absolute", left: -70 * s, top: -18 * s, width: 140 * s, height: 90 * s, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, rgba(255,180,90,${0.32 * gl}), transparent 70%)`, filter: "blur(4px)", pointerEvents: "none" }} />
      {/* brass holder */}
      <div style={{ position: "absolute", left: -13 * s, top: -6 * s, width: 26 * s, height: 9 * s, borderRadius: `${5 * s}px ${5 * s}px ${3 * s}px ${3 * s}px`, background: `linear-gradient(180deg, ${BRASS}, ${BRASSD})`, boxShadow: `0 2px 4px rgba(0,0,0,0.5)` }} />
      {/* wax candle */}
      <div style={{ position: "absolute", left: -6 * s, top: -46 * s, width: 12 * s, height: 42 * s, borderRadius: `${4 * s}px ${4 * s}px 0 0`, background: `linear-gradient(180deg, #F6E7C8, #D8C29A)`, boxShadow: `inset -2px 0 3px rgba(0,0,0,0.15)` }} />
      {/* soft flame halo */}
      <div style={{ position: "absolute", left: (-12 + sway * 0.4) * s, top: -78 * s, width: 24 * s, height: 34 * s, borderRadius: "50%", background: `radial-gradient(circle at 50% 60%, ${FLAMEY}88, transparent 70%)`, filter: "blur(3px)", opacity: gl }} />
      {/* flame */}
      <div style={{ position: "absolute", left: (-5 + sway) * s, top: -72 * s, width: 10 * s, height: 22 * s * flick, borderRadius: "50% 50% 50% 50% / 68% 68% 32% 32%", background: `linear-gradient(180deg, ${FLAME_CORE}, ${FLAMEY} 45%, ${EMBER})`, transformOrigin: "50% 100%", transform: `rotate(${sway * 0.8}deg)`, boxShadow: `0 0 12px ${FLAME}cc` }} />
      {/* hot core */}
      <div style={{ position: "absolute", left: (-2.5 + sway) * s, top: -64 * s, width: 5 * s, height: 10 * s * flick, borderRadius: "50%", background: FLAME_CORE, opacity: 0.9 }} />
    </div>
  );
};

// rising steam wisp off a covered dish (continuous loop, drifts + fades — background life)
const S6_Steam: React.FC<{ lf: number; x: number; y: number }> = ({ lf, x, y }) => (
  <>
    {[0, 1, 2, 3, 4].map((i) => {
      const p = ((lf + i * 18) / 90) % 1;
      const sx = x + Math.sin(p * Math.PI * 2 + i) * 12;
      const sy = y - p * 78;
      const sz = 12 + p * 22;
      const op = Math.sin(p * Math.PI) * 0.26;
      return <div key={i} style={{ position: "absolute", left: sx - sz / 2, top: sy - sz / 2, width: sz, height: sz, borderRadius: "50%", background: "radial-gradient(circle at 45% 45%, rgba(255,242,220,0.8), transparent 70%)", opacity: op, filter: "blur(3px)", zIndex: 13, pointerEvents: "none" }} />;
    })}
  </>
);

// "RAMSAY AGENT PROMPT" scroll UNFURLING on the table — fills the old quiet tail (lf ~98-148).
// Slides up from behind the counter with a soft overshoot, the right roller travels as the parchment
// reveals, header + rule-lines stagger in, and a red wax seal PRESSES down with a rubber squash. No flash.
const S6_Scroll: React.FC<{ lf: number }> = ({ lf }) => {
  const appear = over(lf, 98, 8);
  if (appear <= 0) return null;
  const unroll = over(lf, 98, 22, Easing.out(Easing.cubic));     // 0..1 parchment reveal
  const W = 236 * unroll;                                        // travelling right roller / revealed width
  const slideUp = interpolate(over(lf, 98, 16, Easing.out(Easing.back(2))), [0, 1], [46, 0]); // rises w/ overshoot
  const wob = Math.exp(-Math.max(0, lf - 98) / 11) * Math.sin((lf - 98) / 3.1) * 1.6;        // settle wobble, decays
  const sheen = Math.sin(lf / 16) * 44;                          // slow deckle sheen sweep
  // red wax seal presses down bottom-left of the parchment (rubber squash)
  const sealIn = over(lf, 118, 4);
  const sealE = Math.max(0, lf - 118);
  const sealSquish = Math.exp(-sealE / 5) * Math.sin(sealE / 2.0);
  const sealSX = 1 + 0.22 * sealSquish;
  const sealSY = 1 - 0.22 * sealSquish;
  return (
    <div style={{ position: "absolute", left: 700, top: 610, width: 250, height: 96, zIndex: 13, opacity: appear, transform: `translateY(${slideUp}px) rotate(${wob * 0.4}deg)`, transformOrigin: "0% 100%" }}>
      {/* warm glow behind the scroll */}
      <div style={{ position: "absolute", left: -22, top: -12, width: 296, height: 124, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, ${GOLD}22, transparent 70%)`, filter: "blur(6px)", opacity: appear, pointerEvents: "none" }} />
      {/* parchment — width reveals as it unrolls */}
      <div style={{ position: "absolute", left: 14, top: 6, width: W, height: 82, overflow: "hidden", borderRadius: 3, background: "linear-gradient(180deg,#F3E6C4,#DCC79A)", boxShadow: "inset 0 0 14px rgba(120,80,30,0.35), 0 10px 20px -8px rgba(0,0,0,0.6)", border: "1px solid rgba(120,80,30,0.4)" }}>
        {/* deckle sheen sweep */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, transparent 42%, rgba(255,240,200,0.35) 50%, transparent 58%)`, transform: `translateX(${sheen}px)`, pointerEvents: "none" }} />
        {/* header */}
        <div style={{ position: "absolute", left: 12, top: 8, fontFamily: S6_FONT, fontWeight: 900, fontSize: 15, letterSpacing: 0.5, color: "#7A2418", whiteSpace: "nowrap", opacity: over(lf, 100, 6) }}>RAMSAY AGENT PROMPT</div>
        <div style={{ position: "absolute", left: 12, top: 28, width: 200, height: 2, background: "rgba(122,36,24,0.5)", opacity: over(lf, 102, 6) }} />
        {/* faux prompt rule-lines stagger in */}
        {S6_PROMPT_LINES.map((ln, i) => (
          <div key={i} style={{ position: "absolute", left: 12, top: 36 + i * 15, fontFamily: "'Courier New', 'Courier', monospace", fontSize: 11, color: "#4A2A12", whiteSpace: "nowrap", opacity: over(lf, ln.d, 6) }}>{"› " + ln.w}</div>
        ))}
      </div>
      {/* left brass roller (fixed) */}
      <div style={{ position: "absolute", left: 4, top: 0, width: 14, height: 94, borderRadius: 7, background: `linear-gradient(90deg,${BRASSD},${BRASS} 50%,${BRASSD})`, boxShadow: "0 4px 8px -3px rgba(0,0,0,0.6)" }} />
      {/* right brass roller travels with the unroll */}
      <div style={{ position: "absolute", left: 10 + W, top: 0, width: 14, height: 94, borderRadius: 7, background: `linear-gradient(90deg,${BRASSD},${BRASS} 50%,${BRASSD})`, boxShadow: "0 4px 8px -3px rgba(0,0,0,0.6)" }} />
      {/* red wax seal presses down bottom-left */}
      {sealIn > 0 && (
        <div style={{ position: "absolute", left: 22, top: 62, width: 30, height: 30, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, ${HKR_GLOW}, ${HKREDD})`, boxShadow: `0 0 10px ${HKRED}88, inset 0 -3px 5px rgba(0,0,0,0.4)`, opacity: sealIn, transform: `scale(${sealSX}, ${sealSY})`, transformOrigin: "50% 100%", zIndex: 2, border: `1px solid ${HKREDD}` }}>
          <div style={{ position: "absolute", inset: 6, borderRadius: "50%", border: "2px solid rgba(255,220,200,0.5)" }} />
        </div>
      )}
    </div>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- calm full-scene push-in (1.0 -> 1.035, eased over the whole shot). No per-beat zoom. ----
  const S6_push = interpolate(lf, [0, 148], [1, 1.035], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // ---- room-wide IMPACT KICK: a brief prop reaction (candles lurch, pans swing) on each landing. NOT camera, NOT flash. ----
  const S6_kick = (lf >= S6_IMPACT ? Math.exp(-(lf - S6_IMPACT) / 4.5) : 0) + (lf >= S6_STAMP ? 0.85 * Math.exp(-(lf - S6_STAMP) / 4.5) : 0);

  // ---- HERO PLAQUE: drops on brass chains + weighty SPRING ease-in (slight settle overshoot), NO slam-flash ----
  const S6_plaqueIn = spr(lf, 0, 17, 240);                                   // 0..~1, gentle overshoot = weight
  const S6_plaqueSettle = Math.exp(-lf / 8) * Math.sin(lf / 3.0) * 5;        // extra weighty settle wobble that decays fast
  const S6_plaqueY = interpolate(S6_plaqueIn, [0, 1], [-470, 0]) + (lf > 3 ? S6_plaqueSettle : 0);
  const S6_plaqueTopY = 66 + S6_plaqueY;                                     // actual on-screen top of the plaque (for the chains)
  const S6_plaqueSquash = 1 - 0.06 * Math.exp(-Math.max(0, lf - S6_IMPACT) / 4) * (lf >= S6_IMPACT ? 1 : 0); // vertical squash on land
  const S6_plaqueScale = interpolate(over(lf, 0, 12, Easing.cubic), [0, 1], [1.05, 1]);
  const S6_plaquePulse = 0.82 + Math.sin(lf / 11) * 0.18;                    // slow steady glow breathe (not a flash)
  const S6_impactGlow = over(lf, S6_IMPACT, 16);                            // soft warm ground bloom eases in + holds
  const S6_chainSwing = Math.exp(-lf / 15) * Math.sin(lf / 3.1) * 2.6 + Math.sin(lf / 42) * 0.5; // chains swing on land, then idle

  // ---- RAMSAY: STORMS in from the left, stomps on landing, POINTS at the tag, then folds arms ----
  // storm-jab -> accusing point at the tag -> HARD JAB flash on the REJECTED slam -> folded arms
  const S6_chefPose = lf < 22 ? "jab" : ((lf >= S6_STAMP - 2 && lf < S6_STAMP + 7) ? "jab" : (lf < S6_FLIP ? "point" : "cross"));
  const S6_stormX = interpolate(spr(lf, 0, 16, 175), [0, 1], [-64, 0]);      // strides in from the left, planted ~frame 12
  const S6_recoilX = lf >= S6_STAMP ? -5 * Math.exp(-(lf - S6_STAMP) / 6) * Math.cos((lf - S6_STAMP) / 3) : 0; // jolts when the stamp pounds
  const S6_chefSlide = interpolate(spr(lf, 0, 15, 190), [0, 1], [46, 0]);    // planted by ~frame 12
  const S6_impactDip = lf >= S6_IMPACT ? 7 * Math.exp(-(lf - S6_IMPACT) / 5) : 0; // brief weighty land
  const S6_crossDip = lf >= S6_FLIP ? 4 * Math.exp(-(lf - S6_FLIP) / 7) : 0;      // he settles into folded arms
  const S6_chefTop = 384 + S6_chefSlide + S6_impactDip + S6_crossDip;
  const S6_chefLeft = 366 + S6_stormX + S6_recoilX;
  const S6_crossBreath = lf >= S6_FLIP ? 1 + 0.014 * Math.sin((lf - S6_FLIP) / 6.5) : 1; // calm authority breathing after fold
  const S6_yell = ramp(lf, 0, 4) * (1 - ramp(lf, 22, 40));                  // one short bark on the slam
  // rage brow-flick + head-tilt when he growls "DO IT AGAIN" (~lf 70-96)
  const S6_growl = ramp(lf, 70, 74) * (1 - ramp(lf, 96, 104));
  // approving nod toward the unfurling prompt scroll (fills the old ~100-126 lull) — subtle
  const S6_nodAt = ramp(lf, 100, 105) * (1 - ramp(lf, 122, 128));
  // SECOND confirming nod on the payoff tail — kills the old ~128-148 hero-static lull (VO "honest"@130)
  const S6_nodAt2 = ramp(lf, 128, 132) * (1 - ramp(lf, 142, 148));
  const S6_headTilt = -3 * S6_growl + 1.4 * S6_nodAt * Math.sin((lf - 100) / 5) + 1.7 * S6_nodAt2 * Math.sin((lf - 128) / 4.5) + Math.sin(lf / 9) * 0.6 * (lf >= S6_FLIP ? 1 : 0);
  // hero stays physically active: an INSISTENT point-push at the tag while the stamp winds up (22-46),
  // then a lean toward the scroll on the payoff nod (128-148). Small, smooth, no cuts.
  const S6_pointNudge = (lf >= 22 && lf < 46) ? Math.sin((lf - 22) / 3.4) * 2.6 * (1 - ramp(lf, 40, 46)) : 0;
  const S6_tailLean = 7 * ramp(lf, 128, 134) * (1 - ramp(lf, 144, 148));

  // ============ SIGNATURE MOMENT: a BIG red "REJECTED" rubber stamp SLAMS over "SAME MODEL" on the rule beat ============
  // Lands on the pound frame (S6_STAMP@44 = VO "grade its own work") — the dominant hero gag. Winds up high, then
  // POUNDS straight down with a hard rubber-squash. Quick pop uses interpolate + Easing.out(Easing.back()) (NO spr).
  const S6_rejLoad = ramp(lf, S6_STAMP - 8, S6_STAMP);                       // winds up in the last few frames before the pound
  const S6_rejVisible = lf >= S6_STAMP - 8;
  const S6_rejDrop = over(lf, S6_STAMP, 7, Easing.out(Easing.back(2.6)));    // fast, heavy pound w/ overshoot — no spr
  const S6_rejY = lf < S6_STAMP
    ? -172 - (1 - S6_rejLoad) * 46                                           // raised high, hovering / winding up
    : interpolate(S6_rejDrop, [0, 1], [-172, 0]);                           // POUNDS straight down onto the tag, settles
  const S6_rejE = Math.max(0, lf - S6_STAMP);
  const S6_rejSquish = Math.exp(-S6_rejE / 4.2) * Math.sin(S6_rejE / 1.7);   // hard rubber press: squash grows then decays
  const S6_rejSX = 1 + 0.30 * S6_rejSquish;
  const S6_rejSY = 1 - 0.30 * S6_rejSquish;
  const S6_rejOp = lf < S6_STAMP ? S6_rejLoad * 0.42 : over(lf, S6_STAMP, 3);
  const S6_rejJit = lf < S6_STAMP ? Math.sin(lf / 2.1) * 1.8 * S6_rejLoad : 0; // vibrating, loaded stamp
  const S6_rejRot = -13 + S6_rejJit;                                         // angled rubber stamp, settles to -13deg
  // hero reacts HARD: a jab-lunge into the hit (Gaussian punch peaks on the pound) then a recoil back — quick pop, no spr
  const S6_jabPunch = 26 * Math.exp(-Math.pow((lf - S6_STAMP) / 3.4, 2));    // lunge toward the tag, peaks on the slam
  const S6_jabRecoil = lf > S6_STAMP + 4 ? -9 * Math.exp(-(lf - S6_STAMP - 4) / 6) : 0; // recoils back off the hit
  const S6_slamYell = ramp(lf, S6_STAMP - 3, S6_STAMP + 1) * (1 - ramp(lf, S6_STAMP + 6, S6_STAMP + 18)); // bark on the slam

  const S6_leanX = S6_pointNudge + S6_tailLean + S6_jabPunch + S6_jabRecoil;

  // ---- red PROHIBITION stamp over "SAME MODEL": WINDS UP (anticipation) then POUNDS down + rubber-squash press ----
  const S6_loadT = ramp(lf, S6_STAMPLOAD, S6_STAMP);                        // 0..1 wind-up before the pound
  const S6_stampVisible = lf >= S6_STAMPLOAD;
  const S6_stampDrop = spr(lf, S6_STAMP, 9, 320);                           // fast, heavy pound spring (overshoots = press)
  const S6_stampY = lf < S6_STAMP
    ? -94 - S6_loadT * 22                                                    // hovers + winds UP higher as it loads
    : interpolate(S6_stampDrop, [0, 1], [-116, 0]);                         // POUNDS down from raised height, settles
  const S6_stampGrow = lf < S6_STAMP ? interpolate(S6_loadT, [0, 1], [0.8, 1.0]) : 1; // fills in as it loads
  const S6_stampOp = lf < S6_STAMP ? interpolate(S6_loadT, [0, 1], [0, 0.72]) : over(lf, S6_STAMP, 4);
  const S6_stampJitter = lf < S6_STAMP ? Math.sin(lf / 2.2) * 1.5 * S6_loadT : 0; // vibrating, loaded stamp
  const S6_stampE = Math.max(0, lf - (S6_STAMP + 2));                       // squash starts at contact
  const S6_stampSquish = Math.exp(-S6_stampE / 5.5) * Math.sin(S6_stampE / 2.1); // rubber press: grows then decays
  const S6_stampSX = 1 + 0.18 * S6_stampSquish;
  const S6_stampSY = 1 - 0.18 * S6_stampSquish;
  const S6_stampShock = over(lf, S6_STAMP + 1, 10);                         // expanding ink-ring shockwave
  const S6_tagDead = ramp(lf, S6_STAMP, S6_STAMP + 10);                     // "SAME MODEL" greys once struck
  const S6_tagJolt = lf >= S6_STAMP ? -4 * Math.exp(-(lf - S6_STAMP) / 4) * Math.cos((lf - S6_STAMP) / 2) : 0; // tag flinches under the stamp

  // ambient warm spotlight breathe + slow god-ray shimmer + warm room-light pulse
  const S6_spotBreathe = 0.9 + Math.sin(lf / 9) * 0.1;
  const S6_rayShimmer = 0.5 + 0.5 * Math.sin(lf / 13);
  const S6_roomWarm = 0.9 + 0.1 * Math.sin(lf / 17);                        // whole-room candle-warmth breathe
  const S6_chandelier = 0.8 + 0.2 * (0.5 + 0.5 * Math.sin(lf / 6));         // pendant-lamp flicker

  // sweat bead on the rage growl beat
  const S6_sweat = ramp(lf, 76, 80);
  const S6_sweatY = 470 + ramp(lf, 80, 100) * 60;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${S6_push})`, transformOrigin: "50% 50%", zIndex: 0 }}>
      {/* ================= WARM FINE-DINING ROOM ================= */}
      {/* deep warm base — candlelit mahogany room, NOT grey/black */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#231509 0%,#2E1B0D 44%,#160D06 100%)", zIndex: 0 }} />
      {/* broad warm ambient bloom filling the room */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 92% 70% at 50% 34%, rgba(120,74,32,${0.34 * S6_roomWarm}), transparent 72%)`, zIndex: 0 }} />

      {/* --- back wall: warm walnut panelling (vertical planks + trim rails) --- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 600, background: "linear-gradient(180deg,#3A2312,#26160A)", zIndex: 0 }} />
      {Array.from({ length: 13 }, (_, i) => (
        <div key={`plank${i}`} style={{ position: "absolute", left: i * 84 + 6, top: 0, width: 76, height: 560, borderRadius: 4, background: `linear-gradient(180deg, rgba(94,58,26,${0.5 + (i % 2) * 0.16}), rgba(48,28,12,0.5))`, boxShadow: "inset 1px 0 0 rgba(150,96,44,0.18), inset -1px 0 0 rgba(0,0,0,0.35)", zIndex: 0 }} />
      ))}
      {/* brass dado rail across the panelling */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 5, background: `linear-gradient(90deg, transparent, ${BRASS}66 20%, ${BRASS}88 50%, ${BRASS}66 80%, transparent)`, boxShadow: `0 1px 3px rgba(0,0,0,0.5)`, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 3, background: `linear-gradient(90deg, transparent, ${BRASSD}55, transparent)`, zIndex: 1 }} />

      {/* --- back-left WINE RACK: warm wood lattice full of bottle ends (a Ramsay cellar wall) --- */}
      <div style={{ position: "absolute", left: 26, top: 330, width: 150, height: 210, borderRadius: 8, background: "linear-gradient(180deg,#2A1809,#170C04)", border: `2px solid rgba(120,74,32,0.5)`, boxShadow: "inset 0 0 18px rgba(0,0,0,0.55)", zIndex: 1, opacity: 0.94 }}>
        {S6_WINE.map(({ col, row, i }) => {
          const gl = 0.4 + 0.6 * seed(i + 2);
          const glint = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(lf / 12 + i));
          const cork = ["#5A2418", "#3E7A4A", "#6B1F1F", "#2C2C3A"][i % 4];
          return (
            <div key={i} style={{ position: "absolute", left: 14 + col * 44, top: 14 + row * 48, width: 34, height: 34, borderRadius: "50%", background: `radial-gradient(circle at 38% 32%, ${cork}, #120A05)`, boxShadow: `inset 0 0 6px rgba(0,0,0,0.7)` }}>
              <div style={{ position: "absolute", left: 8, top: 6, width: 7, height: 7, borderRadius: "50%", background: `rgba(255,220,150,${0.5 * glint * gl})`, filter: "blur(1px)" }} />
            </div>
          );
        })}
      </div>
      {/* --- back-right FRAMED ART on the panelling (two warm gilt frames) --- */}
      {[{ x: 812, y: 150, w: 120, h: 150 }, { x: 848, y: 340, w: 96, h: 74 }].map((f, i) => (
        <div key={`art${i}`} style={{ position: "absolute", left: f.x, top: f.y, width: f.w, height: f.h, borderRadius: 4, background: "linear-gradient(180deg,#1A100A,#0E0805)", border: `4px solid ${BRASSD}`, boxShadow: `0 0 0 1px ${BRASS}55, 0 10px 20px -8px rgba(0,0,0,0.7)`, zIndex: 1, opacity: 0.9 }}>
          <div style={{ position: "absolute", inset: 6, borderRadius: 2, background: `linear-gradient(150deg, rgba(120,70,30,0.6), rgba(60,32,14,0.6))` }} />
          <div style={{ position: "absolute", left: "18%", bottom: "22%", width: "64%", height: "34%", borderRadius: 3, background: `radial-gradient(ellipse at 50% 60%, rgba(231,178,76,0.35), transparent 70%)` }} />
        </div>
      ))}

      {/* --- brass WALL SCONCES on the side walls (flickering warm flame) --- */}
      {[{ x: 60, y: 200, ph: 0 }, { x: 952, y: 210, ph: 7 }].map((sc, i) => {
        const fl = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(lf / 4 + sc.ph)) + S6_kick * 0.4;
        return (
          <div key={`sconce${i}`} style={{ position: "absolute", left: sc.x - 12, top: sc.y, width: 24, height: 60, zIndex: 3 }}>
            <div style={{ position: "absolute", left: -34, top: -30, width: 92, height: 92, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%, rgba(255,175,80,${0.3 * fl}), transparent 70%)`, filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: 8, top: 20, width: 8, height: 40, background: `linear-gradient(180deg,${BRASS},${BRASSD})`, borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 2, top: 6, width: 20, height: 16, borderRadius: "50% 50% 40% 40%", background: `radial-gradient(circle at 50% 60%, ${FLAME_CORE}, ${EMBER})`, boxShadow: `0 0 14px ${FLAME}bb`, transform: `scaleY(${fl})`, transformOrigin: "50% 100%" }} />
          </div>
        );
      })}

      {/* --- warm hanging PENDANT LAMPS (dining-room lighting, gentle sway + flicker, extra swing on impacts) --- */}
      {[{ x: 214, drop: 118, ph: 0 }, { x: 812, drop: 132, ph: 5 }].map((p, i) => {
        const swing = Math.sin(lf / 34 + p.ph) * 1.6 + S6_kick * Math.sin(lf / 2.2 + p.ph) * 2.2;
        return (
          <div key={`pend${i}`} style={{ position: "absolute", left: p.x, top: 0, width: 0, zIndex: 5, transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }}>
            <div style={{ position: "absolute", left: -1, top: 0, width: 2, height: p.drop, background: "rgba(120,74,32,0.6)" }} />
            <div style={{ position: "absolute", left: -46, top: p.drop - 40, width: 92, height: 92, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%, rgba(255,190,100,${0.34 * S6_chandelier}), transparent 68%)`, filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: -24, top: p.drop, width: 48, height: 30, borderRadius: "50% 50% 46% 46%", background: `linear-gradient(180deg,${BRASS},${BRASSD})`, boxShadow: `0 0 0 1px ${BRASSD}, inset 0 -6px 10px rgba(0,0,0,0.4)` }} />
            <div style={{ position: "absolute", left: -9, top: p.drop + 20, width: 18, height: 18, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%, ${FLAME_CORE}, ${FLAMEY})`, boxShadow: `0 0 18px ${FLAMEY}cc`, opacity: S6_chandelier }} />
          </div>
        );
      })}

      {/* --- plush burgundy BOOTHS receding at mid-depth (soft, dim) --- */}
      {[{ x: -30, w: 220 }, { x: 822, w: 240 }].map((bt, i) => (
        <div key={`booth${i}`} style={{ position: "absolute", left: bt.x, top: 428, width: bt.w, height: 150, borderRadius: "40px 40px 0 0", background: "linear-gradient(180deg,#5A1E1C,#2E0E0D)", boxShadow: "inset 0 8px 18px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(120,40,36,0.5)", zIndex: 2, opacity: 0.86, filter: "blur(0.4px)" }}>
          {/* tufted buttons */}
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
            <div key={`${r}-${c}`} style={{ position: "absolute", left: 34 + c * (bt.w - 80) / 2, top: 24 + r * 40, width: 6, height: 6, borderRadius: "50%", background: "rgba(20,6,6,0.7)", boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
          )))}
        </div>
      ))}

      {/* a waiter hurrying across the room (continuous background event) */}
      <S6_Waiter lf={lf} />

      {/* single warm spotlight pool, centred (gentle breathe) */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 52% at 50% 40%, rgba(231,178,76,${0.18 * S6_spotBreathe}), transparent 64%)`, zIndex: 3 }} />
      <SpotCone x={S6_CX} top={0} topW={96} botW={540} h={660} color={`${GOLD}2E`} sway={0} lf={lf} pool={0} />
      {/* soft moving god-ray inside the cone (shimmer, not flash) */}
      <div style={{ position: "absolute", left: S6_CX - 26, top: 0, width: 52, height: 620, background: `linear-gradient(180deg, ${GOLD}26, transparent 80%)`, filter: "blur(6px)", opacity: 0.2 + 0.12 * S6_rayShimmer, transform: `translateX(${Math.sin(lf / 15) * 22}px)`, zIndex: 3, pointerEvents: "none" }} />

      {/* dim background diners/cooks in the deep warm room (parallax, secondary) */}
      {S6_COOKS.map((c, i) => (
        <S6_Cook key={i} lf={lf} x={c.x} y={c.y} s={c.s} ph={c.ph} amp={c.amp} per={c.per} tint={c.tint} />
      ))}

      {/* drifting warm bokeh (candle & glass reflections floating in the room haze) */}
      {S6_BOKEH.map((i) => {
        const bx = 40 + seed(i) * 940 + Math.sin(lf / 26 + i) * 16;
        const by = 120 + seed(i + 5) * 420 + Math.sin(lf / 34 + i * 2) * 12;
        const bs = 8 + seed(i + 3) * 26;
        const bo = (0.06 + seed(i + 7) * 0.12) * (0.6 + 0.4 * Math.sin(lf / 18 + i));
        return <div key={`bok${i}`} style={{ position: "absolute", left: bx, top: by, width: bs, height: bs, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(255,205,130,0.9), rgba(255,170,80,0))", opacity: bo, filter: "blur(1px)", zIndex: 4, pointerEvents: "none" }} />;
      })}

      {/* faint floor light ellipse (the chef's table stands in it) */}
      <div style={{ position: "absolute", left: S6_CX - 320, top: 560, width: 640, height: 130, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, ${GOLD}2A, transparent 70%)`, zIndex: 3 }} />

      {/* warm copper pans on a ceiling rail (framing, restaurant detail, swing harder on impacts) */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 30, height: 3, background: `linear-gradient(90deg,transparent,${BRASS}55,transparent)`, zIndex: 4 }} />
      {[130, 190, 838, 900].map((px, i) => (
        <div key={i} style={{ position: "absolute", left: px, top: 32, zIndex: 4, opacity: 0.62, transform: `rotate(${Math.sin(lf / 40 + i) * 1.4 + S6_kick * Math.sin(lf / 2 + i) * 7}deg)`, transformOrigin: "50% 0%" }}>
          <div style={{ width: 2, height: 20 + (i % 2) * 14, background: `${BRASSD}88`, margin: "0 auto" }} />
          <div style={{ width: 40 - (i % 2) * 10, height: 40 - (i % 2) * 10, borderRadius: "50%", background: `linear-gradient(180deg,#C6772E,#7A3F16)`, border: `1px solid ${BRASS}66`, boxShadow: "inset 0 3px 5px rgba(0,0,0,0.5), inset 0 -3px 6px rgba(255,190,110,0.25)" }} />
        </div>
      ))}

      {/* white-linen chef's-table counter (tiny weighty settle on landing, no shake) */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 600, height: 92, borderRadius: 10, background: `linear-gradient(180deg,#F3ECDD,#CBBFA6)`, border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 -2px 0 rgba(255,255,255,0.5) inset, 0 26px 50px -18px rgba(0,0,0,0.6)", transform: `translateY(${(S6_impactDip + (lf >= S6_STAMP ? 4 * Math.exp(-(lf - S6_STAMP) / 5) : 0)) * 0.15}px)`, zIndex: 8 }} />
      {/* linen fold shadows + warm candle wash on the cloth */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 600, height: 92, borderRadius: 10, background: `linear-gradient(90deg, rgba(255,170,80,0.16), transparent 30%, transparent 70%, rgba(255,170,80,0.16)), repeating-linear-gradient(90deg, transparent 0 60px, rgba(0,0,0,0.05) 60px 61px)`, zIndex: 9, pointerEvents: "none" }} />
      {/* counter front lip highlight */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 600, height: 4, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)", zIndex: 9 }} />

      {/* folded napkin + wine bottle & glasses dressed on the chef's table (left, clear of the hero) */}
      <div style={{ position: "absolute", left: 96, top: 566, zIndex: 11 }}>
        {/* folded white napkin */}
        <div style={{ position: "absolute", left: 96, top: 22, width: 44, height: 30, borderRadius: 3, background: "linear-gradient(180deg,#FBF7EE,#DDD3C0)", boxShadow: "0 4px 8px -3px rgba(0,0,0,0.4)", transform: "rotate(-6deg)" }} />
        {/* wine bottle */}
        <div style={{ position: "absolute", left: 8, top: -52, width: 22, height: 74, borderRadius: "10px 10px 5px 5px", background: "linear-gradient(180deg,#173A22,#0C2013)", boxShadow: "inset -3px 0 5px rgba(0,0,0,0.5), inset 3px 0 4px rgba(120,200,150,0.2)" }}>
          <div style={{ position: "absolute", left: 7, top: -14, width: 8, height: 16, borderRadius: 2, background: "#0E2415" }} />
          <div style={{ position: "absolute", left: 3, top: 26, width: 16, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#E7D6A8,#C7A85E)", boxShadow: "inset 0 0 3px rgba(0,0,0,0.3)" }} />
          <div style={{ position: "absolute", left: 4, top: -6, width: 3, height: 70, borderRadius: 2, background: `rgba(255,225,160,${0.3 + 0.3 * (0.5 + 0.5 * Math.sin(lf / 10))})`, filter: "blur(1px)" }} />
        </div>
        {/* two wine glasses (warm rim glints) */}
        {[38, 58].map((gx, i) => (
          <div key={`gl${i}`} style={{ position: "absolute", left: gx, top: -18, width: 14, height: 30, zIndex: 11 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: 16, borderRadius: "0 0 8px 8px", background: "linear-gradient(180deg, rgba(230,240,235,0.25), rgba(120,20,30,0.55) 55%)", border: "1px solid rgba(255,255,255,0.35)" }} />
            <div style={{ position: "absolute", left: 6, top: 15, width: 2, height: 12, background: "rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", left: 3, top: 27, width: 8, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", left: 2, top: 1, width: 3, height: 12, borderRadius: 2, background: `rgba(255,235,180,${0.4 + 0.4 * (0.5 + 0.5 * Math.sin(lf / 8 + i))})`, filter: "blur(0.5px)" }} />
          </div>
        ))}
      </div>

      {/* silver CLOCHE on the table with a rising steam wisp (continuous life, right of the hero) */}
      <div style={{ position: "absolute", left: 662, top: 588, width: 66, height: 34, borderRadius: "34px 34px 6px 6px", background: "linear-gradient(180deg,#E7ECF2,#9AA6B6 60%,#5C6A7E)", boxShadow: "inset 0 4px 8px rgba(255,255,255,0.5), 0 8px 14px -6px rgba(0,0,0,0.5)", zIndex: 11 }}>
        <div style={{ position: "absolute", left: 27, top: -7, width: 12, height: 12, borderRadius: "50%", background: `linear-gradient(180deg,${BRASS},${BRASSD})`, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 10, top: 6, width: 18, height: 8, borderRadius: 6, background: "rgba(255,255,255,0.45)", filter: "blur(1px)" }} />
      </div>
      <S6_Steam lf={lf} x={695} y={588} />

      {/* warm candles glowing through the room + on the chef's table (flames LURCH on impacts) */}
      {S6_CANDLES.map((c, i) => (
        <S6_Candle key={`cd${i}`} lf={lf} x={c.x} y={c.y} s={c.s} ph={c.ph} kick={S6_kick} />
      ))}

      {/* the "RAMSAY AGENT PROMPT" scroll unfurls on the table during the old quiet tail (fills lf ~98-148) */}
      <S6_Scroll lf={lf} />

      {/* rising motes in the beam (continuous, smooth loop, gentle sway) */}
      {S6_MOTES.map((i) => {
        const p = (lf / 90 + seed(i)) % 1;
        const mx = S6_CX - 240 + seed(i + 3) * 480 + Math.sin(lf / 20 + i) * 10;
        const my = 660 - p * 560;
        const sz = 3 + seed(i + 9) * 3;
        return <div key={i} style={{ position: "absolute", left: mx, top: my, width: sz, height: sz, borderRadius: "50%", background: "rgba(255,196,110,0.6)", opacity: (1 - p) * 0.6 * (0.7 + 0.3 * S6_rayShimmer), zIndex: 6 }} />;
      })}

      {/* soft warm ground bloom under the plaque (eases in + holds — ambience, NOT a flash) */}
      <div style={{ position: "absolute", left: S6_CX - 360, top: 300, width: 720, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${GOLD}24, transparent 66%)`, opacity: S6_impactGlow * (0.7 + 0.3 * S6_plaquePulse), zIndex: 2, pointerEvents: "none" }} />

      {/* soft expanding impact ring the moment the plaque + chef land (no flash, fades) */}
      {lf >= S6_IMPACT && lf < S6_IMPACT + 16 && (
        <div style={{ position: "absolute", left: S6_CX, top: 636, width: 380, height: 120, marginLeft: -190, marginTop: -60, borderRadius: "50%", border: `${5 * (1 - over(lf, S6_IMPACT, 15))}px solid ${GOLD}`, transform: `scale(${0.5 + over(lf, S6_IMPACT, 15) * 1.3})`, opacity: (1 - over(lf, S6_IMPACT, 15)) * 0.5, zIndex: 7, pointerEvents: "none" }} />
      )}

      {/* ================= BRASS CHAINS the plaque hangs from (swing on landing, then idle) ================= */}
      {[S6_CX - 300, S6_CX + 300].map((cx, i) => {
        const len = S6_plaqueTopY - 22;
        if (len <= 4) return null;
        return (
          <div key={`chain${i}`} style={{ position: "absolute", left: cx, top: 22, width: 8, height: len, transformOrigin: "50% 0%", transform: `translateX(-50%) rotate(${S6_chainSwing * (i ? 1 : -1) * 0.45}deg)`, zIndex: 29 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: `repeating-linear-gradient(180deg, ${BRASS} 0 5px, ${BRASSD} 5px 11px)`, boxShadow: "inset 0 0 2px rgba(0,0,0,0.6), 0 0 3px rgba(0,0,0,0.4)" }} />
            {/* brass mounting ring at the ceiling rail */}
            <div style={{ position: "absolute", left: -4, top: -8, width: 16, height: 16, borderRadius: "50%", border: `3px solid ${BRASSD}`, background: "transparent" }} />
          </div>
        );
      })}

      {/* ================= HERO PLAQUE — drops on the chains + weighty spring ease-in + squash-settle ================= */}
      <div style={{ position: "absolute", left: S6_CX, top: 66, transform: `translate(-50%, ${S6_plaqueY}px) scale(${S6_plaqueScale}, ${S6_plaqueScale * S6_plaqueSquash})`, transformOrigin: "50% 0%", zIndex: 30 }}>
        <div style={{ width: 812, padding: "26px 30px 30px", borderRadius: 18, background: "linear-gradient(180deg,#2A1D12,#160E07)", border: `4px solid ${BRASS}`, boxShadow: `0 0 0 2px ${BRASSD} inset, 0 30px 60px -18px rgba(0,0,0,0.8), 0 0 ${28 + 14 * S6_plaquePulse}px ${GOLD}30` }}>
          {/* brass corner rivets */}
          {[[16, 16], [780, 16], [16, 176], [780, 176]].map((c, i) => (
            <div key={i} style={{ position: "absolute", left: c[0], top: c[1], width: 12, height: 12, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${BRASS}, ${BRASSD})`, boxShadow: "0 1px 2px rgba(0,0,0,0.6)" }} />
          ))}
          {/* faint engraved sheen sweeping across the brass (subtle life) */}
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, borderRadius: 14, background: `linear-gradient(115deg, transparent 40%, rgba(255,236,200,0.08) ${46 + 6 * S6_rayShimmer}%, transparent 58%)`, pointerEvents: "none" }} />
          <div style={{ fontFamily: S6_FONT, fontWeight: 900, textAlign: "center", lineHeight: 0.98, letterSpacing: -0.5, color: "#F7ECD6", textShadow: "0 4px 0 #6E4A12, 0 12px 26px rgba(0,0,0,0.6)", WebkitTextStroke: "1.5px #1A1813" }}>
            <div style={{ fontSize: 58 }}>NEVER GRADE</div>
            <div style={{ fontSize: 58 }}>YOUR OWN</div>
            <div style={{ fontSize: 76, color: "#FF7A1A", textShadow: `0 4px 0 #6E120C, 0 0 ${28 + 22 * S6_growl}px ${HKR_GLOW}${S6_growl > 0.02 ? "cc" : "88"}` }}>WORK</div>
          </div>
        </div>
      </div>

      {/* slam dust — off the plaque base and the table (soft, fades, layered) */}
      <S6_Dust lf={lf} cx={S6_CX} cy={252} startF={S6_IMPACT} />
      <S6_Dust lf={lf} cx={S6_CX} cy={608} startF={S6_IMPACT + 1} spread={1.3} />
      <S6_Dust lf={lf} cx={S6_CX} cy={266} startF={S6_IMPACT + 5} spread={0.7} drop={40} />

      {/* ================= RAMSAY — storms in, stomps, points at the tag, jabs the slam, then folds arms + breathes ================= */}
      <div style={{ position: "absolute", left: S6_chefLeft, top: S6_chefTop, width: 280, height: 280, zIndex: 20, transform: `translateX(${S6_leanX}px) rotate(${S6_headTilt * 0.25}deg) scale(${S6_crossBreath})`, transformOrigin: "50% 90%" }}>
        <RamsayChef lf={lf} size={280} pose={S6_chefPose} tint={CLAY} yell={Math.max(S6_yell, S6_growl * 0.4, S6_slamYell)} brow={1} nod={1} gaze={lf < 22 ? 0 : (S6_chefPose === "cross" ? 1 : 2)} />
      </div>

      {/* stomp dust at the chef's feet on the slam-landing */}
      <S6_Dust lf={lf} cx={S6_chefLeft + 140} cy={646} startF={S6_IMPACT} spread={0.85} drop={30} />

      {/* sweat bead trickling on the rage growl (delightful little detail) */}
      {S6_sweat > 0 && (
        <div style={{ position: "absolute", left: 452, top: S6_sweatY, width: 9, height: 13, borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", background: "linear-gradient(180deg, rgba(210,235,255,0.9), rgba(150,190,230,0.85))", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.6)", opacity: S6_sweat * (1 - ramp(lf, 96, 104)), zIndex: 26 }} />
      )}

      {/* Ramsay's rage bubble — pops in AFTER plaque settles + he folds arms; tail tip nudged into the plaque->head gap so it points DOWN to him without covering his face or the plaque WORD */}
      <SpeechBubble lf={lf} at={70 / 30} dur={1.7} x={S6_CX} y={366} text="DO IT AGAIN." tail="down" tone="rage" size={30} />

      {/* ================= "SAME MODEL" tag — smoothly stamped out (flinches under the press, then cracks) ================= */}
      <div style={{ position: "absolute", left: 800, top: 548, transform: `translate(-50%,-50%) translateY(${S6_tagJolt}px)`, zIndex: 24 }}>
        <div style={{ position: "relative", padding: "8px 18px", borderRadius: 10, background: `linear-gradient(180deg,${lerpHex("#C9D2DE", "#5B6470", S6_tagDead)}, ${lerpHex("#9AA6B6", "#3A4048", S6_tagDead)})`, border: "2px solid rgba(255,255,255,0.35)", fontFamily: S6_FONT, fontWeight: 900, fontSize: 26, letterSpacing: 1, color: lerpHex("#14171B", "#20242A", S6_tagDead), boxShadow: "0 10px 22px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap", opacity: 1 - S6_tagDead * 0.28 }}>
          SAME MODEL
          {/* fracture lines splintering across the struck tag (fade in after the pound) */}
          {S6_tagDead > 0.02 && [
            { l: "18%", t: "10%", w: 46, r: 28 },
            { l: "58%", t: "40%", w: 40, r: -22 },
            { l: "34%", t: "62%", w: 34, r: 12 },
          ].map((k, i) => (
            <div key={`crk${i}`} style={{ position: "absolute", left: k.l, top: k.t, width: k.w, height: 2, background: "rgba(20,10,8,0.75)", transform: `rotate(${k.r}deg)`, opacity: S6_tagDead * 0.9, boxShadow: "0 1px 0 rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>

      {/* red ink DROPLETS flung out when the stamp bites (soft, fade — no flash) */}
      {S6_INK.map((i) => {
        const t = ramp(lf, S6_STAMP + 2, S6_STAMP + 22);
        if (t <= 0 || t >= 1) return null;
        const eo = 1 - (1 - t) * (1 - t);
        const ang = (seed(i) * 2 - 1) * Math.PI;
        const dist = (26 + seed(i + 4) * 78) * eo;
        const x = 800 + Math.cos(ang) * dist;
        const y = 548 + Math.sin(ang) * dist + eo * eo * 26;
        const sz = 4 + seed(i + 2) * 8;
        return <div key={`ink${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: HKRED, boxShadow: `0 0 5px ${HKRED}88`, opacity: (1 - t) * 0.85, zIndex: 37, pointerEvents: "none" }} />;
      })}

      {/* dust puff kicked up right where the stamp pounds the tag */}
      <S6_Dust lf={lf} cx={800} cy={560} startF={S6_STAMP + 2} spread={0.7} drop={34} tint="rgba(226,59,46,0.6)" />

      {/* expanding ink-ring shockwave the instant the stamp bites (soft, fades — no flash) */}
      {S6_stampShock > 0 && S6_stampShock < 1 && (
        <div style={{ position: "absolute", left: 800, top: 548, width: 132, height: 132, marginLeft: -66, marginTop: -66, borderRadius: "50%", border: `${8 * (1 - S6_stampShock)}px solid ${HKRED}`, transform: `scale(${0.7 + S6_stampShock * 1.1})`, opacity: (1 - S6_stampShock) * 0.5, zIndex: 37, pointerEvents: "none" }} />
      )}

      {/* red PROHIBITION circle-slash — WINDS UP above the tag then POUNDS down + rubber-squash press (steady glow, no flash) */}
      {S6_stampVisible && (
        <div style={{ position: "absolute", left: 800, top: 548, transform: `translate(-50%,-50%) translateY(${S6_stampY}px) scale(${S6_stampGrow * S6_stampSX}, ${S6_stampGrow * S6_stampSY}) rotate(${-8 + S6_stampJitter}deg)`, zIndex: 38, opacity: S6_stampOp }}>
          <div style={{ width: 132, height: 132, borderRadius: "50%", border: `12px solid ${HKRED}`, boxShadow: `0 0 22px ${HKRED}88, 0 8px 20px -6px rgba(0,0,0,0.6)` }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 132, height: 12, background: HKRED, borderRadius: 6, transform: "translate(-50%,-50%) rotate(-45deg)", boxShadow: `0 0 16px ${HKRED}88` }} />
        </div>
      )}

      {/* ================= SIGNATURE MOMENT — big "REJECTED" rubber stamp SLAMS over "SAME MODEL" on the rule beat ================= */}
      {/* big shockwave ring bursts the instant REJECTED bites (soft, expands, fades — no flash) */}
      {lf >= S6_STAMP && lf < S6_STAMP + 22 && (
        <div style={{ position: "absolute", left: 800, top: 548, width: 250, height: 250, marginLeft: -125, marginTop: -125, borderRadius: "50%", border: `${11 * (1 - over(lf, S6_STAMP, 21))}px solid ${HKR_GLOW}`, transform: `scale(${0.45 + over(lf, S6_STAMP, 21) * 1.55})`, opacity: (1 - over(lf, S6_STAMP, 21)) * 0.55, zIndex: 40, pointerEvents: "none" }} />
      )}
      {/* extra red dust burst kicked out under the big stamp */}
      <S6_Dust lf={lf} cx={800} cy={556} startF={S6_STAMP} spread={1.15} drop={44} tint="rgba(226,59,46,0.68)" />
      {/* the stamp itself: winds up high, POUNDS straight down, hard rubber-squash (interpolate + Easing.back, no spr) */}
      {S6_rejVisible && (
        <div style={{ position: "absolute", left: 800, top: 548, transform: `translate(-50%,-50%) translateY(${S6_rejY}px) rotate(${S6_rejRot}deg) scale(${S6_rejSX}, ${S6_rejSY})`, transformOrigin: "50% 50%", zIndex: 41, opacity: S6_rejOp }}>
          <div style={{ position: "relative", padding: "10px 26px", border: `7px solid ${HKRED}`, borderRadius: 12, background: "rgba(226,59,46,0.12)", boxShadow: `0 0 34px ${HKRED}66, 0 14px 28px -8px rgba(0,0,0,0.65), inset 0 0 0 3px ${HKREDD}` }}>
            <div style={{ fontFamily: S6_FONT, fontWeight: 900, fontSize: 56, letterSpacing: 5, color: HKRED, WebkitTextStroke: `1.5px ${HKREDD}`, textShadow: `0 3px 0 ${HKREDD}, 0 0 22px ${HKR_GLOW}88`, whiteSpace: "nowrap", lineHeight: 1 }}>REJECTED</div>
            {/* inky-rubber distress specks (cream gaps) — deterministic, reads as a real stamp not a clean chip */}
            {S6_REJSPECK.map((i) => (
              <div key={`rsp${i}`} style={{ position: "absolute", left: `${7 + seed(i) * 86}%`, top: `${14 + seed(i + 3) * 62}%`, width: 3 + seed(i + 1) * 5, height: 3 + seed(i + 5) * 4, borderRadius: "50%", background: "rgba(236,233,226,0.5)", opacity: 0.5, pointerEvents: "none" }} />
            ))}
          </div>
        </div>
      )}

      {/* gentle gold glint on the plaque as VO lands "honest" (soft burst, numeric at) */}
      <Sparkles lf={lf} at={130 / 30} x={S6_CX} y={150} n={12} spread={220} colors={[GOLD, "#FFFFFF", BRASS]} dur={0.9} />

      {/* SECOND warm payoff glint — on the unfurled scroll as the hero nods at it (VO "honest"@130). Keeps the tail alive. */}
      <Sparkles lf={lf} at={133 / 30} x={820} y={650} n={9} spread={112} colors={[GOLD, "#FFF3D0", BRASS]} dur={0.8} />

      {/* gentle embers + warm haze */}
      <Embers lf={lf} n={12} w={1012} base={700} />
      <Vignette strength={0.6} shape="rect" />
    </div>
  );
};

// ===== CTA =====
// ===== CTA =====
// ===== SCENE CTA — AWARDS FINALE STAGE inside a warm Ramsay restaurant (self-bounds to the panel box) =====
const SCTA_STAGE_TOP = "#3A2214";   // warm mahogany back wall (top)
const SCTA_STAGE_MID = "#2A160C";   // warm mid
const SCTA_STAGE_BOT = "#170C07";   // deep warm floor shadow
const SCTA_FLOOR = "#4A2A18";       // warm wood floor
const SCTA_WOOD_HI = "#6B3E22";     // warm wood highlight
const SCTA_DRAPE = "#7A1B14";       // deep velvet red drape
const SCTA_DRAPED = "#48100C";      // drape shadow
const SCTA_CARPET = "#8E241A";      // red carpet runner
const SCTA_CONFETTI = [GOLD, HKRED, FLAMEY, GREEN, SKY, "#F6F3EC", HKR_GLOW];
const SCTA_SERIF = "Georgia, 'Times New Roman', serif";
const SCTA_SANS = "system-ui, Arial, sans-serif";

// marquee plaque geometry + a running perimeter bulb-ring (lights RACE around the border)
const SCTA_MW = 440;
const SCTA_MH = 132;
const SCTA_BULBS: { x: number; y: number }[] = (() => {
  const arr: { x: number; y: number }[] = [];
  const nT = 8, nB = 8, nS = 3;
  for (let i = 0; i < nT; i++) arr.push({ x: 28 + i * (SCTA_MW - 56) / (nT - 1), y: -7 });
  for (let i = 0; i < nS; i++) arr.push({ x: SCTA_MW + 7, y: 32 + i * (SCTA_MH - 64) / (nS - 1) });
  for (let i = 0; i < nB; i++) arr.push({ x: SCTA_MW - 28 - i * (SCTA_MW - 56) / (nB - 1), y: SCTA_MH + 7 });
  for (let i = 0; i < nS; i++) arr.push({ x: -7, y: SCTA_MH - 32 - i * (SCTA_MH - 64) / (nS - 1) });
  return arr;
})();

// one confetti flake — GENTLE continuous fall with rotation + flutter + drift variety
const SCTA_Flake: React.FC<{ i: number; lf: number }> = ({ i, lf }) => {
  const x0 = seed(i) * 1012;
  const y0 = seed(i + 13) * 792 - 40;            // pre-spread across the height
  const fall = 42 + seed(i + 7) * 74;            // px/sec, soft downward drift
  const swAmp = 14 + seed(i + 5) * 24;
  const swPer = 42 + seed(i + 8) * 40;
  const drift = (seed(i + 17) - 0.5) * 26;       // slow lateral drift direction
  const t = lf / FPS;
  const y = y0 + fall * t;
  const x = x0 + Math.sin((lf + i * 9) / swPer) * swAmp + drift * t;
  // per-flake rotation speed + starting phase for variety
  const rot = seed(i + 3) * 360 + lf * (2.2 + seed(i + 9) * 5.0);
  // flutter: fake a spinning flip so flakes catch/lose the light
  const flip = 0.35 + 0.65 * Math.abs(Math.cos((lf + i * 7) / (26 + seed(i + 4) * 20)));
  const round = seed(i + 6) > 0.72;              // some round sequins
  const w = 10 + seed(i + 5) * 12;
  const h = round ? w : 6 + seed(i + 11) * 8;
  const cIdx = Math.min(SCTA_CONFETTI.length - 1, Math.floor(seed(i + 2) * SCTA_CONFETTI.length));
  const col = SCTA_CONFETTI[cIdx];
  const op = over(lf, 0, 8) * (0.62 + 0.34 * flip);
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      background: col, borderRadius: round ? w : 2, opacity: op,
      transform: `rotate(${rot}deg) scaleX(${flip})`,
      boxShadow: `0 1px 2px #0007`,
    }} />
  );
};

// CANNON burst flake — shot up from a corner popper, arcs over under gravity then keeps falling
const SCTA_Pop: React.FC<{ i: number; ox: number; dir: number; startF: number; lf: number }> = ({ i, ox, dir, startF, lf }) => {
  const lt = lf - startF;
  if (lt < 0) return null;
  const t = lt / FPS;
  const spread = (10 + seed(i + 2) * 48) * dir;              // fan toward center
  const ang = (-90 + spread) * Math.PI / 180;
  const sp = 260 + seed(i + 3) * 360;                        // launch speed px/s
  const g = 660;                                            // gravity px/s^2
  const x = ox + Math.cos(ang) * sp * t + (seed(i + 15) - 0.5) * 30 * t;
  const y = 744 + Math.sin(ang) * sp * t + 0.5 * g * t * t;
  if (y > 806) return null;
  const rot = seed(i + 1) * 360 + lt * (6 + seed(i + 8) * 13);
  const flip = 0.4 + 0.6 * Math.abs(Math.cos((lt + i * 6) / (8 + seed(i + 4) * 12)));
  const ribbon = seed(i + 6) > 0.6;                          // some long paper streamers
  const w = ribbon ? 7 + seed(i + 5) * 5 : 11 + seed(i + 5) * 12;
  const h = ribbon ? 26 + seed(i + 11) * 28 : (seed(i + 7) > 0.7 ? w : 7 + seed(i + 11) * 9);
  const cIdx = Math.min(SCTA_CONFETTI.length - 1, Math.floor(seed(i + 9) * SCTA_CONFETTI.length));
  const col = SCTA_CONFETTI[cIdx];
  const op = over(lt, 0, 2) * (1 - 0.5 * ramp(lt, fr(0.8), fr(1.5))) * (0.6 + 0.4 * flip);
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      background: col, borderRadius: ribbon ? 4 : (h === w ? w : 2), opacity: op,
      transform: `rotate(${rot}deg) scaleX(${flip})`,
      boxShadow: `0 1px 2px #0007`,
    }} />
  );
};

// confetti-cannon muzzle pop — small localized warm flash at the corner as it fires (NOT a screen flash)
const SCTA_Cannon: React.FC<{ x: number; startF: number; lf: number }> = ({ x, startF, lf }) => {
  const lt = lf - startF;
  const pop = over(lt, 0, 2) * (1 - ramp(lt, 2, 9));
  if (pop <= 0.01) return null;
  const s = 26 + pop * 88;
  return (
    <div style={{
      position: "absolute", left: x, top: 744, width: s, height: s,
      transform: "translate(-50%,-50%)", borderRadius: s,
      background: `radial-gradient(circle, ${FLAME_CORE}, ${FLAMEY} 42%, transparent 72%)`,
      opacity: 0.7 * pop, filter: "blur(2px)",
    }} />
  );
};

// drifting warm bokeh mote — background depth/atmosphere (candlelight dust)
const SCTA_Mote: React.FC<{ i: number; lf: number }> = ({ i, lf }) => {
  const x0 = 60 + seed(i + 21) * 900;
  const y0 = 300 + seed(i + 24) * 340;           // rise across a taller band for depth
  const rise = 22 + seed(i + 22) * 42;
  const t = lf / FPS;
  const y = y0 - rise * t;
  const x = x0 + Math.sin((lf + i * 11) / (60 + seed(i + 23) * 40)) * (10 + seed(i + 25) * 16);
  const s = 4 + seed(i + 26) * 11;
  const tw = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.16 + i * 1.3));
  const warm = seed(i + 27) > 0.5 ? FLAME_CORE : GOLD;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: s, height: s, borderRadius: s,
      background: warm, opacity: over(lf, 0, 10) * 0.5 * tw,
      boxShadow: `0 0 ${6 + s}px ${FLAMEY}`,
    }} />
  );
};

// dim back-of-house line cook celebrating (arms bob up) — background life, now warm-lit
const SCTA_Cook: React.FC<{ x: number; scale: number; ph: number; hue: string; lf: number }> = ({ x, scale, ph, hue, lf }) => {
  const cheer = 0.5 + 0.5 * Math.sin(lf * 0.22 + ph);   // arms raise/lower
  const bobY = Math.sin(lf * 0.22 + ph) * 3;
  const armUp = 6 + cheer * 16;
  return (
    <div style={{
      position: "absolute", left: x, top: 468 + bobY, width: 120 * scale, height: 150 * scale,
      transform: `translateX(-50%)`, opacity: 0.5,
      filter: `drop-shadow(0 0 6px ${FLAME}44)`,
    }}>
      {/* raised arms */}
      <div style={{ position: "absolute", left: 8 * scale, top: (18 - armUp) * scale, width: 14 * scale, height: 46 * scale, background: hue, borderRadius: 8, transform: `rotate(${-18 - cheer * 10}deg)` }} />
      <div style={{ position: "absolute", right: 8 * scale, top: (18 - armUp) * scale, width: 14 * scale, height: 46 * scale, background: hue, borderRadius: 8, transform: `rotate(${18 + cheer * 10}deg)` }} />
      {/* body (chef whites) */}
      <div style={{ position: "absolute", left: "50%", top: 40 * scale, transform: "translateX(-50%)", width: 74 * scale, height: 96 * scale, borderRadius: 16, background: grad(CHEFWD, "#B9B2A4") }} />
      {/* head + toque */}
      <div style={{ position: "absolute", left: "50%", top: 6 * scale, transform: "translateX(-50%)", width: 40 * scale, height: 40 * scale, borderRadius: 40, background: hue }} />
      <div style={{ position: "absolute", left: "50%", top: -8 * scale, transform: "translateX(-50%)", width: 44 * scale, height: 22 * scale, borderRadius: 12, background: CHEFW }} />
    </div>
  );
};

// thin god-ray beam behind the marquee (slow shimmer)
const SCTA_Ray: React.FC<{ rot: number; lf: number; ph: number }> = ({ rot, lf, ph }) => (
  <div style={{
    position: "absolute", left: 506, top: 150, width: 34, height: 640,
    transform: `translate(-50%,-8%) rotate(${rot}deg)`,
    transformOrigin: "50% 8%",
    background: `linear-gradient(to bottom, ${GOLD}00, ${GOLD}2E, ${GOLD}00)`,
    filter: "blur(5px)",
    opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.13 + ph)),
  }} />
);

// hanging velvet drape with folds + gold tie + tassel — gentle sway (frames the stage warmly)
const SCTA_Drape: React.FC<{ side: "left" | "right"; lf: number }> = ({ side, lf }) => {
  const mir = side === "left" ? 1 : -1;
  const sway = Math.sin(lf * 0.09 + (side === "left" ? 0 : 1.3)) * 4;
  const app = over(lf, 0, 12);
  const base = side === "left"
    ? { left: -8 }
    : { right: -8 };
  return (
    <div style={{ position: "absolute", top: -20, height: 470, width: 176, ...base, opacity: app, transformOrigin: side === "left" ? "0% 0%" : "100% 0%", transform: `rotate(${sway * 0.12 * mir}deg)` }}>
      {/* main drape body */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${side === "left" ? "100deg" : "80deg"}, ${SCTA_DRAPED}, ${SCTA_DRAPE} 45%, ${SCTA_DRAPED})`,
        borderBottomLeftRadius: side === "left" ? 0 : 120,
        borderBottomRightRadius: side === "left" ? 120 : 0,
        boxShadow: "inset 0 0 40px #0009",
      }} />
      {/* vertical velvet folds (sheen) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={"f" + i} style={{
          position: "absolute", top: 0, bottom: 60, width: 10,
          left: 18 + i * 32 + Math.sin(lf * 0.1 + i) * 1.5,
          background: `linear-gradient(90deg, transparent, ${HKR_GLOW}22 45%, transparent)`,
          filter: "blur(2px)",
        }} />
      ))}
      {/* gold valance across the top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 26, background: grad(GOLD, BRASSD), boxShadow: `0 3px 8px #0008` }} />
      {/* gold rope tie + tassel */}
      <div style={{ position: "absolute", top: 300, left: side === "left" ? 96 : "auto", right: side === "left" ? "auto" : 96, width: 90, height: 12, borderRadius: 8, background: grad(GOLD, BRASSD), transform: `translateX(${side === "left" ? -30 : 30}px) rotate(${side === "left" ? -8 : 8}deg)`, boxShadow: `0 2px 5px #0007` }} />
      <div style={{ position: "absolute", top: 312, left: side === "left" ? 132 : "auto", right: side === "left" ? "auto" : 132, width: 12, height: 30, borderRadius: 6, background: grad(GOLD, BRASSD) }} />
    </div>
  );
};

// gilt-framed award plaque on the back wall — soft glow, tiny twinkle
const SCTA_Frame: React.FC<{ x: number; y: number; w: number; h: number; i: number; lf: number }> = ({ x, y, w, h, i, lf }) => {
  const tw = 0.6 + 0.4 * Math.abs(Math.sin(lf * 0.12 + i * 1.9));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, opacity: over(lf, 0, 12) * 0.72 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: grad(BRASS, BRASSD), boxShadow: `0 3px 10px #0008, 0 0 ${10 * tw}px ${GOLD}44` }} />
      <div style={{ position: "absolute", inset: 5, borderRadius: 3, background: grad("#3A2416", "#20140B") }} />
      {/* little medallion + ribbon inside */}
      <div style={{ position: "absolute", left: "50%", top: "38%", transform: "translate(-50%,-50%)", width: w * 0.34, height: w * 0.34, borderRadius: w, background: grad(GOLD, BRASSD), border: `2px solid ${FLAME_CORE}`, boxShadow: `0 0 ${6 * tw}px ${GOLD}` }} />
      <div style={{ position: "absolute", left: "50%", top: "58%", transform: "translateX(-50%)", width: w * 0.5, height: 4, borderRadius: 3, background: HKRED, opacity: 0.8 }} />
    </div>
  );
};

// gleaming stage trophy on the shelf — spec highlight sweeps across the cup, tiny sway
const SCTA_Trophy: React.FC<{ x: number; y: number; s: number; i: number; lf: number }> = ({ x, y, s, i, lf }) => {
  const sway = Math.sin(lf * 0.13 + i * 1.5) * 1.4;
  const shine = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.2 + i * 2.1));
  const app = over(lf, 1, 12);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 60 * s, height: 96 * s, transform: `translateX(-50%) rotate(${sway}deg)`, transformOrigin: "50% 100%", opacity: app * 0.9, filter: `drop-shadow(0 3px 6px #0009)` }}>
      {/* cup bowl */}
      <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 44 * s, height: 40 * s, borderBottomLeftRadius: 44, borderBottomRightRadius: 44, borderTopLeftRadius: 10, borderTopRightRadius: 10, background: grad(FLAME_CORE, BRASSD), boxShadow: `inset 0 0 ${10 * s}px #0006` }} />
      {/* spec shine sweeping */}
      <div style={{ position: "absolute", left: 12 * s + shine * 18 * s, top: 6 * s, width: 6 * s, height: 24 * s, borderRadius: 6, background: "#FFFDF3", opacity: 0.35 + 0.5 * shine, filter: "blur(1px)" }} />
      {/* handles */}
      <div style={{ position: "absolute", left: 0, top: 8 * s, width: 12 * s, height: 20 * s, borderRadius: 12, border: `${4 * s}px solid ${BRASS}`, borderRight: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 8 * s, width: 12 * s, height: 20 * s, borderRadius: 12, border: `${4 * s}px solid ${BRASS}`, borderLeft: "none" }} />
      {/* stem + base */}
      <div style={{ position: "absolute", left: "50%", top: 40 * s, transform: "translateX(-50%)", width: 10 * s, height: 22 * s, background: grad(BRASS, BRASSD) }} />
      <div style={{ position: "absolute", left: "50%", top: 60 * s, transform: "translateX(-50%)", width: 40 * s, height: 12 * s, borderRadius: 4, background: grad(BRASS, BRASSD) }} />
      <div style={{ position: "absolute", left: "50%", top: 70 * s, transform: "translateX(-50%)", width: 30 * s, height: 14 * s, borderRadius: 3, background: grad("#3A2416", "#20140B") }} />
    </div>
  );
};

// LULL-FILLER — a gold Michelin-style star that POPS in (overshoot) then holds with a live twinkle.
// A row of these pops SEQUENTIALLY across the mid band so a new element keeps entering every few frames.
const SCTA_Star: React.FC<{ x: number; y: number; s: number; delayF: number; i: number; lf: number }> = ({ x, y, s, delayF, i, lf }) => {
  const pop = over(lf, delayF, 6, Easing.out(Easing.back(2.2)));
  if (pop <= 0.001) return null;
  const held = ramp(lf, delayF, delayF + 6);
  const tw = 0.55 + 0.45 * Math.abs(Math.sin(lf * 0.3 + i * 1.7));
  const rot = (1 - Math.min(1, pop)) * -55 + held * Math.sin(lf * 0.22 + i) * 3;
  const scale = pop * (1 + 0.05 * Math.sin(lf * 0.42 + i * 1.3));
  const starClip = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: s, height: s,
      transform: `translate(-50%,-50%) scale(${scale}) rotate(${rot}deg)`,
      opacity: Math.min(1, pop),
      filter: `drop-shadow(0 0 ${8 * tw}px ${GOLD})`,
    }}>
      {/* glow halo */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: s * 1.5, height: s * 1.5, transform: "translate(-50%,-50%)", borderRadius: s, background: `radial-gradient(circle, ${FLAMEY}${tw > 0.7 ? "66" : "3A"}, transparent 68%)` }} />
      {/* the star body */}
      <div style={{ position: "absolute", inset: 0, clipPath: starClip, background: `linear-gradient(158deg, ${FLAME_CORE}, ${GOLD} 46%, ${BRASSD})`, boxShadow: `inset 0 0 6px ${BRASSD}` }} />
      {/* bright core spec */}
      <div style={{ position: "absolute", left: "50%", top: "44%", width: s * 0.22, height: s * 0.22, transform: "translate(-50%,-50%)", borderRadius: s, background: "#FFFDF3", opacity: 0.5 + 0.4 * tw, filter: "blur(0.6px)" }} />
    </div>
  );
};

// LULL-FILLER — a recurring range-flare flame at a back line-cook station (layered teardrops that lick up + settle, on a loop)
const SCTA_Flare: React.FC<{ x: number; y: number; period: number; ph: number; lf: number }> = ({ x, y, period, ph, lf }) => {
  const cyc = (((lf + ph) % period) + period) % period / period;   // 0..1 loop
  const up = Math.pow(Math.sin(cyc * Math.PI), 0.7);               // rise then fall
  const app = over(lf, 0, 6) * 0.85;
  const H = 24 + up * 78;
  const flick = 0.85 + 0.15 * Math.sin(lf * 0.9 + ph);
  const sway = Math.sin(lf * 0.5 + ph) * 4;
  const teardrop = (h: number, w: number, col: string, o: number) => ({
    position: "absolute" as const, left: "50%", bottom: 0,
    width: w, height: h, transform: `translateX(-50%) translateX(${sway * (h / H)}px)`,
    background: `linear-gradient(to top, ${col}, ${col}00)`,
    borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
    filter: "blur(0.6px)", opacity: o * app,
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 60, height: 110, opacity: app }}>
      {/* ember glow at the base */}
      <div style={{ position: "absolute", left: "50%", bottom: -6, width: 60, height: 30, transform: "translateX(-50%)", borderRadius: 40, background: `radial-gradient(ellipse at center, ${FLAME}88, transparent 70%)`, opacity: 0.6 * up + 0.3, filter: "blur(2px)" }} />
      <div style={{ ...teardrop(H, 40 * flick, FLAME, 0.9) }} />
      <div style={{ ...teardrop(H * 0.72, 26 * flick, FLAMEY, 0.95) }} />
      <div style={{ ...teardrop(H * 0.42, 14 * flick, FLAME_CORE, 1) }} />
      {/* a lifting ember spark */}
      <div style={{ position: "absolute", left: `${44 + sway}%`, bottom: 30 + up * 60, width: 5, height: 5, borderRadius: 5, background: FLAME_CORE, opacity: (0.4 + 0.6 * up) * app, boxShadow: `0 0 8px ${FLAMEY}` }} />
    </div>
  );
};

// ===== SIGNATURE MOMENT — the giant CHAMPIONSHIP TROPHY the chef HOISTS overhead (radiant gold cup, star crown, sweeping gleam) =====
const SCTA_HeroTrophy: React.FC<{ lf: number; cx: number; top: number; scale: number; rot: number; glow: number }> = ({ lf, cx, top, scale, rot, glow }) => {
  const starClip = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  const sweep = (lf * 3.4) % 130;                                   // gleam streak crossing the cup
  const twinkle = 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.34));
  const haloR = 118 + glow * 96;                                    // radiant halo surges at the apex
  const crownRock = Math.sin(lf * 0.2) * 4;
  return (
    <div style={{
      position: "absolute", left: cx, top, width: 96, height: 158,
      transform: `translateX(-50%) scale(${scale}) rotate(${rot}deg)`,
      transformOrigin: "50% 82%",
      filter: `drop-shadow(0 12px 16px #000a)`,
    }}>
      {/* radiant halo behind the cup — brightens at the overhead apex */}
      <div style={{ position: "absolute", left: "50%", top: 56, width: haloR, height: haloR, transform: "translate(-50%,-50%)", borderRadius: haloR, background: `radial-gradient(circle, ${FLAME_CORE}${glow > 0.6 ? "bb" : "66"}, ${GOLD}44 42%, transparent 70%)`, filter: "blur(3px)" }} />
      {/* four-point light burst behind the cup */}
      <div style={{ position: "absolute", left: "50%", top: 56, width: 150, height: 150, transform: `translate(-50%,-50%) rotate(${lf * 0.6}deg)`, opacity: 0.35 + 0.5 * glow }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 150, transform: "translate(-50%,-50%)", background: `linear-gradient(${FLAMEY}00, ${FLAME_CORE}, ${FLAMEY}00)`, filter: "blur(1px)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 150, height: 6, transform: "translate(-50%,-50%)", background: `linear-gradient(90deg, ${FLAMEY}00, ${FLAME_CORE}, ${FLAMEY}00)`, filter: "blur(1px)" }} />
      </div>

      {/* STAR CROWN on top of the cup */}
      <div style={{ position: "absolute", left: "50%", top: -8, width: 42, height: 42, transform: `translateX(-50%) rotate(${crownRock}deg)` }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 60, height: 60, transform: "translate(-50%,-50%)", borderRadius: 60, background: `radial-gradient(circle, ${FLAMEY}${glow > 0.6 ? "88" : "44"}, transparent 66%)` }} />
        <div style={{ position: "absolute", inset: 0, clipPath: starClip, background: `linear-gradient(158deg, ${FLAME_CORE}, ${GOLD} 46%, ${BRASSD})`, boxShadow: `0 0 ${10 + glow * 18}px ${FLAMEY}` }} />
        <div style={{ position: "absolute", left: "50%", top: "42%", width: 8, height: 8, transform: "translate(-50%,-50%)", borderRadius: 8, background: "#FFFDF3", opacity: 0.6 + 0.4 * twinkle }} />
      </div>

      {/* handles */}
      <div style={{ position: "absolute", left: 2, top: 42, width: 26, height: 46, borderRadius: 26, border: `9px solid ${BRASS}`, borderRight: "none", boxShadow: `inset 0 0 4px ${BRASSD}` }} />
      <div style={{ position: "absolute", right: 2, top: 42, width: 26, height: 46, borderRadius: 26, border: `9px solid ${BRASS}`, borderLeft: "none", boxShadow: `inset 0 0 4px ${BRASSD}` }} />

      {/* CUP bowl */}
      <div style={{
        position: "absolute", left: "50%", top: 30, transform: "translateX(-50%)",
        width: 82, height: 76,
        borderBottomLeftRadius: 78, borderBottomRightRadius: 78,
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
        background: `linear-gradient(158deg, ${FLAME_CORE}, ${GOLD} 44%, ${BRASSD})`,
        boxShadow: `inset 0 -10px 18px #0006, inset 0 6px 12px ${FLAME_CORE}`,
        overflow: "hidden",
      }}>
        {/* sweeping gleam streak */}
        <div style={{ position: "absolute", top: -22, left: sweep - 34, width: 18, height: 128, background: "linear-gradient(90deg, transparent, #FFFDF3dd, transparent)", transform: "rotate(20deg)", filter: "blur(1px)", opacity: 0.85 }} />
        {/* bright rim highlight */}
        <div style={{ position: "absolute", top: 6, left: 12, right: 12, height: 8, borderRadius: 8, background: `${FLAME_CORE}dd`, filter: "blur(1px)" }} />
      </div>

      {/* stem + tiered base */}
      <div style={{ position: "absolute", left: "50%", top: 104, transform: "translateX(-50%)", width: 18, height: 28, background: grad(BRASS, BRASSD) }} />
      <div style={{ position: "absolute", left: "50%", top: 128, transform: "translateX(-50%)", width: 62, height: 15, borderRadius: 6, background: grad(BRASS, BRASSD), boxShadow: `0 2px 5px #0008` }} />
      <div style={{ position: "absolute", left: "50%", top: 140, transform: "translateX(-50%)", width: 50, height: 20, borderRadius: 5, background: grad("#3A2416", "#20140B"), boxShadow: `inset 0 0 8px #000` }} />
      {/* engraved gold plaque on the base */}
      <div style={{ position: "absolute", left: "50%", top: 145, transform: "translateX(-50%)", width: 34, height: 9, borderRadius: 3, background: grad(GOLD, BRASSD), opacity: 0.92, boxShadow: `0 0 5px ${GOLD}66` }} />
    </div>
  );
};

const RamsayCTA: React.FC<{ lf: number }> = ({ lf }) => {
  // spotlights ease in
  const spotOp = over(lf, 0, 9);
  const spotSweep = Math.sin(lf * 0.12) * 9;                 // gentle overhead sweep
  // marquee title eases in, drops gently, then a tiny settle bounce
  const titleT = over(lf, 1, 12);
  const titleSettle = Math.sin(lf * 0.5) * 2.2 * Math.max(0, 1 - (lf - 12) / 16);
  const titleScale = 0.72 + 0.28 * titleT;
  const titleY = (1 - titleT) * -24 + (lf > 12 ? titleSettle : 0);
  // slow warm pulse + a glow SURGE on the VO word "Ramsay" (lf~3)
  const titleGlow = 0.5 + 0.5 * Math.sin(lf * 0.18) + 0.7 * Math.max(0, 1 - Math.abs(lf - 3) / 4);
  // marquee lights RACE around the border (running chase index) + per-bulb twinkle
  const bulbN = SCTA_BULBS.length;
  const chase = (lf * 1.5) % bulbN;

  // hero — springs UP into frame, then CELEBRATES with repeated joyful hops (arms-up bounce energy)
  const chefRise = Math.min(1, spr(lf, 0, 14, 190));
  const chefOp = over(lf, 0, 6);
  const hopEnv = over(lf, 2, 5);                             // hops kick in after he lands
  const jump = Math.max(0, Math.sin(lf * 0.5));             // 0..1 per-hop
  const jj = jump * hopEnv;
  const hop = -17 * jj;                                     // lifts off the floor each hop
  // NO-LULL — continuous grounded weight-shift + breathe so he's NEVER static between hops
  const chefSway = Math.sin(lf * 0.33) * 3.2 * over(lf, 2, 5);        // side-to-side celebration shuffle
  const chefLand = Math.max(0, -Math.sin(lf * 0.5)) * hopEnv;         // squash on the down/landing phase
  const chefY = (1 - chefRise) * 34 + hop;
  const chefScaleX = 1 - 0.045 * jj + 0.05 * chefLand;               // stretch tall at apex, squash on land
  const chefScaleY = 0.94 + 0.06 * chefRise + 0.07 * jj - 0.05 * chefLand + 0.012 * Math.sin(lf * 0.55);
  const chefNod = 1 + 0.4 * jj + 0.15 * chefLand;                    // proud head bounce on each hop

  // ===== SIGNATURE MOMENT — CHAMPIONSHIP TROPHY HOIST =====
  // held low at his chest → anticipation load → triumphant THRUST overhead (overshoot via Easing.back, no spr) → held aloft with a gleam surge.
  const chefTopY = 316 + chefY;                                      // trophy is anchored to the chef so it rides his celebration hops
  const troRaise = interpolate(lf, [7, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) }); // 0..~1.05 thrust, apex ~frame 15
  const troAntic = over(lf, 3, 4) * Math.max(0, 1 - troRaise);       // small downward crouch/load before the release
  const troTop = chefTopY + 70 - 170 * troRaise + troAntic * 12;     // travels from chest UP to overhead (clear of the marquee + his face)
  const troScale = 0.5 + 0.5 * Math.min(1.05, troRaise);            // grows as it rises, tiny overshoot pop at the top
  const troRot = (1 - Math.min(1, troRaise)) * -12 + Math.min(1, troRaise) * Math.sin(lf * 0.16) * 2.2; // rocks up straight, then a proud sway
  const troGlow = Math.max(0, 1 - Math.abs(lf - 15) / 7) + 0.22 * Math.abs(Math.sin(lf * 0.3));         // radiant surge right at the overhead apex
  const troOp = over(lf, 3, 4);

  // CTA pill springs UP from below (kept above y=720) with a bouncy overshoot
  const pillPop = spr(lf, 8, 13, 200);
  const pillY = (1 - Math.min(1, pillPop)) * 26;
  const pillBreathe = 0.02 * Math.abs(Math.sin(lf * 0.3)) * over(lf, 14, 4);   // subtle live breathe after landing
  const pillScale = 0.72 + 0.30 * Math.min(1.05, pillPop) + pillBreathe;
  const pillOp = over(lf, 8, 6);
  const iconPulse = 1 + 0.08 * Math.abs(Math.sin(lf * 0.3));
  // warm candle flicker used for wall sconces
  const flick = 0.75 + 0.25 * Math.abs(Math.sin(lf * 0.9) * Math.cos(lf * 0.37));
  // slow parallax push on the whole background layer for depth
  const bgPush = 1.02 + 0.02 * over(lf, 0, 28);

  return (
    <div style={{
      position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H,
      borderRadius: 36, overflow: "hidden", boxShadow: SH,
      border: `2px solid ${GOLD}55`,
    }}>
      {/* warm mahogany back wall (layered, no grey) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(178deg, ${SCTA_STAGE_TOP}, ${SCTA_STAGE_MID} 58%, ${SCTA_STAGE_BOT})`, transform: `scale(${bgPush})`, transformOrigin: "50% 40%" }} />
      {/* soft warm central wash on the wall */}
      <div style={{ position: "absolute", left: 506, top: 300, width: 900, height: 560, transform: "translate(-50%,-50%)", background: `radial-gradient(ellipse at center, ${FLAME}22, transparent 66%)` }} />
      {/* wood-panel wainscoting seams for texture */}
      {[150, 320, 506, 692, 862].map((wx, i) => (
        <div key={"seam" + i} style={{ position: "absolute", left: wx, top: 70, width: 3, height: 470, background: `linear-gradient(to bottom, ${SCTA_WOOD_HI}55, transparent)`, opacity: over(lf, 0, 12) * 0.5 }} />
      ))}

      {/* god-rays behind the title (background depth) */}
      <div style={{ position: "absolute", inset: 0, opacity: over(lf, 0, 12) * 0.9 }}>
        <SCTA_Ray rot={-26} lf={lf} ph={0.0} />
        <SCTA_Ray rot={-11} lf={lf} ph={1.1} />
        <SCTA_Ray rot={4} lf={lf} ph={2.0} />
        <SCTA_Ray rot={19} lf={lf} ph={0.7} />
        <SCTA_Ray rot={31} lf={lf} ph={1.7} />
      </div>

      {/* warm haze behind the title */}
      <div style={{
        position: "absolute", left: 506, top: 150, width: 760, height: 420,
        transform: "translate(-50%,-50%)",
        background: `radial-gradient(ellipse at center, ${GOLD}33, transparent 68%)`,
        filter: "blur(8px)",
      }} />

      {/* framed award plaques on the back wall (background detail) */}
      <SCTA_Frame x={92} y={210} w={72} h={92} i={0} lf={lf} />
      <SCTA_Frame x={856} y={196} w={80} h={100} i={1} lf={lf} />
      <SCTA_Frame x={100} y={330} w={60} h={76} i={2} lf={lf} />
      <SCTA_Frame x={868} y={324} w={62} h={80} i={3} lf={lf} />

      {/* warm brass wall sconces with candle flicker (background warmth) */}
      {[70, 942].map((sx, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: sx, top: 150, opacity: over(lf, 0, 10) * 0.85 }}>
          <div style={{ width: 10, height: 40, borderRadius: 5, background: grad(BRASS, BRASSD), margin: "0 auto" }} />
          <div style={{ width: 22, height: 22, borderRadius: "50% 50% 50% 50%", margin: "-6px auto 0", background: `radial-gradient(circle at 50% 40%, ${FLAME_CORE}, ${FLAME} 60%, transparent)`, opacity: flick, boxShadow: `0 0 ${16 * flick}px ${FLAMEY}, 0 0 ${34 * flick}px ${FLAME}88` }} />
        </div>
      ))}

      {/* velvet drapes framing the stage (background, gentle sway) */}
      <SCTA_Drape side="left" lf={lf} />
      <SCTA_Drape side="right" lf={lf} />

      {/* trophy shelf across the mid layer + a row of gleaming trophies */}
      <div style={{ position: "absolute", left: 120, right: 120, top: 448, height: 12, borderRadius: 4, background: grad(SCTA_WOOD_HI, "#3A2113"), opacity: over(lf, 0, 12) * 0.8, boxShadow: `0 4px 10px #0009` }} />
      <SCTA_Trophy x={196} y={372} s={0.82} i={0} lf={lf} />
      <SCTA_Trophy x={300} y={384} s={0.62} i={1} lf={lf} />
      <SCTA_Trophy x={712} y={384} s={0.62} i={2} lf={lf} />
      <SCTA_Trophy x={818} y={372} s={0.82} i={3} lf={lf} />

      {/* ceiling brass rail with hanging medals (background prop) */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 40, height: 8, borderRadius: 8, background: grad(BRASS, BRASSD), opacity: over(lf, 0, 10) * 0.7, boxShadow: `0 2px 6px #0008` }} />
      {[150, 360, 660, 872].map((mx, i) => {
        const swing = Math.sin(lf * 0.14 + i * 1.4) * 3;
        return (
          <div key={"med" + i} style={{ position: "absolute", left: mx + swing, top: 48, opacity: over(lf, 0, 12) * 0.6 }}>
            <div style={{ width: 2, height: 22 + (i % 2) * 10, background: BRASSD, margin: "0 auto" }} />
            <div style={{ width: 22, height: 22, borderRadius: 22, background: grad(GOLD, BRASSD), border: `2px solid ${FLAME_CORE}`, boxShadow: `0 0 8px ${GOLD}88`, transform: `translateX(-10px)` }} />
          </div>
        );
      })}

      {/* stage floor — warm wood */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 592, height: 200,
        background: `linear-gradient(178deg, ${SCTA_FLOOR}, ${SCTA_STAGE_BOT})`,
        borderTop: `3px solid ${GOLD}88`,
      }} />
      {/* wood floor plank lines (perspective) */}
      {[-260, -120, 0, 120, 260].map((off, i) => (
        <div key={"plank" + i} style={{ position: "absolute", left: 506 + off, top: 595, width: 2, height: 197, background: `linear-gradient(to bottom, ${SCTA_WOOD_HI}55, transparent)`, transform: `skewX(${off * 0.03}deg)`, opacity: 0.5 }} />
      ))}
      {/* red carpet runner leading to the hero */}
      <div style={{ position: "absolute", left: "50%", top: 596, transform: "translateX(-50%)", width: 250, height: 196, background: `linear-gradient(178deg, ${SCTA_CARPET}, #5E160F)`, clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)", opacity: 0.9, boxShadow: `inset 0 0 30px #0007` }} />
      <div style={{ position: "absolute", left: "50%", top: 596, transform: "translateX(-50%)", width: 250, height: 196, clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)", borderLeft: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}`, opacity: 0.4 }} />
      {/* floor reflection glow */}
      <div style={{
        position: "absolute", left: 306, top: 596, width: 400, height: 120,
        background: `radial-gradient(ellipse at center, ${GOLD}55, transparent 70%)`,
        filter: "blur(6px)",
      }} />

      {/* dim back-of-house line cooks celebrating (background life) */}
      <SCTA_Cook x={150} scale={0.62} ph={0.0} hue={"#B98A62"} lf={lf} />
      <SCTA_Cook x={862} scale={0.66} ph={1.6} hue={"#A87C55"} lf={lf} />
      <SCTA_Cook x={244} scale={0.5} ph={2.7} hue={"#966E4A"} lf={lf} />

      {/* LULL-FILLER — recurring range-flare flames at the line-cook stations (continuous fire behind the celebration) */}
      <SCTA_Flare x={120} y={470} period={20} ph={0} lf={lf} />
      <SCTA_Flare x={832} y={470} period={22} ph={9} lf={lf} />
      <SCTA_Flare x={222} y={492} period={18} ph={5} lf={lf} />

      {/* triple spotlights (all warm), eased in + gentle sweep */}
      <div style={{ position: "absolute", inset: 0, opacity: spotOp, transform: `translateX(${spotSweep}px)` }}>
        <SpotCone x={232} top={-40} topW={70} botW={360} h={720} color={FLAMEY} sway={0.5} lf={lf} pool={0.24} />
        <SpotCone x={780} top={-40} topW={70} botW={360} h={720} color={FLAMEY} sway={-0.5} lf={lf} pool={0.24} />
        <SpotCone x={506} top={-60} topW={60} botW={300} h={760} color={GOLD} sway={0.2} lf={lf} pool={0.42} />
      </div>

      {/* lit RAMSAY marquee plaque with a RACING bulb ring */}
      <div style={{
        position: "absolute", left: 506, top: 138,
        width: SCTA_MW, height: SCTA_MH,
        transform: `translate(-50%,-50%) translateY(${titleY}px) scale(${titleScale})`,
        opacity: titleT,
        borderRadius: 22,
        background: grad("#2A1B10", "#160D07"),
        border: `4px solid ${GOLD}`,
        boxShadow: `0 0 ${26 + titleGlow * 22}px ${GOLD}aa, inset 0 0 22px #0009`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* perimeter bulbs — running chase + twinkle */}
        {SCTA_BULBS.map((b, i) => {
          let d = Math.abs(i - chase);
          d = Math.min(d, bulbN - d);
          const run = Math.max(0, 1 - d / 2.4);                     // the racing highlight
          const tw = Math.abs(Math.sin(lf * 0.3 + i * 1.7 + seed(i) * 6));
          const bri = Math.min(1, 0.35 + 0.35 * tw + 0.85 * run);
          return (
            <div key={"b" + i} style={{
              position: "absolute", left: b.x - 6, top: b.y - 6, width: 12, height: 12, borderRadius: 12,
              background: lerpHex(FLAMEY, FLAME_CORE, Math.max(tw, run)),
              boxShadow: `0 0 ${7 + bri * 14}px ${FLAMEY}`,
              opacity: 0.5 + 0.5 * bri,
              transform: `scale(${0.85 + 0.35 * bri})`,
            }} />
          );
        })}
        <div style={{
          fontFamily: SCTA_SERIF, fontWeight: 900, fontSize: 74,
          letterSpacing: 6, color: FLAME_CORE,
          textShadow: `0 0 18px ${FLAMEY}, 0 3px 0 ${BRASSD}`,
          lineHeight: 1,
        }}>RAMSAY</div>
      </div>

      {/* LULL-FILLER — a row of Michelin stars POP in one-by-one across the mid band (a new element keeps arriving) */}
      {[-2, -1, 0, 1, 2].map((k, i) => (
        <SCTA_Star key={"star" + i} x={506 + k * 78} y={252 - Math.abs(k) * 6} s={40 - Math.abs(k) * 4} delayF={4 + i * 4} i={i} lf={lf} />
      ))}

      {/* NO-LULL (tail) — a second higher ring of stars keeps NEW elements arriving through frames 24-31 so the finish never goes quiet */}
      {[-1.35, 0, 1.35].map((k, i) => (
        <SCTA_Star key={"star2_" + i} x={506 + k * 118} y={196} s={30} delayF={24 + i * 3} i={i + 7} lf={lf} />
      ))}

      {/* hero — proud celebration, springs up then BOUNCES with joyful hops (never static: grounded shuffle + landing squash) */}
      <div style={{ position: "absolute", left: 378, top: 316 + chefY, width: 256, height: 256, opacity: chefOp, transform: `translateX(${chefSway}px) scaleX(${chefScaleX}) scaleY(${chefScaleY})`, transformOrigin: "50% 92%" }}>
        <RamsayChef lf={lf} size={256} pose="hipshake" tint={CLAY} yell={0} gaze={0} brow={0} toque={0} nod={chefNod} />
      </div>

      {/* SIGNATURE MOMENT — the chef HOISTS the championship trophy overhead as the confetti bursts (in front of the chef) */}
      {troOp > 0.01 && (
        <div style={{ position: "absolute", inset: 0, opacity: troOp }}>
          <SCTA_HeroTrophy lf={lf} cx={506} top={troTop} scale={troScale} rot={troRot} glow={troGlow} />
        </div>
      )}

      {/* one small rage bark from the chef (tail down → points at his head, clear of the face) */}
      <SpeechBubble lf={lf} at={6 / 30} dur={0.9} x={604} y={286} text="SORTED." tail="down" tone="rage" size={26} />

      {/* CONFETTI CANNONS — fire from both bottom corners in FOUR waves, arc up then keep falling (last wave lands into the tail) */}
      {[70, 942].map((cx, ci) => (
        <React.Fragment key={"cannon" + ci}>
          <SCTA_Cannon x={cx} startF={0} lf={lf} />
          <SCTA_Cannon x={cx} startF={15} lf={lf} />
          <SCTA_Cannon x={cx} startF={26} lf={lf} />
          <SCTA_Cannon x={cx} startF={31} lf={lf} />
          {Array.from({ length: 16 }).map((_, i) => (
            <SCTA_Pop key={"pa" + ci + "_" + i} i={ci * 40 + i} ox={cx} dir={ci === 0 ? 1 : -1} startF={0} lf={lf} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <SCTA_Pop key={"pb" + ci + "_" + i} i={ci * 40 + i + 200} ox={cx} dir={ci === 0 ? 1 : -1} startF={15} lf={lf} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <SCTA_Pop key={"pc" + ci + "_" + i} i={ci * 40 + i + 400} ox={cx} dir={ci === 0 ? 1 : -1} startF={26} lf={lf} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <SCTA_Pop key={"pd" + ci + "_" + i} i={ci * 40 + i + 600} ox={cx} dir={ci === 0 ? 1 : -1} startF={31} lf={lf} />
          ))}
        </React.Fragment>
      ))}

      {/* gentle confetti fall + atmosphere motes (continuous stream underneath the bursts) */}
      {Array.from({ length: 54 }).map((_, i) => <SCTA_Flake key={i} i={i} lf={lf} />)}
      {Array.from({ length: 16 }).map((_, i) => <SCTA_Mote key={"m" + i} i={i} lf={lf} />)}

      {/* staggered pops: title on entrance, marquee surge on "Ramsay", stars firing in, pill on land, hop puffs, "setup" word, + a late crescendo */}
      <Sparkles lf={lf} at={0} x={506} y={150} n={16} spread={240} colors={[GOLD, FLAME_CORE, "#fff"]} dur={0.9} />
      <Sparkles lf={lf} at={3 / 30} x={506} y={150} n={12} spread={180} colors={[FLAMEY, GOLD, "#fff"]} dur={0.8} />
      <Sparkles lf={lf} at={8 / 30} x={584} y={244} n={9} spread={150} colors={[GOLD, FLAME_CORE, "#fff"]} dur={0.7} />
      {/* SIGNATURE burst — the trophy reaches its overhead apex (localized particles, not a screen flash) */}
      <Sparkles lf={lf} at={15 / 30} x={506} y={258} n={15} spread={220} colors={[GOLD, FLAME_CORE, FLAMEY, "#fff"]} dur={0.85} />
      <Sparkles lf={lf} at={12 / 30} x={506} y={648} n={12} spread={210} colors={[HKR_GLOW, GOLD, "#fff"]} dur={0.8} />
      <Sparkles lf={lf} at={16 / 30} x={430} y={476} n={9} spread={150} colors={[GOLD, FLAMEY, "#fff"]} dur={0.7} />
      <Sparkles lf={lf} at={22 / 30} x={588} y={476} n={9} spread={150} colors={[HKR_GLOW, GOLD, "#fff"]} dur={0.7} />
      <Sparkles lf={lf} at={25 / 30} x={506} y={648} n={12} spread={200} colors={[GOLD, FLAME_CORE, "#fff"]} dur={0.8} />
      <Sparkles lf={lf} at={30 / 30} x={506} y={300} n={13} spread={230} colors={[GOLD, FLAME_CORE, HKR_GLOW]} dur={0.7} />

      {/* CTA pill — "comment RAMSAY for the setup", springs up (above y=720) */}
      <div style={{
        position: "absolute", left: 506, top: 652,
        transform: `translate(-50%,-50%) translateY(${pillY}px) scale(${pillScale})`,
        opacity: pillOp,
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 32px", borderRadius: 40,
        background: grad("#FFF7EA", CHEFWD),
        border: `4px solid ${HKRED}`,
        boxShadow: `0 10px 26px #0008, 0 0 26px ${HKR_GLOW}66`,
        whiteSpace: "nowrap",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 34, background: HKRED,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, boxShadow: `0 0 12px ${HKR_GLOW}`,
          transform: `scale(${iconPulse})`,
        }}>💬</div>
        <div style={{ fontFamily: SCTA_SANS, fontWeight: 900, fontSize: 28, color: INK, letterSpacing: 0.3 }}>
          comment <span style={{ color: HKRED }}>RAMSAY</span> for the setup
        </div>
      </div>

      <Vignette strength={0.55} shape="round" />
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

// Hell's Kitchen menu-board plaque: charcoal slab, brass frame, flame-red header bar
const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = spr(f, 0, 13, 150);
  const out = 1 - over(f, fr(L[1] - 0.3), fr(0.3));
  if (out <= 0.02) return null;
  const flick = 0.9 + Math.sin(f / 3.5) * 0.1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 286, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -26}px) scale(${0.9 + settle * 0.1})` }}>
      <div style={{ position: "relative", textAlign: "center", padding: "3px", borderRadius: 22, background: `linear-gradient(180deg, ${BRASS}, ${BRASSD})`, boxShadow: "0 26px 56px -14px rgba(20,10,6,0.66), 0 0 42px rgba(255,90,60,0.28)" }}>
        <div style={{ borderRadius: 19, padding: "16px 40px 18px", background: "linear-gradient(178deg, #241A16 0%, #17100D 100%)", border: "2px solid #3A2A20", position: "relative", overflow: "hidden" }}>
          {/* flame glow bar behind top */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 10, background: `linear-gradient(90deg, ${HKREDD}, ${HKRED}, ${FLAME}, ${HKRED}, ${HKREDD})`, opacity: flick }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4, marginBottom: 2 }}>
            <span style={{ fontSize: 30, filter: `drop-shadow(0 0 8px ${FLAME})` }}>🔥</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.16em", color: FLAMEY, textShadow: `0 0 14px ${HKR_GLOW}` }}>HELL&rsquo;S KITCHEN</span>
            <span style={{ fontSize: 30, filter: `drop-shadow(0 0 8px ${FLAME})` }}>🔥</span>
          </div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52, letterSpacing: "-0.01em", lineHeight: 1.04, display: "block", color: "#F6F2EA" }}>
            <span style={{ color: FLAME, textShadow: `0 2px 18px ${HKR_GLOW}` }}>Claude that roasts</span><br />your own work
          </span>
        </div>
      </div>
    </div>
  );
};

// ---- throwaway: verify the RamsayChef poses on HK panels ----
export const RamsayChefTest: React.FC = () => {
  const f = useCurrentFrame();
  const poses = ["armsup", "cook", "facepalm"];
  return (
    <AbsoluteFill style={{ background: grad("#421612", "#200A08") }}>
      {poses.map((p, i) => (
        <div key={p} style={{ position: "absolute", left: 40 + i * 350, top: 60, width: 320, textAlign: "center" }}>
          <RamsayChef lf={f} size={300} pose={p} yell={p === "armsup" ? 1 : 0} />
          {p === "cook" && <div style={{ position: "absolute", left: 150, top: 150 }}><PanToss lf={f} x={0} y={0} s={150} handle="left" /></div>}
          <div style={{ color: "#fff", fontFamily: mono, fontSize: 26, marginTop: 300 }}>{p}</div>
        </div>
      ))}
      {/* cooking toolkit */}
      <div style={{ position: "absolute", left: 60, top: 760, color: "#fff", fontFamily: mono, fontSize: 24 }}>PanToss</div>
      <PanToss lf={f} x={80} y={820} s={200} />
      <div style={{ position: "absolute", left: 440, top: 760, color: "#fff", fontFamily: mono, fontSize: 24 }}>ChopBoard</div>
      <ChopBoard lf={f} x={430} y={840} s={200} />
      <div style={{ position: "absolute", left: 800, top: 760, color: "#fff", fontFamily: mono, fontSize: 24 }}>Flambe/Flame</div>
      <CookFlame lf={f} x={840} y={1000} s={70} />
      <Flambe lf={f % 30 / 30 * 0 + (f % 42)} at={0.2} x={920} y={1000} s={160} />
      <div style={{ position: "absolute", left: 120, top: 1120, color: "#fff", fontFamily: mono, fontSize: 24 }}>SteamJet</div>
      <SteamJet lf={f} x={180} y={1280} n={6} h={200} />
    </AbsoluteFill>
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
  const marks = [L[2], L[3], L[4], L[5]];
  const STARS = [6.0, 32.0, 52.0];
  const PELLETS = [2.0, 6.5, 11.0, 15.5, 20.0, 25.0, 30.0, 35.0, 40.0, 45.0, 50.0, 56.0];
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
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[7] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
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

// Hell's Kitchen themed intro transition: a flaming "HELL'S KITCHEN" title slams in, then a burning curtain lifts to reveal the reel
// compact "CLAUDE'S KITCHEN" parody title card intro (NOT a full-screen takeover) — a clay-Claude chef + the parody name
const HKIntro: React.FC<{ f: number }> = ({ f }) => {
  const END = 40;
  if (f >= END) return null;
  const opIn = over(f, 0, 4);
  const pop = interpolate(f, [0, 10], [0.55, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.9)) });
  const exit = over(f, 26, 13, Easing.inOut(Easing.cubic));      // slide up + fade out to reveal the reel
  const vis = opIn * (1 - exit);
  if (vis <= 0.01) return null;
  const flick = 0.9 + Math.sin(f / 2.4) * 0.1;
  return (
    <AbsoluteFill style={{ zIndex: 500, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* soft PARTIAL scrim only behind the card (scene stays visible around it — not the whole screen) */}
      <AbsoluteFill style={{ background: "radial-gradient(58% 30% at 50% 47%, rgba(8,4,2,0.74) 0%, rgba(8,4,2,0.28) 55%, rgba(8,4,2,0) 80%)", opacity: vis }} />
      <div style={{ position: "relative", width: 860, transform: `translateY(${-exit * 150}px) scale(${pop})`, opacity: vis, padding: 4, borderRadius: 30, background: `linear-gradient(180deg, ${BRASS}, ${BRASSD})`, boxShadow: `0 30px 72px -18px rgba(10,4,2,0.85), 0 0 64px rgba(255,90,60,0.42)` }}>
        <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", background: "linear-gradient(178deg,#271A14,#150C09)", border: "2px solid #3B2A20", padding: "26px 34px 30px" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, background: `linear-gradient(90deg, ${HKREDD}, ${HKRED}, ${FLAME}, ${HKRED}, ${HKREDD})`, opacity: flick }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
            <div style={{ width: 150, height: 150, flex: "0 0 auto", position: "relative", top: 8 }}><RamsayChef lf={f} size={150} pose="hipshake" tint={CLAY} nod={1} /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: FLAMEY, textShadow: `0 0 12px ${HKR_GLOW}`, marginBottom: 4 }}>🔥 A HELL&rsquo;S KITCHEN PARODY 🔥</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 72, lineHeight: 0.98, color: "#FFDD66", textShadow: `0 0 4px #FFEFA8, 0 0 22px ${FLAME}`, opacity: flick }}>CLAUDE&rsquo;S</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 72, lineHeight: 1.02, color: "#FFFFFF", textShadow: `0 0 4px #FFFFFF, 0 0 22px ${HKR_GLOW}` }}>KITCHEN</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================== MAIN ==============================
const ACC = [FLAME, GOLD, STEEL_HI, HKR_GLOW, HKRED, GREEN, HKR_GLOW, GOLD];
// Hell's Kitchen panel glows: fiery ember reds + blue-steel stations (brighter + warmer than the old near-blacks)
const BASES: [string, string][] = [["#3A1A10", "#1B0C08"], ["#39240F", "#1C1108"], ["#1F2C3C", "#0E1620"], ["#421612", "#200A08"], ["#4A150E", "#230806"], ["#22262E", "#0F1116"], ["#421511", "#200A08"], ["#3A2410", "#1C1006"]];
export const ClaudeRamsayReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [S0, S1, S2, S3, S4, S5, S6];
  const LABELS = ["ramsay.check", "the_yes_man", "ramsay.agent", "the_trick", "11_problems", "no_ego", "the_rule"];
  const TINTS = ACC.map((c) => c + "60");
  const AMB = ACC.map((c) => c + "22");
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_ramsay.wav")} />
      {/* music bed: Every Living Breathing Moment (user asset) — sits under VO, ducks near the end so it is not loud over the CTA */}
      {/* music bed from the very beginning; present level, ducks near the end so it is not loud over the CTA */}
      <Audio src={staticFile("ebm_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.6), fr(15), fr(28), fr(42), fr(CUT) - 1], [0.3, 0.46, 0.46, 0.22, 0.15, 0.10], { extrapolateRight: "clamp" })} />
      {/* ============ SFX PASS v6 — dense cooking texture + beat accents (no flash sounds) ============ */}
      {/* HELL'S KITCHEN intro transition */}
      <Sfx at={0.0} src="lib_riser.wav" v={0.32} dur={1.0} />
      <Sfx at={0.04} src="lib_deep_whoosh.wav" v={0.3} dur={0.7} />
      <Sfx at={0.55} src="lib_whoosh.wav" v={0.32} dur={0.6} />
      {/* S0 blazing kitchen (0-7.78) */}
      <Sfx at={0.10} src="lib_whoosh.wav" v={0.26} dur={0.7} />
      <Sfx at={0.55} src="thock.wav" v={0.17} dur={0.3} />
      <Sfx at={1.15} src="c_bump.wav" v={0.15} dur={0.3} />
      <Sfx at={1.75} src="lib_deep_whoosh.wav" v={0.22} dur={0.7} />
      <Sfx at={2.35} src="snap.wav" v={0.15} dur={0.3} />
      <Sfx at={2.95} src="thock.wav" v={0.15} dur={0.3} />
      <Sfx at={3.85} src="twang.wav" v={0.22} dur={0.5} />
      <Sfx at={4.8} src="snap.wav" v={0.15} dur={0.3} />
      <Sfx at={5.6} src="chimelo.wav" v={0.18} dur={0.5} />
      <Sfx at={6.6} src="impact.wav" v={0.24} dur={0.6} />
      {/* S1 MasterChef praise -> explosion (7.78-14.82) */}
      <Sfx at={7.85} src="swish.wav" v={0.26} dur={0.4} />
      <Sfx at={7.98} src="lib_magic_reveal.wav" v={0.24} dur={0.8} />
      <Sfx at={9.0} src="sparkle.wav" v={0.2} dur={0.5} />
      <Sfx at={9.7} src="chimehi.wav" v={0.2} dur={0.5} />
      <Sfx at={10.3} src="lib_pop2.wav" v={0.22} dur={0.3} />
      <Sfx at={10.9} src="pop.wav" v={0.22} dur={0.3} />
      <Sfx at={11.5} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={12.1} src="shimmer.wav" v={0.2} dur={0.5} />
      <Sfx at={14.05} src="c_explode.wav" v={0.44} dur={0.9} />
      <Sfx at={14.12} src="boom.wav" v={0.3} dur={0.8} />
      {/* S2 Kitchen Nightmares cooking (14.82-26.38) */}
      <Sfx at={14.90} src="lib_deep_whoosh.wav" v={0.3} dur={0.7} />
      <Sfx at={15.7} src="thock.wav" v={0.17} dur={0.3} />
      <Sfx at={16.5} src="c_bump.wav" v={0.15} dur={0.3} />
      <Sfx at={17.3} src="snap.wav" v={0.15} dur={0.3} />
      <Sfx at={18.1} src="lib_deep_whoosh.wav" v={0.2} dur={0.6} />
      <Sfx at={19.6} src="screech.wav" v={0.26} dur={0.5} />
      <Sfx at={20.4} src="twang.wav" v={0.22} dur={0.5} />
      <Sfx at={20.7} src="thock.wav" v={0.2} dur={0.3} />
      <Sfx at={22.2} src="snap.wav" v={0.15} dur={0.3} />
      <Sfx at={23.4} src="swish.wav" v={0.24} dur={0.4} />
      <Sfx at={23.75} src="thock.wav" v={0.2} dur={0.3} />
      <Sfx at={24.6} src="swish.wav" v={0.24} dur={0.4} />
      <Sfx at={24.95} src="thock.wav" v={0.2} dur={0.3} />
      {/* S3 cook-off + magnifier (26.38-36.55) */}
      <Sfx at={26.45} src="lib_whoosh.wav" v={0.28} dur={0.6} />
      <Sfx at={27.4} src="thock.wav" v={0.16} dur={0.3} />
      <Sfx at={28.3} src="chimehi.wav" v={0.2} dur={0.5} />
      <Sfx at={29.5} src="ding.wav" v={0.2} dur={0.5} />
      <Sfx at={31.2} src="lib_whoosh_fast.wav" v={0.3} dur={0.5} />
      <Sfx at={31.35} src="c_power.wav" v={0.28} dur={0.6} />
      <Sfx at={33.0} src="tick.wav" v={0.18} dur={0.3} />
      <Sfx at={33.9} src="tick.wav" v={0.18} dur={0.3} />
      <Sfx at={34.7} src="tick.wav" v={0.2} dur={0.3} />
      <Sfx at={35.5} src="lib_pop.wav" v={0.18} dur={0.3} />
      {/* S4 fury flag-stabs + counter (36.55-42.88) */}
      <Sfx at={36.6} src="lib_whoosh.wav" v={0.28} dur={0.5} />
      <Sfx at={37.9} src="slash.wav" v={0.3} dur={0.5} />
      <Sfx at={38.0} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={38.19} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={38.38} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={38.57} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={38.76} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={38.95} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={39.14} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={39.33} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={39.52} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={39.71} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={39.9} src="thock.wav" v={0.2} dur={0.2} />
      <Sfx at={40.15} src="c_powerbig.wav" v={0.3} dur={0.7} />
      <Sfx at={41.5} src="screech.wav" v={0.28} dur={0.5} />
      {/* S5 inflate + magnifier (42.88-51.36) */}
      <Sfx at={42.95} src="lib_whoosh.wav" v={0.28} dur={0.6} />
      <Sfx at={44.0} src="lib_riser.wav" v={0.22} dur={1.4} />
      <Sfx at={45.5} src="lib_pop2.wav" v={0.24} dur={0.4} />
      <Sfx at={48.5} src="tick.wav" v={0.18} dur={0.3} />
      <Sfx at={49.4} src="tick.wav" v={0.18} dur={0.3} />
      <Sfx at={50.4} src="chimelo.wav" v={0.2} dur={0.5} />
      {/* S6 the rule (51.36-56.30) */}
      <Sfx at={51.45} src="lib_riser.wav" v={0.24} dur={0.9} />
      <Sfx at={52.0} src="impact.wav" v={0.26} dur={0.6} />
      <Sfx at={53.5} src="c_bump.wav" v={0.2} dur={0.4} />
      <Sfx at={54.1} src="lib_deep_whoosh.wav" v={0.2} dur={0.6} />
      {/* CTA awards finale (56.30-end) */}
      <Sfx at={56.35} src="c_fanfare.wav" v={0.24} dur={1.3} />
      <Sfx at={56.35} src="crowd_cheer.wav" v={0.15} dur={1.2} />
      <Sfx at={56.45} src="c_1up.wav" v={0.22} dur={0.6} />
      <Sfx at={56.95} src="lib_pop.wav" v={0.24} dur={0.3} />
      {/* ---- speech-bubble pops (each bubble gets a punchy blip) ---- */}
      <Sfx at={6.33} src="lib_pop2.wav" v={0.26} dur={0.3} />
      <Sfx at={8.77} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={10.27} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={10.32} src="chimehi.wav" v={0.16} dur={0.4} />
      <Sfx at={12.03} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={19.5} src="lib_pop2.wav" v={0.26} dur={0.3} />
      <Sfx at={23.63} src="lib_pop2.wav" v={0.26} dur={0.3} />
      <Sfx at={27.5} src="lib_pop.wav" v={0.2} dur={0.3} />
      <Sfx at={32.07} src="lib_pop2.wav" v={0.26} dur={0.3} />
      <Sfx at={38.2} src="lib_pop2.wav" v={0.28} dur={0.3} />
      <Sfx at={39.73} src="lib_pop2.wav" v={0.28} dur={0.3} />
      <Sfx at={44.53} src="lib_pop.wav" v={0.22} dur={0.3} />
      <Sfx at={50.17} src="lib_pop2.wav" v={0.26} dur={0.3} />
      <Sfx at={53.7} src="lib_pop2.wav" v={0.26} dur={0.3} />
      {/* ---- extra kitchen texture (denser SFX throughout) ---- */}
      <Sfx at={2.6} src="c_bump.wav" v={0.13} dur={0.3} />
      <Sfx at={4.3} src="tick.wav" v={0.12} dur={0.2} />
      <Sfx at={8.45} src="swish.wav" v={0.16} dur={0.3} />
      <Sfx at={16.9} src="tick.wav" v={0.12} dur={0.2} />
      <Sfx at={21.0} src="c_bump.wav" v={0.13} dur={0.3} />
      <Sfx at={22.6} src="snap.wav" v={0.13} dur={0.2} />
      <Sfx at={28.9} src="tick.wav" v={0.12} dur={0.2} />
      <Sfx at={30.5} src="thock.wav" v={0.14} dur={0.3} />
      <Sfx at={35.0} src="c_bump.wav" v={0.12} dur={0.3} />
      <Sfx at={43.5} src="swish.wav" v={0.16} dur={0.3} />
      <Sfx at={46.8} src="tick.wav" v={0.12} dur={0.2} />
      <Sfx at={49.0} src="c_bump.wav" v={0.12} dur={0.3} />
      <Sfx at={52.6} src="tick.wav" v={0.13} dur={0.2} />
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
        {scene(7) ? <RamsayCTA lf={frame - Lf[7]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
      <HKIntro f={frame} />
    </AbsoluteFill>
  );
};
