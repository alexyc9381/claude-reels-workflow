import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_clone.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, audit, rehook, skills, handoff, clock+cta
const L = [0, 8.47, 16.83, 21.07, 28.59, 35.35];
const Lf = L.map(fr);
const CLOCK_START = 35.15;      // snack clock begins (5s)
const BURST = CLOCK_START + 5; // 40.6 — clock hits zero, CTA slams, bar gift-slam syncs

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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0 }) => {
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

// ---------------- HOOK: blastoff -> explosion -> brain rain ----------------
const CROWD: [number, number, number, number, number][] = [
  [-1, 60, 652, 92, 0.10], [1, 916, 660, 86, 0.22], [-1, 178, 712, 116, 0.34], [1, 800, 716, 106, 0.46],
  [-1, 320, 736, 88, 0.62], [1, 664, 740, 98, 0.72], [-1, 104, 600, 72, 0.86], [1, 942, 606, 74, 0.96],
  [-1, 428, 752, 110, 1.10], [1, 566, 756, 94, 1.22], [-1, 250, 612, 66, 1.36], [1, 770, 620, 70, 1.50],
];
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const t = lf / FPS;
  const secs = 23 * 3600 + 59 * 60 + 47 - Math.floor(t);
  const hh = Math.floor(secs / 3600), mm = Math.floor((secs % 3600) / 60), ss = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const igniteAt = fr(3.11);                        // "pay-per-token": ignition
  const ignite = lf >= igniteAt;
  const igniteP = over(lf, igniteAt, fr(0.35));
  const rise = Math.pow(over(lf, fr(3.50), fr(1.5)), 1.4) * 330;   // shoots up early
  const exploAt = fr(5.05);                          // "clone its brain": BOOM
  const exploded = lf >= exploAt;
  const exploP = over(lf, exploAt, fr(0.5));
  const flash = exploded ? Math.max(0, 1 - (lf - exploAt) / 7) : 0;
  const shakeE = ignite && !exploded ? Math.min(1, (lf - igniteAt) / 10) * 0.8 : (exploded ? Math.max(0, 1 - (lf - exploAt) / 14) : 0);
  const shake = Math.sin(lf * 3.7) * 9 * shakeE;
  const paySlam = over(lf, igniteAt, fr(0.3), Easing.out(Easing.back(2)));
  const shock = ignite ? Math.min(1, (lf - igniteAt) / 8) * 0.85 : 0;
  const flick = (n: number) => 0.75 + seed(Math.floor(lf / 2) * 3 + n) * 0.5;
  const EX = 540, EY = 96;                          // explosion point
  return (
    <Panel label="fable 5 · launch site">
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
        {/* stars */}
        {Array.from({ length: 16 }, (_, i) => <div key={i} style={{ position: "absolute", left: seed(i * 7) * 1000, top: 40 + seed(i * 3) * 320, width: 3 + seed(i) * 3, height: 3 + seed(i) * 3, borderRadius: "50%", background: "#EAF0FA", opacity: 0.25 + seed(i * 5) * 0.5 }} />)}
        {/* T-minus billboard */}
        <div style={{ position: "absolute", left: 40, top: 64, padding: "10px 18px", borderRadius: 12, background: "rgba(20,30,52,0.88)", border: "2px solid rgba(150,175,220,0.4)", boxShadow: "0 10px 24px -10px rgba(0,0,0,0.6)", zIndex: 40 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: "rgba(190,205,235,0.65)", letterSpacing: "0.08em" }}>FREE FABLE 5 ENDS IN</div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 44, color: "#FFD9CB", textShadow: `0 0 ${14 + Math.max(0, 1 - (lf % FPS) / 7) * 12}px rgba(210,114,78,0.65)` }}>{pad(hh)}:{pad(mm)}:{pad(ss)}</div>
        </div>
        {/* ground + pad + gantry */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 664, height: 128, background: "linear-gradient(180deg, #16202F, #101827)" }} />
        <div style={{ position: "absolute", left: 396, top: 636, width: 270, height: 30, borderRadius: 8, background: "#2A3A55", border: "2px solid rgba(150,175,220,0.35)" }} />
        <div style={{ position: "absolute", left: 664, top: 290, width: 26, height: 350, background: "repeating-linear-gradient(180deg, #33455F 0 18px, #26344B 18px 36px)", opacity: 0.9 }} />

        {/* THE ROCKET (gone after the explosion) */}
        {!exploded && (
          <div style={{ position: "absolute", left: 440, top: 196 - rise, width: 180, zIndex: 10 }}>
            {/* wizard hat nose cone */}
            <div style={{ position: "relative", width: 140, margin: "0 auto", height: 66 }}>
              <div style={{ position: "absolute", left: 26, bottom: 10, width: 0, height: 0, borderLeft: "44px solid transparent", borderRight: "44px solid transparent", borderBottom: "58px solid #4B3E8E" }} />
              <div style={{ position: "absolute", left: 8, bottom: 0, width: 124, height: 13, background: "#3A2F73", borderRadius: 4 }} />
              <div style={{ position: "absolute", left: 64, bottom: 44, width: 11, height: 11, background: "#E7B24C" }} />
              <div style={{ position: "absolute", left: 50, bottom: 26, width: 8, height: 8, background: "#E7B24C" }} />
              <div style={{ position: "absolute", left: 80, bottom: 22, width: 8, height: 8, background: "#E7B24C" }} />
            </div>
            <div style={{ position: "relative", width: 100, margin: "0 auto", height: 250, background: "linear-gradient(90deg, #FBF6EC, #E8DFCE)", border: "3px solid #C9BCA4", borderTop: "none" }}>
              {/* clay face band + wise eyes + white beard */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 66, background: "#D97757" }} />
              <div style={{ position: "absolute", left: 20, top: 18, width: 13, height: 26, background: "#151312" }} />
              <div style={{ position: "absolute", left: 62, top: 18, width: 13, height: 26, background: "#151312" }} />
              <div style={{ position: "absolute", left: 12, top: 12, width: 26, height: 6, background: "#F4EEE2" }} />
              <div style={{ position: "absolute", left: 56, top: 12, width: 26, height: 6, background: "#F4EEE2" }} />
              <div style={{ position: "absolute", left: 16, top: 52, width: 62, height: 26, background: "#F4EEE2" }} />
              <div style={{ position: "absolute", left: 26, top: 74, width: 42, height: 16, background: "#F4EEE2" }} />
              <div style={{ position: "absolute", left: 38, top: 88, width: 18, height: 12, background: "#F4EEE2" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 112, textAlign: "center" }}>
                <div style={{ display: "inline-block", padding: "6px 10px", background: grad("#E9825C", "#C7541F"), borderRadius: 8, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#fff", whiteSpace: "nowrap", boxShadow: "0 4px 10px rgba(199,84,31,0.4)" }}>FABLE 5</div>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, height: 20, background: CLAY, opacity: 0.9 }} />
              {paySlam > 0.01 && (
                <div style={{ position: "absolute", left: -80, top: 148, transform: `rotate(-12deg) scale(${interpolate(paySlam, [0, 1], [2.4, 1])})`, opacity: Math.min(1, paySlam * 1.4), padding: "6px 14px", borderRadius: 9, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, border: "2.5px solid #E58072", boxShadow: `0 0 18px ${RED}`, whiteSpace: "nowrap", zIndex: 12 }}>$ pay-per-token</div>
              )}
            </div>
            <div style={{ position: "absolute", left: 6, bottom: 16, width: 0, height: 0, borderTop: "54px solid transparent", borderRight: `36px solid ${CLAY}` }} />
            <div style={{ position: "absolute", right: 6, bottom: 16, width: 0, height: 0, borderTop: "54px solid transparent", borderLeft: `36px solid ${CLAY}` }} />
            <div style={{ width: 44, height: 16, margin: "0 auto", background: "#33455F", borderRadius: "0 0 8px 8px" }} />
            {ignite && (
              <div style={{ position: "relative", width: 100, margin: "0 auto" }}>
                <div style={{ position: "absolute", left: 14, top: 0, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `${58 * flick(1) * (0.4 + igniteP * 0.6)}px solid ${GOLD}`, filter: "blur(1px)" }} />
                <div style={{ position: "absolute", left: 27, top: 0, width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderTop: `${42 * flick(7) * (0.4 + igniteP * 0.6)}px solid ${CLAY}` }} />
                <div style={{ position: "absolute", left: 35, top: 0, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `${26 * flick(13)}px solid #fff`, opacity: 0.85 }} />
              </div>
            )}
          </div>
        )}
        {/* smoke + trail while flying */}
        {ignite && !exploded && rise < 300 && Array.from({ length: 9 }, (_, i) => { const pp = ((lf - igniteAt) / 42 + seed(i)) % 1; return <div key={i} style={{ position: "absolute", left: 420 + (seed(i * 3) - 0.5) * 300 + pp * 46 * (seed(i) - 0.5), top: 644 - pp * 64, width: 30 + pp * 54, height: 30 + pp * 54, borderRadius: "50%", background: "rgba(200,210,230,0.15)", filter: "blur(4px)", opacity: Math.max(0, 0.85 - pp) }} />; })}
        {!exploded && rise > 50 && <div style={{ position: "absolute", left: 512, top: Math.max(140, 690 - rise), width: 46, height: Math.min(460, rise * 0.9), background: "linear-gradient(180deg, rgba(231,178,76,0.75), transparent)", filter: "blur(6px)", borderRadius: 24, zIndex: 9 }} />}

        {/* THE EXPLOSION */}
        {exploded && exploP < 1 && (<>
          <div style={{ position: "absolute", left: EX, top: EY, width: 30, height: 30, marginLeft: -15, marginTop: -15, borderRadius: "50%", background: "#FFF3D6", transform: `scale(${1 + exploP * 16})`, opacity: Math.max(0, 1 - exploP * 1.4), zIndex: 34, filter: "blur(2px)" }} />
          <div style={{ position: "absolute", left: EX, top: EY, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: `6px solid ${GOLD}`, transform: `scale(${1 + exploP * 24})`, opacity: Math.max(0, 1 - exploP * 1.2), zIndex: 34 }} />
        </>)}
        {exploded && <><Firework lf={lf} at={exploAt + 1} x={EX} y={EY} hue={1} /><Firework lf={lf} at={exploAt + 4} x={EX - 90} y={EY + 50} hue={3} /><Firework lf={lf} at={exploAt + 7} x={EX + 90} y={EY + 40} hue={5} /></>}

        {/* BRAIN RAIN: a brain arcs down to every critter */}
        {CROWD.map(([side, tx, ty, sz, st], i) => {
          const bAt = exploAt + fr(0.12) + i * 2;
          const fly = over(lf, bAt, fr(0.85), Easing.inOut(Easing.cubic));
          if (lf < bAt || fly >= 0.999) return null;
          const hx = tx + sz * 0.5, hy = ty - sz + sz * 0.08;
          const x = EX + (hx - EX) * fly;
          const y = EY + (hy - EY) * fly - Math.sin(fly * Math.PI) * 130;
          return <div key={`br${i}`} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${fly * 260}deg)`, fontSize: 15 + sz * 0.16, zIndex: 36, filter: "drop-shadow(0 0 8px rgba(232,162,184,0.9))" }}>🧠</div>;
        })}

        {/* the moon rises center-sky for "one evening": beams, twinkles, two minis */}
        {(() => { const moonIn = over(lf, fr(7.0), fr(0.5), Easing.out(Easing.back(1.4))); if (moonIn <= 0.01) return null; const glowP = 1 + Math.sin(lf / 7) * 0.12; return (
          <div style={{ position: "absolute", left: 506, top: 210, transform: `translate(-50%,-50%) scale(${moonIn})`, opacity: moonIn, zIndex: 32 }}>
            {/* rotating light beams */}
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 560, height: 560, marginLeft: -280, marginTop: -280, background: `conic-gradient(from ${lf * 0.8}deg, rgba(240,217,168,0.28) 0deg 14deg, transparent 14deg 45deg, rgba(240,217,168,0.22) 45deg 59deg, transparent 59deg 90deg, rgba(240,217,168,0.28) 90deg 104deg, transparent 104deg 135deg, rgba(240,217,168,0.22) 135deg 149deg, transparent 149deg 180deg, rgba(240,217,168,0.28) 180deg 194deg, transparent 194deg 225deg, rgba(240,217,168,0.22) 225deg 239deg, transparent 239deg 270deg, rgba(240,217,168,0.28) 270deg 284deg, transparent 284deg 315deg, rgba(240,217,168,0.22) 315deg 329deg, transparent 329deg 360deg)`, WebkitMask: "radial-gradient(circle, #000 18%, transparent 68%)", mask: "radial-gradient(circle, #000 18%, transparent 68%)", opacity: 0.9 }} />
            {/* halo pulse */}
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 260, height: 260, marginLeft: -130, marginTop: -130, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,222,0.35), transparent 68%)", transform: `scale(${glowP})` }} />
            {/* the Claude-faced moon */}
            <div style={{ position: "relative", width: 170, height: 170, marginLeft: -85, marginTop: -85, left: "50%", top: "50%", borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FFF6DE, #EFD9A8)", boxShadow: `0 0 ${44 * glowP}px rgba(240,217,168,0.65)` }}>
              <div style={{ position: "absolute", left: 28, top: 100, width: 22, height: 22, borderRadius: "50%", background: "rgba(201,176,120,0.5)" }} />
              <div style={{ position: "absolute", left: 118, top: 114, width: 15, height: 15, borderRadius: "50%", background: "rgba(201,176,120,0.5)" }} />
              <div style={{ position: "absolute", left: 48, top: 56, width: 15, height: 27, background: "#151312" }} />
              <div style={{ position: "absolute", left: 104, top: 56, width: 15, height: 27, background: "#151312" }} />
              <div style={{ position: "absolute", left: 68, top: 104, width: 32, height: 7, background: "#151312", borderRadius: 3 }} />
            </div>
            {/* twinkles orbiting the glow */}
            {Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2 + lf * 0.02; const d = 128 + seed(k) * 40; const tw = 0.4 + Math.max(0, Math.sin(lf / 5 + k * 2)) * 0.6; return <div key={k} style={{ position: "absolute", left: Math.cos(a) * d - 4, top: Math.sin(a) * d - 4, width: 8, height: 8, background: "#FFF3D6", opacity: tw, transform: `rotate(45deg) scale(${tw})`, boxShadow: "0 0 8px #FFF3D6" }} />; })}
            {/* two minis sitting on the moon */}
            <div style={{ position: "absolute", left: -80, top: -116 }}><Mascot lf={lf} size={54} nodAmp={2} nodSpeed={7} gaze={4} /></div>
            <div style={{ position: "absolute", left: 18, top: -122 }}><Mascot lf={lf + 7} size={60} nodAmp={2.4} nodSpeed={8} gaze={-4} /></div>
          </div>); })()}
        {/* THE CROWD: runs in, watches, gets brains + glasses */}
        {CROWD.map(([side, tx, ty, sz, st], i) => {
          const run = over(lf, fr(st), fr(1.05), Easing.out(Easing.cubic));
          const sx = side < 0 ? -170 : 1170;
          const x = sx + (tx - sx) * run;
          const running = run < 0.99;
          const bAt = exploAt + fr(0.12) + i * 2;
          const gotBrain = lf >= bAt + fr(0.85);
          const justGot = gotBrain ? Math.max(0, 1 - (lf - (bAt + fr(0.85))) / 10) : 0;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: ty - sz, zIndex: ty > 660 ? 30 : 8 }}>
              <Mascot lf={lf + i * 5} size={sz} gaze={x < 520 ? 6 : -6} nodAmp={running ? 5.5 : 2.6} nodSpeed={running ? 4 : 8 + (i % 3)} shock={gotBrain ? 0 : shock * (0.6 + seed(i) * 0.4)} cheer={gotBrain ? Math.min(1, (lf - (bAt + fr(0.85))) / 8) * (0.65 + seed(i * 2) * 0.35) : 0} brainHat={gotBrain ? 1 : 0} glasses={gotBrain ? 1 : 0} />
              {justGot > 0.05 && <div style={{ position: "absolute", left: "50%", top: -6, width: 10, height: 10, marginLeft: -5, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + (1 - justGot) * 6})`, opacity: justGot }} />}
            </div>);
        })}
      </div>
      {/* explosion flash */}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 16%, rgba(255,240,205,0.75), transparent 62%)", opacity: flash, zIndex: 50 }} />}
    </Panel>
  );
};

// ---------------- AUDIT: Sherlock opens the folders, long gated prompt, visual findings ----------------
const LONG_PROMPT = [
  "Study this folder end to end. Build a map of how I",
  "actually work: clients, formats, cadence, tools.",
  "List every task I repeat every week, ranked by hours",
  "spent, with the files that prove it.",
  "For each task: the trigger, the steps I follow, the",
  "output format, and who it goes to.",
  "Then list the prompts, templates and files you would",
  "need to automate each one at my quality bar.",
  "Flag anything you are unsure about instead of",
  "guessing, and ask me up to five questions first.",
];
const TREE = ["~/work", "├ clients/", "├ invoices/", "├ content/", "└ projects/"];
const FINDS: [string, string, string][] = [["📊", "report", "3h/wk"], ["✉️", "emails", "2h/wk"], ["🧾", "invoices", "1h/wk"]];
const Audit: React.FC<{ lf: number }> = ({ lf }) => {
  const walk = over(lf, 2, fr(1.0), Easing.out(Easing.cubic));       // sherlock walks in
  const shx = 1120 + (668 - 1120) * walk;
  const boxIn = over(lf, fr(3.4), fr(0.5), Easing.out(Easing.back(1.3)));
  const saveIn = over(lf, fr(4.6), 8, Easing.out(Easing.back(1.8)));
  const tapT = (i: number) => fr(1.05) + i * fr(0.32);               // folder taps
  const lean = Math.max(...TREE.map((_, i) => Math.max(0, 1 - Math.abs(lf - tapT(i)) / 5)));
  return (
    <Panel label="Claude Code · ~/work">
      {/* folder tree: rows open as Sherlock taps them */}
      <div style={{ position: "absolute", left: 46, top: 88, fontFamily: mono, fontSize: 25, lineHeight: 1.75 }}>
        {TREE.map((ln, i) => {
          const ap = over(lf, tapT(i), 7, Easing.out(Easing.back(1.4)));
          const opened = i > 0 && lf >= tapT(i) + 5;
          return (
            <div key={i} style={{ color: i === 0 ? "#8FE0B0" : "rgba(180,200,235,0.8)", opacity: ap, transform: `translateX(${(1 - ap) * 24}px)` }}>
              {i === 0 ? ln : (opened ? ln.replace("/", "") : ln)}{i > 0 && <span style={{ marginLeft: 8 }}>{opened ? "📂" : "📁"}</span>}
            </div>);
        })}
      </div>
      {/* Sherlock walks in and inspects */}
      <div style={{ position: "absolute", left: shx, top: 96 + lean * 10, zIndex: 20 }}>
        <Mascot lf={lf} size={175} gaze={-8} nodAmp={walk < 0.99 ? 5 : 2.2 + lean * 2} nodSpeed={walk < 0.99 ? 4 : 8} sherlock={1} cheer={lean * 0.5} />
        <div style={{ position: "absolute", left: -50, top: 40, fontSize: 48, transform: `translateY(${Math.sin(lf / 6) * 9 + lean * 8}px) rotate(-16deg)` }}>🔍</div>
      </div>
      {/* the LONG audit prompt: real but not skimmable, bottom half blurred */}
      {boxIn > 0.01 && (
        <div style={{ position: "absolute", left: 46, right: 46, top: 300, transform: `translateY(${(1 - boxIn) * 28}px) scale(${0.94 + boxIn * 0.06})`, opacity: boxIn }}>
          <div style={{ position: "relative", borderRadius: 18, background: "#141B28", border: `2.5px solid ${CLAY}`, padding: "18px 24px 14px", boxShadow: `0 0 34px rgba(210,114,78,0.35), 0 24px 46px -16px rgba(0,0,0,0.6)` }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "#F0A981", letterSpacing: "0.06em", marginBottom: 8 }}>GIVE IT THIS PROMPT</div>
            {LONG_PROMPT.map((ln, i) => (
              <div key={i} style={{ fontFamily: mono, fontSize: 20, lineHeight: 1.5, color: "#EAF0FA", opacity: (over(lf, fr(3.5) + i * 2, 6)) * (i < 4 ? 1 : Math.max(0.4, 1 - (i - 3) * 0.1)), filter: i >= 4 ? `blur(${Math.min(7, (i - 3) * 1.5)}px)` : "none" }}>{ln}</div>
            ))}
            <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
              <span style={{ padding: "6px 16px", borderRadius: 999, background: "rgba(207,149,68,0.16)", border: `1.5px solid ${AMBER}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#F0D08A" }}>full prompt in the guide ↓</span>
            </div>
            {saveIn > 0.01 && <div style={{ position: "absolute", right: -12, top: -18, transform: `rotate(6deg) scale(${saveIn})`, padding: "6px 16px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#3a2a05", boxShadow: `0 0 16px ${GOLD}` }}>🔖 save this</div>}
          </div>
        </div>
      )}
      {/* findings: VISUAL cards, not text rows */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 656, display: "flex", justifyContent: "center", gap: 26 }}>
        {FINDS.map(([ico, label, hrs], i) => {
          const ap = over(lf, fr(4.7) + i * fr(0.5), 9, Easing.out(Easing.back(1.7)));
          if (ap <= 0.01) return null;
          return (
            <div key={i} style={{ position: "relative", transform: `scale(${ap})`, opacity: ap, width: 168, borderRadius: 16, background: "rgba(35,50,80,0.7)", border: "1.5px solid rgba(150,175,220,0.35)", padding: "12px 0 10px", textAlign: "center", boxShadow: "0 14px 28px -12px rgba(0,0,0,0.6)" }}>
              <div style={{ fontSize: 48, lineHeight: 1 }}>{ico}</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: "rgba(220,232,250,0.85)", marginTop: 4 }}>🔁 {label}</div>
              <div style={{ position: "absolute", right: -10, top: -12, padding: "4px 10px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: "#3a2a05" }}>{hrs}</div>
            </div>);
        })}
      </div>
    </Panel>
  );
};

// ---------------- REHOOK: spotlight drama + word slams + the audit gets tossed ----------------
const Rehook: React.FC<{ lf: number }> = ({ lf }) => {
  const spin = over(lf, 2, fr(0.7), Easing.out(Easing.cubic)) * 360;
  const leanIn = 1 + over(lf, 2, fr(0.6)) * 0.14;
  const w1 = over(lf, fr(0.55), 7, Easing.out(Easing.back(2.2)));   // everyone
  const w2 = over(lf, fr(0.92), 7, Easing.out(Easing.back(2.4)));   // MISSES
  const w3 = over(lf, fr(1.28), 7, Easing.out(Easing.back(2.2)));   // this part
  const slamK = Math.max(0, 1 - Math.abs(lf - fr(0.92)) / 5) + Math.max(0, 1 - Math.abs(lf - fr(1.28)) / 5);
  const tossAt = fr(1.8);                                           // "the audit is not the point"
  const toss = over(lf, tossAt, fr(0.9), Easing.in(Easing.cubic));
  const cardIn = over(lf, tossAt - 8, 8, Easing.out(Easing.back(1.6)));
  const tease = over(lf, fr(3.0), fr(0.4), Easing.out(Easing.back(1.8)));
  const pulse = 1 + Math.sin(lf / 3.2) * 0.04;
  const redPulse = Math.max(0, Math.sin(lf / 4)) * Math.max(0, 1 - lf / fr(1.6)) * 0.5;
  return (
    <Panel label="wait" tint="rgba(196,74,58,0.45)">
      {/* red alert edge pulse */}
      <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 ${60 + redPulse * 80}px rgba(196,74,58,${0.25 + redPulse * 0.4})`, zIndex: 2 }} />
      {/* spotlight cone */}
      <div style={{ position: "absolute", left: 296, top: 0, width: 420, height: 420, background: "linear-gradient(180deg, rgba(255,244,214,0.22), rgba(255,244,214,0.02))", clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)", zIndex: 3 }} />
      {/* mascot whips around, leans into camera */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 84, display: "flex", justifyContent: "center", transform: `scale(${leanIn}) translateX(${Math.sin(lf * 3.5) * 4 * slamK}px)`, transformOrigin: "50% 30%", zIndex: 5 }}>
        <div style={{ transform: `rotateY(${360 - spin}deg)` }}>
          <Mascot lf={lf} size={250} nodAmp={4.5} nodSpeed={6.5} gaze={0} />
        </div>
      </div>
      {/* word slams */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", zIndex: 6 }}>
        <span style={{ display: "inline-block", transform: `scale(${w1})`, opacity: w1, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, color: "#F4EEE2", letterSpacing: "-0.015em" }}>everyone&nbsp;</span>
        <span style={{ display: "inline-block", transform: `scale(${w2}) rotate(-3deg)`, opacity: w2, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, color: "#FF9C8A", letterSpacing: "-0.015em", textShadow: `0 0 30px ${RED}88` }}>MISSES&nbsp;</span>
        <span style={{ display: "inline-block", transform: `scale(${w3})`, opacity: w3, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, color: "#F4EEE2", letterSpacing: "-0.015em" }}>this part</span>
      </div>
      {/* the audit card gets tossed away */}
      {cardIn > 0.01 && toss < 0.98 && (
        <div style={{ position: "absolute", left: 320 + toss * 720, top: 560 - Math.sin(toss * Math.PI * 0.5) * 60 + toss * toss * 140, transform: `scale(${cardIn}) rotate(${toss * 190}deg)`, opacity: cardIn * (1 - toss * 0.5), zIndex: 6 }}>
        <div style={{ padding: "12px 22px", borderRadius: 14, background: PAPER, border: "2px solid #E2D8C6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: INK, boxShadow: "0 16px 32px -12px rgba(10,16,34,0.5)", whiteSpace: "nowrap" }}>the audit ✓</div>
        </div>
      )}
      {toss > 0.05 && toss < 0.9 && <div style={{ position: "absolute", left: 0, right: 0, top: 612, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "rgba(200,215,240,0.7)", zIndex: 6 }}>is <span style={{ color: "#FF9C8A" }}>not</span> the point</div>}
      {/* the gold tease */}
      {tease > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 646, display: "flex", justifyContent: "center", transform: `scale(${tease * pulse})`, opacity: tease, zIndex: 7 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 30px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 34px ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#3a2a05" }}>
            🤝 the handoff <span style={{ fontSize: 30 }}>→</span>
          </div>
        </div>
      )}
    </Panel>
  );
};

// ---------------- SKILLS: the wizard conjures + chucks the files into the folder ----------------
const SKILLS = ["weekly-report.md", "outreach-emails.md", "invoices.md"];
const INSTR = ["# How Alex works", "- stack, tone, clients, formats", "- the 3 weekly tasks + their skill files", "- what good output looks like"];
const Skills: React.FC<{ lf: number }> = ({ lf }) => {
  const instrAt = fr(4.14);
  const instrIn = over(lf, instrAt, fr(0.6), Easing.out(Easing.back(1.2)));
  const throwAt = (i: number) => fr(0.9) + i * fr(1.0);
  const throwP = Math.max(...SKILLS.map((_, i) => Math.max(0, 1 - Math.abs(lf - throwAt(i)) / 6)));
  return (
    <Panel label="~/work/skills">
      {/* folder */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 112, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 240, height: 170 }}>
          <div style={{ position: "absolute", left: 0, top: 22, width: 240, height: 148, borderRadius: 16, background: grad("#3A5C84", "#25314A"), border: "2px solid rgba(150,175,220,0.5)", boxShadow: "0 24px 46px -16px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 110, height: 34, borderRadius: "12px 12px 0 0", background: "#3A5C84", border: "2px solid rgba(150,175,220,0.5)", borderBottom: "none" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 74, textAlign: "center", fontFamily: mono, fontSize: 22, color: "#C3D2EC" }}>skills/</div>
        </div>
      </div>
      {/* THE WIZARD: conjures each file and chucks it in */}
      <div style={{ position: "absolute", left: 76, top: 470, zIndex: 22 }}>
        <Mascot lf={lf} size={215} wizard={1} glasses={1} gaze={7} nodAmp={2.4 + throwP * 3.5} nodSpeed={7} cheer={throwP} />
        {throwP > 0.25 && <div style={{ position: "absolute", right: -14, top: 30, fontSize: 42, transform: `rotate(${throwP * 30}deg)`, filter: "drop-shadow(0 0 10px rgba(231,178,76,0.8))" }}>✨</div>}
      </div>
      {/* files arc from the wizard's hands into the folder */}
      {SKILLS.map((name, i) => {
        const at = throwAt(i);
        const fly = over(lf, at, fr(0.75), Easing.inOut(Easing.cubic));
        if (fly <= 0.001) return null;
        const sx = 240, sy = 520;
        const ex = 540, ey = 208;
        const x = sx + (ex - sx) * fly, y = sy + (ey - sy) * fly - Math.sin(fly * Math.PI) * 180;
        const done = fly >= 0.999;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${fly * 340}deg) scale(${done ? 0 : 1})`, opacity: done ? 0 : 1, zIndex: 20 }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: PAPER, border: `2.5px solid ${CLAY}`, fontFamily: mono, fontSize: 21, color: INK, boxShadow: `0 14px 30px -10px rgba(10,16,34,0.5), 0 0 16px rgba(231,178,76,0.5)`, whiteSpace: "nowrap" }}>📄 {name}</div>
            {/* sparkle trail */}
            {Array.from({ length: 3 }, (_, j) => <div key={j} style={{ position: "absolute", left: -18 - j * 16, top: 10 + j * 6, width: 8 - j * 2, height: 8 - j * 2, borderRadius: "50%", background: GOLD, opacity: (1 - fly) * (0.8 - j * 0.22), boxShadow: `0 0 8px ${GOLD}` }} />)}
          </div>);
      })}
      {/* counter on the folder */}
      {(() => { const n = SKILLS.filter((_, i) => lf >= throwAt(i) + fr(0.75)).length; if (!n) return null; const lastAt = throwAt(n - 1) + fr(0.75); const pop = Math.max(0, 1 - (lf - lastAt) / 8); return (
        <div style={{ position: "absolute", left: "50%", top: 116, transform: `translateX(70px) scale(${1 + pop * 0.4})`, width: 44, height: 44, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#3a2a05", boxShadow: `0 0 16px ${GOLD}`, zIndex: 22 }}>{n}</div>); })()}
      {/* the instructions file writes itself */}
      {instrIn > 0.01 && (
        <div style={{ position: "absolute", left: 300, right: 70, top: 340, transform: `translateY(${(1 - instrIn) * 30}px) scale(${0.92 + instrIn * 0.08})`, opacity: instrIn }}>
          <div style={{ borderRadius: 18, background: PAPER, border: "2px solid #E2D8C6", overflow: "hidden", boxShadow: "0 26px 50px -18px rgba(10,16,34,0.55)" }}>
            <div style={{ height: 54, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 20px", fontFamily: mono, fontSize: 22, color: "#fff", fontWeight: 700 }}>INSTRUCTIONS.md</div>
            <div style={{ padding: "16px 22px" }}>
              {INSTR.map((ln, i) => {
                const typed = over(lf, instrAt + fr(0.5) + i * fr(0.55), fr(0.45));
                const n = Math.floor(typed * ln.length);
                return <div key={i} style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.7, color: i === 0 ? CLAY : "#2C2A24", fontWeight: i === 0 ? 700 : 400 }}>{ln.slice(0, n)}{n > 0 && n < ln.length && <span style={{ opacity: lf % 14 < 7 ? 1 : 0.2 }}>▌</span>}</div>;
              })}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 14, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "rgba(200,215,240,0.75)", opacity: over(lf, instrAt + fr(1.6), 10) }}>everything it learned about how you work ↑</div>
        </div>
      )}
    </Panel>
  );
};

// ---------------- HANDOFF: the wizard outfit crosses the deadline ----------------
const Handoff: React.FC<{ lf: number }> = ({ lf }) => {
  const tossAt = fr(3.16);
  const toss = over(lf, tossAt, fr(1.0), Easing.inOut(Easing.cubic));
  const caught = toss >= 0.999;
  const closeIn = over(lf, fr(5.3), fr(0.5), Easing.out(Easing.back(1.7)));
  const fadeF = over(lf, tossAt + fr(1.1), fr(1.2)) * 0.55;
  const catchPop = caught ? Math.max(0, 1 - (lf - (tossAt + fr(1.0))) / 10) : 0;
  const bx = 250 + toss * 560;
  const by = 400 - Math.sin(toss * Math.PI) * 190;
  return (
    <Panel label="after the deadline">
      {/* deadline divider */}
      <div style={{ position: "absolute", left: "50%", top: 90, bottom: 90, width: 3, background: "repeating-linear-gradient(180deg, rgba(196,74,58,0.55) 0 14px, transparent 14px 26px)" }} />
      <div style={{ position: "absolute", left: "50%", top: 56, transform: "translateX(-50%)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#FF9C8A", background: "rgba(196,74,58,0.14)", border: `1.5px solid ${RED}`, borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>the deadline</div>
      {/* FABLE: the wizard, leaving */}
      <div style={{ position: "absolute", left: 110, top: 250, opacity: 1 - fadeF, filter: `saturate(${1 - fadeF})`, textAlign: "center" }}>
        <Mascot lf={lf} size={225} wizard={1} glasses={1} gaze={7} nodAmp={2.4} nodSpeed={8} />
        <div style={{ marginTop: 2 }}><Chip text="FABLE 5" bg={grad("#E9825C", "#C7541F")} bd="#F0A981" fg="#fff" size={26} /></div>
        <div style={{ marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, color: "rgba(190,205,235,0.6)" }}>going paid</div>
      </div>
      {/* OPUS: plain... until the outfit lands */}
      <div style={{ position: "absolute", right: 110, top: 250, textAlign: "center", filter: caught ? "none" : "saturate(0.75) brightness(0.9)" }}>
        <div style={{ position: "relative", transform: `scale(${1 + catchPop * 0.12})` }}>
          <Mascot lf={lf + 8} size={225} gaze={-7} nodAmp={caught ? 4 : 2} nodSpeed={caught ? 5.5 : 9.5} wizard={caught ? 1 : 0} glasses={caught ? 1 : 0} cheer={caught ? Math.min(1, (lf - (tossAt + fr(1.0))) / 9) : 0} />
          {caught && <div style={{ position: "absolute", left: "50%", top: 30, width: 14, height: 14, marginLeft: -7, borderRadius: "50%", border: `4px solid ${GOLD}`, transform: `scale(${1 + (1 - catchPop) * 10})`, opacity: catchPop }} />}
        </div>
        <div style={{ marginTop: 2 }}><Chip text="OPUS 4.8" bg={caught ? grad("#4A6EA8", "#2C4470") : grad("#31415F", "#1C2740")} bd={caught ? "#8FB0DE" : "#4A5E82"} fg="#DCE8FA" size={26} /></div>
        <div style={{ marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, color: "rgba(190,205,235,0.6)" }}>your daily driver</div>
      </div>
      {/* the clone brain arcs across the deadline */}
      {lf >= tossAt - 3 && !caught && (
        <div style={{ position: "absolute", left: bx, top: by, transform: "translate(-50%,-50%)", zIndex: 24 }}>
          <div style={{ width: 104, borderRadius: 13, background: "rgba(217,119,87,0.16)", border: `2.5px solid ${CLAY}`, padding: "8px 0 6px", textAlign: "center", boxShadow: `0 0 24px rgba(217,119,87,0.55)` }}>
            <div style={{ fontSize: 38 }}>🧠</div>
            <div style={{ fontFamily: mono, fontSize: 15, color: "#F0C9B6" }}>the clone</div>
          </div>
        </div>
      )}
      {caught && <Firework lf={lf} at={tossAt + fr(1.0) + 1} x={840} y={300} hue={2} />}
      {/* files list */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 586, display: "flex", justifyContent: "center", gap: 16, opacity: over(lf, fr(1.0), 10) }}>
        {["skills/", "INSTRUCTIONS.md"].map((tx, i) => (
          <span key={i} style={{ fontFamily: mono, fontSize: 22, color: "rgba(200,215,240,0.85)", background: "rgba(35,50,80,0.6)", border: "1.5px solid rgba(150,175,220,0.3)", borderRadius: 10, padding: "8px 16px" }}>📁 {tx}</span>
        ))}
      </div>
      {/* surprisingly close */}
      {closeIn > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 676, textAlign: "center", transform: `scale(${closeIn})`, opacity: closeIn }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 24px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `2px solid ${GREEN}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: "#8FE0B0" }}><span style={{ width: 30, height: 30, borderRadius: "50%", background: GREEN, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✓</span> surprisingly close</span>
        </div>
      )}
    </Panel>
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

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 4, fr(0.45), Easing.out(Easing.back(1.5)));
  const kw = "CLONE";
  const typed = Math.floor(over(lf, fr(0.5), fr(1.2)) * kw.length);
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 392, textAlign: "center", transform: `scale(${inP})` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: SLATE }}>🔖 do this before the window closes</span>
      </div>
      <div style={{ position: "absolute", left: 200, right: 200, top: 470, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 90, background: grad("#E9825C", "#C7541F"), display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 30px" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(255,255,255,0.85)" }}>THE CLONE GUIDE</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff" }}>The exact handoff prompts</div>
          </div>
          <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
            {["The audit prompt", "Skill-file conversion", "The instructions file"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: MUTE, marginBottom: 14 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 130, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)` }}>CLONE</div>
        <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 14, padding: "16px 26px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>➤</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// CTA scene: content plays normally; the snack lane counts down at the bottom; mini burst at zero
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const clockLf = lf - fr(CLOCK_START - L[5]);
  const burstLf = lf - fr(BURST - L[5]);
  return (
    <>
      <CTA lf={lf} />
      {burstLf < 8 && clockLf >= 0 && (
        <div style={{ opacity: burstLf >= 0 ? Math.max(0, 1 - burstLf / 7) : 1 }}>
          <SnackLane lf={Math.min(clockLf, fr(5) - 1)} />
        </div>
      )}
      {/* mini burst at the dial when it hits zero */}
      {burstLf >= 0 && burstLf < 22 && (() => { const d = burstLf / 22; return (<>
        <div style={{ position: "absolute", left: 902, top: 1528, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `5px solid ${GOLD}`, transform: `scale(${1 + d * 18})`, opacity: Math.max(0, 1 - d * 1.3), zIndex: 96 }} />
        {Array.from({ length: 14 }, (_, k) => { const a = (k / 14) * Math.PI * 2 + seed(k); const dd = Math.pow(d, 0.55) * (60 + seed(k * 2) * 90); const o = Math.max(0, 1 - d * 1.1); const c = [GOLD, CLAY, "#F3E3A6", GREEN, "#fff"][k % 5]; return <div key={k} style={{ position: "absolute", left: 902 + Math.cos(a) * dd, top: 1528 + Math.sin(a) * dd, width: 7, height: 11, background: c, opacity: o, transform: `rotate(${d * 320 + k * 40}deg)`, borderRadius: 2, zIndex: 96 }} />; })}
      </>); })()}
    </>
  );
};

// ---------------- progress bar (standing game-arc: pellets, score, milestones, sprint, gift) ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const marks = [L[2], L[3], L[4]];
  const STARS = [L[1]];  // mid-gap milestone so the long runway to mark 1 has a payoff
  const TOTAL = durationInFrames / FPS;
  const PELLETS = [1.2, 3.95, 8.47, 11.95, 14.55, 18.55, 23.15, 26.15, 30.55, 33.05, 37.05];
  const hitT = BURST;
  const dashP = t >= BURST - 0.8 ? Math.min(1, (t - (BURST - 0.8)) / 0.8) : 0;
  const dashE = 1 - Math.pow(1 - dashP, 3);
  const pos = p + (0.988 - p) * dashE;
  const hit = t >= hitT;
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
      {(() => { const unlocked = t >= hitT; const uu = unlocked ? Math.min(1, (t - hitT) / 0.5) : 0; const eu = 1 - Math.pow(1 - uu, 3); const pt = 1 - uu; const pulse = 1 + Math.sin(t * 3.0) * 0.06 * pt; const pop = 1 + Math.max(0, 1 - Math.abs((t - hitT) - 0.14) * 4) * 0.9; const sc = pulse * pop; const bob = Math.sin(t * 2.4) * 3 * pt; return (
        <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translateY(${bob}px) scale(${sc})`, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${unlocked ? "cc" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: unlocked ? `0 0 36px ${GOLD}` : `0 0 14px ${GOLD}66` }} />
          {unlocked && Array.from({ length: 11 }, (_, k) => { const a = (k / 11) * Math.PI * 2; const d = 22 + eu * 28; const o = Math.max(0, 1 - uu * 1.05); return (<div key={k} style={{ position: "absolute", left: 48, top: 48, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: k % 2 ? "#F3E3A6" : CLAY, opacity: o, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 8px ${GOLD}` }} />); })}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: unlocked ? "drop-shadow(0 3px 6px rgba(120,70,10,0.4))" : "grayscale(0.6) brightness(0.85)", opacity: unlocked ? 1 : 0.6, transform: `scale(${unlocked ? 0.9 + eu * 0.22 : 0.84})` }}>🎁</div>
        </div>); })()}
      {(() => { const slamShock = t >= 3.56 && t < 4.7 ? Math.min(1, (t - 3.56) / 0.25) * 0.9 : 0; const party = t >= BURST - 0.8 ? 1 : 0; const cheerV = Math.max(party, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${pos * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
          {/* collect-ring: a green segment fills around the coin per pellet/checkpoint until full */}
          {(() => {
            const items = [...PELLETS, ...marks, ...STARS];
            const frac = items.reduce((a, x) => a + Math.min(1, Math.max(0, (t - x) / 0.35)), 0) / items.length;
            const full = frac >= 0.999;
            const fullPop = full ? Math.max(0, 1 - (t - (Math.max(...items) + 0.35)) * 2.2) : 0;
            return (
              <div style={{ position: "absolute", inset: -11, borderRadius: "50%", transform: `scale(${1 + fullPop * 0.16})`, background: `conic-gradient(from -90deg, ${full ? GOLD : GREEN} ${frac * 360}deg, rgba(58,92,132,0.18) ${frac * 360}deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", filter: incPop > 0.05 || fullPop > 0.05 ? `drop-shadow(0 0 ${6 + Math.max(incPop, fullPop) * 10}px ${full ? GOLD : GREEN})` : "none" }} />
            ); })()}
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={party ? 4.5 : 6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, opacity: hit ? Math.max(0, 1 - (t - hitT) * 3) : 1, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>★ {score}</div>
        </div>); })()}
      {/* milestone celebration burst above the coin */}
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
  if (t >= BURST - 0.05) return null;
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

export const ClaudeCloneReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.8, 3.11, 5.05, 7.75, 11.95, 13.15, 16.95, 19.95, 22.05, 23.05, 24.05, 25.25, 27.55, 31.85, 33.95, CLOCK_START, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3, CLOCK_START + 4, BURST];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_clone.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(BURST) - 8, fr(BURST) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      {/* hook: launch site */}
      <Sfx at={0} src="metal_riser.wav" v={0.55} /><Sfx at={0.12} src="boom.wav" v={0.4} />
      <Sfx at={0.15} src="crowd_run.wav" v={0.55} dur={2.9} />
      {[0.35, 0.62, 0.9, 1.2].map((tt, i) => <Sfx key={`ft${i}`} at={tt} src="pop.wav" v={0.16} dur={0.4} />)}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Sfx key={`tk${n}`} at={n + 0.35} src="tick.wav" v={0.13} dur={0.3} />)}
      <Sfx at={3.11} src="thock.wav" v={0.5} /><Sfx at={3.15} src="boom.wav" v={0.35} /><Sfx at={3.17} src="sub.wav" v={0.42} dur={2} />
      <Sfx at={3.5} src="swooshup.wav" v={0.42} /><Sfx at={3.55} src="riser.wav" v={0.32} dur={1.5} />
      <Sfx at={5.05} src="boom.wav" v={0.5} /><Sfx at={5.07} src="impact.wav" v={0.45} /><Sfx at={5.13} src="sparkle.wav" v={0.5} />
      {[5.4, 5.65, 5.9, 6.15, 6.4].map((tt, i) => <Sfx key={`br${i}`} at={tt} src={`blip${(i % 5) + 1}.wav`} v={0.2} dur={0.35} />)}\n      <Sfx at={5.9} src="crowd_cheer.wav" v={0.5} dur={2.3} />
      <Sfx at={6.65} src="chimehi.wav" v={0.33} dur={0.8} /><Sfx at={6.8} src="pop.wav" v={0.3} dur={0.5} /><Sfx at={6.95} src="pop.wav" v={0.26} dur={0.5} /><Sfx at={7.0} src="chimelo.wav" v={0.28} dur={0.9} />
      {/* boundaries */}
      {L.slice(1).map((tt, i) => <React.Fragment key={`b${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.4} /><Sfx at={tt + 0.26} src="pop.wav" v={0.24} dur={0.6} /></React.Fragment>)}
      {/* audit */}
      {[0, 1, 2, 3].map((n) => <Sfx key={`tap${n}`} at={L[1] + 1.05 + (n + 1) * 0.32} src="tick.wav" v={0.22} dur={0.3} />)}
      <Sfx at={L[1] + 3.45} src="key.wav" v={0.3} dur={1.2} />
      <Sfx at={L[1] + 4.65} src="sparkle.wav" v={0.35} />
      {[0, 1, 2].map((n) => <Sfx key={`fd${n}`} at={L[1] + 4.7 + n * 0.5} src={`blip${n + 1}.wav`} v={0.28} dur={0.4} />)}
      {/* rehook */}
      <Sfx at={L[2] + 0.15} src="whoosh.wav" v={0.42} />
      <Sfx at={L[2] + 0.55} src="thock.wav" v={0.35} /><Sfx at={L[2] + 0.92} src="snap.wav" v={0.42} dur={0.5} /><Sfx at={L[2] + 1.28} src="snap.wav" v={0.36} dur={0.5} />
      <Sfx at={L[2] + 1.85} src="swish.wav" v={0.36} />
      <Sfx at={L[2] + 3.05} src="sparkle.wav" v={0.45} />
      {/* skills: conjure + throw + land */}
      {[0, 1, 2].map((n) => <React.Fragment key={`sk${n}`}><Sfx at={L[3] + 0.9 + n * 1.0} src="swooshup.wav" v={0.24} /><Sfx at={L[3] + 0.92 + n * 1.0} src="shimmer.wav" v={0.22} dur={0.6} /><Sfx at={L[3] + 1.65 + n * 1.0} src="pop.wav" v={0.32} dur={0.5} /></React.Fragment>)}
      <Sfx at={L[3] + 4.7} src="key.wav" v={0.28} dur={1.8} />
      {/* handoff */}
      <Sfx at={L[4] + 3.15} src="swooshup.wav" v={0.4} />
      <Sfx at={L[4] + 4.15} src="thock.wav" v={0.4} /><Sfx at={L[4] + 4.2} src="chimehi.wav" v={0.32} dur={0.8} /><Sfx at={L[4] + 4.22} src="shimmer.wav" v={0.4} dur={1.2} />
      <Sfx at={L[4] + 5.35} src="resolve.wav" v={0.45} />
      {/* milestone chimes */}
      {[L[1], L[2], L[3], L[4]].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.3} dur={0.8} />)}
      {/* pellet ticks (non-covered) */}
      {[3.95, 14.55, 18.55, 23.15, 26.15, 30.55, 33.05, 37.05].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.16} dur={0.3} />)}
      {/* snack clock: ascending chomps + ticks + riser + burst */}
      {[0, 1, 2, 3, 4].map((n) => <React.Fragment key={`cl${n}`}><Sfx at={CLOCK_START + n + 0.86} src={`blip${n + 1}.wav`} v={0.36} dur={0.4} /><Sfx at={CLOCK_START + n} src="tick.wav" v={0.24} dur={0.3} /></React.Fragment>)}
      <Sfx at={BURST - 1.6} src="riser.wav" v={0.4} dur={1.7} />
      <Sfx at={BURST} src="boom.wav" v={0.45} /><Sfx at={BURST + 0.06} src="sparkle.wav" v={0.55} /><Sfx at={BURST + 0.1} src="angelic.wav" v={0.38} dur={3} /><Sfx at={BURST + 0.16} src="chimehi.wav" v={0.4} dur={1} />

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <Audit lf={frame - Lf[1]} />}
        {scene(2) && <Rehook lf={frame - Lf[2]} />}
        {scene(3) && <Skills lf={frame - Lf[3]} />}
        {scene(4) && <Handoff lf={frame - Lf[4]} />}
        {scene(5) && <ClockCTA lf={frame - Lf[5]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of [...Lf.slice(1), fr(BURST)]) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
