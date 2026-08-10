import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_takes.json";

// ============================================================================
// REEL 62 - TAKES - "Claude vs Take One"  (v5: NEON GARAGE / RACE CARS)
// You only ever see Claude's FIRST take. Build the car five times, let a blind
// sixth judge pick the best build. World = a vibrant neon night garage; the job
// = a RACE CAR; the attempt = the car; the grade = the winner's lift lighting green.
// House chassis per CLAUDE-REELS-PLAYBOOK.md: cream bg + <Panel> + karaoke pills +
// top ProgressBar rail. Panel-local 1012x792. NOT split-screen.
// ============================================================================

const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";

// ---- PREMIUM AUTOMOTIVE-CINEMATIC PALETTE (v7: Alex "neon looks cheap, make it polished, focus on
// the cars"). A graphite studio, warm KEY + cool FILL cinematic lighting, chrome + real materials.
// Colour comes from the CAR PAINT and the lighting, NOT glowing neon tubes/grids/signs. ----
const HERO = "#D97757";      // warm clay. THE HERO ALONE.
const PRIMER = "#6B6E78";    // grey primer. Take One + the five copies + the sixth.
// premium environment (graphite studio, not indigo neon)
const GRAPHITE = "#28304A", CHARCOAL = "#171B2C", NIGHT = "#1E2540", NIGHT2 = "#101324";
const KEY = "#FFD59A";       // warm studio key light
const FILL = "#7E93A6";      // cool steel fill light
const STEEL = "#3A4149";     // brushed steel / dark trim
const RIM = "#FFF3E0";       // warm rim highlight
const CHROME = "#CBD2DC";    // polished chrome
const COOL = "#93B2CE";      // cool steel-blue: the inspection room's own light
// tasteful ACCENT hues (used sparingly as rim/accent lights, NOT as a whole-frame neon wash)
const MAGENTA = "#FF3D8B", CYAN = "#1FD6E6", ELECTRIC = "#3D6BFF", HOTPINK = "#FF5FA2";
const LIME = "#9BE81E", NEONGOLD = "#FFC01E", NEONORANGE = "#FF7A1A", VIOLET = "#A24BFF";
const AZURE = "#22B8FF", TEAL = "#12E0C0", PURP = "#B24BFF", HOTRED = "#FF3B4E";
// candy car paints (deep, glossy, premium)
const CAR_CHERRY = "#C42232", CAR_BLUE = "#2C5FB8", CAR_LIME = "#5FA82E", CAR_TANGERINE = "#E8791E", CAR_VIOLET = "#7B4FB0";
// GREEN (#3F9E74) RESERVED: the winner in S7. SHIPIT gold-grey = the smug premature "done".
const SHIPIT = "#C9A227";

const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec), from words_takes.json. Same VO + timeline as before.
// S0 finish+ship1 | S1 cooler car blocked | S2 defend | S3 five bays on | S4 five wild cars
// S5 inspection bay | S6 plates blacked | S7 winner + crusher | S8 hero takes the car | S9 drive off + CTA
const L = [0, 2.63, 7.68, 11.16, 14.55, 17.28, 21.94, 26.23, 31.14, 34.78];
const Lf = L.map(fr);
const CUT = 38.0;
const TAKEMARKS = [L[3], L[4], L[5], L[6], L[7]];

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

// pixel Claude mascot (canonical critter) + costumes. UNCHANGED from the shipped chassis.
export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; tint?: string; beret?: number; shades?: number; bowtie?: number; heistMask?: number; paint?: number; suit?: number; earpiece?: number; hardHat?: number; capBack?: number; hiVis?: number; freshEyes?: number; wrapShades?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, tint, beret = 0, shades = 0, bowtie = 0, heistMask = 0, paint = 0, suit = 0, earpiece = 0, hardHat = 0, capBack = 0, hiVis = 0, freshEyes = 0, wrapShades = 0 }) => {
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
        {/* THE VILLAIN's suit: black jacket, sharp shoulders, white collar, skinny tie, dark trousers */}
        {suit > 0 && <>
          <rect x={52} y={146 - legLift(0)} width={17} height={38} fill="#1A1D24" />
          <rect x={77} y={146 - legLift(1)} width={17} height={38} fill="#1A1D24" />
          <rect x={124} y={146 - legLift(0)} width={17} height={38} fill="#1A1D24" />
          <rect x={149} y={146 - legLift(1)} width={17} height={38} fill="#1A1D24" />
          {/* an OPEN jacket, not a black box: the slate body still reads between the lapels */}
          <rect x={70} y={100} width={60} height={46} fill="#E6E3DA" />
          <rect x={34} y={100} width={38} height={46} fill="#15171C" />
          <rect x={128} y={100} width={38} height={46} fill="#15171C" />
          <rect x={34} y={100} width={38} height={5} fill="#272C36" />
          <rect x={128} y={100} width={38} height={5} fill="#272C36" />
          <rect x={26} y={100} width={12} height={22} fill="#15171C" />
          <rect x={162} y={100} width={12} height={22} fill="#15171C" />
          <polygon points="72,100 97,100 72,142" fill="#20242E" />
          <polygon points="128,100 103,100 128,142" fill="#20242E" />
          <rect x={94} y={100} width={13} height={46} fill="#0B0D11" />
          <rect x={94} y={100} width={13} height={4} fill="#2A3038" />
          <rect x={137} y={110} width={7} height={7} fill={FAKE} />
        </>}
        {/* hi-vis vest (YOU, the instructor cameo) */}
        {hiVis > 0 && <>
          <rect x={38} y={94} width={124} height={52} fill="#E4C43A" />
          <rect x={38} y={104} width={124} height={7} fill="#EDEAE0" />
          <rect x={38} y={126} width={124} height={7} fill="#EDEAE0" />
          <rect x={96} y={94} width={9} height={52} fill="rgba(0,0,0,0.18)" />
        </>}
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {/* FRESH EYES: no memory, no ego. Eyes burn clean white. */}
        {freshEyes > 0 && <>
          <rect x={68 + gaze} y={68 + (26 - eyeH) / 2} width={19} height={eyeH + 4} fill="#F6FBFF" opacity={0.35 * freshEyes} />
          <rect x={114 + gaze} y={68 + (26 - eyeH) / 2} width={19} height={eyeH + 4} fill="#F6FBFF" opacity={0.35 * freshEyes} />
          <rect x={70 + gaze} y={70 + (26 - eyeH) / 2} width={15} height={eyeH} fill="#FFFFFF" opacity={freshEyes} />
          <rect x={116 + gaze} y={70 + (26 - eyeH) / 2} width={15} height={eyeH} fill="#FFFFFF" opacity={freshEyes} />
        </>}
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
          <rect x={195} y={armY - 46} width={12} height={9} fill="#6E6A60" transform={`rotate(28 200 ${armY - 41})`} />
        </>}
        {/* THE VILLAIN's wraparound shades. His eyes are NEVER readable: that is the whole tell. */}
        {wrapShades > 0 && <>
          <rect x={40} y={62} width={120} height={4} fill="rgba(0,0,0,0.25)" />
          <rect x={44} y={64} width={112} height={27} rx={7} fill="#0B0D11" />
          <rect x={44} y={64} width={112} height={6} rx={3} fill="#22262F" />
          <rect x={30} y={68} width={16} height={6} fill="#0B0D11" />
          <rect x={154} y={68} width={16} height={6} fill="#0B0D11" />
          <rect x={54} y={66} width={20} height={7} fill="rgba(255,255,255,0.30)" transform="rotate(-16 64 69)" />
          <rect x={112} y={66} width={12} height={7} fill="rgba(255,255,255,0.16)" transform="rotate(-16 118 69)" />
          <rect x={44} y={87} width={112} height={4} fill="rgba(0,0,0,0.45)" />
        </>}
        {/* THE VILLAIN's earpiece: coiled wire down the neck */}
        {earpiece > 0 && <>
          <rect x={162} y={70} width={9} height={11} fill="#2A2E38" />
          <rect x={164} y={66} width={5} height={5} fill="#3A4150" />
          <rect x={167} y={81} width={4} height={13} fill="#2A2E38" />
          <rect x={170} y={92} width={4} height={5} fill="#2A2E38" />
          <rect x={166} y={96} width={4} height={5} fill="#2A2E38" />
          <rect x={170} y={100} width={4} height={5} fill="#2A2E38" />
        </>}
        {/* manager hard hat */}
        {hardHat > 0 && <>
          <rect x={30} y={34} width={140} height={9} fill="#D9A11E" />
          <rect x={46} y={14} width={108} height={22} fill="#F0B92B" />
          <rect x={46} y={14} width={108} height={5} fill="#FFD968" />
          <rect x={94} y={6} width={12} height={10} fill="#F0B92B" />
          <rect x={64} y={20} width={72} height={4} fill="#D9A11E" />
        </>}
        {/* backwards trucker cap (the honest mechanic) */}
        {capBack > 0 && <>
          <rect x={40} y={20} width={120} height={24} fill="#5E626C" />
          <rect x={40} y={20} width={120} height={6} fill="#767B86" />
          <rect x={150} y={30} width={34} height={9} fill="#494D55" />
          <rect x={92} y={24} width={16} height={7} fill="#EDEAE0" />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};


// ================= THE VILLAIN: "TAKE ONE" (garage reskin) =================
// He is Claude's first answer made flesh: a grey-primer mechanic who slaps together the first
// car and calls it done. Not evil, just FIRST and good-enough. He waves a CHECKERED FLAG to end
// the build before anyone can try again, and stamps SHIP IT on the hood. His aura = he KILLS THE
// NEON wherever he walks. He never multiplies, never speaks, only waves the flag. Killed by
// DEMOTION at S7 (car four wins, his grey car goes to the crusher, he is one of five).
// ALWAYS use this component. (Clap ledger becomes the FLAG ledger: S0 one wave that works,
// S1/S2/S3 none, S4 five waves that all fail, S5+ never.)

// pale edge that traces the sprite's alpha so a grey critter always reads as a CRITTER not a machine
const slateEdge = (size: number, rim: number) => ({
  filter: `drop-shadow(0 0 1.5px rgba(240,240,255,${(0.85 + rim * 0.15).toFixed(2)})) `
    + `drop-shadow(0 0 ${(size * 0.014).toFixed(1)}px rgba(180,200,255,${(0.4 + rim * 0.4).toFixed(2)})) `
    + `drop-shadow(0 2px 3px rgba(0,0,0,0.7))`,
});

// THE CHECKERED FLAG. A little chequered pennant on a stick. `wave` 0..1 drives the flap.
export const Flag: React.FC<{ x: number; y: number; s?: number; wave?: number; rot?: number; o?: number; z?: number }> = ({ x, y, s = 1, wave = 0, rot = 0, o = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "0% 100%", opacity: o, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: 92, background: "linear-gradient(180deg,#C8CCD4,#6E727C)", borderRadius: 2 }} />
    <div style={{ position: "absolute", left: 4, top: -2, width: 70, height: 46, transform: `perspective(180px) rotateY(${18 + Math.sin(wave * 6.28) * 22}deg)`, transformOrigin: "0% 50%" }}>
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 6, r = Math.floor(i / 6);
        return <div key={i} style={{ position: "absolute", left: c * 11.6, top: r * 11.4, width: 12, height: 12, background: (c + r) % 2 ? "#F4F6FA" : "#14161C" }} />;
      })}
      <div style={{ position: "absolute", inset: 0, border: "1.5px solid #0E1014" }} />
    </div>
  </div>
);

// THE SHIP IT STAMP. Smug grey-gold, crooked. Spent on Take One's boring car only.
export const ShipIt: React.FC<{ x: number; y: number; s?: number; rot?: number; o?: number; z?: number }> = ({ x, y, s = 1, rot = -8, o = 1, z = 27 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%", zIndex: z }}>
    <div style={{ padding: "5px 13px", border: `4px solid ${SHIPIT}`, borderRadius: 5, background: "rgba(201,162,39,0.16)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: "0.04em", color: SHIPIT, textShadow: `0 0 10px rgba(201,162,39,0.6)`, whiteSpace: "nowrap", boxShadow: "0 5px 14px -5px rgba(0,0,0,0.7)" }}>SHIP IT</div>
  </div>
);

// TAKE ONE himself. Grey-primer mechanic, backward cap, opaque shades, a wrench in his belt.
// `flag` carries the checkered pennant. `wave` drives it. `lowered` = flag hangs at his side.
export const Villain: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; flag?: number; wave?: number; lowered?: number; rim?: number }> = ({ lf, size = 250, flag = 1, wave = 0, lowered = 0, rim = 0.5, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {rim > 0.5 && <div style={{ position: "absolute", left: size * 0.1, top: size * 0.14, width: size * 0.8, height: size * 0.78, borderRadius: size * 0.12, background: `radial-gradient(ellipse at 50% 42%, rgba(200,210,255,${(rim - 0.5) * 0.5}), transparent 66%)`, filter: `blur(${size * 0.03}px)`, zIndex: 1 }} />}
    <div style={{ position: "relative", zIndex: 2, ...slateEdge(size, rim) }}>
      <Mascot lf={lf} size={size} tint={PRIMER} capBack={1} wrapShades={1} {...rest} />
    </div>
    {/* a wrench tucked at his hip, so he reads as a mechanic */}
    <div style={{ position: "absolute", left: size * 0.30, top: size * 0.56, width: size * 0.05, height: size * 0.2, background: "#8A8F98", transform: "rotate(24deg)", borderRadius: 2, zIndex: 3 }} />
    {flag > 0 && (lowered > 0
      ? <Flag x={size * 0.84} y={size * 0.5} s={size / 250 * 0.62} wave={0} rot={70} z={4} />
      : <Flag x={size * 0.62} y={size * 0.2} s={size / 250 * 0.72} wave={wave} rot={-6} z={4} />)}
  </div>
);

// A COPY. Identical grey mechanic: no cap, no flag, eyes NOT visible. Sameness IS the thesis.
export const Take: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; cheer?: number; stern?: number; rim?: number }> = ({ lf, size = 250, rim = 0.5, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size, ...slateEdge(size, rim) }}>
    <Mascot lf={lf} size={size} tint={PRIMER} wrapShades={1} {...rest} />
  </div>
);

// THE SIXTH (the blind inspector). Grey, blank, clean: no cap, no flag, a flat matte visor band
// (NOT the villain's glossy shades). Its blankness is its credibility.
export const Sixth: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; rim?: number }> = ({ lf, size = 250, rim = 0.6, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size, ...slateEdge(size, rim) }}>
    <Mascot lf={lf} size={size} tint={PRIMER} stern={0.6} nodAmp={0.7} nodSpeed={26} {...rest} />
    <div style={{ position: "absolute", left: size * 0.30, top: size * 0.40, width: size * 0.4, height: size * 0.055, background: "rgba(20,24,34,0.9)", borderRadius: 2, zIndex: 3 }} />
  </div>
);

// THE GRIP CAMEO. Knee-high Claude in orange overalls (a pit-crew kid). NOT hero clay, NOT grey:
// a warm brown so he never competes with the hero and never reads as a copy.
const GRIPC = "#8A5A44";
export const Grip: React.FC<{ lf: number; x: number; y: number; size?: number; flip?: number; z?: number }> = ({ lf, x, y, size = 74, flip = 0, z = 22 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scaleX(${flip ? -1 : 1})` }}>
    <Mascot lf={lf} size={size} tint={GRIPC} nodAmp={4.2} nodSpeed={7} gaze={1} />
    {/* ear defenders */}
    <div style={{ position: "absolute", left: -size * 0.04, top: size * 0.28, width: size * 0.14, height: size * 0.19, background: NEONORANGE, borderRadius: 3, zIndex: 4 }} />
    <div style={{ position: "absolute", left: size * 0.90, top: size * 0.28, width: size * 0.14, height: size * 0.19, background: NEONORANGE, borderRadius: 3, zIndex: 4 }} />
    <div style={{ position: "absolute", left: size * 0.08, top: size * 0.20, width: size * 0.84, height: size * 0.05, background: "#2E3540", borderRadius: 3, zIndex: 4 }} />
  </div>
);


// ================= THE NEON GARAGE KIT =================
// A vibrant night garage: a deep-indigo interior lit by hot neon, a glowing perspective floor
// grid, five build bays in a row. The JOB is a RACE CAR (a stranger picks the coolest in half a
// second). The ATTEMPT is the car. The GRADE is the winner's lift lighting green. Max colour.

// ---- PREMIUM STUDIO FLOOR: a graphite seamless backdrop + a GLOSSY dark reflective floor with a
// soft horizon falloff (a car-photography cyclorama), NOT a bright neon grid. `hue` is a faint
// ambient tint only. Reflections + gradient do the work. ----
export const GarageFloor: React.FC<{ horizon?: number; o?: number; hue?: string; gel?: string; gel2?: string }> = ({ horizon = 452, o = 1, hue = KEY, gel = ELECTRIC, gel2 = MAGENTA }) => (
  <>
    {/* the seamless back wall: a rich COLOURED deep gradient (not neutral black), key-lit high */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: horizon + 40, background: `radial-gradient(ellipse 82% 92% at 50% 28%, ${GRAPHITE} 0%, ${NIGHT} 50%, ${CHARCOAL} 100%)`, opacity: o }} />
    {/* two bold COLOURED gel washes rake the back wall so the set reads vibrant, not monochrome */}
    <div style={{ position: "absolute", left: -80, top: -40, width: 720, height: 460, background: `radial-gradient(ellipse at 40% 30%, ${gel}, transparent 66%)`, opacity: o * 0.34, filter: "blur(64px)", mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", right: -80, top: -20, width: 700, height: 440, background: `radial-gradient(ellipse at 60% 30%, ${gel2}, transparent 66%)`, opacity: o * 0.30, filter: "blur(64px)", mixBlendMode: "screen" }} />
    {/* a soft warm key wash from up high */}
    <div style={{ position: "absolute", left: 0, right: 0, top: -60, height: 320, background: `radial-gradient(ellipse at 50% 0%, ${hue}2E, transparent 66%)`, opacity: o * 0.85 }} />
    {/* the seam where wall meets floor */}
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 30, height: 60, background: `linear-gradient(180deg, transparent, rgba(0,0,0,0.32))`, opacity: o }} />
    {/* the glossy floor: deep, with COLOURED reflective sheens raking down it (the gels reflect) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: `linear-gradient(180deg, #191D2C 0%, #12141F 48%, #0B0D16 100%)`, opacity: o }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 792 - horizon, background: `radial-gradient(ellipse 42% 130% at 34% 0%, ${gel}, transparent 60%)`, opacity: o * 0.20, filter: "blur(22px)", mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 792 - horizon, background: `radial-gradient(ellipse 42% 130% at 66% 0%, ${gel2}, transparent 60%)`, opacity: o * 0.18, filter: "blur(22px)", mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 792 - horizon, background: `radial-gradient(ellipse 60% 120% at 50% 0%, ${hue}18, transparent 62%)`, opacity: o }} />
    {/* faint floor guide lines */}
    {Array.from({ length: 6 }, (_, i) => {
      const p = (i + 1) / 7; const yy = horizon + Math.pow(p, 1.9) * (792 - horizon);
      return <div key={i} style={{ position: "absolute", left: 0, right: 0, top: yy, height: 1, background: "rgba(160,180,220,0.08)", opacity: o }} />;
    })}
  </>
);

// a soft LIGHT STRIP (studio LED, a tasteful accent), not a glaring neon tube. `color` + `on` (0..1).
export const Neon: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; on?: number; z?: number; round?: number }> = ({ x, y, w = 120, h = 8, color = KEY, on = 1, z = 8, round = 999 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: round, background: color, opacity: 0.3 + on * 0.6, boxShadow: on > 0.05 ? `0 0 ${8 + on * 14}px ${color}88` : "none", zIndex: z }} />
);

// an ETCHED / back-lit SIGN (premium signage): a clean lettermark with a soft halo, not a glaring
// neon scrawl. Keep words SHORT + rare.
export const NeonSign: React.FC<{ x: number; y: number; text: string; color?: string; size?: number; on?: number; z?: number }> = ({ x, y, text, color = KEY, size = 40, on = 1, z = 9 }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: size, letterSpacing: "0.14em", color: "#F0EADC", opacity: 0.5 + on * 0.45, textShadow: on > 0.05 ? `0 0 3px ${color}88, 0 0 14px ${color}55` : "none", zIndex: z, whiteSpace: "nowrap", filter: on < 0.5 ? "grayscale(0.5) brightness(0.7)" : "none" }}>{text}</div>
);

// ---- PREMIUM STUDIO LIGHTING PRIMITIVES (use these instead of neon) ----
// a soft KEY / FILL light bloom (a big diffuse studio light)
export const StudioLight: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; o?: number; z?: number }> = ({ x, y, w = 500, h = 420, color = KEY, o = 0.4, z = 3 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: "50%", background: `radial-gradient(ellipse, ${color}, transparent 66%)`, opacity: o, filter: "blur(24px)", zIndex: z, pointerEvents: "none" }} />
);
// a rectangular SOFTBOX with a bright face + a subtle grid, hung in shot as a real light source
export const SoftBox: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; o?: number; z?: number }> = ({ x, y, w = 150, h = 90, color = "#FFF7E8", o = 0.85, z = 6 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 6, background: `linear-gradient(160deg, ${color}, #C8CEDA)`, opacity: o, boxShadow: `0 0 40px ${color}66`, border: "3px solid #2A2E36", zIndex: z }}>
    {Array.from({ length: 9 }, (_, i) => <div key={i} style={{ position: "absolute", left: (i % 3) * (w / 3) + 4, top: Math.floor(i / 3) * (h / 3) + 4, width: w / 3 - 8, height: h / 3 - 8, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 2 }} />)}
  </div>
);
// a big SATURATED colour GEL wash (a bold cinematic colour gel thrown across the set). Screen-blended so
// the colour ADDS light instead of just darkening: this is how a scene reads VIBRANT, not black-and-white.
export const GelWash: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; o?: number; z?: number; blur?: number }> = ({ x, y, w = 940, h = 720, color = MAGENTA, o = 0.34, z = 2, blur = 66 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: "50%", background: `radial-gradient(ellipse, ${color}, transparent 68%)`, opacity: o, filter: `blur(${blur}px)`, mixBlendMode: "screen", zIndex: z, pointerEvents: "none" }} />
);
// a directional colour BAR of light raking across the set (a wall wash / gelled bar), also screen-blended.
export const GelBar: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; o?: number; z?: number; rot?: number }> = ({ x, y, w = 700, h = 120, color = CYAN, o = 0.4, z = 2, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: o, filter: "blur(30px)", mixBlendMode: "screen", transform: `rotate(${rot}deg)`, zIndex: z, pointerEvents: "none" }} />
);

// ---- THE CAR: the job. Side-view racer, `solve` picks the build. Reads at thumbnail: two big
// wheels + a candy body + a headlight glow. ⛔ solve 0 = the BORING first car (Take One's): a
// plain grey-primer commuter. FINE but dull, which is exactly why nobody ever builds car two.
// solve 1..5 = five WILD distinct candy builds. solve 4 = THE WINNER (obviously the coolest).
// `build` 0..1 = assembly (0 = a bare chassis + wheels on a lift). `glow` = neon underglow.
// ⛔ REDESIGNED for detail (Alex: "cars need to be way better designed"). Each solve is a distinct,
// crafted side-view build: spoke wheels + brake calipers, two-tone paint with panel lines + gloss
// highlight, a proper canopy with a reflection streak, vents/intakes, a decal roundel (a shape, no
// digit), chrome trim, hot rim-light + neon underglow. solve 0 = the dull grey commuter (Take One's).
// ⭐ PREMIUM HERO CAR (v7: Alex "focus on the cars, make them polished not cheap-neon"). Rendered like
// a studio car shot: gradient-shaded paint (light roof -> deep sill), a glossy SPECULAR sweep, chrome
// trim, tinted glass with a reflection, a soft GROUND REFLECTION under it, ambient occlusion. Each
// solve is a distinct silhouette. `glow` is now a subtle accent underglow (used tastefully, not neon).
export const Car: React.FC<{ x: number; y: number; s?: number; solve?: number; build?: number; o?: number; z?: number; glow?: number; rot?: number; reflect?: number }> = ({ x, y, s = 1, solve = 0, build = 1, o = 1, z = 20, glow = 0, rot = 0, reflect = 0.32 }) => {
  const P = [PRIMER, CAR_CHERRY, CAR_BLUE, CAR_LIME, CAR_TANGERINE, CAR_VIOLET][solve] || CAR_CHERRY;
  const paint = solve === 0 ? PRIMER : P;
  const light = solve === 0 ? "#9A9EA8" : ["#9A9EA8", "#E8586A", "#5E8FDE", "#8FD05E", "#FFA94E", "#B98FE0"][solve];
  const deep = solve === 0 ? "#3C3F46" : ["#3C3F46", "#7A101C", "#173B7C", "#2E6318", "#9A4A0A", "#4A2A78"][solve];
  const acc = [CHROME, "#FF9A5A", "#7FA8E8", "#B6E86E", "#FFC98A", "#C0A0E8"][solve] || CHROME;
  const b = Math.min(1, build / 0.5);
  const bb = Math.max(0, (build - 0.45) / 0.55);
  const monster = solve === 5;
  const plain = solve === 0;
  const wheelR = monster ? 32 : 20;
  const yw = monster ? 110 : 113; // tyre bottom stays on the SAME ground line (yw + wheelR = 133 for the sporty cars, 142 for the monster)
  const gid = `cg_${solve}_${Math.round(x)}_${Math.round(y)}`;
  // FRONT = RIGHT (the cars drive off to the right). Rear = LEFT.
  // Lower + more aggressive stances for the sporty builds, a lifted body for the monster.
  // Sporty bottoms: a LOW sill near the ground with real wheel-arch cutouts (arc radius 21, over each
  // wheel centre at 64 / 186) so the tyres TUCK into the fenders instead of floating under a raised shell.
  const bodyPath = [
    "M 26 76 L 44 76 L 66 52 L 150 50 L 178 52 L 206 76 L 226 76 L 226 123 L 204.5 123 A 21 21 0 0 0 167.5 123 L 82.5 123 A 21 21 0 0 0 45.5 123 L 26 123 Z",              // 0 sedan (clean 3-box, low road wheels)
    "M 20 123 L 30 82 L 84 78 L 104 52 L 150 50 L 164 76 L 232 82 L 232 123 L 204.5 123 A 21 21 0 0 0 167.5 123 L 82.5 123 A 21 21 0 0 0 45.5 123 Z",                      // 1 hot rod (chopped cab, long low hood)
    "M 22 123 L 38 74 L 66 70 L 100 52 L 150 50 L 182 52 L 206 72 L 232 76 L 232 123 L 204.5 123 A 21 21 0 0 0 167.5 123 L 82.5 123 A 21 21 0 0 0 45.5 123 Z",             // 2 muscle (fastback, long hood)
    "M 12 123 L 30 90 L 40 86 L 96 80 L 120 66 L 158 66 L 178 78 L 236 92 L 240 123 L 204.5 123 A 21 21 0 0 0 167.5 123 L 82.5 123 A 21 21 0 0 0 45.5 123 Z",              // 3 racer (low wedge cockpit)
    "M 8 123 L 34 92 L 62 84 L 96 62 L 158 58 L 196 74 L 224 84 L 240 96 L 240 123 L 204.5 123 A 21 21 0 0 0 167.5 123 L 82.5 123 A 21 21 0 0 0 45.5 123 Z",               // 4 hypercar (lowest wedge, most planted)
    "M 44 44 L 64 44 L 80 24 L 166 24 L 184 44 L 206 44 L 206 82 L 44 82 Z",                          // 5 monster (tall lifted cab, off-road tyres + lift kit)
  ][solve];
  const topY = monster ? 24 : solve === 4 ? 58 : solve === 3 ? 66 : solve === 1 ? 50 : 50;
  const midY = monster ? 60 : solve === 4 ? 82 : solve === 3 ? 86 : 80; // shoulder / character-line height
  // one premium wheel: tyre + deep multi-spoke dish + chrome lip + brake disc + caliper + hub
  const Wheel = (wx: number, key: number) => {
    const r = wheelR;
    const nSpokes = plain ? 6 : monster ? 6 : 12;
    return (
      <g key={key}>
        {/* tyre wall */}
        <circle cx={wx} cy={yw} r={r} fill="#0B0D11" stroke="#171A20" strokeWidth={monster ? 6 : 4} />
        {/* tread: chunky blocks for the monster, fine bead for the rest */}
        {monster
          ? Array.from({ length: 22 }, (_, k) => { const a = (k / 22) * Math.PI * 2; const ri = r - 1.5, ro = r - 9; return <line key={k} x1={wx + Math.cos(a) * ro} y1={yw + Math.sin(a) * ro} x2={wx + Math.cos(a) * ri} y2={yw + Math.sin(a) * ri} stroke="#050608" strokeWidth={4.5} />; })
          : <circle cx={wx} cy={yw} r={r - 3} fill="none" stroke="#282C34" strokeWidth={2} strokeDasharray="2.5 3" />}
        {/* chrome lip + deep dish */}
        <circle cx={wx} cy={yw} r={r * 0.74} fill="#13161B" stroke={CHROME} strokeWidth={2.6} />
        <circle cx={wx} cy={yw} r={r * 0.7} fill="none" stroke="#6B7482" strokeWidth={1} opacity={0.7} />
        {/* brake disc behind the spokes */}
        <circle cx={wx} cy={yw} r={r * 0.52} fill="#22262D" />
        <circle cx={wx} cy={yw} r={r * 0.52} fill="none" stroke="#3A4048" strokeWidth={1} strokeDasharray="1.5 3" />
        {/* caliper (colour accent), skipped on the plain commuter */}
        {!plain && <path d={`M ${wx - r * 0.46} ${yw - r * 0.16} A ${r * 0.5} ${r * 0.5} 0 0 1 ${wx - r * 0.16} ${yw - r * 0.48}`} fill="none" stroke={acc} strokeWidth={5} strokeLinecap="round" opacity={0.92} />}
        {/* multi-spoke rim */}
        {Array.from({ length: nSpokes }, (_, k) => { const a = (k / nSpokes) * Math.PI * 2; return <line key={k} x1={wx + Math.cos(a) * r * 0.16} y1={yw + Math.sin(a) * r * 0.16} x2={wx + Math.cos(a) * r * 0.6} y2={yw + Math.sin(a) * r * 0.6} stroke={plain ? "#AEB6C0" : CHROME} strokeWidth={plain ? 3.2 : 2.3} strokeLinecap="round" />; })}
        {/* hub cap */}
        <circle cx={wx} cy={yw} r={r * 0.2} fill="#1B1F26" stroke={CHROME} strokeWidth={1.5} />
        <circle cx={wx} cy={yw} r={r * 0.09} fill={plain ? CHROME : acc} />
        {/* specular */}
        <circle cx={wx - r * 0.3} cy={yw - r * 0.3} r={r * 0.13} fill="#FFF" opacity={0.32} />
      </g>
    );
  };
  const hlX = monster ? 200 : solve === 4 ? 232 : solve === 3 ? 230 : 220;                 // headlight (front / right)
  const hlY = monster ? 50 : solve === 4 ? 82 : solve === 3 ? 86 : solve === 0 ? 82 : 80;
  const tlX = monster ? 48 : solve === 4 ? 16 : solve === 3 ? 20 : 30;                       // taillight bar (rear / left)
  const tlY = monster ? 50 : solve === 4 ? 84 : solve === 3 ? 88 : 82;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 100%", opacity: o, zIndex: z }}>
      {glow > 0.02 && <div style={{ position: "absolute", left: -120, top: 10, width: 240, height: 40, borderRadius: "50%", background: `radial-gradient(ellipse, ${acc}, transparent 66%)`, opacity: glow * 0.5, filter: "blur(9px)" }} />}
      {/* GROUND REFLECTION: the body mirrored + squashed + faded into the floor */}
      {reflect > 0.02 && (
        <svg width={252} height={150} viewBox="0 0 252 150" style={{ position: "absolute", left: -126, top: -32, overflow: "visible", transform: "scaleY(-0.46)", transformOrigin: "50% 0%", opacity: reflect, filter: "blur(2.5px)", WebkitMaskImage: "linear-gradient(180deg, #000, transparent 78%)" }} shapeRendering="geometricPrecision">
          {b > 0.05 && <path d={bodyPath} fill={paint} />}
          {[64, 186].map((wx, i) => <circle key={i} cx={wx} cy={yw} r={wheelR} fill="#0E1013" />)}
        </svg>
      )}
      <svg width={252} height={150} viewBox="0 0 252 150" style={{ position: "absolute", left: -126, top: -142, overflow: "visible" }} shapeRendering="geometricPrecision">
        <defs>
          {/* body paint: light top -> body -> deep bottom (2-tone metallic) */}
          <linearGradient id={gid} x1="0" y1={topY} x2="0" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={light} /><stop offset="0.34" stopColor={paint} /><stop offset="0.82" stopColor={paint} /><stop offset="1" stopColor={deep} />
          </linearGradient>
          {/* tinted glass with a cool reflection */}
          <linearGradient id={gid + "g"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8FB4D8" stopOpacity="0.5" /><stop offset="0.5" stopColor="#243244" stopOpacity="0.85" /><stop offset="1" stopColor="#0E141C" stopOpacity="0.9" />
          </linearGradient>
          {/* a soft floor shadow under the car */}
          <radialGradient id={gid + "sh"} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.5" /><stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* contact shadow */}
        <ellipse cx={126} cy={yw + wheelR - 2} rx={monster ? 128 : 116} ry={10} fill={`url(#${gid}sh)`} />
        {/* rear wheel drawn first (so rear-mounted wings/exhaust can overlap tastefully) */}
        {Wheel(64, 0)}
        {monster && <>{/* lift-kit suspension: shocks + control arms from body down to the hub */}
          <line x1={70} y1={80} x2={64} y2={yw - 6} stroke="#4A4050" strokeWidth={6} strokeLinecap="round" />
          <line x1={58} y1={80} x2={64} y2={yw - 6} stroke="#2C2636" strokeWidth={4} strokeLinecap="round" />
          <line x1={180} y1={80} x2={186} y2={yw - 6} stroke="#4A4050" strokeWidth={6} strokeLinecap="round" />
          <line x1={196} y1={80} x2={186} y2={yw - 6} stroke="#2C2636" strokeWidth={4} strokeLinecap="round" />
        </>}
        {Wheel(186, 1)}
        {b <= 0.05 && <>{/* bare chassis on the lift: a frame rail + two jack stands */}
          <rect x={38} y={96} width={176} height={9} rx={3} fill="#3A3F49" />
          <rect x={54} y={100} width={8} height={wheelR + 6} fill="#2A2E36" /><rect x={188} y={100} width={8} height={wheelR + 6} fill="#2A2E36" />
        </>}
        {b > 0.05 && <>
          {/* BODY: gradient-shaded premium paint */}
          <path d={bodyPath} fill={`url(#${gid})`} stroke={deep} strokeWidth={1} />
          {/* wheel-arch ambient occlusion */}
          {[64, 186].map((wx, i) => <path key={i} d={`M ${wx - wheelR - 3} ${yw} A ${wheelR + 3} ${wheelR + 3} 0 0 1 ${wx + wheelR + 3} ${yw}`} fill="none" stroke="#000" strokeWidth={4} opacity={0.22} />)}
          {/* ambient occlusion + rocker / side skirt along the sill (between the wheels so it never paints over a tyre) */}
          {monster && <rect x={30} y={95} width={192} height={6} fill="#000" opacity={0.3} />}
          {!monster && <><rect x={86} y={118} width={78} height={6} rx={3} fill="#000" opacity={0.26} /><rect x={88} y={120} width={74} height={4} rx={2} fill="#15171C" opacity={0.85} /></>}
          {/* glossy specular softbox sweep across the top surface */}
          <path d={`M 40 ${topY + 6} Q 130 ${topY - 4} 214 ${topY + 8} L 208 ${topY + 14} Q 130 ${topY + 6} 46 ${topY + 12} Z`} fill="#FFFFFF" opacity={solve === 4 ? 0.42 : 0.3} />
          {/* fresnel shoulder rim (warm) */}
          <path d={`M 34 ${midY} Q 126 ${midY - (monster ? 14 : 8)} 224 ${midY}`} fill="none" stroke={RIM} strokeWidth={1.6} opacity={0.5} />
          {/* body character line */}
          <path d={`M 40 ${midY + 6} Q 126 ${midY + 2} 216 ${midY + 6}`} fill="none" stroke={light} strokeWidth={2} opacity={0.7} />
          {/* door shut-line */}
          <path d={`M 118 ${topY + 4} L 116 ${midY + 10}`} fill="none" stroke={deep} strokeWidth={1.4} opacity={0.7} />

          {/* ================= GLASS / GREENHOUSE ================= */}
          {solve === 0 && <><path d="M 70 74 L 84 54 L 124 53 L 124 74 Z" fill={`url(#${gid}g)`} /><path d="M 132 53 L 170 54 L 180 74 L 132 74 Z" fill={`url(#${gid}g)`} /><rect x={125} y={53} width={6} height={22} fill={deep} /></>}
          {solve === 1 && <path d="M 108 74 L 116 55 L 148 54 L 150 74 Z" fill={`url(#${gid}g)`} />}
          {solve === 2 && <path d="M 104 72 L 118 54 L 170 54 L 180 72 Z" fill={`url(#${gid}g)`} />}
          {solve === 3 && <path d="M 122 84 L 130 68 L 156 68 L 160 84 Z" fill={`url(#${gid}g)`} />}
          {solve === 4 && <><path d="M 100 78 L 112 62 L 168 60 L 178 78 Z" fill={`url(#${gid}g)`} /><path d="M 108 74 L 118 64 L 150 63 L 150 74 Z" fill="#FFF" opacity={0.28} /></>}
          {solve === 5 && <><path d="M 86 42 L 96 26 L 150 26 L 160 42 Z" fill={`url(#${gid}g)`} /><rect x={120} y={26} width={5} height={16} fill={deep} /></>}
          {/* windshield glare */}
          <path d={monster ? "M 96 40 L 104 28 L 112 28 L 100 40 Z" : solve === 3 ? "M 126 82 L 132 70 L 138 70 L 130 82 Z" : solve === 4 ? "M 104 76 L 114 63 L 122 63 L 110 76 Z" : "M 74 72 L 84 56 L 92 56 L 80 72 Z"} fill="#FFF" opacity={0.22} />

          {/* ================= COMMON LIGHTING (gated so it powers on as it finishes) ================= */}
          {/* HEADLIGHT (warm) at the front */}
          <ellipse cx={hlX} cy={hlY + 3} rx={13} ry={9} fill={KEY} opacity={bb * 0.5} style={{ filter: "blur(2px)" }} />
          {solve === 4
            ? <path d={`M ${hlX - 12} ${hlY - 3} L ${hlX + 4} ${hlY - 5} L ${hlX + 3} ${hlY + 2} L ${hlX - 12} ${hlY + 2} Z`} fill="#FFF7DA" opacity={bb} />
            : <ellipse cx={hlX} cy={hlY} rx={solve === 1 ? 6 : 7} ry={solve === 1 ? 7 : 5.5} fill="#FFF7DA" stroke={CHROME} strokeWidth={1.4} opacity={0.4 + bb * 0.6} />}
          {/* TAILLIGHT bar (red) at the rear */}
          <ellipse cx={tlX} cy={tlY + 2} rx={10} ry={7} fill="#FF3B2E" opacity={bb * 0.45} style={{ filter: "blur(2px)" }} />
          <rect x={tlX - (solve === 2 || solve === 4 ? 9 : 6)} y={tlY - 3} width={solve === 2 || solve === 4 ? 18 : 12} height={solve === 4 ? 4 : 6} rx={2} fill="#FF4436" opacity={0.5 + bb * 0.5} />
          {/* side mirror */}
          {!monster && <><line x1={solve === 3 || solve === 4 ? 168 : 176} y1={topY + 8} x2={solve === 3 || solve === 4 ? 176 : 184} y2={topY + 4} stroke={deep} strokeWidth={2} /><ellipse cx={solve === 3 || solve === 4 ? 179 : 187} cy={topY + 3} rx={5} ry={3.5} fill={paint} stroke={deep} strokeWidth={1} /></>}
          {/* front grille / intake slats */}
          {!monster && <>{[0, 1, 2].map((k) => <rect key={k} x={hlX - 24} y={hlY + 4 + k * 3.5} width={18} height={2} rx={1} fill="#0C0F14" opacity={0.8} />)}</>}
          {/* side air vent (gills) behind the front wheel */}
          {!plain && !monster && <>{[0, 1, 2].map((k) => <rect key={k} x={148 + k * 6} y={midY - 4} width={3.5} height={12} rx={1.5} fill="#0C0F14" opacity={0.72} transform={`skewX(-16)`} />)}</>}

          {/* ================= PER-SOLVE SIGNATURE ================= */}
          {/* 1 HOT ROD: exposed blower + velocity stacks over the front, chrome side pipes */}
          {solve === 1 && <>
            <rect x={86} y={112} width={78} height={5} rx={2.5} fill={CHROME} opacity={0.85} />
            <rect x={86} y={112} width={78} height={2} rx={1} fill="#FFF" opacity={0.4} />
            {bb > 0.15 && <><rect x={168} y={38} width={30} height={16} rx={2} fill="#1A1D24" stroke="#3A3F49" strokeWidth={1} />{[0, 1, 2].map((k) => <rect key={k} x={172 + k * 9} y={28} width={6} height={12} rx={2} fill={CHROME} />)}<rect x={168} y={36} width={30} height={3} fill={CHROME} opacity={0.7} /></>}
          </>}
          {/* 2 MUSCLE: twin racing stripes down the hood/roof + a raised hood scoop */}
          {solve === 2 && <>
            <path d={`M 40 ${midY - 22} Q 126 ${topY - 2} 208 ${midY - 20}`} fill="none" stroke="#EAF2FF" strokeWidth={5} opacity={0.8} />
            <path d={`M 40 ${midY - 14} Q 126 ${topY + 6} 208 ${midY - 12}`} fill="none" stroke="#EAF2FF" strokeWidth={5} opacity={0.55} />
            {bb > 0.2 && <><path d="M 190 62 L 222 62 L 216 54 L 196 54 Z" fill="#14171C" /><rect x={196} y={57} width={20} height={2} fill="#000" opacity={0.6} /></>}
          </>}
          {/* 3 RACER: rear wing (rear/left) + front splitter + side pod intake + roundel */}
          {solve === 3 && <>
            {bb > 0.15 && <><rect x={12} y={58} width={44} height={5} rx={2} fill="#0C1A0C" /><path d="M 28 96 L 29 62 L 34 62 L 33 96 Z" fill="#0C1A0C" /><path d="M 46 92 L 47 62 L 52 62 L 51 92 Z" fill="#0C1A0C" /><rect x={14} y={57} width={44} height={2} fill={LIME} opacity={0.8} /></>}
            <path d="M 214 120 L 244 118 L 244 123 L 214 123 Z" fill="#0C1A0C" />
            <path d="M 96 82 L 120 78 L 118 88 L 96 90 Z" fill="#0C160C" opacity={0.85} />
            <circle cx={118} cy={80} r={8} fill="#EAF6E4" opacity={0.9} /><circle cx={118} cy={80} r={8} fill="none" stroke={deep} strokeWidth={1.5} />
          </>}
          {/* 4 HYPERCAR (THE WINNER): SLEEK low rear wing (thin carbon aerofoil + slim swan-neck struts +
              endplate + an orange trailing edge), splitter + canards, diffuser, side intake, vents, twin tips */}
          {solve === 4 && <>
            {bb > 0.1 && <>
              {/* struts run DOWN INTO the rear deck so the wing is mounted, never floating above the body */}
              <path d="M 30 106 L 31 82 L 36 82 L 35 106 Z" fill="#160A02" />
              <path d="M 50 100 L 51 79 L 56 79 L 55 100 Z" fill="#160A02" />
              <path d="M 10 84 L 64 76 L 64 81 L 11 89 Z" fill="#1A0C02" />
              <rect x={9} y={77} width={4} height={14} rx={1} fill="#160A02" />
              <path d="M 11 80.5 L 64 72.5" stroke={NEONORANGE} strokeWidth={1.8} opacity={0.9} />
            </>}
            {/* front splitter + canards */}
            <path d="M 214 119 L 246 118 L 246 124 L 214 124 Z" fill="#241206" />
            <path d="M 226 113 L 244 109 L 244 113 L 228 116 Z" fill="#241206" />
            {/* rear diffuser fins */}
            {[0, 1, 2, 3].map((k) => <rect key={k} x={16 + k * 8} y={117} width={3} height={9} fill="#1A0E04" />)}
            {/* huge side air intake ahead of the rear wheel */}
            <path d="M 86 68 L 112 64 L 108 84 L 84 86 Z" fill="#1A0C02" opacity={0.9} />
            {[0, 1, 2].map((k) => <line key={k} x1={90 + k * 7} y1={68} x2={88 + k * 7} y2={84} stroke={NEONORANGE} strokeWidth={1.5} opacity={0.55} />)}
            {/* louvred fender vents */}
            {[0, 1, 2].map((k) => <rect key={k} x={158 + k * 6} y={70} width={3} height={10} rx={1} fill="#1A0C02" opacity={0.8} />)}
            {/* twin exhaust tips (rear-low, just behind the rear wheel) */}
            <circle cx={30} cy={119} r={4} fill="#0A0C0F" stroke={CHROME} strokeWidth={1.6} /><circle cx={40} cy={119} r={4} fill="#0A0C0F" stroke={CHROME} strokeWidth={1.6} />
            {/* extra gloss hotspot */}
            <ellipse cx={150} cy={64} rx={26} ry={5} fill="#FFF" opacity={0.35} />
            <path d="M 86 121 L 166 119" stroke={NEONGOLD} strokeWidth={2.5} opacity={0.7} />
          </>}
          {/* 5 MONSTER TRUCK: roll bar + roof light bar, bull bar, twin stacks, fender flares */}
          {solve === 5 && <>
            <path d="M 42 82 A 30 30 0 0 1 90 82" fill="none" stroke="#160A24" strokeWidth={6} opacity={0.7} />
            <path d="M 160 82 A 30 30 0 0 1 208 82" fill="none" stroke="#160A24" strokeWidth={6} opacity={0.7} />
            {bb > 0.15 && <><rect x={72} y={14} width={106} height={7} rx={3} fill="#2E1A48" />{[0, 1, 2, 3].map((k) => <circle key={k} cx={84 + k * 30} cy={17} r={4.5} fill="#FFF4C0" opacity={0.9} style={{ filter: "blur(0.4px)" }} />)}<rect x={72} y={13} width={106} height={2} fill={CHROME} opacity={0.6} /></>}
            {/* bull bar at the front */}
            <rect x={200} y={62} width={12} height={22} rx={3} fill="#1B1F26" stroke={CHROME} strokeWidth={1.4} />
            {/* twin exhaust stacks behind the cab */}
            <rect x={70} y={30} width={7} height={16} rx={2} fill={CHROME} /><rect x={80} y={30} width={7} height={16} rx={2} fill={CHROME} />
          </>}
        </>}
      </svg>
    </div>
  );
};

// ============ CINEMA KIT: header, camera, and distinct-setting backdrops (Alex: more detail,
// hierarchy, headers, dynamic camera, DIFFERENT places not one garage) ============

// THE HOOK HEADER (house chassis): a white title pill that settles on S0 and lifts away before S1.
export const HookHeader: React.FC<{ f: number; line1: string; hot: string; line2?: string }> = ({ f, line1, hot, line2 }) => {
  // SNAP in almost instantly (unmissable at the very start) with a punch-scale, hold big, clear before S1.
  const settle = over(f, 0, fr(0.16), Easing.out(Easing.cubic));                 // full by ~f5
  const punch = interpolate(f, [0, 5, 10], [1.22, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const out = 1 - over(f, fr(L[1] - 0.22), fr(0.28));                            // hold a touch longer
  if (out <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 16, right: 16, top: 276, display: "flex", justifyContent: "center", zIndex: 300, opacity: out * settle, transform: `translateY(${(1 - settle) * -14}px) scale(${punch})` }}>
      <div style={{ display: "inline-block", textAlign: "center", padding: "22px 46px", borderRadius: 34, background: "#FFFFFF", border: "4px solid #E7E2D6", boxShadow: "0 26px 60px -10px rgba(20,26,45,0.6), 0 0 0 6px rgba(255,255,255,0.16)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 58, lineHeight: 1.05, color: INK, letterSpacing: "-0.015em" }}>{line1} <span style={{ color: CLAY }}>{hot}</span>{line2 ? <><br />{line2}</> : null}</span>
      </div>
    </div>
  );
};

// a small neon SCENE TAG (lower-corner label) that names what a scene is, for hierarchy/story.
export const SceneTag: React.FC<{ f: number; text: string; color?: string; x?: number; y?: number }> = ({ f, text, color = CYAN, x = 40, y = 214 }) => {
  const inn = over(f, 4, fr(0.4), Easing.out(Easing.back(1.6)));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 58, opacity: inn, transform: `translateX(${(1 - inn) * -12}px)`, padding: "5px 13px", borderRadius: 8, background: "rgba(16,10,34,0.72)", border: `2px solid ${color}`, boxShadow: `0 0 12px ${color}66`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, letterSpacing: "0.04em", color: "#F4EFE4", textShadow: `0 0 8px ${color}`, whiteSpace: "nowrap" }}>{text}</div>
  );
};

// a volumetric SPOTLIGHT cone + the pool it lands in (showroom / podium / reveal).
export const Spotlight: React.FC<{ x: number; y?: number; w?: number; h?: number; color?: string; o?: number; poolY?: number; poolW?: number }> = ({ x, y = 120, w = 180, h = 430, color = "#FFF4D8", o = 0.5, poolY, poolW }) => (
  <>
    <div style={{ position: "absolute", left: x - w * 0.36, top: y, width: w * 0.72, height: h, background: `linear-gradient(180deg, ${color}${Math.round(Math.min(1, o) * 140).toString(16).padStart(2, "0")}, transparent 90%)`, clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)", filter: "blur(6px)", pointerEvents: "none", zIndex: 11 }} />
    {poolY !== undefined && <div style={{ position: "absolute", left: x - (poolW || w) / 2, top: poolY, width: poolW || w, height: (poolW || w) * 0.32, borderRadius: "50%", background: `radial-gradient(ellipse, ${color}${Math.round(Math.min(1, o) * 200).toString(16).padStart(2, "0")}, transparent 68%)`, filter: "blur(8px)", zIndex: 10 }} />}
  </>
);

// GRANDSTAND: tiered race-track seating with a shimmering crowd (a race-track setting).
export const Grandstand: React.FC<{ x: number; y: number; w?: number; h?: number; lf?: number; hue?: string; o?: number }> = ({ x, y, w = 1012, h = 150, lf = 0, hue = MAGENTA, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: 5, opacity: o }}>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${NIGHT}, ${NIGHT2})` }} />
    {[0, 1, 2, 3].map((r) => (
      <div key={r} style={{ position: "absolute", left: 0, right: 0, top: r * (h / 4.5), height: h / 5, borderTop: `2px solid ${hue}44` }} />
    ))}
    {Array.from({ length: 120 }, (_, i) => { const s = seed(i * 1.7); const c = [MAGENTA, CYAN, NEONGOLD, HOTPINK, ELECTRIC][i % 5]; const tw = 0.4 + 0.6 * ((Math.sin(lf / 6 + i * 2.1) + 1) / 2); return <div key={i} style={{ position: "absolute", left: (i % 30) * (w / 30) + s * 12, top: Math.floor(i / 30) * (h / 4.6) + s * 8 + 6, width: 5, height: 5, borderRadius: "50%", background: c, opacity: tw * 0.85, boxShadow: `0 0 5px ${c}` }} />; })}
  </div>
);

// TUNNEL: a receding rectangular tunnel of neon rings, for the inspection scanner (push-through cam).
export const Tunnel: React.FC<{ lf?: number; hue?: string; cx?: number; cy?: number; n?: number; scroll?: number }> = ({ lf = 0, hue = COOL, cx = 506, cy = 470, n = 9, scroll = 0 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const p = ((i + scroll) % n) / n;
    const sc = 0.14 + Math.pow(p, 1.5) * 1.5;
    const w = 1012 * sc, h = 792 * sc * 0.9;
    return <div key={i} style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 10, border: `3px solid ${hue}`, opacity: (0.14 + p * 0.7), boxShadow: `0 0 ${8 + p * 20}px ${hue}, inset 0 0 ${6 + p * 16}px ${hue}55`, zIndex: 5 + i }} />;
  })}</>
);

// ROADLINES: a night-highway centre line + side reflectors streaking toward camera (chase cam).
export const RoadLines: React.FC<{ lf: number; speed?: number; horizon?: number; hue?: string }> = ({ lf, speed = 1, horizon = 452, hue = NEONGOLD }) => (
  <>{Array.from({ length: 9 }, (_, i) => {
    const p = ((i / 9 + (lf * 0.02 * speed)) % 1);
    const yy = horizon + Math.pow(p, 1.8) * (792 - horizon);
    const w = 10 + p * 120, hgt = 4 + p * 22;
    return <div key={"d" + i} style={{ position: "absolute", left: 506 - w / 2, top: yy, width: w, height: hgt, borderRadius: 3, background: hue, opacity: 0.3 + p * 0.6, boxShadow: `0 0 ${6 + p * 14}px ${hue}`, zIndex: 6 }} />;
  })}{Array.from({ length: 14 }, (_, i) => {
    const side = i % 2 ? 1 : -1; const p = ((i / 14 + (lf * 0.024 * speed)) % 1);
    const yy = horizon + Math.pow(p, 1.7) * (792 - horizon);
    const x = 506 + side * (40 + Math.pow(p, 1.6) * 560);
    const c = side > 0 ? CYAN : MAGENTA;
    return <div key={"r" + i} style={{ position: "absolute", left: x - 4, top: yy, width: 8 + p * 10, height: 8 + p * 30, borderRadius: 4, background: c, opacity: 0.3 + p * 0.6, boxShadow: `0 0 ${6 + p * 16}px ${c}`, zIndex: 6 }} />;
  })}</>
);

// WALLBANK: a wall of lit industrial panels / monitors (factory floor, workshop back wall).
export const WallBank: React.FC<{ x: number; y: number; w?: number; h?: number; lf?: number; cols?: number; rows?: number; hue?: string; o?: number }> = ({ x, y, w = 1012, h = 220, lf = 0, cols = 8, rows = 3, hue = ELECTRIC, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: 5, opacity: o }}>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #201642, #140C2C)` }} />
    {Array.from({ length: cols * rows }, (_, i) => { const cw = w / cols, rh = h / rows, c = i % cols, r = Math.floor(i / cols); const on = (Math.sin(lf / 8 + i * 1.3) + 1) / 2; const col = [hue, CYAN, MAGENTA, NEONGOLD][i % 4]; return (
      <div key={i} style={{ position: "absolute", left: c * cw + 8, top: r * rh + 8, width: cw - 16, height: rh - 16, borderRadius: 4, background: "#160F30", border: `1.5px solid ${col}`, boxShadow: `inset 0 0 12px ${col}${Math.round(on * 90).toString(16).padStart(2, "0")}, 0 0 6px ${col}55` }}>
        <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 4, background: col, opacity: 0.3 + on * 0.6, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 6, bottom: 8, width: (cw - 20) * (0.3 + on * 0.6), height: 4, background: col, opacity: 0.5, borderRadius: 2 }} />
      </div>); })}
  </div>
);

// TURNTABLE: a rotating spotlit podium disc (showroom reveal), with a rim glow + slow sweep.
export const Turntable: React.FC<{ x: number; y: number; rx?: number; lf?: number; hue?: string }> = ({ x, y, rx = 260, lf = 0, hue = NEONGOLD }) => (
  <div style={{ position: "absolute", left: x - rx, top: y - rx * 0.26, width: rx * 2, height: rx * 0.52, zIndex: 8 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, #2A2050, #140C2C)`, border: `3px solid ${hue}`, boxShadow: `0 0 30px ${hue}66, inset 0 0 30px ${hue}33` }} />
    <div style={{ position: "absolute", left: rx * 0.2, top: rx * 0.1, width: rx * 1.6, height: rx * 0.32, borderRadius: "50%", background: `conic-gradient(from ${lf * 2}deg, transparent, ${hue}55, transparent 40%)`, opacity: 0.5 }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${hue}88`, filter: "blur(1px)" }} />
  </div>
);

// ---- A BAY: one neon build bay with a car lift. Instanced five times. `lit` 0..1, `hue` the
// bay's neon colour. Dressed identically (sameness is the thesis) except the car inside. ----
// ⛔ A BAY MUST NEVER READ AS AN EMPTY DARK RECTANGLE (the critic's #1 note: bays are hollow voids).
// The interior now carries a SATURATED radial WASH in its hue + a wall of crafted detail (a gauge
// cluster, a paint-swatch strip, a hanging work-lamp, a tyre stack) so even an empty bay is a
// dressed, glowing garage stall. `lf` drives a subtle flicker so it is never static.
export const Bay: React.FC<{ x: number; w?: number; lit?: number; lf?: number; hue?: string; children?: React.ReactNode }> = ({ x, w = 180, lit = 1, lf = 0, hue = CYAN, children }) => (
  <div style={{ position: "absolute", left: x, top: 0, width: w, height: 792, zIndex: 6 }}>
    {/* the back wall panel */}
    <div style={{ position: "absolute", left: 8, top: 196, width: w - 16, height: 320, background: `linear-gradient(180deg, #2A1E52, #170F30)`, opacity: 0.55 + lit * 0.45, borderRadius: 6 }} />
    {/* ⭐ the SATURATED interior wash: a big radial glow in the bay's hue so the stall is COLOURFUL */}
    <div style={{ position: "absolute", left: 12, top: 210, width: w - 24, height: 300, borderRadius: 8, background: `radial-gradient(ellipse at 50% 62%, ${hue}${Math.round(lit * 90).toString(16).padStart(2, "0")}, ${hue}22 46%, transparent 74%)`, opacity: 0.6 + lit * 0.4, filter: "blur(3px)", boxShadow: lit > 0.1 ? `inset 0 0 46px ${hue}44` : "none" }} />
    {/* neon frame */}
    <Neon x={8} y={196} w={w - 16} h={6} color={hue} on={lit} z={7} />
    <Neon x={8} y={512} w={w - 16} h={6} color={hue} on={lit} z={7} />
    <Neon x={8} y={196} w={6} h={322} color={hue} on={lit} z={7} round={4} />
    <Neon x={w - 14} y={196} w={6} h={322} color={hue} on={lit} z={7} round={4} />
    {/* wall detail: a gauge cluster (two dials), a paint-swatch strip, a hanging work-lamp */}
    <div style={{ position: "absolute", left: 20, top: 216, width: 30, height: 16, borderRadius: 3, background: "#160F30", border: `1.5px solid ${hue}`, opacity: 0.4 + lit * 0.6, boxShadow: lit > 0.1 ? `0 0 8px ${hue}66` : "none" }}>
      <div style={{ position: "absolute", left: 4, top: 4, width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${hue}`, opacity: 0.8 }} />
      <div style={{ position: "absolute", left: 17, top: 4, width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${hue}`, opacity: 0.8 }} />
    </div>
    {[MAGENTA, CYAN, LIME, NEONGOLD].map((c, i) => (
      <div key={i} style={{ position: "absolute", left: w - 30, top: 216 + i * 12, width: 14, height: 8, background: c, opacity: (0.35 + lit * 0.5), borderRadius: 2, boxShadow: lit > 0.1 ? `0 0 6px ${c}` : "none" }} />
    ))}
    <div style={{ position: "absolute", left: w / 2 - 2, top: 196, width: 3, height: 30, background: "#3A3060", opacity: 0.6 }} />
    <div style={{ position: "absolute", left: w / 2 - 14, top: 224, width: 28, height: 10, borderRadius: "0 0 8px 8px", background: hue, opacity: (0.4 + lit * 0.5) * (0.9 + Math.sin(lf / 9 + x) * 0.1), boxShadow: lit > 0.1 ? `0 6px 18px ${hue}` : "none" }} />
    {/* a tyre stack in the corner */}
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 16, top: 566 - i * 12, width: 26, height: 13, borderRadius: "50%", background: "#14161C", border: `2px solid ${i === 1 ? hue : "#2A2E38"}`, opacity: 0.5 + lit * 0.4 }} />
    ))}
    {/* the pit / lift platform on the deck, glowing */}
    <div style={{ position: "absolute", left: 22, top: 596, width: w - 44, height: 12, background: `linear-gradient(90deg, ${hue}55, #2A2436, ${hue}55)`, borderRadius: 3, opacity: 0.6 + lit * 0.4, boxShadow: lit > 0.1 ? `0 0 20px ${hue}77` : "none" }} />
    {/* a tool chest + a hanging cable */}
    <div style={{ position: "absolute", left: w - 46, top: 552, width: 30, height: 46, background: "#3A2E5A", border: `2px solid ${hue}`, borderRadius: 3, opacity: 0.55 + lit * 0.45, boxShadow: lit > 0.1 ? `0 0 10px ${hue}55` : "none" }} />
    {children}
  </div>
);

// neon haze / exhaust drifting in a bay's light
export const Haze: React.FC<{ lf: number; x: number; y?: number; w?: number; h?: number; o?: number; n?: number; sd?: number; color?: string }> = ({ lf, x, y = 210, w = 170, h = 360, o = 1, n = 6, sd = 0, color = MAGENTA }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const s = seed(i * 3.7 + sd + 1);
    const drift = ((lf * (0.18 + s * 0.32) + s * 300) % (w + 90)) - 45;
    const yy = y + s * h * 0.82;
    const sz = 40 + s * 70;
    return <div key={i} style={{ position: "absolute", left: x + drift, top: yy + Math.sin(lf / (34 + s * 22) + i) * 9, width: sz, height: sz * 0.54, borderRadius: "50%", background: `radial-gradient(ellipse, ${color}22, transparent 70%)`, filter: "blur(9px)", opacity: o, pointerEvents: "none", zIndex: 12 }} />;
  })}</>
);

// welding / exhaust SPARKS bursting from a point (a build in progress). Colourful.
export const Sparks: React.FC<{ lf: number; x: number; y: number; on?: number; color?: string; n?: number; z?: number }> = ({ lf, x, y, on = 1, color = NEONGOLD, n = 12, z = 24 }) => (
  <>{on > 0.02 && Array.from({ length: n }, (_, i) => {
    const cyc = Math.floor((lf + i * 3) / 16);
    const age = (lf + i * 3) % 16;
    const s = seed(i * 5.1 + cyc * 2.3);
    const a = (s - 0.5) * 2.4;
    const d = age * (2 + s * 3);
    const t = age / 16;
    return <div key={i} style={{ position: "absolute", left: x + Math.sin(a) * d, top: y + Math.abs(Math.cos(a)) * d * 0.5 + age * age * 0.16, width: 3, height: 3, borderRadius: "50%", background: i % 3 ? color : "#FFF4C0", opacity: (1 - t) * on, boxShadow: `0 0 6px ${color}`, zIndex: z }} />;
  })}</>
);

// a cast shadow so nothing floats
export const CastShadow: React.FC<{ x: number; y: number; w?: number; o?: number }> = ({ x, y, w = 100, o = 0.5 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: w * 0.2, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(0,0,0,${o}), transparent 70%)`, filter: "blur(5px)", zIndex: 14 }} />
);

// vignette, kept light so the neon carries
export const Vig: React.FC<{ o?: number }> = ({ o = 0.34 }) => (
  <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 160px rgba(6,4,16,${o})`, pointerEvents: "none", zIndex: 60 }} />
);

// the overhead gantry/truss with neon strip lights
export const Gantry: React.FC<{ x0?: number; x1?: number; y?: number; lf?: number }> = ({ x0 = 0, x1 = 1012, y = 92, lf = 0 }) => (
  <div style={{ position: "absolute", left: x0, top: y - 30, width: x1 - x0, height: 34, zIndex: 7 }}>
    <div style={{ position: "absolute", left: 0, top: 4, width: "100%", height: 5, background: "#2E2650" }} />
    <div style={{ position: "absolute", left: 0, top: 26, width: "100%", height: 4, background: "#251F44" }} />
    {Array.from({ length: Math.ceil((x1 - x0) / 150) }, (_, i) => (
      <Neon key={i} x={20 + i * 150} y={10} w={110} h={6} color={i % 2 ? CYAN : MAGENTA} on={0.9} z={8} />
    ))}
  </div>
);

// THE SCOREBOARD / RESULTS RAIL prop: a small dark board with lit rows (used for the plates etc.)
export const Board: React.FC<{ x: number; y: number; rows?: number; filled?: number; s?: number; o?: number; hue?: string }> = ({ x, y, rows = 5, filled = 5, s = 1, o = 1, hue = CYAN }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "0 0", opacity: o, zIndex: 9 }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 110, height: rows * 18 + 12, background: "#160F2E", border: `2px solid ${hue}`, borderRadius: 4, boxShadow: `0 0 16px ${hue}55` }}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 8, top: 8 + i * 18, width: 94, height: 12, borderRadius: 2, background: i < filled ? `${hue}` : "#2A2440", opacity: i < filled ? 0.85 : 0.4, boxShadow: i < filled ? `0 0 8px ${hue}` : "none" }} />
      ))}
    </div>
  </div>
);

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


// ---------------- SCENES ----------------

// ============================ S0 SHIP IT ============================
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  // S0 HOOK / SPEED SHOP. Same setting, story, camera and premium Cars: a high end car studio, warm KEY
  // light, the grey commuter BLOWN UP + centred as the ONE hero build. TAKE ONE strolls in from the right
  // and by ~f24 SLAMS a smug SHIP IT stamp on the hood. The mascot still stands BESIDE the car, no green
  // ring. The frame stays drenched in bold complementary gels and the deep shop stays ALIVE (fan, hoist
  // trolley, welder, TV, motes).
  // NEW (HARD PATTERN INTERRUPT, first ~0.6s): the frame opens BLOCKED by the garage roller SHUTTER, a
  // white blast fires, the shutter RIPS UP off a WHIP ZOOM punch, hits its stop at f7 with a camera kick,
  // a shockwave ring and a dust blast, and the hero car is slammed into view. It is a jolt, not a fade.
  // NEW (HIERARCHY): the background is pushed BACK hard. The far shop layer is blurred, dimmed and
  // desaturated, the gels are knocked down, and a dark scrim sits behind the hero so every busy detail
  // reads clearly SECONDARY while still moving. The hero car gets its own light pool, a gold rim halo, a
  // key cone and extra saturation/contrast so the eye lands on it instantly.
  // NEW (ALIVE HERO): the wheels SPIN, a turntable rotates under the car, a specular light SWEEPS down the
  // paint, the engine barks and the exhaust coughs, so the focal point never goes still.
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const cubic = Easing.inOut(Easing.cubic);

  // ---- THE INTERRUPT: whip zoom punch + shutter rip, all inside the first ~0.6s ----
  const whip = interpolate(lf, [0, 5, 9, 13], [1.34, 0.965, 1.02, 1], { ...clamp, easing: cubic }); // hard punch in
  const whipBlur = interpolate(lf, [0, 3, 9], [4.2, 2.2, 0], clamp);                                  // motion smear on the punch
  const whipRot = interpolate(lf, [0, 6, 11], [-2.6, 0.6, 0], { ...clamp, easing: cubic });
  const shutY = interpolate(lf, [0, 2, 7], [-436, -690, -980], { ...clamp, easing: Easing.out(Easing.cubic) }); // the shutter RIPS up off frame 0
  const shutOn = lf < 8 ? 1 : 0;
  const blast = interpolate(lf, [0, 2, 6], [0.52, 0.24, 0], clamp);                                     // full frame white blast
  const stopKick = lf >= 7 ? Math.sin((lf - 7) * 1.5) * 7.5 * Math.exp(-(lf - 7) / 3.2) : 0;         // the stop SLAMS the camera
  const shockAge = over(lf, 7, 13);                                                                   // impact shockwave ring
  const shockO = interpolate(lf, [7, 9, 20], [0, 0.8, 0], clamp);
  const blastDust = interpolate(lf, [7, 10, 26], [0, 0.7, 0], clamp);

  // ---- CAMERA: the punch settles into a slow push in, domain runs PAST f78 so the shot is STILL moving ----
  const cam = interpolate(lf, [0, 96], [1.0, 1.10], { ...clamp, easing: cubic }) * whip;
  const slamKick = lf >= 23 ? Math.sin((lf - 23) * 1.25) * 3 * Math.exp(-(lf - 23) / 5.5) : 0;
  const camX = slamKick + stopKick;
  const camY = slamKick * 0.5 + stopKick * 0.6;

  // ---- lights SLAM on with a two colour strobe, a cyan bar rips across, the sign snaps in ----
  const hookCyan = interpolate(lf, [6, 8, 13], [0.9, 0.34, 0], clamp);
  const hookMag = interpolate(lf, [8, 10, 16], [0, 0.6, 0], clamp);
  const barRip = interpolate(lf, [6, 15], [-460, 1060], { ...clamp, easing: Easing.out(Easing.cubic) });
  const barRipO = interpolate(lf, [6, 12, 17], [0.85, 0.5, 0], clamp);
  const signSlam = interpolate(lf, [7, 13, 17], [2.2, 0.92, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const strobe = lf < 17 ? (0.35 + 0.65 * Math.abs(Math.sin(lf * 1.7))) : (0.9 + 0.1 * Math.sin(lf * 0.5));

  const mainLit = interpolate(lf, [6, 10, 13], [0.62, 1, 1], clamp) * (0.94 + 0.06 * Math.sin(lf * 0.6));
  const signOn = interpolate(lf, [6, 10], [0.4, 1], clamp) * (0.9 + 0.1 * Math.abs(Math.sin(lf * 0.5)));
  const pulse = 0.85 + 0.15 * Math.sin(lf * 0.9);

  // ---- SPEED SHOP sign IGNITES like a cold neon tube, split PINK + CYAN, then buzzes steady ----
  const ignite = lf < 8 ? 0.1 : lf < 20 ? (seed(lf * 1.9 + 4) > 0.44 ? 1 : 0.18) : 1;
  const signCyanOn = signOn * ignite * (0.84 + 0.16 * Math.sin(lf * 1.7));
  const signPinkOn = signOn * ignite * (0.7 + 0.3 * Math.abs(Math.sin(lf / 5 + 1)));

  // ---- LIVE COLOUR: the big gels drift + pulse, two searchlight beams sweep the set (knocked back now) ----
  const gelDriftA = Math.sin(lf / 18) * 60;
  const gelDriftB = Math.cos(lf / 21) * 68;
  const beamX = -300 + ((lf * 15) % 1420);
  const beamRot = -20 + Math.sin(lf / 19) * 11;
  const beam2Rot = 17 + Math.cos(lf / 16) * 9;

  // ---- MACHINERY / ACTION ----
  const wrenchSpin = lf * 44;
  const tyreX = -110 + ((lf * 11) % 1260);
  const tyreRot = lf * 20;
  const gauge = -30 + Math.sin(lf / 14) * 42 + (lf % 6 < 2 ? (seed(lf) - 0.5) * 16 : 0);
  const chainSway = (i: number) => Math.sin(lf / 16 + i * 0.4) * 3.4;

  // ---- DEEP BACKGROUND MOTION: the receding shop is never frozen (fan, hoist trolley, welder, TV, motes) ----
  const fanSpin = lf * 27;
  const fanBlur = 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.9));
  const trolleyX = 70 + ((lf * 6.5) % 860);
  const trolleyBob = Math.sin(lf / 9) * 2;
  const bgWeld = (lf % 31) < 7 ? (0.28 + 0.72 * Math.abs(Math.sin(lf * 2.3))) * (seed(lf * 1.3) > 0.25 ? 1 : 0.3) : 0.04;
  const tvFlick = 0.4 + 0.32 * Math.sin(lf / 3.1) + (seed(Math.floor(lf / 3)) > 0.6 ? 0.24 : 0);
  const tvBar = (lf * 4) % 62;
  const tvHue = [AZURE, MAGENTA, NEONGOLD][Math.floor(lf / 12) % 3];
  const parX = Math.sin(lf / 34) * 5;

  // ---- weld heat: a primary shower FADES, a second welder keeps sparking the WHOLE scene ----
  const weldOn = 1 - over(lf, 6, 22);
  const weld2 = 0.55 + 0.35 * Math.abs(Math.sin(lf / 8));

  // ---- REV BEATS: the fresh engine BARKS, the car shudders, the headlights FLARE, the exhaust coughs ----
  const revBeat = (b: number) => (lf >= b ? Math.sin((lf - b) * 2.2) * Math.exp(-(lf - b) / 3.0) : 0);
  const rev = revBeat(8) + revBeat(16) + revBeat(46) + revBeat(72);
  const revShakeX = rev * 5.5;
  const revShakeY = rev * 2.6;
  const flare = Math.max(0, revBeat(8)) + Math.max(0, revBeat(16)) + Math.max(0, revBeat(46)) + Math.max(0, revBeat(72));

  // ---- the overhead KEY SWINGS across the hero, the cone rakes the set ----
  const spotSweep = Math.sin(lf / 12) * 46;

  // ---- TAKE ONE strolls in from the right, waves the flag once, then SLAMS the stamp at ~f24 ----
  const t1x = interpolate(lf, [6, 20], [1096, 726], { ...clamp, easing: Easing.out(Easing.cubic) });
  const t1lunge = lf >= 22 ? interpolate(lf, [22, 25, 30], [0, -14, -6], clamp) : 0;
  const wave = lf < 22 ? (0.5 + 0.5 * Math.sin(lf / 2.6)) : 0;
  const t1gaze = lf < 22 ? 0 : -2;

  // ---- the SHIP IT stamp: crashes down onto the hood, smug and crooked ----
  const shipScale = interpolate(lf, [22, 25, 30], [2.6, 0.88, 1.0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shipO = over(lf, 22, 3);
  const shipRot = interpolate(lf, [22, 26], [-26, -9], clamp);
  const slamFlash = interpolate(lf, [23, 25, 32], [0, 0.95, 0], clamp);
  const dustAge = over(lf, 24, 16);
  const dustO = interpolate(lf, [24, 26, 40], [0, 0.85, 0], clamp);

  // ---- geometry: the hero car BLOWN UP + centred is the ONE lit hero element ----
  const CAR_X = 506, CAR_Y = 600, CAR_S = 1.95;
  const carGlow = 0.5 + Math.sin(lf / 11) * 0.08;
  const roofSheen = 0.2 + 0.07 * Math.sin(lf / 12);
  // hero wheels sit at these screen points (car svg wheel centres 64 / 186 at cy 113, scaled about the anchor)
  const WHEEL_Y = CAR_Y + (113 - 142) * CAR_S + revShakeY;
  const WHEEL_R = 20 * CAR_S;
  const wheelSpin = lf * 34;                                                  // the rims SPIN the whole scene
  const wheelBlur = 0.4 + 0.6 * Math.abs(Math.sin(lf / 7));                   // rim motion smear breathes
  const turn = lf * 2.6;                                                      // a slow turntable rotates under the car
  const sweepP = ((lf * 1.5) % 62) / 62;                                      // a specular light sweeps down the paint

  return (
    <AbsoluteFill>
      {/* =============== EVERYTHING BELOW LIVES INSIDE THE PUSH-IN / WHIP-ZOOM CAMERA =============== */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY}px) rotate(${whipRot}deg)`, transformOrigin: "48% 71%", filter: whipBlur > 0.05 ? `blur(${whipBlur}px)` : "none" }}>

        {/* oversize graphite base so the punch never uncovers a bare edge */}
        <div style={{ position: "absolute", left: -160, top: -160, width: 1332, height: 1112, background: `radial-gradient(ellipse at 50% 30%, ${GRAPHITE} 0%, #191C21 56%, ${CHARCOAL} 100%)`, zIndex: 0 }} />

        {/* 1. THE STUDIO: graphite cyclorama + glossy floor, washed ELECTRIC blue + MAGENTA gels */}
        <GarageFloor horizon={432} hue={KEY} o={1} gel={ELECTRIC} gel2={MAGENTA} />

        {/* ===================================================================================== */}
        {/* 0. DEEP BACKGROUND: a receding shop BEHIND the hero. Now pushed HARD back: more blur,   */}
        {/*    lower brightness, desaturated, so all its detail and motion reads clearly SECONDARY. */}
        {/* ===================================================================================== */}
        <div style={{ position: "absolute", inset: 0, transform: `translate(${parX}px, 0)`, filter: "blur(4.6px) brightness(0.52) saturate(0.58) contrast(0.88)", zIndex: 1, pointerEvents: "none" }}>

          {/* far wall recess so the depth reads darker than the near wall */}
          <div style={{ position: "absolute", left: 40, top: 150, width: 932, height: 288, borderRadius: 8, background: "linear-gradient(180deg,#141829 0%,#0E1220 60%,#0A0D18 100%)", boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }} />

          {/* OVERHEAD CRANE RAIL: a dark I beam spanning the deep bay, with drop hangers */}
          <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 15, background: "linear-gradient(180deg,#3A4256 0%,#232A3E 52%,#141829 100%)", borderTop: "2px solid #4A536A", boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 0, top: 164, width: 1012, height: 4, background: "#0C1020" }} />
          {[150, 506, 864].map((hx, i) => <div key={"hg" + i} style={{ position: "absolute", left: hx, top: 110, width: 5, height: 42, background: "#1A2030" }} />)}

          {/* HOIST TROLLEY sliding along the crane rail (constant background motion), cable + hook bob */}
          <div style={{ position: "absolute", left: trolleyX, top: 138, width: 50, height: 22, borderRadius: 4, background: "linear-gradient(180deg,#4A5268,#20263A)", border: "1px solid #10131F", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 6, top: -6, width: 10, height: 10, borderRadius: "50%", background: "#2A3348", border: "2px solid #59627A" }} />
            <div style={{ position: "absolute", left: 32, top: -6, width: 10, height: 10, borderRadius: "50%", background: "#2A3348", border: "2px solid #59627A" }} />
          </div>
          <div style={{ position: "absolute", left: trolleyX + 24, top: 160, width: 3, height: 34 + trolleyBob, background: "#39415A" }} />
          <div style={{ position: "absolute", left: trolleyX + 18, top: 192 + trolleyBob, width: 16, height: 14, borderRadius: "3px 3px 9px 9px", background: "linear-gradient(180deg,#6A7288,#39415A)", border: "1px solid #10131F" }} />

          {/* LEFT MEZZANINE LOFT: a raised steel deck with a railing and stacked crates */}
          <div style={{ position: "absolute", left: 24, top: 214, width: 436, height: 20, background: "linear-gradient(180deg,#39415A 0%,#232A3E 60%,#161B2A 100%)", borderTop: "2px solid #4A536A", boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 24, top: 234, width: 436, height: 5, background: "#0C1020" }} />
          <div style={{ position: "absolute", left: 24, top: 184, width: 436, height: 4, background: "#39415A", borderRadius: 2 }} />
          {Array.from({ length: 17 }, (_, i) => <div key={"bal" + i} style={{ position: "absolute", left: 30 + i * 26, top: 186, width: 3, height: 28, background: "#2A3144" }} />)}
          <div style={{ position: "absolute", left: 74, top: 176, width: 48, height: 38, borderRadius: 3, background: "linear-gradient(180deg,#3A4256,#242B3C)", border: "1px solid #12151F", boxShadow: "inset 0 2px 4px rgba(120,150,210,0.12)" }} />
          <div style={{ position: "absolute", left: 128, top: 182, width: 40, height: 32, borderRadius: 3, background: "linear-gradient(180deg,#333C50,#202636)", border: "1px solid #12151F" }} />
          <div style={{ position: "absolute", left: 356, top: 178, width: 44, height: 36, borderRadius: 3, background: "linear-gradient(180deg,#3A4256,#242B3C)", border: "1px solid #12151F", boxShadow: "inset 0 2px 4px rgba(120,150,210,0.10)" }} />

          {/* DEEP PARTS RACK receding at the left edge: tall shelving stacked with boxes + a tyre */}
          <div style={{ position: "absolute", left: 6, top: 220, width: 42, height: 214, background: "linear-gradient(90deg,#20263A,rgba(18,22,36,0))", borderRight: "2px solid #2E3648" }}>
            {[0, 1, 2, 3].map((k) => <div key={"sh" + k} style={{ position: "absolute", left: 0, top: 30 + k * 50, width: 42, height: 4, background: "#3A4256" }} />)}
            <div style={{ position: "absolute", left: 6, top: 8, width: 28, height: 22, borderRadius: 2, background: "linear-gradient(180deg,#3E465C,#262D40)" }} />
            <div style={{ position: "absolute", left: 8, top: 84, width: 26, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#39415A,#20263A)" }} />
            <div style={{ position: "absolute", left: 5, top: 138, width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 44% 40%,#2A3144,#0E1220)", border: "5px solid #161B2A" }} />
            <div style={{ position: "absolute", left: 7, top: 188, width: 28, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#3E465C,#242B3C)" }} />
          </div>

          {/* ROLLER SHUTTER DOOR on the far right wall: corrugated panel, guide channels + bottom bar */}
          <div style={{ position: "absolute", left: 806, top: 196, width: 184, height: 232, borderRadius: 4, background: "repeating-linear-gradient(180deg,#2C3450 0 9px,#1B2138 9px 15px)", border: "3px solid #232A3E", boxShadow: "inset 0 0 30px rgba(0,0,0,0.55)" }}>
            <div style={{ position: "absolute", left: 8, top: 14, width: 168, height: 12, borderRadius: 2, background: "repeating-linear-gradient(90deg,#3A466A 0 14px,#141A2E 14px 20px)", opacity: 0.7 }} />
            <div style={{ position: "absolute", left: 0, top: 210, width: 184, height: 18, background: "linear-gradient(180deg,#39415A,#10131F)" }} />
            <div style={{ position: "absolute", left: 72, top: 214, width: 40, height: 7, borderRadius: 3, background: "#59627A" }} />
          </div>
          <div style={{ position: "absolute", left: 800, top: 196, width: 8, height: 232, background: "linear-gradient(180deg,#3A4256,#161B2A)" }} />
          <div style={{ position: "absolute", left: 990, top: 196, width: 8, height: 232, background: "linear-gradient(180deg,#3A4256,#161B2A)" }} />

          {/* LEFT PROJECT CAR parked deep (dark, cool rim): a low silhouette on the shop floor */}
          <div style={{ position: "absolute", left: 96, top: 406, width: 196, height: 46, borderRadius: "26px 34px 8px 8px", background: "linear-gradient(180deg,#232B46,#12162A)", boxShadow: `inset 0 2px 8px rgba(120,150,220,0.14), 0 0 16px ${CYAN}18` }} />
          <div style={{ position: "absolute", left: 132, top: 386, width: 92, height: 30, borderRadius: "22px 26px 0 0", background: "linear-gradient(180deg,#2A3350,#1A2038)", boxShadow: `inset 0 2px 6px ${CYAN}14` }} />
          <div style={{ position: "absolute", left: 118, top: 436, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 42% 40%,#2A3144,#0A0D18)", border: "5px solid #10131F" }} />
          <div style={{ position: "absolute", left: 236, top: 436, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 42% 40%,#2A3144,#0A0D18)", border: "5px solid #10131F" }} />

          {/* RIGHT PROJECT CAR parked deep in front of the shutter (the welder subject) */}
          <div style={{ position: "absolute", left: 760, top: 402, width: 200, height: 48, borderRadius: "28px 36px 8px 8px", background: "linear-gradient(180deg,#242C48,#12162A)", boxShadow: "inset 0 2px 8px rgba(120,150,220,0.12)" }} />
          <div style={{ position: "absolute", left: 800, top: 382, width: 96, height: 30, borderRadius: "24px 28px 0 0", background: "linear-gradient(180deg,#2A3350,#1A2038)" }} />
          <div style={{ position: "absolute", left: 786, top: 434, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 42% 40%,#2A3144,#0A0D18)", border: "5px solid #10131F" }} />
          <div style={{ position: "absolute", left: 900, top: 434, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 42% 40%,#2A3144,#0A0D18)", border: "5px solid #10131F" }} />
        </div>

        {/* 0b. DISTANT WELDER FLASHING on the right project car (kept alive, dimmer so it never pulls focus) */}
        <div style={{ position: "absolute", left: 812, top: 392, width: 130, height: 96, borderRadius: "50%", background: `radial-gradient(circle at 46% 54%, #EAF4FF, ${AZURE} 40%, transparent 68%)`, opacity: (0.16 + bgWeld * 0.7) * 0.5, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 856, top: 430, width: 12, height: 12, borderRadius: "50%", background: "#FFFFFF", opacity: bgWeld * 0.45, filter: "blur(2px)", boxShadow: `0 0 12px ${AZURE}`, mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
        {Array.from({ length: 5 }, (_, i) => { const s = seed(i * 6.7 + lf * 0.5); return <div key={"bw" + i} style={{ position: "absolute", left: 860 + (s - 0.5) * 54 * bgWeld, top: 436 + s * 26 * bgWeld, width: 2, height: 2, borderRadius: "50%", background: "#CFE6FF", opacity: bgWeld * (0.5 + s * 0.5) * 0.5, zIndex: 3, pointerEvents: "none" }} />; })}

        {/* 0c. SHOP TV up on the loft, FLICKERING (colour bars + a rolling scanline), knocked back */}
        <div style={{ position: "absolute", left: 46, top: 176, width: 92, height: 60, borderRadius: 5, background: "#0A0D16", border: "3px solid #20263A", boxShadow: `0 0 18px ${tvHue}${Math.round(tvFlick * 40).toString(16).padStart(2, "0")}, 0 4px 8px rgba(0,0,0,0.5)`, overflow: "hidden", opacity: 0.6, filter: "blur(1.4px) saturate(0.7)", zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 3, background: `linear-gradient(120deg, ${tvHue}, #0E1220 70%)`, opacity: 0.4 + tvFlick * 0.4 }} />
          <div style={{ position: "absolute", left: 6, top: 10, width: 60, height: 6, borderRadius: 2, background: "rgba(230,240,255,0.55)", opacity: 0.4 + tvFlick * 0.5 }} />
          <div style={{ position: "absolute", left: 6, top: 24, width: 42, height: 5, borderRadius: 2, background: "rgba(230,240,255,0.4)", opacity: 0.3 + tvFlick * 0.4 }} />
          <div style={{ position: "absolute", left: 0, top: tvBar, width: 92, height: 4, background: "rgba(255,255,255,0.16)" }} />
        </div>
        <div style={{ position: "absolute", left: 30, top: 176, width: 124, height: 74, borderRadius: "50%", background: `radial-gradient(ellipse, ${tvHue}, transparent 66%)`, opacity: 0.08 * (0.5 + tvFlick), filter: "blur(16px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />

        {/* 0d. BIG WALL FAN on the far wall, blades SPINNING (constant background motion), dimmed + softened */}
        <div style={{ position: "absolute", left: 714, top: 306, width: 96, height: 96, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, #2A3352, #0E1424)", border: `4px solid ${STEEL}`, boxShadow: "inset 0 0 16px rgba(0,0,0,0.6), 0 6px 14px rgba(0,0,0,0.55)", opacity: 0.62, filter: "blur(1.8px) brightness(0.7) saturate(0.7)", zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `conic-gradient(from 0deg, transparent, ${CHROME}22, transparent, ${CHROME}22, transparent, ${CHROME}22)`, opacity: 0.42 * fanBlur, transform: `rotate(${fanSpin * 0.4}deg)` }} />
          <div style={{ position: "absolute", inset: 10, transform: `rotate(${fanSpin}deg)` }}>
            {Array.from({ length: 5 }, (_, i) => <div key={"fb" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 33, height: 14, marginTop: -7, borderRadius: "0 13px 13px 0", background: "linear-gradient(180deg,#7C8698,#39415A)", transformOrigin: "0 50%", transform: `rotate(${i * 72}deg)`, boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }} />)}
          </div>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 16, margin: "-8px 0 0 -8px", borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #E7ECF4, ${STEEL})`, border: "1px solid #10131F" }} />
          {[0.42, 0.66, 0.9].map((s, i) => <div key={"fr" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 96, height: 96, margin: "-48px 0 0 -48px", borderRadius: "50%", border: "1px solid rgba(180,200,230,0.10)", transform: `scale(${s})` }} />)}
        </div>

        {/* 1a. WALL GLOW: two colour pools bloom on the back wall (kept, but clearly behind the hero now) */}
        <div style={{ position: "absolute", left: 60, top: 150, width: 560, height: 470, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, ${ELECTRIC}, transparent 62%)`, opacity: (0.23 + 0.06 * Math.sin(lf / 13)) * strobe, filter: "blur(56px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 480, top: 130, width: 560, height: 470, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, ${MAGENTA}, transparent 62%)`, opacity: (0.22 + 0.06 * Math.cos(lf / 11)) * strobe, filter: "blur(56px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />

        {/* 1b. COLOUR GELS drenching the set (still vibrant, opacity knocked ~35% so they stop competing) */}
        <GelWash x={300 + gelDriftA} y={300} w={800} h={660} color={ELECTRIC} o={(0.32 + 0.06 * Math.sin(lf / 14)) * strobe} blur={84} z={2} />
        <GelWash x={760 + gelDriftB} y={280} w={760} h={600} color={MAGENTA} o={(0.30 + 0.06 * Math.cos(lf / 12)) * strobe} blur={84} z={2} />
        <GelWash x={506} y={706} w={780} h={400} color={CYAN} o={0.18 + 0.05 * Math.sin(lf / 9)} blur={72} z={3} />

        {/* 1c. SWEEPING SEARCHLIGHT BEAMS raking the back wall, always in motion, softer */}
        <GelBar x={beamX} y={140} w={360} h={540} color={CYAN} o={0.2} rot={beamRot} z={3} />
        <GelBar x={180} y={-46} w={800} h={150} color={MAGENTA} o={0.17 + 0.05 * Math.sin(lf / 11)} rot={beam2Rot} z={3} />

        {/* 1d. DEEP DUST MOTES drifting through the far beams */}
        {Array.from({ length: 11 }, (_, i) => {
          const s = seed(i * 5.7 + 6);
          const bx = 150 + s * 720;
          const by = 176 + ((lf * (0.18 + s * 0.3) + s * 300) % 260);
          return <div key={"bm" + i} style={{ position: "absolute", left: bx, top: by, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: "rgba(170,195,240,0.5)", opacity: (0.06 + s * 0.1) * (0.4 + mainLit * 0.5), filter: "blur(1px)", zIndex: 3, pointerEvents: "none" }} />;
        })}

        {/* a warm KEY wash filling the upper bay so there is no dead headroom above the hero */}
        <div style={{ position: "absolute", left: CAR_X - 400, top: 120, width: 800, height: 420, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 34%, ${KEY}, transparent 66%)`, opacity: 0.08 + mainLit * 0.07, filter: "blur(34px)", zIndex: 4, pointerEvents: "none" }} />

        {/* 2. SOFT STUDIO WASH: a warm KEY pooled on the hero + a cool FILL from camera left */}
        <StudioLight x={CAR_X} y={236} w={660} h={560} color={KEY} o={0.11 + mainLit * 0.11} z={4} />
        <StudioLight x={214} y={356} w={540} h={540} color={FILL} o={0.08} z={4} />

        {/* 3. OVERHEAD BRUSHED STEEL TRUSS + a lattice, with a hung warning striped header beam */}
        <svg width={1012} height={42} style={{ position: "absolute", left: 0, top: 58, overflow: "visible", zIndex: 6, opacity: 0.45 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M ${i * 74} 8 L ${i * 74 + 37} 32 L ${i * 74 + 74} 8`} fill="none" stroke={STEEL} strokeWidth={3} strokeLinecap="round" />
          ))}
        </svg>
        <div style={{ position: "absolute", left: 0, top: 70, width: 1012, height: 22, background: "linear-gradient(180deg,#4A525B 0%,#2A2E35 58%,#1A1D22 100%)", borderTop: `2px solid #5A626C`, boxShadow: "0 7px 16px rgba(0,0,0,0.5)", opacity: 0.7, zIndex: 7 }} />
        <div style={{ position: "absolute", left: 0, top: 92, width: 1012, height: 12, background: "repeating-linear-gradient(45deg,#C8A32E 0 18px,#1A1D22 18px 36px)", opacity: 0.4, zIndex: 7 }} />

        {/* 3b. COLOURED LED STRIPS on the truss, pulsing complementary (signage colour + motion, dimmer) */}
        <Neon x={70} y={64} w={180} h={5} color={CYAN} on={0.4 + 0.2 * Math.abs(Math.sin(lf / 7))} z={7} />
        <Neon x={420} y={64} w={180} h={5} color={MAGENTA} on={0.4 + 0.2 * Math.abs(Math.sin(lf / 7 + 1.5))} z={7} />
        <Neon x={770} y={64} w={180} h={5} color={ELECTRIC} on={0.4 + 0.2 * Math.abs(Math.sin(lf / 7 + 3))} z={7} />

        {/* 4. TWO HUNG SOFTBOX STUDIO LIGHTS (real light sources in shot), strobing up on the hook */}
        <div style={{ position: "absolute", left: 168, top: 92, width: 3, height: 22, background: "#2A2E35", zIndex: 7 }} />
        <div style={{ position: "absolute", left: 842, top: 92, width: 3, height: 22, background: "#2A2E35", zIndex: 7 }} />
        <SoftBox x={94} y={112} w={150} h={92} color="#FFF3DA" o={(0.3 + mainLit * 0.24) * strobe} z={8} />
        <SoftBox x={768} y={112} w={150} h={92} color="#EAF0F8" o={(0.26 + mainLit * 0.24) * strobe} z={8} />

        {/* 5. CABLE SWAGS drooping from the truss, swaying */}
        <svg width={1012} height={120} style={{ position: "absolute", left: 0, top: 104, overflow: "visible", zIndex: 6, opacity: 0.7 }}>
          {[150, 470, 812].map((sx, i) => (
            <path key={i} d={`M ${sx} 4 Q ${sx + 66} ${46 + Math.sin(lf / 15 + i) * 6} ${sx + 148} 6`} fill="none" stroke="#14171B" strokeWidth={5} strokeLinecap="round" />
          ))}
        </svg>

        {/* 5b. A TYRE ROLLING across the mid ground behind the hero (background action, softened) */}
        <div style={{ position: "absolute", left: tyreX, top: 452, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, #2A2E36, #0E1013)", border: "6px solid #14171B", boxShadow: "0 6px 12px rgba(0,0,0,0.5)", transform: `rotate(${tyreRot}deg)`, filter: "blur(1.6px) brightness(0.72)", zIndex: 12 }}>
          {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: 22, top: 4, width: 4, height: 20, background: "rgba(200,210,225,0.28)", transformOrigin: "50% 24px", transform: `rotate(${i * 60}deg)` }} />)}
        </div>

        {/* 6. CARBON FIBRE BACK PANEL behind the hero, with the SPEED SHOP sign IGNITING (PINK + CYAN neon) */}
        <div style={{ position: "absolute", left: 300, top: 150, width: 412, height: 152, borderRadius: 6, background: "repeating-linear-gradient(45deg,#191C21 0 5px,#262A31 5px 10px), repeating-linear-gradient(-45deg,rgba(0,0,0,0.32) 0 5px,transparent 5px 10px)", border: `2px solid ${STEEL}`, boxShadow: `inset 0 0 34px rgba(0,0,0,0.55), 0 0 30px ${CYAN}${Math.round(signCyanOn * 60).toString(16).padStart(2, "0")}`, opacity: 0.8, zIndex: 5 }} />
        <div style={{ position: "absolute", left: 316, top: 172, width: 380, height: 88, borderRadius: 10, background: `radial-gradient(ellipse at 38% 50%, ${HOTPINK}, transparent 64%), radial-gradient(ellipse at 72% 50%, ${CYAN}, transparent 64%)`, opacity: 0.16 * (signPinkOn + signCyanOn), filter: "blur(22px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        {/* SPEED SHOP: ONE clean centred sign, smaller + dimmer so the hero car clearly outranks it */}
        <div style={{ position: "absolute", left: 300, top: 190, width: 412, textAlign: "center", transform: `scale(${signSlam})`, transformOrigin: "506px 210px", opacity: 0.78, zIndex: 17 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 40, letterSpacing: "0.1em", color: "#D9D2C6", opacity: 0.5 + Math.max(signPinkOn, signCyanOn) * 0.32, whiteSpace: "nowrap", textShadow: `0 0 5px rgba(255,95,162,${0.34 * signPinkOn + 0.14}), 0 0 12px rgba(31,214,230,${0.34 * signCyanOn + 0.1})` }}>SPEED SHOP</span>
        </div>
        <Neon x={352} y={258} w={308} h={3} color={MAGENTA} on={signPinkOn * (0.4 + 0.2 * Math.abs(Math.sin(lf / 6)))} z={16} />

        {/* 7. PEGBOARD TOOL WALL (camera left): brushed panel with hanging chrome wrenches, gently swaying */}
        <div style={{ position: "absolute", left: 42, top: 250, width: 196, height: 150, background: "linear-gradient(160deg,#2A2E35,#181B20)", border: `3px solid ${STEEL}`, borderRadius: 6, boxShadow: `inset 0 0 26px rgba(0,0,0,0.55), 0 0 18px ${ELECTRIC}18`, opacity: 0.72, filter: "blur(1.1px) brightness(0.78)", zIndex: 5 }}>
          {Array.from({ length: 18 }, (_, i) => <div key={i} style={{ position: "absolute", left: 16 + (i % 6) * 30, top: 20 + Math.floor(i / 6) * 40, width: 5, height: 5, borderRadius: "50%", background: "#0E1013" }} />)}
          <div style={{ position: "absolute", left: 26, top: 18, width: 12, height: 70, background: "linear-gradient(180deg,#E7ECF4,#9AA1AE)", borderRadius: 5, transform: `rotate(${8 + Math.sin(lf / 12) * 4}deg)`, transformOrigin: "50% 0", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 1, top: 0, width: 10, height: 15, borderRadius: "50%", border: "3px solid #C7CDD8" }} />
          </div>
          <div style={{ position: "absolute", left: 84, top: 20, width: 11, height: 82, background: "linear-gradient(180deg,#E7ECF4,#8A919E)", borderRadius: 5, transform: `rotate(${-5 + Math.sin(lf / 10 + 1) * 4}deg)`, transformOrigin: "50% 0", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 128, top: 22, width: 46, height: 30, borderRadius: 3, background: "linear-gradient(180deg,#333A42,#20252B)", border: "1px solid #12151A" }} />
        </div>

        {/* 8. CHROME BEZEL PRESSURE GAUGE (camera right) with a TWITCHING needle */}
        <div style={{ position: "absolute", left: 792, top: 258, width: 74, height: 74, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #20242A, #0E1013)", border: `4px solid ${CHROME}`, boxShadow: `inset 0 0 12px rgba(0,0,0,0.6), 0 0 16px ${MAGENTA}22, 0 4px 10px rgba(0,0,0,0.5)`, opacity: 0.7, filter: "blur(1.1px) brightness(0.76)", zIndex: 5 }}>
          {Array.from({ length: 10 }, (_, i) => { const a = (-140 + i * 31) * Math.PI / 180; return <div key={i} style={{ position: "absolute", left: 35 + Math.cos(a) * 28, top: 35 + Math.sin(a) * 28, width: 2, height: 2, borderRadius: "50%", background: i > 6 ? HOTRED : "#7A828D" }} />; })}
          <div style={{ position: "absolute", left: 35, top: 14, width: 2.5, height: 24, background: HOTRED, transformOrigin: "50% 100%", transform: `rotate(${gauge}deg)`, borderRadius: 2, boxShadow: `0 0 5px ${HOTRED}` }} />
          <div style={{ position: "absolute", left: 31, top: 33, width: 9, height: 9, borderRadius: "50%", background: CHROME }} />
        </div>

        {/* 9. THE HOIST: a brushed steel chain + hook SWINGING over the just finished hero car */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"ch" + i} style={{ position: "absolute", left: 584 + chainSway(i), top: 104 + i * 29, width: i % 2 ? 11 : 17, height: 25, borderRadius: 8, border: "3px solid #9AA0AA", background: "transparent", opacity: 0.62, boxShadow: "0 1px 2px rgba(0,0,0,0.6)", zIndex: 18 }} />
        ))}
        <div style={{ position: "absolute", left: 574 + chainSway(12), top: 448, width: 34, height: 30, borderRadius: "5px 5px 16px 16px", background: "linear-gradient(180deg,#C6CDD8,#6A7080)", border: "2px solid #3A3F49", opacity: 0.68, boxShadow: "0 4px 10px rgba(0,0,0,0.5)", zIndex: 18 }} />

        {/* 10. PREMIUM DECK PROPS: a tyre stack + a brushed steel fluid drum (dressing, pushed back) */}
        {[0, 1, 2, 3].map((i) => (
          <div key={"ty" + i} style={{ position: "absolute", left: 236, top: 668 - i * 16, width: 66, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 38%, #262A31, #101216)", border: "3px solid #2A2E38", boxShadow: "0 3px 6px rgba(0,0,0,0.4)", opacity: 0.8, filter: "blur(0.8px) brightness(0.72)", zIndex: 13 }}>
            <div style={{ position: "absolute", left: 16, top: 9, width: 34, height: 5, borderRadius: 3, background: "rgba(203,210,220,0.18)" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 748, top: 566, width: 70, height: 158, borderRadius: "10px 10px 8px 8px", background: "linear-gradient(90deg,#20242A 0%,#3E454E 42%,#191C21 100%)", border: "2px solid #12151A", boxShadow: "inset -6px 0 16px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.55)", opacity: 0.82, filter: "blur(0.9px) brightness(0.74)", zIndex: 13 }}>
          <div style={{ position: "absolute", left: 0, top: 16, width: 70, height: 5, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 0, top: 118, width: 70, height: 5, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 16, top: -6, width: 38, height: 12, borderRadius: 4, background: "linear-gradient(180deg,#C6CDD8,#7A828D)", border: "1px solid #12151A" }} />
          <div style={{ position: "absolute", left: 12, top: 52, width: 46, height: 40, borderRadius: 3, background: "repeating-linear-gradient(45deg,#C8A32E 0 8px,#1A1D22 8px 16px)", opacity: 0.7, border: "1px solid #12151A" }} />
        </div>

        {/* 10b. RISING COLOURED HAZE through the beams + a low drifting shop haze (motion, low contrast) */}
        <Haze lf={lf} x={300} y={230} w={220} h={360} o={0.42} n={5} sd={1} color={ELECTRIC} />
        <Haze lf={lf + 40} x={640} y={250} w={220} h={340} o={0.38} n={5} sd={5} color={MAGENTA} />
        <div style={{ position: "absolute", left: -40 + ((lf * 3) % 200), top: 560, width: 1120, height: 220, background: `radial-gradient(ellipse at 40% 60%, ${CYAN}22, transparent 60%), radial-gradient(ellipse at 70% 50%, ${MAGENTA}1E, transparent 60%)`, opacity: 0.28 + 0.08 * Math.sin(lf / 15), filter: "blur(30px)", mixBlendMode: "screen", zIndex: 12, pointerEvents: "none" }} />

        {/* 10c. DUST MOTES drifting through the key beam (kept, dimmer) */}
        {Array.from({ length: 14 }, (_, i) => {
          const s = seed(i * 4.2 + 2);
          const bx = 356 + s * 300;
          const by = 178 + ((lf * (0.3 + s * 0.5) + s * 400) % 360);
          return <div key={"dm" + i} style={{ position: "absolute", left: bx, top: by, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: "rgba(255,240,210,0.55)", opacity: (0.08 + s * 0.14) * (0.4 + mainLit * 0.6), filter: "blur(0.8px)", zIndex: 13, pointerEvents: "none" }} />;
        })}

        {/* ===================================================================================== */}
        {/* 11. HIERARCHY SCRIM: one dark pass that pushes EVERY background layer back at once.     */}
        {/*     Darkest at the frame edges, near clear over the hero, so the eye is funnelled in.   */}
        {/* ===================================================================================== */}
        <div style={{ position: "absolute", left: -160, top: -160, width: 1332, height: 1112, background: `radial-gradient(ellipse 46% 42% at 50% 60%, rgba(8,10,16,0.06) 0%, rgba(8,10,16,0.40) 42%, rgba(6,7,12,0.68) 78%, rgba(4,5,9,0.80) 100%)`, zIndex: 14, pointerEvents: "none" }} />

        {/* 12. CHROME JACK STANDS flanking the hero + a hazard floor marking on the deck */}
        {[CAR_X - 196, CAR_X + 196].map((jx, i) => (
          <div key={"js" + i} style={{ position: "absolute", left: jx - 11, top: 672, width: 22, height: 36, background: "linear-gradient(180deg,#C6CDD8,#79818C)", clipPath: "polygon(50% 0, 100% 100%, 0 100%)", opacity: 0.7, boxShadow: "0 3px 6px rgba(0,0,0,0.5)", zIndex: 16 }} />
        ))}
        <div style={{ position: "absolute", left: CAR_X - 280, top: 706, width: 560, height: 9, background: "repeating-linear-gradient(45deg,#C8A32E 0 14px,#1A1D22 14px 28px)", opacity: 0.22, borderRadius: 2, transform: "scaleY(0.6)", zIndex: 13 }} />

        {/* 13. THE HERO STAGE: a slow TURNTABLE rotating under the car (constant focal motion) */}
        <div style={{ position: "absolute", left: CAR_X - 262, top: 528, width: 524, height: 118, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 46%, rgba(255,232,196,0.20), rgba(30,26,22,0.35) 62%, transparent 78%)`, border: "2px solid rgba(255,226,180,0.22)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)", zIndex: 15, pointerEvents: "none" }} />
        {Array.from({ length: 14 }, (_, i) => {
          const a = ((i / 14) * 360 + turn) * Math.PI / 180;
          const tx = CAR_X + Math.cos(a) * 246, ty = 587 + Math.sin(a) * 52;
          const dep = 0.35 + 0.65 * ((Math.sin(a) + 1) / 2);
          return <div key={"tt" + i} style={{ position: "absolute", left: tx - 5, top: ty - 3, width: 10, height: 6, borderRadius: 3, background: "rgba(255,224,176,0.85)", opacity: 0.16 + dep * 0.4, boxShadow: `0 0 8px ${KEY}88`, zIndex: 15, pointerEvents: "none" }} />;
        })}

        {/* 14. FOCAL LIGHTING (sits ABOVE the scrim so the hero pool stays the brightest area in frame) */}
        <div style={{ position: "absolute", left: CAR_X + spotSweep - 190, top: 118, width: 380, height: 470, background: `linear-gradient(180deg, rgba(255,238,208,0.34), transparent 88%)`, clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)", filter: "blur(9px)", opacity: 0.5 + mainLit * 0.4, mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 250, top: 512, width: 500, height: 170, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(255,238,206,0.55), transparent 68%)", opacity: 0.42 + carGlow * 0.2, filter: "blur(16px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 300, top: 372, width: 600, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 58%, ${NEONGOLD}, transparent 60%)`, opacity: 0.2 + carGlow * 0.12, filter: "blur(30px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 420, top: 430, width: 360, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse at 72% 50%, ${MAGENTA}, transparent 62%)`, opacity: (0.2 + 0.07 * Math.sin(lf / 10)) * pulse, filter: "blur(22px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X + 56, top: 430, width: 360, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse at 28% 50%, ${CYAN}, transparent 62%)`, opacity: (0.18 + 0.07 * Math.cos(lf / 10)) * pulse, filter: "blur(22px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 240, top: 596, width: 480, height: 96, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 34%, rgba(255,236,204,0.4), ${KEY}22 44%, transparent 74%)`, opacity: 0.44 + carGlow * 0.16, filter: "blur(14px)", zIndex: 16, pointerEvents: "none" }} />

        {/* 15. THE HERO CAR: the dull grey commuter (solve 0), BLOWN UP + centred, the ONE focal point. */}
        {/*     Wrapped in a punch-up filter so it is the sharpest, most saturated thing in the frame.  */}
        <CastShadow x={CAR_X} y={CAR_Y - 2} w={372} o={0.62} />
        <div style={{ position: "absolute", left: CAR_X - 168, top: CAR_Y - 26, width: 336, height: 52, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.62), transparent 70%)", filter: "blur(9px)", zIndex: 17, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 20, filter: "saturate(1.16) contrast(1.12) brightness(1.12) drop-shadow(0 0 20px rgba(255,214,158,0.34)) drop-shadow(0 14px 26px rgba(0,0,0,0.6))", pointerEvents: "none" }}>
          <Car x={CAR_X + revShakeX} y={CAR_Y + revShakeY} s={CAR_S} solve={0} build={1} glow={carGlow * 0.24} reflect={0.5} rot={rev * 0.7} z={2} />
          {/* 15a. the WHEELS SPIN: a smeared rim disc + chrome spokes turning over each hub */}
          {[CAR_X + revShakeX - 62 * CAR_S, CAR_X + revShakeX + 60 * CAR_S].map((wx, i) => (
            <React.Fragment key={"wh" + i}>
              <div style={{ position: "absolute", left: wx - WHEEL_R * 0.74, top: WHEEL_Y - WHEEL_R * 0.74, width: WHEEL_R * 1.48, height: WHEEL_R * 1.48, borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 42% 38%, #23272F, #0D0F13)", border: `2px solid ${CHROME}`, transform: `rotate(${wheelSpin + i * 17}deg)`, zIndex: 4 }}>
                {Array.from({ length: 7 }, (_, k) => (
                  <div key={"sp" + k} style={{ position: "absolute", left: "50%", top: "50%", width: 3.4, height: WHEEL_R * 0.62, marginLeft: -1.7, background: "linear-gradient(180deg,#E4EAF2,#8A919E)", borderRadius: 2, transformOrigin: "50% 0%", transform: `rotate(${k * (360 / 7)}deg)` }} />
                ))}
              </div>
              <div style={{ position: "absolute", left: wx - WHEEL_R * 0.74, top: WHEEL_Y - WHEEL_R * 0.74, width: WHEEL_R * 1.48, height: WHEEL_R * 1.48, borderRadius: "50%", background: `conic-gradient(from ${wheelSpin * 2}deg, transparent, rgba(226,232,242,0.30), transparent, rgba(226,232,242,0.22), transparent)`, opacity: 0.4 * wheelBlur, zIndex: 5, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: wx - 7, top: WHEEL_Y - 7, width: 14, height: 14, borderRadius: "50%", background: `radial-gradient(circle at 38% 34%, #F2F5FA, ${CHROME})`, border: "1.5px solid #2A2F38", zIndex: 6 }} />
            </React.Fragment>
          ))}
        </div>

        {/* 15b. HEADLIGHT FLARE (front / right): the beams FLARE hard on each rev bark */}
        <div style={{ position: "absolute", left: 656, top: 452, width: 120, height: 66, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,246,220,0.95), transparent 66%)", opacity: 0.26 + flare * 0.7, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 22, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 690, top: 468, width: 200, height: 40, transform: "skewX(-30deg)", background: "linear-gradient(90deg, rgba(255,248,224,0.9), transparent 74%)", opacity: flare * 0.55, filter: "blur(4px)", mixBlendMode: "screen", zIndex: 22, pointerEvents: "none" }} />

        {/* 15c. EXHAUST: a soft idle drift off the tail + a hard COUGH puff on each rev bark (rear / left) */}
        {Array.from({ length: 4 }, (_, i) => {
          const age = ((lf + i * 7) % 28) / 28;
          return <div key={"px" + i} style={{ position: "absolute", left: 300 - age * 40, top: CAR_Y - 66 - age * 40, width: 16 + age * 30, height: 16 + age * 30, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,210,225,0.34), transparent 70%)", opacity: (1 - age) * 0.6, filter: "blur(5px)", zIndex: 21, pointerEvents: "none" }} />;
        })}
        {Array.from({ length: 5 }, (_, i) => {
          const s = seed(i * 3.1 + 9);
          return <div key={"rc" + i} style={{ position: "absolute", left: 306 - flare * (30 + s * 60), top: CAR_Y - 58 - flare * (20 + s * 40), width: 20 + flare * 40, height: 20 + flare * 40, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,218,230,0.5), transparent 70%)", opacity: flare * 0.7 * (0.6 + s * 0.4), filter: "blur(6px)", zIndex: 21, pointerEvents: "none" }} />;
        })}

        {/* 16. GLOSS on the grey paint + a SPECULAR LIGHT SWEEPING down the body on a loop */}
        <div style={{ position: "absolute", left: CAR_X - 176, top: 404, width: 352, height: 150, background: "linear-gradient(116deg, transparent 24%, rgba(255,247,232,0.55) 46%, transparent 62%)", filter: "blur(6px)", opacity: roofSheen, mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 176, top: 404, width: 352, height: 150, background: `linear-gradient(124deg, transparent 30%, ${CYAN}66 48%, transparent 60%)`, filter: "blur(7px)", opacity: 0.26 + 0.12 * Math.sin(lf / 9), mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 300 + sweepP * 500, top: 384, width: 120, height: 210, transform: "skewX(-22deg)", background: "linear-gradient(90deg, transparent, rgba(255,252,238,0.85), transparent)", filter: "blur(9px)", opacity: 0.5 * Math.sin(Math.PI * Math.min(1, sweepP * 1.02)), mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: CAR_X - 58, top: 452, width: 84, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.9), transparent 66%)", filter: "blur(2px)", opacity: 0.42 + carGlow * 0.2, mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />

        {/* 17. WELD SPARKS: a primary shower fades, a second welder keeps showering the whole scene */}
        <Sparks lf={lf} x={CAR_X - 132} y={CAR_Y - 58} on={weldOn} color={NEONORANGE} n={12} z={24} />
        <Sparks lf={lf + 6} x={CAR_X - 104} y={CAR_Y - 42} on={weldOn * 0.7} color="#FFF4C0" n={5} z={24} />
        <Sparks lf={lf + 13} x={CAR_X + 118} y={CAR_Y - 30} on={weld2} color={NEONORANGE} n={10} z={24} />
        <div style={{ position: "absolute", left: CAR_X + 92, top: CAR_Y - 62, width: 90, height: 90, borderRadius: "50%", background: `radial-gradient(circle, ${NEONORANGE}, transparent 66%)`, opacity: 0.28 * weld2, filter: "blur(8px)", mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />

        {/* 18. THE HERO (clay, alone), BESIDE the car: warm mechanic with a cool rim, backward cap */}
        <div style={{ position: "absolute", left: 168, top: 496, width: 170, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, ${CYAN}, transparent 64%)`, opacity: 0.18 + 0.06 * Math.sin(lf / 9), filter: "blur(12px)", mixBlendMode: "screen", zIndex: 25, pointerEvents: "none" }} />
        <CastShadow x={244} y={676} w={124} o={0.44} />
        <div style={{ position: "absolute", left: 182, top: 528, zIndex: 26, filter: `drop-shadow(0 0 4px ${CYAN}77) drop-shadow(0 6px 10px rgba(0,0,0,0.7))` }}>
          <Mascot lf={lf} size={124} tint={HERO} capBack={1} gaze={2} nodAmp={1.8} nodSpeed={12} />
        </div>

        {/* 18b. AN IMPACT WRENCH on the foreground deck, socket SPINNING fast (constant machinery motion) */}
        <div style={{ position: "absolute", left: 138, top: 704, zIndex: 51, opacity: 0.8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6)) brightness(0.82)" }}>
          <div style={{ position: "absolute", left: 0, top: 6, width: 52, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#E7ECF4,#8A919E)", border: "1px solid #12151A" }} />
          <div style={{ position: "absolute", left: 8, top: 22, width: 16, height: 24, borderRadius: 3, background: "linear-gradient(180deg,#333A42,#1A1D22)" }} />
          <div style={{ position: "absolute", left: 46, top: 4, width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #E7ECF4, #6A7080)", border: "2px solid #3A3F49", transform: `rotate(${wrenchSpin}deg)`, boxShadow: `0 0 8px ${CYAN}44` }}>
            {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: 11, top: -1, width: 3, height: 8, background: "#C6CDD8", transformOrigin: "50% 14px", transform: `rotate(${i * 60}deg)` }} />)}
          </div>
        </div>

        {/* 19. TAKE ONE (grey primer): strolls in from the right, waves the flag, then leans in and SLAMS */}
        <div style={{ position: "absolute", left: t1x + t1lunge - 6, top: 520, width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse, ${COOL}, transparent 66%)`, opacity: 0.22, filter: "blur(11px)", zIndex: 27, pointerEvents: "none" }} />
        <CastShadow x={t1x + t1lunge + 58} y={678} w={112} o={0.42} />
        <div style={{ position: "absolute", left: t1x + t1lunge, top: 526, zIndex: 28 }}>
          <Villain lf={lf} size={122} flag={1} wave={wave} rim={0.5} gaze={t1gaze} nodAmp={1.4} nodSpeed={11} />
        </div>

        {/* 20. THE SHIP IT STAMP: crashes crooked onto the hood at ~f24 with a flash + dust and debris */}
        {shipO > 0.02 && <ShipIt x={456} y={462} s={shipScale} rot={shipRot} o={shipO} z={40} />}
        <div style={{ position: "absolute", left: 446, top: 448, width: 130, height: 90, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,214,0.95), transparent 66%)", opacity: slamFlash, mixBlendMode: "screen", zIndex: 41, pointerEvents: "none" }} />
        {dustO > 0.02 && <div style={{ position: "absolute", left: 510 - (60 + dustAge * 150), top: 500 - (18 + dustAge * 44), width: 120 + dustAge * 300, height: 36 + dustAge * 88, borderRadius: "50%", background: `radial-gradient(ellipse, transparent 52%, rgba(226,232,240,${0.5 * (1 - dustAge)}) 66%, transparent 80%)`, opacity: dustO, filter: "blur(3px)", zIndex: 41, pointerEvents: "none" }} />}
        {dustO > 0.02 && Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2 + 0.4, sp = 40 + seed(i * 5.3) * 130;
          return <div key={"du" + i} style={{ position: "absolute", left: 510 + Math.cos(a) * sp * dustAge, top: 500 + Math.abs(Math.sin(a)) * sp * dustAge * 0.6 - 8, width: 5 + seed(i) * 8, height: 5 + seed(i) * 8, borderRadius: "50%", background: "radial-gradient(circle, rgba(216,222,232,0.7), transparent 70%)", opacity: dustO * (1 - dustAge), filter: "blur(2px)", zIndex: 41, pointerEvents: "none" }} />;
        })}

        {/* 21. FOREGROUND OCCLUDERS (dark, out of focus): a near tool cabinet + a blurred tyre for depth */}
        <div style={{ position: "absolute", left: -24, top: 600, width: 150, height: 220, borderRadius: 6, background: "linear-gradient(100deg,#1E2228,#2E343C 42%,#15181D)", border: "2px solid #14171B", boxShadow: "inset -6px 0 18px rgba(0,0,0,0.5), 0 10px 26px rgba(0,0,0,0.6)", filter: "blur(3px) brightness(0.7)", zIndex: 50 }}>
          {[0, 1, 2, 3].map((k) => (
            <React.Fragment key={k}>
              <div style={{ position: "absolute", left: 14, top: 18 + k * 48, width: 120, height: 38, borderRadius: 4, background: "linear-gradient(180deg,#333A42,#242A31)", border: "1px solid #12151A", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", left: 46, top: 32 + k * 48, width: 56, height: 6, borderRadius: 3, background: "linear-gradient(90deg,#AEB6C2,#7D8590)", boxShadow: "0 1px 2px rgba(0,0,0,0.6)" }} />
            </React.Fragment>
          ))}
        </div>
        <div style={{ position: "absolute", left: 902, top: 636, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, #16191F, #08090D)", filter: "blur(4px)", boxShadow: "inset 0 0 20px rgba(0,0,0,0.7)", zIndex: 50 }} />
        <div style={{ position: "absolute", left: -24, top: 748, width: 1060, height: 60, background: "linear-gradient(180deg,#0E1015,#07080B)", filter: "blur(1px)", zIndex: 49 }} />

        {/* 22. THE LIGHT SLAM: a CYAN bar RIPS across as the shutter clears, then a two colour strobe */}
        <div style={{ position: "absolute", left: barRip, top: 120, width: 240, height: 620, background: `linear-gradient(90deg, transparent, ${CYAN}, #FFFFFF, ${CYAN}, transparent)`, opacity: barRipO, filter: "blur(10px)", mixBlendMode: "screen", zIndex: 55, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 44%, ${CYAN}, transparent 62%)`, opacity: hookCyan * 0.8, mixBlendMode: "screen", zIndex: 56, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 46%, ${MAGENTA}, transparent 64%)`, opacity: hookMag * 0.7, mixBlendMode: "screen", zIndex: 56, pointerEvents: "none" }} />
      </div>

      {/* =============== THE PATTERN INTERRUPT, IN SCREEN SPACE (outside the camera) =============== */}
      {/* the garage roller SHUTTER blocks the top of frame 0 and RIPS UP, revealing the hero car */}
      {shutOn > 0 && (
        <div style={{ position: "absolute", left: -30, top: -30, width: 1072, height: 900, transform: `translateY(${shutY}px)`, zIndex: 57, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg,#3A4150 0 22px,#20263A 22px 38px)", boxShadow: "inset 0 -40px 90px rgba(0,0,0,0.8)" }} />
          {Array.from({ length: 5 }, (_, i) => <div key={"sg" + i} style={{ position: "absolute", left: 40 + i * 246, top: 0, bottom: 62, width: 10, background: "linear-gradient(180deg,#4A536A,#161B2A)", opacity: 0.7 }} />)}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, height: 30, background: "repeating-linear-gradient(45deg,#C8A32E 0 26px,#1A1D22 26px 52px)", opacity: 0.9 }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: "linear-gradient(180deg,#7A8496,#12151F)", boxShadow: "0 10px 26px rgba(0,0,0,0.7)" }} />
          {/* light SPILLING under the rising shutter edge */}
          <div style={{ position: "absolute", left: -40, right: -40, bottom: -46, height: 70, background: "linear-gradient(180deg, rgba(255,240,206,0.95), transparent)", filter: "blur(14px)", mixBlendMode: "screen" }} />
        </div>
      )}
      {/* the white BLAST on frame zero */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 56%, #FFFFFF, #FFE9C0 44%, transparent 78%)", opacity: blast * 0.86, mixBlendMode: "screen", zIndex: 58, pointerEvents: "none" }} />
      {/* the SHOCKWAVE ring + dust blast where the shutter hits its stop */}
      {shockO > 0.02 && <div style={{ position: "absolute", left: 506 - (70 + shockAge * 500), top: 596 - (16 + shockAge * 120), width: 140 + shockAge * 1000, height: 32 + shockAge * 240, borderRadius: "50%", border: "4px solid rgba(255,240,208,0.8)", opacity: shockO * (1 - shockAge * 0.7), filter: "blur(3px)", zIndex: 57, pointerEvents: "none" }} />}
      {blastDust > 0.02 && Array.from({ length: 14 }, (_, i) => {
        const s = seed(i * 7.3 + 2), a = (i / 14) * Math.PI * 2;
        const sp = (60 + s * 220) * shockAge;
        return <div key={"bd" + i} style={{ position: "absolute", left: 506 + Math.cos(a) * sp, top: 606 - Math.abs(Math.sin(a)) * sp * 0.45, width: 22 + s * 46, height: 22 + s * 46, borderRadius: "50%", background: "radial-gradient(circle, rgba(226,230,238,0.55), transparent 70%)", opacity: blastDust * (1 - shockAge), filter: "blur(7px)", zIndex: 57, pointerEvents: "none" }} />;
      })}

      {/* =============== SCREEN-SPACE OVERLAYS =============== */}
      <SceneTag f={lf} text="SPEED SHOP" color={CYAN} x={40} y={214} />
      <Vig o={0.46} />
    </AbsoluteFill>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  // THE SHOWROOM (VIBRANT restyle). Same premium automotive gallery, same story, same camera, same cars,
  // lit like a high end car commercial drenched in BOLD colour gels: an ELECTRIC blue plus MAGENTA set
  // wash on the cool DULL side, a hot NEONORANGE plus NEONGOLD key on the tangerine WINNER, and CYAN
  // accents raking everything. Nothing is static: sweeping showroom beams, spinning turntables, drifting
  // coloured haze, paparazzi flashes on the winner, detailing sparks and light streaks keep it ALIVE past
  // frame 150. Left, roped off and slowly turning: the DULL grey commuter (solve 0). Right, blazing
  // unobstructed under a warm key: the GORGEOUS tangerine supercar (solve 4). The hero (clay) stands
  // BESIDE the dull car; Take One only ever hands him that one. A slow lateral DOLLY drifts off the dull
  // car toward the supercar: the camera makes the comparison. The winner GLISTENS on the "one is better"
  // VO (gold rim halo, specular glint, twinkles, chosen underglow), never a green ring.
  //
  // HIERARCHY PASS. The living showroom behind the set had grown loud enough to compete with the cars.
  // The ONE focal point is THE TWO CARS. So the whole depth is now pushed BACK: the far glass wall and
  // city are dimmed, desaturated and blurred harder; the mid showroom (mezzanine, video wall, reception,
  // display cars, customers) is dimmed, slightly desaturated and softened; the gel bars, streaks, track
  // pools and video wall spill are all knocked down in contrast. Every bit of that detail and ALL of its
  // motion is still there, just clearly SECONDARY. On top of that a DEPTH SCRIM sinks the background
  // further, a FOCUS VIGNETTE crushes the frame edges, and each car sits in its own bright LIGHT POOL
  // with a crisp separation RIM (cool electric on the dull car, warm gold on the winner) so the eye lands
  // on the cars within a split second.
  //
  // PATTERN INTERRUPT (rebuilt, was a jerky wrecking ball swing). Now a GIANT BALL FALLS STRAIGHT DOWN
  // FROM THE SKY. It enters at the top of frame and accelerates down on a smooth eased-in fall with a
  // motion-blurred speed streak, then LANDS on the dull grey car with a heavy SQUASH, a bright explosion
  // FLASH, expanding SHOCKWAVE rings and a ground dust ring. The grey car SHATTERS: shards and panels arc
  // outward with rotation under gravity and SETTLE on the floor, plus bolts, glass, smoke and a crushed
  // remnant heap. Every part of the motion is eased, nothing snaps. The tangerine winner glistens on
  // untouched beside it.

  // ---- CAMERA: lateral dolly (left dull car to right supercar) plus a gentle push. Runs past frame 150. ----
  const cam  = interpolate(lf, [0, 180], [1.0, 1.045], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camX = interpolate(lf, [0, 175], [250, -270], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camY = interpolate(lf, [0, 175], [14, -16],  { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // ---- animated lighting (breathing colour, cinematic) ----
  const keyBreath  = 0.42 + Math.sin(lf / 13) * 0.06;      // the warm KEY over the winner breathes
  const fillBreath = 0.30 + Math.sin(lf / 17) * 0.04;      // the cool FILL over the dull car
  const superAccent = 0.62 + Math.sin(lf / 9) * 0.14;      // hot tangerine key on the winner
  const dullRim    = 0.30 + Math.sin(lf / 15) * 0.07;      // a cool ELECTRIC rim so the dull car is never dead
  const spinR      = Math.sin(lf / 40) * 16;               // supercar yaw on its turntable
  const spinL      = Math.sin(lf / 50 + 1) * 10;           // dull car yaw on its turntable
  const sheen      = (lf % 128) / 128;                     // a slow specular sweep grazing the winner backlight
  const handGes    = Math.sin(lf / 15) * 8;                // Take One offers the dull car

  // ---- VIBRANT colour gels + MOTION drivers ----
  const gelBlue = 0.30 + Math.sin(lf / 18) * 0.12;         // the ELECTRIC wash pulses
  const gelMag  = 0.28 + Math.sin(lf / 22 + 1) * 0.11;     // the MAGENTA wash pulses
  const gelWarm = 0.30 + Math.sin(lf / 12 + 2) * 0.12;     // the hot winner wash pulses
  const sweepBlue = Math.sin(lf / 33) * 250;               // an ELECTRIC beam raking across the set
  const sweepMag  = Math.sin(lf / 27 + 1.6) * 220;         // a MAGENTA beam raking the other way
  const sweepTilt = Math.sin(lf / 40) * 7;                 // the beams tilt as they sweep
  const streak1 = ((lf * 3.4) % 1500) - 250;               // a coloured light streak drifting right
  const streak2 = 1260 - (((lf * 2.7) % 1500) - 250);      // a coloured light streak drifting left
  const signPulse = 0.55 + Math.sin(lf / 7) * 0.45;        // pulsing signage
  const signPulse2 = 0.55 + Math.sin(lf / 9 + 2) * 0.45;
  // paparazzi camera FLASHES popping on the winner (adds pops of motion + a shutter beat)
  const flCyc  = lf % 47;  const flash  = flCyc  < 4 ? Math.pow(1 - flCyc  / 4, 1.6) : 0;
  const flCyc2 = (lf + 23) % 61; const flash2 = flCyc2 < 4 ? Math.pow(1 - flCyc2 / 4, 1.6) : 0;

  // ---- "ONE IS BETTER" CHOSEN MOMENT drivers (VO second half). The tangerine winner GLISTENS. ----
  const chosen     = over(lf, 72, 20, Easing.inOut(Easing.cubic));
  const chosenOut  = interpolate(lf, [118, 150], [1, 0.84], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chosenAmt  = chosen * chosenOut;                                                             // master strength
  const chosenPulse = chosen * (0.5 + 0.5 * Math.sin((lf - 72) / 7));                                // a breathing pulse
  const chosenLift = -chosenAmt * (7 + Math.sin((lf - 72) / 8) * 3);                                 // a soft float / lift
  const chosenScale = 1 + chosenAmt * (0.03 + Math.sin((lf - 72) / 8) * 0.012);                      // a subtle scale pulse
  const haloBloom  = chosenAmt * (0.6 + 0.4 * Math.abs(Math.sin((lf - 72) / 9)));                    // the warm GOLD rim halo
  const glintSweep = ((lf - 72) * 5.4) % 150;                                                        // a specular GLINT sweep
  const glintOn    = chosen > 0.04 ? 1 : 0;

  // ---- BACKGROUND DEPTH motion drivers (all still alive at f150, just graded SECONDARY now) ----
  const bgPar1 = -camX * 0.42;                             // far glass wall parallax (moves LEAST)
  const bgPar2 = -camX * 0.20;                             // mid structures parallax
  const wallSheen = ((lf * 2.2) % 2420) - 460;             // a reflection sliding along the glass curtain wall
  const trackA  = Math.sin(lf / 31) * 210;                 // a ceiling track spotlight pool sweeping the back wall
  const trackB  = Math.sin(lf / 24 + 2.2) * 180;           // a second track pool sweeping the other way
  const trackTilt = Math.sin(lf / 34) * 5;
  const vidA = 0.5 + Math.sin(lf / 15) * 0.5;              // the video wall cycles colour, channel A
  const vidB = 0.5 + Math.sin(lf / 15 + 2.1) * 0.5;
  const vidC = 0.5 + Math.sin(lf / 15 + 4.2) * 0.5;
  const vidScroll = (lf * 1.4) % 120;                      // a content band scrolling down the video wall
  const mezzGlow = 0.5 + Math.sin(lf / 11) * 0.3;          // the mezzanine accent strip breathes

  // ---- HIERARCHY GRADES: one place to push the depth back so the cars own the frame ----
  const FAR_GRADE = "blur(5.4px) brightness(0.66) saturate(0.62) contrast(0.86)";   // deep bg: dim, soft, desaturated
  const MID_GRADE = "blur(2.1px) brightness(0.72) saturate(0.82) contrast(0.9)";    // mid showroom: clearly secondary

  // ---- geometry: the two cars are the hero elements, rendered BIG ----
  const DULL_X = 250, DULL_TY = 628, DULL_CY = 566;
  const SUP_X  = 772, SUP_TY  = 620, SUP_CY  = 548;

  // ---- PATTERN INTERRUPT: THE GIANT FALLING BALL. Enters from above frame, accelerates down on an
  //      eased-in fall (smooth + weighty), lands at IMPACT, squashes, and stays sunk in the wreckage,
  //      breathing gently so the frame is still alive at f150. ----
  const DROP_START = 72, DROP_DUR = 22, IMPACT = DROP_START + DROP_DUR;   // contact at lf 94
  const BALL_R = 86;
  const impX = DULL_X, impY = DULL_TY - 26;                               // point of contact
  const BALL_TOP = -300, BALL_REST = DULL_CY - 30;                        // starts above frame, rests sunk in the wreck
  // the fall curve, sampled as a function so velocity (for the speed streak + motion blur) is exact
  const ballYAt = (f: number) => BALL_TOP + over(f, DROP_START, DROP_DUR, Easing.in(Easing.quad)) * (BALL_REST - BALL_TOP);
  const sink = over(lf, IMPACT, 14, Easing.out(Easing.cubic)) * 14;       // it settles a touch deeper after landing
  const restBob = over(lf, IMPACT + 10, 12) * Math.sin((lf - IMPACT) / 11) * 2.2;   // a slow living micro settle
  const ballY = ballYAt(lf) + sink + restBob;
  const ballVel = Math.max(0, ballYAt(lf) - ballYAt(lf - 1));             // px per frame, drives blur + streak
  const falling = lf >= DROP_START - 2 && lf < IMPACT;
  const ballBlur = Math.min(9, ballVel * 0.17);                          // motion blur while it screams down
  const streakLen = Math.min(360, ballVel * 6.4);                        // the speed streak trailing above it
  const ballSpin = over(lf, DROP_START, 26, Easing.out(Easing.cubic)) * 34;
  // heavy SQUASH on contact then an eased recovery (nothing snaps)
  const sqIn  = over(lf, IMPACT, 3, Easing.out(Easing.quad));
  const sqOut = over(lf, IMPACT + 3, 13, Easing.inOut(Easing.cubic));
  const sqAmt = Math.max(0, sqIn - sqOut);
  const ballSX = 1 + sqAmt * 0.34, ballSY = 1 - sqAmt * 0.4;
  const ballIn = lf >= DROP_START - 2 ? 1 : 0;                            // the ball only exists once it drops

  // ---- the grey car is CRUSHED FLAT then SHATTERS into pieces ----
  const crush   = over(lf, IMPACT, 4, Easing.out(Easing.quad));           // slammed flat under the ball
  const shatter = over(lf, IMPACT + 2, 5, Easing.out(Easing.cubic));      // the body breaks apart and is gone
  const heap    = over(lf, IMPACT + 3, 16, Easing.out(Easing.cubic));     // a crushed remnant heap settles in
  const shakeAmt = lf >= IMPACT ? Math.max(0, 1 - (lf - IMPACT) / 18) : 0;
  const shakeE = Math.pow(shakeAmt, 1.6);                                 // eased decay, no jerk on the tail
  const shakeX = shakeE * Math.sin((lf - IMPACT) * 2.9) * 13;             // whole-frame impact shake
  const shakeY = shakeE * Math.cos((lf - IMPACT) * 2.3) * 8;
  // ---- PATTERN INTERRUPT (e): the BLAST launches TAKE ONE clean across the screen, tumbling. Comedic. ----
  const t1Fly    = over(lf, IMPACT, 26, Easing.out(Easing.quad));        // his flight starts on contact
  const t1FlyX   = t1Fly * 800;                                          // blasted right, sails off frame
  const t1FlyY   = -440 * Math.sin(t1Fly * Math.PI * 0.9) + t1Fly * 96;  // a ballistic arc: up hard, then down
  const t1FlyRot = t1Fly * 940;                                          // he tumbles end over end
  const t1FlyS   = 1 - t1Fly * 0.26;                                     // shrinks as he sails away
  const t1FlyO   = 1 - over(lf, IMPACT + 19, 7);                         // fades as he leaves the frame
  const carSquashY = 1 - crush * 0.74;
  const carSquashX = 1 + crush * 0.3;
  const spinLdead = spinL * (1 - crush * 0.95);                           // the turntable spin dies on the hit
  const wreckTf = `scale(${carSquashX}, ${carSquashY})`;
  const flashAmt = lf >= IMPACT ? Math.max(0, 1 - (lf - IMPACT) / 9) : 0; // the explosion FLASH
  const flashE = Math.pow(flashAmt, 1.7);

  return (
    <AbsoluteFill>
      {/* everything inside the camera rig dollies + pushes together. The landing shake rides the rig. */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX + shakeX}px, ${camY + shakeY}px)`, transformOrigin: "48% 62%" }}>

        {/* 1 BACKGROUND: a seamless graphite CYCLORAMA (a car-photography sweep). Full bleed WIDE so the
              dolly never uncovers an empty edge. Deep + dim so the COLOUR GELS on top read rich. */}
        <div style={{ position: "absolute", left: -460, top: -120, width: 1960, height: 640, background: `radial-gradient(ellipse 62% 108% at 50% 6%, #232935 0%, #14161C 46%, #0E1015 78%, #07080C 100%)`, zIndex: 1 }} />

        {/* 1a SHOWROOM DEPTH FAR LAYER: the glass curtain wall + a cool city glow seen THROUGH it. All the
              detail + motion kept, but graded WAY back: heavier blur, dimmer, desaturated, lower contrast. */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${bgPar1}px)`, filter: FAR_GRADE, opacity: 0.82, zIndex: 1, pointerEvents: "none" }}>
          {/* the cool night city glow beyond the glass */}
          <div style={{ position: "absolute", left: -460, top: 132, width: 1960, height: 348, background: `linear-gradient(180deg, ${NIGHT2} 0%, #131828 46%, #0A0D18 100%)` }} />
          {/* distant city bokeh, twinkling (kept alive, just softer) */}
          {Array.from({ length: 26 }, (_, i) => {
            const s = seed(i * 3.3 + 1);
            const tw = 0.28 + Math.sin(lf / (5 + s * 5) + i) * 0.22;
            const c = i % 3 === 0 ? CYAN : i % 3 === 1 ? "#8FA2BE" : ELECTRIC;
            return <div key={"bok" + i} style={{ position: "absolute", left: -420 + s * 1880, top: 168 + seed(i * 2.1) * 250, width: 4 + s * 5, height: 4 + s * 5, borderRadius: "50%", background: c, opacity: tw * 0.36, boxShadow: `0 0 8px ${c}` }} />;
          })}
          {/* the glass curtain wall: fine steel mullions + a sliding specular reflection */}
          <div style={{ position: "absolute", left: -460, top: 132, width: 1960, height: 348, background: "repeating-linear-gradient(90deg, rgba(110,128,155,0.06) 0 2px, transparent 2px 116px), repeating-linear-gradient(180deg, rgba(110,128,155,0.05) 0 2px, transparent 2px 120px)" }} />
          <div style={{ position: "absolute", left: wallSheen, top: 132, width: 220, height: 348, background: `linear-gradient(105deg, transparent, ${CYAN}16 46%, rgba(190,210,245,0.09) 52%, transparent)`, mixBlendMode: "screen" }} />
          {/* a faint distant floor band so the far wall meets the ground */}
          <div style={{ position: "absolute", left: -460, top: 452, width: 1960, height: 34, background: "linear-gradient(180deg, rgba(26,34,56,0.5), transparent)" }} />
        </div>

        {/* 1b SHOWROOM DEPTH MID LAYER: mezzanine balcony, a colour cycling VIDEO WALL, a reception desk,
              a receding row of spotlit display cars on TURNING turntables, and grey customers STROLLING.
              Every element + every motion kept, graded down so none of it fights the two hero cars. */}
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${bgPar2}px)`, filter: MID_GRADE, opacity: 0.88, zIndex: 2, pointerEvents: "none" }}>

          {/* the MEZZANINE balcony spanning the back: a steel rail, glass balustrade, a breathing light strip */}
          <div style={{ position: "absolute", left: -200, top: 208, width: 1440, height: 5, background: `linear-gradient(180deg, #464E5C, #2C323A)`, borderRadius: 3, boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: -200, top: 213, width: 1440, height: 34, background: "linear-gradient(180deg, rgba(140,168,198,0.07), rgba(56,74,102,0.03))", borderBottom: "1px solid rgba(140,160,190,0.08)" }} />
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"balu" + i} style={{ position: "absolute", left: -190 + i * 66, top: 213, width: 2, height: 34, background: "rgba(140,160,190,0.09)" }} />
          ))}
          <div style={{ position: "absolute", left: -200, top: 247, width: 1440, height: 3, background: `linear-gradient(90deg, ${ELECTRIC}, ${MAGENTA}, ${CYAN})`, opacity: mezzGlow * 0.6, filter: "blur(1.6px)", boxShadow: `0 0 10px ${MAGENTA}44` }} />

          {/* the VIDEO WALL: still cycling colour + scrolling bands, contrast pulled down so it stops shouting */}
          <div style={{ position: "absolute", left: 356, top: 262, width: 300, height: 150, borderRadius: 6, overflow: "hidden", border: "2px solid rgba(110,128,155,0.24)", boxShadow: "0 8px 30px rgba(0,0,0,0.5)", opacity: 0.7 }}>
            <div style={{ position: "absolute", inset: 0, background: "#0B0F1E" }} />
            <div style={{ position: "absolute", inset: 0, background: MAGENTA, opacity: vidA * 0.42, mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", inset: 0, background: CYAN, opacity: vidB * 0.36, mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", inset: 0, background: NEONORANGE, opacity: vidC * 0.3, mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: 0, top: vidScroll - 60, width: 300, height: 26, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.28), transparent)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: 0, top: vidScroll + 60, width: 300, height: 20, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)", mixBlendMode: "screen" }} />
            {/* a stylised wordmark so it reads as branded content playing */}
            <div style={{ position: "absolute", left: 40, top: 62, width: 220, height: 10, borderRadius: 3, background: "rgba(230,238,250,0.5)" }} />
            <div style={{ position: "absolute", left: 90, top: 82, width: 120, height: 6, borderRadius: 3, background: "rgba(230,238,250,0.34)" }} />
          </div>
          {/* the video wall spilling colour onto the wall around it (softened) */}
          <div style={{ position: "absolute", left: 316, top: 232, width: 380, height: 220, borderRadius: 40, background: `radial-gradient(ellipse, ${MAGENTA}, transparent 66%)`, opacity: vidA * 0.16, filter: "blur(26px)", mixBlendMode: "screen" }} />

          {/* the RECEPTION desk back-right: a curved counter with an illuminated pulsing front + a logo glow */}
          <div style={{ position: "absolute", left: 726, top: 402, width: 250, height: 58, opacity: 0.85 }}>
            <div style={{ position: "absolute", left: 0, top: 10, width: 250, height: 44, borderRadius: "60px 60px 8px 8px / 40px 40px 8px 8px", background: "linear-gradient(180deg, #232935, #14171F)", border: "1px solid rgba(140,160,190,0.09)", boxShadow: "0 8px 20px rgba(0,0,0,0.55)" }} />
            <div style={{ position: "absolute", left: 20, top: 30, width: 210, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${CYAN}, ${ELECTRIC})`, opacity: 0.22 + Math.sin(lf / 13) * 0.12, filter: "blur(1.6px)" }} />
            <div style={{ position: "absolute", left: 96, top: -6, width: 60, height: 22, borderRadius: 4, background: `radial-gradient(ellipse, ${KEY}, transparent 70%)`, opacity: 0.26 + Math.sin(lf / 10) * 0.12 }} />
          </div>

          {/* a receding ROW of spotlit display cars on slowly TURNING turntables. Kept turning, but dimmed
                and de-rimmed so they never compete with the two hero cars up front. */}
          {[
            { x: 150, y: 402, s: 0.9, tint: CYAN, spd: 2.0, ph: 0 },
            { x: 486, y: 372, s: 0.66, tint: MAGENTA, spd: 2.6, ph: 1.4 },
            { x: 884, y: 388, s: 0.82, tint: NEONORANGE, spd: 2.3, ph: 3.1 },
          ].map((c, i) => {
            const spot = 0.24 + Math.sin(lf / 12 + c.ph) * 0.1;
            return (
              <div key={"depcar" + i} style={{ position: "absolute", left: c.x - 90 * c.s, top: c.y - 60 * c.s, width: 180 * c.s, height: 90 * c.s, opacity: 0.6 - i * 0.05 }}>
                {/* overhead spot pool on the display */}
                <div style={{ position: "absolute", left: 10 * c.s, top: -30 * c.s, width: 160 * c.s, height: 96 * c.s, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 0%, ${c.tint}, transparent 62%)`, opacity: spot, filter: "blur(10px)", mixBlendMode: "screen" }} />
                {/* the turntable disc with a rotating specular sweep */}
                <div style={{ position: "absolute", left: 6 * c.s, top: 52 * c.s, width: 168 * c.s, height: 40 * c.s, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, #2E353E, #14171B)", border: "1px solid rgba(160,172,190,0.09)", boxShadow: "0 6px 14px rgba(0,0,0,0.5)" }} />
                <div style={{ position: "absolute", left: 14 * c.s, top: 54 * c.s, width: 152 * c.s, height: 34 * c.s, borderRadius: "50%", background: `conic-gradient(from ${lf * c.spd}deg, transparent, ${c.tint}55 14%, transparent 32%, rgba(255,255,255,0.09) 56%, transparent 74%)`, opacity: 0.45, mixBlendMode: "screen" }} />
                {/* the display car silhouette (soft, low contrast rim) */}
                <svg width={180 * c.s} height={70 * c.s} viewBox="0 0 100 46" style={{ position: "absolute", left: 0, top: 8 * c.s, overflow: "visible" }}>
                  <path d="M6 34 Q8 29 15 28 L26 21 Q32 15 46 15 L64 15 Q75 15 82 24 L91 28 Q95 30 95 34 L95 37 Q95 39 91 39 L10 39 Q6 39 6 37 Z" fill="#1A1E25" stroke={c.tint} strokeWidth={1.2} strokeOpacity={0.34} />
                  <path d="M28 21 L44 21 L44 15 Q34 15 28 21 Z" fill={c.tint} fillOpacity={0.1} />
                  <circle cx="28" cy="39" r="6.5" fill="#0A0C10" stroke={c.tint} strokeWidth={1} strokeOpacity={0.24} />
                  <circle cx="74" cy="39" r="6.5" fill="#0A0C10" stroke={c.tint} strokeWidth={1} strokeOpacity={0.24} />
                </svg>
              </div>
            );
          })}

          {/* grey CUSTOMERS strolling the showroom floor (looping walk + a gentle bob), mixed directions */}
          {[
            { spd: 0.9, off: 0, feet: 466, h: 84, dir: 1 },
            { spd: 1.3, off: 500, feet: 470, h: 92, dir: -1 },
            { spd: 0.7, off: 950, feet: 462, h: 78, dir: 1 },
            { spd: 1.1, off: 1300, feet: 468, h: 88, dir: -1 },
          ].map((p, i) => {
            const raw = (lf * p.spd + p.off) % 1500;
            const x = raw - 120;
            const bob = Math.sin(lf / 6 + i * 1.7) * 2;
            return (
              <div key={"cust" + i} style={{ position: "absolute", left: x, top: p.feet - p.h - bob, width: p.h * 0.32, height: p.h, transform: `scaleX(${p.dir})`, opacity: 0.3 }}>
                <div style={{ position: "absolute", left: "28%", top: 0, width: "44%", height: p.h * 0.2, borderRadius: "50%", background: "linear-gradient(180deg, #333A45, #1D2129)" }} />
                <div style={{ position: "absolute", left: "10%", top: p.h * 0.17, width: "80%", height: p.h * 0.86, background: "linear-gradient(180deg, #2B313A, #15181E)", borderRadius: "40% 40% 12% 12% / 22% 22% 8% 8%" }} />
              </div>
            );
          })}
        </div>

        {/* 1c ceiling TRACK-LIGHTS still sweeping the back wall, dimmed so they read as ambience not event */}
        <div style={{ position: "absolute", left: 300 + trackA, top: 236, width: 300, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 30%, ${CYAN}, transparent 64%)`, opacity: 0.11, filter: "blur(24px)", transform: `rotate(${trackTilt}deg)`, zIndex: 4, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: 520 + trackB, top: 260, width: 280, height: 140, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 30%, ${MAGENTA}, transparent 64%)`, opacity: 0.1, filter: "blur(24px)", transform: `rotate(${-trackTilt}deg)`, zIndex: 4, pointerEvents: "none", mixBlendMode: "screen" }} />

        {/* 1c2 DEPTH SCRIM: a graded haze sheet dropped IN FRONT of the whole showroom depth. It sinks the
              background another notch and lifts the two cars off it (atmospheric perspective), without
              killing a single moving element behind it. */}
        <div style={{ position: "absolute", left: -460, top: -120, width: 1960, height: 720, background: "linear-gradient(180deg, rgba(8,10,17,0.58) 0%, rgba(9,11,18,0.42) 58%, rgba(6,8,13,0.5) 100%)", zIndex: 4, pointerEvents: "none" }} />

        {/* 1d VIBRANT GEL WASHES: bold saturated colour thrown across the set so it reads COLOURFUL. Now
              biased toward the two cars (tighter, hotter over the podiums) and pulled back over the depth. */}
        <GelWash x={DULL_X - 40} y={210} w={1080} h={780} color={ELECTRIC} o={gelBlue * 0.72} z={2} blur={78} />
        <GelWash x={470} y={110} w={1000} h={640} color={MAGENTA} o={gelMag * 0.6} z={2} blur={76} />
        <GelWash x={SUP_X + 30} y={300} w={840} h={720} color={NEONORANGE} o={gelWarm + chosenAmt * 0.12} z={5} blur={64} />
        <GelWash x={SUP_X - 10} y={210} w={520} h={520} color={NEONGOLD} o={0.20 + Math.sin(lf / 10) * 0.06 + chosenAmt * 0.14} z={5} blur={58} />
        <GelWash x={120} y={640} w={640} h={420} color={CYAN} o={0.13 + Math.sin(lf / 16 + 1) * 0.04} z={5} blur={62} />

        {/* 1e SWEEPING SHOWROOM BEAMS: still raking across the set so light constantly moves over the cars,
              but lower contrast now that they are not the focal point. */}
        <GelBar x={80 + sweepBlue} y={250} w={640} h={130} color={ELECTRIC} o={0.19} rot={-15 + sweepTilt} z={5} />
        <GelBar x={320 - sweepMag} y={330} w={620} h={120} color={MAGENTA} o={0.16} rot={13 - sweepTilt} z={5} />
        <GelBar x={520 + sweepBlue * 0.6} y={470} w={560} h={90} color={CYAN} o={0.13} rot={-6 + sweepTilt * 0.5} z={5} />

        {/* 1f DRIFTING LIGHT STREAKS gliding across the upper wall (constant lateral motion, softened) */}
        <div style={{ position: "absolute", left: streak1, top: 200, width: 300, height: 6, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, filter: "blur(8px)", opacity: 0.26, mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: streak2, top: 168, width: 260, height: 5, background: `linear-gradient(90deg, transparent, ${HOTPINK}, transparent)`, filter: "blur(8px)", opacity: 0.22, mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />

        {/* a soft warm KEY bloom high over the winner side + a cool FILL bloom over the dull side */}
        <div style={{ position: "absolute", left: SUP_X - 470, top: -80, width: 940, height: 500, background: `radial-gradient(ellipse at 50% 20%, ${KEY}22, transparent 62%)`, filter: "blur(24px)", opacity: keyBreath + 0.3, zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: DULL_X - 420, top: -40, width: 840, height: 440, background: `radial-gradient(ellipse at 50% 22%, ${FILL}1E, transparent 64%)`, filter: "blur(22px)", opacity: fillBreath + 0.26, zIndex: 5, pointerEvents: "none" }} />

        {/* 2 OVERHEAD RIG: a brushed-steel ceiling truss with drop rods, draped power cables, two hung
              SOFTBOXES (cool over the dull car, warm over the winner) and PULSING accent strips. */}
        <div style={{ position: "absolute", left: -60, top: 96, width: 1140, height: 20, background: `linear-gradient(180deg, #3E4550 0%, #2E343C 42%, #1A1D22 100%)`, borderRadius: 3, boxShadow: "0 6px 16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09)", zIndex: 7 }} />
        <div style={{ position: "absolute", left: -60, top: 112, width: 1140, height: 8, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 40px, transparent 40px 80px)", zIndex: 7 }} />
        <Neon x={40} y={104} w={430} h={5} color={CYAN} on={signPulse * 0.6} z={7} />
        <Neon x={560} y={104} w={430} h={5} color={MAGENTA} on={signPulse2 * 0.6} z={7} />
        {[DULL_X, SUP_X].map((cx, i) => (
          <React.Fragment key={"rod" + i}>
            <div style={{ position: "absolute", left: cx - 2, top: 116, width: 4, height: 44, background: `linear-gradient(180deg, ${STEEL}, #14161B)`, zIndex: 6 }} />
            <div style={{ position: "absolute", left: cx - 74, top: 116, width: 4, height: 40, background: `linear-gradient(180deg, ${STEEL}, #14161B)`, transform: "rotate(-5deg)", transformOrigin: "50% 0", zIndex: 6 }} />
            <div style={{ position: "absolute", left: cx + 70, top: 116, width: 4, height: 40, background: `linear-gradient(180deg, ${STEEL}, #14161B)`, transform: "rotate(5deg)", transformOrigin: "50% 0", zIndex: 6 }} />
          </React.Fragment>
        ))}
        {/* draped power cables sagging between the drop points */}
        <svg width={1012} height={120} viewBox="0 0 1012 120" style={{ position: "absolute", left: 0, top: 116, overflow: "visible", zIndex: 6 }}>
          <path d={`M 40 6 Q ${DULL_X} ${46 + Math.sin(lf / 22) * 3} ${DULL_X + 120} 10`} fill="none" stroke="#0C0E12" strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${DULL_X + 120} 10 Q 512 ${52 + Math.sin(lf / 20 + 1) * 3} ${SUP_X - 120} 10`} fill="none" stroke="#0C0E12" strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${SUP_X - 120} 10 Q ${SUP_X} ${44 + Math.sin(lf / 24 + 2) * 3} 980 6`} fill="none" stroke="#0C0E12" strokeWidth={4} strokeLinecap="round" />
        </svg>
        <SoftBox x={DULL_X - 78} y={150} w={156} h={92} color="#CFE2FF" o={0.72} z={7} />
        <SoftBox x={SUP_X - 86} y={146} w={172} h={100} color="#FFE7C2" o={0.95 + chosenAmt * 0.1} z={7} />

        {/* 3 the two studio light CONES from the softboxes, vividly gelled and aimed HARD at the cars, so
              the brightest light in frame is the light standing on the two heroes. */}
        <StudioLight x={DULL_X} y={250} w={360} h={420} color={ELECTRIC} o={fillBreath * 1.05} z={6} />
        <StudioLight x={SUP_X}  y={220} w={440} h={520} color={KEY}  o={keyBreath + 0.08 + chosenAmt * 0.14} z={6} />
        <div style={{ position: "absolute", left: DULL_X - 150, top: 236, width: 300, height: 380, background: `linear-gradient(180deg, ${ELECTRIC}4A, transparent 88%)`, clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)", filter: "blur(7px)", opacity: fillBreath + 0.3, mixBlendMode: "screen", zIndex: 6, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: SUP_X - 190, top: 232, width: 380, height: 420, background: `linear-gradient(180deg, ${KEY}52, ${NEONORANGE}2A 60%, transparent 92%)`, clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)", filter: "blur(7px)", opacity: keyBreath + 0.34, mixBlendMode: "screen", zIndex: 6, pointerEvents: "none" }} />
        {/* dust drifting down each beam (dust in the light), tinted to the beam colour */}
        {[{ cx: DULL_X, sd: 1, warm: 0 }, { cx: SUP_X, sd: 9, warm: 1 }].map((beam) => (
          Array.from({ length: 10 }, (_, i) => {
            const s = seed(i * 4.1 + beam.sd);
            const life = (lf * (0.4 + s * 0.5) + s * 300) % 260;
            const p = life / 260;
            return <div key={"mote" + beam.sd + i} style={{ position: "absolute", left: beam.cx + (s - 0.5) * (70 + p * 130), top: 210 + p * 380, width: 2.5, height: 2.5, borderRadius: "50%", background: beam.warm ? "#FFE9C6" : "#BFE4FF", opacity: (1 - p) * 0.55, boxShadow: beam.warm ? "0 0 5px #FFE1AE" : `0 0 5px ${CYAN}`, zIndex: 12, pointerEvents: "none" }} />;
          })
        ))}

        {/* 3b DRIFTING COLOURED HAZE rising over each side (constant volumetric motion) */}
        <Haze lf={lf} x={DULL_X - 150} y={360} w={340} h={280} n={5} o={0.2} color={ELECTRIC} />
        <Haze lf={lf + 20} x={SUP_X - 160} y={340} w={360} h={300} n={6} o={0.24} color={NEONORANGE} sd={4} />

        {/* 4 the glossy black studio FLOOR: a mirror deck catching the COLOURED gels as raking reflections. */}
        <div style={{ position: "absolute", left: -460, top: 470, width: 1960, height: 3, background: "linear-gradient(90deg, transparent, rgba(180,190,205,0.2), transparent)", opacity: 0.7, zIndex: 3 }} />
        <div style={{ position: "absolute", left: -460, top: 466, width: 1960, height: 40, background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)", zIndex: 3 }} />
        <div style={{ position: "absolute", left: -460, top: 472, width: 1960, height: 500, background: "linear-gradient(180deg, #121419 0%, #0A0C0F 52%, #050608 100%)", zIndex: 3 }} />
        {/* the coloured gels reflecting down the wet floor, brightest directly under each hero car */}
        <div style={{ position: "absolute", left: DULL_X - 300, top: 474, width: 620, height: 260, background: `radial-gradient(ellipse 46% 130% at 50% 0%, ${ELECTRIC}, transparent 60%)`, opacity: gelBlue * 0.5, filter: "blur(24px)", mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: SUP_X - 320, top: 474, width: 680, height: 280, background: `radial-gradient(ellipse 46% 130% at 50% 0%, ${NEONORANGE}, transparent 60%)`, opacity: gelWarm * 0.62 + chosenAmt * 0.18, filter: "blur(24px)", mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: SUP_X - 360, top: 474, width: 720, height: 240, background: `radial-gradient(ellipse at 50% 0%, ${KEY}18, transparent 66%)`, opacity: keyBreath, zIndex: 5, pointerEvents: "none" }} />
        {/* a MAGENTA sheen streaking across the floor with the beam sweep */}
        <div style={{ position: "absolute", left: 200 + sweepMag, top: 560, width: 420, height: 40, background: `linear-gradient(90deg, transparent, ${MAGENTA}, transparent)`, filter: "blur(22px)", opacity: 0.17, mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        {/* faint machined STEEL floor guide lines + a warning stripe marking the aisle */}
        {[540, 620, 706].map((yy, i) => (
          <div key={"fl" + i} style={{ position: "absolute", left: -460, top: yy, width: 1960, height: 1, background: "rgba(150,165,185,0.04)", zIndex: 5 }} />
        ))}
        <div style={{ position: "absolute", left: 430, top: 726, width: 152, height: 12, background: "repeating-linear-gradient(45deg, #8A701F 0 12px, #101216 12px 24px)", opacity: 0.34, borderRadius: 2, transform: "scaleY(0.7)", zIndex: 5 }} />
        {/* brushed-steel inlaid floor medallions under each display */}
        {[{ x: DULL_X, r: 168 }, { x: SUP_X, r: 196 }].map((m, i) => (
          <div key={"med" + i} style={{ position: "absolute", left: m.x - m.r, top: DULL_TY + 66, width: m.r * 2, height: m.r * 0.5, borderRadius: "50%", border: "2px solid rgba(180,190,205,0.1)", boxShadow: "inset 0 0 24px rgba(0,0,0,0.5)", transform: "scaleY(0.9)", zIndex: 5 }} />
        ))}

        {/* 4z FOCUS VIGNETTE: a big soft darkening that crushes the frame edges and leaves two bright
              windows exactly where the cars stand. Sits above all the background, below the cars. */}
        <div style={{ position: "absolute", left: -460, top: -160, width: 1960, height: 1000, background: "radial-gradient(ellipse 44% 46% at 26% 60%, rgba(0,0,0,0) 0%, rgba(3,4,8,0.5) 62%, rgba(2,3,6,0.82) 100%)", zIndex: 9, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -460, top: -160, width: 1960, height: 1000, background: "radial-gradient(ellipse 42% 44% at 76% 56%, rgba(0,0,0,0) 0%, rgba(3,4,8,0.34) 60%, rgba(2,3,6,0.62) 100%)", zIndex: 9, pointerEvents: "none", mixBlendMode: "multiply" }} />

        {/* 4z2 HERO LIGHT POOLS: a clean pool of light on the floor under each car so each one sits in its
              own stage. Cool + moderate under the dull car, hot + bright under the tangerine winner. */}
        <div style={{ position: "absolute", left: DULL_X - 250, top: DULL_TY - 82, width: 500, height: 210, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, rgba(190,220,255,0.34), ${ELECTRIC}33 42%, transparent 72%)`, filter: "blur(20px)", opacity: (0.7 + fillBreath * 0.5) * (1 - crush * 0.45), zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 290, top: SUP_TY - 96, width: 580, height: 240, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, rgba(255,240,214,0.6), ${NEONORANGE}44 40%, transparent 72%)`, filter: "blur(20px)", opacity: 0.86 + keyBreath * 0.4 + chosenAmt * 0.2, zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />

        {/* 5 the two TURNTABLES: brushed-steel podium discs with a chrome rim, machined grooves, a contact
              shadow, and a rotating SPECULAR sweep tinted to each side colour so the machinery TURNS. */}
        {[
          { x: DULL_X, y: DULL_TY, rw: 210, sweep: lf * 2.2 * (1 - crush * 0.95), tint: ELECTRIC },
          { x: SUP_X,  y: SUP_TY,  rw: 244, sweep: lf * 2.8, tint: NEONORANGE },
        ].map((p, i) => (
          <div key={"pod" + i} style={{ position: "absolute", left: p.x - p.rw, top: p.y - p.rw * 0.28, width: p.rw * 2, height: p.rw * 0.56, zIndex: 11 }}>
            {/* contact / ambient-occlusion shadow the disc sits in */}
            <div style={{ position: "absolute", left: p.rw * 0.06, top: p.rw * 0.16, width: p.rw * 1.88, height: p.rw * 0.5, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)", filter: "blur(8px)" }} />
            {/* the brushed steel top */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 34%, #40474F 0%, ${STEEL} 40%, #191C21 100%)`, border: "3px solid", borderColor: CHROME, boxShadow: "0 10px 26px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.12)" }} />
            {/* the rotating specular sweep (a coloured machined sheen turning with the disc) */}
            <div style={{ position: "absolute", left: p.rw * 0.12, top: p.rw * 0.06, width: p.rw * 1.76, height: p.rw * 0.44, borderRadius: "50%", background: `conic-gradient(from ${p.sweep}deg, transparent, ${p.tint}88 12%, transparent 30%, rgba(255,240,215,0.22) 54%, transparent 72%)`, opacity: 0.8, mixBlendMode: "screen" }} />
            {/* machined concentric grooves */}
            {[0.72, 0.5, 0.3].map((k, j) => (
              <div key={j} style={{ position: "absolute", left: p.rw * (1 - k), top: p.rw * 0.28 * (1 - k) + p.rw * 0.02, width: p.rw * 2 * k, height: p.rw * 0.56 * k, borderRadius: "50%", border: "1px solid rgba(200,210,224,0.10)" }} />
            ))}
            {/* a coloured contact glow from that podium's gel */}
            <div style={{ position: "absolute", left: p.rw * 0.3, top: p.rw * 0.12, width: p.rw * 1.4, height: p.rw * 0.34, borderRadius: "50%", background: `radial-gradient(ellipse, ${p.tint}44, transparent 66%)`, opacity: 0.7, mixBlendMode: "screen" }} />
          </div>
        ))}

        {/* 6 VELVET ROPE stanchions roping off each display: CHROME posts with a deep burgundy velvet rope,
              the chrome catching a CYAN gel kick. */}
        <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, zIndex: 16, pointerEvents: "none", overflow: "visible" }}>
          <path d="M 120 560 Q 256 622 392 560" fill="none" stroke="#2A0E18" strokeWidth={10} strokeLinecap="round" opacity={0.95} />
          <path d="M 120 560 Q 256 622 392 560" fill="none" stroke="#5E1B2E" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
          <path d="M 120 560 Q 256 622 392 560" fill="none" stroke="#7E3348" strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
          <path d="M 636 560 Q 774 622 912 560" fill="none" stroke="#2A0E18" strokeWidth={10} strokeLinecap="round" opacity={0.95} />
          <path d="M 636 560 Q 774 622 912 560" fill="none" stroke="#5E1B2E" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
          <path d="M 636 560 Q 774 622 912 560" fill="none" stroke="#7E3348" strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        </svg>
        {[120, 392, 636, 912].map((px, i) => (
          <div key={"post" + i} style={{ position: "absolute", left: px - 6, top: 548, zIndex: 17 }}>
            <div style={{ position: "absolute", left: -6, top: -16, width: 24, height: 24, borderRadius: "50%", background: `radial-gradient(circle at 36% 28%, #F4F7FB, ${CHROME} 46%, #6C737D 100%)`, boxShadow: `0 3px 8px rgba(0,0,0,0.5), 0 0 8px ${CYAN}55` }} />
            <div style={{ position: "absolute", left: 0, top: 6, width: 12, height: 156, background: `linear-gradient(90deg, #6C737D, ${CHROME} 46%, #F2F5F9 60%, #6C737D)`, borderRadius: 3, boxShadow: "0 0 6px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: -12, top: 158, width: 36, height: 13, borderRadius: "50%", background: "radial-gradient(ellipse, #5A616B, #23272C)", transform: "scaleY(0.6)", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }} />
          </div>
        ))}

        {/* 7 THE DULL CAR (left): FOCAL POINT ONE. A grey commuter (solve 0), BIG on its turntable, slowly
              turning under a cool ELECTRIC key, sharp and clearly foreground against the softened depth.
              A crisp ELECTRIC separation RIM traces its silhouette so it lifts off the background.
              At IMPACT the falling ball slams it flat (carSquash) and it SHATTERS away (shatter). */}
        <div style={{ position: "absolute", left: DULL_X - 186, top: DULL_CY - 128, width: 372, height: 210, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, transparent 40%, ${ELECTRIC}88 56%, transparent 74%)`, opacity: (0.55 + dullRim * 0.6) * (1 - crush), filter: "blur(9px)", zIndex: 19, pointerEvents: "none", mixBlendMode: "screen" }} />
        <CastShadow x={DULL_X} y={DULL_TY - 2} w={244} o={0.5} />
        <div style={{ position: "absolute", left: DULL_X - 200, top: DULL_CY - 172, width: 400, height: 220, perspective: 1200, zIndex: 20, transform: wreckTf, transformOrigin: "50% 100%", opacity: 1 - shatter, filter: `drop-shadow(0 0 10px ${ELECTRIC}55) drop-shadow(0 10px 18px rgba(0,0,0,0.75))` }}>
          <div style={{ position: "absolute", inset: 0, transform: `rotateY(${spinLdead}deg)`, transformStyle: "preserve-3d" }}>
            <Car x={200} y={172} s={1.62} solve={0} build={1} glow={dullRim * 0.5} reflect={0.32} z={20} />
          </div>
        </div>

        {/* 7b THE CRUSHED REMNANT HEAP: what is left of the grey car once it shatters, a low dark crumpled
              mass of buckled panels under the ball. Eases in, then just sits there sooty and dead. */}
        {heap > 0 && (
          <div style={{ position: "absolute", left: DULL_X - 150, top: DULL_TY - 66, width: 300, height: 80, zIndex: 20, pointerEvents: "none", opacity: heap, transform: `scaleY(${0.55 + heap * 0.45})`, transformOrigin: "50% 100%" }}>
            <svg width={300} height={80} viewBox="0 0 300 80" style={{ overflow: "visible" }}>
              <path d="M 22 70 Q 46 40 92 44 Q 128 24 176 40 Q 226 34 256 62 Q 274 70 280 74 L 16 74 Z" fill="#1A1D23" stroke="#2E343C" strokeWidth={2} />
              <path d="M 60 56 L 96 46 L 122 58 L 158 44 L 196 58 L 232 50" fill="none" stroke="#0B0D11" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
              <path d="M 78 66 L 104 58 M 140 64 L 162 54 M 200 66 L 222 56" stroke="rgba(180,196,220,0.24)" strokeWidth={1.4} strokeLinecap="round" />
            </svg>
            {/* a few glass shards glinting in the heap */}
            {Array.from({ length: 6 }, (_, i) => {
              const sd = seed(i * 8.7 + 4);
              return <div key={"gl" + i} style={{ position: "absolute", left: 44 + sd * 200, top: 48 + seed(i * 2.2) * 20, width: 3, height: 3, background: "rgba(206,224,246,0.8)", transform: `rotate(${sd * 90}deg)`, boxShadow: "0 0 4px rgba(200,224,255,0.6)", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 9 + i)) }} />;
            })}
          </div>
        )}

        {/* 7c SHATTER: the grey car breaking into PIECES. Panels and shards arc outward with rotation under
              gravity, then SETTLE on the floor and stop (landing time solved per shard so nothing snaps). */}
        {lf >= IMPACT && Array.from({ length: 22 }, (_, i) => {
          const sd = seed(i * 5.7 + 3), sd2 = seed(i * 2.9 + 8), sd3 = seed(i * 1.7 + 15);
          const ang = -Math.PI * (0.12 + sd * 0.76);                 // fan up and outward
          const spd = 210 + sd2 * 430;                                // px per second
          const vx = Math.cos(ang) * spd, vy = Math.sin(ang) * spd;
          const G = 1500;                                             // gravity px per second squared
          const landY = DULL_TY + 4 + sd3 * 44;                       // each piece settles at its own spot
          const tLand = (-vy + Math.sqrt(vy * vy + 2 * G * (landY - impY))) / G;
          const tt = Math.min((lf - IMPACT) / 30, tLand);             // freeze exactly on touchdown
          const settled = (lf - IMPACT) / 30 >= tLand;
          const x = impX + vx * tt;
          const y = impY + vy * tt + 0.5 * G * tt * tt;
          const isPanel = i % 4 === 0, isBolt = i % 4 === 1;
          const w = isPanel ? 22 + sd2 * 30 : isBolt ? 11 + sd * 6 : 5 + sd2 * 9;
          const h = isPanel ? 10 + sd * 16 : isBolt ? 5 : 5 + sd * 8;
          const spinRate = (140 + sd * 460) * (sd2 > 0.5 ? 1 : -1);
          const wobble = settled ? Math.sin((lf - IMPACT) / 3) * 3 * Math.max(0, 1 - ((lf - IMPACT) / 30 - tLand) * 5) : 0;
          const rot = spinRate * tt + wobble;
          return (
            <div key={"shard" + i} style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, background: isBolt ? "linear-gradient(90deg, #C4CBD6, #626973)" : isPanel ? "linear-gradient(140deg, #7C848F, #2B3038 68%, #14171C)" : "linear-gradient(135deg, #9AA3AE, #30353D)", borderRadius: isPanel ? 3 : isBolt ? 2 : 1, transform: `rotate(${rot}deg)`, boxShadow: settled ? "0 3px 6px rgba(0,0,0,0.7)" : `0 2px 5px rgba(0,0,0,0.6), 0 0 6px ${ELECTRIC}33`, zIndex: 27, pointerEvents: "none" }} />
          );
        })}

        {/* 7d GLASS SPRAY: fine bright shards spat out on the hit, they fly further and fade */}
        {lf >= IMPACT && Array.from({ length: 14 }, (_, i) => {
          const sd = seed(i * 3.1 + 21), sd2 = seed(i * 6.7 + 2);
          const t = (lf - IMPACT) / (18 + sd * 14);
          if (t > 1) return null;
          const ang = -Math.PI * (0.1 + sd * 0.8);
          const spd = 300 + sd2 * 340;
          const x = impX + Math.cos(ang) * spd * t;
          const y = impY + Math.sin(ang) * spd * t + 300 * t * t;
          return <div key={"gs" + i} style={{ position: "absolute", left: x, top: y, width: 3, height: 3, background: "rgba(222,238,255,0.95)", boxShadow: "0 0 6px rgba(190,225,255,0.9)", transform: `rotate(${(lf - IMPACT) * 22}deg)`, opacity: (1 - t) * 0.95, zIndex: 28, pointerEvents: "none" }} />;
        })}

        {/* 7e SMOKE boiling up off the wreck (lingers, still rising at f150) */}
        {lf >= IMPACT && Array.from({ length: 11 }, (_, i) => {
          const sd = seed(i * 4.3 + 11);
          const life = ((lf - IMPACT) * (0.6 + sd * 0.5) + sd * 120) % 150;
          const p = life / 150;
          const rise = p * (160 + sd * 100);
          const spread = (sd - 0.5) * 100 * p;
          const sz = 44 + sd * 66 + p * 130;
          return (
            <div key={"smk" + i} style={{ position: "absolute", left: impX - sz / 2 + spread + Math.sin(lf / 9 + i) * 8, top: impY - rise - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, rgba(58,62,70,${0.5 * (1 - p)}), rgba(28,31,36,${0.32 * (1 - p)}) 55%, transparent 72%)`, filter: "blur(8px)", opacity: heap * (1 - p) * 0.9, zIndex: 29, pointerEvents: "none" }} />
          );
        })}
        {/* a low ground DUST ring rolling outward along the floor */}
        {lf >= IMPACT && [0, 1].map((k) => {
          const t = over(lf, IMPACT + k * 5, 34, Easing.out(Easing.cubic));
          if (t <= 0 || t >= 1) return null;
          const w = 200 + t * (620 + k * 120);
          return <div key={"dust" + k} style={{ position: "absolute", left: impX - w / 2, top: DULL_TY - 14 - w * 0.09, width: w, height: w * 0.2, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(84,90,102,0.34), transparent 68%)", filter: "blur(11px)", opacity: (1 - t) * 0.75, zIndex: 26, pointerEvents: "none" }} />;
        })}

        {/* 7f THE GIANT FALLING BALL: it drops in from ABOVE the top of frame on an accelerating eased fall,
              with a motion-blurred SPEED STREAK behind it, SQUASHES hard on contact, then sits sunk in the
              wreckage breathing gently. No chain, no swing: straight down out of the sky. */}
        {ballIn > 0 && (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 30, pointerEvents: "none" }}>
            {/* the speed streak: a long blurred smear trailing straight up from the ball while it falls */}
            {falling && streakLen > 8 && (
              <div style={{ position: "absolute", left: impX - BALL_R * 0.5, top: ballY - streakLen, width: BALL_R, height: streakLen, background: "linear-gradient(180deg, transparent, rgba(150,162,180,0.42) 62%, rgba(196,206,222,0.6))", filter: "blur(9px)", borderRadius: BALL_R }} />
            )}
            {falling && streakLen > 8 && (
              <div style={{ position: "absolute", left: impX - 5, top: ballY - streakLen * 1.15, width: 10, height: streakLen * 1.15, background: "linear-gradient(180deg, transparent, rgba(226,236,250,0.6))", filter: "blur(3px)", borderRadius: 6, opacity: 0.7 }} />
            )}
            {/* the ball itself: heavy cast iron, studded, blurred by its own speed, squashing on the hit */}
            <div style={{ position: "absolute", left: impX - BALL_R, top: ballY - BALL_R, width: BALL_R * 2, height: BALL_R * 2, filter: `blur(${ballBlur}px)`, transform: `scale(${ballSX}, ${ballSY}) rotate(${ballSpin}deg)`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 34% 26%, #A6AFBB 0%, #4E555F 38%, #23272C 72%, #0C0E11 100%)", boxShadow: "0 16px 40px rgba(0,0,0,0.7), inset -10px -14px 28px rgba(0,0,0,0.65), inset 8px 8px 18px rgba(255,255,255,0.2)" }} />
              <div style={{ position: "absolute", left: "24%", top: "18%", width: "28%", height: "22%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.72), transparent 70%)" }} />
              {/* a cool rim kick so the ball separates from the dark set */}
              <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: `2px solid ${CYAN}`, opacity: 0.28, filter: "blur(2px)" }} />
              {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <div key={"stud" + i} style={{ position: "absolute", left: `${50 + Math.cos(a) * 31}%`, top: `${50 + Math.sin(a) * 31}%`, width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #8A929D, #14171B)" }} />; })}
            </div>
          </div>
        )}

        {/* 7g IMPACT: a bright explosion FLASH plus expanding SHOCKWAVE rings, all eased outward */}
        {flashE > 0 && (
          <>
            <div style={{ position: "absolute", left: impX - 240, top: impY - 240, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.98), rgba(255,226,170,0.6) 26%, rgba(255,146,54,0.28) 46%, transparent 70%)", opacity: flashE, filter: "blur(5px)", zIndex: 32, pointerEvents: "none", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: -460, top: -160, width: 1960, height: 1100, background: "rgba(255,246,226,1)", opacity: flashE * 0.3, zIndex: 33, pointerEvents: "none", mixBlendMode: "screen" }} />
          </>
        )}
        {lf >= IMPACT && [0, 1, 2].map((k) => {
          const t = over(lf, IMPACT + k * 4, 26 + k * 8, Easing.out(Easing.cubic));
          if (t <= 0 || t >= 1) return null;
          const w = 120 + t * (700 + k * 160);
          return (
            <div key={"shock" + k} style={{ position: "absolute", left: impX - w / 2, top: impY - w * 0.19, width: w, height: w * 0.38, borderRadius: "50%", border: `${Math.max(1, 7 - t * 6)}px solid ${k === 1 ? NEONGOLD : "rgba(228,242,255,0.95)"}`, opacity: (1 - t) * 0.8, filter: `blur(${1.5 + t * 4}px)`, zIndex: 32, pointerEvents: "none", mixBlendMode: "screen" }} />
          );
        })}
        {lf >= IMPACT && <Sparks lf={lf} x={impX} y={impY} on={Math.max(0, 1 - (lf - IMPACT) / 12)} color={NEONGOLD} n={12} z={32} />}

        {/* 8 THE HERO (clay): stands beside the dull car, gazing left at it, unaware of the winner. */}
        <div style={{ position: "absolute", left: 350, top: 494, width: 176, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${HERO}88, transparent 62%)`, opacity: 0.5, filter: "blur(11px)", zIndex: 19, pointerEvents: "none" }} />
        <CastShadow x={404} y={676} w={140} o={0.44} />
        <div style={{ position: "absolute", left: 344, top: 516, zIndex: 26, filter: `drop-shadow(0 0 3px ${KEY}) drop-shadow(0 6px 12px rgba(0,0,0,0.7))` }}>
          <Mascot lf={lf} size={122} tint={HERO} capBack={1} gaze={-2} nodAmp={2.4} nodSpeed={12} />
        </div>

        {/* 9 TAKE ONE (grey primer): small, between the hero and the dull car, HANDING OVER the boring one. */}
        <CastShadow x={520} y={674} w={122} o={0.42 * (1 - t1Fly)} />
        <div style={{ position: "absolute", left: 470, top: 524, zIndex: t1Fly > 0.01 ? 60 : 23, opacity: t1FlyO, transform: `translate(${t1FlyX}px, ${t1FlyY}px) rotate(${t1FlyRot}deg) scale(${t1FlyS})`, transformOrigin: "50% 50%" }}>
          <Villain lf={lf} size={110} flag={0} gaze={-2} rim={0.72} nodAmp={1.6} nodSpeed={9} />
          {/* a primer-grey arm offering the dull car leftward */}
          <div style={{ position: "absolute", left: -26 - handGes, top: 60, width: 58, height: 17, background: "linear-gradient(90deg,#5C606B,#868A94)", borderRadius: 9, transform: `rotate(${-10 - handGes * 0.4}deg)`, transformOrigin: "100% 50%", boxShadow: "0 0 2px rgba(240,240,255,0.9), 0 2px 4px rgba(0,0,0,0.7)", zIndex: 3 }} />
        </div>

        {/* 10 THE WINNER (right): FOCAL POINT TWO and the brightest object in the whole frame. The tangerine
               supercar (solve 4), BIG, unobstructed, blazing under a hot key with a warm GOLD separation rim
               so it cuts clean off the softened depth. Untouched by the ball. */}
        <div style={{ position: "absolute", left: SUP_X - 228, top: SUP_CY - 152, width: 456, height: 300, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, transparent 42%, ${NEONGOLD}77 55%, ${NEONGOLD}00 72%)`, opacity: 0.34 + haloBloom * 0.9, filter: "blur(11px)", transform: `translateY(${chosenLift}px) scale(${1 + chosenPulse * 0.05})`, zIndex: 20, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 210, top: SUP_TY - 8, width: 420, height: 92, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONGOLD}, ${NEONORANGE}88 40%, transparent 70%)`, opacity: chosenAmt * (0.5 + chosenPulse * 0.4), filter: "blur(15px)", zIndex: 19, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 224, top: SUP_CY - 104, width: 448, height: 188, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 50%, ${NEONORANGE}, transparent 62%)`, opacity: superAccent * 0.8 + chosenAmt * 0.15, filter: "blur(19px)", zIndex: 19, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 190, top: SUP_CY + 30, width: 380, height: 64, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONGOLD}, transparent 64%)`, opacity: superAccent * 0.6, filter: "blur(12px)", zIndex: 19, pointerEvents: "none", mixBlendMode: "screen" }} />
        <CastShadow x={SUP_X} y={SUP_TY} w={292} o={0.56} />
        <div style={{ position: "absolute", left: SUP_X - 220, top: SUP_CY - 186, width: 440, height: 244, perspective: 1200, zIndex: 21, transform: `translateY(${chosenLift}px) scale(${chosenScale})`, transformOrigin: "50% 88%", filter: `drop-shadow(0 0 14px ${NEONORANGE}66) drop-shadow(0 12px 22px rgba(0,0,0,0.75))` }}>
          <div style={{ position: "absolute", inset: 0, transform: `rotateY(${spinR}deg)`, transformStyle: "preserve-3d" }}>
            <Car x={220} y={186} s={1.92} solve={4} build={1} glow={Math.min(1, superAccent + chosenAmt * 0.3)} reflect={0.5} z={21} />
          </div>
        </div>
        {/* 10c "CHOSEN" SPECULAR GLINT sweeping across the winner's paint (clipped to the car body). */}
        {glintOn > 0 && (
          <div style={{ position: "absolute", left: SUP_X - 150, top: SUP_CY - 100 + chosenLift, width: 300, height: 160, overflow: "hidden", borderRadius: "48% 48% 30% 30%", zIndex: 22, pointerEvents: "none", opacity: chosenAmt }}>
            <div style={{ position: "absolute", left: glintSweep - 72, top: -34, width: 56, height: 230, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), rgba(255,238,205,0.65), transparent)", filter: "blur(5px)", transform: "rotate(18deg)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: glintSweep - 44, top: -34, width: 14, height: 230, background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)", filter: "blur(1.5px)", transform: "rotate(18deg)", mixBlendMode: "screen" }} />
          </div>
        )}
        {/* 10d "CHOSEN" SPARKLE / TWINKLE BURST popping on the winner's surface (4-point star glints). */}
        {glintOn > 0 && Array.from({ length: 7 }, (_, i) => {
          const sd = seed(i * 7.3 + 2);
          const cyc = (lf - 72 + i * 9) % 32;
          const life = cyc / 32;
          const tw = (life < 0.5 ? life * 2 : (1 - life) * 2) * chosenAmt;
          const tx = SUP_X - 118 + sd * 244;
          const ty = SUP_CY - 76 + seed(i * 3.7 + 5) * 128 + chosenLift;
          const sz = 5 + sd * 5;
          return (
            <div key={"twk" + i} style={{ position: "absolute", left: tx, top: ty, width: sz, height: sz, transform: `scale(${0.4 + tw})`, opacity: tw, zIndex: 23, pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, #FFFFFF, rgba(255,225,170,0.7) 40%, transparent 72%)", boxShadow: `0 0 8px ${NEONGOLD}` }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: sz * 3.4, height: 1.4, transform: "translate(-50%,-50%)", background: `linear-gradient(90deg, transparent, #FFF6DA, transparent)`, mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 1.4, height: sz * 3.4, transform: "translate(-50%,-50%)", background: `linear-gradient(180deg, transparent, #FFF6DA, transparent)`, mixBlendMode: "screen" }} />
            </div>
          );
        })}
        <Sparks lf={lf} x={SUP_X - 82} y={SUP_CY + 6} on={0.9 + chosenAmt * 0.6} color={NEONGOLD} n={8} z={22} />
        <Sparks lf={lf + 7} x={SUP_X + 60} y={SUP_CY - 6} on={0.7 + chosenAmt * 0.6} color={NEONORANGE} n={5} z={22} />

        {/* 10e PAPARAZZI CAMERA FLASHES popping on the winner (the hero car is being photographed) */}
        <div style={{ position: "absolute", left: SUP_X - 260, top: SUP_CY - 150, width: 520, height: 340, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,0.9), transparent 60%)", opacity: flash * 0.5, filter: "blur(8px)", zIndex: 22, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X + 150, top: 300, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, #FFFFFF, transparent 62%)", opacity: flash * 0.85, filter: "blur(2px)", zIndex: 23, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: SUP_X - 220, top: 360, width: 54, height: 54, borderRadius: "50%", background: "radial-gradient(circle, #FFFFFF, transparent 62%)", opacity: flash2 * 0.85, filter: "blur(2px)", zIndex: 23, pointerEvents: "none" }} />

        {/* 11 WINNER BACKLIGHT (no glass box): a warm KEY column rising BEHIND the supercar with a slow
               specular sweep, plus a MAGENTA kicker behind it for premium colour contrast. */}
        <div style={{ position: "absolute", left: SUP_X - 156, top: 300, width: 312, height: 372, background: `radial-gradient(ellipse at 50% 42%, ${KEY}2E, transparent 70%)`, filter: "blur(28px)", opacity: keyBreath + 0.34 + chosenAmt * 0.16, zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 210, top: 316, width: 180, height: 320, background: `radial-gradient(ellipse at 50% 42%, ${MAGENTA}, transparent 68%)`, filter: "blur(30px)", opacity: gelMag * 0.5, zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 100, top: 322, width: 200, height: 300, background: `linear-gradient(180deg, ${RIM}33, ${NEONORANGE}30 46%, transparent 92%)`, filter: "blur(19px)", opacity: superAccent * 0.7, zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: SUP_X - 72, top: 320 + sheen * 210 - 44, width: 144, height: 74, background: "linear-gradient(180deg, transparent, rgba(255,240,215,0.24), transparent)", filter: "blur(11px)", opacity: 0.7, zIndex: 10, pointerEvents: "none", mixBlendMode: "screen" }} />

        {/* 12 SPEC PLAQUES on machined easels (shapes only, no digits). Left: a muted brushed-steel plate.
               Right: a premium plate with an etched star + a warm backlight. Kept low key on purpose. */}
        <div style={{ position: "absolute", left: 92, top: 636, zIndex: 18, opacity: 0.8 }}>
          <div style={{ position: "absolute", left: 6, top: 8, width: 4, height: 74, background: "#2A2E34", transform: "rotate(-13deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 54, top: 8, width: 4, height: 74, background: "#2A2E34", transform: "rotate(13deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 0, top: -4, width: 66, height: 46, borderRadius: 4, background: "linear-gradient(160deg, #2C3037, #1B1E23)", border: `1.5px solid ${STEEL}`, boxShadow: `0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 8px ${ELECTRIC}33` }}>
            <div style={{ position: "absolute", left: 8, top: 7, width: 20, height: 7, borderRadius: 2, background: "rgba(170,182,198,0.4)" }} />
            <div style={{ position: "absolute", left: 8, top: 21, width: 50, height: 3, borderRadius: 2, background: "rgba(140,152,168,0.28)" }} />
            <div style={{ position: "absolute", left: 8, top: 30, width: 38, height: 3, borderRadius: 2, background: "rgba(140,152,168,0.28)" }} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 936, top: 632, zIndex: 18 }}>
          <div style={{ position: "absolute", left: -12, top: -20, width: 92, height: 84, borderRadius: 10, background: `radial-gradient(ellipse at 50% 40%, ${KEY}22, transparent 66%)`, filter: "blur(8px)", opacity: keyBreath + chosenAmt * 0.2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 6, top: 8, width: 4, height: 78, background: "#3A3324", transform: "rotate(-13deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 56, top: 8, width: 4, height: 78, background: "#3A3324", transform: "rotate(13deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 0, top: -6, width: 68, height: 50, borderRadius: 4, background: "linear-gradient(160deg, #2E2A1E, #1C1810)", border: `1.5px solid ${AMBER}`, boxShadow: `0 4px 14px rgba(0,0,0,0.5), 0 0 12px ${NEONGOLD}66` }}>
            <svg width={68} height={50} viewBox="0 0 68 50" style={{ position: "absolute", inset: 0 }}>
              <path d="M 15 12 L 17.6 18.2 L 24 18.6 L 19 22.8 L 20.6 29 L 15 25.4 L 9.4 29 L 11 22.8 L 6 18.6 L 12.4 18.2 Z" fill={GOLD} opacity={0.95} />
            </svg>
            <div style={{ position: "absolute", left: 28, top: 12, width: 32, height: 6, borderRadius: 2, background: GOLD, opacity: 0.8 }} />
            <div style={{ position: "absolute", left: 8, top: 30, width: 52, height: 3, borderRadius: 2, background: "rgba(190,160,90,0.5)" }} />
            <div style={{ position: "absolute", left: 8, top: 38, width: 40, height: 3, borderRadius: 2, background: "rgba(190,160,90,0.5)" }} />
          </div>
        </div>

        {/* 13 FOREGROUND OCCLUDERS (dark, out of focus): a near CHROME stanchion each side, a carbon fibre
               floor panel, and a burgundy velvet rope swagging across the very front. Darkened so the
               frame edges fall away and the two cars sit in the only bright zone. */}
        <div style={{ position: "absolute", left: -8, top: 452, width: 30, height: 360, background: `linear-gradient(90deg, #191C21, #7E858F 48%, #191C21)`, borderRadius: 6, filter: "blur(4px) brightness(0.7)", opacity: 0.94, zIndex: 40 }}>
          <div style={{ position: "absolute", left: -8, top: -18, width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle at 36% 28%, #D6DCE4, #8A919B 50%, #383E46)`, filter: "blur(2px)", boxShadow: `0 0 10px ${ELECTRIC}44` }} />
        </div>
        <div style={{ position: "absolute", left: 988, top: 452, width: 30, height: 360, background: `linear-gradient(90deg, #191C21, #7E858F 48%, #191C21)`, borderRadius: 6, filter: "blur(4px) brightness(0.7)", opacity: 0.94, zIndex: 40 }}>
          <div style={{ position: "absolute", left: -8, top: -18, width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle at 36% 28%, #D6DCE4, #8A919B 50%, #383E46)`, filter: "blur(2px)", boxShadow: `0 0 10px ${NEONORANGE}44` }} />
        </div>
        {/* a blurred carbon-fibre panel at the very bottom-left foreground (real material) */}
        <div style={{ position: "absolute", left: -40, top: 742, width: 360, height: 80, background: "repeating-linear-gradient(45deg, #141619 0 6px, #090A0D 6px 12px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0 6px, transparent 6px 12px)", filter: "blur(3px)", opacity: 0.92, zIndex: 41 }} />
        <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", left: 0, top: 0, zIndex: 40, pointerEvents: "none", overflow: "visible", filter: "blur(4px) brightness(0.8)" }}>
          <path d="M 12 700 Q 506 812 1000 700" fill="none" stroke="#160710" strokeWidth={20} strokeLinecap="round" opacity={0.94} />
          <path d="M 12 700 Q 506 812 1000 700" fill="none" stroke="#43121F" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
          <path d="M 12 700 Q 506 812 1000 700" fill="none" stroke="#5E2333" strokeWidth={2.5} strokeLinecap="round" opacity={0.5} />
        </svg>
      </div>

      {/* corner label (fixed, does not dolly) + a deeper vignette that keeps the eye on the two cars */}
      <SceneTag f={lf} text="SAME JOB. TWO ANSWERS." color={AMBER} x={40} y={214} />
      <Vig o={0.5} />
    </AbsoluteFill>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  // ============================ S2 THE LOCKUP (defends) ============================
  // SAME setting (a premium collector's DETAILING LOCKUP), SAME camera (slow over the shoulder push in,
  // still travelling at f104), SAME story: the one dull grey car sits RAISED on a lift under the key
  // light, mid frame, a SMALL grey robot (Take One) stands on its roof palm out "it is done", and re
  // ask pings loft up from the hoist hook and BOUNCE off his palm instead of improving the car. He
  // defends, never rebuilds. All prior bug fixes kept: grey stays grey (the un improved copy), the
  // small robot stands BESIDE/ON the car (not the biggest object), the engine hoist carries the depth,
  // nothing is clipped by an edge.
  // ⭐ ACTION + COLOUR PASS (kept): a hard SPOTLIGHT racks onto the car, a TEAL/CYAN scan bar sweeps DOWN
  // over it, a repeating defensive SHIELD ring pulses out, an amber/black SECURITY BARRIER slams down with
  // an impact flash, and the SHIP IT stamp PUNCHES in with a golden glow.
  // ⭐ BACKGROUND ENRICH PASS (kept): three receding animated layers (FAR dirty city window, MID racking /
  // pegboard / vent / fan / fluorescent, NEAR swinging work lamp, chains, cables) all alive at f104.
  // ⭐⭐ HIERARCHY PASS (this pass). The enriched background had climbed to the same brightness as the car,
  // so the eye had nowhere to land. Now there is ONE unmistakable focal point: the defended grey car on the
  // lift. (a) every set layer is knocked down about 30% and the deep layers are blurred + desaturated with
  // distance (FAR blurs hardest and loses the most colour, MID less, NEAR least), and the busy detail
  // (gels, signage, embers, shutter, fluorescent) has its contrast pulled in. (b) a DEPTH SCRIM sits above
  // the whole set and below the car: it dims and desaturates everything outward from a clean hole punched
  // right over the car, and doubles as an edge vignette. (c) the car gets a real focal treatment: a bright
  // stage LIGHT POOL under it, a warm halo behind it, hotter white RIM separation, and a contrast +
  // saturation lift applied to the chassis itself so it is the brightest, sharpest, most saturated thing in
  // frame. The background keeps ALL of its detail and ALL of its motion, it is just clearly secondary.

  // ---- CAMERA: slow over the shoulder PUSH IN, still travelling at frame 104 (cut mid motion) ----
  const cam = interpolate(lf, [0, 104], [1.05, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const camX = interpolate(lf, [0, 104], [26, -10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const camY = interpolate(lf, [0, 104], [10, -6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // subject geometry: the grey car RAISED on the lift, centred + BIG (the lit hero); a small robot on top
  const carX = 512, carY = 572, carS = 2.1;
  const roofY = carY + (-142 + 46) * carS;                 // top of the cabin roof in screen space
  const deckTop = 556;                                     // the lift deck the wheels rest on
  const villSize = 122, villLeft = carX - villSize / 2, villTop = roofY - 0.905 * villSize;   // robot, feet ON the roof
  const carNudge = Math.max(0, Math.sin(lf / 17)) * 5;     // he offers the SAME car forward, then withholds it

  // grade settle: the key lamp + softbox warm up, the car's rim rises, over ~10f then holds + breathes
  const warm = over(lf, 0, 10);
  const lampSwing = Math.sin(lf / 18) * 5.4 + Math.sin(lf / 7) * 1.2;   // the caged inspection lamp swings HARDER now
  const lampFlick = (0.86 + seed(Math.floor(lf / 5)) * 0.14) * (0.9 + warm * 0.1);
  const coolFill = 0.55 + Math.sin(lf / 26) * 0.1;         // the cool steel FILL from the left, steady
  const guardSway = Math.sin(lf / 20) * 2;                 // Take One rocks a touch as he guards

  // ---- HIERARCHY drivers: ONE knob pushes the whole set back, another pushes the hero forward ----
  const BGD = 0.68;                                        // background brightness multiplier (about 32% down)
  const farFx = "blur(3.4px) saturate(0.58) brightness(0.6)";    // deepest layer: softest + greyest
  const midFx = "blur(1.9px) saturate(0.74) brightness(0.7)";    // mid set dressing
  const nearFx = "blur(1.05px) saturate(0.86) brightness(0.8)";  // near frame, almost sharp
  const heroPool = 0.9 + 0.1 * Math.sin(lf / 12);          // the hero stage pool breathes (never static)
  const heroRim = 0.86 + 0.14 * Math.sin(lf / 9 + 1.2);    // the white separation rim breathes

  // ---- VIBRANT MOTION drivers (all lf based, still alive at f104), now clearly SECONDARY ----
  const gelA = (0.52 + 0.18 * Math.sin(lf / 13)) * BGD;    // ELECTRIC blue back wall wash, breathing
  const gelB = (0.46 + 0.18 * Math.sin(lf / 17 + 1.6)) * BGD;   // MAGENTA right wash, counter phase
  const gelC = (0.34 + 0.16 * Math.sin(lf / 11 + 3.1)) * BGD;   // AZURE cool halo high behind the car
  const scanX = interpolate((lf % 84) / 84, [0, 1], [-320, 1140]);   // a CYAN scan bar rakes across the set
  const scanRot = -14 + Math.sin(lf / 23) * 7;             // and tilts as it sweeps
  const coneSweep = Math.sin(lf / 22) * 40;                // an overhead security cone sweeps the floor
  const shutterRattle = Math.sin(lf / 3.1) * 1.7 + Math.sin(lf / 1.6) * 0.8;   // the steel shutter buzzes
  const fanSpin = lf * 27;                                 // an extractor fan spinning on the wall
  const signPulse = 0.42 + 0.58 * Math.abs(Math.sin(lf / 8));         // the LOCKED LED sign strobes
  const ledPulse = 0.6 + 0.4 * Math.abs(Math.sin(lf / 10));           // the CYAN wall LED strip emits + breathes
  const magRim = 0.4 + 0.5 * ((Math.sin(lf / 15) + 1) / 2);           // the car rim leans hot magenta...
  const eleRim = 0.4 + 0.5 * ((Math.sin(lf / 15 + Math.PI) + 1) / 2); // ...then cool electric, opposite

  // ---- STAGED ACTION timeline (scene-local frames 0..104), the beat now DOES something ----
  const rack = over(lf, 2, 12);                            // a hard SPOTLIGHT racks onto the car
  const scanSweep = over(lf, 12, 22, Easing.inOut(Easing.cubic));     // a scan/shield bar sweeps DOWN over the car
  const scanAlive = scanSweep > 0.002 && scanSweep < 0.998 ? Math.sin(scanSweep * Math.PI) : 0;
  const scanBarY = interpolate(scanSweep, [0, 1], [roofY - 46, deckTop + 22]);
  const gateDrop = over(lf, 28, 15, Easing.out(Easing.cubic));        // the security BARRIER slams down
  const gateBounce = lf > 43 ? Math.sin((lf - 43) / 3.4) * Math.max(0, 1 - (lf - 43) / 16) * 5 : 0;
  const gateAngle = interpolate(gateDrop, [0, 1], [-62, -3]) + gateBounce;   // up -> horizontal, with a settle bounce
  const gateLand = Math.max(0, 1 - Math.abs(lf - 43) / 7);            // impact flash at touchdown
  const stampVis = over(lf, 50, 4);                        // the SHIP IT stamp PUNCHES in...
  const stampS = interpolate(over(lf, 50, 9, Easing.out(Easing.back(1.8))), [0, 1], [1.95, 1.02]);
  const stampGlow = Math.max(0, 1 - Math.abs(lf - 56) / 12);         // ...with a golden glow flash
  const shieldT = ((lf + 6) % 30) / 30;                    // a repeating defensive SHIELD pulse over the car
  const shieldR = 44 + shieldT * 192;
  const shieldO = (1 - shieldT) * 0.5;

  // ---- re ask pings: one is always in flight, lofted from the engine hoist hook (foreground), up
  //      toward Take One's palm where it BOUNCES (spawn every 17f, live 21f) ----
  const pingTimes = [-6, 11, 28, 45, 62, 79, 96];
  const LIVE = 21;
  const pings = pingTimes.map((t) => lf - t).filter((a) => a >= 0 && a < LIVE);
  const hx = 332 + Math.sin(lf / 12) * 2, hy = 452;        // the hoist hook (a gentle chain sway)
  const palmX = 442, palmY = 366;                          // where Take One's small palm intercepts
  let bar = 0.34 + Math.sin(lf / 9) * 0.06;                // defensive palm shimmer baseline
  pings.forEach((a) => { const p = a / LIVE; if (p > 0.7) bar = Math.max(bar, 0.4 + Math.sin(((p - 0.7) / 0.3) * Math.PI) * 0.55); });

  // ---- BACKGROUND drivers (deep grimy lock-up detail, all lf based, still ALIVE at f104) ----
  const bgFan = lf * 5.4;                                                 // a SLOW ceiling fan turning overhead
  const bgLampSwing = Math.sin(lf / 15) * 11 + Math.sin(lf / 6) * 2.4;    // a swinging bare work lamp
  const bgLampGlow = 0.72 + 0.28 * Math.abs(Math.sin(lf / 9));           // its bare bulb breathes
  const fluorFlick = (seed(Math.floor(lf / 3)) > 0.16 ? 1 : 0.42) * (0.78 + 0.22 * Math.abs(Math.sin(lf * 0.8)));  // a flickering fluorescent, contrast pulled in
  const cityPulse = 0.5 + 0.5 * Math.sin(lf / 21);                        // the cold city glow behind the dirty window breathes
  const cityCar = ((lf * 6.4) % 300) - 40;                                // a distant light slides across the window
  const chainSway = Math.sin(lf / 19) * 3.2;                              // hanging chains sway
  const cableBob = Math.sin(lf / 23) * 3;                                 // draped cables bob
  const pegSway = Math.sin(lf / 16);                                      // pegboard tools swing a touch
  const shelfTag = Math.sin(lf / 13) * 6;                                 // a shelf tag swings
  const ventPuff = Math.sin(lf / 17);                                     // vent steam pulse
  // parallax: far layer moves LESS than the camera push, near frame moves a touch MORE (real depth)
  const farPX = -camX * 0.16, farPY = -camY * 0.16;
  const midPX = -camX * 0.05, midPY = -camY * 0.05;
  const nearPX = camX * 0.06, nearPY = camY * 0.06;

  return (
    <AbsoluteFill>
      {/* scene camera wrapper: everything inside pushes in over the shoulder */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY}px)`, transformOrigin: "58% 54%" }}>

        {/* ============ 1  PREMIUM LOCKUP SHELL: a graphite back wall + a GLOSSY sealed concrete floor.
             Still graded warm AMBER right / cool TEAL left, still flooded with saturated gels, but every
             level here is now scaled by BGD so the set reads as the ROOM the hero sits in, not the subject. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 470, background: `radial-gradient(ellipse 84% 98% at 46% 24%, #2A3048 0%, #23293C 40%, #14171B 72%, #101318 100%)`, zIndex: 1 }} />
        <div style={{ position: "absolute", left: 0, top: 452, width: 1012, height: 340, background: "linear-gradient(180deg, #15181E 0%, #0E1014 52%, #08090C 100%)", zIndex: 1 }} />
        {/* the graded PREMIUM key + fill: a warm AMBER wash from the RIGHT, a cool TEAL from the LEFT */}
        <div style={{ position: "absolute", left: 500, top: 110, width: 580, height: 660, background: `radial-gradient(ellipse 82% 82% at 100% 40%, ${AMBER}, transparent 66%)`, opacity: (0.42 + 0.08 * Math.sin(lf / 15)) * BGD, filter: "blur(52px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -140, top: 150, width: 540, height: 660, background: `radial-gradient(ellipse 82% 82% at 0% 46%, ${TEAL}, transparent 64%)`, opacity: (0.36 + 0.08 * Math.sin(lf / 18 + 1)) * BGD, filter: "blur(54px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />
        {/* a soft ambient LIFT so the shot is never crushed to black, now weighted toward the CAR */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: `radial-gradient(ellipse 46% 42% at 50% 52%, ${AMBER}20, transparent 68%)`, mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />
        {/* the vivid GEL washes: ELECTRIC blue across the back wall + MAGENTA down the right, both breathing */}
        <GelWash x={286} y={318} w={780} h={700} color={ELECTRIC} o={gelA} z={2} blur={92} />
        <GelWash x={812} y={430} w={700} h={660} color={MAGENTA} o={gelB} z={2} blur={90} />
        <GelWash x={512} y={244} w={560} h={430} color={AZURE} o={gelC} z={2} blur={84} />
        {/* MAGENTA + PURPLE + ELECTRIC colour pools bleeding UP off the glossy floor and HIGH up the walls */}
        <div style={{ position: "absolute", left: 120, top: 360, width: 500, height: 420, background: `radial-gradient(ellipse 60% 120% at 50% 100%, ${ELECTRIC}, transparent 60%)`, opacity: (0.28 + gelA * 0.2) * BGD, filter: "blur(42px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 500, top: 350, width: 520, height: 430, background: `radial-gradient(ellipse 60% 120% at 50% 100%, ${MAGENTA}, transparent 60%)`, opacity: (0.26 + gelB * 0.2) * BGD, filter: "blur(44px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 320, top: 380, width: 420, height: 400, background: `radial-gradient(ellipse 60% 120% at 50% 100%, ${PURP}, transparent 62%)`, opacity: (0.2 + gelC * 0.2) * BGD, filter: "blur(46px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
        {/* a raking MAGENTA bar up high + the MOVING CYAN scan bar sweeping across the whole set */}
        <GelBar x={-40} y={120} w={780} h={150} color={MAGENTA} o={(0.24 + 0.1 * Math.sin(lf / 19)) * BGD} z={2} rot={-6} />
        <GelBar x={scanX} y={160} w={420} h={520} color={CYAN} o={0.34 * BGD} z={2} rot={scanRot} />
        {/* the soft warm KEY bloom high + the cool steel FILL down the left (premium anchor, kept) */}
        <div style={{ position: "absolute", left: 120, top: -70, width: 820, height: 400, background: `radial-gradient(ellipse at 50% 0%, ${KEY}18, transparent 66%)`, filter: "blur(10px)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -60, top: 210, width: 300, height: 380, background: `radial-gradient(ellipse at 20% 50%, ${COOL}${Math.round(coolFill * 30).toString(16).padStart(2, "0")}, transparent 66%)`, filter: "blur(18px)", zIndex: 2, pointerEvents: "none" }} />
        {/* the wall/floor seam + broad reflective sheen (glossy, not matte) */}
        <div style={{ position: "absolute", left: 0, top: 440, width: 1012, height: 46, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.5))", zIndex: 3 }} />
        {/* a CYAN LED strip running the wall base, still EMITTING, just no longer shouting */}
        <div style={{ position: "absolute", left: 40, top: 445, width: 932, height: 5, borderRadius: 4, background: CYAN, opacity: (0.7 + ledPulse * 0.3) * BGD, boxShadow: `0 0 12px ${CYAN}, 0 0 30px ${CYAN}88`, mixBlendMode: "screen", zIndex: 6, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 40, top: 451, width: 932, height: 60, background: `linear-gradient(180deg, ${CYAN}, transparent 78%)`, opacity: (0.2 + ledPulse * 0.16) * BGD, filter: "blur(12px)", mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 232, top: 452, width: 580, height: 330, background: `radial-gradient(ellipse 60% 120% at 50% 0%, ${KEY}12, transparent 60%)`, zIndex: 3, pointerEvents: "none" }} />
        {[0, 1, 2, 3].map((i) => { const p = (i + 1) / 5; const yy = 452 + Math.pow(p, 1.9) * 340; return <div key={"fl" + i} style={{ position: "absolute", left: 0, top: yy, width: 1012, height: 1, background: "rgba(150,170,190,0.035)", zIndex: 3 }} />; })}

        {/* ============ 1d  DEEP BACKGROUND: three RECEDING lock-up layers behind the hero, ALL of the detail
             and ALL of the motion kept, but each layer now carries a depth FILTER: the further back, the
             more blur, the less colour, the less light. FAR is nearly a grey memory of a room. ============ */}

        {/* ---- FAR LAYER: a grimy back WINDOW onto a cold CITY GLOW, heaviest blur + heaviest desaturation ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${farPX}px, ${farPY}px)`, filter: farFx, zIndex: 4, pointerEvents: "none" }}>
          {/* the cool bloom the window spills onto the surrounding wall */}
          <div style={{ position: "absolute", left: 96, top: 150, width: 292, height: 236, background: `radial-gradient(ellipse, ${AZURE}, transparent 68%)`, opacity: 0.12 + cityPulse * 0.12, filter: "blur(34px)", mixBlendMode: "screen", zIndex: -1 }} />
          {/* the window recess (dark reveal, blurred = far) */}
          <div style={{ position: "absolute", left: 122, top: 176, width: 214, height: 150, borderRadius: 4, background: "linear-gradient(180deg,#0A0F1A,#0C1420)", border: "6px solid #191D24", boxShadow: "inset 0 0 24px rgba(0,0,0,0.8), 0 6px 18px -6px rgba(0,0,0,0.7)", overflow: "hidden" }}>
            {/* cold night sky + distant city glow rising off the horizon */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0B1526 0%, #12233B 52%, #0A1220 100%)" }} />
            <div style={{ position: "absolute", left: 0, bottom: 8, width: "100%", height: 64, background: `linear-gradient(180deg, transparent, ${AZURE}66)`, opacity: 0.5 + cityPulse * 0.3, filter: "blur(6px)", mixBlendMode: "screen" }} />
            {/* distant lit tower blocks (cool silhouettes) with breathing windows */}
            {[{ x: 14, w: 34, h: 96 }, { x: 58, w: 26, h: 120 }, { x: 92, w: 40, h: 78 }, { x: 140, w: 22, h: 104 }, { x: 168, w: 34, h: 88 }].map((b, i) => (
              <div key={"twr" + i} style={{ position: "absolute", left: b.x, top: 150 - b.h, width: b.w, height: b.h, background: "linear-gradient(180deg,#0E1A2C,#0A1420)", opacity: 0.9 }}>
                {Array.from({ length: 6 }, (_, k) => <div key={k} style={{ position: "absolute", left: 3 + (k % 2) * (b.w * 0.5), top: 6 + Math.floor(k / 2) * 16, width: b.w * 0.32, height: 6, background: CYAN, opacity: (0.3 + 0.5 * seed(i * 3 + k)) * (0.5 + cityPulse * 0.5), boxShadow: `0 0 5px ${CYAN}` }} />)}
              </div>
            ))}
            {/* a distant light sliding across the glass (a passing drone / car) */}
            <div style={{ position: "absolute", left: cityCar, top: 70, width: 46, height: 8, borderRadius: 6, background: `linear-gradient(90deg, transparent, ${AZURE}, transparent)`, opacity: 0.7, filter: "blur(2px)", mixBlendMode: "screen" }} />
            {/* grimy glass: muntin cross + grime streaks + a cool reflection sheen */}
            <div style={{ position: "absolute", left: "50%", top: 0, width: 5, height: "100%", background: "#141922", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 5, background: "#141922", transform: "translateY(-50%)" }} />
            {[18, 60, 120, 168].map((gx, i) => <div key={"grm" + i} style={{ position: "absolute", left: gx, top: 0, width: 8 + (i % 2) * 10, height: "100%", background: "linear-gradient(180deg, rgba(180,195,210,0.06), rgba(120,140,160,0.02))", filter: "blur(3px)" }} />)}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(200,220,235,0.10), transparent 46%)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 90%, rgba(20,26,36,0.6), transparent 60%)" }} />
          </div>
        </div>

        {/* ---- MID LAYER: deep steel RACKING (jerry cans, boxes, a tyre), a PEGBOARD of tools, a louvered
             VENT, a SLOW ceiling FAN and a flickering FLUORESCENT tube. Medium blur, medium desaturation. ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${midPX}px, ${midPY}px)`, filter: midFx, zIndex: 6, pointerEvents: "none" }}>
          {/* a flickering FLUORESCENT tube high on the right ceiling, throwing a cool spill */}
          <div style={{ position: "absolute", left: 632, top: 140, width: 188, height: 15, borderRadius: 4, background: "linear-gradient(180deg,#2A2E35,#14161A)", border: "1px solid #0C0E11" }}>
            <div style={{ position: "absolute", left: 5, top: 4, width: 178, height: 7, borderRadius: 4, background: "#DCE8F2", opacity: 0.42 + fluorFlick * 0.38, boxShadow: `0 0 12px ${CYAN}, 0 0 24px ${CYAN}77` }} />
          </div>
          <div style={{ position: "absolute", left: 600, top: 150, width: 250, height: 150, background: `linear-gradient(180deg, ${CYAN}, transparent 72%)`, opacity: 0.04 + fluorFlick * 0.09, filter: "blur(18px)", mixBlendMode: "screen" }} />
          {/* the SLOW ceiling FAN: downrod + two crossed foreshortened blades + a motor hub */}
          <div style={{ position: "absolute", left: 248, top: 120, width: 3, height: 30, background: "linear-gradient(180deg,#3A3F47,#1A1D22)" }} />
          <div style={{ position: "absolute", left: 250, top: 150, width: 0, height: 0, transform: "scaleY(0.44)" }}>
            {[0, 1].map((k) => <div key={"fanb" + k} style={{ position: "absolute", left: -82, top: -8, width: 164, height: 16, borderRadius: 8, background: "linear-gradient(90deg,#20242B,#3A3F47 50%,#20242B)", transform: `rotate(${bgFan + k * 90}deg)`, transformOrigin: "50% 50%", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }} />)}
          </div>
          <div style={{ position: "absolute", left: 240, top: 143, width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #33383F, #101215)", border: "2px solid #0A0C0F" }} />
          {/* STEEL RACKING on the left wall: two uprights, two shelves, a cool edge catch */}
          <div style={{ position: "absolute", left: 112, top: 330, width: 232, height: 126 }}>
            {[0, 220].map((ux, i) => <div key={"up" + i} style={{ position: "absolute", left: ux, top: 0, width: 12, height: 126, background: "linear-gradient(90deg,#14161A,#2E333B 50%,#14161A)", border: "1px solid #0A0C0F" }} />)}
            {[6, 70].map((sy, i) => <div key={"sh" + i} style={{ position: "absolute", left: 0, top: sy, width: 232, height: 12, background: "linear-gradient(180deg,#3A3F47,#1A1D22)", border: "1px solid #0A0C0F", boxShadow: "0 4px 8px -3px rgba(0,0,0,0.7)" }} />)}
            <div style={{ position: "absolute", left: 0, top: 6, width: 232, height: 2, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, opacity: 0.28, boxShadow: `0 0 8px ${CYAN}`, mixBlendMode: "screen" }} />
            {/* TOP shelf load: a red jerry can + a teal jerry can + a stacked cardboard box */}
            <div style={{ position: "absolute", left: 20, top: -30, width: 30, height: 36, borderRadius: "5px 5px 3px 3px", background: "linear-gradient(90deg,#5E1610,#9A2E24 46%,#5E1610)", border: "1px solid #3A0C08" }}>
              <div style={{ position: "absolute", left: 10, top: -6, width: 12, height: 8, borderRadius: 2, background: "#3A0C08" }} />
              <div style={{ position: "absolute", left: -5, top: 6, width: 8, height: 14, borderRadius: 3, border: "2px solid #5E1610", borderRight: "none" }} />
            </div>
            <div style={{ position: "absolute", left: 58, top: -28, width: 28, height: 34, borderRadius: "5px 5px 3px 3px", background: "linear-gradient(90deg,#0C4638,#0F9E8A 46%,#0C4638)", border: "1px solid #06342A", opacity: 0.86 }}>
              <div style={{ position: "absolute", left: 9, top: -6, width: 12, height: 8, borderRadius: 2, background: "#06342A" }} />
            </div>
            <div style={{ position: "absolute", left: 150, top: -34, width: 56, height: 40, background: "linear-gradient(180deg,#8E7452,#6B5537)", border: "1px solid #5A4526" }}>
              <div style={{ position: "absolute", left: 0, top: 16, width: 56, height: 6, background: "rgba(90,69,38,0.7)" }} />
              <div style={{ position: "absolute", left: 24, top: 0, width: 8, height: 40, background: "rgba(255,255,255,0.05)" }} />
            </div>
            {/* BOTTOM shelf load: a small tyre + two boxes (one gel grazed) + a swinging tag */}
            <div style={{ position: "absolute", left: 14, top: 36, width: 44, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, #26221E, #0C0A08 70%)", border: "3px solid #16130F" }}>
              <div style={{ position: "absolute", left: 13, top: 8, width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #838A96, #3A3F47)" }} />
            </div>
            <div style={{ position: "absolute", left: 74, top: 40, width: 52, height: 30, background: "linear-gradient(180deg,#8A7250,#63502F)", border: "1px solid #5A4526" }}>
              <div style={{ position: "absolute", left: 22, top: 0, width: 7, height: 30, background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div style={{ position: "absolute", left: 140, top: 34, width: 66, height: 36, background: "linear-gradient(180deg,#4A4F58,#23262C)", border: "1px solid #0C0E11", borderRadius: 3 }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${MAGENTA}, transparent 60%)`, opacity: 0.1 + gelB * 0.14, mixBlendMode: "screen" }} />
            </div>
            <div style={{ position: "absolute", left: 118 + shelfTag, top: 12, width: 2, height: 20, background: "#5A6068", transformOrigin: "50% 0" }} />
            <div style={{ position: "absolute", left: 112 + shelfTag, top: 30, width: 16, height: 12, borderRadius: 2, background: NEONGOLD, opacity: 0.5 }} />
          </div>
          {/* a wall PEGBOARD with hanging tool silhouettes that swing (in the gap right of the softbox) */}
          <div style={{ position: "absolute", left: 512, top: 300, width: 92, height: 126, background: "linear-gradient(180deg,#241F18,#16130E)", border: "2px solid #0C0A06", borderRadius: 3, boxShadow: "inset 0 0 16px rgba(0,0,0,0.6)" }}>
            {Array.from({ length: 24 }, (_, i) => <div key={"pgh" + i} style={{ position: "absolute", left: 8 + (i % 6) * 14, top: 8 + Math.floor(i / 6) * 28, width: 3, height: 3, borderRadius: "50%", background: "rgba(0,0,0,0.6)" }} />)}
            <div style={{ position: "absolute", left: 20, top: 12, width: 8, height: 60, background: "linear-gradient(180deg,#A6ADB8,#5C626C)", borderRadius: 4, transform: `rotate(${pegSway * 3}deg)`, transformOrigin: "50% 0" }}>
              <div style={{ position: "absolute", left: -3, top: -3, width: 14, height: 10, borderRadius: "50%", border: "3px solid #A6ADB8", background: "transparent" }} />
            </div>
            <div style={{ position: "absolute", left: 54, top: 14, width: 7, height: 52, background: "linear-gradient(180deg,#979DA7,#4C525A)", borderRadius: 3, transform: `rotate(${-pegSway * 3.4}deg)`, transformOrigin: "50% 0" }}>
              <div style={{ position: "absolute", left: -2, top: 40, width: 5, height: 12, background: "#5A6068", transform: "rotate(18deg)" }} />
              <div style={{ position: "absolute", left: 4, top: 40, width: 5, height: 12, background: "#6B717B", transform: "rotate(-18deg)" }} />
            </div>
          </div>
          {/* a louvered wall VENT (steam drifts out of it) above the pegboard */}
          <div style={{ position: "absolute", left: 520, top: 244, width: 74, height: 48, borderRadius: 4, background: "linear-gradient(180deg,#2A2E35,#14161A)", border: "2px solid #0A0C0F", overflow: "hidden" }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={"lv" + i} style={{ position: "absolute", left: 4, top: 5 + i * 8, width: 66, height: 4, borderRadius: 2, background: "linear-gradient(180deg,#4A4F58,#1A1D22)", boxShadow: "0 1px 2px rgba(0,0,0,0.6)" }} />)}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${CYAN}, transparent 70%)`, opacity: 0.1 + ventPuff * 0.06, mixBlendMode: "screen" }} />
          </div>
        </div>
        {/* the VENT steam, a cool haze rising as its own atmospheric layer (softer now) */}
        <Haze lf={lf} x={510} y={150} w={130} h={150} o={0.2} n={5} color={AZURE} sd={11} />

        {/* ---- MOVING SHADOWS: the swinging bare work lamp throws a soft shadow that RAKES across the
             racking + back wall (a dark gradient sliding opposite the swing). Kept, and it now helps: the
             set gets darker while the car does not. ---- */}
        <div style={{ position: "absolute", left: 40 - bgLampSwing * 3, top: 300, width: 300, height: 200, background: "radial-gradient(ellipse at 50% 40%, rgba(4,6,10,0.58), transparent 66%)", filter: "blur(20px)", zIndex: 5, pointerEvents: "none" }} />

        {/* ---- NEAR LAYER: a swinging bare WORK LAMP, hanging CHAINS and draped CABLES, in front of the wall
             furniture but behind the hero (lightest depth filter: nearly sharp, still clearly below the car). ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${nearPX}px, ${nearPY}px)`, filter: nearFx, zIndex: 6, pointerEvents: "none" }}>
          {/* draped cables sagging across the top of the wall, bobbing */}
          {[{ y: 150, w: 260, l: 120 }, { y: 166, w: 300, l: 420 }, { y: 158, w: 240, l: 720 }].map((c, i) => (
            <div key={"cab" + i} style={{ position: "absolute", left: c.l, top: c.y + cableBob * (0.6 + i * 0.2), width: c.w, height: 40, borderBottom: "3px solid #14161A", borderRadius: "0 0 50% 50% / 0 0 100% 100%", opacity: 0.85 }} />
          ))}
          {/* two hanging CHAINS swinging from the ceiling, with a hook link */}
          {[{ x: 352, h: 120 }, { x: 648, h: 96 }].map((ch, i) => (
            <div key={"chn" + i} style={{ position: "absolute", left: ch.x, top: 132, width: 4, height: ch.h, background: "repeating-linear-gradient(180deg,#8A909A 0 4px,#3A3F47 4px 9px)", transformOrigin: "50% 0", transform: `rotate(${chainSway * (i ? -1 : 1)}deg)`, filter: "brightness(0.74)" }}>
              <div style={{ position: "absolute", left: -4, top: ch.h - 4, width: 12, height: 12, borderRadius: "4px 4px 10px 10px", border: "3px solid #8A929E", borderTop: "none", background: "transparent" }} />
            </div>
          ))}
          {/* the swinging bare WORK LAMP: a cord + a bare bulb + a soft warm glow (clearly dimmer than the key) */}
          <div style={{ position: "absolute", left: 372, top: 132, width: 2, height: 118, background: "linear-gradient(180deg,#3A3F47,#1A1D22)", transformOrigin: "50% 0", transform: `rotate(${bgLampSwing * 0.34}deg)` }} />
          <div style={{ position: "absolute", left: 372 + bgLampSwing, top: 246, width: 18, height: 24, borderRadius: "46% 46% 50% 50%", background: "radial-gradient(circle at 42% 34%, #F2E4C2, #A88740)", opacity: bgLampGlow * 0.8, boxShadow: `0 0 14px ${KEY}aa, 0 0 30px ${KEY}55`, border: "2px solid #2A2E35" }} />
          <div style={{ position: "absolute", left: 342 + bgLampSwing, top: 224, width: 78, height: 78, borderRadius: "50%", background: `radial-gradient(circle, ${KEY}, transparent 68%)`, opacity: 0.1 + bgLampGlow * 0.1, filter: "blur(12px)", mixBlendMode: "screen" }} />
        </div>

        {/* ============ 2  BRUSHED STEEL WALL: tall brushed panels + a bolt row + an overhead conduit run,
             flattened in contrast so the panel seams stop competing with the car's edges. ============ */}
        {[80, 300, 520, 740, 960].map((x, i) => (
          <div key={"pan" + i} style={{ position: "absolute", left: x, top: 150, width: 214, height: 300, background: `linear-gradient(100deg, #1A1D22 0%, #22262C 22%, #17191E 40%, #1F2228 62%, #15171B 100%)`, borderLeft: "1px solid rgba(0,0,0,0.4)", borderRight: "1px solid rgba(200,210,225,0.035)", boxShadow: "inset 0 40px 60px -30px rgba(255,255,255,0.035)", zIndex: 4 }} />
        ))}
        {/* a coloured EDGE catch on the panel seams so even the steel wall carries colour, dialled back */}
        {[80, 300, 520, 740, 960].map((x, i) => (
          <div key={"pnedge" + i} style={{ position: "absolute", left: x, top: 150, width: 3, height: 300, background: `linear-gradient(180deg, transparent, ${i % 2 ? MAGENTA : ELECTRIC}, transparent)`, opacity: (0.3 + (i % 2 ? gelB : gelA) * 0.24) * BGD, filter: "blur(1.6px)", mixBlendMode: "screen", zIndex: 5 }} />
        ))}
        {[150, 448].map((y, r) => Array.from({ length: 9 }, (_, i) => <div key={"blt" + r + i} style={{ position: "absolute", left: 74 + i * 108, top: y + (r ? -8 : 8), width: 6, height: 6, borderRadius: "50%", background: "radial-gradient(circle at 36% 30%, #767D89, #2E333A)", zIndex: 5 }} />))}
        <div style={{ position: "absolute", left: 0, top: 132, width: 1012, height: 5, background: "linear-gradient(180deg, #2A2E34, #14161A)", zIndex: 5 }} />
        <div style={{ position: "absolute", left: 120, top: 128, width: 620, height: 6, borderRadius: 3, background: "linear-gradient(180deg, #23272D, #101215)", boxShadow: "0 3px 5px rgba(0,0,0,0.5)", zIndex: 6 }} />

        {/* ============ 3  A STEEL ROLLER SHUTTER DOOR (right), closed, still RATTLING every frame, gel
             grazed, with a floor rail. Contrast pulled in so its 15 slats stop stripe-flickering the eye. */}
        <div style={{ position: "absolute", left: 812, top: 150, width: 196, height: 300, transform: `translateX(${shutterRattle}px)`, background: "linear-gradient(90deg, #141619 0%, #1D2026 30%, #17191E 100%)", borderLeft: "2px solid #0C0E11", boxShadow: `inset 8px 0 26px -10px ${ELECTRIC}44`, zIndex: 6 }}>
          {Array.from({ length: 15 }, (_, i) => <div key={i} style={{ position: "absolute", left: 4, top: 8 + i * 19 + Math.sin(lf / 3 + i * 0.6) * 0.8, width: 188, height: 15, borderRadius: 3, background: "linear-gradient(180deg, #24272D 0%, #2B2F36 30%, #14171B 100%)", boxShadow: "inset 0 1px 0 rgba(200,210,225,0.04), inset 0 -2px 3px rgba(0,0,0,0.5)" }} />)}
          <div style={{ position: "absolute", left: 70, top: 420 - 152, width: 56, height: 9, borderRadius: 5, background: "linear-gradient(180deg, #8D949F, #4A4F57)", boxShadow: "0 2px 4px rgba(0,0,0,0.6)", zIndex: 2 }} />
        </div>
        {/* the ELECTRIC gel graze raking the shutter face (screen blended, pulsing, secondary) */}
        <div style={{ position: "absolute", left: 800, top: 150, width: 210, height: 300, background: `linear-gradient(90deg, ${ELECTRIC}, transparent 70%)`, opacity: (0.24 + gelA * 0.24) * BGD, filter: "blur(8px)", mixBlendMode: "screen", zIndex: 7, pointerEvents: "none" }} />

        {/* ============ 3b  A COLOURED "LOCKED" LED SIGN above the shutter, still strobing (he keeps it
             sealed), now a supporting accent rather than a second hero. ============ */}
        <div style={{ position: "absolute", left: 828 + shutterRattle * 0.5, top: 118, width: 164, height: 30, borderRadius: 6, background: `linear-gradient(180deg,#26101C,#13070E)`, border: `1.5px solid ${MAGENTA}aa`, boxShadow: `0 0 ${12 + signPulse * 22}px ${MAGENTA}aa, 0 0 ${5 + signPulse * 10}px ${MAGENTA}88 inset`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.82, zIndex: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 17, letterSpacing: 3, fontWeight: 800, color: "#F6D6E6", opacity: 0.7 + signPulse * 0.16, textShadow: `0 0 ${8 + signPulse * 12}px ${MAGENTA}, 0 0 ${3 + signPulse * 6}px ${MAGENTA}` }}>LOCKED</span>
        </div>
        {/* a soft magenta bloom cast by the emitting sign onto the wall around it */}
        <div style={{ position: "absolute", left: 812 + shutterRattle * 0.5, top: 104, width: 200, height: 62, background: `radial-gradient(ellipse, ${MAGENTA}, transparent 66%)`, opacity: (0.18 + signPulse * 0.28) * BGD, filter: "blur(14px)", mixBlendMode: "screen", zIndex: 7, pointerEvents: "none" }} />

        {/* ============ 3c  A SPINNING EXTRACTOR FAN on the upper left wall (constant machinery motion). */}
        <div style={{ position: "absolute", left: 44, top: 176, width: 78, height: 78, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #1D2025, #0A0C0F)", border: "3px solid #292D33", boxShadow: `0 0 12px ${ELECTRIC}33, inset 0 0 12px rgba(0,0,0,0.7)`, overflow: "hidden", zIndex: 6 }}>
          {[0, 1, 2, 3, 4].map((k) => <div key={"fb" + k} style={{ position: "absolute", left: 36, top: 8, width: 6, height: 31, borderRadius: 4, background: "linear-gradient(180deg,#494F57,#1C2025)", transformOrigin: "50% 100%", transform: `rotate(${fanSpin + k * 72}deg)`, opacity: 0.85 }} />)}
          <div style={{ position: "absolute", left: 33, top: 33, width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #A3AAB5, #3E434B)", zIndex: 2 }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from ${fanSpin}deg, transparent, ${CYAN}1A, transparent 40%)`, mixBlendMode: "screen", opacity: 0.4 }} />
        </div>

        {/* ============ 4  MAGNETIC TOOL WALL: brushed strip + swinging chrome spanners, a live GAUGE
             cluster, a coiled AIR HOSE, a WALL CLOCK (spinning hands). All still moving, all toned down so
             the chrome no longer out-sparkles the car. ============ */}
        <div style={{ position: "absolute", left: 640, top: 208, width: 156, height: 14, borderRadius: 4, background: "linear-gradient(180deg, #9AA1AC, #545A63)", boxShadow: "0 3px 6px rgba(0,0,0,0.55)", zIndex: 5 }} />
        {[{ x: 654, h: 74, w: 12, r: 6 }, { x: 686, h: 92, w: 11, r: -4 }, { x: 714, h: 66, w: 13, r: 9 }, { x: 748, h: 82, w: 12, r: -6 }].map((s, i) => (
          <div key={"spn" + i} style={{ position: "absolute", left: s.x, top: 220, width: s.w, height: s.h, background: "linear-gradient(180deg,#B4BAC3,#6C727D)", borderRadius: 5, transform: `rotate(${s.r + Math.sin(lf / (11 + i * 3) + i) * 3.2}deg)`, transformOrigin: "50% 0", boxShadow: `0 3px 6px rgba(0,0,0,0.5)`, zIndex: 6 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: s.w, height: s.w + 3, borderRadius: "50%", border: "3px solid #9CA3AE", background: "transparent" }} />
          </div>
        ))}
        {[664, 726].map((cx, i) => { const gc = i ? MAGENTA : CYAN; return (
          <div key={"gau" + i} style={{ position: "absolute", left: cx, top: 344, width: 48, height: 48, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #1C2026, #0A0C0F)", border: `3px solid #8A919C`, boxShadow: `0 3px 8px rgba(0,0,0,0.6), inset 0 0 8px rgba(0,0,0,0.6), 0 0 10px ${gc}33`, zIndex: 6 }}>
            {Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return <div key={k} style={{ position: "absolute", left: 22 + Math.cos(a) * 17, top: 22 + Math.sin(a) * 17, width: 2, height: 2, borderRadius: 1, background: "rgba(190,200,215,0.45)" }} />; })}
            <div style={{ position: "absolute", left: 22, top: 10, width: 2.5, height: 16, background: gc, opacity: 0.75, transformOrigin: "50% 100%", transform: `rotate(${(-40 + Math.sin(lf / (12 + i * 4) + i) * 44)}deg)`, borderRadius: 2, boxShadow: `0 0 5px ${gc}` }} />
            <div style={{ position: "absolute", left: 20, top: 20, width: 8, height: 8, borderRadius: "50%", background: "#8A919C" }} />
          </div>); })}
        <div style={{ position: "absolute", left: 636, top: 300, width: 30, height: 40, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(90deg,#15181C,#2A2E34,#191C21)", border: "2px solid #0C0E11", zIndex: 5 }} />
        {[0, 1, 2, 3].map((k) => <div key={"hose" + k} style={{ position: "absolute", left: 632 - k, top: 316 + k * 5, width: 40 + k * 6, height: 40 + k * 6, borderRadius: "50%", border: "5px solid #24282E", opacity: 0.75, zIndex: 5 }} />)}
        <div style={{ position: "absolute", left: 908, top: 214, width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #BFC5CE, #8F959F)", border: "3px solid #2F343A", boxShadow: "0 3px 8px rgba(0,0,0,0.55)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: 20, top: 8, width: 2.5, height: 15, background: "#2A2E35", transformOrigin: "50% 100%", transform: `rotate(${lf * 2.2}deg)` }} />
          <div style={{ position: "absolute", left: 20.5, top: 12, width: 2, height: 11, background: "#4A4F58", transformOrigin: "50% 100%", transform: `rotate(${lf * 0.5}deg)` }} />
          <div style={{ position: "absolute", left: 19, top: 19, width: 6, height: 6, borderRadius: "50%", background: "#2A2E35" }} />
        </div>

        {/* ============ 5  A RED FIRE EXTINGUISHER on a bracket + a DIAMOND PLATE wall panel. ============ */}
        <div style={{ position: "absolute", left: 604, top: 300, width: 26, height: 66, borderRadius: "12px 12px 6px 6px", background: "linear-gradient(90deg, #551210 0%, #992C22 40%, #5E1610 100%)", border: "1.5px solid #3A0C08", boxShadow: "0 4px 10px rgba(0,0,0,0.5)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: 6, top: -8, width: 14, height: 10, borderRadius: 3, background: "#14161A" }} />
          <div style={{ position: "absolute", left: 3, top: 26, width: 20, height: 14, borderRadius: 2, background: "rgba(210,210,205,0.6)" }} />
          <div style={{ position: "absolute", left: -6, top: 4, width: 10, height: 4, borderRadius: 2, background: "#6C717A" }} />
        </div>
        <div style={{ position: "absolute", left: 862, top: 344, width: 92, height: 92, borderRadius: 4, background: "#15181C", border: "1px solid #0C0E11", overflow: "hidden", zIndex: 5 }}>
          {Array.from({ length: 16 }, (_, i) => <div key={i} style={{ position: "absolute", left: (i % 4) * 24 + 4, top: Math.floor(i / 4) * 24 + 4, width: 12, height: 12, background: "linear-gradient(135deg, #2E333A, #1A1D22)", transform: "skewX(-18deg)", borderRadius: 1 }} />)}
          {/* a magenta gel graze so even the diamond plate carries the scene colour */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${MAGENTA}, transparent 60%)`, opacity: (0.16 + gelB * 0.2) * BGD, mixBlendMode: "screen" }} />
        </div>

        {/* ============ 6  A HUNG SOFTBOX (a real studio light in shot, the soft KEY) + a cool RIM catch. */}
        <div style={{ position: "absolute", left: 402, top: 118, width: 8, height: 30, background: "linear-gradient(180deg,#3A3F47,#1A1D22)", zIndex: 6 }} />
        <div style={{ transform: `translateY(${warm * 2}px)` }}>
          <SoftBox x={356} y={146} w={150} h={92} color="#F2E7D2" o={(0.5 + warm * 0.42) * 0.72} z={6} />
        </div>
        <div style={{ position: "absolute", left: 336, top: 150, width: 190, height: 160, background: `radial-gradient(ellipse at 50% 0%, ${KEY}18, transparent 64%)`, filter: "blur(12px)", zIndex: 5, pointerEvents: "none" }} />

        {/* ============ 7  A ROLLING TOOL CHEST, a TYRE stack + chrome RIM wheel, two OIL DRUMS, a FLOOR
             JACK, a warning stripe bay outline, bolts + a rag. (kept, premium foreground clutter, dimmed) */}
        {[{ x: 372, w: 12, h: 210 }, { x: 792, w: 12, h: 210 }].map((s, i) => (
          <div key={"ws" + i} style={{ position: "absolute", left: s.x, top: 560, width: s.w, height: s.h, background: "repeating-linear-gradient(135deg, #C9A227 0 10px, #1A1712 10px 20px)", opacity: 0.2, borderRadius: 2, zIndex: 3 }} />
        ))}
        <div style={{ position: "absolute", left: 384, top: 748, width: 396, height: 12, background: "repeating-linear-gradient(135deg, #C9A227 0 10px, #1A1712 10px 20px)", opacity: 0.18, borderRadius: 2, zIndex: 3 }} />
        <div style={{ position: "absolute", left: 292, top: 566, width: 132, height: 138, borderRadius: 6, background: "linear-gradient(100deg, #1B1E23 0%, #262A31 24%, #17191E 46%, #212429 68%, #131519 100%)", border: "2px solid #0C0E11", boxShadow: "0 12px 26px -8px rgba(0,0,0,0.7), inset 0 2px 0 rgba(200,210,225,0.04)", zIndex: 8 }}>
          <div style={{ position: "absolute", left: 0, top: -6, width: 132, height: 10, borderRadius: 3, background: "repeating-linear-gradient(45deg, #14161A 0 4px, #1E2126 4px 8px)", border: "1px solid #0C0E11" }} />
          {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 12, top: 16 + r * 38, width: 108, height: 28, borderRadius: 3, background: "linear-gradient(180deg, rgba(0,0,0,0.34), rgba(0,0,0,0.16))", border: "1px solid rgba(200,210,225,0.04)" }}><div style={{ position: "absolute", left: 40, top: 11, width: 30, height: 6, borderRadius: 3, background: "linear-gradient(90deg,#A9AEB7,#6C727C)" }} /></div>)}
          {/* an electric edge glow along the chest lip so the near clutter reads coloured */}
          <div style={{ position: "absolute", left: 0, top: -6, width: 132, height: 3, background: `linear-gradient(90deg, transparent, ${ELECTRIC}, transparent)`, opacity: (0.4 + gelA * 0.3) * BGD, boxShadow: `0 0 8px ${ELECTRIC}`, mixBlendMode: "screen" }} />
        </div>
        {[0, 1, 2, 3].map((i) => <div key={"ty" + i} style={{ position: "absolute", left: 900, top: 640 - i * 22, width: 94, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 38%, #201D1A, #0A0908 70%)", border: "3px solid #16130F", boxShadow: "inset 0 3px 6px rgba(255,255,255,0.03)", zIndex: 8 }} />)}
        <div style={{ position: "absolute", left: 838, top: 596, width: 74, height: 74, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #23262C, #0C0E11)", border: "6px solid #16130F", transform: "rotate(-8deg)", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.7)", zIndex: 9 }}>
          <div style={{ position: "absolute", left: 12, top: 12, width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #BAC0C9, #62686F)", border: `2px solid #98A0AB` }}>
            {Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * Math.PI * 2; return <div key={k} style={{ position: "absolute", left: 20 + Math.cos(a) * 8, top: 20 + Math.sin(a) * 8, width: 3, height: 3, borderRadius: "50%", background: "#4A4F58" }} />; })}
          </div>
        </div>
        {[{ x: 730 }, { x: 812 }].map((d, i) => (
          <div key={"drum" + i} style={{ position: "absolute", left: d.x, top: 512, width: 74, height: 158, borderRadius: "10px 10px 6px 6px", background: "linear-gradient(90deg, #101215 0%, #2E333A 34%, #3B4048 50%, #212429 74%, #101215 100%)", border: "2px solid #0C0E11", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.7)", zIndex: 7 }}>
            <div style={{ position: "absolute", left: 0, top: 16, width: 74, height: 6, background: "rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 0, top: 118, width: 74, height: 6, background: "rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 14, top: 44, width: 46, height: 34, borderRadius: 3, background: `linear-gradient(180deg, ${i ? MAGENTA : CYAN}33, transparent)`, border: "1px solid rgba(200,210,225,0.06)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 74, height: 12, borderRadius: "50%", background: "linear-gradient(180deg,#3B4048,#1C2025)", border: "2px solid #0C0E11" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 452, top: 692, width: 98, height: 34, zIndex: 9 }}>
          <div style={{ position: "absolute", left: 0, top: 16, width: 98, height: 16, borderRadius: 4, background: "linear-gradient(180deg,#8C2B18,#48130B)", boxShadow: "0 4px 8px -2px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 0, top: 20, width: 98, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 8, top: 26, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #23262C, #0A0C0F)", border: "2px solid #16130F" }} />
          <div style={{ position: "absolute", left: 72, top: 26, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #23262C, #0A0C0F)", border: "2px solid #16130F" }} />
          <div style={{ position: "absolute", left: 62, top: -4, width: 8, height: 26, background: "linear-gradient(180deg,#A6ADB8,#5C626C)", borderRadius: 3, transform: "rotate(-32deg)", transformOrigin: "50% 100%" }} />
        </div>
        <div style={{ position: "absolute", left: 604, top: 730, width: 54, height: 16, borderRadius: 8, background: "linear-gradient(90deg,#3E434B,#22262C)", opacity: 0.5, transform: "rotate(-12deg)", filter: "blur(0.5px)", zIndex: 9 }} />
        {[0, 1, 2, 3].map((i) => <div key={"bolt" + i} style={{ position: "absolute", left: 542 + i * 22 + seed(i) * 10, top: 738 + seed(i * 2) * 8, width: 7, height: 7, borderRadius: 2, background: "radial-gradient(circle at 36% 30%, #B4BAC3, #5C626C)", opacity: 0.45, boxShadow: "0 1px 2px rgba(0,0,0,0.6)", zIndex: 9 }} />)}

        {/* ============ 7b  RISING COLOURED HAZE + FLOATING EMBERS so the air is alive and vivid. Kept fully
             animated, but thinner and dimmer, and thinned out right over the car: atmosphere, not confetti
             competing with the subject. ======= */}
        <Haze lf={lf} x={120} y={330} w={360} h={400} o={0.3} n={6} color={ELECTRIC} sd={2} />
        <Haze lf={lf + 40} x={620} y={340} w={360} h={400} o={0.26} n={6} color={MAGENTA} sd={7} />
        {Array.from({ length: 16 }, (_, i) => { const s = seed(i * 4.3 + 2); const ex = seed(i * 2.1) * 1012; const ey = 792 - ((lf * (0.5 + s * 1.1) + s * 700) % 640); const ec = i % 2 ? MAGENTA : CYAN; const nearMid = Math.max(0, 1 - Math.abs(ex - carX) / 300); return <div key={"emb" + i} style={{ position: "absolute", left: ex + Math.sin(lf / 20 + i) * 12, top: ey, width: 2.5 + s * 2.5, height: 2.5 + s * 2.5, borderRadius: "50%", background: ec, opacity: (0.14 + s * 0.24) * (0.5 + 0.5 * Math.sin(lf / 6 + i)) * (1 - nearMid * 0.55), boxShadow: `0 0 6px ${ec}`, filter: "blur(0.6px)", mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />; })}

        {/* ============ 7c  ⭐ THE DEPTH SCRIM. Sits ABOVE the entire set (z 15) and BELOW the car (z 17+).
             It knocks the room down and drags the eye inward: a clean transparent hole punched exactly over
             the car, thickening to a heavy edge vignette at the frame borders. Everything behind keeps its
             motion, it just stops shouting. A second pass pulls the colour out of the far corners so the
             deep background reads greyer than the hero. ============ */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "radial-gradient(ellipse 34% 30% at 50% 52%, rgba(6,8,13,0) 0%, rgba(6,8,13,0.26) 44%, rgba(5,7,11,0.56) 76%, rgba(4,5,9,0.74) 100%)", zIndex: 15, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "radial-gradient(ellipse 40% 34% at 50% 52%, rgba(140,146,160,0) 0%, rgba(140,146,160,0.16) 60%, rgba(140,146,160,0.3) 100%)", mixBlendMode: "saturation", zIndex: 15, pointerEvents: "none" }} />

        {/* ============ 8  THE KEY LIGHT: one caged inspection lamp on a cord, still SWINGING, throwing a
             soft warm cone down onto the raised car, with a colour fringe + drifting dust. The lamp body
             sits under the scrim (set dressing), the CONE it throws sits above it (it is what lights the
             hero, so it must stay bright). ============ */}
        <div style={{ position: "absolute", left: 590 + lampSwing, top: 150, width: 3, height: 122, background: "linear-gradient(180deg,#3A3F47,#1A1D22)", transformOrigin: "50% 0", zIndex: 10 }} />
        <div style={{ position: "absolute", left: 566 + lampSwing, top: 268, width: 52, height: 42, zIndex: 16 }}>
          <div style={{ position: "absolute", left: 4, top: 2, width: 44, height: 30, borderRadius: "50% 50% 44% 44%", background: "linear-gradient(180deg,#2A2E35,#14161A)", border: "2px solid #3A3F47", boxShadow: `0 0 30px ${KEY}cc, 0 12px 30px ${KEY}55` }} />
          {[10, 20, 30, 40].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 4, width: 1.5, height: 28, background: "#5A6068" }} />)}
          <div style={{ position: "absolute", left: 12, top: 12, width: 28, height: 15, borderRadius: "50%", background: "#FFF7DE", filter: "blur(1px)", opacity: lampFlick, boxShadow: `0 0 18px ${KEY}` }} />
        </div>
        {/* the volumetric warm cone (soft KEY) aimed onto the RAISED car, swinging with the lamp, now ABOVE
            the scrim so the beam that finds the hero stays the brightest light in the room */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: `linear-gradient(180deg, ${KEY}3C, ${KEY}14 44%, transparent 72%)`, clipPath: `polygon(${566 + lampSwing}px 300px, ${614 + lampSwing}px 300px, ${700 + lampSwing}px 706px, ${322 + lampSwing}px 706px)`, opacity: (0.68 + warm * 0.32) * lampFlick, mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        {/* a CYAN edge fringe on the swinging cone so the key beam itself carries colour */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: `linear-gradient(180deg, ${CYAN}, transparent 60%)`, clipPath: `polygon(${560 + lampSwing}px 300px, ${576 + lampSwing}px 300px, ${340 + lampSwing}px 706px, ${312 + lampSwing}px 706px)`, opacity: 0.2 * lampFlick, mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />
        {/* an overhead SECURITY cone sweeping the floor (electric), constant motion, kept UNDER the scrim */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: `linear-gradient(180deg, ${ELECTRIC}, transparent 64%)`, clipPath: `polygon(${820 + coneSweep}px 150px, ${856 + coneSweep}px 150px, ${640 + coneSweep * 2}px 700px, ${520 + coneSweep * 2}px 700px)`, opacity: 0.16, filter: "blur(4px)", mixBlendMode: "screen", zIndex: 11, pointerEvents: "none" }} />
        {/* dust motes drifting in the cone, right over the hero so the focal area sparkles most */}
        {Array.from({ length: 20 }, (_, i) => { const s = seed(i * 2.7 + 3); const x = 420 + seed(i * 1.3) * 320 + lampSwing; const y = ((seed(i * 1.9) * 320 + lf * (0.3 + s * 0.7)) % 340) + 300; return <div key={"dust" + i} style={{ position: "absolute", left: x, top: y, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: "#FFF4D8", opacity: (0.16 + s * 0.4) * lampFlick, boxShadow: `0 0 5px ${KEY}`, zIndex: 19 }} />; })}

        {/* ============ 9a  THE LIFT: a low steel SCISSOR LIFT raising the grey car up into the key light.
             Its legs stay under the scrim (structure, secondary), only the DECK the car stands on is lifted
             above it, so the plinth reads as part of the hero. ============ */}
        <div style={{ position: "absolute", left: 388, top: 700, width: 252, height: 14, borderRadius: 4, background: "linear-gradient(180deg, #2E333A 0%, #16191D 60%, #0A0C0F 100%)", border: "2px solid #0A0C0F", boxShadow: "0 10px 24px -8px rgba(0,0,0,0.75)", zIndex: 12 }} />
        {[-1, 1].map((dir, i) => <div key={"scz" + i} style={{ position: "absolute", left: 469, top: deckTop + 10, width: 16, height: 150, borderRadius: 6, background: "linear-gradient(90deg, #14161A, #33383F 50%, #14161A)", border: "1.5px solid #0A0C0F", transform: `rotate(${dir * 20}deg)`, transformOrigin: "50% 50%", boxShadow: "inset 0 0 6px rgba(0,0,0,0.5)", zIndex: 13 }} />)}
        <div style={{ position: "absolute", left: 500, top: deckTop + 76, width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #A8AFBA, #414751)", border: "2px solid #0A0C0F", zIndex: 14 }} />
        <div style={{ position: "absolute", left: 556, top: deckTop + 34, width: 18, height: 116, borderRadius: 5, background: "linear-gradient(90deg, #14161A, #3E434B 50%, #16191E)", border: "1.5px solid #0A0C0F", zIndex: 13 }} />
        <div style={{ position: "absolute", left: 344, top: deckTop + 4, width: 22, height: 14, borderRadius: 3, background: "linear-gradient(90deg, #14161A, #2C3037)", transform: "skewY(18deg)", zIndex: 15 }} />
        <div style={{ position: "absolute", left: 658, top: deckTop + 4, width: 22, height: 14, borderRadius: 3, background: "linear-gradient(90deg, #2C3037, #14161A)", transform: "skewY(-18deg)", zIndex: 15 }} />
        <div style={{ position: "absolute", left: 360, top: deckTop, width: 304, height: 18, borderRadius: 5, background: "linear-gradient(180deg, #545A63 0%, #383D45 30%, #1A1D22 100%)", border: "2px solid #0A0C0F", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.7), inset 0 2px 0 rgba(220,230,245,0.12)", zIndex: 17 }}>
          <div style={{ position: "absolute", left: 10, top: 0, width: 284, height: 4, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${CYAN}, ${CYAN}, transparent)`, opacity: 0.75 + ledPulse * 0.25, boxShadow: `0 0 16px ${CYAN}, 0 0 32px ${CYAN}aa`, mixBlendMode: "screen" }} />
        </div>

        {/* ============ 9a2  ⭐ FOCAL TREATMENT: the hero STAGE POOL. A hard SPOTLIGHT racks onto the car
             (kept), and above the scrim it is joined by a bright pool of light on the deck plus a warm halo
             behind the chassis, so the car sits in the one genuinely lit patch of the whole lock-up. ==== */}
        <div style={{ opacity: rack }}>
          <Spotlight x={carX} y={150} w={250} h={432} color="#FFF4D8" o={0.52 * rack} poolY={deckTop - 4} poolW={330} />
        </div>
        {/* the bright focal POOL washing the deck under the car (above the scrim, breathing) */}
        <div style={{ position: "absolute", left: carX - 214, top: deckTop - 34, width: 428, height: 118, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}66, ${KEY}1E 46%, transparent 70%)`, filter: "blur(16px)", opacity: (0.5 + rack * 0.5) * heroPool, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />
        {/* a warm HALO behind the chassis: pure separation, it lifts the car off the dark wall */}
        <div style={{ position: "absolute", left: carX - 250 + carNudge, top: roofY - 76, width: 500, height: 330, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}3C, ${AMBER}1A 44%, transparent 70%)`, filter: "blur(30px)", opacity: (0.6 + warm * 0.4) * heroPool, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />

        {/* ============ 9b  THE GREY CAR (solve 0, dull, unimproved) = THE ONE FOCAL POINT: biggest object,
             sitting in the brightest pool, wearing the hottest rims, and rendered through a contrast +
             saturation lift so it is also the sharpest and most saturated thing in frame. GREY stays grey
             (it is the un improved copy), it is simply the best lit grey in the building. ==== */}
        <div style={{ position: "absolute", left: carX - 230 + carNudge, top: 468, width: 460, height: 250, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}3A, transparent 66%)`, filter: "blur(20px)", zIndex: 17, opacity: 0.7 + warm * 0.3, mixBlendMode: "screen", pointerEvents: "none" }} />
        {/* a magenta + electric colour pool bathing the car so it is not a grey island */}
        <div style={{ position: "absolute", left: carX - 250 + carNudge, top: 452, width: 500, height: 270, borderRadius: "50%", background: `radial-gradient(ellipse at 32% 50%, ${ELECTRIC}, transparent 60%)`, filter: "blur(24px)", opacity: 0.2 + eleRim * 0.22, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: carX - 210 + carNudge, top: 452, width: 500, height: 270, borderRadius: "50%", background: `radial-gradient(ellipse at 68% 50%, ${MAGENTA}, transparent 60%)`, filter: "blur(24px)", opacity: 0.2 + magRim * 0.22, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: carX - 152 + carNudge, top: deckTop - 8, width: 304, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)", filter: "blur(5px)", zIndex: 18 }} />
        {/* the chassis itself, pushed through a focal grade: more contrast, more colour, a touch brighter */}
        <div style={{ position: "absolute", inset: 0, filter: "contrast(1.12) saturate(1.2) brightness(1.1)", zIndex: 20, pointerEvents: "none" }}>
          <Car x={carX - carNudge} y={carY} s={carS} solve={0} build={1} glow={0} reflect={0.52} z={20} />
        </div>
        {/* rim strips: a hot WHITE key roof edge (separation) PLUS a shifting MAGENTA rim so the grey glows */}
        <div style={{ position: "absolute", left: carX - carNudge - 110, top: roofY - 3, width: 220, height: 5, borderRadius: 4, background: `linear-gradient(90deg, transparent, #FFFFFF, transparent)`, filter: "blur(1px)", opacity: (0.8 + warm * 0.2) * heroRim, boxShadow: `0 0 20px ${RIM}, 0 0 40px ${KEY}aa`, zIndex: 21 }} />
        <div style={{ position: "absolute", left: carX - carNudge - 118, top: roofY - 6, width: 236, height: 6, borderRadius: 4, background: `linear-gradient(90deg, transparent, ${MAGENTA}, transparent)`, filter: "blur(2px)", opacity: 0.3 + magRim * 0.5, boxShadow: `0 0 18px ${MAGENTA}`, mixBlendMode: "screen", zIndex: 21 }} />
        {/* a shifting ELECTRIC lower rim (cool side) replacing the plain steel edge */}
        <div style={{ position: "absolute", left: carX - carNudge - 130, top: roofY + 104, width: 260, height: 5, borderRadius: 4, background: `linear-gradient(90deg, ${ELECTRIC}, transparent 60%)`, filter: "blur(1.5px)", opacity: 0.42 + eleRim * 0.48, boxShadow: `0 0 14px ${ELECTRIC}`, mixBlendMode: "screen", zIndex: 21 }} />
        {/* the graded WARM+COOL flanks: an AMBER key rim down the RIGHT side + a TEAL fill rim down the LEFT
             so the grey chassis catches warm+cool coloured highlights (premium graded light, not flat neon) */}
        <div style={{ position: "absolute", left: carX - carNudge + 90, top: roofY + 8, width: 8, height: 118, borderRadius: 4, background: `linear-gradient(180deg, transparent, ${AMBER}, transparent)`, filter: "blur(2px)", opacity: 0.6 + warm * 0.34, boxShadow: `0 0 22px ${AMBER}`, mixBlendMode: "screen", zIndex: 21 }} />
        <div style={{ position: "absolute", left: carX - carNudge - 99, top: roofY + 8, width: 8, height: 118, borderRadius: 4, background: `linear-gradient(180deg, transparent, ${TEAL}, transparent)`, filter: "blur(2px)", opacity: 0.54 + coolFill * 0.34, boxShadow: `0 0 22px ${TEAL}`, mixBlendMode: "screen", zIndex: 21 }} />
        {/* ACTION: a repeating defensive SHIELD ring pulses out over the car (it defends its work) */}
        <div style={{ position: "absolute", left: carX - shieldR, top: (roofY + deckTop) / 2 - shieldR * 0.6, width: shieldR * 2, height: shieldR * 1.2, borderRadius: "50%", border: `2px solid ${TEAL}`, opacity: shieldO, boxShadow: `0 0 16px ${TEAL}, inset 0 0 16px ${TEAL}66`, mixBlendMode: "screen", zIndex: 22, pointerEvents: "none" }} />
        {/* ACTION: a bright TEAL/CYAN scan bar sweeps DOWN over the car with a trailing scan field */}
        {scanAlive > 0.01 && <div style={{ position: "absolute", left: carX - 152, top: roofY - 46, width: 304, height: scanBarY - (roofY - 46), background: `linear-gradient(180deg, ${CYAN}22, transparent)`, opacity: scanAlive * 0.5, mixBlendMode: "screen", zIndex: 22, pointerEvents: "none" }} />}
        {scanAlive > 0.01 && <div style={{ position: "absolute", left: carX - 152, top: scanBarY, width: 304, height: 6, borderRadius: 4, background: `linear-gradient(90deg, transparent, ${TEAL}, ${CYAN}, transparent)`, opacity: 0.5 + scanAlive * 0.5, boxShadow: `0 0 20px ${CYAN}, 0 0 44px ${TEAL}aa`, mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />}
        {/* a soft warm specular sheen on the roof/hood so the paint catches a highlight */}
        <div style={{ position: "absolute", left: carX - 150 - carNudge, top: roofY - 8, width: 300, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 30%, ${RIM}30, transparent 60%)`, filter: "blur(10px)", opacity: 0.7 * lampFlick, mixBlendMode: "screen", zIndex: 22, pointerEvents: "none" }} />
        {/* idle tailpipe puffs: engine running, nothing rebuilt (now tinted cyan by the room light) */}
        {[0, 1, 2].map((i) => { const cyc = (lf + i * 20) % 60, p = cyc / 60; return <div key={"puff" + i} style={{ position: "absolute", left: 372 - carNudge - p * 40, top: 522 - p * 30, width: 14 + p * 22, height: 14 + p * 22, borderRadius: "50%", background: `radial-gradient(circle, ${CYAN}33, transparent 70%)`, filter: "blur(4px)", opacity: (1 - p) * 0.5, mixBlendMode: "screen", zIndex: 18 }} />; })}
        {/* ACTION: the SHIP IT stamp PUNCHES in with a golden glow flash, then holds smug on the hood */}
        <div style={{ position: "absolute", left: 590 - carNudge, top: 452, width: 150, height: 80, borderRadius: 14, background: `radial-gradient(ellipse, ${NEONGOLD}, transparent 68%)`, opacity: stampGlow * 0.55, filter: "blur(12px)", mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />
        <ShipIt x={600 - carNudge} y={470} s={stampS} rot={-10} o={stampVis} z={24} />

        {/* a thin dark contact strip so the small robot's feet sit ON the roof, not merged into it */}
        <div style={{ position: "absolute", left: villLeft + villSize * 0.14, top: roofY - 2, width: villSize * 0.7, height: 6, borderRadius: 4, background: "rgba(0,0,0,0.5)", filter: "blur(2px)", zIndex: 24 }} />
        {/* soft warm rim halo behind the small robot so his grey body cuts off the grey car */}
        <div style={{ position: "absolute", left: villLeft - 8, top: villTop + 4, width: villSize + 16, height: villSize * 0.9, borderRadius: villSize * 0.2, background: `radial-gradient(ellipse at 50% 42%, ${KEY}44, transparent 62%)`, filter: `blur(${villSize * 0.05}px)`, zIndex: 24 }} />
        {/* TAKE ONE stays a SMALL robot standing on the roof, guarding, gesturing (he is scale, not subject) */}
        <div style={{ position: "absolute", left: villLeft, top: villTop, transform: `translateY(${guardSway * 0.5 + Math.sin(lf / 11) * 1.4}px)`, zIndex: 26 }}>
          <Villain lf={lf} size={villSize} flag={1} wave={0.5 + Math.sin(lf / 11) * 0.5} rim={0.92} gaze={-1} nodAmp={1.4} nodSpeed={16} stern={0.55} />
        </div>
        {/* his small palm out "it is done" arm, reaching down toward the incoming re asks, swinging more */}
        <div style={{ position: "absolute", left: villLeft - villSize * 0.22, top: villTop + villSize * 0.44, width: villSize * 0.34, height: villSize * 0.12, background: PRIMER, borderRadius: villSize * 0.06, transform: `rotate(${-16 + guardSway * 1.8}deg)`, transformOrigin: "100% 50%", filter: `drop-shadow(0 0 3px ${KEY}) drop-shadow(0 2px 3px rgba(0,0,0,0.6))`, zIndex: 28 }} />
        <div style={{ position: "absolute", left: villLeft - villSize * 0.34, top: villTop + villSize * 0.38, width: villSize * 0.18, height: villSize * 0.2, background: PRIMER, borderRadius: villSize * 0.07, transform: `rotate(${-16 + guardSway * 1.8}deg)`, filter: `drop-shadow(0 0 3px ${KEY}) drop-shadow(0 2px 3px rgba(0,0,0,0.6))`, zIndex: 28 }}>
          {[0.16, 0.44, 0.72].map((fx, i) => <div key={i} style={{ position: "absolute", left: `${fx * 100}%`, top: 4, width: 3, height: villSize * 0.13, background: "rgba(20,24,34,0.5)", borderRadius: 2 }} />)}
        </div>

        {/* ============ 10  THE DEFENSIVE PALM SHIMMER: re ask pings bounce off it in a bright CYAN
             deflection burst (coloured now, not grey steel) instead of improving the car ============ */}
        <div style={{ position: "absolute", left: palmX - 34, top: palmY - 34, width: 68, height: 68, borderRadius: "50%", background: `radial-gradient(circle, ${CYAN}, transparent 66%)`, opacity: 0.2 + bar * 0.5, filter: "blur(10px)", mixBlendMode: "screen", zIndex: 27, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: palmX - 8, top: palmY - 34, width: 16, height: 78, borderRadius: 9, background: CYAN, opacity: 0.3 + bar * 0.5, filter: `blur(${3 + bar * 5}px)`, boxShadow: `0 0 ${14 + bar * 30}px ${CYAN}`, zIndex: 27 }} />
        <Sparks lf={lf} x={palmX} y={palmY} on={bar} color={CYAN} n={12} z={29} />
        <Sparks lf={lf + 5} x={palmX + 6} y={palmY - 8} on={bar * 0.8} color={MAGENTA} n={6} z={29} />
        {/* persistent scuff chevrons kicking back off the palm so deflection reads every frame (cyan) */}
        {[0, 1, 2].map((i) => <div key={"sc" + i} style={{ position: "absolute", left: palmX - 22 - i * 13, top: palmY + 6 + i * 13, width: 12, height: 12, borderBottom: `3px solid ${CYAN}`, borderLeft: `3px solid ${CYAN}`, transform: "rotate(-45deg)", opacity: 0.3 + bar * 0.5, boxShadow: `0 0 8px ${CYAN}`, zIndex: 29 }} />)}
        {/* the pings themselves, lofting up from the hoist hook toward the palm (the operator's re asks, clay) */}
        {pings.map((a, i) => { const p = a / LIVE; const x = hx + p * (palmX - hx); const y = hy + p * (palmY - hy) - Math.sin(p * Math.PI) * 24; const o = (p < 0.16 ? p / 0.16 : (1 - p)) * 0.92; return (
          <React.Fragment key={"pg" + i}>
            <div style={{ position: "absolute", left: x, top: y - 4, width: 18, height: 18, borderTop: `5px solid ${CLAY}`, borderRight: `5px solid ${CLAY}`, transform: "rotate(30deg)", opacity: o, boxShadow: `0 0 12px ${CLAY}`, zIndex: 33 }} />
            <div style={{ position: "absolute", left: x - 16, top: y + 4, width: 12, height: 12, borderTop: `4px solid ${CLAY}`, borderRight: `4px solid ${CLAY}`, transform: "rotate(30deg)", opacity: o * 0.7, boxShadow: `0 0 8px ${CLAY}`, zIndex: 33 }} />
          </React.Fragment>); })}

        {/* ============ 10b  ACTION: THE SECURITY BARRIER. A striped amber/black boom arm on a steel post
             SLAMS DOWN across the car over the beat (it locks its work in), lands with an impact flash +
             sparks, then settles with a small bounce. The staged "defends its work" gesture. ============ */}
        <div style={{ position: "absolute", left: 274, top: 448, width: 34, height: 104, borderRadius: 6, background: "linear-gradient(180deg,#33383F,#101215)", border: "2px solid #0A0C0F", boxShadow: `0 8px 18px -6px rgba(0,0,0,0.7), 0 0 12px ${AMBER}33`, zIndex: 30 }}>
          <div style={{ position: "absolute", left: 6, top: 8, width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #A8AFBA, #414751)", border: "2px solid #0A0C0F" }} />
          <div style={{ position: "absolute", left: 12, top: 40, width: 10, height: 10, borderRadius: "50%", background: RED, opacity: 0.5 + signPulse * 0.34, boxShadow: `0 0 8px ${RED}` }} />
        </div>
        <div style={{ position: "absolute", left: 296, top: 470, width: 300, height: 18, transformOrigin: "0% 50%", transform: `rotate(${gateAngle}deg)`, zIndex: 31 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: `repeating-linear-gradient(90deg, ${GOLD} 0 26px, #1A1712 26px 52px)`, border: "1.5px solid #0A0C0F", boxShadow: `0 6px 16px -4px rgba(0,0,0,0.7), 0 0 12px ${AMBER}55` }} />
          <div style={{ position: "absolute", left: 0, top: 3, width: 300, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ position: "absolute", right: -6, top: 1, width: 16, height: 16, borderRadius: "50%", background: RED, boxShadow: `0 0 12px ${RED}` }} />
          {/* a motion streak while the arm is mid slam */}
          <div style={{ position: "absolute", left: 0, top: 2, width: 300, height: 14, borderRadius: 4, background: `linear-gradient(90deg, transparent, ${AMBER}88)`, opacity: gateDrop > 0.06 && gateDrop < 0.94 ? 0.55 : 0, filter: "blur(4px)", mixBlendMode: "screen" }} />
        </div>
        {/* the impact flash + sparks when the barrier lands across the car */}
        {gateLand > 0.02 && <>
          <div style={{ position: "absolute", left: 540, top: 456, width: 130, height: 66, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONGOLD}, transparent 66%)`, opacity: gateLand * 0.6, filter: "blur(10px)", mixBlendMode: "screen", zIndex: 32, pointerEvents: "none" }} />
          <Sparks lf={lf} x={598} y={478} on={gateLand} color={NEONGOLD} n={11} z={33} />
        </>}

        {/* ============ 11  FOREGROUND OCCLUDER: the crisp geometric ENGINE HOIST (shop crane), near lower
             left. Deliberately the DARKEST thing in frame now: a near silhouette that frames the lit car and
             keeps its coloured rim only as a hint. Its hook is where the re asks loft from. ============ */}
        <div style={{ position: "absolute", left: -120, top: 470, width: 470, height: 330, background: "radial-gradient(ellipse at 30% 70%, rgba(4,6,10,0.94), transparent 70%)", filter: "blur(18px)", zIndex: 39, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -30, top: 706, width: 320, height: 20, borderRadius: 8, background: "linear-gradient(180deg, #1C1F24 0%, #0F1114 60%, #08090B 100%)", border: "2px solid #0A0C0F", boxShadow: "0 10px 26px -8px rgba(0,0,0,0.8)", transform: "rotate(-3deg)", filter: "blur(0.8px) brightness(0.72)", zIndex: 41 }} />
        {[-18, 118, 254].map((cx, i) => <div key={"cast" + i} style={{ position: "absolute", left: cx, top: 720, width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #2A2E34, #08090B)", border: "3px solid #08090B", filter: "blur(0.8px) brightness(0.7)", zIndex: 41 }} />)}
        <div style={{ position: "absolute", left: 120, top: 372, width: 46, height: 344, borderRadius: 5, background: "linear-gradient(90deg, #0A0C0F 0%, #1F2229 34%, #2C3038 52%, #191C21 72%, #0C0E11 100%)", border: "2px solid #0A0C0F", boxShadow: "0 12px 30px -8px rgba(0,0,0,0.8)", filter: "blur(0.8px) brightness(0.74)", zIndex: 42 }}>
          <div style={{ position: "absolute", right: -1, top: 8, width: 3, height: 328, borderRadius: 3, background: `linear-gradient(180deg, ${ELECTRIC}, transparent 70%)`, opacity: 0.4 + eleRim * 0.24, boxShadow: `0 0 8px ${ELECTRIC}` }} />
        </div>
        <div style={{ position: "absolute", left: 150, top: 384, width: 150, height: 14, borderRadius: 4, background: "linear-gradient(180deg, #2A2E34, #101215)", border: "1.5px solid #0A0C0F", transform: "rotate(-40deg)", transformOrigin: "0% 50%", filter: "blur(0.8px) brightness(0.72)", zIndex: 42 }} />
        <div style={{ position: "absolute", left: 176, top: 396, width: 20, height: 120, borderRadius: 5, background: "linear-gradient(90deg, #101215, #3B4048 50%, #101215)", border: "1.5px solid #0A0C0F", transform: "rotate(-24deg)", transformOrigin: "50% 100%", filter: "blur(0.8px) brightness(0.74)", zIndex: 42 }}>
          <div style={{ position: "absolute", left: 6, top: -20, width: 8, height: 30, background: "linear-gradient(180deg,#A6ADB8,#5C626C)", borderRadius: 3 }} />
        </div>
        <div style={{ position: "absolute", left: 138, top: 344, width: 226, height: 30, borderRadius: 6, background: "linear-gradient(180deg, #33383F 0%, #22262C 40%, #121417 100%)", border: "2px solid #0A0C0F", transform: "rotate(-8deg)", transformOrigin: "0% 50%", boxShadow: "0 8px 20px -6px rgba(0,0,0,0.75)", filter: "blur(0.8px) brightness(0.76)", zIndex: 43 }}>
          <div style={{ position: "absolute", left: 6, top: -2, width: 210, height: 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${MAGENTA}, transparent)`, opacity: 0.34 + magRim * 0.24, boxShadow: `0 0 8px ${MAGENTA}`, mixBlendMode: "screen" }} />
        </div>
        <div style={{ position: "absolute", left: 330 + Math.sin(lf / 12) * 2, top: 348, width: 3, height: 96, background: "repeating-linear-gradient(180deg, #9AA1AB 0 4px, #3E434B 4px 8px)", filter: "brightness(0.76)", zIndex: 43 }} />
        <div style={{ position: "absolute", left: 320 + Math.sin(lf / 12) * 2, top: 442, width: 22, height: 26, borderRadius: "4px 4px 12px 12px", border: "5px solid #838A96", borderTop: "none", background: "transparent", boxShadow: `0 0 6px ${CHROME}33`, filter: "brightness(0.78)", zIndex: 43 }} />

        {/* ============ 12  ⭐ FINAL FOCAL VIGNETTE: a last soft darkening toward the frame edges, sitting
             over even the foreground rig, with a clean opening over the car. It is what makes the eye land
             on the lit chassis inside a split second. ============ */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "radial-gradient(ellipse 42% 36% at 50% 52%, rgba(4,6,11,0) 0%, rgba(4,6,11,0.16) 58%, rgba(3,4,8,0.46) 100%)", zIndex: 46, pointerEvents: "none" }} />
      </div>

      {/* fixed SCENE TAG + vignette (locked over the moving camera, OUTSIDE the rig) */}
      <SceneTag f={lf} text="THE LOCKUP" color={CYAN} x={40} y={214} />
      <Vig o={0.42} />
    </AbsoluteFill>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  // S3 THE ASSEMBLY PLANT, now lit like a bold COLOUR car commercial. Same beat, same premium set, but
  // drenched in saturated ELECTRIC blue plus MAGENTA gels with a raking CYAN sweep, and ALIVE with motion:
  // a scrolling conveyor, two oscillating robot welders throwing continuous spark showers, spinning warning
  // beacons sweeping coloured cones, rising steam, drifting haze and sweeping beams. We open on TWO glossy
  // candy cars already forming under the coloured rig (never a dead empty frame). On contact (f38) the hero
  // throws the fat master switch, the whole plant BLOOMS to full colour, and the crane cranes WAY back as the
  // other three cars snap together and every bay lights so all five candy colours read glossy. Take One (grey)
  // is tiny and stranded on the deck. Vibrant AND expensive: coloured gels, deep glossy reflections, chrome.
  // HIERARCHY PASS: the vast hall still moves in every layer, but it is now pushed BACK behind two graded
  // suppression wrappers (dimmer, softer, less saturated, more blurred the further away), while the FIVE
  // CANDY CARS get a dedicated light pool, a hot rim separation, extra paint saturation and a focus vignette
  // that dips the frame edges. The eye lands on the car line first, then reads the plant around it.
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const cubic = Easing.inOut(Easing.cubic);

  // ---- CAMERA: hold TIGHT on the switch (scale 1.26), then on the throw crane WAY out. The pull
  //      out domain runs PAST frame 100 so the shot is STILL easing back on the cut. ----
  const camZoom = (lf < 38 ? 1.26 : interpolate(lf, [38, 118], [1.26, 0.955], { ...clamp, easing: cubic })) + Math.sin(lf / 24) * 0.0035;
  const camX = interpolate(lf, [38, 118], [0, 9], clamp);
  const camY = interpolate(lf, [38, 118], [0, -6], clamp);

  // ---- the throw, the power on, the reveal ----
  const throwHit = over(lf, 38, 4);
  const settle = lf > 46 ? 0.04 * Math.sin((lf - 46) / 5) : 0;
  const powerOn = Math.min(1, over(lf, 38, 6) * (1 + settle));            // the studio rig blooms up
  const flashO = interpolate(lf, [37, 40, 58], [0, 1, 0], clamp);         // a soft white core bloom
  const scrimO = interpolate(lf, [0, 37, 42, 52], [0.34, 0.34, 0.08, 0], clamp);  // a COLOURED dim (deep blue, never black) pre throw
  const throwBuild = over(lf, 39, 13);                                   // three cars snap together on the command
  const earlyBuild = over(lf, -8, 32);                                   // two cars are ALREADY forming at the open (f0 ~ 58 percent), so we never start on nothing
  const dustO = over(lf, 44, 20) * 0.7;                                   // dust drifting in the key beams
  const lampO = interpolate(lf, [0, 38, 56], [0.95, 0.95, 0.42], clamp);  // the warm worklamp on the hero eases off as the rig rises
  const t1AuraO = interpolate(lf, [0, 36, 48], [0.4, 0.4, 0], clamp);     // Take One's cool aura DIES on the throw
  const t1gaze = Math.sin(lf / 9) * 3;
  const chromeGlint = interpolate(lf, [42, 50, 66], [0, 1, 0.4], clamp);  // a specular sweep travels the chrome + paint

  // ---- HIERARCHY: three graded depth grades. The far hall loses brightness, saturation and edge
  //      contrast and gains blur; the mid rig loses less; the hero car line gains all of it back.
  //      They stay ALIVE (every animation below is untouched), they simply stop competing. ----
  const farGrade = "brightness(0.62) saturate(0.6) contrast(0.84) blur(2.4px)";   // the vast receding hall
  const midGrade = "brightness(0.78) saturate(0.78) contrast(0.92) blur(0.9px)";  // the gantry, pipes, beacons
  const heroPool = 0.3 + powerOn * 0.62;                                          // the light pool under the car line
  const heroPulse = 0.9 + 0.1 * Math.sin(lf / 7);                                 // the pool breathes so it never reads static

  // ---- PATTERN INTERRUPT: mid build, the far right cell suffers a sudden POWER SURGE. A hard arc
  //      flash cracks, sparks blow out, the plant lights FLICKER across the hall, then the rig
  //      recovers and the bay strikes back on. Sudden + unexpected, breaks the tidy assembly line. ----
  const surgeAt = 63;                                                            // the surge hits well after the reveal, when the line looks predictable
  const surgeArc = interpolate(lf, [surgeAt - 1, surgeAt + 1, surgeAt + 6], [0, 1, 0], clamp);          // the hard white arc flash core cracks then dies
  const surgeSpark = interpolate(lf, [surgeAt - 1, surgeAt + 1, surgeAt + 11, surgeAt + 16], [0, 1, 0.45, 0], clamp);  // the spark blowout shower bursts then trails off
  const bayDead = interpolate(lf, [surgeAt - 1, surgeAt + 1, surgeAt + 9, surgeAt + 15], [0, 1, 1, 0], clamp);         // the blown cell browns out DARK then eases back
  const bayRecover = interpolate(lf, [surgeAt + 12, surgeAt + 15, surgeAt + 21], [0, 1, 0], clamp);     // the cell strikes back to full, rim LEDs flare for a beat
  const flickEnv = interpolate(lf, [surgeAt, surgeAt + 6, surgeAt + 10], [1, 1, 0], clamp);             // the flicker fades out as the rig recovers
  const plantFlicker = (lf >= surgeAt && lf < surgeAt + 10 && Math.sin((lf - surgeAt) * 3.6) < 0 ? 1 : 0) * flickEnv;  // the whole hall strobes dark for a beat

  // ---- VIBRANT COLOUR + MOTION drivers, all continuous so nothing is static at frame 100 ----
  const colO = 0.42 + powerOn * 0.58;                    // colour base pre throw, floods full on the throw
  const driftA = Math.sin(lf / 34) * 74;                 // the big ELECTRIC wash drifts left to right
  const driftB = Math.cos(lf / 30) * 74;                 // the big MAGENTA wash drifts the other way
  const sweepX = ((lf * 8) % 1420) - 340;                // a bright CYAN light bar rakes across, repeating
  const sweep2X = ((lf * 6 + 720) % 1420) - 340;         // a second ELECTRIC bar rakes offset
  const beaconRot = (lf * 5) % 360;                      // rotating warning beacons
  const convScroll = (lf * 2.6) % 48;                    // the conveyor + hazard chevrons scroll
  const armA = Math.sin(lf / 12);                        // robot welder A oscillation
  const armB = Math.cos(lf / 10 + 1);                    // robot welder B oscillation
  const weldPhase = (Math.sin(lf / 6) + 1) / 2;          // continuous weld flicker at the torches
  const ledPulse = 0.55 + 0.45 * Math.sin(lf / 6.5);     // the bay accent LEDs breathe
  const signPulse = 0.55 + 0.45 * Math.sin(lf / 8 + 1);  // the ASSEMBLY sign pulses
  const beamTilt = Math.sin(lf / 24) * 9;                // the overhead beams rock

  // ---- DEEP BACKGROUND motion + PARALLAX drivers (all continuous, so the hall never freezes) ----
  const farDrift = Math.sin(lf / 44) * 9;                // slow far wall sway (parallax: far layer moves least)
  const midDrift = Math.sin(lf / 30) * 20;               // mid structures sway MORE than the far wall
  const corridorGlow = 0.42 + 0.32 * Math.sin(lf / 17);  // the distant lit doorway breathes cool
  const partConvX = (lf * 3.1) % 1180;                   // the overhead parts conveyor tracks across
  const rollerX = (lf * 5) % 24;                          // the conveyor rollers spin under the belt
  const vanBeacon = (lf * 4.2) % 360;                    // distant rotating amber beacons sweep
  const distArmA = Math.sin(lf / 9);                     // distant robot cell A oscillation
  const distArmB = Math.cos(lf / 8 + 1);                 // distant robot cell B oscillation
  const distWeld = (Math.sin(lf / 5) + 1) / 2;           // distant weld flicker
  const walkX = (lf * 2.4) % 1140;                       // a catwalk worker paces one way
  const walk2X = 1140 - ((lf * 1.8 + 380) % 1140);       // a second worker crosses the other way
  const walkBob = Math.abs(Math.sin(lf / 6)) * 3;        // the workers bob as they pace
  const ventA = (lf % 66) / 66;                          // a periodic vent steam burst
  const ventB = ((lf + 33) % 66) / 66;                   // a second vent offset

  // ---- the hero walks in from the left and throws the lever ----
  const heroX = interpolate(lf, [0, 16, 34], [-70, 360, 686], { ...clamp, easing: cubic });
  const heroCheer = over(lf, 40, 6) * 0.5;                                // a quiet fist pump after the throw
  const reach = over(lf, 26, 11);
  const shoulderX = heroX + 100;
  const handX = interpolate(lf, [26, 37], [660, 858], clamp);
  const handY = 566;
  const leverRot = interpolate(lf, [34, 38, 40, 46], [-56, -56, 8, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const hookSway = Math.sin(lf / 18) * 6;
  const cableSag = 150 + Math.sin(lf / 20) * 4;

  // two robot WELDERS working the hero bay, always articulating, always throwing sparks. Coloured accent
  // joints (CYAN, MAGENTA) so even the machinery is vibrant. Tips computed so sparks land on the torch head.
  const arms = [
    { bx: 356, by: 300, len: 152, ang: 54 + armA * 12, c: CYAN, sd: 0 },
    { bx: 656, by: 300, len: 152, ang: 126 + armB * 12, c: MAGENTA, sd: 30 },
  ].map((a) => {
    const r = (a.ang * Math.PI) / 180;
    return { ...a, tipX: a.bx + Math.cos(r) * a.len, tipY: a.by + Math.sin(r) * a.len };
  });

  // five build stations receding to the sides, the centre station the biggest, best lit HERO car. The
  // cars are scaled up big and the bays respread so nothing clips a panel edge. Colour is the candy PAINT
  // only. The accent hue is used as a thin rim strip, never a wash. The two EARLY bays hold the cars that
  // are already forming at the open.
  const bays = [
    { cx: 150, s: 0.96, y: 542, solve: 1, hue: MAGENTA },
    { cx: 322, s: 1.18, y: 560, solve: 2, hue: CYAN },
    { cx: 506, s: 1.60, y: 590, solve: 4, hue: NEONGOLD, hero: true, early: true },
    { cx: 690, s: 1.18, y: 560, solve: 3, hue: LIME, early: true },
    { cx: 862, s: 0.96, y: 542, solve: 5, hue: VIOLET },
  ];

  return (
    <AbsoluteFill>
      {/* =============== EVERYTHING BELOW LIVES INSIDE THE CRANE CAMERA =============== */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${camZoom}) translate(${camX}px, ${camY}px)`, transformOrigin: "80% 70%" }}>

        {/* oversize deep BLUE graphite base (not neutral black) so the pull out never reveals a bare edge */}
        <div style={{ position: "absolute", left: -90, top: -90, width: 1192, height: 972, background: "radial-gradient(ellipse at 52% 26%, #1A2038 0%, #111730 62%, #080B18 100%)", zIndex: 0 }} />

        {/* 1. BACKGROUND: the seamless cyc + GLOSSY floor, now raked with ELECTRIC blue + MAGENTA gels */}
        <GarageFloor horizon={430} hue={KEY} gel={ELECTRIC} gel2={MAGENTA} o={1} />

        {/* 1b. BIG SATURATED COLOUR WASHES: two complementary gels drifting across the whole set, plus a
               raking CYAN sweep, so the frame reads rich and colourful (never grey) even before the throw.
               Dialled DOWN from the previous pass so the washes tint the air instead of lifting the hall
               to the same brightness as the candy paint. */}
        <GelWash x={230 + driftA} y={330} w={860} h={720} color={ELECTRIC} o={colO * 0.21} blur={86} z={1} />
        <GelWash x={800 + driftB} y={360} w={840} h={720} color={MAGENTA} o={colO * 0.19} blur={86} z={1} />
        <GelWash x={506} y={250} w={620} h={420} color={VIOLET} o={colO * 0.1} blur={78} z={1} />
        <GelBar x={sweepX} y={220} w={420} h={220} color={CYAN} o={colO * 0.2} rot={12 + beamTilt} z={2} />
        <GelBar x={sweep2X} y={430} w={420} h={200} color={ELECTRIC} o={colO * 0.15} rot={-10 + beamTilt} z={2} />

        {/* ============================================================================
             DEEP BACKGROUND: a VAST assembly hall receding to a lit vanishing point.
             Three layers, each darker + cooler + more blurred the further back, every
             one carrying its OWN motion so the plant is never a flat frozen backdrop.
             ALL of it now lives inside ONE far depth GRADE (dimmer, desaturated, lower
             contrast, extra blur) and sits behind the bays in z, so the hero cars are
             unambiguously the brightest, sharpest, most saturated thing in frame.
             Nothing is deleted: every parallax, walker, beacon and conveyor still runs.
           ============================================================================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, filter: farGrade, pointerEvents: "none" }}>

          {/* ---- FAR LAYER: a cool dim far wall + a bright doorway at the vanishing point,
                   with receding gantry arches converging into it. Slowest parallax. ---- */}
          <div style={{ position: "absolute", left: 250 + farDrift, top: 118, width: 512, height: 202, background: "linear-gradient(180deg,#0F1220,#0A0D18)", filter: "blur(3px)", opacity: 0.78, zIndex: 1 }} />
          {/* the lit opening onto the next hall, breathing cool */}
          <div style={{ position: "absolute", left: 456 + farDrift, top: 150, width: 100, height: 152, borderRadius: 4, background: `linear-gradient(180deg, ${AZURE}, #143246 72%)`, filter: "blur(5px)", opacity: 0.16 + corridorGlow * 0.2, mixBlendMode: "screen", zIndex: 1, pointerEvents: "none" }} />
          {/* tiny worker silhouettes crossing the far doorway */}
          {Array.from({ length: 3 }, (_, k) => {
            const wx = 470 + farDrift + ((lf * 0.7 + k * 40) % 74) - 4;
            return <div key={"fw" + k} style={{ position: "absolute", left: wx, top: 258 + Math.abs(Math.sin(lf / 7 + k)) * 2, width: 5, height: 20, borderRadius: "3px 3px 1px 1px", background: "#05070C", filter: "blur(1.4px)", opacity: 0.5, zIndex: 1 }} />;
          })}
          {/* receding gantry arches converging to the vanishing point (drawn far first, near last) */}
          {Array.from({ length: 6 }, (_, k) => {
            const t = 1 - k / 5;                        // t=1 farthest (drawn first), t=0 nearest (drawn last)
            const w = 300 + t * 470;
            const h = 70 + t * 180;
            const cx = 506 + farDrift * (1 - t) * 1.6;  // nearer arches sway more (parallax)
            const bw = 6 - t * 3.5;
            return <div key={"arch" + k} style={{ position: "absolute", left: cx - w / 2, top: 120 + t * 60, width: w, height: h, border: `${bw}px solid #1B212C`, borderBottom: "none", borderRadius: `${18 - t * 10}px ${18 - t * 10}px 0 0`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.04)", filter: `blur(${t * 2.6}px)`, opacity: (0.5 - t * 0.26) + powerOn * 0.1, zIndex: 1 }} />;
          })}

          {/* ---- MID LAYER: the working machinery across the hall. Faster parallax. ---- */}
          {/* hazard striped support PILLARS receding down both flanks (perspective) */}
          {[0, 1, 2].map((k) => {
            const t = k / 2;
            const h = 210 - t * 70;
            const w = 26 - t * 10;
            const yTop = 120 + t * 24;
            const lx = 40 + t * 150 + midDrift * (1 - t) * 0.5;
            const rx = 972 - t * 150 - w - midDrift * (1 - t) * 0.5;
            return [lx, rx].map((px, s) => (
              <div key={"pil" + k + s} style={{ position: "absolute", left: px, top: yTop, width: w, height: h, borderRadius: 3, background: "linear-gradient(90deg,#161A20,#333A43,#161A20)", boxShadow: "0 4px 12px rgba(0,0,0,0.5)", filter: `blur(${t * 1.4}px)`, opacity: 0.54 - t * 0.22 + powerOn * 0.1, zIndex: 2 }}>
                {/* the hazard stripes are kept, their contrast knocked back so they stop bidding for attention */}
                <div style={{ position: "absolute", left: 0, top: 12, width: w, height: 40, background: "repeating-linear-gradient(-45deg,#8A6E22 0 8px,#191B1F 8px 16px)", opacity: 0.6 }} />
              </div>
            ));
          })}
          {/* a CATWALK crossing the hall with a handrail + posts, worker silhouettes pacing it */}
          <div style={{ position: "absolute", left: 0, top: 224, width: 1012, height: 7, background: "linear-gradient(180deg,#2C323A,#1B2027)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", opacity: 0.48 + powerOn * 0.18, filter: "blur(0.6px)", zIndex: 3 }} />
          <div style={{ position: "absolute", left: 0, top: 210, width: 1012, height: 3, background: "#3E454E", opacity: 0.3 + powerOn * 0.14, zIndex: 3 }} />
          {Array.from({ length: 13 }, (_, k) => <div key={"cwp" + k} style={{ position: "absolute", left: 20 + k * 80, top: 210, width: 3, height: 15, background: "#242A32", opacity: 0.4, zIndex: 3 }} />)}
          {[{ x: walkX, tint: HERO }, { x: walk2X, tint: FILL }].map((wk, wi) => (
            <div key={"wkr" + wi} style={{ position: "absolute", left: wk.x, top: 190 - walkBob, width: 12, height: 30, zIndex: 3, filter: "blur(0.6px)", opacity: 0.5 + powerOn * 0.14 }}>
              <div style={{ position: "absolute", left: 2, top: 0, width: 8, height: 8, borderRadius: "50%", background: "#0C0F14" }} />
              <div style={{ position: "absolute", left: 0, top: 7, width: 12, height: 16, borderRadius: "4px 4px 2px 2px", background: `linear-gradient(180deg, ${wk.tint}, #10131A 80%)` }} />
              <div style={{ position: "absolute", left: 0, top: 12, width: 12, height: 3, background: NEONGOLD, opacity: 0.5 }} />
            </div>
          ))}
          {/* distant ROBOT ARM CELLS mounted high, oscillating nonstop + throwing small weld flashes */}
          {[{ bx: 214, c: CYAN, dr: distArmA, sd: 0 }, { bx: 798, c: MAGENTA, dr: distArmB, sd: 17 }].map((rc, ri) => {
            const ang = 60 + rc.dr * 26;
            const rr = (ang * Math.PI) / 180;
            const tipx = rc.bx + Math.cos(rr) * 60, tipy = 176 + Math.sin(rr) * 60;
            return (
              <React.Fragment key={"drc" + ri}>
                <div style={{ position: "absolute", left: rc.bx - 8, top: 168, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#4A525C,#1B2027)", border: `2px solid ${rc.c}`, filter: "blur(0.5px)", opacity: 0.46 + powerOn * 0.18, zIndex: 3 }} />
                <div style={{ position: "absolute", left: rc.bx, top: 172, width: 60, height: 8, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, borderRadius: 4, background: "linear-gradient(180deg,#5A626C,#242A32)", filter: "blur(0.5px)", opacity: 0.46 + powerOn * 0.18, zIndex: 3 }} />
                <div style={{ position: "absolute", left: tipx - 12, top: tipy - 12, width: 24, height: 24, borderRadius: "50%", background: `radial-gradient(circle,#FFF,${rc.c}66,transparent 70%)`, filter: "blur(3px)", opacity: (0.13 + powerOn * 0.24) * (0.4 + distWeld * 0.6), mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
                <Sparks lf={lf + rc.sd} x={tipx} y={tipy} on={(0.12 + powerOn * 0.2) * (0.4 + distWeld * 0.6)} color={NEONORANGE} n={5} z={3} />
              </React.Fragment>
            );
          })}
          {/* rotating AMBER beacons on the mid gantries, sweeping coloured cones, always spinning */}
          {[168, 506, 844].map((bx, bi) => (
            <React.Fragment key={"mbea" + bi}>
              <div style={{ position: "absolute", left: bx - 90, top: 150, width: 180, height: 150, transformOrigin: "50% 0%", transform: `rotate(${vanBeacon + bi * 120}deg)`, background: `linear-gradient(180deg, ${NEONORANGE}, transparent 72%)`, filter: "blur(14px)", opacity: (0.06 + powerOn * 0.11) * (0.5 + distWeld * 0.5), mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: bx - 6, top: 144, width: 12, height: 9, borderRadius: "5px 5px 2px 2px", background: `radial-gradient(circle at 40% 35%,#FFF,${NEONORANGE})`, boxShadow: `0 0 ${5 + distWeld * 8}px ${NEONORANGE}`, opacity: 0.44 + powerOn * 0.2, zIndex: 3 }} />
            </React.Fragment>
          ))}
          {/* an overhead PARTS CONVEYOR ferrying car parts (wheel / door / chassis) across the top */}
          <div style={{ position: "absolute", left: 0, top: 146, width: 1012, height: 8, background: "linear-gradient(180deg,#333A43,#20262E)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)", opacity: 0.5 + powerOn * 0.2, zIndex: 4 }} />
          <div style={{ position: "absolute", left: 0, top: 153, width: 1012, height: 4, background: `repeating-linear-gradient(90deg,#12161C 0 10px,${ELECTRIC}44 10px 12px)`, backgroundPositionX: -rollerX, opacity: 0.3 + powerOn * 0.2, zIndex: 4 }} />
          {Array.from({ length: 6 }, (_, k) => {
            const x = ((partConvX + k * 197) % 1180) - 84;
            const kind = k % 3;
            const sway = Math.sin(lf / 12 + k) * 2.5;
            const candy = [MAGENTA, CYAN, LIME, VIOLET, NEONGOLD][k % 5];
            return (
              <React.Fragment key={"crr" + k}>
                <div style={{ position: "absolute", left: x + 28 + sway, top: 154, width: 2, height: 26, background: "#2A2F36", opacity: 0.5 + powerOn * 0.2, zIndex: 4 }} />
                {kind === 0 ? (
                  <div style={{ position: "absolute", left: x + 8 + sway, top: 178, width: 38, height: 38, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%,#333A43,#0E1116 68%)", border: "5px solid #14171C", boxShadow: `inset 0 0 0 3px ${CHROME}44`, transform: `rotate(${(lf * 4 + k * 40) % 360}deg)`, opacity: 0.5 + powerOn * 0.22, zIndex: 4 }} />
                ) : kind === 1 ? (
                  /* the ferried body panels stay coloured, just muted, so they never rival the candy cars */
                  <div style={{ position: "absolute", left: x + sway, top: 180, width: 58, height: 36, borderRadius: "8px 3px 6px 8px", background: `linear-gradient(150deg, ${candy}, #171B22 74%)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12), 0 3px 8px rgba(0,0,0,0.5)", opacity: 0.42 + powerOn * 0.18, zIndex: 4 }} />
                ) : (
                  <div style={{ position: "absolute", left: x - 6 + sway, top: 186, width: 82, height: 18, borderRadius: 4, background: "linear-gradient(180deg,#4A525C,#242A32)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", opacity: 0.44 + powerOn * 0.2, zIndex: 4 }} />
                )}
              </React.Fragment>
            );
          })}
          {/* VENT PUFFS of steam rising between the far structures (periodic bursts, always cycling) */}
          {[{ vx: 120, p: ventA }, { vx: 400, p: ventB }, { vx: 620, p: ventA }, { vx: 900, p: ventB }].map((v, vi) => (
            <div key={"vent" + vi} style={{ position: "absolute", left: v.vx - 22 + Math.sin(lf / 14 + vi) * 8, top: 232 - v.p * 96, width: 44 + v.p * 30, height: 44 + v.p * 30, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,224,255,0.2), transparent 70%)", filter: "blur(9px)", opacity: (0.09 + powerOn * 0.14) * (1 - v.p), mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />
          ))}

          {/* 2. THE VAST PLANT beyond: a receding row of dim, identical build stations fading into the dark,
                 so the space reads as a huge assembly hall, not a small garage. */}
          {Array.from({ length: 7 }, (_, k) => {
            const bx = 44 + k * 138;
            return (
              <div key={"far" + k} style={{ position: "absolute", left: bx, top: 150, width: 116, height: 150, borderRadius: 5, background: "linear-gradient(180deg,#181B21,#0E1014)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)", opacity: 0.44 + powerOn * 0.14, zIndex: 2 }}>
                <div style={{ position: "absolute", left: 14, top: 10, right: 14, height: 4, borderRadius: 2, background: RIM, opacity: (0.06 + powerOn * 0.16) }} />
              </div>
            );
          })}
          {/* a high roof truss + cable trays crossing the hall */}
          <div style={{ position: "absolute", left: 0, top: 128, width: 1012, height: 10, background: "linear-gradient(180deg,#333A43,#20242B)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)", opacity: 0.8, zIndex: 3 }} />
          {Array.from({ length: 9 }, (_, k) => (
            <div key={"tr" + k} style={{ position: "absolute", left: 30 + k * 118, top: 96, width: 5, height: 40, background: "linear-gradient(180deg,#282E36,#191C21)", transform: `skewX(${k < 4 ? 8 : -8}deg)`, opacity: 0.8, zIndex: 3 }} />
          ))}
        </div>

        {/* an ATMOSPHERIC HAZE SCRIM sitting between the far hall and the bays: aerial perspective that
             pushes the whole deep background into the distance without hiding any of its motion. */}
        <div style={{ position: "absolute", left: -40, top: -40, width: 1092, height: 420, background: "linear-gradient(180deg, rgba(11,15,30,0.72) 0%, rgba(12,17,34,0.5) 52%, rgba(12,17,34,0) 100%)", zIndex: 3, pointerEvents: "none" }} />

        {/* ============ MID DEPTH RIG (gantry, beacons, pipe run). One grade softer than the far hall but
             still clearly BEHIND the car line, so the overhead hardware frames the heroes rather than
             fighting them. Every sweep, scroll and sway is preserved. ============ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 6, filter: midGrade, pointerEvents: "none" }}>

          {/* 3. THE OVERHEAD GANTRY: a brushed steel bridge beam with a warning stripe band, a chrome
                 trolley, and a polished hook on a cable (real materials, no neon strips). */}
          <div style={{ position: "absolute", left: 0, top: 60, width: 1012, height: 22, background: "linear-gradient(180deg,#3E454E,#2A2F36)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1), 0 6px 14px rgba(0,0,0,0.5)", zIndex: 7 }} />
          {/* the warning stripe still SCROLLS along the beam, contrast pulled back so it stops shouting */}
          <div style={{ position: "absolute", left: 0, top: 82, width: 1012, height: 12, background: "repeating-linear-gradient(45deg,#B49327 0 15px,#1A1C20 15px 30px)", backgroundPositionX: convScroll, opacity: 0.72, zIndex: 7 }} />
          {/* ROTATING WARNING BEACONS on the gantry: domes plus sweeping coloured light cones (always spinning) */}
          {[{ bx: 300, c: NEONORANGE, off: 0 }, { bx: 712, c: HOTRED, off: 180 }].map((be, bi) => (
            <React.Fragment key={"bea" + bi}>
              <div style={{ position: "absolute", left: be.bx - 130, top: 52, width: 260, height: 330, transformOrigin: "50% 0%", transform: `rotate(${beaconRot + be.off}deg)`, background: `linear-gradient(180deg, ${be.c}, transparent 74%)`, filter: "blur(18px)", opacity: (0.08 + powerOn * 0.13) * (0.6 + weldPhase * 0.4), mixBlendMode: "screen", zIndex: 9, pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: be.bx - 15, top: 38, width: 30, height: 20, borderRadius: "8px 8px 4px 4px", background: `radial-gradient(circle at 40% 35%, #FFF, ${be.c})`, border: "2px solid #2A2F36", boxShadow: `0 0 ${6 + weldPhase * 11}px ${be.c}`, opacity: 0.55 + powerOn * 0.22, zIndex: 10 }} />
            </React.Fragment>
          ))}
          <div style={{ position: "absolute", left: 470, top: 90, width: 84, height: 30, borderRadius: 5, background: "linear-gradient(180deg,#4A525C,#2E343C)", border: "2px solid #5A626C", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.14), 0 6px 14px rgba(0,0,0,0.55)", zIndex: 8 }} />
          <div style={{ position: "absolute", left: 510 + hookSway, top: 118, width: 3, height: cableSag - 118, background: "#20242B", zIndex: 8 }} />
          <div style={{ position: "absolute", left: 500 + hookSway, top: cableSag, width: 24, height: 26, borderRadius: "4px 4px 12px 12px", background: `linear-gradient(180deg,${CHROME},#7A828C)`, border: "2px solid #3A4149", boxShadow: "0 4px 10px rgba(0,0,0,0.55)", zIndex: 8 }} />

          {/* 4. A PIPE RUN with brushed valve wheels + draped hydraulic hoses (factory plumbing detail) */}
          <div style={{ position: "absolute", left: 0, top: 168, width: 1012, height: 11, background: "linear-gradient(180deg,#3E454E,#262B31)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)", zIndex: 6 }} />
          <div style={{ position: "absolute", left: 0, top: 186, width: 1012, height: 7, background: "linear-gradient(180deg,#333A43,#1C2025)", zIndex: 6 }} />
          {[150, 500, 850].map((vx, i) => (
            <div key={"v" + i} style={{ position: "absolute", left: vx - 15, top: 156, width: 30, height: 30, borderRadius: "50%", border: "4px solid #5A626C", background: "#262B31", zIndex: 6, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 2px 6px rgba(0,0,0,0.5)" }}>
              <div style={{ position: "absolute", left: 11, top: -4, width: 4, height: 38, background: "#5A626C", borderRadius: 2 }} />
              <div style={{ position: "absolute", left: -4, top: 11, width: 38, height: 4, background: "#5A626C", borderRadius: 2 }} />
            </div>
          ))}
          <svg width={1012} height={130} style={{ position: "absolute", left: 0, top: 110, overflow: "visible", zIndex: 6 }}>
            {[120, 470, 780].map((sx, i) => (
              <path key={i} d={`M ${sx} 8 Q ${sx + 70} ${58 + Math.sin(lf / 19 + i) * 4} ${sx + 150} 10`} fill="none" stroke="#141619" strokeWidth={5} strokeLinecap="round" />
            ))}
          </svg>
        </div>

        {/* 5. FIVE BUILD STATIONS. Each is a graphite alcove dressed like a photo bay: a carbon fibre
               back panel, brushed steel columns, a hung SOFTBOX key + a cool FILL, a chrome scissor
               lift, a gauge cluster. Dim under the scrim, they BLOOM on together on the throw with a
               big glossy candy car lifted into each. Sameness: five identical stalls, only the CAR
               differs (the whole thesis of the reel). The alcove dressing is deliberately kept DARKER
               than the paint so each car reads as a lit object standing in front of it. */}
        {bays.map((b, i) => {
          const alcove = b.hero ? 1 : 0.82;   // the flanking stalls sit a stop under the hero stall
          return (
            <React.Fragment key={"bay" + i}>
              {/* carbon fibre back panel with a subtle weave + ambient occlusion */}
              <div style={{ position: "absolute", left: b.cx - 106, top: 236, width: 212, height: 332, borderRadius: 8, background: "linear-gradient(180deg,#1B1F26,#0F1114)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.04), inset 0 0 54px rgba(0,0,0,0.72)", opacity: (0.58 + powerOn * 0.34) * alcove, zIndex: 4 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 8, opacity: 0.34, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 3px, transparent 3px 6px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0 3px, transparent 3px 6px)" }} />
                {/* PULSING accent LED rims: the bay hue still breathes top and bottom, just under the paint */}
                <Neon x={16} y={16} w={180} h={5} color={b.hue} on={(0.16 + powerOn * 0.48) * ledPulse * alcove} z={5} />
                <Neon x={16} y={312} w={180} h={4} color={b.hue} on={(0.12 + powerOn * 0.4) * (1.05 - ledPulse * 0.5) * alcove} z={5} />
                {/* an etched station number plate */}
                <div style={{ position: "absolute", left: 14, bottom: 12, width: 34, height: 22, borderRadius: 3, background: "linear-gradient(180deg,#333A43,#20242B)", border: "1px solid #3E454E", opacity: 0.36 + powerOn * 0.24, fontFamily: "ui-monospace,monospace", fontSize: 15, color: RIM, textAlign: "center", lineHeight: "22px" }}>{"0" + (i + 1)}</div>
              </div>
              {/* brushed steel divider columns flanking the alcove */}
              <div style={{ position: "absolute", left: b.cx - 118, top: 222, width: 12, height: 360, borderRadius: 3, background: "linear-gradient(90deg,#1E2229,#4A525C,#1E2229)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", opacity: 0.86 * alcove + 0.14, zIndex: 5 }} />
              <div style={{ position: "absolute", left: b.cx + 106, top: 222, width: 12, height: 360, borderRadius: 3, background: "linear-gradient(90deg,#1E2229,#4A525C,#1E2229)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", opacity: 0.86 * alcove + 0.14, zIndex: 5 }} />
              {/* a wall gauge cluster: two brushed dials with live needles */}
              {[0, 1].map((g) => (
                <div key={"g" + g} style={{ position: "absolute", left: b.cx - 92 + g * 34, top: 250, width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #242930, #121417)", border: "2px solid #55606B", opacity: (0.32 + powerOn * 0.34) * alcove, zIndex: 6 }}>
                  <div style={{ position: "absolute", left: 11, top: 4, width: 2, height: 10, background: b.hue, transformOrigin: "50% 100%", transform: `rotate(${-40 + Math.sin(lf / 15 + g + i) * 46}deg)`, borderRadius: 2, opacity: 0.4 + powerOn * 0.4 }} />
                  <div style={{ position: "absolute", left: 10, top: 10, width: 6, height: 6, borderRadius: "50%", background: CHROME }} />
                </div>
              ))}
              {/* a hung SOFTBOX (real studio light in shot) on a thin drop rod. The hero softbox stays HOT,
                  the flanking ones are pulled down so the centre of the line is the brightest source. */}
              <div style={{ position: "absolute", left: b.cx - 2, top: 200, width: 3, height: 30, background: "#333A43", opacity: 0.8, zIndex: 6 }} />
              <SoftBox x={b.cx - 56} y={226} w={112} h={62} color="#FFF6E6" o={(0.14 + powerOn * 0.66) * (b.hero ? 1 : 0.72)} z={7} />
              {/* warm KEY wash + a cool FILL from the flank, so the car is modelled not flatly lit. A small
                  base keeps the two already forming cars readable before the throw. */}
              <StudioLight x={b.cx} y={392} w={286} h={340} color={KEY} o={(0.13 + powerOn * 0.34) * (b.hero ? 1.12 : 0.86)} z={3} />
              <StudioLight x={b.cx - 96} y={444} w={210} h={280} color={FILL} o={0.03 + powerOn * 0.12} z={3} />
              {/* the CHROME scissor lift the car sits on */}
              <div style={{ position: "absolute", left: b.cx - 78, top: 592, width: 156, height: 14, borderRadius: 4, background: `linear-gradient(180deg,${CHROME},#6A727C)`, boxShadow: "0 6px 14px rgba(0,0,0,0.55)", opacity: (0.62 + powerOn * 0.3) * alcove, zIndex: 16 }} />
              <svg width={120} height={40} style={{ position: "absolute", left: b.cx - 60, top: 606, overflow: "visible", zIndex: 15, opacity: (0.6 + powerOn * 0.26) * alcove }}>
                <path d="M 6 34 L 60 4 M 60 34 L 6 4 M 60 4 L 114 34 M 114 4 L 60 34" stroke="#4A525C" strokeWidth={5} strokeLinecap="round" fill="none" />
              </svg>
            </React.Fragment>
          );
        })}

        {/* 5a. THE FOCAL LIGHT POOL: one big soft warm pool laid across the car line, plus a hotter core
                under the centre hero, so the row of candy cars sits in the single brightest patch of the
                frame. It breathes with the rig so the light itself keeps moving. */}
        <div style={{ position: "absolute", left: 26, top: 340, width: 960, height: 420, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 54%, rgba(255,240,214,0.3) 0%, rgba(255,226,180,0.14) 42%, transparent 74%)", opacity: heroPool * heroPulse, filter: "blur(24px)", mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 296, top: 372, width: 420, height: 330, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 56%, rgba(255,246,226,0.42) 0%, rgba(255,214,150,0.16) 46%, transparent 72%)", opacity: heroPool * (0.94 + 0.06 * Math.sin(lf / 5)), filter: "blur(18px)", mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />

        {/* 5b. THE HERO CARS: glossy candy builds, lit big with a ground reflection. Rendered after the
                alcoves so they own the frame. The centre car is the biggest, sharpest, best lit. Two bays
                are already forming at the open; brightness lives on the PAINT, not the graphite backdrop.
                Each car now sits in its own grade wrapper (extra saturation, contrast, brightness plus a
                hard contact drop shadow) so the paint is the sharpest, most saturated thing on screen. */}
        {bays.map((b, i) => {
          // the two EARLY bays are already forming at the open; the other three snap in on the throw
          const carBuild = b.early ? earlyBuild : throwBuild;
          // sparks fly while a bay is actually assembling: at the open for the early two, on the throw for the rest
          const sparkOn = b.early
            ? over(lf, 0, 5) * (1 - over(lf, 13, 10)) * 0.7
            : over(lf, 39, 5) * (1 - over(lf, 50, 10)) * 0.8;
          // brightness lives on the PAINT: the early two carry a soft pool pre throw so the open never reads dark
          const carGlow = Math.max(b.early ? 0.2 : 0, powerOn * (b.hero ? 0.6 : 0.44));
          const haloO = (b.early ? 0.16 : 0) + powerOn * 0.26;
          // the hero car gets the strongest grade of all so the eye lands dead centre first
          const grade = b.hero
            ? "saturate(1.34) contrast(1.14) brightness(1.12)"
            : "saturate(1.2) contrast(1.07) brightness(1.04)";
          return (
            <React.Fragment key={"car" + i}>
              {/* COLOURED RIM LIGHT: a CYAN kiss from one flank + a MAGENTA kiss from the other, so every
                  car is modelled in bold colour, never grey. The hero gets the strongest rim. */}
              <StudioLight x={b.cx - 118 * b.s} y={b.y - 26} w={210 * b.s} h={280} color={CYAN} o={((b.early ? 0.13 : 0) + powerOn * (b.hero ? 0.34 : 0.22)) * (0.7 + ledPulse * 0.3)} z={17} />
              <StudioLight x={b.cx + 118 * b.s} y={b.y - 26} w={210 * b.s} h={280} color={MAGENTA} o={((b.early ? 0.11 : 0) + powerOn * (b.hero ? 0.3 : 0.2)) * (1.0 - ledPulse * 0.3)} z={17} />
              {/* SEPARATION HALO: a tight bloom of the car's own paint hue hugging the body, so the car
                  cuts cleanly off the graphite alcove behind it instead of blending into it. */}
              <div style={{ position: "absolute", left: b.cx - 132 * b.s, top: b.y - 118 * b.s, width: 264 * b.s, height: 190 * b.s, borderRadius: "50%", background: `radial-gradient(ellipse, ${b.hue}, transparent 62%)`, opacity: haloO * (b.hero ? 0.66 : 0.44) * (0.86 + ledPulse * 0.14), filter: "blur(22px)", mixBlendMode: "screen", zIndex: 18, pointerEvents: "none" }} />
              {/* the paint-hue pool kissing the glossy floor, now bolder */}
              <div style={{ position: "absolute", left: b.cx - 158 * b.s, top: b.y + 8, width: 316 * b.s, height: 74 * b.s, borderRadius: "50%", background: `radial-gradient(ellipse, ${b.hue}, transparent 66%)`, opacity: haloO * 1.35, filter: "blur(10px)", zIndex: 15, pointerEvents: "none" }} />
              {/* rising assembly STEAM puffs off the fresh build (always moving) */}
              {Array.from({ length: 3 }, (_, k) => {
                const ph = ((lf * 1.5 + k * 42 + i * 19) % 130) / 130;
                return <div key={"stm" + k} style={{ position: "absolute", left: b.cx - 30 * b.s + Math.sin(lf / 16 + k + i) * 14, top: b.y - 10 - ph * 150 * b.s, width: (26 + ph * 40) * b.s, height: (26 + ph * 40) * b.s, borderRadius: "50%", background: `radial-gradient(circle, ${k % 2 ? CYAN : "#DCE6FF"}22, transparent 70%)`, filter: "blur(8px)", opacity: (0.09 + powerOn * 0.22) * (1 - ph) * (b.early || powerOn > 0.2 ? 1 : 0), zIndex: 18, pointerEvents: "none" }} />;
              })}
              <CastShadow x={b.cx} y={b.y + 4} w={170 * b.s} o={0.52} />
              {/* the grade wrapper: the candy paint is the most saturated, sharpest, highest contrast
                  element in the whole frame, and it drops a hard contact shadow onto the deck. */}
              <div style={{ position: "absolute", inset: 0, zIndex: b.hero ? 22 : 20, filter: `${grade} drop-shadow(0 14px 18px rgba(0,0,0,0.6))`, pointerEvents: "none" }}>
                <Car x={b.cx} y={b.y} s={b.s} solve={b.solve} build={carBuild} glow={carGlow} reflect={0.46} z={20} />
              </div>
              {/* a chrome specular sweep travelling across the hero car body on power up */}
              {b.hero && chromeGlint > 0.02 && (
                <div style={{ position: "absolute", left: b.cx - 150 + chromeGlint * 260, top: b.y - 150, width: 46, height: 130, background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.6), transparent)", filter: "blur(4px)", transform: "skewX(-16deg)", opacity: (1 - Math.abs(chromeGlint - 0.5) * 1.4) * 0.85, zIndex: 23, pointerEvents: "none" }} />
              )}
              {/* faint assembly sparks as the build snaps together, warm not neon */}
              <Sparks lf={lf + i * 5} x={b.cx - 40 * b.s} y={b.y - 40 * b.s} on={sparkOn} color="#FFC98A" n={7} z={24} />
            </React.Fragment>
          );
        })}

        {/* 5c. TWO ROBOT WELDERS working the hero bay: brushed steel booms on coloured pivots, oscillating
                nonstop, torch heads throwing continuous spark showers with a bright weld flash. Pure motion,
                and the joints glow CYAN + MAGENTA so even the machinery is vibrant. Eased back a touch so
                their flashes FRAME the hero bay instead of pulling the eye off it. */}
        {arms.map((a, ai) => (
          <React.Fragment key={"arm" + ai}>
            {/* the pivot base bolted to the gantry */}
            <div style={{ position: "absolute", left: a.bx - 16, top: a.by - 16, width: 32, height: 32, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #5A626C, #20242B)", border: `3px solid ${a.c}`, boxShadow: `0 0 10px ${a.c}66`, opacity: 0.86, zIndex: 26 }} />
            {/* the boom arm, rotating from the pivot */}
            <div style={{ position: "absolute", left: a.bx, top: a.by - 7, width: a.len, height: 14, transformOrigin: "0% 50%", transform: `rotate(${a.ang}deg)`, borderRadius: 7, background: "linear-gradient(180deg,#6A727C,#2A2F36)", boxShadow: "0 3px 8px rgba(0,0,0,0.55)", opacity: 0.86, zIndex: 26 }}>
              <div style={{ position: "absolute", left: "42%", top: 3, width: 8, height: 8, borderRadius: "50%", background: a.c, boxShadow: `0 0 7px ${a.c}` }} />
              {/* the torch head at the far tip */}
              <div style={{ position: "absolute", left: a.len - 16, top: -4, width: 22, height: 22, borderRadius: 5, background: "linear-gradient(180deg,#4A525C,#20242B)", border: `2px solid ${CHROME}` }} />
            </div>
            {/* the bright weld flash + continuous sparks at the torch tip */}
            <div style={{ position: "absolute", left: a.tipX - 22, top: a.tipY - 22, width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle, #FFF, ${a.c}66, transparent 70%)`, filter: "blur(3px)", opacity: (0.2 + powerOn * 0.34) * (0.4 + weldPhase * 0.6), mixBlendMode: "screen", zIndex: 27, pointerEvents: "none" }} />
            <Sparks lf={lf + a.sd} x={a.tipX} y={a.tipY} on={(0.24 + powerOn * 0.38) * (0.5 + weldPhase * 0.5)} color={NEONORANGE} n={10} z={28} />
            <Sparks lf={lf + a.sd + 7} x={a.tipX} y={a.tipY} on={(0.17 + powerOn * 0.28) * (0.5 + weldPhase * 0.5)} color={a.c} n={5} z={28} />
          </React.Fragment>
        ))}

        {/* 5d. drifting COLOURED HAZE across the beams so the air itself reads vibrant and moving. Kept
                alive, thinned so it tints the air instead of veiling the paint. */}
        <Haze lf={lf} x={120} y={300} w={340} h={300} color={ELECTRIC} o={0.15 + powerOn * 0.24} n={5} sd={2} />
        <Haze lf={lf + 40} x={560} y={280} w={360} h={320} color={MAGENTA} o={0.13 + powerOn * 0.22} n={5} sd={9} />
        <Haze lf={lf + 20} x={340} y={360} w={360} h={280} color={CYAN} o={0.11 + powerOn * 0.2} n={4} sd={5} />

        {/* 6. DUST + light haze drifting in the key beams (only once the rig is on) */}
        {powerOn > 0.1 && Array.from({ length: 20 }, (_, k) => {
          const s = seed(k * 2.3 + 4);
          const bx = 110 + (k % 5) * 190;
          const drift = ((lf * (0.3 + s * 0.5) + s * 200) % 150);
          const yy = 250 + s * 190;
          return <div key={"du" + k} style={{ position: "absolute", left: bx + s * 70, top: yy + drift * 0.3 + Math.sin(lf / 20 + k) * 8, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: "rgba(255,240,214,0.8)", opacity: dustO * (0.16 + s * 0.3), zIndex: 12, pointerEvents: "none" }} />;
        })}

        {/* 7. THE PRE THROW SCRIM: a deep BLUE dim (never black) until the switch is thrown, so the two
               already forming cars + the hero at the master switch are the read, and nothing starts empty. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "rgba(10,13,32,1)", opacity: scrimO, zIndex: 13 }} />

        {/* a warm worklamp cone + pool holding the hero and switch as the pre throw subject */}
        <Spotlight x={820} y={124} w={300} h={470} color="#FFE7B8" o={lampO} poolY={648} poolW={330} />
        {/* a PULSING coloured signage lettermark high on the back wall, pushed RIGHT so it never collides
               with the pinned THE ASSEMBLY PLANT scene tag. Dimmed so a big glowing word does not outrank
               the car line as the first thing the eye grabs. */}
        <NeonSign x={600} y={204} text="ASSEMBLY" color={CYAN} size={34} on={(0.18 + powerOn * 0.34) * signPulse} z={17} />

        {/* 8. TAKE ONE: grey, flag lowered, tiny and stranded on the deck below the cars. He can only
               ever do ONE, so he is dwarfed by five at once. His cool aura dies as the warm floods in. */}
        <div style={{ position: "absolute", left: 448, top: 636, width: 130, height: 60, borderRadius: "50%", background: `radial-gradient(ellipse, ${COOL}, transparent 66%)`, opacity: t1AuraO * 0.7, filter: "blur(9px)", zIndex: 29, pointerEvents: "none" }} />
        <CastShadow x={506} y={712} w={90} o={0.5} />
        <div style={{ position: "absolute", left: 466, top: 646, zIndex: 31 }}>
          <Villain lf={lf} size={80} rim={0.5} flag={1} lowered={1} gaze={t1gaze} nodAmp={1.1} nodSpeed={18} />
        </div>

        {/* 9. (removed) the lower left pit kid cameo was clipped by the panel bottom edge and read as a
               stray duplicate mascot; the single Take One (grey) + the single clay hero are the only figures. */}

        {/* 10. THE HERO (clay, alone) walks in and reaches for the switch. A soft cool rim separates him
                from the warm floor. */}
        <div style={{ position: "absolute", left: heroX - 8, top: 502, width: 200, height: 130, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, ${COOL}, transparent 64%)`, opacity: 0.26, filter: "blur(10px)", zIndex: 33, pointerEvents: "none" }} />
        <CastShadow x={heroX + 76} y={666} w={128} o={0.44} />
        <div style={{ position: "absolute", left: heroX, top: 488, zIndex: 34, filter: `drop-shadow(0 0 3px ${COOL}66) drop-shadow(0 8px 12px rgba(0,0,0,0.7))` }}>
          <Mascot lf={lf} size={150} tint={HERO} capBack={1} gaze={1.6} cheer={heroCheer} nodSpeed={8} />
        </div>
        {/* his reaching clay arm + hand landing on the handle */}
        {reach > 0.02 && <>
          <div style={{ position: "absolute", left: shoulderX, top: handY - 10, width: Math.max(0, handX - shoulderX), height: 20, background: HERO, borderRadius: 11, boxShadow: "0 2px 6px rgba(0,0,0,0.45)", zIndex: 35 }} />
          <div style={{ position: "absolute", left: handX - 13, top: handY - 15, width: 30, height: 30, background: HERO, borderRadius: 9, boxShadow: "0 2px 6px rgba(0,0,0,0.45)", zIndex: 36 }}>
            <div style={{ position: "absolute", left: 4, top: 3, width: 22, height: 6, background: "rgba(255,255,255,0.22)", borderRadius: 4 }} />
          </div>
        </>}

        {/* 11. THE MASTER SWITCH: a fat red master handle on a brushed steel control cabinet, thrown at
                f38. Real materials: graphite body, chrome edges, indicator lamps, a warm hit on throw. */}
        <div style={{ position: "absolute", left: 838, top: 486, zIndex: 37 }}>
          <div style={{ position: "relative", width: 120, height: 176, borderRadius: 9, background: "linear-gradient(160deg,#2E343C,#15171B)", border: `3px solid ${throwHit > 0.3 ? "#C0442F" : "#3A4149"}`, boxShadow: throwHit > 0.3 ? "0 0 34px rgba(226,132,60,0.5), 0 10px 24px rgba(0,0,0,0.5)" : "inset 0 2px 0 rgba(255,255,255,0.08), 0 10px 24px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 10, top: 10, right: 10, bottom: 10, borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", left: 12, top: 14, right: 12, height: 8, borderRadius: 3, background: throwHit > 0.3 ? RED : "#2A2F36", boxShadow: throwHit > 0.3 ? `0 0 12px ${RED}` : "none" }} />
            {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 16 + k * 21, top: 32, width: 12, height: 12, borderRadius: "50%", background: (k === 0 && throwHit > 0.3) ? LIME : k === 2 ? NEONGOLD : "#2A2F36", boxShadow: (k === 0 && throwHit > 0.3) ? `0 0 8px ${LIME}` : "none" }} />)}
            <div style={{ position: "absolute", left: 26, top: 68, width: 12, height: 42, borderRadius: 3, background: `linear-gradient(180deg,${CHROME},#7A828C)` }} />
            <div style={{ position: "absolute", left: 82, top: 68, width: 12, height: 42, borderRadius: 3, background: `linear-gradient(180deg,${CHROME},#7A828C)` }} />
            {/* the fat red master handle swings DOWN on the throw */}
            <div style={{ position: "absolute", left: 30, top: 76, width: 76, height: 20, transformOrigin: "6px 10px", transform: `rotate(${leverRot}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 76, height: 20, borderRadius: 10, background: "linear-gradient(180deg,#EE5237,#B12A20)", border: "2px solid #7A1A14", boxShadow: "0 4px 10px rgba(0,0,0,0.6)" }} />
              <div style={{ position: "absolute", left: 62, top: -4, width: 22, height: 28, borderRadius: 7, background: "linear-gradient(180deg,#FF6E58,#C4342A)", border: "2px solid #7A1A14" }} />
            </div>
            <div style={{ position: "absolute", left: 54, top: 172, width: 12, height: 100, borderRadius: 6, background: "linear-gradient(180deg,#20242B,#121418)" }} />
          </div>
        </div>

        {/* 11b. PATTERN INTERRUPT: a POWER SURGE blows the far right cell (VIOLET bay 05) mid build. The
                whole hall FLICKERS dark for a beat, a hard arc flash cracks at the panel head, a bolt
                streaks down and a hot shower of sparks blows out, the cell goes dead, then the rig
                recovers and it strikes back on. Sudden + unexpected, synced to a spark + a clang. */}
        {plantFlicker > 0.001 && (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, background: "rgba(6,9,20,1)", opacity: plantFlicker * 0.64, zIndex: 53, pointerEvents: "none" }} />
        )}
        {(surgeSpark > 0.01 || bayDead > 0.01 || bayRecover > 0.01) && (
          <>
            {/* the blown cell drops DARK: the rig browns out at that one bay while the rest keep building */}
            <div style={{ position: "absolute", left: 744, top: 236, width: 236, height: 356, borderRadius: 8, background: "linear-gradient(180deg,#05070E,#02030A)", opacity: bayDead * 0.8, zIndex: 52, pointerEvents: "none" }} />
            {/* the hard white ARC FLASH core cracking at the panel head */}
            <div style={{ position: "absolute", left: 732, top: 150, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, #FFFFFF, #C6E8FF 24%, transparent 62%)", opacity: surgeArc * 0.95, mixBlendMode: "screen", filter: "blur(3px)", zIndex: 56, pointerEvents: "none" }} />
            {/* a jagged electric BOLT streaking down the dead bay */}
            <svg width={220} height={340} style={{ position: "absolute", left: 752, top: 176, overflow: "visible", zIndex: 57, opacity: surgeArc, pointerEvents: "none" }}>
              <path d="M 112 0 L 132 86 L 90 116 L 134 214 L 96 246 L 120 340" fill="none" stroke="#EAF6FF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${CYAN}) drop-shadow(0 0 3px #FFF)` }} />
            </svg>
            {/* the spark BLOWOUT: a hot shower bursting off the panel head, warm core + electric blue tails */}
            <Sparks lf={lf} x={862} y={286} on={surgeSpark} color="#FFD59A" n={16} z={58} />
            <Sparks lf={lf + 6} x={862} y={286} on={surgeSpark * 0.9} color={CYAN} n={11} z={58} />
            <Sparks lf={lf + 3} x={862} y={300} on={surgeSpark * 0.8} color="#FFFFFF" n={7} z={58} />
            {/* the RECOVER pop: the cell strikes back to full and its VIOLET rim LEDs flare bright for a beat */}
            <div style={{ position: "absolute", left: 758, top: 250, width: 208, height: 300, borderRadius: 8, background: `radial-gradient(circle, ${VIOLET}, transparent 62%)`, opacity: bayRecover * 0.7, mixBlendMode: "screen", zIndex: 55, pointerEvents: "none" }} />
          </>
        )}

        {/* 12. THE POWER ON BLOOM: a soft warm core flash + a gentle bloom lifting out of each station.
                Warm and diffuse, a rig coming up to power, NOT a neon burst. */}
        {bays.map((b, i) => (
          <div key={"bl" + i} style={{ position: "absolute", left: b.cx - 150, top: 250, width: 300, height: 340, borderRadius: "50%", background: `radial-gradient(circle, ${b.hue}, transparent 60%)`, opacity: flashO * 0.4, mixBlendMode: "screen", zIndex: 54, pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 46%, rgba(255,246,224,0.9), rgba(255,220,170,0.4) 34%, transparent 64%)", opacity: flashO, mixBlendMode: "screen", zIndex: 55, pointerEvents: "none" }} />
        {/* a CYAN power shockwave ring expands out of the master switch on the throw */}
        {throwHit > 0.02 && throwHit < 1 && (
          <div style={{ position: "absolute", left: 898 - throwHit * 620, top: 560 - throwHit * 620, width: throwHit * 1240, height: throwHit * 1240, borderRadius: "50%", border: `${6 * (1 - throwHit)}px solid ${CYAN}`, opacity: (1 - throwHit) * 0.8, boxShadow: `0 0 30px ${CYAN}`, mixBlendMode: "screen", zIndex: 55, pointerEvents: "none" }} />
        )}

        {/* 12b. THE FOCUS VIGNETTE (inside the camera, so it cranes with the shot): a wide soft ellipse
                 centred on the car line. It leaves all five bays clean and dips the top hall band, the
                 flanks and the near deck, so the eye is funnelled onto the candy paint in a split second.
                 It sits under the near foreground columns so those still read as solid near geometry. */}
        <div style={{ position: "absolute", left: -60, top: -60, width: 1132, height: 912, background: "radial-gradient(ellipse 44% 34% at 50% 66%, rgba(0,0,0,0) 0%, rgba(4,6,14,0.18) 56%, rgba(4,6,14,0.5) 78%, rgba(3,4,10,0.72) 100%)", zIndex: 49, pointerEvents: "none" }} />
        {/* an extra top dip so the busy roof / conveyor band never out punches the cars */}
        <div style={{ position: "absolute", left: -60, top: -60, width: 1132, height: 320, background: "linear-gradient(180deg, rgba(3,5,12,0.5), rgba(3,5,12,0))", zIndex: 49, pointerEvents: "none" }} />

        {/* 13. FOREGROUND depth: two dark brushed steel columns + a near catwalk rail + a hazard chevron
                floor stripe we crane over. Chrome edges catch the key, no neon. Pulled to near silhouette
                so the near frame reads as dark framing, not detail competing with the paint. */}
        <div style={{ position: "absolute", left: -8, top: -40, width: 64, height: 900, background: "linear-gradient(90deg,#07080B,#1A1E24)", boxShadow: "inset -3px 0 12px rgba(0,0,0,0.7), inset -1px 0 0 rgba(255,255,255,0.05)", zIndex: 50 }}>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 40, top: 120 + k * 130, width: 8, height: 8, borderRadius: "50%", background: "#05060A" }} />)}
        </div>
        <div style={{ position: "absolute", left: 956, top: -40, width: 76, height: 900, background: "linear-gradient(270deg,#07080B,#1A1E24)", boxShadow: "inset 3px 0 12px rgba(0,0,0,0.7), inset 1px 0 0 rgba(255,255,255,0.05)", zIndex: 50 }}>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 14, top: 120 + k * 130, width: 8, height: 8, borderRadius: "50%", background: "#05060A" }} />)}
        </div>
        {/* a SCROLLING hazard chevron conveyor on the near deck (moving safety marking) with a CYAN edge
             glow. Still scrolling at full speed, just darker so the near deck stops flickering for the eye. */}
        <div style={{ position: "absolute", left: -20, top: 726, width: 1052, height: 18, background: "repeating-linear-gradient(45deg,#8E7220 0 20px,#131519 20px 40px)", backgroundPositionX: -convScroll, opacity: 0.42 + powerOn * 0.2, zIndex: 50 }} />
        <div style={{ position: "absolute", left: -20, top: 724, width: 1052, height: 3, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, opacity: (0.2 + powerOn * 0.32) * ledPulse, boxShadow: `0 0 8px ${CYAN}`, zIndex: 50 }} />
        <div style={{ position: "absolute", left: -20, top: 748, width: 1052, height: 58, background: "linear-gradient(180deg,#0B0C0F,#040508)", filter: "blur(1px)", zIndex: 51 }} />
        <div style={{ position: "absolute", left: -20, top: 744, width: 1052, height: 7, background: "linear-gradient(90deg,#1B1F25,#4A525C,#1B1F25)", zIndex: 51 }} />
        {Array.from({ length: 11 }, (_, k) => <div key={"post" + k} style={{ position: "absolute", left: 20 + k * 96, top: 748, width: 9, height: 46, background: "#0B0C0F", filter: "blur(1px)", zIndex: 51 }} />)}
      </div>

      {/* =============== SCREEN SPACE OVERLAYS (outside the camera) =============== */}
      <SceneTag f={lf} text="THE ASSEMBLY PLANT" color={KEY} x={40} y={210} />
      <Vig o={0.42} />
    </AbsoluteFill>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  // FIVE SEALED GLASS BUILD BAYS, ALL IN ONE FRAME, lit like a HIGH-END CAR COMMERCIAL WITH BOLD COLOUR
  // GELS. The VO thesis ("five separate copies and none of them can see what the others are doing") stays
  // LITERAL: five stalls side by side, each walled off by solid brushed steel dividers and a frosted glass
  // front, each with its own grey copy and its own distinct candy car, plates 01..05, hero centre in the
  // foreground, mascots stand BESIDE their cars. UNCHANGED story + camera + gel identity + motion.
  // HIERARCHY PASS: the ONE focal point is THE RANK OF FIVE SEALED BAYS AND THEIR CARS. So the bays now
  // run brighter, more saturated and sharper, sit in a warm elliptical LIGHT POOL of their own, carry a
  // cool RIM LIGHT edge that separates them from the hall, and everything else is pushed back: the whole
  // secure corridor behind is wrapped in one dimming grade (brightness 0.72, saturate 0.66, contrast 0.88,
  // extra blur) yet keeps every animated detail, the ceiling beacons + softboxes + gels are toned down,
  // and a tight focal vignette closes the frame edges so the eye lands on the rank instantly.
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const cubic = Easing.inOut(Easing.cubic);

  // premium materials reused across every stall (real materials, no cheap neon tube)
  const steelCol = "linear-gradient(90deg,#242930,#5A626C,#242930)";

  // CAMERA: a slow push in + a gentle breathe, still drifting at f81 (never locked off)
  const push = interpolate(lf, [0, 81], [1.006, 1.05], { ...clamp, easing: cubic });
  const camX = Math.sin(lf * 0.05) * 4;
  const camY = interpolate(lf, [0, 81], [4, -5], clamp) + Math.sin(lf * 0.14) * 2.2;
  const glint = interpolate(lf, [6, 34, 66], [0, 1, 0.32], clamp);   // a specular sweep travels the glass fronts
  const bloom = over(lf, 0, 12);                                     // the rig eases up as the shot opens

  // LIVE motion drivers (all loop, so the frame is still alive at f81)
  const ceilPulse = 0.85 + 0.15 * Math.sin(lf * 0.5);               // the ceiling key breathes
  const scanX = ((lf * 15) % 1160) - 70;                            // a bright cyan inspection scan rakes the rank
  const barA = 120 + Math.sin(lf * 0.06) * 70;                      // a drifting cyan gel bar
  const barB = 600 + Math.cos(lf * 0.05) * 90;                      // a drifting orange gel bar
  const washBreath = 0.9 + 0.1 * Math.sin(lf * 0.4);               // the big colour gels swell and settle
  const poolBreath = 0.92 + 0.08 * Math.sin(lf * 0.34);            // the focal light pool over the rank breathes

  // ---- BACKGROUND SECURE FACILITY CORRIDOR drivers (a deep hall behind the rank, always alive) ----
  const hallVPx = 506, hallVPy = 234;              // the corridor converges on a heavy blast door here
  const doorSpin = lf * 2.1;                       // the vault lock wheel turns the whole scene
  const coolant = (lf * 1.5) % 120;                // bright coolant slugs run the pipes toward the door
  const hallScan = (lf * 8) % 620;                 // a security scan rakes across the corridor and wraps
  const patrol = 0.5 + 0.5 * Math.sin(lf * 0.09);  // a slow patrol light tracks down the hall floor
  const hallBreath = 0.6 + 0.4 * Math.sin(lf * 0.26); // the whole hall lighting swells and settles
  const dataScroll = (lf * 2.4) % 42;              // conduit + monitor data pulses scroll toward the door

  // ONE grade applied to the entire corridor so it clearly READS AS BACKGROUND: dimmer, cooler, softer,
  // lower contrast. All of its animation survives untouched, it just stops competing with the rank.
  const bgGrade = "blur(2px) brightness(0.72) saturate(0.66) contrast(0.88)";

  // five sealed stalls in a depth rank. Centre = the big lit HERO in front, two smaller sealed stalls
  // set back on each side. Each keeps its distinct candy car + its own vivid accent hue, now run HOTTER
  // than before so the rank is the brightest, most saturated thing in the frame.
  const bays = [
    { cx: 104, y: 480, s: 0.50, halfW: 74,  solve: 1, hue: MAGENTA,    sign: "SEALED",  lit: 0.66, no: "01", copy: 48, side: -1 },
    { cx: 272, y: 500, s: 0.62, halfW: 90,  solve: 3, hue: LIME,       sign: "LOCKED",  lit: 0.84, no: "02", copy: 58, side: -1 },
    { cx: 506, y: 566, s: 0.86, halfW: 160, solve: 2, hue: CYAN,       sign: "NO PEEK", lit: 1.24, no: "03", copy: 98, side: 0, hero: true },
    { cx: 740, y: 500, s: 0.62, halfW: 90,  solve: 4, hue: NEONORANGE, sign: "SOLO",    lit: 0.84, no: "04", copy: 58, side: 1 },
    { cx: 908, y: 480, s: 0.50, halfW: 74,  solve: 5, hue: VIOLET,     sign: "WALLED",  lit: 0.66, no: "05", copy: 48, side: 1 },
  ];

  return (
    <AbsoluteFill>
      {/* a graphite base so the push in never flashes the cream panel behind the moving world */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${NIGHT2}, ${CHARCOAL})` }} />

      {/* =============== EVERYTHING BELOW LIVES INSIDE THE PUSH IN CAMERA =============== */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `scale(${push}) translate(${camX}px, ${camY}px)`, transformOrigin: "50% 58%" }}>
        {/* oversize graphite cyc so the push in never reveals a bare edge */}
        <div style={{ position: "absolute", left: -90, top: -70, width: 1192, height: 960, background: "radial-gradient(ellipse at 52% 30%, #23272E 0%, #14161B 62%, #0A0B0E 100%)", zIndex: 0 }} />

        {/* the seamless graphite cyc + a glossy reflective studio floor: gels now reflect ELECTRIC + MAGENTA */}
        <GarageFloor horizon={452} hue={KEY} o={1} gel={ELECTRIC} gel2={MAGENTA} />

        {/* ==== BOLD SATURATED COLOUR GELS thrown across the whole set (screen-blended, so they ADD light
               and the frame reads vibrant). ELECTRIC blue vs MAGENTA, complementary, plus a PURPLE crown
               up high and two raking CYAN + ORANGE bars that drift the whole shot. They are eased back a
               notch from before so the gels colour the room without out-shouting the cars. ==== */}
        <GelWash x={168} y={356} w={780} h={740} color={ELECTRIC} o={(0.24 + bloom * 0.05) * washBreath} blur={82} />
        <GelWash x={868} y={356} w={760} h={740} color={MAGENTA}  o={0.22 * washBreath} blur={82} />
        <GelWash x={506} y={140} w={660} h={420} color={PURP}     o={0.13 + bloom * 0.04} blur={84} />
        <GelBar x={barA} y={190} w={780} h={150} color={CYAN}       o={0.2 * washBreath} rot={-8} />
        <GelBar x={barB} y={470} w={660} h={140} color={NEONORANGE} o={0.15} rot={7} />

        {/* ---- THE LIT STUDIO CEILING: a steel deck + a warning band + a row of hung softboxes and a warm
               ambient wash up high, plus a dim graphite back wall, so the upper studio reads as a real
               lit ceiling and wall, never a dead black void. Now the key wash BREATHES. ---- */}
        <div style={{ position: "absolute", left: -40, top: -40, width: 1092, height: 420, background: "linear-gradient(180deg, rgba(44,51,60,0.45) 0%, rgba(26,30,36,0.42) 24%, rgba(15,18,22,0.36) 58%, transparent 100%)", zIndex: 2 }} />
        {/* a dim graphite back wall behind the whole rank (kills the black gap between ceiling and bays) */}
        <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 250, background: "linear-gradient(180deg, rgba(30,34,40,0.5) 0%, rgba(18,21,25,0.3) 60%, transparent 100%)", zIndex: 2 }} />

        {/* ================= BACKGROUND: SECURE FACILITY CORRIDOR (three receding depth layers) ==========
             A hall of MORE sealed bays + pipework + cable conduit + wall monitors recedes to a heavy blast
             door behind the rank. EVERY part of it is still animated and still moving at f81, but the whole
             hall is now wrapped in ONE grading layer (dimmed, desaturated, softened, lower contrast) so it
             supports the rank instead of fighting it. Far layers also carry extra blur of their own. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: bgGrade, opacity: 0.96, pointerEvents: "none" }}>

          {/* -- FAR LAYER: the cold hall shell + a depth haze at the vanishing point + converging edges -- */}
          <div style={{ position: "absolute", left: 196, top: 150, width: 620, height: 208, borderRadius: 6, background: "radial-gradient(ellipse at 50% 44%, #182934 0%, #101923 44%, #080D13 100%)", filter: "blur(5px)", zIndex: 1 }} />
          <div style={{ position: "absolute", left: hallVPx - 140, top: hallVPy - 64, width: 280, height: 180, background: `radial-gradient(ellipse, ${AZURE}, transparent 66%)`, filter: "blur(26px)", mixBlendMode: "screen", opacity: 0.26 * hallBreath, zIndex: 1 }} />
          {[[200, 154], [812, 154], [200, 356], [812, 356]].map(([nx, ny], k) => { const dx = hallVPx - nx, dy = hallVPy - ny, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI; return (
            <div key={"pe" + k} style={{ position: "absolute", left: nx, top: ny, width: len, height: 2, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, background: `linear-gradient(90deg, ${FILL}44, transparent)`, opacity: 0.24 * hallBreath, filter: "blur(1.6px)", zIndex: 1 }} />); })}

          {/* -- MID LAYER: receding SEALED BAYS down both walls, each with a STATUS LIGHT cycling green/red -- */}
          {[-1, 1].map((sd) => Array.from({ length: 4 }, (_, k) => {
            const d = k / 3.4;                                          // 0 near, 1 deep at the door
            const nearX = sd < 0 ? 244 : 768;
            const cx = nearX + (hallVPx - nearX) * d * 0.9;
            const cy = 250 + (hallVPy - 250) * d;
            const w = 54 - 38 * d, h = 118 - 82 * d;
            const hue = [MAGENTA, CYAN, ELECTRIC, VIOLET][k];
            const green = Math.sin(lf * 0.12 + k * 1.7 + sd * 0.9) > 0; // each bay light slowly toggles
            const stCol = green ? LIME : HOTRED;
            const flick = 0.6 + 0.4 * Math.abs(Math.sin(lf * 0.5 + k * 2 + sd));
            const dim = (0.5 + 0.5 * (1 - d)) * hallBreath;
            return (
              <React.Fragment key={"hb" + sd + "_" + k}>
                {/* the recessed sealed bay mouth, deeper ones smaller + much more blurred */}
                <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: 4, background: "linear-gradient(180deg,#19202A,#0A1017)", border: `1px solid ${FILL}22`, boxShadow: "inset 0 0 14px rgba(0,0,0,0.7)", filter: `blur(${1.4 + d * 3.2}px)`, opacity: 0.72 * dim, zIndex: 2 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: `radial-gradient(ellipse at 50% 40%, ${hue}, transparent 70%)`, opacity: 0.32 * flick * dim, mixBlendMode: "screen" }} />
                </div>
                {/* the status light cycling green/red at the foot of each recessed bay */}
                <div style={{ position: "absolute", left: cx - 3, top: cy + h / 2 - 8, width: 6, height: 6, borderRadius: "50%", background: stCol, boxShadow: `0 0 ${4 + 4 * flick}px ${stCol}`, opacity: (0.55 + 0.25 * flick) * dim, filter: `blur(${0.8 + d * 1.6}px)`, zIndex: 3 }} />
              </React.Fragment>); }))}

          {/* -- WALL MONITORS on each side wall, flickering scrolling diagnostic data -- */}
          {[[286, 214], [726, 214]].map(([mx, my], k) => { const fl = 0.55 + 0.45 * Math.abs(Math.sin(lf * 0.8 + k * 3)); return (
            <div key={"mon" + k} style={{ position: "absolute", left: mx - 22, top: my - 15, width: 44, height: 30, borderRadius: 3, background: "#08111B", border: `1px solid ${FILL}33`, filter: "blur(1.4px)", opacity: 0.72 * hallBreath, overflow: "hidden", zIndex: 3 }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${CYAN}, transparent 72%)`, opacity: 0.22 * fl, mixBlendMode: "screen" }} />
              {Array.from({ length: 4 }, (_, r) => { const bw = 12 + seed(k * 3 + r) * 16; const off = (dataScroll + r * 9) % 42; return (
                <div key={r} style={{ position: "absolute", left: 4, top: 4 + r * 6, width: bw, height: 2, background: r % 2 ? AZURE : CYAN, opacity: (0.3 + 0.36 * fl) * (1 - off / 42), boxShadow: `0 0 3px ${CYAN}` }} />); })}
            </div>); })}

          {/* -- PIPEWORK running along the top of the hall to the door, a COOLANT slug racing each pipe -- */}
          {[168, 150, 132].map((topY, p) => { const nyBase = topY + 6; const pc = [TEAL, AZURE, CYAN][p]; const slug = ((coolant + p * 34) % 120) / 120; const nxL = 220 + p * 8; return (
            <React.Fragment key={"pipe" + p}>
              {[nxL, 1012 - nxL].map((sx, s) => { const ddx = hallVPx - sx, ddy = (hallVPy - 20) - nyBase, ll = Math.hypot(ddx, ddy), aa = Math.atan2(ddy, ddx) * 180 / Math.PI; return (
                <div key={s} style={{ position: "absolute", left: sx, top: nyBase, width: ll, height: 3, transformOrigin: "0 0", transform: `rotate(${aa}deg)`, background: "linear-gradient(90deg,#242D36,#161D25)", opacity: 0.42 * hallBreath, filter: "blur(1.4px)", zIndex: 2 }}>
                  {/* the bright coolant slug travelling toward the door */}
                  <div style={{ position: "absolute", left: `${slug * 100}%`, top: -1, width: 14, height: 5, borderRadius: 3, background: pc, boxShadow: `0 0 6px ${pc}`, opacity: (1 - slug) * 0.7, transform: "translateX(-50%)" }} />
                </div>); })}
            </React.Fragment>); })}

          {/* -- CONDUIT / cable tray low on each wall with data pulses scrolling to the vanishing point -- */}
          {[-1, 1].map((sd) => { const nx = sd < 0 ? 232 : 780, ny = 322; const dx = hallVPx - nx, dy = (hallVPy + 30) - ny, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI; return (
            <div key={"cd" + sd} style={{ position: "absolute", left: nx, top: ny, width: len, height: 5, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, background: "repeating-linear-gradient(90deg,#1F262E 0 6px,#13181E 6px 12px)", opacity: 0.38 * hallBreath, filter: "blur(1.4px)", zIndex: 2, overflow: "hidden" }}>
              {Array.from({ length: 3 }, (_, q) => { const pos = ((dataScroll * 1.4 + q * 14) % 42) / 42; return (
                <div key={q} style={{ position: "absolute", left: `${pos * 100}%`, top: 0, width: 5, height: 5, borderRadius: "50%", background: NEONORANGE, boxShadow: `0 0 5px ${NEONORANGE}`, opacity: (1 - pos) * 0.62 }} />); })}
            </div>); })}

          {/* -- THE HEAVY BLAST DOOR at the end of the hall: a vault with a turning lock wheel + a hot seam -- */}
          <div style={{ position: "absolute", left: hallVPx - 40, top: hallVPy - 44, width: 80, height: 88, borderRadius: 8, background: "linear-gradient(150deg,#333A44,#151A20)", border: "2px solid #3F464F", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.07), 0 6px 16px rgba(0,0,0,0.6)", filter: "blur(2px)", zIndex: 2, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 8, background: "repeating-linear-gradient(45deg,#9C802A 0 8px,#171A1D 8px 16px)", opacity: 0.55 }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 8, background: "repeating-linear-gradient(45deg,#9C802A 0 8px,#171A1D 8px 16px)", opacity: 0.55 }} />
            {/* a hot seam splitting the two door halves, pulsing */}
            <div style={{ position: "absolute", left: "50%", top: 8, bottom: 8, width: 2, background: NEONORANGE, boxShadow: `0 0 8px ${NEONORANGE}`, opacity: 0.3 + 0.3 * hallBreath, transform: "translateX(-50%)" }} />
          </div>
          {/* the rotating lock wheel bolted on the door */}
          <div style={{ position: "absolute", left: hallVPx - 15, top: hallVPy - 15, width: 30, height: 30, borderRadius: "50%", border: `3px solid ${FILL}`, background: `conic-gradient(from ${doorSpin}deg, #4C535C, #24282E 90deg, #4C535C 180deg, #24282E 270deg, #4C535C 360deg)`, boxShadow: "0 0 8px rgba(0,0,0,0.6)", filter: "blur(1.4px)", opacity: 0.85, zIndex: 3 }}>
            {Array.from({ length: 4 }, (_, sp) => (
              <div key={sp} style={{ position: "absolute", left: "50%", top: "50%", width: 30, height: 3, marginTop: -1.5, marginLeft: -15, background: "#5B626B", transformOrigin: "50% 50%", transform: `rotate(${doorSpin + sp * 45}deg)` }} />
            ))}
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, marginTop: -4, marginLeft: -4, borderRadius: "50%", background: "#333A41", border: "1px solid #5B626B" }} />
          </div>

          {/* -- SECURITY SCAN sweeping across the corridor (confined to the hall band, cool + soft) -- */}
          <div style={{ position: "absolute", left: 196 + hallScan, top: 152, width: 5, height: 204, background: `linear-gradient(180deg, transparent, ${CYAN}, transparent)`, boxShadow: `0 0 12px ${CYAN}`, filter: "blur(2px)", mixBlendMode: "screen", opacity: 0.32 + 0.2 * Math.sin(lf * 0.6), zIndex: 3 }} />
          <div style={{ position: "absolute", left: 196 + hallScan - 26, top: 152, width: 52, height: 204, background: `linear-gradient(90deg, transparent, ${CYAN}33, transparent)`, filter: "blur(14px)", mixBlendMode: "screen", opacity: 0.26, zIndex: 3 }} />

          {/* -- PATROL LIGHT: a slow soft cone drifting down the hall floor near the door -- */}
          <div style={{ position: "absolute", left: 260 + patrol * 380, top: 300, width: 120, height: 70, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}, transparent 68%)`, filter: "blur(18px)", mixBlendMode: "screen", opacity: 0.2 * hallBreath, zIndex: 2 }} />

          {/* -- NEAR LAYER (sharpest of the hall, still clearly behind the rank): two conduit pillars -- */}
          {[-1, 1].map((sd) => { const px = sd < 0 ? 198 : 806; return (
            <div key={"np" + sd} style={{ position: "absolute", left: px - 7, top: 148, width: 14, height: 212, borderRadius: 4, background: "linear-gradient(90deg,#2C333C,#161B21,#2C333C)", boxShadow: "0 3px 10px rgba(0,0,0,0.6)", opacity: 0.9, zIndex: 3, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.035) 0 4px, transparent 4px 10px)" }} />
              {Array.from({ length: 3 }, (_, q) => { const pos = ((lf * 1.6 + q * 24 + (sd > 0 ? 12 : 0)) % 72) / 72; return (
                <div key={q} style={{ position: "absolute", left: 3, top: `${pos * 100}%`, width: 8, height: 6, borderRadius: 2, background: ELECTRIC, boxShadow: `0 0 5px ${ELECTRIC}`, opacity: (1 - pos) * 0.6 }} />); })}
            </div>); })}
        </div>

        {/* a haze scrim sitting between the corridor and the rank: pure atmospheric depth separation, so the
             hall visibly sits BEHIND the bays instead of level with them. It drifts, so it stays alive. */}
        <div style={{ position: "absolute", left: 120 + Math.sin(lf * 0.07) * 26, top: 168, width: 780, height: 250, background: "linear-gradient(180deg, rgba(20,26,34,0.2), rgba(16,21,28,0.32))", filter: "blur(26px)", zIndex: 3, pointerEvents: "none" }} />

        {/* ==== FOCAL LIGHT POOL ON THE RANK: one big warm elliptical pool washing all five bays, so the row
               of sealed cars is the brightest region in frame. It sits under the bays and breathes. ==== */}
        <div style={{ position: "absolute", left: 26, top: 336, width: 960, height: 430, background: "radial-gradient(ellipse 50% 50% at 50% 54%, rgba(255,238,206,0.3) 0%, rgba(255,232,196,0.13) 46%, transparent 74%)", filter: "blur(24px)", mixBlendMode: "screen", opacity: (0.7 + bloom * 0.3) * poolBreath, zIndex: 3, pointerEvents: "none" }} />
        {/* a tighter hot core of that pool centred on the hero bay */}
        <div style={{ position: "absolute", left: 266, top: 372, width: 480, height: 380, background: "radial-gradient(ellipse 50% 50% at 50% 58%, rgba(255,244,220,0.34) 0%, transparent 70%)", filter: "blur(22px)", mixBlendMode: "screen", opacity: (0.68 + bloom * 0.32) * poolBreath, zIndex: 3, pointerEvents: "none" }} />
        {/* the floor bounce of that pool, a bright glossy strip the whole rank stands on */}
        <div style={{ position: "absolute", left: 60, top: 556, width: 892, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,236,200,0.22), transparent 68%)", filter: "blur(22px)", mixBlendMode: "screen", opacity: 0.8 * poolBreath, zIndex: 3, pointerEvents: "none" }} />

        {/* a soft warm key wash spilling down from the ceiling over the whole rank, pulsing */}
        <div style={{ position: "absolute", left: 40, top: -30, width: 932, height: 380, background: `radial-gradient(ellipse 64% 100% at 50% 0%, ${KEY}18, transparent 66%)`, opacity: (0.34 + bloom * 0.3) * ceilPulse, filter: "blur(16px)", zIndex: 3 }} />
        {/* the steel ceiling deck + a warning band, both toned down so the top of frame stops shouting */}
        <div style={{ position: "absolute", left: 0, top: 34, width: 1012, height: 20, background: "linear-gradient(180deg,#3A424C,#20242A)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.08), 0 8px 16px rgba(0,0,0,0.5)", opacity: 0.82, zIndex: 7 }} />
        <div style={{ position: "absolute", left: 0, top: 54, width: 1012, height: 10, background: "repeating-linear-gradient(45deg,#9A7E24 0 15px,#16181B 15px 30px)", opacity: 0.5, zIndex: 7 }} />

        {/* ROTATING CEILING BEACONS: still spinning coloured cones, now dimmer + softer so they read as
             ambience above the rank rather than as a second focal point. */}
        {[200, 506, 812].map((bx, i) => { const bc = [MAGENTA, CYAN, NEONORANGE][i]; const rot = lf * 6 + i * 120; return (
          <React.Fragment key={"bec" + i}>
            <div style={{ position: "absolute", left: bx - 90, top: 54, width: 180, height: 150, background: `conic-gradient(from ${rot}deg, transparent 0deg, ${bc}44 16deg, transparent 38deg)`, filter: "blur(11px)", mixBlendMode: "screen", opacity: (0.3 + 0.18 * Math.sin(lf * 0.4 + i)) * (0.6 + bloom * 0.4), transformOrigin: "50% 0%", zIndex: 8 }} />
            <div style={{ position: "absolute", left: bx - 6, top: 43, width: 12, height: 12, borderRadius: "50%", background: bc, boxShadow: `0 0 10px ${bc}`, opacity: 0.45 + 0.2 * Math.sin(lf * 0.9 + i), zIndex: 9 }} />
          </React.Fragment>); })}

        {/* the hung softbox rig + short drop cables (the real key sources in shot), faintly flickering.
             Eased back: they light the rank, they are not the subject. */}
        {[150, 340, 506, 672, 862].map((sx, i) => (
          <React.Fragment key={"cl" + i}>
            <div style={{ position: "absolute", left: sx - 1, top: 64, width: 3, height: 40, background: "#15181C", zIndex: 6 }} />
            <SoftBox x={sx - 70} y={100} w={140} h={58} o={(0.3 + bloom * 0.24) * (0.92 + 0.08 * Math.sin(lf * 0.8 + i * 1.7))} z={7} />
          </React.Fragment>
        ))}

        {/* FIVE SEALED STALLS: THE FOCAL POINT. Solid steel dividers + a frosted glass front wall each one
             off: none can see what the others are doing. Only the CAR differs, one wild candy build per
             copy. Each bay STRIKES ON in sequence with its own vivid accent colour and seals with a steel
             shutter. Every bay now carries a cool RIM LIGHT edge + a hotter accent bloom so the rank
             separates hard off the graded corridor behind it. */}
        {bays.map((b, i) => {
          const acc = b.hue;
          const strike = 2 + i * 6;                                   // bay lights snap on 01..05, left to right
          const snap = over(lf, strike, 5);
          const flick = lf < strike + 8 ? (0.35 + 0.65 * Math.abs(Math.sin((lf - strike) * 1.9))) : 1; // a quick strike flicker
          const seal = over(lf, strike + 3, 8);                       // the steel shutter drops and locks after it lights
          const arc = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.9 + i * 2.1));
          const bob = Math.sin(lf * 0.7 + i * 2.0) * 4;               // the welder head bobs
          const lit = b.lit * (0.18 + 0.82 * snap) * flick * (0.88 + 0.12 * Math.sin(lf * 0.7 + i)); // live, breathing
          const zb = b.hero ? 40 : 4;                                  // the hero foreground stall wins where layers meet
          const gTop = b.y - 150 * b.s - (b.hero ? 86 : 46);           // the glass hugs the car (no dead headroom)
          const gBot = b.y + (b.hero ? 52 : 46);
          const gH = gBot - gTop;
          // the grey COPY reads BESIDE / behind its car (head above the roofline, body occluded by bodywork)
          const copyCx = b.cx + (b.hero ? -0.34 : b.side * 0.5) * b.halfW;
          const copyTop = b.y - 150 * b.s - b.copy * 0.28;
          return (
            <React.Fragment key={"bay" + i}>
              {/* a dark contact shadow pad DIRECTLY behind each stall: it punches the bay off the hall */}
              <div style={{ position: "absolute", left: b.cx - b.halfW - 26, top: gTop - 26, width: b.halfW * 2 + 52, height: gH + 52, borderRadius: 18, background: "radial-gradient(ellipse at 50% 50%, rgba(6,8,11,0.82) 0%, rgba(6,8,11,0.5) 62%, transparent 84%)", filter: "blur(12px)", zIndex: zb - 1 }} />

              {/* carbon fibre back panel + ambient occlusion */}
              <div style={{ position: "absolute", left: b.cx - b.halfW, top: gTop, width: b.halfW * 2, height: gH, borderRadius: 8, background: "linear-gradient(180deg,#242932,#14171C)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 44px rgba(0,0,0,0.6)", opacity: 0.94, zIndex: zb }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 8, opacity: 0.5, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 3px, transparent 3px 6px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0 3px, transparent 3px 6px)" }} />
                {/* a bold saturated colour wash filling the back panel: the bay hue really reads now */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: `radial-gradient(ellipse at 50% 46%, ${acc}, transparent 70%)`, opacity: 0.34 * lit, mixBlendMode: "screen" }} />
                {/* a thin bright accent rim high on the panel, pulsing */}
                <Neon x={14} y={12} w={b.halfW * 2 - 28} h={4} color={acc} on={lit * 0.9 * (0.8 + 0.2 * Math.sin(lf + i))} z={2} />
                {/* a strong accent glow low on the back wall (a real coloured wall wash) */}
                <div style={{ position: "absolute", left: "8%", bottom: 0, width: "84%", height: "60%", borderRadius: 12, background: `radial-gradient(ellipse at 50% 100%, ${acc}, transparent 66%)`, opacity: 0.4 * lit, mixBlendMode: "screen" }} />
                {/* etched station number plate: 01..05, so the count is unmistakable. right hand stalls
                     nudge it in so the big hero divider never nicks it */}
                <div style={{ position: "absolute", left: b.side > 0 ? 32 : 12, bottom: 10, width: 34, height: 21, borderRadius: 3, background: "linear-gradient(180deg,#3F4650,#22262D)", border: "1px solid #545C67", fontFamily: mono, fontSize: 14, color: "#F2EDE3", textAlign: "center", lineHeight: "21px", opacity: 0.6 + lit * 0.4 }}>{b.no}</div>
              </div>

              {/* soft warm KEY pooling into the stall + a cool STEEL fill + a vivid accent gel bloom */}
              <StudioLight x={b.cx} y={b.y - 120} w={300 * b.s} h={340} color={KEY} o={0.32 * lit} z={zb} />
              <StudioLight x={b.cx - 70 * b.s} y={b.y - 100} w={220 * b.s} h={320} color={FILL} o={0.2 * lit} z={zb} />
              <GelWash x={b.cx} y={b.y - 70} w={300 * b.s} h={300 * b.s} color={acc} o={0.26 * lit} blur={40} z={zb} />
              {b.hero && <Spotlight x={b.cx} y={gTop - 6} w={430} h={430} color="#FFF3D6" o={0.38 * lit} poolY={b.y + 34} poolW={320} />}

              {/* floor halo + cast shadow + a bold accent RIM so the candy paint pops off the graphite */}
              <div style={{ position: "absolute", left: b.cx - 150 * b.s, top: b.y + 4, width: 300 * b.s, height: 52 * b.s + 14, borderRadius: "50%", background: `radial-gradient(ellipse, ${acc}, transparent 64%)`, opacity: 0.46 * lit, filter: "blur(10px)", mixBlendMode: "screen", zIndex: zb + 9 }} />
              <CastShadow x={b.cx} y={b.y + 16} w={250 * b.s} o={0.52} />
              <div style={{ position: "absolute", left: b.cx - 170 * b.s, top: b.y - 150 * b.s, width: 340 * b.s, height: 150 * b.s, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 60%, ${acc}, transparent 62%)`, opacity: 0.56 * lit, filter: "blur(12px)", mixBlendMode: "screen", zIndex: zb + 1 }} />

              {/* a slowly SPINNING TURNTABLE ring under each car (real automotive stage, real motion) */}
              <div style={{ position: "absolute", left: b.cx - 140 * b.s, top: b.y + 2, width: 280 * b.s, height: 80 * b.s, borderRadius: "50%", background: `conic-gradient(from ${lf * 4 + i * 40}deg, transparent 0deg, ${acc} 60deg, transparent 150deg, ${acc} 230deg, transparent 320deg)`, filter: "blur(3px)", mixBlendMode: "screen", opacity: 0.5 * lit, zIndex: zb + 3 }} />

              {/* the identical grey COPY: five separate copies, one sealed inside every stall, welding */}
              <CastShadow x={copyCx + b.copy * 0.14} y={copyTop + b.copy - 4} w={b.copy * 0.9} o={0.4} />
              <div style={{ position: "absolute", left: copyCx - b.copy / 2, top: copyTop, zIndex: zb + 2 }}>
                <Take lf={lf + i * 5} size={b.copy} rim={0.66} />
              </div>

              {/* a BOBBING WELDER HEAD on a drop cable + a tight white arc + a coloured spark shower, never stopping */}
              <div style={{ position: "absolute", left: b.cx - 30 * b.s, top: gTop + 6, width: 2, height: (b.y - 92 * b.s + bob) - (gTop + 6), background: "linear-gradient(180deg,#3B424B,#181B20)", zIndex: zb + 7 }} />
              <div style={{ position: "absolute", left: b.cx - 30 * b.s - 11, top: b.y - 96 * b.s + bob, width: 22, height: 14, borderRadius: 3, background: "linear-gradient(180deg,#5A626C,#20242B)", border: "1px solid #6A727C", boxShadow: `0 0 10px ${acc}66`, zIndex: zb + 8 }}>
                <div style={{ position: "absolute", left: 8, top: 12, width: 4, height: 22 * b.s, background: "#2A2F36" }} />
              </div>
              <div style={{ position: "absolute", left: b.cx - 30 * b.s, top: b.y - 62 * b.s, width: 16 * b.s + 4, height: 16 * b.s + 4, borderRadius: "50%", background: `radial-gradient(circle, #FFFFFF, ${acc} 44%, transparent 72%)`, opacity: arc * lit, filter: "blur(1px)", zIndex: zb + 8 }} />
              <Sparks lf={lf + i * 7} x={b.cx - 22 * b.s} y={b.y - 56 * b.s} on={(b.hero ? 0.95 : 0.7) * lit} color="#FFE7B0" n={b.hero ? 9 : 5} z={zb + 8} />
              <Sparks lf={lf + i * 7 + 4} x={b.cx - 30 * b.s} y={b.y - 56 * b.s} on={(b.hero ? 0.7 : 0.5) * lit} color={acc} n={b.hero ? 6 : 4} z={zb + 8} />

              {/* coloured EMBERS rising in the bay hue (glowing motes lifting off the weld) */}
              {Array.from({ length: b.hero ? 6 : 4 }, (_, k) => { const s = seed(i * 7.3 + k * 2.1); const ry = ((lf * (1.1 + s * 1.1) + s * 130) % 150); return (
                <div key={"em" + i + "_" + k} style={{ position: "absolute", left: b.cx - 30 * b.s + (s - 0.5) * 46 * b.s, top: (b.y - 30 * b.s) - ry, width: 3, height: 3, borderRadius: "50%", background: acc, boxShadow: `0 0 6px ${acc}`, opacity: (1 - ry / 150) * lit * 0.85, zIndex: zb + 8 }} />); })}

              {/* THE HERO OF THE STALL: a big lit candy car, distinct wild build, real ground reflection.
                   Its own saturation + contrast is lifted so the paint is the most vivid colour in frame. */}
              <div style={{ position: "absolute", inset: 0, zIndex: zb + 6, filter: `saturate(${b.hero ? 1.3 : 1.18}) contrast(${b.hero ? 1.12 : 1.06}) brightness(${b.hero ? 1.1 : 1.05})`, pointerEvents: "none" }}>
                <Car x={b.cx} y={b.y} s={b.s} solve={b.solve} build={0.78 + 0.22 * over(lf, i * 3, 30)} glow={0.42 * lit} reflect={0.44} z={2} />
              </div>

              {/* a cool RIM LIGHT tracing the top edge of the stall: hard separation from the hall behind */}
              <div style={{ position: "absolute", left: b.cx - b.halfW - 4, top: gTop - 5, width: b.halfW * 2 + 8, height: 4, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${RIM}, transparent)`, opacity: (0.4 + 0.35 * Math.sin(lf * 0.5 + i)) * (0.4 + 0.6 * snap), boxShadow: `0 0 12px ${RIM}88`, mixBlendMode: "screen", zIndex: zb + 25 }} />

              {/* SOLID BRUSHED STEEL DIVIDER COLUMNS flanking the stall: nobody can peek at anybody */}
              <div style={{ position: "absolute", left: b.cx - b.halfW - 8, top: gTop - 14, width: 14, height: gH + 22, borderRadius: 3, background: steelCol, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.16), 0 3px 10px rgba(0,0,0,0.55)", zIndex: zb + 26 }} />
              <div style={{ position: "absolute", left: b.cx + b.halfW - 6, top: gTop - 14, width: 14, height: gH + 22, borderRadius: 3, background: steelCol, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.16), 0 3px 10px rgba(0,0,0,0.55)", zIndex: zb + 26 }} />

              {/* the FROSTED GLASS FRONT sealing the stall, tinted with the bay hue. The hero glass is nearly
                   clear (crisp hero); the four set back stalls are frostier, but every candy car still reads. */}
              <div style={{ position: "absolute", left: b.cx - b.halfW, top: gTop, width: b.halfW * 2, height: gH, borderRadius: 8, zIndex: zb + 24, border: `2px solid ${acc}77`, background: `linear-gradient(118deg, rgba(200,220,240,${b.hero ? 0.04 : 0.1}) 0%, rgba(150,175,205,${b.hero ? 0.018 : 0.05}) 46%, rgba(120,145,175,${b.hero ? 0.035 : 0.085}) 100%)`, boxShadow: `inset 0 0 26px ${acc}2E, inset 0 2px 0 rgba(255,255,255,0.16), 0 0 ${b.hero ? 26 : 14}px ${acc}${b.hero ? "55" : "33"}` }}>
                {/* a moving specular streak travelling across the glass */}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-46 + glint * 150}%`, width: "42%", background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.16), transparent)", transform: "skewX(-14deg)" }} />
                {/* a second, faster hue-tinted glare sweep so the glass is always alive */}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${((lf * 4 + i * 40) % 200) - 60}%`, width: "34%", background: `linear-gradient(100deg, transparent, ${acc}33, transparent)`, transform: "skewX(-14deg)", mixBlendMode: "screen" }} />
                <div style={{ position: "absolute", left: 10, top: 8, width: 30, bottom: 10, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)", borderRadius: 6 }} />
              </div>

              {/* the SEALING STEEL SHUTTER dropping onto the top of the glass, then a hue-lit latch snaps LOCKED */}
              <div style={{ position: "absolute", left: b.cx - b.halfW - 2, top: gTop - 4, width: b.halfW * 2 + 4, height: 8 + seal * 18, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(180deg,#5A626C,#242930)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.16), 0 4px 10px rgba(0,0,0,0.5)", transform: `translateY(${(1 - seal) * -12}px)`, opacity: 0.5 + snap * 0.5, zIndex: zb + 28, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 8px, transparent 8px 14px)" }} />
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 9, height: 9, borderRadius: "50%", background: seal > 0.85 ? acc : "#20242B", boxShadow: seal > 0.85 ? `0 0 10px ${acc}` : "none" }} />
              </div>

              {/* the etched, back lit sign on the glass: SEALED / LOCKED etc reinforce the walls, pulsing.
                   nudged down clear of the sealing shutter, and right hand stalls nudge in so the big hero
                   divider never clips the first letter */}
              <NeonSign x={b.cx - b.halfW + (b.side > 0 ? 30 : 14)} y={gTop + 17} text={b.sign} color={acc} size={b.hero ? 25 : 18} on={(0.5 + lit * 0.5) * (0.82 + 0.18 * Math.sin(lf * 0.9 + i))} z={zb + 27} />
            </React.Fragment>
          );
        })}

        {/* THE BRIGHT CYAN INSPECTION SCAN BAR raking the whole rank left to right, never stopping. It is a
             touch softer now so it grazes the bays instead of slicing the eye away from them. */}
        <div style={{ position: "absolute", left: scanX - 44, top: 150, width: 90, height: 590, background: `linear-gradient(90deg, transparent, ${CYAN}3A, transparent)`, filter: "blur(20px)", mixBlendMode: "screen", zIndex: 57 }} />
        <div style={{ position: "absolute", left: scanX, top: 150, width: 6, height: 590, background: `linear-gradient(180deg, transparent, ${CYAN}, ${AZURE}, ${CYAN}, transparent)`, boxShadow: `0 0 18px ${CYAN}, 0 0 44px ${CYAN}66`, opacity: 0.38 + 0.2 * Math.sin(lf * 0.5), filter: "blur(1px)", mixBlendMode: "screen", zIndex: 58 }} />

        {/* fine COLOURED dust motes drifting in the gelled beams over the whole rank */}
        {Array.from({ length: 20 }, (_, d) => { const s = seed(d * 4.1 + 2.7); const dy = ((lf * (0.24 + s * 0.4) + s * 320) % 360); const dc = [CYAN, MAGENTA, "rgba(255,240,214,0.9)", ELECTRIC][d % 4]; return (
          <div key={"du" + d} style={{ position: "absolute", left: 80 + s * 860, top: 250 + dy, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: dc, boxShadow: `0 0 5px ${dc}`, opacity: (0.1 + s * 0.16) * bloom, zIndex: 55 }} />); })}

        {/* floor dressing across the rank: a hazard stripe + faint steel alignment lines (a real shop) */}
        <div style={{ position: "absolute", left: 28, top: 710, width: 956, height: 12, background: "repeating-linear-gradient(-45deg,#8E7220 0 16px,#14161A 16px 32px)", opacity: 0.34, zIndex: 12, borderRadius: 2 }} />
        {bays.map((b, i) => <div key={"ml" + i} style={{ position: "absolute", left: b.cx - 2, top: b.y + 26, width: 4, height: 690 - (b.y + 26), background: "linear-gradient(180deg,transparent,rgba(180,195,215,0.1))", zIndex: 11 }} />)}
      </div>

      {/* ==== FOCAL VIGNETTE: a tight darkening frame that closes the corners and the top of the shot so the
             eye is funnelled onto the rank of five sealed bays within a split second. Camera fixed. ==== */}
      <div style={{ position: "absolute", inset: 0, zIndex: 59, pointerEvents: "none", background: "radial-gradient(ellipse 60% 44% at 50% 60%, rgba(4,5,8,0) 0%, rgba(4,5,8,0.14) 56%, rgba(4,5,8,0.5) 82%, rgba(3,4,6,0.72) 100%)" }} />
      {/* an extra top wedge: the ceiling rig is ambience, it must not pull focus off the cars */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 210, zIndex: 59, pointerEvents: "none", background: "linear-gradient(180deg, rgba(4,5,8,0.4) 0%, rgba(4,5,8,0.13) 58%, transparent 100%)" }} />

      {/* camera fixed bottom occluder: a dark near pit rail with draped hoses, frames the base for depth */}
      <div style={{ position: "absolute", left: -20, top: 706, width: 1052, height: 124, zIndex: 62, background: "linear-gradient(180deg, rgba(8,9,12,0) 0%, rgba(8,9,12,0.84) 44%, #06070A 100%)", filter: "blur(1px)", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, top: 28, width: 1052, height: 10, borderRadius: 4, background: "linear-gradient(180deg,#3B424B,#181B20)", boxShadow: "0 0 10px rgba(0,0,0,0.6)" }} />
        {[150, 560, 870].map((hx, i) => <div key={i} style={{ position: "absolute", left: hx, top: 34, width: 88, height: 56, borderRadius: "0 0 58px 58px", border: "6px solid #14161C", borderTop: "none", opacity: 0.9 }} />)}
      </div>

      {/* camera fixed scene label for hierarchy / story */}
      <SceneTag f={lf} text="FIVE SEALED BAYS" color={COOL} x={40} y={210} />

      <Vig o={0.4} />
    </AbsoluteFill>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // SETTING: the same sealed INSPECTION BAY, lit like a PREMIUM colour-gel photo studio. Bold ELECTRIC-blue
  // + MAGENTA gels rake the brushed-steel walls, a CYAN scanner laser sweeps each car, warm NEONGOLD PASS
  // ticks pop. SAME story + camera + props: the blank rim-lit Sixth grades each car off a clipboard, cars
  // roll through the scan arch, Take One is shut out at the sealed door. Vibrant + expensive, never grey.
  // HIERARCHY PASS: the ONE focal point is THE CAR BEING SCANNED UNDER THE ARCH. Everything else was pushed
  // back: the far gantry row is dimmer, blurrier and desaturated, the monitor banks + wall targets + robot
  // arm lost brightness and contrast, a BG SCRIM darkens the whole set away from the bay centre, and the
  // hero gained a bright light POOL, an overhead spot cone, a cyan RIM GLOW and a tighter edge vignette.
  // All the background detail + motion is KEPT, just clearly secondary. Still alive at f139.
  // CAMERA: a forward DOLLY push-through, floor rails + cross-ties crawl toward camera.
  const cam = interpolate(lf, [0, 139], [1.035, 1.15]);
  const camX = Math.sin(lf / 24) * 3;
  const camY = interpolate(lf, [0, 139], [8, -16]);
  const rail = (lf * 0.9) % 100;                 // cross-ties crawl toward camera the whole scene

  // ===== S5 COLOUR IDENTITY: ELECTRIC blue + MAGENTA gels, CYAN scan laser, NEONGOLD pass. Its own look.
  const AX = ELECTRIC, BX = MAGENTA, SCAN = CYAN;
  const gelDrift = Math.sin(lf / 20);            // the big gels slide, so colour breathes across the set
  const gelDrift2 = Math.cos(lf / 17);
  const pulseA = 0.5 + 0.5 * Math.sin(lf / 8);   // two anti-phase pulses drive the signage + rim lights
  const pulseB = 0.5 + 0.5 * Math.sin(lf / 8 + Math.PI);
  const archSpin = lf * 3;                       // scanner discs on the posts spin the whole scene
  const radar = lf * 5;                          // a radar sweep on the diagnostic monitor

  // ---- DEEP BACKGROUND drivers (all continuous, nothing frozen, still moving at f139) ----
  const ringSpin = lf * 1.6;                     // a big scanner ring rotates in the far tunnel (slow = far)
  const farSweep = (lf * 1.3) % 240;             // laser lines sweep down the far wall
  const dataScroll = (lf * 5) % 40;              // diagnostic monitor grids scroll upward
  const readLine = (lf * 3) % 40;                // a bright read-line crosses each monitor screen
  const gantryPulse = 0.4 + 0.6 * Math.abs(Math.sin(lf / 9)); // the receding gantry rims breathe
  const parX = Math.sin(lf / 30) * 5;            // far layer parallax drift (offset from the camera)
  const armNod = Math.sin(lf / 15) * 13;         // the robotic inspection arm nods as it scans
  const foreDeg = 118 + armNod;                  // its forearm angle, nodding over the bay
  const headX = 828 + Math.cos(foreDeg * Math.PI / 180) * 100;
  const headY = 388 + Math.sin(foreDeg * Math.PI / 180) * 100;

  // ---- HIERARCHY FILTERS: one place to push each depth layer back behind the hero ----
  const FAR_FX = "blur(5.4px) brightness(0.58) saturate(0.62) contrast(0.84)";   // deepest layer, softest
  const MID_FX = "blur(2.2px) brightness(0.66) saturate(0.74) contrast(0.88)";   // wall machinery
  const SET_FX = "brightness(0.74) saturate(0.86)";                              // near set dressing

  // STATION geometry: the glass scanner arch straddles the deck, the hero car parks dead centre under it.
  const stationX = 506, floorY = 612;
  const archL = 318, archR = 694, arcTop = 286, archBot = 648;
  const solves = [2, 5, 1, 3, 4];                // five candy candidates on the rail, variety not a winner

  // SCAN CYCLE: one car under the beam at a time, scanned in sequence, a warm PASS tick when cleared.
  const CY = 24, START = 6;
  const raw = (lf - START) / CY;
  const c = Math.max(0, Math.min(4, Math.floor(raw)));
  const prog = Math.max(0, Math.min(1, raw - c));
  const heroSolve = solves[c];
  const si = over(lf, START + c * CY, Math.round(CY * 0.22));        // hero rolls up onto the scan rail
  const heroScale = interpolate(si, [0, 1], [0.58, 1.42]);          // the BIG lit HERO, biggest thing in frame
  const heroY = interpolate(si, [0, 1], [532, floorY]);
  const heroRoll = Math.sin(lf * 0.5) * (1 - si) * 0.7;
  const wheelSpin = lf * 30;                                        // hero wheels visibly spin as it rolls
  const wheelY = heroY - 32 * heroScale;
  const heroBreath = 0.5 + 0.5 * Math.sin(lf / 7);                  // the focal pool + rim glow breathe

  // the cool scan beam sweeps left to right across the parked hero once per car
  const sweep = Math.max(0, Math.min(1, (prog - 0.30) / 0.34));
  const beaming = si > 0.9 && sweep > 0.001 && sweep < 0.999;
  const beamX = archL + 20 + sweep * (archR - archL - 40);
  const scanY = 340 + Math.abs(Math.sin(lf / 6)) * 220;            // a second horizontal scan plane oscillates

  // ===== PATTERN INTERRUPT: ONE candidate FAILS the scan. The calm pass rhythm is broken by a red alarm,
  // a REJECT X slams over the doomed car, and it is dropped through a trapdoor while the rest pass clean.
  const REJECT = 2;                                                // the third candidate is the one that fails
  const isRej = c === REJECT;
  const passRaw = prog > 0.64 ? Math.min(1, (prog - 0.64) / 0.14) : 0;
  const passed = isRej ? 0 : passRaw;                              // the doomed car never earns a warm pass
  const carPass = (r: number) => r !== REJECT && (r < c || (r === c && passRaw > 0.5));
  const graded = [0, 1, 2, 3, 4].filter(carPass).length;          // only cars that truly cleared are tallied
  const tickPop = passed > 0.02 ? over(lf, START + c * CY + Math.round(CY * 0.64), 6, Easing.out(Easing.back(2.2))) : 0;
  const burstR = passed > 0.02 ? over(lf, START + c * CY + Math.round(CY * 0.64), 10) : 0;

  // reject drivers: the alarm trips just as the scan begins, the X slams, the hero drops, the mark logs.
  // TIGHT to this car's on screen window so the whole jolt lands before the cycle advances to the next car.
  const rejStamp = START + REJECT * CY + Math.round(CY * 0.34);    // the moment the scan trips the alarm
  const rejDone = lf >= rejStamp;                                  // the red X stays logged on the clipboard after
  const rejSlam = isRej ? over(lf, rejStamp, 6, Easing.out(Easing.back(2.6))) : 0;  // the badge slams in hard
  const rejLife = isRej ? over(lf, rejStamp, 15) : 0;            // how long the red badge holds before it clears
  const dropP = isRej ? over(lf, rejStamp + 3, 11) : 0;         // the car falls through the trapdoor, done in window
  const alarm = isRej && lf >= rejStamp && lf < rejStamp + 16 ? 0.5 + 0.5 * Math.sin((lf - rejStamp) * 1.6) : 0; // strobe
  const heroDropY = dropP * 320;                                  // vertical fall of the rejected car
  const heroFade = 1 - Math.min(1, Math.max(0, (dropP - 0.35) / 0.65)); // it fades as it sinks into the void

  // the car that just cleared rolls OUT toward camera as the next arrives (a foreground exit)
  const showExit = c > 0 && prog < 0.34 && (c - 1) !== REJECT;   // the rejected car was dropped, never rolls out clean
  const exP = Math.max(0, Math.min(1, prog / 0.34));
  const exSolve = solves[Math.max(0, c - 1)];

  // idle life so the bay never freezes: calibration lamps, a scan slit, a red LOCKED light
  const beacon = 0.4 + 0.6 * Math.abs(Math.sin(lf / 5));
  const slit = 0.45 + 0.35 * Math.abs(Math.sin(lf / 7));
  const lockBlink = 0.35 + 0.65 * Math.abs(Math.sin(lf / 6));

  // TAKE ONE arrives late at the sealed personnel door and cannot get in (he built a car)
  const toX = -168 + (30 - (-168)) * over(lf, 82, 14);
  const press = lf > 98 ? Math.max(0, Math.sin((lf - 98) * 0.4)) * 8 : 0;
  const penTick = Math.max(0, Math.sin(lf * 0.9)) * (beaming ? 7 : 2.5);   // the sixth ticks its clipboard

  // premium material fills (real materials, plus bold colour from the gels)
  const brushed = "linear-gradient(180deg,#434A53 0%,#2D323A 46%,#3B424B 100%)";
  const brushedH = "linear-gradient(90deg,#242930,#5A626C,#242930)";
  const chromeG = "linear-gradient(180deg,#EAEEF4,#A6AFBC 46%,#CBD2DC)";
  const steelPanel = "linear-gradient(180deg,#2B3037,#191C21)";
  const carbon = "repeating-linear-gradient(45deg,#181B20 0 5px,#22262D 5px 10px)";
  const hazard = "repeating-linear-gradient(-45deg,#C9A227 0 16px,#15171B 16px 32px)";
  const glassG = "linear-gradient(160deg, rgba(63,120,255,0.18), rgba(30,42,58,0.30) 55%, rgba(14,20,28,0.50))";

  return (
    <AbsoluteFill>
      {/* ============ THE DOLLYING WORLD (camera push-through) ============ */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY}px)`, transformOrigin: "506px 560px" }}>

        {/* graphite studio backdrop + glossy reflective floor, carrying ELECTRIC + MAGENTA gels, pushed back */}
        <div style={{ position: "absolute", inset: 0, filter: SET_FX, zIndex: 0 }}>
          <GarageFloor horizon={430} hue={COOL} gel={AX} gel2={BX} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 92% at 50% 26%, rgba(126,147,166,0.10), rgba(14,16,20,0.42) 62%, rgba(8,9,12,0.66) 94%)", zIndex: 1 }} />

        {/* ===== BOLD GEL WASHES: complementary ELECTRIC + MAGENTA gels raking the set, sliding with lf.
            Kept vivid but knocked back so they colour the room without out-shouting the hero. ===== */}
        <GelWash x={196 + gelDrift * 46} y={332} w={840} h={740} color={AX} o={0.19 + pulseA * 0.08} blur={94} z={2} />
        <GelWash x={824 - gelDrift * 46} y={300} w={780} h={700} color={BX} o={0.16 + pulseB * 0.08} blur={94} z={2} />
        {/* a CYAN light bar raking across the scanner deck, sliding side to side */}
        <GelBar x={-80 + gelDrift2 * 70} y={296} w={1180} h={158} color={SCAN} o={0.17 + pulseA * 0.10} rot={-6} z={2} />
        <GelBar x={-60} y={512 + gelDrift * 26} w={1140} h={120} color={AX} o={0.12 + pulseB * 0.07} rot={5} z={2} />

        {/* THE DARK FAR CAP at the vanishing point (deep occluder the lane recedes into) */}
        <div style={{ position: "absolute", left: 452, top: 356, width: 108, height: 92, borderRadius: 6, background: "radial-gradient(ellipse at 50% 50%, #14181D, #08090C 74%)", boxShadow: `inset 0 0 26px rgba(0,0,0,0.75)`, zIndex: 2 }} />

        {/* ===== FAR DEPTH LAYER: a row of scanner GANTRIES receding to the vanishing point, a rotating scanner
            RING encircling the tunnel, and laser lines sweeping the far wall. ALL the motion is kept, but it is
            now heavily blurred, dimmed and desaturated so it reads as depth, not as a second subject. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: FAR_FX, opacity: 0.62, transform: `translateX(${parX}px)`, pointerEvents: "none" }}>
          {Array.from({ length: 5 }, (_, k) => {
            const t = k / 5;                              // 0 = nearest of the far row, 0.8 = deepest
            const w = 300 - t * 210, h = 210 - t * 150;
            const cxg = 506, cyg = 424 - t * 92;          // arches shrink + rise toward the vanishing point
            const dim = (1 - t) * 0.5 + 0.12;
            const col = k % 2 ? AX : SCAN;
            return (
              <div key={"fg" + k} style={{ position: "absolute", left: cxg - w / 2, top: cyg - h, width: w, height: h, borderRadius: "16px 16px 0 0", border: `${3 - t * 1.6}px solid #232B35`, background: "linear-gradient(180deg, rgba(18,24,32,0), rgba(10,14,20,0.62))", boxShadow: `inset 0 0 ${20 - t * 12}px ${col}${Math.round(gantryPulse * dim * 100).toString(16).padStart(2, "0")}` }}>
                <div style={{ position: "absolute", left: 2, right: 2, top: 4, height: 3, background: col, opacity: dim * gantryPulse * 0.8, boxShadow: `0 0 8px ${col}` }} />
              </div>
            );
          })}
          {/* a big rotating SCANNER RING encircling the far tunnel (deep machinery, always turning) */}
          <svg width={280} height={280} style={{ position: "absolute", left: 366, top: 216, opacity: 0.34, transform: `rotate(${ringSpin}deg)` }}>
            <circle cx={140} cy={140} r={128} fill="none" stroke="#262F39" strokeWidth={10} />
            <circle cx={140} cy={140} r={128} fill="none" stroke={SCAN} strokeWidth={3} strokeDasharray="6 22" opacity={0.6} />
            {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <circle key={k} cx={140 + Math.cos(a) * 128} cy={140 + Math.sin(a) * 128} r={4} fill={k % 2 ? BX : AX} opacity={0.7} />; })}
          </svg>
          {/* scanning LASER lines sweeping down the far wall */}
          {[0, 1, 2].map((k) => { const ly = 300 + ((farSweep + k * 80) % 240) * 0.55; return (
            <div key={"fl" + k} style={{ position: "absolute", left: 360, top: ly, width: 292, height: 2, background: `linear-gradient(90deg, transparent, ${SCAN}, transparent)`, opacity: 0.34 * gantryPulse, boxShadow: `0 0 8px ${SCAN}` }} />
          ); })}
        </div>

        {/* ===== SIDE WALLS: brushed-steel bays receding down the lane, dimmed, with quieter coloured rims ===== */}
        {[0, 1].map((s) => (
          <React.Fragment key={"wall" + s}>
            <div style={{ position: "absolute", left: s ? 792 : 60, top: 236, width: 160, height: 360, background: steelPanel, opacity: 0.7, zIndex: 3, filter: SET_FX, transform: `perspective(700px) rotateY(${s ? 34 : -34}deg)`, transformOrigin: s ? "0% 50%" : "100% 50%", boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "absolute", inset: 0, background: carbon, opacity: 0.3 }} />
              {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 0, right: 0, top: 40 + k * 100, height: 3, background: brushedH, opacity: 0.34 }} />)}
              {/* a rim strip on the inner edge: ELECTRIC on the left wall, MAGENTA on the right, still pulsing */}
              <div style={{ position: "absolute", left: s ? 4 : "auto", right: s ? "auto" : 4, top: 20, width: 5, height: 320, background: s ? BX : AX, opacity: 0.34 + (s ? pulseB : pulseA) * 0.26, boxShadow: `0 0 12px ${s ? BX : AX}`, borderRadius: 3 }} />
            </div>
            {/* draped hydraulic hoses down each inner wall (factory plumbing detail), swaying */}
            <svg width={90} height={340} style={{ position: "absolute", left: s ? 788 : 128, top: 260, overflow: "visible", zIndex: 5, opacity: 0.7 }}>
              <path d={`M ${s ? 4 : 82} 6 Q ${s ? 34 : 52} ${180 + Math.sin(lf / 20 + s) * 8} ${s ? 10 : 76} 320`} fill="none" stroke="#111317" strokeWidth={5} strokeLinecap="round" />
            </svg>
          </React.Fragment>
        ))}

        {/* ===== MID DEPTH LAYER: diagnostic MONITOR BANKS still streaming live data on both inner walls, but
            blurred harder and dimmed so their bright little screens stop competing with the car. */}
        {[{ x: 156, side: 0 }, { x: 802, side: 1 }].map((mb, mi) => (
          <div key={"mb" + mi} style={{ position: "absolute", left: mb.x, top: 300, width: 54, height: 152, zIndex: 5, filter: MID_FX, transform: `perspective(600px) rotateY(${mb.side ? -26 : 26}deg)`, transformOrigin: mb.side ? "100% 50%" : "0% 50%", opacity: 0.6, pointerEvents: "none" }}>
            {[0, 1, 2].map((r) => { const col = r === 1 ? BX : SCAN; return (
              <div key={r} style={{ position: "absolute", left: 0, top: r * 50, width: 54, height: 44, background: steelPanel, border: "2px solid #2C333C", borderRadius: 4, boxShadow: "0 4px 10px rgba(0,0,0,0.5)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 3, borderRadius: 2, background: "#080B0F", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: -8, height: 60, backgroundImage: `repeating-linear-gradient(0deg, ${col}18 0 1px, transparent 1px 8px)`, transform: `translateY(${-dataScroll}px)` }} />
                  {r === 1
                    ? <svg width={48} height={38} style={{ position: "absolute", left: 0, top: 0 }}>{Array.from({ length: 7 }, (_, b) => { const bh = 6 + Math.abs(Math.sin(lf / 6 + b + mi)) * 26; return <rect key={b} x={2 + b * 6.6} y={36 - bh} width={4.4} height={bh} fill={col} opacity={0.7} />; })}</svg>
                    : <svg width={48} height={38} style={{ position: "absolute", left: 0, top: 0 }}><path d={`M 0 19 ${Array.from({ length: 16 }, (_, p) => `L ${p * 3.2} ${19 - Math.sin(lf / 5 + p * 0.6 + mi + r) * 12}`).join(" ")}`} fill="none" stroke={col} strokeWidth={1.6} opacity={0.75} /></svg>}
                  <div style={{ position: "absolute", left: 0, right: 0, top: (readLine + r * 14) % 38, height: 2, background: col, opacity: 0.36 }} />
                </div>
              </div>
            ); })}
          </div>
        ))}
        {/* extra calibration TARGETS mounted on the side walls, slowly rotating (quiet wall texture now) */}
        {[{ x: 232, i: 0 }, { x: 764, i: 1 }].map((wt) => (
          <svg key={"wt" + wt.i} width={34} height={34} style={{ position: "absolute", left: wt.x, top: 470, zIndex: 5, opacity: 0.26, filter: MID_FX, transform: `rotate(${archSpin * 0.3 * (wt.i ? 1 : -1)}deg)` }}>
            <circle cx={17} cy={17} r={14} fill="none" stroke={wt.i ? BX : AX} strokeWidth={2} />
            <circle cx={17} cy={17} r={6} fill="none" stroke={SCAN} strokeWidth={2} />
            <line x1={17} y1={1} x2={17} y2={33} stroke={FILL} strokeWidth={1.4} />
            <line x1={1} y1={17} x2={33} y2={17} stroke={FILL} strokeWidth={1.4} />
          </svg>
        ))}

        {/* ===== THE FLOOR SCANNER RAILS: two steel rails + cross-ties crawling toward camera. The ties keep
            crawling but they are dimmer far away and only brighten as they reach the hero's own light pool. */}
        <svg width={1012} height={360} style={{ position: "absolute", left: 0, top: 430, zIndex: 6, overflow: "visible", opacity: 0.6 }}>
          <path d="M 506 4 L 246 350 L 292 350 L 506 4" fill="none" stroke="#3E454E" strokeWidth={3} opacity={0.5} />
          <path d="M 506 4 L 766 350 L 720 350 L 506 4" fill="none" stroke="#3E454E" strokeWidth={3} opacity={0.5} />
        </svg>
        {Array.from({ length: 7 }, (_, k) => {
          const p = ((k / 7 + rail / 100) % 1);
          const yy = 430 + Math.pow(p, 1.8) * (784 - 430);
          const wd = 44 + p * 380;
          const hot = 0.5 + 0.5 * Math.sin(lf / 6 - k);       // ties pulse cyan as they crawl in
          return <div key={"tie" + k} style={{ position: "absolute", left: 506 - wd / 2, top: yy, width: wd, height: 3 + p * 8, borderRadius: 3, background: brushedH, opacity: 0.16 + p * 0.36, boxShadow: `0 0 ${p * 12}px ${SCAN}${Math.round(hot * p * 70).toString(16).padStart(2, "0")}, 0 1px 3px rgba(0,0,0,0.5)`, zIndex: 6 }} />;
        })}

        {/* ===== THE OVERHEAD GANTRY: steel bridge + hazard band + PULSING colour signage strips (dimmed) ===== */}
        <div style={{ position: "absolute", left: 120, top: 214, width: 772, height: 20, background: brushed, filter: SET_FX, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.10), 0 6px 14px rgba(0,0,0,0.5)", zIndex: 8 }} />
        <div style={{ position: "absolute", left: 120, top: 234, width: 772, height: 9, background: hazard, opacity: 0.6, zIndex: 8 }} />
        {/* two backlit signage bars along the gantry pulsing ELECTRIC + MAGENTA (accents, no longer hotspots) */}
        <div style={{ position: "absolute", left: 140, top: 208, width: 300, height: 5, borderRadius: 3, background: AX, opacity: 0.22 + pulseA * 0.3, boxShadow: `0 0 12px ${AX}`, zIndex: 9 }} />
        <div style={{ position: "absolute", left: 572, top: 208, width: 300, height: 5, borderRadius: 3, background: BX, opacity: 0.22 + pulseB * 0.3, boxShadow: `0 0 12px ${BX}`, zIndex: 9 }} />
        {/* two cool SOFTBOXES hung on drop rods: they now aim their spill DOWN onto the hero, not out at us */}
        {[archL + 40, archR - 152].map((sx, i) => (
          <React.Fragment key={"sb" + i}>
            <div style={{ position: "absolute", left: sx + 54, top: 243, width: 3, height: 30, background: "#333A42", zIndex: 8 }} />
            <SoftBox x={sx} y={270} w={112} h={58} color="#DCE6F0" o={0.42} z={9} />
            <div style={{ position: "absolute", left: sx + 6, top: 300, width: 100, height: 300, background: `linear-gradient(180deg, ${i ? BX : AX}30, transparent 82%)`, clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)", filter: "blur(7px)", opacity: 0.26 + (i ? pulseB : pulseA) * 0.24, zIndex: 8, pointerEvents: "none" }} />
          </React.Fragment>
        ))}
        {/* a calibrated LAMP BAR spanning the arch top: a chasing row of lamps, ELECTRIC to CYAN */}
        <div style={{ position: "absolute", left: archL + 8, top: 262, width: archR - archL - 16, height: 12, background: steelPanel, border: "1px solid #333A42", borderRadius: 3, zIndex: 10 }} />
        {Array.from({ length: 9 }, (_, k) => { const on = 0.3 + 0.5 * Math.abs(Math.sin(lf / 5 - k * 0.7)); const col = k % 2 ? SCAN : AX; return (
          <div key={"cl" + k} style={{ position: "absolute", left: archL + 18 + k * ((archR - archL - 36) / 8), top: 265, width: 8, height: 6, borderRadius: 2, background: col, opacity: on, boxShadow: `0 0 8px ${col}`, zIndex: 11 }} />
        ); })}
        {/* spinning scanner DISCS mounted on each post shoulder (rotating machinery, always moving) */}
        {[archL - 2, archR - 2].map((dx, i) => (
          <svg key={"disc" + i} width={44} height={44} style={{ position: "absolute", left: dx, top: arcTop - 46, zIndex: 19, opacity: 0.7, transform: `rotate(${archSpin * (i ? -1 : 1)}deg)` }}>
            <circle cx={22} cy={22} r={18} fill="none" stroke={i ? BX : AX} strokeWidth={2.5} opacity={0.7} />
            <line x1={22} y1={4} x2={22} y2={40} stroke={SCAN} strokeWidth={2} opacity={0.7} />
            <line x1={4} y1={22} x2={40} y2={22} stroke={SCAN} strokeWidth={2} opacity={0.4} />
            <circle cx={22} cy={22} r={5} fill={SCAN} opacity={0.75} />
          </svg>
        ))}

        {/* ===== CALIBRATION TARGETS + A DIAGNOSTIC SCREEN on the back wall (now quiet secondary detail) ===== */}
        {[398, 614].map((tx, i) => (
          <svg key={"tgt" + i} width={40} height={40} style={{ position: "absolute", left: tx, top: 318, zIndex: 5, opacity: 0.3, filter: MID_FX, transform: `rotate(${archSpin * 0.4 * (i ? 1 : -1)}deg)` }}>
            <circle cx={20} cy={20} r={16} fill="none" stroke={i ? BX : AX} strokeWidth={2} />
            <circle cx={20} cy={20} r={7} fill="none" stroke={SCAN} strokeWidth={2} />
            <line x1={20} y1={0} x2={20} y2={40} stroke={FILL} strokeWidth={1.5} />
            <line x1={0} y1={20} x2={40} y2={20} stroke={FILL} strokeWidth={1.5} />
          </svg>
        ))}
        {/* a brushed-steel diagnostic monitor: a live scan waveform + a sweeping radar arm, blurred back */}
        <div style={{ position: "absolute", left: 452, top: 316, width: 108, height: 66, background: steelPanel, border: "3px solid #333A42", borderRadius: 6, filter: MID_FX, opacity: 0.72, boxShadow: "0 6px 14px rgba(0,0,0,0.55)", zIndex: 7 }}>
          <div style={{ position: "absolute", inset: 5, borderRadius: 3, background: "#0B0E12", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `conic-gradient(from ${radar}deg, transparent, ${SCAN}44 18%, transparent 30%)`, opacity: 0.6 }} />
            <svg width={94} height={52} style={{ position: "absolute", left: 0, top: 0 }}>
              {[0, 1].map((r) => <line key={r} x1={0} y1={13 + r * 26} x2={94} y2={13 + r * 26} stroke={FILL} strokeWidth={1} opacity={0.14} />)}
              <path d={`M 0 26 ${Array.from({ length: 24 }, (_, k) => `L ${k * 4} ${26 - Math.sin(lf / 4 + k * 0.7) * (beaming ? 16 : 7) * (0.5 + 0.5 * Math.sin(k * 0.5))}`).join(" ")}`} fill="none" stroke={SCAN} strokeWidth={2} opacity={0.8} />
            </svg>
          </div>
        </div>

        {/* ===== THE ROBOTIC INSPECTION ARM: still jointed, still nodding as it scans, but knocked back into
            the mid depth so its chrome no longer rivals the car. */}
        <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 7, overflow: "visible", pointerEvents: "none", filter: MID_FX, opacity: 0.66 }}>
          <defs><linearGradient id="s5arm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#333A42" /><stop offset="0.5" stopColor="#AAB3BE" /><stop offset="1" stopColor="#282E35" /></linearGradient></defs>
          <rect x={886} y={430} width={40} height={30} rx={5} fill="#222730" stroke="#39414B" strokeWidth={2} />
          <line x1={906} y1={444} x2={828} y2={388} stroke="url(#s5arm)" strokeWidth={13} strokeLinecap="round" />
          <circle cx={828} cy={388} r={9} fill="#2C333C" stroke={SCAN} strokeWidth={2} />
          <line x1={828} y1={388} x2={headX} y2={headY} stroke="url(#s5arm)" strokeWidth={11} strokeLinecap="round" />
          <g transform={`translate(${headX} ${headY})`}>
            <path d="M -12 13 L 12 13 L 34 152 L -34 152 Z" fill={SCAN} opacity={0.06 + 0.03 * Math.abs(Math.sin(lf / 5))} />
            <rect x={-17} y={-9} width={34} height={20} rx={4} fill="#1C2128" stroke="#8D96A2" strokeWidth={1.5} />
            <circle cx={0} cy={13} r={4} fill={SCAN} opacity={0.4 + 0.35 * Math.abs(Math.sin(lf / 5))} />
          </g>
        </svg>

        {/* ===== THE QUEUE: cars waiting up the lane on the rail (deep midground), bobbing on their springs.
            Deliberately smaller, dimmer and slightly blurred so ONLY the scanned car reads as the subject. */}
        {solves.map((sv, i) => {
          if (i <= c) return null;
          const qr = i - c;
          const qy = 466 - qr * 14;
          const qx = stationX + (qr % 2 ? 1 : -1) * qr * 18 + Math.sin(lf / 14 + i) * 4;
          const qs = Math.max(0.13, 0.30 - qr * 0.05);
          return (
            <div key={"q" + i} style={{ opacity: Math.max(0.3, 0.62 - qr * 0.12), filter: `blur(${1 + qr * 0.7}px) brightness(0.68) saturate(0.8)`, zIndex: 18 - qr }}>
              <Car x={qx} y={qy + Math.sin(lf / 10 + i * 1.7) * 2.4} s={qs} solve={sv} build={1} glow={0.08} reflect={0.16} z={18 - qr} />
            </div>
          );
        })}

        {/* ===== THE GLASS SCANNER ARCH (midground, straddling the hero) ===== */}
        <div style={{ position: "absolute", left: archL - 8, top: arcTop, width: 18, height: archBot - arcTop, background: brushed, borderRadius: 4, filter: SET_FX, boxShadow: "inset 0 0 6px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.5)", zIndex: 17 }} />
        <div style={{ position: "absolute", left: archR - 10, top: arcTop, width: 18, height: archBot - arcTop, background: brushed, borderRadius: 4, filter: SET_FX, boxShadow: "inset 0 0 6px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.5)", zIndex: 17 }} />
        {/* the post inner edges glow ELECTRIC + MAGENTA (coloured rim on the machinery) */}
        <div style={{ position: "absolute", left: archL + 8, top: arcTop + 6, width: 3, height: archBot - arcTop - 12, background: AX, opacity: 0.34 + pulseA * 0.26, boxShadow: `0 0 10px ${AX}`, zIndex: 18 }} />
        <div style={{ position: "absolute", left: archR - 12, top: arcTop + 6, width: 3, height: archBot - arcTop - 12, background: BX, opacity: 0.34 + pulseB * 0.26, boxShadow: `0 0 10px ${BX}`, zIndex: 18 }} />
        <div style={{ position: "absolute", left: archL - 12, top: arcTop - 10, width: archR - archL + 24, height: 26, borderRadius: 6, background: brushed, filter: SET_FX, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.10), 0 5px 14px rgba(0,0,0,0.55)", zIndex: 18 }} />
        {/* the tinted GLASS scanner pane between the posts, with a crawling reflection streak */}
        <div style={{ position: "absolute", left: archL + 12, top: 300, width: archR - archL - 24, height: archBot - 300, background: glassG, borderRadius: 4, border: "1px solid rgba(63,120,255,0.22)", zIndex: 16, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(lf * 1.8) % 160 - 30}%`, width: "22%", background: "linear-gradient(105deg, transparent, rgba(120,180,255,0.14), transparent)", transform: "skewX(-14deg)" }} />
          <div style={{ position: "absolute", left: "10%", top: 8, width: 3, height: "84%", background: "rgba(120,190,255,0.10)" }} />
        </div>

        {/* ===== BACKGROUND SCRIM: one dark wash over the whole set that OPENS UP over the bay centre. It sits
            under the hero stack (z19) so everything behind the car loses brightness and contrast while the
            car and its light pool stay untouched. This is what makes the eye land on the hero instantly. */}
        <div style={{ position: "absolute", inset: -60, background: `radial-gradient(44% 34% at ${stationX}px 552px, rgba(6,8,12,0) 0%, rgba(6,8,12,0.18) 40%, rgba(5,6,10,0.52) 74%, rgba(4,5,8,0.72) 100%)`, zIndex: 19, pointerEvents: "none" }} />

        {/* the always-on scan slit (CYAN) + chrome emitter heads pointing inward from both posts */}
        <div style={{ position: "absolute", left: archL + 14, top: 330, width: archR - archL - 28, height: 3, background: SCAN, opacity: slit * 0.8, boxShadow: `0 0 12px ${SCAN}`, zIndex: 20 }} />
        {[0, 1, 2].map((k) => { const eon = 0.5 + 0.5 * Math.sin(lf / 5 - k); return (
          <React.Fragment key={"em" + k}>
            <div style={{ position: "absolute", left: archL + 12, top: 342 + k * 84, width: 16, height: 12, background: "#12161C", border: `1.5px solid #98A2AE`, borderRadius: 2, opacity: 0.8, boxShadow: `0 0 ${5 + eon * 7}px ${SCAN}`, zIndex: 20 }} />
            <div style={{ position: "absolute", left: archR - 18, top: 342 + k * 84, width: 16, height: 12, background: "#12161C", border: `1.5px solid #98A2AE`, borderRadius: 2, opacity: 0.8, boxShadow: `0 0 ${5 + eon * 7}px ${SCAN}`, zIndex: 20 }} />
          </React.Fragment>
        ); })}
        {/* a hazard beacon dome on top of the arch, pulsing MAGENTA-hot */}
        <div style={{ position: "absolute", left: stationX - 11, top: arcTop - 26, width: 22, height: 16, borderRadius: "11px 11px 3px 3px", background: BX, opacity: 0.3 + beacon * 0.42, boxShadow: `0 0 ${10 + beacon * 12}px ${BX}`, zIndex: 21 }} />
        {/* the tally board on the arch shoulder, ELECTRIC-lit (secondary readout, dimmed) */}
        <div style={{ opacity: 0.72 }}>
          <Board x={archR + 14} y={306} rows={5} filled={graded} s={1.15} hue={AX} o={0.9} />
        </div>

        {/* ===== THE TRAPDOOR opening under the doomed car: a black void + two hatch panels sliding apart,
            their inner edges alarm-red. Sits BELOW the car so the car sinks into it. */}
        {isRej && dropP > 0.001 && (
          <>
            <div style={{ position: "absolute", left: stationX - 108, top: floorY - 20, width: 216, height: 128, borderRadius: 12, background: "radial-gradient(ellipse at 50% 22%, #000 42%, rgba(0,0,0,0.86) 78%, transparent)", opacity: Math.min(1, dropP * 2), zIndex: 21 }} />
            {[-1, 1].map((sgn) => (
              <div key={"hatch" + sgn} style={{ position: "absolute", left: sgn < 0 ? stationX - 108 : stationX + 4, top: floorY - 16, width: 104, height: 30, background: "linear-gradient(180deg,#3B424B,#191C21)", borderRadius: 4, transform: `translateX(${sgn * dropP * 82}px) perspective(320px) rotateX(${dropP * 48}deg)`, transformOrigin: sgn < 0 ? "0% 0%" : "100% 0%", boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)", zIndex: 22 }}>
                <div style={{ position: "absolute", [sgn < 0 ? "right" : "left"]: 0, top: 0, bottom: 0, width: 3, background: HOTRED, opacity: 0.55 + alarm * 0.45, boxShadow: `0 0 12px ${HOTRED}` }} />
              </div>
            ))}
          </>
        )}

        {/* ================= THE FOCAL TREATMENT: everything below builds ONE bright island around the car ==== */}
        {/* a broad LIGHT POOL on the floor the hero sits inside, breathing so the focus feels alive */}
        <div style={{ position: "absolute", left: stationX - 260, top: wheelY - 70, width: 520, height: 250, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 55%, rgba(226,240,255,0.30), rgba(120,190,255,0.16) 44%, transparent 72%)`, filter: "blur(26px)", opacity: (0.55 + heroBreath * 0.2) * (0.35 + si * 0.65) * (1 - dropP * 0.8), zIndex: 21, pointerEvents: "none" }} />
        {/* an overhead SPOT CONE dropping from the arch lamp bar straight onto the parked car */}
        <div style={{ position: "absolute", left: stationX - 150, top: 272, width: 300, height: 372, background: "linear-gradient(180deg, rgba(228,242,255,0.30), rgba(150,200,255,0.13) 52%, transparent 92%)", clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)", filter: "blur(13px)", opacity: (0.5 + heroBreath * 0.18) * (0.4 + si * 0.6), zIndex: 21, pointerEvents: "none" }} />
        {/* a tight cyan SEPARATION GLOW hugging the car silhouette so it cuts off the dark bay */}
        <div style={{ position: "absolute", left: stationX - 150, top: heroY - 132 * heroScale + heroDropY, width: 300, height: 176, borderRadius: "46%", background: `radial-gradient(ellipse, ${SCAN}4A, transparent 68%)`, filter: "blur(17px)", opacity: si * heroFade * (0.6 + heroBreath * 0.3), zIndex: 21, pointerEvents: "none" }} />

        {/* ===== THE HERO: the big lit car under the scan beam, COLOUR rim-lit ELECTRIC + MAGENTA ===== */}
        <CastShadow x={stationX} y={wheelY + 10} w={210 * heroScale + 24} o={0.58 * si * (1 - dropP * 0.85)} />
        {/* the glossy floor kiss right under the tyres */}
        <div style={{ position: "absolute", left: stationX - 140, top: wheelY - 8, width: 280, height: 48, borderRadius: "50%", background: `radial-gradient(ellipse, ${SCAN}77, transparent 66%)`, filter: "blur(8px)", opacity: si * (1 - dropP * 0.85), zIndex: 22 }} />
        {/* three-point COLOUR rim: MAGENTA from the left, ELECTRIC from the right, cool key centre. These are
            the ONLY lights that got brighter in this pass, because they belong to the focal point. */}
        <StudioLight x={stationX - 158} y={472} w={300} h={380} color={BX} o={(0.16 + si * 0.24) * (0.7 + pulseB * 0.3)} z={22} />
        <StudioLight x={stationX + 158} y={472} w={300} h={380} color={AX} o={(0.16 + si * 0.24) * (0.7 + pulseA * 0.3)} z={22} />
        <StudioLight x={stationX} y={410} w={340} h={370} color={COOL} o={0.14 + si * 0.22} z={22} />
        {/* the hero rides the roll AND, if rejected, drops through the trapdoor while fading out.
            A drop-shadow halo + a touch of extra contrast keeps it the sharpest, most saturated thing here. */}
        <div style={{ opacity: heroFade, transform: `translateY(${heroDropY}px) rotate(${heroRoll + dropP * 22}deg)`, transformOrigin: `${stationX}px ${floorY}px`, filter: `drop-shadow(0 0 26px ${SCAN}66) drop-shadow(0 14px 22px rgba(0,0,0,0.6)) saturate(1.2) contrast(1.08) brightness(1.06)` }}>
          <Car x={stationX} y={heroY} s={heroScale} solve={heroSolve} build={1} glow={0.6} reflect={0.5} z={24} />
        </div>
        {/* spinning wheel-blur discs on the hero while it rolls in (motion cue, fades once parked) */}
        {si < 0.98 && [stationX - 70 * heroScale, stationX + 70 * heroScale].map((wx, i) => (
          <svg key={"whl" + i} width={54 * heroScale} height={54 * heroScale} style={{ position: "absolute", left: wx - 27 * heroScale, top: wheelY - 6 * heroScale, zIndex: 25, opacity: (1 - si) * 0.85, transform: `rotate(${wheelSpin}deg)` }}>
            <line x1={27 * heroScale} y1={4} x2={27 * heroScale} y2={50 * heroScale - 4} stroke={SCAN} strokeWidth={2} opacity={0.7} />
            <line x1={4} y1={27 * heroScale} x2={50 * heroScale - 4} y2={27 * heroScale} stroke={SCAN} strokeWidth={2} opacity={0.7} />
          </svg>
        ))}

        {/* THE SWEEPING CYAN SCAN BEAM: it washes the FLOOR + rings BEHIND the hero, then crosses the car body
            ONLY as an additive screen highlight, so the hero keeps FULL saturation + a crisp edge */}
        {beaming && <>
          <div style={{ position: "absolute", left: beamX - 48, top: 320, width: 100, height: archBot - 320, background: `linear-gradient(90deg, transparent, ${SCAN}33, transparent)`, filter: "blur(4px)", opacity: 0.8, mixBlendMode: "screen", zIndex: 23 }} />
          <div style={{ position: "absolute", left: beamX, top: 322, width: 5, height: archBot - 322, background: `linear-gradient(180deg, ${AX}, ${SCAN}, transparent)`, boxShadow: `0 0 26px ${SCAN}, 0 0 8px #FFFFFF`, opacity: 1, mixBlendMode: "screen", zIndex: 26 }} />
          <div style={{ position: "absolute", left: beamX - 1.5, top: 486, width: 4, height: 148, background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.28))", boxShadow: "0 0 14px #FFFFFF", opacity: 0.95, mixBlendMode: "screen", zIndex: 27 }} />
          <div style={{ position: "absolute", left: archL + 14, top: scanY, width: archR - archL - 28, height: 3, background: SCAN, opacity: 0.7, boxShadow: `0 0 16px ${SCAN}`, mixBlendMode: "screen", zIndex: 26 }} />
          <Sparks lf={lf} x={beamX} y={wheelY} on={1} color={SCAN} n={8} z={27} />
          <Sparks lf={lf + 5} x={beamX} y={wheelY - 20} on={0.7} color="#FFF4C0" n={4} z={27} />
        </>}

        {/* THE WARM PASS TICK popping over the cleared hero, with a bursting gold ring (the reward beat) */}
        {passed > 0.02 && (
          <div style={{ position: "absolute", left: stationX - 22, top: 452 - passed * 10, opacity: passed, transform: `scale(${0.5 + tickPop * 0.55 + Math.sin(lf / 6) * 0.03})`, zIndex: 29 }}>
            {burstR > 0.01 && burstR < 0.99 && <div style={{ position: "absolute", left: 22 - 44 * burstR, top: 22 - 44 * burstR, width: 88 * burstR, height: 88 * burstR, borderRadius: "50%", border: `3px solid ${NEONGOLD}`, opacity: (1 - burstR) * 0.9, boxShadow: `0 0 18px ${NEONGOLD}` }} />}
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(30,22,8,0.82)", border: `3px solid ${NEONGOLD}`, boxShadow: `0 0 24px ${NEONGOLD}, 0 0 6px #FFF`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={28} height={28} viewBox="0 0 26 26"><path d="M5 13 l5 5 L21 6" fill="none" stroke={NEONGOLD} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        )}

        {/* ===== THE PATTERN INTERRUPT PAYOFF: the calm scan is shattered. A red ALARM strobes the bay, a big
            REJECT X SLAMS over the doomed car, a REJECT bar snaps under it, red sparks crack off the impact. */}
        {isRej && rejSlam > 0.001 && (
          <>
            <div style={{ position: "absolute", left: 150, top: 200, width: 862, height: 560, background: `radial-gradient(58% 60% at 50% 46%, ${HOTRED}, transparent 72%)`, opacity: alarm * 0.34, mixBlendMode: "screen", zIndex: 34, pointerEvents: "none" }} />
            {[archL - 34, archR + 14].map((bx, i) => (
              <div key={"alm" + i} style={{ position: "absolute", left: bx, top: 250, width: 20, height: 14, borderRadius: "10px 10px 3px 3px", background: HOTRED, opacity: 0.3 + alarm * 0.7, boxShadow: `0 0 ${10 + alarm * 22}px ${HOTRED}`, zIndex: 35 }} />
            ))}
            <div style={{ position: "absolute", left: stationX - 60, top: 452, width: 120, height: 120, opacity: rejLife < 0.9 ? 1 : Math.max(0, 1 - (rejLife - 0.9) / 0.1), transform: `scale(${0.4 + rejSlam * 0.72}) rotate(${-9 + (1 - rejSlam) * 15}deg)`, transformOrigin: "50% 50%", zIndex: 36 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(40,6,8,0.9)", border: `5px solid ${HOTRED}`, boxShadow: `0 0 32px ${HOTRED}, 0 0 8px #FFF, inset 0 0 18px ${HOTRED}` }} />
              <svg width={120} height={120} style={{ position: "absolute", left: 0, top: 0 }}>
                <line x1={38} y1={38} x2={82} y2={82} stroke="#FFF" strokeWidth={12} strokeLinecap="round" />
                <line x1={82} y1={38} x2={38} y2={82} stroke="#FFF" strokeWidth={12} strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: stationX - 82, top: 582, width: 164, height: 30, borderRadius: 5, background: HOTRED, opacity: (rejLife < 0.92 ? 1 : Math.max(0, 1 - (rejLife - 0.92) / 0.08)) * Math.min(1, rejSlam * 1.4), boxShadow: `0 0 22px ${HOTRED}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + rejSlam * 0.4})`, transformOrigin: "50% 50%", zIndex: 36 }}>
              <span style={{ color: "#FFF", fontWeight: 900, fontSize: 20, letterSpacing: 4, fontFamily: "Inter, sans-serif" }}>REJECT</span>
            </div>
            <Sparks lf={lf} x={stationX} y={512} on={rejSlam < 0.6 ? 1 : 0} color={HOTRED} n={12} z={37} />
            <Sparks lf={lf + 3} x={stationX} y={540} on={rejSlam < 0.5 ? 0.8 : 0} color="#FF8A6A" n={6} z={37} />
          </>
        )}

        {/* the just-cleared car rolling OUT toward camera, softened so it hands focus to the NEW hero */}
        {showExit && (
          <div style={{ opacity: (1 - exP) * 0.85, filter: `blur(${exP * 3.4}px) brightness(0.8)`, zIndex: 33 }}>
            <CastShadow x={stationX} y={floorY + 20 + exP * 150} w={250} o={0.42 * (1 - exP)} />
            <Car x={stationX} y={floorY + exP * 152} s={1.0 + exP * 0.7} solve={exSolve} build={1} glow={0.22} reflect={0.3} z={33} />
          </div>
        )}
        <Haze lf={lf} x={stationX - 120} y={560} w={260} h={140} o={0.2} n={5} color={AX} />
        <Haze lf={lf + 24} x={stationX - 90} y={520} w={210} h={130} o={0.15} n={4} color={BX} sd={4} />

        {/* ===== THE SIXTH: blank, rim-lit, ticking a clipboard. Kept as a clear SECOND read: still present and
            animated, but dimmer and less lit than the car so it never fights for the eye. ===== */}
        <StudioLight x={735} y={556} w={230} h={220} color={AX} o={0.13 + pulseA * 0.08} z={23} />
        <StudioLight x={735} y={556} w={190} h={190} color={FILL} o={0.18} z={23} />
        <CastShadow x={735} y={floorY + 6} w={120} o={0.5} />
        <div style={{ position: "absolute", left: 676, top: 486, zIndex: 30, filter: "brightness(0.82) saturate(0.9)" }}>
          <Sixth lf={lf} size={124} rim={0.9} />
        </div>
        {/* its clipboard tilts as it ticks; gold checkmarks appear as each car is graded, a red X on the reject */}
        <div style={{ position: "absolute", left: 650, top: 578, width: 46, height: 60, background: "#AEBACD", border: "3px solid #616E86", borderRadius: 5, transform: `rotate(${-10 + penTick * 0.4}deg)`, transformOrigin: "50% 0%", zIndex: 31, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "absolute", left: 12, top: -7, width: 22, height: 8, background: "#7B879E", borderRadius: 3 }} />
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={"cb" + r} style={{ position: "absolute", left: 7, top: 8 + r * 10, width: 32, height: 3, background: "rgba(60,74,104,0.55)" }}>
              {carPass(r) && <svg width={12} height={10} style={{ position: "absolute", left: 24, top: -4, filter: `drop-shadow(0 0 2px ${NEONGOLD})` }}><path d="M1 5 l3 3 L11 1" fill="none" stroke={NEONGOLD} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>}
              {r === REJECT && rejDone && <svg width={12} height={10} style={{ position: "absolute", left: 24, top: -4, filter: `drop-shadow(0 0 2px ${HOTRED})` }}><line x1={2} y1={1} x2={10} y2={9} stroke={HOTRED} strokeWidth={2} strokeLinecap="round" /><line x1={10} y1={1} x2={2} y2={9} stroke={HOTRED} strokeWidth={2} strokeLinecap="round" /></svg>}
            </div>
          ))}
        </div>
        {/* the sixth's pen, flicking as it ticks */}
        <div style={{ position: "absolute", left: 690, top: 576 - penTick, width: 4, height: 22, background: "#9AA4B0", borderRadius: 2, transform: `rotate(${34 + penTick * 2}deg)`, zIndex: 32 }} />

        {/* ===== FOREGROUND: the sealed personnel door Take One is shut out at + framing pillars. These are
            near-black frames now, which pushes the eye inward toward the lit bay. ===== */}
        <div style={{ position: "absolute", left: 0, top: 196, width: 150, height: 596, background: "linear-gradient(90deg,#06080B,#171A20)", boxShadow: "inset -4px 0 14px rgba(0,0,0,0.7)", zIndex: 40 }}>
          <div style={{ position: "absolute", inset: 0, background: carbon, opacity: 0.3 }} />
        </div>
        <div style={{ position: "absolute", left: 146, top: 196, width: 5, height: 596, background: AX, opacity: 0.36 + pulseA * 0.26, boxShadow: `0 0 10px ${AX}`, zIndex: 41 }} />
        <div style={{ position: "absolute", left: 130, top: 196, width: 16, height: 596, background: hazard, opacity: 0.34, zIndex: 41 }} />
        <div style={{ position: "absolute", left: 94, top: 486, width: 50, height: 8, border: `2px dashed ${SCAN}`, borderRadius: 4, zIndex: 42, opacity: 0.6 }} />
        {/* a red LOCKED light on the sealed door (no clipped text at the edge) */}
        <div style={{ position: "absolute", left: 110, top: 292, width: 13, height: 13, borderRadius: "50%", background: HOTRED, opacity: lockBlink * 0.85, boxShadow: `0 0 14px ${HOTRED}`, zIndex: 43 }} />
        {/* right framing pillar for foreground depth on the far side, magenta inner rim */}
        <div style={{ position: "absolute", left: 892, top: 356, width: 120, height: 436, background: "linear-gradient(90deg,#171A20,#06080B)", boxShadow: "inset 4px 0 14px rgba(0,0,0,0.7)", zIndex: 39, borderRadius: "10px 0 0 0" }}>
          <div style={{ position: "absolute", inset: 0, background: carbon, opacity: 0.3 }} />
        </div>
        <div style={{ position: "absolute", left: 890, top: 356, width: 4, height: 436, background: BX, opacity: 0.32 + pulseB * 0.26, boxShadow: `0 0 10px ${BX}`, zIndex: 39 }} />

        {/* TAKE ONE, arriving late, pressing on the sealed door. Rim-lit enough to read against the dark
            pillar, but deliberately darker than the car so he stays the story beat, not the focal point. */}
        <div style={{ position: "absolute", left: 4, top: 548, width: 174, height: 176, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 44%, ${AX}2A, transparent 62%)`, filter: "blur(9px)", zIndex: 43 }} />
        <CastShadow x={toX + 60} y={660} w={94} o={0.45 * over(lf, 90, 10)} />
        <div style={{ position: "absolute", left: toX + press, top: 536, zIndex: 44, filter: "brightness(0.8) saturate(0.9)" }}>
          <Villain lf={lf} size={120} flag={1} rim={1} nodAmp={1.4} nodSpeed={14} />
        </div>

        {/* fine dust drifting in the coloured beams. It brightens near the bay centre and stays faint out at
            the edges, so even the atmosphere points at the hero. Always moving. */}
        {Array.from({ length: 20 }, (_, k) => {
          const s = seed(k * 2.7 + 5);
          const bx = 260 + (k % 5) * 120;
          const drift = ((lf * (0.24 + s * 0.4) + s * 200) % 180);
          const yy = 300 + s * 230;
          const near = 1 - Math.min(1, Math.abs(bx + s * 60 - stationX) / 320);   // closer to the bay = brighter
          const col = k % 3 === 0 ? AX : k % 3 === 1 ? BX : "rgba(210,224,236,0.9)";
          return <div key={"du" + k} style={{ position: "absolute", left: bx + s * 60, top: yy + drift * 0.4 + Math.sin(lf / 18 + k) * 9, width: 2 + s * 3, height: 2 + s * 3, borderRadius: "50%", background: col, opacity: (0.08 + s * 0.16) + near * 0.24, boxShadow: k % 3 !== 2 ? `0 0 5px ${col}` : "none", zIndex: 28, pointerEvents: "none" }} />;
        })}

        {/* an inner EDGE VIGNETTE inside the moving world: it rides the dolly, so the frame corners stay heavy
            no matter how far the camera pushes in. Above the foreground frames, below nothing that matters. */}
        <div style={{ position: "absolute", inset: -80, background: "radial-gradient(62% 52% at 50% 62%, transparent 42%, rgba(4,6,10,0.36) 78%, rgba(3,4,7,0.62) 100%)", zIndex: 45, pointerEvents: "none" }} />
      </div>

      {/* fixed overlay: the scene tag names the bay in vivid cyan, a deeper vignette keeps the shadows heavy
          and the eye locked on the lit car under the arch */}
      <SceneTag f={lf} text="INSPECTION BAY" color={SCAN} x={172} y={214} />
      <Vig o={0.5} />
    </AbsoluteFill>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  // ============================ S6 THE PLATES (macro) ============================
  // SAME setting, camera, story and beat as before, still lit like a BOLD COLOUR car commercial: a big
  // MAGENTA wash and a complementary TEAL wash drift across the set, NEONORANGE + CYAN bars rake through,
  // PURP glows the ceiling. THE HERO is a big glossy specimen car on a brushed steel turntable, front and
  // centre, with FIVE engraved name plates hanging above it. PATTERN INTERRUPT: two REDACT calmly one by
  // one (black bar wipe, spark shower, colour bloom, steel censor), then a sudden DATA SURGE GLITCH rips
  // the far wall and a shockwave SNAPS the last three plates blank in one violent wave.
  // HIERARCHY PASS (the note: "I must see the main focus much more easily"): the deep control room got so
  // rich it started competing with the car, so the whole background stack is now wrapped in ONE recede rig
  // that knocks brightness down ~30%, desaturates the deep layers and adds blur that grows with distance.
  // ALL of its detail and ALL of its motion survive, it is simply clearly SECONDARY now. In exchange the
  // hero gains a real focal treatment: a hard overhead spot cone, a bright warm light pool on the
  // turntable, a hot rim halo, a lifted saturation / brightness / contrast grade and a glow drop shadow,
  // plus a focus vignette that darkens the frame edges and leaves a clean hole around the car. The eye
  // lands on the specimen instantly, then reads the plates blanking above it.

  // ---- THE MACRO CAMERA (unchanged): a tight push that dollies left along the board ----
  const cam = interpolate(lf, [0, 128], [1.23, 1.13], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camX = interpolate(lf, [0, 64, 128], [70, 6, -62], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camY = interpolate(lf, [0, 128], [-20, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  const cx = [154, 330, 506, 682, 858];               // five plate centres across the identity board
  const solves = [1, 2, 3, 4, 5];                     // the five candy builds being appraised
  const fill = [CAR_CHERRY, CAR_BLUE, CAR_LIME, CAR_TANGERINE, CAR_VIOLET];
  const deepP = ["#7A101C", "#173B7C", "#2E6318", "#9A4A0A", "#4A2A78"];
  const gelHue = [MAGENTA, CYAN, LIME, NEONORANGE, PURP]; // a vivid gel accent per plate as it seals
  // ---- PATTERN INTERRUPT: two names blank calmly, then a DATA SURGE GLITCH shockwave SNAPS the last three ----
  const GLITCH = 82;                                  // the surge hits here, the unexpected jolt after a lull
  const waveSpan = 1240, waveDur = 15;                // the shockwave front crosses the whole panel left to right
  const waveX = interpolate(lf, [GLITCH, GLITCH + waveDur], [-140, waveSpan - 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waveHit = (x: number) => GLITCH + waveDur * Math.max(0, Math.min(1, (x + 140) / waveSpan)); // frame the wave reaches a plate
  const PB = [22, 44, waveHit(506), waveHit(682), waveHit(858)]; // two calm, then three snap in the wave
  const snapDur = [5, 5, 3, 3, 3];                    // the surge sealed plates SNAP faster than the calm two
  const blacked = PB.filter((t0, i) => lf >= t0 + snapDur[i]).length;
  const plateW = 150, plateH = 54, plateTop = 396;

  // ---- GLITCH drivers: a sharp attack spike then a ragged decay, plus violent jitter + strobe ----
  const surge = lf >= GLITCH - 6 && lf <= GLITCH + 20;
  const gAtt = interpolate(lf, [GLITCH - 6, GLITCH], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const gDec = interpolate(lf, [GLITCH, GLITCH + 19], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const gAmt = surge ? Math.max(0, Math.min(gAtt, gDec)) : 0; // the surge intensity, sharp attack, ragged decay
  const gJit = Math.sin(lf * 5.3) + Math.sin(lf * 11.7) * 0.5; // violent multi freq jitter for the RGB split
  const gFlick = surge ? (0.42 + 0.58 * Math.abs(Math.sin(lf * 6.7))) : 1; // the wall strobes as it scrambles
  const gTear = (i: number) => Math.sin(lf * 7.1 + i * 2.3) * 16 * gAmt; // a horizontal tear slice offset
  const zap = Math.max(0, 1 - Math.abs(lf - GLITCH) / 2.5); // a hard white zap flash at the instant of the hit

  // the turntable presents one specimen at a time; every car gets its big lit moment
  const changeAt = [0, 32, 52, 72, 90];
  const fc = Math.max(0, Math.min(4, changeAt.filter((t) => lf >= t).length - 1));
  const swapIn = over(lf, changeAt[fc], 6);           // a clean dissolve as the next specimen settles
  const heroSolve = solves[fc];
  const heroHue = fill[fc];
  const heroS = 1.56 * (0.985 + swapIn * 0.015);      // slightly BIGGER hero than before, plus a settle pop
  const idle = Math.sin(lf / 22) * 1.4;               // the specimen breathes on the turntable

  const turn = lf * 1.3;                              // brushed turntable sweep angle, alive at f128
  const keyShim = 0.9 + Math.sin(lf / 13) * 0.05;     // soft key light breathes
  const standby = 0.45 + 0.55 * Math.sin(lf / 9);     // a breathing verdict LED
  const ringR = 84 + Math.sin(lf / 7) * 6;            // scan ring around the presiding Sixth
  const glass = (lf * 2.2) % 100;                     // a reflection streak crawling the booth glass
  const boardSweepX = 96 + ((lf * 4.6) % 840);        // a soft inspection sweep across the board
  // Take One at the door seam: a flat shadow that flinches 2px as the last name seals
  const flinch = lf >= PB[4] ? Math.sin((lf - PB[4]) * 1.7) * 2 * Math.max(0, 1 - (lf - PB[4]) / 11) : 0;

  // ---- VIBRANT COLOUR + MOTION drivers, all continuous so nothing is static at f128 ----
  const colO = 0.95 + 0.10 * Math.sin(lf / 15);        // colour base stays HIGH, pulses so it never freezes
  const driftA = Math.sin(lf / 34) * 82;               // the big MAGENTA wash drifts left to right
  const driftB = Math.cos(lf / 30) * 82;               // the complementary TEAL wash drifts the other way
  const rakeX = ((lf * 8) % 1440) - 360;               // a NEONORANGE bar rakes across, repeating
  const rake2X = ((lf * 6.4 + 720) % 1440) - 360;      // a CYAN bar rakes offset
  const beamTilt = Math.sin(lf / 24) * 9;              // the raking bars rock
  const beaconRot = (lf * 5.4) % 360;                  // two warning beacons spin, sweeping coloured cones
  const dataScan = ((lf * 11) % 1080) - 40;            // a bright data line sweeps the board periodically
  const signPulse = 0.55 + 0.45 * Math.sin(lf / 8 + 1);// the REDACT sign pulses
  const sealBloom = (i: number) => Math.max(0, 1 - Math.abs(lf - PB[i]) / 8); // a colour bloom pops on each seal

  // ---- DEEP BACKGROUND drivers: a control room behind the booth, every value lf driven so nothing freezes ----
  const rackHum = Math.sin(lf / 26) * 3;               // the server banks breathe / parallax a touch
  const radarSweep = (lf * 4.2) % 360;                 // the far radar scope sweep rotates, alive at f128
  const radar2Sweep = (360 - ((lf * 3) % 360));        // a second scope sweeps the other way
  const led = (a: number, b: number) => 0.25 + 0.75 * Math.max(0, Math.sin(lf * a + b)); // one server LED twinkle
  const wallTile = (i: number) => 0.12 + 0.5 * Math.max(0, Math.sin(lf / 9 + i * 1.7));  // a far data wall tile pulse

  // ---- HIERARCHY drivers: ONE recede grade for the whole deep room, ONE focal grade for the hero ----
  // the control room keeps every pixel of its detail and motion, it is just pushed back in tone
  const recede = `brightness(0.68) saturate(0.74) contrast(0.88)`;      // background stack, roughly 32% down
  const receeDeep = `brightness(0.6) saturate(0.62) contrast(0.84)`;    // the furthest layer sinks even more
  // the hero pool breathes so the focal light is alive, and blooms a touch on each present
  const pool = 0.9 + Math.sin(lf / 11) * 0.08 + swapIn * 0.12;
  const heroGrade = `saturate(1.62) brightness(1.2) contrast(1.08) drop-shadow(0 0 22px ${heroHue}88) drop-shadow(0 14px 26px rgba(0,0,0,0.6))`;
  const coneWob = Math.sin(lf / 17) * 5;               // the overhead hero spot rocks gently

  // a soft waveform trace for the console monitor
  const wave = (w: number, amp: number, ph: number, freq: number) => {
    let d = "M 0 16";
    for (let i = 0; i <= w; i += 6) d += ` L ${i} ${(16 + Math.sin(i / freq + ph) * amp).toFixed(1)}`;
    return d;
  };

  const brush = "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)";

  return (
    <AbsoluteFill>
      {/* everything inside the macro camera rig */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY}px)`, transformOrigin: "50% 48%" }}>
        {/* ===== the studio shell: a deep saturated blue-violet cyc (never neutral black), no cream leak.
               Darkened a step from before so the lit hero has somewhere to pop OUT of. ===== */}
        <div style={{ position: "absolute", left: -160, top: -160, right: -160, bottom: -160, background: `radial-gradient(ellipse 78% 82% at 50% 32%, #1B1538 0%, #110D2B 54%, #07061A 100%)`, zIndex: 0 }} />
        {/* brushed vertical grain on the back wall, softer contrast now */}
        <div style={{ position: "absolute", left: 0, top: 150, right: 0, height: 520, background: brush, opacity: 0.22, zIndex: 1 }} />
        {/* the glossy studio floor: deep and reflective, tinted so it catches the coloured gels */}
        <div style={{ position: "absolute", left: -160, top: 636, right: -160, bottom: -160, background: "linear-gradient(180deg,#150F27 0%,#0E0B1C 46%,#070512 100%)", zIndex: 1 }} />

        {/* ================= DEEP BACKGROUND: a control room / data centre behind the booth =================
              ALL of it now lives inside ONE recede rig: brightness down, saturation down, contrast down and
              blur that grows with distance. Every tile, LED, drop, flap and sweep still moves exactly as
              before, it simply sits clearly BEHIND the hero instead of fighting it. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, filter: recede, pointerEvents: "none" }}>
          {/* ---- FAR LAYER: the giant DATA WALL, coolest, most blurred, parallax bob (SCRAMBLES in the surge) ---- */}
          <div style={{ position: "absolute", left: 20, top: 150, width: 972, height: 252, filter: `blur(5px) ${receeDeep}${gAmt > 0.01 ? ` saturate(${1 + gAmt * 2.4}) contrast(${1 + gAmt * 1.3})` : ""}`, opacity: 0.72 * gFlick, overflow: "hidden", borderRadius: 6, transform: `translate(${gJit * 7 * gAmt}px, ${rackHum * 0.4}px)` }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#090C26 0%,#060818 100%)" }} />
            {/* a grid of glowing data tiles, each twinkling on its own phase */}
            {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 18 }).map((_, c) => {
              const i = r * 18 + c; const g = wallTile(i); const hue = [AZURE, TEAL, CYAN, ELECTRIC][(r + c) % 4];
              return <div key={`wt${i}`} style={{ position: "absolute", left: 8 + c * 53, top: 8 + r * 40, width: 46, height: 32, borderRadius: 3, background: `linear-gradient(180deg, ${hue}, #0A1030)`, opacity: g * 0.34, boxShadow: "inset 0 0 6px rgba(0,0,0,0.55)" }} />;
            }))}
            {/* falling DATA STREAMS, drops sliding down the wall at parallax speeds */}
            {Array.from({ length: 13 }).map((_, c) => {
              const drop = (lf * (5 + (c % 3) * 2) + c * 41) % 320; const hue = c % 2 ? CYAN : TEAL;
              return <div key={`ds${c}`} style={{ position: "absolute", left: 22 + c * 74, top: 0, width: 8, height: 252, overflow: "hidden", opacity: 0.34 }}>
                <div style={{ position: "absolute", left: 0, top: drop - 150, width: 8, height: 150, background: `linear-gradient(180deg, transparent, ${hue}, #C9E8F2)`, boxShadow: `0 0 8px ${hue}`, mixBlendMode: "screen" }} />
              </div>;
            })}
          </div>
          {/* two rotating RADAR scopes embedded in the far wall, sweeping opposite ways */}
          {[{ rx: 74, ry: 178, sw: radarSweep, cc: TEAL }, { rx: 812, ry: 172, sw: radar2Sweep, cc: CYAN }].map((rd, ri) => (
            <div key={`rad${ri}`} style={{ position: "absolute", left: rd.rx, top: rd.ry, width: 118, height: 118, filter: `blur(3px) ${receeDeep}`, opacity: 0.6 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle,#0A2226,#060B12)", border: `1.5px solid ${rd.cc}44` }} />
              {[0.68, 0.44, 0.22].map((rr, k) => <div key={k} style={{ position: "absolute", left: `${(1 - rr) * 50}%`, top: `${(1 - rr) * 50}%`, width: `${rr * 100}%`, height: `${rr * 100}%`, borderRadius: "50%", border: `1px solid ${rd.cc}26` }} />)}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from ${rd.sw}deg, ${rd.cc}55 0deg, ${rd.cc}14 30deg, transparent 62deg)`, mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", left: "62%", top: "38%", width: 5, height: 5, borderRadius: "50%", background: rd.cc, opacity: led(0.5, ri * 2 + 1) * 0.7, boxShadow: `0 0 6px ${rd.cc}` }} />
              <div style={{ position: "absolute", left: "34%", top: "60%", width: 4, height: 4, borderRadius: "50%", background: rd.cc, opacity: led(0.7, ri + 3) * 0.7, boxShadow: `0 0 5px ${rd.cc}` }} />
            </div>
          ))}

          {/* ---- MID LAYER: SERVER RACKS twinkling with hundreds of LEDs, flanking so the hero stays clear ---- */}
          {[{ lx: -34, top: 296, rows: 14, w: 172, dim: 0.78 }, { lx: 660, top: 322, rows: 12, w: 168, dim: 0.66 }].map((rk, ri) => (
            <div key={`rack${ri}`} style={{ position: "absolute", left: rk.lx, top: rk.top, width: rk.w, height: rk.rows * 27 + 20, filter: "blur(2.6px)", opacity: rk.dim, transform: `translateY(${(ri ? -1 : 1) * rackHum}px)` }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#11141B,#090B10)", border: "1px solid rgba(150,160,175,0.16)", borderRadius: 4, boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)" }} />
              {Array.from({ length: rk.rows }).map((_, r) => (
                <div key={`bl${r}`} style={{ position: "absolute", left: 8, top: 10 + r * 27, width: rk.w - 16, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#181D26,#0D1016)", border: "1px solid rgba(120,130,145,0.12)" }}>
                  {Array.from({ length: 8 }).map((_, k) => { const cc = [LIME, CYAN, NEONORANGE, AZURE][(r + k) % 4]; const g = led(0.55 + (k % 3) * 0.18, r * 1.3 + k * 0.9 + ri * 4); return <div key={k} style={{ position: "absolute", left: 10 + k * ((rk.w - 30) / 8), top: 7, width: 6, height: 6, borderRadius: "50%", background: cc, opacity: (0.2 + g * 0.8) * 0.7, boxShadow: `0 0 ${3 + g * 5}px ${cc}` }} />; })}
                  <div style={{ position: "absolute", right: 8, top: 6, width: 20, height: 8, borderRadius: 1, background: `${ELECTRIC}18`, border: `1px solid ${ELECTRIC}33` }} />
                </div>
              ))}
              {/* a soft accent uplight at the rack base so it still reads colourful under the gels */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -14, height: 40, background: `radial-gradient(ellipse at 50% 100%, ${ri ? CYAN : MAGENTA}2E, transparent 70%)`, filter: "blur(8px)", mixBlendMode: "screen" }} />
            </div>
          ))}

          {/* the split flap NAME RACK: small plates continuously flipping to blank, the NAMES OFF motif
              echoed deep in the room, now clearly a background texture rather than a second focus */}
          <div style={{ position: "absolute", left: 172, top: 452, width: 182, height: 150, filter: "blur(2.2px)", opacity: 0.72, transform: `translateY(${-rackHum * 0.6}px)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "linear-gradient(180deg,#161A22,#0B0E13)", border: "1.5px solid rgba(150,160,175,0.18)", boxShadow: "inset 0 0 16px rgba(0,0,0,0.55), 0 8px 20px -10px rgba(0,0,0,0.7)" }} />
            {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => {
              const i = r * 4 + c; const flap = Math.cos(lf * 0.11 + i * 0.72); const blank = flap < 0.16; const sy = Math.max(0.12, Math.abs(flap));
              const hue = [CAR_CHERRY, CAR_BLUE, CAR_LIME, CAR_TANGERINE, CAR_VIOLET, MAGENTA][i % 6];
              return <div key={i} style={{ position: "absolute", left: 13 + c * 42, top: 13 + r * 34, width: 36, height: 25, borderRadius: 2, overflow: "hidden", background: "#080A0E", transform: `scaleY(${sy})`, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                <div style={{ position: "absolute", inset: 1, borderRadius: 1, background: blank ? "linear-gradient(180deg,#242932,#13161C)" : `linear-gradient(158deg,${hue},#0A0C10)` }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(0,0,0,0.6)" }} />
              </div>;
            }))}
          </div>

          {/* ---- NEAR LAYER: an overhead cable tray with sliding status lights, plus dim frame pillars ---- */}
          <div style={{ position: "absolute", left: -40, top: 150, right: -40, height: 20, filter: "blur(1.2px)", opacity: 0.85 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1A1E25,#0B0D12)", borderBottom: "2px solid rgba(150,160,175,0.2)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 3, background: `repeating-linear-gradient(90deg,#22262E 0 28px, ${ELECTRIC}3A 28px 31px)` }} />
            <div style={{ position: "absolute", left: `${(lf * 0.9) % 100}%`, top: 4, width: 46, height: 9, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, mixBlendMode: "screen", boxShadow: `0 0 8px ${CYAN}`, opacity: 0.7 }} />
            <div style={{ position: "absolute", left: `${(lf * 1.4 + 50) % 100}%`, top: 4, width: 34, height: 9, background: `linear-gradient(90deg, transparent, ${MAGENTA}, transparent)`, mixBlendMode: "screen", opacity: 0.7 }} />
          </div>
          <div style={{ position: "absolute", left: -40, top: 150, width: 26, height: 560, background: "linear-gradient(90deg,#08090E,#14171E)", boxShadow: "6px 0 18px -8px rgba(0,0,0,0.7)", filter: "blur(1.4px)" }} />
          <div style={{ position: "absolute", left: 1026, top: 150, width: 26, height: 560, background: "linear-gradient(270deg,#08090E,#14171E)", boxShadow: "-6px 0 18px -8px rgba(0,0,0,0.7)", filter: "blur(1.4px)" }} />
        </div>

        {/* ---- DATA SURGE GLITCH OVERLAY on the far wall: RGB split ghosts, tear slices, scrambled bit rows.
               It rides OUTSIDE the recede rig so the pattern interrupt still lands hard, but its ceiling is
               trimmed so it never out shouts the hero. ---- */}
        {surge && (
          <div style={{ position: "absolute", left: 20, top: 150, width: 972, height: 252, zIndex: 2, overflow: "hidden", borderRadius: 6, opacity: gAmt * 0.72, mixBlendMode: "screen", filter: "blur(1.4px)", pointerEvents: "none" }}>
            {/* the wall separates into a red ghost shoved one way and a cyan ghost shoved the other */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FF1A3C,#2A0008)", opacity: 0.26 * gFlick, transform: `translateX(${-9 - gJit * 6}px)` }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${CYAN},#001A22)`, opacity: 0.24 * gFlick, transform: `translateX(${9 + gJit * 6}px)` }} />
            {/* violent horizontal TEAR slices ripping across the wall, each shoved a different way */}
            {Array.from({ length: 9 }).map((_, s) => (
              <div key={`tear${s}`} style={{ position: "absolute", left: 0, right: 0, top: s * 28 + 4, height: 15, background: s % 2 ? `${CYAN}55` : `${MAGENTA}48`, transform: `translateX(${gTear(s)}px)`, mixBlendMode: "screen", opacity: 0.35 + 0.5 * Math.abs(Math.sin(lf * 4 + s)) }} />
            ))}
            {/* scrambled DATA NOISE: bit rows flickering on and off at random phases */}
            {Array.from({ length: 16 }).map((_, c) => (
              <div key={`noise${c}`} style={{ position: "absolute", left: (c * 63 + (lf * 17) % 63) % 960, top: 6 + (c * 41) % 232, width: 44, height: 6, background: "#E8F4FF", opacity: Math.abs(Math.sin(lf * 3.3 + c * 2.1)) > 0.62 ? 0.62 : 0, boxShadow: `0 0 8px ${c % 2 ? CYAN : MAGENTA}` }} />
            ))}
          </div>
        )}

        {/* ===== BOLD SATURATED COLOUR GELS: a MAGENTA + complementary TEAL wash drifting, a PURP ceiling
               glow, and NEONORANGE + CYAN bars raking, screen blended so the colour ADDS light. The room
               still reads rich and colourful the whole scene, the washes are just eased back a step so the
               hero light pool is the brightest thing in frame. ===== */}
        <GelWash x={280 + driftA} y={340} w={900} h={760} color={MAGENTA} o={colO * 0.3} blur={90} z={1} />
        <GelWash x={760 + driftB} y={380} w={880} h={760} color={TEAL} o={colO * 0.27} blur={90} z={1} />
        <GelWash x={506} y={210} w={720} h={430} color={PURP} o={colO * 0.2} blur={84} z={1} />
        <GelWash x={506} y={690} w={620} h={260} color={NEONORANGE} o={colO * 0.15} blur={78} z={1} />
        <GelWash x={200 + driftB * 0.6} y={470} w={560} h={520} color={AZURE} o={colO * 0.16} blur={86} z={1} />
        <GelBar x={rakeX} y={210} w={440} h={230} color={NEONORANGE} o={colO * 0.3} rot={13 + beamTilt} z={2} />
        <GelBar x={rake2X} y={430} w={440} h={210} color={CYAN} o={colO * 0.27} rot={-11 + beamTilt} z={2} />

        {/* ===== PREMIUM STUDIO LIGHTING under the gels: a warm KEY, a cool FILL, an in shot SOFTBOX ===== */}
        <StudioLight x={402} y={456} w={640} h={560} color={KEY} o={0.22 * keyShim} z={2} />
        <StudioLight x={772} y={404} w={470} h={470} color={CYAN} o={0.2} z={2} />
        <StudioLight x={506} y={470} w={470} h={500} color={MAGENTA} o={0.19} z={2} />
        {/* two hung softboxes as the visible key sources, each throwing a coloured cast */}
        <div style={{ position: "absolute", left: 250, top: 176, width: 6, height: 30, background: "linear-gradient(180deg,#3A4149,#20242B)", zIndex: 5 }} />
        <SoftBox x={196} y={204} w={196} h={66} color="#FFF3DE" o={0.72 * keyShim} z={6} />
        <div style={{ position: "absolute", left: 700, top: 176, width: 6, height: 26, background: "linear-gradient(180deg,#3A4149,#20242B)", zIndex: 5 }} />
        <SoftBox x={636} y={200} w={168} h={58} color="#EAF1F8" o={0.6} z={6} />
        {/* barn door flags on the near softbox */}
        <div style={{ position: "absolute", left: 190, top: 200, width: 8, height: 74, background: "#181B20", borderRadius: 2, zIndex: 7 }} />
        <div style={{ position: "absolute", left: 386, top: 200, width: 8, height: 74, background: "#181B20", borderRadius: 2, zIndex: 7 }} />

        {/* ===== TWO SPINNING WARNING BEACONS on the gantry, sweeping coloured cones across the set ===== */}
        {[{ bx: 118, c: MAGENTA, off: 0 }, { bx: 894, c: CYAN, off: 180 }].map((be, bi) => (
          <React.Fragment key={`bcn${bi}`}>
            <div style={{ position: "absolute", left: be.bx - 4, top: 168, width: 8, height: 22, background: "linear-gradient(180deg,#3A4149,#20242B)", zIndex: 8 }} />
            <div style={{ position: "absolute", left: be.bx - 11, top: 152, width: 22, height: 18, borderRadius: 5, background: `radial-gradient(circle at 40% 35%, ${be.c}, #201826 70%)`, boxShadow: `0 0 12px ${be.c}, 0 0 22px ${be.c}66`, border: "1.5px solid rgba(160,170,185,0.32)", zIndex: 9 }} />
            {/* the rotating light cone the beacon throws down into the room */}
            <div style={{ position: "absolute", left: be.bx - 130, top: 170, width: 260, height: 320, background: `conic-gradient(from ${beaconRot + be.off}deg at 50% 0%, transparent 0deg, ${be.c}30 12deg, transparent 34deg)`, mixBlendMode: "screen", filter: "blur(5px)", opacity: 0.5, zIndex: 4, pointerEvents: "none" }} />
          </React.Fragment>
        ))}

        {/* coloured haze columns RISING through the gels, so the room air is alive and tinted */}
        <Haze lf={lf} x={150} y={300} w={360} h={300} o={0.22} n={6} color={MAGENTA} />
        <Haze lf={lf + 24} x={560} y={340} w={380} h={300} o={0.2} n={6} color={TEAL} sd={3} />
        <Haze lf={lf + 48} x={360} y={470} w={340} h={220} o={0.15} n={4} color={NEONORANGE} sd={7} />

        {/* ===== FOCUS VIGNETTE (background half): a big soft darkening that squeezes the frame edges and
               leaves a clean bright hole exactly where the specimen stands. It sits UNDER the plates and the
               car, so it kills background energy without touching the hero. ===== */}
        <div style={{ position: "absolute", left: -160, top: -160, right: -160, bottom: -160, background: `radial-gradient(ellipse 42% 34% at 50% 62%, rgba(4,3,12,0) 0%, rgba(4,3,12,0.34) 52%, rgba(4,3,12,0.66) 100%)`, zIndex: 11, pointerEvents: "none" }} />

        {/* ===== THE IDENTITY BOARD: a brushed steel rail the five name plates hang from ===== */}
        <div style={{ position: "absolute", left: 60, top: plateTop - 22, width: 892, height: 16, borderRadius: 5, background: "linear-gradient(180deg,#3E454E,#22262D)", boxShadow: "0 10px 22px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.16)", zIndex: 22 }} />
        <div style={{ position: "absolute", left: 60, top: plateTop - 20, width: 892, height: 12, background: brush, opacity: 0.4, zIndex: 23 }} />
        {/* a pulsing coloured REDACT sign riding the rail, alive at f128 */}
        <div style={{ position: "absolute", left: 430, top: plateTop - 48, width: 152, height: 22, borderRadius: 5, background: "linear-gradient(180deg,#241830,#140E1E)", border: `1.5px solid ${MAGENTA}77`, boxShadow: `0 0 ${6 + signPulse * 12}px ${MAGENTA}${signPulse > 0.6 ? "88" : "55"}`, zIndex: 24, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 12, top: 8, width: 128, height: 6, borderRadius: 3, background: MAGENTA, opacity: 0.35 + signPulse * 0.45, boxShadow: `0 0 8px ${MAGENTA}` }} />
        </div>
        {cx.map((x, i) => (
          <React.Fragment key={`mount${i}`}>
            {/* a chrome mounting bolt and a short drop post per plate */}
            <div style={{ position: "absolute", left: x - 5, top: plateTop - 24, width: 10, height: 10, borderRadius: "50%", background: `radial-gradient(circle at 36% 32%, #EDF1F6, ${CHROME} 46%, #6E747E)`, boxShadow: "0 1px 2px rgba(0,0,0,0.6)", zIndex: 24 }} />
            <div style={{ position: "absolute", left: x - 2, top: plateTop - 14, width: 4, height: 16, background: "linear-gradient(180deg,#464D57,#262A31)", zIndex: 23 }} />
          </React.Fragment>
        ))}

        {/* a DATA SCAN line sweeping the board (a coloured inspection pass), softened so it stops flaring */}
        <div style={{ position: "absolute", left: dataScan, top: plateTop - 26, width: 6, height: plateH + 52, background: `linear-gradient(180deg, transparent, ${CYAN}, transparent)`, boxShadow: `0 0 10px ${CYAN}, 0 0 20px ${CYAN}66`, opacity: 0.62, mixBlendMode: "screen", zIndex: 34, pointerEvents: "none" }} />
        {/* a soft wide inspection sweep gliding across the board */}
        <div style={{ position: "absolute", left: boardSweepX, top: plateTop - 18, width: 90, height: plateH + 40, background: `linear-gradient(90deg, transparent, ${TEAL}1E, transparent)`, mixBlendMode: "screen", zIndex: 33, pointerEvents: "none" }} />

        {/* ===== THE FIVE ENGRAVED NAME PLATES, redacted one by one with a colour bloom ===== */}
        {cx.map((x, i) => {
          const kraw = over(lf, PB[i], snapDur[i]);     // a FAST wipe so the bar SNAPS to black; the surge plates snap fastest
          const k = kraw <= 0 ? 0 : kraw >= 1 ? 1 : Easing.out(Easing.cubic)(kraw); // eased so it slams shut
          const flash = Math.max(0, 1 - Math.abs(lf - PB[i]) / 3);
          const slam = Math.max(0, 1 - Math.abs(lf - (PB[i] + snapDur[i])) / 4); // a punch as this one plate seals shut
          const bloom = sealBloom(i);
          const lit = k < 0.5;
          const active = lf >= PB[i] - 8 && lf < PB[i] + 14;
          return (
            <React.Fragment key={`plate${i}`}>
              {/* a vivid colour bloom bursts behind the plate as it is redacted */}
              {bloom > 0.02 && <div style={{ position: "absolute", left: x - 128, top: plateTop - 34, width: 256, height: plateH + 68, borderRadius: 20, background: `radial-gradient(ellipse, ${gelHue[i]}, transparent 66%)`, filter: "blur(15px)", opacity: bloom * 0.68, mixBlendMode: "screen", zIndex: 26, pointerEvents: "none" }} />}
              {/* a steady candy accent glow behind an active plate */}
              {active && <div style={{ position: "absolute", left: x - 104, top: plateTop - 20, width: 208, height: plateH + 44, borderRadius: 16, background: `radial-gradient(ellipse, ${fill[i]}3A, transparent 66%)`, filter: "blur(13px)", zIndex: 26, pointerEvents: "none" }} />}
              {/* the brushed steel plate carrier with a chrome bezel; it JOLTS as its bar snaps to black */}
              <div style={{ position: "absolute", left: x - plateW / 2, top: plateTop, width: plateW, height: plateH, borderRadius: 7, zIndex: 30, overflow: "hidden", border: "2px solid rgba(160,170,185,0.5)", background: "linear-gradient(180deg,#363C45,#1C2027)", transform: `translateY(${slam * -3}px) scale(${1 + slam * 0.05})`, boxShadow: `0 12px 24px -9px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.14)${lit ? `, 0 0 18px ${fill[i]}44` : ""}${slam > 0.05 ? `, 0 0 ${14 + slam * 24}px ${gelHue[i]}` : ""}` }}>
                {/* brushed grain on the carrier */}
                <div style={{ position: "absolute", inset: 0, background: brush, opacity: 0.44 }} />
                {/* the engraved enamel identity inlay in the build's paint hue */}
                <div style={{ position: "absolute", left: 8, top: 8, right: 8, bottom: 8, borderRadius: 4, background: `linear-gradient(158deg, ${fill[i]}, ${deepP[i]})`, opacity: 0.86, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.42)" }} />
                {/* two etched name bars, a shape not a numeral */}
                <div style={{ position: "absolute", left: 20, top: 16, width: 66, height: 7, background: "rgba(8,9,12,0.6)", borderRadius: 4, boxShadow: "0 1px 0 rgba(255,255,255,0.14)" }} />
                <div style={{ position: "absolute", left: 20, top: 30, width: 92, height: 7, background: "rgba(8,9,12,0.44)", borderRadius: 4, boxShadow: "0 1px 0 rgba(255,255,255,0.12)" }} />
                {/* a gloss highlight sweeping the engraved face */}
                <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 11, background: "linear-gradient(180deg, rgba(255,255,255,0.26), transparent)", borderRadius: 4 }} />
                {/* the matte BLACK redaction bar wiping across, with a bright coloured leading edge */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${k * 100}%`, background: "linear-gradient(180deg,#16181C,#0A0B0D)", boxShadow: "3px 0 12px rgba(0,0,0,0.85)" }} />
                {/* the vivid spark cracking the seam as the name is erased */}
                {k > 0.02 && k < 0.98 && <div style={{ position: "absolute", left: `calc(${k * 100}% - 3px)`, top: 0, bottom: 0, width: 7, background: "#FFFFFF", boxShadow: `0 0 14px ${gelHue[i]}, 0 0 28px ${gelHue[i]}, 0 0 42px ${gelHue[i]}77` }} />}
                {/* the sealed brushed steel censor with a hazard chevron once fully redacted */}
                {k > 0.9 && <>
                  <div style={{ position: "absolute", inset: 6, borderRadius: 3, background: "linear-gradient(180deg,#282D34,#16191E)", border: "1.5px solid rgba(150,160,175,0.3)", boxShadow: "inset 0 0 14px rgba(0,0,0,0.6)" }} />
                  <div style={{ position: "absolute", left: 6, bottom: 6, right: 6, height: 8, background: `repeating-linear-gradient(45deg, ${gelHue[i]}88 0px, ${gelHue[i]}88 7px, rgba(20,22,26,0.9) 7px, rgba(20,22,26,0.9) 14px)`, borderRadius: 2, opacity: 0.7 }} />
                </>}
                {/* a hard blackout flash punching the eye as the bar snaps shut */}
                {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash * 0.62 }} />}
              </div>
              {/* two spark showers flicking off the seam as the name is erased: coloured + white hot */}
              <Sparks lf={lf} x={x} y={plateTop + plateH - 6} on={flash} color={gelHue[i]} n={11} z={35} />
              <Sparks lf={lf + 5} x={x} y={plateTop + plateH - 6} on={flash * 0.7} color="#FFF4C0" n={5} z={35} />
            </React.Fragment>
          );
        })}

        {/* ===== THE SHOCKWAVE FRONT: the surge ripples across the booth, RGB fringed, snapping plates as it passes ===== */}
        {surge && waveX > -140 && waveX < waveSpan && (
          <>
            {/* a red compression fringe leading the front and a cyan one trailing it: the ripple splits colour */}
            <div style={{ position: "absolute", left: waveX - 26, top: 196, width: 11, height: 588, background: "#FF2247", filter: "blur(2px)", opacity: 0.42 * gAmt, mixBlendMode: "screen", zIndex: 36, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: waveX + 16, top: 196, width: 11, height: 588, background: CYAN, filter: "blur(2px)", opacity: 0.42 * gAmt, mixBlendMode: "screen", zIndex: 36, pointerEvents: "none" }} />
            {/* the white hot compression front itself, a bright vertical band tearing across the whole panel */}
            <div style={{ position: "absolute", left: waveX - 8, top: 196, width: 16, height: 588, background: "linear-gradient(90deg, transparent, #FFFFFF, transparent)", filter: "blur(1px)", opacity: 0.85 * gAmt, boxShadow: `0 0 30px #FFFFFF, 0 0 60px ${CYAN}`, mixBlendMode: "screen", zIndex: 37, pointerEvents: "none" }} />
            {/* the widening distortion wake trailing the front, tinted the surge colours */}
            <div style={{ position: "absolute", left: waveX - 96, top: 196, width: 96, height: 588, background: `linear-gradient(90deg, transparent, ${MAGENTA}1E, ${CYAN}1E)`, mixBlendMode: "screen", opacity: 0.5 * gAmt, zIndex: 35, pointerEvents: "none" }} />
          </>
        )}
        {/* a hard white ZAP flash punching the whole panel at the instant of the hit (stays inside the panel x0..1012) */}
        {zap > 0.02 && <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 640, background: "#FFFFFF", opacity: zap * 0.18, mixBlendMode: "screen", zIndex: 44, pointerEvents: "none" }} />}

        {/* ===== HERO FOCAL RIG: the specimen is the ONE thing the eye is allowed to land on first =====
               A hard overhead spot cone drops onto the turntable, a bright warm pool sits under the car and
               a hot halo wraps it. All of it breathes with lf so the focus itself is never a frozen shape. */}
        {/* the overhead cone: a wide beam narrowing down onto the disc, rocking gently */}
        <div style={{ position: "absolute", left: 506 - 300, top: 196, width: 600, height: 470, background: "linear-gradient(180deg, rgba(255,246,224,0.3), rgba(255,238,206,0.12) 52%, rgba(255,236,200,0) 100%)", clipPath: "polygon(34% 0%, 66% 0%, 92% 100%, 8% 100%)", filter: "blur(12px)", opacity: 0.72 * pool, transform: `rotate(${coneWob * 0.12}deg)`, transformOrigin: "50% 0%", mixBlendMode: "screen", zIndex: 13, pointerEvents: "none" }} />
        {/* the big soft LIGHT POOL on the turntable: the brightest broad value anywhere in frame */}
        <div style={{ position: "absolute", left: 506 - 300, top: 424, width: 600, height: 330, background: "radial-gradient(ellipse at 50% 62%, rgba(255,248,232,0.42), rgba(255,240,214,0.16) 46%, transparent 74%)", filter: "blur(16px)", opacity: pool, mixBlendMode: "screen", zIndex: 13, pointerEvents: "none" }} />
        {/* a tight hot core right behind the car so the silhouette gets maximum separation */}
        <div style={{ position: "absolute", left: 506 - 176, top: 470, width: 352, height: 250, background: `radial-gradient(ellipse at 50% 58%, rgba(255,255,255,0.34), ${heroHue}3A 44%, transparent 72%)`, filter: "blur(18px)", opacity: 0.9 * pool, mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />

        {/* ===== THE INSPECTION TURNTABLE: a brushed steel disc the specimen stands on ===== */}
        <div style={{ position: "absolute", left: 506 - 252, top: 636 - 30, width: 504, height: 90, zIndex: 16 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 42%, #363C45 0%, #1D2127 60%, #0C0D10 100%)", border: "2px solid rgba(180,192,208,0.5)", boxShadow: "0 18px 34px -12px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)" }} />
          {/* a bright coloured sweep crawling the disc, tinted to the specimen on show */}
          <div style={{ position: "absolute", left: 60, top: 12, width: 384, height: 66, borderRadius: "50%", background: `conic-gradient(from ${turn}deg, transparent, ${heroHue}88, transparent 42%)`, mixBlendMode: "screen", opacity: 0.72 }} />
          {/* a chrome rim ring and a vivid accent band on the base */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${CHROME}88`, filter: "blur(0.4px)" }} />
          <div style={{ position: "absolute", left: 30, top: 6, width: 444, height: 78, borderRadius: "50%", border: "6px solid transparent", borderTopColor: `${CYAN}88`, opacity: 0.8, transform: `rotate(${turn * 0.6}deg)` }} />
        </div>

        {/* the specimen contact shadow, a warm key pool and a vivid accent underglow */}
        <CastShadow x={506} y={636} w={340} o={0.58} />
        <div style={{ position: "absolute", left: 506 - 170, top: 470, width: 340, height: 340, background: `radial-gradient(ellipse at 50% 14%, ${KEY}33, transparent 70%)`, filter: "blur(9px)", zIndex: 17, pointerEvents: "none" }} />
        {/* the accent floor halo CROSS DISSOLVES paint to paint under the car, so the pool of colour is never dark mid swap */}
        {fc > 0 && swapIn < 0.999 && <div style={{ position: "absolute", left: 506 - 156, top: 616, width: 312, height: 50, borderRadius: "50%", background: `radial-gradient(ellipse, ${fill[fc - 1]}, transparent 68%)`, filter: "blur(12px)", opacity: (1 - swapIn) * (0.9 + Math.sin(lf / 9) * 0.1) * 0.8, zIndex: 17, mixBlendMode: "screen", pointerEvents: "none" }} />}
        <div style={{ position: "absolute", left: 506 - 156, top: 616, width: 312, height: 50, borderRadius: "50%", background: `radial-gradient(ellipse, ${heroHue}, transparent 68%)`, filter: "blur(12px)", opacity: (fc > 0 ? (0.55 + swapIn * 0.55) : (0.7 + swapIn * 0.35)) * (0.9 + Math.sin(lf / 9) * 0.1), zIndex: 17, mixBlendMode: "screen", pointerEvents: "none" }} />
        {/* COLOURED RIM WRAPS behind the car: an AZURE kiss one flank + a MAGENTA kiss the other so the
            hero edge separates from the set with bold complementary colour, not grey */}
        <div style={{ position: "absolute", left: 506 - 190, top: 470, width: 200, height: 220, background: `radial-gradient(ellipse at 78% 42%, ${AZURE}, transparent 64%)`, filter: "blur(10px)", opacity: 0.66, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 506 - 10, top: 470, width: 200, height: 220, background: `radial-gradient(ellipse at 22% 42%, ${MAGENTA}, transparent 64%)`, filter: "blur(10px)", opacity: 0.64, mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />

        {/* ===== THE HERO: a big glossy specimen car, ALWAYS present and lit through the swap, now graded
               hotter, more saturated and carrying its own glow drop shadow so it lifts off the room ===== */}
        {/* the OUTGOING specimen stays fully lit and only fades as the incoming rises: a true cross dissolve */}
        {fc > 0 && swapIn < 0.999 && (
          <div style={{ transform: `translateY(${idle}px)`, opacity: 1 - swapIn, filter: heroGrade, zIndex: 25 }}>
            <Car x={506} y={636} s={1.56} solve={solves[fc - 1]} build={1} glow={0.85} reflect={0.58} z={25} />
          </div>
        )}
        {/* the INCOMING specimen settles in over it with a subtle scale pop, so a lit car is on the turntable every frame */}
        <div style={{ transform: `translateY(${idle + (1 - swapIn) * 4}px)`, opacity: fc > 0 ? swapIn : 0.15 + swapIn * 0.85, filter: heroGrade, zIndex: 26 }}>
          <Car x={506} y={636} s={heroS} solve={heroSolve} build={1} glow={0.85} reflect={0.58} z={26} />
        </div>
        {/* a warm headlight flare off the specimen front */}
        <div style={{ position: "absolute", left: 506 + 150, top: 546, width: 170, height: 74, borderRadius: "50%", background: "radial-gradient(ellipse at 18% 50%, rgba(255,246,214,0.9), transparent 70%)", filter: "blur(4px)", opacity: (0.5 + swapIn * 0.4), zIndex: 27, pointerEvents: "none" }} />
        {/* a crisp coloured specular glint riding the roof, keeps the car looking wet and expensive */}
        <div style={{ position: "absolute", left: 506 - 120, top: 486, width: 240, height: 8, borderRadius: 4, background: "linear-gradient(90deg, transparent, #FFFFFF, transparent)", opacity: 0.55 + Math.sin(lf / 10) * 0.16, filter: "blur(1px)", mixBlendMode: "screen", zIndex: 28, pointerEvents: "none" }} />
        {/* a thin bright RIM ARC hugging the roofline, the last touch of separation from the back wall */}
        <div style={{ position: "absolute", left: 506 - 150, top: 476, width: 300, height: 120, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderBottomColor: "transparent", borderLeftColor: `${AZURE}88`, borderRightColor: `${MAGENTA}88`, filter: "blur(2.4px)", opacity: 0.44 + Math.sin(lf / 14) * 0.1, mixBlendMode: "screen", zIndex: 27, pointerEvents: "none" }} />

        {/* ===== THE SIXTH: the BLIND grader, presiding upper right. Still readable, but pulled DOWN a step
               in brightness so it supports the beat instead of rivalling the car for first look ===== */}
        <Spotlight x={906} y={188} w={236} h={230} color={CYAN} o={0.32 + standby * 0.1} poolY={404} poolW={196} />
        {/* a CYAN halo so the judge separates from the booth, breathing at f128 */}
        <div style={{ position: "absolute", left: 812, top: 240, width: 216, height: 216, borderRadius: "50%", background: `radial-gradient(circle, ${CYAN}3A, transparent 62%)`, filter: "blur(14px)", opacity: 0.48 + standby * 0.2, mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 906 - ringR, top: 344 - ringR, width: ringR * 2, height: ringR * 2, borderRadius: "50%", border: `3px solid ${CYAN}`, borderTopColor: "transparent", borderRightColor: "transparent", opacity: 0.34, boxShadow: `0 0 12px ${CYAN}`, transform: `rotate(${lf * 2.0}deg)`, zIndex: 15, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 830, top: 258, zIndex: 15, filter: "brightness(0.86) saturate(0.92)" }}>
          <Sixth lf={lf} size={152} rim={1} />
        </div>
        {/* a bright accent bar riding the blindfold: the redaction reflected on the judge who cannot see */}
        <div style={{ position: "absolute", left: 872, top: 258 + 152 * 0.40 - 3, width: 152 * 0.44, height: 8, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${MAGENTA}, ${CYAN}, transparent)`, opacity: 0.42 + signPulse * 0.3, boxShadow: `0 0 10px ${CYAN}`, mixBlendMode: "screen", zIndex: 18, pointerEvents: "none" }} />
        {/* the booth glass over the Sixth: a faint sheet plus a crawling reflection streak */}
        <div style={{ position: "absolute", left: 806, top: 240, width: 206, height: 196, background: "linear-gradient(180deg, rgba(150,180,210,0.04), rgba(60,80,110,0.02))", borderTop: `2px solid ${CYAN}33`, zIndex: 16, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: `${806 + glass * 1.4}px`, top: 240, width: 66, height: 196, background: "linear-gradient(105deg, transparent, rgba(190,225,240,0.1), transparent)", transform: "skewX(-16deg)", zIndex: 16, pointerEvents: "none" }} />
        {/* the Sixth's clipboard, one line going dark per redaction (at the judge's hands, clear of the face) */}
        <div style={{ position: "absolute", left: 812, top: 390, width: 44, height: 56, background: "#AEBACD", border: "3px solid #626F88", borderRadius: 4, transform: "rotate(-8deg)", zIndex: 20, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.6)" }}>
          {[0, 1, 2, 3, 4].map((r) => <div key={r} style={{ position: "absolute", left: 6, top: 8 + r * 8, width: 28, height: 3, background: r < 5 - blacked ? "rgba(60,74,104,0.7)" : "#0A0B0D", borderRadius: 1 }} />)}
        </div>

        {/* TAKE ONE at the door light seam, far right, only a shadow that flinches on the last seal */}
        <div style={{ position: "absolute", left: 968 + flinch, top: 300, width: 4, height: 300, background: "linear-gradient(180deg,transparent,#CFE0F2,transparent)", opacity: 0.4, boxShadow: `0 0 12px ${CYAN}66`, zIndex: 40 }} />
        <div style={{ position: "absolute", left: 946 + flinch, top: 452, width: 130, height: 60, borderRadius: "50%", background: `radial-gradient(ellipse, ${CYAN}30, transparent 66%)`, opacity: 0.26, filter: "blur(10px)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 956 + flinch, top: 436, zIndex: 41, filter: "brightness(0.28) blur(0.5px)", opacity: 0.85 }}>
          <Villain lf={lf} size={116} flag={1} wave={0.3 + Math.sin(lf / 20) * 0.2} nodAmp={0.5} nodSpeed={30} rim={0.7} />
        </div>

        {/* ===== FOREGROUND: the appraisal console across the bottom (carbon fibre + brushed steel) ===== */}
        <div style={{ position: "absolute", left: -40, top: 700, right: -40, height: 130, background: "linear-gradient(180deg,#1B1F25,#0A0C0F)", borderTop: "2px solid rgba(150,160,175,0.32)", boxShadow: "0 -8px 26px rgba(0,0,0,0.6)", zIndex: 50 }} />
        {/* a carbon fibre twill weave on the console face */}
        <div style={{ position: "absolute", left: -40, top: 702, right: -40, height: 128, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 3px, transparent 3px, transparent 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 3px, transparent 3px, transparent 6px)", opacity: 0.5, zIndex: 51 }} />
        {/* a vivid scrolling accent stripe along the console lip */}
        <div style={{ position: "absolute", left: -40, top: 700, right: -40, height: 7, background: `repeating-linear-gradient(45deg, ${MAGENTA} 0px, ${MAGENTA} 12px, rgba(20,22,26,0.85) 12px, rgba(20,22,26,0.85) 24px)`, backgroundPositionX: (lf * 2.4) % 48, opacity: 0.5, boxShadow: `0 0 6px ${MAGENTA}44`, zIndex: 52 }} />
        {/* brushed steel precision gauges with fine needles, coloured accent rings */}
        {[100, 176, 252].map((gx, i) => { const c = [CYAN, NEONORANGE, MAGENTA][i]; return (
          <div key={`g${i}`} style={{ position: "absolute", left: gx, top: 726, width: 48, height: 48, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #262B32, #0F1115)", border: "2px solid rgba(160,170,185,0.4)", boxShadow: `inset 0 0 10px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.5), 0 0 8px ${c}33`, zIndex: 53 }}>
            <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: `1px solid ${c}66` }} />
            <div style={{ position: "absolute", left: 22, top: 8, width: 2.5, height: 17, background: c, opacity: 0.8, transformOrigin: "50% 100%", transform: `rotate(${Math.sin(lf / 8 + i * 1.4) * 116}deg)`, boxShadow: `0 0 4px ${c}` }} />
            <div style={{ position: "absolute", left: 21, top: 21, width: 6, height: 6, borderRadius: "50%", background: CHROME }} />
          </div>); })}
        {/* a steel framed monitor with a vivid waveform (the identity log going blank) */}
        <div style={{ position: "absolute", left: 336, top: 724, width: 190, height: 54, borderRadius: 5, background: "#0A0D12", border: "2px solid rgba(150,160,175,0.4)", boxShadow: `inset 0 0 16px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5), 0 0 8px ${CYAN}26`, overflow: "hidden", zIndex: 53, opacity: 0.86 }}>
          <svg width={190} height={34} viewBox="0 0 190 34" style={{ position: "absolute", left: 0, top: 10 }}>
            <path d={wave(190, 8, lf / 5, 20)} fill="none" stroke={CYAN} strokeWidth={2} opacity={0.72} />
            <path d={wave(190, 5, lf / 5 + 1.6, 14)} fill="none" stroke={MAGENTA} strokeWidth={1.5} opacity={0.48} />
          </svg>
          <div style={{ position: "absolute", left: `${(lf * 3) % 190}px`, top: 0, bottom: 0, width: 1.5, background: `${CYAN}77`, boxShadow: `0 0 6px ${CYAN}` }} />
        </div>
        {/* a verdict readout: rows go dark as identities are erased */}
        <Board x={556} y={726} rows={5} filled={5 - blacked} s={1.1} hue={CYAN} o={0.76} />
        {/* a row of steel toggle keys, blinking in vivid colour */}
        {[724, 762, 800, 838].map((bxp, i) => { const on = (Math.sin(lf / 7 + i * 1.6) + 1) / 2; const c = [CYAN, MAGENTA, NEONORANGE, LIME][i]; return (
          <div key={`btn${i}`} style={{ position: "absolute", left: bxp, top: 748, width: 28, height: 26, borderRadius: 5, background: "linear-gradient(180deg,#252A32,#111419)", border: "1.5px solid rgba(160,170,185,0.36)", boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 ${4 + on * 7}px ${c}${on > 0.5 ? "88" : "44"}`, zIndex: 53 }}>
            <div style={{ position: "absolute", left: 6, top: 9, width: 16, height: 4, borderRadius: 2, background: c, opacity: 0.35 + on * 0.45, boxShadow: `0 0 4px ${c}` }} />
          </div>); })}
        {/* a braided cable snaking off the console + a tethered scanner wand at rest */}
        <svg width={220} height={70} viewBox="0 0 220 70" style={{ position: "absolute", left: 470, top: 700, zIndex: 52, overflow: "visible" }}>
          <path d="M 8 4 C 60 34, 140 44, 206 22" fill="none" stroke="#16191E" strokeWidth={6} strokeLinecap="round" />
          <path d="M 8 4 C 60 34, 140 44, 206 22" fill="none" stroke="#333941" strokeWidth={2.5} strokeDasharray="2 4" />
        </svg>
        <div style={{ position: "absolute", left: 672, top: 708, width: 44, height: 16, borderRadius: 4, background: "linear-gradient(180deg,#343A43,#1B1F25)", border: "1.5px solid rgba(160,170,185,0.4)", transform: "rotate(-12deg)", boxShadow: "0 3px 8px -3px rgba(0,0,0,0.7)", zIndex: 53 }}>
          <div style={{ position: "absolute", left: 4, top: 5, width: 6, height: 6, borderRadius: "50%", background: MAGENTA, opacity: 0.35 + standby * 0.4, boxShadow: `0 0 5px ${MAGENTA}` }} />
        </div>
        {/* the breathing verdict LED, alive at f128 */}
        <div style={{ position: "absolute", left: 892, top: 760, width: 11, height: 11, borderRadius: "50%", background: NEONORANGE, opacity: 0.35 + standby * 0.45, boxShadow: `0 0 ${6 + standby * 10}px ${NEONORANGE}`, zIndex: 54 }} />
        {/* a soft scrim settling the whole console tier back, so the busy dials never grab first look */}
        <div style={{ position: "absolute", left: -60, top: 698, right: -60, height: 140, background: "linear-gradient(180deg, rgba(6,4,16,0.18), rgba(6,4,16,0.44))", zIndex: 55, pointerEvents: "none" }} />

        {/* the final edge darkening: a tight focus vignette over everything except the lit specimen, so the
            eye is funnelled to the turntable within a split second */}
        <div style={{ position: "absolute", left: -60, top: -60, right: -60, bottom: -60, background: `radial-gradient(ellipse 40% 30% at 50% 60%, rgba(5,3,14,0) 0%, rgba(5,3,14,0.2) 56%, rgba(5,3,14,0.56) 100%)`, zIndex: 56, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -60, top: -60, right: -60, bottom: -60, boxShadow: "inset 0 0 240px rgba(5,3,14,0.62)", zIndex: 57, pointerEvents: "none" }} />
      </div>

      {/* the scene label + vignette ride OUTSIDE the camera so they stay locked */}
      <SceneTag f={lf} text="NAMES OFF" color={CYAN} />
      <Vig o={0.34} />
    </AbsoluteFill>
  );
};

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  // ============================ S7 THE PODIUM (winner), VIBRANT ============================
  // SETTING (unchanged): a night RACE-TRACK finish. A start-finish line under tiered GRANDSTANDS, a
  // winners' PODIUM, five cars staged at the line, a checkered FINISH banner, light towers, a car
  // CRUSHER off left. SAME premium high-end CAR COMMERCIAL chassis (graphite arena, warm KEY key
  // light, brushed steel, chrome, glossy floor reflections) but now DRENCHED in bold saturated colour
  // gels (ELECTRIC blue + MAGENTA washes, a raking CYAN sweep, coloured rim on the hero) and ALIVE
  // with motion. Premium AND vibrant at once: expensive gels, not cheap arcade tubes.
  // COLOUR IDENTITY: ELECTRIC-blue + MAGENTA arena, CYAN raking beams, a warm GOLD crown on the winner.
  // CAMERA (unchanged): LOW-ANGLE hero shot, tight and looking slightly up at the tangerine winner,
  // then at f66 the car is CROWNED in warm GOLD and the camera PULLS BACK (1.62 to 1.0) to reveal the
  // four losers, the crowd, the podium, and the crusher junking Take One's grey car.
  // STORY (unchanged, reads on mute): five cars staged, plates blacked. Car FOUR (tangerine, solve 4)
  // is CROWNED as the WINNER (warm GOLD crown, spent HERE only). Take One's grey car is dragged into the
  // CRUSHER and slammed flat to a cube. He is now just one of FIVE identical grey copies in the stands.
  //
  // HIERARCHY PASS (Alex: "I must see the main focus much more easily"). ONE focal point: the TANGERINE
  // WINNER CAR on the podium, now crowned by a big GOLD TROPHY lowered into place over it.
  //   HERO  = biggest, brightest, sharpest, most saturated. Bumped scale, a saturate / contrast lift, a
  //           wide warm LIGHT POOL, a stronger GOLD rim halo and a calm pocket of dark behind it.
  //   BACK  = everything behind the podium keeps ALL its detail and ALL its motion, but is pushed back by
  //           a single BACKDROP KNOCKDOWN plate at z26 (brightness down ~30%, saturation down, a touch of
  //           blur) plus extra blur + lower contrast on the far layers. Alive, but clearly second.
  //   FRAME = a focal vignette centred on the car darkens the edges so the eye lands in a split second.
  // WINNER WORDMARK FIX: it used to cross the checkered banner and turn to mush. It now sits well ABOVE
  //   the flag band on its own solid darkened backing plate at z53. Big, bold, fully legible.
  // BACKGROUND (kept, just secondary): three receding + ANIMATED depth layers pack the arena:
  //   FAR   = a blurred cool stadium BOWL ringing the top, a distant bobbing crowd + far camera flashes.
  //   MID   = two SWEEPING floodlight towers, a cycling JUMBOTRON, marshals waving flags, FIREWORKS on the
  //           win, and a PIT-LANE WALL carrying a scrolling LED hoarding behind the staged cars.
  //   NEAR  = the existing tiered grandstand, light masts, truss, banner and tyre-barrier frame.

  // ---- CAMERA: creep in tight (low angle), then pull back wide at the gold crown reveal ----
  const cam = lf < 66
    ? interpolate(lf, [0, 66], [1.80, 1.62], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })
    : interpolate(lf, [66, 146], [1.62, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camY = lf < 66
    ? interpolate(lf, [0, 66], [60, 48], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(lf, [66, 146], [48, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const kick = (lf >= 66 && lf < 80) ? Math.sin((lf - 66) * 2.0) * (3.4 - (lf - 66) * 0.24) : 0;
  const camX = kick * 0.5;

  // ---- VIBRANT drivers: drifting colour washes, raking beams, a colour riser, pulsing LEDs ----
  const colO = over(lf, 0, 18);                        // the saturated gels bloom up fast, frame reads colourful at once
  const driftA = Math.sin(lf / 33) * 72;               // the big ELECTRIC wash drifts left to right
  const driftB = Math.cos(lf / 29) * 72;               // the big MAGENTA wash drifts the other way
  const sweepX = ((lf * 8) % 1460) - 360;              // a bright CYAN beam rakes across, repeating (never stops)
  const sweep2X = ((lf * 6 + 760) % 1460) - 360;       // a second ELECTRIC beam rakes offset
  const beamTilt = Math.sin(lf / 17) * 5;              // the raking beams tilt as they sweep
  const riser = over(lf, 40, 26);                      // a colour + haze RISER builds toward the crown
  const ledPulse = 0.5 + 0.5 * Math.sin(lf / 5);       // signage / rim LEDs pulse
  const flagWave = Math.sin(lf / 4.5);                 // the marshal's checkered flag waves the whole scene

  // ---- BACKGROUND MOTION drivers: nothing back here ever freezes (all still live at f146) ----
  const floodA = Math.sin(lf / 40) * 22;               // far floodlight beam sweeps the stands
  const floodB = Math.sin(lf / 40 + 1.6) * 22;         // the paired tower sweeps in counterphase
  const jumboCyc = Math.floor(lf / 26) % 3;            // the JUMBOTRON cycles its graphic every 26f
  const jumboScan = (lf * 6) % 172 - 20;               // a scanline rolls down the jumbotron panel
  const jumboFlick = 0.86 + Math.sin(lf / 3.3) * 0.06; // subtle screen flicker
  const hoard = lf * 6;                                // the trackside LED hoarding scrolls left forever
  const hoardGlare = (lf * 11) % 1100 - 60;            // a glare travels the hoarding ribbon

  // ---- reveal plus beat ramps ----
  const winIn = over(lf, 66, 12);                      // winner crowns in warm GOLD. the crown lives HERE only.
  const gpulse = 0.5 + 0.5 * Math.sin(lf / 6);
  const standIn = over(lf, 60, 26);                    // grandstand crowd fades up as we widen
  const revealCars = over(lf, 72, 22);                 // the four losers slide into view
  const crushIn = over(lf, 60, 16);                    // the crusher station reveals (early, so it is there when Take One is hauled in)
  const clonesIn = over(lf, 96, 22);                   // the five identical grey copies in the stands
  const rev = lf >= 118 ? Math.max(0, Math.sin((lf - 118) * 0.55)) * ramp(lf, 118, 126) : 0;  // triumphant rev
  const keyBreath = 0.9 + Math.sin(lf / 22) * 0.08;    // the arena key light breathing
  const winBurst = ramp(lf, 66, 71) * (1 - ramp(lf, 66, 96));    // a spark + confetti burst on the crown
  const winBurst2 = ramp(lf, 118, 123) * (1 - ramp(lf, 118, 146)); // a second burst on the rev

  // ---- THE GOLD TROPHY presented OVER the winner: it is lowered from the truss, settles with a small
  //      overshoot, then hangs breathing above the car with a shine sweep + sparkle glints ----
  const tIn = over(lf, 62, 22, Easing.out(Easing.back(1.5)));    // the trophy descends into place
  const tOp = Math.min(1, over(lf, 62, 10));                     // and fades up as it arrives
  const tSettle = ramp(lf, 82, 96);                              // once landed it breathes instead of falling
  const tY = 296 - (1 - tIn) * 250 + Math.sin(lf / 11) * 3 * tSettle;
  const tShine = ((lf * 4.2) % 220) - 70;                        // a specular sweep travels the cup, forever
  const tRayRot = lf * 0.9;                                      // the gold light rays behind it turn slowly
  const tGlow = 0.62 + 0.38 * Math.sin(lf / 7);                  // the trophy halo breathes
  const tLand = ramp(lf, 80, 86) * (1 - ramp(lf, 86, 104));      // the landing flash

  // ---- crusher: grey car drops in, ram slams, cube forms plus holds (backhand, unremarked) ----
  const drop = over(lf, 74, 10);                       // the grey car falls into the jaws
  const jawClose = over(lf, 84, 10);                   // the ram slams down
  const cubeIn = over(lf, 92, 8);                      // the pressed grey cube, holds to the end
  const cubeGlint = ((lf * 2.2) % 150) - 40;
  const jawShake = jawClose > 0.1 && jawClose < 1 ? Math.sin(lf * 3.2) * 2.4 * (1 - jawClose) : 0; // ram judder as it slams
  // ---- Take One's GREY car LOSES (a clear before/after): dragged in from the line, dropped, slammed flat ----
  const haulIn = over(lf, 58, 16);                                                            // the grey Take-One car is shoved toward the crusher
  const doomX = interpolate(lf, [58, 74], [258, 118], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const doomS = interpolate(lf, [58, 74], [0.56, 0.48], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const doomY = 600 + drop * 42;                                                              // sits at the throat, then drops into the jaws
  const doomSquash = 1 - jawClose * 0.74;                                                     // the ram slams it flat
  const doomVis = haulIn * (1 - cubeIn);                                                       // hauled in, then gone the instant the grey cube forms
  const doomShove = haulIn > 0.02 && haulIn < 1 ? Math.sin(lf * 2.4) * 1.6 : 0;                // judder as it is dragged across the floor

  // ---- the five staged cars. winner = solve 4 (tangerine), centre plus big. losers flank plus recede ----
  const losers = [
    { x: 200, y: 556, s: 0.58, solve: 1, hue: CAR_CHERRY, acc: "#E8586A" },   // cherry, staged line left
    { x: 342, y: 530, s: 0.48, solve: 2, hue: CAR_BLUE, acc: "#5E8FDE" },      // blue, further back left
    { x: 670, y: 530, s: 0.48, solve: 3, hue: CAR_LIME, acc: "#8FD05E" },      // lime, further back right
    { x: 812, y: 556, s: 0.58, solve: 5, hue: CAR_VIOLET, acc: "#B98FE0" },    // violet, staged line right
  ];
  const winX = 506, winY = 588;

  // ---- the five identical grey copies, sat in the stands. sameness IS the thesis ----
  const cloneX = [378, 454, 530, 606, 682];

  // brushed metal plus hazard helpers (real materials, kept premium under the colour gels)
  const brushed = "repeating-linear-gradient(90deg, #3A4149 0px, #2C323A 2px, #434B54 4px, #2C323A 6px)";
  const hazard = "repeating-linear-gradient(45deg, #C9A227 0px, #C9A227 12px, #16181C 12px, #16181C 24px)";
  // VIBRANT crowd: saturated confetti-lit heads, no longer grey
  const crowdCols = [MAGENTA, CYAN, NEONGOLD, ELECTRIC, HOTPINK, LIME];

  return (
    <AbsoluteFill>
      {/* ===== CAMERA WRAPPER: low angle hero, then pull back wide ===== */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY + kick * 0.3}px)`, transformOrigin: "50% 60%" }}>

        {/* ===== 1. BACKGROUND: the graphite arena cyclorama + GLOSSY floor, raked ELECTRIC blue + MAGENTA ===== */}
        <GarageFloor horizon={312} hue={KEY} gel={ELECTRIC} gel2={MAGENTA} o={1} />

        {/* 1b. BIG SATURATED COLOUR WASHES: complementary ELECTRIC + MAGENTA drifting, a VIOLET core behind
             the podium, plus raking CYAN + ELECTRIC beams. Kept and still drifting, just dialled back so they
             LIGHT the set instead of shouting over the hero. */}
        <GelWash x={250 + driftA} y={300} w={880} h={640} color={ELECTRIC} o={colO * 0.22} blur={92} z={1} />
        <GelWash x={780 + driftB} y={330} w={860} h={640} color={MAGENTA} o={colO * 0.20} blur={92} z={1} />
        <GelWash x={506} y={240} w={620} h={440} color={VIOLET} o={colO * (0.10 + riser * 0.10)} blur={84} z={1} />
        <GelBar x={sweepX} y={180} w={440} h={230} color={CYAN} o={colO * 0.22} rot={12 + beamTilt} z={2} />
        <GelBar x={sweep2X} y={360} w={440} h={210} color={ELECTRIC} o={colO * 0.17} rot={-10 + beamTilt} z={2} />

        {/* ===== FAR DEPTH LAYER: a distant stadium BOWL ringing the arena, cool, now HEAVILY blurred and
             desaturated so it plainly sits behind everything. All of its motion is untouched. ===== */}
        <div style={{ position: "absolute", left: -40, top: 40, width: 1092, height: 152, zIndex: 2, filter: "blur(6px) saturate(0.55) brightness(0.72)", opacity: 0.6 }}>
          {/* the far curved stand wall (cool + dark = distance) */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 0 0 / 62% 62% 0 0", background: `linear-gradient(180deg, ${NIGHT2} 0%, ${CHARCOAL} 68%, ${NIGHT} 100%)`, boxShadow: "inset 0 -22px 44px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 0 0 / 62% 62% 0 0", background: `linear-gradient(90deg, ${ELECTRIC}22, transparent 46%, ${MAGENTA}22)`, opacity: colO * 0.5, mixBlendMode: "screen" }} />
          {/* the DISTANT CROWD: tiny cool specks bobbing + twinkling far away */}
          {Array.from({ length: 96 }, (_, i) => {
            const s = seed(i * 3.9 + 5);
            const c = i % 4 === 0 ? CYAN : i % 4 === 1 ? ELECTRIC : "#8FA0C8";
            const bob = Math.sin(lf / 9 + i * 1.7) * 2;                                 // the far crowd bobs
            const tw = 0.3 + 0.5 * ((Math.sin(lf / 7 + i * 1.3) + 1) / 2);              // and twinkles
            return <div key={"fc" + i} style={{ position: "absolute", left: (i % 32) * (1092 / 32) + s * 8, top: 44 + Math.floor(i / 32) * 28 + s * 8 + bob, width: 3, height: 3, borderRadius: "50%", background: c, opacity: tw * 0.6, boxShadow: `0 0 4px ${c}` }} />;
          })}
          {/* far camera FLASHES popping across the distant bowl */}
          {Array.from({ length: 10 }, (_, i) => {
            const cyc = Math.floor((lf + i * 7) / 24);
            const age = (lf + i * 7) % 24;
            const s = seed(i * 5.1 + cyc * 2.7);
            const o = Math.max(0, 1 - age / 3) * (0.5 + standIn * 0.5);
            return <div key={"ffl" + i} style={{ position: "absolute", left: 40 + s * 1000, top: 34 + seed(i * 2.2 + cyc) * 90, width: 5, height: 5, borderRadius: "50%", background: "#EAF2FF", opacity: o * 0.7, boxShadow: "0 0 8px #EAF2FF" }} />;
          })}
        </div>

        {/* ===== MID DEPTH: two distant FLOODLIGHT towers, lattice masts + slow SWEEPING beams over the crowd ===== */}
        {[{ x: 236, c: CYAN, sw: floodA, ph: 0 }, { x: 776, c: MAGENTA, sw: floodB, ph: 1.6 }].map((t, i) => (
          <React.Fragment key={"ff" + i}>
            {/* the raked SWEEPING cone of light from the tower head (screen-blended, glows over the stands) */}
            <div style={{ position: "absolute", left: t.x - 9, top: 46, width: 18, height: 320, transformOrigin: "50% 0%", transform: `rotate(${t.sw}deg)`, background: `linear-gradient(180deg, ${t.c}55, ${t.c}18 42%, transparent 80%)`, filter: "blur(9px)", opacity: (0.11 + colO * 0.10) * (0.7 + standIn * 0.3), mixBlendMode: "screen", zIndex: 6 }} />
            {/* the lattice mast, blurred so it sits back */}
            <div style={{ position: "absolute", left: t.x - 4, top: 44, width: 8, height: 80, background: "repeating-linear-gradient(180deg,#2A313C 0px,#20262F 5px,#333B46 10px)", filter: "blur(1.6px)", opacity: 0.8, zIndex: 3 }} />
            {/* the floodlight HEAD: a bank of flickering cool lamps */}
            <div style={{ position: "absolute", left: t.x - 27, top: 28, width: 54, height: 22, borderRadius: 3, background: "linear-gradient(180deg,#242A33,#12151A)", border: "1px solid #3A424D", boxShadow: `0 0 10px ${t.c}44`, filter: "blur(1.2px)", opacity: 0.82, zIndex: 6 }}>
              {Array.from({ length: 9 }, (_, k) => <div key={k} style={{ position: "absolute", left: 5 + (k % 3) * 15, top: 4 + Math.floor(k / 3) * 6, width: 11, height: 4, borderRadius: 1, background: k % 4 ? "#EAF3FF" : t.c, boxShadow: `0 0 6px ${t.c}`, opacity: 0.45 + Math.sin(lf / 4 + k + i) * 0.25 }} />)}
            </div>
          </React.Fragment>
        ))}

        {/* ===== MID DEPTH: the JUMBOTRON on a gantry, cycling graphics + rolling scanline (always live, now
             softened + dimmed so its bright screen stops fighting the podium) ===== */}
        {(() => {
          const jx = 388, jy = 8, jw = 236, jh = 130;
          return (
            <div style={{ position: "absolute", left: jx, top: jy, width: jw, height: jh, zIndex: 4, filter: "blur(2.2px) saturate(0.7) brightness(0.72)", opacity: 0.82 }}>
              {/* the gantry mast dropping behind the stand */}
              <div style={{ position: "absolute", left: jw / 2 - 5, top: jh - 6, width: 10, height: 122, background: brushed, zIndex: 3 }} />
              {/* the screen bezel */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(180deg,#20242C,#0E1116)", border: "3px solid #3A424D", boxShadow: `0 10px 26px -8px rgba(0,0,0,0.8), 0 0 18px ${CYAN}22`, overflow: "hidden" }}>
                {/* the lit screen base, colour keyed to the current cycle */}
                <div style={{ position: "absolute", inset: 4, borderRadius: 4, opacity: jumboFlick, background: jumboCyc === 0 ? `linear-gradient(180deg,${ELECTRIC}cc,${NIGHT})` : jumboCyc === 1 ? `linear-gradient(180deg,${MAGENTA}bb,${NIGHT2})` : `linear-gradient(180deg,${CHARCOAL},${NIGHT})` }} />
                {/* the scrolling header ticker */}
                <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: 15, background: "rgba(0,0,0,0.42)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 2, left: -((lf * 3) % 300), whiteSpace: "nowrap", color: NEONGOLD, fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 9, letterSpacing: 2, textShadow: `0 0 6px ${NEONGOLD}` }}>PHOTO FINISH &middot; WINNER CROWNED &middot; PHOTO FINISH &middot; WINNER CROWNED &middot;</div>
                </div>
                {/* the cycling centre graphic */}
                {jumboCyc === 0 && <div style={{ position: "absolute", inset: 0, top: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFDF4", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 58, textShadow: `0 0 18px ${CYAN}` }}>P1</div>}
                {jumboCyc === 1 && <div style={{ position: "absolute", left: 26, top: 34, right: 26, bottom: 26, borderRadius: 4, overflow: "hidden" }}>
                  {Array.from({ length: 8 * 4 }, (_, k) => { const c = k % 8, r = Math.floor(k / 8); return <div key={k} style={{ position: "absolute", left: c * (184 / 8), top: r * 16, width: 184 / 8, height: 16, background: (c + r) % 2 ? "#C9CDD4" : "#111317" }} />; })}
                </div>}
                {jumboCyc === 2 && <div style={{ position: "absolute", inset: 0, top: 18, display: "flex", alignItems: "center", justifyContent: "center", color: NEONGOLD, fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 34, letterSpacing: 3, textShadow: `0 0 16px ${NEONGOLD}` }}>FINISH</div>}
                {/* the equaliser bars, always dancing */}
                {Array.from({ length: 22 }, (_, k) => { const h = 6 + (Math.sin(lf / 4 + k * 0.7) + 1) * 10; const cc = k % 2 ? CYAN : MAGENTA; return <div key={"eq" + k} style={{ position: "absolute", left: 9 + k * 10, bottom: 5, width: 6, height: h, background: cc, opacity: 0.7, borderRadius: 1, boxShadow: `0 0 5px ${cc}` }} />; })}
                {/* the rolling scanline + CRT texture */}
                <div style={{ position: "absolute", left: 0, right: 0, top: jumboScan, height: 14, background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)" }} />
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent 0px,transparent 2px,rgba(0,0,0,0.16) 3px)", opacity: 0.5 }} />
              </div>
            </div>
          );
        })()}

        {/* 2 to 4. arena STUDIO LIGHTING: warm KEY from up high, plus SATURATED coloured fills each side */}
        <StudioLight x={506} y={110} w={980} h={560} color={KEY} o={0.17 * keyBreath} z={2} />
        <StudioLight x={80} y={360} w={560} h={700} color={ELECTRIC} o={0.11 + colO * 0.07} z={2} />
        <StudioLight x={932} y={360} w={560} h={700} color={MAGENTA} o={0.10 + colO * 0.07} z={2} />
        <StudioLight x={506} y={430} w={520} h={520} color={TEAL} o={colO * 0.06} z={2} />

        {/* 5 plus 6. the tiered GRANDSTAND: dark steel structure, a confetti-lit crowd shimmer, now softened
             (blur + lower contrast) so 118 twinkling heads stop competing with the podium */}
        <div style={{ position: "absolute", left: 0, top: 118, width: 1012, height: 196, zIndex: 5, opacity: (0.5 + standIn * 0.5) * 0.9, filter: "blur(1.6px) saturate(0.78) brightness(0.94)" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${NIGHT2} 0%, ${NIGHT} 66%, ${CHARCOAL} 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${ELECTRIC}22, transparent 40%, ${MAGENTA}22)`, opacity: colO * 0.6, mixBlendMode: "screen" }} />
          {[0, 1, 2, 3].map((r) => (
            <div key={"tr" + r} style={{ position: "absolute", left: 0, right: 0, top: 18 + r * 44, height: 3, background: `linear-gradient(90deg, ${CYAN}33, rgba(255,243,224,0.12) 50%, ${MAGENTA}33)` }} />
          ))}
          {Array.from({ length: 118 }, (_, i) => {
            const s = seed(i * 1.7);
            const c = crowdCols[Math.floor(seed(i * 2.3) * crowdCols.length)];
            const bob = Math.sin(lf / 7 + i * 2.1) * 3;                                 // the crowd bobs
            const tw = 0.4 + 0.6 * ((Math.sin(lf / 6 + i * 2.1) + 1) / 2);              // and twinkles
            return <div key={"cw" + i} style={{ position: "absolute", left: (i % 30) * (1012 / 30) + s * 12, top: 12 + Math.floor(i / 30) * 44 + s * 10 + bob, width: 5, height: 5, borderRadius: "50%", background: c, opacity: tw * 0.62, boxShadow: `0 0 6px ${c}` }} />;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: `linear-gradient(180deg, ${CYAN}33, transparent)` }} />
        </div>

        {/* ===== MID DEPTH: marshals in the front rows WAVING coloured flags (constant wave, pushed back) ===== */}
        {[{ x: 150, c: CYAN }, { x: 430, c: NEONGOLD }, { x: 636, c: MAGENTA }, { x: 880, c: ELECTRIC }].map((m, i) => {
          const wave = Math.sin(lf / 5 + i * 1.3) * 14;                                  // the flag swings on its pole, always
          return (
            <div key={"mf" + i} style={{ position: "absolute", left: m.x, top: 128, zIndex: 7, opacity: (0.42 + standIn * 0.5) * 0.72, filter: "blur(1.4px) saturate(0.75)", transformOrigin: "0% 100%", transform: `rotate(${wave}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: 34, background: "#2A313B" }} />
              <div style={{ position: "absolute", left: 3, top: 0, width: 26, height: 16, background: m.c, boxShadow: `0 0 8px ${m.c}88`, borderRadius: 1, transformOrigin: "0% 50%", transform: `skewY(${Math.sin(lf / 4 + i) * 7}deg)` }} />
            </div>
          );
        })}

        {/* 7. the five IDENTICAL grey copies up in the stands (Take One is now just one of them), colour-kissed.
             Moved UP into the higher rows: the new WINNER plate owns the band below them. */}
        {cloneX.map((cx, i) => {
          const bob = Math.sin(lf / 8 + i * 1.3) * 3;
          const kiss = i % 2 ? CYAN : MAGENTA;
          return (
            <React.Fragment key={"cl" + i}>
              <div style={{ position: "absolute", left: cx - 6, top: 150 + bob, width: 60, height: 60, borderRadius: 16, background: `radial-gradient(ellipse at 50% 44%, ${kiss}44, transparent 66%)`, filter: "blur(6px)", opacity: clonesIn * 0.8, zIndex: 6, mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", left: cx, top: 150 + bob, zIndex: 7, opacity: clonesIn, filter: "blur(0.6px) saturate(0.9) brightness(1.9)" }}>
                <Take lf={lf} size={48} rim={0.6} nodAmp={1.0} nodSpeed={14 + i} />
              </div>
            </React.Fragment>
          );
        })}

        {/* ===== FIREWORKS bursting high over the stands on each WIN beat (expand, droop, then fade). Kept
             alive, but dimmed + softened: they are celebration texture, not the subject. ===== */}
        {[66, 118].map((bf, bi) => [0, 1, 2].map((j) => {
          const fx = [200, 520, 830][j];
          const delay = j * 6 + bi * 2;
          const age = lf - bf - delay;
          if (age < 0 || age > 40) return null;
          const t = age / 40;
          const rad = t * (58 + j * 10);
          const col = [GOLD, CYAN, MAGENTA, NEONGOLD][(j + bi) % 4];
          return (
            <React.Fragment key={"fw" + bf + "-" + j}>
              {Array.from({ length: 14 }, (_, k) => {
                const a = (k / 14) * Math.PI * 2;
                const px = fx + Math.cos(a) * rad;
                const py = 70 + Math.sin(a) * rad * 0.8 + t * t * 32;                    // gravity droop on the sparks
                return <div key={k} style={{ position: "absolute", left: px, top: py, width: 4, height: 4, borderRadius: "50%", background: col, opacity: (1 - t) * 0.6, boxShadow: `0 0 8px ${col}`, filter: "blur(0.8px)", zIndex: 5 }} />;
              })}
              <div style={{ position: "absolute", left: fx - 22, top: 48, width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle, ${col}, transparent 70%)`, opacity: Math.max(0, 1 - t * 3) * 0.55, filter: "blur(6px)", zIndex: 5 }} />
            </React.Fragment>
          );
        }))}

        {/* 8. two premium LIGHT TOWER masts, top corners, dark steel with a coloured cone (ELECTRIC / MAGENTA) */}
        {[{ x: 60, dir: 1, c: ELECTRIC }, { x: 952, dir: -1, c: MAGENTA }].map((t, i) => (
          <React.Fragment key={"lt" + i}>
            <div style={{ position: "absolute", left: t.x - 5, top: 44, width: 10, height: 128, background: brushed, borderRadius: 2, boxShadow: "0 6px 14px -6px rgba(0,0,0,0.7)", filter: "blur(0.8px)", opacity: 0.82, zIndex: 5 }} />
            <div style={{ position: "absolute", left: t.x - 36, top: 30, width: 72, height: 30, borderRadius: 5, background: "linear-gradient(180deg,#2A2E36,#15171B)", border: "2px solid #454C55", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)", filter: "blur(0.8px)", opacity: 0.86, zIndex: 6 }}>
              {Array.from({ length: 8 }, (_, k) => <div key={k} style={{ position: "absolute", left: 6 + (k % 4) * 15, top: 5 + Math.floor(k / 4) * 13, width: 10, height: 9, borderRadius: 2, background: k % 3 ? "#FFF4DE" : t.c, boxShadow: `0 0 8px ${k % 3 ? "#FFE9BE" : t.c}`, opacity: 0.55 + Math.sin(lf / 5 + k) * 0.15 }} />)}
            </div>
            <StudioLight x={t.x + t.dir * 150} y={300} w={420} h={560} color={t.c} o={0.07 + colO * 0.05} z={4} />
          </React.Fragment>
        ))}

        {/* 9. the start-finish TRUSS in brushed steel, now carrying a pulsing CYAN + MAGENTA LED strip */}
        <div style={{ position: "absolute", left: 54, top: 300, width: 904, height: 34, zIndex: 8, opacity: 0.9 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 9, background: brushed, borderRadius: 2, boxShadow: "0 4px 10px -4px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 0, top: 26, width: "100%", height: 8, background: brushed, borderRadius: 2 }} />
          {Array.from({ length: 22 }, (_, k) => (
            <div key={"lx" + k} style={{ position: "absolute", left: k * 42, top: 8, width: 3, height: 20, background: "#3A4149", transform: `rotate(${k % 2 ? 34 : -34}deg)`, transformOrigin: "50% 50%", opacity: 0.7 }} />
          ))}
        </div>
        <Neon x={62} y={332} w={410} h={5} color={CYAN} on={0.34 + ledPulse * 0.3} z={9} />
        <Neon x={540} y={332} w={410} h={5} color={MAGENTA} on={0.34 + (1 - ledPulse) * 0.3} z={9} />
        <SoftBox x={252} y={276} w={132} h={64} color="#FFF3DE" o={0.5} z={9} />
        <SoftBox x={628} y={276} w={132} h={64} color="#FFF3DE" o={0.5} z={9} />

        {/* 10. the checkered FINISH banner hanging from the truss (monochrome fabric, coloured light sweep).
             Contrast pulled down: the checker pattern is the single busiest texture in the frame. */}
        <div style={{ position: "absolute", left: 68, top: 336, width: 876, height: 56, zIndex: 10, overflow: "hidden", borderRadius: 4, boxShadow: "0 10px 22px -8px rgba(0,0,0,0.75)", border: "1px solid #2A2E36", filter: "blur(0.9px) contrast(0.7) brightness(0.82)", opacity: 0.9 }}>
          {Array.from({ length: 22 * 3 }, (_, k) => {
            const c = k % 22, r = Math.floor(k / 22);
            const sag = Math.sin(c * 0.42 + lf / 12) * 5;
            return <div key={k} style={{ position: "absolute", left: c * 40, top: r * 18 + sag, width: 40, height: 18, background: (c + r) % 2 ? "#C6CAD2" : "#14161B" }} />;
          })}
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 28px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: (lf * 9) % 940 - 60, top: 0, width: 80, height: 56, background: `linear-gradient(90deg, transparent, ${CYAN}55, transparent)`, transform: "skewX(-14deg)", mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", left: (lf * 7 + 470) % 940 - 60, top: 0, width: 80, height: 56, background: `linear-gradient(90deg, transparent, ${MAGENTA}55, transparent)`, transform: "skewX(-14deg)", mixBlendMode: "screen" }} />
        </div>

        {/* 11. the start-light rig on the truss, brushed housing, warm amber bulbs strobing (kept, no green) */}
        <div style={{ position: "absolute", left: 398, top: 296, width: 216, height: 22, borderRadius: 5, background: "linear-gradient(180deg,#2A2E36,#15171B)", border: "2px solid #454C55", opacity: 0.85, zIndex: 11 }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={"slt" + k} style={{ position: "absolute", left: 20 + k * 50, top: 4, width: 14, height: 14, borderRadius: "50%", background: GOLD, opacity: (0.5 + Math.abs(Math.sin(lf / 4 + k)) * 0.5) * 0.7, boxShadow: `0 0 12px ${GOLD}88` }} />
          ))}
        </div>

        {/* 11b. a MARSHAL'S CHECKERED FLAG waving on a pole, right of the line (constant motion) */}
        <div style={{ position: "absolute", left: 892, top: 372, width: 8, height: 108, background: brushed, borderRadius: 2, opacity: 0.8, zIndex: 13, transformOrigin: "50% 100%", transform: `rotate(${flagWave * 3}deg)` }} />
        <div style={{ position: "absolute", left: 826, top: 372, width: 70, height: 48, zIndex: 13, transformOrigin: "100% 0%", transform: `rotate(${flagWave * 5}deg)`, overflow: "hidden", borderRadius: 2, filter: "blur(0.8px) contrast(0.75)", opacity: 0.85, boxShadow: "0 6px 12px -6px rgba(0,0,0,0.7)" }}>
          {Array.from({ length: 5 * 4 }, (_, k) => {
            const c = k % 5, r = Math.floor(k / 5);
            const rip = Math.sin(c * 0.9 + lf / 3) * 4;                       // the flag ripples along its length
            return <div key={"fl" + k} style={{ position: "absolute", left: c * 14, top: r * 12 + rip, width: 14, height: 12, background: (c + r) % 2 ? "#C6CAD2" : "#14161B" }} />;
          })}
        </div>

        {/* 12. dust drifting in the light, now split WARM + COLOURED (reads volumetric, keeps moving) */}
        <Haze lf={lf} x={140} y={360} w={760} h={300} n={7} o={0.20} color={KEY} />
        <Haze lf={lf + 40} x={300} y={330} w={540} h={320} n={6} o={0.12 + riser * 0.12} color={CYAN} />

        {/* ===== MID DEPTH: the PIT-LANE WALL behind the staged cars, with a SCROLLING LED hoarding. Still
             scrolling forever, just blurrier + dimmer so the ad ribbon stops pulling the eye. ===== */}
        <div style={{ position: "absolute", left: 0, top: 486, width: 1012, height: 52, zIndex: 12, opacity: (0.5 + standIn * 0.5) * 0.9, filter: "blur(2px) saturate(0.74) brightness(0.9)" }}>
          {/* the concrete wall slab */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#242A33 0%,#171B22 100%)", borderTop: "2px solid #3A424D", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.05), 0 8px 18px -8px rgba(0,0,0,0.7)" }} />
          {/* the scrolling advertising ribbon: coloured ad panels sliding left forever */}
          <div style={{ position: "absolute", left: 0, top: 10, width: "100%", height: 26, overflow: "hidden", background: "#0C0F14", borderTop: "1px solid #2A313B", borderBottom: "1px solid #2A313B" }}>
            {Array.from({ length: 16 }, (_, k) => {
              const c = [ELECTRIC, MAGENTA, CYAN, NEONGOLD, LIME, HOTPINK][k % 6];
              let x = ((k * 150) - hoard) % (16 * 150);
              if (x < -150) x += 16 * 150;
              return <div key={"ho" + k} style={{ position: "absolute", left: x, top: 3, width: 130, height: 20, borderRadius: 3, background: `linear-gradient(90deg, ${c}, ${c}99)`, boxShadow: `0 0 8px ${c}66`, opacity: 0.72 }}>
                <div style={{ position: "absolute", left: 10, top: 6, width: 60, height: 8, background: "rgba(255,255,255,0.7)", borderRadius: 2 }} />
                <div style={{ position: "absolute", left: 78, top: 6, width: 30, height: 8, background: "rgba(0,0,0,0.4)", borderRadius: 2 }} />
              </div>;
            })}
            {/* a light glare travelling the ribbon */}
            <div style={{ position: "absolute", left: hoardGlare, top: 0, width: 90, height: 26, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", transform: "skewX(-16deg)", mixBlendMode: "screen" }} />
          </div>
          {/* the arena colour gels kiss the wall */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${ELECTRIC}22, transparent 50%, ${MAGENTA}22)`, opacity: colO * 0.6, mixBlendMode: "screen" }} />
        </div>

        {/* 13. the FINISH LINE: a checkered band laid across the glossy floor under the podium (contrast eased) */}
        {Array.from({ length: 26 * 2 }, (_, k) => {
          const c = k % 26, r = Math.floor(k / 26);
          return <div key={"fin" + k} style={{ position: "absolute", left: 40 + c * 36, top: 690 + r * 20, width: 36, height: 20, background: (c + r) % 2 ? "rgba(196,201,211,0.78)" : "rgba(14,15,20,0.94)", transform: `perspective(340px) rotateX(58deg)`, transformOrigin: "50% 0%", zIndex: 14 }} />;
        })}
        <div style={{ position: "absolute", left: 40 + ((lf * 10) % 936), top: 686, width: 90, height: 5, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, opacity: 0.5, filter: "blur(1px)", zIndex: 15, mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: 40, top: 688, width: 936, height: 2, background: `linear-gradient(90deg, transparent, ${RIM}, transparent)`, opacity: 0.4 + winIn * 0.25, zIndex: 15 }} />

        {/* 14. trackside ARMCO barrier in brushed steel with hazard chevrons, kissed by the colour wash */}
        <div style={{ position: "absolute", left: 0, top: 660, width: 1012, height: 34, background: brushed, borderTop: "2px solid #4A525C", borderBottom: "2px solid #14161A", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), 0 6px 14px -6px rgba(0,0,0,0.6)", filter: "brightness(0.86) saturate(0.8)", zIndex: 15 }}>
          <div style={{ position: "absolute", left: 0, top: 11, width: "100%", height: 12, background: hazard, opacity: 0.52 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${ELECTRIC}33, transparent 45%, ${MAGENTA}33)`, opacity: colO * 0.6, mixBlendMode: "screen" }} />
        </div>

        {/* ===== 15. THE FOUR LOSERS, staged at the line, plates blacked, reflected on the floor. Deliberately
             dimmer + softer than the hero: they are the field, not the subject. The wrapper carries an explicit
             position + zIndex because a filter creates its own stacking context. ===== */}
        {losers.map((c, i) => (
          <React.Fragment key={"lz" + i}>
            <div style={{ position: "absolute", inset: 0, zIndex: 16 + i, opacity: revealCars * 0.95, filter: "brightness(1.35) saturate(1.05) blur(0.4px)" }}>
              <CastShadow x={c.x} y={c.y + 2} w={168 * c.s} o={0.5} />
              <div style={{ position: "absolute", left: c.x - 72 * c.s, top: c.y + 16, width: 144 * c.s, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse, ${c.acc}44, transparent 72%)`, filter: "blur(8px)", zIndex: 15 }} />
              {/* a cool coloured rim kiss so even the losers carry vibrant light, not grey */}
              <StudioLight x={c.x + 40 * c.s} y={c.y - 30} w={150 * c.s} h={180} color={i < 2 ? ELECTRIC : MAGENTA} o={revealCars * 0.10} z={15} />
              <Car x={c.x} y={c.y} s={c.s} solve={c.solve} build={1} glow={0.28} reflect={0.3} z={16 + i} />
              <div style={{ position: "absolute", left: c.x - 30 * c.s, top: c.y + 8, width: 60 * c.s, height: 15, borderRadius: 3, background: "#0C0E12", border: "1.5px solid rgba(150,160,178,0.4)", zIndex: 18 }} />
            </div>
          </React.Fragment>
        ))}

        {/* ===== 17 to 19. THE CAR CRUSHER (far left): a heavy steel machine, Take One junked (ram SLAMS) ===== */}
        <div style={{ opacity: crushIn, filter: "brightness(1.18)", zIndex: 20 }}>
          <div style={{ position: "absolute", left: 30, top: 470, width: 156, height: 214, borderRadius: 6, background: brushed, border: "2px solid #4A525C", boxShadow: "inset 0 0 30px rgba(0,0,0,0.55), 0 10px 22px -8px rgba(0,0,0,0.7)", zIndex: 20 }} />
          <div style={{ position: "absolute", left: 30, top: 470, width: 156, height: 12, background: hazard, opacity: 0.6, zIndex: 21 }} />
          {/* a hot HOTRED warning strobe on the crusher as it works */}
          <div style={{ position: "absolute", left: 150, top: 456, width: 16, height: 16, borderRadius: "50%", background: HOTRED, boxShadow: `0 0 14px ${HOTRED}`, opacity: (0.3 + Math.abs(Math.sin(lf / 3)) * 0.7) * ramp(lf, 74, 84) * (1 - ramp(lf, 108, 120)) * 0.8, zIndex: 27 }} />
          {[40, 176].map((bx, k) => [482, 660].map((by, j) => <div key={"bolt" + k + j} style={{ position: "absolute", left: bx, top: by, width: 7, height: 7, borderRadius: "50%", background: CHROME, boxShadow: "inset 0 -1px 1px rgba(0,0,0,0.5)", opacity: 0.7, zIndex: 22 }} />))}
          <div style={{ position: "absolute", left: 44, top: 620, width: 60, height: 22, borderRadius: 3, background: "#0C0E12", border: "1px solid #3A4149", overflow: "hidden", zIndex: 22 }}>
            <div style={{ position: "absolute", left: 5, top: 6, width: 38 + Math.sin(lf / 6) * 6, height: 4, background: HOTRED, opacity: 0.7, borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 5, top: 13, width: 24, height: 3, background: NEONGOLD, opacity: 0.5, borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", left: 26, top: 664, width: 164, height: 20, borderRadius: 4, background: "linear-gradient(180deg,#3A4149,#1E2228)", border: "2px solid #4A525C", zIndex: 22 }} />
          {/* TAKE ONE LOSES: the whole grey car is dragged in from the line (before), then the ram slams it flat (after) */}
          <div style={{ position: "absolute", left: doomX, top: doomY + doomShove, transform: `scaleY(${doomSquash}) rotate(${(1 - haulIn) * -5}deg)`, transformOrigin: "50% 100%", opacity: doomVis, zIndex: 23 }}>
            <Car x={0} y={0} s={doomS} solve={0} build={1} reflect={0} />
            {/* red DEMOTION chevrons shoving it into the jaws (clear loss cue, no green) */}
            {[0, 1, 2].map((k) => (
              <div key={"dch" + k} style={{ position: "absolute", left: 82 + k * 13, top: -8, width: 11, height: 11, borderLeft: `4px solid ${HOTRED}`, borderBottom: `4px solid ${HOTRED}`, transform: "rotate(45deg)", opacity: (0.35 + 0.4 * Math.abs(Math.sin(lf / 3 - k))) * haulIn * (1 - ramp(lf, 74, 82)), filter: `drop-shadow(0 0 4px ${HOTRED})` }} />
            ))}
          </div>
          {/* skid dust as the grey loser is scraped across the floor toward the crusher */}
          <Sparks lf={lf} x={doomX + 34} y={doomY + 24} on={haulIn * (1 - ramp(lf, 72, 80)) * 0.8} color="#9AA2AE" n={6} z={22} />
          <div style={{ position: "absolute", left: 98, top: 470, width: 20, height: 20 + jawClose * 116, background: "linear-gradient(90deg,#8A929E,#CBD2DC,#6E7681)", borderRadius: 3, zIndex: 24 }} />
          <div style={{ position: "absolute", left: 44 + jawShake, top: 488 + jawClose * 116, width: 128, height: 34, borderRadius: 4, background: brushed, border: "2px solid #4A525C", boxShadow: "0 6px 12px -4px rgba(0,0,0,0.7)", zIndex: 25 }}>
            {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 14 + k * 28, top: 6, width: 14, height: 22, background: "#1A1D22", borderRadius: 2 }} />)}
          </div>
          <div style={{ position: "absolute", left: 66, top: 634, width: 108, height: 30, borderRadius: 4, overflow: "hidden", opacity: cubeIn, zIndex: 26, background: grad(PRIMER, "#3E414A"), border: "2px solid rgba(203,210,220,0.5)", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.78), inset 0 2px 0 rgba(255,255,255,0.14)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 5, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ position: "absolute", left: 36, top: -4, width: 4, height: 40, background: "rgba(18,20,26,0.5)", transform: "rotate(16deg)" }} />
            <div style={{ position: "absolute", left: 72, top: -4, width: 3, height: 40, background: "rgba(18,20,26,0.4)", transform: "rotate(-12deg)" }} />
            <div style={{ position: "absolute", left: 8, top: 17, width: 12, height: 9, borderRadius: "50%", background: CHROME, opacity: 0.8 }} />
            <div style={{ position: "absolute", left: 88, top: 18, width: 11, height: 8, borderRadius: "50%", background: CHROME, opacity: 0.75 }} />
            <div style={{ position: "absolute", left: cubeGlint, top: -6, width: 24, height: 44, background: `linear-gradient(90deg, transparent, ${CYAN}88, transparent)`, transform: "skewX(-18deg)", mixBlendMode: "screen" }} />
          </div>
          {/* the SLAM throws a shower of colour + gold sparks */}
          <Sparks lf={lf} x={120} y={634} on={ramp(lf, 84, 90) * (1 - ramp(lf, 96, 104)) * 0.85} color={NEONGOLD} n={11} z={27} />
          <Sparks lf={lf + 5} x={132} y={628} on={ramp(lf, 84, 90) * (1 - ramp(lf, 96, 104)) * 0.85} color={CYAN} n={6} z={27} />
        </div>

        {/* ===== BACKDROP KNOCKDOWN (z26): ONE plate that pushes the WHOLE arena back. Everything the hero is
             not (arena, crowd, jumbotron, banner, hoarding, the four losers, the crusher) keeps its detail and
             its motion but loses ~30% brightness plus a chunk of saturation, and gains a little blur. The
             podium, the winner, the trophy and the wordmark all live ABOVE this plate. ===== */}
        <div style={{ position: "absolute", inset: -20, zIndex: 26, pointerEvents: "none", backdropFilter: "brightness(0.78) saturate(0.72) blur(1.2px)", WebkitBackdropFilter: "brightness(0.78) saturate(0.72) blur(1.2px)" } as React.CSSProperties} />
        <div style={{ position: "absolute", inset: -20, zIndex: 26, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,8,14,0.26) 0%, rgba(7,9,16,0.18) 52%, rgba(6,8,14,0.09) 100%)" }} />
        {/* a calm pocket of dark punched right where the hero stands, so the car sits against quiet, not clutter */}
        <div style={{ position: "absolute", left: winX - 300, top: winY - 330, width: 600, height: 430, zIndex: 26, pointerEvents: "none", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,8,14,0.34) 0%, rgba(6,8,14,0.18) 52%, transparent 76%)", filter: "blur(28px)" }} />

        {/* ===== 17b. THE PODIUM: a 3 tier rostrum in brushed steel plus chrome, winner elevated ===== */}
        <div style={{ position: "absolute", left: 328, top: 642, width: 118, height: 100, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg,#333A42,#191D23)", border: `2px solid ${CYAN}44`, boxShadow: `inset 0 2px 0 rgba(255,255,255,0.06), 0 0 8px ${CYAN}22`, zIndex: 28, opacity: (0.7 + revealCars * 0.3) * 0.86 }} />
        <div style={{ position: "absolute", left: 566, top: 624, width: 118, height: 118, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg,#333A42,#191D23)", border: `2px solid ${MAGENTA}44`, boxShadow: `inset 0 2px 0 rgba(255,255,255,0.06), 0 0 8px ${MAGENTA}22`, zIndex: 28, opacity: (0.7 + revealCars * 0.3) * 0.86 }} />
        <div style={{ position: "absolute", left: 420, top: 598, width: 172, height: 148, borderRadius: "8px 8px 0 0", background: "linear-gradient(180deg,#4A525C,#22272E)", border: `2px solid ${winIn > 0.1 ? GOLD : "#4A525C"}`, boxShadow: winIn > 0.1 ? `0 0 ${16 + gpulse * 20}px ${GOLD}88, inset 0 2px 0 rgba(255,255,255,0.12)` : "inset 0 2px 0 rgba(255,255,255,0.08)", zIndex: 29 }} />
        <div style={{ position: "absolute", left: 420, top: 598, width: 172, height: 7, background: `linear-gradient(90deg, ${AMBER}, ${NEONGOLD}, ${AMBER})`, opacity: winIn, boxShadow: `0 0 16px ${GOLD}cc`, zIndex: 30 }} />

        {/* 18. the winner's SPOTLIGHT pouring down from the truss (soft warm-white beam, warm amber pool) */}
        <div style={{ opacity: 0.45 + winIn * 0.55 }}>
          <Spotlight x={winX} y={334} w={360} h={300} color="#FFF6E4" o={0.52} poolY={694} poolW={360} />
        </div>
        {/* two coloured beauty SPOTLIGHTS flank the winner beam (CYAN + MAGENTA), premium colour gels */}
        <div style={{ opacity: winIn }}>
          <Spotlight x={winX - 96} y={330} w={200} h={310} color={CYAN} o={0.18 + ledPulse * 0.09} poolY={694} poolW={220} />
          <Spotlight x={winX + 96} y={330} w={200} h={310} color={MAGENTA} o={0.18 + (1 - ledPulse) * 0.09} poolY={694} poolW={220} />
        </div>

        {/* ===== 15b plus 16b. THE HERO: the GOLD-crowned winner, BIG plus centre plus lit plus reflected ===== */}
        {/* a soft warm-white / amber BLOOM cradling the car (the premium crown, warm not neon) */}
        <div style={{ position: "absolute", left: winX - 170, top: winY - 232, width: 340, height: 292, borderRadius: 30, background: `radial-gradient(circle, ${KEY}, ${AMBER}66 42%, transparent 68%)`, opacity: winIn * 0.44, filter: "blur(22px)", zIndex: 31 }} />
        {/* the 'selected' cue: a CHAMPAGNE-GOLD underglow halo behind the car, borderless + gentle bloom */}
        <div style={{ position: "absolute", left: winX - 142, top: winY - 206, width: 284, height: 258, borderRadius: 28, background: `radial-gradient(ellipse at 50% 44%, ${GOLD}3A 42%, transparent 68%)`, boxShadow: `0 0 ${28 + gpulse * 20}px ${GOLD}44`, opacity: winIn * 0.9, filter: "blur(3px)", zIndex: 39 }} />
        {/* the WIDE LIGHT POOL under the winner: the focal treatment. Warm gold into tangerine, pulsing */}
        <div style={{ position: "absolute", left: winX - 200, top: winY - 16, width: 400, height: 78, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}88, ${GOLD}4E 38%, ${NEONORANGE}38 58%, transparent 76%)`, filter: "blur(13px)", opacity: (0.66 + winIn * 0.34) * (0.9 + Math.sin(lf / 9) * 0.1), zIndex: 32 }} />
        <div style={{ position: "absolute", left: winX + 40, top: winY - 150, width: 200, height: 170, borderRadius: "50%", background: `radial-gradient(ellipse, ${CYAN}2E, transparent 70%)`, filter: "blur(14px)", zIndex: 33, mixBlendMode: "screen" }} />

        {/* COLOURED RIM LIGHT on the hero: a CYAN kiss one flank, a MAGENTA kiss the other, under the gold crown */}
        <StudioLight x={winX - 132} y={winY - 40} w={240} h={310} color={CYAN} o={(0.10 + winIn * 0.26) * (0.7 + ledPulse * 0.3)} z={38} />
        <StudioLight x={winX + 132} y={winY - 40} w={240} h={310} color={MAGENTA} o={(0.09 + winIn * 0.22) * (1.0 - ledPulse * 0.3)} z={38} />

        {[0, 1, 2].map((k) => {
          const fl = 0.6 + 0.4 * Math.sin(lf * (0.14 + k * 0.05) + k * 1.7);
          const w = (34 + k * 14) * (0.75 + fl * 0.4) * (1 + rev * 0.7);
          const col = k === 0 ? "rgba(120,170,240,0.8)" : k === 1 ? "rgba(255,190,90,0.85)" : "rgba(230,120,60,0.75)";
          return <div key={"ex" + k} style={{ position: "absolute", left: winX - 156 - w, top: winY - 98 - k * 4, width: w, height: 20 + k * 6, borderRadius: "50% 40% 40% 50% / 50%", background: `radial-gradient(ellipse at 90% 50%, ${col}, transparent 72%)`, filter: "blur(3px)", opacity: (0.32 + rev * 0.5) * winIn, zIndex: 35 }} />;
        })}
        <Sparks lf={lf} x={winX - 152} y={winY - 84} on={rev * 0.8} color={NEONORANGE} n={12} z={35} />

        <CastShadow x={winX} y={winY - 2} w={340} o={0.62} />
        {/* THE FOCAL POINT. Bigger than before and graded UP: more saturation, more contrast, a touch more
             brightness and a warm drop shadow that separates it from everything behind it. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none", filter: `saturate(1.34) contrast(1.12) brightness(1.08) drop-shadow(0 0 20px rgba(255,170,74,${0.20 + winIn * 0.24}))` }}>
          <Car x={winX} y={winY - rev * 4} s={1.68} solve={4} build={1} glow={0.78} rot={rev * 1.4} reflect={0.42} z={2} />
        </div>
        {/* GOLD RIM LIGHT: a soft warm crown of light skimming the winner's roofline (rim, not an outline) */}
        <div style={{ position: "absolute", left: winX - 158, top: winY - 158, width: 316, height: 80, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 100%, ${GOLD}88, ${KEY}3A 46%, transparent 72%)`, filter: "blur(7px)", opacity: (0.5 + winIn * 0.46) * (0.92 + gpulse * 0.08), zIndex: 41 }} />
        <div style={{ position: "absolute", left: winX - 50, top: winY + 6, width: 100, height: 21, borderRadius: 3, background: "#0C0E12", border: "1.5px solid rgba(150,160,178,0.45)", zIndex: 41 }} />
        <div style={{ position: "absolute", left: winX + 142, top: winY - 98, width: 160, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse at 20% 50%, rgba(255,246,214,0.9), transparent 70%)", filter: "blur(4px)", opacity: 0.55 + rev * 0.4, zIndex: 41 }} />
        {/* a bright specular streak travels the winner's bodywork (constant motion) */}
        <div style={{ position: "absolute", left: winX - 124 + ((lf * 3.2) % 248), top: winY - 132 + Math.sin(lf / 9) * 3, width: 52, height: 19, borderRadius: "50%", background: `radial-gradient(ellipse, ${RIM}, transparent 70%)`, filter: "blur(3px)", opacity: 0.62, zIndex: 42 }} />

        {/* ===== THE GOLD TROPHY, lowered into place OVER the winner car (z50): gold rays turning behind it, a
             shine sweep across the cup, sparkle glints on the gold, and a flash as it settles. ===== */}
        <div style={{ position: "absolute", left: winX - 78, top: tY, width: 156, height: 132, zIndex: 50, opacity: tOp, pointerEvents: "none" }}>
          {/* the warm halo the trophy hangs in */}
          <div style={{ position: "absolute", left: -66, top: -54, width: 288, height: 246, borderRadius: "50%", background: `radial-gradient(ellipse, ${GOLD}55, ${AMBER}22 44%, transparent 72%)`, filter: "blur(18px)", opacity: 0.55 + tGlow * 0.45 }} />
          {/* slow GOLD LIGHT RAYS turning behind the cup (premium presentation, always moving) */}
          {Array.from({ length: 12 }, (_, k) => (
            <div key={"ray" + k} style={{ position: "absolute", left: 76, top: 46, width: 4, height: 138, marginLeft: -2, marginTop: -69, background: `linear-gradient(180deg, transparent, ${NEONGOLD}66, transparent)`, transformOrigin: "50% 50%", transform: `rotate(${tRayRot + k * 30}deg)`, filter: "blur(2px)", opacity: 0.30 + 0.18 * Math.sin(lf / 8 + k), mixBlendMode: "screen" }} />
          ))}
          {/* the CUP: a wide gold bowl tapering into the stem, with a travelling shine */}
          <div style={{ position: "absolute", left: 24, top: 10, width: 108, height: 74, overflow: "hidden", clipPath: "polygon(0% 0%, 100% 0%, 86% 46%, 68% 86%, 60% 100%, 40% 100%, 32% 86%, 14% 46%)", background: "linear-gradient(158deg, #FFF0BE 0%, " + NEONGOLD + " 26%, " + GOLD + " 58%, #8A5F13 100%)", boxShadow: `0 0 26px ${GOLD}aa` }}>
            <div style={{ position: "absolute", left: 12, top: 4, width: 22, height: 62, background: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent)", filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: tShine, top: -12, width: 26, height: 100, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.92), transparent)", transform: "skewX(-18deg)" }} />
          </div>
          {/* the chrome rim band across the mouth of the cup */}
          <div style={{ position: "absolute", left: 22, top: 6, width: 112, height: 13, borderRadius: 7, background: `linear-gradient(180deg, #FFF6D6, ${NEONGOLD} 52%, #A5761C)`, boxShadow: `0 0 14px ${GOLD}aa, inset 0 1px 0 rgba(255,255,255,0.8)` }} />
          {/* the two handles */}
          <div style={{ position: "absolute", left: 2, top: 12, width: 30, height: 42, borderRadius: "50%", border: `9px solid ${GOLD}`, borderRight: "9px solid transparent", transform: "rotate(-16deg)", boxShadow: `0 0 12px ${GOLD}77` }} />
          <div style={{ position: "absolute", left: 124, top: 12, width: 30, height: 42, borderRadius: "50%", border: `9px solid ${GOLD}`, borderLeft: "9px solid transparent", transform: "rotate(16deg)", boxShadow: `0 0 12px ${GOLD}77` }} />
          {/* stem, collar and plinth */}
          <div style={{ position: "absolute", left: 69, top: 82, width: 18, height: 20, background: `linear-gradient(90deg, #8A5F13, ${NEONGOLD} 46%, #8A5F13)` }} />
          <div style={{ position: "absolute", left: 56, top: 100, width: 44, height: 10, borderRadius: 3, background: `linear-gradient(180deg, #FFF0BE, ${GOLD})` }} />
          <div style={{ position: "absolute", left: 42, top: 110, width: 72, height: 20, borderRadius: 4, background: "linear-gradient(180deg,#4E5661,#20252B)", border: `2px solid ${GOLD}aa`, boxShadow: `0 6px 14px -6px rgba(0,0,0,0.8), 0 0 12px ${GOLD}44`, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 10, top: 6, width: 52, height: 5, borderRadius: 2, background: `linear-gradient(90deg, ${NEONGOLD}, ${GOLD})`, opacity: 0.85 }} />
          </div>
          {/* SPARKLE GLINTS popping on the gold (four point stars, cycling forever) */}
          {[{ x: 16, y: 14 }, { x: 128, y: 22 }, { x: 74, y: 4 }, { x: 60, y: 112 }].map((g, k) => {
            const ph = (lf + k * 13) % 46;
            const on = Math.max(0, 1 - Math.abs(ph - 6) / 6);
            const sz = 14 + on * 16;
            return (
              <React.Fragment key={"tg" + k}>
                <div style={{ position: "absolute", left: g.x - sz / 2, top: g.y - 1.5, width: sz, height: 3, borderRadius: 2, background: "#FFFDF0", opacity: on * 0.95, filter: "blur(1px)", boxShadow: `0 0 10px ${NEONGOLD}` }} />
                <div style={{ position: "absolute", left: g.x - 1.5, top: g.y - sz / 2, width: 3, height: sz, borderRadius: 2, background: "#FFFDF0", opacity: on * 0.95, filter: "blur(1px)", boxShadow: `0 0 10px ${NEONGOLD}` }} />
              </React.Fragment>
            );
          })}
          {/* the LANDING FLASH as the trophy settles into place */}
          <div style={{ position: "absolute", left: -32, top: -64, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,252,232,0.9), ${GOLD}55 38%, transparent 68%)`, opacity: tLand * 0.75, filter: "blur(10px)" }} />
        </div>
        <Sparks lf={lf} x={winX} y={tY + 40} on={tLand} color={NEONGOLD} n={12} z={51} />

        {/* ===== THE WINNER WORDMARK, moved clear ABOVE the checkered flag band (band top = 336) and given a
             SOLID darkened backing plate at z53, so it is fully legible over crowd, banner or fireworks. ===== */}
        {(() => {
          const wIn = over(lf, 68, 12, Easing.out(Easing.back(1.8)));
          const wSc = 0.82 + Math.min(1, wIn) * 0.18;
          return (
            <div style={{ position: "absolute", left: winX - 160, top: 206, width: 320, height: 76, zIndex: 53, opacity: Math.min(1, over(lf, 68, 8)), transform: `scale(${wSc})`, transformOrigin: "50% 100%" }}>
              {/* the gold glow the plate sits in */}
              <div style={{ position: "absolute", left: -32, top: -26, width: 384, height: 128, borderRadius: 40, background: `radial-gradient(ellipse, ${GOLD}55, transparent 68%)`, filter: "blur(18px)", opacity: 0.6 + gpulse * 0.4 }} />
              {/* the SOLID darkened backing plate: nothing behind it can muddy the type */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(180deg, #14161E 0%, #0A0C12 100%)", border: `3px solid ${GOLD}`, boxShadow: `0 0 ${18 + gpulse * 18}px ${GOLD}88, 0 16px 30px -12px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.10)` }} />
              {/* a gold rule top plus bottom */}
              <div style={{ position: "absolute", left: 16, right: 16, top: 8, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${NEONGOLD}, transparent)`, opacity: 0.9 }} />
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 8, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${NEONGOLD}, transparent)`, opacity: 0.9 }} />
              {/* the wordmark itself, big plus bold plus gold on near black */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 45, letterSpacing: "0.15em", color: "#FFF3D2", textShadow: `0 0 10px ${GOLD}cc, 0 2px 0 rgba(0,0,0,0.7)`, whiteSpace: "nowrap", paddingLeft: 8 }}>WINNER</div>
              {/* a shine sweeping the plate so it stays alive */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: ((lf * 5) % 480) - 90, top: -10, width: 60, height: 100, background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.20), transparent)", transform: "skewX(-16deg)" }} />
              </div>
            </div>
          );
        })()}

        {/* THE SIXTH: the ego less grey judge stood BESIDE the podium, gesturing to the pick it chose */}
        <div style={{ opacity: revealCars * 0.94, filter: "brightness(1.2)", zIndex: 34 }}>
          <div style={{ position: "absolute", left: 700, top: 560, width: 150, height: 150, background: `radial-gradient(ellipse at 50% 44%, ${TEAL}2E, transparent 62%)`, filter: "blur(8px)", zIndex: 34, mixBlendMode: "screen" }} />
          <CastShadow x={772} y={718} w={100} o={0.5} />
          <div style={{ position: "absolute", left: 712, top: 566, zIndex: 35 }}>
            <Sixth lf={lf} size={96} gaze={-2} rim={0.9} />
          </div>
        </div>

        {/* 20. CONFETTI: BURSTS on the crown (f66) + the rev (f118), a vibrant multi-hue shower kept BELOW the
             wordmark plate so it can never sit on top of the type */}
        {[66, 118].map((bf) => Array.from({ length: 24 }, (_, i) => {
          const s = seed(i * 3.1 + bf);
          const age = lf - bf - s * 4;
          if (age < 0 || age > 66) return null;
          const cx = winX + (s - 0.5) * (bf === 66 ? 260 : 500) + Math.sin(age * 0.12 + i) * 26;
          const cy = 330 + age * (4 + s * 4.6);
          const col = [GOLD, CYAN, MAGENTA, NEONGOLD, ELECTRIC, CAR_TANGERINE, LIME, HOTPINK][i % 8];
          const t = age / 66, sz = 8 + s * 8;
          return <div key={bf + "-" + i} style={{ position: "absolute", left: cx, top: cy, width: sz, height: sz * 0.55, background: col, opacity: (1 - t) * 0.8, transform: `rotate(${age * (18 + s * 30)}deg)`, boxShadow: `0 0 6px ${col}`, zIndex: 46 }} />;
        }))}
        {/* a bright colour SPARK burst blooms out of the podium at the crown moment */}
        <Sparks lf={lf} x={winX} y={winY - 150} on={winBurst} color={CYAN} n={14} z={45} />
        <Sparks lf={lf + 6} x={winX} y={winY - 150} on={winBurst} color={MAGENTA} n={12} z={45} />
        <Sparks lf={lf + 3} x={winX} y={winY - 150} on={winBurst2} color={GOLD} n={14} z={45} />

        {/* 21. crowd CAMERA FLASHES popping across the stands (still popping, just softer than the hero) */}
        {Array.from({ length: 16 }, (_, i) => {
          const cyc = Math.floor((lf + i * 5) / 20);
          const age = (lf + i * 5) % 20;
          const s = seed(i * 7.3 + cyc * 2.1);
          const fx = 60 + s * 900, fy = 140 + seed(i * 2.7 + cyc) * 150;
          const o = Math.max(0, 1 - age / 4) * standIn;
          const col = i % 3 === 0 ? CYAN : i % 3 === 1 ? MAGENTA : "#FFFDF4";
          return <div key={"cf" + i} style={{ position: "absolute", left: fx, top: fy, width: 9, height: 9, borderRadius: "50%", background: col, opacity: o * 0.6, filter: "blur(1.4px)", boxShadow: `0 0 14px ${col}`, zIndex: 12 }} />;
        })}

        {/* ===== FOCAL VIGNETTE (z47): darkens toward the frame edges and stays clear over the winner, so the
             eye lands on the tangerine car in a split second. Sits under the wordmark and the tyre wall. ===== */}
        <div style={{ position: "absolute", inset: -20, zIndex: 47, pointerEvents: "none", background: `radial-gradient(ellipse 54% 46% at ${winX}px ${winY - 70}px, rgba(0,0,0,0) 0%, rgba(6,7,13,0.12) 58%, rgba(4,5,10,0.34) 86%, rgba(3,4,8,0.50) 100%)` }} />

        {/* 22. FOREGROUND OCCLUDER: a dark blurred TIRE BARRIER framing the bottom (depth) */}
        <div style={{ position: "absolute", left: -10, top: 704, width: 1032, height: 92, zIndex: 55, filter: "blur(2.6px)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,11,16,0.62), rgba(6,7,11,0.97))" }} />
          {Array.from({ length: 10 }, (_, i) => (
            <div key={"tb" + i} style={{ position: "absolute", left: i * 108 - 6, top: 6, width: 108, height: 88 }}>
              {[0, 1].map((r) => <div key={r} style={{ position: "absolute", left: 10, top: r * 40, width: 88, height: 44, borderRadius: "50%", background: "#0E1013", border: "6px solid #16181C", boxShadow: "inset 0 0 8px #000" }}>
                <div style={{ position: "absolute", left: 6, top: 18, right: 6, height: 5, background: i % 2 ? CYAN : MAGENTA, opacity: 0.34, borderRadius: 2 }} />
              </div>)}
            </div>
          ))}
        </div>

      </div>

      {/* CTA / SceneTag / Vig live OUTSIDE the camera wrapper */}
      <SceneTag f={lf} text="PHOTO FINISH" color={GOLD} x={40} y={214} />
      <Vig o={0.52} />
    </AbsoluteFill>
  );
};

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  // ============================ S8 THE REVEAL (turntable showroom) ============================
  // KEPT: the vibrant ELECTRIC + MAGENTA gel identity, the premium Cars, the orbit dolly camera, the
  // whole DEEP AUTO SHOW HALL background and all of its motion, the mascot standing BESIDE the car
  // (never on it), the warm GOLD winner cue (no green ring), the sleek tangerine winner, and nothing
  // clipped by a panel edge. The story is unchanged: the winner alone on a rotating spotlit turntable,
  // then the hero strides in and proudly presents the car he kept.
  //
  // v10 HIERARCHY PASS (Alex: "each scene has to be more hierarchical and I must see the main focus
  // much more easily"). The hall got so rich it competed with the payoff. Fixed by RANKING the frame:
  //   FOCAL (rank 1): the TANGERINE winner on the reveal turntable + the star struck mascot beside it.
  //     Biggest, brightest, sharpest, most saturated. It gets a dedicated bright light POOL, a warm
  //     gold rim separation, extra saturation and contrast, and it is the only fully unblurred subject.
  //   SUPPORT (rank 2): the podium, the marquee, the near truss. Present, dimmed, never louder.
  //   BACKGROUND (rank 3): the whole show hall. All detail and all motion KEPT, but knocked down about
  //     30% in brightness, pushed further out of focus, desaturated and lowered in contrast, then sat
  //     under a focal darkening field that is transparent only where the hero is. The eye lands on the
  //     car within a split second, and the hall still breathes behind it.
  //
  // SCENE BEAT ("nobody buys the first thing they see"): the mascot gets SHINING STAR EYES. Both eyes
  // become sparkling gold and white stars that twinkle, pulse and spin, a star struck smitten look at
  // the winner. They ignite as he arrives and keep twinkling past the cut.

  // ---- CAMERA: an orbit-feel dolly (arc in from the right, settle centre) plus a slow push-in.
  const cam = interpolate(lf, [0, 108], [1.02, 1.10], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const camX = interpolate(lf, [0, 44, 108], [34, 8, -8], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + Math.sin(lf / 34) * 2.5;
  const camY = interpolate(lf, [0, 108], [8, -6], { extrapolateRight: "clamp" }) + Math.sin(lf / 40) * 1.5;

  // ---- THE HERO CAR on the podium: presents itself (turns to face us) then keeps SLOWLY ROTATING on the
  // turntable so the closing reveal always has energy (the foreshortening breathes as it turns), never static.
  const REFLINE = 648;
  const carX = 506;
  const faceIn = over(lf, 0, 46, Easing.inOut(Easing.cubic));   // scaleX 0.80 -> 1.0 = turning to face
  const settle = over(lf, 44, 26, Easing.inOut(Easing.cubic));  // blends the face-in into a continuous turntable turn
  const turntable = (Math.sin((lf - 44) / 25) - 1) / 2;         // -1..0, a slow continuous rotation read on the flat car
  const carSpinX = 0.80 + faceIn * 0.20 + settle * turntable * 0.11; // keeps rotating (scaleX 0.89..1.0) all the way to f108
  const carRot = Math.sin(lf / 26) * 0.9 + settle * Math.sin((lf - 44) / 25) * 0.8; // a gentle hero sway rides the turn
  const carBob = Math.sin(lf / 20) * 2;
  const carY = REFLINE + carBob;
  const underGlow = 0.30 + Math.sin(lf / 11) * 0.06;            // a warm accent under the tyres
  const hoodX = carX - 168 + ((lf * 2.4) % 336);               // a specular glint travels the hood
  const spin = lf * 1.8;                                       // the turntable's slow rotation (drives disc + specular)

  // ---- VIBRANT COLOUR + MOTION drivers (all frame based via lf, everything alive at frame 108) ----
  const colO = over(lf, 0, 16);                                // the colour gels bloom up over ~0.5s
  const driftA = Math.sin(lf / 33) * 74;                       // the big ELECTRIC wash drifts across
  const driftB = Math.cos(lf / 29) * 74;                       // the big MAGENTA wash drifts opposite
  const sweepX = ((lf * 9) % 1460) - 360;                      // a bright CYAN gel bar rakes across, repeating
  const sweep2X = ((lf * 6.5 + 720) % 1460) - 360;             // a second AZURE bar rakes offset
  const beamTilt = Math.sin(lf / 22) * 5;                      // the raking bars rock as they travel
  const revealArc = Math.sin(lf / 19) * 150;                   // the REVEAL spotlight sweeps across the car
  const ledPulse = (Math.sin(lf / 7) + 1) / 2;                 // the CYAN / MAGENTA rim kisses alternate
  const signPulse = 0.72 + Math.sin(lf / 9) * 0.22;            // the marquee pulses
  const ringPulse = 0.5 + Math.sin(lf / 8) * 0.5;              // the podium colour ring breathes

  // ---- DEEP AUTO SHOW HALL background motion drivers (all KEPT: the hall is dimmer now, never deader)
  const hallScroll = (lf * 4) % 240;                          // brand-screen content scrolls sideways
  const screenBeat = Math.floor(lf / 16) % 3;                 // the big screens cycle their content
  const hallSweepA = Math.sin(lf / 24) * 150;                 // a far hall spotlight rakes the backdrop
  const hallSweepB = Math.cos(lf / 21 + 1) * 150;             // a second far cone rakes back the other way
  const curtain = (lf * 3) % 100;                             // a light-curtain shimmer scrolls the backdrop
  const dTrussBob = Math.sin(lf / 40) * 3;                    // the far rigging truss breathes (parallax)
  const dCarSpinL = 0.60 + ((Math.sin(lf / 30) + 1) / 2) * 0.36;    // a display car turns on its plinth (left)
  const dCarSpinR = 0.60 + ((Math.sin(lf / 27 + 2) + 1) / 2) * 0.36; // the other display car turns (right)
  const dDiscL = lf * 1.1, dDiscR = -lf * 0.9;               // their turntable discs spin

  // ---- HERO: walks in from the left (the beauty beat is his absence), then stands PROUDLY beside
  // the winner he built. He never climbs onto or into the car: cockpit, gloss and cabin stay in view.
  const arrive = over(lf, 34, 30, Easing.inOut(Easing.cubic));  // strides in and settles beside the car
  const heroLeft = interpolate(arrive, [0, 1], [-52, 116]);     // enters off the left, lands clear of the body
  const standBob = Math.sin(lf / 16) * 3;
  const heroY = standBob;
  const clipH = 252;                                            // full standing height, feet on the deck
  const heroHalo = 0.24 + arrive * 0.30;
  const present = over(lf, 68, 22);                             // he lifts a proud gesture toward the winner
  const cheer = 0.16 + present * 0.40;                          // still cheering at the cut, never fully still
  const presentLean = present * 3;                             // he leans toward the car as he presents it (degrees)

  // ---- SHINING STAR EYES (this beat's task). The mascot's two eyes become sparkling gold stars.
  // They are drawn as an overlay that rides the EXACT hop and squash the Mascot uses, so they stay
  // welded to the head. Each eye is first capped with the clay body colour so the painted eye can
  // never peek out from behind the star arms, then a gold star + a white inner star + a spinning
  // four point glint sit on top, twinkling out of phase with each other.
  const MSZ = 158;                                              // mascot render size (its viewBox is 200)
  const KV = MSZ / 200;                                         // viewBox unit -> rendered px
  const NOD_S = 9, NOD_A = 3.4;                                 // must match the Mascot props below
  const hopP = Math.max(0, Math.sin(lf / (NOD_S * 0.6)));
  const hopPx = hopP * NOD_A * 2.2;
  const squash = 1 - hopP * 0.045;
  const starOn = over(lf, 38, 12, Easing.out(Easing.back(2)));  // they IGNITE as he lands beside the winner
  const starPop = over(lf, 66, 6) * (1 - over(lf, 74, 14));     // and punch again on the proud present
  const twA = 0.74 + 0.26 * Math.sin(lf / 4.4);                 // left star twinkle
  const twB = 0.74 + 0.26 * Math.sin(lf / 4.4 + 2.1);           // right star twinkle, offset so they alternate
  const starPts = (cx: number, cy: number, R: number, r: number, rot: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + rot + (i * Math.PI) / 5;
      const rr = i % 2 ? r : R;
      return `${(cx + Math.cos(a) * rr).toFixed(2)},${(cy + Math.sin(a) * rr).toFixed(2)}`;
    }).join(" ");
  const EYES = [
    { cx: 79.5, tw: twA, rot: lf / 62 },                        // gaze is 2, so 77.5 + 2
    { cx: 125.5, tw: twB, rot: -lf / 54 },
  ];

  // ---- celebration builds as he presents the car: colour sparks, a crowd, popping press flashes.
  const party = over(lf, 62, 24);
  const sigOn = over(lf, 4, 12);
  // ---- THE ONE marquee IGNITION: a glow flash + sparkle burst when it fires, punched again on the present.
  const igniteFlash = Math.max(0, 1 - Math.abs(lf - 8) / 8);   // a bright flare peaking as the sign ignites (~f8)
  const presentFlash = over(lf, 68, 5) * (1 - over(lf, 74, 12)); // a second punch when the hero presents the winner
  const signBurst = Math.max(igniteFlash, presentFlash * 0.85);
  const hh = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, "0");

  // ---- FOCAL drivers: the hero pool breathes and the focal field tightens as the payoff lands.
  const focus = 0.62 + over(lf, 10, 40) * 0.38;                // the focal treatment ramps in with the reveal
  const poolBreath = 1 + Math.sin(lf / 15) * 0.03;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam}) translate(${camX}px, ${camY}px)`, transformOrigin: "50% 56%" }}>

        {/* ===== BACKGROUND: the glossy stage floor, raked with ELECTRIC blue + MAGENTA gels ===== */}
        <GarageFloor horizon={556} hue={KEY} gel={ELECTRIC} gel2={MAGENTA} />
        {/* the deep hall gradient behind, darker than before so nothing back here rivals the payoff */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${CHARCOAL} 0%, ${GRAPHITE} 34%, ${NIGHT} 62%, ${NIGHT2} 100%)`, opacity: 0.5, zIndex: 1 }} />

        {/* ============ DEEP AUTO SHOW HALL (far -> mid depth planes). ALL detail + motion KEPT,
             every layer now dimmer, softer, cooler and less contrasty so it reads clearly SECONDARY. ============ */}
        {/* FAR PLANE: a cool dark hall back wall + a curved stage backdrop, the deepest, most blurred layer */}
        <div style={{ position: "absolute", left: 0, top: 122, width: 1012, height: 452, background: `linear-gradient(180deg, ${NIGHT2} 0%, ${CHARCOAL} 48%, ${NIGHT} 100%)`, opacity: 0.95, filter: "brightness(0.7) saturate(0.7)", zIndex: 1 }} />
        <div style={{ position: "absolute", left: 108, top: 172, width: 796, height: 384, borderRadius: "46% 46% 0 0 / 34% 34% 0 0", background: `radial-gradient(ellipse at 50% 122%, ${GRAPHITE} 0%, ${CHARCOAL} 48%, ${NIGHT2} 82%)`, filter: "blur(7px) brightness(0.7) saturate(0.68)", opacity: 0.5, boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)", zIndex: 1 }} />
        {/* a LIGHT CURTAIN shimmer down the backdrop: cool strips still scrolling, now a whisper not a shout */}
        <div style={{ position: "absolute", left: 150, top: 176, width: 712, height: 336, overflow: "hidden", opacity: 0.24, filter: "blur(4.5px) saturate(0.7)", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: -30, background: `repeating-linear-gradient(178deg, transparent 0 16px, ${CYAN}26 20px 24px, transparent 28px 46px)`, transform: `translateY(${curtain - 100}px)`, mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", inset: -30, background: `repeating-linear-gradient(182deg, transparent 0 30px, ${MAGENTA}1E 34px 38px, transparent 42px 66px)`, transform: `translateY(${60 - curtain}px)`, mixBlendMode: "screen" }} />
        </div>
        {/* two FAR HALL SPOTLIGHTS raking the backdrop, sweeping opposite ways (alive, just softer now) */}
        <div style={{ position: "absolute", left: 220 + hallSweepA, top: 150, width: 150, height: 340, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 26) * 10}deg)`, background: `linear-gradient(180deg, ${CYAN}40, transparent 82%)`, clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", filter: "blur(15px) saturate(0.72)", opacity: 0.18 + colO * 0.07, mixBlendMode: "screen", zIndex: 2 }} />
        <div style={{ position: "absolute", left: 640 + hallSweepB, top: 150, width: 150, height: 340, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 23 + 2) * 10}deg)`, background: `linear-gradient(180deg, ${ELECTRIC}40, transparent 82%)`, clipPath: "polygon(42% 0,58% 0,100% 100%,0 100%)", filter: "blur(15px) saturate(0.72)", opacity: 0.17 + colO * 0.07, mixBlendMode: "screen", zIndex: 2 }} />
        {/* the FAR rigging TRUSS spanning the hall, tiny colour fixtures still chasing, pushed out of focus */}
        <div style={{ position: "absolute", left: -20, top: 120 + dTrussBob, width: 1052, height: 48, zIndex: 2, filter: "blur(3.4px) brightness(0.72) saturate(0.7)", opacity: 0.44 }}>
          <div style={{ position: "absolute", left: 0, top: 8, width: 1052, height: 8, background: "linear-gradient(180deg, #2A303A, #12151B)", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 0, top: 24, width: 1052, height: 5, background: "#0C0F14", borderRadius: 2 }} />
          {Array.from({ length: 13 }, (_, i) => (
            <div key={"dt" + i} style={{ position: "absolute", left: 20 + i * 82, top: 10, width: 3, height: 20, background: "#0C0F14", transform: `skewX(${i % 2 ? 12 : -12}deg)` }} />
          ))}
          {Array.from({ length: 7 }, (_, i) => { const c = [ELECTRIC, CYAN, MAGENTA][i % 3]; const on = 0.4 + 0.6 * ((Math.sin(lf / 7 + i * 1.3) + 1) / 2); return <div key={"df" + i} style={{ position: "absolute", left: 74 + i * 138, top: 30, width: 20, height: 12, borderRadius: "0 0 5px 5px", background: c, opacity: 0.42 * on, boxShadow: `0 6px 16px ${c}` }} />; })}
        </div>
        {/* the two big BRAND SCREENS: content still CYCLES + scrolls, now deep, cool, dim and defocused */}
        {[{ sx: 44, tint: ELECTRIC }, { sx: 760, tint: CYAN }].map((sc, si) => (
          <div key={"scr" + si} style={{ position: "absolute", left: sc.sx, top: 214, width: 208, height: 132, borderRadius: 8, overflow: "hidden", background: "#070A12", border: "2px solid rgba(120,160,220,0.16)", boxShadow: `0 0 30px ${sc.tint}2A, inset 0 0 30px rgba(0,0,0,0.7)`, filter: "blur(3.6px) brightness(0.66) saturate(0.66) contrast(0.86)", opacity: 0.5, zIndex: 2 }}>
            {screenBeat === 0 ? (
              Array.from({ length: 9 }, (_, b) => { const bh = 18 + (Math.sin(lf / 5 + b * 0.8 + si) + 1) / 2 * 86; return <div key={b} style={{ position: "absolute", left: 12 + b * 22, bottom: 14, width: 14, height: bh, borderRadius: 3, background: `linear-gradient(180deg, ${sc.tint}, ${MAGENTA})`, opacity: 0.86, boxShadow: `0 0 8px ${sc.tint}` }} />; })
            ) : screenBeat === 1 ? (
              <div style={{ position: "absolute", top: 42, left: -hallScroll, width: 560, height: 46, background: `repeating-linear-gradient(90deg, ${sc.tint} 0 58px, transparent 58px 128px)`, opacity: 0.7, filter: "blur(1px)" }} />
            ) : (
              <div style={{ position: "absolute", inset: 12, borderRadius: 6, background: `conic-gradient(from ${lf * 4}deg, ${sc.tint}, ${MAGENTA}, ${CYAN}, ${sc.tint})`, opacity: 0.5, filter: "blur(3px)" }} />
            )}
            {/* screen scanlines + a travelling glass sheen so the panels still read like live displays */}
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 4px)" }} />
            <div style={{ position: "absolute", left: -60 + ((lf * 6) % 340), top: 0, width: 50, height: 132, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", transform: "skewX(-18deg)" }} />
          </div>
        ))}
        {/* MID PLANE: the two other DISPLAY CARS still turning on their lit plinths, clearly out of focus
             and desaturated so no other car can be mistaken for the winner */}
        {[
          { cx: 176, cy: 520, s: 0.5, sol: 2, spin: dCarSpinL, disc: dDiscL, tint: ELECTRIC },
          { cx: 838, cy: 520, s: 0.5, sol: 5, spin: dCarSpinR, disc: dDiscR, tint: MAGENTA },
        ].map((d, i) => (
          <div key={"dcar" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 4, filter: "blur(4.6px) brightness(0.68) saturate(0.6) contrast(0.9)", opacity: 0.42 }}>
            {/* a mini spotlight cone sweeping over the display car */}
            <div style={{ position: "absolute", left: d.cx - 72 + Math.sin(lf / 20 + i) * 14, top: d.cy - 152, width: 144, height: 180, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 20 + i) * 8}deg)`, background: `linear-gradient(180deg, ${d.tint}55, transparent 80%)`, clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", filter: "blur(6px)", opacity: 0.45, mixBlendMode: "screen" }} />
            {/* the plinth turntable + a rotating specular sweep on the disc */}
            <div style={{ position: "absolute", left: d.cx - 84, top: d.cy + 6, width: 168, height: 42, borderRadius: "50%", background: "radial-gradient(ellipse, #2A303A, #12151B 70%)", border: "1px solid rgba(180,200,230,0.2)" }} />
            <div style={{ position: "absolute", left: d.cx - 70, top: d.cy + 12, width: 140, height: 30, borderRadius: "50%", transform: `rotate(${d.disc}deg)`, background: `conic-gradient(from ${d.disc}deg, transparent, ${d.tint}66 20%, transparent 42%)`, opacity: 0.55, filter: "blur(1px)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `scaleX(${d.spin})`, transformOrigin: `${d.cx}px ${d.cy}px` }}>
              <Car x={d.cx} y={d.cy} s={d.s} solve={d.sol} build={1} glow={0.1} rot={Math.sin(lf / 22 + i) * 1.2} reflect={0.16} z={4} />
            </div>
            {/* a coloured underglow puddle so the distant car still sits on the plinth */}
            <div style={{ position: "absolute", left: d.cx - 76, top: d.cy + 4, width: 152, height: 26, borderRadius: "50%", background: `radial-gradient(ellipse, ${d.tint}55, transparent 70%)`, filter: "blur(8px)", opacity: 0.42 + Math.sin(lf / 13 + i) * 0.07 }} />
          </div>
        ))}
        {/* the FAR PRESS PIT deep along the backdrop base: flashes still popping, half as loud */}
        {Array.from({ length: 10 }, (_, i) => {
          const period = 30 + Math.floor(seed(i * 3.7 + 5) * 26);
          const ph = Math.floor(seed(i * 4.1 + 2) * period);
          const age = (lf + ph) % period;
          const on = age < 3 ? (1 - age / 3) * (0.3 + party * 0.5) : 0;
          if (on <= 0) return null;
          const fx = 120 + seed(i * 5.3) * 772;
          const fy = 470 + seed(i * 2.4) * 62;
          const fc = i % 2 ? "#A9C2DC" : "#BFAFD4";
          return <div key={"hf" + i} style={{ position: "absolute", left: fx, top: fy, width: 6, height: 6, borderRadius: "50%", background: fc, boxShadow: `0 0 10px 2px ${fc}99`, opacity: on * 0.44, filter: "blur(1.6px)", zIndex: 3 }} />;
        })}
        {/* thin FAR ATMOSPHERE glow drifting across the deep hall so the depth planes still read */}
        {Array.from({ length: 5 }, (_, i) => { const s = seed(i * 6.2 + 3); const drift = ((lf * (0.2 + s * 0.3) + s * 400) % 1100) - 50; const c = [ELECTRIC, MAGENTA, CYAN][i % 3]; return <div key={"ha" + i} style={{ position: "absolute", left: drift, top: 320 + s * 150 + Math.sin(lf / 30 + i) * 10, width: 150 + s * 90, height: 70 + s * 40, borderRadius: "50%", background: `radial-gradient(ellipse, ${c}1C, transparent 70%)`, filter: "blur(16px) saturate(0.7)", opacity: 0.1 + colO * 0.04, zIndex: 3 }} />; })}

        {/* ===== COLOUR GELS across the set. Still bold, pulled back a step at the flanks so the
             saturation budget belongs to the tangerine winner, not to the walls. ===== */}
        <GelWash x={252 + driftA} y={362} w={880} h={760} color={ELECTRIC} o={colO * 0.24} blur={92} z={1} />
        <GelWash x={788 + driftB} y={384} w={860} h={760} color={MAGENTA} o={colO * 0.21} blur={92} z={1} />
        <GelWash x={506} y={252} w={660} h={440} color={AZURE} o={colO * 0.13} blur={80} z={1} />
        <GelBar x={sweepX} y={206} w={440} h={230} color={CYAN} o={colO * 0.24} rot={12 + beamTilt} z={2} />
        <GelBar x={sweep2X} y={430} w={440} h={210} color={AZURE} o={colO * 0.19} rot={-10 + beamTilt} z={2} />

        {/* the carbon fibre back panel catching the gelled light behind the podium, now a low contrast texture */}
        <div style={{ position: "absolute", left: 296, top: 250, width: 420, height: 210, borderRadius: 10, background: `repeating-linear-gradient(45deg, #191C21 0 6px, #23272E 6px 12px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.35) 0 6px, transparent 6px 12px)`, opacity: 0.3 + Math.sin(lf / 30) * 0.03, filter: "blur(1.6px) contrast(0.82)", boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)", zIndex: 2 }} />

        {/* ===== STUDIO LIGHTING: the warm KEY over the payoff stays strong, the coloured side fills drop ===== */}
        <StudioLight x={506} y={168} w={780} h={470} color={KEY} o={0.3} z={3} />
        <StudioLight x={150} y={392} w={480} h={560} color={ELECTRIC} o={0.14 + colO * 0.04} z={3} />
        <StudioLight x={862} y={392} w={460} h={560} color={MAGENTA} o={0.13 + colO * 0.04} z={3} />

        {/* the overhead STEEL TRUSS with three hung SOFTBOXES (two gelled CYAN / MAGENTA, warm centre) */}
        <div style={{ position: "absolute", left: 60, top: 150, width: 892, height: 12, background: `linear-gradient(180deg, #4A515B, ${STEEL} 40%, #23272E)`, borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)", opacity: 0.8, zIndex: 7 }} />
        {[{ x: 218, w: 132, h: 58, c: CYAN, o: 0.34 }, { x: 428, w: 172, h: 70, c: "#FFF9EE", o: 0.64 }, { x: 686, w: 132, h: 58, c: MAGENTA, o: 0.34 }].map((s, i) => (
          <React.Fragment key={"sb" + i}>
            <div style={{ position: "absolute", left: s.x + s.w / 2 - 1.5, top: 160, width: 3, height: 46, background: "#3C424B", zIndex: 6 }} />
            <SoftBox x={s.x} y={202} w={s.w} h={s.h} color={s.c} o={s.o + (i !== 1 ? Math.sin(lf / 6 + i * 2) * 0.09 : 0)} z={7} />
          </React.Fragment>
        ))}
        {/* the colour cycling LED bar along the truss (still a moving row of pips, quieter) */}
        {Array.from({ length: 14 }, (_, i) => {
          const c = [ELECTRIC, CYAN, MAGENTA][i % 3];
          const on = 0.4 + 0.6 * ((Math.sin(lf / 6 + i * 0.9) + 1) / 2);
          return <div key={"led" + i} style={{ position: "absolute", left: 96 + i * 58, top: 156, width: 9, height: 9, borderRadius: "50%", background: c, opacity: (0.34 + colO * 0.22) * on, boxShadow: `0 0 8px ${c}`, zIndex: 8 }} />;
        })}

        {/* ===== SWEEPING REVEAL SPOTLIGHT: a warm cone ARCS across the car, plus a cool CYAN cone the
             other way, so light is always moving over the payoff (never a static pool). ===== */}
        <Spotlight x={carX + revealArc} y={210} w={300} h={440} color={RIM} o={0.5} poolY={636} poolW={430} />
        <Spotlight x={carX - revealArc * 0.7} y={200} w={240} h={460} color={CYAN} o={0.18 + colO * 0.1} poolY={636} poolW={320} />

        {/* volumetric colour HAZE drifting up through the beams: ELECTRIC + MAGENTA + CYAN, always rising */}
        <Haze lf={lf} x={330} y={230} w={300} h={420} n={6} color={ELECTRIC} o={0.22} />
        <Haze lf={lf + 30} x={560} y={220} w={300} h={420} n={5} color={MAGENTA} o={0.19} sd={7} />
        <Haze lf={lf + 15} x={442} y={262} w={280} h={380} n={4} color={CYAN} o={0.15} sd={4} />

        {/* ===== THE ONE MARQUEE: still the backlit theatre sign that fires with an ignition flash and
             gets punched on the present, but sized and glowed as SUPPORT so the car owns rank one. ===== */}
        {(() => {
          const mW = 452, mH = 104, mX = carX - mW / 2, mY = 202;   // dead centre over the car, well inside the panel
          const lit = Math.min(1, sigOn * 0.6 + 0.4);               // clearly lit the moment it fires
          const glowP = 0.5 + signPulse * 0.22 + signBurst * 0.44;  // its warm glow breathes + punches on ignition
          return (
            <div style={{ position: "absolute", left: mX, top: mY, width: mW, height: mH, opacity: 0.9, zIndex: 40 }}>
              {/* a warm BACKLIGHT bloom so the marquee still reads lit, no longer a second sun */}
              <div style={{ position: "absolute", left: -64, top: -50, width: mW + 128, height: mH + 100, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}${hh(0.3 * lit + 0.28 * signBurst)}, ${NEONORANGE}1A 46%, transparent 74%)`, filter: "blur(26px)", mixBlendMode: "screen" }} />
              {/* the marquee CHASSIS: a dark bezel with chrome trim + a warm rim glow that punches on ignition */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 15, background: "linear-gradient(180deg, #241D12, #120D07)", border: `2px solid ${CHROME}`, boxShadow: `0 0 ${28 * glowP}px ${KEY}${hh(0.4 * lit)}, 0 12px 30px rgba(0,0,0,0.6), inset 0 0 24px rgba(0,0,0,0.75)` }} />
              {/* the backlit inner face the letters sit on, so contrast on the words stays crisp */}
              <div style={{ position: "absolute", inset: 8, borderRadius: 10, background: `radial-gradient(ellipse at 50% 42%, #6C4A23${hh(0.46 + 0.36 * lit)}, #241A0E 74%)`, boxShadow: "inset 0 2px 8px rgba(255,220,160,0.2), inset 0 -8px 20px rgba(0,0,0,0.65)", overflow: "hidden" }}>
                {/* a soft warm sheen sweeping the inner face so it reads as LIVE backlight, always moving */}
                <div style={{ position: "absolute", left: -90 + ((lf * 6) % (mW + 180)), top: 0, width: 94, height: mH, background: "linear-gradient(90deg, transparent, rgba(255,238,205,0.18), transparent)", transform: "skewX(-16deg)" }} />
              </div>
              {/* a ring of warm CHASE BULBS around the marquee edge (theatre marquee, always running) */}
              {Array.from({ length: 30 }, (_, i) => {
                const t = i < 15 ? i : i - 15;
                const bx = 12 + (t / 14) * (mW - 24);
                const by = i < 15 ? 6 : mH - 12;
                const onb = 0.4 + 0.6 * ((Math.sin(lf / 4 + i * 0.7) + 1) / 2);
                return <div key={"mb" + i} style={{ position: "absolute", left: bx, top: by, width: 5, height: 5, borderRadius: "50%", background: NEONGOLD, opacity: (0.36 + lit * 0.3) * onb, boxShadow: `0 0 6px ${NEONGOLD}` }} />;
              })}
              {/* THE ONE: warm-white to gold letters, legible at a glance, no longer out-shouting the car */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: "0.08em", color: "#F4E7D4", textShadow: `0 0 3px rgba(255,255,255,0.75), 0 0 ${13 * glowP}px ${KEY}, 0 0 ${26 * glowP}px ${NEONORANGE}, 0 3px 7px rgba(0,0,0,0.75)`, WebkitTextStroke: "1.1px rgba(120,78,26,0.4)", filter: `brightness(${0.84 + lit * 0.24})`, zIndex: 3 }}>THE ONE</div>
            </div>
          );
        })()}
        {/* a warm SPARKLE burst off the marquee at ignition, and a gold sparkle when the hero presents */}
        <Sparks lf={lf} x={carX} y={250} on={over(lf, 3, 13)} color={NEONGOLD} n={11} z={41} />
        <Sparks lf={lf} x={carX} y={250} on={over(lf, 68, 12)} color={RIM} n={7} z={41} />

        {/* ===== A PAPARAZZI CROWD framing the sides in shadow (silhouettes rimmed by the colour gels) ===== */}
        {[{ bx: 24, n: 5, rim: ELECTRIC }, { bx: 856, n: 5, rim: MAGENTA }].map((cl, ci) => (
          <div key={"cw" + ci} style={{ position: "absolute", left: cl.bx, top: 366, width: 132, height: 130, filter: "blur(2.4px)", opacity: 0.8, zIndex: 4 }}>
            {Array.from({ length: cl.n }, (_, i) => {
              const s = seed(ci * 7 + i * 1.7);
              return <div key={i} style={{ position: "absolute", left: (i % 3) * 44 + s * 10, top: Math.floor(i / 3) * 46 + s * 8, width: 34, height: 46, borderRadius: "16px 16px 6px 6px", background: `linear-gradient(180deg, #0A0C0F, #050608)`, opacity: 0.9, boxShadow: `0 0 10px ${cl.rim}${hh(0.16 + colO * 0.12)}` }} />;
            })}
          </div>
        ))}
        {/* PRESS FLASHES still popping all around the crowd, dimmer and softer so they read as ambience */}
        {Array.from({ length: 9 }, (_, i) => {
          const period = 26 + Math.floor(seed(i * 1.3) * 24);
          const ph = Math.floor(seed(i * 2.1) * period);
          const age = (lf + ph) % period;
          const on = age < 3 ? (1 - age / 3) * (0.34 + party * 0.6) : 0;
          if (on <= 0) return null;
          const fx = i < 5 ? 30 + seed(i * 1.7) * 156 : 850 + seed(i * 1.7) * 156;
          const fy = 366 + seed(i * 2.9) * 128;
          const fc = i % 3 === 0 ? "#AFC9DE" : "#DCCFB8";
          return <div key={"cf" + i} style={{ position: "absolute", left: fx, top: fy, width: 8, height: 8, borderRadius: "50%", background: fc, boxShadow: `0 0 14px 4px ${fc}99`, opacity: on * 0.6, filter: "blur(1.4px)", zIndex: 5 }} />;
        })}

        {/* ===== GLOSSY FLOOR: COLOURED reflected light streaks smeared down the polished deck.
             The tangerine streak under the winner stays bright, the flanking colours drop back. ===== */}
        {[{ x: carX, c: NEONORANGE, w: 176, o: 0.36 }, { x: 214, c: ELECTRIC, w: 104, o: 0.14 }, { x: 800, c: MAGENTA, w: 104, o: 0.14 }, { x: 360, c: CYAN, w: 70, o: 0.09 }].map((r, i) => (
          <div key={"rs" + i} style={{ position: "absolute", left: r.x - r.w / 2, top: 566, width: r.w, height: 210, background: `linear-gradient(180deg, ${r.c}${hh(r.o * 1.7)}, transparent 80%)`, filter: "blur(11px)", opacity: r.o + Math.sin(lf / 12 + i) * 0.04, zIndex: 4 }} />
        ))}
        {/* brushed steel floor MARKINGS: the podium ring guide, faintly catching the gels */}
        <div style={{ position: "absolute", left: carX - 320, top: 690, width: 640, height: 150, borderRadius: "50%", border: "2px solid rgba(120,180,255,0.09)", zIndex: 4 }} />
        {/* the ANIMATED hazard CHEVRON stripe still scrolling across the deck, now a low contrast marking */}
        {Array.from({ length: 9 }, (_, i) => {
          const shift = (i + (lf / 10)) % 9;
          const lit = i % 2 === Math.floor(lf / 6) % 2;
          return <div key={"ch" + i} style={{ position: "absolute", left: 150 + shift * 84, top: 748, width: 44, height: 20, background: lit ? `${NEONGOLD}${hh(0.26)}` : "rgba(30,33,38,0.6)", transform: "skewX(-26deg)", filter: "blur(1.2px)", boxShadow: lit ? `0 0 8px ${NEONGOLD}33` : "none", zIndex: 5 }} />;
        })}
        {/* two CABLE RUNS snaking off the podium to the truss stands, taped to the floor */}
        <svg width={1012} height={220} style={{ position: "absolute", left: 0, top: 600, zIndex: 5, overflow: "visible", opacity: 0.7 }}>
          <path d="M 300 96 C 220 120 150 150 40 178" fill="none" stroke="#0C0E12" strokeWidth={7} opacity={0.8} />
          <path d="M 300 96 C 220 120 150 150 40 178" fill="none" stroke="#2A2F37" strokeWidth={2.5} opacity={0.6} />
          <path d="M 712 96 C 800 122 880 150 984 176" fill="none" stroke="#0C0E12" strokeWidth={7} opacity={0.8} />
          <path d="M 712 96 C 800 122 880 150 984 176" fill="none" stroke="#2A2F37" strokeWidth={2.5} opacity={0.6} />
        </svg>

        {/* ===== FOCAL FIELD: a darkening wash over the WHOLE hall that is transparent only where the
             winner and the mascot stand. This is what makes the eye land in a split second: everything
             behind loses a third of its brightness, the payoff loses none. ===== */}
        <div style={{ position: "absolute", inset: -80, background: `radial-gradient(ellipse 42% 40% at ${carX - 34}px 596px, rgba(4,6,12,0) 0%, rgba(4,6,12,0.16) 46%, rgba(3,5,10,${(0.44 * focus).toFixed(3)}) 72%, rgba(2,4,9,${(0.68 * focus).toFixed(3)}) 100%)`, zIndex: 10, pointerEvents: "none" }} />

        {/* ===== THE HERO LIGHT POOL: the brightest, warmest area of the frame, sitting under and behind
             the winner so the car reads as the lit subject on a darker stage. ===== */}
        <div style={{ position: "absolute", left: carX - 330, top: carY - 300, width: 660, height: 540, borderRadius: "50%", background: `radial-gradient(ellipse, ${RIM}44, ${KEY}22 40%, ${NEONORANGE}0E 62%, transparent 76%)`, filter: "blur(20px)", transform: `scale(${poolBreath})`, opacity: (0.52 + Math.sin(lf / 15) * 0.05) * focus, mixBlendMode: "screen", zIndex: 11 }} />

        {/* ===== THE ROTATING PODIUM: a brushed steel disc with a chrome rim + a slow specular sweep ===== */}
        <div style={{ position: "absolute", left: carX - 302, top: 686 - 78, width: 604, height: 156, zIndex: 12 }}>
          <div style={{ position: "absolute", left: 40, top: 96, width: 524, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)", filter: "blur(9px)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 34%, #3E444E 0%, #23272E 52%, #14171B 100%)`, border: "2px solid rgba(203,210,220,0.5)", boxShadow: "inset 0 3px 10px rgba(255,255,255,0.12), inset 0 -12px 30px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", inset: 4, borderRadius: "50%", border: "1.5px solid rgba(230,238,248,0.3)" }} />
          {/* radial machined TICKS on the disc, spun by the turntable so the rotation reads clearly */}
          <div style={{ position: "absolute", left: 60, top: 18, width: 484, height: 100, borderRadius: "50%", transform: `rotate(${spin}deg)`, background: `repeating-conic-gradient(from 0deg, transparent 0 7deg, rgba(214,222,232,0.10) 7deg 7.7deg)`, opacity: 0.55, filter: "blur(0.4px)" }} />
          {/* the rotating specular sweep, tinted so the turntable glints CYAN and MAGENTA as it turns */}
          <div style={{ position: "absolute", left: 60, top: 18, width: 484, height: 100, borderRadius: "50%", background: `conic-gradient(from ${spin}deg, transparent, ${CYAN}55 12%, transparent 30%, transparent 60%, ${MAGENTA}44 74%, transparent 88%)`, opacity: 0.7, filter: "blur(2px)" }} />
        </div>
        {/* the COLOUR RING under the tyres cycling ELECTRIC -> MAGENTA as the disc spins (moving accent) */}
        <div style={{ position: "absolute", left: carX - 210, top: carY - 8, width: 420, height: 74, borderRadius: "50%", background: `radial-gradient(ellipse, ${ringPulse > 0.5 ? ELECTRIC : MAGENTA}${hh(0.24 + ringPulse * 0.16)}, transparent 70%)`, filter: "blur(14px)", opacity: 0.55, zIndex: 16 }} />
        {/* the warm GOLD underglow right under the winner (the winner cue stays warm gold, never green) */}
        <div style={{ position: "absolute", left: carX - 196, top: carY - 4, width: 392, height: 64, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONORANGE}${hh(0.26 + underGlow * 0.16)}, ${NEONGOLD}14 54%, transparent 74%)`, filter: "blur(12px)", opacity: 0.62, zIndex: 16 }} />

        {/* CHROME STANCHIONS ringing the podium with a deep red velvet rope */}
        {[196, 810].map((sx, i) => (
          <React.Fragment key={"st" + i}>
            <div style={{ position: "absolute", left: sx, top: 604, width: 13, height: 82, borderRadius: 6, background: `linear-gradient(90deg, #4A505B, ${CHROME}, #3E434D)`, boxShadow: "0 8px 16px -6px rgba(0,0,0,0.7), inset 0 0 4px rgba(255,255,255,0.3)", zIndex: 18 }} />
            <div style={{ position: "absolute", left: sx - 3, top: 596, width: 19, height: 15, borderRadius: "50%", background: `radial-gradient(circle at 40% 30%, #FFFFFF, ${CHROME} 46%, #6A707A)`, boxShadow: "0 4px 8px rgba(0,0,0,0.6)", zIndex: 18 }} />
          </React.Fragment>
        ))}
        <svg width={1012} height={200} style={{ position: "absolute", left: 0, top: 560, zIndex: 18, overflow: "visible" }}>
          <path d="M 206 48 Q 506 158 818 48" fill="none" stroke="#3A0E12" strokeWidth={9} opacity={0.92} />
          <path d="M 206 48 Q 506 158 818 48" fill="none" stroke="#7A2530" strokeWidth={6} opacity={0.95} />
          <path d="M 206 48 Q 506 154 818 48" fill="none" stroke="#A64450" strokeWidth={2} opacity={0.7} />
        </svg>

        {/* a tangerine reflection puddle catching the car colour on the polished deck */}
        <div style={{ position: "absolute", left: carX - 200, top: REFLINE + 4, width: 400, height: 38, borderRadius: "50%", background: `radial-gradient(ellipse, ${CAR_TANGERINE}55, ${NEONORANGE}22 50%, transparent 78%)`, filter: "blur(8px)", opacity: 0.5 + Math.sin(lf / 14) * 0.04, zIndex: 15 }} />

        {/* SEPARATION HALOS behind the car: a warm gold core (winner cue) plus the cool gel kiss, so the
             tangerine body cuts cleanly off the darkened hall from any frame. */}
        <div style={{ position: "absolute", left: carX - 276, top: carY - 268, width: 552, height: 322, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONGOLD}2E, ${KEY}18 44%, transparent 70%)`, filter: "blur(24px)", opacity: (0.6 + Math.sin(lf / 13) * 0.07) * focus, mixBlendMode: "screen", zIndex: 28 }} />
        <div style={{ position: "absolute", left: carX - 250, top: carY - 244, width: 500, height: 288, borderRadius: "50%", background: `radial-gradient(ellipse, ${ELECTRIC}1E, transparent 66%)`, filter: "blur(22px)", opacity: 0.45 + ledPulse * 0.14, zIndex: 28 }} />

        {/* ===== THE WINNER: the gorgeous BIG tangerine hypercar, spotlit, rotating. RANK ONE: the most
             saturated, highest contrast, sharpest object in the frame. Nothing else gets this treatment. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transform: `scaleX(${carSpinX})`, transformOrigin: `${carX}px ${REFLINE}px`, filter: "saturate(1.22) contrast(1.08) brightness(1.07) drop-shadow(0 0 18px rgba(255,170,80,0.34))", zIndex: 30 }}>
          <Car x={carX} y={carY} s={1.88} solve={4} build={1} glow={0.52} rot={carRot} reflect={0.46} z={30} />
        </div>
        {/* COLOURED RIM KISSES on the hero car flanks, alternating CYAN and MAGENTA (the car is lit in colour) */}
        <StudioLight x={carX - 152} y={carY - 66} w={250} h={330} color={CYAN} o={0.13 + ledPulse * 0.15} z={31} />
        <StudioLight x={carX + 152} y={carY - 66} w={250} h={330} color={MAGENTA} o={0.11 + (1 - ledPulse) * 0.15} z={31} />
        {/* a warm GOLD RIM LIGHT skimming the roofline so the silhouette pops off the dark hall */}
        <div style={{ position: "absolute", left: carX - 214, top: carY - 176, width: 428, height: 64, borderRadius: "50%", background: `radial-gradient(ellipse, ${RIM}3A, ${NEONGOLD}1C 52%, transparent 76%)`, filter: "blur(9px)", opacity: 0.6 + Math.sin(lf / 10) * 0.08, mixBlendMode: "screen", zIndex: 31 }} />
        {/* a bright specular GLINT streaking along the hood, keeping the paint alive as it travels */}
        <div style={{ position: "absolute", left: hoodX, top: 508 + Math.sin(lf / 9) * 4, width: 58, height: 23, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,253,248,0.98), transparent 70%)", filter: "blur(3px)", opacity: 0.72, pointerEvents: "none", zIndex: 31 }} />

        {/* (the first take / SHIP IT motif is retired here on purpose: the reveal is only the car you keep) */}

        {/* ===== THE HERO stands PROUDLY BESIDE the winner, never on it, in his own light pool ===== */}
        <CastShadow x={heroLeft + 84} y={636} w={128} o={0.46} />
        {/* his own soft pool on the deck so he belongs to the focal group, not to the background */}
        <div style={{ position: "absolute", left: heroLeft + 84 - 132, top: 452, width: 264, height: 224, borderRadius: "50%", background: `radial-gradient(ellipse, ${RIM}2E, ${KEY}16 44%, transparent 72%)`, filter: "blur(18px)", opacity: (0.34 + arrive * 0.36) * focus, mixBlendMode: "screen", zIndex: 31 }} />
        <div style={{ position: "absolute", left: heroLeft + 84 - 96, top: 408 + heroY + 28, width: 192, height: 176, borderRadius: "50%", background: `radial-gradient(ellipse, ${CYAN}${hh(heroHalo)}, ${MAGENTA}18 46%, transparent 72%)`, filter: "blur(12px)", opacity: heroHalo + 0.2, zIndex: 31 }} />
        <div style={{ position: "absolute", left: heroLeft, top: 396, width: 176, height: clipH, overflow: "hidden", zIndex: 32 }}>
          <div style={{ position: "relative", width: MSZ, height: MSZ, transform: `translateY(${heroY}px) rotate(${presentLean}deg)`, transformOrigin: "50% 100%", filter: `saturate(1.12) drop-shadow(0 0 7px ${CYAN}) drop-shadow(0 0 4px ${MAGENTA}) drop-shadow(0 0 1.5px rgba(8,12,20,0.95))` }}>
            <Mascot lf={lf} size={MSZ} gaze={2} cheer={cheer} nodAmp={NOD_A} nodSpeed={NOD_S} />

            {/* ---- SHINING STAR EYES: gold and white stars that twinkle, pulse and spin. The overlay
                 copies the Mascot's own hop and squash so the stars stay locked to the head. ---- */}
            <div style={{ position: "absolute", left: 0, top: 0, width: MSZ, height: MSZ, transform: `translateY(${-hopPx}px) scaleY(${squash})`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
              <svg viewBox="0 0 200 200" width={MSZ} height={MSZ} style={{ overflow: "visible" }}>
                {EYES.map((e, i) => {
                  const pulse = e.tw * (0.9 + starPop * 0.34) * (0.3 + starOn * 0.7);
                  const R = 18.4 * (0.86 + pulse * 0.22);
                  const r = 7.4 * (0.86 + pulse * 0.22);
                  return (
                    <g key={"se" + i} opacity={starOn}>
                      {/* cap the painted eye with the clay body colour so nothing dark peeks past the arms */}
                      <rect x={e.cx - 12} y={68} width={24} height={32} rx={4} fill="#D97757" />
                      {/* a warm glow bed so the star reads star struck even at a glance */}
                      <circle cx={e.cx} cy={83} r={R * 1.5} fill={NEONGOLD} opacity={0.22 * e.tw} />
                      <circle cx={e.cx} cy={83} r={R * 0.95} fill={KEY} opacity={0.3 * e.tw} />
                      {/* the STAR itself, slowly spinning, with a gold bloom */}
                      <polygon
                        points={starPts(e.cx, 83, R, r, e.rot)}
                        fill={NEONGOLD}
                        stroke="#FFF6E2"
                        strokeWidth={1.4}
                        style={{ filter: `drop-shadow(0 0 ${(5 * e.tw).toFixed(1)}px ${NEONGOLD}) drop-shadow(0 0 ${(11 * e.tw).toFixed(1)}px ${KEY})` }}
                      />
                      {/* a white hot inner star: the sparkle core, twinkling harder than the shell */}
                      <polygon points={starPts(e.cx, 83, R * 0.5 * (0.82 + e.tw * 0.3), r * 0.44, e.rot)} fill="#FFFDF6" opacity={0.7 + e.tw * 0.3} />
                      {/* a four point GLINT crossing the star, spinning the other way (the twinkle) */}
                      <g transform={`rotate(${(-e.rot * 46).toFixed(2)} ${e.cx} 83)`} opacity={0.5 + e.tw * 0.5}>
                        <rect x={e.cx - 1.1} y={83 - R * 1.34} width={2.2} height={R * 2.68} rx={1.1} fill="#FFFDF6" />
                        <rect x={e.cx - R * 1.34} y={81.9} width={R * 2.68} height={2.2} rx={1.1} fill="#FFFDF6" />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
        {/* tiny gold star motes drifting up off his star struck eyes (readable smitten cue, always moving) */}
        {Array.from({ length: 7 }, (_, i) => {
          const s = seed(i * 3.1 + 9);
          const life = (lf * 1.5 + s * 60) % 60;
          const o = starOn * Math.max(0, 1 - life / 60) * (0.5 + 0.5 * Math.sin(lf / 5 + i));
          if (o <= 0.02) return null;
          const mx = heroLeft + 44 + s * 74 + Math.sin(lf / 12 + i) * 7;
          const my = 470 - life * 1.5 + heroY;
          const sz = 5 + s * 4;
          return <div key={"sm" + i} style={{ position: "absolute", left: mx, top: my, width: sz, height: sz, borderRadius: "50%", background: NEONGOLD, boxShadow: `0 0 9px 2px ${NEONGOLD}AA`, opacity: o * 0.85, zIndex: 33 }} />;
        })}

        {/* COLOUR SPARKS off the podium as he presents the winner: CYAN + MAGENTA + gold, still emitting at the cut */}
        <Sparks lf={lf} x={carX + 150} y={carY - 150} on={over(lf, 72, 18)} color={CYAN} n={10} z={33} />
        <Sparks lf={lf} x={carX - 140} y={carY - 140} on={over(lf, 84, 22)} color={MAGENTA} n={8} z={33} />
        <Sparks lf={lf + 8} x={carX} y={carY - 196} on={party} color={NEONGOLD} n={6} z={33} />

        {/* ===== FOREGROUND DEPTH: out of focus dark occluders + a cinema camera on a tripod ===== */}
        <div style={{ position: "absolute", left: -44, top: 556, width: 156, height: 260, borderRadius: 22, background: "linear-gradient(90deg, #040506, #0C0E12)", filter: "blur(7px)", opacity: 0.94, zIndex: 55 }} />
        <div style={{ position: "absolute", right: -34, top: 596, width: 134, height: 224, borderRadius: 22, background: "linear-gradient(270deg, #040506, #0C0E12)", filter: "blur(7px)", opacity: 0.92, zIndex: 55 }} />
        {/* a broadcast CINEMA CAMERA on a tripod, silhouetted in the near foreground, tally light blinking */}
        <div style={{ position: "absolute", left: 862, top: 632, width: 130, height: 150, zIndex: 56, filter: "blur(2.6px)", opacity: 0.9 }}>
          <div style={{ position: "absolute", left: 44, top: 78, width: 5, height: 72, background: "#0A0C10", transform: "rotate(15deg)", transformOrigin: "top" }} />
          <div style={{ position: "absolute", left: 60, top: 78, width: 5, height: 72, background: "#0A0C10" }} />
          <div style={{ position: "absolute", left: 76, top: 78, width: 5, height: 72, background: "#0A0C10", transform: "rotate(-15deg)", transformOrigin: "top" }} />
          <div style={{ position: "absolute", left: 30, top: 40, width: 68, height: 40, borderRadius: 6, background: "linear-gradient(180deg, #16191E, #05070A)", border: "1px solid #23272E" }} />
          <div style={{ position: "absolute", left: 8, top: 50, width: 30, height: 22, borderRadius: "50% 8px 8px 50%", background: "#0A0C10", boxShadow: "inset 0 0 6px rgba(147,178,206,0.35)" }} />
          <div style={{ position: "absolute", left: 44, top: 26, width: 26, height: 16, borderRadius: 4, background: "#0A0C10" }} />
          <div style={{ position: "absolute", left: 88, top: 44, width: 8, height: 8, borderRadius: "50%", background: HOTRED, opacity: 0.4 + ((Math.sin(lf / 5) + 1) / 2) * 0.4, boxShadow: `0 0 8px ${HOTRED}` }} />
        </div>
        {/* a couple of blurred press flashes in the far foreground crowd, dimmed so they never steal the eye */}
        {[0, 1].map((i) => {
          const period = 40;
          const age = (lf + i * 20) % period;
          const on = age < 4 ? (1 - age / 4) * (0.34 + party * 0.5) : 0;
          if (on <= 0) return null;
          const fc = i ? "#B7CCDE" : "#DCC2CE";
          return <div key={"ff" + i} style={{ position: "absolute", left: i ? 792 : 96, top: 750, width: 26, height: 26, borderRadius: "50%", background: fc, boxShadow: `0 0 30px 11px ${fc}80`, filter: "blur(3.4px)", opacity: on * 0.6, zIndex: 56 }} />;
        })}

      </div>

      {/* CTA / tag / vignette live OUTSIDE the camera wrapper so they never dolly with the scene.
          The edge vignette is deeper now: it closes the frame down onto the winner. */}
      <SceneTag f={lf} text="THE REVEAL" color={CYAN} />
      <Vig o={0.52} />
    </AbsoluteFill>
  );
};

const S9: React.FC<{ lf: number }> = ({ lf }) => {
  const P = lf;
  const H = 372; // the night-city horizon: a SATURATED neon glow sits here, the wet asphalt falls to camera
  const rev = 0.5 + 0.5 * Math.sin(P * 0.9);
  const launch = over(P, 14, 13, Easing.out(Easing.cubic));        // the drive off punch
  const roll = over(P, 0, 96);                                     // never fully still: still creeping at f96
  const burn = Math.min(1, 0.30 + launch * 0.72);                 // tyre smoke: heavy on launch, lingers on the pull
  const glow = Math.min(1, 0.5 + rev * 0.18 + launch * 0.22);     // the accent underglow
  const cheer = Math.min(0.55, 0.3 + rev * 0.08 + launch * 0.28); // hero throws a fist up on the launch
  // ---- THE CTA + LEAD MAGNET land EARLY (~lf 22) and HOLD big through the end so the payoff is unmissable.
  const cta = over(P, 22, 8, Easing.out(Easing.cubic));           // the "Comment TAKES" pill fades up early, then stays
  const ctaS = interpolate(P, [22, 28, 33, 90, 96], [0.72, 1.07, 1, 1, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }); // punch in, a tiny end swell
  const takeGlow = 0.6 + 0.4 * Math.sin(P / 7);                   // the word TAKES pulses warm
  const guide = over(P, 30, 15, Easing.out(Easing.cubic));        // the premium GUIDE card rises onto the hero, dead centre
  const guideBob = Math.sin(P / 15) * 4;                          // it drifts gently so it never sits still
  const guideTilt = -1.4 + Math.sin(P / 22) * 0.6;                // a slow, expensive tilt (not a paper flap)
  const guideS = interpolate(P, [30, 40, 46, 92, 96], [0.86, 1.05, 1, 1, 1.03], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const gloss = ((P * 3.4) % 200) - 60;                           // a glossy sheen slides across the card face
  const scan = ((P * 3) % 170) - 24;                              // a highlight sweeps the code block (alive)
  const goldPulse = 0.6 + 0.4 * Math.sin(P / 9);                  // the gold accents breathe
  const keyPulse = 0.5 + Math.sin(P / 16) * 0.05;                 // the warm key light breathes

  // ---- VIBRANT COLOUR IDENTITY: a saturated NEON-CITY night drive. ELECTRIC blue + MAGENTA gels drench
  // the sky, CYAN + VIOLET searchlights rake it, a scrolling neon skyline glows on the horizon and the
  // wet road throws back coloured neon. HIERARCHY PASS: all of that stays, fully alive, but it is now
  // knocked DOWN in brightness, blurred deeper and desaturated so it clearly sits BEHIND the hero.
  const colO = over(P, 0, 10);                                    // the colour washes fade up fast on the cut
  const driftA = Math.sin(P / 33) * 72;                           // the big ELECTRIC sky wash drifts one way
  const driftB = Math.cos(P / 29) * 72;                           // the big MAGENTA sky wash drifts back
  const sweepX = ((P * 9) % 1520) - 380;                          // a CYAN light bar rakes across the sky
  const sweep2X = ((P * 6.5 + 760) % 1520) - 380;                 // a VIOLET bar rakes offset
  const beamRot1 = Math.sin(P / 20) * 15;                         // two sky searchlights sweep on angles
  const beamRot2 = Math.sin(P / 17 + 2.2) * 18;
  const sig = 0.55 + 0.45 * Math.sin(P / 6);                      // the neon signage pulses
  const cityScroll = (P * 3.2) % 220;                             // the neon skyline parallax scrolls left

  const farScroll = (P * 1.5) % 240;                             // the FAR skyline crawls slower (deepest parallax layer)
  const railT = (P * 6) % 1240;                                  // an elevated MONORAIL glides across the skyline

  // ---- CAMERA: a low angle CHASE that pushes in on the launch, whips to track the car, then holds big.
  const shake = (1 - launch) * (Math.sin(P * 2.6) * 2.2 + rev * 0.9);   // engine jitter before the launch
  const camS = interpolate(P, [0, 14, 34, 70, 96], [1.05, 1.02, 1.13, 1.16, 1.19], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const camX = interpolate(P, [14, 22, 34], [0, -18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) + Math.sin(P / 13) * 3.2 * launch + shake;
  const camY = interpolate(P, [0, 34, 96], [0, -7, -13], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + Math.sin(P / 17) * 2;

  // ---- THE WINNER holds center low; the streaming world carries the speed, plus a launch surge + bob.
  const surge = interpolate(P, [14, 24, 40], [26, -6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const carX = 506 + surge * 0.5 + Math.sin(P / 10) * 3;
  const carY = 648 + Math.sin(P / 12) * 3;
  const lift = -launch * 8 * (1 - over(P, 40, 16));               // a brief front end wheelie off the line
  const roadSpd = interpolate(P, [0, 14, 30], [1.15, 1.35, 2.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* ================= EVERYTHING INSIDE THE CHASE CAMERA ================= */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${camS}) translate(${camX}px, ${camY}px)`, transformOrigin: "50% 72%" }}>

        {/* ---- NIGHT SKY: a deep SATURATED indigo to violet night, dimmed so it reads as depth not subject ---- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: H + 40, background: "linear-gradient(180deg,#050411 0%,#0C0921 46%,#130A31 100%)", zIndex: 1 }} />
        {/* ---- FAR SKYLINE: the DEEPEST wall. heavier blur + desaturated + dimmed so it recedes hard ---- */}
        <div style={{ position: "absolute", left: 0, top: H - 152, width: 1012, height: 158, zIndex: 1, overflow: "hidden", filter: "blur(6px) saturate(0.55) brightness(0.6)", opacity: colO * 0.68 }}>
          {Array.from({ length: 22 }, (_, i) => {
            const bw = 24 + seed(i * 2.3 + 1) * 30;
            const bh = 26 + seed(i * 4.9 + 2) * 96;
            const x = (((i * 54 - farScroll) % 1240) + 1240) % 1240 - 74;
            const c = [ELECTRIC, VIOLET, AZURE][i % 3];
            return (
              <div key={"far" + i} style={{ position: "absolute", left: x, bottom: 0, width: bw, height: bh, background: "linear-gradient(180deg,#1B1440,#08061A)", borderTop: `1px solid ${c}44`, boxShadow: `0 -3px 14px ${c}22` }}>
                {Array.from({ length: 9 }, (_, w) => { const on = (Math.sin(P / 24 + i * 3.1 + w * 1.3) + 1) / 2; return <div key={w} style={{ position: "absolute", left: 4 + (w % 3) * ((bw - 8) / 3), top: 6 + Math.floor(w / 3) * 10, width: 3, height: 4, background: c, opacity: 0.08 + on * 0.22 }} />; })}
              </div>
            );
          })}
        </div>

        {/* ---- BOLD GEL WASHES drenching the sky, held back so they tint rather than shout ---- */}
        <GelWash x={230 + driftA} y={205} w={900} h={520} color={ELECTRIC} o={colO * 0.24} blur={92} z={1} />
        <GelWash x={820 + driftB} y={250} w={860} h={520} color={MAGENTA} o={colO * 0.21} blur={92} z={1} />
        <GelWash x={506} y={150} w={640} h={360} color={CYAN} o={colO * 0.11} blur={84} z={1} />

        {/* ---- SKY SEARCHLIGHTS: coloured cones anchored at the horizon, sweeping on angles (alive, softened) ---- */}
        {[{ bx: 250, c: CYAN, r: beamRot1, o: 0.20 }, { bx: 770, c: VIOLET, r: beamRot2, o: 0.17 }, { bx: 506, c: ELECTRIC, r: -beamRot1 * 0.8, o: 0.13 }].map((b, i) => (
          <div key={"beam" + i} style={{ position: "absolute", left: b.bx, top: H - 330, width: 60, height: 340, transformOrigin: "50% 100%", transform: `rotate(${b.r}deg)`, background: `linear-gradient(0deg, ${b.c}, transparent 78%)`, clipPath: "polygon(38% 100%,62% 100%,100% 0,0 0)", filter: "blur(14px)", opacity: colO * b.o * (0.7 + sig * 0.3), mixBlendMode: "screen", zIndex: 2 }} />
        ))}

        {/* ---- the distant NEON CITY SKYLINE parallax: same detail + motion, softer contrast, pushed back ---- */}
        <div style={{ position: "absolute", left: 0, top: H - 118, width: 1012, height: 132, zIndex: 2, overflow: "hidden", filter: "blur(2.4px) saturate(0.72) brightness(0.66)", opacity: 0.82 }}>
          {Array.from({ length: 16 }, (_, i) => {
            const bw = 34 + seed(i * 3.1) * 40;
            const bh = 40 + seed(i * 5.7) * 74;
            const x = (((i * 72 - cityScroll) % 1140) + 1140) % 1140 - 64;
            const c = [ELECTRIC, MAGENTA, CYAN, VIOLET, AZURE, HOTPINK][i % 6];
            return (
              <div key={"bld" + i} style={{ position: "absolute", left: x, bottom: 0, width: bw, height: bh, background: `linear-gradient(180deg, ${c}1E, #08061A)`, borderTop: `2px solid ${c}AA`, boxShadow: `0 -6px 20px ${c}44`, borderRadius: "2px 2px 0 0" }}>
                {Array.from({ length: 6 }, (_, w) => { const on = (Math.sin(P / 9 + i * 2 + w * 1.7) + 1) / 2; return <div key={w} style={{ position: "absolute", left: 5 + (w % 2) * (bw - 14), top: 9 + Math.floor(w / 2) * 14, width: 5, height: 6, background: c, opacity: 0.22 + on * 0.42, boxShadow: `0 0 5px ${c}` }} />; })}
              </div>
            );
          })}
        </div>

        {/* ---- MID: a distant OVERPASS crossing behind the horizon, tiny head + tail lights streaming both ways ---- */}
        <div style={{ position: "absolute", left: -20, top: H - 40, width: 1052, height: 18, zIndex: 2, opacity: colO * 0.66, filter: "blur(1.4px)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 7, background: "linear-gradient(180deg,#161A2C,#080A14)", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }} />
          {Array.from({ length: 8 }, (_, i) => <div key={"pier" + i} style={{ position: "absolute", left: i * 140 + 40, top: 12, width: 5, height: 22, background: "#0F1220" }} />)}
          {Array.from({ length: 16 }, (_, i) => {
            const dir = i % 2 ? 1 : -1;
            const sp = 3.4 + seed(i * 2.1) * 1.8;
            const x = (((P * sp * dir + i * 132) % 1052) + 1052) % 1052;
            const warm = dir > 0;
            const c = warm ? "#E9D6A8" : "#C43A50";
            return <div key={"ov" + i} style={{ position: "absolute", left: x, top: warm ? 5 : 9, width: 7, height: 3, borderRadius: 2, background: c, opacity: 0.7, boxShadow: `0 0 5px ${c}` }} />;
          })}
        </div>

        {/* ---- MID: an elevated MONORAIL gliding across the skyline (still gliding, now clearly background) ---- */}
        <div style={{ position: "absolute", left: 0, top: H - 98, width: 1012, height: 30, zIndex: 2, overflow: "hidden", filter: "blur(2.2px) saturate(0.7)", opacity: 0.6 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 3, background: `linear-gradient(90deg, transparent, ${AZURE}44 12%, ${AZURE}44 88%, transparent)`, boxShadow: `0 0 6px ${AZURE}44` }} />
          {Array.from({ length: 7 }, (_, i) => <div key={"py" + i} style={{ position: "absolute", left: i * 150 + 30, top: 20, width: 3, height: 12, background: "#1E2238" }} />)}
          <div style={{ position: "absolute", left: 1012 - railT, top: 8, width: 150, height: 15, borderRadius: 4, background: "linear-gradient(180deg,#2C3358,#13162C)", boxShadow: `0 0 10px ${AZURE}44, inset 0 1px 0 rgba(255,255,255,0.10)`, opacity: 0.85 }}>
            {Array.from({ length: 10 }, (_, w) => { const on = (Math.sin(P / 3 + w) + 1) / 2; return <div key={w} style={{ position: "absolute", left: 8 + w * 13.4, top: 4, width: 6, height: 7, borderRadius: 1, background: NEONGOLD, opacity: 0.34 + on * 0.28, boxShadow: `0 0 4px ${NEONGOLD}` }} />; })}
          </div>
        </div>

        {/* ---- MID: big ANIMATED SKYLINE BILLBOARDS (scan bars + sweeping highlight kept, contrast pulled down) ---- */}
        {[{ bx: 150, w: 128, h: 60, c: MAGENTA }, { bx: 680, w: 150, h: 70, c: CYAN }].map((b, i) => {
          const x = (((b.bx - cityScroll * 0.9) % 1320) + 1320) % 1320 - 150;
          const sweep = ((P * 2.4 + i * 40) % (b.w + 60)) - 30;
          const pulse = 0.6 + 0.4 * Math.sin(P / 6 + i * 2);
          return (
            <div key={"skb" + i} style={{ position: "absolute", left: x, top: H - 152, width: b.w, height: b.h, zIndex: 2, filter: "blur(2.2px) saturate(0.72)", opacity: 0.62 }}>
              <div style={{ position: "absolute", left: b.w * 0.3, top: b.h, width: 3, height: 34, background: "#191D2E" }} />
              <div style={{ position: "absolute", left: b.w * 0.7, top: b.h, width: 3, height: 34, background: "#191D2E" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 4, overflow: "hidden", background: `linear-gradient(150deg, ${b.c}AA, #08061A)`, border: `2px solid ${b.c}99`, boxShadow: `0 0 18px ${b.c}77, inset 0 0 10px ${b.c}44`, opacity: 0.42 + pulse * 0.28 }}>
                {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 8 + r * ((b.h - 16) / 3), height: 5, background: b.c, opacity: 0.2 + 0.34 * ((Math.sin(P / 5 + r * 1.5 + i) + 1) / 2) }} />)}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: sweep, width: 26, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent)", filter: "blur(3px)" }} />
              </div>
              <div style={{ position: "absolute", left: -20, top: -14, right: -20, bottom: -30, background: `radial-gradient(ellipse, ${b.c}22, transparent 68%)`, filter: "blur(10px)", mixBlendMode: "screen" }} />
            </div>
          );
        })}

        {/* ---- streaming COLOURFUL BOKEH (out of focus city lights) rising + twinkling, softer now ---- */}
        {Array.from({ length: 22 }, (_, i) => { const s = seed(i * 5.3 + 9); const p = ((P * (0.006 + s * 0.006) + s) % 1); const e = Math.pow(p, 1.6); const yy = H - 92 + e * 74; const xx = 30 + s * 950 + Math.sin(P / 14 + i) * 8; const sz = 4 + s * 7 + e * 6; const tw = 0.4 + 0.6 * ((Math.sin(P / 8 + i * 1.7) + 1) / 2); const col = [MAGENTA, CYAN, ELECTRIC, VIOLET, NEONGOLD, HOTPINK][i % 6]; return <div key={"bk" + i} style={{ position: "absolute", left: xx, top: yy, width: sz, height: sz, borderRadius: "50%", background: col, opacity: tw * 0.34 * (1 - e * 0.4), filter: "blur(3.4px)", boxShadow: `0 0 ${8 + sz}px ${col}`, zIndex: 2 }} />; })}

        {/* ---- the horizon NEON band: still a saturated falloff, dimmed so the road reads deeper ---- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: H - 5, height: 12, background: `linear-gradient(90deg, transparent, ${ELECTRIC} 30%, ${MAGENTA} 55%, ${CYAN} 72%, transparent)`, opacity: 0.32, filter: "blur(8px)", zIndex: 4 }} />

        {/* ---- RAKING GEL BARS sweeping across the whole frame (still moving, quieter) ---- */}
        <GelBar x={sweepX} y={210} w={460} h={230} color={CYAN} o={colO * 0.18} rot={14} z={5} />
        <GelBar x={sweep2X} y={330} w={460} h={210} color={VIOLET} o={colO * 0.14} rot={-12} z={5} />

        {/* ---- THE ROAD: dark wet asphalt, a graphite perspective slab falling to camera ---- */}
        <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 3 }}>
          <defs>
            <linearGradient id="s9road" x1="0" y1={H} x2="0" y2="792" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#14171D" />
              <stop offset="0.5" stopColor="#0C0E13" />
              <stop offset="1" stopColor="#06070A" />
            </linearGradient>
          </defs>
          <polygon points={`446,${H} 566,${H} 1140,792 -128,792`} fill="url(#s9road)" />
          {/* clean painted EDGE LINES catching the neon */}
          <line x1={446} y1={H} x2={-128} y2={792} stroke={CYAN} strokeWidth={3} opacity={0.18} />
          <line x1={566} y1={H} x2={1140} y2={792} stroke={MAGENTA} strokeWidth={3} opacity={0.18} />
        </svg>

        {/* ---- WET SHEEN: a warm centre specular smear + CYAN and MAGENTA neon streaks reflected down ---- */}
        <div style={{ position: "absolute", left: 0, top: H, width: 1012, height: 792 - H, zIndex: 3, opacity: 0.62 }}>
          <div style={{ position: "absolute", left: 456, top: 0, width: 100, height: "100%", background: `linear-gradient(180deg, ${KEY}18, ${NEONORANGE}0C 42%, transparent 82%)`, clipPath: "polygon(40% 0,60% 0,92% 100%,8% 100%)", filter: "blur(16px)" }} />
          <div style={{ position: "absolute", left: 296, top: 0, width: 76, height: "100%", background: `linear-gradient(180deg, ${CYAN}1C, transparent 78%)`, clipPath: "polygon(45% 0,55% 0,82% 100%,18% 100%)", filter: "blur(18px)", mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", left: 636, top: 0, width: 76, height: "100%", background: `linear-gradient(180deg, ${MAGENTA}1C, transparent 78%)`, clipPath: "polygon(45% 0,55% 0,82% 100%,18% 100%)", filter: "blur(18px)", mixBlendMode: "screen" }} />
        </div>

        {/* ---- the dashed centre line reflectors STREAMING toward camera ---- */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.72, zIndex: 3 }}>
          <RoadLines lf={P} speed={roadSpd} horizon={H} hue={NEONGOLD} />
        </div>

        {/* ---- ONCOMING TRAFFIC: pairs of headlights rising from the horizon + streaking down the far LEFT lane ---- */}
        {Array.from({ length: 4 }, (_, i) => {
          const s = seed(i * 5.9 + 7);
          const p = ((P * 0.014 + i / 4 + s * 0.5) % 1);
          const e = Math.pow(p, 2.0);
          const ty = H + e * (792 - H);
          const cx = 506 - (18 + e * 380);
          const sc = 0.1 + e * 1.5;
          const o = Math.min(1, p * 6) * (1 - Math.max(0, (p - 0.9) / 0.1));
          const c = "#EDDCB8";
          return (
            <div key={"onc" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 6, opacity: o * 0.62 }}>
              {[-1, 1].map((k) => <div key={k} style={{ position: "absolute", left: cx + k * 18 * sc - 9 * sc, top: ty - 5 * sc, width: 18 * sc, height: 10 * sc, borderRadius: "50%", background: `radial-gradient(ellipse, ${c}, transparent 72%)`, filter: `blur(${2.2 * sc}px)`, boxShadow: `0 0 ${14 * sc}px ${c}` }} />)}
              <div style={{ position: "absolute", left: cx - 30 * sc, top: ty, width: 60 * sc, height: 64 * sc, background: `radial-gradient(ellipse at 50% 0%, ${c}44, transparent 60%)`, filter: `blur(${5 * sc}px)`, mixBlendMode: "screen" }} />
            </div>
          );
        })}

        {/* ---- TAIL LIGHTS of cars ahead on the hero lane, receding + shrinking up toward the horizon ---- */}
        {Array.from({ length: 3 }, (_, i) => {
          const s = seed(i * 4.4 + 12);
          const p = ((P * 0.010 + i / 3 + s * 0.5) % 1);
          const e = Math.pow(1 - p, 1.7);
          const ty = H + 6 + e * 540;
          const cx = 506 + e * 120;
          const sc = 0.12 + e * 1.5;
          const o = Math.min(1, p * 8) * (1 - Math.max(0, (p - 0.82) / 0.18));
          const c = "#C4303F";
          return (
            <div key={"tail" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 6, opacity: o * 0.62 }}>
              {[-1, 1].map((k) => <div key={k} style={{ position: "absolute", left: cx + k * 16 * sc - 7 * sc, top: ty, width: 14 * sc, height: 7 * sc, borderRadius: "40%", background: c, filter: `blur(${1.4 * sc}px)`, boxShadow: `0 0 ${9 * sc}px ${c}` }} />)}
            </div>
          );
        })}

        {/* ---- OVERHEAD STEEL SIGN GANTRIES approaching + passing over the road (kept, dimmed + softened) ---- */}
        {[0, 1, 2].map((i) => {
          const p = ((P * 0.011 + i / 3 + 0.05) % 1);
          const e = Math.pow(p, 1.8);
          const gy = H - 46 + e * (860 - (H - 46));
          const halfW = 70 + e * 900;
          const sc = 0.18 + e * 2.0;
          const o = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.86) / 0.14));
          const beamH = 10 * sc;
          return (
            <div key={"g" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 8, opacity: o * 0.66, filter: "saturate(0.8) brightness(0.72)" }}>
              {/* two brushed steel legs */}
              <div style={{ position: "absolute", left: 506 - halfW - 6 * sc, top: gy - 140 * sc, width: 9 * sc, height: 150 * sc, background: "linear-gradient(90deg,#232830,#454C55,#2B3138)", borderRadius: 2 * sc }} />
              <div style={{ position: "absolute", left: 506 + halfW - 3 * sc, top: gy - 140 * sc, width: 9 * sc, height: 150 * sc, background: "linear-gradient(90deg,#232830,#454C55,#2B3138)", borderRadius: 2 * sc }} />
              {/* the truss beam: brushed steel with a top spec highlight */}
              <div style={{ position: "absolute", left: 506 - halfW, top: gy, width: halfW * 2, height: beamH, background: "linear-gradient(180deg,#454C55,#24292F,#373E46)", borderRadius: 2 * sc, boxShadow: `inset 0 ${1.5 * sc}px 0 rgba(255,255,255,0.16)` }} />
              {/* a glowing CYAN to MAGENTA neon band under the beam */}
              <div style={{ position: "absolute", left: 506 - halfW + 6, top: gy + beamH, width: halfW * 2 - 12, height: 6 * sc, background: `linear-gradient(90deg, ${CYAN}, ${ELECTRIC} 50%, ${MAGENTA})`, opacity: 0.34 + sig * 0.24, borderRadius: 1 * sc, boxShadow: `0 0 ${10 * sc}px ${ELECTRIC}` }} />
              {/* two COLOURED downlight fixtures throwing cones onto the tarmac */}
              {[-0.42, 0.42].map((fx, k) => { const cxp = 506 + fx * halfW * 0.9; const cc = k ? CYAN : MAGENTA; return (
                <div key={k}>
                  <div style={{ position: "absolute", left: cxp - 14 * sc, top: gy + beamH + 5 * sc, width: 28 * sc, height: 9 * sc, background: `linear-gradient(180deg, ${cc}, #241F30)`, borderRadius: 2 * sc, boxShadow: `0 0 ${16 * sc}px ${cc}` }} />
                  <div style={{ position: "absolute", left: cxp - 40 * sc, top: gy + beamH + 12 * sc, width: 80 * sc, height: 150 * sc, background: `linear-gradient(180deg, ${cc}26, transparent 82%)`, clipPath: "polygon(34% 0,66% 0,100% 100%,0 100%)", filter: `blur(${6 * sc}px)`, mixBlendMode: "screen" }} />
                </div>
              ); })}
            </div>
          );
        })}

        {/* ---- ROADSIDE NEON BILLBOARDS streaming past (all still there, sitting back in the mix) ---- */}
        {Array.from({ length: 6 }, (_, i) => {
          const side = i % 2 ? 1 : -1;
          const s = seed(i * 4.7 + 6);
          const p = ((P * 0.011 + i / 6 + s * 0.35) % 1);
          const e = Math.pow(p, 1.9);
          const gy = H - 40 + e * (720 - (H - 40));
          const sc = 0.12 + e * 2.0;
          const gx = 506 + side * (200 + e * 820);
          const c = [MAGENTA, CYAN, ELECTRIC, NEONGOLD, VIOLET, HOTPINK][i % 6];
          const on = 0.6 + 0.4 * Math.sin(P / 5 + i * 1.9);
          const o = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.9) / 0.1));
          return (
            <div key={"bb" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 9, opacity: o * 0.6, filter: "blur(1.2px) saturate(0.82)" }}>
              {/* the steel pole */}
              <div style={{ position: "absolute", left: gx - 2 * sc, top: gy - 70 * sc, width: 4 * sc, height: 96 * sc, background: "linear-gradient(90deg,#232830,#464E58,#2B3138)", borderRadius: 2 * sc }} />
              {/* the glowing neon sign panel */}
              <div style={{ position: "absolute", left: gx - 30 * sc, top: gy - 120 * sc, width: 60 * sc, height: 44 * sc, borderRadius: 4 * sc, background: `linear-gradient(160deg, ${c}CC, #08061A)`, border: `${2 * sc}px solid ${c}AA`, boxShadow: `0 0 ${20 * sc}px ${c}77, inset 0 0 ${8 * sc}px ${c}66`, opacity: 0.38 + on * 0.34 }} />
              {/* its coloured pool bleeding onto the wet road */}
              <div style={{ position: "absolute", left: gx - 56 * sc, top: gy - 70 * sc, width: 112 * sc, height: 200 * sc, background: `radial-gradient(ellipse at 50% 0%, ${c}30, transparent 62%)`, filter: `blur(${8 * sc}px)`, mixBlendMode: "screen" }} />
            </div>
          );
        })}

        {/* ---- ROADSIDE STREET LAMPS streaming past (steel poles, COLOURED lamp heads + neon pools) ---- */}
        {Array.from({ length: 5 }, (_, i) => {
          const side = i % 2 ? 1 : -1;
          const s = seed(i * 4.1 + 3);
          const p = ((P * 0.010 + i / 5 + s * 0.3) % 1);
          const e = Math.pow(p, 1.9);
          const gy = H - 24 + e * (760 - (H - 24));
          const sc = 0.14 + e * 2.1;
          const gx = 506 + side * (150 + e * 760);
          const armLen = 44 * sc;
          const headX = gx + (-side) * armLen;
          const c = [CYAN, MAGENTA, NEONGOLD, ELECTRIC, VIOLET][i % 5];
          const o = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.9) / 0.1));
          return (
            <div key={"lp" + i} style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 9, opacity: o * 0.58, filter: "blur(1.2px) saturate(0.82)" }}>
              {/* the pole */}
              <div style={{ position: "absolute", left: gx - 2.5 * sc, top: gy - 150 * sc, width: 5 * sc, height: 158 * sc, background: "linear-gradient(90deg,#232830,#464E58,#2B3138)", borderRadius: 2 * sc }} />
              {/* the curved arm reaching over the road */}
              <div style={{ position: "absolute", left: Math.min(gx, headX), top: gy - 150 * sc, width: armLen, height: 5 * sc, background: "linear-gradient(180deg,#464E58,#232830)", borderRadius: 2 * sc }} />
              {/* the coloured lamp head */}
              <div style={{ position: "absolute", left: headX - 10 * sc, top: gy - 150 * sc + 3 * sc, width: 20 * sc, height: 9 * sc, background: `linear-gradient(180deg, ${c}, #241F30)`, borderRadius: 3 * sc, boxShadow: `0 0 ${16 * sc}px ${c}` }} />
              {/* the neon cone pool on the tarmac */}
              <div style={{ position: "absolute", left: headX - 60 * sc, top: gy - 146 * sc, width: 120 * sc, height: 210 * sc, background: `radial-gradient(ellipse at 50% 0%, ${c}22, transparent 64%)`, filter: `blur(${8 * sc}px)`, mixBlendMode: "screen" }} />
            </div>
          );
        })}

        {/* ---- pulsing neon LED depth strips on the far edges (kept breathing, dimmed at the frame edge) ---- */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 7 }}>
          <Neon x={14} y={H - 10} w={7} h={200} color={CYAN} on={0.5 + sig * 0.4} z={7} round={4} />
          <Neon x={991} y={H - 10} w={7} h={200} color={MAGENTA} on={0.5 + sig * 0.4} z={7} round={4} />
        </div>

        {/* ================= HIERARCHY SCRIM: one veil that pushes the WHOLE city back =================
             it darkens, desaturates and softens every background layer above (z < 12) in one pass, so all
             the detail and motion survives but is unmistakably SECONDARY to the car. ---- */}
        <div style={{ position: "absolute", inset: 0, zIndex: 12, pointerEvents: "none", background: "rgba(6,7,16,0.30)", backdropFilter: "brightness(0.72) saturate(0.78) blur(1.6px)", WebkitBackdropFilter: "brightness(0.72) saturate(0.78) blur(1.6px)" }} />
        {/* a deeper knockdown on the top third (sky + skyline) so the eye is dragged down to the hero */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: H + 30, zIndex: 12, pointerEvents: "none", background: `linear-gradient(180deg, rgba(5,6,14,0.46), rgba(5,6,14,0.10))` }} />

        {/* ================= THE FOCAL LIGHT: a clean stage pool that owns the centre ================= */}
        {/* a soft overhead cone of warm light falling onto the winner (the hero is the only lit thing) */}
        <div style={{ position: "absolute", left: carX - 300, top: H - 60, width: 600, height: 480, zIndex: 13, background: `linear-gradient(180deg, ${KEY}22, ${KEY}12 40%, transparent 86%)`, clipPath: "polygon(36% 0,64% 0,100% 100%,0 100%)", filter: "blur(26px)", mixBlendMode: "screen", opacity: 0.55 + keyPulse * 0.25 }} />
        {/* ---- a WARM KEY pool wrapping the winner (keeps the tangerine premium against the cool city) ---- */}
        <div style={{ position: "absolute", left: carX - 350, top: carY - 380, width: 700, height: 540, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}3A, ${NEONORANGE}1C 46%, transparent 72%)`, filter: "blur(24px)", opacity: 0.7 + keyPulse * 0.14, zIndex: 13 }} />
        {/* the bright floor pool the car sits in, so it is lifted off the dark asphalt */}
        <div style={{ position: "absolute", left: carX - 300, top: carY - 70, width: 600, height: 200, borderRadius: "50%", background: `radial-gradient(ellipse, ${KEY}2E, ${NEONORANGE}14 44%, transparent 70%)`, filter: "blur(20px)", opacity: 0.66, zIndex: 13 }} />

        {/* ---- SPEED LINES ripping past, recoloured to vibrant neon ---- */}
        {Array.from({ length: 17 }, (_, i) => {
          const s = seed(i * 2.7 + 5);
          const yy = 300 + s * 430;
          const spb = 0.5 + launch * 2.2 + roll * 0.2;
          const sp = (9 + s * 13) * (0.5 + spb);
          const len = 60 + launch * 240 + s * 100;
          const period = 1012 + len + 160;
          const x = 1012 - (((P * sp + s * 1300) % period));
          const col = [CYAN, MAGENTA, ELECTRIC, "#FFFFFF"][i % 4];
          const nearCar = Math.abs(yy - carY) < 190 ? 0.45 : 1;   // they thin out where they would cross the hero
          const o = (0.09 + launch * 0.30 + 0.07) * (0.5 + s * 0.5) * nearCar;
          return <div key={"sl" + i} style={{ position: "absolute", left: x, top: yy, width: len, height: 2 + s * 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${col})`, opacity: o, boxShadow: `0 0 6px ${col}`, mixBlendMode: "screen", zIndex: 15 }} />;
        })}

        {/* ---- TYRE SMOKE billowing off the rear (rear = left side), tinted by the neon it drives through ---- */}
        {Array.from({ length: 14 }, (_, i) => {
          const s = seed(i * 4.3 + 2);
          const t = (((P + i * 7) % 50)) / 50;
          const sz = 54 + t * (170 + s * 100);
          const px = carX - 150 - t * 150 + (s - 0.5) * 70;
          const py = carY - 6 - t * 54 - s * 24;
          const o = burn * (1 - t) * (0.24 + s * 0.20);
          const tint = i % 3 === 0 ? "rgba(255,61,139,0.14)" : i % 3 === 1 ? "rgba(31,214,230,0.14)" : "rgba(226,214,190,0.18)";
          return <div key={"sm" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz * 0.3, width: sz, height: sz * 0.66, borderRadius: "50%", background: `radial-gradient(ellipse, ${tint}, transparent 70%)`, filter: "blur(9px)", opacity: o, zIndex: 16 }} />;
        })}

        {/* ---- WET ROAD reflection of the car: a warm underglow + a CYAN neon kiss ---- */}
        <div style={{ position: "absolute", left: carX - 90, top: carY + 8, width: 180, height: 120, background: `linear-gradient(180deg, ${NEONORANGE}3E, transparent 76%)`, filter: "blur(12px)", opacity: 0.56 * (0.6 + glow * 0.4), zIndex: 15 }} />
        <div style={{ position: "absolute", left: carX - 150, top: carY + 2, width: 300, height: 56, borderRadius: "50%", background: `radial-gradient(ellipse, ${NEONORANGE}44, transparent 68%)`, filter: "blur(10px)", opacity: 0.46 + glow * 0.26, zIndex: 16 }} />
        <div style={{ position: "absolute", left: carX - 160, top: carY + 6, width: 320, height: 60, borderRadius: "50%", background: `radial-gradient(ellipse, ${CYAN}2A, transparent 66%)`, filter: "blur(12px)", opacity: 0.34 + glow * 0.24, mixBlendMode: "screen", zIndex: 16 }} />

        {/* ---- EXHAUST: a subtle heat shimmer + a soft flame lick out the back (rear = left side) ---- */}
        {[0, 1].map((k) => {
          const fl = 0.6 + 0.4 * Math.sin(P * (1.2 + k * 0.5) + k * 1.7);
          const w = (40 + k * 22) * (0.75 + fl * 0.4) * (1 + launch * 0.6);
          const h = (18 + k * 8) * (0.8 + fl * 0.3);
          const col = k === 0 ? "rgba(120,180,255,0.55)" : "rgba(255,200,140,0.5)";
          return <div key={"fl" + k} style={{ position: "absolute", left: carX - 168 - w, top: carY - 40 - h / 2 + k * 4, width: w, height: h, borderRadius: "50% 40% 40% 50% / 50%", background: `radial-gradient(ellipse at 90% 50%, ${col}, transparent 72%)`, filter: "blur(4px)", opacity: 0.5 + rev * 0.3, zIndex: 19 }} />;
        })}
        <Sparks lf={P} x={carX - 164} y={carY - 30} on={burn * 0.6} color={NEONORANGE} n={8} z={19} />

        {/* ---- COLOURED RIM KISSES on the hero car: a CYAN flank + a MAGENTA flank so it reads sculpted in neon ---- */}
        <div style={{ position: "absolute", left: carX - 200, top: carY - 150 + lift, width: 220, height: 200, borderRadius: "50%", background: `radial-gradient(ellipse at 82% 50%, ${CYAN}4A, transparent 66%)`, filter: "blur(14px)", opacity: 0.6 + glow * 0.34, mixBlendMode: "screen", zIndex: 19 }} />
        <div style={{ position: "absolute", left: carX - 20, top: carY - 150 + lift, width: 240, height: 200, borderRadius: "50%", background: `radial-gradient(ellipse at 18% 50%, ${MAGENTA}42, transparent 66%)`, filter: "blur(14px)", opacity: 0.55 + glow * 0.32, mixBlendMode: "screen", zIndex: 19 }} />

        {/* ---- THE HERO driving the winner (clay = hero alone). A cool rim so he reads off the tangerine body ---- */}
        <div style={{ position: "absolute", left: carX - 78, top: carY - 168 + lift, width: 156, height: 160, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 42%, ${FILL}4E, ${COOL}22 50%, transparent 72%)`, filter: "blur(8px)", zIndex: 17 }} />
        <div style={{ position: "absolute", left: carX - 42, top: carY - 150 + lift, zIndex: 18 }}>
          <Mascot lf={P} size={104} tint={HERO} gaze={2} cheer={cheer} nodAmp={1.2} nodSpeed={7} />
        </div>

        {/* ---- a warm KEY rim wrapping the upper body so the car reads sculpted, not flat ---- */}
        <div style={{ position: "absolute", left: carX - 40, top: carY - 196 + lift, width: 380, height: 160, borderRadius: "50%", background: `radial-gradient(ellipse at 70% 60%, ${RIM}4E, ${KEY}26 46%, transparent 70%)`, filter: "blur(12px)", zIndex: 17 }} />

        <CastShadow x={carX} y={carY - 2} w={360} o={0.5} />
        {/* ---- THE WINNER: tangerine hypercar (solve 4), BIG + lit + glossy, the subject. reflect on wet asphalt ---- */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, filter: `saturate(1.16) contrast(1.06) drop-shadow(0 0 26px ${NEONORANGE}55)` }}>
          <Car x={carX} y={carY} s={1.72} solve={4} build={1} glow={glow} rot={lift} reflect={0.42} z={20} />
        </div>

        {/* ---- spinning wheel blur overlays ---- */}
        {[-108, 108].map((dx, i) => (
          <div key={"wb" + i} style={{ position: "absolute", left: carX + dx - 36, top: carY - 52 - 36, width: 72, height: 72, borderRadius: "50%", background: `conic-gradient(from ${P * 52}deg, transparent 0deg, rgba(215,222,232,0.55) 40deg, transparent 80deg, transparent 180deg, rgba(215,222,232,0.55) 220deg, transparent 260deg)`, opacity: 0.3 + launch * 0.3 + rev * 0.14, zIndex: 22 }} />
        ))}

        {/* ---- headlights blazing (front = right side), warm and crisp with a cyan flare halo ---- */}
        <div style={{ position: "absolute", left: carX + 150, top: carY - 118, width: 220, height: 96, borderRadius: "50%", background: "radial-gradient(ellipse at 12% 50%, rgba(255,246,214,0.96), transparent 70%)", filter: "blur(6px)", opacity: 0.58 + rev * 0.4, zIndex: 21 }} />
        <div style={{ position: "absolute", left: carX + 180, top: carY - 128, width: 300, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse at 10% 50%, ${CYAN}34, transparent 70%)`, filter: "blur(12px)", opacity: (0.3 + rev * 0.35) * (0.7 + launch * 0.5), mixBlendMode: "screen", zIndex: 21 }} />

        {/* ---- rising NEON EMBERS drifting up through the frame (colourful atmosphere, always moving) ---- */}
        {Array.from({ length: 12 }, (_, i) => { const s = seed(i * 7.3 + 1); const t = ((P * (0.5 + s * 0.5) + i * 11) % 90) / 90; const px = 80 + s * 860 + Math.sin(P / 16 + i) * 22; const py = 760 - t * 520; const c = [CYAN, MAGENTA, NEONGOLD, ELECTRIC][i % 4]; const o = (0.13 + s * 0.13) * (1 - t) * 0.7; return <div key={"em" + i} style={{ position: "absolute", left: px, top: py, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 6px ${c}`, zIndex: 23 }} />; })}

        {/* ---- DUST MOTES drifting through the warm key beam (fine atmosphere, premium) ---- */}
        {Array.from({ length: 10 }, (_, i) => { const s = seed(i * 6.2 + 11); const t = ((P * (0.6 + s * 0.5) + i * 13) % 80) / 80; const px = carX + 120 - t * 380 + (s - 0.5) * 160; const py = carY - 150 - s * 120 + Math.sin(P / 20 + i) * 10; const o = (0.12 + s * 0.16) * (1 - t) * (0.5 + glow * 0.5); return <div key={"du" + i} style={{ position: "absolute", left: px, top: py, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: RIM, opacity: o, boxShadow: `0 0 4px ${KEY}`, zIndex: 23 }} />; })}

        {/* ---- FOREGROUND STEEL W-BEAM GUARDRAILS streaming past camera (kept, now dark framing occluders) ---- */}
        {Array.from({ length: 8 }, (_, i) => {
          const side = i % 2 ? 1 : -1;
          const s = seed(i * 3.9 + 4);
          const p = ((P * 0.013 + i / 8 + s * 0.4) % 1);
          const e = Math.pow(p, 1.85);
          const gy = H + 20 + e * (840 - (H + 20));
          const sc = 0.16 + e * 2.4;
          const gx = 506 + side * (90 + e * 700);
          const refl = side > 0 ? MAGENTA : CYAN;  // saturated neon retroreflectors, one hue per side
          const o = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.88) / 0.12));
          return (
            <div key={"gr" + i} style={{ position: "absolute", left: gx - 8 * sc, top: gy - 66 * sc, width: 16 * sc, height: 82 * sc, zIndex: 42, opacity: o * 0.72, filter: `brightness(0.7) ${e > 1.0 ? `blur(${(e - 1.0) * 4}px)` : ""}` }}>
              {/* the steel post */}
              <div style={{ position: "absolute", left: 5.5 * sc, top: 16 * sc, width: 5 * sc, height: 66 * sc, background: "linear-gradient(90deg,#232830,#464E58,#2B3138)", borderRadius: 1.5 * sc }} />
              {/* the W beam rail */}
              <div style={{ position: "absolute", left: -2 * sc, top: 14 * sc, width: 20 * sc, height: 12 * sc, background: "linear-gradient(180deg,#525B66,#282E36,#414952)", borderRadius: 2 * sc, boxShadow: `inset 0 ${1 * sc}px 0 rgba(255,255,255,0.18)` }} />
              {/* the neon retroreflector */}
              <div style={{ position: "absolute", left: 3.5 * sc, top: 16 * sc, width: 9 * sc, height: 6 * sc, borderRadius: 1.5 * sc, background: refl, boxShadow: `0 0 ${11 * sc}px ${refl}`, opacity: 0.8 }} />
            </div>
          );
        })}
      </div>

      {/* ================= STABLE OVERLAYS (outside the camera) ================= */}
      <SceneTag f={P} text="THE WINNER" color={CYAN} x={40} y={214} />

      {/* ---- FOCUS VIGNETTE: the frame edges fall away so the centre cluster (car + card + CTA) owns the eye ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58, pointerEvents: "none", background: "radial-gradient(ellipse 62% 52% at 50% 62%, rgba(0,0,0,0) 40%, rgba(4,4,12,0.34) 74%, rgba(3,3,10,0.62) 100%)" }} />
      <Vig o={0.5} />

      {/* ================= THE LEAD MAGNET: a PREMIUM GLOSSY GUIDE CARD =================
             a real mini document: deep graphite gradient, crisp GOLD rules, a gold corner ribbon reading
             FREE, a title line and three preview lines. It sits DEAD CENTRE, resting ON TOP of the winner
             so the payoff object and the hero read as one focal block. ---- */}
      {guide > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 366, display: "flex", justifyContent: "center", zIndex: 82, opacity: guide }}>
          <div style={{ position: "relative", width: 486, transform: `translateY(${(1 - guide) * 60 + guideBob}px) rotate(${guideTilt}deg) scale(${guideS})`, transformOrigin: "50% 30%" }}>
            {/* a soft NEUTRAL drop shadow so the white card lifts off the car (no coloured neon glow) */}
            <div style={{ position: "absolute", left: -44, top: -30, right: -44, bottom: -44, background: "radial-gradient(ellipse, rgba(0,0,0,0.55), rgba(0,0,0,0.22) 54%, transparent 78%)", filter: "blur(28px)" }} />

            {/* a clean WHITE PAPER document card: ink on white, one clay accent, no neon */}
            <div style={{ position: "relative", borderRadius: 22, background: "linear-gradient(170deg,#FFFFFF 0%,#FAF7F0 60%,#F1ECE1 100%)", border: "1.5px solid #E3DDD1", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), 0 14px 30px rgba(0,0,0,0.32)", overflow: "hidden" }}>

              {/* a gentle paper sheen sliding across the face (keeps it alive) */}
              <div style={{ position: "absolute", top: -40, bottom: -40, left: gloss, width: 78, transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.62), transparent)", filter: "blur(9px)", pointerEvents: "none" }} />

              {/* THE HEAD ROW: a clay document glyph + the file name + a hairline rule */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px 12px" }}>
                <div style={{ width: 30, height: 34, borderRadius: 5, background: `linear-gradient(160deg, ${CLAY}, #B2573A)`, position: "relative", flexShrink: 0 }}>
                  {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 6, right: 6, top: 8 + r * 7, height: 2.5, borderRadius: 2, background: "rgba(255,255,255,0.78)" }} />)}
                </div>
                <div style={{ fontFamily: mono, fontSize: 16, letterSpacing: "0.02em", color: "#726D62", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>takes-cheatsheet.pdf</div>
              </div>
              <div style={{ height: 1.5, margin: "0 20px", background: "linear-gradient(90deg,#DFD8CA,rgba(223,216,202,0.35) 60%,transparent)" }} />

              {/* THE TITLE LINE */}
              <div style={{ padding: "14px 20px 8px" }}>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, letterSpacing: "0.18em", color: CLAY, marginBottom: 6 }}>THE CHEAT SHEET</div>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, lineHeight: 1.1, color: INK, letterSpacing: "-0.015em" }}>
                  The 5x command{" "}<span style={{ color: CLAY }}>+ the blind grader prompt</span>
                </div>
              </div>

              {/* THE PREVIEW LINES: a light inset document block, ink on paper */}
              <div style={{ margin: "8px 20px 20px", borderRadius: 13, background: "#F3EFE6", border: "1px solid #E1DACC", padding: "12px 14px", position: "relative", overflow: "hidden", boxShadow: "inset 0 2px 8px rgba(90,80,60,0.10)" }}>
                {[
                  [["$ ", CLAY], ["claude run --takes ", "#38342C"], ["5", CLAY]],
                  [["grade ", CLAY], ["> blind reviewer #6", "#38342C"]],
                  [["pick ", CLAY], ["best-of-five", "#38342C"]],
                ].map((ln, i) => (
                  <div key={i} style={{ fontFamily: mono, fontSize: 16, lineHeight: 1.68, whiteSpace: "nowrap" }}>
                    <span style={{ color: "rgba(60,56,48,0.32)", marginRight: 12 }}>{i + 1}</span>
                    {ln.map((tk, j) => <span key={j} style={{ color: tk[1] as string }}>{tk[0]}</span>)}
                  </div>
                ))}
                <div style={{ marginTop: 10, height: 5, width: "72%", borderRadius: 3, background: `linear-gradient(90deg, ${CLAY}99, ${CLAY}22)` }} />
                <div style={{ position: "absolute", top: 0, bottom: 0, left: scan, width: 46, background: "linear-gradient(90deg, transparent, rgba(210,114,78,0.14), transparent)", filter: "blur(4px)" }} />
              </div>

              {/* THE CORNER RIBBON reading FREE: solid clay, white type, no glow */}
              <div style={{ position: "absolute", right: -46, top: 20, width: 168, transform: "rotate(38deg)", background: CLAY, boxShadow: "0 6px 16px rgba(0,0,0,0.3)", textAlign: "center", padding: "7px 0", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.22em", color: "#FFFFFF" }}>FREE</div>
            </div>
          </div>
        </div>
      )}

      {/* ---- THE CTA CARD: a premium graphite pill sitting right above the guide, crowning the winner ---- */}
      {cta > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 244, display: "flex", justifyContent: "center", opacity: cta, zIndex: 86 }}>
          <div style={{ position: "relative", transform: `scale(${ctaS})` }}>
            <div style={{ position: "absolute", left: -50, top: -44, right: -60, bottom: -44, background: `radial-gradient(ellipse, ${KEY}4A, ${GOLD}26 55%, transparent 74%)`, filter: "blur(24px)" }} />
            <div style={{ position: "relative", padding: "18px 42px", borderRadius: 999, background: "linear-gradient(158deg,#242830 0%,#12151A 100%)", border: `2px solid ${GOLD}`, boxShadow: `0 22px 54px -12px rgba(0,0,0,0.7), 0 0 34px ${KEY}4A, 0 0 44px ${GOLD}30, inset 0 2px 0 rgba(255,255,255,0.12)`, display: "flex", alignItems: "center", gap: 16, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 44, filter: `drop-shadow(0 0 10px ${KEY})` }}>{"💬"}</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, letterSpacing: "-0.01em", color: "#F6F1E6", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>Comment{" "}
                <span style={{ color: GOLD, textShadow: `0 0 12px ${GOLD}${takeGlow > 0.8 ? "AA" : "88"}, 0 0 26px ${NEONORANGE}66` }}>TAKES</span>
              </span>
            </div>
            <div style={{ position: "absolute", left: -8, top: -8, right: -8, bottom: -8, borderRadius: 999, border: `1px solid ${GOLD}`, opacity: 0.28 + rev * 0.2 }} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------------- the top game rail (house chassis, canonical rich form, neon-garage skin) ----------------
// The typical rail: a race track with COLLECTIBLE PELLETS + numbered CHECKPOINTS (1-5) + bonus
// STARS, a Claude mascot RUNNER that travels the track behind a filling progress RING with a live
// SCORE that ticks up as it collects, and a 🏁 checkered-flag REWARD that wakes + bursts at the end.
const RAIL_CP = [1, 2, 3, 4, 5].map((i) => i / 6);               // the 5 checkpoint positions (even)
const RAIL_PEL = Array.from({ length: 13 }, (_, k) => (k + 1) / 14) // pellets along the track...
  .filter((x) => RAIL_CP.every((c) => Math.abs(x - c) > 0.035));   // ...not sitting under a checkpoint
const RAIL_STAR = [0.255, 0.585, 0.915];                          // 3 bonus stars between checkpoints
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const runnerX = Math.min(p, 0.955);                             // the runner rides the fill, stops at the flag
  const cpLit = RAIL_CP.filter((x) => runnerX >= x).length;
  const pelLit = RAIL_PEL.filter((x) => runnerX >= x).length;
  const starLit = RAIL_STAR.filter((x) => runnerX >= x).length;
  const score = pelLit + cpLit * 3 + starLit * 2;                 // the live score
  const totalItems = RAIL_CP.length + RAIL_PEL.length + RAIL_STAR.length;
  const ringFill = (cpLit + pelLit + starLit) / totalItems;
  // pop when the runner just crossed ANY collectible (a satisfying tick)
  const allPos = [...RAIL_CP, ...RAIL_PEL, ...RAIL_STAR].filter((x) => runnerX >= x).map((x) => x);
  const lastCross = allPos.length ? Math.max(...allPos) : -1;
  const crossDist = (runnerX - lastCross) * (durationInFrames / FPS);
  const pop = Math.max(0, 1 - crossDist * 3.2);
  const giftWake = ramp(t, L[9] - 1.2, L[9] + 0.4);               // the flag lights up as the CTA lands
  const giftOpen = over(f, Lf[9] + fr(0.2), fr(0.5), Easing.out(Easing.back(2)));
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 62, zIndex: 120 }}>
      {/* the track: a dark neon-tinted rail with an inner glow */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 22, height: 22, background: "rgba(70,50,120,0.35)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3), inset 0 0 10px rgba(120,80,220,0.3)" }} />
      {/* the filled portion, clay-gold with a neon edge */}
      <div style={{ position: "absolute", left: 0, top: 22, height: 22, width: `${p * 100}%`, background: grad("#F0A26A", "#D2724E"), borderRadius: 999, boxShadow: `0 0 14px ${NEONORANGE}88, 0 3px 12px rgba(210,114,78,0.6)` }} />

      {/* ---- PELLETS: little neon coins the runner collects ---- */}
      {RAIL_PEL.map((x, i) => {
        const lit = runnerX >= x; const d = lit ? runnerX - x : 1; const near = Math.max(0, 1 - d * 26);
        return (
          <div key={"pel" + i} style={{ position: "absolute", left: `${x * 100}%`, top: 27, transform: `translateX(-50%) scale(${lit ? 1 + near * 0.7 : 1})`, width: 12, height: 12, borderRadius: "50%", background: lit ? CYAN : "rgba(140,150,210,0.35)", border: `2px solid ${lit ? "#DFFcFF" : "rgba(180,190,240,0.4)"}`, boxShadow: lit ? `0 0 ${8 + near * 12}px ${CYAN}` : "none", zIndex: 122 }} />
        );
      })}

      {/* ---- BONUS STARS ---- */}
      {RAIL_STAR.map((x, i) => {
        const lit = runnerX >= x; const d = lit ? runnerX - x : 1; const near = Math.max(0, 1 - d * 18);
        return (
          <div key={"star" + i} style={{ position: "absolute", left: `${x * 100}%`, top: 12, transform: `translateX(-50%) scale(${lit ? 1 + near * 0.5 : 1 + Math.sin(t * 2.6 + i) * 0.06})`, width: 42, height: 42, zIndex: 123 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: lit ? grad("#FFE07A", "#E7A11E") : "#241C3E", border: `4px solid ${lit ? "#FFF0B0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, color: lit ? "#5A3A05" : GOLD, boxShadow: lit ? `0 0 ${10 + near * 16}px ${NEONGOLD}` : `0 0 8px ${GOLD}44` }}>★</div>
          </div>
        );
      })}

      {/* ---- the 5 numbered CHECKPOINTS ---- */}
      {RAIL_CP.map((x, i) => {
        const lit = runnerX >= x; const d = lit ? runnerX - x : 1; const near = Math.max(0, 1 - d * 14);
        return (
          <div key={"cp" + i} style={{ position: "absolute", left: `${x * 100}%`, top: 4, transform: `translateX(-50%) scale(${1 + near * 0.55})`, width: 52, height: 52, zIndex: 124 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: lit ? GREEN : "#EDE7DB", border: `4px solid ${lit ? "#7FE0AE" : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, color: lit ? "#fff" : CLAY, boxShadow: lit ? `0 0 ${11 + near * 20}px ${GREEN}` : `0 3px 8px rgba(26,24,19,0.3)` }}>{lit ? "✓" : i + 1}</div>
            {lit && near > 0.02 && <div style={{ position: "absolute", left: 26, top: 26, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GREEN}`, transform: `scale(${1 + (1 - near) * 10})`, opacity: near }} />}
          </div>);
      })}

      {/* ---- THE REWARD: a checkered flag that greys out until the finish, then wakes + bursts ---- */}
      <div style={{ position: "absolute", right: 0, top: -20, width: 92, height: 92, transform: `translateY(${Math.sin(t * 2.4) * 3}px) scale(${1 + giftOpen * 0.14})`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `radial-gradient(circle, ${NEONGOLD}${giftWake > 0.3 ? "99" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + giftWake * 26}px ${NEONGOLD}77` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, lineHeight: 1, filter: `grayscale(${0.7 - giftWake * 0.7}) brightness(${0.8 + giftWake * 0.2})`, opacity: 0.55 + giftWake * 0.45, transform: `scale(${0.82 + giftWake * 0.18})` }}>{"🏁"}</div>
        {giftOpen > 0.05 && Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2; const dd = giftOpen * (28 + seed(i) * 22);
          const c = [NEONGOLD, CYAN, MAGENTA, "#fff"][i % 4];
          return <div key={"sp" + i} style={{ position: "absolute", left: 46 + Math.cos(a) * dd, top: 46 + Math.sin(a) * dd, width: 6, height: 6, borderRadius: "50%", background: c, opacity: Math.max(0, 1 - giftOpen * 1.1), boxShadow: `0 0 8px ${c}` }} />;
        })}
      </div>

      {/* ---- THE RUNNER: the Claude mascot on the track behind a filling ring + a live score ---- */}
      <div style={{ position: "absolute", left: `${runnerX * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", left: -9, top: -9, width: 84, height: 84, borderRadius: "50%", background: `conic-gradient(${ringFill >= 0.999 ? NEONGOLD : CYAN} ${ringFill * 360}deg, rgba(70,50,120,0.35) 0deg)`, WebkitMask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", mask: "radial-gradient(circle closest-side, transparent 80%, #000 81%)", boxShadow: `0 0 12px ${CYAN}66` }} />
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${ringFill >= 0.999 ? NEONGOLD : CYAN}`, boxShadow: pop > 0.05 ? `0 0 ${14 + pop * 18}px ${CYAN}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + pop * 2.6} nodSpeed={6.5} cheer={Math.max(pop * 0.85, cpLit >= 5 ? 0.75 : 0)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + pop * 0.4})`, padding: "3px 13px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: pop > 0.05 ? `0 0 12px ${NEONGOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
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

// ---------------- HOOK HEADER (raycfu-style title, opening only) ----------------
// Standing house rule (memory/reel-hook-header): every reel opens with a big two-tone
// hook-headline that names Claude (in clay) so the hook is mute-readable as a TITLE in
// the first second. Slams in at frame 0, holds through the S0 hook, clears before S1.
const OsHeroHeaderUnused: React.FC = () => {
  const f = useCurrentFrame();
  if (f > Lf[1] - 4) return null;                       // gone before the problem scene
  const slam = interpolate(f, [0, 5, 9], [1.16, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const inO = over(f, 0, 4);
  const outO = 1 - over(f, Lf[1] - 20, 16);
  const o = Math.min(inO, outO);
  const shimX = ((f * 9) % 520) - 130;
  const drop = interpolate(f, [0, 6], [-26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const L1 = (t: string, clay = false) => <span style={{ color: clay ? CLAY : "#F4EFE4" }}>{t}</span>;
  return (
    <div style={{ position: "absolute", left: 540, top: 452 + drop, transform: `translateX(-50%) scale(${slam})`, transformOrigin: "50% 0%", opacity: o, zIndex: 190, pointerEvents: "none" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "20px 44px 22px", borderRadius: 22, background: "linear-gradient(158deg,#151D33 0%,#080D1A 100%)", border: "2px solid rgba(207,149,68,0.45)", boxShadow: "0 30px 60px -18px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.10)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.02, letterSpacing: "-0.02em", whiteSpace: "nowrap", textShadow: "0 3px 16px rgba(0,0,0,0.6)" }}>{L1("Build the ")}{L1("agentic OS", true)}</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.02, letterSpacing: "-0.02em", whiteSpace: "nowrap", textShadow: "0 3px 16px rgba(0,0,0,0.6)" }}>{L1("that runs ")}{L1("Claude", true)}{L1(" for you")}</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: shimX, width: 150, background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.16),transparent)", transform: "skewX(-16deg)" }} />
      </div>
      <div style={{ position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 30, border: `3px solid ${GOLD}`, opacity: (1 - over(f, 0, 10)) * 0.85 }} />
    </div>
  );
};


export const ClaudeTakesReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.026;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_takes.wav")} />
      <Audio loop src={staticFile("ebm_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.2), fr(L[9]) - 8, fr(L[9]) + 14, 99999], [0.12, 0.13, 0.13, 0.11, 0.11], { extrapolateRight: "clamp" })} />
      {/* ===== SOUND DESIGN v3: dense library SFX synced to the motion beats (screen of hum/buzz kept out). ===== */}
      <Sfx at={0.0} src="lib_camera_shutter.wav" v={0.44} dur={0.8} />
      <Sfx at={0.033} src="lib_whoosh_fast.wav" v={0.4} dur={1.2} />
      <Sfx at={0.1} src="wrench_clank.wav" v={0.28} dur={0.6} />
      <Sfx at={0.233} src="crash.wav" v={0.46} dur={1.4} />
      <Sfx at={0.267} src="lib_boom.wav" v={0.34} dur={2.0} />
      <Sfx at={0.333} src="lib_magic_reveal.wav" v={0.3} dur={3.0} />
      <Sfx at={0.433} src="mech_clank.wav" v={0.28} dur={0.7} />
      <Sfx at={0.533} src="mech_clank.wav" v={0.26} dur={0.7} />
      <Sfx at={0.8} src="stamp_press.wav" v={0.44} dur={0.8} />
      <Sfx at={0.833} src="crash.wav" v={0.34} dur={1.4} />
      <Sfx at={1.067} src="snap.wav" v={0.24} dur={0.6} />
      <Sfx at={1.533} src="lib_deep_whoosh.wav" v={0.26} dur={1.6} />
      <Sfx at={2.0} src="lib_click.wav" v={0.22} dur={0.6} />
      <Sfx at={2.4} src="lib_cinematic_hit.wav" v={0.3} dur={2.0} />
      <Sfx at={2.767} src="sparkle.wav" v={0.22} dur={0.8} />
      <Sfx at={3.567} src="lib_whoosh.wav" v={0.24} dur={1.5} />
      <Sfx at={4.567} src="lib_camera_shutter.wav" v={0.24} dur={0.8} />
      <Sfx at={5.033} src="lib_magic_reveal.wav" v={0.3} dur={3.0} />
      <Sfx at={5.167} src="lib_riser.wav" v={0.3} dur={2.6} />
      <Sfx at={5.367} src="lib_deep_whoosh.wav" v={0.36} dur={1.6} />
      <Sfx at={5.6} src="lib_whoosh_fast.wav" v={0.38} dur={1.2} />
      <Sfx at={5.767} src="lib_boom.wav" v={0.48} dur={2.0} />
      <Sfx at={5.767} src="lib_boom.wav" v={0.44} dur={2.0} />
      <Sfx at={5.833} src="crash.wav" v={0.4} dur={1.4} />
      <Sfx at={5.933} src="crash.wav" v={0.34} dur={1.4} />
      <Sfx at={6.1} src="lib_cinematic_hit.wav" v={0.26} dur={2.0} />
      <Sfx at={6.367} src="snap.wav" v={0.22} dur={0.6} />
      <Sfx at={6.9} src="sparkle.wav" v={0.28} dur={0.8} />
      <Sfx at={7.733} src="mech_clank.wav" v={0.34} dur={0.7} />
      <Sfx at={7.833} src="lib_magic_reveal.wav" v={0.28} dur={3.0} />
      <Sfx at={8.067} src="mech_clank.wav" v={0.3} dur={0.7} />
      <Sfx at={8.1} src="lib_pop.wav" v={0.24} dur={0.6} />
      <Sfx at={8.467} src="sparkle.wav" v={0.22} dur={0.8} />
      <Sfx at={8.6} src="wrench_clank.wav" v={0.36} dur={0.6} />
      <Sfx at={8.667} src="lib_click.wav" v={0.24} dur={0.6} />
      <Sfx at={9.1} src="lib_cinematic_hit.wav" v={0.44} dur={2.0} />
      <Sfx at={9.133} src="snap.wav" v={0.3} dur={0.6} />
      <Sfx at={9.233} src="lib_pop.wav" v={0.24} dur={0.6} />
      <Sfx at={9.333} src="stamp_press.wav" v={0.42} dur={0.8} />
      <Sfx at={9.533} src="sparkle.wav" v={0.28} dur={0.8} />
      <Sfx at={10.3} src="lib_click.wav" v={0.22} dur={0.6} />
      <Sfx at={10.867} src="lib_pop.wav" v={0.24} dur={0.6} />
      <Sfx at={11.2} src="lib_riser.wav" v={0.24} dur={2.6} />
      <Sfx at={11.367} src="mech_clank.wav" v={0.26} dur={0.7} />
      <Sfx at={11.7} src="wrench_clank.wav" v={0.24} dur={0.6} />
      <Sfx at={12.067} src="lib_click.wav" v={0.28} dur={0.6} />
      <Sfx at={12.433} src="mech_clank.wav" v={0.46} dur={0.7} />
      <Sfx at={12.5} src="lib_boom.wav" v={0.4} dur={2.0} />
      <Sfx at={12.6} src="lib_magic_reveal.wav" v={0.36} dur={3.0} />
      <Sfx at={12.733} src="sparkle.wav" v={0.3} dur={0.8} />
      <Sfx at={12.9} src="lib_click.wav" v={0.28} dur={0.6} />
      <Sfx at={13.267} src="crash.wav" v={0.44} dur={1.4} />
      <Sfx at={13.333} src="snap.wav" v={0.34} dur={0.6} />
      <Sfx at={13.567} src="lib_deep_whoosh.wav" v={0.26} dur={1.6} />
      <Sfx at={13.767} src="chimelo.wav" v={0.32} dur={0.9} />
      <Sfx at={14.233} src="lib_pop.wav" v={0.24} dur={0.6} />
      <Sfx at={14.6} src="mech_clank.wav" v={0.34} dur={0.7} />
      <Sfx at={14.7} src="mech_clank.wav" v={0.24} dur={0.7} />
      <Sfx at={14.9} src="wrench_clank.wav" v={0.24} dur={0.6} />
      <Sfx at={15.0} src="mech_clank.wav" v={0.38} dur={0.7} />
      <Sfx at={15.1} src="mech_clank.wav" v={0.26} dur={0.7} />
      <Sfx at={15.3} src="wrench_clank.wav" v={0.24} dur={0.6} />
      <Sfx at={15.4} src="mech_clank.wav" v={0.34} dur={0.7} />
      <Sfx at={15.533} src="lib_click.wav" v={0.3} dur={0.6} />
      <Sfx at={16.0} src="lib_whoosh.wav" v={0.22} dur={1.5} />
      <Sfx at={16.467} src="snap.wav" v={0.2} dur={0.6} />
      <Sfx at={16.867} src="lib_riser.wav" v={0.24} dur={2.6} />
      <Sfx at={17.133} src="lib_deep_whoosh.wav" v={0.2} dur={1.6} />
      <Sfx at={17.467} src="wrench_clank.wav" v={0.28} dur={0.6} />
      <Sfx at={17.967} src="lib_click.wav" v={0.32} dur={0.6} />
      <Sfx at={18.267} src="wrench_clank.wav" v={0.26} dur={0.6} />
      <Sfx at={18.533} src="mech_clank.wav" v={0.24} dur={0.7} />
      <Sfx at={18.767} src="lib_click.wav" v={0.32} dur={0.6} />
      <Sfx at={19.067} src="wrench_clank.wav" v={0.26} dur={0.6} />
      <Sfx at={19.333} src="tire_screech.wav" v={0.36} dur={1.0} />
      <Sfx at={19.367} src="stamp_press.wav" v={0.42} dur={0.8} />
      <Sfx at={19.467} src="lib_boom.wav" v={0.3} dur={2.0} />
      <Sfx at={19.867} src="wrench_clank.wav" v={0.26} dur={0.6} />
      <Sfx at={20.367} src="lib_click.wav" v={0.32} dur={0.6} />
      <Sfx at={20.667} src="wrench_clank.wav" v={0.26} dur={0.6} />
      <Sfx at={21.167} src="lib_click.wav" v={0.34} dur={0.6} />
      <Sfx at={22.0} src="lib_deep_whoosh.wav" v={0.3} dur={1.6} />
      <Sfx at={22.2} src="wrench_clank.wav" v={0.24} dur={0.6} />
      <Sfx at={22.667} src="stamp_press.wav" v={0.34} dur={0.8} />
      <Sfx at={22.833} src="snap.wav" v={0.26} dur={0.6} />
      <Sfx at={23.0} src="wrench_clank.wav" v={0.24} dur={0.6} />
      <Sfx at={23.4} src="stamp_press.wav" v={0.34} dur={0.8} />
      <Sfx at={23.567} src="snap.wav" v={0.26} dur={0.6} />
      <Sfx at={23.667} src="wrench_clank.wav" v={0.22} dur={0.6} />
      <Sfx at={24.333} src="wrench_clank.wav" v={0.22} dur={0.6} />
      <Sfx at={24.467} src="lib_riser.wav" v={0.3} dur={2.6} />
      <Sfx at={24.667} src="crash.wav" v={0.46} dur={1.4} />
      <Sfx at={24.933} src="stamp_press.wav" v={0.4} dur={0.8} />
      <Sfx at={25.0} src="crash.wav" v={0.36} dur={1.4} />
      <Sfx at={25.1} src="lib_click.wav" v={0.3} dur={0.6} />
      <Sfx at={26.3} src="lib_deep_whoosh.wav" v={0.26} dur={1.6} />
      <Sfx at={27.567} src="lib_riser.wav" v={0.3} dur={2.6} />
      <Sfx at={28.167} src="lib_whoosh.wav" v={0.26} dur={1.5} />
      <Sfx at={28.3} src="wrench_clank.wav" v={0.3} dur={0.6} />
      <Sfx at={28.433} src="crowd_cheer.wav" v={0.44} dur={2.2} />
      <Sfx at={28.467} src="sparkle.wav" v={0.34} dur={0.8} />
      <Sfx at={28.567} src="lib_boom.wav" v={0.28} dur={2.0} />
      <Sfx at={28.933} src="lib_cinematic_hit.wav" v={0.32} dur={2.0} />
      <Sfx at={28.967} src="snap.wav" v={0.26} dur={0.6} />
      <Sfx at={29.033} src="crash.wav" v={0.36} dur={1.4} />
      <Sfx at={29.3} src="mech_clank.wav" v={0.28} dur={0.7} />
      <Sfx at={29.433} src="lib_pop.wav" v={0.24} dur={0.6} />
      <Sfx at={30.167} src="mech_clank.wav" v={0.34} dur={0.7} />
      <Sfx at={30.233} src="sparkle.wav" v={0.3} dur={0.8} />
      <Sfx at={31.133} src="lib_deep_whoosh.wav" v={0.34} dur={1.6} />
      <Sfx at={31.267} src="lib_riser.wav" v={0.26} dur={2.6} />
      <Sfx at={31.4} src="mech_clank.wav" v={0.36} dur={0.7} />
      <Sfx at={31.5} src="sparkle.wav" v={0.28} dur={0.8} />
      <Sfx at={31.933} src="wrench_clank.wav" v={0.22} dur={0.6} />
      <Sfx at={32.267} src="lib_whoosh.wav" v={0.26} dur={1.5} />
      <Sfx at={32.5} src="sparkle.wav" v={0.34} dur={0.8} />
      <Sfx at={32.733} src="mech_clank.wav" v={0.22} dur={0.7} />
      <Sfx at={33.033} src="lib_camera_shutter.wav" v={0.24} dur={0.8} />
      <Sfx at={33.233} src="lib_pop.wav" v={0.22} dur={0.6} />
      <Sfx at={33.4} src="lib_magic_reveal.wav" v={0.4} dur={3.0} />
      <Sfx at={33.533} src="sparkle.wav" v={0.34} dur={0.8} />
      <Sfx at={33.933} src="crowd_cheer.wav" v={0.3} dur={2.2} />
      <Sfx at={34.433} src="lib_click.wav" v={0.26} dur={0.6} />
      <Sfx at={34.833} src="lib_deep_whoosh.wav" v={0.34} dur={1.6} />
      <Sfx at={35.033} src="lib_riser.wav" v={0.26} dur={2.6} />
      <Sfx at={35.233} src="mech_clank.wav" v={0.42} dur={0.7} />
      <Sfx at={35.333} src="tire_screech.wav" v={0.3} dur={1.0} />
      <Sfx at={35.5} src="lib_pop.wav" v={0.36} dur={0.6} />
      <Sfx at={35.7} src="lib_click.wav" v={0.32} dur={0.6} />
      <Sfx at={35.767} src="lib_whoosh_fast.wav" v={0.28} dur={1.2} />
      <Sfx at={35.967} src="lib_magic_reveal.wav" v={0.4} dur={3.0} />
      <Sfx at={36.1} src="sparkle.wav" v={0.3} dur={0.8} />
      <Sfx at={36.3} src="chimelo.wav" v={0.34} dur={0.9} />
      <Sfx at={36.7} src="lib_whoosh.wav" v={0.24} dur={1.5} />
      <Sfx at={37.233} src="lib_click.wav" v={0.22} dur={0.6} />
      <Sfx at={37.767} src="crowd_cheer.wav" v={0.3} dur={2.2} />
      <Sfx at={5.87} src="lib_whoosh_fast.wav" v={0.32} dur={1.2} />
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Panel tint="rgba(180,90,220,0.30)" label="bay 1 / take 1">
          {scene(0) ? <S0 lf={frame - Lf[0]} /> : null}
          {scene(1) ? <S1 lf={frame - Lf[1]} /> : null}
          {scene(2) ? <S2 lf={frame - Lf[2]} /> : null}
          {scene(3) ? <S3 lf={frame - Lf[3]} /> : null}
          {scene(4) ? <S4 lf={frame - Lf[4]} /> : null}
          {scene(5) ? <S5 lf={frame - Lf[5]} /> : null}
          {scene(6) ? <S6 lf={frame - Lf[6]} /> : null}
          {scene(7) ? <S7 lf={frame - Lf[7]} /> : null}
          {scene(8) ? <S8 lf={frame - Lf[8]} /> : null}
          {scene(9) ? <S9 lf={frame - Lf[9]} /> : null}
        </Panel>
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {/* the hook header: settles on S0, lifts away before S1 */}
      <HookHeader f={frame} line1="Make Claude" hot="grade" line2="its own work" />
    </AbsoluteFill>
  );
};
