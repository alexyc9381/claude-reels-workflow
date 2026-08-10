import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_purge.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
const L = [0.0, 4.53, 9.15, 15.41, 23.39, 31.73, 35.93];
const Lf = L.map(fr);
const CUT = 38.43;

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

// ============================== SCENE 0 — THE GAUNTLET (Thanos-snap cold open) ==============================
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const stopAt = fr(0.85);
  const stopDrop = Math.min(1, spr(lf, stopAt, 13, 340));                                 // slams DOWN from above
  const stopY = interpolate(stopDrop, [0, 1], [-320, 156]);                                // lands above the hero's head, never covering him
  const landed = lf >= stopAt && stopDrop > 0.55;
  const stopGone = over(lf, fr(2.05), fr(0.26), Easing.in(Easing.back(2)));                // whips back up and out
  const stopHit = lf >= stopAt ? Math.max(0, 1 - (lf - stopAt) / 7) : 0;                   // red-flash freeze
  const impact = landed ? Math.max(0, 1 - (lf - stopAt - 4) / 12) : 0;                     // dust + impact lines
  const shake = lf >= stopAt && lf < stopAt + 12 ? Math.sin(lf * 3.6) * 9 * (1 - (lf - stopAt) / 12) : 0;
  const gemAt = [fr(2.9), fr(3.2), fr(3.5), fr(3.8), fr(4.1)];  // each stone locks into the glove (clink)
  const gems = gemAt.filter((a) => lf >= a).length;
  const snapAt = fr(4.55);
  const snap = over(lf, snapAt, fr(0.5), Easing.out(Easing.back(1.5)));
  const purple = Math.min(1, Math.max(0, (lf - (snapAt - 4)) / 10));                        // clay -> Thanos purple, latched by the snap
  const heroTint = lerpHex("#D97757", THANOS, purple);
  const tenXS = Math.min(1.12, spr(lf, snapAt + 3, 10, 210));
  const seam = Math.min(1, 0.25 + snap * 0.75 + Math.sin(lf / 9) * 0.08);                   // vault seam glow
  const crowd = [[104, 74, 0], [222, 62, 3], [758, 66, 6], [880, 80, 2]];
  const cx = 506;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
        {/* ==== rich vault backdrop ==== */}
        {/* the great vault door behind the hero */}
        <div style={{ position: "absolute", left: cx - 280, top: 150, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle at 42% 36%, #2C303C, #12141C 72%)", border: "12px solid #191D26", boxShadow: "inset 0 0 80px rgba(0,0,0,0.65), 0 0 50px rgba(0,0,0,0.5)", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: 42, borderRadius: "50%", border: "7px solid #232833" }} />
          <div style={{ position: "absolute", inset: 92, borderRadius: "50%", border: "4px solid #1E222C" }} />
          {Array.from({ length: 18 }).map((_, i) => { const a = (i / 18) * Math.PI * 2; return <div key={i} style={{ position: "absolute", left: 280 + Math.cos(a) * 246 - 7, top: 280 + Math.sin(a) * 246 - 7, width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #4A5060, #20242E)", boxShadow: "0 1px 2px rgba(0,0,0,0.6)" }} />; })}
          {/* central spoked handle, slowly turning */}
          <div style={{ position: "absolute", left: 280, top: 280, width: 0, height: 0, transform: `rotate(${lf * 0.6}deg)` }}>
            {[0, 45, 90, 135].map((r) => <div key={r} style={{ position: "absolute", left: -66, top: -6, width: 132, height: 12, borderRadius: 6, background: "linear-gradient(90deg,#3A4050,#20242E,#3A4050)", transform: `rotate(${r}deg)` }} />)}
            <div style={{ position: "absolute", left: -26, top: -26, width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #4A5060, #191D26)", border: "3px solid #12141C" }} />
          </div>
          {/* glowing seam splitting the door, flares on the snap */}
          <div style={{ position: "absolute", left: 274, top: 20, width: 12, height: 520, background: `linear-gradient(180deg, transparent, rgba(${purple > 0.3 ? "200,150,255" : "231,178,76"},${seam}), transparent)`, filter: `blur(${2 + seam * 3}px)`, opacity: 0.4 + seam * 0.5 }} />
        </div>
        {/* two fluted pillars flanking the vault */}
        {[54, 902].map((px, pi) => (
          <div key={pi} style={{ position: "absolute", left: px, top: 96, width: 124, height: 560, zIndex: 2 }}>
            <div style={{ position: "absolute", left: 8, right: 8, top: 22, bottom: 22, background: "linear-gradient(90deg,#1A1E28,#2A303E 50%,#161A22)", borderRadius: 6 }}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 14 + k * 24, top: 0, bottom: 0, width: 4, background: "rgba(0,0,0,0.35)" }} />)}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "linear-gradient(180deg,#C9932A,#8A6420)", borderRadius: "6px 6px 2px 2px", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: "linear-gradient(180deg,#8A6420,#C9932A)", borderRadius: "2px 2px 6px 6px" }} />
          </div>
        ))}
        {/* atmospheric haze */}
        <div style={{ position: "absolute", left: cx - 300, top: 120, width: 600, height: 360, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${purple > 0.3 ? "150,90,210" : "231,178,76"},0.10), transparent 66%)`, zIndex: 2 }} />
        {/* floor + treasure glow */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 190, background: "linear-gradient(180deg,#100C14,#070510)", clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)", zIndex: 3 }} />
        <div style={{ position: "absolute", left: cx, bottom: 18, width: 420, height: 96, marginLeft: -210, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${purple > 0.3 ? "168,110,220" : "231,178,76"},${0.2 + snap * 0.24}), transparent 70%)`, zIndex: 3 }} />
        {/* counter-rotating power rays on the snap */}
        {snap > 0.02 && Array.from({ length: 18 }).map((_, i) => { const c = purple > 0.3 ? "216,168,255" : "231,178,76"; return <div key={`r${i}`} style={{ position: "absolute", left: cx, top: 470, width: 1400, height: 11, marginLeft: -700, marginTop: -5, background: `linear-gradient(90deg, transparent 43%, rgba(${c},0.24) 50%, transparent 57%)`, transformOrigin: "50% 50%", transform: `rotate(${i * 20 + lf * 0.7}deg)`, opacity: snap, zIndex: 3 }} />; })}
        <SpotCone x={cx} top={40} topW={90} botW={430} h={560} color={`rgba(${purple > 0.4 ? "200,160,240" : "255,236,190"},0.15)`} sway={4} lf={lf} />
        <SpotCone x={190} top={40} topW={40} botW={200} h={420} color="rgba(210,140,90,0.10)" />
        <SpotCone x={830} top={40} topW={40} botW={200} h={420} color="rgba(210,140,90,0.10)" />
        {Array.from({ length: 12 }).map((_, i) => { const y = 130 + ((lf * 0.6 + seed(i) * 420) % 420); return <div key={`mo${i}`} style={{ position: "absolute", left: 180 + seed(i * 2) * 640, top: y, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,246,220,0.35)", zIndex: 3 }} />; })}
        {Array.from({ length: 30 }).map((_, i) => { const [x, y] = rectPt(i / 30, 964, 732); const lit = (i + Math.floor(lf / 1.6)) % 30 < 5; return <div key={`mb${i}`} style={{ position: "absolute", left: 24 + x, top: 30 + y, width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: lit ? "#FFE9B0" : "rgba(231,178,76,0.24)", boxShadow: lit ? "0 0 9px #FFE9B0" : "none", zIndex: 3 }} />; })}
        {/* the Claude Code laptop, spilling junk skills; flashes red under the STOP */}
        {snap < 0.1 && <div style={{ position: "absolute", left: 92, bottom: 150, width: 168, transform: `rotate(-6deg)`, zIndex: 6 }}><Laptop s={168} lf={lf} alarm={landed && stopGone < 0.6 ? 1 : 0} /></div>}
        {/* junk skill-cards spilling out (kept to the margins), DISINTEGRATED to ash by the snap */}
        {Array.from({ length: 16 }).map((_, i) => { const t = ((lf / fr(2.6) + seed(i)) % 1); const side = i % 2 ? 1 : -1; const jx = cx + side * (260 + seed(i * 3) * 210); const jy = 150 + t * 380; if (snap > 0.02) { const dp = Math.min(1, (snap - 0.02) * 1.2 + seed(i) * 0.3); if (dp >= 1) return null; return (<React.Fragment key={`j${i}`}>{Array.from({ length: 5 }).map((_, k) => <div key={k} style={{ position: "absolute", left: jx + (k - 2) * 9 + dp * (seed(i * 5 + k) - 0.3) * 90, top: jy - dp * (40 + seed(i + k) * 90), width: 5, height: 5, background: "#4A4456", opacity: (1 - dp) * 0.9, borderRadius: 1, zIndex: 4 }} />)}</React.Fragment>); }
          return <div key={`j${i}`} style={{ position: "absolute", left: jx, top: jy, width: 44, height: 30, borderRadius: 5, background: "#2A2A34", border: "2px solid #3E3E4C", opacity: 1 - t * 0.6, transform: `rotate(${t * 220}deg)`, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 11, color: "#5A5A6C" }}>skill</div>; })}
        {/* bold shockwave rings on snap + radial speed lines */}
        {snap > 0.02 && <div style={{ position: "absolute", left: cx - 340 * snap, top: 470 - 340 * snap, width: 680 * snap, height: 680 * snap, borderRadius: "50%", border: `${14 * (1 - snap)}px solid rgba(216,168,255,${0.9 * (1 - snap)})`, boxShadow: `0 0 ${40 * (1 - snap)}px rgba(168,85,247,${0.6 * (1 - snap)})`, zIndex: 8 }} />}
        {snap > 0.16 && <div style={{ position: "absolute", left: cx - 240 * (snap - 0.16), top: 470 - 240 * (snap - 0.16), width: 480 * (snap - 0.16), height: 480 * (snap - 0.16), borderRadius: "50%", border: `${9 * (1 - snap)}px solid rgba(231,178,76,${0.8 * (1 - snap)})`, zIndex: 8 }} />}
        {snap > 0.05 && snap < 0.85 && Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2; const r = 60 + snap * 300; return <div key={`sl${i}`} style={{ position: "absolute", left: cx + Math.cos(a) * r, top: 470 + Math.sin(a) * r, width: 46, height: 5, marginLeft: -23, background: `linear-gradient(90deg, transparent, rgba(255,246,220,${0.8 * (1 - snap)}))`, transform: `rotate(${(a * 180) / Math.PI}deg)`, zIndex: 8 }} />; })}
        {/* powered-up violet aura behind the hero */}
        {purple > 0.1 && <div style={{ position: "absolute", left: cx - 190, bottom: 120, width: 380, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,90,210,0.4), transparent 66%)", zIndex: 4, transform: `scale(${1 + Math.sin(lf / 5) * 0.06})` }} />}
        {/* ground bounce-glow separating the hero from the dark floor once powered */}
        {purple > 0.15 && <div style={{ position: "absolute", left: cx - 170, bottom: 96, width: 340, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(168,85,247,0.5), transparent 70%)", zIndex: 5 }} />}
        {/* the hero critter + gauntlet held aloft on a raised fist */}
        <div style={{ position: "absolute", left: cx, bottom: 118, width: 8, transform: "translateX(-50%)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: -140, bottom: 0, width: 280, transform: `scale(${1 + snap * 0.12})`, transformOrigin: "50% 100%", filter: purple > 0.3 ? `drop-shadow(0 0 26px rgba(168,85,247,0.85))` : "none" }}>
            <Mascot lf={lf} size={280} nodAmp={3.2} nodSpeed={7} tint={heroTint} stern={purple > 0.3 ? 0.6 : 0} shock={lf >= stopAt && lf < fr(2.4) ? 0.5 : 0} cheer={snap > 0.2 ? 0.7 + Math.max(0, Math.sin(lf / 6)) * 0.3 : 0} />
            {gems > 0 && <div style={{ position: "absolute", right: -104 + snap * 16, top: 30 - snap * 70, transform: `rotate(${-8 - snap * 12}deg) scale(${1 + snap * 0.4})`, zIndex: 8 }}>
              <Gauntlet s={168} gems={gems} snap={snap} lf={lf} />
              {snap > 0.08 && snap < 0.96 && <>
                {[0, 30, 60, 90, 120, 150].map((a) => <div key={a} style={{ position: "absolute", left: 74, top: 22, width: 170 * (1 - snap) + 34, height: 9, marginLeft: -((170 * (1 - snap) + 34) / 2), background: "linear-gradient(90deg, transparent, #FFF6DC, transparent)", transform: `rotate(${a}deg)`, opacity: 1 - snap * 0.5 }} />)}
                <div style={{ position: "absolute", left: 48, top: -6, width: 58, height: 58, borderRadius: "50%", background: "radial-gradient(circle, #FFF6DC, rgba(255,246,220,0) 70%)", opacity: 1 - snap * 0.5 }} />
              </>}
              {/* purple energy tendrils crackling off the fist */}
              {purple > 0.2 && Array.from({ length: 6 }).map((_, k) => { const a = (k / 6) * Math.PI * 2 + lf / 8; return <div key={`t${k}`} style={{ position: "absolute", left: 74 + Math.cos(a) * 34, top: 34 + Math.sin(a) * 34, width: 4, height: 24 + Math.sin(lf / 3 + k) * 9, background: "linear-gradient(180deg, #D8A8FF, transparent)", transform: `rotate(${(a * 180) / Math.PI}deg)`, opacity: 0.85, borderRadius: 2 }} />; })}
            </div>}
          </div>
        </div>
        {/* the 5 infinity stones line up above the hero, then slide one-by-one into the glove */}
        {gemAt.map((at, i) => {
          const appear = over(lf, fr(2.0) + i * 3, fr(0.34), Easing.out(Easing.back(2)));
          if (appear <= 0.01) return null;
          const slide = interpolate(lf, [at - fr(0.3), at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          if (slide >= 1) return null;                                  // now locked in the glove
          const hx = cx + (i - 2) * 84, hy = 198;                       // home slot in the row
          const gx = cx + 120, gy = 502;                                // the glove socket
          const px = interpolate(slide, [0, 1], [hx, gx]);
          const py = interpolate(slide, [0, 1], [hy + bob(lf, 5, 46, i * 0.3) * (1 - slide), gy]);
          return (
            <div key={`g${i}`} style={{ position: "absolute", left: px, top: py, transform: `translate(-50%,-50%) scale(${(0.55 + appear * 0.45) * (1 - slide * 0.35)})`, zIndex: 13 }}>
              {slide < 0.06 && <div style={{ position: "absolute", left: -36, top: -36, width: 72, height: 72, borderRadius: "50%", background: `radial-gradient(circle, ${GEMS5[i]}70, transparent 66%)`, transform: `scale(${1 + Math.sin(lf / 5 + i) * 0.14})` }} />}
              {slide > 0.06 && <div style={{ position: "absolute", left: -5, top: -56, width: 10, height: 56, background: `linear-gradient(180deg, transparent, ${GEMS5[i]})`, opacity: 0.7, borderRadius: 4 }} />}
              <div style={{ position: "absolute", left: -27, top: -27 }}><Gem s={54} c={GEMS5[i]} /></div>
            </div>);
        })}
        {/* clink flash as each stone locks in */}
        {gemAt.map((at, i) => { const fl = lf >= at && lf < at + 6 ? 1 - (lf - at) / 6 : 0; if (fl <= 0) return null; return <div key={`cf${i}`} style={{ position: "absolute", left: cx + 120 - 30, top: 502 - 30, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, ${GEMS5[i]}, transparent 68%)`, opacity: fl, zIndex: 14 }} />; })}
        {/* reacting crowd of mini-critters, blown back on the snap */}
        {crowd.map(([x, sz, off], i) => { const push = snap * ((x as number) < cx ? -1 : 1) * 48; return (
          <div key={`c${i}`} style={{ position: "absolute", left: (x as number) + push, bottom: 108, width: sz as number, transform: `rotate(${snap * ((x as number) < cx ? 15 : -15)}deg)`, transformOrigin: "50% 100%", zIndex: 5, filter: "brightness(0.8)" }}>
            <Mascot lf={lf + (off as number)} size={sz as number} nodAmp={2.6} nodSpeed={7 + i} gaze={(x as number) < cx ? 5 : -5} shock={snap > 0.2 ? 0.5 : 0} />
          </div>); })}
        {/* STOP slams DOWN from above the hero (never covering him), then whips out */}
        {lf >= stopAt && stopGone < 0.98 && (<>
          {/* impact dust + shock lines where it lands */}
          {impact > 0.03 && <>
            {Array.from({ length: 7 }).map((_, i) => { const a = (i / 7) * Math.PI - Math.PI; const d = (1 - impact) * 90; return <div key={`d${i}`} style={{ position: "absolute", left: cx + Math.cos(a) * d, top: 356 + Math.abs(Math.sin(a)) * 10, width: 24 * impact + 8, height: 24 * impact + 8, borderRadius: "50%", background: "rgba(220,210,235,0.4)", opacity: impact * 0.8, zIndex: 43 }} />; })}
            {[-24, -12, 12, 24].map((a, i) => <div key={`il${i}`} style={{ position: "absolute", left: cx, top: 352, width: 60 * impact + 10, height: 5, marginLeft: a > 0 ? 40 : -100 - 40, background: "linear-gradient(90deg, transparent, rgba(255,240,220,0.8))", transform: `rotate(${a}deg)`, opacity: impact, zIndex: 43 }} />)}
          </>}
          <div style={{ position: "absolute", left: cx - 100, top: stopY - stopGone * 340, transform: `scale(${(1 - stopGone * 0.4)}) rotate(${(1 - Math.min(1, stopDrop)) * -40 + Math.sin(lf * 2.4) * 3 * impact}deg)`, zIndex: 44, opacity: 1 - stopGone }}><StopSign s={200} /></div>
        </>)}
        {/* 10X payoff, high and unobstructed above the hero */}
        {lf >= snapAt + 3 && (
          <div style={{ position: "absolute", left: cx - 40, top: 150, transform: `translateX(-50%) scale(${tenXS})`, zIndex: 34 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 158, color: "#F2C14E", textShadow: "0 6px 0 rgba(90,40,110,0.6), 0 0 48px rgba(180,120,230,0.75)", whiteSpace: "nowrap" }}>10X</span>
          </div>
        )}
        <Sparkles lf={lf} at={4.62} x={cx} y={430} n={24} spread={380} colors={["#C89AF0", GOLD, "#fff", "#9E7BC8"]} dur={1.0} />
        {snap > 0.2 && <Confetti lf={lf} n={30} colors={[GOLD, "#B98AE0", "#FCEDDD"]} top={-20} h={820} />}
      </div>
      {/* red-flash freeze on the STOP interrupt */}
      {stopHit > 0.02 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 90% at 50% 42%, transparent 40%, rgba(178,40,30,0.5) 100%)", opacity: stopHit, zIndex: 46, pointerEvents: "none" }} />}
      {/* white flash on the snap */}
      {lf >= snapAt && lf < snapAt + 6 && <div style={{ position: "absolute", inset: 0, background: "#F6ECFF", opacity: 0.7 * (1 - (lf - snapAt) / 6), zIndex: 50 }} />}
    </>
  );
};

// ============================== SCENE 1 — HAPPY LITTLE INTERFACES (painter parody) ==============================
const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const fan = [fr(1.0), fr(1.45), fr(1.9)];
  const bloomAt = fr(3.8);
  const bloomP = Math.min(1.08, spr(lf, bloomAt, 10, 190));
  const wallAt = fr(5.2);
  const slopAt = fr(6.3);
  const slop = over(lf, slopAt, fr(0.8), Easing.in(Easing.cubic));
  const paint = Math.sin(lf / 4);
  const swatches = [["#7A5AB8", "#B9A5E8"], ["#3A6E8E", "#A5C9D8"], ["#B85A72", "#E8A5B9"]];
  return (
    <>
      {/* night studio: brick-warm gallery wall, framed art, moonlit window, wood floor */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(120,70,50,0.18), transparent 72%)" }} />
      <SpotCone x={620} top={30} topW={70} botW={480} h={560} color="rgba(255,214,150,0.16)" sway={3} lf={lf} pool={1} />
      {/* framed paintings on the back wall */}
      {[[250, 130, "#3A6E8E"], [880, 120, "#7A5AB8"], [880, 300, "#B85A72"]].map(([fx, fy, c]: any, i) => (
        <div key={`fr${i}`} style={{ position: "absolute", left: fx, top: fy, width: 96, height: 118, background: "#5A4630", border: "5px solid #7A5E3E", borderRadius: 4, boxShadow: "0 10px 22px -10px rgba(0,0,0,0.6)", zIndex: 1, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 6, background: `linear-gradient(158deg, ${c}, #1A1420)` }}>
            <div style={{ position: "absolute", left: 10, bottom: 12, right: 10, height: 20, background: "rgba(255,255,255,0.25)", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 14, top: 14, width: 22, height: 22, borderRadius: "50%", background: "rgba(255,240,200,0.5)" }} />
          </div>
        </div>))}
      {/* moonlit window */}
      <div style={{ position: "absolute", left: 66, top: 300, width: 150, height: 190, borderRadius: 10, background: "linear-gradient(180deg,#26324E,#141C30)", border: "3px solid #2E3A52", boxShadow: "inset 0 0 30px rgba(120,160,255,0.2)", zIndex: 1 }}>
        <div style={{ position: "absolute", left: "48%", top: 0, bottom: 0, width: 5, background: "#2E3A52" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "48%", height: 5, background: "#2E3A52" }} />
        <div style={{ position: "absolute", right: 12, top: 14, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #F6F2E4, #C9CFE0)", boxShadow: "0 0 22px rgba(246,242,228,0.6)" }} />
      </div>
      {/* wood floor with plank lines */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "linear-gradient(180deg,#3A2A1C,#1E140C)", clipPath: "polygon(6% 0,94% 0,100% 100%,0 100%)", zIndex: 1 }}>
        {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{ position: "absolute", left: `${k * 18 - 5}%`, top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.3)", transform: `skewX(${(k - 3) * 4}deg)` }} />)}
      </div>
      {/* paint splats on the floor */}
      {[[300, 690, GEMS5[0]], [420, 712, GOLD], [250, 720, CLAY]].map(([x, y, c]: any, i) => <div key={i} style={{ position: "absolute", left: x, top: y, width: 46 - i * 8, height: 16 - i * 2, borderRadius: "50%", background: c, opacity: 0.35 }} />)}
      {/* the easel + canvas */}
      <div style={{ position: "absolute", left: 470, top: 208, zIndex: 10 }}>
        <div style={{ position: "absolute", left: 34, top: 320, width: 15, height: 210, background: "#5A4630", transform: "rotate(15deg)", transformOrigin: "top" }} />
        <div style={{ position: "absolute", left: 300, top: 320, width: 15, height: 210, background: "#5A4630", transform: "rotate(-15deg)", transformOrigin: "top" }} />
        <div style={{ position: "absolute", left: 168, top: 340, width: 15, height: 180, background: "#4A3826" }} />
        <div style={{ width: 350, height: 330, borderRadius: 10, background: "linear-gradient(158deg, #F4EDDC, #E8DDC4)", border: "8px solid #6E5236", boxShadow: "0 24px 50px -16px rgba(0,0,0,0.6)", position: "relative", overflow: "hidden" }}>
          {/* wet brushstroke swipes on the canvas */}
          <div style={{ position: "absolute", left: 14, top: 220, width: 150, height: 26, borderRadius: 14, background: "rgba(158,123,200,0.4)", transform: "rotate(-7deg)" }} />
          <div style={{ position: "absolute", left: 150, top: 258, width: 120, height: 20, borderRadius: 12, background: "rgba(90,160,222,0.35)", transform: "rotate(4deg)" }} />
          <div style={{ position: "absolute", left: 40, top: 270, width: 90, height: 16, borderRadius: 10, background: "rgba(231,178,76,0.45)", transform: "rotate(-3deg)" }} />
          {/* three mockup directions fan across the canvas */}
          {fan.map((at, i) => { const ap = Math.min(1.06, spr(lf, at, 11, 200)); const gone = over(lf, bloomAt, fr(0.35)); if (ap < 0.02) return null; const win = i === 1; const grow = win ? 1 + Math.min(1, Math.max(0, bloomP)) * 0.62 : 1; return (
            <div key={i} style={{ position: "absolute", left: win ? 121 - (grow - 1) * 60 : 26 + i * 100, top: win ? 66 - (grow - 1) * 46 : 40 + (i % 2) * 26, width: 108, height: 150, borderRadius: 8, background: grad(swatches[i][1], swatches[i][0]), border: "3px solid rgba(255,255,255,0.9)", boxShadow: "0 12px 26px -8px rgba(0,0,0,0.6)", transform: `rotate(${win ? 0 : (i - 1) * 9}deg) scale(${ap * grow * (1 - gone * (win ? 0 : 0.92))})`, opacity: win ? 1 : 1 - gone, overflow: "hidden", zIndex: win ? 3 : 2 }}>
              <div style={{ height: 26, background: "rgba(255,255,255,0.85)" }} />
              <div style={{ padding: 10 }}>
                <div style={{ height: 9, width: "62%", borderRadius: 3, background: "rgba(255,255,255,0.9)" }} />
                <div style={{ height: 6, width: "88%", borderRadius: 3, background: "rgba(255,255,255,0.5)", marginTop: 8 }} />
                <div style={{ height: 6, width: "74%", borderRadius: 3, background: "rgba(255,255,255,0.5)", marginTop: 5 }} />
                {win && bloomP > 0.15 && <div style={{ marginTop: 12, display: "inline-block", padding: "5px 13px", borderRadius: 7, background: GOLD, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: "#3A2410" }}>Ship it</div>}
              </div>
              {win && lf >= bloomAt && <div style={{ position: "absolute", inset: -3, borderRadius: 8, border: `4px solid ${GOLD}`, boxShadow: `0 0 ${14 + bloomP * 16}px rgba(231,178,76,0.9)` }} />}
            </div>); })}
          {lf < fan[0] && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, color: "rgba(110,82,54,0.3)" }}>?</div>}
        </div>
        {/* React+Tailwind tube on the easel tray */}
        <div style={{ position: "absolute", left: 96, top: 336, padding: "3px 10px", borderRadius: 6, background: "#141820", border: "1.5px solid #3A4456", fontFamily: mono, fontSize: 14, color: "#7FB4D8" }}>react + tailwind</div>
      </div>
      {/* escalation: a wall of finished glowing screens pops in behind */}
      {[0, 1, 2].map((i) => { const ap = Math.min(1.05, spr(lf, fr(5.2) + i * 4, 12, 200)); if (ap < 0.02) return null; return (
        <div key={`w${i}`} style={{ position: "absolute", left: 850, top: 150 + i * 150, width: 110, height: 120, borderRadius: 8, background: grad(swatches[i][0], "#181420"), border: `2.5px solid ${GOLD}`, boxShadow: `0 0 16px ${swatches[i][0]}66`, transform: `scale(${ap}) rotate(${(i - 1) * 4}deg)`, overflow: "hidden", zIndex: 6 }}>
          <div style={{ height: 20, background: swatches[i][1] }} />
          <div style={{ padding: 8 }}><div style={{ height: 6, width: "70%", borderRadius: 2, background: "rgba(255,255,255,0.4)" }} /><div style={{ height: 5, width: "84%", borderRadius: 2, background: "rgba(255,255,255,0.25)", marginTop: 6 }} /></div>
        </div>); })}
      <Sparkles lf={lf} at={3.9} x={648} y={380} n={14} spread={190} colors={[GOLD, "#fff", "#B9A5E8"]} dur={0.9} />
      {/* the painter: fro + palette + brush */}
      <div style={{ position: "absolute", left: 130, bottom: 120, width: 250, zIndex: 20 }}>
        <Mascot lf={lf} size={250} nodAmp={3} nodSpeed={6} gaze={7} fro={1} cheer={lf >= bloomAt ? 0.55 : 0} />
        <div style={{ position: "absolute", left: -58, top: 116, transform: "rotate(-14deg)", zIndex: 22 }}>
          <svg viewBox="0 0 110 84" width={106} height={82} style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
            {/* kidney palette with a thumb hole + paint dabs */}
            <path d="M14 44 a40 34 0 1 1 80 8 a12 10 0 0 0 -15 -7 a11 9 0 0 1 -14 9 a40 34 0 0 1 -51 -10 z" fill="#C9A05E" stroke="#8A6430" strokeWidth={4} />
            <circle cx={30} cy={52} r={8} fill="#1A1410" opacity={0.55} />
            {[["#9E7BC8", 34, 24], ["#5AA0DE", 54, 17], ["#C44A3A", 74, 24], ["#3F9E74", 46, 42], ["#E7B24C", 66, 44]].map(([c, x, y]: any, i) => <circle key={i} cx={x} cy={y} r={8} fill={c} stroke="rgba(255,255,255,0.6)" strokeWidth={2} />)}
          </svg>
        </div>
        <div style={{ position: "absolute", right: -52, top: 30, transform: `rotate(${-38 + paint * 30}deg)`, transformOrigin: "20% 88%", zIndex: 22 }}>
          <svg viewBox="0 0 100 130" width={92} height={120} style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
            {/* oversized loaded brush raised toward the canvas */}
            <rect x={40} y={54} width={14} height={72} rx={6} fill="#8A6844" stroke="#5E4426" strokeWidth={3} />
            <rect x={36} y={38} width={22} height={20} rx={4} fill="#C9932A" stroke="#8A6430" strokeWidth={3} />
            <path d="M36 40 Q30 12 47 4 Q64 12 58 40 Z" fill={GEMS5[0]} stroke="#6E4E96" strokeWidth={3} />
            <ellipse cx={47} cy={10} rx={7} ry={5} fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      </div>
      {/* the AI-slop gremlin shooed into the bin */}
      <div style={{ position: "absolute", left: 856, bottom: 116, zIndex: 12 }}><Bin s={110} /></div>
      {lf > fr(4.6) && slop < 1 && (
        <div style={{ position: "absolute", left: interpolate(slop, [0, 1], [640, 880]), top: 520 - Math.sin(slop * Math.PI) * 150 + slop * 190, transform: `rotate(${slop * 240}deg) scaleX(-1)`, opacity: 1 - slop * 0.3, zIndex: 14 }}>
          <Gremlin s={86} lf={lf} scared={slop > 0.04 ? 1 : 0} />
          {slop < 0.04 && <div style={{ position: "absolute", left: -18, top: 66, width: 46, height: 18, borderRadius: "50%", background: "#5A5A64", opacity: 0.85 }} />}
        </div>
      )}
      {slop >= 0.96 && <Stamp x={905} y={560} s={Math.min(1.1, spr(lf, fr(7.2), 10, 210))} text="NO SLOP" c={GREEN} />}
      {/* GitHub repo header card */}
      <RepoCard lf={lf} delay={fr(0.7)} owner="superdesigndev" repo="superdesign" stars="5.4k" tag="design canvas" accent="#B9A5E8" />
    </>
  );
};

// ============================== SCENE 2 — ASSEMBLE (hero-team parody) ==============================
const REL = ["PLAN", "SPEC", "BUILD", "TEST", "REVIEW"];
const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const enter = [fr(0.5), fr(0.9), fr(1.3), fr(1.7), fr(2.1)];
  const asmAt = fr(2.5);
  const asmS = Math.min(1.1, spr(lf, asmAt, 9, 230));
  const asmOut = over(lf, fr(3.6), fr(0.4));
  const rejectAt = fr(5.6);
  const reject = over(lf, rejectAt, fr(1.2), Easing.out(Easing.cubic));
  const gemAt = fr(8.2);
  const gemS = Math.min(1.1, spr(lf, gemAt, 10, 200));
  const baton = ((lf - fr(3.4)) / fr(2.0)) % 1;
  const batonOn = lf >= fr(3.4) && lf < gemAt;
  const pos = [150, 328, 506, 684, 862];
  const capes = ["#7A5AB8", "#3A6E8E", "#C9932A", "#2E7452", "#9A2530"];
  const fits: any[] = [{ suit: 1 }, { glasses: 1 }, { constr: 1 }, { stern: 0.55 }, { beard: 1 }];
  return (
    <>
      {/* hero arena: emblem backdrop, banners, tiered floor, spot cones, star-field */}
      {Array.from({ length: 16 }).map((_, i) => <div key={`st${i}`} style={{ position: "absolute", left: seed(i) * 1000, top: 60 + seed(i * 2) * 300, width: 3, height: 3, borderRadius: "50%", background: "rgba(190,220,255,0.5)", opacity: 0.4 + Math.sin(lf / 14 + i) * 0.3 }} />)}
      {/* giant glowing hex emblem behind the team */}
      <div style={{ position: "absolute", left: 506 - 200, top: 150, width: 400, height: 400, zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle, rgba(63,158,116,${0.16 + Math.sin(lf / 12) * 0.05}), transparent 62%)` }} />
        <svg viewBox="0 0 200 200" width={400} height={400} style={{ transform: `rotate(${lf * 0.25}deg)`, opacity: 0.5 }}><polygon points="100,14 175,57 175,143 100,186 25,143 25,57" fill="none" stroke="#2E7452" strokeWidth={4} /><polygon points="100,40 152,70 152,130 100,160 48,130 48,70" fill="none" stroke="#245C41" strokeWidth={3} /></svg>
        <div style={{ position: "absolute", left: 152, top: 150, opacity: 0.5 }}><ClaudeMark size={96} /></div>
      </div>
      {/* hanging banners */}
      {[130, 880].map((bx, i) => <div key={`bn${i}`} style={{ position: "absolute", left: bx, top: 0, width: 70, height: 200, background: "linear-gradient(180deg,#1E4A38,#0E2A1E)", clipPath: "polygon(0 0,100% 0,100% 88%,50% 100%,0 88%)", borderLeft: "3px solid #2E7452", borderRight: "3px solid #2E7452", zIndex: 2 }}><div style={{ position: "absolute", left: "50%", top: 40, transform: "translateX(-50%)", opacity: 0.7 }}><ClaudeMark size={40} /></div></div>)}
      {/* tiered arena floor with grid */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: "linear-gradient(180deg,#0C1812,#050B08)", clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)", zIndex: 2 }}>
        {[0, 1, 2, 3].map((k) => <div key={`gl${k}`} style={{ position: "absolute", left: 0, right: 0, top: 20 + k * 46, height: 2, background: "rgba(120,220,170,0.14)" }} />)}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => <div key={`gv${k}`} style={{ position: "absolute", left: `${k * 12.5}%`, top: 0, bottom: 0, width: 2, background: "rgba(120,220,170,0.10)", transform: `skewX(${(k - 4) * 3}deg)` }} />)}
      </div>
      {pos.map((x, i) => <SpotCone key={`sp${i}`} x={x} top={30} topW={40} botW={200} h={480} color={`rgba(140,230,180,${enter[i] <= lf ? 0.19 : 0.07})`} />)}
      {/* silhouette crowd rows at the arena base */}
      {Array.from({ length: 13 }).map((_, i) => { const b = Math.sin(lf / 6 + i * 1.2) * 3; return <div key={`aud${i}`} style={{ position: "absolute", left: -20 + i * 82, bottom: 34 + b, width: 68, height: 52, borderRadius: "50% 50% 40% 40%", background: "#0A1610", filter: "blur(0.5px)", zIndex: 23 }} />; })}
      {Array.from({ length: 10 }).map((_, i) => { const b = Math.sin(lf / 6 + i * 1.5) * 4; const up = i % 3 === 0; return <div key={`aud2${i}`} style={{ position: "absolute", left: -12 + i * 108, bottom: -14 + b - (up ? 5 : 0), width: 88, height: 70, borderRadius: "50% 50% 42% 42%", background: "#081209", boxShadow: "inset 0 4px 0 rgba(160,255,200,0.06)", zIndex: 24 }}>
        {up && <><div style={{ position: "absolute", left: 8, top: -14, width: 9, height: 22, borderRadius: 4, background: "#081209", transform: "rotate(-20deg)" }} /><div style={{ position: "absolute", right: 8, top: -14, width: 9, height: 22, borderRadius: 4, background: "#081209", transform: "rotate(20deg)" }} /></>}
      </div>; })}
      {/* landing pads */}
      {pos.map((x, i) => { const on = lf >= enter[i]; return <div key={`pad${i}`} style={{ position: "absolute", left: x - 74, bottom: 128, width: 148, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(63,158,116,${on ? 0.4 : 0.12}), transparent 70%)` }} />; })}
      {/* the five heroes land */}
      {REL.map((s, i) => { const land = Math.min(1.06, spr(lf, enter[i], 11, 210)); if (land < 0.02) return null; const sz = 184 - Math.abs(i - 2) * 8; const dust = over(lf, enter[i], fr(0.4)); return (
        <React.Fragment key={i}>
          {dust > 0.02 && dust < 0.98 && [0, 1, 2].map((d) => <div key={d} style={{ position: "absolute", left: pos[i] + (d - 1) * 52 * dust, bottom: 132, width: 30 * (1 - dust) + 6, height: 30 * (1 - dust) + 6, borderRadius: "50%", background: "rgba(220,235,225,0.4)", opacity: 1 - dust }} />)}
          <div style={{ position: "absolute", left: pos[i] - sz / 2, bottom: 138, width: sz, transform: `translateY(${(1 - land) * -180}px) scale(${land})`, transformOrigin: "50% 100%", zIndex: 20 - Math.abs(i - 2) }}>
            <Mascot lf={lf + i * 5} size={sz} nodAmp={2.8} nodSpeed={6 + i} gaze={i < 2 ? 5 : i > 2 ? -5 : 0} capeC={capes[i]} cheer={lf >= gemAt ? 0.6 : 0} {...fits[i]} />
          </div>
          <div style={{ position: "absolute", left: pos[i] - 60, bottom: 104, width: 120, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 19, letterSpacing: 1, color: "rgba(190,240,210,0.9)", textShadow: "0 2px 6px rgba(0,0,0,0.8)", zIndex: 26 }}>{s}</div>
        </React.Fragment>); })}
      {/* ASSEMBLE slam */}
      {lf >= asmAt && asmOut < 0.98 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", transform: `scale(${asmS})`, opacity: 1 - asmOut, zIndex: 30 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: "#8FE3B8", letterSpacing: "0.03em", textShadow: "0 0 34px rgba(63,158,116,0.8), 0 5px 0 rgba(10,40,25,0.6)" }}>ASSEMBLE</span>
        </div>
      )}
      <Sparkles lf={lf} at={2.55} x={506} y={180} n={16} spread={300} colors={[GREEN, "#fff", GOLD]} dur={0.8} />
      {/* blueprint baton relayed down the line */}
      {batonOn && (
        <div style={{ position: "absolute", left: 120 + baton * 700, top: 440 - Math.abs(Math.sin(baton * Math.PI * 4)) * 30, zIndex: 24 }}>
          <div style={{ width: 64, height: 42, borderRadius: 6, background: "#1E2C48", border: "2.5px solid #5AA0DE", boxShadow: "0 0 14px rgba(90,160,222,0.6)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 7, top: 7, width: 30, height: 4, background: "rgba(140,190,240,0.8)" }} />
            <div style={{ position: "absolute", left: 7, top: 15, width: 44, height: 3, background: "rgba(140,190,240,0.5)" }} />
            <div style={{ position: "absolute", left: 7, top: 22, width: 22, height: 3, background: "rgba(140,190,240,0.5)" }} />
            <div style={{ position: "absolute", right: 6, bottom: 5, width: 14, height: 14, border: "2px solid rgba(140,190,240,0.8)", borderRadius: 2 }} />
          </div>
        </div>
      )}
      {/* the no-test block slides toward the TEST hero and gets BOUNCED */}
      {lf >= fr(4.6) && reject < 1 && (
        <div style={{ position: "absolute", left: reject < 0.02 ? interpolate(lf, [fr(4.6), rejectAt], [980, 700], { extrapolateRight: "clamp" }) : interpolate(reject, [0, 1], [700, 990]), top: reject < 0.02 ? 470 : 470 - Math.sin(reject * Math.PI) * 220 + reject * 150, transform: `rotate(${reject * 320}deg)`, zIndex: 26 }}>
          <div style={{ width: 110, height: 74, borderRadius: 9, background: "#3A1512", border: "3.5px solid #C44A3A", boxShadow: "0 0 18px rgba(196,74,58,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 19, color: "#F0A9A0" }}>no tests</div>
        </div>
      )}
      {/* TEST hero's cone snaps red on the bounce */}
      {lf >= rejectAt && lf < rejectAt + 26 && <SpotCone x={684} top={30} topW={40} botW={200} h={480} color={`rgba(230,90,60,${0.3 * (1 - (lf - rejectAt) / 26)})`} />}
      {/* oversized rejection banner at headline scale */}
      {lf >= rejectAt && lf < gemAt && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 130, textAlign: "center", transform: `scale(${Math.min(1.08, spr(lf, rejectAt, 8, 300))})`, zIndex: 30 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, color: "#F08070", letterSpacing: "0.02em", textShadow: "0 0 34px rgba(196,74,58,0.8), 0 5px 0 rgba(60,12,8,0.7)" }}>REJECTED</span>
        </div>
      )}
      {lf >= rejectAt && lf < rejectAt + 16 && <div style={{ position: "absolute", left: 640, top: 430, width: 180, height: 9, background: `linear-gradient(90deg, transparent, rgba(196,74,58,${0.9 * (1 - (lf - rejectAt) / 16)}), transparent)`, zIndex: 25 }} />}
      {/* payoff: the finished product gem, lifted + cheered */}
      {lf >= gemAt && (
        <div style={{ position: "absolute", left: 862 - 40, top: 300 - gemS * 40 + bob(lf, 6), transform: `scale(${gemS})`, zIndex: 28 }}>
          <Gem s={84} c={GREEN} />
        </div>
      )}
      {lf >= gemAt && <Sparkles lf={lf} at={8.3} x={880} y={330} n={16} spread={220} colors={[GREEN, GOLD, "#fff"]} dur={1.0} />}
      {/* GitHub repo header card */}
      <RepoCard lf={lf} delay={fr(0.9)} owner="obra" repo="superpowers" stars="40k" tag="plan-first agents" accent="#8FE3B8" />
    </>
  );
};

// ============================== SCENE 3 — NONE SHIP PAST (wizard vs bug-balrog) ==============================
const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const rise = over(lf, fr(1.0), fr(2.6), Easing.out(Easing.cubic));
  const slamAt = fr(4.5);
  const slam = Math.min(1.1, spr(lf, slamAt, 8, 260));
  const barrier = lf >= slamAt ? Math.max(0, 1 - (lf - slamAt) / 12) : 0;
  const hurt = lf >= slamAt ? 1 : 0;
  const cageAt = fr(6.4);
  const cageS = Math.min(1.08, spr(lf, cageAt, 10, 220));
  const sink = over(lf, fr(7.6), fr(1.6), Easing.in(Easing.cubic));
  const bx = 640, by = interpolate(rise, [0, 1], [760, 400]) + (hurt ? Math.min(24, (lf - slamAt) * 2) : 0) + sink * 320;
  return (
    <>
      {/* the fiery chasm + night sky */}
      {Array.from({ length: 12 }).map((_, i) => <div key={`st${i}`} style={{ position: "absolute", left: seed(i) * 1000, top: 50 + seed(i * 2) * 200, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,220,190,0.4)", opacity: 0.3 + Math.sin(lf / 12 + i) * 0.3 }} />)}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 340, background: "radial-gradient(ellipse 80% 100% at 60% 100%, rgba(220,90,30,0.5), rgba(120,40,14,0.25) 50%, transparent 76%)" }} />
      <Embers lf={lf} n={18} base={780} />
      {/* the guarded gate (your code) behind the wizard */}
      <div style={{ position: "absolute", left: 60, top: 250, width: 190, height: 330, borderRadius: "95px 95px 8px 8px", background: "linear-gradient(180deg,#241A28,#151019)", border: "4px solid #4A3A50", boxShadow: "inset 0 0 40px rgba(180,120,220,0.15)", zIndex: 6 }}>
        <div style={{ position: "absolute", left: "50%", top: 60, transform: "translateX(-50%)", opacity: 0.85 }}><ClaudeMark size={64} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, textAlign: "center", fontFamily: mono, fontSize: 16, color: "rgba(220,190,240,0.55)" }}>your code</div>
        <div style={{ position: "absolute", left: "50%", top: "56%", width: 12, height: 12, borderRadius: "50%", background: GOLD, marginLeft: -6, boxShadow: "0 0 12px rgba(231,178,76,0.8)" }} />
      </div>
      {/* the narrow stone bridge over a pure-black abyss */}
      <div style={{ position: "absolute", left: -20, right: -20, bottom: 0, height: 208, background: "linear-gradient(180deg, #0A0505 0%, #1A0A06 100%)", zIndex: 7 }} />
      <div style={{ position: "absolute", left: -20, right: -20, bottom: 200, height: 74, background: "linear-gradient(180deg,#3A3038,#241E28)", borderTop: "5px solid #52465A", clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)", zIndex: 8 }}>
        {[80, 240, 400, 560, 720, 880].map((x) => <div key={x} style={{ position: "absolute", left: x, top: 12, width: 60, height: 8, background: "rgba(255,255,255,0.07)" }} />)}
        {/* ragged broken edge under the span */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -16, height: 16, background: "#241E28", clipPath: "polygon(0 0, 100% 0, 96% 30%, 88% 100%, 80% 40%, 70% 90%, 60% 30%, 50% 100%, 40% 45%, 30% 95%, 20% 35%, 10% 85%, 4% 30%)" }} />
      </div>
      {/* heat glow rising from the abyss up the empty top band */}
      <div style={{ position: "absolute", left: 300, right: 0, top: 0, height: 300, background: "radial-gradient(ellipse 70% 100% at 70% 0%, rgba(200,80,30,0.16), transparent 70%)", zIndex: 5 }} />
      {/* bridge crack on slam */}
      {lf >= slamAt && (
        <svg viewBox="0 0 200 80" width={210} height={84} style={{ position: "absolute", left: 400, bottom: 196, zIndex: 9, opacity: Math.min(1, (lf - slamAt) / 4) }}>
          <path d="M100 0 L88 22 L104 34 L92 52 L106 66 L98 80 M100 0 L116 18 L104 34 M92 52 L76 60" stroke="#F2903E" strokeWidth={4} fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(242,144,62,0.8))" }} />
        </svg>
      )}
      {/* the BUG BALROG rising from the chasm, towering over the wizard */}
      {sink < 0.98 && (
        <div style={{ position: "absolute", left: bx, top: by, transform: `translateX(-50%) scale(${0.8 + rise * 0.75}) ${hurt ? `rotate(${Math.sin(lf) * 3}deg)` : ""}`, transformOrigin: "50% 100%", zIndex: 12 }}>
          <Balrog s={270} lf={lf} hurt={hurt} />
        </div>
      )}
      {/* the caged bug hauled down */}
      {lf >= cageAt && sink < 0.98 && (
        <div style={{ position: "absolute", left: bx - 170, top: by - 60, transform: `scale(${cageS})`, zIndex: 14 }}><Cage s={340} /></div>
      )}
      {lf >= cageAt + 4 && <Stamp x={bx} y={300 + sink * 200} s={Math.min(1.08, spr(lf, cageAt + 4, 10, 210))} text="CAUGHT · auth.ts:114" c={GREEN} />}
      {/* the wizard guardian (canonical costume, staff raised then slammed) */}
      <div style={{ position: "absolute", left: 190, bottom: 214, width: 240, zIndex: 20 }}>
        <Mascot lf={lf} size={240} nodAmp={2.2} nodSpeed={8} gaze={7} wizard={1} stern={lf < cageAt ? 0.5 : 0} cheer={lf >= cageAt + 6 ? 0.5 : 0} />
        {/* the tall staff: raised before the slam, floor-struck after */}
        <div style={{ position: "absolute", right: -58, top: interpolate(Math.min(1, Math.max(0, (lf - (slamAt - 14)) / 14)), [0, 1], [30, -40]) + (lf >= slamAt ? 76 : 0), transform: `rotate(${lf >= slamAt ? 4 : -18}deg)`, transformOrigin: "50% 92%", zIndex: 22 }}>
          <svg viewBox="0 0 60 220" width={54} height={200} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
            <rect x={24} y={30} width={11} height={180} fill="#6E5236" />
            <rect x={24} y={30} width={5} height={180} fill="#8A6844" />
            <rect x={16} y={4} width={28} height={28} fill="#BFE3F2" transform="rotate(45 30 18)" style={{ filter: `drop-shadow(0 0 ${8 + barrier * 18}px rgba(160,220,255,0.9))` }} />
          </svg>
        </div>
      </div>
      {/* staff-slam: blinding barrier wall across the bridge */}
      {barrier > 0.01 && (
        <div style={{ position: "absolute", left: 455, top: 180, width: 26, height: 440, borderRadius: 13, background: "linear-gradient(180deg, rgba(200,236,255,0.95), rgba(120,200,240,0.5))", boxShadow: "0 0 60px rgba(160,220,255,0.9)", opacity: barrier, transform: `scaleX(${1 + barrier * 2.4})`, zIndex: 16 }} />
      )}
      {lf >= slamAt && lf < slamAt + 5 && <div style={{ position: "absolute", inset: 0, background: "#DCF2FF", opacity: 0.5 * (1 - (lf - slamAt) / 5), zIndex: 40 }} />}
      {/* NONE SHIP PAST slam */}
      {lf >= slamAt + 4 && lf < fr(7.4) && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", transform: `scale(${Math.min(1.08, spr(lf, slamAt + 4, 9, 220))})`, opacity: 1 - over(lf, fr(6.9), fr(0.5)), zIndex: 34 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: "#BFE3F2", textShadow: "0 0 30px rgba(160,220,255,0.8), 0 4px 0 rgba(20,40,60,0.6)" }}>NONE SHIP PAST</span>
        </div>
      )}
      <Sparkles lf={lf} at={4.55} x={470} y={400} n={18} spread={280} colors={["#BFE3F2", "#fff", SKY]} dur={0.9} />
      {/* GitHub repo header card + hidden-gem note */}
      <RepoCard lf={lf} delay={fr(0.7)} owner="trailofbits" repo="claude-audit" stars="8.9k" tag="static analysis" accent="#F0B9A0" />
      {lf >= fr(1.4) && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", transform: `scale(${Math.min(1.05, spr(lf, fr(1.4), 12, 200))})`, zIndex: 32 }}>
          <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 999, background: "rgba(25,11,15,0.7)", border: `1.5px solid ${CLAY}`, fontFamily: mono, fontSize: 16, color: "#F0B9A0" }}>almost nobody installs this</span>
        </div>
      )}
    </>
  );
};

// ============================== SCENE 4 — ONE CUT (samurai vs rewrite-berserker) ==============================
const BRK = { x0: 312, y: 418, bw: 74, gap: 9, h: 58 };
const brickX = (i: number) => BRK.x0 + i * (BRK.bw + BRK.gap);
const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const focusAt = fr(1.7);
  const focus = over(lf, focusAt, fr(1.5));                        // ki-charge + reticle build up to the cut
  const slashAt = fr(3.5);
  const slashE = lf >= slashAt && lf < slashAt + 12 ? 1 - (lf - slashAt) / 12 : 0;
  const sever = over(lf, slashAt, fr(0.45), Easing.out(Easing.cubic));
  const cutDone = lf >= slashAt + 3;
  const slowmo = focus > 0.2 && lf < slashAt ? Math.min(1, (focus - 0.2) * 2) : 0;
  const wreckOn = lf >= fr(5.0);
  const wSwing = Math.sin(lf / 4.2);
  const boom = over(lf, fr(5.5), fr(0.4));                          // berserker's file detonates
  const cx = 506;
  return (
    <>
      {/* ==== rich night dojo ==== */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 20%, rgba(40,80,72,0.28), transparent 74%)" }} />
      {/* big craters moon */}
      <div style={{ position: "absolute", left: 78, top: 60, width: 210, height: 210, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, #F2FBF6, #A6D2C6 72%)", boxShadow: "0 0 90px rgba(200,240,225,0.5)" }}>
        {[[60, 70, 26], [130, 120, 18], [90, 150, 14]].map(([cxx, cyy, r]: any, i) => <div key={i} style={{ position: "absolute", left: cxx, top: cyy, width: r, height: r, borderRadius: "50%", background: "rgba(140,190,175,0.4)" }} />)}
      </div>
      {/* torii gate silhouette (main backdrop) */}
      <div style={{ position: "absolute", left: cx - 210, top: 108, width: 420, height: 430, zIndex: 1 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, background: "linear-gradient(180deg,#7A1E28,#5A141C)", borderRadius: "8px 8px 4px 4px", boxShadow: "0 4px 10px rgba(0,0,0,0.5)", transform: "scaleX(1.08)" }} />
        <div style={{ position: "absolute", left: 30, right: 30, top: 54, height: 22, background: "linear-gradient(180deg,#6E1A24,#4E121A)" }} />
        <div style={{ position: "absolute", left: 44, top: 30, width: 34, height: 400, background: "linear-gradient(90deg,#6E1A24,#5A141C)" }} />
        <div style={{ position: "absolute", right: 44, top: 30, width: 34, height: 400, background: "linear-gradient(90deg,#5A141C,#6E1A24)" }} />
      </div>
      {/* swaying bamboo at the edges */}
      {[[24, 0], [58, 1.3], [944, 2.1], [978, 0.7]].map(([bx, ph]: any, i) => (
        <div key={`bam${i}`} style={{ position: "absolute", left: bx, top: 40, width: 26, height: 620, transformOrigin: "50% 100%", transform: `rotate(${Math.sin(lf / 26 + ph) * 2.4}deg)`, zIndex: 2 }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#2E5A3A,#4A8A54 55%,#24462E)", borderRadius: 8 }} />
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: -3, right: -3, top: 60 + k * 110, height: 8, background: "#1E3A26", borderRadius: 4 }} />)}
          {[90, 300].map((ly, k) => <div key={`lf${k}`} style={{ position: "absolute", left: i % 2 ? -40 : 20, top: ly, width: 54, height: 16, borderRadius: "0 80% 0 80%", background: "#3A7048", transform: `rotate(${i % 2 ? -28 : 22}deg)` }} />)}
        </div>))}
      {/* hanging paper lantern */}
      <div style={{ position: "absolute", left: 862, top: 0, width: 4, height: 96, background: "rgba(150,210,190,0.3)", transform: `rotate(${Math.sin(lf / 18) * 4}deg)`, transformOrigin: "50% 0%", zIndex: 8 }}>
        <div style={{ position: "absolute", left: -28, top: 92, width: 60, height: 72, borderRadius: "40% 40% 44% 44%", background: "radial-gradient(circle at 50% 40%, #F6D890, #C99442)", border: "2.5px solid #8A6420", boxShadow: "0 0 40px rgba(246,216,144,0.6)" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 7 + i * 17, top: 6, width: 2.5, height: 58, background: "rgba(120,80,20,0.4)" }} />)}
        </div>
      </div>
      {/* fireflies drifting */}
      {Array.from({ length: 10 }).map((_, i) => { const fx = 160 + seed(i) * 700 + Math.sin(lf / 20 + i * 2) * 40; const fy = 150 + seed(i * 2) * 320 + Math.cos(lf / 16 + i) * 26; const gl = 0.4 + Math.sin(lf / 6 + i * 1.5) * 0.5; return <div key={`ff${i}`} style={{ position: "absolute", left: fx, top: fy, width: 6, height: 6, borderRadius: "50%", background: "#EBE86A", boxShadow: `0 0 ${6 + gl * 8}px rgba(235,232,106,${0.5 + gl * 0.5})`, opacity: 0.5 + gl * 0.5, zIndex: 6 }} />; })}
      {/* tatami floor with mat seams */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 178, background: "linear-gradient(180deg,#12261E,#08130D)", clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)", zIndex: 3 }}>
        {[0, 1, 2].map((k) => <div key={`th${k}`} style={{ position: "absolute", left: 0, right: 0, top: 24 + k * 50, height: 3, background: "rgba(120,180,150,0.14)" }} />)}
        {[0, 1, 2, 3, 4, 5].map((k) => <div key={`tv${k}`} style={{ position: "absolute", left: `${8 + k * 16}%`, top: 0, bottom: 0, width: 3, background: "rgba(120,180,150,0.10)", transform: `skewX(${(k - 2.5) * 4}deg)` }} />)}
      </div>
      {/* incense smoke curling up beside the samurai */}
      <div style={{ position: "absolute", left: 356, bottom: 150, width: 6, height: 40, background: "#8A6844", zIndex: 9 }}><div style={{ position: "absolute", left: 1, top: -2, width: 4, height: 5, background: "#E7B24C", boxShadow: "0 0 6px #E7B24C" }} /></div>
      {Array.from({ length: 6 }).map((_, i) => { const t = ((lf / 40 + i / 6) % 1); return <div key={`sm${i}`} style={{ position: "absolute", left: 356 + Math.sin(t * 8 + i) * 16, bottom: 190 + t * 200, width: 12 * (1 - t) + 4, height: 12 * (1 - t) + 4, borderRadius: "50%", background: "rgba(220,230,225,0.16)", opacity: (1 - t) * 0.7, zIndex: 9 }} />; })}
      {/* denser cherry blossom petals swirling */}
      {Array.from({ length: 18 }).map((_, i) => { const t = ((lf / fr(6) + seed(i)) % 1); const drift = focus > 0.2 && lf < slashAt ? -focus * 40 : 0; return <div key={`p${i}`} style={{ position: "absolute", left: 90 + seed(i) * 840 - t * 130 + Math.sin(lf / 14 + i) * 24 + drift, top: 90 + t * 580, width: 13, height: 10, borderRadius: "0 70% 0 70%", background: `rgba(${233 - i % 3 * 10},${150 + i % 4 * 10},180,0.75)`, transform: `rotate(${t * 300 + i * 40}deg)`, zIndex: 5 }} />; })}
      {/* slow-mo focus vignette */}
      {slowmo > 0.05 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 55% at 30% 62%, transparent 40%, rgba(6,14,10,0.5) 100%)", opacity: slowmo * 0.8, zIndex: 10 }} />}
      <SpotCone x={cx} top={30} topW={60} botW={380} h={520} color="rgba(190,240,220,0.10)" />

      {/* ==== the target code stack (absolutely placed so the target can be severed) ==== */}
      <div style={{ position: "absolute", left: BRK.x0 - 14, top: BRK.y - 20, width: 5 * (BRK.bw + BRK.gap) + 16, height: BRK.h + 40, borderRadius: 12, background: "rgba(8,20,16,0.62)", border: "2.5px solid rgba(120,180,160,0.3)", zIndex: 11 }} />
      {[0, 1, 3, 4].map((i) => (
        <div key={i} style={{ position: "absolute", left: brickX(i), top: BRK.y, width: BRK.bw, height: BRK.h, borderRadius: 7, background: "#3A5C52", border: "2.5px solid rgba(150,210,190,0.5)", opacity: 0.55, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 13, color: "rgba(200,240,220,0.8)", zIndex: 12 }}>works</div>))}
      {/* the ONE target: locked, then severed into halves, then replaced by the green fix */}
      {!cutDone && (["L", "R"] as const).map((side, k) => (
        <div key={side} style={{ position: "absolute", left: brickX(2) + (side === "R" ? BRK.bw / 2 : 0), top: BRK.y - (slashE > 0 ? slashE * 14 : 0), width: BRK.bw / 2, height: BRK.h, overflow: "hidden", transform: `translate(${sever * (side === "L" ? -46 : 46)}px, ${sever * (side === "L" ? -18 : 18)}px) rotate(${sever * (side === "L" ? -12 : 12)}deg)`, opacity: 1 - sever * 0.6, zIndex: 13 }}>
          <div style={{ position: "absolute", top: 0, left: side === "R" ? -BRK.bw / 2 : 0, width: BRK.bw, height: BRK.h, borderRadius: 7, background: "#C8A24C", border: "2.5px solid #E7CB7A", boxShadow: `0 0 0 ${2 + Math.sin(lf / 5) * 2}px rgba(231,178,76,${0.4 + focus * 0.4}), 0 0 22px rgba(200,162,76,0.7)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 13, color: "#101C18" }}>the fix</div>
        </div>))}
      {cutDone && (
        <div style={{ position: "absolute", left: brickX(2), top: BRK.y, width: BRK.bw, height: BRK.h, borderRadius: 7, background: "rgba(63,158,116,0.95)", border: "2.5px solid #7FE0B4", boxShadow: "0 0 24px rgba(63,158,116,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 13, color: "#0E2418", transform: `scale(${Math.min(1.12, spr(lf, slashAt + 3, 9, 220))})`, zIndex: 13 }}>fixed</div>)}
      {/* reticle locking onto the one line */}
      {focus > 0.02 && lf < slashAt + 3 && (() => { const rs = interpolate(Math.min(1, focus), [0, 1], [1.9, 1.0]); const locked = focus > 0.9; return (
        <div style={{ position: "absolute", left: brickX(2) + BRK.bw / 2, top: BRK.y + BRK.h / 2, width: 0, height: 0, zIndex: 20 }}>
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], k) => <div key={k} style={{ position: "absolute", left: sx * 56 * rs - (sx < 0 ? 0 : 0), top: sy * 46 * rs, width: 18, height: 18, borderTop: sy < 0 ? `3px solid ${locked ? "#7FE0B4" : "#E7CB7A"}` : "none", borderBottom: sy > 0 ? `3px solid ${locked ? "#7FE0B4" : "#E7CB7A"}` : "none", borderLeft: sx < 0 ? `3px solid ${locked ? "#7FE0B4" : "#E7CB7A"}` : "none", borderRight: sx > 0 ? `3px solid ${locked ? "#7FE0B4" : "#E7CB7A"}` : "none", transform: `translate(${sx < 0 ? -18 : 0}px, ${sy < 0 ? -18 : 0}px)` }} />)}
          <div style={{ position: "absolute", left: -8, top: -1, width: 16, height: 2, background: locked ? "#7FE0B4" : "rgba(231,178,76,0.7)" }} />
          <div style={{ position: "absolute", left: -1, top: -8, width: 2, height: 16, background: locked ? "#7FE0B4" : "rgba(231,178,76,0.7)" }} />
        </div>); })()}
      {/* the big diagonal katana slash arc + lingering trail */}
      {slashE > 0 && (<>
        <div style={{ position: "absolute", left: 210, top: 300, width: 620, height: 8, background: "linear-gradient(90deg, transparent, #FFFFFF 45%, #EAF6FF 55%, transparent)", opacity: Math.min(1, slashE * 1.6), transform: `rotate(-24deg) scaleX(${0.6 + (1 - slashE) * 0.6})`, transformOrigin: "0 50%", boxShadow: "0 0 28px #CFEBFF", zIndex: 24 }} />
        <div style={{ position: "absolute", left: 230, top: 320, width: 560, height: 3, background: "linear-gradient(90deg, transparent, rgba(180,230,255,0.7), transparent)", opacity: slashE, transform: "rotate(-24deg)", transformOrigin: "0 50%", zIndex: 24 }} />
      </>)}
      {lf >= slashAt && lf < slashAt + 4 && <div style={{ position: "absolute", inset: 0, background: "#EAF6FF", opacity: 0.4 * (1 - (lf - slashAt) / 4), zIndex: 25 }} />}
      {cutDone && <Stamp x={cx} y={340} s={Math.min(1.12, spr(lf, slashAt + 3, 10, 220))} text="1 LINE · 4 UNTOUCHED" c={GREEN} />}
      <Sparkles lf={lf} at={3.62} x={cx} y={447} n={16} spread={200} colors={["#7FE0B4", "#fff", GOLD]} dur={0.9} />

      {/* the samurai, charging then striking */}
      <div style={{ position: "absolute", left: 110, bottom: 122, width: 250, zIndex: 20 }}>
        <Mascot lf={lf} size={250} nodAmp={1.4} nodSpeed={10} gaze={7} samurai={1} stern={lf < slashAt ? 0.55 : 0} cheer={cutDone ? 0.4 : 0} />
        {/* ki-charge glow gathering on the blade before the cut */}
        {focus > 0.05 && lf < slashAt && <div style={{ position: "absolute", left: 150, top: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,230,255,${focus * 0.5}), transparent 66%)`, transform: `scale(${0.6 + focus * 0.7})`, zIndex: 21 }} />}
        <div style={{ position: "absolute", right: -78, top: lf >= slashAt ? 84 : -56, transform: `rotate(${lf >= slashAt ? 52 : -58 - focus * 8}deg)`, transformOrigin: "18% 84%", zIndex: 22, filter: focus > 0.1 && lf < slashAt ? `drop-shadow(0 0 ${focus * 12}px rgba(180,230,255,0.9))` : "none" }}><Katana s={160} /></div>
      </div>

      {/* GitHub repo header card + fastest-growing note */}
      <RepoCard lf={lf} delay={fr(0.7)} owner="karpathy" repo="minimal-diff" stars="144k" tag="surgical edits" accent="#7FE0B4" />
      {lf >= fr(1.4) && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", transform: `scale(${Math.min(1.05, spr(lf, fr(1.4), 12, 200))})`, zIndex: 32 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(11,25,22,0.7)", border: `1.5px solid ${GREEN}`, fontFamily: mono, fontSize: 16, color: "#9FE7C4" }}><span style={{ color: GOLD }}>▲</span> fastest growing this year</span>
        </div>
      )}

      {/* THE FOIL: rewrite-berserker demolishing its ENTIRE file in a red explosion */}
      {wreckOn && (<>
        <div style={{ position: "absolute", left: 690, bottom: 130, width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, rgba(220,80,40,${0.24 + boom * 0.16}), transparent 62%)`, zIndex: 14, transform: `scale(${1 + Math.sin(lf / 5) * 0.09 + boom * 0.2})` }} />
        <div style={{ position: "absolute", left: 700, bottom: 122, width: 210, zIndex: 16, transform: `rotate(${Math.sin(lf * 1.4) * 7}deg) scaleX(-1)`, transformOrigin: "50% 100%", filter: "drop-shadow(0 0 20px rgba(220,70,40,0.6))" }}>
          <Mascot lf={lf * 1.7} size={210} nodAmp={7} nodSpeed={2.6} tint="#9A5450" xeyes={1} />
        </div>
        {/* the wrecking ball swings big */}
        <div style={{ position: "absolute", left: 892, bottom: 300, width: 8, height: 170, background: "#3A3430", transform: `rotate(${wSwing * 42}deg)`, transformOrigin: "50% 0%", zIndex: 17 }}>
          <div style={{ position: "absolute", left: -40, bottom: -70, width: 86, height: 86, borderRadius: "50%", background: "radial-gradient(circle at 36% 30%, #6A6A76, #26262E)", border: "4px solid #17171C" }} />
        </div>
        {/* the whole file detonating: bricks flung everywhere */}
        {Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; const d = boom * (60 + seed(i) * 160); return <div key={`ex${i}`} style={{ position: "absolute", left: 800 + Math.cos(a) * d, bottom: 200 + Math.sin(a) * d * 0.7 + boom * 40, width: 34, height: 22, borderRadius: 4, background: "#33272A", border: "2.5px solid #C44A3A", transform: `rotate(${boom * 360 + i * 40}deg)`, opacity: 1 - boom * 0.4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#E06050", fontFamily: mono, zIndex: 15 }}>✗</div>; })}
        {/* dust plumes */}
        {Array.from({ length: 9 }).map((_, i) => { const t = ((lf / 22 + seed(i * 2)) % 1); return <div key={`d${i}`} style={{ position: "absolute", left: 720 + seed(i) * 200, bottom: 140 + t * 100, width: 34 * (1 - t) + 10, height: 34 * (1 - t) + 10, borderRadius: "50%", background: "rgba(180,150,150,0.3)", opacity: 1 - t, zIndex: 15 }} />; })}
        <Stamp x={806} y={306} s={Math.min(1.05, spr(lf, fr(6.2), 10, 210))} text="REWRITES EVERYTHING" c={"#A24A3E"} rot={4} />
      </>)}
    </>
  );
};

// ============================== SCENE 5 — THE SPEEDRUN (platformer parody) ==============================
const STEPS = ["CART", "PAY", "CONFIRM"];
const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const runP = over(lf, fr(0.4), fr(3.4), Easing.inOut(Easing.cubic));
  const heroX = 120 + runP * 640;
  const brokenIdx = 1;
  const fixAt = fr(2.7);
  const fixed = lf >= fixAt + 8;
  const passAt = fr(4.4);
  const passS = Math.min(1.1, spr(lf, passAt, 9, 220));
  const tilesX = [250, 490, 730];
  const blocksX = [310, 550];
  return (
    <>
      {/* night level: stars, parallax hills, glowing course */}
      {Array.from({ length: 16 }).map((_, i) => <div key={`st${i}`} style={{ position: "absolute", left: seed(i) * 1000, top: 40 + seed(i * 2) * 240, width: 4, height: 4, borderRadius: "50%", background: "rgba(210,228,255,0.8)", opacity: 0.4 + Math.sin(lf / 12 + i) * 0.35 }} />)}
      {/* pixel moon */}
      <div style={{ position: "absolute", right: 90, top: 76, width: 110, height: 110, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, #F4F6E8, #C8CFAE 72%)", boxShadow: "0 0 56px rgba(240,246,220,0.5)", zIndex: 3 }} />
      {[0, 1, 2].map((i) => <div key={`h${i}`} style={{ position: "absolute", left: 40 + i * 360 - heroX * 0.12, bottom: 150, width: 300, height: 190, borderRadius: "50% 50% 0 0", background: "linear-gradient(180deg, #2E4468, #1E2C48)", border: "3px solid rgba(120,170,240,0.25)", borderBottom: "none", zIndex: 3 }} />)}
      {[0, 1].map((i) => <div key={`c${i}`} style={{ position: "absolute", left: 160 + i * 420 - heroX * 0.24, top: 110 + i * 46, width: 96, height: 32, borderRadius: 18, background: "rgba(210,225,250,0.3)", zIndex: 4 }} />)}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: "linear-gradient(180deg,#1A2440,#0E1428)", borderTop: "5px solid rgba(110,180,242,0.5)" }}>
        {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: "absolute", left: i * 90 - (heroX * 0.5) % 90, top: 10, width: 74, height: 60, border: "2.5px solid rgba(110,180,242,0.2)", borderRadius: 4 }} />)}
      </div>
      {/* level HUD: world tag + coin counter */}
      <div style={{ position: "absolute", left: 40, top: 62, display: "inline-flex", alignItems: "center", gap: 12, padding: "6px 15px", borderRadius: 999, background: "rgba(10,14,28,0.72)", border: "1.5px solid rgba(110,180,242,0.55)", zIndex: 32 }}>
        <span style={{ fontFamily: mono, fontSize: 17, letterSpacing: 1.5, color: "rgba(180,210,250,0.8)" }}>WORLD 5-5</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><CoinPix s={22} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: "#F2C14E" }}>× {blocksX.filter((b) => heroX > b - 10).length}</span></span>
      </div>
      {/* ? blocks that pop coins */}
      {blocksX.map((bx, i) => { const hit = heroX > bx - 10; const coinP = hit ? Math.min(1, (heroX - (bx - 10)) / 70) : 0; return (
        <React.Fragment key={`q${i}`}>
          <div style={{ position: "absolute", left: bx - 33, top: 300 + (coinP > 0 && coinP < 0.4 ? -12 : 0), width: 66, height: 66, borderRadius: 8, background: hit ? "#6E5A28" : grad("#F2C24E", "#C9932A"), border: "3.5px solid #17171C", boxShadow: hit ? "none" : "0 0 18px rgba(242,194,78,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: hit ? "rgba(255,255,255,0.35)" : "#7A5410", zIndex: 11 }}>?</div>
          {coinP > 0 && coinP < 1 && <div style={{ position: "absolute", left: bx - 26, top: 300 - coinP * 130, transform: `scale(${1 - coinP * 0.35})`, opacity: 1 - coinP, zIndex: 15 }}><CoinPix s={52} /></div>}
        </React.Fragment>); })}
      {/* the course tiles */}
      {STEPS.map((s, i) => { const reached = heroX > tilesX[i] - 40; const isBroken = i === brokenIdx && !fixed; const green = reached && !isBroken; return (
        <div key={i} style={{ position: "absolute", left: tilesX[i] - 70, bottom: 132, width: 140, height: 64, borderRadius: 10, background: isBroken ? "#3A1512" : green ? "rgba(63,158,116,0.95)" : "rgba(20,30,52,0.9)", border: `3px solid ${isBroken ? "#C44A3A" : green ? "#7FE0B4" : "rgba(90,160,222,0.4)"}`, transform: isBroken ? `rotate(${Math.sin(lf * 3) * 2}deg) translateY(6px)` : "none", boxShadow: green ? "0 0 20px rgba(63,158,116,0.6)" : isBroken ? "0 0 16px rgba(196,74,58,0.6)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 19, color: green ? "#0E2418" : isBroken ? "#F0A9A0" : "rgba(170,200,240,0.7)", zIndex: 12 }}>{green ? "✓ " + s : isBroken ? "✗ " + s : s}</div>); })}
      {/* broken-block sparks */}
      {!fixed && lf > fr(1.8) && Array.from({ length: 4 }).map((_, i) => { const t = ((lf / 14 + seed(i)) % 1); return <div key={`sp${i}`} style={{ position: "absolute", left: tilesX[brokenIdx] - 20 + seed(i * 2) * 50, bottom: 196 + t * 30, width: 5, height: 5, background: "#F2903E", opacity: 1 - t, zIndex: 13 }} />; })}
      {/* the speedrunner */}
      <div style={{ position: "absolute", left: heroX - 80, bottom: 138, width: 160, zIndex: 20 }}>
        <Mascot lf={lf} size={160} nodAmp={5} nodSpeed={4.2} gaze={6} shock={lf > fixAt - 8 && lf < fixAt + 6 ? 0.3 : 0} cheer={lf >= passAt ? 0.7 : 0} />
        {lf > fixAt - 10 && lf < fixAt + 12 && <div style={{ position: "absolute", right: -16, top: 52, transform: `rotate(${Math.sin(lf) * 24}deg)`, zIndex: 22 }}><Wrench s={46} /></div>}
        {runP > 0.04 && runP < 0.96 && [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: -34 - k * 22, top: 64 + k * 20, width: 38, height: 5, borderRadius: 3, background: "rgba(200,220,255,0.4)", zIndex: 4 }} />)}
      </div>
      {fixed && lf < fixAt + 26 && <Sparkles lf={lf} at={2.97} x={tilesX[brokenIdx]} y={560} n={10} spread={130} colors={[GREEN, "#fff"]} dur={0.7} />}
      {/* flagpole finish */}
      <div style={{ position: "absolute", left: 900, bottom: 140, width: 8, height: 330, background: "linear-gradient(180deg,#8A94A8,#4A5468)", zIndex: 10 }} />
      <div style={{ position: "absolute", left: 908, bottom: 140 + 240 - Math.min(1, Math.max(0, passS)) * 150, width: 74, height: 48, background: GREEN, clipPath: "polygon(0 0, 100% 24%, 0 48%)", boxShadow: "0 0 16px rgba(63,158,116,0.7)", zIndex: 11 }} />
      <div style={{ position: "absolute", left: 878, bottom: 128, width: 56, height: 16, background: "#4A5468", borderRadius: 3, zIndex: 10 }} />
      {lf >= passAt && (<>
        <Stamp x={820} y={330} s={passS} text="PASS" c={GREEN} />
        <Sparkles lf={lf} at={4.5} x={880} y={420} n={18} spread={260} colors={[GREEN, GOLD, "#fff"]} dur={1.0} />
        <Confetti lf={lf} n={22} colors={[GREEN, GOLD, "#FCEDDD"]} top={-10} h={780} />
      </>)}
      {/* GitHub repo header card */}
      <RepoCard lf={lf} delay={fr(0.7)} owner="microsoft" repo="playwright-mcp" stars="13k" tag="self-testing" accent="#8FD0F0" />
    </>
  );
};

// ============================== SCENE 6 — CTA (light finale, gauntlet callback) ==============================
const CTA_SKILLS = ["Superdesign", "Superpowers", "Security", "Karpathy", "Playwright"];
const PowersCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const kw = Math.min(1.08, spr(lf, fr(0.1), 11, 200));
  const cta = Math.min(1.06, spr(lf, fr(1.3), 12, 200));
  const heroS = Math.min(1.08, spr(lf, fr(0.5), 11, 200));
  const ctaBreath = 1 + Math.sin(lf / 9) * 0.02;
  const cx = 506;
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H, borderRadius: 36, background: "linear-gradient(158deg, #FBF6EC 0%, #F3E9D8 58%, #F5EAF0 100%)", boxShadow: SH, overflow: "hidden", border: "2px solid rgba(210,114,78,0.35)" }}>
      {/* stage: crossing gold beams + violet hero halo + rotating rays */}
      <div style={{ position: "absolute", left: "50%", top: -40, width: 860, height: 520, marginLeft: -430, background: "radial-gradient(ellipse 42% 90% at 50% 0%, rgba(231,178,76,0.34), transparent 66%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 300, width: 520, height: 420, marginLeft: -260, background: "radial-gradient(ellipse, rgba(150,90,210,0.28), transparent 66%)", zIndex: 2 }} />
      {Array.from({ length: 16 }).map((_, i) => <div key={`r${i}`} style={{ position: "absolute", left: cx, top: 430, width: 1100, height: 9, marginLeft: -550, marginTop: -4, background: "linear-gradient(90deg, transparent 44%, rgba(231,178,76,0.14) 50%, transparent 56%)", transformOrigin: "50% 50%", transform: `rotate(${i * 22.5 + lf * 0.5}deg)`, zIndex: 1 }} />)}
      <SpotCone x={cx} top={0} topW={80} botW={380} h={580} color="rgba(255,246,220,0.12)" />
      {/* POWERS wordmark on a marquee-bulb plate */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 34, display: "flex", justifyContent: "center", transform: `scale(${kw})`, zIndex: 8 }}>
        <div style={{ position: "relative", padding: "16px 44px", borderRadius: 22, background: "linear-gradient(158deg, #FFF9EE, #F6E9D2)", border: "4px solid #E0B24C", boxShadow: "0 22px 50px -18px rgba(120,70,20,0.5), 0 0 40px rgba(231,178,76,0.35)" }}>
          {Array.from({ length: 24 }).map((_, i) => { const [x, y] = rectPt(i / 24, 100, 100); const lit = (i + Math.floor(lf / 2)) % 24 < 5; return <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 11, height: 11, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: lit ? "#FFE9B0" : "#D9A93A", boxShadow: lit ? "0 0 10px #FFE9B0" : "none" }} />; })}
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 106, color: CLAYD, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 5px 0 rgba(150,60,30,0.25)" }}>POWERS</div>
        </div>
      </div>
      {/* the 5-skill recap: evenly-spaced numbered gem chips */}
      {CTA_SKILLS.map((sk, i) => { const s = Math.min(1.06, spr(lf, fr(0.5) + i * 3, 12, 210)); if (s < 0.02) return null; const w = 182; const x = cx + (i - 2) * (w + 6); return (
        <div key={i} style={{ position: "absolute", left: x - w / 2, top: 222, width: w, transform: `translateY(${(1 - s) * 24}px) scale(${s})`, opacity: Math.min(1, s * 1.4), zIndex: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
          <div style={{ transform: `translateY(${bob(lf, 4, 44, i * 0.2)}px)` }}><Gem s={48} c={GEMS5[i]} /></div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 6px", borderRadius: 999, background: "#fff", border: `2px solid ${GEMS5[i]}`, boxShadow: "0 8px 18px -8px rgba(60,40,20,0.4)", whiteSpace: "nowrap" }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: GEMS5[i], color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: INK }}>{sk}</span>
          </div>
        </div>); })}
      {/* the purple THANOS hero returns, holding the completed gauntlet */}
      <div style={{ position: "absolute", left: cx, top: 388, width: 8, transform: "translateX(-50%)", zIndex: 6 }}>
        <div style={{ position: "absolute", left: -118, top: 0, width: 236, transform: `scale(${heroS})`, transformOrigin: "50% 100%", filter: "drop-shadow(0 0 26px rgba(168,85,247,0.65))" }}>
          <Mascot lf={lf} size={236} nodAmp={3.4} nodSpeed={8} tint={THANOS} cheer={0.75 + Math.max(0, Math.sin(lf / 6)) * 0.25} gaze={2} />
          <div style={{ position: "absolute", right: -58, top: -52, transform: `rotate(-8deg) scale(1.05)`, zIndex: 8 }}><Gauntlet s={150} gems={5} snap={0.6 + Math.max(0, Math.sin(lf / 6)) * 0.4} lf={lf} /></div>
          {Array.from({ length: 5 }).map((_, k) => { const a = (k / 5) * Math.PI * 2 + lf / 9; return <div key={k} style={{ position: "absolute", left: 196 + Math.cos(a) * 26, top: -8 + Math.sin(a) * 26, width: 4, height: 20 + Math.sin(lf / 3 + k) * 7, background: "linear-gradient(180deg, #D8A8FF, transparent)", transform: `rotate(${(a * 180) / Math.PI}deg)`, opacity: 0.8, borderRadius: 2 }} />; })}
        </div>
      </div>
      <Sparkles lf={lf} at={0.4} x={cx} y={360} n={22} spread={420} colors={["#D8A8FF", GOLD, "#fff", GREEN]} dur={1.1} />
      {/* comment pill */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 632, display: "flex", justifyContent: "center", transform: `scale(${cta * ctaBreath})`, zIndex: 9 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "15px 32px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), border: "2.5px solid #F3B292", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 35, color: "#fff", boxShadow: "0 0 34px rgba(233,130,92,0.6)" }}>comment <span style={{ color: "#FFE9B0" }}>POWERS</span> for the guide</span>
      </div>
      {/* cheering mini-crowd along the base */}
      {[150, 300, 712, 862].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x - 48, bottom: 40, width: 96, zIndex: 4 }}>
          <Mascot lf={lf + i * 5} size={96} cheer={1} nodAmp={3.8} nodSpeed={7 + i} gaze={x < cx ? 4 : -4} />
        </div>
      ))}
      <Confetti lf={lf} n={50} colors={[CLAY, GOLD, "#B98AE0", GREEN, "#FCEDDD"]} top={-30} h={860} />
    </div>
  );
};

// ============================== studio bg (cream frame around the dark panel) ==============================
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

const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = over(f, 0, fr(0.45), Easing.out(Easing.cubic));
  const out = 1 - over(f, fr(L[1] - 0.3), fr(0.3));
  if (out <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -18}px)` }}>
      <div style={{ display: "inline-block", textAlign: "center", padding: "20px 46px", borderRadius: 30, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 22px 52px -12px rgba(20,26,45,0.48)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 56, color: INK, letterSpacing: "0.005em", lineHeight: 1.04, display: "block" }}>CLAUDE <span style={{ color: RED }}>ERASED</span> MY<br />DIGITAL IDENTITY</span>
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
  const f = useCurrentFrame(); const t = f / FPS; const VIRT = L[6]; const p = Math.min(1, t / VIRT);
  const marks = [L[1], L[2], L[3], L[4], L[5]]; const STARS = [4.51, 30.21, 39.65]; const PELLETS = [1.0, 3.0, 6.11, 11.11, 13.62, 18.75, 23.44, 28.21, 33.46, 39.35, 45.69, 48.27];
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
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[6] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap" }}>{"★ " + score}</div>
      </div>
      {(() => { const done = ramp(t, VIRT - 2.4, VIRT); const locked = t >= VIRT + 0.1; return (
        <div style={{ position: "absolute", right: 2, top: -20, width: 92, height: 92, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `radial-gradient(circle, ${locked ? GREEN : GOLD}${done > 0.3 ? "88" : "40"}, transparent 66%)`, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${locked ? 1.08 : 0.86 + done * 0.18})` }}>
            <svg width={56} height={62} viewBox="0 0 56 62"><path d="M28 2 L52 12 V30 C52 46 41 56 28 60 C15 56 4 46 4 30 V12 Z" fill={locked ? GREEN : "#2A3550"} stroke={locked ? "#9FE6C2" : GOLD} strokeWidth={3} />{locked ? <path d="M18 30 l7 8 l14 -16" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /> : <rect x={22} y={26} width={12} height={14} rx={2} fill={GOLD} />}</svg>
          </div>
          {locked && <div style={{ position: "absolute", left: 46, top: 46 }}><Sparkles lf={f} at={VIRT + 0.1} x={0} y={0} n={12} spread={90} colors={[GREEN, "#fff", GOLD]} dur={0.9} /></div>}
        </div>); })()}
    </div>
  );
};

// ============================== MAIN ==============================
const PowersReelBody: React.FC<{ Hook: React.FC<{ lf: number }>; HookSfx: React.ReactNode }> = ({ Hook, HookSfx }) => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.85, 4.55, L[1] + 3.8, L[2] + 2.5, L[3] + 4.5, L[4] + 3.5, L[5] + 4.4, L[6] + 0.3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [Hook, S1, S2, S3, S4, S5];
  const LABELS = ["install these 5", "superdesign.tsx", "superpowers.md", "security-audit.md", "karpathy-skill.md", "playwright.spec.ts"];
  const TINTS = ["rgba(231,178,76,0.36)", "rgba(158,123,200,0.32)", "rgba(63,158,116,0.32)", "rgba(220,110,60,0.34)", "rgba(120,200,180,0.3)", "rgba(90,160,222,0.32)"];
  const AMB = ["rgba(231,181,75,0.15)", "rgba(158,123,200,0.11)", "rgba(63,158,116,0.12)", "rgba(226,110,50,0.13)", "rgba(120,200,180,0.10)", "rgba(90,160,222,0.11)"];
  const BASES: [string, string][] = [["#151019", "#0A0712"], ["#191223", "#0D0916"], ["#0D1A15", "#070F0A"], ["#1E1210", "#0F0806"], ["#0E1B1E", "#071013"], ["#131A2C", "#0A0E1A"]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_purge.wav")} />
      <Audio loop src={staticFile("erase_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CUT) - 20, fr(CUT)], [0.36, 0.36, 0.36, 0.12], { extrapolateRight: "clamp" })} />
      {/* ===== SFX: hook (swappable per variant) ===== */}
      {HookSfx}
      {/* ===== scene-cut risers + impacts ===== */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}>
          <Sfx at={tt - 1.5} src={i === 2 || i === 5 ? "metal_riser.wav" : "lib_riser.wav"} v={i === 5 ? 0.45 : 0.3} dur={1.5} />
          <Sfx at={tt} src={["swooshup.wav", "lib_pop.wav", "lib_boom.wav", "sub.wav", "swish.wav", "lib_magic_reveal.wav"][i]} v={0.38} dur={0.7} />
        </React.Fragment>
      ))}
      {/* ===== S1 painter ===== */}
      {[1.0, 1.45, 1.9].map((d, i) => <React.Fragment key={`br${i}`}><Sfx at={L[1] + d} src="swish.wav" v={0.3} dur={0.4} /><Sfx at={L[1] + d + 0.05} src="camera-shutter.mp3" v={0.22} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[1] + 3.8} src="lib_magic_reveal.wav" v={0.4} dur={1.0} />
      <Sfx at={L[1] + 3.85} src="sparkle.wav" v={0.3} dur={0.9} />
      <Sfx at={L[1] + 3.95} src="ding.wav" v={0.3} dur={0.5} />
      {[5.2, 5.4, 5.6].map((d, i) => <Sfx key={`wl${i}`} at={L[1] + d} src="lib_pop.wav" v={0.24} dur={0.3} />)}
      <Sfx at={L[1] + 6.6} src="swish.wav" v={0.32} dur={0.4} />
      <Sfx at={L[1] + 6.9} src="bonk.mp3" v={0.42} dur={0.6} />
      <Sfx at={L[1] + 7.2} src="lib_correct.wav" v={0.3} dur={0.6} />
      {/* ===== S2 assemble ===== */}
      <Sfx at={L[2] + 3.2} src="construction.wav" v={0.18} dur={2.6} />
      {[0.5, 0.9, 1.3, 1.7, 2.1].map((d, i) => <React.Fragment key={`ld${i}`}><Sfx at={L[2] + d} src="impact.wav" v={0.3 + i * 0.04} dur={0.5} /><Sfx at={L[2] + d} src="lib_whoosh_fast.wav" v={0.2} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[2] + 2.5} src="lib_cinematic_hit.wav" v={0.45} dur={1.0} />
      <Sfx at={L[2] + 2.5} src="lib_boom.wav" v={0.28} dur={0.9} />
      {[3.6, 4.2, 4.8].map((d, i) => <Sfx key={`tk${i}`} at={L[2] + d} src="tick.wav" v={0.22} dur={0.3} />)}
      {[3.4, 4.0, 4.6].map((d, i) => <Sfx key={`bw${i}`} at={L[2] + d} src="lib_whoosh.wav" v={0.2} dur={0.3} />)}
      <Sfx at={L[2] + 5.6} src="alarm.wav" v={0.24} dur={0.5} />
      <Sfx at={L[2] + 5.7} src="fling.wav" v={0.4} dur={0.6} />
      <Sfx at={L[2] + 6.0} src="crash.wav" v={0.32} dur={0.7} />
      <Sfx at={L[2] + 8.2} src="chimehi.wav" v={0.4} dur={0.9} />
      <Sfx at={L[2] + 8.2} src="lib_confirm.wav" v={0.32} dur={0.6} />
      <Sfx at={L[2] + 8.3} src="crowd_cheer.wav" v={0.18} dur={1.4} />
      {/* ===== S3 wizard vs balrog ===== */}
      <Sfx at={L[3] + 1.0} src="metal_riser.wav" v={0.4} dur={2.4} />
      <Sfx at={L[3] + 1.2} src="sub.wav" v={0.34} dur={1.6} />
      <Sfx at={L[3] + 4.5} src="lib_boom.wav" v={0.6} dur={1.2} />
      <Sfx at={L[3] + 4.55} src="screech.wav" v={0.34} dur={0.9} />
      <Sfx at={L[3] + 4.6} src="shimmer.wav" v={0.36} dur={1.2} />
      <Sfx at={L[3] + 4.6} src="cinematic-hit.mp3" v={0.34} dur={1.0} />
      <Sfx at={L[3] + 6.4} src="impact.wav" v={0.5} dur={0.6} />
      <Sfx at={L[3] + 6.4} src="key.wav" v={0.3} dur={0.5} />
      <Sfx at={L[3] + 6.5} src="chimelo.wav" v={0.3} dur={0.8} />
      <Sfx at={L[3] + 6.6} src="sparkle.wav" v={0.28} dur={0.8} />
      <Sfx at={L[3] + 7.8} src="swooshdn.wav" v={0.3} dur={0.7} />
      {/* ===== S4 samurai: focus -> reticle lock -> one cut -> berserker detonation ===== */}
      <Sfx at={L[4] + 0.6} src="shimmer.wav" v={0.24} dur={1.6} />
      <Sfx at={L[4] + 1.7} src="sub.wav" v={0.28} dur={1.8} />
      <Sfx at={L[4] + 1.9} src="twang.wav" v={0.28} dur={0.7} />
      <Sfx at={L[4] + 2.4} src="digital-loading.wav" v={0.2} dur={1.1} />
      <Sfx at={L[4] + 3.05} src="lib_notif.wav" v={0.34} dur={0.4} />
      <Sfx at={L[4] + 3.1} src="tick.wav" v={0.32} dur={0.3} />
      <Sfx at={L[4] + 3.3} src="swish.wav" v={0.36} dur={0.4} />
      <Sfx at={L[4] + 3.5} src="slash.wav" v={0.6} dur={0.6} />
      <Sfx at={L[4] + 3.52} src="cinematic-hit.mp3" v={0.34} dur={0.9} />
      <Sfx at={L[4] + 3.6} src="ding.wav" v={0.38} dur={0.5} />
      <Sfx at={L[4] + 3.65} src="sparkle.wav" v={0.28} dur={0.7} />
      <Sfx at={L[4] + 3.7} src="lib_confirm.wav" v={0.3} dur={0.5} />
      <Sfx at={L[4] + 5.0} src="construction.wav" v={0.22} dur={2.0} />
      <Sfx at={L[4] + 5.5} src="rocket_explode.wav" v={0.4} dur={1.0} />
      <Sfx at={L[4] + 5.55} src="crash.wav" v={0.36} dur={0.8} />
      <Sfx at={L[4] + 6.4} src="crash.wav" v={0.26} dur={0.8} />
      {/* ===== S5 speedrun ===== */}
      <Sfx at={L[5] + 0.4} src="sand-steps.mp3" v={0.2} dur={3.4} />
      <Sfx at={L[5] + 0.3} src="data.wav" v={0.14} dur={3.6} />
      {[0.9, 1.9].map((d, i) => <React.Fragment key={`co${i}`}><Sfx at={L[5] + d} src="blip3.wav" v={0.32} dur={0.4} /><Sfx at={L[5] + d + 0.02} src="ding.wav" v={0.24} dur={0.4} /><Sfx at={L[5] + d + 0.04} src="lib_notif.wav" v={0.2} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[5] + 1.7} src="crash.wav" v={0.24} dur={0.5} />
      <Sfx at={L[5] + 2.7} src="lib_click.wav" v={0.3} dur={0.3} />
      <Sfx at={L[5] + 2.9} src="resolve.wav" v={0.38} dur={0.8} />
      <Sfx at={L[5] + 4.4} src="swooshup.wav" v={0.42} dur={0.6} />
      <Sfx at={L[5] + 4.45} src="lib_confirm.wav" v={0.34} dur={0.6} />
      <Sfx at={L[5] + 4.5} src="crowd_cheers2.wav" v={0.22} dur={1.4} />
      {/* ===== CTA ===== */}
      <Sfx at={L[6] + 0.1} src="lib_magic_reveal.wav" v={0.42} dur={1.0} />
      <Sfx at={L[6] + 0.2} src="sparkle.wav" v={0.34} dur={1.0} />
      <Sfx at={L[6] + 0.3} src="chimehi.wav" v={0.38} dur={1.0} />
      <Sfx at={L[6] + 0.4} src="crowd_cheer.wav" v={0.22} dur={2.0} />
      {[0.5, 0.62, 0.74, 0.86, 0.98].map((d, i) => <Sfx key={`cp${i}`} at={L[6] + d} src="lib_pop.wav" v={0.24} dur={0.3} />)}

      <StudioBg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
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
        {scene(6) ? <PowersCTA lf={frame - Lf[6]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};

// ============================== HOOK VARIANT A — THE POWER METER (10% -> 10X) ==============================
const S0A: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const warnAt = fr(0.85);
  const warn = Math.min(1.12, spr(lf, warnAt, 9, 250));
  const warnGone = over(lf, fr(2.3), fr(0.3), Easing.in(Easing.cubic));
  const shake = lf >= warnAt && lf < warnAt + 10 ? Math.sin(lf * 3.4) * 7 * (1 - (lf - warnAt) / 10) : 0;
  const batAt = [fr(2.7), fr(3.0), fr(3.3), fr(3.6), fr(3.9)];
  const bats = batAt.filter((a) => lf >= a).length;
  const slamAt = fr(4.3);
  const slam = over(lf, slamAt, fr(0.55), Easing.out(Easing.back(1.5)));
  const maxed = slam > 0.5;
  const baseVal = 0.1 + Math.min(5, bats) * 0.045 + (bats < 5 ? Math.sin(lf / 2.5) * 0.012 : 0);   // sputter, climbs as batteries load
  const val = slam > 0 ? interpolate(slam, [0, 1], [baseVal, 1.0], { easing: Easing.out(Easing.cubic) }) : baseVal;
  const needleRot = (val - 0.5) * 168;
  const cxg = 170, cyg = 176, r = 150;
  const ang = 180 - val * 180;
  const px = cxg + r * Math.cos(ang * Math.PI / 180), py = cyg - r * Math.sin(ang * Math.PI / 180);
  const t100c = Math.min(118, Math.floor(over(lf, slamAt + 8, fr(0.9)) * 118));
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
        {/* ambient */}
        <div style={{ position: "absolute", left: cx - 260, top: 60, width: 520, height: 360, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${maxed ? "231,178,76" : "196,74,58"},${0.14 + slam * 0.2}), transparent 66%)`, zIndex: 1 }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 180, background: "linear-gradient(180deg,#0E0C14,#070510)", clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)", zIndex: 2 }} />
        {Array.from({ length: 28 }).map((_, i) => { const [x, y] = rectPt(i / 28, 964, 732); const lit = (i + Math.floor(lf / 1.6)) % 28 < 5; return <div key={`mb${i}`} style={{ position: "absolute", left: 24 + x, top: 30 + y, width: 9, height: 9, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: lit ? "#FFE9B0" : "rgba(231,178,76,0.22)", zIndex: 2 }} />; })}
        {/* the big power gauge */}
        <div style={{ position: "absolute", left: cx - 190, top: 62, width: 380, zIndex: 6 }}>
          <svg viewBox="0 0 340 212" width={380} height={238} style={{ overflow: "visible" }}>
            <path d={`M ${cxg - r} ${cyg} A ${r} ${r} 0 0 1 ${cxg + r} ${cyg}`} fill="none" stroke="#242832" strokeWidth={28} strokeLinecap="round" />
            <path d={`M ${cxg - r} ${cyg} A ${r} ${r} 0 0 1 ${px} ${py}`} fill="none" stroke={maxed ? "#3F9E74" : (val > 0.55 ? "#E7B24C" : "#C44A3A")} strokeWidth={28} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 ${6 + slam * 16}px ${maxed ? "#3F9E74" : "#E7B24C"})` }} />
            {Array.from({ length: 11 }).map((_, k) => { const a = 180 - k * 18; const x1 = cxg + (r - 20) * Math.cos(a * Math.PI / 180), y1 = cyg - (r - 20) * Math.sin(a * Math.PI / 180); const x2 = cxg + (r + 4) * Math.cos(a * Math.PI / 180), y2 = cyg - (r + 4) * Math.sin(a * Math.PI / 180); return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.45)" strokeWidth={k % 5 === 0 ? 4 : 2} />; })}
            <g transform={`rotate(${needleRot} ${cxg} ${cyg})`}>
              <polygon points={`${cxg - 9},${cyg} ${cxg + 9},${cyg} ${cxg},${cyg - r + 22}`} fill="#F4EEE2" style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.85))" }} />
              <circle cx={cxg} cy={cyg} r={17} fill="#3A4152" stroke="#F4EEE2" strokeWidth={3} />
            </g>
            <text x={cxg - r + 6} y={cyg + 34} textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize={17} fill="#C44A3A">10%</text>
            <text x={cxg + r - 6} y={cyg + 34} textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize={17} fill="#3F9E74">MAX</text>
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, top: 138, textAlign: "center" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: maxed ? 84 : 60, color: maxed ? "#F2C14E" : "#E07A5A", textShadow: maxed ? "0 0 34px rgba(231,178,76,0.85)" : "none", transform: `scale(${maxed ? Math.min(1.15, spr(lf, slamAt + 2, 9, 210)) : 1})`, display: "inline-block" }}>{maxed ? "10X" : `${Math.round(val * 100)}%`}</span>
            <div style={{ fontFamily: mono, fontSize: 17, letterSpacing: 2, color: "rgba(210,220,235,0.55)", marginTop: -4 }}>{maxed ? "CLAUDE CODE · MAX POWER" : "CLAUDE CODE · POWER"}</div>
          </div>
        </div>
        {/* 5 skill batteries slam in */}
        {batAt.map((at, i) => { const on = lf >= at; const ap = Math.min(1.12, spr(lf, at, 10, 220)); return (
          <div key={i} style={{ position: "absolute", left: cx - 170 + i * 68, top: 430, width: 54, height: 100, zIndex: 8, transform: `translateY(${on ? 0 : -40}px) scale(${on ? ap : 0.2})`, opacity: on ? 1 : 0.12 }}>
            <div style={{ position: "absolute", left: 19, top: -9, width: 16, height: 9, borderRadius: "3px 3px 0 0", background: on ? GEMS5[i] : "#3A4152" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 54, height: 100, borderRadius: 9, background: on ? `linear-gradient(180deg, ${GEMS5[i]}, rgba(0,0,0,0.35))` : "#1C2028", border: `2.5px solid ${on ? "#fff" : "#3A4152"}`, boxShadow: on ? `0 0 18px ${GEMS5[i]}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{on ? "⚡" : ""}</div>
          </div>); })}
        {/* the hero at the terminal, powering up */}
        <div style={{ position: "absolute", left: cx - 110, bottom: 74, width: 220, zIndex: 9, filter: maxed ? "drop-shadow(0 0 24px rgba(231,178,76,0.75))" : "none" }}>
          <Mascot lf={lf} size={220} nodAmp={maxed ? 3.6 : 2} nodSpeed={7} shock={warn > 0.3 && lf < fr(2.4) ? 0.5 : 0} cheer={maxed ? 0.8 + Math.max(0, Math.sin(lf / 6)) * 0.2 : 0} tint={maxed ? lerpHex("#D97757", "#E7B24C", slam) : "#D97757"} />
        </div>
        {maxed && <div style={{ position: "absolute", left: cx - 170, bottom: 90, width: 340, height: 60, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(231,178,76,0.5), transparent 70%)", zIndex: 5 }} />}
        {/* tested-100 counter after the max */}
        {lf >= slamAt + 6 && <div style={{ position: "absolute", left: cx - 90, top: 40, transform: "translateX(-50%)", zIndex: 30 }}><span style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, color: "rgba(210,220,235,0.7)" }}>tested </span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: GOLD }}>{t100c}</span></div>}
        {/* warning slam */}
        {lf >= warnAt && warnGone < 0.98 && (
          <div style={{ position: "absolute", left: cx - 175, top: 300, transform: `scale(${warn * (1 - warnGone)}) rotate(${-3 + Math.sin(lf * 2.6) * 2}deg)`, opacity: 1 - warnGone, zIndex: 44 }}>
            <div style={{ padding: "10px 26px", borderRadius: 14, background: "#B23A2E", border: "4px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#fff", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.55)", whiteSpace: "nowrap" }}>⚠ RUNNING AT 10%</div>
          </div>
        )}
        <Sparkles lf={lf} at={4.35} x={cx} y={300} n={22} spread={360} colors={[GOLD, "#fff", GREEN, "#F3E3A6"]} dur={1.0} />
        {slam > 0.2 && <Confetti lf={lf} n={26} colors={[GOLD, "#F3E3A6", "#FCEDDD"]} top={-20} h={820} />}
      </div>
      {lf >= warnAt && lf < warnAt + 6 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 40%, rgba(178,40,30,0.5) 100%)", opacity: Math.max(0, 1 - (lf - warnAt) / 6), zIndex: 46 }} />}
      {lf >= slamAt && lf < slamAt + 6 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E0", opacity: 0.62 * (1 - (lf - slamAt) / 6), zIndex: 50 }} />}
    </>
  );
};

// ============================== HOOK VARIANT B — 100 TESTED, 5 SURVIVE ==============================
const WIN = [16, 33, 50, 66, 81];   // the 5 champion indices in the 96-card grid
const S0B: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;
  const cols = 12, rowsN = 8, N = cols * rowsN;
  const gx0 = 62, gy0 = 88, cw = 74, ch = 44;
  const narrowAt = fr(2.1);
  const narrow = over(lf, narrowAt, fr(1.2), Easing.inOut(Easing.cubic));   // losers fall, winners fly to center
  const revealAt = fr(3.7);
  const reveal = Math.min(1.12, spr(lf, revealAt, 10, 210));
  const counted = Math.min(118, Math.floor(over(lf, fr(0.2), fr(1.1)) * 118));
  const centerX = (i: number) => cx - 2 * 176 + i * 176;                    // 5 champions spaced across
  return (
    <>
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "linear-gradient(180deg,#0C1018,#06090F)", clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)", zIndex: 2 }} />
        {/* TESTED counter */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 34, textAlign: "center", zIndex: 30 }}>
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, letterSpacing: 2, color: "rgba(210,220,235,0.7)" }}>TESTED </span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: reveal > 0.1 ? GOLD : "#E07A5A" }}>{reveal > 0.1 ? "100+" : counted}</span>
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, color: "rgba(210,220,235,0.5)" }}> SKILLS</span>
        </div>
        {/* the 96-card test grid */}
        {Array.from({ length: N }).map((_, i) => {
          const c = i % cols, rw = Math.floor(i / cols);
          const isWin = WIN.includes(i); const wi = WIN.indexOf(i);
          const testAt = fr(0.3) + (i / N) * fr(1.0);
          const tested = lf >= testAt;
          const pop = tested ? Math.max(0, 1 - (lf - testAt) / 4) : 0;
          const hx = gx0 + c * cw, hy = gy0 + rw * ch;
          if (isWin) {
            const px = interpolate(narrow, [0, 1], [hx, centerX(wi) - 66]);
            const py = interpolate(narrow, [0, 1], [hy, 250]);
            const sc = interpolate(narrow, [0, 1], [1, 3.0]) * (reveal > 0.1 ? Math.min(1.06, spr(lf, revealAt, 11, 210)) : 1);
            return (
              <div key={i} style={{ position: "absolute", left: px, top: py, width: cw - 8, height: ch - 8, borderRadius: 8, background: `linear-gradient(160deg, ${GEMS5[wi]}, rgba(0,0,0,0.3))`, border: `2.5px solid #fff`, boxShadow: `0 0 ${10 + narrow * 22}px ${GEMS5[wi]}`, transform: `scale(${sc})`, transformOrigin: "0 0", zIndex: 20 + wi, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#fff" }}>{narrow > 0.5 ? `#${wi + 1}` : ""}</div>);
          }
          const gone = narrow;   // losers fade + drop
          if (gone >= 0.98) return null;
          return (
            <div key={i} style={{ position: "absolute", left: hx, top: hy + gone * (200 + seed(i) * 200), width: cw - 8, height: ch - 8, borderRadius: 6, background: tested ? "rgba(120,50,44,0.5)" : "#232833", border: `2px solid ${tested ? "rgba(196,74,58,0.6)" : "rgba(120,150,190,0.25)"}`, opacity: (1 - gone) * (0.9), transform: `rotate(${gone * (seed(i) - 0.5) * 80}deg) scale(${1 + pop * 0.2})`, zIndex: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "rgba(240,169,160,0.9)" }}>{tested ? "✗" : ""}</div>);
        })}
        {/* champion labels + 10X on reveal */}
        {reveal > 0.1 && WIN.map((_, wi) => (
          <div key={`lbl${wi}`} style={{ position: "absolute", left: centerX(wi) - 66, top: 372, width: 132, textAlign: "center", transform: `scale(${reveal})`, zIndex: 24 }}>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "#fff", border: `2px solid ${GEMS5[wi]}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: INK }}>{["Superdesign", "Superpowers", "Security", "Karpathy", "Playwright"][wi]}</span>
          </div>))}
        {reveal > 0.2 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", transform: `scale(${Math.min(1.14, spr(lf, revealAt + 2, 9, 210))})`, zIndex: 34 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, color: "#F2C14E", textShadow: "0 5px 0 rgba(90,50,10,0.5), 0 0 44px rgba(231,178,76,0.7)" }}>THE 5</span>
          </div>)}
        {/* the hero reacting */}
        <div style={{ position: "absolute", left: cx - 100, bottom: 66, width: 200, zIndex: 22, filter: reveal > 0.2 ? "drop-shadow(0 0 20px rgba(231,178,76,0.7))" : "none" }}>
          <Mascot lf={lf} size={200} nodAmp={reveal > 0.2 ? 3.6 : 2.2} nodSpeed={7} shock={lf > fr(0.4) && lf < fr(1.6) ? 0.4 : 0} cheer={reveal > 0.2 ? 0.8 : 0} tint={reveal > 0.2 ? lerpHex("#D97757", "#E7B24C", reveal - 0.2) : "#D97757"} />
        </div>
        <Sparkles lf={lf} at={3.75} x={cx} y={250} n={24} spread={420} colors={[GOLD, "#fff", GREEN, "#C89AF0"]} dur={1.1} />
        {reveal > 0.2 && <Confetti lf={lf} n={28} colors={[GOLD, "#F3E3A6", GREEN, "#FCEDDD"]} top={-20} h={820} />}
      </div>
      {lf >= revealAt && lf < revealAt + 6 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E0", opacity: 0.55 * (1 - (lf - revealAt) / 6), zIndex: 50 }} />}
    </>
  );
};

// ============================== hook SFX sets ==============================
const GauntletHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.55} dur={1.0} />
    <Sfx at={0.85} src="thock.wav" v={0.62} dur={0.6} />
    <Sfx at={0.85} src="bonk.mp3" v={0.4} dur={0.5} />
    <Sfx at={0.9} src="lib_boom.wav" v={0.5} dur={1.2} />
    <Sfx at={2.0} src="shimmer.wav" v={0.34} dur={1.3} />
    {[2.9, 3.2, 3.5, 3.8, 4.1].map((t, i) => (
      <React.Fragment key={`gem${i}`}>
        <Sfx at={t - 0.3} src="swooshdn.wav" v={0.26} dur={0.3} />
        <Sfx at={t} src="ice-in-glass.mp3" v={0.42} dur={0.35} />
        <Sfx at={t} src={`blip${i + 1}.wav`} v={0.26} dur={0.3} />
      </React.Fragment>
    ))}
    <Sfx at={4.15} src="lib_confirm.wav" v={0.4} dur={0.6} />
    <Sfx at={4.2} src="riser.wav" v={0.42} dur={0.9} />
    <Sfx at={4.3} src="sub.wav" v={0.3} dur={0.7} />
    <Sfx at={4.55} src="snap.wav" v={0.68} dur={0.5} />
    <Sfx at={4.58} src="rocket_explode.wav" v={0.34} dur={1.0} />
    <Sfx at={4.6} src="lib_boom.wav" v={0.58} dur={1.4} />
    <Sfx at={4.7} src="angelic.wav" v={0.36} dur={1.8} />
    <Sfx at={4.75} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);
const MeterHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.55} dur={1.0} />
    <Sfx at={0.4} src="digital-loading.wav" v={0.22} dur={2.2} />
    <Sfx at={0.85} src="alarm.wav" v={0.36} dur={0.7} />
    <Sfx at={0.85} src="thock.wav" v={0.5} dur={0.5} />
    <Sfx at={1.4} src="sub.wav" v={0.24} dur={1.2} />
    {[2.7, 3.0, 3.3, 3.6, 3.9].map((t, i) => (
      <React.Fragment key={`bat${i}`}>
        <Sfx at={t} src="thock.wav" v={0.42} dur={0.35} />
        <Sfx at={t} src={`blip${i + 1}.wav`} v={0.28} dur={0.3} />
      </React.Fragment>
    ))}
    <Sfx at={3.95} src="metal_riser.wav" v={0.42} dur={0.9} />
    <Sfx at={4.3} src="lib_boom.wav" v={0.6} dur={1.4} />
    <Sfx at={4.32} src="rocket_explode.wav" v={0.36} dur={1.0} />
    <Sfx at={4.4} src="chimehi.wav" v={0.4} dur={1.0} />
    <Sfx at={4.5} src="angelic.wav" v={0.34} dur={1.8} />
    <Sfx at={4.55} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);
const TournamentHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
    <Sfx at={0.2} src="data.wav" v={0.2} dur={1.6} />
    {[0.3, 0.5, 0.7, 0.9, 1.1, 1.3].map((t, i) => <Sfx key={`tk${i}`} at={t} src="tick.wav" v={0.24} dur={0.25} />)}
    {[0.6, 1.0, 1.4].map((t, i) => <Sfx key={`bz${i}`} at={t} src="bonk.mp3" v={0.24} dur={0.3} />)}
    <Sfx at={2.1} src="swooshdn.wav" v={0.4} dur={0.7} />
    <Sfx at={2.1} src="fling.wav" v={0.3} dur={0.6} />
    <Sfx at={3.3} src="metal_riser.wav" v={0.42} dur={0.9} />
    <Sfx at={3.7} src="lib_boom.wav" v={0.58} dur={1.4} />
    <Sfx at={3.72} src="chimehi.wav" v={0.42} dur={1.0} />
    <Sfx at={3.8} src="lib_magic_reveal.wav" v={0.4} dur={1.0} />
    <Sfx at={3.85} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);

// ============================== exports (3 hook variants over the same reel) ==============================
export const ClaudePurgeReel: React.FC = () => <PowersReelBody Hook={S0} HookSfx={GauntletHookSfx} />;
