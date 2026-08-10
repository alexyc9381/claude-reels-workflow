import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_brandkit.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
const L = [0, 3.58, 5.26, 10.38, 13.14, 16.32, 22.14, 26.78];
const Lf = L.map(fr);
const CUT = 30.04;

// the 5 skill gem colors (consistent across the whole reel)
const GEMS5 = ["#9E7BC8", "#5AA0DE", "#C44A3A", "#3F9E74", "#E7B24C"];

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const seedArr = (n: number): number[] => Array.from({ length: Math.max(0, n | 0) }, (_, i) => seed(i * 1.618 + n * 7.3 + 1));
const bob = (f: number, amp = 6, period = 60, ph = 0) => Math.sin((f / period + ph) * Math.PI * 2) * amp;
const THANOS = "#A855F7";
const GRN = GREEN, GRNL = "#5FE0A2", GLD = GOLD, GLDL = "#F3D98A";
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

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; constr?: number; chef?: number; suit?: number; beard?: number; xeyes?: number; samurai?: number; fro?: number; capeC?: string; tint?: string }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, constr = 0, chef = 0, suit = 0, beard = 0, xeyes = 0, samurai = 0, fro = 0, capeC, tint }) => {
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

const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  // ---- shared hero + palette anchors (S1 continues from these EXACT values) ----
  const HERO_SIZE = 250, HERO_BOTTOM = 104;
  const PXc = cx, PY0 = 300, PW = 186;
  const CLAYC = "#D97757", TEAL = "#1FB6A6", BERET = "#C6472F";
  const DABS: [number, number][] = [[50, 68], [80, 50], [110, 48], [140, 56], [164, 80]];
  const SRC: [number, number][] = [[-90, 250], [150, -80], [880, -80], [1104, 300], [820, 862]];

  // ================= OPENING PATTERN INTERRUPT: STOP sign flies in from the RIGHT =================
  // frames 0-4 whoosh in from off-right -> center; 4-10 HOLD big; 10-16 whip back out (spin off-left), revealing the scene.
  const SS = 224;
  const inP = interpolate(lf, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const outP = interpolate(lf, [10, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.back(1.7)) });
  const stopX = cx + (1 - inP) * 760 - outP * 1000;                       // enters from ~1266 (off right), lands 506, exits ~-494 (off left)
  const stopY = 332;                                                      // clear of the top header zone
  const inScale = interpolate(lf, [0, 5], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.8)) });
  const stopScale = inScale * (1 - outP * 0.42);
  const stopWobble = lf >= 4 && lf < 11 ? Math.sin(lf * 2.3) * 2.4 * (1 - (lf - 4) / 7) : 0;
  const stopRot = (1 - inP) * -22 + outP * -175 + stopWobble;            // slight cant on entry, big spin on exit
  const shake = lf >= 3 && lf < 11 ? Math.sin(lf * 4.1) * 8 * (1 - (lf - 3) / 8) : 0;   // hard little screen-shake on arrival
  const stopHit = lf >= 3 && lf < 9 ? 1 - (lf - 3) / 6 : 0;              // brief red impact flash
  const stopShock = lf >= 3 && lf < 15 ? Math.max(0, 1 - (lf - 3) / 12) * 0.72 : 0;     // mascot reacts SHOCKED
  const recoil = lf >= 3 && lf < 15 ? Math.max(0, 1 - (lf - 3) / 12) : 0;               // little lean-back / jump

  // ---- five brand colors streak in and lock ONE-BY-ONE as paint dabs (AFTER the stop sign leaves) ----
  const locks = [18, 28, 38, 48, 58];
  const slideDur = 9;
  const collected = locks.filter((L) => lf >= L).length;
  const snapAt = 58;

  // ---- FULL transformation on the 5th lock: teal recolor + beret + glow ----
  const tealT = over(lf, snapAt, 30, Easing.inOut(Easing.cubic));          // clay -> creative teal, 58..88
  const heroTint = lerpHex(CLAYC, TEAL, tealT);
  const beretShow = over(lf, snapAt - 1, 10, Easing.out(Easing.back(2)));
  const glow = over(lf, snapAt, 20, Easing.out(Easing.cubic));
  const powR = over(lf, snapAt, 18, Easing.out(Easing.cubic));
  const snapFlash = lf >= snapAt && lf < snapAt + 7 ? 1 - (lf - snapAt) / 7 : 0;
  const auraC = tealT > 0.4 ? "31,182,166" : "231,178,76";

  // ---- hero expression + gentle growth (steady, no camera shake) ----
  const gaze = collected < 3 ? 3 : 0;
  const stern = lf >= 20 && lf < snapAt ? Math.min(0.42, (collected - 1) * 0.15) : 0;
  const cheer = lf >= snapAt ? Math.min(1, over(lf, snapAt, 10)) * (0.72 + Math.max(0, Math.sin(lf / 6)) * 0.28) : 0;
  const heroScale = (1 + collected * 0.018) * (1 + glow * 0.06);
  const heroHopP = Math.max(0, Math.sin(lf / 3.6));
  const heroHop = heroHopP * 3 * 2.2;                                       // matches Mascot's internal head hop
  const heroSquash = 1 - heroHopP * 0.045;                                  // matches Mascot's internal squash so the beret tracks the crown

  // ---- palette grows a notch per lock, blooms on the transform, floats a touch ----
  const palScale = (0.9 + collected * 0.03) * (1 + powR * 0.12);
  const PY = PY0 - glow * 8 + bob(lf, 4, 70, 0);
  const palPulse = Math.max(0, Math.sin(lf / 5));                           // gentle shimmer once it's lit
  const palGlow = 0.2 + collected * 0.06 + glow * (0.82 + 0.28 * palPulse); // blooms brightly on the 5th lock
  const K = (PW / 200) * palScale;                                          // local->screen unit
  const dabX = (i: number) => PXc + (DABS[i][0] - 100) * K;
  const dabY = (i: number) => PY + (DABS[i][1] - 80) * K;

  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px)` }}>
        {/* ===== clean warm studio backdrop ===== */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 42%, #241F2B 0%, #17131C 54%, #0C0912 100%)", zIndex: 0 }} />
        {[0, 1, 2].map((i) => { const rr = 150 + i * 84; return <div key={`br${i}`} style={{ position: "absolute", left: PXc - rr, top: PY0 - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `2px solid rgba(${auraC},${(0.08 - i * 0.02 + glow * 0.06).toFixed(3)})`, zIndex: 1 }} />; })}
        <SpotCone x={cx} top={16} topW={90} botW={440} h={560} color={`rgba(255,238,206,${(0.12 + glow * 0.05).toFixed(3)})`} sway={3} lf={lf} />
        <div style={{ position: "absolute", left: cx - 210, bottom: 66, width: 420, height: 88, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${auraC},${(0.12 + glow * 0.26).toFixed(3)}), transparent 70%)`, zIndex: 2 }} />
        {Array.from({ length: 12 }).map((_, i) => { const r = seed(i * 2.3 + 4), r2 = seed(i * 3.7 + 1); const y = 700 - ((lf * (0.4 + r * 0.5) + r2 * 640) % 660); return <div key={`mo${i}`} style={{ position: "absolute", left: 120 + r2 * 760, top: y, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,246,220,0.4)", opacity: 0.3 + r * 0.4, zIndex: 2 }} />; })}

        {/* ===== powered-up aura behind the hero (on transform) ===== */}
        {glow > 0.04 && <div style={{ position: "absolute", left: cx - 190, bottom: 116, width: 380, height: 430, borderRadius: "50%", background: `radial-gradient(circle, rgba(31,182,166,${(0.4 * glow).toFixed(3)}), transparent 66%)`, transform: `scale(${1 + Math.sin(lf / 5) * 0.06})`, zIndex: 3 }} />}
        {glow > 0.08 && <div style={{ position: "absolute", left: cx - 170, bottom: 96, width: 340, height: 70, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(31,182,166,${(0.5 * glow).toFixed(3)}), transparent 70%)`, zIndex: 4 }} />}

        {/* ===== hero: clay Claude, centered, palette held aloft ===== */}
        <div style={{ position: "absolute", left: cx, bottom: HERO_BOTTOM, width: 8, transform: "translateX(-50%)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: -HERO_SIZE / 2, bottom: 0, width: HERO_SIZE, transform: `scale(${heroScale}) rotate(${-recoil * 3.5}deg) translateY(${recoil * 8}px)`, transformOrigin: "50% 100%", filter: glow > 0.04 ? `drop-shadow(0 0 ${18 * glow}px rgba(31,182,166,${(0.5 * glow).toFixed(3)})) drop-shadow(0 0 6px rgba(180,255,246,${(0.5 * glow).toFixed(3)})) brightness(${1 + 0.08 * glow})` : "none" }}>
            <Mascot lf={lf} size={HERO_SIZE} nodAmp={3} nodSpeed={6} tint={heroTint} glasses={1} gaze={gaze} stern={stern} cheer={cheer} shock={stopShock} />
            {beretShow > 0.01 && (
              <div style={{ position: "absolute", inset: 0, transform: `translateY(${-heroHop}px) scaleY(${heroSquash})`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
                <svg viewBox="0 0 200 200" width={HERO_SIZE} height={HERO_SIZE} style={{ overflow: "visible", transformOrigin: "100px 44px", transform: `scale(${beretShow})` }}>
                  {/* contact shadow where the beret meets the head crown (head-top = y44) */}
                  <ellipse cx={100} cy={46} rx={49} ry={9} fill="rgba(0,0,0,0.20)" transform="rotate(-9 100 46)" />
                  {/* headband hugging the crown so it reads as worn, not floating */}
                  <ellipse cx={100} cy={43} rx={50} ry={11} fill="#A63B26" transform="rotate(-9 100 43)" />
                  {/* puffy body, flopped jauntily to one side */}
                  <ellipse cx={94} cy={27} rx={58} ry={21} fill={BERET} transform="rotate(-9 100 32)" />
                  {/* soft top highlight */}
                  <ellipse cx={76} cy={19} rx={20} ry={7} fill="rgba(255,255,255,0.22)" transform="rotate(-9 76 19)" />
                  {/* little stalk on top */}
                  <circle cx={108} cy={7} r={6} fill={BERET} />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ===== small repo pill (sits in the clear gap under the palette) ===== */}
        {(() => { const p = over(lf, 17, 9, Easing.out(Easing.back(1.2))); if (p <= 0.01) return null; return (
          <div style={{ position: "absolute", left: cx, top: 398, transform: `translateX(-50%) scale(${p})`, zIndex: 12, opacity: Math.min(1, p * 1.5) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "linear-gradient(180deg,#1E232E,#161A23)", border: "2px solid #2E3542", borderRadius: 999, padding: "8px 15px", boxShadow: "0 12px 26px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: mono, fontSize: 15, color: "#E9EDF4", fontWeight: 700 }}>&#9670; claude-brand-studio</span>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: "#0C1015", background: "#4CB07A", padding: "2px 9px", borderRadius: 999 }}>FREE</span>
            </div>
          </div>); })()}

        {/* ===== THE PAINT PALETTE (the recognizable hero object) ===== */}
        <div style={{ position: "absolute", left: PXc, top: PY, transform: `translate(-50%,-50%) scale(${palScale})`, transformOrigin: "50% 50%", zIndex: 8 }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: PW + 80, height: PW + 80, marginLeft: -(PW + 80) / 2, marginTop: -(PW + 80) / 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${auraC},${palGlow.toFixed(3)}), transparent 64%)`, transform: `scale(${1 + powR * 0.4 + Math.sin(lf / 6) * 0.04})` }} />
          <svg viewBox="0 0 200 160" width={PW} height={PW * 160 / 200} style={{ overflow: "visible", filter: `drop-shadow(0 10px 18px rgba(0,0,0,0.45)) drop-shadow(0 0 ${8 + collected * 3 + glow * (40 + palPulse * 14)}px rgba(${auraC},${(0.3 + glow * 0.72).toFixed(3)})) drop-shadow(0 0 ${glow * 10}px rgba(210,255,248,${(glow * 0.55).toFixed(3)}))` }}>
            <ellipse cx={100} cy={86} rx={92} ry={60} fill="rgba(0,0,0,0.25)" />
            <ellipse cx={100} cy={80} rx={92} ry={60} fill="#B98A54" />
            <ellipse cx={100} cy={80} rx={92} ry={60} fill="none" stroke="#9A6E3E" strokeWidth={4} />
            <ellipse cx={100} cy={80} rx={82} ry={51} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
            <ellipse cx={80} cy={50} rx={52} ry={17} fill="rgba(255,255,255,0.13)" />
            {/* thumb hole cutout */}
            <ellipse cx={50} cy={112} rx={15} ry={12} fill="#0E0B13" />
            <ellipse cx={50} cy={112} rx={15} ry={12} fill="none" stroke="#8A6236" strokeWidth={3} />
            {/* 5 paint dabs: empty well -> filled glossy blob */}
            {DABS.map(([x, y], i) => {
              const lit = lf >= locks[i];
              const pop = lit && lf < locks[i] + 8 ? 1 + (1 - (lf - locks[i]) / 8) * 0.55 : 1;
              const r = 13 * (lit ? pop : 1);
              const c = GEMS5[i];
              return (
                <g key={`d${i}`}>
                  <ellipse cx={x} cy={y + 2} rx={13} ry={11} fill="#8A6236" />
                  <ellipse cx={x} cy={y} rx={12} ry={10} fill={lit ? "#6E4E28" : "#7A5730"} />
                  {lit && <>
                    <circle cx={x} cy={y} r={r} fill={c} />
                    <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} />
                    <ellipse cx={x - r * 0.32} cy={y - r * 0.38} rx={r * 0.42} ry={r * 0.28} fill="rgba(255,255,255,0.55)" />
                  </>}
                </g>);
            })}
          </svg>
        </div>

        {/* ===== the 5 colors streak in from the edges and lock into their dab ===== */}
        {GEMS5.map((c, i) => {
          const L = locks[i], start = L - slideDur;
          const appear = over(lf, start - 2, 4);
          if (appear <= 0.01) return null;
          const slide = interpolate(lf, [start, L], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          if (slide >= 1) return null;                     // now a locked paint dab
          const tx = dabX(i), ty = dabY(i);
          const px = interpolate(slide, [0, 1], [SRC[i][0], tx]);
          const py = interpolate(slide, [0, 1], [SRC[i][1], ty]);
          const ang = (Math.atan2(ty - SRC[i][1], tx - SRC[i][0]) * 180) / Math.PI;
          const trail = 40 + slide * 120;
          return (
            <div key={`g${i}`} style={{ position: "absolute", left: px, top: py, transform: `translate(-50%,-50%) scale(${(0.7 + appear * 0.3) * (1 - slide * 0.3)})`, zIndex: 13 }}>
              <div style={{ position: "absolute", left: 0, top: -5, width: trail, height: 10, borderRadius: 5, background: `linear-gradient(90deg, transparent, ${c})`, transformOrigin: "0 50%", transform: `rotate(${ang + 180}deg)`, opacity: 0.9 * (1 - slide * 0.35), filter: "blur(0.5px)" }} />
              <div style={{ position: "absolute", left: -28, top: -28 }}><Gem s={56} c={c} glow={1} /></div>
            </div>);
        })}

        {/* ===== bright CLINK flash as each color locks in ===== */}
        {locks.map((L, i) => {
          const fl = lf >= L && lf < L + 8 ? 1 - (lf - L) / 8 : 0;
          if (fl <= 0) return null;
          const tx = dabX(i), ty = dabY(i);
          return (
            <React.Fragment key={`cf${i}`}>
              <div style={{ position: "absolute", left: tx - 34, top: ty - 34, width: 68, height: 68, borderRadius: "50%", background: `radial-gradient(circle, ${GEMS5[i]}, transparent 66%)`, opacity: fl, zIndex: 14 }} />
              <div style={{ position: "absolute", left: tx - 20, top: ty - 20, width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle, #FFF8E6, transparent 70%)", opacity: fl, zIndex: 14 }} />
              {[0, 60, 120].map((a) => <div key={a} style={{ position: "absolute", left: tx - (16 + (1 - fl) * 40), top: ty - 2, width: 32 + (1 - fl) * 80, height: 4, background: "linear-gradient(90deg, transparent, #FFF8E6, transparent)", transform: `rotate(${a}deg)`, transformOrigin: "50% 50%", opacity: fl, zIndex: 14 }} />)}
            </React.Fragment>);
        })}

        {/* ===== transformation burst on the 5th lock (POWERS-style snap) ===== */}
        {powR > 0.02 && powR < 0.96 && <div style={{ position: "absolute", left: PXc - 210 * powR, top: PY0 - 210 * powR, width: 420 * powR, height: 420 * powR, borderRadius: "50%", border: `${14 * (1 - powR)}px solid rgba(120,240,224,${(0.9 * (1 - powR)).toFixed(3)})`, boxShadow: `0 0 ${40 * (1 - powR)}px rgba(31,182,166,${(0.6 * (1 - powR)).toFixed(3)})`, zIndex: 15 }} />}
        {powR > 0.14 && powR < 0.96 && <div style={{ position: "absolute", left: PXc - 150 * (powR - 0.14), top: PY0 - 150 * (powR - 0.14), width: 300 * (powR - 0.14), height: 300 * (powR - 0.14), borderRadius: "50%", border: `${9 * (1 - powR)}px solid rgba(231,178,76,${(0.8 * (1 - powR)).toFixed(3)})`, zIndex: 15 }} />}
        {powR > 0.04 && powR < 0.85 && Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; const r = 60 + powR * 300; return <div key={`pw${i}`} style={{ position: "absolute", left: PXc + Math.cos(a) * r, top: PY0 + Math.sin(a) * r, width: 52, height: 5, marginLeft: -26, background: `linear-gradient(90deg, transparent, rgba(220,255,248,${(0.8 * (1 - powR)).toFixed(3)}))`, transform: `rotate(${(a * 180) / Math.PI}deg)`, zIndex: 15 }} />; })}
        {/* slow radiating power rays that linger after the transform */}
        {glow > 0.1 && Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * 360 + lf * 0.6; return <div key={`ry${i}`} style={{ position: "absolute", left: PXc, top: PY0, width: 760, height: 7, marginLeft: -380, marginTop: -3, background: `linear-gradient(90deg, transparent 44%, rgba(31,182,166,${(0.16 * glow).toFixed(3)}) 50%, transparent 56%)`, transformOrigin: "50% 50%", transform: `rotate(${a}deg)`, zIndex: 5 }} />; })}

        {/* ===== OPENING STOP-SIGN PATTERN INTERRUPT (flies in from the right, holds, whips out) ===== */}
        {lf < 17 && (<>
          {/* motion-blur streak trailing to the right as it whooshes in */}
          {inP < 0.97 && <div style={{ position: "absolute", left: stopX, top: stopY - 15, width: 300 * (1 - inP) + 50, height: 30, background: "linear-gradient(90deg, rgba(208,52,44,0), rgba(208,52,44,0.6))", borderRadius: 15, filter: "blur(2.5px)", zIndex: 43, opacity: 1 - outP }} />}
          {/* quick impact shock-lines bursting on arrival */}
          {stopHit > 0.03 && Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; const rr = 96 + (1 - stopHit) * 120; return <div key={`shl${i}`} style={{ position: "absolute", left: stopX + Math.cos(a) * rr, top: stopY + Math.sin(a) * rr, width: 46, height: 6, marginLeft: -23, marginTop: -3, background: `linear-gradient(90deg, transparent, rgba(255,240,230,${(0.85 * stopHit).toFixed(3)}))`, transform: `rotate(${(a * 180) / Math.PI}deg)`, zIndex: 44 }} />; })}
          <div style={{ position: "absolute", left: stopX, top: stopY, transform: `translate(-50%,-50%) scale(${stopScale}) rotate(${stopRot}deg)`, zIndex: 45, opacity: 1 - outP * 0.85 }}>
            <svg viewBox="0 0 100 100" width={SS} height={SS} style={{ overflow: "visible", filter: "drop-shadow(0 14px 34px rgba(0,0,0,0.6))" }}>
              <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#D0342C" stroke="#ffffff" strokeWidth={9} strokeLinejoin="round" />
              <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="none" stroke="rgba(0,0,0,0.16)" strokeWidth={2} strokeLinejoin="round" transform="scale(0.83) translate(10.2 10.2)" />
              <text x={50} y={50} textAnchor="middle" dominantBaseline="central" fontFamily="Inter, Helvetica, Arial, sans-serif" fontWeight={900} fontSize={26} letterSpacing={1} fill="#ffffff">STOP</text>
            </svg>
          </div>
        </>)}

        <Sparkles lf={lf} at={1.933} x={PXc} y={PY0} n={26} spread={360} colors={["#7CF0DE", GOLD, "#fff", "#5AA0DE"]} dur={1.0} />
        {glow > 0.2 && <Confetti lf={lf} n={26} colors={["#1FB6A6", GOLD, "#FCEDDD", "#7CF0DE"]} top={-20} h={820} />}

        <Grain op={0.05} />
        <Vignette strength={0.5} />
      </div>
      {/* red impact flash on the STOP interrupt */}
      {stopHit > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 90% at 50% 42%, transparent 42%, rgba(178,40,30,0.5) 100%)", opacity: stopHit, zIndex: 46, pointerEvents: "none" }} />}
      {snapFlash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(224,255,250,0.55), transparent 70%)", opacity: 0.7 * snapFlash, zIndex: 30, pointerEvents: "none" }} />}
    </>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const P = lf + 106;                                                        // continue S0's animation phase (S1 f0 == S0 f106)
  // ---- same shared anchors as S0 ----
  const HERO_SIZE = 250, HERO_BOTTOM = 104;
  const PXc = cx, PW = 186;
  const TEAL = "#1FB6A6", BERET = "#C6472F";
  const auraC = "31,182,166";
  const DABS: [number, number][] = [[50, 68], [80, 50], [110, 48], [140, 56], [164, 80]];

  // ---- continue from S0 end: teal, beret, glow all fully on ----
  const heroTint = TEAL;
  const cheer = 0.72 + Math.max(0, Math.sin(P / 6)) * 0.28;
  const heroScale = 1.155;
  const heroHopP = Math.max(0, Math.sin(P / 3.6));
  const heroHop = heroHopP * 3 * 2.2;
  const heroSquash = 1 - heroHopP * 0.045;

  // ---- palette lifts + shrinks to make room; still full of the 5 colors ----
  const rise = over(lf, 2, 18, Easing.inOut(Easing.cubic));
  const palScale = interpolate(rise, [0, 1], [1.176, 0.72]);
  const PY = interpolate(rise, [0, 1], [292, 206]) + bob(P, 4, 70, 0);

  // ---- the 5 colors BLOOM OUT into 3 tidy, evenly-spaced cards in a row ----
  const cardAt = [3, 11, 19];
  const CW = 152, CH = 150, CY = 350, GAPX = 186;
  const cardX = [cx - GAPX, cx, cx + GAPX];
  const badge = over(lf, 30, 9, Easing.out(Easing.back(1.6)));

  return (
    <>
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ===== same warm studio backdrop as S0 ===== */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 42%, #241F2B 0%, #17131C 54%, #0C0912 100%)", zIndex: 0 }} />
        {[0, 1, 2].map((i) => { const rr = 150 + i * 84; return <div key={`br${i}`} style={{ position: "absolute", left: PXc - rr, top: 300 - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `2px solid rgba(${auraC},${(0.1 - i * 0.02).toFixed(3)})`, zIndex: 1 }} />; })}
        <SpotCone x={cx} top={16} topW={90} botW={440} h={560} color="rgba(255,238,206,0.15)" sway={3} lf={P} />
        <div style={{ position: "absolute", left: cx - 210, bottom: 66, width: 420, height: 88, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${auraC},0.34), transparent 70%)`, zIndex: 2 }} />
        {Array.from({ length: 12 }).map((_, i) => { const r = seed(i * 2.3 + 4), r2 = seed(i * 3.7 + 1); const y = 700 - ((P * (0.4 + r * 0.5) + r2 * 640) % 660); return <div key={`mo${i}`} style={{ position: "absolute", left: 120 + r2 * 760, top: y, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,246,220,0.4)", opacity: 0.3 + r * 0.4, zIndex: 2 }} />; })}

        {/* slow radiating rays (carried over from S0) */}
        {Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * 360 + P * 0.6; return <div key={`ry${i}`} style={{ position: "absolute", left: PXc, top: 300, width: 760, height: 7, marginLeft: -380, marginTop: -3, background: "linear-gradient(90deg, transparent 44%, rgba(31,182,166,0.14) 50%, transparent 56%)", transformOrigin: "50% 50%", transform: `rotate(${a}deg)`, zIndex: 5 }} />; })}

        {/* aura behind hero */}
        <div style={{ position: "absolute", left: cx - 190, bottom: 116, width: 380, height: 430, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,182,166,0.4), transparent 66%)", transform: `scale(${1 + Math.sin(P / 5) * 0.06})`, zIndex: 3 }} />
        <div style={{ position: "absolute", left: cx - 170, bottom: 96, width: 340, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(31,182,166,0.5), transparent 70%)", zIndex: 4 }} />

        {/* ===== hero: teal, beret, glowing, presenting ===== */}
        <div style={{ position: "absolute", left: cx, bottom: HERO_BOTTOM, width: 8, transform: "translateX(-50%)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: -HERO_SIZE / 2, bottom: 0, width: HERO_SIZE, transform: `scale(${heroScale})`, transformOrigin: "50% 100%", filter: "drop-shadow(0 0 18px rgba(31,182,166,0.5)) drop-shadow(0 0 6px rgba(180,255,246,0.5)) brightness(1.08)" }}>
            <Mascot lf={P} size={HERO_SIZE} nodAmp={3} nodSpeed={6} tint={heroTint} glasses={1} cheer={cheer} />
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${-heroHop}px) scaleY(${heroSquash})`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
              <svg viewBox="0 0 200 200" width={HERO_SIZE} height={HERO_SIZE} style={{ overflow: "visible" }}>
                <ellipse cx={100} cy={46} rx={49} ry={9} fill="rgba(0,0,0,0.20)" transform="rotate(-9 100 46)" />
                <ellipse cx={100} cy={43} rx={50} ry={11} fill="#A63B26" transform="rotate(-9 100 43)" />
                <ellipse cx={94} cy={27} rx={58} ry={21} fill={BERET} transform="rotate(-9 100 32)" />
                <ellipse cx={76} cy={19} rx={20} ry={7} fill="rgba(255,255,255,0.22)" transform="rotate(-9 76 19)" />
                <circle cx={108} cy={7} r={6} fill={BERET} />
              </svg>
            </div>
          </div>
        </div>

        {/* ===== the 3 brand-kit cards bloom out in a tidy, aligned row ===== */}
        {cardX.map((X, i) => {
          const p = Math.min(1, over(lf, cardAt[i], 9, Easing.out(Easing.back(1.7))));
          if (p <= 0.01) return null;
          const s = Math.min(1.06, p);
          return (
            <div key={`c${i}`} style={{ position: "absolute", left: X - CW / 2, top: CY - CH / 2, width: CW, height: CH, transform: `scale(${s})`, transformOrigin: "50% 60%", opacity: Math.min(1, p * 1.6), zIndex: 12 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 18, background: "linear-gradient(180deg,#1E232E,#141821)", border: "2px solid #2E3542", boxShadow: `0 16px 34px rgba(0,0,0,0.5), 0 0 18px rgba(${auraC},0.18)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, overflow: "hidden" }}>
                {i === 0 && <>
                  <div style={{ width: 58, height: 58 }}><ClaudeMark size={58} /></div>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 800, color: "#CBD2DE", letterSpacing: 2 }}>LOGO</span>
                </>}
                {i === 1 && <>
                  <div style={{ display: "flex", gap: 8 }}>{GEMS5.map((c, k) => <div key={k} style={{ width: 19, height: 34, borderRadius: 5, background: c, boxShadow: `0 0 8px ${c}` }} />)}</div>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 800, color: "#CBD2DE", letterSpacing: 2 }}>COLORS</span>
                </>}
                {i === 2 && <>
                  <span style={{ fontFamily: fraunces.fontFamily, fontSize: 62, fontWeight: 900, color: "#F0EADF", lineHeight: 1 }}>Aa</span>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 800, color: "#CBD2DE", letterSpacing: 2 }}>TYPE</span>
                </>}
              </div>
            </div>);
        })}

        {/* ===== the palette lifts + shrinks, still full of the 5 colors ===== */}
        <div style={{ position: "absolute", left: PXc, top: PY, transform: `translate(-50%,-50%) scale(${palScale})`, transformOrigin: "50% 50%", zIndex: 8 }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: PW + 80, height: PW + 80, marginLeft: -(PW + 80) / 2, marginTop: -(PW + 80) / 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${auraC},0.6), transparent 64%)`, transform: `scale(${1 + Math.sin(P / 6) * 0.04})` }} />
          <svg viewBox="0 0 200 160" width={PW} height={PW * 160 / 200} style={{ overflow: "visible", filter: `drop-shadow(0 10px 18px rgba(0,0,0,0.45)) drop-shadow(0 0 26px rgba(${auraC},0.6))` }}>
            <ellipse cx={100} cy={86} rx={92} ry={60} fill="rgba(0,0,0,0.25)" />
            <ellipse cx={100} cy={80} rx={92} ry={60} fill="#B98A54" />
            <ellipse cx={100} cy={80} rx={92} ry={60} fill="none" stroke="#9A6E3E" strokeWidth={4} />
            <ellipse cx={100} cy={80} rx={82} ry={51} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
            <ellipse cx={80} cy={50} rx={52} ry={17} fill="rgba(255,255,255,0.13)" />
            <ellipse cx={50} cy={112} rx={15} ry={12} fill="#0E0B13" />
            <ellipse cx={50} cy={112} rx={15} ry={12} fill="none" stroke="#8A6236" strokeWidth={3} />
            {DABS.map(([x, y], i) => { const c = GEMS5[i]; const r = 13; return (
              <g key={`d${i}`}>
                <ellipse cx={x} cy={y + 2} rx={13} ry={11} fill="#8A6236" />
                <ellipse cx={x} cy={y} rx={12} ry={10} fill="#6E4E28" />
                <circle cx={x} cy={y} r={r} fill={c} />
                <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} />
                <ellipse cx={x - r * 0.32} cy={y - r * 0.38} rx={r * 0.42} ry={r * 0.28} fill="rgba(255,255,255,0.55)" />
              </g>); })}
          </svg>
        </div>

        {/* ===== $0 FREE badge ===== */}
        {badge > 0.01 && (
          <div style={{ position: "absolute", left: cx + 150, top: 214, transform: `translate(-50%,-50%) rotate(-8deg) scale(${badge})`, zIndex: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #F6D77A, #E7B24C)", border: "3px solid #fff", boxShadow: "0 8px 20px rgba(0,0,0,0.4), 0 0 22px rgba(231,178,76,0.6)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontSize: 26, fontWeight: 900, color: "#3A2A0C", lineHeight: 1 }}>$0</span>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: "#3A2A0C", letterSpacing: 2 }}>FREE</span>
            </div>
          </div>)}

        {/* per-card sparkle pops + continuous confetti (carried over from S0) */}
        {cardX.map((X, i) => <Sparkles key={`sp${i}`} lf={lf} at={cardAt[i] / 30} x={X} y={CY} n={12} spread={120} colors={[GEMS5[i % 5], "#fff", "#7CF0DE"]} dur={0.7} />)}
        <Confetti lf={P} n={26} colors={["#1FB6A6", GOLD, "#FCEDDD", "#7CF0DE"]} top={-20} h={820} />

        <Grain op={0.05} />
        <Vignette strength={0.5} />
      </div>
    </>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const F = inter.fontFamily, S = fraunces.fontFamily;

  // ---- premium agency palette (calm marble + one hot money-red) ----
  const MARB = "#F1EDE4", MARB2 = "#E6DDCC", MARBD = "#D3C7AD";
  const HOT = "#D23B2B", HOTD = "#A22619", HOTL = "#F0715F";
  const GLINE = "#DDD3C0";
  const LEAF = "#38624A";
  const GREYc = "#9A9384", GREYLc = "#C6BFB1";
  const PAPER = "#FBF9F3", PLINE = "#E3DBC9", SUB = "#8C8474";
  const NB = "#141210", STEEL = "#DFE7EE", STEELD = "#A9B5C1";

  // ---- geometry: the vertical money meter (thermometer / gauge) ----
  const TX = 388;
  const COL_W = 66;
  const TUBE_HW = 54;
  const BODY_TOP = 200, BODY_BOT = 582;
  const BULB_CY = 640, BULB_R = 68;
  const BODY_H = BODY_BOT - BODY_TOP;

  // ---- timing (scene 154f) ----
  const climb = over(lf, fr(0.33), fr(2.6), Easing.out(Easing.cubic)); // fills, lands ~f88
  const landF = fr(0.33) + fr(2.6);
  const slam = over(lf, landF - 3, fr(0.42), Easing.out(Easing.back(2.2)));
  const st = lf - landF;
  const shake = st >= 0 && st < 14 ? Math.sin(st * 3.1) * 5 * (1 - st / 14) : 0;
  const redFlash = st >= 0 && st < 8 ? 1 - st / 8 : 0;
  const climbing = climb > 0.02 && climb < 0.985;
  const tickJit = climbing ? Math.abs(Math.sin(lf * 0.9)) * 0.02 : 0;

  // ---- NINJA SKIP payoff (~f97-127) ----
  const skip = over(lf, 101, 20, Easing.out(Easing.cubic));       // release of red tension
  const ninjaP = over(lf, 97, 10, Easing.linear);                 // dash across (linear for sync)
  const ninjaVis = lf >= 95 && lf <= 112;
  const nx = -180 + ninjaP * 1360;                                // -180 -> 1180 (contact ~f102)
  const ny = 560 - ninjaP * 300;                                  // 560 -> 260
  const slash = over(lf, 100, 5, Easing.out(Easing.cubic));       // katana light-sweep, 100-105
  const split = over(lf, 103, 24, Easing.out(Easing.cubic));      // halves slide apart, 103-127
  const drain = over(lf, 104, 22, Easing.in(Easing.cubic));       // tube fill drains
  const strike = over(lf, 101, 6);                                // strike-through on $4,000
  const cutOp = slash * (1 - over(lf, 132, 20));

  // ---- RED TENSION driver: redT = meter fill fraction, releases on skip ----
  const redT = Math.max(0, climb * (1 - skip));
  const nearTop = Math.max(0, (redT - 0.72) / 0.28);
  const redPulse = nearTop * (0.32 + 0.32 * Math.sin(lf * 0.55));

  // ---- fill fractions (tube drains on skip; number-tag freezes at $4,000) ----
  const fillFrac = Math.max(0, climb * (1 - drain));
  const crestWob = climbing ? Math.sin(lf * 0.5) * 3 : 0;
  const crestY = interpolate(fillFrac, [0, 1], [BODY_BOT, BODY_TOP]) + crestWob;
  const bodyFillH = Math.max(0, BODY_BOT - crestY);
  const tagCrestY = interpolate(climb, [0, 1], [BODY_BOT + 4, BODY_TOP + 8]);
  const valStepped = Math.min(4000, Math.round((climb * 4000) / 50) * 50);

  const fillHot = lerpHex(HOT, GREYc, skip * 0.9);
  const fillHotL = lerpHex(HOTL, GREYLc, skip * 0.9);
  const auraOp = climb * (1 - skip * 0.92);

  // ---- founder reaction: escalating dread -> release ----
  const shockNow = Math.min(0.95, redT * 1.05);
  const jaw = over(lf, fr(2.0), fr(0.5), Easing.out(Easing.back(1.5))) * (1 - skip);
  const relief = skip;
  const tremble = Math.sin(lf * 1.4) * redT * 2.2;

  // ---- supporting chips ----
  const chip1 = over(lf, fr(0.6), fr(0.5), Easing.out(Easing.back(1.5)));
  const chip2 = over(lf, fr(1.55), fr(0.5), Easing.out(Easing.back(1.5)));
  const glow = 0.72 + 0.28 * Math.sin(lf * 0.06);
  const tagScale = (0.92 + 0.1 * climb + slam * 0.12) + tickJit;

  // ---- background gradient reddens with tension ----
  const bg0 = lerpHex(MARB, "#F7DAD0", redT * 0.75);
  const bg1 = lerpHex(MARB2, "#E7A091", redT * 0.62);
  const bg2 = lerpHex(MARBD, "#C1583F", redT * 0.72);

  // sweat count scales with tension
  const sweatN = Math.round(2 + redT * 7);

  const stage = (
    <>
      {/* ===== reddening marble backdrop ===== */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(118% 92% at 50% 4%, ${bg0} 0%, ${bg1} 58%, ${bg2} 100%)` }} />
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const r = seed(i * 4.2 + 1); const x0 = 90 + r * 840;
          return <path key={`v${i}`} d={`M ${x0} 30 q ${(-50 + r * 140)} 220 ${(-14 + r * 70)} 520`} stroke="rgba(255,255,255,0.5)" strokeWidth={1.3} fill="none" />;
        })}
      </svg>

      {/* ===== potted plant, bottom-right (moved to clear the left for the mascot) ===== */}
      <div style={{ position: "absolute", right: 22, bottom: 14, width: 138, height: 220, opacity: 0.4, zIndex: 2 }}>
        <svg viewBox="0 0 150 240" width={138} height={220}>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = -84 + i * 22; const sway = Math.sin(lf * 0.045 + i) * 5; const tip = 96 + sway;
            return <path key={i} d={`M 76 176 Q ${76 + Math.cos(a * Math.PI / 180) * (54 + sway)} ${96 - i * 4} ${76 + Math.cos(a * Math.PI / 180) * (tip)} ${40 + (i % 2) * 16}`} stroke={i % 2 ? LEAF : "#2E5540"} strokeWidth={11} strokeLinecap="round" fill="none" />;
          })}
          <path d="M 44 176 L 108 176 L 100 236 L 52 236 Z" fill="#C9B254" opacity={0.9} />
          <rect x={40} y={170} width={72} height={13} rx={4} fill="#A98F3C" />
        </svg>
      </div>

      {/* ===== minimalist pendant light over the meter ===== */}
      <div style={{ position: "absolute", left: TX - 1, top: 0, width: 2, height: 96, background: "linear-gradient(180deg,#B8AC90,#8C8060)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: TX - 40, top: 92, width: 80, height: 44, zIndex: 3 }}>
        <svg viewBox="0 0 80 44" width={80} height={44}>
          <path d="M 12 4 L 68 4 L 78 40 L 2 40 Z" fill="#2C2A25" />
          <path d="M 12 4 L 68 4 L 70 12 L 10 12 Z" fill="#3C3A33" />
          <ellipse cx={40} cy={40} rx={40} ry={7} fill="#F6E4A8" opacity={0.9} />
        </svg>
      </div>
      <SpotCone x={TX} top={128} topW={64} botW={470} h={560} color={"rgba(244,224,158,0.36)"} sway={3} lf={lf} pool={0.0} />
      <div style={{ position: "absolute", left: TX - 70, top: 118, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(246,228,168,0.5), rgba(246,228,168,0) 70%)", opacity: glow, zIndex: 2 }} />

      {/* dust motes */}
      {Array.from({ length: 7 }).map((_, i) => {
        const r = seed(i * 2.7 + 3); const yy = ((lf * (0.16 + r * 0.32) + seed(i * 6.1) * 520) % 520) + 150;
        const xx = 300 + seed(i * 3.3 + 5) * 360 + Math.sin(lf * 0.03 + i) * 12; const rr = 1.2 + seed(i * 1.9) * 1.8;
        const op = (0.1 + seed(i * 4.4) * 0.16) * (0.6 + 0.4 * Math.sin(lf * 0.05 + i));
        return <div key={`d${i}`} style={{ position: "absolute", left: xx, top: yy, width: rr * 2, height: rr * 2, borderRadius: "50%", background: "#F2E1A6", opacity: op, zIndex: 4 }} />;
      })}

      {/* floor pool */}
      <div style={{ position: "absolute", left: TX - 260, top: 560, width: 520, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.06), rgba(0,0,0,0) 66%)", zIndex: 5 }} />

      {/* red tension aura behind the meter */}
      <div style={{ position: "absolute", left: TX - 190, top: 250, width: 380, height: 420, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,59,43,${0.28 * auraOp}), rgba(210,59,43,0) 66%)`, transform: `scale(${1 + Math.sin(lf * 0.18) * 0.05 * (climbing ? 1 : 0)})`, zIndex: 6 }} />

      {/* rising red '$' dread motes */}
      {redT > 0.06 && redT < 0.97 && Array.from({ length: 6 }).map((_, i) => {
        const life = 42; const t = ((lf + seed(i * 9) * life) % life) / life;
        const sx = TX - 130 + i * 44 + Math.sin(lf / 12 + i) * 12; const sy = 500 - t * 260;
        const o = Math.sin(t * Math.PI) * 0.4 * redT;
        return <div key={`dol${i}`} style={{ position: "absolute", left: sx, top: sy, fontFamily: S, fontWeight: 900, fontSize: 20 + seed(i) * 10, color: HOT, opacity: o, textShadow: "0 0 8px rgba(210,59,43,0.4)", zIndex: 7 }}>$</div>;
      })}

      {/* ===== THE MONEY METER: bulb + tube ===== */}
      <div style={{ position: "absolute", left: TX - BULB_R, top: BULB_CY - BULB_R, width: BULB_R * 2, height: BULB_R * 2, borderRadius: "50%", background: "linear-gradient(160deg,#FFFDF7,#EDE6D6)", border: `4px solid ${GLINE}`, boxShadow: "0 16px 30px -14px rgba(0,0,0,0.4), inset 0 4px 10px rgba(255,255,255,0.7)", zIndex: 9 }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: (BULB_R - 14) * 2, height: (BULB_R - 14) * 2, marginLeft: -(BULB_R - 14), marginTop: -(BULB_R - 14), borderRadius: "50%", background: `radial-gradient(circle at 40% 34%, ${fillHotL}, ${fillHot} 62%, ${lerpHex(HOTD, GREYc, skip)} 100%)`, boxShadow: `0 0 ${22 * auraOp}px rgba(210,59,43,${0.7 * auraOp})`, transform: `scale(${1 - drain * 0.18})` }}>
          <div style={{ position: "absolute", left: "26%", top: "20%", width: "26%", height: "20%", borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: TX - TUBE_HW, top: BODY_TOP, width: TUBE_HW * 2, height: BODY_H + 26, borderRadius: "54px 54px 30px 30px", background: "linear-gradient(180deg, rgba(255,253,247,0.82), rgba(238,231,217,0.7))", border: `4px solid ${GLINE}`, boxShadow: "inset 0 3px 10px rgba(255,255,255,0.7), inset 0 -8px 18px rgba(0,0,0,0.08), 0 16px 34px -16px rgba(0,0,0,0.4)", overflow: "hidden", zIndex: 10 }}>
        <div style={{ position: "absolute", left: (TUBE_HW * 2 - COL_W) / 2, bottom: 0, width: COL_W, height: bodyFillH + 40, borderRadius: "16px 16px 0 0", background: `linear-gradient(180deg, ${fillHotL} 0%, ${fillHot} 24%, ${lerpHex(HOTD, GREYc, skip)} 100%)`, boxShadow: `0 0 ${18 * auraOp}px rgba(210,59,43,${0.6 * auraOp})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, borderRadius: 8, background: `linear-gradient(180deg, ${fillHotL}, rgba(255,255,255,0))` }} />
          <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 10, borderRadius: 6, background: "rgba(255,255,255,0.28)" }} />
        </div>
        {[0.25, 0.5, 0.75].map((q, i) => {
          const ty = (BODY_H + 26) - q * BODY_H; const passed = fillFrac >= q;
          return <div key={`tk${i}`} style={{ position: "absolute", left: 8, right: 8, top: ty, height: 3, borderRadius: 2, background: passed ? "rgba(255,255,255,0.7)" : "rgba(90,70,50,0.16)" }} />;
        })}
        <div style={{ position: "absolute", left: 12, top: 10, bottom: 10, width: 12, borderRadius: 8, background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08))" }} />
      </div>

      {/* ===== ticking $ number on a price tag ===== */}
      <div style={{ position: "absolute", left: TX + TUBE_HW + 22, top: Math.max(150, tagCrestY), transform: `translateY(-50%) scale(${tagScale})`, transformOrigin: "0% 50%", zIndex: 18 }}>
        <div style={{ position: "absolute", left: -13, top: "50%", marginTop: -12, width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderRight: `14px solid ${skip > 0.3 ? "#EFEBE1" : "#FFFFFF"}` }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "10px 22px 12px", borderRadius: 18, background: skip > 0.3 ? "#EFEBE1" : "#FFFFFF", border: `2px solid ${skip > 0.3 ? GREYLc : "#EFE7D6"}`, boxShadow: `0 18px 36px -16px rgba(0,0,0,0.5)${auraOp > 0.1 ? `, 0 0 ${26 * auraOp}px rgba(210,59,43,0.4)` : ""}` }}>
          <span style={{ fontFamily: F, fontWeight: 900, fontSize: 16, letterSpacing: "0.24em", color: SUB, opacity: 1 - skip * 0.4 }}>TOTAL DUE</span>
          <div style={{ position: "relative", marginTop: 2 }}>
            <span style={{ fontFamily: S, fontWeight: 900, fontSize: 88, lineHeight: 1, color: lerpHex(HOT, GREYc, skip * 0.85), letterSpacing: "-0.02em", textShadow: skip < 0.4 ? "0 4px 26px rgba(210,59,43,0.3)" : "none" }}>${valStepped.toLocaleString("en-US")}</span>
            <div style={{ position: "absolute", left: -6, right: -6, top: "54%", height: 8, borderRadius: 5, background: GREEN, transform: `scaleX(${strike})`, transformOrigin: "0% 50%", boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }} />
          </div>
        </div>
      </div>

      {/* ===== two supporting chips, upper-left ===== */}
      <div style={{ position: "absolute", left: 158, top: 300, transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: 20, zIndex: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 20px", borderRadius: 16, background: PAPER, border: `1.5px solid ${PLINE}`, boxShadow: "0 14px 26px -14px rgba(0,0,0,0.4)", opacity: Math.min(1, chip1 * 1.3) * (1 - skip * 0.5), transform: `translateY(${(1 - chip1) * 22 + bob(lf, 2.4, 108, 0)}px) scale(${Math.min(1, chip1)})`, transformOrigin: "0% 50%" }}>
          <svg width={30} height={30} viewBox="0 0 30 30">
            <rect x={2} y={5} width={26} height={23} rx={4} fill="#FFFDF8" stroke={PLINE} strokeWidth={1.5} />
            <rect x={2} y={5} width={26} height={8} rx={4} fill={HOT} />
            <rect x={8} y={2} width={3} height={7} rx={1.5} fill="#6B6455" />
            <rect x={19} y={2} width={3} height={7} rx={1.5} fill="#6B6455" />
            <rect x={7} y={17} width={5} height={5} rx={1} fill={HOT} opacity={0.75} />
            <rect x={18} y={17} width={5} height={5} rx={1} fill="#C9C0AC" />
          </svg>
          <span style={{ fontFamily: F, fontWeight: 900, fontSize: 24, color: "#2A2620", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>3 WEEKS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 20px", borderRadius: 16, background: PAPER, border: `1.5px solid ${PLINE}`, boxShadow: "0 14px 26px -14px rgba(0,0,0,0.4)", opacity: Math.min(1, chip2 * 1.3) * (1 - skip * 0.5), transform: `translateY(${(1 - chip2) * 22 + bob(lf, 2.4, 108, 0.5)}px) scale(${Math.min(1, chip2)})`, transformOrigin: "0% 50%" }}>
          <svg width={30} height={30} viewBox="0 0 30 30" style={{ transform: `rotate(${lf * 2.2}deg)` }}>
            <path d="M15 5 A10 10 0 1 1 6.5 9.8" fill="none" stroke={CLAY} strokeWidth={3.2} strokeLinecap="round" />
            <path d="M15 1.5 L15 8.5 L9.5 5 Z" fill={CLAY} />
          </svg>
          <span style={{ fontFamily: F, fontWeight: 900, fontSize: 24, color: "#2A2620", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>×3 REVISIONS</span>
        </div>
      </div>

      {/* ===== sweaty panicked founder, LOWER-LEFT ===== */}
      <div style={{ position: "absolute", left: 70, bottom: 18, width: 176, height: 176, zIndex: 20, transformOrigin: "50% 100%", transform: `rotate(${-shockNow * 6 + tremble}deg) translate(${-redT * 5}px, ${-shockNow * 5}px)`, filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.32))" }}>
        <Mascot lf={lf} size={176} shock={shockNow * (1 - skip * 0.9)} cheer={relief * 0.7} stern={0.05} nodAmp={2 + jaw * 3} nodSpeed={9} gaze={1.3} />
      </div>
      {/* dropped-jaw accent */}
      {jaw > 0.05 && (
        <div style={{ position: "absolute", left: 146, top: 692, width: 22 * jaw, height: 28 * jaw, borderRadius: "50%", background: "#3A1210", boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.5)", zIndex: 21, opacity: Math.min(1, jaw * 1.4) }} />
      )}
      {/* sweat droplets flying off, count scales with redT */}
      {shockNow > 0.12 && skip < 0.6 && Array.from({ length: sweatN }).map((_, i) => {
        const r = seed(i * 5.3 + 2); const r2 = seed(i * 2.1 + 9);
        const life = Math.max(14, 34 - redT * 14);
        const t = (((lf * (0.9 + redT * 0.8)) + r * life) % life) / life;
        const dir = i % 2 ? 1 : -1;
        const originX = 158 + (r2 - 0.5) * 74;
        const originY = 598 + r * 40;
        const bx = originX + dir * (t * (42 + redT * 60));
        const by = originY - Math.sin(t * Math.PI) * (30 + redT * 34) + t * 44;
        const o = Math.sin(t * Math.PI) * Math.min(1, shockNow * 1.25);
        const sz = 6 + r * 4;
        return <div key={`sw${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz * 1.4, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "linear-gradient(180deg,#BFE2FF,#6FA8DE)", opacity: o * 0.92, transform: `rotate(${dir * 8}deg)`, boxShadow: "0 0 6px rgba(120,180,235,0.55)", zIndex: 22 }} />;
      })}
      {/* relief waft when skipping */}
      {relief > 0.3 && Array.from({ length: 3 }).map((_, i) => {
        const t = ((lf * 1.1 + i * 16) % 46) / 46; const wx = 150 + i * 12 + Math.sin(lf * 0.2 + i) * 8; const wy = 598 - t * 60;
        return <div key={`rf${i}`} style={{ position: "absolute", left: wx, top: wy, width: 9, height: 9, borderRadius: "50%", border: `2px solid ${GREEN}`, opacity: Math.sin(t * Math.PI) * 0.5 * relief, zIndex: 21 }} />;
      })}

      {/* bursts */}
      <Sparkles lf={lf} at={(landF - 2) / 30} x={TX} y={BODY_TOP + 20} n={16} spread={220} colors={[HOT, "#F2A79E", "#FFFFFF"]} dur={0.7} />
      <Sparkles lf={lf} at={3.45} x={TX + 40} y={390} n={14} spread={260} colors={[GREEN, "#7FE0B0", "#FFFFFF"]} dur={0.8} />

      {/* ===== red edge-glow vignette, strength scales with redT ===== */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 74% at 50% 46%, rgba(210,59,43,0) 42%, rgba(210,59,43,${0.52 * redT}) 100%)`, zIndex: 34, pointerEvents: "none" }} />
      {/* red pulse near the top of the climb */}
      {redPulse > 0.01 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 92% 86% at 50% 46%, rgba(210,59,43,0.34), rgba(210,59,43,0) 70%)", opacity: redPulse, zIndex: 35, pointerEvents: "none" }} />}

      <Vignette strength={0.5} shape="74% 70% at 50% 44%" />
      <Grain op={0.05} />
    </>
  );

  // ---- diagonal cut geometry (line from (0,470) to (1012,300)) ----
  const splitOn = split > 0.002;
  const off = split * 44;
  const clipTop = "polygon(0px 0px, 1012px 0px, 1012px 300px, 0px 470px)";
  const clipBot = "polygon(0px 470px, 1012px 300px, 1012px 792px, 0px 792px)";

  return (
    <>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translate(${shake}px, ${shake * 0.3}px) scale(${1 + slam * 0.014})`, transformOrigin: "50% 44%" }}>
        {/* scene, whole or split in half along the katana cut */}
        {!splitOn ? (
          <div style={{ position: "absolute", inset: 0 }}>{stage}</div>
        ) : (
          <>
            <div style={{ position: "absolute", inset: 0, clipPath: clipTop, transform: `translate(${-off * 0.55}px, ${-off}px)` }}>{stage}</div>
            <div style={{ position: "absolute", inset: 0, clipPath: clipBot, transform: `translate(${off * 0.55}px, ${off}px)` }}>{stage}</div>
            {/* glowing cut edge */}
            <div style={{ position: "absolute", left: 506, top: 385, width: 1060, height: 5, transform: "translate(-50%,-50%) rotate(-9.5deg)", background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, #EAF4FF 12%, #FFFFFF 50%, #CFE6FF 88%, rgba(255,255,255,0) 100%)", boxShadow: "0 0 16px rgba(180,220,255,0.9), 0 0 34px rgba(120,180,255,0.55)", opacity: cutOp, zIndex: 47, pointerEvents: "none" }} />
          </>
        )}

        {/* ===== katana light-sweep (corner to corner, 4-6 frames) ===== */}
        {slash > 0.001 && slash < 0.999 && (
          <div style={{ position: "absolute", left: 0, top: 470, width: 1026, height: 0, transformOrigin: "0% 0%", transform: "rotate(-9.5deg)", zIndex: 49, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: 0, top: -3, width: 1026, height: 6, transform: `scaleX(${slash})`, transformOrigin: "0% 50%", background: "linear-gradient(90deg,#FFFFFF,#DCEBFF)", boxShadow: "0 0 20px rgba(200,230,255,0.95), 0 0 40px rgba(150,200,255,0.7)", borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 1026 * slash - 11, top: -11, width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle,#FFFFFF,rgba(200,230,255,0))" }} />
          </div>
        )}

        {/* ===== NINJA dashing across on the diagonal ===== */}
        {ninjaVis && (
          <div style={{ position: "absolute", left: nx, top: ny, width: 160, height: 160, transform: `translate(-50%,-50%) rotate(-14deg)`, zIndex: 50, pointerEvents: "none" }}>
            {/* motion-blur ghosts trailing back */}
            {[3, 2, 1].map((g) => (
              <div key={`g${g}`} style={{ position: "absolute", left: g * 20, top: g * 6, width: 90, height: 90, borderRadius: "50% 50% 50% 50% / 60% 60% 45% 45%", background: NB, opacity: 0.1 * g, filter: "blur(2px)" }} />
            ))}
            <svg width={160} height={160} viewBox="0 0 160 160" style={{ overflow: "visible", filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
              {/* speed lines */}
              <path d="M8 116 L58 96" stroke="rgba(255,255,255,0.5)" strokeWidth={3} strokeLinecap="round" />
              <path d="M2 132 L46 118" stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeLinecap="round" />
              {/* rear leg */}
              <path d="M70 96 Q56 118 44 140 L60 146 Q74 122 84 104 Z" fill={NB} />
              {/* front leg */}
              <path d="M84 96 Q100 108 120 110 L122 124 Q94 126 74 108 Z" fill={NB} />
              {/* rear arm trailing */}
              <path d="M62 70 Q44 78 32 96 L44 104 Q58 88 72 82 Z" fill={NB} />
              {/* torso */}
              <path d="M58 58 Q92 48 102 82 Q106 106 78 110 Q52 110 52 84 Q52 66 58 58 Z" fill={NB} />
              {/* head */}
              <circle cx="86" cy="46" r="21" fill={NB} />
              {/* mask lower */}
              <path d="M70 50 Q86 62 104 52 Q102 66 86 68 Q72 66 70 50 Z" fill={NB} />
              {/* headband (iconic red) */}
              <path d="M65 40 Q86 29 108 40 L106 51 Q86 42 67 51 Z" fill={HOT} />
              {/* headband tails trailing lower-left */}
              <path d="M66 46 Q40 52 20 72 Q34 64 46 68 Q30 76 18 90 Q40 74 58 62 Z" fill={HOT} />
              {/* eye slit */}
              <rect x="80" y="43" width="20" height="5" rx="2.5" fill="#C9D2DA" transform="rotate(-8 90 46)" />
              {/* front arm to grip */}
              <path d="M92 68 Q108 66 120 56 L126 64 Q112 78 96 80 Z" fill={NB} />
              {/* katana handle + guard */}
              <rect x="112" y="52" width="20" height="8" rx="2" transform="rotate(-42 122 56)" fill="#1B1917" />
              <rect x="124" y="44" width="5" height="18" rx="2" transform="rotate(-42 126 53)" fill="#2A2723" />
              {/* katana blade (steel) */}
              <path d="M128 42 L156 8 L162 14 L136 50 Z" fill={STEEL} stroke={STEELD} strokeWidth={1} />
              <path d="M131 44 L156 12" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
      {/* red flash pattern-interrupt when the meter slams to max */}
      {redFlash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 82% 78% at 50% 50%, rgba(210,59,43,0.42), rgba(210,59,43,0) 68%)", opacity: redFlash, zIndex: 40, pointerEvents: "none" }} />}
    </>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const PAPER = "#F1EADB", PAPD = "#DED2BB", BILLINK = "#8A2E27", ROW = "rgba(30,22,16,0.5)";

  // ============================ CHAPTER 4 - "SKIP IT, OVERNIGHT" (83f) ============================
  // A (f2-18): founder RIPS the $4,000 invoice clean in half, torn-paper bursts, relief
  // B (f16-58): NIGHT nook - founder pulls on a nightcap + DOZES with Zzz while the repo works:
  //             an 8-bit speedrun progress bar zips to 100%, brand assets self-assemble on the monitor
  // C (f56-83): morning ping - a "$0 done" green check + DONE! badge

  // ---- night mood deepens a touch as they nod off ----
  const nightP = over(lf, 10, 16);

  // ---- A: rip the invoice in half ----
  const tear = over(lf, 5, 6, Easing.out(Easing.cubic));       // seam splits
  const fall = over(lf, 9, 9, Easing.in(Easing.cubic));        // halves flung down/off
  const invShow = fall < 0.99 && lf < 20;
  const preShake = (lf >= 2 && lf < 6) ? Math.sin(lf * 4.4) * 5 : 0;
  const ripFlash = (lf >= 5 && lf < 9) ? 1 - (lf - 5) / 4 : 0;
  const invW = 316, invH = 292, invCY = 372;

  // ---- B: dozing + costume ----
  const capOn = over(lf, 16, 7, Easing.out(Easing.back(2)));   // nightcap drops on
  const dozeP = over(lf, 20, 10);                              // slumps into sleep
  const relief = over(lf, 10, 6) * (1 - dozeP * 0.7);          // brief relief smile
  const breathe = Math.sin(lf / 9) * dozeP;                    // sleepy head bob
  const leanRot = dozeP * 8;

  // ---- B: monitor generation (the repo working) ----
  const genLive = lf >= 22;
  const barP = over(lf, 24, 30, Easing.out(Easing.cubic));     // hits 100% ~f54
  const pct = Math.round(Math.min(1, barP) * 100);
  const done = pct >= 100;
  // 8-bit speedrun timer racing then locking to DONE
  const secs = Math.min(999, Math.floor(over(lf, 24, 30) * 480));
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const logLines = [
    { t: 0.02, s: "$ claude brand init", c: "#7FB3E8" },
    { t: 0.24, s: "> forging logo mark", c: "rgba(200,210,230,0.82)" },
    { t: 0.52, s: "> locking 5 color codes", c: "rgba(200,210,230,0.82)" },
    { t: 0.99, s: "✓ brand kit ready", c: "#6FD3A0" },
  ];
  // brand assets self-assembling on the preview side
  const assetPop = (thresh: number) => over(lf, 24 + thresh * 30, 4, Easing.out(Easing.back(2)));

  // ---- C: morning ping ----
  const resP = Math.min(1.05, spr(lf, 58, 12, 220));
  const showRes = resP > 0.02;
  const checkP = over(lf, 61, 8);
  const zeroP = over(lf, 63, 6, Easing.out(Easing.back(2)));
  const ping = over(lf, 58, 20);
  const donePop = over(lf, 55, 6, Easing.out(Easing.back(2.4)));

  // pixel-moon travel + lamp flicker
  const moonBob = Math.sin(lf / 40) * 5;
  const lampFlick = 0.9 + Math.sin(lf / 5) * 0.05 + Math.sin(lf / 1.7) * 0.02;

  // ---- shared invoice body (rendered inside each torn half) ----
  const invBody = () => (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 60, background: `linear-gradient(180deg, ${BILLINK}, #732019)`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#F4EFE4", letterSpacing: 1 }}>INVOICE</span>
        <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(244,239,228,0.75)" }}>#BR-1042</span>
      </div>
      <div style={{ position: "absolute", left: 20, top: 70, fontFamily: inter.fontFamily, fontSize: 13, color: "rgba(30,22,16,0.55)", fontWeight: 600 }}>Brand Studio Co. · due on receipt</div>
      {[["Logo design", "$1,500"], ["Color system", "$600"], ["Font pairing", "$400"], ["Social banners", "$900"], ["5 brand styles", "$600"]].map((r, i) => (
        <div key={i} style={{ position: "absolute", left: 20, right: 20, top: 104 + i * 30, height: 26, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px dashed ${ROW}` }}>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 16, color: "#2A2018", fontWeight: 500 }}>{r[0]}</span>
          <span style={{ fontFamily: mono, fontSize: 16, color: "#2A2018", fontWeight: 600 }}>{r[1]}</span>
        </div>
      ))}
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 18, height: 50, borderRadius: 10, background: "rgba(138,46,39,0.1)", border: `2px solid ${BILLINK}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 16, fontWeight: 800, color: BILLINK, letterSpacing: 1 }}>AMOUNT DUE</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: BILLINK }}>$4,000</span>
      </div>
    </>
  );

  return (
    <>
      {/* ============================ SET: cozy moonlit bedroom nook ============================ */}
      {/* back wall - warm-navy night */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 96% at 30% 30%, #1A2540 0%, #121B33 46%, #0A1024 100%)" }} />
      {/* deeper night wash rolls in as they doze */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(130% 100% at 78% 8%, rgba(46,66,120,0.55), rgba(12,18,38,0.6) 54%, rgba(6,9,20,0.85))", opacity: nightP }} />
      {/* subtle wall wainscot line + skirting for room depth */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 2, background: "rgba(150,175,225,0.08)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 172, background: "linear-gradient(180deg, rgba(8,12,26,0), rgba(8,12,26,0.55))" }} />

      {/* --- WINDOW (upper-right) with the moon + stars --- */}
      <div style={{ position: "absolute", left: 690, top: 118, width: 274, height: 300, borderRadius: "14px 14px 6px 6px", background: "linear-gradient(180deg, #24345E 0%, #1A2748 55%, #141F3C 100%)", border: "9px solid #2A3350", boxShadow: "inset 0 0 44px rgba(120,150,225,0.18), 0 14px 34px -14px rgba(0,0,0,0.7)", overflow: "hidden", zIndex: 2 }}>
        {/* stars in the pane */}
        {Array.from({ length: 16 }).map((_, i) => {
          const r = seed(i * 2.7 + 3);
          const sx = 14 + seed(i * 1.4) * 244; const sy = 12 + seed(i * 3.3 + 1) * 220;
          const tw = 0.3 + Math.abs(Math.sin(lf / 6 + i * 1.9)) * 0.7; const s = 2 + Math.round(r * 2) * 2;
          // square (8-bit) stars
          return <div key={`ws${i}`} style={{ position: "absolute", left: sx, top: sy, width: s, height: s, background: "#F4F7FF", opacity: tw * (0.6 + nightP * 0.4), boxShadow: `0 0 5px rgba(220,232,255,${tw})` }} />;
        })}
        {/* the moon */}
        <div style={{ position: "absolute", left: 150, top: 30 + moonBob, width: 92, height: 92 }}>
          <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "radial-gradient(circle, rgba(214,228,255,0.5), transparent 66%)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FBF7EA, #DCE2F2 60%, #B4BCDC)", boxShadow: "0 0 30px rgba(206,220,255,0.6), inset -9px -9px 18px rgba(120,132,170,0.5)" }} />
          <div style={{ position: "absolute", left: 24, top: 30, width: 15, height: 15, borderRadius: "50%", background: "rgba(150,160,196,0.5)" }} />
          <div style={{ position: "absolute", left: 54, top: 52, width: 10, height: 10, borderRadius: "50%", background: "rgba(150,160,196,0.45)" }} />
          <div style={{ position: "absolute", left: 40, top: 20, width: 7, height: 7, borderRadius: "50%", background: "rgba(150,160,196,0.4)" }} />
        </div>
        {/* mullions */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 8, marginLeft: -4, background: "#2A3350" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 8, marginTop: -4, background: "#2A3350" }} />
      </div>
      {/* moonlight shaft spilling from the window onto the desk */}
      <div style={{ position: "absolute", left: 470, top: 150, width: 430, height: 560, transform: "rotate(9deg)", transformOrigin: "80% 0%", background: "linear-gradient(180deg, rgba(170,196,255,0.16), rgba(170,196,255,0) 70%)", opacity: 0.5 + nightP * 0.4, filter: "blur(5px)", zIndex: 2, pointerEvents: "none" }} />

      {/* --- drifting dust motes / bokeh --- */}
      {Array.from({ length: 16 }).map((_, i) => {
        const r = seed(i * 3.3 + 2);
        const ox = 40 + seed(i * 1.7) * 930 + Math.sin(lf / 46 + i) * 20;
        const span = 700; const oy = ((lf * (0.14 + seed(i * 2.1) * 0.32) + seed(i * 5.3) * span) % span) + 30;
        const sz = 3 + r * 5; const warm = r > 0.66;
        const c = warm ? "rgba(231,178,76,0.5)" : "rgba(150,185,255,0.45)";
        const op = (0.18 + r * 0.36) * (0.55 + 0.45 * Math.sin(lf / 12 + i));
        return <div key={`bk${i}`} style={{ position: "absolute", left: ox, top: oy, width: sz, height: sz, borderRadius: "50%", background: c, opacity: op, boxShadow: `0 0 ${sz * 2}px ${c}`, zIndex: 3 }} />;
      })}

      {/* --- DESK ledge across the lower third --- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 612, height: 180, background: "linear-gradient(180deg, #3A2A20 0%, #2C1F17 40%, #201610 100%)", boxShadow: "inset 0 3px 0 rgba(255,214,160,0.14), 0 -12px 30px -10px rgba(0,0,0,0.5)", zIndex: 12 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 610, height: 3, background: "rgba(255,205,150,0.28)", zIndex: 12 }} />

      {/* --- warm DESK LAMP arcing in from the left --- */}
      <div style={{ position: "absolute", left: 70, top: 250, width: 150, height: 380, zIndex: 13 }}>
        {/* arm */}
        <div style={{ position: "absolute", left: 8, top: 130, width: 12, height: 240, background: "#26303F", borderRadius: 6, transformOrigin: "50% 100%", transform: "rotate(9deg)" }} />
        <div style={{ position: "absolute", left: 8, top: 118, width: 118, height: 12, background: "#26303F", borderRadius: 6, transformOrigin: "0% 50%", transform: "rotate(24deg)" }} />
        {/* shade */}
        <div style={{ position: "absolute", left: 96, top: 150, width: 70, height: 46, borderRadius: "40% 40% 8px 8px", background: "linear-gradient(180deg,#33404F,#1F2733)", transform: "rotate(24deg)", boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.4)" }} />
        {/* bulb glow */}
        <div style={{ position: "absolute", left: 108, top: 188, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle, #FFE9B0, #E7B24C)", opacity: lampFlick, boxShadow: `0 0 34px rgba(231,178,76,${lampFlick})` }} />
      </div>
      {/* warm light POOL cast on desk + wall */}
      <SpotCone x={168} top={280} topW={80} botW={430} h={430} color={"rgba(255,206,120,0.5)"} sway={2} lf={lf} />
      <div style={{ position: "absolute", left: -40, top: 300, width: 520, height: 460, background: "radial-gradient(60% 60% at 34% 60%, rgba(255,196,110,0.20), transparent 70%)", opacity: lampFlick, zIndex: 4, pointerEvents: "none" }} />

      {/* --- desk props: mug w/ steam + little plant + book stack --- */}
      {/* mug (right of monitor) */}
      <div style={{ position: "absolute", left: 792, top: 600, width: 62, height: 58, zIndex: 20 }}>
        <div style={{ position: "absolute", left: 0, top: 6, width: 52, height: 52, borderRadius: "10px 10px 16px 16px", background: "linear-gradient(180deg,#C9522E,#9B3A1E)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.2)" }} />
        <div style={{ position: "absolute", left: 46, top: 18, width: 20, height: 24, borderRadius: "0 50% 50% 0", border: "6px solid #9B3A1E", borderLeft: "none" }} />
        {/* steam */}
        {[0, 1, 2].map((i) => { const t = ((lf * 2.2 + i * 22) % 66) / 66; return <div key={i} style={{ position: "absolute", left: 16 + i * 12 + Math.sin(lf / 7 + i) * 5, top: 6 - t * 40, width: 6, height: 6, borderRadius: "50%", background: "rgba(255,240,220,0.5)", opacity: (1 - t) * 0.7 }} />; })}
      </div>
      {/* potted plant (far right) */}
      <div style={{ position: "absolute", left: 908, top: 560, width: 78, height: 100, zIndex: 20 }}>
        <div style={{ position: "absolute", left: 16, top: 66, width: 46, height: 40, borderRadius: "6px 6px 12px 12px", background: "linear-gradient(180deg,#8A5A38,#5E3A22)" }} />
        {[[-18, -6, -20], [0, -18, 0], [18, -8, 20]].map((p, i) => (
          <div key={i} style={{ position: "absolute", left: 30 + p[0], top: 34 + p[1] + Math.sin(lf / 22 + i) * 2, width: 18, height: 44, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: "linear-gradient(180deg,#4C8A5A,#2F6640)", transformOrigin: "50% 100%", transform: `rotate(${p[2]}deg)` }} />
        ))}
      </div>
      {/* book stack (left, under lamp) */}
      {[["#3E6B8A", 8], ["#8A5A3E", -6], ["#6B4A7A", 4]].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: 42 + Number(b[1]), top: 640 + i * 16, width: 132, height: 16, borderRadius: 3, background: b[0] as string, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.14), 0 2px 4px rgba(0,0,0,0.3)", zIndex: 19 }} />
      ))}

      {/* ============================ MONITOR: the repo working overnight ============================ */}
      <div style={{ position: "absolute", left: cx - 246, top: 356, width: 492, height: 258, zIndex: 15 }}>
        {/* bezel */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "linear-gradient(160deg,#20262F,#12161D)", border: "3px solid #2A323E", boxShadow: "0 28px 56px -22px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px rgba(120,160,235,0.12)" }} />
        {/* screen */}
        <div style={{ position: "absolute", left: 12, top: 12, right: 12, bottom: 12, borderRadius: 10, background: "linear-gradient(165deg,#0E131C,#090C14)", overflow: "hidden", boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)" }}>
          {/* screen glow reflection */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg, rgba(120,170,235,0.08), transparent 40%)" }} />
          {/* title bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 32, background: "linear-gradient(180deg,#161C28,#111621)", borderBottom: "1px solid #232B39", display: "flex", alignItems: "center", paddingLeft: 13, gap: 7 }}>
            {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            <span style={{ marginLeft: 8, fontFamily: mono, fontSize: 13, color: "rgba(180,196,226,0.55)" }}>claude — brand studio</span>
            {/* 8-bit speedrun timer */}
            <span style={{ marginLeft: "auto", marginRight: 12, fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 1, color: done ? "#6FD3A0" : "#E7B24C", textShadow: done ? "0 0 8px rgba(111,211,160,0.6)" : "0 0 8px rgba(231,178,76,0.5)" }}>{done ? "DONE" : `${mm}:${ss}`}</span>
          </div>

          {/* LEFT: terminal log */}
          <div style={{ position: "absolute", left: 16, top: 44, width: 232 }}>
            {logLines.map((ln, i) => { const on = genLive && barP >= ln.t - 0.001; const ap = on ? Math.min(1, (barP - ln.t) * 12 + 0.25) : 0; return (
              <div key={i} style={{ fontFamily: mono, fontSize: 15, color: ln.c, opacity: ap, marginBottom: 8, transform: `translateX(${(1 - ap) * -8}px)`, whiteSpace: "nowrap", textShadow: ln.c[0] === "#" ? `0 0 9px ${ln.c}55` : "none" }}>{ln.s}</div>); })}
            {genLive && !done && lf % 18 < 9 && <span style={{ fontFamily: mono, fontSize: 15, color: "#6FD3A0" }}>█</span>}
            {!genLive && <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(120,140,175,0.6)" }}>$ _</span>}
          </div>

          {/* RIGHT: brand assets self-assembling */}
          <div style={{ position: "absolute", right: 16, top: 44, width: 168, height: 118 }}>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "rgba(150,175,220,0.5)" }}>BRAND KIT</span>
            {/* logo tile */}
            <div style={{ position: "absolute", left: 0, top: 22, width: 40, height: 40, borderRadius: 9, background: "#0D1117", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${assetPop(0.14)})`, boxShadow: "0 0 12px rgba(120,160,235,0.25)" }}>
              <ClaudeMark size={24} />
            </div>
            {/* swatch row */}
            <div style={{ position: "absolute", left: 52, top: 22, display: "flex", gap: 6 }}>
              {GEMS5.map((c, i) => { const dp = assetPop(0.34 + i * 0.03); return <div key={i} style={{ width: 18, height: 40, borderRadius: 5, background: c, transform: `scaleY(${dp})`, transformOrigin: "50% 0%", boxShadow: `0 0 8px ${c}88` }} />; })}
            </div>
            {/* font pair tile */}
            <div style={{ position: "absolute", left: 0, top: 72, width: 92, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transform: `scale(${assetPop(0.62)})` }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#EDE6D6" }}>Aa</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "rgba(190,205,235,0.7)" }}>Aa</span>
            </div>
            {/* banner bar */}
            <div style={{ position: "absolute", left: 100, top: 72, width: 68, height: 34, borderRadius: 8, background: `linear-gradient(120deg, ${CLAY}, ${GEMS5[2]})`, transform: `scale(${assetPop(0.82)})`, boxShadow: "0 0 10px rgba(217,119,87,0.35)" }} />
          </div>

          {/* progress bar - chunky 8-bit segments */}
          <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, height: 18 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#141B28", border: "1.5px solid #2A3446", display: "flex", gap: 3, padding: 3, overflow: "hidden" }}>
              {Array.from({ length: 20 }).map((_, i) => { const lit = pct >= (i + 0.5) * 5; return <div key={i} style={{ flex: 1, borderRadius: 2, background: lit ? "linear-gradient(180deg,#7FE0AC,#2F8F65)" : "rgba(255,255,255,0.05)", boxShadow: lit ? "0 0 6px rgba(111,211,160,0.6)" : "none", transition: "none" }} />; })}
            </div>
            <span style={{ position: "absolute", right: 2, top: -24, fontFamily: mono, fontSize: 17, fontWeight: 700, color: done ? "#6FD3A0" : "#CFE0F5", textShadow: "0 0 9px rgba(111,211,160,0.4)" }}>{pct}%</span>
          </div>
        </div>
        {/* monitor stand */}
        <div style={{ position: "absolute", left: "50%", bottom: -30, width: 60, height: 30, marginLeft: -30, background: "linear-gradient(180deg,#232A34,#161B22)" }} />
        <div style={{ position: "absolute", left: "50%", bottom: -38, width: 130, height: 12, marginLeft: -65, borderRadius: 6, background: "#1B212A" }} />
      </div>

      {/* ============================ A: the $4,000 INVOICE gets RIPPED IN HALF ============================ */}
      {invShow && (
        <>
          {/* LEFT half */}
          <div style={{ position: "absolute", left: cx - invW / 2 + preShake, top: invCY - invH / 2, width: invW / 2, height: invH, overflow: "hidden", zIndex: 24, transformOrigin: "100% 40%", transform: `translate(${-tear * 26 - fall * 210}px, ${fall * 340}px) rotate(${-tear * 10 - fall * 46}deg)`, borderRadius: "14px 0 0 14px", boxShadow: "0 26px 52px -20px rgba(0,0,0,0.55)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: invW, height: invH, background: `linear-gradient(160deg, ${PAPER}, ${PAPD})`, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, overflow: "hidden" }}>
              {invBody()}
            </div>
            {/* torn right edge */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 8, background: "repeating-linear-gradient(180deg, #EFE7D6 0 9px, #CFC2A8 9px 16px)", opacity: 0.8 }} />
          </div>
          {/* RIGHT half */}
          <div style={{ position: "absolute", left: cx + preShake, top: invCY - invH / 2, width: invW / 2, height: invH, overflow: "hidden", zIndex: 24, transformOrigin: "0% 40%", transform: `translate(${tear * 26 + fall * 220}px, ${fall * 300}px) rotate(${tear * 11 + fall * 52}deg)`, borderRadius: "0 14px 14px 0", boxShadow: "0 26px 52px -20px rgba(0,0,0,0.55)" }}>
            <div style={{ position: "absolute", left: -invW / 2, top: 0, width: invW, height: invH, background: `linear-gradient(160deg, ${PAPER}, ${PAPD})`, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, overflow: "hidden" }}>
              {invBody()}
            </div>
            {/* torn left edge */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "repeating-linear-gradient(180deg, #EFE7D6 0 9px, #CFC2A8 9px 16px)", opacity: 0.8 }} />
          </div>
        </>
      )}
      {/* rip flash along the seam */}
      {ripFlash > 0.02 && <div style={{ position: "absolute", left: cx - 8, top: invCY - invH / 2, width: 16, height: invH, background: "linear-gradient(90deg, transparent, rgba(255,244,230,0.9), transparent)", opacity: ripFlash, zIndex: 25, pointerEvents: "none" }} />}
      {/* torn-paper confetti burst from the seam */}
      {lf >= 5 && lf < 26 && Array.from({ length: 22 }).map((_, i) => {
        const age = lf - 5; const life = 20; const t = age / life; if (t > 1) return null;
        const a = seed(i * 1.7) * Math.PI * 2; const spd = 120 + seed(i * 2.3) * 180;
        const px = cx + Math.cos(a) * spd * t; const py = invCY + Math.sin(a) * spd * t * 0.6 + t * t * 210;
        const s = 6 + seed(i * 3.1) * 12; const rot = seed(i) * 360 + age * (7 + seed(i * 4) * 12);
        const o = Math.max(0, 1 - t); const c = seed(i) > 0.5 ? PAPER : PAPD;
        return <div key={`sh${i}`} style={{ position: "absolute", left: px - s / 2, top: py - s / 2, width: s, height: s * 0.62, background: c, opacity: o, transform: `rotate(${rot}deg)`, borderRadius: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", zIndex: 26 }} />;
      })}

      {/* ============================ C: morning "$0 done" ping ============================ */}
      {ping > 0.02 && ping < 0.99 && (
        <div style={{ position: "absolute", left: cx, top: 250, width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: "50%", border: "3px solid rgba(111,211,160,0.7)", transform: `scale(${1 + ping * 10})`, opacity: (1 - ping) * 0.8, zIndex: 29 }} />
      )}
      {showRes && (
        <div style={{ position: "absolute", left: cx - 232, top: 250 - 62, width: 464, height: 124, transformOrigin: "50% 50%", transform: `scale(${resP})`, opacity: Math.min(1, resP * 1.4), zIndex: 30, borderRadius: 18, background: "linear-gradient(162deg, rgba(22,28,40,0.98), rgba(12,16,26,0.98))", border: "1.5px solid rgba(111,211,160,0.42)", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 42px rgba(111,211,160,0.24), inset 0 1px 0 rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 20px", gap: 16 }}>
          {/* green check draws in */}
          <div style={{ position: "relative", width: 56, height: 56, flex: "0 0 auto" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #4FBE86, #2E8F62)", boxShadow: "0 0 22px rgba(111,211,160,0.6)" }} />
            <svg viewBox="0 0 56 56" width={56} height={56} style={{ position: "absolute", inset: 0 }}>
              <path d="M16 29 L24 38 L41 19" fill="none" stroke="#F3FBF6" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={50} strokeDashoffset={50 * (1 - checkP)} />
            </svg>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#fff" }}>Brand kit ready</span>
              <span style={{ fontFamily: mono, fontSize: 12, color: "rgba(111,211,160,0.9)", padding: "2px 8px", borderRadius: 999, background: "rgba(111,211,160,0.14)", border: "1px solid rgba(111,211,160,0.4)" }}>overnight</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 7, background: "#0D1117", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}><ClaudeMark size={16} /></div>
              {GEMS5.map((c, i) => { const dp = over(lf, 62 + i * 1.5, 4, Easing.out(Easing.back(2))); return <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: c, transform: `scale(${dp})`, boxShadow: `0 0 9px ${c}99`, border: "2px solid rgba(255,255,255,0.85)" }} />; })}
              <span style={{ fontFamily: mono, fontSize: 13, color: "rgba(190,205,235,0.6)", marginLeft: 4 }}>logo · fonts</span>
            </div>
          </div>
          {/* $0 pill */}
          <div style={{ flex: "0 0 auto", transform: `scale(${zeroP})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "7px 16px", borderRadius: 14, background: "linear-gradient(160deg, rgba(63,158,116,0.24), rgba(63,158,116,0.1))", border: "2px solid #4FBE86", boxShadow: "0 0 20px rgba(111,211,160,0.4)" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#8FE7B8", lineHeight: 1, textShadow: "0 0 14px rgba(111,211,160,0.6)" }}>$0</span>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 11, fontWeight: 700, color: "rgba(143,231,184,0.85)", letterSpacing: 1 }}>DONE</span>
          </div>
        </div>
      )}
      {/* pixel DONE! badge popping over the monitor as bar completes */}
      {donePop > 0.02 && !showRes && (
        <div style={{ position: "absolute", left: cx + 150, top: 330, transform: `scale(${donePop}) rotate(-8deg)`, zIndex: 22, fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: "#0C1018", padding: "6px 14px", background: "#6FD3A0", borderRadius: 4, boxShadow: "0 0 18px rgba(111,211,160,0.7), inset 0 0 0 3px rgba(12,16,24,0.15)" }}>DONE!</div>
      )}

      {/* ============================ PROTAGONIST: nightcap mascot dozing at the desk ============================ */}
      <div style={{ position: "absolute", left: 58, bottom: 4, width: 156, height: 200, zIndex: 28, transformOrigin: "50% 100%", transform: `rotate(${leanRot}deg) translateY(${breathe * 3}px)`, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}>
        <Mascot lf={lf} size={148} nodAmp={2 + dozeP * 4} nodSpeed={dozeP > 0.5 ? 4 : 9} tint={"#D97757"} cheer={relief * 0.6} gaze={lf < 16 ? 3 : 0} glasses={1} />
        {/* NIGHTCAP drawn over the head */}
        {capOn > 0.02 && (
          <div style={{ position: "absolute", left: 14, top: -6, width: 130, height: 96, transformOrigin: "40% 90%", transform: `scale(${Math.min(1, capOn)}) rotate(${-4 + breathe * 2}deg)`, zIndex: 2 }}>
            <svg viewBox="0 0 130 96" width={130} height={96}>
              {/* slouchy cone flopping to the side */}
              <path d="M20 78 Q30 20 74 22 Q120 26 108 52 Q98 72 78 70 Q52 66 44 80 Z" fill="#C9522E" stroke="#9B3A1E" strokeWidth={2} />
              {/* fold shading */}
              <path d="M20 78 Q30 20 74 22 Q64 42 52 60 Q42 74 44 80 Z" fill="rgba(0,0,0,0.12)" />
              {/* white fur brim */}
              <rect x={12} y={74} width={66} height={16} rx={8} fill="#F3EEE2" stroke="#D8CFBC" strokeWidth={1.5} />
              {/* pom-pom at the drooping tip */}
              <circle cx={110} cy={52} r={12} fill="#F3EEE2" stroke="#D8CFBC" strokeWidth={1.5} />
            </svg>
          </div>
        )}
      </div>

      {/* floating Zzz (8-bit blocky) rising from the sleeper */}
      {dozeP > 0.05 && [0, 1, 2].map((i) => {
        const cyc = ((lf * 2.4 + i * 26) % 78) / 78;
        const zx = 176 + i * 22 + Math.sin(lf / 8 + i) * 6;
        const zy = 566 - cyc * 150;
        const op = Math.sin(cyc * Math.PI) * dozeP;
        const sz = 16 + i * 8;
        return <div key={`z${i}`} style={{ position: "absolute", left: zx, top: zy, fontFamily: mono, fontWeight: 700, fontSize: sz, color: "#BFE0FF", opacity: op, textShadow: "0 0 8px rgba(150,190,255,0.6), 2px 2px 0 rgba(60,100,180,0.5)", transform: `rotate(${-6 + i * 4}deg)`, zIndex: 27 }}>Z</div>;
      })}

      {/* payoff sparkles + relief sparkle on the rip */}
      <Sparkles lf={lf} at={58 / 30} x={cx} y={250} n={20} spread={270} colors={["#6FD3A0", GOLD, "#fff", GREEN]} dur={0.9} />
      <Sparkles lf={lf} at={5 / 30} x={cx} y={invCY} n={12} spread={200} colors={[PAPER, RED, "#fff"]} dur={0.55} />

      <Vignette strength={0.52} shape="72% 68% at 46% 44%" />
      <Grain op={0.05} />
      {/* soft rip flash (gentle, not a hard white wall) */}
      {ripFlash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 46%, rgba(255,240,225,0.4), rgba(255,240,225,0) 66%)", opacity: ripFlash * 0.6, zIndex: 31, pointerEvents: "none" }} />}
    </>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  // ===================== CHAPTER 5: "ONE SENTENCE" =====================
  // Matrix-hacker terminal night. Our founder (as a DEVELOPER: glasses + headset)
  // sits at a cozy dev desk and shows how easy it is: ONE sentence types out in a
  // green-on-black terminal, a Run button flashes, a beam fires, and the brand kit
  // begins to generate. Green code-rain falls behind + faintly inside the window.
  // duration 95f (3.18s).

  // ---- palette ----
  const CARD = "#0B1016", CARD2 = "#111823", INNER = "#050A08", BORD = "#213024";
  const MG = "#2EA043", MGL = "#4BE07A", MGX = "#B9FFD0";     // matrix greens
  const TXT = "#E8F5EC", DIM = "#5E7A66";
  const GLY = "01<>{}[]=+*/#$;:";

  // ============================ TIMELINE ============================
  const winP = over(lf, 1, 14, Easing.out(Easing.back(1.5)));
  const barP = over(lf, 8, 9);
  const inpP = over(lf, 13, 10, Easing.out(Easing.back(1.3)));
  const enter = Math.min(1, over(lf, 6, 13, Easing.out(Easing.back(1.4))));

  const TEXT = "a productivity app for nurses";
  const typed = ramp(lf, 22, 60);
  const nChars = Math.min(TEXT.length, Math.floor(typed * (TEXT.length + 0.5)));
  const shown = TEXT.slice(0, nChars);
  const typing = nChars > 0 && nChars < TEXT.length;
  const typingDone = nChars >= TEXT.length;
  const caretOn = Math.floor(lf / 7) % 2 === 0;

  const sendAt = 68;
  const sent = lf >= sendAt;
  const press = lf >= sendAt && lf < sendAt + 9 ? Math.sin(((lf - sendAt) / 9) * Math.PI) : 0;
  const genStart = 72;
  const gen = over(lf, genStart, 22, Easing.out(Easing.cubic));
  const beam = ramp(lf, sendAt + 1, sendAt + 22);
  const glow = 0.5 + 0.5 * Math.sin(lf / 7);
  const idleBob = bob(lf, 3, 150);

  const cam = 1 + over(lf, sendAt, 6) * 0.014 - over(lf, sendAt + 8, 10) * 0.014;

  // ---- window geometry (recording slot x150..862 / y300..690) ----
  const winL = 150, winT = 300, winW = 712, winH = 390, barH = 44;
  const innerL = winL + 14, innerR = winL + winW - 14;

  // ---- prompt field ----
  const btnW = 96, btnH = 52;
  const btnL = innerR - 12 - btnW;
  const fieldT = 388, fieldH = 52;
  const fieldL = innerL + 8, fieldR = btnL - 12;
  const markL = fieldL + 14, markSize = 26;
  const textL = fieldL + 50;
  const charW = 12.0;
  const caretX = textL + shown.length * charW;
  const btnCx = btnL + btnW / 2, btnCy = fieldT + btnH / 2;

  // ---- tiles (brand kit forming) ----
  const tileTop = 496, tileH = 150, tileGap = 14;
  const tileW = (innerR - innerL - 16 - tileGap * 2) / 3;
  const tiles = [
    { icon: "logo" }, { icon: "palette" }, { icon: "font" },
  ];
  const SW = [CLAY, GOLD, GREEN, SKY, PINK];

  // ---- soft cursor -> Run ----
  const cursorT = over(lf, 52, 14, Easing.inOut(Easing.cubic));
  const curX = 250 + (btnCx - 250) * cursorT;
  const curY = 600 + (btnCy + 6 - 600) * cursorT;
  const clickRing = lf >= sendAt && lf < sendAt + 14 ? (lf - sendAt) / 14 : -1;

  // ---- background code-rain columns ----
  const RN = 15;
  const rain = Array.from({ length: RN }).map((_, i) => {
    const x = 24 + i * (972 / (RN - 1));
    const spd = 1.1 + seed(i * 2.1) * 1.7;
    const head = (lf * spd + seed(i * 3.7) * 800) % 900;
    return { x, head, base: i };
  });

  // ---- rising code-dot particles ----
  const dots = Array.from({ length: 22 }).map((_, i) => {
    const life = 200 + seed(i * 1.7) * 120;
    const t = (lf + seed(i * 5.1) * life) % life;
    const p = t / life;
    const x = 40 + seed(i * 2.3) * 936;
    const y = 780 - p * 740;
    const s = 2 + seed(i * 3.9) * 3;
    const op = Math.sin(p * Math.PI) * (0.12 + seed(i * 6.3) * 0.16);
    const c = seed(i * 4.4) > 0.55 ? MGL : lerpHex(MG, MGX, 0.4);
    return { x, y, s, op, c };
  });

  // ---- keyboard keys (one lights as founder types) ----
  const kbCols = 12, kbRows = 4, keyW = 30, keyGap = 7;
  const kbW = kbCols * keyW + (kbCols - 1) * keyGap;
  const kbL = 506 - kbW / 2, kbT = 704;
  const litKey = Math.floor(lf * 1.7 + 3) % (kbCols * kbRows);

  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam})`, transformOrigin: "50% 46%" }}>
        {/* ===================== BACK WALL (deep) ===================== */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg,#04110B 0%,#05100C 46%,#020705 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 50% at 50% 40%, rgba(46,160,67,0.16), transparent 66%)" }} />
        {/* warm desk-lamp bloom from upper right */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 84% 20%, rgba(255,200,120,0.10), transparent 66%)" }} />

        {/* MATRIX CODE-RAIN (back wall) */}
        {rain.map((col, i) => {
          const runN = 9;
          return Array.from({ length: runN }).map((_, j) => {
            const gy = col.head - j * 30;
            const y = ((gy % 900) + 900) % 900;
            if (y > 792 || y < -20) return null;
            const g = GLY[Math.floor(seed(col.base * 7 + j * 1.7 + Math.floor(lf / 6)) * GLY.length)];
            const isHead = j === 0;
            const fade = 1 - j / runN;
            return (
              <span key={`r${i}_${j}`} style={{
                position: "absolute", left: col.x, top: y, fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 17, fontWeight: isHead ? 700 : 500,
                color: isHead ? MGX : MGL,
                opacity: (isHead ? 0.55 : 0.16 * fade),
                textShadow: isHead ? `0 0 8px ${MGL}` : "none",
              }}>{g}</span>
            );
          });
        })}

        {/* faint grid, masked toward center */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(80,160,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(80,160,110,0.05) 1px, transparent 1px)", backgroundSize: "46px 46px", maskImage: "radial-gradient(ellipse 72% 66% at 50% 44%, #000 26%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 72% 66% at 50% 44%, #000 26%, transparent 80%)" }} />

        {/* ===================== MIDGROUND: DESK ===================== */}
        {/* desk surface band */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 636, height: 156, background: "linear-gradient(180deg,#140E08 0%,#0B0805 100%)", boxShadow: "inset 0 2px 0 rgba(255,190,110,0.10)" }} />
        {/* warm pool of lamp light on desk */}
        <div style={{ position: "absolute", left: 506 - 360, top: 600, width: 720, height: 220, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,196,110,0.12), transparent 68%)", filter: "blur(4px)" }} />
        {/* green monitor bloom on desk */}
        <div style={{ position: "absolute", left: 506 - 320, top: 610, width: 640, height: 180, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(46,160,67,0.16), transparent 70%)", filter: "blur(3px)" }} />

        {/* small plant (bottom-left) */}
        <div style={{ position: "absolute", left: 78, top: 636, transform: `translateY(${idleBob * 0.4}px)`, zIndex: 8, filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.5))" }}>
          <svg width={96} height={130} viewBox="0 0 96 130">
            {[[-1, 0.9], [-0.5, 1.05], [0, 1.15], [0.5, 1.05], [1, 0.9]].map((L, i) => {
              const sway = Math.sin(lf * 0.05 + i) * 3;
              return <path key={i} d={`M48 96 Q${48 + L[0] * 40 + sway} ${96 - 60 * L[1]} ${48 + L[0] * 24 + sway} ${30}`} fill="none" stroke={lerpHex(GREEN, "#0C3B22", 0.15 + i * 0.06)} strokeWidth={9} strokeLinecap="round" />;
            })}
            <path d="M30 96 L36 128 L60 128 L66 96 Z" fill="#5A3A22" />
            <rect x={28} y={92} width={40} height={10} rx={3} fill="#6B4528" />
          </svg>
        </div>

        {/* coffee mug (bottom-right) with steam */}
        <div style={{ position: "absolute", left: 858, top: 648, zIndex: 9, filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.5))" }}>
          {Array.from({ length: 3 }).map((_, i) => {
            const t = (lf * 1.2 + i * 22) % 66;
            const p = t / 66;
            return <div key={i} style={{ position: "absolute", left: 22 + Math.sin(p * 6 + i) * 8, top: -8 - p * 46, width: 7, height: 7, borderRadius: "50%", background: "#CFE9DA", opacity: Math.sin(p * Math.PI) * 0.22, filter: "blur(2px)" }} />;
          })}
          <svg width={70} height={64} viewBox="0 0 70 64">
            <rect x={6} y={16} width={44} height={44} rx={9} fill="#16211A" stroke={MG} strokeWidth={2} />
            <path d="M50 26 Q66 26 66 40 Q66 52 50 50" fill="none" stroke={MG} strokeWidth={4} />
            <rect x={12} y={22} width={32} height={9} rx={4} fill="rgba(75,224,122,0.18)" />
            <path d="M16 46 L40 46" stroke={MGL} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
          </svg>
        </div>

        {/* MECHANICAL KEYBOARD (center-below window) */}
        <div style={{ position: "absolute", left: kbL, top: kbT, width: kbW, height: kbRows * (keyW * 0.7) + (kbRows - 1) * keyGap + 14, zIndex: 10, transform: "perspective(600px) rotateX(34deg)", transformOrigin: "50% 100%", filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.55))" }}>
          <div style={{ position: "absolute", inset: -8, borderRadius: 12, background: "linear-gradient(180deg,#1A2118,#0C120C)", border: `1px solid ${BORD}` }} />
          {Array.from({ length: kbRows }).map((_, r) => Array.from({ length: kbCols }).map((_, c) => {
            const idx = r * kbCols + c;
            const lit = typing && idx === litKey;
            return <div key={`k${r}_${c}`} style={{ position: "absolute", left: c * (keyW + keyGap), top: r * (keyW * 0.7 + keyGap), width: keyW, height: keyW * 0.7, borderRadius: 5, background: lit ? `linear-gradient(180deg,${MGL},${MG})` : "linear-gradient(180deg,#20291F,#151C15)", border: `1px solid ${lit ? MGX : "#2A362A"}`, boxShadow: lit ? `0 0 12px ${MGL}, inset 0 1px 0 rgba(255,255,255,0.3)` : "inset 0 1px 0 rgba(255,255,255,0.06)" }} />;
          }))}
        </div>

        {/* rising code-dot particles */}
        {dots.map((d, i) => <div key={`dt${i}`} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: "50%", background: d.c, opacity: d.op, boxShadow: `0 0 6px ${d.c}` }} />)}

        {/* ===================== THE APP WINDOW (recording slot) ===================== */}
        <div style={{ position: "absolute", left: winL + winW / 2, top: winT, width: winW, height: winH, marginLeft: -winW / 2, transformOrigin: "50% 28%", transform: `translateY(${(1 - winP) * 40 + idleBob}px) scale(${0.9 + winP * 0.1})`, opacity: Math.min(1, winP * 1.4), zIndex: 14 }}>
          {/* outer glow (monitor bloom) */}
          <div style={{ position: "absolute", inset: -22, borderRadius: 26, background: "radial-gradient(ellipse 80% 70% at 50% 42%, rgba(46,160,67,0.24), transparent 70%)", filter: "blur(9px)", opacity: 0.7 + gen * 0.3 }} />
          {/* body */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: `linear-gradient(170deg, ${CARD2}, ${CARD})`, border: `1.5px solid ${BORD}`, boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)", overflow: "hidden" }}>
            {/* top chrome bar */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: barH, background: "linear-gradient(180deg,#14201A,#0C130E)", borderBottom: `1px solid ${BORD}` }}>
              {["#F0655B", "#F5BE4F", "#61C554"].map((c, i) => <div key={c} style={{ position: "absolute", left: 20 + i * 22, top: barH / 2 - 6, width: 12, height: 12, borderRadius: "50%", background: c, opacity: barP, boxShadow: `0 0 6px ${c}66` }} />)}
              <div style={{ position: "absolute", left: 112, top: 8, right: 116, height: 28, borderRadius: 8, background: INNER, border: `1px solid ${BORD}`, opacity: barP, display: "flex", alignItems: "center", paddingLeft: 12, gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: MGL, boxShadow: `0 0 6px ${MGL}` }} />
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, color: MG, letterSpacing: 0.2 }}>brand-studio</span>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, color: "#3A4A3C" }}>~ / new</span>
              </div>
            </div>

            {/* inner FLAT terminal panel (drop-in recording area) */}
            <div style={{ position: "absolute", left: 12, top: barH + 8, right: 12, bottom: 12, borderRadius: 12, background: `linear-gradient(180deg, ${INNER}, #030706)`, border: `1px solid ${lerpHex(BORD, INNER, 0.35)}`, overflow: "hidden" }}>
              {/* faint code-rain inside (kept low so recording area stays clean) */}
              {Array.from({ length: 7 }).map((_, i) => {
                const cx = 30 + i * 96;
                return Array.from({ length: 5 }).map((_, j) => {
                  const gy = ((lf * (0.9 + seed(i * 1.3) * 1.0) + seed(i * 4.4) * 340) % 360) - j * 26;
                  const y = ((gy % 360) + 360) % 360;
                  const g = GLY[Math.floor(seed(i * 5 + j * 2.2 + Math.floor(lf / 7)) * GLY.length)];
                  return <span key={`ir${i}_${j}`} style={{ position: "absolute", left: cx, top: y, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, color: MGL, opacity: (j === 0 ? 0.16 : 0.05) }}>{g}</span>;
                });
              })}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 60% at 50% 26%, rgba(46,160,67,0.06), transparent 70%)" }} />
              {/* terminal prompt label */}
              <div style={{ position: "absolute", left: 20, top: 18, opacity: inpP, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 14, color: MG }}>{"> describe what you're building"}</span>
              </div>
            </div>
          </div>

          {/* ---- PROMPT FIELD (overlay; offset from window origin) ---- */}
          <div style={{ position: "absolute", left: fieldL - winL, top: fieldT - winT, width: fieldR - fieldL, height: fieldH, borderRadius: 13, background: "linear-gradient(180deg,#0A120C,#060B08)", border: `1.5px solid ${sent ? lerpHex(MG, BORD, 1 - Math.min(1, gen + 0.3)) : lerpHex("#2E4A36", BORD, 0.3)}`, boxShadow: sent ? `0 0 ${14 + glow * 14}px rgba(46,160,67,${0.25 + gen * 0.3})` : `inset 0 2px 6px rgba(0,0,0,0.5), 0 0 ${8 + glow * 6}px rgba(46,160,67,0.12)`, opacity: Math.min(1, inpP * 1.3), transform: `scale(${0.94 + inpP * 0.06})`, transformOrigin: "50% 50%", overflow: "hidden" }}>
            {sent && beam < 1 && <div style={{ position: "absolute", top: -10, bottom: -10, left: `${beam * 130 - 30}%`, width: "34%", background: "linear-gradient(100deg,transparent,rgba(75,224,122,0.55),transparent)", transform: "skewX(-16deg)", filter: "blur(1px)" }} />}
            {sent && <div style={{ position: "absolute", left: 0, bottom: 0, height: 3, width: `${gen * 100}%`, background: `linear-gradient(90deg,${MG},${MGL})`, boxShadow: `0 0 8px ${MGL}` }} />}
          </div>

          {/* claude spark mark inside input */}
          <div style={{ position: "absolute", left: markL - winL, top: fieldT - winT + (fieldH - markSize) / 2, opacity: Math.min(1, inpP * 1.3), filter: `drop-shadow(0 0 6px ${MGL}88)` }}>
            <ClaudeMark size={markSize} />
          </div>

          {/* typed terminal text (green-on-black, recording-ready) */}
          <div style={{ position: "absolute", left: textL - winL, top: fieldT - winT + 15, height: 26, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 20, lineHeight: "26px", color: MGX, textShadow: `0 0 8px ${MGL}66`, whiteSpace: "pre", opacity: inpP }}>
            {shown}
          </div>
          {/* blinking block caret */}
          {!sent && inpP > 0.5 && (
            <div style={{ position: "absolute", left: caretX - winL, top: fieldT - winT + 14, width: 11, height: 24, background: MGL, boxShadow: `0 0 8px ${MGL}`, opacity: typingDone ? (caretOn ? 0.95 : 0) : 0.9 }} />
          )}

          {/* RUN button */}
          <div style={{ position: "absolute", left: btnL - winL, top: fieldT - winT, width: btnW, height: btnH, borderRadius: 13, background: `linear-gradient(180deg, ${lerpHex(MGL, "#FFFFFF", press * 0.5)}, ${lerpHex(MG, MGL, press)})`, border: `1px solid ${lerpHex(MG, "#06210F", 0.4)}`, boxShadow: `0 8px 18px -6px rgba(46,160,67,0.6), 0 0 ${press * 28}px rgba(75,224,122,${press}), inset 0 1px 0 rgba(255,255,255,0.35)`, transform: `translateY(${press * 3}px) scale(${1 - press * 0.05})`, opacity: Math.min(1, inpP * 1.3), display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, fontWeight: 800, color: "#04180B" }}>Run</span>
            <svg width={16} height={16} viewBox="0 0 16 16"><path d="M3 8 H12 M8 4 L12 8 L8 12" fill="none" stroke="#04180B" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          {/* Enter hint */}
          {typingDone && !sent && (
            <div style={{ position: "absolute", left: btnL - winL + btnW / 2 - 32, top: fieldT - winT - 28, width: 64, height: 22, borderRadius: 7, background: "rgba(46,160,67,0.16)", border: `1px solid ${MG}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, opacity: 0.55 + 0.45 * Math.sin(lf / 5) }}>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: MGL, fontWeight: 700 }}>Enter</span>
              <span style={{ fontSize: 12, color: MGL }}>↵</span>
            </div>
          )}

          {/* GENERATING label */}
          {sent && (
            <div style={{ position: "absolute", left: innerL - winL + 8, top: tileTop - winT - 30, display: "flex", alignItems: "center", gap: 9, opacity: over(lf, genStart, 6) }}>
              <svg width={16} height={16} viewBox="0 0 16 16" style={{ transform: `rotate(${lf * 16}deg)` }}><circle cx={8} cy={8} r={6} fill="none" stroke={lerpHex(MG, INNER, 0.5)} strokeWidth={2.2} /><path d="M8 2 A6 6 0 0 1 14 8" fill="none" stroke={MGL} strokeWidth={2.2} strokeLinecap="round" /></svg>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 15, fontWeight: 600, color: MG }}>generating brand kit</span>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 15, color: MGL }}>{".".repeat(1 + (Math.floor(lf / 6) % 3))}</span>
            </div>
          )}

          {/* brand-kit tiles forming */}
          {sent && tiles.map((tile, i) => {
            const tp = over(lf, genStart + 3 + i * 4, 12, Easing.out(Easing.back(1.4)));
            if (tp <= 0.01) return null;
            const tl = innerL - winL + 8 + i * (tileW + tileGap);
            const shimX = ((lf * 2 + i * 40) % 160) / 160;
            return (
              <div key={`tl${i}`} style={{ position: "absolute", left: tl, top: tileTop - winT, width: tileW, height: tileH, borderRadius: 12, background: "linear-gradient(180deg,#0B120D,#070C09)", border: `1px solid ${BORD}`, boxShadow: "0 10px 22px -10px rgba(0,0,0,0.6)", transform: `scale(${Math.min(1, tp)})`, opacity: Math.min(1, tp), overflow: "hidden" }}>
                {gen < 1 && <div style={{ position: "absolute", top: -10, bottom: -10, left: `${shimX * 130 - 30}%`, width: "36%", background: "linear-gradient(100deg,transparent,rgba(75,224,122,0.14),transparent)", transform: "skewX(-16deg)" }} />}
                {tile.icon === "logo" && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(150deg, ${CLAY}, ${CLAYD})`, boxShadow: `0 0 16px ${CLAY}66`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width={30} height={30} viewBox="0 0 30 30"><path d="M15 3 L18 12 L27 15 L18 18 L15 27 L12 18 L3 15 L12 12 Z" fill="#FFF3E6" /></svg>
                    </div>
                  </div>
                )}
                {tile.icon === "palette" && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                    {SW.map((c, j) => { const cp = over(lf, genStart + 8 + j * 2, 8); return <div key={j} style={{ width: 20, height: 34, borderRadius: 5, background: c, boxShadow: `0 0 8px ${c}66`, transform: `scaleY(${Math.min(1, cp)})`, transformOrigin: "50% 50%" }} />; })}
                  </div>
                )}
                {tile.icon === "font" && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: TXT, lineHeight: 1 }}>Aa</span>
                    <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: DIM, letterSpacing: 1 }}>Fraunces / Inter</span>
                  </div>
                )}
                <div style={{ position: "absolute", left: 10, bottom: 10, height: 8, width: 40 + i * 10, borderRadius: 4, background: lerpHex(BORD, MG, gen * 0.5) }} />
                {gen > 0.85 && <div style={{ position: "absolute", right: 10, top: 10, width: 18, height: 18, borderRadius: "50%", background: MG, display: "flex", alignItems: "center", justifyContent: "center", opacity: over(lf, genStart + 16, 6) }}><svg width={11} height={11} viewBox="0 0 11 11"><path d="M2 6 L4.5 8.5 L9 3" fill="none" stroke="#04180B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
              </div>
            );
          })}
        </div>

        {/* ===================== DEVELOPER MASCOT (glasses + headset), typing ===================== */}
        <div style={{ position: "absolute", left: 30, top: 486 + idleBob + (typing ? Math.sin(lf * 0.9) * 1.5 : 0), transformOrigin: "50% 100%", transform: `scale(${enter})`, zIndex: 22, filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.55))" }}>
          {/* seat glow */}
          <div style={{ position: "absolute", left: 60, top: 120, width: 130, height: 22, marginLeft: -65, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(46,160,67,0.32), transparent 70%)" }} />
          {/* screen-light on the face (green key light) */}
          <div style={{ position: "absolute", left: 24, top: 16, width: 90, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(75,224,122,0.16), transparent 70%)", filter: "blur(3px)" }} />
          <Mascot lf={lf} size={120} tint={CLAY} gaze={0.7} nodAmp={2} nodSpeed={typing ? 9 : 5} cheer={press > 0.1 || gen > 0.2 ? 0.75 : 0.2} stern={0} shock={0} glasses={1} suit={0} wizard={0} samurai={0} />
          {/* HEADSET overlay (band + ear cups + boom mic) */}
          <svg width={120} height={120} viewBox="0 0 120 120" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
            {/* band arc over head */}
            <path d="M14 52 Q60 2 106 52" fill="none" stroke="#1B2620" strokeWidth={9} strokeLinecap="round" />
            <path d="M14 52 Q60 2 106 52" fill="none" stroke={MGL} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
            {/* ear cups */}
            <rect x={4} y={46} width={20} height={30} rx={9} fill="#141D18" stroke={MG} strokeWidth={2} />
            <rect x={96} y={46} width={20} height={30} rx={9} fill="#141D18" stroke={MG} strokeWidth={2} />
            <rect x={8} y={52} width={12} height={5} rx={2.5} fill={MGL} opacity={0.7} />
            <rect x={100} y={52} width={12} height={5} rx={2.5} fill={MGL} opacity={0.7} />
            {/* boom mic from left cup to mouth */}
            <path d="M14 74 Q10 96 40 94" fill="none" stroke="#1B2620" strokeWidth={4} strokeLinecap="round" />
            <circle cx={42} cy={94} r={4} fill={MG} />
            <circle cx={42} cy={94} r={4} fill={MGL} opacity={0.4 + 0.4 * Math.sin(lf / 4)} />
          </svg>
        </div>

        {/* ===================== SOFT CURSOR -> Run ===================== */}
        {cursorT > 0.01 && (
          <div style={{ position: "absolute", left: curX, top: curY, zIndex: 30, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}>
            <svg width={22} height={26} viewBox="0 0 22 26"><path d="M2 2 L2 20 L7 15 L11 23 L14 21.5 L10 14 L17 14 Z" fill="#FDFDFD" stroke="#04120A" strokeWidth={1.4} strokeLinejoin="round" /></svg>
          </div>
        )}
        {clickRing >= 0 && (
          <div style={{ position: "absolute", left: btnCx, top: btnCy, zIndex: 29 }}>
            <div style={{ position: "absolute", left: -(18 + clickRing * 40), top: -(18 + clickRing * 40), width: (18 + clickRing * 40) * 2, height: (18 + clickRing * 40) * 2, borderRadius: "50%", border: `${2.5 * (1 - clickRing)}px solid rgba(75,224,122,0.8)`, opacity: 1 - clickRing }} />
          </div>
        )}

        <Sparkles lf={lf} at={sendAt / 30} x={btnCx} y={btnCy} n={16} spread={150} colors={[MGL, "#FFFFFF", MGX]} dur={0.8} />

        {/* run pulse ring from window */}
        {sent && lf < sendAt + 20 && (() => { const k = (lf - sendAt) / 20; return (
          <div style={{ position: "absolute", left: winL + winW / 2, top: winT + winH / 2, zIndex: 13, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: -(winW / 2) * (0.9 + k * 0.25), top: -(winH / 2) * (0.9 + k * 0.25), width: winW * (0.9 + k * 0.25), height: winH * (0.9 + k * 0.25), borderRadius: 24, border: `2px solid rgba(46,160,67,${0.5 * (1 - k)})`, opacity: 1 - k }} />
          </div>
        ); })()}

        <Vignette strength={0.52} shape="70% 64% at 50% 46%" />
        <Grain op={0.05} />
      </div>

      {/* green flash on Run press */}
      {lf >= sendAt && lf < sendAt + 6 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 58% 48%, rgba(75,224,122,0.28), transparent 70%)", opacity: 0.6 * (1 - (lf - sendAt) / 6), zIndex: 46, pointerEvents: "none" }} />}
    </>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const CX = 506;
  // ===================== window geometry (screen-recording slot) =====================
  const WX = 150, WY = 300, WW = 712, WH = 392, BAR = 38;

  // GitHub-dark UI palette (inside the window)
  const SCR = "#0D1117", CARD = "#161B22", CARD2 = "#1B222C", BORD = "#2A3140";
  const TXT = "#E6EDF3", MUT = "#8B949E", GHGRN = "#2EA043";

  // generated brand palette shown in the kit (real hex)
  const BK = ["#2F6BFF", "#14B8A6", "#F97316", "#A855F7", "#F8FAFC"];

  // studio environment palette (warm, bright, inspiring)
  const WALL1 = "#F7E9D0", WALL2 = "#ECD1A6", WALL3 = "#D3AE79";
  const CORK = "#C79E63", CORKD = "#AA8148";
  const CURT = "#7E1D2B", CURTD = "#571320", CURTL = "#9A2E3C";
  const GOLDY = "#E7B94E", GOLDD = "#B98A2C";
  const WOOD = "#B98A57", WOODD = "#8C6238";
  const LEAF = "#4F7C4B", LEAFD = "#3A5E38";

  // ===================== timeline (175f) =====================
  const winFade = over(lf, 2, 12, Easing.out(Easing.cubic));
  const winPop = over(lf, 2, 16, Easing.out(Easing.back(1.35)));
  const winScale = Math.min(1.02, 0.9 + winPop * 0.12);
  const part = over(lf, 8, 26, Easing.inOut(Easing.cubic));   // curtains part
  const spot = over(lf, 6, 18, Easing.out(Easing.cubic));     // spotlight on
  const mIn = over(lf, 4, 14, Easing.out(Easing.back(1.3)));  // mascot enters
  const flourish = over(lf, 22, 28, Easing.out(Easing.cubic));// presenting arm raise
  const proud = over(lf, 150, 20, Easing.out(Easing.cubic));  // final proud beat

  const pop = (o: number, d = 13) => over(lf, o, d, Easing.out(Easing.back(1.5)));
  const fade = (o: number, d = 10) => over(lf, o, d, Easing.out(Easing.cubic));
  const enter = (o: number): React.CSSProperties => {
    const f = fade(o);
    return { opacity: f, transform: `translateY(${(1 - f) * 14}px) scale(${Math.min(1.04, 0.7 + pop(o) * 0.34)})` };
  };

  // card onsets (local to window content)
  const oLogo = (i: number) => 26 + i * 4;   // 26..42
  const oPal = (i: number) => 56 + i * 4;    // 56..72
  const oFont = 92, oBan1 = 112, oBan2 = 128, oExport = 150;

  const exReady = fade(oExport, 12);
  const exPulse = 0.5 + 0.5 * Math.sin(lf / 6);
  const banShim = -80 + ((lf * 5) % (WW + 160));

  // reveal shake on the ta-da beat
  const shake = (lf >= 8 && lf < 20) ? Math.sin(lf * 2.2) * (1 - over(lf, 8, 12)) * 3 : 0;

  // warm bokeh / dust drifting up (foreground atmosphere)
  const dust = Array.from({ length: 16 }).map((_, i) => {
    const r = seed(i * 1.7 + 3), r2 = seed(i * 2.3 + 9);
    const life = 200 + r * 160; const p = ((lf + r2 * life) % life) / life;
    const x = r * 1012 + Math.sin(lf / 40 + i) * 18; const y = 800 - p * 880;
    const s = 6 + r2 * 16; const op = (0.10 + r2 * 0.13) * (1 - p) * (0.35 + p);
    return { x, y, s, op };
  });

  // mood-board pinned reference cards (on the cork wall above the window)
  const board = Array.from({ length: 7 }).map((_, i) => {
    const r = seed(i * 3.3 + 1), r2 = seed(i * 1.9 + 6);
    const x = 80 + i * 122 + r * 14; const y = 168 + (i % 2) * 34 + r2 * 8;
    const rot = (r - 0.5) * 14; const kind = i % 3; const c = BK[i % 5];
    return { x, y, rot, kind, c, in: fade(4 + i * 2, 12) };
  });

  // logo mark variations (simple geometric marks)
  const logoMark = (i: number, c: string) => {
    const cc = c === "#F8FAFC" ? "#C9D3E0" : c;
    if (i === 0) return (<g><rect x="14" y="14" width="34" height="34" rx="10" fill={cc} /><path d="M24 42 L31 20 L38 42 M27 34 L35 34" stroke={SCR} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>);
    if (i === 1) return (<g fill="none" stroke={cc} strokeWidth="4.6"><circle cx="25" cy="31" r="13" /><circle cx="37" cy="31" r="13" /></g>);
    if (i === 2) return (<g fill="none" stroke={cc} strokeWidth="4.4" strokeLinecap="round"><path d="M31 12 A19 19 0 0 1 50 31" /><path d="M31 22 A9 9 0 0 1 40 31" /><circle cx="31" cy="31" r="3.4" fill={cc} stroke="none" /></g>);
    if (i === 3) return (<g><path d="M31 13 L50 47 L12 47 Z" fill="none" stroke={cc} strokeWidth="4.4" strokeLinejoin="round" /><circle cx="31" cy="37" r="4.6" fill={cc} /></g>);
    return (<g><path d="M31 12 L48 22 L48 40 L31 50 L14 40 L14 22 Z" fill="none" stroke={cc} strokeWidth="4.2" strokeLinejoin="round" /><circle cx="31" cy="31" r="6.2" fill={cc} /></g>);
  };

  const labelSt: React.CSSProperties = { position: "absolute", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10.5, letterSpacing: 1.6, color: MUT, textTransform: "uppercase" };
  const armAngle = 30 - flourish * 68; // presenting arm swings up

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* ================= LAYER 0 : back wall (bright warm studio) ================= */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 100% at 50% 18%, ${WALL1} 0%, ${WALL2} 48%, ${WALL3} 100%)`, zIndex: 0 }} />
      {/* soft wallpaper texture + warm floor line */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(140,100,50,0.05) 1px, transparent 1px)`, backgroundSize: "100% 30px", zIndex: 0, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, height: 102, background: `linear-gradient(180deg, ${WOOD} 0%, ${WOODD} 100%)`, boxShadow: "inset 0 8px 24px -8px rgba(0,0,0,0.35)", zIndex: 5 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, height: 4, background: "rgba(255,240,214,0.55)", zIndex: 6 }} />

      {/* ================= LAYER 2 : mood-board / cork wall + pinned cards ================= */}
      <div style={{ position: "absolute", left: 60, top: 150, width: 890, height: 132, borderRadius: 12, background: `repeating-linear-gradient(42deg, ${CORK} 0px, ${CORK} 5px, ${CORKD} 6px, ${CORK} 9px)`, border: `6px solid ${WOODD}`, boxShadow: "0 16px 30px -14px rgba(0,0,0,0.35), inset 0 0 40px rgba(90,60,20,0.25)", zIndex: 2 }} />
      {/* bunting string above the board */}
      <svg viewBox="0 0 1012 40" style={{ position: "absolute", left: 0, top: 130, width: 1012, height: 40, zIndex: 2 }}>
        <path d="M70 8 Q506 34 950 8" stroke={WOODD} strokeWidth="2" fill="none" opacity="0.6" />
      </svg>
      {board.map((b, i) => (
        <div key={`bd${i}`} style={{ position: "absolute", left: b.x, top: b.y, width: 74, height: 66, transform: `rotate(${b.rot}deg) scale(${b.in})`, opacity: b.in, zIndex: 3, transformOrigin: "50% 0%" }}>
          {/* push pin */}
          <div style={{ position: "absolute", left: "50%", top: -5, width: 9, height: 9, marginLeft: -4.5, borderRadius: "50%", background: i % 2 ? GOLDY : CURTL, boxShadow: "0 2px 3px rgba(0,0,0,0.4)", zIndex: 2 }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#FFFDF7", boxShadow: "0 6px 12px -5px rgba(0,0,0,0.45)", padding: 5 }}>
            {b.kind === 0 && (
              <div style={{ display: "flex", height: "100%", gap: 3 }}>
                {[BK[0], BK[1], BK[2]].map((c, k) => <div key={k} style={{ flex: 1, borderRadius: 3, background: c }} />)}
              </div>
            )}
            {b.kind === 1 && (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#1c1c22", lineHeight: "30px" }}>Aa</div>
                <div style={{ width: "70%", height: 3, borderRadius: 2, background: "#cbd0d8", marginTop: 4 }} />
              </div>
            )}
            {b.kind === 2 && (
              <div style={{ height: "100%", borderRadius: 4, background: grad(b.c, lerpHex(b.c, "#000000", 0.35)) }}>
                <svg viewBox="0 0 62 62" style={{ width: "70%", height: "70%", margin: "12% auto 0", display: "block" }}>{logoMark(i % 5, "#FFFFFF")}</svg>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* framed palette poster (right gutter) */}
      <div style={{ position: "absolute", left: 900, top: 360, width: 96, height: 150, borderRadius: 6, background: "#FFFDF7", border: `7px solid ${WOODD}`, boxShadow: "0 18px 28px -14px rgba(0,0,0,0.45)", zIndex: 2, padding: 8, opacity: fade(10, 14) }}>
        {BK.map((c, k) => (
          <div key={k} style={{ height: "16%", marginBottom: 4, borderRadius: 3, background: c, border: c === "#F8FAFC" ? "1px solid #ddd" : "none" }} />
        ))}
      </div>

      {/* ================= LAYER 6 : plants (foreground framing) ================= */}
      {[{ x: 24, y: 560, s: 1 }, { x: 946, y: 588, s: 0.82 }].map((pl, i) => (
        <div key={`pl${i}`} style={{ position: "absolute", left: pl.x, top: pl.y, width: 96 * pl.s, height: 190 * pl.s, zIndex: 7, transform: `translateY(${bob(lf, 2, 90, i * 3)}px)`, transformOrigin: "50% 100%", opacity: fade(0, 12) }}>
          <svg viewBox="0 0 96 190" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <g stroke={LEAFD} strokeWidth="0" fill={LEAF}>
              {[-38, -20, 0, 20, 38].map((a, k) => (
                <path key={k} d="M48 96 C40 60 44 30 48 8 C52 30 56 60 48 96 Z" fill={k % 2 ? LEAF : LEAFD} transform={`rotate(${a + Math.sin(lf / 30 + k) * 3} 48 96)`} />
              ))}
            </g>
            <path d="M26 96 L70 96 L64 150 L32 150 Z" fill={WOODD} />
            <path d="M26 96 L70 96 L68 108 L28 108 Z" fill={WOOD} />
          </svg>
        </div>
      ))}

      {/* ================= LAYER 12 : central spotlight beam (turns on at reveal) ================= */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 4, mixBlendMode: "screen", opacity: spot * 0.85, clipPath: "polygon(43% 0%, 57% 0%, 82% 100%, 18% 100%)", background: "linear-gradient(180deg, rgba(255,241,205,0.85) 0%, rgba(255,226,150,0.32) 45%, rgba(255,210,120,0.0) 90%)", filter: "blur(3px)" }} />
      {/* side warm ambient cones */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 3, mixBlendMode: "screen", opacity: 0.4 + spot * 0.2, clipPath: "polygon(2% 0%, 12% 0%, 34% 100%, 0% 100%)", background: "linear-gradient(180deg, rgba(255,235,190,0.5), rgba(255,220,150,0))", filter: "blur(6px)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 3, mixBlendMode: "screen", opacity: 0.4 + spot * 0.2, clipPath: "polygon(88% 0%, 98% 0%, 100% 100%, 66% 100%)", background: "linear-gradient(180deg, rgba(255,235,190,0.5), rgba(255,220,150,0))", filter: "blur(6px)" }} />
      {/* hanging pendant lamps */}
      {[300, 712].map((lx, i) => (
        <div key={`lamp${i}`} style={{ position: "absolute", left: lx, top: 0, width: 2, height: 96, background: WOODD, zIndex: 4 }}>
          <div style={{ position: "absolute", left: -20, top: 90, width: 40, height: 22, borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%", background: `radial-gradient(circle at 50% 20%, ${GOLDY}, ${GOLDD})`, boxShadow: `0 0 26px rgba(255,220,140,${0.4 + spot * 0.4})` }} />
        </div>
      ))}

      {/* ================= LAYER 10 : THE APP WINDOW (hero, the reveal) ================= */}
      <div style={{ position: "absolute", left: WX, top: WY, width: WW, height: WH, transform: `translate(${shake}px, ${(1 - winFade) * 26}px) scale(${winScale})`, transformOrigin: "50% 42%", opacity: winFade, zIndex: 10 }}>
        {/* contact shadow onto desk + reveal glow */}
        <div style={{ position: "absolute", left: 40, right: 40, bottom: -34, height: 40, borderRadius: "50%", background: "rgba(60,30,10,0.45)", filter: "blur(14px)" }} />
        <div style={{ position: "absolute", inset: -22, borderRadius: 28, background: `radial-gradient(circle at 50% 30%, rgba(255,220,150,${0.2 + spot * 0.28}), transparent 72%)`, filter: "blur(8px)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: SCR, border: `1px solid ${BORD}`, boxShadow: "0 44px 84px -26px rgba(40,20,5,0.7), 0 0 0 1px rgba(255,220,160,0.08)", overflow: "hidden" }}>

          {/* ---- browser/editor top bar ---- */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BAR, background: "linear-gradient(180deg,#171D26,#10151D)", borderBottom: `1px solid ${BORD}` }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ position: "absolute", left: 18 + i * 20, top: BAR / 2 - 6, width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <div style={{ position: "absolute", left: 96, top: 7, width: 300, height: 24, borderRadius: 8, background: "#0B1017", border: `1px solid ${BORD}`, display: "flex", alignItems: "center", paddingLeft: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: GHGRN, marginRight: 8, boxShadow: `0 0 7px ${GHGRN}` }} />
              <span style={{ fontFamily: mono, fontSize: 12.5, color: "#9FB0C4", letterSpacing: 0.2 }}>aurora / brand-kit</span>
            </div>
            <div style={{ position: "absolute", right: 16, top: 11, fontFamily: mono, fontSize: 12, color: MUT }}>generated ✓</div>
          </div>

          {/* ---- inner flat content panel (recording-ready SOLID panel) ---- */}
          <div style={{ position: "absolute", left: 0, right: 0, top: BAR, bottom: 0, background: SCR }}>

            {/* title + export pill */}
            <div style={{ position: "absolute", left: 16, top: 10, display: "flex", alignItems: "baseline", ...enter(20) }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: TXT }}>Aurora</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12.5, color: MUT, marginLeft: 10 }}>brand kit</span>
            </div>
            <div style={{ position: "absolute", left: 600, top: 8, opacity: exReady, transform: `scale(${Math.min(1.05, 0.6 + fade(oExport, 12) * 0.45)})` }}>
              <div style={{ padding: "6px 14px", borderRadius: 8, background: GHGRN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12.5, boxShadow: `0 0 ${8 + exReady * exPulse * 14}px rgba(46,160,67,${0.4 + exReady * 0.4})`, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13 }}>↧</span>Export
              </div>
            </div>

            {/* ===== BAND: LOGOS ===== */}
            <div style={{ ...labelSt, left: 16, top: 34 }}>Logo · 5 styles</div>
            {BK.slice(0, 5).map((c, i) => {
              const tx = 16 + i * 138; const done = fade(oLogo(i));
              return (
                <div key={`lg${i}`} style={{ position: "absolute", left: tx, top: 50, width: 128, height: 52, ...enter(oLogo(i)) }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: CARD, border: `1px solid ${BORD}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }} />
                  <svg viewBox="0 0 62 62" style={{ position: "absolute", left: "50%", top: "50%", width: 46, height: 46, transform: "translate(-50%,-50%)", opacity: done }}>{logoMark(i, c)}</svg>
                </div>
              );
            })}

            {/* ===== BAND: PALETTE ===== */}
            <div style={{ ...labelSt, left: 16, top: 116 }}>Palette · exact codes</div>
            {BK.map((c, i) => {
              const sx = 16 + i * 138;
              return (
                <div key={`sw${i}`} style={{ position: "absolute", left: sx, top: 132, width: 128, ...enter(oPal(i)) }}>
                  <div style={{ width: 128, height: 34, borderRadius: 10, background: c, border: c === "#F8FAFC" ? `1px solid ${BORD}` : "1px solid rgba(255,255,255,0.12)", boxShadow: `0 6px 14px -6px ${c === "#F8FAFC" ? "rgba(0,0,0,0.5)" : c}` }} />
                  <div style={{ marginTop: 5, textAlign: "center", fontFamily: mono, fontSize: 11, color: "#B7C2D0", letterSpacing: 0.3 }}>{c}</div>
                </div>
              );
            })}

            {/* ===== BOTTOM LEFT: FONT PAIRING ===== */}
            <div style={{ position: "absolute", left: 16, top: 196, width: 320, height: 150, ...enter(oFont) }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: CARD, border: `1px solid ${BORD}` }} />
              <div style={{ ...labelSt, left: 16, top: 12 }}>Type pairing</div>
              <div style={{ position: "absolute", left: 16, top: 30, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: TXT, lineHeight: "60px" }}>Aa</div>
              <div style={{ position: "absolute", left: 128, top: 40, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: TXT }}>Fraunces</div>
              <div style={{ position: "absolute", left: 128, top: 66, fontFamily: inter.fontFamily, fontSize: 11.5, color: MUT }}>Display · Headings</div>
              <div style={{ position: "absolute", left: 16, right: 16, top: 100, height: 1, background: BORD }} />
              <div style={{ position: "absolute", left: 16, top: 112, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 14, color: "#C9D3E0" }}>Pixel-perfect by default.</div>
              <div style={{ position: "absolute", left: 16, top: 132, fontFamily: inter.fontFamily, fontSize: 11.5, color: MUT }}>Inter · Body</div>
            </div>

            {/* ===== BOTTOM RIGHT: TWO SOCIAL BANNERS ===== */}
            <div style={{ position: "absolute", left: 348, top: 196, width: 348, height: 66, ...enter(oBan1) }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: grad(BK[0], "#12306e"), border: "1px solid rgba(255,255,255,0.14)", overflow: "hidden", boxShadow: "0 10px 22px -10px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", top: -20, left: banShim, width: 60, height: 130, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", transform: "skewX(-20deg)" }} />
                <svg viewBox="0 0 62 62" style={{ position: "absolute", left: 14, top: 15, width: 34, height: 34 }}>{logoMark(4, "#FFFFFF")}</svg>
                <div style={{ position: "absolute", left: 58, top: 14, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#fff" }}>Aurora</div>
                <div style={{ position: "absolute", left: 58, top: 40, fontFamily: inter.fontFamily, fontSize: 10.5, color: "rgba(255,255,255,0.85)" }}>build in public</div>
                <div style={{ position: "absolute", right: 12, top: 24, fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.7)" }}>1500×500</div>
              </div>
              <div style={{ ...labelSt, left: 2, top: -15, color: MUT }}>Banner · header</div>
            </div>
            <div style={{ position: "absolute", left: 348, top: 280, width: 348, height: 66, ...enter(oBan2) }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: grad(BK[3], "#5b2ea6"), border: "1px solid rgba(255,255,255,0.14)", overflow: "hidden", boxShadow: "0 10px 22px -10px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", top: -20, left: (banShim + 120) % (WW + 160) - 80, width: 60, height: 130, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)", transform: "skewX(-20deg)" }} />
                <svg viewBox="0 0 62 62" style={{ position: "absolute", left: 14, top: 15, width: 34, height: 34 }}>{logoMark(2, "#FFFFFF")}</svg>
                <div style={{ position: "absolute", left: 58, top: 15, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: "#fff" }}>Launch day</div>
                <div style={{ position: "absolute", left: 58, top: 40, fontFamily: inter.fontFamily, fontSize: 10.5, color: "rgba(255,255,255,0.85)" }}>we're live ✦</div>
                <div style={{ position: "absolute", right: 12, top: 24, fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.7)" }}>1080×1080</div>
              </div>
              <div style={{ ...labelSt, left: 2, top: -15, color: MUT }}>Banner · social</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LAYER 20 : THEATER CURTAINS (the ta-da reveal) ================= */}
      {part < 0.995 && (() => {
        const halfW = WW / 2 + 34;
        const foldL = `repeating-linear-gradient(90deg, ${CURTD} 0px, ${CURT} 15px, ${CURTL} 22px, ${CURT} 30px, ${CURTD} 44px)`;
        return (
          <div style={{ position: "absolute", left: WX - 34, top: WY - 30, width: WW + 68, height: WH + 60, zIndex: 20, pointerEvents: "none" }}>
            {/* valance / top drape lifting up */}
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 46, transform: `translateY(${-part * 70}px)`, opacity: 1 - part * 0.9, background: foldL, borderBottom: `4px solid ${GOLDY}`, boxShadow: "0 6px 12px rgba(0,0,0,0.4)", borderRadius: "6px 6px 0 0", zIndex: 3 }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -10, height: 12, background: `repeating-linear-gradient(90deg, ${GOLDY} 0px, ${GOLDY} 6px, ${GOLDD} 8px, ${GOLDY} 12px)`, clipPath: "polygon(0 0,100% 0,100% 40%,96% 100%,92% 40%,88% 100%,84% 40%,80% 100%,76% 40%,72% 100%,68% 40%,64% 100%,60% 40%,56% 100%,52% 40%,48% 100%,44% 40%,40% 100%,36% 40%,32% 100%,28% 40%,24% 100%,20% 40%,16% 100%,12% 40%,8% 100%,4% 40%,0 100%)" }} />
            </div>
            {/* left curtain half */}
            <div style={{ position: "absolute", left: 0, top: 0, width: halfW, height: "100%", transform: `translateX(${-part * (halfW + 20)}px)`, background: foldL, borderRight: `3px solid ${GOLDD}`, boxShadow: "inset -18px 0 30px rgba(0,0,0,0.4), 6px 0 18px rgba(0,0,0,0.35)", borderRadius: "4px 0 0 8px", zIndex: 2 }}>
              <div style={{ position: "absolute", right: 4, top: "46%", width: 18, height: 18, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, ${GOLDY}, ${GOLDD})`, opacity: Math.max(0, 1 - part * 2) }} />
            </div>
            {/* right curtain half */}
            <div style={{ position: "absolute", right: 0, top: 0, width: halfW, height: "100%", transform: `translateX(${part * (halfW + 20)}px)`, background: foldL, borderLeft: `3px solid ${GOLDD}`, boxShadow: "inset 18px 0 30px rgba(0,0,0,0.4), -6px 0 18px rgba(0,0,0,0.35)", borderRadius: "0 4px 8px 0", zIndex: 2 }}>
              <div style={{ position: "absolute", left: 4, top: "46%", width: 18, height: 18, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, ${GOLDY}, ${GOLDD})`, opacity: Math.max(0, 1 - part * 2) }} />
            </div>
          </div>
        );
      })()}

      {/* ================= LAYER 30 : PROUD DESIGNER MASCOT (beret, presenting) ================= */}
      {mIn > 0.01 && (() => {
        const wob = bob(lf, 4, 70, 0);
        const cheer = 0.25 + flourish * 0.35 + proud * 0.35;
        return (
          <div style={{ position: "absolute", left: 8, top: 470 + wob, width: 128, height: 200, transform: `scale(${Math.min(1.05, mIn)})`, transformOrigin: "50% 100%", opacity: Math.min(1, mIn), zIndex: 30, filter: "drop-shadow(0 14px 22px rgba(60,30,10,0.45))" }}>
            {/* the mascot itself */}
            <div style={{ position: "absolute", left: 4, top: 56, width: 120 }}>
              <Mascot lf={lf} size={120} tint={CLAY} gaze={5} cheer={cheer} stern={0} nodAmp={2.4} nodSpeed={6} />
            </div>
            {/* costume + presenting arm overlay */}
            <svg viewBox="0 0 128 200" style={{ position: "absolute", left: 0, top: 0, width: 128, height: 200, overflow: "visible" }}>
              {/* neckerchief (little scarf) */}
              <path d="M50 132 L78 132 L70 148 L58 148 Z" fill={CURTL} />
              <path d="M50 132 L64 140 L78 132 L72 138 L64 144 L56 138 Z" fill={GOLDY} opacity="0.9" />
              {/* beret */}
              <g transform={`rotate(-14 62 62)`}>
                <ellipse cx="62" cy="66" rx="30" ry="13" fill={CURT} />
                <path d="M34 64 Q62 40 90 64 Q62 56 34 64 Z" fill={CURTL} />
                <ellipse cx="62" cy="63" rx="30" ry="9" fill={CURTL} opacity="0.55" />
                <circle cx="86" cy="52" r="4.6" fill={GOLDY} />
              </g>
              {/* presenting arm swinging up toward the kit */}
              <g transform={`rotate(${armAngle} 96 128)`}>
                <rect x="90" y="90" width="15" height="46" rx="7.5" fill={CLAY} />
                <circle cx="97" cy="86" r="12" fill={CLAYD} />
                <circle cx="97" cy="86" r="8" fill={CLAY} />
              </g>
            </svg>
            {/* flourish sparkles off the hand */}
            <Sparkles lf={lf} at={26 / 30} x={104} y={64} n={9} spread={70} colors={[GOLDY, "#FFFFFF", BK[2]]} dur={0.9} />
          </div>
        );
      })()}

      {/* ================= reveal + kit-complete sparkle bursts ================= */}
      <Sparkles lf={lf} at={34 / 30} x={506} y={470} n={16} spread={260} colors={[GOLDY, "#FFFFFF", BK[0]]} dur={0.9} />
      <Sparkles lf={lf} at={oExport / 30} x={790} y={318} n={13} spread={150} colors={[GHGRN, "#FFFFFF", GOLD]} dur={0.85} />
      {proud > 0.02 && <Confetti lf={lf - 148} n={26} colors={[BK[0], BK[1], BK[2], BK[3], GOLDY]} top={280} h={420} />}

      {/* ================= LAYER 34 : foreground bokeh dust ================= */}
      {dust.map((d, i) => (
        <div key={`du${i}`} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: "50%", background: "rgba(255,236,200,0.9)", opacity: d.op, filter: "blur(3px)", zIndex: 34 }} />
      ))}

      <Vignette strength={0.42} shape="76% 66% at 50% 44%" />
      <Grain op={0.05} />
    </div>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const N = 15;
  const cx = 506;

  // ---- brand-kit palettes (accent + 5 swatches) ----
  const P = [
    { a: "#E07A45", sw: ["#F4C89A", "#E07A45", "#B8501F", "#7A3410", "#2A1608"] },
    { a: "#4FBE93", sw: ["#BFE6D2", "#5FC79A", "#3F9E74", "#2A6E50", "#123528"] },
    { a: "#5AA0DE", sw: ["#CBE3F7", "#7FBEF0", "#5AA0DE", "#3A6FA8", "#16324F"] },
    { a: "#9E7BC8", sw: ["#E1D4F2", "#B79BE0", "#9E7BC8", "#6E4E9E", "#2E2048"] },
    { a: "#E7B24C", sw: ["#F6E3AE", "#EEC96E", "#E7B24C", "#A87E2A", "#4A360F"] },
    { a: "#E27BA0", sw: ["#F7D6E4", "#EFA6C2", "#E27BA0", "#A85675", "#4A2233"] },
    { a: "#D65C48", sw: ["#F2C2B8", "#E0806F", "#C44A3A", "#8A2E22", "#3A130E"] },
    { a: "#4FB0C9", sw: ["#C9EEF4", "#7FD4E4", "#4FB0C9", "#2E7488", "#123038"] },
    { a: "#9CC456", sw: ["#E2EFC0", "#B7D46E", "#8AB24C", "#5E7A2E", "#28340F"] },
    { a: "#6C7BE0", sw: ["#D4D8F7", "#9BA6EF", "#6C7BE0", "#414EA8", "#1E2450"] },
  ];
  const NAMES = ["nova", "mint", "azure", "orchid", "amber", "blush", "ember", "teal", "lime", "indigo", "flux", "sage", "coral", "plum", "honey"];

  // ---- fanning grid slots (5 cols x 3 rows) ----
  const colX = [182, 340, 500, 660, 818];
  const rowY = [212, 350, 488];
  const slot = (i: number) => {
    const c = i % 5, r = (i / 5) | 0;
    return { x: colX[c] + (seed(i * 1.3) - 0.5) * 22, y: rowY[r] + (seed(i * 2.7) - 0.5) * 16 };
  };

  // ---- birth order: fill center-out, accelerating ----
  const order = Array.from({ length: N }, (_, i) => i).sort((a, b) =>
    (Math.hypot((a % 5) - 2, ((a / 5) | 0) - 1)) - (Math.hypot((b % 5) - 2, ((b / 5) | 0) - 1)));
  const rank: number[] = new Array(N);
  order.forEach((s, p) => { rank[s] = p; });
  const births: number[] = [];
  { let acc = fr(0.2); for (let p = 0; p < N; p++) { births.push(acc); acc += Math.max(2.4, 8.5 - p * 0.42); } }
  const birthOf = (i: number) => births[rank[i]];

  // wand tip = conjure origin
  const ox = 300, oy = 470;

  // most-recent flick -> mascot swish + emit
  let lastBirth = -99;
  for (let p = 0; p < N; p++) if (births[p] <= lf) lastBirth = births[p];
  const sinceFlick = lf - lastBirth;
  const flick = sinceFlick >= 0 && sinceFlick < 9 ? Math.sin((sinceFlick / 9) * Math.PI) : 0;

  const born = births.filter((b) => lf >= b).length;
  const sinceInc = born > 0 ? lf - births[born - 1] : 99;
  const cbump = sinceInc >= 0 && sinceInc < 6 ? Math.sin((sinceInc / 6) * Math.PI) * 0.16 : 0;

  // floating dust / spark motes drifting up in the warm light
  const motes = Array.from({ length: 20 }).map((_, i) => {
    const life = 150 + seed(i) * 90;
    const t = ((lf + seed(i * 3.3) * life) % life) / life;
    const x = seed(i * 1.7) * 1012 + Math.sin(lf / 22 + i) * 24;
    const y = 760 - t * 720;
    const s = 1.5 + seed(i * 2.1) * 3.4;
    return { x, y, s, op: (1 - Math.abs(t - 0.5) * 1.6) * 0.55, warm: seed(i * 4.4) > 0.4 };
  });

  // ---- conveyor belt geometry (Willy-Wonka factory line) ----
  const beltL = 196, beltR = 946, beltTop = 590, beltH = 58;
  const beltMid = beltTop + beltH / 2;
  const treadN = 30, treadSp = (beltR - beltL + 60) / treadN;
  const rollSpin = lf * 4.2;

  // belt-riding finished kits (endless stream, always moving)
  const beltKits = Array.from({ length: 6 }).map((_, i) => {
    const span = beltR - beltL + 200;
    const raw = (lf * 1.5 + i * (span / 6)) % span;
    const x = beltL - 60 + raw;
    const pal = P[(i * 3 + 1) % 10];
    return { x, pal, i };
  });

  return (
    <>
      {/* ===== warm magical workshop backdrop ===== */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(162deg,#211533 0%,#180F26 46%,#120B1C 78%,#0E0916 100%)", zIndex: 0 }} />
      {/* amber hearth glow behind the belt */}
      <div style={{ position: "absolute", left: cx - 460, top: 340, width: 920, height: 460, background: "radial-gradient(ellipse 50% 66% at 50% 60%, rgba(224,150,70,0.20), transparent 72%)", zIndex: 0 }} />
      {/* violet conjuring glow around the wand */}
      <div style={{ position: "absolute", left: ox - 320, top: oy - 260, width: 640, height: 560, background: "radial-gradient(ellipse 46% 52% at 50% 50%, rgba(158,123,200,0.22), transparent 70%)", zIndex: 0 }} />

      {/* warm god-ray from the top */}
      <SpotCone x={cx + 40} top={-70} topW={100} botW={760} h={560} color="rgba(240,200,120,0.09)" sway={6} lf={lf} pool={0} />

      {/* ===== environment SVG: back wall, shelves, runes, conveyor ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {/* faint arcane wall grid */}
        {Array.from({ length: 15 }).map((_, i) => <line key={`gv${i}`} x1={i * 72} y1={0} x2={i * 72} y2={792} stroke="rgba(170,140,210,0.045)" strokeWidth={1} />)}
        {Array.from({ length: 12 }).map((_, i) => <line key={`gh${i}`} x1={0} y1={i * 72} x2={1012} y2={i * 72} stroke="rgba(170,140,210,0.045)" strokeWidth={1} />)}

        {/* back-wall shelves lined with finished brand kits (dim depth layer) */}
        {[96, 150].map((sy, r) => (
          <g key={`shelf${r}`} opacity={0.3}>
            <line x1={40} y1={sy + 22} x2={972} y2={sy + 22} stroke="rgba(200,170,120,0.28)" strokeWidth={2} />
            {Array.from({ length: 16 }).map((_, i) => {
              const kx = 52 + i * 57;
              const pc = P[(i + r * 3) % 10].a;
              return (
                <g key={`sk${r}${i}`}>
                  <rect x={kx} y={sy} width={44} height={22} rx={3} fill="#1A1226" stroke="#2E2440" strokeWidth={1} />
                  <rect x={kx + 4} y={sy + 5} width={12} height={12} rx={2.5} fill={pc} opacity={0.9} />
                  <rect x={kx + 20} y={sy + 6} width={20} height={3} rx={1.5} fill={pc} opacity={0.6} />
                  <rect x={kx + 20} y={sy + 12} width={14} height={3} rx={1.5} fill="#4A3D5E" />
                </g>
              );
            })}
          </g>
        ))}

        {/* rotating arcane rune ring behind the wizard's floor */}
        <g transform={`translate(150 700) rotate(${lf * 0.5})`} opacity={0.5}>
          <circle r={116} fill="none" stroke="rgba(200,160,240,0.20)" strokeWidth={2} strokeDasharray="4 12" />
          <circle r={92} fill="none" stroke="rgba(224,150,70,0.16)" strokeWidth={1.5} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <rect key={`rn${i}`} x={-3} y={-108} width={6} height={12} rx={2} fill="rgba(214,180,120,0.4)" transform={`rotate(${(a * 180) / Math.PI})`} />;
          })}
        </g>

        {/* ===== the conveyor belt ===== */}
        {/* belt support legs */}
        <rect x={beltL + 40} y={beltMid} width={12} height={150} rx={3} fill="#0E0916" opacity={0.7} />
        <rect x={beltR - 90} y={beltMid} width={12} height={150} rx={3} fill="#0E0916" opacity={0.7} />
        {/* belt body */}
        <rect x={beltL} y={beltTop} width={beltR - beltL} height={beltH} rx={10} fill="#171021" stroke="#2C2238" strokeWidth={2} />
        {/* moving tread chevrons (clipped) */}
        <clipPath id="beltclip"><rect x={beltL + 2} y={beltTop + 2} width={beltR - beltL - 4} height={beltH - 4} rx={9} /></clipPath>
        <g clipPath="url(#beltclip)">
          <rect x={beltL} y={beltTop} width={beltR - beltL} height={beltH} fill="url(#beltgrad)" />
          {Array.from({ length: treadN }).map((_, i) => {
            const x = beltL - 40 + i * treadSp + ((lf * 1.5) % treadSp);
            return <polygon key={`tr${i}`} points={`${x},${beltTop} ${x + 16},${beltTop} ${x - 14},${beltTop + beltH} ${x - 30},${beltTop + beltH}`} fill="rgba(150,120,190,0.10)" />;
          })}
          {/* top-edge sheen */}
          <rect x={beltL} y={beltTop + 3} width={beltR - beltL} height={6} fill="rgba(255,230,180,0.10)" />
        </g>
        <defs>
          <linearGradient id="beltgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#221934" />
            <stop offset="1" stopColor="#140D1F" />
          </linearGradient>
        </defs>
        {/* rollers */}
        {[beltL, beltR].map((rx, ri) => (
          <g key={`roll${ri}`} transform={`translate(${rx} ${beltMid})`}>
            <circle r={31} fill="#1C1428" stroke="#3A2E4E" strokeWidth={3} />
            <circle r={31} fill="none" stroke="rgba(224,150,70,0.25)" strokeWidth={2} />
            <g transform={`rotate(${ri === 0 ? rollSpin : -rollSpin})`}>
              {Array.from({ length: 6 }).map((_, k) => (
                <rect key={k} x={-2} y={-26} width={4} height={22} rx={2} fill="rgba(180,150,210,0.35)" transform={`rotate(${k * 60})`} />
              ))}
              <circle r={6} fill="#4A3A60" />
            </g>
          </g>
        ))}

        {/* bokeh orbs in the warm haze */}
        {Array.from({ length: 6 }).map((_, i) => {
          const bx = seed(i * 2.3) * 1012, by = 200 + seed(i * 4.1) * 420, r = 34 + seed(i * 1.1) * 72;
          return <circle key={`bk${i}`} cx={bx + Math.sin(lf / 38 + i) * 14} cy={by} r={r} fill={i % 2 ? "rgba(224,150,70,0.05)" : "rgba(158,123,200,0.06)"} />;
        })}

        {/* conjuring magic circle at the wand tip */}
        <g transform={`translate(${ox} ${oy})`} opacity={0.35 + flick * 0.55}>
          <g transform={`rotate(${lf * 1.4})`}>
            <circle r={58} fill="none" stroke="rgba(240,200,120,0.5)" strokeWidth={1.5} strokeDasharray="3 9" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`mr${i}`} x={-2} y={-52} width={4} height={9} rx={2} fill="rgba(224,180,120,0.6)" transform={`rotate(${i * 45})`} />
            ))}
          </g>
          <g transform={`rotate(${-lf * 2})`}>
            <circle r={40} fill="none" stroke="rgba(200,160,240,0.55)" strokeWidth={1.5} strokeDasharray="2 7" />
          </g>
        </g>
      </svg>

      {/* drifting dust / spark motes */}
      {motes.map((d, i) => (
        <div key={`mote${i}`} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: "50%", background: d.warm ? "rgba(240,200,130,0.85)" : "rgba(198,166,232,0.75)", boxShadow: d.warm ? "0 0 6px rgba(240,200,130,0.6)" : "0 0 6px rgba(198,166,232,0.5)", opacity: Math.max(0, d.op), zIndex: 2 }} />
      ))}

      {/* ===== belt-riding finished kits (endless factory stream) ===== */}
      {beltKits.map((bk) => {
        const rideBob = Math.sin(lf / 8 + bk.i) * 2;
        return (
          <div key={`belt${bk.i}`} style={{ position: "absolute", left: bk.x - 34, top: beltTop - 42 + rideBob, width: 68, height: 42, transformOrigin: "50% 100%", transform: `rotate(${Math.sin(lf / 12 + bk.i) * 2}deg)`, zIndex: 3 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: "linear-gradient(160deg,#1B1426 0%,#100B18 100%)", border: "1px solid #322845", boxShadow: `0 6px 12px rgba(0,0,0,0.5), 0 0 10px ${bk.pal.a}33`, padding: 6, boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 13, height: 13, borderRadius: 4, background: bk.pal.a }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: `${bk.pal.a}88` }} />
              </div>
              <div style={{ display: "flex", gap: 2.5, marginTop: 6 }}>
                {bk.pal.sw.map((s, k) => <div key={k} style={{ flex: 1, height: 8, borderRadius: 2, background: s }} />)}
              </div>
            </div>
            {/* contact shadow on belt */}
            <div style={{ position: "absolute", left: 8, top: 44, width: 52, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.4)", filter: "blur(3px)" }} />
          </div>
        );
      })}

      {/* ===== emit ring + flare at the wand tip ===== */}
      {flick > 0.02 && (
        <>
          <div style={{ position: "absolute", left: ox - 78, top: oy - 78, width: 156, height: 156, borderRadius: "50%", border: `3px solid rgba(240,200,120,${flick * 0.85})`, boxShadow: `0 0 26px rgba(240,190,110,${flick * 0.7})`, transform: `scale(${0.3 + (1 - flick) * 1.35})`, zIndex: 6 }} />
          <div style={{ position: "absolute", left: ox - 18, top: oy - 18, width: 36, height: 36, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,244,210,${flick}) 0%, rgba(240,190,110,${flick * 0.5}) 55%, transparent 75%)`, zIndex: 6 }} />
        </>
      )}

      {/* ===== the fanning gallery: conjured brand-kit cards ===== */}
      {Array.from({ length: N }).map((_, i) => {
        const b = birthOf(i);
        const app = over(lf, b, 12, Easing.out(Easing.back(1.55)));
        const pos = over(lf, b, 14, Easing.out(Easing.cubic));
        const op = over(lf, b, 4);
        if (op < 0.01) return null;
        const pal = P[i % 10];
        const tgt = slot(i);
        const x = ox + (tgt.x - ox) * pos;
        const y = oy + (tgt.y - oy) * pos - Math.sin(pos * Math.PI) * 96;
        const landed = lf > b + 14;
        const by = landed ? Math.sin(lf / 15 + i) * 3 : 0;
        const sc = 0.24 + 0.76 * app;
        const tilt = (seed(i * 3.9) - 0.5) * 7;
        const spin = (seed(i * 2.1) - 0.5) * 74;
        const rot = spin * (1 - pos) + tilt * (landed ? 0.5 + Math.sin(lf / 24 + i) * 0.5 : 1);
        const glow = landed ? 0.5 + Math.sin(lf / 10 + i) * 0.28 : 0.95;
        const starC = (seed(i * 5.5) * 9 + 0.6).toFixed(1);
        const barW = 22 + seed(i * 6.7) * 46;
        const mk = i % 4;
        return (
          <div key={`kit${i}`} style={{ position: "absolute", left: x - 75, top: y - 46 + by, width: 150, height: 92, transformOrigin: "50% 50%", transform: `scale(${sc}) rotate(${rot}deg)`, opacity: op, zIndex: landed ? 5 : 7 }}>
            {/* glow aura */}
            <div style={{ position: "absolute", left: -14, top: -14, width: 178, height: 120, borderRadius: 18, background: `radial-gradient(ellipse at 50% 40%, ${pal.a}${Math.round(glow * 96).toString(16).padStart(2, "0")}, transparent 70%)`, filter: "blur(8px)", zIndex: -1 }} />
            {/* card body */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "linear-gradient(160deg,#1A1326 0%,#0F0A18 100%)", border: "1px solid #322845", boxShadow: `0 12px 24px rgba(0,0,0,0.5), 0 0 16px ${pal.a}3A, inset 0 1px 0 rgba(255,255,255,0.06)`, padding: "9px 10px", boxSizing: "border-box", overflow: "hidden" }}>
              {/* header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width={20} height={20} viewBox="0 0 20 20">
                  <rect x={0} y={0} width={20} height={20} rx={6} fill={pal.a} />
                  {mk === 0 && <circle cx={10} cy={10} r={5} fill="#0F0A18" />}
                  {mk === 1 && <rect x={5} y={5} width={10} height={10} rx={2.5} fill="#0F0A18" />}
                  {mk === 2 && <polygon points="10,4 16,15 4,15" fill="#0F0A18" />}
                  {mk === 3 && <rect x={10} y={3} width={9} height={9} rx={2} fill="#0F0A18" transform="rotate(45 10 10)" />}
                </svg>
                <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: "#D6CBE4", letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden" }}>{NAMES[i]}-kit</span>
                <div style={{ marginLeft: "auto", fontFamily: mono, fontSize: 7.5, fontWeight: 700, color: pal.a, border: `1px solid ${pal.a}77`, background: `${pal.a}1F`, borderRadius: 6, padding: "1px 5px", lineHeight: 1.3 }}>NEW</div>
              </div>
              {/* swatch row */}
              <div style={{ display: "flex", gap: 4, marginTop: 9 }}>
                {pal.sw.map((s, k) => <div key={k} style={{ width: 22, height: 15, borderRadius: 4, background: s, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }} />)}
              </div>
              {/* footer: language dot + bar + star */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 9 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: pal.a }} />
                <div style={{ width: barW, height: 4, borderRadius: 3, background: `linear-gradient(90deg, ${pal.a}, ${pal.sw[3]})` }} />
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3, fontFamily: mono, fontSize: 9.5, color: "#9A8CB0", fontWeight: 600 }}>
                  <svg width={10} height={10} viewBox="0 0 10 10"><polygon points="5,0 6.3,3.4 10,3.6 7.1,5.9 8.1,9.5 5,7.4 1.9,9.5 2.9,5.9 0,3.6 3.7,3.4" fill={GOLD} /></svg>
                  {starC}k
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== conjure sparkles at the wand tip on each flick ===== */}
      {lastBirth >= 0 && <Sparkles lf={lf} at={lastBirth / 30} x={ox} y={oy} n={12} spread={78} colors={["#F0C878", GOLD, "#C6A6E8", "#FCEDDD", "#E7B24C"]} dur={0.55} />}

      {/* ===== the wizard Claude mascot (built-in robe + starred hat) ===== */}
      <div style={{ position: "absolute", left: 24, top: 546, zIndex: 8, transformOrigin: "60% 100%", transform: `rotate(${flick * -5}deg) scale(${1 + flick * 0.05})` }}>
        <Mascot lf={lf} size={130} wizard={1} cheer={0.34 + flick * 0.5} nodAmp={2} nodSpeed={7} gaze={0.62} />
      </div>

      {/* magic wand (from mascot hand to conjure tip) */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none" }}>
        <g transform={`rotate(${flick * -12} 150 616)`}>
          <line x1={150} y1={616} x2={ox} y2={oy} stroke="#2A1D18" strokeWidth={8} strokeLinecap="round" />
          <line x1={150} y1={616} x2={ox} y2={oy} stroke="#5A3E28" strokeWidth={4.5} strokeLinecap="round" />
          {/* wand tip star */}
          <g transform={`translate(${ox} ${oy})`}>
            <circle r={9 + flick * 6} fill="rgba(255,244,210,0.9)" style={{ filter: `drop-shadow(0 0 ${8 + flick * 14}px rgba(240,200,120,0.95))` }} />
            <polygon points={`0,${-16 - flick * 8} 4,-4 16,0 4,4 0,${16 + flick * 8} -4,4 -16,0 -4,-4`} fill="#FFF4D2" opacity={0.9} />
          </g>
        </g>
      </svg>

      {/* ===== abundance counter HUD ===== */}
      <div style={{ position: "absolute", left: 720, top: 92, transform: `scale(${1 + cbump})`, transformOrigin: "100% 50%", zIndex: 10, display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 11, background: "linear-gradient(180deg, rgba(30,20,44,0.94), rgba(18,12,26,0.94))", border: "1.5px solid rgba(224,180,120,0.5)", boxShadow: "0 6px 18px rgba(0,0,0,0.45), 0 0 16px rgba(224,180,120,0.25)" }}>
        <svg width={16} height={16} viewBox="0 0 16 16"><polygon points="8,0 10,5.4 16,5.7 11.3,9.4 12.9,15.2 8,11.8 3.1,15.2 4.7,9.4 0,5.7 6,5.4" fill={GOLD} /></svg>
        <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 800, color: "#F1E7D6", letterSpacing: -0.4 }}>{born}</span>
        <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, color: "#A08FB4", letterSpacing: 0.3 }}>brand kits</span>
      </div>

      {/* ===== color-chip confetti raining from the conjuring ===== */}
      {lf > fr(0.3) && <Confetti lf={lf} n={32} colors={["#E07A45", "#4FBE93", "#5AA0DE", "#9E7BC8", "#E7B24C", "#E27BA0", "#4FB0C9", GOLD, "#F0C878", "#FCEDDD"]} top={-30} h={900} />}

      {/* warm embers rising off the belt */}
      <Embers lf={lf} n={14} base={0.42} />

      {/* finishing atmosphere */}
      <Vignette strength={0.36} shape="66% 60% at 50% 46%" />
      <Grain op={0.045} />
    </>
  );
};

const BrandCTA: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= CHAPTER 8 — GAME-SHOW JACKPOT WIN (own full panel) =================
  const W = 1012, H = P_H, cx = W / 2;

  // celebration palette (warm-on-dark, distinct from every prior tech scene)
  const PLUM = "#1C0A24", ROY = "#3A1147", MAG = "#7A2E6B", GLD = GOLD, GLDL = "#FFE9A8";

  // ---- global beats ----
  const flash = Math.max(0, 1 - over(lf, 0, 11));                 // open bloom
  const bgIn = over(lf, 0, 18, Easing.out(Easing.cubic));
  const rayRot = lf * 0.5;                                        // spinning WINNER starburst
  const beat = 1 + 0.03 * Math.sin(lf * 0.22);
  const push = 1 + 0.02 * Math.sin(lf * 0.16);                   // slow camera breathe
  const shake = lf < 14 ? (1 - lf / 14) * Math.sin(lf * 3) * 4 : 0; // jackpot jolt

  // ---- element springs ----
  const wS = Math.min(1.06, spr(lf, 4, 12, 210));                // BRAND wordmark
  const wDrop = (1 - Math.min(1, wS)) * -60;
  const cS = Math.min(1.05, spr(lf, 12, 13, 200));               // hero repo card
  const cDrop = (1 - Math.min(1, cS)) * 46;
  const podIn = over(lf, 14, 12, Easing.out(Easing.back(1.4)));  // podium rise
  const mIn = over(lf, 20, 13, Easing.out(Easing.back(1.5)));    // mascot onto podium
  const badgeIn = over(lf, 24, 12, Easing.out(Easing.back(2.0)));// WINNER rosette
  const pS = Math.min(1.05, spr(lf, 30, 12, 210));               // comment pill
  const crownIn = over(lf, 30, 10, Easing.out(Easing.back(2.2)));// champion crown

  // ---- star counter ticking up (jackpot roll) ----
  const starTgt = 2437;
  const starP = over(lf, 14, 32, Easing.out(Easing.cubic));
  const starNow = Math.floor(starTgt * starP);
  const starLabel = starNow >= 1000 ? (starNow / 1000).toFixed(1) + "k" : String(starNow);
  const starPop = Math.max(0, 1 - Math.abs(lf - 46) / 8);        // sparkle when it lands
  const rolling = starP < 0.98;

  const cardTop = 190 + cDrop;
  const PODY = 600;                                              // podium top surface
  const mSize = 142;

  // ---- marquee bulbs chasing around the panel border (classic game-show stage) ----
  const per: number[][] = [];
  const inset = 22, gap = 46;
  for (let x = inset; x <= W - inset; x += gap) per.push([x, inset]);
  for (let y = inset + gap; y <= H - inset; y += gap) per.push([W - inset, y]);
  for (let x = W - inset - gap; x >= inset; x -= gap) per.push([x, H - inset]);
  for (let y = H - inset - gap; y > inset; y -= gap) per.push([inset, y]);

  // ---- falling gold coins (jackpot payout) ----
  const coins = Array.from({ length: 16 }).map((_, i) => {
    const r1 = seed(i * 3.7 + 5), r2 = seed(i * 2.1 + 1);
    const x = 60 + r1 * (W - 120);
    const y = (lf * (2.6 + r2 * 2.4) + r1 * H) % (H + 60) - 40;
    const rr = 9 + r2 * 7;
    const flip = 0.4 + 0.6 * Math.abs(Math.sin(lf * (0.14 + r1 * 0.1) + i));
    const op = (0.55 + r2 * 0.35) * bgIn;
    return { x, y, rr, flip, op };
  });

  // ---- floating brand assets (hex swatches drifting up) ----
  const swatch = [GRNL, SKY, GLD, CLAY, PINK];

  return (
    <div style={{
      position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H,
      borderRadius: 36, overflow: "hidden",
      transform: `scale(${push}) translateX(${shake}px)`, transformOrigin: "50% 46%",
      background: "linear-gradient(176deg,#2A0F33 0%,#3A1147 42%,#160820 100%)",
      boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 220px rgba(0,0,0,0.6)",
    }}>
      {/* ============ deep vector backdrop ============ */}
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, display: "block" }}>
        <defs>
          <radialGradient id="cta_dome" cx="50%" cy="26%" r="82%">
            <stop offset="0%" stopColor="#5E2166" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#2C1038" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#160820" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cta_gold" cx="50%" cy="52%" r="52%">
            <stop offset="0%" stopColor={GLDL} stopOpacity="0.55" />
            <stop offset="55%" stopColor={GLD} stopOpacity="0.16" />
            <stop offset="100%" stopColor={GLD} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cta_stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A1A54" stopOpacity="0" />
            <stop offset="100%" stopColor="#0E0518" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cta_pod" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE9A8" />
            <stop offset="45%" stopColor="#E7B24C" />
            <stop offset="100%" stopColor="#9A6E1E" />
          </linearGradient>
          <radialGradient id="cta_pool" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor={GLDL} stopOpacity="0.5" />
            <stop offset="100%" stopColor={GLDL} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#cta_dome)" />
        <rect x="0" y={H - 320} width={W} height="320" fill="url(#cta_stage)" />

        {/* spinning WINNER starburst rays behind everything */}
        <g opacity={0.16 * bgIn} transform={`rotate(${rayRot} ${cx} 330)`}>
          {Array.from({ length: 30 }).map((_, i) => {
            const a = (i / 30) * Math.PI * 2;
            return <line key={i} x1={cx + Math.cos(a) * 40} y1={330 + Math.sin(a) * 40} x2={cx + Math.cos(a) * 900} y2={330 + Math.sin(a) * 900} stroke={i % 2 ? GLDL : MAG} strokeWidth={i % 2 ? 9 : 4} />;
          })}
        </g>

        {/* big gold glow pooling on the champion */}
        <ellipse cx={cx} cy={PODY - 90} rx={460} ry={360} fill="url(#cta_gold)" opacity={bgIn} />

        {/* stage floor light pool under podium */}
        <ellipse cx={cx} cy={PODY + 6} rx={300 * podIn} ry={54 * podIn} fill="url(#cta_pool)" opacity={0.9 * podIn} />

        {/* ---- podium (1st-place riser) ---- */}
        {podIn > 0.02 && (() => {
          const pw = 172, pTop = PODY, pBot = PODY + 128, riseY = (1 - podIn) * 130;
          return (
            <g transform={`translate(0 ${riseY})`} opacity={podIn}>
              {/* top surface */}
              <polygon points={`${cx - pw},${pTop} ${cx + pw},${pTop} ${cx + pw - 22},${pTop + 16} ${cx - pw + 22},${pTop + 16}`} fill="#FFF3CE" />
              {/* front face */}
              <rect x={cx - pw + 22} y={pTop + 16} width={(pw - 22) * 2} height={pBot - pTop - 16} rx={6} fill="url(#cta_pod)" />
              {/* trims */}
              <rect x={cx - pw + 22} y={pTop + 16} width={(pw - 22) * 2} height="5" fill="#FFF6D8" opacity="0.9" />
              <rect x={cx - pw + 30} y={pTop + 44} width={(pw - 30) * 2} height="3" fill="#7A5410" opacity="0.5" />
              {/* medallion "1" on the face */}
              <circle cx={cx} cy={pTop + 82} r="30" fill="#3A1147" stroke="#FFF3CE" strokeWidth="3" />
              <text x={cx} y={pTop + 94} textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="38" fill={GLDL}>1</text>
            </g>
          );
        })()}

        {/* falling gold coins (jackpot) */}
        {coins.map((c, i) => (
          <g key={i} opacity={c.op}>
            <ellipse cx={c.x} cy={c.y} rx={c.rr * c.flip} ry={c.rr} fill={GLD} stroke={GLDL} strokeWidth="1.5" />
            <ellipse cx={c.x} cy={c.y} rx={c.rr * c.flip * 0.55} ry={c.rr * 0.6} fill="none" stroke="#8A6018" strokeWidth="1" opacity="0.6" />
          </g>
        ))}

        {/* drifting hex-swatch brand assets (product texture) */}
        {swatch.map((c, i) => {
          const r1 = seed(i * 5.3 + 2);
          const x = 90 + i * 190 + Math.sin(lf * 0.03 + i) * 22;
          const y = (H - ((lf * (0.7 + r1 * 0.5) + r1 * H) % (H + 120)) - 40);
          const op = 0.5 * bgIn * (0.4 + 0.6 * Math.sin(lf * 0.04 + i));
          return (
            <g key={`sw${i}`} opacity={Math.max(0, op)} transform={`rotate(${Math.sin(lf * 0.02 + i) * 14} ${x} ${y})`}>
              <rect x={x - 16} y={y - 16} width="32" height="32" rx="8" fill={c} />
              <rect x={x - 16} y={y - 16} width="32" height="32" rx="8" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            </g>
          );
        })}
      </svg>

      {/* ============ sweeping stage spotlights (HTML SpotCones over svg) ============ */}
      <SpotCone x={cx} top={-40} topW={70} botW={420} h={640} color="rgba(255,233,168,0.18)" sway={0.6} lf={lf} pool={0.12} />
      <SpotCone x={cx - 250} top={-30} topW={40} botW={240} h={600} color="rgba(122,46,107,0.16)" sway={1.4} lf={lf} />
      <SpotCone x={cx + 250} top={-30} topW={40} botW={240} h={600} color="rgba(95,160,222,0.13)" sway={-1.4} lf={lf + 22} />
      <SpotCone x={cx - 130} top={-30} topW={36} botW={200} h={580} color="rgba(231,178,76,0.12)" sway={2.0} lf={lf + 40} />

      {/* ============ marquee bulbs chasing the border ============ */}
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, display: "block", zIndex: 20, pointerEvents: "none" }}>
        {per.map((p, i) => {
          const b = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(i * 0.5 - lf * 0.42));
          const c = i % 2 ? GLDL : "#FFC9E8";
          return (
            <g key={i} opacity={bgIn * b}>
              <circle cx={p[0]} cy={p[1]} r={9} fill={c} opacity={0.25} />
              <circle cx={p[0]} cy={p[1]} r={5} fill={c} style={{ filter: `drop-shadow(0 0 ${4 + b * 8}px ${c})` }} />
            </g>
          );
        })}
      </svg>

      {/* ============ WINNER rosette badge (top-right) ============ */}
      {badgeIn > 0.02 && (
        <div style={{ position: "absolute", left: 812, top: 96, width: 150, height: 150, transform: `scale(${badgeIn}) rotate(${Math.sin(lf * 0.06) * 6}deg)`, transformOrigin: "50% 50%", zIndex: 45 }}>
          <svg viewBox="0 0 150 150" width="150" height="150">
            {/* zig-zag rosette */}
            <polygon points={Array.from({ length: 48 }).map((_, i) => {
              const a = (i / 48) * Math.PI * 2, r = i % 2 ? 74 : 62;
              return `${75 + Math.cos(a) * r},${75 + Math.sin(a) * r}`;
            }).join(" ")} fill={GLD} stroke={GLDL} strokeWidth="2" transform={`rotate(${lf * 1.1} 75 75)`} />
            <circle cx="75" cy="75" r="52" fill="#3A1147" stroke={GLDL} strokeWidth="3" />
            <text x="75" y="70" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="19" fill={GLDL} letterSpacing="1">WINNER</text>
            <text x="75" y="96" textAnchor="middle" fontSize="20" fill={GLDL}>★</text>
          </svg>
          {/* ribbon tails */}
          <div style={{ position: "absolute", left: 52, top: 128, width: 16, height: 34, background: "linear-gradient(180deg,#E7B24C,#9A6E1E)", clipPath: "polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)" }} />
          <div style={{ position: "absolute", left: 82, top: 128, width: 16, height: 34, background: "linear-gradient(180deg,#E7B24C,#9A6E1E)", clipPath: "polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)" }} />
        </div>
      )}

      {/* ============ BRAND wordmark ============ */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 92 + wDrop, textAlign: "center",
        transform: `scale(${wS})`, transformOrigin: "50% 50%", opacity: Math.min(1, wS * 1.5), zIndex: 40,
      }}>
        <div style={{
          display: "inline-block", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104,
          letterSpacing: 6, lineHeight: 1,
          background: "linear-gradient(180deg,#FFFFFF 0%,#FFE9A8 52%,#E7B24C 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          filter: "drop-shadow(0 6px 22px rgba(231,178,76,0.6))",
        }}>BRAND</div>
      </div>

      {/* ============ HERO REPO CARD ============ */}
      <div style={{
        position: "absolute", left: cx - 296, top: cardTop, width: 592,
        transform: `scale(${cS})`, transformOrigin: "50% 0", opacity: Math.min(1, cS * 1.5), zIndex: 50,
      }}>
        <div style={{
          borderRadius: 22, padding: 24,
          background: "linear-gradient(165deg,#20142A 0%,#160C1F 100%)",
          border: "1.5px solid #4A2E52",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8), 0 0 40px rgba(231,178,76,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}>
          {/* header row: mark + owner/repo + Public + NEW */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: "#0D0916", border: "1px solid #3A2A44", display: "flex", alignItems: "center", justifyContent: "center", gap: 3, boxShadow: "inset 0 0 14px rgba(0,0,0,0.6)" }}>
              {[CLAY, GRNL, GLD].map((c, i) => <div key={i} style={{ width: 8, height: 22, borderRadius: 2, background: c }} />)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, lineHeight: 1, flex: 1 }}>
              <span style={{ fontFamily: mono, fontSize: 25, color: "#fff", fontWeight: 600 }}>claude<span style={{ color: "rgba(210,200,225,0.5)" }}>/</span><span style={{ color: GRNL }}>brand-studio</span></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: "#9DE7C0", padding: "2px 9px", borderRadius: 999, border: "1px solid rgba(111,211,160,0.4)" }}>Public</span>
                <span style={{ fontFamily: mono, fontSize: 13, color: GLD, padding: "2px 9px", borderRadius: 999, background: "rgba(231,178,76,0.16)", border: "1px solid rgba(231,178,76,0.55)" }}>NEW</span>
              </span>
            </div>
          </div>

          {/* description */}
          <div style={{ fontFamily: inter.fontFamily, fontSize: 17, color: "rgba(224,214,236,0.82)", marginTop: 14, lineHeight: 1.35 }}>
            Turn Claude into a full brand studio: logo, 5 styles, color codes, fonts.
          </div>

          {/* language row + bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: GRNL }} />
            <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(224,214,236,0.72)" }}>Brand Kit</span>
            <div style={{ flex: 1, height: 7, borderRadius: 4, overflow: "hidden", display: "flex", background: "#0D0916" }}>
              <div style={{ width: "72%", background: GRNL }} />
              <div style={{ width: "18%", background: SKY }} />
              <div style={{ width: "10%", background: GLD }} />
            </div>
          </div>

          {/* button row: Code + Star + Fork */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 22px", borderRadius: 12,
              background: "linear-gradient(180deg,#3FB07F,#2E8B62)", border: "1px solid #57C795",
              transform: `scale(${beat})`, boxShadow: "0 8px 22px -6px rgba(63,158,116,0.7)",
            }}>
              <span style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 4, height: 14, borderRadius: 1, background: "#fff", opacity: 0.9, transform: `scaleY(${i === 1 ? 1 : 0.7})` }} />)}
              </span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "#fff" }}>Code</span>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 16px", borderRadius: 12, background: "#0D0916", border: `1px solid ${starPop > 0.05 ? GLD : "#3A2A44"}`, transform: `scale(${1 + (rolling ? 0.02 * Math.sin(lf * 0.9) : 0) + starPop * 0.06})`, boxShadow: starPop > 0.05 ? "0 0 22px rgba(231,178,76,0.65)" : "none" }}>
              <span style={{ color: GLD, fontSize: 20, filter: `drop-shadow(0 0 ${6 + starPop * 12}px rgba(231,178,76,0.9))` }}>★</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#fff", minWidth: 56 }}>{starLabel}</span>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 16px", borderRadius: 12, background: "#0D0916", border: "1px solid #3A2A44", transform: `scale(${1 + 0.035 * Math.sin(lf * 0.26 + 1.6)})` }}>
              <svg viewBox="0 0 16 16" width={18} height={18}>
                <circle cx="4" cy="3" r="2" fill="none" stroke={SKY} strokeWidth="1.6" />
                <circle cx="12" cy="3" r="2" fill="none" stroke={SKY} strokeWidth="1.6" />
                <circle cx="8" cy="13" r="2" fill="none" stroke={SKY} strokeWidth="1.6" />
                <path d="M4 5 v2 a4 4 0 0 0 4 4 M12 5 v2 a4 4 0 0 1 -4 4" fill="none" stroke={SKY} strokeWidth="1.6" />
              </svg>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#fff" }}>312</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ triumphant champion mascot on the podium ============ */}
      {mIn > 0.02 && (
        <div style={{ position: "absolute", left: cx - mSize / 2, top: (PODY + 4) - mSize + (1 - mIn) * 70, transform: `scale(${mIn})`, transformOrigin: "50% 100%", zIndex: 55 }}>
          {/* gold cape behind */}
          <div style={{ position: "absolute", left: mSize * 0.16, top: mSize * 0.34, width: mSize * 0.68, height: mSize * 0.62, background: "linear-gradient(180deg,#E7B24C,#9A6E1E)", borderRadius: "40% 40% 46% 46%", transform: `rotate(${bob(lf, 3, 46, 0)}deg)`, boxShadow: "inset 0 0 20px rgba(0,0,0,0.35)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Mascot lf={lf} size={mSize} cheer={0.92} gaze={0} nodAmp={5} nodSpeed={11} capeC={GLD} />
          </div>
          {/* champion crown */}
          {crownIn > 0.02 && (
            <div style={{ position: "absolute", left: mSize * 0.28, top: -18 + (1 - crownIn) * 24 + bob(lf, 3, 42, 0), width: mSize * 0.44, transform: `scale(${crownIn})`, transformOrigin: "50% 100%", zIndex: 3 }}>
              <svg viewBox="0 0 60 40" width={mSize * 0.44} height={mSize * 0.29}>
                <path d="M4 34 L2 10 L18 22 L30 4 L42 22 L58 10 L56 34 Z" fill="url(#cta_pod)" stroke="#8A6018" strokeWidth="1.5" />
                <rect x="4" y="32" width="52" height="6" rx="2" fill={GLD} stroke="#8A6018" strokeWidth="1" />
                <circle cx="30" cy="12" r="3.5" fill={RED} />
                <circle cx="12" cy="20" r="2.5" fill={SKY} />
                <circle cx="48" cy="20" r="2.5" fill={GRNL} />
              </svg>
            </div>
          )}
          {/* champion medal on chest */}
          <div style={{ position: "absolute", left: mSize * 0.40, top: mSize * 0.5, zIndex: 3 }}>
            <svg viewBox="0 0 30 40" width={mSize * 0.2} height={mSize * 0.27}>
              <path d="M8 0 L15 16 L22 0" fill="none" stroke={RED} strokeWidth="4" />
              <circle cx="15" cy="26" r="11" fill="url(#cta_pod)" stroke="#8A6018" strokeWidth="1.5" />
              <text x="15" y="31" textAnchor="middle" fontSize="12" fill="#3A1147">★</text>
            </svg>
          </div>
        </div>
      )}

      {/* ============ 'comment BRAND' pill (bottom, clear of podium) ============ */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 706, textAlign: "center",
        transform: `scale(${pS * beat})`, transformOrigin: "50% 50%", opacity: Math.min(1, pS * 1.5), zIndex: 60,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 30px", borderRadius: 999,
          background: "linear-gradient(180deg,#2A1236,#160C1F)", border: `1.5px solid ${GLDL}`,
          boxShadow: "0 12px 30px -10px rgba(231,178,76,0.6), inset 0 1px 0 rgba(255,255,255,0.09)",
        }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: "rgba(224,214,236,0.85)" }}>comment</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff", letterSpacing: 2, textShadow: "0 0 16px rgba(255,233,168,0.7)" }}>BRAND</span>
        </div>
      </div>

      {/* ============ confetti-cannon storm + sparkle bursts ============ */}
      {lf > fr(0.2) && <Confetti lf={lf - fr(0.2)} n={48} colors={[GLD, GLDL, PINK, GRNL, SKY, "#FFFFFF"]} top={-20} h={790} />}
      <Sparkles lf={lf} at={0.42} x={cx} y={cardTop + 150} n={28} spread={380} colors={[GLDL, GLD, "#fff", PINK]} dur={1.0} />
      <Sparkles lf={lf} at={0.9} x={cx} y={PODY - 60} n={20} spread={300} colors={[GLDL, "#fff", GLD]} dur={0.9} />
      <Sparkles lf={lf} at={1.6} x={886} y={170} n={16} spread={240} colors={[GLD, "#fff", GLDL]} dur={0.85} />
      <Sparkles lf={lf} at={2.4} x={cx} y={cardTop + 40} n={18} spread={340} colors={[PINK, "#fff", GLDL]} dur={0.9} />
      <Embers lf={lf} n={22} base={GLD} />

      {/* atmosphere */}
      <Grain op={0.05} />
      <Vignette strength={0.5} shape="72% 64% at 50% 42%" />

      {/* open bloom */}
      {flash > 0.001 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 38%, #FFF6E0, #FFD9B0)", opacity: flash * 0.85, zIndex: 90, pointerEvents: "none" }} />}
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
      {[{ c: CLAY, x: 120, y: 200 }, { c: GREEN, x: 970, y: 260 }, { c: SKY, x: 150, y: 1670 }, { c: GOLD, x: 950, y: 1640 }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x - 300 + Math.sin(f / 50 + i) * 22, top: b.y - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${b.c}, transparent 62%)`, opacity: 0.1, filter: "blur(16px)" }} />
      ))}
      {/* drifting skill gems in the margins (3 depth tiers) */}
      {Array.from({ length: 12 }).map((_, i) => { const tier = i % 3; const top = i % 2 === 0; const band = top ? [10, 336] : [1256, 1884]; const x = seed(i * 3.1) * 1004 + 26; const y = band[0] + ((seed(i * 1.7) * (band[1] - band[0]) + f * (0.2 + tier * 0.28)) % (band[1] - band[0])); const s = [22, 30, 40][tier]; return <div key={i} style={{ position: "absolute", left: x, top: y, opacity: [0.25, 0.38, 0.5][tier], filter: tier === 0 ? "blur(1.4px)" : "none", transform: `rotate(${f / (8 - tier * 2) + i * 40}deg)` }}><Gem s={s} c={GEMS5[i % 5]} glow={0.4} /></div>; })}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 42% at 50% 40%, rgba(255,251,244,0.5), transparent 72%)" }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: P_TOP + P_H - 14, height: 64, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,30,18,0.3), transparent 70%)", filter: "blur(9px)" }} />
      <Grain op={0.04} />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 360px rgba(40,32,24,0.18)" }} />
    </AbsoluteFill>
  );
};

const SCENE_HEADERS: React.ReactNode[] = [
  <>TURN CLAUDE INTO A FREE<br /><span style={{ color: CLAY }}>BRAND STUDIO</span></>,
  <>A FULL BRAND KIT,<br />DONE FOR <span style={{ color: CLAY }}>$0</span></>,
  <>STOP PAYING AGENCIES<br /><span style={{ color: CLAY }}>$4,000</span></>,
  <>WEEKS OF WORK,<br />DONE <span style={{ color: CLAY }}>OVERNIGHT</span></>,
  <>JUST DESCRIBE IT IN<br /><span style={{ color: CLAY }}>ONE LINE</span></>,
  <>LOGO, COLORS + FONTS,<br /><span style={{ color: CLAY }}>ALL AT ONCE</span></>,
  <>A NEW BRAND FOR<br />EVERY <span style={{ color: CLAY }}>IDEA</span></>,
];
const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  let i = 0; for (let k = 0; k < 7; k++) if (f >= fr(L[k])) i = k;
  if (i > 6) return null;
  const start = L[i], end = L[i + 1];
  const inE = over(f, fr(start + (i === 0 ? 0 : 0.1)), fr(0.36), i === 0 ? Easing.out(Easing.cubic) : Easing.out(Easing.back(1.35)));
  const holdEnd = i === 0 ? end - 0.35 : Math.min(end - 0.35, start + 2.4);
  const outE = 1 - over(f, fr(holdEnd), fr(0.35));
  const op = inE * outE;
  if (op <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, display: "flex", justifyContent: "center", zIndex: 200, opacity: op, transform: `translateY(${(1 - inE) * -18}px)` }}>
      <div style={{ display: "inline-block", textAlign: "center", padding: "18px 46px", borderRadius: 30, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 22px 52px -12px rgba(20,26,45,0.48)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 58, color: INK, letterSpacing: "0.005em", lineHeight: 1.04, display: "block" }}>{SCENE_HEADERS[i]}</span>
      </div>
    </div>
  );
};

// ============================== captions ==============================
type Wd = { start: number; end: number; word: string };
const cw: Wd[] = (() => { const out: Wd[] = []; (words as Wd[]).forEach((w) => { const tk = w.word.trim(); const frag = tk === "" || /^[%\-.,!?;:)]/.test(tk); if (frag && out.length) { const p = out[out.length - 1]; out[out.length - 1] = { ...p, word: p.word + w.word, end: w.end }; } else out.push({ ...w }); }); return out; })();
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

// ============================== progress bar (gamified) ==============================
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const VIRT = L[7]; const p = Math.min(1, t / VIRT);
  const marks = [L[1], L[2], L[3], L[4], L[5], L[6]]; const STARS = [4.0, 20.0, 32.0]; const PELLETS = [1.0, 3.0, 5.5, 8.5, 12.0, 15.0, 18.0, 22.0, 26.0, 30.0, 34.0, 37.0];
  const score = PELLETS.filter((x) => t >= x).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((s) => t >= s).length * 2;
  const inc = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x); const lastInc = inc.length ? Math.max(...inc) : -9; const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const allItems = [...PELLETS, ...marks, ...STARS].sort((a, b) => a - b); const ringFill = allItems.filter((x) => t >= x).length / allItems.length;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999 }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {STARS.map((m, i) => { if (m / VIRT > 1.02) return null; const np = Math.min(1, m / VIRT); const passed = t >= m; const dt = passed ? t - m : 0; const pop = passed ? 1 + Math.max(0, 1 - dt * 2) * 0.6 : 1 + Math.sin(t * 2.6 + i) * 0.06; return (
        <div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 46, height: 46 }}><div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23, color: passed ? "#fff" : GOLD }}>★</div></div>); })}
      {marks.map((m, i) => { const np = m / VIRT; const passed = t >= m; const dt = passed ? t - m : 0; const pop = passed ? 1 + Math.max(0, 1 - dt * 2) * 0.62 : 1; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 54, height: 54 }}><div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : "#EDE7DB", border: `4px solid ${passed ? GREEN : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: passed ? "#fff" : CLAY }}>{passed ? "✓" : i + 1}</div></div>); })}
      <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", left: -8, top: -8, width: 82, height: 82, borderRadius: "50%", background: `conic-gradient(${ringFill >= 0.999 ? GOLD : GREEN} ${ringFill * 360}deg, rgba(58,92,132,0.22) 0deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)" }} />
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${ringFill >= 0.999 ? GOLD : GREEN}` }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[7] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap" }}>{"★ " + score}</div>
      </div>
      {(() => { const wake = ramp(t, VIRT - 2.4, VIRT); const opened = t >= VIRT + 0.2; return (
        <div style={{ position: "absolute", right: 2, top: -22, width: 96, height: 96, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", filter: `grayscale(${0.6 - wake * 0.6})`, opacity: 0.6 + wake * 0.4, transform: `scale(${opened ? 1.1 : 0.84 + wake * 0.2})` }}><Gauntlet s={56} gems={opened ? 5 : 0} snap={opened ? 0.6 : 0} /></div>
          {opened && <div style={{ position: "absolute", left: 48, top: 48 }}><Sparkles lf={f} at={VIRT + 0.2} x={0} y={0} n={12} spread={92} colors={[GOLD, "#fff", CLAY]} dur={0.9} /></div>}
        </div>); })()}
    </div>
  );
};

// ============================== MAIN ==============================
const BrandReelBody: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [S0, S1, S2, S3, S4, S5, S6];
  const LABELS = ["claude-council", "one-paragraph", "the-believer", "the-skeptic", "the-investor", "the-verdict", "the-proof"];
  const TINTS = ["rgba(210,114,78,0.34)", "rgba(90,160,222,0.32)", "rgba(63,158,116,0.34)", "rgba(196,74,58,0.36)", "rgba(231,178,76,0.34)", "rgba(58,92,132,0.34)", "rgba(210,114,78,0.32)"];
  const AMB = ["rgba(210,114,78,0.13)", "rgba(90,160,222,0.11)", "rgba(63,158,116,0.13)", "rgba(196,74,58,0.13)", "rgba(231,178,76,0.13)", "rgba(58,92,132,0.12)", "rgba(210,114,78,0.11)"];
  const BASES: [string, string][] = [["#1E1210", "#0F0806"], ["#131A2C", "#0A0E1A"], ["#0D1A15", "#070F0A"], ["#1E1210", "#0F0806"], ["#1E1608", "#0F0B04"], ["#131A2C", "#0A0E1A"], ["#1E1210", "#0F0806"]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_brandkit.wav")} />
      <Audio loop src={staticFile("roast_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CUT) - 20, fr(CUT)], [0.26, 0.26, 0.26, 0.12], { extrapolateRight: "clamp" })} />
      {/* ===== SFX PASS (brand kit, beat-keyed) ===== */}
      {/* HOOK: STOP sign flies in from the right -> magical palette reveal -> 5 colors chime in -> jackpot transform */}
      {/* STOP sign whooshes in + slams (screech), then whips back out */}
      <Sfx at={0.0} src="lib_whoosh_fast.wav" v={0.6} dur={0.3} />
      <Sfx at={0.08} src="screech.wav" v={0.58} dur={0.4} />
      <Sfx at={0.1} src="impact.wav" v={0.62} dur={0.4} />
      <Sfx at={0.11} src="lib_boom.wav" v={0.52} dur={0.5} />
      <Sfx at={0.34} src="swish.wav" v={0.5} dur={0.3} />
      {/* palette reveal (bright + magical, as the stop sign leaves ~f12) */}
      <Sfx at={0.4} src="riser.wav" v={0.46} dur={0.5} />
      <Sfx at={0.42} src="lib_magic_reveal.wav" v={0.5} dur={0.7} />
      <Sfx at={0.43} src="shimmer.wav" v={0.4} dur={0.7} />
      <Sfx at={0.45} src="sub.wav" v={0.38} dur={1.2} />
      {/* 5 colors: a whoosh streaks each in, an ascending chime clinks the dab (locks f18,28,38,48,58) */}
      {[18, 28, 38, 48, 58].map((f, i) => (
        <React.Fragment key={`col${i}`}>
          <Sfx at={(f - 5) / 30} src="lib_whoosh_fast.wav" v={0.4} dur={0.3} />
          <Sfx at={f / 30} src={["blip1.wav", "blip2.wav", "blip3.wav", "blip4.wav", "blip5.wav"][i]} v={0.6} dur={0.25} />
          <Sfx at={f / 30} src="c_collect.wav" v={0.44} dur={0.3} />
          <Sfx at={f / 30 + 0.01} src="chimehi.wav" v={0.26 + i * 0.05} dur={0.3} />
        </React.Fragment>
      ))}
      {/* FINAL color locks -> JACKPOT + GLOWING TRANSFORM power-up (5th lock f58 = 1.93s) */}
      {/* jackpot: fanfare + a cascading coin run + a win jingle */}
      <Sfx at={1.93} src="c_fanfare.wav" v={0.62} dur={1.3} />
      {[0, 0.05, 0.1, 0.15, 0.2, 0.26, 0.32].map((d, i) => <Sfx key={`jp${i}`} at={1.93 + d} src="c_coin.wav" v={0.42} dur={0.22} />)}
      <Sfx at={1.97} src="c_1up.wav" v={0.5} dur={0.8} />
      {/* the glowing transform power-up under it */}
      <Sfx at={1.88} src="lib_deep_whoosh.wav" v={0.42} dur={0.4} />
      <Sfx at={1.92} src="c_powerbig.wav" v={0.56} dur={0.7} />
      <Sfx at={1.93} src="lib_magic_reveal.wav" v={0.52} dur={0.9} />
      <Sfx at={1.95} src="lib_boom.wav" v={0.46} dur={0.7} />
      <Sfx at={2.0} src="angelic.wav" v={0.36} dur={1.0} />
      <Sfx at={2.04} src="shimmer.wav" v={0.42} dur={0.8} />
      <Sfx at={2.08} src="sparkle.wav" v={0.42} dur={0.7} />
      {/* per-scene cut whoosh in */}
      {[L[1], L[2], L[3], L[4], L[5], L[6], L[7]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}>
          <Sfx at={tt - 0.5} src={i % 2 === 0 ? "lib_whoosh_fast.wav" : "swooshup.wav"} v={0.4} dur={0.5} />
          <Sfx at={tt} src={["lib_pop.wav", "cash-register.mp3", "c_break.wav", "lib_mactype.wav", "lib_magic_reveal.wav", "c_power.wav", "lib_magic_reveal.wav"][i]} v={0.5} dur={0.5} />
        </React.Fragment>
      ))}
      {/* S1 brand-kit preview + FREE stamp */}
      {[0.15, 0.35, 0.55].map((d, i) => <Sfx key={`s1${i}`} at={L[1] + d} src="lib_pop.wav" v={0.42} dur={0.3} />)}
      <Sfx at={L[1] + 0.7} src="c_collect.wav" v={0.44} dur={0.4} />
      <Sfx at={L[1] + 0.9} src="chimehi.wav" v={0.42} dur={0.5} />
      {/* S2 COST: cash register + climbing coins + calendar ticks + heavy thunk */}
      {/* S2 AGENCY: the BAR FILLS (rising tone + accelerating coins) -> alarm at top -> NINJA katana SLASH (loud) -> release */}
      <Sfx at={L[2] + 0.3} src="metal_riser.wav" v={0.5} dur={2.7} />
      <Sfx at={L[2] + 0.3} src="digital-loading.wav" v={0.34} dur={2.6} />
      <Sfx at={L[2] + 0.35} src="sub.wav" v={0.32} dur={2.6} />
      {[0.5, 0.75, 1.0, 1.25, 1.5, 1.72, 1.92, 2.1, 2.28, 2.44, 2.6, 2.74, 2.86].map((d, i) => <Sfx key={`s2c${i}`} at={L[2] + d} src="c_coin.wav" v={0.28 + i * 0.018} dur={0.2} />)}
      {[0.6, 1.2, 1.8, 2.3, 2.7].map((d, i) => <Sfx key={`s2t${i}`} at={L[2] + d} src="tick.wav" v={0.34} dur={0.2} />)}
      <Sfx at={L[2] + 2.86} src="c_grow.wav" v={0.42} dur={0.5} />
      <Sfx at={L[2] + 2.9} src="alarm.wav" v={0.46} dur={0.6} />
      <Sfx at={L[2] + 2.92} src="lib_boom.wav" v={0.46} dur={0.6} />
      {/* NINJA katana SLASH cuts it in half (scene f102 = L[2]+3.4s) - LOUD + metallic ring */}
      <Sfx at={L[2] + 3.3} src="lib_whoosh_fast.wav" v={0.58} dur={0.3} />
      <Sfx at={L[2] + 3.4} src="slash.wav" v={0.92} dur={0.5} />
      <Sfx at={L[2] + 3.4} src="twang.wav" v={0.5} dur={0.4} />
      <Sfx at={L[2] + 3.42} src="impact.wav" v={0.6} dur={0.4} />
      <Sfx at={L[2] + 3.44} src="lib_boom.wav" v={0.5} dur={0.6} />
      <Sfx at={L[2] + 3.56} src="swooshdn.wav" v={0.48} dur={0.5} />
      <Sfx at={L[2] + 3.76} src="zucc.wav" v={0.42} dur={0.5} />
      <Sfx at={L[2] + 3.95} src="resolve.wav" v={0.4} dur={0.7} />
      {/* S3 SKIP + OVERNIGHT: shred/void stamp + whoosh + terminal done */}
      <Sfx at={L[3] + 0.2} src="c_break.wav" v={0.5} dur={0.4} />
      <Sfx at={L[3] + 0.22} src="impact.wav" v={0.5} dur={0.4} />
      <Sfx at={L[3] + 0.45} src="swooshdn.wav" v={0.44} dur={0.5} />
      <Sfx at={L[3] + 0.9} src="lib_deep_whoosh.wav" v={0.4} dur={0.6} />
      <Sfx at={L[3] + 1.6} src="digital-loading.wav" v={0.4} dur={0.7} />
      <Sfx at={L[3] + 2.3} src="c_clear.wav" v={0.48} dur={0.6} />
      {/* S4 ONE SENTENCE: typing + enter + beam */}
      {Array.from({ length: 12 }).map((_, i) => <Sfx key={`ty${i}`} at={L[4] + 0.3 + i * 0.11} src="lib_mactype.wav" v={0.32} dur={0.1} />)}
      <Sfx at={L[4] + 1.8} src="lib_click.wav" v={0.5} dur={0.3} />
      <Sfx at={L[4] + 1.82} src="c_power.wav" v={0.42} dur={0.4} />
      <Sfx at={L[4] + 2.0} src="lib_deep_whoosh.wav" v={0.42} dur={0.6} />
      <Sfx at={L[4] + 2.1} src="digital-loading.wav" v={0.36} dur={0.8} />
      {/* S5 DELIVERABLES: reveal pops in sequence + sparkles */}
      {[0.3, 1.1, 1.9, 2.7, 3.5, 4.3].map((d, i) => <React.Fragment key={`s5${i}`}><Sfx at={L[5] + d} src="lib_pop2.wav" v={0.44} dur={0.3} /><Sfx at={L[5] + d + 0.03} src="c_collect.wav" v={0.34} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[5] + 0.35} src="lib_magic_reveal.wav" v={0.44} dur={0.8} />
      {[1.0, 2.6, 4.2].map((d, i) => <Sfx key={`s5s${i}`} at={L[5] + d} src="sparkle.wav" v={0.36} dur={0.5} />)}
      <Sfx at={L[5] + 5.2} src="chimehi.wav" v={0.42} dur={0.6} />
      {/* S6 SPIN UP MANY: rapid pops/whooshes building */}
      {Array.from({ length: 14 }).map((_, i) => <Sfx key={`s6${i}`} at={L[6] + 0.2 + i * 0.28} src={i % 2 ? "lib_pop.wav" : "pop.wav"} v={0.3 + i * 0.01} dur={0.25} />)}
      {[0.4, 1.2, 2.0].map((d, i) => <Sfx key={`s6w${i}`} at={L[6] + d} src="lib_whoosh_fast.wav" v={0.36} dur={0.35} />)}
      <Sfx at={L[6] + 4.0} src="c_powerbig.wav" v={0.44} dur={0.6} />
      {/* CTA finale */}
      <Sfx at={L[7] + 0.1} src="lib_magic_reveal.wav" v={0.6} dur={0.9} />
      <Sfx at={L[7] + 0.15} src="c_fanfare.wav" v={0.44} dur={1.2} />
      <Sfx at={L[7] + 0.2} src="sparkle.wav" v={0.5} dur={0.9} />
      <Sfx at={L[7] + 0.3} src="chimehi.wav" v={0.5} dur={0.8} />
      {[0.45, 0.6, 0.75, 0.9].map((d, i) => <Sfx key={`cp${i}`} at={L[7] + d} src="lib_pop.wav" v={0.36} dur={0.3} />)}
      <Sfx at={L[7] + 1.3} src="resolve.wav" v={0.56} dur={1.1} />
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
          return (<Panel key={i} lf={lf} label={LABELS[i]} tint={TINTS[i]} ambient={AMB[i]} base={BASES[i]} cscale={cscale} shakeX={shakeX}>{React.createElement(Ss[i], { lf })}</Panel>);
        })}
        {scene(7) ? <BrandCTA lf={frame - Lf[7]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};

export const ClaudeBrandReel: React.FC = () => <BrandReelBody />;
