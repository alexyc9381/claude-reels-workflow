import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_designstack.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): S0 hook · S1 problem · S2 promise · S3 save · S4 21st.dev · S5 aceternity+magicui · S6 mobbin · S7 tweakcn · S8 cta
const L = [0, 5.41, 12.59, 17.56, 21.87, 26.13, 29.45, 32.17, 35.26];
const Lf = L.map(fr);
const CUT = 39.76;                 // full VO length (gaps tightened)
const TOOLMARKS = [L[4], L[5], L[6], L[7]];   // where the 5-tool tracker ticks (S5 lands two)

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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; tint?: string; beret?: number; shades?: number; bowtie?: number; heistMask?: number; paint?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, tint, beret = 0, shades = 0, bowtie = 0, heistMask = 0, paint = 0 }) => {
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
        {/* bow tie (VIP / expensive) */}
        {bowtie > 0 && <>
          <polygon points="82,104 100,114 82,124" fill="#1E1B26" />
          <polygon points="118,104 100,114 118,124" fill="#1E1B26" />
          <rect x={95} y={109} width={10} height={10} fill="#0E0C14" />
        </>}
        {/* cool shades */}
        {shades > 0 && <>
          <rect x={60} y={66} width={36} height={22} rx={5} fill="#151312" />
          <rect x={104} y={66} width={36} height={22} rx={5} fill="#151312" />
          <rect x={94} y={73} width={12} height={5} fill="#151312" />
          <rect x={34} y={72} width={28} height={5} fill="#151312" />
          <rect x={140} y={72} width={26} height={5} fill="#151312" />
          <rect x={66} y={70} width={13} height={5} fill="rgba(255,255,255,0.4)" transform="rotate(-14 72 72)" />
          <rect x={110} y={70} width={13} height={5} fill="rgba(255,255,255,0.4)" transform="rotate(-14 116 72)" />
        </>}
        {/* heist balaclava eye-band (Mobbin spy) */}
        {heistMask > 0 && <>
          <rect x={30} y={58} width={140} height={30} fill="#1B1F2A" />
          <rect x={30} y={58} width={140} height={5} fill="#0E1119" />
          <rect x={68} y={66} width={20} height={16} rx={3} fill="#F4EEE2" />
          <rect x={112} y={66} width={20} height={16} rx={3} fill="#F4EEE2" />
          <rect x={73} y={70} width={11} height={9} fill="#151312" />
          <rect x={117} y={70} width={11} height={9} fill="#151312" />
        </>}
        {/* painter beret (designer / artist) */}
        {beret > 0 && <>
          <ellipse cx={100} cy={44} rx={49} ry={9} fill="rgba(0,0,0,0.18)" transform="rotate(-9 100 44)" />
          <ellipse cx={100} cy={41} rx={50} ry={11} fill="#A63B26" transform="rotate(-9 100 41)" />
          <ellipse cx={94} cy={26} rx={57} ry={20} fill="#C6472F" transform="rotate(-9 100 31)" />
          <ellipse cx={77} cy={19} rx={19} ry={6} fill="rgba(255,255,255,0.22)" transform="rotate(-9 77 19)" />
          <circle cx={107} cy={8} r={6} fill="#C6472F" />
        </>}
        {/* paint brush in the right nub (tweakcn) */}
        {paint > 0 && <>
          <rect x={182} y={armY - 30} width={6} height={44} fill="#8A6844" transform={`rotate(28 185 ${armY + 6})`} />
          <rect x={192} y={armY - 42} width={13} height={12} fill="#C9CDD6" transform={`rotate(28 198 ${armY - 36})`} />
          <rect x={195} y={armY - 46} width={12} height={9} fill="#3F9E74" transform={`rotate(28 200 ${armY - 41})`} />
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

// ---------------- SCENES (stubs; replaced by authored bodies) ----------------
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== CLONE-WALL ENGINE (never stops: a fresh site every 6 frames, wall creeps upward forever) =====
  const RATE = 6, COLS = 4, ROWH = 110, TW = 140, TH = 98;
  const rowFloat = lf / (RATE * COLS);
  const scroll = (rowFloat - 2.85) * ROWH;          // continuous upward creep, still moving on the last frame
  const Rcur = Math.floor(rowFloat);
  const rows = [Rcur - 4, Rcur - 3, Rcur - 2, Rcur - 1, Rcur];

  // KA-CHUNK on every stamp (locked to the spawn cadence)
  const phase = lf % RATE;
  const chunk = Math.max(0, 1 - phase / 2.4);
  const shake = chunk * 2.6;

  // slow push-in across the whole beat + work-light flicker
  const push = ramp(lf, 0, 161);
  const zoom = 1 + push * 0.05;
  const flick = 0.92 + Math.sin(lf * 0.7) * 0.05 + Math.sin(lf * 1.9) * 0.03;

  // header slam (frame 0 already composed, lands by ~0.3s) + endless gold shimmer sweep
  const slam = over(lf, 0, fr(0.3), Easing.out(Easing.back(2.6)));
  const slamScale = interpolate(slam, [0, 1], [1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shimmerX = ((lf * 11) % 1500) - 260;

  // mascot recoil: jerks on every stamp, keeps backing off to the last frame
  const back = ramp(lf, fr(0.4), fr(5.2));
  const mascotShock = Math.min(0.92, 0.6 + chunk * 0.25);
  const mascotX = 74 - back * 16;
  const mascotY = 566 + back * 8 + Math.sin(lf * 0.11) * 2;

  // diegetic copy counter on the machine (climbs on every stamp)
  const copies = 2048 + Math.floor(lf / RATE) * 3;

  // ===== VILLAIN SITE CARD (the hero site, same one all reel) =====
  const villain = (w: number, h: number, dim: number, ring: number) => {
    const ns = h / 210;
    return (
      <div style={{
        width: w, height: h, borderRadius: 12 * ns,
        overflow: "hidden", position: "relative",
        background: "#F4F1FA",
        border: `${1.5 * ns}px solid rgba(124,58,237,${0.32 * dim})`,
        boxShadow: `0 ${10 * ns}px ${22 * ns}px rgba(60,20,110,${0.28 * dim}), inset 0 0 0 ${1 * ns}px rgba(255,255,255,0.5)`,
        opacity: dim,
        outline: ring > 0 ? `${3 * ns}px solid rgba(214,58,58,${ring})` : "none",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 24 * ns,
          display: "flex", alignItems: "center", gap: 10 * ns, paddingLeft: 12 * ns,
          background: "rgba(255,255,255,0.72)", borderBottom: `${1 * ns}px solid rgba(124,58,237,0.14)`,
        }}>
          <div style={{ width: 26 * ns, height: 6 * ns, borderRadius: 3 * ns, background: "#7C3AED", opacity: 0.55 }} />
          <div style={{ flex: 1 }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 22 * ns, height: 5 * ns, borderRadius: 3 * ns, background: "#B7ADC9", marginRight: 4 * ns }} />
          ))}
        </div>
        <div style={{
          position: "absolute", top: 24 * ns, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(135deg,#7C3AED 0%,#A78BFA 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 9 * ns,
        }}>
          <div style={{
            fontFamily: inter.fontFamily, fontWeight: 800, color: "#FFFFFF",
            fontSize: 26 * ns, letterSpacing: -0.5 * ns, lineHeight: 1,
            textShadow: `0 ${1 * ns}px ${2 * ns}px rgba(0,0,0,0.12)`,
          }}>Your SaaS</div>
          <div style={{ width: 84 * ns, height: 4.5 * ns, borderRadius: 3 * ns, background: "rgba(255,255,255,0.62)" }} />
          <div style={{ width: 62 * ns, height: 4.5 * ns, borderRadius: 3 * ns, background: "rgba(255,255,255,0.42)", marginTop: -3 * ns }} />
          <div style={{
            marginTop: 8 * ns, padding: `${6 * ns}px ${18 * ns}px`, borderRadius: 999,
            background: "#C4B5FD", color: "#4C1D95", fontFamily: inter.fontFamily,
            fontWeight: 700, fontSize: 11 * ns,
            boxShadow: `0 ${2 * ns}px ${5 * ns}px rgba(76,29,149,0.3)`,
          }}>Get Started</div>
        </div>
      </div>
    );
  };

  return (
    <Panel label="ai-slop-copier">
      {/* ===================== SET: back wall ===================== */}
      <div style={{
        position: "absolute", left: 0, top: 46, width: 1012, height: 746,
        background: "linear-gradient(180deg,#3B3150 0%,#2A2138 38%,#1B1526 72%,#130E1C 100%)",
      }} />
      <div style={{
        position: "absolute", left: 0, top: 120, width: 520, height: 520,
        background: "radial-gradient(ellipse at 44% 40%,rgba(255,238,198,0.16),transparent 66%)",
        filter: "blur(6px)",
      }} />
      {[96, 236, 316].map((wx, i) => (
        <div key={"ws" + i} style={{ position: "absolute", left: wx, top: 206, width: 2, height: 354, background: "rgba(160,120,240,0.07)" }} />
      ))}
      {[262, 372, 482].map((wy, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: 0, top: wy, width: 360, height: 2, background: "rgba(160,120,240,0.06)" }} />
      ))}
      <div style={{
        position: "absolute", left: 360, top: 206, width: 640, height: 354,
        background: "repeating-linear-gradient(0deg,rgba(124,58,237,0.08) 0 46px,transparent 46px 92px), repeating-linear-gradient(90deg,rgba(124,58,237,0.08) 0 46px,transparent 46px 92px)",
        opacity: 0.5,
      }} />

      {/* ===================== SET: perspective floor ===================== */}
      <div style={{
        position: "absolute", left: 0, top: 560, width: 1012, height: 232,
        background: "linear-gradient(180deg,#4E455E 0%,#372E48 32%,#221C30 66%,#141019 100%)",
      }} />
      <div style={{
        position: "absolute", left: 40, top: 562, width: 720, height: 210,
        background: "linear-gradient(180deg,rgba(255,244,214,0.13),rgba(255,244,214,0.02) 60%,transparent 82%)",
        filter: "blur(8px)", borderRadius: "50% 50% 0 0",
      }} />
      <div style={{
        position: "absolute", left: 96, top: 562, width: 190, height: 220,
        background: "linear-gradient(180deg,rgba(230,214,255,0.28),rgba(230,214,255,0.05) 55%,transparent 84%)",
        filter: "blur(7px)", borderRadius: "44%",
      }} />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i - 6) / 6;
        const xTop = 506 + t * 80;
        const xBot = 506 + t * 900;
        const dx = xBot - xTop;
        const ang = Math.atan2(232, dx) * 180 / Math.PI;
        const len = Math.sqrt(dx * dx + 232 * 232);
        return (
          <div key={"fg" + i} style={{
            position: "absolute", left: xTop, top: 560, width: len, height: 2,
            transformOrigin: "0 0", transform: `rotate(${ang}deg)`,
            background: "rgba(180,166,220,0.13)",
          }} />
        );
      })}
      {[6, 20, 42, 74, 118, 182].map((dy, i) => {
        const w = 150 + dy * 3.7;
        return (
          <div key={"fh" + i} style={{
            position: "absolute", left: 506 - w / 2, top: 560 + dy, width: w, height: 2,
            background: `rgba(180,166,220,${(0.16 - i * 0.016).toFixed(3)})`,
          }} />
        );
      })}
      <div style={{
        position: "absolute", left: 0, top: 559, width: 1012, height: 2,
        background: "rgba(198,178,238,0.48)", boxShadow: "0 0 30px rgba(198,178,238,0.5)",
      }} />

      {/* ===================== SET: lighting ===================== */}
      <div style={{
        position: "absolute", left: 20, top: 196, width: 340, height: 470,
        background: `linear-gradient(180deg,rgba(255,246,212,${(0.30 * flick).toFixed(3)}),rgba(255,246,212,0.02) 84%)`,
        clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", filter: "blur(3px)",
      }} />
      <div style={{
        position: "absolute", left: 96, top: 196, width: 180, height: 400,
        background: `linear-gradient(180deg,rgba(255,250,228,${(0.24 * flick).toFixed(3)}),rgba(255,250,228,0.01) 74%)`,
        clipPath: "polygon(38% 0,62% 0,86% 100%,14% 100%)", filter: "blur(4px)",
      }} />
      <div style={{
        position: "absolute", left: 0, top: 574, width: 380, height: 130, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(255,248,220,0.30),transparent 66%)",
      }} />
      <div style={{
        position: "absolute", left: 420, top: 566, width: 520, height: 110, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(214,196,255,0.16),transparent 68%)",
      }} />

      {/* ===================== CLONE WALL (clipped viewport, multiplies to the last frame) ===================== */}
      <div style={{
        position: "absolute", left: 360, top: 206, width: 640, height: 354,
        overflow: "hidden", borderRadius: 6,
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 640, height: 354, transform: `scale(${zoom})`, transformOrigin: "50% 100%" }}>
          {rows.map((R) => (
            <React.Fragment key={"R" + R}>
              {[0, 1, 2, 3].map((col) => {
                const i = R * COLS + col;
                const born = i * RATE;
                if (lf < born) return null;
                const y = R * ROWH - scroll;
                if (y > 358 || y < -TH - 8) return null;
                const pop = over(lf, born, 5, Easing.out(Easing.back(2.0)));
                const fresh = 1 - over(lf, born + 3, 16);
                const dim = Math.min(1, 0.34 + seed(i * 2.7 + 5) * 0.09 + fresh * 0.56);
                return (
                  <div key={"c" + i} style={{
                    position: "absolute", left: 13 + col * 158, top: y,
                    transform: `scale(${1 + (1 - pop) * 0.42})`, transformOrigin: "50% 50%",
                  }}>
                    {villain(TW, TH, dim, fresh * 0.5)}
                    <div style={{
                      position: "absolute", left: 0, top: 0, width: TW, height: TH, borderRadius: 6,
                      background: "rgba(236,233,226,0.9)", opacity: fresh * fresh * 0.75, pointerEvents: "none",
                    }} />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <div style={{
            position: "absolute", left: 0, top: 0, width: 640, height: 150,
            background: "linear-gradient(180deg,rgba(12,8,20,0.85),transparent)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: 0, top: 302, width: 640, height: 52,
            background: "linear-gradient(0deg,rgba(12,8,20,0.9),transparent)", pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* ===================== PROJECTION BEAM (pulses on every stamp) ===================== */}
      <div style={{
        position: "absolute", left: 286, top: 206, width: 190, height: 354,
        background: `linear-gradient(90deg,rgba(186,150,255,${(0.26 + chunk * 0.30).toFixed(3)}),rgba(186,150,255,0.02) 92%)`,
        clipPath: "polygon(0% 32%, 0% 46%, 100% 4%, 100% 98%)",
        filter: "blur(6px)", pointerEvents: "none",
      }} />

      {/* ===================== THE COPIER ===================== */}
      <div style={{ position: "absolute", left: 40 + shake * 0.4, top: 230 + shake, width: 250, height: 270 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, width: 250, height: 270, borderRadius: 24,
          background: "linear-gradient(150deg,#5B2FA8 0%,#3E1D74 60%,#2C1454 100%)",
          border: "3px solid rgba(167,139,250,0.4)",
          boxShadow: "0 26px 50px rgba(20,8,44,0.6), inset 0 2px 0 rgba(255,255,255,0.14), inset 0 -22px 40px rgba(0,0,0,0.35)",
        }}>
          <div style={{
            position: "absolute", left: -3, top: 18, width: 4, height: 200, borderRadius: 4,
            background: "linear-gradient(180deg,rgba(255,248,224,0.7),rgba(255,248,224,0))", filter: "blur(1px)",
          }} />
          {/* scan lid */}
          <div style={{
            position: "absolute", left: 22, top: 14, width: 206, height: 24, borderRadius: 8, overflow: "hidden",
            background: "linear-gradient(90deg,#1B0F33,#3B1F6E,#1B0F33)", border: "2px solid rgba(167,139,250,0.35)",
          }}>
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: 44, left: ((lf * 6) % 250) - 44,
              background: "linear-gradient(90deg,transparent,rgba(180,255,230,0.7),transparent)",
            }} />
          </div>
          {/* the ORIGINAL hero site on the platen */}
          <div style={{
            position: "absolute", left: 27, top: 48, width: 196, height: 138, borderRadius: 10,
            boxShadow: "0 0 0 3px rgba(15,8,30,0.65), 0 10px 22px rgba(0,0,0,0.45)",
          }}>
            {villain(196, 138, 1, 0)}
            <div style={{
              position: "absolute", left: 0, top: 0, width: 196, height: 138, borderRadius: 10,
              background: "rgba(236,233,226,0.9)", opacity: chunk * 0.5, pointerEvents: "none",
            }} />
          </div>
          {/* copy counter readout */}
          <div style={{
            position: "absolute", left: 27, top: 200, width: 128, height: 30, borderRadius: 7,
            background: "#1A0F30", border: "1.5px solid rgba(167,139,250,0.32)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: mono, fontSize: 13, fontWeight: 700, color: "#C4B5FD", letterSpacing: 0.6, gap: 7,
          }}><span style={{ color: "rgba(196,181,253,0.55)" }}>COPIES</span>{copies}</div>
          {/* status lamps */}
          <div style={{
            position: "absolute", left: 166, top: 200, width: 58, height: 30, borderRadius: 7,
            background: "rgba(15,8,30,0.6)", border: "1.5px solid rgba(167,139,250,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}>
            {[GREEN, AMBER, "#A78BFA"].map((c, i) => (
              <div key={i} style={{
                width: 11, height: 11, borderRadius: 3, background: c,
                opacity: i === 2 ? 0.45 + chunk * 0.55 : 0.8,
                boxShadow: i === 2 ? `0 0 ${5 + chunk * 8}px ${c}` : "none",
              }} />
            ))}
          </div>
          {/* emitter lens (beam source) */}
          <div style={{
            position: "absolute", left: 236, top: 108, width: 24, height: 40, borderRadius: 8,
            background: "radial-gradient(circle at 40% 50%,rgba(226,208,255,0.95),#7C3AED 70%)",
            border: "2px solid rgba(200,175,255,0.6)",
            boxShadow: `0 0 ${12 + chunk * 22}px rgba(167,139,250,${0.5 + chunk * 0.4})`,
          }} />
          {/* output chute */}
          <div style={{
            position: "absolute", left: 24, bottom: 8, width: 202, height: 16, borderRadius: 6,
            background: "#0E0720", boxShadow: "inset 0 4px 8px rgba(0,0,0,0.7)", border: "1.5px solid rgba(167,139,250,0.2)",
          }} />
        </div>
        <div style={{ position: "absolute", left: 24, top: 268, width: 20, height: 58, borderRadius: 5, background: "linear-gradient(180deg,#3E1D74,#241041)" }} />
        <div style={{ position: "absolute", left: 206, top: 268, width: 20, height: 58, borderRadius: 5, background: "linear-gradient(180deg,#3E1D74,#241041)" }} />
        <div style={{
          position: "absolute", left: 30, top: 272, width: 190, height: 22, borderRadius: 8,
          background: "rgba(180,255,230,0.5)", opacity: chunk * 0.45, filter: "blur(5px)",
        }} />
      </div>
      <div style={{
        position: "absolute", left: 30, top: 548, width: 268, height: 28, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 70%)", filter: "blur(4px)",
      }} />

      {/* ===================== OUTPUT BELT (clones keep pouring out) ===================== */}
      <div style={{ position: "absolute", left: 252, top: 646, width: 748, height: 58, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 44, width: 748, height: 8, borderRadius: 4,
          background: "linear-gradient(180deg,#2C2340,#171126)", boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
        }} />
        {Array.from({ length: 8 }).map((_, i) => {
          const x = ((i * 118 + lf * 2.6) % 860) - 90;
          return (
            <div key={"bc" + i} style={{
              position: "absolute", left: x, top: 6, width: 66, height: 40, borderRadius: 6,
              background: "linear-gradient(135deg,#7C3AED,#A78BFA)",
              border: "1.5px solid rgba(196,181,253,0.5)",
              boxShadow: "0 5px 12px rgba(20,8,44,0.6)",
              transform: `rotate(${(seed(i * 4.4 + 1) - 0.5) * 5}deg)`,
              opacity: 0.9,
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 8, background: "rgba(255,255,255,0.62)", borderRadius: "5px 5px 0 0" }} />
              <div style={{ position: "absolute", left: 17, top: 16, width: 32, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.85)" }} />
              <div style={{ position: "absolute", left: 22, top: 26, width: 22, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.45)" }} />
            </div>
          );
        })}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = ((i * 78 + lf * 2.6) % 820) - 40;
          return <div key={"bt" + i} style={{ position: "absolute", left: x, top: 46, width: 30, height: 4, borderRadius: 2, background: "rgba(167,139,250,0.28)" }} />;
        })}
        <div style={{ position: "absolute", left: 618, top: 0, width: 130, height: 58, background: "linear-gradient(90deg,transparent,#150F1F)" }} />
      </div>

      {/* ===================== ATMOSPHERE ===================== */}
      {Array.from({ length: 18 }).map((_, i) => {
        const r = seed(i * 3.1 + 7);
        const r2 = seed(i * 5.7 + 2);
        const px = 40 + r * 930;
        const py = 210 + ((r2 * 560 + lf * (0.5 + r * 1.0)) % 560);
        return (
          <div key={"p" + i} style={{
            position: "absolute", left: px, top: py, width: 2 + r * 3, height: 2 + r * 3,
            borderRadius: "50%", background: `rgba(255,246,218,${(0.12 + r2 * 0.18).toFixed(2)})`,
          }} />
        );
      })}

      {/* ===================== MASCOT (recoiling, keeps backing away) ===================== */}
      <div style={{
        position: "absolute", left: mascotX + 4, top: mascotY + 150, width: 168, height: 26, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 70%)", filter: "blur(4px)",
      }} />
      <div style={{
        position: "absolute", left: mascotX, top: mascotY,
        transform: `rotate(${-5 - chunk * 4 - back * 3}deg)`, transformOrigin: "50% 92%",
      }}>
        <Mascot lf={lf} size={176} gaze={10} nodAmp={2} nodSpeed={9} shock={mascotShock} />
      </div>

      {/* ===================== HEADER (slams in at frame 0, stays legible) ===================== */}
      <div style={{
        position: "absolute", left: 506, top: 72, transform: `translateX(-50%) scale(${slamScale})`, transformOrigin: "50% 0%",
      }}>
        <div style={{
          position: "relative", overflow: "hidden", padding: "14px 34px", borderRadius: 18,
          background: "linear-gradient(160deg,#1C2542 0%,#0D1426 100%)",
          border: "2px solid rgba(231,178,76,0.42)",
          boxShadow: "0 26px 54px -16px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.10)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        }}>
          <div style={{
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1.04,
            color: CREAM, letterSpacing: -1, whiteSpace: "nowrap",
          }}>AI BUILDS THE SAME SITE</div>
          <div style={{
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1.04,
            color: GOLD, letterSpacing: 1, whiteSpace: "nowrap",
            textShadow: "0 2px 10px rgba(231,178,76,0.35)",
          }}>EVERY TIME</div>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: shimmerX, width: 150,
            background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.14),transparent)",
            transform: "skewX(-16deg)", pointerEvents: "none",
          }} />
        </div>
        <div style={{
          position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 24,
          border: `3px solid ${GOLD}`, opacity: (1 - over(lf, 0, fr(0.42))) * 0.8, pointerEvents: "none",
        }} />
      </div>

      {/* ===================== VIGNETTE ===================== */}
      <div style={{
        position: "absolute", left: 0, top: 46, width: 1012, height: 746, pointerEvents: "none",
        boxShadow: "inset 0 0 190px rgba(0,0,0,0.56)",
      }} />
    </Panel>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  // ===================== THE LOOP =====================
  // 4 identical pulls across the full 7.2s. Nothing ever settles.
  const PULLS = [8, 60, 112, 164];
  const LOCK = [16, 22, 28];        // reel i locks at pull + LOCK[i]
  const EJECT = 30;                 // site pops out of the tray
  const FLY = 22;                   // flight time to the pile

  const idx = PULLS.reduce((a, p, i) => (lf >= p ? i : a), -1);
  const cur = idx >= 0 ? PULLS[idx] : -999;
  const phase = cur > -999 ? lf - cur : -1;

  const pulse = (f: number, len = 14) => {
    const d = lf - f;
    return d >= 0 && d < len ? Math.max(0, Math.sin((1 - d / len) * Math.PI)) : 0;
  };

  // ---- lever: slammed down on every pull, springs back, ready for the next ----
  const leverOne = (start: number) =>
    over(lf, start, fr(0.24), Easing.out(Easing.back(1.7))) * 50 -
    over(lf, start + 8, fr(0.46), Easing.inOut(Easing.cubic)) * 50;
  const leverAngle = PULLS.reduce((a, p) => a + leverOne(p), 0);
  const rad = (leverAngle * Math.PI) / 180;
  const PIVX = 706, PIVY = 536, ARM = 96;
  const knobX = PIVX + ARM * Math.sin(rad);
  const knobY = PIVY - ARM * Math.cos(rad);

  // ---- rigged sign: dead between pulls, screaming the moment it locks the same 3 ----
  const rigOn = cur > -999 && phase >= LOCK[2];
  const rigFlash = rigOn ? 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.6)) : 0.2;
  const buzz = PULLS.reduce((a, p) => Math.max(a, pulse(p + LOCK[2], 13)), 0);

  // ---- ambient life (never stops, at any frame) ----
  const flick = Math.max(0.55, 0.86 + 0.14 * Math.sin(lf * 0.9) + (seed(Math.floor(lf / 5) * 1.7) > 0.82 ? -0.28 : 0));
  const keyBreathe = 0.9 + 0.1 * Math.sin(lf * 0.07);

  // ===================== SYMBOLS =====================
  const sym = (i: number) => {
    if (i === 0)
      return <div style={{ width: 78, height: 78, borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#A78BFA)", boxShadow: "0 5px 12px rgba(90,45,150,.45), inset 0 2px 6px rgba(255,255,255,.42)", border: "1px solid rgba(255,255,255,.3)" }} />;
    if (i === 1)
      return <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 58, color: "#20160C", letterSpacing: -3 }}>Aa</div>;
    return (
      <div style={{ width: 84, height: 96, borderRadius: 10, background: "#fff", border: "1.5px solid #D8C8AE", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, boxShadow: "0 3px 8px rgba(60,40,20,.18)" }}>
        <div style={{ width: 52, height: 9, borderRadius: 4, background: "#B4A184" }} />
        <div style={{ width: 38, height: 7, borderRadius: 4, background: "#CDBEA2" }} />
        <div style={{ width: 44, height: 16, borderRadius: 8, marginTop: 4, background: "linear-gradient(180deg,#8B5CF6,#7C3AED)", boxShadow: "0 2px 5px rgba(124,58,237,.4)" }} />
      </div>
    );
  };

  // ===================== REELS =====================
  const reelX = [280, 412, 544];
  const reels = [0, 1, 2].map((i) => {
    const spinning = cur > -999 && lf < cur + LOCK[i];
    const lockAt = cur > -999 && lf >= cur + LOCK[i] ? cur + LOCK[i] : -999;
    const slamT = lockAt > -999 ? over(lf, lockAt, 11, Easing.out(Easing.back(2.2))) : 1;
    const transY = spinning ? 0 : lockAt > -999 ? (1 - slamT) * -46 : 0;
    const scrollOff = spinning ? (lf * 52) % 92 : 0;
    const flash = lockAt > -999 ? pulse(lockAt, 8) : 0;
    return (
      <div key={i} style={{ position: "absolute", left: reelX[i], top: 222, width: 116, height: 200, borderRadius: 12, overflow: "hidden", background: "linear-gradient(180deg,#FBF6EC,#E9DDC7)", boxShadow: "inset 0 7px 15px rgba(60,40,20,.35), inset 0 -7px 15px rgba(60,40,20,.28)", border: "2px solid #C9A24B" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${transY}px)`, opacity: spinning ? 0 : 1 }}>{sym(i)}</div>
        {spinning && (
          <div style={{ position: "absolute", left: 0, top: -scrollOff, width: "100%", filter: "blur(4px)", opacity: 0.92 }}>
            {[0, 1, 2, 0].map((k, z) => (
              <div key={z} style={{ height: 92, display: "flex", alignItems: "center", justifyContent: "center" }}>{sym((i + k) % 3)}</div>
            ))}
          </div>
        )}
        <div style={{ position: "absolute", left: 0, top: 93, width: "100%", height: 14, background: "linear-gradient(90deg,rgba(0,0,0,0),rgba(90,50,10,.16),rgba(0,0,0,0))" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,.3),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(60,40,20,.2))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,240,200,1)", opacity: flash * 0.42, pointerEvents: "none" }} />
      </div>
    );
  });

  // ===================== THE HERO SITE (identical every single time) =====================
  const SlopSite: React.FC<{ w?: number }> = ({ w = 132 }) => {
    const s = w / 132, h = 86 * s;
    return (
      <div style={{ width: w, height: h, borderRadius: 7 * s, overflow: "hidden", background: "#fff", border: `${1.5 * s}px solid #E4D9C4`, boxShadow: `0 ${7 * s}px ${16 * s}px rgba(0,0,0,.42)` }}>
        <div style={{ height: 12 * s, background: "linear-gradient(180deg,#F6F1E7,#E8E0D0)", display: "flex", alignItems: "center", gap: 3 * s, paddingLeft: 6 * s }}>
          {["#E06C60", "#E6B44C", "#5CB463"].map((c, i) => (<div key={i} style={{ width: 4 * s, height: 4 * s, borderRadius: "50%", background: c }} />))}
        </div>
        <div style={{ position: "relative", height: h - 12 * s, background: "linear-gradient(135deg,#7C3AED,#A78BFA)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 * s }}>
          <div style={{ position: "absolute", top: 5 * s, right: 7 * s, display: "flex", gap: 5 * s }}>
            {[0, 1, 2].map((i) => (<div key={i} style={{ width: 11 * s, height: 2.4 * s, borderRadius: 2, background: "rgba(255,255,255,.6)" }} />))}
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 * s, color: "#fff", letterSpacing: -0.4 * s, textShadow: `0 ${1 * s}px ${3 * s}px rgba(60,20,110,.5)` }}>Your SaaS</div>
          <div style={{ padding: `${3.4 * s}px ${11 * s}px`, borderRadius: 20 * s, background: "#C4B5FD", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 6.4 * s, color: "#4C1D95" }}>Get Started</div>
        </div>
      </div>
    );
  };

  // ===================== THE GROWING PILE =====================
  // 3 already stacked at frame 0 (it has been churning), +1 on every pull.
  const jolt = PULLS.reduce((a, p) => {
    const d = lf - (p + EJECT + FLY);
    return d >= 0 && d < 15 ? Math.max(a, Math.cos(d * 0.85) * Math.exp(-d / 5)) : a;
  }, 0);
  const pileRest = (j: number) => ({ x: 92 + (seed(j * 1.9 + 4) * 2 - 1) * 7, y: 726 - j * 23, rot: (seed(j * 1.7 + 0.5) * 2 - 1) * 7 });
  const pileCards = Array.from({ length: 7 }).map((_, j) => {
    const rest = pileRest(j);
    const start = j < 3 ? -999 : PULLS[j - 3] + EJECT;
    if (start > -999 && lf < start) return null;
    const t = start > -999 ? over(lf, start, FLY, Easing.out(Easing.cubic)) : 1;
    const x = interpolate(t, [0, 1], [452, rest.x], clamp);
    const y = interpolate(t, [0, 1], [582, rest.y], clamp) - Math.sin(t * Math.PI) * 104 + jolt * 3 * (1 - j / 9);
    const rot = interpolate(t, [0, 1], [16, rest.rot], clamp) + Math.sin(lf * 0.05 + j * 0.9) * 0.6;
    const sc = interpolate(t, [0, 0.22, 1], [0.55, 1.08, 1], clamp);
    return (
      <div key={"pc" + j} style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${sc})`, zIndex: 10 + j }}>
        <SlopSite />
      </div>
    );
  });

  // ---- coin: one bought generation, in flight before every single pull ----
  const coins = PULLS.map((p, k) => {
    const s = p - 16;
    const t = over(lf, s, 18, Easing.inOut(Easing.cubic));
    if (lf < s || lf > s + 20) return null;
    const x = interpolate(t, [0, 1], [886, 640], clamp);
    const y = interpolate(t, [0, 1], [520, 184], clamp) - Math.sin(t * Math.PI) * 58;
    return (
      <div key={"cn" + k} style={{ position: "absolute", left: x, top: y, width: 28, height: 28, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #FFE9A8, #D79B2A)", border: "2px solid #a9761c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 13, color: "#6a4a12", boxShadow: "0 4px 10px rgba(0,0,0,.35), 0 0 10px rgba(255,215,120,.4)", transform: `rotate(${lf * 9}deg)`, zIndex: 8 }}>{"§"}</div>
    );
  });

  // ---- mascot: hope, slam, deflate, straight back to the lever ----
  const mCheer = phase >= 0 && phase < LOCK[2] ? interpolate(phase, [0, 4], [0.2, 0.85], clamp) : 0;
  const mShock = phase >= LOCK[2] ? Math.max(0, 1 - (phase - LOCK[2]) / 12) : 0;
  const mStern = phase >= LOCK[2] + 6 ? Math.min(1, (phase - LOCK[2] - 6) / 10) : 0;
  const mdx = (knobX - PIVX) * 0.3, mdy = (knobY - (PIVY - ARM)) * 0.45;
  const mLeft = 760 + mdx, mTop = 484 + mdy;
  const shX = mLeft + 30, shY = mTop + 74;
  const armLen = Math.hypot(knobX - shX, knobY - shY);
  const armAng = (Math.atan2(knobY - shY, knobX - shX) * 180) / Math.PI;

  const sitesOut = 3 + PULLS.filter((p) => lf >= p + EJECT).length;
  const trayGlow = PULLS.reduce((a, p) => Math.max(a, pulse(p + EJECT, 16)), 0);

  return (
    <Panel label="lovabolt-slots">
      {/* ============ LIT CASINO SET ============ */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#33141c 0%,#22101a 60%,#150a12 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(58% 40% at 50% 16%, rgba(226,168,74,${0.15 * keyBreathe}), rgba(0,0,0,0) 72%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(52% 34% at 50% 26%, rgba(150,110,255,${0.07 + 0.03 * Math.sin(lf * 0.06)}), rgba(0,0,0,0) 70%)` }} />

      {/* back wall: a dim drifting wall of the SAME purple site, forever */}
      {Array.from({ length: 16 }).map((_, i) => {
        const r = seed(i * 2.7 + 3);
        const col = i % 8, row = Math.floor(i / 8);
        const x = 8 + col * 128 + Math.sin(lf * 0.011 + i * 0.7) * 7 + ((lf * 0.12) % 128) - 64;
        const y = 176 + row * 74 + Math.cos(lf * 0.013 + i) * 4;
        return (
          <div key={"bw" + i} style={{ position: "absolute", left: x, top: y, width: 96, height: 58, borderRadius: 6, background: "linear-gradient(135deg,#7C3AED,#A78BFA)", border: "1px solid rgba(255,255,255,.14)", opacity: 0.1 + r * 0.09, filter: "blur(1.2px)" }}>
            <div style={{ position: "absolute", left: 30, top: 24, width: 36, height: 6, borderRadius: 3, background: "rgba(255,255,255,.5)" }} />
            <div style={{ position: "absolute", left: 36, top: 36, width: 24, height: 7, borderRadius: 4, background: "#C4B5FD" }} />
          </div>
        );
      })}

      {/* dim back-wall bandits near the horizon */}
      {[{ x: 34, ph: 0, t: "#341826" }, { x: 866, ph: 1.6, t: "#2f1524" }].map((b, i) => (
        <div key={"bc" + i} style={{ position: "absolute", left: b.x, top: 292 + Math.sin(lf * 0.05 + b.ph) * 4, width: 118, height: 200, borderRadius: 14, background: `linear-gradient(180deg,${b.t},#160b12)`, border: "2px solid rgba(201,162,75,.24)", opacity: 0.34, boxShadow: "0 24px 44px rgba(0,0,0,.5)" }}>
          <div style={{ position: "absolute", left: 15, top: 52, width: 88, height: 46, borderRadius: 6, background: "#120810", display: "flex", gap: 4, padding: 4 }}>
            {[0, 1, 2].map((k) => (<div key={k} style={{ flex: 1, borderRadius: 3, background: (Math.floor(lf / 9) + k + i) % 3 === 0 ? "linear-gradient(135deg,#7C3AED,#A78BFA)" : "#2a1626" }} />))}
          </div>
          <div style={{ position: "absolute", left: 20, top: 118, width: 78, height: 36, borderRadius: 6, background: "linear-gradient(180deg,#3a2a10,#241606)", border: "1px solid rgba(201,162,75,.28)" }} />
        </div>
      ))}

      {/* perspective floor */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "linear-gradient(180deg,#4a2130 0%,#1a0c14 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, opacity: 0.2, transform: `translateX(${(lf * 0.4) % 60}px)`, backgroundImage: "repeating-linear-gradient(45deg,#7C3AED 0 3px,transparent 3px 30px), repeating-linear-gradient(-45deg,#C9A24B 0 3px,transparent 3px 30px)", backgroundSize: "60px 60px", maskImage: "linear-gradient(180deg,transparent,#000 24%)", WebkitMaskImage: "linear-gradient(180deg,transparent,#000 24%)" }} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = (i - 5) / 5;
        const xTop = 506 + t * 70, xBot = 506 + t * 760;
        const ang = (Math.atan2(322, xBot - xTop) * 180) / Math.PI;
        return <div key={"fg" + i} style={{ position: "absolute", left: xTop, top: 470, width: 322 / Math.sin((ang * Math.PI) / 180), height: 2, transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: "rgba(226,168,74,0.10)" }} />;
      })}
      {[8, 26, 54, 96, 158, 246].map((dy, i) => {
        const w = 120 + dy * 3.4;
        return <div key={"fh" + i} style={{ position: "absolute", left: 506 - w / 2, top: 470 + dy, width: w, height: 2, background: `rgba(226,168,74,${0.14 - i * 0.014})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 469, height: 2, background: "rgba(240,196,120,0.42)", boxShadow: "0 0 26px rgba(230,180,100,0.5)" }} />

      {/* key light + floor pool */}
      <div style={{ position: "absolute", left: 264, top: 50, width: 412, height: 610, background: `linear-gradient(180deg,rgba(255,226,150,${0.2 * keyBreathe}),rgba(255,226,150,0.012) 82%)`, clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", filter: "blur(3px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 262, top: 574, width: 420, height: 132, borderRadius: "50%", background: `radial-gradient(ellipse,rgba(255,220,140,${0.22 * keyBreathe}),transparent 70%)`, pointerEvents: "none" }} />

      {/* cast shadows */}
      <div style={{ position: "absolute", left: 282, top: 604, width: 380, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.52),transparent 72%)", filter: "blur(4px)" }} />
      <div style={{ position: "absolute", left: mLeft - 10, top: 622, width: 178, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 70%)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: 56, top: 738, width: 210, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.55),transparent 72%)", filter: "blur(4px)", zIndex: 9 }} />

      {/* embers */}
      {Array.from({ length: 18 }).map((_, i) => {
        const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2);
        const x = 80 + r * 860;
        const y = (((seed(i * 2.3) * 760 - lf * (0.35 + r * 0.55)) % 760) + 760) % 760;
        const s = 2 + r * 3;
        return <div key={"at" + i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: `rgba(255,222,150,${(0.12 + r2 * 0.22).toFixed(2)})`, filter: "blur(0.5px)" }} />;
      })}
      {/* ============ /SET ============ */}

      {/* neon LOVABOLT marquee */}
      <div style={{ position: "absolute", left: 290, top: 62, width: 400, height: 68, borderRadius: 16, background: "linear-gradient(180deg,#241531,#160c1e)", border: "2px solid #4a2f6e", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: flick, boxShadow: `0 8px 24px rgba(124,58,237,${0.3 * flick})` }}>
        <div style={{ fontSize: 29, filter: `drop-shadow(0 0 6px rgba(167,139,250,${flick}))` }}>{"⚡"}</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 39, letterSpacing: 2, color: "#EBDDFF", textShadow: `0 0 10px rgba(167,139,250,${0.9 * flick}), 0 0 22px rgba(124,58,237,${0.6 * flick})` }}>LOVABOLT</div>
      </div>

      {/* cabinet */}
      <div style={{ position: "absolute", left: 250, top: 150, width: 440, height: 470, borderRadius: 22, background: "linear-gradient(180deg,#E7B94E,#B07A24)", border: "3px solid #7a5216", boxShadow: "0 26px 54px rgba(0,0,0,.5), inset 0 3px 8px rgba(255,240,200,.5), inset 0 -6px 16px rgba(90,55,10,.5)" }} />
      <div style={{ position: "absolute", left: 250, top: 150, width: 440, height: 470, borderRadius: 22, pointerEvents: "none", background: "linear-gradient(180deg,rgba(255,244,210,.5),rgba(255,244,210,0) 22%)", opacity: keyBreathe }} />
      <div style={{ position: "absolute", left: 264, top: 210, width: 412, height: 224, borderRadius: 16, background: "linear-gradient(180deg,#3a2a12,#231708)", border: "2px solid #7a5216", boxShadow: "inset 0 6px 16px rgba(0,0,0,.5)" }} />

      {/* RIGGED */}
      <div style={{ position: "absolute", left: 336, top: 162, width: 268, height: 40, borderRadius: 10, background: "linear-gradient(180deg,#7a1520,#4a0c14)", border: "2px solid #C0303C", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: `0 0 ${8 + 14 * rigFlash}px rgba(224,60,72,${rigFlash})` }}>
        {[0, 1, 2, 3].map((b) => (
          <div key={b} style={{ order: b < 2 ? 0 : 2, width: 11, height: 11, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #ffd0d0, #E03C48)", opacity: 0.35 + 0.65 * rigFlash, boxShadow: `0 0 ${6 * rigFlash}px #E03C48` }} />
        ))}
        <div style={{ order: 1, fontFamily: mono, fontWeight: 700, fontSize: 19, letterSpacing: 6, color: "#ffdada", opacity: 0.4 + 0.6 * rigFlash }}>RIGGED</div>
      </div>

      {reels}

      {/* coin slot (right cheek of the cabinet) */}
      <div style={{ position: "absolute", left: 620, top: 178, width: 44, height: 11, borderRadius: 6, background: "#150d06", border: "1.5px solid #7a5216", boxShadow: "inset 0 2px 4px rgba(0,0,0,.6)" }} />

      {/* payout LCD */}
      <div style={{ position: "absolute", left: 280, top: 442, width: 380, height: 42, borderRadius: 9, background: "#0b1a10", border: "2px solid #1f4a2c", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", boxShadow: "inset 0 3px 8px rgba(0,0,0,.6)" }}>
        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: "#3e8f5a" }}>PAYOUT</div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, letterSpacing: 2, color: rigOn ? "#5fe08a" : "#245c39", opacity: rigOn ? 0.6 + 0.4 * Math.abs(Math.sin(lf * 0.4)) : 0.5 }}>{`SAME SLOP ×${sitesOut}`}</div>
      </div>

      {/* chasing bulb rail (always running) */}
      {Array.from({ length: 11 }).map((_, i) => {
        const on = (Math.floor(lf * 0.22) + i) % 11;
        const g = on < 3 ? 1 - on / 3 : 0.14;
        return <div key={"bl" + i} style={{ position: "absolute", left: 292 + i * 36, top: 508, width: 14, height: 14, borderRadius: "50%", background: `radial-gradient(circle at 38% 32%, rgba(255,240,190,${0.4 + 0.6 * g}), #8a5f1c)`, border: "1px solid #6a4a12", boxShadow: `0 0 ${10 * g}px rgba(255,214,120,${g})` }} />;
      })}

      {/* payout tray: the sites come out here */}
      <div style={{ position: "absolute", left: 400, top: 578, width: 190, height: 24, borderRadius: 8, background: "linear-gradient(180deg,#150d06,#2a1a08)", border: "2px solid #7a5216", boxShadow: `inset 0 4px 10px rgba(0,0,0,.75), 0 0 ${18 * trayGlow}px rgba(167,139,250,${trayGlow})` }} />

      {/* losing-buzzer flash */}
      <div style={{ position: "absolute", left: 250, top: 150, width: 440, height: 470, borderRadius: 22, background: "rgba(224,60,72,1)", opacity: buzz * 0.28, pointerEvents: "none" }} />

      {/* lever */}
      <div style={{ position: "absolute", left: PIVX - 15, top: PIVY - 12, width: 30, height: 22, borderRadius: 8, background: "linear-gradient(180deg,#8a5f1c,#4a3210)", border: "2px solid #7a5216", zIndex: 2 }} />
      <div style={{ position: "absolute", left: PIVX, top: PIVY, transformOrigin: "0 0", transform: `rotate(${leverAngle}deg)`, zIndex: 3 }}>
        <div style={{ position: "absolute", left: -6, top: -ARM, width: 12, height: ARM, borderRadius: 6, background: "linear-gradient(90deg,#c9c9d2,#7d7d88)", boxShadow: "0 3px 8px rgba(0,0,0,.4)" }} />
      </div>
      <div style={{ position: "absolute", left: knobX - 21, top: knobY - 21, width: 42, height: 42, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #ff9a9a, #C0303C)", border: "2px solid #7a1520", boxShadow: "0 5px 12px rgba(0,0,0,.45), inset 0 2px 5px rgba(255,255,255,.4)", zIndex: 6 }} />

      {coins}

      {/* the gambler */}
      <div style={{ position: "absolute", left: mLeft, top: mTop, zIndex: 4 }}>
        <Mascot lf={lf} size={156} gaze={-12} nodAmp={3} nodSpeed={0.11} shock={mShock} cheer={mCheer} stern={mStern} shades={1} bowtie={1} tint="#C7643C" />
        <div style={{ position: "absolute", left: 32, top: 18, width: 92, height: 26, borderRadius: "50% 50% 46% 46%", background: "linear-gradient(180deg,#2f9e5a,#1c6d3c)", border: "2px solid #14522c", boxShadow: "0 3px 7px rgba(0,0,0,.3)" }} />
        <div style={{ position: "absolute", left: 36, top: 40, width: 84, height: 16, borderRadius: "0 0 40px 40px", background: "rgba(40,180,100,.4)", borderTop: "1px solid #14522c" }} />
      </div>
      {/* his arm, glued to the knob for every pull */}
      <div style={{ position: "absolute", left: shX, top: shY - 6, width: armLen, height: 13, borderRadius: 7, transformOrigin: "0 50%", transform: `rotate(${armAng}deg)`, background: "linear-gradient(180deg,#D9764A,#B14F2A)", border: "1.5px solid #8E3D20", boxShadow: "0 3px 7px rgba(0,0,0,.35)", zIndex: 5 }} />

      {/* the pile of identical sites */}
      {pileCards}

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.62)", borderRadius: 20 }} />
    </Panel>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

  // ---------- the five real tools (real logos, real star counts only) ----------
  const TOOLS = [
    { key: "21st", name: "21st.dev", url: "21st.dev", stars: "5,347", c: "#2E5BFF" },
    { key: "aceternity", name: "Aceternity UI", url: "ui.aceternity.com", stars: "", c: "#C6CCD8" },
    { key: "magicui", name: "Magic UI", url: "magicui.design", stars: "21,565", c: "#B98CF0" },
    { key: "mobbin", name: "Mobbin", url: "mobbin.com", stars: "", c: "#E4E4E4" },
    { key: "tweakcn", name: "tweakcn", url: "tweakcn.com", stars: "10,171", c: "#E7B24C" },
  ];
  const LAND = [40, 58, 76, 94, 114];          // each card snaps into the rack
  const DX = 578, DW = 304, DH = 100;          // rack geometry (right column)
  const dockTop = (i: number) => 100 + i * 124; // 100 224 348 472 596 -> bottom 696
  const CHEST = { x: 294, y: 536 };

  // ---------- taste climbs with every install, tops out at 130 ----------
  const taste = Math.min(100, LAND.reduce((a, s) => a + ramp(lf, s + 2, s + 16) * 20, 0));
  const tasteR = Math.round(taste);
  const maxed = taste >= 99.5;

  // ---------- hero-site upgrade levels: one per installed tool ----------
  const up = LAND.map((s) => ramp(lf, s + 4, s + 20));
  const p1 = up[0], p2 = up[1], p3 = up[2], p4 = up[3], p5 = up[4];
  const heroLeft = p4 > 0.5;

  // ---------- "A BETTER PROMPT" scroll: X'd out, then swatted away ----------
  const bob = Math.sin(lf / 7) * 4;
  const xDraw = over(lf, 8, 10, Easing.out(Easing.cubic));
  const toss = over(lf, 20, 16, Easing.in(Easing.cubic));
  const tossO = 1 - over(lf, 24, 7);

  // ---------- mascot ----------
  const swat = interpolate(lf, [10, 18, 28], [0, -13, 0], clamp);
  const stern = interpolate(lf, [4, 10, 24, 32], [0.2, 0.9, 0.9, 0], clamp);
  const cheer = ramp(lf, 116, 130) * 0.9;
  const pop = Math.max(...LAND.map((s) => Math.max(0, 1 - Math.abs(lf - (s + 14)) / 7)));
  const reactor = ramp(lf, LAND[0] + 12, LAND[0] + 24);
  const reactorPulse = 1 + Math.sin(lf / 4.5) * 0.07 * reactor + pop * 0.22;
  const twinkle = lf > 114 ? 0.5 + 0.5 * Math.sin(lf / 4) : 0;

  // ---------- set atmosphere (never stops moving) ----------
  const keyThrob = 0.9 + 0.1 * Math.sin(lf / 9);
  const poolBreath = 1 + 0.04 * Math.sin(lf / 7);
  const gridDrift = (lf * 1.1) % 44;

  // ---------- polish sweeps across the hero site ----------
  const sweepAt = (s: number) => {
    const t = ramp(lf, s + 4, s + 24);
    const on = lf >= s + 4 && lf <= s + 24 ? 1 : 0;
    return { x: lerp(-180, 560, t), o: on * Math.sin(t * Math.PI) * 0.55 };
  };
  const lateSweepX = -180 + (((lf - 130) * 13) % 760);
  const lateSweepO = lf > 130 ? 0.3 : 0;

  return (
    <Panel label="installing taste">
      {/* ================= SET: the taste workshop ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#132630 0%,#0e1a22 58%,#0a1218 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 30% 36%, rgba(70,150,175,0.20) 0%, rgba(0,0,0,0) 62%)" }} />

      {/* dim back-wall light strips (layer 1, drifting) */}
      {[62, 470, 878].map((x, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: x, top: 40, width: 86, height: 430, opacity: 0.07 + 0.03 * Math.sin(lf / 13 + i), background: "linear-gradient(180deg, rgba(150,230,245,0.9), rgba(150,230,245,0))", filter: "blur(9px)", transform: `translateY(${Math.sin(lf / 21 + i * 2) * 10}px)` }} />
      ))}

      {/* perspective floor + warm spill that grows with taste */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "linear-gradient(180deg,#20434c 0%,#0a1218 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, mixBlendMode: "screen", background: `radial-gradient(120% 90% at 29% 28%, rgba(231,178,76,${(0.05 + (taste / 100) * 0.16).toFixed(3)}) 0%, rgba(0,0,0,0) 60%)` }} />

      {/* receding floor grid (layer 2, drifting toward camera) */}
      <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={"v" + i} x1={506 + (i - 7) * 108} y1={792} x2={506} y2={470} stroke="rgba(120,205,220,0.15)" strokeWidth={1.3} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => {
          const yy = 476 + Math.pow(i + gridDrift / 44, 1.72) * 6.4 + i * i * 4.6;
          return yy < 790 ? <line key={"h" + i} x1={0} y1={yy} x2={1012} y2={yy} stroke="rgba(120,205,220,0.18)" strokeWidth={1.1} opacity={interpolate(yy, [476, 790], [0.26, 0.95], clamp)} /> : null;
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 469, height: 2, background: "rgba(150,230,240,0.42)", boxShadow: "0 0 26px rgba(140,220,235,0.5)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 430, height: 90, filter: "blur(6px)", background: "linear-gradient(180deg, rgba(120,205,220,0) 0%, rgba(120,205,220,0.10) 60%, rgba(120,205,220,0) 100%)" }} />

      {/* key light over the hero (layer 3, throbbing) */}
      <div style={{ position: "absolute", left: 134, top: 0, width: 320, height: 640, background: `linear-gradient(180deg, rgba(255,240,200,${(0.18 * keyThrob).toFixed(3)}), rgba(255,240,200,0.012) 84%)`, clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", filter: "blur(3px)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: 256, top: -6, width: 76, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#2b3b42,#15222a)", border: "1px solid rgba(150,230,240,0.25)", boxShadow: `0 8px 22px rgba(255,240,200,${(0.35 * keyThrob).toFixed(3)})`, zIndex: 1 }} />

      {/* floor pool, pad ring, cast shadow */}
      <div style={{ position: "absolute", left: 112, top: 578, width: 364, height: 118, borderRadius: "50%", transform: `scale(${poolBreath})`, background: `radial-gradient(ellipse, rgba(255,238,196,${(0.22 * keyThrob).toFixed(3)}) 0%, rgba(231,178,76,0.10) 42%, transparent 72%)`, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 172, top: 612, width: 244, height: 64, borderRadius: "50%", border: "2px solid rgba(255,232,180,0.26)", boxShadow: `0 0 22px rgba(255,232,180,${(0.2 * keyThrob).toFixed(3)}) inset`, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 204, top: 626, width: 180, height: 32, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", filter: "blur(3px)", zIndex: 1 }} />

      {/* motes rising through the light (layer 4) */}
      {Array.from({ length: 18 }).map((_, i) => {
        const r = seed(i * 3.1 + 7), r2 = seed(i * 5.7 + 2);
        const x = 30 + r * 950;
        const y = 770 - ((lf * (0.5 + r2 * 0.9) + r * 770) % 770);
        const sz = 3 + Math.round(r2 * 5);
        const cy = i % 3 === 0;
        return <div key={"pt" + i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: 2, opacity: 0.3, background: cy ? "rgba(120,220,235,0.55)" : "rgba(231,178,76,0.55)", boxShadow: cy ? "0 0 8px rgba(120,220,235,0.5)" : "0 0 8px rgba(231,178,76,0.4)", zIndex: 2 }} />;
      })}

      {/* ================= THE HERO SITE: same "Your SaaS", improving every install ================= */}
      <div style={{ position: "absolute", left: 52, top: 84, width: 486, height: 300, borderRadius: 18, overflow: "hidden", zIndex: 5, background: "#EDEBF2", border: `2px solid rgba(255,255,255,${0.1 + p5 * 0.14})`, boxShadow: `0 34px 60px -22px rgba(0,0,0,0.75), 0 0 ${18 + taste * 0.5}px rgba(231,178,76,${((taste / 100) * 0.35).toFixed(3)})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: p5 > 0.5 ? "#171A22" : "#DAD7E2" }}>
          <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map((d) => <div key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: p5 > 0.5 ? "#3A4150" : "#B7B2C4" }} />)}</div>
          <div style={{ width: 150, height: 12, borderRadius: 6, background: p5 > 0.5 ? "#232833" : "#C8C4D2" }} />
          <div style={{ width: 26 }} />
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 30, bottom: 0, overflow: "hidden" }}>
          {/* L0: flat purple AI slop */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)" }} />
          {/* L2: aceternity aurora (always drifting) */}
          <div style={{ position: "absolute", inset: 0, opacity: p2, background: "linear-gradient(160deg,#141A2E,#0B0F1C)" }}>
            <div style={{ position: "absolute", left: 40 + Math.sin(lf / 24) * 60, top: -60 + Math.cos(lf / 30) * 22, width: 300, height: 220, borderRadius: "50%", filter: "blur(46px)", background: "radial-gradient(circle, rgba(124,58,237,0.75), transparent 68%)" }} />
            <div style={{ position: "absolute", right: -30 + Math.cos(lf / 21) * 44, top: 90 + Math.sin(lf / 26) * 20, width: 260, height: 200, borderRadius: "50%", filter: "blur(46px)", background: "radial-gradient(circle, rgba(56,189,248,0.55), transparent 68%)" }} />
          </div>
          {/* L3: magic ui dot grid + looping beam */}
          <div style={{ position: "absolute", inset: 0, opacity: p3 * 0.5, backgroundImage: "radial-gradient(rgba(255,255,255,0.30) 1px, transparent 1px)", backgroundSize: "18px 18px", maskImage: "radial-gradient(80% 70% at 50% 45%, #000, transparent)", WebkitMaskImage: "radial-gradient(80% 70% at 50% 45%, #000, transparent)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: -140 + ((lf * 7) % 700), width: 120, opacity: p3 * 0.35, transform: "skewX(-18deg)", background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(190,230,255,0.9), rgba(255,255,255,0))", filter: "blur(7px)" }} />
          {/* L5: tweakcn theme pass */}
          <div style={{ position: "absolute", inset: 0, opacity: p5, background: "linear-gradient(160deg,#12141B 0%,#08090E 100%)" }}>
            <div style={{ position: "absolute", left: 30 + Math.sin(lf / 27) * 26, top: 26, width: 260, height: 180, borderRadius: "50%", filter: "blur(52px)", background: "radial-gradient(circle, rgba(231,178,76,0.34), transparent 66%)" }} />
            <div style={{ position: "absolute", inset: 0, borderTop: "1px solid rgba(231,178,76,0.28)" }} />
          </div>

          {/* nav: thin links -> real components (21st.dev) */}
          <div style={{ position: "absolute", left: 26, right: 26, top: 14, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: p5 > 0.5 ? "linear-gradient(180deg,#F2D385,#D89A2E)" : "rgba(255,255,255,0.75)", boxShadow: p5 > 0.5 ? "0 2px 8px rgba(231,178,76,0.5)" : "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{ width: interpolate(p1, [0, 1], [34, 30]), height: interpolate(p1, [0, 1], [6, 7]), borderRadius: 4, background: `rgba(255,255,255,${0.42 + p1 * 0.3})` }} />
              ))}
              <div style={{ width: interpolate(p1, [0, 1], [0, 62]), height: 24, borderRadius: interpolate(p5, [0, 1], [999, 8]), background: p5 > 0.5 ? "rgba(231,178,76,0.16)" : "rgba(255,255,255,0.22)", border: `1px solid rgba(255,255,255,${0.2 + p1 * 0.2})`, opacity: p1 }} />
            </div>
          </div>

          {/* headline block: centered slop -> real left-aligned layout (mobbin) */}
          <div style={{ position: "absolute", left: heroLeft ? 30 : 0, right: heroLeft ? 176 : 0, top: interpolate(p4, [0, 1], [86, 74]), display: "flex", flexDirection: "column", alignItems: heroLeft ? "flex-start" : "center", gap: 11, zIndex: 3 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: interpolate(p5, [0, 1], [32, 36]), letterSpacing: interpolate(p5, [0, 1], [0, -1]), color: p5 > 0.5 ? "#F5EFE3" : "#fff", textShadow: p2 > 0.4 ? "0 6px 24px rgba(0,0,0,0.5)" : "none", whiteSpace: "nowrap" }}>Your SaaS</div>
            <div style={{ width: interpolate(p3, [0, 1], [180, 220]), height: interpolate(p3, [0, 1], [8, 6]), borderRadius: 4, background: `rgba(255,255,255,${0.45 - p5 * 0.18})` }} />
            <div style={{ width: interpolate(p3, [0, 1], [0, 160]), height: 6, borderRadius: 4, opacity: p3, background: "rgba(255,255,255,0.26)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <div style={{ padding: `${interpolate(p1, [0, 1], [9, 10])}px 22px`, borderRadius: interpolate(p5, [0, 1], [999, 10]), background: p5 > 0.5 ? "linear-gradient(180deg,#F2D385,#D89A2E)" : p1 > 0.5 ? "linear-gradient(180deg,#CBBBFE,#B49BFA)" : "#C4B5FD", boxShadow: p1 > 0.5 ? `0 8px 18px -6px rgba(0,0,0,${0.4 + p5 * 0.3})` : "none", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: p5 > 0.5 ? "#1A1813" : "#4C1D95" }}>Get Started</div>
              <div style={{ width: interpolate(p4, [0, 1], [0, 96]), height: 36, borderRadius: interpolate(p5, [0, 1], [999, 10]), opacity: p4, border: `1.5px solid rgba(255,255,255,${0.24 + p5 * 0.1})`, background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 6, opacity: p3 }}>
              {[0, 1, 2].map((c) => (
                <div key={c} style={{ width: interpolate(p3, [0, 1], [0, 56]), height: 18, borderRadius: interpolate(p5, [0, 1], [999, 6]), background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }} />
              ))}
            </div>
          </div>

          {/* product preview column arrives with the layout pass */}
          <div style={{ position: "absolute", right: 24, top: 62, width: 138, height: 150, opacity: p4, transform: `translateX(${(1 - p4) * 46}px)`, borderRadius: interpolate(p5, [0, 1], [14, 10]), background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 16px 30px -14px rgba(0,0,0,0.7)", overflow: "hidden", zIndex: 3 }}>
            <div style={{ position: "absolute", left: 12, top: 12, width: 62, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ position: "absolute", left: 12, top: 30, right: 12, height: 62, borderRadius: 8, background: p5 > 0.5 ? "linear-gradient(150deg,rgba(231,178,76,0.35),rgba(231,178,76,0.06))" : "rgba(255,255,255,0.14)" }} />
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 12, top: 104 + r * 14, width: 100 - r * 22, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.28)" }} />
            ))}
          </div>

          {/* a polish sweep per upgrade, then a looping shine so the site never sits still */}
          {LAND.map((s, i) => {
            const sw = sweepAt(s);
            return sw.o > 0 ? <div key={"sw" + i} style={{ position: "absolute", top: -40, bottom: -40, left: sw.x, width: 150, opacity: sw.o, transform: "skewX(-16deg)", background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,255,255,0))", filter: "blur(9px)", zIndex: 4 }} /> : null;
          })}
          <div style={{ position: "absolute", top: -40, bottom: -40, left: lateSweepX, width: 130, opacity: lateSweepO, transform: "skewX(-16deg)", background: "linear-gradient(90deg, rgba(255,240,200,0), rgba(255,240,200,0.75), rgba(255,240,200,0))", filter: "blur(10px)", zIndex: 4 }} />
        </div>
      </div>

      {/* ================= THE MASCOT ================= */}
      <div style={{ position: "absolute", left: 176, top: 424, width: 236, height: 236, transformOrigin: "50% 100%", transform: `rotate(${swat}deg) scale(${1 + pop * 0.07})`, zIndex: 6 }}>
        <Mascot lf={lf} size={236} gaze={4} nodAmp={3} nodSpeed={10} stern={stern} cheer={cheer} beret={lf >= 78 ? 1 : 0} shades={lf >= 114 ? 1 : 0} tint={lf >= 78 ? CLAY : "#A9704F"} />
      </div>
      {/* the taste it has absorbed, glowing in the chest */}
      <div style={{ position: "absolute", left: CHEST.x - 27, top: CHEST.y - 27, width: 54, height: 54, borderRadius: "50%", opacity: reactor, transform: `scale(${reactorPulse})`, background: "radial-gradient(circle, #FFF7E4 0%, #F4D27A 40%, #D89A2E 72%, rgba(216,154,46,0) 100%)", boxShadow: `0 0 ${24 + pop * 30}px rgba(244,210,122,${(0.6 * reactor).toFixed(2)})`, zIndex: 7 }} />
      <div style={{ position: "absolute", left: 228, top: 448, opacity: twinkle, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, color: GOLD, textShadow: `0 0 12px ${GOLD}`, zIndex: 8 }}>&#10022;</div>

      {/* ================= TASTE STREAM: every installed card keeps pouring into the mascot ================= */}
      {TOOLS.map((t, i) => {
        const start = LAND[i] + 10;
        if (lf < start) return null;
        const a = { x: DX - 4, y: dockTop(i) + DH / 2 };
        const b = { x: 520, y: 706 };
        const c = CHEST;
        return Array.from({ length: 3 }).map((_, k) => {
          const period = 30;
          const raw = lf - start + k * 10;
          if (raw < 0) return null;
          const u = (raw % period) / period;
          const iu = 1 - u;
          const x = iu * iu * a.x + 2 * iu * u * b.x + u * u * c.x;
          const y = iu * iu * a.y + 2 * iu * u * b.y + u * u * c.y;
          const o = Math.min(1, u * 6) * Math.min(1, iu * 5);
          return <div key={"cp" + i + "_" + k} style={{ position: "absolute", left: x - 8, top: y - 8, width: 16, height: 16, borderRadius: 5, opacity: o, transform: `scale(${1 - u * 0.5}) rotate(${u * 180}deg)`, background: t.c, border: "1px solid rgba(255,255,255,0.55)", boxShadow: `0 0 12px ${t.c}`, zIndex: 8 }} />;
        });
      })}

      {/* ================= THE RACK: five real tool cards flying in one by one ================= */}
      {TOOLS.map((t, i) => {
        const s = LAND[i];
        if (lf < s - 17) return null;
        const p = over(lf, s - 16, 16, Easing.out(Easing.cubic));
        const left = lerp(1064, DX, p);
        const sc = lf < s ? 1 : interpolate(lf, [s, s + 4, s + 11], [1.06, 0.96, 1], clamp);
        const moving = p < 0.99;
        const settleGlow = 0.5 + 0.5 * Math.sin(lf / 8 + i);
        return (
          <div key={"tc" + i} style={{ position: "absolute", left, top: dockTop(i), width: DW, height: DH, transform: `scale(${sc})`, filter: `blur(${(1 - p) * 5}px)`, opacity: ramp(lf, s - 16, s - 13), zIndex: 9 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "linear-gradient(180deg, rgba(38,45,60,0.98), rgba(18,23,32,0.98))", border: `1.6px solid rgba(231,178,76,${moving ? 0.95 : 0.5 + settleGlow * 0.25})`, boxShadow: moving ? `0 0 30px ${GOLD}, 0 14px 26px -12px rgba(0,0,0,0.8)` : `0 0 ${10 + settleGlow * 10}px rgba(231,178,76,0.35), 0 12px 24px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)`, display: "flex", alignItems: "center", gap: 14, padding: "0 16px" }}>
              <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: "linear-gradient(180deg,#FFFFFF,#E9E6DE)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Img src={staticFile(`refs/tool_${t.key}_logo.png`)} style={{ width: 44, height: 44, objectFit: "contain" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: "-0.01em", color: "#EDF2FA", whiteSpace: "nowrap" }}>{t.name}</div>
                {t.stars ? (
                  <div style={{ alignSelf: "flex-start", padding: "3px 10px", borderRadius: 999, background: "rgba(231,178,76,0.14)", border: "1px solid rgba(231,178,76,0.5)", fontFamily: mono, fontWeight: 700, fontSize: 14, color: "#F2D385", whiteSpace: "nowrap" }}>{"★ " + t.stars}</div>
                ) : (
                  <div style={{ fontFamily: mono, fontSize: 14, color: "rgba(170,195,220,0.65)", whiteSpace: "nowrap" }}>{t.url}</div>
                )}
              </div>
            </div>
            <div style={{ position: "absolute", inset: -6, borderRadius: 20, background: "rgba(255,246,220,0.9)", opacity: Math.max(0, 1 - Math.abs(lf - s) / 4) * 0.5, filter: "blur(8px)", pointerEvents: "none" }} />
          </div>
        );
      })}

      {/* ================= TASTE METER ================= */}
      <div style={{ position: "absolute", left: 900, top: 100, width: 72, height: 596, borderRadius: 18, background: "linear-gradient(180deg, rgba(30,26,18,0.94), rgba(16,14,10,0.97))", border: `2px solid ${GOLD}`, boxShadow: `0 20px 40px -18px rgba(0,0,0,0.75), inset 0 0 30px rgba(231,178,76,${(0.05 + (taste / 100) * 0.16).toFixed(3)})`, overflow: "hidden", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 14, letterSpacing: "0.18em", color: GOLD }}>TASTE</div>
        {Array.from({ length: 10 }).map((_, i) => {
          const thr = (i + 1) * 10;
          const lit = taste >= thr - 0.5;
          const fresh = lit && taste < thr + 10;
          const shine = maxed && ((lf * 1.4 + i * 4) % 22) < 5;
          const yy = 540 - (i + 1) * 44 - i * 6;
          return <div key={"sg" + i} style={{ position: "absolute", left: 12, top: yy, width: 48, height: 44, borderRadius: 8, background: lit ? (shine ? "linear-gradient(180deg,#FFF6DC,#F2D385)" : "linear-gradient(180deg,#F4D27A,#D89A2E)") : "rgba(255,255,255,0.05)", border: `1.5px solid ${lit ? "#F6E4A0" : "rgba(231,178,76,0.18)"}`, boxShadow: lit ? (fresh || shine ? `0 0 18px ${GOLD}` : "0 0 8px rgba(231,178,76,0.4)") : "none" }} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 552, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 18, color: maxed ? "#FFF6DC" : GOLD, textShadow: maxed ? `0 0 12px ${GOLD}` : "none" }}>{tasteR}</div>
      </div>

      {/* ================= "A BETTER PROMPT": X'd out and swatted away ================= */}
      {lf <= 32 && (
        <div style={{ position: "absolute", left: 570, top: 172, width: 330, height: 420, transformOrigin: "50% 0%", opacity: tossO, transform: `translate(${toss * 460}px, ${bob * (1 - toss) + toss * toss * 700}px) rotate(${-3 + toss * 52}deg) scale(${1 - toss * 0.24})`, zIndex: 12 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden", background: "linear-gradient(180deg,#F5EFE1,#E2D6BC)", border: "2px solid #C9B98F", boxShadow: "0 30px 56px -20px rgba(0,0,0,0.75)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: "linear-gradient(180deg,#D8C89E,#C4B180)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 44, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "-0.01em", color: "#6B5A32" }}>A BETTER PROMPT</div>
            <div style={{ position: "absolute", left: 26, right: 26, top: 100 }}>
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} style={{ height: 9, width: `${42 + seed(i * 2.3 + 1) * 55}%`, borderRadius: 4, background: "rgba(107,90,50,0.30)", margin: "12px 0" }} />
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(0,0,0,0.08) 60%)", pointerEvents: "none" }} />
          </div>
          <svg width={330} height={420} viewBox="0 0 330 420" style={{ position: "absolute", left: 0, top: 0 }}>
            <line x1={52} y1={70} x2={278} y2={356} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={370} strokeDashoffset={370 * (1 - Math.min(1, xDraw * 2))} opacity={0.92} />
            <line x1={278} y1={70} x2={52} y2={356} stroke={RED} strokeWidth={20} strokeLinecap="round" strokeDasharray={370} strokeDashoffset={370 * (1 - Math.max(0, xDraw * 2 - 1))} opacity={0.92} />
          </svg>
        </div>
      )}

      {/* payoff sparks (still bursting on the final frame) */}
      <Firework lf={lf} at={122} x={294} y={470} hue={2} />
      <Firework lf={lf} at={138} x={340} y={520} hue={1} />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.62)", zIndex: 20 }} />
    </Panel>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

  // ---------- geometry ----------
  const PX = 362, PY = 152, PW = 288, PH = 556;          // phone body
  const SX = PX + 12, SY = PY + 42, SW = PW - 24;        // screen
  const ROW_W = SW - 24, ROW_TOP = 316, ROW_PITCH = 70, ROW_H = 60;
  const ORB_CX = 506, ORB_CY = 672, ORB_RX = 330, ORB_RY = 58;

  // ---------- the 5 saved tools (real marks) ----------
  const TOOLS = [
    { n: "21st.dev", u: "21st.dev", f: "refs/tool_21st_logo.png", pad: 0 },
    { n: "Aceternity UI", u: "ui.aceternity.com", f: "refs/tool_aceternity_logo.png", pad: 0 },
    { n: "Magic UI", u: "magicui.design", f: "refs/tool_magicui_logo.png", pad: 0 },
    { n: "Mobbin", u: "mobbin.com", f: "refs/tool_mobbin_logo.png", pad: 5 },
    { n: "tweakcn", u: "tweakcn.com", f: "refs/tool_tweakcn_logo.png", pad: 4 },
  ];

  // ---------- continuous beat map (129f, nothing idles) ----------
  const LAUNCH = [34, 52, 70, 88, 106];          // an envelope leaves the satchel...
  const LAND = LAUNCH.map((t) => t + 15);        // ...and thunks a tool into the phone (49,67,85,103,121)
  const FLIGHT = 15;

  const stampP = over(lf, 6, 10, Easing.out(Easing.back(2.6)));      // SAVE thumps onto the card
  const inkP = over(lf, 15, 16);                                     // ink shock ring
  const smack = Math.max(0, 1 - Math.abs(lf - 16) / 5);              // stamp impact squash
  const fly = over(lf, 18, 16, Easing.inOut(Easing.cubic));          // card whooshes into the phone
  const cardO = 1 - over(lf, 30, 6);
  const pin = over(lf, 30, 12, Easing.out(Easing.back(2)));          // card lands as the pinned header
  const rib = over(lf, 40, 16, Easing.out(Easing.back(1.7)));        // bookmark ribbon drops
  const cheer = over(lf, 14, 10);

  // phone buzz: one kick per delivery, decaying, and it fires again at f121
  const buzz = LAND.reduce((a, t) => a + Math.max(0, 1 - Math.abs(lf - t) / 7) * Math.sin((lf - t) * 1.9), 0);
  const landed = LAND.filter((t) => lf >= t).length;
  const warm = landed / 5;                                            // the hero site gets lit a little per save
  const breathe = 0.72 + 0.28 * Math.sin(lf * 0.14);                  // screen glow, never stops
  const lamp = 0.93 + 0.05 * Math.sin(lf * 0.5) + 0.03 * Math.sin(lf * 1.7 + 1);

  // ---------- card flight ----------
  const cx = lerp(232, 506, fly);
  const cy = lerp(330, 268, fly) - Math.sin(fly * Math.PI) * 66 + Math.sin(lf * 0.18) * 3 * (1 - fly);
  const csc = lerp(0.86, 0.44, fly) * (1 - smack * 0.05);
  const crot = lerp(-6, 0, fly);

  // ---------- retro floppy glyph ----------
  const floppy = (s: number, face: string, sleeve: string) => (
    <div style={{ position: "relative", width: s, height: s, borderRadius: s * 0.14, flexShrink: 0,
      background: `linear-gradient(150deg, ${face}, ${sleeve})`, border: "1px solid rgba(0,0,0,0.42)",
      boxShadow: "0 3px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.14)" }}>
      <div style={{ position: "absolute", left: s * 0.16, top: s * 0.1, right: s * 0.16, height: s * 0.28, background: "#efe6cf", borderRadius: s * 0.03 }} />
      <div style={{ position: "absolute", right: s * 0.24, top: s * 0.13, width: s * 0.12, height: s * 0.22, background: face, borderRadius: 1 }} />
      <div style={{ position: "absolute", left: s * 0.2, top: s * 0.5, right: s * 0.2, bottom: s * 0.12, background: "#e8dfc8", borderRadius: s * 0.03 }} />
    </div>
  );

  // ---------- logo tile (white chip keeps the real marks legible) ----------
  const logoTile = (f: string, s: number, pad: number) => (
    <div style={{ width: s, height: s, borderRadius: s * 0.26, flexShrink: 0, position: "relative",
      background: "linear-gradient(160deg, #FFFFFF, #EDE7DA)", border: "1px solid rgba(90,70,44,0.28)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.34), inset 0 1px 2px rgba(255,255,255,0.9)", overflow: "hidden" }}>
      <Img src={staticFile(f)} style={{ position: "absolute", left: 4 + pad, top: 4 + pad, width: s - 8 - pad * 2, height: s - 8 - pad * 2, objectFit: "contain" }} />
    </div>
  );

  return (
    <Panel label="note-to-self">
      {/* ================= SET: cozy night desk under one pendant lamp ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #241d16 0%, #1a140f 60%, #0f0b08 100%)" }} />
      <div style={{ position: "absolute", left: 216, top: -60, width: 580, height: 470,
        background: "radial-gradient(60% 60% at 50% 60%, rgba(224,176,104,0.17), transparent 72%)", opacity: lamp, filter: "blur(4px)" }} />

      {/* desk plane + receding grid (vanishing point under the phone) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 452, bottom: 0, background: "linear-gradient(180deg, #3a2c1c 0%, #221912 46%, #120d09 100%)" }} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = (i - 5) / 5;
        const xTop = 506 + t * 66, xBot = 506 + t * 780;
        const ang = Math.atan2(340, xBot - xTop) * 180 / Math.PI;
        return <div key={`fg-${i}`} style={{ position: "absolute", left: xTop, top: 452, width: 340 / Math.sin(ang * Math.PI / 180), height: 2,
          transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: "rgba(214,180,120,0.09)" }} />;
      })}
      {[8, 26, 52, 92, 152, 236].map((dy, i) => {
        const w = 130 + dy * 3.5;
        return <div key={`fh-${i}`} style={{ position: "absolute", left: 506 - w / 2, top: 452 + dy, width: w, height: 2,
          background: `rgba(214,180,120,${(0.11 - i * 0.012).toFixed(3)})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 451, height: 2, background: "rgba(232,190,120,0.4)",
        boxShadow: "0 0 30px rgba(224,176,104,0.55)", opacity: lamp }} />

      {/* volumetric beam onto the phone (lamp fixture removed: the top belongs to the header now) */}
      <div style={{ position: "absolute", left: 346, top: 140, width: 320, height: 560,
        background: "linear-gradient(180deg, rgba(255,224,168,0.24), rgba(255,224,168,0.02) 82%)",
        clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)", filter: "blur(3px)", opacity: lamp }} />
      <div style={{ position: "absolute", left: 416, top: 140, width: 180, height: 524,
        background: "linear-gradient(180deg, rgba(255,240,204,0.24), rgba(255,240,204,0.015) 78%)",
        clipPath: "polygon(42% 0, 58% 0, 92% 100%, 8% 100%)", filter: "blur(6px)", opacity: lamp }} />

      {/* ===================== HEADER: "SAVE THIS" (matches the S0 header chassis) ===================== */}
      <div style={{ position: "absolute", left: 506, top: 58, transform: `translateX(-50%) scale(${(1 + Math.max(0, 1 - lf / 8) * 0.14).toFixed(3)})`, transformOrigin: "50% 0%", zIndex: 24 }}>
        <div style={{ position: "relative", overflow: "hidden", padding: "10px 30px", borderRadius: 16,
          background: "linear-gradient(160deg,#1C2542 0%,#0D1426 100%)",
          border: "2px solid rgba(231,178,76,0.42)",
          boxShadow: "0 24px 48px -16px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.10)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, lineHeight: 1.04, color: CREAM, letterSpacing: -0.6, whiteSpace: "nowrap" }}>SAVE THIS</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, lineHeight: 1.06, color: GOLD, letterSpacing: 0.6, whiteSpace: "nowrap",
            textShadow: "0 2px 10px rgba(231,178,76,0.35)" }}>SEND IT TO YOURSELF</div>
          {/* endless gold shimmer sweep */}
          <div style={{ position: "absolute", left: ((lf * 9) % 620) - 150, top: -30, width: 90, height: 160, transform: "rotate(16deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.16), transparent)", filter: "blur(3px)" }} />
        </div>
      </div>

      {/* light pool + cast shadows on the desk */}
      <div style={{ position: "absolute", left: 286, top: 630, width: 440, height: 160, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,228,172,0.30), transparent 68%)", opacity: lamp, filter: "blur(2px)" }} />
      <div style={{ position: "absolute", left: 506, top: 690, width: 320, height: 46, borderRadius: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.58), transparent 72%)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: 152, top: 542, width: 190, height: 34, borderRadius: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: 860, top: 556, width: 210, height: 34, borderRadius: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.48), transparent 70%)", filter: "blur(3px)" }} />

      {/* warm dust drifting up through the beam */}
      {Array.from({ length: 22 }).map((_, i) => {
        const r = seed(i * 3.1 + 7);
        const x = 46 + r * 920;
        const y = ((seed(i * 2.3) * 780 - lf * (0.45 + r * 0.8)) % 780 + 780) % 780;
        const lit = x > 356 && x < 656 ? 1.7 : 1;
        return <div key={`at-${i}`} style={{ position: "absolute", left: x, top: y, width: 2 + r * 3, height: 2 + r * 3, borderRadius: "50%",
          background: `rgba(255,226,168,${(0.08 + r * 0.16 * lit).toFixed(2)})` }} />;
      })}

      {/* ================= THE HERO SITE ("Your SaaS") waiting on the desk, lit a bit more per save ================= */}
      <div style={{ position: "absolute", left: 860, top: 486, width: 214, height: 150, zIndex: 3,
        transform: `translate(-50%,-50%) rotate(${(6 - warm * 3.4).toFixed(2)}deg) translateY(${(Math.sin(lf * 0.07) * 2).toFixed(2)}px)` }}>
        <div style={{ position: "absolute", left: -16, top: -16, right: -16, bottom: -16, borderRadius: 22,
          background: `radial-gradient(ellipse, rgba(255,214,140,${(0.06 + warm * 0.2).toFixed(3)}), transparent 70%)`, filter: "blur(4px)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden", background: "#EDEBF2",
          border: "1px solid rgba(214,180,120,0.24)", boxShadow: "0 18px 34px -14px rgba(0,0,0,0.7)", opacity: 0.42 + warm * 0.34 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: "#DAD7E2",
            display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
            <div style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map((d) => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#B7B2C4" }} />)}</div>
            <div style={{ display: "flex", gap: 8 }}>{[0, 1, 2].map((d) => <div key={d} style={{ width: 24, height: 4, borderRadius: 2, background: "#B7B2C4" }} />)}</div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 22, bottom: 0, background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#fff" }}>Your SaaS</div>
            <div style={{ width: 104, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.45)" }} />
            <div style={{ marginTop: 2, padding: "5px 13px", borderRadius: 999, background: "#C4B5FD", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10, color: "#4C1D95" }}>Get Started</div>
          </div>
        </div>
      </div>

      {/* ================= ORBITING TOOL GLYPHS: circle the phone on the desk plane, forever ================= */}
      {[...TOOLS, ...TOOLS].map((t, i) => {
        const n = TOOLS.length * 2;
        const a = lf * 0.026 + (i / n) * Math.PI * 2;
        const s = Math.sin(a);
        const x = ORB_CX + Math.cos(a) * ORB_RX;
        const y = ORB_CY + s * ORB_RY;
        const d = (s + 1) / 2;                               // 1 = nearest the camera
        const size = 30 + d * 26;
        const front = s > 0;
        return (
          <React.Fragment key={`orb-${i}`}>
            <div style={{ position: "absolute", left: x, top: y + size * 0.6, width: size * 1.1, height: size * 0.3, borderRadius: "50%",
              transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 72%)", filter: "blur(3px)",
              opacity: 0.3 + d * 0.4, zIndex: front ? 12 : 2 }} />
            <div style={{ position: "absolute", left: x, top: y, zIndex: front ? 13 : 2,
              transform: `translate(-50%,-50%) translateY(${(Math.sin(lf * 0.09 + i) * 3).toFixed(2)}px) rotate(${(Math.sin(lf * 0.05 + i) * 6).toFixed(2)}deg)`,
              opacity: 0.36 + d * 0.62, filter: front ? "none" : "blur(0.6px)" }}>
              {logoTile(t.f, size, t.pad * (size / 46))}
            </div>
          </React.Fragment>
        );
      })}

      {/* ================= THE PHONE ================= */}
      <div style={{ position: "absolute", left: PX, top: PY, width: PW, height: PH, zIndex: 8,
        transform: `translate(${(buzz * 3).toFixed(2)}px, ${(smack * 3).toFixed(2)}px) rotate(${(buzz * 0.45).toFixed(2)}deg)` }}>
        <div style={{ position: "absolute", left: -54, top: -46, right: -54, bottom: -46, borderRadius: 90,
          background: `radial-gradient(ellipse, rgba(255,224,164,${(0.1 + breathe * 0.13 + landed * 0.012).toFixed(3)}), transparent 68%)`, filter: "blur(6px)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, background: "linear-gradient(160deg, #2c2924, #16140e)", borderRadius: 44,
          border: "3px solid rgba(214,180,120,0.3)", boxShadow: "0 34px 64px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", left: -1, top: 34, width: 4, height: 470, borderRadius: 4,
          background: "linear-gradient(180deg, rgba(255,226,168,0.6), rgba(255,226,168,0.05))", filter: "blur(1.5px)", opacity: lamp }} />
        <div style={{ position: "absolute", left: "50%", top: 14, transform: "translateX(-50%)", width: 92, height: 18, background: "#0d0b09", borderRadius: 12 }} />
      </div>

      {/* ---- screen contents (own layer, rides the buzz) ---- */}
      <div style={{ position: "absolute", left: SX, top: SY, width: SW, height: 500, borderRadius: 32, overflow: "hidden", zIndex: 9,
        background: "linear-gradient(180deg, #F7F3EA, #ece3d0)",
        transform: `translate(${(buzz * 3).toFixed(2)}px, ${(smack * 3).toFixed(2)}px)` }}>
        {/* chat header */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 50, background: `linear-gradient(180deg, ${CLAY}, #7c4a2c)`,
          display: "flex", alignItems: "center", padding: "0 14px", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.28)" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${GOLD}, ${CLAY})`,
            border: "2px solid rgba(255,255,255,0.35)", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", left: 8, top: 11, width: 4, height: 4, borderRadius: "50%", background: "#1a120c" }} />
            <div style={{ position: "absolute", right: 8, top: 11, width: 4, height: 4, borderRadius: "50%", background: "#1a120c" }} />
          </div>
          <div style={{ lineHeight: 1.12 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "#fff" }}>Note to Self</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.72)" }}>you • only you</div>
          </div>
        </div>

        {/* the card, landed and pinned */}
        <div style={{ position: "absolute", left: 12, top: 58, width: SW - 24, height: 54, opacity: pin,
          transform: `translateY(${((1 - pin) * -14).toFixed(2)}px) scale(${(0.86 + pin * 0.14).toFixed(3)})`, transformOrigin: "50% 0%",
          background: `linear-gradient(150deg, ${GOLD} 0%, ${AMBER} 60%, ${CLAY} 100%)`, borderRadius: 14, border: "1.5px solid rgba(120,72,36,0.6)",
          boxShadow: "0 8px 18px rgba(0,0,0,0.34), inset 0 2px 3px rgba(255,255,255,0.36)",
          display: "flex", alignItems: "center", gap: 10, padding: "0 12px" }}>
          {floppy(28, "#2c2824", "#17140f")}
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 19, color: "#1c140c", flex: 1, whiteSpace: "nowrap" }}>5 design tools</div>
          <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: "#f4ffe9",
            background: `linear-gradient(160deg, ${GREEN}, #2f6b40)`, border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 6,
            padding: "4px 7px", transform: "rotate(-7deg)", boxShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>SAVED</div>
        </div>

        {/* five slots, filled one delivery at a time (screen-local coords) */}
        {TOOLS.map((t, i) => {
          const top = ROW_TOP - SY + i * ROW_PITCH;
          const slotP = over(lf, -8 + i * 3, 10);
          const rp = over(lf, LAND[i], 10, Easing.out(Easing.back(2)));
          const shine = (lf * 0.014 + i * 0.17) % 1;
          return (
            <React.Fragment key={`row-${i}`}>
              <div style={{ position: "absolute", left: 12, top, width: ROW_W, height: ROW_H, borderRadius: 12, opacity: slotP * (1 - rp),
                border: "1.5px dashed rgba(120,95,60,0.4)", background: "rgba(120,95,60,0.06)" }} />
              <div style={{ position: "absolute", left: 12, top, width: ROW_W, height: ROW_H, borderRadius: 12, opacity: rp, overflow: "hidden",
                transform: `translateX(${((1 - rp) * 26).toFixed(2)}px) scale(${(0.9 + rp * 0.1).toFixed(3)})`,
                background: "linear-gradient(160deg, #FFFDF7, #EEE5D2)", border: "1.5px solid rgba(120,95,60,0.3)",
                boxShadow: "0 6px 14px -6px rgba(60,40,20,0.6), inset 0 1px 0 rgba(255,255,255,0.9)",
                display: "flex", alignItems: "center", gap: 10, padding: "0 10px" }}>
                {logoTile(t.f, 40, t.pad)}
                <div style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "#231b12", whiteSpace: "nowrap" }}>{t.n}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(80,62,40,0.72)", whiteSpace: "nowrap" }}>{t.u}</div>
                </div>
                <div style={{ fontSize: 15, color: GREEN, fontWeight: 900, transform: `scale(${(0.5 + rp * 0.5).toFixed(2)})` }}>✓</div>
                {/* slow shine keeps the saved list alive */}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: -60, width: 60,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                  transform: `translateX(${(shine * (ROW_W + 60)).toFixed(1)}px) skewX(-14deg)`, opacity: 0.5 }} />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* ---- SHORT bookmark tab on the phone rim (was a 250px ribbon, way too long) ---- */}
      <div style={{ position: "absolute", left: 626, top: 140, width: 30, height: 54 * rib, zIndex: 14, opacity: rib > 0.02 ? 1 : 0,
        transformOrigin: "50% 0%", transform: `translateX(${(buzz * 2).toFixed(2)}px)` }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, #8a3f28, ${CLAY} 55%, #a4573a)`,
          borderRadius: "4px 4px 0 0", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.7), inset 1px 0 0 rgba(255,255,255,0.22)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: GOLD, opacity: 0.75 }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -13, height: 14, background: `linear-gradient(100deg, #8a3f28, ${CLAY} 55%, #a4573a)`,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 40%, 0 100%)" }} />
      </div>

      {/* ---- ANIMATED SAVE badge (top-right): bookmark stamps + ring pulses, forever ---- */}
      {(() => {
        const beat = 32;                                  // a save pulse ~every 1.07s, never stops
        const ph = (lf % beat) / beat;
        const pop = Math.max(0, 1 - ph * 5.5);            // quick stamp on each beat
        const ring = ph < 0.55 ? ph / 0.55 : 0;
        const saves = 1 + Math.floor(lf / beat);
        return (
          <div style={{ position: "absolute", left: 792, top: 96, width: 176, height: 82, zIndex: 22 }}>
            {ring > 0 && (
              <div style={{ position: "absolute", left: 88, top: 41, width: 44, height: 44, marginLeft: -22, marginTop: -22, borderRadius: "50%",
                border: `3px solid rgba(231,178,76,${(0.55 * (1 - ring)).toFixed(2)})`, transform: `scale(${1 + ring * 2.6})` }} />
            )}
            <div style={{ position: "absolute", inset: 0, borderRadius: 15, transform: `scale(${(1 + pop * 0.07).toFixed(3)})`,
              background: "linear-gradient(160deg,#1C2542 0%,#0D1426 100%)",
              border: `2px solid rgba(231,178,76,${(0.42 + pop * 0.45).toFixed(2)})`,
              boxShadow: `0 16px 32px -12px rgba(0,0,0,0.75), 0 0 ${(10 + pop * 22).toFixed(0)}px rgba(231,178,76,${(0.18 + pop * 0.34).toFixed(2)})`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <svg viewBox="0 0 24 32" width={21} height={28} style={{ transform: `translateY(${(-pop * 3).toFixed(1)}px)`, overflow: "visible" }}>
                <path d="M2 2 h20 v28 l-10 -8 -10 8 z" fill={GOLD} stroke="#F6E4A0" strokeWidth={1.6} strokeLinejoin="round" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, color: CREAM, letterSpacing: "0.03em" }}>SAVED</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: "rgba(231,178,76,0.9)", marginTop: 3 }}>x{saves}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ================= COURIER MASCOT: sends it to you, five times ================= */}
      <div style={{ position: "absolute", left: 152, top: 470, width: 0, height: 0, zIndex: 6,
        transform: `translate(-50%,-50%) translateY(${(Math.sin(lf * 0.16) * 3).toFixed(2)}px)` }}>
        <div style={{ position: "absolute", left: -6, top: -84, width: 168, height: 180, borderRadius: "50%",
          background: "radial-gradient(45% 55% at 66% 46%, rgba(255,214,150,0.34), transparent 70%)", filter: "blur(6px)", opacity: lamp }} />
        <div style={{ position: "absolute", left: 52, top: -52, width: 7, height: 96, borderRadius: 6,
          background: "linear-gradient(180deg, rgba(255,224,164,0.75), rgba(255,200,130,0.15))", filter: "blur(2px)", opacity: lamp }} />
        <div style={{ position: "absolute", left: -78, top: -78 }}>
          <Mascot lf={lf} size={156} gaze={7} nodAmp={2} nodSpeed={9} cheer={cheer} />
        </div>
        <div style={{ position: "absolute", left: -37, top: -70, width: 74, height: 34, background: `linear-gradient(160deg, ${AMBER}, ${CLAY})`,
          borderRadius: "34px 34px 10px 10px", border: "2px solid rgba(0,0,0,0.25)", boxShadow: "0 3px 7px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", left: 8, top: -40, width: 44, height: 12, background: `linear-gradient(180deg, ${CLAY}, #6e3f27)`,
          borderRadius: 6, transform: "rotate(-8deg)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
        {/* satchel: the flap kicks open on every send */}
        <div style={{ position: "absolute", left: 26, top: 22, width: 40, height: 36, background: "linear-gradient(160deg, #8a532f, #5f3820)",
          borderRadius: 6, border: "2px solid rgba(0,0,0,0.28)", boxShadow: "0 3px 7px rgba(0,0,0,0.32)" }}>
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: "44%", transformOrigin: "50% 0%",
            transform: `rotateX(${(LAUNCH.reduce((a, t) => Math.max(a, Math.max(0, 1 - Math.abs(lf - t) / 6)), 0) * 70).toFixed(1)}deg)`,
            background: `linear-gradient(180deg, ${AMBER}, #9a6437)`, borderRadius: "5px 5px 0 0" }} />
        </div>
      </div>

      {/* ================= ENVELOPES: satchel -> phone, one per tool, still flying at the last frame ================= */}
      {TOOLS.map((t, i) => {
        const p = over(lf, LAUNCH[i], FLIGHT, Easing.inOut(Easing.cubic));
        const gone = over(lf, LAND[i], 3);
        if (p <= 0) return null;
        const ty = ROW_TOP + i * ROW_PITCH + ROW_H / 2;
        const arc = 150 - i * 12;
        const ex = lerp(214, 506, p);
        const ey = lerp(452, ty, p) - Math.sin(p * Math.PI) * arc;
        const es = (0.7 + Math.sin(p * Math.PI) * 0.4) * (1 - Math.max(0, p - 0.84) / 0.16 * 0.5);
        return (
          <React.Fragment key={`env-${i}`}>
            {[0.1, 0.19, 0.28].map((b, k) => {
              const q = Math.max(0, p - b);
              return <div key={k} style={{ position: "absolute", zIndex: 20, left: lerp(214, 506, q), top: lerp(452, ty, q) - Math.sin(q * Math.PI) * arc,
                width: 9 - k * 2, height: 9 - k * 2, borderRadius: "50%", transform: "translate(-50%,-50%)",
                background: "rgba(255,226,168,0.5)", opacity: (1 - gone) * (0.5 - k * 0.13) * (q > 0 ? 1 : 0) }} />;
            })}
            {gone < 1 && (
              <div style={{ position: "absolute", left: ex, top: ey, width: 0, height: 0, zIndex: 21, opacity: 1 - gone,
                transform: `translate(-50%,-50%) scale(${es.toFixed(3)}) rotate(${(-16 + p * 34 + Math.sin(lf * 0.5) * 4).toFixed(1)}deg)` }}>
                <div style={{ position: "absolute", left: -28, top: -19, width: 56, height: 38, borderRadius: 6,
                  background: `linear-gradient(155deg, ${GOLD}, ${AMBER} 60%, ${CLAY})`, border: "1.5px solid rgba(90,52,24,0.65)",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.4)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 20, clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, rgba(255,240,200,0.85), rgba(210,150,70,0.85))" }} />
                </div>
                <div style={{ position: "absolute", left: -11, top: -11 }}>{logoTile(t.f, 22, t.pad * 0.5)}</div>
              </div>
            )}
            {/* delivery ring in the slot */}
            <div style={{ position: "absolute", zIndex: 12, left: 506, top: ty,
              width: 30 + over(lf, LAND[i], 9) * 120, height: 30 + over(lf, LAND[i], 9) * 120, borderRadius: "50%",
              transform: "translate(-50%,-50%)", border: `2px solid rgba(255,226,168,${(0.6 * (1 - over(lf, LAND[i], 9))).toFixed(2)})` }} />
          </React.Fragment>
        );
      })}

      {/* ================= THE LIST CARD: stamped SAVED, then whooshed into the phone ================= */}
      <div style={{ position: "absolute", left: cx, top: cy, width: 0, height: 0, opacity: cardO, zIndex: 30,
        transform: `translate(-50%,-50%) scale(${csc.toFixed(3)}) rotate(${crot.toFixed(2)}deg)` }}>
        <div style={{ position: "absolute", left: -150, top: -50, width: 300, height: 100,
          background: `linear-gradient(150deg, ${GOLD} 0%, ${AMBER} 55%, ${CLAY} 100%)`, borderRadius: 18, border: "2px solid rgba(120,72,36,0.6)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,255,255,0.35)",
          transform: `scaleY(${(1 - smack * 0.1).toFixed(3)})`, display: "flex", alignItems: "center", padding: "0 16px", gap: 14 }}>
          {floppy(56, "#2c2824", "#17140f")}
          <div style={{ lineHeight: 1.06 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 28, color: "#1c140c", whiteSpace: "nowrap" }}>5 design tools</div>
            <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 0.5, color: "#3a2a18", marginTop: 4, whiteSpace: "nowrap" }}>keep these open</div>
          </div>
        </div>
        {/* ink shock ring off the stamp */}
        <div style={{ position: "absolute", left: 116, top: -34, width: 20 + inkP * 190, height: 20 + inkP * 190, borderRadius: "50%",
          transform: "translate(-50%,-50%)", border: `3px solid rgba(63,158,116,${(0.75 * (1 - inkP)).toFixed(2)})` }} />
        {/* the SAVE stamp thumping down */}
        <div style={{ position: "absolute", left: 116, top: -62, width: 0, height: 0, opacity: stampP,
          transform: `translateY(${((1 - stampP) * -40).toFixed(2)}px) scale(${(0.5 + stampP * 0.5).toFixed(3)}) rotate(${(-24 + stampP * 9).toFixed(2)}deg)` }}>
          <div style={{ position: "absolute", left: -44, top: -44, width: 88, height: 88, borderRadius: 13,
            background: `linear-gradient(150deg, ${GREEN}, #2f6b40)`, border: "3px solid #e8dfc8", boxShadow: "0 10px 22px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
            {floppy(38, "#e8dfc8", "#cbbf9f")}
            <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#fff" }}>SAVE</div>
          </div>
        </div>
      </div>

      {/* seat everything */}
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 40, boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />
    </Panel>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ================= geometry =================
  const CARDX = 46, CARDY = 66, CARDW = 920, CARDH = 236;            // real 21st.dev tool card (top)
  const SHOTW = 604, SHOTH = 204;                                    // real landing shot inside it
  const SITEX = 552, SITEY = 336, SITEW = 414, SITEH = 364;          // the hero "Your SaaS" site (protagonist)
  const HORIZON = 462;

  const TILES = [
    { x: 366, y: 96, w: 250, h: 58, kind: "nav" },
    { x: 646, y: 96, w: 280, h: 92, kind: "hero" },
    { x: 366, y: 174, w: 250, h: 98, kind: "price" },
  ];
  const SLOTS = [
    { x: SITEX + SITEW / 2, y: SITEY + 53 },
    { x: SITEX + SITEW / 2, y: SITEY + 167 },
    { x: SITEX + SITEW / 2, y: SITEY + 313 },
  ];

  // ================= the loop: 3 grab -> paste cycles spread across all 128f =================
  const STARTS = [6, 46, 86];
  const beats = STARTS.map((s) => ({
    s,
    detach: over(lf, s, 8, Easing.out(Easing.back(2))),
    fly: over(lf, s + 8, 16, Easing.inOut(Easing.cubic)),
    land: Math.max(0, 1 - Math.abs(lf - (s + 24)) / 5),
    wipe: over(lf, s + 24, 11),
    gone: over(lf, s + 24, 6),
    settle: Math.max(0, 1 - Math.abs(lf - (s + 26)) / 9),
  }));

  const shotScroll = -18 - ((lf * 0.42) % 74);
  const scan = ((lf * 1.9) % 260) - 30;
  const gleam = ((lf * 7) % (SITEW + 220)) - 180;
  const spotA = 0.9 + Math.sin(lf / 15) * 0.08;
  const spotB = 0.9 + Math.sin(lf / 19 + 1.3) * 0.07;
  const siteBob = Math.sin(lf / 13) * 2 + beats.reduce((a, b) => a + b.settle * 5, 0);
  const cheer = Math.max(...beats.map((b) => over(lf, b.s + 22, 6) * (1 - over(lf, b.s + 36, 10)))) * 0.9;
  const peel = over(lf, 34, 26);

  const Mini = (kind: string) => {
    if (kind === "nav")
      return (
        <div style={{ width: 236, height: 58, borderRadius: 13, background: grad(PAPER, "#EDE4D2"), border: "2px solid rgba(120,90,50,0.3)", boxShadow: "0 22px 40px -16px rgba(8,6,3,0.7), inset 0 2px 0 rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: grad(CLAY, "#B4512F") }} />
          {["Product", "Docs", "Pricing"].map((t, i) => (
            <span key={i} style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, color: "#6C665C" }}>{t}</span>
          ))}
          <div style={{ marginLeft: "auto", padding: "5px 11px", borderRadius: 999, background: grad(INK, "#2A2620"), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#F1E9D8" }}>Start</div>
        </div>
      );
    if (kind === "hero")
      return (
        <div style={{ width: 250, height: 112, borderRadius: 15, background: grad("#F7F1E4", "#E9DCC2"), border: "2px solid rgba(120,90,50,0.3)", boxShadow: "0 24px 42px -16px rgba(8,6,3,0.7), inset 0 2px 0 rgba(255,255,255,0.65)", padding: "12px 16px" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 9, letterSpacing: "0.18em", color: CLAY }}>NEW</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: INK, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 3 }}>Ship beautiful software</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <div style={{ padding: "6px 14px", borderRadius: 9, background: grad(CLAY, "#B4512F"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, color: "#FFF3EC" }}>Get started</div>
            <div style={{ padding: "6px 12px", borderRadius: 9, border: "1.5px solid rgba(120,90,50,0.35)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#6C665C" }}>Live demo</div>
          </div>
        </div>
      );
    return (
      <div style={{ width: 240, height: 118, borderRadius: 15, background: grad(PAPER, "#EDE4D2"), border: "2px solid rgba(120,90,50,0.3)", boxShadow: "0 24px 42px -16px rgba(8,6,3,0.7), inset 0 2px 0 rgba(255,255,255,0.65)", display: "flex", gap: 8, padding: 12 }}>
        {[{ n: "Free", p: "$0", hot: false }, { n: "Pro", p: "$29", hot: true }, { n: "Team", p: "$99", hot: false }].map((t, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 11, background: t.hot ? grad("#FBF0D6", "#F3DFAE") : "rgba(255,255,255,0.6)", border: t.hot ? `2px solid ${GOLD}` : "1.5px solid rgba(120,90,50,0.2)", boxShadow: t.hot ? "0 10px 20px -10px rgba(180,130,40,0.7)" : "inset 0 1px 0 rgba(255,255,255,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#6C665C" }}>{t.n}</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: t.hot ? "#8A5A16" : INK }}>{t.p}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Panel label="21st.dev/components">
      {/* ===================== LIT STUDIO SET ===================== */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2a2016 0%,#1b140d 62%,#0F0A06 100%)" }} />

      {[0, 1, 2].map((i) => (
        <div key={"rk" + i} style={{ position: "absolute", left: 66, top: 330 + i * 44 + Math.sin(lf / 44 + i) * 2, width: 214, height: 32, borderRadius: 7, background: "linear-gradient(160deg,rgba(46,36,24,0.95),rgba(24,18,11,0.95))", border: "1.5px solid rgba(185,145,85,0.14)", boxShadow: "0 10px 18px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,150,0.06)", display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }}>
          <div style={{ width: 12, height: 12, borderRadius: 4, background: "rgba(210,175,110,0.2)" }} />
          <div style={{ width: 74 + i * 22, height: 6, borderRadius: 3, background: "rgba(210,175,110,0.14)" }} />
          <div style={{ marginLeft: "auto", width: 26, height: 8, borderRadius: 4, background: "rgba(150,120,180,0.16)" }} />
        </div>
      ))}
      {Array.from({ length: 6 }).map((_, i) => {
        const r = seed(i * 2.7 + 3);
        const x = 40 + (i % 3) * 118 + Math.floor(i / 3) * 58;
        const y = 178 + Math.floor(i / 3) * 96 + Math.sin(lf / 40 + i) * 3;
        return <div key={"hx" + i} style={{ position: "absolute", left: x, top: y, width: 92, height: 100, background: `rgba(210,175,110,${0.02 + r * 0.02})`, clipPath: "polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0% 50%)", border: "1px solid rgba(210,175,110,0.05)" }} />;
      })}

      <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON, bottom: 0, background: "linear-gradient(180deg,#3d2d19 0%,#140e07 100%)" }} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = (i - 5) / 5;
        const xTop = 506 + t * 70, xBot = 506 + t * 780;
        const ang = Math.atan2(792 - HORIZON, xBot - xTop) * 180 / Math.PI;
        return <div key={"fg" + i} style={{ position: "absolute", left: xTop, top: HORIZON, width: (792 - HORIZON) / Math.sin(ang * Math.PI / 180), height: 2, transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: "rgba(205,165,95,0.09)" }} />;
      })}
      {[8, 26, 54, 96, 158, 246].map((dy, i) => {
        const w = 120 + dy * 3.4;
        return <div key={"fh" + i} style={{ position: "absolute", left: 506 - w / 2, top: HORIZON + dy, width: w, height: 2, background: `rgba(205,165,95,${(0.12 - i * 0.012).toFixed(3)})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON - 1, height: 2, background: "rgba(235,195,120,0.36)", boxShadow: "0 0 26px rgba(235,195,120,0.5)" }} />

      <div style={{ position: "absolute", left: 300, top: 240, width: 300, height: 560, background: "linear-gradient(180deg,rgba(255,224,152,0.20),rgba(255,224,152,0.012) 80%)", clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", filter: "blur(5px)", opacity: spotA }} />
      <div style={{ position: "absolute", left: 596, top: 240, width: 340, height: 560, background: "linear-gradient(180deg,rgba(206,186,238,0.14),rgba(206,186,238,0.01) 76%)", clipPath: "polygon(44% 0,60% 0,100% 100%,0 100%)", filter: "blur(6px)", opacity: spotB }} />
      <div style={{ position: "absolute", left: 60, top: 250, width: 260, height: 540, background: "linear-gradient(180deg,rgba(255,226,158,0.10),rgba(255,226,158,0.01) 78%)", clipPath: "polygon(44% 0,60% 0,100% 100%,0 100%)", filter: "blur(6px)", opacity: 0.85 + Math.sin(lf / 23 + 2) * 0.08 }} />
      <div style={{ position: "absolute", left: 322, top: 640, width: 300, height: 92, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,224,152,0.20),transparent 70%)" }} />
      <div style={{ position: "absolute", left: 590, top: 646, width: 350, height: 96, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(206,186,238,0.16),transparent 70%)" }} />

      {Array.from({ length: 16 }).map((_, i) => {
        const r = seed(i * 3.1 + 7);
        const x = 60 + r * 900;
        const y = ((seed(i * 2.3) * 760 - lf * (0.4 + r * 0.6)) % 760 + 760) % 760;
        return <div key={"at" + i} style={{ position: "absolute", left: x, top: y, width: 2 + r * 3, height: 2 + r * 3, borderRadius: "50%", background: `rgba(255,232,180,${(0.09 + r * 0.2).toFixed(2)})`, boxShadow: "0 0 6px rgba(255,232,180,0.35)" }} />;
      })}

      {/* ===================== REAL TOOL CARD (logo + real stars + real landing shot) ===================== */}
      <div style={{ position: "absolute", left: CARDX, top: CARDY, width: CARDW, height: CARDH, borderRadius: 22, background: "linear-gradient(160deg,rgba(30,24,17,0.96),rgba(16,12,8,0.96))", border: "2px solid rgba(210,175,110,0.28)", boxShadow: "0 30px 56px -22px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,225,165,0.10)" }}>
        <div style={{ position: "absolute", left: 24, top: 42, width: 64, height: 64, borderRadius: 16, background: "#FFFFFF", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 24px -10px rgba(0,0,0,0.7)" }}>
          <Img src={staticFile("refs/tool_21st_logo.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 102, top: 44, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: "#F6EEDC", letterSpacing: "-0.02em" }}>21st.dev</div>
        <div style={{ position: "absolute", left: 104, top: 90, fontFamily: mono, fontSize: 15, color: "rgba(224,206,168,0.6)" }}>21st.dev</div>
        <div style={{ position: "absolute", left: 24, top: 134, padding: "8px 16px", borderRadius: 999, background: grad(GOLD, AMBER), border: "2px solid rgba(255,238,196,0.6)", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 0 ${14 + Math.sin(lf / 9) * 6}px rgba(231,178,76,0.45), 0 10px 20px -8px rgba(190,140,40,0.8)` }}>
          <span style={{ fontSize: 16, color: "#241B08" }}>★</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: "#241B08" }}>5,347</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "rgba(36,27,8,0.65)", letterSpacing: "0.06em" }}>GITHUB</span>
        </div>

        <div style={{ position: "absolute", left: 300, top: 16, width: SHOTW, height: SHOTH, borderRadius: 14, overflow: "hidden", border: "2px solid rgba(210,175,110,0.22)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)" }}>
          <Img src={staticFile("refs/tool_21st_shot.jpg")} style={{ position: "absolute", left: 0, top: shotScroll, width: SHOTW, height: 317, objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: scan, height: 60, background: "linear-gradient(180deg,transparent,rgba(255,232,180,0.14),transparent)" }} />
        </div>
      </div>

      {/* grab targets living ON the real screenshot */}
      {TILES.map((t, i) => {
        const b = beats[i];
        const taken = b.detach;
        const hoverOn = ramp(lf, b.s - 8, b.s) * (1 - taken);
        const pulse = 0.4 + Math.max(0, Math.sin((lf - i * 7) / 5)) * 0.4;
        return (
          <div key={"tl" + i} style={{ position: "absolute", left: t.x, top: t.y - hoverOn * 3, width: t.w, height: t.h, borderRadius: 10, border: `2px ${taken > 0.5 ? "solid" : "dashed"} rgba(231,178,76,${taken > 0.5 ? 0.5 : 0.3 + pulse * 0.5})`, background: taken > 0.5 ? "rgba(10,8,4,0.5)" : `rgba(231,178,76,${0.05 + hoverOn * 0.14})`, boxShadow: taken > 0.5 ? "inset 0 0 22px rgba(0,0,0,0.7)" : `0 0 ${8 + pulse * 14}px rgba(231,178,76,${0.15 + hoverOn * 0.3})` }}>
            {taken > 0.5 && (
              <div style={{ position: "absolute", right: 8, top: 8, width: 20, height: 20, borderRadius: 7, background: grad(GREEN, "#2F7F5C"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#EAF7EF", fontWeight: 900 }}>✓</div>
            )}
          </div>
        );
      })}

      {/* ===================== THE HERO SITE (improves paste by paste) ===================== */}
      <div style={{ position: "absolute", left: SITEX, top: SITEY + siteBob, width: SITEW, height: SITEH, borderRadius: 20, background: "#EEECF4", border: "2px solid rgba(90,70,140,0.3)", boxShadow: `0 30px 56px -20px rgba(20,14,40,0.7), 0 0 ${30 + beats[2].wipe * 30}px -6px rgba(255,226,158,${0.1 + beats[2].wipe * 0.22})`, overflow: "hidden", transform: `scale(${1 + beats.reduce((a, b) => a + b.land * 0.02, 0)})`, transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 34, background: "#DEDAEA", display: "flex", alignItems: "center", gap: 6, padding: "0 12px" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#C7C1DA" }} />)}
          <div style={{ marginLeft: 8, padding: "3px 12px", borderRadius: 999, background: "#F1EFF7", fontFamily: mono, fontSize: 12, color: "#9089A8" }}>your-saas.app</div>
        </div>

        <div style={{ position: "absolute", left: 0, top: 34, width: "100%", height: 38, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18, padding: "0 18px", borderBottom: "1px solid rgba(120,105,160,0.14)" }}>
          {["Home", "Features", "Pricing"].map((t, i) => <span key={i} style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13, color: "#A49CBC" }}>{t}</span>)}
        </div>
        <div style={{ position: "absolute", left: 0, top: 34, width: "100%", height: 38, background: grad(PAPER, "#EFE7D6"), borderBottom: "1.5px solid rgba(120,90,50,0.2)", display: "flex", alignItems: "center", gap: 12, padding: "0 14px", clipPath: `inset(0 ${(1 - beats[0].wipe) * 100}% 0 0)` }}>
          <div style={{ width: 18, height: 18, borderRadius: 6, background: grad(CLAY, "#B4512F") }} />
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, color: INK }}>Your SaaS</span>
          {["Product", "Docs", "Pricing"].map((t, i) => <span key={i} style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, color: "#6C665C" }}>{t}</span>)}
          <div style={{ marginLeft: "auto", padding: "5px 12px", borderRadius: 999, background: grad(INK, "#2A2620"), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#F1E9D8" }}>Start</div>
        </div>

        <div style={{ position: "absolute", left: 0, top: 72, width: "100%", height: 190, background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 34, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#FFFFFF", letterSpacing: "-0.02em" }}>Your SaaS</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 88, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 14, color: "rgba(255,255,255,0.72)" }}>The all in one platform for teams</div>
          <div style={{ position: "absolute", left: "50%", top: 122, transform: "translateX(-50%)", padding: "10px 26px", borderRadius: 999, background: "#C4B5FD", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#4C1D95" }}>Get Started</div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 72, width: "100%", height: 190, background: grad("#F7F1E4", "#E9DCC2"), clipPath: `inset(0 ${(1 - beats[1].wipe) * 100}% 0 0)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 26, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, letterSpacing: "0.2em", color: CLAY }}>NEW IN 2026</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 48, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: INK, letterSpacing: "-0.025em", lineHeight: 1.05 }}>Ship beautiful<br />software</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 138, display: "flex", justifyContent: "center", gap: 10 }}>
            <div style={{ padding: "9px 20px", borderRadius: 11, background: grad(CLAY, "#B4512F"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#FFF3EC", boxShadow: "0 12px 22px -10px rgba(150,60,30,0.75)" }}>Get started</div>
            <div style={{ padding: "9px 18px", borderRadius: 11, border: "1.5px solid rgba(120,90,50,0.35)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: "#6C665C" }}>Live demo</div>
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, top: 262, width: "100%", height: 102, background: "#E7E3F0", display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
          {Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ width: 64, height: 12, borderRadius: 6, background: "#CFC8E0" }} />)}
        </div>
        <div style={{ position: "absolute", left: 0, top: 262, width: "100%", height: 102, background: grad(PAPER, "#EDE4D2"), display: "flex", gap: 9, padding: 12, clipPath: `inset(0 ${(1 - beats[2].wipe) * 100}% 0 0)` }}>
          {[{ n: "Free", p: "$0", hot: false }, { n: "Pro", p: "$29", hot: true }, { n: "Team", p: "$99", hot: false }].map((t, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 12, background: t.hot ? grad("#FBF0D6", "#F3DFAE") : "rgba(255,255,255,0.6)", border: t.hot ? `2px solid ${GOLD}` : "1.5px solid rgba(120,90,50,0.2)", boxShadow: t.hot ? "0 10px 20px -10px rgba(180,130,40,0.7)" : "inset 0 1px 0 rgba(255,255,255,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#6C665C" }}>{t.n}</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: t.hot ? "#8A5A16" : INK }}>{t.p}</span>
            </div>
          ))}
        </div>

        {beats.map((b, i) => (b.wipe > 0 && b.wipe < 1 ? (
          <div key={"sm" + i} style={{ position: "absolute", left: `${b.wipe * 100}%`, top: [34, 72, 262][i], width: 4, height: [38, 190, 102][i], background: GOLD, boxShadow: `0 0 18px ${GOLD}` }} />
        ) : null))}

        <div style={{ position: "absolute", left: gleam, top: -40, width: 90, height: SITEH + 80, transform: "rotate(14deg)", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", pointerEvents: "none" }} />
      </div>

      <div style={{ position: "absolute", left: SITEX + 12 + peel * 40, top: SITEY + 6 + peel * 120, transform: `rotate(${-8 + peel * 70}deg)`, opacity: Math.max(0, 1 - peel * 1.1), transformOrigin: "0% 0%" }}>
        <div style={{ padding: "5px 12px", borderRadius: 9, background: grad("#F3D65A", "#E0B833"), border: "2px solid #B7A24A", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#5A4410", boxShadow: "0 8px 16px -7px rgba(0,0,0,0.5)" }}>AI slop</div>
      </div>

      {/* ===================== the builder mascot ===================== */}
      <div style={{ position: "absolute", left: 372, top: 654, width: 178, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 70%)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: 382, top: 516, width: 160, height: 160 }}>
        <Mascot lf={lf} size={160} nodAmp={1.4} nodSpeed={9} gaze={2} cheer={cheer} />
        <div style={{ position: "absolute", left: 24, top: 10, width: 112, height: 32, borderRadius: "18px 18px 9px 9px", background: grad("#E04A3A", "#B5382C"), border: "2px solid #8E2A20", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.28), 0 6px 12px -5px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 8, top: 35, width: 72, height: 15, borderRadius: 8, background: grad("#C43E30", "#9C2E24"), boxShadow: "0 4px 8px -3px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 68, top: 15, width: 24, height: 24, borderRadius: "50%", background: "#F4EEE2", border: "2px solid #B5382C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#B5382C" }}>21</div>
      </div>

      {/* ===================== components in flight (grab -> paste, x3) ===================== */}
      {beats.map((b, i) => {
        if (b.detach <= 0 || b.gone >= 1) return null;
        const t = TILES[i], sl = SLOTS[i];
        const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
        const x = interpolate(b.fly, [0, 1], [cx, sl.x], clamp);
        const y = interpolate(b.fly, [0, 1], [cy - b.detach * 16, sl.y], clamp) - Math.sin(b.fly * Math.PI) * 120;
        const rot = Math.sin(b.fly * Math.PI) * -9;
        const sc = (0.9 + b.detach * 0.1) * (1 + Math.sin(b.fly * Math.PI) * 0.08);
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: b.detach * (1 - b.gone) }}>
            <div style={{ position: "absolute", left: -22, top: -22, right: -22, bottom: -22, borderRadius: 30, background: `radial-gradient(circle, rgba(231,178,76,${0.3 * Math.sin(Math.max(0.001, b.fly) * Math.PI) + b.land * 0.45}), transparent 70%)`, pointerEvents: "none" }} />
            {Mini(t.kind)}
          </div>
        );
      })}

      {beats.map((b, i) => (b.land > 0 ? (
        <div key={"fx" + i} style={{ position: "absolute", left: SLOTS[i].x - 90, top: SLOTS[i].y - 60, width: 180, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,240,196,${b.land * 0.5}), transparent 70%)`, pointerEvents: "none" }} />
      ) : null))}
      <Firework lf={lf} at={112} x={SITEX + SITEW / 2} y={SITEY + 300} hue={2} />

      {Array.from({ length: 10 }).map((_, i) => {
        const r = seed(i * 4.4 + 2);
        const p = (lf - 96 + i * 4) / 40;
        if (p < 0 || p > 1) return null;
        return <div key={"sp" + i} style={{ position: "absolute", left: SITEX + 30 + r * (SITEW - 60), top: SITEY + SITEH - p * 260, width: 5, height: 5, borderRadius: "50%", background: GOLD, opacity: Math.max(0, 1 - p) * 0.9, boxShadow: `0 0 10px ${GOLD}` }} />;
      })}

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />
    </Panel>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // ============ MOTION CLOCKS (all continuous: still moving at frame 99) ============
  const intro = over(lf, 0, fr(0.5));                    // cards seat (already composed at f0)
  const spin = lf * 7.2;                                 // aceternity moving-border rotation (never stops)
  const spotX = 50 + Math.sin(lf / 10.5) * 62;           // spotlight sweeping across the hero face
  const shimmer = ((lf * 3.4) % 190) - 45;               // magic-ui shimmer band (loops ~4x)
  const ctaShine = ((lf * 4.6) % 210) - 55;              // shimmer on the CTA (loops ~5x)
  const sheenA = ((lf * 2.6) % 170) - 40;                // sheen crawling over tool shot A
  const sheenB = ((lf * 2.6 + 85) % 170) - 40;           // ...and shot B, offset
  const floorSweep = 506 + Math.sin(lf / 17) * 210;      // stage wash sliding on the floor
  const rigPulse = (i: number) => 0.5 + 0.5 * Math.sin(lf / 7 + i * 1.9);
  const breathe = 0.86 + Math.sin(lf / 9) * 0.1;

  // hero site geometry
  const SX = 296, SY = 418, SW = 420, SH = 268;
  const bob = Math.sin(lf / 8) * 3;
  const lift = 1 + Math.sin(lf / 13) * 0.008;

  // wand cone from the mascot, sweeping over the site forever
  const wandAng = 8 + Math.sin(lf / 12) * 11;

  // beams: tool card -> hero site (energy keeps streaming down them)
  const beamOf = (x1: number, y1: number, x2: number, y2: number) => ({
    x: x1, y: y1, len: Math.hypot(x2 - x1, y2 - y1), ang: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  });
  const bA = beamOf(261, 346, 372, SY + 10);
  const bB = beamOf(751, 346, 640, SY + 10);

  const TOOLS = [
    { x: 30, logo: "refs/tool_aceternity_logo.png", shot: "refs/tool_aceternity_shot.jpg", name: "Aceternity UI", url: "ui.aceternity.com", stars: "", col: GOLD, sheen: sheenA },
    { x: 520, logo: "refs/tool_magicui_logo.png", shot: "refs/tool_magicui_shot.jpg", name: "Magic UI", url: "magicui.design", stars: "★ 21,565", col: "#C9B6F5", sheen: sheenB },
  ];

  return (
    <Panel label="aceternity + magicui · motion">
      {/* ============================ LIT SET ============================ */}
      {/* 1) back wall: deep studio violet, darkening to the floor */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1B1830 0%,#141026 52%,#0B0817 100%)" }} />
      <div style={{ position: "absolute", left: -70, top: 20, width: 640, height: 520, borderRadius: "50%", background: `radial-gradient(circle, rgba(140,90,235,${0.13 * breathe + 0.06}), transparent 66%)`, filter: "blur(22px)" }} />
      <div style={{ position: "absolute", right: -60, top: 40, width: 560, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.10 * breathe + 0.04}), transparent 66%)`, filter: "blur(20px)" }} />

      {/* 2) floor plane + receding grid (vanishing point 506,470) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "linear-gradient(180deg,#2A1E42 0%,#0E0A18 100%)" }} />
      {Array.from({ length: 11 }, (_, i) => {
        const t = (i - 5) / 5;
        const xTop = 506 + t * 60, xBot = 506 + t * 840;
        const ang = (Math.atan2(322, xBot - xTop) * 180) / Math.PI;
        return <div key={"v" + i} style={{ position: "absolute", left: xTop, top: 470, width: 322 / Math.sin((ang * Math.PI) / 180), height: 2, transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: "rgba(180,150,255,0.08)" }} />;
      })}
      {[8, 26, 54, 96, 158, 246].map((dy, i) => {
        const w = 140 + dy * 3.6;
        return <div key={"h" + i} style={{ position: "absolute", left: 506 - w / 2, top: 470 + dy, width: w, height: 2, background: `rgba(180,150,255,${(0.12 - i * 0.013).toFixed(3)})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 469, height: 2, background: "rgba(170,120,255,0.34)", boxShadow: "0 0 26px rgba(170,120,255,0.42)" }} />

      {/* 3) stage wash gliding along the floor (never settles) */}
      <div style={{ position: "absolute", left: floorSweep - 220, top: 452, width: 440, height: 320, background: "radial-gradient(58% 100% at 50% 0%, rgba(150,90,240,0.20), transparent 72%)", filter: "blur(9px)", mixBlendMode: "screen" }} />

      {/* 4) LIGHT RIG (right): 3 fixtures throwing sweeping cones at the site */}
      <div style={{ position: "absolute", left: 946, top: 400, width: 14, height: 300, borderRadius: 7, background: "linear-gradient(90deg,#3A3550,#1B1830)", boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)" }} />
      {[0, 1, 2].map((i) => {
        const p = rigPulse(i);
        const y = 430 + i * 96;
        const ang = 186 + Math.sin(lf / 9 + i * 2.1) * 9;
        return (
          <React.Fragment key={"rig" + i}>
            <div style={{ position: "absolute", left: 902, top: y - 18, width: 46, height: 36, borderRadius: 9, background: "linear-gradient(180deg,#4A4364,#231E38)", border: "1.5px solid rgba(200,180,255,0.2)", boxShadow: `0 8px 18px rgba(0,0,0,0.5), 0 0 ${8 + p * 16}px rgba(200,160,255,${0.2 + p * 0.3})`, zIndex: 3 }}>
              <div style={{ position: "absolute", left: -4, top: 8, width: 12, height: 20, borderRadius: 5, background: `radial-gradient(circle, rgba(255,240,210,${0.5 + p * 0.5}), #6C5FA0)` }} />
            </div>
            <div style={{ position: "absolute", left: 900, top: y, width: 250, height: 96, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, background: `linear-gradient(90deg, rgba(198,160,255,${0.16 * (0.4 + p * 0.6)}), rgba(198,160,255,0.01) 88%)`, clipPath: "polygon(0 42%,0 58%,100% 100%,100% 0)", filter: "blur(5px)", mixBlendMode: "screen", zIndex: 2 }} />
          </React.Fragment>
        );
      })}

      {/* 5) atmosphere: drifting dust in the beams */}
      {Array.from({ length: 22 }, (_, i) => {
        const s = seed(i * 3.1 + 7);
        const x = seed(i * 2.3 + 1) * 1012;
        const y = ((((seed(i * 1.7 + 2) * 640 - lf * (0.5 + s * 0.9)) % 640) + 640) % 640) + 140;
        const hot = x > 260 && x < 900;
        return <div key={"d" + i} style={{ position: "absolute", left: x, top: y, width: 2 + s * 4, height: 2 + s * 4, borderRadius: "50%", background: "rgba(240,228,255,0.85)", opacity: (0.10 + s * 0.24) * (hot ? 1.5 : 0.6), boxShadow: hot ? "0 0 6px rgba(230,210,255,0.55)" : "none", zIndex: 3 }} />;
      })}

      {/* ======================= TOOL CARDS (top zone) ======================= */}
      {TOOLS.map((t) => (
        <div key={t.name} style={{ position: "absolute", left: t.x, top: 74 + (1 - intro) * 10, width: 462, height: 266, borderRadius: 20, background: grad("#1A2136", "#101627"), border: `2px solid ${t.col}55`, boxShadow: `0 26px 54px -20px rgba(0,0,0,0.8), 0 0 ${16 + breathe * 14}px ${t.col}22, inset 0 1px 0 rgba(255,255,255,0.08)`, transform: `scale(${0.98 + intro * 0.02})`, overflow: "hidden", zIndex: 14 }}>
          {/* header: real logo tile + name + url + real stars */}
          <div style={{ position: "absolute", left: 14, top: 12, width: 44, height: 44, borderRadius: 11, background: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.5)", boxShadow: "0 6px 14px -6px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Img src={staticFile(t.logo)} style={{ width: 34, height: 34, objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 68, top: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#F2EEF9", letterSpacing: "-0.01em" }}>{t.name}</div>
          <div style={{ position: "absolute", left: 68, top: 40, fontFamily: mono, fontSize: 15, color: "rgba(196,190,225,0.72)" }}>{t.url}</div>
          {t.stars ? (
            <div style={{ position: "absolute", right: 14, top: 18, padding: "5px 12px", borderRadius: 999, background: "rgba(231,178,76,0.14)", border: `1.5px solid ${GOLD}99`, fontFamily: mono, fontWeight: 700, fontSize: 16, color: "#F6E4A0", boxShadow: `0 0 ${8 + breathe * 10}px rgba(231,178,76,0.28)` }}>{t.stars}</div>
          ) : null}
          {/* the real landing shot as proof, with a sheen crawling over it */}
          <div style={{ position: "absolute", left: 12, top: 66, width: 438, height: 188, borderRadius: 12, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)" }}>
            <Img src={staticFile(t.shot)} style={{ width: 438, height: 230, objectFit: "cover", objectPosition: "top center", display: "block" }} />
            <div style={{ position: "absolute", top: -20, bottom: -20, width: 90, left: `${t.sheen}%`, background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.30), transparent)", transform: "skewX(-14deg)" }} />
          </div>
        </div>
      ))}

      {/* ============ BEAMS: cards keep pouring motion into the site ============ */}
      {[{ b: bA, c: GOLD }, { b: bB, c: "#C9B6F5" }].map((o, i) => (
        <div key={"bm" + i} style={{ position: "absolute", left: o.b.x, top: o.b.y, width: o.b.len, height: 10, transformOrigin: "0 50%", transform: `rotate(${o.b.ang}deg)`, zIndex: 10 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: `linear-gradient(90deg, ${o.c}66, ${o.c}18)`, boxShadow: `0 0 16px ${o.c}55`, opacity: 0.55 + breathe * 0.25 }} />
          {Array.from({ length: 5 }, (_, k) => {
            const t = ((lf * 2.1 + k * 17) % 85) / 85;
            return <div key={k} style={{ position: "absolute", left: t * o.b.len - 5, top: 0, width: 10, height: 10, borderRadius: "50%", background: "#FFFFFF", boxShadow: `0 0 12px ${o.c}`, opacity: Math.sin(t * Math.PI) }} />;
          })}
        </div>
      ))}

      {/* ============ MASCOT with a sweeping spotlight wand (left zone) ============ */}
      <div style={{ position: "absolute", left: 244, top: 500, width: 320, height: 110, transformOrigin: "0 50%", transform: `rotate(${wandAng}deg)`, background: "linear-gradient(90deg, rgba(255,240,205,0.24), rgba(255,240,205,0.01) 86%)", clipPath: "polygon(0 44%,0 56%,100% 100%,100% 0)", filter: "blur(6px)", mixBlendMode: "screen", zIndex: 9 }} />
      <div style={{ position: "absolute", left: 52, top: 452, width: 200, height: 200, zIndex: 18 }}>
        <Mascot lf={lf} size={200} gaze={4} nodAmp={2.8} nodSpeed={10} cheer={0.4} bowtie={1} shades={1} />
        {/* wand in hand */}
        <div style={{ position: "absolute", left: 176, top: 66, width: 78, height: 9, borderRadius: 5, transformOrigin: "0 50%", transform: `rotate(${wandAng}deg)`, background: "linear-gradient(90deg,#8a6a2a,#F6E4A0)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", right: -9, top: -8, width: 24, height: 24, borderRadius: "50%", background: "radial-gradient(circle,#FFFFFF,#F0CB63)", boxShadow: `0 0 ${12 + breathe * 14}px rgba(246,228,160,0.9)` }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 74, top: 638, width: 160, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", filter: "blur(4px)", zIndex: 5 }} />

      {/* ===================== HERO SITE (the protagonist) ===================== */}
      <div style={{ position: "absolute", left: SX - 60, top: SY + SH - 30, width: SW + 120, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(170,110,250,${0.14 + breathe * 0.1}), transparent 72%)`, filter: "blur(4px)", zIndex: 5 }} />
      <div style={{ position: "absolute", left: SX + 40, top: SY + SH + 6, width: SW - 80, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 72%)", filter: "blur(5px)", zIndex: 6 }} />

      <div style={{ position: "absolute", left: SX, top: SY + bob, width: SW, height: SH, transform: `scale(${lift})`, zIndex: 20 }}>
        {/* ACETERNITY MOVING BORDER: conic ring, rotates forever */}
        <div style={{ position: "absolute", inset: -5, borderRadius: 22, background: `conic-gradient(from ${spin}deg, transparent 0deg, ${GOLD} 30deg, #FFF6DC 58deg, transparent 96deg, transparent 186deg, #C9B6F5 216deg, #FFFFFF 240deg, transparent 274deg, transparent 360deg)`, filter: "blur(1px)", boxShadow: `0 0 ${20 + breathe * 18}px rgba(231,178,76,0.32)` }} />
        {/* browser card */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 17, background: "#F1EDF8", overflow: "hidden", border: "1px solid rgba(255,255,255,0.35)", boxShadow: "0 26px 52px -16px rgba(6,4,18,0.85)" }}>
          {/* chrome bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, background: "#F8F5FD", display: "flex", alignItems: "center", padding: "0 12px", gap: 7, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            {["#E4657A", "#EDBE55", "#5CB98A"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
            <div style={{ marginLeft: 10, padding: "3px 12px", borderRadius: 999, background: "#EDE8F6", fontFamily: mono, fontSize: 11, color: "#6E6486" }}>yoursaas.com</div>
          </div>
          {/* purple hero, now with motion applied */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 30, bottom: 0, background: "linear-gradient(135deg,#7C3AED 0%,#A78BFA 100%)", overflow: "hidden" }}>
            {/* nav */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16, padding: "0 18px" }}>
              {["Product", "Pricing", "Docs"].map((n, i) => <div key={i} style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.82)" }}>{n}</div>)}
            </div>
            {/* ACETERNITY SPOTLIGHT: sweeps across the hero, back and forth, forever */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${spotX}% 40%, rgba(255,255,255,0.55), transparent 46%)`, mixBlendMode: "screen" }} />
            {/* MAGIC UI SHIMMER: band running across, looping */}
            <div style={{ position: "absolute", top: -30, bottom: -30, width: 110, left: `${shimmer}%`, background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "skewX(-14deg)" }} />
            {/* headline block */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 58, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40, color: "#FFFFFF", letterSpacing: "-0.03em", textShadow: `0 0 ${10 + breathe * 12}px rgba(255,255,255,0.35)` }}>Your SaaS</div>
              <div style={{ marginTop: 9, fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.78)", letterSpacing: "0.01em" }}>Ship faster. Look expensive.</div>
              <div style={{ marginTop: 16, padding: "9px 26px", borderRadius: 999, background: "linear-gradient(180deg,#EDE6FF,#C4B5FD)", position: "relative", overflow: "hidden", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "#3B1E78", boxShadow: "0 10px 20px -8px rgba(40,12,90,0.7), inset 0 1px 0 rgba(255,255,255,0.8)" }}>
                Get Started
                {/* MAGIC UI shimmer button */}
                <div style={{ position: "absolute", top: -10, bottom: -10, width: 44, left: `${ctaShine}%`, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.95), transparent)", transform: "skewX(-16deg)" }} />
              </div>
            </div>
            {/* MAGIC UI sparkles, twinkling continuously */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = seed(i * 4.2 + 3);
              const tw = 0.35 + 0.65 * Math.abs(Math.sin(lf / 5 + i * 1.4));
              const drift = Math.sin(lf / 9 + i) * 5;
              return <div key={i} style={{ position: "absolute", left: 24 + a * 372, top: 44 + seed(i * 2.7 + 5) * 150 + drift, width: 3 + a * 5, height: 3 + a * 5, background: "#FFF8DE", borderRadius: 2, transform: `rotate(45deg) scale(${tw})`, opacity: 0.35 + tw * 0.6, boxShadow: "0 0 9px rgba(255,246,214,0.95)" }} />;
            })}
          </div>
        </div>
      </div>

      {/* vignette to seat the set */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)", zIndex: 30 }} />

      {/* minimal HUD (captions carry the words) */}
      <Pill text="TOOLS 3 / 5" x={40} y={726} o={1} />
    </Panel>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== geometry: reference piece (left) · curator (bottom-left) · hero site on a plinth (right) =====
  const P = { x: 44, y: 226, w: 496, h: 286 };
  const SITE = { x: 596, y: 250, w: 386, h: 268 };
  const scx = SITE.x + SITE.w / 2, scy = SITE.y + SITE.h / 2;
  const HOR = 560;
  const MX = 232, MY = 572, MS = 136;
  const SHx = MX + MS * 0.83, SHy = MY + MS * 0.43;
  const CPx = 432, CPy = 624;
  const CW = 68, CH = 88, Z = 1.5;      // lifted crop size on the wall, and its zoom in flight

  // ===== the lift cycle: a new real screen is pulled off the shot every 17f, all 81f =====
  const items = Array.from({ length: 5 }).map((_, i) => {
    const r = seed(i * 3.1 + 7);
    const t0 = 4 + i * 17;
    const t = over(lf, t0, 16, Easing.inOut(Easing.cubic));
    const land = over(lf, t0 + 16, 8, Easing.out(Easing.cubic));
    const sel = over(lf, t0 - 7, 5) * (1 - over(lf, t0, 4));
    const sx = P.x + 352 + (i % 2) * 76;              // sources sit on the real app-screen grid of the shot
    const sy = P.y + 78 + Math.floor(i / 2) * 78;
    const u = 1 - t;
    const x = u * u * sx + 2 * u * t * CPx + t * t * scx;
    const y = u * u * sy + 2 * u * t * CPy + t * t * scy;
    const fly = lf >= t0 && t < 1;
    const fade = t < 0.84 ? 1 : 1 - (t - 0.84) / 0.16;
    return { i, t, land, sel, sx, sy, x, y, fly, fade, r, taken: lf >= t0 + 2 };
  });
  const flying = items.filter((o) => o.fly);
  const tgt = flying.length ? flying[flying.length - 1] : null;
  const armAng = tgt ? (Math.atan2(tgt.y - SHy, tgt.x - SHx) * 180) / Math.PI : -74;
  const reach = tgt ? 0.55 + 0.45 * Math.sin(Math.min(1, tgt.t + 0.08) * Math.PI) : 0.35;
  const armLen = 44 + reach * 30;

  // each landed screen upgrades the hero site's layout (4th lands at f79, 5th still in flight at f80)
  const L1 = items[0].land, L2 = items[1].land, L3 = items[2].land, L4 = items[3].land;
  const flash = Math.max(0, ...[0, 1, 2, 3].map((i) => Math.max(0, 1 - Math.abs(lf - (4 + i * 17 + 16)) / 7)));
  const bob = Math.sin(lf / 9) * 3;
  const siteScale = 1 + flash * 0.018;

  // ===== living set =====
  const wash = 300 + Math.sin(lf / 41) * 210;
  const lampFlick = 0.88 + Math.sin(lf / 5.5) * 0.05 + (seed(Math.floor(lf / 6)) > 0.9 ? -0.12 : 0);
  const keyPulse = 0.9 + Math.sin(lf / 11) * 0.08;
  const sheenX = ((lf * 9) % 900) - 200;
  const PGH = SITE.h - 26;

  const siteBody = (
    <>
      {/* --- the purple slop it started as --- */}
      <div style={{ position: "absolute", inset: 0, opacity: 1 - L1 }}>
        <div style={{ position: "absolute", inset: 0, background: "#f6f4fb" }} />
        <div style={{ position: "absolute", left: 14, top: 10, right: 14, height: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 5, borderRadius: 3, background: "#cdc6da" }} />
          <div style={{ marginLeft: "auto", width: 22, height: 4, borderRadius: 2, background: "#d8d2e4" }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: "#d8d2e4" }} />
          <div style={{ width: 22, height: 4, borderRadius: 2, background: "#d8d2e4" }} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 32, height: 150, background: "linear-gradient(135deg,#7C3AED,#A78BFA)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: "-0.01em" }}>Your SaaS</span>
          <div style={{ width: 150, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.45)" }} />
          <div style={{ marginTop: 4, padding: "8px 22px", borderRadius: 22, background: "#C4B5FD", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: "#3b1f77" }}>Get Started</div>
        </div>
        <div style={{ position: "absolute", left: 24, top: 202, width: 200, height: 7, borderRadius: 4, background: "#ddd7e8" }} />
        <div style={{ position: "absolute", left: 24, top: 218, width: 130, height: 7, borderRadius: 4, background: "#e6e1ee" }} />
      </div>

      {/* --- the layout it copies off the best apps, one piece per landed screen --- */}
      <div style={{ position: "absolute", inset: 0, opacity: L1 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FBFAF8,#F2EFEA)" }} />
        <div style={{ position: "absolute", left: 18, top: 12, right: 18, height: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 13, height: 13, borderRadius: 4, background: "linear-gradient(150deg,#8B5CF6,#5B21B6)", boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 10, color: "#1b1830", letterSpacing: "-0.01em" }}>SaaS</span>
          <div style={{ marginLeft: 14, display: "flex", gap: 10 }}>
            {[26, 20, 24].map((w, k) => <div key={k} style={{ width: w, height: 4, borderRadius: 2, background: "#c3bfd0" }} />)}
          </div>
          <div style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 999, background: "#17142a", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 8, color: "#fff", opacity: 0.4 + L4 * 0.6 }}>Start</div>
        </div>
        <div style={{ position: "absolute", left: 18, top: 44, width: 196 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#141127", letterSpacing: "-0.02em" }}>Your SaaS</div>
          <div style={{ marginTop: 8, width: 178, height: 5, borderRadius: 3, background: "#cfcad9" }} />
          <div style={{ marginTop: 5, width: 128, height: 5, borderRadius: 3, background: "#ddd9e4" }} />
          <div style={{ marginTop: 12, display: "flex", gap: 7 }}>
            <div style={{ padding: "6px 13px", borderRadius: 8, background: "linear-gradient(150deg,#8B5CF6,#6D28D9)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 9, color: "#fff", boxShadow: "0 4px 10px -3px rgba(109,40,217,0.7)" }}>Get started</div>
            <div style={{ padding: "6px 13px", borderRadius: 8, background: "#fff", border: "1px solid #ddd8e2", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 9, color: "#3b3550" }}>Docs</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 228, top: 44, width: 142, height: 92, borderRadius: 10, background: "linear-gradient(160deg,#1B1730,#100D1F)", border: "1px solid rgba(160,140,220,0.3)", boxShadow: "0 10px 22px -8px rgba(20,10,50,0.6)", overflow: "hidden", opacity: L2, transform: `translateX(${(1 - L2) * 22}px)` }}>
          <div style={{ position: "absolute", left: 10, top: 9, width: 44, height: 4, borderRadius: 2, background: "rgba(190,175,240,0.5)" }} />
          <div style={{ position: "absolute", left: 10, bottom: 10, display: "flex", alignItems: "flex-end", gap: 6 }}>
            {[22, 36, 28, 46, 34, 52].map((h, k) => (
              <div key={k} style={{ width: 8, height: h * (0.55 + 0.45 * L2), borderRadius: 3, background: k === 5 ? "linear-gradient(180deg,#A78BFA,#7C3AED)" : "rgba(150,130,215,0.35)" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 18, top: 152, right: 18, display: "flex", gap: 9, opacity: L3, transform: `translateY(${(1 - L3) * 16}px)` }}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ flex: 1, height: 54, borderRadius: 9, background: "#fff", border: "1px solid #e6e2dc", boxShadow: "0 5px 12px -6px rgba(30,20,60,0.28)", padding: 9 }}>
              <div style={{ width: 12, height: 12, borderRadius: 4, background: ["#8B5CF6", "#3F9E74", "#CF9544"][k], opacity: 0.85 }} />
              <div style={{ marginTop: 8, width: "78%", height: 4, borderRadius: 2, background: "#d9d5df" }} />
              <div style={{ marginTop: 4, width: "52%", height: 4, borderRadius: 2, background: "#e6e3ea" }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 18, right: 18, top: 218, height: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: L4, transform: `translateY(${(1 - L4) * 10}px)` }}>
          {[30, 24, 34, 26, 30].map((w, k) => <div key={k} style={{ width: w, height: 6, borderRadius: 3, background: "#d5d1d9" }} />)}
        </div>
      </div>

      {/* --- re-flow guides + scan, fire on every landing --- */}
      <div style={{ position: "absolute", inset: 0, opacity: flash * 0.9, pointerEvents: "none" }}>
        {[18, 118, 228, 368].map((x, k) => <div key={"gv" + k} style={{ position: "absolute", left: x, top: 0, bottom: 0, width: 1, background: "rgba(124,58,237,0.55)" }} />)}
        {[44, 136, 152, 206].map((y, k) => <div key={"gh" + k} style={{ position: "absolute", left: 0, right: 0, top: y, height: 1, background: "rgba(124,58,237,0.4)" }} />)}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: (1 - flash) * PGH, height: 26, background: "linear-gradient(180deg, transparent, rgba(167,139,250,0.5), transparent)", opacity: flash, pointerEvents: "none" }} />
    </>
  );

  return (
    <Panel label="gallery-04 · reference wing">
      {/* 1) gallery back wall + dimmed wainscot panels */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#241f28 0%,#191520 54%,#0d0a12 100%)" }} />
      {Array.from({ length: 6 }).map((_, c) => (
        <div key={"wp" + c} style={{ position: "absolute", left: 8 + c * 168, top: 56, width: 156, height: 500, borderRadius: 6, background: "linear-gradient(170deg,rgba(120,104,140,0.09),rgba(20,16,26,0.10))", border: "1px solid rgba(180,160,210,0.05)", boxShadow: "inset 0 1px 0 rgba(210,190,240,0.05), inset 0 -3px 12px rgba(0,0,0,0.28)" }} />
      ))}
      <div style={{ position: "absolute", left: wash - 280, top: -60, width: 560, height: 660, background: "radial-gradient(ellipse at 50% 30%, rgba(231,178,76,0.10), transparent 66%)", filter: "blur(16px)" }} />
      <div style={{ position: "absolute", left: -120, top: 120, width: 520, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,70,130,0.16), transparent 64%)", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 206, height: 4, background: "linear-gradient(180deg,rgba(228,206,168,0.22),rgba(60,48,36,0.35))", boxShadow: "0 3px 10px rgba(0,0,0,0.4)" }} />

      {/* 2) perspective floor */}
      <div style={{ position: "absolute", left: 0, right: 0, top: HOR, bottom: 0, background: "linear-gradient(180deg,#2b2532 0%,#0a080e 100%)" }} />
      {Array.from({ length: 11 }).map((_, i) => {
        const t = (i - 5) / 5;
        const xTop = 506 + t * 74, xBot = 506 + t * 820;
        const dx = xBot - xTop, dyy = 792 - HOR;
        const len = Math.sqrt(dx * dx + dyy * dyy);
        const ang = (Math.atan2(dyy, dx) * 180) / Math.PI;
        return <div key={"fg" + i} style={{ position: "absolute", left: xTop, top: HOR, width: len, height: 2, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, background: "rgba(214,186,240,0.08)" }} />;
      })}
      {[6, 20, 44, 80, 132, 206].map((dy, i) => {
        const w = 140 + dy * 3.6;
        return <div key={"fh" + i} style={{ position: "absolute", left: 506 - w / 2, top: HOR + dy, width: w, height: 2, background: `rgba(214,186,240,${(0.11 - i * 0.012).toFixed(3)})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: HOR - 1, height: 2, background: "rgba(236,214,255,0.34)", boxShadow: "0 0 26px rgba(210,180,255,0.4)" }} />

      {/* 3) far dust */}
      {Array.from({ length: 16 }).map((_, i) => {
        const r = seed(i * 3.1 + 7);
        const bx = 40 + r * 940;
        const by = (((seed(i * 2.3 + 2) * 740 - lf * (0.28 + r * 0.5)) % 740) + 740) % 740;
        const s = 1.4 + r * 2.2;
        return <div key={"at" + i} style={{ position: "absolute", left: bx, top: 40 + by, width: s, height: s, borderRadius: "50%", background: `rgba(246,232,208,${(0.08 + r * 0.16).toFixed(2)})`, filter: "blur(0.5px)", zIndex: 5 }} />;
      })}

      {/* 4) plinth under the hero site */}
      <div style={{ position: "absolute", left: 600, top: 512, width: 380, height: 214, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)", background: "linear-gradient(100deg,#6f6680 0%,#4a4256 46%,#241f2e 100%)", boxShadow: "inset 0 2px 0 rgba(240,228,255,0.25)", zIndex: 8 }} />
      <div style={{ position: "absolute", left: 622, top: 510, width: 336, height: 5, borderRadius: 3, background: "linear-gradient(90deg,rgba(240,226,255,0.12),rgba(240,226,255,0.34),rgba(240,226,255,0.12))", zIndex: 9 }} />
      <div style={{ position: "absolute", left: 566, top: 700, width: 448, height: 44, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", filter: "blur(5px)", zIndex: 7 }} />

      {/* 5) gallery picture light spilling down onto the reference piece */}
      <div style={{ position: "absolute", left: P.x - 30, top: P.y - 30, width: P.w + 60, height: P.h + 70, background: `linear-gradient(180deg, rgba(255,232,180,${0.16 * lampFlick}), rgba(255,232,180,0.02) 72%, transparent)`, clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)", filter: "blur(4px)", zIndex: 9 }} />

      {/* 6) the REAL Mobbin landing shot, hung as the reference piece */}
      <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, height: P.h, borderRadius: 10, background: "linear-gradient(155deg,#c9a24f,#6a4f1e)", padding: 7, boxShadow: "0 26px 48px -14px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,240,200,0.4)", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 7, top: 7, right: 7, bottom: 7, borderRadius: 5, background: "#15121b", border: "1px solid rgba(0,0,0,0.6)", overflow: "hidden" }}>
          <Img src={staticFile("refs/tool_mobbin_shot.jpg")} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", filter: `saturate(1.05) brightness(${0.9 + lampFlick * 0.14})` }} />
          {items.map((o) => (o.taken ? (
            <div key={"hole" + o.i} style={{ position: "absolute", left: o.sx - P.x - 7 - CW / 2, top: o.sy - P.y - 7 - CH / 2, width: CW, height: CH, borderRadius: 6, background: "rgba(8,6,12,0.72)", border: "1.5px dashed rgba(167,139,250,0.5)", boxShadow: "inset 0 6px 16px rgba(0,0,0,0.7)" }} />
          ) : null))}
          {items.map((o) => (o.sel > 0.01 ? (
            <div key={"sel" + o.i} style={{ position: "absolute", left: o.sx - P.x - 7 - CW / 2, top: o.sy - P.y - 7 - CH / 2, width: CW, height: CH, borderRadius: 6, border: `2px solid rgba(167,139,250,${0.9 * o.sel})`, boxShadow: `0 0 0 3px rgba(124,58,237,${0.25 * o.sel}), 0 0 22px rgba(167,139,250,${0.5 * o.sel})`, transform: `scale(${1 + (1 - o.sel) * 0.06})` }} />
          ) : null))}
          <div style={{ position: "absolute", left: sheenX, top: -60, width: 120, height: 420, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)", transform: "rotate(14deg)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: P.x + 40, top: 596, width: P.w - 80, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,228,180,0.10), transparent 70%)", filter: "blur(4px)", zIndex: 6 }} />

      {/* 7) key light + floor pool on the plinth */}
      <div style={{ position: "absolute", left: scx - 170, top: 0, width: 340, height: 540, background: `linear-gradient(180deg, rgba(226,214,255,${0.15 * keyPulse}), rgba(226,214,255,0.01) 80%)`, clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)", filter: "blur(3px)", zIndex: 9 }} />
      <div style={{ position: "absolute", left: scx - 200, top: 664, width: 400, height: 118, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(226,214,255,${0.16 * keyPulse}), transparent 70%)`, zIndex: 7 }} />

      {/* 8) the hero site, re-laying-out to match every screen it is handed */}
      <div style={{ position: "absolute", left: SITE.x, top: SITE.y + bob, width: SITE.w, height: SITE.h, borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid rgba(220,210,240,0.5)", boxShadow: `0 30px 60px -18px rgba(0,0,0,0.75), 0 0 ${18 + flash * 30}px rgba(167,139,250,${0.18 + flash * 0.4})`, transform: `scale(${siteScale})`, zIndex: 14 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "linear-gradient(180deg,#efedf3,#e2dfe8)", borderBottom: "1px solid #d5d1dc", display: "flex", alignItems: "center", gap: 5, paddingLeft: 10 }}>
          {["#e06a5c", "#e0b45c", "#6fbf8b"].map((c, k) => <div key={k} style={{ width: 7, height: 7, borderRadius: 4, background: c }} />)}
          <div style={{ marginLeft: 10, padding: "2px 10px", borderRadius: 999, background: "#faf9fc", border: "1px solid #ddd9e4", fontFamily: mono, fontSize: 8, color: "#8b8698" }}>yoursaas.com</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 26, bottom: 0, overflow: "hidden" }}>{siteBody}</div>
      </div>

      {/* 9) curator mascot, lit on the floor */}
      <div style={{ position: "absolute", left: MX - 110, top: MY + 84, width: 356, height: 118, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,226,180,0.13), transparent 70%)", zIndex: 6 }} />
      <div style={{ position: "absolute", left: MX - 46, top: MY + 118, width: 228, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", filter: "blur(4px)", zIndex: 15 }} />
      <div style={{ position: "absolute", left: MX, top: MY, zIndex: 20, filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.5))" }}>
        <Mascot lf={lf} size={MS} gaze={tgt && tgt.t > 0.5 ? 1 : -0.6} nodAmp={2.2} nodSpeed={11} stern={0.28} glasses={1} tint="#D97757" />
      </div>
      <div style={{ position: "absolute", left: SHx, top: SHy, width: armLen - 4, height: 13, borderRadius: 7, transformOrigin: "0 50%", transform: `rotate(${armAng}deg)`, background: "linear-gradient(180deg,#E58C68,#B85B3A)", boxShadow: "0 2px 5px rgba(0,0,0,0.45)", zIndex: 21 }} />
      <div style={{ position: "absolute", left: SHx + Math.cos((armAng * Math.PI) / 180) * armLen - 11, top: SHy + Math.sin((armAng * Math.PI) / 180) * armLen - 5, width: 22, height: 22, borderRadius: 11, background: "radial-gradient(circle at 38% 32%,#EE9E78,#B4553A)", border: "1.5px solid rgba(255,220,190,0.35)", boxShadow: "0 2px 6px rgba(0,0,0,0.5)", zIndex: 22 }} />

      {/* 10) real screens in flight, cropped straight out of the real shot */}
      {items.map((o) => (o.fly ? (
        <div key={"tr" + o.i} style={{ position: "absolute", left: o.x - 26, top: o.y - 26, width: 52, height: 52, borderRadius: 26, background: "radial-gradient(circle, rgba(196,172,255,0.55), transparent 70%)", filter: "blur(6px)", opacity: 0.7 * o.fade, zIndex: 29 }} />
      ) : null))}
      {items.map((o) => (o.fly ? (
        <div key={"rf" + o.i} style={{ position: "absolute", left: o.x - (CW * Z) / 2, top: o.y - (CH * Z) / 2, width: CW * Z, height: CH * Z, borderRadius: 9, overflow: "hidden", background: "#15121b", border: "1.5px solid rgba(190,170,245,0.6)", boxShadow: `0 16px 30px -8px rgba(0,0,0,0.7), 0 0 20px rgba(167,139,250,${0.35 * o.fade})`, opacity: o.fade, transform: `rotate(${-16 + o.t * 30 + o.r * 8}deg) scale(${0.9 + Math.sin(o.t * Math.PI) * 0.18 + o.t * 0.06})`, zIndex: 30 }}>
          <Img src={staticFile("refs/tool_mobbin_shot.jpg")} style={{ position: "absolute", left: -(o.sx - P.x - 7 - CW / 2 + 18) * Z, top: -(o.sy - P.y - 7 - CH / 2) * Z, width: 518 * Z, height: 272 * Z, maxWidth: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(167,139,250,0.14), rgba(20,12,40,0.32))" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: (lf * 5 + o.i * 30) % (CH * Z), height: 2, background: "rgba(214,196,255,0.6)" }} />
        </div>
      ) : null))}

      {/* 11) near dust, front depth layer */}
      {Array.from({ length: 7 }).map((_, i) => {
        const r = seed(i * 5.7 + 21);
        const bx = 30 + r * 950;
        const by = (((seed(i * 4.1 + 9) * 700 - lf * (0.8 + r * 0.9)) % 700) + 700) % 700;
        const s = 3 + r * 4;
        return <div key={"nd" + i} style={{ position: "absolute", left: bx, top: 60 + by, width: s, height: s, borderRadius: "50%", background: `rgba(250,238,220,${(0.12 + r * 0.14).toFixed(2)})`, filter: "blur(2px)", zIndex: 40 }} />;
      })}

      {/* 12) tool card: real logo + name + url (Mobbin has no public repo, so no star chip) */}
      <div style={{ position: "absolute", left: 196, top: 70, width: 620, height: 116, borderRadius: 20, background: "linear-gradient(158deg,#161d2e,#0b0f1c)", border: "1.5px solid rgba(160,178,225,0.3)", boxShadow: "0 24px 46px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)", overflow: "hidden", zIndex: 60 }}>
        <div style={{ position: "absolute", left: sheenX + 120, top: -40, width: 90, height: 220, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)", transform: "rotate(16deg)" }} />
        <div style={{ position: "absolute", left: 20, top: 20, width: 76, height: 76, borderRadius: 16, background: PAPER, border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 8px 18px -8px rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Img src={staticFile("refs/tool_mobbin_logo.png")} style={{ width: 58, height: 58, objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: 114, top: 24, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: PAPER, letterSpacing: "-0.02em" }}>Mobbin</div>
        <div style={{ position: "absolute", left: 116, top: 74, fontFamily: mono, fontSize: 20, color: "rgba(178,196,236,0.7)" }}>mobbin.com</div>
        <div style={{ position: "absolute", right: 24, top: 32, display: "flex", alignItems: "center", gap: 9 }}>
          {items.map((o) => {
            const on = o.land > 0.5 ? 1 : o.fly ? 0.55 : 0.16;
            return <div key={"pp" + o.i} style={{ width: 12, height: 12, borderRadius: 6, background: `rgba(167,139,250,${on})`, boxShadow: on > 0.5 ? "0 0 10px rgba(167,139,250,0.8)" : "none", border: "1px solid rgba(200,186,255,0.35)" }} />;
          })}
        </div>
        <div style={{ position: "absolute", right: 24, top: 62, fontFamily: mono, fontSize: 15, color: "rgba(178,196,236,0.55)", letterSpacing: "0.06em" }}>SCREENS LIFTED</div>
      </div>

      {/* 13) vignette */}
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.62)", zIndex: 55 }} />
    </Panel>
  );
};

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  // ==== BEAT MAP (93 frames @30) ====
  // 0..21   purple villain site sits on the lit stage, tweakcn card up top, editor scanning
  // 22      CLICK: mascot fires the theme wand, Apply depresses
  // 22..48  purple DRAINS out, warm theme sweeps up the hero, fonts + radius flip
  // 48..92  theme editor keeps CYCLING warm presets: hero recolours continuously,
  //         swatches + css tokens re-read every frame, preset ticker scrolls, dust drifts.
  //         Still visibly moving at frame 92.
  const CLICK = 22;

  const hx = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  const mix = (a: string, b: string, t: number) => {
    const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    return "#" + pa.map((v, i) => hx(v + (pb[i] - v) * t)).join("");
  };

  // ---- the SAME villain theme from the hook ----
  const PURPLE = { name: "AI default", top: "#7C3AED", bot: "#A78BFA", nav: "#6D34D6", btn: "#C4B5FD", bar: "#EDE8FA", url: "#DDD3F5" };
  // ---- warm custom themes tweakcn cycles through (keeps the scene alive to the last frame)
  const WARM = [
    { name: "Amber Clay", top: "#C6572B", bot: "#E7A94A", nav: "#B24E26", btn: "#E7A94A", bar: "#F4ECD8", url: "#E4D6B4" },
    { name: "Ember Rose", top: "#B03A55", bot: "#E88A5C", nav: "#963049", btn: "#F0A86A", bar: "#F6E9DE", url: "#EBD5C4" },
    { name: "Honey Sand", top: "#A5642B", bot: "#EFC463", nav: "#8C5322", btn: "#F2D07A", bar: "#F7F0DC", url: "#EBDFBC" },
  ];

  const drain = over(lf, CLICK, fr(0.86), Easing.inOut(Easing.cubic)); // 0..1 reskin progress
  const zap = over(lf, CLICK, fr(0.26), Easing.out(Easing.cubic));
  const depress = lf >= CLICK && lf < CLICK + 9;
  const bob = Math.sin(lf / 19) * 3;

  // continuous preset drift AFTER the first reskin lands
  const cyc = Math.max(0, (lf - (CLICK + 22)) / 15);
  const ci = Math.floor(cyc);
  const cf = cyc - ci;
  const k = 0.5 - 0.5 * Math.cos(cf * Math.PI); // always in motion, never a hard hold
  const A = WARM[ci % 3];
  const B = WARM[(ci + 1) % 3];
  const cur = {
    name: k < 0.5 ? A.name : B.name,
    top: mix(A.top, B.top, k), bot: mix(A.bot, B.bot, k), nav: mix(A.nav, B.nav, k),
    btn: mix(A.btn, B.btn, k), bar: mix(A.bar, B.bar, k), url: mix(A.url, B.url, k),
  };
  // live theme = villain purple blended into the drifting warm preset
  const th = {
    top: mix(PURPLE.top, cur.top, drain), bot: mix(PURPLE.bot, cur.bot, drain),
    nav: mix(PURPLE.nav, cur.nav, drain), btn: mix(PURPLE.btn, cur.btn, drain),
    bar: mix(PURPLE.bar, cur.bar, drain), url: mix(PURPLE.url, cur.url, drain),
  };
  const warmed = drain > 0.5;
  const bodyFont = warmed ? fraunces.fontFamily : inter.fontFamily;

  const tokens = [
    { k: "--primary", v: th.nav.toUpperCase() },
    { k: "--accent", v: th.bot.toUpperCase() },
    { k: "--background", v: th.bar.toUpperCase() },
  ];
  const swatches = [th.nav, th.top, th.bot, th.btn, th.bar];

  // ===== lit studio set (warms as the theme applies) =====
  const HORIZON = 468;
  const FLOORH = 792 - HORIZON;
  const STAGEX = 486;
  const wallTop = mix("#241830", "#3A2612", drain);
  const wallMid = mix("#1A1222", "#241708", drain);
  const wallBot = mix("#120C18", "#160D04", drain);
  const floorFar = mix("#2C2034", "#46301E", drain);
  const floorNear = mix("#100C16", "#160E07", drain);
  const gridWarm = warmed ? "230,180,120" : "150,140,190";
  const glowWarm = warmed ? "255,214,150" : "180,160,220";

  // bottom preset ticker (scrolls forever)
  const TICK = [
    { n: "Amber Clay", a: "#C6572B", b: "#E7A94A" },
    { n: "Ember Rose", a: "#B03A55", b: "#E88A5C" },
    { n: "Honey Sand", a: "#A5642B", b: "#EFC463" },
    { n: "Cocoa", a: "#5C3A26", b: "#C08A5A" },
    { n: "Marigold", a: "#C98A2E", b: "#F0D48A" },
    { n: "Terracotta", a: "#9A4A24", b: "#DE9A6A" },
    { n: "Sandstone", a: "#8A6A3A", b: "#E8D6A8" },
    { n: "Dusk Gold", a: "#7A3A3A", b: "#E7C36A" },
  ];
  const CW = 118;
  const tickOff = -((lf * 2.1) % (TICK.length * CW));

  return (
    <Panel label="tweakcn.com / theme editor">
      {/* ============ 1. BACK WALL + blueprint haze ============ */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${wallTop} 0%, ${wallMid} 62%, ${wallBot} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: HORIZON, opacity: 0.07, backgroundImage: `linear-gradient(${MUTE} 1px, transparent 1px), linear-gradient(90deg, ${MUTE} 1px, transparent 1px)`, backgroundSize: "56px 56px" }} />
      <div style={{ position: "absolute", left: STAGEX - 360, top: 180, width: 720, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${glowWarm},${0.12 + drain * 0.07}), transparent 70%)`, filter: "blur(10px)" }} />

      {/* ============ 2. PERSPECTIVE FLOOR ============ */}
      <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON, bottom: 0, background: `linear-gradient(180deg, ${floorFar} 0%, ${floorNear} 100%)` }} />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i - 6) / 6;
        const xTop = 506 + t * 54;
        const xBot = 506 + t * 780;
        const dx = xBot - xTop;
        const ang = Math.atan2(FLOORH, dx) * 180 / Math.PI;
        return <div key={"fg" + i} style={{ position: "absolute", left: xTop, top: HORIZON, width: FLOORH / Math.sin(ang * Math.PI / 180), height: 2, transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: `rgba(${gridWarm},${(0.12 - Math.abs(t) * 0.014).toFixed(3)})` }} />;
      })}
      {[6, 18, 38, 68, 112, 176, 260].map((dy, i) => {
        const w = 150 + dy * 3.2;
        return <div key={"fh" + i} style={{ position: "absolute", left: 506 - w / 2, top: HORIZON + dy, width: w, height: 2, background: `rgba(${gridWarm},${(0.13 - i * 0.014).toFixed(3)})` }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: HORIZON - 1, height: 2, background: `rgba(${glowWarm},0.4)`, boxShadow: `0 0 28px rgba(${glowWarm},0.5)` }} />

      {/* ============ 3. KEY LIGHT cone + lamp ============ */}
      <div style={{ position: "absolute", left: STAGEX - 150, top: 214, width: 300, height: 400, background: `linear-gradient(180deg, rgba(255,232,190,${0.1 + drain * 0.09}), rgba(255,232,190,0.01) 84%)`, clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", filter: "blur(4px)" }} />
      <div style={{ position: "absolute", left: STAGEX - 44, top: 216, width: 88, height: 22, borderRadius: "0 0 44px 44px", background: grad("#2A2016", "#151009"), border: `2px solid ${SLATE}`, boxShadow: `0 6px 18px rgba(0,0,0,0.5), 0 0 22px rgba(255,220,150,${0.34 + drain * 0.22})` }} />
      <div style={{ position: "absolute", left: STAGEX - 24, top: 234, width: 48, height: 8, borderRadius: 6, background: "rgba(255,226,170,0.9)", boxShadow: "0 0 16px rgba(255,220,150,0.8)" }} />
      <div style={{ position: "absolute", left: STAGEX - 210, top: 552, width: 420, height: 130, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,232,190,${0.14 + drain * 0.1}), transparent 70%)` }} />

      {/* ============ 4. CONTACT SHADOWS ============ */}
      <div style={{ position: "absolute", left: STAGEX - 200, top: 556, width: 400, height: 48, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 72%)", filter: "blur(6px)" }} />
      <div style={{ position: "absolute", left: 60, top: 566, width: 220, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.44), transparent 72%)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: 748, top: 512, width: 168, height: 32, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.44), transparent 70%)", filter: "blur(3px)" }} />

      {/* ============ 5. ATMOSPHERE dust ============ */}
      {Array.from({ length: 22 }).map((_, i) => {
        const r = seed(i * 3.1 + 7);
        const r2 = seed(i * 5.7 + 2);
        const x = 60 + r * 900;
        const y = 230 + ((seed(i * 2.3) * 540 + lf * (0.5 + r * 0.8)) % 540);
        const inCone = x > STAGEX - 180 && x < STAGEX + 180;
        const base = warmed ? "255,226,180" : "180,150,220";
        const op = (0.08 + r2 * 0.15) * (inCone ? 1.6 : 0.8);
        return <div key={"at" + i} style={{ position: "absolute", left: x, top: y, width: 2 + r * 4, height: 2 + r * 4, borderRadius: "50%", background: `rgba(${base},${Math.min(0.32, op).toFixed(2)})`, filter: "blur(0.4px)" }} />;
      })}

      {/* ================= TOOL CARD 5/5: tweakcn (real logo + real stars + real shot) ================= */}
      <div style={{ position: "absolute", left: 60, top: 62, width: 892, height: 152, borderRadius: 18, background: grad("#FCF7EC", "#EDE3CF"), border: `2px solid ${AMBER}`, boxShadow: `0 18px 40px rgba(0,0,0,0.5), 0 0 34px rgba(231,169,74,${0.1 + drain * 0.12}), inset 0 2px 0 rgba(255,255,255,0.9)` }}>
        {/* logo tile */}
        <div style={{ position: "absolute", left: 22, top: 42, width: 68, height: 68, borderRadius: 16, background: "#fff", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 6px 14px rgba(0,0,0,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("refs/tool_tweakcn_logo.png")} style={{ width: 48, height: 48, objectFit: "contain" }} />
        </div>
        {/* name + url */}
        <div style={{ position: "absolute", left: 106, top: 44 }}>
          <div style={{ font: fraunces.fontFamily, fontSize: 34, fontWeight: 900, color: INK, letterSpacing: -0.5, lineHeight: "38px" }}>tweakcn</div>
          <div style={{ font: mono, fontSize: 14, color: "#7C6A52", marginTop: 3 }}>tweakcn.com</div>
        </div>
        {/* real GitHub stars */}
        <div style={{ position: "absolute", left: 106, top: 106 }}>
          <Chip text="★ 10,171" bg="#241A12" bd={AMBER} fg={GOLD} size={13} />
        </div>
        {/* real landing shot as proof */}
        <div style={{ position: "absolute", left: 620, top: 11, width: 252, height: 130, borderRadius: 11, overflow: "hidden", border: "1px solid rgba(0,0,0,0.16)", boxShadow: "0 8px 18px rgba(0,0,0,0.24)", background: "#fff" }}>
          <Img src={staticFile("refs/tool_tweakcn_shot.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {/* live sheen keeps the proof breathing */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${((lf * 2.4) % 150) - 25}%`, width: "22%", background: "linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))", transform: "skewX(-14deg)" }} />
        </div>
      </div>

      {/* ================= LEFT: THEME TOKEN RAIL (angled into the room, reads live) ================= */}
      <div style={{ position: "absolute", left: 56, top: 250, width: 214, height: 316, transform: "perspective(1700px) rotateY(17deg)", transformOrigin: "left center" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: grad("#201811", "#150E09"), border: `1px solid ${SLATE}`, boxShadow: "0 20px 40px rgba(0,0,0,0.52)", padding: 15 }}>
          <div style={{ position: "absolute", left: 12, top: 3, right: 12, height: 3, borderRadius: 3, background: `rgba(255,232,190,${0.14 + drain * 0.12})` }} />
          <div style={{ font: mono, fontSize: 11, color: MUTE, letterSpacing: 1.4, marginBottom: 10 }}>THEME TOKENS</div>
          {/* live swatches */}
          <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
            {swatches.map((c, i) => {
              const on = drain > i * 0.14;
              const pulse = 1 + (on ? Math.sin(lf / 5 - i * 0.9) * 0.05 : 0);
              return <div key={"sw" + i} style={{ width: 29, height: 29, borderRadius: 8, background: c, border: `2px solid ${on ? CREAM : SLATE}`, boxShadow: on ? `0 0 0 3px rgba(231,169,74,0.16)` : "none", transform: `scale(${(on ? 1 : 0.86) * pulse})` }} />;
            })}
          </div>
          {/* css vars re-read every frame while the preset drifts */}
          {tokens.map((t) => (
            <div key={t.k} style={{ marginBottom: 9 }}>
              <div style={{ font: mono, fontSize: 11.5, color: CREAM, fontWeight: 700 }}>{t.k}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <div style={{ width: 11, height: 11, borderRadius: 3, background: t.v, border: `1px solid ${SLATE}` }} />
                <div style={{ font: mono, fontSize: 11.5, color: warmed ? GOLD : "#9B84C4" }}>{t.v}</div>
                <div style={{ width: 6, height: 12, background: lf % 16 < 8 ? GOLD : "transparent" }} />
              </div>
            </div>
          ))}
          {/* font swap */}
          <div style={{ marginTop: 2, borderRadius: 8, background: "#140E09", border: `1px solid ${SLATE}`, padding: "6px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ font: mono, fontSize: 11, color: MUTE }}>font</span>
            <span style={{ font: mono, fontSize: 11.5, color: warmed ? GOLD : "#9B84C4", fontWeight: 700 }}>{warmed ? "Fraunces" : "Inter"}</span>
          </div>
          {/* radius slider rides the reskin */}
          <div style={{ marginTop: 9 }}>
            <div style={{ position: "relative", height: 6, borderRadius: 3, background: "#3A2E24" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 6, width: `${18 + drain * 52 + (drain > 0.9 ? Math.sin(lf / 9) * 4 : 0)}%`, borderRadius: 3, background: GOLD }} />
              <div style={{ position: "absolute", left: `${18 + drain * 52 + (drain > 0.9 ? Math.sin(lf / 9) * 4 : 0)}%`, top: -4, width: 14, height: 14, borderRadius: "50%", background: CREAM, border: `2px solid ${GOLD}`, transform: "translateX(-50%)" }} />
            </div>
          </div>
          {/* Apply button, depresses on the click */}
          <div style={{ position: "absolute", left: 15, right: 15, bottom: 14 }}>
            <div style={{ borderRadius: 10, background: depress ? "#8A5A1E" : grad(GOLD, "#C98A2E"), border: `1px solid ${AMBER}`, textAlign: "center", padding: "9px 0", font: inter.fontFamily, fontSize: 13.5, fontWeight: 800, color: "#2A1D08", transform: `translateY(${depress ? 2 : 0}px)`, boxShadow: depress ? "0 1px 3px rgba(0,0,0,0.5) inset" : `0 6px 16px rgba(201,138,46,${0.3 + Math.abs(Math.sin(lf / 10)) * 0.2})` }}>
              Apply theme
            </div>
          </div>
        </div>
      </div>

      {/* ================= CENTER STAGE: THE VILLAIN SITE, re-skinning live ================= */}
      <div style={{ position: "absolute", left: STAGEX - 196, top: 262 + bob * 0.4, width: 392, height: 296, transform: "perspective(1900px) rotateY(-7deg)", transformOrigin: "center center" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 15, overflow: "hidden", border: `2px solid ${warmed ? AMBER : "#5B4A8E"}`, boxShadow: `0 26px 54px rgba(0,0,0,0.55), 0 0 40px rgba(255,220,150,${0.05 + drain * 0.14})`, background: "#fff" }}>
          {/* browser chrome */}
          <div style={{ height: 28, background: th.bar, display: "flex", alignItems: "center", padding: "0 11px", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E56A5A" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8B04A" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5FB07A" }} />
            <div style={{ marginLeft: 8, flex: 1, height: 13, borderRadius: 7, background: th.url }} />
          </div>
          {/* nav */}
          <div style={{ height: 30, background: th.nav, display: "flex", alignItems: "center", padding: "0 15px", gap: 15 }}>
            <div style={{ font: bodyFont, fontSize: 12, fontWeight: 800, color: "#fff" }}>Your SaaS</div>
            <div style={{ flex: 1 }} />
            {["Home", "Pricing", "Docs"].map((l) => <div key={l} style={{ font: bodyFont, fontSize: 10.5, color: "rgba(255,255,255,0.82)" }}>{l}</div>)}
          </div>
          {/* hero */}
          <div style={{ position: "relative", height: 234, background: `linear-gradient(135deg, ${th.top}, ${th.bot})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 11 }}>
            <div style={{ font: bodyFont, fontSize: 31, fontWeight: 900, color: "#fff", letterSpacing: warmed ? -0.6 : 0, textShadow: warmed ? "0 2px 8px rgba(110,55,10,0.35)" : "none" }}>Your SaaS</div>
            <div style={{ font: bodyFont, fontSize: 12.5, color: "rgba(255,255,255,0.9)", width: 270, textAlign: "center" }}>
              {warmed ? "Ship a product people trust on sight." : "Lorem ipsum dolor sit amet consectetur."}
            </div>
            <div style={{ marginTop: 2, borderRadius: warmed ? 12 : 999, background: th.btn, padding: warmed ? "10px 24px" : "8px 20px", font: bodyFont, fontSize: 12.5, fontWeight: 800, color: warmed ? "#2A1D08" : "#3A2C6E", boxShadow: warmed ? "0 8px 20px rgba(160,105,35,0.4)" : "none", border: warmed ? `1px solid ${AMBER}` : "none" }}>
              {warmed ? "Start building" : "Get Started"}
            </div>
            {/* reskin sweep line */}
            {drain > 0.02 && drain < 0.98 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - drain) * 100}%`, height: 28, background: `linear-gradient(180deg, rgba(231,169,74,0), ${GOLD}, rgba(231,169,74,0))`, opacity: 0.85, mixBlendMode: "screen" }} />
            )}
            {/* after the reskin: the live preset shimmer keeps travelling forever */}
            {drain > 0.98 && (
              <div style={{ position: "absolute", top: 0, bottom: 0, left: `${((lf * 1.9) % 160) - 30}%`, width: "26%", background: "linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))", transform: "skewX(-12deg)" }} />
            )}
          </div>
        </div>
      </div>

      {/* gold zap: wand -> stage on the click */}
      {zap > 0 && zap < 1 && (
        <>
          <div style={{ position: "absolute", left: STAGEX + 190, top: 392, width: 236, height: 5, borderRadius: 3, background: `linear-gradient(90deg, rgba(231,169,74,0), ${GOLD})`, transform: "rotate(6deg)", transformOrigin: "left center", opacity: 1 - zap }} />
          <div style={{ position: "absolute", left: STAGEX - 4, top: 400, width: 8, height: 8, borderRadius: "50%", background: GOLD, boxShadow: `0 0 0 ${zap * 90}px rgba(231,169,74,${0.3 * (1 - zap)})` }} />
        </>
      )}

      {/* ================= MASCOT: the colourist, wand aimed at the stage ================= */}
      <div style={{ position: "absolute", left: 758, top: 362 + bob, transform: `rotate(${depress ? 5 : 0}deg)` }}>
        <Mascot
          lf={lf}
          size={144}
          gaze={-16}
          nodAmp={2.4}
          nodSpeed={3}
          cheer={interpolate(lf, [CLICK + 5, CLICK + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          stern={interpolate(lf, [0, CLICK], [0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          paint={1}
          tint={AMBER}
        />
        {/* painter cap */}
        <div style={{ position: "absolute", left: 25, top: 2, width: 88, height: 32, borderRadius: "15px 15px 8px 8px", background: grad("#3B7D5B", "#2C5E44"), border: `2px solid ${INK}`, boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: 25, top: 23, width: 88, height: 8, background: GOLD, border: `1px solid ${AMBER}` }} />
        <div style={{ position: "absolute", left: 105, top: 11, width: 13, height: 11, borderRadius: 3, background: "#2C5E44", border: `1px solid ${INK}` }} />
        {/* colour vials on the strap, cycling with the live theme */}
        {[th.nav, th.bot, th.btn].map((c, i) => (
          <div key={"vial" + i} style={{ position: "absolute", left: 38 + i * 23, top: 94 + i * 8, width: 13, height: 25, borderRadius: 5, background: c, border: `2px solid ${INK}`, transform: "rotate(-18deg)", boxShadow: "0 3px 6px rgba(0,0,0,0.35)" }} />
        ))}
      </div>
      {/* theme wand in hand */}
      <div style={{ position: "absolute", left: 752, top: 372 + bob, transform: `rotate(${-14 + (depress ? -9 : 0) + Math.sin(lf / 13) * 2}deg)`, transformOrigin: "right center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 56, height: 11, borderRadius: 6, background: grad(CLAY, "#9A4A24"), border: `1.5px solid ${INK}`, boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: -20, top: -4, width: 21, height: 18, borderRadius: "6px 3px 3px 6px", background: grad(GOLD, "#C98A2E"), border: `1.5px solid ${AMBER}`, boxShadow: `0 0 ${8 + Math.abs(Math.sin(lf / 7)) * 8}px ${GOLD}` }} />
        {lf >= CLICK - 2 && lf < CLICK + 10 && (
          <div style={{ position: "absolute", left: -34, top: -9, width: 22, height: 22, background: GOLD, clipPath: "polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)", opacity: 1 - zap }} />
        )}
      </div>

      {/* ================= BOTTOM: PRESET TICKER (never stops scrolling) ================= */}
      <div style={{ position: "absolute", left: 60, top: 636, width: 892, height: 74, borderRadius: 14, background: grad("#20170F", "#140D08"), border: `1px solid ${SLATE}`, boxShadow: "0 16px 34px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,232,190,0.08)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: tickOff, top: 13, display: "flex", gap: 8 }}>
          {[...TICK, ...TICK].map((p, i) => (
            <div key={"tk" + i} style={{ width: 110, height: 48, borderRadius: 10, background: "#191108", border: `1px solid ${SLATE}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, padding: "0 10px" }}>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ width: 16, height: 8, borderRadius: 3, background: p.a }} />
                <div style={{ width: 16, height: 8, borderRadius: 3, background: p.b }} />
                <div style={{ width: 16, height: 8, borderRadius: 3, background: mix(p.a, p.b, 0.5) }} />
              </div>
              <div style={{ font: mono, fontSize: 10.5, color: MUTE }}>{p.n}</div>
            </div>
          ))}
        </div>
        {/* the live selection window over the ticker */}
        <div style={{ position: "absolute", left: 389, top: 9, width: 114, height: 56, borderRadius: 12, border: `2px solid ${GOLD}`, boxShadow: `0 0 18px rgba(231,169,74,${0.3 + Math.abs(Math.sin(lf / 8)) * 0.3}), inset 0 0 18px rgba(231,169,74,0.16)` }} />
        {/* edge fades so the loop never shows a seam */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 90, background: "linear-gradient(90deg, #17100A, rgba(23,16,10,0))" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 90, background: "linear-gradient(270deg, #17100A, rgba(23,16,10,0))" }} />
        {/* the currently-applied preset name, right side, changes as it drifts */}
        <div style={{ position: "absolute", right: 16, top: 27, font: inter.fontFamily, fontSize: 14, fontWeight: 800, color: warmed ? GOLD : "#9B84C4", letterSpacing: 0.4 }}>{warmed ? cur.name : PURPLE.name}</div>
      </div>

      {/* vignette seats the whole set */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />

      <Firework lf={lf} at={CLICK + 6} x={STAGEX} y={380} hue={2} />
      <Firework lf={lf} at={CLICK + 44} x={STAGEX} y={380} hue={1} />
    </Panel>
  );
};

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= LAYOUT ZONES (no overlap) =================
  // y 70..104   one counter chip (N/5 locked in  +  "+N more")
  // y 140..540  the locked STRUCTURE ring + the beautiful hero site (center 506,400)
  // y 650..750  comment DESIGN pill (left) + host mascot (right)
  const CX = 506, CY = 400, HW = 424, HH = 268;
  const HX = CX - HW / 2, HY = CY - HH / 2;

  const pulse = 0.5 + 0.5 * Math.sin(lf * 0.16);
  const pulse2 = 0.5 + 0.5 * Math.sin(lf * 0.27 + 1.2);

  const slots = [
    { name: "21st.dev", url: "21st.dev", logo: "refs/tool_21st_logo.png", a: GOLD, x: 190, y: 295 },
    { name: "Aceternity", url: "ui.aceternity.com", logo: "refs/tool_aceternity_logo.png", a: SLATE, x: 506, y: 190 },
    { name: "Magic UI", url: "magicui.design", logo: "refs/tool_magicui_logo.png", a: CLAY, x: 822, y: 295 },
    { name: "Mobbin", url: "mobbin.com", logo: "refs/tool_mobbin_logo.png", a: GREEN, x: 822, y: 505 },
    { name: "tweakcn", url: "tweakcn.com", logo: "refs/tool_tweakcn_logo.png", a: AMBER, x: 190, y: 505 },
  ];
  const CW = 212, CH = 64;
  const lockAt = (i: number) => 8 + i * 8;                       // 8,16,24,32,40
  const cardIn = (i: number) => over(lf, lockAt(i) - 14, fr(0.47), Easing.out(Easing.back(1.5)));
  const cardLock = (i: number) => over(lf, lockAt(i), fr(0.42));  // 0..1 flash decay driver
  const spokeOn = (i: number) => over(lf, lockAt(i) + 2, fr(0.32));
  const edgeOn = (i: number) => over(lf, lockAt(Math.max(i, (i + 1) % 5)) + 3, fr(0.3));

  // hero site keeps gaining polish as each tool locks in (the payoff: slop -> gorgeous)
  const p1 = over(lf, lockAt(0), fr(0.4));       // nav
  const p2 = over(lf, lockAt(1), fr(0.4));       // subhead
  const p3 = over(lf, lockAt(2), fr(0.4));       // component row
  const p4 = over(lf, lockAt(3), fr(0.4));       // rating row
  const p5 = over(lf, lockAt(4), fr(0.5));       // final theme saturation
  const full = over(lf, 40, fr(0.6));

  // "+12 more" ghost deck keeps filling in on the edge rails
  const ghostAt = (i: number) => 54 + i * 4;                      // 54..98
  const nMore = Math.max(0, Math.min(12, Math.floor((lf - ghostAt(0)) / 4) + 1));

  const pillIn = over(lf, 86, fr(0.55), Easing.out(Easing.back(1.4)));
  const point = over(lf, 92, fr(0.5));
  const chipPulse = 0.5 + 0.5 * Math.sin((lf - 86) * 0.3);

  const spin = lf * 0.55;
  const link = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1, dy = y2 - y1;
    return { len: Math.sqrt(dx * dx + dy * dy), ang: (Math.atan2(dy, dx) * 180) / Math.PI };
  };

  return (
    <Panel label="your stack , 5 of 5 locked in">
      {/* ============================================================ */}
      {/* ============ CINEMATIC SET: warm trophy gallery ============ */}
      {/* ============================================================ */}
      {/* 1) back wall */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2A2113 0%,#191204 58%,#0C0803 100%)" }} />
      {/* faint wall grid receding above the horizon */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 575, opacity: 0.06, backgroundImage: `linear-gradient(${MUTE} 1px, transparent 1px), linear-gradient(90deg, ${MUTE} 1px, transparent 1px)`, backgroundSize: "58px 58px" }} />
      {/* 2) slow rotating trophy starburst behind the structure */}
      <div style={{
        position: "absolute", left: CX - 340, top: CY - 340, width: 680, height: 680,
        transform: `rotate(${spin}deg)`, opacity: 0.10 + 0.05 * pulse,
        background: `repeating-conic-gradient(from 0deg at 50% 50%, ${GOLD} 0deg 8deg, transparent 8deg 18deg)`,
        borderRadius: "50%",
        maskImage: "radial-gradient(circle, #000 26%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, #000 26%, transparent 70%)",
      }} />
      {/* wall bloom behind the hero site */}
      <div style={{ position: "absolute", left: CX - 330, top: CY - 240, width: 660, height: 470, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,214,140,${(0.10 + 0.05 * pulse + full * 0.06).toFixed(3)}), transparent 70%)`, filter: "blur(10px)" }} />
      {/* 3) perspective floor */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 575, bottom: 0, background: "linear-gradient(180deg,#3A2C16 0%,#100A04 100%)" }} />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i - 6) / 6;
        const xTop = CX + t * 60, xBot = CX + t * 820;
        const ang = (Math.atan2(217, xBot - xTop) * 180) / Math.PI;
        return <div key={"fg" + i} style={{ position: "absolute", left: xTop, top: 575, width: 217 / Math.sin((ang * Math.PI) / 180), height: 2, transformOrigin: "0 0", transform: `rotate(${90 - ang}deg)`, background: `rgba(232,192,116,${(0.11 - Math.abs(t) * 0.012).toFixed(3)})` }} />;
      })}
      {[6, 20, 42, 76, 126, 194].map((dy, i) => {
        const w = 160 + dy * 4.2;
        return <div key={"fh" + i} style={{ position: "absolute", left: CX - w / 2, top: 575 + dy, width: w, height: 2, background: `rgba(232,192,116,${(0.13 - i * 0.017).toFixed(3)})` }} />;
      })}
      {/* glossy floor sheen + horizon glow */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 575, height: 190, background: "linear-gradient(180deg,rgba(255,224,150,0.07),rgba(255,224,150,0) 60%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 574, height: 2, background: `rgba(255,214,140,${(0.34 + 0.14 * pulse).toFixed(3)})`, boxShadow: `0 0 26px rgba(255,206,120,${(0.4 + 0.16 * pulse).toFixed(2)})` }} />
      {/* 4) marquee bulbs washing the back wall (cycling) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const on = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(lf * 0.26 + i * 0.8));
        return <div key={"bulb" + i} style={{ position: "absolute", left: 40 + i * 64, top: 118 + Math.sin(lf * 0.09 + i) * 2, width: 11, height: 11, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #FFF3D0, ${i % 2 ? AMBER : GOLD})`, boxShadow: `0 0 ${8 + on * 11}px rgba(214,158,46,${(on * 0.5).toFixed(2)})`, opacity: 0.45 }} />;
      })}
      {/* 5) volumetric key light onto the hero site + a rake light onto the host */}
      <div style={{ position: "absolute", left: CX - 170, top: 0, width: 340, height: 620, background: `linear-gradient(180deg,rgba(255,236,180,${(0.16 + full * 0.07).toFixed(3)}),rgba(255,236,180,0.01) 82%)`, clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", filter: "blur(4px)" }} />
      <div style={{ position: "absolute", left: 790, top: 120, width: 250, height: 560, background: "linear-gradient(180deg,rgba(255,232,168,0.11),rgba(255,232,168,0) 84%)", clipPath: "polygon(42% 0,62% 0,100% 100%,0 100%)", filter: "blur(5px)" }} />
      {/* 6) floor light pools */}
      <div style={{ position: "absolute", left: CX - 230, top: 540, width: 460, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse,rgba(255,232,168,${(0.14 + 0.05 * pulse).toFixed(3)}),transparent 70%)` }} />
      <div style={{ position: "absolute", left: 770, top: 640, width: 300, height: 108, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,232,168,0.15),transparent 70%)" }} />
      {/* 7) atmosphere: gold motes drifting up through the light */}
      {Array.from({ length: 22 }).map((_, i) => {
        const r = seed(i * 4.7 + 3), r2 = seed(i * 2.9 + 5);
        const y = (r2 * 760 + lf * (0.5 + r) * 0.9) % 760;
        return <div key={"mote" + i} style={{ position: "absolute", left: 20 + r * 972, top: 770 - y, width: 2 + r * 4, height: 2 + r * 4, borderRadius: "50%", background: GOLD, opacity: 0.08 + 0.16 * (0.5 + 0.5 * Math.sin(lf * 0.19 + i)) }} />;
      })}

      {/* ============ ONE counter chip: N/5 locked, then the list keeps growing ============ */}
      {(() => {
        const pop = over(lf, lockAt(4), fr(0.3)) * (1 - over(lf, lockAt(4) + 7, fr(0.3)));
        const done = lf >= lockAt(4);
        return (
          <div style={{ position: "absolute", left: 336, top: 72, width: 340, height: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transform: `scale(${1 + pop * 0.16})` }}>
            <div style={{ padding: "5px 14px", borderRadius: 999, background: done ? `linear-gradient(180deg, ${GOLD}, ${AMBER})` : "rgba(60,42,14,0.55)", border: `1px solid ${done ? "#6E4A16" : "rgba(232,192,116,0.4)"}`, fontFamily: mono, fontWeight: 700, fontSize: 14, color: done ? "#2A1E06" : "rgba(240,222,180,0.8)", whiteSpace: "nowrap", boxShadow: done ? `0 0 ${8 + pulse * 14}px rgba(214,158,46,${(0.3 + pulse * 0.35).toFixed(2)})` : "none" }}>
              {Math.min(5, Math.max(0, Math.floor((lf - lockAt(0)) / 8) + 1))}/5 locked in
            </div>
            <div style={{ opacity: nMore > 0 ? 0.9 : 0, padding: "5px 12px", borderRadius: 999, border: "1px dashed rgba(232,192,116,0.5)", background: "rgba(60,42,14,0.45)", fontFamily: mono, fontSize: 13, color: "rgba(240,222,180,0.88)", whiteSpace: "nowrap" }}>+{nMore} more</div>
          </div>
        );
      })()}

      {/* ============ GHOST DECK: the dozen more in the full list (own edge rails) ============ */}
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 2;                                   // 0 = left rail, 1 = right rail
        const row = Math.floor(i / 2);
        const gx = col === 0 ? 44 : 968;
        const gy = 178 + row * 68 + Math.sin(lf * 0.09 + i) * 3;
        const gin = over(lf, ghostAt(i), fr(0.36), Easing.out(Easing.back(1.6)));
        return (
          <div key={"gh" + i} style={{ position: "absolute", left: gx - 26, top: gy - 17, width: 52, height: 34, borderRadius: 9, opacity: gin * (0.34 + 0.18 * (0.5 + 0.5 * Math.sin(lf * 0.12 + i))), transform: `scale(${0.6 + gin * 0.4}) translateX(${(1 - gin) * (col === 0 ? -18 : 18)}px)`, background: "rgba(40,32,18,0.72)", border: "1px dashed rgba(232,192,116,0.45)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, padding: "0 9px" }}>
            <div style={{ height: 4, width: 26, borderRadius: 2, background: "rgba(232,192,116,0.5)" }} />
            <div style={{ height: 4, width: 16, borderRadius: 2, background: "rgba(232,192,116,0.3)" }} />
          </div>
        );
      })}

      {/* ============ THE STRUCTURE: ring edges + spokes (behind the site) ============ */}
      {slots.map((s, i) => {
        const n = slots[(i + 1) % 5];
        const { len, ang } = link(s.x, s.y, n.x, n.y);
        const on = edgeOn(i);
        return (
          <div key={"ed" + i} style={{ position: "absolute", left: s.x, top: s.y, width: len * on, height: 3, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, borderRadius: 2, background: `linear-gradient(90deg, rgba(232,192,116,${(0.30 + 0.3 * pulse).toFixed(2)}), rgba(232,192,116,${(0.5 + 0.3 * pulse).toFixed(2)}))`, boxShadow: `0 0 ${8 + pulse * 12}px rgba(214,158,46,${(0.3 + pulse * 0.3).toFixed(2)})` }} />
        );
      })}
      {/* beads chasing around the ring (never stops) */}
      {slots.map((s, i) => {
        const n = slots[(i + 1) % 5];
        const t = ((lf * 0.012 + i * 0.2) % 1);
        const bx = s.x + (n.x - s.x) * t, by = s.y + (n.y - s.y) * t;
        return <div key={"bd" + i} style={{ position: "absolute", left: bx - 5, top: by - 5, width: 10, height: 10, borderRadius: "50%", background: "#FFF3D0", opacity: edgeOn(i) * 0.9, boxShadow: `0 0 14px ${GOLD}` }} />;
      })}
      {/* spokes into the site + energy pips flowing inward forever */}
      {slots.map((s, i) => {
        const { len, ang } = link(s.x, s.y, CX, CY);
        const on = spokeOn(i);
        return (
          <div key={"sk" + i} style={{ position: "absolute", left: s.x, top: s.y, width: len, height: 2, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, opacity: on * (0.4 + 0.25 * pulse2), background: `linear-gradient(90deg, ${s.a}, rgba(232,192,116,0.1))` }} />
        );
      })}
      {slots.map((s, i) =>
        [0, 1, 2].map((k) => {
          const t = ((lf * 0.016 + k / 3 + i * 0.13) % 1);
          const px = s.x + (CX - s.x) * t, py = s.y + (CY - s.y) * t;
          return <div key={"pp" + i + "_" + k} style={{ position: "absolute", left: px - 4, top: py - 4, width: 8, height: 8, borderRadius: "50%", background: s.a, opacity: spokeOn(i) * (1 - t) * 0.85, boxShadow: `0 0 10px ${s.a}` }} />;
        })
      )}

      {/* ============ CAST SHADOWS ============ */}
      <div style={{ position: "absolute", left: CX - 210, top: 552, width: 420, height: 52, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 72%)", filter: "blur(6px)" }} />
      <div style={{ position: "absolute", left: 836, top: 682, width: 152, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,0,0,0.46),transparent 70%)", filter: "blur(4px)" }} />

      {/* ============ THE HERO SITE, now gorgeous ============ */}
      {(() => {
        const bob = Math.sin(lf * 0.06) * 3;
        const halo = 0.3 + 0.3 * pulse + full * 0.2;
        const sweep = ((lf * 7) % 620) - 120;                 // looping shimmer across the glass
        const hot = 0.86 + p5 * 0.14;                          // final saturation kick from tweakcn
        return (
          <div style={{ position: "absolute", left: HX, top: HY + bob, width: HW, height: HH }}>
            <div style={{ position: "absolute", inset: -8, borderRadius: 26, boxShadow: `0 0 ${26 + halo * 34}px rgba(214,158,46,${(halo * 0.5).toFixed(2)})` }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 18, overflow: "hidden", background: "#1A1B22", border: `2px solid rgba(232,192,116,${(0.35 + 0.25 * pulse).toFixed(2)})`, boxShadow: "0 26px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)" }}>
              {/* chrome */}
              <div style={{ height: 32, background: "linear-gradient(180deg,#2B2D38,#22242E)", display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {[RED, AMBER, GREEN].map((c) => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
                <div style={{ marginLeft: 8, flex: 1, height: 16, borderRadius: 8, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", padding: "0 8px", fontFamily: mono, fontSize: 9, color: "rgba(240,226,196,0.7)" }}>yoursaas.com</div>
              </div>
              {/* page */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 32, bottom: 0, background: `linear-gradient(150deg, rgba(198,87,43,${hot}) 0%, rgba(231,169,74,${hot}) 100%)` }}>
                {/* soft light bloom in the page */}
                <div style={{ position: "absolute", left: 40, top: -60, width: 340, height: 200, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,240,205,0.35),transparent 70%)" }} />
                {/* nav */}
                <div style={{ position: "absolute", left: 16, right: 16, top: 10, height: 18, display: "flex", alignItems: "center", gap: 10, opacity: p1, transform: `translateY(${(1 - p1) * -6}px)` }}>
                  <div style={{ width: 12, height: 12, borderRadius: 4, background: "#FFF6E4" }} />
                  {["Product", "Pricing", "Docs"].map((t) => <div key={t} style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9, color: "rgba(255,247,232,0.9)" }}>{t}</div>)}
                  <div style={{ flex: 1 }} />
                  <div style={{ padding: "3px 9px", borderRadius: 999, border: "1px solid rgba(255,247,232,0.6)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 8, color: "#FFF7E8" }}>Log in</div>
                </div>
                {/* hero copy */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: -0.5, color: "#FFF8EC", textShadow: "0 3px 10px rgba(80,30,6,0.35)" }}>Your SaaS</div>
                  <div style={{ opacity: p2, fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 11, color: "rgba(255,244,225,0.92)" }}>Ship the thing. Skip the slop.</div>
                  <div style={{ marginTop: 3, padding: "7px 18px", borderRadius: 12, background: "linear-gradient(180deg,#FFF8EC,#F4E4C6)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#8A3F14", boxShadow: `0 6px 16px rgba(60,20,0,0.35), 0 0 ${6 + pulse * 12}px rgba(255,240,200,${(0.3 + pulse * 0.4).toFixed(2)})` }}>Get Started</div>
                </div>
                {/* component row (Magic UI) */}
                <div style={{ position: "absolute", left: 26, right: 26, top: 158, height: 40, display: "flex", gap: 10, opacity: p3, transform: `translateY(${(1 - p3) * 10}px)` }}>
                  {[0, 1, 2].map((k) => (
                    <div key={"cc" + k} style={{ flex: 1, borderRadius: 9, background: "rgba(255,248,236,0.16)", border: "1px solid rgba(255,248,236,0.35)", padding: 6, display: "flex", flexDirection: "column", gap: 5, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" }}>
                      <div style={{ width: 14, height: 5, borderRadius: 3, background: "rgba(255,248,236,0.9)", transform: `scaleX(${1 + 0.35 * (0.5 + 0.5 * Math.sin(lf * 0.16 + k))})`, transformOrigin: "0 50%" }} />
                      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,248,236,0.55)" }} />
                      <div style={{ height: 4, width: "60%", borderRadius: 2, background: "rgba(255,248,236,0.35)" }} />
                    </div>
                  ))}
                </div>
                {/* rating row (Mobbin patterns) */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 206, display: "flex", justifyContent: "center", alignItems: "center", gap: 5, opacity: p4 }}>
                  {[0, 1, 2, 3, 4].map((k) => <div key={"st" + k} style={{ fontSize: 9, color: "#FFF6E0", opacity: 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(lf * 0.2 - k * 0.5)) }}>★</div>)}
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 8, color: "rgba(255,246,224,0.8)", marginLeft: 3 }}>loved by builders</div>
                </div>
              </div>
              {/* looping glass shimmer */}
              <div style={{ position: "absolute", left: sweep, top: 0, width: 90, height: HH, background: "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.16),rgba(255,255,255,0))", transform: "skewX(-14deg)" }} />
            </div>
          </div>
        );
      })()}

      {/* ============ THE 5 TOOL CARDS (real logos) locking into the ring ============ */}
      {slots.map((s, i) => {
        const inn = cardIn(i);
        const fl = 1 - cardLock(i);
        const outX = CX + (s.x - CX) * 1.35, outY = CY + (s.y - CY) * 1.35;
        const x = outX + (s.x - outX) * inn, y = outY + (s.y - outY) * inn + Math.sin(lf * 0.09 + i * 1.1) * 2.5;
        return (
          <div key={"tc" + i} style={{ position: "absolute", left: x - CW / 2, top: y - CH / 2, width: CW, height: CH, opacity: inn, transform: `scale(${0.82 + inn * 0.18})` }}>
            <div style={{ position: "absolute", inset: -6, borderRadius: 20, boxShadow: `0 0 ${10 + fl * 40 + pulse * 8}px rgba(232,192,116,${(0.2 + fl * 0.6).toFixed(2)})` }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 15, background: "linear-gradient(180deg,#2A2D39,#1B1E27)", border: `1px solid ${s.a}77`, boxShadow: "0 14px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 11, padding: "0 12px", overflow: "hidden" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: "linear-gradient(180deg,#FFFFFF,#EFEAE0)", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 3px 8px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(s.logo)} style={{ width: 26, height: 26, objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0, overflow: "hidden" }}>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: CREAM, whiteSpace: "nowrap" }}>{s.name}</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: MUTE, whiteSpace: "nowrap" }}>{s.url}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: GREEN, border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff", transform: `scale(${0.7 + cardLock(i) * 0.3})` }}>✓</div>
              {/* lock flash sweeping the card */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,240,200,0.9)", opacity: fl * 0.55, mixBlendMode: "screen" }} />
            </div>
          </div>
        );
      })}

      {/* ============ HOST MASCOT pointing at the CTA ============ */}
      <div style={{ position: "absolute", left: 828, top: 548, transform: `translateY(${(1 - over(lf, 4, fr(0.5))) * 22}px)`, opacity: over(lf, 4, fr(0.5)) }}>
        <div style={{ position: "relative", zIndex: 3 }}>
          <Mascot lf={lf} size={150} gaze={-7} nodAmp={2.6} nodSpeed={7} cheer={Math.max(0.25, 1 - point)} bowtie={1} />
        </div>
        {/* presenter glove pointing down-left at the comment pill */}
        <div style={{ position: "absolute", left: -14, top: 96, width: 30, height: 30, borderRadius: "50% 50% 50% 4px", background: CREAM, border: "2px solid #C9B9A0", boxShadow: "0 4px 8px rgba(0,0,0,0.3)", zIndex: 6, transform: `translate(${point * -10}px, ${point * 12}px) rotate(${18 - point * 42 + Math.sin(lf * 0.25) * 3}deg)`, transformOrigin: "80% 20%" }} />
      </div>

      {/* ============ COMMENT DESIGN pill (the CTA) ============ */}
      {(() => {
        const w = 540, h = 96, cx = 430, cy = 700;
        const glow = 0.35 + 0.45 * chipPulse;
        return (
          <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2 + (1 - pillIn) * 42, width: w, height: h, opacity: Math.max(pillIn, 0.001), transform: `scale(${0.92 + pillIn * 0.08}) translateY(${Math.sin(lf * 0.1) * 2}px)` }}>
            <div style={{ position: "absolute", inset: -10, borderRadius: 32, boxShadow: `0 0 ${18 + glow * 30}px rgba(214,158,46,${(glow * 0.55).toFixed(2)})` }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "linear-gradient(180deg,#FBF6EC,#EFE5D4)", border: `2px solid ${GOLD}`, boxShadow: "0 18px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.85)", display: "flex", alignItems: "center", padding: "0 18px", gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${CLAY}, ${AMBER})`, border: "2px solid #fff", boxShadow: "0 3px 6px rgba(0,0,0,0.2)" }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 19, color: SLATE }}>Comment</span>
              <div style={{ padding: "6px 15px", borderRadius: 10, background: `linear-gradient(180deg, ${GOLD}, ${AMBER})`, border: "2px solid #6E4A16", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: 2, color: "#2A1E06", boxShadow: `0 0 ${8 + glow * 16}px rgba(214,158,46,${(glow * 0.7).toFixed(2)})`, transform: `scale(${1 + glow * 0.03})` }}>DESIGN</div>
              <div style={{ width: 3, height: 28, borderRadius: 2, background: INK, opacity: Math.sin(lf * 0.45) > 0 ? 0.85 : 0.1 }} />
              <div style={{ flex: 1 }} />
              <div style={{ width: 46, height: 46, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg, ${GREEN}, #2F855A)`, border: "2px solid rgba(255,255,255,0.4)", boxShadow: `0 4px 10px rgba(0,0,0,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 21, fontWeight: 900, transform: `scale(${1 + (0.5 + 0.5 * Math.sin(lf * 0.34)) * 0.06})` }}>➤</div>
            </div>
          </div>
        );
      })()}

      {/* ============ CONFETTI raining to the last frame ============ */}
      {Array.from({ length: 28 }).map((_, i) => {
        const r = seed(i * 3.1 + 7), r2 = seed(i * 1.9 + 2), r3 = seed(i * 5.3 + 4);
        const spd = 2.4 + r * 3.4;
        const y = ((r2 * 900 + Math.max(0, lf - 40) * spd) % 900) - 70;
        const x = 22 + r * 968 + Math.sin(lf * 0.07 + i) * 16;
        const cols = [GOLD, AMBER, GREEN, CLAY, CREAM];
        return <div key={"cf" + i} style={{ position: "absolute", left: x, top: y, width: 7, height: 10, borderRadius: 2, background: cols[i % 5], opacity: over(lf, 40, fr(0.4)) * 0.85, transform: `rotate(${r3 * 360 + lf * 9}deg)`, boxShadow: "0 1px 2px rgba(0,0,0,0.25)", zIndex: 30 }} />;
      })}

      <Firework lf={lf} at={44} x={240} y={200} hue={0} />
      <Firework lf={lf} at={62} x={840} y={190} hue={2} />
      <Firework lf={lf} at={92} x={150} y={620} hue={1} />
      <Firework lf={lf} at={116} x={900} y={430} hue={3} />

      {/* vignette seats it all on the stage */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)" }} />
    </Panel>
  );
};

// ---------------- progress bar: TASTE meter + 5-tool tracker ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const toolTimes = [L[4], L[5], L[5], L[6], L[7]];
  const count = toolTimes.filter((x) => t >= x).length;
  const litTimes = toolTimes.filter((x) => t >= x);
  const lastTool = litTimes.length ? Math.max(...litTimes) : -9;
  const pop = Math.max(0, 1 - (t - lastTool) * 3);
  const giftOpen = over(f, Lf[8] + fr(0.3), fr(0.5), Easing.out(Easing.back(2)));
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const np = (i + 1) / 6;
        const lit = count > i;
        const dt = lit ? t - toolTimes[i] : 99;
        const pp = lit ? 1 + Math.max(0, 1 - dt * 2.2) * 0.5 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 4, transform: "translateX(-50%)", width: 50, height: 50 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pp})`, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${lit ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: lit ? "#3a2a05" : GOLD, boxShadow: lit ? (dt < 0.5 ? `0 0 ${Math.max(8, 26 - dt * 36)}px ${GOLD}` : `0 0 13px ${GOLD}99`) : `0 0 9px ${GOLD}44` }}>{lit ? "✓" : i + 1}</div>
            {lit && dt < 0.7 && <div style={{ position: "absolute", left: 25, top: 25, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + dt * 12})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
          </div>);
      })}
      <div style={{ position: "absolute", right: -22, top: -20, width: 90, height: 90, transform: `translateY(${Math.sin(t * 2.4) * 3}px) scale(${1 + giftOpen * 0.12})`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${giftOpen > 0.1 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + giftOpen * 22}px ${GOLD}66` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, lineHeight: 1, filter: giftOpen > 0.1 ? "none" : "grayscale(0.6) brightness(0.85)", opacity: giftOpen > 0.1 ? 1 : 0.62, transform: `scale(${0.84 + giftOpen * 0.16})` }}>{"🎁"}</div>
      </div>
      <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: pop > 0.05 ? `0 0 ${14 + pop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + pop * 2.4} nodSpeed={6.5} cheer={Math.max(pop * 0.8, count >= 5 ? 0.7 : 0)} beret={count >= 3 ? 1 : 0} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + pop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: pop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>TASTE {count}/5</div>
      </div>
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

export const ClaudeDesignStackReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.026;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const toolTimes = [L[4], L[5], L[5], L[6], L[7]];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_designstack.wav")} />
      <Audio loop src={staticFile("ebm_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[8]) - 8, fr(L[8]) + 14, 99999], [0, 0.1, 0.1, 0.075, 0.075], { extrapolateRight: "clamp" })} />
      {/* ================== SOUND DESIGN (scene by scene, synced to the real beats) ================== */}
      {/* scene-boundary swishes (light, so they never fight the scene beds) */}
      {L.slice(1).map((tt, i) => <Sfx key={`b${i}`} at={tt - 0.07} src="lib_whoosh.wav" v={0.3} dur={0.6} />)}
      {/* tool-lock milestone chimes */}
      {toolTimes.map((tt, i) => <React.Fragment key={`tk${i}`}><Sfx at={tt + 0.12} src="ding.wav" v={0.3} dur={0.7} /><Sfx at={tt + 0.14} src="chimehi.wav" v={0.2} dur={0.6} /></React.Fragment>)}

      {/* ===== S0 HOOK: a projector room, a press stamping out clone sites ===== */}
      <Sfx at={0} src="metal_riser.wav" v={0.5} />
      <Sfx at={0.08} src="lib_cinematic_hit.wav" v={0.44} />
      {[0, 1.98, 3.96].map((tt, i) => <Sfx key={`prj${i}`} at={tt} src="projector.wav" v={0.32} dur={2.05} />)}
      {[0.02, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8].map((tt, i) => (
        <React.Fragment key={`stp${i}`}>
          <Sfx at={tt} src="stamp_press.wav" v={0.36} dur={0.5} />
          <Sfx at={tt + 0.04} src="lib_pop.wav" v={0.13} dur={0.3} />
        </React.Fragment>
      ))}
      <Sfx at={5.0} src="lib_deep_whoosh.wav" v={0.26} dur={0.8} />

      {/* ===== S1 SLOT MACHINE: 4 pulls, each = lever -> reels spin -> 3 stops -> sad payout -> another slop site ===== */}
      {[8, 60, 112, 164].map((pf, i) => {
        const p = L[1] + pf / 30;
        return (
          <React.Fragment key={`slot${i}`}>
            <Sfx at={p} src="slot_lever.wav" v={0.46} dur={0.5} />
            <Sfx at={p + 0.08} src="slot_spin.wav" v={0.32} dur={1.05} />
            <Sfx at={p + 16 / 30} src="slot_stop.wav" v={0.4} dur={0.3} />
            <Sfx at={p + 22 / 30} src="slot_stop.wav" v={0.42} dur={0.3} />
            <Sfx at={p + 28 / 30} src="slot_stop.wav" v={0.46} dur={0.3} />
            <Sfx at={p + 34 / 30} src="slot_lose.wav" v={0.34} dur={0.8} />
            <Sfx at={p + 40 / 30} src="stamp_press.wav" v={0.24} dur={0.4} />
          </React.Fragment>
        );
      })}

      {/* ===== S2 PROMISE: the "better prompt" gets binned, then 5 tools install ===== */}
      <Sfx at={L[2] + 0.45} src="screech.wav" v={0.16} dur={0.6} /><Sfx at={L[2] + 0.55} src="crash.wav" v={0.26} dur={0.6} />
      {[40, 58, 76, 94, 114].map((f, i) => {
        const t = L[2] + f / 30;
        return (
          <React.Fragment key={`inst${i}`}>
            <Sfx at={t - 0.16} src="lib_whoosh_fast.wav" v={0.24} dur={0.4} />
            <Sfx at={t} src="thock.wav" v={0.36} dur={0.4} />
            <Sfx at={t + 0.03} src={`blip${(i % 5) + 1}.wav`} v={0.22} dur={0.3} />
          </React.Fragment>
        );
      })}
      <Sfx at={L[2] + 4.0} src="c_powerbig.wav" v={0.4} /><Sfx at={L[2] + 4.05} src="sparkle.wav" v={0.34} dur={1.1} />

      {/* ===== S3 SAVE: stamp, 5 envelopes whoosh into the phone, phone buzzes ===== */}
      <Sfx at={L[3] + 0.75} src="stamp_press.wav" v={0.34} dur={0.4} /><Sfx at={L[3] + 0.8} src="lib_confirm.wav" v={0.3} dur={0.6} />
      {[34, 52, 70, 88, 106].map((f, i) => {
        const t = L[3] + f / 30;
        return (
          <React.Fragment key={`env${i}`}>
            <Sfx at={t} src="lib_whoosh_fast.wav" v={0.26} dur={0.4} />
            <Sfx at={t + 15 / 30} src="lib_notif.wav" v={0.3} dur={0.5} />
            <Sfx at={t + 15 / 30 + 0.02} src="lib_pop2.wav" v={0.2} dur={0.3} />
          </React.Fragment>
        );
      })}

      {/* ===== S4 21st.dev: grab a component, drag it, paste it in (x3) ===== */}
      {[6, 46, 86].map((f, i) => {
        const t = L[4] + f / 30;
        return (
          <React.Fragment key={`paste${i}`}>
            <Sfx at={t} src="lib_click.wav" v={0.34} dur={0.3} />
            <Sfx at={t + 0.2} src="lib_whoosh.wav" v={0.24} dur={0.5} />
            <Sfx at={t + 0.62} src="thock.wav" v={0.38} dur={0.4} />
            <Sfx at={t + 0.66} src="shimmer.wav" v={0.24} dur={0.7} />
          </React.Fragment>
        );
      })}

      {/* ===== S5 Aceternity + Magic UI: motion sweeps, then it feels expensive ===== */}
      <Sfx at={L[5] + 0.15} src="lib_magic_reveal.wav" v={0.34} dur={1.0} />
      {[0.5, 1.4, 2.3].map((tt, i) => <Sfx key={`shm${i}`} at={L[5] + tt} src="shimmer.wav" v={0.28} dur={0.8} />)}
      {[0.9, 1.8].map((tt, i) => <Sfx key={`sw${i}`} at={L[5] + tt} src="swooshup.wav" v={0.22} dur={0.5} />)}
      <Sfx at={L[5] + 2.6} src="ice-in-glass.mp3" v={0.3} dur={0.9} /><Sfx at={L[5] + 2.66} src="chimehi.wav" v={0.28} dur={0.8} />

      {/* ===== S6 Mobbin: lifting real app-screen references ===== */}
      <Sfx at={L[6] + 0.12} src="lib_deep_whoosh.wav" v={0.24} dur={0.6} />
      {[0.55, 1.35].map((tt, i) => (
        <React.Fragment key={`shot${i}`}>
          <Sfx at={L[6] + tt} src="lib_camera_shutter.wav" v={0.36} dur={0.4} />
          <Sfx at={L[6] + tt + 0.18} src="swish.wav" v={0.24} dur={0.4} />
        </React.Fragment>
      ))}
      <Sfx at={L[6] + 2.1} src="thock.wav" v={0.32} dur={0.4} /><Sfx at={L[6] + 2.14} src="lib_correct.wav" v={0.24} dur={0.5} />

      {/* ===== S7 tweakcn: ONE click, the purple drains, theme locks ===== */}
      {[0.35, 0.6].map((tt, i) => <Sfx key={`tk7${i}`} at={L[7] + tt} src="lib_click.wav" v={0.24} dur={0.3} />)}
      <Sfx at={L[7] + 0.95} src="lib_click.wav" v={0.4} dur={0.3} />
      <Sfx at={L[7] + 1.02} src="lib_magic_reveal.wav" v={0.46} dur={1.3} />
      <Sfx at={L[7] + 1.06} src="swooshdn.wav" v={0.3} dur={0.6} />
      <Sfx at={L[7] + 2.25} src="resolve.wav" v={0.36} /><Sfx at={L[7] + 2.3} src="chimehi.wav" v={0.28} dur={0.8} />

      {/* ===== S8 CTA: the stack locks, reward, comment pill ===== */}
      <Sfx at={L[8] + 0.08} src="resolve.wav" v={0.44} />
      <Sfx at={L[8] + 1.35} src="c_unlock.wav" v={0.38} /><Sfx at={L[8] + 1.4} src="sparkle.wav" v={0.4} dur={1.2} />
      <Sfx at={L[8] + 1.5} src="crowd_cheer.wav" v={0.12} dur={1.8} />
      {[1.85, 2.15, 2.45].map((tt, i) => <Sfx key={`cn${i}`} at={L[8] + tt} src="c_coin.wav" v={0.24} dur={0.4} />)}
      <Sfx at={L[8] + 2.95} src="lib_pop.wav" v={0.38} dur={0.5} /><Sfx at={L[8] + 3.0} src="ding.wav" v={0.32} dur={0.7} />
      <Sfx at={L[8] + 3.5} src="c_1up.wav" v={0.26} />
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <S0 lf={frame - Lf[0]} />}
        {scene(1) && <S1 lf={frame - Lf[1]} />}
        {scene(2) && <S2 lf={frame - Lf[2]} />}
        {scene(3) && <S3 lf={frame - Lf[3]} />}
        {scene(4) && <S4 lf={frame - Lf[4]} />}
        {scene(5) && <S5 lf={frame - Lf[5]} />}
        {scene(6) && <S6 lf={frame - Lf[6]} />}
        {scene(7) && <S7 lf={frame - Lf[7]} />}
        {scene(8) && <S8 lf={frame - Lf[8]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.45, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
