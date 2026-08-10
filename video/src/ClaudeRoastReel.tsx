import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_roast.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
const L = [0, 5.12, 9.38, 12.86, 18.12, 21.74, 28.3, 33.84];
const Lf = L.map(fr);
const CUT = 37.34;

// the 5 skill gem colors (consistent across the whole reel)
const GEMS5 = ["#9E7BC8", "#5AA0DE", "#C44A3A", "#3F9E74", "#E7B24C"];

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const seedArr = (n: number): number[] => Array.from({ length: Math.max(0, n | 0) }, (_, i) => seed(i * 1.618 + n * 7.3 + 1));
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
  const L = (a: number, b: number, t: number) => a + (b - a) * t;
  const impactF = 6;

  // ---- CAMERA: pull-back + hard impact shake ----
  const pull = over(lf, 8, 36, Easing.inOut(Easing.cubic));
  const camScale = 1.2 - 0.2 * pull;
  const sk = lf >= impactF ? Math.max(0, 1 - (lf - impactF) / 11) : 0;
  const shakeAmp = sk * sk * 21;
  const shX = (seed(lf * 1.73 + 3) * 2 - 1) * shakeAmp;
  const shY = (seed(lf * 2.31 + 11) * 2 - 1) * shakeAmp;

  // ---- palette derived tones ----
  const WOOD = lerpHex(AMBER, INK, 0.66);
  const WOOD2 = lerpHex(AMBER, INK, 0.5);
  const WOODLIT = lerpHex(AMBER, CREAM, 0.35);
  const BG0 = lerpHex(INK, RED, 0.1);
  const BG1 = lerpHex(INK, AMBER, 0.16);
  const REDD = lerpHex(RED, INK, 0.35);
  const REDL = lerpHex(RED, CREAM, 0.35);

  // ---- STAMP drop physics ----
  const yLand = 356;
  const drop = over(lf, 0, impactF, Easing.in(Easing.quad));
  const liftP = over(lf, 13, 15, Easing.in(Easing.quad));
  let stampY = L(-20, yLand, drop);
  if (lf >= impactF) stampY = yLand - 560 * liftP;
  const stampSquash = lf >= impactF ? 1 - 0.2 * Math.max(0, 1 - (lf - impactF) / 6) : 1;
  const stampSX = 1 / Math.sqrt(stampSquash);
  const stampOp = lf < impactF ? 1 : 1 - over(lf, 14, 8);
  const stampR = 138;
  const streakOp = lf < impactF ? 0.55 * over(lf, 0, 2) : 0;

  // ---- IDEA squash / tremble / press ----
  const t = lf - impactF;
  const env = t < 0 ? 0 : Math.exp(-t / 4.2);
  const isy = t < 0 ? 1 : 1 - 0.5 * env * Math.cos(t * 0.82);
  const isx = t < 0 ? 1 : 1 + 0.4 * env * Math.cos(t * 0.82);
  const press = lf >= impactF ? Math.max(0, 1 - (lf - impactF) / 7) * 11 : 0;
  const trem = lf > 40 ? Math.sin(lf * 0.85) * 1.5 * (0.5 + 0.5 * Math.sin(lf * 0.13)) : 0;

  // ---- seared seal mark ----
  const sealOp = over(lf, impactF, 4);
  const sealPulse = 1 + 0.08 * Math.sin(lf * 0.34);

  // ---- localized impact flash + shockwave ----
  const flashP = over(lf, impactF, 8, Easing.out(Easing.quad));
  const flashOp = lf >= impactF ? (1 - flashP) * 0.9 : 0;
  const flashR = 30 + 170 * flashP;
  const ringP = over(lf, impactF, 16, Easing.out(Easing.cubic));
  const ringOp = lf >= impactF ? (1 - ringP) : 0;
  const ringR = 18 + 250 * ringP;
  const ring2P = over(lf, impactF + 2, 18, Easing.out(Easing.cubic));
  const ring2Op = lf >= impactF + 2 ? (1 - ring2P) * 0.7 : 0;
  const ring2R = 14 + 210 * ring2P;

  // ---- wax splatter droplets ----
  const drops = Array.from({ length: 13 }).map((_, i) => {
    const a = seed(i * 2.71 + 1) * Math.PI * 2;
    const dist = 46 + seed(i * 1.9 + 5) * 230;
    const pr = over(lf, impactF, 20, Easing.out(Easing.quad));
    const dx = Math.cos(a) * dist * pr;
    const dy = Math.sin(a) * dist * pr - 26 * pr + 34 * pr * pr;
    const r = 3.5 + seed(i * 3.3 + 2) * 9;
    const op = lf >= impactF ? (1 - over(lf, impactF, 25)) * 0.92 : 0;
    return { dx, dy, r, op };
  });

  // ---- steam wisps rising off the brand ----
  const steam = Array.from({ length: 3 }).map((_, i) => {
    const rise = ((lf * 1.7 + i * 42) % 130);
    const yy = 372 - rise;
    const wob = Math.sin(lf * 0.15 + i * 2.1) * 9;
    const op = Math.max(0, 1 - rise / 130) * 0.26 * over(lf, impactF + 1, 10);
    return { yy, wob, op, i };
  });

  // ---- sweat beads on the idea ----
  const sweat = Array.from({ length: 3 }).map((_, i) => {
    const ph = seed(i * 5.4 + 2);
    const cyc = ((lf + ph * 60) % 60) / 60;
    const sx = 506 + (i - 1) * 30 + Math.sin(i * 2) * 8;
    const sy = 402 + cyc * 42;
    const op = lf > impactF + 4 ? Math.max(0, 1 - cyc) * 0.85 * (0.5 + 0.5 * Math.sin(lf * 0.2 + i)) : 0;
    return { sx, sy, op, cyc };
  });

  // ---- drifting dust motes in the god-ray ----
  const motes = Array.from({ length: 16 }).map((_, i) => {
    const bx = 360 + seed(i * 3.1 + 4) * 300;
    const by = ((lf * (0.3 + seed(i * 1.3) * 0.5) + seed(i * 7.7) * 700) % 700);
    const dx = Math.sin(lf * 0.02 + i) * 14;
    const r = 0.8 + seed(i * 2.2 + 9) * 2.2;
    const op = (0.12 + seed(i * 4.4) * 0.22) * (0.6 + 0.4 * Math.sin(lf * 0.06 + i));
    return { x: bx + dx, y: 70 + by, r, op };
  });

  // ---- council ----
  const council = [
    { tint: GREEN, x: 158, y: 406, size: 170, s: 18, suit: 0, glasses: 0 },
    { tint: RED, x: 350, y: 300, size: 150, s: 25, suit: 0, glasses: 0 },
    { tint: GOLD, x: 662, y: 300, size: 150, s: 32, suit: 0.6, glasses: 1 },
    { tint: SLATE, x: 856, y: 406, size: 180, s: 39, suit: 1, glasses: 0 },
  ];

  const IDEA_TX = `translate(506 470) translate(${trem} ${press}) rotate(${trem * 0.5}) scale(${isx} ${isy})`;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: BG0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${shX}px, ${shY}px) scale(${camScale})`,
          transformOrigin: "506px 430px",
        }}
      >
        {/* ============ BACKGROUND ENVIRONMENT ============ */}
        <svg viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="s0bg" cx="50%" cy="26%" r="85%">
              <stop offset="0%" stopColor={BG1} />
              <stop offset="55%" stopColor={BG0} />
              <stop offset="100%" stopColor={INK} />
            </radialGradient>
            <linearGradient id="s0win" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lerpHex(AMBER, CREAM, 0.5)} />
              <stop offset="60%" stopColor={AMBER} />
              <stop offset="100%" stopColor={REDD} />
            </linearGradient>
            <radialGradient id="s0halo" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor={lerpHex(AMBER, CREAM, 0.7)} stopOpacity="0.9" />
              <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="s0bench" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={WOODLIT} />
              <stop offset="12%" stopColor={WOOD2} />
              <stop offset="100%" stopColor={lerpHex(WOOD, INK, 0.5)} />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1012" height="792" fill="url(#s0bg)" />

          {/* soft halo behind window */}
          <ellipse cx="506" cy="215" rx="360" ry="240" fill="url(#s0halo)" opacity="0.8" />

          {/* tall arched window light source */}
          <g opacity="0.92">
            <path d="M 372 320 L 372 175 A 134 134 0 0 1 640 175 L 640 320 Z" fill="url(#s0win)" />
            <g stroke={REDD} strokeWidth="7" opacity="0.55">
              <line x1="506" y1="60" x2="506" y2="320" />
              <line x1="439" y1="120" x2="439" y2="320" />
              <line x1="573" y1="120" x2="573" y2="320" />
              <line x1="372" y1="220" x2="640" y2="220" />
              <path d="M 372 175 A 134 134 0 0 1 640 175" fill="none" />
            </g>
            <path d="M 372 320 L 372 175 A 134 134 0 0 1 640 175 L 640 320" fill="none" stroke={lerpHex(WOOD, AMBER, 0.3)} strokeWidth="9" opacity="0.7" />
          </g>

          {/* faint gold scales-of-justice seal medallion behind the bench */}
          <g transform="translate(506 452)" opacity={0.16 + 0.03 * Math.sin(lf * 0.05)}>
            <circle r="196" fill="none" stroke={GOLD} strokeWidth="6" />
            <circle r="176" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 10" />
            <g stroke={GOLD} strokeWidth="7" fill="none" strokeLinecap="round">
              <line x1="0" y1="-96" x2="0" y2="70" />
              <line x1="-110" y1="-70" x2="110" y2="-70" />
              <line x1="-110" y1="-70" x2="-150" y2="8" />
              <line x1="-110" y1="-70" x2="-70" y2="8" />
              <line x1="110" y1="-70" x2="150" y2="8" />
              <line x1="110" y1="-70" x2="70" y2="8" />
              <path d="M -150 8 A 40 22 0 0 0 -70 8" />
              <path d="M 70 8 A 40 22 0 0 0 150 8" />
              <line x1="-46" y1="70" x2="46" y2="70" />
            </g>
            <circle cy="-96" r="9" fill={GOLD} />
          </g>

          {/* judge's bench slab behind the pedestal */}
          <rect x="46" y="556" width="920" height="150" rx="10" fill="url(#s0bench)" />
          <rect x="46" y="556" width="920" height="10" rx="5" fill={WOODLIT} opacity="0.8" />
          <rect x="46" y="592" width="920" height="4" fill={lerpHex(WOOD, AMBER, 0.4)} opacity="0.45" />

          {/* drifting dust motes in the beam */}
          {motes.map((m, i) => (
            <circle key={i} cx={m.x} cy={m.y} r={m.r} fill={lerpHex(AMBER, CREAM, 0.6)} opacity={m.op} />
          ))}

          {/* council arrival dust puffs (behind mascots) */}
          {council.map((m, i) => {
            const pf = over(lf, m.s, 14, Easing.out(Easing.cubic));
            const op = lf >= m.s ? (1 - pf) * 0.5 : 0;
            return (
              <ellipse key={i} cx={m.x} cy={m.y + m.size * 0.42} rx={30 + pf * 90} ry={10 + pf * 22} fill={lerpHex(m.tint, CREAM, 0.4)} opacity={op} />
            );
          })}
        </svg>

        {/* ============ GOD-RAY (behind council) ============ */}
        <SpotCone x={506} top={72} topW={150} botW={540} h={700} color={lerpHex(AMBER, CREAM, 0.4)} sway={6} lf={lf} pool={0.14} />

        {/* ============ COUNCIL MASCOTS ============ */}
        {council.map((m, i) => {
          const ent = over(lf, m.s, 12, Easing.out(Easing.back(1.9)));
          if (ent <= 0) return null;
          const sc = Math.min(1.16, ent);
          const op = over(lf, m.s, 6);
          const yEnter = (1 - Math.min(1, ent)) * 46;
          const gaze = Math.max(-1, Math.min(1, (506 - m.x) / 440));
          const lean = ((506 - m.x) / 520) * 4 * (0.6 + 0.4 * Math.sin(lf * 0.05 + m.s));
          const breath = bob(lf, 3, 90, m.x);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: m.x,
                top: m.y + breath,
                transform: `translate(-50%,-50%) translateY(${yEnter}px) rotate(${lean}deg) scale(${sc})`,
                transformOrigin: "50% 82%",
                opacity: op,
              }}
            >
              <Mascot
                lf={lf}
                size={m.size}
                tint={m.tint}
                stern={0.78}
                cheer={0}
                shock={ent < 1 ? 0.4 * (1 - ent) : 0}
                gaze={gaze}
                nodAmp={2}
                nodSpeed={0.4}
                glasses={m.glasses}
                suit={m.suit}
                wizard={0}
                samurai={0}
              />
            </div>
          );
        })}

        {/* ============ FOREGROUND: pedestal + idea + stamp + impact ============ */}
        <svg viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="s0flash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={CREAM} stopOpacity="1" />
              <stop offset="40%" stopColor={lerpHex(RED, CREAM, 0.6)} stopOpacity="0.8" />
              <stop offset="100%" stopColor={RED} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="s0bulb" cx="42%" cy="34%" r="70%">
              <stop offset="0%" stopColor={lerpHex(GOLD, CREAM, 0.85)} />
              <stop offset="45%" stopColor={GOLD} />
              <stop offset="100%" stopColor={AMBER} />
            </radialGradient>
            <radialGradient id="s0seal" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor={REDL} />
              <stop offset="60%" stopColor={RED} />
              <stop offset="100%" stopColor={REDD} />
            </radialGradient>
            <linearGradient id="s0ped" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={WOODLIT} />
              <stop offset="100%" stopColor={lerpHex(WOOD, INK, 0.55)} />
            </linearGradient>
          </defs>

          {/* pedestal + document under the idea */}
          <g>
            <path d="M 430 636 L 582 636 L 566 512 L 446 512 Z" fill="url(#s0ped)" />
            <rect x="440" y="500" width="132" height="20" rx="5" fill={WOODLIT} />
            <g transform="translate(506 488) rotate(-3)">
              <rect x="-78" y="-24" width="156" height="48" rx="6" fill={CREAM} opacity="0.95" />
              <line x1="-58" y1="-8" x2="58" y2="-8" stroke={MUTE} strokeWidth="3" opacity="0.5" />
              <line x1="-58" y1="4" x2="40" y2="4" stroke={MUTE} strokeWidth="3" opacity="0.4" />
            </g>
          </g>

          {/* THE IDEA (glowing lightbulb defendant) */}
          <g transform={IDEA_TX}>
            {/* aura */}
            <circle cx="0" cy="-70" r="66" fill={GOLD} opacity={0.28 + 0.06 * Math.sin(lf * 0.2)} />
            {/* squat body */}
            <path d="M -30 -8 L 30 -8 L 24 30 L -24 30 Z" fill={lerpHex(GOLD, WOOD, 0.4)} />
            <rect x="-16" y="-24" width="32" height="18" rx="4" fill={lerpHex(GOLD, INK, 0.35)} />
            {/* tiny scared arms */}
            <path d="M -28 0 Q -46 8 -40 24" fill="none" stroke={lerpHex(GOLD, WOOD, 0.4)} strokeWidth="7" strokeLinecap="round" />
            <path d="M 28 0 Q 46 8 40 24" fill="none" stroke={lerpHex(GOLD, WOOD, 0.4)} strokeWidth="7" strokeLinecap="round" />
            {/* bulb head */}
            <circle cx="0" cy="-70" r="42" fill="url(#s0bulb)" />
            {/* filament */}
            <path d="M -12 -66 L -5 -80 L 5 -60 L 12 -78" fill="none" stroke={lerpHex(AMBER, RED, 0.4)} strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
            {/* scared face */}
            <circle cx="-13" cy="-74" r="6.5" fill={INK} />
            <circle cx="13" cy="-74" r="6.5" fill={INK} />
            <circle cx="-11" cy="-76" r="2" fill={CREAM} />
            <circle cx="15" cy="-76" r="2" fill={CREAM} />
            <path d="M -9 -56 Q 0 -62 9 -56" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />

            {/* SEARED SEAL BRAND on the bulb */}
            {sealOp > 0 && (
              <g transform={`translate(6 -66) scale(${sealPulse})`} opacity={sealOp}>
                <circle r="26" fill="url(#s0seal)" opacity="0.92" />
                <circle r="26" fill="none" stroke={REDL} strokeWidth="2.5" />
                <circle r="20" fill="none" stroke={REDD} strokeWidth="1.5" strokeDasharray="3 4" />
                {/* flame emboss (no words) */}
                <path d="M 0 -13 Q 9 -4 5 6 Q 12 3 9 11 Q 4 16 -1 12 Q -9 15 -6 5 Q -11 0 -6 -3 Q -3 -6 -3 0 Q 0 -6 0 -13 Z" fill={REDL} opacity="0.85" />
                <ellipse rx="24" ry="10" cy="-16" fill={CREAM} opacity={0.14 + 0.1 * Math.sin(lf * 0.3)} />
              </g>
            )}
          </g>

          {/* steam wisps off the brand */}
          {steam.map((s) => (
            <path
              key={s.i}
              d={`M ${512} ${372} Q ${512 + s.wob} ${s.yy + 40} ${512 - s.wob} ${s.yy}`}
              fill="none"
              stroke={CREAM}
              strokeWidth="6"
              strokeLinecap="round"
              opacity={s.op}
            />
          ))}

          {/* sweat beads */}
          {sweat.map((s, i) => (
            <ellipse key={i} cx={s.sx} cy={s.sy} rx="4" ry="6" fill={lerpHex(SKY, CREAM, 0.5)} opacity={s.op} />
          ))}

          {/* ===== IMPACT FX ===== */}
          {ring2Op > 0 && <circle cx="506" cy="404" r={ring2R} fill="none" stroke={REDL} strokeWidth={7 * (1 - ring2P) + 1} opacity={ring2Op} />}
          {ringOp > 0 && <circle cx="506" cy="404" r={ringR} fill="none" stroke={RED} strokeWidth={11 * (1 - ringP) + 2} opacity={ringOp} />}
          {flashOp > 0 && <circle cx="506" cy="404" r={flashR} fill="url(#s0flash)" opacity={flashOp} />}

          {/* wax splatter droplets */}
          {drops.map((d, i) => (
            <circle key={i} cx={506 + d.dx} cy={404 + d.dy} r={d.r} fill={i % 3 === 0 ? REDD : RED} opacity={d.op} />
          ))}

          {/* ===== THE ROAST STAMP ===== */}
          {stampOp > 0 && (
            <g opacity={stampOp}>
              {/* motion-blur streak */}
              {streakOp > 0 && <rect x={506 - stampR * 0.9} y={-260} width={stampR * 1.8} height={stampY + 260} rx={stampR * 0.9} fill={RED} opacity={streakOp} />}
              <g transform={`translate(506 ${stampY}) scale(${stampSX} ${stampSquash})`}>
                {/* handle */}
                <rect x="-16" y={-stampR - 78} width="32" height="70" rx="14" fill={WOOD} />
                <ellipse cx="0" cy={-stampR - 82} rx="46" ry="26" fill={WOOD2} />
                <ellipse cx="0" cy={-stampR - 88} rx="46" ry="20" fill={WOODLIT} opacity="0.6" />
                <rect x="-58" y={-stampR - 14} width="116" height="20" rx="8" fill={lerpHex(WOOD, INK, 0.3)} />
                {/* wax seal disc */}
                <circle r={stampR} fill="url(#s0seal)" />
                <circle r={stampR} fill="none" stroke={REDD} strokeWidth="8" />
                <circle r={stampR - 16} fill="none" stroke={REDL} strokeWidth="3" opacity="0.7" />
                <circle r={stampR - 30} fill="none" stroke={REDD} strokeWidth="2" strokeDasharray="5 9" />
                {/* embossed flame cluster (no words) */}
                <g fill={REDL} opacity="0.9">
                  <path d="M 0 -58 Q 34 -20 18 26 Q 46 12 34 52 Q 16 78 -4 56 Q -40 70 -26 22 Q -50 2 -26 -12 Q -12 -26 -12 2 Q 0 -26 0 -58 Z" />
                </g>
                <g stroke={REDD} strokeWidth="4" opacity="0.55" fill="none">
                  <path d="M -6 -20 Q 6 4 -2 34" />
                </g>
                {/* top gloss highlight */}
                <ellipse cx="-34" cy={-stampR * 0.45} rx="52" ry="26" fill={CREAM} opacity="0.12" />
              </g>
            </g>
          )}
        </svg>

        {/* impact spark burst */}
        <Sparkles lf={lf} at={impactF / 30} x={506} y={404} n={16} spread={180} colors={[RED, GOLD, CREAM]} dur={0.9} />

        {/* warm embers rising */}
        <Embers lf={lf} n={12} base={AMBER} />
      </div>

      {/* full-panel atmosphere (outside shake) */}
      <Vignette strength={0.72} />
      <Grain op={0.06} />
    </div>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  // ---------- timeline (kept) ----------
  const dropAt = 5;
  const settleTo = 28;
  const pullAt = 30;
  const chargeAt = 34;
  const splitAt = 60;
  const slamAt = [66, 73, 80, 87];
  const landF = slamAt.map((s) => s + 13);
  const clashAt = 108;

  // agents: BELIEVER=GREEN, SKEPTIC=RED, INVESTOR=GOLD, JUDGE=SLATE
  const A = [
    { tint: GREEN, x: 166, lean: 3, fit: { cheer: 0.55, gaze: 6, nodSpeed: 7, nodAmp: 3.2 } },
    { tint: RED, x: 393, lean: 2, fit: { stern: 0.7, gaze: 3, nodSpeed: 8, nodAmp: 2.4 } },
    { tint: GOLD, x: 619, lean: -2, fit: { suit: 1, gaze: -3, nodSpeed: 9, nodAmp: 2.6 } },
    { tint: SLATE, x: 846, lean: -3, fit: { stern: 0.55, glasses: 1, gaze: -6, nodSpeed: 8, nodAmp: 2.4 } },
  ];
  const bayTop = 372, splitY = 198, cellTop = 344, cellH = 260;
  const hex = (r: number) =>
    Array.from({ length: 6 }).map((_, k) => {
      const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
      return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");

  // ---------- camera: impact shakes + push-in ----------
  const imp = (t: number, mag: number, dur: number) =>
    lf >= t && lf < t + dur ? Math.sin((lf - t) * 1.6) * mag * (1 - (lf - t) / dur) : 0;
  let shk = imp(dropAt, 9, 15) + imp(splitAt, 13, 22);
  landF.forEach((t) => (shk += imp(t, 4.5, 9)));
  const push = interpolate(lf, [0, 34], [1.07, 1.0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })
    + over(lf, splitAt, fr(0.14)) * 0.03 - over(lf, splitAt + fr(0.14), fr(0.3)) * 0.03;

  // ---------- white flashes ----------
  const fl = (t: number, peak: number, dur: number) => (lf >= t && lf < t + dur ? peak * (1 - (lf - t) / dur) : 0);
  let flash = Math.max(fl(dropAt, 0.3, 10), fl(splitAt, 0.5, 12));
  landF.forEach((t) => (flash = Math.max(flash, fl(t, 0.28, 7))));

  // ---------- idea scroll ----------
  const drop = Math.min(1.06, spr(lf, dropAt, 11, 210));
  const scrollY = interpolate(drop, [0, 1], [-320, 96]);
  const scrollWob = Math.sin((lf - dropAt) / 6) * Math.max(0, 1 - (lf - dropAt) / 26) * 5;
  const glowPulse = 0.5 + Math.sin(lf / 5) * 0.5;
  const suck = over(lf, pullAt, fr(0.28), Easing.in(Easing.cubic));

  // ---------- single Claude ----------
  const single = Math.min(1.08, spr(lf, chargeAt, 12, 200));
  const chargeUp = over(lf, chargeAt, fr(0.72));
  const singleFlash = over(lf, splitAt - 3, fr(0.2));

  // ---------- reactor core (behind charge / split) ----------
  const reSc = 0.78 + chargeUp * 0.36 + singleFlash * 0.4;
  const reFade = 1 - over(lf, splitAt + fr(0.5), fr(1.1)) * 0.5;
  const reGlow = (0.16 + chargeUp * 0.42 + singleFlash * 0.45) * reFade;
  const reRing = (0.24 + chargeUp * 0.4) * reFade;

  // ---------- split shockwave ----------
  const swP = over(lf, splitAt, fr(0.74), Easing.out(Easing.cubic));
  const swR = swP * 680, swO = Math.max(0, 1 - swP);
  const allIn = lf >= landF[3];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translate(${shk}px, ${shk * 0.5}px) scale(${push})`, transformOrigin: "50% 46%" }}>
      {/* ================= deep character-select arena ================= */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 98% 84% at 50% 30%, #27314C 0%, #161C2E 44%, #070912 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle 46% at 50% 40%, rgba(210,114,78,0.14), transparent 60%)" }} />
      {/* top holo halo + floor haze for depth */}
      <div style={{ position: "absolute", left: cx - 300, top: 40, width: 600, height: 440, background: "radial-gradient(ellipse at 50% 40%, rgba(214,228,255,0.11), transparent 66%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 388, height: 210, background: "linear-gradient(180deg, transparent, rgba(120,150,215,0.07) 42%, transparent)", zIndex: 1, pointerEvents: "none" }} />
      {/* four-tone wash once the roster is locked */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(63,158,116,0.09), rgba(196,74,58,0.06), rgba(231,178,76,0.07), rgba(58,92,132,0.09))", opacity: over(lf, landF[3], fr(0.5)) }} />

      {/* ================= far back layer: data-wall monitor banks + reactor core ================= */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <defs>
          <radialGradient id="s1reactor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="42%" stopColor="rgba(190,214,255,0.5)" />
            <stop offset="100%" stopColor="rgba(190,214,255,0)" />
          </radialGradient>
        </defs>
        {/* distant flanking bar-graph panels (mission-control monitor banks) */}
        {[0, 1].map((side) =>
          Array.from({ length: 12 }).map((_, j) => {
            const col = j % 2, row = Math.floor(j / 2);
            const bx = (side ? 700 : 56) + col * 140;
            const by = 148 + row * 30;
            const blink = 0.28 + Math.abs(Math.sin(lf / 9 + j * 1.7 + side * 2)) * 0.5;
            const c = [SKY, GREEN, GOLD][j % 3];
            return (
              <g key={`w${side}-${j}`} opacity={0.5}>
                <rect x={bx} y={by} width={120} height={20} rx={3} fill="rgba(20,28,46,0.7)" stroke="rgba(80,100,140,0.3)" strokeWidth={1} />
                {Array.from({ length: 6 }).map((_, b) => {
                  const bh = 4 + Math.abs(Math.sin(lf / 6 + b + j)) * 10;
                  return <rect key={b} x={bx + 8 + b * 18} y={by + 16 - bh} width={9} height={bh} fill={c} opacity={blink} />;
                })}
              </g>
            );
          })
        )}
        {/* reactor: radial core + counter-spinning hex rings + spokes */}
        <g transform={`translate(506 250) scale(${reSc})`}>
          <circle r={152} fill="url(#s1reactor)" opacity={reGlow} />
          <g transform={`rotate(${lf * 0.8})`}>
            <polygon points={hex(120)} fill="none" stroke="rgba(150,180,235,1)" strokeWidth={2.5} opacity={reRing} />
            <polygon points={hex(96)} fill="none" stroke="rgba(214,228,255,1)" strokeWidth={1.4} opacity={reRing * 0.7} />
          </g>
          <g transform={`rotate(${-lf * 1.15})`}>
            <polygon points="0,-84 84,0 0,84 -84,0" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={2} opacity={reRing * 0.8} />
          </g>
          <g transform={`rotate(${lf * 0.5})`}>
            {Array.from({ length: 6 }).map((_, k) => {
              const a = (k / 6) * Math.PI * 2;
              return <line key={k} x1={Math.cos(a) * 60} y1={Math.sin(a) * 60} x2={Math.cos(a) * 134} y2={Math.sin(a) * 134} stroke="rgba(150,180,235,0.55)" strokeWidth={1.5} opacity={reRing} />;
            })}
          </g>
        </g>
      </svg>

      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <defs>
          <radialGradient id="s1ray" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="rgba(255,240,208,0.18)" />
            <stop offset="100%" stopColor="rgba(255,240,208,0)" />
          </radialGradient>
          <radialGradient id="s1core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="52%" stopColor="rgba(214,228,255,0.36)" />
            <stop offset="100%" stopColor="rgba(214,228,255,0)" />
          </radialGradient>
        </defs>
        {/* concentric arena rings behind the roster */}
        {[142, 240, 346, 460, 584].map((r, i) => (
          <circle key={`ring${i}`} cx={506} cy={292} r={r + Math.sin(lf / 24 + i) * 3} fill="none" stroke={`rgba(150,172,224,${0.15 - i * 0.019})`} strokeWidth={2} />
        ))}
        {/* twin dashed rings spinning opposite ways */}
        <circle cx={506} cy={292} r={190} fill="none" stroke="rgba(120,150,215,0.18)" strokeWidth={2} strokeDasharray="10 16" style={{ transform: `rotate(${lf * 0.7}deg)`, transformOrigin: "506px 292px" }} />
        <circle cx={506} cy={292} r={214} fill="none" stroke="rgba(150,120,215,0.11)" strokeWidth={1.6} strokeDasharray="4 22" style={{ transform: `rotate(${-lf * 0.5}deg)`, transformOrigin: "506px 292px" }} />
        {/* radial spokes */}
        {Array.from({ length: 30 }).map((_, i) => {
          const a = (i / 30) * Math.PI * 2;
          return <line key={`spk${i}`} x1={506 + Math.cos(a) * 118} y1={292 + Math.sin(a) * 118} x2={506 + Math.cos(a) * 660} y2={292 + Math.sin(a) * 660} stroke="rgba(120,142,196,0.05)" strokeWidth={1.4} />;
        })}
        {/* twin god-rays from above */}
        <polygon points="506,-40 286,792 726,792" fill="url(#s1ray)" opacity={0.7} />
        <polygon points="506,-40 432,792 580,792" fill="url(#s1ray)" opacity={0.85} />
        {/* perspective floor grid */}
        {Array.from({ length: 15 }).map((_, i) => {
          const k = i - 7;
          return <line key={`fv${i}`} x1={506 + k * 120} y1={792} x2={506 + k * 13} y2={432} stroke="rgba(132,158,218,0.13)" strokeWidth={1.5} />;
        })}
        {[432, 448, 470, 500, 542, 600, 678, 782].map((y, i) => (
          <line key={`fh${i}`} x1={0} y1={y} x2={1012} y2={y} stroke={`rgba(132,158,218,${0.05 + i * 0.013})`} strokeWidth={1.5} />
        ))}
        <line x1={0} y1={432} x2={1012} y2={432} stroke="rgba(155,185,235,0.32)" strokeWidth={2} />
      </svg>

      {/* radar sweep over the arena */}
      <div style={{ position: "absolute", left: 506 - 330, top: 292 - 330, width: 660, height: 660, borderRadius: "50%", background: `conic-gradient(from ${lf * 2.4}deg, transparent 0deg, rgba(150,180,235,0.16) 22deg, transparent 46deg)`, zIndex: 1, mixBlendMode: "screen", pointerEvents: "none" }} />

      {/* HUD corner brackets framing the select screen (geometric, no text) */}
      {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map((b, k) => (
        <div key={`hud${k}`} style={{ position: "absolute", [b[0]]: 20, [b[1]]: 20, width: 40, height: 40, borderTop: b[0] === "top" ? "3px solid rgba(150,175,225,0.5)" : "none", borderBottom: b[0] === "bottom" ? "3px solid rgba(150,175,225,0.5)" : "none", borderLeft: b[1] === "left" ? "3px solid rgba(150,175,225,0.5)" : "none", borderRight: b[1] === "right" ? "3px solid rgba(150,175,225,0.5)" : "none", zIndex: 8, opacity: 0.6 + glowPulse * 0.2 } as any} />
      ))}

      {/* atmospheric embers + drifting motes */}
      <Embers lf={lf} n={16} base={782} />
      {Array.from({ length: 24 }).map((_, i) => {
        const t = (lf * 0.5 + seed(i) * 520) % 520;
        return <div key={`mo${i}`} style={{ position: "absolute", left: 48 + seed(i * 2) * 916, top: 640 - t, width: 3, height: 3, borderRadius: "50%", background: "rgba(214,228,255,0.42)", opacity: 0.26 + Math.sin(lf / 8 + i) * 0.26, zIndex: 2 }} />;
      })}

      {/* ================= side console equalizer towers ================= */}
      {[0, 1].map((ti) => (
        <div key={`tw${ti}`} style={{ position: "absolute", left: ti === 0 ? 8 : undefined, right: ti === 1 ? 8 : undefined, top: 300, width: 58, height: 236, zIndex: 2, borderRadius: 9, background: "linear-gradient(180deg, rgba(30,38,58,0.9), rgba(12,16,26,0.94))", border: "1.5px solid rgba(90,110,150,0.4)", boxShadow: "inset 0 0 22px rgba(0,0,0,0.6)", overflow: "hidden" }}>
          {Array.from({ length: 3 }).map((_, k) => {
            const onL = Math.sin(lf / 5 + k * 2 + ti * 3) > 0;
            const c = [GOLD, GREEN, SKY][k];
            return <div key={`led${k}`} style={{ position: "absolute", top: 9, left: 9 + k * 15, width: 8, height: 8, borderRadius: "50%", background: onL ? c : "rgba(90,80,60,0.5)", boxShadow: onL ? `0 0 8px ${c}` : "none" }} />;
          })}
          {Array.from({ length: 5 }).map((_, k) => {
            const h = 34 + Math.abs(Math.sin(lf / 7 + k * 1.3 + ti)) * 72;
            const c = [GREEN, SKY, GOLD, GREEN, SKY][k];
            return <div key={`eq${k}`} style={{ position: "absolute", bottom: 12, left: 8 + k * 9, width: 7, height: h, borderRadius: 3, background: `linear-gradient(180deg, ${c}, ${c}44)`, boxShadow: `0 0 6px ${c}` }} />;
          })}
        </div>
      ))}

      {/* ================= per-agent bays: spotlight + select cell + power bar ================= */}
      {A.map((ag, i) => {
        const on = lf >= landF[i];
        const ign = over(lf, landF[i], fr(0.4), Easing.out(Easing.back(1.5)));
        const igC = Math.min(1, over(lf, landF[i], fr(0.4)));
        const pop = 1 + Math.max(0, ign - igC) * 0.9; // back-overshoot snap on the pod
        const pulse = 0.5 + Math.sin(lf / 7 + i) * 0.5;
        return (
          <React.Fragment key={`bay${i}`}>
            <SpotCone x={ag.x} top={28} topW={54} botW={248} h={548} color={`rgba(${on ? "255,246,220" : "170,182,206"},${on ? 0.05 + igC * 0.14 : 0.045})`} sway={2} lf={lf} />
            {/* angled portrait cell */}
            <div style={{ position: "absolute", left: ag.x - 96, top: cellTop, width: 192, height: cellH, zIndex: 3, transform: `skewX(-5deg) scale(${pop})`, transformOrigin: "50% 60%", borderRadius: 13, background: on ? `linear-gradient(158deg, ${ag.tint}30, rgba(11,14,22,0.72))` : "linear-gradient(158deg, rgba(40,47,64,0.5), rgba(11,14,22,0.6))", border: `2.5px solid ${on ? ag.tint : "rgba(92,102,124,0.5)"}`, boxShadow: on ? `0 0 ${16 + pulse * 26}px ${ag.tint}66, inset 0 0 46px ${ag.tint}22` : "inset 0 0 30px rgba(0,0,0,0.5)", overflow: "hidden" }}>
              {/* scanline shimmer */}
              <div style={{ position: "absolute", left: 0, right: 0, top: `${((lf * 2.4 + i * 46) % (cellH + 60)) - 60}px`, height: 64, background: `linear-gradient(180deg, transparent, ${on ? ag.tint : "#3A4256"}22, transparent)`, opacity: 0.5 }} />
              {/* fine scanlines texture */}
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 5px)", opacity: 0.4 }} />
              {/* tint floor glow inside cell */}
              {on && <div style={{ position: "absolute", left: 0, right: 0, bottom: -30, height: 112, background: `radial-gradient(ellipse at 50% 100%, ${ag.tint}55, transparent 70%)`, opacity: 0.6 + pulse * 0.3 }} />}
              {/* corner brackets */}
              {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map((b, k) => (
                <div key={k} style={{ position: "absolute", [b[0]]: 9, [b[1]]: 9, width: 18, height: 18, borderTop: b[0] === "top" ? `3px solid ${on ? ag.tint : "rgba(122,132,152,0.6)"}` : "none", borderBottom: b[0] === "bottom" ? `3px solid ${on ? ag.tint : "rgba(122,132,152,0.6)"}` : "none", borderLeft: b[1] === "left" ? `3px solid ${on ? ag.tint : "rgba(122,132,152,0.6)"}` : "none", borderRight: b[1] === "right" ? `3px solid ${on ? ag.tint : "rgba(122,132,152,0.6)"}` : "none" } as any} />
              ))}
            </div>
            {/* power bar above the cell, fills with tint on lock */}
            <div style={{ position: "absolute", left: ag.x - 84, top: cellTop - 22, width: 168, height: 11, zIndex: 6, borderRadius: 6, background: "rgba(20,26,40,0.85)", border: `1.5px solid ${on ? ag.tint : "rgba(96,106,128,0.5)"}`, overflow: "hidden", transform: "skewX(-5deg)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${igC * 100}%`, background: `linear-gradient(90deg, ${ag.tint}, ${lerpHex(ag.tint, "#FFFFFF", 0.35)})`, boxShadow: `0 0 10px ${ag.tint}` }} />
            </div>
            {/* ready diamond beneath the cell */}
            <div style={{ position: "absolute", left: ag.x - 9, top: cellTop + cellH + 14, width: 18, height: 18, background: on ? ag.tint : "rgba(70,80,100,0.55)", boxShadow: on ? `0 0 ${8 + pulse * 12}px ${ag.tint}` : "none", transform: `rotate(45deg) scale(${on ? 1 + igC * 0.16 : 0.8})`, zIndex: 6, borderRadius: 3 }} />
            {/* landing shadow pool */}
            <div style={{ position: "absolute", left: ag.x - 80, top: cellTop + 208, width: 160, height: 28, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 20%, transparent 72%)", zIndex: 4 }} />
          </React.Fragment>
        );
      })}

      {/* ================= idea scroll (the one paragraph) ================= */}
      {lf < pullAt + fr(0.35) && (
        <div style={{ position: "absolute", left: cx - 158, top: scrollY, width: 316, zIndex: 24, transform: `rotate(${scrollWob}deg) translateY(${suck * -74}px) scale(${1 - suck * 0.84})`, opacity: 1 - suck, transformOrigin: "50% 0%" }}>
          {/* charge halo tightening around the scroll before the suck */}
          <div style={{ position: "absolute", left: 158 - 150, top: 96 - 60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.12 + ramp(lf, settleTo - 6, pullAt) * 0.22}), transparent 60%)`, transform: `scale(${0.7 + glowPulse * 0.08})`, zIndex: -1 }} />
          {/* top rolled rod */}
          <div style={{ height: 20, borderRadius: 10, background: "linear-gradient(180deg,#8C6A46,#5E4426)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }} />
          {/* parchment body */}
          <div style={{ position: "relative", margin: "-2px 12px 0", padding: "22px 22px 26px", background: "linear-gradient(158deg,#F5ECD8,#E4D5B4)", boxShadow: `inset 0 0 26px rgba(150,120,70,0.28), 0 14px 30px -10px rgba(0,0,0,0.6), 0 0 ${10 + glowPulse * 16}px rgba(231,178,76,0.3)` }}>
            {/* lightbulb glyph = the idea */}
            <svg viewBox="0 0 40 40" width={34} height={34} style={{ position: "absolute", left: 18, top: 14 }}>
              <circle cx={20} cy={16} r={11} fill={GOLD} stroke="#8A6430" strokeWidth={2} style={{ filter: `drop-shadow(0 0 ${3 + glowPulse * 5}px ${GOLD})` }} />
              <rect x={15} y={25} width={10} height={7} rx={2} fill="#8A6430" />
              <path d="M14 16 L18 20 L26 11" fill="none" stroke="#5E4426" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* placeholder paragraph lines (NO real words) */}
            {[60, 92, 86, 78, 52].map((w, k) => (
              <div key={k} style={{ marginTop: k === 0 ? 6 : 11, marginLeft: k === 0 ? 46 : 0, height: 8, width: `${w}%`, borderRadius: 4, background: "rgba(90,70,44,0.42)" }} />
            ))}
          </div>
          {/* bottom rolled rod */}
          <div style={{ height: 20, borderRadius: 10, background: "linear-gradient(180deg,#5E4426,#8C6A46)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }} />
        </div>
      )}

      {/* ================= single Claude, overcharging before the split ================= */}
      {lf >= chargeAt && lf < splitAt + fr(0.18) && (
        <div style={{ position: "absolute", left: cx - 82, top: 84, width: 164, zIndex: 26, transform: `scale(${single * (1 + singleFlash * 0.46)})`, transformOrigin: "50% 92%" }}>
          {/* charge aura growing toward the split */}
          <div style={{ position: "absolute", left: 82 - 122, top: 88 - 122, width: 244, height: 244, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${0.14 + chargeUp * 0.4}), transparent 62%)`, transform: `scale(${0.64 + Math.sin(lf / 4) * 0.12 + singleFlash})` }} />
          {/* converging streaks pulled inward */}
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI * 2 + lf / 8;
            const rd = 150 - chargeUp * 70 + Math.sin(lf / 3 + k) * 10;
            return <div key={`cv${k}`} style={{ position: "absolute", left: 82 + Math.cos(a) * rd, top: 92 + Math.sin(a) * rd, width: 5, height: 22, background: `linear-gradient(180deg, ${[GREEN, RED, GOLD, SLATE][k % 4]}, transparent)`, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`, borderRadius: 3, opacity: 0.4 + chargeUp * 0.5 }} />;
          })}
          <Mascot lf={lf} size={164} nodAmp={3} nodSpeed={7} cheer={0.3} />
          {/* pre-split crackle ring */}
          {lf > splitAt - 12 && Array.from({ length: 8 }).map((_, k) => {
            const a = (k / 8) * Math.PI * 2 + lf / 5;
            return <div key={`ck${k}`} style={{ position: "absolute", left: 82 + Math.cos(a) * 64, top: 90 + Math.sin(a) * 64, width: 5, height: 26, background: "linear-gradient(180deg,#fff,transparent)", transform: `rotate(${(a * 180) / Math.PI}deg)`, borderRadius: 3, opacity: 0.85 }} />;
          })}
        </div>
      )}

      {/* ================= split: white core + shockwave ring + colored streaks ================= */}
      {swO > 0.02 && (
        <>
          <div style={{ position: "absolute", left: cx - 132, top: splitY - 132, width: 264, height: 264, zIndex: 30 }}>
            <svg viewBox="0 0 264 264" width={264} height={264}><circle cx={132} cy={132} r={132} fill="url(#s1core)" opacity={swO} /></svg>
          </div>
          <div style={{ position: "absolute", left: cx - swR, top: splitY - swR, width: swR * 2, height: swR * 2, borderRadius: "50%", border: `${6 + swO * 12}px solid rgba(255,255,255,${swO * 0.82})`, boxShadow: `0 0 46px rgba(255,255,255,${swO * 0.5})`, zIndex: 30 }} />
        </>
      )}
      {swO > 0.04 && A.map((ag, i) => {
        const dx = ag.x - cx, dy = bayTop - splitY;
        const len = Math.hypot(dx, dy), ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        return <div key={`str${i}`} style={{ position: "absolute", left: cx, top: splitY, width: len * swP, height: 9, marginTop: -4.5, background: `linear-gradient(90deg, transparent, ${ag.tint})`, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, opacity: swO, borderRadius: 5, filter: `drop-shadow(0 0 6px ${ag.tint})`, zIndex: 29 }} />;
      })}

      {/* ================= the four SLAM into the roster (ready-to-fight lineup) ================= */}
      {A.map((ag, i) => {
        const tp = over(lf, slamAt[i], 13, Easing.out(Easing.back(1.15)));
        if (tp < 0.01) return null;
        const flying = lf < landF[i];
        const px = interpolate(tp, [0, 1], [cx, ag.x]);
        const py = interpolate(tp, [0, 1], [splitY + 6, bayTop]) - Math.sin(Math.min(1, tp) * Math.PI) * 146;
        const scale = flying ? interpolate(tp, [0, 1], [0.42, 1]) : 1;
        const e = lf - landF[i];
        const sqz = e >= 0 && e < 12 ? Math.sin((e / 12) * Math.PI) * 0.18 : 0;
        const lean = flying ? 0 : ag.lean + bob(lf, 1.4, 88, i * 0.4);
        const bobY = flying ? 0 : bob(lf, 4, 66, i * 0.3);
        const dust = over(lf, landF[i], fr(0.42));
        const landed = lf >= landF[i];
        const pulse = 0.5 + Math.sin(lf / 6 + i) * 0.5;
        return (
          <div key={`hero${i}`} style={{ position: "absolute", left: px - 79, top: py + bobY, width: 158, zIndex: 20 + (flying ? 6 : 0), transform: `scale(${scale * (1 + sqz)}, ${scale * (1 - sqz)}) rotate(${lean}deg)`, transformOrigin: "50% 100%" }}>
            {/* localized landing flash (never full-screen) */}
            {landed && e >= 0 && e < 10 && <div style={{ position: "absolute", left: 79 - 96, top: 150 - 96, width: 192, height: 192, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${Math.max(0, 1 - e / 10) * 0.5}), ${ag.tint}55 40%, transparent 70%)`, zIndex: -1, mixBlendMode: "screen" }} />}
            {/* tint aura behind a landed hero */}
            {landed && <div style={{ position: "absolute", left: 79 - 106, top: 150 - 106, width: 212, height: 212, borderRadius: "50%", background: `radial-gradient(circle, ${ag.tint}${Math.round((0.2 + pulse * 0.15) * 255).toString(16).padStart(2, "0")}, transparent 60%)`, transform: `scale(${0.82 + pulse * 0.12})`, zIndex: -1 }} />}
            {/* motion-blur ghost trail while flying */}
            {flying && <div style={{ position: "absolute", left: 28, top: 40, width: 100, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${ag.tint}55, transparent 60%)`, filter: "blur(9px)", transform: `translate(${(cx - px) * 0.16}px, -44px)` }} />}
            <Mascot lf={lf + i * 4} size={158} shock={flying ? 0.4 : 0} {...ag.fit} />
            {/* charge sparks rising during the hold */}
            {landed && Array.from({ length: 3 }).map((_, k) => {
              const t = ((lf / 24 + seed(i * 5 + k)) % 1);
              return <div key={`sp${k}`} style={{ position: "absolute", left: 38 + seed(i + k) * 88, top: 150 - t * 130, width: 5, height: 5, borderRadius: "50%", background: ag.tint, boxShadow: `0 0 8px ${ag.tint}`, opacity: (1 - t) * 0.9 }} />;
            })}
            {/* landing dust ring */}
            {dust > 0.02 && dust < 1 && Array.from({ length: 9 }).map((_, k) => {
              const a = (k / 9) * Math.PI - Math.PI;
              const d = dust * 98;
              return <div key={`d${k}`} style={{ position: "absolute", left: 79 + Math.cos(a) * d, top: 176 + Math.abs(Math.sin(a)) * 8, width: 26 * (1 - dust) + 8, height: 26 * (1 - dust) + 8, borderRadius: "50%", background: "rgba(202,212,232,0.4)", opacity: (1 - dust) * 0.85 }} />;
            })}
          </div>
        );
      })}

      {/* ================= VS energy clashes between the pairs (geometric lightning, no letters) ================= */}
      {[0, 1, 2].map((i) => {
        const on = lf >= clashAt && lf >= landF[i + 1];
        if (!on) return null;
        const midX = (A[i].x + A[i + 1].x) / 2;
        const flick = 0.4 + Math.abs(Math.sin(lf / 3 + i * 1.7)) * 0.6;
        const c1 = A[i].tint, c2 = A[i + 1].tint;
        const pts = Array.from({ length: 7 }).map((_, k) => {
          const y = 396 + k * 26;
          const jx = midX + (k % 2 ? 1 : -1) * (6 + seed(k + Math.floor(lf / 4)) * 16);
          return `${k === 0 ? "M" : "L"} ${jx} ${y}`;
        }).join(" ");
        return (
          <React.Fragment key={`clash${i}`}>
            <div style={{ position: "absolute", left: midX - 34, top: 466, width: 68, height: 68, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,255,255,${flick}), ${lerpHex(c1, c2, 0.5)}88 45%, transparent 70%)`, transform: `scale(${0.8 + flick * 0.5})`, zIndex: 32, mixBlendMode: "screen" }} />
            <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 31, mixBlendMode: "screen" }}>
              <path d={pts} fill="none" stroke="#fff" strokeWidth={4} strokeLinejoin="round" opacity={flick} style={{ filter: "drop-shadow(0 0 6px #fff)" }} />
              <path d={pts} fill="none" stroke={lerpHex(c1, c2, 0.5)} strokeWidth={9} strokeLinejoin="round" opacity={flick * 0.5} />
            </svg>
            {Array.from({ length: 8 }).map((_, k) => {
              const a = (k / 8) * Math.PI * 2 + lf / 6;
              const r = 24 + (Math.sin(lf / 4 + k) + 1) * 18;
              return <div key={`cs${k}`} style={{ position: "absolute", left: midX + Math.cos(a) * r, top: 500 + Math.sin(a) * r, width: 5, height: 5, borderRadius: "50%", background: k % 2 ? c1 : c2, boxShadow: `0 0 8px ${k % 2 ? c1 : c2}`, opacity: flick, zIndex: 33 }} />;
            })}
          </React.Fragment>
        );
      })}

      {/* ================= foreground: watching-audience silhouettes + console rail ================= */}
      {Array.from({ length: 9 }).map((_, k) => {
        const sx = 60 + k * 108 + Math.sin(k * 1.3) * 10;
        const hsz = 40 + seed(k * 1.7) * 16;
        const by = 706 + bob(lf, 4, 72, k * 0.7);
        const rimC = A[k % 4].tint;
        return (
          <React.Fragment key={`spec${k}`}>
            <div style={{ position: "absolute", left: sx + hsz * 0.2, top: by, width: hsz * 0.6, height: hsz * 0.6, borderRadius: "50%", background: "#070A12", boxShadow: `inset 3px 3px 6px rgba(70,90,130,0.22), 0 0 10px ${rimC}22`, zIndex: 21 }} />
            <div style={{ position: "absolute", left: sx, top: by + hsz * 0.48, width: hsz, height: hsz * 0.7, borderRadius: "42% 42% 12px 12px", background: "#060912", boxShadow: `inset 2px 2px 5px rgba(70,90,130,0.18)`, zIndex: 21 }} />
          </React.Fragment>
        );
      })}
      {/* dark foreground console rail */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 48, zIndex: 23, background: "linear-gradient(180deg, rgba(18,24,40,0.35), rgba(8,11,20,0.97))", borderTop: "2px solid rgba(120,150,215,0.4)", boxShadow: "0 -6px 24px rgba(80,120,200,0.2)" }} />
      {/* per-agent status segment lights on the rail */}
      {A.map((ag, i) => {
        const onL = lf >= landF[i];
        return <div key={`seg${i}`} style={{ position: "absolute", left: ag.x - 42, bottom: 15, width: 84, height: 6, borderRadius: 3, background: onL ? `linear-gradient(90deg, ${ag.tint}, ${lerpHex(ag.tint, "#FFFFFF", 0.4)})` : "rgba(60,70,92,0.5)", boxShadow: onL ? `0 0 10px ${ag.tint}` : "none", zIndex: 24 }} />;
      })}

      {/* roster-lock sweep glint once all four have landed */}
      {allIn && lf < landF[3] + 24 && (
        <div style={{ position: "absolute", left: interpolate(lf - landF[3], [0, 24], [-320, 1140]), top: 0, width: 230, height: 792, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-14deg)", zIndex: 34, mixBlendMode: "screen" }} />
      )}

      {/* burst FX on the split + each character slam */}
      <Sparkles lf={lf} at={splitAt / 30} x={cx} y={splitY} n={22} spread={230} colors={[GREEN, RED, GOLD, SLATE, CREAM]} dur={1.0} />
      {A.map((ag, i) => (
        <Sparkles key={`slamspk${i}`} lf={lf} at={landF[i] / 30} x={ag.x} y={bayTop + 30} n={12} spread={150} colors={[ag.tint, CREAM]} dur={0.7} />
      ))}

      {/* white impact flash */}
      {flash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash, zIndex: 40, pointerEvents: "none" }} />}

      <Vignette strength={0.56} />
      <Grain op={0.05} />
    </div>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const GRN = "#3F9E74", GRNL = "#6FD3A0", GRND = "#0C1E1A";
  const HEART = "#E27BA0";

  // ---- 3-beat arc timing, all inside 104 frames ----
  const T_BURST = fr(0.24);
  // (a) ENTRANCE: hero rockets up through the stage floor on a spring
  const burst = Math.min(1.08, spr(lf, T_BURST, 12, 240));
  const rise = interpolate(burst, [0, 1], [230, 0], { extrapolateRight: "clamp" });
  const heroScale = 0.18 + Math.min(1, burst) * 0.82;
  const hop = burst > 0.65 ? Math.max(0, Math.sin((lf - fr(0.4)) / 8)) * 22 : 0;
  const armUp = Math.min(1, burst); // arms shoot up on entrance and stay
  const shakeDur = 14;
  const shake = lf >= T_BURST && lf < T_BURST + shakeDur ? Math.sin(lf * 3.2) * 9 * (1 - (lf - T_BURST) / shakeDur) : 0;
  const flash = lf >= T_BURST && lf < T_BURST + 7 ? 1 - (lf - T_BURST) / 7 : 0;
  // subtle camera push-in on the payoff beat
  const push = 1 + over(lf, fr(2.3), fr(1.2), Easing.inOut(Easing.cubic)) * 0.05;

  // (b) BUILD: the up-and-to-the-right hype graph on the jumbotron (no numbers)
  const bx = 322, by = 92, bw = 368, bh = 226;
  const ix = bx + 26, iy = by + 24, iw = bw - 52, ih = bh - 48;
  const fracs: [number, number][] = [[0.02, 0.86], [0.16, 0.76], [0.31, 0.82], [0.47, 0.55], [0.62, 0.62], [0.78, 0.32], [0.99, 0.04]];
  const pts = fracs.map(([fxr, fyr]) => [ix + fxr * iw, iy + fyr * ih] as [number, number]);
  const segLen = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const totLen = segLen.reduce((a, b) => a + b, 0);
  const gP = over(lf, fr(0.6), fr(2.2), Easing.out(Easing.cubic));
  const drawn = gP * totLen; let acc = 0, hx = pts[0][0], hy = pts[0][1], hang = -0.6;
  for (let i = 0; i < segLen.length; i++) { if (drawn <= acc + segLen[i] || i === segLen.length - 1) { const t = Math.max(0, Math.min(1, (drawn - acc) / segLen[i])); hx = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t; hy = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t; hang = Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0]); break; } acc += segLen[i]; }
  const dPath = "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");

  // (c) PAYOFF: staged pyro fountains + sparkle bursts (all within window)
  const pyroTimes = [fr(0.32), fr(1.9), fr(3.1)];

  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px) scale(${push})`, transformOrigin: "50% 46%", overflow: "hidden" }}>
        {/* ===== arena night backdrop ===== */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 92% at 50% 22%, #163A2F 0%, #0C1E1A 46%, #050C0B 100%)" }} />
        <div style={{ position: "absolute", left: cx - 380, top: 54, width: 760, height: 380, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(63,158,116,0.24), transparent 68%)", filter: "blur(2px)" }} />

        {/* ===== distant curved stadium tiers (deep back wall) ===== */}
        {Array.from({ length: 3 }).map((_, tier) => {
          const ty = 300 + tier * 30; const rad = 720 + tier * 60; const dim = 0.5 - tier * 0.12;
          return (
            <div key={`tier${tier}`} style={{ position: "absolute", left: cx - rad, top: ty - rad + 70, width: rad * 2, height: rad * 2, borderRadius: "50%", border: `18px solid rgba(${16 + tier * 8},${34 + tier * 8},${28 + tier * 6},${dim})`, borderBottomColor: "transparent", borderLeftColor: "transparent", borderRightColor: "transparent", zIndex: 1 }} />
          );
        })}
        {/* distant phone-flash light sea twinkling on the back tiers */}
        {Array.from({ length: 54 }).map((_, i) => {
          const r = seed(i * 2.3 + 1); const arc = (i / 53) * Math.PI * 0.86 + Math.PI * 0.07;
          const rr = 620 + seed(i * 1.7) * 120; const px = cx - Math.cos(arc) * rr; const py = 356 - Math.sin(arc) * rr * 0.42;
          if (py < 40 || py > 430) return null;
          const tw = 0.25 + Math.abs(Math.sin(lf / 5 + i * 1.7)) * 0.75;
          const warm = r > 0.6; const c = warm ? "#FFF2C6" : "#CFF6E2";
          return <div key={`ps${i}`} style={{ position: "absolute", left: px, top: py, width: 3, height: 3, borderRadius: "50%", background: c, opacity: tw * 0.7, boxShadow: `0 0 5px ${c}`, zIndex: 1 }} />;
        })}
        {/* out-of-focus bokeh light orbs for depth */}
        {Array.from({ length: 7 }).map((_, i) => {
          const r = seed(i * 3.7 + 2); const ox = 90 + r * 820 + Math.sin(lf / 50 + i) * 18; const oy = 130 + seed(i * 5.1) * 300;
          const sz = 40 + r * 70; const c = i % 2 ? "rgba(111,211,160,0.10)" : "rgba(255,230,170,0.08)";
          return <div key={`bk${i}`} style={{ position: "absolute", left: ox, top: oy, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, ${c}, transparent 70%)`, filter: "blur(3px)", zIndex: 1 }} />;
        })}

        {/* volumetric haze drifting */}
        {Array.from({ length: 4 }).map((_, i) => { const r = seed(i * 4.3); return <div key={`hz${i}`} style={{ position: "absolute", left: cx - 260 + Math.sin(lf / 40 + i * 2) * 60, top: 120 + i * 130, width: 520, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(111,211,160,${0.05 + r * 0.04}), transparent 70%)`, filter: "blur(6px)", opacity: 0.8, zIndex: 2 }} />; })}

        {/* ===== overhead lighting truss ===== */}
        <div style={{ position: "absolute", left: 40, right: 40, top: 30, height: 28, background: "repeating-linear-gradient(90deg,#20242C 0 10px,#12151B 10px 20px)", borderRadius: 5, boxShadow: "0 3px 8px rgba(0,0,0,0.5)", zIndex: 5 }}>
          {Array.from({ length: 18 }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${(i / 17) * 100}%`, top: 6, width: 10, height: 16, marginLeft: -5, background: "linear-gradient(180deg,#2A2F38,#14171D)", borderRadius: 2 }} />)}
        </div>
        {/* moving-head lights panning + soft lens-flare glow at each head */}
        {[130, 300, 506, 712, 882].map((lx, i) => { const pan = Math.sin(lf / 20 + i * 1.3) * 22; const on = 0.6 + Math.abs(Math.sin(lf / 14 + i)) * 0.4; const c = i % 2 ? "255,238,180" : "120,225,175"; return (
          <React.Fragment key={`mh${i}`}>
            <div style={{ position: "absolute", left: lx - 12, top: 44, width: 24, height: 24, background: "linear-gradient(180deg,#242A32,#0E1116)", borderRadius: 4, zIndex: 6, transform: `rotate(${pan * 0.4}deg)` }} />
            <div style={{ position: "absolute", left: lx - 26, top: 44, width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle, rgba(${c},${0.5 * on}), transparent 68%)`, zIndex: 6, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: lx, top: 60, width: 8, height: 660, marginLeft: -4, transformOrigin: "50% 0%", transform: `rotate(${pan}deg)`, background: `linear-gradient(180deg, rgba(${c},${0.3 * on}), rgba(${c},0) 78%)`, clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", zIndex: 4 }} />
          </React.Fragment>); })}

        {/* central god-ray pooling on the hero */}
        <SpotCone x={cx} top={46} topW={92} botW={528} h={700} color="rgba(180,255,215,0.13)" sway={5} lf={lf} pool={0.12} />
        {/* sweeping stage spotcones */}
        <SpotCone x={cx} top={60} topW={72} botW={440} h={580} color="rgba(180,255,215,0.14)" sway={4} lf={lf} />
        <SpotCone x={206} top={60} topW={38} botW={210} h={480} color="rgba(120,225,175,0.10)" sway={6} lf={lf} />
        <SpotCone x={806} top={60} topW={38} botW={210} h={480} color="rgba(255,230,170,0.09)" sway={6} lf={lf + 20} />

        {/* drifting dust motes in the central beam */}
        {Array.from({ length: 20 }).map((_, i) => {
          const bxm = cx - 220 + seed(i * 3.1 + 4) * 440;
          const spanY = 620; const by2 = ((lf * (0.3 + seed(i * 1.3) * 0.55) + seed(i * 7.7) * spanY) % spanY);
          const dx = Math.sin(lf * 0.02 + i) * 16; const r = 0.8 + seed(i * 2.2 + 9) * 2.4;
          const op = (0.10 + seed(i * 4.4) * 0.20) * (0.6 + 0.4 * Math.sin(lf * 0.06 + i));
          return <div key={`mo${i}`} style={{ position: "absolute", left: bxm + dx, top: 70 + by2, width: r * 2, height: r * 2, borderRadius: "50%", background: "#CFEFD9", opacity: op, zIndex: 5 }} />;
        })}

        {/* ===== JUMBOTRON: bold climbing hype dashboard (bars + rising line + up-arrow, no numbers) ===== */}
        <div style={{ position: "absolute", left: bx, top: by, width: bw, height: bh, borderRadius: 12, background: "linear-gradient(180deg,#123024,#06140E)", border: "7px solid #1B2028", boxShadow: "0 0 56px rgba(63,158,116,0.55), inset 0 0 40px rgba(0,0,0,0.5)", zIndex: 3, overflow: "hidden" }}>
          {/* inner green glow rising from bottom-right */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 92% 82% at 72% 92%, rgba(63,158,116,0.3), transparent 70%)" }} />
          {Array.from({ length: 6 }).map((_, i) => <div key={`gv${i}`} style={{ position: "absolute", left: ix - bx + (iw / 5) * i, top: iy - by, width: 1, height: ih, background: "rgba(120,200,160,0.16)" }} />)}
          {Array.from({ length: 5 }).map((_, i) => <div key={`gh${i}`} style={{ position: "absolute", left: ix - bx, top: iy - by + (ih / 4) * i, width: iw, height: 1, background: "rgba(120,200,160,0.14)" }} />)}
          {/* climbing bar chart (up and to the right) */}
          {Array.from({ length: 7 }).map((_, i) => {
            const grow = over(lf, fr(0.45 + i * 0.12), fr(0.5), Easing.out(Easing.back(1.25)));
            if (grow <= 0) return null;
            const barMax = ih * (0.2 + 0.76 * Math.pow(i / 6, 0.82));
            const bhh = barMax * Math.min(1.06, grow);
            const bwid = (iw / 7) * 0.58;
            const bxx = ix - bx + (iw / 7) * i + ((iw / 7) - bwid) / 2;
            const byy = iy - by + ih - bhh;
            const lit = i >= 5;
            return <div key={`bar${i}`} style={{ position: "absolute", left: bxx, top: byy, width: bwid, height: bhh, borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, ${lit ? "#DBFFEC" : "#63E0A2"}, ${GREEN})`, boxShadow: `0 0 14px rgba(111,211,160,${0.45 + (i / 6) * 0.45})` }} />;
          })}
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 5px)", opacity: 0.4, pointerEvents: "none" }} />
          {/* bold rising line + bright fill */}
          <svg viewBox={`0 0 ${bw} ${bh}`} width={bw} height={bh} style={{ position: "absolute", left: 0, top: 0 }}>
            <defs>
              <linearGradient id="s2fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(111,211,160,0.5)" /><stop offset="1" stopColor="rgba(111,211,160,0)" /></linearGradient>
            </defs>
            {gP > 0.02 && <path d={`${dPath} L ${hx.toFixed(1)} ${(iy + ih).toFixed(1)} L ${pts[0][0].toFixed(1)} ${(iy + ih).toFixed(1)} Z`} fill="url(#s2fill)" opacity={0.6} />}
            <path d={dPath} fill="none" stroke="rgba(111,211,160,0.5)" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={totLen} strokeDashoffset={totLen * (1 - gP)} style={{ filter: "blur(4px)" }} />
            <path d={dPath} fill="none" stroke="#EAFFF3" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={totLen} strokeDashoffset={totLen * (1 - gP)} style={{ filter: "drop-shadow(0 0 7px rgba(111,211,160,1))" }} />
          </svg>
          {/* bright head dot */}
          {gP > 0.01 && <div style={{ position: "absolute", left: hx - bx - 11, top: hy - by - 11, width: 22, height: 22, borderRadius: "50%", background: "#FFFFFF", boxShadow: `0 0 22px ${GRNL}, 0 0 9px #fff` }} />}
          {/* big glowing UP-arrow riding the peak */}
          {gP > 0.7 && <div style={{ position: "absolute", left: hx - bx, top: hy - by + 4, transform: `translate(-50%,-50%) scale(${Math.min(1.12, (gP - 0.7) / 0.14)})`, opacity: Math.min(1, (gP - 0.7) / 0.1) }}><svg width={52} height={52} viewBox="0 0 40 40"><path d="M20 4 L35 26 L20 19.5 L5 26 Z" fill={GRNL} stroke="#EAFFF3" strokeWidth={2.5} strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 12px rgba(111,211,160,1))" }} /></svg></div>}
          {/* bezel LEDs */}
          {Array.from({ length: 22 }).map((_, i) => { const on = (i + Math.floor(lf / 3)) % 5 === 0; return <div key={`bz${i}`} style={{ position: "absolute", left: `${(i / 21) * 100}%`, top: -3, width: 5, height: 5, marginLeft: -2, borderRadius: "50%", background: on ? "#FFE9A0" : "rgba(255,233,160,0.28)", boxShadow: on ? "0 0 6px #FFE9A0" : "none" }} />; })}
        </div>

        {/* flanking speaker / LED stacks + live VU-meter bars */}
        {[36, 910].map((sxl, si) => (
          <div key={`sp${si}`} style={{ position: "absolute", left: sxl, top: 150, width: 66, height: 420, background: "linear-gradient(180deg,#161B22,#0B0F14)", borderRadius: 8, border: "3px solid #1E242E", zIndex: 4, overflow: "hidden" }}>
            {Array.from({ length: 6 }).map((_, r) => <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 12 + r * 66, height: 50, borderRadius: 6, background: "radial-gradient(circle at 50% 40%, #23303B, #0C1116 72%)", boxShadow: "inset 0 0 8px rgba(0,0,0,0.7)" }} />)}
            {/* pulsing VU bars up the side */}
            {Array.from({ length: 9 }).map((_, r) => { const lvl = Math.abs(Math.sin(lf / 6 + r * 0.8 + si * 2)); const lit = lvl > (r / 9); const c = r > 6 ? "#FF9C6E" : r > 3 ? "#FFE9A0" : GRNL; return <div key={`vu${r}`} style={{ position: "absolute", left: si ? 46 : 6, bottom: 10 + r * 40, width: 12, height: 30, borderRadius: 2, background: lit ? c : "rgba(255,255,255,0.06)", boxShadow: lit ? `0 0 8px ${c}` : "none", zIndex: 5 }} />; })}
            <div style={{ position: "absolute", left: si ? 0 : "auto", right: si ? "auto" : 0, top: 0, bottom: 0, width: 5, background: `linear-gradient(180deg, ${GRNL}, #FFE9A0)`, opacity: 0.5 + Math.abs(Math.sin(lf / 10 + si)) * 0.5, boxShadow: `0 0 10px ${GRNL}` }} />
          </div>
        ))}

        {/* ===== deep roaring crowd silhouettes (3 rows) leaping on the beat ===== */}
        {[0, 1, 2].map((row) => { const baseY = 476 + row * 44; const cnt = 24 - row * 3; const dim = 0.44 + row * 0.14; return (
          <div key={`row${row}`} style={{ zIndex: 6 + row }}>
            {Array.from({ length: cnt }).map((_, i) => { const gx = 26 + (i / (cnt - 1)) * 960 + seed(i * 7 + row) * 14; const ph = seed(i * 3 + row * 11); const jump = Math.max(0, Math.sin(lf / 9 + ph * 6)) * (8 + row * 3); const sz = 22 + row * 5 + seed(i) * 6; const cr = `rgba(${8 + (2 - row) * 6},${20 + (2 - row) * 8},${18 + (2 - row) * 6},${dim})`; return (
              <div key={i} style={{ position: "absolute", left: gx - sz / 2, top: baseY - jump, width: sz, height: sz * 1.5, zIndex: 6 + row }}>
                <div style={{ position: "absolute", left: sz * 0.25, top: 0, width: sz * 0.5, height: sz * 0.5, borderRadius: "50%", background: cr }} />
                <div style={{ position: "absolute", left: 0, top: sz * 0.42, width: sz, height: sz * 0.9, borderRadius: `${sz * 0.4}px ${sz * 0.4}px 0 0`, background: cr }} />
                <div style={{ position: "absolute", left: sz * 0.08, top: sz * 0.05, width: sz * 0.16, height: sz * 0.6, borderRadius: 4, background: cr, transform: `rotate(${18 + Math.sin(lf / 7 + ph * 5) * 8}deg)`, transformOrigin: "50% 100%" }} />
                <div style={{ position: "absolute", right: sz * 0.08, top: sz * 0.05, width: sz * 0.16, height: sz * 0.6, borderRadius: 4, background: cr, transform: `rotate(${-18 - Math.sin(lf / 7 + ph * 5) * 8}deg)`, transformOrigin: "50% 100%" }} />
                {seed(i * 5 + row) > 0.6 && <div style={{ position: "absolute", left: sz * 0.4, top: -8, width: 4, height: 4, borderRadius: "50%", background: "#FFF3C8", boxShadow: "0 0 7px #FFE9A0", opacity: 0.6 + Math.abs(Math.sin(lf / 6 + i)) * 0.4 }} />}
              </div>); })}
          </div>); })}

        {/* waving banners on poles in the crowd */}
        {[150, 372, 646, 862].map((fxl, i) => { const wv = Math.sin(lf / 6 + i * 1.7); const c = i % 2 ? GRNL : "#FFE9A0"; return (
          <div key={`fl${i}`} style={{ position: "absolute", left: fxl, top: 452 - Math.max(0, Math.sin(lf / 9 + i)) * 10, zIndex: 9 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: 64, background: "rgba(10,20,16,0.85)" }} />
            <div style={{ position: "absolute", left: 3, top: 2, width: 42, height: 26, background: `linear-gradient(90deg, ${c}, rgba(255,255,255,0.25))`, opacity: 0.9, transform: `perspective(80px) rotateY(${wv * 26}deg) skewY(${wv * 5}deg)`, transformOrigin: "0% 50%", borderRadius: 2, boxShadow: `0 0 8px ${c}` }} />
          </div>); })}

        {/* ===== a crowd of tiny GREEN clay mascots leaping on side risers ===== */}
        {burst > 0.35 && Array.from({ length: 8 }).map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1; const rank = Math.floor(i / 2);
          const mx = cx + side * (168 + rank * 74); const ph = seed(i * 5.7);
          const leap = Math.max(0, Math.sin(lf / 8 + ph * 6.28)) * (28 - rank * 4);
          const sz = 98 - rank * 15; const enter = spr(lf, T_BURST + 4 + i * 2, 13, 210);
          return (
            <div key={`tm${i}`} style={{ position: "absolute", left: mx - sz / 2, bottom: 150 + leap, width: sz, height: sz, transform: `scale(${Math.min(1, enter)})`, transformOrigin: "50% 100%", zIndex: 14, opacity: Math.min(1, enter), filter: "drop-shadow(0 0 12px rgba(63,158,116,0.5))" }}>
              <Mascot lf={lf + i * 9} size={sz} nodAmp={5} nodSpeed={6} tint={GRN} cheer={Math.min(1, enter)} />
            </div>);
        })}

        {/* ===== glossy stage floor + LED edge + hero riser ===== */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 164, background: "linear-gradient(180deg,#0A1713 0%,#050C0A 100%)", clipPath: "polygon(6% 0,94% 0,100% 100%,0 100%)", zIndex: 8 }} />
        {/* reflective floor light streaks */}
        {Array.from({ length: 7 }).map((_, i) => { const c = i % 2 ? "rgba(111,211,160,0.16)" : "rgba(255,233,160,0.12)"; return <div key={`fs${i}`} style={{ position: "absolute", left: cx + (i - 3) * 120, bottom: 0, width: 2, height: 150, transformOrigin: "50% 0%", transform: `skewX(${(i - 3) * 10}deg)`, background: `linear-gradient(180deg, ${c}, transparent)`, zIndex: 8 }} />; })}
        <div style={{ position: "absolute", left: cx, bottom: 148, width: 480, height: 12, transform: "translateX(-50%)", background: `linear-gradient(90deg, transparent, ${GRNL}, #FFE9A0, ${GRNL}, transparent)`, opacity: 0.85, boxShadow: `0 0 16px ${GRNL}`, zIndex: 9, borderRadius: 6 }} />
        <div style={{ position: "absolute", left: cx - 150, bottom: 76, width: 300, height: 74, background: "linear-gradient(180deg,#132821,#0A1512)", borderRadius: "10px 10px 6px 6px", border: "3px solid #1E3A2F", zIndex: 9, boxShadow: "0 -4px 18px rgba(63,158,116,0.3)" }} />

        {/* hero backlight aura + ground bounce */}
        <div style={{ position: "absolute", left: cx - 205, bottom: 118, width: 410, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(63,158,116,0.42), transparent 66%)", zIndex: 9, transform: `scale(${1 + Math.sin(lf / 6) * 0.07})` }} />
        <div style={{ position: "absolute", left: cx - 178, bottom: 106, width: 356, height: 72, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(111,211,160,0.55), transparent 70%)", zIndex: 10 }} />

        {/* ===== pyro spark fountains (staged payoff) ===== */}
        {pyroTimes.map((ft, fi) => [176, 836].map((px) => {
          const age = lf - ft; if (age < 0 || age > fr(1.0)) return null; const life = fr(1.0);
          return (
            <React.Fragment key={`py${fi}-${px}`}>
              {age < 10 && <div style={{ position: "absolute", left: px - 34, bottom: 150, width: 68, height: 68, borderRadius: "50%", background: "radial-gradient(circle, #FFF3C8, rgba(255,233,160,0) 70%)", opacity: 1 - age / 10, zIndex: 15 }} />}
              {Array.from({ length: 26 }).map((_, i) => { const t = age / life; const spd = 0.6 + seed(i * 3 + fi) * 0.9; const ang = (-Math.PI / 2) + (seed(i) - 0.5) * 0.9; const dist = spd * 270 * Math.min(1, t * 1.4); const sx = px + Math.cos(ang) * dist; const sy = 600 - Math.sin(ang) * dist + t * t * 250; const s = 3 + seed(i * 2) * 5; const c = seed(i) > 0.55 ? "#FFE9A0" : seed(i) > 0.28 ? GRNL : "#EAFFF3"; const o = Math.max(0, 1 - t) * 0.95; return <div key={i} style={{ position: "absolute", left: sx, top: sy, width: s, height: s, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 7px ${c}`, zIndex: 15 }} />; })}
            </React.Fragment>);
        }))}

        {/* ===== HERO: green Claude bursting on stage, arms up ===== */}
        <div style={{ position: "absolute", left: cx, bottom: 126 + hop, width: 8, transform: `translateX(-50%) translateY(${rise}px) scale(${heroScale})`, transformOrigin: "50% 100%", zIndex: 20, filter: "drop-shadow(0 0 28px rgba(63,158,116,0.72))" }}>
          <div style={{ position: "absolute", left: -132, bottom: 0, width: 264 }}>
            <Mascot lf={lf} size={264} nodAmp={4} nodSpeed={7} tint={GRN} cheer={armUp} />
          </div>
          {/* radiating hype rays behind the raised hero */}
          {burst > 0.55 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 + lf / 40; return <div key={`hr${i}`} style={{ position: "absolute", left: -3, bottom: 152, width: 6, height: 138, transformOrigin: "50% 100%", transform: `rotate(${(a * 180) / Math.PI}deg)`, background: "linear-gradient(0deg, rgba(111,211,160,0.5), transparent)", opacity: 0.5 + Math.sin(lf / 8 + i) * 0.2, zIndex: -1 }} />; })}
          {/* anamorphic lens-flare streak across the hero on entrance */}
          {flash > 0.02 && <div style={{ position: "absolute", left: -300, bottom: 210, width: 600, height: 5, transform: "translateY(-50%)", background: "linear-gradient(90deg, transparent, rgba(200,255,225,0.9), transparent)", opacity: flash, boxShadow: "0 0 22px rgba(150,255,210,0.9)", zIndex: 2 }} />}
        </div>

        {/* ===== foreground front-row framing silhouettes (close, dark, blurred) ===== */}
        {[[70, 150], [190, 120], [812, 128], [936, 148]].map((cfg, i) => { const [fxl, sz] = cfg; const ph = seed(i * 6.1 + 3); const jmp = Math.max(0, Math.sin(lf / 8 + ph * 6)) * 12; const arm = 20 + Math.sin(lf / 6 + ph * 5) * 14; return (
          <div key={`fg${i}`} style={{ position: "absolute", left: fxl - sz / 2, bottom: -sz * 0.35 - jmp, width: sz, height: sz * 1.4, filter: "blur(1.5px)", zIndex: 22 }}>
            <div style={{ position: "absolute", left: sz * 0.28, top: 0, width: sz * 0.44, height: sz * 0.44, borderRadius: "50%", background: "rgba(4,10,8,0.94)" }} />
            <div style={{ position: "absolute", left: 0, top: sz * 0.4, width: sz, height: sz, borderRadius: `${sz * 0.42}px ${sz * 0.42}px 0 0`, background: "rgba(4,10,8,0.94)" }} />
            <div style={{ position: "absolute", left: (i % 2 ? sz * 0.06 : sz * 0.7), top: sz * 0.02, width: sz * 0.16, height: sz * 0.7, borderRadius: 6, background: "rgba(4,10,8,0.94)", transform: `rotate(${(i % 2 ? 1 : -1) * arm}deg)`, transformOrigin: "50% 100%" }} />
            {/* raised phone light */}
            <div style={{ position: "absolute", left: (i % 2 ? sz * 0.02 : sz * 0.78), top: -sz * 0.02, width: 6, height: 6, borderRadius: 2, background: "#EAFFF3", boxShadow: "0 0 10px #CFF6E2", opacity: 0.7 + Math.abs(Math.sin(lf / 5 + i)) * 0.3 }} />
          </div>); })}

        {/* warm embers rising through the arena */}
        <Embers lf={lf} n={14} base={GOLD} />

        {/* ===== floating hearts rising from the adoring crowd ===== */}
        {Array.from({ length: 18 }).map((_, i) => { const life = 90 + seed(i) * 40; const t = ((lf - fr(0.9)) + seed(i * 4) * life) % life; if (lf < fr(0.9) || t < 0) return null; const p = t / life; const startX = 100 + seed(i) * 820; const hx2 = startX + Math.sin(lf / 14 + i * 2) * 26; const hy2 = 610 - p * 560; const s = 14 + seed(i * 2) * 12; const o = Math.min(1, p * 5) * Math.max(0, 1 - (p - 0.7) / 0.3); const c = seed(i * 6) > 0.5 ? GRNL : HEART; return (
          <div key={`ht${i}`} style={{ position: "absolute", left: hx2, top: hy2, width: s, height: s, opacity: o * 0.9, transform: `scale(${0.7 + p * 0.5})`, zIndex: 18 }}>
            <svg width={s} height={s} viewBox="0 0 24 24"><path d="M12 21 C12 21 3 13.5 3 8 A5 5 0 0 1 12 5 A5 5 0 0 1 21 8 C21 13.5 12 21 12 21 Z" fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }} /></svg>
          </div>); })}

        {/* rocketing green up-arrow streaks (momentum, no numbers) */}
        {Array.from({ length: 7 }).map((_, i) => { const life = 46; const t = ((lf + seed(i * 9) * life) % life) / life; const sx2 = 120 + i * 130 + Math.sin(lf / 20 + i) * 20; const sy2 = 640 - t * 600; const o = Math.sin(t * Math.PI) * 0.7; return (
          <div key={`up${i}`} style={{ position: "absolute", left: sx2, top: sy2, transform: "translateX(-50%)", opacity: o, zIndex: 12 }}>
            <svg width={26} height={44} viewBox="0 0 26 44"><path d="M13 0 L24 15 L16 15 L16 44 L10 44 L10 15 L2 15 Z" fill={GRNL} style={{ filter: `drop-shadow(0 0 8px ${GRNL})` }} /></svg>
          </div>); })}

        {/* confetti + celebratory sparkle bursts */}
        {lf > fr(0.32) && <Confetti lf={lf - fr(0.32)} n={44} colors={[GREEN, GRNL, GOLD, "#FCEDDD", HEART]} top={-20} h={790} />}
        <Sparkles lf={lf} at={0.26} x={cx} y={430} n={28} spread={380} colors={[GRNL, GOLD, "#fff", GREEN]} dur={1.0} />
        <Sparkles lf={lf} at={1.9} x={cx} y={430} n={20} spread={320} colors={[GRNL, "#fff", GOLD]} dur={0.85} />
        <Sparkles lf={lf} at={3.1} x={cx} y={430} n={22} spread={360} colors={[GRNL, GOLD, "#fff"]} dur={0.9} />

        <Vignette strength={0.62} shape="66% 64% at 50% 40%" />
        <Grain op={0.05} />
      </div>
      {/* burst white flash (hard pattern interrupt) */}
      {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 52%, rgba(230,255,240,0.85), rgba(230,255,240,0) 70%)", opacity: flash, zIndex: 40, pointerEvents: "none" }} />}
    </>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  // ============================ 3-BEAT TIMELINE ============================
  // A: hard entrance (0-0.9s) — skeptic storms in, white flash, shake
  // B: escalating cross-examination (0.9-4s) — 6 jabs spawn X-marks, cracks, red-flag pennants, sweat
  // C: payoff (4.5-5s) — red wax REJECT seal slams, card wilts & sinks, verdict flash
  const enterAt = fr(0.2);
  const enter = Math.min(1.08, spr(lf, enterAt, 11, 210));
  const jabTimes = [fr(0.9), fr(1.55), fr(2.25), fr(3.0), fr(3.75), fr(4.5)];
  const bump = (at: number) => { const d = lf - at; return d >= 0 && d < 9 ? Math.sin((d / 9) * Math.PI) : 0; };
  const thrust = jabTimes.reduce((m, at) => Math.max(m, bump(at)), 0);
  const lunge = thrust;
  const nearestJab = jabTimes.reduce((c, at) => Math.abs(lf - at) < Math.abs(lf - c) ? at : c, jabTimes[0]);

  // entry slam + per-jab micro shakes + verdict shake
  const entryShake = lf >= enterAt && lf < enterAt + 12 ? Math.sin(lf * 4) * 7 * (1 - (lf - enterAt) / 12) : 0;
  let jabShake = 0; jabTimes.forEach((at) => { const d = lf - at; if (d >= 3 && d < 8) jabShake += Math.sin(lf * 5.5) * 4 * (1 - (d - 3) / 5); });
  const verdictAt = fr(4.55);
  const verdictShake = lf >= verdictAt && lf < verdictAt + 10 ? Math.sin(lf * 3.4) * 6 * (1 - (lf - verdictAt) / 10) : 0;
  const shake = entryShake + jabShake + verdictShake;

  // subtle camera push that snaps in on each strike and on the verdict
  const cam = 1 + thrust * 0.018 + over(lf, verdictAt, fr(0.3)) * 0.03 * (1 - over(lf, verdictAt + fr(0.6), fr(0.8)));

  // ============================ SWINGING CAGED LAMP (pendulum) ============================
  const lampAng = Math.sin(lf / 23 + 0.5) * 0.17;
  const pivotX = 566, pivotY = -34, cord = 150;
  const shadeX = pivotX + Math.sin(lampAng) * cord;
  const shadeY = pivotY + Math.cos(lampAng) * cord;
  const poolX = pivotX + Math.sin(lampAng) * 300;
  const bulbFlick = 0.85 + Math.sin(lf / 2.3) * 0.05 + (seed(Math.floor(lf / 3)) > 0.9 ? -0.18 : 0);

  // moving cast-shadow direction from the swinging lamp (drives hard shadows)
  const shadowDir = -Math.sin(lampAng) * 60;

  // ============================ THE IDEA-CARD (suspect on trial) ============================
  const cw = 208, ch = 268;
  const cardX = 596, cardTop = 288;
  const lightOnCard = 1 - Math.min(1, Math.abs(poolX - cardX) / 320);
  const wilt = over(lf, fr(3.55), fr(1.5), Easing.out(Easing.cubic));
  const verdict = over(lf, verdictAt, fr(0.35), Easing.out(Easing.cubic));
  let flinch = 0; jabTimes.forEach((at) => { flinch += bump(at) * 7; });
  const idle = bob(lf, 1.3, 52) * (1 - thrust) * (1 - wilt);
  const cardRot = flinch * 0.9 + wilt * -14 + idle;
  const cardSink = wilt * 52;
  const cardScaleY = 1 - wilt * 0.14;

  // damning-case red alert intensity (drives room glow + audience unease)
  const alert = Math.min(1, over(lf, fr(3.4), fr(0.8)) + verdict * 0.6);
  const alertPulse = 0.5 + 0.5 * Math.sin(lf / 4);

  // skeptic charge-in + lean into each jab
  const skX = (1 - Math.min(1, enter)) * -400 + lunge * 30;
  const skLean = lunge * 6 + verdict * 2;

  // defect specs (card-local coords), sequenced to the jabs
  const xMarks = [{ at: fr(1.55), x: 58, y: 76, s: 30 }, { at: fr(2.25), x: 150, y: 146, s: 26 }, { at: fr(3.75), x: 100, y: 206, s: 42 }];
  const cracks = [{ at: fr(1.55), d: "M18 8 L52 62 L30 118 L74 176 L52 258" }, { at: fr(3.0), d: "M190 24 L150 84 L182 142 L142 206 L174 262" }, { at: fr(4.5), d: "M96 4 L104 70 L82 132 L112 196 L92 262" }];
  const flags = [{ at: fr(2.25), fx: 42, c: RED }, { at: fr(3.0), fx: 118, c: "#E8604C" }, { at: fr(3.75), fx: 168, c: RED }];

  // evidence-board pinned "photos" (icons, no words) + red string path
  const pins = [{ x: 96, y: 150 }, { x: 214, y: 128 }, { x: 168, y: 236 }, { x: 262, y: 300 }, { x: 108, y: 300 }];

  // ============================ THE OTHER COUNCIL (silhouettes watching in the dark) ============================
  const audience = [
    { tint: GREEN, x: 386, y: 500, size: 138, gaze: 2.2 },
    { tint: SLATE, x: 452, y: 452, size: 104, gaze: 3.0 },
    { tint: GOLD, x: 726, y: 496, size: 138, gaze: -1.6 },
  ];

  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.35}px) scale(${cam})`, transformOrigin: "52% 46%" }}>
        {/* ===================== DARK INTERROGATION ROOM ===================== */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#14161C 0%,#0C0D12 58%,#070709 100%)" }} />
        {/* moving warm ambient wash tracking the swinging pool */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 48% 42% at ${(poolX / 1012) * 100}% 28%, rgba(74,60,40,0.32), transparent 66%)` }} />

        {/* ===== VENETIAN-BLIND LIGHT STRIPES (hard light through an off-screen window, center-back) ===== */}
        <div style={{ position: "absolute", left: 356, top: 44, width: 452, height: 250, overflow: "hidden", opacity: 0.9, zIndex: 1 }}>
          {Array.from({ length: 11 }).map((_, i) => {
            const sway = Math.sin(lf / 30 + i * 0.4) * 3;
            const glow = 0.05 + 0.03 * (0.5 + 0.5 * Math.sin(lf / 22 + i));
            return <div key={`bl${i}`} style={{ position: "absolute", left: -40, right: -40, top: 8 + i * 22 + sway, height: 9, background: `linear-gradient(90deg,transparent,rgba(255,214,150,${glow}),rgba(255,224,160,${glow * 1.3}),rgba(255,214,150,${glow}),transparent)`, transform: "skewY(-7deg)", filter: "blur(1px)" }} />;
          })}
        </div>

        {/* concrete back-wall panel seams */}
        {[150, 340, 520, 700, 880].map((x, i) => <div key={`sm${i}`} style={{ position: "absolute", left: x, top: 36, width: 2, height: 500, background: "rgba(255,255,255,0.022)" }} />)}
        {[150, 320, 470].map((y, i) => <div key={`sh${i}`} style={{ position: "absolute", left: 0, right: 0, top: y, height: 2, background: "rgba(255,255,255,0.018)" }} />)}
        {/* faint stains / grime blooms for texture */}
        {[[210, 420, 120], [820, 200, 90], [640, 500, 140]].map((b, i) => <div key={`gr${i}`} style={{ position: "absolute", left: b[0], top: b[1], width: b[2], height: b[2] * 0.7, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.35), transparent 70%)" }} />)}

        {/* one-way mirror (right wall) with cold reflection */}
        <div style={{ position: "absolute", left: 806, top: 120, width: 176, height: 280, borderRadius: 6, background: "linear-gradient(150deg,#1A2230 0%,#0E121B 60%,#161C28 100%)", border: "5px solid #20242E", boxShadow: "inset 0 0 60px rgba(0,0,0,0.7), inset 0 0 22px rgba(120,150,200,0.06)", zIndex: 2 }}>
          <div style={{ position: "absolute", left: 18, top: 22, width: 70, height: 120, background: "linear-gradient(150deg,rgba(150,180,220,0.10),transparent 70%)", transform: "skewY(-14deg)", borderRadius: 4 }} />
          <div style={{ position: "absolute", left: 104, top: 60, width: 50, height: 96, background: "linear-gradient(150deg,rgba(150,180,220,0.06),transparent 70%)", transform: "skewY(-14deg)", borderRadius: 4 }} />
          {/* faint silhouette of the accused reflected, jitters on jabs */}
          <div style={{ position: "absolute", left: 58, top: 150, width: 60, height: 120, borderRadius: "26px 26px 6px 6px", background: "rgba(120,150,200,0.05)", transform: `translateX(${thrust * 4}px)` }} />
        </div>

        {/* ===== EVIDENCE BOARD (left wall): red string linking pinned photo-icons, NO words ===== */}
        <div style={{ position: "absolute", left: 46, top: 96, width: 300, height: 292, borderRadius: 8, background: "linear-gradient(160deg,#20242C,#14171D)", border: "6px solid #2A2E38", boxShadow: "inset 0 0 40px rgba(0,0,0,0.7), 0 14px 30px -12px rgba(0,0,0,0.6)", filter: `brightness(${0.55 + lightOnCard * 0.2})`, zIndex: 2, overflow: "hidden" }}>
          {/* red connecting string, drawn on progressively */}
          <svg viewBox="0 0 300 292" width={300} height={292} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {pins.slice(0, -1).map((p, i) => { const q = pins[i + 1]; const rp = over(lf, fr(1.4) + i * fr(0.5), fr(0.5)); if (rp <= 0.01) return null; return <line key={`ln${i}`} x1={p.x} y1={p.y} x2={p.x + (q.x - p.x) * rp} y2={p.y + (q.y - p.y) * rp} stroke={RED} strokeWidth={2.2} opacity={0.7} />; })}
          </svg>
          {/* pinned blank photos (rotated), a red pin on each */}
          {pins.map((p, i) => { const app = Math.min(1.1, spr(lf, fr(0.8) + i * fr(0.28), 12, 200)); if (app < 0.02) return null; const rot = (seed(i) - 0.5) * 22; return (
            <div key={`ph${i}`} style={{ position: "absolute", left: p.x - 28, top: p.y - 20, width: 56, height: 44, transform: `scale(${app}) rotate(${rot}deg)`, transformOrigin: "50% 0%", background: "linear-gradient(160deg,#CFC8BB,#A9A296)", border: "3px solid #E6E0D4", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }}>
              <div style={{ position: "absolute", inset: 4, background: "linear-gradient(150deg,#6E6A62,#3E3B36)" }} />
              <div style={{ position: "absolute", left: 22, top: -5, width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#F08070,#B8321E)", boxShadow: "0 0 5px rgba(196,74,58,0.8)" }} />
            </div>); })}
        </div>

        {/* layered atmospheric haze */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 250, height: 340, background: "radial-gradient(ellipse 62% 100% at 55% 60%, rgba(92,82,60,0.11), transparent 70%)" }} />

        {/* ===================== THE OTHER COUNCIL: dark observers behind the table ===================== */}
        {audience.map((a, i) => {
          const app = over(lf, fr(0.3) + i * fr(0.12), fr(0.5), Easing.out(Easing.cubic));
          if (app <= 0.01) return null;
          const breath = bob(lf, 2.4, 80 + i * 7, a.x * 1.3);
          const lean = thrust * 3 * (a.x < cardX ? 1 : -1) + Math.sin(lf * 0.05 + i) * 1.2;
          const unease = alert * (0.5 + 0.5 * Math.sin(lf / 5 + i * 2));
          const tintDark = lerpHex(a.tint, INK, 0.72);
          return (
            <div key={`aud${i}`} style={{ position: "absolute", left: a.x, top: a.y + breath - unease * 3, transform: `translate(-50%,-100%) rotate(${lean}deg) scale(${Math.min(1, app)})`, transformOrigin: "50% 100%", opacity: 0.9 * app, zIndex: 8 }}>
              {/* faint red backlight rim to lift them off the black wall */}
              <div style={{ position: "absolute", left: "50%", top: "44%", width: a.size * 1.1, height: a.size * 1.1, marginLeft: -a.size * 0.55, marginTop: -a.size * 0.55, borderRadius: "50%", background: `radial-gradient(circle, rgba(196,74,58,${0.12 + unease * 0.14}), transparent 66%)` }} />
              <div style={{ filter: `brightness(0.42) drop-shadow(0 0 10px rgba(196,74,58,${0.2 + unease * 0.2}))` }}>
                <Mascot lf={lf} size={a.size} tint={tintDark} stern={0.85} cheer={0} shock={unease * 0.4} gaze={a.gaze} nodAmp={2} nodSpeed={0.5} glasses={a.tint === GOLD ? 1 : 0} suit={a.tint === SLATE ? 1 : 0.4} wizard={0} samurai={0} />
              </div>
            </div>
          );
        })}
        {/* dark scrim to keep observers reading as silhouettes and add depth */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 52% 52%, transparent 30%, rgba(6,7,10,0.5) 100%)", zIndex: 8 }} />

        {/* ===================== HANGING LAMP: cord + caged shade (swings) ===================== */}
        <div style={{ position: "absolute", left: pivotX, top: 0, width: 3, height: shadeY, background: "linear-gradient(180deg,#2A2E38,#3A3F4A)", transformOrigin: "top center", transform: `rotate(${lampAng * 57}deg)`, marginLeft: -1.5, zIndex: 6 }} />
        <div style={{ position: "absolute", left: shadeX, top: shadeY + 8, width: 8, height: 570, marginLeft: -4, zIndex: 4, background: "linear-gradient(180deg, rgba(255,224,150,0.24), rgba(255,214,140,0.05) 55%, transparent)", clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0% 100%)", filter: "blur(1px)" }} />
        <SpotCone x={shadeX} top={shadeY + 6} topW={70} botW={440} h={570} color="rgba(255,220,150,0.16)" />
        {/* floor light pool (offset by swing) */}
        <div style={{ position: "absolute", left: poolX - 240, top: 500, width: 480, height: 152, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,216,140,0.24), transparent 70%)", zIndex: 3, opacity: bulbFlick }} />

        {/* ===== SMOKE / HAZE CURLING UP THROUGH THE BEAM ===== */}
        {Array.from({ length: 5 }).map((_, i) => {
          const cyc = ((lf * 0.6 + seed(i * 4.3 + 2) * 170) % 170) / 170;
          const bx = poolX + (seed(i * 2.1) - 0.5) * 150 + Math.sin(lf / 17 + i * 1.7) * 26 * cyc;
          const by = 548 - cyc * 330;
          const sz = 34 + cyc * 96;
          const op = Math.sin(cyc * Math.PI) * 0.12 * (0.6 + 0.4 * lightOnCard);
          return <div key={`sk${i}`} style={{ position: "absolute", left: bx - sz / 2, top: by - sz / 2, width: sz, height: sz, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,196,170,0.9), transparent 68%)", opacity: op, filter: "blur(6px)", zIndex: 6 }} />;
        })}

        {/* dust motes drifting in the beam */}
        {Array.from({ length: 20 }).map((_, i) => { const p = ((lf * 0.5 + seed(i) * 300) % 300) / 300; const bx = shadeX + (seed(i * 2) - 0.5) * (74 + p * 250); const by = shadeY + 40 + p * 490; return <div key={`du${i}`} style={{ position: "absolute", left: bx, top: by, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,238,200,0.55)", opacity: (1 - p) * 0.7, zIndex: 5 }} />; })}
        {/* the caged bulb shade */}
        <div style={{ position: "absolute", left: shadeX, top: shadeY, marginLeft: -46, marginTop: -18, zIndex: 8 }}>
          <div style={{ position: "absolute", left: 36, top: -6, width: 20, height: 12, background: "#2A2E38", borderRadius: "3px 3px 0 0" }} />
          <svg viewBox="0 0 92 78" width={92} height={78} style={{ overflow: "visible" }}>
            <path d="M14 8 L78 8 L70 40 L22 40 Z" fill="#23272F" stroke="#161A22" strokeWidth={3} />
            <path d="M22 40 L70 40 L64 58 L28 58 Z" fill="#191D25" />
            {[30, 46, 62].map((x) => <line key={x} x1={x - 4} y1={40} x2={x} y2={72} stroke="#2E333D" strokeWidth={3} />)}
            <line x1={20} y1={58} x2={72} y2={58} stroke="#2E333D" strokeWidth={3} />
            <circle cx={46} cy={44} r={13} fill="#FFE9A8" opacity={bulbFlick} />
            <circle cx={46} cy={44} r={22} fill="rgba(255,224,150,0.30)" opacity={bulbFlick} />
          </svg>
          <div style={{ position: "absolute", left: 46, top: 44, width: 124, height: 124, marginLeft: -62, marginTop: -62, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,224,150,0.46), transparent 65%)", opacity: bulbFlick }} />
        </div>
        {/* hard moving cage-shadow thrown on the back wall */}
        <div style={{ position: "absolute", left: shadeX - 60 + shadowDir * 1.4, top: shadeY - 150, width: 120, height: 130, opacity: 0.18 * bulbFlick, zIndex: 2, filter: "blur(2px)" }}>
          <svg viewBox="0 0 120 130" width={120} height={130}>
            {[26, 46, 66, 86].map((x) => <line key={x} x1={x} y1={0} x2={x - 8} y2={130} stroke="#000" strokeWidth={5} />)}
          </svg>
        </div>

        {/* ===================== METAL INTERROGATION TABLE ===================== */}
        {/* card cast-shadow on the table, swings with the lamp */}
        <div style={{ position: "absolute", left: cardX - 100 + shadowDir, top: 548, width: 200, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", opacity: 0.6 * bulbFlick, zIndex: 9, filter: "blur(3px)" }} />
        <div style={{ position: "absolute", left: 296, top: 550, width: 528, height: 20, background: "linear-gradient(180deg,#3C4048,#23262E)", borderRadius: 4, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)", boxShadow: "0 10px 24px -8px rgba(0,0,0,0.7)", zIndex: 9 }} />
        {/* table-top specular streak tracking the lamp */}
        <div style={{ position: "absolute", left: poolX - 130, top: 552, width: 260, height: 14, borderRadius: 8, background: "linear-gradient(90deg,transparent,rgba(255,224,150,0.28),transparent)", opacity: 0.7 * bulbFlick, zIndex: 10 }} />
        <div style={{ position: "absolute", left: 310, top: 568, width: 500, height: 122, background: "linear-gradient(180deg,#1B1E25,#0F1116)", clipPath: "polygon(2% 0, 98% 0, 88% 100%, 12% 100%)", zIndex: 9 }} />
        {/* case-file folder + scattered papers on the table (icons, no words) */}
        <div style={{ position: "absolute", left: 700, top: 528, width: 92, height: 30, background: "linear-gradient(160deg,#C89A55,#9C7638)", borderRadius: "4px 8px 4px 4px", transform: "rotate(-7deg)", boxShadow: "0 5px 10px rgba(0,0,0,0.5)", zIndex: 11 }}>
          <div style={{ position: "absolute", left: 6, top: -6, width: 34, height: 10, background: "#D8AB63", borderRadius: "4px 4px 0 0" }} />
          <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 3, background: "rgba(0,0,0,0.25)" }} />
        </div>
        <div style={{ position: "absolute", left: 336, top: 540, width: 70, height: 44, background: "#E9E3D6", transform: "rotate(6deg)", boxShadow: "0 4px 8px rgba(0,0,0,0.4)", zIndex: 11 }}>
          {[10, 18, 26, 34].map((y) => <div key={y} style={{ position: "absolute", left: 8, top: y, right: 10, height: 3, background: "#B7B0A2" }} />)}
        </div>

        {/* ===================== THE IDEA-CARD ON TRIAL ===================== */}
        <div style={{ position: "absolute", left: cardX - cw / 2, top: cardTop, width: cw, height: ch, transformOrigin: "50% 100%", transform: `translateY(${cardSink}px) rotate(${cardRot}deg) scaleY(${cardScaleY})`, zIndex: 16 }}>
          {/* card body */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: `linear-gradient(160deg, #FBFAF6, #E7E3DA)`, border: "3px solid #FFFFFF", boxShadow: `0 22px 44px -14px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(0,0,0,0.03)`, filter: `brightness(${0.72 + lightOnCard * 0.34})`, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, background: "linear-gradient(90deg,#D9D3C8,#C9C2B5)" }} />
            <div style={{ position: "absolute", left: 16, top: 14, width: 18, height: 18, borderRadius: 5, background: RED }} />
            <div style={{ position: "absolute", left: 44, top: 17, width: 74, height: 11, borderRadius: 4, background: "#B4AEA1" }} />
            <div style={{ position: "absolute", left: 22, top: 68, width: 130, height: 12, borderRadius: 5, background: "#C4BDB0" }} />
            <div style={{ position: "absolute", left: 22, top: 92, width: 164, height: 8, borderRadius: 4, background: "#D6D0C4" }} />
            <div style={{ position: "absolute", left: 22, top: 108, width: 140, height: 8, borderRadius: 4, background: "#D6D0C4" }} />
            <div style={{ position: "absolute", left: 22, top: 138, width: 164, height: 46, borderRadius: 8, background: "#DED8CC" }} />
            <div style={{ position: "absolute", left: 22, top: 196, width: 90, height: 8, borderRadius: 4, background: "#D6D0C4" }} />
            <div style={{ position: "absolute", left: 22, top: 212, width: 120, height: 8, borderRadius: 4, background: "#D6D0C4" }} />
            {/* reddening stress wash grows with each strike */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(196,74,58,0.16), transparent 72%)", opacity: Math.min(1, thrust + wilt * 0.6 + over(lf, fr(1.55), fr(2)) * 0.5 + verdict * 0.4) }} />
            {/* lamp specular sweep across the glossy card face */}
            <div style={{ position: "absolute", top: -10, bottom: -10, left: `${lightOnCard * 120 - 30}%`, width: "34%", background: "linear-gradient(100deg,transparent,rgba(255,255,255,0.28),transparent)", transform: "skewX(-14deg)", opacity: lightOnCard * 0.8 }} />
          </div>

          {/* sweat drops trickling down */}
          {Array.from({ length: 9 }).map((_, i) => { const start = fr(0.9) + seed(i) * 26; if (lf < start) return null; const spd = 30 + seed(i * 3) * 16; const k = ((lf - start) / spd) % 1; const dx = 20 + seed(i * 2) * (cw - 44); const dy = 26 + k * (ch - 52); const op = (k < 0.85 ? 0.85 : 0.85 * (1 - (k - 0.85) / 0.15)) * (0.45 + lightOnCard * 0.55); return <div key={`sw${i}`} style={{ position: "absolute", left: dx, top: dy, width: 6, height: 9, borderRadius: "50% 50% 55% 55% / 60% 60% 45% 45%", background: "linear-gradient(180deg,#EAF3FA,#9CC4E0)", boxShadow: "0 0 4px rgba(160,200,235,0.7)", opacity: op }} />; })}

          {/* spidering cracks */}
          <svg viewBox={`0 0 ${cw} ${ch}`} width={cw} height={ch} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {cracks.map((c, i) => { const p = over(lf, c.at, fr(0.45)); if (p <= 0.01) return null; return <path key={i} d={c.d} fill="none" stroke="#2A2622" strokeWidth={2.5} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={(1 - p) * 700} opacity={0.82} />; })}
          </svg>

          {/* red X marks punched on each weak point */}
          {xMarks.map((m, i) => { const pop = Math.min(1.12, spr(lf, m.at, 9, 240)); if (pop < 0.02) return null; return (
            <div key={`x${i}`} style={{ position: "absolute", left: m.x, top: m.y, transform: `translate(-50%,-50%) scale(${pop}) rotate(${bump(m.at) * 22}deg)`, filter: "drop-shadow(0 0 6px rgba(196,74,58,0.7))" }}>
              {[45, -45].map((r) => <div key={r} style={{ position: "absolute", left: -2.5, top: -m.s / 2, width: 5, height: m.s, borderRadius: 3, background: RED, transform: `rotate(${r}deg)` }} />)}
            </div>); })}

          {/* red flag pennants sprouting from the top edge (icons, no words) */}
          {flags.map((f, i) => { const pop = Math.min(1.14, spr(lf, f.at, 10, 220)); if (pop < 0.02) return null; const wave = Math.sin(lf / 5 + i * 1.3) * 11; return (
            <div key={`fl${i}`} style={{ position: "absolute", left: f.fx, top: -6, transformOrigin: "bottom left", transform: `scale(${pop})`, zIndex: 3 }}>
              <div style={{ position: "absolute", left: 0, bottom: 0, width: 3, height: 46, background: "linear-gradient(180deg,#4A4640,#23211D)", borderRadius: 2 }} />
              <div style={{ position: "absolute", left: 3, top: -2, width: 30, height: 20, transformOrigin: "left center", transform: `rotate(${wave}deg)`, background: f.c, clipPath: "polygon(0 0, 100% 0, 72% 50%, 100% 100%, 0 100%)", boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }} />
            </div>); })}

          {/* pulsing red alert ring once the case is damning */}
          {lf >= fr(3.5) && <div style={{ position: "absolute", left: -12, top: -12, right: -12, bottom: -12, borderRadius: 20, border: `3px solid rgba(196,74,58,${0.35 + Math.sin(lf / 4) * 0.3})`, boxShadow: `0 0 ${16 + Math.sin(lf / 4) * 12}px rgba(196,74,58,0.5)`, zIndex: 4 }} />}

          {/* final REJECT wax seal slammed on (icon: red seal + stamped X, no words) */}
          {verdict > 0.02 && (() => { const s = 1 + (1 - verdict) * 1.6; return (
            <div style={{ position: "absolute", left: cw / 2 - 40, top: ch / 2 - 40, width: 80, height: 80, transform: `scale(${s}) rotate(-13deg)`, opacity: Math.min(1, verdict * 1.4), zIndex: 6, filter: "drop-shadow(0 4px 10px rgba(120,20,12,0.7))" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #E0563F, #9A2314 70%)", boxShadow: "inset 0 3px 8px rgba(255,255,255,0.25), inset 0 -6px 12px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "3px dashed rgba(255,220,210,0.7)" }} />
              {[45, -45].map((r) => <div key={r} style={{ position: "absolute", left: 38, top: 22, width: 5, height: 36, borderRadius: 3, background: "rgba(255,225,215,0.92)", transform: `rotate(${r}deg)` }} />)}
            </div>); })()}
        </div>

        {/* impact spark burst where the pointer strikes the card */}
        {jabTimes.map((at, i) => { const d = lf - at; if (d < 3 || d > 9) return null; const k = (d - 3) / 6; return (
          <div key={`im${i}`} style={{ position: "absolute", left: 592, top: 400, zIndex: 26, opacity: 1 - k }}>
            <div style={{ position: "absolute", left: -22 * k - 6, top: -22 * k - 6, width: 44 * k + 12, height: 44 * k + 12, borderRadius: "50%", border: `${3 * (1 - k)}px solid rgba(255,210,150,0.9)`, marginLeft: -((44 * k + 12) / 2), marginTop: -((44 * k + 12) / 2) }} />
            {[0, 60, 120, 180, 240, 300].map((a) => <div key={a} style={{ position: "absolute", left: 0, top: 0, width: 26 * (1 - k) + 6, height: 3, marginTop: -1.5, background: "linear-gradient(90deg,#FFE0A0,transparent)", transformOrigin: "left center", transform: `rotate(${a}deg)` }} />)}
          </div>); })}

        {/* ===================== THE ACCUSING POINTER (jabs at the card) ===================== */}
        <div style={{ position: "absolute", left: 316 + skX, top: 386, height: 9, width: 240 + thrust * 84, transformOrigin: "left center", transform: `rotate(${-6 + bump(nearestJab) * 3}deg)`, zIndex: 24, opacity: Math.min(1, enter) }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "linear-gradient(180deg,#4A4E58,#23262E)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 0, top: 1, width: 20, height: 7, borderRadius: 4, background: "#1A1C22" }} />
          <div style={{ position: "absolute", right: -3, top: -1.5, width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #F08070, #B8321E)", boxShadow: "0 0 8px rgba(196,74,58,0.8)" }} />
        </div>

        {/* ===================== THE SKEPTIC (RED, suited prosecutor) ===================== */}
        <div style={{ position: "absolute", left: 118 + skX, bottom: 112, width: 236, transformOrigin: "50% 100%", transform: `rotate(${skLean}deg)`, zIndex: 20, filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.5))" }}>
          <div style={{ position: "absolute", left: 118, bottom: -6, width: 200, height: 34, marginLeft: -100, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,74,58,0.35), transparent 70%)" }} />
          <SpotCone x={118} top={-40} topW={40} botW={210} h={300} color="rgba(255,120,100,0.10)" />
          <Mascot lf={lf} size={236} tint={RED} stern={0.78} glasses={1} suit={1} gaze={8} nodAmp={3 + thrust * 3} nodSpeed={9} shock={0} />
        </div>

        {/* down-arrows (verdict pressure) raining as the card caves */}
        {wilt > 0.05 && Array.from({ length: 6 }).map((_, i) => { const p = ((lf * 0.6 + seed(i) * 120) % 120) / 120; return <div key={`da${i}`} style={{ position: "absolute", left: cardX - 50 + i * 22, top: 246 + p * 96, opacity: (1 - p) * wilt * 0.8, zIndex: 15 }}><svg width={18} height={22}><path d="M9 2 L9 15 M3 10 L9 18 L15 10" fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg></div>; })}

        <Sparkles lf={lf} at={3.75} x={cardX - 30} y={430} n={16} spread={180} colors={[RED, "#E8604C", "#FFB0A0"]} dur={0.9} />
        <Sparkles lf={lf} at={4.55} x={cardX} y={420} n={22} spread={220} colors={[RED, "#E8604C", "#FFC0B0"]} dur={1.0} />

        {/* room-wide red alert glow once the case turns damning (edge-lit, never a full white-out) */}
        {alert > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 92% 88% at 54% 46%, transparent 46%, rgba(178,40,30,0.55) 100%)", opacity: alert * (0.28 + 0.22 * alertPulse), zIndex: 30, pointerEvents: "none" }} />}

        <Vignette strength={0.62} shape="66% 60% at 52% 44%" />
        <Grain op={0.05} />
      </div>

      {/* red freeze-flash on each hard jab */}
      {jabTimes.map((at, i) => { const d = lf - at; if (d < 3 || d > 8) return null; const f = (1 - (d - 3) / 5) * 0.3; return <div key={`rf${i}`} style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 90% at 55% 48%, transparent 42%, rgba(178,40,30,0.6) 100%)", opacity: f, zIndex: 46, pointerEvents: "none" }} />; })}
      {/* white slam-flash on the skeptic's entrance */}
      {lf >= enterAt && lf < enterAt + 5 && <div style={{ position: "absolute", inset: 0, background: "#FBEFE8", opacity: 0.5 * (1 - (lf - enterAt) / 5), zIndex: 50, pointerEvents: "none" }} />}
      {/* verdict red slam-flash */}
      {lf >= verdictAt && lf < verdictAt + 6 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 58% 46%, rgba(200,50,36,0.5), rgba(120,20,12,0.7))", opacity: 0.55 * (1 - (lf - verdictAt) / 6), zIndex: 48, pointerEvents: "none" }} />}
    </>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  // ===================== timeline (~109f = 3.62s) =====================
  const tubeP = over(lf, 2, 13, Easing.out(Easing.back(1.5)));   // money tube pops up fast
  const invP = over(lf, 7, 13, Easing.out(Easing.back(1.7)));    // investor pops in ~f10-20
  const invLand = lf >= 16 && lf < 28 ? Math.max(0, 1 - (lf - 16) / 12) : 0;
  const fill = over(lf, 24, 54, Easing.out(Easing.cubic));       // fills FAST -> full ~f78
  const climax = over(lf, 78, 20, Easing.out(Easing.cubic));     // tops out -> approving nod
  const heat = ramp(lf, 24, 78);                                 // coin / bubble intensity
  const cheer = climax * 0.85;                                   // arms lift as he approves
  const stern = lf < 50 ? 0.5 : Math.max(0.1, 0.5 - climax * 0.5);
  const invX = 344, tubeX = 712, tubeTop = 200, tubeH = 366, tubeW = 84, floorY = 604;
  const glow = 0.5 + Math.sin(lf / 9) * 0.5;

  // gentle camera push on the payoff beat
  const camScale = 1 + climax * 0.03;
  const camY = -climax * 6;

  // ---- palette tones ----
  const GLD = "#E7B24C", GLDL = "#FBE29A", GLDD = "#A9741A";
  const BOKEH = lerpHex(GOLD, CREAM, 0.35);

  // coin (reused visual)
  const coin = (s: number): React.CSSProperties => ({
    width: s, height: s, borderRadius: "50%",
    background: "radial-gradient(circle at 37% 31%, #FCEBA6, #E7B24C 57%, #A9741A)",
    border: "2px solid #F6DD86", boxShadow: "0 0 10px rgba(231,178,76,0.55)",
  });

  // ---- rising ticker line on the back wall ----
  const gpts = [[110, 452], [210, 424], [305, 440], [400, 388], [498, 402],
                [598, 330], [700, 346], [800, 262], [900, 240]];
  const gline = "M " + gpts.map((p) => p[0] + " " + p[1]).join(" L ");
  const garea = gline + ` L 900 470 L 110 470 Z`;
  const reveal = over(lf, 16, 70, Easing.inOut(Easing.cubic));
  const headI = Math.min(gpts.length - 1, Math.floor(reveal * (gpts.length - 1)));
  const head = gpts[headI];

  // ---- gold bokeh orbs (deep back) ----
  const bokeh = Array.from({ length: 10 }).map((_, i) => {
    const bx = 80 + seed(i * 2.3 + 1) * 860;
    const drift = ((lf * (0.18 + seed(i * 1.7) * 0.28) + seed(i * 4.1) * 620) % 620);
    const by = 520 - drift;
    const r = 16 + seed(i * 3.3 + 2) * 42;
    const op = (0.05 + seed(i * 5.5) * 0.10) * (0.6 + 0.4 * Math.sin(lf * 0.05 + i));
    return { x: bx + Math.sin(lf * 0.02 + i) * 12, y: by, r, op };
  });

  // ---- drifting gold dust motes in the beam ----
  const motes = Array.from({ length: 13 }).map((_, i) => {
    const life = 150 + seed(i) * 70; const t = (lf + seed(i * 5) * life) % life; const p = t / life;
    const x = 120 + seed(i * 3) * 780; const y = floorY - p * 580; const s = 2 + seed(i * 7) * 4;
    return { x: x + Math.sin(lf / 22 + i) * 20, y, s, op: (1 - p) * 0.34 };
  });

  // ---- ambient falling coins (in front of back wall, behind subjects) ----
  const rain = Array.from({ length: 7 }).map((_, i) => {
    const life = 120 + seed(i * 2.7) * 60; const t = (lf * 1.3 + seed(i * 6.1) * life) % life; const p = t / life;
    const x = 90 + seed(i * 3.9) * 840; const y = -40 + p * (floorY + 60);
    const s = 12 + seed(i * 1.3) * 12;
    const op = Math.min(1, p * 4) * (1 - Math.max(0, (p - 0.8) / 0.2)) * 0.5 * (0.4 + heat * 0.6);
    return { x, y, s, op, rot: lf * 6 + i * 50, sq: 0.4 + Math.abs(Math.cos(lf / 6 + i)) * 0.6 };
  });

  // ---- background audience mascots (a small money floor crowd) ----
  const crowd = [
    { x: 132, y: 512, size: 96, tint: CLAY, s: 12, gz: 2 },
    { x: 470, y: 548, size: 78, tint: GOLD, s: 18, gz: 1 },
    { x: 902, y: 520, size: 100, tint: lerpHex(GOLD, INK, 0.2), s: 15, gz: -2 },
  ];

  // ---- a gold bar (isometric) drawn in SVG ----
  const bar = (x: number, y: number, w: number, sc: number) => {
    const h = w * 0.34, d = w * 0.26;
    return (
      <g transform={`translate(${x} ${y}) scale(${sc})`}>
        <polygon points={`0,0 ${w},0 ${w - d},${-d} ${-d},${-d}`} fill={GLDL} />
        <polygon points={`0,0 0,${h} ${w},${h} ${w},0`} fill={GLD} />
        <polygon points={`${w},0 ${w},${h} ${w - d},${h - d} ${w - d},${-d}`} fill={GLDD} />
        <polygon points={`0,0 ${w},0 ${w},2 0,2`} fill={CREAM} opacity="0.35" />
      </g>
    );
  };

  // ---- a stack of coins drawn in SVG ----
  const coinStack = (x: number, baseY: number, n: number, rw: number) => (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${x} ${baseY - i * (rw * 0.42)})`}>
          <ellipse cx="0" cy="2" rx={rw} ry={rw * 0.42} fill={GLDD} />
          <ellipse cx="0" cy="0" rx={rw} ry={rw * 0.42} fill={GLD} />
          <ellipse cx="0" cy="-1" rx={rw * 0.72} ry={rw * 0.3} fill={GLDL} opacity="0.7" />
        </g>
      ))}
    </g>
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0C0810" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${camY}px) scale(${camScale})`, transformOrigin: "506px 430px" }}>

        {/* ==================== warm money-floor backdrop ==================== */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #191118 0%, #1F1620 44%, #0C0810 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 66% 56% at 33% 42%, rgba(231,178,76,0.30), transparent 66%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 44% 50% at 70% 42%, rgba(231,178,76,${0.12 + fill * 0.16}), transparent 68%)` }} />

        {/* ==================== DEEP BACK WALL: vault door + bokeh + rising ticker ==================== */}
        <svg viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <radialGradient id="s4vault" cx="46%" cy="40%" r="60%">
              <stop offset="0%" stopColor={lerpHex(GOLD, INK, 0.45)} />
              <stop offset="100%" stopColor={INK} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="s4area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.32" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </linearGradient>
            <clipPath id="s4rev">
              <rect x="0" y="0" width={reveal * 1012} height="792" />
            </clipPath>
          </defs>

          {/* giant bank-vault door disc, slowly turning */}
          <g transform="translate(548 402)" opacity="0.9">
            <circle r="300" fill="url(#s4vault)" />
            <circle r="256" fill="none" stroke={GLD} strokeWidth="3" opacity="0.14" />
            <circle r="226" fill="none" stroke={GLD} strokeWidth="1.5" strokeDasharray="4 12" opacity="0.13" />
            {/* bolt studs */}
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i / 20) * Math.PI * 2;
              return <circle key={i} cx={Math.cos(a) * 256} cy={Math.sin(a) * 256} r="5" fill={GLD} opacity="0.16" />;
            })}
            {/* rotating handle spokes */}
            <g transform={`rotate(${lf * 0.5})`} opacity="0.16" stroke={GLD} strokeWidth="9" strokeLinecap="round">
              <line x1="-92" y1="0" x2="92" y2="0" />
              <line x1="0" y1="-92" x2="0" y2="92" />
              <line x1="-65" y1="-65" x2="65" y2="65" />
              <line x1="-65" y1="65" x2="65" y2="-65" />
            </g>
            <circle r="30" fill="none" stroke={GLD} strokeWidth="7" opacity="0.18" />
            <circle r="10" fill={GLD} opacity="0.18" />
          </g>

          {/* soft gold bokeh orbs */}
          {bokeh.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={BOKEH} opacity={b.op} />
          ))}

          {/* rising ticker / graph on back wall (revealed left->right) */}
          <g clipPath="url(#s4rev)" opacity="0.85">
            <path d={garea} fill="url(#s4area)" />
            <path d={gline} fill="none" stroke={lerpHex(GREEN, GOLD, 0.35)} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
            <path d={gline} fill="none" stroke={GLDL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </g>
          {/* travelling glow head on the line */}
          {reveal > 0.02 && reveal < 0.99 && (
            <circle cx={head[0]} cy={head[1]} r={5 + 2 * glow} fill={CREAM} opacity="0.9" />
          )}
          {/* baseline grid rules for the trading wall */}
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={i} x1="80" y1={280 + i * 62} x2="940" y2={280 + i * 62} stroke={GLD} strokeWidth="1" opacity="0.05" />
          ))}
        </svg>

        {/* ==================== god-ray key light + soft tube light ==================== */}
        <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen", opacity: 0.75, zIndex: 2 }}>
          <SpotCone x={invX} top={-30} topW={56} botW={360} h={660} color="rgba(255,232,180,0.20)" sway={1.4} lf={lf} pool={0} />
        </div>
        <div style={{ position: "absolute", inset: 0, mixBlendMode: "screen", opacity: 0.6, zIndex: 2 }}>
          <SpotCone x={tubeX} top={-20} topW={40} botW={210} h={600} color="rgba(231,178,76,0.15)" sway={1.0} lf={lf + 18} pool={0} />
        </div>

        {/* dust motes drifting up in the light */}
        {motes.map((m, i) => (
          <div key={`d${i}`} style={{ position: "absolute", left: m.x, top: m.y, width: m.s, height: m.s, borderRadius: "50%", background: "#F1D48A", opacity: m.op, boxShadow: "0 0 7px rgba(231,178,76,0.6)", zIndex: 3 }} />
        ))}

        {/* ambient falling gold coins (mid depth) */}
        {rain.map((r, i) => (
          <div key={`r${i}`} style={{ position: "absolute", left: r.x, top: r.y, width: r.s, height: r.s, opacity: r.op, transform: `rotate(${r.rot}deg) scaleX(${r.sq})`, zIndex: 4 }}>
            <div style={coin(r.s)} />
          </div>
        ))}

        {/* ==================== background audience mascots (money floor crowd) ==================== */}
        {crowd.map((m, i) => {
          const ent = over(lf, m.s, 12, Easing.out(Easing.back(1.5)));
          if (ent <= 0) return null;
          const sc = Math.min(1.05, ent);
          const breath = bob(lf, 3, 84, m.x);
          const lift = climax * (0.35 + (i % 2) * 0.15);
          return (
            <div key={`m${i}`} style={{ position: "absolute", left: m.x, top: m.y + breath, transform: `translate(-50%,-50%) scale(${sc})`, transformOrigin: "50% 82%", opacity: 0.5 * ent, filter: "brightness(0.72) saturate(0.85)", zIndex: 4 }}>
              <Mascot lf={lf} size={m.size} tint={m.tint} stern={0.35} cheer={lift} shock={0} gaze={m.gz} nodAmp={1.6} nodSpeed={5} glasses={0} suit={i === 1 ? 1 : 0} />
            </div>
          );
        })}

        {/* ==================== base props: gold bars + coin stacks around the two subjects ==================== */}
        <svg viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5 }}>
          {/* investor-side hoard */}
          <g opacity={over(lf, 14, 14)}>
            {bar(196, 588, 92, 1)}
            {bar(214, 566, 92, 0.9)}
            {bar(236, 546, 92, 0.78)}
            {coinStack(180, 600, 5, 22)}
            {coinStack(300, 596, 3, 18)}
          </g>
          {/* tube-side hoard (grows as it fills) */}
          <g opacity={over(lf, 20, 14)}>
            {bar(604, 592, 86, 1)}
            {bar(624, 570, 86, 0.86)}
            {coinStack(786, 598, Math.round(2 + fill * 4), 22)}
            {coinStack(846, 600, Math.round(1 + fill * 3), 18)}
            {coinStack(590, 604, 3, 18)}
          </g>
          {/* center foreground pile */}
          <g opacity="0.9">
            {coinStack(468, 616, 4, 20)}
            {coinStack(516, 620, 2, 16)}
          </g>
        </svg>

        {/* ==================== reflective floor + mirrored glows ==================== */}
        <div style={{ position: "absolute", left: 0, right: 0, top: floorY, bottom: 0, background: "linear-gradient(180deg, rgba(231,178,76,0.10), rgba(6,4,8,0.0) 62%)", zIndex: 5 }} />
        <div style={{ position: "absolute", left: 506, top: floorY - 6, width: 900, height: 3, transform: "translateX(-50%)", background: "linear-gradient(90deg, transparent, rgba(231,178,76,0.45), transparent)", zIndex: 5 }} />
        {/* mirrored glow of the two subjects on the shiny floor */}
        <div style={{ position: "absolute", left: invX, top: floorY, width: 220, height: 150, transform: "translateX(-50%)", background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(231,178,76,0.24), transparent 68%)", filter: "blur(7px)", zIndex: 5 }} />
        <div style={{ position: "absolute", left: tubeX, top: floorY, width: 150, height: 150, transform: "translateX(-50%)", background: `radial-gradient(ellipse 55% 100% at 50% 0%, rgba(231,178,76,${0.18 + fill * 0.16}), transparent 66%)`, filter: "blur(7px)", zIndex: 5 }} />

        {/* ==================== coins arc from the investor INTO the tube ==================== */}
        {Array.from({ length: 5 }).map((_, i) => {
          if (fill < 0.03 || fill > 0.98) return null;
          const life = 32; const t = (lf * 1.5 + seed(i * 4) * life) % life; const p = t / life;
          const sx = invX + 96 + seed(i) * 60, sy = 372 - seed(i * 2) * 30;
          const ex = tubeX, ey = tubeTop + 10;
          const x = sx + (ex - sx) * p;
          const y = sy + (ey - sy) * p - Math.sin(p * Math.PI) * 160;
          const s = 20 + seed(i * 3) * 8;
          const op = Math.min(1, p * 5) * Math.max(0, 1 - (p - 0.84) / 0.16) * (0.4 + heat * 0.6);
          return (
            <div key={`c${i}`} style={{ position: "absolute", left: x, top: y, width: s, height: s, opacity: op, transform: `rotate(${lf * 5 + i * 40}deg) scaleX(${0.5 + Math.abs(Math.cos(lf / 5 + i)) * 0.5})`, zIndex: 7 }}>
              <div style={coin(s)}><div style={{ position: "absolute", inset: "24%", borderRadius: "50%", border: "1.5px solid rgba(150,100,25,0.55)" }} /></div>
            </div>
          );
        })}

        {/* ==================== MONEY TUBE / thermometer (fills fast) ==================== */}
        <div style={{ position: "absolute", left: tubeX, top: tubeTop, transform: `translateX(-50%) scale(${Math.min(1.08, tubeP)})`, transformOrigin: "50% 100%", zIndex: 8 }}>
          {/* outer glow */}
          <div style={{ position: "absolute", left: "50%", top: "46%", width: 200, height: 460, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `radial-gradient(ellipse, rgba(231,178,76,${0.14 + fill * 0.24}), transparent 68%)`, filter: "blur(6px)" }} />
          {/* thermometer bulb reservoir (always gold) */}
          <div style={{ position: "absolute", left: "50%", top: tubeH - 30, width: 104, height: 104, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #FBE29A, #E7B24C 52%, #A9741A)", border: "3px solid rgba(231,178,76,0.6)", boxShadow: `0 0 ${18 + fill * 24}px rgba(231,178,76,0.6)` }}>
            <div style={{ position: "absolute", inset: "30%", borderRadius: "50%", border: "2px solid rgba(150,100,25,0.4)" }} />
          </div>
          {/* glass column */}
          <div style={{ position: "relative", width: tubeW, height: tubeH, borderRadius: `${tubeW / 2}px ${tubeW / 2}px 14px 14px`, background: "linear-gradient(180deg,#1C161C,#0C080C)", border: "3px solid rgba(231,178,76,0.55)", overflow: "hidden", boxShadow: "0 18px 40px -14px rgba(0,0,0,0.7)" }}>
            {/* rising gold fill */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`, background: "linear-gradient(180deg, #FBE29A, #E7B24C 46%, #C68A1E)", boxShadow: "0 0 26px rgba(231,178,76,0.7)" }}>
              {/* bright meniscus */}
              <div style={{ position: "absolute", top: -5, left: 0, right: 0, height: 10, background: fill > 0.94 ? "#FFF6DC" : "rgba(255,255,255,0.6)", borderRadius: "50%", transform: `translateY(${Math.sin(lf / 6) * 2}px)`, boxShadow: fill > 0.94 ? "0 0 12px #FBE7A0" : "none" }} />
              {/* rising bubbles + fast-fill speed streaks */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`b${i}`} style={{ position: "absolute", left: 10 + (i * 13) % 56, bottom: ((lf * (3 + i) * (0.6 + heat)) % 240), width: 5, height: 5 + (i % 2) * 8, borderRadius: 4, background: "rgba(255,248,220,0.85)", opacity: 0.55 * glow }} />
              ))}
            </div>
            {/* gauge ticks */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={`tk${i}`} style={{ position: "absolute", right: 5, top: `${9 + i * 13}%`, width: i % 2 ? 8 : 15, height: 2, background: "rgba(231,178,76,0.5)" }} />
            ))}
            {/* glass highlight */}
            <div style={{ position: "absolute", left: 12, top: 14, bottom: 40, width: 10, borderRadius: 6, background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)" }} />
          </div>
          {/* splash flicker at the mouth as coins drop in */}
          {fill > 0.04 && fill < 0.99 && (
            <div style={{ position: "absolute", left: "50%", top: 4, width: 60, height: 24, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,246,220,0.75), transparent 68%)", opacity: (0.3 + Math.abs(Math.sin(lf / 4)) * 0.5) * heat }} />
          )}
        </div>

        {/* ==================== GOLD INVESTOR (focal) ==================== */}
        <div style={{ position: "absolute", left: invX, top: 356, transform: `translate(-50%,0) scale(${Math.min(1.08, invP)}) rotate(${Math.sin(lf / 26) * 1.2 - climax * 1.6}deg)`, transformOrigin: "50% 100%", zIndex: 10 }}>
          <div style={{ position: "absolute", left: "50%", top: "46%", width: 260, height: 260, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.34), transparent 66%)", filter: "blur(6px)" }} />
          <Mascot lf={lf} size={250} tint={GOLD} suit={1} glasses={1} gaze={Math.round(4 - climax * 4)} nodAmp={2.2 + climax * 1.8} nodSpeed={9} cheer={cheer} stern={stern} shock={0} />
        </div>

        {/* ==================== payoff: tube tops out -> gold approval burst ==================== */}
        {climax > 0.02 && (<>
          <div style={{ position: "absolute", left: tubeX, top: tubeTop + 6, width: 70, height: 70, transform: `translate(-50%,-50%) scale(${climax * 10})`, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,220,0.8), transparent 62%)", opacity: (1 - climax) * 0.85, zIndex: 20 }} />
          {/* expanding gold shockwave ring */}
          <div style={{ position: "absolute", left: tubeX, top: tubeTop + 8, width: 40, height: 40, transform: `translate(-50%,-50%) scale(${1 + climax * 7})`, borderRadius: "50%", border: `${Math.max(1, 6 * (1 - climax))}px solid rgba(255,240,190,0.7)`, opacity: (1 - climax) * 0.8, zIndex: 20 }} />
          <Sparkles lf={lf} at={2.6} x={tubeX} y={tubeTop + 8} n={16} spread={180} colors={[GOLD, "#FFFFFF", "#F3D98A"]} dur={1.0} />
          <Sparkles lf={lf} at={2.73} x={invX} y={380} n={10} spread={150} colors={[GOLD, "#FBE7A0", CLAY]} dur={1.0} />
        </>)}

        {/* warm embers rising over the whole floor */}
        <Embers lf={lf} n={10} base={AMBER} />

        {/* subtle investor-landing flash (localized) */}
        {invLand > 0.02 && (
          <div style={{ position: "absolute", left: invX, top: 400, width: 260, height: 260, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,248,228,0.85), transparent 62%)", opacity: invLand * 0.4, zIndex: 30, pointerEvents: "none" }} />
        )}
      </div>

      <Vignette strength={0.58} shape="66% 60% at 44% 44%" />
      <Grain op={0.05} />
    </div>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const CX = 506;
  const mx = (a: number, b: number, t: number) => a + (b - a) * t;

  // warm courtroom tones (tie to the S0 hook world)
  const WOOD = lerpHex(AMBER, INK, 0.62);
  const WOOD2 = lerpHex(AMBER, INK, 0.44);
  const WOODLIT = lerpHex(AMBER, CREAM, 0.4);

  // ===================== TIMELINE =====================
  // BEAT 1 (verdict): beams converge -> gavel raises -> CHOP + wax seal @ ~2.4s
  // BEAT 2 (memory):  advocates clear -> vault rises -> card zips in -> lock -> calendar flips
  const slam = fr(2.4);
  const sAge = lf - slam;

  // slam impact envelopes
  const shakeE = sAge >= 0 && sAge < 15 ? Math.pow(1 - sAge / 15, 2) : 0;
  const shakeX = Math.sin(sAge * 1.6) * shakeE * 12;
  const shakeY = Math.cos(sAge * 2.0) * shakeE * 8;
  const flash = sAge >= 0 && sAge < 9 ? Math.pow(1 - sAge / 9, 2) : 0;
  const pushSc = 1 + shakeE * 0.024; // tiny camera punch on the crash

  // gavel: anticipation quiver -> big raise -> violent chop -> settle bounce
  const quiver = lf < fr(1.05) ? Math.sin(lf / 2.4) * 3 * (1 - over(lf, 0, fr(1.05))) : 0;
  const raiseP = over(lf, fr(1.05), fr(0.95), Easing.out(Easing.cubic));
  const dropP = over(lf, fr(2.2), fr(0.2), Easing.in(Easing.cubic));
  const gBounce = sAge >= 0 ? Math.sin(sAge * 0.72) * Math.max(0, 1 - sAge / 18) * 9 : 0;
  const gavelAngle = -5 + quiver - raiseP * 56 + dropP * 80 + gBounce;

  // wax seal on the idea card
  const stampIn = over(lf, slam, fr(0.15), Easing.in(Easing.cubic));
  const sealSc = sAge < 0 ? 0 : 1.9 - stampIn * 0.9;
  const sealWob = sAge >= 0 ? Math.sin(sAge * 0.85) * Math.max(0, 1 - sAge / 16) * 0.08 : 0;
  const sealOp = over(lf, slam, fr(0.05));

  // argument beams (converge, snuffed at the slam)
  const beamsOn = over(lf, fr(0.35), fr(0.55)) * (1 - over(lf, slam - 3, fr(0.3)));

  // BEAT 2
  const advOut = 1 - over(lf, fr(2.9), fr(0.48));
  const vaultP = over(lf, fr(3.02), fr(0.7), Easing.out(Easing.cubic));
  const cardZip = over(lf, fr(3.4), fr(0.72), Easing.inOut(Easing.cubic));
  const slotGlow = Math.max(0, (cardZip - 0.55) / 0.45);
  const lockAge = lf - fr(4.05);
  const lockP = over(lf, fr(4.05), fr(0.22), Easing.in(Easing.cubic));
  const lockFlash = lockAge >= 0 && lockAge < 11 ? Math.pow(1 - lockAge / 11, 2) : 0;
  const flipP = over(lf, fr(4.24), fr(0.6), Easing.inOut(Easing.cubic));
  const savedIn = over(lf, fr(4.76), fr(0.24), Easing.out(Easing.cubic));

  // warm judgment glow (flares at slam, then sustains into the save)
  const judgGlow = Math.max(sAge >= 0 && sAge < 14 ? Math.pow(1 - sAge / 14, 2) : 0, vaultP * 0.55, lockFlash);

  // idea card path (float in front of bench -> zip down into vault slot)
  const floatY = 250 + bob(lf, 7, 62) * (1 - cardZip);
  const cardCY = mx(floatY, 446, cardZip);
  const cardPop = sAge >= 0 && sAge < 11 ? Math.pow(1 - sAge / 11, 2) : 0;
  const cardSc = (1 - cardZip * 0.6) * (1 + cardPop * 0.17);
  const cardOp = 1 - Math.max(0, (cardZip - 0.72) / 0.28);
  const cardGlow = sAge >= 0 && sAge < 13 ? Math.pow(1 - sAge / 13, 2) : 0;

  // set entrance pops
  const setIn = Math.min(1, spr(lf, 0, 15, 210));
  const judgeInSc = Math.min(1.04, spr(lf, 2, 14, 200));

  // stained-glass window shimmer sweep + warm glass pulse
  const winShim = -140 + ((lf * 3.4) % 900);
  const glassPulse = 0.5 + 0.5 * Math.sin(lf / 30);

  // gavel-impact wood splinters flying off the sound block
  const splinters = sAge >= 0 && sAge < 20 ? Array.from({ length: 10 }).map((_, i) => {
    const r = seed(i * 2.3 + 4); const r2 = seed(i * 1.7 + 9);
    const ang = -Math.PI / 2 + (r - 0.5) * 2.6;
    const sp = 3.4 + r2 * 5.2; const a = sAge / 20;
    const dx = Math.cos(ang) * sAge * sp * 0.5;
    const dy = Math.sin(ang) * sAge * sp * 0.5 + 0.15 * sAge * sAge;
    return { dx, dy, op: (1 - a) * 0.95, rot: r * 360 + sAge * (14 + r2 * 10), w: 5 + r * 12, h: 2.5 + r2 * 3 };
  }) : [];

  // watching gallery (spectators in the stands, each idle)
  const gallery = [
    { x: 98, y: 356, tint: GREEN, s: 60, ph: 0.2 },
    { x: 174, y: 340, tint: GOLD, s: 56, ph: 1.1 },
    { x: 244, y: 358, tint: RED, s: 58, ph: 2.3 },
    { x: 770, y: 358, tint: SKY, s: 58, ph: 0.7 },
    { x: 838, y: 340, tint: CLAY, s: 56, ph: 1.9 },
    { x: 914, y: 356, tint: SLATE, s: 60, ph: 3.0 },
  ];

  // ===== one argument beam (moving light packet + core) =====
  const Beam = (x1: number, y1: number, x2: number, y2: number, col: string, phase: number) => {
    const dx = x2 - x1, dy = y2 - y1; const len = Math.hypot(dx, dy); const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const puls = 0.5 + Math.sin(lf / 4 + phase) * 0.28;
    const dp = ((lf / 7 + phase) % 1);
    return (
      <div style={{ position: "absolute", left: x1, top: y1, width: len, height: 8, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, opacity: beamsOn * puls, zIndex: 18 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: `linear-gradient(90deg, ${col}00, ${col}cc 55%, ${col}00)`, filter: "blur(1px)", boxShadow: `0 0 13px ${col}` }} />
        <div style={{ position: "absolute", left: `${dp * 100}%`, top: -3.5, width: 14, height: 14, marginLeft: -7, borderRadius: "50%", background: "#fff", boxShadow: `0 0 13px ${col}`, opacity: 0.94 }} />
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${shakeX}px, ${shakeY}px) scale(${pushSc})`, transformOrigin: "50% 46%" }}>
      {/* ================= BACK WALL + KEY LIGHT ================= */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 84% at 50% 4%, #2b3856 0%, #16213a 46%, #090e1a 100%)", zIndex: 1 }} />

      {/* ================= GRAND ARCHED STAINED-GLASS WINDOW (warm back light) ================= */}
      <svg viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }}>
        <defs>
          <radialGradient id="s5halo" cx="50%" cy="30%" r="62%">
            <stop offset="0%" stopColor={lerpHex(AMBER, CREAM, 0.6)} stopOpacity={0.42 + judgGlow * 0.24} />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s5glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lerpHex(AMBER, CREAM, 0.5)} />
            <stop offset="55%" stopColor={AMBER} />
            <stop offset="100%" stopColor={lerpHex(RED, INK, 0.35)} />
          </linearGradient>
          <clipPath id="s5wincl">
            <path d="M 394 380 L 394 250 A 112 112 0 0 1 618 250 L 618 380 Z" />
          </clipPath>
        </defs>

        {/* warm halo bloom behind the whole upper wall */}
        <ellipse cx="506" cy="232" rx="392" ry="248" fill="url(#s5halo)" />

        {/* window body + stained-glass panes */}
        <g opacity={0.6 + glassPulse * 0.14 + judgGlow * 0.16}>
          <path d="M 394 380 L 394 250 A 112 112 0 0 1 618 250 L 618 380 Z" fill="url(#s5glass)" />
          <g clipPath="url(#s5wincl)">
            {/* jewel panes */}
            <rect x="394" y="138" width="74" height="252" fill={lerpHex(GREEN, AMBER, 0.5)} opacity="0.34" />
            <rect x="544" y="138" width="74" height="252" fill={lerpHex(RED, AMBER, 0.45)} opacity="0.34" />
            <circle cx="506" cy="196" r="30" fill={lerpHex(GOLD, CREAM, 0.4)} opacity="0.5" />
            <circle cx="452" cy="300" r="22" fill={lerpHex(RED, CREAM, 0.35)} opacity="0.4" />
            <circle cx="560" cy="300" r="22" fill={lerpHex(GREEN, CREAM, 0.3)} opacity="0.4" />
            {/* moving specular shimmer */}
            <rect x={winShim} y="120" width="52" height="300" fill={CREAM} opacity="0.18" transform="skewX(-20)" />
          </g>
          {/* stone mullions / tracery */}
          <g stroke={lerpHex(WOOD, AMBER, 0.35)} strokeWidth="7" fill="none" opacity="0.85">
            <path d="M 394 380 L 394 250 A 112 112 0 0 1 618 250 L 618 380" />
            <line x1="506" y1="140" x2="506" y2="380" />
            <line x1="450" y1="200" x2="450" y2="380" />
            <line x1="562" y1="200" x2="562" y2="380" />
            <line x1="394" y1="250" x2="618" y2="250" />
            <line x1="410" y1="312" x2="602" y2="312" />
            <path d="M 394 250 A 112 112 0 0 1 618 250" />
          </g>
        </g>
      </svg>

      <SpotCone x={CX} top={-16} topW={78} botW={404} h={560} color="rgba(212,226,255,0.18)" sway={2} lf={lf} />
      <div style={{ position: "absolute", left: CX - 280, top: 24, width: 560, height: 340, background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(126,156,236,0.24), transparent 70%)", zIndex: 2 }} />
      {/* warm underglow that flares on the verdict */}
      <div style={{ position: "absolute", left: CX - 330, top: 296, width: 660, height: 380, background: `radial-gradient(ellipse 50% 60% at 50% 60%, rgba(207,149,68,${0.09 + judgGlow * 0.3}), transparent 70%)`, zIndex: 2 }} />

      {/* ================= SCALES-OF-JUSTICE SEAL MEDALLION (over the window) ================= */}
      <div style={{ position: "absolute", left: CX - 130, top: 112, width: 260, height: 252, opacity: 0.17 + judgGlow * 0.12, zIndex: 3, transform: `scale(${0.9 + setIn * 0.1})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `6px solid ${lerpHex(GOLD, CREAM, 0.3)}` }} />
        <div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: `2px dashed ${lerpHex(GOLD, CREAM, 0.2)}` }} />
        <div style={{ position: "absolute", left: 128, top: 58, width: 4, height: 152, background: lerpHex(GOLD, CREAM, 0.3) }} />
        <div style={{ position: "absolute", left: 58, top: 88, width: 144, height: 4, background: lerpHex(GOLD, CREAM, 0.3), transform: `rotate(${Math.sin(lf / 26) * 2}deg)`, transformOrigin: "50% 50%" }} />
        <div style={{ position: "absolute", left: 62, top: 90, width: 4, height: 34, background: lerpHex(GOLD, CREAM, 0.2) }} />
        <div style={{ position: "absolute", left: 190, top: 90, width: 4, height: 34, background: lerpHex(GOLD, CREAM, 0.2) }} />
        <div style={{ position: "absolute", left: 40, top: 122, width: 52, height: 22, borderRadius: "0 0 26px 26px", border: `4px solid ${lerpHex(GOLD, CREAM, 0.3)}`, borderTop: "none" }} />
        <div style={{ position: "absolute", left: 168, top: 122, width: 52, height: 22, borderRadius: "0 0 26px 26px", border: `4px solid ${lerpHex(GOLD, CREAM, 0.3)}`, borderTop: "none" }} />
      </div>

      {/* ================= COLONNADE (parallax depth) ================= */}
      <div style={{ position: "absolute", left: 10, right: 10, top: 58, height: 26, background: "linear-gradient(180deg,#31406a,#1b2444)", borderRadius: 6, opacity: 0.62, zIndex: 2 }} />
      {Array.from({ length: 6 }).map((_, i) => { const x = 18 + i * 172; return (
        <div key={`col${i}`} style={{ position: "absolute", left: x, top: 80, width: 62, height: 470, background: "linear-gradient(90deg,#172238 4%,#2e3c60 48%,#121b2e 96%)", borderRadius: "8px 8px 0 0", boxShadow: "inset 0 0 22px rgba(0,0,0,0.45)", opacity: 0.5, zIndex: 2 }}>
          <div style={{ position: "absolute", left: -9, top: -14, right: -9, height: 20, background: "#2e3c5c", borderRadius: 5 }} />
          {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 16 + k * 16, top: 10, bottom: 0, width: 3, background: "rgba(0,0,0,0.28)" }} />)}
        </div>); })}
      {/* god-rays raking between columns (always drifting) */}
      {[0, 1, 2, 3].map((i) => <div key={`ray${i}`} style={{ position: "absolute", left: 110 + i * 214, top: -44, width: 128, height: 640, background: "linear-gradient(180deg, rgba(206,222,255,0.13), transparent 78%)", transform: "skewX(-9deg)", opacity: 0.42 + Math.sin(lf / 20 + i) * 0.18, zIndex: 4, filter: "blur(2px)" }} />)}

      {/* ================= WATCHING GALLERY (population in the stands) ================= */}
      {gallery.map((g, i) => {
        const breath = bob(lf, 2.4, 84, g.ph * 40);
        const gz = Math.max(-2, Math.min(2, (CX - g.x) / 260));
        const react = sAge >= 0 && sAge < 12 ? 0.42 * (1 - sAge / 12) : 0;
        const cheer2 = lf > fr(4.3) ? 0.3 + Math.max(0, Math.sin(lf / 6 + g.ph)) * 0.2 : 0;
        return (
          <div key={`gal${i}`} style={{ position: "absolute", left: g.x, top: g.y + breath, width: g.s, marginLeft: -g.s / 2, opacity: (0.52 + setIn * 0.06) * Math.max(0.35, 1 - react * 0.2), filter: "brightness(0.66) saturate(0.85) drop-shadow(0 6px 12px rgba(0,0,0,0.4))", zIndex: 8, transform: `scale(${0.85 + setIn * 0.15})` }}>
            <Mascot lf={lf + i * 9} size={g.s} tint={g.tint} stern={lf < slam ? 0.5 : 0.15} shock={react} cheer={cheer2} gaze={gz} nodAmp={2.6} nodSpeed={4.2} />
          </div>
        );
      })}
      {/* gallery rail in front of the stands */}
      {[[64, 288], [732, 972]].map(([x0, x1], i) => (
        <div key={`rail${i}`} style={{ position: "absolute", left: x0, top: 392, width: x1 - x0, height: 13, borderRadius: 7, background: "linear-gradient(180deg,#4a3018,#22140a)", boxShadow: "0 4px 10px rgba(0,0,0,0.5), inset 0 2px 0 rgba(210,150,90,0.25)", opacity: 0.7, zIndex: 9 }} />
      ))}

      {/* ================= DRIFTING DUST MOTES ================= */}
      {Array.from({ length: 26 }).map((_, i) => { const r = seed(i * 1.7 + 3); const r2 = seed(i * 2.3 + 9); const life = 96 + r * 74; const p = ((lf + r2 * life) % life) / life; const x = r * 1012 + Math.sin(lf / 24 + i) * 14; const y = 730 - p * 700; const s = 2 + r2 * 4; return <div key={`ms${i}`} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: "rgba(212,226,255,0.8)", opacity: (1 - p) * 0.5, filter: "blur(0.6px)", zIndex: 5 }} />; })}

      {/* ================= MARBLE FLOOR + PERSPECTIVE ================= */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 178, background: "linear-gradient(180deg,#0e1526,#05080f)", zIndex: 6 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: "rgba(150,180,235,0.36)", boxShadow: "0 0 15px rgba(120,160,230,0.42)" }} />
        {Array.from({ length: 9 }).map((_, i) => { const fx = (i - 4) / 4; return <div key={`fl${i}`} style={{ position: "absolute", left: CX, bottom: 0, width: 2, height: 178, background: "rgba(120,150,210,0.12)", transformOrigin: "50% 100%", transform: `translateX(-50%) rotate(${fx * 33}deg)` }} />; })}
        <div style={{ position: "absolute", left: CX - 260, top: 4, width: 520, height: 64, background: `radial-gradient(ellipse 50% 70% at 50% 0%, rgba(210,120,80,${0.12 + judgGlow * 0.32}), transparent 72%)` }} />
      </div>

      {/* ================= THE JUDGE (SLATE, behind bench) ================= */}
      <div style={{ position: "absolute", left: CX - 105, top: 284, width: 210, zIndex: 20, transform: `scale(${judgeInSc})`, transformOrigin: "50% 100%", filter: `drop-shadow(0 10px 26px rgba(60,92,132,0.55)) drop-shadow(0 0 ${8 + judgGlow * 18}px rgba(150,180,235,${0.3 + judgGlow * 0.4}))` }}>
        <Mascot lf={lf} size={210} tint={SLATE} suit={1} stern={lf < slam ? 0.85 : 0.2} shock={sAge >= 0 && sAge < 11 ? 0.36 * (1 - sAge / 11) : 0} cheer={lf > fr(4.2) ? 0.34 : 0} gaze={lf > fr(3.2) ? -2 : 0} nodAmp={lf < slam ? 2.2 : 3.6} nodSpeed={9} />
      </div>
      {/* rim light on the judge */}
      <div style={{ position: "absolute", left: CX - 118, top: 296, width: 236, height: 210, borderRadius: "50%", background: "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(200,220,255,0.14), transparent 66%)", zIndex: 19, pointerEvents: "none" }} />

      {/* ================= ARGUMENT BEAMS CONVERGING ON THE JUDGE ================= */}
      {beamsOn > 0.02 && (<>
        {Beam(210, 558, CX - 6, 300, GREEN, 0.0)}
        {Beam(800, 558, CX + 6, 300, GOLD, 1.7)}
        {Beam(404, 668, CX, 306, RED, 3.1)}
      </>)}

      {/* ================= THE BENCH ================= */}
      <div style={{ position: "absolute", left: 148, top: 470, width: 716, height: 212, borderRadius: "16px 16px 0 0", background: "linear-gradient(180deg,#3c2917,#1f1307)", boxShadow: "0 -6px 26px rgba(0,0,0,0.5), inset 0 3px 0 rgba(210,150,90,0.25)", zIndex: 24, overflow: "hidden", transform: `translateY(${(1 - setIn) * 40}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 16, background: "linear-gradient(180deg,#6d4728,#40260f)" }} />
        {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 42 + k * 176, top: 34, width: 130, height: 152, borderRadius: 8, border: "3px solid rgba(0,0,0,0.32)", background: "linear-gradient(180deg,rgba(90,58,30,0.35),rgba(30,18,8,0.35))" }} />)}
        {/* carved gold panel emblems */}
        {[0, 1, 2, 3].map((k) => <div key={`em${k}`} style={{ position: "absolute", left: 42 + k * 176 + 47, top: 34 + 52, width: 36, height: 36, borderRadius: "50%", border: `2px solid rgba(214,168,96,${0.3 + judgGlow * 0.2})`, boxShadow: `inset 0 0 10px rgba(214,168,96,0.2)` }} />)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 16, height: 42, background: `linear-gradient(180deg,rgba(255,220,170,${0.1 + judgGlow * 0.14}),transparent)` }} />
        {/* wood grain streaks */}
        {[0, 1, 2, 3, 4, 5].map((k) => <div key={`gr${k}`} style={{ position: "absolute", left: 0, right: 0, top: 60 + k * 26, height: 2, background: "rgba(0,0,0,0.16)" }} />)}
      </div>

      {/* sound block (kisses the gavel) */}
      <div style={{ position: "absolute", left: 585 - 36, top: 462, width: 72, height: 18, borderRadius: 7, background: `linear-gradient(180deg,#8c5c2e,#4a2c12)`, boxShadow: `0 5px 10px rgba(0,0,0,0.55), 0 0 ${judgGlow * 24}px rgba(255,200,120,${judgGlow * 0.75})`, zIndex: 26 }} />

      {/* ================= VERDICT LIGHT PILLAR (descends onto the card at slam) ================= */}
      {sAge >= 0 && sAge < 26 && (() => { const a = sAge / 26; return (
        <div style={{ position: "absolute", left: CX - 70, top: 40, width: 140, height: 240, background: "linear-gradient(180deg, rgba(255,232,190,0.55), rgba(255,210,150,0.12) 70%, transparent)", clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)", opacity: (1 - a) * 0.85, zIndex: 22, filter: "blur(2px)", mixBlendMode: "screen" }} />); })()}

      {/* ================= MEMORY MOTES streaming toward the vault (part 2 motion) ================= */}
      {vaultP > 0.1 && Array.from({ length: 14 }).map((_, i) => { const r = seed(i * 3.1 + 5); const r2 = seed(i * 1.9 + 2); const life = 40 + r * 34; const t = ((lf - fr(3.0) + r2 * life) % life) / life; const startX = CX + (r - 0.5) * 620; const startY = 200 + r2 * 320; const x = mx(startX, CX, Math.pow(t, 0.8)); const y = mx(startY, 470, Math.pow(t, 0.8)); const s = 4 + r * 4; return <div key={`mm${i}`} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: i % 2 ? GREEN : GOLD, opacity: (1 - t) * 0.7 * vaultP, boxShadow: `0 0 8px ${i % 2 ? GREEN : GOLD}`, zIndex: 29 }} />; })}

      {/* data stream ribbons pouring into the slot on the save */}
      {slotGlow > 0.05 && [0, 1, 2].map((k) => { const seg = ((lf * 4 + k * 30) % 60) / 60; return (
        <div key={`ds${k}`} style={{ position: "absolute", left: CX - 24 + k * 24, top: 300 + seg * 120, width: 4, height: 30, borderRadius: 3, background: `linear-gradient(180deg, transparent, ${k % 2 ? GREEN : GOLD})`, opacity: slotGlow * (1 - seg) * 0.8, boxShadow: `0 0 8px ${k % 2 ? GREEN : GOLD}`, zIndex: 31 }} />); })}

      {/* ================= CALENDAR WALL (memory backdrop, part 2) ================= */}
      {vaultP > 0.2 && (
        <div style={{ position: "absolute", left: 686, top: 268, width: 176, height: 176, opacity: Math.min(1, vaultP * 1.3) * 0.4, zIndex: 48, transform: `translateY(${(1 - Math.min(1, vaultP * 1.3)) * -18}px)` }}>
          {Array.from({ length: 12 }).map((_, i) => { const cx2 = i % 4, cy2 = Math.floor(i / 4); const on = i === 5; const pop = over(lf, fr(3.1) + i * 1.4, fr(0.2), Easing.out(Easing.back(1.4))); return (
            <div key={`cw${i}`} style={{ position: "absolute", left: cx2 * 44 + 4, top: cy2 * 56 + 4, width: 36, height: 44, borderRadius: 5, background: on ? `rgba(63,158,116,${0.5 + flipP * 0.3})` : "rgba(120,140,180,0.16)", border: `1px solid rgba(150,180,235,${on ? 0.6 : 0.2})`, transform: `scale(${Math.min(1, pop)})`, boxShadow: on ? `0 0 12px rgba(63,158,116,${0.4 + lockFlash * 0.5})` : "none" }} />); })}
        </div>
      )}

      {/* ================= VAULT / SAVE-SLOT (part 2) ================= */}
      {vaultP > 0.01 && (
        <div style={{ position: "absolute", left: CX - 108, top: 392, width: 216, height: 194, transform: `translateY(${(1 - vaultP) * 96}px)`, opacity: Math.min(1, vaultP * 1.4), zIndex: 30 }}>
          <div style={{ position: "absolute", inset: -28, borderRadius: 32, background: `radial-gradient(circle, rgba(63,158,116,${0.2 + lockFlash * 0.45}), transparent 68%)`, filter: "blur(6px)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: "linear-gradient(160deg,#2d3652,#151c2f)", border: "3px solid rgba(150,180,235,0.44)", boxShadow: "inset 0 4px 0 rgba(210,225,255,0.14), inset 0 -20px 40px rgba(0,0,0,0.5)" }} />
          {/* moving specular shine across the metal */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, left: `${-40 + ((lf * 2.6) % 300)}px`, width: 46, height: 240, background: "linear-gradient(90deg,transparent,rgba(220,235,255,0.16),transparent)", transform: "skewX(-22deg)" }} />
          </div>
          <div style={{ position: "absolute", inset: 12, borderRadius: 15, border: "2px solid rgba(120,150,210,0.28)" }} />
          {/* corner rivets */}
          {[[20, 20], [188, 20], [20, 168], [188, 168]].map(([rx, ry], k) => <div key={`rv${k}`} style={{ position: "absolute", left: rx, top: ry, width: 8, height: 8, borderRadius: "50%", background: "rgba(180,200,240,0.6)", boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.5)" }} />)}
          {/* entry slot glows when the card drops in */}
          <div style={{ position: "absolute", left: 44, top: 22, width: 128, height: 15, borderRadius: 8, background: "#05080f", boxShadow: `inset 0 2px 4px rgba(0,0,0,0.8), 0 0 ${10 + slotGlow * 28 + lockFlash * 28}px rgba(90,200,150,${0.4 + lockFlash * 0.6})`, border: "1px solid rgba(90,200,150,0.55)" }} />
          {/* combination dial */}
          <div style={{ position: "absolute", left: 68, top: 92, width: 80, height: 80, borderRadius: "50%", background: "conic-gradient(from 0deg, #26314c, #3a4a6e, #26314c, #3a4a6e, #26314c)", transform: `rotate(${lockP * 320 + lockFlash * 42 + (1 - lockP) * Math.sin(lf / 6) * 6}deg)`, border: "4px solid rgba(150,180,235,0.5)", boxShadow: "inset 0 0 18px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: "50%", top: 6, width: 5, height: 20, marginLeft: -2.5, borderRadius: 3, background: lockP > 0.6 ? GREEN : GOLD, boxShadow: `0 0 10px ${lockP > 0.6 ? GREEN : GOLD}` }} />
            <div style={{ position: "absolute", inset: 22, borderRadius: "50%", background: "radial-gradient(circle,#3a4a6e,#1a2338)", border: "2px solid rgba(120,150,210,0.5)" }} />
            {/* floppy-disk = memory glyph on the hub */}
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 26, height: 26, marginLeft: -13, marginTop: -13, borderRadius: 3, background: lockP > 0.6 ? "rgba(90,200,150,0.92)" : "rgba(150,180,235,0.55)", transform: `rotate(${-(lockP * 320 + lockFlash * 42)}deg)` }}>
              <div style={{ position: "absolute", left: 5, top: 3, right: 5, height: 9, background: "#131c2f", borderRadius: 1 }} />
              <div style={{ position: "absolute", left: 8, top: 14, right: 8, bottom: 3, background: "#eef3ff", borderRadius: 1 }} />
            </div>
          </div>
          {/* padlock hasp (snaps shut on lock) */}
          <div style={{ position: "absolute", left: "50%", top: -18 + lockP * 12, width: 44, height: 40, marginLeft: -22, borderRadius: "22px 22px 0 0", border: `7px solid ${lockP > 0.6 ? GREEN : "rgba(180,200,240,0.85)"}`, borderBottom: "none", transform: `scaleY(${0.7 + lockP * 0.3})`, transformOrigin: "50% 100%", boxShadow: lockFlash > 0.05 ? `0 0 20px ${GREEN}` : "none" }} />
        </div>
      )}

      {/* ================= THE IDEA CARD (subject of the verdict) ================= */}
      {cardOp > 0.02 && (
        <div style={{ position: "absolute", left: CX, top: cardCY, width: 150, height: 192, marginLeft: -75, marginTop: -96, transform: `scale(${cardSc}) rotate(${cardZip * 4}deg)`, opacity: cardOp, zIndex: 40 }}>
          {/* zip trail streak */}
          {cardZip > 0.06 && cardZip < 0.9 && [0, 1, 2].map((k) => <div key={`ct${k}`} style={{ position: "absolute", left: "50%", top: -30 - k * 22, width: 42 - k * 8, height: 8, marginLeft: -(21 - k * 4), borderRadius: 5, background: `rgba(231,178,76,${(0.5 - k * 0.14) * cardZip})`, filter: "blur(1px)" }} />)}
          <div style={{ position: "absolute", inset: -12, borderRadius: 20, background: `radial-gradient(circle, rgba(231,178,76,${0.24 + cardGlow * 0.5}), transparent 70%)`, filter: "blur(4px)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "linear-gradient(160deg,#fbf5ea,#efe2cd)", border: "2px solid rgba(184,80,31,0.42)", boxShadow: "0 18px 34px -14px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: "50%", top: 42, transform: "translateX(-50%)", filter: "drop-shadow(0 0 8px rgba(210,114,78,0.6))" }}><ClaudeMark size={54} /></div>
          {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 26, top: 108 + k * 22, width: 98 - k * 22, height: 9, borderRadius: 5, background: k === 0 ? CLAY : "rgba(120,96,70,0.4)" }} />)}
          {/* the red WAX SEAL = the verdict (no word) */}
          {sealOp > 0.02 && (
            <div style={{ position: "absolute", left: "50%", top: "58%", width: 92, height: 92, marginLeft: -46, marginTop: -46, opacity: sealOp, transform: `scale(${sealSc * (1 + sealWob)}, ${sealSc * (1 - sealWob)}) rotate(-8deg)`, zIndex: 44 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "48% 52% 50% 50% / 52% 48% 52% 48%", background: "radial-gradient(circle at 38% 34%, #E86A4C, #B8241A 66%, #7c130c)", boxShadow: "inset 0 -6px 12px rgba(90,10,6,0.7), inset 0 5px 10px rgba(255,180,150,0.5), 0 8px 18px -6px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "2px dashed rgba(255,190,160,0.4)" }} />
              {/* embossed verdict check */}
              <div style={{ position: "absolute", left: 32, top: 26, width: 20, height: 38, borderRight: "7px solid #7c130c", borderBottom: "7px solid #7c130c", borderRadius: 2, transform: "rotate(42deg)", boxShadow: "1px 1px 0 rgba(255,180,150,0.35)" }} />
            </div>
          )}
        </div>
      )}

      {/* ================= THE GAVEL ================= */}
      <div style={{ position: "absolute", left: 590, top: 418, transform: `rotate(${gavelAngle}deg)`, transformOrigin: "0 100%", zIndex: 46 }}>
        {/* motion streaks on the chop */}
        {dropP > 0.05 && dropP < 0.98 && [0, 1, 2].map((k) => <div key={`gs${k}`} style={{ position: "absolute", left: -40 - k * 6, top: -108 - k * 10, width: 80, height: 4, borderRadius: 3, background: "rgba(255,225,180,0.5)", opacity: 0.6 - k * 0.16 }} />)}
        <div style={{ position: "absolute", left: -6, top: -74, width: 13, height: 82, borderRadius: 7, background: "linear-gradient(90deg,#7a4a22,#c68a44 46%,#6a3f1c)" }} />
        <div style={{ position: "absolute", left: -42, top: -100, width: 84, height: 36, borderRadius: 10, background: "linear-gradient(180deg,#d0a860,#8a5a2c)", boxShadow: "0 5px 12px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 6, background: "rgba(0,0,0,0.26)" }} />
          <div style={{ position: "absolute", right: 10, top: 0, bottom: 0, width: 6, background: "rgba(0,0,0,0.26)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 6, background: "rgba(255,225,180,0.4)" }} />
        </div>
      </div>

      {/* wood splinters flying off the impact */}
      {splinters.map((s, i) => (
        <div key={`sp${i}`} style={{ position: "absolute", left: 585 + s.dx, top: 468 + s.dy, width: s.w, height: s.h, borderRadius: 2, background: i % 3 === 0 ? WOODLIT : WOOD2, opacity: s.op, transform: `rotate(${s.rot}deg)`, zIndex: 47 }} />
      ))}

      {/* impact shockwave rings + sparks at slam */}
      {sAge >= 0 && sAge < 26 && [0, 1].map((k) => { const a = (sAge - k * 4) / 22; if (a <= 0 || a >= 1) return null; return <div key={`rg${k}`} style={{ position: "absolute", left: 585, top: 470, width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: "50%", border: `${6 - k * 2}px solid rgba(255,220,170,${(1 - a) * 0.7})`, transform: `scale(${0.4 + a * (8 - k * 1.6)})`, zIndex: 48 }} />; })}
      {sAge >= 0 && sAge < 13 && Array.from({ length: 12 }).map((_, i) => { const a = sAge / 13; const ang = (i / 12) * Math.PI * 2; const d = a * 72; return <div key={`spk${i}`} style={{ position: "absolute", left: 585 + Math.cos(ang) * d, top: 470 + Math.sin(ang) * d * 0.5, width: 6, height: 6, borderRadius: 2, background: i % 2 ? "#F6E4A0" : "#FFB27A", opacity: 1 - a, zIndex: 48 }} />; })}
      {sAge >= 0 && sAge < 12 && <Sparkles lf={lf} at={2.4} x={CX} y={250} n={16} spread={176} colors={[RED, GOLD, "#fff"]} dur={0.6} />}

      {/* lock click ping */}
      {lockAge >= 0 && lockAge < 16 && [0, 1].map((k) => { const a = (lockAge - k * 3) / 14; if (a <= 0 || a >= 1) return null; return <div key={`lk${k}`} style={{ position: "absolute", left: CX, top: 466, width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: "50%", border: `3px solid rgba(90,200,150,${(1 - a) * 0.8})`, transform: `scale(${0.5 + a * 4})`, zIndex: 49 }} />; })}
      {lockAge >= 0 && lockAge < 14 && <Sparkles lf={lf} at={4.05} x={CX} y={468} n={12} spread={144} colors={[GREEN, "#fff", GOLD]} dur={0.7} />}

      {/* ================= ADVOCATES (BELIEVER green / INVESTOR gold / SKEPTIC red) ================= */}
      {advOut > 0.02 && (<>
        <div style={{ position: "absolute", left: 92, top: 470, width: 120, opacity: advOut, transform: `translateX(${(1 - advOut) * -46}px)`, zIndex: 22 }}>
          <Mascot lf={lf + 7} size={120} tint={GREEN} gaze={5} cheer={lf < slam ? 0.5 + Math.max(0, Math.sin(lf / 5)) * 0.4 : 0.1} nodAmp={4.8} nodSpeed={5.5} />
        </div>
        <div style={{ position: "absolute", left: 800, top: 470, width: 120, opacity: advOut, transform: `translateX(${(1 - advOut) * 46}px)`, zIndex: 22 }}>
          <Mascot lf={lf + 3} size={120} tint={GOLD} suit={1} gaze={-5} cheer={lf < slam ? 0.5 + Math.max(0, Math.sin(lf / 5 + 1.5)) * 0.4 : 0.1} nodAmp={4.8} nodSpeed={6} />
        </div>
        <div style={{ position: "absolute", left: 326, top: 606, width: 132, opacity: advOut, transform: `translateY(${(1 - advOut) * 46}px)`, zIndex: 28 }}>
          <Mascot lf={lf + 11} size={132} tint={RED} glasses={1} gaze={3} stern={0.4} cheer={lf < slam ? 0.4 + Math.max(0, Math.sin(lf / 4.5 + 3)) * 0.35 : 0.05} nodAmp={5} nodSpeed={5} />
        </div>
      </>)}

      {/* ================= CALENDAR (remembers your idea for tomorrow) ================= */}
      {vaultP > 0.2 && (
        <div style={{ position: "absolute", left: 706, top: 292, width: 132, height: 142, transform: `translateY(${(1 - Math.min(1, vaultP * 1.3)) * -34}px) rotate(-4deg)`, opacity: Math.min(1, vaultP * 1.4), zIndex: 50 }}>
          <div style={{ position: "absolute", inset: -12, borderRadius: 18, background: `radial-gradient(circle, rgba(63,158,116,${0.14 + flipP * 0.34}), transparent 70%)`, filter: "blur(4px)" }} />
          {/* binding rings */}
          <div style={{ position: "absolute", left: 30, top: -6, width: 9, height: 18, borderRadius: 4, background: "#c9cfda", zIndex: 3 }} />
          <div style={{ position: "absolute", left: 94, top: -6, width: 9, height: 18, borderRadius: 4, background: "#c9cfda", zIndex: 3 }} />
          {/* body */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#f6f2ea", border: "2px solid #d8d2c4", boxShadow: "0 12px 24px -10px rgba(0,0,0,0.6)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 32, background: grad(CLAY, CLAYD) }} />
            {/* tomorrow, revealed under the flipping page */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 36, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: GREEN, lineHeight: "104px" }}>14</div>
            {/* today (flips away) */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 32, height: 108, background: "#fbf7f0", transformOrigin: "50% 0%", transform: `rotateX(${-flipP * 92}deg)`, backfaceVisibility: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: INK }}>13</span>
            </div>
          </div>
          {/* saved check pops after the flip */}
          {savedIn > 0.02 && (
            <div style={{ position: "absolute", left: 82, top: 88, width: 38, height: 38, borderRadius: "50%", background: GREEN, border: "3px solid #fff", boxShadow: `0 0 ${10 + lockFlash * 16}px ${GREEN}`, transform: `scale(${Math.min(1.12, savedIn * 1.12)})`, zIndex: 5 }}>
              <div style={{ position: "absolute", left: 12, top: 8, width: 9, height: 18, borderRight: "3px solid #fff", borderBottom: "3px solid #fff", transform: "rotate(42deg)" }} />
            </div>
          )}
        </div>
      )}

      {/* warm embers rising through the hall */}
      <Embers lf={lf} n={11} base={AMBER} />

      {/* white slam flash */}
      {flash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "#FFF4E2", opacity: flash * 0.32, zIndex: 60, pointerEvents: "none" }} />}

      <Vignette strength={0.46} />
      <Grain op={0.05} />
    </div>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const mouthX = 506, mouthY = 118;
  const scanY = 210;
  const slamF = fr(0.26);
  const alertT = fr(1.55);
  const raceStart = fr(2.95);
  const winAt = raceStart + fr(1.55);
  const alerted = lf >= alertT;
  const alertActive = alerted && lf < raceStart;
  const won = lf >= winAt;

  const shake = (t0: number, mag: number, dur: number) => { const d = lf - t0; return d >= 0 && d < dur ? Math.sin(d * 2.4) * mag * (1 - d / dur) : 0; };
  const shX = shake(slamF, 6, 10) + (alerted ? shake(alertT, 5, 14) : 0);
  const shY = shake(slamF, 3, 10);
  const machinePop = Math.min(1.06, spr(lf, 0, 11, 200));

  const whiteFlash = Math.max(0, lf >= slamF ? 1 - (lf - slamF) / 9 : 0) * 0.3;
  const redFlash = alertActive ? Math.max(0, 1 - (lf - alertT) / 12) * 0.42 + (Math.max(0, Math.sin((lf - alertT) / 4)) * 0.1) : 0;

  const speedInt = lf < fr(1.55) ? 0.85 : lf >= raceStart ? 0.95 : 0.18;

  // stopwatch race progress
  const swU = over(lf, raceStart, fr(1.55), Easing.out(Easing.cubic));
  const swX = 128 + swU * 728;
  const swPop = Math.min(1.08, spr(lf, raceStart, 10, 220));
  const swWob = Math.sin(lf / 2.2) * 5 * (swU > 0.02 && swU < 0.98 ? 1 : 0);
  // wilting calendar creeps
  const calU = over(lf, raceStart, fr(2.0), Easing.inOut(Easing.cubic));
  const calX = 132 + calU * 44;
  const wilt = over(lf, raceStart, fr(1.6), Easing.inOut(Easing.cubic));
  const pageFill = lerpHex("#F4F1EA", "#CBB693", wilt);
  const flagRise = Math.min(1.06, won ? spr(lf, winAt, 11, 200) : 0);
  const winPop = Math.min(1.1, won ? spr(lf, winAt, 9, 220) : 0);

  // feeding idea cards
  const FEED = [{ t: 0.2, fx: 940, fy: 62 }, { t: 0.5, fx: 900, fy: 40 }, { t: 0.85, fx: 970, fy: 96 }];
  const flawIn = over(lf, fr(1.05), fr(0.5), Easing.out(Easing.cubic));
  const flawEject = over(lf, fr(2.02), fr(0.72), Easing.in(Easing.cubic));

  // ===== NEW: race scoreboard clock (speedrun HUD) =====
  const clkSec = Math.max(0, ((won ? winAt : lf) - raceStart)) / FPS;
  const cSecs = Math.floor(clkSec);
  const cCent = Math.floor((clkSec - cSecs) * 100);
  const clock = `${cSecs}:${cCent.toString().padStart(2, "0")}`;

  // ===== NEW: back-wall spectator crowd =====
  const crowd = Array.from({ length: 12 }).map((_, i) => {
    const x = 96 + i * 66;
    const y = 476 + Math.sin(lf / 13 + i * 1.3) * 3;
    const d = i % 3;
    const fill = d === 0 ? "#141A26" : d === 1 ? "#181F2E" : "#10151F";
    const eye = [GREEN, SKY, GOLD, SLATE][i % 4];
    const rise = won ? Math.max(0, Math.sin((lf - winAt) / 4 - i * 0.4)) * 11 : 0;
    return { x, y: y - rise, fill, eye };
  });

  // ===== NEW: machine intake steam =====
  const steamPuffs = Array.from({ length: 7 }).map((_, i) => {
    const period = 96; const t = ((lf * 1.2 + i * 14 + seed(i * 2.3) * 96) % period) / period;
    const bx = cx - 78 + seed(i * 1.7) * 156 + Math.sin(lf / 16 + i) * 10;
    const y = 100 - t * 96;
    const s = 12 + t * 34;
    const op = Math.max(0, 1 - t) * (0.16 + seed(i * 3.1) * 0.1);
    return { bx, y, s, op };
  });

  // ===== NEW: gear/scanner sparks =====
  const gearSparks = Array.from({ length: 14 }).map((_, i) => {
    const gx = i % 2 ? 636 : 380; const gy = i % 2 ? 176 : 206;
    const period = 18; const t = ((lf * 1.5 + i * 4 + seed(i * 2.7) * 18) % period) / period;
    const a = seed(i * 5.5) * Math.PI - Math.PI * 0.15;
    const dist = t * 48;
    const x = gx + Math.cos(a) * dist * 1.5;
    const y = gy + Math.sin(a) * dist * 0.7 + t * t * 34;
    const op = (1 - t) * 0.9 * (alertActive ? 1 : 0.6);
    const c = i % 3 === 0 ? "#FFD9A0" : "#F2903E";
    return { x, y, op, c };
  });

  // ===== NEW: extra warm dust motes in the beam =====
  const warmDust = Array.from({ length: 12 }).map((_, i) => {
    const bx = 340 + seed(i * 3.7 + 2) * 340;
    const by = ((lf * (0.3 + seed(i * 1.9) * 0.5) + seed(i * 8.3) * 620) % 620);
    const dx = Math.sin(lf / 34 + i) * 16;
    const r = 1 + seed(i * 2.4 + 3) * 2.4;
    const op = (0.1 + seed(i * 4.1) * 0.18) * (0.6 + 0.4 * Math.sin(lf / 22 + i));
    return { x: bx + dx, y: 50 + by, r, op };
  });

  return (
    <>
      {/* ===== deep back atmosphere ===== */}
      <div style={{ position: "absolute", left: cx - 430, top: -60, width: 860, height: 520, background: `radial-gradient(ellipse 46% 80% at 50% 30%, ${alertActive ? "rgba(196,74,58,0.30)" : "rgba(90,120,180,0.24)"}, transparent 68%)`, zIndex: 0 }} />
      <div style={{ position: "absolute", left: cx - 380, top: 380, width: 760, height: 420, background: "radial-gradient(ellipse 50% 70% at 50% 20%, rgba(63,158,116,0.16), transparent 70%)", zIndex: 0 }} />

      {/* ===== NEW: industrial back-wall factory ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <defs>
          <linearGradient id="wall6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A2130" /><stop offset="1" stopColor="#0B0F17" /></linearGradient>
          <linearGradient id="pipe6" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#20283A" /><stop offset="0.42" stopColor="#5A6478" /><stop offset="0.56" stopColor="#828CA0" /><stop offset="1" stopColor="#20283A" /></linearGradient>
        </defs>
        {/* wall panel */}
        <rect x={104} y={64} width={804} height={372} rx={12} fill="url(#wall6)" opacity={0.82} />
        <rect x={104} y={64} width={804} height={372} rx={12} fill="none" stroke="rgba(90,100,120,0.22)" strokeWidth={2} />
        {/* panel seams */}
        {[1, 2].map((i) => <line key={`hs${i}`} x1={104} y1={64 + i * 124} x2={908} y2={64 + i * 124} stroke="rgba(90,100,120,0.13)" strokeWidth={2} />)}
        {[1, 2, 3].map((i) => <line key={`vs${i}`} x1={104 + i * 201} y1={64} x2={104 + i * 201} y2={436} stroke="rgba(90,100,120,0.11)" strokeWidth={2} />)}
        {/* rivets */}
        {Array.from({ length: 24 }).map((_, i) => { const col = i % 8, row = Math.floor(i / 8); return <circle key={`rv${i}`} cx={140 + col * 100} cy={96 + row * 124} r={2.5} fill="rgba(120,130,150,0.4)" />; })}
        {/* hazard stripe strip along wall base */}
        <g opacity={0.4}>
          {Array.from({ length: 20 }).map((_, i) => (<polygon key={`hz${i}`} points={`${120 + i * 40},420 ${140 + i * 40},420 ${128 + i * 40},438 ${108 + i * 40},438`} fill={i % 2 ? "#0E1116" : "#C9A23A"} />))}
        </g>
        {/* wall gauges */}
        {[[184, 322], [828, 322]].map(([gx, gy], idx) => (
          <g key={`gg${idx}`}>
            <circle cx={gx} cy={gy} r={34} fill="#10151F" stroke="#3A4456" strokeWidth={3} />
            <circle cx={gx} cy={gy} r={34} fill="none" stroke="rgba(120,130,150,0.3)" strokeWidth={1} />
            {Array.from({ length: 9 }).map((_, k) => <rect key={k} x={gx - 1} y={gy - 30} width={2} height={6} fill="#5A6478" transform={`rotate(${-120 + k * 30} ${gx} ${gy})`} />)}
            <line x1={gx} y1={gy} x2={gx} y2={gy - 24} stroke={alertActive ? RED : "#7FE0B4"} strokeWidth={3} strokeLinecap="round" transform={`rotate(${-100 + (alertActive ? 150 : 0) + Math.sin(lf / (9 + idx * 4) + idx) * 34} ${gx} ${gy})`} />
            <circle cx={gx} cy={gy} r={4} fill="#8A94A8" />
            <circle cx={gx} cy={gy - 44} r={3.5} fill={alertActive ? (Math.sin(lf / 3) > 0 ? "#FF5A48" : "#7A2016") : (Math.sin(lf / 7 + idx) > 0 ? "#4FE0A0" : "#2E7D5B")} />
          </g>
        ))}
        {/* wall vents */}
        {[148, 864].map((vx, i) => (<g key={`vt${i}`} opacity={0.75}>
          <rect x={vx - 24} y={132} width={48} height={44} rx={5} fill="#0C1119" stroke="#3A4456" strokeWidth={2} />
          {[0, 1, 2, 3].map((k) => <line key={k} x1={vx - 18} y1={140 + k * 9} x2={vx + 18} y2={140 + k * 9} stroke="#3A4456" strokeWidth={3} />)}
        </g>))}
        {/* side vertical pipes */}
        <rect x={30} y={110} width={26} height={672} fill="url(#pipe6)" />
        <rect x={956} y={110} width={26} height={672} fill="url(#pipe6)" />
        {[210, 470, 690].map((py, i) => (<React.Fragment key={`pj${i}`}>
          <rect x={24} y={py} width={38} height={16} rx={4} fill="#3A4456" stroke="#5A6478" strokeWidth={1.5} />
          <rect x={950} y={py} width={38} height={16} rx={4} fill="#3A4456" stroke="#5A6478" strokeWidth={1.5} />
        </React.Fragment>))}
      </svg>

      {/* perspective speedrun floor */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {Array.from({ length: 15 }).map((_, i) => { const bx = (i / 14) * 1012; return <line key={`v${i}`} x1={506} y1={402} x2={bx} y2={792} stroke="rgba(90,160,222,0.10)" strokeWidth={1.2} />; })}
        {Array.from({ length: 9 }).map((_, i) => { const t = (((i / 9) + (lf / 96)) % 1); const y = 402 + t * t * 388; const w = 0.06 + t * 0.94; return <line key={`h${i}`} x1={506 - 506 * w} y1={y} x2={506 + 506 * w} y2={y} stroke={`rgba(90,160,222,${0.05 + 0.14 * t})`} strokeWidth={1 + t * 1.6} />; })}
        <line x1={0} y1={402} x2={1012} y2={402} stroke="rgba(140,190,240,0.28)" strokeWidth={2} />
      </svg>

      {/* speed lines */}
      {Array.from({ length: 16 }).map((_, i) => { const period = 22 + seed(i) * 24; const p = ((lf * (2.4 + seed(i * 2) * 2.2) + seed(i * 3) * period) % period) / period; const y = 60 + seed(i) * 660; const len = 90 + seed(i * 5) * 170; const x = 1040 - p * 1200; const o = speedInt * (1 - Math.abs(p - 0.5) * 1.2) * (0.35 + seed(i * 7) * 0.5); return <div key={`sl${i}`} style={{ position: "absolute", left: x, top: y, width: len, height: 2 + seed(i * 9) * 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${i % 4 === 0 ? "rgba(127,224,180,0.7)" : "rgba(150,195,245,0.6)"}, transparent)`, opacity: Math.max(0, o), zIndex: 2 }} />; })}

      {/* drifting motes */}
      {Array.from({ length: 14 }).map((_, i) => { const life = 120 + seed(i) * 80; const t = ((lf + seed(i * 3) * life) % life) / life; const x = seed(i * 1.3) * 1012 + Math.sin(lf / 20 + i) * 22; const y = 760 - t * 720; const s = 2 + seed(i * 2) * 4; return <div key={`mo${i}`} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: "rgba(200,220,255,0.5)", opacity: (1 - t) * 0.5, zIndex: 2 }} />; })}

      {/* NEW warm dust in the beam */}
      {warmDust.map((m, i) => (<div key={`wd${i}`} style={{ position: "absolute", left: m.x, top: m.y, width: m.r * 2, height: m.r * 2, borderRadius: "50%", background: "rgba(255,220,170,0.7)", opacity: m.op, zIndex: 2 }} />))}

      {/* HUD capture brackets */}
      {[[52, 300], [960, 300], [52, 740], [960, 740]].map((p, i) => { const flip = i % 2 === 1 ? -1 : 1; const flipY = i > 1 ? -1 : 1; return <div key={`hud${i}`} style={{ position: "absolute", left: p[0] - (flip < 0 ? 30 : 0), top: p[1] - (flipY < 0 ? 30 : 0), width: 30, height: 30, borderLeft: `3px solid rgba(150,200,245,${0.3 + (won ? 0.25 : 0)})`, borderTop: `3px solid rgba(150,200,245,${0.3 + (won ? 0.25 : 0)})`, transform: `scale(${flip},${flipY})`, transformOrigin: "top left", zIndex: 3 }} />; })}

      {/* NEW speedrun scoreboard clock */}
      <div style={{ position: "absolute", left: 60, top: 414, width: 152, height: 42, borderRadius: 8, background: "linear-gradient(180deg, rgba(16,22,32,0.94), rgba(8,12,20,0.94))", border: `1.5px solid ${won ? "rgba(127,224,180,0.7)" : "rgba(90,120,150,0.5)"}`, boxShadow: won ? "0 0 16px rgba(63,158,116,0.5)" : "none", display: "flex", alignItems: "center", gap: 8, padding: "0 12px", zIndex: 3 }}>
        <svg viewBox="0 0 24 24" width={18} height={18}><path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill={won ? "#7FE0B4" : "#4FB488"} /></svg>
        <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: 1, color: won ? "#8FF0C4" : "#B9E4CF", textShadow: "0 0 8px rgba(63,158,116,0.5)" }}>{clock}</span>
      </div>

      <SpotCone x={cx} top={-30} topW={70} botW={300} h={420} color="rgba(200,222,255,0.10)" sway={2} lf={lf} />
      <SpotCone x={840} top={330} topW={50} botW={190} h={360} color={won ? "rgba(127,224,180,0.16)" : "rgba(200,222,255,0.07)"} />

      {/* NEW: overhead conveyor feeding the machine */}
      <svg viewBox="0 0 400 72" width={400} height={72} style={{ position: "absolute", left: 616, top: 40, transform: "rotate(5deg)", transformOrigin: "0 50%", zIndex: 4 }}>
        <rect x={4} y={20} width={388} height={30} rx={7} fill="#1B2231" stroke="#3A4456" strokeWidth={2} />
        <rect x={4} y={17} width={388} height={7} rx={3.5} fill="#4A5468" />
        {Array.from({ length: 9 }).map((_, k) => { const dx = (((k * 46 - lf * 4) % 414) + 414) % 414 - 22; return <path key={k} d={`M ${dx} 25 l 10 6 l -10 6`} stroke="rgba(150,200,245,0.42)" strokeWidth={3} fill="none" strokeLinecap="round" />; })}
        <g transform={`rotate(${lf * 5} 20 35)`}><circle cx={20} cy={35} r={16} fill="#333C4E" stroke="#5A6478" strokeWidth={2} /><line x1={20} y1={35} x2={20} y2={22} stroke="#6A7488" strokeWidth={3} /></g>
        <g transform={`rotate(${lf * 5} 376 35)`}><circle cx={376} cy={35} r={16} fill="#333C4E" stroke="#5A6478" strokeWidth={2} /><line x1={376} y1={35} x2={376} y2={22} stroke="#6A7488" strokeWidth={3} /></g>
      </svg>

      {/* NEW: spectator crowd silhouettes behind the lanes */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
        {crowd.map((c, i) => (
          <g key={`cr${i}`} transform={`translate(${c.x} ${c.y})`}>
            <path d="M -22 22 Q -22 -14 0 -14 Q 22 -14 22 22 Z" fill={c.fill} />
            <circle cx={0} cy={-4} r={2.6} fill={c.eye} opacity={0.65} />
          </g>
        ))}
      </svg>

      {/* ============ RACE REGION (bottom) ============ */}
      {/* lanes */}
      {[490, 605].map((ly, i) => (
        <div key={`ln${i}`} style={{ position: "absolute", left: 60, top: ly, width: 812, height: 62, borderRadius: 14, background: i === 0 ? "linear-gradient(180deg, rgba(30,52,42,0.85), rgba(14,26,20,0.85))" : "linear-gradient(180deg, rgba(40,32,30,0.8), rgba(22,16,14,0.8))", border: `1.5px solid ${i === 0 ? "rgba(63,158,116,0.5)" : "rgba(150,120,110,0.4)"}`, zIndex: 5 }}>
          {Array.from({ length: 10 }).map((_, k) => { const dx = ((k * 84 - (i === 0 ? lf * 6 : lf * 0.6)) % 840 + 840) % 840; return <div key={k} style={{ position: "absolute", left: dx, top: 28, width: 34, height: 5, borderRadius: 3, background: i === 0 ? "rgba(127,224,180,0.35)" : "rgba(160,130,120,0.3)" }} />; })}
        </div>
      ))}

      {/* finish line + pole */}
      <div style={{ position: "absolute", left: 864, top: 442, width: 16, height: 226, zIndex: 6, display: "flex", flexDirection: "column" }}>
        {Array.from({ length: 16 }).map((_, r) => (<div key={r} style={{ display: "flex", height: "6.25%" }}><div style={{ flex: 1, background: r % 2 ? "#0E1116" : "#F4F1EA" }} /><div style={{ flex: 1, background: r % 2 ? "#F4F1EA" : "#0E1116" }} /></div>))}
      </div>
      <div style={{ position: "absolute", left: 886, top: 420, width: 6, height: 250, background: "linear-gradient(180deg,#8A94A8,#4A5468)", zIndex: 6 }} />
      {won && <div style={{ position: "absolute", left: 892, top: 430 + (1 - Math.min(1, flagRise)) * 60, width: 70, height: 46, background: GREEN, clipPath: "polygon(0 0, 100% 26%, 0 52%)", boxShadow: "0 0 16px rgba(63,158,116,0.7)", transform: `scaleX(${Math.min(1, flagRise)})`, transformOrigin: "left", zIndex: 6 }} />}

      {/* NEW: tiny cheering mascots at the finish */}
      {[{ x: 928, y: 546, s: 78, ph: 0, tint: GREEN }, { x: 966, y: 590, s: 60, ph: 1.7, tint: GOLD }].map((m, i) => {
        const jump = won ? Math.max(0, Math.sin((lf - winAt) / 3.4 - i * 0.6)) * -18 : 0;
        const bobv = Math.sin(lf / 12 + m.ph) * 3;
        return (
          <div key={`ch${i}`} style={{ position: "absolute", left: m.x, top: m.y + bobv + jump, width: m.s, transform: "translate(-50%,-50%)", zIndex: 8 }}>
            <Mascot lf={lf} size={m.s} tint={m.tint} gaze={-1} cheer={won ? 0.9 : 0.35} shock={0} stern={0} nodAmp={won ? 5 : 2.4} nodSpeed={won ? 8 : 4} />
          </div>
        );
      })}

      {/* wilting CALENDAR (6-month slow path) */}
      <div style={{ position: "absolute", left: calX - 54, top: 548, width: 108, height: 118, zIndex: 7 }}>
        {/* sweat + down arrow */}
        {lf >= raceStart && wilt > 0.15 && Array.from({ length: 3 }).map((_, k) => { const t = ((lf * 0.05 + seed(k * 4) + k * 0.33) % 1); return <div key={`sw${k}`} style={{ position: "absolute", left: 20 + k * 30, top: -6 + t * 40, width: 7, height: 11, borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", background: "rgba(120,190,240,0.85)", opacity: (1 - t) * 0.9 }} />; })}
        <div style={{ position: "absolute", left: 44, top: -34 - Math.sin(lf / 5) * 3, opacity: lf >= raceStart ? 0.85 : 0, zIndex: 9 }}>
          <svg viewBox="0 0 24 30" width={22} height={28}><path d="M12 2 L12 20 M4 14 L12 24 L20 14" stroke={RED} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <svg viewBox="0 0 120 120" width={108} height={108} style={{ overflow: "visible" }}>
          <rect x={20} y={34} width={84} height={78} rx={7} fill="#B9B2A2" />
          <rect x={15} y={29} width={84} height={78} rx={7} fill="#CEC7B7" />
          <g transform={`rotate(${wilt * 11} 14 30)`}>
            <rect x={10} y={24} width={84} height={80} rx={7} fill={pageFill} stroke="rgba(0,0,0,0.15)" strokeWidth={1.5} />
            <rect x={10} y={24} width={84} height={20} rx={7} fill={lerpHex("#C44A3A", "#7A2016", wilt)} />
            <rect x={30} y={16} width={7} height={16} rx={3} fill="#8A94A8" />
            <rect x={67} y={16} width={7} height={16} rx={3} fill="#8A94A8" />
            {Array.from({ length: 12 }).map((_, k) => { const col = k % 4, row = Math.floor(k / 4); return <rect key={k} x={20 + col * 18} y={54 + row * 16} width={11} height={11} rx={2} fill={lerpHex("#9A968B", "#6b6458", wilt)} opacity={0.8} />; })}
            {/* peeling corner */}
            <polygon points={`${94 - wilt * 10},${104} ${94},${104 - wilt * 22} ${74 + wilt * 6},${104}`} fill="#A89B84" opacity={wilt} />
          </g>
        </svg>
      </div>

      {/* GREEN STOPWATCH racer */}
      {swU > 0 && [1, 2, 3, 4].map((k) => (<div key={`tr${k}`} style={{ position: "absolute", left: swX - 46 - k * 26, top: 458, width: 60, height: 70, borderRadius: "50%", background: `radial-gradient(circle, rgba(63,158,116,${0.32 - k * 0.06}), transparent 70%)`, opacity: swU < 0.96 ? 1 : 0, zIndex: 7 }} />))}
      <div style={{ position: "absolute", left: swX - 48, top: 448 + swWob * 0.4, width: 96, transform: `scale(${swPop}) rotate(${swWob}deg)`, transformOrigin: "50% 90%", zIndex: 9, filter: "drop-shadow(0 0 16px rgba(63,158,116,0.55))" }}>
        <svg viewBox="0 0 100 122" width={96} height={117} style={{ overflow: "visible" }}>
          <rect x={16} y={22} width={11} height={9} rx={2} fill="#2E7D5B" transform="rotate(-32 21 26)" />
          <rect x={73} y={22} width={11} height={9} rx={2} fill="#2E7D5B" transform="rotate(32 79 26)" />
          <rect x={44} y={2} width={12} height={12} rx={3} fill="#2E7D5B" />
          <rect x={38} y={-2} width={24} height={8} rx={4} fill="#4FB488" />
          <circle cx={50} cy={70} r={46} fill="#2E7D5B" />
          <circle cx={50} cy={70} r={46} fill="none" stroke="#7FE0B4" strokeWidth={4} />
          <circle cx={50} cy={70} r={38} fill="#F4F6EE" />
          {Array.from({ length: 12 }).map((_, k) => { const a = (k / 12) * Math.PI * 2; return <rect key={k} x={49} y={36} width={2} height={5} fill="#1A2438" transform={`rotate(${k * 30} 50 70)`} />; })}
          <text x={50} y={64} textAnchor="middle" fontFamily={mono} fontSize={15} fontWeight={700} fill="#1A2438">10:00</text>
          <line x1={50} y1={70} x2={50} y2={40} stroke={RED} strokeWidth={3} strokeLinecap="round" transform={`rotate(${lf * 26} 50 70)`} />
          <circle cx={50} cy={70} r={4} fill="#1A2438" />
        </svg>
      </div>
      {/* stopwatch dust puffs */}
      {swU > 0.02 && swU < 0.97 && Array.from({ length: 4 }).map((_, k) => { const t = ((lf * 0.12 + seed(k * 5)) % 1); return <div key={`du${k}`} style={{ position: "absolute", left: swX - 40 - t * 40, top: 512 + Math.sin(k) * 6, width: 8 + t * 16, height: 8 + t * 16, borderRadius: "50%", background: "rgba(210,225,220,0.4)", opacity: (1 - t) * 0.5, zIndex: 7 }} />; })}

      {/* win burst at finish */}
      {won && (<>
        <div style={{ position: "absolute", left: 872 - 34, top: 468 - 34, width: 68, height: 68, borderRadius: "50%", background: grad("#4FB488", "#2E7D5B"), border: "4px solid #BFF0D8", transform: `scale(${winPop})`, zIndex: 12, boxShadow: "0 0 26px rgba(63,158,116,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 40 40" width={40} height={40}><path d="M9 21 L17 29 L32 12" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <Sparkles lf={lf} at={winAt / FPS} x={872} y={468} n={18} spread={230} colors={[GREEN, GOLD, "#fff"]} dur={1.0} />
      </>)}

      {/* ============ MACHINE REGION (top, shakes) ============ */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shX}px,${shY}px) scale(${machinePop})`, transformOrigin: "50% 22%", zIndex: 10 }}>
        {/* rising steam from intake */}
        {steamPuffs.map((p, i) => (<div key={`st${i}`} style={{ position: "absolute", left: p.bx - p.s / 2, top: p.y - p.s / 2, width: p.s, height: p.s, borderRadius: "50%", background: `radial-gradient(circle, rgba(220,232,248,${p.op}), transparent 70%)`, zIndex: 9 }} />))}

        {/* spinning intake ring */}
        {Array.from({ length: 20 }).map((_, i) => { const a = (i / 20) * Math.PI * 2 + lf / 12; const on = alertActive; return <div key={`ir${i}`} style={{ position: "absolute", left: mouthX + Math.cos(a) * 108 - 3, top: 96 + Math.sin(a) * 24 - 3, width: 6, height: 6, borderRadius: "50%", background: on ? RED : "rgba(150,200,245,0.7)", opacity: 0.35 + Math.max(0, Math.sin(a * 2 + lf / 6)) * 0.5, zIndex: 11 }} />; })}

        {/* hopper / funnel body */}
        <svg viewBox="0 0 340 300" width={340} height={300} style={{ position: "absolute", left: cx - 170, top: 56, overflow: "visible", zIndex: 11 }}>
          <defs>
            <linearGradient id="metal6" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A5468" /><stop offset="0.5" stopColor="#333C4E" /><stop offset="1" stopColor="#20283A" /></linearGradient>
          </defs>
          {/* intake rim */}
          <ellipse cx={170} cy={44} rx={112} ry={26} fill="#28303F" stroke="#5A6478" strokeWidth={3} />
          <ellipse cx={170} cy={40} rx={112} ry={26} fill="url(#metal6)" stroke="#6A7488" strokeWidth={2} />
          <ellipse cx={170} cy={40} rx={78} ry={16} fill="#12161F" />
          {/* body trapezoid */}
          <polygon points="60,48 280,48 214,196 126,196" fill="url(#metal6)" stroke="#5A6478" strokeWidth={2.5} />
          <polygon points="60,48 280,48 268,72 72,72" fill="rgba(255,255,255,0.08)" />
          {/* side readout strip */}
          <rect x={60} y={86} width={44} height={30} rx={4} fill="#0B0E15" stroke="#2E4A66" strokeWidth={2} />
          {Array.from({ length: 5 }).map((_, k) => { const h = 4 + ((Math.sin(lf / 5 + k * 1.4) * 0.5 + 0.5) * 18); return <rect key={k} x={66 + k * 7} y={112 - h} width={4} height={h} rx={1} fill={alertActive ? "#FF8A78" : "#7FE0B4"} opacity={0.85} />; })}
          {/* rivets */}
          {[0, 1, 2, 3, 4].map((i) => (<React.Fragment key={i}><circle cx={78 + i * 46} cy={62} r={3} fill="#6A7488" /><circle cx={92 + i * 40} cy={182} r={3} fill="#6A7488" /></React.Fragment>))}
          {/* scanner window */}
          <rect x={96} y={130} width={148} height={40} rx={6} fill="#0B0E15" stroke={alertActive ? RED : "#2E4A66"} strokeWidth={3} />
          <rect x={96} y={130} width={148} height={40} rx={6} fill={alertActive ? "rgba(196,74,58,0.22)" : "rgba(90,160,222,0.14)"} />
          {/* scan sweep line */}
          <rect x={100} y={132 + ((lf * 2.4) % 36)} width={140} height={3} rx={2} fill={alertActive ? "#FF8A78" : "#8FD0F0"} opacity={0.85} />
          {/* chute */}
          <polygon points="126,196 214,196 200,244 140,244" fill="#2A3345" stroke="#5A6478" strokeWidth={2} />
          <rect x={150} y={240} width={40} height={16} rx={3} fill="#1A2130" stroke="#4A5468" strokeWidth={2} />
          {/* legs */}
          <rect x={110} y={196} width={12} height={70} rx={3} fill="#333C4E" transform="rotate(10 116 230)" />
          <rect x={218} y={196} width={12} height={70} rx={3} fill="#333C4E" transform="rotate(-10 224 230)" />
          {/* feed pipe elbow into intake */}
          <path d="M 300 30 Q 330 30 330 62 L 330 120" fill="none" stroke="#3A4456" strokeWidth={12} strokeLinecap="round" />
          <path d="M 300 30 Q 330 30 330 62 L 330 120" fill="none" stroke="#5A6478" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
          {/* gears */}
          <g transform={`rotate(${lf * 3} 300 120)`}>{Array.from({ length: 8 }).map((_, i) => <rect key={i} x={296} y={100} width={8} height={9} fill="#5A6478" transform={`rotate(${i * 45} 300 120)`} />)}<circle cx={300} cy={120} r={12} fill="#3A4456" stroke="#6A7488" strokeWidth={2} /></g>
          <g transform={`rotate(${-lf * 4} 44 150)`}>{Array.from({ length: 7 }).map((_, i) => <rect key={i} x={41} y={132} width={7} height={8} fill="#5A6478" transform={`rotate(${i * 51.4} 44 150)`} />)}<circle cx={44} cy={150} r={10} fill="#3A4456" stroke="#6A7488" strokeWidth={2} /></g>
          {/* status light */}
          <circle cx={252} cy={62} r={8} fill={alertActive ? (Math.sin(lf / 3) > 0 ? "#FF5A48" : "#7A2016") : (Math.sin(lf / 6) > -0.4 ? "#4FE0A0" : "#2E7D5B")} stroke="#1A2130" strokeWidth={2} />
        </svg>

        {/* gear / scanner sparks */}
        {gearSparks.map((s, i) => (<div key={`gs${i}`} style={{ position: "absolute", left: s.x, top: s.y, width: 3, height: 3, borderRadius: "50%", background: s.c, opacity: s.op, boxShadow: `0 0 6px ${s.c}`, zIndex: 12 }} />))}

        {/* feeding idea cards */}
        {FEED.map((cd, i) => { const cp = over(lf, fr(cd.t), fr(0.5), Easing.in(Easing.cubic)); if (cp <= 0 || cp >= 1) return null; const path = (u: number): [number, number] => [cd.fx + (mouthX - cd.fx) * u, cd.fy + (58 - cd.fy) * u - Math.sin(u * Math.PI) * 34]; return (<React.Fragment key={`fc${i}`}>{[0, 1, 2].map((k) => { const u = Math.max(0, cp - k * 0.05); const [x, y] = path(u); return (<div key={k} style={{ position: "absolute", left: x - 32, top: y - 22, width: 64, height: 44, borderRadius: 8, background: k === 0 ? "linear-gradient(158deg,#FBF6EC,#E7DCC8)" : "#EFE6D6", border: "2px solid rgba(210,114,78,0.4)", opacity: (1 - cp * 0.3) * (k === 0 ? 1 : 0.35 - k * 0.08), transform: `scale(${1 - k * 0.06}) rotate(${(1 - u) * 20}deg)`, zIndex: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{k === 0 && <svg viewBox="0 0 24 24" width={22} height={22}><circle cx={12} cy={9} r={6} fill="none" stroke={GOLD} strokeWidth={2.5} /><rect x={9} y={15} width={6} height={4} rx={1} fill={GOLD} /></svg>}</div>); })}</React.Fragment>); })}

        {/* FLAW card: enters, gets caught, ejects */}
        {(() => {
          const inU = flawIn; const ejU = flawEject;
          let x = cx, y = 58 + inU * (scanY - 58), rot = (1 - inU) * 24, sc = 1, crack = 0, red = 0;
          if (alerted) { red = Math.min(1, (lf - alertT) / 6); }
          if (ejU > 0) { x = cx + ejU * 380; y = scanY - Math.sin(ejU * Math.PI) * 80 + ejU * 120; rot = ejU * 260; sc = 1 - ejU * 0.5; crack = 1; }
          if (ejU >= 1) return null;
          if (inU <= 0) return null;
          return (
            <div style={{ position: "absolute", left: x - 34, top: y - 24, width: 68, height: 48, borderRadius: 8, background: red > 0 ? lerpHex("#FBF6EC", "#E86C5A", red) : "linear-gradient(158deg,#FBF6EC,#E7DCC8)", border: `2.5px solid ${red > 0 ? RED : "rgba(210,114,78,0.5)"}`, transform: `rotate(${rot}deg) scale(${sc})`, boxShadow: red > 0 ? "0 0 20px rgba(196,74,58,0.7)" : "none", zIndex: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width={24} height={24}><circle cx={12} cy={9} r={6} fill="none" stroke={red > 0 ? "#fff" : GOLD} strokeWidth={2.5} /><rect x={9} y={15} width={6} height={4} rx={1} fill={red > 0 ? "#fff" : GOLD} />{crack > 0 && <path d="M4 3 L11 12 L7 15 L16 22" stroke="#7A2016" strokeWidth={2} fill="none" />}</svg>
            </div>
          );
        })()}

        {/* catch gate paddle */}
        {alertActive && <div style={{ position: "absolute", left: cx + 66, top: scanY - 8, width: 46, height: 12, borderRadius: 4, background: grad("#C44A3A", "#8A2E20"), border: "1.5px solid #F3B292", transformOrigin: "left center", transform: `rotate(${-40 + Math.sin(lf / 2) * 8}deg)`, zIndex: 13 }} />}

        {/* alert rings */}
        {alertActive && [0, 1, 2].map((k) => { const period = 20; const t = (((lf - alertT) / period + k / 3) % 1); const size = 60 + t * 210; return <div key={`ar${k}`} style={{ position: "absolute", left: cx - size / 2, top: scanY - size / 2, width: size, height: size, borderRadius: "50%", border: `4px solid ${RED}`, opacity: (1 - t) * 0.8, zIndex: 12 }} />; })}
        {alertActive && <div style={{ position: "absolute", left: cx - 90, top: scanY - 90, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,74,58,0.4), transparent 66%)", transform: `scale(${1 + Math.sin(lf / 4) * 0.08})`, zIndex: 11 }} />}

        {/* WARNING icon (no words) */}
        {alerted && lf < raceStart + fr(0.3) && (() => { const pop = Math.min(1.1, spr(lf, alertT, 9, 230)); const out = lf >= raceStart ? Math.max(0, 1 - (lf - raceStart) / 8) : 1; return (
          <div style={{ position: "absolute", left: cx - 34, top: 92 + bob(lf, 4, 26, 0), width: 68, height: 68, transform: `scale(${pop * out})`, zIndex: 15, filter: "drop-shadow(0 0 14px rgba(196,74,58,0.8))" }}>
            <svg viewBox="0 0 100 100" width={68} height={68}><polygon points="50,8 94,86 6,86" fill={RED} stroke="#fff" strokeWidth={5} strokeLinejoin="round" /><rect x={44} y={32} width={12} height={30} rx={6} fill="#fff" /><circle cx={50} cy={74} r={6.5} fill="#fff" /></svg>
          </div>); })()}

        {/* eject sparks */}
        {alerted && lf < raceStart && <Sparkles lf={lf} at={alertT / FPS} x={cx} y={scanY} n={16} spread={180} colors={[RED, "#F2903E", "#FFD9A0"]} dur={0.9} />}
      </div>

      {/* ============ JUDGE mascot operator ============ */}
      <div style={{ position: "absolute", left: 44, top: 300, width: 150, zIndex: 11 }}>
        <Mascot lf={lf} size={150} tint={SLATE} gaze={5} nodAmp={alertActive ? 2 : 4.4} nodSpeed={lf < fr(1.5) ? 4 : 7} shock={alerted && lf < alertT + 12 ? 0.4 : 0} stern={alertActive ? 0.6 : 0} cheer={won ? 0.85 : 0} suit={1} />
      </div>

      {/* warm machine embers */}
      <Embers lf={lf} n={8} base={AMBER} />

      {/* ============ overlays ============ */}
      {whiteFlash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "#FFFDF6", opacity: whiteFlash, zIndex: 30, pointerEvents: "none" }} />}
      {redFlash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 26%, rgba(196,74,58,0.9), transparent 70%)", opacity: redFlash, zIndex: 29, pointerEvents: "none" }} />}
      {won && <Confetti lf={lf - winAt} n={30} colors={[GREEN, GOLD, "#7FE0B4", "#FCEDDD"]} top={360} h={430} />}
    </>
  );
};

const RoastCTA: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= FULL-PANEL CTA (its own framed panel) =================
  const W = 1012, H = P_H, cx = W / 2;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ---- cinematic timing / global beats ----
  const flash = Math.max(0, 1 - over(lf, 0, fr(0.33)));                    // white bloom on open
  const bgIn = over(lf, 0, fr(0.6), Easing.out(Easing.cubic));
  const sweepA = (lf % fr(3.2)) / fr(3.2);                                  // roaming floor light 1
  const sweepB = ((lf + 46) % fr(4.1)) / fr(4.1);                           // roaming floor light 2
  const rayRot = lf * 0.12;

  // seal-slam impact -> whole-scene shake + flare
  const slam = 52;
  const sImp = Math.max(0, 1 - Math.abs(lf - (slam + 3)) / 7);
  const shX = Math.sin(lf * 2.7) * 7 * sImp;
  const shY = Math.cos(lf * 3.1) * 5 * sImp;

  // ---- element springs ----
  const wS = spr(lf, 4, 11, 220);
  const wSc = Math.min(1.06, wS);
  const wDrop = (1 - Math.min(1, wS)) * -150;

  const hS = spr(lf, 34, 12, 200);
  const hSc = Math.min(1.07, hS);
  const hDrop = (1 - Math.min(1, hS)) * 44;
  const heroBob = bob(lf, 5, 46, 0);
  const heroTop = 324 + hDrop;
  const heroCY = heroTop + heroBob + 96;

  const kS = spr(lf, slam, 9, 240);
  const kSc = Math.min(1.08, kS);
  const ringP = over(lf, fr(slam / 30), fr(0.42));
  const ring2P = over(lf, fr((slam + 3) / 30), fr(0.6));

  const pS = spr(lf, 66, 12, 220);
  const pSc = Math.min(1.05, pS);
  const pPulse = 1 + 0.03 * Math.sin(lf * 0.2);

  const crowdIn = over(lf, fr(0.85), fr(0.8), Easing.out(Easing.cubic));

  const agents = [GREEN, RED, GOLD, SLATE];
  const aGap = 152, aStart = cx - aGap * 1.5;

  const sealX = cx + 68, sealY = heroTop + heroBob + 104;

  // ---- drifting dust motes in the beams ----
  const motes = Array.from({ length: 20 }).map((_, i) => {
    const bx = 90 + seed(i * 3.1 + 4) * (W - 180);
    const by = (lf * (0.28 + seed(i * 1.3) * 0.5) + seed(i * 7.7) * H) % H;
    const dx = Math.sin(lf * 0.02 + i) * 15;
    const r = 0.8 + seed(i * 2.2 + 9) * 2.4;
    const op = (0.1 + seed(i * 4.4) * 0.2) * (0.55 + 0.45 * Math.sin(lf * 0.06 + i));
    return { x: bx + dx, y: by, r, op };
  });

  // ---- falling festive streamer ribbons ----
  const streamers = Array.from({ length: 15 }).map((_, i) => {
    const r1 = seed(i * 2.3 + 1), r2 = seed(i * 3.7 + 2);
    const x = 40 + r1 * (W - 80);
    const speed = 1.0 + r2 * 1.5;
    const y = ((lf * speed + r1 * H * 1.5) % (H + 200)) - 130;
    const sway = Math.sin(lf * 0.09 + i * 1.3) * 22;
    const c = [GOLD, RED, GREEN, SLATE, CREAM, AMBER][i % 6];
    const len = 60 + r2 * 95;
    const rot = Math.sin(lf * 0.11 + i * 1.7) * 26;
    const wd = 7 + r1 * 6;
    return { x, y, sway, c, len, rot, wd, op: 0.85 * bgIn };
  });

  // ---- rising tiered back-crowd silhouettes (depth behind front row) ----
  const backCrowd = Array.from({ length: 28 }).map((_, i) => {
    const r = seed(i * 2.9 + 3);
    const x = 16 + (i / 27) * (W - 32) + Math.sin(i * 1.7) * 5;
    const jump = Math.max(0, Math.sin(lf * 0.3 + i * 1.1)) * 9;
    const rr = 12 + r * 6;
    const y = H - 96 - jump - rr * 0.4;
    const c = lerpHex([GREEN, RED, GOLD, SLATE, CLAY, SKY][i % 6], INK, 0.52);
    return { x, y, rr, c };
  });

  // ---- garland string-light bulbs across the top (two swags) ----
  const garland = (ax: number, bx: number, cyd: number) =>
    Array.from({ length: 13 }).map((_, i) => {
      const t = i / 12;
      const mx = (ax + bx) / 2;
      const px = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * mx + t * t * bx;
      const py = (1 - t) * (1 - t) * 44 + 2 * (1 - t) * t * cyd + t * t * 44;
      const on = (Math.sin(lf * 0.3 + i * 0.9 + ax * 0.01) + 1) / 2;
      return { px, py, on };
    });
  const gL = garland(66, cx - 20, 108);
  const gR = garland(cx + 20, W - 66, 108);

  return (
    <div style={{
      position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H,
      borderRadius: 36, overflow: "hidden",
      background: "linear-gradient(180deg,#FFF8EC 0%,#FDEFD6 46%,#F4DFBC 100%)",
      boxShadow: "inset 0 2px 0 rgba(255,255,255,0.6), inset 0 0 190px rgba(120,80,30,0.16)",
    }}>
      {/* ============ shaken content group (all but the flash) ============ */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shX}px,${shY}px)` }}>

        {/* ---------- deep layered stage atmosphere (vector bg) ---------- */}
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, display: "block" }}>
          <defs>
            <radialGradient id="rc_dome" cx="50%" cy="6%" r="92%">
              <stop offset="0%" stopColor="#FFFEF8" stopOpacity="0.98" />
              <stop offset="42%" stopColor="#FFF1D6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F1D9AE" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rc_floor" cx="50%" cy="100%" r="78%">
              <stop offset="0%" stopColor="#E6C486" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E6C486" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rc_halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEE" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#FFE9BF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFE9BF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rc_ped" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EBCB94" />
              <stop offset="100%" stopColor="#B78A50" />
            </linearGradient>
            <radialGradient id="rc_haze" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#FFF6E0" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFF6E0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rc_jumbo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A1608" />
              <stop offset="100%" stopColor="#160B03" />
            </linearGradient>
            <linearGradient id="rc_heroray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF3D2" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFF3D2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rc_ban" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0685C" />
              <stop offset="100%" stopColor="#A6332B" />
            </linearGradient>
            <linearGradient id="rc_ban2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2CD72" />
              <stop offset="100%" stopColor="#B98A2C" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill="url(#rc_dome)" />
          <rect x="0" y={H - 320} width={W} height="320" fill="url(#rc_floor)" />

          {/* radiating award-stage burst behind the marquee (slow parallax spin) */}
          <g opacity={0.16 * bgIn} transform={`rotate(${rayRot} ${cx} 150)`}>
            {Array.from({ length: 30 }).map((_, i) => {
              const a = (i / 30) * Math.PI * 2;
              return (
                <line key={i}
                  x1={cx + Math.cos(a) * 50} y1={150 + Math.sin(a) * 50}
                  x2={cx + Math.cos(a) * 980} y2={150 + Math.sin(a) * 980}
                  stroke={i % 2 ? GOLD : AMBER} strokeWidth={i % 2 ? 12 : 4} />
              );
            })}
          </g>
          {/* counter-rotating fine ray layer for shimmer */}
          <g opacity={0.08 * bgIn} transform={`rotate(${-rayRot * 0.6} ${cx} 150)`}>
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2 + 0.13;
              return (
                <line key={i}
                  x1={cx + Math.cos(a) * 40} y1={150 + Math.sin(a) * 40}
                  x2={cx + Math.cos(a) * 900} y2={150 + Math.sin(a) * 900}
                  stroke={CREAM} strokeWidth={3} />
              );
            })}
          </g>

          {/* soft warm haze band */}
          <rect x="0" y="120" width={W} height="380" fill="url(#rc_haze)" opacity={0.55 * bgIn} />

          {/* ---- side arena banners (props, depth) ---- */}
          {[{ x: 26, c: "url(#rc_ban)" }, { x: W - 84, c: "url(#rc_ban2)" }].map((b, i) => {
            const sw = Math.sin(lf * 0.06 + i * 2) * 6;
            const bo = 0.8 * bgIn;
            return (
              <g key={i} opacity={bo} transform={`translate(${b.x} 40)`}>
                <path d={`M 0 0 L 58 0 L ${58 + sw} 210 L ${29 + sw} 236 L ${sw} 210 Z`} fill={b.c} stroke="#7A2A22" strokeWidth="2" />
                <rect x="-4" y="-8" width="66" height="12" rx="4" fill="#8A6A38" />
                {/* flame emboss on banner */}
                <path d={`M ${28 + sw * 0.5} 74 C ${40 + sw * 0.5} 92 ${44 + sw * 0.5} 108 ${34 + sw * 0.5} 124 C ${20 + sw * 0.5} 138 ${8 + sw * 0.5} 122 ${14 + sw * 0.5} 104 C ${16 + sw * 0.5} 92 ${24 + sw * 0.5} 88 ${28 + sw * 0.5} 74 Z`}
                  fill={CREAM} opacity="0.35" />
              </g>
            );
          })}

          {/* ---- jumbotron screen behind the marquee wordmark ---- */}
          <g opacity={0.9 * bgIn}>
            <rect x={cx - 322} y={26} width={644} height={170} rx={22} fill="url(#rc_jumbo)" stroke={GOLD} strokeWidth="4" />
            <rect x={cx - 322} y={26} width={644} height={170} rx={22} fill="none" stroke="#7A4D18" strokeWidth="1.5" />
            {/* jumbotron equalizer bars + starfield */}
            {Array.from({ length: 17 }).map((_, i) => {
              const bx = cx - 300 + i * 36;
              const hh = 16 + (Math.sin(lf * 0.3 + i * 0.7) * 0.5 + 0.5) * 44;
              return <rect key={i} x={bx} y={182 - hh} width={20} height={hh} rx={4} fill={i % 2 ? GOLD : AMBER} opacity={0.35} />;
            })}
            {Array.from({ length: 22 }).map((_, i) => {
              const sx = cx - 300 + seed(i * 5.1 + 2) * 600;
              const sy = 40 + seed(i * 2.7 + 4) * 120;
              const tw = (Math.sin(lf * 0.4 + i * 1.3) + 1) / 2;
              return <circle key={`s${i}`} cx={sx} cy={sy} r={1.5 + tw * 1.8} fill={CREAM} opacity={0.25 + tw * 0.4} />;
            })}
          </g>

          {/* ---- garland string lights (two swags) ---- */}
          <g opacity={0.92 * bgIn}>
            <path d={`M 66 44 Q ${cx - 20} 108 ${cx - 20} 108`} fill="none" stroke="#5A3E1C" strokeWidth="2.5" opacity="0.5" />
            <path d={`M ${cx + 20} 108 Q ${cx + 20} 108 ${W - 66} 44`} fill="none" stroke="#5A3E1C" strokeWidth="2.5" opacity="0.5" />
            {[...gL, ...gR].map((g, i) => (
              <circle key={i} cx={g.px} cy={g.py} r={5.5} fill={lerpHex("#7A5A2A", "#FFF1C4", g.on)} opacity={0.9} />
            ))}
          </g>

          {/* bright vertical hero god-ray column behind the pedestal */}
          {hS > 0.05 && (
            <path d={`M ${cx - 26} 20 L ${cx + 26} 20 L ${cx + 130} 520 L ${cx - 130} 520 Z`} fill="url(#rc_heroray)" opacity={Math.min(1, hS) * 0.8} />
          )}

          {/* bright rim halo behind the hero */}
          <circle cx={cx} cy={heroCY} r={158} fill="url(#rc_halo)" opacity={Math.min(1, hS * 1.2)} />

          {/* golden laurel wreath around the hero (trophy motif) */}
          {hS > 0.2 && (
            <g opacity={Math.min(1, (hS - 0.2) * 1.6)} transform={`translate(${cx} ${heroTop + heroBob + 130})`}>
              {[-1, 1].map((side) => (
                <g key={side} transform={`scale(${side} 1)`}>
                  <path d="M -128 8 Q -150 -70 -96 -128" fill="none" stroke={GOLD} strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                  {Array.from({ length: 6 }).map((_, k) => {
                    const t = k / 5;
                    const lx = lerp(-128, -96, t) - 14 * Math.sin(t * 2);
                    const ly = lerp(8, -128, t);
                    return <ellipse key={k} cx={lx} cy={ly} rx={13} ry={6} fill={lerpHex(GOLD, CREAM, 0.25)} transform={`rotate(${-40 - t * 40} ${lx} ${ly})`} opacity="0.9" />;
                  })}
                </g>
              ))}
            </g>
          )}

          {/* winner's pedestal */}
          {hS > 0.05 && (
            <g opacity={Math.min(1, hS * 1.3)}>
              <ellipse cx={cx} cy={560} rx={156} ry={30} fill="#7A5320" opacity="0.16" />
              <path d={`M ${cx - 118} 500 L ${cx + 118} 500 L ${cx + 152} 562 L ${cx - 152} 562 Z`} fill="url(#rc_ped)" />
              <rect x={cx - 154} y={556} width={308} height={14} rx={5} fill="#9A733F" />
              {/* gold winner band on pedestal front */}
              <rect x={cx - 92} y={514} width={184} height={30} rx={6} fill="url(#rc_ban2)" opacity="0.9" />
              <rect x={cx - 92} y={514} width={184} height={9} rx={4} fill={CREAM} opacity="0.22" />
              <ellipse cx={cx} cy={500} rx={118} ry={24} fill="#D8B47A" />
              <ellipse cx={cx} cy={497} rx={118} ry={22} fill="#EBCB94" />
              <ellipse cx={cx} cy={497} rx={118} ry={22} fill="#FFFFFF" opacity="0.14" />
            </g>
          )}

          {/* ---- lit podiums under each agent ---- */}
          {agents.map((t, i) => {
            const s = spr(lf, 22 + i * 5, 12, 220);
            if (s <= 0.02) return null;
            const ax = aStart + i * aGap;
            const op = Math.min(1, s * 1.3) * bgIn;
            return (
              <g key={i} opacity={op}>
                <ellipse cx={ax} cy={378} rx={70} ry={16} fill="#7A5320" opacity="0.16" />
                <path d={`M ${ax - 52} 306 L ${ax + 52} 306 L ${ax + 64} 372 L ${ax - 64} 372 Z`} fill="url(#rc_ped)" />
                <rect x={ax - 66} y={368} width={132} height={9} rx={4} fill="#9A733F" />
                <rect x={ax - 40} y={320} width={80} height={40} rx={7} fill={t} opacity="0.18" />
                <rect x={ax - 40} y={320} width={80} height={8} rx={4} fill={t} opacity="0.4" />
                <ellipse cx={ax} cy={306} rx={52} ry={11} fill="#EBCB94" />
                <ellipse cx={ax} cy={304} rx={52} ry={10} fill="#FFFFFF" opacity="0.16" />
              </g>
            );
          })}

          {/* drifting dust motes in the beams */}
          {motes.map((m, i) => (
            <circle key={i} cx={m.x} cy={m.y} r={m.r} fill={lerpHex(AMBER, CREAM, 0.6)} opacity={m.op} />
          ))}

          {/* tiered stands + rising back-crowd silhouettes (depth) */}
          {crowdIn > 0 && (
            <g opacity={crowdIn}>
              <path d={`M 0 ${H - 120} Q ${cx} ${H - 156} ${W} ${H - 120} L ${W} ${H - 70} L 0 ${H - 70} Z`} fill="#3A2818" opacity="0.4" />
              {backCrowd.map((b, i) => (
                <g key={i}>
                  <circle cx={b.x} cy={b.y} r={b.rr} fill={b.c} />
                  <path d={`M ${b.x - b.rr * 1.2} ${b.y + b.rr * 1.4} Q ${b.x} ${b.y + b.rr * 0.2} ${b.x + b.rr * 1.2} ${b.y + b.rr * 1.4} Z`} fill={b.c} />
                </g>
              ))}
            </g>
          )}
        </svg>

        {/* ---------- rafter spotlight cones (HTML, sway forever) ---------- */}
        <div style={{ opacity: 0.85 * bgIn }}>
          <SpotCone x={cx - 210} top={-40} topW={44} botW={380} h={560} color="rgba(255,231,191,0.5)" sway={0.55} lf={lf} />
          <SpotCone x={cx + 210} top={-40} topW={44} botW={380} h={560} color="rgba(255,224,192,0.5)" sway={-0.55} lf={lf + 40} />
          <SpotCone x={cx} top={-40} topW={30} botW={300} h={600} color="rgba(255,243,214,0.55)" sway={0.25} lf={lf + 20} />
        </div>

        {/* ---------- two roaming coloured sweep spotlights ---------- */}
        <div style={{ opacity: 0.7 * bgIn }}>
          <SpotCone x={130 + sweepA * (W - 260)} top={-30} topW={26} botW={230} h={640} color="rgba(240,120,110,0.28)" sway={0.2} lf={lf} pool={0.1} />
          <SpotCone x={130 + (1 - sweepB) * (W - 260)} top={-30} topW={26} botW={230} h={640} color="rgba(120,190,150,0.24)" sway={-0.2} lf={lf + 30} pool={0.1} />
        </div>

        {/* ---------- 4-agent council row on podiums (colored, dot labels) ---------- */}
        {agents.map((t, i) => {
          const s = spr(lf, 22 + i * 5, 12, 220);
          if (s <= 0.01) return null;
          const sc = Math.min(1.08, s);
          const ax = aStart + i * aGap;
          const by = bob(lf, 5, 42, i * 1.3);
          return (
            <div key={i}>
              <div style={{ position: "absolute", left: ax, top: 214 + by, width: 0, height: 0, opacity: Math.min(1, s * 1.3), transform: `scale(${sc})`, transformOrigin: "50% 100%" }}>
                <div style={{ position: "absolute", left: -50, top: 82, width: 100, height: 24, borderRadius: "50%", background: t, opacity: 0.22, filter: "blur(3px)" }} />
                <div style={{ position: "absolute", left: -47, top: -6 }}>
                  <Mascot lf={lf + i * 9} size={94} tint={t} cheer={1} nodAmp={6} nodSpeed={1.2} gaze={0} />
                </div>
                <div style={{ position: "absolute", left: -8, top: 94, width: 16, height: 16, borderRadius: "50%", background: t, border: "2.5px solid #fff", boxShadow: `0 0 10px ${t}` }} />
              </div>
              {/* small sparkle pop as each agent lands on its podium */}
              <Sparkles lf={lf} at={(22 + i * 5) / 30} x={ax} y={252 + by} n={7} spread={90} colors={[t, GOLD, CREAM]} dur={fr(0.9)} />
            </div>
          );
        })}

        {/* ---------- hero clay Claude on pedestal ---------- */}
        {hS > 0.02 && (
          <div style={{ position: "absolute", left: cx, top: heroTop + heroBob, width: 0, height: 0, opacity: Math.min(1, hS * 1.3), transform: `scale(${hSc})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: -90, top: 0 }}>
              <Mascot lf={lf} size={180} tint={CLAY} cheer={1} gaze={0} nodAmp={5} nodSpeed={1} />
            </div>
          </div>
        )}

        {/* ---------- red wax VERDICT seal slams onto the chest ---------- */}
        {kS > 0.01 && (() => {
          return (
            <div style={{ position: "absolute", left: sealX, top: sealY, width: 0, height: 0, transform: `scale(${kSc}) rotate(-13deg)` }}>
              <svg viewBox="-70 -70 140 140" width={140} height={140} style={{ position: "absolute", left: -70, top: -70, overflow: "visible" }}>
                <defs>
                  <linearGradient id="rc_seal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F0685C" />
                    <stop offset="55%" stopColor={RED} />
                    <stop offset="100%" stopColor="#A6332B" />
                  </linearGradient>
                  <radialGradient id="rc_sealHi" cx="38%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* expanding impact shock rings */}
                {ring2P > 0 && ring2P < 1 && (
                  <circle r={40 + ring2P * 96} fill="none" stroke="#FFC9C0" strokeWidth={4 * (1 - ring2P) + 1} opacity={(1 - ring2P) * 0.6} />
                )}
                {ringP > 0 && ringP < 1 && (
                  <circle r={40 + ringP * 66} fill="none" stroke={RED} strokeWidth={5 * (1 - ringP) + 1} opacity={(1 - ringP) * 0.85} />
                )}
                {/* scalloped wax edge */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const a = (i / 20) * Math.PI * 2;
                  return <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 46} r={7} fill="url(#rc_seal)" stroke="#8E2C24" strokeWidth="1.5" />;
                })}
                <circle r={46} fill="url(#rc_seal)" stroke="#8E2C24" strokeWidth="3" />
                <circle r={37} fill="none" stroke="#FFC9C0" strokeWidth="1.5" opacity="0.7" />
                <circle r={46} fill="url(#rc_sealHi)" />
                {/* embossed flame glyph (drawn, no text) */}
                <path d="M 0 -22 C 12 -8 16 4 8 16 C 14 12 18 2 14 -6 C 20 2 22 14 10 24 C -2 32 -18 24 -18 8 C -18 -2 -10 -10 -6 -18 C -6 -8 0 -6 2 -12 C 4 -16 2 -20 0 -22 Z"
                  fill="#FFDAD3" opacity="0.95" />
              </svg>
            </div>
          );
        })()}

        {/* localized impact flare on the seal slam (never full-screen) */}
        {sImp > 0.02 && (
          <div style={{ position: "absolute", left: sealX, top: sealY, width: 0, height: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: -120, top: -120, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,240,220,0.9),rgba(240,150,120,0.4) 35%,transparent 68%)", opacity: sImp * 0.85 }} />
            <div style={{ position: "absolute", left: -190, top: -5, width: 380, height: 10, background: "linear-gradient(90deg,transparent,rgba(255,240,220,0.85),transparent)", opacity: sImp * 0.9, filter: "blur(1px)" }} />
            <div style={{ position: "absolute", left: -5, top: -150, width: 10, height: 300, background: "linear-gradient(180deg,transparent,rgba(255,240,220,0.7),transparent)", opacity: sImp * 0.7, filter: "blur(1px)" }} />
          </div>
        )}

        {/* sparkle burst off the seal on impact */}
        {lf > fr(slam / 30) && (
          <Sparkles lf={lf - fr(slam / 30)} at={0.0} x={sealX} y={sealY} n={14} spread={130} colors={[GOLD, RED, CREAM]} dur={fr(1.3)} />
        )}

        {/* ---------- ROAST marquee wordmark (top hero, on top) ---------- */}
        <div style={{ position: "absolute", left: cx, top: 106, transform: `translate(-50%,-50%) translateY(${wDrop}px) scale(${wSc})`, opacity: Math.min(1, wS * 1.4) }}>
          <div style={{ position: "relative", width: 520, height: 118, borderRadius: 26, background: "linear-gradient(180deg,#33200F,#241207)", border: `5px solid ${GOLD}`, boxShadow: `0 16px 34px -10px rgba(60,30,8,0.55), 0 0 ${22 + 14 * Math.abs(Math.sin(lf * 0.18))}px rgba(231,178,76,0.55)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* twinkling marquee bulbs, top + bottom edges */}
            {Array.from({ length: 30 }).map((_, i) => {
              const top = i < 15;
              const j = top ? i : i - 15;
              const on = (Math.sin(lf * 0.32 + i * 0.8) + 1) / 2;
              return <div key={i} style={{ position: "absolute", left: 22 + j * 33.8, top: top ? 9 : 99, width: 9, height: 9, borderRadius: "50%", background: lerpHex("#7A5A2A", "#FFF1C4", on), boxShadow: on > 0.7 ? "0 0 7px #FFE9AE" : "none" }} />;
            })}
            <span style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: 82, letterSpacing: 7, color: GOLD, textShadow: "0 2px 0 #7A4D18, 0 0 20px rgba(240,180,70,0.7)", WebkitTextStroke: "1.5px #7A4D18" }}>ROAST</span>
          </div>
        </div>

        {/* ---------- 'comment ROAST' CTA pill (only other text) ---------- */}
        {pS > 0.01 && (
          <div style={{ position: "absolute", left: cx, top: 636, transform: `translate(-50%,-50%) scale(${pSc * pPulse})`, opacity: Math.min(1, pS * 1.3) }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, padding: "15px 34px", borderRadius: 40, background: "linear-gradient(180deg,#33200F,#241207)", border: `3px solid ${GOLD}`, boxShadow: "0 8px 22px -8px rgba(60,30,8,0.5), 0 0 20px rgba(231,178,76,0.35)" }}>
              {/* speech-bubble comment glyph (drawn) */}
              <svg viewBox="0 0 48 44" width={40} height={37} style={{ display: "block" }}>
                <rect x="2" y="2" width="44" height="30" rx="9" fill={GOLD} />
                <path d="M 16 30 L 22 42 L 30 30 Z" fill={GOLD} />
                <circle cx="14" cy="16" r="3" fill="#241207" />
                <circle cx="24" cy="16" r="3" fill="#241207" />
                <circle cx="34" cy="16" r="3" fill="#241207" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 27, letterSpacing: 1, color: CREAM }}>comment</span>
              <span style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: 32, letterSpacing: 2, color: GOLD, textShadow: "0 0 12px rgba(231,178,76,0.6)" }}>ROAST</span>
            </div>
          </div>
        )}

        {/* ---------- cheering mascot crowd along the base (denser) ---------- */}
        {crowdIn > 0 && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 138, opacity: crowdIn }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: "linear-gradient(180deg,rgba(58,40,26,0.5),rgba(40,26,16,0.82))" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 96, height: 5, background: GOLD, opacity: 0.45 }} />
            {Array.from({ length: 15 }).map((_, i) => {
              const t = [GREEN, RED, GOLD, SLATE, CLAY][i % 5];
              const jx = (i / 14) * (W - 40) + 20;
              const jump = Math.max(0, Math.sin(lf * 0.35 + i * 1.3)) * 15;
              return (
                <div key={i} style={{ position: "absolute", left: jx - 30, bottom: 22 + jump }}>
                  <Mascot lf={lf + i * 13} size={62} tint={t} cheer={1} nodAmp={7} nodSpeed={1.5} gaze={0} />
                </div>
              );
            })}
          </div>
        )}

        {/* ---------- falling festive streamers ---------- */}
        {streamers.map((s, i) => (
          <div key={i} style={{ position: "absolute", left: s.x + s.sway, top: s.y, width: s.wd, height: s.len, borderRadius: s.wd, background: `linear-gradient(180deg, ${s.c}, ${lerpHex(s.c, INK, 0.4)})`, transform: `rotate(${s.rot}deg)`, opacity: s.op, boxShadow: `0 0 6px ${s.c}55`, pointerEvents: "none" }} />
        ))}

        {/* ---------- confetti, sparkle mist, embers, roaming light ---------- */}
        <Confetti lf={lf} n={80} colors={[GOLD, RED, GREEN, SLATE, CREAM, AMBER]} top={0} h={H} />
        <Sparkles lf={lf} at={0.3} x={cx} y={116} n={9} spread={340} colors={[GOLD, CREAM]} dur={fr(2)} />
        <Sparkles lf={lf} at={1.4} x={cx} y={heroCY} n={8} spread={220} colors={[GOLD, CREAM, CLAY]} dur={fr(1.6)} />
        <Embers lf={lf} n={18} base={H - 26} />
        <div style={{ position: "absolute", left: 40 + sweepA * (W - 200), bottom: 100, width: 150, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,243,208,0.28),transparent 70%)", filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 40 + (1 - sweepB) * (W - 200), bottom: 100, width: 130, height: 36, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,225,210,0.22),transparent 70%)", filter: "blur(6px)", pointerEvents: "none" }} />

        <Vignette strength={0.5} shape="70% 64% at 50% 40%" />
        <Grain op={0.05} />
      </div>

      {/* white bloom on open (pattern-interrupt reveal) */}
      {flash > 0.01 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFF6E8", opacity: flash * 0.45, pointerEvents: "none" }} />
      )}
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
  <>THE CLAUDE COUNCIL<br />THAT <span style={{ color: CLAY }}>ROASTS</span> YOUR IDEA</>,
  <>HERE'S HOW TO<br /><span style={{ color: CLAY }}>SET IT UP</span></>,
  <>THE <span style={{ color: CLAY }}>BELIEVER</span></>,
  <>THE <span style={{ color: CLAY }}>SKEPTIC</span></>,
  <>THE <span style={{ color: CLAY }}>INVESTOR</span></>,
  <>THE <span style={{ color: CLAY }}>VERDICT</span></>,
  <>THE <span style={{ color: CLAY }}>PROOF</span></>,
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
const RoastReelBody: React.FC = () => {
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
      <Audio src={staticFile("vo_roast.wav")} />
      <Audio loop src={staticFile("roast_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CUT) - 20, fr(CUT)], [0.26, 0.26, 0.26, 0.12], { extrapolateRight: "clamp" })} />
      {/* ===== SFX PASS (dense, beat-keyed) ===== */}
      {/* HOOK: quick riser into the ROAST-STAMP SLAM (impact ~f6=0.2s), then 4 critics burst in */}
      <Sfx at={0.0} src="lib_riser.wav" v={0.52} dur={0.24} />
      <Sfx at={0.19} src="lib_boom.wav" v={0.8} dur={0.85} />
      <Sfx at={0.2} src="impact.wav" v={0.68} dur={0.5} />
      <Sfx at={0.21} src="sub.wav" v={0.52} dur={1.5} />
      {[0.62, 0.95, 1.28, 1.6].map((d, i) => <React.Fragment key={`hk${i}`}><Sfx at={d} src="lib_whoosh_fast.wav" v={0.43} dur={0.35} /><Sfx at={d + 0.06} src="thock.wav" v={0.61} dur={0.35} /></React.Fragment>)}
      {[0.98, 1.34, 1.66, 1.98].map((d, i) => <Sfx key={`st${i}`} at={d} src="snap.wav" v={0.61} dur={0.3} />)}
      <Sfx at={3.85} src="screech.wav" v={0.35} dur={0.5} />
      <Sfx at={3.9} src="crash.wav" v={0.43} dur={0.5} />
      {/* per-scene cut riser + whoosh in */}
      {[L[1], L[2], L[3], L[4], L[5], L[6], L[7]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}>
          <Sfx at={tt - 1.1} src={i % 2 === 0 ? "lib_riser.wav" : "metal_riser.wav"} v={0.43} dur={1.1} />
          <Sfx at={tt} src={["swooshup.wav", "lib_boom.wav", "lib_pop.wav", "sub.wav", "swish.wav", "lib_boom.wav", "lib_magic_reveal.wav"][i]} v={0.52} dur={0.55} />
        </React.Fragment>
      ))}
      <Sfx at={L[1] + 0.9} src="cinematic-hit.mp3" v={0.58} dur={0.8} />
      {[0.35, 0.6, 0.85, 1.1].map((d, i) => <Sfx key={`as${i}`} at={L[1] + d} src="impact.wav" v={0.43} dur={0.35} />)}
      <Sfx at={L[1] + 2.3} src="crash.wav" v={0.41} dur={0.5} />
      <Sfx at={L[2] + 0.25} src="swooshup.wav" v={0.49} dur={0.45} />
      <Sfx at={L[2] + 0.4} src="crowd_cheer.wav" v={0.35} dur={2.0} />
      {[0.7, 1.2, 1.7].map((d, i) => <Sfx key={`hy${i}`} at={L[2] + d} src={["blip3.wav", "blip4.wav", "chimehi.wav"][i]} v={0.43} dur={0.4} />)}
      <Sfx at={L[2] + 2.4} src="ding.wav" v={0.46} dur={0.5} />
      <Sfx at={L[3] + 0.2} src="lib_whoosh.wav" v={0.43} dur={0.5} />
      {[0.8, 1.5, 2.2].map((d, i) => <React.Fragment key={`sk${i}`}><Sfx at={L[3] + d} src="snap.wav" v={0.61} dur={0.3} /><Sfx at={L[3] + d + 0.02} src="thock.wav" v={0.41} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[3] + 3.0} src="bonk.mp3" v={0.49} dur={0.5} />
      <Sfx at={L[4] + 0.4} src="cash-register.mp3" v={0.46} dur={1.0} />
      {[0.7, 1.0, 1.3].map((d, i) => <Sfx key={`co${i}`} at={L[4] + d} src="c_coin.wav" v={0.43} dur={0.3} />)}
      <Sfx at={L[4] + 2.0} src="zucc.wav" v={0.41} dur={0.5} />
      <Sfx at={L[5] + 2.3} src="lib_boom.wav" v={0.8} dur={0.9} />
      <Sfx at={L[5] + 2.32} src="impact.wav" v={0.64} dur={0.5} />
      <Sfx at={L[5] + 2.4} src="cinematic-hit.mp3" v={0.43} dur={0.7} />
      <Sfx at={L[5] + 2.55} src="shimmer.wav" v={0.46} dur={0.8} />
      <Sfx at={L[5] + 4.3} src="swooshup.wav" v={0.43} dur={0.4} />
      <Sfx at={L[5] + 4.4} src="key.wav" v={0.46} dur={0.4} />
      <Sfx at={L[5] + 4.5} src="lib_confirm.wav" v={0.43} dur={0.5} />
      <Sfx at={L[5] + 5.4} src="lib_notif.wav" v={0.41} dur={0.4} />
      <Sfx at={L[5] + 5.5} src="chimehi.wav" v={0.38} dur={0.6} />
      {[0.3, 0.6, 0.9].map((d, i) => <Sfx key={`srx${i}`} at={L[6] + d} src="tick.wav" v={0.38} dur={0.3} />)}
      <Sfx at={L[6] + 1.3} src="screech.wav" v={0.41} dur={0.5} />
      <Sfx at={L[6] + 1.32} src="lib_boom.wav" v={0.46} dur={0.6} />
      <Sfx at={L[6] + 2.8} src="resolve.wav" v={0.49} dur={0.9} />
      <Sfx at={L[7] + 0.1} src="lib_magic_reveal.wav" v={0.61} dur={0.9} />
      <Sfx at={L[7] + 0.2} src="sparkle.wav" v={0.49} dur={0.9} />
      <Sfx at={L[7] + 0.3} src="chimehi.wav" v={0.52} dur={0.8} />
      <Sfx at={L[7] + 0.35} src="crowd_cheer.wav" v={0.38} dur={1.8} />
      {[0.45, 0.57, 0.69].map((d, i) => <Sfx key={`cp${i}`} at={L[7] + d} src="lib_pop.wav" v={0.35} dur={0.3} />)}
      <Sfx at={L[7] + 1.3} src="resolve.wav" v={0.58} dur={1.1} />

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
        {scene(7) ? <RoastCTA lf={frame - Lf[7]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};

export const ClaudeRoastReel: React.FC = () => <RoastReelBody />;
