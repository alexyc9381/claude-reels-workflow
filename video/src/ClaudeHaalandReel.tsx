import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_haaland.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, tightened VO): hook / superdesign / superpowers / security / karpathy / playwright / cta
const L = [0, 3.52, 9.62, 12.6, 18.52, 22.52, 35.4];
const Lf = L.map(fr);
const CUT = 42.78;

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

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; constr?: number; chef?: number; suit?: number; beard?: number; xeyes?: number; samurai?: number; fro?: number; capeC?: string; tint?: string; haaland?: number; angry?: number; kit?: string; england?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, constr = 0, chef = 0, suit = 0, beard = 0, xeyes = 0, samurai = 0, fro = 0, capeC, tint, haaland = 0, angry = 0, kit, england = 0 }) => {
  const C = tint || "#D97757";
  const KC = kit || "#C8102E";
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
        {/* HAALAND kit: blonde man-bun + white headband + Norway #9 shirt + red sleeves */}
        {haaland > 0 && <>
          <rect x={82} y={16} width={38} height={34} rx={14} fill="#E7C97A" /><rect x={89} y={20} width={24} height={9} rx={4} fill="#F5E0A0" /><rect x={86} y={44} width={30} height={7} fill="#C29A48" />
          <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={KC} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} /><rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={KC} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
          <rect x={34} y={100} width={132} height={46} fill={KC} /><rect x={34} y={100} width={132} height={7} fill="rgba(255,255,255,0.22)" /><rect x={34} y={140} width={132} height={6} fill="rgba(0,0,0,0.18)" /><rect x={88} y={98} width={24} height={5} fill="#F4F1E9" />
          <text x={100} y={137} textAnchor="middle" fontFamily={inter.fontFamily} fontWeight={900} fontSize={40} fill="#FFFFFF" stroke="#0E1E40" strokeWidth={2.4} paintOrder="stroke" letterSpacing="-1">9</text>
          <rect x={34} y={44} width={132} height={12} fill="#E7C97A" /><rect x={34} y={44} width={132} height={5} fill="#F5E0A0" /><rect x={34} y={44} width={12} height={22} fill="#E7C97A" /><rect x={154} y={44} width={12} height={22} fill="#E7C97A" />
          <rect x={34} y={56} width={132} height={9} fill="#F4F1E9" /><rect x={34} y={56} width={132} height={2} fill="#14264C" />
          {angry > 0 ? <>
            <rect x={60 + gaze} y={62} width={26} height={7} rx={2} fill="#151312" transform="rotate(22 74 66)" /><rect x={112 + gaze} y={62} width={26} height={7} rx={2} fill="#151312" transform="rotate(-22 126 66)" />
            <rect x={84 + gaze} y={88} width={32} height={10} rx={3} fill="#12100E" /><rect x={86 + gaze} y={90} width={28} height={3} fill="#F4EEE2" />
          </> : <><rect x={70} y={66} width={15} height={3} fill="#151312" /><rect x={116} y={66} width={15} height={3} fill="#151312" /></>}
        </>}
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
        {/* ENGLAND kit: white shirt + red St George cross badge + navy trim (the rival enemies) */}
        {england > 0 && <>
          <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill="#F4F1EA" /><rect x={166 + cheer * 4} y={armY} width={26} height={26} fill="#F4F1EA" />
          <rect x={34} y={100} width={132} height={46} fill="#F4F1EA" /><rect x={34} y={100} width={132} height={6} fill="#FFFFFF" /><rect x={34} y={140} width={132} height={6} fill="#12244A" />
          <rect x={88} y={98} width={24} height={5} fill="#12244A" />
          <rect x={90} y={110} width={20} height={20} fill="#FBFAF6" stroke="#C8102E" strokeWidth={1.5} /><rect x={97} y={110} width={6} height={20} fill="#C8102E" /><rect x={90} y={117} width={20} height={6} fill="#C8102E" />
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
          {angry > 0 && <><rect x={66 + gaze} y={68} width={23} height={22} fill="#FF3B3B" opacity={0.28} /><rect x={112 + gaze} y={68} width={23} height={22} fill="#FF3B3B" opacity={0.28} /></>}
          <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={angry > 0 ? 15 : eyeH} fill={angry > 0 ? "#FF3B3B" : "#151312"} />
          <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={angry > 0 ? 15 : eyeH} fill={angry > 0 ? "#FF3B3B" : "#151312"} />
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
// ============================== HAALAND PROPS (soft idiom) ==============================
// ============================== HAALAND PROPS + STORY MOTIFS ==============================
// ============================== EPIC PROPS + COSTUMES ==============================
const Ball: React.FC<{ s: number; rot?: number; glow?: number }> = ({ s, rot = 0, glow = 0 }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ overflow: "visible", filter: `drop-shadow(0 8px 10px rgba(0,0,0,0.45))${glow ? ` drop-shadow(0 0 ${glow}px rgba(255,150,60,0.85))` : ""}`, transform: `rotate(${rot}deg)` }}>
    <circle cx={50} cy={50} r={45} fill="#FBFAF6" /><circle cx={50} cy={50} r={45} fill="url(#bg1)" />
    <defs><radialGradient id="bg1" cx="38%" cy="32%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="70%" stopColor="#E9E4DA" /><stop offset="100%" stopColor="#C9C2B4" /></radialGradient></defs>
    <polygon points="50,30 63,40 58,56 42,56 37,40" fill="#1A1813" />
    {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1={50 + Math.cos(a) * 15} y1={50 + Math.sin(a) * 15} x2={50 + Math.cos(a) * 30} y2={50 + Math.sin(a) * 30} stroke="#2A2620" strokeWidth={3} />; })}
    <ellipse cx={40} cy={34} rx={12} ry={7} fill="rgba(255,255,255,0.6)" />
  </svg>
);
const Goal: React.FC<{ w: number; h: number; bulge?: number }> = ({ w, h, bulge = 0 }) => (
  <div style={{ position: "absolute", width: w, height: h, filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.4))" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 6, border: "8px solid #F4F1E9", borderBottom: "none" }} />
    <div style={{ position: "absolute", inset: 8, overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)", backgroundSize: "18px 18px", transform: `scale(${1 + bulge * 0.16}) translate(${bulge * 18}px, ${bulge * 8}px)`, transformOrigin: "72% 46%" }} /></div>
  </div>
);
const Trophy: React.FC<{ s: number; lf?: number }> = ({ s, lf = 0 }) => (
  <svg viewBox="0 0 180 210" width={s} height={s * 210 / 180} style={{ overflow: "visible", filter: `drop-shadow(0 0 ${18 + Math.sin(lf / 8) * 6}px rgba(231,178,76,0.75)) drop-shadow(0 14px 20px rgba(0,0,0,0.45))` }}>
    <path d="M48 28 h84 v42 a42 42 0 0 1 -84 0 z" fill="url(#tg)" stroke="#B8862A" strokeWidth={4} /><path d="M48 40 a26 26 0 0 1 -26 26 a26 26 0 0 0 26 -7 z M132 40 a26 26 0 0 0 26 26 a26 26 0 0 1 -26 -7 z" fill="#E7B24C" stroke="#B8862A" strokeWidth={3} />
    <rect x={82} y={110} width={16} height={36} fill="#C9932A" /><rect x={56} y={146} width={68} height={20} rx={5} fill="#E7B24C" stroke="#B8862A" strokeWidth={3} /><rect x={44} y={166} width={92} height={14} rx={4} fill="#C9932A" />
    <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F6E4A0" /><stop offset="100%" stopColor="#D39A2A" /></linearGradient></defs>
  </svg>
);
// flowing cape behind the hero
const Cape: React.FC<{ lf: number; w: number; h: number; c?: string; fur?: boolean }> = ({ lf, w, h, c = "#7A1A1A", fur = false }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible", filter: "drop-shadow(-8px 6px 10px rgba(0,0,0,0.4))" }}>
    <path d={`M ${w * 0.24} 6 Q ${w * 0.5} ${14 + Math.sin(lf / 8) * 6} ${w * 0.76} 6 L ${w * (0.93 + Math.sin(lf / 9) * 0.03)} ${h} Q ${w * 0.5} ${h - 24 + Math.sin(lf / 7) * 12} ${w * (0.07 + Math.sin(lf / 10) * 0.03)} ${h} Z`} fill={c} />
    {fur && <rect x={w * 0.2} y={0} width={w * 0.6} height={16} rx={8} fill="#D8CFC0" />}
  </svg>
);
const VikingHelm: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 120 90" width={s} height={s * 90 / 120} style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
    <path d="M18 60 q42 -60 84 0 z" fill="#8A929C" stroke="#5A626C" strokeWidth={4} /><rect x={16} y={56} width={88} height={12} rx={4} fill="#6A727C" />
    <rect x={55} y={30} width={10} height={34} fill="#5A626C" />
    <path d="M20 50 q-34 -18 -30 -44 q22 8 36 30 z" fill="#EDE6D6" stroke="#B8AE9A" strokeWidth={3} /><path d="M100 50 q34 -18 30 -44 q-22 8 -36 30 z" fill="#EDE6D6" stroke="#B8AE9A" strokeWidth={3} />
  </svg>
);
const GladHelm: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 110 100" width={s} height={s * 100 / 110} style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
    <path d="M20 64 q35 -56 70 0 z" fill="#C9932A" stroke="#8A6420" strokeWidth={4} /><rect x={18} y={60} width={74} height={12} rx={4} fill="#E7B24C" />
    <rect x={50} y={64} width={10} height={26} fill="#8A6420" /><rect x={38} y={64} width={4} height={20} fill="#8A6420" /><rect x={68} y={64} width={4} height={20} fill="#8A6420" />
    <path d="M55 6 q-26 6 -30 40 q20 -6 34 -30 q10 -8 -4 -10z" fill="#C44A3A" /><path d="M55 4 q26 6 30 42 q-20 -6 -34 -32z" fill="#E0644B" />
  </svg>
);
const Axe: React.FC<{ s: number; lf?: number; rear?: number }> = ({ s, lf = 0, rear = 0 }) => (
  <svg viewBox="0 0 90 160" width={s} height={s * 160 / 90} style={{ overflow: "visible", transform: `rotate(${-30 + rear * -40}deg)`, transformOrigin: "50% 90%", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
    <rect x={40} y={30} width={12} height={124} rx={4} fill="#6E5A3C" /><path d="M18 20 q40 -8 46 22 q-30 18 -46 4 z" fill="#C6CDD4" stroke="#6B7480" strokeWidth={4} /><path d="M52 20 q0 22 0 26" stroke="#8A929C" strokeWidth={3} />
  </svg>
);
const Shield: React.FC<{ s: number; kind?: string }> = ({ s, kind = "wood" }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ overflow: "visible", filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.4))" }}>
    <circle cx={50} cy={50} r={46} fill={kind === "bronze" ? "#C9932A" : "#7A5A38"} stroke={kind === "bronze" ? "#8A6420" : "#5A4426"} strokeWidth={5} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={50} y1={50} x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44} stroke={kind === "bronze" ? "#A67A1E" : "#5A4426"} strokeWidth={3} />; })}
    <circle cx={50} cy={50} r={13} fill={kind === "bronze" ? "#F6E4A0" : "#B8AE9A"} stroke="#5A4426" strokeWidth={3} />
  </svg>
);
const Longship: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 260 140" width={s} height={s * 140 / 260} style={{ overflow: "visible" }}>
    <path d="M8 96 q10 26 246 0 l-14 -22 q-108 20 -218 0 z" fill="#1A1210" />
    <path d="M8 96 q-6 -40 26 -54 q-8 24 6 32 z" fill="#1A1210" /><path d="M34 42 q-4 -14 -16 -18 q10 -2 20 8z" fill="#1A1210" />
    <rect x={120} y={20} width={6} height={56} fill="#12100E" /><path d="M126 24 q40 6 40 26 q-40 6 -40 -6z" fill="#5A2020" /><path d="M126 24 h40 M126 40 h40" stroke="#3A1010" strokeWidth={3} />
  </svg>
);
// packed coliseum tiered arches + crowd wave
const Coliseum: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#5A3A24 0%,#3A2416 42%,#C9A06A 42%,#A87E4A 60%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 300, overflow: "hidden" }}>
      {[0, 1, 2].map((tier) => <div key={tier} style={{ position: "absolute", left: -20, right: -20, top: tier * 60, height: 58, display: "flex" }}>{Array.from({ length: 16 }).map((_, i) => <div key={i} style={{ flex: 1, margin: "0 3px", borderRadius: "40% 40% 0 0", background: "#3A2A1C", borderTop: "4px solid #6E5236", boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.3)" }} />)}</div>)}
      {/* crowd wave dots */}
      {Array.from({ length: 120 }).map((_, i) => { const x = seed(i) * 1012; const row = i % 4; const wavePh = ((x / 1012) * 6 - lf / 8) % 6; const up = wavePh > 0 && wavePh < 1.5; return <div key={i} style={{ position: "absolute", left: x, top: 12 + row * 46 - (up ? 8 : 0), width: 7, height: 7, borderRadius: "50%", background: ["#C44A3A", "#E7B24C", "#EDE7DA", "#5AA0DE"][i % 4], opacity: 0.85 }} />; })}
    </div>
    {/* Norway-red pennants along the rim */}
    {Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ position: "absolute", left: i * 78 + 10, top: 178, width: 20, height: 34, background: "#C8102E", clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)", transform: `rotate(${Math.sin(lf / 8 + i) * 5}deg)`, zIndex: 3 }} />)}
    {/* emperor's box */}
    <div style={{ position: "absolute", left: 430, top: 150, width: 150, height: 60, background: "linear-gradient(180deg,#E7D6AE,#C9A06A)", border: "3px solid #8A6420", borderRadius: 4, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ transform: "scale(0.55)" }}><Mascot lf={lf} size={70} suit={1} /></div></div>
    {/* sun flare */}
    <div style={{ position: "absolute", right: 60, top: 10, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,0.8), transparent 60%)", zIndex: 2 }} />
    {/* sand floor */}
    <div style={{ position: "absolute", left: -40, right: -40, bottom: 0, top: 470, background: "linear-gradient(180deg,#C9A06A,#8A6640)", zIndex: 1 }}>{Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${i * 14}%`, top: 0, bottom: 0, width: 2, background: "rgba(90,60,30,0.14)", transform: `skewX(${(i - 4) * 4}deg)` }} />)}</div>
    <SpotCone x={506} top={150} topW={120} botW={560} h={640} color="rgba(255,238,196,0.16)" sway={1.5} lf={lf} />
    <Embers lf={lf} n={10} />
  </>
);

// ============================== EPIC SCENES ==============================
// S0 — MAD-SCIENCE LAB: colossal Haaland boots up in a containment tube
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const toggle = lf >= fr(0.6);
  const surge = over(lf, fr(1.0), fr(0.5));
  const eyes = lf >= fr(1.4);
  const crack = over(lf, fr(2.2), fr(0.8));
  const sh = (lf >= fr(0.6) && lf < fr(0.75)) || (lf >= fr(1.4) && lf < fr(1.5)) ? (seed(lf) - 0.5) * 8 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${sh}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0B1018,#05070C)" }} />
      {/* server racks */}
      {[40, 130, 880].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 90, width: 80, height: 300, background: "#12161F", border: "2px solid #2A3140", borderRadius: 4, zIndex: 1 }}>{Array.from({ length: 12 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 8, top: 10 + k * 22, width: 60, height: 6, borderRadius: 2, background: (Math.floor(lf / 5) + k + i) % 4 ? "#3F1A1A" : (k % 2 ? "#C44A3A" : "#E7B24C"), boxShadow: (Math.floor(lf / 5) + k + i) % 4 ? "none" : "0 0 5px #C44A3A" }} />)}</div>)}
      {/* checker floor + puddle */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 160, background: "#0A0D12", zIndex: 1 }}>{Array.from({ length: 40 }).map((_, i) => { const r = Math.floor(i / 8), c = i % 8; return (r + c) % 2 ? <div key={i} style={{ position: "absolute", left: `${c * 12.5}%`, top: r * 32, width: "12.5%", height: 32, background: "rgba(120,150,200,0.05)" }} /> : null; })}<div style={{ position: "absolute", left: 356, right: 356, top: 20, bottom: 10, background: `radial-gradient(ellipse, rgba(231,178,76,${0.1 + surge * 0.14}), transparent 70%)` }} /></div>
      {/* containment tube */}
      <div style={{ position: "absolute", left: 340, top: 150, width: 332, height: 560, borderRadius: "150px 150px 20px 20px", border: "5px solid #3A5C84", background: `linear-gradient(180deg, rgba(231,200,120,${0.14 + surge * 0.2}), rgba(120,90,40,0.25))`, boxShadow: `inset 0 0 50px rgba(231,178,76,${0.2 + surge * 0.3})`, overflow: "hidden", zIndex: 5 }}>
        {/* rising bubbles */}
        {Array.from({ length: 10 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 30 + seed(k) * 260, bottom: ((lf * 3 + k * 40) % 560), width: 8 + seed(k) * 8, height: 8 + seed(k) * 8, borderRadius: "50%", background: "rgba(255,244,200,0.4)" }} />)}
        {/* surge climbing cables */}
        {surge > 0 && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${surge * 100}%`, background: "linear-gradient(0deg, rgba(255,230,150,0.4), transparent)" }} />}
      </div>
      {/* HERO big inside tube */}
      <div style={{ position: "absolute", left: 506, top: 690, transform: `translate(-50%,-100%) scaleY(${eyes ? 1 : 0.94})`, transformOrigin: "50% 100%", zIndex: 6 }}>
        <Mascot lf={lf} size={430} haaland={1} angry={eyes ? 1 : 0} gaze={0} nodAmp={eyes ? 2 : 0} nodSpeed={6} />
        {/* temple electrodes */}
        {[-1, 1].map((s) => <div key={s} style={{ position: "absolute", left: 215 + s * 150 - 8, top: 120, width: 16, height: 16, borderRadius: "50%", background: "#3A5C84", boxShadow: eyes ? "0 0 10px #8CF5C9" : "none", zIndex: 8 }} />)}
      </div>
      {/* glass cracks */}
      {crack > 0.1 && <svg viewBox="0 0 332 560" width={332} height={560} style={{ position: "absolute", left: 340, top: 150, zIndex: 9, opacity: crack }}><path d="M166 200 l-40 60 l30 40 l-50 70 M166 200 l50 50 l-20 60 l40 50" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} /></svg>}
      {/* control desk + red toggle */}
      <div style={{ position: "absolute", left: 60, bottom: 100, width: 200, height: 90, background: "linear-gradient(180deg,#2A3140,#1A2028)", borderRadius: 6, zIndex: 10, border: "2px solid #3A4450" }}>
        <div style={{ position: "absolute", left: 20, top: 14, width: 40, height: 40, borderRadius: 6, background: "#2A0E0E", border: "2px solid #C44A3A", overflow: "hidden" }}><div style={{ position: "absolute", left: 8, top: toggle ? 20 : 4, width: 24, height: 16, borderRadius: 3, background: "#C44A3A", transition: "none" }} /></div>
        {/* oscilloscope */}
        <div style={{ position: "absolute", right: 14, top: 12, width: 120, height: 60, background: "#08120C", border: "1px solid #1E3A2A", borderRadius: 4, overflow: "hidden" }}><svg viewBox="0 0 120 60" width={120} height={60}><polyline points={eyes ? "0,30 30,30 40,6 50,54 60,30 120,30" : "0,30 120,30"} fill="none" stroke="#7BE07B" strokeWidth={2} /></svg></div>
      </div>
      {surge > 0.4 && <Sparkles lf={lf} at={1.0} x={506} y={300} n={10} spread={200} colors={["#F6E4A0", "#8CF5C9", "#fff"]} dur={0.8} />}
      {eyes && <Glint lf={lf} at={1.4} dur={0.5} />}
      <RepoCard lf={lf} delay={fr(0.4)} owner="haaland-agent" repo="main" stars="9.0k" tag="booting…" accent="#8CF5C9" />
    </div>
  );
};
// S1 — VIKING RAID: towering viking Haaland charges the England shield-wall, monster kick
const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const run = over(lf, fr(0.2), fr(2.6), Easing.inOut(Easing.cubic));
  const heroX = interpolate(run, [0, 1], [-40, 300]);
  const ram = lf >= fr(1.1);
  const defs = [{ x: 420, t: 1.1 }, { x: 500, t: 1.4 }, { x: 580, t: 1.7 }];
  const axeRear = over(lf, fr(2.5), fr(0.4)) * (1 - over(lf, fr(3.8), fr(0.3)));
  const windup = over(lf, fr(3.9), fr(0.5), Easing.in(Easing.cubic));
  const kick = lf >= fr(4.4);
  const ballFly = over(lf, fr(4.45), fr(0.6), Easing.in(Easing.cubic));
  const bulge = over(lf, fr(5.0), fr(0.4), Easing.out(Easing.back(1.7)));
  const keeperDrag = over(lf, fr(5.0), fr(0.6), Easing.in(Easing.cubic));
  const footX = heroX + 220, footY = 640;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* dusk sky + fjord */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#4A2418 0%,#8A3A20 30%,#C96A2A 48%,#2A2A3A 62%)" }} />
      <div style={{ position: "absolute", left: -40, top: 200, width: 400, height: 200, background: "#1A1626", clipPath: "polygon(0 100%,20% 30%,45% 60%,70% 20%,100% 55%,100% 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", right: -40, top: 220, width: 400, height: 180, background: "#1A1626", clipPath: "polygon(0 60%,30% 20%,55% 55%,80% 25%,100% 100%,0 100%)", zIndex: 1 }} />
      {/* longships beached */}
      <div style={{ position: "absolute", left: 40, top: 340, zIndex: 2, opacity: 0.85 }}><Longship s={220} /></div>
      <div style={{ position: "absolute", right: 30, top: 360, zIndex: 2, opacity: 0.7, transform: "scaleX(-1)" }}><Longship s={180} /></div>
      {/* burning hut + firelight */}
      <div style={{ position: "absolute", right: 220, top: 330, width: 120, height: 90, zIndex: 2 }}><div style={{ position: "absolute", inset: 0, background: "#2A1810", borderRadius: 4 }} /><div style={{ position: "absolute", left: -6, top: -30, right: -6, height: 40, background: "#3A2418", clipPath: "polygon(0 100%,50% 0,100% 100%)" }} />{Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 20 + i * 14, top: -30 - Math.abs(Math.sin(lf / 4 + i)) * 26, width: 12, height: 30, borderRadius: "50% 50% 40% 40%", background: i % 2 ? "#FF7A1A" : "#F2C14E", opacity: 0.9, filter: "blur(1px)" }} />)}</div>
      {/* beach floor + surf */}
      <div style={{ position: "absolute", left: -40, right: -40, bottom: 0, top: 500, background: "linear-gradient(180deg,#2A2620,#12100C)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: -40, right: -40, bottom: 0, height: 40, background: `linear-gradient(180deg, transparent, rgba(120,150,180,${0.2 + Math.sin(lf / 20) * 0.1}))`, zIndex: 3 }} />
      {/* goal staked right */}
      <div style={{ position: "absolute", left: 760, top: 420, zIndex: 4 }}><Goal w={220} h={170} bulge={bulge} /></div>
      <div style={{ position: "absolute", left: 830, top: 470, zIndex: 6, transform: `translate(${keeperDrag * 90}px,${keeperDrag * 60}px) rotate(${keeperDrag * 160}deg)`, opacity: 1 - Math.max(0, keeperDrag - 0.75) * 1.6 }}><Mascot lf={lf} size={120} england={1} tint="#8A929C" gaze={-3} nodAmp={2} /></div>
      {/* tiny England shield-wall defenders bounce off */}
      {defs.map((d, i) => { const hit = over(lf, fr(d.t), fr(0.5), Easing.out(Easing.back(1.5))); return <div key={i} style={{ position: "absolute", left: d.x + hit * 120, top: 540 - hit * 80, zIndex: 12, transform: `rotate(${hit * 540}deg)`, opacity: 1 - hit * 0.4 }}><Mascot lf={lf} size={110} england={1} gaze={2} stern={0.3} nodAmp={1.5} /></div>; })}
      {/* speed dust */}
      {run < 0.95 && Array.from({ length: 4 }).map((_, k) => <div key={k} style={{ position: "absolute", left: heroX + 40 - k * 40, bottom: 130 + k * 8, width: 60 - k * 10, height: 12, borderRadius: "50%", background: `rgba(200,190,170,${0.4 - k * 0.08})`, zIndex: 11 }} />)}
      {/* ball at feet -> monster kick */}
      {!kick ? <div style={{ position: "absolute", left: footX, top: footY, zIndex: 15, transform: `scale(${1 + windup * 0.12})` }}><Ball s={58} rot={run * 300} /></div>
        : ballFly < 0.98 && <div style={{ position: "absolute", left: interpolate(ballFly, [0, 1], [footX, 850]), top: interpolate(ballFly, [0, 1], [footY, 500]) - Math.sin(ballFly * Math.PI) * 150, zIndex: 22, transform: `scale(${1 - ballFly * 0.5})` }}><Ball s={60} rot={ballFly * 900} glow={26} /></div>}
      {/* HERO: giant viking */}
      <div style={{ position: "absolute", left: heroX, bottom: 90, zIndex: 20, transform: `rotate(${kick ? interpolate(over(lf, fr(4.4), fr(0.16)), [0, 1], [-16, 14]) : windup * -14}deg) scaleY(${windup > 0 && !kick ? 0.95 : 1})`, transformOrigin: "40% 100%" }}>
        <div style={{ position: "absolute", left: -70, top: 60, zIndex: -1 }}><Cape lf={lf} w={200} h={340} c="#5A2A14" fur /></div>
        <Mascot lf={lf} size={470} haaland={1} angry={1} gaze={2} nodAmp={kick ? 2 : 4} nodSpeed={4} cheer={bulge * 0.3} />
        <div style={{ position: "absolute", left: 118, top: -34, zIndex: 22 }}><VikingHelm s={200} /></div>
        <div style={{ position: "absolute", left: -30, top: 190, zIndex: 21 }}><Shield s={150} kind="wood" /></div>
        <div style={{ position: "absolute", left: 340, top: 30, zIndex: 21 }}><Axe s={130} lf={lf} rear={axeRear} /></div>
      </div>
      {ram && defs.map((d, i) => lf >= fr(d.t) && lf < fr(d.t + 0.4) ? <div key={i} style={{ position: "absolute", left: d.x, top: 500, fontSize: 44, zIndex: 24 }}>💥</div> : null)}
      {kick && <div style={{ position: "absolute", left: footX - 20, top: footY - 20, fontSize: 60, zIndex: 24, transform: `scale(${over(lf, fr(4.4), fr(0.2), Easing.out(Easing.back(2)))})` }}>💥</div>}
      {bulge > 0.4 && <><div style={{ position: "absolute", inset: 0, background: "#fff", opacity: Math.max(0, 0.4 - bulge), zIndex: 40 }} /><Sparkles lf={lf} at={5.0} x={870} y={520} n={16} spread={230} colors={[GOLD, "#FF7A1A", "#fff"]} dur={0.9} /></>}
      {bulge > 0.5 && <Stamp x={506} y={200} s={Math.min(1.1, spr(lf, fr(5.05), 10, 200))} text="GOAL!!" c={GREEN} rot={-6} />}
      <RepoCard lf={lf} delay={fr(0.5)} owner="haaland" repo="freight-train" stars="99k" tag="raids the field" accent={GREEN} />
    </div>
  );
};
// S2 — GOAL FACTORY: robotic giant stamps out goals, palm-out for the next
const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const goals = [0.4, 1.4].filter((t) => lf >= fr(t)).length;
  const next = over(lf, fr(1.6), fr(0.7), Easing.out(Easing.cubic));
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#141A22,#0A0E14)" }} />
      {/* factory wall gauges + hazard beams */}
      {[80, 860].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 100, width: 80, bottom: 160, background: "repeating-linear-gradient(45deg,#3A3320 0 16px,#141410 16px 32px)", zIndex: 1, opacity: 0.6 }} />)}
      {Array.from({ length: 3 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 200 + i * 200, top: 120, width: 50, height: 50, borderRadius: "50%", background: "#0E1A2E", border: "3px solid #2A3A52", zIndex: 1 }}><div style={{ position: "absolute", left: "50%", top: "50%", width: 3, height: 18, background: "#5AA0DE", transformOrigin: "bottom", transform: `translate(-50%,-100%) rotate(${lf * 8 + i * 60}deg)` }} /></div>)}
      {/* big COUNTER board */}
      <div style={{ position: "absolute", left: 380, top: 130, width: 240, height: 70, background: "#05070C", border: "3px solid #2A3A18", borderRadius: 4, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#F2C14E", transform: `scale(${goals && lf % 30 < 4 ? 1.05 : 1})` }}>{String(98 + goals).padStart(4, "0")}</div>
      <div style={{ position: "absolute", left: 388, top: 108, fontFamily: mono, fontSize: 14, color: "#8A7A5A", zIndex: 2 }}>GOALS</div>
      {/* conveyor belt feeding balls */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 130, height: 30, background: "linear-gradient(180deg,#3A3A44,#1A1A22)", zIndex: 6 }}>{Array.from({ length: 14 }).map((_, i) => <div key={i} style={{ position: "absolute", left: ((i * 80 - lf * 6) % 1120 + 1120) % 1120, top: 10, width: 30, height: 8, background: "#12100E", borderRadius: 2 }} />)}</div>
      {Array.from({ length: 3 }).map((_, i) => <div key={i} style={{ position: "absolute", left: ((i * 300 - lf * 6) % 1120 + 1120) % 1120, bottom: 150, zIndex: 7 }}><Ball s={40} rot={-lf * 6} /></div>)}
      {/* stamping press arm */}
      <div style={{ position: "absolute", left: 420, top: 200, width: 60, height: 120 + (goals && lf % 30 < 6 ? 40 : 0), background: "linear-gradient(180deg,#5A626C,#2A3038)", zIndex: 8 }} />
      {/* mini-goal */}
      <div style={{ position: "absolute", left: 720, top: 500, zIndex: 5 }}><Goal w={120} h={100} bulge={0.5} /></div>
      {/* HERO robotic giant */}
      <div style={{ position: "absolute", left: 380, bottom: 120, transform: "translateX(-50%)", zIndex: 20 }}>
        <Mascot lf={lf} size={440} haaland={1} angry={1} gaze={0} nodAmp={2} nodSpeed={7} cheer={next * 0.4} />
        <div style={{ position: "absolute", left: 200, top: 250, width: 12, height: 12, borderRadius: "50%", background: "#39E27A", boxShadow: "0 0 8px #39E27A", zIndex: 22 }} />
      </div>
      {/* palm-out next ball drops */}
      {next > 0.1 && <div style={{ position: "absolute", left: interpolate(next, [0, 1], [500, 520]), top: interpolate(next, [0, 1], [-40, 660]), zIndex: 22 }}><Ball s={50} rot={next * 300} /></div>}
      {next > 0.4 && <Stamp x={506} y={240} s={Math.min(1.05, spr(lf, fr(1.6), 10, 200))} text="NEXT ►" c={GREEN} rot={-4} />}
      <RepoCard lf={lf} delay={fr(0.5)} owner="haaland" repo="no-chill" stars="9.6k" tag="emotion: none" accent="#C44A3A" />
    </div>
  );
};
// S3 — BRAIN TRANSFER: gold brain-orb beamed to a Claude-agent robot that bursts from its pod
const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const lift = over(lf, fr(0.6), fr(0.6));
  const travel = over(lf, fr(1.6), fr(1.2), Easing.inOut(Easing.cubic));
  const drop = lf >= fr(2.9);
  const jolt = lf >= fr(3.6);
  const step = over(lf, fr(4.2), fr(0.5), Easing.out(Easing.back(1.5)));
  const orbX = interpolate(travel, [0, 1], [360, 660]);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0E1626,#070C16)" }} />
      {/* holo control-dome code wall */}
      {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 30 + i * 130, top: 60, width: 110, fontFamily: mono, fontSize: 11, color: "rgba(231,178,76,0.28)", zIndex: 1, lineHeight: 1.5 }}>{Array.from({ length: 10 }).map((_, k) => <div key={k} style={{ opacity: (Math.floor(lf / 4) + i + k) % 3 ? 0.5 : 1 }}>{["def kick()", "> striker", "0xF2C14E", "return goal", "brain.load"][(i + k) % 5]}</div>)}</div>)}
      <svg viewBox="0 0 1012 420" width="100%" height={420} style={{ position: "absolute", left: 0, top: 80, opacity: 0.2, zIndex: 1 }}><circle cx={506} cy={210} r={200} fill="none" stroke="#5AA0DE" strokeWidth={2} strokeDasharray="10 14" transform={`rotate(${lf * 0.5} 506 210)`} /></svg>
      {/* floor light rings */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 200, background: "#0A0F1A", zIndex: 1 }}>{[0, 1].map((k) => { const rp = ((lf + k * 45) % 90) / 90; return <div key={k} style={{ position: "absolute", left: "50%", bottom: 20, width: 100 + rp * 700, height: 30 + rp * 100, marginLeft: -(50 + rp * 350), borderRadius: "50%", border: `2px solid rgba(140,245,201,${(1 - rp) * 0.4})` }} />; })}</div>
      {/* arcing conduit */}
      <svg viewBox="0 0 1012 300" width="100%" height={300} style={{ position: "absolute", left: 0, top: 150, zIndex: 2 }}><path d="M360 200 Q506 60 660 200" fill="none" stroke="#2A3A52" strokeWidth={14} /><path d="M360 200 Q506 60 660 200" fill="none" stroke="rgba(140,245,201,0.4)" strokeWidth={4} /></svg>
      {/* two pods */}
      <div style={{ position: "absolute", left: 250, top: 250, width: 220, height: 400, borderRadius: "110px 110px 16px 16px", border: "4px solid #3A5C84", background: "rgba(120,90,40,0.12)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 540, top: 250, width: 220, height: 400, borderRadius: "110px 110px 16px 16px", border: `4px solid ${jolt ? "#C44A3A" : "#3A5C84"}`, background: jolt ? "rgba(196,74,58,0.12)" : "rgba(90,150,210,0.08)", zIndex: 4, opacity: step > 0.5 ? 0.3 : 1 }} />
      {/* HERO left (donor) */}
      <div style={{ position: "absolute", left: 360, bottom: 100, transform: "translateX(-50%)", zIndex: 10 }}><Mascot lf={lf} size={360} haaland={1} gaze={0} nodAmp={1} />{lift < 1 && <div style={{ position: "absolute", left: 150, top: 30, width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle,#FFF7D0,#E7B24C)", opacity: 1 - lift, zIndex: 12 }} />}</div>
      {/* Claude-agent right */}
      <div style={{ position: "absolute", left: 650 + step * 40, bottom: 100, transform: "translateX(-50%)", zIndex: 11, filter: jolt ? "drop-shadow(0 0 16px rgba(196,74,58,0.7))" : "grayscale(0.5) brightness(0.8)" }}><Mascot lf={lf} size={jolt ? 380 : 360} haaland={1} angry={jolt ? 1 : 0} gaze={0} cheer={jolt ? 0.3 : 0} nodAmp={jolt ? 3 : 0} /></div>
      {/* the brain orb travels */}
      {travel > 0 && travel < 1 && <div style={{ position: "absolute", left: orbX, top: 200 - Math.sin(travel * Math.PI) * 100, zIndex: 20 }}>{[3, 2, 1, 0].map((k) => <div key={k} style={{ position: "absolute", left: -k * 18, width: 44 - k * 8, height: 44 - k * 8, marginLeft: -(44 - k * 8) / 2, marginTop: -(44 - k * 8) / 2, borderRadius: "50%", background: "radial-gradient(circle,#FFF7D0,#E7B24C)", opacity: 0.7 - k * 0.18, boxShadow: k === 0 ? "0 0 20px #E7B24C" : "none" }} />)}</div>}
      {drop && <Sparkles lf={lf} at={2.9} x={660} y={340} n={12} spread={200} colors={[GOLD, "#FF6A4A", "#fff"]} dur={0.9} />}
      {jolt && <Stamp x={650} y={220} s={Math.min(1.1, spr(lf, fr(3.6), 9, 200))} text="DIFFERENT ANIMAL" c={RED} rot={-4} />}
      <RepoCard lf={lf} delay={fr(0.5)} owner="claude-agent" repo="haaland.model" stars="9.0k" tag="brain transfer" accent="#5AA0DE" />
    </div>
  );
};

const BugCap: React.FC<{ lf: number; s?: number; dmg?: number; scared?: number }> = ({ lf, s = 100, dmg = 0, scared = 0 }) => (
  <div style={{ position: "relative", width: s, height: s }}>
    <Gremlin s={s} lf={lf} scared={scared} />
    <div style={{ position: "absolute", left: s * 0.1, top: s * 0.42, width: s * 0.16, height: s * 0.12, background: "#E7B24C", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 900, fontSize: s * 0.09, color: "#3A2A05" }}>4</div>
    {dmg >= 1 && <div style={{ position: "absolute", left: s * 0.3, top: s * 0.3, width: s * 0.4, height: 2, background: "#2A1810", transform: "rotate(24deg)" }} />}
    {dmg >= 2 && <div style={{ position: "absolute", left: s * 0.28, top: s * 0.28, width: s * 0.3, height: s * 0.1, background: "#F4EEE2", transform: "rotate(-18deg)", borderRadius: 2 }} />}
  </div>
);

// S4 — SPLIT CONTRAST: tiny polite Claude asks vs giant Haaland plowing through dialog boxes
const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const heroX = interpolate(over(lf, fr(0.6), fr(3.2), Easing.inOut(Easing.cubic)), [0, 1], [560, 760]);
  const bubbles = [0.6, 1.6, 2.6].filter((t) => lf >= fr(t)).length;
  const smash = [1.0, 1.9, 2.8];
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* seam */}
      <div style={{ position: "absolute", left: 503, top: 0, bottom: 0, width: 6, background: "linear-gradient(180deg,rgba(255,244,210,0.7),rgba(200,120,60,0.4))", zIndex: 30, boxShadow: "0 0 24px rgba(255,220,150,0.5)" }} />
      {/* LEFT: tidy blue help-desk */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 506, bottom: 0, background: "linear-gradient(180deg,#1A2438,#0E1422)", zIndex: 1 }}>
        {Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 40, top: 120 + i * 40, width: 300, height: 6, background: "rgba(90,160,222,0.14)", borderRadius: 3 }} />)}
        <div style={{ position: "absolute", left: 130, bottom: 130, width: 250, height: 26, background: "#2A3A52", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 180, bottom: 156, width: 150, height: 100, borderRadius: 8, background: "#0C1220", border: "5px solid #3A4A62" }}><div style={{ position: "absolute", left: 14, top: 14, width: 60, height: 6, background: "#5AA0DE", opacity: 0.7 }} /><div style={{ position: "absolute", left: 14, top: 30, width: 100, height: 5, background: "#3A5C84" }} /></div>
        {/* tiny polite Claude */}
        <div style={{ position: "absolute", left: 90, bottom: 150, zIndex: 12 }}><Mascot lf={lf} size={130} gaze={2} stern={0.1} nodAmp={2} /></div>
        {/* keep-going? bubbles */}
        {bubbles > 0 && <div style={{ position: "absolute", left: 60, top: 300, zIndex: 20, transform: `scale(${Math.min(1.05, spr(lf, fr(0.6), 11, 200))})` }}><div style={{ background: "#FBFAF6", borderRadius: 14, padding: "10px 16px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "#2A2620", boxShadow: "0 8px 16px rgba(0,0,0,0.3)" }}>keep going? [Y][N]</div></div>}
        <div style={{ position: "absolute", left: 40, top: 90, fontFamily: mono, fontWeight: 800, fontSize: 15, color: "#5AA0DE", zIndex: 14 }}>PENDING…</div>
      </div>
      {/* RIGHT: warm pitch, giant Haaland plows through dialog boxes */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 506, bottom: 0, background: "linear-gradient(180deg,#3A2418,#1A0E0A)", overflow: "hidden", zIndex: 1 }}>
        {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ position: "absolute", left: -40 + i * 30, bottom: 0, width: 3, height: 400, background: "rgba(255,150,90,0.12)", transform: `skewX(${(i - 3) * 4}deg)` }} />)}
        {/* distant goal */}
        <div style={{ position: "absolute", right: 20, top: 300, zIndex: 3 }}><Goal w={110} h={90} bulge={0} /></div>
        {/* churned turf */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 100, height: 30, background: "linear-gradient(180deg,#3A5A2A,#1A2E12)" }} />
      </div>
      {/* dialog boxes he smashes through */}
      {smash.map((t, i) => { const p = over(lf, fr(t), fr(0.35), Easing.out(Easing.cubic)); const alive = lf < fr(t + 0.1); const shards = lf >= fr(t) && lf < fr(t + 0.5); return <React.Fragment key={i}>
        {alive && <div style={{ position: "absolute", left: 640 + i * 20, top: 400, zIndex: 18, background: "#0C1220", border: "2px solid #5AA0DE", borderRadius: 8, padding: "8px 14px", fontFamily: mono, fontSize: 13, color: "#8CC0F0" }}>Continue? [Yes]</div>}
        {shards && Array.from({ length: 6 }).map((_, k) => { const a = (k / 6) * Math.PI * 2; const d = p * 100; return <div key={k} style={{ position: "absolute", left: 680 + i * 20 + Math.cos(a) * d, top: 420 + Math.sin(a) * d, width: 12, height: 8, background: "#5AA0DE", opacity: 1 - p, zIndex: 19 }} />; })}
      </React.Fragment>; })}
      {/* GIANT Haaland storming right */}
      <div style={{ position: "absolute", left: heroX, bottom: 90, transform: "translateX(-50%) rotate(6deg)", transformOrigin: "50% 100%", zIndex: 22 }}>
        {Array.from({ length: 3 }).map((_, k) => <div key={k} style={{ position: "absolute", left: -k * 30, bottom: 0, opacity: 0.16, zIndex: -1 }}><Mascot lf={lf} size={460} haaland={1} angry={1} gaze={-2} /></div>)}
        <Mascot lf={lf} size={460} haaland={1} angry={1} gaze={-2} nodAmp={5} nodSpeed={4} />
      </div>
      {smash.some((t) => lf >= fr(t) && lf < fr(t + 0.12)) && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: 0.2, zIndex: 40 }} />}
      {lf > fr(3.0) && <Stamp x={760} y={220} s={Math.min(1.1, spr(lf, fr(3.0), 10, 200))} text="NEVER ASKS" c={GREEN} rot={4} />}
      <RepoCard lf={lf} delay={fr(0.5)} owner="haaland" repo="goal-machine" stars="9k" tag="skip-permissions" accent="#C44A3A" />
    </div>
  );
};
// S5 — GLADIATOR COLISEUM: giant gladiator Haaland fights waves, hat-trick, beckons MORE
const S5: React.FC<{ lf: number }> = ({ lf }) => {
  const gate = over(lf, fr(0.2), fr(0.4));
  const wave1 = lf >= fr(0.6) && lf < fr(2.4);
  const sweep = over(lf, fr(1.3), fr(0.5), Easing.out(Easing.cubic));
  const stomp = over(lf, fr(3.2), fr(0.5), Easing.out(Easing.back(1.5)));
  const scroll = lf >= fr(3.6);
  const hats = [0, 1, 2].map((i) => over(lf, fr(5.5 + i * 0.9), fr(0.35), Easing.out(Easing.back(1.6))));
  const hatDone = lf > fr(8.2);
  const thumbs = lf >= fr(8.5);
  const beckon = lf >= fr(10.5);
  const enemies = [{ x: 300, s: 110, bug: false }, { x: 400, s: 100, bug: true }, { x: 500, s: 108, bug: false }, { x: 600, s: 96, bug: true }, { x: 690, s: 104, bug: false }];
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Coliseum lf={lf} />
      {/* portcullis gate */}
      <div style={{ position: "absolute", left: 850, top: 380, width: 120, height: 200, background: "#2A2018", border: "4px solid #4A3826", zIndex: 3, transform: `translateY(${-gate * 190}px)` }}>{Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 10 + i * 28, top: 0, bottom: 0, width: 6, background: "#5A4636" }} />)}</div>
      {/* three nets for the hat-trick */}
      {hatDone === false && lf > fr(4.8) && [420, 560, 700].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 430, zIndex: 4 }}><Goal w={110} h={90} bulge={hats[i] > 0.5 ? 0.6 : 0} /></div>)}
      {/* WAVE of enemies rushing in, bowled by shield-sweep */}
      {lf < fr(3.4) && enemies.map((e, i) => { const rush = over(lf, fr(0.6), fr(0.7)); const bowl = over(lf, fr(1.3), fr(0.5), Easing.out(Easing.back(1.5))); return <div key={i} style={{ position: "absolute", left: interpolate(rush, [0, 1], [900, e.x]) + bowl * 120, top: 500 - bowl * 90, zIndex: 12, transform: `rotate(${bowl * 480}deg)`, opacity: 1 - bowl * 0.5 }}>{e.bug ? <BugCap lf={lf} s={e.s} dmg={2} scared={bowl > 0.1 ? 1 : 0} /> : <Mascot lf={lf} size={e.s} england={1} gaze={2} stern={0.3} nodAmp={1.5} />}</div>; })}
      {sweep > 0.1 && sweep < 0.9 && <Sparkles lf={lf} at={1.3} x={500} y={520} n={14} spread={260} colors={["#fff", "#E7B24C", "#C44A3A"]} dur={0.6} />}
      {/* TEST scroll unearthed on stomp */}
      {lf > fr(2.9) && lf < fr(5.0) && <div style={{ position: "absolute", left: 560, top: interpolate(stomp, [0, 1], [640, 360]), zIndex: 18, transform: `scale(${stomp})` }}><div style={{ width: 80, height: 60, background: "#2A0E10", border: `2px solid ${GREEN}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 900, fontSize: 22, color: GREEN }}>✗→✓</div></div>}
      {/* hat-trick balls */}
      {lf > fr(5.0) && lf < fr(8.4) && [420, 560, 700].map((tx, i) => hats[i] > 0.02 && hats[i] < 1 ? <div key={i} style={{ position: "absolute", left: interpolate(hats[i], [0, 1], [480, tx + 30]), top: 560 - Math.sin(hats[i] * Math.PI) * 130, zIndex: 22 }}><Ball s={40} rot={hats[i] * 500} glow={14} /></div> : null)}
      {hatDone && <Stamp x={506} y={200} s={Math.min(1.1, spr(lf, fr(8.2), 10, 200))} text="HAT-TRICK ⚽⚽⚽" c={GOLD} rot={-5} />}
      {/* emperor thumbs up */}
      {thumbs && <div style={{ position: "absolute", left: 585, top: 156, fontSize: 30, zIndex: 30, transform: `scale(${Math.min(1.2, spr(lf, fr(8.5), 10, 200))})` }}>👍</div>}
      {/* GIANT GLADIATOR hero */}
      <div style={{ position: "absolute", left: beckon ? 460 : 380, bottom: 80, transform: "translateX(-50%)", zIndex: 20 }}>
        <div style={{ position: "absolute", left: -30, top: 80, zIndex: -1 }}><Cape lf={lf} w={160} h={280} c="#8A1A1A" /></div>
        <Mascot lf={lf} size={480} haaland={1} angry={1} gaze={beckon ? 0 : 2} nodAmp={beckon ? 5 : 4} nodSpeed={4} cheer={beckon ? 0.3 + Math.sin(lf / 5) * 0.25 : 0} />
        <div style={{ position: "absolute", left: 128, top: -30, zIndex: 22 }}><GladHelm s={190} /></div>
        {/* bronze shoulder armor */}
        <div style={{ position: "absolute", left: 60, top: 150, width: 90, height: 40, borderRadius: "40% 40% 20% 20%", background: "linear-gradient(180deg,#E7B24C,#8A6420)", zIndex: 21 }} />
        <div style={{ position: "absolute", right: 60, top: 150, width: 90, height: 40, borderRadius: "40% 40% 20% 20%", background: "linear-gradient(180deg,#E7B24C,#8A6420)", zIndex: 21 }} />
        {/* shield sweeps */}
        <div style={{ position: "absolute", left: -40 + sweep * 200, top: 200, zIndex: 23, transform: `rotate(${sweep * 120}deg)`, opacity: lf < fr(2.2) ? 1 : 0.3 }}><Shield s={150} kind="bronze" /></div>
      </div>
      {beckon && <Stamp x={506} y={210} s={Math.min(1.05, spr(lf, fr(10.5), 10, 200))} text="MORE." c={RED} rot={-5} />}
      <RepoCard lf={lf} delay={fr(0.5)} owner="haaland" repo="relentless-agent" stars="9.0k" tag="the coliseum" accent="#C44A3A" />
    </div>
  );
};
// CTA — THRONE ROOM: enthroned champion holds the glowing paragraph-scroll
const PowersCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const unfurl = over(lf, 0, fr(0.6), Easing.out(Easing.back(1.4)));
  const offer = over(lf, fr(1.6), fr(0.6), Easing.out(Easing.cubic));
  const pill = over(lf, fr(3.6), fr(0.5), Easing.out(Easing.back(1.6)));
  return (
    <Panel lf={lf} label="comment HAALAND" tint="rgba(231,178,76,0.4)" ambient="rgba(231,181,75,0.16)" base={["#1A1206", "#0C0803"]}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2A1E10,#140C06)" }} />
      {/* vaulted hall: arched windows pouring gold light */}
      {[70, 380, 690].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 60, width: 120, height: 260, borderRadius: "60px 60px 0 0", background: "linear-gradient(180deg,rgba(255,236,180,0.5),rgba(231,178,76,0.1))", border: "4px solid #4A3A24", zIndex: 1 }} />)}
      {/* Norway-red banners between pillars */}
      {[190, 500, 810].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 40, width: 60, height: 260, background: "linear-gradient(180deg,#C8102E,#7A0A1C)", clipPath: "polygon(0 0,100% 0,100% 92%,50% 100%,0 92%)", zIndex: 2, transform: `rotate(${Math.sin(lf / 10 + i) * 1.5}deg)` }}><div style={{ position: "absolute", left: "50%", top: 40, transform: "translateX(-50%)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#F6E4A0" }}>9</div></div>)}
      {/* carved #9 crest */}
      <div style={{ position: "absolute", left: "50%", top: 90, transform: "translateX(-50%)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 120, color: "rgba(231,178,76,0.14)", zIndex: 1 }}>9</div>
      {/* torch braziers */}
      {[120, 830].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 420, zIndex: 4 }}><div style={{ width: 26, height: 60, background: "#3A2A1C", borderRadius: 4 }} />{Array.from({ length: 5 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 2 + k * 5, top: -24 - Math.abs(Math.sin(lf / 4 + k + i)) * 22, width: 10, height: 26, borderRadius: "50% 50% 40% 40%", background: k % 2 ? "#FF7A1A" : "#F2C14E", filter: "blur(1px)" }} />)}</div>)}
      {/* red carpet */}
      <div style={{ position: "absolute", left: "40%", right: "40%", bottom: 0, top: 480, background: "linear-gradient(180deg,#7A1414,#4A0E0E)", clipPath: "polygon(20% 0,80% 0,100% 100%,0 100%)", zIndex: 3 }} />
      {/* throne of keyboards/trophies */}
      <div style={{ position: "absolute", left: 400, top: 420, width: 220, height: 200, background: "linear-gradient(180deg,#3A2E1C,#1E1610)", borderRadius: "10px 10px 0 0", zIndex: 5 }}><div style={{ position: "absolute", left: 20, top: 20, right: 20, height: 40, background: "repeating-linear-gradient(90deg,#2A2620 0 12px,#3A342C 12px 24px)", borderRadius: 3 }} /></div>
      <SpotCone x={506} top={20} topW={100} botW={480} h={640} color="rgba(255,238,196,0.2)" sway={1.5} lf={lf} />
      <Confetti lf={lf} n={36} colors={[GOLD, "#C8102E", GREEN, "#FCEDDD"]} />
      {/* ENTHRONED CHAMPION */}
      <div style={{ position: "absolute", left: 506, bottom: 100, transform: "translateX(-50%)", zIndex: 20 }}>
        <div style={{ position: "absolute", left: -30, top: 60, zIndex: -1 }}><Cape lf={lf} w={200} h={340} c="#C8102E" /></div>
        <Mascot lf={lf} size={420} haaland={1} angry={0} cheer={0.5} gaze={0} nodAmp={2} />
        {/* laurel */}
        <svg viewBox="0 0 200 60" width={200} height={60} style={{ position: "absolute", left: 110, top: 20, zIndex: 22 }}><path d="M40 40 q-30 -20 -30 -40 q26 6 34 30" fill="none" stroke="#3F9E74" strokeWidth={6} /><path d="M160 40 q30 -20 30 -40 q-26 6 -34 30" fill="none" stroke="#3F9E74" strokeWidth={6} /></svg>
        {/* glowing paragraph scroll */}
        <div style={{ position: "absolute", left: 130 + offer * 20, top: 230 - offer * 20, zIndex: 24, transform: `scale(${unfurl}) rotate(${offer * -6}deg)`, filter: "drop-shadow(0 0 20px rgba(231,178,76,0.9))" }}><div style={{ width: 130, height: 96, background: "#F0E6CE", border: `3px solid ${GOLD}`, borderRadius: 6, padding: 12 }}>{[0, 1, 2].map((k) => <div key={k} style={{ height: 8, borderRadius: 4, background: "#C9B98E", marginBottom: 10, width: `${[100, 88, 60][k]}%` }} />)}</div></div>
      </div>
      <Sparkles lf={lf} at={0.3} x={506} y={360} n={16} spread={240} colors={[GOLD, "#fff", "#C8102E"]} dur={1.0} />
      {pill > 0.02 && <div style={{ position: "absolute", left: 0, right: 0, top: 660, textAlign: "center", zIndex: 44, transform: `scale(${pill})` }}><div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#FBFAF6", borderRadius: 999, padding: "14px 30px", boxShadow: "0 16px 34px -10px rgba(0,0,0,0.5)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: "#2A2620" }}>Comment</span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: CLAYD }}>HAALAND</span></div></div>}
      <RepoCard lf={lf} delay={fr(0.4)} owner="haaland-agent" repo="one-paragraph" stars="9.9k" tag="→ superhuman" accent="#E7B24C" />
    </Panel>
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

const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = over(f, 0, fr(0.45), Easing.out(Easing.cubic));
  const out = 1 - over(f, fr(L[1] - 0.3), fr(0.3));
  if (out <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -18}px)` }}>
      <div style={{ display: "inline-block", textAlign: "center", padding: "20px 46px", borderRadius: 30, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 22px 52px -12px rgba(20,26,45,0.48)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 56, color: INK, letterSpacing: "0.005em", lineHeight: 1.04, display: "block" }}>I TURNED <span style={{ color: CLAY }}>HAALAND</span><br />INTO A CLAUDE AGENT</span>
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
const PowersReelBody: React.FC<{ Hook: React.FC<{ lf: number }>; HookSfx: React.ReactNode }> = ({ Hook, HookSfx }) => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.85, 4.55, L[1] + 3.8, L[2] + 2.5, L[3] + 4.5, L[4] + 3.5, L[5] + 4.4, L[6] + 0.3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const Ss = [Hook, S1, S2, S3, S4, S5];
  const LABELS = ["the-tunnel.live", "matchday ⚽", "no-chill.md", "haaland-agent.ts", "you-vs-agent", "the-grind.run"];
  const TINTS = ["rgba(231,178,76,0.36)", "rgba(63,158,116,0.32)", "rgba(231,178,76,0.32)", "rgba(90,160,222,0.32)", "rgba(120,200,180,0.3)", "rgba(220,80,70,0.34)"];
  const AMB = ["rgba(231,181,75,0.15)", "rgba(63,158,116,0.13)", "rgba(231,181,75,0.12)", "rgba(90,160,222,0.12)", "rgba(120,200,180,0.10)", "rgba(220,80,60,0.13)"];
  const BASES: [string, string][] = [["#1A1210", "#0C0808"], ["#0D1A12", "#07100A"], ["#1A1410", "#0C0A07"], ["#111A26", "#080D14"], ["#0E1B1E", "#071013"], ["#1E1010", "#0E0707"]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("haaland_vo.wav")} />
      <Audio src={staticFile("haaland_music.wav")} volume={(ff) => interpolate(ff, [0, fr(0.5), fr(18), fr(30), fr(36), 1290], [0.1, 0.14, 0.15, 0.135, 0.095, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {/* ===== scene-cut risers ===== */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => (
        <React.Fragment key={`cut${i}`}><Sfx at={tt - 1.2} src={["metal_riser.wav","riser.wav","lib_riser.wav","metal_riser.wav","riser.wav","lib_riser.wav"][i]} v={0.3} dur={1.2} /><Sfx at={tt} src={["whoosh.wav","swish.wav","swooshup.wav","swish.wav","lib_deep_whoosh.wav","lib_magic_reveal.wav"][i]} v={0.34} dur={0.6} /></React.Fragment>
      ))}
      {/* S0 hook: charge in silence -> BOLT jolt awake */}
      <Sfx at={0.4} src="lib_riser.wav" v={0.4} dur={0.8} /><Sfx at={1.15} src="lib_boom.wav" v={0.6} dur={0.6} /><Sfx at={1.15} src="c_power.wav" v={0.5} dur={0.5} /><Sfx at={1.2} src="shimmer.wav" v={0.34} dur={0.7} /><Sfx at={1.35} src="crowd_cheer.wav" v={0.28} dur={1.0} />
      {/* S1 pitch: freight-train charge, 4 truck-throughs, the KICK ~8s, net-bulge goal */}
      <Sfx at={L[1] + 0.2} src="crowd_run.wav" v={0.4} dur={3.0} />
      {[0.9, 1.4, 1.9, 2.4].map((d, i) => <React.Fragment key={`tr${i}`}><Sfx at={L[1] + d} src={i % 2 ? "c_stomp2.wav" : "c_stomp.wav"} v={0.5} dur={0.3} /><Sfx at={L[1] + d} src="impact.wav" v={0.3} dur={0.3} /></React.Fragment>)}
      <Sfx at={L[1] + 3.9} src="swooshup.wav" v={0.6} dur={0.35} /><Sfx at={L[1] + 4.4} src="c_powerbig.wav" v={0.75} dur={0.6} /><Sfx at={L[1] + 4.42} src="fling.wav" v={0.5} dur={0.5} /><Sfx at={L[1] + 4.9} src="crash.wav" v={0.6} dur={0.6} /><Sfx at={L[1] + 5.0} src="crowd_cheer.wav" v={0.5} dur={1.4} />
      {/* S2 no-chill: record-scratch subvert, deadpan, new ball drops */}
      <Sfx at={L[2] + 0.2} src="screech.wav" v={0.34} dur={0.3} /><Sfx at={L[2] + 0.3} src="thock.wav" v={0.42} dur={0.2} />{[1.0, 1.7].map((d, i) => <Sfx key={`g${i}`} at={L[2] + d} src="ding.wav" v={0.24} dur={0.3} />)}<Sfx at={L[2] + 1.9} src="bonk.mp3" v={0.5} dur={0.3} /><Sfx at={L[2] + 2.0} src="c_bump.wav" v={0.34} dur={0.25} /><Sfx at={L[2] + 2.4} src="tick.wav" v={0.34} dur={0.2} />
      {/* S3 build: chip flies -> SLOTS -> BOOT to full power */}
      <Sfx at={L[3] + 1.0} src="lib_whoosh.wav" v={0.5} dur={0.6} /><Sfx at={L[3] + 2.0} src="c_unlock.wav" v={0.5} dur={0.4} /><Sfx at={L[3] + 2.05} src="snap.wav" v={0.36} dur={0.2} /><Sfx at={L[3] + 2.2} src="digital-loading.wav" v={0.32} dur={1.0} /><Sfx at={L[3] + 3.4} src="c_powerbig.wav" v={0.7} dur={0.6} /><Sfx at={L[3] + 3.45} src="lib_magic_reveal.wav" v={0.44} dur={0.8} /><Sfx at={L[3] + 3.9} src="c_1up.wav" v={0.34} dur={0.5} />
      {/* S4 vs: timid bubble -> SMASH through divider -> stamp */}
      <Sfx at={L[4] + 0.6} src="lib_pop.wav" v={0.34} dur={0.3} /><Sfx at={L[4] + 0.9} src="digital-loading.wav" v={0.24} dur={0.7} /><Sfx at={L[4] + 1.6} src="swooshup.wav" v={0.4} dur={0.3} /><Sfx at={L[4] + 1.9} src="c_break.wav" v={0.6} dur={0.5} /><Sfx at={L[4] + 1.95} src="impact.wav" v={0.44} dur={0.4} /><Sfx at={L[4] + 2.2} src="c_stomp2.wav" v={0.44} dur={0.3} />
      {/* S5 grind: meg, bury, hat-trick x3, list clear, fanfare, demand */}
      <Sfx at={L[5] + 0.8} src="c_stomp.wav" v={0.5} dur={0.3} /><Sfx at={L[5] + 1.3} src="c_coin.wav" v={0.3} dur={0.3} /><Sfx at={L[5] + 3.0} src="c_break.wav" v={0.5} dur={0.4} /><Sfx at={L[5] + 3.9} src="resolve.wav" v={0.3} dur={0.5} />
      {[5.0, 5.7, 6.4].map((d, i) => <Sfx key={`ht${i}`} at={L[5] + d} src="c_powerbig.wav" v={0.6 + i * 0.08} dur={0.5} />)}
      <Sfx at={L[5] + 6.5} src="crowd_cheer.wav" v={0.5} dur={1.4} /><Sfx at={L[5] + 7.2} src="c_fanfare.wav" v={0.44} dur={1.2} /><Sfx at={L[5] + 8.0} src="c_clear.wav" v={0.5} dur={0.9} /><Sfx at={L[5] + 10.2} src="lib_boom.wav" v={0.4} dur={0.6} /><Sfx at={L[5] + 10.3} src="tick.wav" v={0.4} dur={0.3} />
      {/* CTA: collapse -> paragraph SLAM -> keyword */}
      <Sfx at={L[6] + 0.1} src="lib_deep_whoosh.wav" v={0.5} dur={1.4} /><Sfx at={L[6] + 0.5} src="lib_boom.wav" v={0.5} dur={0.6} /><Sfx at={L[6] + 0.55} src="shimmer.wav" v={0.36} dur={0.7} /><Sfx at={L[6] + 0.6} src="crowd_cheer.wav" v={0.28} dur={2.0} /><Sfx at={L[6] + 2.6} src="c_coin.wav" v={0.4} dur={0.4} /><Sfx at={L[6] + 2.65} src="lib_notif.wav" v={0.34} dur={0.5} /><Sfx at={L[6] + 3.2} src="c_1up.wav" v={0.34} dur={0.6} />
      
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
// ============================== HOOK VARIANT C — SKILL TREE / LEVEL-UP ==============================
// ===== S0C helpers (RPG skill-tree level-up hook) =====
const S0C_GREEN = "#3F9E74";
const S0C_ANCHOR = { x: 506, y: 384 };
const S0C_LIGHTS = [0.7, 1.5, 2.4, 3.4, 4.4]; // seconds each node lights
const S0C_NODES: { x: number; y: number; c: string; g: string; label: string }[] = [
  { x: 155, y: 235, c: CLAY, g: "pencil", label: "DESIGN" },
  { x: 325, y: 118, c: SKY, g: "shield", label: "SECURE" },
  { x: 506, y: 78, c: GOLD, g: "gear", label: "PLAN" },
  { x: 688, y: 118, c: PINK, g: "search", label: "TEST" },
  { x: 858, y: 235, c: S0C_GREEN, g: "check", label: "SHIP" },
];

const S0C_Glyph: React.FC<{ type: string; spin?: number }> = ({ type, spin = 0 }) => {
  const st = { stroke: "#FFF6E8", strokeWidth: 4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={54} height={54} viewBox="0 0 40 40">
      {type === "pencil" && (
        <g transform="rotate(45 20 20)">
          <rect x={16} y={7} width={8} height={18} rx={2} fill="#FFF6E8" />
          <rect x={16} y={4} width={8} height={4} rx={1} fill="rgba(0,0,0,0.35)" />
          <path d="M16 25 L24 25 L20 33 Z" fill="#FFF6E8" />
        </g>
      )}
      {type === "shield" && (
        <path d="M20 5 L33 10 V19 C33 28 27 33 20 36 C13 33 7 28 7 19 V10 Z" fill="#FFF6E8" />
      )}
      {type === "gear" && (
        <g transform={`rotate(${spin} 20 20)`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={18} y={2} width={4} height={7} rx={1.5} fill="#FFF6E8" transform={`rotate(${i * 45} 20 20)`} />
          ))}
          <circle cx={20} cy={20} r={10} fill="#FFF6E8" />
          <circle cx={20} cy={20} r={4.2} fill="rgba(0,0,0,0.4)" />
        </g>
      )}
      {type === "search" && (
        <g>
          <circle cx={17} cy={17} r={9} {...st} />
          <line x1={24} y1={24} x2={33} y2={33} {...st} strokeWidth={5} />
        </g>
      )}
      {type === "check" && (
        <polyline points="8,21 17,30 33,10" {...st} strokeWidth={5.5} />
      )}
    </svg>
  );
};

const S0C: React.FC<{ lf: number }> = ({ lf }) => {
  // power climbs in steps as nodes light: x1 -> x2 -> x4 -> x6 -> x8 -> 10X
  const powerNow = interpolate(
    lf,
    [0, fr(0.7), fr(0.9), fr(1.5), fr(1.7), fr(2.4), fr(2.6), fr(3.4), fr(3.6), fr(4.4), fr(4.95)],
    [1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const litCount = S0C_LIGHTS.filter((s) => lf >= fr(s)).length;
  const grow = interpolate(powerNow, [1, 10], [0, 1]);
  const finale = over(lf, fr(4.5), fr(0.5));
  const levelPop = Math.min(1.12, spr(lf, fr(4.5), 8, 180));
  const bigFlash = Math.max(0, 1 - Math.abs(lf - fr(4.5)) / 4);
  const fillPct = 8 + ((powerNow - 1) / 9) * 92;
  const powInt = Math.round(powerNow);
  const powLabel = powerNow >= 9.5 ? "10X" : "x" + powInt;
  const powCol = lerpHex(CLAY, GOLD, Math.min(1, (powerNow - 1) / 9));
  const idle = Math.sin(lf / 11) * 3;

  const mascotSize = 205 + grow * 46;
  const mascotRise = grow * 8 + finale * 16;
  const auraR = 300 + grow * 130 + Math.sin(lf / 7) * 10;

  return (
    <>
      {/* ===== warm clay arena background ===== */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 34%, #3A2A1E 0%, #241A12 46%, #140E0A 100%)", overflow: "hidden" }}>
        {/* rotating light-ray fan behind the tree */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`ray${i}`} style={{ position: "absolute", left: 506, top: 260, width: 1300, height: 10, marginLeft: -650, marginTop: -5, background: `linear-gradient(90deg, transparent 45%, rgba(231,178,76,${0.05 + grow * 0.06}) 50%, transparent 55%)`, transformOrigin: "50% 50%", transform: `rotate(${i * 22.5 + lf * 0.35}deg)` }} />
        ))}
        {/* faint hex-dot grid */}
        {Array.from({ length: 7 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
          <div key={`gd${r}-${c}`} style={{ position: "absolute", left: 40 + c * 84 + (r % 2) * 42, top: 60 + r * 96, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,230,190,0.10)" }} />
        )))}
        {/* central amber glow that intensifies with power */}
        <div style={{ position: "absolute", left: 506, top: 400, width: 760, height: 760, marginLeft: -380, marginTop: -380, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.10 + grow * 0.16}) 0%, transparent 62%)` }} />
      </div>

      {/* ===== connector lines (SVG) — dim at f0, ignite on light ===== */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, zIndex: 3 }}>
        {S0C_NODES.map((n, k) => {
          const lp = over(lf, fr(S0C_LIGHTS[k]), fr(0.42));
          const len = Math.hypot(n.x - S0C_ANCHOR.x, n.y - S0C_ANCHOR.y);
          const flow = (lf / 26 + k * 0.17) % 1;
          const fx = n.x + (S0C_ANCHOR.x - n.x) * flow;
          const fy = n.y + (S0C_ANCHOR.y - n.y) * flow;
          const flowFade = Math.sin(flow * Math.PI);
          return (
            <g key={`ln${k}`}>
              <line x1={S0C_ANCHOR.x} y1={S0C_ANCHOR.y} x2={n.x} y2={n.y} stroke="rgba(255,232,200,0.10)" strokeWidth={6} strokeLinecap="round" />
              <line x1={S0C_ANCHOR.x} y1={S0C_ANCHOR.y} x2={n.x} y2={n.y} stroke={n.c} strokeWidth={7} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - lp)} style={{ opacity: lp, filter: `drop-shadow(0 0 6px ${n.c})` }} />
              {lp > 0.55 && <circle cx={fx} cy={fy} r={5.5} fill="#FFF3D6" style={{ opacity: flowFade * 0.9, filter: `drop-shadow(0 0 6px ${n.c})` }} />}
            </g>
          );
        })}
      </svg>

      {/* ===== glowing platform under the mascot ===== */}
      <div style={{ position: "absolute", left: 506, top: 508, transform: "translateX(-50%)", zIndex: 3 }}>
        {[0, 1, 2].map((r) => (
          <div key={`ring${r}`} style={{ position: "absolute", left: -170 + r * 34, top: -26 + r * 5, width: 340 - r * 68, height: 70 - r * 12, marginTop: 0, borderRadius: "50%", border: `3px solid rgba(231,178,76,${(0.14 + grow * 0.3) * (1 - r * 0.22)})`, boxShadow: `0 0 ${16 + grow * 26}px rgba(231,178,76,${0.2 + grow * 0.3})` }} />
        ))}
        <div style={{ position: "absolute", left: -150, top: -18, width: 300, height: 54, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(231,178,76,${0.28 + grow * 0.3}), transparent 70%)` }} />
      </div>

      {/* ===== finale aura rings ===== */}
      {finale > 0.01 && [0, 1, 2].map((r) => {
        const rp = over(lf, fr(4.5) + r * 5, fr(0.9));
        return <div key={`aura${r}`} style={{ position: "absolute", left: 506, top: 400 - mascotRise, width: 60, height: 60, marginLeft: -30, marginTop: -30, borderRadius: "50%", border: "6px solid #F6D98A", transform: `scale(${1 + rp * 9})`, opacity: (1 - rp) * 0.7, zIndex: 4 }} />;
      })}

      {/* ===== mascot on the platform ===== */}
      <div style={{ position: "absolute", left: 506, top: 250 - mascotRise + idle, transform: "translateX(-50%)", zIndex: 6 }}>
        <div style={{ position: "absolute", left: "50%", top: "48%", width: auraR, height: auraR, marginLeft: -auraR / 2, marginTop: -auraR / 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.12 + grow * 0.34}) 0%, transparent 66%)`, zIndex: -1 }} />
        <Mascot lf={lf} size={mascotSize} gaze={0} nodAmp={3} nodSpeed={9} cheer={0.15 + finale * 0.85} shock={0} />
      </div>

      {/* ===== 5 skill nodes ===== */}
      {S0C_NODES.map((n, k) => {
        const lp = over(lf, fr(S0C_LIGHTS[k]), fr(0.32));
        const punch = Math.max(0, 1 - Math.abs(lf - fr(S0C_LIGHTS[k])) / 5);
        const scale = 1 + punch * 0.18 + finale * 0.04;
        const border = lerpHex("#5A4E44", n.c, lp);
        return (
          <div key={`node${k}`} style={{ position: "absolute", left: n.x - 60, top: n.y - 60, width: 120, height: 120, zIndex: 10, transform: `scale(${scale})`, transformOrigin: "50% 50%" }}>
            {/* hex body */}
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)", background: "linear-gradient(158deg,#3A302A,#241C17)", border: `3px solid ${border}` }} />
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)", background: `linear-gradient(158deg, ${lerpHex(n.c, "#FFFFFF", 0.12)}, ${n.c})`, opacity: lp, boxShadow: `inset 0 4px 0 rgba(255,255,255,0.18)` }} />
            {/* outer glow */}
            {lp > 0.02 && <div style={{ position: "absolute", inset: 6, clipPath: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)", boxShadow: `0 0 ${18 + lp * 24 + Math.sin(lf / 6) * 4}px ${n.c}`, opacity: lp * 0.9 }} />}
            {/* content: locked ? vs glyph */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ position: "absolute", fontFamily: mono, fontWeight: 800, fontSize: 46, color: "#8A7C6E", opacity: 1 - lp }}>?</span>
              <div style={{ position: "absolute", opacity: lp, transform: `scale(${interpolate(lp, [0, 1], [0.4, 1]) + punch * 0.15})` }}>
                <S0C_Glyph type={n.g} spin={n.g === "gear" ? lf * 2 : 0} />
              </div>
            </div>
            {/* order number badge */}
            <div style={{ position: "absolute", right: 6, top: 8, width: 26, height: 26, borderRadius: "50%", background: lp > 0.5 ? "#FFF3D6" : "#1E1712", border: `2px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: lp > 0.5 ? "#3A2A18" : "#8A7C6E" }}>{k + 1}</div>
            {/* label chip */}
            <div style={{ position: "absolute", left: "50%", top: 116, transform: "translateX(-50%)", padding: "3px 12px", borderRadius: 8, background: "rgba(20,14,10,0.72)", border: `1.5px solid ${border}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: 1.5, color: lerpHex("#7A6E60", "#FFF3E4", lp), opacity: 0.35 + lp * 0.65, whiteSpace: "nowrap" }}>{n.label}</div>
          </div>
        );
      })}

      {/* ===== SKILLS x/5 HUD chip ===== */}
      <div style={{ position: "absolute", left: 40, top: 40, display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 12, background: "rgba(20,14,10,0.74)", border: "2px solid rgba(231,178,76,0.5)", zIndex: 14, boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {S0C_NODES.map((n, k) => (
            <div key={`pip${k}`} style={{ width: 12, height: 12, borderRadius: 3, background: litCount > k ? n.c : "#3A302A", boxShadow: litCount > k ? `0 0 8px ${n.c}` : "none", transform: "rotate(45deg)" }} />
          ))}
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: 1, color: "#F3E3CC" }}>{litCount}<span style={{ color: "#9A8A76" }}>/5</span></span>
      </div>

      {/* ===== POWER bar ===== */}
      <div style={{ position: "absolute", left: 506, top: 704, transform: "translateX(-50%)", width: 792, display: "flex", alignItems: "center", gap: 16, zIndex: 14 }}>
        <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(20,14,10,0.8)", border: "2px solid rgba(231,178,76,0.45)", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, letterSpacing: 2, color: "#E7C888" }}>PWR</div>
        <div style={{ flex: 1, position: "relative", height: 34, borderRadius: 17, background: "#241C17", border: "2px solid #4A3E34", overflow: "hidden", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fillPct}%`, background: `linear-gradient(90deg, ${CLAYD}, ${powCol})`, borderRadius: 15, boxShadow: `0 0 ${12 + grow * 18}px ${powCol}` }}>
            <div style={{ position: "absolute", left: `${((lf * 3) % 100)}%`, top: 0, bottom: 0, width: 40, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }} />
          </div>
          {[1, 2, 4, 6, 8, 10].map((t) => (
            <div key={`tick${t}`} style={{ position: "absolute", left: `${8 + ((t - 1) / 9) * 92}%`, top: 6, bottom: 6, width: 2, background: "rgba(255,255,255,0.14)" }} />
          ))}
        </div>
        <div style={{ position: "relative", minWidth: 96, textAlign: "center", padding: "6px 14px", borderRadius: 12, background: powerNow >= 9.5 ? "linear-gradient(158deg,#F6D98A,#E7B24C)" : "rgba(20,14,10,0.8)", border: `2px solid ${powCol}`, transform: `scale(${1 + Math.max(0, 1 - Math.abs(lf - fr(4.6)) / 6) * 0.18})`, boxShadow: powerNow >= 9.5 ? `0 0 22px ${GOLD}` : `0 0 ${grow * 12}px ${powCol}` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: powerNow >= 9.5 ? "#2A1E08" : powCol, textShadow: powerNow >= 9.5 ? "0 2px 0 rgba(255,255,255,0.4)" : "none" }}>{powLabel}</span>
        </div>
      </div>

      {/* ===== FINALE: LEVEL UP banner + celebration ===== */}
      {finale > 0.01 && (
        <div style={{ position: "absolute", left: 506, top: 206, transform: `translate(-50%,-50%) scale(${levelPop}) rotate(-3deg)`, zIndex: 30 }}>
          <div style={{ padding: "14px 40px", borderRadius: 20, background: "linear-gradient(158deg,#F6D98A,#E7B24C 55%,#D2724E)", border: "5px solid #FFF6E8", boxShadow: `0 0 40px rgba(231,178,76,0.85), 0 16px 34px -12px rgba(0,0,0,0.6)` }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1, color: "#2A1E08", textShadow: "0 3px 0 rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>LEVEL UP!</div>
          </div>
        </div>
      )}

      {/* node-light spark bursts */}
      {S0C_NODES.map((n, k) => (
        <Sparkles key={`sp${k}`} lf={lf} at={S0C_LIGHTS[k]} x={n.x} y={n.y} n={11} spread={150} colors={[n.c, "#FFF6E8", GOLD]} dur={0.7} />
      ))}
      {/* finale sparkles + confetti */}
      {finale > 0.01 && <Sparkles lf={lf} at={4.5} x={506} y={370} n={30} spread={520} colors={[GOLD, CLAY, S0C_GREEN, "#FFF6E8", SKY]} dur={1.1} />}
      <Confetti lf={lf} n={44} colors={[GOLD, CLAY, S0C_GREEN, SKY, PINK, "#FFF6E8"]} top={fr(4.5) <= lf ? -30 : -900} />

      {/* white pop on LEVEL UP */}
      {bigFlash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E8", opacity: bigFlash * 0.5, zIndex: 40, pointerEvents: "none" }} />}
    </>
  );
};

// ============================== HOOK VARIANT D — BEFORE/AFTER BUFF ==============================
const S0D_CHIPS: { i: number; e: string; cx: number; cy: number; at: number }[] = [
  { i: 1, e: "🧠", cx: 632, cy: 300, at: 0.55 },
  { i: 2, e: "🔍", cx: 884, cy: 300, at: 1.0 },
  { i: 3, e: "⚡", cx: 604, cy: 440, at: 1.45 },
  { i: 4, e: "🎨", cx: 906, cy: 440, at: 1.9 },
  { i: 5, e: "📄", cx: 756, cy: 198, at: 2.35 },
];
const S0D_BUGS = ["BUG", "ERR", "500", "FAIL", "BUG", "NULL", "ERR", "BUG", "PANIC", "500", "BUG", "ERR", "FAIL", "BUG"];

const S0D: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- global beat clocks ----
  const sink = ramp(lf, 0, fr(5)) * 26;                         // left mascot slumps
  const bugN = Math.floor(interpolate(lf, [0, fr(5)], [4, S0D_BUGS.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const chipsLanded = S0D_CHIPS.filter((c) => over(lf, fr(c.at), fr(0.4)) > 0.5).length;

  // center divider label
  const labelAt = fr(3.6);
  const label = over(lf, labelAt, fr(0.42), Easing.out(Easing.back(2.2)));

  // finale flare
  const flareAt = fr(5.2);
  const flare = over(lf, flareAt, fr(0.7), Easing.out(Easing.cubic));
  const flarePop = over(lf, flareAt, fr(0.28), Easing.out(Easing.back(2)));

  // right aura grows over time then bursts at finale
  const auraGrow = 0.62 + ramp(lf, 0, fr(4)) * 0.34 + flarePop * 0.22;
  const auraPulse = 1 + Math.sin(lf / 7) * 0.05;

  // right mascot triumphant rise + jump on finale
  const rise = -ramp(lf, fr(0.6), fr(4.5)) * 14 - flarePop * 26;
  const rScale = 1 + flarePop * 0.1;

  // power bars
  const leftFill = interpolate(sink, [0, 26], [0.11, 0.06]);
  const rightFill = Math.min(1, 0.82 + (chipsLanded / 5) * 0.14 + flarePop * 0.06);

  // divider glow pulse
  const divGlow = 0.5 + Math.sin(lf / 8) * 0.2 + flare * 0.4;

  return (
    <>
      {/* ===================== LEFT HALF — BEFORE (dim / buried) ===================== */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 506, height: 792, overflow: "hidden", background: grad("#2B2F35", "#17161F") }}>
        {/* cold vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, rgba(60,72,86,0.35), rgba(0,0,0,0) 60%)" }} />
        {/* rain streaks */}
        {Array.from({ length: 9 }).map((_, i) => {
          const p = ((lf / 26 + seed(i * 5)) % 1);
          return <div key={`r${i}`} style={{ position: "absolute", left: 30 + seed(i) * 450, top: -60 + p * 900, width: 3, height: 46, borderRadius: 2, background: "rgba(150,168,190,0.25)" }} />;
        })}

        {/* BEFORE label */}
        <div style={{ position: "absolute", left: 0, top: 30, width: 506, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: 6, color: MUTE, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>BEFORE</div>

        {/* tired mascot, sinking */}
        <div style={{ position: "absolute", left: 253, top: 350 + sink, transform: "translateX(-50%)", filter: "grayscale(0.35) brightness(0.82)" }}>
          <Mascot lf={lf} size={196} gaze={-2} nodAmp={1.4} nodSpeed={5} stern={0.55 + Math.min(0.4, sink / 60)} shock={0.35} tint={MUTE} />
          {/* sweat drop */}
          <div style={{ position: "absolute", left: 150, top: 34 + Math.sin(lf / 8) * 4, width: 12, height: 16, borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", background: SKY, opacity: 0.8 }} />
        </div>

        {/* red BUG / ERROR cards raining + piling */}
        {S0D_BUGS.slice(0, bugN).map((txt, i) => {
          const ti = i * 10 - 40;
          const p = interpolate(lf, [ti, ti + fr(0.9)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const col = i % 4, row = Math.floor(i / 4);
          const px = 48 + col * 104 + seed(i) * 22;
          const py = 596 - row * 42;
          const y = -54 + p * (py + 54);
          const x = px + Math.sin(lf / 6 + i) * 10 * (1 - p);
          const rot = (1 - p) * (seed(i) > 0.5 ? 260 : -260) + (seed(i * 3) - 0.5) * 20;
          const scale = 0.85 + seed(i * 2) * 0.35;
          return (
            <div key={`b${i}`} style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${scale})`, padding: "6px 12px", borderRadius: 9, background: grad("#D9583F", "#A83320"), border: "2.5px solid #EE8A78", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)", fontFamily: mono, fontWeight: 800, fontSize: 20, color: "#fff", display: "flex", alignItems: "center", gap: 6, zIndex: 8 }}>
              <span style={{ fontSize: 15 }}>✕</span>{txt}
            </div>
          );
        })}

        {/* LEFT power bar: 10% */}
        <div style={{ position: "absolute", left: 40, top: 664, width: 426, zIndex: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: MUTE }}>POWER</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: RED, lineHeight: 0.9, textShadow: "0 0 14px rgba(196,74,58,0.5)" }}>10%</span>
          </div>
          <div style={{ height: 26, borderRadius: 13, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.14)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${leftFill * 100}%`, borderRadius: 13, background: grad("#D9583F", "#A83320") }} />
          </div>
        </div>
      </div>

      {/* ===================== RIGHT HALF — AFTER (warm / buffed) ===================== */}
      <div style={{ position: "absolute", left: 506, top: 0, width: 506, height: 792, overflow: "hidden", background: grad("#3A2A12", "#241708") }}>
        {/* warm radial + god-rays */}
        <div style={{ position: "absolute", left: -256, top: -20, width: 500, height: 700, background: "radial-gradient(60% 55% at 50% 42%, rgba(231,178,76,0.55), rgba(231,178,76,0) 70%)" }} />
        <SpotCone x={250} top={0} topW={70} botW={320} h={520} color="rgba(255,232,170,0.14)" />

        {/* rising gold motes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const p = ((lf / 40 + seed(i * 7)) % 1);
          const s = 5 + seed(i) * 7;
          return <div key={`m${i}`} style={{ position: "absolute", left: 30 + seed(i * 2) * 440, top: 720 - p * 700, width: s, height: s, borderRadius: "50%", background: GOLD, opacity: (0.5 + seed(i) * 0.5) * (1 - p), boxShadow: `0 0 10px ${GOLD}` }} />;
        })}

        {/* AFTER label */}
        <div style={{ position: "absolute", left: 0, top: 30, width: 506, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: 6, color: GOLD, textShadow: `0 0 18px rgba(231,178,76,0.6)` }}>AFTER</div>

        {/* growing gold aura behind mascot */}
        <div style={{ position: "absolute", left: 250, top: 448, transform: `translate(-50%,-50%) scale(${auraGrow * auraPulse})`, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.55) 0%, rgba(207,149,68,0.28) 45%, rgba(207,149,68,0) 72%)", zIndex: 2 }} />

        {/* the SAME mascot, glowing, confident, caped */}
        <div style={{ position: "absolute", left: 250, top: 350 + rise, transform: `translateX(-50%) scale(${rScale})`, transformOrigin: "50% 90%", filter: "drop-shadow(0 0 26px rgba(231,178,76,0.55))", zIndex: 6 }}>
          <Mascot lf={lf} size={196} gaze={2} nodAmp={3} nodSpeed={7} cheer={Math.min(1, 0.5 + chipsLanded * 0.1 + flare * 0.4)} capeC={GOLD} />
        </div>

        {/* 5 SKILL CHIPS snapping in around the mascot */}
        {S0D_CHIPS.map((c) => {
          const on = over(lf, fr(c.at), fr(0.4), Easing.out(Easing.back(2.4)));
          if (on <= 0.01) return null;
          const gx = c.cx - 506;
          return (
            <div key={`c${c.i}`} style={{ position: "absolute", left: gx, top: c.cy, transform: `translate(-50%,-50%) scale(${on})`, zIndex: 12 }}>
              <div style={{ position: "relative", width: 92, height: 92, borderRadius: 20, background: grad("#FBEFC9", "#EBC876"), border: "3px solid #F6E4A0", boxShadow: `0 0 22px rgba(231,178,76,0.55), 0 12px 26px -10px rgba(0,0,0,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${Math.sin(lf / 9 + c.i) * 4}px)` }}>
                <span style={{ fontSize: 46, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }}>{c.e}</span>
                {/* number badge */}
                <div style={{ position: "absolute", right: -10, top: -10, width: 34, height: 34, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), border: "3px solid #FBEFC9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#fff" }}>{c.i}</div>
              </div>
            </div>
          );
        })}

        {/* sparkle on each chip snap */}
        {S0D_CHIPS.map((c) => (
          <Sparkles key={`s${c.i}`} lf={lf} at={c.at + 0.05} x={c.cx - 506} y={c.cy} n={12} spread={80} colors={[GOLD, "#FFF6DC", AMBER]} dur={0.6} />
        ))}

        {/* RIGHT power bar: 10X */}
        <div style={{ position: "absolute", left: 40, top: 664, width: 426, zIndex: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: "#F6E4A0" }}>POWER</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: GOLD, lineHeight: 0.9, textShadow: `0 0 20px rgba(231,178,76,0.8)` }}>10X</span>
          </div>
          <div style={{ height: 26, borderRadius: 13, background: "rgba(255,255,255,0.10)", border: "2px solid rgba(246,228,160,0.35)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${rightFill * 100}%`, borderRadius: 13, background: grad("#F6E4A0", "#CF9544"), boxShadow: `0 0 18px ${GOLD}` }} />
          </div>
        </div>

        {/* FINALE flare: expanding ring + burst */}
        {flare > 0.01 && (
          <div style={{ position: "absolute", left: 250, top: 430, transform: `translate(-50%,-50%) scale(${0.3 + flare * 2.4})`, width: 300, height: 300, borderRadius: "50%", border: `6px solid ${GOLD}`, opacity: Math.max(0, 1 - flare) * 0.9, boxShadow: `0 0 40px ${GOLD}`, zIndex: 14 }} />
        )}
        <Sparkles lf={lf} at={5.25} x={250} y={430} n={22} spread={220} colors={[GOLD, "#FFF6DC", AMBER, CLAY]} dur={0.9} />
        {/* finale brighten overlay */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 55% at 50% 44%, rgba(255,244,210,${flarePop * 0.35}), rgba(0,0,0,0) 65%)`, zIndex: 3, pointerEvents: "none" }} />
      </div>

      {/* ===================== CENTER DIVIDER ===================== */}
      <div style={{ position: "absolute", left: 500, top: 0, width: 12, height: 792, background: grad("#FFF6DC", "#CF9544"), boxShadow: `0 0 ${18 + divGlow * 26}px rgba(231,178,76,${0.5 + divGlow * 0.5})`, zIndex: 25 }} />

      {/* VS knob */}
      <div style={{ position: "absolute", left: 506, top: 132, transform: "translate(-50%,-50%)", width: 66, height: 66, borderRadius: "50%", background: grad("#241708", "#0E0906"), border: `4px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: GOLD, boxShadow: `0 0 24px rgba(231,178,76,0.6)`, zIndex: 28 }}>VS</div>

      {/* CENTER LABEL: 5 SKILLS = 10X */}
      {label > 0.01 && (
        <div style={{ position: "absolute", left: 506, top: 396, transform: `translate(-50%,-50%) scale(${label}) rotate(-3deg)`, opacity: Math.min(1, label * 1.4), zIndex: 40, whiteSpace: "nowrap" }}>
          <div style={{ padding: "12px 28px", borderRadius: 16, background: grad("#E9825C", "#C7541F"), border: "4px solid #FBEFC9", boxShadow: `0 0 34px rgba(207,149,68,0.7), 0 20px 44px -14px rgba(0,0,0,0.7)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#fff", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FFE9B0" }}>5 SKILLS</span>
            <span style={{ fontSize: 34, opacity: 0.85 }}>=</span>
            <span style={{ color: "#FFF6DC", textShadow: "0 0 16px rgba(255,246,220,0.8)" }}>10X</span>
          </div>
        </div>
      )}
    </>
  );
};

// ============================== HOOK VARIANT E — LOADOUT / GEAR-UP ==============================
// ===== HOOK S0E — "THE LOADOUT / GEAR-UP" — 5 skill slots + 10x power-up =====
const S0E_LOCK = [1.0, 1.7, 2.4, 3.1, 3.9];
const S0E_lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const S0E_CX = 506, S0E_CY = 360;
const S0E_SK = [
  { key: "design", label: "DESIGN", c: PINK, x: 506, y: 155, fx: 506, fy: -190 },
  { key: "plan", label: "PLAN", c: SKY, x: 744, y: 297, fx: 1250, fy: 224 },
  { key: "guard", label: "SECURITY", c: SLATE, x: 653, y: 526, fx: 1210, fy: 730 },
  { key: "hold", label: "RESTRAINT", c: CLAY, x: 359, y: 526, fx: -200, fy: 730 },
  { key: "test", label: "SELF-TEST", c: GOLD, x: 268, y: 297, fx: -250, fy: 224 },
];

const S0E_Glyph: React.FC<{ k: string; sc: string; s: number }> = ({ k, sc, s }) => {
  const p = { stroke: sc, strokeWidth: 7, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: "block" }}>
      {k === "design" && (<>
        <rect x={22} y={26} width={56} height={50} rx={9} {...p} />
        <line x1={22} y1={42} x2={78} y2={42} {...p} />
        <circle cx={38} cy={60} r={7} {...p} />
        <path d="M52 68 L63 50 L74 68" {...p} />
      </>)}
      {k === "plan" && (<>
        <rect x={24} y={20} width={52} height={60} rx={9} {...p} />
        {[36, 52, 68].map((y, idx) => (<g key={idx}><path d={`M33 ${y} l5 5 l9 -11`} {...p} /><line x1={53} y1={y} x2={70} y2={y} {...p} /></g>))}
      </>)}
      {k === "guard" && (<>
        <path d="M50 16 L79 29 V52 C79 68 66 79 50 85 C34 79 21 68 21 52 V29 Z" {...p} />
        <path d="M38 50 l8 9 l18 -21" {...p} />
      </>)}
      {k === "hold" && (<>
        <circle cx={50} cy={50} r={30} {...p} />
        <rect x={40} y={37} width={7} height={26} rx={3} fill={sc} stroke="none" />
        <rect x={53} y={37} width={7} height={26} rx={3} fill={sc} stroke="none" />
      </>)}
      {k === "test" && (<>
        <path d="M74 40 A25 25 0 1 0 78 55" {...p} />
        <path d="M74 40 l-3 -13 M74 40 l13 -2" {...p} />
        <path d="M39 51 l8 9 l17 -20" {...p} />
      </>)}
    </svg>
  );
};

const S0E: React.FC<{ lf: number }> = ({ lf }) => {
  const lockedN = S0E_LOCK.filter((t) => lf >= fr(t)).length;
  const chargeP = over(lf, fr(3.9), fr(0.9));
  const finT = over(lf, fr(4.8), fr(0.5));
  const finStart = over(lf, fr(4.8), fr(0.25));
  const mShock = chargeP * (1 - finStart);
  const mCheer = over(lf, fr(4.9), fr(0.42));
  const shake = mShock * Math.sin(lf * 4.2) * 3;
  const jump = -finT * 22;
  const idleBob = Math.sin(lf / 16) * 4;
  const powVal = interpolate(lf, [0, fr(1.0), fr(1.7), fr(2.4), fr(3.1), fr(3.9), fr(4.7), fr(5.1)], [1, 2, 3.4, 5, 7, 8.4, 8.6, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const powFill = powVal / 10;
  const aura = (lockedN / 5) * 0.5 + finT * 0.65;
  const shockwave = over(lf, fr(4.8), fr(0.6));
  const bannerIn = over(lf, fr(5.05), fr(0.32), Easing.out(Easing.cubic));
  const bannerScale = interpolate(bannerIn, [0, 0.62, 1], [1.5, 0.95, 1]);
  const bannerOp = ramp(lf, fr(5.0), fr(5.2));
  const finalMode = lf >= fr(5.0);
  const pulse = 0.5 + 0.5 * Math.sin(lf / 5);

  return (
    <>
      {/* ============ BACKGROUND — warm HUD ============ */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(168deg,#22242C 0%,#17181D 56%,#0F1014 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 92% at 50% 44%, rgba(207,149,68,${0.14 + aura * 0.14}), rgba(58,92,132,0.12) 40%, rgba(16,16,20,0) 72%)` }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,rgba(207,149,68,0.05) 0 1px,transparent 1px 46px), repeating-linear-gradient(90deg,rgba(207,149,68,0.05) 0 1px,transparent 1px 46px)", opacity: 0.5, maskImage: "radial-gradient(80% 70% at 50% 46%, #000, transparent 78%)", WebkitMaskImage: "radial-gradient(80% 70% at 50% 46%, #000, transparent 78%)" }} />
      {/* moving diagonal light sweep */}
      <div style={{ position: "absolute", left: -300 + ((lf * 6) % 1600), top: 0, width: 240, height: 792, background: "linear-gradient(100deg, transparent, rgba(231,178,76,0.06) 50%, transparent)", transform: "skewX(-12deg)" }} />
      {/* vignette + HUD corner brackets */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.55)" }} />
      {[[26, 26, 0], [986, 26, 90], [986, 766, 180], [26, 766, 270]].map(([x, y, r], i) => (
        <div key={`br${i}`} style={{ position: "absolute", left: x, top: y, width: 42, height: 42, borderTop: "3px solid rgba(231,178,76,0.5)", borderLeft: "3px solid rgba(231,178,76,0.5)", transform: `translate(-50%,-50%) rotate(${r}deg)` }} />
      ))}

      {/* ============ POWER-FEED BEAMS (behind hero) ============ */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, zIndex: 3, pointerEvents: "none" }}>
        {S0E_SK.map((sk, i) => {
          const on = lf >= fr(S0E_LOCK[i]);
          if (!on) return null;
          const bp = 0.4 + 0.6 * Math.abs(Math.sin(lf / 6 + i));
          return (
            <g key={`beam${i}`}>
              <line x1={sk.x} y1={sk.y} x2={S0E_CX} y2={S0E_CY - 6} stroke={sk.c} strokeWidth={16} opacity={0.12 + aura * 0.1} strokeLinecap="round" />
              <line x1={sk.x} y1={sk.y} x2={S0E_CX} y2={S0E_CY - 6} stroke={sk.c} strokeWidth={4} opacity={0.35 + bp * 0.4} strokeLinecap="round" strokeDasharray="10 16" strokeDashoffset={-lf * 3} />
            </g>
          );
        })}
      </svg>
      {/* converging energy dots along beams while charging */}
      {chargeP > 0.02 && S0E_SK.map((sk, i) => {
        const p = ((lf * 0.03 + i * 0.23) % 1);
        const x = S0E_lerp(sk.x, S0E_CX, p), y = S0E_lerp(sk.y, S0E_CY, p);
        return <div key={`ed${i}`} style={{ position: "absolute", left: x, top: y, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", background: sk.c, boxShadow: `0 0 14px ${sk.c}`, opacity: chargeP * (1 - p) * (1 - finStart * 0.6), zIndex: 4 }} />;
      })}

      {/* ============ PLATFORM ============ */}
      <div style={{ position: "absolute", left: S0E_CX, top: 500, transform: "translate(-50%,-50%)", zIndex: 4 }}>
        <div style={{ position: "absolute", left: -190, top: -8, width: 380, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(207,149,68,${0.28 + aura * 0.3}), transparent 70%)`, filter: "blur(4px)" }} />
        {/* rotating tech rays on the disc */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={`pr${i}`} style={{ position: "absolute", left: 0, top: 0, width: 300, height: 5, marginLeft: -150, marginTop: -2, background: "linear-gradient(90deg, transparent 40%, rgba(231,178,76,0.16) 50%, transparent 60%)", transformOrigin: "50% 50%", transform: `rotate(${i * 20 + lf * 0.8}deg) scaleY(0.34)` }} />
        ))}
        <div style={{ position: "absolute", left: -172, top: -40, width: 344, height: 84, borderRadius: "50%", background: "linear-gradient(180deg,#2C3242,#15161C)", border: "3px solid rgba(207,149,68,0.55)", boxShadow: "0 16px 34px -10px rgba(0,0,0,0.6), inset 0 6px 14px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -128, top: -30, width: 256, height: 64, borderRadius: "50%", border: "2px dashed rgba(231,178,76,0.4)", transform: `rotate(${-lf * 0.9}deg)` }} />
      </div>

      {/* ============ HERO AURA RINGS ============ */}
      <div style={{ position: "absolute", left: S0E_CX, top: S0E_CY, transform: "translate(-50%,-50%)", zIndex: 5 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 340 + aura * 200, height: 340 + aura * 200, marginLeft: -(170 + aura * 100), marginTop: -(170 + aura * 100), borderRadius: "50%", background: `radial-gradient(circle, ${lerpHex(CLAY, GOLD, finT)}55, transparent 66%)`, opacity: 0.3 + aura * 0.5, transform: `scale(${1 + pulse * 0.05 * (aura + 0.2)})` }} />
        {[0, 1, 2].map((r) => {
          const rr = 150 + r * 46 + finT * 40;
          return <div key={`ar${r}`} style={{ position: "absolute", left: 0, top: 0, width: rr * 2, height: rr * 2, marginLeft: -rr, marginTop: -rr, borderRadius: "50%", border: `2px solid ${lerpHex(CLAY, GOLD, finT)}`, opacity: (0.1 + aura * 0.28) * (1 - r * 0.22), transform: `rotate(${lf * (r % 2 ? -1 : 1) * 1.4}deg)`, borderStyle: r === 1 ? "dashed" : "solid" }} />;
        })}
      </div>

      {/* finale shockwave */}
      {shockwave > 0.01 && shockwave < 0.999 && (
        <div style={{ position: "absolute", left: S0E_CX, top: S0E_CY, width: 4, height: 4, marginLeft: -2, marginTop: -2, borderRadius: "50%", border: `6px solid ${GOLD}`, transform: `translate(-50%,-50%) scale(${shockwave * 60})`, opacity: (1 - shockwave) * 0.8, zIndex: 6 }} />
      )}
      {/* radiating light rays at finale */}
      {finT > 0.02 && Array.from({ length: 18 }).map((_, i) => (
        <div key={`fr${i}`} style={{ position: "absolute", left: S0E_CX, top: S0E_CY, width: 620, height: 8, marginLeft: -310, marginTop: -4, background: "linear-gradient(90deg, rgba(231,178,76,0.5) 0%, transparent 62%)", transformOrigin: "50% 50%", transform: `rotate(${i * 20 + lf * 0.9}deg)`, opacity: finT * 0.4, zIndex: 6 }} />
      ))}

      {/* ============ MASCOT ============ */}
      <div style={{ position: "absolute", left: S0E_CX, top: 238, transform: `translateX(-50%) translate(${shake}px, ${jump + idleBob * (1 - finT)}px) scale(${1 + finT * 0.06})`, transformOrigin: "50% 60%", zIndex: 8 }}>
        <Mascot lf={lf} size={215} gaze={0} nodAmp={3.5} nodSpeed={9} shock={mShock} cheer={mCheer} capeC={finT > 0.06 ? "#C0431F" : undefined} />
      </div>

      {/* ============ LIGHT ARMOR (finale, in front) ============ */}
      {finT > 0.03 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 11, pointerEvents: "none" }}>
          {/* halo */}
          <div style={{ position: "absolute", left: S0E_CX, top: 246, width: 168, height: 46, marginLeft: -84, borderRadius: "50%", border: `7px solid ${GOLD}`, boxShadow: `0 0 24px ${GOLD}, inset 0 0 12px ${GOLD}`, transform: `translateY(${jump}px) scale(${finT})`, opacity: finT }} />
          {/* pauldrons */}
          {[-1, 1].map((s) => (
            <div key={`pd${s}`} style={{ position: "absolute", left: S0E_CX + s * 96, top: 372 + jump, width: 56, height: 44, marginLeft: -28, marginTop: -22, borderRadius: "18px 18px 12px 12px", background: grad("#F0C25A", "#C7801F"), border: "3px solid #8A5410", boxShadow: `0 0 18px ${GOLD}88, inset 0 4px 6px rgba(255,255,255,0.4)`, transform: `scale(${finT}) rotate(${s * 8}deg)` }} />
          ))}
          {/* chest emblem — power star */}
          <div style={{ position: "absolute", left: S0E_CX, top: 398 + jump, marginLeft: -22, marginTop: -22, transform: `scale(${finT}) rotate(${lf * 2}deg)` }}>
            <svg width={44} height={44} viewBox="0 0 44 44"><path d="M22 3 L27 16 L41 16 L30 25 L34 39 L22 31 L10 39 L14 25 L3 16 L17 16 Z" fill={GOLD} stroke="#8A5410" strokeWidth={2} style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }} /></svg>
          </div>
        </div>
      )}

      {/* ============ 5 SKILL SLOTS ============ */}
      {S0E_SK.map((sk, i) => {
        const locked = lf >= fr(S0E_LOCK[i]);
        const pop = locked ? spr(lf, fr(S0E_LOCK[i]), 9, 210) : 0;
        const lockGlow = Math.max(0, 1 - (lf - fr(S0E_LOCK[i])) / 8);
        const emptyPulse = 0.5 + 0.5 * Math.sin(lf / 7 + i * 1.3);
        const gp = locked ? 0.4 + 0.6 * Math.abs(Math.sin(lf / 8 + i)) : 0;
        const sz = 118;
        return (
          <div key={`slot${i}`} style={{ position: "absolute", left: sk.x, top: sk.y, width: sz, height: sz, marginLeft: -sz / 2, marginTop: -sz / 2, zIndex: 14, transform: `scale(${locked ? 0.9 + Math.min(1.12, pop) * 0.1 : 1})` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: locked ? grad(lerpHex(sk.c, "#ffffff", 0.12), sk.c) : "rgba(20,22,30,0.72)", border: `3px solid ${locked ? "#fff" : sk.c}`, boxShadow: locked ? `0 0 ${18 + gp * 26 + lockGlow * 30}px ${sk.c}, inset 0 4px 10px rgba(255,255,255,0.25)` : `0 0 ${8 + emptyPulse * 12}px ${sk.c}55, inset 0 0 18px rgba(0,0,0,0.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {locked ? <S0E_Glyph k={sk.key} sc="#fff" s={72} /> : <div style={{ opacity: 0.3 + emptyPulse * 0.14 }}><S0E_Glyph k={sk.key} sc={sk.c} s={64} /></div>}
            </div>
            {/* slot index badge */}
            <div style={{ position: "absolute", left: -8, top: -10, width: 30, height: 30, borderRadius: "50%", background: locked ? sk.c : "rgba(20,22,30,0.9)", border: `2px solid ${locked ? "#fff" : sk.c}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: "#fff", boxShadow: locked ? `0 0 12px ${sk.c}` : "none" }}>{i + 1}</div>
            {/* label chip on lock */}
            {locked && (
              <div style={{ position: "absolute", left: "50%", top: sz + 6, transform: `translateX(-50%) scale(${Math.min(1, pop)})`, padding: "3px 11px", borderRadius: 8, background: sk.c, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, letterSpacing: 1, color: "#fff", whiteSpace: "nowrap", boxShadow: `0 4px 10px -3px rgba(0,0,0,0.5)` }}>{sk.label}</div>
            )}
            <Sparkles lf={lf} at={S0E_LOCK[i]} x={sz / 2} y={sz / 2} n={12} spread={150} colors={[sk.c, "#fff", GOLD]} dur={0.5} />
          </div>
        );
      })}

      {/* ============ FLYING CHIPS ============ */}
      {S0E_SK.map((sk, i) => {
        const st = S0E_LOCK[i] - 0.55;
        if (lf < fr(st) || lf >= fr(S0E_LOCK[i])) return null;
        const t = over(lf, fr(st), fr(0.55), Easing.out(Easing.cubic));
        const cx = S0E_lerp(sk.fx, sk.x, t), cy = S0E_lerp(sk.fy, sk.y, t);
        const cs = interpolate(t, [0, 0.8, 1], [0.5, 1.18, 1]);
        const crot = interpolate(t, [0, 1], [i % 2 ? 220 : -220, 0]);
        return (
          <div key={`fly${i}`} style={{ position: "absolute", left: cx, top: cy, zIndex: 20, transform: "translate(-50%,-50%)" }}>
            {[3, 2, 1].map((g) => {
              const gt = Math.max(0, t - 0.055 * g);
              const gx = S0E_lerp(sk.fx, sk.x, gt) - cx, gy = S0E_lerp(sk.fy, sk.y, gt) - cy;
              return <div key={g} style={{ position: "absolute", left: gx, top: gy, width: 92, height: 92, marginLeft: -46, marginTop: -46, borderRadius: 22, background: sk.c, opacity: 0.12 * (4 - g), transform: `rotate(45deg) scale(${cs * (1 - g * 0.08)})` }} />;
            })}
            <div style={{ width: 92, height: 92, marginLeft: -46, marginTop: -46, position: "absolute", borderRadius: 22, background: grad(lerpHex(sk.c, "#fff", 0.15), sk.c), border: "3px solid #fff", boxShadow: `0 0 34px ${sk.c}, 0 10px 22px -8px rgba(0,0,0,0.6)`, transform: `rotate(${45 + crot * 0.3}deg) scale(${cs})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ transform: `rotate(${-45 - crot * 0.3}deg)` }}><S0E_Glyph k={sk.key} sc="#fff" s={60} /></div>
            </div>
          </div>
        );
      })}

      {/* ============ TOP HUD — LOADOUT chip + POWER meter ============ */}
      <div style={{ position: "absolute", left: 60, top: 28, zIndex: 24, display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", borderRadius: 12, background: "rgba(18,20,28,0.88)", border: `2px solid ${CLAY}`, boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)" }}>
        <span style={{ color: GOLD, fontSize: 16 }}>◆</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: 3, color: "#EEE7D8" }}>LOADOUT</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: GOLD }}>{lockedN}<span style={{ color: MUTE, fontSize: 17 }}>/5</span></span>
      </div>

      <div style={{ position: "absolute", right: 56, top: 24, zIndex: 24, width: 396, padding: "10px 16px", borderRadius: 12, background: "rgba(18,20,28,0.88)", border: `2px solid ${finalMode ? GOLD : "rgba(207,149,68,0.5)"}`, boxShadow: finalMode ? `0 0 22px ${GOLD}88` : "0 8px 20px -8px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: "#C9C2B4" }}>POWER</span>
        <div style={{ flex: 1, display: "flex", gap: 3 }}>
          {Array.from({ length: 10 }).map((_, s) => {
            const litFrac = Math.max(0, Math.min(1, powFill * 10 - s));
            const segC = lerpHex(CLAY, GOLD, s / 9);
            return <div key={s} style={{ flex: 1, height: 20, borderRadius: 4, background: litFrac > 0 ? segC : "rgba(255,255,255,0.08)", opacity: litFrac > 0 ? 0.4 + litFrac * 0.6 : 1, boxShadow: litFrac > 0.5 ? `0 0 10px ${segC}` : "none", transform: `scaleY(${litFrac > 0.5 && s === Math.floor(powFill * 10) ? 1.15 : 1})` }} />;
          })}
        </div>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: finalMode ? 30 : 24, color: finalMode ? GOLD : "#EEE7D8", textShadow: finalMode ? `0 0 14px ${GOLD}` : "none", minWidth: 64, textAlign: "right", whiteSpace: "nowrap" }}>{finalMode ? "10X" : "x" + powVal.toFixed(1)}</span>
      </div>

      {/* ============ FINALE BANNER ============ */}
      {bannerOp > 0.01 && (
        <div style={{ position: "absolute", left: S0E_CX, top: 662, transform: `translateX(-50%) scale(${bannerScale})`, zIndex: 30, opacity: bannerOp, display: "flex", alignItems: "center", gap: 16, padding: "16px 30px", borderRadius: 20, background: grad("#2A2C36", "#171820"), border: `3px solid ${GOLD}`, boxShadow: `0 0 36px ${GOLD}77, 0 18px 40px -14px rgba(0,0,0,0.7)`, whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: 1, color: "#F4EEDF" }}>LOADOUT COMPLETE</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: MUTE }}>·</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: GOLD, textShadow: `0 0 20px ${GOLD}`, transform: `scale(${1 + pulse * 0.06})`, display: "inline-block" }}>10X</span>
        </div>
      )}

      {/* ============ PARTICLE FX ============ */}
      {lf >= fr(4.6) && <Embers lf={lf} n={20} w={1012} base={720} />}
      <Sparkles lf={lf} at={5.0} x={S0E_CX} y={S0E_CY} n={28} spread={540} colors={[GOLD, CLAY, "#fff", PINK]} dur={1.2} />
      {finalMode && <Confetti lf={lf} n={44} colors={[GOLD, CLAY, PINK, "#FCEDDD", AMBER]} top={-30} h={860} />}
    </>
  );
};

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

const SkillTreeHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
    <Sfx at={0.4} src="data.wav" v={0.2} dur={5.0} />
    <Sfx at={0.85} src="thock.wav" v={0.5} dur={0.5} />
    <Sfx at={0.9} src="lib_boom.wav" v={0.4} dur={1.0} />
    {[2.4, 3.1, 3.8, 4.5, 5.2].map((t, i) => (
      <React.Fragment key={`node${i}`}>
        <Sfx at={t} src="c_unlock.wav" v={0.34} dur={0.4} />
        <Sfx at={t} src={`blip${i + 1}.wav`} v={0.3} dur={0.3} />
        <Sfx at={t + 0.02} src="ding.wav" v={0.22} dur={0.4} />
      </React.Fragment>
    ))}
    <Sfx at={5.5} src="metal_riser.wav" v={0.42} dur={0.8} />
    <Sfx at={5.8} src="lib_boom.wav" v={0.6} dur={1.4} />
    <Sfx at={5.82} src="c_powerbig.wav" v={0.4} dur={0.9} />
    <Sfx at={5.85} src="angelic.wav" v={0.36} dur={1.8} />
    <Sfx at={5.9} src="c_1up.wav" v={0.3} dur={1.0} />
    <Sfx at={5.9} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);
const BuffHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
    <Sfx at={0.3} src="sub.wav" v={0.24} dur={1.4} />
    {[1.0, 1.6, 2.2, 2.8, 3.4, 4.0].map((t, i) => <Sfx key={`bug${i}`} at={t} src="bonk.mp3" v={0.22} dur={0.3} />)}
    {[2.4, 3.1, 3.8, 4.5, 5.2].map((t, i) => (
      <React.Fragment key={`chip${i}`}>
        <Sfx at={t} src="thock.wav" v={0.42} dur={0.35} />
        <Sfx at={t} src={`blip${i + 1}.wav`} v={0.28} dur={0.3} />
      </React.Fragment>
    ))}
    <Sfx at={2.0} src="lib_notif.wav" v={0.3} dur={0.4} />
    <Sfx at={5.5} src="metal_riser.wav" v={0.42} dur={0.8} />
    <Sfx at={5.8} src="lib_boom.wav" v={0.6} dur={1.4} />
    <Sfx at={5.82} src="rocket_explode.wav" v={0.34} dur={1.0} />
    <Sfx at={5.85} src="angelic.wav" v={0.36} dur={1.8} />
    <Sfx at={5.9} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);
const LoadoutHookSfx = (
  <>
    <Sfx at={0} src="lib_deep_whoosh.wav" v={0.5} dur={1.0} />
    <Sfx at={0.4} src="digital-loading.wav" v={0.2} dur={2.0} />
    <Sfx at={0.85} src="thock.wav" v={0.5} dur={0.5} />
    {[2.4, 3.1, 3.8, 4.5, 5.2].map((t, i) => (
      <React.Fragment key={`slot${i}`}>
        <Sfx at={t - 0.25} src="swooshdn.wav" v={0.24} dur={0.3} />
        <Sfx at={t} src="ice-in-glass.mp3" v={0.4} dur={0.35} />
        <Sfx at={t + 0.01} src="lib_click.wav" v={0.24} dur={0.2} />
        <Sfx at={t + 0.02} src={`blip${i + 1}.wav`} v={0.26} dur={0.3} />
      </React.Fragment>
    ))}
    <Sfx at={5.4} src="riser.wav" v={0.42} dur={0.9} />
    <Sfx at={5.7} src="snap.wav" v={0.6} dur={0.5} />
    <Sfx at={5.75} src="lib_boom.wav" v={0.6} dur={1.4} />
    <Sfx at={5.78} src="c_powerbig.wav" v={0.4} dur={0.9} />
    <Sfx at={5.85} src="angelic.wav" v={0.36} dur={1.8} />
    <Sfx at={5.9} src="crowd_cheer.wav" v={0.22} dur={1.6} />
  </>
);

// ============================== exports (3 hook variants over the same reel) ==============================
export const ClaudeHaalandReel: React.FC = () => <PowersReelBody Hook={S0} HookSfx={GauntletHookSfx} />;

