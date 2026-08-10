import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile, spring } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_cheats.json";

// ============================== palette / helpers ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE", SLATE = "#3A5C84", PINK = "#E27BA0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";

// scene onsets (sec, sped VO): hook / support / content / lead / proof / cta
const L = [0.0, 10.78, 16.58, 21.32, 25.48, 30.36, 35.16];
const Lf = L.map(fr);
const CUT = 38.2; // CHEATS reel length (tightened VO)

// game-show wheel selector tick schedule (sec): fast early, decelerating late, then lock.
// shared by S0's visual highlight AND the per-tick beep SFX so they stay in lockstep.
const SPIN_TICKS: number[] = (() => { const out: number[] = []; let t = 0.9, iv = 0.075; while (t < 3.5) { out.push(t); t += iv; iv *= 1.17; } return out; })();
const SPIN_LOCK = 3.55;

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const money = (n: number) => "$" + Math.round(n).toLocaleString();

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
const Bloom: React.FC<{ lf: number; color?: string; x?: number; y?: number; r?: number }> = ({ lf, color = "rgba(210,114,78,0.2)", x = 506, y = 380, r = 440 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, ${color}, transparent 66%)`, opacity: 0.7 + 0.3 * Math.sin(lf / 12), filter: "blur(6px)", pointerEvents: "none" }} />
);
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
const Coins: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; spread?: number; dur?: number }> = ({ lf, at, x, y, n = 14, spread = 260, dur = 1.1 }) => {
  const p = ramp(lf, fr(at), fr(at + dur));
  if (p <= 0.001 || p >= 0.999) return null;
  return <>{Array.from({ length: n }).map((_, k) => { const a = (k / n) * Math.PI - Math.PI * 0.1 + seed(k); const dx = Math.cos(a) * spread * (0.4 + seed(k) * 0.9); const dy = -Math.abs(Math.sin(a)) * 120 + p * p * 460; const s = 26 + seed(k * 3) * 10; return <div key={k} style={{ position: "absolute", left: x + dx * p - s / 2, top: y + dy - s / 2, width: s, height: s, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #F6E4A0, #D39A2A 72%)", border: "2px solid #B9821F", opacity: Math.max(0, 1 - p * 0.9), transform: `rotate(${p * 300 + k * 40}deg)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: s * 0.5, color: "#8a6410" }}>$</div>; })}</>;
};

// ============================== polish primitives (lighting / grain / chips / physics) ==============================
// spring overshoot 0..~1
const spr = (frame: number, delay = 0, damping = 12, stiffness = 200, mass = 1) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness, mass }, durationInFrames: 200 });
// perimeter point on a w x h rect, t in [0,1)
const rectPt = (t: number, w: number, h: number): [number, number] => {
  const P = 2 * (w + h); let d = ((t % 1) + 1) % 1 * P;
  if (d < w) return [d, 0]; d -= w;
  if (d < h) return [w, d]; d -= h;
  if (d < w) return [w - d, h]; d -= w;
  return [0, h - d];
};
// low-alpha film grain to kill banding
const Grain: React.FC<{ op?: number }> = ({ op = 0.05 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "overlay", opacity: op }}>
    <filter id="gn"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
    <rect width="100%" height="100%" filter="url(#gn)" />
  </svg>
);
const Vignette: React.FC<{ strength?: number; shape?: string }> = ({ strength = 0.5, shape = "62% 58% at 50% 42%" }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse ${shape}, transparent 44%, rgba(6,10,20,${strength}) 100%)` }} />
);
// tapering volumetric light beam + landing pool
const SpotCone: React.FC<{ x: number; top?: number; topW?: number; botW?: number; h?: number; color?: string; sway?: number; lf?: number; pool?: number }> = ({ x, top = 0, topW = 40, botW = 260, h = 360, color = "rgba(255,246,220,0.16)", sway = 0, lf = 0, pool = 1 }) => {
  const a = sway ? Math.sin(lf / 22) * sway : 0; const tp = (topW / botW) * 50;
  return (
    <div style={{ position: "absolute", left: x, top, width: botW, height: h, transform: `translateX(-50%) rotate(${a}deg)`, transformOrigin: "50% 0%", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, clipPath: `polygon(${50 - tp}% 0, ${50 + tp}% 0, 100% 100%, 0 100%)`, background: `linear-gradient(180deg, ${color}, transparent 92%)` }} />
      {pool > 0 && <div style={{ position: "absolute", left: "50%", top: h - 34, width: botW * 0.86, height: 60, transform: "translateX(-50%)", borderRadius: "50%", background: `radial-gradient(ellipse, ${color}, transparent 70%)`, opacity: pool }} />}
    </div>
  );
};
// unified metric chip: dark pill + terracotta border + mono UPPER label + Fraunces value
const Metric: React.FC<{ label: string; value: React.ReactNode; accent?: string; pop?: number }> = ({ label, value, accent = CLAY, pop = 0 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 15px", borderRadius: 999, background: "rgba(11,15,25,0.68)", border: `1.5px solid ${accent}`, transform: `scale(${1 + pop * 0.12})`, boxShadow: pop > 0.05 ? `0 0 16px ${accent}` : "none" }}>
    <span style={{ fontFamily: mono, fontSize: 16, letterSpacing: 1.5, color: "rgba(228,234,246,0.66)" }}>{label}</span>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", lineHeight: 1 }}>{value}</span>
  </div>
);
// amber seven-seg-style jackpot board
const LedBoard: React.FC<{ value: number; label?: string; pop?: number }> = ({ value, label = "TODAY", pop = 0 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "8px 18px", borderRadius: 12, background: "#0A0A0C", border: "3px solid #2A2214", boxShadow: `inset 0 0 16px rgba(0,0,0,0.85), 0 0 ${16 + pop * 22}px rgba(231,181,75,${0.28 + pop * 0.4})`, transform: `scale(${1 + pop * 0.12})` }}>
    <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: 2, color: "#7A6A3A" }}>{label}</span>
    <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 40, letterSpacing: 2, color: "#F2C14E", textShadow: "0 0 12px rgba(242,193,78,0.85)" }}>{money(value)}</span>
  </div>
);
// looping confetti with gravity + spin
const Confetti: React.FC<{ lf: number; n?: number; colors?: string[]; w?: number; top?: number; h?: number }> = ({ lf, n = 40, colors = [CLAY, GOLD, GREEN, "#FCEDDD"], w = 1012, top = -20, h = 900 }) => (
  <>{Array.from({ length: n }).map((_, i) => {
    const life = 90 + seed(i) * 60; const t = (lf + seed(i * 3) * life) % life; const p = t / life;
    const x = seed(i) * w + Math.sin(lf / 18 + i) * 26; const y = top + p * h; const c = colors[i % colors.length];
    const s = 7 + seed(i * 2) * 9; const rot = (lf * (4 + seed(i) * 6)) % 360; const op = Math.min(1, p * 6) * Math.max(0, 1 - (p - 0.82) / 0.18);
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.58, background: c, opacity: op, transform: `rotate(${rot}deg) scaleX(${Math.cos(lf / 9 + i)})`, borderRadius: 1 }} />;
  })}</>
);
// premium coin face (specular arc + rim)
const CoinFace: React.FC<{ s: number; spin?: number }> = ({ s, spin = 1 }) => (
  <div style={{ width: s, height: s, borderRadius: "50%", background: "radial-gradient(circle at 36% 30%, #FBEEB6, #E7B24C 46%, #C68A24 82%)", border: "2px solid #A9781F", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transform: `scaleX(${spin >= 0 ? Math.max(0.2, spin) : Math.min(-0.2, spin)})`, boxShadow: "0 4px 8px -4px rgba(80,50,10,0.55)" }}>
    <div style={{ position: "absolute", left: "20%", top: "14%", width: "44%", height: "26%", borderRadius: "50%", background: "rgba(255,255,255,0.55)", filter: "blur(1px)" }} />
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: s * 0.52, color: "#8a6410" }}>$</span>
  </div>
);

// real rotating gear
const Gear: React.FC<{ s: number; lf: number; dir?: number; teeth?: number; color?: string; hub?: string }> = ({ s, lf, dir = 1, teeth = 10, color = "#55657C", hub = "#1A2230" }) => (
  <svg viewBox="-50 -50 100 100" width={s} height={s} style={{ transform: `rotate(${lf * dir * 4}deg)`, overflow: "visible" }}>
    {Array.from({ length: teeth }).map((_, i) => <rect key={i} x={-7} y={-50} width={14} height={17} rx={3} fill={color} transform={`rotate(${(i * 360) / teeth})`} />)}
    <circle r={35} fill={color} />
    <circle r={22} fill={hub} />
    <circle r={7} fill={color} />
  </svg>
);

// clay critter (canonical) + claude mark
const ClaudeMark: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="-100 -100 200 200" width={size} height={size}>
    {Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 66 : 84; const tip = i % 2 ? 7.5 : 9; return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#fff" stroke="#fff" strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />; })}
    <circle r={17} fill="#fff" />
  </svg>
);

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number; robber?: number; host?: number; xeyes?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0, robber = 0, host = 0, xeyes = 0 }) => {
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
        {/* robber: black beanie + eye-mask band (eyes draw on top) + striped jumper */}
        {robber > 0 && <>
          <rect x={34} y={30} width={132} height={20} fill="#22262E" />
          <rect x={34} y={46} width={132} height={5} fill="#15181E" />
          <rect x={34} y={60} width={132} height={28} fill="#22262E" />
          <rect x={60} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={106} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={34} y={106} width={132} height={40} fill="#E8E4DA" />
          <rect x={34} y={108} width={132} height={9} fill="#22262E" />
          <rect x={34} y={126} width={132} height={9} fill="#22262E" />
        </>}
        {/* zuck tee + pale wash + optional gold chain */}
        {zuck > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.14)" />
          <rect x={34} y={106} width={132} height={40} fill="#B7BAC0" />
          <rect x={34} y={106} width={132} height={6} fill="#9DA1A8" />
          <rect x={34} y={140} width={132} height={6} fill="#A6AAB1" />
          <rect x={80} y={106} width={40} height={6} fill="#8C9098" />
          <rect x={86} y={112} width={28} height={5} fill="#8C9098" />
          <rect x={94} y={117} width={12} height={4} fill="#8C9098" />
        </>}
        {zuckChain > 0 && <>
          <rect x={78} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={84} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={92} y={119} width={16} height={4} fill="#E7B24C" />
          <rect x={106} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={114} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={98} y={121} width={4} height={4} fill="#F0CB63" />
        </>}
        {/* alexandr wang: black crew tee */}
        {wang > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.10)" />
          <rect x={34} y={106} width={132} height={40} fill="#2A2A32" />
          <rect x={34} y={106} width={132} height={6} fill="#1E1E24" />
          <rect x={34} y={140} width={132} height={6} fill="#232329" />
          <rect x={80} y={106} width={40} height={6} fill="#3A3A44" />
          <rect x={86} y={112} width={28} height={5} fill="#3A3A44" />
          <rect x={94} y={117} width={12} height={4} fill="#3A3A44" />
        </>}
        {/* bikini */}
        {bikini > 0 && <>
          <rect x={44} y={110} width={112} height={5} fill="#E23B86" />
          <rect x={44} y={114} width={112} height={13} fill="#FF4FA3" />
          <polygon points="60,114 80,114 70,130" fill="#FF4FA3" /><polygon points="120,114 140,114 130,130" fill="#FF4FA3" />
          <rect x={80} y={138} width={40} height={12} fill="#FF4FA3" />
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
        {/* game-show host: crimson satin jacket + gold bowtie */}
        {host > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#9A2530" />
          <rect x={34} y={106} width={132} height={6} fill="#7A1B24" />
          <rect x={40} y={110} width={9} height={36} fill="#B23A45" opacity={0.6} />
          <rect x={151} y={110} width={9} height={36} fill="#B23A45" opacity={0.6} />
          <rect x={92} y={106} width={16} height={40} fill="#F4F1EA" />
          <polygon points="84,116 100,124 84,132" fill="#E7B24C" />
          <polygon points="116,116 100,124 116,132" fill="#E7B24C" />
          <rect x={95} y={120} width={10} height={8} rx={2} fill="#C9932A" />
        </>}
        {/* business suit + tie */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" />
          <rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" />
          <polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {/* dinosaur costume: green belly + tail */}
        {dino > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#5FA85A" />
          <rect x={34} y={106} width={132} height={6} fill="#4A8C46" />
          <rect x={60} y={130} width={80} height={10} fill="#7CC276" />
          <polygon points="166,116 208,106 208,146 166,142" fill="#5FA85A" /><polygon points="188,108 196,102 196,110" fill="#3E7A3A" /><polygon points="198,110 206,105 206,113" fill="#3E7A3A" />
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
        {/* zuck hair: signature straight fringe */}
        {zuck > 0 && <>
          <rect x={30} y={40} width={140} height={14} fill="#5A4632" />
          <rect x={30} y={40} width={140} height={5} fill="#4A3927" />
          <rect x={30} y={54} width={14} height={16} fill="#5A4632" />
          <rect x={156} y={54} width={14} height={16} fill="#5A4632" />
          {zuckCurly > 0 ? <>
            <rect x={40} y={54} width={120} height={10} fill="#5A4632" />
            <rect x={44} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={68} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={92} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={116} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={140} y={64} width={16} height={6} fill="#5A4632" />
          </> : <>
            <rect x={40} y={54} width={120} height={12} fill="#5A4632" />
            <rect x={58} y={66} width={18} height={3} fill="#5A4632" />
            <rect x={124} y={66} width={18} height={3} fill="#5A4632" />
          </>}
          <rect x={96} y={54} width={8} height={6} fill="#4A3927" />
          <rect x={46} y={56} width={40} height={3} fill="#6B5540" />
        </>}
        {/* alexandr wang: short black hair */}
        {wang > 0 && <>
          <rect x={32} y={38} width={136} height={14} fill="#1C1C22" />
          <rect x={32} y={38} width={136} height={5} fill="#0F0F14" />
          <rect x={32} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={156} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={44} y={52} width={38} height={9} fill="#1C1C22" />
          <rect x={82} y={52} width={46} height={7} fill="#1C1C22" />
          <rect x={128} y={52} width={30} height={9} fill="#1C1C22" />
          <rect x={58} y={61} width={22} height={4} fill="#1C1C22" />
          <rect x={102} y={59} width={16} height={4} fill="#1C1C22" />
          <rect x={88} y={50} width={22} height={4} fill="#2C2C36" />
        </>}
        {/* girl long hair */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={30} y={36} width={140} height={16} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={7} fill="#6E4A2C" />
        </>}
        {/* dino head spikes */}
        {dino > 0 && <>
          <polygon points="66,44 78,24 90,44" fill="#3E7A3A" /><polygon points="90,44 102,20 114,44" fill="#3E7A3A" /><polygon points="114,44 126,24 138,44" fill="#3E7A3A" />
        </>}
        {/* construction hardhat */}
        {constr > 0 && <>
          <polygon points="100,10 62,34 138,34" fill="#F5CE55" />
          <rect x={44} y={30} width={112} height={12} fill="#F5CE55" />
          <rect x={30} y={40} width={140} height={10} fill="#D9A626" />
          <rect x={94} y={16} width={12} height={16} fill="#E9BE3F" />
        </>}
        {/* game-show host top hat (black with a crimson band) */}
        {host > 0 && <>
          <rect x={46} y={30} width={108} height={12} rx={2} fill="#17171C" />
          <rect x={64} y={-10} width={72} height={42} fill="#202026" />
          <rect x={64} y={-10} width={72} height={6} fill="#2E2E37" />
          <rect x={64} y={19} width={72} height={10} fill="#8A2530" />
        </>}
        {/* chef toque */}
        {chef > 0 && <>
          <rect x={54} y={28} width={92} height={20} fill="#F4F1EA" />
          <rect x={56} y={6} width={26} height={26} rx={10} fill="#F4F1EA" /><rect x={86} y={2} width={28} height={30} rx={12} fill="#F8F5EF" /><rect x={118} y={6} width={26} height={26} rx={10} fill="#F4F1EA" />
          <rect x={54} y={40} width={92} height={8} fill="#E2DDD0" />
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
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5), transform: "rotate(8deg)" }} />}
    </div>
  );
};

// support-bot headset + cupid bow, drawn as props over a plain Mascot
const Headset: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <svg viewBox="0 0 200 200" width={190 * s} height={190 * s} style={{ position: "absolute", left: x, top: y, overflow: "visible", pointerEvents: "none" }}>
    <path d="M40 96 Q100 34 160 96" fill="none" stroke="#22262E" strokeWidth={12} strokeLinecap="round" />
    <rect x={26} y={86} width={26} height={40} rx={10} fill="#2A2E38" />
    <rect x={148} y={86} width={26} height={40} rx={10} fill="#2A2E38" />
    <path d="M52 116 Q78 150 92 138" fill="none" stroke="#22262E" strokeWidth={7} strokeLinecap="round" />
    <circle cx={94} cy={138} r={9} fill="#2A2E38" />
  </svg>
);

// ============================== the dark macbook panel ==============================
const P_TOP = 384, P_H = 792;
const Panel: React.FC<{ lf: number; label?: string; tint?: string; ambient?: string; base?: [string, string]; cscale?: number; shakeX?: number; children?: React.ReactNode }> = ({ label, tint = "rgba(120,150,200,0.22)", ambient = "rgba(90,120,200,0.12)", base = ["#1B2334", "#0F1522"], cscale = 1, shakeX = 0, children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H, borderRadius: 36, background: grad(base[0], base[1]), boxShadow: SH, overflow: "hidden", border: `2px solid ${tint}` }}>
    {/* ambient top wash */}
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 82% at 50% -12%, ${ambient}, transparent 60%)`, pointerEvents: "none" }} />
    {/* push-in / entry-pop content */}
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${shakeX}px) scale(${cscale})`, transformOrigin: "50% 46%" }}>
      {children}
    </div>
    {/* filmic overlays: inner edge, lit-center vignette, grain */}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(220,235,255,0.08), inset 0 0 150px rgba(0,0,0,0.55)", pointerEvents: "none", borderRadius: 36 }} />
    <Vignette strength={0.4} />
    <Grain op={0.045} />
    {/* window chrome */}
    <div style={{ position: "absolute", left: 26, top: 20, display: "flex", gap: 9, alignItems: "center", zIndex: 30 }}>
      {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}
      {label && <span style={{ marginLeft: 12, fontFamily: mono, fontSize: 20, color: "rgba(190,205,235,0.5)" }}>{label}</span>}
    </div>
  </div>
);

// persistent revenue HUD (climbs 0 -> 5k -> 10k -> 15k)
const RevenueHUD: React.FC<{ f: number }> = ({ f }) => {
  const t = f / FPS;
  // steps land near each skill's dollar beat
  const val = interpolate(t, [0, L[1] + 1.4, L[1] + 1.9, L[2] + 3.2, L[2] + 3.7, L[3] + 3.6, L[3] + 4.1, L[4] + 3.6, L[4] + 4.1],
    [0, 0, 5000, 5000, 10000, 10000, 15000, 15000, 15000], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  if (t < L[1] + 0.4) return null;
  const pop = [L[1] + 1.9, L[2] + 3.7, L[3] + 4.1].reduce((m, s) => Math.max(m, t >= s ? Math.max(0, 1 - (t - s) * 3) : 0), 0);
  return (
    <div style={{ position: "absolute", left: "50%", top: 1092, zIndex: 115, transform: `translateX(-50%) scale(${1 + pop * 0.1})`, display: "flex", alignItems: "center", gap: 12, padding: "11px 26px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), border: "2.5px solid #F3B292", boxShadow: pop > 0.05 ? `0 0 24px ${GOLD}` : "0 8px 20px -8px rgba(199,84,31,0.6)" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(255,255,255,0.9)" }}>you charge</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#fff" }}>{money(val)}</span>
    </div>
  );
};

// small reusable UI atoms for scenes
const TicketCard: React.FC<{ x: number; y: number; rot: number; done?: boolean; op?: number }> = ({ x, y, rot, done, op = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 74, height: 52, borderRadius: 8, background: done ? "#DFF3E7" : "#FCEDEA", border: `2px solid ${done ? GREEN : RED}`, transform: `rotate(${rot}deg)`, opacity: op, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.4)" }}>
    {done ? <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: GREEN }}>DONE</span>
      : <div><div style={{ width: 40, height: 4, borderRadius: 2, background: RED, opacity: 0.6, margin: "5px auto" }} /><div style={{ width: 30, height: 4, borderRadius: 2, background: RED, opacity: 0.4, margin: "0 auto" }} /></div>}
  </div>
);
const PostCard: React.FC<{ x: number; y: number; rot: number; c: string; sc?: number }> = ({ x, y, rot, c, sc = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 64, height: 78, borderRadius: 9, background: "#FCFAF5", border: "2px solid #E4DCC8", transform: `rotate(${rot}deg) scale(${sc})`, boxShadow: "0 8px 16px -7px rgba(20,26,45,0.4)", overflow: "hidden" }}>
    <div style={{ height: 30, background: c }} />
    <div style={{ padding: "7px 8px" }}>
      <div style={{ height: 5, borderRadius: 3, background: "#D8D2C4", marginBottom: 5 }} />
      <div style={{ height: 5, borderRadius: 3, background: "#D8D2C4", width: "70%" }} />
    </div>
  </div>
);
const Heart: React.FC<{ s: number; c?: string }> = ({ s, c = RED }) => (
  <svg viewBox="0 0 32 30" width={s} height={(s * 30) / 32} style={{ overflow: "visible", filter: "drop-shadow(0 3px 6px rgba(196,74,58,0.4))" }}>
    <path d="M16 29 C16 29 2 19 2 10 C2 4.5 6 2 9 2 C12 2 15 5 16 7.4 C17 5 20 2 23 2 C26 2 30 4.5 30 10 C30 19 16 29 16 29 Z" fill={c} stroke="#fff" strokeWidth={1.4} />
  </svg>
);
const Trophy: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 120" width={s} height={s * 1.2} style={{ overflow: "visible", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.28))" }}>
    <path d="M22 12 H78 V38 A28 28 0 0 1 22 38 Z" fill="#F0CB63" stroke="#C9932A" strokeWidth={3} />
    <path d="M22 18 H8 A11 11 0 0 0 20 44" fill="none" stroke="#C9932A" strokeWidth={6} />
    <path d="M78 18 H92 A11 11 0 0 1 80 44" fill="none" stroke="#C9932A" strokeWidth={6} />
    <rect x={44} y={64} width={12} height={20} fill="#D6A93A" />
    <rect x={30} y={84} width={40} height={12} rx={3} fill="#E7B24C" />
    <rect x={24} y={96} width={52} height={13} rx={3} fill="#D6A93A" />
    <path d="M39 22 L50 30 L61 22" fill="none" stroke="#FFF3D6" strokeWidth={3} strokeLinecap="round" />
  </svg>
);


// ============================== WRAPPED — Wrapped cards flipping INSIDE the house panel ==============================
const CW = 1012, CH = 792;                          // panel-local card space
const codeOn = [10.78, 16.58, 21.32, 25.48, 30.36]; // 5 code onsets (sec)
const HOOK_ON = 0.0, OUTRO_ON = 35.16;
const ARCADE = "'Courier New', ui-monospace, monospace";
const CODES: { key: string; tag: string; c: string }[] = [
  { key: "ORACLE",  tag: "THE TOP EXPERT ALIVE",     c: "#40C463" },
  { key: "PROPHET", tag: "SEES WHERE IT BREAKS",     c: "#C88CF0" },
  { key: "GHOST",   tag: "WRITES IN YOUR VOICE",     c: "#F0674C" },
  { key: "SNIPER",  tag: "ONLY THE MOVE THAT WINS",  c: "#E8C24A" },
  { key: "GODMODE", tag: "ALL FOUR AT ONCE",         c: "#F2C14E" },
];
const starPts = (spikes: number, outer: number, inner: number) => { let p = ""; for (let i = 0; i < spikes * 2; i++) { const r = i % 2 ? inner : outer; const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2; p += `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; } return p.trim(); };
const Arc: React.FC<{ t: string; top: number; s?: number; c?: string; sh?: string; ls?: number; op?: number }> = ({ t, top, s = 60, c = "#fff", sh = "#1A1712", ls = 2, op = 1 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", fontFamily: ARCADE, fontWeight: 900, fontSize: s, letterSpacing: ls, color: c, textShadow: `4px 4px 0 ${sh}, -1px -1px 0 ${sh}`, lineHeight: 1.02, opacity: op }}>{t}</div>
);

// ============================== ARMORED-HERO CITY (original design, not any franchise) ==============================
const VISOR = "#8FD3E8", RED_A = "#D8342B", RED_D = "#8E1C15", RED_L = "#F0574B", STEEL = "#EAF0F6", STEELD = "#AEBAC6", JOINT = "#23272F";
const UIF = inter.fontFamily, TITLE = fraunces.fontFamily;
const skyH = (n: number, sd: number) => Array.from({ length: n }, (_, i) => 120 + Math.floor(seed(i * 3.3 + sd) * 230));

// layered city skyline + rooftop ledge
const City: React.FC<{ f: number; sky: [string, string]; bld: string; win: string; winOp?: number; air?: boolean; roof?: boolean; scroll?: number; sun?: string; sunX?: number; sunY?: number }> = ({ f, sky, bld, win, winOp = 0.55, air = false, roof = true, scroll = 0, sun, sunX = 720, sunY = 150 }) => {
  const far = skyH(9, 1), near = skyH(8, 7);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 82%)` }} />
      {sun && <div style={{ position: "absolute", left: sunX, top: sunY, width: 168, height: 168, borderRadius: "50%", background: `radial-gradient(circle, ${sun}, transparent 68%)`, filter: "blur(2px)" }} />}
      {/* far skyline */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: air ? 150 : 250 }}>
        {far.map((h, i) => { const x = ((i * 128 - scroll * 0.14) % 1300 + 1300) % 1300 - 130; const w = 96 + (i % 3) * 20; return <div key={`f${i}`} style={{ position: "absolute", left: x, bottom: 0, width: w, height: h, background: bld, opacity: 0.5 }} />; })}
      </div>
      {/* near skyline w/ windows */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: air ? 60 : 190 }}>
        {near.map((h, i) => { const x = ((i * 158 - scroll * 0.3) % 1320 + 1320) % 1320 - 132; const w = 120 + (i % 2) * 28; const hh = h + 70; return (
          <div key={`n${i}`} style={{ position: "absolute", left: x, bottom: 0, width: w, height: hh, background: `linear-gradient(180deg, ${bld}, rgba(0,0,0,0.42))`, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.05)" }}>
            {[...Array(Math.max(1, Math.floor(hh / 36)))].map((_, r) => [...Array(Math.max(1, Math.floor(w / 32)))].map((__, cix) => (seed(i * 21 + r * 5 + cix) > 0.46 ? <div key={`${r}-${cix}`} style={{ position: "absolute", left: 13 + cix * 32, top: 18 + r * 36, width: 14, height: 18, background: win, opacity: winOp * (0.45 + seed(i + r + cix) * 0.55), borderRadius: 1 }} /> : null)))}
          </div>
        ); })}
      </div>
      {roof && <>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: `linear-gradient(180deg, ${bld}, rgba(0,0,0,0.62))` }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 14, background: "rgba(255,255,255,0.1)" }} />
        {[...Array(12)].map((_, i) => <div key={`pa${i}`} style={{ position: "absolute", left: i * 92 - (scroll % 92), bottom: 150, width: 70, height: 24, background: bld, borderTop: "2px solid rgba(255,255,255,0.08)", boxShadow: "inset -3px 0 0 rgba(0,0,0,0.3)" }} />)}
      </>}
      {/* soft atmospheric haze at horizon */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: air ? 150 : 190, height: 90, background: `linear-gradient(0deg, ${sky[1]}, transparent)`, opacity: 0.55 }} />
    </div>
  );
};

// ===== canonical repo sprite library (ported from ClaudePowersReel — DO NOT rebuild these) =====
const GEMS5 = ["#9E7BC8", "#5AA0DE", "#C44A3A", "#3F9E74", "#E7B24C"];
const THANOS = "#A855F7";
const lerpHex = (a: string, b: string, t: number) => { t = Math.max(0, Math.min(1, t)); const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)); const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16)); const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * t)); return "#" + m.map((v) => v.toString(16).padStart(2, "0")).join(""); };
const Embers2: React.FC<{ lf: number; n?: number; w?: number; base?: number; c?: string }> = ({ lf, n = 16, w = 1012, base = 760, c = "#F2903E" }) => (
  <>{Array.from({ length: n }).map((_, i) => { const life = 70 + seed(i) * 50; const t = (lf + seed(i * 3) * life) % life; const p = t / life; const x = seed(i) * w + Math.sin(lf / 10 + i * 2) * 30; const y = base - p * 560; const sz = 4 + seed(i * 2) * 6; return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: p > 0.6 ? "#7A3018" : c, opacity: (1 - p) * 0.9, boxShadow: p < 0.5 ? `0 0 8px ${c}` : "none" }} />; })}</>
);
const Stamp: React.FC<{ x: number; y: number; s: number; text: string; c?: string; rot?: number }> = ({ x, y, s, text, c = RED, rot = -6 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${s})`, padding: "7px 18px", borderRadius: 12, background: c, border: "3.5px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.55)", whiteSpace: "nowrap", zIndex: 40 }}>{text}</div>
);
const CMark: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="-100 -100 200 200" width={size} height={size}>
    {Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 66 : 84; const tip = i % 2 ? 7.5 : 9; return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#fff" stroke="#fff" strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />; })}
    <circle r={17} fill="#fff" />
  </svg>
);
const CMascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; constr?: number; chef?: number; suit?: number; beard?: number; xeyes?: number; samurai?: number; fro?: number; capeC?: string; tint?: string }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, constr = 0, chef = 0, suit = 0, beard = 0, xeyes = 0, samurai = 0, fro = 0, capeC, tint }) => {
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
        {capeC && <><rect x={24} y={50} width={152} height={104 + Math.sin(lf / 6) * 6} fill={capeC} transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} /><rect x={24} y={144 + Math.sin(lf / 6) * 6} width={152} height={12} fill="rgba(0,0,0,0.2)" transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} /></>}
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {beard > 0 && <><rect x={44} y={98} width={112} height={26} fill="#F4EEE2" /><rect x={56} y={122} width={88} height={20} fill="#F4EEE2" /><rect x={74} y={140} width={52} height={16} fill="#F4EEE2" /><rect x={90} y={154} width={20} height={12} fill="#EDE6D6" /></>}
        {suit > 0 && <><rect x={34} y={106} width={132} height={40} fill="#26324A" /><rect x={34} y={106} width={132} height={6} fill="#1A2438" /><rect x={88} y={106} width={24} height={40} fill="#F4F1EA" /><polygon points="88,106 100,124 112,106" fill="#26324A" /><rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" /></>}
        {constr > 0 && <><rect x={34} y={106} width={132} height={40} fill="#E4622B" /><rect x={44} y={113} width={112} height={5} fill="#F4F1EA" /><rect x={44} y={134} width={112} height={5} fill="#F4F1EA" /><rect x={92} y={106} width={16} height={40} fill="#C94E1C" /></>}
        {chef > 0 && <><rect x={34} y={106} width={132} height={40} fill="#F4F1EA" /><rect x={34} y={106} width={132} height={6} fill="#E2DDD0" /><rect x={92} y={106} width={8} height={40} fill="#D8D2C4" /></>}
        {wizard > 0 && <><rect x={34} y={102} width={132} height={44} fill="#4B3E8E" /><rect x={34} y={102} width={132} height={6} fill="#3A2F73" /><rect x={70} y={116} width={9} height={9} fill="#E7B24C" /><rect x={120} y={124} width={9} height={9} fill="#E7B24C" /><rect x={52} y={128} width={8} height={8} fill="#E7B24C" /></>}
        {samurai > 0 && <><rect x={34} y={104} width={132} height={42} fill="#2C3444" /><rect x={34} y={104} width={132} height={6} fill="#212836" /><polygon points="34,104 100,146 34,146" fill="#3A4456" /><polygon points="166,104 100,146 166,146" fill="#3A4456" /><rect x={34} y={122} width={132} height={9} fill="#8B2E2E" /></>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        {xeyes > 0 ? <><path d="M70 68 L88 88 M88 68 L70 88" stroke="#151312" strokeWidth={5} strokeLinecap="round" /><path d="M112 68 L130 88 M130 68 L112 88" stroke="#151312" strokeWidth={5} strokeLinecap="round" /></> : <><rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" /><rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" /></>}
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {glasses > 0 && <><rect x={62} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} /><rect x={108} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} /><rect x={94} y={74} width={14} height={5} fill="#151312" /><rect x={34} y={72} width={28} height={5} fill="#151312" /><rect x={140} y={72} width={26} height={5} fill="#151312" /><rect x={66} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" /><rect x={112} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" /></>}
        {samurai > 0 && <><rect x={30} y={52} width={140} height={13} fill="#F4EEE2" /><rect x={92} y={54} width={16} height={9} fill="#C44A3A" /><rect x={160} y={54} width={38} height={9} fill="#C44A3A" transform={`rotate(${18 + Math.sin(lf / 8) * 8} 164 58)`} /></>}
        {wizard > 0 && <><polygon points="100,0 62,40 138,40" fill="#4B3E8E" /><rect x={46} y={36} width={108} height={12} fill="#3A2F73" /><rect x={94} y={8} width={10} height={10} fill="#E7B24C" /></>}
      </svg>
    </div>
  );
};
const Gauntlet: React.FC<{ s: number; gems: number; snap?: number; lf?: number }> = ({ s, gems, snap = 0, lf = 0 }) => (
  <svg viewBox="0 0 140 150" width={s} height={s * 150 / 140} shapeRendering="crispEdges" style={{ overflow: "visible", filter: snap > 0.1 ? `drop-shadow(0 0 ${12 + snap * 20}px rgba(231,178,76,0.9))` : "drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}>
    <rect x={34} y={116} width={72} height={30} fill="#B8862A" /><rect x={34} y={116} width={72} height={6} fill="#96691C" />
    <rect x={22} y={54} width={96} height={64} fill="#E7B24C" /><rect x={22} y={54} width={96} height={9} fill="#F6E4A0" /><rect x={22} y={104} width={96} height={14} fill="#C9932A" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={25 + i * 24} y={24} width={19} height={34} fill="#E7B24C" />)}
    {[0, 1, 2, 3].map((i) => <rect key={`t${i}`} x={25 + i * 24} y={24} width={19} height={6} fill="#F6E4A0" />)}
    <rect x={114} y={68} width={24} height={18} fill="#E7B24C" transform="rotate(24 126 77)" />
    {[0, 1, 2, 3, 4].map((i) => { const on = i < gems; const cx = 30 + i * 17; return <rect key={i} x={cx} y={78} width={16} height={16} fill={on ? GEMS5[i] : "#96691C"} transform={`rotate(45 ${cx + 8} 86)`} style={{ filter: on ? `drop-shadow(0 0 ${6 + snap * 14}px ${GEMS5[i]})` : "none" }} />; })}
  </svg>
);
const Gem: React.FC<{ s: number; c: string; glow?: number }> = ({ s, c, glow = 1 }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: `drop-shadow(0 0 ${8 * glow}px ${c})` }}><rect x={26} y={26} width={48} height={48} fill={c} transform="rotate(45 50 50)" /><rect x={34} y={34} width={18} height={18} fill="rgba(255,255,255,0.5)" transform="rotate(45 50 50)" /></svg>
);
const Cage: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: "drop-shadow(0 0 14px rgba(170,220,255,0.5))" }}><rect x={10} y={12} width={80} height={11} fill="#AEB8CC" /><rect x={10} y={80} width={80} height={11} fill="#AEB8CC" />{[14, 32, 50, 68, 83].map((x) => <rect key={x} x={x} y={12} width={7} height={79} fill="#8A94A8" />)}<rect x={10} y={12} width={80} height={4} fill="#D6DEEC" /></svg>
);
const CoinPix: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible", filter: "drop-shadow(0 0 8px rgba(231,178,76,0.7))" }}><rect x={22} y={10} width={56} height={80} fill="#E7B24C" /><rect x={12} y={22} width={76} height={56} fill="#E7B24C" /><rect x={22} y={10} width={56} height={8} fill="#F6E4A0" /><rect x={38} y={30} width={24} height={8} fill="#B8862A" /><rect x={46} y={30} width={9} height={40} fill="#B8862A" /></svg>
);
const Gremlin: React.FC<{ s: number; lf: number; scared?: number }> = ({ s, lf, scared = 0 }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} shapeRendering="crispEdges" style={{ overflow: "visible" }}><polygon points="18,36 6,12 30,24" fill="#6E8438" /><polygon points="82,36 94,12 70,24" fill="#6E8438" /><rect x={16} y={32} width={68} height={54} fill="#8AA04E" /><rect x={16} y={32} width={68} height={7} fill="#A4BC62" /><polygon points="16,86 28,96 40,86 52,96 64,86 76,96 84,86" fill="#8AA04E" /><rect x={30} y={46} width={13} height={scared > 0.3 ? 16 : 11} fill="#151312" /><rect x={58} y={46} width={13} height={scared > 0.3 ? 16 : 11} fill="#151312" />{scared > 0.3 ? <rect x={42} y={68} width={16} height={13} fill="#151312" /> : <rect x={34} y={68} width={32} height={6} fill="#151312" />}<rect x={24} y={40} width={16} height={4} fill="#151312" transform="rotate(14 32 42)" /><rect x={60} y={40} width={16} height={4} fill="#151312" transform="rotate(-14 68 42)" /></svg>
);
// NEW villain in the same pixel idiom: a chrome endoskeleton "Terminator"
const Terminator: React.FC<{ s: number; lf: number; hurt?: number }> = ({ s, lf, hurt = 0 }) => (
  <div style={{ width: s, height: s * 1.2, position: "relative", filter: hurt > 0.3 ? "brightness(2.2)" : "none" }}>
    <svg viewBox="0 0 120 150" width={s} height={s * 1.25} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
      {/* torso / shoulders (chrome) */}
      <rect x={16} y={92} width={88} height={52} fill="#8A94A4" /><rect x={16} y={92} width={88} height={8} fill="#C0C8D4" />
      <rect x={30} y={104} width={60} height={30} fill="#6A727E" />
      <rect x={44} y={100} width={32} height={44} fill="#9AA6B4" />
      {/* neck */}
      <rect x={48} y={80} width={24} height={16} fill="#6A727E" />
      {/* chrome skull head */}
      <rect x={30} y={20} width={60} height={62} fill="#B8C0CC" /><rect x={30} y={20} width={60} height={9} fill="#DCE4EE" />
      <rect x={26} y={30} width={68} height={54} fill="#B8C0CC" />
      <rect x={24} y={46} width={72} height={7} fill="#8A94A4" />
      {/* red scanning eyes */}
      <rect x={36} y={40} width={18} height={13} fill={hurt > 0.3 ? "#5A2020" : "#FF2A2A"} style={{ filter: hurt > 0.3 ? "none" : "drop-shadow(0 0 8px #FF2A2A)" }} />
      <rect x={66} y={40} width={18} height={13} fill={hurt > 0.3 ? "#5A2020" : "#FF2A2A"} style={{ filter: hurt > 0.3 ? "none" : "drop-shadow(0 0 8px #FF2A2A)" }} />
      {/* metal grin teeth */}
      <rect x={34} y={62} width={52} height={16} fill="#5A626E" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={36 + i * 8.5} y={62} width={4} height={16} fill="#3A424E" />)}
      <rect x={34} y={68} width={52} height={3} fill="#2A323C" />
    </svg>
  </div>
);
// HERO = the canonical Mascot with a red hero cape + per-scene costume/power (composed, NOT rebuilt)
const Hero: React.FC<{ lf: number; size?: number; power?: number; glasses?: number; samurai?: number; stealth?: number; rainbow?: number; cheer?: number; stern?: number; shock?: number; scope?: number; gaze?: number }> = ({ lf, size = 250, power = 1, glasses = 0, samurai = 0, stealth = 0, rainbow = 0, cheer = 0, stern = 0, shock = 0, scope = 0, gaze = 0 }) => {
  const base = "#D97757";
  const tint = stealth > 0.3 ? "#4A5468" : rainbow > 0 ? lerpHex("#D97757", "#E7B24C", 0.5 + Math.sin(lf / 5) * 0.5) : power < 0.5 ? "#8A6A5C" : base;
  return (
    <div style={{ width: size, height: size, position: "relative", opacity: stealth > 0.3 ? 0.5 : 1, filter: stealth > 0.3 ? "drop-shadow(0 0 4px #8FD3E8)" : rainbow > 0 ? `drop-shadow(0 0 18px ${GOLD})` : "none" }}>
      {power >= 0.5 && stealth < 0.3 && <div style={{ position: "absolute", left: "50%", top: "46%", width: size * 0.9, height: size * 0.9, marginLeft: -size * 0.45, marginTop: -size * 0.45, borderRadius: "50%", background: `radial-gradient(circle, ${rainbow > 0 ? GOLD : "#F0A25A"}44, transparent 62%)`, opacity: 0.4 + Math.sin(lf / 6) * 0.2 }} />}
      <CMascot lf={lf} size={size} capeC={stealth > 0.3 ? undefined : "#C44A3A"} glasses={glasses} samurai={samurai} tint={tint} stern={stern} cheer={cheer} shock={shock} gaze={gaze} nodAmp={cheer > 0 ? 3.6 : 2.4} nodSpeed={7} />
      {/* gold hexagon chest emblem (hero identity) */}
      {stealth < 0.3 && <div style={{ position: "absolute", left: "50%", top: "60%", width: size * 0.16, height: size * 0.18, marginLeft: -size * 0.08, background: GOLD, clipPath: "polygon(50% 0,100% 27%,100% 73%,50% 100%,0 73%,0 27%)", boxShadow: `0 0 8px ${GOLD}aa` }}><div style={{ position: "absolute", inset: "26%", background: "#fff", clipPath: "polygon(50% 0,100% 27%,100% 73%,50% 100%,0 73%,0 27%)", opacity: 0.85 }} /></div>}
      {scope > 0 && <div style={{ position: "absolute", left: "62%", top: "26%", width: size * 0.2, height: size * 0.2, borderRadius: "50%", border: "3px solid #151312", background: "rgba(226,59,46,0.25)" }} />}
    </div>
  );
};

// clean HUD accents (thin lines, not neon)
const HudFrame: React.FC<{ accent: string; op?: number }> = ({ accent, op = 1 }) => (
  <div style={{ position: "absolute", inset: 26, pointerEvents: "none", opacity: op }}>
    {[[0, 0, "tl"], [1, 0, "tr"], [0, 1, "bl"], [1, 1, "br"]].map(([rx, ry], i) => (
      <div key={i} style={{ position: "absolute", [ry ? "bottom" : "top"]: 0, [rx ? "right" : "left"]: 0, width: 46, height: 46, [`border${ry ? "Bottom" : "Top"}`]: `3px solid ${accent}`, [`border${rx ? "Right" : "Left"}`]: `3px solid ${accent}` }} />
    ))}
  </div>
);
const CodeLabel: React.FC<{ n: number; name: string; tag: string; accent: string; p: number }> = ({ n, name, tag, accent, p }) => (
  <div style={{ position: "absolute", left: "50%", top: 92, transform: `translateX(-50%) translateY(${(1 - p) * -30}px)`, opacity: p, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 60, height: 60, borderRadius: 12, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITLE, fontWeight: 900, fontSize: 40, color: "#1A1712", boxShadow: `0 6px 16px -6px ${accent}` }}>{n}</div>
      <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 88, letterSpacing: 1, color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,0.6)" }}>{name}</div>
    </div>
    <div style={{ padding: "6px 20px", borderRadius: 999, background: "rgba(8,12,20,0.66)", border: `1.5px solid ${accent}`, fontFamily: mono, fontSize: 21, letterSpacing: 2, color: "#EAF0F6" }}>{tag}</div>
  </div>
);

// boot cold-open: clean HUD "SUIT POWER 10%"
const BootOpen: React.FC<{ f: number }> = ({ f }) => {
  const t = f / FPS; if (t >= 1.18) return null;
  const gone = over(f, fr(0.95), fr(0.22)); const cur = Math.floor(f / 8) % 2;
  const sweep = (f % 60) / 60;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 70, borderRadius: 36, overflow: "hidden", opacity: 1 - gone }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 90% at 50% 44%, #141A24, #070A10)" }} />
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 5px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 108 + sweep * 560, height: 2, background: `linear-gradient(90deg, transparent, ${VISOR}, transparent)`, opacity: 0.5 }} />
      <HudFrame accent={RED_A} />
      <div style={{ position: "absolute", left: 52, top: 52, fontFamily: mono, fontWeight: 700, fontSize: 26, color: VISOR, lineHeight: 1.6 }}>&gt; SUIT SYSTEMS.INIT<br />&gt; SCANNING OUTPUT...<br />&gt; POWER <span style={{ color: RED_L }}>10%</span>{cur ? "_" : ""}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: TITLE, fontWeight: 900, fontSize: 250, color: RED_A, textShadow: "0 8px 30px rgba(216,52,43,0.5)" }}>10%</div>
      <div style={{ position: "absolute", left: 150, right: 150, top: 604, height: 40, borderRadius: 8, background: "#0C1119", border: `2px solid ${JOINT}`, display: "flex", padding: 5, gap: 5 }}>
        {[...Array(10)].map((_, i) => <div key={i} style={{ flex: 1, borderRadius: 3, background: i === 0 ? RED_A : "#141A24", boxShadow: i === 0 ? `0 0 10px ${RED_A}` : "none" }} />)}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 664, textAlign: "center", fontFamily: mono, fontWeight: 800, fontSize: 26, letterSpacing: 5, color: STEELD }}>90% LOCKED</div>
    </div>
  );
};

// ==== pop-culture FX helpers ====
const CodeRain: React.FC<{ f: number; c: string; p?: number }> = ({ f, c, p = 1 }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: p }}>
    {[...Array(27)].map((_, i) => { const x = i * 38; const sp = 1.3 + seed(i) * 2.4; const len = 9 + Math.floor(seed(i + 3) * 9);
      return <div key={i} style={{ position: "absolute", left: x, top: 0, width: 22, height: "100%" }}>{[...Array(len)].map((_, k) => { const y = ((f * sp * 7 + k * 30 + seed(i) * 900) % 940) - 40; const head = k === len - 1; const near = k > len - 3;
        return <div key={k} style={{ position: "absolute", left: 0, top: y, fontFamily: mono, fontSize: 20, fontWeight: head ? 800 : 400, color: head ? "#C8FFD6" : near ? "#8FFFA8" : c, opacity: head ? 1 : 0.16 + (k / len) * 0.6, textShadow: head ? `0 0 9px ${c}` : "none" }}>{seed(i * 30 + k + Math.floor(f / 5)) > 0.5 ? "1" : "0"}</div>; })}</div>; })}
    <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0 2px,transparent 2px 4px)", pointerEvents: "none" }} />
  </div>
);
const Mandala: React.FC<{ f: number; x: number; y: number; s: number; c: string; p: number }> = ({ f, x, y, s, c, p }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s, opacity: p }}>
    {[0, 1, 2].map((i) => { const rs = s * (1 - i * 0.24); return <div key={i} style={{ position: "absolute", left: (s - rs) / 2, top: (s - rs) / 2, width: rs, height: rs, borderRadius: "50%", border: `2px solid ${c}`, boxShadow: `0 0 14px ${c}`, transform: `rotate(${f * (i % 2 ? -1.6 : 1.6)}deg)` }}>{[...Array(14)].map((_, k) => { const a = (k / 14) * Math.PI * 2; return <div key={k} style={{ position: "absolute", left: `${50 + Math.cos(a) * 48}%`, top: `${50 + Math.sin(a) * 48}%`, width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5, background: c, transform: "rotate(45deg)", boxShadow: `0 0 6px ${c}` }} />; })}</div>; })}
  </div>
);
const Chest: React.FC<{ x: number; y: number; open: number; c: string; label?: string; locked?: boolean; f: number }> = ({ x, y, open, c, label, locked, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 138, height: 136, transform: `scale(${1 + (open > 0.4 && open < 0.7 ? (0.7 - open) * 0.6 : 0)})`, transformOrigin: "50% 100%" }}>
    {open > 0.3 && !locked && <div style={{ position: "absolute", left: 30, top: -150, width: 78, height: 190, background: `linear-gradient(180deg, transparent, ${c})`, filter: "blur(5px)", opacity: (open - 0.3) * 1.1 }} />}
    {open > 0.4 && !locked && [...Array(6)].map((_, k) => { const pr = Math.min(1, (open - 0.4) * 2); const a = (k / 6) * Math.PI - Math.PI * 0.1; return <div key={k} style={{ position: "absolute", left: 60 + Math.cos(a) * pr * 70, top: 40 - Math.abs(Math.sin(a)) * pr * 60, width: 12, height: 12, borderRadius: "50%", background: k % 2 ? "#F0C860" : c, opacity: 1 - pr, boxShadow: `0 0 6px ${c}` }} />; })}
    <div style={{ position: "absolute", left: 8, top: 14, width: 122, height: 50, borderRadius: "16px 16px 4px 4px", background: locked ? "#3A2836" : `linear-gradient(180deg,#B47A32,#6A4418)`, border: "3px solid #33240E", transformOrigin: "50% 100%", transform: `rotate(${-open * 74}deg)` }}><div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 9, background: "#C9932A" }} /></div>
    <div style={{ position: "absolute", left: 8, top: 58, width: 122, height: 64, borderRadius: "4px 4px 14px 14px", background: locked ? "#2A1E28" : `linear-gradient(180deg,#C48A3E,#6A4418)`, border: "3px solid #33240E", boxShadow: locked ? `0 0 26px ${c}66, inset 0 0 20px rgba(0,0,0,0.5)` : `0 0 ${open * 26}px ${c}77` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 22, height: 13, background: "#C9932A" }} />
      <div style={{ position: "absolute", left: "50%", top: 20, width: 24, height: 24, marginLeft: -12, borderRadius: 5, background: locked ? "#8A2A2A" : "#F0C860", border: "2px solid #33240E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITLE, fontWeight: 900, fontSize: 18, color: locked ? "#fff" : "#33240E", boxShadow: locked ? `0 0 10px ${c}` : "none" }}>{locked ? "?" : ""}</div>
    </div>
    {open > 0.5 && !locked && label && <div style={{ position: "absolute", left: "50%", top: -38, transform: `translateX(-50%) scale(${Math.min(1, (open - 0.5) * 2)})`, fontFamily: TITLE, fontWeight: 900, fontSize: 26, color: "#fff", textShadow: `0 0 12px ${c}, 0 2px 6px rgba(0,0,0,0.7)`, whiteSpace: "nowrap", opacity: Math.min(1, (open - 0.5) * 2) }}>{label}</div>}
  </div>
);
const Aura: React.FC<{ f: number; s: number; c: string }> = ({ f, s, c }) => (
  <div style={{ position: "absolute", left: -s * 0.42, top: -s * 0.62, width: s * 1.84, height: s * 2.0, pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: "20%", borderRadius: "50%", background: `radial-gradient(circle, ${c}, ${c}44 46%, transparent 66%)`, opacity: 0.55, transform: `scale(${1 + Math.sin(f / 4) * 0.06})`, filter: "blur(6px)" }} />
    {[...Array(9)].map((_, i) => { const h = 46 + Math.abs(Math.sin(f / 3 + i * 1.4)) * 66; return <div key={i} style={{ position: "absolute", left: `${18 + i * 8.4}%`, bottom: "32%", width: 26, height: h, marginLeft: -13, borderRadius: "50% 50% 42% 42%", background: `linear-gradient(0deg, ${c}, #FFF6C0)`, filter: "blur(3px)", opacity: 0.7, transform: "scaleY(1.35)" }} />; })}
    {[...Array(8)].map((_, i) => { const yy = ((f * 3 + i * 40) % 200); return <div key={`u${i}`} style={{ position: "absolute", left: `${24 + seed(i) * 52}%`, top: `${74 - yy / 3}%`, width: 7, height: 14, background: c, opacity: (1 - yy / 200) * 0.9, filter: "blur(1px)" }} />; })}
  </div>
);
// a red/blue pill on an open palm
const Pill: React.FC<{ x: number; y: number; c: string; c2: string; glow: number; f: number }> = ({ x, y, c, c2, glow, f }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translateY(${Math.sin(f / 8) * 3}px)` }}>
    <div style={{ position: "absolute", left: -18, top: 26, width: 90, height: 24, borderRadius: "0 0 40px 40px", background: "linear-gradient(180deg,#E9B48A,#C98A5E)" }} />
    <div style={{ width: 56, height: 26, borderRadius: 13, background: `linear-gradient(90deg,${c},${c2})`, boxShadow: `0 0 ${10 + glow * 20}px ${c}`, border: "1px solid rgba(255,255,255,0.4)" }}><div style={{ position: "absolute", left: 8, top: 5, width: 16, height: 7, borderRadius: 4, background: "rgba(255,255,255,0.6)" }} /></div>
  </div>
);

// ==== stage director ====
const ArmoredStage: React.FC<{ f: number }> = ({ f }) => {
  const t = f / FPS;
  let ci = -1; for (let i = 0; i < codeOn.length; i++) { const nx = i < codeOn.length - 1 ? codeOn[i + 1] : OUTRO_ON; if (t >= codeOn[i] && t < nx) ci = i; }
  const inHook = t < codeOn[0], inOutro = t >= OUTRO_ON;
  const theme = ci >= 0 ? CODES[ci] : null;
  let shakeX = 0, shakeY = 0;
  if (ci >= 0) { const lf = t - codeOn[ci]; if (lf > 0.42 && lf < 0.82) { const d = (lf - 0.42) / 0.4; shakeX = Math.sin(f * 3.1) * 6 * (1 - d); shakeY = Math.cos(f * 3.6) * 4 * (1 - d); } }
  if (ci === 4) { const lf = t - codeOn[4]; if (lf > 1.3 && lf < 2.0) { shakeX = Math.sin(f * 4.4) * 14; shakeY = Math.cos(f * 4.6) * 10; } }
  // hook crash shakes
  if (inHook) { for (let k = 0; k < 5; k++) { const ct = 0.35 + k * 0.28; const d = t - ct; if (d >= 0 && d < 0.16) { shakeX = Math.sin(f * 5) * 10 * (1 - d / 0.16); shakeY = Math.cos(f * 5) * 8 * (1 - d / 0.16); } } }
  const enter = ci >= 0 ? over(f, fr(codeOn[ci]), fr(0.42)) : 0;
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 36, overflow: "hidden", boxShadow: SH, border: "2px solid rgba(120,150,200,0.22)", background: "#05070C" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shakeX}px, ${shakeY}px)` }}>
        {ci >= 0 && theme && (() => {
          const lf = t - codeOn[ci]; const p = over(f, fr(codeOn[ci] + 0.12), fr(0.5));
          return (
            <div style={{ position: "absolute", inset: 0 }}>

              {/* ===== ORACLE = THE MATRIX (red pill / blue pill) ===== */}
              {ci === 0 && (() => { const rin = over(f, fr(codeOn[0] + 0.1), fr(0.5)); const offer = over(f, fr(codeOn[0] + 0.5), fr(0.6)); const take = over(f, fr(codeOn[0] + 1.5), fr(0.5)); return <>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 42%,#04160B,#000)" }} />
                <CodeRain f={f} c={theme.c} p={rin * 0.9} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 3, background: "linear-gradient(90deg,transparent,#0B3D14,transparent)" }} />
                {[...Array(11)].map((_, i) => <div key={`sk${i}`} style={{ position: "absolute", left: i * 96, bottom: 150, width: 60 + (i % 3) * 24, height: 30 + (i % 4) * 40, background: "#041006", opacity: 0.8 }} />)}
                <div style={{ position: "absolute", left: 60, top: 220, fontFamily: mono, fontSize: 22, fontWeight: 700, color: "#00FF41", textShadow: "0 0 8px #00FF41" }}>WAKE UP, CLAUDE{Math.floor(f / 10) % 4 === 0 ? "" : "..."}{Math.floor(f / 8) % 2 ? "█" : ""}</div>
                {/* construct floor grid */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 220, background: "linear-gradient(180deg,transparent,rgba(0,0,0,0.6))", backgroundImage: "repeating-linear-gradient(90deg,rgba(64,196,99,0.14) 0 1px,transparent 1px 60px)", perspective: 200 }} />
                {[...Array(8)].map((_, i) => <div key={`fl${i}`} style={{ position: "absolute", left: 0, right: 0, bottom: i * 26, height: 1, background: `rgba(64,196,99,${0.25 - i * 0.02})` }} />)}
                {/* Neo-Claude center */}
                <div style={{ position: "absolute", left: 380, bottom: 155 }}>
                  <div style={{ position: "absolute", left: "6%", top: "22%", width: "88%", height: "78%", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.55),transparent 66%)" }} />
                  <CMascot lf={f} size={232} tint="#DA7B58" stern={0.35} />
                  <div style={{ position: "absolute", left: "14%", top: "53%", width: "72%", height: "47%", background: "linear-gradient(180deg,#1C1C24,#0C0C12)", borderRadius: "10px 10px 6px 6px", boxShadow: "inset 0 0 0 2px rgba(64,196,99,0.28)" }} />
                  <div style={{ position: "absolute", left: "20%", top: "50%", width: 0, height: 0, borderLeft: "24px solid transparent", borderTop: "32px solid #1C1C24", transform: "rotate(-8deg)" }} /><div style={{ position: "absolute", right: "20%", top: "50%", width: 0, height: 0, borderRight: "24px solid transparent", borderTop: "32px solid #1C1C24", transform: "rotate(8deg)" }} />
                  <div style={{ position: "absolute", left: "30%", top: "38%", width: "18%", height: 14, borderRadius: 8, background: "#080808" }}><div style={{ position: "absolute", left: 3, top: 3, width: 8, height: 4, background: theme.c, borderRadius: 2 }} /></div>
                  <div style={{ position: "absolute", left: "52%", top: "38%", width: "18%", height: 14, borderRadius: 8, background: "#080808" }}><div style={{ position: "absolute", left: 3, top: 3, width: 8, height: 4, background: theme.c, borderRadius: 2 }} /></div>
                </div>
                {/* red pill (left, chosen) + blue pill (right, fading) offered on palms */}
                <div style={{ opacity: offer, transform: `translateX(${take * -30}px)` }}><Pill x={210} y={470} c="#FF3B3B" c2="#B01818" glow={0.6 + take} f={f} /></div>
                <div style={{ opacity: offer * (1 - take * 0.8), transform: `translateX(${take * 40}px)` }}><Pill x={760} y={470} c="#3B8BFF" c2="#1846B0" glow={0.4} f={f} /></div>
                {take > 0.3 && <Sparkles lf={f} at={codeOn[0] + 1.5} x={266} y={480} n={10} spread={90} colors={["#FF3B3B", "#fff", theme.c]} dur={0.6} />}
                <div style={{ position: "absolute", left: 60, bottom: 66, fontFamily: mono, fontSize: 20, fontWeight: 800, color: theme.c, textShadow: `0 0 8px ${theme.c}` }}>&gt; RED PILL_</div>
                {/* ++ ACTION ORACLE ++ */}
                {(() => {
  const hx = 258, hy = 470;
  const cx = 712, cy = 262;
  return (<>
    <svg width={1012} height={792} style={{position:'absolute',left:0,top:0,overflow:'visible',pointerEvents:'none'}}>
      {Array.from({length:10}).map((_,i)=>{
        const d=i*0.055;
        const appear=0.5+d;
        if(lf<appear) return null;
        const yc=290+seed(i*7+3)*250;
        const tp=Math.min(1,(lf-appear)/0.85);
        const ease=1-Math.pow(1-tp,3);
        const frozen=lf>=appear+0.85;
        let x=980+(372-980)*ease;
        let y=yc, op=1;
        const dropStart=2.7;
        if(lf>=dropStart){
          const dp=Math.min(1,(lf-dropStart)/0.75);
          y=yc+360*dp*dp;
          x=372+dp*26*(seed(i)-0.5);
          op=1-dp;
        }
        const stretch=frozen?1:2.6;
        return (<g key={'bl'+i} opacity={op} transform={`translate(${x},${y})`}>
          <rect x={-24*stretch} y={-2.5} width={30*stretch} height={5} rx={2.5} fill={theme.c} opacity={0.5}/>
          <rect x={2} y={-3.5} width={9} height={7} rx={2} fill="#eafff4"/>
        </g>);
      })}
      {(()=>{const g=Math.max(0,Math.min(1,(lf-1.0)/0.4))*Math.max(0,Math.min(1,(3.1-lf)/0.5)); if(g<=0)return null; const pulse=0.55+0.45*Math.sin(f/3); return <circle cx={356} cy={408} r={40+9*Math.sin(f/4)} fill="none" stroke={theme.c} strokeWidth={5} opacity={0.55*g*pulse}/>;})()}
      {[0,0.45].map((off,ri)=>{const p=over(f,fr(codeOn[0]+2.55+off),fr(1.15),Easing.out(Easing.cubic)); if(p<=0||p>=1)return null; return <circle key={'rp'+ri} cx={hx} cy={hy} r={16+p*540} fill="none" stroke={theme.c} strokeWidth={7*(1-p)} opacity={0.65*(1-p)}/>;})}
      {(()=>{const a=over(f,fr(codeOn[0]+1.9),fr(0.6),Easing.out(Easing.cubic)); const out=1-over(f,fr(codeOn[0]+5.3),fr(0.5)); const vis=a*out; if(vis<=0)return null; const N=8; return (<g opacity={0.85*vis}>
        <g transform={`rotate(${f*2.1} ${cx} ${cy})`}>
          {Array.from({length:N}).map((_,k)=>{const ang=k/N*Math.PI*2; const r=88; return <line key={'sp'+k} x1={cx} y1={cy} x2={cx+Math.cos(ang)*r} y2={cy+Math.sin(ang)*r} stroke={theme.c} strokeWidth={2} opacity={0.45}/>;})}
          <polygon points={Array.from({length:N}).map((_,k)=>{const ang=k/N*Math.PI*2; return (cx+Math.cos(ang)*88).toFixed(1)+','+(cy+Math.sin(ang)*88).toFixed(1);}).join(' ')} fill="none" stroke={theme.c} strokeWidth={2.5}/>
        </g>
        <g transform={`rotate(${-f*3.3} ${cx} ${cy})`}>
          <polygon points={Array.from({length:N}).map((_,k)=>{const ang=k/N*Math.PI*2+0.35; return (cx+Math.cos(ang)*54).toFixed(1)+','+(cy+Math.sin(ang)*54).toFixed(1);}).join(' ')} fill="none" stroke="#eafff4" strokeWidth={1.5} opacity={0.7}/>
        </g>
        <circle cx={cx} cy={cy} r={9+3*Math.sin(f/4)} fill={theme.c} opacity={0.85}/>
      </g>);})()}
      {Array.from({length:10}).map((_,i)=>{if(lf<0.4)return null; const ang=f/22+i*(Math.PI*2/10); const rad=150+18*Math.sin(f/9+i); const px=hx+Math.cos(ang)*rad; const py=hy+Math.sin(ang)*rad*0.62; const gl=String.fromCharCode(0x30A0+((i*7+Math.floor(f/6))%40)); return <text key={'or'+i} x={px} y={py} fontSize={16} fontFamily="monospace" fill={theme.c} opacity={0.4+0.35*Math.sin(f/5+i)} textAnchor="middle">{gl}</text>;})}
    </svg>
    {(()=>{const a=over(f,fr(codeOn[0]+3.5),fr(0.5),Easing.out(Easing.cubic)); const out=1-over(f,fr(codeOn[0]+5.35),fr(0.4)); const vis=a*out; if(vis<=0)return null; return <div style={{position:'absolute',left:742,top:372,opacity:vis,transform:`translateY(${(1-a)*30}px)`,filter:`drop-shadow(0 0 12px ${theme.c})`}}><CMascot lf={f} size={188} tint={lerpHex('#12161a',theme.c,0.22)} stern={0.85} nodAmp={4} capeC="#0a0d0f" suit={1} glasses={1} /></div>;})()}
    <Sparkles lf={f} at={codeOn[0]+1.25} x={366} y={408} n={14} spread={110} colors={["#eafff4",theme.c]} dur={0.6} />
    <Sparkles lf={f} at={codeOn[0]+2.55} x={hx} y={hy} n={16} spread={140} colors={["#eafff4",theme.c]} dur={0.7} />
    <Sparkles lf={f} at={codeOn[0]+3.55} x={836} y={430} n={12} spread={90} colors={["#eafff4",theme.c]} dur={0.6} />
  </>);
})()}
              </>; })()}

              {/* ===== PROPHET = DOCTOR STRANGE (rich sanctum) ===== */}
              {ci === 1 && (() => { const cast = over(f, fr(codeOn[1] + 0.3), fr(0.7)); const rewind = over(f, fr(codeOn[1] + 1.2), fr(0.8)); return <>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 90% at 50% 30%,#3A2450,#160A22 78%)" }} />
                {/* tall arched sanctum windows w/ tracery */}
                {[120, 480, 840].map((x, i) => <div key={`win${i}`} style={{ position: "absolute", left: x, top: 56, width: 152, height: 310, borderRadius: "76px 76px 6px 6px", overflow: "hidden", border: "4px solid #4A3418", boxShadow: "0 0 34px rgba(232,180,90,0.25)", background: "#160A1E" }}>
                  {[...Array(24)].map((_, k) => { const cr = k % 2, rr = Math.floor(k / 4); const col = (cr + rr) % 2 ? "#E0A94B" : "#2E6E8E"; return <div key={k} style={{ position: "absolute", left: (k % 4) * 38, top: rr * 52, width: 36, height: 50, background: col, opacity: 0.5 + Math.sin(f / 14 + k) * 0.12, border: "1px solid rgba(255,243,214,0.4)", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />; })}
                  <div style={{ position: "absolute", left: "50%", top: 20, bottom: 6, width: 3, marginLeft: -1.5, background: "#FFF3D6", opacity: 0.5 }} />
                </div>)}
                {/* floating relics + hanging lamps */}
                {[[90, 420], [900, 400], [200, 500]].map(([x, y], i) => <div key={`rel${i}`} style={{ position: "absolute", left: x, top: (y as number) + Math.sin(f / 10 + i) * 8, width: 34, height: 44, borderRadius: 5, background: "linear-gradient(180deg,#8A6A3A,#4A3418)", border: "2px solid #C9932A", boxShadow: "0 0 12px rgba(201,147,42,0.4)", transform: `rotate(${Math.sin(f / 12 + i) * 6}deg)` }} />)}
                {[300, 720].map((x, i) => <div key={`lmp${i}`} style={{ position: "absolute", left: x, top: 40, width: 2, height: 90 }}><div style={{ position: "absolute", left: -14, top: 90, width: 30, height: 34, borderRadius: "50% 50% 40% 40%", background: "radial-gradient(circle,#FFE9A0,#C98A2A)", boxShadow: "0 0 20px rgba(255,200,90,0.6)" }} /></div>)}
                {/* mandala floor */}
                <div style={{ position: "absolute", left: "50%", bottom: 40, width: 520, height: 120, marginLeft: -260, borderRadius: "50%", border: "2px solid rgba(232,180,90,0.4)", transform: "scaleY(0.4)" }}>{[0.7, 0.4].map((r, i) => <div key={i} style={{ position: "absolute", inset: `${(1 - r) * 50}%`, borderRadius: "50%", border: "2px solid rgba(200,150,90,0.3)" }} />)}</div>
                {/* portals around the caster */}
                <Mandala f={f} x={770} y={330} s={280} c={theme.c} p={cast} />
                <Mandala f={f} x={770} y={330} s={140} c="#E8C24A" p={cast} />
                <Mandala f={f} x={210} y={430} s={150} c={theme.c} p={cast * 0.7} />
                {/* time-rewind spiral (Time Stone) */}
                {rewind > 0.1 && [...Array(3)].map((_, i) => <div key={`rw${i}`} style={{ position: "absolute", left: 480 + i * 8, top: 300, width: 80 + i * 40, height: 80 + i * 40, marginLeft: -(40 + i * 20), marginTop: -(40 + i * 20), borderRadius: "50%", border: "2px solid #40C463", opacity: rewind * (0.7 - i * 0.2), transform: `rotate(${-f * 4}deg)` }} />)}
                {/* future ghost Stranges */}
                {cast > 0.3 && [0.35, 0.6, 0.82].map((o, i) => <div key={`gf${i}`} style={{ position: "absolute", left: 200 + i * 30, bottom: 150, opacity: (1 - o) * cast * 0.4 }}><CMascot lf={f - i * 4} size={230} tint="#C88CF0" capeC="#7A1F1F" /></div>)}
                {/* Strange-Claude w/ cloak */}
                <div style={{ position: "absolute", left: 190, bottom: 150 }}>
                  <div style={{ position: "absolute", left: "6%", top: "42%", width: "88%", height: "62%", background: "linear-gradient(180deg,#D6423A,#8A1F1F)", borderRadius: "20px 20px 40% 40%", transform: `rotate(${Math.sin(f / 8) * 2}deg)`, clipPath: "polygon(0 0,100% 0,92% 60%,100% 100%,72% 82%,50% 100%,28% 82%,0 100%,8% 60%)" }} />
                  <CMascot lf={f} size={240} tint="#D97757" stern={0.4} cheer={cast > 0.6 ? 0.4 : 0} />
                  <div style={{ position: "absolute", left: "22%", top: "22%", width: 0, height: 0, borderLeft: "20px solid transparent", borderBottom: "40px solid #D6423A", transform: "rotate(-14deg)" }} /><div style={{ position: "absolute", right: "22%", top: "22%", width: 0, height: 0, borderRight: "20px solid transparent", borderBottom: "40px solid #D6423A", transform: "rotate(14deg)" }} />
                  <div style={{ position: "absolute", left: "44%", top: "58%", width: "12%", height: "12%", borderRadius: "50%", background: "radial-gradient(circle,#EAFFB0,#40C463)", boxShadow: "0 0 14px #40C463", border: "2px solid #C9932A" }} />
                  {/* bright dual sling-ring spell circle off the paw */}
                  {cast > 0.3 && <div style={{ position: "absolute", left: "70%", top: "20%", width: 150, height: 150 }}><div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "5px dashed #FF7A2F", boxShadow: "0 0 18px #FF7A2F", transform: `rotate(${f * 3}deg)` }} /><div style={{ position: "absolute", inset: "26%", borderRadius: "50%", border: "3px dashed #FFCE8A", transform: `rotate(${-f * 4}deg)` }} />{[...Array(6)].map((_, k) => { const a = k / 6 * Math.PI * 2 + f / 6; return <div key={k} style={{ position: "absolute", left: `${50 + Math.cos(a) * 54}%`, top: `${50 + Math.sin(a) * 54}%`, width: 6, height: 6, borderRadius: "50%", background: "#FFE3B0", boxShadow: "0 0 8px #FFE3B0" }} />; })}</div>}
                  {/* sling-ring spark trail from hands */}
                  {cast > 0.4 && [...Array(5)].map((_, i) => { const a = i / 5 * Math.PI * 2 + f / 8; return <div key={`sr${i}`} style={{ position: "absolute", left: `${76 + Math.cos(a) * 30}%`, top: `${40 + Math.sin(a) * 30}%`, width: 5, height: 5, borderRadius: "50%", background: "#E8C24A", boxShadow: "0 0 8px #E8C24A" }} />; })}
                </div>
                <div style={{ position: "absolute", left: 60, bottom: 66, fontFamily: mono, fontSize: 20, fontWeight: 800, color: theme.c, textShadow: `0 0 8px ${theme.c}` }}>8,412,097 FUTURES</div>
                {/* ++ ACTION PROPHET ++ */}
                {(() => {
  const cx = 650, cy = 360;
  const gold = "#ffd27a", red = "#ff3b30";
  const pOpen = over(f, fr(codeOn[1] + 0.4), fr(0.6), Easing.out(Easing.back(1.4)));
  const breath = 1 + 0.03 * Math.sin(f / 6);
  const sweep = over(f, fr(codeOn[1] + 0.5), fr(3.4));
  const count = Math.floor(8412097 * over(f, fr(codeOn[1] + 0.6), fr(1.9), Easing.out(Easing.cubic)));
  const redOn = over(f, fr(codeOn[1] + 2.4), fr(0.5));
  const shatter = over(f, fr(codeOn[1] + 3.0), fr(0.45), Easing.out(Easing.cubic));
  const targets = [
    { tx: 800, ty: 150, bad: true,  d: 0.9 },
    { tx: 858, ty: 372, bad: false, d: 1.05 },
    { tx: 796, ty: 562, bad: false, d: 1.22 }
  ];
  const px = 360, py = 470;
  return (<>
    <div style={{ position: "absolute", left: cx - 120, top: cy - 120, opacity: 0.55 * pOpen, pointerEvents: "none" }}>
      <Aura f={f} s={240} c={theme.c} />
    </div>
    <svg width="1012" height="792" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
      {/* branching timeline nodes lighting up one by one */}
      <line x1="120" y1="70" x2="876" y2="70" stroke={gold} strokeWidth="4" opacity="0.22" />
      <line x1="120" y1="70" x2={120 + 756 * sweep} y2="70" stroke={theme.c} strokeWidth="5" opacity="0.85" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px " + theme.c + ")" }} />
      {[0,1,2,3,4,5,6,7].map(i => {
        const on = over(f, fr(codeOn[1] + 0.5 + i * 0.24), fr(0.3), Easing.out(Easing.cubic));
        const nx = 120 + i * 108;
        const bad = i === 5;
        const col = bad ? red : theme.c;
        const pulse = bad ? (0.5 + 0.5 * Math.sin(f / 4)) : 1;
        return (<g key={"n" + i}>
          <circle cx={nx} cy="70" r={9 + 5 * on} fill={col} opacity={on * (bad ? pulse : 1)} style={{ filter: "drop-shadow(0 0 " + (6 * on) + "px " + col + ")" }} />
          <circle cx={nx} cy="70" r="4" fill="#fff" opacity={on * 0.9} />
        </g>);
      })}
      {/* branch lines from the opening portal out to the future-clones */}
      {targets.map((c, i) => {
        const g = over(f, fr(codeOn[1] + c.d - 0.15), fr(0.5), Easing.out(Easing.cubic));
        const ex = cx + (c.tx - cx) * g, ey = cy + (c.ty - cy) * g;
        const col = c.bad ? lerpHex(theme.c, red, redOn) : theme.c;
        return <line key={"br" + i} x1={cx} y1={cy} x2={ex} y2={ey} stroke={col} strokeWidth="3" opacity={0.5 * g * (c.bad ? (1 - 0.6 * shatter) : 1)} strokeDasharray="8 7" />;
      })}
      {/* BIG portal that OPENS: concentric spinning mandala rings + spokes */}
      <g transform={"translate(" + cx + "," + cy + ") scale(" + (pOpen * breath) + ")"}>
        <circle r="150" fill="none" stroke={theme.c} strokeWidth="3" opacity="0.5" strokeDasharray="14 11" transform={"rotate(" + (f * 1.2) + ")"} />
        <circle r="120" fill="none" stroke={gold} strokeWidth="2" opacity="0.6" strokeDasharray="6 9" transform={"rotate(" + (-f * 1.7) + ")"} />
        <circle r="95" fill="none" stroke={theme.c} strokeWidth="7" opacity="0.7" strokeDasharray="30 20" transform={"rotate(" + (f * 2.3) + ")"} style={{ filter: "drop-shadow(0 0 10px " + theme.c + ")" }} />
        <g transform={"rotate(" + (f * 0.9) + ")"}>
          {Array.from({ length: 16 }).map((_, i) => {
            const a = i * Math.PI / 8;
            return <line key={"sp" + i} x1={Math.cos(a) * 66} y1={Math.sin(a) * 66} x2={Math.cos(a) * 138} y2={Math.sin(a) * 138} stroke={gold} strokeWidth="2" opacity="0.32" />;
          })}
        </g>
        <circle r={42 + 7 * Math.sin(f / 5)} fill={theme.c} opacity="0.2" />
        <circle r="18" fill="#fff" opacity="0.5" />
      </g>
      {/* green Time-Stone rewind clock, hands spinning BACKWARD */}
      {(() => {
        const clk = over(f, fr(codeOn[1] + 1.6), fr(0.5), Easing.out(Easing.back(1.4)));
        const gr = "#57e08a";
        return (<g transform={"translate(884,596) scale(" + clk + ")"} opacity={clk}>
          <circle r="46" fill="none" stroke={gr} strokeWidth="4" opacity="0.85" style={{ filter: "drop-shadow(0 0 9px " + gr + ")" }} />
          <circle r="46" fill="none" stroke={gr} strokeWidth="2" strokeDasharray="4 8" transform={"rotate(" + (-f * 4) + ")"} opacity="0.5" />
          <line x1="0" y1="0" x2="0" y2="-24" stroke={gr} strokeWidth="4" strokeLinecap="round" transform={"rotate(" + (-f * 2.5) + ")"} />
          <line x1="0" y1="0" x2="0" y2="-34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" transform={"rotate(" + (-f * 9) + ")"} />
          <circle r="4" fill={gr} />
        </g>);
      })()}
      {/* hero casting: expanding spell rings + orbiting sparks off the paw */}
      {[0,1,2].map(i => {
        const ph = ((lf * 0.7 + i / 3) % 1);
        return <circle key={"pr" + i} cx={px} cy={py} r={12 + ph * 95} fill="none" stroke={theme.c} strokeWidth="3" opacity={(1 - ph) * 0.6} />;
      })}
      {[0,1,2,3,4,5].map(i => {
        const a = f / 10 + i * Math.PI / 3;
        return <circle key={"ob" + i} cx={px + Math.cos(a) * 72} cy={py + Math.sin(a) * 72} r={3.5 + 1.5 * Math.sin(f / 5 + i)} fill={gold} opacity="0.85" style={{ filter: "drop-shadow(0 0 5px " + gold + ")" }} />;
      })}
    </svg>
    {/* future-clone Claudes fanning out along the branches; the BAD one flashes red + shatters */}
    {targets.map((c, i) => {
      const app = over(f, fr(codeOn[1] + c.d), fr(0.5), Easing.out(Easing.cubic));
      const lx = cx + (c.tx - cx) * app, ly = cy + (c.ty - cy) * app;
      const col = c.bad ? lerpHex(theme.c, red, redOn) : theme.c;
      const op = 0.44 * app * (c.bad ? (1 - shatter) : 1);
      return (<div key={"cl" + i} style={{ position: "absolute", left: lx - 55, top: ly - 55, opacity: op, transform: "scale(" + (0.5 + 0.5 * app) + ")", filter: "drop-shadow(0 0 12px " + col + ")", pointerEvents: "none" }}>
        <CMascot lf={f} size={110} tint={col} stern={c.bad ? 0.3 : 0} shock={c.bad ? shatter : 0} nodAmp={c.bad ? 0 : 3} capeC={theme.c} />
      </div>);
    })}
    {/* BREAKS tag on the doomed future */}
    <div style={{ position: "absolute", left: 742, top: 92, opacity: redOn * (1 - 0.8 * shatter), transform: "translateX(" + (Math.sin(f / 2) * 3 * redOn) + "px)", fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: 2, color: "#fff", background: red, padding: "3px 12px", borderRadius: 6, boxShadow: "0 0 14px " + red, pointerEvents: "none" }}>BREAKS</div>
    <Sparkles lf={f} at={codeOn[1] + 3.05} x={800} y={150} n={18} spread={120} colors={["#fff", "#ff3b30"]} dur={0.6} />
    <Sparkles lf={f} at={codeOn[1] + 0.6} x={cx} y={cy} n={14} spread={100} colors={["#fff", theme.c]} dur={0.6} />
    {/* ticking futures counter above the portal */}
    <div style={{ position: "absolute", left: cx - 170, top: 232, width: 340, textAlign: "center", opacity: pOpen, fontFamily: "Inter, sans-serif", pointerEvents: "none" }}>
      <div style={{ fontWeight: 900, fontSize: 40, color: "#fff", letterSpacing: 1, textShadow: "0 0 16px " + theme.c }}>{count.toLocaleString()}</div>
      <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 4, color: gold, marginTop: 2 }}>FUTURES</div>
    </div>
  </>);
})()}
              </>; })()}

              {/* ===== GHOST = MISSION IMPOSSIBLE (rich vault heist) ===== */}
              {ci === 2 && (() => { const drop = over(f, fr(codeOn[2] + 0.1), fr(0.7), Easing.out(Easing.cubic)); const grab = over(f, fr(codeOn[2] + 1.1), fr(0.5)); const hy = -160 + drop * 470; return <>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0C1018,#04060A)" }} />
                {/* burning M:I fuse racing across the top */}
                {(() => { const fp = over(f, fr(codeOn[2] + 0.1), fr(3.8)); const fx = 120 + fp * 820, fy = 100 + Math.sin(fp * 6) * 22; return <><svg style={{ position: "absolute", inset: 0, zIndex: 18 }} width="100%" height="100%"><path d="M120 100 Q 340 140 540 96 T 940 120" fill="none" stroke="#6B5636" strokeWidth="3" opacity="0.5" /><path d="M120 100 Q 340 140 540 96 T 940 120" fill="none" stroke="#FF6A1E" strokeWidth="3" strokeDasharray="1000" strokeDashoffset={1000 - fp * 1000} style={{ filter: "drop-shadow(0 0 5px #FF3B1E)" }} /></svg><div style={{ position: "absolute", left: fx - 6, top: fy - 6, width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: "0 0 14px #FFD36B, 0 0 24px #FF8A2B", zIndex: 19 }} />{[...Array(4)].map((_, k) => <div key={k} style={{ position: "absolute", left: fx + (seed(k + Math.floor(f / 3)) - 0.5) * 30, top: fy + (seed(k + 9) - 0.5) * 24, width: 4, height: 4, borderRadius: "50%", background: "#FFD36B", opacity: 0.8, zIndex: 19 }} />)}</>; })()}
                {/* server-rack walls */}
                {[20, 900].map((x, i) => <div key={`sv${i}`} style={{ position: "absolute", left: x, top: 60, width: 100, bottom: 130, background: "linear-gradient(180deg,#141C28,#0A0F17)", border: "2px solid #22303F" }}>{[...Array(11)].map((_, k) => <div key={k} style={{ position: "absolute", left: 8, right: 8, top: 8 + k * 44, height: 30, background: "#0A0F17", display: "flex", gap: 4, padding: 6 }}>{[0, 1, 2].map(m => <div key={m} style={{ width: 6, height: 6, borderRadius: "50%", background: ["#4FB07A", "#E7B24C", "#5AA0DE"][m], opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 6 + k + m)) }} />)}</div>)}</div>)}
                {/* pedestal + glowing data core (the prize) */}
                <div style={{ position: "absolute", left: "50%", bottom: 130, marginLeft: -50, width: 100, height: 60, background: "linear-gradient(180deg,#2A3444,#141C28)", clipPath: "polygon(14% 0,86% 0,100% 100%,0 100%)" }} />
                <div style={{ position: "absolute", left: "50%", bottom: 180, marginLeft: -26, width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle,#fff,${theme.c})`, boxShadow: `0 0 ${20 + grab * 20}px ${theme.c}`, opacity: 1 - grab * 0.4, transform: `translateY(${-grab * 60}px) scale(${1 - grab * 0.3})` }} />
                {/* countdown timer */}
                <div style={{ position: "absolute", left: "50%", top: 60, marginLeft: -60, width: 120, height: 40, borderRadius: 6, background: "#0A0F17", border: "2px solid #FF2A2A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 26, color: "#FF2A2A", boxShadow: "0 0 10px rgba(255,42,42,0.5)" }}>00:0{Math.max(0, 3 - Math.floor(lf))}</div>
                {/* dense laser grid */}
                {[300, 360, 420, 480, 540, 600].map((y, i) => <div key={`lz${i}`} style={{ position: "absolute", left: 130, right: 130, top: y, height: 2, background: "#FF2A2A", opacity: 0.6 + Math.sin(f / 4 + i) * 0.2, boxShadow: "0 0 8px #FF2A2A", transform: `rotate(${(i - 2.5) * 2.5}deg)` }} />)}
                {[220, 340, 500, 660, 780].map((x, i) => <div key={`lzv${i}`} style={{ position: "absolute", top: 280, bottom: 130, left: x, width: 2, background: "#FF2A2A", opacity: 0.4 + Math.sin(f / 5 + i) * 0.2, boxShadow: "0 0 8px #FF2A2A" }} />)}
                {/* wire + suspended spy */}
                <div style={{ position: "absolute", left: 500, top: 0, width: 2, height: hy + 60, background: "linear-gradient(180deg,rgba(220,235,255,0.8),rgba(160,190,230,0.4))" }} />
                <div style={{ position: "absolute", left: 400, top: hy, transform: "rotate(2deg)" }}>
                  <CMascot lf={f} size={200} tint="#2E333F" stern={0.5} nodAmp={0.4} />
                  <div style={{ position: "absolute", left: "28%", top: "35%", width: "44%", height: 15, background: "#0A0A0E", borderRadius: 3 }} />
                  <div style={{ position: "absolute", left: "20%", top: "56%", width: "60%", height: 8, background: "#0A0A0E", transform: "rotate(18deg)" }} />
                  <div style={{ position: "absolute", right: "24%", top: "26%", width: 8, height: 11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "#8FC7E8" }} />
                </div>
                <div style={{ position: "absolute", left: 60, top: 60, padding: "5px 14px", borderRadius: 6, background: "rgba(10,16,26,0.8)", border: `2px solid ${theme.c}`, fontFamily: mono, fontSize: 17, fontWeight: 800, color: theme.c, zIndex: 20 }}>SECURITY: BYPASSED</div>
                {/* ++ ACTION GHOST ++ */}
                {(() => {
  const drop = over(f, fr(codeOn[2] + 0.1), fr(0.7), Easing.out(Easing.cubic));
  const hy = -160 + drop * 470;
  const grab = over(f, fr(codeOn[2] + 1.1), fr(0.5), Easing.out(Easing.cubic));
  const sig = over(f, fr(codeOn[2] + 1.5), fr(2.0));
  const clone = over(f, fr(codeOn[2] + 2.0), fr(0.9), Easing.out(Easing.cubic));
  const extract = over(f, fr(codeOn[2] + 2.7), fr(1.25), Easing.in(Easing.cubic));
  const stamp = over(f, fr(codeOn[2] + 3.5), fr(0.4), Easing.out(Easing.back(1.6)));
  const alarm = 0.10 + 0.16 * Math.abs(Math.sin(f / 3));
  const scanPhase = (lf * 0.7) % 1;
  const scanY = (hy + 30) + scanPhase * 165;
  const paw = { x: 486, y: hy + 138 };
  const coreX = 506 + (paw.x - 506) * grab;
  const coreY = (586 + (paw.y - 586) * grab) - extract * 690;
  return <>
    {/* BEAT 1 - red alarm strobe vignette, whole scene */}
    <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 130px rgba(255,40,40,${alarm})`, zIndex: 24, pointerEvents: "none" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: "#FF2A2A", opacity: alarm * 2.4, boxShadow: "0 0 16px #FF2A2A", zIndex: 24 }} />

    {/* BEAT 2 - identity scanner sweeping the spy's body, continuous */}
    {lf > 0.3 && lf < 3.6 && <>
      <div style={{ position: "absolute", left: 360, right: 452, top: scanY, height: 3, background: theme.c, boxShadow: `0 0 14px ${theme.c}, 0 0 26px ${theme.c}`, opacity: 0.9, zIndex: 26 }} />
      <div style={{ position: "absolute", left: 360, right: 452, top: scanY - 22, height: 22, background: `linear-gradient(180deg,rgba(240,103,76,0),${theme.c}44)`, zIndex: 26 }} />
      {[[360, 26], [560, 26]].map(([bx], i) => <div key={`bk${i}`} style={{ position: "absolute", left: bx, top: hy + 24, width: 26, height: 26, borderTop: `3px solid ${theme.c}`, borderLeft: i === 0 ? `3px solid ${theme.c}` : "none", borderRight: i === 1 ? `3px solid ${theme.c}` : "none", opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 5)), zIndex: 26 }} />)}
      <div style={{ position: "absolute", left: 380, top: hy + 6, fontFamily: mono, fontSize: 12, fontWeight: 800, color: theme.c, letterSpacing: 1, opacity: 0.85, zIndex: 26 }}>SCANNING VOICE {Math.min(99, Math.floor(scanPhase * 40 + lf * 22))}%</div>
    </>}

    {/* BEAT 3 - the snatch tracer + stolen data-core flying to paw then extracting up the wire */}
    {grab > 0.02 && <svg style={{ position: "absolute", inset: 0, zIndex: 25 }} width="100%" height="100%"><line x1={506} y1={586} x2={coreX} y2={coreY} stroke={theme.c} strokeWidth={2 + grab * 2} opacity={Math.max(0, 0.7 - extract)} style={{ filter: `drop-shadow(0 0 6px ${theme.c})` }} /></svg>}
    {grab > 0.02 && <div style={{ position: "absolute", left: coreX - 15, top: coreY - 15, width: 30, height: 30, borderRadius: "50%", background: `radial-gradient(circle,#fff,${theme.c})`, boxShadow: `0 0 22px ${theme.c}, 0 0 40px ${theme.c}88`, transform: `scale(${0.6 + grab * 0.4}) rotate(${f * 8}deg)`, zIndex: 27 }} />}

    {/* BEAT 4 - "your handwriting" signature drawing itself across the vault in theme color */}
    {sig > 0.01 && <>
      <svg style={{ position: "absolute", inset: 0, zIndex: 26 }} width="100%" height="100%">
        <path d="M560 236 c 12 -28 24 22 40 4 c 12 -16 4 -34 20 -34 c 16 0 8 40 -4 44 c 20 4 30 -20 46 -8 c 14 10 -2 30 14 32 c 22 2 34 -24 54 -14 c 16 8 4 28 22 24 c 18 -4 30 -22 44 -30" fill="none" stroke={theme.c} strokeWidth={4} strokeLinecap="round" strokeDasharray={520} strokeDashoffset={520 * (1 - sig)} style={{ filter: `drop-shadow(0 0 7px ${theme.c})` }} />
      </svg>
      {sig < 0.99 && <div style={{ position: "absolute", left: 560 + sig * 306 - 5, top: 236 + Math.sin(sig * 17) * 15 - 5, width: 10, height: 10, borderRadius: "50%", background: "#fff", boxShadow: `0 0 12px ${theme.c}, 0 0 20px ${theme.c}`, zIndex: 27 }} />}
    </>}

    {/* BEAT 5 - the GHOST clone in your voice drifts out beside the spy, bobbing */}
    {clone > 0.01 && <div style={{ position: "absolute", left: 400 + clone * 168, top: hy + Math.sin(lf * 4) * 9, opacity: clone * 0.72, transform: `rotate(-2deg) scale(${0.9 + clone * 0.1})`, zIndex: 23, filter: `drop-shadow(0 0 10px ${theme.c})` }}>
      <CMascot lf={f} size={200} tint={theme.c} cheer={0.45} nodAmp={0.6} />
      <div style={{ position: "absolute", left: "28%", top: "35%", width: "44%", height: 15, background: "#0A0A0E", borderRadius: 3, opacity: 0.85 }} />
      <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(0deg,transparent 0 3px,${theme.c}22 3px 4px)`, mixBlendMode: "screen" }} />
    </div>}

    {/* BEAT 6 - IDENTITY CLONED stamp slams in once the signature completes */}
    {stamp > 0.01 && <div style={{ position: "absolute", left: 596, top: 300, padding: "6px 16px", borderRadius: 6, background: "rgba(10,16,26,0.85)", border: `3px solid ${theme.c}`, fontFamily: mono, fontSize: 20, fontWeight: 900, color: theme.c, letterSpacing: 1, transform: `scale(${stamp}) rotate(-7deg)`, boxShadow: `0 0 18px ${theme.c}88`, zIndex: 28 }}>IDENTITY CLONED</div>}

    {grab > 0.4 && grab < 0.75 && <Sparkles lf={f} at={codeOn[2] + 1.2} x={paw.x} y={paw.y} n={14} spread={80} colors={["#fff", theme.c]} dur={0.6} />}
    <Sparkles lf={f} at={codeOn[2] + 2.0} x={520} y={hy + 90} n={12} spread={110} colors={["#fff", theme.c]} dur={0.7} />
    <Sparkles lf={f} at={codeOn[2] + 3.55} x={690} y={310} n={12} spread={90} colors={["#fff", theme.c]} dur={0.5} />
  </>;
})()}
              </>; })()}

              {/* ===== SNIPER = JAMES BOND (rich casino) ===== */}
              {ci === 3 && (() => { const barrel = over(f, fr(codeOn[3] + 0.1), fr(0.6)); const fire = over(f, fr(codeOn[3] + 1.35), fr(0.16)); const dead = over(f, fr(codeOn[3] + 1.5), fr(0.5)); return <>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 30%,#2A1E12,#08060C 78%)" }} />
                {/* rising smoke ribbon + gold bokeh */}
                {[...Array(3)].map((_, i) => { const yy = ((f * 1.5 + i * 60) % 300); return <div key={`smk${i}`} style={{ position: "absolute", left: 300 + Math.sin(yy / 30 + i) * 16, top: 520 - yy, width: 10, height: 10, borderRadius: "50%", background: "rgba(200,200,210,0.14)", filter: "blur(3px)", opacity: 1 - yy / 300 }} />; })}
                {[...Array(8)].map((_, i) => { const yy = ((f * 1.1 + i * 44) % 360); return <div key={`bok${i}`} style={{ position: "absolute", left: 380 + seed(i) * 280, top: 500 - yy, width: 6 + seed(i) * 8, height: 6 + seed(i) * 8, borderRadius: "50%", background: "#E8C24A", opacity: (1 - yy / 360) * 0.3, filter: "blur(1px)" }} />; })}
                {/* chandelier light-cone onto the table */}
                <div style={{ position: "absolute", left: "50%", top: 40, marginLeft: -220, width: 440, height: 500, background: "linear-gradient(180deg,rgba(255,225,150,0.16),transparent 78%)", clipPath: "polygon(42% 0,58% 0,84% 100%,16% 100%)" }} />
                {/* Monte-Carlo night windows */}
                {[70, 860].map((x, i) => <div key={`mw${i}`} style={{ position: "absolute", left: x, top: 70, width: 90, height: 150, borderRadius: "45px 45px 0 0", background: "linear-gradient(180deg,#0E1830,#060A18)", border: "2px solid #2A3A56" }}>{[...Array(6)].map((_, k) => <div key={k} style={{ position: "absolute", left: 12 + (k % 2) * 34, top: 20 + Math.floor(k / 2) * 34, width: 20, height: 22, background: "#E8C24A", opacity: 0.5 }} />)}</div>)}
                {/* roulette wheel (ball settles red) */}
                {(() => { const settle = over(f, fr(codeOn[3] + 1.2), fr(0.6)); const a = (1 - settle) * f * 0.5 + settle * 0.8; return <div style={{ position: "absolute", left: 70, bottom: 190, width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle,#3A2418,#160C08)", border: "5px solid #5A3A1E", transform: "scaleY(0.6)" }}><div style={{ position: "absolute", left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%`, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: settle > 0.8 ? "#C4302B" : "#EDE6D4", boxShadow: settle > 0.8 ? "0 0 8px #C4302B" : "none" }} /></div>; })()}
                {/* chandelier */}
                <div style={{ position: "absolute", left: "50%", top: 0, marginLeft: -70, width: 140, height: 70 }}>{[...Array(9)].map((_, i) => <div key={i} style={{ position: "absolute", left: 10 + i * 15, top: 20 + (i % 3) * 14, width: 8, height: 8, borderRadius: "50%", background: "#FFE9A0", boxShadow: "0 0 10px #FFD060" }} />)}</div>
                {/* green baize poker table */}
                <div style={{ position: "absolute", left: "50%", bottom: 60, marginLeft: -260, width: 520, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse,#1E6E44,#0E3A24)", border: "10px solid #5A3A1E", transform: "scaleY(0.7)", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }} />
                {/* chips + cards + martini */}
                {[[420, 690], [470, 700], [610, 695]].map(([x, y], i) => <div key={`chip${i}`} style={{ position: "absolute", left: x, top: y, width: 26, height: 26, borderRadius: "50%", background: ["#C4302B", "#2B54C4", "#111"][i], border: "3px dashed #fff" }} />)}
                <div style={{ position: "absolute", left: 660, top: 640, width: 30, height: 44 }}><div style={{ position: "absolute", left: 0, top: 20, width: 30, height: 0, borderLeft: "15px solid transparent", borderRight: "15px solid transparent", borderTop: "22px solid rgba(200,230,210,0.6)" }} /><div style={{ position: "absolute", left: 13, top: 40, width: 4, height: 16, background: "#C9C9C9" }} /><div style={{ position: "absolute", left: 20, top: 8, width: 8, height: 8, borderRadius: "50%", background: "#8AC46A" }} /></div>
                {/* gun-barrel iris entrance */}
                {barrel < 1 && <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: `inset 0 0 0 ${(1 - barrel) * 500}px #000`, pointerEvents: "none", zIndex: 12 }} />}
                {barrel < 0.9 && [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: "50%", top: "48%", width: (1 - barrel) * (620 - k * 90), height: (1 - barrel) * (620 - k * 90), marginLeft: -(1 - barrel) * (310 - k * 45), marginTop: -(1 - barrel) * (310 - k * 45), borderRadius: "50%", border: "8px solid #141414", zIndex: 12, opacity: 1 - barrel }} />)}
                {/* oxblood blood-curtain drip on the barrel */}
                {barrel < 0.7 && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${(0.7 - barrel) * 900}px`, background: "linear-gradient(180deg,#8B0A12,#C1121F)", zIndex: 13, opacity: 0.85, clipPath: "polygon(0 0,100% 0,100% 82%,92% 100%,84% 84%,74% 100%,64% 86%,52% 100%,42% 85%,30% 100%,20% 86%,10% 100%,0 84%)" }} />}
                {/* red laser sight dot climbing to the target */}
                {(() => { const climb = over(f, fr(codeOn[3] + 0.7), fr(0.6)); const lx = 300 + climb * 560, ly = 470 - climb * 160; return climb > 0.05 && dead < 0.3 ? <div style={{ position: "absolute", left: lx, top: ly, width: 12, height: 12, borderRadius: "50%", background: "#FF2233", boxShadow: "0 0 12px #FF2233", zIndex: 11, transform: `translate(${Math.sin(f) * 2}px,${Math.cos(f) * 2}px)` }} /> : null; })()}
                {/* target henchman falls on hit */}
                <div style={{ position: "absolute", right: 120, bottom: 210, transform: `scale(0.7) translateY(${dead * 120}px) rotate(${dead * 60}deg)`, opacity: 1 - dead * 0.7 }}>
                  <CMascot lf={f} size={130} tint="#3A3A44" suit={1} stern={0.7} xeyes={dead > 0.3 ? 1 : 0} />
                  {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: -18 - k * 11, top: -18 - k * 11, width: 130 + k * 22, height: 130 + k * 22, borderRadius: "50%", border: `${3 - k * 0.4}px solid ${theme.c}`, opacity: (1 - dead) * (0.9 - k * 0.16) }} />)}
                  <div style={{ position: "absolute", left: 58, top: 58, width: 14, height: 14, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px #fff", opacity: 1 - dead }} />
                </div>
                {/* tux Claude + bowtie */}
                <div style={{ position: "absolute", left: 190, bottom: 170 }}>
                  <CMascot lf={f} size={240} tint="#D97757" suit={1} stern={0.5} />
                  <div style={{ position: "absolute", left: "42%", top: "52%", width: 30, height: 14, background: "#111", clipPath: "polygon(0 0,50% 38%,100% 0,100% 100%,50% 62%,0 100%)" }} />
                </div>
                {fire > 0 && fire < 1 && <div style={{ position: "absolute", left: 330, top: 440, width: 560, height: 4, background: `linear-gradient(90deg,${theme.c},#fff)`, boxShadow: `0 0 12px ${theme.c}`, opacity: 1 - fire }} />}
                {dead > 0.1 && dead < 0.9 && <Sparkles lf={f} at={codeOn[3] + 1.5} x={900} y={450} n={12} spread={90} colors={[theme.c, "#fff", RED_A]} dur={0.6} />}
                <div style={{ position: "absolute", left: 60, bottom: 66, fontFamily: TITLE, fontStyle: "italic", fontWeight: 900, fontSize: 26, color: theme.c }}>ONE SHOT.</div>
                {/* ++ ACTION SNIPER ++ */}
                {/* ===== SNIPER: option-row elimination + sweeping laser + muzzle/chips + THE MOVE ===== */}
{(() => {
  const org = { x: 300, y: 600 };
  const rowY = 330;
  const targets = [
    { x: 348, doom: 1.05 },
    { x: 470, doom: 1.55 },
    { x: 596, doom: null },   /* survivor = THE MOVE */
    { x: 722, doom: 2.45 },
    { x: 856, doom: 2.95 },
  ];
  /* red laser sweep across the row, then locks onto the survivor */
  const swT = over(f, fr(codeOn[3] + 0.7), fr(2.15));
  const swX = 348 + swT * (856 - 348) + Math.sin(f / 3) * 5;
  const swY = 240 - swT * 30 + Math.cos(f / 4) * 4;
  const lockX = lf > 3.15 ? 596 : swX;
  const lockY = lf > 3.15 ? rowY : swY;
  /* muzzle flash = summed triangular pulses at each shot */
  const flash = targets.reduce((a, tg) => {
    if (tg.doom == null) return a;
    const up = over(f, fr(codeOn[3] + tg.doom), fr(0.07));
    const dn = over(f, fr(codeOn[3] + tg.doom + 0.07), fr(0.2));
    return Math.max(a, up * (1 - dn));
  }, 0);
  return (<>
    {/* --- doomed option targets: pop in, then get shot & fall --- */}
    {targets.map((tg, i) => {
      if (tg.doom == null) return null;
      const app = over(f, fr(codeOn[3] + 0.45 + i * 0.06), fr(0.32), Easing.out(Easing.back(1.6)));
      const p = over(f, fr(codeOn[3] + tg.doom), fr(0.55), Easing.in(Easing.cubic));
      const fy = p * 380;
      const rot = p * (i % 2 ? 85 : -85);
      const op = app * (1 - p * 0.92);
      return (
        <div key={"tg" + i} style={{ position: 'absolute', left: tg.x - 52, top: rowY - 66, transform: `translateY(${fy}px) rotate(${rot}deg) scale(${0.5 + 0.5 * app})`, opacity: op }}>
          <CMascot lf={f} size={104} tint="#2b2420" suit={1} stern={0.6} shock={p > 0.04 ? 1 : 0} xeyes={p > 0.12 ? 1 : 0} />
        </div>
      );
    })}
    {/* --- death sparkle + red ring-hit at each shot --- */}
    {targets.map((tg, i) => tg.doom == null ? null : (
      <Sparkles key={"sp" + i} lf={f} at={codeOn[3] + tg.doom} x={tg.x} y={rowY} n={13} spread={78} colors={["#fff", "#ff2b2b"]} dur={0.6} />
    ))}
    {/* --- surviving pick: gold aura, pulse, THE MOVE tag --- */}
    {(() => {
      const rev = over(f, fr(codeOn[3] + 1.9), fr(0.5), Easing.out(Easing.cubic));
      const pulse = 1 + 0.06 * Math.sin(f / 5);
      return (
        <div key="survivor" style={{ position: 'absolute', left: 596 - 60, top: rowY - 66, opacity: 0.35 + 0.65 * rev }}>
          <div style={{ position: 'absolute', left: 60, top: 52, transform: 'translate(-50%,-50%)', opacity: rev }}>
            <Aura f={f} s={200 * pulse} c={theme.c} />
          </div>
          <div style={{ transform: `scale(${(0.9 + 0.1 * rev) * pulse})` }}>
            <CMascot lf={f} size={116} tint={theme.c} suit={1} cheer={rev} nodAmp={4} />
          </div>
        </div>
      );
    })()}
    {(() => {
      const tag = over(f, fr(codeOn[3] + 3.3), fr(0.35), Easing.out(Easing.back(1.8)));
      if (tag <= 0) return null;
      return (
        <div key="themove" style={{ position: 'absolute', left: 596, top: rowY - 118, transform: `translateX(-50%) scale(${tag * (1 + 0.05 * Math.sin(f / 4))})`, background: theme.c, color: '#1a140e', fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: 2, padding: '8px 20px', borderRadius: 999, boxShadow: `0 0 26px ${theme.c}`, whiteSpace: 'nowrap' }}>THE MOVE</div>
      );
    })()}
    {/* --- laser beam + sweeping targeting reticle + muzzle flash (SVG overlay) --- */}
    <svg key="sniper-svg" width={1012} height={792} viewBox="0 0 1012 792" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="muz" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="35%" stopColor={theme.c} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.c} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* laser beam */}
      <line x1={org.x} y1={org.y} x2={lockX} y2={lockY} stroke="#ff2b2b" strokeWidth={2.5} opacity={0.85} style={{ filter: 'drop-shadow(0 0 5px #ff2b2b)' }} />
      {/* targeting reticle */}
      <g transform={`translate(${lockX},${lockY}) rotate(${f * 4})`} opacity={0.95}>
        <circle r={16} fill="none" stroke="#ff2b2b" strokeWidth={2.5} />
        <line x1={-24} y1={0} x2={-8} y2={0} stroke="#ff2b2b" strokeWidth={2} />
        <line x1={8} y1={0} x2={24} y2={0} stroke="#ff2b2b" strokeWidth={2} />
        <line x1={0} y1={-24} x2={0} y2={-8} stroke="#ff2b2b" strokeWidth={2} />
        <line x1={0} y1={8} x2={0} y2={24} stroke="#ff2b2b" strokeWidth={2} />
      </g>
      <circle cx={lockX} cy={lockY} r={4} fill="#fff" />
      {/* expanding ring-hits at shots */}
      {targets.map((tg, i) => {
        if (tg.doom == null) return null;
        const r = over(f, fr(codeOn[3] + tg.doom), fr(0.5), Easing.out(Easing.cubic));
        if (r <= 0 || r >= 1) return null;
        return <circle key={"rh" + i} cx={tg.x} cy={rowY} r={12 + r * 66} fill="none" stroke="#ff2b2b" strokeWidth={4 * (1 - r)} opacity={1 - r} />;
      })}
      {/* muzzle flash at gun */}
      {flash > 0.02 && <circle cx={org.x} cy={org.y} r={20 + flash * 60} fill="url(#muz)" opacity={flash} />}
    </svg>
    {/* --- flying gold chips / shell casings, continuous spray from the gun --- */}
    {Array.from({ length: 8 }).map((_, k) => {
      const ph = ((lf * 0.85 + seed(k) * 1.3) % 1.1) / 1.1;
      const dir = 0.6 + seed(k + 11) * 0.9;
      const cx = org.x + ph * (150 + seed(k + 3) * 190) * dir;
      const cy = org.y - (ph * 300 - ph * ph * 330) - seed(k + 7) * 40;
      const op = Math.min(1, (1 - ph) * 2.2) * over(f, fr(codeOn[3] + 0.9), fr(0.4));
      const sz = 12 + seed(k + 5) * 10;
      return (
        <div key={"chip" + k} style={{ position: 'absolute', left: cx, top: cy, width: sz, height: sz, borderRadius: '50%', background: k % 2 ? theme.c : '#e9d7a3', border: `2px dashed rgba(0,0,0,0.25)`, transform: `translate(-50%,-50%) rotate(${f * (5 + k)}deg)`, opacity: op, boxShadow: `0 0 8px ${theme.c}` }} />
      );
    })}
  </>);
})()}
              </>; })()}

              {/* ===== GODMODE = SUPER SAIYAN vs THANOS ===== */}
              {ci === 4 && (() => { const power = over(f, fr(codeOn[4] + 0.2), fr(0.9)); const charge = over(f, fr(codeOn[4] + 0.9), fr(0.5)); const strike = over(f, fr(codeOn[4] + 1.3), fr(0.3)); const dust = over(f, fr(codeOn[4] + 1.65), fr(1.0)); const bhurt = over(f, fr(codeOn[4] + 1.42), fr(0.14)) * (1 - dust); return <>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 90% at 40% 44%,#4A2A1A,#0E0A16 76%)" }} />
                {[...Array(30)].map((_, i) => <div key={`st${i}`} style={{ position: "absolute", left: `${seed(i) * 100}%`, top: `${seed(i + 4) * 100}%`, width: 2, height: 2, background: "#fff", opacity: 0.3 }} />)}
                {/* fractured moon */}
                <div style={{ position: "absolute", right: 90, top: 90, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%,#E8E0F0,#8A7CA8 70%,#4A3E68)", boxShadow: "0 0 40px rgba(180,150,240,0.3)" }}><div style={{ position: "absolute", left: "40%", top: 0, bottom: 0, width: 2, background: "rgba(40,20,50,0.5)", transform: "rotate(12deg)" }} /></div>
                {/* distant monoliths rim-lit */}
                {[[90, 300], [880, 260], [700, 240]].map(([x, top], i) => <div key={`mo${i}`} style={{ position: "absolute", left: x, top: top as number, width: 44, height: 792 - (top as number) - 160, background: "linear-gradient(90deg,rgba(255,180,60,0.16),#100A18 40%,rgba(180,120,240,0.16))", opacity: 0.7 }} />)}
                {/* shattered rocky battlefield */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: "linear-gradient(180deg,#2A2038,#100A18)", clipPath: "polygon(0 24%,16% 10%,38% 24%,60% 8%,82% 22%,100% 10%,100% 100%,0 100%)" }} />
                {[[240, 300, 34], [820, 340, 46], [520, 240, 28], [680, 460, 38]].map(([x, y, sz], i) => <div key={`rb${i}`} style={{ position: "absolute", left: x, top: (y as number) + Math.sin(f / 10 + i) * 12, width: sz as number, height: (sz as number) * 0.7, background: "#241830", transform: `rotate(${f + i * 40}deg)` }} />)}
                {power > 0.4 && [...Array(6)].map((_, i) => <div key={`cr${i}`} style={{ position: "absolute", left: 120 + i * 140, bottom: 8, width: 4, height: 150, background: "linear-gradient(0deg,#FF7A1A,#FFB020,transparent)", transform: `skewX(${(i - 2.5) * 16}deg)`, opacity: 0.6, filter: "drop-shadow(0 0 6px #FF7A1A)" }} />)}
                {/* THANOS purple */}
                <div style={{ position: "absolute", right: 40, bottom: 150, transform: `translateY(${dust * 34}px) rotate(${dust * 12}deg)`, opacity: 1 - dust * 0.9, filter: bhurt > 0.3 ? "brightness(1.7) saturate(1.5)" : "saturate(1.35)" }}>
                  <CMascot lf={f} size={300} tint={THANOS} stern={0.85} capeC="#3A1A5E" shock={dust > 0.2 ? 0.5 : 0} />
                  <div style={{ position: "absolute", right: -30, top: `${20 - power * 12}%`, transform: "rotate(-10deg)" }}><Gauntlet s={150} gems={dust > 0.4 ? 0 : 4} snap={power * (1 - strike)} lf={f} /></div>
                </div>
                {dust > 0.1 && [...Array(24)].map((_, i) => <div key={`du${i}`} style={{ position: "absolute", right: 40 + seed(i) * 280, bottom: 190 + seed(i + 3) * 280, width: 6, height: 6, background: "#C4A6EC", opacity: (1 - dust) * 0.9, transform: `translateY(${-dust * (50 + seed(i) * 130)}px)` }} />)}
                {/* Saiyan hero */}
                <div style={{ position: "absolute", left: 190, bottom: 150 }}>
                  {power > 0.3 && <div style={{ position: "absolute", left: "44%", bottom: 0, width: 130, height: 560, marginLeft: -65, background: "linear-gradient(0deg,#FFF7D6,#FFD84D 40%,rgba(255,176,32,0))", filter: "blur(6px)", opacity: 0.7, transform: `scaleX(${0.94 + Math.sin(f / 2) * 0.08})` }} />}
                  {power > 0.2 && <Aura f={f} s={230} c={theme.c} />}
                  {power > 0.4 && <svg style={{ position: "absolute", left: -40, top: -40, width: 320, height: 340, overflow: "visible" }}>{[0, 1, 2, 3].map((k) => { const a = k / 4 * Math.PI * 2 + Math.floor(f / 5); const x0 = 160 + Math.cos(a) * 90, y0 = 170 + Math.sin(a) * 90; return <polyline key={k} points={`${x0},${y0} ${x0 + 14},${y0 + 20} ${x0 - 8},${y0 + 34} ${x0 + 10},${y0 + 54}`} fill="none" stroke="#6FE8FF" strokeWidth="3" style={{ filter: "drop-shadow(0 0 5px #6FE8FF)", opacity: Math.floor(f / 4) % 2 ? 0.9 : 0.4 }} />; })}</svg>}
                  <CMascot lf={f} size={230} tint={lerpHex("#D97757", "#FFD400", power)} stern={0.3} cheer={power > 0.5 ? 0.8 : 0} shock={power < 0.5 && power > 0.1 ? 0.4 : 0} />
                  {power > 0.4 && <div style={{ position: "absolute", left: 52, top: 6, width: 126, height: 60 }}>{[...Array(5)].map((_, i) => <div key={i} style={{ position: "absolute", left: i * 24, bottom: 0, width: 0, height: 0, borderLeft: "13px solid transparent", borderRight: "13px solid transparent", borderBottom: `${40 + (i % 2) * 16}px solid #FFD400`, transform: `rotate(${(i - 2) * 9}deg)`, filter: "drop-shadow(0 0 5px #FFD400)" }} />)}</div>}
                </div>
                {charge > 0 && strike < 0.1 && <div style={{ position: "absolute", left: 340, top: 500, width: 40 + charge * 40, height: 40 + charge * 40, marginLeft: -(20 + charge * 20), marginTop: -(20 + charge * 20), borderRadius: "50%", background: "radial-gradient(circle,#fff,#BFEFFF 52%,transparent 74%)", boxShadow: "0 0 34px #BFEFFF" }} />}
                {strike > 0 && <>
                  <div style={{ position: "absolute", left: 336, top: 474, width: 500 * strike, height: 54, background: "linear-gradient(90deg,#fff,#BFEFFF 42%,rgba(127,216,255,0.25))", clipPath: "polygon(0 32%,100% 0,100% 100%,0 68%)", boxShadow: "0 0 44px #7FD8FF", opacity: 1 - dust * 0.5 }} />
                  <div style={{ position: "absolute", left: 306, top: 500, width: 64, height: 28, marginTop: -14, borderRadius: "50%", background: "radial-gradient(circle,#fff,#BFEFFF,transparent)", boxShadow: "0 0 30px #fff" }} />
                  {strike > 0.55 && <div style={{ position: "absolute", left: 815, top: 430, width: 150, height: 150, marginLeft: -75, marginTop: -30, borderRadius: "50%", background: "radial-gradient(circle,#fff,#7FD8FF,transparent 70%)", opacity: (strike - 0.55) * 2.2 }} />}
                </>}
                {bhurt > 0.2 && <Sparkles lf={f} at={codeOn[4] + 1.45} x={780} y={340} n={16} spread={180} colors={["#fff", theme.c, GOLD]} dur={0.7} />}
                {/* ++ ACTION GODMODE ++ */}
                {/* ==== GODMODE extra action layer (renders on top) ==== */}
<div style={{position:'absolute', left:0, top:0, width:'1012px', height:'792px', pointerEvents:'none'}}>
  {/* Afterimage hero dash (DBZ instant-transmission streak toward Thanos) */}
  {(() => {
    const dash = over(f, fr(codeOn[4]+2.2), fr(0.55), Easing.out(Easing.cubic));
    const gone = over(f, fr(codeOn[4]+2.85), fr(0.5));
    const op = dash * (1 - gone);
    if (op <= 0.03) return null;
    const x = 150 + dash * 250;
    return (
      <div key="gm-afterimg" style={{position:'absolute', left:x+'px', top:'412px', opacity:op*0.55, filter:'blur(1.2px)', pointerEvents:'none'}}>
        <CMascot lf={f} size={200} tint={theme.c} cheer={1} nodAmp={0} />
      </div>
    );
  })()}

  {/* Vector action overlay */}
  <svg viewBox="0 0 1012 792" style={{position:'absolute', left:0, top:0, width:'1012px', height:'792px', overflow:'visible', pointerEvents:'none'}}>
    <defs>
      <linearGradient id="gmBeam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="0.5" stopColor={theme.c} stopOpacity="0.95" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="gmOrb" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="0.55" stopColor={theme.c} stopOpacity="0.9" />
        <stop offset="1" stopColor={theme.c} stopOpacity="0" />
      </radialGradient>
    </defs>
    {(() => {
      const bp = over(f, fr(codeOn[4]+2.2), fr(0.5), Easing.out(Easing.cubic));
      const beamFade = 1 - over(f, fr(codeOn[4]+3.9), fr(0.7));
      const shakeAmp = 12 * bp * (1 - over(f, fr(codeOn[4]+3.7), fr(1.0)));
      const sx = Math.sin(f*2.3) * shakeAmp, sy = Math.cos(f*3.1) * shakeAmp;
      const tx = 350 + (700-350)*bp, ty = 500 + (390-500)*bp;
      return (
        <g transform={`translate(${sx} ${sy})`}>
          {/* Beat 1: battlefield debris lifts + orbits the hero, then flings out on fire */}
          {[...Array(8)].map((_, i) => {
            const lift = over(f, fr(codeOn[4]+0.4), fr(1.0), Easing.out(Easing.cubic));
            const fling = over(f, fr(codeOn[4]+2.2), fr(0.9), Easing.out(Easing.cubic));
            const a = f/16 + i*(Math.PI/4);
            const r = 110 + seed(i)*50 + fling*190;
            const cx = 340 + Math.cos(a)*r;
            const cy = 500 - lift*22 + Math.sin(a)*r*0.5;
            const sz = 8 + seed(i+5)*11;
            const rot = f*3 + i*40;
            const op = lift * (1 - over(f, fr(codeOn[4]+3.6), fr(1.2)));
            const col = lerpHex('#3a2a1c', theme.c, seed(i));
            if (op <= 0.02) return null;
            return <rect key={'gm-d'+i} x={cx-sz/2} y={cy-sz/2} width={sz} height={sz} rx={2} fill={col} opacity={op} transform={`rotate(${rot} ${cx} ${cy})`} />;
          })}

          {/* Beat 2: the four prior code-emblems orbit the hero and spiral into the charge (all four at once) */}
          {[0,1,2,3].map((i) => {
            const colors = ['#5ad46a', '#b06ff0', '#ff5555', theme.c];
            const appear = over(f, fr(codeOn[4]+0.5), fr(0.4));
            const conv = over(f, fr(codeOn[4]+0.6), fr(1.55), Easing.in(Easing.cubic));
            const a = i*(Math.PI/2) + f/18;
            const rad = 160 * (1-conv);
            const cx = 340 + Math.cos(a)*rad;
            const cy = 500 + Math.sin(a)*rad*0.68;
            const op = appear * (1 - conv*conv);
            if (op <= 0.02) return null;
            return (
              <g key={'gm-e'+i} opacity={op}>
                <circle cx={cx} cy={cy} r={16} fill={colors[i]} opacity={0.3} />
                <circle cx={cx} cy={cy} r={8} fill={colors[i]} />
              </g>
            );
          })}

          {/* Beat 3+4: Thanos hurls a purple blast; hero bats it away (ricochets up-right) */}
          {(() => {
            const pb = over(f, fr(codeOn[4]+1.0), fr(0.7), Easing.in(Easing.cubic));
            const dfl = over(f, fr(codeOn[4]+1.75), fr(0.55), Easing.out(Easing.cubic));
            if (pb <= 0.01) return null;
            let bx, by, op;
            if (dfl <= 0.01) { bx = 680 + (470-680)*pb; by = 390 + (470-390)*pb; op = 1; }
            else { bx = 470 + (785-470)*dfl; by = 470 + (150-470)*dfl; op = 1 - dfl; }
            return (
              <g key="gm-blast" opacity={op}>
                <circle cx={bx} cy={by} r={24} fill="#b06ff0" opacity={0.32} />
                <circle cx={bx} cy={by} r={12} fill="#d8b6ff" />
              </g>
            );
          })()}

          {/* Beat 5: the merged kamehameha surges toward Thanos */}
          {bp > 0.01 && (
            <g opacity={Math.max(0, beamFade)}>
              <line x1={350} y1={500} x2={tx} y2={ty} stroke={theme.c} strokeWidth={12 + bp*92} strokeLinecap="round" opacity={0.28} />
              <line x1={350} y1={500} x2={tx} y2={ty} stroke="url(#gmBeam)" strokeWidth={8 + bp*52} strokeLinecap="round" />
              <circle cx={tx} cy={ty} r={22 + bp*46} fill="url(#gmOrb)" />
              <circle cx={tx} cy={ty} r={12 + bp*20} fill="#ffffff" opacity={0.9} />
            </g>
          )}

          {/* Beat 5: impact flash at Thanos */}
          {(() => {
            const fp = over(f, fr(codeOn[4]+2.3), fr(0.5), Easing.out(Easing.cubic));
            const fade = 1 - over(f, fr(codeOn[4]+2.8), fr(0.9));
            if (fp <= 0.01) return null;
            return <circle key="gm-flash" cx={700} cy={390} r={20 + fp*95} fill="#ffffff" opacity={Math.max(0, 0.55*fade*fp)} />;
          })()}

          {/* Beat 6: aftershock rings expand from the dusting titan */}
          {[0,1,2].map((i) => {
            const rp = over(f, fr(codeOn[4]+2.9 + i*0.35), fr(1.3), Easing.out(Easing.cubic));
            if (rp <= 0.01 || rp >= 1) return null;
            const rr = rp * (200 + i*32);
            const op = (1 - rp) * 0.7;
            return <circle key={'gm-r'+i} cx={700} cy={390} r={rr} fill="none" stroke={theme.c} strokeWidth={6*(1-rp) + 1} opacity={op} />;
          })}
        </g>
      );
    })()}
  </svg>
</div>

{/* accent bursts synced to the beats */}
<Sparkles lf={f} at={codeOn[4]+1.78} x={472} y={468} n={10} spread={80} colors={["#fff","#d8b6ff"]} dur={0.5} />
<Sparkles lf={f} at={codeOn[4]+2.1} x={340} y={500} n={16} spread={120} colors={["#fff",theme.c]} dur={0.6} />
<Sparkles lf={f} at={codeOn[4]+2.4} x={700} y={390} n={18} spread={170} colors={["#fff",theme.c]} dur={0.7} />
              </>; })()}

              {enter < 0.42 && <div style={{ position: "absolute", inset: 0, background: theme.c, opacity: (0.42 - enter) * 1.4, mixBlendMode: "screen", pointerEvents: "none" }} />}
              <HudFrame accent={theme.c} op={0.8} />
              <CodeLabel n={ci + 1} name={theme.key} tag={theme.tag} accent={theme.c} p={p} />
            </div>
          );
        })()}

        {/* ===== HOOK — retro arcade: Konami code, Claude DOES the inputs -> GOD MODE ===== */}
        {inHook && (() => {
          const lf = t;
          const KON = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"];
          const cs = 2.2, step = 0.32, N = 10;
          const pressed = (i: number) => over(f, fr(cs + i * step), fr(0.12));
          const codeEnd = cs + N * step;                  // ~5.4
          const cheat = over(f, fr(codeEnd + 0.1), fr(0.35));
          const activated = lf >= codeEnd + 0.1;
          const absAt = (i: number) => 6.9 + i * 0.34;
          const absorbed = [0, 1, 2, 3].filter((i) => t >= absAt(i) + 0.34).length;
          const power = !activated ? 0.1 : Math.min(1, 0.28 + absorbed * 0.18);
          const heroSize = 196 + absorbed * 16;
          const heroFlash = [0, 1, 2, 3].reduce((m, i) => { const d = t - (absAt(i) + 0.30); return Math.max(m, (d >= 0 && d < 0.38) ? 1 - d / 0.38 : 0); }, 0);
          const secret = lf >= 8.82;
          const gone = activated ? over(f, fr(codeEnd + 0.35), fr(0.4)) : 0;
          const gold = power > 0.25 ? lerpHex("#D97757", "#FFD400", power) : "#B08A78";
          // Claude DOES each input
          const ai = Math.floor((lf - cs) / step);
          const inCode = lf >= cs && ai >= 0 && ai < N;
          const ap = inCode ? ((lf - cs) - ai * step) / step : 0;
          const mv = inCode ? Math.sin(Math.min(1, ap * 2.2) * Math.PI) : 0;
          let mx = 0, my = 0, sq = 1;
          if (inCode) { const k = KON[ai]; if (k === "↑") my = -mv * 70; else if (k === "↓") { my = mv * 14; sq = 1 - mv * 0.3; } else if (k === "←") mx = -mv * 80; else if (k === "→") mx = mv * 80; else mx = mv * 26; }
          // enemy dive-hit while weak
          const hit = !activated && lf >= 1.5 && lf < 1.85; const hy = -160 + over(f, fr(1.0), fr(0.55)) * 300;
          const heroX = 260 + mx, heroY = -mv * 0 + my;
          return (
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 100% at 50% 44%,#171736,#05050E 82%)", overflow: "hidden" }}>
              {/* CRT / arcade POWER-ON pattern interrupt (first ~0.5s) */}
              {lf < 0.55 && (() => { const p = over(f, fr(0.0), fr(0.42), Easing.out(Easing.cubic)); const bar = (1 - p) * 50; return (
                <div style={{ position: "absolute", inset: 0, zIndex: 55, pointerEvents: "none", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${bar}%`, background: "#000" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${bar}%`, background: "#000" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${bar}%`, height: 5, marginTop: -2, background: "#DFFBFF", boxShadow: "0 0 30px #7FD8FF, 0 0 60px #7FD8FF", opacity: 1 - p }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: `${bar}%`, height: 5, marginBottom: -2, background: "#DFFBFF", boxShadow: "0 0 30px #7FD8FF, 0 0 60px #7FD8FF", opacity: 1 - p }} />
                  {p < 0.28 && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: 0.28 - p }} />}
                  {lf < 0.85 && (() => { const cin = over(f, fr(0.34), fr(0.22)); const cout = 1 - over(f, fr(0.7), fr(0.18)); return <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: mono, fontWeight: 900, fontSize: 34, letterSpacing: 8, color: "#7FD8FF", textShadow: "0 0 16px #7FD8FF", opacity: cin * cout, transform: `scale(${0.8 + cin * 0.2})` }}>PLAYER 1 · CREDIT 1</div>; })()}
                </div>
              ); })()}
              <div style={{ position: "absolute", left: -200, right: -200, bottom: 0, height: 300, backgroundImage: "linear-gradient(rgba(130,100,230,0.22) 2px,transparent 2px),linear-gradient(90deg,rgba(130,100,230,0.22) 2px,transparent 2px)", backgroundSize: "52px 52px", backgroundPositionY: `${(f * 2) % 52}px`, transform: "perspective(320px) rotateX(62deg)", transformOrigin: "50% 100%", opacity: 0.9 }} />
              {[...Array(36)].map((_, i) => <div key={`st${i}`} style={{ position: "absolute", left: `${seed(i) * 100}%`, top: `${seed(i + 3) * 58}%`, width: 2, height: 2, background: "#fff", opacity: 0.2 + Math.sin(f / 8 + i) * 0.2 }} />)}
              <div style={{ position: "absolute", left: 42, top: 46, fontFamily: mono, fontWeight: 800, fontSize: 22, color: "#FF5A5A", textShadow: "0 0 6px #FF5A5A", lineHeight: 1.3 }}>1UP<br /><span style={{ color: "#fff" }}>{("00000" + Math.floor(power * 990)).slice(-6)}</span></div>
              <div style={{ position: "absolute", right: 42, top: 46, width: 220, textAlign: "right" }}><div style={{ fontFamily: mono, fontWeight: 800, fontSize: 17, letterSpacing: 2, color: "#7FD8FF", marginBottom: 5 }}>POWER {Math.round(power * 100)}%</div><div style={{ width: 220, height: 22, borderRadius: 4, background: "#0A0A1A", border: "2px solid #3A3A6A", padding: 2 }}><div style={{ height: "100%", width: `${power * 100}%`, borderRadius: 2, background: power > 0.5 ? "linear-gradient(90deg,#FFD400,#FF8A2B)" : "#FF5A5A", boxShadow: `0 0 8px ${power > 0.5 ? "#FFD400" : "#FF5A5A"}` }} /></div></div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 22, background: "repeating-linear-gradient(90deg,#3A2E5A 0 30px,#2A2044 30px 60px)", borderTop: "3px solid #7A6AC0", boxShadow: "0 0 16px rgba(122,106,192,0.4)" }} />
              {/* diving enemy that hits weak Claude, then the invader row */}
              {!activated && lf < 2.0 && <div style={{ position: "absolute", left: 300, top: hy, transform: "scale(1.1)" }}><svg viewBox="0 0 60 44" width={56} height={42} shapeRendering="crispEdges"><rect x={14} y={6} width={32} height={22} fill="#FF6A6A" /><rect x={6} y={14} width={8} height={16} fill="#FF6A6A" /><rect x={46} y={14} width={8} height={16} fill="#FF6A6A" /><rect x={20} y={12} width={7} height={9} fill="#0A0A16" /><rect x={33} y={12} width={7} height={9} fill="#0A0A16" /></svg></div>}
              {[0, 1, 2, 3].map((i) => { const bob = Math.sin(f / 6 + i) * 7; return <div key={`en${i}`} style={{ position: "absolute", left: 600 + i * 92, top: 250 + bob, opacity: 1 - gone, transform: `scale(${1 - gone}) translateY(${gone * -30}px)` }}><svg viewBox="0 0 60 44" width={56} height={42} shapeRendering="crispEdges"><rect x={14} y={6} width={32} height={22} fill="#5FE07A" /><rect x={6} y={14} width={8} height={16} fill="#5FE07A" /><rect x={46} y={14} width={8} height={16} fill="#5FE07A" /><rect x={20} y={12} width={7} height={9} fill="#0A0A16" /><rect x={33} y={12} width={7} height={9} fill="#0A0A16" /><rect x={10} y={32} width={8} height={10} fill="#5FE07A" /><rect x={42} y={32} width={8} height={10} fill="#5FE07A" /></svg></div>; })}
              {gone > 0.1 && gone < 0.9 && [0, 1, 2, 3].map((i) => <Sparkles key={`ex${i}`} lf={f} at={codeEnd + 0.35} x={628 + i * 92} y={270} n={7} spread={70} colors={["#5FE07A", "#fff", "#FFD400"]} dur={0.5} />)}
              {/* pixel Claude hero — MOVES with each input; recoils on hit; GOLD god-mode */}
              <div style={{ position: "absolute", left: heroX, bottom: 172, transform: `translate(${hit ? -24 : 0}px, ${heroY}px) scale(${1 + heroFlash * 0.07}) scaleY(${sq})`, filter: hit ? "brightness(2)" : heroFlash > 0.4 ? `brightness(${1 + heroFlash})` : "none", zIndex: 8 }}>
                {power > 0.4 && <Aura f={f} s={heroSize} c="#FFD400" />}
                <CMascot lf={f} size={heroSize} tint={gold} stern={activated ? 0.2 : 0.4} shock={hit ? 0.5 : 0} cheer={power > 0.6 ? 0.85 : 0} />
                {power > 0.5 && <div style={{ position: "absolute", left: heroSize * 0.23, top: 2, width: heroSize * 0.55, height: 52 }}>{[...Array(5)].map((_, i) => <div key={i} style={{ position: "absolute", left: i * (heroSize * 0.11), bottom: 0, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: `${36 + (i % 2) * 14}px solid #FFD400`, transform: `rotate(${(i - 2) * 9}deg)`, filter: "drop-shadow(0 0 5px #FFD400)" }} />)}</div>}
              </div>
              {heroFlash > 0.35 && <div style={{ position: "absolute", left: heroX - 30, bottom: 172 + heroSize + 8, width: 280, textAlign: "center", fontFamily: mono, fontWeight: 900, fontSize: 33, color: "#FFE86A", textShadow: "0 0 16px #FF8A2B, 0 2px 0 #8A4E10", letterSpacing: 2, opacity: heroFlash, transform: `translateY(${-(1 - heroFlash) * 26}px) scale(${0.7 + heroFlash * 0.42})`, zIndex: 24 }}>LVL&nbsp;UP!</div>}
              {/* GIANT ghost arrow flashing center on each press */}
              {inCode && mv > 0.1 && <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: mono, fontWeight: 900, fontSize: 200, color: "#FFD400", opacity: mv * 0.4, textShadow: "0 0 40px #FF8A2B", zIndex: 10 }}>{KON[ai]}</div>}
              {/* BIG Konami code panel — pronounced keys */}
              {lf < codeEnd + 0.8 && <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, display: "flex", justifyContent: "center", gap: 10, zIndex: 20 }}>{KON.map((k, i) => { const pp = pressed(i); const on = pp > 0.5; const active = ai === i && inCode; return <div key={i} style={{ width: 62, height: 62, borderRadius: 10, background: on ? "linear-gradient(180deg,#FFE79A,#E0A94A)" : "#161632", border: `3px solid ${on ? "#FFD400" : "#3A3A6A"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 900, fontSize: 34, color: on ? "#2A1A08" : "#5A5A8A", boxShadow: active ? "0 0 26px #FFD400" : on ? "0 0 12px #FFD400" : "none", transform: `scale(${active ? 1.45 : on ? 1.05 : 1}) translateY(${active ? -8 : 0}px)` }}>{k}</div>; })}</div>}
              {/* CHEAT ACTIVATED + shockwave */}
              {cheat > 0.04 && lf < 8.82 && <div style={{ position: "absolute", left: 0, right: 0, top: 250, textAlign: "center", transform: `scale(${Math.min(1.12, cheat * 1.3)})`, opacity: cheat * (1 - over(f, fr(7.2), fr(0.5))), zIndex: 26 }}><div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 78, color: "#FFD400", textShadow: "0 0 30px #FF8A2B, 0 4px 0 #8A4E10", letterSpacing: 2 }}>CHEAT ACTIVATED</div></div>}
              {cheat > 0.02 && cheat < 1 && <div style={{ position: "absolute", left: 360, top: 480, width: cheat * 900, height: cheat * 900, marginLeft: -cheat * 450, marginTop: -cheat * 450, borderRadius: "50%", border: `${5 - cheat * 4}px solid rgba(255,212,0,${1 - cheat})`, zIndex: 12 }} />}
              {cheat > 0.04 && cheat < 0.5 && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: (0.5 - cheat), zIndex: 25 }} />}
              {/* 5 special power-up ORBS launch UP high (glowing gem items) */}
              {activated && CODES.map((cd, i) => {
                const ap = over(f, fr(6.0 + i * 0.12), fr(0.3), Easing.out(Easing.back(1.6)));
                if (ap < 0.02) return null;
                const isFifth = i === 4;
                const ab = isFifth ? 0 : over(f, fr(absAt(i)), fr(0.34), Easing.in(Easing.cubic));
                if (!isFifth && ab >= 1) return null;
                const locked = isFifth && secret;
                const rowX = 506 + (i - 2) * 116, rowY = 258;
                const tgtX = 372, tgtY = 512;
                const ox = rowX + (tgtX - rowX) * ab;
                const oy = rowY + (1 - ap) * 250 * (1 - ab) + (tgtY - rowY) * ab + Math.sin(f / 7 + i) * 6 * (1 - ab);
                const sc = ap * (1 - ab * 0.82);
                return (
                  <div key={`orb${i}`} style={{ position: "absolute", left: ox - 39, top: oy - 39, width: 78, height: 78, transform: `scale(${sc}) rotate(${ab * 220}deg)`, opacity: ap * (1 - Math.max(0, (ab - 0.72) / 0.28)), zIndex: 22 }}>
                    {!isFifth && ab > 0.12 && <div style={{ position: "absolute", left: 20, top: 20, width: 38, height: 38, borderRadius: "50%", background: cd.c, filter: "blur(9px)", opacity: 0.7 * ab }} />}
                    <div style={{ position: "absolute", inset: -12, borderRadius: "50%", background: `radial-gradient(circle,${locked ? "#FF3B3B" : cd.c}66,transparent 66%)`, opacity: 0.7 + Math.sin(f / 5 + i) * 0.2 }} />
                    {locked ? <div style={{ width: 78, height: 78, borderRadius: 14, background: "rgba(20,4,8,0.9)", border: "3px solid #FF3B3B", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TITLE, fontWeight: 900, fontSize: 46, color: "#FF3B3B", boxShadow: "0 0 22px #FF3B3B" }}>?</div>
                    : <div style={{ width: 62, height: 62, margin: 8, transform: "rotate(45deg)", background: `linear-gradient(135deg,#fff,${cd.c} 55%,${cd.c})`, borderRadius: 10, boxShadow: `0 0 24px ${cd.c}`, border: "2px solid rgba(255,255,255,0.5)" }}><div style={{ position: "absolute", left: 10, top: 8, width: 18, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.75)", transform: "rotate(-45deg)" }} /></div>}
                  </div>
                );
              })}
              {/* HEADER — descriptive, names Claude */}
              {lf < 5.4 && (() => { const tin = over(f, fr(0.1), fr(0.5), Easing.out(Easing.back(1.4))); const out = 1 - over(f, fr(4.9), fr(0.5)); return (
                <div style={{ position: "absolute", left: 40, right: 40, top: 96, textAlign: "center", transform: `scale(${0.92 + tin * 0.08})`, opacity: tin * out, zIndex: 30 }}>
                  <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 74, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#F6EFE2", textShadow: "0 3px 0 rgba(16,8,2,0.6), 0 0 30px rgba(0,0,0,0.85)" }}>5 <span style={{ color: "#F2C14E" }}>Claude</span> cheat codes<br /><span style={{ fontSize: 46, color: "#E8965A" }}>that feel illegal</span></div>
                </div>
              ); })()}
              {/* SECRET 5th payoff */}
              {secret && (() => { const pp = over(f, fr(8.9), fr(0.45)); const gl = Math.floor(f / 3) % 3 === 0; return (
                <div style={{ position: "absolute", left: 0, right: 0, top: 400, textAlign: "center", opacity: pp, zIndex: 28 }}>
                  <div style={{ display: "inline-block", padding: "10px 26px", borderRadius: 12, background: "rgba(30,6,10,0.85)", border: "3px solid #FF3B3B", boxShadow: "0 0 30px rgba(255,59,59,0.5)", opacity: gl ? 0.75 : 1 }}>
                    <div style={{ fontFamily: mono, fontWeight: 900, fontSize: 42, letterSpacing: 4, color: "#FF5A5A", textShadow: "0 0 12px #FF3B3B" }}>SECRET CHEAT</div>
                    <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 20, letterSpacing: 6, color: "#FFB0B0", marginTop: 2 }}>[ CLASSIFIED ]</div>
                  </div>
                </div>
              ); })()}
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(0,0,0,0.16) 0 2px,transparent 2px 4px)", pointerEvents: "none", zIndex: 40 }} />
              <HudFrame accent="#7FD8FF" op={0.4} />
            </div>
          );
        })()}

        {/* ===== OUTRO / CTA — house pattern (marquee + recap chips + crowd + comment pill + confetti) ===== */}
        {inOutro && (() => {
          const lf = t - OUTRO_ON; const kw = over(f, fr(OUTRO_ON + 0.1), fr(0.4)); const cta = over(f, fr(OUTRO_ON + 1.4), fr(0.5)); const breath = 1 + Math.sin(f / 9) * 0.02;
          return (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(158deg,#FBF6EC 0%,#F3E9D8 58%,#F5EAF0 100%)" }}>
              <div style={{ position: "absolute", left: "50%", top: -40, width: 860, height: 520, marginLeft: -430, background: "radial-gradient(ellipse 42% 90% at 50% 0%, rgba(231,178,76,0.34), transparent 66%)" }} />
              {[...Array(16)].map((_, i) => <div key={`r${i}`} style={{ position: "absolute", left: "50%", top: 430, width: 1100, height: 9, marginLeft: -550, marginTop: -4, background: "linear-gradient(90deg, transparent 44%, rgba(231,178,76,0.14) 50%, transparent 56%)", transformOrigin: "50% 50%", transform: `rotate(${i * 22.5 + f * 0.5}deg)` }} />)}
              {/* CHEATS marquee plate */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 30, display: "flex", justifyContent: "center", transform: `scale(${kw})`, zIndex: 8 }}>
                <div style={{ position: "relative", padding: "14px 40px", borderRadius: 22, background: "linear-gradient(158deg,#FFF9EE,#F6E9D2)", border: "4px solid #E0B24C", boxShadow: "0 22px 50px -18px rgba(120,70,20,0.5), 0 0 40px rgba(231,178,76,0.35)" }}>
                  {[...Array(24)].map((_, i) => { const [x, y] = rectPt(i / 24, 100, 100); const lit = (i + Math.floor(f / 2)) % 24 < 5; return <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 11, height: 11, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: lit ? "#FFE9B0" : "#D9A93A", boxShadow: lit ? "0 0 10px #FFE9B0" : "none" }} />; })}
                  <div style={{ fontFamily: TITLE, fontWeight: 900, fontSize: 92, color: CLAYD, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 5px 0 rgba(150,60,30,0.25)" }}>CHEATS</div>
                </div>
              </div>
              {/* 5-code recap chips */}
              {CODES.map((cd, i) => { const sc = over(f, fr(OUTRO_ON + 0.5 + i * 0.1), fr(0.4)); const w = 176; const x = 506 + (i - 2) * (w + 4); return sc < 0.02 ? null : (
                <div key={i} style={{ position: "absolute", left: x - w / 2, top: 214, width: w, transform: `translateY(${(1 - sc) * 24}px) scale(${sc})`, opacity: Math.min(1, sc * 1.4), zIndex: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{ transform: `translateY(${Math.sin(f / 11 + i) * 4}px)` }}><Gem s={44} c={cd.c} /></div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 6px", borderRadius: 999, background: "#fff", border: `2px solid ${cd.c}`, boxShadow: "0 8px 18px -8px rgba(60,40,20,0.4)", whiteSpace: "nowrap" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: cd.c, color: "#fff", fontFamily: TITLE, fontWeight: 900, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: INK }}>{cd.key}</span>
                  </div>
                </div>); })}
              {/* Saiyan hero returns */}
              <div style={{ position: "absolute", left: 506, top: 396, width: 8, transform: "translateX(-50%)", zIndex: 6 }}><div style={{ position: "absolute", left: -120, top: 0, width: 240 }}><Aura f={f} s={240} c={GOLD} /><CMascot lf={f} size={240} tint={lerpHex("#D97757", "#FFD400", 0.8)} cheer={0.8 + Math.max(0, Math.sin(f / 6)) * 0.2} gaze={2} /><div style={{ position: "absolute", left: 56, top: 6, width: 130, height: 60 }}>{[...Array(5)].map((_, i) => <div key={i} style={{ position: "absolute", left: i * 25, bottom: 0, width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: `${42 + (i % 2) * 16}px solid #FFD400`, transform: `rotate(${(i - 2) * 9}deg)`, filter: "drop-shadow(0 0 5px #FFD400)" }} />)}</div></div></div>
              <Sparkles lf={f} at={OUTRO_ON + 0.4} x={506} y={420} n={22} spread={420} colors={[GOLD, "#fff", "#B98AE0", GREEN]} dur={1.1} />
              {/* comment pill */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 634, display: "flex", justifyContent: "center", transform: `scale(${cta * breath})`, zIndex: 9 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "15px 32px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), border: "2.5px solid #F3B292", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff", boxShadow: "0 0 34px rgba(233,130,92,0.6)" }}>comment <span style={{ color: "#FFE9B0" }}>CHEATS</span> for the codes</span>
              </div>
              {/* cheering mini-crowd */}
              {[150, 300, 712, 862].map((x, i) => <div key={i} style={{ position: "absolute", left: x - 46, bottom: 34, width: 92, zIndex: 4 }}><CMascot lf={f + i * 5} size={92} cheer={1} nodAmp={3.8} nodSpeed={7 + i} gaze={x < 506 ? 4 : -4} /></div>)}
              <Confetti lf={f} n={50} colors={[CLAY, GOLD, "#B98AE0", GREEN, "#FCEDDD"]} top={-30} h={860} />
            </div>
          );
        })()}

      </div>
      {!inOutro && <><div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(220,235,255,0.08), inset 0 0 150px rgba(0,0,0,0.5)", pointerEvents: "none", borderRadius: 36 }} /><Vignette strength={0.42} /></>}
      <div style={{ position: "absolute", left: 26, top: 20, display: "flex", gap: 9, zIndex: 30 }}>{["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
    </div>
  );
};

// ============================== studio bg ==============================
const StudioBg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {/* cyclorama wall */}
      <AbsoluteFill style={{ background: "linear-gradient(178deg, #F7F0E4 0%, #F3EAD9 44%, #F1E4D0 72%, #EADAC2 100%)" }} />
      {/* soft top key light */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 720, background: "radial-gradient(ellipse 72% 62% at 50% 0%, rgba(255,251,244,0.7), transparent 72%)" }} />
      {/* warm floor curve */}
      <div style={{ position: "absolute", left: -120, right: -120, bottom: 0, height: 560, borderRadius: "50% 50% 0 0 / 20% 20% 0 0", background: "linear-gradient(180deg, rgba(228,206,176,0.0), rgba(220,194,158,0.6))" }} />
      {/* faint color haze */}
      {[{ c: CLAY, x: 120, y: 200 }, { c: GREEN, x: 970, y: 260 }, { c: SKY, x: 150, y: 1670 }, { c: GOLD, x: 950, y: 1640 }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x - 300 + Math.sin(f / 50 + i) * 22, top: b.y - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${b.c}, transparent 62%)`, opacity: 0.1, filter: "blur(16px)" }} />
      ))}
      {/* premium drifting coins (3 depth tiers, specular + edge-spin) */}
      {Array.from({ length: 16 }).map((_, i) => { const tier = i % 3; const top = i % 2 === 0; const band = top ? [10, 336] : [1256, 1884]; const x = seed(i * 3.1) * 1004 + 26; const y = band[0] + ((seed(i * 1.7) * (band[1] - band[0]) + f * (0.2 + tier * 0.28)) % (band[1] - band[0])); const s = [24, 34, 46][tier]; const spin = Math.cos(f / (11 - tier * 2) + i * 1.3); return <div key={i} style={{ position: "absolute", left: x, top: y, opacity: [0.3, 0.45, 0.6][tier], filter: tier === 0 ? "blur(1.4px)" : "none" }}><CoinFace s={s} spin={spin} /></div>; })}
      {/* center relight */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 42% at 50% 40%, rgba(255,251,244,0.5), transparent 72%)" }} />
      {/* contact shadow grounding the panel */}
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
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -14}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "16px 30px", borderRadius: 999, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 18px 44px -12px rgba(20,26,45,0.4)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: INK }}>3 Claude skills you can <span style={{ color: CLAY }}>sell for $5,000</span></span>
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

// ============================== progress bar ==============================
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const VIRT = CUT; const p = Math.min(1, t / VIRT);
  const marks = [L[1], L[3], L[5]]; const STARS = [6, 18, 33]; const PELLETS = [2, 8, 15, 20, 27, 34, 37];
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
        <div style={{ position: "relative" }}><CMascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={Math.max(t >= L[5] ? 1 : 0, incPop * 0.75)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap" }}>{"★ " + score}</div>
      </div>
      {(() => { const wake = ramp(t, VIRT - 2.4, VIRT); const opened = t >= VIRT + 0.2; return (
        <div style={{ position: "absolute", right: 2, top: -22, width: 96, height: 96, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, filter: `grayscale(${0.6 - wake * 0.6})`, opacity: 0.6 + wake * 0.4, transform: `scale(${opened ? 1.1 : 0.84 + wake * 0.2})` }}>{opened ? "$" : "🎁"}</div>
          {opened && <div style={{ position: "absolute", left: 48, top: 48 }}><Sparkles lf={f} at={VIRT + 0.2} x={0} y={0} n={12} spread={92} colors={[GOLD, "#fff", CLAY]} dur={0.9} /></div>}
        </div>); })()}
    </div>
  );
};


// ============================== MAIN ==============================
export const ClaudeCheatsReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const on of codeOn) { const d = frame - fr(on); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.5); }
  const zoom = 1 + interpolate(frame, [0, fr(CUT)], [0, 0.015], { extrapolateRight: "clamp" }) + punch * 0.035;
  const ts = frame / FPS; let flash = 0;
  for (const on of codeOn) { const d = ts - on; if (d >= 0 && d < 0.13) flash = Math.max(flash, (1 - d / 0.13) * 0.42); }
  { const d = ts - (codeOn[4] + 1.3); if (d >= 0 && d < 0.22) flash = Math.max(flash, (1 - d / 0.22) * 0.9); }
  { const d = ts - (OUTRO_ON + 0.1); if (d >= 0 && d < 0.2) flash = Math.max(flash, (1 - d / 0.2) * 0.5); }
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_cheats.wav")} />
      <Audio loop src={staticFile("powers_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.5), fr(CUT) - 24, fr(CUT)], [0, 0.19, 0.19, 0], { extrapolateRight: "clamp" })} />
      {/* ===== SFX design (dense, keyed to every beat) ===== */}
      {/* HOOK — arcade: jingle + hit + Konami blips&moves + CHEAT power-up + orb launches */}
      <Sfx at={0.02} src="swooshup.wav" v={0.5} dur={0.5} />
      <Sfx at={0.05} src="lib_boom.wav" v={0.44} dur={0.7} />
      <Sfx at={0.34} src="c_coin.wav" v={0.34} dur={0.3} />
      <Sfx at={0.1} src="c_start.wav" v={0.5} dur={0.6} />
      <Sfx at={0.1} src="sub.wav" v={0.3} dur={2.0} />
      <Sfx at={1.55} src="c_hit.wav" v={0.44} dur={0.4} />
      <Sfx at={2.20} src="blip1.wav" v={0.42} dur={0.2} />
      <Sfx at={2.52} src="blip2.wav" v={0.42} dur={0.2} />
      <Sfx at={2.84} src="blip3.wav" v={0.42} dur={0.2} />
      <Sfx at={3.16} src="blip4.wav" v={0.42} dur={0.2} />
      <Sfx at={3.48} src="blip5.wav" v={0.42} dur={0.2} />
      <Sfx at={3.80} src="blip1.wav" v={0.42} dur={0.2} />
      <Sfx at={4.12} src="blip2.wav" v={0.42} dur={0.2} />
      <Sfx at={4.44} src="blip3.wav" v={0.42} dur={0.2} />
      <Sfx at={4.76} src="blip4.wav" v={0.42} dur={0.2} />
      <Sfx at={5.08} src="blip5.wav" v={0.42} dur={0.2} />
      <Sfx at={2.22} src="c_jump.wav" v={0.34} dur={0.3} />
      <Sfx at={2.54} src="c_jump.wav" v={0.34} dur={0.3} />
      <Sfx at={2.86} src="c_bump.wav" v={0.34} dur={0.3} />
      <Sfx at={3.18} src="c_bump.wav" v={0.34} dur={0.3} />
      <Sfx at={3.50} src="c_warp.wav" v={0.34} dur={0.3} />
      <Sfx at={3.82} src="c_warp.wav" v={0.34} dur={0.3} />
      <Sfx at={4.14} src="c_warp.wav" v={0.34} dur={0.3} />
      <Sfx at={4.46} src="c_warp.wav" v={0.34} dur={0.3} />
      <Sfx at={4.78} src="c_stomp2.wav" v={0.34} dur={0.3} />
      <Sfx at={5.10} src="c_stomp2.wav" v={0.34} dur={0.3} />
      <Sfx at={5.5} src="lib_riser.wav" v={0.42} dur={0.7} />
      <Sfx at={5.62} src="c_power.wav" v={0.5} dur={0.6} />
      <Sfx at={5.7} src="c_fanfare.wav" v={0.42} dur={1.4} />
      <Sfx at={5.8} src="c_powerbig.wav" v={0.5} dur={0.9} />
      <Sfx at={5.85} src="lib_boom.wav" v={0.4} dur={0.8} />
      <Sfx at={5.9} src="c_explode.wav" v={0.34} dur={0.6} />
      <Sfx at={6.05} src="c_1up.wav" v={0.46} dur={0.8} />
      {[0, 1, 2, 3, 4].map((i) => <Sfx key={`oa${i}`} at={6.0 + i * 0.12} src="swooshup.wav" v={0.32} dur={0.4} />)}
      {[0, 1, 2, 3].map((i) => <React.Fragment key={`ab${i}`}><Sfx at={6.9 + i * 0.34} src="c_grow.wav" v={0.48} dur={0.5} /><Sfx at={6.94 + i * 0.34} src={["blip2.wav", "blip3.wav", "blip4.wav", "blip5.wav"][i]} v={0.46} dur={0.25} /><Sfx at={6.97 + i * 0.34} src="c_coin.wav" v={0.36} dur={0.3} /></React.Fragment>)}
      <Sfx at={8.22} src="c_powerbig.wav" v={0.5} dur={0.9} />
      <Sfx at={8.26} src="c_1up.wav" v={0.46} dur={0.7} />
      <Sfx at={8.9} src="screech.wav" v={0.22} dur={0.5} />
      <Sfx at={8.95} src="c_unlock.wav" v={0.44} dur={0.6} />
      {/* per code: whoosh-in + reveal */}
      {codeOn.map((on, i) => <React.Fragment key={`cx${i}`}>
        <Sfx at={on - 0.06} src={i === 1 || i === 4 ? "lib_whoosh_fast.wav" : "lib_whoosh.wav"} v={0.42} dur={0.6} />
        <Sfx at={on + 0.02} src="impact.wav" v={0.4} dur={0.5} />
        <Sfx at={on + 0.5} src="lib_magic_reveal.wav" v={0.34} dur={0.9} />
        <Sfx at={on + 0.55} src="chimehi.wav" v={0.3} dur={0.6} />
      </React.Fragment>)}
      {/* ORACLE Matrix: data + pill bloom */}
      <Sfx at={codeOn[0] + 0.3} src="data.wav" v={0.4} dur={1.2} />
      <Sfx at={codeOn[0] + 1.5} src="lib_pop.wav" v={0.44} dur={0.4} />
      <Sfx at={codeOn[0] + 1.55} src="shimmer.wav" v={0.34} dur={0.7} />
      {/* PROPHET Strange: portal whoosh + magic + rewind shimmer */}
      <Sfx at={codeOn[1] + 0.4} src="swooshup.wav" v={0.36} dur={0.6} />
      <Sfx at={codeOn[1] + 0.5} src="magic-reveal.mp3" v={0.4} dur={0.9} />
      <Sfx at={codeOn[1] + 1.2} src="shimmer.wav" v={0.36} dur={1.0} />
      {/* GHOST M:I: fuse ticks + grab + alarm */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Sfx key={`tk${i}`} at={codeOn[2] + 0.2 + i * 0.5} src="tick.wav" v={0.3} dur={0.2} />)}
      <Sfx at={codeOn[2] + 1.1} src="lib_pop.wav" v={0.42} dur={0.3} />
      <Sfx at={codeOn[2] + 1.15} src="alarm.wav" v={0.24} dur={0.7} />
      {/* SNIPER Bond: barrel + gunshot + boom */}
      <Sfx at={codeOn[3] + 0.1} src="swish.wav" v={0.36} dur={0.5} />
      <Sfx at={codeOn[3] + 1.33} src="snap.wav" v={0.5} dur={0.3} />
      <Sfx at={codeOn[3] + 1.36} src="slash.wav" v={0.42} dur={0.3} />
      <Sfx at={codeOn[3] + 1.5} src="boom.wav" v={0.36} dur={0.6} />
      {/* GODMODE Saiyan: riser + crackle + kamehameha */}
      <Sfx at={codeOn[4] + 0.3} src="lib_riser.wav" v={0.44} dur={1.1} />
      <Sfx at={codeOn[4] + 0.5} src="crash.wav" v={0.3} dur={0.5} />
      <Sfx at={codeOn[4] + 0.9} src="sparkle.wav" v={0.3} dur={0.8} />
      <Sfx at={codeOn[4] + 1.3} src="cinematic-hit.mp3" v={0.5} dur={0.8} />
      <Sfx at={codeOn[4] + 1.55} src="lib_boom.wav" v={0.48} dur={1.0} />
      <Sfx at={codeOn[4] + 1.7} src="shimmer.wav" v={0.4} dur={1.2} />
      {/* action SFX: ORACLE */}
      <Sfx at={codeOn[0] + 0.55} src="whoosh.wav" v={0.4} dur={0.6} />
      <Sfx at={codeOn[0] + 1.2} src="c_power.wav" v={0.5} dur={0.5} />
      <Sfx at={codeOn[0] + 2.55} src="boom.wav" v={0.55} dur={0.7} />
      <Sfx at={codeOn[0] + 1.95} src="shimmer.wav" v={0.4} dur={0.8} />
      <Sfx at={codeOn[0] + 3.5} src="c_warp.wav" v={0.45} dur={0.6} />
      <Sfx at={codeOn[0] + 2.85} src="c_hit.wav" v={0.35} dur={0.4} />
      {/* action SFX: PROPHET */}
      <Sfx at={codeOn[1] + 0.5} src="c_power.wav" v={0.5} dur={0.7} />
      <Sfx at={codeOn[1] + 0.6} src="shimmer.wav" v={0.35} dur={0.9} />
      <Sfx at={codeOn[1] + 0.95} src="whoosh.wav" v={0.4} dur={0.5} />
      <Sfx at={codeOn[1] + 1.7} src="c_warp.wav" v={0.4} dur={0.6} />
      <Sfx at={codeOn[1] + 3.05} src="c_break.wav" v={0.55} dur={0.5} />
      <Sfx at={codeOn[1] + 3.1} src="c_hit.wav" v={0.45} dur={0.4} />
      {/* action SFX: GHOST */}
      <Sfx at={codeOn[2] + 0.4} src="data.wav" v={0.3} dur={1.0} />
      <Sfx at={codeOn[2] + 1.12} src="snap.wav" v={0.42} dur={0.3} />
      <Sfx at={codeOn[2] + 1.2} src="c_coin.wav" v={0.34} dur={0.4} />
      <Sfx at={codeOn[2] + 1.55} src="shimmer.wav" v={0.32} dur={1.5} />
      <Sfx at={codeOn[2] + 2.05} src="magic-reveal.mp3" v={0.4} dur={0.9} />
      <Sfx at={codeOn[2] + 2.75} src="whoosh.wav" v={0.38} dur={0.6} />
      <Sfx at={codeOn[2] + 3.55} src="sparkle.wav" v={0.36} dur={0.5} />
      {/* action SFX: SNIPER */}
      <Sfx at={codeOn[3] + 0.7} src="swish.wav" v={0.4} dur={0.5} />
      <Sfx at={codeOn[3] + 1.05} src="c_hit.wav" v={0.5} dur={0.35} />
      <Sfx at={codeOn[3] + 1.55} src="slash.wav" v={0.45} dur={0.35} />
      <Sfx at={codeOn[3] + 2.45} src="c_hit.wav" v={0.5} dur={0.35} />
      <Sfx at={codeOn[3] + 2.95} src="impact.wav" v={0.5} dur={0.4} />
      <Sfx at={codeOn[3] + 3.3} src="snap.wav" v={0.5} dur={0.3} />
      <Sfx at={codeOn[3] + 3.35} src="c_powerbig.wav" v={0.5} dur={0.7} />
      <Sfx at={codeOn[3] + 3.5} src="shimmer.wav" v={0.35} dur={0.6} />
      {/* action SFX: GODMODE */}
      <Sfx at={codeOn[4]+0.5} src="c_power.wav" v={0.4} dur={1.4} />
      <Sfx at={codeOn[4]+1.0} src="whoosh.wav" v={0.35} dur={0.6} />
      <Sfx at={codeOn[4]+1.76} src="c_hit.wav" v={0.45} dur={0.4} />
      <Sfx at={codeOn[4]+2.05} src="c_powerbig.wav" v={0.5} dur={0.9} />
      <Sfx at={codeOn[4]+2.25} src="boom.wav" v={0.5} dur={0.8} />
      <Sfx at={codeOn[4]+3.0} src="lib_boom.wav" v={0.5} dur={1.2} />
      {/* CTA */}
      <Sfx at={OUTRO_ON + 0.1} src="lib_boom.wav" v={0.5} dur={1.0} />
      <Sfx at={OUTRO_ON + 0.3} src="crowd_cheer.wav" v={0.3} dur={2.0} />
      <Sfx at={OUTRO_ON + 0.4} src="sparkle.wav" v={0.4} dur={0.9} />
      {[0, 1, 2, 3, 4].map((i) => <Sfx key={`rc${i}`} at={OUTRO_ON + 0.5 + i * 0.1} src="chimehi.wav" v={0.26} dur={0.4} />)}
      <Sfx at={OUTRO_ON + 1.5} src="resolve.wav" v={0.42} dur={1.6} />
      <Sfx at={OUTRO_ON + 1.6} src="angelic.wav" v={0.3} dur={1.6} />
      <StudioBg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
        <ArmoredStage f={frame} />
      </AbsoluteFill>
      <Captions />
      <ProgressBar />
      <AbsoluteFill style={{ pointerEvents: "none", zIndex: 250, background: "radial-gradient(ellipse 72% 64% at 50% 44%, transparent 42%, rgba(40,30,18,0.42) 100%)" }} />
      <AbsoluteFill style={{ pointerEvents: "none", zIndex: 251 }}><Grain op={0.05} /></AbsoluteFill>
      {flash > 0.01 && <AbsoluteFill style={{ background: "#fff", opacity: flash, zIndex: 305, pointerEvents: "none" }} />}
      {(() => { const d = frame; return d >= 0 && d < 4 ? <AbsoluteFill style={{ background: "#fff", opacity: Math.pow(1 - d / 4, 2) * 0.85, zIndex: 300, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
