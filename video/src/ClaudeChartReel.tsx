// ==== part: 00_head.tsx ====
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_chart.json";

// ============================================================================
// REEL 69 - CHART - "Claude vs THE ADVERSARY"
// You only use 10% of Claude's brain. The other 90% is an AGENT GRAPH: split
// Claude into a small team, and make ONE agent whose only job is to ATTACK the
// others' work and try to break it. Work that fails gets thrown back down the
// graph and rebuilt again and again until it survives. What reaches you is not
// Claude's first answer, it is the version that already got torn apart and lived.
// House chassis per CLAUDE-REELS-PLAYBOOK.md: cream bg + <Panel> + karaoke
// captions + top ProgressBar rail. Panel-local 1012x792. NOT split-screen.
// Board: storyboards/69-chart.md (the continuity editor there wins over any card).
// ============================================================================

// ==== part: 01_foundation.tsx ====
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

// S5 inspection bay | S6 plates blacked | S7 winner + crusher | S8 hero takes the car | S9 drive off + CTA

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };


// ---- CHART additions to the house palette -----------------------------------
const NODEBLUE = "#3E6BA8";     // a working builder agent node.
const ADVRED = "#C4423A";       // THE ADVERSARY alone. Its light, its flags, its strikes.
const ADVDARK = "#5A1E1B";      // the adversary's deep shadow / its lane.
const PASSGREEN = "#3F9E74";    // survived-the-attack green. The reserved payoff colour.
const WIREGOLD = "#E7B24C";     // the work parcel travelling the graph; gold = value.
const CIRCUIT = "#141A24";      // deep circuit-board background.
const CIRCUIT2 = "#0C1017";     // its darkest wells.
const GLASSCYAN = "#7FC4D8";    // holographic UI edges (used sparingly, never a wash).
const INKSTEEL = "#1A2130";     // panel interior steel.
const BRASS = "#C9A227", BRASSLO = "#8A6A18";
const FAKE = "#C9BFAE";         // the chassis Mascot `suit` branch references this; nobody passes suit.

// scene starts (sec), from the first word onset of each beat in words_chart.json. 12 scenes.
// S0 hook 10% brain | S1 the 90% agent graph | S2 here's how to build one
// S3 split into a small team + a twist | S4 one agent isn't here to help
// S5 its only job is to attack | S6 it hunts every weak spot | S7 thrown back + rebuilt til it survives
// S8 not the first answer, the version that got torn apart and lived | S9 bulletproof, no double-check
// S10 build once, it stress-tests everything after | S11 CTA follow + comment CHART
const L = [0, 2.85, 6.71, 7.94, 11.21, 12.58, 14.94, 17.33, 21.61, 25.54, 26.73, 30.00];
const Lf = L.map(fr);
const CUT = 32.286;           // finished 1.04x VO length; durationInFrames = 969
const CTA_L = L[11];            // the rail reward unlocks here

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



const slateEdge = (size: number, rim: number) => ({
  filter: `drop-shadow(0 0 1.5px rgba(240,240,255,${(0.85 + rim * 0.15).toFixed(2)})) `
    + `drop-shadow(0 0 ${(size * 0.014).toFixed(1)}px rgba(180,200,255,${(0.4 + rim * 0.4).toFixed(2)})) `
    + `drop-shadow(0 2px 3px rgba(0,0,0,0.7))`,
});

// THE CHECKERED FLAG. A little chequered pennant on a stick. `wave` 0..1 drives the flap.

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
  <Sequence from={fr(at)} durationInFrames={fr(dur)}>
    <Audio src={staticFile(`sfx/${src}`)} volume={(f) => {
      const total = fr(dur);
      return v * Math.min(1, f / 2) * Math.min(1, Math.max(0, (total - 1 - f) / 6));
    }} />
  </Sequence>
);



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
  const giftWake = ramp(t, CTA_L - 1.2, CTA_L + 0.4);               // the flag lights up as the CTA lands
  const giftOpen = over(f, fr(CTA_L) + fr(0.2), fr(0.5), Easing.out(Easing.back(2)));
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
    const dangling = /^(i|a|an|the|to|of|and|you|is|it|in|on|for|so|but|that|his|he|my|we|with|at)$/i
      .test(w.word.trim().replace(/[^A-Za-z]/g, ""));
    // hold a dangling word over to the next line unless the pause or the
    // sentence ends here anyway, and never let a line run past 4 words.
    const wantBreak = cur.length >= 3 || gap > 0.34 || endsSent;
    const hardCap = dangling && !endsSent ? 5 : 4;
    if ((wantBreak && !(dangling && !endsSent && gap <= 0.34)) || cur.length >= hardCap) {
      out.push({ words: cur, start: cur[0].start, end: w.end }); cur = [];
    }
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

// ==== part: 02_world.tsx ====

// ============================================================================
// 69 CHART, THE WORLD KIT
// The whole vertical mountain dojo-forge (the Agent Graph made physical) plus
// every reusable character and prop, authored once. Scene bodies place a Cam,
// drive a few state props on ProvingGround, and stage characters on top. Nothing
// here is static: every export is a deterministic function of `lf`.
//
// House rules obeyed: over(f, start, dur) is FRAMES (wrap seconds in fr());
// ramp() is never called on a decreasing pair (plain lerp instead); randomness
// is seed(n) only; no Easing.poly(5) (Easing.poly(5)); zero em/en dashes; matte
// palette (glows are blurred ellipses / screen-blended, never coloured
// boxShadow halos); everything hard-edged and geometric.
// ============================================================================

// ---- world palette additions (unique names, nothing redeclared) ----
const GRIPC = "#8A5A44";        // the NOVICE cameo. Warm brown, never competes with hero clay or the master.
const TORIIRED = "#8A3327";     // matte structural oxblood for the torii (NOT the master's menace-red gel).
const STONE = "#2C333F", STONE2 = "#3A4251", STONELO = "#1A1F28"; // faceted cliff rock facets.
const ROPE = "#6E5A3A";         // the bridge rope rails.
const HEROHOT = "#E7A07A";      // the warm clay face the red master warms toward on the turn.

// a matte hex blend. Both inputs must be full 6 digit hex.
const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b);
  const k = Math.max(0, Math.min(1, t));
  const c = (x: number, y: number) => Math.round(x + (y - x) * k).toString(16).padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};

// a matte GLOW (a blurred, screen-blended ellipse). The only glow primitive used
// in this kit: no coloured boxShadow halos anywhere.
export const Glow: React.FC<{ x: number; y: number; r: number; hue: string; o?: number; blur?: number; z?: number; ry?: number }> =
  ({ x, y, r, hue, o = 0.5, blur = 12, z = 0, ry }) => (
    <div style={{ position: "absolute", left: x - r, top: y - (ry ?? r), width: r * 2, height: (ry ?? r) * 2, borderRadius: "50%", background: `radial-gradient(ellipse, ${hue}, transparent 68%)`, opacity: o, filter: `blur(${blur}px)`, mixBlendMode: "screen", zIndex: z, pointerEvents: "none" }} />
  );

// ============================================================================
// THE CAMERA. A 1012x792 panel-local viewport whose single child is scaled by z
// then translated by (-x,-y). A world point (wx,wy) lands on screen at
// ((wx-x)*z, (wy-y)*z), which is exactly what camFor inverts.
// ============================================================================
export const Cam: React.FC<{ x: number; y: number; z: number; children?: React.ReactNode }> = ({ x, y, z, children }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0", transform: `scale(${z}) translate(${-x}px, ${-y}px)` }}>
      {children}
    </div>
  </div>
);

const WORLD_W = 1012, WORLD_H = 2680;

// the site map: the graph node centres in WORLD coordinates, base forge at the
// bottom, torii at the summit, five carved pads on the cliff between them.
export const SITE = {
  torii: { x: 506, y: 360 },
  b3:    { x: 700, y: 660 },
  b2:    { x: 330, y: 720 },
  red:   { x: 858, y: 940 },   // the master's pad, mid cliff, off to the side, dark until S4.
  arena: { x: 506, y: 1120 },  // the sparring pad where the blade is tested.
  b1:    { x: 300, y: 1160 },
  b0:    { x: 712, y: 1240 },
  forge: { x: 506, y: 1960 },  // the base node.
};

// place a camera so world point (worldX, anchorY) sits at (centre, screenAnchor)
// of the 1012x792 viewport, at scale z.
export const camFor = (worldX: number, anchorY: number, z: number, screenAnchor = 0.46) => ({
  x: worldX - (1012 * 0.5) / z,
  y: anchorY - (792 * screenAnchor) / z,
  z,
});

// ---- on-screen size of the hero at size=170 for each preset (170 * z), kept
// readable (never a tiny doll) in every framing a character actually acts in:
//   FORGE 1.15 -> 196px | GRAPH_WIDE 0.50 -> 85px (hero is tiny continuity only,
//   the network is the subject) | TEAM_ROW 0.72 -> 122px | MASTER 1.30 -> 221px |
//   RING 0.92 -> 156px | SCAN 1.55 -> 264px | LOOP 0.66 -> 112px (two zone, both
//   forge and ring in frame) | TURN 1.20 -> 204px | BULLET 1.50 -> 255px |
//   GATE 0.95 -> 162px | CTA_WIDE 0.42 -> 71px (beauty pull back). ----
export const CAMS = {
  FORGE:      camFor(506, 1960, 1.15, 0.62),
  GRAPH_WIDE: camFor(506, 980, 0.50, 0.50),
  TEAM_ROW:   camFor(506, 1080, 0.72, 0.50),
  MASTER:     camFor(858, 940, 1.30, 0.46),
  RING:       camFor(506, 1120, 0.92, 0.52),
  SCAN:       camFor(506, 1120, 1.55, 0.50),
  LOOP:       camFor(506, 1540, 0.66, 0.50),
  TURN:       camFor(560, 1120, 1.20, 0.54),
  BULLET:     camFor(506, 1120, 1.50, 0.56),
  GATE:       camFor(506, 470, 0.95, 0.50),
  CTA_WIDE:   camFor(506, 1050, 0.42, 0.50),
};

export const lerpCam = (a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, t: number) => {
  const k = Math.max(0, Math.min(1, t));
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z: a.z + (b.z - a.z) * k };
};

// ============================================================================
// ATMOSPHERE HELPERS (all screen or world placeable, all live)
// ============================================================================

// straight geometric diagonal light streaks, NOT organic droplets.
export const RainStreaks: React.FC<{ lf: number; o?: number; n?: number; angle?: number; hue?: string; z?: number; w?: number; h?: number; speed?: number }> =
  ({ lf, o = 0.5, n = 42, angle = 16, hue = "rgba(190,210,240,0.5)", z = 78, w = 1012, h = 900, speed = 1 }) => (
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden", zIndex: z, pointerEvents: "none", transform: `rotate(${angle}deg)`, transformOrigin: "50% 50%" }}>
      {Array.from({ length: n }, (_, i) => {
        const s = seed(i * 2.7 + 1);
        const sp = (7 + s * 9) * speed;
        const y = ((lf * sp + s * h * 2) % (h + 220)) - 110;
        const x = (i / n) * w * 1.2 - w * 0.1 + s * 22;
        const len = 40 + s * 92;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 2, height: len, background: `linear-gradient(180deg, transparent, ${hue})`, opacity: o * (0.3 + s * 0.6) }} />;
      })}
    </div>
  );

// drifting ember / mote bokeh, rising warm.
export const Embers: React.FC<{ lf: number; o?: number; n?: number; hue?: string; z?: number; w?: number; h?: number; rise?: number }> =
  ({ lf, o = 1, n = 26, hue = "#E7A15A", z = 80, w = 1012, h = 792, rise = 1 }) => (
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden", zIndex: z, pointerEvents: "none" }}>
      {Array.from({ length: n }, (_, i) => {
        const s = seed(i * 3.1 + 2);
        const y = h - ((lf * (0.4 + s * 0.9) * rise + s * h) % (h + 60));
        const x = (i / n) * w + Math.sin(lf / (40 + s * 40) + i) * 26 + s * 20;
        const sz = 3 + s * 6;
        const tw = 0.4 + 0.6 * ((Math.sin(lf / 12 + i * 2) + 1) / 2);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, ${hue}, transparent 70%)`, opacity: o * tw * (0.3 + s * 0.5), filter: "blur(0.6px)" }} />;
      })}
    </div>
  );

// a perfect circle moon disc, far, cool, blurred.
export const MoonDisc: React.FC<{ lf: number; x?: number; y?: number; r?: number; glow?: number; z?: number }> =
  ({ lf, x = 840, y = 230, r = 92, glow = 1, z = 2 }) => (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, zIndex: z, pointerEvents: "none", filter: "blur(4px)" }}>
      <div style={{ position: "absolute", inset: -r * 0.5, borderRadius: "50%", background: `radial-gradient(circle, ${COOL}66, transparent 70%)`, opacity: glow * 0.5, mixBlendMode: "screen" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 40% 38%, #DDE9F2, ${mix("#9FB6C8", "#5A6E82", 0.4)})`, opacity: 0.22 * (0.9 + glow * 0.1) }} />
      <div style={{ position: "absolute", left: r * 0.7, top: r * 0.5, width: r * 0.28, height: r * 0.28, borderRadius: "50%", background: "rgba(80,100,120,0.3)" }} />
      <div style={{ position: "absolute", left: r * 1.15, top: r * 1.0, width: r * 0.18, height: r * 0.18, borderRadius: "50%", background: "rgba(80,100,120,0.3)" }} />
    </div>
  );

// far blurred pagoda roofs + a low poly mist ridgeline (the deep 22% brightness tier).
export const PagodaRidge: React.FC<{ lf: number; y?: number; o?: number; z?: number; hue?: string }> =
  ({ lf, y = 430, o = 0.22, z = 2, hue = "#26303F" }) => (
    <div style={{ position: "absolute", left: -40, top: y, width: 1092, height: 300, zIndex: z, pointerEvents: "none", filter: "blur(4px)", opacity: o }}>
      <svg viewBox="0 0 1092 300" width={1092} height={300} style={{ position: "absolute", left: 0, top: 0 }}>
        <polygon points="0,140 120,90 260,150 420,70 560,150 720,90 900,160 1092,110 1092,300 0,300" fill={hue} />
        <polygon points="0,200 200,150 380,210 600,150 820,210 1092,160 1092,300 0,300" fill={mix(hue, "#000000", 0.3)} opacity={0.8} />
      </svg>
      {[180, 560, 860].map((px, i) => (
        <div key={i} style={{ position: "absolute", left: px + Math.sin(lf / 200 + i) * 2, top: 40 + (i % 2) * 20 }}>
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ position: "absolute", left: -60 + r * 10, top: r * 22, width: 120 - r * 20, height: 18, clipPath: "polygon(0 100%, 50% 0, 100% 100%)", background: mix(hue, "#000000", 0.15) }} />
          ))}
        </div>
      ))}
    </div>
  );

// near black blurred parallax foreground: a hanging lantern, a banner, a railing.
export const ForeSilhouette: React.FC<{ lf: number; parallax?: number; o?: number; z?: number }> =
  ({ lf, parallax = 0, o = 1, z = 82 }) => {
    const px = Math.sin(lf / 120) * 10 * (1 + parallax);
    return (
      <div style={{ position: "absolute", left: -60 + px, top: 0, width: 1140, height: 792, zIndex: z, pointerEvents: "none", filter: "blur(2.5px)", opacity: o }}>
        <div style={{ position: "absolute", left: 24, top: -10, width: 96, height: 190 }}>
          <div style={{ position: "absolute", left: 44, top: 0, width: 6, height: 40, background: "#0A0C0F" }} />
          <div style={{ position: "absolute", left: 20, top: 40, width: 56, height: 24, clipPath: "polygon(0 100%,20% 0,80% 0,100% 100%)", background: "#0A0C0F" }} />
          <div style={{ position: "absolute", left: 26, top: 62, width: 44, height: 46, background: "#0A0C0F", borderRadius: 4 }} />
          <div style={{ position: "absolute", left: 34, top: 74, width: 26, height: 22, background: mix(NEONORANGE, "#000000", 0.2), opacity: 0.5 * flick(lf, 0.3), filter: "blur(2px)" }} />
          <div style={{ position: "absolute", left: 20, top: 106, width: 56, height: 18, clipPath: "polygon(0 0,100% 0,80% 100%,20% 100%)", background: "#0A0C0F" }} />
        </div>
        <div style={{ position: "absolute", right: 70, top: -20, width: 54, height: 360, background: "#0A0C0F", transform: `skewX(${Math.sin(lf / 40) * 2}deg)` }}>
          <div style={{ position: "absolute", left: 14, top: 40, width: 26, height: 220, background: "rgba(120,40,32,0.22)" }} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, height: 10, background: "#0A0C0F" }} />
        {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ position: "absolute", left: 20 + i * 80, bottom: 30, width: 12, height: 62, background: "#0A0C0F" }} />)}
      </div>
    );
  };

// a crisp reflection on wet faceted stone. Pass children to mirror them, or a hue
// for a plain wet sheen.
export const WetReflect: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; hue?: string; children?: React.ReactNode }> =
  ({ x, y, w = 120, h = 90, o = 0.5, hue, children }) => (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, overflow: "hidden", zIndex: 12, pointerEvents: "none", opacity: o, WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.85), transparent)", maskImage: "linear-gradient(180deg, rgba(0,0,0,0.85), transparent)" }}>
      {children
        ? <div style={{ transform: "scaleY(-1)", transformOrigin: "50% 0%", filter: "blur(1.5px)" }}>{children}</div>
        : <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${hue || COOL}, transparent 80%)`, filter: "blur(2px)", mixBlendMode: "screen" }} />}
    </div>
  );

// BANDED GRADIENT smoke shapes rising and skewing, never soft clouds.
export const Smoke: React.FC<{ lf: number; x: number; y: number; w?: number; h?: number; hue?: string; o?: number; bands?: number; z?: number }> =
  ({ lf, x, y, w = 120, h = 220, hue = "rgba(150,140,150,0.5)", o = 1, bands = 5, z = 21 }) => (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z, pointerEvents: "none", overflow: "visible" }}>
      {Array.from({ length: bands }, (_, k) => {
        const s = seed(k * 3.3 + 2);
        const t = ((lf * (0.4 + s * 0.5) + s * h) % h);
        const yy = h - t;
        const bw = w * (0.4 + (t / h) * 0.7);
        const skew = (s - 0.5) * 22 + Math.sin(lf / 30 + k) * 8;
        return <div key={k} style={{ position: "absolute", left: (w - bw) / 2 + Math.sin(lf / 26 + k * 1.7) * 12, top: yy, width: bw, height: 20 + s * 16, background: `linear-gradient(180deg, transparent, ${hue}, transparent)`, opacity: o * (1 - t / h) * (0.5 + s * 0.5), transform: `skewX(${skew}deg)`, filter: "blur(3px)", borderRadius: 3 }} />;
      })}
    </div>
  );

// ============================================================================
// GRAPH PRIMITIVES: pads, bridges, forge, torii
// ============================================================================

// one circular faceted stone TRAINING PAD carved into the cliff, lit from within.
export const NodePad: React.FC<{ lf: number; x: number; y: number; r?: number; lit?: number; hue?: string; children?: React.ReactNode }> =
  ({ lf, x, y, r = 118, lit = 1, hue = NODEBLUE, children }) => {
    const N = 12;
    const cx = r * 1.35, cy = r * 0.9, ry = r * 0.42, side = r * 0.34;
    const pts = Array.from({ length: N }, (_, k) => { const a = (k / N) * Math.PI * 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * ry]; });
    const fl = flick(lf, 0.10, x) * (0.4 + lit * 0.6);
    return (
      <div style={{ position: "absolute", left: x - cx, top: y - cy, width: r * 2.7, height: r * 2, zIndex: 20 }}>
        <div style={{ position: "absolute", left: cx - r * 1.1, top: cy + ry * 0.2, width: r * 2.2, height: r * 1.2, borderRadius: "50%", background: `radial-gradient(ellipse, ${hue}, transparent 66%)`, opacity: lit * 0.4 * fl, filter: "blur(14px)", mixBlendMode: "screen" }} />
        <svg viewBox={`0 0 ${r * 2.7} ${r * 2}`} width={r * 2.7} height={r * 2} shapeRendering="crispEdges" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {pts.map((p, k) => {
            const q = pts[(k + 1) % N];
            const front = p[1] > cy - ry * 0.15 || q[1] > cy - ry * 0.15;
            if (!front) return null;
            return <polygon key={"s" + k} points={`${p[0]},${p[1]} ${q[0]},${q[1]} ${q[0]},${q[1] + side} ${p[0]},${p[1] + side}`} fill={k % 2 ? STONELO : STONE} />;
          })}
          {pts.map((p, k) => {
            const q = pts[(k + 1) % N];
            return <polygon key={"t" + k} points={`${cx},${cy} ${p[0]},${p[1]} ${q[0]},${q[1]}`} fill={k % 2 ? STONE2 : STONE} stroke={STONELO} strokeWidth={1} />;
          })}
          <ellipse cx={cx} cy={cy} rx={r * 0.6} ry={ry * 0.6} fill={hue} opacity={lit * 0.5 * fl} />
          <ellipse cx={cx} cy={cy} rx={r} ry={ry} fill="none" stroke={hue} strokeWidth={3} opacity={0.35 + lit * 0.5 * fl} />
        </svg>
        {children && <div style={{ position: "absolute", left: cx, top: cy - 4, transform: "translate(-50%,-100%)", zIndex: 24 }}>{children}</div>}
      </div>
    );
  };

// one glowing rope and light BRIDGE (edge) with amber data pulses travelling it.
export const Bridge: React.FC<{ lf: number; x0: number; y0: number; x1: number; y1: number; active?: number; hue?: string; pulse?: number; reverse?: number }> =
  ({ lf, x0, y0, x1, y1, active = 1, hue = AMBER, pulse = 1, reverse = 0 }) => {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const planks = Math.max(3, Math.round(len / 40));
    const nP = Math.max(2, Math.round(len / 120));
    return (
      <div style={{ position: "absolute", left: x0, top: y0, width: len, height: 1, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, zIndex: 16 }}>
        <div style={{ position: "absolute", left: 0, top: -7, width: len, height: 3, background: ROPE, opacity: 0.55, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 0, top: 5, width: len, height: 3, background: ROPE, opacity: 0.55, borderRadius: 2 }} />
        {Array.from({ length: planks }, (_, k) => <div key={k} style={{ position: "absolute", left: k * (len / planks), top: -8, width: 3, height: 17, background: ROPE, opacity: 0.4 }} />)}
        <div style={{ position: "absolute", left: 0, top: -2, width: len, height: 5, background: `linear-gradient(90deg, ${hue}00, ${hue}, ${hue}00)`, opacity: 0.2 + active * 0.45 * flick(lf, 0.14, x0), borderRadius: 3, filter: "blur(1px)", mixBlendMode: "screen" }} />
        {active > 0.05 && Array.from({ length: nP }, (_, k) => {
          const base = ((lf * 0.012 * (0.7 + pulse) + k / nP) % 1);
          const t = reverse ? 1 - base : base;
          return <div key={"p" + k} style={{ position: "absolute", left: t * len - 6, top: -6, width: 12, height: 12, borderRadius: "50%", background: `radial-gradient(circle, ${hue}, ${hue}00 70%)`, opacity: active * (0.5 + 0.5 * Math.sin(base * Math.PI)), filter: "blur(1px)", mixBlendMode: "screen" }} />;
        })}
      </div>
    );
  };

// the base node: a stone KILN plus an ANVIL where the blade is forged and reforged.
export const Forge: React.FC<{ lf: number; hot?: number; blaze?: number }> = ({ lf, hot = 1, blaze = 0 }) => {
  const fire = hot * flick(lf, 0.2);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: 22 }}>
      <div style={{ position: "absolute", left: -300, top: -8, width: 600, height: 150, background: `linear-gradient(180deg, ${STONE2}, ${STONELO})`, transform: "perspective(600px) rotateX(52deg)", transformOrigin: "50% 0%", borderRadius: 8, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: -290, top: -250, width: 210, height: 250, background: `linear-gradient(120deg, ${STONE2} 0%, ${STONE} 55%, ${STONELO} 100%)`, borderRadius: "10px 10px 4px 4px", boxShadow: "inset 0 6px 0 rgba(255,255,255,0.05), inset 0 -30px 40px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: -290, top: -250, width: 210, height: 46, clipPath: "polygon(0 100%, 22% 0, 78% 0, 100% 100%)", background: STONE2, opacity: 0.9 }} />
      <Glow x={-185} y={-120} r={95} hue={NEONORANGE} o={0.35 + fire * 0.5} blur={20} ry={80} />
      <div style={{ position: "absolute", left: -240, top: -170, width: 110, height: 96, clipPath: "polygon(20% 0,80% 0,100% 60%,50% 100%,0 60%)", background: `radial-gradient(ellipse at 50% 60%, ${KEY}, ${NEONORANGE} 45%, #7A2E12 90%)`, opacity: 0.55 + fire * 0.45 }} />
      {Array.from({ length: 5 }, (_, k) => { const h = 30 + seed(k) * 40 + Math.sin(lf / 6 + k) * 14 * fire; return <div key={k} style={{ position: "absolute", left: -224 + k * 20, top: -128 - h, width: 16, height: h, clipPath: "polygon(50% 0,100% 100%,0 100%)", background: `linear-gradient(180deg, ${k % 2 ? KEY : NEONORANGE}, ${NEONORANGE}00)`, opacity: 0.4 + fire * 0.5, filter: "blur(1px)" }} />; })}
      <Smoke lf={lf} x={-185} y={-250} w={120} h={230} hue="rgba(120,110,120,0.5)" o={0.5 * hot} bands={5} />
      <div style={{ position: "absolute", left: -70, top: -70, width: 150, height: 34, background: "linear-gradient(180deg, #4A515C, #262B33)", clipPath: "polygon(6% 0, 94% 0, 100% 62%, 74% 62%, 66% 100%, 34% 100%, 26% 62%, 0 62%)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.12)" }} />
      <div style={{ position: "absolute", left: 74, top: -70, width: 54, height: 20, clipPath: "polygon(0 0, 100% 40%, 100% 70%, 0 100%)", background: "linear-gradient(180deg, #464D57, #232830)" }} />
      <div style={{ position: "absolute", left: -44, top: -40, width: 96, height: 40, background: "linear-gradient(180deg, #333943, #1A1E25)", clipPath: "polygon(14% 0,86% 0,72% 100%,28% 100%)" }} />
      <Glow x={0} y={-64} r={70} hue={NEONORANGE} o={0.3 + fire * 0.4 + blaze * 0.4} blur={16} ry={26} />
      <Sparks lf={lf} x={-4} y={-66} on={blaze} color={NEONORANGE} n={14} z={40} />
      <Sparks lf={lf} x={-4} y={-66} on={blaze} color={KEY} n={8} z={41} />
    </div>
  );
};

// the summit node: a geometric TORII GATE crowned by a medallion reward seal. The
// seal stays dark (locked) until sealUnlocked, then wakes gold (S8 onward only).
export const Torii: React.FC<{ lf: number; lit?: number; sealUnlocked?: number }> = ({ lf, lit = 1, sealUnlocked = 0 }) => {
  const seal = Math.max(0, Math.min(1, sealUnlocked));
  const medHue = mix("#5A5048", GOLD, seal);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: 22 }}>
      {[-150, 150].map((px, i) => (
        <div key={i} style={{ position: "absolute", left: px - 22, top: -300, width: 44, height: 300, background: `linear-gradient(90deg, ${mix(TORIIRED, "#3A130E", 0.2)}, ${TORIIRED} 40%, ${mix(TORIIRED, "#000000", 0.35)})`, boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)" }} />
      ))}
      <div style={{ position: "absolute", left: -186, top: -232, width: 372, height: 30, background: mix(TORIIRED, "#000000", 0.15) }} />
      <div style={{ position: "absolute", left: -210, top: -300, width: 420, height: 40, clipPath: "polygon(4% 100%, 0 40%, 8% 0, 92% 0, 100% 40%, 96% 100%)", background: `linear-gradient(180deg, ${mix(TORIIRED, "#C05038", 0.25)}, ${TORIIRED})` }} />
      <div style={{ position: "absolute", left: -186, top: -262, width: 372, height: 16, background: mix(TORIIRED, "#000000", 0.3) }} />
      <Glow x={0} y={-150} r={210} hue={COOL} o={lit * 0.16} blur={40} ry={200} />
      <div style={{ position: "absolute", left: -52, top: -212, width: 104, height: 104, zIndex: 24 }}>
        {seal > 0.05 && <Glow x={52} y={52} r={90} hue={GOLD} o={seal * 0.6 * flick(lf, 0.1)} blur={22} />}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, ${mix("#7A6E5A", GOLD, seal)}, ${mix("#2A241C", BRASSLO, seal)})`, border: `4px solid ${medHue}`, filter: seal < 0.1 ? "grayscale(0.6) brightness(0.7)" : "none" }} />
        <div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: `3px solid ${medHue}`, opacity: 0.8 }} />
        <div style={{ position: "absolute", inset: 30, borderRadius: "50%", background: mix("#3A3228", GOLD, seal), opacity: 0.7 }} />
        {seal > 0.4 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, color: "#3a2a05", fontWeight: 900, transform: `scale(${0.4 + seal * 0.6})` }}>{"✓"}</div>}
      </div>
    </div>
  );
};

// ============================================================================
// CAST: the builder senseis, the hero forge master, the red master, the novice
// ============================================================================

// one BUILDER agent: canonical Mascot tint HERO with a hand drawn headband and an
// identical hammer, doing the identical forge and hammer job. accent is warm
// family, for depth legibility only, and NEVER role codes the four.
export const Sensei: React.FC<{ lf: number; x: number; y: number; size?: number; accent?: string; hammer?: number; forging?: number }> =
  ({ lf, x, y, size = 170, accent = "#C56B45", hammer = 1, forging = 0 }) => {
    const swing = forging > 0 ? Math.sin(lf / 5) : Math.sin(lf / 22) * 0.3;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -100%)", zIndex: 46 }}>
        <CastShadow x={size / 2} y={size - 6} w={size * 0.62} o={0.42} />
        <div style={{ position: "relative", ...slateEdge(size, 0.3) }}>
          <Mascot lf={lf} size={size} tint={HERO} gaze={Math.round(Math.sin(lf / 40) * 2)} nodAmp={2.4} nodSpeed={9} />
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} shapeRendering="crispEdges">
            <rect x={30} y={54} width={140} height={16} fill={accent} />
            <rect x={30} y={54} width={140} height={5} fill="rgba(255,255,255,0.25)" />
            <rect x={158} y={62} width={26} height={7} fill={accent} transform={`rotate(${18 + swing * 8} 158 65)`} />
            <rect x={158} y={72} width={22} height={7} fill={accent} transform={`rotate(${30 + swing * 8} 158 75)`} />
            <rect x={58} y={110} width={84} height={54} fill="#6E4A34" />
            <rect x={58} y={110} width={84} height={5} fill="#8A5E42" />
            <rect x={92} y={120} width={16} height={30} fill="#573823" />
          </svg>
          {hammer > 0 && (
            <div style={{ position: "absolute", left: size * 0.86, top: size * 0.30, transformOrigin: "10% 90%", transform: `rotate(${-40 + swing * 55}deg)`, zIndex: 48 }}>
              <div style={{ position: "absolute", width: 10, height: size * 0.34, background: "#7A5A38", borderRadius: 3 }} />
              <div style={{ position: "absolute", left: -14, top: -6, width: 40, height: 24, background: "linear-gradient(180deg, #6B7280, #2A2E36)", borderRadius: 4, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)" }} />
            </div>
          )}
        </div>
      </div>
    );
  };

// YOU, the hero FORGE MASTER: canonical Mascot, hard hat plus safety glasses, a
// scorched apron, a hammer, eyes always visible. Never fights the master.
export const ForgeMaster: React.FC<{ lf: number; x: number; y: number; size?: number; hammer?: number; forging?: number; flinch?: number; proud?: number; gaze?: number }> =
  ({ lf, x, y, size = 170, hammer = 1, forging = 0, flinch = 0, proud = 0, gaze = 0 }) => {
    const swing = forging > 0 ? Math.sin(lf / 5) : 0;
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-100%)", zIndex: 47 }}>
        <CastShadow x={size / 2} y={size - 6} w={size * 0.66} o={0.44} />
        <div style={{ position: "relative", ...slateEdge(size, 0.28) }}>
          <Mascot lf={lf} size={size} tint={HERO} hardHat={1} glasses={1} gaze={gaze} shock={flinch} cheer={proud} nodAmp={2.6} nodSpeed={9} />
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} shapeRendering="crispEdges">
            <rect x={54} y={108} width={92} height={58} fill="#5E3E2C" />
            <rect x={54} y={108} width={92} height={5} fill="#7A5238" />
            <rect x={92} y={118} width={16} height={34} fill="#472C1C" />
            <rect x={70} y={150} width={60} height={8} fill="#3A2416" />
          </svg>
          {hammer > 0 && (
            <div style={{ position: "absolute", left: size * 0.84, top: size * 0.28, transformOrigin: "10% 90%", transform: `rotate(${-38 + swing * 54}deg)`, zIndex: 48 }}>
              <div style={{ position: "absolute", width: 11, height: size * 0.36, background: "#7A5A38", borderRadius: 3 }} />
              <div style={{ position: "absolute", left: -15, top: -6, width: 44, height: 26, background: "linear-gradient(180deg, #6B7280, #2A2E36)", borderRadius: 4 }} />
            </div>
          )}
        </div>
      </div>
    );
  };

// THE ADVERSARY. Canonical Mascot silhouette, crimson slateEdge, wrapShades plus a
// hand drawn ONI MASK (two triangular horns, flat slash mouth, opaque eye band).
// Its eyes are NEVER visible until maskLift. Never pass `suit`. Never destroyed.
export const RedMaster: React.FC<{ lf: number; x: number; y: number; size?: number; glint?: number; strike?: number; scan?: number; maskLift?: number; gold?: number; bow?: number; staffAngle?: number }> =
  ({ lf, x, y, size = 170, glint = 0, strike = 0, scan = 0, maskLift = 0, gold = 0, bow = 0, staffAngle = -18 }) => {
    const g = Math.max(0, Math.min(1, gold));
    const ml = Math.max(0, Math.min(1, maskLift));
    const bodyTint = mix(ADVRED, HEROHOT, ml * 0.5 + g * 0.25);
    const rim = g > 0.05 ? mix("#8A2018", GOLD, g) : ADVRED;
    const crouch = scan * 10;
    const strikeLean = strike ? Math.sin(Math.min(1, strike) * Math.PI) : 0;
    const bowRot = bow * 22;
    const eyesHidden = ml < 0.15 ? 1 : 0;
    return (
      <div style={{ position: "absolute", left: x, top: y + crouch, transform: `translate(-50%,-100%)`, transformOrigin: "50% 100%", zIndex: 50 }}>
        <CastShadow x={size / 2} y={size - 6} w={size * 0.7} o={0.5} />
        <Glow x={size / 2} y={size * 0.62} r={size * 0.72} hue={rim} o={0.28 + glint * 0.3} blur={26} ry={size * 0.5} />
        <div style={{ position: "relative", transform: `rotate(${bowRot}deg) skewX(${strikeLean * -6}deg)`, transformOrigin: "50% 100%", ...slateEdge(size, g > 0.05 ? 0.2 : 0.7) }}>
          <div style={{ filter: `drop-shadow(0 0 ${(size * 0.02).toFixed(1)}px ${rim}${g > 0.05 ? "" : "AA"})` }}>
            <Mascot lf={lf} size={size} tint={bodyTint} wrapShades={eyesHidden} gaze={0} nodAmp={1.6} nodSpeed={12} stern={0.5} />
          </div>
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} shapeRendering="crispEdges">
            <path d="M28 44 L100 20 L172 44 L164 70 L36 70 Z" fill={mix(ADVDARK, bodyTint, 0.3)} />
            <rect x={34} y={100} width={132} height={64} fill={mix(ADVDARK, bodyTint, 0.35)} />
            <polygon points="70,100 100,150 130,100" fill={mix(ADVDARK, "#000000", 0.2)} />
            <rect x={34} y={100} width={132} height={6} fill="rgba(255,255,255,0.08)" />
            <circle cx={100} cy={126} r={22} fill="none" stroke={g > 0.05 ? GOLD : mix(ADVRED, "#FFFFFF", 0.2)} strokeWidth={4} />
            <circle cx={100} cy={126} r={13} fill="none" stroke={g > 0.05 ? GOLD : mix(ADVRED, "#FFFFFF", 0.1)} strokeWidth={4} />
            <circle cx={100} cy={126} r={4} fill={g > 0.05 ? GOLD : ADVRED} />
          </svg>
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: -ml * size * 0.62, opacity: 1 - ml, overflow: "visible", transformOrigin: "50% 20%", transform: `rotate(${-ml * 12}deg)` }} shapeRendering="crispEdges">
            <path d="M40 52 L160 52 L150 104 L100 118 L50 104 Z" fill={mix(ADVRED, "#5A1512", 0.15)} />
            <path d="M40 52 L160 52 L156 66 L44 66 Z" fill={mix(ADVRED, "#FFFFFF", 0.12)} />
            <polygon points="52,52 40,14 70,46" fill={mix(ADVDARK, "#2A0A08", 0.4)} />
            <polygon points="148,52 160,14 130,46" fill={mix(ADVDARK, "#2A0A08", 0.4)} />
            <rect x={44} y={70} width={112} height={22} fill="#0B0605" />
            <polygon points="60,84 88,76 88,84 60,88" fill={mix(ADVRED, "#FF6A4E", glint)} opacity={0.7 + glint * 0.3} />
            <polygon points="140,84 112,76 112,84 140,88" fill={mix(ADVRED, "#FF6A4E", glint)} opacity={0.7 + glint * 0.3} />
            <rect x={72} y={104} width={56} height={7} fill="#0B0605" transform="rotate(-2 100 107)" />
            <rect x={72} y={104} width={56} height={2} fill={mix(ADVRED, "#FF6A4E", glint * 0.6)} opacity={0.5} />
          </svg>
          {glint > 0.02 && ml < 0.2 && <div style={{ position: "absolute", left: size * 0.2, top: size * 0.34, width: size * 0.6, height: 5, background: "linear-gradient(90deg, transparent, #FFEAD0, transparent)", opacity: glint, transform: `translateX(${(glint - 0.5) * size * 0.5}px) rotate(-8deg)`, filter: "blur(1px)", mixBlendMode: "screen" }} />}
          <div style={{ position: "absolute", left: size * 0.5, top: size * 0.1, transformOrigin: "50% 50%", transform: `rotate(${staffAngle + strikeLean * 70}deg)`, zIndex: 52 }}>
            <div style={{ position: "absolute", left: -6, top: -size * 0.55, width: 12, height: size * 1.1, background: "linear-gradient(180deg, #C9A05A, #7A5A2E)", borderRadius: 4 }} />
            {Array.from({ length: 6 }, (_, k) => <div key={k} style={{ position: "absolute", left: -6, top: -size * 0.5 + k * size * 0.18, width: 12, height: 5, background: "#3A2A12" }} />)}
            <div style={{ position: "absolute", left: -8, top: -size * 0.58, width: 16, height: 16, background: "#5A4020", borderRadius: 2 }} />
          </div>
        </div>
      </div>
    );
  };

// THE NOVICE cameo, the viewer stand in. Knee high, white belt band, warm brown,
// eyes visible. Flinches at the attacks, hides its eyes, leaps up at the survive.
export const Novice: React.FC<{ lf: number; x: number; y: number; flinch?: number; hideEyes?: number; cheer?: number; size?: number }> =
  ({ lf, x, y, flinch = 0, hideEyes = 0, cheer = 0, size = 78 }) => {
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-100%)", zIndex: 45 }}>
        <CastShadow x={size / 2} y={size - 4} w={size * 0.6} o={0.4} />
        <div style={{ position: "relative" }}>
          <Mascot lf={lf} size={size} tint={GRIPC} shock={Math.max(flinch, hideEyes)} cheer={cheer} nodAmp={2} nodSpeed={7} gaze={0} />
          <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} shapeRendering="crispEdges">
            <rect x={34} y={118} width={132} height={16} fill="#EDE7DB" />
            <rect x={150} y={126} width={22} height={8} fill="#EDE7DB" transform="rotate(20 150 130)" />
          </svg>
          {hideEyes > 0.3 && (
            <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              <rect x={60} y={66} width={30} height={22} rx={6} fill={GRIPC} />
              <rect x={110} y={66} width={30} height={22} rx={6} fill={GRIPC} />
            </svg>
          )}
        </div>
      </div>
    );
  };

// ============================================================================
// THE JOB: the forged BLADE, and the master's HUNT tools
// ============================================================================

// THE BLADE, the work. An object, no eyes. temper 0..4 keys its crafted state
// (raw ingot, rough blade, blue steel, master steel, sealed with gold). crack
// lights jagged red flaws and dims and reddens the steel. ring pulses a bell
// shimmer when whole. Gold appears only at temper 4 (kept out of S0..S7).
export const Blade: React.FC<{ lf: number; x: number; y: number; temper?: number; build?: number; crack?: number; ring?: number; glow?: number; reflect?: number; rot?: number; s?: number }> =
  ({ lf, x, y, temper = 1, build = 1, crack = 0, ring = 0, glow = 1, reflect = 0, rot = 0, s = 1 }) => {
    const bodyByT = ["#FFB86B", "#3B424C", "#7E97B0", "#AAC6E0", "#BFD6E8"];
    const edgeByT = ["#FFE6B0", "#9A7A50", "#BFE0FF", "#DCEEFF", "#FFE9A8"];
    const ti = Math.max(0, Math.min(4, Math.round(temper)));
    const body = bodyByT[ti], edge = edgeByT[ti];
    const hot = ti === 0 ? 1 : (ti === 1 ? 0.3 : 0);
    const cracked = Math.min(1, crack / 3);
    const bl = 250 * s;
    const bladeH = bl * (0.35 + Math.max(0, Math.min(1, build)) * 0.65);
    const glowHue = ti <= 1 ? NEONORANGE : (ti === 4 ? GOLD : AZURE);
    const underHue = cracked > 0.05 ? mix(glowHue, ADVRED, cracked) : glowHue;
    const dim = 1 - cracked * 0.35;
    const cN = Math.min(3, Math.max(0, Math.round(crack)));
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-100%) rotate(${rot}deg)`, transformOrigin: "50% 100%", zIndex: 44 }}>
        <Glow x={0} y={-6} r={70 * s} hue={underHue} o={(0.3 + glow * 0.4) * dim + hot * 0.4} blur={16} ry={26 * s} />
        {ring > 0.02 && cN === 0 && <div style={{ position: "absolute", left: -60 * s, top: -bladeH * 0.6, width: 120 * s, height: 120 * s, borderRadius: "50%", border: `2px solid ${edge}`, opacity: (1 - ring) * 0.6, transform: `scale(${0.5 + ring * 1.6})`, filter: "blur(1px)", mixBlendMode: "screen" }} />}
        <svg viewBox="0 0 120 300" width={120 * s} height={300 * s} style={{ position: "absolute", left: -60 * s, top: -(bladeH + 50 * s), overflow: "visible" }} shapeRendering="geometricPrecision">
          <rect x={53} y={250} width={14} height={40} fill="#5A4228" />
          <rect x={50} y={288} width={20} height={12} rx={3} fill="#3A2A18" />
          <rect x={38} y={244} width={44} height={12} rx={3} fill="#2A2E36" />
          <polygon points={`60,${250 - bladeH} 74,${252 - bladeH * 0.1} 74,246 46,246 46,${252 - bladeH * 0.1}`} fill={body} opacity={dim} />
          <polygon points={`60,${250 - bladeH} 60,246 46,246 46,${252 - bladeH * 0.1}`} fill={mix(body, "#000000", 0.28)} opacity={dim} />
          <polygon points={`60,${250 - bladeH} 60,246 74,246 74,${252 - bladeH * 0.1}`} fill={mix(body, "#FFFFFF", 0.22)} opacity={dim} />
          <rect x={59} y={250 - bladeH + 8} width={2} height={Math.max(0, bladeH - 16)} fill={mix(body, "#000000", 0.4)} opacity={0.6} />
          <polygon points={`74,${252 - bladeH * 0.1} 74,246 71,246 71,${252 - bladeH * 0.1}`} fill={edge} opacity={0.5 + (1 - cracked) * 0.4} />
          {hot > 0 && <polygon points={`60,${250 - bladeH} 74,${252 - bladeH * 0.1} 74,246 46,246 46,${252 - bladeH * 0.1}`} fill={KEY} opacity={hot * 0.5 * (0.7 + flick(lf, 0.3) * 0.3)} />}
          {ti >= 2 && ti < 4 && [0.42, 0.66].map((p, k) => (
            <polyline key={"g" + k} points={`54,${250 - bladeH * p} 60,${250 - bladeH * p - 8} 66,${250 - bladeH * p}`} fill="none" stroke={PASSGREEN} strokeWidth={3} opacity={0.7} />
          ))}
          {Array.from({ length: cN }, (_, k) => {
            const cy0 = 250 - bladeH * (0.3 + k * 0.24);
            return <polyline key={"c" + k} points={`52,${cy0} 62,${cy0 - 14} 56,${cy0 - 20} 66,${cy0 - 38}`} fill="none" stroke={mix(HOTRED, ADVRED, 0.2)} strokeWidth={3} opacity={0.85} />;
          })}
          {ti === 4 && <>
            <polygon points="60,250 70,258 60,266 50,258" fill={GOLD} />
            <rect x={57} y={250 - bladeH + 20} width={6} height={6} fill={GOLD} transform="rotate(45 60 253)" />
          </>}
        </svg>
        {reflect > 0.02 && <WetReflect x={0} y={4} w={90 * s} h={70 * s} o={reflect} hue={underHue} />}
      </div>
    );
  };

// the master's RED HUNTING SCANNER: a Terminator red targeting frame with a
// sweeping scan line and lock on brackets that snap onto found flaws.
export const ScanReticle: React.FC<{ lf: number; x: number; y: number; w?: number; h?: number; locks?: { x: number; y: number; on: number }[] }> =
  ({ lf, x, y, w = 220, h = 320, locks = [] }) => {
    const scanY = ((lf * 0.03) % 1) * h;
    return (
      <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: 54, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, ${ADVRED}22 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, ${ADVRED}22 0 1px, transparent 1px 22px)`, opacity: 0.5, mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: 4, background: ADVRED }} /><div style={{ position: "absolute", left: 0, top: 0, width: 4, height: 26, background: ADVRED }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 26, height: 4, background: ADVRED }} /><div style={{ position: "absolute", right: 0, top: 0, width: 4, height: 26, background: ADVRED }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 26, height: 4, background: ADVRED }} /><div style={{ position: "absolute", left: 0, bottom: 0, width: 4, height: 26, background: ADVRED }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 26, height: 4, background: ADVRED }} /><div style={{ position: "absolute", right: 0, bottom: 0, width: 4, height: 26, background: ADVRED }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: scanY, height: 3, background: `linear-gradient(90deg, transparent, ${HOTRED}, transparent)`, mixBlendMode: "screen" }} />
        <Glow x={w / 2} y={scanY} r={w * 0.6} hue={ADVRED} o={0.25} blur={12} ry={20} />
        {locks.map((l, i) => l.on > 0.02 && (
          <div key={i} style={{ position: "absolute", left: l.x - 22, top: l.y - 22, width: 44, height: 44, opacity: l.on, transform: `scale(${1.6 - l.on * 0.6}) rotate(${(1 - l.on) * 40}deg)` }}>
            <div style={{ position: "absolute", inset: 0, border: `3px solid ${HOTRED}` }} />
            <div style={{ position: "absolute", left: 18, top: -8, width: 8, height: 60, background: ADVRED, opacity: 0.3 }} />
          </div>
        ))}
      </div>
    );
  };

// a found weak spot marker (crack / hole / loose rivet shortcut) that stamps in.
export const FlawTag: React.FC<{ lf: number; x: number; y: number; kind?: string; on?: number }> =
  ({ lf, x, y, kind = "crack", on = 1 }) => {
    const label = kind === "hole" ? "HOLE" : (kind === "rivet" || kind === "shortcut") ? "SHORTCUT" : "WEAK SPOT";
    const k = Math.max(0, Math.min(1, on));
    const sc = interpolate(k, [0, 0.6, 1], [0.2, 1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${sc})`, opacity: Math.min(1, k * 2), zIndex: 56, pointerEvents: "none" }}>
        <Glow x={0} y={0} r={44} hue={ADVRED} o={0.4} blur={12} />
        <div style={{ position: "absolute", left: -30, top: -30, width: 60, height: 60, border: `3px solid ${HOTRED}` }} />
        <div style={{ position: "absolute", left: 34, top: -18, padding: "4px 12px", background: "rgba(30,8,8,0.85)", border: `2px solid ${HOTRED}`, borderRadius: 6, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#FFE1DA", whiteSpace: "nowrap", transform: `translateX(${(1 - k) * -20}px)` }}>{label}</div>
      </div>
    );
  };

// ============================================================================
// STATUS READOUTS
// ============================================================================

// a small diegetic corner status readout: a tiny node and edge minimap of the
// graph. Geometric, never a terminal or app mockup.
export const HUD: React.FC<{ lf: number; x?: number; y?: number; label?: string; nodes?: number; active?: number; hue?: string; danger?: number }> =
  ({ lf, x = 40, y = 220, label = "GRAPH", nodes = 5, active = 4, hue = GLASSCYAN, danger = 0 }) => {
    const col = danger > 0.5 ? HOTRED : hue;
    return (
      <div style={{ position: "absolute", left: x, top: y, zIndex: 100, fontFamily: mono }}>
        <div style={{ position: "relative", padding: "8px 12px", background: "rgba(10,14,22,0.6)", border: `1.5px solid ${col}66`, borderRadius: 8 }}>
          <div style={{ fontSize: 15, letterSpacing: "0.14em", color: col, opacity: 0.9, marginBottom: 6 }}>{label}</div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            {Array.from({ length: nodes }, (_, i) => {
              const on = i < active;
              const isRed = i === nodes - 1 && danger > 0.3;
              const c = isRed ? HOTRED : on ? col : "#39424E";
              return <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: (on || isRed) ? c : "transparent", border: `2px solid ${c}`, opacity: (on || isRed) ? (0.6 + 0.4 * flick(lf, 0.2, i)) : 0.5 }} />;
            })}
          </div>
        </div>
      </div>
    );
  };

// a per scene progress bar: races to 100 percent then snaps a green check just
// before the cut. Used only on the counter less scenes (S2, S9).
export const StatusZip: React.FC<{ lf: number; x?: number; y?: number; w?: number; start?: number; dur?: number; hue?: string; label?: string }> =
  ({ lf, x = 320, y = 720, w = 372, start = 0, dur = 14, hue = GLASSCYAN, label = "" }) => {
    const p = over(lf, start, dur, Easing.out(Easing.cubic));
    const checkPop = p > 0.985 ? interpolate(lf, [start + dur, start + dur + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2.4)) }) : 0;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: w, height: 26, zIndex: 96 }}>
        {label && <div style={{ position: "absolute", left: 2, top: -22, fontFamily: mono, fontSize: 15, letterSpacing: "0.12em", color: `${hue}CC` }}>{label}</div>}
        <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgba(20,28,40,0.7)", border: `1.5px solid ${hue}55` }} />
        <div style={{ position: "absolute", left: 3, top: 3, height: 20, width: `${p * (w - 6)}px`, borderRadius: 999, background: `linear-gradient(90deg, ${mix(hue, "#FFFFFF", 0.2)}, ${hue})` }} />
        <div style={{ position: "absolute", right: -30, top: -3, width: 30, height: 30, borderRadius: "50%", background: PASSGREEN, opacity: checkPop, transform: `scale(${checkPop})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20 }}>{checkPop > 0.3 ? "✓" : ""}</div>
      </div>
    );
  };

// ============================================================================
// THE PROVING GROUND: the whole vertical mountain dojo forge authored once as one
// tall world group. Far tier (moon, ridge, dark cliff), the wired graph (bridges
// under pads), the forge base, five carved pads, the summit torii, then whatever
// the scene stages (children), then the live foreground and atmosphere.
// ============================================================================
export const ProvingGround: React.FC<{
  lf: number;
  padLit?: number[];
  redPadLit?: number;
  bridgeActive?: number;
  forgeHot?: number;
  blaze?: number;
  gateLit?: number;
  sealUnlocked?: number;
  moonGlow?: number;
  rain?: number;
  embers?: number;
  masterGold?: number;
  warm?: number;
  children?: React.ReactNode;
  fore?: number;
}> = ({ lf, padLit = [1, 1, 1, 1], redPadLit = 0, bridgeActive = 1, forgeHot = 1, blaze = 0, gateLit = 1, sealUnlocked = 0, moonGlow = 1, rain = 1, embers = 1, masterGold = 0, warm = 0, fore = 1, children }) => {
  const redHue = mix(ADVRED, GOLD, Math.max(0, Math.min(1, masterGold)));
  const rl = Math.max(0, Math.min(1, redPadLit));
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: WORLD_W, height: WORLD_H }}>
      {/* deep cliff backdrop, cold, warms from below on `warm` */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${mix(CIRCUIT2, "#141C26", 0.4)} 0%, ${CIRCUIT} 30%, ${mix(CIRCUIT, "#241812", warm * 0.5)} 78%, ${mix("#241611", "#3A1E10", warm)} 100%)` }} />
      {/* far tier */}
      <MoonDisc lf={lf} x={840} y={230} r={92} glow={moonGlow} z={2} />
      <PagodaRidge lf={lf} y={430} o={0.22} z={2} />
      <PagodaRidge lf={lf} y={900} o={0.16} z={2} hue="#20293A" />
      {/* the faceted cliff mass behind the pads, geometric low poly planes */}
      {Array.from({ length: 12 }, (_, i) => { const s = seed(i * 4.2 + 7); const cw = 200 + s * 260; const cx = (i % 3) * 360 - 60 + s * 80; const cy = 300 + i * 180 + s * 60; return <div key={i} style={{ position: "absolute", left: cx, top: cy, width: cw, height: 240 + s * 160, clipPath: `polygon(${10 + s * 20}% 0, 100% ${20 + s * 20}%, ${80 - s * 20}% 100%, 0 ${70 - s * 30}%)`, background: mix(STONELO, STONE, s * 0.5), opacity: 0.5, filter: "blur(1px)" }} />; })}
      {/* faint lantern dots teasing many more pads up the dark cliff */}
      {Array.from({ length: 16 }, (_, i) => { const s = seed(i * 2.9 + 5); return <div key={i} style={{ position: "absolute", left: 80 + s * 860, top: 380 + i * 130 + s * 40, width: 8, height: 8, borderRadius: "50%", background: mix(NEONORANGE, "#000000", 0.2), opacity: (0.2 + 0.3 * bridgeActive) * flick(lf, 0.4, i) }} />; })}

      {/* BRIDGES (edges), drawn under the pads */}
      <Bridge lf={lf} x0={SITE.forge.x - 40} y0={SITE.forge.y - 120} x1={SITE.b0.x} y1={SITE.b0.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.forge.x + 40} y0={SITE.forge.y - 120} x1={SITE.b1.x} y1={SITE.b1.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.b0.x} y0={SITE.b0.y} x1={SITE.arena.x} y1={SITE.arena.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.b1.x} y0={SITE.b1.y} x1={SITE.arena.x} y1={SITE.arena.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.arena.x} y0={SITE.arena.y} x1={SITE.b2.x} y1={SITE.b2.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.arena.x} y0={SITE.arena.y} x1={SITE.b3.x} y1={SITE.b3.y} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.b2.x} y0={SITE.b2.y} x1={SITE.torii.x - 60} y1={SITE.torii.y + 40} active={bridgeActive} />
      <Bridge lf={lf} x0={SITE.b3.x} y0={SITE.b3.y} x1={SITE.torii.x + 60} y1={SITE.torii.y + 40} active={bridgeActive} />
      {/* the crimson master edge, wired into your graph from the start, dark until asked to light */}
      <Bridge lf={lf} x0={SITE.arena.x} y0={SITE.arena.y} x1={SITE.red.x} y1={SITE.red.y} active={Math.max(0.12, rl)} hue={redHue} pulse={rl} />

      {/* FORGE base node */}
      <div style={{ position: "absolute", left: SITE.forge.x, top: SITE.forge.y }}><Forge lf={lf} hot={forgeHot} blaze={blaze} /></div>
      {/* builder NODE-PADS */}
      <NodePad lf={lf} x={SITE.b0.x} y={SITE.b0.y} lit={padLit[0]} hue={NODEBLUE} />
      <NodePad lf={lf} x={SITE.b1.x} y={SITE.b1.y} lit={padLit[1]} hue={NODEBLUE} />
      <NodePad lf={lf} x={SITE.b2.x} y={SITE.b2.y} lit={padLit[2]} hue={NODEBLUE} />
      <NodePad lf={lf} x={SITE.b3.x} y={SITE.b3.y} lit={padLit[3]} hue={NODEBLUE} />
      {/* the sparring ARENA pad, larger, tints toward red when the master is lit */}
      <NodePad lf={lf} x={SITE.arena.x} y={SITE.arena.y} r={150} lit={0.7 + warm * 0.3} hue={mix(NODEBLUE, redHue, rl)} />
      {/* the RED MASTER pad, crimson, dark until redPadLit */}
      <NodePad lf={lf} x={SITE.red.x} y={SITE.red.y} lit={rl} hue={redHue} />
      {/* TORII summit node */}
      <div style={{ position: "absolute", left: SITE.torii.x, top: SITE.torii.y }}><Torii lf={lf} lit={gateLit} sealUnlocked={sealUnlocked} /></div>

      {/* whatever the scene stages: characters, blade, reticles */}
      {children}

      {/* FORE tier scattered down the cliff so wide framings catch near black
          parallax dressing (blurred lanterns and banners). Gated by `fore`: close
          shots (MASTER/SCAN/BULLET) pass fore=0 so a pole never lands over a
          subject. The tall banner is kept OFF the pad columns (x 60 and 1024, the
          frame edges) with a warm lantern head so it reads as dressing, not a bar. */}
      {fore > 0.02 && [340, 760, 1180, 1560, 1980, 2360].map((fy, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: i % 2 ? 24 : 936, top: fy + Math.sin(lf / 90 + i) * 4, width: 96, height: 150, zIndex: 82, filter: "blur(2.5px)", opacity: 0.9 * fore, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: 44, top: 0, width: 6, height: 34, background: "#080A0D" }} />
            <div style={{ position: "absolute", left: 20, top: 34, width: 56, height: 52, background: "#080A0D", borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 32, top: 48, width: 30, height: 26, background: mix(NEONORANGE, "#000000", 0.25), opacity: 0.5 * flick(lf, 0.4, i), filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: 14, top: 86, width: 68, height: 16, clipPath: "polygon(0 0,100% 0,84% 100%,16% 100%)", background: "#080A0D" }} />
          </div>
          {/* an edge banner-pole with a warm lantern head, pinned to the frame
              margins (x 6 / 1040) so it never crosses a pad or a figure */}
          <div style={{ position: "absolute", left: i % 2 ? 6 : 1040, top: fy - 30, width: 40, height: 220, zIndex: 82, filter: "blur(2.5px)", opacity: 0.85 * fore, transform: `skewX(${Math.sin(lf / 48 + i) * 2}deg)`, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 40, height: 220, background: "linear-gradient(90deg,#050609,#0C0F14,#050609)" }} />
            <div style={{ position: "absolute", left: 8, top: 40, width: 24, height: 150, background: "rgba(120,40,32,0.20)" }} />
            <div style={{ position: "absolute", left: 6, top: 16, width: 28, height: 22, borderRadius: 5, background: mix(NEONORANGE, "#000000", 0.3), opacity: 0.55 * flick(lf, 0.4, i + 3), filter: "blur(2px)" }} />
          </div>
        </React.Fragment>
      ))}
      {rain > 0.02 && <RainStreaks lf={lf} o={0.42 * rain} n={40} z={78} h={WORLD_H} />}
      {embers > 0.02 && <Embers lf={lf} o={embers} n={30} z={80} h={WORLD_H} />}
    </div>
  );
};

// alias, in case a scene body reaches for the generic name.
export const World = ProvingGround;

// ==== part: 03_motion.tsx ====

// ============================================================================
// 68 CALLS - THE MOTION KIT
// Animation craft only. Nothing here stages, colours or restages a scene: every
// export is a pure deterministic function of a frame number, so any frame can be
// rendered independently. Scene bodies compose these on top of the world kit.
//
// The doctrine these encode, in one line each:
//   nothing is frozen | anticipate | overshoot and settle | follow through |
//   arcs not lines | weight and impact | smear fast moves | stagger | vary the
//   easing | the camera is a character | earn the holds | animate entrances.
//
// House rules obeyed: over(f, start, dur) is in FRAMES; ramp(f, a, b) throws when
// a >= b so decreasing values use a plain lerp; randomness is always seed(n).
// ============================================================================

// ---------------------------------------------------------------------------
// PLUMBING
// ---------------------------------------------------------------------------

// the honest decreasing lerp. ramp() refuses a >= b, so anything that falls off
// goes through here instead of a reversed interpolate.
export const lerpv = (t: number, a: number, b: number) => a + (b - a) * Math.max(0, Math.min(1, t));

// signed deterministic noise in -1..1, stable for any (i, k) pair.
export const nz = (i: number, k = 0) => seed(i * 12.9898 + k * 78.233 + 1) * 2 - 1;

// ---------------------------------------------------------------------------
// VALUE HELPERS. All return numbers. All clamp outside their window.
// ---------------------------------------------------------------------------

// NEVER FROZEN. A slow breathing sine around 0. Give every element one of these.
export const idle = (f: number, amp = 2, period = 90, phase = 0) =>
  Math.sin((f / Math.max(1, period)) * Math.PI * 2 + phase) * amp;

// like idle but two incommensurate sines, so it never visibly loops.
export const drift = (f: number, amp = 3, period = 130, phase = 0) =>
  (Math.sin((f / Math.max(1, period)) * Math.PI * 2 + phase) * 0.62
    + Math.sin((f / Math.max(1, period * 0.41)) * Math.PI * 2 + phase * 1.7) * 0.38) * amp;

// a breathing SCALE around 1. Use on anything that would otherwise sit still.
export const breathe = (f: number, amp = 0.012, period = 84, phase = 0) =>
  1 + Math.sin((f / Math.max(1, period)) * Math.PI * 2 + phase) * amp;

// a flicker multiplier around 1, for lamps, screens and signage.
export const flick = (f: number, amp = 0.08, i = 0) =>
  1 - amp * 0.5 + amp * 0.5 * (Math.sin(f / 17 + i * 2.1) * 0.6 + Math.sin(f / 6.3 + i * 5.7) * 0.4);

// ANTICIPATION then ACTION. 0 at start, dips to -back, then travels past 1 and
// settles. The first 32 percent of dur is the wind up.
export const antic = (f: number, start: number, dur: number, back = 0.16, ease = Easing.out(Easing.back(2.0))) => {
  const wind = Math.max(2, dur * 0.32);
  if (f <= start) return 0;
  if (f < start + wind) return -back * over(f, start, wind, Easing.inOut(Easing.sin));
  return -back + (1 + back) * over(f, start + wind, Math.max(1, dur - wind), ease);
};

// a DAMPED SINE returning to 0. The post-arrival wobble, the rock after a slam.
export const settle = (f: number, start: number, amp: number, freq = 0.16, decay = 0.10) => {
  const t = f - start;
  if (t <= 0) return 0;
  return amp * Math.sin(t * freq * Math.PI * 2) * Math.exp(-decay * t);
};

// ARRIVAL. 0 to 1 with a real overshoot of `amount` and a damped settle back.
// Never ends on a dead ease-out-cubic stop.
export const overshoot = (f: number, start: number, dur: number, amount = 0.09) => {
  const rise = Math.max(1, dur * 0.68);
  const base = over(f, start, rise, Easing.out(Easing.quad));
  return base + settle(f, start + rise, amount, 0.13, 0.11);
};

// a LANDING. Returns height above rest: 1 at start, 0 at land, then decaying
// rebounds. Multiply by a drop height. `drops` is how many rebounds you get.
export const bounce = (f: number, start: number, dur: number, drops = 3) => {
  const t = f - start;
  if (t <= 0) return 1;
  if (t >= dur * (1 + drops * 0.34)) return 0;
  const fall = over(f, start, dur, Easing.in(Easing.quad));
  const h = 1 - fall;
  if (t < dur) return h;
  let e = 0.30, at = start + dur, amp = 0.30;
  for (let k = 0; k < drops; k++) {
    const span = Math.max(2, dur * e);
    if (t < at - start + span) {
      const p = (f - at) / span;
      return Math.sin(p * Math.PI) * amp;
    }
    at += span; amp *= 0.42; e *= 0.66;
  }
  return 0;
};

// ACCELERATING FALL. Position goes with t squared, never linearly.
export const gravity = (f: number, start: number, dur: number, from: number, to: number) =>
  from + (to - from) * Math.pow(over(f, start, dur, Easing.linear), 2);

// PARABOLIC THROW, vertical. Leaves y0, peaks `peak` px higher, lands at y1.
export const arcY = (f: number, start: number, dur: number, y0: number, peak: number, y1: number) => {
  const t = over(f, start, dur, Easing.linear);
  return y0 + (y1 - y0) * t - peak * 4 * t * (1 - t);
};

// PARABOLIC THROW, horizontal. Slight ease out so air drag reads.
export const arcX = (f: number, start: number, dur: number, x0: number, x1: number) =>
  x0 + (x1 - x0) * over(f, start, dur, Easing.out(Easing.quad));

// a WHIP or SNAP. Fast out, long tail.
export const whip = (f: number, start: number, dur: number) => over(f, start, dur, Easing.out(Easing.poly(5)));

// a decaying SHAKE at a point in time. amp scales with the mass that landed.
export const shake = (f: number, start: number, amp: number, dur = 12) => {
  const t = f - start;
  if (t < 0 || t > dur) return { x: 0, y: 0, r: 0 };
  const k = Math.pow(1 - t / dur, 1.7);
  return {
    x: nz(Math.floor(t) + 1, 3) * amp * k,
    y: nz(Math.floor(t) + 1, 9) * amp * 0.78 * k,
    r: nz(Math.floor(t) + 1, 17) * amp * 0.10 * k,
  };
};

// HANDHELD. Sub pixel camera life, always on, never repeating.
export const handheld = (f: number, amp = 0.7) => ({
  x: (Math.sin(f / 37) * 0.6 + Math.sin(f / 13.7) * 0.4) * amp,
  y: (Math.sin(f / 43 + 1.9) * 0.6 + Math.sin(f / 11.3 + 0.7) * 0.4) * amp * 0.8,
});

// THE CAMERA IS A CHARACTER. Add this to a Cam x/y. `hits` are impact frames.
// Always returns a live value, even with no hits, so the camera is never locked.
export const shakeCam = (f: number, hits: { at: number; amp: number; dur?: number }[] = [], breath = 1) => {
  const h = handheld(f, 0.7 * breath);
  let x = h.x, y = h.y + idle(f, 1.1 * breath, 210, 0.6);
  for (const k of hits) { const s = shake(f, k.at, k.amp, k.dur ?? 13); x += s.x; y += s.y; }
  return { x, y, z: breathe(f, 0.004, 260) };
};

// STAGGER. Per index frame offset, with a deterministic jitter so a group never
// acts as one machine.
export const stagger = (i: number, step = 3) => Math.round(i * step + nz(i, 5) * step * 0.4);

// per index amplitude variety. base plus or minus spread, stable per index.
export const vary = (i: number, base: number, spread = 0.2) => base * (1 + nz(i, 11) * spread);

// per index duration variety, clamped positive.
export const varyDur = (i: number, base: number, spread = 0.18) => Math.max(2, Math.round(vary(i, base, spread)));

// SQUASH AND STRETCH on contact. Returns a transform-ready {sx, sy}. Squash for
// 2 to 3 frames, then a rebound overshoot, then settle. Anchor at the base.
export const squash = (f: number, at: number, amount = 0.22, dur = 3) => {
  const t = f - at;
  if (t < 0 || t > dur + 16) return { sx: 1, sy: 1 };
  const hit = t <= dur ? over(f, at, dur, Easing.out(Easing.quad)) : 1;
  const back = t <= dur ? 0 : settle(f, at + dur, amount * 0.9, 0.15, 0.13);
  const sy = 1 - amount * hit + back * -1;
  const sx = 1 + amount * 0.72 * hit + back * 0.72;
  return { sx: Math.max(0.4, sx), sy: Math.max(0.4, sy) };
};

// LAG. Sample any frame driven value a few frames in the past, for trailing and
// overlapping parts. Pass the function you used for the primary.
export const lag = (f: number, frames: number, fn: (g: number) => number) => fn(f - frames);

// a LEAN, for anticipation on characters: negative degrees before a move, then
// into the move. Feed the same start/dur you gave the travel.
export const lean = (f: number, start: number, dur: number, deg = 9) =>
  -deg * antic(f, start - Math.max(3, dur * 0.3), Math.max(4, dur * 0.5), 1.0);

// ---------------------------------------------------------------------------
// MOTION COMPONENTS. Matte palette, soft dark shadows, no coloured halos.
// ---------------------------------------------------------------------------

// SMEAR. Ghost copies of a fast child stretched along the motion axis. Use on
// anything crossing real distance in under about six frames.
export const Smear: React.FC<{ dx?: number; dy?: number; ghosts?: number; on?: number; o?: number; stretch?: number; z?: number; children?: React.ReactNode }> =
  ({ dx = 0, dy = 0, ghosts = 3, on = 1, o = 0.30, stretch = 1.18, z = 0, children }) => {
    const sp = Math.hypot(dx, dy);
    const k = Math.max(0, Math.min(1, on)) * Math.min(1, sp / 9);
    const ang = sp > 0.001 ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;
    return (
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: z }}>
        {k > 0.02 && Array.from({ length: ghosts }, (_, i) => {
          const t = (i + 1) / (ghosts + 1);
          return (
            <div key={i} style={{
              position: "absolute", left: -dx * t * 1.05, top: -dy * t * 1.05,
              opacity: o * k * (1 - t * 0.72), filter: `blur(${(0.8 + t * 2.2).toFixed(2)}px)`,
              transform: `rotate(${ang}deg) scaleX(${1 + (stretch - 1) * k * (1 - t * 0.4)}) rotate(${-ang}deg)`,
              transformOrigin: "50% 50%", pointerEvents: "none",
            }}>{children}</div>
          );
        })}
        <div style={{ position: "absolute", left: 0, top: 0 }}>{children}</div>
      </div>
    );
  };

// SPEED LINES. Directional streaks for a fast camera or a fast object.
export const SpeedLines: React.FC<{ lf: number; x: number; y: number; w?: number; h?: number; dir?: number; n?: number; on?: number; hue?: string; z?: number; sd?: number }> =
  ({ lf, x, y, w = 700, h = 420, dir = 0, n = 16, on = 1, hue = "rgba(214,226,244,0.5)", z = 40, sd = 0 }) => {
    if (on <= 0.02) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, pointerEvents: "none", overflow: "hidden", transform: `rotate(${dir}deg)` }}>
        {Array.from({ length: n }, (_, i) => {
          const s = seed(i * 4.11 + sd + 3);
          const sp = 26 + s * 46;
          const px = ((lf * sp + s * 2000) % (w + 460)) - 230;
          const len = 70 + s * 220;
          return <div key={i} style={{
            position: "absolute", left: px, top: s * h, width: len, height: 1 + Math.round(s * 2),
            background: `linear-gradient(90deg, transparent, ${hue}, transparent)`,
            opacity: on * (0.22 + s * 0.5), filter: `blur(${(0.4 + s * 1.1).toFixed(2)}px)`,
          }} />;
        })}
      </div>
    );
  };

// SPARKLES. Small particles thrown on PARABOLIC arcs from a point, with gravity,
// stagger and per particle variety. Never a symmetric radial burst.
export const Sparkles: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; life?: number; spread?: number; rise?: number; hue?: string; sd?: number; z?: number; o?: number }> =
  ({ lf, at, x, y, n = 12, life = 26, spread = 150, rise = 90, hue = "#E7CFA0", sd = 0, z = 34, o = 1 }) => (
    <>{Array.from({ length: n }, (_, i) => {
      const s0 = seed(i * 7.31 + sd + 1), s1 = seed(i * 3.17 + sd + 5);
      const st = at + stagger(i, 1.4);
      const dur = varyDur(i, life, 0.3);
      const t = (lf - st) / dur;
      if (t <= 0 || t >= 1) return null;
      const side = i % 2 ? 1 : -1;
      const px = x + side * (18 + s0 * spread) * over(lf, st, dur, Easing.out(Easing.quad));
      const py = arcY(lf, st, dur, y, vary(i, rise, 0.42), y + 26 + s1 * 40);
      const sz = 3 + s1 * 4;
      return <div key={i} style={{
        position: "absolute", left: px - sz / 2, top: py - sz / 2, width: sz, height: sz, borderRadius: "50%",
        background: hue, opacity: o * (1 - t * t) * (0.55 + s0 * 0.45), zIndex: z, pointerEvents: "none",
        transform: `rotate(${(s0 * 220 + lf * 6 * side).toFixed(1)}deg)`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.45)",
      }} />;
    })}</>
  );

// DUST. Slow drifting particles that OUTLIVE an impact. Long life, rising, with
// sideways drift, so a landing keeps breathing after the bang is over.
export const Dust: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; life?: number; spread?: number; hue?: string; sd?: number; z?: number; o?: number }> =
  ({ lf, at, x, y, n = 14, life = 74, spread = 190, hue = "rgba(178,170,152,0.5)", sd = 0, z = 28, o = 1 }) => (
    <>{Array.from({ length: n }, (_, i) => {
      const s0 = seed(i * 5.53 + sd + 2), s1 = seed(i * 2.19 + sd + 8);
      const st = at + stagger(i, 2.6);
      const dur = varyDur(i, life, 0.34);
      const t = (lf - st) / dur;
      if (t <= 0 || t >= 1) return null;
      const side = i % 2 ? 1 : -1;
      const px = x + side * (10 + s0 * spread) * Math.pow(t, 0.62) + Math.sin(lf / (22 + s1 * 20) + i) * 7;
      const py = y - (16 + s1 * 78) * Math.pow(t, 0.72) + idle(lf, 2.4, 60 + s0 * 40, i);
      const sz = 8 + s0 * 26 + t * 22;
      return <div key={i} style={{
        position: "absolute", left: px - sz / 2, top: py - sz / 2, width: sz, height: sz * 0.72, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${hue}, transparent 70%)`, filter: `blur(${(3 + s1 * 5).toFixed(1)}px)`,
        opacity: o * Math.sin(Math.min(1, t) * Math.PI) * (0.4 + s0 * 0.5), zIndex: z, pointerEvents: "none",
      }} />;
    })}</>
  );

// DEBRIS. Chunks thrown off a heavy landing, tumbling on arcs and settling.
export const Debris: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; life?: number; spread?: number; rise?: number; hue?: string; sd?: number; z?: number; o?: number }> =
  ({ lf, at, x, y, n = 8, life = 30, spread = 210, rise = 74, hue = "#2A2E38", sd = 0, z = 33, o = 1 }) => (
    <>{Array.from({ length: n }, (_, i) => {
      const s0 = seed(i * 9.13 + sd + 4), s1 = seed(i * 4.41 + sd + 6);
      const st = at + stagger(i, 1.1);
      const dur = varyDur(i, life, 0.28);
      const t = (lf - st) / dur;
      if (t <= 0 || t >= 1) return null;
      const side = i % 2 ? 1 : -1;
      const px = arcX(lf, st, dur, x, x + side * (30 + s0 * spread));
      const py = arcY(lf, st, dur, y, vary(i, rise, 0.5), y + 6);
      const w = 5 + s0 * 11, hh = 4 + s1 * 8;
      return <div key={i} style={{
        position: "absolute", left: px, top: py, width: w, height: hh, borderRadius: 2, background: hue,
        opacity: o * lerpv(t, 1, 0) * 0.9, zIndex: z, pointerEvents: "none",
        transform: `rotate(${(s0 * 90 + t * 420 * side).toFixed(1)}deg)`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }} />;
    })}</>
  );

// GROUND RING. The expanding flattened ring a heavy landing pushes outward.
export const GroundRing: React.FC<{ lf: number; at: number; x: number; y: number; r?: number; dur?: number; hue?: string; z?: number; o?: number }> =
  ({ lf, at, x, y, r = 260, dur = 20, hue = "rgba(226,220,204,0.55)", z = 26, o = 1 }) => {
    const t = (lf - at) / dur;
    if (t <= 0 || t >= 1) return null;
    const e = over(lf, at, dur, Easing.out(Easing.poly(5)));
    const rr = Math.max(1, r * e);
    return <div style={{
      position: "absolute", left: x - rr, top: y - rr * 0.30, width: rr * 2, height: rr * 0.60, borderRadius: "50%",
      border: `${Math.max(1.5, 9 * (1 - e))}px solid ${hue}`, opacity: o * (1 - t) * 0.9,
      filter: "blur(2.5px)", zIndex: z, pointerEvents: "none",
    }} />;
  };

// IMPACT. The whole weight package at one point: ground ring, dust puff, thrown
// debris and a scatter of sparkles, all staggered and all decaying. Pair it with
// shakeCam({at, amp}) on the camera and squash() on the thing that landed.
export const Impact: React.FC<{ lf: number; at: number; x: number; y: number; strength?: number; hue?: string; dustHue?: string; z?: number; debris?: number; sparks?: number; sd?: number }> =
  ({ lf, at, x, y, strength = 1, hue = "rgba(226,220,204,0.55)", dustHue = "rgba(178,170,152,0.5)", z = 30, debris = 8, sparks = 9, sd = 0 }) => {
    if (lf < at - 1 || lf > at + 130) return null;
    const s = Math.max(0.15, strength);
    return (
      <>
        <GroundRing lf={lf} at={at} x={x} y={y} r={200 * s} dur={Math.round(16 + 8 * s)} hue={hue} z={z} />
        <GroundRing lf={lf} at={at + 3} x={x} y={y} r={130 * s} dur={Math.round(22 + 8 * s)} hue={hue} z={z} o={0.6} />
        <Dust lf={lf} at={at + 1} x={x} y={y} n={Math.round(10 + 8 * s)} life={Math.round(64 + 26 * s)} spread={160 * s} hue={dustHue} sd={sd + 1} z={z - 2} />
        <Debris lf={lf} at={at} x={x} y={y} n={debris} spread={180 * s} rise={64 * s} sd={sd + 2} z={z + 3} />
        <Sparkles lf={lf} at={at} x={x} y={y} n={sparks} spread={130 * s} rise={78 * s} sd={sd + 3} z={z + 4} />
      </>
    );
  };

// SETTLE WOBBLE wrapper. Anything that just arrived keeps living: a damped
// rotation plus a permanent idle bob, so it never dead stops.
export const Rock: React.FC<{ lf: number; at?: number; amp?: number; freq?: number; decay?: number; bob?: number; period?: number; ox?: string; z?: number; children?: React.ReactNode }> =
  ({ lf, at = 0, amp = 7, freq = 0.14, decay = 0.075, bob = 1.4, period = 96, ox = "50% 0%", z = 0, children }) => (
    <div style={{
      position: "absolute", left: 0, top: 0, zIndex: z, transformOrigin: ox,
      transform: `rotate(${(settle(lf, at, amp, freq, decay) + idle(lf, bob, period)).toFixed(3)}deg)`,
    }}>{children}</div>
  );

// TRAIL. Follow through for an attached part: it lags the primary by `by` frames
// and keeps swinging after the primary stops. Pass the primary's own angle fn.
export const Trail: React.FC<{ lf: number; by?: number; angle: (g: number) => number; extra?: number; ox?: string; z?: number; children?: React.ReactNode }> =
  ({ lf, by = 3, angle, extra = 0.35, ox = "50% 0%", z = 0, children }) => {
    const a = angle(lf - by);
    const v = a - angle(lf - by - 1);
    return (
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, transformOrigin: ox, transform: `rotate(${(a + v * extra * 6).toFixed(3)}deg)` }}>{children}</div>
    );
  };

// ==== part: 10_S0.tsx ====
// ============================================================================
// SCENE 0 - THE FORGE (HOOK). camera FORGE. 86 frames (lf 0..85). verb STRIKE.
// Takeaway (sound off): a freshly forged glowing blade on an anvil, and a masked
// red warrior smashes in from the dark and cracks it.
//
// AT FRAME 0 (complete, settled, mid-action):
//   - Cam locked low on the base forge node, live handheld micro-noise.
//   - The forge kiln blazing, banded smoke rising, embers + diagonal rain falling.
//   - The forge-master (hard hat + glasses, eyes visible) caught mid hammer-swing.
//   - The freshly forged blade upright on the anvil, warm temper 1, glowing, steam.
//   - The carved stone 10% marker beside the anvil, warm-underlit.
//   - The knee-high novice cameo idling on the corner ledge.
//   - The white two-tone HEADER solid: "Claude's Agent Graph / hands you work /
//     that already survived an attack" (carries the Claude OCR keyword from f0).
//   - SceneTag THE FORGE. No Red Master yet (invades at f18).
// Reserved-colour discipline: NO gold anywhere (blade temper 1, torii offscreen,
// masterGold 0, warm 0). Menace-red is spent only on the incoming staff, its
// glint, and the Red Master. Green nowhere. Matte throughout.
// ============================================================================
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- world anchors (near SITE.forge 506,1960) ----
  const S0_BLADE = { x: 506, y: 1889 };     // base sits on the anvil top face
  const S0_STRIKE = { x: 542, y: 1812 };    // where the bo cracks the blade (upper third)
  const S0_MASTER = { x: 800, y: 1816 };    // the ledge just above and right of the forge
  const S0_MAST_FEET = 1816;

  // ---- CAMERA: locked low, decaying shakes on the two impacts, slow push ----
  const s0cam = shakeCam(lf, [{ at: 18, amp: 6, dur: 16 }, { at: 26, amp: 3.4, dur: 12 }], 1);
  const s0push = over(lf, 40, 46, Easing.out(Easing.cubic));
  // a second creep is LINEAR and outlives the scene, so the camera is still
  // visibly closing in through the last frame (no flatlined push at f80..85).
  const s0creep = over(lf, 54, 40);       // still climbing at f85 (ends f94)
  const s0Z = CAMS.FORGE.z * (1 + 0.04 * s0push + 0.034 * s0creep) * s0cam.z;
  const s0camPos = { x: CAMS.FORGE.x + s0cam.x + 6 * s0creep, y: CAMS.FORGE.y + s0cam.y - 12 * over(lf, 44, 48) - 8 * s0creep, z: s0Z };

  // ---- the incoming BO STAFF strike prop (f13..23), accelerating diagonal ----
  const s0staffPos = (g: number) => {
    const p = over(g, 13, 5, Easing.in(Easing.quad));
    return { x: 1200 + (S0_STRIKE.x - 1200) * p, y: 1460 + (S0_STRIKE.y - 1460) * p };
  };
  const s0sc = s0staffPos(lf), s0sp = s0staffPos(lf - 1);
  const s0vdx = s0sc.x - s0sp.x, s0vdy = s0sc.y - s0sp.y;
  const s0staffAng = Math.atan2(s0vdy, s0vdx) * 180 / Math.PI;
  const s0staffO = interpolate(lf, [12, 13, 19, 24], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- the RED MASTER drop (appears f18, lands f26, then LOOMS in hard) ----
  const s0fall = lf < 26 ? gravity(lf, 18, 8, -330, 0) : 0;
  const s0landWob = settle(lf, 26, 9, 0.16, 0.12);
  const s0mBob = lf >= 29 ? idle(lf, 2.8, 58, 1.1) : 0;              // menace breathing, never rests
  // he keeps GROWING, leaning in and sinking over the cracked forge through the
  // final frames. Two ramps: an ease-in-out body, plus a LINEAR tail that is
  // still climbing at f85 so the loom never flatlines into a dead stop.
  const s0loom = over(lf, 36, 46, Easing.inOut(Easing.sin));
  const s0loomLate = over(lf, 56, 34);                              // still rising at f85 (ends f90)
  const s0masterY = s0fall + s0landWob + s0mBob + 26 * s0loom + 12 * s0loomLate; // sinks forward over the anvil
  const s0sq = squash(lf, 26, 0.2, 3);
  const s0mScaleL = 1 + s0loom * 0.16 + s0loomLate * 0.07;          // grows to ~1.23, never flat
  const s0mLeanX = (s0loom * -22 - s0loomLate * 10) + settle(lf, 26, 3, 0.15, 0.09); // leans in toward the blade
  // the bo staff twirls constantly, then REARS BACK for a threatened second
  // strike through the final frames (a live wind-up, never a frozen prop).
  const s0staffAngle = -24 + idle(lf, 5, 40, 0.5) - s0loomLate * 30;
  const s0glint = Math.max(
    interpolate(lf, [10, 14, 18], [0, 1, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    0.36 + 0.34 * flick(lf, 0.6, 2) + s0loomLate * 0.18            // menace brightens as he rears up
  );

  // ---- the blade: cracks at f18, dims + reddens, judders on the hit, then keeps
  // shuddering (a damaged, unstable blade never dead-stops) ----
  const s0crack = lf >= 18 ? 1 : 0;
  const s0bladeRot = settle(lf, 18, 5, 0.22, 0.13)
    + (lf >= 19 ? idle(lf, 1.9, 7, 2) : 0)       // fast instability tremor, now readable at thumbnail size
    + (lf >= 40 ? drift(lf, 1.3, 38) : 0)        // slow uneasy lean, growing
    + settle(lf, 62, 1.6, 0.3, 0.05);            // a late judder as the master rears back, never dead-stops

  // ---- the forge-master: hammering, then startled recoil + guard at f18 ----
  const s0mForging = lf < 17 ? 1 : 0;                                     // active swing pre-hit
  const s0mHammer = lf < 18 ? 1 : 0;                                      // hammer flies free at f18
  const s0mFlinch = interpolate(lf, [17, 21, 34, 60, 86], [0, 0.34, 0.18, 0.16, 0.22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    + (lf >= 34 ? 0.03 * (idle(lf, 1, 24) + 1) : 0);   // guard keeps breathing
  const s0mGaze = Math.round(interpolate(lf, [18, 30], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  // the forge-master recoils from the hit then keeps a live protective sway over the blade
  const s0mSwayX = (lf >= 18 ? settle(lf, 18, 7, 0.14, 0.075) : 0) + idle(lf, 1.8, 50, 0.6);
  const s0mSwayY = (lf >= 18 ? -settle(lf, 18, 4, 0.14, 0.075) : 0) + idle(lf, 1.4, 58, 1.2);
  // the flyaway hammer arcs up-left out of his hand
  const s0hamO = interpolate(lf, [17, 18, 40, 52], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s0hamX = arcX(lf, 18, 30, 690, 470);
  const s0hamY = arcY(lf, 18, 30, 1960, 150, 2010);
  const s0hamRot = (lf - 18) * 22;

  // ---- novice flinch pulse ----
  const s0nFlinch = interpolate(lf, [18, 22, 44], [0, 0.45, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // the forge kiln FLARES as the menace peaks, still rising through the last frames
  const s0blaze = 0.14 + 0.42 * over(lf, 54, 34);

  // ---- WORKING-FORGE SET MOTION: a bellows pump that drives the coal glow, a hung
  // hoist chain with a lagging follow-through, and hanging tools that jolt on the
  // strike. Everything below is a live function of lf, never a frozen prop. ----
  const s0pump = lf < 17
    ? (Math.sin(lf / 6) * 0.5 + 0.5)                              // steady pumping while forging
    : (0.5 + 0.26 * (Math.sin(lf / 9) * 0.5 + 0.5) + settle(lf, 18, 0.34, 0.13, 0.08)); // hitches on the hit, keeps breathing
  const s0bellAng = 13 - 12 * s0pump;                            // the lower bellows board pivots on the pump
  const s0coal = 0.32 + 0.34 * s0pump + 0.3 * s0blaze
    + 0.5 * interpolate(lf, [17, 19, 27], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // coals flare as the strike disturbs the forge
  const s0chain = idle(lf, 3.4, 76) + settle(lf, 18, 6, 0.17, 0.08) + settle(lf, 26, 3.4, 0.15, 0.08);
  const s0chainHook = idle(lf - 3, 3.4, 76) + settle(lf - 3, 18, 6, 0.17, 0.08) + settle(lf - 3, 26, 3.4, 0.15, 0.08); // hook lags 3f for follow-through
  const s0rackJolt = settle(lf, 18, 7, 0.18, 0.09) + settle(lf, 26, 4, 0.16, 0.09); // hung tools swing on both impacts

  // ---- overlays (panel-local) ----
  // peak lowered + nudged one frame past contact so the staff is still visible
  // ON the blade as it cracks (cause and effect share the frame, not a white-out).
  const s0flash = interpolate(lf, [16, 19, 22], [0, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s0shadeT = interpolate(lf, [12, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s0shadeO = interpolate(lf, [12, 15, 17, 24], [0, 0.5, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s0roundPop = interpolate(lf, [26, 31, 37], [0, 1.18, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s0roundO = interpolate(lf, [26, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // (the hook HEADER is now rendered once by the house ChartHeader in the tail, so
  // no in-scene header card or its drivers live here anymore.)

  return (
    <>
      <Cam x={s0camPos.x} y={s0camPos.y} z={s0camPos.z}>
        <ProvingGround lf={lf} forgeHot={1} blaze={s0blaze} rain={1} embers={1} moonGlow={1} gateLit={1} sealUnlocked={0} redPadLit={0} masterGold={0} warm={0}>

          {/* the tiered dark cliff hinted ABOVE the forge: faint stone shelves and
              orange lantern dots climbing into the black, teasing the hidden 90% up
              the mountain (they surface as the camera creeps up late) */}
          {Array.from({ length: 4 }, (_, i) => {
            const s = seed(i * 5.7 + 4);
            const ty = 1694 - i * 44;
            const tx = 300 + i * 150 + (s - 0.5) * 120;
            return (
              <React.Fragment key={"s0tier" + i}>
                <div style={{ position: "absolute", left: tx - 120, top: ty, width: 240 + s * 90, height: 30, background: `linear-gradient(180deg, ${STONE}, ${STONELO})`, clipPath: "polygon(6% 0,94% 0,100% 100%,0 100%)", opacity: 0.4 - i * 0.07, filter: `blur(${1.4 + i * 0.8}px)`, zIndex: 6 }} />
                <div style={{ position: "absolute", left: tx + (s - 0.5) * 90, top: ty - 12, width: 8, height: 8, borderRadius: "50%", background: mix(NEONORANGE, "#000000", 0.12), opacity: (0.5 - i * 0.08) * flick(lf, 0.6, i * 3 + 1), filter: "blur(0.6px)", zIndex: 7 }} />
              </React.Fragment>
            );
          })}

          {/* the ledge the master lands on: a faceted dark stone shelf */}
          <div style={{ position: "absolute", left: S0_MASTER.x - 120, top: S0_MAST_FEET - 6, width: 240, height: 60, zIndex: 18 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 240, height: 26, background: `linear-gradient(180deg, ${STONE2}, ${STONE})`, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }} />
            <div style={{ position: "absolute", left: 8, top: 22, width: 224, height: 34, background: `linear-gradient(180deg, ${STONE}, ${STONELO})`, clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)" }} />
          </div>

          {/* the carved 10% stone marker, warm-underlit by the forge */}
          <div style={{ position: "absolute", left: 316, top: 1958, width: 118, height: 82, zIndex: 40 }}>
            <div style={{ position: "absolute", left: 0, top: 10, width: 118, height: 72, background: `linear-gradient(180deg, ${STONE2}, ${STONELO})`, clipPath: "polygon(8% 0, 92% 0, 100% 88%, 84% 100%, 16% 100%, 0 88%)", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", left: 0, top: 10, width: 118, height: 20, background: mix(NEONORANGE, "#000000", 0.4), opacity: 0.32 * flick(lf, 0.3, 4), filter: "blur(4px)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 118, height: 82, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#CFC6B4", letterSpacing: "-0.02em" }}>10%</div>
          </div>

          {/* ---- WORKING FORGE SET (bellows, coal bed, hoist chain, tool rack) ---- */}

          {/* tool rack on the back wall: hung tongs, a spare hammer and a file, all
              swaying on their own phase, jolted when the staff lands. Dim + blurred
              so it sits behind the hero action. */}
          <div style={{ position: "absolute", left: 596, top: 1566, width: 172, height: 152, zIndex: 14, filter: "blur(0.5px)", opacity: 0.88 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 172, height: 12, background: "linear-gradient(180deg,#4A3624,#241610)", borderRadius: 3, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.08)" }} />
            {[{ x: 18, l: 92, k: "tong" }, { x: 62, l: 74, k: "hammer" }, { x: 104, l: 112, k: "file" }, { x: 144, l: 66, k: "tong" }].map((t, ti) => {
              const sway = idle(lf, 2.6, 78 + ti * 11, ti * 1.3) + s0rackJolt * (ti % 2 ? 0.7 : 1);
              return (
                <div key={"s0tool" + ti} style={{ position: "absolute", left: t.x, top: 8, transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
                  <div style={{ position: "absolute", left: -1.5, top: 0, width: 3, height: t.l, background: "#2A2018" }} />
                  {t.k === "hammer" && <div style={{ position: "absolute", left: -13, top: t.l - 4, width: 30, height: 16, background: "linear-gradient(180deg,#5A626C,#242A32)", borderRadius: 3 }} />}
                  {t.k === "tong" && <><div style={{ position: "absolute", left: -8, top: t.l - 2, width: 6, height: 22, background: "#3A424C", borderRadius: 3, transform: "rotate(-14deg)" }} /><div style={{ position: "absolute", left: 4, top: t.l - 2, width: 6, height: 22, background: "#3A424C", borderRadius: 3, transform: "rotate(14deg)" }} /></>}
                  {t.k === "file" && <div style={{ position: "absolute", left: -4, top: t.l - 2, width: 8, height: 26, background: "linear-gradient(180deg,#6E6660,#2A2622)", borderRadius: 2 }} />}
                </div>
              );
            })}
          </div>

          {/* the forge HOIST: a heavy chain and hook hanging over the anvil, swinging
              with a lagging follow-through and jolting on both impacts */}
          <div style={{ position: "absolute", left: 610, top: 1560, transformOrigin: "50% 0%", transform: `rotate(${s0chain * 0.22}deg)`, zIndex: 43 }}>
            {Array.from({ length: 10 }, (_, k) => (
              <div key={"s0lnk" + k} style={{ position: "absolute", left: -5 + (k % 2) * 3, top: k * 15, width: 10, height: 15, borderRadius: 5, border: "3px solid #39424E", opacity: 0.9 }} />
            ))}
            <div style={{ position: "absolute", left: -6, top: 152, transformOrigin: "50% -12%", transform: `rotate(${(s0chainHook - s0chain) * 1.6}deg)` }}>
              <div style={{ position: "absolute", left: -3, top: 0, width: 8, height: 20, background: "#4A525C", borderRadius: 3 }} />
              <div style={{ position: "absolute", left: -11, top: 16, width: 24, height: 24, border: "5px solid #4A525C", borderTop: "none", borderRadius: "0 0 16px 16px" }} />
            </div>
          </div>

          {/* the BELLOWS pumping air into the kiln, its lower board pivoting on each
              pump then hitching when the strike lands */}
          <div style={{ position: "absolute", left: 116, top: 1848, width: 152, height: 74, zIndex: 21 }}>
            <div style={{ position: "absolute", left: 128, top: 30, width: 44, height: 11, background: "linear-gradient(180deg,#4A4038,#221C16)", borderRadius: 3, transform: "rotate(7deg)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: 22, background: "linear-gradient(180deg,#6E4A30,#38240F)", clipPath: "polygon(0 0,100% 52%,100% 100%,0 44%)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12)" }} />
            <div style={{ position: "absolute", left: 8, top: 40, width: 150, height: 22, background: "linear-gradient(180deg,#38240F,#211208)", clipPath: "polygon(0 56%,100% 0,100% 48%,0 100%)", transformOrigin: "100% 0%", transform: `rotate(${s0bellAng}deg)`, boxShadow: "0 5px 7px rgba(0,0,0,0.45)" }} />
            <div style={{ position: "absolute", left: 10, top: 20, width: 118, height: 26, background: "repeating-linear-gradient(180deg,#5A3E28 0 4px,#341E0F 4px 8px)", opacity: 0.85, transform: `scaleY(${0.7 + s0pump * 0.5})`, transformOrigin: "100% 50%", filter: "blur(0.4px)" }} />
          </div>

          {/* the banked COAL BED at the kiln mouth, glowing and pulsing with each pump,
              flaring as the staff cracks the blade */}
          <div style={{ position: "absolute", left: 244, top: 1934, width: 196, height: 54, zIndex: 23 }}>
            <Glow x={96} y={24} r={116} hue={NEONORANGE} o={s0coal * 0.55} blur={18} ry={28} z={22} />
            {Array.from({ length: 12 }, (_, k) => {
              const s = seed(k * 3.7 + 9);
              return <div key={"s0cl" + k} style={{ position: "absolute", left: 8 + k * 15 + (s - 0.5) * 8, top: 16 + s * 20, width: 9 + s * 9, height: (9 + s * 9) * 0.66, borderRadius: "50%", background: `radial-gradient(circle at 42% 34%, ${mix(KEY, NEONORANGE, 0.4)}, #4E1A06)`, opacity: 0.42 + 0.55 * flick(lf, 0.7, k) * s0coal, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />;
            })}
          </div>

          {/* banked embers scattered across the forge floor, low and flickering */}
          {Array.from({ length: 8 }, (_, k) => {
            const s = seed(k * 6.1 + 13);
            return <div key={"s0ge" + k} style={{ position: "absolute", left: 236 + k * 66 + (s - 0.5) * 26, top: 1998 + s * 24, width: 6 + s * 7, height: (6 + s * 7) * 0.58, borderRadius: "50%", background: `radial-gradient(circle, ${NEONORANGE}, #34120400)`, opacity: (0.26 + 0.4 * flick(lf, 0.8, k)) * (0.5 + 0.5 * s0coal), zIndex: 23, filter: "blur(0.5px)" }} />;
          })}

          {/* a small stack of raw ingots waiting to be forged, far left */}
          <div style={{ position: "absolute", left: 96, top: 1962, width: 92, height: 56, zIndex: 24 }}>
            <Glow x={44} y={40} r={44} hue={NEONORANGE} o={0.1 * s0coal} blur={12} ry={14} z={23} />
            {[0, 1, 2].map((k) => (
              <div key={"s0ig" + k} style={{ position: "absolute", left: 6 + k * 7, top: 38 - k * 12, width: 72 - k * 8, height: 12, borderRadius: 2, background: `linear-gradient(180deg, ${mix(STONE2, "#000000", 0.1)}, ${STONELO})`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 3px rgba(0,0,0,0.45)" }} />
            ))}
          </div>

          {/* sparks thrown off the anvil while the master is still hammering (pre-strike) */}
          <Sparks lf={lf} x={526} y={1890} on={s0mForging} color={NEONORANGE} n={10} z={45} />
          <Sparks lf={lf} x={526} y={1890} on={s0mForging} color={KEY} n={6} z={45} />

          {/* THE BLADE on the anvil (temper 1, glowing), cracks at f18. Slightly
              larger so the hero prop reads at thumbnail size. */}
          <Blade lf={lf} x={S0_BLADE.x} y={S0_BLADE.y} temper={1} build={1} glow={1} crack={s0crack} reflect={0.42} rot={s0bladeRot} s={0.78} />
          {/* steam wisps off the hot blade */}
          <Smoke lf={lf} x={S0_BLADE.x} y={S0_BLADE.y - 128} w={70} h={150} hue="rgba(200,196,188,0.5)" o={0.4} bands={4} z={45} />
          {/* the red flaw pulsing at the crack (cause-and-effect: the wound the staff
              left). Reads at thumbnail size and swells as the master rears back. */}
          {lf >= 18 && (
            <Glow x={S0_STRIKE.x} y={S0_STRIKE.y} r={54 + 10 * s0loomLate} hue={mix(HOTRED, ADVRED, 0.3)} o={0.34 + 0.3 * flick(lf, 0.8, 4) + 0.14 * s0loomLate} blur={14} ry={26} z={46} />
          )}
          {/* the wounded crack keeps spitting red sparks so nothing rests late */}
          <Sparkles lf={lf} at={54} x={S0_STRIKE.x} y={S0_STRIKE.y} n={5} spread={70} rise={54} hue={mix(HOTRED, "#FFC9BE", 0.3)} sd={21} z={47} />
          <Sparkles lf={lf} at={70} x={S0_STRIKE.x} y={S0_STRIKE.y} n={5} spread={64} rise={50} hue={mix(HOTRED, "#FFC9BE", 0.3)} sd={33} z={47} />

          {/* THE FORGE-MASTER (you), mid-swing then recoil + live protective sway */}
          <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${s0mSwayX}px, ${s0mSwayY}px)` }}>
            <ForgeMaster lf={lf} x={678} y={1992} size={170} hammer={s0mHammer} forging={s0mForging} flinch={s0mFlinch} gaze={s0mGaze} />
          </div>

          {/* the hammer knocked from his hand, arcing away */}
          {s0hamO > 0.02 && (
            <div style={{ position: "absolute", left: s0hamX, top: s0hamY, transform: `translate(-50%,-50%) rotate(${s0hamRot}deg)`, opacity: s0hamO, zIndex: 49 }}>
              <Smear dx={arcX(lf, 18, 30, 690, 470) - arcX(lf - 1, 18, 30, 690, 470)} dy={arcY(lf, 18, 30, 1960, 150, 2010) - arcY(lf - 1, 18, 30, 1960, 150, 2010)} ghosts={3} o={0.28}>
                <div style={{ position: "absolute", left: -6, top: -22, width: 11, height: 52, background: "#7A5A38", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: -22, top: -26, width: 44, height: 26, background: "linear-gradient(180deg, #6B7280, #2A2E36)", borderRadius: 4 }} />
              </Smear>
            </div>
          )}

          {/* THE NOVICE cameo on the corner ledge */}
          <Novice lf={lf} x={196} y={2014} flinch={s0nFlinch} size={78} />

          {/* the pre-strike RED GLINT flare in the dark upper cliff (f10..18) */}
          {lf >= 9 && lf < 20 && (
            <Glow x={880} y={1640} r={70} hue={ADVRED} o={interpolate(lf, [9, 13, 18], [0, 0.7, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * flick(lf, 0.5, 3)} blur={16} ry={26} z={49} />
          )}

          {/* the INCOMING BO STAFF, motion-smeared */}
          {s0staffO > 0.02 && (
            <>
              <SpeedLines lf={lf} x={S0_STRIKE.x - 120} y={S0_STRIKE.y - 220} w={620} h={360} dir={s0staffAng} n={14} on={s0staffO} hue="rgba(230,150,140,0.5)" z={51} />
              <div style={{ position: "absolute", left: s0sc.x, top: s0sc.y, transform: `translate(-50%,-50%) rotate(${s0staffAng}deg)`, opacity: s0staffO, zIndex: 52 }}>
                <Smear dx={s0vdx} dy={s0vdy} ghosts={4} o={0.34} stretch={1.3}>
                  <div style={{ position: "absolute", left: -150, top: -7, width: 300, height: 14, background: "linear-gradient(90deg, #C9A05A, #7A5A2E)", borderRadius: 4 }} />
                  {Array.from({ length: 7 }, (_, k) => <div key={k} style={{ position: "absolute", left: -150 + k * 44, top: -7, width: 6, height: 14, background: "#3A2A12" }} />)}
                  <div style={{ position: "absolute", left: 138, top: -10, width: 20, height: 20, background: "#5A4020", borderRadius: 3 }} />
                </Smear>
              </div>
            </>
          )}

          {/* impact package on the blade at f18: ring, dust, debris, sparks */}
          <Impact lf={lf} at={18} x={S0_STRIKE.x} y={S0_STRIKE.y} strength={1.1} hue="rgba(230,180,150,0.55)" dustHue="rgba(180,150,130,0.5)" debris={9} sparks={12} z={53} />
          {/* red spark accent on the crack */}
          <Sparkles lf={lf} at={18} x={S0_STRIKE.x} y={S0_STRIKE.y} n={8} spread={120} rise={70} hue={mix(HOTRED, "#FFC9BE", 0.3)} sd={9} z={54} />

          {/* the master's landing impact at f26 */}
          <Impact lf={lf} at={26} x={S0_MASTER.x} y={S0_MAST_FEET} strength={1.3} hue="rgba(210,150,150,0.5)" dustHue="rgba(150,120,120,0.5)" debris={10} sparks={7} sd={4} z={30} />

          {/* THE RED MASTER: invades, lands, then LOOMS bigger and leans in over the
              cracked blade (scale + lean now actually applied). Eyes hidden, never destroyed. */}
          {lf >= 18 && (
            <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${s0mLeanX}px, ${s0masterY}px) scale(${s0mScaleL}) scaleY(${s0sq.sy}) scaleX(${s0sq.sx})`, transformOrigin: `${S0_MASTER.x}px ${S0_MAST_FEET}px`, zIndex: 50 }}>
              <GelWash x={S0_MASTER.x} y={S0_MAST_FEET - 40} w={360} h={300} color={ADVRED} o={0.24 + s0glint * 0.12} blur={54} z={19} />
              <RedMaster lf={lf} x={S0_MASTER.x} y={S0_MAST_FEET} size={170} glint={s0glint} staffAngle={s0staffAngle} />
            </div>
          )}

        </ProvingGround>
      </Cam>

      {/* ---------- PANEL-LOCAL OVERLAYS ---------- */}

      {/* the shadow that sweeps down over the forge before the strike */}
      {s0shadeO > 0.01 && (
        <div style={{ position: "absolute", left: -80, right: -80, top: -260 + s0shadeT * 440, height: 340, background: "linear-gradient(180deg, rgba(6,6,10,0), rgba(6,6,10,0.72), rgba(6,6,10,0))", opacity: s0shadeO, transform: "skewY(-6deg)", zIndex: 70, pointerEvents: "none" }} />
      )}

      {/* the white impact flash */}
      {s0flash > 0.01 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFF6EC", opacity: s0flash, mixBlendMode: "screen", zIndex: 74, pointerEvents: "none" }} />
      )}

      {/* SceneTag */}
      <SceneTag f={lf} text="THE FORGE" color={GLASSCYAN} x={40} y={56} />

      {/* the fighting-game ROUND 1 corner stamp, arrives with the master */}
      {s0roundO > 0.02 && (
        <div style={{ position: "absolute", right: 46, top: 96, transform: `rotate(-8deg) scale(${s0roundPop})`, opacity: s0roundO, zIndex: 78 }}>
          <div style={{ padding: "8px 20px", background: "rgba(24,10,10,0.9)", border: `3px solid ${ADVRED}`, borderRadius: 10, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.02em", color: "#F4E7DE", whiteSpace: "nowrap" }}>ROUND 1</div>
        </div>
      )}

      {/* THE HOOK HEADER (two-tone), solid from f0, lifts before S1 */}
      {/* the hook header is rendered once by the house ChartHeader in the tail,
          over the panel top, so the forge + attack art below stays visible. The
          in-scene white card was removed to stop it covering the pattern interrupt. */}

      {/* the looming master's shadow creeping in from his corner over the forge,
          deepening through the final frames (escalation you can feel, blade still
          the brightest thing). */}
      {s0loom > 0.01 && (
        <div style={{ position: "absolute", right: -120, top: -160, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,4,6,0.5), rgba(8,4,6,0) 66%)", opacity: 0.42 * s0loom + 0.2 * s0loomLate, transform: `scale(${1 + 0.18 * s0loomLate})`, zIndex: 68, pointerEvents: "none", mixBlendMode: "multiply" }} />
      )}

      <Vig o={0.34} />
    </>
  );
};

// ==== part: 11_S1.tsx ====

// ============================================================================
// SCENE 1, THE AGENT GRAPH (reveal). camera GRAPH_WIDE. 106 frames (lf 0..105).
// Takeaway sound-off: the camera cranes up a huge dark cliff and it lights up node
// by node into a dense glowing NETWORK of agents, far bigger than the one forge
// below. A whole vertical world map, receding pads with tiny senseis, web edges
// with climbing amber pulses, hung lanterns, summit banners, the far moon.
//
// AT FRAME 0 (complete, settled, mid-action): the lit forge from S0 is fully
// dressed and glowing at the base (kiln fire, smoke, the cracked blade on the
// anvil, the forge master watching, the tiny novice looking up in awe), the camera
// is ALREADY craning up (cr starts at 0.05), the cliff above is dark with only
// faint lantern dots, the bridge edges are faint, the red master is a small dim
// silhouette wired in mid cliff, rain and embers fall, speed lines streak the
// crane. The node pads (near AND far) are dark and ignite bottom to top. Nothing
// is frozen.
//
// Deliberate deviation: the card asks the summit medallion to "bloom gold", but the
// Continuity Editor (rule 6, outranks the card) forbids ANY gold before S8. So the
// torii + banners + crest bloom in with COOL / oxblood structural light and the
// medallion seal stays LOCKED (dark). No gold is spent here.
// ============================================================================
const S1_PADS = [
  { i: 0, site: SITE.b0, t: 8, accent: "#C56B45" },    // lowest builder pad, lights first
  { i: 1, site: SITE.b1, t: 19, accent: "#B85A3C" },
  { i: 2, site: SITE.b2, t: 40, accent: "#C97A4E" },
  { i: 3, site: SITE.b3, t: 52, accent: "#A85030" },   // highest builder pad, lights last
];
const s1clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// eight amber edges of the graph spine, defined low-node -> high-node, so a pulse
// riding t:0->1 always CLIMBS toward the summit. Mirrors the ProvingGround bridges.
const S1_EDGES: [number, number, number, number][] = [
  [SITE.forge.x - 40, SITE.forge.y - 120, SITE.b0.x, SITE.b0.y],
  [SITE.forge.x + 40, SITE.forge.y - 120, SITE.b1.x, SITE.b1.y],
  [SITE.b0.x, SITE.b0.y, SITE.arena.x, SITE.arena.y],
  [SITE.b1.x, SITE.b1.y, SITE.arena.x, SITE.arena.y],
  [SITE.arena.x, SITE.arena.y, SITE.b2.x, SITE.b2.y],
  [SITE.arena.x, SITE.arena.y, SITE.b3.x, SITE.b3.y],
  [SITE.b2.x, SITE.b2.y, SITE.torii.x - 60, SITE.torii.y + 40],
  [SITE.b3.x, SITE.b3.y, SITE.torii.x + 60, SITE.torii.y + 40],
];

// FAR node-pads receding up the cliff, off to the sides and set back (smaller,
// dimmer, blurred with depth), so the graph reads as a whole dense world map and
// no quadrant stays dark. Each carries its own tiny sensei doing the same job.
const S1_FARPADS = [
  { i: 0, x: 205, y: 1500, t: 6,  s: 0.66, accent: "#C56B45" },
  { i: 1, x: 905, y: 1370, t: 13, s: 0.60, accent: "#B85A3C" },
  { i: 2, x: 120, y: 1050, t: 24, s: 0.56, accent: "#C97A4E" },
  { i: 3, x: 955, y: 1120, t: 33, s: 0.52, accent: "#A85030" },
  { i: 4, x: 128, y: 700,  t: 44, s: 0.46, accent: "#C56B45" },
  { i: 5, x: 892, y: 470,  t: 54, s: 0.42, accent: "#C97A4E" },
];
// faint web edges tying the far pads back into the spine (low -> high anchor).
const S1_FAREDGES: [number, number, number, number][] = [
  [205, 1500, SITE.arena.x, SITE.arena.y],
  [905, 1370, SITE.b0.x, SITE.b0.y],
  [120, 1050, SITE.b2.x, SITE.b2.y],
  [955, 1120, SITE.b3.x, SITE.b3.y],
  [128, 700, SITE.torii.x - 40, SITE.torii.y + 40],
  [892, 470, SITE.torii.x + 60, SITE.torii.y + 40],
];

// hung paper lanterns swaying on the lit cliff, warm and subordinate.
const S1_LANTERNS = [
  { x: 250, y: 520, drop: 62, sz: 24, sd: 1 },
  { x: 770, y: 470, drop: 80, sz: 22, sd: 2 },
  { x: 430, y: 840, drop: 70, sz: 26, sd: 3 },
  { x: 640, y: 1000, drop: 56, sz: 24, sd: 4 },
  { x: 210, y: 1300, drop: 74, sz: 26, sd: 5 },
  { x: 820, y: 1230, drop: 58, sz: 22, sd: 6 },
];

// bright amber DATA PULSES that climb an edge on a perpetual loop, brightening at
// mid-span and fading at each node. Rides on top of the world Bridge's own slower
// pulses so the wiring is never still: the network keeps circulating power right
// through the held tail (fixes the sluggish/frozen dead air).
const S1_DataPulse: React.FC<{ lf: number; x0: number; y0: number; x1: number; y1: number; on: number; n?: number; sd?: number; speed?: number; sc?: number }> =
  ({ lf, x0, y0, x1, y1, on, n = 2, sd = 0, speed = 0.03, sc = 1 }) => {
    if (on <= 0.03) return null;
    const dx = x1 - x0, dy = y1 - y0;
    return (
      <>{Array.from({ length: n }, (_, k) => {
        const ph = k / n + seed(sd + k * 3.1 + 1) * 0.35;
        const t = (lf * speed + ph) % 1;
        const env = Math.sin(t * Math.PI);            // fade in at the low node, out at the high node
        const br = on * (0.28 + 0.72 * env);
        const sz = (8 + 7 * env) * sc;
        return <Glow key={k} x={x0 + dx * t} y={y0 + dy * t} r={sz} hue={AMBER} o={br * 0.75} blur={6} z={19} />;
      })}</>
    );
  };

// a faint far web EDGE (thin light line only, ordered low->high) tying a distant
// pad back to the spine. Kept dim so it stays subordinate depth dressing.
const S1_FarEdge: React.FC<{ lf: number; ax: number; ay: number; bx: number; by: number; on: number }> =
  ({ lf, ax, ay, bx, by, on }) => {
    if (on <= 0.02) return null;
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    return (
      <div style={{ position: "absolute", left: ax, top: ay, width: len, height: 1, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, zIndex: 15, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, top: -1, width: len, height: 2, background: `linear-gradient(90deg, ${AMBER}00, ${AMBER}, ${AMBER}00)`, opacity: 0.08 + on * 0.20 * flick(lf, 0.16, ax), borderRadius: 2, filter: "blur(1px)", mixBlendMode: "screen" }} />
      </div>
    );
  };

// one hung paper LANTERN: rounded gradient body, warm inner core, rim highlight,
// soft drop shadow, swinging on a rope with a live flame flicker.
const S1_Lantern: React.FC<{ lf: number; x: number; y: number; drop?: number; sz?: number; sd?: number; on?: number }> =
  ({ lf, x, y, drop = 66, sz = 26, sd = 0, on = 1 }) => {
    const sway = idle(lf, 5, 84 + sd * 11, sd) * 0.6 + drift(lf, 3, 120, sd) * 0.4;
    const fl = flick(lf, 0.5, sd);
    return (
      <div style={{ position: "absolute", left: x, top: y, transformOrigin: "50% 0%", transform: `rotate(${sway.toFixed(2)}deg)`, zIndex: 31, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: -1, top: 0, width: 2, height: drop, background: ROPE, opacity: 0.5 }} />
        <div style={{ position: "absolute", left: -3, top: drop - 5, width: 6, height: 6, background: "#15100A" }} />
        <div style={{ position: "absolute", left: -sz / 2, top: drop, width: sz, height: sz * 1.2, borderRadius: "46% 46% 42% 42% / 52% 52% 48% 48%", background: `radial-gradient(ellipse at 50% 38%, ${mix(KEY, NEONORANGE, 0.35)}, ${mix(NEONORANGE, "#3A1206", 0.55)})`, opacity: 0.5 + on * 0.42, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.2), 0 4px 9px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: "20%", top: "22%", width: "26%", height: "48%", borderRadius: "50%", background: "rgba(255,240,214,0.55)", filter: "blur(2px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "48%", height: 2, background: "rgba(0,0,0,0.28)" }} />
        </div>
        <Glow x={0} y={drop + sz * 0.7} r={sz * 1.5} hue={NEONORANGE} o={(0.28 + on * 0.32) * fl} blur={13} ry={sz} z={30} />
      </div>
    );
  };

// a hung oxblood BANNER flanking the summit torii, structural cool glyph, swaying.
const S1_Banner: React.FC<{ lf: number; x: number; y: number; h?: number; sd?: number; lit?: number }> =
  ({ lf, x, y, h = 132, sd = 0, lit = 1 }) => {
    const sway = idle(lf, 2.4, 110, sd);
    const w = 44;
    return (
      <div style={{ position: "absolute", left: x, top: y, transformOrigin: "50% 0%", transform: `rotate(${sway.toFixed(2)}deg)`, zIndex: 23, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: -w / 2 - 7, top: -6, width: w + 14, height: 8, background: mix(TORIIRED, "#000000", 0.4), borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -w / 2, top: 0, width: w, height: h, clipPath: "polygon(0 0,100% 0,100% 88%,50% 100%,0 88%)", background: `linear-gradient(180deg, ${mix(TORIIRED, "#C05038", 0.22)}, ${TORIIRED} 55%, ${mix(TORIIRED, "#000000", 0.36)})`, boxShadow: "inset 0 0 16px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", left: "50%", top: 22, width: 15, height: 15, marginLeft: -7.5, transform: "rotate(45deg)", border: `2px solid ${COOL}`, opacity: 0.62 * lit * flick(lf, 0.14, sd) }} />
          <div style={{ position: "absolute", left: "50%", top: 60, width: 3, height: 42, marginLeft: -1.5, background: COOL, opacity: 0.42 * lit }} />
        </div>
      </div>
    );
  };

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- THE CRANE. From a forge framing (continuity with S0) up to GRAPH_WIDE,
  // overshooting the summit by ~8% at ~f81 then settling. Manual lerp (no clamp)
  // so the overshoot can travel PAST the target and settle back exactly onto it.
  const s1From = camFor(506, 1930, 1.12, 0.60);
  const s1To = CAMS.GRAPH_WIDE;
  const cr = interpolate(lf, [0, 79], [0.05, 1], { ...s1clamp, easing: Easing.inOut(Easing.cubic) });
  const os = settle(lf, 81, 0.075, 0.12, 0.085);   // damped overshoot beyond 1, decays to 0
  const k = cr + os;
  const camX = s1From.x + (s1To.x - s1From.x) * k;
  const camY = s1From.y + (s1To.y - s1From.y) * k;
  const camZ = s1From.z + (s1To.z - s1From.z) * k;
  const sh = shakeCam(lf, [], 1.15);               // the camera is a character, always alive
  // NEVER DEAD STOP: a persistent breathing drift on the whole crane, plus a hair of
  // continued push after the summit settles so the held network keeps living to f105.
  const s1camDrift = { x: drift(lf, 4.2, 155, 0.4), y: drift(lf, 5.0, 195, 1.2) };
  const s1creep = 1 + lerpv((lf - 83) / 22, 0, 1) * 0.02 + (breathe(lf, 0.003, 150) - 1);

  // ---- crane speed, drives the speed lines and a hair of extra rain (fast fall) ----
  const craneSpeed = interpolate(lf, [0, 8, 60, 81, 94], [0.55, 0.85, 0.85, 0.12, 0], s1clamp);

  // ---- network state driven by the rising camera ----
  const padLit = S1_PADS.map((p) => over(lf, p.t, 14, Easing.out(Easing.cubic)));
  const bridgeActive = interpolate(lf, [6, 64], [0.14, 1], { ...s1clamp, easing: Easing.out(Easing.quad) });
  const gateLit = interpolate(lf, [64, 87], [0.18, 1], { ...s1clamp, easing: Easing.out(Easing.cubic) });
  // the lone red pad glints on mid cliff, low and subordinate (red is the master's alone)
  const redPadLit = interpolate(lf, [38, 53], [0, 0.32], s1clamp);
  // a first NAMED glint at ~f54, then the pad keeps faintly catching the light through
  // the held network (subordinate spike at ~f96) so the lone red is alive, never dead.
  const redGlint = interpolate(lf, [49, 55, 62], [0, 1, 0], s1clamp)
    + Math.pow(Math.max(0, Math.sin((lf - 40) / 7.4)), 10) * 0.5;

  // ---- the 90% watermark filling the lit cliff, arriving as the network completes ----
  const wmIn = over(lf, 64, 22, Easing.out(Easing.cubic));
  const wmScale = 0.72 + wmIn * 0.34 + settle(lf, 85, 0.05, 0.12, 0.1)
    + (breathe(lf, 0.008, 76) - 1);   // keeps subtly breathing after it lands, never a frozen plate

  // ---- the summit chip ----
  const chipIn = over(lf, 76, 12, Easing.out(Easing.back(1.7)));

  return (
    <>
      <Cam x={camX + sh.x + s1camDrift.x} y={camY + sh.y + s1camDrift.y} z={camZ * sh.z * s1creep}>
        <ProvingGround
          lf={lf}
          padLit={padLit}
          redPadLit={redPadLit}
          bridgeActive={bridgeActive}
          forgeHot={1}
          gateLit={gateLit}
          sealUnlocked={0}
          moonGlow={1}
          rain={1}
          embers={0.85}
          warm={0}
        >
          {/* ---- FAR web edges tying the distant pads into the spine, drawn first
              (deepest), each with a slow climbing pulse so even the depth is alive ---- */}
          {S1_FAREDGES.map((e, i) => {
            const lo = e[1] >= e[3] ? { x: e[0], y: e[1] } : { x: e[2], y: e[3] };
            const hi = e[1] >= e[3] ? { x: e[2], y: e[3] } : { x: e[0], y: e[1] };
            const on = bridgeActive * (over(lf, S1_FARPADS[i].t, 12) * 0.7 + 0.3);
            return (
              <React.Fragment key={"fe" + i}>
                <S1_FarEdge lf={lf} ax={e[0]} ay={e[1]} bx={e[2]} by={e[3]} on={on} />
                <S1_DataPulse lf={lf} x0={lo.x} y0={lo.y} x1={hi.x} y1={hi.y} on={on} n={1} sc={0.62} sd={i * 5 + 2} speed={0.020 + seed(i + 3) * 0.010} />
              </React.Fragment>
            );
          })}

          {/* ---- FAR node-pads igniting bottom-to-top, small / dim / depth-blurred,
              each popping its own tiny sensei so the world reads densely populated ---- */}
          {S1_FARPADS.map((fp) => {
            const lit = over(lf, fp.t, 12, Easing.out(Easing.cubic));
            const charge = interpolate(lf, [fp.t - 6, fp.t], [0, 1], s1clamp);
            const fl = interpolate(lf, [fp.t, fp.t + 3, fp.t + 16], [0, 1, 0], s1clamp);
            const sc = overshoot(lf, fp.t + 2, 16, 0.15);
            const op = over(lf, fp.t, 6, Easing.out(Easing.cubic));
            const forging = over(lf, fp.t + 14, 12);
            const landRock = settle(lf, fp.t + 4, 3.6, 0.16, 0.13);
            const depthBlur = Math.max(0, (0.68 - fp.s) * 7);
            const depthOp = 0.58 + fp.s * 0.36;
            const r = 60 + fp.s * 30;
            return (
              <div key={"fp" + fp.i} style={{ position: "absolute", left: 0, top: 0, zIndex: 17, opacity: depthOp, filter: `blur(${depthBlur.toFixed(2)}px)` }}>
                {charge > 0.01 && charge < 0.999 && <Glow x={fp.x} y={fp.y - 2} r={30 + charge * 26} hue={AMBER} o={charge * charge * 0.34} blur={12} ry={18} />}
                {fl > 0.01 && <Glow x={fp.x} y={fp.y} r={80} hue={AMBER} o={fl * 0.6} blur={16} ry={40} />}
                {lf >= fp.t && lf < fp.t + 16 && <GroundRing lf={lf} at={fp.t + 1} x={fp.x} y={fp.y + 8} r={82} dur={14} hue="rgba(226,182,120,0.5)" z={18} />}
                <Sparkles lf={lf} at={fp.t + 1} x={fp.x} y={fp.y - 4} n={6} life={18} spread={54} rise={46} hue={AMBER} sd={fp.i * 7 + 21} z={19} />
                <NodePad lf={lf} x={fp.x} y={fp.y} r={r} lit={lit} hue={NODEBLUE} />
                {op > 0.01 && (
                  <div style={{ position: "absolute", left: fp.x, top: fp.y - 4, transformOrigin: "0 100%", transform: `scale(${Math.max(0.01, sc)}) rotate(${landRock.toFixed(2)}deg)`, opacity: op, zIndex: 18 }}>
                    <Sensei lf={lf} x={0} y={0} size={72 + fp.s * 54} accent={fp.accent} forging={forging} />
                  </div>
                )}
              </div>
            );
          })}

          {/* swaying hung lanterns on the lit cliff, warm subordinate life in the gaps */}
          {S1_LANTERNS.map((L) => (
            <S1_Lantern key={"ln" + L.sd} lf={lf} x={L.x} y={L.y} drop={L.drop} sz={L.sz} sd={L.sd} on={bridgeActive} />
          ))}

          {/* continuity: the forge master watching from the base, the cracked glowing
              blade carried across the cut on the anvil, and the tiny NOVICE (the
              viewer stand-in) at his feet, looking up in awe at the reveal */}
          <Blade lf={lf} x={506} y={1892} temper={1} crack={1} glow={1} reflect={0.4} s={0.7} rot={-4} />
          <ForgeMaster lf={lf} x={598} y={1952} size={168} hammer={1} gaze={-2} proud={0.14} />
          <Novice lf={lf} x={410} y={1958} size={78} cheer={over(lf, 30, 20) * 0.3} />

          {/* the builder pads igniting bottom to top: an amber flare, a warm sensei
              popping onto the pad with overshoot, then it starts hammering */}
          {S1_PADS.map((p) => {
            const charge = interpolate(lf, [p.t - 8, p.t], [0, 1], s1clamp);   // energy GATHERS before it lights (anticipation)
            const fl = interpolate(lf, [p.t, p.t + 3, p.t + 20], [0, 1, 0], s1clamp);
            const sc = overshoot(lf, p.t + 2, 18, 0.16);
            const op = over(lf, p.t, 6, Easing.out(Easing.cubic));
            const forging = over(lf, p.t + 16, 12);
            const landRock = settle(lf, p.t + 4, 4.2, 0.16, 0.12);   // follow-through wobble as it plants
            return (
              <React.Fragment key={p.i}>
                {/* the pre-ignition charge: a small tight glow swelling up, then the burst */}
                {charge > 0.01 && charge < 0.999 && <Glow x={p.site.x} y={p.site.y - 2} r={52 + charge * 40} hue={AMBER} o={charge * charge * 0.4} blur={16} ry={30} />}
                {fl > 0.01 && <Glow x={p.site.x} y={p.site.y} r={132} hue={AMBER} o={fl * 0.72} blur={20} ry={64} />}
                {/* weight on contact: a shockwave ring pushes out and amber sparks scatter, drawing the eye to the newly lit node */}
                {lf >= p.t && lf < p.t + 20 && <GroundRing lf={lf} at={p.t + 1} x={p.site.x} y={p.site.y + 12} r={128} dur={17} hue="rgba(226,182,120,0.55)" z={23} />}
                <Sparkles lf={lf} at={p.t + 1} x={p.site.x} y={p.site.y - 4} n={10} life={22} spread={92} rise={72} hue={AMBER} sd={p.i * 9 + 3} z={47} />
                {op > 0.01 && (
                  <div style={{ position: "absolute", left: p.site.x, top: p.site.y - 6, transformOrigin: "0 100%", transform: `scale(${Math.max(0.01, sc)}) rotate(${landRock.toFixed(2)}deg)`, opacity: op }}>
                    <Sensei lf={lf} x={0} y={0} size={150} accent={p.accent} forging={forging} />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* the graph EDGES circulating amber power: pulses that climb toward the
              summit, intensifying as the bridges draw in, and never stopping through
              the hold. This is the "network is alive" read and the dead-air fix. */}
          {S1_EDGES.map((e, k) => (
            <S1_DataPulse key={"dp" + k} lf={lf} x0={e[0]} y0={e[1]} x1={e[2]} y1={e[3]} on={bridgeActive} sd={k * 2 + 1} speed={0.028 + seed(k + 2) * 0.012} />
          ))}

          {/* network HEARTBEAT: a soft core swell travelling up the lit pads on a
              loop (phased by index), so the whole graph keeps breathing after the
              summit settles and each node reads as a live agent, never a dead light */}
          {S1_PADS.map((p, i) => {
            const beat = Math.pow(Math.max(0, Math.sin((lf - p.t) / 13 - i * 0.8)), 6);
            const hb = padLit[i] * beat;
            return hb > 0.02 ? <Glow key={"hb" + i} x={p.site.x} y={p.site.y - 6} r={54 + beat * 20} hue={AMBER} o={hb * 0.34} blur={16} ry={30} z={25} /> : null;
          })}

          {/* the red master, small and dim, already wired in on its mid cliff pad,
              eyes hidden, one faint off grid glint at ~f55 */}
          {over(lf, 38, 8) > 0.01 && (
            <div style={{ position: "absolute", left: SITE.red.x, top: SITE.red.y - 6, transformOrigin: "0 100%", transform: `scale(${Math.max(0.01, overshoot(lf, 40, 15, 0.1))})`, opacity: over(lf, 38, 8) }}>
              <RedMaster lf={lf} x={0} y={0} size={140} glint={redGlint} staffAngle={-24} />
            </div>
          )}

          {/* summit dressing: two oxblood BANNERS flanking the torii, sway in, cool glyph */}
          {gateLit > 0.15 && (
            <>
              <S1_Banner lf={lf} x={SITE.torii.x - 118} y={302} h={130} sd={2} lit={over(lf, 66, 16)} />
              <S1_Banner lf={lf} x={SITE.torii.x + 118} y={302} h={130} sd={5} lit={over(lf, 70, 16)} />
            </>
          )}

          {/* the torii bloom flare: COOL structural light only, medallion stays locked.
              Blooms wider and adds a crest boost synced to the camera overshoot at ~f81
              so the summit clearly ARRIVES as the crane crests, then a cool structural
              sparkle scatter marks the landing (COOL, never gold before S8). */}
          {gateLit > 0.2 && (
            <>
              <Glow x={SITE.torii.x} y={SITE.torii.y - 120} r={230 + over(lf, 81, 12) * 44} hue={COOL} o={(over(lf, 64, 20) * 0.3 + Math.max(0, settle(lf, 83, 0.09, 0.12, 0.1))) * flick(lf, 0.12)} blur={44} ry={190} z={19} />
              <Glow x={SITE.torii.x} y={SITE.torii.y - 80} r={112} hue={COOL} o={over(lf, 68, 16) * 0.34 * flick(lf, 0.1)} blur={22} ry={90} z={21} />
              {/* a cool geometric crest emblem crowning the gate (structural, not gold) */}
              <div style={{ position: "absolute", left: SITE.torii.x - 26, top: SITE.torii.y - 176 + (1 - over(lf, 70, 14, Easing.out(Easing.back(1.6)))) * -16, width: 52, height: 52, transform: `rotate(45deg) scale(${Math.max(0.01, over(lf, 70, 14, Easing.out(Easing.back(1.6))))})`, opacity: over(lf, 70, 12) * 0.8, zIndex: 25 }}>
                <div style={{ position: "absolute", inset: 0, border: `3px solid ${COOL}`, background: "rgba(40,62,86,0.35)" }} />
                <div style={{ position: "absolute", inset: 12, border: `2px solid ${mix(COOL, "#FFFFFF", 0.25)}`, opacity: 0.7 * flick(lf, 0.1) }} />
              </div>
              <Sparkles lf={lf} at={66} x={SITE.torii.x} y={SITE.torii.y - 44} n={12} life={30} spread={150} rise={70} hue={COOL} sd={91} z={53} />
            </>
          )}

          {/* the tiny 10% carved marker, down at the forge, receding far below */}
          <div style={{ position: "absolute", left: SITE.forge.x - 118, top: SITE.forge.y + 26, width: 118, height: 58, borderRadius: 8, background: "linear-gradient(180deg, #3A4251, #1A1F28)", border: "2px solid rgba(150,140,120,0.4)", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(-3deg)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.08)" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#CFC6B4", opacity: 0.85 * flick(lf, 0.12) }}>10%</span>
          </div>
        </ProvingGround>
      </Cam>

      {/* ---- panel-local overlays (outside the camera) ---- */}
      {/* vertical crane speed lines, geometric streaks past the lens */}
      <SpeedLines lf={lf} x={0} y={0} w={1012} h={792} dir={90} n={18} on={craneSpeed} hue="rgba(150,182,206,0.5)" z={70} />

      {/* the big translucent 90% filling the lit cliff, far bigger than the 10% below */}
      {wmIn > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", zIndex: 66, pointerEvents: "none" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 320, lineHeight: 1, color: "rgba(224,232,244,0.92)", opacity: wmIn * 0.17 * flick(lf, 0.05), transform: `scale(${wmScale})`, letterSpacing: "-0.03em", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>90%</span>
        </div>
      )}

      {/* the summit chip, subordinate, near the top once the gate blooms */}
      {chipIn > 0.02 && (
        <div style={{ position: "absolute", left: 300, top: 226, zIndex: 90, opacity: Math.min(1, chipIn), transform: `translateY(${(1 - chipIn) * -12 + idle(lf, 1.6, 82)}px) scale(${(0.9 + chipIn * 0.1) * breathe(lf, 0.012, 94)})` }}>
          <Chip text="EVERYONE IS BUILDING THIS" bg="rgba(18,26,40,0.9)" bd={mix(GLASSCYAN, "#1A2130", 0.35)} fg="#E3ECF4" size={22} />
        </div>
      )}

      <SceneTag f={lf} text="THE AGENT GRAPH" color={GLASSCYAN} />
      <Vig o={0.32} />
    </>
  );
};

// ==== part: 12_S2.tsx ====

// ============================================================================
// SCENE 2, BUILD ONE (camera FORGE). Local lf 0..29 (NEW 30-frame budget).
// Takeaway, sound off in under 2s: back at the forge, a raw white-hot INGOT is
// hammered into a rough blade in three quick, weighty strikes. Ends mid strike.
//
// AT FRAME 0 (mid action, fully dressed): the punch-in camera is settling onto
// the base forge; the forge-master is caught mid downswing, his driven hammer
// already arcing toward a raw white-hot INGOT clamped in TONGS on the anvil
// (temper 0, build ~0.30, warm orange glow, heat-smoke rising). Around him the
// forge is fully dressed: kiln flames flicker, a wall TOOL-RACK of spare tongs
// and a hammer sways, a wooden QUENCH bucket steams beside the anvil, hot scale
// scatters. Behind, the live graph reads (lit bridges with amber data-pulses,
// the dark wired-in red pad in the depth), rain streaks fall, embers rise,
// foreground lanterns parallax, the moon and ridge drift, the novice watches
// from the pad edge and FLINCHES on every strike. The subordinate build-plan
// SCROLL and the StatusZip meter arrive after f6. At f29 the hammer is still
// descending toward a fourth, un-landed strike.
//
// House rules: over() is FRAMES; no reversed ramp (plain s2lerp for falls); seed
// only; menace-red only on the mandated always-wired master edge; gold withheld
// (blade caps at temper 1, no gold anywhere); matte palette (glows are blurred
// ellipses / screen blend, never coloured boxShadow halos).
// ============================================================================

const S2_C = [4, 14, 24];            // the three staggered hammer contacts inside the window.
const s2lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));
// a decaying spike right after a contact, for the blaze pulse and the weight flash.
const s2spike = (f: number, c: number, len = 7) => (f >= c && f < c + len) ? Math.pow(1 - (f - c) / len, 1.5) : 0;

// forge-shop palette (unique names, nothing redeclared).
const S2_STEEL = "#828A96", S2_STEELLO = "#282C34";
const S2_WOOD = "#6E4A2E", S2_WOODLO = "#3A271A";
const S2_STEAM = "rgba(200,212,224,0.5)";

// the hammer HEAD world position: raised -> contact -> raised, accelerating on the
// way down (weight), easing on the recovery. A fourth contact at 33 keeps it
// descending past the cut so the scene ends mid strike.
const S2_RUP: [number, number] = [458, 1720];
const S2_RDN: [number, number] = [513, 1820];
const s2Head = (f: number): [number, number] => {
  for (const c of [4, 14, 24, 33]) {
    if (f > c - 6 && f <= c) { const t = over(f, c - 6, 6, Easing.in(Easing.quad)); return [s2lerp(S2_RUP[0], S2_RDN[0], t), s2lerp(S2_RUP[1], S2_RDN[1], t)]; }
    if (f > c && f <= c + 5) { const t = over(f, c, 5, Easing.out(Easing.cubic)); return [s2lerp(S2_RDN[0], S2_RUP[0], t), s2lerp(S2_RDN[1], S2_RUP[1], t)]; }
  }
  return S2_RUP;
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- camera: quick punch-in that settles onto FORGE, plus live handheld and a
  // decaying shake on each of the three contacts (heavier each time). ----
  const base = CAMS.FORGE;
  const punched = camFor(506, 1958, base.z * 1.13, 0.62);
  const setl = over(lf, 0, 9, Easing.out(Easing.cubic));
  const cam0 = lerpCam(punched, base, setl);
  const sh = shakeCam(lf, [{ at: 4, amp: 6 }, { at: 14, amp: 7.5 }, { at: 24, amp: 9 }], 1);
  const cam = { x: cam0.x + sh.x, y: cam0.y + sh.y, z: cam0.z * sh.z };

  // ---- hammer head + connecting handle toward the master's hand. ----
  const [hx, hy] = s2Head(lf);
  const [phx, phy] = s2Head(lf - 1);
  const vdx = hx - phx, vdy = hy - phy;
  const handX = 448, handY = 1875;
  const hAng = Math.atan2(handY - hy, handX - hx) * 180 / Math.PI;
  const hLen = Math.hypot(handX - hx, handY - hy);
  const s2phase = Math.max(0, Math.min(1, (hy - S2_RUP[1]) / (S2_RDN[1] - S2_RUP[1])));  // 0 raised, 1 at anvil.
  const leanDeg = -2 + s2phase * 8;

  // ---- the job on the anvil: raw white-hot ingot growing into a rough blade. ----
  const s2build = interpolate(lf, [0, 4, 14, 24, 29], [0.30, 0.42, 0.58, 0.72, 0.76], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s2temper = lf < 18 ? 0 : 1;                 // raw ingot, then rough dark blade.
  const s2heat = lf < 18 ? 0.52 : 0.30;
  const s2lastC = lf >= 24 ? 24 : lf >= 14 ? 14 : 4;
  const sq = squash(lf, s2lastC, 0.18, 3);

  // per-contact decaying jolt used to jitter the tongs and pulse the novice.
  const s2hit = Math.max(s2spike(lf, 4), s2spike(lf, 14), s2spike(lf, 24));
  const s2tong = (s2spike(lf, 4) - s2spike(lf, 14) + s2spike(lf, 24)) * 5;  // signed rattle.

  // ---- forge blaze pulses on the contacts (sparks off the anvil kiln line). ----
  const s2blaze = s2hit;

  // ---- subordinate retention beats ----
  const s2roll = over(lf, 6, 12, Easing.out(Easing.cubic));         // scroll unroll.

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround
          lf={lf}
          padLit={[0.55, 0.55, 0.5, 0.5]}
          redPadLit={0}
          bridgeActive={1}
          forgeHot={1}
          blaze={s2blaze}
          gateLit={0.5}
          sealUnlocked={0}
          moonGlow={1}
          rain={1}
          embers={1}
          warm={0.35}
        >
          {/* wall TOOL-RACK on the kiln stone: a plank with a spare hammer and a
              pair of tongs hanging, swaying a touch and jolting on each strike */}
          <div style={{ position: "absolute", left: 262, top: 1772, transform: `rotate(${idle(lf, 0.8, 120) + s2tong * 0.4}deg)`, transformOrigin: "50% 0%", zIndex: 21 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 12, background: `linear-gradient(180deg,${S2_WOOD},${S2_WOODLO})`, borderRadius: 3, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12), 0 4px 6px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 16, top: 10, width: 9, height: 58, background: "#5A4228", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: 6, top: 62, width: 30, height: 17, background: `linear-gradient(180deg,${S2_STEEL},${S2_STEELLO})`, borderRadius: 3, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)" }} />
            <div style={{ position: "absolute", left: 66, top: 10, width: 6, height: 66, background: "#4A3A22", borderRadius: 2, transform: "rotate(6deg)" }} />
            <div style={{ position: "absolute", left: 72, top: 10, width: 6, height: 66, background: "#4A3A22", borderRadius: 2, transform: "rotate(-6deg)" }} />
          </div>

          {/* wooden QUENCH bucket beside the anvil, water skinned, steaming */}
          <div style={{ position: "absolute", left: 600, top: 1934, zIndex: 43 }}>
            <div style={{ position: "absolute", left: -2, top: 44, width: 72, height: 12, borderRadius: "50%", background: "rgba(0,0,0,0.4)", filter: "blur(3px)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 68, height: 50, clipPath: "polygon(8% 0,92% 0,100% 100%,0 100%)", background: `linear-gradient(180deg,${S2_WOOD},${S2_WOODLO})`, borderRadius: "4px 4px 6px 6px", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.12), inset -8px 0 12px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 6, top: 4, width: 56, height: 10, borderRadius: "50%", background: `radial-gradient(ellipse at 40% 40%, ${S2_STEAM}, ${"#2E4150"})`, opacity: 0.9 }} />
            <div style={{ position: "absolute", left: 2, top: 16, width: 64, height: 5, background: S2_WOODLO, opacity: 0.7 }} />
          </div>
          <Smoke lf={lf} x={634} y={1936} w={66} h={128} hue={S2_STEAM} o={0.42} bands={4} z={44} />

          {/* heat shimmer rising off the hot steel on the anvil */}
          <Smoke lf={lf} x={513} y={1888} w={94} h={150} hue="rgba(206,150,96,0.42)" o={s2heat} bands={4} z={45} />

          {/* THE JOB, squashing on each contact, anchored at its base on the anvil */}
          <div style={{ position: "absolute", left: 513, top: 1900, transformOrigin: "50% 100%", transform: `scale(${sq.sx}, ${sq.sy})`, zIndex: 46 }}>
            <Blade lf={lf} x={0} y={0} temper={s2temper} build={s2build} crack={0} glow={1} reflect={0.45} s={0.8} />
          </div>

          {/* TONGS gripping the ingot base, arm running back to the master's hand,
              jaws rattling on each strike */}
          <div style={{ position: "absolute", left: 513, top: 1902, zIndex: 48 }}>
            <div style={{ position: "absolute", left: -58, top: 6, width: 66, height: 9, background: `linear-gradient(180deg,${S2_STEEL},${S2_STEELLO})`, borderRadius: 4, transformOrigin: "100% 50%", transform: `rotate(${34 + s2tong * 0.6}deg)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18)" }} />
            <div style={{ position: "absolute", left: -14, top: -12, width: 22, height: 7, background: S2_STEEL, borderRadius: 3, transformOrigin: "100% 50%", transform: `rotate(${-16 + s2tong}deg)` }} />
            <div style={{ position: "absolute", left: -14, top: 5, width: 22, height: 7, background: S2_STEELLO, borderRadius: 3, transformOrigin: "100% 50%", transform: `rotate(${16 - s2tong}deg)` }} />
            <div style={{ position: "absolute", left: 4, top: -4, width: 8, height: 8, borderRadius: "50%", background: "#3A414C", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }} />
          </div>

          {/* THE HERO forge-master, leaning into each strike (his own hammer hidden;
              the driven hammer below is the one that lands on frame-exact beats) */}
          <div style={{ position: "absolute", left: 388, top: 1998, transformOrigin: "50% 100%", transform: `rotate(${leanDeg}deg)`, zIndex: 47 }}>
            <ForgeMaster lf={lf} x={0} y={0} size={176} hammer={0} forging={0} gaze={3} proud={0.15} />
          </div>

          {/* THE DRIVEN HAMMER: head on an accelerating arc, handle pointing back to
              the master's hand, motion-smeared on the fast downswing */}
          <div style={{ position: "absolute", left: hx, top: hy, zIndex: 51 }}>
            <div style={{ position: "absolute", left: 0, top: -5, width: hLen + 10, height: 11, background: "linear-gradient(180deg,#8A6A42,#5E441F)", borderRadius: 3, transformOrigin: "0 50%", transform: `rotate(${hAng}deg)`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.16)" }} />
            <Smear dx={vdx} dy={vdy} ghosts={3} on={1} o={0.28} stretch={1.22}>
              <div style={{ position: "absolute", left: -25, top: -17, width: 54, height: 34, background: "linear-gradient(180deg,#828A96,#282C34)", borderRadius: 5, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.22), inset 0 -6px 10px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", left: -25, top: -17, width: 54, height: 7, background: "rgba(214,222,232,0.5)", borderRadius: 5 }} />
            </Smear>
          </div>

          {/* per-contact WEIGHT package at the hit point: flash, anvil ring, sparks */}
          {S2_C.map((c) => <Glow key={"fl" + c} x={513} y={1820} r={80} hue="#FFE9C6" o={s2spike(lf, c, 5) * 0.85} blur={14} z={49} ry={40} />)}
          {S2_C.map((c) => {
            const t = (lf - c) / 12;
            if (t <= 0 || t >= 1) return null;
            const e = over(lf, c, 12, Easing.out(Easing.poly(5)));
            const rr = 10 + e * 74;
            return <div key={"rg" + c} style={{ position: "absolute", left: 513 - rr, top: 1820 - rr * 0.34, width: rr * 2, height: rr * 0.68, borderRadius: "50%", border: `${Math.max(1, 4 * (1 - e)).toFixed(1)}px solid rgba(246,233,200,${((1 - t) * 0.7).toFixed(2)})`, filter: "blur(1px)", mixBlendMode: "screen", zIndex: 48 }} />;
          })}
          {S2_C.map((c, i) => <Sparkles key={"sk" + c} lf={lf} at={c} x={513} y={1820} n={13} life={22} spread={140} rise={92} hue={KEY} sd={i * 4} z={50} />)}
          {S2_C.map((c, i) => <Sparkles key={"so" + c} lf={lf} at={c} x={513} y={1820} n={9} life={26} spread={170} rise={70} hue={NEONORANGE} sd={i * 4 + 2} z={50} />)}
          {/* a low skittering fan of cooling scale, ground-hugging */}
          {S2_C.map((c, i) => <Sparkles key={"sc" + c} lf={lf} at={c + 1} x={524} y={1898} n={7} life={20} spread={150} rise={26} hue="#C98A54" sd={i * 3 + 6} z={45} o={0.8} />)}

          {/* the viewer stand-in, watching the work take shape and flinching on hits */}
          <Novice lf={lf} x={712} y={1992} size={72} flinch={Math.min(1, s2hit * 0.7)} />
        </ProvingGround>
      </Cam>

      {/* ---- screen-space overlays (crisp UI, panel-local coords) ---- */}
      {/* punch-in speed lines, decaying over the first few frames */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none", opacity: Math.max(0, 1 - lf / 7) }}>
        <SpeedLines lf={lf} x={0} y={0} w={1012} h={792} dir={0} n={14} on={Math.max(0, 1 - lf / 7)} hue="rgba(224,206,170,0.42)" />
      </div>

      <SceneTag f={lf} text="BUILD ONE" color={AMBER} />

      {/* the build-plan SCROLL unrolling in the air (training-montage beat): a
          rolled parchment carrying the three-node graph plan, geometric */}
      {s2roll > 0.01 && (
        <div style={{ position: "absolute", left: 566, top: 300, zIndex: 59, opacity: Math.min(1, s2roll * 2.4) }}>
          <div style={{ position: "absolute", left: -14, top: -6, width: 16, height: 118, borderRadius: 8, background: "linear-gradient(90deg,#8A6A42,#5E441F)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)" }} />
          <div style={{ position: "absolute", left: 254 * s2roll - 2, top: -6, width: 16, height: 118, borderRadius: 8, background: "linear-gradient(90deg,#8A6A42,#5E441F)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.2)" }} />
          <div style={{ position: "absolute", left: 2, top: 2, width: 254 * s2roll, height: 102, background: "linear-gradient(180deg,#F1E6CC,#D9C79E)", borderRadius: 4, overflow: "hidden", boxShadow: "inset 0 0 26px rgba(120,92,44,0.28)" }}>
            {[0.22, 0.5, 0.78].map((px, i) => {
              const on = over(lf, 8 + i * 3, 5, Easing.out(Easing.back(2)));
              const dx = px * 254 * s2roll;
              return (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ position: "absolute", left: (px - 0.28) * 254 * s2roll, top: 50, width: 0.28 * 254 * s2roll, height: 3, background: "#B7986A", opacity: on * 0.8 }} />}
                  <div style={{ position: "absolute", left: dx - 9, top: 42, width: 18, height: 18, borderRadius: "50%", background: NODEBLUE, border: "3px solid #24507F", opacity: on, transform: `scale(${0.4 + on * 0.6})` }} />
                </React.Fragment>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 6, top: -32 }}><Chip text="STEP 1" bg="rgba(30,22,10,0.82)" bd={AMBER} fg="#F6EBD4" size={22} /></div>
        </div>
      )}

      {/* the per-scene StatusZip (this counter-less scene's one meter), snapping a
          teal check a few frames before the cut */}
      <StatusZip lf={lf} x={320} y={722} w={372} start={6} dur={16} hue={GLASSCYAN} label="PLAN" />

      <Vig o={0.34} />
    </>
  );
};

// ==== part: 13_S3.tsx ====

// ============================================================================
// SCENE 3 - THE TEAM (twist plant) - camera TEAM_ROW - 97 frames (lf 0..96)
// Takeaway (sound off): Claude splits into a small team of identical smiths on
// connected platforms wired by glowing bridges, and one platform off to the side
// glows faintly red.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action):
//  - Camera easing from a tight HERO frame out toward the mid-tier TEAM frame.
//  - The forge master stands centre on the lit arena pad, mid idle-hammer,
//    a cool white SPLIT-CHARGE ring already gathering around him (pre-action).
//  - The four builder pads (b0,b1,b2,b3) sit dark, waiting to ignite, each with a
//    faint wet sheen on the stone below catching the node light.
//  - The fifth (red) pad is dark, but its crimson bridge is ALREADY wired into
//    the graph (ProvingGround floors the red edge at 0.12), per continuity rule 7,
//    and a lone crimson data-mote already creeps up that edge toward the corner.
//  - Live atmosphere: rain streaks, rising embers, amber bridge data-pulses,
//    two warm mid-tier lanterns, forge flicker below, moon + lantern flicker,
//    parallax fore silhouettes.
//  - The novice cameo watches from a corner ledge; SceneTag animating in.
// No gold anywhere (reserved S8+). Red belongs only to the master's pad/edge.
// ============================================================================

const S3_TEAM = [
  { pad: SITE.b1, accent: "#C56B45", i: 0 }, // lower-left
  { pad: SITE.b0, accent: "#B85C3E", i: 1 }, // lower-right
  { pad: SITE.b2, accent: "#CE7A4E", i: 2 }, // upper-left
  { pad: SITE.b3, accent: "#C1663F", i: 3 }, // upper-right
];

// the blade relay: hand to hand down the wired line, all arcs, contiguous hops.
const S3_HOPS = [
  { a: SITE.b1, b: SITE.arena, s: 38, d: 12 },
  { a: SITE.arena, b: SITE.b0, s: 50, d: 12 },
  { a: SITE.b0, b: SITE.b3, s: 62, d: 11 },
];
const S3_HOLD = 34; // the blade is forged and appears on b1 here

// recurring anvil-strike beats spanning the team-work window; a per-sensei
// offset desyncs them so the four never strike as one machine. Denser through
// f58..f74 so the old dead window is a visible drumroll of labour.
const S3_STRIKES = [30, 38, 46, 54, 60, 65, 70, 74];

// point along a wired edge at parameter t (0..1), in world coords. Used to send a
// travelling data-mote racing the blade down whichever bridge is live.
const s3Along = (a: { x: number; y: number }, b: { x: number; y: number }, t: number) => ({
  x: a.x + (b.x - a.x) * Math.max(0, Math.min(1, t)),
  y: a.y + (b.y - a.y) * Math.max(0, Math.min(1, t)),
});

// which builder is actively hammering the parcel in a given window (never
// role-coded: all four do the identical job). Every builder hammers CONTINUOUSLY
// right through the mid window once it lands, then the whole team calms in
// unison for the twist beat so the red reveal owns the frame.
const s3Forging = (i: number, lf: number) => {
  if (lf >= 76) return 0; // calm the team so the red reveal owns the frame
  return lf >= 26 + i * 4 ? 1 : 0; // start just after it lands, staggered, then never stop
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA (TEAM_ROW): tight on the hero, pull to the mid-tier as he splits,
  //      then a slow pan toward the dark fifth pad on the twist clause. ----
  const S3_CAM_HERO = { x: -180, y: 380, z: 0.80 };
  const S3_CAM_MAIN = { x: -196.8, y: 341, z: 0.72 };
  const S3_CAM_RED = { x: -168, y: 356, z: 0.72 };
  let base;
  if (lf < 18) base = lerpCam(S3_CAM_HERO, S3_CAM_MAIN, over(lf, 0, 18, Easing.out(Easing.cubic)));
  else if (lf < 73) {
    // never locked: a slow live drift + breathing push while the team works,
    // plus a gentle pre-look easing toward the red corner from f54 so the camera
    // is already travelling (anticipation) before the twist pan takes over.
    const push = over(lf, 18, 55, Easing.inOut(Easing.sin)) * 0.03;
    const preLook = over(lf, 54, 19, Easing.inOut(Easing.sin)) * 9;
    base = {
      x: S3_CAM_MAIN.x + drift(lf, 5.5, 150) + preLook,
      y: S3_CAM_MAIN.y + drift(lf, 4, 120, 1.3) - preLook * 0.4,
      z: S3_CAM_MAIN.z * (breathe(lf, 0.006, 190) + push),
    };
  } else {
    // pan to the red corner, dur 26 so it is STILL travelling at f96 (never a
    // dead stop), with its own drift underneath.
    const b = lerpCam(S3_CAM_MAIN, S3_CAM_RED, over(lf, 73, 26, Easing.inOut(Easing.sin)));
    base = { x: b.x + drift(lf, 3, 140), y: b.y + drift(lf, 2.5, 110, 1), z: b.z };
  }
  const sc = shakeCam(lf, [{ at: 13, amp: 6, dur: 13 }, { at: 73, amp: 3, dur: 10 }]);
  const cam = { x: base.x + sc.x, y: base.y + sc.y, z: base.z * sc.z };

  // ---- the katana light-sweep that severs the hero into the team ----
  const sweepP = over(lf, 9, 7, Easing.out(Easing.poly(5)));
  const sweepX = lerpv(sweepP, -260, 1300);
  const sweepOn = lf >= 8 && lf <= 20;
  const flash = Math.max(0, Math.sin(over(lf, 11, 6) * Math.PI)) * (lf < 18 ? 1 : 0);

  // ---- hero split state ----
  const heroOp = 1 - over(lf, 11, 4);
  const heroBurst = 1 + over(lf, 11, 4, Easing.out(Easing.cubic)) * 0.18;
  const chargeO = over(lf, 0, 11) * (1 - over(lf, 11, 4));

  // ---- blade relay position (world coords, inside Cam) ----
  let bx = SITE.b1.x, by = SITE.b1.y - 30, brot = idle(lf, 4, 70), bfly = 0;
  const last = S3_HOPS[S3_HOPS.length - 1];
  if (lf >= last.s + last.d) {
    bx = last.b.x; by = last.b.y - 30 + idle(lf, 3, 62); brot = idle(lf, 5, 58);
  } else if (lf >= 38) {
    for (const h of S3_HOPS) {
      if (lf < h.s) { bx = h.a.x; by = h.a.y - 30 + idle(lf, 3, 62); brot = idle(lf, 5, 58); break; }
      if (lf <= h.s + h.d) {
        const t = over(lf, h.s, h.d, Easing.inOut(Easing.quad));
        bx = arcX(lf, h.s, h.d, h.a.x, h.b.x);
        by = arcY(lf, h.s, h.d, h.a.y - 30, 130, h.b.y - 30);
        brot = lerpv(t, -14, 360); bfly = 1; break;
      }
    }
  }
  const bladeVisible = lf >= S3_HOLD;
  const catchFrames = [38, 50, 62, 73];

  // ---- the planted fifth node ----
  // a faint crimson wakes on the pad during the team-work window (the twist
  // plant): a very low breath seeded early so the "one pad glows faintly red off
  // to the side" reads across the whole back half, then firms as the reveal lands.
  const s3Red = Math.max(
    over(lf, 40, 20) * 0.05,
    over(lf, 56, 26) * 0.16,
    over(lf, 72, 16) * 0.3
  );
  const s3Glint = lf < 74 ? 0 : Math.max(Math.sin(over(lf, 74, 10) * Math.PI), 0.18 * (0.5 + 0.5 * Math.sin(lf / 5))) * over(lf, 74, 3);

  const padLit: number[] = [
    over(lf, 10 + 1 * 6, fr(0.5)), // b0 (i=1)
    over(lf, 10 + 0 * 6, fr(0.5)), // b1 (i=0)
    over(lf, 10 + 2 * 6, fr(0.5)), // b2 (i=2)
    over(lf, 10 + 3 * 6, fr(0.5)), // b3 (i=3)
  ];

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround
          lf={lf}
          padLit={padLit}
          redPadLit={s3Red}
          bridgeActive={1}
          forgeHot={0.85}
          blaze={0}
          gateLit={0.8}
          sealUnlocked={0}
          moonGlow={1}
          rain={1}
          embers={1}
          masterGold={0}
          warm={0}
        >
          {/* DEPTH DRESSING: wet stone sheens under each team pad catching the
              node light, and two warm mid-tier lanterns filling the flanks so no
              quadrant reads empty. All subordinate to the smiths. */}
          {S3_TEAM.map((t) => (
            <WetReflect key={"wr" + t.i} x={t.pad.x} y={t.pad.y + 26} w={168} h={70} o={0.22 + padLit[t.i === 1 ? 0 : t.i === 0 ? 1 : t.i] * 0.22} hue={NODEBLUE} />
          ))}
          {[{ x: 150, y: 1010 }, { x: 884, y: 1140 }].map((L, i) => (
            <React.Fragment key={"lan" + i}>
              <div style={{ position: "absolute", left: L.x - 5, top: L.y - 96, width: 10, height: 60, background: "#0C0E12", zIndex: 19 }} />
              <div style={{ position: "absolute", left: L.x - 16, top: L.y - 40, width: 32, height: 40, borderRadius: 6, background: `linear-gradient(180deg, ${mix(NEONORANGE, "#000000", 0.15)}, #2A160C)`, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.12)", zIndex: 19 }} />
              <Glow x={L.x} y={L.y - 20} r={54} hue={NEONORANGE} o={0.3 * flick(lf, 0.4, i * 3)} blur={18} ry={40} z={19} />
            </React.Fragment>
          ))}

          {/* the novice, viewer stand-in, watching from a ledge: gives a small nod
              of approval while the team works, then flinches at the red corner. */}
          <Novice lf={lf} x={168} y={1338} cheer={lf >= 30 && lf < 70 ? 0.16 : 0} flinch={lf >= 74 ? 0.3 : 0} size={80} />

          {/* SPLIT CHARGE: a cool ring gathering on the hero before he severs */}
          {chargeO > 0.02 && (
            <>
              <Glow x={SITE.arena.x} y={SITE.arena.y - 74} r={150} hue={GLASSCYAN} o={chargeO * 0.4} blur={22} ry={120} />
              <div style={{ position: "absolute", left: SITE.arena.x - 120, top: SITE.arena.y - 190, width: 240, height: 240, borderRadius: "50%", border: `3px solid ${GLASSCYAN}`, opacity: chargeO * 0.5, transform: `scale(${0.6 + (1 - chargeO) * 0.6 + idle(lf, 0.04, 20)})`, filter: "blur(1px)", mixBlendMode: "screen" }} />
            </>
          )}

          {/* THE HERO forge-master, centre, splitting away in the sweep */}
          {heroOp > 0.02 && (
            <div style={{ opacity: heroOp }}>
              <div style={{ position: "absolute", left: SITE.arena.x, top: SITE.arena.y, transformOrigin: "0 0", transform: `scale(${heroBurst})` }}>
                <ForgeMaster lf={lf} x={0} y={0} size={172} forging={lf < 9 ? 1 : 0} gaze={0} />
              </div>
            </div>
          )}

          {/* THE TEAM: four identical builders pop onto their pads, staggered, each
              stamped by a fighting-game CHARACTER-SELECT bracket that snaps in and
              fades (the shadow-clone select-screen read). */}
          {S3_TEAM.map((t) => {
            const start = 10 + t.i * 6;
            if (lf < start) return null;
            const o = overshoot(lf, start, fr(0.5), 0.14);
            const op = over(lf, start, 4);
            const scaleV = 0.28 + 0.72 * o;
            const landAt = start + Math.round(fr(0.42));
            const drop = -52 * (1 - over(lf, start, fr(0.42), Easing.out(Easing.cubic)));
            const sq = squash(lf, landAt, 0.2, 3);
            // once landed the body is never frozen: a per-sensei bob (phase by i)
            // keeps every smith alive and breaks any read of a single machine.
            const landed = lf >= landAt;
            const bob = landed ? idle(lf, 2.6, 62 + t.i * 9, t.i * 1.7) : 0;
            // warm anvil heat that flares on this smith's own strike cadence and
            // fades as the team calms for the twist; NEONORANGE forge heat, never red.
            const workFade = 1 - over(lf, 71, 6);
            const heat = landed && lf < 77 ? (0.35 + 0.65 * Math.max(0, Math.sin((lf + t.i * 6) / 3.2))) * workFade : 0;
            // the select-bracket: four corner ticks that snap around the pad on
            // land, then fade over ~12 frames.
            const selO = Math.max(0, over(lf, landAt - 1, 4) - over(lf, landAt + 6, 12)) * 0.85;
            const selS = 1.3 - overshoot(lf, landAt - 1, 8, 0.2) * 0.3;
            return (
              <React.Fragment key={t.i}>
                <GroundRing lf={lf} at={landAt} x={t.pad.x} y={t.pad.y} r={120} dur={16} hue="rgba(120,160,210,0.5)" />
                <Dust lf={lf} at={landAt} x={t.pad.x} y={t.pad.y} n={8} life={46} spread={90} sd={t.i + 1} />
                <Sparkles lf={lf} at={landAt} x={t.pad.x} y={t.pad.y - 20} n={7} spread={80} rise={54} hue="#CFE0F0" sd={t.i + 3} />
                {selO > 0.02 && (
                  <div style={{ position: "absolute", left: t.pad.x - 96 * selS, top: t.pad.y - 176 * selS, width: 192 * selS, height: 208 * selS, opacity: selO, zIndex: 43, pointerEvents: "none" }}>
                    {[[0, 0, 1, 1], [1, 0, -1, 1], [0, 1, 1, -1], [1, 1, -1, -1]].map((c, k) => (
                      <div key={k} style={{ position: "absolute", left: c[0] ? "auto" : 0, right: c[0] ? 0 : "auto", top: c[1] ? "auto" : 0, bottom: c[1] ? 0 : "auto", width: 26, height: 26 }}>
                        <div style={{ position: "absolute", left: c[2] > 0 ? 0 : "auto", right: c[2] > 0 ? "auto" : 0, top: c[3] > 0 ? 0 : "auto", bottom: c[3] > 0 ? "auto" : 0, width: 26, height: 4, background: GLASSCYAN }} />
                        <div style={{ position: "absolute", left: c[2] > 0 ? 0 : "auto", right: c[2] > 0 ? "auto" : 0, top: c[3] > 0 ? 0 : "auto", bottom: c[3] > 0 ? "auto" : 0, width: 4, height: 26, background: GLASSCYAN }} />
                      </div>
                    ))}
                  </div>
                )}
                {heat > 0.04 && <Glow x={t.pad.x + 6} y={t.pad.y - 16} r={52} hue={NEONORANGE} o={heat * 0.42} blur={15} ry={28} z={45} />}
                <div style={{ position: "absolute", left: t.pad.x, top: t.pad.y, transformOrigin: "0 0", transform: `translateY(${drop + bob}px) scale(${scaleV * sq.sx}, ${scaleV * sq.sy})`, opacity: op }}>
                  <Sensei lf={lf} x={0} y={0} size={168} accent={t.accent} forging={s3Forging(t.i, lf)} />
                </div>
                {/* anvil strikes: crisp staggered spark taps so every builder
                    visibly works its identical job right through the mid beat,
                    denser and brighter through the old dead window */}
                {S3_STRIKES.map((b) => {
                  const at = b + t.i * 3;
                  const big = b >= 58; // climax taps throw more
                  return <Sparkles key={"anv" + b} lf={lf} at={at} x={t.pad.x + 6} y={t.pad.y - 14} n={big ? 7 : 5} spread={big ? 56 : 44} rise={big ? 42 : 34} life={16} hue="#E8DCC4" sd={t.i * 9 + b} z={47} />;
                })}
              </React.Fragment>
            );
          })}

          {/* CONNECTIVE TISSUE: a bright amber data-mote races down whichever bridge
              is live, leading the blade hop, so the graph edges visibly carry the
              work between pads (never a static rail). */}
          {S3_HOPS.map((h, k) => {
            if (lf < h.s - 3 || lf > h.s + h.d + 3) return null;
            const t = over(lf, h.s - 2, h.d + 2, Easing.inOut(Easing.quad));
            const p = s3Along(h.a, h.b, t);
            const fade = Math.sin(Math.max(0, Math.min(1, (lf - (h.s - 3)) / (h.d + 6))) * Math.PI);
            return (
              <React.Fragment key={"mote" + k}>
                <Glow x={p.x} y={p.y} r={26} hue={AMBER} o={fade * 0.75} blur={7} ry={16} z={17} />
                <Glow x={p.x} y={p.y} r={12} hue="#FFE6B0" o={fade * 0.9} blur={3} ry={10} z={18} />
              </React.Fragment>
            );
          })}

          {/* THE WORK: a rough blade relayed hand to hand down the wired line */}
          {bladeVisible && (
            <>
              {bfly > 0 && (
                <SpeedLines lf={lf} x={bx - 120} y={by - 90} w={240} h={180} dir={brot * 0.02} n={9} on={0.5} hue="rgba(210,225,245,0.5)" z={43} sd={7} />
              )}
              <Blade lf={lf} x={bx} y={by} temper={1} build={1} crack={0} glow={0.9 + Math.max(0, over(lf, 73, 4) - over(lf, 78, 8)) * 0.5} rot={brot} s={0.66} />
            </>
          )}
          {/* the blade lands at b3 with a bang, then keeps a live work-glow so the
              relay never dead-stops: a ground ring, a spark burst and a warm flare */}
          {lf >= 73 && lf < 84 && (
            <>
              <GroundRing lf={lf} at={73} x={last.b.x} y={last.b.y} r={110} dur={15} hue="rgba(210,225,245,0.55)" z={45} />
              <Sparkles lf={lf} at={73} x={last.b.x} y={last.b.y - 34} n={9} spread={72} rise={52} life={18} hue="#E8DCC4" sd={91} z={48} />
              <Glow x={last.b.x} y={last.b.y - 40} r={62} hue={NEONORANGE} o={(over(lf, 73, 3) - over(lf, 78, 6)) * 0.4} blur={16} ry={30} z={45} />
            </>
          )}
          {catchFrames.map((cf) => (
            <Sparkles key={cf} lf={lf} at={cf} x={cf === 38 ? SITE.b1.x : cf === 50 ? SITE.arena.x : cf === 62 ? SITE.b0.x : SITE.b3.x} y={(cf === 38 ? SITE.b1.y : cf === 50 ? SITE.arena.y : cf === 62 ? SITE.b0.y : SITE.b3.y) - 30} n={6} spread={70} rise={46} hue="#E8DCC4" sd={cf} z={48} />
          ))}

          {/* THE PLANT, seeded early: a lone crimson data-mote creeps up the wired
              red edge from the arena toward the dark fifth pad the whole scene,
              connective tissue that draws the eye to the corner before the reveal. */}
          {(() => {
            const t = ((lf / 92) % 1);
            const p = s3Along(SITE.arena, SITE.red, t);
            const moteO = (0.14 + s3Red * 0.9) * (0.5 + 0.5 * Math.sin(t * Math.PI));
            return <Glow x={p.x} y={p.y} r={16} hue={ADVRED} o={moteO} blur={6} ry={11} z={17} />;
          })()}

          {/* THE PLANT: a faint crimson glint breathing on the dark fifth pad off
              to the side while the team works, drawing the eye to the corner. */}
          {lf >= 40 && (
            <Glow
              x={SITE.red.x}
              y={SITE.red.y - 44}
              r={92}
              hue={ADVRED}
              o={over(lf, 40, 20) * 0.05 + over(lf, 56, 20) * (0.1 + 0.1 * Math.sin(lf / 6)) + s3Glint * 0.22}
              blur={22}
              ry={62}
              z={49}
            />
          )}

          {/* the off-grid GLINT: a thin crimson scanner line sweeps the dark fifth
              pad while the team works, building in strength, so a viewer's eye is
              pulled to the corner before the reveal even lands (the twist plant) */}
          {lf >= 56 && lf < 80 && (
            <div style={{ position: "absolute", left: SITE.red.x - 92, top: SITE.red.y - 96, width: 184, height: 120, overflow: "hidden", zIndex: 51, pointerEvents: "none", opacity: over(lf, 56, 12) }}>
              <div style={{ position: "absolute", left: 0, top: (((lf - 56) * 5.5) % 150) - 15, width: 184, height: 4, background: `linear-gradient(90deg, transparent, ${HOTRED}, transparent)`, opacity: 0.35 + 0.4 * Math.sin(lf / 5), filter: "blur(1px)", mixBlendMode: "screen" }} />
            </div>
          )}

          {/* THE PLANT: the masked fifth agent, standing apart, revealed by the
              light coming up on his pad (motivated fade, not an opacity pop) */}
          {lf >= 67 && (
            <div style={{ opacity: over(lf, 68, 12) }}>
              <RedMaster lf={lf} x={SITE.red.x} y={SITE.red.y} size={168} glint={s3Glint} staffAngle={-16} />
            </div>
          )}

          {/* a geometric red ? floating over the dark pad on the twist */}
          {lf >= 73 && (
            <div style={{ position: "absolute", left: SITE.red.x, top: SITE.red.y - 196 + idle(lf, 5, 46), transform: `translate(-50%,-50%) scale(${overshoot(lf, 73, 8, 0.3)})`, opacity: over(lf, 73, 4), zIndex: 57 }}>
              <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: -24, borderRadius: "50%", background: `radial-gradient(circle, ${ADVRED}, transparent 66%)`, opacity: 0.4 * (0.6 + 0.4 * Math.sin(lf / 5)), filter: "blur(12px)", mixBlendMode: "screen" }} />
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 122, color: HOTRED, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))" }}>?</span>
              </div>
            </div>
          )}
        </ProvingGround>
      </Cam>

      {/* the katana light-sweep + the split flash (screen space, crisp) */}
      {sweepOn && (
        <div style={{ position: "absolute", left: sweepX, top: -60, width: 26, height: 920, transform: "rotate(11deg)", transformOrigin: "50% 50%", zIndex: 200, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: 8, top: 0, width: 4, height: "100%", background: "linear-gradient(180deg, transparent, #FFFFFF, #DCEFF6, transparent)", filter: "blur(1px)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: "100%", background: `linear-gradient(180deg, transparent, ${GLASSCYAN}66, transparent)`, filter: "blur(9px)", mixBlendMode: "screen" }} />
        </div>
      )}
      {flash > 0.01 && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.9), transparent 60%)", opacity: flash * 0.55, zIndex: 201, pointerEvents: "none", mixBlendMode: "screen" }} />
      )}

      {/* on-screen copy (screen space) */}
      <SceneTag f={lf} text="THE TEAM" color={CYAN} x={40} y={214} />

      {lf >= 30 && (
        <div style={{ position: "absolute", left: 636, top: 214, opacity: over(lf, 30, 6), transform: `translateY(${(1 - over(lf, 30, 6, Easing.out(Easing.back(2)))) * -14}px)`, zIndex: 120 }}>
          <Chip text="x5 AGENTS" bg="rgba(18,26,44,0.92)" bd={GLASSCYAN} fg="#EAF2F6" size={30} />
        </div>
      )}

      {lf >= 74 && (
        <div style={{ position: "absolute", left: 556, top: 332, opacity: over(lf, 74, 5), transform: `scale(${overshoot(lf, 74, 6, 0.22)})`, transformOrigin: "0 100%", zIndex: 120 }}>
          <Chip text="BUT..." bg="rgba(38,10,10,0.92)" bd={ADVRED} fg="#FFE1DA" size={30} />
        </div>
      )}

      <Vig o={0.34} />
    </>
  );
};

// ==== part: 14_S4.tsx ====
// ============================================================================
// SCENE 4, NODE FIVE (not here to help). camera MASTER. 40 frames (lf 0..39).
// Takeaway sound off: one masked red warrior refuses the team's help and crosses
// its bo staff. It is not on their side.
//
// AT FRAME 0 (complete, dressed, MID ACTION):
//  - camera is mid whip-pan onto the red pad (settling from S3's snap-zoom) and
//    already creeping into the slow menacing push-in, plus handheld micro-noise.
//  - the RED MASTER stands centre on its now-lit crimson pad, oni mask sealed
//    (eyes hidden), red rim-gel pulsing, staff at rest, nodding idle. Behind it
//    hangs its own crimson SHRINE BANNER (a rival faction crest), the master's
//    edge is wired live back to the team, two crimson lanterns flank the shrine.
//  - three dim builder-sensei silhouettes recede on the far lower-left bridge and
//    OFFER an amber help-orb; the NOVICE watches from the arena pad below.
//  - the amber help-orb is not yet on screen (it fades in f1..5 and arcs in);
//    the frame-0 life is carried by camera, master, red gel, lanterns, rain,
//    embers, the offer-glow and the live bridge pulse.
//  - screen-space red rain streaks, red gel wash, and the graph atmosphere (pad
//    flicker, bridge data-pulses) all animate.
//  - NO spotlight, no `?`, no chip yet (they stamp in on their beats).
//
// BUG FIXED: the world FORE banner-pole (02_world.tsx, i=1/fy=760, world x~828..874,
// zIndex 82) was rendering straight down the master's column, over his zIndex-50
// body, reading as a black pillar cutting him in half. The master is now lifted
// into a zIndex-90 wrapper (in front of that pole) and its protruding top is
// covered by the designed crimson SHRINE BANNER (zIndex 84, above the pole's 82),
// so the master reads as a clean, whole, unobstructed crimson figure.
//
// Reserved-colour discipline: bright menace-red is the master's rim gel alone; the
// shrine cloth is a dark desaturated oxblood so it never competes. Zero gold, zero
// green decoratively; amber is the team's help, shattered by the refusal.
// ============================================================================
const S4_pulse = (lf: number, at: number, w: number) => Math.exp(-Math.pow((lf - at) / w, 2));

// the master's own crimson SHRINE BANNER: a hanging temple cloth on a dark rod,
// with a geometric crossed-bar crest (its rival faction mark). Dark oxblood so the
// bright menace-red stays reserved to the figure. Also seals the world FORE pole.
const S4_ShrineBanner: React.FC<{ lf: number }> = ({ lf }) => {
  const sway = idle(lf, 1.4, 150);
  const cloth = mix(ADVRED, "#000000", 0.56); // dark oxblood
  const clothLo = mix(ADVRED, "#000000", 0.74);
  return (
    <div style={{ position: "absolute", left: 858, top: 636, transform: `translate(-50%,0) rotate(${sway * 0.16}deg)`, transformOrigin: "50% 0%", zIndex: 84, pointerEvents: "none" }}>
      {/* rod / crossbar */}
      <div style={{ position: "absolute", left: -96, top: 0, width: 192, height: 15, background: `linear-gradient(180deg, #4A331C, #241608)`, borderRadius: 4, boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: -108, top: -3, width: 20, height: 20, borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #6A4A28, #2A1B0C)` }} />
      <div style={{ position: "absolute", left: 88, top: -3, width: 20, height: 20, borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #6A4A28, #2A1B0C)` }} />
      {/* cloth body, gradient + rim + drop shadow, notched tail */}
      <div style={{ position: "absolute", left: -66, top: 12, width: 132, height: 264, background: `linear-gradient(180deg, ${cloth} 0%, ${clothLo} 82%, ${clothLo} 100%)`, clipPath: "polygon(0 0,100% 0,100% 90%,50% 100%,0 90%)", boxShadow: "6px 8px 22px rgba(0,0,0,0.55)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: "94%", background: "linear-gradient(180deg, rgba(255,120,96,0.35), transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 14, height: "94%", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.5))" }} />
      </div>
      {/* geometric crossed-bar crest, the rival faction mark, pulses subtly */}
      <div style={{ position: "absolute", left: 0, top: 118, transform: "translate(-50%,-50%)", opacity: 0.86 }}>
        <div style={{ position: "absolute", left: -34, top: -34, width: 68, height: 68, borderRadius: "50%", border: `4px solid ${mix(ADVRED, "#FF7A5E", 0.25 + 0.2 * Math.abs(Math.sin(lf / 22)))}` }} />
        <div style={{ position: "absolute", left: -30, top: -3.5, width: 60, height: 7, background: ADVRED, borderRadius: 2, transform: "rotate(38deg)" }} />
        <div style={{ position: "absolute", left: -30, top: -3.5, width: 60, height: 7, background: mix(ADVRED, "#000000", 0.2), borderRadius: 2, transform: "rotate(-38deg)" }} />
      </div>
    </div>
  );
};

// a small crimson hanging LANTERN flanking the shrine. Faceted body, flicker glow.
const S4_Lantern: React.FC<{ lf: number; x: number; y: number; i?: number }> = ({ lf, x, y, i = 0 }) => {
  const sw = Math.sin(lf / 46 + i * 2) * 2.4;
  const fl = 0.6 + 0.4 * (Math.sin(lf / 9 + i * 3.1) * 0.5 + 0.5);
  return (
    <div style={{ position: "absolute", left: x, top: y, transformOrigin: "50% 0%", transform: `translate(-50%,0) rotate(${sw}deg)`, zIndex: 86, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -1.5, top: -22, width: 3, height: 24, background: "#241608" }} />
      <Glow x={0} y={22} r={40} hue={ADVRED} o={0.28 + fl * 0.28} blur={14} ry={30} />
      <div style={{ position: "absolute", left: -15, top: 0, width: 30, height: 44, borderRadius: 8, background: `linear-gradient(180deg, ${mix(ADVRED, "#FF6A4E", 0.15)}, ${mix(ADVRED, "#3A0E0C", 0.55)})`, border: `2px solid #2A0A08`, boxShadow: `inset 0 4px 8px ${mix(ADVRED, "#FFB090", 0.4)}`, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: -15, top: 20, width: 30, height: 3, background: "#2A0A08" }} />
      <div style={{ position: "absolute", left: -6, top: 44, width: 12, height: 8, clipPath: "polygon(0 0,100% 0,60% 100%,40% 100%)", background: mix(ADVRED, "#000000", 0.4) }} />
    </div>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const base = CAMS.MASTER;

  // CAMERA: whip-pan tail onto the red pad (comes in from the left), settling by
  // ~f7 with a decaying kick, then a slow continuous push-in that never lands.
  const whip = over(lf, 0, 7, Easing.out(Easing.poly(5)));
  const push = over(lf, 2, 46, Easing.inOut(Easing.sin)); // reaches 1 past the cut, still creeping at f39
  const sc = shakeCam(lf, [{ at: 13, amp: 8, dur: 15 }], 1); // the staff-slap knock
  const cam = {
    x: base.x - (1 - whip) * 150 + sc.x,
    y: base.y + (1 - whip) * 34 + sc.y,
    z: (base.z + push * 0.17) * sc.z,
  };

  // THE MASTER's state on its beats.
  // slap: strike drives the staff swing (lean peaks mid-window), knocking the orb.
  const strike = over(lf, 8, 10, Easing.inOut(Easing.sin)); // lean peaks ~f13 = orb contact
  // cross: after the slap it crosses the bo across its chest (overshoot then settle).
  const cross = over(lf, 26, 12, Easing.out(Easing.back(1.7)));
  const staffAngle = -16 + cross * -56 + idle(lf, 1.8, 74);
  // the tell: a base mask glint that never sits still, spiking on the slap and on
  // the final refusal so the audience keeps reading the sealed mask.
  const glint = Math.min(
    1,
    0.34 + 0.18 * Math.abs(Math.sin(lf / 7)) + S4_pulse(lf, 12, 3.2) * 0.5 + S4_pulse(lf, 34, 3.6) * 0.6
  );

  // THE HELP-ORB: arcs in from the team (world coords, lower-left) toward the
  // master's staff and shatters on contact at ~f13.
  const orbFade = over(lf, 1, 4);
  const orbT = over(lf, 3, 10, Easing.in(Easing.quad)); // 0..1, contact at f13
  const orbLive = orbT < 1;
  const orbX = arcX(lf, 3, 10, 548, 792);
  const orbY = arcY(lf, 3, 10, 1112, 66, 906);
  const HIT_X = 792, HIT_Y = 906;
  // the team's OFFER-glow at the launch point, fading as the orb sets off.
  const offer = (1 - over(lf, 1, 8)) * (0.5 + 0.3 * Math.sin(lf / 6));

  // SCREEN OVERLAYS (do not scale with the camera).
  // red interrogation spotlight snapping straight down onto the master.
  const spot = over(lf, 21, 6, Easing.out(Easing.cubic));
  const spotFlick = 0.86 + 0.14 * Math.sin(lf / 3.1);
  // the geometric red `?` stamp.
  const qPop = over(lf, 23, 7, Easing.out(Easing.back(2.6)));
  // the NOT HERE TO HELP chip flips up.
  const chipIn = over(lf, 27, 10, Easing.out(Easing.back(2)));
  // the novice on the arena pad flinches at the slap.
  const novFlinch = S4_pulse(lf, 14, 4.5);

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround fore={0}
          lf={lf}
          padLit={[0.24, 0.2, 0.28, 0.22]}
          redPadLit={1}
          bridgeActive={0.6}
          forgeHot={0.5}
          gateLit={0.4}
          moonGlow={0.7}
          rain={1}
          embers={0.8}
          masterGold={0}
          warm={0}
        >
          {/* the team, receded to dim silhouette on the far lower-left bridge, OFFERING help */}
          <div style={{ filter: "brightness(0.34) saturate(0.6)", opacity: 0.92 }}>
            <Sensei lf={lf} x={548} y={1112} size={150} accent="#8A4E34" hammer={0} forging={0} />
            <Sensei lf={lf} x={430} y={1172} size={132} accent="#7A4630" hammer={0} forging={0} />
            <Sensei lf={lf} x={352} y={1214} size={116} accent="#6E4030" hammer={0} forging={0} />
          </div>
          {/* the amber offer-glow at the team, cupped help before it is thrown */}
          {offer > 0.02 && <Glow x={548} y={1058} r={54} hue={AMBER} o={offer * 0.7} blur={16} ry={44} z={40} />}

          {/* the NOVICE cameo watching up at the master from the arena pad, flinches on the slap */}
          <Novice lf={lf} x={632} y={1150} size={80} flinch={novFlinch} hideEyes={0} cheer={0} />

          {/* red pad dressing: a live gel wash + a crisp faceted rim, pooling only on
              the master's crimson pad (menace-red is reserved to it alone here). */}
          <Glow x={858} y={905} r={300} hue={ADVRED} o={0.26 + 0.1 * Math.sin(lf / 8)} blur={40} ry={230} />
          <Glow x={858} y={952} r={150} hue={mix(ADVRED, "#FF7A5E", 0.2)} o={0.3 + 0.12 * Math.sin(lf / 5.5)} blur={20} ry={40} z={19} />
          <div style={{ position: "absolute", left: 858 - 132, top: 940, width: 264, height: 70, borderRadius: "50%", border: `2px solid ${mix(ADVRED, "#FF7A5E", 0.25)}`, opacity: 0.4 + 0.2 * Math.sin(lf / 7), filter: "blur(1px)", mixBlendMode: "screen", zIndex: 21, pointerEvents: "none" }} />
          {/* a live red data-pulse on the crimson edge back to the team (still wired in) */}
          <Glow x={706} y={1024} r={30} hue={ADVRED} o={0.3 + 0.3 * Math.abs(Math.sin(lf / 10))} blur={10} ry={12} z={17} />

          {/* the master's own crimson shrine banner + flanking lanterns, behind the figure */}
          <S4_ShrineBanner lf={lf} />
          <S4_Lantern lf={lf} x={772} y={686} i={0} />
          <S4_Lantern lf={lf} x={944} y={686} i={1} />

          {/* THE HELP-ORB in flight, then its shatter on the staff */}
          {orbLive && (
            <div style={{ position: "absolute", left: orbX - 26, top: orbY - 26, width: 52, height: 52, opacity: orbFade, zIndex: 88 }}>
              <Glow x={26} y={26} r={54} hue={AMBER} o={0.7} blur={16} />
              <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #FFE7B0, ${AMBER} 60%, #9A6A18)`, border: `2px solid #FFEcC0` }} />
              <div style={{ position: "absolute", inset: 4, borderRadius: "50%", border: `2px solid ${AMBER}`, opacity: 0.5 + 0.4 * Math.sin(lf / 3) }} />
              {/* a short lead trail */}
              <div style={{ position: "absolute", left: 6, top: 20, width: 34, height: 6, background: `linear-gradient(90deg, transparent, ${AMBER}00, ${AMBER}88)`, filter: "blur(2px)", mixBlendMode: "screen", transform: "rotate(-24deg)" }} />
            </div>
          )}
          {/* the slap shatter: amber help scattered, cause and effect share the frame */}
          <Glow x={HIT_X} y={HIT_Y} r={70 * Math.max(0, 1 - Math.abs(lf - 13) / 8)} hue={AMBER} o={0.6 * Math.max(0, 1 - Math.abs(lf - 13) / 8)} blur={14} z={89} />
          <Sparkles lf={lf} at={13} x={HIT_X} y={HIT_Y} n={16} life={22} spread={170} rise={74} hue="#F2C87A" sd={4} z={89} />
          <Debris lf={lf} at={13} x={HIT_X} y={HIT_Y} n={8} life={24} spread={160} rise={60} hue="#C79438" sd={5} z={89} />

          {/* THE RED MASTER, centre, named. Eyes hidden (maskLift 0). Never destroyed.
              Lifted into a zIndex-90 wrapper so the world FORE banner-pole can never
              cut through it: the master is the biggest clearest whole thing in frame. */}
          <div style={{ position: "absolute", left: 0, top: 0, zIndex: 90 }}>
            <RedMaster
              lf={lf}
              x={858}
              y={940}
              size={170}
              glint={glint}
              strike={strike}
              scan={0}
              maskLift={0}
              gold={0}
              bow={0}
              staffAngle={staffAngle}
            />
          </div>
        </ProvingGround>
      </Cam>

      {/* ---- screen-space overlays ---- */}

      {/* red-lit rain streaks in the foreground */}
      <div style={{ position: "absolute", inset: 0, zIndex: 55, pointerEvents: "none" }}>
        <RainStreaks lf={lf} o={0.34} n={26} hue="rgba(255,92,70,0.55)" z={55} h={792} speed={1.15} />
      </div>

      {/* the red interrogation spotlight, snapping down onto the master */}
      {spot > 0.02 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 58, pointerEvents: "none", opacity: spot }}>
          <div style={{ position: "absolute", left: 506 - 150, top: -300 + spot * 300, width: 300, height: 470, clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)", background: `linear-gradient(180deg, rgba(255,70,58,${0.5 * spotFlick}), rgba(255,70,58,0) 88%)`, filter: "blur(7px)" }} />
          <div style={{ position: "absolute", left: 506 - 130, top: 470, width: 260, height: 90, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,64,52,${0.55 * spotFlick}), transparent 66%)`, filter: "blur(9px)" }} />
        </div>
      )}

      {/* the geometric red `?` stamp beside the mask (Among-Us sus framing) */}
      {qPop > 0.02 && (
        <div style={{ position: "absolute", left: 690, top: 244, transform: `translate(-50%,-50%) scale(${qPop}) rotate(${idle(lf, 3, 60) - 4}deg)`, opacity: Math.min(1, qPop * 2), zIndex: 66, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: -46, top: -46, width: 92, height: 92, borderRadius: "50%", background: `radial-gradient(circle, ${ADVRED}, transparent 68%)`, opacity: 0.5, filter: "blur(10px)", mixBlendMode: "screen" }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: "110px", color: ADVRED, WebkitTextStroke: `4px #2A0A08`, textAlign: "center" }}>?</div>
        </div>
      )}

      {/* SceneTag */}
      <SceneTag f={lf} text="NODE FIVE" color={ADVRED} />

      {/* NOT HERE TO HELP chip, flips up on the crossed-staff refusal */}
      {chipIn > 0.02 && (
        <div style={{ position: "absolute", left: 506, top: 662 + (1 - chipIn) * 10, transform: `translate(-50%,0) perspective(600px) rotateX(${(1 - chipIn) * -92}deg) translateY(${idle(lf, 1.6, 80)}px)`, transformOrigin: "50% 100%", opacity: Math.min(1, chipIn * 2), zIndex: 70 }}>
          <Chip text="NOT HERE TO HELP" bg="rgba(30,8,8,0.92)" bd={ADVRED} fg="#FFE1DA" size={38} />
        </div>
      )}

      <Vig o={0.4} />
    </>
  );
};

// ==== part: 15_S5.tsx ====

// ============================================================================
// SCENE 5, THE ATTACK. camera RING. 72 frames (lf 0..71). VO retimed.
// Takeaway sound-off: the masked warrior dashes in and strikes the clamped blade
// over and over, and cracks start to appear.
// The arena is now a real SPARRING RING: four faceted turnbuckle posts strung
// with sagging ropes that shudder on every strike, framing the blade.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action):
//   - the whole ProvingGround world is live: cold cliff, moon glow, ridgeline,
//     amber bridges with travelling data pulses, forge fire flickering far below,
//     the arena node-pad tinted red under the master.
//   - the BLADE stands clamped upright on the sparring pad (temper 1, glowing,
//     breathing, faint reflection on wet stone), already whole (no cracks yet).
//   - the RED MASTER is coiled at the right of the ring, oni mask sealed (eyes
//     hidden), staff crossed, its red glint ALREADY building toward strike one.
//   - two builder senseis watch from the bridges above, nodding; the NOVICE sits
//     flinch-ready on the lower-left ledge.
//   - rain streaks fall, embers rise, the red aura pulses, the camera breathes.
// Strikes land f10 (crack 0->1), f16 (crack 1->2), f30 (crack 2->3, the ledger's
// three). Tell (glint + shadow) fires ~6f before each: f4, f10, f24.
// Gold and green are WITHHELD (temper 1, sealUnlocked 0). Red belongs to the
// master alone. No terminal / UI anywhere: the attack is a physical strike.
// ============================================================================

const S5_IMP = [10, 16, 30];               // the three CRACKING strike impacts (crack ledger: exactly three)
const S5_JUD = [42, 52, 62];               // back-half judders: real hard hits, no NEW crack (relentless attack)
const S5_ALL = [10, 16, 30, 42, 52, 62];   // every impact that shakes the world, front and back
const S5_TELL = [4, 10, 24, 36, 46, 56];   // glint tell fires ~6 frames before each of the six strikes
const S5_AX = 506, S5_AY = 1120;           // arena pad centre (world)
const S5_CX = 512, S5_CY = 1006;           // blade contact point (world), strikes from the right

// a triangular 0..1..0 pulse centred on `at`, width `w`.
const s5bump = (lf: number, at: number, w: number) => { const t = Math.abs(lf - at); return t >= w ? 0 : 1 - t / w; };

// how far each strike drives the master toward the blade. Cracking strikes reach
// all the way onto the blade; the finale judder (f62) is the biggest lunge.
const S5_REACH: { [k: number]: number } = { 10: 128, 16: 134, 30: 150, 42: 108, 52: 104, 62: 152 };

// one strike's horizontal lunge for the master feet: a bigger coiled pull-back away
// from the blade, a hard snap onto it, then an overshooting recoil that settles.
const s5one = (lf: number, imp: number, reach = 100) => {
  const t = lf - imp;
  if (t <= -6 || t >= 15) return 0;
  if (t < 0) return 20 * (1 - (-t) / 6);                                   // coil, drift right (away) further than before
  if (t < 2) return 20 + (-reach - 20) * (t / 2);                          // snap in, driving onto the blade
  return -reach * (1 - over(lf, imp + 2, 11, Easing.out(Easing.cubic))) + settle(lf, imp + 2, 8, 0.16, 0.12);
};
const s5masterX = (g: number) =>
  690
  + S5_ALL.reduce((a, imp) => a + s5one(g, imp, S5_REACH[imp] ?? 104), 0) // lunge + overshooting recoil for EVERY strike, front and back: the master is never parked
  + idle(g, 1.6, 66);                                                    // never perfectly still between strikes

// the vertical chop of each strike: the master coils UP off the pad, then drives
// the staff DOWN onto the blade and settles. Turns every lunge into an arc, not a line.
const s5oneY = (lf: number, imp: number) => {
  const t = lf - imp;
  if (t <= -6 || t >= 14) return 0;
  if (t < 0) return -12 * (1 - (-t) / 6);                                  // rise off the pad while coiling
  return 16 * (1 - over(lf, imp, 10, Easing.out(Easing.cubic))) + settle(lf, imp, 3.4, 0.16, 0.14); // chop down through rest, then settle
};
const s5masterY = (g: number) => S5_AY + S5_ALL.reduce((a, imp) => a + s5oneY(g, imp), 0) + idle(g, 2.4, 78);

// the blade's lateral skid when a strike shoves it, recovering back to centre.
const s5skid = (lf: number) => S5_ALL.reduce((a, imp) => { const t = lf - imp; if (t < 0 || t > 11) return a; return a + -7 * Math.sin((t / 11) * Math.PI) * Math.exp(-t * 0.14); }, 0);

// ---- the sparring RING around the arena pad: four faceted turnbuckle posts and
// sagging ropes that frame the blade and shudder on every strike. Subordinate to
// the blade (dim rope-brown, further back), never blocking the contact point. ----
const S5_RINGPOSTS = [
  { x: 366, y: 1178, h: 60 },   // 0 front-left  (near, tall)
  { x: 646, y: 1178, h: 60 },   // 1 front-right (near, tall)
  { x: 402, y: 1072, h: 44 },   // 2 back-left   (far, short)
  { x: 610, y: 1072, h: 44 },   // 3 back-right  (far, short)
];

// one sagging rope as a quadratic curve, with a soft dark under-shadow and a rim.
const s5rope = (k: string, x0: number, y0: number, x1: number, y1: number, sag: number, thick: number, hue: string, z: number, o = 1) => {
  const minX = Math.min(x0, x1) - 8, minY = Math.min(y0, y1) - 8;
  const w = Math.abs(x1 - x0) + 16, h = Math.abs(y1 - y0) + Math.abs(sag) + 16;
  const ax = x0 - minX, ay = y0 - minY, bx = x1 - minX, by = y1 - minY;
  const mx = (ax + bx) / 2, my = (ay + by) / 2 + sag;
  return (
    <svg key={k} width={w} height={h} style={{ position: "absolute", left: minX, top: minY, overflow: "visible", zIndex: z, pointerEvents: "none" }}>
      <path d={`M ${ax} ${ay} Q ${mx} ${my + 3} ${bx} ${by}`} fill="none" stroke="rgba(0,0,0,0.42)" strokeWidth={thick + 2} strokeLinecap="round" opacity={o * 0.5} />
      <path d={`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`} fill="none" stroke={hue} strokeWidth={thick} strokeLinecap="round" opacity={o} />
      <path d={`M ${ax} ${ay - thick * 0.3} Q ${mx} ${my - thick * 0.3} ${bx} ${by - thick * 0.3}`} fill="none" stroke="rgba(240,228,206,0.24)" strokeWidth={thick * 0.34} strokeLinecap="round" opacity={o} />
    </svg>
  );
};

const S5Post: React.FC<{ x: number; y: number; h: number; shud: number; back?: number }> = ({ x, y, h, shud, back = 0 }) => (
  <div style={{ position: "absolute", left: x - 11, top: y - h, width: 22, height: h, zIndex: back ? 15 : 42, transform: `translateX(${shud * (back ? 0.5 : 1)}px)`, opacity: back ? 0.82 : 1 }}>
    <div style={{ position: "absolute", left: -3, top: h - 6, width: 28, height: 13, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", filter: "blur(2px)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: h, borderRadius: 6, background: "linear-gradient(90deg, #221810, #4A3A26 44%, #6E5A3A 62%, #221810)", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.12)" }} />
    <div style={{ position: "absolute", left: -2, top: -7, width: 26, height: 14, borderRadius: 5, background: "linear-gradient(180deg, #7A6442, #3A2C1C)" }} />
    <div style={{ position: "absolute", left: 2, top: h * 0.34, width: 18, height: 12, borderRadius: 4, background: mix(TORIIRED, "#000000", 0.25), opacity: 0.9 }} />
  </div>
);

const S5RingRopes: React.FC<{ lf: number; shud: number }> = ({ lf, shud }) => {
  const P = S5_RINGPOSTS;
  const sway = idle(lf, 2.2, 84) + drift(lf, 1.4, 63, 0.7);
  const sBack = 20 + shud;                       // far rope, behind the blade
  const sFront = 30 + shud * 1.8 + sway;         // near rope sags most, shudders hardest
  return (
    <>
      {/* far rope, behind everything */}
      {s5rope("rb2", P[2].x, P[2].y - 32, P[3].x, P[3].y - 32, sBack, 6, ROPE, 14, 0.7)}
      {s5rope("rb1", P[2].x, P[2].y - 14, P[3].x, P[3].y - 14, sBack + 4, 6, ROPE, 14, 0.7)}
      <S5Post x={P[2].x} y={P[2].y} h={P[2].h} shud={shud} back={1} />
      <S5Post x={P[3].x} y={P[3].y} h={P[3].h} shud={-shud} back={1} />
      {/* side ropes */}
      {s5rope("rl2", P[0].x, P[0].y - 46, P[2].x, P[2].y - 32, 10, 6, ROPE, 43, 0.85)}
      {s5rope("rl1", P[0].x, P[0].y - 24, P[2].x, P[2].y - 14, 12, 6, ROPE, 43, 0.85)}
      {s5rope("rr2", P[1].x, P[1].y - 46, P[3].x, P[3].y - 32, 10, 6, ROPE, 43, 0.85)}
      {s5rope("rr1", P[1].x, P[1].y - 24, P[3].x, P[3].y - 14, 12, 6, ROPE, 43, 0.85)}
      <S5Post x={P[0].x} y={P[0].y} h={P[0].h} shud={shud} />
      <S5Post x={P[1].x} y={P[1].y} h={P[1].h} shud={-shud} />
      {/* near ropes, in front of the pad, framing the blade base */}
      {s5rope("rf2", P[0].x, P[0].y - 46, P[1].x, P[1].y - 46, sFront, 7, mix(ROPE, "#8A7048", 0.3), 43, 0.95)}
      {s5rope("rf1", P[0].x, P[0].y - 24, P[1].x, P[1].y - 24, sFront + 5, 7, mix(ROPE, "#8A7048", 0.3), 43, 0.95)}
    </>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- attack drivers ----
  const strikeAmt = Math.min(1, S5_ALL.reduce((a, imp) => a + s5bump(lf, imp, 5), 0));
  const glintAmt = Math.min(1, S5_TELL.reduce((a, g) => a + s5bump(lf, g, 4), 0) + (lf > 64 ? over(lf, 64, 8) * 0.8 : 0)); // tell fires before all six strikes, then glints back up on the last frame: coiled to strike AGAIN, never done
  const hitShock = Math.min(1, S5_ALL.reduce((a, imp) => a + s5bump(lf, imp, 4), 0)); // for reactive parts
  const crackN = lf >= 30 ? 3 : lf >= 16 ? 2 : lf >= 10 ? 1 : 0; // crack ledger (binding: S5 lands exactly THREE fractures, at f10, f16, f30)
  const crackAt = crackN === 3 ? 30 : crackN === 2 ? 16 : 10;    // the impact frame that landed the current fracture count

  const mX = s5masterX(lf);
  const mVx = mX - s5masterX(lf - 1);
  const mY = s5masterY(lf);
  const mVy = mY - s5masterY(lf - 1);
  const dashOn = Math.min(1, Math.hypot(mVx, mVy) / 11);

  // blade rattle: rocks away from each strike (strikes come from the right), plus a live idle sway.
  const bladeRot = settle(lf, 10, -3.4, 0.17, 0.13) + settle(lf, 16, -3.8, 0.17, 0.13) + settle(lf, 30, -4.8, 0.16, 0.12)
    + settle(lf, 42, -4.0, 0.16, 0.11) + settle(lf, 52, -3.6, 0.16, 0.11) + settle(lf, 62, -4.6, 0.16, 0.11) // keeps shuddering through the back half
    + idle(lf, 0.7, 72) + drift(lf, 0.5, 41, 1.3);                        // a live, non-looping tremble so the blade is never frozen
  const bladeX = S5_AX + s5skid(lf);

  // the ring ropes recoil on every strike, then keep swinging (follow-through).
  const ropeShud = S5_ALL.reduce((a, imp) => a + settle(lf, imp, 5.5, 0.28, 0.14), 0);

  // ---- camera: RING with decaying shake per strike + a brief dolly-in kick ----
  const sc = shakeCam(lf, [{ at: 10, amp: 9 }, { at: 16, amp: 8 }, { at: 30, amp: 11 }, { at: 42, amp: 9 }, { at: 52, amp: 8 }, { at: 62, amp: 13 }]);
  const push = 0.03 * strikeAmt;                                           // ~3 percent dolly-in on each strike
  const cam = { x: CAMS.RING.x + sc.x, y: CAMS.RING.y + sc.y, z: CAMS.RING.z * sc.z * (1 + push) };

  // watcher senseis flinch downward on impact.
  const s5watch = (i: number) => -7 * Math.min(1, S5_ALL.reduce((a, imp) => a + s5bump(lf - i * 2, imp, 4), 0)) - Math.abs(idle(lf, 1.6, 90, i)) * 0.4; // staggered flinch on every hit, two watchers never react as one

  // FIGHT banner slam (Street Fighter round-start, geometric): slams in f6, holds ~4f,
  // then whips UP and out by f18 so it never blocks the strikes and the cracking blade.
  const bIn = over(lf, 6, 3);
  const bExit = over(lf, 12, 6, Easing.in(Easing.cubic));                  // 0 at f12 -> 1 at f18: the sign clears the ring
  const bO = bIn * (1 - bExit);
  const bScale = 1 + (1 - over(lf, 6, 5, Easing.out(Easing.poly(5)))) * 1.35 + settle(lf, 11, 0.05, 0.16, 0.16) + bExit * 0.6;
  const bSkew = -6 + settle(lf, 11, 3, 0.2, 0.14) + bExit * 10;
  const bLift = -bExit * bExit * 180;                                     // accelerating lift off the top of frame
  const bShock = s5bump(lf, 9, 6);

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround
          lf={lf}
          padLit={[0.85, 0.85, 0.6, 0.6]}
          redPadLit={1}
          bridgeActive={1}
          forgeHot={1}
          gateLit={0.85}
          sealUnlocked={0}
          masterGold={0}
          warm={0.12}
          moonGlow={1}
          rain={1}
          embers={1}
        >
          {/* the master's menace-red aura strobing over the ring (its aura alone) */}
          <Glow x={S5_AX} y={1088} r={360} hue={ADVRED} o={0.12 + Math.max(strikeAmt, glintAmt * 0.7) * 0.3 + crackN * 0.035} blur={44} ry={168} z={19} />

          {/* watcher senseis on the bridges above, reacting to every hit */}
          <div style={{ position: "absolute", left: 0, top: s5watch(0), zIndex: 40 }}>
            <Sensei lf={lf} x={280} y={852} size={132} accent="#B85E3C" hammer={0} />
          </div>
          <div style={{ position: "absolute", left: 0, top: s5watch(1), zIndex: 40 }}>
            <Sensei lf={lf} x={742} y={824} size={128} accent="#C56B45" hammer={0} />
          </div>

          {/* the viewer stand-in, flinching on the ledge */}
          <Novice lf={lf} x={150} y={1408} flinch={hitShock} />

          {/* the SPARRING RING: posts and shuddering ropes framing the blade */}
          <S5RingRopes lf={lf} shud={ropeShud} />

          {/* the clamp holding the blade upright on the sparring pad */}
          <div style={{ position: "absolute", left: S5_AX - 34, top: S5_AY - 30, width: 68, height: 34, zIndex: 43 }}>
            <div style={{ position: "absolute", left: 0, top: 4, width: 20, height: 30, background: "linear-gradient(180deg,#3A424E,#191D24)", borderRadius: 3, transform: "skewX(10deg)" }} />
            <div style={{ position: "absolute", right: 0, top: 4, width: 20, height: 30, background: "linear-gradient(180deg,#3A424E,#191D24)", borderRadius: 3, transform: "skewX(-10deg)" }} />
            <div style={{ position: "absolute", left: 6, top: 26, width: 56, height: 10, background: "#12161C", borderRadius: 3 }} />
          </div>

          {/* THE BLADE, clamped, cracking under the strikes (dims + reddens via crack) */}
          <Blade lf={lf} x={bladeX} y={S5_AY} temper={1} build={1} crack={crackN} glow={1} ring={0} reflect={0.5} rot={bladeRot} s={0.95} />

          {/* dash speed-lines while the master crosses the ring */}
          <SpeedLines lf={lf} x={S5_AX - 260} y={950} w={560} h={240} dir={mVx > 0 ? 0 : 180} n={14} on={dashOn} hue="rgba(232,214,190,0.55)" z={49} sd={7} />

          {/* THE RED MASTER: dashes and strikes. Eyes sealed, staff swinging on the strike.
              Smeared into motion streaks while it crosses the ring, so every lunge reads as a hard, fast dash. */}
          <Smear dx={mVx * 1.5} dy={mVy * 1.4} ghosts={4} on={dashOn} o={0.32} stretch={1.26} z={49}>
            <RedMaster lf={lf} x={mX} y={mY} glint={glintAmt} strike={strikeAmt} maskLift={0} gold={0} bow={0} />
          </Smear>

          {/* per-strike weight package at the contact point + a shockwave at the pad base.
              Fires on ALL six impacts so the back half keeps throwing sparks, debris and dust. */}
          {S5_ALL.map((imp) => {
            const isCrack = S5_IMP.indexOf(imp) >= 0;                     // the three fracture-landing strikes hit hardest
            const flash = s5bump(lf, imp, 2);
            const fr = isCrack ? 108 : 82;                                // cracking strikes throw a bigger white contact flash
            return (
            <React.Fragment key={imp}>
              {flash > 0.01 && (
                <div style={{ position: "absolute", left: S5_CX - fr, top: S5_CY - fr, width: fr * 2, height: fr * 2, borderRadius: "50%", background: "radial-gradient(circle, #FFFFFF, transparent 64%)", opacity: flash * (isCrack ? 1 : 0.85), mixBlendMode: "screen", filter: "blur(2px)", zIndex: 55 }} />
              )}
              {/* the red fracture SPLIT flaring up the blade exactly where the staff lands: cause and effect share the frame */}
              {isCrack && s5bump(lf, imp, 4) > 0.01 && (
                <div style={{ position: "absolute", left: S5_CX - 7, top: S5_CY - 118, width: 14, height: 150, background: `linear-gradient(180deg, transparent, ${HOTRED}, ${ADVRED}, transparent)`, opacity: s5bump(lf, imp, 4) * 0.85, mixBlendMode: "screen", filter: "blur(1.4px)", transform: `translate(-50%,0) rotate(${-7 + idle(lf, 5, 18, imp)}deg)`, transformOrigin: "50% 90%", zIndex: 56 }} />
              )}
              <GroundRing lf={lf} at={imp} x={S5_AX} y={S5_AY + 8} r={230} dur={18} hue="rgba(220,214,200,0.5)" z={25} />
              <Sparkles lf={lf} at={imp} x={S5_CX} y={S5_CY} n={16} life={26} spread={150} rise={96} hue="#FFDCA0" sd={imp} z={54} />
              <Sparkles lf={lf} at={imp} x={S5_CX} y={S5_CY} n={9} life={20} spread={90} rise={70} hue="#FFF3DC" sd={imp + 3} z={54} />
              <Debris lf={lf} at={imp} x={S5_CX} y={S5_CY + 8} n={7} life={30} spread={130} rise={72} hue="#39312B" sd={imp} z={52} />
              <Dust lf={lf} at={imp + 1} x={S5_AX} y={S5_AY} n={11} life={70} spread={150} hue="rgba(180,172,156,0.5)" sd={imp} z={24} />
            </React.Fragment>
            );
          })}
        </ProvingGround>
      </Cam>

      {/* ---- panel-local UI (crisp, not scaled by the camera) ---- */}
      <Vig o={0.34} />
      <SceneTag f={lf} text="THE ATTACK" color={HOTRED} />

      {/* FIGHT banner (geometric round-start slam), pop-culture comment-bait */}
      {lf >= 6 && bO > 0.01 && (
        <div style={{ position: "absolute", left: 506, top: 292, transform: `translate(-50%,-50%) translateY(${bLift}px) scale(${bScale}) skewX(${bSkew}deg)`, opacity: bO, zIndex: 90 }}>
          <div style={{ position: "relative", padding: "10px 40px", background: "linear-gradient(180deg,#2A303B,#15181F)", border: "4px solid #E9E2D4", borderRadius: 10, boxShadow: "0 20px 44px -16px rgba(0,0,0,0.7)" }}>
            <div style={{ position: "absolute", inset: 5, border: "2px solid rgba(233,226,212,0.35)", borderRadius: 6 }} />
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, letterSpacing: "0.02em", color: "#F6F1E6", WebkitTextStroke: "2px #10131A" }}>FIGHT</span>
          </div>
          {bShock > 0.02 && <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 + bShock * 700, height: 8, background: "linear-gradient(90deg,transparent,rgba(246,241,230,0.8),transparent)", transform: `translate(-50%,-50%) skewX(${-bSkew}deg)`, opacity: (1 - bShock) * 0.8, filter: "blur(1px)" }} />}
        </div>
      )}

      {/* ATTACK chip flips on the first landed hit */}
      {lf >= 10 && (
        <div style={{ position: "absolute", left: 60, top: 700, transform: `scale(${over(lf, 10, 4, Easing.out(Easing.back(2.4))) * (1 + hitShock * 0.06)}) rotate(${settle(lf, 10, -4, 0.2, 0.16) + idle(lf, 1.1, 74) - hitShock * 2}deg)`, transformOrigin: "0% 50%", zIndex: 92 }}>
          <Chip text="ATTACK" bg="rgba(30,10,10,0.9)" bd={HOTRED} fg="#FFE1DA" size={34} />
        </div>
      )}

      {/* HITS counter, driven by the fractures landed (settles reading x2) */}
      {crackN >= 1 && (
        <div style={{ position: "absolute", left: 726, top: 690, zIndex: 92, display: "flex", alignItems: "flex-end", gap: 10, transform: `scale(${1 + s5bump(lf, crackAt, 5) * 0.2 + hitShock * 0.1}) rotate(${-hitShock * 1.5 + idle(lf, 0.6, 88)}deg)`, transformOrigin: "100% 100%" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: "0.12em", color: "rgba(232,222,206,0.85)", paddingBottom: 8 }}>HITS</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: "#FFEDE6", WebkitTextStroke: "1.5px #2A1E12" }}>{`x${crackN}`}</span>
        </div>
      )}
    </>
  );
};

// ==== part: 16_S6.tsx ====
// ============================================================================
// SCENE 6, THE HUNT. camera SCAN. 71 frames (lf 0..70).
// Takeaway sound off: a red scanner sweeps a big detailed forged BLADE and locks
// onto three distinct flaws, a jagged CRACK, a punched HOLE, and a loose RIVET
// (the lazy shortcut), each with a bracket snap, a flying label and a beep.
//
// Rebuilt as a true MACRO. The blade is no longer a distant sliver: it is a large
// crafted forged-steel surface filling the frame (bevels, central fuller, spine
// and edge highlights, a faint temper hamon, forge-wear scratches and hammer
// dents, its dim S5 red cracks), clamped in a vice. The reticle HUNTS over it and
// snaps a lock onto each flaw, physically on the steel. The dojo-forge world sits
// far behind, dimmed and blurred, with the crouched Red Master leaning in at
// lower-left and the Novice cameo watching and flinching at right.
//
// AT FRAME 0 (complete, dressed, MID ACTION):
//  - camera mid a slow macro creep + slow orbit + handheld micro-noise. Never locked.
//  - the MACRO BLADE stands clamped upright, temper 1 rough steel, carrying its S5
//    dim red cracks, breathing and swaying, underlight flickering. A wounded object.
//  - the RED SCAN RETICLE already live over the blade (~0.5 opacity, brightening),
//    grid on, scanline sweeping, hunting between targets.
//  - the RED MASTER lowering into a stalking crouch lower-left, darkened silhouette,
//    mask glint pulsing, bo angled in toward the blade. Eyes hidden. Never destroyed.
//  - the NOVICE cameo peeks from a background pad at right, watching, about to flinch.
//  - the loose rivet is seated (buzzing later), the hole faint, neither ignited yet.
//  - ProvingGround atmosphere behind: dim red-tinted arena, bridge data-pulses,
//    forge glow, lantern flicker, diagonal rain, drifting embers, moon and ridge.
//  - NO flaw labels / tally yet (they stamp on their beats f10 / f27 / f45).
// Reserved-colour discipline: menace-red belongs to the master and the flaws it
// lights. Zero gold, zero green, zero blue-steel here (blade is still rough steel).
// ============================================================================
const S6_pulse = (lf: number, at: number, w: number) => Math.exp(-Math.pow((lf - at) / w, 2));

// steel palette for the macro surface (temper 1, rough dark forged steel).
const S6_STEEL = "#3B424C", S6_STEEL_HI = "#7E8792", S6_STEEL_LO = "#20262E", S6_EDGE = "#AAB3BD";

// flaw anchors, in panel coords, already sitting on the (slightly tilted) blade.
const S6_F = { crack: { x: 510, y: 585 }, hole: { x: 500, y: 440 }, rivet: { x: 490, y: 300 } };

// lock frames re-fitted into the new 71-frame budget.
const S6_LA = 10, S6_LB = 27, S6_LC = 45;

// THE MACRO BLADE SURFACE. One big crafted forged blade drawn straight in panel
// coordinates, tilted a few degrees for a dynamic diagonal. Bevels, fuller,
// highlights, hamon, wear, hammer dents, vice clamp, and the dim S5 cracks that
// the weak-spot lock re-ignites. Never frozen (the parent sways and breathes it).
const S6_MacroBlade: React.FC<{ lf: number; lockA: number; hot: number }> = ({ lf, lockA, hot }) => {
  const und = 0.6 + 0.4 * Math.abs(Math.sin(lf / 9));          // underlight flicker
  const crackHue = mix("#FF5A44", "#B4241C", 0.25);
  const preDim = 0.28 + 0.14 * Math.sin(lf / 7);               // old cracks breathe dim
  const wsGlow = 0.35 + lockA * 0.55 + 0.2 * Math.sin(lf / 5); // weak-spot crack brightens on lock
  return (
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} shapeRendering="geometricPrecision">
      <defs>
        <linearGradient id="s6body" gradientUnits="userSpaceOnUse" x1="440" y1="120" x2="560" y2="640">
          <stop offset="0" stopColor={S6_STEEL_LO} />
          <stop offset="0.5" stopColor={S6_STEEL} />
          <stop offset="0.72" stopColor={mix(S6_STEEL, S6_STEEL_HI, 0.35)} />
          <stop offset="1" stopColor={S6_STEEL_LO} />
        </linearGradient>
        <linearGradient id="s6guard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A626C" />
          <stop offset="1" stopColor="#1C2026" />
        </linearGradient>
      </defs>
      <g transform="rotate(-4 500 440)">
        {/* soft dark drop shadow behind the blade */}
        <polygon points="512,132 562,262 572,472 566,660 462,660 456,472 466,262" fill="#05070A" opacity={0.55} transform="translate(10 12)" style={{ filter: "blur(9px)" }} />

        {/* the vice clamp gripping the ricasso: clamped upright */}
        <rect x={372} y={648} width={256} height={96} rx={8} fill="url(#s6guard)" stroke={S6_STEEL_LO} strokeWidth={2} />
        <rect x={372} y={648} width={256} height={9} fill="rgba(255,255,255,0.10)" />
        <circle cx={402} cy={696} r={11} fill="#2A2F37" stroke="#565E68" strokeWidth={3} />
        <circle cx={598} cy={696} r={11} fill="#2A2F37" stroke="#565E68" strokeWidth={3} />
        <rect x={340} y={678} width={44} height={30} rx={4} fill="#3A414B" stroke={S6_STEEL_LO} strokeWidth={2} />
        <rect x={616} y={678} width={44} height={30} rx={4} fill="#3A414B" stroke={S6_STEEL_LO} strokeWidth={2} />

        {/* the cross guard */}
        <rect x={406} y={636} width={188} height={26} rx={5} fill="url(#s6guard)" />
        <rect x={406} y={636} width={188} height={6} fill="rgba(255,255,255,0.14)" />

        {/* blade body */}
        <polygon points="500,120 548,250 558,460 552,648 448,648 442,460 452,250" fill="url(#s6body)" />
        {/* left (spine) bevel, darker */}
        <polygon points="500,132 452,250 442,460 448,648 500,644" fill={S6_STEEL_LO} opacity={0.55} />
        {/* right (edge) bevel, catches the cold light */}
        <polygon points="500,132 548,250 558,460 552,648 500,644" fill={S6_STEEL_HI} opacity={0.22 * und + 0.14} />
        {/* central fuller groove */}
        <line x1="500" y1="150" x2="500" y2="632" stroke={S6_STEEL_LO} strokeWidth={5} opacity={0.7} />
        <line x1="503" y1="150" x2="503" y2="632" stroke={S6_STEEL_HI} strokeWidth={1.5} opacity={0.35} />
        {/* bright edge highlight strip */}
        <polyline points="546,258 555,460 550,636" fill="none" stroke={S6_EDGE} strokeWidth={2.4} opacity={0.5 * und + 0.3} />
        {/* faint temper hamon wave along the edge (temper colour, kept steel-warm not gold) */}
        <path d="M470 300 Q492 360 476 424 Q462 486 484 560 Q496 606 488 636" fill="none" stroke={mix(S6_STEEL_HI, "#C9B79A", 0.25)} strokeWidth={3} opacity={0.22 + 0.06 * Math.sin(lf / 11)} />
        {/* forge-wear scratches */}
        {[[478, 220, 520, 236], [462, 400, 498, 388], [512, 512, 544, 528], [470, 560, 506, 548], [496, 336, 532, 324]].map((s, i) => (
          <line key={"w" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} stroke={S6_STEEL_HI} strokeWidth={1} opacity={0.16} />
        ))}
        {/* hammer dents, small faceted shading */}
        {[[486, 268], [520, 356], [470, 470], [528, 556]].map((d, i) => (
          <polygon key={"d" + i} points={`${d[0]},${d[1]} ${d[0] + 12},${d[1] + 4} ${d[0] + 8},${d[1] + 14} ${d[0] - 3},${d[1] + 9}`} fill={i % 2 ? S6_STEEL_LO : S6_STEEL_HI} opacity={0.14} />
        ))}
        {/* tip catch-light */}
        <polygon points="500,120 512,164 500,150 488,164" fill={S6_EDGE} opacity={0.4 * und} />

        {/* the residual heat at the tang, temper 1 leftover glow */}
        <ellipse cx={500} cy={648} rx={30} ry={12} fill={NEONORANGE} opacity={hot * 0.35 * und} />

        {/* the two dim pre-existing S5 cracks, always faintly bleeding red */}
        <polyline points="492,346 502,356 495,366 505,378 498,392" fill="none" stroke={crackHue} strokeWidth={2.4} opacity={preDim} />
        <polyline points="482,488 492,498 485,508 495,520 488,532" fill="none" stroke={crackHue} strokeWidth={2.4} opacity={preDim} />
        {/* THE WEAK-SPOT crack, jagged, the one the first lock re-ignites hot */}
        <polyline points="494,558 508,570 497,582 512,595 499,610 511,624" fill="none" stroke={crackHue} strokeWidth={3.4} opacity={Math.min(1, wsGlow)} />
      </g>
    </svg>
  );
};

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  const base = CAMS.SCAN;

  // CAMERA. A slow macro creep (z breathes up, never lands), a slow orbit drift,
  // and three weighted punch-ins as each flaw locks, each with a tiny wind-up.
  const push = over(lf, 0, 90, Easing.inOut(Easing.sin)); // still creeping at f70
  const zPunch =
    S6_pulse(lf, S6_LA, 2.4) * 0.024 + S6_pulse(lf, S6_LB, 2.4) * 0.024 + S6_pulse(lf, S6_LC, 2.6) * 0.034
    - S6_pulse(lf, S6_LA - 3, 1.7) * 0.011 - S6_pulse(lf, S6_LB - 3, 1.7) * 0.011 - S6_pulse(lf, S6_LC - 3, 1.7) * 0.013;
  const z = base.z * (0.965 + push * 0.06 + zPunch);
  const sc = shakeCam(lf, [{ at: S6_LA, amp: 4, dur: 12 }, { at: S6_LB, amp: 4, dur: 12 }, { at: S6_LC, amp: 5, dur: 13 }], 1);
  const orbitX = Math.sin(lf / 40) * 9;
  const camx = 506 - 506 / z + orbitX + sc.x;
  const camy = 995 - 400 / z + sc.y;
  const cam = { x: camx, y: camy, z };

  // shared lock shake in PANEL space, so the macro foreground jolts with the world.
  const shX = sc.x * 0.9, shY = sc.y * 0.9;

  // THE MASTER. Lowering into a stalking crouch lower-left, leaning in, mask glint
  // pulsing and spiking with satisfaction on each lock. A jab of the bo per lock.
  const lockHit = settle(lf, S6_LA, 1, 0.14, 0.11) + settle(lf, S6_LB, 1, 0.14, 0.11) + settle(lf, S6_LC, 1.2, 0.14, 0.11);
  const masterLeanX = 6 * over(lf, 0, 20, Easing.out(Easing.cubic)) + lockHit * 7 + drift(lf, 2.4, 70);
  const masterLeanR = lockHit * 3 + idle(lf, 1, 58);
  const crouch = 0.4 + over(lf, 0, 16, Easing.out(Easing.cubic)) * 0.6;
  const glint = Math.min(
    1,
    0.4 + 0.2 * Math.abs(Math.sin(lf / 7)) + S6_pulse(lf, S6_LA + 1, 3) * 0.5 + S6_pulse(lf, S6_LB + 1, 3) * 0.5 + S6_pulse(lf, S6_LC + 1, 3.4) * 0.6
  );
  const staffAngle = 24 + idle(lf, 2.2, 70) + lockHit * 12;

  // THE NOVICE cameo, watching from a back pad, flinching on each lock.
  const noviceFlinch = Math.min(1, S6_pulse(lf, S6_LA, 3) + S6_pulse(lf, S6_LB, 3) + S6_pulse(lf, S6_LC, 3.2));

  // THE RETICLE. Present from f0 (life), brightening as it settles, hunting between
  // locks then snapping to the target on each lock.
  const reticleOn = 0.5 + over(lf, 3, 10, Easing.out(Easing.cubic)) * 0.5;
  const near = Math.min(1, S6_pulse(lf, S6_LA, 5) + S6_pulse(lf, S6_LB, 5) + S6_pulse(lf, S6_LC, 5));
  const huntX = drift(lf, 10, 44) * (1 - near);
  const huntY = idle(lf, 6, 33, 1) * (1 - near);

  // the wounded blade never freezes: slow sway + breathe, with a shudder spiking
  // just before each lock.
  const bladeShud = S6_pulse(lf, S6_LA - 2, 3) + S6_pulse(lf, S6_LB - 2, 3) + S6_pulse(lf, S6_LC - 2, 3);
  const bladeSway = idle(lf, 0.5, 62) + nz(Math.floor(lf), 21) * bladeShud * 0.8;
  const bladeBob = idle(lf, 2.0, 78);
  const bladeSc = breathe(lf, 0.008, 70);

  // THE THREE LOCKS. Staggered stamps with an overshoot; each is the beat its flaw
  // ignites red. lockN drives its FlawTag and its ignite flash.
  const lockA = over(lf, S6_LA, 8, Easing.out(Easing.back(2.4)));  // WEAK SPOT (crack), lower
  const lockB = over(lf, S6_LB, 8, Easing.out(Easing.back(2.4)));  // HOLE, middle
  const lockC = over(lf, S6_LC, 8, Easing.out(Easing.back(2.4)));  // SHORTCUT (loose rivet), upper

  // the loose rivet: buzzes for a few frames, then pops free and tumbles off-blade.
  const rivetShud = (lf >= S6_LC - 6 && lf < S6_LC) ? idle(lf, 2.6, 2.6) : 0;
  const rivetLoose = lf >= S6_LC;
  const rX = (g: number) => rivetLoose ? arcX(g, S6_LC, 28, S6_F.rivet.x, S6_F.rivet.x - 70) : S6_F.rivet.x + rivetShud;
  const rY = (g: number) => rivetLoose ? arcY(g, S6_LC, 28, S6_F.rivet.y, 44, S6_F.rivet.y + 300) : S6_F.rivet.y;
  const rivetX = rX(lf), rivetY = rY(lf);
  const rivetRot = rivetLoose ? (lf - S6_LC) * 20 : idle(lf, 4, 80);
  const rvVX = rivetX - rX(lf - 1), rvVY = rivetY - rY(lf - 1);

  // running tally, counts up honestly as each locks.
  const flawN = (lf >= S6_LA ? 1 : 0) + (lf >= S6_LB ? 1 : 0) + (lf >= S6_LC ? 1 : 0);
  const tallyIn = over(lf, S6_LA + 1, 8, Easing.out(Easing.back(2)));
  const tallyPop = S6_pulse(lf, S6_LA + 1, 3) + S6_pulse(lf, S6_LB + 1, 3) + S6_pulse(lf, S6_LC + 1, 3.4);
  const hot1 = 0.3; // temper 1 residual heat

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround fore={0}
          lf={lf}
          padLit={[0.14, 0.12, 0.16, 0.13]}
          redPadLit={1}
          bridgeActive={0.5}
          forgeHot={0.45}
          gateLit={0.28}
          moonGlow={0.55}
          rain={1}
          embers={0.7}
          masterGold={0}
          warm={0}
        >
          {/* THE NOVICE cameo, watching from a back pad at right, flinching on locks */}
          <Novice lf={lf} x={SITE.b0.x} y={SITE.b0.y - 6} flinch={noviceFlinch} hideEyes={noviceFlinch * 0.5} size={74} />

          {/* THE RED MASTER, crouched lower-left, leaning in, hunting. Darkened to a
              silhouette so the blade and its red flaws stay the brightest thing. */}
          <div style={{ position: "absolute", left: 0, top: 0, filter: "brightness(0.6) saturate(1.05)", transformOrigin: "250px 1175px", transform: `translate(${masterLeanX.toFixed(2)}px, ${(-lockHit * 2).toFixed(2)}px) rotate(${masterLeanR.toFixed(3)}deg)` }}>
            <RedMaster lf={lf} x={250} y={1175} size={170} glint={glint} strike={0} scan={crouch} maskLift={0} gold={0} bow={0} staffAngle={staffAngle} />
          </div>
        </ProvingGround>
      </Cam>

      {/* the whole background is pushed back with a dim wash + soft blur so the macro
          blade reads as the single hero. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 46%, transparent 20%, rgba(6,8,12,0.5) 74%)" }} />

      {/* ---- THE MACRO STAGE (foreground, panel-local, jolts with the lock shake) ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none", transform: `translate(${shX.toFixed(2)}px, ${(shY + bladeBob).toFixed(2)}px) rotate(${bladeSway.toFixed(3)}deg) scale(${bladeSc.toFixed(4)})`, transformOrigin: "500px 460px" }}>
        {/* cold spotlight pool + clinical red hunting wash on the blade */}
        <Glow x={500} y={430} r={300} hue={mix(COOL, "#FFFFFF", 0.25)} o={0.18} blur={56} ry={330} z={39} />
        <Glow x={500} y={430} r={210} hue={ADVRED} o={0.1 + 0.05 * Math.sin(lf / 9)} blur={42} ry={260} z={39} />

        {/* the crafted forged blade surface */}
        <S6_MacroBlade lf={lf} lockA={lockA} hot={hot1} />

        {/* the punched HOLE, faint until the scan lights it red */}
        <div style={{ position: "absolute", left: S6_F.hole.x - 20, top: S6_F.hole.y - 16, width: 40, height: 32, zIndex: 45 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 62%, #05070A, #0E1218)", border: `2.5px solid ${mix("#3A3038", ADVRED, lockB)}`, opacity: 0.7 + lockB * 0.3, boxShadow: "inset 0 3px 4px rgba(0,0,0,0.8)" }} />
          <div style={{ position: "absolute", left: 6, bottom: 3, width: 24, height: 6, borderRadius: "50%", background: "rgba(180,190,200,0.35)" }} />
          {lockB > 0.05 && <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, ${ADVRED}, transparent 66%)`, opacity: lockB * 0.6, filter: "blur(6px)", mixBlendMode: "screen" }} />}
        </div>

        {/* the loose RIVET (the lazy shortcut): seated, buzzes, pops free and tumbles */}
        <Smear dx={rvVX} dy={rvVY} on={rivetLoose ? 1 : 0} ghosts={3} o={0.4} z={46}>
          <div style={{ position: "absolute", left: rivetX - 11, top: rivetY - 11, width: 22, height: 22, zIndex: 46, transform: `rotate(${rivetRot}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 36% 32%, #AEB8C2, #363C44)", border: `2.5px solid ${lockC > 0.05 ? ADVRED : "#565E68"}`, boxShadow: "0 2px 3px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 6, top: 6, width: 5, height: 5, borderRadius: "50%", background: "#D2D8DE", opacity: 0.85 }} />
            <div style={{ position: "absolute", left: 3, top: 9, width: 16, height: 3, background: "#2A2F37", opacity: 0.7 }} />
          </div>
        </Smear>
        {/* metal chips flung the frame the rivet pops free */}
        <Debris lf={lf} at={S6_LC} x={S6_F.rivet.x} y={S6_F.rivet.y} n={6} spread={90} rise={48} hue="#4A5058" z={47} />

        {/* ignite flashes: cause and effect share the frame with each lock */}
        <Glow x={S6_F.crack.x} y={S6_F.crack.y} r={80 * S6_pulse(lf, S6_LA + 2, 4)} hue={HOTRED} o={0.7 * S6_pulse(lf, S6_LA + 2, 4)} blur={12} z={48} />
        <Glow x={S6_F.hole.x} y={S6_F.hole.y} r={78 * S6_pulse(lf, S6_LB + 2, 4)} hue={HOTRED} o={0.7 * S6_pulse(lf, S6_LB + 2, 4)} blur={12} z={48} />
        <Glow x={S6_F.rivet.x} y={S6_F.rivet.y} r={76 * S6_pulse(lf, S6_LC + 2, 4)} hue={HOTRED} o={0.7 * S6_pulse(lf, S6_LC + 2, 4)} blur={12} z={48} />

        {/* found flaws keep pulsing red so nothing goes dead between locks */}
        <Glow x={S6_F.crack.x} y={S6_F.crack.y} r={48} hue={ADVRED} o={lockA * (0.26 + 0.16 * Math.sin(lf / 6))} blur={16} z={48} />
        <Glow x={S6_F.hole.x} y={S6_F.hole.y} r={48} hue={ADVRED} o={lockB * (0.26 + 0.16 * Math.sin(lf / 6 + 1))} blur={16} z={48} />
        <Glow x={S6_F.rivet.x} y={S6_F.rivet.y} r={44} hue={ADVRED} o={lockC * (0.24 + 0.16 * Math.sin(lf / 6 + 2))} blur={16} z={48} />

        {/* THE RED SCAN RETICLE sweeping the blade, hunting then snapping on each lock */}
        <div style={{ position: "absolute", left: 0, top: 0, opacity: reticleOn, transform: `translate(${huntX.toFixed(2)}px, ${huntY.toFixed(2)}px)`, zIndex: 54 }}>
          <ScanReticle
            lf={lf}
            x={500}
            y={440}
            w={340}
            h={600}
            locks={[
              { x: 180, y: 445, on: lockA },
              { x: 170, y: 300, on: lockB },
              { x: 160, y: 160, on: lockC },
            ]}
          />
        </div>

        {/* THE FLAW TAGS, stamping in sequence with flying labels */}
        <FlawTag lf={lf} x={S6_F.crack.x} y={S6_F.crack.y} kind="crack" on={lockA} />
        <FlawTag lf={lf} x={S6_F.hole.x} y={S6_F.hole.y} kind="hole" on={lockB} />
        <FlawTag lf={lf} x={S6_F.rivet.x} y={S6_F.rivet.y} kind="rivet" on={lockC} />
      </div>

      {/* ---- screen-space overlays ---- */}

      {/* faint red targeting grid over the whole frame, clinical mood */}
      <div style={{ position: "absolute", inset: 0, zIndex: 53, pointerEvents: "none", opacity: 0.14 + 0.05 * Math.sin(lf / 10), backgroundImage: `repeating-linear-gradient(0deg, ${ADVRED}22 0 1px, transparent 1px 46px), repeating-linear-gradient(90deg, ${ADVRED}22 0 1px, transparent 1px 46px)`, backgroundPosition: `0px ${(lf * 0.7 % 46).toFixed(2)}px, 0px 0px`, mixBlendMode: "screen" }} />

      {/* red-lit rain streaks in the foreground */}
      <div style={{ position: "absolute", inset: 0, zIndex: 55, pointerEvents: "none" }}>
        <RainStreaks lf={lf} o={0.28} n={22} hue="rgba(255,86,66,0.5)" z={55} h={792} speed={1.1} />
      </div>

      <SceneTag f={lf} text="THE HUNT" color={ADVRED} />

      {/* a diegetic SCANNING readout ticking in the corner (not a VO echo) */}
      <div style={{ position: "absolute", right: 44, top: 214, zIndex: 70, fontFamily: mono, fontSize: 15, letterSpacing: "0.16em", color: `${ADVRED}DD`, opacity: 0.7 + 0.3 * Math.abs(Math.sin(lf / 5)) }}>
        {`SCANNING${".".repeat(1 + (Math.floor(lf / 6) % 3))}`}
      </div>

      {/* the running FLAWS tally, counts up and pops on each lock */}
      {tallyIn > 0.02 && (
        <div style={{ position: "absolute", left: 500, top: 752, transform: `translate(-50%,${idle(lf, 1.6, 82).toFixed(2)}px) scale(${((0.6 + tallyIn * 0.4) * (1 + Math.min(0.28, tallyPop) * 0.4) * breathe(lf, 0.014, 74)).toFixed(4)})`, opacity: Math.min(1, tallyIn * 2), zIndex: 72 }}>
          <Chip text={`${flawN} FLAWS`} bg="rgba(28,8,8,0.92)" bd={HOTRED} fg="#FFE4DC" size={40} />
        </div>
      )}

      <Vig o={0.42} />
    </>
  );
};

// ==== part: 17_S7.tsx ====

// ============================================================================
// SCENE 7, THROWN BACK (the reforge loop). camera LOOP. 122 frames (lf 0..121).
// Takeaway sound-off: the flawed blade is HURLED down the bridges to the forge,
// plunged into the glowing kiln, re-hammered on the anvil with sparks, and each
// loop it comes back one temper-rank stronger with one fewer crack. Relentless
// repetition, not one event: three ACCELERATING loops (48 / 40 / 34 frames), the
// camera whip-tracking the blade up and down and tightening each cycle.
//
// AT FRAME 0 (complete, dressed, MID ACTION):
//  - CYCLE 1 is already underway: the RED MASTER is mid finishing-swing at the
//    sparring ring (swing ~0.44, contact lands f5), staff arcing toward the blade,
//    mask sealed (eyes hidden), tell-glint hot.
//  - the BLADE stands clamped at the ring, rough/dark (temper 1) and carrying the
//    three red cracks S6 found (crack 3), dimmed and reddened, glowing low.
//  - the two builder senseis wait at the forge below (idle), the hero forge-master
//    flinches on the forge edge, the NOVICE hides its eyes on the ring ledge.
//  - camera is craned into the two-zone LOOP framing (ring above, forge below),
//    already tracking, handheld micro-noise live.
//  - graph is live: bridge data-pulses, pad flicker, kiln fire, rain, embers, the
//    master's crimson bridge wired in. REFORGE x1 counter + TEMPER pips solid.
//  - the BACK TO THE FORGE banner is NOT up yet (flashes f7 each cycle).
// Reserved-colour discipline: NO gold, NO decorative green (rule 6). Menace-red is
// the master's alone. Green appears ONLY as crack-seal flashes at the forge. The
// blade never reaches temper 4 here (that gold seal is the S8 payoff): it climbs
// 1 -> 2 -> 3 and leaves near-mastered. The master is never destroyed; it stands
// at the ring winning every round on purpose.
// ============================================================================
const S7_CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const S7_RING = { x: 506, y: 1150 };
const S7_FORGE = { x: 506, y: 1898 };  // the anvil, where the blade is re-hammered
const S7_KILN = { x: 322, y: 1852 };   // the glowing kiln mouth, left of the anvil
const S7_CYC = [
  { s: 0, d: 48, tFrom: 1, tTo: 2, cFrom: 3, cTo: 2 },
  { s: 48, d: 40, tFrom: 2, tTo: 3, cFrom: 2, cTo: 1 },
  { s: 88, d: 34, tFrom: 3, tTo: 3, cFrom: 1, cTo: 1 }, // final: blocks, cut mid-throw
];
const s7pulse = (lf: number, at: number, w: number) => Math.exp(-Math.pow((lf - at) / w, 2));
const s7ci = (g: number) => (g < 48 ? 0 : g < 88 ? 1 : 2);
const s7beats = (ci: number) => {
  const c = S7_CYC[ci], d = c.d;
  if (ci === 2) {
    // last cycle: a BLOCK, banner, then a throw-down that is still airborne at the cut.
    return { strike: c.s + 9, banner: c.s + 13, down0: c.s + 16, down1: c.s + 52, ham0: 99999, ham1: 99999, up0: 99999, up1: 99999 };
  }
  return {
    strike: c.s + Math.round(0.10 * d),
    banner: c.s + Math.round(0.14 * d),
    down0: c.s + Math.round(0.17 * d),
    down1: c.s + Math.round(0.45 * d),
    ham0: c.s + Math.round(0.45 * d),
    ham1: c.s + Math.round(0.72 * d),
    up0: c.s + Math.round(0.76 * d),
    up1: c.s + d,
  };
};
// the blade's world position at any frame g (also sampled lagged for the whip cam).
const s7pos = (g: number) => {
  const ci = s7ci(g), b = s7beats(ci);
  let x = S7_RING.x, y = S7_RING.y, rot = -4 + idle(g, 3, 50);
  if (g < b.down0) {
    const rec = s7pulse(g, b.strike, 3.2);
    y = S7_RING.y + rec * 12;
    rot = -4 + rec * 16 + idle(g, 3, 50);
  } else if (g < b.down1) {
    const t = Math.max(0, Math.min(1, (g - b.down0) / (b.down1 - b.down0)));
    y = arcY(g, b.down0, b.down1 - b.down0, S7_RING.y, 96, S7_FORGE.y);
    x = S7_RING.x + Math.sin(t * Math.PI) * 150;   // bulge right, down the b0/b3 bridge
    rot = -4 - t * 430;                             // tumbles as it falls
  } else if (g < b.up0) {
    // stays pinned on the anvil, taking hammer jitter, right up to the fling
    // (was b.ham1, which left a 3f frozen-rotated hover between hammer and launch)
    y = S7_FORGE.y + Math.sin(g * 1.35) * 3;        // hammered jitter on the anvil
    x = S7_FORGE.x;
    rot = Math.sin(g * 1.2) * 2.5;
  } else if (g < b.up1) {
    const t = Math.max(0, Math.min(1, (g - b.up0) / (b.up1 - b.up0)));
    y = arcY(g, b.up0, b.up1 - b.up0, S7_FORGE.y, 176, S7_RING.y);
    x = S7_FORGE.x - Math.sin(t * Math.PI) * 158;   // bulge left, back up the b1/b2 bridge
    rot = -4 + (1 - t) * 400;
  }
  return { x, y, rot, ci };
};

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  const ci = s7ci(lf);
  const c = S7_CYC[ci];
  const b = s7beats(ci);

  // ---- the blade, its position, its heat, its rank, its cracks ----
  const p = s7pos(lf);
  const pv = s7pos(lf - 1);
  const vx = p.x - pv.x, vy = p.y - pv.y;
  const upFlight = lf > b.up0 && lf < b.up1;
  const inFlight = (lf > b.down0 && lf < b.down1) || upFlight;
  const atForge = lf >= b.down1 && lf < b.ham1;

  const hamDur = Math.max(4, b.ham1 - b.ham0);
  const temperVal = ci < 2 ? lerpv(over(lf, b.ham0 + 2, hamDur - 4, Easing.inOut(Easing.sin)), c.tFrom, c.tTo) : c.tFrom;
  const crackVal = ci < 2 ? lerpv(over(lf, b.ham0 + 5, hamDur - 8, Easing.inOut(Easing.sin)), c.cFrom, c.cTo) : c.cFrom;
  // re-heat: the blade flares white-hot on arrival at the anvil, then works cooler.
  const heat = ci < 2 ? interpolate(lf, [b.ham0 - 2, b.ham0 + 3, b.ham0 + 9, b.ham1], [0, 1, 0.8, 0.15], S7_CLAMP) : 0;
  const bladeGlow = 0.85 + heat * 0.7 + (atForge ? 0.1 : 0);

  // the crack-seal beat (green flash) and the PATCHED chip, once per hammer.
  const patchF = ci < 2 ? b.ham0 + Math.round(0.5 * hamDur) : 99999;
  const patchOn = ci < 2 ? interpolate(lf, [patchF, patchF + 4, patchF + 22, patchF + 30], [0, 1, 1, 0], S7_CLAMP) : 0;

  // ---- THE MASTER at the ring: mid finishing swing each cycle, tell fires first ----
  const strikeProp = interpolate(lf, [b.strike - 9, b.strike, b.strike + 8], [0, 1, 0], S7_CLAMP);
  const glint = Math.min(1, 0.30 + 0.16 * Math.abs(Math.sin(lf / 7)) + s7pulse(lf, b.strike - 6, 3.0) * 0.55 + s7pulse(lf, b.strike, 2.4) * 0.3);
  const staffAngle = -18 + idle(lf, 2.2, 70);

  // cycle-3 BLOCK: the near-mastered blade parries the first strike (steel flash, NO crack).
  const blockF = S7_CYC[2].s + 9;   // = 97, the cycle-3 strike frame
  const blockFlash = ci === 2 ? s7pulse(lf, blockF, 3.2) : 0;

  // ---- CAMERA: whip-track the blade up and down, tighter each cycle ----
  const lagF = 6 - ci * 1.6;                 // shorter lag = snappier follow each loop
  const camP = s7pos(lf - lagF);
  const camCenterY = Math.max(1040, Math.min(1900, camP.y - 92));
  const camX = 506 + (camP.x - 506) * 0.3;
  const z = 0.60 + ci * 0.05;                // tightens 0.60 -> 0.65 -> 0.70
  const cbase = camFor(camX, camCenterY, z, 0.47);
  const camHits = [
    { at: s7beats(0).strike, amp: 7 }, { at: s7beats(1).strike, amp: 7 }, { at: blockF, amp: 8, dur: 15 },
    { at: s7beats(0).down1, amp: 9 }, { at: s7beats(1).down1, amp: 9 },
    { at: s7beats(0).ham0 + 2, amp: 6, dur: 9 }, { at: s7beats(0).ham0 + 9, amp: 6, dur: 9 },
    { at: s7beats(1).ham0 + 2, amp: 6, dur: 9 }, { at: s7beats(1).ham0 + 8, amp: 6, dur: 9 },
  ];
  const sc = shakeCam(lf, camHits, 1.1);
  const cam = { x: cbase.x + sc.x, y: cbase.y + sc.y, z: cbase.z * sc.z };

  // ---- forge team activity ----
  const forging = ci < 2 && lf >= b.ham0 - 2 && lf < b.ham1 + 4 ? 1 : 0;
  const blaze = forging ? 0.4 + 0.6 * Math.abs(Math.sin(lf * 1.35)) : 0;
  const warm = interpolate(camCenterY, [1200, 1700], [0.15, 0.6], S7_CLAMP); // warmer as we near the forge

  // hero / novice reactions
  const flinch = Math.min(1, s7pulse(lf, s7beats(0).strike, 4) + s7pulse(lf, s7beats(1).strike, 4) + s7pulse(lf, blockF, 4) * 0.7 + 0.12);

  // ---- screen overlays ----
  const bannerFlash = interpolate(lf, [b.banner, b.banner + 3, b.banner + 18, b.banner + 26], [0, 1, 1, 0], S7_CLAMP);
  const reforgeN = ci + 1;
  const rfPop = 1 + s7pulse(lf, [0, 48, 88][ci], 4) * 0.34;

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround
          lf={lf}
          padLit={[0.55, 0.5, 0.5, 0.55]}
          redPadLit={0.82}
          bridgeActive={1}
          forgeHot={1}
          blaze={blaze}
          gateLit={0.55}
          sealUnlocked={0}
          moonGlow={0.8}
          rain={1}
          embers={1}
          masterGold={0}
          warm={warm}
        >
          {/* the two builder senseis at the forge, identical job, hammering on the
              hammer beats (the sameness is the thesis, never role-coded) */}
          <Sensei lf={lf} x={402} y={1904} size={158} accent="#C56B45" forging={forging} />
          {/* second smith offset a few frames so the two hammers alternate, not clang
              in robotic unison (identical job, staggered beat) */}
          <Sensei lf={lf - 3} x={614} y={1904} size={158} accent="#B85A3C" forging={forging} />

          {/* the hero forge-master, subordinate, watching the loop and flinching */}
          <ForgeMaster lf={lf} x={726} y={1978} size={150} hammer={1} gaze={-8} flinch={flinch * 0.8} />

          {/* extra hot glow on the anvil while the blade is being re-heated */}
          {heat > 0.03 && <Glow x={S7_FORGE.x} y={S7_FORGE.y - 30} r={150 * heat + 60} hue={mix(NEONORANGE, KEY, heat * 0.5)} o={0.35 + heat * 0.45} blur={22} ry={90} />}

          {/* the glowing KILN mouth left of the anvil, breathing brighter while forging */}
          <Glow x={S7_KILN.x} y={S7_KILN.y} r={72 + (forging ? 26 : 0)} hue={mix(NEONORANGE, KEY, blaze * 0.5)} o={0.32 + blaze * 0.3} blur={18} ry={52} />
          {/* quench PLUNGE: as the blade drops into the forge it hits the kiln first,
              a white-hot hiss flare then a rolling steam column (re-heat, never gold) */}
          {ci < 2 && (
            <>
              <Glow
                x={S7_FORGE.x}
                y={S7_FORGE.y - 22}
                r={interpolate(lf, [b.down1 - 2, b.down1 + 2, b.down1 + 9], [0, 132, 0], S7_CLAMP)}
                hue="#FFF3E0"
                o={interpolate(lf, [b.down1 - 2, b.down1 + 2, b.down1 + 10], [0, 0.75, 0], S7_CLAMP)}
                blur={18}
                ry={72}
              />
              <Sparkles lf={lf} at={b.down1 + 1} x={S7_FORGE.x} y={S7_FORGE.y - 36} n={16} life={22} spread={168} rise={104} hue="#FFE7C4" sd={ci * 6 + 9} z={47} />
            </>
          )}

          {/* rising quench steam + tempering heat-tongues off the anvil while the
              hammers work, so the forge zone below is never a dead quadrant */}
          {heat > 0.02 && (
            <>
              <Smoke lf={lf} x={S7_FORGE.x + 8} y={S7_FORGE.y - 34} w={140} h={250} hue="rgba(158,128,104,0.5)" o={0.5 * (0.4 + heat * 0.6)} bands={5} z={41} />
              {Array.from({ length: 5 }, (_, k) => {
                const hh = 24 + seed(k * 2.3 + ci) * 30 + Math.sin(lf / 5 + k * 1.6) * 12 * heat;
                return (
                  <div
                    key={k}
                    style={{
                      position: "absolute",
                      left: S7_FORGE.x - 46 + k * 21,
                      top: S7_FORGE.y - 26 - hh,
                      width: 14,
                      height: hh,
                      clipPath: "polygon(50% 0,100% 100%,0 100%)",
                      background: `linear-gradient(180deg, ${k % 2 ? KEY : NEONORANGE}, ${NEONORANGE}00)`,
                      opacity: (0.32 + heat * 0.5) * flick(lf, 0.4, k),
                      filter: "blur(1px)",
                      zIndex: 42,
                      pointerEvents: "none",
                    }}
                  />
                );
              })}
            </>
          )}

          {/* forge sparks on the hammer clangs (orange, the re-heat, never gold) */}
          {ci < 2 && atForge && (
            <>
              <Sparkles lf={lf} at={b.ham0 + 2} x={S7_FORGE.x} y={S7_FORGE.y - 40} n={14} life={20} spread={150} rise={92} hue={NEONORANGE} sd={ci * 3 + 1} z={45} />
              <Sparkles lf={lf} at={b.ham0 + 9} x={S7_FORGE.x} y={S7_FORGE.y - 40} n={12} life={18} spread={130} rise={80} hue={KEY} sd={ci * 3 + 4} z={45} />
            </>
          )}

          {/* the landing dust as the blade slams onto the anvil */}
          {ci < 2 && <Impact lf={lf} at={b.down1} x={S7_FORGE.x} y={S7_FORGE.y + 6} strength={1.1} hue="rgba(226,214,196,0.5)" dustHue="rgba(150,130,110,0.5)" debris={7} sparks={8} sd={ci * 5 + 2} z={30} />}

          {/* the crack-seal: a GREEN flash as a flaw is patched (green is only ever
              a seal here, per the reserved-colour ledger) */}
          {patchOn > 0.03 && (
            <>
              <Glow x={S7_FORGE.x - 6} y={S7_FORGE.y - 120} r={90} hue={PASSGREEN} o={patchOn * 0.6} blur={16} ry={140} />
              <Sparkles lf={lf} at={patchF} x={S7_FORGE.x - 6} y={S7_FORGE.y - 130} n={12} life={26} spread={120} rise={70} hue={PASSGREEN} sd={ci * 7 + 3} z={46} />
            </>
          )}

          {/* THE BLADE, hurled between the two zones. Smear on the fast throws. */}
          <Smear dx={vx} dy={vy} on={inFlight ? 1 : 0} ghosts={4} o={0.26} stretch={1.22} z={43}>
            <Blade
              lf={lf}
              x={p.x}
              y={p.y}
              temper={temperVal}
              build={1}
              crack={crackVal}
              ring={0}
              glow={bladeGlow}
              reflect={atForge ? 0.35 : upFlight ? 0.2 + ci * 0.14 : lf < b.down0 ? 0.3 : 0}
              rot={p.rot}
              s={0.92}
            />
          </Smear>

          {/* cycle-3 BLOCK flash: the blade parries, steel-bright, no red crack */}
          {blockFlash > 0.03 && (
            <>
              <Glow x={p.x} y={p.y - 130} r={110 * blockFlash + 30} hue={AZURE} o={blockFlash * 0.55} blur={16} />
              <Sparkles lf={lf} at={blockF} x={p.x} y={p.y - 130} n={16} life={20} spread={170} rise={96} hue="#CFE7FF" sd={9} z={47} />
              <div style={{ position: "absolute", left: p.x - 70, top: p.y - 200, width: 140, height: 140, borderRadius: "50%", border: `3px solid ${AZURE}`, opacity: (1 - blockFlash) * 0.6, transform: `scale(${0.5 + (1 - blockFlash) * 1.5})`, filter: "blur(1px)", mixBlendMode: "screen" }} />
            </>
          )}

          {/* THE RED MASTER, at the ring, mid finishing swing each cycle. Eyes hidden,
              never gold, never destroyed. It wins every round on purpose. */}
          <RedMaster
            lf={lf}
            x={706}
            y={S7_RING.y}
            size={168}
            glint={glint}
            strike={strikeProp}
            scan={0}
            maskLift={0}
            gold={0}
            bow={0}
            staffAngle={staffAngle}
          />

          {/* the impact flash where the master's staff meets the blade at the ring */}
          {strikeProp > 0.5 && ci < 2 && (
            <>
              <div style={{ position: "absolute", left: S7_RING.x - 60, top: S7_RING.y - 210, width: 120, height: 120, background: "radial-gradient(circle, #FFF, transparent 62%)", opacity: (strikeProp - 0.5) * 1.4, mixBlendMode: "screen", filter: "blur(2px)" }} />
              <Sparkles lf={lf} at={b.strike} x={S7_RING.x} y={S7_RING.y - 150} n={12} life={16} spread={150} rise={70} hue={mix(HOTRED, "#FF9A78", 0.4)} sd={ci * 4 + 6} z={49} />
            </>
          )}
          {/* a menace-red shockwave ring flung across the arena pad on every strike
              (the master's colour, its blow landing hard on purpose) */}
          {ci < 2 && <GroundRing lf={lf} at={b.strike} x={S7_RING.x} y={S7_RING.y - 6} r={236} dur={16} hue="rgba(255,96,72,0.5)" z={41} />}

          {/* the NOVICE on the ring ledge, hiding its eyes through the beating */}
          <div style={{ position: "absolute", left: 812, top: 1150 }}>
            <div style={{ position: "absolute", left: -54, top: 2, width: 116, height: 26, borderRadius: 6, background: "linear-gradient(180deg,#39414E,#20262F)", transform: "perspective(300px) rotateX(46deg)", opacity: 0.9 }} />
          </div>
          <Novice lf={lf} x={812} y={1150} flinch={flinch * 0.5} hideEyes={0.7 + flinch * 0.3} cheer={0} size={80} />
        </ProvingGround>
      </Cam>

      {/* ---------- panel-local (screen-space) overlays ---------- */}

      {/* directional speed lines while the blade is airborne */}
      <SpeedLines lf={lf} x={0} y={0} w={1012} h={792} dir={vy > 0 ? 78 : 102} n={16} on={inFlight ? Math.min(1, Math.hypot(vx, vy) / 40) : 0} hue="rgba(150,182,206,0.5)" z={70} />

      {/* red-lit rain streaks over the ring zone */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none" }}>
        <RainStreaks lf={lf} o={0.26} n={22} hue="rgba(255,110,86,0.4)" z={60} h={792} speed={1.2} />
      </div>

      {/* THE BACK TO THE FORGE banner (Dark Souls YOU DIED reskin), flashing each loop */}
      {bannerFlash > 0.02 && (
        <div style={{ position: "absolute", left: 0, top: 320, width: 1012, height: 132, zIndex: 92, pointerEvents: "none", opacity: bannerFlash }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 132, background: "linear-gradient(180deg, rgba(8,3,3,0) 0%, rgba(20,4,4,0.92) 26%, rgba(20,4,4,0.92) 74%, rgba(8,3,3,0) 100%)" }} />
          <div style={{ position: "absolute", left: 0, top: 64, width: 1012, height: 3, background: `linear-gradient(90deg, transparent, ${ADVRED}, transparent)`, opacity: 0.8 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 30, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: "0.02em", color: mix(ADVRED, "#FF7A64", 0.35), transform: `scale(${0.94 + bannerFlash * 0.06})`, textShadow: "0 3px 0 rgba(0,0,0,0.5)" }}>
            BACK TO THE FORGE
          </div>
        </div>
      )}

      {/* the REFORGE counter, popping up a notch each cycle */}
      <div style={{ position: "absolute", right: 44, top: 220, zIndex: 96, transform: `scale(${rfPop})`, transformOrigin: "100% 50%" }}>
        <Chip text={`REFORGE x${reforgeN}`} bg="rgba(28,8,8,0.9)" bd={ADVRED} fg="#FFE1DA" size={30} />
      </div>

      {/* the TEMPER pip-strip (retention device: even a paused frame shows progress) */}
      <div style={{ position: "absolute", right: 44, top: 268, zIndex: 96, display: "flex", gap: 7, alignItems: "center", padding: "6px 12px", borderRadius: 8, background: "rgba(14,20,30,0.72)", border: "1.5px solid rgba(120,150,190,0.4)" }}>
        <span style={{ fontFamily: mono, fontSize: 15, letterSpacing: "0.12em", color: "rgba(190,210,235,0.85)" }}>TEMPER</span>
        {[0, 1, 2, 3].map((i) => {
          const on = temperVal >= i + 0.55;
          const rising = temperVal > i - 0.1 && temperVal < i + 0.9;
          const col = i < 2 ? mix(NEONORANGE, "#C56B45", 0.3) : AZURE;
          return <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: on ? col : "transparent", border: `2px solid ${on ? col : "#39424E"}`, opacity: on ? (0.7 + 0.3 * (rising ? flick(lf, 0.5, i) : 1)) : 0.5, transform: rising && on ? `scale(${1 + s7pulse(lf, b.ham1, 6) * 0.3})` : "scale(1)" }} />;
        })}
      </div>

      {/* the PATCHED chip, flipping on as a flaw seals at the forge */}
      {patchOn > 0.03 && (
        <div style={{ position: "absolute", left: 44, top: 700, zIndex: 96, opacity: Math.min(1, patchOn * 2), transform: `translateY(${(1 - Math.min(1, patchOn * 2)) * 10}px) scale(${0.9 + Math.min(1, patchOn) * 0.1})` }}>
          <Chip text="PATCHED" bg="rgba(10,30,20,0.9)" bd={PASSGREEN} fg="#D8F4E6" size={28} />
        </div>
      )}

      <SceneTag f={lf} text="THROWN BACK" color={ADVRED} />
      <Vig o={0.36} />
    </>
  );
};

// ==== part: 18_S8.tsx ====

// ============================================================================
// SCENE 8, IT SURVIVED (THE TURN). camera TURN. 118 frames (lf 0..117).
// Starts 21.61s. THE EMOTIONAL PEAK, a stacked four-part reveal.
// Takeaway sound-off: the warrior swings to finish the blade, the blade HOLDS and
// rings like a bell, the warrior lifts its oni mask to a warm Claude face and bows,
// it was on your side all along.
//
// AT FRAME 0 INVENTORY (complete, dressed, MID ACTION):
//   - the whole ProvingGround is live: cold cliff warming a touch from below, moon
//     glow, ridgeline, amber bridges with travelling data-pulses, forge fire far
//     below, the arena pad tinted red under the master.
//   - the BLADE stands clamped upright on the arena pad, near-mastered (temper 3,
//     blue master-steel with green-sealed seams, NO cracks), glowing, breathing.
//   - the RED MASTER is already MID WIND-UP: the bo raised overhead, its red glint
//     building toward the finishing blow, staff and body alive (never frozen).
//   - two builder senseis watch from the bridges above; the NOVICE braces on the
//     lower-left ledge, eyes hidden, flinch-ready.
//   - red aura pulses over the ring, rain falls, embers rise, camera breathes.
// BEATS: strike lands DEAD at f18 (dull thud, GOLD ripple, zero crack, first gold
//   of the reel) -> blade holds + rings f22 + green PASS sweep -> master lowers the
//   staff f42 -> oni MASK LIFTS f55..75 to the same warm Claude face, eyes visible
//   -> camera PULLS BACK f80..99 revealing its crimson bridge wired into YOUR graph,
//   rim red -> GOLD -> temper snaps to 4, gold FLAWLESS seal slams f100, master BOWS,
//   novice leaps up cheering.
// Reserved-colour discipline: GOLD is spent from here on (the ripple, the rim, the
// seal, the FLAWLESS banner). Menace-red DRAINS to gold (subtract red). The finishing
// blow is a DEAD THUD, not a bamboo crack. The master is NEVER destroyed.
// ============================================================================

const S8_HIT = 18;                 // the finishing blow lands dead here
const S8_BX = 500, S8_BY = 1120;   // the blade, clamped upright on the arena pad (world)
const S8_CX = 512, S8_CY = 980;    // the contact point on the blade (world)
const S8_MY = 1120;                // the master baseline (world)

// a triangular 0..1..0 pulse centred on `at`, half-width `w`.
const s8bump = (lf: number, at: number, w: number) => { const t = Math.abs(lf - at); return t >= w ? 0 : 1 - t / w; };
// a smooth gaussian bump, for the tell glint.
const s8gauss = (lf: number, at: number, w: number) => Math.exp(-Math.pow((lf - at) / w, 2));

// celebration PETALS: geometric warm-gold diamonds drifting down through the ring
// on the bow, tumbling on their own axis (world coords, sit behind the hero blade).
const S8Petals: React.FC<{ lf: number; at: number; n?: number; z?: number }> = ({ lf, at, n = 18, z = 41 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const s0 = seed(i * 5.7 + 3), s1 = seed(i * 2.9 + 7);
    const st = at + Math.round(i * 1.3);
    const dur = 78 + s0 * 46;
    const t = (lf - st) / dur;
    if (t <= 0 || t >= 1) return null;
    const x = 120 + s0 * 760 + Math.sin(lf / (18 + s1 * 22) + i) * 30;
    const y = 800 + t * 420 + Math.sin(lf / 13 + i * 2) * 9;
    const sz = 9 + s1 * 11;
    const hue = mix("#F2C684", "#FFE9C4", s0);
    return <div key={i} style={{ position: "absolute", left: x - sz / 2, top: y - sz / 2, width: sz, height: sz * 0.62, background: `linear-gradient(180deg, ${hue}, ${mix(hue, "#B0782E", 0.55)})`, opacity: Math.sin(Math.min(1, t) * Math.PI) * 0.8 * (0.5 + s0 * 0.5), borderRadius: "60% 60% 50% 50% / 70% 70% 40% 40%", transform: `rotate(${(s1 * 360 + lf * (2.2 + s0 * 4) * (i % 2 ? 1 : -1)).toFixed(1)}deg)`, zIndex: z, boxShadow: "0 1px 2px rgba(0,0,0,0.35)", pointerEvents: "none" }} />;
  })}</>
);

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------------------------------------------------------------- drivers
  const strikeAmt = s8bump(lf, S8_HIT, 6);                              // 0..1..0 around the finishing blow
  // the bo is ALREADY raised overhead at f0 (mid wind-up), holds cocked, then the
  // strike swing (RedMaster strikeLean) brings it down.
  const raised = Math.max(0, 1 - over(lf, 12, 8));                      // 1 through f12, gone by f20
  // beat 3: a tiny anticipatory lift (f38..42) then the staff lowers slowly (f42..58).
  // the wind-up gives the previously frozen f39..42 gap real motion.
  const lower = antic(lf, 38, 20, 0.11, Easing.inOut(Easing.sin));
  const bowDrop = over(lf, 100, 12, Easing.out(Easing.cubic));
  const staffAngle = -20 - raised * 62 + lower * 36 + bowDrop * 16 + idle(lf, 1.3, 74);

  // the master steps in a touch to land the blow, then recoils back and settles.
  const mLunge = lf < S8_HIT
    ? -34 * over(lf, S8_HIT - 6, 6, Easing.in(Easing.quad))
    : -34 * Math.max(0, 1 - over(lf, S8_HIT, 20, Easing.out(Easing.cubic)));
  const mX = 700 + mLunge;

  // the reveal states.
  const ml = overshoot(lf, 55, 22, 0.06);                              // oni MASK lifts f55..77 with a soft settle (never a dead stop, keeps f69..79 alive)
  const g = over(lf, 80, 22, Easing.inOut(Easing.sin));               // rim RED -> GOLD f80..102
  const bow = over(lf, 100, 10, Easing.out(Easing.cubic)) + settle(lf, 111, 0.05, 0.14, 0.13);
  // the tell: a red glint 6 frames before the strike, meaningless once the mask is off.
  const glint = Math.min(1, (s8gauss(lf, 12, 4) + 0.16 * Math.abs(Math.sin(lf / 7)))) * (1 - ml);

  // ---------------------------------------------------------------- the blade
  const bladeTemper = lf >= 100 ? 4 : 3;
  const bladeGlow = 1 + strikeAmt * 0.35 + (lf >= 100 ? over(lf, 100, 10) * 0.5 : 0);
  const ringPulse = over(lf, 22, 26);                                  // one clear bell ring, expanding out
  const bladeRot = settle(lf, S8_HIT, -2.2, 0.2, 0.16) + idle(lf, 0.5, 70); // shoved, but HOLDS firm
  const bladeReflect = 0.45 + over(lf, 55, 50) * 0.25;

  // ---------------------------------------------------------------- warming
  const warm = 0.12 + over(lf, 55, 55) * 0.42;                          // chamber warms red -> gold from the mask lift

  // ---------------------------------------------------------------- camera
  // hero low-angle push into the blade (beats 1-2), rack tight onto the mask lift
  // (beats 3-4), then a majestic PULL-BACK revealing the wired-in bridge (beat 5).
  const pushIn = over(lf, 0, 18, Easing.inOut(Easing.sin)) * 0.06;
  const c0 = { x: CAMS.TURN.x, y: CAMS.TURN.y, z: CAMS.TURN.z * (1 + pushIn) };
  const cB = camFor(660, 1030, 1.30, 0.5);                             // tight on the master's upper body / mask
  const cC = camFor(650, 1035, 0.74, 0.5);                             // wide pull-back over the network
  const rack = over(lf, 42, 20, Easing.inOut(Easing.cubic));
  const pull = over(lf, 80, 22, Easing.inOut(Easing.cubic));
  const settleIn = over(lf, 58, 24, Easing.inOut(Easing.sin)) * 0.06;  // a slow creep into the unmasked face before the big pull-back (fills f69..79)
  let cam = lerpCam(c0, cB, rack);
  cam = lerpCam(cam, cC, pull);
  const sc = shakeCam(lf, [{ at: S8_HIT, amp: 7, dur: 16 }], 1);       // a soft decaying knock (a dead thud, not a crack)
  cam = { x: cam.x + sc.x, y: cam.y + sc.y, z: cam.z * sc.z * (1 + settleIn * (1 - pull)) + (lf >= 100 ? s8bump(lf, 100, 6) * 0.015 : 0) };

  // watcher senseis relieve + LEAP on the survive; the aura hue drains red -> gold.
  const watchLift = -22 * over(lf, 100, 12, Easing.out(Easing.back(2.4))) - Math.abs(idle(lf, 1.6, 90)) * 0.4;
  const auraHue = mix(ADVRED, GOLD, g);
  // the whole graph behind brightens as the survived work energizes the network.
  const graphLit = 0.6 + over(lf, 22, 46, Easing.out(Easing.cubic)) * 0.32;

  // gold data-pulse travelling the master's bridge into your graph (the wired-in reveal).
  const bp = over(lf, 80, 20, Easing.out(Easing.cubic));
  const gpx = SITE.arena.x + (SITE.red.x - SITE.arena.x) * bp;
  const gpy = SITE.arena.y + (SITE.red.y - SITE.arena.y) * bp;
  const uni = s8bump(lf, 92, 9);                                       // the whole network pulses in unison

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround
          lf={lf}
          padLit={[graphLit, graphLit, graphLit, graphLit]}
          redPadLit={1}
          bridgeActive={1}
          forgeHot={0.8}
          gateLit={0.85}
          sealUnlocked={0}
          masterGold={g}
          warm={warm}
          moonGlow={1}
          rain={1}
          embers={1}
        >
          {/* the ring aura: menace-red draining to protective gold as the turn lands */}
          <Glow x={506} y={1092} r={360} hue={auraHue} o={0.12 + strikeAmt * 0.14 + g * 0.12} blur={44} ry={168} z={19} />

          {/* the wired-in reveal: a bright gold pulse flowing along the master's bridge
              into your graph, plus a unison flash across the visible nodes */}
          {lf >= 78 && lf <= 104 && (
            <div style={{ position: "absolute", left: gpx - 14, top: gpy - 14, width: 28, height: 28, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, opacity: 0.9, filter: "blur(2px)", mixBlendMode: "screen", zIndex: 45 }} />
          )}
          {uni > 0.02 && [SITE.arena, SITE.red, SITE.b0, SITE.b1].map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x - 70, top: p.y - 42, width: 140, height: 84, borderRadius: "50%", background: `radial-gradient(ellipse, ${GOLD}, transparent 66%)`, opacity: uni * 0.4, filter: "blur(14px)", mixBlendMode: "screen", zIndex: 18 }} />
          ))}

          {/* the survived work now flows UP the graph toward the summit gate (the
              blade earned its place): two gold pulses travel arena -> b2/b3 -> torii */}
          {lf >= 92 && lf < 117 && [SITE.b2, SITE.b3].map((p, i) => {
            const t = over(lf, 94 + i * 3, 20, Easing.inOut(Easing.sin));
            const gx = SITE.arena.x + (p.x - SITE.arena.x) * t;
            const gy = SITE.arena.y + (p.y - SITE.arena.y) * t;
            return <div key={i} style={{ position: "absolute", left: gx - 9, top: gy - 9, width: 18, height: 18, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, opacity: Math.sin(Math.min(1, t) * Math.PI) * 0.9, filter: "blur(1.5px)", mixBlendMode: "screen", zIndex: 44 }} />;
          })}

          {/* the wired-in reveal made literal: a gold pip rings the master's own pad,
              re-reading the crimson node as NODE FIVE of your graph */}
          {lf >= 86 && (() => {
            const p = over(lf, 86, 12, Easing.out(Easing.back(2)));
            return (
              <div style={{ position: "absolute", left: SITE.red.x - 34, top: SITE.red.y - 20, width: 68, height: 40, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: p * 0.7 * (0.72 + 0.28 * Math.sin(lf / 8)), transform: `scale(${p})`, transformOrigin: "50% 50%", mixBlendMode: "screen", zIndex: 21, pointerEvents: "none" }} />
            );
          })()}

          {/* watcher senseis on the bridges above, relieved and lifting at the survive */}
          <div style={{ position: "absolute", left: 0, top: watchLift, zIndex: 40 }}>
            <Sensei lf={lf} x={300} y={860} size={126} accent="#B85E3C" hammer={0} />
          </div>
          <div style={{ position: "absolute", left: 0, top: watchLift * 0.8, zIndex: 40 }}>
            <Sensei lf={lf} x={740} y={832} size={122} accent="#C56B45" hammer={0} />
          </div>
          {/* the watching team throws up sparks as the blade survives (they react too) */}
          {lf >= 100 && [{ x: 300, y: 742 }, { x: 740, y: 716 }].map((p, i) => (
            <Sparkles key={i} lf={lf} at={100 + i * 2} x={p.x} y={p.y} n={8} life={30} spread={72} rise={82} hue={mix(GOLD, "#FFF3D0", 0.4)} sd={40 + i} z={44} o={0.7} />
          ))}

          {/* the viewer stand-in: braces (eyes hidden) then LEAPS UP cheering at the survive */}
          <Novice
            lf={lf}
            x={214}
            y={1408}
            hideEyes={Math.max(0, 1 - over(lf, 16, 8))}
            flinch={Math.max(0, 1 - over(lf, S8_HIT, 12)) * 0.55}
            cheer={over(lf, 100, 10, Easing.out(Easing.back(2.2)))}
          />

          {/* the clamp holding the blade upright on the arena pad */}
          <div style={{ position: "absolute", left: S8_BX - 34, top: S8_BY - 30, width: 68, height: 34, zIndex: 43 }}>
            <div style={{ position: "absolute", left: 0, top: 4, width: 20, height: 30, background: "linear-gradient(180deg,#3A424E,#191D24)", borderRadius: 3, transform: "skewX(10deg)" }} />
            <div style={{ position: "absolute", right: 0, top: 4, width: 20, height: 30, background: "linear-gradient(180deg,#3A424E,#191D24)", borderRadius: 3, transform: "skewX(-10deg)" }} />
            <div style={{ position: "absolute", left: 6, top: 26, width: 56, height: 10, background: "#12161C", borderRadius: 3 }} />
          </div>

          {/* THE BLADE: takes the finishing blow, does NOT crack, rings clear, then
              cools to blue-steel-and-gold (temper 4) with a gold FLAWLESS seal */}
          <Blade lf={lf} x={S8_BX} y={S8_BY} temper={bladeTemper} build={1} crack={0} glow={bladeGlow} ring={ringPulse} reflect={bladeReflect} rot={bladeRot} s={0.9} />

          {/* the GOLD ripple flaring from the dead-stop impact (the subverted dread:
              the blow lands, but the answer is gold ripple, not a red crack) */}
          {lf >= S8_HIT && lf < S8_HIT + 26 && (() => {
            const t = over(lf, S8_HIT, 24, Easing.out(Easing.poly(5)));
            const rr = 24 + t * 190;
            return (
              <>
                <div style={{ position: "absolute", left: S8_CX - rr, top: S8_CY - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${Math.max(2, 10 * (1 - t))}px solid ${GOLD}`, opacity: (1 - t) * 0.85, filter: "blur(1.5px)", mixBlendMode: "screen", zIndex: 55 }} />
                <div style={{ position: "absolute", left: S8_CX - rr * 0.6, top: S8_CY - rr * 0.6, width: rr * 1.2, height: rr * 1.2, borderRadius: "50%", border: `${Math.max(1.5, 6 * (1 - t))}px solid ${mix(GOLD, "#FFF3D0", 0.5)}`, opacity: (1 - t) * 0.7, mixBlendMode: "screen", zIndex: 55 }} />
              </>
            );
          })()}
          <Glow x={S8_CX} y={S8_CY} r={90 * s8bump(lf, S8_HIT, 5)} hue={GOLD} o={s8bump(lf, S8_HIT, 5) * 0.7} blur={14} z={54} />
          {/* the DEAD thud kicks a low, heavy dust, no spark shower (it did not shatter) */}
          <Dust lf={lf} at={S8_HIT + 1} x={S8_CX} y={S8_CY + 20} n={12} life={66} spread={130} hue="rgba(184,176,158,0.5)" sd={8} z={24} />
          <GroundRing lf={lf} at={S8_HIT} x={506} y={S8_BY + 8} r={210} dur={20} hue={`${mix(GOLD, "#FFFFFF", 0.3)}88`} z={25} />

          {/* the GREEN pass sweep: the scanner runs the survived blade and flips GREEN */}
          {lf >= 22 && lf < 58 && (
            <div style={{ position: "absolute", left: S8_CX - 66, top: 880, width: 132, height: 250, zIndex: 57, pointerEvents: "none" }}>
              {/* the green sweep line running down the blade f22..34 */}
              {lf < 36 && (
                <div style={{ position: "absolute", left: 0, top: over(lf, 22, 12) * 240, width: 132, height: 3, background: `linear-gradient(90deg, transparent, ${PASSGREEN}, transparent)`, opacity: 0.85, filter: "blur(0.6px)", mixBlendMode: "screen" }} />
              )}
              {/* green corner brackets snap in at f30 */}
              {(() => {
                const b = over(lf, 30, 7, Easing.out(Easing.back(2)));
                if (b < 0.02) return null;
                const corners: [number, number, number, number][] = [[6, 96, 1, 1], [126, 96, -1, 1], [6, 172, 1, -1], [126, 172, -1, -1]];
                return corners.map((c, i) => (
                  <div key={i} style={{ position: "absolute", left: c[0], top: c[1], opacity: b * (lf < 54 ? 1 : Math.max(0, 1 - over(lf, 54, 4))), transform: `scale(${b})`, transformOrigin: "center" }}>
                    <div style={{ position: "absolute", width: 18, height: 3, background: PASSGREEN, left: c[2] < 0 ? -18 : 0 }} />
                    <div style={{ position: "absolute", width: 3, height: 18, background: PASSGREEN, top: c[3] < 0 ? -18 : 0 }} />
                  </div>
                ));
              })()}
              {/* the PASS check pops on the blade at f34 */}
              {lf >= 33 && (() => {
                const p = over(lf, 33, 7, Easing.out(Easing.back(2.4)));
                const out = lf < 52 ? 1 : Math.max(0, 1 - over(lf, 52, 5));
                return (
                  <div style={{ position: "absolute", left: 66, top: 134, transform: `translate(-50%,-50%) scale(${p})`, opacity: Math.min(1, p * 2) * out, zIndex: 58 }}>
                    <div style={{ position: "absolute", left: -30, top: -30, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, ${PASSGREEN}, transparent 66%)`, opacity: 0.4, filter: "blur(8px)", mixBlendMode: "screen" }} />
                    <div style={{ position: "absolute", left: -26, top: -26, width: 52, height: 52, borderRadius: "50%", border: `4px solid ${PASSGREEN}`, background: "rgba(10,26,18,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: PASSGREEN }}>{"✓"}</div>
                  </div>
                );
              })()}
              {/* a confirming PASS-lock ring pulses out of the check at f37, giving the
                  previously frozen f39..42 beat clear motion */}
              {lf >= 37 && lf < 50 && (() => {
                const t = over(lf, 37, 12, Easing.out(Easing.poly(5)));
                const rr = 20 + t * 62;
                return <div style={{ position: "absolute", left: 66 - rr, top: 134 - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${Math.max(1, 3 * (1 - t))}px solid ${PASSGREEN}`, opacity: (1 - t) * 0.7, filter: "blur(0.6px)", mixBlendMode: "screen" }} />;
              })()}
            </div>
          )}

          {/* the survived blade keeps ringing softly through the reveal hold (a faint
              steel bell shimmer, so the co-subject blade is never static f60..86) */}
          {lf >= 60 && lf < 88 && (() => {
            const t = over(lf, 60, 28, Easing.out(Easing.poly(5)));
            const rr = 30 + t * 122;
            return <div style={{ position: "absolute", left: S8_CX - rr, top: S8_CY - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${Math.max(1, 2.4 * (1 - t))}px solid #CFE6FF`, opacity: (1 - t) * 0.38, filter: "blur(1px)", mixBlendMode: "screen", zIndex: 46 }} />;
          })()}

          {/* warm KEY-GLOW blooming on the face as the oni mask lifts, so the friendly
              Claude face is the brightest, warmest thing in frame on the reveal beat */}
          {ml > 0.05 && <Glow x={mX} y={1012} r={148} hue="#E7A07A" o={Math.min(1, ml) * 0.32 * (0.85 + 0.15 * Math.sin(lf / 9))} blur={30} ry={126} z={48} />}
          {/* warm motes drifting up off the unmasked face, keeping the held reveal (f58..104) alive */}
          <Sparkles lf={lf} at={58} x={mX} y={1002} n={14} life={46} spread={62} rise={78} hue={mix("#E7A07A", "#FFE9C4", 0.4)} sd={21} z={51} o={0.6} />

          {/* the mask-off HIT: a soft warm ring pops as the eyes appear for the first
              time (the vine-boom beat), warm not gold, so the reveal reads clean */}
          {lf >= 58 && lf < 76 && (() => {
            const t = over(lf, 58, 16, Easing.out(Easing.poly(5)));
            const rr = 26 + t * 128;
            return <div style={{ position: "absolute", left: mX - rr, top: 1004 - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${Math.max(1, 4 * (1 - t))}px solid ${mix("#FFE9C4", "#FFFFFF", 0.3)}`, opacity: (1 - t) * 0.5, filter: "blur(1px)", mixBlendMode: "screen", zIndex: 49 }} />;
          })()}
          {/* celebration petals drifting through the ring as the master bows */}
          <S8Petals lf={lf} at={96} n={18} z={41} />

          {/* THE RED MASTER: strikes dead, lowers the staff, lifts the mask to the same
              warm Claude face, rim red -> gold, and BOWS. Never destroyed. */}
          <RedMaster
            lf={lf}
            x={mX}
            y={S8_MY}
            size={170}
            glint={glint}
            strike={strikeAmt}
            scan={0}
            maskLift={ml}
            gold={g}
            bow={bow}
            staffAngle={staffAngle}
          />

          {/* the gold FLAWLESS seal burst on the blade at f100 (scale-pop) */}
          {lf >= 100 && (
            <>
              <Glow x={S8_BX} y={950} r={110 * over(lf, 100, 10)} hue={GOLD} o={(1 - over(lf, 100, 14)) * 0.7 + 0.2} blur={20} z={45} />
              <Sparkles lf={lf} at={100} x={S8_BX} y={950} n={16} life={30} spread={150} rise={110} hue={mix(GOLD, "#FFF3D0", 0.4)} sd={11} z={54} />
            </>
          )}
        </ProvingGround>
      </Cam>

      {/* ---------------------------------------------------------------- panel-local UI */}
      <Vig o={0.34} />
      <SceneTag f={lf} text="IT SURVIVED" color={GOLD} />

      {/* BY CLAUDE, a small tag by the unmasked face (the mask-off reveal) */}
      {lf >= 62 && (
        <div style={{ position: "absolute", left: 700, top: 286, transform: `scale(${over(lf, 62, 7, Easing.out(Easing.back(2.2)))}) translateY(${idle(lf, 2, 78)}px)`, transformOrigin: "0% 50%", opacity: Math.min(1, over(lf, 62, 4) * 2), zIndex: 92 }}>
          <Chip text="BY CLAUDE" bg="rgba(30,24,10,0.9)" bd={GOLD} fg="#FFEFC6" size={28} />
        </div>
      )}

      {/* ON YOUR SIDE chip flips up once the pull-back reveals the wired-in ally */}
      {lf >= 82 && (
        <div style={{ position: "absolute", left: 506, top: 706 + (1 - over(lf, 82, 9)) * 10, transform: `translate(-50%,0) perspective(600px) rotateX(${(1 - over(lf, 82, 9, Easing.out(Easing.back(2)))) * -92}deg) translateY(${idle(lf, 1.6, 80)}px)`, transformOrigin: "50% 100%", opacity: Math.min(1, over(lf, 82, 5) * 2), zIndex: 92 }}>
          <Chip text="ON YOUR SIDE" bg="rgba(30,24,10,0.92)" bd={GOLD} fg="#FFEFC6" size={38} />
        </div>
      )}

      {/* FLAWLESS banner (Mortal Kombat gold end-card, geometric), slams in at f100 */}
      {lf >= 100 && (() => {
        const bO = over(lf, 100, 3);
        const bScale = 1 + (1 - over(lf, 100, 6, Easing.out(Easing.poly(5)))) * 1.3 + settle(lf, 106, 0.05, 0.16, 0.16);
        const bSkew = -5 + settle(lf, 106, 3, 0.2, 0.14);
        const flash = s8bump(lf, 102, 6);
        return (
          <div style={{ position: "absolute", left: 506, top: 300, transform: `translate(-50%,-50%) scale(${bScale}) skewX(${bSkew}deg)`, opacity: bO, zIndex: 96 }}>
            <div style={{ position: "relative", padding: "10px 40px", background: `linear-gradient(180deg, ${mix(GOLD, "#3A2E10", 0.35)}, ${BRASSLO})`, border: `4px solid ${mix(GOLD, "#FFF3D0", 0.4)}`, borderRadius: 10, boxShadow: "0 20px 44px -16px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "absolute", inset: 5, border: `2px solid ${GOLD}66`, borderRadius: 6 }} />
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, letterSpacing: "0.02em", color: "#FFF3D0", WebkitTextStroke: "2px #2A1E08" }}>FLAWLESS</span>
            </div>
            {flash > 0.02 && <div style={{ position: "absolute", left: "50%", top: "50%", width: 40 + flash * 760, height: 8, background: `linear-gradient(90deg,transparent,${mix(GOLD, "#FFFFFF", 0.4)},transparent)`, transform: `translate(-50%,-50%) skewX(${-bSkew}deg)`, opacity: (1 - flash) * 0.85, filter: "blur(1px)" }} />}
          </div>
        );
      })()}
    </>
  );
};

// ==== part: 19_S9.tsx ====
// ============================================================================
// SCENE 9, BULLETPROOF. camera BULLET. 36 frames (lf 0..35). Starts 25.54s.
// Takeaway sound-off: the finished GOLD blade deflects a fast volley of practice
// strikes and not one of them leaves a crack.
//
// AT FRAME 0 INVENTORY (complete, dressed, MID ACTION):
//   - the whole ProvingGround is live and WARM (post-turn): gold-warm cliff, moon
//     glow, amber bridges with travelling data-pulses, forge fire far below, the
//     torii seal already unlocked gold, the master's pad now reading GOLD not red.
//   - the BLADE stands planted upright, sealed masterwork (temper 4), glowing gold,
//     breathing, throwing a reflection on wet stone. Zero cracks, never cracks here.
//   - the RED MASTER is now an ALLY: oni mask OFF (maskLift 1, warm clay face and
//     eyes visible), gold rim-light (gold 1), standing to the right, mid firing
//     gesture as it launches the first practice strike.
//   - the FIRST practice strike (a bo-staff tap) is already in flight from the
//     master toward the blade, so frame 0 is mid-volley, not a still.
//   - a gold hero spotlight pools on the blade; rain streaks and embers animate.
// Three strikes PING off at f8 (staff tap), f16 (dart), f23 (steel X-cube). Each
// throws a Captain-America concentric shield-ring flash, deflection sparks, and a
// clean bell ring on the blade. crack stays 0 the whole scene. `0 FLAWS` gold seal
// stamps f24; NO DOUBLE CHECK chip flips f26; a VERIFIED StatusZip snaps a teal
// check ~f31 (0.5s before the cut). No terminal / UI anywhere: physical strikes.
//
// DELIBERATE DEVIATION: the card names "a red X-cube" for the third strike, but
// the Continuity Editor reserves menace-red to the master through S7 and drains it
// to gold at S8, so all three projectiles are neutral STEEL practice implements
// (no menace-red survives the turn); the shield rings use blue-steel + gold, not
// Cap's red/white/blue, for the same reserved-colour reason.
// ============================================================================

const S9_CX = 510, S9_CY = 1012;   // the blade contact point (world), mid-blade
// three practice strikes: origin, ricochet target, impact frame, fly + bounce span
const S9_PROJ = [
  { imp: 8,  ox: 812, oy: 905, bx: 1024, by: 792, fly: 12, bounce: 16, kind: "staff", spin: 10 },
  { imp: 16, ox: 120, oy: 968, bx: 4,    by: 826, fly: 10, bounce: 16, kind: "dart",  spin: -18 },
  { imp: 23, ox: 726, oy: 726, bx: 916,  by: 604, fly: 9,  bounce: 14, kind: "cube",  spin: 22 },
];

// a triangular 0..1..0 pulse centred on `at`, half-width `w`.
const s9bump = (lf: number, at: number, w: number) => { const t = Math.abs(lf - at); return t >= w ? 0 : 1 - t / w; };

// a projectile's world position and phase, or null when off its window.
const s9pos = (p: typeof S9_PROJ[number], lf: number) => {
  const appear = p.imp - p.fly;
  if (lf < appear) return null;
  if (lf <= p.imp) {
    const e = over(lf, appear, p.fly, Easing.in(Easing.quad));   // accelerate toward the blade
    return { x: p.ox + (S9_CX - p.ox) * e, y: p.oy + (S9_CY - p.oy) * e, phase: 0, t: e };
  }
  const t = over(lf, p.imp, p.bounce, Easing.out(Easing.quad));  // ricochet away, air drag
  if (t >= 1) return null;
  const x = S9_CX + (p.bx - S9_CX) * t;
  const y = arcY(lf, p.imp, p.bounce, S9_CY, 44, p.by);
  return { x, y, phase: 1, t };
};

// the blade's clear bell ring, pulsed by whichever deflection is currently live.
const s9ring = (lf: number) => {
  let r = 0;
  for (const p of S9_PROJ) { if (lf >= p.imp && lf < p.imp + 14) r = over(lf, p.imp, 14); } // latest active impact, so each strike re-rings fresh
  return r;
};

// one deflecting practice projectile, drawn as a hard-edged steel implement that
// spins, smears when fast, and fades as it ricochets clear.
const S9Proj: React.FC<{ lf: number; p: typeof S9_PROJ[number] }> = ({ lf, p }) => {
  const now = s9pos(p, lf);
  if (!now) return null;
  const prev = s9pos(p, lf - 1) || now;
  const vx = now.x - prev.x, vy = now.y - prev.y;
  const appear = p.imp - p.fly;
  const rot = (lf - appear) * p.spin * (now.phase ? 1.7 : 1);
  const fade = now.phase ? 1 - now.t * now.t : Math.min(1, (lf - appear) / 3);
  const body = (
    <div style={{ position: "relative", width: 0, height: 0 }}>
      {p.kind === "staff" && (
        <div style={{ position: "absolute", left: -30, top: -6, width: 60, height: 12, borderRadius: 6, background: "linear-gradient(180deg,#9AA6B2,#4A525E)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.28)" }}>
          <div style={{ position: "absolute", left: 18, top: 0, width: 3, height: 12, background: "#2A303A" }} />
          <div style={{ position: "absolute", left: 39, top: 0, width: 3, height: 12, background: "#2A303A" }} />
        </div>
      )}
      {p.kind === "dart" && (
        <div style={{ position: "absolute", left: -22, top: -12, width: 44, height: 24 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 30, height: 24, clipPath: "polygon(0 0,100% 50%,0 100%)", background: "linear-gradient(90deg,#8A96A4,#565E6A)" }} />
          <div style={{ position: "absolute", left: 24, top: 9, width: 22, height: 6, background: "#3A424E" }} />
        </div>
      )}
      {p.kind === "cube" && (
        <div style={{ position: "absolute", left: -16, top: -16, width: 32, height: 32, background: "linear-gradient(135deg,#7C8794,#3E464F)", borderRadius: 4, border: "2px solid #99A4B0" }}>
          <div style={{ position: "absolute", left: 3, top: 13, width: 26, height: 4, background: "#242A32", transform: "rotate(45deg)" }} />
          <div style={{ position: "absolute", left: 3, top: 13, width: 26, height: 4, background: "#242A32", transform: "rotate(-45deg)" }} />
        </div>
      )}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: now.x, top: now.y, zIndex: 51, opacity: fade }}>
      <Smear dx={vx} dy={vy} ghosts={3} on={1} o={0.32} stretch={1.2} z={-1}>
        <div style={{ transform: `rotate(${rot.toFixed(1)}deg)` }}>{body}</div>
      </Smear>
    </div>
  );
};

// the Captain-America concentric shield-ring flash on a deflection (blue-steel +
// gold rings, expanding and fading). Geometric pop-culture comment-bait.
const S9Shield: React.FC<{ lf: number; at: number; x: number; y: number; big?: number }> = ({ lf, at, x, y, big = 1 }) => {
  const t = over(lf, at, 18);
  if (t <= 0 || t >= 1) return null;
  const e = over(lf, at, 18, Easing.out(Easing.poly(5)));
  const R = (60 + big * 46) * (0.35 + e);
  const rings = [
    { r: R, c: AZURE, w: 5 },
    { r: R * 0.72, c: GOLD, w: 6 },
    { r: R * 0.46, c: "#BFD6E8", w: 5 },
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 56, opacity: (1 - t) * 0.95, pointerEvents: "none" }}>
      {rings.map((rg, i) => (
        <div key={i} style={{ position: "absolute", left: -rg.r, top: -rg.r, width: rg.r * 2, height: rg.r * 2, borderRadius: "50%", border: `${rg.w}px solid ${rg.c}`, opacity: 0.5 + 0.5 * s9bump(lf, at + 2 + i, 6), filter: "blur(0.5px)", mixBlendMode: "screen" }} />
      ))}
      <div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, background: GOLD, clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", opacity: 1 - t }} />
    </div>
  );
};

const S9: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- volley drivers ----
  const strikeAmt = Math.min(1, S9_PROJ.reduce((a, p) => a + s9bump(lf, p.imp, 4), 0));
  const hitShock  = Math.min(1, S9_PROJ.reduce((a, p) => a + s9bump(lf, p.imp, 3), 0));
  const fire      = Math.min(1, S9_PROJ.reduce((a, p) => a + s9bump(lf, p.imp - 3, 4), 0)); // master windup just before each

  // ---- camera: BULLET tight low hero, a small decaying shake + a touch of push per deflection ----
  const sc = shakeCam(lf, S9_PROJ.map((p) => ({ at: p.imp, amp: 6, dur: 11 })));
  const push = 0.03 * strikeAmt;
  const cam = { x: CAMS.BULLET.x + sc.x, y: CAMS.BULLET.y + sc.y, z: CAMS.BULLET.z * sc.z * (1 + push) };

  // blade: sealed masterwork, recoils a hair off each deflection but never cracks, rings clear.
  const bladeRot = S9_PROJ.reduce((a, p) => a + settle(lf, p.imp, -2.4, 0.2, 0.16), 0) + idle(lf, 0.7, 78);
  const ring = s9ring(lf);

  // ---- the NOVICE cameo (viewer stand-in): ducks at every ping, then leaps up and
  // cheers once the blade has taken the whole volley without a crack ("crowd ohh"). ----
  const nvDuck  = Math.min(1, S9_PROJ.reduce((a, p) => a + s9bump(lf, p.imp, 3), 0));
  const nvCheer = over(lf, 24, 6, Easing.out(Easing.back(2.2)));
  const nvHop   = lf < 24 ? 0 : Math.sin(Math.min(1, (lf - 24) / 11) * Math.PI) * 58; // one joyful hop, lands ~f35

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z}>
        <ProvingGround fore={0}
          lf={lf}
          padLit={[0.9, 0.9, 0.7, 0.7]}
          redPadLit={1}
          bridgeActive={1}
          forgeHot={1}
          gateLit={1}
          sealUnlocked={1}
          masterGold={1}
          warm={1}
          moonGlow={1}
          rain={1}
          embers={1}
        >
          {/* gold hero spotlight pooling on the survived blade (screen-blended, not a wash) */}
          <Glow x={S9_CX} y={1010} r={300} hue={GOLD} o={0.24} blur={44} ry={210} z={18} />
          <Glow x={S9_CX} y={996} r={130} hue={NEONGOLD} o={0.30 + ring * 0.24} blur={22} ry={150} z={19} />
          {/* warm gold floor pool seating the blade on the pad, faceted stone catching it */}
          <Glow x={S9_CX} y={1116} r={188} hue={GOLD} o={0.20 + ring * 0.14} blur={30} ry={44} z={17} />

          {/* THE BLADE, planted, sealed gold masterwork, ringing clear on every deflection */}
          <Blade lf={lf} x={S9_CX + settle(lf, 8, -3, 0.2, 0.15) + settle(lf, 16, -3, 0.2, 0.15) + settle(lf, 23, -3, 0.2, 0.15)} y={1120} temper={4} build={1} crack={0} ring={ring} glow={1} reflect={0.6} rot={bladeRot} s={0.92} />
          {/* tight gold rim on the blade body so it reads GOLD-sealed, not plain steel */}
          <Glow x={S9_CX} y={958} r={30} hue={NEONGOLD} o={0.32 + ring * 0.3} blur={12} ry={130} z={45} />
          {/* a hot gold gleam sweeps the length of the blade on every ping (deflection tell) */}
          {S9_PROJ.map((p) => {
            const g = s9bump(lf, p.imp + 1, 4);
            return g > 0.02 && (
              <div key={"gl" + p.imp} style={{ position: "absolute", left: S9_CX - 5, top: 852 + (1 - g) * 40, width: 10, height: 150, background: `linear-gradient(180deg, transparent, ${NEONGOLD}, #FFFFFF, ${NEONGOLD}, transparent)`, opacity: g * 0.85, filter: "blur(2px)", mixBlendMode: "screen", zIndex: 53 }} />
            );
          })}

          {/* THE ALLY: mask off, warm clay face, gold rim, firing the practice volley.
              Windup lean into each shot (strike), gold rim flares on the release (glint),
              and a warm approving nod from the settle. Never destroyed, honoured, working. */}
          <RedMaster lf={lf} x={715} y={1116 + settle(lf, 5, 3, 0.2, 0.14) + settle(lf, 13, 3, 0.2, 0.14) + settle(lf, 20, 3, 0.2, 0.14)} glint={fire * 0.55} strike={fire * 0.62} maskLift={1} gold={1} bow={0} staffAngle={-24 + idle(lf, 3, 66)} />
          {/* muzzle spark bursting off the master's bo tip as each strike releases */}
          {S9_PROJ.map((p) => (
            <Sparkles key={"m" + p.imp} lf={lf} at={p.imp - 3} x={678} y={996} n={7} life={13} spread={70} rise={54} hue={NEONGOLD} sd={p.imp + 9} z={49} o={0.9} />
          ))}

          {/* THE NOVICE, front-left, watching: flinches at each ping, then hops up cheering */}
          <Novice lf={lf} x={266} y={1306 - nvHop + idle(lf, 3, 70)} flinch={nvDuck * 0.9} hideEyes={nvDuck} cheer={nvCheer} size={74} />

          {/* the three practice projectiles flying in and pinging off */}
          {S9_PROJ.map((p) => <S9Proj key={p.imp} lf={lf} p={p} />)}

          {/* per-deflection package: white ping flash, shield-ring, sparks, no crack */}
          {S9_PROJ.map((p, i) => (
            <React.Fragment key={"d" + p.imp}>
              {s9bump(lf, p.imp, 2) > 0.01 && (
                <div style={{ position: "absolute", left: S9_CX - 66, top: S9_CY - 66, width: 132, height: 132, borderRadius: "50%", background: "radial-gradient(circle,#FFFFFF,transparent 62%)", opacity: s9bump(lf, p.imp, 2) * 0.9, mixBlendMode: "screen", filter: "blur(2px)", zIndex: 55 }} />
              )}
              <S9Shield lf={lf} at={p.imp} x={S9_CX} y={S9_CY} big={i === 2 ? 1.35 : 1} />
              <Sparkles lf={lf} at={p.imp} x={S9_CX} y={S9_CY} n={15} life={24} spread={150} rise={92} hue={NEONGOLD} sd={p.imp} z={54} />
              <Sparkles lf={lf} at={p.imp} x={S9_CX} y={S9_CY} n={9} life={20} spread={110} rise={72} hue={AZURE} sd={p.imp + 4} z={54} />
            </React.Fragment>
          ))}
        </ProvingGround>
      </Cam>

      {/* ---- panel-local UI (crisp, not scaled by the camera) ---- */}
      <Vig o={0.34} />
      <SceneTag f={lf} text="BULLETPROOF" color={GOLD} />

      {/* the gold 0 FLAWS seal, stamped with a scale-pop on the final deflection */}
      {lf >= 24 && (() => {
        const sp = over(lf, 24, 8, Easing.out(Easing.back(2.6))) + settle(lf, 33, 0.05, 0.16, 0.14);
        return (
          <div style={{ position: "absolute", left: 764, top: 300, transform: `translate(-50%,-50%) scale(${sp}) rotate(${settle(lf, 24, -7, 0.2, 0.14).toFixed(2)}deg)`, zIndex: 94 }}>
            <div style={{ position: "absolute", left: -95, top: -95, width: 190, height: 190, borderRadius: "50%", background: `radial-gradient(circle,${NEONGOLD},transparent 66%)`, opacity: 0.5 * flick(lf, 0.12), filter: "blur(20px)", mixBlendMode: "screen" }} />
            <div style={{ position: "relative", width: 148, height: 148, borderRadius: "50%", background: grad("#F0CB63", "#C9902E"), border: "5px solid #F6E4A0", boxShadow: "0 16px 38px -14px rgba(20,12,4,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "3px solid rgba(58,42,5,0.4)" }} />
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, lineHeight: 0.9, color: "#3a2a05", marginTop: -4 }}>0</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: "0.14em", color: "#4a350a" }}>FLAWS</span>
            </div>
          </div>
        );
      })()}

      {/* gold spark burst thrown off the seal as it stamps (the survive payoff) */}
      <Sparkles lf={lf} at={24} x={764} y={300} n={16} life={26} spread={140} rise={88} hue={NEONGOLD} sd={91} z={95} />

      {/* NO DOUBLE CHECK chip flips on after the seal lands */}
      {lf >= 26 && (
        <div style={{ position: "absolute", left: 60, top: 700, transform: `scale(${over(lf, 26, 5, Easing.out(Easing.back(2.3)))}) rotate(${settle(lf, 26, -4, 0.2, 0.15).toFixed(2)}deg)`, transformOrigin: "0% 50%", zIndex: 92 }}>
          <Chip text="NO DOUBLE CHECK" bg="rgba(34,26,8,0.9)" bd={GOLD} fg="#F7ECCB" size={30} />
        </div>
      )}

      {/* per-scene VERIFIED StatusZip: races and snaps a teal check ~0.5s before the cut */}
      <StatusZip lf={lf} x={476} y={716} w={296} start={22} dur={9} hue={GLASSCYAN} label="VERIFIED" />
    </>
  );
};

// ==== part: 20_S10.tsx ====

// ============================================================================
// SCENE 10, BUILD ONCE (stress-tests forever). camera GATE. 98 frames (lf 0..97).
// Starts 26.73s. Verb HARDEN.
// Takeaway sound-off: the graph is built ONCE, and now every new job you send up
// gets stress-tested automatically at the summit gate. The former menace stands
// as the honored permanent GUARDIAN, gold-lit, stamping each job as it passes.
// The machine runs itself: three converging streams of work flow UP toward the
// gate (two along the world bridges, one up the assembly feed), the guardian
// tests each one, and the hardened jobs stack onto a rack beyond the gate. The
// hero has stepped BACK to the base and just watches it run without him.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid-action):
//   - the whole ProvingGround is live and WARM/GOLD (post-turn): bridges pulse,
//     forge glows far below, the torii SEAL is unlocked gold, the moon and ridge
//     sit behind. Rain streaks fall, embers rise, gate lanterns flicker, a banner
//     sways. No empty dark quadrant: lanterns and banner fill the upper gate,
//     builder senseis and their lit pads fill the lower corners.
//   - the unmasked RED MASTER stands at the torii gate as the GUARDIAN (maskLift
//     1, gold rim, warm clay face, eyes visible), staff planted, mid slow breath.
//   - TWO builder senseis hammer at the b2/b3 pads below, feeding new jobs UP the
//     two world bridges to the gate (continuous marching gold motes on the ropes).
//   - the assembly FEED rises from the lower right; one job-parcel is already in
//     mid-flight up it, ~60% to the tap point.
//   - one job (P1, a gear) is ALREADY hardened gold and resting on the RACK above
//     the gate, so the HARDENED counter reads 1 and is mid-flow, not from zero.
//   - a "BUILT ONCE" plaque hangs under the beam, an "ANY JOB" tag marks the feed.
//   - the camera is at GATE with a slow feed dolly already in motion.
// Taps land f12 (P2), f30 (P3), f48 (P4); the counter climbs 1->2 (f14), 2->3
// (f32), 3->4 (f50). The camera pulls back f58->f97 to reveal the whole self-
// running graph with the forge-master and novice watching from the base, absent
// from the work by design. Trailing raw parcels keep every stream flowing to cut.
//
// Deliberate deviation: the card names three job-shapes; I run FOUR counted jobs
// (one pre-seated at f0 so the scene opens mid-flow, three tapped on screen) so
// the on-screen "HARDENED 4" is earned by shown state, not asserted. Gold is fully
// spent here per the ledger (post-S8). No menace-red anywhere: the guardian's
// stress-flash is white-hot into gold, never the reserved red.
// ============================================================================

const S10_FEED = { x: 800, y: 726 };     // where new jobs enter the conveyor (world)
const S10_TAP = { x: 600, y: 430 };      // the guardian's stress-test point at the gate
const S10_slot = (k: number) => ({ x: 372, y: 344 - k * 40 }); // the hardened RACK slots, LEFT of the seal so the tally reads clean
const s10clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const s10bump = (lf: number, at: number, w: number) => { const t = Math.abs(lf - at); return t >= w ? 0 : 1 - t / w; };

// the jobs that clear the gate on screen and STACK into the permanent tally rack.
// P1 is pre-seated (tapF far negative), the rest tap during the scene.
const S10_JOBS = [
  { kind: "gear",    tapF: -60, k: 0, count: true },
  { kind: "sphere",  tapF: 12,  k: 1, count: true },
  { kind: "pyramid", tapF: 30,  k: 2, count: true },
  { kind: "cube",    tapF: 48,  k: 3, count: true },
];

// the CONTINUOUS assembly flow: uncounted job-parcels that ride up the feed, get
// tapped and stress-flashed at the gate exactly like the counted four, then pass
// THROUGH the gate and stream up out of frame (they never join the tally rack, so
// the on-screen HARDENED count stays honest). Staggered ~every 12f and reaching
// past the cut, so the feed is never empty and the machine visibly runs itself.
const S10_FLOW_TAPS = [6, 22, 39, 60, 72, 84, 96, 108];

// parcel kinematics: rise up the feed to the tap, get flashed, arc up through the
// gate into its rack slot, then rest with a live bob.
const s10parcel = (lf: number, tapF: number, k: number) => {
  const slot = S10_slot(k);
  if (lf < tapF) {
    const p = over(lf, tapF - 30, 30, Easing.inOut(Easing.sin));
    return {
      x: S10_FEED.x + (S10_TAP.x - S10_FEED.x) * p + Math.sin(lf / 9 + k) * 3,
      y: S10_FEED.y + (S10_TAP.y - S10_FEED.y) * p,
      seal: 0, born: lf >= tapF - 30 ? 1 : 0, arriving: p,
    };
  }
  if (lf < tapF + 20) {
    const px = over(lf, tapF + 3, 17, Easing.inOut(Easing.cubic));
    return {
      x: S10_TAP.x + (slot.x - S10_TAP.x) * px,
      y: arcY(lf, tapF + 3, 17, S10_TAP.y, 30, slot.y),
      seal: over(lf, tapF + 2, 9), born: 1, arriving: 1,
    };
  }
  return { x: slot.x, y: slot.y + idle(lf, 2.2, 70 + k * 9, k), seal: 1, born: 1, arriving: 1 };
};

// a FLOW parcel on the assembly feed: rise to the tap, get flashed, then arc up
// through the gate mouth and keep rising off the top, fading as it clears.
const s10flow = (lf: number, tapF: number, i: number) => {
  if (lf < tapF) {
    const p = over(lf, tapF - 30, 30, Easing.inOut(Easing.sin));
    return {
      x: S10_FEED.x + (S10_TAP.x - S10_FEED.x) * p + Math.sin(lf / 8 + i) * 3,
      y: S10_FEED.y + (S10_TAP.y - S10_FEED.y) * p,
      seal: 0, born: lf >= tapF - 30 ? 1 : 0, o: over(lf, tapF - 30, 6),
    };
  }
  const p2 = over(lf, tapF + 3, 26, Easing.out(Easing.quad));
  return {
    x: S10_TAP.x + (506 - S10_TAP.x) * p2,
    y: arcY(lf, tapF + 3, 26, S10_TAP.y, 30, 150),
    seal: over(lf, tapF + 1, 8), born: 1,
    o: lerpv(over(lf, tapF + 15, 13), 1, 0),
  };
};

// one geometric JOB-SHAPE (the unit on the quality-control line): steel while raw,
// gold-sealed once it clears the guardian. Reads at thumbnail size by silhouette.
const S10_JobShape: React.FC<{ lf: number; kind: string; x: number; y: number; sc?: number; seal?: number; stress?: number; z?: number; o?: number }> =
  ({ lf, kind, x, y, sc = 1, seal = 0, stress = 0, z = 45, o = 1 }) => {
    const g = Math.max(0, Math.min(1, seal));
    const st = Math.max(0, Math.min(1, stress));
    const body = mix("#8299B2", GOLD, g);
    const edge = mix("#B7CFE6", "#FFE9A8", g);
    const dark = mix("#3C4756", mix(BRASSLO, "#000000", 0.15), g);
    const rot = kind === "gear" ? lf * 1.4 : idle(lf, 5, 90, x);
    return (
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${sc})`, opacity: Math.max(0, Math.min(1, o)), zIndex: z, pointerEvents: "none" }}>
        {(g > 0.05 || st > 0.05) && <Glow x={0} y={0} r={54} hue={g > 0.05 ? GOLD : "#FFF3DC"} o={0.28 + g * 0.3 + st * 0.5} blur={16} ry={40} />}
        <svg viewBox="0 0 80 80" width={80} height={80} style={{ position: "absolute", left: -40, top: -40, overflow: "visible" }} shapeRendering="geometricPrecision">
          {kind === "sphere" && <>
            <circle cx={40} cy={40} r={26} fill={body} stroke={dark} strokeWidth={3} />
            <circle cx={40} cy={40} r={26} fill="url(#s10sph)" />
            <ellipse cx={32} cy={31} rx={9} ry={6} fill={edge} opacity={0.75} />
            <defs><radialGradient id="s10sph" cx="0.36" cy="0.32"><stop offset="0" stopColor={mix(body, "#FFFFFF", 0.35)} /><stop offset="1" stopColor={mix(body, "#000000", 0.28)} /></radialGradient></defs>
          </>}
          {kind === "pyramid" && <g transform={`rotate(${idle(lf, 3, 110, y)} 40 40)`}>
            <polygon points="40,12 66,60 14,60" fill={body} stroke={dark} strokeWidth={3} strokeLinejoin="round" />
            <polygon points="40,12 40,60 14,60" fill={mix(body, "#000000", 0.22)} />
            <polygon points="40,12 52,60 40,60" fill={mix(body, "#FFFFFF", 0.18)} />
          </g>}
          {kind === "gear" && <g transform={`rotate(${rot} 40 40)`}>
            {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <rect key={i} x={36} y={6} width={8} height={14} rx={2} fill={body} transform={`rotate(${(i / 8) * 360} 40 40)`} />; })}
            <circle cx={40} cy={40} r={22} fill={body} stroke={dark} strokeWidth={3} />
            <circle cx={40} cy={40} r={9} fill={dark} />
            <circle cx={40} cy={40} r={22} fill="none" stroke={edge} strokeWidth={2} opacity={0.6} />
          </g>}
          {kind === "cube" && <g transform={`rotate(${idle(lf, 4, 100, x)} 40 40)`}>
            <polygon points="40,14 64,28 64,54 40,68 16,54 16,28" fill={body} stroke={dark} strokeWidth={3} strokeLinejoin="round" />
            <polygon points="40,14 64,28 40,42 16,28" fill={mix(body, "#FFFFFF", 0.20)} />
            <polygon points="40,42 64,28 64,54 40,68" fill={mix(body, "#000000", 0.20)} />
          </g>}
          {g > 0.4 && <g opacity={Math.min(1, (g - 0.4) * 2.2)} transform={`scale(${0.5 + g * 0.5})`} style={{ transformOrigin: "40px 40px" }}>
            <circle cx={40} cy={40} r={31} fill="none" stroke={GOLD} strokeWidth={3} />
            <path d="M30 41 L37 49 L52 30" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </g>}
        </svg>
        {/* the stress-test flash: a white-hot scan grid snapping over the unit, then gone */}
        {st > 0.05 && <>
          <div style={{ position: "absolute", left: -34, top: -34, width: 68, height: 68, backgroundImage: "repeating-linear-gradient(0deg, rgba(255,244,220,0.6) 0 1px, transparent 1px 9px)", opacity: st * 0.8, mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", left: -46, top: -46, width: 92, height: 92, borderRadius: "50%", border: `${Math.max(1, 5 * (1 - st))}px solid #FFF3DC`, opacity: st * 0.9, transform: `scale(${1.4 - st * 0.5})`, mixBlendMode: "screen" }} />
        </>}
      </div>
    );
  };

// the conveyor FEED: a geometric rail from the entry point up to the gate, with
// up-chevrons marching toward the guardian, so the line reads as an assembly line.
const S10_Feed: React.FC<{ lf: number }> = ({ lf }) => {
  const dx = S10_TAP.x - S10_FEED.x, dy = S10_TAP.y - S10_FEED.y;
  const len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const nCh = 7;
  return (
    <div style={{ position: "absolute", left: S10_FEED.x, top: S10_FEED.y, width: len, height: 1, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, zIndex: 30 }}>
      <div style={{ position: "absolute", left: 0, top: -22, width: len, height: 44, background: "linear-gradient(180deg, #2A323E, #171C24)", border: "2px solid rgba(150,140,120,0.28)", borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 0, top: -3, width: len, height: 6, background: `linear-gradient(90deg, ${AMBER}00, ${mix(AMBER, GOLD, 0.4)}, ${GOLD}00)`, opacity: 0.5 * flick(lf, 0.12), filter: "blur(1px)", mixBlendMode: "screen" }} />
      {Array.from({ length: nCh }, (_, i) => {
        const t = ((lf * 0.010 + i / nCh) % 1);
        const px = (1 - t) * len; // chevrons travel from entry (len) up to the gate (0)
        return <div key={i} style={{ position: "absolute", left: px - 8, top: -8, width: 16, height: 16, borderLeft: `3px solid ${mix(AMBER, GOLD, 0.4)}`, borderTop: `3px solid ${mix(AMBER, GOLD, 0.4)}`, transform: "rotate(-45deg)", opacity: 0.35 + 0.45 * Math.sin(t * Math.PI) }} />;
      })}
    </div>
  );
};

// a continuous stream of gold job-motes marching UP one world bridge toward the
// gate. Amber near the source, warming to gold near the top, shrinking with depth,
// so multiple bridges visibly carry work into the guardian at once.
const S10_BridgeStream: React.FC<{ lf: number; x0: number; y0: number; x1: number; y1: number; n?: number; seed0: number }> =
  ({ lf, x0, y0, x1, y1, n = 5, seed0 }) => (
    <>{Array.from({ length: n }, (_, k) => {
      const s = seed(k * 3.7 + seed0);
      const t = (lf * 0.010 + k / n + s * 0.2) % 1;
      const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const gg = Math.max(0, (t - 0.66) / 0.34);            // warms to gold near the gate
      const hue = mix(AMBER, GOLD, gg);
      const sz = 13 - t * 6;                                 // shrink toward the gate (depth)
      const fl = 0.5 + 0.5 * Math.sin(t * Math.PI);
      return (
        <div key={k} style={{ position: "absolute", left: x - sz / 2, top: y - sz / 2, width: sz, height: sz, zIndex: 33, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${mix(hue, "#FFFFFF", 0.35)}, ${hue} 52%, transparent 74%)`, opacity: 0.45 + 0.5 * fl, filter: "blur(0.5px)", mixBlendMode: "screen" }} />
          {gg > 0.4 && <div style={{ position: "absolute", left: -sz * 0.6, top: -sz * 0.6, width: sz * 2.2, height: sz * 2.2, borderRadius: "50%", border: `1.5px solid ${GOLD}`, opacity: (gg - 0.4) * 0.7, mixBlendMode: "screen" }} />}
        </div>
      );
    })}</>
  );

// a hanging paper LANTERN flanking the gate, gradient body, flickering gold core,
// gentle sway. Fills the upper corners so no gate quadrant reads empty.
const S10_Lantern: React.FC<{ lf: number; x: number; y: number; i?: number; sc?: number }> =
  ({ lf, x, y, i = 0, sc = 1 }) => (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,0) rotate(${idle(lf, 2.4, 130, i)}deg) scale(${sc})`, transformOrigin: "50% -46px", zIndex: 41, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -1, top: -46, width: 2, height: 46, background: "rgba(120,110,90,0.6)" }} />
      <Glow x={0} y={22} r={44} hue={GOLD} o={0.42 * flick(lf, 0.5, i)} blur={16} ry={40} />
      <div style={{ position: "absolute", left: -18, top: 0, width: 36, height: 48, borderRadius: "48% 48% 44% 44% / 30% 30% 36% 36%", background: `radial-gradient(ellipse at 40% 34%, ${mix(GOLD, "#FFF3D0", 0.45)}, ${mix("#B5772A", BRASSLO, 0.35)})`, border: `2px solid ${mix("#7A5A2E", GOLD, 0.4)}`, boxShadow: "inset 0 -9px 12px rgba(0,0,0,0.35)" }}>
        <div style={{ position: "absolute", left: "50%", top: 3, width: 1, height: 42, background: "rgba(70,45,18,0.45)", transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", left: -3, top: 7, width: 42, height: 3, background: "#3A2A12" }} />
        <div style={{ position: "absolute", left: -3, top: 38, width: 42, height: 3, background: "#3A2A12" }} />
      </div>
      <div style={{ position: "absolute", left: -4, top: 48, width: 8, height: 9, background: "#3A2A12", borderRadius: "0 0 3px 3px" }} />
    </div>
  );

// a vertical cloth BANNER hung from the gate beam, a gold seal glyph on oxblood
// cloth, swaying. Diegetic dojo signage, geometric, off to the gate's left.
const S10_Banner: React.FC<{ lf: number; x: number; y: number; h?: number; i?: number }> =
  ({ lf, x, y, h = 172, i = 0 }) => (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,0)", zIndex: 40, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -23, top: -6, width: 46, height: 8, background: "#2A1E10", borderRadius: 2 }} />
      <div style={{ position: "absolute", left: -18, top: 0, width: 36, height: h, background: `linear-gradient(180deg, ${mix(TORIIRED, "#C05038", 0.22)}, ${mix(TORIIRED, "#000000", 0.32)})`, clipPath: "polygon(0 0,100% 0,100% 93%,50% 100%,0 93%)", transform: `skewX(${Math.sin(lf / 46 + i) * 3}deg)`, transformOrigin: "50% 0%", boxShadow: "inset 0 0 14px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", left: "50%", top: 24, width: 22, height: 22, transform: "translateX(-50%)", borderRadius: "50%", border: `2px solid ${GOLD}`, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: "50%", top: 30, width: 10, height: 10, transform: "translateX(-50%)", borderRadius: "50%", background: GOLD, opacity: 0.55 }} />
        <div style={{ position: "absolute", left: "50%", top: 58, width: 2, height: 84, transform: "translateX(-50%)", background: GOLD, opacity: 0.45 }} />
        <div style={{ position: "absolute", left: "50%", top: 92, width: 20, height: 2, transform: "translateX(-50%)", background: GOLD, opacity: 0.4 }} />
      </div>
    </div>
  );

// the hardened RACK beyond the gate: a timber shelf-frame the sealed jobs stack
// onto, with a gold back-glow that grows as the tally climbs. Grounds the tower so
// the jobs read as stacked, not floating.
const S10_Rack: React.FC<{ lf: number; hardened: number }> = ({ lf, hardened }) => (
  <div style={{ position: "absolute", left: 372, top: 196, transform: "translate(-50%,0)", zIndex: 35, pointerEvents: "none" }}>
    <Glow x={0} y={100} r={92} hue={GOLD} o={(0.08 + hardened * 0.045) * flick(lf, 0.14)} blur={30} ry={128} />
    <div style={{ position: "absolute", left: -55, top: 0, width: 8, height: 192, background: "linear-gradient(90deg,#4A3A22,#241A0E)", borderRadius: 3, boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08)" }} />
    <div style={{ position: "absolute", left: 47, top: 0, width: 8, height: 192, background: "linear-gradient(90deg,#4A3A22,#241A0E)", borderRadius: 3, boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08)" }} />
    {[0, 1, 2, 3].map((k) => (
      <div key={k} style={{ position: "absolute", left: -55, top: 24 + k * 40, width: 110, height: 6, background: "linear-gradient(180deg,#5A4628,#2A2012)", borderRadius: 2, boxShadow: "0 2px 3px rgba(0,0,0,0.4)" }} />
    ))}
  </div>
);

const S10: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- taps and the earned counter ----
  const taps = [12, 30, 48];                                   // the counted four (P1 pre-seated)
  const flowTaps = S10_FLOW_TAPS.filter((t) => t <= 97);       // on-screen flow taps that fire the guardian
  const allTaps = [...taps, ...flowTaps];
  // the gate fires on EVERY tap, counted or flow, so the machine reads as always working
  const anyTap = Math.min(1, allTaps.reduce((a, t) => a + s10bump(lf, t + 1, 5), 0));
  const hardened = 1 + (lf >= 14 ? 1 : 0) + (lf >= 32 ? 1 : 0) + (lf >= 50 ? 1 : 0);
  const clears = [14, 32, 50];
  // counter life: a permanent breathe so it is never frozen, plus a real overshoot
  // and damped settle on each increment (a bounce, never a linear dead-stop pop)
  const countPop = clears.reduce((a, c) => a + s10bump(lf, c, 4) * 0.22 + settle(lf, c + 4, 0.11, 0.18, 0.16), 0);
  const countScale = breathe(lf, 0.014, 88) + countPop;

  // ---- the camera: hold at GATE with a slow feed dolly, then a majestic pull-back
  // to the whole self-running graph. Manual lerp so nothing dead-stops. ----
  const s10From = CAMS.GATE;
  const s10Wide = camFor(506, 1170, 0.42, 0.5);
  const dolly = interpolate(lf, [0, 58], [0, 52], s10clamp);
  const camA = { x: s10From.x, y: s10From.y + dolly, z: s10From.z };
  const pull = over(lf, 58, 40, Easing.inOut(Easing.cubic)) + settle(lf, 96, 0.03, 0.1, 0.1);
  const cam = lerpCam(camA, s10Wide, pull);
  // heavy decaying kick from the counted taps, a light tick from every flow tap, so
  // the camera keeps feeling the gate stamp right through the pull-back
  const sh = shakeCam(lf, [
    ...taps.map((t) => ({ at: t + 2, amp: 4.5, dur: 10 })),
    ...flowTaps.map((t) => ({ at: t + 1, amp: 2.0, dur: 6 })),
  ], 1.1);

  // ---- the guardian's honored tap gesture (a firm test, never an attack) ----
  const s10guardStrike = Math.min(0.3,
    taps.reduce((a, t) => a + s10bump(lf, t + 1, 5), 0) * 0.24 +
    flowTaps.reduce((a, t) => a + s10bump(lf, t + 1, 4), 0) * 0.12);
  // ANTICIPATION: the staff lifts in the ~4 frames before each tap, then the strike
  // prop swings it down on contact. Base idle keeps it alive between taps.
  const s10windup = allTaps.reduce((a, t) => a - 15 * s10bump(lf, t - 3, 4), 0);
  const s10staff = -84 + idle(lf, 4, 120) + s10windup;

  // ---- the base cast, revealed on the pull-back: the novice hops and the blade
  // rings on each clear, so the base reacts to the machine it is watching ----
  const noviceHop = clears.reduce((a, c) => a + s10bump(lf, c + 2, 6), 0) * -16;
  const bladeRing = Math.max(s10bump(lf, 66, 24), s10bump(lf, 90, 20));

  return (
    <>
      <Cam x={cam.x + sh.x} y={cam.y + sh.y} z={cam.z * sh.z}>
        <ProvingGround
          lf={lf}
          padLit={[1, 1, 1, 1]}
          redPadLit={0.7}
          bridgeActive={1}
          forgeHot={1}
          gateLit={1}
          sealUnlocked={1}
          moonGlow={1}
          rain={1}
          embers={0.9}
          masterGold={1}
          warm={0.7}
        >
          {/* a wet gold sheen on the stone under the rack, catching the tally glow */}
          <WetReflect x={372} y={360} w={132} h={68} o={0.3 + hardened * 0.03} hue={GOLD} />

          {/* the hardened RACK the sealed jobs stack onto, drawn behind the tally */}
          <S10_Rack lf={lf} hardened={hardened} />

          {/* TWO builder senseis at the b2/b3 pads, hammering out new work that flows
              UP the bridges to the gate. The origin of every job the guardian tests. */}
          <Sensei lf={lf} x={SITE.b2.x} y={SITE.b2.y + 6} size={94} accent="#C56B45" forging={1} />
          <Sensei lf={lf} x={SITE.b3.x} y={SITE.b3.y + 6} size={94} accent="#B5613F" forging={1} />

          {/* the two bridge streams: continuous gold job-motes climbing the world
              bridges from the builders up into the gate */}
          <S10_BridgeStream lf={lf} x0={SITE.b2.x} y0={SITE.b2.y} x1={SITE.torii.x - 60} y1={SITE.torii.y + 40} n={5} seed0={1} />
          <S10_BridgeStream lf={lf} x0={SITE.b3.x} y0={SITE.b3.y} x1={SITE.torii.x + 60} y1={SITE.torii.y + 40} n={5} seed0={2} />

          {/* the assembly feed rising to the gate */}
          <S10_Feed lf={lf} />

          {/* gate dressing: a hanging banner and two flanking lanterns so no gate
              quadrant reads empty */}
          <S10_Banner lf={lf} x={438} y={146} h={168} i={0.4} />
          <S10_Lantern lf={lf} x={362} y={150} i={0.2} sc={1} />
          <S10_Lantern lf={lf} x={650} y={150} i={1.3} sc={0.94} />

          {/* a soft protective gold pool on the gate, where the guardian stands watch */}
          <Glow x={SITE.torii.x} y={SITE.torii.y - 40} r={260} hue={GOLD} o={0.16 * flick(lf, 0.1)} blur={44} ry={210} />
          <Glow x={556} y={430} r={190} hue={GOLD} o={0.18 * flick(lf, 0.12)} blur={42} ry={150} />

          {/* the CONTINUOUS assembly flow, drawn behind the tally: uncounted jobs
              riding up, tapped and flashed, then streaming up through the gate */}
          {S10_FLOW_TAPS.map((tf, i) => {
            const p = s10flow(lf, tf, i);
            if (!p.born || p.o < 0.02) return null;
            const stress = s10bump(lf, tf, 5);
            const scv = interpolate(p.y, [150, 726], [0.64, 0.78], s10clamp);
            const kind = ["sphere", "pyramid", "cube", "gear"][i % 4];
            return <S10_JobShape key={"f" + i} lf={lf} kind={kind} x={p.x} y={p.y} sc={scv} seal={p.seal} stress={stress} o={p.o} z={p.y < 340 ? 38 : 43} />;
          })}

          {/* the counted four: tested, sealed, and stacked onto the permanent rack
              off to the left of the seal (a clean, readable HARDENED ledger) */}
          {S10_JOBS.map((j, i) => {
            const p = s10parcel(lf, j.tapF, j.k);
            if (!p.born) return null;
            const stress = s10bump(lf, j.tapF, 5);
            const scv = interpolate(p.y, [220, 726], [0.98, 0.78], s10clamp);
            const pop = s10bump(lf, j.tapF + 4, 7) * 0.14 + settle(lf, j.tapF + 18, 0.10, 0.2, 0.16);
            return <S10_JobShape key={i} lf={lf} kind={j.kind} x={p.x} y={p.y} sc={scv + pop} seal={p.seal} stress={stress} z={p.y < 340 ? 41 : 46} />;
          })}

          {/* the stress-test flash bursts at the tap point on EVERY tap, gold sparks,
              never red. Counted taps throw a fuller burst, flow taps a lighter one. */}
          {anyTap > 0.02 && <Glow x={S10_TAP.x} y={S10_TAP.y} r={70 + anyTap * 44} hue="#FFF3DC" o={anyTap * 0.55} blur={14} />}
          {/* an expanding gold quality-STAMP ring per job as it clears the gate */}
          {allTaps.map((t, i) => {
            const age = lf - t;
            if (age < 0 || age > 16) return null;
            const e = over(lf, t, 16, Easing.out(Easing.poly(5)));
            return <div key={"sr" + i} style={{ position: "absolute", left: S10_TAP.x - 62 * e, top: S10_TAP.y - 26 * e, width: 124 * e, height: 52 * e, borderRadius: "50%", border: `${Math.max(1, 4 * (1 - e))}px solid ${GOLD}`, opacity: (1 - age / 16) * 0.7, filter: "blur(1px)", mixBlendMode: "screen", zIndex: 48, pointerEvents: "none" }} />;
          })}
          {taps.map((t, i) => <Sparkles key={"ct" + i} lf={lf} at={t + 2} x={S10_TAP.x} y={S10_TAP.y} n={11} spread={120} rise={76} hue={GOLD} sd={i * 3} z={48} />)}
          {flowTaps.map((t, i) => <Sparkles key={"ft" + i} lf={lf} at={t + 1} x={S10_TAP.x} y={S10_TAP.y} n={6} spread={90} rise={58} hue={GOLD} sd={i * 5 + 2} z={47} />)}

          {/* THE GUARDIAN: the unmasked, gold-lit former menace, standing permanent
              watch at the gate. Eyes visible (maskLift 1), never destroyed. */}
          <RedMaster lf={lf} x={556} y={456} size={160} maskLift={1} gold={1} glint={0} strike={s10guardStrike} staffAngle={s10staff} bow={0} />

          {/* a small "ANY JOB" tag marking where new work enters the line */}
          <div style={{ position: "absolute", left: S10_FEED.x - 30, top: S10_FEED.y - 78, transform: `translate(-50%,0) rotate(${idle(lf, 1.4, 90)}deg)`, zIndex: 47, padding: "5px 12px", borderRadius: 8, background: "rgba(28,22,14,0.82)", border: `2px solid ${mix(AMBER, GOLD, 0.5)}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: "0.05em", color: "#F1E4C8", whiteSpace: "nowrap" }}>
            ANY JOB
            <div style={{ position: "absolute", left: "50%", bottom: -14, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `9px solid ${mix(AMBER, GOLD, 0.5)}` }} />
          </div>

          {/* the "BUILT ONCE" plaque hung under the beam, glued to the gate in world
              space so it tracks through the pull-back */}
          <div style={{ position: "absolute", left: SITE.torii.x, top: SITE.torii.y - 118, transform: `translate(-50%,0) rotate(${idle(lf, 1.6, 96)}deg)`, transformOrigin: "50% -18px", zIndex: 47 }}>
            <div style={{ width: 2, height: 16, background: "rgba(120,110,90,0.6)", margin: "0 auto" }} />
            <Chip text="BUILT ONCE" bg="rgba(28,22,14,0.9)" bd={GOLD} fg="#F7ECD2" size={30} />
          </div>

          {/* the forge-master and the novice at the base, watching the machine run
              WITHOUT the hero: he has stepped back, arms-folded satisfaction, the
              novice quietly cheering and hopping as each job clears. Pull-back. */}
          <ForgeMaster lf={lf} x={584} y={1956} size={168} hammer={0} proud={0.5} gaze={2} />
          <Novice lf={lf} x={694} y={1958 + noviceHop} cheer={0.4 + (lf >= 14 ? 0.3 : 0)} size={80} />
          {/* the tempered gold blade planted beside the hero, the first survived job */}
          <Blade lf={lf} x={468} y={1912} temper={4} glow={1} reflect={0.4} s={0.66} rot={-3} ring={bladeRing} />
        </ProvingGround>
      </Cam>

      {/* ---- panel-local overlays ---- */}
      {/* the HARDENED counter, lower-left (clear of the guardian and the tower),
          climbing 1..4 as jobs clear the gate */}
      <div style={{ position: "absolute", left: 60, top: 700, zIndex: 96, display: "flex", alignItems: "flex-end", gap: 10, transform: `scale(${countScale})`, transformOrigin: "0% 100%" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: "0.1em", color: "rgba(240,232,206,0.85)", paddingBottom: 10 }}>HARDENED</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, color: GOLD, WebkitTextStroke: "1.5px #2A1E08" }}>{hardened}</span>
      </div>

      <SceneTag f={lf} text="BUILD ONCE" color={GOLD} />
      <Vig o={0.32} />
    </>
  );
};

// ==== part: 21_S11.tsx ====

// ============================================================================
// SCENE 11 - CTA (comment CHART). camera CTA_WIDE. 68 frames (lf 0..67). verb UNLOCK.
// Takeaway (sound off): the whole mountain graph is lit and working, gold, and the
// single most readable thing on screen is the word CHART, the keyword to comment.
//
// This scene renders in TWO pieces (see 99_tail):
//   - S11 (this body) draws the beauty PULL-BACK of the whole lit gold graph INSIDE
//     the panel: the guardian at the summit torii, the FOUR builder senseis back on
//     their lit pads celebrating, gold victory-bunting strung across the mountain,
//     the forge-master + gold blade at the base, the novice cheering, the network
//     humming with travelling parcels, fireworks and gold motes. Complete + mid-action at f0.
//   - S11Lockup (below) renders OUTSIDE the panel in true screen coords (band y
//     1180..1440) in THREE non-overlapping zones: [left] the gated FREE guide-card,
//     [centre] the keyword CHART huge and unobstructed with its labels, [right] the
//     buddy-duo of the hero and the former menace standing together as allies.
//     Staggered arrival, still moving on the last frame.
//
// AT FRAME 0 (complete, settled, mid-action):
//   - Cam already pulling back (pull=0.10 at f0, travelling toward CTA_WIDE), handheld.
//   - The whole graph lit GOLD: all builder pads lit, red pad now gold-lit, bridges
//     pulsing, torii seal unlocked and glowing, forge blazing, warm bg, bunting hung.
//   - The guardian (unmasked, gold rim) standing honored at the torii, gently bowing.
//   - The four senseis on their pads, the forge-master (arms-satisfied) + the sealed
//     gold blade (temper 4, ringing) at the base, the novice cheering on the ledge.
//   - Gold fireworks mid-burst, gold embers + rain falling, a gold celebration wash.
//   - S11Lockup: the giant gold CHART already present and pulsing (mid pop), the
//     "Comment the word" + "Follow so the DM lands" labels in, guide card + buddy
//     pair staggering in over the first ~24 frames, all in their own clean zones.
// Reserved colour: post-turn, gold is fully spent (seal, guardian rim, blade, CTA,
// bunting); menace-red is gone (drained to gold); green survives only as blade
// crack-seals; the FREE ribbon red is the one allowed red accent on the lockup.
// ============================================================================

// deliberate deviation (noted): the card sequences the "Comment CHART" pill later,
// but the Continuity Editor's "frame 0 is complete" rule outranks the card and the
// takeaway demands CHART be the single most readable thing THROUGHOUT. So the giant
// CHART keyword is present and mid-pop from f0 (never an opacity step); only the
// supporting guide card + buddy pair keep the staggered f4..24 arrival.

// the graph edges in WORLD coords (mirrors ProvingGround's bridge list), each
// ordered lower -> upper so parcels read as flowing UP toward the summit. Used to
// keep amber data-pulses + gold job-parcels perpetually travelling every bridge.
const S11_EDGES = [
  { ax: 466, ay: 1840, bx: 712, by: 1240 },
  { ax: 546, ay: 1840, bx: 300, by: 1160 },
  { ax: 712, ay: 1240, bx: 506, by: 1120 },
  { ax: 300, ay: 1160, bx: 506, by: 1120 },
  { ax: 506, ay: 1120, bx: 330, by: 720 },
  { ax: 506, ay: 1120, bx: 700, by: 660 },
  { ax: 330, ay: 720, bx: 446, by: 400 },
  { ax: 700, ay: 660, bx: 566, by: 400 },
  { ax: 506, ay: 1120, bx: 858, by: 940, gold: true },
];

// gold VICTORY BUNTING: a rope strung between two world points with triangular
// pennants that flutter (never frozen) and sag on a shallow catenary. Celebratory
// dressing that fills the mountain; gold is spent, so it is allowed post-turn.
const S11Pennant: React.FC<{ lf: number; x0: number; y0: number; x1: number; y1: number; n?: number; sag?: number; sz?: number }> =
  ({ lf, x0, y0, x1, y1, n = 7, sag = 26, sz = 24 }) => {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const cols = [GOLD, CLAY, "#F3E3A6", GOLD, "#E7A15A"];
    return (
      <div style={{ position: "absolute", left: x0, top: y0, width: len, height: 1, transformOrigin: "0 0", transform: `rotate(${ang}deg)`, zIndex: 23, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: len, height: 3, background: ROPE, opacity: 0.55, borderRadius: 2 }} />
        {Array.from({ length: n }, (_, k) => {
          const t = (k + 0.5) / n;
          const px = t * len;
          const drop = sag * Math.sin(t * Math.PI);
          const flut = Math.sin(lf / 9 + k * 0.8) * 7 + idle(lf, 2, 120, k);
          const c = cols[k % cols.length];
          return (
            <div key={k} style={{ position: "absolute", left: px - sz / 2, top: drop, width: sz, height: sz * 1.15, clipPath: "polygon(0 0,100% 0,50% 100%)", background: `linear-gradient(180deg, ${mix(c, "#FFFFFF", 0.28)}, ${c})`, transformOrigin: "50% 0%", transform: `rotate(${flut}deg)`, boxShadow: "0 2px 3px rgba(0,0,0,0.4)" }} />
          );
        })}
      </div>
    );
  };

const S11: React.FC<{ lf: number }> = ({ lf }) => {
  const s11clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ---- CAMERA: a slow beauty pull-back from a slightly tighter framing out to
  // CTA_WIDE, never arriving (still crawling out at f67) so it keeps moving, plus
  // handheld micro-noise and a slow crane drift (the camera is a character). ----
  const s11From = camFor(506, 1050, 0.52, 0.50);
  const s11To = CAMS.CTA_WIDE;
  // the domain overshoots the scene (0..92) so the pull is NEVER done at f67: quad-out
  // gives real velocity at f0 (already mid-move) and a visible residual crawl at f67.
  const pull = interpolate(lf, [0, 92], [0.10, 1.0], { ...s11clamp, easing: Easing.out(Easing.quad) });
  const s11cam = lerpCam(s11From, s11To, pull);
  // a slow orbital crane so the framing keeps changing even as the pull decelerates
  const s11crane = drift(lf, 7, 220, 0.4);
  const sh = shakeCam(lf, [{ at: 0, amp: 3.2, dur: 14 }], 1.1);   // a soft settle from the S10 cut
  const camX = s11cam.x + sh.x + idle(lf, 3.5, 240) + s11crane;
  const camY = s11cam.y + sh.y + idle(lf, 5, 190, 0.7);
  // a perpetual breathing zoom (a second slow breath on top of the settle) so the
  // WHOLE panel keeps shifting every frame, never a locked framing, incl. f54..67.
  const camZ = s11cam.z * sh.z * breathe(lf, 0.006, 71, 0.4);

  // ---- the gold celebration bloom: a punch-in on the cut, then it NEVER settles to a
  // flat hold. A breathing base plus a periodic re-swell keep the whole graph lighting
  // alive for the full scene (this was the frozen panel). Lifted brighter for the finale. ----
  const s11bloom = interpolate(lf, [0, 6, 20], [0.66, 1.06, 0.78], s11clamp)
    + 0.12 + 0.10 * Math.sin(lf / 15)
    + 0.05 * drift(lf, 1, 90, 0.5);

  // ---- guardian bow: honored, at rest, a gentle periodic bow (never destroyed) ----
  const s11bow = 0.05 + 0.06 * Math.max(0, Math.sin(lf / 52 + 0.6));

  // ---- the sealed gold blade rings like a bell, a slow pulse ----
  const s11ring = 0.5 + 0.5 * Math.sin(lf / 22);

  // ---- forge-master, arms-satisfied (a low proud pose), watching his machine run ----
  const s11proud = 0.16 + 0.05 * Math.max(0, Math.sin(lf / 60));
  const s11noviceCheer = 0.5 + 0.35 * Math.max(0, Math.sin(lf / 26));

  // ---- the four senseis back on their lit pads: a staggered celebratory sway ----
  const s11team: { x: number; y: number; sz: number; ac: string; ph: number }[] = [
    { x: 330, y: 720, sz: 96, ac: "#CE7A50", ph: 0.0 },   // b2 upper-left
    { x: 700, y: 660, sz: 96, ac: "#C56B45", ph: 1.1 },   // b3 upper-right
    { x: 300, y: 1160, sz: 102, ac: "#B85C3E", ph: 2.2 }, // b1 mid-left
    { x: 712, y: 1240, sz: 102, ac: "#A9502F", ph: 3.3 }, // b0 mid-right
  ];

  return (
    <>
      <Cam x={camX} y={camY} z={camZ}>
        <ProvingGround
          lf={lf}
          padLit={[1, 1, 1, 1]}
          redPadLit={1}
          bridgeActive={1}
          forgeHot={1}
          blaze={0.3}
          gateLit={1}
          sealUnlocked={1}
          moonGlow={1}
          rain={1}
          embers={1}
          masterGold={1}
          warm={1}
        >
          {/* a gold celebration wash lifting the whole network (screen-blended) */}
          <Glow x={506} y={1080} r={640} hue={GOLD} o={s11bloom * 0.27} blur={72} ry={940} z={1} />
          {/* warm gold lantern pools down each cliff wall, flickering, filling the dark edges */}
          {[{ x: 120, y: 560 }, { x: 900, y: 840 }, { x: 150, y: 1480 }, { x: 880, y: 1560 }, { x: 130, y: 2060 }, { x: 900, y: 2120 }].map((p, i) => (
            <Glow key={"lan" + i} x={p.x} y={p.y} r={70} hue={WIREGOLD} o={(0.22 + 0.14 * s11bloom) * flick(lf, 0.5, i)} blur={22} ry={54} z={4} />
          ))}

          {/* a gold VALUE-PULSE sweeping the central spine forge->summit on a loop, so the
              whole graph reads as ALIVE and delivering, not a still lit backdrop */}
          {[0, 23].map((ph, i) => {
            const sweep = (((lf + ph) % 46) / 46);
            const sy = 1900 - sweep * 1470;
            const o = 0.16 * Math.sin(sweep * Math.PI);
            return <Glow key={"sw" + i} x={506} y={sy} r={230} hue={GOLD} o={o} blur={44} ry={110} z={30} />;
          })}

          {/* GOLD VICTORY BUNTING strung across the mountain: under the torii crossbar and
              a long swag across the mid pads, both fluttering the whole scene */}
          <S11Pennant lf={lf} x0={372} y0={150} x1={640} y1={150} n={7} sag={30} sz={24} />
          <S11Pennant lf={lf} x0={300} y0={1150} x1={712} y1={1232} n={9} sag={54} sz={26} />

          {/* THE GUARDIAN: the former menace, unmasked, gold-rimmed, honored at the
              torii gate, staff at rest, gently bowing. Never destroyed. */}
          <RedMaster lf={lf} x={512} y={472} size={150} maskLift={1} gold={1} bow={s11bow} staffAngle={-7} glint={0} />

          {/* the torii reward-seal / medallion shimmering, a perpetual gentle pulse
              (two incommensurate sines so it never flat-holds, incl. the final frames) */}
          <Glow x={506} y={200} r={64 + 10 * Math.sin(lf / 13)} hue={GOLD} o={0.28 + 0.12 * Math.sin(lf / 9 + 1)} blur={18} z={30} />

          {/* THE TEAM: the four builder senseis back on their lit pads, celebrating with a
              staggered sway, each haloed by a small warm pool + rising gold motes */}
          {s11team.map((m, i) => (
            <React.Fragment key={"sn" + i}>
              <Glow x={m.x} y={m.y - 40} r={64} hue={WIREGOLD} o={(0.2 + 0.12 * Math.max(0, Math.sin(lf / 30 + m.ph)))} blur={20} ry={40} z={29} />
              <Sensei lf={lf + i * 9} x={m.x} y={m.y - 4} size={m.sz} accent={m.ac} hammer={1} forging={0} />
              <Sparkles lf={lf} at={(i * 13) % 40} x={m.x} y={m.y - m.sz * 0.7} n={5} life={30} spread={70} rise={70} hue={GOLD} sd={60 + i * 7} z={52} />
            </React.Fragment>
          ))}

          {/* THE BASE: the forge-master watching his graph run without him, the sealed
              gold blade planted on the anvil ringing clear, the novice cheering. */}
          <Blade lf={lf} x={540} y={1900} temper={4} crack={0} ring={s11ring} glow={1} reflect={0.5} s={0.92} rot={-2} />
          <ForgeMaster lf={lf} x={408} y={1948} size={166} hammer={0} gaze={4} proud={s11proud} />
          <Novice lf={lf} x={742} y={2000} cheer={s11noviceCheer} size={82} />

          {/* PERPETUAL amber data-pulses + gold job-parcels flowing UP every bridge on a
              mod-1 phase loop (never a one-shot over()), so the lit graph keeps DELIVERING
              through the last frame. Two parcels per edge, staggered, fading in mid-span. */}
          {S11_EDGES.map((e, ei) => {
            const dx = e.bx - e.ax, dy = e.by - e.ay;
            return [0, 1].map((k) => {
              const t = (lf * 0.016 + k * 0.5 + ei * 0.11) % 1;
              const px = e.ax + dx * t, py = e.ay + dy * t;
              const o = Math.sin(t * Math.PI);
              const hue = e.gold ? WIREGOLD : GOLD;
              return (
                <React.Fragment key={"s11pp" + ei + "_" + k}>
                  <Glow x={px} y={py} r={26} hue={hue} o={o * 0.6} blur={9} z={31} />
                  <div style={{ position: "absolute", left: px - 6, top: py - 6, width: 12, height: 12, background: hue, opacity: o * 0.9, transform: `rotate(${(lf * 6 + ei * 40).toFixed(1)}deg)`, borderRadius: 2, zIndex: 32, boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
                </React.Fragment>
              );
            });
          })}

          {/* an extra drift of warm gold motes over the whole graph, perpetual rise */}
          <Embers lf={lf} o={0.55} n={22} hue={WIREGOLD} z={56} w={1012} h={2680} rise={0.8} />

          {/* gold FIREWORKS bursting up the lit cliff, densely staggered so at least one is
              always mid-burst (incl. the final frames), celebratory across the whole mountain */}
          <Firework lf={lf} at={2} x={506} y={300} hue={0} />
          <Firework lf={lf} at={10} x={430} y={560} hue={2} />
          <Firework lf={lf} at={18} x={300} y={720} hue={1} />
          <Firework lf={lf} at={28} x={720} y={620} hue={3} />
          <Firework lf={lf} at={38} x={600} y={380} hue={0} />
          <Firework lf={lf} at={46} x={506} y={440} hue={2} />
          <Firework lf={lf} at={54} x={360} y={520} hue={1} />
          <Firework lf={lf} at={62} x={680} y={700} hue={3} />

          {/* rising gold motes off the summit + the base, CYCLED so they keep rising the whole
              scene (the single-shot at=0 emitters used to die by ~f30, going dead) */}
          {[0, 17, 34, 51].map((a, i) => (
            <Sparkles key={"su" + i} lf={lf} at={a} x={512} y={470} n={7} life={30} spread={120} rise={95} hue={GOLD} sd={7 + i * 5} z={54} />
          ))}
          {[7, 24, 41, 58].map((a, i) => (
            <Sparkles key={"bs" + i} lf={lf} at={a} x={540} y={1880} n={6} life={32} spread={110} rise={105} hue={WIREGOLD} sd={13 + i * 5} z={54} />
          ))}
        </ProvingGround>
      </Cam>

      {/* a warm gold vignette wash so the panel reads as the reward, not neon */}
      <GelWash x={506} y={520} w={1080} h={900} color={GOLD} o={0.18 * s11bloom} blur={80} z={64} />
      <Vig o={0.30} />
    </>
  );
};

// ============================================================================
// THE CTA LOCKUP - true screen coords, OUTSIDE the panel. Band y 1180..1440.
// THREE non-overlapping zones so nothing collides:
//   [left  x 24..372 ] the gated FREE guide-card (the named lead magnet).
//   [centre x 402..922] the keyword CHART, the biggest brightest thing in the reel,
//                       with "Comment the word" above and "Follow so the DM lands" below.
//   [right x 908..1056] the buddy-duo: the hero + the former menace, now allies.
// ============================================================================
const S11_NODE_ROWS = [0, 1, 2];   // the three withheld prompt lines (blurred, gated)

const S11Lockup: React.FC<{ lf: number }> = ({ lf }) => {
  const cclamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ---- the giant CHART: present + mid-pop at f0 (opacity always 1, a scale punch
  // that settles, then a permanent breathing pulse so it is never frozen). ----
  const chartPop = interpolate(lf, [0, 9, 16], [0.84, 1.08, 1], { ...cclamp, easing: Easing.out(Easing.cubic) });
  const chartPulse = 1 + Math.sin(lf / 9) * 0.02 + settle(lf, 16, 0.02, 0.12, 0.09);
  const chartScale = chartPop * chartPulse;
  const chartShimX = ((lf * 11) % 660) - 200;   // a moving sheen across the word, alive at f67

  // ---- the guide card slides in from the left, staggered after CHART ----
  const cardIn = over(lf, 4, 15, Easing.out(Easing.back(1.6)));
  const cardX = 24 + (1 - cardIn) * -64;
  const ribbonPop = over(lf, 10, 10, Easing.out(Easing.back(2.4)));
  const sealPop = over(lf, 20, 12, Easing.out(Easing.back(2.2)));   // the delivered result, sharp

  // ---- the "Comment the word" + "Follow" labels ride in, present at f0 ----
  const topLab = interpolate(lf, [0, 10], [0.55, 1], cclamp);
  const botIn = over(lf, 12, 12, Easing.out(Easing.back(1.7)));

  // ---- the buddy pair (hero + former menace) rise together, settle, then idle ----
  const budIn = interpolate(lf, [0, 16], [0.62, 1], { ...cclamp, easing: Easing.out(Easing.cubic) });
  const budY = (1 - budIn) * 44 + settle(lf, 16, 4, 0.14, 0.1);

  const goldPill = "linear-gradient(158deg,#FFD87A 0%,#E7A11E 100%)";

  return (
    <>
      {/* a soft gold backing wash tying the centre keyword together (screen-blend, no halo) */}
      <div style={{ position: "absolute", left: 372, top: 1178, width: 600, height: 280, borderRadius: "50%", background: `radial-gradient(ellipse, ${GOLD}44, transparent 68%)`, opacity: 0.5, filter: "blur(46px)", mixBlendMode: "screen", zIndex: 198, pointerEvents: "none" }} />

      {/* ------------------------------------------------------------------ */}
      {/* ZONE LEFT - THE GUIDE CARD (the gated lead magnet): sharp frame +    */}
      {/* title + FREE ribbon + a sharp delivered SEAL, prompt rows BLURRED.   */}
      {/* ------------------------------------------------------------------ */}
      <div style={{ position: "absolute", left: cardX, top: 1218, width: 348, height: 208, zIndex: 202, transform: `translateY(${idle(lf, 3, 150)}px) rotate(${(1 - cardIn) * -3 + idle(lf, 0.7, 190, 1.2)}deg)`, transformOrigin: "0% 100%" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "linear-gradient(158deg,#1B2436 0%,#0C1220 100%)", border: `3px solid ${mix(GOLD, "#0C1220", 0.25)}`, boxShadow: "0 26px 52px -18px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.08)", overflow: "hidden" }}>
          {/* the sharp title (the artifact is NAMED) */}
          <div style={{ position: "absolute", left: 20, top: 18, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, lineHeight: 1.02, letterSpacing: "-0.02em", color: mix(GOLD, "#FFFFFF", 0.28) }}>THE AGENT<br />GRAPH BUILD</div>
          {/* subtitle */}
          <div style={{ position: "absolute", left: 20, top: 84, right: 76, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, lineHeight: 1.18, color: "rgba(210,222,240,0.72)" }}>includes the attacker node that hardens your work</div>

          {/* the three WITHHELD prompt rows, blurred at 8px (the how is gated) */}
          <div style={{ position: "absolute", left: 18, top: 134, right: 18, filter: "blur(8px)" }}>
            {S11_NODE_ROWS.map((i) => (
              <div key={i} style={{ position: "absolute", left: 0, top: i * 22, width: "100%", height: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: i === 2 ? mix(ADVRED, GOLD, 0.4) : NODEBLUE, opacity: 0.85 }} />
                <div style={{ height: 8, width: `${64 - i * 12}%`, borderRadius: 999, background: "rgba(160,180,214,0.5)" }} />
                <div style={{ height: 8, width: 32, borderRadius: 999, background: "rgba(120,140,180,0.4)" }} />
              </div>
            ))}
          </div>
          {/* a lock chip over the blurred rows so the gating reads instantly */}
          <div style={{ position: "absolute", left: "50%", top: 162, transform: "translateX(-50%)", padding: "3px 12px", borderRadius: 999, background: "rgba(12,16,26,0.86)", border: `2px solid ${mix(GOLD, "#0C1220", 0.15)}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, letterSpacing: "0.12em", color: mix(GOLD, "#FFFFFF", 0.3), whiteSpace: "nowrap" }}>🔒 LOCKED</div>

          {/* the delivered RESULT stays SHARP: a gold quality seal, popping in */}
          <div style={{ position: "absolute", right: 14, top: 16, width: 56, height: 56, transform: `scale(${Math.max(0.01, sealPop)})`, transformOrigin: "50% 50%" }}>
            <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}88, transparent 68%)`, filter: "blur(6px)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: goldPill, border: "3px solid #FFF0B0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#3a2a05", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)" }}>✓</div>
          </div>
        </div>

        {/* the red FREE corner ribbon (the one allowed red accent) */}
        <div style={{ position: "absolute", left: -10, top: -10, transform: `rotate(-16deg) scale(${Math.max(0.01, ribbonPop)})`, transformOrigin: "50% 50%", padding: "5px 20px", borderRadius: 8, background: `linear-gradient(158deg,${mix(RED, "#FF6A4E", 0.3)},${mix(RED, "#000000", 0.15)})`, border: "2px solid #FFD9D0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.02em", color: "#FFF3EF", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.7)" }}>FREE</div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ZONE CENTRE - THE CHART CALL-TO-ACTION: the single most readable    */}
      {/* thing in the reel, centred at x 662, its labels bound tight over it. */}
      {/* ------------------------------------------------------------------ */}
      <div style={{ position: "absolute", left: 402, top: 1182, width: 520, zIndex: 204, display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${idle(lf, 2.5, 132, 0.5)}px)` }}>
        {/* "Comment the word" */}
        <div style={{ opacity: topLab, transform: `translateY(${(1 - topLab) * -10}px)`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: "0.01em", color: "#F4EFE4", textShadow: "0 3px 12px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>Comment the word</div>

        {/* the GIANT CHART plaque, present + pulsing at f0 */}
        <div style={{ marginTop: 6, transform: `scale(${chartScale})`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "relative", padding: "6px 30px 12px", borderRadius: 24, background: "linear-gradient(158deg,#141B2C 0%,#070B14 100%)", border: `4px solid ${GOLD}`, overflow: "hidden", boxShadow: "0 30px 60px -16px rgba(0,0,0,0.8)" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 124, lineHeight: 1.0, letterSpacing: "0.02em", color: NEONGOLD, textShadow: "0 4px 14px rgba(0,0,0,0.65)", display: "block" }}>CHART</span>
            {/* a moving sheen so the word is never frozen */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: chartShimX, width: 120, background: "linear-gradient(90deg,transparent,rgba(255,244,208,0.28),transparent)", transform: "skewX(-16deg)", mixBlendMode: "screen", pointerEvents: "none" }} />
          </div>
        </div>

        {/* "Follow so the DM lands" */}
        <div style={{ marginTop: 8, opacity: botIn, transform: `translateY(${(1 - botIn) * 14}px)`, padding: "6px 20px", borderRadius: 999, background: goldPill, border: "2px solid #FFF0B0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#3a2a05", boxShadow: "0 12px 26px -10px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>Follow so the DM lands</div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ZONE RIGHT - THE BUDDY DUO: the hero forge-master and the former     */}
      {/* menace (now a gold-rimmed ally, unmasked) standing together, rising  */}
      {/* in + idling, on a small warm plinth so they read as a poster.        */}
      {/* ------------------------------------------------------------------ */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, zIndex: 206, pointerEvents: "none" }}>
        {/* a warm pool grounding the duo (screen-blend, no halo) */}
        <div style={{ position: "absolute", left: 900, top: 1372 + budY, width: 160, height: 70, borderRadius: "50%", background: `radial-gradient(ellipse, ${GOLD}55, transparent 70%)`, opacity: 0.55 * budIn, filter: "blur(14px)", mixBlendMode: "screen" }} />
        <ForgeMaster lf={lf} x={952} y={1428 + budY} size={82} hammer={0} gaze={6} proud={0.24} />
        <RedMaster lf={lf} x={1012} y={1428 + budY} size={82} maskLift={1} gold={1} bow={0.04 + 0.05 * Math.max(0, Math.sin(lf / 46))} staffAngle={-6} glint={0} />
      </div>

      {/* gold sparkle bursts around the keyword, cycling (alive on the last frame) */}
      <Sparkles lf={lf} at={0} x={662} y={1300} n={12} spread={230} rise={120} hue={GOLD} sd={21} z={210} />
      <Sparkles lf={lf} at={26} x={662} y={1300} n={12} spread={250} rise={130} hue={NEONGOLD} sd={31} z={210} />
      <Sparkles lf={lf} at={52} x={662} y={1300} n={10} spread={220} rise={120} hue={WIREGOLD} sd={41} z={210} />

      {/* a thin drift of gold rain streaks across the band, geometric, never frozen */}
      <div style={{ position: "absolute", left: 0, top: 1170, width: 1080, height: 280, zIndex: 196, pointerEvents: "none", overflow: "hidden" }}>
        <RainStreaks lf={lf} o={0.26} n={20} angle={14} hue="rgba(231,178,76,0.5)" z={0} w={1080} h={280} speed={1.2} />
      </div>
    </>
  );
};

// ==== part: 99_tail.tsx ====
// ---------------- HOOK HEADER (house rule: every reel opens with one) --------
// memory/reel-hook-header: a big two-tone Fraunces headline naming Claude + the
// tool, selling the viewer's payoff. Sits over the art after <Panel>, solid at
// frame 0, cleared before S1.
const ChartHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > Lf[1] - 2) return null;
  const slam = interpolate(f, [0, 5, 9], [1.13, 0.98, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const drop = interpolate(f, [0, 7], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const out = 1 - over(f, Lf[1] - 18, 16);
  const shimX = ((f * 9) % 560) - 140;
  const T = (t: string, clay = false) => <span style={{ color: clay ? CLAY : "#F4EFE4" }}>{t}</span>;
  const line = { fontFamily: fraunces.fontFamily, fontWeight: 900 as const, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", whiteSpace: "nowrap" as const, textShadow: "0 3px 16px rgba(0,0,0,0.6)" };
  return (
    <div style={{ position: "absolute", left: 540, top: 424 + drop, transform: `translateX(-50%) scale(${slam})`, transformOrigin: "50% 0%", opacity: out, zIndex: 190, pointerEvents: "none" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "16px 38px 18px", borderRadius: 22, background: "linear-gradient(158deg,#151D33 0%,#080D1A 100%)", border: "2px solid rgba(207,149,68,0.45)", boxShadow: "0 30px 60px -18px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.10)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={line}>{T("Claude", true)}{T("'s ")}{T("Agent Graph", true)}</div>
        <div style={line}>{T("gives you work")}</div>
        <div style={line}>{T("that ")}{T("can't be broken", true)}</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: shimX, width: 150, background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.16),transparent)", transform: "skewX(-16deg)" }} />
      </div>
      <div style={{ position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 30, border: `3px solid ${GOLD}`, opacity: (1 - over(f, 0, 10)) * 0.85 }} />
    </div>
  );
};

// ---------------- the sound design ------------------------------------------
// Board: storyboards/69-chart.md, the SFX Map. Times are L-relative so they
// survive re-timing. Every entry rides the <Sfx> fade envelope.
type Beat = [number, number, string, number, number]; // [scene, offset, file, v, dur]
const SFX: Beat[] = [
  // ---- S0 THE FORGE (hook) ----
  [0, 0.00, "lib_riser.wav", 0.34, 2.4], [0, 0.60, "bamboo_crack.wav", 0.42, 0.4],
  [0, 0.60, "lib_whoosh.wav", 0.30, 1.2], [0, 0.63, "crack_hunt.wav", 0.24, 0.5],
  [0, 0.87, "dead_thud.wav", 0.30, 0.45], [0, 0.87, "thock.wav", 0.24, 0.6],
  // ---- S1 THE AGENT GRAPH ----
  [1, 0.00, "lib_whoosh.wav", 0.30, 1.6], [1, 0.20, "blip_up.wav", 0.15, 0.35],
  [1, 0.55, "blip_up.wav", 0.15, 0.35], [1, 0.95, "blip_up.wav", 0.15, 0.35],
  [1, 1.35, "blip_up.wav", 0.15, 0.35], [1, 1.75, "blip_up.wav", 0.15, 0.35],
  [1, 0.25, "lib_click.wav", 0.14, 0.4], [1, 0.65, "lib_click.wav", 0.14, 0.4],
  [1, 1.05, "lib_click.wav", 0.14, 0.4], [1, 1.45, "lib_click.wav", 0.14, 0.4],
  [1, 2.35, "shimmer.wav", 0.22, 0.9], [1, 2.35, "graph_hum.wav", 0.12, 0.9],
  // ---- S2 BUILD ONE ----
  [2, 0.10, "rebuild_thud.wav", 0.30, 0.8], [2, 0.10, "stamp_press.wav", 0.22, 0.6],
  [2, 0.55, "temper_chime.wav", 0.16, 0.7], [2, 0.80, "ding.wav", 0.14, 0.8],
  // ---- S3 THE TEAM (twist plant) ----
  [3, 0.10, "katana_shing.wav", 0.24, 0.5], [3, 0.12, "lib_pop.wav", 0.15, 0.5],
  [3, 0.45, "lib_pop.wav", 0.15, 0.5], [3, 0.80, "lib_pop.wav", 0.15, 0.5],
  [3, 1.15, "lib_pop.wav", 0.15, 0.5], [3, 2.50, "crack_hunt.wav", 0.20, 0.5],
  [3, 2.90, "metal_riser.wav", 0.60, 1.6],
  // ---- S4 NODE FIVE ----
  [4, 0.00, "graph_hum.wav", 0.12, 0.9], [4, 0.27, "adv_strike.wav", 0.30, 0.6],
  [4, 0.30, "scan_beep.wav", 0.16, 0.4], [4, 0.73, "spotlight_snap.wav", 0.16, 0.5],
  // ---- S5 THE ATTACK ----
  [5, 0.20, "lib_whoosh.wav", 0.24, 1.0], [5, 0.33, "bamboo_crack.wav", 0.42, 0.4],
  [5, 0.53, "bamboo_crack.wav", 0.40, 0.4], [5, 1.00, "bamboo_crack.wav", 0.42, 0.4],
  [5, 1.50, "bamboo_crack.wav", 0.44, 0.4], [5, 0.30, "adv_strike.wav", 0.26, 0.6],
  [5, 2.00, "metal_riser.wav", 0.62, 1.6],
  // ---- S6 THE HUNT ----
  [6, 0.20, "scanner_sweep.wav", 0.24, 0.9], [6, 0.20, "crack_hunt.wav", 0.14, 0.5],
  [6, 0.47, "scan_beep.wav", 0.16, 0.4], [6, 1.00, "scan_beep.wav", 0.17, 0.4],
  [6, 1.67, "scan_beep.wav", 0.18, 0.4], [6, 2.10, "metal_riser.wav", 0.60, 1.6],
  // ---- S7 THROWN BACK (reforge loop x3, tightening) ----
  [7, 0.30, "wire_travel.wav", 0.20, 1.0], [7, 0.45, "rebuild_thud.wav", 0.34, 0.8],
  [7, 0.75, "temper_chime.wav", 0.18, 0.7], [7, 1.60, "wire_travel.wav", 0.22, 1.0],
  [7, 1.75, "rebuild_thud.wav", 0.38, 0.8], [7, 2.00, "temper_chime.wav", 0.20, 0.7],
  [7, 2.70, "wire_travel.wav", 0.24, 1.0], [7, 2.85, "rebuild_thud.wav", 0.42, 0.8],
  [7, 3.10, "temper_chime.wav", 0.22, 0.7], [7, 1.00, "bamboo_crack.wav", 0.34, 0.4],
  [7, 2.20, "bamboo_crack.wav", 0.36, 0.4], [7, 3.90, "metal_riser.wav", 0.72, 1.8],
  // ---- S8 IT SURVIVED (the turn) ----
  [8, 0.60, "dead_thud.wav", 0.30, 0.45], [8, 0.73, "bell_ring.wav", 0.30, 1.6],
  [8, 0.73, "survive_chord.wav", 0.20, 1.5], [8, 2.00, "katana_shing.wav", 0.18, 0.5],
  [8, 2.00, "shimmer.wav", 0.20, 0.9], [8, 3.33, "gold_stamp.wav", 0.30, 0.5],
  [8, 3.33, "gong.wav", 0.26, 2.2], [8, 3.40, "crowd_cheer.wav", 0.16, 2.0],
  // ---- S9 BULLETPROOF ----
  [9, 0.20, "metal_ping.wav", 0.18, 0.3], [9, 0.43, "metal_ping.wav", 0.18, 0.3],
  [9, 0.67, "metal_ping.wav", 0.18, 0.3], [9, 0.80, "gold_stamp.wav", 0.30, 0.5],
  [9, 0.90, "metal_riser.wav", 0.58, 1.4],
  // ---- S10 BUILD ONCE ----
  [10, 0.33, "harden_chime.wav", 0.15, 0.6], [10, 0.34, "adv_strike.wav", 0.16, 0.6],
  [10, 1.00, "harden_chime.wav", 0.16, 0.6], [10, 1.01, "wire_travel.wav", 0.14, 1.0],
  [10, 1.67, "harden_chime.wav", 0.17, 0.6], [10, 2.40, "shimmer.wav", 0.18, 0.9],
  [10, 2.80, "metal_riser.wav", 0.62, 1.6],
  // ---- S11 CTA ----
  [11, 0.00, "boom.wav", 0.40, 1.8], [11, 0.00, "lib_riser.wav", 0.32, 1.4],
  [11, 0.20, "sparkle.wav", 0.20, 1.2], [11, 0.27, "gong.wav", 0.24, 2.0],
  [11, 0.40, "cash-register.mp3", 0.22, 1.6], [11, 0.40, "crowd_cheer.wav", 0.18, 2.0],
  [11, 1.70, "lib_click.wav", 0.14, 0.4], [11, 1.85, "lib_click.wav", 0.14, 0.4],
];

export const ClaudeChartReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = 1 + punch * 0.02;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_chart.wav")} />
      {/* the bed starts at the song's own 0.00 and runs the whole reel, ducking into the CTA */}
      <Audio
        loop
        src={staticFile("ebm_bed.wav")}
        volume={(ff) => interpolate(ff, [0, fr(0.3), fr(CTA_L) - 8, fr(CTA_L) + 10, 99999], [0.10, 0.11, 0.11, 0.055, 0.055], { extrapolateRight: "clamp" })}
      />
      {SFX.map(([s, off, src, v, dur], i) => (
        <Sfx key={"sx" + i} at={L[s] + off} src={src} v={v} dur={dur} />
      ))}
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Panel>
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
          {scene(10) ? <S10 lf={frame - Lf[10]} /> : null}
          {scene(11) ? <S11 lf={frame - Lf[11]} /> : null}
        </Panel>
        <ChartHeader />
        <Captions />
      </AbsoluteFill>
      {scene(11) ? <S11Lockup lf={frame - Lf[11]} /> : null}
      <ProgressBar />
    </AbsoluteFill>
  );
};
