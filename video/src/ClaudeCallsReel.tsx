// ==== part: 00_head.tsx ====
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_calls.json";

// ============================================================================
// REEL 68 - CALLS - "Claude vs NOBODY HOME"
// A missed call leaves no evidence, so nobody ever counts them. That gap is the
// whole business. World = a shallow diorama high street at dusk in the rain,
// authored ONCE as a 3000x1640 world and camera-moved per scene. The villain is
// the shop's own blind spot: he never blocks a door, he only flips the OPEN sign
// to CLOSED, and he is beaten by being COUNTED.
// House chassis per CLAUDE-REELS-PLAYBOOK.md: cream bg + <Panel> + karaoke
// captions + top ProgressBar rail. Panel-local 1012x792. NOT split-screen.
// Board: storyboards/68-calls.md (the continuity editor there wins over any card).
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


// ---- CALLS additions to the house palette ----------------------------------
const SLATE = "#5A5F6B";        // NOBODY HOME. The villain alone.
const OCHRE = "#A8724A";        // the four shop owners alone.
const BONE = "#C9BFAE";         // the customers alone.
const RIVALMAG = "#C4519E";     // Drip Bros neon across the road.
const COLDCYAN = "#8FC4D8";     // S8 only. The reel's one cool key.
const CHALK = "#8E8B84";        // the villain's grey chalk dust aura.
const TUNGSTEN = "#F0C98A";     // the warm pool a lit shop throws on wet pavement.
const NAVYBACK = "#161B26";     // far tier back buildings.
const BRASS = "#C9A227", BRASSLO = "#8A6A18";
const WETROAD = "#232935";
const GRIPC = "#8A5A44";        // Pip, the apprentice cameo.
const FAKE = "#C9BFAE";         // the chassis Mascot `suit` branch references this; nobody passes suit.

// scene starts (sec), taken from the first word onset of each beat in words_calls.json.
// S0 the bell nobody answers | S1 twelve turnarounds | S2 both hands full | S3 the fit-out
// S4 step one pick one door | S5 step two build it once | S6 it runs without him
// S7 step three the question he cannot answer | S8 the brass plaque | S9 worse than never | S10 CTA
const L = [0, 4.545, 9.705, 12.765, 20.455, 26.245, 30.835, 36.375, 42.815, 48.335, 51.355];
const Lf = L.map(fr);
const CUT = 53.914;            // VO lead silence trimmed 0.335s; durationInFrames = 1618
const CTA_L = L[10];            // the rail reward unlocks here

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
// 68 CALLS - THE WORLD KIT
// The whole high street authored ONCE (world x 0..3000, y -460..1180) plus every
// reusable prop and sprite the eleven scene bodies stage. Scene bodies only pick
// a <Cam> preset, drive a few props on <Street>, and place characters.
// Panel-local viewport is 1012 x 792. Everything is driven by `lf` (local frame).
// Deterministic only: pseudo-randomness always comes from the chassis seed(n).
// ============================================================================

// ---------------------------------------------------------------------------
// THE CAMERA
// ---------------------------------------------------------------------------

export type CamPose = { x: number; y: number; z: number };

// Place a world Y at a chosen fraction of the 792px viewport height. Framing is
// derived, not hand tuned: pick the line you want the eye to land on and where.
export const camFor = (worldX: number, anchorY: number, z: number, screenAnchor = 0.46): CamPose =>
  ({ x: worldX, y: anchorY - (792 * screenAnchor) / z, z });

// THE EIGHT PRESETS, composed through camFor so the shop band (world y 210 to
// 664) always reads and the panel is always filled top to bottom.
//
// | Preset  | z    | hero at size=170 | ground line (y 664) on screen | shows                       |
// |---------|------|------------------|-------------------------------|-----------------------------|
// | OPEN    | 1.00 | 170px            | 70%                           | alley, drain, Pipe Bros, edge of Sparks |
// | STOOP   | 1.35 | 230px            | 79%                           | one door, one stoop, one booth |
// | KERB    | 1.25 | 212px            | 55%                           | shop face, pavement, kerb, drain, coins |
// | CULVERT | 1.10 | 187px            | 42%                           | pavement above, under street below |
// | ROOF    | 1.00 | 170px            | off frame below               | skyline, parapet, till, brackets, brick |
// | TWO     | 0.72 | 122px            | 64%                           | two full shopfronts plus a third |
// | ROW     | 0.56 | 95px             | 60%                           | three shops plus a sliver of the fourth |
// | RIVAL   | 1.05 | 178px            | 72%                           | Drip Bros only               |
//
// ⛔ ROW is the one preset below the 110px hero floor, and it is used in exactly
// two places (S4 f0 to f66, S10 f0 to f34), neither of which stages the hero as
// the read. Any scene that DOES stage the hero at ROW must pass size={200} or
// more, which lands him at 112px and clears the floor.
export const CAMS: Record<"OPEN" | "STOOP" | "KERB" | "CULVERT" | "ROOF" | "TWO" | "ROW" | "RIVAL", CamPose> = {
  OPEN: camFor(20, 470, 1.0, 0.46),        // shop band centred, road and under street beneath
  STOOP: camFor(230, 470, 1.35, 0.46),     // fascia at the top edge, booth dead centre
  KERB: camFor(0, 664, 1.25, 0.55),        // the kerb line at 55%, coins at eye level
  CULVERT: camFor(0, 664, 1.1, 0.42),      // ground at 42%, dressed under street below it
  ROOF: camFor(90, -180, 1.0, 0.58),       // the parapet deck at 58%, dusk sky above
  TWO: camFor(180, 470, 0.72, 0.46),       // two full shopfronts
  ROW: camFor(100, 470, 0.56, 0.46),       // fascia band in the top third. NEVER held past 66f
  RIVAL: camFor(2210, 470, 1.05, 0.46),    // Drip Bros centred, bus shelter at the left edge
};

// ease between two presets. t is already eased by the caller if it wants easing.
export const lerpCam = (a: CamPose, b: CamPose, t: number): CamPose => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
});

// the viewport. Its single child carries the world transform.
export const Cam: React.FC<{ x: number; y: number; z: number; children?: React.ReactNode }> = ({ x, y, z, children }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 3000, height: 1640, transformOrigin: "0 0", transform: `scale(${z}) translate(${-x}px, ${-y}px)` }}>
      {children}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// WORLD GEOMETRY, LOCKED. If a scene card disagrees with this, this wins.
// ---------------------------------------------------------------------------

const W_PARAPET = -460, W_FASCIA = 210, W_AWNING = 272, W_BOARD = 308, W_FACE = 338;
const W_SIGN = 396, W_STOOP = 560, W_PAVE = 598, W_KERB = 664, W_ROAD = 678, W_CULV = 792, W_BOTTOM = 1180;
const WORLD_W = 3000;
// The DRESSED ENVELOPE. Every full width band is authored across this, not across
// WORLD_W, so that any (x, y, z) a camera can reach lands on dressed content and
// never on a black void. Sky runs far above the parapet, strata far below the
// culvert, and the row is bracketed by terminating blocks at both ends.
const WORLD_X0 = -420, WORLD_X1 = 3420, WORLD_SPAN = WORLD_X1 - WORLD_X0;
const W_SKYTOP = -1400, W_DEEP = 2700;
const FOOT = 0.92;                       // a Mascot's feet sit at top + size * FOOT
export const standTop = (y: number, size: number) => y - size * FOOT;

export type TradeKey = "plumb" | "elec" | "dds" | "auto";
export const SHOPS: { x: number; name: string; sub: string; trade: TradeKey; hue: string }[] = [
  { x: 120, name: "PIPE BROS", sub: "PLUMBING", trade: "plumb", hue: "#F0C98A" },
  { x: 680, name: "SPARKS & SON", sub: "ELECTRIC", trade: "elec", hue: "#CFE6F2" },
  { x: 1240, name: "PAINLESS PETE", sub: "DDS", trade: "dds", hue: "#9FD8BE" },
  { x: 1800, name: "VALVOTINE", sub: "AUTO", trade: "auto", hue: "#E8934A" },
];
// offsets INSIDE a 520 wide shop block, identical for all four (that is the point)
export const SHOP_W = 520, OFF_FASCIA = 10, OFF_WIN = 30, OFF_DOOR = 180, OFF_STOOP = 140, OFF_BOOTH = 320;
export const doorX = (i: number) => SHOPS[i].x + OFF_DOOR + 55;      // door centre, world
export const boothX = (i: number) => SHOPS[i].x + OFF_BOOTH;         // booth mount left, world
export const stoopX = (i: number) => SHOPS[i].x + OFF_STOOP + 105;   // stoop centre, world
export const LAMP_X = [380, 1140, 1900, 2660];
export const SCARFS = ["#7E6BA8", "#4E7F86", "#B0684B", "#5E6E45"];  // four customer scarf hues

const arr4 = (v: number | number[] | undefined, d: number): number[] =>
  v === undefined ? [d, d, d, d] : typeof v === "number" ? [v, v, v, v] : [v[0] ?? d, v[1] ?? d, v[2] ?? d, v[3] ?? d];

// ---------------------------------------------------------------------------
// ATMOSPHERE PRIMITIVES
// ---------------------------------------------------------------------------

// 34 cold blue streaks at two parallax speeds plus near streaks at blur(1.5px).
// Tiled across a width so it works in world space or in panel space.
export const Drizzle: React.FC<{ lf: number; x?: number; y?: number; w?: number; h?: number; n?: number; o?: number; par?: number; near?: number; z?: number }> =
  ({ lf, x = WORLD_X0, y = -900, w = WORLD_SPAN, h = 2200, n = 34, o = 1, par = 0.6, near = 0, z = 30 }) => (
    <>{o > 0.02 && Array.from({ length: n }, (_, i) => {
      const s = seed(i * 3.31 + 7);
      const sp = (2.6 + s * 3.4) * (near ? 1.4 : par);
      const yy = y + ((seed(i * 1.91) * h + lf * sp * 6) % h);
      const len = (near ? 30 : 16) + s * (near ? 34 : 18);
      return <div key={i} style={{
        position: "absolute", left: x + seed(i * 2.77) * w, top: yy, width: near ? 3 : 2, height: len,
        background: `linear-gradient(180deg, rgba(163,193,224,0), rgba(163,193,224,${(near ? 0.42 : 0.26) * o}))`,
        transform: "rotate(6deg)", filter: near ? "blur(1.5px)" : "none", zIndex: z, pointerEvents: "none",
      }} />;
    })}</>
  );

// a catenary street lamp on a wire: sways 2px on a 140 frame sine, drops a cone
// with 14 dotted light particles falling inside it, out of phase per lamp.
export const LampCone: React.FC<{ lf: number; x: number; i?: number; y?: number; h?: number; o?: number; hue?: string; z?: number }> =
  ({ lf, x, i = 0, y = -140, h = 800, o = 1, hue = TUNGSTEN, z = 12 }) => {
    const sway = Math.sin(lf / 140 * Math.PI * 2 + i * 1.7) * 2;
    const flick = 0.92 + 0.08 * Math.sin(lf / 17 + i * 2.1);
    const on = o * flick;
    if (on < 0.02) return null;
    return (
      <div style={{ position: "absolute", left: x + sway, top: y, zIndex: z, pointerEvents: "none" }}>
        {/* the wire and the shade */}
        <div style={{ position: "absolute", left: -300, top: -6, width: 600, height: 2, background: "rgba(14,18,26,0.7)" }} />
        <div style={{ position: "absolute", left: -3, top: -6, width: 5, height: 26, background: "#171B24" }} />
        <div style={{ position: "absolute", left: -30, top: 18, width: 60, height: 16, background: "linear-gradient(180deg,#2A2F3A,#12161E)", borderRadius: "4px 4px 14px 14px" }} />
        <div style={{ position: "absolute", left: -12, top: 32, width: 24, height: 8, borderRadius: "50%", background: hue, opacity: 0.85 * flick }} />
        {/* the cone */}
        <div style={{
          position: "absolute", left: -120, top: 34, width: 240, height: h, opacity: 0.24 * on,
          background: `linear-gradient(180deg, ${hue}, transparent 86%)`,
          clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)", filter: "blur(7px)",
        }} />
        {/* dust falling inside the cone */}
        {Array.from({ length: 14 }, (_, k) => {
          const s = seed(k * 4.13 + i * 9.7);
          const p = ((lf * (0.5 + s * 0.9) + s * 400) % 420) / 420;
          const spread = (s - 0.5) * (60 + p * 220);
          return <div key={k} style={{
            position: "absolute", left: spread - 1, top: 40 + p * 420, width: 3, height: 3, borderRadius: "50%",
            background: hue, opacity: (1 - p) * 0.5 * on,
          }} />;
        })}
      </div>
    );
  };

// A DARK CHEVRON. Not a bird. There are zero organic silhouettes in this reel.
export const Pigeon: React.FC<{ lf: number; y?: number; at?: number; dur?: number; x0?: number; x1?: number; o?: number; z?: number }> =
  ({ lf, y = -60, at = 20, dur = 90, x0 = -140, x1 = 1200, o = 0.62, z = 26 }) => {
    if (lf < at || lf > at + dur) return null;
    const p = (lf - at) / dur;
    const flap = Math.sin((lf - at) / 3.2) * 5;
    return (
      <div style={{ position: "absolute", left: x0 + (x1 - x0) * p, top: y + Math.sin(p * Math.PI * 2) * 14, width: 40, height: 18, opacity: o, zIndex: z, filter: "blur(0.6px)" }}>
        <svg viewBox="0 0 40 18" width={40} height={18}>
          <polygon points={`0,${9 - flap} 20,9 40,${9 - flap} 20,15`} fill="#0D1018" />
        </svg>
      </div>
    );
  };

// far tier: navy back buildings at blur(4px) 22%, two ghost lit windows, a slow
// drifting cloud gradient. Occupies world y 0..210 behind everything.
export const FarTier: React.FC<{ lf: number; x?: number; w?: number; o?: number; z?: number; hue?: string }> =
  ({ lf, x = WORLD_X0, w = WORLD_SPAN, o = 1, z = 1, hue = NAVYBACK }) => (
    <div style={{ position: "absolute", left: x, top: -180, width: w, height: 400, zIndex: z, filter: "blur(4px)", opacity: 0.22 * o, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #0B0F18, ${hue})` }} />
      {/* the drifting cloud */}
      <div style={{ position: "absolute", left: ((lf * 0.22) % (w + 900)) - 450, top: 10, width: 900, height: 190, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(120,140,180,0.4), transparent 68%)" }} />
      {/* back buildings */}
      {Array.from({ length: 26 }, (_, i) => {
        const s = seed(i * 5.7 + 2);
        const bw = 70 + s * 130, bh = 120 + seed(i * 2.2) * 190;
        return <div key={i} style={{ position: "absolute", left: x + i * (w / 26) + s * 26, top: 400 - bh, width: bw, height: bh, background: hue, borderTop: "3px solid #1E2532" }} />;
      })}
      {/* two ghost lit windows, and only two */}
      <div style={{ position: "absolute", left: x + w * 0.31, top: 214, width: 22, height: 30, background: "#C9A86A", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: x + w * 0.68, top: 246, width: 20, height: 28, background: "#B9A278", opacity: 0.75 }} />
    </div>
  );

// Blurred near-black foreground silhouettes at 1.6x parallax. Every one is a
// RECOGNISABLE OBJECT whose BASE SITS ON `groundY`, never a floating rectangle:
// `h` grows upward from the ground line, and each shape carries a faint top rim
// so it reads as a solid object against dark asphalt rather than a hole.
export const ForeSil: React.FC<{ lf: number; x: number; groundY?: number; w?: number; h?: number; kind?: "kerb" | "bollard" | "hydrant" | "aboard" | "trolley"; o?: number; blur?: number; z?: number; par?: number }> =
  ({ lf, x, groundY = W_KERB, w = 60, h = 120, kind = "bollard", o = 1, blur = 2.5, z = 44, par = 1.6 }) => {
    const bob = Math.sin(lf / 46 + x * 0.01) * 1.1;
    const c = "#0A0E16";
    const rim = "rgba(150,175,210,0.20)";
    // 1.6x parallax: the foreground sits BELOW the ground line by the extra depth
    const top = groundY + (par - 1) * 26 - h + bob;
    return (
      <div style={{ position: "absolute", left: x, top, width: w, height: h, zIndex: z, filter: `blur(${blur}px)`, opacity: o, pointerEvents: "none" }}>
        {/* THE NEAR KERB: a jointed kerbstone lip, not a slab. It reads as the edge
            of the pavement the camera is standing on. */}
        {kind === "kerb" && <>
          <div style={{ position: "absolute", left: 0, bottom: 0, width: w, height: Math.min(h, 30), background: c }} />
          <div style={{ position: "absolute", left: 0, bottom: Math.min(h, 30) - 4, width: w, height: 4, background: rim }} />
          {Array.from({ length: Math.max(2, Math.round(w / 120)) }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: (i + 1) * (w / Math.max(2, Math.round(w / 120))), bottom: 0, width: 3, height: Math.min(h, 30), background: "rgba(0,0,0,0.5)" }} />
          ))}
        </>}
        {kind === "bollard" && <>
          <div style={{ position: "absolute", left: w * 0.3, bottom: 0, width: w * 0.4, height: h, borderRadius: "7px 7px 2px 2px", background: c }} />
          <div style={{ position: "absolute", left: w * 0.3, bottom: h - 8, width: w * 0.4, height: 5, background: rim, borderRadius: 3 }} />
          <div style={{ position: "absolute", left: w * 0.26, bottom: h * 0.68, width: w * 0.48, height: 7, background: "#171D28" }} />
          <div style={{ position: "absolute", left: w * 0.2, bottom: 0, width: w * 0.6, height: 9, borderRadius: 2, background: "#0D121B" }} />
        </>}
        {kind === "hydrant" && <>
          <div style={{ position: "absolute", left: w * 0.26, bottom: 0, width: w * 0.48, height: h * 0.86, background: c }} />
          <div style={{ position: "absolute", left: w * 0.06, bottom: h * 0.5, width: w * 0.88, height: h * 0.14, borderRadius: 4, background: c }} />
          <div style={{ position: "absolute", left: w * 0.34, bottom: h * 0.84, width: w * 0.32, height: h * 0.16, borderRadius: "50% 50% 0 0", background: c }} />
          <div style={{ position: "absolute", left: w * 0.36, bottom: h * 0.95, width: w * 0.28, height: 4, background: rim, borderRadius: 2 }} />
          <div style={{ position: "absolute", left: w * 0.14, bottom: 0, width: w * 0.72, height: 8, borderRadius: 2, background: "#0D121B" }} />
        </>}
        {kind === "aboard" && <>
          {/* a leaning A board: two legs on the ground and a hinged top */}
          <div style={{ position: "absolute", left: w * 0.1, bottom: 0, width: w * 0.82, height: h * 0.9, background: c, transform: "skewX(-8deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: w * 0.12, bottom: h * 0.86, width: w * 0.78, height: 4, background: rim, transform: "skewX(-8deg)" }} />
          <div style={{ position: "absolute", left: w * 0.2, bottom: h * 0.6, width: w * 0.56, height: 5, background: "#1A2130" }} />
          <div style={{ position: "absolute", left: w * 0.2, bottom: h * 0.44, width: w * 0.4, height: 5, background: "#1A2130" }} />
          <div style={{ position: "absolute", left: w * 0.06, bottom: 0, width: w * 0.9, height: 7, background: "#0D121B" }} />
        </>}
        {kind === "trolley" && <>
          <div style={{ position: "absolute", left: 0, bottom: h * 0.3, width: w, height: h * 0.18, background: c }} />
          <div style={{ position: "absolute", left: 0, bottom: h * 0.46, width: w, height: 4, background: rim }} />
          <div style={{ position: "absolute", left: w * 0.04, bottom: h * 0.44, width: 8, height: h * 0.5, background: c }} />
          <div style={{ position: "absolute", left: w * 0.12, bottom: 0, width: h * 0.28, height: h * 0.28, borderRadius: "50%", background: c, transform: `rotate(${lf * 6}deg)` }} />
          <div style={{ position: "absolute", left: w * 0.64, bottom: 0, width: h * 0.28, height: h * 0.28, borderRadius: "50%", background: c, transform: `rotate(${lf * 6}deg)` }} />
        </>}
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE DRESSED BANDS. Between them, SkyTier + RoadBand + UnderStreet + DeepFill
// guarantee that every pixel of the panel is dressed at every camera preset.
// ---------------------------------------------------------------------------

// Everything above the fascia line: indigo dusk going to night, two drifting
// cloud gradients out of phase, a scatter of deterministic haze. Never black.
export const SkyTier: React.FC<{ lf: number; o?: number; day?: number; z?: number }> = ({ lf, o = 1, day = 0, z = 0 }) => (
  <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_FASCIA - W_SKYTOP, zIndex: z, overflow: "hidden", opacity: o, pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, background: day > 0.1 ? "linear-gradient(180deg,#8E959D 0%,#AEB4BB 58%,#C6CACE 100%)" : "linear-gradient(180deg,#070A14 0%,#111730 44%,#22293F 78%,#2C3348 100%)" }} />
    {/* two drifting cloud gradients, out of phase */}
    {[0, 1].map((k) => (
      <div key={k} style={{
        position: "absolute", left: ((lf * (0.18 + k * 0.11) + k * 1500) % (WORLD_SPAN + 1600)) - 800,
        top: 300 + k * 420, width: 1600, height: 300 + k * 120, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${day > 0.1 ? "rgba(228,232,238,0.55)" : "rgba(96,116,158,0.26)"}, transparent 68%)`, filter: "blur(24px)",
      }} />
    ))}
    {/* THE SKYLINE. Distant rooftops, chimney stacks, aerials and a water tower,
        sitting just above our own parapet so the ROOF preset is never empty sky. */}
    <div style={{ position: "absolute", left: 0, top: (W_PARAPET - 130) - W_SKYTOP, width: WORLD_SPAN, height: 200 }}>
      {Array.from({ length: Math.ceil(WORLD_SPAN / 210) }, (_, i) => {
        const s2 = seed(i * 9.1 + 61);
        const bh = 40 + s2 * 96, bw = 130 + seed(i * 3.3) * 70;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: i * 210 + s2 * 40, top: 130 - bh, width: bw, height: bh + 70, background: day > 0.1 ? "#8B929A" : "#141A28", borderTop: `3px solid ${day > 0.1 ? "#9BA2AA" : "#1E2636"}` }} />
            {/* a chimney stack */}
            <div style={{ position: "absolute", left: i * 210 + s2 * 40 + bw * 0.66, top: 130 - bh - 32, width: 26, height: 34, background: day > 0.1 ? "#7E858D" : "#101623" }} />
            {/* an aerial */}
            <div style={{ position: "absolute", left: i * 210 + s2 * 40 + 22, top: 130 - bh - 40, width: 2, height: 42, background: day > 0.1 ? "#6E757D" : "#0C111C" }} />
            {Array.from({ length: 3 }, (_, k) => <div key={k} style={{ position: "absolute", left: i * 210 + s2 * 40 + 13, top: 130 - bh - 34 + k * 9, width: 20, height: 2, background: day > 0.1 ? "#6E757D" : "#0C111C" }} />)}
            {/* one lit window in three, breathing */}
            {s2 > 0.62 && <div style={{ position: "absolute", left: i * 210 + s2 * 40 + 40, top: 130 - bh + 22, width: 16, height: 20, background: "#C9A45E", opacity: 0.4 + 0.28 * Math.sin(lf / 44 + i) }} />}
          </React.Fragment>
        );
      })}
      {/* the water tower on legs, a single geometric landmark */}
      <div style={{ position: "absolute", left: 1180, top: -14, width: 116, height: 150 }}>
        <div style={{ position: "absolute", left: 6, top: 0, width: 104, height: 62, borderRadius: "8px 8px 3px 3px", background: day > 0.1 ? "#7E858D" : "#121826" }} />
        <div style={{ position: "absolute", left: 0, top: 56, width: 116, height: 9, background: day > 0.1 ? "#6E757D" : "#0D131F" }} />
        {[10, 46, 82].map((lx2, k) => <div key={k} style={{ position: "absolute", left: lx2, top: 62, width: 9, height: 88, background: day > 0.1 ? "#6E757D" : "#0D131F" }} />)}
        <div style={{ position: "absolute", left: 4, top: 104, width: 108, height: 5, background: day > 0.1 ? "#6E757D" : "#0D131F", transform: "rotate(5deg)" }} />
      </div>
    </div>
    {/* high haze specks so the empty sky still carries motion */}
    {Array.from({ length: 40 }, (_, i) => {
      const s = seed(i * 8.3 + 21);
      return <div key={i} style={{
        position: "absolute", left: WORLD_SPAN * s, top: 40 + seed(i * 3.1) * (W_FASCIA - W_SKYTOP - 300),
        width: 3, height: 3, borderRadius: "50%", background: "rgba(198,214,244,0.5)",
        opacity: (0.18 + s * 0.3) * (0.6 + 0.4 * Math.sin(lf / (30 + s * 50) + i)),
      }} />;
    })}
  </div>
);

// THE ROAD, y 678 to 792. Wet asphalt with a centre line, per fascia colour
// smears, standing puddles that reflect, and a slow passing vehicle silhouette.
export const RoadBand: React.FC<{ lf: number; o?: number; key1?: string; hues?: string[]; lit?: number[]; wet?: number; rival?: number; z?: number }> =
  ({ lf, o = 1, key1 = TUNGSTEN, hues = [], lit = [], wet = 1, rival = 1, z = 5 }) => {
    const vp = ((lf * 5.2) % (WORLD_SPAN + 1400)) - 700;     // the passing vehicle
    return (
      <div style={{ position: "absolute", left: WORLD_X0, top: W_ROAD, width: WORLD_SPAN, height: W_CULV - W_ROAD, zIndex: z, opacity: o, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${WETROAD} 0%, #1B212B 46%, #12161D 100%)` }} />
        {/* the gutter seam right under the kerb */}
        <div style={{ position: "absolute", left: 0, top: 0, width: WORLD_SPAN, height: 5, background: "rgba(120,144,178,0.14)" }} />
        {/* the centre line, dashed */}
        {Array.from({ length: Math.ceil(WORLD_SPAN / 190) }, (_, i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: i * 190 + 30, top: 64, width: 106, height: 7, borderRadius: 2, background: "rgba(222,214,178,0.26)" }} />
        ))}
        {/* each lit fascia smears its own colour down the wet asphalt */}
        {SHOPS.map((sh, i) => (lit[i] ?? 1) > 0.05 && (
          <div key={"sm" + i} style={{ position: "absolute", left: sh.x + 40 - WORLD_X0, top: 0, width: SHOP_W - 80, height: 114, background: `linear-gradient(180deg, ${hues[i] || sh.hue}, transparent 86%)`, opacity: 0.15 * (lit[i] ?? 1) * wet, filter: "blur(11px)", mixBlendMode: "screen" }} />
        ))}
        {/* Drip Bros bleeds magenta across the far right of the road */}
        {rival > 0.05 && <div style={{ position: "absolute", left: 2440 - WORLD_X0, top: 0, width: 620, height: 114, background: `linear-gradient(180deg, ${RIVALMAG}, transparent 84%)`, opacity: 0.16 * rival * wet, filter: "blur(14px)", mixBlendMode: "screen" }} />}
        {/* three standing puddles, each catching the sky and rippling */}
        {[[520, 22, 300], [1580, 52, 240], [2660, 30, 280]].map(([px, py, pw], i) => (
          <div key={"pd" + i} style={{ position: "absolute", left: px - WORLD_X0, top: py, width: pw, height: 34, borderRadius: "50%", background: "linear-gradient(180deg, rgba(122,150,190,0.30), rgba(30,40,56,0.5))", filter: "blur(2px)", transform: `scaleX(${1 + Math.sin(lf / (34 + i * 9)) * 0.02})` }}>
            <div style={{ position: "absolute", left: 12, top: 6, width: pw * 0.5, height: 8, borderRadius: "50%", background: "rgba(200,222,252,0.24)", filter: "blur(3px)" }} />
          </div>
        ))}
        {/* a slow passing vehicle as a dark geometric block, never an organic shape */}
        <div style={{ position: "absolute", left: vp, top: 12, width: 300, height: 78, zIndex: 4, filter: "blur(2px)" }}>
          <div style={{ position: "absolute", left: 0, top: 26, width: 300, height: 52, borderRadius: 5, background: "#080C13" }} />
          <div style={{ position: "absolute", left: 56, top: 0, width: 168, height: 30, borderRadius: "5px 5px 0 0", background: "#0C1119" }} />
          <div style={{ position: "absolute", left: 68, top: 6, width: 62, height: 20, background: "rgba(120,150,192,0.18)" }} />
          <div style={{ position: "absolute", left: 286, top: 40, width: 14, height: 9, borderRadius: 2, background: RED, opacity: 0.65 }} />
          <div style={{ position: "absolute", left: 30, top: 68, width: 42, height: 20, borderRadius: "50%", background: "#05080D" }} />
          <div style={{ position: "absolute", left: 226, top: 68, width: 42, height: 20, borderRadius: "50%", background: "#05080D" }} />
        </div>
      </div>
    );
  };

// THE UNDER STREET, y 792 to 1180. Opaque by default: this is what stops the
// culvert being a black void whenever a scene has not asked for it to open.
// Brick foundation courses, horizontal service pipe runs, dim maintenance lamps.
export const UnderStreet: React.FC<{ lf: number; o?: number; z?: number }> = ({ lf, o = 1, z = 4 }) => {
  if (o <= 0.01) return null;
  const H = W_BOTTOM - W_CULV;
  return (
    <div style={{ position: "absolute", left: WORLD_X0, top: W_CULV, width: WORLD_SPAN, height: H, zIndex: z, opacity: o, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#191309 0%,#130F08 46%,#090705 100%)" }} />
      {/* foundation brick courses */}
      {Array.from({ length: 13 }, (_, r) => (
        <div key={"r" + r} style={{ position: "absolute", left: 0, top: r * 30, width: WORLD_SPAN, height: 26 }}>
          {Array.from({ length: Math.ceil(WORLD_SPAN / 92) }, (_, c) => {
            const s = seed(r * 17.3 + c * 2.9);
            return <div key={c} style={{ position: "absolute", left: c * 92 + (r % 2 ? 46 : 0), top: 0, width: 86, height: 22, background: `rgba(${Math.round(38 + s * 15)},${Math.round(29 + s * 11)},${Math.round(21 + s * 8)},0.92)`, borderBottom: "2px solid rgba(6,4,3,0.7)" }} />;
          })}
        </div>
      ))}
      {/* horizontal service pipe runs with flange joints */}
      {[96, 232, 320].map((py, i) => (
        <React.Fragment key={"pp" + i}>
          <div style={{ position: "absolute", left: 0, top: py, width: WORLD_SPAN, height: 22 + i * 5, background: `linear-gradient(180deg, ${i === 1 ? "#4E5A62" : "#5A4E3A"}, ${i === 1 ? "#232A30" : "#2A2418"})`, boxShadow: "0 5px 12px rgba(0,0,0,0.6)" }} />
          <div style={{ position: "absolute", left: 0, top: py + 3, width: WORLD_SPAN, height: 4, background: "rgba(210,222,238,0.12)" }} />
          {Array.from({ length: Math.ceil(WORLD_SPAN / 340) }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: k * 340 + 60, top: py - 5, width: 20, height: 32 + i * 5, borderRadius: 2, background: i === 1 ? "#39434C" : "#463C2A" }} />
          ))}
        </React.Fragment>
      ))}
      {/* dim maintenance lamps in wire cages, flickering out of phase */}
      {Array.from({ length: Math.ceil(WORLD_SPAN / 560) }, (_, i) => {
        const lx = i * 560 + 190;
        const fl = 0.72 + 0.28 * Math.sin(lf / 21 + i * 1.9);
        return (
          <React.Fragment key={"lm" + i}>
            <div style={{ position: "absolute", left: lx + 8, top: 0, width: 3, height: 40, background: "#1A140C" }} />
            <div style={{ position: "absolute", left: lx, top: 38, width: 20, height: 14, borderRadius: "0 0 9px 9px", background: "#E7BE62", opacity: 0.85 * fl }} />
            <div style={{ position: "absolute", left: lx - 2, top: 36, width: 24, height: 18, borderRadius: 4, border: "2px solid #2A2214" }} />
            <div style={{ position: "absolute", left: lx - 84, top: -20, width: 188, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,190,98,0.9), transparent 66%)", opacity: 0.34 * fl, filter: "blur(18px)", mixBlendMode: "screen" }} />
          </React.Fragment>
        );
      })}
      {/* THE GROUND CUT: a hard shadow under the road so the street reads as sitting
          ON TOP of this, and a depth falloff so it recedes instead of advancing. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: WORLD_SPAN, height: 54, background: "linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.34) 60%, transparent)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: WORLD_SPAN, height: 5, background: "rgba(150,168,196,0.16)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(4,6,10,0.5) 0%, rgba(4,6,10,0.18) 30%, rgba(4,6,10,0.42) 100%)" }} />
      {/* seepage streaks and grit so it is never a flat fill */}
      {Array.from({ length: 30 }, (_, i) => {
        const s = seed(i * 4.7 + 31);
        return <div key={"sk" + i} style={{ position: "absolute", left: s * WORLD_SPAN, top: 0, width: 4 + s * 5, height: 60 + s * 200, background: "linear-gradient(180deg, rgba(120,140,150,0.16), transparent)" }} />;
      })}
    </div>
  );
};

// BELOW EVERYTHING, y 1180 down. Compacted strata so a wide or dropped camera
// still lands on dressed content. Cheap, deterministic, never animated hard.
export const DeepFill: React.FC<{ lf: number; o?: number; z?: number }> = ({ lf, o = 1, z = 2 }) => (
  <div style={{ position: "absolute", left: WORLD_X0, top: W_BOTTOM, width: WORLD_SPAN, height: W_DEEP - W_BOTTOM, zIndex: z, opacity: o, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#171208 0%,#120F0A 40%,#0C0A07 100%)" }} />
    {Array.from({ length: 16 }, (_, i) => {
      const s = seed(i * 6.7 + 41);
      return <div key={i} style={{ position: "absolute", left: 0, top: i * 96 + s * 20, width: WORLD_SPAN, height: 40 + s * 40, background: `rgba(${Math.round(40 + s * 24)},${Math.round(32 + s * 18)},${Math.round(22 + s * 12)},0.7)`, borderTop: "2px solid rgba(84,66,44,0.28)" }} />;
    })}
    {Array.from({ length: 46 }, (_, i) => {
      const s = seed(i * 2.3 + 53);
      return <div key={"g" + i} style={{ position: "absolute", left: s * WORLD_SPAN, top: seed(i * 5.1) * (W_DEEP - W_BOTTOM), width: 5 + s * 9, height: 4 + s * 6, borderRadius: 2, background: "rgba(96,78,54,0.4)", transform: `rotate(${s * 60}deg)` }} />;
    })}
    <div style={{ position: "absolute", left: 0, top: 0, width: WORLD_SPAN, height: 60, background: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent)" }} />
  </div>
);

// a wet pavement reflection: a flipped, blurred, low opacity smear of whatever is
// above it. Used for every fascia, sign and lit window on the row.
export const Puddle: React.FC<{ x: number; y: number; w?: number; h?: number; hue?: string; o?: number; blur?: number; z?: number; lf?: number }> =
  ({ x, y, w = 120, h = 90, hue = TUNGSTEN, o = 0.22, blur = 6, z = 7, lf = 0 }) => (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, opacity: o, filter: `blur(${blur}px)`, pointerEvents: "none",
      background: `linear-gradient(180deg, ${hue}, transparent 88%)`,
      transform: `scaleY(-1) translateY(${-h - Math.sin(lf / 21 + x * 0.01) * 1.6}px) scaleX(${1 + Math.sin(lf / 33 + x * 0.02) * 0.012})`,
      transformOrigin: "50% 0%",
    }} />
  );

// the warm pool a lit shop throws from its window and door onto the wet pavement.
export const Reflect: React.FC<{ x: number; y?: number; w?: number; hue?: string; o?: number; z?: number; lf?: number }> =
  ({ x, y = W_PAVE + 4, w = 300, hue = TUNGSTEN, o = 0.3, z = 6, lf = 0 }) => (
    <div style={{
      position: "absolute", left: x - w / 2, top: y, width: w, height: 84, zIndex: z, opacity: o, filter: "blur(18px)", pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 0%, ${hue}, transparent 70%)`,
      clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
      transform: `scaleX(${1 + Math.sin(lf / 29 + x * 0.01) * 0.02})`,
    }} />
  );

// the expanding warm ring that upgrades every surface it crosses. S3 f40, S4 f38.
export const PulseRing: React.FC<{ t: number; x: number; y: number; r?: number; hue?: string; o?: number; z?: number }> =
  ({ t, x, y, r = 900, hue = "#F6D79A", o = 1, z = 22 }) => {
    if (t <= 0 || t >= 1) return null;
    const rr = r * t;
    return (
      <div style={{
        position: "absolute", left: x - rr, top: y - rr * 0.34, width: rr * 2, height: rr * 0.68, borderRadius: "50%",
        border: `${Math.max(2, 10 * (1 - t))}px solid ${hue}`, opacity: (1 - t) * 0.85 * o, filter: "blur(3px)", zIndex: z, pointerEvents: "none",
      }} />
    );
  };

// ---------------------------------------------------------------------------
// PROPS: COIN, DRAIN, CULVERT, TILL, TUBE, PLAQUE, TALLYBOX, HOOKPOLE, SIGNFLIP
// ---------------------------------------------------------------------------

// A BRASS COIN, 34px, with a handset glyph struck into the face. It has exactly
// two destinations in the whole reel: the shop's door slot, or the storm drain.
export const Coin: React.FC<{ lf: number; x: number; y: number; r?: number; spin?: number; roll?: number; o?: number; z?: number; flat?: number }> =
  ({ lf, x, y, r = 17, spin = 1, roll = 0, o = 1, z = 20, flat = 0 }) => {
    const sq = flat > 0.5 ? 1 : Math.abs(Math.cos((lf * 0.26 + roll) * spin));
    const wob = 0.28 + 0.72 * sq;
    return (
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, zIndex: z, opacity: o, transform: `scaleX(${wob}) rotate(${roll * 40}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#F2CE72", "#A87C18"), border: `${Math.max(1, r * 0.12)}px solid #6F5410`, boxShadow: "0 3px 7px rgba(8,10,18,0.55)" }} />
        <div style={{ position: "absolute", left: r * 0.3, top: r * 0.26, width: r * 0.6, height: r * 0.34, borderRadius: "50%", background: "rgba(255,247,220,0.5)" }} />
        {/* the struck handset glyph */}
        <div style={{ position: "absolute", left: r * 0.52, top: r * 0.72, width: r * 0.96, height: r * 0.3, borderRadius: 3, background: "#7A5A12", transform: "rotate(-32deg)" }} />
        <div style={{ position: "absolute", left: r * 0.44, top: r * 0.6, width: r * 0.3, height: r * 0.3, borderRadius: "50%", background: "#7A5A12" }} />
        <div style={{ position: "absolute", left: r * 1.18, top: r * 1.0, width: r * 0.3, height: r * 0.3, borderRadius: "50%", background: "#7A5A12" }} />
      </div>
    );
  };

// THE STORM DRAIN at the kerb, world x 34..110. It is lit from below by nothing.
export const Drain: React.FC<{ lf: number; x?: number; y?: number; w?: number; glint?: number; z?: number }> =
  ({ lf, x = 34, y = W_KERB - 2, w = 76, glint = 1, z = 9 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 24, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, background: "#05070C", borderRadius: 3, boxShadow: "inset 0 3px 6px rgba(0,0,0,0.9)" }} />
      <div style={{ position: "absolute", left: -4, top: -4, width: w + 8, height: 7, background: "#2B313C", borderRadius: 2 }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 5 + i * ((w - 10) / 6), top: 3, width: (w - 10) / 12, height: 18, background: "#1B212B", borderTop: `1px solid rgba(190,205,230,${0.13 * glint + 0.05 * Math.abs(Math.sin(lf / 40 + i))})` }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 2, background: `rgba(206,222,244,${0.2 * glint})` }} />
    </div>
  );

// THE CULVERT. Below the street, packed with the coins that walked away.
// `fill` 0..1 is how deep the coin mass is. `shift` nudges the whole mass.
export const Culvert: React.FC<{ lf: number; x?: number; w?: number; top?: number; fill?: number; o?: number; z?: number; duck?: number; shift?: number; hue?: string }> =
  ({ lf, x = 0, w = WORLD_W, top = W_ROAD, fill = 0.34, o = 1, z = 3, duck = 0, shift = 0, hue = COLDCYAN }) => {
    const h = W_BOTTOM - top;
    // container-local, NOT world space: the wrapper below already applies `top`,
    // so adding it again pushed the whole coin mass past overflow:hidden and the
    // culvert rendered as an empty gradient in both the S0 hook and the S7 payoff.
    const surf = h * (1 - Math.max(0.06, fill));
    return (
      <div style={{ position: "absolute", left: x, top, width: w, height: h, zIndex: z, opacity: o, overflow: "hidden" }}>
        {/* old brick throat receding into black, condensation beads */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #060A11 0%, #0A0F18 40%, #04060B 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, background: `radial-gradient(ellipse 50% 40% at 30% 20%, ${hue}22, transparent 66%)`, mixBlendMode: "screen" }} />
        {Array.from({ length: 34 }, (_, i) => {
          const s = seed(i * 6.1 + 11);
          return <div key={"bk" + i} style={{ position: "absolute", left: s * w, top: 20 + seed(i * 2.9) * (h * 0.5), width: 3, height: 3, borderRadius: "50%", background: hue, opacity: 0.18 + s * 0.24 }} />;
        })}
        {/* THE MASS OF COINS. It has to read as a heap of individual coins, not a
            gold slab: a dark bed, a dense scatter of discs packed toward the
            surface, and a bright crest where the pile catches the light. Coin
            count scales with the world width so a wide culvert does not thin out. */}
        <div style={{ position: "absolute", left: 0, top: surf + shift, width: w, height: h, background: `linear-gradient(180deg, #6B4E10 0%, #3A2A07 22%, #150F03 52%, #06040A 100%)`, opacity: 0.96 }} />
        {/* the packed heap: three passes, back to front, so gaps read as depth */}
        {(() => {
          const N = Math.round(Math.max(180, w / 7));
          return Array.from({ length: N }, (_, i) => {
            const s = seed(i * 3.77 + 5);
            const s2 = seed(i * 1.53 + 2);
            const s3 = seed(i * 5.19 + 7);
            const band = s3 < 0.52 ? 0 : s3 < 0.80 ? 1 : 2;      // 0 crest, 1 mid, 2 deep
            // the deep band runs the full remaining depth, fading into the dark,
            // so the heap reads as coins going down rather than a flat field.
            const depth = band === 0 ? s2 * 26 : band === 1 ? 26 + s2 * 78 : 104 + s2 * s2 * Math.max(60, h * 0.86);
            const cx = s * w;
            const cy = surf + shift + depth;
            const rr = (band === 0 ? 8 : band === 1 ? 7 : 5.5) + s * (band === 0 ? 7 : 4);
            const tw = 0.5 + 0.5 * Math.abs(Math.sin(lf / (26 + s * 44) + i));
            const dim = band === 0 ? 1 : band === 1 ? 0.72 : 0.5 * (1 - Math.min(0.8, (depth - 104) / Math.max(120, h)));
            return <div key={"cn" + i} style={{
              position: "absolute", left: cx, top: cy, width: rr * 2, height: rr * 0.92, borderRadius: "50%",
              background: grad(band === 0 ? "#FFE9A6" : "#E3C56E", band === 0 ? "#A87C18" : "#6E5010"),
              opacity: (0.5 + tw * 0.45) * dim,
              boxShadow: "0 2px 4px rgba(0,0,0,0.62)",
            }} />;
          });
        })()}
        {/* the crest: where the heap meets the air, bright and slightly uneven */}
        <div style={{ position: "absolute", left: 0, top: surf + shift - 5, width: w, height: 13, background: `linear-gradient(180deg, rgba(255,243,201,0.75), rgba(255,220,140,0.18), transparent)`, filter: "blur(2px)" }} />
        <div style={{ position: "absolute", left: 0, top: surf + shift - 2, width: w, height: 4, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.5 }} />
        {/* the one yellow rubber duck floating on top. Nobody ever points at it. */}
        {duck > 0 && <div style={{ position: "absolute", left: w * 0.42, top: surf + shift - 22, width: 44, height: 26, zIndex: 4, opacity: duck }}>
          <div style={{ position: "absolute", left: 0, top: 8, width: 34, height: 18, borderRadius: "50% 50% 46% 46%", background: "#E9C43C" }} />
          <div style={{ position: "absolute", left: 22, top: 0, width: 16, height: 15, borderRadius: "50%", background: "#E9C43C" }} />
          <div style={{ position: "absolute", left: 36, top: 6, width: 8, height: 5, borderRadius: 2, background: "#D2724E" }} />
          <div style={{ position: "absolute", left: 28, top: 4, width: 3, height: 3, borderRadius: "50%", background: "#241C0A" }} />
        </div>}
        {/* cold cyan key from an unseen source */}
        <div style={{ position: "absolute", left: w * 0.1, top: 0, width: w * 0.5, height: h * 0.8, background: `radial-gradient(ellipse at 40% 10%, ${hue}, transparent 66%)`, opacity: 0.16, mixBlendMode: "screen", filter: "blur(30px)" }} />
      </div>
    );
  };

// THE HERO'S BRASS TILL on the roof parapet. Rocks when a coin lands in it.
export const Till: React.FC<{ lf: number; x: number; y?: number; rock?: number; pill?: string; tag?: string; s?: number; z?: number; lit?: number }> =
  ({ lf, x, y = -200, rock = 0, pill, tag, s = 1, z = 18, lit = 1 }) => {
    const rot = Math.sin(lf / 3.1) * 3.4 * rock;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: 132 * s, height: 108 * s, zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${rot}deg) scale(${s})` }}>
        {/* the money bin cube with a rivet band */}
        <div style={{ position: "absolute", left: 0, top: 16, width: 132, height: 88, borderRadius: 5, background: grad("#C8A02E", "#7A5A12"), boxShadow: "0 12px 22px rgba(8,10,18,0.55), inset 0 2px 0 rgba(255,240,190,0.35)" }} />
        <div style={{ position: "absolute", left: 0, top: 46, width: 132, height: 12, background: "rgba(60,42,8,0.5)" }} />
        {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ position: "absolute", left: 8 + i * 18, top: 49, width: 6, height: 6, borderRadius: "50%", background: "#F0D07A", opacity: 0.8 }} />)}
        {/* the lid and the coin slot */}
        <div style={{ position: "absolute", left: -6, top: 6, width: 144, height: 16, borderRadius: 4, background: grad("#E4BC50", "#9A7418"), boxShadow: "0 3px 6px rgba(8,10,18,0.5)" }} />
        <div style={{ position: "absolute", left: 52, top: 10, width: 32, height: 6, borderRadius: 3, background: "#3A2C08" }} />
        <div style={{ position: "absolute", left: 0, top: 16, width: 132, height: 88, borderRadius: 5, background: `radial-gradient(ellipse at 30% 20%, rgba(255,248,220,${0.3 * lit}), transparent 62%)` }} />
        {pill && <div style={{ position: "absolute", left: 8, top: 62, padding: "4px 12px", borderRadius: 999, background: grad("#F0CB63", "#C98A22"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#3A2A05", whiteSpace: "nowrap" }}>{pill}</div>}
        {/* a small brass tag hanging on a chain off the bracket */}
        {tag && <div style={{ position: "absolute", left: 96, top: 0, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 7.4) * 7 * (0.3 + rock)}deg)` }}>
          <div style={{ position: "absolute", left: 14, top: 0, width: 2, height: 24, background: "#8A6A18" }} />
          <div style={{ position: "absolute", left: 0, top: 22, padding: "3px 8px", borderRadius: 4, background: grad("#DCB44C", "#9A7418"), border: "2px solid #6F5410", fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#2E2206", whiteSpace: "nowrap" }}>{tag}</div>
        </div>}
      </div>
    );
  };

// A BRASS PNEUMATIC TUBE climbing the brickwork from a shop's fascia to the roof
// till. `live` lights the joints, `coin` 0..1 sends a glow travelling up inside.
export const Tube: React.FC<{ lf: number; x: number; y0?: number; y1?: number; live?: number; coin?: number; z?: number; bracket?: number }> =
  ({ lf, x, y0 = W_FASCIA, y1 = -120, live = 0, coin = -1, z = 5, bracket = 1 }) => {
    const h = y0 - y1;
    return (
      <div style={{ position: "absolute", left: x, top: y1, width: 30, height: h, zIndex: z }}>
        <div style={{ position: "absolute", left: 4, top: 0, width: 22, height: h, borderRadius: 4, background: live > 0.1 ? grad("#D5AE44", "#6E5210") : grad("#6B5E3E", "#3A3222"), boxShadow: "0 4px 10px rgba(6,8,14,0.5)" }} />
        <div style={{ position: "absolute", left: 8, top: 0, width: 5, height: h, background: `rgba(255,244,208,${0.14 + live * 0.3})` }} />
        {/* joint gaps every 90px, plus the brackets that bolt it to the brick */}
        {Array.from({ length: Math.max(1, Math.floor(h / 90)) }, (_, i) => (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 1, top: 20 + i * 90, width: 28, height: 10, borderRadius: 2, background: live > 0.1 ? "#E0BA55" : "#5C5238" }} />
            {bracket > 0 && <div style={{ position: "absolute", left: -6, top: 26 + i * 90, width: 42, height: 4, background: "#2A2E38" }} />}
          </React.Fragment>
        ))}
        {/* the coin's glow travelling up inside, visible through the joint gaps */}
        {coin >= 0 && coin <= 1 && <div style={{ position: "absolute", left: 2, top: (1 - coin) * (h - 30), width: 26, height: 30, borderRadius: 6, background: "radial-gradient(ellipse, rgba(255,232,160,0.95), transparent 70%)", filter: "blur(3px)" }} />}
      </div>
    );
  };

// the hinged brass plaque screwed onto the booth grille. The green enamel lamp
// lights FIRST, before the grille ever speaks. Order matters and it is the point.
export const Plaque: React.FC<{ lf: number; x: number; y: number; text?: string; on?: number; lamp?: number; s?: number; z?: number; screws?: number }> =
  ({ lf, x, y, text = "ASSISTANT", on = 1, lamp = 0, s = 1, z = 26, screws = 2 }) => (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on, transformOrigin: "0 50%", transform: `scale(${s}) rotate(${(1 - on) * -22}deg)` }}>
      <div style={{ position: "relative", padding: "3px 9px", borderRadius: 3, background: grad("#E0BC58", "#96721A"), border: "2px solid #5F4810", boxShadow: "0 3px 7px rgba(6,8,14,0.55), inset 0 1px 0 rgba(255,248,214,0.5)", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.1em", color: "#2C2106", whiteSpace: "nowrap" }}>
        {text}
        {Array.from({ length: screws }, (_, i) => <div key={i} style={{ position: "absolute", left: i === 0 ? 3 : undefined, right: i === 1 ? 3 : undefined, top: "50%", marginTop: -3, width: 6, height: 6, borderRadius: "50%", background: "#B8912C", border: "1px solid #5F4810" }} />)}
      </div>
      {/* the green enamel lamp */}
      <div style={{ position: "absolute", right: -14, top: 4, width: 9, height: 9, borderRadius: "50%", background: lamp > 0.05 ? GREEN : "#25332C", border: "1.5px solid #14231C", opacity: 0.55 + lamp * 0.45 }} />
      {lamp > 0.05 && <div style={{ position: "absolute", right: -21, top: -3, width: 24, height: 24, borderRadius: "50%", background: `radial-gradient(circle, ${GREEN}, transparent 66%)`, opacity: 0.5 * lamp, filter: "blur(4px)", mixBlendMode: "screen" }} />}
    </div>
  );

// REDACTION: the hidden-count device. A clay slash, three dark blocks of uneven
// width, a small gold padlock. Used ONLY for the tally box and the trade plates.
export const Redaction: React.FC<{ open?: number; w?: number; h?: number; s?: number; lock?: number; drop?: number }> =
  ({ open = 0, w = 74, h = 26, s = 1, lock = 1, drop = 0 }) => {
    const blocks = [0.3, 0.42, 0.22];
    return (
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transform: `scale(${s})`, transformOrigin: "0 0" }}>
        <div style={{ position: "absolute", left: 2, top: 3, width: 4, height: h - 6, background: CLAY, transform: "skewX(-16deg)", opacity: 1 - Math.min(1, open * 3) }} />
        {blocks.map((bw, i) => {
          const gone = Math.max(0, Math.min(1, (open - i * 0.24) / 0.3));
          return <div key={i} style={{
            position: "absolute", left: 10 + blocks.slice(0, i).reduce((a, b) => a + b * (w - 14) + 3, 0), top: 4,
            width: bw * (w - 14), height: h - 8, borderRadius: 2, background: "#161A22",
            transform: `translateX(${gone * (60 + i * 20)}px) translateY(${gone * gone * 40}px) rotate(${gone * 24}deg)`, opacity: 1 - gone,
          }} />;
        })}
        {lock > 0 && <div style={{ position: "absolute", right: -3, top: -6, width: 14, height: 16, opacity: 1 - Math.min(1, open * 4), transform: `translateY(${drop * 220}px) rotate(${drop * 180}deg)` }}>
          <div style={{ position: "absolute", left: 3, top: 0, width: 8, height: 8, borderRadius: "50% 50% 0 0", border: "2px solid #C9A227", borderBottom: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 6, width: 14, height: 10, borderRadius: 2, background: GOLD, border: "1px solid #6F5410" }} />
        </div>}
      </div>
    );
  };

// THE TALLY BOX. A brass chest box on a shoulder strap, 96x64, with a counter
// window that is redacted from frame 0 and never shows a digit until S7.
export const TallyBox: React.FC<{ lf: number; x: number; y: number; open?: number; count?: number; money?: string; s?: number; z?: number; tick?: number; label?: string }> =
  ({ lf, x, y, open = 0, count = -1, money, s = 1, z = 24, tick = 0, label = "LAST WEEK" }) => {
    const shake = tick > 0 ? Math.sin(lf * 2.4) * 1.6 * tick : 0;
    return (
      <div style={{ position: "absolute", left: x, top: y + shake, width: 96 * s, height: 64 * s, zIndex: z, transform: `scale(${s})`, transformOrigin: "0 0" }}>
        {/* the strap */}
        <div style={{ position: "absolute", left: 6, top: -46, width: 12, height: 50, background: "#33383F", transform: "rotate(9deg)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 64, borderRadius: 5, background: grad("#B99A38", "#6C5310"), border: "2px solid #4E3C0C", boxShadow: "0 6px 12px rgba(6,8,14,0.6), inset 0 2px 0 rgba(255,244,200,0.3)" }} />
        <div style={{ position: "absolute", left: 6, top: 6, width: 84, height: 8, background: "rgba(48,34,6,0.45)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 3, top: 46, width: 90, height: 4, background: "rgba(48,34,6,0.4)" }} />
        {/* the etched label */}
        <div style={{ position: "absolute", left: 7, top: 50, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 9, letterSpacing: "0.14em", color: "rgba(52,38,8,0.8)" }}>{label}</div>
        {/* the counter window */}
        <div style={{ position: "absolute", left: 10, top: 16, width: 76, height: 26, borderRadius: 3, background: "#0C0F15", border: "2px solid #4E3C0C", overflow: "hidden" }}>
          {count >= 0 && open > 0.4 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 21, color: "#F2D583" }}>{Math.round(count)}</div>}
          <Redaction open={open} w={74} h={22} lock={0} />
        </div>
        {/* the padlock and, when opened, the second money window beneath */}
        <div style={{ position: "absolute", left: 84, top: 12 }}><Redaction open={open} w={0} h={0} lock={1} drop={Math.max(0, Math.min(1, (open - 0.1) / 0.3))} /></div>
        {money && open > 0.85 && <div style={{ position: "absolute", left: 10, top: 44, width: 76, height: 20, borderRadius: 3, background: "#0C0F15", border: "2px solid #4E3C0C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 16, color: GOLD }}>{money}</div>}
      </div>
    );
  };

// THE HOOK POLE. A 210px brass pole with a hooked tip. His only weapon, and the
// only action he takes for 36 seconds.
export const HookPole: React.FC<{ lf: number; x: number; y: number; ang?: number; len?: number; o?: number; z?: number; bounce?: number }> =
  ({ lf, x, y, ang = 0, len = 210, o = 1, z = 25, bounce = 0 }) => {
    const jolt = bounce > 0 ? Math.sin(lf * 2.9) * 5 * bounce : 0;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: 8, height: len, zIndex: z, opacity: o, transformOrigin: "50% 100%", transform: `rotate(${ang + jolt}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: len, borderRadius: 4, background: grad("#B79A46", "#5E4C14") }} />
        <div style={{ position: "absolute", left: 2, top: 0, width: 2, height: len, background: "rgba(255,246,214,0.34)" }} />
        {/* the hooked tip */}
        <div style={{ position: "absolute", left: -14, top: -4, width: 22, height: 8, borderRadius: 4, background: "#9A8030" }} />
        <div style={{ position: "absolute", left: -14, top: -18, width: 8, height: 18, borderRadius: 4, background: "#9A8030" }} />
        {/* the worn grip */}
        <div style={{ position: "absolute", left: -1, top: len - 54, width: 10, height: 40, borderRadius: 4, background: "#2B2F38" }} />
      </div>
    );
  };

// THE HANGING OPEN / CLOSED SIGN inside the door glass, on a short chain.
// `closed` 0..1 flips it. It swings 1.5 degrees on its own the whole reel.
export const SignFlip: React.FC<{ lf: number; x: number; y?: number; closed?: number; swing?: number; z?: number; s?: number; locked?: number }> =
  ({ lf, x, y = W_SIGN, closed = 0, swing = 1, z = 15, s = 1, locked = 0 }) => {
    const idle = Math.sin(lf / 26) * 1.5 * swing;
    const kick = closed > 0 && closed < 1 ? Math.sin(closed * Math.PI) * 16 : 0;
    const face = closed > 0.5;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: 92 * s, height: 60 * s, zIndex: z, transformOrigin: "50% 0%", transform: `scale(${s}) rotate(${idle + kick}deg)` }}>
        <div style={{ position: "absolute", left: 30, top: -16, width: 2, height: 16, background: "#8A6A18" }} />
        <div style={{ position: "absolute", left: 60, top: -16, width: 2, height: 16, background: "#8A6A18" }} />
        <div style={{
          position: "absolute", left: 0, top: 0, width: 92, height: 44, borderRadius: 4,
          background: face ? "#2B2F38" : "#F2E6CE", border: `3px solid ${face ? "#171B22" : "#B6913E"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: "0.08em",
          color: face ? "#8E939C" : "#8A5A1E", boxShadow: "0 3px 7px rgba(6,8,14,0.5)",
          transform: `rotateY(${closed * 180}deg)`,
        }}>
          <span style={{ transform: `rotateY(${closed * -180}deg)` }}>{face ? "CLOSED" : "OPEN"}</span>
        </div>
        {/* the new brass sign bracket. Once this is on, the pole bounces off it. */}
        {locked > 0 && <div style={{ position: "absolute", left: 20, top: -20, width: 52, height: 8, borderRadius: 3, background: grad("#D8B24E", "#8A6A18"), opacity: locked, boxShadow: "0 2px 4px rgba(6,8,14,0.5)" }} />}
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE BOOKING BOARD: eight slots on the awning underside, split flap style.
// ---------------------------------------------------------------------------

export const BookingBoard: React.FC<{ lf: number; x: number; y?: number; filled?: number; red?: number; w?: number; s?: number; z?: number; counter?: number; hue?: string; dying?: number }> =
  ({ lf, x, y = W_BOARD, filled = 0, red = -1, w = 320, s = 1, z = 13, counter = -1, hue = GREEN, dying = 0 }) => {
    const sw = (w - 18) / 8;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: w, height: 30 * s, zIndex: z, transform: `scale(${s})`, transformOrigin: "0 0" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 28, borderRadius: 3, background: "linear-gradient(180deg,#20242E,#12151C)", border: "2px solid #333A46", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)" }} />
        {Array.from({ length: 8 }, (_, i) => {
          const p = Math.max(0, Math.min(1, filled - i));                 // 0..1 this slot's flap
          const flap = p > 0 && p < 1 ? Math.sin(p * Math.PI) * 76 : 0;   // mid split flap
          const isRed = red === i;
          const die = Math.max(0, Math.min(1, dying * 8 - (7 - i)));      // dies right to left
          const on = p >= 1 ? 1 - die : p;
          const col = isRed ? RED : hue;
          return (
            <div key={i} style={{ position: "absolute", left: 6 + i * sw, top: 4, width: sw - 4, height: 20, perspective: 120 }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: 2,
                background: on > 0.5 ? (isRed ? "#33191A" : col) : "#191D26",
                border: `1.5px solid ${on > 0.5 ? (isRed ? RED : "#5FC79A") : "#2C3240"}`,
                opacity: isRed ? 1 : 0.45 + on * 0.55,
                transform: `rotateX(${flap}deg)`, transformOrigin: "50% 0%",
              }} />
              {/* the diamond spark when a ticket lands */}
              {p > 0.62 && p < 1 && <div style={{ position: "absolute", left: sw / 2 - 8, top: 2, width: 14, height: 14, background: "#EAF7EF", opacity: (1 - p) * 3, transform: "rotate(45deg)" }} />}
              {isRed && <div style={{ position: "absolute", left: sw / 2 - 12, top: 3, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 10, letterSpacing: "0.08em", color: RED, opacity: 0.7 + Math.sin(lf / 8) * 0.3 }}>HUMAN</div>}
            </div>
          );
        })}
        {counter >= 0 && <div style={{ position: "absolute", right: -34, top: 2, width: 28, height: 24, borderRadius: 3, background: "#0E1219", border: "2px solid #333A46", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 15, color: GOLD }}>{Math.floor(counter)}</div>}
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE DOORMAN BOOTH. A slim brass and glass sentry box, world 100 x 230, bolted
// to a stoop, lit lantern on top, brass speaking grille, card rack in the hatch.
// ---------------------------------------------------------------------------

export const Booth: React.FC<{
  lf: number; x: number; y?: number; build?: number; lit?: number; lantern?: number; hatch?: number;
  cards?: number; plaque?: number; lamp?: number; hue?: string; cord?: number; z?: number; s?: number;
  awning?: string; bolthole?: number; glyphs?: number; grille?: number; flyer?: number; plate?: number;
  children?: React.ReactNode;
}> = ({ lf, x, y = W_STOOP, build = 1, lit = 1, lantern = 1, hatch = 0, cards = 0, plaque = 0, lamp = 0, hue = TUNGSTEN, cord = 0, z = 17, s = 1, awning, bolthole = 1, glyphs = 0, grille = 0, flyer = 0, plate = 1, children }) => {
  const H = 230, W = 100;
  const base = Math.max(0, Math.min(1, build * 4));            // f18 base plate
  const rails = Math.max(0, Math.min(1, (build - 0.25) * 4));  // f24 side rails
  const glass = Math.max(0, Math.min(1, (build - 0.5) * 4));   // f30 glass panel
  const lamphead = Math.max(0, Math.min(1, (build - 0.75) * 4)); // f36 lantern
  const sheen = ((lf * 2.1) % 240) / 240;
  const flick = 0.94 + 0.06 * Math.sin(lf / 13);
  return (
    <div style={{ position: "absolute", left: x, top: y - H, width: W, height: H, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      {/* base plate, bolted down */}
      <div style={{ position: "absolute", left: -6, top: H - 14, width: W + 12, height: 14 * base, borderRadius: 3, background: grad("#A98C34", "#5B4710"), boxShadow: "0 6px 14px rgba(6,8,14,0.6)" }} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: -2 + i * 34, top: H - 10, width: 7, height: 7, borderRadius: "50%", background: "#D8B24E", opacity: base }} />)}
      {/* the two brass side rails */}
      <div style={{ position: "absolute", left: 0, top: H - 14 - (H - 30) * rails, width: 12, height: (H - 30) * rails, borderRadius: 3, background: grad("#C9A94A", "#6A5314") }} />
      <div style={{ position: "absolute", left: W - 12, top: H - 14 - (H - 30) * rails, width: 12, height: (H - 30) * rails, borderRadius: 3, background: grad("#C9A94A", "#6A5314") }} />
      {/* the glass panel with a travelling specular sheen and rain beading on it */}
      <div style={{ position: "absolute", left: 12, top: H - 14 - (H - 44) * glass, width: W - 24, height: (H - 44) * glass, background: `linear-gradient(180deg, rgba(150,190,220,${0.16 + lit * 0.1}), rgba(40,60,86,0.34))`, border: "1px solid rgba(220,236,255,0.16)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: `${-40 + sheen * 180}%`, top: 0, width: "45%", height: "100%", background: "linear-gradient(100deg, transparent, rgba(255,250,235,0.30), transparent)", filter: "blur(4px)" }} />
        {Array.from({ length: 12 }, (_, i) => {
          const sd = seed(i * 7.3 + 3);
          const run = ((lf * (0.3 + sd * 0.8)) % 200);
          return <div key={i} style={{ position: "absolute", left: 6 + sd * (W - 36), top: (sd * 90 + run) % (H - 60), width: 3, height: 5 + sd * 8, borderRadius: 2, background: "rgba(226,240,255,0.4)" }} />;
        })}
        {children}
      </div>
      {/* the brass speaking grille, the bare bolt hole, the plaque */}
      <div style={{ position: "absolute", left: 24, top: 78, width: 52, height: 34, borderRadius: 4, background: grad("#BC9C3C", "#6A5314"), border: "2px solid #4E3C0C", opacity: glass, boxShadow: grille > 0.05 ? `inset 0 0 14px rgba(255,236,180,${0.7 * grille})` : "none" }}>
        {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 6, top: 4 + i * 6, width: 40, height: 3, borderRadius: 2, background: grille > 0.05 ? "#FFEFC0" : "#4E3C0C", opacity: grille > 0.05 ? 0.4 + grille * 0.6 * (0.6 + 0.4 * Math.sin(lf / 3 + i)) : 0.75 }} />)}
      </div>
      {bolthole > 0 && plaque < 0.05 && <div style={{ position: "absolute", left: 80, top: 92, width: 8, height: 8, borderRadius: "50%", background: "#2A2006", border: "1.5px solid #6A5314", opacity: glass }} />}
      {plaque > 0.02 && <Plaque lf={lf} x={62} y={88} on={plaque} lamp={lamp} s={0.9} z={26} />}
      {/* the little brass ALWAYS ON plate */}
      {plate > 0 && glass > 0.8 && <div style={{ position: "absolute", left: 20, top: 122, padding: "2px 7px", borderRadius: 2, background: grad("#D3AE48", "#8A6A18"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 9, letterSpacing: "0.12em", color: "#2C2106" }}>ALWAYS ON</div>}
      {/* the lantern on top */}
      <div style={{ position: "absolute", left: 26, top: -6 + (1 - lamphead) * 30, width: 48, height: 44, opacity: lamphead, transformOrigin: "50% 100%", transform: `rotate(${(1 - lamphead) * -70}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 8, width: 48, height: 30, borderRadius: 3, background: lantern > 0.05 ? `radial-gradient(ellipse at 50% 40%, ${hue}, #A87C2E)` : "#3A3C40", border: "3px solid #6A5314", opacity: 0.6 + lantern * 0.4 * flick }} />
        <div style={{ position: "absolute", left: 12, top: 0, width: 24, height: 10, borderRadius: 2, background: "#7A6018" }} />
        {lantern > 0.05 && <div style={{ position: "absolute", left: -46, top: -36, width: 140, height: 150, borderRadius: "50%", background: `radial-gradient(circle, ${hue}, transparent 66%)`, opacity: 0.34 * lantern * flick, filter: "blur(16px)", mixBlendMode: "screen", pointerEvents: "none" }} />}
      </div>
      {/* the side hatch with the three tier brass card rack */}
      {hatch > 0.02 && <div style={{ position: "absolute", left: W - 6, top: 60, width: 78, height: 104, transformOrigin: "0% 50%", transform: `rotateY(${-72 * hatch}deg)`, zIndex: 3 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: grad("#B99A38", "#5B4710"), border: "2px solid #4E3C0C" }} />
      </div>}
      {hatch > 0.4 && <div style={{ position: "absolute", left: 14, top: 60, width: 72, height: 104, zIndex: 4 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "linear-gradient(180deg,#3A2E10,#1C1608)", border: "2px solid #6A5314" }} />
        {/* the desk bell plunger on top */}
        <div style={{ position: "absolute", left: 26, top: -12, width: 20, height: 12, borderRadius: "10px 10px 0 0", background: grad("#DCB84E", "#8A6A18") }} />
        <div style={{ position: "absolute", left: 34, top: -18, width: 4, height: 8, background: "#6A5314" }} />
        {["SAY", "ASK", "DO"].map((lb, i) => {
          const inSlot = Math.max(0, Math.min(1, cards - i));
          return (
            <div key={lb} style={{ position: "absolute", left: 5, top: 8 + i * 32, width: 62, height: 26 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "#120E06", border: "1px solid #6A5314" }} />
              <div style={{ position: "absolute", left: 2 + (1 - inSlot) * 62, top: 2, width: 42, height: 22, borderRadius: 2, background: grad("#E2C468", "#A8842A"), opacity: inSlot, boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                {/* wordless glyph per card: speech bubble, question plus boxes, arrow into a grid */}
                {i === 0 && <><div style={{ position: "absolute", left: 8, top: 5, width: 26, height: 12, borderRadius: 4, background: "#4E3C0C" }} /><div style={{ position: "absolute", left: 12, top: 15, width: 7, height: 5, background: "#4E3C0C" }} /></>}
                {i === 1 && <><div style={{ position: "absolute", left: 7, top: 4, width: 5, height: 14, background: "#4E3C0C" }} />{[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 18 + k * 8, top: 8, width: 6, height: 6, border: "1.5px solid #4E3C0C" }} />)}</>}
                {i === 2 && <>{[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 20 + (k % 2) * 9, top: 5 + Math.floor(k / 2) * 8, width: 7, height: 6, background: "#4E3C0C" }} />)}<div style={{ position: "absolute", left: 5, top: 9, width: 12, height: 3, background: "#4E3C0C" }} /></>}
              </div>
              <div style={{ position: "absolute", left: 46, top: 8, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 8, letterSpacing: "0.06em", color: "#D8B24E" }}>{lb}</div>
              <div style={{ position: "absolute", right: -6, top: 10, width: 6, height: 6, borderRadius: "50%", background: inSlot > 0.9 ? GOLD : "#332808", opacity: 0.5 + inSlot * 0.5 }} />
            </div>
          );
        })}
        {/* the one pigeonhole nobody ever collects from */}
        <div style={{ position: "absolute", left: 5, top: 104, width: 62, height: 0 }} />
      </div>}
      {/* the red cord */}
      {cord > 0 && <div style={{ position: "absolute", left: W - 26, top: 40, width: 6, height: 70 + cord * 26, borderRadius: 3, background: RED, zIndex: 5, transformOrigin: "50% 0%", transform: `rotate(${cord * 5}deg)` }}>
        <div style={{ position: "absolute", left: -5, top: 70 + cord * 26, width: 16, height: 16, borderRadius: "50%", background: RED, border: "2px solid #7A281E" }} />
      </div>}
      {/* the awning colour chip painted over the booth silhouette (S6 repaints) */}
      {awning && <div style={{ position: "absolute", left: 12, top: 30, width: W - 24, height: 8, borderRadius: 2, background: awning, opacity: 0.85 }} />}
      {/* the GURU MASTERCLASS flyer, upside down, stuck to the glass */}
      {flyer > 0 && <div style={{ position: "absolute", left: 22, top: 150, width: 42, height: 54, background: "#EFE7D4", border: "1px solid #C9BEA4", transform: "rotate(184deg)", opacity: flyer, zIndex: 6, boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", left: 4, top: 6, width: 34, height: 4, background: "#8A5A44" }} />
        <div style={{ position: "absolute", left: 4, top: 13, width: 24, height: 3, background: "#B0A897" }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 6 + i * 5, top: 26 + i * 3, width: 22, height: 9, background: "#5E8A6A", transform: `rotate(${-12 + i * 9}deg)` }} />)}
      </div>}
      {/* the wordless glyph chits popping above the booth into the brass hopper */}
      {glyphs > 0 && <div style={{ position: "absolute", left: 26, top: -60, width: 48, height: 48, zIndex: 7, opacity: glyphs }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: grad("#E2C468", "#A8842A"), border: "2px solid #6A5314" }} />
      </div>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// ONE SHOPFRONT, instanced four times with different dressing.
// ---------------------------------------------------------------------------

export const Shopfront: React.FC<{
  lf: number; x: number; name?: string; sub?: string; trade?: TradeKey; hue?: string;
  open?: number; lit?: number; booth?: number; tickets?: number; redSlot?: number; sign?: number;
  plaque?: number; lamp?: number; boothLantern?: number; redact?: number; brk?: number; doorOpen?: number;
  chalk?: number; hl?: number; bracket?: number; tube?: number; tubeCoin?: number; awning?: string;
  counter?: number; z?: number; boothCards?: number; boothHatch?: number; boothCord?: number; boothGrille?: number;
  dim?: number; boothChildren?: React.ReactNode;
}> = ({
  lf, x, name = "PIPE BROS", sub = "PLUMBING", trade = "plumb", hue = TUNGSTEN,
  open = 1, lit = 1, booth = 0, tickets = 0, redSlot = -1, sign = 0, plaque = 0, lamp = 0,
  boothLantern = 1, redact = 0, brk = 0, doorOpen = 0, chalk = 0, hl = 0, bracket = 0,
  tube = 0, tubeCoin = -1, awning, counter = -1, z = 8, boothCards = 0, boothHatch = 0,
  boothCord = 0, boothGrille = 0, dim = 0, boothChildren,
}) => {
  const flick = 0.95 + 0.05 * Math.sin(lf / 19 + x * 0.01);
  const stutter = trade === "dds" && (lf % 90) < 3 ? 0.35 : 1;    // Painless Pete's lazy stutter
  const glow = lit * flick * stutter;
  const lift = hl * 6;
  return (
    <div style={{ position: "absolute", left: x, top: W_FASCIA - 60 - lift, width: SHOP_W, height: W_STOOP - W_FASCIA + 120, zIndex: z, opacity: 1 - dim * 0.75 }}>
      {/* ---- wet brick above the fascia ---- */}
      <div style={{ position: "absolute", left: 0, top: -160, width: SHOP_W, height: 220, background: "linear-gradient(180deg,#1C212B,#262C38)" }}>
        {Array.from({ length: 44 }, (_, i) => {
          const r = Math.floor(i / 11), c = i % 11;
          return <div key={i} style={{ position: "absolute", left: c * 48 + (r % 2 ? 24 : 0), top: r * 22, width: 44, height: 18, background: "rgba(46,53,66,0.7)", borderBottom: "1px solid rgba(12,16,22,0.6)" }} />;
        })}
        {/* mortar streaks running wet */}
        {Array.from({ length: 5 }, (_, i) => <div key={"ms" + i} style={{ position: "absolute", left: 40 + seed(i * 3.7 + x) * (SHOP_W - 80), top: 0, width: 5, height: 220, background: "linear-gradient(180deg, rgba(150,170,200,0.14), transparent)" }} />)}
      </div>

      {/* ---- FASCIA SIGN band, world y 210..272 ---- */}
      <div style={{ position: "absolute", left: OFF_FASCIA, top: 60, width: SHOP_W - 20, height: 62, borderRadius: 4, background: "linear-gradient(180deg,#2B3140,#171C25)", border: `2px solid ${hl > 0.1 ? GOLD : "#39404E"}`, boxShadow: "0 8px 18px rgba(6,8,14,0.55)" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: `linear-gradient(180deg, ${hue}22, transparent 70%)`, opacity: glow }} />
        <div style={{ position: "absolute", left: 16, top: 12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.02em", color: glow > 0.15 ? "#F4EEDF" : "#5D6472", opacity: 0.55 + glow * 0.45 }}>{name}</div>
        <div style={{ position: "absolute", left: 17, top: 42, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, letterSpacing: "0.24em", color: hue, opacity: 0.4 + glow * 0.5 }}>{sub}</div>
        {/* the redacted trade plate that slides down from the parapet in S4 */}
        {redact > 0.02 && <div style={{ position: "absolute", left: SHOP_W - 190, top: 14, width: 160, height: 34, borderRadius: 3, background: grad("#B99A38", "#6C5310"), border: "2px solid #4E3C0C", opacity: redact }}>
          <Redaction open={1 - redact} w={150} h={30} lock={1} drop={Math.max(0, 1 - redact * 1.6)} />
        </div>}
        {/* the trade's own emblem */}
        {trade === "plumb" && <><div style={{ position: "absolute", right: 26, top: 14, width: 30, height: 12, background: "#4E8A46", borderRadius: 2 }} /><div style={{ position: "absolute", right: 26, top: 14, width: 12, height: 34, background: "#4E8A46", borderRadius: 2 }} /><div style={{ position: "absolute", right: 12, top: 12, width: 14, height: 10, background: "#B2402E", borderRadius: 2 }} /></>}
        {trade === "elec" && <><div style={{ position: "absolute", right: 24, top: 10, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: `22px solid ${hue}`, opacity: 0.5 + glow * 0.5 }} /><div style={{ position: "absolute", right: 24, top: 30, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: `20px solid ${hue}`, opacity: 0.5 + glow * 0.5 }} /></>}
        {trade === "dds" && <div style={{ position: "absolute", right: 24, top: 10, width: 36, height: 40, background: glow > 0.15 ? "#EFF6F1" : "#4A5158", borderRadius: "16px 16px 6px 6px", opacity: 0.5 + glow * 0.5 }}><div style={{ position: "absolute", left: 15, top: 24, width: 5, height: 16, background: "#25303A" }} /></div>}
        {trade === "auto" && <div style={{ position: "absolute", right: 20, top: 10, width: 42, height: 42, borderRadius: "50%", border: `5px solid ${hue}`, opacity: 0.5 + glow * 0.5 }}><div style={{ position: "absolute", left: 14, top: 12, width: 10, height: 16, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: hue }} /></div>}
      </div>

      {/* ---- AWNING, y 272..338, with the booking board on the underside ---- */}
      <div style={{ position: "absolute", left: OFF_FASCIA, top: 122, width: SHOP_W - 20, height: 44, borderRadius: "4px 4px 0 0", background: awning ? `repeating-linear-gradient(90deg, ${awning} 0 26px, rgba(0,0,0,0.16) 26px 52px)` : "repeating-linear-gradient(90deg,#7C3B2E 0 26px,#EDE3CE 26px 52px)", boxShadow: "0 8px 16px rgba(6,8,14,0.5)", transform: "perspective(320px) rotateX(22deg)", transformOrigin: "50% 0%" }} />
      <div style={{ position: "absolute", left: OFF_FASCIA, top: 162, width: SHOP_W - 20, height: 8, background: "#1B202A" }} />
      <BookingBoard lf={lf} x={OFF_FASCIA + 40} y={168} filled={tickets} red={redSlot} w={SHOP_W - 120} counter={counter} z={13} />

      {/* ---- SHOP FACE, y 338..560 ---- */}
      <div style={{ position: "absolute", left: 0, top: 188, width: SHOP_W, height: 222, background: "linear-gradient(180deg,#232A36,#1A2029)" }} />
      {/* the glass window and its trade props */}
      <div style={{ position: "absolute", left: OFF_WIN, top: 200, width: 130, height: 178, borderRadius: 3, background: glow > 0.15 ? `linear-gradient(180deg, ${hue}55, rgba(24,32,44,0.9))` : "linear-gradient(180deg,#1D242F,#131922)", border: "5px solid #3A4150", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 30%, ${hue}, transparent 68%)`, opacity: 0.28 * glow, mixBlendMode: "screen" }} />
        {/* Mario plumbing gag: blue overalls with an M monogram. S0 only fires it. */}
        {trade === "plumb" && <>
          <div style={{ position: "absolute", left: 18, top: 40, width: 44, height: 60, background: "#2F5BA8", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 24, top: 28, width: 9, height: 16, background: "#2F5BA8" }} />
          <div style={{ position: "absolute", left: 47, top: 28, width: 9, height: 16, background: "#2F5BA8" }} />
          <div style={{ position: "absolute", left: 33, top: 58, width: 14, height: 14, borderRadius: "50%", background: "#E4C43A" }} />
          <div style={{ position: "absolute", left: 34, top: 60, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#2F5BA8" }}>M</div>
          <div style={{ position: "absolute", left: 78, top: 30, width: 34, height: 12, background: "#4E8A46", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 100, top: 30, width: 12, height: 40, background: "#4E8A46", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 96, top: 68, width: 20, height: 12, background: "#B2402E", borderRadius: 2 }} />
        </>}
        {/* Sparks & Son: a mini arcade cabinet where a grey ghost chases pellets */}
        {trade === "elec" && <>
          <div style={{ position: "absolute", left: 22, top: 34, width: 58, height: 100, borderRadius: "6px 6px 2px 2px", background: "#2A3140", border: "3px solid #454E60" }}>
            <div style={{ position: "absolute", left: 6, top: 8, width: 40, height: 34, background: "#070B12", border: "1px solid #566" }}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 5 + k * 9, top: 15, width: 4, height: 4, borderRadius: "50%", background: "#E4C43A", opacity: ((lf / 12 + k) % 4) > 1 ? 1 : 0.15 }} />)}
              <div style={{ position: "absolute", left: 4 + ((lf * 0.6) % 34), top: 12, width: 9, height: 11, borderRadius: "5px 5px 0 0", background: SLATE }} />
            </div>
            <div style={{ position: "absolute", left: 12, top: 50, width: 28, height: 8, background: "#3E4756", borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", left: 88, top: 56, width: 28, height: 60, background: "#3A4150", borderRadius: 3 }} />
        </>}
        {/* Painless Pete: a reclining chair silhouette and a giant strobing molar */}
        {trade === "dds" && <>
          <div style={{ position: "absolute", left: 14, top: 78, width: 66, height: 16, background: "#2C3440", borderRadius: 4, transform: "rotate(-8deg)" }} />
          <div style={{ position: "absolute", left: 12, top: 56, width: 20, height: 30, background: "#2C3440", borderRadius: 4, transform: "rotate(-22deg)" }} />
          <div style={{ position: "absolute", left: 86, top: 26, width: 34, height: 40, background: stutter > 0.5 ? "#F0F6F1" : "#59636B", borderRadius: "14px 14px 5px 5px" }}>
            <div style={{ position: "absolute", left: 14, top: 24, width: 5, height: 16, background: "#25303A" }} />
            {brk > 0.1 && <div style={{ position: "absolute", left: 16, top: 2, width: 2, height: 30, background: RED, transform: `rotate(${6 + brk * 4}deg)`, opacity: Math.min(1, brk * 3) }} />}
          </div>
        </>}
        {/* Valvotine: a tyre stack and an oil can roundel with a drip */}
        {trade === "auto" && <>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 16, top: 112 - i * 22 + (brk > 0.3 && i === 0 ? 6 * brk : 0), width: 62, height: 22 - (brk > 0.3 && i === 0 ? 8 * brk : 0), borderRadius: "50%", background: "#151920", border: "5px solid #262D38" }} />)}
          <div style={{ position: "absolute", left: 88, top: 34, width: 30, height: 40, borderRadius: 3, background: "#B26A2E" }} />
          <div style={{ position: "absolute", left: 99, top: 24, width: 8, height: 12, background: "#8A5020" }} />
          <div style={{ position: "absolute", left: 100, top: 76 + ((lf * 1.4) % 30), width: 5, height: 8, borderRadius: "50%", background: "#3A2A12", opacity: 0.8 }} />
        </>}
      </div>

      {/* the brass framed door with the hanging sign inside the glass */}
      <div style={{ position: "absolute", left: OFF_DOOR, top: 196, width: 110, height: 214, transformOrigin: "0% 50%", transform: `perspective(600px) rotateY(${-doorOpen * 62}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg,#7A5E22,#4A3A12)", border: "4px solid #8A6A18", boxShadow: "inset 0 0 18px rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", left: 12, top: 14, width: 82, height: 108, background: glow > 0.15 ? `linear-gradient(180deg, ${hue}66, rgba(26,34,46,0.9))` : "#141A24", border: "3px solid #6A5314" }} />
        {/* the brass letter slot and the emergency flap */}
        <div style={{ position: "absolute", left: 26, top: 140, width: 56, height: 10, borderRadius: 3, background: "#0D1016", border: "2px solid #8A6A18" }} />
        <div style={{ position: "absolute", left: 30, top: 162, width: 48, height: 26, borderRadius: 2, background: grad("#C09B34", "#6A5314"), border: "2px solid #4E3C0C", transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: 88, top: 108, width: 9, height: 22, borderRadius: 4, background: "#D8B24E" }} />
      </div>
      <SignFlip lf={lf} x={OFF_DOOR + 12} y={252} closed={sign} locked={bracket} z={16} s={0.86} />

      {/* the chalk tally on the brick, gates of five */}
      {chalk > 0 && <div style={{ position: "absolute", left: 26, top: 210, width: 120, height: 40, zIndex: 14 }}>
        {Array.from({ length: Math.min(12, Math.floor(chalk)) }, (_, i) => {
          const gate = Math.floor(i / 5), inG = i % 5;
          return <div key={i} style={{
            position: "absolute", left: gate * 40 + (inG === 4 ? 2 : inG * 8), top: 4,
            width: inG === 4 ? 34 : 3, height: inG === 4 ? 3 : 30, background: "rgba(232,228,214,0.72)",
            transform: inG === 4 ? "rotate(-22deg)" : "none", filter: "blur(0.4px)",
          }} />;
        })}
      </div>}

      {/* ---- STOOP, y 560..598, two steps ---- */}
      <div style={{ position: "absolute", left: OFF_STOOP, top: 410, width: 210, height: 20, background: "#39404C" }} />
      <div style={{ position: "absolute", left: OFF_STOOP - 12, top: 428, width: 234, height: 20, background: "#2E3540" }} />
      <div style={{ position: "absolute", left: OFF_STOOP, top: 410, width: 210, height: 4, background: "rgba(190,208,232,0.16)" }} />

      {/* ---- the booth on the stoop, and the warm pool it throws ---- */}
      {booth > 0.02 && <div style={{ position: "absolute", left: OFF_BOOTH, top: 0, width: 100, height: 410, zIndex: 17 }}>
        <Booth lf={lf} x={0} y={410} build={booth} lit={lit} lantern={boothLantern} hatch={boothHatch} cards={boothCards} plaque={plaque} lamp={lamp} hue={hue} cord={boothCord} grille={boothGrille} awning={awning} z={17}>{boothChildren}</Booth>
      </div>}

      {/* the break: one thing physically wrong, per trade (S4) */}
      {brk > 0.02 && <>
        {trade === "plumb" && Array.from({ length: 10 }, (_, i) => {
          const s = seed(i * 4.1 + 1); const p = ((lf * (2 + s * 2)) % 40) / 40;
          return <div key={i} style={{ position: "absolute", left: OFF_WIN + 96 + p * 60, top: 236 - Math.sin(p * Math.PI) * 40 + p * 30, width: 4, height: 10, borderRadius: 2, background: "rgba(170,205,235,0.7)", opacity: (1 - p) * brk, zIndex: 15 }} />;
        })}
        {trade === "elec" && <Sparks lf={lf} x={OFF_WIN + 60} y={250} on={brk} color="#DFF1FF" n={9} z={19} />}
        {trade === "auto" && <div style={{ position: "absolute", left: OFF_WIN + 10, top: 320, width: 90, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(180,200,220,0.2), transparent 70%)", filter: "blur(4px)", opacity: brk, zIndex: 15 }} />}
        {trade === "dds" && <div style={{ position: "absolute", left: OFF_WIN + 80, top: 218, width: 44, height: 50, background: RED, opacity: 0.22 * brk * (0.4 + 0.6 * Math.abs(Math.sin(lf / 6))), filter: "blur(6px)", zIndex: 15 }} />}
      </>}

      {/* the pneumatic tube climbing the brickwork to the roof */}
      {tube > 0.02 && <Tube lf={lf} x={SHOP_W - 70} y0={60} y1={-160} live={tube} coin={tubeCoin} z={4} />}
    </div>
  );
};

// ---------------------------------------------------------------------------
// DRIP BROS 24/7, the magenta rival across the road.
// ---------------------------------------------------------------------------

export const RivalShop: React.FC<{ lf: number; x?: number; on?: number; tickets?: number; dying?: number; blurred?: number; z?: number; booth?: number; mask?: number; beacon?: number; doorProp?: number }> =
  ({ lf, x = 2400, on = 1, tickets = 0, dying = 0, blurred = 1, z = 7, booth = 0, mask = 0, beacon = 0, doorProp = 0 }) => {
    const buzz = dying > 0 ? (Math.sin(lf * 1.7) > 0.2 ? 1 : 0.25) : 0.9 + 0.1 * Math.sin(lf / 11);
    const glow = on * buzz;
    const drip = ((lf % 40) / 40);
    return (
      <div style={{ position: "absolute", left: x, top: -60, width: 520, height: 720, zIndex: z, filter: blurred > 0 ? `blur(${1.5 * blurred}px) brightness(${1 - 0.2 * blurred})` : "none" }}>
        <div style={{ position: "absolute", left: 0, top: 200, width: 520, height: 420, background: "linear-gradient(180deg,#241826,#16101A)" }} />
        <div style={{ position: "absolute", left: 10, top: 240, width: 500, height: 66, borderRadius: 4, background: "#1A1220", border: `2px solid ${RIVALMAG}`, opacity: 0.5 + glow * 0.5 }}>
          <div style={{ position: "absolute", left: 18, top: 12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.04em", color: "#F6E2F0", opacity: 0.4 + glow * 0.6 }}>DRIP BROS</div>
          <div style={{ position: "absolute", left: 330, top: 20, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: "0.1em", color: RIVALMAG, opacity: 0.5 + glow * 0.5 }}>24/7</div>
        </div>
        {/* the three circle dripping tap glyph, pulsing downward on a 40 frame loop */}
        <div style={{ position: "absolute", left: 430, top: 316, width: 60, height: 90 }}>
          <div style={{ position: "absolute", left: 16, top: 0, width: 28, height: 14, borderRadius: 4, background: RIVALMAG, opacity: glow }} />
          {[0, 1, 2].map((i) => {
            const p = (drip + i / 3) % 1;
            return <div key={i} style={{ position: "absolute", left: 26, top: 18 + p * 60, width: 9, height: 12, borderRadius: "50% 50% 50% 50% / 70% 70% 40% 40%", background: RIVALMAG, opacity: (1 - p) * glow * (dying > 0.5 ? 0 : 1) }} />;
          })}
        </div>
        {/* the WE PICK UP tube and the red OPEN bar */}
        <div style={{ position: "absolute", left: 24, top: 322, padding: "5px 12px", borderRadius: 4, border: `2px solid ${RIVALMAG}`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.14em", color: "#F6E2F0", opacity: 0.35 + glow * 0.65 }}>WE PICK UP</div>
        <div style={{ position: "absolute", left: 200, top: 324, padding: "5px 14px", borderRadius: 3, background: dying > 0.6 ? "#2A1218" : "#8E2438", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.1em", color: "#FBE6E9", opacity: 0.4 + glow * 0.6 }}>OPEN</div>
        {/* their board, filling then dying */}
        <BookingBoard lf={lf} x={140} y={392} filled={tickets} w={300} hue={GREEN} dying={dying} counter={tickets >= 8 ? 8 : -1} z={12} />
        {/* the door, warm and busy */}
        <div style={{ position: "absolute", left: 210, top: 430, width: 110, height: 190, background: `linear-gradient(180deg, ${dying > 0.4 ? "#241A20" : "#8A6238"}, #241A20)`, border: "4px solid #3A2A34" }} />
        {doorProp > 0 && <div style={{ position: "absolute", left: 316, top: 590, width: 34, height: 26, background: "#D8C24E", border: "2px solid #A08A20", transform: "rotate(-8deg)" }} />}
        {/* the cheap plateless knockoff booth with a painted face stuck on the grille */}
        {booth > 0.02 && <div style={{ position: "absolute", left: 360, top: 620, zIndex: 14 }}>
          <Booth lf={lf} x={0} y={0} build={booth} lit={0.4} lantern={0} bolthole={1} plate={0} hue={RIVALMAG} z={14} />
          {mask > 0.02 && <div style={{ position: "absolute", left: 22, top: -152, width: 56, height: 46, zIndex: 22 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: 46, borderRadius: "18px 0 0 18px", background: "#C98A62", border: "2px solid #8A5A3A", transform: `translate(${-mask * 60}px, ${mask * mask * 150}px) rotate(${-mask * 44}deg)` }} />
            <div style={{ position: "absolute", left: 28, top: 0, width: 26, height: 46, borderRadius: "0 18px 18px 0", background: "#C98A62", border: "2px solid #8A5A3A", transform: `translate(${mask * 60}px, ${mask * mask * 150}px) rotate(${mask * 44}deg)` }} />
            <div style={{ position: "absolute", left: 8, top: 14, width: 8, height: 5, background: "#2A1C14", transform: `translate(${-mask * 60}px, ${mask * mask * 150}px)` }} />
            <div style={{ position: "absolute", left: 38, top: 14, width: 8, height: 5, background: "#2A1C14", transform: `translate(${mask * 60}px, ${mask * mask * 150}px)` }} />
          </div>}
        </div>}
        {/* the rotating red beacon on a cable, sweeping striped shadow bars */}
        {beacon > 0.02 && <>
          <div style={{ position: "absolute", left: 250, top: 120, width: 3, height: 90, background: "#1A1218" }} />
          <div style={{ position: "absolute", left: 232, top: 206, width: 40, height: 26, borderRadius: "8px 8px 3px 3px", background: "#5A1A1A", border: "2px solid #2A0E0E" }} />
          <div style={{ position: "absolute", left: 252 - 200, top: 220, width: 400, height: 400, background: `conic-gradient(from ${lf * 7}deg, ${RED}88, transparent 26%, transparent 74%, ${RED}88)`, opacity: 0.22 * beacon, filter: "blur(12px)", mixBlendMode: "screen", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 200, width: 520, height: 420, background: `repeating-linear-gradient(${lf * 2}deg, rgba(0,0,0,0.34) 0 26px, transparent 26px 60px)`, opacity: 0.5 * beacon, pointerEvents: "none" }} />
        </>}
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE WHOLE STREET, authored once.
// ---------------------------------------------------------------------------

export const Street: React.FC<{
  lf: number;
  booth?: number | number[];        // 0..1 booth build per shop
  board?: number | number[];        // 0..8 green tickets per shop
  lit?: number | number[];          // 0..1 shop lit level per shop
  sign?: number | number[];         // 0 OPEN, 1 CLOSED per shop
  bracket?: number | number[];      // the new brass sign bracket per shop
  plaque?: number | number[];       // the ASSISTANT plaque per shop
  lamp?: number | number[];         // the plaque's green enamel lamp per shop
  brk?: number | number[];          // the thing that is already broken, per shop
  redact?: number | number[];       // the redacted trade plate on the fascia
  doorOpen?: number | number[];
  hl?: number | number[];           // spotlight sweep highlight per shop
  awnings?: (string | undefined)[]; // S6 repaints
  redSlot?: number;                 // the one red HUMAN slot (shop 0 in S8)
  tubes?: number;                   // 0..4 live pneumatic tubes
  tubeCoin?: number;                // 0..1 a coin travelling up tube 0
  tills?: number;                   // 0..4 tills on the roof parapet
  tillRock?: number; tillPill?: string; tillTag?: string;
  brackets?: number;                // empty tube brackets on the parapet
  rain?: number;                    // drizzle amount, 1 default, 0 in S7 and S10
  lamps?: number;                   // the four catenary lamp cones
  chalk?: number;                   // the chalk tally on Pipe Bros' brick
  rival?: number;                   // Drip Bros neon level
  rivalTickets?: number; rivalDying?: number; rivalBooth?: number; rivalMask?: number;
  rivalBeacon?: number; rivalSharp?: number; rivalDoorProp?: number;
  culvert?: number;                 // 0..1 the ground goes transparent
  coins?: number;                   // culvert fill depth
  duck?: number; coinShift?: number;
  dry?: number;                     // 0..1 pavement dries out (S10)
  daylight?: number;                // S7 pale flat grey morning
  cool?: number;                    // S8 cold cyan key
  redWash?: number;                 // S9 hard red
  key?: string; fill?: string;
  pigeonY?: number; pigeonAt?: number;
  drainGlint?: number;
  far?: number;
  fore?: number;                    // the blurred foreground silhouettes
  z?: number;
  gekko?: number;                   // the shelter's lizard parody. Capped at two scenes.
  children?: React.ReactNode;       // scene sprites, staged in world coordinates
}> = ({
  lf, booth, board, lit, sign, bracket, plaque, lamp, brk, redact, doorOpen, hl, awnings,
  redSlot = -1, tubes = 0, tubeCoin = -1, tills = 0, tillRock = 0, tillPill, tillTag, brackets = 4,
  rain = 1, lamps = 1, chalk = 0, rival = 1, rivalTickets = 0, rivalDying = 0, rivalBooth = 0,
  rivalMask = 0, rivalBeacon = 0, rivalSharp = 0, rivalDoorProp = 0, culvert = 0, coins = 0.34,
  duck = 0, coinShift = 0, dry = 0, daylight = 0, cool = 0, redWash = 0, key = TUNGSTEN,
  fill = "#8FA9C6", pigeonY = -70, pigeonAt = 20, drainGlint = 1, far = 1, fore = 1, gekko = 1, children,
}) => {
  const B = arr4(booth, 0), T = arr4(board, 0), LI = arr4(lit, 1), SG = arr4(sign, 0);
  const BR = arr4(bracket, 0), PL = arr4(plaque, 0), LP = arr4(lamp, 0), BK = arr4(brk, 0);
  const RD = arr4(redact, 0), DO = arr4(doorOpen, 0), HL = arr4(hl, 0);
  const ground = 1 - culvert * 0.86;                      // the pavement and road going see through
  const wet = 1 - dry;
  const day = daylight;
  return (
    <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP }}>
      {/* everything below is authored in WORLD coordinates, so shift the origin back */}
      <div style={{ position: "absolute", left: -WORLD_X0, top: -W_SKYTOP }}>

        {/* ---- THE BASE BACKDROP. The deterministic floor of the whole world:
             whatever a camera does, it lands on this before it lands on black. ---- */}
        <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP, background: "linear-gradient(180deg,#0A0E1A 0%,#1A2136 22%,#232A38 42%,#241C12 62%,#100C08 100%)", zIndex: -1 }} />

        {/* ---- SKY, FAR TIER, DEEP STRATA ---- */}
        <SkyTier lf={lf} day={day} z={0} />
        <FarTier lf={lf} o={far * (1 - day * 0.5)} z={1} />
        <DeepFill lf={lf} z={2} />

        {/* ---- ROOF PARAPET TIER, y -460..-120 ---- */}
        <div style={{ position: "absolute", left: WORLD_X0, top: -180, width: WORLD_SPAN, height: 66, background: "linear-gradient(180deg,#333B49,#1E242F)", zIndex: 4 }} />
        <div style={{ position: "absolute", left: WORLD_X0, top: -186, width: WORLD_SPAN, height: 8, background: "#454E5E", zIndex: 4 }} />
        {/* the parapet face below the deck, so ROOF never shows a gap */}
        <div style={{ position: "absolute", left: WORLD_X0, top: -114, width: WORLD_SPAN, height: 40, background: "linear-gradient(180deg,#232A36,#1A1F29)", zIndex: 4 }} />
        {/* the satellite dish and gutter framing the top left, blurred */}
        <div style={{ position: "absolute", left: 40, top: -400, width: 120, height: 120, zIndex: 3, filter: "blur(3px)" }}>
          <div style={{ position: "absolute", left: 10, top: 10, width: 90, height: 90, borderRadius: "50%", background: "#232A36", border: "6px solid #2E3644" }} />
          <div style={{ position: "absolute", left: 52, top: 40, width: 8, height: 60, background: "#2E3644" }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: -196, width: 700, height: 10, background: "#2A3140", zIndex: 3, filter: "blur(3px)" }} />
        {/* the folding chair and the steaming thermos with a glowing green dial */}
        <div style={{ position: "absolute", left: 300, top: -262, width: 70, height: 84, zIndex: 17 }}>
          <div style={{ position: "absolute", left: 6, top: 34, width: 58, height: 8, background: "#3E4654", transform: "rotate(-4deg)" }} />
          <div style={{ position: "absolute", left: 6, top: 0, width: 10, height: 40, background: "#3E4654" }} />
          <div style={{ position: "absolute", left: 4, top: 40, width: 8, height: 42, background: "#2E3644", transform: "rotate(9deg)" }} />
          <div style={{ position: "absolute", left: 54, top: 40, width: 8, height: 42, background: "#2E3644", transform: "rotate(-9deg)" }} />
        </div>
        <div style={{ position: "absolute", left: 392, top: -238, width: 34, height: 60, zIndex: 17 }}>
          <div style={{ position: "absolute", left: 0, top: 8, width: 34, height: 52, borderRadius: 4, background: grad("#5B6472", "#2E3644") }} />
          <div style={{ position: "absolute", left: 6, top: 0, width: 22, height: 10, borderRadius: 3, background: "#454E5E" }} />
          <div style={{ position: "absolute", left: 10, top: 26, width: 14, height: 8, borderRadius: 2, background: "#4FA87A", opacity: 0.7 + 0.3 * Math.sin(lf / 14) }} />
          {Array.from({ length: 5 }, (_, i) => {
            const p = ((lf * 0.9 + i * 24) % 120) / 120;
            return <div key={i} style={{ position: "absolute", left: 12 + Math.sin(p * 5 + i) * 8, top: -p * 60, width: 8, height: 8, borderRadius: "50%", background: "rgba(226,238,255,0.28)", opacity: (1 - p) * 0.7, filter: "blur(2px)" }} />;
          })}
        </div>
        {/* the four tube brackets on the parapet, filling with tills as the reel runs */}
        {Array.from({ length: 4 }, (_, i) => (
          <React.Fragment key={"br" + i}>
            {i < brackets && <div style={{ position: "absolute", left: 470 + i * 150, top: -190, width: 44, height: 16, borderRadius: 3, background: "#39414F", border: "2px solid #4C5666", zIndex: 16 }} />}
            {i < tills && <Till lf={lf} x={456 + i * 150} y={-282} rock={i === 0 ? tillRock : tillRock * 0.5} pill={i === 0 ? tillPill : undefined} tag={i === 0 ? tillTag : undefined} s={0.86} z={18} lit={LI[i]} />}
          </React.Fragment>
        ))}

        {/* ---- UPPER FACADE brick behind the fascias, y -120..210 ---- */}
        <div style={{ position: "absolute", left: WORLD_X0, top: -120, width: WORLD_SPAN, height: 330, background: "linear-gradient(180deg,#1A1F29,#242A36)", zIndex: 2 }} />

        {/* ---- THE CULVERT, revealed only when a scene opens the ground ---- */}
        <Culvert lf={lf} x={WORLD_X0} w={WORLD_SPAN} fill={coins} duck={duck} shift={coinShift} z={3} o={1} />
        {/* ---- THE UNDER STREET, OPAQUE BY DEFAULT. It covers the culvert until
             `culvert` is driven up, so the ground is never a black hole. ---- */}
        <UnderStreet lf={lf} o={1 - culvert} z={4} />

        {/* ---- THE ROAD, y 678..792 ---- */}
        <RoadBand lf={lf} o={ground} key1={key} hues={SHOPS.map((s) => s.hue)} lit={LI} wet={wet} rival={rival} z={5} />

        {/* ---- THE PAVEMENT y 598..664 and THE KERB y 664..678 ---- */}
        <div style={{ position: "absolute", left: WORLD_X0, top: W_PAVE, width: WORLD_SPAN, height: W_KERB - W_PAVE, background: `linear-gradient(180deg,#3A4149,#2A3038)`, zIndex: 6, opacity: ground }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(210,228,248,${0.09 * wet}), transparent)` }} />
          {Array.from({ length: Math.ceil(WORLD_SPAN / 76) }, (_, i) => <div key={i} style={{ position: "absolute", left: i * 76, top: 0, width: 2, height: 66, background: "rgba(14,18,24,0.4)" }} />)}
        </div>
        <div style={{ position: "absolute", left: WORLD_X0, top: W_KERB, width: WORLD_SPAN, height: W_ROAD - W_KERB, background: "#4A525C", zIndex: 6, opacity: ground }} />
        <div style={{ position: "absolute", left: WORLD_X0, top: W_KERB, width: WORLD_SPAN, height: 3, background: "rgba(206,222,244,0.2)", zIndex: 6, opacity: ground }} />
        <Drain lf={lf} x={34} y={W_KERB - 2} w={76} glint={drainGlint} z={9} />

        {/* ---- TERMINATING BLOCKS. The row is bracketed at both ends so a camera
             that overruns x 0 or x 2920 still lands on built frontage. ---- */}
        {[{ x: WORLD_X0, w: 420 }, { x: 2920, w: WORLD_X1 - 2920 }].map((b, k) => (
          <div key={"tb" + k} style={{ position: "absolute", left: b.x, top: -120, width: b.w, height: W_PAVE + 120, zIndex: 7 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1E242F,#151A22)" }} />
            {Array.from({ length: 9 }, (_, r) => (
              <div key={r} style={{ position: "absolute", left: 0, top: r * 74 + 20, width: b.w, height: 60 }}>
                {Array.from({ length: Math.ceil(b.w / 96) }, (_, c) => {
                  const s = seed(k * 31.7 + r * 5.3 + c * 2.1);
                  return <div key={c} style={{ position: "absolute", left: c * 96 + 18, top: 6, width: 54, height: 46, background: s > 0.72 ? "#5E5230" : "#141922", border: "3px solid #2A313D", opacity: s > 0.72 ? 0.4 + 0.2 * Math.sin(lf / 40 + c) : 1 }} />;
                })}
              </div>
            ))}
            <div style={{ position: "absolute", left: 0, top: 0, width: b.w, height: 14, background: "#39414F" }} />
          </div>
        ))}

        {/* ---- ALLEY MOUTH, x 0..120, near black ---- */}
        <div style={{ position: "absolute", left: 0, top: W_FASCIA - 60, width: 120, height: W_PAVE - W_FASCIA + 60, background: "linear-gradient(90deg,#04060A,#0C1017)", zIndex: 8 }} />
        <div style={{ position: "absolute", left: 0, top: W_FASCIA - 60, width: 120, height: 26, background: "#191E27", zIndex: 8 }} />
        {/* a dim glow deep in the alley so it reads as depth, not a painted hole */}
        <div style={{ position: "absolute", left: 6, top: W_FASCIA + 130, width: 108, height: 180, background: "radial-gradient(ellipse at 50% 40%, rgba(120,140,178,0.16), transparent 68%)", filter: "blur(10px)", zIndex: 8 }} />

        {/* ---- THE FOUR TRADE SHOPFRONTS ---- */}
        {SHOPS.map((sh, i) => (
          <Shopfront
            key={sh.name} lf={lf} x={sh.x} name={sh.name} sub={sh.sub} trade={sh.trade} hue={sh.hue}
            lit={LI[i]} booth={B[i]} tickets={T[i]} sign={SG[i]} bracket={BR[i]} plaque={PL[i]} lamp={LP[i]}
            brk={BK[i]} redact={RD[i]} doorOpen={DO[i]} hl={HL[i]} redSlot={i === 0 ? redSlot : -1}
            chalk={i === 0 ? chalk : 0} tube={i < tubes ? 1 : 0} tubeCoin={i === 0 ? tubeCoin : -1}
            awning={awnings ? awnings[i] : undefined} z={8 + i} dim={day * 0.3}
          />
        ))}

        {/* the warm pool each lit shop throws onto the wet pavement, plus the fascia smear */}
        {SHOPS.map((sh, i) => LI[i] > 0.05 && (
          <React.Fragment key={"pool" + i}>
            <Reflect lf={lf} x={doorX(i)} y={W_PAVE + 2} w={300 + B[i] * 220} hue={sh.hue} o={0.3 * LI[i] * wet * (1 - day * 0.8)} z={7} />
            <Reflect lf={lf} x={sh.x + OFF_WIN + 65} y={W_PAVE + 2} w={230} hue={sh.hue} o={0.22 * LI[i] * wet * (1 - day * 0.8)} z={7} />
            <Puddle lf={lf} x={sh.x + OFF_FASCIA} y={W_PAVE + 4} w={SHOP_W - 20} h={62} hue={sh.hue} o={0.22 * LI[i] * wet * (1 - day * 0.85)} blur={6} z={7} />
          </React.Fragment>
        ))}

        {/* ---- LAMP POST and BUS SHELTER, x 2320..2400 ---- */}
        <div style={{ position: "absolute", left: 2330, top: 300, width: 14, height: 300, background: "linear-gradient(90deg,#2A313C,#171C24)", zIndex: 9 }} />
        <div style={{ position: "absolute", left: 2318, top: 286, width: 40, height: 20, borderRadius: "6px 6px 2px 2px", background: "#2E3644", zIndex: 9 }} />
        <div style={{ position: "absolute", left: 2326, top: 304, width: 24, height: 8, borderRadius: 3, background: key, opacity: 0.7 * lamps, zIndex: 9 }} />
        <div style={{ position: "absolute", left: 2360, top: 340, width: 200, height: 260, zIndex: 9 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 200, height: 12, background: "#3A4150" }} />
          <div style={{ position: "absolute", left: 4, top: 12, width: 8, height: 248, background: "#2A3140" }} />
          <div style={{ position: "absolute", left: 188, top: 12, width: 8, height: 248, background: "#2A3140" }} />
          {/* The bus shelter ad panel. Continuity Editor rule 14 caps the GEKKO
              lizard parody at two scenes, so after that the shelter carries an
              ordinary ad instead. The panel itself is permanent set dressing. */}
          <div style={{ position: "absolute", left: 22, top: 30, width: 150, height: 190, background: "linear-gradient(180deg,#E7E1D2,#C9C2B0)", border: "3px solid #3A4150" }}>
            {gekko > 0 ? (<>
              <div style={{ position: "absolute", left: 26, top: 66, width: 74, height: 26, borderRadius: 6, background: "#4E8A46" }} />
              <div style={{ position: "absolute", left: 92, top: 52, width: 30, height: 26, borderRadius: 5, background: "#4E8A46" }} />
              <div style={{ position: "absolute", left: 14, top: 84, width: 26, height: 12, borderRadius: 4, background: "#3E7038" }} />
              <div style={{ position: "absolute", left: 106, top: 58, width: 7, height: 7, borderRadius: "50%", background: "#151A20" }} />
              <div style={{ position: "absolute", left: 22, top: 120, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#2E3644" }}>GEKKO</div>
              <div style={{ position: "absolute", left: 22, top: 146, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, letterSpacing: "0.18em", color: "#6A7280" }}>INSURANCE</div>
            </>) : (<>
              <div style={{ position: "absolute", left: 22, top: 40, width: 106, height: 10, borderRadius: 3, background: "#8A9098" }} />
              <div style={{ position: "absolute", left: 22, top: 58, width: 76, height: 10, borderRadius: 3, background: "#A8AEB6" }} />
              <div style={{ position: "absolute", left: 26, top: 86, width: 98, height: 34, borderRadius: 5, background: "#3A4150" }} />
              <div style={{ position: "absolute", left: 22, top: 132, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#2E3644" }}>24/7 TOWING</div>
              <div style={{ position: "absolute", left: 22, top: 156, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, letterSpacing: "0.18em", color: "#6A7280" }}>CALL ANYTIME</div>
            </>)}
          </div>
        </div>

        {/* ---- DRIP BROS 24/7, the rival ---- */}
        <RivalShop lf={lf} x={2400} on={rival} tickets={rivalTickets} dying={rivalDying} blurred={1 - rivalSharp} booth={rivalBooth} mask={rivalMask} beacon={rivalBeacon} doorProp={rivalDoorProp} z={7} />
        {/* its magenta bleeding in as a rim on the right edge of everything */}
        {rival > 0.05 && <div style={{ position: "absolute", left: 2100, top: -120, width: 900, height: 900, background: `radial-gradient(ellipse at 70% 50%, ${RIVALMAG}, transparent 62%)`, opacity: 0.16 * rival, filter: "blur(60px)", mixBlendMode: "screen", zIndex: 20, pointerEvents: "none" }} />}

        {/* ---- THE FOUR CATENARY LAMPS ---- */}
        {lamps > 0.02 && LAMP_X.map((lx, i) => <LampCone key={lx} lf={lf} x={lx} i={i} y={-120} h={760} o={lamps * (1 - day * 0.9)} hue={key} z={12} />)}

        {/* ---- SCENE SPRITES, staged by the scene bodies in world coordinates ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 22 }}>{children}</div>

        {/* ---- DRIZZLE, near and far, always on unless the rain has stopped ---- */}
        {rain > 0.02 && <>
          <Drizzle lf={lf} n={150} o={rain * 0.9} par={0.6} z={19} />
          <Drizzle lf={lf} n={40} o={rain} near={1} z={40} />
        </>}

        {/* ---- THE PIGEON CHEVRON, once per scene ---- */}
        <Pigeon lf={lf} y={pigeonY} at={pigeonAt} dur={96} x0={-160} x1={WORLD_W * 0.55} z={26} />

        {/* ---- FOREGROUND SILHOUETTES at 1.6x parallax ---- */}
        {fore > 0.02 && <>
          {/* the near kerb reads as the pavement edge the camera stands on, and its
              base is ON the kerb line. It is a lip, never a slab. */}
          <ForeSil lf={lf} x={WORLD_X0} groundY={W_KERB + 16} w={WORLD_SPAN} h={30} kind="kerb" o={fore * 0.9} blur={2.5} z={44} />
          <ForeSil lf={lf} x={200} groundY={W_KERB} w={54} h={132} kind="bollard" o={fore} z={45} />
          <ForeSil lf={lf} x={1320} groundY={W_KERB} w={66} h={124} kind="hydrant" o={fore} z={45} />
          <ForeSil lf={lf} x={900} groundY={W_KERB} w={92} h={142} kind="aboard" o={fore} z={45} />
          <ForeSil lf={lf} x={2540} groundY={W_KERB} w={58} h={128} kind="bollard" o={fore} z={45} />
        </>}

        {/* ---- GLOBAL COLOUR KEYS. Screen blended washes, never coloured halos. ---- */}
        {day > 0.02 && <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP, background: "linear-gradient(180deg, rgba(198,203,209,0.62), rgba(174,180,188,0.5))", opacity: day, mixBlendMode: "luminosity", zIndex: 48, pointerEvents: "none" }} />}
        {cool > 0.02 && <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP, background: `linear-gradient(180deg, ${COLDCYAN}, #5E86A0)`, opacity: 0.3 * cool, mixBlendMode: "screen", zIndex: 48, pointerEvents: "none" }} />}
        {redWash > 0.02 && <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP, background: `radial-gradient(ellipse at 80% 50%, ${RED}, transparent 66%)`, opacity: 0.34 * redWash, mixBlendMode: "screen", zIndex: 48, pointerEvents: "none" }} />}
        {/* the cold blue fill from the drizzle, always present under the key */}
        <div style={{ position: "absolute", left: WORLD_X0, top: W_SKYTOP, width: WORLD_SPAN, height: W_DEEP - W_SKYTOP, background: `linear-gradient(180deg, ${fill}, transparent 60%)`, opacity: 0.07 * (1 - day), mixBlendMode: "screen", zIndex: 47, pointerEvents: "none" }} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE CAST
// ---------------------------------------------------------------------------

// NOBODY HOME. The canonical Mascot silhouette tinted slate, eyes NEVER visible,
// hanging door sign visor on a brass chain, shabby grey apron, the hook pole and
// the redacted tally box. Opacity 0.62 and NO shadow until he is counted.
// He never speaks, never touches a customer, never blocks a door.
export const Nobody: React.FC<{
  lf: number; x: number; y?: number; pole?: number; flip?: number; solid?: number; tally?: number;
  mask?: number; dust?: number; size?: number; count?: number; money?: string; z?: number;
  tick?: number; tilt?: number; bounce?: number; coat?: number; cap?: number; walk?: number; chalking?: number;
}> = ({
  lf, x, y = 660, pole = 0, flip = 0, solid = 0, tally = 0, mask = 0, dust = 1, size = 158,
  count = -1, money, z = 24, tick = 0, tilt = 0, bounce = 0, coat = 0, cap = 0, walk = 0, chalking = 0,
}) => {
  const op = 0.62 + solid * 0.38;
  const top = standTop(y, size);
  const u = size / 200;                                   // one Mascot svg unit in px
  const poleAng = -78 + pole * 52 + flip * 26;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z }}>
      {/* THE GREY CHALK DUST. Clings within 90px of his feet, kills warmth under it. */}
      {dust > 0.02 && <>
        <div style={{ position: "absolute", left: -90, top: size * 0.86, width: size + 180, height: 54, borderRadius: "50%", background: `radial-gradient(ellipse, ${CHALK}, transparent 68%)`, opacity: 0.3 * dust, filter: "blur(13px)", pointerEvents: "none" }} />
        {Array.from({ length: 12 }, (_, i) => {
          const s = seed(i * 3.9 + x * 0.01);
          const p = ((lf * (0.5 + s * 0.7) + s * 90) % 90) / 90;
          return <div key={i} style={{ position: "absolute", left: size / 2 - 80 + s * 160, top: size * 0.62 + p * (size * 0.34), width: 4, height: 4, borderRadius: "50%", background: CHALK, opacity: (1 - p) * 0.42 * dust }} />;
        })}
      </>}
      {/* he casts NO shadow until S7 f101 */}
      {solid > 0.02 && <CastShadow x={size / 2} y={size * 0.9} w={size * 0.78} o={0.5 * solid} />}

      <div style={{ position: "absolute", inset: 0, opacity: op, ...slateEdge(size, 0.55) }}>
        <Mascot lf={lf} size={size} tint={SLATE} wrapShades={1} nodAmp={walk ? 3.4 : 1.6} nodSpeed={walk ? 8 : 15} stern={0.4} />
        {/* the shabby grey shopkeeper's apron with an empty tool loop */}
        <div style={{ position: "absolute", left: 34 * u, top: 96 * u, width: 132 * u, height: 62 * u, background: "#6C7079", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 34 * u, top: 96 * u, width: 132 * u, height: 5 * u, background: "#7C8089" }} />
        <div style={{ position: "absolute", left: 58 * u, top: 84 * u, width: 84 * u, height: 12 * u, background: "#5D6169" }} />
        <div style={{ position: "absolute", left: 120 * u, top: 116 * u, width: 22 * u, height: 22 * u, borderRadius: 3, border: `${3 * u}px solid #565A62`, background: "transparent" }} />
        <div style={{ position: "absolute", left: 46 * u, top: 120 * u, width: 30 * u, height: 22 * u, background: "#5D6169", borderRadius: 2 }} />
        {/* THE VISOR: a flat hanging door sign worn across his face on a brass chain */}
        <div style={{ position: "absolute", left: 44 * u, top: 30 * u, width: 112 * u, height: 34 * u, transformOrigin: "50% 0%", transform: `rotate(${tilt * 9}deg)` }}>
          <div style={{ position: "absolute", left: 16 * u, top: 0, width: 2 * u, height: 30 * u, background: "#8A6A18" }} />
          <div style={{ position: "absolute", left: 94 * u, top: 0, width: 2 * u, height: 30 * u, background: "#8A6A18" }} />
        </div>
        <div style={{ position: "absolute", left: 42 * u, top: 58 * u, width: 116 * u, height: 40 * u, borderRadius: 2, background: "#23262D", border: `${3 * u}px solid #14161B`, boxShadow: "0 3px 6px rgba(0,0,0,0.55)" }}>
          <div style={{ position: "absolute", left: 14 * u, top: 12 * u, width: 30 * u, height: 10 * u, background: "#0A0C11" }} />
          <div style={{ position: "absolute", left: 62 * u, top: 12 * u, width: 30 * u, height: 10 * u, background: "#0A0C11" }} />
          <div style={{ position: "absolute", left: 14 * u, top: 6 * u, width: 46 * u, height: 4 * u, background: "rgba(240,246,255,0.42)", transform: "rotate(-4deg)" }} />
        </div>
        {/* S8: he carries the hero's coat, and wears a bellhop cap. Nobody points at it. */}
        {cap > 0 && <>
          <div style={{ position: "absolute", left: 62 * u, top: 22 * u, width: 76 * u, height: 24 * u, borderRadius: 3, background: "#8A5A3A", opacity: cap }} />
          <div style={{ position: "absolute", left: 62 * u, top: 22 * u, width: 76 * u, height: 5 * u, background: "#A0704C", opacity: cap }} />
        </>}
        {coat > 0 && <div style={{ position: "absolute", left: 8 * u, top: 86 * u, width: 46 * u, height: 78 * u, borderRadius: 4, background: "#7C4632", opacity: coat, transform: `rotate(${Math.sin(lf / 18) * 3}deg)`, transformOrigin: "50% 0%" }} />}
      </div>

      {/* THE TALLY BOX, redacted from frame 0 */}
      <div style={{ position: "absolute", left: 0, top: 0, opacity: Math.min(1, op + 0.16) }}>
        <TallyBox lf={lf} x={size * 0.2} y={size * 0.52} open={tally} count={count} money={money} s={size / 200} z={25} tick={tick} />
      </div>

      {/* THE HOOK POLE, his only action for 36 seconds */}
      {pole > 0.02 && <div style={{ position: "absolute", left: size * 0.86, top: size * 0.5, opacity: op }}>
        <HookPole lf={lf} x={0} y={-210 * (size / 200)} ang={poleAng} len={210 * (size / 200)} bounce={bounce} z={25} />
      </div>}

      {/* S9: the crude painted clay face tied over the visor. It cracks once. */}
      {mask > 0.02 && <div style={{ position: "absolute", left: 42 * u, top: 52 * u, width: 116 * u, height: 52 * u, zIndex: 30 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 56 * u, height: 52 * u, borderRadius: `${26 * u}px 0 0 ${26 * u}px`, background: "#C98A62", border: `${3 * u}px solid #8A5A3A`, transform: `translate(${-mask * 90 * u}px, ${mask * mask * 220 * u}px) rotate(${-mask * 42}deg)` }}>
          <div style={{ position: "absolute", left: 22 * u, top: 16 * u, width: 16 * u, height: 7 * u, background: "#2A1C14" }} />
          <div style={{ position: "absolute", left: 18 * u, top: 34 * u, width: 30 * u, height: 6 * u, borderRadius: 3, background: "#2A1C14" }} />
        </div>
        <div style={{ position: "absolute", left: 58 * u, top: 0, width: 56 * u, height: 52 * u, borderRadius: `0 ${26 * u}px ${26 * u}px 0`, background: "#C98A62", border: `${3 * u}px solid #8A5A3A`, transform: `translate(${mask * 90 * u}px, ${mask * mask * 220 * u}px) rotate(${mask * 42}deg)` }}>
          <div style={{ position: "absolute", left: 16 * u, top: 16 * u, width: 16 * u, height: 7 * u, background: "#2A1C14" }} />
          <div style={{ position: "absolute", left: 6 * u, top: 34 * u, width: 30 * u, height: 6 * u, borderRadius: 3, background: "#2A1C14" }} />
        </div>
      </div>}

      {/* S6: he runs out of signs and chalks a fake CLOSED on the wet pavement */}
      {chalking > 0.02 && <div style={{ position: "absolute", left: size * 0.7, top: size * 0.94, width: 150, height: 30, opacity: chalking * Math.max(0, 1 - (lf % 60) / 60), zIndex: 23 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: "0.08em", color: "rgba(228,224,212,0.6)", filter: `blur(${1 + (1 - chalking) * 5}px)`, transform: "skewX(-10deg)" }}>CLOSED</div>
      </div>}
    </div>
  );
};

// THE DOORMAN. The AI voice, wearing Claude's face, chest up through the glass.
// He never leaves the booth. He leans out 14px on a back ease when he greets.
export const Doorman: React.FC<{ lf: number; x: number; y?: number; lean?: number; talk?: number; z?: number; size?: number; cheer?: number }> =
  ({ lf, x, y = 520, lean = 0, talk = 0, z = 19, size = 104, cheer = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    return (
      <div style={{ position: "absolute", left: x - size / 2, top: top - lean * 14, width: size, height: size, zIndex: z }}>
        <Mascot lf={lf} size={size} tint={HERO} earpiece={1} capBack={0} nodAmp={2} nodSpeed={12} cheer={cheer} gaze={lean * 2} />
        {/* the bellhop pillbox cap with a small gold C */}
        <div style={{ position: "absolute", left: 56 * u, top: 18 * u, width: 88 * u, height: 26 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 18 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 40 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 22 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 16 * u * 1.6, color: GOLD, lineHeight: 1 }}>C</div>
        {/* the headset boom */}
        <div style={{ position: "absolute", left: 150 * u, top: 66 * u, width: 8 * u, height: 26 * u, borderRadius: 3, background: "#2A2E38" }} />
        <div style={{ position: "absolute", left: 116 * u, top: 88 * u, width: 40 * u, height: 5 * u, borderRadius: 3, background: "#2A2E38", transform: "rotate(14deg)" }} />
        <div style={{ position: "absolute", left: 110 * u, top: 90 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: "#3A4150" }} />
        {/* the soundwave ring pulsing from the grille when he greets */}
        {talk > 0.02 && Array.from({ length: 3 }, (_, i) => {
          const p = ((lf * 0.05 + i / 3) % 1);
          return <div key={i} style={{ position: "absolute", left: size * 0.5 - 10 - p * 60, top: size * 0.52 - p * 30, width: 20 + p * 120, height: 12 + p * 60, borderRadius: "50%", border: `2px solid ${TUNGSTEN}`, opacity: (1 - p) * 0.55 * talk, pointerEvents: "none" }} />;
        })}
      </div>
    );
  };

// THE OWNER. Ochre, hi vis, backwards cap, dungarees. Competent and busy, never
// a mark. NEVER drawn supine: the kneeling variant is cropped at the waist.
export const Owner: React.FC<{ lf: number; x: number; y?: number; kneel?: number; size?: number; z?: number; gaze?: number; stern?: number; shrug?: number; cable?: number; reach?: number; hand?: number }> =
  ({ lf, x, y = 660, kneel = 0, size = 170, z = 23, gaze = 0, stern = 0, shrug = 0, cable = 0, reach = 0, hand = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size) + kneel * size * 0.22;
    const arm = shrug * 16;
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z, transform: `translateY(${-arm * 0.3}px)` }}>
        {kneel < 0.5 && <CastShadow x={size / 2} y={size * 0.9} w={size * 0.8} o={0.42} />}
        <Mascot lf={lf} size={size} tint={OCHRE} hiVis={1} capBack={1} nodAmp={kneel > 0.5 ? 1.4 : 3} nodSpeed={11} gaze={gaze} stern={stern} cheer={shrug * 0.5} />
        {/* dungaree rects over the body, drawn after so overshoot is correct */}
        <div style={{ position: "absolute", left: 44 * u, top: 128 * u, width: 112 * u, height: 34 * u, background: "#3E5A78" }} />
        <div style={{ position: "absolute", left: 70 * u, top: 96 * u, width: 14 * u, height: 34 * u, background: "#3E5A78" }} />
        <div style={{ position: "absolute", left: 116 * u, top: 96 * u, width: 14 * u, height: 34 * u, background: "#3E5A78" }} />
        <div style={{ position: "absolute", left: 88 * u, top: 132 * u, width: 24 * u, height: 18 * u, background: "#33506C" }} />
        {/* the reaching arm, the instant it leaves the joint the spray doubles */}
        {reach > 0.02 && <div style={{ position: "absolute", left: 4 * u - reach * 30 * u, top: 92 * u + reach * 30 * u, width: 30 * u, height: 24 * u, background: OCHRE, borderRadius: 3, transform: `rotate(${-30 * reach}deg)` }} />}
        {/* the coil of cable on his shoulder (S7) */}
        {cable > 0.02 && <div style={{ position: "absolute", left: 120 * u, top: 60 * u, width: 60 * u, height: 60 * u, opacity: cable, transform: `rotate(${Math.sin(lf / 22) * 5}deg)`, transformOrigin: "30% 20%" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: i * 4 * u, top: i * 4 * u, width: (52 - i * 10) * u, height: (52 - i * 10) * u, borderRadius: "50%", border: `${6 * u}px solid #2E3644` }} />)}
        </div>}
        {/* the flat hand that lands on the booth. That is the sale. */}
        {hand > 0.02 && <div style={{ position: "absolute", left: 176 * u, top: 88 * u, width: 34 * u, height: 26 * u, borderRadius: 4, background: OCHRE, opacity: hand, transform: `translateX(${hand * 26}px)` }} />}
        {/* the cabinet lip crops him at the waist when he is kneeling */}
        {kneel > 0.5 && <div style={{ position: "absolute", left: -size * 0.5, top: size * 0.74, width: size * 2, height: size * 0.7, background: "#06090E", zIndex: 30, boxShadow: "0 -6px 18px rgba(0,0,0,0.7)" }} />}
      </div>
    );
  };

// A CUSTOMER. A call with legs: a coloured scarf, one brass coin, one emergency
// prop readable in half a second with zero text.
export type PropKind = "pipe" | "cable" | "molar" | "rad" | "main" | "none";
export const Customer: React.FC<{
  lf: number; x: number; y?: number; scarf?: number; prop?: PropKind; coin?: number; walk?: number;
  size?: number; z?: number; run?: number; freeze?: number; now?: number; read?: number;
}> = ({ lf, x, y = 660, scarf = 0, prop = "pipe", coin = 1, walk = 1, size = 104, z = 22, run = 0, freeze = 0, now = 0, read = 0 }) => {
  const u = size / 200;
  const top = standTop(y, size);
  const hue = SCARFS[Math.abs(Math.round(scarf)) % 4];
  const lean = walk * (run ? 8 : 4);
  const gait = freeze > 0.5 ? 0 : 1;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z, transform: `rotate(${lean * 0.5}deg)` }}>
      <CastShadow x={size / 2} y={size * 0.89} w={size * 0.66} o={0.36} />
      <Mascot lf={freeze > 0.5 ? 6 : lf} size={size} tint={BONE} nodAmp={gait * (run ? 5 : 3.2)} nodSpeed={run ? 5 : 7} gaze={walk < 0 ? -3 : 3} stern={read * 0.6} />
      {/* the coloured scarf so twelve of them in a row do not mush */}
      <div style={{ position: "absolute", left: 40 * u, top: 92 * u, width: 120 * u, height: 16 * u, borderRadius: 3, background: hue }} />
      <div style={{ position: "absolute", left: 118 * u, top: 104 * u, width: 22 * u, height: 34 * u, borderRadius: 2, background: hue, transform: `rotate(${8 + Math.sin(lf / 6) * 7}deg)`, transformOrigin: "50% 0%" }} />
      {/* the emergency prop in one nub */}
      {prop === "pipe" && <div style={{ position: "absolute", left: 168 * u, top: 74 * u, width: 46 * u, height: 16 * u, borderRadius: 3, background: "#4E8A46", transform: "rotate(-14deg)" }}>
        {Array.from({ length: 5 }, (_, i) => {
          const p = ((lf * 2.2 + i * 8) % 34) / 34;
          return <div key={i} style={{ position: "absolute", left: 40 * u + p * 30 * u, top: 2 * u - Math.sin(p * Math.PI) * 22 * u, width: 4 * u, height: 8 * u, borderRadius: 2, background: "rgba(170,205,235,0.8)", opacity: 1 - p }} />;
        })}
      </div>}
      {prop === "cable" && <div style={{ position: "absolute", left: 168 * u, top: 74 * u, width: 44 * u, height: 10 * u, borderRadius: 3, background: "#2E3644", transform: "rotate(-12deg)" }}>
        <Sparks lf={lf} x={44 * u} y={4 * u} on={1} color="#DFF1FF" n={7} z={24} />
      </div>}
      {prop === "molar" && <div style={{ position: "absolute", left: 170 * u, top: 66 * u, width: 32 * u, height: 38 * u, borderRadius: `${13 * u}px ${13 * u}px ${5 * u}px ${5 * u}px`, background: "#F0F5F1", border: `${2 * u}px solid #C3CDC6` }}>
        <div style={{ position: "absolute", left: 14 * u, top: 4 * u, width: 2 * u, height: 30 * u, background: RED, transform: "rotate(7deg)" }} />
      </div>}
      {prop === "rad" && <div style={{ position: "absolute", left: 168 * u, top: 70 * u, width: 36 * u, height: 30 * u, borderRadius: 4, background: "#8A6238", border: `${2 * u}px solid #5E4324` }}>
        {Array.from({ length: 4 }, (_, i) => {
          const p = ((lf * 1.1 + i * 12) % 48) / 48;
          return <div key={i} style={{ position: "absolute", left: 10 * u + Math.sin(p * 6 + i) * 10 * u, top: -p * 44 * u, width: 14 * u, height: 14 * u, borderRadius: "50%", background: "rgba(190,198,210,0.3)", opacity: (1 - p) * 0.8, filter: "blur(2px)" }} />;
        })}
      </div>}
      {prop === "main" && <>
        <div style={{ position: "absolute", left: 164 * u, top: 74 * u, width: 50 * u, height: 20 * u, borderRadius: 3, background: "#6E4A2E", transform: "rotate(-8deg)" }} />
        {Array.from({ length: 14 }, (_, i) => {
          const s = seed(i * 2.7 + 9);
          const p = ((lf * (2.4 + s * 2) + s * 40) % 40) / 40;
          return <div key={i} style={{ position: "absolute", left: 206 * u + p * 130 * u, top: 76 * u - Math.sin(p * Math.PI) * 60 * u + p * p * 90 * u, width: 6 * u, height: 14 * u, borderRadius: 3, background: "rgba(180,212,240,0.8)", opacity: (1 - p * 0.7), zIndex: 26 }} />;
        })}
      </>}
      {/* the brass coin in the other nub */}
      {coin > 0.02 && <div style={{ position: "absolute", left: 4 * u, top: 78 * u, opacity: coin }}><Coin lf={lf} x={0} y={0} r={17 * u * 2} spin={0} z={24} flat={1} /></div>}
      {/* the red NOW chip stamping beside the prop (S4 only) */}
      {now > 0.02 && <div style={{ position: "absolute", left: 168 * u, top: 34 * u, padding: "2px 8px", borderRadius: 4, background: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.08em", color: "#FBE6E9", opacity: Math.min(1, now * 2), transform: `scale(${1 + Math.max(0, 1 - now * 4) * 0.7}) rotate(-6deg)`, zIndex: 27 }}>NOW</div>}
    </div>
  );
};

// THE 12 FRAME TURNAROUND. One component, instanced 15 times, never hand authored.
// rotateY 0 to 180 on Easing.inOut(Easing.cubic), a 4px hop at t=0.5, the coin
// released from the nub at t=0.62 on a small arc, walk direction flipped at t=1.
export const TURN_FRAMES = 12;
export const Turn: React.FC<{
  t: number; lf: number; x: number; y?: number; scarf?: number; prop?: PropKind; size?: number; z?: number; drop?: number;
}> = ({ t, lf, x, y = 660, scarf = 0, prop = "pipe", size = 104, z = 22, drop = 1 }) => {
  const tc = Math.max(0, Math.min(1, t));
  const rot = Easing.inOut(Easing.cubic)(tc) * 180;
  const hop = Math.sin(Math.PI * tc) * 4;
  const dir = tc >= 1 ? -1 : 1;
  const ct = Math.max(0, (tc - 0.62) / 0.38);              // the coin, once released
  return (
    <>
      <div style={{ position: "absolute", left: x - size / 2, top: standTop(y, size) - hop, width: size, height: size, zIndex: z, transformOrigin: "50% 60%", transform: `perspective(700px) rotateY(${rot}deg)` }}>
        <Customer lf={lf} x={size / 2} y={size * FOOT} scarf={scarf} prop={prop} coin={ct > 0 ? 0 : 1} walk={dir} size={size} z={1} read={tc < 0.2 ? 1 : 0} />
      </div>
      {/* the released coin on its small arc down to the wet pavement */}
      {drop > 0 && ct > 0 && <Coin lf={lf} x={x - 10 - ct * 46} y={y - size * 0.42 + Math.sin(ct * Math.PI) * -18 + ct * ct * (size * 0.44)} r={13} roll={-ct * 3} z={23} />}
    </>
  );
};

// PIP, the apprentice cameo. Knee high, in a too big high vis vest.
// He replaces the terrier from the concept: no organic silhouettes exist here.
export const Pip: React.FC<{ lf: number; x: number; y?: number; size?: number; z?: number; look?: number; hose?: number; box?: number; tin?: number; hammer?: number; sit?: number; walk?: number }> =
  ({ lf, x, y = 655, size = 72, z = 21, look = 0, hose = 0, box = 0, tin = 0, hammer = 0, sit = 0, walk = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size) + sit * size * 0.24;
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z }}>
        <CastShadow x={size / 2} y={size * 0.88} w={size * 0.6} o={0.34} />
        <Mascot lf={lf} size={size} tint={GRIPC} hiVis={1} capBack={1} nodAmp={walk ? 4 : 2.4} nodSpeed={walk ? 6 : 9} gaze={look * 3} stern={0} />
        {/* the hose he coils, because the day always ends with calls unanswered */}
        {hose > 0.02 && <div style={{ position: "absolute", left: -size * 0.42, top: size * 0.72, width: size * 0.9, height: size * 0.34, opacity: hose }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: i * 5 * u, top: i * 4 * u, width: size * 0.8 - i * 12 * u, height: size * 0.28 - i * 8 * u, borderRadius: "50%", border: `${5 * u}px solid #2E4A38`, transform: `rotate(${lf * (0.6 + i * 0.2)}deg)` }} />)}
        </div>}
        {/* a flat pack offcut stacked into a Tetris wall, one piece that does not fit */}
        {box > 0.02 && <div style={{ position: "absolute", left: size * 0.72, top: size * 0.4, width: 40 * u * 2, height: 30 * u * 2, opacity: box }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "#9A7A50", border: "2px solid #6E5636" }} />
        </div>}
        {/* the paint tin he carries with both arms and has to put down twice */}
        {tin > 0.02 && <div style={{ position: "absolute", left: size * 0.28, top: size * 0.62, width: size * 0.44, height: size * 0.36, borderRadius: 3, background: "#B8BEC8", border: "2px solid #6E7480", opacity: tin }}>
          <div style={{ position: "absolute", left: 4, top: -6, width: size * 0.36, height: 5, borderRadius: 3, background: "#8A9098" }} />
        </div>}
        {/* the little hammer on its chain, and it swings unused all scene */}
        {hammer > 0.02 && <div style={{ position: "absolute", left: size * 0.88, top: size * 0.3, width: 30, height: 60, opacity: hammer, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 12) * 12}deg)` }}>
          <div style={{ position: "absolute", left: 13, top: 0, width: 2, height: 32, background: "#7A8290" }} />
          <div style={{ position: "absolute", left: 8, top: 30, width: 5, height: 22, background: "#6E5636" }} />
          <div style={{ position: "absolute", left: 2, top: 30, width: 18, height: 9, borderRadius: 2, background: "#8A5A44" }} />
        </div>}
      </div>
    );
  };

// ---------------------------------------------------------------------------
// RETENTION DEVICES
// ---------------------------------------------------------------------------

// THE HUD. A diegetic corner readout at panel local (760, 30). A number that
// visibly turns around is the strongest in frame retention device there is, and
// blanking it at the climax is what makes the climax land.
export const HUD: React.FC<{ lf: number; text?: string; color?: string; flash?: number; x?: number; y?: number; o?: number; z?: number }> =
  ({ lf, text, color = RED, flash = 0, x = 760, y = 30, o = 1, z = 62 }) => {
    if (!text) return null;                                  // S7 is deliberately blank
    const blink = flash > 0 ? 0.55 + 0.45 * Math.abs(Math.sin(lf / 12.5)) : 1;   // ~1.2Hz
    return (
      <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o * blink, padding: "5px 14px", borderRadius: 6, background: "rgba(10,14,22,0.66)", border: `2px solid ${color}`, fontFamily: mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color, whiteSpace: "nowrap", boxShadow: "0 6px 16px rgba(6,8,14,0.5)" }}>
        {text}
      </div>
    );
  };

// THE STATUSZIP. S8 only, the one scene with no native counter, grid or gauge.
// 372px, eased staircase spurts, glowing head spark, rolling mono readout, snaps
// to 100% with a teal check 0.5s before the cut.
export const StatusZip: React.FC<{ lf: number; x?: number; y?: number; w?: number; steps?: [number, number][]; snapAt?: number; label?: string; z?: number }> =
  ({ lf, x = 40, y = 700, w = 372, steps = [[6, 0.18], [30, 0.36], [58, 0.52], [88, 0.68], [118, 0.82]], snapAt = 150, label = "SAFE", z = 64 }) => {
    let prog = 0;
    steps.forEach(([t0, v]) => { prog = Math.max(prog, v * over(lf, t0, 6, Easing.out(Easing.cubic))); });
    prog = Math.max(prog, over(lf, snapAt, 7, Easing.out(Easing.cubic)));
    const done = prog > 0.995;
    const head = prog * w;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: w, height: 30, zIndex: z }}>
        <div style={{ position: "absolute", left: 0, top: 9, width: w, height: 12, borderRadius: 999, background: "rgba(22,30,42,0.8)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 0, top: 9, width: head, height: 12, borderRadius: 999, background: done ? grad("#63D7B4", "#2E9E7C") : grad("#BFE6F2", "#6FA8C4") }} />
        {!done && <div style={{ position: "absolute", left: head - 9, top: 5, width: 18, height: 20, borderRadius: "50%", background: "radial-gradient(circle, #F2FBFF, transparent 68%)", filter: "blur(2px)", opacity: 0.9 }} />}
        <div style={{ position: "absolute", left: w + 12, top: 4, fontFamily: mono, fontWeight: 700, fontSize: 19, color: done ? "#63D7B4" : "#BFE6F2", whiteSpace: "nowrap" }}>
          {done ? label : `${Math.round(prog * 100)}%`}
        </div>
        {done && <div style={{ position: "absolute", left: w + 74, top: 2, width: 24, height: 24, borderRadius: "50%", background: "#2E9E7C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#F2FFF9", transform: `scale(${over(lf, snapAt, 8, Easing.out(Easing.back(2.2)))})` }}>✓</div>}
      </div>
    );
  };

// THE SNACK LANE. Runs 46.69s to 51.69s at screen y 1462 to 1580, BELOW the
// captions, while S8 and S9 keep playing above. It renders OUTSIDE the panel in
// TRUE SCREEN COORDINATES, so it takes the global frame, not a local one.
const SNACK_A = fr(46.69), SNACK_B = fr(CTA_L);
export const SnackLane: React.FC<{ f: number }> = ({ f }) => {
  if (f < SNACK_A - 6 || f > SNACK_B + 26) return null;
  const p = Math.max(0, Math.min(1, (f - SNACK_A) / (SNACK_B - SNACK_A)));
  const inn = over(f, SNACK_A - 6, 8, Easing.out(Easing.cubic));
  const L0 = 92, R0 = 92, W = 1080 - L0 - R0;
  const trackW = W - 150;
  const secs = (SNACK_B - SNACK_A) / FPS;
  const left = Math.max(0, secs - (f - SNACK_A) / FPS);
  const n = Math.max(1, Math.ceil(left));
  const dial = left - Math.floor(left);
  const burst = over(f, SNACK_B, 12, Easing.out(Easing.cubic));
  const runX = trackW * p;
  return (
    <div style={{ position: "absolute", left: L0, top: 1462, width: W, height: 118, zIndex: 118, opacity: inn }}>
      {/* the kerb track */}
      <div style={{ position: "absolute", left: 0, top: 62, width: trackW, height: 16, borderRadius: 999, background: "rgba(30,38,52,0.75)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 0, top: 62, width: trackW * p, height: 16, borderRadius: 999, background: grad("#F0A26A", "#D2724E") }} />
      {/* five gold brass coin pellets, eaten one per second */}
      {[0, 1, 2, 3, 4].map((i) => {
        const px = trackW * ((i + 0.5) / 5);
        const eaten = runX >= px;
        const near = eaten ? Math.max(0, 1 - (runX - px) / 40) : 0;
        return <div key={i} style={{ position: "absolute", left: px - 13, top: 56, width: 26, height: 26, transform: `scale(${eaten ? 1 + near * 0.8 : 1})`, opacity: eaten ? Math.max(0, 1 - (runX - px) / 40) : 1 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#F2CE72", "#A87C18"), border: "3px solid #6F5410" }} />
          <div style={{ position: "absolute", left: 6, top: 5, width: 9, height: 6, borderRadius: "50%", background: "rgba(255,247,220,0.6)" }} />
        </div>;
      })}
      {/* PIP runs left to right eating one per second */}
      <div style={{ position: "absolute", left: runX - 34, top: 6 }}>
        <Mascot lf={f} size={68} tint={GRIPC} hiVis={1} capBack={1} nodAmp={4.4} nodSpeed={5.5} gaze={3} />
      </div>
      {/* the numeral dial at the finish line with a conic pie sweep */}
      <div style={{ position: "absolute", right: 0, top: 34, width: 76, height: 76 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(${n <= 1 ? GOLD : "rgba(226,236,255,0.8)"} ${dial * 360}deg, rgba(30,38,52,0.7) 0deg)` }} />
        <div style={{ position: "absolute", inset: 7, borderRadius: "50%", background: "#FBF8F1", border: `4px solid ${n <= 1 ? GOLD : "#B9C4D6"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: n <= 1 ? "#8A5A12" : INK }}>{n}</div>
        {burst > 0.02 && Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2;
          const d = burst * 56;
          return <div key={i} style={{ position: "absolute", left: 38 + Math.cos(a) * d, top: 38 + Math.sin(a) * d, width: 8, height: 8, borderRadius: "50%", background: "#F3E3A6", opacity: Math.max(0, 1 - burst * 1.2) }} />;
        })}
      </div>
    </div>
  );
};

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
// SCENE 0 - THE BELL THAT NOBODY ANSWERS.  146 frames (lf 0..145). Verb: CRASH.
// One continuous vertical journey: the street, then down into the loss, then up
// into the opportunity. OPEN f0-34 / KERB f34-48 / fall f48-64 / culvert hold
// f64-84 / rise f84-110 / ROOF f110-146.
//
// AT FRAME 0 INVENTORY (complete, dressed, MID ACTION, nothing builds in):
//   WORLD      Pipe Bros fully lit, fascia flickering, Mario overalls and the
//              green pipe elbow in the window, hanging OPEN sign swinging 1.5deg,
//              awning booking board 0/8 empty, warm pool + fascia smear rippling
//              on the wet pavement, storm drain grate glinting at the kerb.
//   ATMOS      150 far drizzle streaks + 40 near blurred streaks, four catenary
//              lamp cones swaying and flickering out of phase with dust falling
//              inside them, two sky clouds drifting, far tier cloud drifting,
//              Drip Bros magenta drip glyph pulsing and rimming the right edge,
//              a dark vehicle slab crossing the wet road, foreground kerb lip /
//              bollard / A board bobbing at blur(2.5px).
//   CAST       HERO on the Pipe Bros stoop at world (460,560), arm ALREADY
//              raised, hanging a small brass bell over the door.
//              PIP at (520,655) turning a coil of hose.
//              CUSTOMER 1 mid stride at world x 110, CUSTOMER 2 at x 178, both
//              walking right toward the door, spray and steam already running.
//              NOBODY HOME already out of the alley shadow at (315,660), opacity
//              0.62, no cast shadow, grey dust drifting, pole at rest, tally box
//              redacted and locked.
//   HUD        SceneTag PIPE BROS 6:42 PM and MISSED 13 rendered solid.
// AT FRAME 145: the till still rocking, the thermos still steaming, roof drizzle
// falling, a coin still spinning flat on the parapet, the fourth redaction plate
// still settling, the hero's knuckle mid tap, the countdown ring at 1.
// ============================================================================

const S0_BELLX = 760, S0_BELLY = 744, S0_BELLW = 320, S0_BELLH = 300;
// the board's CULVERT preset, nudged right. The old hand-rolled y:690 put the
// viewport below the pavement band entirely, so the hook held on bare backdrop.
const S0_CULVPOSE = { ...CAMS.CULVERT, x: 10 };
// The card asks for a tungsten to cold crossfade on the fall. It is graded with a
// scene local cool STEEL, not COLDCYAN: rule 7 spends #8FC4D8 in S8 and nowhere else,
// and a frame wide screen blended wash is exactly the decorative spend that ruling bans.
const S0_COOL = "#7E93A6";
const s0IO = Easing.inOut(Easing.cubic);
const s0O = Easing.out(Easing.cubic);

// the 42 brass coins the impact fountains out of the road, one seeded spec each
const S0_FOUNT = Array.from({ length: 42 }, (_, i) => {
  const a = seed(i * 3.17 + 2), b = seed(i * 5.91 + 7), c = seed(i * 2.33 + 13);
  const vy = 13 + b * 13;
  // flight time is authored (14..22f) and gravity DERIVED from it, so every coin is
  // back on the road well before the f34 roll. Solving g from vy left coins airborne
  // past f55 and the roller branch then teleported them into the gutter mid arc.
  const land = 14 + c * 8;
  return {
    vx: (a - 0.55) * 11,                       // biased right, away from Pip
    vy,
    r: 9 + c * 8,
    g: (2 * vy) / land,
    land,
    roll: c * 6,
    rest: 690 + b * 42,                        // where it settles in the gutter
    lead: Math.floor(c * 5),                   // staggered launch
  };
});
// nine of them, plus the two released customer coins, roll left into the drain
const S0_ROLLERS = [3, 7, 11, 16, 21, 26, 30, 35, 39];

// THE DRAIN MOUTH, world. Every coin in this scene ends here, so cause and effect
// have to share a frame: the coin visibly tips in, shrinks, and rings the grate.
const S0_DRAINX = 72, S0_DRAINY = 660;
// 0 at the kerb, 1 fully swallowed. Fed by every roller so they all die the same way.
const s0Swallow = (x: number) => Math.max(0, Math.min(1, (104 - x) / 30));

// THE FALL. f0 to f3 is the brace (the bell is still above frame and the world is
// reacting to its shadow), f3 to f10 is a gravity plunge. Impact stays on f10 so
// every downstream beat in the scene keeps the frame it was authored on.
const s0Fall = (f: number) => (f < 3 ? -900 : gravity(f, 3, 7, -900, 0));
// per frame fall speed, which drives the smear and the ghost offset
const s0FallV = (f: number) => s0Fall(f) - s0Fall(f - 1);

// THE RING. It never stops inside the scene: a fast decaying swing, a slow second
// mode under it, and a permanent idle so the bell is alive on frame 145.
const s0Rock = (f: number) => {
  const t = f - 10;
  if (t <= 0) return idle(f, 0.9, 44);
  return Math.sin(t / 3.2) * 13 * Math.exp(-t / 38)
    + Math.sin(t / 12.5 + 0.6) * 2.1 * Math.exp(-t / 96)
    + idle(f, 0.55, 124);
};
// the pressure wave the falling mass pushes ahead of itself, 0 at f0, 1 at contact
const s0Brace = (f: number) => Math.pow(Math.max(0, Math.min(1, f / 10)), 2);

// ---------------------------------------------------------------------------
// THE GIANT BRASS SHOP BELL. A Looney Tunes anvil beat using the topic's own
// object: it falls out of frame top, craters the wet road, fountains the coins,
// and then keeps ringing physically while no door opens.
// ---------------------------------------------------------------------------
const S0Bell: React.FC<{ lf: number }> = ({ lf }) => {
  const fall = s0Fall(lf);
  const vel = Math.max(0, s0FallV(lf));
  const t = lf - 10;
  // a real motion streak that scales with speed, not a fixed blur on a fixed window
  const smear = Math.min(9, vel / 22);
  const rock = s0Rock(lf);
  // it lands HARD: a squash on contact, a rebound overshoot, then a damped settle
  const sq = squash(lf, 10, 0.19, 3);
  // and it STRETCHES on the way down in proportion to how fast it is going
  const str = Math.min(0.2, vel / 1100);
  const bsx = sq.sx * (1 - str * 0.7), bsy = sq.sy * (1 + str);
  const W = S0_BELLW, H = S0_BELLH;
  // the clapper trails the shell by three frames and keeps swinging after it stops
  const clap = -s0Rock(lf - 3) * 2.2 + settle(lf, 12, 10, 0.2, 0.045);
  const body = (
    <div style={{ position: "absolute", left: S0_BELLX - W / 2, top: S0_BELLY - H + fall, width: W, height: H, zIndex: 27, filter: smear > 0.15 ? `blur(${smear.toFixed(2)}px)` : "none", transformOrigin: "50% 100%", transform: `rotate(${rock.toFixed(3)}deg) scale(${bsx.toFixed(4)}, ${bsy.toFixed(4)})` }}>
      {/* the yoke and the crown staple */}
      <div style={{ position: "absolute", left: W * 0.42, top: 0, width: W * 0.16, height: 26, borderRadius: 6, background: grad("#E0BC58", "#7A5A12") }} />
      <div style={{ position: "absolute", left: W * 0.3, top: 22, width: W * 0.4, height: 20, borderRadius: 8, background: grad("#C9A94A", "#6A5314") }} />
      {/* the skirt, a hard trapezoid so it stays geometric at thumbnail size */}
      <div style={{ position: "absolute", left: 0, top: 40, width: W, height: H - 78, background: grad("#D9B24E", "#7A5A12"), clipPath: "polygon(34% 0%, 66% 0%, 100% 88%, 100% 100%, 0% 100%, 0% 88%)", boxShadow: "0 18px 34px rgba(8,10,18,0.6)" }} />
      {/* the two struck bands and the cast highlight down the left shoulder */}
      <div style={{ position: "absolute", left: W * 0.16, top: H - 96, width: W * 0.68, height: 12, background: "rgba(58,42,8,0.5)" }} />
      <div style={{ position: "absolute", left: W * 0.1, top: H - 74, width: W * 0.8, height: 8, background: "rgba(58,42,8,0.42)" }} />
      <div style={{ position: "absolute", left: W * 0.3, top: 52, width: W * 0.1, height: H - 130, background: "rgba(255,246,214,0.34)", transform: "skewX(-9deg)" }} />
      {/* the lip and the clapper, swinging against the ring */}
      <div style={{ position: "absolute", left: -8, top: H - 40, width: W + 16, height: 24, borderRadius: 5, background: grad("#F0CB63", "#9A7418"), boxShadow: "0 8px 16px rgba(8,10,18,0.6)" }} />
      <div style={{ position: "absolute", left: W * 0.5 - 3, top: 70, width: 6, height: H - 128, background: "#6A5314", transformOrigin: "50% 0%", transform: `rotate(${clap.toFixed(3)}deg)` }}>
        <div style={{ position: "absolute", left: -16, top: H - 150, width: 38, height: 38, borderRadius: "50%", background: grad("#B79A46", "#4E3C0C") }} />
      </div>
      {/* THE STRUCK PRICE PLATE. The money read has to land inside the first second,
          so the number rides the biggest gold object in frame instead of waiting for
          the roof till at f110. Dark brass plate, gold cut letters, rocks with the bell. */}
      <div style={{ position: "absolute", left: W * 0.16, top: 142, width: W * 0.68, height: 56, borderRadius: 4, background: grad("#33270C", "#150F05"), border: "4px solid #B08820", boxShadow: "inset 0 2px 0 rgba(255,240,190,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + (t > 0 && t < 7 ? Math.sin((t / 7) * Math.PI) * 0.09 : 0)})` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.01em", color: "#FFD469", lineHeight: 1, whiteSpace: "nowrap" }}>$18K / MO</div>
      </div>
    </div>
  );
  return (
    <>
      {/* IT IS RINGING. Thin pale rings leave the lip on the swing extremes and keep
          coming long after the bang, so the shot says ringing, not just landed. */}
      {[10, 15, 21, 28, 37, 48, 62, 78].map((at, i) => (
        <PulseRing key={"rg" + i} t={(lf - at) / (26 + i * 4)} x={S0_BELLX} y={S0_BELLY - 96} r={300 + i * 40} hue="rgba(232,224,204,0.5)" o={0.6 * Math.exp(-i / 3.4)} z={20} />
      ))}
      {/* ghost copies stretched along the fall, so the plunge never teleports */}
      <Smear dy={vel * 0.34} ghosts={4} on={vel > 12 ? 1 : 0} o={0.34} stretch={1.3} z={26}>{body}</Smear>
    </>
  );
};

const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ---- CAMERA: one unbroken fall and rise over the world ----
  // it is a character, not a tripod: permanent handheld noise and a breathing lens,
  // a rumble that BUILDS through the brace, and a hard decaying kick on contact.
  const cam = shakeCam(lf, [{ at: 10, amp: 15, dur: 18 }], 1);
  const rumble = lf < 10 ? s0Brace(lf) * 4.2 : 0;
  const sx = cam.x + nz(lf, 2) * rumble;
  const sy = cam.y + nz(lf, 6) * rumble;
  let pose = CAMS.OPEN;
  if (lf < 34) pose = CAMS.OPEN;
  else if (lf < 48) pose = lerpCam(CAMS.OPEN, CAMS.KERB, s0IO(ramp(lf, 34, 48)));
  else if (lf < 64) pose = lerpCam(CAMS.KERB, S0_CULVPOSE, s0IO(ramp(lf, 48, 64)));
  // the hold is a slow PUSH DOWN into the heap, not a drift up. At the preset the coin
  // crest sits at 84% of the panel and the money frame was mostly empty road, so the
  // hold rides the crest up to the middle of the frame and the mass fills the bottom.
  else if (lf < 84) pose = { x: S0_CULVPOSE.x, y: S0_CULVPOSE.y + ramp(lf, 64, 84) * 150, z: S0_CULVPOSE.z + ramp(lf, 64, 84) * 0.035 };
  else if (lf < 110) pose = lerpCam({ x: S0_CULVPOSE.x, y: S0_CULVPOSE.y + 150, z: S0_CULVPOSE.z + 0.035 }, CAMS.ROOF, s0IO(ramp(lf, 84, 110)));
  else pose = { x: CAMS.ROOF.x, y: CAMS.ROOF.y + Math.sin((lf - 110) / 19) * 9, z: CAMS.ROOF.z * (1 + 0.04 * Math.sin((lf - 110) / 15 + 0.4)) };
  const camX = pose.x + sx, camY = pose.y + sy;
  const camZ = pose.z * cam.z;

  // ---- THE STREET STATE ----
  const flip = over(lf, 27, 8, s0O);                       // OPEN goes to CLOSED
  const culv = ramp(lf, 50, 60) * (1 - ramp(lf, 86, 94));  // the under street opens, then closes again
  const coinShift = interpolate(lf, [72, 76, 92], [0, 4.5, 1.6], clamp);

  // ---- THE CAST ----
  // the queue sits 50px further left than it did: NOBODY HOME now owns the door
  // plane at the flip, and two bone sprites under his elbow muddied that read.
  const c1x = interpolate(lf, [0, 11], [60, 98], { ...clamp, easing: s0O });
  const c2x = interpolate(lf, [0, 11], [128, 168], { ...clamp, easing: s0O });
  const turnT = (lf - 30) / 12;
  const exitX = (base: number) => base - Math.max(0, lf - 44) * 7.2;
  // he BRACES before the bell lands (he can see the shadow), then he is knocked
  // back on his heel and rocks out on a damped sine that never quite dead stops.
  const heroBrace = interpolate(lf, [1, 6, 10, 15], [0, 0.5, 1, 0], clamp);
  const heroRock = settle(lf, 10, 7.5, 0.13, 0.115) + idle(lf, 0.6, 118);
  // Pip's head snaps up during the brace, four frames BEFORE the impact
  const pipLook = interpolate(lf, [2, 5, 40, 46], [0, 1, 1, 0.3], clamp);
  const vTilt = interpolate(lf, [21, 24, 34], [0, 1, 0.35], clamp);
  const vPole = interpolate(lf, [23, 27, 33], [0.73, 1, 0.86], { ...clamp, easing: s0O });
  const vFlip = over(lf, 25, 4, s0O) * (1 - over(lf, 33, 8));
  const vTick = interpolate(lf, [27, 30, 40], [0, 1, 0], clamp);
  // he leans into the flip and settles back, so the AUTHOR of the sign is moving
  const vLean = interpolate(lf, [23, 27, 36], [0, 1, 0.3], clamp);
  // he closes the last of the alley walk onto the stoop, so at f0 he is clear of the
  // hero's raised arm and by the flip he owns the door plane on his own.
  const vX = interpolate(lf, [0, 24], [252, 330], { ...clamp, easing: s0IO });
  // the hero does NOT act on this beat. He drops the bell arm and turns to look.
  const heroTurn = interpolate(lf, [22, 29, 62], [0, 1, 0.72], clamp);
  // and he physically clears the door plane: steps right off the stoop down onto the
  // pavement, so on the flip frame the ONLY figure under the sign is the slate one.
  const heroStep = interpolate(lf, [21, 31], [0, 1], { ...clamp, easing: s0IO });

  // ---- ROOF ACT: three coins up the tube, the till, the four redaction plates ----
  const thunk = (at: number) => interpolate(lf, [at, at + 5], [0, 1], { ...clamp, easing: s0O });
  const tillRock = Math.max(
    interpolate(lf, [114, 117, 126], [0, 1, 0], clamp),
    interpolate(lf, [119, 122, 131], [0, 1, 0], clamp),
    interpolate(lf, [124, 127, 136], [0, 1, 0], clamp),
    interpolate(lf, [130, 133, 145], [0, 0.8, 0.28], clamp),
  );
  const heroUp = interpolate(lf, [126, 140], [230, 0], { ...clamp, easing: s0O });
  // two taps, and the SECOND one peaks at f145 so the cut lands on a knuckle mid tap
  const knuckle = lf >= 132 ? Math.max(0, Math.sin((lf - 132) * 0.62)) : 0;

  // ---- the retention countdown, last 3 seconds of the hook ----
  const into = Math.max(0, lf - 56);
  const cdN = Math.max(1, 3 - Math.floor(into / 30));
  const cdRing = Math.max(0, 1 - into / 90);

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <Street
          lf={lf}
          lit={1} board={0} booth={0} sign={[flip, 0, 0, 0]} bracket={0}
          tubes={0} tills={1} brackets={4} tillRock={tillRock} tillPill="$18K / MO"
          rain={1} lamps={1} rival={1} chalk={0}
          culvert={culv} coins={0.55} coinShift={coinShift}
          pigeonY={140} pigeonAt={4} drainGlint={1} far={1} fore={1}
          fill="#8FA9C6"
        >
          {/* ------------------------------------------------------------- */}
          {/* THE GIANT BELL, its crater, its shockwave and its coin fountain */}
          {/* ------------------------------------------------------------- */}
          {/* ------------------------------------------------------------- */}
          {/* THE BRACE, f0 to f10. The reel opens on a shadow closing fast   */}
          {/* on the road: grit rattles up off the asphalt, the puddle rings  */}
          {/* jump, and speed lines pour down the column the bell is in. The  */}
          {/* first six frames escalate so the hook is never a held picture.  */}
          {/* ------------------------------------------------------------- */}
          {lf < 15 && (() => {
            const p = s0Brace(lf);
            const out = Math.max(0, 1 - Math.max(0, lf - 10) / 4);
            const w = 84 + p * 470;
            return (
              <>
                <div style={{ position: "absolute", left: S0_BELLX - w / 2, top: S0_BELLY - w * 0.09, width: w, height: w * 0.18, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(4,6,11,0.9), rgba(4,6,11,0.3) 60%, transparent 78%)", opacity: (0.3 + p * 0.6) * out, zIndex: 11 }} />
                {/* loose road grit rattling harder every frame as the mass closes in */}
                {Array.from({ length: 15 }, (_, i) => {
                  const s = seed(i * 3.71 + 21), s2 = seed(i * 1.93 + 5);
                  const bx = S0_BELLX - 260 + s * 520;
                  const amp = 0.8 + p * 11 * (0.5 + s2);
                  const hop = Math.abs(Math.sin(lf * (0.72 + s * 0.9) + i * 1.7)) * amp;
                  return <div key={"gr" + i} style={{ position: "absolute", left: bx, top: S0_BELLY - 5 - hop, width: 4 + s * 7, height: 3 + s2 * 4, borderRadius: 2, background: "#20242E", opacity: (0.5 + p * 0.4) * out, zIndex: 14, transform: `rotate(${(lf * (7 + s * 26)) % 360}deg)` }} />;
                })}
                {/* the puddle skin jumping ahead of the mass */}
                <PulseRing t={over(lf, 3, 9)} x={S0_BELLX} y={S0_BELLY} r={230} hue="rgba(186,214,244,0.4)" o={0.5 * out} z={12} />
                <PulseRing t={over(lf, 6, 8)} x={S0_BELLX - 90} y={S0_BELLY + 8} r={170} hue="rgba(186,214,244,0.34)" o={0.42 * out} z={12} />
                <SpeedLines lf={lf} x={S0_BELLX - 240} y={-60} w={480} h={480} dir={90} n={13} on={interpolate(lf, [1, 5, 10, 13], [0, 0.85, 0.85, 0], clamp)} hue="rgba(214,226,244,0.45)" z={19} sd={4} />
              </>
            );
          })()}

          {lf >= 10 && (
            <>
              {/* THE WEIGHT. Ground rings, dust, thrown debris and sparks, all
                  staggered and all decaying, so the landing disturbs the world
                  instead of just stopping in it. */}
              <Impact lf={lf} at={10} x={S0_BELLX} y={S0_BELLY} strength={1.8} debris={13} sparks={12} z={30} sd={2} />
              <Dust lf={lf} at={12} x={S0_BELLX - 170} y={S0_BELLY} n={11} life={98} spread={230} sd={7} z={29} />
              <Dust lf={lf} at={15} x={S0_BELLX + 180} y={S0_BELLY} n={11} life={110} spread={250} sd={13} z={29} />
              {/* the crater ring punched into the wet asphalt */}
              <div style={{ position: "absolute", left: S0_BELLX - 210, top: S0_BELLY - 26, width: 420, height: 60, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,9,14,0.8), transparent 70%)", zIndex: 12, opacity: 0.35 + over(lf, 10, 5, s0O) * 0.65 }} />
              {/* the water shockwave travelling outward across the road */}
              {[0, 1, 2].map((k) => {
                const a = over(lf, 10 + k * 4, 26, s0O);
                if (a <= 0 || a >= 1) return null;
                const rr = 60 + a * 660;
                return <div key={"sw" + k} style={{ position: "absolute", left: S0_BELLX - rr, top: S0_BELLY - rr * 0.2, width: rr * 2, height: rr * 0.4, borderRadius: "50%", border: `${Math.max(2, 9 * (1 - a))}px solid rgba(186,214,244,0.55)`, opacity: (1 - a) * 0.7, filter: "blur(2px)", zIndex: 13 }} />;
              })}
              {/* 42 brass coins fountained straight up on eased gravity, then settling */}
              {S0_FOUNT.map((c, i) => {
                const t = lf - 10 - c.lead;
                if (t < 0) return null;
                const land = c.land;
                const air = Math.min(t, land);
                const yy = S0_BELLY - (c.vy * air - 0.5 * c.g * air * air);
                const settled = Math.max(0, t - land);
                const bounce = settled < 14 ? Math.abs(Math.sin(settled / 2.6)) * 16 * Math.exp(-settled / 5) : 0;
                const restY = S0_BELLY - Math.min(settled / 12, 1) * (S0_BELLY - c.rest);
                const roller = S0_ROLLERS.indexOf(i);
                let x = S0_BELLX + c.vx * Math.min(t, land + 10);
                let y = (t < land ? yy : restY - bounce);
                let o = 1, sw = 0;
                // never start a coin rolling before it has physically landed
                const rollAt = Math.max(34 + roller * 1.6, 10 + c.lead + land + 2);
                if (roller >= 0 && lf > rollAt) {
                  const rt = lf - rollAt;
                  x = Math.max(-40, S0_BELLX + c.vx * (land + 10) - rt * 15.5);
                  y = c.rest + (671 - c.rest) * Math.min(1, rt / 22);
                  // it TIPS INTO THE MOUTH: it accelerates down, shrinks and is gone,
                  // so the coin and the hole it falls through share a frame.
                  sw = s0Swallow(x);
                  if (sw > 0) { y = S0_DRAINY + sw * sw * 84; o = Math.max(0, 1 - sw * 1.12); }
                }
                if (o <= 0.02) return null;
                return <Coin key={"fc" + i} lf={lf} x={x} y={y} r={c.r * (1 - sw * 0.5)} roll={c.roll - (t * 0.22) - sw * 3} o={o} z={21} />;
              })}
              {/* THE GRATE SWALLOWING. One pale ring and one dark gulp per coin that
                  goes in, staggered, so the drain visibly eats and is not just a
                  place where sprites stop existing. */}
              {lf > 33 && lf < 68 && Array.from({ length: 12 }, (_, i) => {
                const at = 35 + i * 2.2 + nz(i, 3) * 0.8;
                const gt = (lf - at) / 13;
                if (gt <= 0 || gt >= 1) return null;
                return (
                  <React.Fragment key={"pk" + i}>
                    <PulseRing t={gt} x={S0_DRAINX} y={S0_DRAINY} r={64 + i * 3} hue="rgba(226,220,204,0.6)" o={0.7} z={24} />
                    <div style={{ position: "absolute", left: S0_DRAINX - 26, top: S0_DRAINY - 7, width: 52, height: 14, borderRadius: "50%", background: "#04060B", opacity: (1 - gt) * 0.8, zIndex: 23 }} />
                  </React.Fragment>
                );
              })}
              <S0Bell lf={lf} />
            </>
          )}
          {lf < 10 && <S0Bell lf={lf} />}

          {/* ------------------------------------------------------------- */}
          {/* THE TWO CUSTOMERS: walk in, stop dead, read CLOSED, turn, leave */}
          {/* ------------------------------------------------------------- */}
          {lf < 11 && <>
            <Customer lf={lf} x={c1x} y={660} scarf={0} prop="pipe" walk={1} size={104} z={22} />
            <Customer lf={lf} x={c2x} y={660} scarf={2} prop="main" walk={1} size={104} z={22} />
          </>}
          {lf >= 11 && lf < 30 && <>
            <Customer lf={lf} x={98} y={660} scarf={0} prop="pipe" walk={1} freeze={1} size={104} z={22} read={lf > 24 ? 1 : 0} />
            <Customer lf={lf} x={168} y={660} scarf={2} prop="main" walk={1} freeze={1} size={104} z={22} read={lf > 24 ? 1 : 0} />
          </>}
          {lf >= 30 && lf < 44 && <>
            <Turn t={turnT} lf={lf} x={98} y={660} scarf={0} prop="pipe" size={104} z={22} />
            <Turn t={(lf - 32) / 12} lf={lf} x={168} y={660} scarf={2} prop="main" size={104} z={22} />
          </>}
          {lf >= 44 && <>
            <div style={{ position: "absolute", left: 0, top: 0, transform: "scaleX(-1)", transformOrigin: `${exitX(98)}px 0px`, zIndex: 22 }}>
              <Customer lf={lf} x={exitX(98)} y={660} scarf={0} prop="pipe" coin={0} walk={1} size={104} z={22} />
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, transform: "scaleX(-1)", transformOrigin: `${exitX(168)}px 0px`, zIndex: 22 }}>
              <Customer lf={lf} x={exitX(168)} y={660} scarf={2} prop="main" coin={0} walk={1} size={104} z={22} />
            </div>
          </>}

          {/* the two coins the turnaround releases, dropped where the customer stood
              and rolling the whole way to the grate so the audience follows the money
              from the person who walked away to the hole it disappears down. */}
          {lf >= 34 && [{ at: 34, x0: 172, r: 15 }, { at: 38, x0: 244, r: 13 }].map((c, k) => {
            const rt = lf - c.at;
            if (rt < 0) return null;
            const x = c.x0 - rt * 8.6;
            const sw = s0Swallow(x);
            const o = Math.max(0, 1 - sw * 1.12);
            if (o <= 0.02) return null;
            // it wobbles flat for two frames before it rolls, then tips into the mouth
            const y = sw > 0 ? S0_DRAINY + sw * sw * 84 : 668 - Math.abs(Math.sin(rt * 0.9)) * 3;
            return <Coin key={"rc" + k} lf={lf} x={x} y={y} r={c.r * (1 - sw * 0.5)} roll={-rt * 0.3 - sw * 3} o={o} z={23} />;
          })}

          {/* ------------------------------------------------------------- */}
          {/* UNDER THE STREET. The hold is not a still: a shaft of street light */}
          {/* comes down through the grate we just fell through and three more    */}
          {/* coins arrive down it and land in the heap, so the money frame       */}
          {/* states the causal link out loud: it fell through THAT hole.         */}
          {/* ------------------------------------------------------------- */}
          {culv > 0.04 && (() => {
            const surf = 904 + coinShift;
            return (
              <>
                <div style={{ position: "absolute", left: S0_DRAINX - 46, top: 674, width: 330, height: surf - 674, zIndex: 6, opacity: 0.19 * culv, background: "linear-gradient(180deg, rgba(226,236,255,0.55), transparent 84%)", clipPath: "polygon(2% 0%, 26% 0%, 100% 100%, 46% 100%)", filter: "blur(7px)" }} />
                {[63, 70, 78].map((at, i) => {
                  const lx = 188 + i * 92 + nz(i, 4) * 20;
                  const flight = 15 + i;
                  const t = (lf - at) / flight;
                  if (t > 0 && t < 1) {
                    return <Coin key={"cv" + i} lf={lf} x={arcX(lf, at, flight, S0_DRAINX + 26, lx)} y={arcY(lf, at, flight, 664, 26, surf - 8)} r={16 + i * 2} roll={lf * 0.16} z={9} />;
                  }
                  return (
                    <React.Fragment key={"cv" + i}>
                      <PulseRing t={(lf - at - flight) / 20} x={lx} y={surf - 4} r={170} hue="rgba(255,236,184,0.5)" o={0.55} z={9} />
                      <Dust lf={lf} at={at + flight} x={lx} y={surf - 6} n={7} life={72} spread={130} hue="rgba(198,180,134,0.42)" sd={i * 3 + 1} z={8} />
                    </React.Fragment>
                  );
                })}
              </>
            );
          })()}

          {/* ------------------------------------------------------------- */}
          {/* NOBODY HOME. Opacity 0.62, no shadow, dust pooling. One flip.    */}
          {/* ------------------------------------------------------------- */}
          {/* He is bigger than he was (168, near hero scale) and his x is pulled back so
              the pole anchor lands in the same place, which keeps the hook tip and the
              hanging sign inside ONE read. He leans into the flip and settles back, so
              the author of the sign is the thing that is moving on that beat. */}
          <div style={{ position: "absolute", left: 0, top: 0, zIndex: 26, transformOrigin: "330px 596px", transform: `translate(${vLean * 9}px, ${-vLean * 4}px) rotate(${vLean * 1.4}deg)` }}>
            <Nobody lf={lf} x={vX} y={560} size={168} pole={vPole} flip={vFlip} tilt={vTilt} tick={vTick} dust={1} solid={0} tally={0} count={-1} z={26} />
          </div>

          {/* ------------------------------------------------------------- */}
          {/* PIP, coiling a hose because the day always ends this way        */}
          {/* ------------------------------------------------------------- */}
          <Pip lf={lf} x={520} y={655} size={72} hose={1} look={pipLook} z={24} />

          {/* ------------------------------------------------------------- */}
          {/* THE HERO on the stoop, arm already raised, hanging a brass bell  */}
          {/* ------------------------------------------------------------- */}
          {lf < 108 && (
            <div style={{ position: "absolute", left: 460 - 85, top: standTop(560, 170), width: 170, height: 170, zIndex: 25, transformOrigin: "50% 100%", transform: `translate(${heroStep * 84 + heroRock * 1.6 - heroBrace * 5}px, ${heroStep * 38 + heroBrace * 7}px) rotate(${heroRock * 0.5 - heroTurn * 4 - heroBrace * 3}deg) scaleY(${(1 - heroBrace * 0.035).toFixed(4)})` }}>
              <CastShadow x={85} y={154} w={132} o={0.44} />
              {/* he turns his head BACK toward the door he just left, reacting not acting */}
              <Mascot lf={lf} size={170} tint={HERO} nodAmp={2.4} nodSpeed={9} stern={0.5} gaze={-2 - heroTurn * 8} />
              {/* the doorman greatcoat: deep clay, gold piping, epaulettes, brass buttons */}
              <div style={{ position: "absolute", left: 32, top: 82, width: 106, height: 66, borderRadius: 3, background: "#9A4029" }} />
              <div style={{ position: "absolute", left: 32, top: 82, width: 106, height: 4, background: GOLD, opacity: 0.8 }} />
              <div style={{ position: "absolute", left: 82, top: 84, width: 4, height: 62, background: GOLD, opacity: 0.7 }} />
              {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 92, top: 92 + i * 18, width: 8, height: 8, borderRadius: "50%", background: GOLD }} />)}
              <div style={{ position: "absolute", left: 28, top: 78, width: 24, height: 9, borderRadius: 2, background: GOLD, opacity: 0.85 }} />
              <div style={{ position: "absolute", left: 118, top: 78, width: 24, height: 9, borderRadius: 2, background: GOLD, opacity: 0.85 }} />
              {/* the bellhop pillbox cap with a small gold C */}
              <div style={{ position: "absolute", left: 48, top: 12, width: 74, height: 22, borderRadius: 3, background: "#8E3F2A" }} />
              <div style={{ position: "absolute", left: 48, top: 31, width: 74, height: 4, background: GOLD, opacity: 0.85 }} />
              <div style={{ position: "absolute", left: 78, top: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: GOLD, lineHeight: 1 }}>C</div>
              {/* the raised arm reaching up and LEFT, hanging a small brass bell.
                  At the flip it swings all the way DOWN to his side, so his hand is
                  nowhere near the sign on the frame the sign changes. */}
              <div style={{ position: "absolute", left: -34 + heroTurn * 60, top: 24 + heroTurn * 10, width: 66, height: 74, transformOrigin: "100% 100%", transform: `rotate(${-4 + Math.sin(lf / 21) * 3 * (1 - heroTurn) - heroTurn * 88 + heroRock * 1.3 + heroBrace * 6}deg)` }}>
                <div style={{ position: "absolute", left: 30, top: 40, width: 30, height: 22, borderRadius: 5, background: HERO, transform: "rotate(-38deg)" }} />
                <div style={{ position: "absolute", left: 12, top: 14, width: 28, height: 24, borderRadius: 5, background: HERO }} />
                {/* the little brass bell on its bracket. It is hung and let go on the
                    turn, so no gold object of his is left floating near the sign. */}
                <div style={{ position: "absolute", left: 4, top: 0, width: 40, height: 6, borderRadius: 3, background: grad("#D8B24E", "#8A6A18"), opacity: 1 - heroTurn }} />
                <div style={{ position: "absolute", left: 12, top: 4, width: 24, height: 20, background: grad("#E0BC58", "#7A5A12"), clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)", opacity: 1 - heroTurn, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 9) * 5}deg)` }} />
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* THE ROOF ACT: the tube stub, the arriving coins, the plates      */}
          {/* ------------------------------------------------------------- */}
          {lf > 100 && <>
            {/* a brass tube stub coming up through the parapet deck into the till */}
            <div style={{ position: "absolute", left: 494, top: -190, width: 26, height: 110, zIndex: 15 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: grad("#D5AE44", "#6E5210"), boxShadow: "0 5px 12px rgba(6,8,14,0.55)" }} />
              <div style={{ position: "absolute", left: 5, top: 0, width: 5, height: 110, background: "rgba(255,244,208,0.3)" }} />
              <div style={{ position: "absolute", left: -4, top: 34, width: 34, height: 9, borderRadius: 2, background: "#E0BA55" }} />
              <div style={{ position: "absolute", left: -4, top: 78, width: 34, height: 9, borderRadius: 2, background: "#E0BA55" }} />
              {[114, 119, 124].map((at) => {
                const p = thunk(at - 8);
                if (p <= 0 || p >= 1) return null;
                return <div key={at} style={{ position: "absolute", left: -2, top: (1 - p) * 84, width: 30, height: 28, borderRadius: 6, background: "radial-gradient(ellipse, rgba(255,232,160,0.95), transparent 70%)", filter: "blur(3px)" }} />;
              })}
            </div>
            {/* each coin pops out of the tube head and drops into the till slot */}
            {[114, 119, 124].map((at) => {
              const p = thunk(at);
              if (p <= 0 || p >= 1) return null;
              return <Coin key={"tc" + at} lf={lf} x={507 - p * 4} y={-200 - Math.sin(p * Math.PI) * 40 + p * 62} r={14} roll={p * 3} z={26} />;
            })}
            {/* one coin never made it in: it spins flat on the parapet all the way to the cut */}
            <Coin lf={lf} x={352 + Math.sin(lf / 26) * 3} y={-186} r={13} spin={0.5} roll={lf * 0.05} z={19} />
            {/* THE FOUR REDACTED TRADE PLATES racking in along the parapet */}
            {[0, 1, 2, 3].map((i) => {
              const at = 116 + i * 4;
              const a = over(lf, at, 11, s0O);
              if (a <= 0.01) return null;
              const settle = interpolate(lf, [at, at + 7, at + 19], [16, -3, 0], clamp);
              return (
                <div key={"pl" + i} style={{ position: "absolute", left: 450 + i * 140, top: -330 + settle, width: 112, height: 42, zIndex: 20, opacity: a, filter: `blur(${(1 - a) * 5}px)` }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: grad("#B99A38", "#6C5310"), border: "2px solid #4E3C0C", boxShadow: "0 6px 14px rgba(6,8,14,0.6)" }} />
                  <div style={{ position: "absolute", left: 8, top: 8 }}><Redaction open={0} w={94} h={26} lock={1} /></div>
                </div>
              );
            })}
            {/* the hero climbs in on a step ladder and taps the till lid twice */}
            {/* the parapet lip CLIPS him, so he genuinely rises from behind it */}
            {lf >= 122 && (
              <div style={{ position: "absolute", left: 300, top: -470, width: 760, height: 294, overflow: "hidden", zIndex: 25 }}>
              <div style={{ position: "absolute", left: 275, top: standTop(-180, 170) + 470 + heroUp, width: 170, height: 170 }}>
                <CastShadow x={85} y={154} w={128} o={0.4} />
                <Mascot lf={lf} size={170} tint={HERO} nodAmp={2.6} nodSpeed={9} stern={0.4} gaze={-3} />
                <div style={{ position: "absolute", left: 32, top: 82, width: 106, height: 66, borderRadius: 3, background: "#9A4029" }} />
                <div style={{ position: "absolute", left: 32, top: 82, width: 106, height: 4, background: GOLD, opacity: 0.8 }} />
                {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 92, top: 92 + i * 18, width: 8, height: 8, borderRadius: "50%", background: GOLD }} />)}
                <div style={{ position: "absolute", left: 48, top: 12, width: 74, height: 22, borderRadius: 3, background: "#8E3F2A" }} />
                <div style={{ position: "absolute", left: 48, top: 31, width: 74, height: 4, background: GOLD, opacity: 0.85 }} />
                {/* the knuckle that taps the lid, reaching left toward the till */}
                <div style={{ position: "absolute", left: -30 - knuckle * 12, top: 86, width: 44, height: 22, borderRadius: 5, background: HERO, transform: `rotate(${-6 - knuckle * 8}deg)` }} />
              </div>
              </div>
            )}
          </>}
        </Street>
      </Cam>

      {/* ================= PANEL SPACE FOREGROUND AND HUD ================= */}

      {/* three brass coins tumbling PAST the lens at foreground scale.
          Lanes sit RIGHT of the hero (screen x ~355..580 through f11 to f40) so a
          200px blurred coin never wipes across his face, and inside x 900 so they
          stay clear of the like/comment/share column. */}
      {/* they start at f14, four frames AFTER the landing, so nothing large and
          blurred crosses the one frame the impact has to be read on. */}
      {lf >= 14 && lf < 44 && [0, 1, 2].map((k) => {
        const t = lf - 14 - k * 5;
        if (t < 0 || t > 26) return null;
        const p = t / 26;
        return (
          <div key={"fg" + k} style={{ position: "absolute", left: 600 + k * 90 - p * 70, top: -120 + p * p * 1180, width: 92 + k * 20, height: 92 + k * 20, zIndex: 70, filter: `blur(${2 + k * 1.4}px)`, opacity: 0.9, transform: `rotate(${t * (13 + k * 5)}deg) scaleX(${Math.abs(Math.cos(t * 0.22))})` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#F2CE72", "#A87C18"), border: "9px solid #6F5410" }} />
            <div style={{ position: "absolute", left: "22%", top: "20%", width: "38%", height: "22%", borderRadius: "50%", background: "rgba(255,247,220,0.5)" }} />
          </div>
        );
      })}

      {/* THE FALL: the grate bars whip up past the lens at 3.4x with motion blur */}
      {lf >= 47 && lf < 68 && (() => {
        const a = ramp(lf, 47, 66);
        const sc = 1 + a * 2.4;
        return (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 72, pointerEvents: "none", opacity: Math.max(0, 1 - Math.max(0, (a - 0.72) / 0.28)), filter: "blur(3px)", transformOrigin: "50% 62%", transform: `scale(${sc}) translateY(${-a * 620}px)` }}>
            <div style={{ position: "absolute", left: 150, top: 380, width: 712, height: 96, background: "#0A0E16", borderRadius: 4 }} />
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 168 + i * 100, top: 384, width: 46, height: 88, background: "#1B212B", borderTop: "3px solid rgba(190,205,230,0.24)" }} />
            ))}
            <div style={{ position: "absolute", left: 142, top: 370, width: 728, height: 14, background: "#2B313C", borderRadius: 3 }} />
          </div>
        );
      })()}

      {/* the warm tungsten key crossfading to a cold steel key and back */}
      {(() => {
        const cold = ramp(lf, 48, 56) * (1 - ramp(lf, 88, 100));
        if (cold <= 0.02) return null;
        return <div style={{ position: "absolute", left: -80, top: -80, width: 1172, height: 952, zIndex: 66, pointerEvents: "none", background: `radial-gradient(ellipse at 32% 22%, ${S0_COOL}, transparent 68%)`, opacity: 0.34 * cold, mixBlendMode: "screen", filter: "blur(30px)" }} />;
      })()}
      {(() => {
        const warm = ramp(lf, 96, 110);
        if (warm <= 0.02) return null;
        return <div style={{ position: "absolute", left: -80, top: -80, width: 1172, height: 952, zIndex: 66, pointerEvents: "none", background: `radial-gradient(ellipse at 48% 70%, ${TUNGSTEN}, transparent 66%)`, opacity: 0.24 * warm, mixBlendMode: "screen", filter: "blur(34px)" }} />;
      })()}

      {/* THE RISE: wet brick and mortar streaking past, one bracket flashing by */}
      {lf >= 84 && lf < 112 && (() => {
        const a = ramp(lf, 84, 110);
        return (
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 68, pointerEvents: "none", opacity: Math.min(1, (1 - a) * 2.4) * 0.8 }}>
            {Array.from({ length: 16 }, (_, i) => {
              const s = seed(i * 4.9 + 3);
              const yy = ((s * 1000 + a * 2600) % 1200) - 200;
              return <div key={i} style={{ position: "absolute", left: 30 + s * 940, top: 792 - yy, width: 4 + s * 7, height: 130 + s * 190, background: "linear-gradient(180deg, rgba(158,178,208,0.30), transparent)", filter: "blur(2.5px)" }} />;
            })}
            {lf >= 94 && lf < 104 && (
              <div style={{ position: "absolute", left: 210, top: 900 - (lf - 94) * 118, width: 128, height: 26, zIndex: 3, filter: "blur(2px)", opacity: 0.9 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "#39414F", border: "3px solid #4C5666" }} />
                <div style={{ position: "absolute", left: 12, top: 7, width: 22, height: 12, borderRadius: 2, background: "#12161E" }} />
              </div>
            )}
          </div>
        );
      })()}

      {/* six frames of near black as the culvert lands, then it opens up cold */}
      {(() => {
        // it has to be CLEAR before the culvert hold at f64, or the scrim eats the coin
        // mass on the one frame the hook is actually selling.
        const dip = interpolate(lf, [58, 61, 66], [0, 0.55, 0], clamp);
        if (dip <= 0.01) return null;
        return <div style={{ position: "absolute", inset: 0, background: "#04060B", opacity: dip, zIndex: 74, pointerEvents: "none" }} />;
      })()}

      <Vig o={0.3} />

      {/* diegetic labels. SceneTag's own intro is over(f,4,12), so it is fed lf+16:
          at lf 0 that is a settled opacity 1 and zero offset, not a half built tag. */}
      <SceneTag f={lf + 16} text="PIPE BROS · 6:42 PM" color={TUNGSTEN} x={40} y={214} />
      <HUD lf={lf} text="MISSED 13" color={RED} x={760} y={30} />

      {/* the compact countdown capsule, in the panel's clear top band */}
      <div style={{ position: "absolute", left: 404, top: 22, width: 128, height: 46, zIndex: 62, display: "flex", alignItems: "center", gap: 10, padding: "5px 12px", borderRadius: 999, background: "rgba(10,14,22,0.66)", border: "2px solid rgba(226,236,255,0.28)", boxShadow: "0 6px 16px rgba(6,8,14,0.5)" }}>
        <svg width={30} height={30} viewBox="0 0 30 30">
          <circle cx={15} cy={15} r={12} fill="none" stroke="rgba(226,236,255,0.2)" strokeWidth={4} />
          <circle cx={15} cy={15} r={12} fill="none" stroke={GOLD} strokeWidth={4} strokeLinecap="round" strokeDasharray={`${cdRing * 75.4} 75.4`} transform="rotate(-90 15 15)" />
        </svg>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, color: "#F1E7D2" }}>{cdN}</div>
      </div>
    </AbsoluteFill>
  );
};

// ==== part: 11_S1.tsx ====

// ============================================================================
// SCENE 1 - TWELVE TURNAROUNDS.  155 frames, lf 0..154.  verb: TURN.
// Starts 4.88s. Camera: KERB track, whip right to RIVAL, whip back to a TWO
// width pose on our row. The villain does nothing new for the whole scene and
// that is the horror. Twelve customers walk up, read CLOSED, turn, and pay the
// storm drain instead of the shop.
//
// AT FRAME 0 INVENTORY (complete, dressed, MID ACTION, nothing builds in):
//   * camera already tracking left at walking pace from CAMS.KERB
//   * customer 0 is ALREADY 3 frames into his 12 frame turnaround at the door,
//     hopping, rotated 11 degrees, sign read, coin still in the nub
//   * the other eleven customers are strung down the street from world x 362 to
//     x -4, all walking right, walk cycles out of phase, each spraying pipe
//     already throwing its water arc. Every one of the twelve turns inside the
//     shop face band (world x 76..356) so the CLOSED read is always on screen.
//   * NOBODY HOME stands on the kerb at world (190, 668), pole in hand, grey
//     dust already pooling and drifting, tally box redacted and ticking
//   * three chalk strokes already on Pipe Bros brick, chalk dust already falling
//   * Pipe Bros lit, sign already CLOSED, awning board 0/8, warm pool on the
//     wet pavement, reflections rippling
//   * the hero stands at world (470, 660), back half turned, watching, hands
//     empty. He never intervenes in this scene.
//   * Pip on the stoop at (290, 560) mid hose coil
//   * bench with a fat yellow directory book under one leg at world 170
//   * drizzle at two parallax speeds, four catenary lamp cones out of phase,
//     sky clouds drifting, road puddles rippling, passing vehicle crossing,
//     Sparks arcade cabinet cycling, magenta bleeding in from frame right
//   * SceneTag THE ROW and HUD MISSED 12 both solid, no fade
// AT FRAME 154: last coin rattling on the grate lip, egg timer swinging, chalk
// dust falling, drizzle, camera still drifting, queue tail still walking away.
// ============================================================================

const s1c01 = (v: number) => Math.max(0, Math.min(1, v));
const s1Ease = Easing.inOut(Easing.cubic);

// the twelve turnaround start frames. Singles, then two at once, then three.
const S1_T = [-3, 10, 16, 22, 26, 30, 34, 34, 38, 42, 42, 42];
const S1_VIN = 1.9, S1_VOUT = 2.2;
// WHERE each one turns. Six ranks 56 world px apart across the shop face, cycled
// i%6, so no two customers ever occupy the same rank at the same time AND every
// turnaround lands inside world x 76..356, on screen, under the CLOSED sign.
// ⛔ never let a turn spot drift left of the drain: the whole read is "he got to
// the door and the door said no".
// Each one walks BACKWARDS from its turn spot, so lf 0 positions fall out of the
// rhythm instead of being hand placed: x(lf) = XT - (T - lf) * VIN. That strings
// them from world 362 down to -4 at frame 0, walk cycles already out of phase.
const S1_XT = S1_T.map((_, i) => 356 - (i % 6) * 56);
// the frame each released coin reaches the storm drain lip. The last one is
// deliberately still rolling when the scene cuts.
const S1_D = [35, 49, 52, 55, 56, 57, 58, 61, 70, 80, 88, 148];
const S1_DRAINX = 72;                                     // world x of the grate throat
const S1_PROPS: PropKind[] = ["pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe", "pipe"];
// LOCAL CAMERA POSES. KERB and RIVAL are re-anchored for THIS scene only: the
// shared presets park the CLOSED sign (world y 396..440) and Drip Bros' awning
// board (world y 308..334) above panel local y 210, where the panel clips.
const S1_KERB: CamPose = { x: CAMS.KERB.x, y: CAMS.KERB.y - 88, z: CAMS.KERB.z };
const S1_RIVAL: CamPose = camFor(2210, 470, 1.05, 0.63);  // board lands at y ~340
// THE TWO BOARD COMPARISON. Our board sits at world x 170..600 and theirs at
// 2540..2874, so a single wide pose that holds both would need z 0.35, far wider
// than TWO and flatly illegal under the Continuity Editor's ROW ruling, and the
// slots would be 17px wide. The comparison is therefore staged as TWO CAMERAS in
// one frame: two clipped bands, each its own tight pose on one board, both live.
const S1_SPL = 124, S1_SPD = 14;                          // the split opens f124..f138
const S1_BH = 258, S1_TOPY = 214, S1_GUT = 26;            // band height, top band y, gutter
const S1_BOTY = S1_TOPY + S1_BH + S1_GUT;                 // 498, bottom band ends at 756
const S1_ANCH = (S1_BH / 2) / 792;                        // world y 322 lands mid band
const S1_BOARDY = 322;                                    // both fascia boards, one line

// ---------------------------------------------------------------- POLISH RIG
// exit speed varies per person, so twelve turnarounds never read as one machine.
const s1VoutI = (i: number) => vary(i, S1_VOUT, 0.24);
// THREE DEPTH RANKS. Nearer means lower on screen and bigger. Twelve bone
// coloured sprites on one flat line was a mush; on three ranks it is a queue.
const s1Dep = (i: number) => (i * 5 + 2) % 3;
const s1BaseY = (i: number) => 660 + (s1Dep(i) - 1) * 13;
const s1BaseSz = (i: number) => 96 + s1Dep(i) * 8;
// THE PROMOTION. The acting customer is walked to the front rank over the 8
// frames BEFORE he turns and released over the 10 after, so on the frame of the
// turn he is the nearest, largest and brightest figure and nothing competes.
const s1Pro = (lf: number, T: number) =>
  s1c01((lf - (T - 8)) / 8) * (1 - s1c01((lf - (T + 12)) / 10));
// THE WEIGHT SHIFT. He slows, rocks back about 8px, then commits. No turn ever
// starts from rest.
const s1Hitch = (lf: number, T: number) => -8 * Math.sin(s1c01((lf - (T - 8)) / 8) * Math.PI);
// the eight rival tickets, staggered and varied, all landed as the split opens.
const S1_TKF = Array.from({ length: 8 }, (_, i) => 106 + Math.round(i * 1.9 + nz(i, 7) * 1.3));
// every coin that reaches the grate kicks the camera. The whip kicks it harder.
const S1_HITS = S1_D.map((d, i) => ({ at: d, amp: vary(i, 1.2, 0.3), dur: 10 }))
  .concat([{ at: 96, amp: 3.4, dur: 15 }, { at: S1_SPL, amp: 2.4, dur: 12 }]);

// THE HERO as the doorman: canonical Mascot plus a brass buttoned greatcoat and
// a bellhop pillbox cap. Eyes visible, as they are in every frame of the reel.
const S1_Hero: React.FC<{ lf: number; x: number; y?: number; size?: number; z?: number; look?: number }> =
  ({ lf, x, y = 660, size = 170, z = 27, look = 0 }) => {
    const u = size / 200;
    const s1hSway = (g: number) => Math.sin(g / 41) * 2.2;
    const shift = s1hSway(lf);                             // weight shift, never still
    // the coat is cloth: it LAGS the body by 4 frames and keeps swinging after it.
    const coat = (lag(lf, 4, s1hSway) - shift) * 1.9 + idle(lf, 0.8, 132, 1.3);
    // he breathes, and he turns his head toward whichever turnaround is live.
    const br = breathe(lf, 0.009, 96);
    return (
      // dimmed one notch so the doorman never out shouts the customer who is
      // actually acting. He is present, watching, and deliberately subordinate.
      <div style={{ position: "absolute", left: x - size / 2, top: standTop(y, size) + shift + drift(lf, 1.6, 118), width: size, height: size, zIndex: z, transform: `scale(${br.toFixed(4)})`, transformOrigin: "50% 100%", filter: "brightness(0.86) saturate(0.94)" }}>
        <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82} o={0.44} />
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.4 + look * 1.6} nodSpeed={9} gaze={-3 - look * 3} stern={0.5 + look * 0.3} capBack={0} />
        {/* the greatcoat, drawn after the body so overshoot is correct, and hung
            off a lagging pivot at the shoulders so it swings a beat behind him */}
        <div style={{ position: "absolute", left: 0, top: 0, width: size, height: size, transformOrigin: `${100 * u}px ${96 * u}px`, transform: `rotate(${coat.toFixed(3)}deg)` }}>
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 70 * u, borderRadius: 3, background: "#B25538" }} />
        <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 8 * u, height: 70 * u, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 5 * u, background: "#C4664A" }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 78 * u, top: (106 + i * 18) * u, width: 10 * u, height: 10 * u, borderRadius: "50%", background: GOLD, opacity: 0.9 }} />)}
        {/* gold piping and epaulettes */}
        <div style={{ position: "absolute", left: 32 * u, top: 92 * u, width: 30 * u, height: 8 * u, borderRadius: 2, background: GOLD, opacity: 0.8 }} />
        <div style={{ position: "absolute", left: 138 * u, top: 92 * u, width: 30 * u, height: 8 * u, borderRadius: 2, background: GOLD, opacity: 0.8 }} />
        </div>
        {/* the bellhop pillbox cap with a small gold C */}
        <div style={{ position: "absolute", left: 54 * u, top: 16 * u, width: 92 * u, height: 28 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 54 * u, top: 16 * u, width: 92 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 54 * u, top: 40 * u, width: 92 * u, height: 5 * u, background: GOLD, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 19 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
      </div>
    );
  };

// THE 10 SECOND CLOCK. A brass egg timer on a chain that swings into the lower
// right foreground and snaps its needle back to zero on every coin that drops.
const S1_EggTimer: React.FC<{ lf: number; inn: number; lastDrop: number }> = ({ lf, inn, lastDrop }) => {
  if (inn <= 0.0005) return null;
  // pivot and chain length. PX is set so the swung body (112 wide, +-37 of arc)
  // never crosses panel local x 900 and never crosses the hero at world x 470.
  const PX = 800, PY = 300, LEN = 300;
  const s1Rest = (g: number) => Math.sin(g / 15.5) * 7 + drift(g, 2.1, 97);
  // it swings in from off frame right, OVERSHOOTS the plumb line and settles.
  const ang = 62 + (s1Rest(lf) - 62) * inn + settle(lf, 62, 7.5, 0.11, 0.085);
  const rad = (ang * Math.PI) / 180;
  const cx = PX + Math.sin(rad) * LEN, cy = PY + Math.cos(rad) * LEN;
  // the brass body is heavy: it LAGS the chain by 3 frames and keeps rolling.
  const angLag = 62 + (s1Rest(lf - 3) - 62) * inn + settle(lf - 3, 62, 7.5, 0.11, 0.085);
  const since = lf - lastDrop;
  const creep = s1c01(since / 26);
  const jitter = since >= 0 && since < 4 ? Math.sin(since * 3.1) * 4.5 : 0;
  const needle = -76 + creep * 152 + jitter;
  // the whole case takes the hit each time a coin lands and rebounds out of it.
  const sq = squash(lf, lastDrop, 0.10, 3);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 57, filter: "blur(1.5px)", pointerEvents: "none" }}>
      {/* the chain */}
      <div style={{ position: "absolute", left: PX - 2, top: PY, width: 4, height: LEN, background: "linear-gradient(180deg,#7A6018,#4E3C0C)", transformOrigin: "50% 0%", transform: `rotate(${-ang}deg)` }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: PX - 4, top: PY + (i + 1) * (LEN / 10), width: 8, height: 6, borderRadius: 3, border: "2px solid #8A6A18", transformOrigin: `4px ${-(i + 1) * (LEN / 10)}px`, transform: `rotate(${-ang}deg)` }} />
      ))}
      {/* the brass body */}
      <div style={{ position: "absolute", left: cx - 56, top: cy - 56, width: 112, height: 112, transform: `rotate(${(-angLag * 0.35).toFixed(3)}deg) scale(${sq.sx.toFixed(3)}, ${sq.sy.toFixed(3)})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#D3AE48", "#6A5314"), border: "5px solid #4E3C0C", boxShadow: "0 12px 26px rgba(6,8,14,0.6), inset 0 3px 0 rgba(255,246,214,0.4)" }} />
        <div style={{ position: "absolute", left: 16, top: 16, width: 80, height: 80, borderRadius: "50%", background: "#120E06", border: "3px solid #8A6A18" }} />
        {/* the tick marks */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 55, top: 22, width: 2, height: 9, background: "rgba(232,206,140,0.75)", transformOrigin: "1px 34px", transform: `rotate(${i * 30}deg)` }} />
        ))}
        {/* the needle */}
        <div style={{ position: "absolute", left: 55, top: 26, width: 2, height: 32, borderRadius: 1, background: "#E8CE8C", transformOrigin: "1px 30px", transform: `rotate(${needle}deg)` }} />
        <div style={{ position: "absolute", left: 51, top: 51, width: 10, height: 10, borderRadius: "50%", background: GOLD, border: "2px solid #4E3C0C" }} />
        <div style={{ position: "absolute", left: 40, top: 66, fontFamily: mono, fontWeight: 700, fontSize: 15, color: "#E8CE8C", opacity: 0.85 }}>10s</div>
        {/* the winder on top */}
        <div style={{ position: "absolute", left: 46, top: -14, width: 20, height: 14, borderRadius: "5px 5px 2px 2px", background: "#9A8030" }} />
      </div>
    </div>
  );
};

// the bench with a fat yellow phone directory book propping up one leg.
const S1_Bench: React.FC<{ lf: number; x: number; y?: number }> = ({ lf, x, y = 606 }) => (
  <div style={{ position: "absolute", left: x, top: y - 26 + idle(lf, 0.7, 128), width: 132, height: 62, zIndex: 18, transformOrigin: "50% 100%", transform: `rotate(${idle(lf, 0.22, 164, 0.9).toFixed(3)}deg)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 132, height: 9, borderRadius: 2, background: "#4A3C28" }} />
    <div style={{ position: "absolute", left: 0, top: 12, width: 132, height: 7, borderRadius: 2, background: "#3E3222" }} />
    <div style={{ position: "absolute", left: 6, top: -22, width: 8, height: 24, background: "#33404E" }} />
    <div style={{ position: "absolute", left: 118, top: -22, width: 8, height: 24, background: "#33404E" }} />
    <div style={{ position: "absolute", left: 8, top: 19, width: 8, height: 22, background: "#33404E" }} />
    <div style={{ position: "absolute", left: 116, top: 19, width: 8, height: 30, background: "#33404E" }} />
    {/* the directory, fat and yellow, doing the only job it has left */}
    <div style={{ position: "absolute", left: 2, top: 41, width: 22, height: 12, borderRadius: 1, background: "#D8C24E", border: "1px solid #8A7A20" }}>
      <div style={{ position: "absolute", left: 1, top: 4, width: 20, height: 1, background: "rgba(90,76,16,0.6)" }} />
      <div style={{ position: "absolute", left: 1, top: 7, width: 20, height: 1, background: "rgba(90,76,16,0.6)" }} />
    </div>
    <div style={{ position: "absolute", left: 30, top: -6, width: 16, height: 6, borderRadius: 3, background: "rgba(180,200,224,0.14)", transform: `translateY(${Math.sin(lf / 33) * 1.2}px)` }} />
  </div>
);

// the bus slab crossing the road, carrying the GEKKO INSURANCE ad panel. It
// runs BELOW the pavement line so it never crosses a figure.
const S1_Bus: React.FC<{ lf: number }> = ({ lf }) => {
  if (lf < 54 || lf > 104) return null;
  // it pulls away and clears, it does not slide at one constant rate.
  const p = over(lf, 54, 50, Easing.inOut(Easing.sin));
  const bx = -470 + p * 2260;
  const bob = Math.sin(lf / 3.3) * 1.7 + drift(lf, 1.4, 44);
  return (
    <div style={{ position: "absolute", left: bx, top: 700 + bob, width: 420, height: 96, zIndex: 10, filter: "blur(2px)", transformOrigin: "50% 100%", transform: `rotate(${(Math.sin(lf / 7.1) * 0.35).toFixed(3)}deg)` }}>
      <div style={{ position: "absolute", left: 0, top: 10, width: 420, height: 86, borderRadius: 6, background: "linear-gradient(180deg,#141A24,#070B12)" }} />
      <div style={{ position: "absolute", left: 0, top: 10, width: 420, height: 4, background: "rgba(150,175,210,0.16)" }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 18 + i * 42, top: 20, width: 30, height: 22, background: "rgba(126,152,192,0.2)" }} />
      ))}
      {/* the GEKKO INSURANCE lizard, three rectangles, second and final firing */}
      <div style={{ position: "absolute", left: 232, top: 20, width: 168, height: 60, background: "linear-gradient(180deg,#D9D3C4,#B6AFA0)", border: "3px solid #2A313D" }}>
        <div style={{ position: "absolute", left: 22, top: 20, width: 62, height: 20, borderRadius: 5, background: "#4E8A46" }} />
        <div style={{ position: "absolute", left: 78, top: 10, width: 26, height: 20, borderRadius: 4, background: "#4E8A46" }} />
        <div style={{ position: "absolute", left: 10, top: 34, width: 22, height: 10, borderRadius: 4, background: "#3E7038" }} />
        <div style={{ position: "absolute", left: 90, top: 15, width: 6, height: 6, borderRadius: "50%", background: "#151A20" }} />
        <div style={{ position: "absolute", left: 110, top: 22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: "#2E3644" }}>GEKKO</div>
      </div>
      <div style={{ position: "absolute", left: 44, top: 84, width: 46, height: 22, borderRadius: "50%", background: "#04070C" }} />
      <div style={{ position: "absolute", left: 320, top: 84, width: 46, height: 22, borderRadius: "50%", background: "#04070C" }} />
      <div style={{ position: "absolute", left: 408, top: 52, width: 14, height: 9, borderRadius: 2, background: RED, opacity: 0.6 }} />
    </div>
  );
};

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------------------------------------------------------------- CAMERA
  // KERB track left at walking pace, whip right to RIVAL, whip back to a TWO
  // width pose on our row. Never wider than TWO.
  let cam: CamPose;
  let whip = 0;
  if (lf < 96) {
    // already at walking pace on frame 0, easing out toward the whip. Not a ramp.
    const t = s1c01(lf / 96);
    cam = { x: S1_KERB.x - 44 * (t * 0.74 + s1Ease(t) * 0.26), y: S1_KERB.y + drift(lf, 2.6, 152, 1.1), z: S1_KERB.z * breathe(lf, 0.006, 232) };
  } else if (lf < 110) {
    const t = s1Ease(s1c01((lf - 96) / 14));
    cam = lerpCam({ x: S1_KERB.x - 44, y: S1_KERB.y, z: S1_KERB.z }, S1_RIVAL, t);
    whip = Math.sin(Math.PI * s1c01((lf - 96) / 14)) * 26;
  } else {
    // parked on the rival and still drifting all the way to the cut. The old pull
    // back to TWO landed on an empty stretch of our own row and the comparison
    // never happened. The split rig below does the comparison instead.
    // The whip ARRIVES with a damped overshoot instead of stopping on the mark.
    const t = s1c01((lf - 110) / 44);
    cam = {
      x: S1_RIVAL.x + 38 * Easing.out(Easing.quad)(t) + settle(lf, 110, 9, 0.11, 0.085),
      y: S1_RIVAL.y + drift(lf, 2.2, 162, 0.4) + settle(lf, 110, 3.6, 0.13, 0.10),
      z: (S1_RIVAL.z - t * 0.03) * breathe(lf, 0.005, 194),
    };
  }
  // THE CAMERA IS A CHARACTER. Handheld noise always on, plus a decaying kick on
  // every coin that reaches the grate, on the whip, and on the split opening.
  const s1Hand = shakeCam(lf, S1_HITS, 1);
  cam = { x: cam.x + s1Hand.x, y: cam.y + s1Hand.y, z: cam.z * s1Hand.z };
  // the split, and the two poses it holds. Both drift, so neither band is a still.
  const split = over(lf, S1_SPL, S1_SPD, Easing.inOut(Easing.cubic));
  const sd = lf - S1_SPL;
  // camFor's x is the LEFT EDGE of the 1012 viewport, so each pose is
  // (board centre - 506). Ours centres world 385, theirs centres world 2707.
  const camOurs = camFor(-121 + sd * 0.26, S1_BOARDY, 1.0, S1_ANCH);
  const camThem = camFor(2201 - sd * 0.22, S1_BOARDY, 1.0, S1_ANCH);

  // ------------------------------------------------------------ THE QUEUE
  // one <Customer/> or one <Turn/> per index. Never hand authored twelve times.
  const turnsDone = S1_T.filter((t) => lf >= t + 10).length;
  const chalk = Math.min(12, 3 + turnsDone);

  // the villain's tell and his tally box tick, two frames ahead of each turn
  let tick = 0, tell = 0;
  S1_T.forEach((t) => {
    if (lf >= t - 2 && lf < t + 4) tick = 1;
    if (lf >= t - 8 && lf < t - 1) tell = Math.max(tell, Math.sin(((lf - (t - 8)) / 7) * Math.PI));
  });
  let pipLook = 0;
  S1_T.forEach((t) => { if (lf >= t && lf < t + 14) pipLook = Math.max(pipLook, Math.sin(((lf - t) / 14) * Math.PI)); });

  // the most recent coin that hit the grate, for the egg timer needle
  let lastDrop = -400;
  S1_D.forEach((d) => { if (lf >= d) lastDrop = Math.max(lastDrop, d); });
  const timerIn = over(lf, 48, 14, Easing.out(Easing.back(1.5)));

  // ------------------------------------------------------------ THE RIVAL
  // the board must READ full before the camera leaves at f140, and the ninth must
  // be standing at it, not still walking. Everything lands by f133.
  // all eight land BEFORE the split opens, so the band reads a solid 8/8 and the
  // motion at the cut is a ninth ticket that has nowhere to go.
  // eight tickets, each on its own varied start and duration with a back ease, so
  // the board fills as eight separate events instead of one linear sweep.
  const rivalTk = Math.min(8, S1_TKF.reduce((a, f0, i) => a + over(lf, f0, varyDur(i, 5, 0.3), Easing.out(Easing.back(1.4))), 0));
  const rivalOn = 0.86 + 0.14 * s1c01(rivalTk / 8) + 0.03 * (flick(lf, 0.1, 3) - 1);
  const rivalSharp = s1c01((lf - 98) / 12) * (1 - s1c01((lf - 142) / 10));
  // the ninth walks in from the left edge DURING the whip, so he is never a pop.
  const ninth = over(lf, 99, 34, Easing.out(Easing.quad));
  const ninthX = 2296 + ninth * 384;
  const ninthRock = settle(lf, 133, 5.5, 0.13, 0.11);      // he rocks back on his heels

  // magenta, the colour of somebody else's sign. It FLOODS on the whip into the
  // rival, breathes with his neon while we are parked on him, then retreats to
  // the right edge as we pull back onto our own dark row.
  const magPk = 0.54 + 0.05 * Math.sin((lf - 116) / 7);
  const mag = lf < 96 ? 0.10 + 0.16 * s1c01(lf / 96)
    : lf < 116 ? 0.26 + (magPk - 0.26) * s1c01((lf - 96) / 20)
      : magPk - 0.22 * s1c01((lf - 140) / 14);
  const magX = lf < 96 ? 1010
    : lf < 116 ? 1010 - 500 * s1c01((lf - 96) / 20)
      : 510 + 500 * s1c01((lf - 140) / 14);

  return (
    <>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id="s1whip"><feGaussianBlur stdDeviation={`${whip} 0`} /></filter>
      </svg>

      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: whip > 0.4 ? "url(#s1whip)" : "none" }}>
        <Cam x={cam.x} y={cam.y} z={cam.z}>
          <Street
            lf={lf}
            lit={[1, 0.94, 0.86, 0.8]}
            sign={[1, 1, 1, 1]}
            board={0}
            chalk={chalk}
            rain={1}
            lamps={1}
            rival={rivalOn}
            rivalTickets={rivalTk}
            rivalSharp={rivalSharp}
            rivalDoorProp={1}
            fore={0}
            pigeonY={332}
            pigeonAt={18}
            drainGlint={1}
            brackets={4}
          >
            {/* ---- the bench and its directory, behind the walking line ---- */}
            <S1_Bench lf={lf} x={170} />

            {/* ---- chalk dust falling off the completed tally ---- */}
            {Array.from({ length: 11 }, (_, i) => {
              const s = seed(i * 4.7 + 13);
              const p = ((lf * (0.7 + s * 0.9) + s * 120) % 120) / 120;
              return <div key={"cd" + i} style={{ position: "absolute", left: 148 + s * 116, top: 396 + p * 116, width: 3, height: 3, borderRadius: "50%", background: "rgba(232,228,214,0.7)", opacity: (1 - p) * 0.6, zIndex: 19 }} />;
            })}

            {/* ---- PIP on the stoop, looking up at every turnaround ---- */}
            <Pip lf={lf} x={290} y={560} size={72} hose={1} look={pipLook} z={21} />

            {/* ---- THE TWELVE. One component, instanced, never hand authored ---- */}
            {S1_T.map((T, i) => {
              const turning = lf >= T && lf < T + 12;
              const pro = s1Pro(lf, T);
              const yy = s1BaseY(i) + (677 - s1BaseY(i)) * pro;
              const sz = s1BaseSz(i) + (126 - s1BaseSz(i)) * pro;
              const zi = 22 + (i % 5) + Math.round(pro * 9);
              if (turning) {
                const tc = (lf - T) / 12;
                // a body lean into the turn, layered on top of the component's own
                // fixed 12 frame rotate, which the Continuity Editor freezes.
                const leanD = -4.4 * Math.sin(tc * Math.PI);
                return (
                  <div key={"t" + i} style={{ position: "absolute", left: 0, top: 0, transformOrigin: `${S1_XT[i]}px ${yy}px`, transform: `rotate(${leanD.toFixed(2)}deg)`, filter: "brightness(1.08)", zIndex: zi }}>
                    <Turn t={tc} lf={lf} x={S1_XT[i]} y={yy} scarf={i} prop={S1_PROPS[i]} size={sz} z={zi} />
                  </div>
                );
              }
              const before = lf < T;
              const x = before
                ? S1_XT[i] - (T - lf) * S1_VIN + s1Hitch(lf, T)
                : S1_XT[i] - (lf - T - 12) * s1VoutI(i);
              if (x < -560 || x > 900) return null;
              // the landing after the hop. A damped rock and a small rebound, so
              // nobody ever dead stops on the frame his feet touch down.
              const rock = before ? idle(lf + i * 9, 0.9, 74) : settle(lf, T + 12, 5.8, 0.15, 0.14);
              const reb = before ? 0 : -Math.abs(settle(lf, T + 12, 4.6, 0.18, 0.16));
              return (
                <div key={"c" + i} style={{ position: "absolute", left: 0, top: 0, transformOrigin: `${x}px ${yy}px`, transform: `rotate(${rock.toFixed(2)}deg) translateY(${reb.toFixed(2)}px)`, filter: `brightness(${(0.88 + pro * 0.19).toFixed(3)})`, zIndex: zi }}>
                  <Customer lf={lf + stagger(i, 7)} x={x} y={yy} scarf={i} prop={S1_PROPS[i]}
                    coin={before ? 1 : 0} walk={before ? 1 : -1} size={sz} z={zi}
                    read={before && lf > T - 15 ? 1 : 0} />
                </div>
              );
            })}

            {/* ---- THE TWELVE COINS, rolling left to the storm drain ---- */}
            {S1_D.map((D, i) => {
              const R = S1_T[i] + 12;
              if (lf < R || lf > D + 24) return null;
              const start = S1_XT[i] - 56;
              // a rolling coin loses energy. Ease out, never a constant rate slide.
              const p = over(lf, R, Math.max(1, D - R), Easing.out(Easing.quad));
              // it reaches the grate, hops twice on the lip, THEN drops through.
              const lip = lf >= D ? Math.abs(settle(lf, D, 21, 0.16, 0.19)) : 0;
              const fall = s1c01((lf - (D + 12)) / 8);
              const rattle = lf > D - 9 && lf < D ? Math.abs(Math.sin((lf - D) * 0.9)) * 5 : 0;
              return (
                <React.Fragment key={"k" + i}>
                  <Coin lf={lf}
                    x={start + (S1_DRAINX - start) * p + (lf < D ? Math.sin(p * Math.PI * 9) * 2 : Math.sin(lf * 0.7 + i) * 1.4)}
                    y={662 + Math.sin(p * Math.PI * 6) * 2 - rattle - lip + fall * fall * 80}
                    r={fall > 0 ? 15 * (1 - fall * 0.5) : 15}
                    roll={(start > S1_DRAINX ? -1 : 1) * (lf - R) * 0.14 * (1 - p * 0.5)}
                    o={1 - fall * 0.9}
                    z={fall > 0 ? 8 : 23}
                  />
                  {/* the coin and the drain it enters, in the same frame */}
                  <GroundRing lf={lf} at={D} x={S1_DRAINX} y={668} r={64} dur={17} hue="rgba(214,184,120,0.5)" z={20} />
                  <Sparkles lf={lf} at={D} x={S1_DRAINX} y={664} n={5} life={19} spread={42} rise={28} hue="#D9B872" sd={i * 3} z={24} />
                </React.Fragment>
              );
            })}

            {/* ---- NOBODY HOME. He stands. He does not grow, glow or advance ---- */}
            <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: "190px 668px", transform: `rotate(${(tell * 1.1 + idle(lf, 0.55, 158)).toFixed(3)}deg) translateY(${idle(lf, 1.1, 104, 2.1).toFixed(2)}px)`, zIndex: 30 }}>
              <Nobody lf={lf} x={190} y={668} size={158} pole={1} dust={1} solid={0} tally={0} count={-1} tick={tick} tilt={tell} z={30} />
            </div>
            {/* his grey dust never settles: four overlapping plumes cover 0 to 154 */}
            {[-30, 16, 62, 108].map((at, k) => (
              <Dust key={"nd" + k} lf={lf} at={at} x={190} y={674} n={7} life={80} spread={94} hue="rgba(142,139,132,0.40)" sd={k * 5} z={29} />
            ))}

            {/* ---- THE HERO. Present, watching, and deliberately powerless ---- */}
            <S1_Hero lf={lf} x={470} y={660} size={148} z={27} look={pipLook} />

            {/* ---- the ninth customer, walking up to a full board at Drip Bros ---- */}
            {lf > 98 && (
              <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: `${ninthX}px 660px`, transform: `rotate(${ninthRock.toFixed(2)}deg)`, zIndex: 26 }}>
                <Customer lf={lf} x={ninthX} y={660} scarf={2} prop="pipe" coin={1} walk={ninth < 0.98 ? 1 : 0} size={106} z={26} read={ninth >= 0.86 ? 1 : 0} />
              </div>
            )}

            {/* ---- the bus slab on the road, under every figure ---- */}
            <S1_Bus lf={lf} />

            {/* ---- MY OWN FOREGROUND SILHOUETTES, placed so nothing crosses a
                    figure at any point in its arc ---- */}
            <ForeSil lf={lf} x={-420} groundY={W_KERB + 16} w={3840} h={30} kind="kerb" o={0.9} blur={2.5} z={45} />
            <ForeSil lf={lf} x={-60} groundY={W_KERB} w={92} h={140} kind="aboard" o={1} blur={2.5} z={46} />
            <ForeSil lf={lf} x={660} groundY={W_KERB} w={66} h={124} kind="hydrant" o={1} blur={2.5} z={46} />
            <ForeSil lf={lf} x={900} groundY={W_KERB} w={104} h={128} kind="trolley" o={1} blur={2.5} z={46} />
            <ForeSil lf={lf} x={2540} groundY={W_KERB} w={58} h={128} kind="bollard" o={1} blur={2.5} z={46} />
          </Street>
        </Cam>
      </div>

      {/* ================= THE TWO BOARD COMPARISON =================
          Two cameras, one frame. The top band is our fascia at 0/8, the bottom is
          Drip Bros at 8/8, both boards on the same world line so the eye reads
          them as one row of slots against another. Both bands keep animating and
          the scene cuts on them. ---- */}
      {split > 0.004 && (
        <>
          {/* the row behind the bands goes to ink so the two boards carry the frame */}
          <div style={{ position: "absolute", inset: 0, background: "#080A0E", opacity: 0.74 * split, zIndex: 44, pointerEvents: "none" }} />

          {[0, 1].map((b) => {
            const ours = b === 0;
            const by = ours ? S1_TOPY : S1_BOTY;
            // each band ARRIVES: back eased, overshooting its mark and settling,
            // the bottom one four frames behind the top so they never act as one.
            const so = overshoot(lf, S1_SPL + (ours ? 0 : 4), S1_SPD, 0.11);
            const slide = (ours ? -(1 - so) * (S1_TOPY + S1_BH) : (1 - so) * (792 - S1_BOTY + 12))
              + idle(lf, 1.5, 118, ours ? 0 : 2.3);
            const c = ours ? camOurs : camThem;
            return (
              <div key={"bd" + b} style={{ position: "absolute", left: 24, top: by + slide, width: 964, height: S1_BH, zIndex: 54, overflow: "hidden", borderRadius: 5, border: `2px solid ${ours ? "#3A4150" : "#4A2440"}`, boxShadow: "0 14px 30px rgba(4,6,10,0.6)" }}>
                <div style={{ position: "absolute", left: -24, top: 0, width: 1012, height: 792 }}>
                  <Cam x={c.x} y={c.y} z={c.z}>
                    <Street
                      lf={lf}
                      lit={[1, 0.94, 0.86, 0.8]}
                      sign={[1, 1, 1, 1]}
                      board={0}
                      chalk={12}
                      rain={1}
                      lamps={1}
                      rival={rivalOn}
                      rivalTickets={rivalTk}
                      rivalSharp={1}
                      rivalDoorProp={1}
                      fore={0}
                      pigeonAt={600}
                      drainGlint={1}
                      brackets={4}
                    >
                      {/* our chalk dust keeps falling in the top band */}
                      {ours && Array.from({ length: 11 }, (_, i) => {
                        const s = seed(i * 4.7 + 13);
                        const p = ((lf * (0.7 + s * 0.9) + s * 120) % 120) / 120;
                        return <div key={"sd" + i} style={{ position: "absolute", left: 148 + s * 116, top: 396 + p * 116, width: 3, height: 3, borderRadius: "50%", background: "rgba(232,228,214,0.7)", opacity: (1 - p) * 0.6, zIndex: 19 }} />;
                      })}
                    </Street>
                  </Cam>
                </div>

                {/* THEIRS: the ninth ticket, hovering over slot 8 with nowhere to land */}
                {!ours && (
                  <div style={{ position: "absolute", left: 566, top: 104 + Math.sin(lf / 5.5) * 6, width: 31, height: 19, borderRadius: 2, background: GREEN, border: "1.5px solid #5FC79A", opacity: 0.55 + 0.35 * Math.sin(lf / 7), zIndex: 20 }} />
                )}

                {/* the magenta only ever lives inside the rival's own band */}
                {!ours && <GelWash x={520} y={70} w={700} h={300} color={RIVALMAG} o={0.22 + 0.04 * Math.sin(lf / 8)} blur={70} z={21} />}

                {/* THE COUNT. Big enough to read at thumbnail size, sat under the
                    board so it never covers a slot. */}
                <div style={{ position: "absolute", left: 36, top: 158, width: 212, height: 86, borderRadius: 6, background: "rgba(10,13,20,0.9)", border: `2px solid ${ours ? "#4A5262" : BRASS}`, zIndex: 24, opacity: split }}>
                  <div style={{ position: "absolute", left: 14, top: 10, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.16em", color: ours ? "#8E96A4" : "#D6A9C6" }}>{ours ? "PIPE BROS" : "DRIP BROS"}</div>
                  <div style={{ position: "absolute", left: 14, top: 30, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1, color: ours ? "#C9BFAE" : GOLD, transform: `scale(${ours ? 1 + 0.014 * Math.sin(lf / 13) : 1 + 0.05 * Math.max(0, 1 - Math.abs(lf - 140) / 9)})`, transformOrigin: "0% 50%" }}>{ours ? "0/8" : "8/8"}</div>
                  {/* ours: the eight dead slots ticking their own emptiness */}
                  {ours && Array.from({ length: 8 }, (_, i) => (
                    <div key={"es" + i} style={{ position: "absolute", left: 132 + (i % 4) * 18, top: 38 + Math.floor(i / 4) * 20, width: 13, height: 13, borderRadius: 2, background: "#161A22", border: "1.5px solid #2C3240", opacity: 0.5 + 0.35 * Math.sin(lf / 9 + i * 0.7) }} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* the gutter rule between them, with a glint running the whole width */}
          <div style={{ position: "absolute", left: 24, top: S1_TOPY + S1_BH + S1_GUT / 2 - 2, width: 964, height: 4, background: "linear-gradient(90deg,#2A3140,#5A4A18,#2A3140)", opacity: split, zIndex: 55 }} />
          <div style={{ position: "absolute", left: 24 + ((lf * 11) % 1180) - 120, top: S1_TOPY + S1_BH + S1_GUT / 2 - 4, width: 120, height: 8, background: `linear-gradient(90deg, transparent, ${BRASS}, transparent)`, opacity: 0.7 * split, filter: "blur(3px)", zIndex: 56, pointerEvents: "none" }} />
        </>
      )}

      {/* ---- the two coins tumbling past the lens, well below every figure ---- */}
      {[70, 88].map((at, k) => {
        if (lf < at || lf > at + 22) return null;
        const p = (lf - at) / 22;
        const cx = arcX(lf, at, 22, 1120, -180);
        // 60px a frame past the lens. Crisp edges here read as teleporting.
        return (
          <Smear key={"fg" + k} dx={-58} dy={0} ghosts={4} o={0.26} stretch={1.22} z={54}>
            <Coin lf={lf} x={cx} y={arcY(lf, at, 22, 712 + k * 34, 34, 700 + k * 34)} r={44} roll={-p * p * 13} z={54} />
          </Smear>
        );
      })}

      {/* ---- the whip has speed in it, not just blur ---- */}
      {lf > 94 && lf < 116 && (
        <SpeedLines lf={lf} x={0} y={150} w={1012} h={560} n={20}
          on={Math.sin(Math.PI * s1c01((lf - 94) / 22)) * 0.8} hue="rgba(206,220,240,0.42)" z={51} sd={7} />
      )}

      {/* ---- the 10 second clock in the lower right foreground ---- */}
      <S1_EggTimer lf={lf} inn={timerIn} lastDrop={lastDrop} />

      {/* ---- Drip Bros bleeding down the street. Loss has a colour and it is
              somebody else's sign. Screen blended, never a coloured halo ---- */}
      <GelWash x={magX} y={430} w={880} h={900} color={RIVALMAG} o={mag * (1 - split)} blur={92} z={50} />
      <GelBar x={560} y={604} w={520} h={130} color={RIVALMAG} o={mag * 0.7 * (1 - split)} z={50} rot={-4} />

      <Vig o={0.36} />
      {/* f offset past the tag's own 12 frame build so it is SOLID at lf 0 */}
      <SceneTag f={lf + 24} text="THE ROW" color={BRASS} />
      {/* the count is a STATE CHANGE, so it is shown changing: it climbs with the
          turnarounds and lands on 12, instead of sitting on 12 for five seconds */}
      <HUD lf={lf} text={`MISSED ${Math.min(12, Math.max(1, turnsDone))}`} color={RED} flash={1} y={168} />
    </>
  );
};

// ==== part: 12_S2.tsx ====

// ===========================================================================
// SCENE 2  BOTH HANDS FULL   START 10.04s   92 frames (lf 0..91)   verb REACH
// The sympathy pivot. The camera pushes through the shop window, holds tight on
// a competent man with both arms inside a cabinet, and then racks focus off him
// onto the glass, where the villain is standing three feet away ringing a bell
// at a man who never looks up. The hero is absent and that is deliberate.
//
// THE ONE SENTENCE, SOUND OFF: he is not ignoring the phone, he has both fists
// clamped on a leaking pipe under the sink and physically cannot get to it.
// So the picture now SHOWS the two things it used to only imply:
//   1. the CABINET MOUTH is open under him, lit from inside, with the trap
//      joint and BOTH FISTS visibly wrapped around it. Hands full, literally.
//   2. the REACH AND THE FAILURE. He winds up, whips one fist out, stretches,
//      and stops dead short of the phone with a measurable gap of air and a
//      jet of water crossing it, then snaps back because the joint needs him.
//
// AT FRAME 0 INVENTORY, everything already dressed and already moving:
//   - the exterior shop face is on screen, brick, fascia bar, awning underside,
//     stoop steps and the wet pavement smear below the lit window aperture
//   - the push through the glass is already under way (s = 1.00 climbing to 3.05)
//   - the glass pane foreground is at 0.62 with 22 rain beads already sliding
//   - exterior drizzle at two speeds, one catenary lamp cone flickering
//   - INSIDE the aperture: the whole interior is live. The water fan is already
//     spraying, both arms are already down in the cabinet mouth gripping the
//     joint, the torch pool is already travelling, the phone is already buzzing
//     and skittering on the flagstone at badge 3, the puddle is already
//     advancing, and the window behind him already shows a soft dim street
//   - SceneTag BOTH HANDS FULL rendered solid (f offset so it never fades in)
//   - no gold and no green anywhere, per the colour script
// AT FRAME 91: water still spraying, the joint still weeping, the puddle edge
// still advancing, the phone still buzzing and still walking away from him, the
// badge still rolling, the villain's dust still creeping in under the door.
// ===========================================================================

const S2_K = 3.05;                                  // final push scale
const S2_AP = { x: 340, y: 266, w: 332, h: 260 };   // the window aperture, unscaled
const S2_OX = "#8E3A2E";                            // oxblood. NOT the reserved hard red.
const S2_AMB = "#C98A4E";                           // interior warm amber, NOT gold
const S2_TILE = "#5E2A24";                          // oxblood splashback tile
const S2_WALL = "#3A2A1E";
const S2_WET = "rgba(198,224,246,0.72)";            // the cold water note

// where the two arms hang from, and the mouth they disappear into
const S2_SHL = { x: 330, y: 516 };
const S2_SHR = { x: 618, y: 516 };
const S2_MOUTH = { x: 292, y: 634, w: 412, h: 156 };

// the phone's resting corner. It walks further from him on every buzz.
const S2_PHX = 46, S2_PHY = 668, S2_PHK = 1.12;

// the geometric water fan that comes up out of the cabinet mouth. Its wedge is a
// STATIC shape sitting clear of the owner's silhouette, and only the particles
// inside it move, so nothing ever crosses the figure.
const S2Fan: React.FC<{ lf: number; amt: number }> = ({ lf, amt }) => (
  <div style={{ position: "absolute", left: 78, top: 352, width: 300, height: 300, zIndex: 20, pointerEvents: "none" }}>
    <div style={{
      position: "absolute", left: 0, top: 0, width: 300, height: 300,
      background: "linear-gradient(0deg, rgba(168,200,228,0.32), rgba(190,216,238,0.06) 78%, transparent)",
      clipPath: `polygon(${50 - amt * 9}% 100%, ${50 + amt * 9}% 100%, ${74 + amt * 13}% 4%, ${28 - amt * 11}% 13%)`,
      filter: "blur(3px)", opacity: 0.5 + amt * 0.44,
      transform: `scaleX(${(1 + Math.sin(lf / 6.1) * 0.03 + amt * 0.05).toFixed(4)})`, transformOrigin: "50% 100%",
    }} />
    {Array.from({ length: 30 }, (_, i) => {
      const s = seed(i * 3.17 + 4);
      // per droplet speed and phase, so the column never pulses as one machine
      const p = ((lf * (1.9 + s * 2.6) + s * 130 + stagger(i, 4)) % 130) / 130;
      const spread = (s - 0.5) * (34 + p * 164 * amt);
      const rise = Math.pow(p, 0.78);                     // decelerating rise, arcs not lines
      return <div key={i} style={{
        position: "absolute", left: 148 + spread + p * 48, top: 286 - rise * 268,
        width: 3, height: 8 + s * 10, borderRadius: 2,
        background: S2_WET, opacity: (1 - p) * (0.54 + amt * 0.46),
        transform: `rotate(${8 + spread * 0.06}deg)`,
      }} />;
    })}
  </div>
);

// THE CABINET MOUTH. The single biggest clarity fix in the scene: an open, lit
// aperture under him with the weeping trap joint inside it, so the audience can
// SEE what his hands are busy with instead of taking it on trust.
const S2Mouth: React.FC<{ lf: number; oneHand: number; strain: number }> = ({ lf, oneHand, strain }) => {
  const jitter = Math.sin(lf * 1.7) * 0.8 + Math.sin(lf * 3.9) * 0.4;
  const tilt = oneHand * 6.5 + jitter * (0.4 + strain * 1.2);
  return (
    <div style={{ position: "absolute", left: S2_MOUTH.x, top: S2_MOUTH.y, width: S2_MOUTH.w, height: S2_MOUTH.h, zIndex: 45, pointerEvents: "none" }}>
      {/* the two open door leaves, hinged back, breathing on their hinges */}
      {[0, 1].map((i) => (
        <div key={i} style={{
          position: "absolute", left: i ? S2_MOUTH.w - 62 : 0, top: 6, width: 62, height: S2_MOUTH.h - 12,
          background: i ? "linear-gradient(90deg,#20160E,#3A2A1E)" : "linear-gradient(90deg,#3A2A1E,#20160E)",
          borderTop: "4px solid #4C3826",
          transformOrigin: i ? "100% 50%" : "0% 50%",
          transform: `perspective(420px) rotateY(${(i ? -1 : 1) * (26 + idle(lf, 1.3, 118, i * 2.1))}deg)`,
        }} />
      ))}
      {/* the dark inside of the cabinet, dimly lit so the joint reads */}
      <div style={{ position: "absolute", left: 48, top: 0, width: S2_MOUTH.w - 96, height: S2_MOUTH.h, background: "linear-gradient(180deg,#0A0705,#050403)", borderTop: "7px solid #5A4430", borderLeft: "5px solid #4C3826", borderRight: "5px solid #4C3826", boxShadow: "inset 0 12px 26px rgba(0,0,0,0.9)" }} />
      <div style={{ position: "absolute", left: 44, top: -7, width: S2_MOUTH.w - 88, height: 7, borderRadius: 2, background: "rgba(198,222,246,0.16)" }} />
      <div style={{
        position: "absolute", left: 78, top: 22, width: S2_MOUTH.w - 156, height: 96, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${S2_AMB}, transparent 68%)`, filter: "blur(16px)", mixBlendMode: "screen",
        opacity: 0.30 * (0.86 + 0.14 * Math.sin(lf / 7.3)),
      }} />
      {/* THE TRAP JOINT. It tips when a hand leaves it, and it weeps constantly. */}
      <div style={{ position: "absolute", left: 78, top: 14, width: S2_MOUTH.w - 156, height: 60, transformOrigin: "72% 50%", transform: `rotate(${tilt.toFixed(3)}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 18, width: S2_MOUTH.w - 156, height: 26, borderRadius: 6, background: "linear-gradient(180deg,#7C8492,#39404C)" }} />
        <div style={{ position: "absolute", left: 0, top: 20, width: S2_MOUTH.w - 156, height: 5, borderRadius: 3, background: "rgba(210,226,246,0.22)" }} />
        {/* the collar he is holding shut, right where both fists land */}
        <div style={{ position: "absolute", left: 26, top: 10, width: 36, height: 42, borderRadius: 4, background: "linear-gradient(180deg,#8A929F,#454C58)" }} />
        <div style={{ position: "absolute", left: 154, top: 10, width: 36, height: 42, borderRadius: 4, background: "linear-gradient(180deg,#8A929F,#454C58)" }} />
        {/* the split it is leaking from, wider when only one fist is left on it */}
        <div style={{ position: "absolute", left: 84, top: 16, width: 44, height: 4 + oneHand * 5, borderRadius: 3, background: "#12161D" }} />
      </div>
    </div>
  );
};

// ONE ARM, hung from the shoulder and rotated about it. `open` turns the fist
// into a stretched, splayed hand, which is what a failed reach looks like.
const S2Arm: React.FC<{ x: number; y: number; ang: number; len: number; w: number; open: number; z: number }> =
  ({ x, y, ang, len, w, open, z }) => (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: len, zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${ang.toFixed(3)}deg)` }}>
      <div style={{ position: "absolute", left: 0, top: -w * 0.24, width: w, height: len - w * 0.5, borderRadius: w * 0.44, background: `linear-gradient(90deg,#7E5636,${OCHRE} 48%,#C08A5A)`, boxShadow: "0 5px 12px rgba(6,4,2,0.55)" }} />
      {/* the cuff, so the arm reads as a sleeve and not a stick */}
      <div style={{ position: "absolute", left: -w * 0.12, top: -w * 0.2, width: w * 1.24, height: w * 0.4, borderRadius: 4, background: "#3E5A78" }} />
      {/* the hand: a fist on the joint, or splayed fingers grabbing at nothing */}
      <div style={{
        position: "absolute", left: -w * 0.18, top: len - w * 1.06, width: w * 1.36, height: w * 1.02,
        borderRadius: `${w * (0.46 - open * 0.2)}px`, background: OCHRE, boxShadow: "0 5px 10px rgba(6,4,2,0.6)",
      }}>
        <div style={{ position: "absolute", left: w * 0.14, top: w * 0.2, width: w * 1.04, height: 3, borderRadius: 2, background: "rgba(30,18,10,0.34)" }} />
        {open > 0.02 && [0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute", left: w * 0.08 + i * w * 0.42, top: w * 0.84, width: w * 0.3, height: w * 0.62 * open,
            borderRadius: w * 0.15, background: OCHRE, transformOrigin: "50% 0%",
            transform: `rotate(${(i - 1) * 13}deg)`,
          }} />
        ))}
      </div>
    </div>
  );

// the brick phone on the flagstone. One handset glyph and one badge numeral, and
// that is the only screen shaped object in the whole reel. It now buzzes on a
// real two frequency vibration curve, throws sound arcs, and WALKS AWAY from him.
const S2Phone: React.FC<{ lf: number; badge: number; buzz: number; skid: number; pop: number }> = ({ lf, badge, buzz, skid, pop }) => {
  const sk = (Math.sin(lf * 3.9) * 3.4 + Math.sin(lf * 7.7) * 1.6) * buzz;
  const sk2 = (Math.cos(lf * 4.3) * 2.2 + Math.cos(lf * 8.9) * 1.0) * buzz;
  const rot = Math.sin(lf * 4.4 + 0.8) * 2.4 * buzz;
  return (
    <div style={{
      position: "absolute", left: S2_PHX + skid, top: S2_PHY, width: 146, height: 84, zIndex: 49,
      transformOrigin: "0% 100%", transform: `scale(${S2_PHK}) translate(${sk.toFixed(2)}px, ${sk2.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`,
    }}>
      {/* the sound arcs. Geometric, cold, matte. They say RINGING with no text. */}
      {[0, 1, 2].map((i) => {
        const t = (((lf + stagger(i, 9)) * 0.055) % 1);
        const r = 42 + t * 96;
        return <div key={i} style={{
          position: "absolute", left: 60 - r, top: 34 - r * 0.86, width: r * 2, height: r * 1.72, borderRadius: "50%",
          border: "3px solid rgba(174,202,228,0.5)", clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 54% 100%)",
          opacity: (1 - t) * 0.62 * buzz, filter: "blur(0.8px)",
        }} />;
      })}
      <div style={{ position: "absolute", left: 118, top: -34, width: 7, height: 40, borderRadius: 3, background: "#2A2E38", transformOrigin: "50% 100%", transform: `rotate(${(Math.sin(lf * 3.1) * 5 * buzz).toFixed(2)}deg)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 146, height: 84, borderRadius: 9, background: grad("#3A404C", "#1A1E26"), border: "3px solid #10141B", boxShadow: "0 8px 16px rgba(4,6,10,0.7)" }} />
      <div style={{ position: "absolute", left: 12, top: 12, width: 122, height: 60, borderRadius: 4, background: "#B9CBD8", opacity: 0.52 + 0.48 * buzz, boxShadow: "inset 0 2px 5px rgba(10,16,24,0.4)" }} />
      {/* the struck handset glyph */}
      <div style={{ position: "absolute", left: 40, top: 36, width: 44, height: 11, borderRadius: 4, background: "#1E262E", transform: "rotate(-30deg)" }} />
      <div style={{ position: "absolute", left: 33, top: 28, width: 15, height: 15, borderRadius: "50%", background: "#1E262E" }} />
      <div style={{ position: "absolute", left: 74, top: 46, width: 15, height: 15, borderRadius: "50%", background: "#1E262E" }} />
      {/* the badge numeral, always rolling, and popping hard when it increments */}
      <div style={{
        position: "absolute", left: 96, top: 18 + Math.sin(lf / 5.4) * 1.6, width: 30, height: 30, borderRadius: "50%",
        background: S2_OX, border: "2px solid #2A1210", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#F0DDD6",
        transform: `scale(${(1 + Math.max(0, 0.34 - Math.abs(Math.sin(lf / 9)) * 0.34) * 0.5 + pop).toFixed(3)})`,
      }}>{badge}</div>
    </div>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- the camera is a character, always ---------------------------------
  const cam = shakeCam(lf, [
    { at: 30, amp: 5.0, dur: 15 },     // the push lands
    { at: 40, amp: 3.0, dur: 9 },      // the wind up
    { at: 48, amp: 4.2, dur: 11 },     // the fist snaps out
    { at: 58, amp: 6.4, dur: 16 },     // the fist snaps back, defeated
    { at: 82, amp: 2.6, dur: 10 },     // the third call
  ], 1);

  // ---- the push through the glass, f0 to f30 -----------------------------
  const push = over(lf, 0, 30, Easing.inOut(Easing.cubic));
  // the push OVERSHOOTS the mark at f30 and settles, instead of stopping dead,
  // then keeps creeping and breathing for the remaining 61 frames.
  const land = settle(lf, 30, 0.055, 0.12, 0.11);
  const drift2 = over(lf, 30, 62, Easing.linear) * 0.05;
  const breath = lf > 30 ? Math.sin((lf - 30) / 25) * 0.012 : 0;
  const sc = (1 + push * (S2_K - 1) + drift2 + breath + land) * cam.z;
  const dx = -26 * (1 - push) + cam.x;
  const dy = 10 * (1 - push) + cam.y;
  const shellO = 1 - over(lf, 22, 12);                 // 1 at f0, gone by f34
  const glassO = 0.62 * (1 - over(lf, 8, 16));         // beads dissolve out at f24
  const glassSc = 1 + over(lf, 0, 26, Easing.linear) * 3.1;
  // speed lines on the push, which crosses the whole frame in under 30 frames
  const rush = Math.max(0, over(lf, 4, 8) - over(lf, 22, 10));

  // ---- THE REACH AND THE FAILURE -----------------------------------------
  // f38 he sees it. f41 he winds the shoulder AWAY. f41..50 the fist whips out.
  // f50..62 he is stretched, quivering, and short. f62 it snaps back.
  const rA = antic(lf, 40, 8, 0.24, Easing.out(Easing.back(2.2)));
  const snapBack = over(lf, 58, 6, Easing.out(Easing.poly(5)));
  const rArm = rA * (1 - snapBack);
  const rk = Math.max(0, rArm);
  const strain = rk * (0.55 + 0.45 * (1 - Math.abs(Math.sin(lf / 9))));
  const quiver = (Math.sin(lf * 1.9) * 1.6 + Math.sin(lf * 3.3) * 0.9) * rk;

  // the left arm: out toward the phone, then back, with a real follow through
  const armAngL = -28 + rArm * 42 + quiver
    + settle(lf, 48, 5.6, 0.17, 0.11) + settle(lf, 65, 8.2, 0.19, 0.085) + idle(lf, 1.2, 41);
  const armLenL = 176 + rk * 10 + settle(lf, 48, 6.5, 0.15, 0.12) + idle(lf, 2.2, 63, 1.1);
  // the right arm never leaves the joint, and it visibly takes the whole load
  const armAngR = 26 + rk * 5 + Math.sin(lf * 2.4) * (0.9 + rk * 1.4) + idle(lf, 1.4, 53, 1.7);
  const armLenR = 176 + rk * 6 + idle(lf, 2.0, 37, 0.6);

  // the fingertip, so the gap to the phone is measured and not guessed
  const radL = (armAngL * Math.PI) / 180;
  const tipX = S2_SHL.x - Math.sin(radL) * (armLenL + 26);
  const tipY = S2_SHL.y + Math.cos(radL) * (armLenL + 26);
  const gapO = Math.max(0, over(lf, 50, 4) - over(lf, 58, 4));

  // ---- the owner ---------------------------------------------------------
  const stern = 0.3 + 0.4 * over(lf, 10, 14) + 0.22 * rk;
  // he looks AT the phone from f38 and only goes back to the pipe after he fails
  const flick = -7 * (over(lf, 36, 5) - over(lf, 68, 8)) - 3 * (over(lf, 26, 3) - over(lf, 32, 4));
  const leanDx = -22 * rk;
  const leanRot = -2.6 * rk + settle(lf, 65, 1.1, 0.18, 0.09);
  const grunt1 = squash(lf, 34, 0.055, 3);
  const grunt2 = squash(lf, 70, 0.05, 3);

  // the water DOUBLES the instant a hand leaves the joint. Cause and effect.
  const spray = 0.86 + 0.16 * Math.sin(lf / 6.4) + 1.2 * rk;

  // ---- the phone ---------------------------------------------------------
  const bz = (a: number, b: number) => Math.max(0, over(lf, a, 3) - over(lf, b, 5));
  const buzz = 0.32 + 0.68 * Math.max(bz(26, 34), Math.max(bz(43, 52), bz(80, 89)));
  const badge = lf < 44 ? 3 : lf < 84 ? 4 : 5;
  const pop = settle(lf, 44, 0.34, 0.2, 0.14) + settle(lf, 84, 0.34, 0.2, 0.14);
  // every burst walks it a little further out of his world
  const skid = -over(lf, 28, 9, Easing.out(Easing.quad)) * 7
    - over(lf, 44, 11, Easing.out(Easing.quad)) * 10
    - over(lf, 82, 9, Easing.out(Easing.quad)) * 9;

  // the warm ring light on the cabinet ceiling. It STOPS MID PULSE at f70.
  const rawRing = 0.5 + 0.5 * Math.sin((Math.min(lf, 70) - 30) / 5.1);
  const ringOn = lf < 30 ? 0.16 : rawRing * (1 - over(lf, 70, 9)) + 0.1;

  // when the key beat lands, everything else steps back for those frames
  const calm = 1 - 0.5 * Math.max(0, over(lf, 46, 5) - over(lf, 60, 5));

  // ---- the ash flake, f52 lands f60, blown away f61 ----------------------
  const fl = over(lf, 52, 8);
  const blow = over(lf, 61, 14);
  const flakeX = 300 + fl * 105 - blow * 190;
  const flakeY = 190 + fl * 240 - blow * 46;
  const flakeO = (lf > 50 ? 1 : 0) * (1 - blow);

  // ---- the villain, revealed by the rack, f64 to f80 ----------------------
  const rack = over(lf, 62, 16, Easing.inOut(Easing.cubic));
  const intBlur = 2 * rack;
  const outBlur = 6 - rack * 6;
  const outO = 0.34 + rack * 0.60;
  const bellEnv = Math.max(0, Math.min(1, over(lf, 65, 4) - over(lf, 80, 8)));
  const bellSw = Math.sin((lf - 65) / 1.75) * 17 * bellEnv;
  const creep = over(lf, 74, 24);                       // still moving at f91

  const pud = ramp(lf, 0, 120);                         // the puddle, advancing all scene
  const torch = Math.sin(lf / 13.5) * calm;

  return (
    <>
      {/* ================= exterior drizzle, panel level, dies with the shell ===== */}
      {shellO > 0.02 && <>
        <div style={{ position: "absolute", inset: 0, opacity: shellO, zIndex: 52, pointerEvents: "none" }}>
          <Drizzle lf={lf} x={-160} y={-320} w={1340} h={1220} n={26} par={0.7} z={52} />
          <Drizzle lf={lf} x={-160} y={-320} w={1340} h={1220} n={9} near={1} z={53} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, opacity: shellO * 0.9, zIndex: 51, pointerEvents: "none" }}>
          <LampCone lf={lf} x={126} i={2} y={-190} h={620} o={0.9} z={51} />
        </div>
      </>}
      {/* the push crosses the whole frame in under 30 frames, so it smears */}
      <SpeedLines lf={lf} x={-90} y={-40} w={1200} h={880} n={13} on={rush * 0.5} hue="rgba(186,206,232,0.32)" z={54} sd={12} />

      {/* ================= THE PUSH GROUP ======================================= */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transformOrigin: "506px 396px", transform: `translate(${dx}px, ${dy}px) scale(${sc})` }}>

        {/* ---- the exterior shop face, four rects around the aperture ---- */}
        {shellO > 0.02 && <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, opacity: shellO }}>
          {[
            { l: -1300, t: -1500, w: 3600, h: 1766 },
            { l: -1300, t: S2_AP.y + S2_AP.h, w: 3600, h: 1500 },
            { l: -1300, t: S2_AP.y, w: 1640, h: S2_AP.h },
            { l: S2_AP.x + S2_AP.w, t: S2_AP.y, w: 1640, h: S2_AP.h },
          ].map((r, i) => (
            <div key={i} style={{
              position: "absolute", left: r.l, top: r.t, width: r.w, height: r.h,
              background: "linear-gradient(180deg,#242B37 0%,#1B212B 62%,#171C25 100%)",
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.5,
                background: "repeating-linear-gradient(0deg, rgba(52,60,74,0.55) 0 20px, rgba(12,16,22,0.5) 20px 23px), repeating-linear-gradient(90deg, transparent 0 46px, rgba(12,16,22,0.45) 46px 49px)",
              }} />
            </div>
          ))}
          {/* the fascia bar and the awning underside above the window */}
          <div style={{ position: "absolute", left: 150, top: 132, width: 720, height: 58, borderRadius: 4, background: "linear-gradient(180deg,#2B3140,#161B24)", border: "2px solid #39404E", boxShadow: "0 8px 18px rgba(6,8,14,0.6)" }}>
            <div style={{ position: "absolute", inset: 2, borderRadius: 3, background: `linear-gradient(180deg, ${S2_AMB}22, transparent 72%)`, opacity: 0.7 + 0.3 * Math.sin(lf / 19) }} />
          </div>
          <div style={{ position: "absolute", left: 150, top: 192, width: 720, height: 30, background: "repeating-linear-gradient(90deg,#5E2E26 0 26px,#C9BCA4 26px 52px)", opacity: 0.55, transformOrigin: "50% 0%", transform: `scaleY(${(1 + Math.sin(lf / 21) * 0.03).toFixed(4)})` }} />
          <div style={{ position: "absolute", left: 150, top: 222, width: 720, height: 8, background: "#12161E" }} />
          {/* the stoop steps and the wet pavement smear below the window */}
          <div style={{ position: "absolute", left: 210, top: 546, width: 600, height: 22, background: "#39404C" }} />
          <div style={{ position: "absolute", left: 210, top: 546, width: 600, height: 4, background: "rgba(190,208,232,0.16)" }} />
          <div style={{ position: "absolute", left: 190, top: 568, width: 640, height: 24, background: "#2E3540" }} />
          <div style={{ position: "absolute", left: 120, top: 592, width: 800, height: 130, background: "linear-gradient(180deg,#252C38,#171C25)" }} />
          <div style={{
            position: "absolute", left: 300, top: 596, width: 420, height: 118, opacity: 0.26,
            background: `linear-gradient(180deg, ${S2_AMB}, transparent 84%)`, filter: "blur(9px)",
            transform: `scaleX(${1 + Math.sin(lf / 24) * 0.03})`,
          }} />
          {/* a blurred near kerb so the exterior has a foreground tier */}
          <div style={{ position: "absolute", left: -60, top: 704, width: 1140, height: 46, background: "#0A0E16", filter: "blur(2.5px)" }} />
          <div style={{ position: "absolute", left: -60, top: 704, width: 1140, height: 4, background: "rgba(150,175,210,0.18)", filter: "blur(2.5px)" }} />
          {/* the window's own brass free frame */}
          <div style={{ position: "absolute", left: S2_AP.x - 15, top: S2_AP.y - 15, width: S2_AP.w + 30, height: S2_AP.h + 30, border: "15px solid #39404C", borderRadius: 4, boxShadow: "0 10px 24px rgba(10,14,26,0.5), inset 0 0 22px rgba(0,0,0,0.7)" }} />
        </div>}

        {/* ---- THE APERTURE. The interior authored at full panel size and shrunk
             into the window, so at push = 1 it lands exactly 1:1. ---- */}
        <div style={{ position: "absolute", left: S2_AP.x, top: S2_AP.y, width: S2_AP.w, height: S2_AP.h, overflow: "hidden", background: "#120C09" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transformOrigin: "0 0", transform: `scale(${1 / S2_K})` }}>

            {/* ======= INTERIOR: warm amber, oxblood tile, one calendar, one wheel ======= */}
            <div style={{ position: "absolute", inset: 0, filter: `blur(${intBlur}px)` }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${S2_WALL} 0%, #2A1D14 44%, #1A120C 100%)` }} />
              {/* the oxblood tiled splashback */}
              <div style={{ position: "absolute", left: 0, top: 430, width: 1012, height: 230, opacity: 0.9 }}>
                {Array.from({ length: 60 }, (_, i) => {
                  const r = Math.floor(i / 15), c = i % 15;
                  const s = seed(i * 2.71 + 9);
                  return <div key={i} style={{
                    position: "absolute", left: c * 70 + (r % 2 ? 34 : 0), top: r * 58, width: 64, height: 52, borderRadius: 2,
                    background: `rgba(${Math.round(94 + s * 22)},${Math.round(42 + s * 14)},${Math.round(36 + s * 10)},0.95)`,
                    borderBottom: "3px solid rgba(28,14,10,0.75)", borderRight: "2px solid rgba(28,14,10,0.5)",
                  }} />;
                })}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${S2_TILE}00, rgba(12,8,5,0.55))` }} />
              </div>
              {/* the flagstone floor, so the cabinet lip never leaves a lighter gap */}
              <div style={{ position: "absolute", left: 0, top: 626, width: 1012, height: 170, background: "linear-gradient(180deg,#150F0A,#080604)" }} />
              {/* the amber lamp wash on the back wall */}
              <div style={{ position: "absolute", left: 250, top: 180, width: 620, height: 420, borderRadius: "50%", background: `radial-gradient(ellipse, ${S2_AMB}, transparent 66%)`, opacity: 0.22 + 0.03 * Math.sin(lf / 16), filter: "blur(30px)", mixBlendMode: "screen" }} />

              {/* the wall calendar with one day circled and one tiny tick nobody explains */}
              <div style={{ position: "absolute", left: 78, top: 216, width: 132, height: 118, background: "#D8CCB6", border: "3px solid #6E5C44", boxShadow: "0 7px 14px rgba(6,4,2,0.6)", transformOrigin: "50% 0%", transform: `rotate(${(-2 + drift(lf, 0.9, 96) * calm).toFixed(3)}deg)` }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 126, height: 22, background: "#7A4A34" }} />
                {Array.from({ length: 28 }, (_, i) => (
                  <div key={i} style={{ position: "absolute", left: 8 + (i % 7) * 17, top: 32 + Math.floor(i / 7) * 18, width: 9, height: 9, background: "rgba(64,48,32,0.42)" }} />
                ))}
                <div style={{ position: "absolute", left: 40, top: 64, width: 22, height: 22, borderRadius: "50%", border: `3px solid ${S2_OX}` }} />
                <div style={{ position: "absolute", left: 96, top: 90, width: 12, height: 3, background: "#4A3A26", transform: "rotate(38deg)" }} />
                <div style={{ position: "absolute", left: 101, top: 88, width: 16, height: 3, background: "#4A3A26", transform: "rotate(-42deg)" }} />
              </div>

              {/* the wall mounted shutoff wheel with one stencilled exclamation mark.
                  Never touched. A Mission Impossible tease that goes nowhere. It
                  creeps open a few degrees all scene under the water pressure. */}
              <div style={{ position: "absolute", left: 116, top: 336, width: 118, height: 118, transform: `rotate(${(over(lf, 0, 91, Easing.linear) * 9 + Math.sin(lf / 11) * 1.6 * calm).toFixed(3)}deg)` }}>
                <div style={{ position: "absolute", left: 8, top: 8, width: 102, height: 102, borderRadius: "50%", border: `13px solid ${S2_OX}`, boxShadow: "0 6px 12px rgba(4,2,1,0.6)" }} />
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ position: "absolute", left: 55, top: 12, width: 8, height: 94, background: S2_OX, transformOrigin: "50% 50%", transform: `rotate(${i * 45}deg)` }} />
                ))}
                <div style={{ position: "absolute", left: 54, top: 40, width: 10, height: 26, background: "#EFE3D6", opacity: 0.72 }} />
                <div style={{ position: "absolute", left: 54, top: 70, width: 10, height: 10, background: "#EFE3D6", opacity: 0.72 }} />
              </div>

              {/* the moving torch pool bounced off the cabinet ceiling onto the wall */}
              <div style={{
                position: "absolute", left: 618 + torch * 66, top: 524 + torch * 26, width: 300, height: 150, borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(246,226,186,0.95), transparent 66%)", opacity: 0.2, filter: "blur(22px)", mixBlendMode: "screen",
              }} />
              {/* the warm ring light the phone throws up onto the ceiling. Stops mid pulse at f70. */}
              <div style={{
                position: "absolute", left: 34, top: 494, width: 330, height: 148, borderRadius: "50%",
                background: `radial-gradient(ellipse, ${S2_AMB}, transparent 68%)`, opacity: 0.34 * ringOn, filter: "blur(24px)", mixBlendMode: "screen",
              }} />

              {/* ======= THE WINDOW BEHIND HIM, and the street beyond it ======= */}
              {/* dropped to top 178 so the villain's head and the CLOSED sign clear
                  the panel's y 210 header line instead of being cut off by it */}
              <div style={{ position: "absolute", left: 460, top: 178, width: 440, height: 312, borderRadius: 3, border: "13px solid #2E3540", overflow: "hidden", background: "#0A0E18", boxShadow: "inset 0 0 30px rgba(0,0,0,0.85), 0 8px 18px rgba(4,6,10,0.6)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 414, height: 286, filter: `blur(${outBlur}px)`, opacity: outO }}>
                  {/* far tier: navy backs and two ghost windows */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0B1018 0%,#151C2C 48%,#222A38 100%)" }} />
                  {Array.from({ length: 9 }, (_, i) => {
                    const s = seed(i * 5.9 + 3);
                    return <div key={i} style={{ position: "absolute", left: i * 48 + s * 14, top: 108 - s * 62, width: 40 + s * 24, height: 130 + s * 60, background: NAVYBACK, borderTop: "3px solid #1E2532", filter: "blur(2.4px)", opacity: 0.9 }} />;
                  })}
                  <div style={{ position: "absolute", left: 74, top: 66, width: 15, height: 20, background: "#C9A86A", opacity: 0.55 * s2Flick2(lf, 0), filter: "blur(1.4px)" }} />
                  <div style={{ position: "absolute", left: 292, top: 84, width: 13, height: 18, background: "#B9A278", opacity: 0.45 * s2Flick2(lf, 3), filter: "blur(1.4px)" }} />
                  {/* the street lamp glow across the road */}
                  <div style={{ position: "absolute", left: 44, top: 26, width: 190, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(240,201,138,0.9), transparent 66%)", opacity: 0.17 * (0.92 + 0.08 * Math.sin(lf / 17)), filter: "blur(16px)", mixBlendMode: "screen" }} />
                  {/* the wet pavement he is standing on */}
                  <div style={{ position: "absolute", left: 0, top: 236, width: 414, height: 50, background: "linear-gradient(180deg,#2A313E,#161B24)" }} />
                  <div style={{ position: "absolute", left: 0, top: 236, width: 414, height: 3, background: "rgba(170,192,220,0.2)" }} />
                  <div style={{ position: "absolute", left: 120, top: 244, width: 220, height: 34, borderRadius: "50%", background: "rgba(120,150,190,0.16)", filter: "blur(6px)", transform: `scaleX(${1 + Math.sin(lf / 27) * 0.03})` }} />
                  <Drizzle lf={lf} x={-20} y={-60} w={460} h={380} n={17} par={0.8} z={12} />
                  <Pigeon lf={lf} y={18} at={64} dur={34} x0={-110} x1={470} o={0.55} z={13} />

                  {/* NOBODY HOME. Translucent, no shadow, dust pooling, and he is
                      desaturated so the scene keeps its no gold ruling. */}
                  <div style={{ position: "absolute", left: 0, top: 0, width: 414, height: 286, filter: "saturate(0.3) brightness(0.92)" }}>
                    <Nobody lf={lf} x={318} y={250} size={196} pole={0} tally={0} dust={1} z={14} tilt={0.4} />
                    {/* his hand bell with the grey clapper, rung at glass he is never
                        heard through. The clapper LAGS the bell by three frames. */}
                    <div style={{ position: "absolute", left: 236, top: 132, width: 44, height: 54, zIndex: 26, transformOrigin: "50% 0%", transform: `rotate(${-14 + bellSw}deg)`, opacity: 0.62 }}>
                      <div style={{ position: "absolute", left: 18, top: 0, width: 6, height: 14, background: "#4A505A" }} />
                      <div style={{ position: "absolute", left: 4, top: 12, width: 36, height: 30, borderRadius: "18px 18px 4px 4px", background: grad("#7A8090", "#3E444E") }} />
                      <div style={{ position: "absolute", left: 0, top: 40, width: 44, height: 7, borderRadius: 3, background: "#5C6270" }} />
                      <div style={{
                        position: "absolute", left: 19, top: 45, width: 7, height: 9, borderRadius: "50%", background: "#8E8B84",
                        transformOrigin: "50% -420%", transform: `rotate(${(Math.sin((lf - 68) / 1.75) * 22 * bellEnv).toFixed(2)}deg)`,
                      }} />
                    </div>
                  </div>
                </div>

                {/* the glass itself: rain beads and one specular streak, sharpening on the rack */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 414, height: 286, filter: `blur(${outBlur * 0.5}px)`, opacity: 0.4 + rack * 0.5 }}>
                  {Array.from({ length: 26 }, (_, i) => {
                    const s = seed(i * 4.41 + 17);
                    const yy = ((lf * (0.4 + s * 0.7) + s * 300) % 300) - 8;
                    return <div key={i} style={{
                      position: "absolute", left: s * 400, top: yy, width: 4 + s * 5, height: 6 + s * 12,
                      borderRadius: "50% 50% 48% 48%", background: "rgba(200,224,250,0.34)", boxShadow: "inset 0 -2px 3px rgba(255,255,255,0.3)",
                    }} />;
                  })}
                  <div style={{ position: "absolute", left: -40, top: -30, width: 150, height: 400, background: "linear-gradient(180deg, rgba(226,240,255,0.14), transparent 70%)", transform: "rotate(18deg)", filter: "blur(7px)" }} />
                </div>

                {/* the CLOSED sign, read in reverse from the inside. It swings, and
                    the two hanging chains lag it. */}
                <div style={{ position: "absolute", left: 32, top: 26, width: 118, height: 74, zIndex: 20, transformOrigin: "50% 0%", transform: `rotate(${(drift(lf, 1.8, 52) + settle(lf, 62, 1.4, 0.16, 0.08)).toFixed(3)}deg)` }}>
                  <div style={{ position: "absolute", left: 30, top: 0, width: 2, height: 20, background: "#3A4150" }} />
                  <div style={{ position: "absolute", left: 84, top: 0, width: 2, height: 20, background: "#3A4150" }} />
                  <div style={{
                    position: "absolute", left: 0, top: 18, width: 118, height: 46, borderRadius: 4, background: "#2B2F38", border: "3px solid #171B22",
                    display: "flex", alignItems: "center", justifyContent: "center", transform: "scaleX(-1)",
                    fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: "0.08em", color: "#8E939C",
                    boxShadow: "0 4px 9px rgba(4,6,10,0.6)",
                  }}>CLOSED</div>
                </div>
              </div>

              {/* ======= the water fan, then THE OWNER over it ======= */}
              <S2Fan lf={lf} amt={spray} />

              <div style={{
                position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 30,
                transformOrigin: "470px 700px",
                transform: `translateX(${leanDx.toFixed(2)}px) rotate(${leanRot.toFixed(3)}deg) scale(${(grunt1.sx * grunt2.sx).toFixed(4)}, ${(grunt1.sy * grunt2.sy).toFixed(4)})`,
              }}>
                <Owner lf={lf} x={470} y={618} size={440} kneel={1} gaze={flick} stern={stern} reach={0} z={30} />
              </div>

              {/* the beads the spray leaves ON his cheek, and the blink */}
              {[0, 1, 2].map((i) => {
                const s = seed(i * 7.3 + 2);
                const tw = 0.35 + 0.65 * Math.abs(Math.sin(lf / (7 + i * 3) + i));
                const run = ((lf * (0.5 + s * 0.4) + i * 21) % 40) / 40;   // beads run down his cheek
                return <div key={i} style={{
                  position: "absolute", left: 360 + i * 17 + leanDx * 0.8, top: 408 + i * 21 + run * 16, width: 8 + s * 5, height: 10 + s * 6,
                  borderRadius: "50% 50% 46% 46%", background: "rgba(214,236,255,0.55)", opacity: tw * (1 - run) * (0.6 + spray * 0.25), zIndex: 33,
                }} />;
              })}

              {/* THE ASH FLAKE. He blows it away without knowing what it is. */}
              {flakeO > 0.02 && <div style={{
                position: "absolute", left: flakeX, top: flakeY, width: 11, height: 11, zIndex: 36, opacity: flakeO * 0.9,
                transform: `rotate(${lf * 5}deg)`, background: CHALK, borderRadius: 2, filter: "blur(0.6px)",
              }} />}
              {blow > 0.02 && Array.from({ length: 5 }, (_, i) => {
                const s = seed(i * 6.1 + 12);
                return <div key={i} style={{
                  position: "absolute", left: flakeX - blow * (40 + s * 90), top: flakeY - blow * (10 + s * 46),
                  width: 4, height: 4, borderRadius: "50%", background: CHALK, opacity: (1 - blow) * 0.5, zIndex: 36,
                }} />;
              })}

              {/* the dropped toolbox at blur(1.5px), and the who ya gonna call sticker
                  faded on the inside of the cabinet door */}
              <div style={{ position: "absolute", left: 736, top: 646, width: 152, height: 86, zIndex: 41, filter: "blur(1.5px)", transformOrigin: "50% 100%", transform: `rotate(${(-6 + drift(lf, 1.1, 88) * calm).toFixed(3)}deg)` }}>
                <div style={{ position: "absolute", left: 0, top: 22, width: 158, height: 62, borderRadius: 4, background: grad("#4A3226", "#231710") }} />
                <div style={{ position: "absolute", left: 0, top: 22, width: 158, height: 6, background: "rgba(180,200,224,0.14)" }} />
                <div style={{ position: "absolute", left: 52, top: 0, width: 54, height: 26, borderRadius: "14px 14px 0 0", border: "6px solid #3A2A1E", borderBottom: "none" }} />
              </div>
              <div style={{ position: "absolute", left: 574, top: 682, width: 128, height: 128, zIndex: 42, opacity: 0.42 + 0.06 * Math.sin(lf / 23), transform: `rotate(${(-9 + idle(lf, 0.7, 104)).toFixed(3)}deg)` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `12px solid ${S2_OX}` }} />
                <div style={{ position: "absolute", left: 40, top: 44, width: 46, height: 12, borderRadius: 5, background: S2_OX, transform: "rotate(-30deg)" }} />
                <div style={{ position: "absolute", left: 32, top: 36, width: 16, height: 16, borderRadius: "50%", background: S2_OX }} />
                <div style={{ position: "absolute", left: 76, top: 54, width: 16, height: 16, borderRadius: "50%", background: S2_OX }} />
                <div style={{ position: "absolute", left: 12, top: 58, width: 104, height: 12, background: S2_OX, transform: "rotate(-45deg)", transformOrigin: "50% 50%" }} />
              </div>

              {/* ======= THE CABINET MOUTH, THE JOINT, AND BOTH FISTS ON IT ======= */}
              <S2Mouth lf={lf} oneHand={rk} strain={strain} />

              {/* the arms, drawn over the mouth so the eye follows them straight
                  down out of his shoulders into the dark and onto the joint */}
              <S2Arm x={S2_SHR.x} y={S2_SHR.y} ang={armAngR} len={armLenR} w={44} open={0} z={48} />
              {/* the reaching arm gets a real smear on the frames it whips */}
              <div style={{ position: "absolute", left: 0, top: 0, zIndex: 48 }}>
                {[0, 1, 2].map((g) => {
                  const back = over(lf - (g + 1) * 1.6, 58, 6, Easing.out(Easing.poly(5)));
                  const a = antic(lf - (g + 1) * 1.6, 40, 8, 0.24, Easing.out(Easing.back(2.2))) * (1 - back);
                  const ghostA = -28 + a * 42;
                  const ghostL = 176 + Math.max(0, a) * 10;
                  const vis = Math.max(0, over(lf, 42, 3) - over(lf, 50, 4)) + Math.max(0, over(lf, 58, 2) - over(lf, 64, 4));
                  if (vis < 0.03) return null;
                  return <div key={g} style={{ opacity: vis * 0.26 * (1 - g * 0.28), filter: `blur(${1 + g * 1.6}px)` }}>
                    <S2Arm x={S2_SHL.x} y={S2_SHL.y} ang={ghostA} len={ghostL} w={46} open={0} z={48} />
                  </div>;
                })}
              </div>
              <S2Arm x={S2_SHL.x} y={S2_SHL.y} ang={armAngL} len={armLenL} w={46} open={Math.min(1, rk * 1.4)} z={48} />

              {/* THE GAP HE CANNOT CLOSE. A thin measured span of empty air between
                  his fingertips and the handset, held for twelve frames. No words. */}
              {gapO > 0.02 && <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 50, pointerEvents: "none", opacity: gapO * 0.92 }}>
                {Array.from({ length: 7 }, (_, i) => {
                  const t = (i + 0.5) / 7;
                  const gx = tipX + (S2_PHX + skid + 152 - tipX) * t;
                  const gy = tipY + (S2_PHY + 24 - tipY) * t;
                  return <div key={i} style={{
                    position: "absolute", left: gx - 8, top: gy - 2.5, width: 16, height: 5, borderRadius: 3,
                    background: "rgba(198,222,246,0.9)",
                    opacity: 0.35 + 0.65 * Math.abs(Math.sin(lf / 4.2 + i * 0.7)),
                  }} />;
                })}
                <div style={{ position: "absolute", left: tipX - 2, top: tipY - 15, width: 4, height: 30, background: "rgba(198,222,246,0.92)" }} />
                <div style={{ position: "absolute", left: S2_PHX + skid + 152, top: S2_PHY + 9, width: 4, height: 30, background: "rgba(198,222,246,0.92)" }} />
              </div>}

              {/* THE JET. Water arcs out of the joint and lands right across the gap,
                  so the reason the gap cannot be closed is in the same frame. */}
              {Array.from({ length: 26 }, (_, i) => {
                const s0 = seed(i * 5.77 + 6), s1 = seed(i * 2.13 + 14);
                const dur = varyDur(i, 30, 0.3);
                const st = (lf + stagger(i, 2.2)) % dur;
                const t = st / dur;
                const px = 430 - (180 + s0 * 175) * over(st, 0, dur, Easing.out(Easing.quad));
                const py = arcY(st, 0, dur, 690, vary(i, 74, 0.5) * (0.5 + spray * 0.4), 742 + s1 * 22);
                const sz = 4 + s1 * 5;
                return <div key={i} style={{
                  position: "absolute", left: px, top: py, width: sz, height: sz * 1.5, borderRadius: "50% 50% 46% 46%",
                  background: S2_WET, opacity: (1 - t * t) * (0.42 + spray * 0.34), zIndex: 47, pointerEvents: "none",
                }} />;
              })}

              {/* THE PHONE he cannot reach */}
              <S2Phone lf={lf} badge={badge} buzz={buzz} skid={skid} pop={pop} />

              {/* drips off the cabinet rim, so the lower band is never a dead bar */}
              {Array.from({ length: 6 }, (_, i) => {
                const s = seed(i * 8.9 + 27);
                const dur = varyDur(i, 34, 0.3);
                const st = (lf + stagger(i, 6)) % dur;
                const t = st / dur;
                return <div key={i} style={{
                  position: "absolute", left: 320 + s * 350, top: gravity(st, 0, dur, 632, 776),
                  width: 4, height: 5 + t * 8, borderRadius: "50% 50% 46% 46%", background: S2_WET,
                  opacity: (1 - t * 0.5) * 0.42, zIndex: 46,
                }} />;
              })}

              {/* THE PUDDLE, advancing toward the lens the whole scene */}
              <div style={{
                position: "absolute", left: 506 - (240 + pud * 290), top: 700 - pud * 76, width: (240 + pud * 290) * 2, height: 150 + pud * 70,
                borderRadius: "50% 50% 0 0", zIndex: 43,
                background: "linear-gradient(180deg, rgba(122,150,190,0.34), rgba(24,32,44,0.62) 46%, rgba(12,16,22,0.9))",
                filter: "blur(3px)", transform: `scaleX(${1 + Math.sin(lf / 19) * 0.014})`,
              }}>
                <div style={{ position: "absolute", left: "22%", top: 12, width: "40%", height: 22, borderRadius: "50%", background: `${S2_AMB}55`, filter: "blur(7px)", transform: `translateX(${Math.sin(lf / 15) * 12}px)` }} />
              </div>
              {/* rings where the jet keeps hitting the puddle, staggered and decaying */}
              {Array.from({ length: 3 }, (_, i) => {
                const dur = 26 + i * 5;
                const t = ((lf + stagger(i, 9)) % dur) / dur;
                const rr = 14 + t * (74 + i * 16);
                return <div key={i} style={{
                  position: "absolute", left: 214 + i * 46 - rr, top: 730 - rr * 0.3, width: rr * 2, height: rr * 0.6,
                  borderRadius: "50%", border: "2px solid rgba(174,202,228,0.5)", opacity: (1 - t) * 0.4,
                  filter: "blur(1.6px)", zIndex: 44, pointerEvents: "none",
                }} />;
              })}

              {/* the villain's grey dust creeping in under the door, bottom left */}
              {creep > 0.02 && <div style={{
                position: "absolute", left: -40, top: 618, width: 160 + creep * 420, height: 150, zIndex: 45,
                background: `radial-gradient(ellipse at 6% 60%, ${CHALK}, transparent 66%)`, opacity: 0.3 * creep, filter: "blur(16px)", pointerEvents: "none",
              }} />}
              {creep > 0.02 && Array.from({ length: 9 }, (_, i) => {
                const s = seed(i * 3.53 + 21);
                const p = ((lf * (0.7 + s * 0.9) + s * 70) % 70) / 70;
                return <div key={i} style={{
                  position: "absolute", left: -20 + p * (180 + creep * 340), top: 664 + s * 96 - p * 26,
                  width: 5, height: 5, borderRadius: "50%", background: CHALK, opacity: (1 - p) * 0.42 * creep, zIndex: 46,
                }} />;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= the glass pane sliding past the lens, f0 to f24 ======= */}
      {glassO > 0.01 && <div style={{
        position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 56, opacity: glassO,
        filter: "blur(2px)", transformOrigin: "506px 396px", transform: `scale(${glassSc})`, pointerEvents: "none",
      }}>
        {Array.from({ length: 22 }, (_, i) => {
          const s = seed(i * 5.13 + 31);
          const yy = ((lf * (2.2 + s * 3.1) + s * 792) % 792);
          return <div key={i} style={{
            position: "absolute", left: s * 1012, top: yy, width: 7 + s * 9, height: 11 + s * 20,
            borderRadius: "50% 50% 46% 46%", background: "rgba(198,224,250,0.42)",
            boxShadow: "inset 0 -3px 5px rgba(255,255,255,0.34)",
          }} />;
        })}
        <div style={{ position: "absolute", left: 40, top: -140, width: 240, height: 1100, background: "linear-gradient(180deg, rgba(226,240,255,0.16), transparent 72%)", transform: "rotate(16deg)", filter: "blur(10px)" }} />
        <div style={{ position: "absolute", left: 640, top: -140, width: 130, height: 1100, background: "linear-gradient(180deg, rgba(226,240,255,0.1), transparent 68%)", transform: "rotate(16deg)", filter: "blur(10px)" }} />
      </div>}

      {/* a light matte vignette, no coloured halo anywhere in this scene. It
          closes down a little on the hold so the reach is the brightest read. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 57, pointerEvents: "none", boxShadow: `inset 0 0 ${(170 + (1 - calm) * 120).toFixed(0)}px rgba(8,6,4,${(0.5 + (1 - calm) * 0.22).toFixed(3)})` }} />

      <SceneTag f={lf + 24} text="BOTH HANDS FULL" color="#8FA9C6" />
    </>
  );
};

// a small flicker for the two ghost windows across the street, kept out of the
// scene body so the JSX above stays readable.
function s2Flick2(f: number, i: number) { return 0.86 + 0.14 * Math.sin(f / (13 + i * 4) + i * 1.9); }

// ==== part: 13_S3.tsx ====

// ===========================================================================
// SCENE 3, THE FIT-OUT. 231 frames, lf 0 to 230. Verb: UNFOLD.
// Camera verb: hold absolutely still, then crane.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   Camera locked at CAMS.STOOP on Pipe Bros. Door and hanging CLOSED sign at
//   screen left, the empty booth mount stoop dead centre, the hero at screen
//   right. THE FLAT PACK CRATE IS ALREADY FALLING, 44 world px above the stoop,
//   with a motion streak under it and the hero's arm mid follow through. The
//   villain is already standing on the top stoop step, translucent at 0.62, no
//   shadow, dust pooling, hook pole resting tip down across the threshold, visor
//   already drifting on its idle. Pip is already stacking crate offcuts into a
//   Tetris wall with one piece that will never fit, already wobbling. Drizzle at
//   two parallax speeds, four lamp cones flickering out of phase, wet pavement
//   reflections breathing, Drip Bros magenta pinned to the extreme right edge,
//   the arcade cabinet in Sparks' window already running, the alley steam vent
//   already venting, SceneTag and HUD already solid. Zero empty quadrants.
//
// AT FRAME 230: the brass tag still swinging on its chain, the till still
// rocking from the third coin, the thermos still steaming, the riser still
// glowing from the last coin, three brackets still empty, roof drizzle falling,
// the hero's pen still moving. Cut from mid motion.
// ===========================================================================

const S3_BACK = Easing.out(Easing.back(1.6));
const S3_INOUT = Easing.inOut(Easing.cubic);

// world anchors, all derived from the locked geometry of shop 0 (Pipe Bros)
const S3_BOOTH = boothX(0);             // 440, booth mount left
const S3_BOOTHC = S3_BOOTH + 50;        // 490, booth centre
const S3_HOPX = 545, S3_HOPY = 372;     // the brass hopper bolted to the booth's right rail
const S3_HEROX = 630;                   // hero on the pavement, right of the booth
const S3_CRATEX = 560;                  // the flat pack, on the pavement under his boot
const S3_LANT = { x: S3_BOOTHC, y: 344 };
const S3_TUBEX = 570;                   // Street's tube for shop 0 runs world x 570..600
const S3_SLOT1 = { x: 198, y: 332 };    // slot 1 of the awning booking board
// the four unfold stages: frame, height on the booth, flare width, mass
const S3_LOCKS = [
  { at: 18, y: 554, w: 110, m: 1.0 },   // base plate bolts down
  { at: 24, y: 452, w: 96, m: 0.8 },    // side rails rise and lock
  { at: 30, y: 400, w: 88, m: 0.62 },   // glass panel slides up
  { at: 36, y: 340, w: 70, m: 0.72 },   // lantern hinges up
];

// the pre crane sink, factored out so the crane can start from exactly where the
// sink ended and the two moves never cut against each other.
const S3_PRECRANE = (a: number) => ({ x: CAMS.TWO.x + 12 * a, y: CAMS.TWO.y + 34 * a, z: CAMS.TWO.z * (1 + 0.05 * a) });

// staged camera. STOOP locked, dead still through the ignition, a 12% push, a
// lateral drift that walks the booth's specular across the glass, a pull to TWO
// for the ticket, then the crane up the brickwork to ROOF.
const s3Cam = (lf: number) => {
  if (lf < 52) return camFor(230, 470, 1.35);
  if (lf < 96) return camFor(230, 470, 1.35 + 0.16 * over(lf, 52, 44, S3_INOUT));
  if (lf < 130) return camFor(230 + 38 * over(lf, 96, 34, S3_INOUT), 470, 1.51);
  if (lf < 166) return lerpCam(camFor(268, 470, 1.51), CAMS.TWO, over(lf, 130, 36, S3_INOUT));
  // f166 to f180 is NOT a hold. The camera sinks toward the door slot with the
  // coin, which doubles as the anticipation for the crane: it goes DOWN before
  // it goes up. This is the frame range the difference pass flagged as dead.
  if (lf < 180) return S3_PRECRANE(over(lf, 166, 14, S3_INOUT));
  if (lf < 206) return lerpCam(S3_PRECRANE(1), CAMS.ROOF, over(lf, 180, 26, S3_INOUT));
  return { x: CAMS.ROOF.x, y: CAMS.ROOF.y, z: CAMS.ROOF.z * (1 + 0.04 * Math.sin((lf - 206) / 12.5)) };
};

// a decaying mechanical jolt, used for the crate landing and the four locks
const s3Jolt = (lf: number, at: number, amp: number, decay = 9) => {
  const d = lf - at;
  if (d < 0 || d > decay * 2) return 0;
  return Math.sin(d * 1.5) * amp * Math.max(0, 1 - d / (decay * 2));
};

// THE FLAT PACK CRATE. Stencilled with a wordless four step assembly diagram and
// a hex key taped to the lid. Geometric, unmistakable, zero trademark.
const S3_Crate: React.FC<{ lf: number; x: number; y: number; open: number }> = ({ lf, x, y, open }) => {
  const glint = 0.4 + 0.6 * Math.abs(Math.sin(lf / 17));
  return (
    <div style={{ position: "absolute", left: x, top: y - 62, width: 132, height: 62, zIndex: 21 }}>
      <div style={{ position: "absolute", left: 0, top: 8, width: 132, height: 54, borderRadius: 3, background: grad("#B0894F", "#6E5330"), border: "3px solid #4E3C20", boxShadow: "0 10px 20px rgba(8,10,18,0.55)" }} />
      {/* the four step wordless assembly stencil */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 8 + i * 31, top: 18, width: 26, height: 26, border: "2px solid rgba(52,40,20,0.75)", borderRadius: 2 }}>
          <div style={{ position: "absolute", left: 4, bottom: 4, width: 18, height: 3 + i * 4, background: "rgba(52,40,20,0.7)" }} />
          {i > 1 && <div style={{ position: "absolute", left: 4, bottom: 4, width: 3, height: 16, background: "rgba(52,40,20,0.7)" }} />}
          {i > 2 && <div style={{ position: "absolute", left: 8, top: 3, width: 12, height: 5, background: "rgba(52,40,20,0.7)" }} />}
        </div>
      ))}
      {/* the lid slides off flat onto the wet pavement, and the hex key taped to
          it catches the lamp. It never rotates up, so it never crosses the hero. */}
      <div style={{ position: "absolute", left: -3 + open * 64, top: open * 52, width: 138, height: 12, borderRadius: 3, background: grad("#C69A58", "#7C5E36"), border: "2px solid #4E3C20", transform: `rotate(${open * 4}deg)` }}>
        <div style={{ position: "absolute", left: 52, top: -7, width: 4, height: 22, background: "#B8BEC8", transform: "rotate(16deg)", opacity: glint }} />
        <div style={{ position: "absolute", left: 52, top: 12, width: 16, height: 4, background: "#B8BEC8", transform: "rotate(16deg)", opacity: glint }} />
        <div style={{ position: "absolute", left: 44, top: 1, width: 30, height: 7, background: "rgba(236,228,206,0.55)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 138, height: 3, background: `rgba(255,242,208,${0.2 + 0.25 * glint})` }} />
      </div>
    </div>
  );
};

// nine brass screws bouncing out toward the lens on the crate impact
const S3_Screws: React.FC<{ lf: number; at: number; x: number; y: number }> = ({ lf, at, x, y }) => {
  const d = lf - at;
  if (d < 0 || d > 52) return null;
  return (
    <>{Array.from({ length: 9 }, (_, i) => {
      const s = seed(i * 5.7 + 3);
      const t = Math.min(1, d / (26 + s * 20));
      const vx = (s - 0.35) * 190;
      // they bounce TOWARD THE LENS, downward and outward, so no screw ever
      // crosses the hero standing behind them
      const bounce = Math.abs(Math.sin(t * Math.PI * 2.2)) * (1 - t) * 22;
      const sz = 7 + s * 6 + t * 11;
      return <div key={i} style={{
        position: "absolute", left: x + vx * t, top: y + t * 44 - bounce, width: sz, height: sz * 0.42, borderRadius: 2,
        background: grad("#E4C468", "#8A6A18"), zIndex: 27, opacity: 1 - t * 0.7,
        filter: t > 0.5 ? `blur(${(t - 0.5) * 5}px)` : "none", transform: `rotate(${d * (7 + s * 9)}deg)`,
      }} />;
    })}</>
  );
};

// the brass lock flare each unfold stage snaps home with
const S3_Lock: React.FC<{ lf: number; at: number; x: number; y: number; w: number }> = ({ lf, at, x, y, w }) => {
  const t = over(lf, at, 11);
  if (t <= 0.01 || t >= 1) return null;
  return (
    <>
      <div style={{ position: "absolute", left: x - w * t * 0.6, top: y - 14, width: w * (1 + t * 1.2), height: 28, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,238,190,0.9), transparent 68%)", opacity: (1 - t) * 0.8, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 26 }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 + at;
        return <div key={i} style={{ position: "absolute", left: x + Math.cos(a) * t * 46, top: y + Math.sin(a) * t * 26, width: 5, height: 5, borderRadius: "50%", background: "#F6E2A8", opacity: (1 - t) * 0.9, zIndex: 27 }} />;
      })}
    </>
  );
};

// THE HERO. Claude the doorman: brass buttoned greatcoat, gold piping, epaulettes,
// bellhop pillbox cap with a small gold C, and from f22 a tool belt of brass door
// fittings. Every prop is held in a nub or hung on the belt, nothing is glued on.
const S3_Hero: React.FC<{ lf: number; x: number; y: number; size?: number; arm: number; belt: number; cheer: number; z?: number }> =
  ({ lf, x, y, size = 170, arm, belt, cheer, z = 23 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z }}>
        <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82} o={0.46} />
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.6} nodSpeed={12} stern={0.3} cheer={cheer} gaze={2} />
        {/* the greatcoat, drawn after the body so overshoot is correct */}
        <div style={{ position: "absolute", left: 30 * u, top: 100 * u, width: 140 * u, height: 54 * u, background: "#B85A3E", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 30 * u, top: 100 * u, width: 140 * u, height: 5 * u, background: "#C96A4C" }} />
        <div style={{ position: "absolute", left: 92 * u, top: 100 * u, width: 4 * u, height: 54 * u, background: GOLD, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: 106 * u, top: 100 * u, width: 4 * u, height: 54 * u, background: GOLD, opacity: 0.85 }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 80 * u, top: (108 + i * 15) * u, width: 8 * u, height: 8 * u, borderRadius: "50%", background: GOLD }} />)}
        {[0, 1, 2].map((i) => <div key={"r" + i} style={{ position: "absolute", left: 114 * u, top: (108 + i * 15) * u, width: 8 * u, height: 8 * u, borderRadius: "50%", background: GOLD }} />)}
        <div style={{ position: "absolute", left: 26 * u, top: 94 * u, width: 34 * u, height: 12 * u, borderRadius: 2, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 140 * u, top: 94 * u, width: 34 * u, height: 12 * u, borderRadius: 2, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 26 * u, top: 94 * u, width: 34 * u, height: 4 * u, background: GOLD, opacity: 0.8 }} />
        <div style={{ position: "absolute", left: 140 * u, top: 94 * u, width: 34 * u, height: 4 * u, background: GOLD, opacity: 0.8 }} />
        {/* the bellhop pillbox cap with the small gold C */}
        <div style={{ position: "absolute", left: 56 * u, top: 18 * u, width: 88 * u, height: 26 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 18 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 39 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.9 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 20 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, lineHeight: 1, color: GOLD }}>C</div>
        {/* THE TOOL BELT of brass door fittings, clipped on at f22 */}
        {belt > 0.02 && <div style={{ position: "absolute", left: 30 * u, top: 138 * u, width: 140 * u, height: 16 * u, opacity: belt }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 140 * u, height: 12 * u, background: "#5A4126", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 0, top: 3 * u, width: 140 * u, height: 3 * u, background: "#6E5230" }} />
          {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: (10 + i * 32) * u, top: 10 * u, width: (i === 1 ? 9 : 14) * u, height: (i === 2 ? 22 : 16) * u, borderRadius: 2, background: grad("#D2AC46", "#7C5E14"), transform: `rotate(${Math.sin(lf / 15 + i) * 4}deg)`, transformOrigin: "50% 0%" }} />)}
        </div>}
        {/* the working arm, drawn over the sprite, with a brass screwdriver in the nub */}
        <div style={{ position: "absolute", left: 160 * u, top: 84 * u, width: 30 * u, height: 26 * u, transformOrigin: "10% 40%", transform: `rotate(${arm}deg)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 30 * u, height: 26 * u, background: HERO, borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 24 * u, top: 8 * u, width: 34 * u, height: 7 * u, borderRadius: 3, background: grad("#D8B24E", "#7C5E14") }} />
          <div style={{ position: "absolute", left: 54 * u, top: 9 * u, width: 16 * u, height: 5 * u, background: "#B8BEC8" }} />
        </div>
      </div>
    );
  };

// the villain's hand bell with the grey clapper, and the dry rings it throws
const S3_Bell: React.FC<{ lf: number; x: number; y: number; swing: number; rings: { at: number; cut?: number }[] }> = ({ lf, x, y, swing, rings }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 34, height: 40, zIndex: 26 }}>
    <div style={{ position: "absolute", left: 14, top: -14, width: 5, height: 16, background: "#4C5058", transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 28, borderRadius: "17px 17px 5px 5px", background: grad("#9A8C6A", "#544C34"), transformOrigin: "50% -14px", transform: `rotate(${swing}deg)` }}>
      <div style={{ position: "absolute", left: 4, top: 5, width: 11, height: 6, borderRadius: "50%", background: "rgba(238,236,226,0.32)" }} />
      <div style={{ position: "absolute", left: 13, top: 26, width: 8, height: 9, borderRadius: "50%", background: "#3A3E46" }} />
    </div>
    {rings.map((r, k) => {
      const d = lf - r.at;
      const life = 22;
      if (d < 0 || d > life) return null;
      // THE CUT. The ring expands normally and is KILLED mid air the instant the
      // grille lights. Shortening its life instead would make it never draw.
      if (r.cut !== undefined && lf >= r.cut) return null;
      return [0, 1].map((i) => {
        const p = Math.max(0, Math.min(1, (d - i * 5) / life));
        if (p <= 0) return null;
        return <div key={k + "-" + i} style={{
          position: "absolute", left: 17 - p * 62, top: 14 - p * 34, width: p * 124, height: p * 68, borderRadius: "50%",
          border: `2px solid ${CHALK}`, opacity: (1 - p) * 0.5, pointerEvents: "none",
        }} />;
      });
    })}
  </div>
);

// a wordless brass chit: the problem, then the address. Punched into the hopper.
const S3_Chit: React.FC<{ lf: number; a: number; b: number; from: [number, number]; to: [number, number]; kind: "pipe" | "house" }> =
  ({ lf, a, b, from, to, kind }) => {
    if (lf < a || lf > b + 26) return null;
    const t = over(lf, a, b - a, S3_INOUT);
    const px = from[0] + (to[0] - from[0]) * t;
    const py = from[1] + (to[1] - from[1]) * t - Math.sin(t * Math.PI) * 62;
    const punch = lf > b ? Math.max(0, 1 - (lf - b) / 8) : 0;
    return (
      <div style={{ position: "absolute", left: px - 22, top: py - 22, width: 44, height: 44, zIndex: 27, transform: `scale(${(0.4 + t * 0.6) * (1 - punch * 0.34)}) rotate(${(1 - t) * -22}deg)`, opacity: lf > b + 12 ? Math.max(0, 1 - (lf - b - 12) / 12) : 1 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: grad("#E2C468", "#A8842A"), border: "3px solid #6A5314", boxShadow: "0 4px 9px rgba(8,10,18,0.55)" }} />
        {kind === "pipe" && <>
          <div style={{ position: "absolute", left: 8, top: 14, width: 24, height: 9, borderRadius: 2, background: "#4E8A46" }} />
          <div style={{ position: "absolute", left: 24, top: 14, width: 9, height: 22, borderRadius: 2, background: "#4E8A46" }} />
          <div style={{ position: "absolute", left: 9, top: 25, width: 9, height: 5, borderRadius: 2, background: "#7C5E14" }} />
        </>}
        {kind === "house" && <>
          <div style={{ position: "absolute", left: 10, top: 20, width: 24, height: 16, background: "#5E4A18" }} />
          <div style={{ position: "absolute", left: 6, top: 10, width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: "12px solid #5E4A18" }} />
          <div style={{ position: "absolute", left: 19, top: 26, width: 7, height: 10, background: "#E2C468" }} />
        </>}
      </div>
    );
  };

// Pip's Tetris wall of crate offcuts. One piece never fits and he keeps trying.
const S3_Tetris: React.FC<{ lf: number; x: number; y: number }> = ({ lf, x, y }) => {
  const wob = Math.sin(lf / 9) * 6;
  return (
    <div style={{ position: "absolute", left: x, top: y - 96, width: 92, height: 96, zIndex: 20 }}>
      {[[0, 72, 46, 22], [46, 72, 46, 22], [0, 50, 24, 22], [24, 50, 68, 22], [0, 28, 46, 22], [46, 28, 24, 22]].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b[0], top: b[1], width: b[2], height: b[3], background: grad("#9A7A50", "#6E5636"), border: "2px solid #4E3C20", borderRadius: 2 }} />
      ))}
      {/* the piece that does not fit */}
      <div style={{ position: "absolute", left: 62 + Math.abs(wob) * 0.5, top: 26 - Math.abs(wob), width: 26, height: 26, background: grad("#B0894F", "#7C5E36"), border: "2px solid #4E3C20", borderRadius: 2, transform: `rotate(${wob}deg)` }} />
      <div style={{ position: "absolute", left: -6, top: 92, width: 104, height: 6, borderRadius: 3, background: "rgba(10,14,22,0.5)", filter: "blur(3px)" }} />
    </div>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  // camera micro shake on the crate landing and the four mechanical locks. It is
  // folded INTO the camera, never applied to the viewport, so the shake can never
  // slide the panel off its own edge and expose the backing plate.
  // It is also damped to exactly zero by f40, because the ignition hold is
  // specified as absolutely still and the f36 lock still rings out to f46.
  // NO BIG MOVE STARTS FROM REST: the camera leans a little the other way over the
  // five frames before each mechanical lock, then takes the hit.
  const s3PreLock = S3_LOCKS.reduce((a, L, i) =>
    a - vary(i, 1.7, 0.22) * over(lf, L.at - 5, 5, Easing.inOut(Easing.sin)) * (1 - over(lf, L.at, 2)), 0);
  const s3Shake = (s3Jolt(lf, 6, 3.4, 6) + s3Jolt(lf, 18, 1.9, 5) + s3Jolt(lf, 24, 1.9, 5)
    + s3Jolt(lf, 30, 1.5, 5) + s3Jolt(lf, 36, 1.7, 5) + s3PreLock) * (1 - over(lf, 37, 3));
  const cam0 = s3Cam(lf);
  // THE CAMERA IS A CHARACTER. Sub pixel handheld and a breathing lens on every
  // single frame of the scene, so no frame is ever a duplicate of its neighbour.
  // Damped to a whisper across the ignition hold, which is specified as still.
  // A camera that is still is not the same thing as a camera that is dead.
  const s3Breath = lf >= 38 && lf < 54 ? 0.3 : 1;
  const life = shakeCam(lf, [], s3Breath);
  const cam = {
    x: cam0.x + (s3Shake + life.x) / cam0.z,
    y: cam0.y + (s3Shake * 0.4 + life.y) / cam0.z,
    z: cam0.z * life.z,
  };

  // ---- the four stage unfold, each stage a clean quarter of Booth's build ----
  const stage = (t0: number) => Math.min(1, Math.max(0, over(lf, t0, 7, S3_BACK)));
  const build = 0.25 * (stage(18) + stage(24) + stage(30) + stage(36));

  // ---- the crate is ALREADY FALLING at f0 (the throw happened before the cut),
  //      lands at f6, settles with a 3 frame overshoot ----
  const crateFall = over(lf, -4, 10, Easing.in(Easing.quad));
  const crateY = 690 - 44 * (1 - crateFall) + s3Jolt(lf, 6, 5, 7);
  // the lid rocks BACK before it slides off, and keeps wobbling once it is down
  const crateOpen = Math.max(-0.09, antic(lf, 12, 14, 0.11)) + settle(lf, 26, 0.05, 0.16, 0.12);
  // the crate takes the landing in its body, not just in the camera
  const crateSq = squash(lf, 6, 0.20, 3);

  // the brass hopper swings up on the rail with a wind up and an overshoot, then
  // never fully stops: it idles, and it takes a real kick from each punched chit.
  const hopIn = antic(lf, 26, 15, 0.22);
  const hopKick = settle(lf, 121, 1, 0.2, 0.15) + settle(lf, 133, 1, 0.2, 0.15);
  const hopOn = Math.min(1, Math.max(0, hopIn) * 1.7) * Math.min(1, build * 2.4);
  const hopY = -18 * (1 - Math.max(0, Math.min(1.1, hopIn))) + idle(lf, 1.4, 88) + hopKick * 5;
  const hopRot = settle(lf, 41, 4.5, 0.15, 0.12) + idle(lf, 0.7, 113, 1.2) + hopKick * 4;

  // ---- IGNITION at f40. The camera is dead still f40 to f52. ----
  // the filament does not ramp politely to full: it overshoots, flares, and
  // settles back with a damped wobble that is still alive twenty frames later
  const ignRise = overshoot(lf, 40, 10, 0.15);
  const ign = Math.max(0, Math.min(1.2, ignRise));
  const ignFlare = Math.max(0, over(lf, 40, 3) - over(lf, 43, 9, S3_INOUT));
  const pulse = ramp(lf, 40, 52);
  const litShop = Math.min(1, 0.68 + 0.3 * Math.max(0, Math.min(1, ignRise)) + 0.05 * settle(lf, 50, 1, 0.09, 0.045));

  // ---- the villain ----
  // stoop step until f96, walks left along the stoop, steps down to the pavement
  // and retreats to world 244 by f130. He is never in the customer's lane.
  const vT1 = over(lf, 96, 14, S3_INOUT);
  const vT2 = over(lf, 110, 20, S3_INOUT);
  // the lantern shoves him a full 90 world px off the stoop and it never recovers
  const push = over(lf, 40, 10, S3_INOUT);
  const vPushed = 366 - 90 * push;                         // 276 by f50
  const vx = vPushed + (262 - vPushed) * vT1 + (244 - 262) * vT2;
  const vy = 560 + 100 * vT2;
  const vDust = 1 - 0.66 * push;
  const handX = vx + 34, handY = vy - 60;
  const POLE = 100;
  // rest tip down across the threshold, strike the new bracket, bounce off it
  const strike = over(lf, 52, 5, Easing.in(Easing.quad));
  const back = over(lf, 57, 9, Easing.out(Easing.cubic));
  const poleAng = -104 + 82 * strike - 46 * back + (lf >= 57 && lf < 70 ? Math.sin((lf - 57) * 1.4) * 9 * Math.max(0, 1 - (lf - 57) / 13) : 0)
    + Math.sin(lf / 23) * 1.6;
  const tipX = handX + POLE * Math.sin((poleAng * Math.PI) / 180);
  const tipY = handY - POLE * Math.cos((poleAng * Math.PI) / 180);
  const thud = lf >= 56 && lf < 70 ? Math.max(0, 1 - (lf - 56) / 14) : 0;
  // the visor cocks at the pole, then drops when it bounces. Eased both ways: a
  // hard boolean gate here snaps the head 9 degrees in a single frame.
  const visorTilt = over(lf, 44, 5) * (1 - over(lf, 55, 6))
    - over(lf, 58, 7) * (1 - over(lf, 80, 10))
    + Math.sin(lf / 31 + 0.9) * 0.16;    // already drifting on its idle at f0
  // his arm FREEZES in the swing position when the ring is cut: the phase stops
  // advancing at f94, it does not teleport to a new angle.
  const bellSwing = lf >= 74 ? Math.sin((Math.min(lf, 94) - 74) * 0.9) * 16 : Math.sin(lf / 26) * 3;

  // ---- the customer, a call with legs. Enters f61, booth by f92, in by f158 ----
  const cWalk = over(lf, 61, 31, S3_INOUT);
  const cIn = over(lf, 136, 22, S3_INOUT);
  const cx = 214 + (430 - 214) * cWalk + (380 - 430) * cIn;
  const cGone = over(lf, 148, 12);
  const cLift = over(lf, 104, 8) * (1 - over(lf, 118, 8));   // holds the pipe up
  const cPoint = over(lf, 118, 7) * (1 - over(lf, 132, 8));  // points at the pavement

  // background life must not peak on top of a payoff. This dips the competing
  // ambience across the answer beat and the board beat, and it never fully
  // reaches zero, so nothing in the background actually stops.
  const s3Calm = 1 - 0.5 * Math.max(
    Math.max(0, over(lf, 90, 5) - over(lf, 110, 10)),
    Math.max(0, over(lf, 132, 4) - over(lf, 152, 10)),
  );

  // ---- the booth answers ----
  // THE BOOTH ANSWERS. This is one of the scene's three readable events, so the
  // grille snaps on with an overshoot and then holds BRIGHT for fifteen frames
  // before it eases down to its talking level. A four frame blip is invisible.
  const grille = Math.max(0, Math.min(1.22, overshoot(lf, 94, 5, 0.2))) * (1 - 0.25 * (1 - over(lf, 112, 26)));
  const lean = over(lf, 98, 9, S3_BACK) * (1 - over(lf, 150, 14));
  const doorOpen = over(lf, 134, 13, S3_INOUT) * (1 - over(lf, 158, 14));
  const tickets = over(lf, 130, 13);

  // ---- the coin, the tube, the roof ----
  // the brass coin slot in the booth door: it winds back, kicks open, spits the
  // coin, then rocks shut. The coin never simply materialises out of the wall.
  // NOT clamped at zero: the negative lobe of antic() is the wind back, and the
  // wind back is the whole point. It rocks shut on a damped settle, never a stop.
  const slotFlap = antic(lf, 158, 13, 0.42) * (1 - over(lf, 176, 10, S3_INOUT))
    + settle(lf, 172, 0.12, 0.19, 0.13);
  // a real parabola with air drag on the horizontal, not a sine on a straight line
  const coinT = over(lf, 166, 15, Easing.linear);
  const coinX = arcX(lf, 166, 15, 354, S3_TUBEX + 15);
  const coinY = arcY(lf, 166, 15, 491, 112, 208);
  // frame to frame coin velocity, so the smear stretches with actual speed
  const coinVX = coinT > 0 && coinT < 1 ? coinX - arcX(lf - 1, 166, 15, 354, S3_TUBEX + 15) : 0;
  const coinVY = coinT > 0 && coinT < 1 ? coinY - arcY(lf - 1, 166, 15, 491, 112, 208) : 0;
  const tubeCoin = lf >= 180 && lf < 206 ? ramp(lf, 180, 203) : (lf >= 206 ? 1 : -1);
  // FOUR ascending pneumatic transits, one per coin. The fourth exists purely so
  // the tube is still carrying something on the last frame of the scene.
  const s3Risers = [196, 204, 213, 223].map((at) => ramp(lf, at, at + 9));
  const s3Thunks = [206, 214, 222, 228];
  const tillRock = Math.max(...s3Thunks.map((at) => (lf >= at ? Math.max(0, 1 - (lf - at) / 10) : 0)));
  const tagDrop = over(lf, 208, 13, Easing.out(Easing.back(2.4)));
  // the tag keeps a real swing floor: it is still visibly moving at f230, which is
  // the specified cut. The chain lags it, so the two never stop on the same frame.
  const s3TagA = (g: number) => (g >= 208 ? Math.sin((g - 208) / 5.4) * 17 * Math.max(0.34, 1 - (g - 208) / 30) + idle(g, 1.6, 41) : 0);
  const tagSwing = s3TagA(lf);

  // ---- hero motion ----
  // the throw already happened: at f0 the arm is mid follow through, not at rest
  const heroArm = -14 + s3Jolt(lf, -4, 26, 8) + 20 * over(lf, 18, 5) * (1 - over(lf, 46, 10))
    + Math.sin(lf / 11) * 5 + 12 * over(lf, 96, 10) * (1 - over(lf, 128, 10));
  const heroCheer = lf >= 157 && lf < 160 ? 1 : 0;
  // TWO taps, not one, and the second is still decaying at f230 so the roof hero
  // is mid action on the cut rather than parked.
  const penTap = Math.max(
    lf >= 212 ? Math.max(0, 1 - (lf - 212) / 8) : 0,
    lf >= 224 ? Math.max(0, 1 - (lf - 224) / 9) : 0,
  );

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792 }}>
        <Cam x={cam.x} y={cam.y} z={cam.z}>
          <Street
            lf={lf}
            booth={[build, 0, 0, 0]}
            board={[tickets, 0, 0, 0]}
            lit={[litShop, 0.8, 0.78, 0.72]}
            sign={[1, 1, 1, 1]}
            bracket={[over(lf, 34, 8, S3_BACK), 0, 0, 0]}
            doorOpen={[doorOpen, 0, 0, 0]}
            tubes={1}
            tubeCoin={tubeCoin}
            tills={1}
            tillRock={tillRock}
            brackets={4}
            rain={1}
            lamps={1}
            rival={0.42}
            pigeonY={-46}
            pigeonAt={12}
            fore={0.82}
          >
            {/* ---------------- STREET LEVEL, world coordinates ---------------- */}

            {/* the shop gap between Pipe Bros and Sparks, dressed so it is never a hole */}
            <div style={{ position: "absolute", left: 640, top: 210, width: 42, height: 390, background: "linear-gradient(90deg,#0A0E15,#171D28 60%,#0C1119)", zIndex: 7 }} />
            <div style={{ position: "absolute", left: 652, top: 214, width: 16, height: 386, borderRadius: 4, background: grad("#3A4150", "#1C2028"), zIndex: 8 }} />
            {[0, 1, 2, 3].map((i) => <div key={"dp" + i} style={{ position: "absolute", left: 648, top: 250 + i * 92, width: 24, height: 9, borderRadius: 2, background: "#454E5E", zIndex: 8 }} />)}
            {Array.from({ length: 6 }, (_, i) => {
              const p = ((lf * 1.1 + i * 20) % 120) / 120;
              // the alley vent is background life, so it stands DOWN across the two
              // beats the scene needs read: the booth answering and the job landing
              return <div key={"st" + i} style={{ position: "absolute", left: 646 + Math.sin(p * 5 + i) * 12, top: 596 - p * 150, width: 24 + p * 26, height: 24 + p * 26, borderRadius: "50%", background: "rgba(206,220,240,0.16)", filter: "blur(7px)", opacity: (1 - p) * 0.8 * s3Calm, zIndex: 9 }} />;
            })}

            {/* THE BRASS HOPPER bolted to the booth's right rail. Nothing is glued
                to a sprite: this is furniture, and the chits punch into it. */}
            <div style={{ position: "absolute", left: S3_HOPX, top: S3_HOPY, width: 56, height: 46, zIndex: 20, opacity: hopOn, transformOrigin: "50% 100%", transform: `translateY(${hopY}px) rotate(${hopRot}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 8, width: 56, height: 38, borderRadius: 3, background: grad("#B99A38", "#5B4710"), border: "2px solid #4E3C0C", boxShadow: "0 5px 11px rgba(8,10,18,0.55)" }} />
              <div style={{ position: "absolute", left: -4, top: 0, width: 64, height: 11, borderRadius: 3, background: grad("#D8B24E", "#8A6A18") }} />
              <div style={{ position: "absolute", left: 10, top: 3, width: 36, height: 5, borderRadius: 3, background: "#2E2206" }} />
              <div style={{ position: "absolute", left: -12, top: 14, width: 14, height: 5, background: "#4E5666" }} />
              <div style={{ position: "absolute", left: 8, top: 20, width: 40, height: 4, borderRadius: 2, background: "rgba(255,244,206,0.3)", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf / 13)) }} />
            </div>

            {/* THE GRILLE LIGHTING. Street does not forward boothGrille, so the
                warm bars and their pool are staged here over the booth's grille. */}
            {grille > 0.02 && <>
              <div style={{ position: "absolute", left: 464, top: 408, width: 52, height: 34, zIndex: 21 }}>
                {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 6, top: 4 + i * 6, width: 40, height: 3, borderRadius: 2, background: "#FFEFC0", opacity: grille * (0.5 + 0.5 * Math.sin(lf / 3 + i)) }} />)}
              </div>
              <div style={{ position: "absolute", left: 404, top: 350, width: 176, height: 152, borderRadius: "50%", background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 66%)`, opacity: 0.5 * Math.min(1, grille), filter: "blur(15px)", mixBlendMode: "screen", zIndex: 21, pointerEvents: "none" }} />
            </>}
            {/* THE ANSWER. Two soundwave rings out of the grille, on the exact frames
                the villain's third ting is killed, so the cause and the effect are
                in the same picture: his bell stops because this thing spoke. */}
            <PulseRing t={ramp(lf, 95, 116)} x={490} y={425} r={330} hue="#F3D9A4" o={0.62} z={22} />
            <PulseRing t={ramp(lf, 101, 124)} x={490} y={425} r={300} hue="#EFCF95" o={0.45} z={22} />

            {/* THE DOORMAN, chest up through the booth glass. He never leaves it. */}
            {build > 0.55 && <div style={{ opacity: Math.min(1, (build - 0.55) * 6) }}>
              <Doorman lf={lf} x={S3_BOOTHC} y={520} lean={lean} talk={over(lf, 96, 5) * (1 - over(lf, 126, 10))} size={104} z={19} />
              <div style={{ position: "absolute", left: 452, top: 356, width: 76, height: 190, background: "linear-gradient(150deg, rgba(214,236,255,0.16), transparent 44%, rgba(190,216,244,0.1))", zIndex: 20, pointerEvents: "none" }} />
            </div>}

            {/* THE IGNITION. A warm ring crosses the stoop and every surface it
                touches goes up one step. This is the money frame: let light act. */}
            {ign > 0.02 && <div style={{ position: "absolute", left: S3_LANT.x - 250, top: S3_LANT.y - 150, width: 500, height: 420, borderRadius: "50%", background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 62%)`, opacity: 0.4 * ign, filter: "blur(34px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />}
            {/* the strike flare itself: a hot core that spikes in three frames and
                is gone in nine, so the ignition has an event rather than a fade */}
            {ignFlare > 0.01 && <div style={{ position: "absolute", left: S3_LANT.x - 90, top: S3_LANT.y - 78, width: 180, height: 156, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,246,222,0.95), transparent 66%)`, opacity: 0.72 * ignFlare, filter: `blur(${6 + 12 * (1 - ignFlare)}px)`, mixBlendMode: "screen", zIndex: 23, transform: `scale(${0.62 + ignFlare * 0.55})`, pointerEvents: "none" }} />}
            <Sparkles lf={lf} at={40} x={S3_LANT.x} y={S3_LANT.y} n={7} life={30} spread={104} rise={72} hue="#F2DCA6" sd={72} z={24} o={0.7} />
            <PulseRing t={pulse} x={S3_LANT.x} y={S3_LANT.y} r={720} hue="#F6D79A" z={22} />
            <PulseRing t={ramp(lf, 44, 58)} x={S3_LANT.x} y={S3_LANT.y + 190} r={560} hue="#EFC98C" o={0.7} z={22} />
            {ign > 0.02 && <div style={{ position: "absolute", left: 300, top: 592, width: 420, height: 76, borderRadius: "50%", background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 68%)`, opacity: 0.34 * ign, filter: "blur(19px)", mixBlendMode: "screen", zIndex: 10, pointerEvents: "none" }} />}

            {/* the new brass sign bracket taking the pole, and the dull thud */}
            {thud > 0.02 && <>
              <div style={{ position: "absolute", left: tipX - 34, top: tipY - 22, width: 68, height: 44, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,200,208,0.55), transparent 66%)", opacity: thud * 0.8, filter: "blur(5px)", zIndex: 26 }} />
              {[0, 1, 2, 3].map((i) => {
                const a = -0.5 - i * 0.5;
                const d = (1 - thud) * 46;
                return <div key={i} style={{ position: "absolute", left: tipX + Math.cos(a) * d, top: tipY + Math.sin(a) * d, width: 5, height: 5, borderRadius: "50%", background: CHALK, opacity: thud * 0.7, zIndex: 26 }} />;
              })}
            </>}

            {/* NOBODY HOME, on the top stoop step. 0.62 and no shadow, always. */}
            <Nobody lf={lf} x={vx} y={vy} pole={0} dust={vDust} tilt={visorTilt} size={158} walk={lf >= 96 && lf < 130 ? 1 : 0} z={24} />
            <div style={{ position: "absolute", left: 0, top: 0, opacity: 0.62, zIndex: 25 }}>
              <HookPole lf={lf} x={handX - 4} y={handY - POLE} len={POLE} ang={poleAng} bounce={thud} z={25} />
            </div>
            <div style={{ opacity: 0.62 }}>
              <S3_Bell lf={lf} x={vx - 64} y={vy - 74} swing={bellSwing} rings={[{ at: 74 }, { at: 84 }, { at: 94, cut: 97 }]} />
            </div>

            {/* THE CUSTOMER. A call with legs, one spraying pipe, one brass coin. */}
            {lf >= 58 && cGone < 0.99 && (
              <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - cGone, transform: `scale(${1 - cIn * 0.14})`, transformOrigin: `${cx}px 668px` }}>
                <div style={{ position: "absolute", left: 0, top: 0, transform: `rotate(${cLift * -7}deg)`, transformOrigin: `${cx}px 668px` }}>
                  <Customer lf={lf} x={cx} y={668} scarf={2} prop="pipe" coin={1} walk={cIn > 0.02 ? -1 : 1} size={110} z={22} />
                </div>
                {cPoint > 0.02 && <div style={{ position: "absolute", left: cx + 30, top: 612, width: 40, height: 12, borderRadius: 3, background: BONE, opacity: cPoint, transform: `rotate(${28 + cPoint * 12}deg)`, zIndex: 23 }} />}
              </div>
            )}

            {/* the two wordless brass chits: the problem, then the address */}
            <S3_Chit lf={lf} a={110} b={120} from={[cx, 596]} to={[S3_HOPX + 28, S3_HOPY + 16]} kind="pipe" />
            <S3_Chit lf={lf} a={122} b={132} from={[cx + 20, 620]} to={[S3_HOPX + 28, S3_HOPY + 16]} kind="house" />
            {/* each chit is PUNCHED into the hopper: brass chips fly, it rocks */}
            <Sparkles lf={lf} at={120} x={S3_HOPX + 28} y={S3_HOPY + 12} n={6} life={22} spread={72} rise={48} hue="#E7C87E" sd={90} z={28} o={0.75} />
            <Sparkles lf={lf} at={132} x={S3_HOPX + 28} y={S3_HOPY + 12} n={6} life={22} spread={72} rise={48} hue="#E7C87E" sd={96} z={28} o={0.75} />

            {/* THE BOOKING. A green ticket, pulled from the booth, split flapped
                into slot 1 of the awning board. Green is awning tickets only. */}
            {lf >= 124 && lf < 141 && (() => {
              const t = over(lf, 124, 13, S3_INOUT);
              const tp = over(lf - 1, 124, 13, S3_INOUT);
              const px = (tt: number) => S3_BOOTHC - 20 + (S3_SLOT1.x - S3_BOOTHC + 20) * tt;
              const py = (tt: number) => 430 + (S3_SLOT1.y - 430) * tt - Math.sin(tt * Math.PI) * 58;
              const tx = px(t), ty = py(t);
              return (
                // the ticket is bigger than it was: at the TWO camera the old 42px
                // chip was a green speck. It is the payoff object, so it reads.
                <Smear dx={tx - px(tp)} dy={ty - py(tp)} ghosts={3} on={1} o={0.26} z={28}>
                  <div style={{ position: "absolute", left: tx - 26, top: ty - 16, width: 52, height: 32, borderRadius: 3, background: GREEN, border: "2px solid #5FC79A", zIndex: 28, transform: `rotate(${t * 340}deg)`, boxShadow: "0 4px 9px rgba(8,10,18,0.5)" }}>
                    <div style={{ position: "absolute", left: 6, top: 7, width: 28, height: 5, borderRadius: 2, background: "rgba(238,250,244,0.7)" }} />
                    <div style={{ position: "absolute", left: 6, top: 18, width: 18, height: 5, borderRadius: 2, background: "rgba(238,250,244,0.45)" }} />
                  </div>
                </Smear>
              );
            })()}
            {/* THE JOB IS ON THE BOARD. The slot that just filled is held lit for
                twenty frames so the last link of the chain is legible, and the
                board was visibly empty for the whole scene before this. */}
            {lf >= 134 && lf < 162 && <div style={{
              position: "absolute", left: S3_SLOT1.x - 46, top: S3_SLOT1.y - 26, width: 92, height: 62, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(146,226,186,0.55), transparent 68%)",
              opacity: 0.9 * over(lf, 134, 4) * (1 - over(lf, 148, 14)) * (0.86 + 0.14 * Math.sin(lf / 4)),
              filter: "blur(9px)", mixBlendMode: "screen", zIndex: 14, pointerEvents: "none",
              transform: `scale(${1 + 0.22 * (1 - over(lf, 134, 9, S3_BACK)) + settle(lf, 143, 0.06, 0.15, 0.1)})`,
            }} />}
            <Sparkles lf={lf} at={136} x={S3_SLOT1.x} y={S3_SLOT1.y} n={7} life={26} spread={70} rise={44} hue="#B8E8CE" sd={84} z={29} o={0.7} />

            {/* THE COIN. Out of the door slot, into the base of the pneumatic tube. */}
            {/* THE PAYMENT SLOT in the booth door. It winds back over four frames,
                kicks open, spits the coin and rocks shut: the coin is produced by
                a mechanism on screen instead of appearing out of a flat wall. */}
            {lf >= 158 && <div style={{ position: "absolute", left: 342, top: 476, width: 34, height: 30, zIndex: 24, transformOrigin: "50% 100%", transform: `rotate(${-slotFlap * 62}deg)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 10, borderRadius: 2, background: grad("#D3AE48", "#7A5A12"), border: "2px solid #4E3C0C" }} />
              <div style={{ position: "absolute", left: 5, top: 3, width: 24, height: 3, borderRadius: 2, background: "#2E2206" }} />
            </div>}
            {slotFlap > 0.2 && <div style={{ position: "absolute", left: 336, top: 470, width: 46, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 68%)`, opacity: 0.5 * slotFlap, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 23, pointerEvents: "none" }} />}
            {/* the coin itself, bigger, on a true parabola, smeared while it is fast */}
            {lf >= 166 && lf < 182 && (
              <Smear dx={coinVX} dy={coinVY} ghosts={4} on={1} o={0.3} z={29}>
                <Coin lf={lf} x={coinX} y={coinY} r={20} roll={coinT * 4} z={29} />
              </Smear>
            )}
            <Sparkles lf={lf} at={167} x={360} y={488} n={6} life={24} spread={80} rise={54} hue="#E9CE94" sd={102} z={30} o={0.8} />
            {/* it arrives in the tube mouth and the mouth takes the hit */}
            <GroundRing lf={lf} at={180} x={S3_TUBEX + 15} y={210} r={90} dur={16} hue="rgba(240,222,178,0.6)" z={20} />
            {lf >= 176 && lf < 200 && <div style={{ position: "absolute", left: S3_TUBEX - 8, top: 192, width: 46, height: 32, borderRadius: 6, background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 68%)`, opacity: 0.75 * over(lf, 176, 6) * (1 - over(lf, 188, 10)) * (0.85 + 0.15 * Math.sin(lf / 3)), filter: "blur(5px)", mixBlendMode: "screen", zIndex: 20, transform: `scale(${1 + 0.3 * Math.max(0, 1 - Math.abs(lf - 181) / 6)})` }} />}

            {/* THE HERO. Biggest and sharpest sprite in frame, right of the booth. */}
            <S3_Hero lf={lf} x={S3_HEROX} y={660} arm={heroArm} belt={over(lf, 22, 9, S3_BACK)} cheer={heroCheer} z={23} />

            {/* THE FLAT PACK CRATE on the pavement in front of him, his boot on it,
                and the nine brass screws it threw toward the lens */}
            {/* the motion streak sits BEHIND the hero (z 22, under his z 23) so the
                falling crate's trail never washes across his body */}
            {lf < 12 && <div style={{ position: "absolute", left: S3_CRATEX, top: crateY - 122, width: 132, height: 62 + 60 * (1 - crateFall), background: "linear-gradient(180deg, rgba(180,150,100,0.36), transparent)", filter: "blur(5px)", zIndex: 22 }} />}
            {/* it lands HARD: squash on the box, a ground ring, dust that outlives
                the bang, debris and a scatter of brass, all off one impact frame */}
            <div style={{ zIndex: 26, position: "absolute", left: 0, top: 0, transformOrigin: `${S3_CRATEX + 66}px ${crateY}px`, transform: `scale(${crateSq.sx}, ${crateSq.sy})` }}>
              <Smear dx={0} dy={lf < 7 ? 26 : 0} ghosts={3} on={lf < 7 ? 1 : 0} o={0.22} z={22}>
                <S3_Crate lf={lf} x={S3_CRATEX} y={crateY} open={crateOpen} />
              </Smear>
            </div>
            <Impact lf={lf} at={6} x={626} y={690} strength={1.15} debris={9} sparks={7} sd={31} z={25} />
            {lf >= 7 && <div style={{ position: "absolute", left: 592, top: crateY - 74 - s3Jolt(lf, 8, 4, 6), width: 46, height: 20, borderRadius: 3, background: "#8E3F2A", border: "2px solid #6E2F1E", zIndex: 27 }}>
              <div style={{ position: "absolute", left: 3, top: 2, width: 40, height: 4, background: "rgba(255,226,206,0.28)" }} />
            </div>}
            <S3_Screws lf={lf} at={6} x={626} y={684} />

            {/* PIP, and the offcut wall with one piece that never fits */}
            {/* held left of world 800: at the f96 to f130 camera (x 268, z 1.51)
                anything past world 830 lands beyond panel local x 900 */}
            <S3_Tetris lf={lf} x={700} y={660} />
            <Pip lf={lf} x={826} y={656} size={72} look={over(lf, 150, 7)} z={21} />

            {/* the mechanical lock flares, one per unfold stage, each with its own
                mass: a puff of stoop dust, a few chips of packing and a short
                scatter of brass. Staggered and varied so four locks never read as
                one machine firing four times. */}
            {S3_LOCKS.map((L, i) => (
              <React.Fragment key={"lk" + i}>
                <S3_Lock lf={lf} at={L.at} x={S3_BOOTHC} y={L.y} w={L.w} />
                <Dust lf={lf} at={L.at + 1} x={S3_BOOTHC + nz(i, 21) * 16} y={L.y + 8}
                  n={Math.round(5 + L.m * 5)} life={varyDur(i, 56, 0.3)} spread={vary(i, 110, 0.3) * L.m}
                  hue="rgba(186,176,152,0.42)" sd={40 + i * 3} z={19} o={0.85} />
                <Debris lf={lf} at={L.at + stagger(i, 1)} x={S3_BOOTHC} y={L.y + 6}
                  n={Math.round(3 + L.m * 3)} spread={vary(i, 120, 0.34) * L.m} rise={vary(i, 46, 0.4)}
                  hue="#4A3A1E" sd={50 + i * 3} z={27} o={0.9} />
                <Sparkles lf={lf} at={L.at} x={S3_BOOTHC} y={L.y} n={Math.round(4 + L.m * 4)}
                  spread={vary(i, 96, 0.3)} rise={vary(i, 54, 0.36)} hue="#E9CE94" sd={60 + i * 3} z={28} o={0.8} />
              </React.Fragment>
            ))}
            {/* the base plate is the heavy one: it pushes a ring out across the stoop */}
            <GroundRing lf={lf} at={18} x={S3_BOOTHC} y={562} r={190} dur={20} hue="rgba(228,214,180,0.5)" z={18} />

            {/* ---------------- ROOF TIER, reached by the crane at f180 ---------------- */}

            {/* the brass riser and elbow that carry the tube up onto the till bracket */}
            <div style={{ position: "absolute", left: S3_TUBEX + 4, top: -178, width: 22, height: 172, borderRadius: 4, background: grad("#D5AE44", "#6E5210"), zIndex: 15 }}>
              <div style={{ position: "absolute", left: 4, top: 0, width: 5, height: 172, background: "rgba(255,244,208,0.2)" }} />
              {[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: -3, top: 44 + i * 76, width: 28, height: 10, borderRadius: 2, background: "#E0BA55" }} />)}
              {s3Risers.map((g, i) => g > 0.01 && g < 1 && <div key={i} style={{ position: "absolute", left: -3, top: (1 - g) * 148, width: 28, height: 30, borderRadius: 6, background: "radial-gradient(ellipse, rgba(255,232,160,0.95), transparent 70%)", filter: "blur(3px)" }} />)}
            </div>
            <div style={{ position: "absolute", left: 500, top: -192, width: 94, height: 18, borderRadius: 4, background: grad("#D5AE44", "#6E5210"), zIndex: 15 }} />

            {/* THE HERO ON THE PARAPET. He does not look up. He keeps writing. */}
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 17 }}>
              <S3_Hero lf={lf} x={330} y={-166 - penTap * 3} arm={-34 + penTap * 26 + Math.sin(lf / 7) * 7} belt={1} cheer={0} z={17} />
              {/* the cash till on a strap, gained here, hung not glued. It hangs
                  CLEAR of his head at world x 226: at 288 it swung across his face. */}
              <div style={{ position: "absolute", left: 226, top: -252, width: 46, height: 34, zIndex: 19, transform: `rotate(${Math.sin(lf / 19) * 3}deg)`, transformOrigin: "50% 0%" }}>
                <div style={{ position: "absolute", left: 20, top: -26, width: 7, height: 28, background: "#4E3C20" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 46, height: 34, borderRadius: 3, background: grad("#C8A02E", "#7A5A12"), border: "2px solid #4E3C0C" }} />
                <div style={{ position: "absolute", left: 10, top: 6, width: 26, height: 6, borderRadius: 3, background: "#3A2C08" }} />
              </div>
              {/* the chair front, cropping his legs so he reads seated */}
              <div style={{ position: "absolute", left: 288, top: -214, width: 88, height: 50, background: "linear-gradient(180deg,#3E4654,#252C38)", borderRadius: 3, zIndex: 20 }} />
              <div style={{ position: "absolute", left: 288, top: -214, width: 88, height: 5, background: "#4C5666", zIndex: 20 }} />
              {/* the notebook and the pen that never stops */}
              <div style={{ position: "absolute", left: 366, top: -224, width: 42, height: 30, borderRadius: 2, background: "#E7E1D2", border: "2px solid #9A927E", zIndex: 21, transform: `rotate(-7deg)` }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 5, top: 6 + i * 7, width: 22 + Math.sin(lf / 5 + i) * 8, height: 3, background: "rgba(90,84,70,0.6)" }} />)}
              </div>
              <div style={{ position: "absolute", left: 400, top: -232, width: 5, height: 22, borderRadius: 2, background: "#8A6A18", zIndex: 22, transformOrigin: "50% 100%", transform: `rotate(${26 + Math.sin(lf / 4) * 9}deg)` }} />
            </div>

            {/* THE BRASS TAG. Drops on a chain, hangs itself on the till bracket. */}
            {tagDrop > 0.01 && <div style={{ position: "absolute", left: 528, top: -300, width: 4, height: 40 * tagDrop, background: "#8A6A18", zIndex: 21, transformOrigin: "50% 0%", transform: `rotate(${s3TagA(lf - 3) * 0.55}deg)` }} />}
            {tagDrop > 0.01 && <div style={{ position: "absolute", left: 530, top: -300, width: 0, height: 0, zIndex: 22, transformOrigin: "0% 0%", transform: `rotate(${tagSwing}deg)` }}>
              <div style={{ position: "absolute", left: -46, top: 40 * tagDrop, padding: "4px 11px", borderRadius: 4, background: grad("#DCB44C", "#9A7418"), border: "2px solid #6F5410", fontFamily: mono, fontWeight: 700, fontSize: 20, color: "#2E2206", whiteSpace: "nowrap", boxShadow: "0 5px 12px rgba(8,10,18,0.5)" }}>$300 / MO</div>
            </div>}
            {lf >= 206 && <div style={{ position: "absolute", left: 460, top: -300, width: 130, height: 70, borderRadius: "50%", background: `radial-gradient(ellipse, ${TUNGSTEN}, transparent 68%)`, opacity: 0.5 * tillRock, filter: "blur(13px)", mixBlendMode: "screen", zIndex: 19 }} />}
            {/* FOUR pneumatic arrivals, each with its own thunk, ring and brass
                scatter, the last of them landing at f228 so the final frames of the
                scene are an event and not a decay. Staggered and varied amplitudes. */}
            {s3Thunks.map((at, i) => (
              <React.Fragment key={"th" + i}>
                <GroundRing lf={lf} at={at} x={528} y={-248} r={vary(i, 120, 0.24)} dur={varyDur(i, 15, 0.2)} hue="rgba(240,224,180,0.55)" z={20} />
                <Sparkles lf={lf} at={at} x={528} y={-252} n={5} life={varyDur(i, 24, 0.28)} spread={vary(i, 78, 0.3)} rise={vary(i, 50, 0.34)} hue="#EDD69C" sd={110 + i * 4} z={23} o={0.75} />
              </React.Fragment>
            ))}
            {/* the tube keeps breathing warm air out of the elbow to the last frame */}
            <Dust lf={lf} at={192} x={S3_TUBEX + 14} y={-186} n={12} life={92} spread={120} hue="rgba(214,204,178,0.34)" sd={120} z={16} o={0.7} />
            <Dust lf={lf} at={222} x={S3_TUBEX + 14} y={-186} n={10} life={86} spread={110} hue="rgba(214,204,178,0.32)" sd={128} z={16} o={0.7} />
            {/* wet brick streaking past the lens on the crane, so the move has speed */}
            <SpeedLines lf={lf} x={340} y={-420} w={420} h={620} dir={90} n={11} on={0.34 * Math.max(0, over(lf, 182, 6) - over(lf, 196, 10))} hue="rgba(200,214,236,0.34)" z={12} sd={7} />
          </Street>
        </Cam>
      </div>

      {/* ---------------- panel local overlays ---------------- */}
      {lf < 74 && <SceneTag f={lf + 30} text="THE FIT-OUT" color={GOLD} />}
      {lf >= 74 && <SceneTag f={lf - 74} text="3RD RING" color={GOLD} />}
      <HUD lf={lf} text={lf < 140 ? "MISSED 12" : "BOOKED 1"} color={lf < 140 ? RED : GREEN} flash={lf < 140 ? 1 : 0} y={168} />
      {/* the HUD turning around for the first time in the reel */}
      {/* GOLD, not GREEN: green is spent on awning tickets and the HUD flip itself,
          never on decoration. Scale capped so the ring stays off the button rail. */}
      {lf >= 140 && lf < 156 && <div style={{ position: "absolute", left: 748, top: 16, width: 168, height: 58, borderRadius: 10, border: `3px solid ${GOLD}`, opacity: Math.max(0, 1 - (lf - 140) / 16) * 0.85, transform: `scale(${1 + over(lf, 140, 16) * 0.16})`, zIndex: 61, pointerEvents: "none" }} />}
    </>
  );
};

// ==== part: 14_S4.tsx ====

// ============================================================================
// SCENE 4 , STEP ONE: PICK ONE DOOR . 174 frames, lf 0..173. verb: UNLOCK.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   1  camera already at ROW, all four shopfronts in frame, Pipe Bros lit at 1.0
//      with its booth lantern burning from S3, the other three fascias dark 0.34
//   2  the four brass trade plates ALREADY landed on the four fascias, fully
//      redacted (clay slash, three dark blocks, gold padlock). Plate 0 is nine
//      frames from opening, so the first unlock is imminent, not building
//   3  NOBODY HOME already on Pipe Bros' pavement at world 475, mid stride,
//      pole at rest, grey dust pooling, tally box redacted, opacity 0.62, no
//      cast shadow. His three copies are still behind the service seams
//   4  customer 0 already walking in from the alley mouth, spraying pipe in one
//      nub, brass coin in the other
//   5  four service seam slabs between the shops, four gold trade badges on the
//      brickwork, the four empty booth mounts
//   6  ALWAYS ON drizzle far and near, four catenary lamp cones flickering out
//      of phase, road colour smears plus the passing vehicle, puddle
//      reflections rippling, the arcade ghost chasing pellets in Sparks' glass,
//      Valvotine's oil drip falling, Painless Pete's molar stutter, rain
//      running on the booth glass, the pigeon chevron due at f8
//   7  HUD 4 TRADES and the STEP 1 footer strip, both rendered solid
// ============================================================================

const S4_UNRED = [9, 18, 27, 36];        // the four plates unredact, 9 frames apart
const S4_WALKON = [-1, 36, 44, 52];      // the copies step out of the service seams
const S4_BREAK = [52, 88, 108, 128];     // one thing physically breaks per bay
const S4_RUN = [60, 96, 116, 136];       // the customer stops walking and RUNS
const S4_ARRIVE = [74, 110, 130, 150];   // he reaches the door. Always before the pole
const S4_BOUNCE = [78, 114, 134, 154];   // the pole hits the new bracket and bounces
const S4_RING = 38, S4_RINGDUR = 14, S4_RINGR = 2560;
const S4_RINGX = 490, S4_RINGY = 344;    // Pipe Bros' booth lantern, world
const S4_DOORS = 146;                    // four doors open, four pools join
const S4_PROPS: PropKind[] = ["pipe", "cable", "molar", "rad"];

// the four trades ignite one at a time, each in its own hue. These are the
// saturated working versions of the four fascia hues: amber, ice, mint, orange.
// None of them is the reserved awning green, the S8 cold cyan, the S9 red or
// the Drip Bros magenta. Four separate businesses, four separate colours.
const S4_FIRE = ["#F5C071", "#BFE2F6", "#8FD8B8", "#F09040"];
// VARIED stagger, not a metronome: 13, then 11 later, then 10, then 7. Each trade
// catches on its own beat so four separate businesses read as four separate events.
const S4_IGN = [13, 24, 34, 41];
const S4_IGNDUR = [12, 16, 11, 15];      // and each one catches at its own speed

// module level aliases so the motion kit stays reachable inside S4, whose body
// declares locals called breathe, idle and settle that would otherwise shadow it.
const s4B = breathe, s4Idle = idle, s4Settle = settle, s4Drift = drift, s4Flick = flick;

// the FLARE. A trade does not fade up to level, it overshoots hard on the catch
// frame and then settles into its working brightness with a damped wobble.
const s4Flare = (lf: number, i: number) => {
  const t = lf - S4_IGN[i];
  if (t < -4) return 0;
  if (t < 0) return -0.06 * (1 + t / 4);                       // the filament dips first
  const spike = Math.exp(-t / 3.4) * 1.15;                     // the catch
  return spike + s4Settle(lf, S4_IGN[i] + 5, 0.24, 0.10, 0.055);
};
// the thump: a fast decaying overshoot on the frame the fascia catches
const s4Thump = (lf: number, i: number) => {
  const t = lf - S4_IGN[i];
  return t < 0 || t > 30 ? 0 : Math.sin((t / 26) * Math.PI * 2.5) * Math.exp(-t / 8);
};
// each pole fails DIFFERENTLY. Four flavours of losing, one per bay.
// 0 slips and sags · 1 judders fast · 2 kicks back hard · 3 goes limp and droops
const S4_FAILFREQ = [0.09, 0.26, 0.15, 0.06];
const S4_FAILAMP = [0.18, 0.10, 0.30, 0.22];
const S4_FAILDEC = [0.055, 0.11, 0.085, 0.035];
const S4_RAISE = [60, 63, 58, 65];       // and none of them even raises on the same frame

// the eighteen things the warm ring lights on its way down the street
const S4_WINS: { x: number; y: number }[] = [
  ...SHOPS.flatMap((sh, i) => [
    { x: sh.x + OFF_WIN + 65, y: 440 },
    { x: doorX(i), y: 452 },
    { x: sh.x + OFF_BOOTH + 50, y: 400 },
    { x: sh.x + 44, y: 246 },
  ]),
  { x: 2330, y: 312 },
  { x: 2604, y: 300 },
];

// how far down the street the ring has reached, in world px
const s4Radius = (lf: number) => S4_RINGR * over(lf, S4_RING, S4_RINGDUR, Easing.out(Easing.cubic));
// the frame the ring crossed a given world x, solved by scanning the eased ramp
const s4CrossAt = (x: number) => {
  const d = Math.abs(x - S4_RINGX);
  for (let k = 0; k <= S4_RINGDUR; k++) if (s4Radius(S4_RING + k) >= d) return S4_RING + k;
  return S4_RING + S4_RINGDUR;
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA. Push out of the widest shot in the reel, then track right.
  // ROW is held f0 to f66 and never longer (Continuity Editor 8).
  const camA = { x: 100, y: CAMS.ROW.y, z: CAMS.ROW.z };
  const camB = { x: 180, y: CAMS.TWO.y, z: CAMS.TWO.z };
  const camC = { x: 1400, y: CAMS.TWO.y, z: CAMS.TWO.z };
  const camD = { x: 1420, y: camFor(1420, 470, 0.92).y, z: 0.92 };
  const p1 = over(lf, 66, 26, Easing.inOut(Easing.cubic));
  const p2 = over(lf, 92, 48, Easing.inOut(Easing.quad));
  const p3 = over(lf, 140, 34, Easing.inOut(Easing.cubic));
  const camBase = lerpCam(lerpCam(lerpCam(camA, camB, p1), camC, p2), camD, p3);
  // THE CAMERA IS A CHARACTER. Handheld noise always on, plus a real kick on each
  // of the four ignitions, each of the four pole bounces and the moment the pools
  // join. The kicks are scaled in world px because camZ here is very wide.
  const shk = shakeCam(lf, [
    ...S4_IGN.map((at, i) => ({ at, amp: vary(i, 17, 0.3), dur: 13 })),
    ...S4_BOUNCE.map((at, i) => ({ at, amp: vary(i, 8, 0.35), dur: 11 })),
    { at: S4_DOORS + 2, amp: 11, dur: 18 },
  ], 4);
  const cam = { x: camBase.x + shk.x, y: camBase.y + shk.y, z: camBase.z };
  const breathe = s4B(lf, 0.006, 190) * (1 + 0.004 * Math.sin(lf / 23));

  // ---- THE UNREDACTION. redact 1 is sealed, 0 is open and gone.
  const redact = [0, 1, 2, 3].map((i) => 1 - over(lf, S4_UNRED[i], 12, Easing.out(Easing.cubic)));

  // ---- THE RING, and everything it upgrades on its way past.
  const ringT = over(lf, S4_RING, S4_RINGDUR, Easing.out(Easing.cubic));
  const rad = s4Radius(lf);
  const cross = SHOPS.map((sh) => s4CrossAt(sh.x + 260));

  // ---- THE SEQUENTIAL SWEEP, running from f66 to the last frame.
  const cyc = lf < 66 ? -9 : ((lf - 66) / 12) % 4;
  // the sweep eases ON over 10 frames. Without this, hl[0] snaps 0 to 1 on the
  // single frame f66 and the badge jumps 22% in one frame, which reads as a glitch.
  const sweepOn = over(lf, 66, 10, Easing.inOut(Easing.quad));
  const hl = [0, 1, 2, 3].map((i) => {
    if (lf < 66) return 0;
    const d0 = Math.abs(cyc - i);
    const d = Math.min(d0, 4 - d0);
    return Math.max(0, 1 - d * 1.2) * sweepOn;
  });

  // ---- FASCIA IGNITION, one hue per trade, then the ring adds the last notch.
  // ign drives every coloured layer of a shop: the fascia catch, the window, the
  // pavement pool and the service riser under the road. Four staggered ignitions.
  const ign = [0, 1, 2, 3].map((i) => over(lf, S4_IGN[i], S4_IGNDUR[i], Easing.out(Easing.cubic)));
  // flare is the multiplier ON TOP of ign: each trade spikes then settles, and it
  // never stops breathing afterwards, so no fascia ever sits at a constant value.
  const flare = [0, 1, 2, 3].map((i) => 1 + Math.max(-0.5, s4Flare(lf, i)) + s4Drift(lf, 0.045, 71 + i * 13, i * 1.9));
  const thump = [0, 1, 2, 3].map((i) => s4Thump(lf, i));
  // the CLOSED sign flips to OPEN on the frame its trade catches
  const signFlip = [0, 1, 2, 3].map((i) => 1 - over(lf, S4_IGN[i] + 1, 11, Easing.out(Easing.cubic)));
  const lit = [0, 1, 2, 3].map((i) => {
    // dark but never black at f0: the window props stay readable above glow 0.15
    const base = i === 0 ? 1 : 0.34 + 0.62 * ign[i];
    return Math.min(1, base + 0.16 * over(lf, cross[i], 8) + 0.1 * over(lf, S4_DOORS, 14) + 0.14 * hl[i]);
  });
  // the new brass sign brackets are fitted by the light, one per shop
  const bracket = [0, 1, 2, 3].map((i) => (i === 0 ? 1 : over(lf, cross[i], 9, Easing.out(Easing.cubic))));

  // ---- THE BREAKS and the four doors.
  // the breaks ANTICIPATE: the prop pulls back a touch before it lets go, and the
  // break level keeps living afterwards instead of parking on 1.
  const brk = [0, 1, 2, 3].map((i) =>
    Math.max(0, antic(lf, S4_BREAK[i], varyDur(i, 11, 0.22), 0.13) + s4Settle(lf, S4_BREAK[i] + 11, 0.09, 0.09, 0.05) * (lf > S4_BREAK[i] ? 1 : 0)));
  // doors swing PAST open and rock back, and are still rocking at frame 173
  const doorOpen = [0, 1, 2, 3].map((i) => {
    const at = S4_DOORS + i * 3;
    return Math.max(0, over(lf, at, 15, Easing.out(Easing.quad))
      + s4Settle(lf, at + 12, 0.085, 0.09, 0.028)
      + (lf > at + 12 ? s4Idle(lf, 0.02, 74 + i * 9, i) : 0));
  });

  const joined = overshoot(lf, S4_DOORS + 2, 20, 0.11) * (0.94 + 0.06 * Math.sin(lf / 12));

  return (
    <>
      <Cam x={cam.x} y={cam.y} z={cam.z * breathe}>
        <Street
          lf={lf}
          booth={[1, 0, 0, 0]}
          board={[1, 0, 0, 0]}
          lit={lit}
          sign={signFlip}
          bracket={bracket}
          brk={brk}
          redact={redact}
          doorOpen={doorOpen}
          hl={hl}
          tubes={1}
          tills={1}
          tillTag="$300 / MO"
          brackets={4}
          chalk={12}
          rival={0.8}
          rain={1}
          lamps={1}
          pigeonY={-30}
          pigeonAt={8}
        >
          {/* ---- THE JOINED LIGHT STRIP. Four warm pools bloom and merge into one
               continuous lit band down the whole row, screen blended so it lights
               the wet pavement without ever occluding a figure. ---- */}
          {joined > 0.01 && (
            <>
              <div style={{
                position: "absolute", left: 150, top: 596, width: 2180, height: 84,
                background: `linear-gradient(90deg, transparent, ${TUNGSTEN} 12%, #F6D79A 50%, ${TUNGSTEN} 88%, transparent)`,
                opacity: 0.34 * joined, filter: "blur(22px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 1,
              }} />
              <div style={{
                position: "absolute", left: 190, top: 640, width: 2100, height: 26,
                background: `linear-gradient(90deg, transparent, #FFE9BE, transparent)`,
                opacity: 0.26 * joined * (0.86 + 0.14 * Math.sin(lf / 9)), filter: "blur(8px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 1,
              }} />
            </>
          )}

          {/* ---- THE PULSE RING out of Pipe Bros' booth lantern, plus the chain of
               eighteen windows it lights in sequence on its way down the row. ---- */}
          <PulseRing t={ringT} x={S4_RINGX} y={S4_RINGY} r={S4_RINGR} hue="#F6D79A" o={0.9} z={21} />
          {S4_WINS.map((w, i) => {
            const d = Math.abs(w.x - S4_RINGX);
            const pop = Math.max(0, 1 - Math.abs(rad - d) / 150);
            const held = ringT > 0.02 && rad > d ? 0.16 : 0;
            const a = pop * 0.72 + held;
            if (a < 0.02) return null;
            return (
              <div key={"wp" + i} style={{ position: "absolute", left: w.x - 90, top: w.y - 60, width: 180, height: 120, zIndex: 2, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse, #FFEDC4, transparent 66%)", opacity: a * 0.7, filter: "blur(16px)", mixBlendMode: "screen" }} />
                <div style={{ position: "absolute", left: 84, top: 54, width: 12, height: 12, background: "#FFF6DE", opacity: pop, transform: `rotate(45deg) scale(${0.6 + pop * 2.4})`, mixBlendMode: "screen" }} />
              </div>
            );
          })}

          {/* ---- THE FOUR IGNITIONS. Each trade catches in its own hue, one after
               another, nine frames apart, with a decaying overshoot on the frame it
               catches. Every layer here is screen blended light on the existing
               frontage, so nothing is occluded and no black is lifted. ---- */}
          {SHOPS.map((sh, i) => {
            const g = ign[i];
            if (g < 0.01) return null;
            const fire = S4_FIRE[i];
            const kick = (1 + Math.max(0, thump[i]) * 0.9) * flare[i];     // the thump plus the flare
            const breath = 0.86 + 0.14 * Math.sin(lf / 13 + i * 1.7) + hl[i] * 0.3;
            return (
              <React.Fragment key={"ig" + i}>
                {/* the halo the fascia throws up the wet brick */}
                <div style={{
                  position: "absolute", left: sh.x - 30, top: 96, width: 580, height: 220,
                  background: `radial-gradient(ellipse at 50% 80%, ${fire}, transparent 68%)`,
                  opacity: 0.44 * g * breath * kick, filter: "blur(26px)", mixBlendMode: "screen",
                  zIndex: 2, pointerEvents: "none",
                }} />
                {/* the fascia band itself catching, hard edged so the hue reads as sign light */}
                <div style={{
                  position: "absolute", left: sh.x + 10, top: 206, width: 500, height: 70,
                  background: `linear-gradient(180deg, ${fire}, transparent 82%)`,
                  opacity: 0.64 * g * breath * kick, filter: "blur(9px)", mixBlendMode: "screen",
                  zIndex: 3, pointerEvents: "none",
                }} />
                {/* a HARD hue rim around the whole fascia. This is the layer that makes
                    trade 1 unmistakably a different colour from trade 0 at row width. */}
                <div style={{
                  position: "absolute", left: sh.x + 8, top: 204, width: 504, height: 74, borderRadius: 5,
                  border: `${(2 + 2.4 * g).toFixed(2)}px solid ${fire}`,
                  opacity: 0.72 * g * (0.82 + 0.18 * Math.sin(lf / 15 + i * 2.2)) * Math.min(1.5, kick),
                  mixBlendMode: "screen", zIndex: 4, pointerEvents: "none",
                }} />
                {/* the trade's own strip light under the fascia, wiping on left to right
                    with a real overshoot past full width, then settling back to it */}
                <div style={{
                  position: "absolute", left: sh.x + 12, top: 268,
                  width: 496 * Math.min(1.04, Math.max(0.02, overshoot(lf, S4_IGN[i], S4_IGNDUR[i], 0.07))), height: 7,
                  background: `linear-gradient(90deg, ${fire}, #FFF6E2 60%, ${fire})`,
                  opacity: 0.9 * breath, mixBlendMode: "screen", zIndex: 4, pointerEvents: "none",
                }} />
                {/* a hot spot running the strip forever after, so the tube never sits dead */}
                {g > 0.9 && <div style={{ position: "absolute", left: sh.x + 12, top: 264, width: 496, height: 15, overflow: "hidden", zIndex: 4, pointerEvents: "none" }}>
                  <div style={{
                    position: "absolute", left: ((lf * 5.4 + i * 130) % 620) - 62, top: 2,
                    width: 62, height: 11, borderRadius: 6, background: "#FFF6E2",
                    opacity: 0.34 * breath, filter: "blur(5px)", mixBlendMode: "screen",
                  }} />
                </div>}
                {/* the window going live behind the glass */}
                <div style={{
                  position: "absolute", left: sh.x + OFF_WIN - 16, top: 336, width: 172, height: 214,
                  background: `radial-gradient(ellipse at 44% 34%, ${fire}, transparent 70%)`,
                  opacity: 0.54 * g * breath * kick, filter: "blur(13px)", mixBlendMode: "screen",
                  zIndex: 3, pointerEvents: "none",
                }} />
                {/* the door glass going live, and its own spill down the stoop */}
                <div style={{
                  position: "absolute", left: sh.x + OFF_DOOR - 10, top: 342, width: 132, height: 226,
                  background: `radial-gradient(ellipse at 50% 40%, ${fire}, transparent 72%)`,
                  opacity: (0.24 + 0.34 * doorOpen[i]) * g * breath, filter: "blur(15px)",
                  mixBlendMode: "screen", zIndex: 3, pointerEvents: "none",
                }} />
                {/* the pool this trade lays on its own stretch of wet pavement */}
                <div style={{
                  position: "absolute", left: sh.x + 20, top: 592, width: 480, height: 78,
                  background: `radial-gradient(ellipse at 50% 20%, ${fire}, transparent 72%)`,
                  opacity: 0.42 * g * breath * (0.9 + 0.1 * Math.sin(lf / 21 + i)), filter: "blur(17px)", mixBlendMode: "screen",
                  zIndex: 2, pointerEvents: "none",
                }} />
                {/* THE IGNITION FLARE RING. One clean expanding ring per trade, thinning
                    as it goes, so the catch reads as an event and not as a fade up. */}
                {[0, 1].map((k) => {
                  const at = S4_IGN[i] + k * 4;
                  const dur = 22 + k * 9;
                  const e = over(lf, at, dur, Easing.out(Easing.poly(5)));
                  if (e <= 0.001 || e >= 0.999) return null;
                  const w = 150 + 470 * e;
                  return <div key={"fr" + k} style={{
                    position: "absolute", left: sh.x + 260 - w / 2, top: 240 - (w * 0.44) / 2,
                    width: w, height: w * 0.44, borderRadius: "50%",
                    border: `${Math.max(1.2, (5 - k) * (1 - e)).toFixed(2)}px solid ${fire}`,
                    opacity: (1 - e) * (k ? 0.34 : 0.62), mixBlendMode: "screen", zIndex: 4, pointerEvents: "none",
                  }} />;
                })}
                {/* embers thrown off the fascia as it catches, and a pool of light
                    slamming down onto the wet pavement in the SAME frames */}
                <Sparkles lf={lf} at={S4_IGN[i]} x={sh.x + 260} y={252} n={11} life={30} spread={190} rise={70} hue={fire} sd={i * 9 + 2} z={6} o={0.85} />
                <GroundRing lf={lf} at={S4_IGN[i] + 2} x={sh.x + 260} y={610} r={330} dur={22} hue={fire} z={2} o={0.5} />
              </React.Fragment>
            );
          })}

          {/* ---- THE SERVICE RUNS UNDER THE ROAD. Each trade owns one riser and
               one horizontal run in the foundation course, and each lights in its
               own hue the moment its fascia catches, so the lower band carries the
               same four ignitions instead of sitting there as bare brick. ---- */}
          {SHOPS.map((sh, i) => {
            const g = ign[i];
            const fire = S4_FIRE[i];
            const rx = sh.x + 250;
            const runY = 884 + i * 6;
            return (
              <React.Fragment key={"un" + i}>
                {/* the riser dropping out of the road into the foundation */}
                <div style={{ position: "absolute", left: rx, top: 800, width: 20, height: 300, borderRadius: 4, background: "linear-gradient(90deg,#2A2418,#14110A,#241E14)", zIndex: 1 }} />
                {[0, 1, 2].map((k) => (
                  <div key={"fl" + k} style={{ position: "absolute", left: rx - 6, top: 820 + k * 92, width: 32, height: 14, borderRadius: 3, background: "#3A3120", zIndex: 1 }} />
                ))}
                {/* the junction box at the foot of the riser, its lamp on this trade's hue */}
                <div style={{ position: "absolute", left: rx - 22, top: 1096, width: 64, height: 44, borderRadius: 4, background: "linear-gradient(180deg,#39434C,#1C2228)", border: "2px solid #12161B", zIndex: 2 }}>
                  <div style={{ position: "absolute", left: 26, top: 16, width: 12, height: 12, borderRadius: "50%", background: g > 0.4 ? fire : "#2A3038", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 9 + i)) }} />
                </div>
                {g > 0.02 && <>
                  {/* the hue running the length of this trade's foundation course */}
                  <div style={{
                    position: "absolute", left: sh.x + 20, top: runY, width: 480, height: 26,
                    background: `linear-gradient(180deg, ${fire}, transparent 88%)`,
                    opacity: 0.34 * g, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 2, pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", left: sh.x + 30, top: runY + 8, width: 460 * g, height: 4,
                    background: fire, opacity: 0.6, mixBlendMode: "screen", zIndex: 3, pointerEvents: "none",
                  }} />
                  {/* three charges travelling the riser down, then out along the run */}
                  {[0, 1, 2].map((k) => {
                    const p = (((lf - S4_IGN[i]) * 5 + k * 116 + seed(i * 2.3 + k) * 60) % 350) / 350;
                    return <div key={"ch" + k} style={{
                      position: "absolute", left: rx - 3, top: 800 + p * 292, width: 26, height: 18,
                      borderRadius: "50%", background: `radial-gradient(ellipse, ${fire}, transparent 70%)`,
                      opacity: g * (0.35 + 0.5 * Math.sin(p * Math.PI)), filter: "blur(4px)",
                      mixBlendMode: "screen", zIndex: 3, pointerEvents: "none",
                    }} />;
                  })}
                  {/* seepage catching the new light on the brick below the run */}
                  {[0, 1, 2, 3, 4].map((k) => {
                    const s = seed(i * 7.1 + k * 3.3);
                    return <div key={"sp" + k} style={{
                      position: "absolute", left: sh.x + 40 + s * 440, top: runY + 26,
                      width: 3 + s * 4, height: 70 + s * 110,
                      background: `linear-gradient(180deg, ${fire}, transparent)`,
                      opacity: 0.16 * g * (0.7 + 0.3 * Math.sin(lf / 17 + k)), mixBlendMode: "screen",
                      zIndex: 2, pointerEvents: "none",
                    }} />;
                  })}
                </>}
              </React.Fragment>
            );
          })}

          {/* ---- THE FOUR TRADE BADGES on the brickwork. Wordless geometry only,
               scale pulsed by the sweep, staged as a game show category board. ---- */}
          {SHOPS.map((sh, i) => {
            const on = 0.42 + 0.58 * (1 - redact[i]);
            const fire = S4_FIRE[i];
            // it POPS when its plate unredacts, overshooting and settling, then it
            // never stops: it hangs off an arm and swings for the rest of the scene.
            const pop = 1 + 0.34 * Math.max(0, s4Settle(lf, S4_UNRED[i] + 2, 1, 0.13, 0.10));
            const s = (1 + hl[i] * 0.20) * pop;
            const swing = s4Settle(lf, S4_UNRED[i] + 2, 11, 0.11, 0.055)
              + s4Settle(lf, S4_IGN[i], 5, 0.15, 0.09)
              + s4Drift(lf, 2.2, 118 + i * 21, i * 1.4);
            const gl = ign[i] * (0.72 + 0.28 * s4Flick(lf, 0.5, i)) * Math.min(1.6, flare[i]);
            return (
              <div key={"bd" + i} style={{ position: "absolute", left: sh.x + 372, top: 58, width: 118, height: 152, zIndex: 9, opacity: on }}>
                {/* the arm it hangs from, bolted to the brick */}
                <div style={{ position: "absolute", left: 8, top: 0, width: 54, height: 9, borderRadius: 3, background: grad("#8A6A18", "#4E3C0C") }} />
                <div style={{ position: "absolute", left: 4, top: -4, width: 16, height: 17, borderRadius: 3, background: grad("#B99A38", "#6C5310"), border: "2px solid #3E3008" }} />
                <div style={{ position: "absolute", left: 56, top: 6, width: 5, height: 16, background: "#4E3C0C" }} />
                {/* THE TRADE BLADE. Big enough to read as a silhouette at thumbnail size. */}
                <div style={{ position: "absolute", left: 0, top: 20, width: 118, height: 118, transformOrigin: "50% 0%", transform: `rotate(${swing.toFixed(3)}deg) scale(${s.toFixed(3)})` }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: grad("#C8A33A", "#5E4710"), border: `4px solid ${hl[i] > 0.4 ? "#F4DC96" : "#3E3008"}`, boxShadow: "0 10px 20px rgba(6,8,14,0.6)" }} />
                  <div style={{ position: "absolute", inset: 9, borderRadius: 6, background: "rgba(22,16,4,0.66)" }} />
                  {/* the blade takes its trade's hue the moment that trade catches */}
                  {ign[i] > 0.02 && <>
                    <div style={{ position: "absolute", inset: 6, borderRadius: 8, background: `radial-gradient(ellipse at 50% 40%, ${fire}, transparent 76%)`, opacity: 0.62 * gl + 0.24 * hl[i], mixBlendMode: "screen" }} />
                    <div style={{ position: "absolute", inset: 0, borderRadius: 10, border: `3px solid ${fire}`, opacity: 0.7 * gl, mixBlendMode: "screen" }} />
                  </>}
                  {/* a specular always crawling the brass, so it is never a flat plate */}
                  <div style={{ position: "absolute", left: -30 + ((lf * 1.9 + i * 61) % 190), top: 0, width: 20, height: 118, background: "linear-gradient(90deg, transparent, rgba(255,244,214,0.20), transparent)", transform: "skewX(-16deg)", mixBlendMode: "screen" }} />
                  {/* plumb: a pipe elbow with a spigot */}
                  {i === 0 && <><div style={{ position: "absolute", left: 24, top: 52, width: 60, height: 21, borderRadius: 3, background: "#F2DFA6" }} /><div style={{ position: "absolute", left: 63, top: 26, width: 21, height: 58, borderRadius: 3, background: "#F2DFA6" }} /><div style={{ position: "absolute", left: 16, top: 46, width: 14, height: 33, borderRadius: 3, background: "#F2DFA6" }} /></>}
                  {/* elec: a fat bolt from two triangles */}
                  {i === 1 && <><div style={{ position: "absolute", left: 36, top: 22, width: 0, height: 0, borderLeft: "23px solid transparent", borderRight: "23px solid transparent", borderBottom: "37px solid #F2DFA6" }} /><div style={{ position: "absolute", left: 36, top: 58, width: 0, height: 0, borderLeft: "23px solid transparent", borderRight: "23px solid transparent", borderTop: "37px solid #F2DFA6" }} /></>}
                  {/* dds: a molar with two roots */}
                  {i === 2 && <div style={{ position: "absolute", left: 32, top: 26, width: 54, height: 66, borderRadius: "24px 24px 7px 7px", background: "#F2DFA6" }}><div style={{ position: "absolute", left: 24, top: 40, width: 7, height: 26, background: "#3E3008" }} /></div>}
                  {/* auto: a tyre with a hub */}
                  {i === 3 && <div style={{ position: "absolute", left: 26, top: 26, width: 66, height: 66, borderRadius: "50%", border: "15px solid #F2DFA6" }}><div style={{ position: "absolute", left: 12, top: 12, width: 12, height: 12, borderRadius: "50%", background: "#F2DFA6" }} /></div>}
                </div>
              </div>
            );
          })}

          {/* ---- THE FOUR CUSTOMERS. Each is already walking his own bay long
               before his bay breaks, and only then does he RUN. The turnaround
               cadence the reel taught for two scenes is deliberately broken
               here: every one of them beats the pole to the door. ---- */}
          {[0, 1, 2, 3].map((i) => {
            const born = i === 0 ? 0 : S4_BREAK[i] - 40;
            if (lf < born) return null;
            const dx = doorX(i);
            const runP = Math.max(0, Math.min(1, (lf - S4_RUN[i]) / 14));
            const walkP = Math.max(0, Math.min(1, (lf - born) / (S4_RUN[i] - born)));
            // he lands on the door at S4_ARRIVE[i], always before the pole. He then
            // waits up to 80 frames for the door, so he shifts his weight at the
            // glass instead of standing dead still until the light pools join.
            const waiting = lf >= S4_ARRIVE[i];
            // he shifts his weight at the glass on two incommensurate sines, so no
            // two customers ever wait on the same rhythm and none of them freezes
            const idle = waiting ? s4Drift(lf - S4_ARRIVE[i], 4.2, 46 + i * 9, i * 1.3) : 0;
            // he LEANS BACK a few frames before he runs, then arrives with a real
            // overshoot and a settle instead of easing to a dead stop at the door
            const antP = antic(lf, S4_RUN[i], varyDur(i, 14, 0.2), 0.10, Easing.out(Easing.poly(5)));
            const land = s4Settle(lf, S4_ARRIVE[i], 7, 0.14, 0.11);
            const x = dx - 280 + walkP * 60 + antP * 178 + idle + land;
            const inP = Math.max(0, Math.min(1, (lf - (S4_DOORS + 2 + i * 3)) / 11));
            const nowChip = lf >= S4_RUN[i] - 2 ? Math.min(1, (lf - (S4_RUN[i] - 2)) / 10) : 0;
            return (
              <div key={"cu" + i} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - inP, transform: `translate(${inP * 26}px, ${-inP * 6}px) scale(${1 - inP * 0.1})`, transformOrigin: `${x}px 660px` }}>
                {/* he covers 178px in about ten frames, so he gets streaks behind him */}
                <SpeedLines lf={lf} x={x - 150} y={566} w={170} h={92} n={9} on={runP > 0.06 && runP < 0.94 ? 0.5 : 0} hue="rgba(226,214,190,0.42)" sd={i * 4 + 1} z={31} />
                <Customer
                  lf={lf} x={x} y={660} scarf={i} prop={S4_PROPS[i]} coin={1} walk={waiting ? 0 : 1}
                  run={runP > 0 && runP < 1 ? 1 : 0} now={nowChip} size={104} z={32}
                />
              </div>
            );
          })}

          {/* ---- NOBODY HOME, in quadruplicate. He multiplies exactly once in the
               whole reel and it is the scene where he loses: all four raise in
               perfect unison at f60, and every single pole bounces off a bracket
               that was not there ten seconds ago. Opacity 0.62, zero shadow. ---- */}
          {[0, 1, 2, 3].map((i) => {
            const on = S4_WALKON[i];
            if (on > 0 && lf < on) return null;
            const dx = doorX(i);
            const wp = on < 0 ? 1 : Math.max(0, Math.min(1, (lf - on) / 18));
            const walking = wp > 0 && wp < 1;
            const seamX = SHOPS[i].x + 544;
            const rest = dx + 120;
            const push = over(lf, S4_DOORS + 4, 18, Easing.out(Easing.cubic));
            const x = (on < 0 ? rest : seamX + (rest - seamX) * Easing.inOut(Easing.quad)(wp)) + push * 44;

            // the raise ANTICIPATES, the four of them are a few frames apart rather
            // than machine perfect, and the hold underneath it never sits still
            const raise = antic(lf, S4_RAISE[i], 9, 0.22, Easing.out(Easing.back(2.1)));
            const settle = over(lf, 74 + i * 2, varyDur(i, 14, 0.2));
            const swing = over(lf, S4_BOUNCE[i] - 8, 8, Easing.in(Easing.quad));
            // FOUR DIFFERENT FAILURES. Same defeat, four readings of it: a slow sag,
            // a fast judder, a hard kick back, a limp droop. Never the same curve twice.
            const failed = s4Settle(lf, S4_BOUNCE[i] + 1, S4_FAILAMP[i], S4_FAILFREQ[i], S4_FAILDEC[i]);
            const sag = lerpv((lf - S4_BOUNCE[i]) / 46, 0, 1) * [0.16, 0.05, 0.09, 0.24][i];
            const poleAmt = 0.3 + raise * 0.7 - settle * 0.5 + swing * 0.55 + failed - sag
              + s4Idle(lf, 0.022, 63 + i * 17, i * 2.1);
            const bAmt = lf >= S4_BOUNCE[i] ? Math.max(0, 1 - (lf - S4_BOUNCE[i]) / varyDur(i, 26, 0.3)) : 0;
            // six frames before he swings, the visor tilts at the door. He always knows first.
            const tilt = over(lf, S4_RAISE[i] - 6, 6) - over(lf, 70 + i * 3, 8) + over(lf, S4_BOUNCE[i] - 14, 6) - over(lf, S4_BOUNCE[i] + 4, 10)
              + 0.06 * Math.sin(lf / 19 + i * 1.7);

            return (
              <React.Fragment key={"nb" + i}>
                {/* the bracket rejects the pole hard enough to knock his own dust loose */}
                <Dust lf={lf} at={S4_BOUNCE[i]} x={dx + 96} y={640} n={7} life={62} spread={vary(i, 110, 0.3)} hue="rgba(142,139,132,0.42)" sd={i * 6 + 3} z={23} o={0.8} />
                <Nobody
                  lf={lf + i * 7} x={x} y={660}
                  pole={Math.max(0.24, poleAmt)}
                  solid={0} tally={0} dust={(1 - push * 0.82) * (0.9 + 0.1 * Math.sin(lf / 15 + i * 2.3))} size={158}
                  tick={0} tilt={Math.max(0, Math.min(1, tilt))} bounce={bAmt}
                  walk={walking ? 1 : 0} z={24}
                />
              </React.Fragment>
            );
          })}

          {/* ---- THE SERVICE SEAMS between the shops. Near black gaps in the
               frontage. His three copies step out from behind these, so nothing
               ever pops into existence on a bare pavement.
               ⛔ z 30 sits ABOVE <Nobody> z 24 on purpose, so he is hidden until he
               walks clear. The customers are therefore staged at z 32: every one of
               them starts his approach at doorX-280, which is inside the previous
               shop's seam, and at z 22 the slab sheared their heads off. ---- */}
          {SHOPS.map((sh, i) => (
            <div key={"sm" + i} style={{ position: "absolute", left: sh.x + 522, top: 150, width: 44, height: 448, zIndex: 30 }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#0B0F16,#05070B 46%,#0C1119)" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: 448, background: "rgba(140,164,196,0.16)" }} />
              <div style={{ position: "absolute", left: 41, top: 0, width: 3, height: 448, background: "rgba(140,164,196,0.1)" }} />
              <div style={{ position: "absolute", left: 6, top: 300, width: 32, height: 150, background: "radial-gradient(ellipse at 50% 100%, rgba(120,142,180,0.14), transparent 70%)", filter: "blur(6px)" }} />
              {/* a drainpipe down the seam, with a bead of runoff travelling it */}
              <div style={{ position: "absolute", left: 17, top: 0, width: 11, height: 448, borderRadius: 4, background: "linear-gradient(90deg,#1A2029,#0D1219)" }} />
              <div style={{ position: "absolute", left: 19, top: ((lf * 6 + i * 90) % 448), width: 7, height: 13, borderRadius: 4, background: "rgba(178,204,236,0.42)" }} />
            </div>
          ))}
        </Street>
      </Cam>

      {/* ==== PANEL LOCAL FOREGROUND, outside the camera ==== */}

      {/* four discarded padlocks tumbling past the lens, one per unlocked plate.
          Each is routed clear of every figure in frame at the frames it falls. */}
      {[0, 1, 2, 3].map((i) => {
        const at = S4_UNRED[i] + 3;
        const dur = varyDur(i, 26, 0.24);
        const p = Math.max(0, Math.min(1, (lf - at) / dur));
        if (p <= 0 || p >= 1) return null;
        const x0 = [196, 300, 823, 700][i], x1 = [90, 300, 760, 620][i];
        const sc = 0.5 + p * 2.9;
        const spin = seed(i * 5.1) * 40;
        // it is FLICKED off the plate: a short hop up before gravity takes it, and
        // the horizontal drifts on an eased arc rather than a straight line
        const px = arcX(lf, at, dur, x0, x1) - 22;
        const py = 214 + 730 * p * p - vary(i, 36, 0.4) * 4 * p * (1 - p);
        return (
          <div key={"pl" + i} style={{
            position: "absolute", left: px, top: py, width: 44, height: 52,
            zIndex: 58, transform: `scale(${sc}) rotate(${(spin + p * 250 + Math.sin(p * 9) * 14).toFixed(2)}deg)`, filter: `blur(${p * 5.4}px)`, opacity: Math.min(1, (1 - p) * 2.4),
          }}>
            <div style={{ position: "absolute", left: 10, top: 0, width: 24, height: 22, borderRadius: "12px 12px 0 0", border: "5px solid #C9A227", borderBottom: "none" }} />
            <div style={{ position: "absolute", left: 0, top: 18, width: 44, height: 32, borderRadius: 5, background: grad("#F0CB63", "#8A6A18"), border: "3px solid #5F4810", boxShadow: "0 6px 14px rgba(6,8,14,0.6)" }} />
            <div style={{ position: "absolute", left: 19, top: 30, width: 7, height: 12, borderRadius: 3, background: "#3A2C08" }} />
          </div>
        );
      })}

      {/* foreground grit kicked off the wet road, low in frame and well below
          every figure's feet, blurred at lens depth so it reads as near. */}
      {/* runs the WHOLE scene, thin at the top and thickening as the street fills,
          so the lens depth is never a dead layer */}
      {Array.from({ length: 18 }, (_, i) => {
        const s = seed(i * 3.7 + 61);
        const span = 62 + s * 26;
        const cyc2 = (lf * (1.2 + s * 1.7) + s * 210 + i * 13) % span;
        const p = cyc2 / span;
        const dense = 0.3 + 0.7 * over(lf, 100, 30, Easing.inOut(Easing.quad));
        return (
          <div key={"fg" + i} style={{
            position: "absolute", left: 90 + s * 760 + p * 44 + Math.sin(lf / (26 + s * 22) + i) * 9,
            top: 690 + Math.sin(p * Math.PI) * -48 + p * p * 74,
            width: 5 + s * 4, height: 5 + s * 4, borderRadius: "50%", background: "#DFE9F4",
            opacity: (1 - p) * 0.32 * dense, filter: "blur(2.6px)", zIndex: 57, pointerEvents: "none",
          }} />
        );
      })}

      {/* the STEP 1 footer strip. Rendered solid, settling only in translateY. */}
      <div style={{
        position: "absolute", left: 40, top: 752, zIndex: 62,
        transform: `translateY(${(1 - over(lf, 2, 12, Easing.out(Easing.cubic))) * 10}px)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px", borderRadius: 8, background: "rgba(12,16,24,0.7)", border: `2px solid ${BRASSLO}`, boxShadow: "0 8px 18px rgba(6,8,14,0.5)" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: GOLD, opacity: 0.6 + 0.4 * Math.sin(lf / 11) }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.16em", color: "#F0D79A" }}>STEP 1</div>
          {/* four pips, one per trade, each filling in its own hue on the frame that
              trade catches. Wordless, and it is the whole scene in one glance. */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: 6 }}>
            {[0, 1, 2, 3].map((i) => {
              const g = ign[i];
              const kickP = 1 + 0.5 * Math.max(0, s4Settle(lf, S4_IGN[i] + 1, 1, 0.14, 0.12));
              return (
                <div key={"pip" + i} style={{
                  width: 15, height: 15, borderRadius: 4,
                  background: g > 0.04 ? S4_FIRE[i] : "#2A3038",
                  border: `2px solid ${g > 0.04 ? S4_FIRE[i] : "#39404E"}`,
                  opacity: 0.34 + 0.66 * g * (0.86 + 0.14 * Math.sin(lf / 10 + i * 1.9)),
                  transform: `scale(${(0.82 + 0.18 * g).toFixed(3)}) scale(${kickP.toFixed(3)})`,
                }} />
              );
            })}
          </div>
        </div>
      </div>

      <HUD lf={lf} text="4 TRADES" color={GOLD} />
      <Vig o={0.3} />
    </>
  );
};

// ==== part: 15_S5.tsx ====

// ===========================================================================
// SCENE 5 , STEP TWO: BUILD IT ONCE      START 26.58s · 138 frames · verb SLOT
// ---------------------------------------------------------------------------
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   · CAMERA already travelling hard toward macro on an ease OUT, so its speed
//     is at maximum on frame 0. It never comes to rest for the whole scene.
//   · Valvotine's DOORMAN BOOTH fully built, lit, lantern burning, its brass
//     side hatch ALREADY 55 percent swung open and still swinging.
//   · The three tier CARD RACK visible in the open hatch, all three slots EMPTY
//     and sweeping a specular one after another so the EMPTY state is seen
//     before the full one. The desk bell plunger on top is already ringing idle.
//   · The fourth pigeonhole under the rack already holds the rolled newspaper
//     that nobody ever collects.
//   · THE DOORMAN inside the glass, headset on, waiting, slouched one notch,
//     nodding. Eyes visible.
//   · THE HERO at world 2302, greatcoat, pillbox cap, tool belt, till on a
//     strap, left arm ALREADY rising toward the brass lever. Eyes visible.
//   · THE BRASS LEVER on its bracket, oxblood knob, idling on a live jitter.
//   · NOBODY HOME at world 2060, opacity 0.62, NO cast shadow, dust pooling,
//     visor already tilted at the rack, arm ALREADY 30 percent extended and
//     creeping. His hook pole is already propped against the brick: he has put
//     it down and is trying his hands, which do not work either.
//   · Rain already beading and running down the booth glass, drizzle at two
//     parallax speeds, four lamp cones flickering out of phase, road puddles
//     rippling, Drip Bros' magenta cycling on the far right, the rest of the
//     street already thrown to blur(4px) and 34 percent.
//   · The blurred clipboard card already fluttering at the bottom foreground.
//   · Footer chip STEP 2 rendered solid.
// AT FRAME 137: rack lamps pulsing, doorman adjusting his headset, rain still
// running on the glass, the blurred card still fluttering, the villain still
// walking away, the camera still racking out. Cut from mid motion.
// ---------------------------------------------------------------------------
// FOUR PLUS CONCURRENT BACKGROUND LAYERS AT ALL TIMES: far drizzle, near
// drizzle, four out of phase lamp cones, rival magenta cycle, road puddle
// ripple and passing vehicle, booth rain beads, booth glass sheen, villain dust
// motes. Primary subject motion: the three cards. Secondary: the villain's arm.
// ---------------------------------------------------------------------------
// POLISH PASS. The beat clock, so nothing overlaps and nothing dead stops:
//   f00-f26  push to macro, hatch snaps wide and wobbles, EMPTY rack swept
//   f17-f45  pull one, print one, fly one, seat one, lamp one
//   f37-f65  pull two, print two, fly two, seat two, lamp two
//   f57-f86  pull three, print three, fly three, seat three, lamp three
//   f84-f100 the plunger is struck, the rack is BUILT, the villain fails and
//            physically backs off. This is the old dead air and it is now the
//            single loudest beat of the scene.
//   f96-f118 hatch swings shut, brass seal boss lands, warmth steps up
//   f118-f137 rack out, gate card rises, everything still breathing
// ===========================================================================

// ---- world anchors, all derived from the locked geometry (Valvotine, SHOPS[3])
const S5_BOOTH_X = 2120;          // boothX(3) = 1800 + OFF_BOOTH(320)
const S5_BOOTH_Y = 560;           // W_STOOP
const S5_RACK_X = 2134;           // booth local left 14
const S5_RACK_Y = 390;            // booth local top 60
const S5_SLOT_X = 2139;           // world left edge of a slot card
const S5_SLOT_TOP = [398, 430, 462];  // world top of each slot well
const S5_SLOTS = [411, 443, 475]; // slot centre world y, booth local 8 + i*32
const S5_SLOT_CX = 2162;          // world centre of a seated card
const S5_DISP = { x: 2240, y: 462 };   // the deli ticket dispenser mouth
const S5_LEVER = { x: 2252, y: 452 };  // pivot of the chunky brass lever
const S5_PLUNGER = { x: 2158, y: 372 };// the hotel desk bell on top of the rack
const S5_HERO_X = 2302;
const S5_VILL_X = 2060;
const S5_KEY = "#5E8A92";         // the colour script's cool blue green for S5
const S5_WARM = "#F2C87E";        // the one warm pool, on the card rack only
const S5_KNOB = "#8E4030";        // oxblood, deliberately NOT the reserved hard red

// the three beat clocks. Everything downstream is derived from these.
const S5_PULL_T = [17, 37, 57];   // the lever starts winding up here
const S5_PRINT_T = [30, 50, 70];  // the card is extruded and flies here
const S5_SEAT_T = [46, 66, 86];   // the booth takes over the seated card here
const S5_BELL_T = 88;             // the desk bell plunger is struck

// three camera poses. Custom, because CAMS.STOOP is authored over Pipe Bros and
// this scene lives on Valvotine's stoop at the far end of the row.
const S5_P0 = { x: 1847, y: 51, z: 1.10 };    // the booth whole, fascia to road
const S5_P1 = { x: 1995, y: 290, z: 2.15 };   // macro, filled with brass
const S5_P2 = { x: 1873, y: 207, z: 1.70 };   // racked back out, booth whole

// THE LEVER, with real resistance. It winds UP against the hand for five frames,
// then travels down on an in-quad so it accelerates under load, hits a hard
// mechanical stop, springs back past rest on a back ease and rings down on a
// damped sine. Returns 0 at rest, 1 at the bottom of the stroke.
const s5Pull = (lf: number, t: number) => {
  const wind = -0.15 * over(lf, t - 5, 5, Easing.inOut(Easing.sin));
  const down = 1.13 * over(lf, t, 9, Easing.in(Easing.quad));
  const back = over(lf, t + 10, 13, Easing.out(Easing.back(2.3)));
  const ring = settle(lf, t + 9, 0.10, 0.15, 0.13) * (1 - over(lf, t + 24, 12));
  return (wind + down) * (1 - back) + ring;
};

// THE CARD FLIGHT, 0 at the dispenser mouth, 1 seated in its slot, with a real
// landing overshoot and a damped settle instead of a dead stop.
const s5Fly = (lf: number, t: number) =>
  over(lf, t, 11, Easing.out(Easing.quad)) + settle(lf, t + 11, 0.085, 0.14, 0.13);

// the villain's reach: three attempts, all of them beaten by the brass, then he
// gives up bodily and walks. Never a straight line, never a rest.
const s5Reach = (lf: number) => {
  let r = 0.3;
  r += 0.5 * over(lf, 2, 32, Easing.inOut(Easing.cubic));
  r -= 0.58 * over(lf, 44, 9, Easing.in(Easing.cubic));
  r += 0.66 * over(lf, 62, 20, Easing.inOut(Easing.cubic));
  r += 0.14 * over(lf, 84, 6, Easing.out(Easing.poly(5)));      // the last lunge
  r -= 1.04 * over(lf, 92, 13, Easing.in(Easing.cubic));      // and the give up
  return Math.max(0.06, Math.min(1.06, r));
};

// THE HERO, doorman greatcoat over the canonical Mascot. Drawn after the body so
// overshoot is correct. Nothing is glued on: belt, strap, cap, all separate, and
// the cap and the till both LAG the arm so the group never acts as one piece.
const S5Hero: React.FC<{ lf: number; x: number; y?: number; size?: number; z?: number; lift?: number; yank?: number; swing?: number }> =
  ({ lf, x, y = 660, size = 170, z = 30, lift = 0, yank = 0, swing = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    const ang = -40 - 29 * lift + 11 * yank;
    const capLag = -2.4 * swing + idle(lf, 0.7, 71);
    const tillLag = 4.6 * swing + idle(lf, 1.5, 58, 1.2);
    const bodyLean = 1.8 * yank + idle(lf, 0.5, 97, 2.1);
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${bodyLean.toFixed(3)}deg) scale(${breathe(lf, 0.007, 78)})` }}>
        <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82} o={0.44} />
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.6} nodSpeed={10} stern={0.35} gaze={-2} />
        {/* the greatcoat, gold piping, brass buttons, epaulettes */}
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 78 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 5 * u, height: 78 * u, background: GOLD, opacity: 0.82 }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 104 * u, top: (106 + i * 20) * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: GOLD }} />)}
        <div style={{ position: "absolute", left: 26 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A", transformOrigin: "100% 50%", transform: `rotate(${(-swing * 1.6).toFixed(2)}deg)` }} />
        <div style={{ position: "absolute", left: 134 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A", transformOrigin: "0% 50%", transform: `rotate(${(swing * 1.6).toFixed(2)}deg)` }} />
        {/* the tool belt of brass door fittings, gained at S3. Each fitting has
            its own stagger so the belt never swings as a single plank. */}
        <div style={{ position: "absolute", left: 32 * u, top: 152 * u, width: 136 * u, height: 13 * u, background: "#4A3A18" }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={"f" + i} style={{
            position: "absolute", left: (42 + i * 30) * u, top: 154 * u, width: 15 * u, height: 20 * u, borderRadius: 2,
            background: grad("#D5AE44", "#7A5E18"), transformOrigin: "50% 0%",
            transform: `rotate(${(vary(i, 3.4, 0.5) * swing + idle(lf, vary(i, 1.5, 0.4), 62 + i * 9, i * 1.7)).toFixed(2)}deg)`,
          }} />
        ))}
        {/* the cash till on a strap, gained at S3 f186. It lags the yank. */}
        <div style={{ position: "absolute", left: 152 * u, top: 96 * u, width: 8 * u, height: 46 * u, background: "#33383F", transform: `rotate(${(-11 + swing * 2).toFixed(2)}deg)` }} />
        <div style={{ position: "absolute", left: 2 * u, top: 132 * u, width: 44 * u, height: 32 * u, borderRadius: 3, background: grad("#C8A02E", "#6E5310"), border: `${2 * u}px solid #4E3C0C`, transformOrigin: "50% 0%", transform: `rotate(${tillLag.toFixed(2)}deg)` }}>
          <div style={{ position: "absolute", left: 8 * u, top: 6 * u, width: 26 * u, height: 5 * u, borderRadius: 2, background: "#3A2C08" }} />
        </div>
        {/* the bellhop pillbox cap with a small gold C, lagging the body */}
        <div style={{ position: "absolute", left: 0, top: 0, width: size, height: size, transformOrigin: `${100 * u}px ${44 * u}px`, transform: `rotate(${capLag.toFixed(2)}deg)` }}>
          <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 27 * u, borderRadius: 3, background: "#8E3F2A" }} />
          <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
          <div style={{ position: "absolute", left: 56 * u, top: 37 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.86 }} />
          <div style={{ position: "absolute", left: 92 * u, top: 17 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
        </div>
        {/* the working arm, reaching up to the lever */}
        <div style={{ position: "absolute", left: 12 * u, top: 100 * u, width: (46 + 86 * lift) * u, height: 21 * u, borderRadius: 10 * u, background: HERO, border: `${2 * u}px solid #A8543A`, transformOrigin: `${6 * u}px 50%`, transform: `rotate(${ang}deg)` }}>
          <div style={{ position: "absolute", right: -2 * u, top: -3 * u, width: 26 * u, height: 26 * u, borderRadius: 5, background: "#5E5348", border: `${2 * u}px solid #3E362C` }} />
        </div>
      </div>
    );
  };

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- THE LEVER STROKES, needed early because the camera shakes off them.
  const pull0 = s5Pull(lf, S5_PULL_T[0]);
  const pull1 = s5Pull(lf, S5_PULL_T[1]);
  const pull2 = s5Pull(lf, S5_PULL_T[2]);
  const pulls = pull0 + pull1 + pull2;
  const leverAng = -16 + 54 * pulls + idle(lf, 1.6, 56) + drift(lf, 0.8, 33);

  // ---- CAMERA. Ease OUT on the push so frame 0 is the fastest frame of the
  // move, then a long eased rack back out. Handheld noise and a breathing scale
  // run permanently underneath, and every brass event kicks it.
  const push = over(lf, 0, 22, Easing.out(Easing.cubic));
  const rack = over(lf, 96, 42, Easing.inOut(Easing.cubic));
  const kick = shakeCam(lf, [
    { at: S5_SEAT_T[0] - 2, amp: 2.6, dur: 10 },
    { at: S5_SEAT_T[1] - 2, amp: 3.0, dur: 11 },
    { at: S5_SEAT_T[2] - 2, amp: 3.6, dur: 12 },
    { at: S5_BELL_T, amp: 5.4, dur: 16 },
    { at: 110, amp: 4.2, dur: 15 },
  ], 1.1);
  const camZ = (S5_P0.z + push * (S5_P1.z - S5_P0.z) + rack * (S5_P2.z - S5_P1.z)) * kick.z * breathe(lf, 0.006, 168);
  const camX = S5_P0.x + push * (S5_P1.x - S5_P0.x) + rack * (S5_P2.x - S5_P1.x) + kick.x * 2.4 + drift(lf, 2.4, 137);
  const camY = S5_P0.y + push * (S5_P1.y - S5_P0.y) + rack * (S5_P2.y - S5_P1.y) + kick.y * 2.4 + drift(lf, 2.0, 111, 1.4);

  // ---- THE HATCH. Already 55 percent open at f0, whips wide by f13, then rings
  // down on a damped sine and keeps a live hinge jitter for the whole hold. It
  // closes across f96 to f112 with its own overshoot into the frame.
  const hatchOpen = 0.55 + 0.45 * over(lf, 0, 13, Easing.out(Easing.poly(5))) + settle(lf, 13, 0.06, 0.15, 0.10);
  const hatchShut = overshoot(lf, 96, 18, 0.05);
  const hatchJit = idle(lf, 0.012, 47) + drift(lf, 0.008, 29);
  const hatchV = Math.max(0, (hatchOpen + hatchJit) * (1 - Math.min(1, hatchShut)));

  // ---- THE THREE CARDS. The booth only takes over the seated card once the
  // flying card has landed AND wobbled, so the same object is followed the whole
  // way and there is never a duplicate on screen.
  const seat = [over(lf, S5_SEAT_T[0], 4), over(lf, S5_SEAT_T[1], 4), over(lf, S5_SEAT_T[2], 4)];
  const cardsV = seat[0] + seat[1] + seat[2];

  // ---- THE DESK BELL PLUNGER. Struck once at f88, the frame the rack is built.
  // Squash on contact, spring back on a back ease, then it rings down and keeps
  // a permanent idle so it is never parked.
  const bellHit = over(lf, S5_BELL_T, 3, Easing.in(Easing.quad));
  const bellUp = over(lf, S5_BELL_T + 3, 14, Easing.out(Easing.back(2.6)));
  const bellDown = bellHit * (1 - bellUp) * 9 + settle(lf, S5_BELL_T + 4, 1.7, 0.17, 0.11) + idle(lf, 0.5, 64);
  const bellSq = squash(lf, S5_BELL_T, 0.3, 3);

  // He does NOT freeze after the third pull. He taps the bell at f86, swings the
  // hatch shut across f94 to f114, and a live breathe keeps the arm moving all
  // the way to the cut.
  const heroClose = over(lf, 94, 20, Easing.inOut(Easing.cubic));
  const heroPush = Math.sin(Math.PI * heroClose) * 0.8;
  const heroTap = Math.sin(Math.PI * over(lf, 84, 10, Easing.inOut(Easing.sin))) * 0.42;
  const heroLift = 0.35 + 0.65 * over(lf, 0, 20, Easing.out(Easing.cubic))
    + 0.22 * heroTap - 0.52 * heroClose + 0.035 * Math.sin(lf / 13) + 0.02 * drift(lf, 1, 83);
  // the cap, the till and the belt all lag the arm by three frames
  const swing = lag(lf, 3, (g) => s5Pull(g, S5_PULL_T[0]) + s5Pull(g, S5_PULL_T[1]) + s5Pull(g, S5_PULL_T[2]));

  // ---- THE THREE STATUS LAMPS on the booth's outer rail. Out of phase while
  // they light one at a time, synchronised into a slow pulse after the close.
  const sync = over(lf, 100, 20, Easing.inOut(Easing.cubic));

  // ---- THE DOORMAN straightens one notch per card, fully upright by f92. He is
  // never still: a breathe throughout, a start on the bell strike, and he is
  // adjusting his headset from f116 so he is mid gesture at the cut.
  const lean = 0.12 + 0.2 * over(lf, S5_SEAT_T[0], 10) + 0.2 * over(lf, S5_SEAT_T[1], 10) + 0.28 * over(lf, S5_SEAT_T[2], 12)
    + 0.05 * Math.sin(lf / 17) + 0.06 * settle(lf, S5_BELL_T, 1, 0.19, 0.10)
    + 0.09 * over(lf, 116, 10) * Math.sin((lf - 116) / 4);

  // ---- THE VILLAIN. Excluded, translucent, shadowless, silent, no ting.
  const reach = s5Reach(lf);
  const fret = reach > 0.7 ? Math.sin(lf * 1.7) * 2.4 * (reach - 0.7) : 0;
  // the scrape: for twelve frames his hand grinds along brass that has no angle
  const scrapeOn = Math.sin(Math.PI * over(lf, 82, 14, Easing.inOut(Easing.sin)));
  const scrape = scrapeOn * Math.sin(lf * 2.7) * 3.4;
  const villX = S5_VILL_X - 4 * over(lf, 92, 10, Easing.out(Easing.quad)) - 26 * over(lf, 100, 38, Easing.inOut(Easing.cubic));
  const villTilt = 0.62 + 0.34 * Math.sin(lf / 19) + fret * 0.3 - 0.3 * over(lf, 92, 12, Easing.out(Easing.quad));

  // ---- WARMTH. The booth steps warmer with each card and again on the close.
  const warmth = 0.62 + 0.09 * cardsV + 0.16 * over(lf, 104, 16, Easing.out(Easing.cubic));

  // ---- FOCUS. While the cards are landing the hero is stepped down half a stop
  // so the rack is the brightest and highest contrast thing in frame, and he
  // comes back up for the close. Staging only, no restaging.
  const heroDim = 0.2 * over(lf, 24, 10, Easing.inOut(Easing.sin)) - 0.2 * over(lf, 90, 14, Easing.inOut(Easing.sin));
  const rackKey = 0.34 * over(lf, 12, 14, Easing.out(Easing.quad)) - 0.2 * over(lf, 96, 18, Easing.inOut(Easing.sin));

  // ---- THE GATE. The blurred clipboard card rises into focus range and stays
  // unreadable. The result is sharp, the prompt is blurred.
  const gate = overshoot(lf, 118, 20, 0.07);
  const clipY = 720 - 128 * gate;
  const clipRot = -7 + drift(lf, 3.4, 74) + settle(lf, 118, 4.5, 0.11, 0.07);

  const camPose = { x: camX, y: camY, z: camZ };

  return (
    <>
      {/* ================= BACK LAYER: the rest of the street, thrown to
          blur(4px) and 34 percent so the booth is unmistakably the subject.
          Valvotine's own booth is omitted here and rebuilt sharp in front. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: `blur(4px) brightness(${(0.34 - 0.07 * rackKey).toFixed(3)}) saturate(0.82)` }}>
        <Cam {...camPose}>
          <Street
            lf={lf}
            booth={[1, 1, 1, 0]}
            board={[2, 1, 1, 0]}
            lit={[0.44, 0.44, 0.44, 1]}
            sign={0}
            bracket={1}
            rain={1}
            lamps={1}
            rival={0.55}
            tubes={1}
            tills={1}
            brackets={4}
            fill="#243038"
            pigeonAt={400}
            far={1}
            fore={1}
          />
        </Cam>
      </div>

      {/* ================= FRONT LAYER: the subject, sharp. Same camera pose. */}
      <Cam {...camPose}>
        {/* the sharp stoop lip, so the booth has a hard contact edge in focus */}
        <div style={{ position: "absolute", left: 2080, top: 556, width: 200, height: 24, background: "linear-gradient(180deg,#454C58,#333A46)", zIndex: 15 }} />
        <div style={{ position: "absolute", left: 2080, top: 556, width: 200, height: 4, background: "rgba(198,216,240,0.22)", zIndex: 15 }} />
        <div style={{ position: "absolute", left: 2068, top: 578, width: 224, height: 22, background: "#2C333E", zIndex: 15 }} />

        {/* the warm pool the booth throws on the wet stoop, growing per card */}
        <Reflect lf={lf} x={2172} y={572} w={250 + cardsV * 46} hue={S5_WARM} o={0.2 + 0.07 * cardsV} z={16} />
        {/* a soft warm bloom behind the brass, screen blended, never a halo */}
        <div style={{ position: "absolute", left: 2020, top: 300, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${S5_WARM}, transparent 68%)`, opacity: (0.1 + 0.07 * warmth + 0.05 * rackKey) * flick(lf, 0.1, 2), filter: "blur(34px)", mixBlendMode: "screen", zIndex: 16, pointerEvents: "none" }} />

        {/* his hook pole, PUT DOWN and propped against the brick. He is trying
            his hands instead, and they do not work either. It slips a little
            further down the brick every time he fails. */}
        <div style={{ position: "absolute", left: 2016, top: 560, zIndex: 23, opacity: 0.62 }}>
          <HookPole lf={lf} x={0} y={-208 + 5 * over(lf, 90, 16, Easing.in(Easing.quad))} ang={19 + idle(lf, 0.8, 82) + 2.4 * over(lf, 90, 16, Easing.out(Easing.back(1.8)))} len={208} z={23} />
        </div>

        {/* NOBODY HOME. Opacity 0.62, NO cast shadow, dust, no pole in hand,
            tally box sealed, zero sound, zero tings. */}
        <Nobody lf={lf} x={villX} y={660} size={158} pole={0} solid={0} tally={0} dust={0.5} tilt={villTilt} walk={lf > 100 ? 1 : 0} z={24} />

        {/* his reaching arm. It runs from his shoulder toward the rack and the
            brass booth body cuts it off: there is no angle on the rack. For
            twelve frames it grinds along the brass and gets nothing. */}
        <div style={{
          position: "absolute", left: 2099, top: 594, width: 40 + reach * 104, height: 21, borderRadius: 11,
          background: SLATE, border: "2px solid #454A54", opacity: 0.62, zIndex: 25,
          transformOrigin: "6px 50%", transform: `rotate(${(-52 - reach * 12 + fret + scrape).toFixed(2)}deg)`,
        }}>
          <div style={{ position: "absolute", right: -3, top: -4, width: 26, height: 26, borderRadius: 5, background: "#4C5058", border: "2px solid #383C44" }} />
        </div>

        {/* the grey chalk dust his failing hand knocks off the brass edge. It
            outlives the lunge, so the failure keeps breathing after it is over. */}
        <Dust lf={lf} at={83} x={2124} y={560} n={9} life={64} spread={62} hue="rgba(142,139,132,0.42)" sd={41} z={26} o={0.7} />
        <Dust lf={lf} at={93} x={2112} y={572} n={7} life={72} spread={78} hue="rgba(142,139,132,0.38)" sd={57} z={26} o={0.6} />
        {/* the blocked contact: a cold hard edge where slate meets brass, and
            nothing gets past it. Never warm, he is never rewarded. */}
        {scrapeOn > 0.05 && <div style={{
          position: "absolute", left: 2117, top: 540 - 26 * scrapeOn, width: 5, height: 46, borderRadius: 3,
          background: "linear-gradient(180deg, rgba(214,226,244,0.0), rgba(214,226,244,0.5), rgba(214,226,244,0.0))",
          opacity: 0.7 * scrapeOn, filter: "blur(1.4px)", zIndex: 26, pointerEvents: "none",
        }} />}

        {/* ---- THE BOOTH, sharp, with the doorman behind the glass ---- */}
        <div style={{ zIndex: 27, position: "absolute", left: 0, top: 0 }}>
          <Booth
            lf={lf} x={S5_BOOTH_X} y={S5_BOOTH_Y} build={1} lit={warmth} lantern={0.72 + 0.28 * warmth}
            hatch={hatchV} cards={cardsV} hue={S5_WARM} plate={1} bolthole={1} z={27}
          >
            {/* Booth children live INSIDE the glass panel (booth local 12,30,
                76 x 186) and the open card rack covers glass local y 30 to 134.
                He is sized and seated so his head and shoulders read in the gap
                BELOW the rack while the hatch is open, and each notch of `lean`
                lifts him further into the glass. Once the hatch shuts he is the
                only thing in the glass. */}
            <Doorman lf={lf} x={38} y={206} size={72} lean={lean} z={19} />
          </Booth>
        </div>

        {/* ---- THE RACK KEY LIGHT. A tight warm pool that sits ONLY on the three
            slots, so the meaning carrying prop is the brightest and highest
            contrast object in the frame while the cards land. Screen blended
            gradient, no coloured shadow, no halo. */}
        {hatchV > 0.3 && <div style={{
          position: "absolute", left: S5_RACK_X - 34, top: S5_RACK_Y - 30, width: 140, height: 168, borderRadius: 12,
          background: `radial-gradient(ellipse at 46% 46%, ${S5_WARM}, transparent 70%)`,
          opacity: (0.09 + 0.15 * rackKey) * flick(lf, 0.07, 5), filter: "blur(16px)", mixBlendMode: "screen",
          zIndex: 27, pointerEvents: "none",
        }} />}

        {/* ---- THE EMPTY STATE, SEEN FIRST. A specular sweeps each empty slot
            well in turn across f4 to f28 so a stranger reads three empty
            pigeonholes before anything is put in them. It dies as card one
            arrives and never returns. */}
        {hatchV > 0.5 && [0, 1, 2].map((i) => {
          const sw = Math.sin(Math.PI * over(lf, 4 + stagger(i, 6), 20, Easing.inOut(Easing.sin))) * (1 - over(lf, 30, 8));
          if (sw <= 0.02) return null;
          return (
            <div key={"emp" + i} style={{
              position: "absolute", left: S5_SLOT_X, top: S5_SLOT_TOP[i], width: 62, height: 26, borderRadius: 2,
              overflow: "hidden", zIndex: 28, pointerEvents: "none", opacity: 0.9 * sw,
            }}>
              <div style={{ position: "absolute", left: `${-45 + 150 * over(lf, 4 + stagger(i, 6), 22, Easing.inOut(Easing.cubic))}%`, top: 0, width: "44%", height: "100%", background: "linear-gradient(100deg, transparent, rgba(255,246,222,0.55), transparent)", filter: "blur(2px)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 2, border: "1px solid rgba(240,214,150,0.45)" }} />
            </div>
          );
        })}

        {/* the fourth pigeonhole under the rack, with the tiny rolled newspaper
            nobody ever collects. Hotel key rack, background gag, no text. */}
        {hatchV > 0.4 && <div style={{ position: "absolute", left: S5_RACK_X, top: S5_RACK_Y + 106, width: 72, height: 26, borderRadius: 3, background: "linear-gradient(180deg,#3A2E10,#170F05)", border: "2px solid #6A5314", zIndex: 28, opacity: Math.min(1, (hatchV - 0.4) * 7) }}>
          <div style={{ position: "absolute", left: 8 + idle(lf, 1.1, 118), top: 5, width: 44, height: 13, borderRadius: 7, background: grad("#D8D2C0", "#9A9484"), transformOrigin: "12% 50%", transform: `rotate(${(-3 + drift(lf, 1.9, 88) + settle(lf, S5_BELL_T, 3.2, 0.15, 0.11)).toFixed(2)}deg)` }} />
          <div style={{ position: "absolute", left: 14, top: 8, width: 30, height: 2, background: "rgba(70,66,56,0.7)" }} />
        </div>}

        {/* ---- the three cards. PRINTED out of the dispenser with a recoil,
            thrown on a parabola, landed with an overshoot and a wobble, and only
            then handed over to the booth's own seated card. Each one carries the
            SAME glyph it will carry in the slot, so it reads as one object
            travelling, not two objects swapping. ---- */}
        {[0, 1, 2].map((i) => {
          const t0 = S5_PRINT_T[i];
          if (lf < t0 - 9 || lf > t0 + 20) return null;
          const glyph = (
            <>
              {i === 0 && <><div style={{ position: "absolute", left: 10, top: 6, width: 30, height: 14, borderRadius: 5, background: "#4E3C0C" }} /><div style={{ position: "absolute", left: 15, top: 18, width: 8, height: 6, background: "#4E3C0C" }} /></>}
              {i === 1 && <><div style={{ position: "absolute", left: 9, top: 5, width: 6, height: 17, background: "#4E3C0C" }} />{[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 21 + k * 10, top: 10, width: 7, height: 7, border: "2px solid #4E3C0C" }} />)}</>}
              {i === 2 && <>{[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 24 + (k % 2) * 11, top: 6 + Math.floor(k / 2) * 10, width: 8, height: 7, background: "#4E3C0C" }} />)}<div style={{ position: "absolute", left: 6, top: 11, width: 15, height: 4, background: "#4E3C0C" }} /></>}
            </>
          );

          // PRINTING. Nine frames of extrusion out of the dispenser mouth, with
          // a two frame recoil back INTO the mouth before it is spat out.
          if (lf < t0) {
            const e = over(lf, t0 - 9, 9, Easing.out(Easing.quad));
            const recoil = -3 * Math.sin(Math.PI * over(lf, t0 - 3, 3, Easing.inOut(Easing.sin)));
            const hgt = Math.max(3, 5 + 23 * e);
            return (
              <div key={"pr" + i} style={{
                position: "absolute", left: S5_DISP.x - 26, top: S5_DISP.y - hgt + 4 + recoil, width: 52, height: hgt,
                borderRadius: 2, overflow: "hidden", background: grad("#F0D888", "#A8842A"), border: "1px solid #6A5314",
                zIndex: 29, boxShadow: "0 4px 9px rgba(6,8,14,0.6)",
                transform: `rotate(${(idle(lf, 1.4, 21, i) + recoil * 0.5).toFixed(2)}deg)`,
              }}>
                <div style={{ position: "absolute", left: 0, top: hgt - 28, width: 52, height: 28 }}>{glyph}</div>
              </div>
            );
          }

          // FLYING. Parabolic, never linear, with a landing overshoot and a
          // damped rotation settle on arrival.
          const p = s5Fly(lf, t0);
          const pc = Math.max(0, Math.min(1, p));
          const cx = S5_DISP.x + (S5_SLOT_CX - S5_DISP.x) * p;
          const cy = arcY(lf, t0, 11, S5_DISP.y, 34, S5_SLOTS[i]) + (p - pc) * (S5_SLOTS[i] - S5_DISP.y);
          const dx = cx - (S5_DISP.x + (S5_SLOT_CX - S5_DISP.x) * s5Fly(lf - 1, t0));
          const rot = 24 * (1 - pc) + settle(lf, t0 + 11, 7.5, 0.15, 0.14) + idle(lf, 0.8, 37, i);
          const sc = 0.9 + 0.1 * pc + 0.06 * Math.sin(Math.PI * pc);
          const fade = 1 - over(lf, S5_SEAT_T[i] - 2, 4);
          const card = (
            <div style={{
              position: "absolute", left: cx - 26, top: cy - 14, width: 52, height: 28, borderRadius: 2,
              background: grad("#F0D888", "#A8842A"), border: "1px solid #6A5314", boxShadow: "0 5px 11px rgba(6,8,14,0.62)",
              transform: `rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`, opacity: fade,
            }}>{glyph}</div>
          );
          return (
            <div key={"fly" + i} style={{ position: "absolute", left: 0, top: 0, zIndex: 29 }}>
              <Smear dx={dx * 1.6} dy={0} ghosts={3} on={pc < 0.75 ? 1 : 0} o={0.26} stretch={1.2}>{card}</Smear>
              {/* the brass slot click: a hard rim flash on the well the card just
                  dropped into, plus a small scatter of brass grit. */}
              {lf > t0 + 9 && <div style={{
                position: "absolute", left: S5_SLOT_X - 3, top: S5_SLOT_TOP[i] - 3, width: 68, height: 32, borderRadius: 4,
                border: `${(3 * (1 - over(lf, t0 + 10, 9, Easing.out(Easing.quad)))).toFixed(2)}px solid rgba(255,238,196,0.75)`,
                opacity: 0.9 * (1 - over(lf, t0 + 10, 11, Easing.out(Easing.quad))), filter: "blur(1.4px)", pointerEvents: "none",
              }} />}
              <Sparkles lf={lf} at={t0 + 10} x={S5_SLOT_CX} y={S5_SLOTS[i]} n={7} life={20} spread={54} rise={26} hue="#F0D888" sd={i * 13 + 2} z={31} o={0.85} />
            </div>
          );
        })}

        {/* ---- SEATED CARD CONTRAST. A thin warm rim drawn over each card the
            booth has taken over, so three tan cards on a dark rack still read as
            three filled slots at thumbnail size. It breathes, never static. */}
        {hatchV > 0.5 && [0, 1, 2].map((i) => {
          const s = seat[i];
          if (s <= 0.02) return null;
          const br = 0.55 + 0.45 * Math.sin((lf - i * 9 * (1 - sync)) / 15);
          return (
            <div key={"rim" + i} style={{
              position: "absolute", left: S5_SLOT_X + 1, top: S5_SLOT_TOP[i] + 1, width: 44, height: 24, borderRadius: 2,
              border: "1.5px solid rgba(255,240,200,0.5)", opacity: s * (0.4 + 0.28 * br), zIndex: 29, pointerEvents: "none",
              transform: `scale(${(1 + 0.012 * Math.sin(lf / 19 + i)).toFixed(4)})`,
            }} />
          );
        })}

        {/* ---- THE HOTEL DESK BELL PLUNGER on top of the rack. It idles for the
            whole build and is STRUCK on f88, the frame the third card is seated
            and the rack is finished. Squash on contact, spring past rest, ring
            down. This is the scene's "and it is built" punctuation. ---- */}
        {hatchV > 0.45 && <div style={{ position: "absolute", left: S5_PLUNGER.x, top: S5_PLUNGER.y + bellDown, width: 24, height: 16, zIndex: 30, transformOrigin: "50% 100%", transform: `scale(${bellSq.sx.toFixed(3)}, ${bellSq.sy.toFixed(3)})`, opacity: Math.min(1, (hatchV - 0.45) * 6) }}>
          <div style={{ position: "absolute", left: 0, top: 4, width: 24, height: 12, borderRadius: "12px 12px 2px 2px", background: grad("#F0CE68", "#8A6A18"), border: "1.5px solid #4E3C0C" }} />
          <div style={{ position: "absolute", left: 9, top: -6, width: 6, height: 11, borderRadius: 2, background: grad("#E0BC58", "#6A5314") }} />
          <div style={{ position: "absolute", left: 5, top: 6, width: 8, height: 3, borderRadius: 2, background: "rgba(255,248,214,0.55)" }} />
        </div>}
        {/* the ring the strike throws off, expanding and dying. No coloured halo,
            a plain brass rim that thins as it grows. */}
        {lf >= S5_BELL_T && lf < S5_BELL_T + 24 && (() => {
          const e = over(lf, S5_BELL_T, 22, Easing.out(Easing.poly(5)));
          const rr = 12 + 78 * e;
          return <div style={{ position: "absolute", left: S5_PLUNGER.x + 12 - rr, top: S5_PLUNGER.y + 8 - rr * 0.62, width: rr * 2, height: rr * 1.24, borderRadius: "50%", border: `${Math.max(1, 5 * (1 - e)).toFixed(2)}px solid rgba(246,222,168,0.5)`, opacity: 0.85 * (1 - e), filter: "blur(2px)", zIndex: 30, pointerEvents: "none" }} />;
        })()}
        <Sparkles lf={lf} at={S5_BELL_T + 1} x={S5_PLUNGER.x + 12} y={S5_PLUNGER.y + 6} n={11} life={30} spread={96} rise={62} hue="#F4DFA6" sd={71} z={31} />

        {/* ---- the three brass status lamps on the booth's outer rail. They stay
            visible after the hatch closes and settle into a synchronised pulse.
            Each one lights AFTER its card seats, so cause and effect share a
            frame and the lamps read as a filled counter. */}
        {[0, 1, 2].map((i) => {
          const on = overshoot(lf, S5_SEAT_T[i] + 1, 7, 0.16);
          const phase = i * 7 * (1 - sync);
          const puls = 0.7 + 0.3 * Math.sin((lf - phase) / 13) * flick(lf, 0.18, i);
          const v = Math.max(0, on) * puls;
          const sz = 17 * (1 + 0.16 * Math.max(0, settle(lf, S5_SEAT_T[i] + 5, 1.2, 0.16, 0.12)));
          return (
            <React.Fragment key={"lamp" + i}>
              <div style={{ position: "absolute", left: 2222 + (17 - sz) / 2, top: 400 + i * 32 + (17 - sz) / 2, width: sz, height: sz, borderRadius: "50%", background: v > 0.06 ? grad("#FBE7A8", "#C08A22") : "#332808", border: "2px solid #4E3C0C", zIndex: 28, opacity: 0.55 + v * 0.45 }} />
              {v > 0.06 && <div style={{ position: "absolute", left: 2208, top: 386 + i * 32, width: 46, height: 46, borderRadius: "50%", background: `radial-gradient(circle, ${S5_WARM}, transparent 66%)`, opacity: 0.42 * v, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 28, pointerEvents: "none" }} />}
            </React.Fragment>
          );
        })}

        {/* ---- THE BRASS SEAL BOSS. It swings over the shut hatch at f108 and
            never lifts again: the booth is built, and it was built once. It
            lands with an overshoot and keeps a slow idle to the cut. */}
        {hatchShut > 0.35 && (() => {
          const s = overshoot(lf, 108, 12, 0.14);
          const sw = -46 * (1 - Math.min(1, s)) + idle(lf, 1.3, 88);
          return (
            <div style={{ position: "absolute", left: 2194, top: 366, width: 34, height: 34, zIndex: 30, transformOrigin: "50% 50%", transform: `rotate(${sw.toFixed(2)}deg) scale(${(0.7 + 0.3 * Math.min(1.14, s)).toFixed(3)})`, opacity: Math.min(1, s * 1.6) }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#D9B44E", "#7A5E18"), border: "2px solid #4E3C0C" }} />
              <div style={{ position: "absolute", left: 11, top: 15, width: 13, height: 10, borderRadius: 2, background: "#3A2C08" }} />
              <div style={{ position: "absolute", left: 13, top: 8, width: 9, height: 9, borderRadius: "5px 5px 0 0", border: "2px solid #3A2C08", borderBottom: "none" }} />
            </div>
          );
        })()}

        {/* ---- THE HERO. Stepped down half a stop while the cards land so the
            rack out reads as the subject, and back up for the close. ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 30, filter: `brightness(${(1 - heroDim).toFixed(3)}) saturate(${(1 - heroDim * 0.5).toFixed(3)})` }}>
          <S5Hero lf={lf} x={S5_HERO_X} y={660} size={162} z={30} lift={heroLift} yank={pulls + heroPush} swing={swing} />
        </div>

        {/* ---- THE CHUNKY BRASS LEVER on its bracket, oxblood knob. Its whole
            arc lives ABOVE the hero's head line, so it never crosses a figure.
            The bracket itself judders under load: the lever has resistance. */}
        <div style={{ position: "absolute", left: 2214, top: 428 + Math.abs(pulls) * 1.6, width: 52, height: 48, borderRadius: 3, background: grad("#B79A46", "#5E4C14"), border: "2px solid #4E3C0C", zIndex: 29, transformOrigin: "50% 100%", transform: `rotate(${(settle(lf, S5_PULL_T[0] + 9, 1.4, 0.2, 0.2) + settle(lf, S5_PULL_T[1] + 9, 1.4, 0.2, 0.2) + settle(lf, S5_PULL_T[2] + 9, 1.4, 0.2, 0.2) + idle(lf, 0.3, 63)).toFixed(2)}deg)` }}>
          {[0, 1].map((i) => <div key={i} style={{ position: "absolute", left: 7 + i * 30, top: 8, width: 8, height: 8, borderRadius: "50%", background: "#E0BC58", border: "1px solid #5F4810" }} />)}
          {/* the deli ticket dispenser mouth the cards are printed out of */}
          <div style={{ position: "absolute", left: 8, top: 30, width: 36, height: 8, borderRadius: 2, background: "#120E06", boxShadow: "inset 0 2px 3px rgba(0,0,0,0.9)" }} />
        </div>
        {/* the print flash inside the mouth, so the eye is led lever, mouth, slot */}
        {[0, 1, 2].map((i) => {
          const g = Math.sin(Math.PI * over(lf, S5_PRINT_T[i] - 9, 12, Easing.inOut(Easing.sin)));
          if (g <= 0.03) return null;
          return <div key={"mf" + i} style={{ position: "absolute", left: 2216, top: 454, width: 48, height: 20, borderRadius: 6, background: `radial-gradient(ellipse, ${S5_WARM}, transparent 70%)`, opacity: 0.5 * g, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 29, pointerEvents: "none" }} />;
        })}
        <div style={{ position: "absolute", left: S5_LEVER.x, top: S5_LEVER.y, width: 13, height: 92, zIndex: 32, transformOrigin: "50% 100%", transform: `rotate(${leverAng.toFixed(2)}deg)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: 92, borderRadius: 7, background: grad("#D5AE44", "#6E5210") }} />
          <div style={{ position: "absolute", left: 4, top: 4 + idle(lf, 3, 44), width: 3, height: 70, background: "rgba(255,248,214,0.4)" }} />
          {/* the knob LAGS the shaft by two frames, so it whips at the ends */}
          <div style={{ position: "absolute", left: -8, top: -18, width: 29, height: 29, borderRadius: "50%", background: grad("#B8543E", S5_KNOB), border: "3px solid #5E2A20", transformOrigin: "50% 100%", transform: `rotate(${((leverAng - (-16 + 54 * lag(lf, 2, (g) => s5Pull(g, S5_PULL_T[0]) + s5Pull(g, S5_PULL_T[1]) + s5Pull(g, S5_PULL_T[2]))) - idle(lf, 1.6, 56)) * 0.9).toFixed(2)}deg)` }}>
            <div style={{ position: "absolute", left: 7, top: 6, width: 10, height: 7, borderRadius: "50%", background: "rgba(255,222,208,0.42)" }} />
          </div>
        </div>

        {/* the ratchet teeth on the dispenser. They breathe permanently and tick
            hard under load, each tooth on its own stagger. */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={"rt" + i} style={{
            position: "absolute", left: 2216 + i * 8,
            top: 480 + idle(lf, 0.7, 52 + i * 6, i * 1.3) + Math.abs(pulls) * Math.sin(lf * 1.9 + i * 1.4) * 3.2,
            width: 5, height: 11, borderRadius: 1, background: "#7A6018", zIndex: 28,
            opacity: 0.42 + 0.1 * flick(lf, 0.4, i) + 0.48 * Math.min(1, Math.abs(pulls)),
          }} />
        ))}

        {/* the scene's own pigeon chevron, crossing high above every figure */}
        <Pigeon lf={lf} y={246} at={16} dur={96} x0={1880} x1={2640} o={0.6} z={26} />
      </Cam>

      {/* ================= PANEL SPACE: keys, gate, footer ================= */}
      {/* the camera is moving at maximum speed on frame 0, so it carries streaks
          that die out as the push lands. Nothing teleports into the macro. */}
      <SpeedLines lf={lf} x={-40} y={120} w={1100} h={680} dir={-6} n={14} on={lerpv(over(lf, 0, 15, Easing.out(Easing.quad)), 0.5, 0)} hue="rgba(214,226,244,0.4)" z={44} sd={9} />

      {/* the cool blue green key, tight. Screen blended, never a coloured halo. */}
      <GelWash x={300} y={430} w={1040} h={860} color={S5_KEY} o={0.2 * (1 - 0.12 * rackKey)} z={46} blur={78} />
      <GelWash x={880} y={690} w={620} h={520} color="#2E4A58" o={0.24} z={46} blur={70} />
      {/* the one warm pool, and it is on the card rack */}
      <GelWash x={370} y={330} w={430} h={360} color={S5_WARM} o={0.17 + 0.05 * warmth + 0.05 * rackKey} z={47} blur={54} />

      {/* THE GATE, staged as depth of field. The result is razor sharp, the
          prompt is blurred. No readable text ever resolves on this card. */}
      <div style={{ position: "absolute", left: 306 + drift(lf, 5, 96), top: clipY, width: 372, height: 196, zIndex: 50, filter: "blur(8px)", transform: `rotate(${clipRot.toFixed(2)}deg) scale(${breathe(lf, 0.01, 64)})`, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: -14, top: -12, width: 400, height: 30, borderRadius: 5, background: "#4E4438" }} />
        <div style={{ position: "absolute", left: 150, top: -26, width: 74, height: 26, borderRadius: 4, background: "#6E6252" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: "linear-gradient(180deg,#EFE9DC,#CFC7B6)", boxShadow: "0 14px 30px rgba(8,10,18,0.5)" }} />
        <div style={{ position: "absolute", left: 22, top: 26, width: 92, height: 13, borderRadius: 3, background: "#8A7F6C", opacity: 0.8 }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", left: 22 + idle(lf, 1.6, 70 + i * 7, i), top: 58 + i * 22, width: 300 - seed(i * 5.3) * 150, height: 9, borderRadius: 3, background: "rgba(96,90,78,0.62)" }} />
        ))}
      </div>

      {/* FOOTER. Two words, no sentence, no echo of the voiceover. */}
      <div style={{ position: "absolute", left: 40, top: 748, padding: "6px 16px", borderRadius: 6, background: "rgba(10,14,22,0.7)", border: `2px solid ${S5_WARM}`, zIndex: 62, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: S5_WARM, transformOrigin: "0% 50%", transform: `scale(${breathe(lf, 0.008, 104)})`, opacity: 0.9 + 0.1 * flick(lf, 0.2, 4) }}>
        STEP 2
      </div>

      <Vig o={0.4} />
    </>
  );
};

// ==== part: 16_S6.tsx ====

// ===========================================================================
// SCENE 6 , IT RUNS WITHOUT HIM, THEN IT REPAINTS
// START 31.17s · 166 frames · verb RUN
// ---------------------------------------------------------------------------
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   · CAMERA locked dead still on Sparks and Son, booth and door in a clean two
//     shot. Not one pixel of camera movement until f88. That stillness is the
//     point: the system is running and nobody is watching it, not even the lens.
//   · SPARKS AND SON fully lit, awning board ALREADY carrying three green
//     tickets, arcade cabinet running in the window, warm pool on wet pavement.
//   · THE BOOTH bolted to the stoop, built, lantern burning and flickering,
//     brass ALWAYS ON plate fitted, rain already beading and running on glass.
//   · THE DOORMAN behind the glass, headset on, eyes visible, nodding, waiting.
//   · CUSTOMER ONE already walking in from the left at world 880 with a sparking
//     cable end and a brass coin, mid stride, three frames from the door line.
//   · THE CHIT TRAY in the near foreground, sharp and close, already holding
//     three stamped brass chits, its take a number wheel already reading 3.
//   · NO HERO ANYWHERE. NO VILLAIN ANYWHERE. NO SOUND OF HIS BELL. That absence
//     is the whole payoff of the scene and it is binding.
//   · Drizzle at two parallax speeds, four lamp cones flickering out of phase,
//     Drip Bros magenta cycling far right, road puddles rippling, a vehicle
//     crossing the wet asphalt, Painless Pete's booth lamps flickering green in
//     the blurred back tier, SceneTag RUNNING and the STEP 2 footer both solid.
// AT FRAME 165: the roller still dripping, three fresh awnings still drying with
// a wet sheen travelling across them, the chalk still smearing under the rain,
// the trolley wheels still turning, two tickets mid split flap, the camera still
// easing back. Cut from mid motion.
// ---------------------------------------------------------------------------
// CONCURRENT ANIMATED LAYERS AT FRAME 0 (nine, floor is four): far drizzle ·
// near drizzle · four out of phase lamp cones · Drip Bros magenta cycle · road
// puddle ripple plus the passing vehicle · booth glass rain beads and travelling
// sheen · lantern flicker and its warm pool ripple · the arcade cabinet in the
// window · the walking customer. Primary subject motion: the call running itself
// through the booth. Secondary: the chit tray filling in the foreground.
// ===========================================================================

// ---- world anchors, all derived from the locked geometry. Sparks is SHOPS[1].
const S6_SHOP = 680;                    // SHOPS[1].x
const S6_BOOTH_X = 1000;                // boothX(1) = 680 + OFF_BOOTH(320)
const S6_DOOR = 915;                    // doorX(1)
const S6_GRILLE = { x: 1050, y: 408 };  // booth local (24..76, 78..112)
const S6_WARM = "#F2CB84";
const S6_COOL = "#2E4258";
const S6_BANDS = [
  { x: 680, hue: "#CFE6F2" },           // Sparks, cyan white
  { x: 1240, hue: "#9FD8BE" },          // Painless Pete, mint
  { x: 1800, hue: "#E8934A" },          // Valvotine, orange
];
// he plants at 930, 1490 and 2010, one per band, and the frame each roll starts
const S6_SWIPE = [110, 126, 142];

// two camera poses. STOOP and TWO from CAMS, re-anchored onto Sparks because the
// presets are authored over Pipe Bros and this scene lives one shop east.
const S6_P0 = { x: 640, y: 200, z: 1.35 };   // locked two shot, booth and door
const S6_TWO_Y = -36;                        // CAMS.TWO.y
const S6_TWO_Z = 0.72;                       // the widest this reel goes outside S4 and S10

// the hero's path. He is ABSENT until f92, then jogs the row planting three
// times. Every leg is a forward move: no reversed ramps anywhere.
const s6HeroX = (f: number) => {
  let x = 700;
  x += over(f, 92, 16, Easing.out(Easing.cubic)) * 230;      // 930 at f108, Sparks
  x += over(f, 118, 6, Easing.inOut(Easing.cubic)) * 560;    // 1490 at f124, Pete
  x += over(f, 134, 6, Easing.inOut(Easing.cubic)) * 520;    // 2010 at f140, Valvotine
  x += over(f, 150, 16, Easing.out(Easing.cubic)) * 20;      // 2030, still creeping
  return x;
};

// PIP, always behind the hero and ahead of the villain. He puts the tin down
// twice, which is why his path has two flat shelves in it.
const s6PipX = (f: number) => {
  let x = 780;
  x += over(f, 100, 14, Easing.out(Easing.cubic)) * 120;     // 900 at f114, then stalls
  x += over(f, 124, 8, Easing.inOut(Easing.cubic)) * 430;    // 1330 at f132, then stalls
  x += over(f, 140, 8, Easing.inOut(Easing.cubic)) * 400;    // 1730 at f148
  x += over(f, 150, 16, Easing.out(Easing.cubic)) * 30;      // 1760
  return x;
};
const s6PipStall = (f: number) => (f > 114 && f < 124) || (f > 132 && f < 140) ? 1 : 0;

// NOBODY HOME. He only appears once the track starts, he loses ground the whole
// way, and he stops well short. Zero sound, zero tings, no shadow, opacity 0.62.
const s6VillX = (f: number) => {
  let x = 690;
  x += over(f, 110, 30, Easing.out(Easing.cubic)) * 450;     // 1140 at f140
  x += over(f, 140, 14, Easing.inOut(Easing.cubic)) * 270;   // 1410 at f154
  x += over(f, 154, 12, Easing.out(Easing.cubic)) * 40;      // 1450, out of steam
  return x;
};

// a 0 to 1 swipe of the roller across one FULL awning band. The last one runs
// slower so the roller is still physically moving when the scene cuts.
const S6_SWIPE_DUR = [8, 8, 20];
const s6Swipe = (f: number, t0: number, dur: number) => Math.max(0, Math.min(1, (f - t0) / dur));

// A SOLARI CASCADE, not a step. Fed straight into BookingBoard's fractional
// `filled`, so the slot physically flips n times, fast then slowing, and lands
// lit. A tile that crossfades from dark to green is the tell of a fake board.
const s6Cascade = (f: number, t0: number, dur: number, n = 3) => {
  const e = over(f, t0, dur, Easing.out(Easing.quad));
  if (e <= 0) return 0;
  if (e >= 1) return 1;
  const v = e * n;
  return v - Math.floor(v);
};

// A ROLLING DRUM DIGIT. Two glyphs on one strip, driven by a continuous eased
// value with a real overshoot, so the count is never a glyph swap on one frame.
const S6Roll: React.FC<{ v: number; w: number; h: number; size: number; color: string }> =
  ({ v, w, h, size, color }) => {
    const lo = Math.floor(v), fr = v - lo;
    const cell = (n: number, t: number) => (
      <div style={{ position: "absolute", left: 0, top: t, width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: size, color }}>{n}</div>
    );
    return (
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden" }}>
        {cell(lo, -fr * h)}
        {cell(lo + 1, h - fr * h)}
      </div>
    );
  };

// THE HERO, doorman greatcoat over the canonical Mascot, drawn after the body so
// overshoot is correct. New this scene: the clipboard of slot cards on his hip
// and the long handled paint roller, a deliberate rhyme with the villain's pole.
const S6Hero: React.FC<{ lf: number; x: number; size?: number; z?: number; jog?: number; roll?: number; tipX?: number; tipY?: number }> =
  ({ lf, x, size = 170, z = 32, jog = 0, roll = 0, tipX = 0, tipY = 0 }) => {
    const u = size / 200;
    const top = standTop(660, size) - jog * 5 * Math.abs(Math.sin(lf / 3.4));
    // the roller pole is solved from grip to tip, so it is never a glued sprite
    const gx = x + 22, gy = 545;
    const dx = tipX - gx, dy = tipY - gy;
    const len = Math.max(120, Math.sqrt(dx * dx + dy * dy));
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    return (
      <>
        {/* the hand trolley of identical flat packs, wheels turning, behind him */}
        <div style={{ position: "absolute", left: x - 152, top: 556, width: 104, height: 112, zIndex: z - 2 }}>
          <div style={{ position: "absolute", left: 4, top: -84, width: 9, height: 172, borderRadius: 4, background: "#454C58" }} />
          <div style={{ position: "absolute", left: 0, top: 78, width: 92, height: 10, borderRadius: 2, background: "#3A4150" }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 14, top: 20 + i * 20, width: 78, height: 18, borderRadius: 2, background: grad("#A8865A", "#6E5636"), border: "2px solid #58452A" }}>
              {/* the wordless four step assembly diagram, second and final firing */}
              {[0, 1, 2, 3].map((k) => (
                <div key={k} style={{ position: "absolute", left: 6 + k * 18, top: 4, width: 12, height: 9, borderRadius: 1, background: "rgba(40,30,16,0.5)" }}>
                  <div style={{ position: "absolute", left: 2, top: 2 + k, width: 8 - k, height: 2, background: "rgba(232,222,196,0.6)" }} />
                </div>
              ))}
            </div>
          ))}
          {/* three tiny colour chips clipped to the trolley rail */}
          {S6_BANDS.map((b, i) => <div key={"c" + i} style={{ position: "absolute", left: 20 + i * 22, top: 88, width: 18, height: 12, borderRadius: 2, background: b.hue, border: "1px solid #3A4150" }} />)}
          {/* POP CULTURE 3: the paint chart SWATCH FAN, riveted at one corner and
              splayed open on the trolley handle, swinging as the wheels turn.
              Five blades, and the three he is actually using are on top. */}
          <div style={{ position: "absolute", left: -6, top: -74, width: 20, height: 20, zIndex: 1, transformOrigin: "10px 10px", transform: `rotate(${Math.sin(lf / 11) * 5}deg)` }}>
            <div style={{ position: "absolute", left: 6, top: 6, width: 8, height: 8, borderRadius: "50%", background: "#D8B24E", border: "2px solid #5B4710", zIndex: 9 }} />
            {["#CFE6F2", "#9FD8BE", "#E8934A", "#8A9098", "#6E7480"].map((c, k) => (
              <div key={"sw" + k} style={{
                position: "absolute", left: 8, top: 8, width: 46, height: 11, borderRadius: "1px 3px 3px 1px",
                background: c, border: "1px solid #3A4150", transformOrigin: "2px 5px",
                transform: `rotate(${-56 + k * 24 + Math.sin(lf / 13 + k * 0.7) * 2.2}deg)`,
              }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 2, top: 84, width: 30, height: 30, borderRadius: "50%", background: "#12161E", border: "4px solid #333A46", transform: `rotate(${x * 2.2}deg)` }}>
            <div style={{ position: "absolute", left: 10, top: 2, width: 3, height: 20, background: "#4C5462" }} />
          </div>
          <div style={{ position: "absolute", left: 62, top: 84, width: 30, height: 30, borderRadius: "50%", background: "#12161E", border: "4px solid #333A46", transform: `rotate(${x * 2.2}deg)` }}>
            <div style={{ position: "absolute", left: 10, top: 2, width: 3, height: 20, background: "#4C5462" }} />
          </div>
        </div>

        <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z }}>
          <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82} o={0.44} />
          <Mascot lf={lf} size={size} tint={HERO} nodAmp={jog ? 5 : 2.6} nodSpeed={jog ? 6 : 10} stern={0.2} gaze={3} />
          {/* greatcoat, gold piping, brass buttons, epaulettes */}
          <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 78 * u, borderRadius: 3, background: "#8E3F2A" }} />
          <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 5 * u, height: 78 * u, background: GOLD, opacity: 0.82 }} />
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 104 * u, top: (106 + i * 20) * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: GOLD }} />)}
          <div style={{ position: "absolute", left: 26 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
          <div style={{ position: "absolute", left: 134 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
          {/* the tool belt of brass door fittings, gained at S3 */}
          <div style={{ position: "absolute", left: 32 * u, top: 152 * u, width: 136 * u, height: 13 * u, background: "#4A3A18" }} />
          {[0, 1, 2, 3].map((i) => <div key={"f" + i} style={{ position: "absolute", left: (42 + i * 30) * u, top: 154 * u, width: 15 * u, height: 20 * u, borderRadius: 2, background: grad("#D5AE44", "#7A5E18") }} />)}
          {/* the till on a strap, gained at S3 f186 */}
          <div style={{ position: "absolute", left: 152 * u, top: 96 * u, width: 8 * u, height: 46 * u, background: "#33383F", transform: "rotate(-11deg)" }} />
          <div style={{ position: "absolute", left: 2 * u, top: 132 * u, width: 44 * u, height: 32 * u, borderRadius: 3, background: grad("#C8A02E", "#6E5310"), border: `${2 * u}px solid #4E3C0C` }}>
            <div style={{ position: "absolute", left: 8 * u, top: 6 * u, width: 26 * u, height: 5 * u, borderRadius: 2, background: "#3A2C08" }} />
          </div>
          {/* NEW THIS SCENE: the clipboard of slot cards, hung on the belt */}
          <div style={{ position: "absolute", left: 138 * u, top: 128 * u, width: 40 * u, height: 50 * u, borderRadius: 2, background: "#5E5348", border: `${2 * u}px solid #3E362C`, transform: `rotate(${7 + Math.sin(lf / 9) * 3.4}deg)`, transformOrigin: "50% 0%" }}>
            <div style={{ position: "absolute", left: 3 * u, top: 5 * u, width: 34 * u, height: 40 * u, background: "#E4DCC8" }} />
            {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 6 * u, top: (10 + i * 11) * u, width: (26 - i * 5) * u, height: 3 * u, background: "rgba(96,90,78,0.6)" }} />)}
          </div>
          {/* the bellhop pillbox cap with a small gold C */}
          <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 27 * u, borderRadius: 3, background: "#8E3F2A" }} />
          <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
          <div style={{ position: "absolute", left: 56 * u, top: 37 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.86 }} />
          <div style={{ position: "absolute", left: 92 * u, top: 17 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
        </div>

        {/* THE LONG HANDLED ROLLER. Its whole arc lives ABOVE the head line of
            every figure on the street, so it never crosses one. */}
        <div style={{ position: "absolute", left: gx, top: gy, width: len, height: 11, zIndex: z + 1, transformOrigin: "4px 50%", transform: `rotate(${ang}deg)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: len, height: 11, borderRadius: 6, background: grad("#C0A24A", "#5E4C14") }} />
          <div style={{ position: "absolute", left: 6, top: 3, width: len - 20, height: 3, background: "rgba(255,248,214,0.3)" }} />
          <div style={{ position: "absolute", left: len - 14, top: -13, width: 16, height: 38, borderRadius: 5, background: roll > 0.02 ? grad("#F2E2C0", "#B8A480") : "#8A8272", border: "2px solid #4E4838" }} />
          <div style={{ position: "absolute", left: len - 20, top: -6, width: 8, height: 24, borderRadius: 3, background: "#6E6252" }} />
        </div>
      </>
    );
  };

const S6: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= CAMERA =================
  // HALF ONE: absolutely locked, zero movement, f0 to f88.
  // HALF TWO: whip out to the TWO preset, then a hard lateral track right that
  // follows the hero, then an eased settle back that finds the villain.
  // ROW is never used: ruling 8 puts the floor for this scene at TWO.
  const wide = over(lf, 88, 16, Easing.inOut(Easing.cubic));
  const breath = over(lf, 96, 22, Easing.out(Easing.cubic));
  const heroX = s6HeroX(lf);
  // the track begins the frame the widen ends, not when the hero happens to
  // outrun the clamp. Without this lead the camera sits dead still f104 to f122
  // in the middle of the beat the card calls a fast lateral track.
  const lead = over(lf, 96, 30, Easing.inOut(Easing.cubic)) * 300;
  // ...but the lead is never allowed to outrun the hero and crush him against the
  // left edge while he is planted. camX - 260 world is screen x 187 at z 0.72.
  const follow = Math.min(
    Math.max(640 + lead, Math.min(1380, heroX - 700)),
    Math.max(640, heroX - 260),
  );
  const back = over(lf, 146, 20, Easing.inOut(Easing.cubic));
  // THE CAMERA IS A CHARACTER even while it is "locked": sub pixel handheld runs
  // the whole scene, and every capture thud, the answer and each roller plant
  // kick it. The lens is never a tripod, it is a person standing in the rain.
  const s6Cam = shakeCam(lf, [
    { at: 26, amp: 2.6, dur: 12 },
    { at: 38, amp: 4.4, dur: 15 },
    { at: 50, amp: 3.6, dur: 14 },
    { at: 88, amp: 2.8, dur: 10 },
    { at: S6_SWIPE[0], amp: 2.2, dur: 11 },
    { at: S6_SWIPE[1], amp: 2.2, dur: 11 },
    { at: S6_SWIPE[2], amp: 2.6, dur: 13 },
  ], 2.2);
  const camX = follow + back * (980 - 1380) + Math.sin(lf / 31) * 4 * breath + s6Cam.x + drift(lf, 1.3, 190);
  const camY = S6_P0.y + wide * (S6_TWO_Y - S6_P0.y) + Math.sin(lf / 26) * 2.6 * breath + s6Cam.y;
  const camZ = (S6_P0.z + wide * (S6_TWO_Z - S6_P0.z)) * (1 + 0.006 * Math.sin(lf / 24) * breath) * s6Cam.z;
  const camPose = { x: camX, y: camY, z: camZ };

  // the brick between the shops smears when he is between two of them
  const speed = heroX - s6HeroX(lf - 1);
  const smear = Math.max(0, Math.min(1, speed / 70));
  const backBlur = smear * 5.2;

  // ================= HALF ONE: THE CALL RUNS ITSELF =================
  // three rings. Ring three is CUT SHORT by the grille lighting, reusing the
  // motif established at S3 f94. There is no villain ting anywhere in S6.
  const rings = [6, 16, 26];
  // the grille never sits at a flat 1: once it is lit it breathes with the voice
  const grille = over(lf, 26, 5, Easing.out(Easing.cubic)) * (0.84 + 0.16 * Math.abs(Math.sin(lf / 6.5)));
  // he sits up on ring one and again on ring two, so the booth is visibly
  // REACTING nine frames before it answers. Anticipation, twice, then the lean.
  const lean = 0.1
    + 0.30 * antic(lf, 11, 9)
    + 0.20 * antic(lf, 20, 9)
    + 0.72 * over(lf, 27, 9, Easing.out(Easing.back(1.5)))
    + settle(lf, 36, 0.10, 0.14, 0.10)
    - 0.34 * over(lf, 56, 14)
    + 0.05 * idle(lf, 1, 41);
  const talk = Math.min(1, over(lf, 28, 6) * (1 - over(lf, 74, 10)) + over(lf, 62, 6) * (1 - over(lf, 86, 8)));

  // two captures, ten frames apart, each stamped brass landing on the pile
  const chit1 = over(lf, 30, 8, Easing.in(Easing.cubic));
  const chit2 = over(lf, 42, 8, Easing.in(Easing.cubic));
  const trayN = 3 + (lf >= 38 ? 1 : 0) + (lf >= 50 ? 1 : 0);
  // the wheel ROLLS. A continuous eased drum value with an overshoot on landing,
  // never an integer swapped on one frame.
  const trayV = 3 + overshoot(lf, 38, 13, 0.11) + overshoot(lf, 50, 13, 0.11);

  // the board does not stop at one, and no tile ever just lights: it cascades
  const sparksBoard = 3 + s6Cascade(lf, 63, 11, 3) + s6Cascade(lf, 74, 11, 3) + s6Cascade(lf, 114, 12, 4);
  const peteBoard = 2 + s6Cascade(lf, 150, 22, 4);   // mid split flap at f165
  const valvBoard = 1 + s6Cascade(lf, 154, 22, 4);   // mid split flap at f165
  const booked = 3 + (lf >= 70 ? 1 : 0) + (lf >= 82 ? 1 : 0) + (lf >= 120 ? 1 : 0) + (lf >= 158 ? 1 : 0) + (lf >= 161 ? 1 : 0);
  const doorOpen = over(lf, 58, 8, Easing.out(Easing.back(1.6))) - over(lf, 76, 10) + over(lf, 78, 8, Easing.out(Easing.back(1.6))) - over(lf, 90, 10)
    + settle(lf, 76, 0.06, 0.17, 0.14) + settle(lf, 90, 0.05, 0.17, 0.14);

  // the lit strip on the pavement grows a notch per booking. It reads the SMOOTH
  // booking value, never the cascading one, so the light does not strobe.
  const bookSmooth = 3 + overshoot(lf, 66, 15, 0.09) + overshoot(lf, 78, 15, 0.09) + overshoot(lf, 116, 15, 0.09);
  const strip = 300 + (bookSmooth - 3) * 58 + idle(lf, 5, 78);

  // ================= HALF TWO: THREE REPAINTS, ONE SHAPE =================
  const swipes = S6_SWIPE.map((t, i) => s6Swipe(lf, t, S6_SWIPE_DUR[i]));
  const pipX = s6PipX(lf), stall = s6PipStall(lf);
  // he shuffles in past the left edge rather than materialising on one frame
  const villX = s6VillX(lf) - (1 - over(lf, 108, 15, Easing.out(Easing.cubic))) * 150;
  // the standing foreground sils hand off to the travelling one across f94..f108,
  // clear of the frame the hero first reaches them (f117).
  const s6Fore = 1 - over(lf, 94, 14, Easing.inOut(Easing.cubic));
  const satchel = over(lf, 154, 7, Easing.out(Easing.back(2.4)));
  const chalking = over(lf, 157, 8);

  // the roller tip, solved per plant so the pole is never a glued sprite. At
  // rest it rides just ahead of him; on a plant it climbs to the awning band.
  // The tip is solved off the BAND it is painting, not off the hero's stop, so
  // the roller head and the wet edge of the paint are the same point. The band
  // spans b.x+10 to b.x+510, so the sweep must cover all 500 of it.
  let tipX = heroX + 60, tipY = 440 + idle(lf, 7, 44);
  S6_BANDS.forEach((b, i) => {
    const t0 = S6_SWIPE[i];
    const win = i === 2 ? 9999 : S6_SWIPE_DUR[i] + 10;
    if (lf >= t0 - 8 && lf <= t0 + win) {
      const p = swipes[i];
      // WIND UP. Seven frames before every plant the roller loads backwards and
      // downwards, so no sweep in this scene ever starts from rest.
      const wind = 1 - Math.max(0, Math.min(1, (lf - (t0 - 8)) / 8));
      tipX = b.x + 10 + p * 500 - wind * 40;
      tipY = 322 + Math.sin(p * Math.PI) * 11 + wind * 30
        + settle(lf, t0 + S6_SWIPE_DUR[i], 6, 0.15, 0.11)   // the arm keeps going
        + idle(lf, 1.6, 37, i);
    }
  });
  const rolling = swipes.some((p, i) => p > 0 && p < 1 && lf >= S6_SWIPE[i]);
  // once he has loaded the roller it stays wet, so the head is never a dry grey
  // stub at the cut while three fresh awnings are still drying behind him.
  const loaded = lf >= S6_SWIPE[0] ? 1 : 0;

  return (
    <>
      {/* ================= BACK LAYER: the whole street, and the brick between
          shops smears horizontally on every fast leg of the track ============ */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: backBlur > 0.05 ? `blur(${backBlur}px)` : "none" }}>
        <Cam {...camPose}>
          <Street
            lf={lf}
            booth={[1, 0, 1, 1]}
            board={[4, sparksBoard, peteBoard, valvBoard]}
            lit={[0.9, 1, 0.86, 0.86]}
            sign={0}
            bracket={1}
            doorOpen={[0, doorOpen, 0, 0]}
            tubes={4}
            tills={2}
            brackets={4}
            rain={1}
            lamps={1}
            rival={0.7}
            fill="#7E9AC0"
            pigeonAt={14}
            pigeonY={236}
            far={1}
            fore={0}
          />
        </Cam>
      </div>

      {/* ================= FRONT LAYER: the subject, sharp ================= */}
      <Cam {...camPose}>
        {/* the warm pool the working booth throws, growing a notch per booking */}
        <Reflect lf={lf} x={S6_BOOTH_X + 50} y={602} w={strip} hue={S6_WARM} o={0.32} z={12} />
        <Reflect lf={lf} x={S6_DOOR} y={602} w={220 + doorOpen * 160} hue={S6_WARM} o={0.24} z={12} />
        <Puddle lf={lf} x={S6_SHOP + 20} y={602} w={480} h={58} hue={S6_WARM} o={0.2} blur={6} z={12} />

        {/* the three repainted awnings. One full width panel per shop, clipped to
            the band the roller has actually covered, with the original
            perspective so the handoff is exact. The booth is never redesigned. */}
        {S6_BANDS.map((b, i) => {
          const p = swipes[i];
          if (p <= 0) return null;
          const sheen = ((lf * 2.4) % 200) / 200;
          // the fresh awning is HUNG canvas: it takes the weight of the sweep and
          // keeps swinging for a dozen frames after the roller has left it.
          const hang = 22 + settle(lf, S6_SWIPE[i] + S6_SWIPE_DUR[i], 3.2, 0.15, 0.11) + idle(lf, 0.45, 92, i * 1.3);
          return (
            <React.Fragment key={"aw" + i}>
              <div style={{
                position: "absolute", left: b.x + 10, top: 272, width: 500, height: 44, zIndex: 14,
                background: `repeating-linear-gradient(90deg, ${b.hue} 0 26px, rgba(0,0,0,0.18) 26px 52px)`,
                transform: `perspective(320px) rotateX(${hang}deg)`, transformOrigin: "50% 0%",
                clipPath: `inset(0 ${100 - 100 * p}% 0 0)`, boxShadow: "0 8px 16px rgba(6,8,14,0.5)",
              }} />
              {/* paint thrown off the head on the plant and again mid sweep */}
              <Sparkles lf={lf} at={S6_SWIPE[i]} x={b.x + 26} y={330} n={9} life={24} spread={86} rise={44} hue={b.hue} sd={i * 5 + 2} z={16} o={0.7} />
              <Sparkles lf={lf} at={S6_SWIPE[i] + Math.round(S6_SWIPE_DUR[i] * 0.55)} x={b.x + 10 + p * 500} y={334} n={7} life={22} spread={70} rise={38} hue={b.hue} sd={i * 3 + 9} z={16} o={0.6} />
              {/* the wet sheen still travelling across the fresh paint */}
              <div style={{
                position: "absolute", left: b.x + 10, top: 272, width: 500, height: 44, zIndex: 15,
                background: `linear-gradient(96deg, transparent ${sheen * 100 - 18}%, rgba(255,250,236,0.4) ${sheen * 100}%, transparent ${sheen * 100 + 18}%)`,
                transform: "perspective(320px) rotateX(22deg)", transformOrigin: "50% 0%",
                clipPath: `inset(0 ${100 - 100 * p}% 0 0)`, mixBlendMode: "screen", pointerEvents: "none",
              }} />
              {/* wet paint running one drip off the fresh edge, which is the
                  roller head itself, so the drip tracks the sweep */}
              {p > 0.16 && <div style={{ position: "absolute", left: b.x + 6 + p * 496, top: 314, width: 5, height: 10 + ((lf * 1.6) % 26), borderRadius: 3, background: b.hue, opacity: 0.5, zIndex: 15 }} />}
              {/* and one slower drip left behind on the finished stretch */}
              {p > 0.5 && <div style={{ position: "absolute", left: b.x + 150, top: 314, width: 4, height: 8 + ((lf * 1.1 + i * 9) % 20), borderRadius: 3, background: b.hue, opacity: 0.42, zIndex: 15 }} />}
            </React.Fragment>
          );
        })}

        {/* SAME RIG, LITERALLY. The instant a sweep is past halfway, an identical
            brass outline of the Sparks booth stamps down over that shop's booth,
            overshoots, settles and then stays as a faint breathing edge. Three
            shops, one outline, same width, same height, same bolt line. This is
            the frame that says reused rather than newly invented. */}
        {S6_BANDS.map((b, i) => {
          const at = S6_SWIPE[i] + Math.round(S6_SWIPE_DUR[i] * 0.55);
          const k = overshoot(lf, at, 13, 0.15);
          if (k <= 0.002) return null;
          const bx = b.x + 320;
          return (
            <div key={"rig" + i} style={{
              position: "absolute", left: bx - 9, top: 320, width: 118, height: 249, zIndex: 19,
              border: `3px solid ${BRASS}`, borderRadius: 5, pointerEvents: "none",
              opacity: 0.14 + 0.4 * Math.max(0, 1 - k) + 0.12 * Math.abs(Math.sin(lf / 17 + i * 1.7)),
              transform: `scale(${1 + Math.max(0, 1 - k) * 0.17}) translateY(${(1 - Math.min(1, k)) * -14}px)`,
              transformOrigin: "50% 100%",
            }} />
          );
        })}

        {/* the same three cards in every rack, flipped to a different glyph, with
            the slots themselves identical. That is the whole different words
            idea in one gesture, and there is not one word of text on it. */}
        {S6_BANDS.map((b, i) => {
          const p = swipes[i];
          if (p <= 0.3) return null;
          const flip = over(lf, S6_SWIPE[i] + 6, 8, Easing.inOut(Easing.cubic));
          const bx = b.x + 320;
          return (
            <div key={"gl" + i} style={{ position: "absolute", left: bx + 18, top: 452, width: 64, height: 20, zIndex: 30, opacity: Math.min(1, (p - 0.3) * 3) }}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ position: "absolute", left: k * 22, top: 0, width: 18, height: 20, borderRadius: 2, background: grad("#E2C468", "#A8842A"), border: "1px solid #6A5314", transform: `rotateX(${flip < 1 ? Math.sin(flip * Math.PI) * 84 : 0}deg)`, transformOrigin: "50% 0%" }}>
                  {i === 0 && <div style={{ position: "absolute", left: 6, top: 3, width: 5, height: 14, background: "#4E3C0C", transform: "skewX(-20deg)" }} />}
                  {i === 1 && <div style={{ position: "absolute", left: 4, top: 3, width: 10, height: 13, borderRadius: "5px 5px 2px 2px", background: "#4E3C0C" }} />}
                  {i === 2 && <><div style={{ position: "absolute", left: 7, top: 5, width: 4, height: 12, background: "#4E3C0C" }} /><div style={{ position: "absolute", left: 4, top: 3, width: 10, height: 5, borderRadius: 2, background: "#4E3C0C" }} /></>}
                </div>
              ))}
            </div>
          );
        })}

        {/* ---- SPARKS' BOOTH, rendered sharp here rather than through Street so
            the grille can light on ring three and the doorman can lean out ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 20 }}>
          <Booth
            lf={lf} x={S6_BOOTH_X} y={560} build={1} lit={1} lantern={1}
            grille={grille} hue={S6_WARM} plate={1} bolthole={0} plaque={0} z={20}
            awning={swipes[0] > 0.9 ? S6_BANDS[0].hue : undefined}
          >
            {/* he never leaves the booth, so he is never unmounted either: the
                old lf<90 gate popped him out of the glass mid widen */}
            <Doorman lf={lf} x={38} y={150} size={104} lean={lean} talk={talk} z={19} />
          </Booth>
        </div>

        {/* THE THREE RINGS. Brass arcs off the grille. Ring three is cut short
            mid air the instant the grille lights, which is the reel's motif. */}
        {rings.map((t0, i) => {
          const life = i === 2 ? 5 : 13;
          const p = (lf - t0) / life;
          if (p < 0 || p > 1) return null;
          return (
            <React.Fragment key={"rg" + i}>
              {[0, 1, 2].map((k) => {
                // three staggered arcs on an out quint, so the ring LEAVES fast
                // and dies slowly instead of expanding at one flat rate
                const q = Math.max(0, Math.min(1, over(lf, t0 + k * 2.4, life, Easing.out(Easing.poly(5)))));
                if (q <= 0 || q >= 1) return null;
                const r = 24 + q * vary(k, 152, 0.16);
                return <div key={k} style={{ position: "absolute", left: S6_GRILLE.x - r, top: S6_GRILLE.y - r * 0.6, width: r * 2, height: r * 1.2, borderRadius: "50%", border: `${Math.max(1.5, 6 * (1 - q))}px solid ${BRASS}`, opacity: (1 - q) * 0.78, zIndex: 26, pointerEvents: "none" }} />;
              })}
            </React.Fragment>
          );
        })}

        {/* THE ANSWER. Ring three is cut short by the grille lighting, and the
            grille lighting is the biggest single event in half one, so it gets
            a real reaction: a brass ring off the stoop and a spit of sparks. */}
        <GroundRing lf={lf} at={26} x={S6_BOOTH_X + 50} y={566} r={230} dur={20} hue="rgba(242,203,132,0.5)" z={18} />
        <Sparkles lf={lf} at={26} x={S6_GRILLE.x} y={S6_GRILLE.y + 6} n={10} life={26} spread={100} rise={58} hue="#E7CFA0" sd={31} z={27} o={0.8} />

        {/* THE ABSENCE, MADE INTO AN OBJECT. His apron is still on its peg and
            the stool under it is empty, swaying in the drizzle, while the booth
            beside it works. Dim, small and low contrast on purpose: it must be
            read after the booth, never instead of it. */}
        <div style={{ position: "absolute", left: 1108, top: 388, width: 54, height: 172, zIndex: 16, opacity: 0.6 * (1 - over(lf, 96, 16)) }}>
          <div style={{ position: "absolute", left: 21, top: 0, width: 12, height: 8, borderRadius: 2, background: "#6A5314" }} />
          <div style={{ position: "absolute", left: 8, top: 6, width: 38, height: 76, borderRadius: "4px 4px 9px 9px", background: "#5E5A52", border: "2px solid #43403A", transformOrigin: "50% 0%", transform: `rotate(${drift(lf, 2.8, 118)}deg)` }}>
            <div style={{ position: "absolute", left: 5, top: 48, width: 28, height: 3, background: "rgba(24,26,30,0.5)" }} />
          </div>
          <div style={{ position: "absolute", left: 2, top: 116, width: 50, height: 56, transformOrigin: "50% 100%", transform: `rotate(${idle(lf, 1.1, 143, 1.2)}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 50, height: 9, borderRadius: 2, background: grad("#7A6242", "#4C3C26") }} />
            <div style={{ position: "absolute", left: 5, top: 9, width: 7, height: 47, background: "#4C3C26" }} />
            <div style={{ position: "absolute", left: 38, top: 9, width: 7, height: 47, background: "#4C3C26" }} />
            <div style={{ position: "absolute", left: 6, top: 32, width: 38, height: 5, background: "#43351F" }} />
          </div>
        </div>

        {/* CUSTOMER ONE. Arrives, is answered, and walks IN through the door. */}
        {lf < 76 && (() => {
          // he does not stand still while he waits: two queue shuffles, each with
          // its own wind up, and a weight shift underneath both of them.
          const cx = 856 + over(lf, 0, 8, Easing.out(Easing.cubic)) * 26
            + antic(lf, 12, 10) * 28
            + antic(lf, 21, 10) * 22
            + idle(lf, 2.2, 51)
            - over(lf, 58, 12, Easing.inOut(Easing.cubic)) * 22;
          const gone = over(lf, 64, 10);
          return <>
            <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - gone, transform: `scale(${1 - gone * 0.14}) rotate(${settle(lf, 13, 1.6, 0.15, 0.13) + settle(lf, 22, 1.3, 0.15, 0.13) + idle(lf, 0.5, 63)}deg)`, transformOrigin: `${cx}px 660px` }}>
              <Customer lf={lf} x={cx} y={660} scarf={1} prop="cable" coin={1 - over(lf, 34, 8)} walk={lf > 58 ? -1 : 1} size={104} z={24} />
            </div>
            {/* the broken cable end spitting, staggered, so the two quietest
                stretches of half one both carry a live event in the frame */}
            {[12, 21, 33, 46].map((t) => (
              <Sparkles key={"cs" + t} lf={lf} at={t} x={cx + 58} y={600} n={9} life={22} spread={72} rise={52} hue="#DFF1FF" sd={t * 1.7} z={25} o={0.85 * (1 - gone)} />
            ))}
          </>;
        })()}

        {/* CUSTOMER TWO is already walking in before the first one is finished. */}
        {lf > 48 && lf < 96 && (() => {
          // he does not coast to a halt: he closes the last stretch and steps up
          // onto the stoop across the frames the board is cascading behind him.
          const cx = 690 + over(lf, 52, 20, Easing.inOut(Easing.cubic)) * 132
            + over(lf, 70, 12, Easing.out(Easing.cubic)) * 44
            + idle(lf, 1.8, 44) - over(lf, 80, 10) * 6;
          const gone = over(lf, 82, 10);
          return <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - gone, transform: `scale(${1 - gone * 0.14})`, transformOrigin: `${cx}px 658px` }}>
            <Customer lf={lf} x={cx} y={658} scarf={2} prop="rad" coin={1} walk={1} size={102} z={23} />
          </div>;
        })()}

        {/* CUSTOMER THREE enters frame left at f84 and queues. He stays BEHIND
            the hero for the whole of half two, so nothing ever crosses him. */}
        {lf > 74 && <Customer lf={lf} x={648 + over(lf, 76, 74, Easing.out(Easing.cubic)) * 108 + idle(lf, 2, 47)} y={656} scarf={0} prop="pipe" coin={1} walk={1} size={100} z={22} />}

        {/* the small green booth lamps flickering on the shops down the row, out
            of phase. Green is on ticket lamps only, which is where it belongs. */}
        {[1300, 1860, 2420].map((gx, i) => (
          <div key={"gf" + i} style={{ position: "absolute", left: gx, top: 318, width: 13, height: 13, borderRadius: "50%", background: GREEN, opacity: 0.32 + 0.4 * Math.abs(Math.sin(lf / (17 + i * 5) + i * 2.2)), zIndex: 18, filter: "blur(0.6px)" }} />
        ))}

        {/* ---- THE HERO, absent until f92, then the row in one jog ---- */}
        {/* he does not blink into existence at f92: he walks in past the left
            edge over twelve frames while the camera is still widening. */}
        {lf >= 92 && <S6Hero lf={lf} x={heroX - (1 - over(lf, 92, 12, Easing.out(Easing.cubic))) * 120} size={170} z={32} jog={smear > 0.05 || (lf < 108) ? 1 : 0} roll={rolling ? 1 : loaded} tipX={tipX} tipY={tipY} />}

        {/* PIP, trotting behind with the paint tin, putting it down twice */}
        {lf >= 96 && <>
          <Pip lf={lf} x={pipX - (1 - over(lf, 96, 14, Easing.out(Easing.cubic))) * 130} y={656} size={72} look={0.4} tin={stall ? 0 : 1} walk={stall ? 0 : 1} z={30} />
          {stall > 0 && <div style={{ position: "absolute", left: pipX + 22, top: 636, width: 32, height: 26, borderRadius: 3, background: "#B8BEC8", border: "2px solid #6E7480", zIndex: 29 }}>
            <div style={{ position: "absolute", left: 3, top: -5, width: 26, height: 4, borderRadius: 2, background: "#8A9098" }} />
          </div>}
        </>}

        {/* ---- NOBODY HOME. He appears only in half two, loses ground the whole
            way, turns his satchel inside out and chalks a fake CLOSED that the
            rain immediately takes off him. Opacity 0.62, no shadow, no ting. */}
        {lf >= 108 && <>
          <Nobody
            lf={lf} x={villX} y={660} size={158} pole={0.2} solid={0}
            tally={0} dust={0.62} tilt={0.3 + 0.3 * Math.sin(lf / 21)} walk={lf < 154 ? 1 : 0}
            chalking={chalking} z={26}
          />
          {/* the satchel, emptied of signs and turned inside out */}
          <div style={{
            position: "absolute", left: villX - 74, top: 566, width: 54, height: 44, zIndex: 27, opacity: 0.62,
            transformOrigin: "50% 0%",
            transform: `rotate(${-8 + satchel * 186}deg) scaleY(${1 - satchel * 0.34})`,
          }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: satchel > 0.5 ? "#4E525A" : "#6C7079", border: "2px solid #494D55" }} />
            <div style={{ position: "absolute", left: 8, top: 6, width: 38, height: 6, background: "#5D6169" }} />
            <div style={{ position: "absolute", left: 22, top: -22, width: 8, height: 24, background: "#494D55", transform: "rotate(6deg)" }} />
          </div>
          {/* the puff of chalk that falls out of it, and it is the last dust he
              ever throws before S7 kills the dust entirely */}
          {satchel > 0.1 && Array.from({ length: 9 }, (_, i) => {
            const s = seed(i * 5.7 + 3);
            const p = Math.max(0, Math.min(1, (lf - 154 - i) / 22));
            return <div key={"pf" + i} style={{ position: "absolute", left: villX - 70 + s * 46, top: 606 + p * 44, width: 5, height: 5, borderRadius: "50%", background: CHALK, opacity: (1 - p) * 0.45, zIndex: 27 }} />;
          })}
          {/* the rain taking the chalk straight back off the wet pavement */}
          {chalking > 0.2 && Array.from({ length: 7 }, (_, i) => {
            const s = seed(i * 3.3 + 11);
            return <div key={"sm" + i} style={{ position: "absolute", left: villX + 40 + i * 20, top: 622 + s * 12, width: 26 + s * 22, height: 4, borderRadius: 2, background: "rgba(226,222,210,0.28)", filter: "blur(2px)", opacity: chalking * (0.4 + 0.6 * Math.abs(Math.sin(lf / 9 + i))), zIndex: 27, transform: `skewX(-24deg) scaleX(${1 + 0.4 * Math.sin(lf / 13 + i)})` }} />;
          })}
        </>}

        {/* ---- three tier lighting: the foreground silhouettes, hand placed so
            not one of them ever sits in front of a figure ---- */}
        {/* the kerb lip runs the whole scene: it is the edge the camera stands on */}
        <ForeSil lf={lf} x={-420} groundY={W_KERB + 16} w={3840} h={30} kind="kerb" o={0.9} blur={2.5} z={44} />
        {/* The two standing sils belong to HALF ONE only. The old bollard at 620
            sat left of camX 640 and was never once on screen, and the hydrant at
            1188 was crossed by the hero at f118, Pip at f128 and the villain at
            f142. They now hand off to the travelling trolley sil before the track
            reaches them, so nothing ever passes behind a foreground object. */}
        {s6Fore > 0.02 && <>
          <ForeSil lf={lf} x={1108} groundY={W_KERB} w={52} h={126} kind="bollard" o={s6Fore} z={45} />
          <ForeSil lf={lf} x={1268} groundY={W_KERB} w={62} h={120} kind="hydrant" o={s6Fore} z={45} />
        </>}
        {lf > 96 && <ForeSil lf={lf} x={heroX - 330} groundY={W_KERB + 10} w={120} h={96} kind="trolley" o={0.85} blur={2.5} z={46} />}

        {/* the near drizzle, in front of every sprite */}
        <Drizzle lf={lf} n={26} o={0.9} near={1} z={48} />
      </Cam>

      {/* ================= PANEL SPACE ================= */}
      {/* THE CHIT TRAY. Sharp, close, bottom left, a deli take a number wheel
          with the count on it. It fills while nobody is standing over it. */}
      <div style={{
        position: "absolute", left: 40,
        top: 636 + over(lf, 88, 14, Easing.in(Easing.cubic)) * 200
          + Math.max(0, settle(lf, 38, 7, 0.17, 0.13)) + Math.max(0, settle(lf, 50, 6, 0.17, 0.13))
          + idle(lf, 1.6, 71),
        width: 290, height: 148, zIndex: 54,
        transform: `rotate(${-4 + Math.sin(lf / 34) * 0.6 + settle(lf, 38, 2.4, 0.16, 0.12) + settle(lf, 50, 2.0, 0.16, 0.12)}deg)`,
      }}>
        <div style={{ position: "absolute", left: 0, top: 26, width: 290, height: 96, borderRadius: 8, background: grad("#B99A38", "#5B4710"), border: "4px solid #4E3C0C", boxShadow: "0 16px 32px rgba(6,8,14,0.6), inset 0 3px 0 rgba(255,244,200,0.28)" }} />
        <div style={{ position: "absolute", left: 12, top: 38, width: 266, height: 72, borderRadius: 5, background: "linear-gradient(180deg,#3A2E10,#1A1408)" }} />
        {/* the stamped chits already on the pile, plus the ones that just landed */}
        {Array.from({ length: trayN }, (_, i) => {
          const s = seed(i * 4.9 + 2);
          const land = i >= 3 ? over(lf, i === 3 ? 38 : 50, 10, Easing.out(Easing.cubic)) : 1;
          return (
            <div key={"ch" + i} style={{
              position: "absolute", left: 26 + i * 42 + s * 6, top: 52 + (i % 2) * 12 - land * 4 + Math.sin(lf / 17 + i) * 0.8
                - settle(lf, 38 + stagger(i, 0.8), 4.2, 0.2, 0.17) - settle(lf, 50 + stagger(i, 0.8), 3.6, 0.2, 0.17),
              width: 52, height: 40, borderRadius: 4, background: grad("#E8CC74", "#A8842A"), border: "2px solid #6A5314",
              transform: `rotate(${-10 + s * 20 + settle(lf, 38 + stagger(i, 0.8), 5, 0.19, 0.16) + settle(lf, 50 + stagger(i, 0.8), 4.4, 0.19, 0.16)}deg) scale(${0.9 + land * 0.1})`, boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
            }}>
              <div style={{ position: "absolute", left: 12, top: 10, width: 26, height: 8, borderRadius: 3, background: "#4E3C0C", transform: `rotate(${i % 2 ? -24 : 18}deg)` }} />
              <div style={{ position: "absolute", left: 10, top: 22, width: 10, height: 8, borderRadius: 2, background: "#4E3C0C" }} />
            </div>
          );
        })}
        {/* the take a number wheel */}
        {/* the take a number wheel, a real rolling drum on an eased overshoot */}
        <div style={{ position: "absolute", left: 232, top: 6, width: 52, height: 52, borderRadius: 6, background: "#0E1219", border: "3px solid #6A5314", overflow: "hidden" }}>
          <S6Roll v={trayV} w={46} h={46} size={30} color={GOLD} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 46, height: 46, background: "linear-gradient(180deg, rgba(6,8,12,0.8), transparent 34%, transparent 66%, rgba(6,8,12,0.8))", pointerEvents: "none" }} />
        </div>
        <div style={{ position: "absolute", left: 236, top: 60, width: 44, height: 7, borderRadius: 2, background: "#120E06" }} />
      </div>

      {/* THE PUNCH PRESS LANDINGS. A stamped brass chit is heavy, so each one
          disturbs the world it lands in: a flattened ring off the pile, brass
          chips thrown on arcs, a spit of sparks, and the tray itself rocking. */}
      {[38, 50].map((t) => (
        <React.Fragment key={"imp" + t}>
          <GroundRing lf={lf} at={t} x={150} y={694} r={150} dur={19} hue="rgba(232,204,116,0.5)" z={56} />
          <GroundRing lf={lf} at={t + 3} x={150} y={694} r={96} dur={24} hue="rgba(232,204,116,0.4)" z={56} o={0.6} />
          <Debris lf={lf} at={t} x={150} y={690} n={7} spread={140} rise={58} hue="#8A6A18" sd={t} z={57} />
          <Sparkles lf={lf} at={t} x={150} y={690} n={8} life={24} spread={116} rise={64} hue="#E8CC74" sd={t + 3} z={57} o={0.8} />
        </React.Fragment>
      ))}

      {/* the two captures flying from the grille down into the tray, ten frames
          apart, each landing with its own pitch. Problem, then address. */}
      {[{ p: chit1, q: over(lf - 1, 30, 8, Easing.in(Easing.cubic)), kind: 0 }, { p: chit2, q: over(lf - 1, 42, 8, Easing.in(Easing.cubic)), kind: 1 }].map((c, i) => {
        if (c.p <= 0 || c.p >= 1) return null;
        const x0 = 554, y0 = 244, x1 = 150, y1 = 690;
        const at = (t: number) => ({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * 76 });
        const now = at(c.p), was = at(c.q);
        const cx = now.x, cy = now.y;
        // it crosses 620px in eight frames, so it smears rather than teleports
        return (
          <Smear key={"fly" + i} dx={cx - was.x} dy={cy - was.y} ghosts={3} o={0.32} stretch={1.22} z={55}>
          <div style={{ position: "absolute", left: cx - 27, top: cy - 21, width: 54, height: 42, borderRadius: 4, background: grad("#F0D67E", "#A8842A"), border: "2px solid #6A5314", zIndex: 55, boxShadow: "0 8px 16px rgba(6,8,14,0.6)", transform: `rotate(${c.p * 320}deg) scale(${1.14 - c.p * 0.2})` }}>
            {c.kind === 0
              ? <><div style={{ position: "absolute", left: 16, top: 10, width: 7, height: 22, background: "#4E3C0C", transform: "skewX(-22deg)" }} /></>
              : <><div style={{ position: "absolute", left: 12, top: 18, width: 30, height: 16, background: "#4E3C0C" }} /><div style={{ position: "absolute", left: 10, top: 8, width: 34, height: 12, background: "#4E3C0C", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} /></>}
          </div>
          </Smear>
        );
      })}

      {/* the montage streak bars, only while the brick is actually smearing */}
      {smear > 0.05 && Array.from({ length: 9 }, (_, i) => {
        const s = seed(i * 6.1 + 17);
        return <div key={"st" + i} style={{ position: "absolute", left: -80, top: 180 + s * 520, width: 1180, height: 2 + s * 5, background: "linear-gradient(90deg, transparent, rgba(226,236,255,0.16), transparent)", opacity: smear * 0.8, zIndex: 52, pointerEvents: "none", filter: "blur(2px)" }} />;
      })}

      {/* a bouncing paint tin in the near foreground during the track */}
      {lf > 100 && <div style={{ position: "absolute", left: -270 + (((lf - 100) * 15) % 1460), top: 700 - Math.pow(Math.abs(Math.sin(lf / 7)), 0.62) * 62, width: 74, height: 60, borderRadius: 6, background: grad("#78808C", "#2E333B"), border: "4px solid #23272E", filter: "blur(2.5px)", zIndex: 53, transform: `rotate(${lf * 7}deg)`, boxShadow: "0 12px 22px rgba(4,6,10,0.62), inset 0 3px 0 rgba(224,232,244,0.22), inset 0 -8px 14px rgba(0,0,0,0.42)" }}>
        {/* rolled lid rim and the pressed seam that make it read as a paint tin */}
        <div style={{ position: "absolute", left: 4, top: -8, width: 62, height: 10, borderRadius: 3, background: grad("#8C949F", "#3C424B"), border: "2px solid #23272E" }} />
        <div style={{ position: "absolute", left: 0, top: 16, width: 66, height: 3, background: "rgba(10,12,16,0.5)" }} />
        <div style={{ position: "absolute", left: 0, top: 40, width: 66, height: 3, background: "rgba(10,12,16,0.5)" }} />
        {/* the swing handle, wired through both ears */}
        <div style={{ position: "absolute", left: 6, top: -22, width: 54, height: 22, borderRadius: "27px 27px 0 0", border: "3px solid #4A515B", borderBottom: "none" }} />
        {/* the colour band on the label, so it is obviously the paint he is using */}
        <div style={{ position: "absolute", left: 8, top: 24, width: 50, height: 12, borderRadius: 2, background: S6_BANDS[1].hue, opacity: 0.72, border: "1px solid #23272E" }} />
        {/* a run of paint down the side and a warm rim light off the lamps */}
        <div style={{ position: "absolute", left: 44, top: 36, width: 5, height: 18, borderRadius: 3, background: S6_BANDS[1].hue, opacity: 0.5 }} />
        <div style={{ position: "absolute", left: 62, top: 6, width: 4, height: 44, borderRadius: 2, background: "rgba(242,203,132,0.34)" }} />
      </div>}

      {/* warm night key, fully saturated, and the cold blue fill at the edges.
          Screen blended washes only, never a coloured halo on anything. */}
      <GelWash x={330} y={250} w={840} h={720} color={S6_WARM} o={0.2} z={46} blur={76} />
      <GelWash x={-90} y={520} w={620} h={560} color={S6_COOL} o={0.26} z={46} blur={70} />
      <GelWash x={760} y={70} w={620} h={520} color={S6_COOL} o={0.2} z={46} blur={74} />

      {lf < 86 && <SceneTag f={lf + 24} text="RUNNING" color={S6_WARM} />}
      {lf >= 86 && <SceneTag f={lf - 84} text="SAME RIG" color={S6_WARM} />}
      <HUD lf={lf} text={`BOOKED ${booked}`} color={GOLD} y={168} />

      {/* FOOTER. Two words, no sentence, no echo of the voiceover. */}
      <div style={{ position: "absolute", left: 40, top: 748, padding: "6px 16px", borderRadius: 6, background: "rgba(10,14,22,0.7)", border: `2px solid ${S6_WARM}`, zIndex: 62, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: S6_WARM }}>
        STEP 2
      </div>

      <Vig o={0.36} />
    </>
  );
};

// ==== part: 17_S7.tsx ====

// ===========================================================================
// SCENE 7 , STEP THREE: THE QUESTION HE CANNOT ANSWER
// START 36.71s · 193 frames (lf 0..192) · verb COUNT
// ---------------------------------------------------------------------------
// AT FRAME 0 INVENTORY (complete, dressed, MID ACTION, nothing builds in):
//   · THE ONLY DAYLIGHT SCENE. A DIM overcast morning, colour drained but NOT
//     lifted: the quiet is made by subtracting light, never by adding white, so
//     the blacks stay black and the brass is the brightest thing here. The four
//     catenary lamps are OFF and there is no drizzle, per the card and the
//     colour script. Their motion budget is replaced, layer for layer, by the
//     sky cloud drift, the haze specks, the far tier cloud, the wet road's
//     passing vehicle and rippling puddles, the booth's travelling specular
//     sheen and running rain beads, and the arcade cabinet in Sparks' window.
//   · CAMERA already breathing and drifting laterally at f0, with a permanent
//     handheld micro noise under it. It is never still for a single frame. The
//     one unbroken slow push begins at f12.
//   · SPARKS & SON, lit, its booth built and burning, six green tickets on the
//     awning board, the sign bracket locked, the hanging sign idling.
//   · THE DOORMAN behind the booth glass, headset on, nodding. Eyes visible.
//   · THE HERO at world 640, greatcoat, pillbox cap, tool belt, till on a strap,
//     S6 clipboard on his hip, the PLAIN BRASS QUESTION CARD already out of his
//     coat and 25 percent of the way up, still rising. Eyes visible. Calm.
//   · THE OWNER (electrician, ochre) at world 940, coil of cable already
//     swinging on his shoulder, MID GESTURE, mid sentence about something else.
//   · NOBODY HOME at world 830, opacity 0.62, NO cast shadow, dust pooling,
//     tally box SEALED (clay slash, three dark blocks, gold padlock), hook pole
//     held slack and static across his body, visor idling. Zero sound, zero
//     tings, and he does not move his pole once in this scene.
//   · The upside down GURU MASTERCLASS flyer already fluttering on the brick
//     noticeboard to the left, planted here and paid in S8.
//   · Two scraps of paper already blowing along the kerb, and they never stop.
//   · Foreground: the blurred near kerb lip and one bollard, both bobbing.
//   · Footer chip STEP 3 rendered SOLID. HUD deliberately BLANK all scene.
// AT FRAME 192: the coin mass still settling and twinkling, the push still
// moving, the cable coil still swinging, the three redaction tiles still
// rocking on the glass floor, one coin still spinning flat, the rubber duck
// still bobbing, the booth sheen still travelling. Cut from mid motion.
// ---------------------------------------------------------------------------
// THREE ACTS: (1) an ordinary flat morning and one wordless card, (2) the box
// is opened and the number kills him, (3) the ground itself dissolves and the
// man is standing on a river of his own money, and he closes the sale himself.
//
// THE THREE READABLE BEATS, sound off, in order and never overlapping:
//   A. THE QUESTION   f0..f56   one big brass card, set down hard, held clear.
//   B. THE BLANK      f36..f70  the owner opens, stops, turns his empty hand
//                               over and shrugs. Nothing else in frame peaks.
//   C. THE MONEY      f74..f192 the box lid falls open toward the lens carrying
//                               a readout you can actually read, the redaction
//                               tiles fall off it and bounce, the number rolls,
//                               and then the pavement breaks up under his feet.
// ===========================================================================

// ---- world anchors, derived from the locked geometry (SPARKS & SON, SHOPS[1])
const S7_HERO_X = 640;            // hero spans world 555..725
const S7_VILL_X = 830;            // villain spans world 755..905, behind
const S7_OWNER_X = 940;           // owner spans world 855..1025, in front
const S7_BOOTH_X = 1000;          // boothX(1) = 680 + OFF_BOOTH(320)
const S7_DOORMAN = { x: 1050, y: 520 };
// where the card is set down. Pulled forward and down off the old mark so it
// stands on the CLEAR near pavement in front of the hero instead of being read
// against his own coat, and so it can be carried at a size that reads.
const S7_CARD_B = { x: 586, y: 694 };
// the hero's working shoulder joint in WORLD space, so the card can be hung off
// the actual nub instead of floating next to it. Derived from S7Hero's own rects:
// container left = x - size/2, top = standTop(y, size), arm at (14u, 100u), pivot
// 6u in and half the 21u height down.
const S7_ARM_PIVOT = { x: S7_HERO_X - 85 + 20 * 0.85, y: (660 - 170 * 0.92) + 110.5 * 0.85 };
const S7_BOX = { x: 792, y: 604 };     // the tally box counter window, world
// the tally box LID hinge, in world: the bottom edge of the box he wears. The
// lid falls open TOWARD the lens across this line, which is the only clear band
// in the frame: below every face, above the culvert, between hero and owner.
const S7_LID = { x: 821, y: 642, w: 132, h: 88 };
// The morning is DIM, not white. The quiet is made by taking light away: the
// key is a cold slate used sparingly, and the fill is a deep drained slate so
// the screen blended layers can never lift the blacks off the floor.
const S7_GREY = "#8A9098";        // the cold flat morning key, used at a whisper
const S7_STONE = "#3E4750";       // the drained fill, deliberately dark

// framing: put a world centre at the middle of the 1012 x 792 panel.
const s7Cam = (cx: number, cy: number, z: number) => ({ x: cx - 1012 / z / 2, y: cy - 792 / z / 2, z });

// a landed object that keeps rocking forever: the decaying impact wobble plus a
// permanent slow idle underneath it, so it never reaches a dead stop.
const s7Rock = (lf: number, at: number, amp: number) => {
  const d = lf - at;
  const live = Math.sin(lf / 21 + at * 0.07) * amp * 0.16 + Math.sin(lf / 47 + at) * amp * 0.09;
  if (d < 0) return live;
  return Math.sin(d / 2.4) * amp * Math.max(0, 1 - d / 26) + live;
};

const s7Clamp = (v: number) => Math.max(0, Math.min(1, v));

// ---------------------------------------------------------------------------
// THE HERO, doorman greatcoat over the canonical Mascot, drawn after the body.
// Nothing is glued on: belt, strap, cap and clipboard are all separate rects.
// `arm` 0..1 raises the working arm, `set` 0..1 lowers it to the pavement.
// ---------------------------------------------------------------------------
// A LANDING RING. The flattened ring a contact pushes outward across the
// pavement. Written locally because the motion kit's own GroundRing reaches for
// an easing curve Remotion does not ship, and this scene may not edit that file.
const S7Ring: React.FC<{ lf: number; at: number; x: number; y: number; r?: number; dur?: number; hue?: string; z?: number; o?: number }> =
  ({ lf, at, x, y, r = 200, dur = 18, hue = "rgba(226,220,204,0.55)", z = 26, o = 1 }) => {
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

const S7Hero: React.FC<{ lf: number; x: number; y?: number; size?: number; z?: number; arm?: number; set?: number; reach?: number }> =
  ({ lf, x, y = 660, size = 170, z = 30, arm = 0, set = 0, reach = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    // the lift is deliberately shallow: any more and the nub, and the card hung
    // off it, ride up over his own eyes, which must stay readable all scene.
    const ang = -8 - 20 * arm + 58 * set + 30 * reach;
    // he is never a statue: a slow weight shift plus a breath, always running.
    const swayY = idle(lf, 1.7, 104);
    const swayR = idle(lf, 0.55, 151, 1.1) + settle(lf, 34, 0.9, 0.13, 0.10);
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z, transform: `translateY(${swayY.toFixed(2)}px) rotate(${swayR.toFixed(3)}deg) scaleY(${breathe(lf, 0.006, 97).toFixed(4)})`, transformOrigin: "50% 100%" }}>
        <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82 * (1 + 0.02 * Math.sin(lf / 63))} o={0.3} />
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.2} nodSpeed={9} stern={0.18} gaze={2.4} />
        {/* the greatcoat, gold piping, brass buttons, epaulettes */}
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 78 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 5 * u, height: 78 * u, background: GOLD, opacity: 0.78 }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 104 * u, top: (106 + i * 20) * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: GOLD }} />)}
        <div style={{ position: "absolute", left: 26 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 134 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        {/* the coat skirt, hung on its own hinge so it LAGS the body sway */}
        <div style={{ position: "absolute", left: 34 * u, top: 150 * u, width: 132 * u, height: 34 * u, borderRadius: 3, background: "#7C3623", transformOrigin: "50% 0%", transform: `rotate(${(lag(lf, 4, (g) => idle(g, 1.9, 104)) * 0.9).toFixed(3)}deg)` }} />
        {/* the tool belt of brass door fittings, gained at S3 */}
        <div style={{ position: "absolute", left: 32 * u, top: 152 * u, width: 136 * u, height: 13 * u, background: "#4A3A18" }} />
        {[0, 1, 2, 3].map((i) => <div key={"f" + i} style={{ position: "absolute", left: (42 + i * 30) * u, top: 154 * u, width: 15 * u, height: 20 * u, borderRadius: 2, background: grad("#D5AE44", "#7A5E18"), transformOrigin: "50% 0%", transform: `rotate(${(lag(lf, 3 + i, (g) => idle(g, 2.6, 104)) * 0.8 + settle(lf, 34, 3.4 - i * 0.4, 0.19, 0.14)).toFixed(2)}deg)` }} />)}
        {/* the cash till on a strap, gained at S3 f186 */}
        <div style={{ position: "absolute", left: 152 * u, top: 96 * u, width: 8 * u, height: 46 * u, background: "#33383F", transform: "rotate(-11deg)" }} />
        <div style={{ position: "absolute", left: 2 * u, top: 132 * u, width: 44 * u, height: 32 * u, borderRadius: 3, background: grad("#C8A02E", "#6E5310"), border: `${2 * u}px solid #4E3C0C`, transformOrigin: "50% 0%", transform: `rotate(${(lag(lf, 5, (g) => idle(g, 2.2, 104)) + settle(lf, 34, 2.6, 0.17, 0.12)).toFixed(2)}deg)` }}>
          <div style={{ position: "absolute", left: 8 * u, top: 6 * u, width: 26 * u, height: 5 * u, borderRadius: 2, background: "#3A2C08" }} />
        </div>
        {/* the clipboard of slot cards, gained at S6, hung on the hip and swinging */}
        <div style={{ position: "absolute", left: 150 * u, top: 128 * u, width: 34 * u, height: 44 * u, borderRadius: 2, background: "#6E6252", border: `${2 * u}px solid #4A4238`, transformOrigin: "50% 0%", transform: `rotate(${5 + Math.sin(lf / 21) * 3.2 + settle(lf, 34, 5.5, 0.16, 0.11)}deg)` }}>
          <div style={{ position: "absolute", left: 4 * u, top: 5 * u, width: 26 * u, height: 32 * u, background: "#E4DDCC" }} />
          <div style={{ position: "absolute", left: 9 * u, top: -3 * u, width: 16 * u, height: 6 * u, borderRadius: 2, background: "#8A8272" }} />
        </div>
        {/* the bellhop pillbox cap with a small gold C */}
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 27 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 37 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.84 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 17 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
        {/* the working arm. It holds the card, sets it down, and later carries
            the long brass pencil. Its whole arc stays inside his own silhouette
            and the clear pavement in front of him. */}
        <div style={{ position: "absolute", left: 14 * u, top: 100 * u, width: (48 + 34 * arm + 46 * reach) * u, height: 21 * u, borderRadius: 10 * u, background: HERO, border: `${2 * u}px solid #A8543A`, transformOrigin: `${6 * u}px 50%`, transform: `rotate(${ang}deg)` }}>
          <div style={{ position: "absolute", right: -2 * u, top: -3 * u, width: 25 * u, height: 25 * u, borderRadius: 5, background: "#5E5348", border: `${2 * u}px solid #3E362C` }} />
        </div>
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE PLAIN BRASS QUESTION CARD. One handset glyph, one question mark, no
// words. This is the entire pitch and it is a wordless object.
// ---------------------------------------------------------------------------
// (x, y) is the card's BOTTOM CENTRE, which is what it stands on when it is set
// down and what it pivots around when it rocks. The art is authored once at
// 64x84 and scaled ONCE, never both sized and scaled, which double shrank the
// plate out from under its own glyphs. `sq` squashes it on contact and `gl`
// runs a specular bar across the brass so it is never a still rectangle.
const S7Card: React.FC<{ lf?: number; x: number; y: number; rot?: number; s?: number; z?: number; sq?: { sx: number; sy: number } }> =
  ({ lf = 0, x, y, rot = 0, s = 1, z = 31, sq = { sx: 1, sy: 1 } }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: z, transform: `rotate(${rot}deg) scale(${sq.sx.toFixed(3)}, ${sq.sy.toFixed(3)})`, transformOrigin: "50% 100%" }}>
   <div style={{ position: "absolute", left: -32 * s, top: -84 * s, width: 64, height: 84, transformOrigin: "0 0", transform: `scale(${s})` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: grad("#DCB84E", "#8A6A18"), border: "3px solid #5F4810", boxShadow: "0 6px 13px rgba(8,10,18,0.5), inset 0 2px 0 rgba(255,246,208,0.45)" }} />
    {/* the brass keeps working: one soft specular bar travelling down the plate */}
    <div style={{ position: "absolute", left: 2, top: 2 + ((lf * 0.9) % 96) - 14, width: 60, height: 12, background: "linear-gradient(180deg, transparent, rgba(255,248,214,0.34), transparent)", opacity: 0.8, pointerEvents: "none" }} />
    {/* a second, faster glint so the presented card is never a still rectangle */}
    <div style={{ position: "absolute", left: 2, top: 2 + ((lf * 2.4 + 44) % 120) - 24, width: 60, height: 9, background: "linear-gradient(180deg, transparent, rgba(255,250,224,0.30), transparent)", opacity: 0.7, pointerEvents: "none" }} />
    {/* the struck handset glyph */}
    <div style={{ position: "absolute", left: 16, top: 20, width: 32, height: 9, borderRadius: 4, background: "#4E3C0C", transform: "rotate(-32deg)" }} />
    <div style={{ position: "absolute", left: 12, top: 16, width: 11, height: 11, borderRadius: "50%", background: "#4E3C0C" }} />
    <div style={{ position: "absolute", left: 41, top: 30, width: 11, height: 11, borderRadius: "50%", background: "#4E3C0C" }} />
    {/* one question mark, struck, no words anywhere on it */}
    <div style={{ position: "absolute", left: 20, top: 44, width: 24, height: 14, borderRadius: "12px 12px 0 0", border: "5px solid #4E3C0C", borderBottom: "none" }} />
    <div style={{ position: "absolute", left: 28, top: 56, width: 5, height: 10, background: "#4E3C0C" }} />
    <div style={{ position: "absolute", left: 27, top: 70, width: 7, height: 7, borderRadius: "50%", background: "#4E3C0C" }} />
   </div>
  </div>
);

// ---------------------------------------------------------------------------
// THE LID READOUT. Not a new object: it is the inside face of the tally box lid
// he has worn since S0, which falls open TOWARD the lens when the padlock is
// sheared, carrying the counter he has been hiding. Same two windows and the
// same etched LAST WEEK as the box itself, at a size a stranger can actually
// read at thumbnail. `open` unfolds it, `roll` drives the counter drum.
// ---------------------------------------------------------------------------
const S7Lid: React.FC<{ lf: number; open: number; roll: number; money: number; z?: number; charge?: number }> =
  ({ lf, open, roll, money, z = 28, charge = 0 }) => {
    // 92 degrees is edge on and invisible, 0 is flat to the lens. It unfolds
    // past its mark and settles, and then keeps breathing on a slow idle. The
    // `charge` tremble is the anticipation the beat before the number lands: the
    // whole readout buzzes, so the pause before the reveal is never dead still.
    const buzz = charge > 0.01 ? Math.sin(lf * 1.9) * charge * 1.6 : 0;
    const deg = 92 - 96 * open + settle(lf, 88, 7.5, 0.12, 0.085) + idle(lf, 1.1, 118) * Math.min(1, open * 3) + buzz;
    if (open < 0.02) return null;
    const cInt = Math.floor(roll), cFrac = roll - cInt;
    const glow = Math.max(0, 1 - Math.abs(lf - 117) / 20);
    return (
      <div style={{
        position: "absolute", left: S7_LID.x - S7_LID.w / 2, top: S7_LID.y, width: S7_LID.w, height: S7_LID.h,
        zIndex: z, transformOrigin: "50% 0%", transform: `perspective(720px) rotateX(${deg.toFixed(2)}deg) rotateZ(${(idle(lf, 0.5, 143) + settle(lf, 88, 1.6, 0.11, 0.09) + (charge > 0.01 ? Math.sin(lf * 2.3 + 1) * charge * 1.1 : 0)).toFixed(2)}deg)`,
      }}>
        {/* the brass lid plate */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: grad("#C4A33C", "#6C5310"), border: "3px solid #4E3C0C", boxShadow: "0 10px 20px rgba(6,8,14,0.66), inset 0 2px 0 rgba(255,244,200,0.3)" }} />
        <div style={{ position: "absolute", left: 4, top: 4 + ((lf * 1.1) % 84) - 12, width: S7_LID.w - 8, height: 10, background: "linear-gradient(180deg, transparent, rgba(255,248,214,0.26), transparent)", pointerEvents: "none" }} />
        {/* the etched label, the box's own */}
        <div style={{ position: "absolute", left: 74, top: S7_LID.h - 21, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 10, letterSpacing: "0.14em", color: "rgba(52,38,8,0.9)" }}>LAST WEEK</div>
        {/* THE COUNTER WINDOW, the biggest readable thing in the frame while it
            rolls. Full width, stacked over the money window exactly as the two
            windows are stacked on the box itself. */}
        <div style={{ position: "absolute", left: 9, top: 7, width: S7_LID.w - 18, height: 40, borderRadius: 4, background: "#090C11", border: "3px solid #4E3C0C", overflow: "hidden" }}>
          {/* a mechanical drum: the next digit is always half rolled into view */}
          <div style={{ position: "absolute", left: 0, top: -40 * cFrac, width: "100%", height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 31, color: "#F2D583" }}>{cInt}</div>
          <div style={{ position: "absolute", left: 0, top: 40 - 40 * cFrac, width: "100%", height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 31, color: "#F2D583" }}>{cInt + 1}</div>
          {/* the drum's own scan bar, never still */}
          <div style={{ position: "absolute", left: 0, top: ((lf * 2.4) % 48) - 8, width: "100%", height: 7, background: "rgba(242,213,131,0.10)" }} />
        </div>
        {/* THE MONEY WINDOW, rolling out from under the counter after it lands */}
        {money > 0.02 && (
          <div style={{
            position: "absolute", left: 9, top: 51, width: 62, height: 26, borderRadius: 4,
            background: "#090C11", border: "3px solid #4E3C0C", overflow: "hidden",
            transform: `scaleY(${(0.3 + 0.7 * money).toFixed(3)})`, transformOrigin: "50% 0%",
          }}>
            <div style={{ position: "absolute", left: 0, top: 26 * (1 - money), width: "100%", height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 700, fontSize: 15, color: GOLD, letterSpacing: "-0.03em" }}>$4,800</div>
          </div>
        )}
        {/* the dry pale flare the window throws on the frame the number lands.
            Matte, no coloured halo, and it is gone in eighteen frames. */}
        {glow > 0.02 && <div style={{ position: "absolute", left: -10, top: -8, width: S7_LID.w + 20, height: 58, borderRadius: 10, background: "radial-gradient(ellipse, rgba(255,240,196,0.7), transparent 70%)", opacity: 0.62 * glow, filter: "blur(9px)", mixBlendMode: "screen", pointerEvents: "none" }} />}
      </div>
    );
  };

const S7: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA. One unbroken slow push, then one controlled drop. Never cuts,
  // never whips, and never rests: a permanent breathe, a lateral drift and a
  // handheld micro noise run under everything, plus a decaying shake on each of
  // the six impacts, so no frame of this scene is static.
  const push = over(lf, 12, 128, Easing.inOut(Easing.cubic));
  const drop = over(lf, 140, 16, Easing.inOut(Easing.cubic));
  const zBase = 1.1 + push * 0.16;
  const hits = [
    { at: 34, amp: 4.2, dur: 13 },     // the card is set down
    { at: 74, amp: 3.4, dur: 11 },     // the padlock shears
    { at: 94, amp: 2.0, dur: 8 },      // first tile lands
    { at: 116, amp: 5.0, dur: 16 },    // the number lands
    { at: 130, amp: 2.6, dur: 22 },    // the pavement lets go
    { at: 148, amp: 6.2, dur: 26 },    // the coin mass slides
  ];
  const ck = shakeCam(lf, hits, 1);
  const zNow = (zBase + drop * (1.08 - zBase)) * (1 + 0.014 * Math.sin(lf / 27)) * ck.z;
  const cx = 840 + Math.sin(lf / 43) * 3.4 + ck.x;
  const cy = 470 + drop * 250 + Math.sin(lf / 31) * 2.6 + ck.y;
  const cam = s7Cam(cx, cy, zNow);

  // ---- THE CARD. Already 25 percent raised at f0 and still rising. It arrives
  // at chest height on an OVERSHOOT at f26, is presented for eight frames, then
  // ANTICIPATES (it lifts before it falls) and is driven down onto the pavement
  // with a dry click at f34. It never dead stops: it rocks, glints and breathes
  // for the remaining 158 frames.
  const raise = s7Clamp(0.25 + 0.75 * overshoot(lf, 0, 26, 0.11));
  // the wind up is deliberately left NEGATIVE: on f24..f27 the arm lifts the
  // card a little further before it drives down, which is the anticipation.
  const armSet = Math.min(1.14, antic(lf, 24, 12, 0.20));
  const armRet = overshoot(lf, 44, 20, 0.13);                    // and the arm comes back up
  const armV = raise * (1 - armSet);
  const setV = armSet * (1 - 0.66 * armRet);
  // the nub's live world position, so the card is IN his hand on every frame of
  // the raise instead of floating 60px clear of it.
  const armAng = (-8 - 20 * armV + 58 * armSet) * Math.PI / 180;
  const armR = (37.5 + 34 * armV) * 0.85 - 5.1;
  const handX = S7_ARM_PIVOT.x + armR * Math.cos(armAng);
  const handY = S7_ARM_PIVOT.y + armR * Math.sin(armAng);
  // held OUT to his open side, not against his own coat, so the one prop that
  // carries the whole first act is read against pavement and not against tunic.
  const cardHomeX = handX - 38, cardHomeY = handY + 50;
  // the travel to the pavement ACCELERATES into the contact. It does not tween.
  const place = over(lf, 26, 8, Easing.in(Easing.quad));
  const cardX = cardHomeX + (S7_CARD_B.x - cardHomeX) * place;
  const cardY = cardHomeY + (S7_CARD_B.y - cardHomeY) * place;
  // presented big while it is up, then it stands on the pavement still breathing
  const cardS = (1.04 + 0.34 * over(lf, 6, 22, Easing.out(Easing.cubic)) - 0.10 * place)
    * breathe(lf, 0.014, 88) * (1 + 0.05 * Math.max(0, 1 - Math.abs(lf - 30) / 8));
  const cardRot = -7 + 11 * place + settle(lf, 34, 8.5, 0.17, 0.115) + idle(lf, 1.3, 112) + idle(lf, 0.6, 39, 2.1)
    + 2.6 * Math.sin(lf / 5) * Math.max(0, 1 - Math.abs(lf - 18) / 18) * (1 - place);
  const cardSq = squash(lf, 34, 0.20, 3);
  // the card's own travel speed, for the smear on the last frames of the drop
  const cardVy = (cardY - (cardHomeY + (S7_CARD_B.y - cardHomeY) * over(lf - 1, 26, 8, Easing.in(Easing.quad))));

  // ---- THE OWNER. Mid gesture at f0. His gesture DIES at f36 when the card
  // lands: he looks down at it, opens to answer at f42 and stops, turns his
  // empty hand over, looks at the booth, and shrugs at f56. Every one of those
  // is a separate readable move with its own wind up and its own settle.
  const gesture = 0.7 + 0.3 * Math.sin(lf / 13);
  const toCard = over(lf, 36, 8, Easing.out(Easing.cubic));       // his head drops to the card
  const stall = over(lf, 42, 8, Easing.out(Easing.cubic));
  const handTurn = over(lf, 46, 12, Easing.inOut(Easing.cubic));
  const toBooth = over(lf, 60, 10, Easing.inOut(Easing.cubic));
  const shrug = overshoot(lf, 56, 14, 0.16) * (1 - 0.35 * over(lf, 78, 24));
  const sees = over(lf, 103, 9, Easing.inOut(Easing.cubic));      // he turns and sees the villain
  // a continuous nervous glance while he is still mid sentence, hunting for an
  // answer he does not have, killed the moment he locks onto the card.
  const ownerGaze = 1.4 * (1 - stall) + 3.0 * toCard - 2.2 * handTurn + 3.4 * toBooth - 6.4 * sees
    + 0.9 * Math.sin(lf / 16) * (1 - toCard) * (1 - sees);
  // he physically flinches back half a step when the number lands, and lands it
  const recoil = 13 * (over(lf, 116, 7, Easing.out(Easing.poly(5))) - over(lf, 132, 22, Easing.inOut(Easing.cubic)));
  // the owner is never planted: a slow weight shift runs under everything, and
  // he rocks back in anticipation the beat before the number lands, so his half
  // of the frame is alive on every frame of the flat question beat.
  const ownerWeight = drift(lf, 2.6, 122) + idle(lf, 1.0, 47, 1.3);
  const ownerLean = settle(lf, 56, 1.3, 0.14, 0.11) + idle(lf, 0.5, 151);
  const ownerAntic = -4 * over(lf, 108, 8, Easing.out(Easing.quad)) * (1 - over(lf, 116, 6));
  // the villain is pinned into reality across f101..f114: a tense micro vibration
  // as the shadow arrives, filling the pause before the number lands.
  const villShud = (lf >= 101 && lf < 115) ? nz(Math.floor(lf), 4) * 1.7 * (1 - (lf - 101) / 14) : 0;
  // the readout buzzes with anticipation the beat before the number resolves.
  const lidCharge = over(lf, 104, 8, Easing.out(Easing.cubic)) * (1 - over(lf, 116, 4));
  // ---- THE CLOSE. Three real steps to the booth, each with a bob and a footfall.
  const walkT = over(lf, 152, 18, Easing.inOut(Easing.cubic));
  const walkX = walkT * 46;
  const stepBob = walkT > 0 && walkT < 1 ? -Math.abs(Math.sin(walkT * Math.PI * 3)) * 5.5 : 0;
  const arrive = settle(lf, 170, 2.4, 0.13, 0.11);
  const handOn = overshoot(lf, 163, 9, 0.14);
  const ownerY = 660 + stepBob + arrive + idle(lf, 1.2, 91) - 3.2 * shrug;

  // ---- THE PENCIL. The hero reaches across and taps the box lid once at f74.
  // He never looks at the villain while he does it: his gaze stays on the owner.
  const tapIn = antic(lf, 64, 12, 0.18);
  const tapHit = Math.max(0, Math.sin(Math.PI * s7Clamp((lf - 72) / 8)));
  const tapOut = over(lf, 84, 14, Easing.inOut(Easing.cubic));
  const reachV = Math.max(0, s7Clamp(tapIn) - tapOut);

  // ---- THE BOX. Opened once, and it never closes. The lid falls open toward
  // the lens across f74..f92 with a real wind up and a settle, then eases back
  // to a resting tilt at f126 so it stops competing with the culvert reveal.
  const lidOpen = s7Clamp(antic(lf, 74, 18, 0.14)) * (1 - 0.30 * over(lf, 126, 16, Easing.inOut(Easing.cubic)));
  const openV = over(lf, 74, 24, Easing.out(Easing.cubic));
  // the roll DECELERATES into its landing rather than easing in and out of it
  const rollV = 12 * over(lf, 96, 20, Easing.out(Easing.poly(5)));
  const moneyV = overshoot(lf, 116, 12, 0.16);
  const landed = over(lf, 116, 5, Easing.out(Easing.cubic));

  // ---- THE KILL. Opacity snaps at f101 over 6 frames and a CastShadow fades
  // in under him for the first time in the reel. The dust does not fade: it
  // COLLAPSES, falls to the pavement and dies, and never returns in any scene.
  const solid = over(lf, 101, 6, Easing.out(Easing.cubic));
  const dustV = 0.55 * (1 - solid);
  const collapse = over(lf, 99, 14, Easing.in(Easing.quad));

  // ---- THE GROUND. It does not fade. It BREAKS UP, slab by slab, left to
  // right, and the slabs fall through into the gold. It is opaque again by S8.
  const culvertV = 0.95 * over(lf, 118, 30, Easing.inOut(Easing.cubic));
  const goldUp = over(lf, 124, 32, Easing.out(Easing.cubic));
  // the mass never stops settling: a slow heave plus a faster shimmer so the
  // crest, and the duck riding on it, are still moving on the last frame.
  const massShift = 4 * over(lf, 148, 6, Easing.out(Easing.cubic))
    + Math.sin(lf / 23) * 1.6 + Math.sin(lf / 7.5 + 0.8) * 0.9 + settle(lf, 148, 2.6, 0.06, 0.035);
  const dropCoin = over(lf, 140, 9, Easing.in(Easing.cubic));      // one coin falls in at f148
  // a SECOND and a THIRD coin, launched late and deliberately still in the air
  // at f192, so the scene cuts with something mid fall rather than mid rest.
  const dropCoin2 = over(lf, 176, 24, Easing.in(Easing.cubic));
  const dropCoin3 = over(lf, 158, 16, Easing.in(Easing.cubic));

  // ---- the ordinary morning's own ambient life, running the whole scene
  const haze = 0.5 + 0.5 * Math.sin(lf / 37);
  const ground = 1 - culvertV * 0.86;

  return (
    <>
      <Cam {...cam}>
        <Street
          lf={lf}
          booth={1}
          board={[8, 6, 7, 5]}
          lit={[0.3, 0.5, 0.28, 0.26]}
          sign={0}
          bracket={1}
          rain={0}
          lamps={0}
          daylight={0.3}
          rival={0.12}
          tubes={2}
          tills={2}
          brackets={4}
          culvert={culvertV}
          coins={0.92}
          duck={Math.max(0, Math.min(1, (culvertV - 0.2) / 0.4))}
          coinShift={massShift}
          dry={0.55}
          fill={S7_STONE}
          pigeonY={252}
          pigeonAt={26}
          far={0.74}
          fore={0}
          z={8}
        >
          {/* ================= SCENE SPRITES, staged in world coordinates ===== */}

          {/* the noticeboard on the brick with the upside down GURU MASTERCLASS
              flyer, planted here, paid in S8. Nobody points at it. */}
          <div style={{ position: "absolute", left: 556, top: 356, width: 74, height: 92, zIndex: 12 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "linear-gradient(180deg,#4A4438,#332E26)", border: "3px solid #5A5346" }} />
            <div style={{ position: "absolute", left: 8, top: 10, width: 58, height: 72, background: "#E6DFCE", transform: `rotate(${183 + Math.sin(lf / 17) * 1.6 + Math.sin(lf / 6.1) * 0.7}deg)`, transformOrigin: "50% 0%", boxShadow: "0 3px 7px rgba(0,0,0,0.4)" }}>
              {/* the words, upside down with the flyer, which is the whole gag */}
              <div style={{ position: "absolute", left: 6, top: 7, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, letterSpacing: "0.06em", color: "#8A5A44", lineHeight: 1 }}>GURU</div>
              <div style={{ position: "absolute", left: 6, top: 19, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 7, letterSpacing: "0.1em", color: "#6E6658", lineHeight: 1 }}>MASTERCLASS</div>
              {/* the fanned cash graphic. Deliberately banknote PAPER, not green:
                  green is reserved for awning tickets and the S8 plaque lamp. */}
              {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 8 + i * 7, top: 36 + i * 4, width: 30, height: 12, background: "#C2B896", border: "1px solid #8E8467", transform: `rotate(${-13 + i * 10 + Math.sin(lf / (13 + i * 4)) * 1.4}deg)` }} />)}
            </div>
          </div>

          {/* TWO SCRAPS OF PAPER blowing along the kerb, staggered, tumbling on
              their own arcs. They run from f0 to f192 and are the guarantee that
              the flattest stretch of this scene still has something moving in it.
              They stay low and behind, and they never cross a face. */}
          {[0, 1].map((i) => {
            const per = 168 + i * 47;
            const p = ((lf + i * 96) % per) / per;
            const px = 420 + p * 900;
            const py = 676 - Math.abs(Math.sin(p * Math.PI * 3.2)) * 26 + idle(lf, 2.6, 41 + i * 13, i * 2.2);
            const w = 15 + i * 5;
            return <div key={"scrap" + i} style={{
              position: "absolute", left: px, top: py, width: w, height: w * 0.7, borderRadius: 2,
              background: i ? "#B9B29C" : "#CFC7AE", opacity: (0.34 + 0.14 * Math.sin(lf / 11 + i)) * ground,
              zIndex: 18, transform: `rotate(${(p * 720 * (i ? -1 : 1)).toFixed(1)}deg)`, boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }} />;
          })}

          {/* the warm pool the booth still throws, drained down to a whisper by
              the flat morning. It is the only warmth above the pavement. */}
          <Reflect lf={lf} x={S7_BOOTH_X + 50} y={W_STOOP + 40} w={280} hue="#E8C88E" o={0.085} z={13} />

          {/* the card's contact with the pavement: a ground ring, a dust puff and
              a few grit chips, so the dry click has a picture attached to it. The
              dust lives 70 frames and carries the flattest stretch of the scene. */}
          <S7Ring lf={lf} at={34} x={S7_CARD_B.x} y={S7_CARD_B.y + 4} r={108} dur={20} hue="rgba(214,208,190,0.42)" z={26} />
          <Dust lf={lf} at={35} x={S7_CARD_B.x} y={S7_CARD_B.y} n={11} life={82} spread={96} hue="rgba(176,168,150,0.42)" sd={11} z={26} o={0.8} />
          <Debris lf={lf} at={34} x={S7_CARD_B.x} y={S7_CARD_B.y} n={5} life={22} spread={78} rise={26} hue="#3A3830" sd={13} z={27} o={0.7} />

          {/* NOBODY HOME. Translucent and shadowless until f101, then solid and
              shadowed forever. His pole is held slack and STATIC: he does not
              swing once in this scene, so no arc crosses any figure. The wrapper
              gives him a breath he never loses, and one hard flinch on the frame
              the number lands, which is the only time he reacts to anything. */}
          <div style={{
            position: "absolute", left: 0, top: 0, zIndex: 24,
            transform: `translate(${(idle(lf, 1.1, 137) + settle(lf, 116, 3.4, 0.15, 0.10) + villShud).toFixed(2)}px, ${(idle(lf, 1.5, 96, 2.4) + settle(lf, 101, 2.2, 0.12, 0.09) + villShud * 0.4).toFixed(2)}px)`,
          }}>
            <Nobody
              lf={lf} x={S7_VILL_X} y={652} size={150} pole={0.55} solid={solid} tally={openV}
              count={openV > 0.72 ? rollV : -1} money={lf >= 116 ? "$4,800" : undefined}
              dust={dustV} tilt={0.42 + 0.2 * Math.sin(lf / 23) + 0.5 * over(lf, 38, 10, Easing.inOut(Easing.sin))} z={24}
            />
          </div>

          {/* THE REDACTED TALLY BOX, the second thing the question beat asks you
              to look at. A cool pulse of key lifts it off the dark villain body,
              a soft rim rings it, and its three sealed blocks buzz with a glitch
              flicker, so the box the whole scene is about is a live focal point
              and not a dark lump. All of it dies the instant the lid is tapped. */}
          {lf < 86 && (() => {
            const alive = (1 - over(lf, 74, 14, Easing.inOut(Easing.cubic))) * over(lf, 0, 6, Easing.out(Easing.cubic));
            if (alive < 0.02) return null;
            const pulse = 0.5 + 0.5 * Math.sin(lf / 8.5);
            return (
              <>
                <div style={{ position: "absolute", left: S7_BOX.x - 62, top: S7_BOX.y - 46, width: 124, height: 92, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(178,194,214,${((0.17 + 0.10 * pulse) * alive).toFixed(3)}), transparent 68%)`, filter: "blur(7px)", mixBlendMode: "screen", zIndex: 26, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: S7_BOX.x - 45, top: S7_BOX.y - 33, width: 90, height: 60, borderRadius: 7, border: `2px solid rgba(208,218,230,${((0.16 + 0.14 * pulse) * alive).toFixed(3)})`, boxShadow: `0 0 ${(11 + 10 * pulse).toFixed(0)}px rgba(154,174,200,${(0.13 * alive).toFixed(3)})`, zIndex: 26, pointerEvents: "none" }} />
                {[0, 1, 2].map((i) => { const fl = Math.abs(Math.sin(lf / (3.1 + i * 0.7) + i * 1.4)); return <div key={"gl" + i} style={{ position: "absolute", left: S7_BOX.x - 27 + i * 20, top: S7_BOX.y + 6, width: 15, height: 4, borderRadius: 1, background: `rgba(158,176,198,${(0.24 * fl * alive).toFixed(3)})`, zIndex: 26, pointerEvents: "none" }} />; })}
              </>
            );
          })()}

          {/* THE DUST DOES NOT FADE, IT FALLS. On f99 the haze that has clung to
              his feet for the whole reel loses its lift, drops to the pavement and
              dies. That is the picture of him becoming an ordinary solid object. */}
          {collapse > 0.01 && collapse < 1 && Array.from({ length: 14 }, (_, i) => {
            const s0 = seed(i * 6.7 + 3), s1 = seed(i * 2.3 + 9);
            const st = 99 + stagger(i, 1.2);
            const t = s7Clamp((lf - st) / varyDur(i, 20, 0.3));
            if (t <= 0 || t >= 1) return null;
            const sz = 9 + s0 * 16;
            return <div key={"cd" + i} style={{
              position: "absolute", left: S7_VILL_X - 84 + s0 * 168, top: 596 + s1 * 40 + t * t * (66 + s0 * 22),
              width: sz, height: sz * 0.7, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(142,139,132,0.5), transparent 70%)",
              filter: "blur(3px)", opacity: (1 - t * t) * 0.75, zIndex: 23, pointerEvents: "none",
            }} />;
          })}

          {/* the shadow that has never existed sweeping in under him, wiping from
              his own feet outward, so the state change is SEEN as a change */}
          {solid > 0.02 && <div style={{
            position: "absolute", left: S7_VILL_X - 66 * solid, top: 646, width: 132 * solid, height: 20,
            borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,9,15,0.62), transparent 72%)",
            filter: "blur(4px)", opacity: solid, zIndex: 23, pointerEvents: "none",
          }} />}

          {/* the sheared padlock, thrown clear on a real arc and BOUNCING twice
              on the kerb before it settles, where it goes on rocking */}
          {lf >= 74 && (() => {
            const at = 74, dur = 15;
            const px = arcX(lf, at, dur, 846, 884);
            const py = 668 - bounce(lf, at, dur, 3) * (668 - 598);
            const t = s7Clamp((lf - at) / dur);
            return (
              <div style={{ position: "absolute", left: px, top: py - 17, width: 15, height: 17, zIndex: 27, transform: `rotate(${t * 240 + s7Rock(lf, at + dur, 8)}deg)` }}>
                <div style={{ position: "absolute", left: 3, top: 0, width: 9, height: 9, borderRadius: "50% 50% 0 0", border: "2px solid #C9A227", borderBottom: "none" }} />
                <div style={{ position: "absolute", left: 0, top: 6, width: 15, height: 11, borderRadius: 2, background: GOLD, border: "1px solid #6F5410" }} />
              </div>
            );
          })()}

          {/* THE BOX LID, falling open toward the lens and carrying the readout.
              This is the biggest, brightest, most central object in the frame for
              the whole of act three, and it is where the number is read. */}
          <S7Lid lf={lf} open={lidOpen} roll={rollV} money={moneyV} charge={lidCharge} z={28} />

          {/* THE THREE REDACTION TILES, tipping off the open lid one at a time
              left to right as physical dark tiles, thrown on separate arcs, and
              CLATTERING onto the pavement with a bounce, a squash and a puff of
              grit each, where they go on rocking for the rest of the scene. A
              split flap board collapsing. Their whole arc crosses no figure. */}
          {[[80, 22, 748], [86, 30, 796], [92, 17, 856]].map(([at, w, lx], i) => {
            const dur = 14;
            const sx = S7_LID.x - 50 + i * 34;
            const sy = S7_LID.y + 14;
            const ey = 714 + i * 3;
            const px = arcX(lf, at, dur, sx, lx);
            const py = ey - bounce(lf, at, dur, 3) * (ey - sy);
            const t = s7Clamp((lf - at) / dur);
            const land = at + dur;
            const sq = squash(lf, land, 0.26, 3);
            if (lf < at - 3) {
              // still lying flat on the lid face, already trembling loose
              return <div key={"tile" + i} style={{
                position: "absolute", left: sx - w / 2, top: sy + Math.sin(lf / 2.1 + i) * 0.9, width: w, height: 14, borderRadius: 2,
                background: "linear-gradient(180deg,#232833,#12161E)", border: "1px solid #2E3540", zIndex: 29,
                transform: `rotate(${(Math.sin(lf / 3.4 + i * 2) * 2.2).toFixed(2)}deg)`,
              }} />;
            }
            return (
              <React.Fragment key={"tile" + i}>
                <div style={{
                  position: "absolute", left: px - w / 2, top: py, width: w, height: 14, borderRadius: 2,
                  background: "linear-gradient(180deg,#232833,#12161E)", border: "1px solid #2E3540", zIndex: 29,
                  boxShadow: "0 3px 6px rgba(4,6,12,0.6)", transformOrigin: "50% 100%",
                  transform: `rotate(${(t * (96 + i * 34) + s7Rock(lf, land, 11 - i * 2)).toFixed(2)}deg) scale(${sq.sx.toFixed(3)}, ${sq.sy.toFixed(3)})`,
                }} />
                <S7Ring lf={lf} at={land} x={lx} y={ey + 12} r={64} dur={14} hue="rgba(206,200,182,0.36)" z={26} />
                <Dust lf={lf} at={land} x={lx} y={ey + 10} n={5} life={54} spread={54} hue="rgba(170,163,146,0.4)" sd={20 + i * 4} z={26} o={0.7} />
              </React.Fragment>
            );
          })}

          {/* the hero's long brass pencil. It winds back, reaches across and taps
              the lid once at f74, then withdraws with the tip still trailing.
              Deliberate contact with an object, never with a person, and he does
              not look while he does it. */}
          {reachV > 0.02 && (
            <Smear dx={0} dy={-tapHit * 9} ghosts={2} on={tapHit} o={0.22} z={29}>
              <div style={{
                position: "absolute", left: 700, top: 598 - tapHit * 5, width: 96 * reachV, height: 7, borderRadius: 4,
                background: grad("#D5AE44", "#6E5210"), opacity: Math.min(1, reachV * 2.4),
                transformOrigin: "0% 50%", transform: `rotate(${-9 + tapHit * 7 + settle(lf, 74, 3.2, 0.19, 0.14)}deg)`,
              }}>
                <div style={{ position: "absolute", right: -4, top: -2, width: 11, height: 11, borderRadius: 2, background: "#3A3228" }} />
              </div>
            </Smear>
          )}

          {/* the tap's dry contact tick on the lid, a matte pale flare, no halo,
              with a handful of brass chips thrown off the sheared hasp */}
          {tapHit > 0.05 && <div style={{ position: "absolute", left: S7_BOX.x - 14, top: 586, width: 46, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(246,240,222,0.8), transparent 68%)", opacity: 0.5 * tapHit, filter: "blur(6px)", mixBlendMode: "screen", zIndex: 29, pointerEvents: "none" }} />}
          <Sparkles lf={lf} at={74} x={S7_BOX.x + 34} y={600} n={9} life={24} spread={96} rise={54} hue="#D9BA62" sd={31} z={30} />

          {/* the number landing: a scatter thrown UP off the lid, so the beat has
              a physical event and not only a brightness change */}
          <Sparkles lf={lf} at={116} x={S7_LID.x} y={S7_LID.y + 16} n={14} life={34} spread={168} rise={104} hue="#E7CFA0" sd={41} z={31} />

          {/* THE HERO. Biggest and sharpest figure in frame, calm, eyes visible. */}
          <S7Hero lf={lf} x={S7_HERO_X} y={660} size={170} z={30} arm={armV} set={setV} reach={reachV} />

          {/* the brass question card, in his nub, then standing on the pavement.
              It is smeared on the last frames of the drop so it does not teleport. */}
          <Smear dx={0} dy={cardVy} ghosts={3} on={place > 0.02 && place < 1 ? 1 : 0} o={0.26} z={31}>
            <S7Card lf={lf} x={cardX} y={cardY} rot={cardRot} s={cardS} sq={cardSq} z={31} />
          </Smear>

          {/* THE OWNER. Competent and busy, never a mark. The cable coil swings
              on his shoulder from f0 to the last frame, and it LAGS his body. */}
          <div style={{ position: "absolute", left: 0, top: 0, zIndex: 32, transform: `translate(${(ownerWeight + ownerAntic).toFixed(2)}px, ${ownerLean.toFixed(2)}px)` }}>
            <Owner
              lf={lf} x={S7_OWNER_X + walkX - recoil} y={ownerY} size={170} z={32}
              gaze={ownerGaze} stern={0.2 + 0.4 * sees} shrug={shrug} cable={1} hand={handOn}
              reach={(gesture * 0.30 + 0.10 * Math.sin(lf / 6.1)) * (1 - stall) * (1 - toCard * 0.5)}
            />
          </div>

          {/* his footfalls on the way to the booth, so the walk has weight */}
          {[158, 165, 171].map((at, i) => (
            <Dust key={"step" + i} lf={lf} at={at} x={S7_OWNER_X + 14 + i * 17} y={686} n={4} life={40} spread={40} hue="rgba(168,160,142,0.34)" sd={50 + i * 3} z={26} o={0.6} />
          ))}
          {/* the flat hand landing on the booth glass: one soft ring, one settle */}
          <S7Ring lf={lf} at={170} x={S7_BOOTH_X - 4} y={W_STOOP + 6} r={82} dur={18} hue="rgba(232,200,142,0.42)" z={33} />

          {/* his own hand, held up, turned over and dropped, because he has no
              answer. It enters on an arc and it settles rather than snapping. */}
          {handTurn > 0.02 && stall > 0.4 && (
            <div style={{
              position: "absolute", left: 888 - recoil, top: 588 + stepBob - 8 * handTurn + idle(lf, 1.4, 74) + settle(lf, 58, 3.6, 0.15, 0.11), width: 30, height: 23, borderRadius: 5, background: OCHRE,
              border: "2px solid #7E5434", zIndex: 33, opacity: Math.min(1, stall * 2) * (1 - over(lf, 74, 14)),
              transform: `perspective(200px) rotateY(${handTurn * 176}deg) rotate(${-8 + handTurn * 14 + idle(lf, 2.2, 63)}deg)`,
            }} />
          )}

          {/* THE DOORMAN inside the booth glass, chest up, nodding, eyes visible.
              He never leaves the booth and nobody in this scene calls him. */}
          <Doorman lf={lf} x={S7_DOORMAN.x} y={S7_DOORMAN.y} size={104} lean={0.1 + 0.06 * Math.sin(lf / 29) + 0.12 * over(lf, 168, 12, Easing.out(Easing.back(2)))} z={21} />

          {/* THE PAVEMENT DOES NOT FADE, IT BREAKS UP. Twenty six slabs let go
              left to right on a stagger, tip, and drop through into the gold. The
              seam of the break travels, so the dissolve is a MOVE and not a ramp. */}
          {culvertV > 0.005 && Array.from({ length: 26 }, (_, i) => {
            const s0 = seed(i * 3.77 + 2), s1 = seed(i * 8.13 + 6);
            const sx = 392 + i * 36;
            const at = 118 + i * 0.85 + s0 * 5;
            const dur = varyDur(i, 22, 0.26);
            const t = s7Clamp((lf - at) / dur);
            if (t >= 1) return null;
            const w = 30 + s0 * 8;
            const py = 696 + s1 * 8 + gravity(lf, at, dur, 0, 120 + s0 * 70);
            return <div key={"slab" + i} style={{
              position: "absolute", left: sx, top: py, width: w, height: 11 + s1 * 5, borderRadius: 2,
              background: "linear-gradient(180deg,#4A5058,#2C333B)", opacity: (1 - t * t) * 0.9,
              zIndex: 25, pointerEvents: "none", transformOrigin: "50% 0%",
              transform: `rotate(${(t * (40 + s0 * 90) * (i % 2 ? 1 : -1)).toFixed(1)}deg) scaleY(${(1 - t * 0.4).toFixed(3)})`,
              boxShadow: "0 3px 6px rgba(4,6,12,0.5)",
            }} />;
          })}
          {/* the grit lifted along the travelling seam of the break */}
          {culvertV > 0.005 && [0, 1, 2, 3, 4].map((i) => (
            <Dust key={"seam" + i} lf={lf} at={119 + i * 5} x={430 + i * 200} y={700} n={7} life={70} spread={140} hue="rgba(160,154,138,0.34)" sd={60 + i * 5} z={26} o={0.62} />
          ))}

          {/* THE COIN MASS NEVER SETTLES. A field of staggered twinkles rolls
              across the crest from the moment the ground goes to the last frame,
              so the payoff is alive rather than a lit still. */}
          {goldUp > 0.03 && Array.from({ length: 30 }, (_, i) => {
            const s0 = seed(i * 5.91 + 7), s1 = seed(i * 2.77 + 12);
            const per = 34 + s0 * 46;
            const ph = ((lf + i * 11 + s1 * 60) % per) / per;
            const k = Math.pow(Math.sin(ph * Math.PI), 6);
            const sz = 4 + s0 * 6;
            return <div key={"tw" + i} style={{
              position: "absolute", left: 396 + s0 * 900, top: 712 + s1 * 130 + massShift * (0.6 + s0 * 0.6),
              width: sz, height: sz, borderRadius: "50%", background: "#FFF0BE",
              opacity: k * 0.82 * goldUp, zIndex: 33, pointerEvents: "none",
              transform: `scale(${(0.6 + k * 0.9).toFixed(3)})`,
            }} />;
          })}

          {/* one coin still dropping in from above, landing at f148. It falls
              down the clear gap between the hero (ends 725) and the villain
              (starts 755), so its whole arc crosses nobody. */}
          {dropCoin > 0.02 && dropCoin < 1 && <Coin lf={lf} x={741} y={614 + dropCoin * 106} r={13} roll={dropCoin * 4} z={34} />}
          {/* its landing: a ring on the surface of the mass and a thrown scatter */}
          <S7Ring lf={lf} at={148} x={741} y={724} r={200} dur={26} hue="rgba(240,206,132,0.5)" z={33} />
          <Sparkles lf={lf} at={148} x={741} y={722} n={16} life={40} spread={210} rise={92} hue="#F0D48A" sd={71} z={35} />
          {/* and one coin left spinning flat on the surface for the last frame,
              well below every foot line so it sits ON the money, not over a man */}
          {culvertV > 0.5 && <Coin lf={lf} x={968} y={716 + massShift} r={14} spin={1} roll={0.4} z={34} />}
          {/* two late coins, still falling down the same clear gap when we cut */}
          {dropCoin3 > 0.01 && dropCoin3 < 1 && <Coin lf={lf} x={736} y={548 + dropCoin3 * 178} r={11} roll={dropCoin3 * 6} z={34} />}
          {dropCoin2 > 0.01 && <Coin lf={lf} x={748} y={560 + dropCoin2 * 150} r={12} roll={dropCoin2 * 5} z={34} />}

          {/* ---- FOREGROUND SILHOUETTES, hand placed so none of them sits in
               front of a figure. They fade out with the ground when it goes. */}
          <ForeSil lf={lf} x={-420} groundY={W_KERB + 16} w={3840} h={30} kind="kerb" o={0.85 * ground} blur={2.5} z={44} />
          <ForeSil lf={lf} x={470} groundY={W_KERB} w={52} h={126} kind="bollard" o={0.9 * ground} z={45} />
        </Street>
      </Cam>

      {/* ================= PANEL SPACE: keys, gold, footer ================= */}
      {/* THE TONAL RESET. Every other scene is keyed warm from screen RIGHT at
          tungsten temperature. This one is the reel's only cold scene: the key
          comes from HIGH SCREEN LEFT and it is a hard steel morning, so the
          shadows fall the other way and the whole street changes temperature
          without a single pale sheet being laid over it. Once the pavement goes
          transparent the key direction flips again, to gold from BELOW. */}
      <GelWash x={190 + idle(lf, 5, 190)} y={150} w={900} h={560} color={S7_GREY} o={(0.11 + 0.02 * haze) * (1 - 0.7 * goldUp)} z={46} blur={86} />
      {/* the cold counter fill, sitting only on the right so the modelling on
          the figures reverses against the rest of the reel */}
      <GelWash x={880} y={330 + idle(lf, 4, 143, 1.7)} w={520} h={520} color="#2A3A4C" o={(0.09 + 0.015 * haze) * (1 - 0.8 * goldUp)} z={46} blur={70} />

      {/* the darkening scrim: a deep, near black, COOL neutral pulled down over
          the whole panel with a harder falloff than the night scenes, so the
          contrast is deeper and the blacks stay black. Everything below the
          pavement line is multiplied out by `goldUp`, so the coin mass is not
          sitting under a filter at the exact moment it is the point. */}
      {(() => {
        const g = 1 - goldUp;
        return <div style={{
          position: "absolute", inset: 0, zIndex: 46, pointerEvents: "none",
          background: `linear-gradient(180deg, rgba(9,14,24,0.74) 0%, rgba(11,17,28,${(0.50).toFixed(3)}) 26%, rgba(8,13,22,${(0.44 * g).toFixed(3)}) 44%, rgba(6,10,18,${(0.42 * g).toFixed(3)}) 62%, rgba(4,7,13,${(0.64 * g).toFixed(3)}) 100%)`,
          opacity: 0.94 + 0.05 * Math.sin(lf / 34),
        }} />;
      })()}
      {/* a second, tighter floor scrim that clears COMPLETELY as the gold
          arrives, so the culvert is genuinely the brightest thing in frame */}
      <div style={{
        position: "absolute", left: 0, top: 430, width: 1012, height: 362, zIndex: 46, pointerEvents: "none",
        background: "linear-gradient(180deg, transparent, rgba(4,6,11,0.52))",
        opacity: (1 - goldUp) * (0.94 + 0.06 * Math.sin(lf / 26 + 1.1)),
      }} />

      {/* THE ONE POOL OF MORNING LIGHT. It is parked on the clear pavement where
          the card is set down and where the lid later falls open, so the thing
          the scene is about is always the best lit object in the frame. It
          travels with the beat: card mark, then box mark, then it dies into the
          gold. Cold, weak and matte, never a spotlight. */}
      {(() => {
        const toBox = over(lf, 66, 22, Easing.inOut(Easing.cubic));
        const px = 296 + toBox * 254 + idle(lf, 4, 87);
        const py = 566 + toBox * 36 + idle(lf, 3, 111, 1.4);
        const o = (0.17 + 0.03 * haze) * (1 - 0.9 * goldUp) * (0.55 + 0.45 * over(lf, 8, 22, Easing.out(Easing.cubic)));
        return <GelWash x={px} y={py} w={430} h={330} color="#C6D0DC" o={o} z={47} blur={64} />;
      })()}

      {/* a slow band of morning haze drifting across the middle distance. Kept
          dim and cool: it is atmosphere, not a white sheet. */}
      <div style={{ position: "absolute", left: -160 + ((lf * 0.9) % 1400), top: 300 + idle(lf, 9, 121), width: 620, height: 210, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(146,154,166,0.34), transparent 68%)", opacity: 0.035 + 0.025 * haze, filter: "blur(40px)", mixBlendMode: "screen", zIndex: 47, pointerEvents: "none" }} />

      {/* GOLD IS THE ONLY SATURATED THING IN THE FRAME, AND ONLY UNDER THE
          PAVEMENT. It arrives with the culvert and never leaves the lower band. */}
      {goldUp > 0.02 && <>
        {/* NOT a stand in for the coins. This is bounce light coming UP off a
            coin mass you can actually see, so it is tight and weak, never a
            blurred brown slab laid over the top of the payoff. It breathes with
            the mass, so the gold is still moving on the last frame. */}
        <GelWash x={506} y={742 + massShift * 1.4} w={980} h={300} color="#E7B24C" o={(0.14 + 0.012 * Math.sin(lf / 19)) * goldUp} z={47} blur={30} />
        <div style={{ position: "absolute", left: 0, top: 470 + massShift * 0.8, width: 1012, height: 322, background: "linear-gradient(180deg, transparent, rgba(231,178,76,0.2))", opacity: (0.68 + 0.05 * Math.sin(lf / 15)) * goldUp, mixBlendMode: "screen", zIndex: 47, pointerEvents: "none" }} />
        {/* the up light that the gold throws back onto the underside of the
            figures, which is what sells the key direction flipping to below */}
        <div style={{ position: "absolute", left: 0, top: 360, width: 1012, height: 200, background: "linear-gradient(0deg, rgba(231,178,76,0.16), transparent)", opacity: goldUp * (0.92 + 0.08 * Math.sin(lf / 21 + 0.6)), mixBlendMode: "screen", zIndex: 47, pointerEvents: "none" }} />
      </>}

      {/* FOOTER. Two characters and a word. No sentence, no echo of the VO, and
          the HUD stays deliberately BLANK for this entire scene. */}
      <div style={{ position: "absolute", left: 40, top: 748, padding: "6px 16px", borderRadius: 6, background: "rgba(10,14,22,0.66)", border: `2px solid ${GOLD}`, zIndex: 62, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: GOLD, transform: `translateY(${(-2 * over(lf, 2, 10, Easing.out(Easing.cubic)) + idle(lf, 0.7, 118)).toFixed(2)}px)` }}>
        STEP 3
      </div>

      {/* CONTRAST for the flat question beat: a tight cool key lifts the OWNER
          off the dark so his no-answer performance reads, and a matching one
          lifts the tally BOX, the two things the beat asks you to look at. Both
          are cool daylight and both are gone before the gold, so the deliberate
          dim grade and the money reveal are untouched. */}
      <GelWash x={618 + idle(lf, 4, 133)} y={556} w={300} h={366} color="#BFD0E2" o={(0.14 + 0.03 * haze) * over(lf, 4, 20, Easing.out(Easing.cubic)) * (1 - over(lf, 92, 22, Easing.inOut(Easing.cubic)))} z={47} blur={70} />
      <GelWash x={452 + idle(lf, 3, 101, 1.1)} y={520} w={214} h={252} color="#C6D2E0" o={(0.15 + 0.03 * haze) * over(lf, 2, 16, Easing.out(Easing.cubic)) * (1 - over(lf, 74, 16, Easing.inOut(Easing.cubic)))} z={47} blur={54} />

      {/* a slow reflection travelling across the wet road, so even the empty
          pavement of the flat first half is never a dead surface. It goes with
          the ground when the pavement breaks up. */}
      {ground > 0.06 && (() => {
        const rx = ((lf * 1.5) % 1420) - 210;
        return <div style={{ position: "absolute", left: rx, top: 690, width: 340, height: 26, borderRadius: "50%", background: "linear-gradient(90deg, transparent, rgba(184,200,220,0.22), transparent)", opacity: 0.15 * ground * (0.6 + 0.4 * haze), filter: "blur(5px)", mixBlendMode: "screen", zIndex: 47, pointerEvents: "none" }} />;
      })()}

      {/* FINE COOL DRIZZLE, the overcast morning's own motion. Thin and pale so
          it reads as mist and never lifts to night rain. It runs the whole
          question beat and clears off as the gold arrives so it never sits over
          the payoff. This is the guarantee that no frame of the flat first half
          is ever still. */}
      {(() => {
        const drz = (1 - goldUp) * (0.6 + 0.4 * haze);
        if (drz < 0.03) return null;
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 48, pointerEvents: "none", overflow: "hidden" }}>
            {Array.from({ length: 46 }, (_, i) => {
              const s0 = seed(i * 3.3 + 1), s1 = seed(i * 7.7 + 4);
              const sp = 300 + s0 * 260;
              const x = (s1 * 1012 + i * 23) % 1012;
              const y = ((lf * sp + s0 * 1700) % 940) - 70;
              const len = 15 + s0 * 22;
              return <div key={"dz" + i} style={{ position: "absolute", left: x, top: y, width: 1.4, height: len, background: "linear-gradient(180deg, transparent, rgba(200,214,232,0.5), transparent)", opacity: (0.09 + 0.10 * s1) * drz, transform: "rotate(9deg)" }} />;
            })}
          </div>
        );
      })()}

      {/* the vignette OPENS as the reveal lands. It used to close on it. */}
      <Vig o={0.64 - 0.18 * goldUp + 0.015 * Math.sin(lf / 29)} />
    </>
  );
};

// ==== part: 18_S8.tsx ====

// ===========================================================================
// SCENE 8 , THE BRASS PLAQUE      START 43.15s · 166 frames · verb DECLARE
// ---------------------------------------------------------------------------
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   · THE WHOLE ROW under the reel's one COOL KEY. A NIGHT SET LIT BY ONE COLD
//     LAMP OFF FRAME LEFT, not a faded photograph: the key lands on edges, booth
//     glass, wet pavement and the plaque, and the right of frame is a deep cool
//     shadow side. Live at full strength on frame 0, lamp cones still burning but
//     cooled, drizzle at two parallax speeds, road puddles rippling, the passing
//     vehicle slab already crossing, Drip Bros' magenta already retreated to 0.28.
//   · PIPE BROS' BOOTH built, lit, lantern burning, glass beading with rain and
//     carrying a travelling specular. Its GRILLE IS ALREADY WARMING (0.34) for a
//     customer who has not been greeted, and the RED CORD already hangs inside it.
//   · THE DOORMAN behind the glass, headset on, leaning a notch, eyes visible.
//   · THE ASSISTANT PLAQUE ALREADY IN THE HERO'S HAND, held against the grille at
//     minus 24 degrees, screwdriver already seated in the first screw. Its green
//     enamel lamp is DARK. The bare bolt hole is still visible beside it.
//   · THE HERO on the stoop at world 400, greatcoat, pillbox cap, tool belt, till
//     on a strap, stern, arm already raised. Eyes visible.
//   · CUSTOMER A already mid stride on the pavement at world 180, coin in one nub,
//     spraying pipe in the other, walking toward a booth that cannot speak yet.
//   · PIP at world 790 holding the little hammer on its chain, already swinging.
//   · NOBODY HOME at world 910, SOLID (1.0) and SHADOWED, zero dust, tally box
//     open at 12 and $4,800, bellhop cap on, the hero's coat over one arm and the
//     hook pole held flat across his body. Every sign bracket on the row is locked.
//   · The BREAK GLASS panel on the shop face, the brass SORTER flicking already,
//     the upside down GURU MASTERCLASS flyer stuck to the booth glass and
//     fluttering, the awning board at 2/8 with slot 5 painted red and pulsing.
//   · SceneTag THE RULE and the StatusZip both rendered SOLID at 18 percent.
// AT FRAME 165: the last green ticket still mid split flap, water still sheeting
// off the stoop, the door flap still swinging on its spring, the plaque still
// catching a cold glint, the red slot still pulsing empty, the sorter still
// ticking, the hammer still swinging unused, the hero still walking, customer D
// still walking in, the villain still shuffling right. Cut from mid motion.
// ---------------------------------------------------------------------------
// FOUR PLUS CONCURRENT BACKGROUND LAYERS AT ALL TIMES: far drizzle, near drizzle,
// four out of phase lamp cones, road puddle ripple plus the passing vehicle,
// booth rain beads, booth glass sheen, wet pavement pools, cold key breathe,
// pigeon chevron. Primary subject motion: the plaque, then the two paths.
// Secondary: the sorter flap and the swinging hammer.
// ===========================================================================

// ---- world anchors, all derived from the locked geometry (Pipe Bros, SHOPS[0])
const S8_BOOTH_X = 440;            // boothX(0) = 120 + OFF_BOOTH(320)
const S8_BOOTH_Y = 560;            // W_STOOP
const S8_GRILLE = { x: 490, y: 425 };   // booth local 24..76 / 78..112
const S8_PLQ = { x: 502, y: 418 };      // booth local 62 / 88
const S8_DOOR = { x: 300, w: 110 };
const S8_FLAP = { x: 330, y: 508, w: 48, h: 26 };
const S8_LANE = 660;               // the pavement walking line
const S8_STOP = 396;               // where a customer stands to speak to the grille
const S8_PIP_X = 790;
const S8_VILL_X = 910;
const S8_BIN = { x: 545, y: 600 };
const S8_KEY = COLDCYAN;           // the reel's one cool key, spent entirely here
const S8_PALE = "#3E6D8E";         // deep cold blue, the scene's shadow side fill
const S8_PAVE = 602;               // the wet pavement line, for the cooled spill

// four camera poses. Formal lock, fast push to the cord, whip down to the flap,
// then a long pull back that puts both paths and a second fitted booth in frame.
const S8_P0 = { x: 250, y: 87, z: 1.05 };    // the booth, the door and the stoop
const S8_P1 = { x: 260, y: 220, z: 1.85 };   // tight on the red cord
const S8_P2 = { x: 38, y: 283, z: 1.6 };     // the brass flap in the door
const S8_P3 = { x: 200, y: -42, z: 0.95 };   // both paths, and the next booth

const s8c = (v: number) => Math.max(0, Math.min(1, v));

// a flat expanding shock ring for the two mechanical clicks of this scene. The
// kit's GroundRing reaches for an easing that does not exist in this Remotion,
// so the scene carries its own, upright rather than ground flattened.
const S8Ring: React.FC<{ lf: number; at: number; x: number; y: number; r?: number; dur?: number; hue?: string; z?: number }> =
  ({ lf, at, x, y, r = 110, dur = 16, hue = "rgba(232,214,164,0.5)", z = 30 }) => {
    const t = (lf - at) / dur;
    if (t <= 0 || t >= 1) return null;
    const e = over(lf, at, dur, Easing.out(Easing.cubic));
    const rr = Math.max(1, r * e);
    return <div style={{
      position: "absolute", left: x - rr, top: y - rr * 0.62, width: rr * 2, height: rr * 1.24,
      borderRadius: "50%", border: `${Math.max(1.4, 7 * (1 - e))}px solid ${hue}`,
      opacity: (1 - t) * 0.85, filter: "blur(2px)", zIndex: z, pointerEvents: "none",
    }} />;
  };
// a 0 -> 1 -> 0 bump over `dur` frames. Never a reversed ramp.
const s8Bump = (lf: number, t: number, dur = 12) => Math.sin(Math.PI * s8c((lf - t) / dur));
// a constant speed walk between two world x positions
const s8Walk = (lf: number, t0: number, t1: number, x0: number, x1: number) =>
  x0 + (x1 - x0) * s8c((lf - t0) / (t1 - t0));

// THE HERO, doorman greatcoat over the canonical Mascot. Drawn after the body so
// overshoot is correct. Nothing is glued on: belt, strap, cap, all separate.
// `reach` drives the working arm up to the grille, `screw` spins the screwdriver.
const S8Hero: React.FC<{ lf: number; x: number; y: number; size?: number; z?: number; reach?: number; screw?: number; plaqueInHand?: number }> =
  ({ lf, x, y, size = 170, z = 34, reach = 1, screw = 0, plaqueInHand = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    const La = (104 + 16 * reach) * u;
    // the arm carries a live tremor of effort, and the whole figure breathes.
    const ang = -8 - 34 * reach + idle(lf, 1.1, 27) + settle(lf, 31, 3.2, 0.14, 0.09);
    return (
      <div style={{ position: "absolute", left: x - size / 2, top, width: size, height: size, zIndex: z }}>
        <CastShadow x={size / 2} y={size * 0.9} w={size * 0.82} o={0.4} />
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.4} nodSpeed={10} stern={0.7} gaze={2} />
        {/* the greatcoat, gold piping, brass buttons, epaulettes */}
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 78 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 5 * u, height: 78 * u, background: GOLD, opacity: 0.82 }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 104 * u, top: (106 + i * 20) * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: GOLD }} />)}
        <div style={{ position: "absolute", left: 26 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 134 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        {/* the tool belt of brass door fittings, gained at S3 */}
        <div style={{ position: "absolute", left: 32 * u, top: 152 * u, width: 136 * u, height: 13 * u, background: "#4A3A18" }} />
        {[0, 1, 2, 3].map((i) => <div key={"f" + i} style={{ position: "absolute", left: (42 + i * 30) * u, top: 154 * u, width: 15 * u, height: 20 * u, borderRadius: 2, background: grad("#D5AE44", "#7A5E18") }} />)}
        {/* the cash till on a strap, gained at S3 f186 */}
        <div style={{ position: "absolute", left: 44 * u, top: 96 * u, width: 8 * u, height: 46 * u, background: "#33383F", transform: "rotate(11deg)" }} />
        <div style={{ position: "absolute", left: 154 * u, top: 132 * u, width: 44 * u, height: 32 * u, borderRadius: 3, background: grad("#C8A02E", "#6E5310"), border: `${2 * u}px solid #4E3C0C` }}>
          <div style={{ position: "absolute", left: 8 * u, top: 6 * u, width: 26 * u, height: 5 * u, borderRadius: 2, background: "#3A2C08" }} />
        </div>
        {/* the bellhop pillbox cap with a small gold C */}
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 27 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 37 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.86 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 17 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
        {/* THE WORKING ARM. Pivots at the right shoulder and reaches up to the
            grille. Its whole arc lives above the stoop line and crosses no figure. */}
        <div style={{ position: "absolute", left: 144 * u, top: 96 * u, width: La, height: 21 * u, borderRadius: 11 * u, background: HERO, border: `${2 * u}px solid #A8543A`, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, zIndex: 4 }}>
          <div style={{ position: "absolute", right: -4 * u, top: -3 * u, width: 26 * u, height: 26 * u, borderRadius: 5, background: "#5E5348", border: `${2 * u}px solid #3E362C` }} />
          {/* the brass screwdriver, ratcheting */}
          <div style={{ position: "absolute", right: -40 * u, top: 0, width: 46 * u, height: 17 * u, transformOrigin: "88% 50%", transform: `rotate(${screw * 150 + idle(lf, 3.5, 21)}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 4 * u, width: 27 * u, height: 8 * u, borderRadius: 2, background: grad("#D8C8A8", "#8A8070") }} />
            <div style={{ position: "absolute", left: 23 * u, top: 0, width: 23 * u, height: 17 * u, borderRadius: 3, background: grad("#B8543E", "#7E3626") }} />
          </div>
          {/* the plaque still in his hand before it is seated */}
          {plaqueInHand > 0.02 && <div style={{ position: "absolute", right: -16 * u, top: -12 * u, width: 22 * u, height: 10 * u, borderRadius: 2, background: grad("#E0BC58", "#96721A"), opacity: plaqueInHand }} />}
        </div>
      </div>
    );
  };

const S8: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA. Formal lock with a live breathe, fast push, hard whip down, then
  // a long pull back. The pose is never numerically still for a single frame.
  const push = over(lf, 56, 20, Easing.inOut(Easing.cubic));
  const whip = over(lf, 88, 12, Easing.inOut(Easing.cubic));
  const back = over(lf, 106, 58, Easing.inOut(Easing.cubic));
  const cA = lerpCam(S8_P0, S8_P1, push);
  const cB = lerpCam(cA, S8_P2, whip);
  const cC = lerpCam(cB, S8_P3, back);
  // the camera is a character: handheld micro noise always on, plus a decaying
  // kick on the two impacts of the scene, the plaque seating and the flap slam.
  const s8Cam = shakeCam(lf, [{ at: 31, amp: 3.2, dur: 14 }, { at: 92, amp: 5.4, dur: 17 }], 1);
  const camPose = {
    x: cC.x + Math.sin(lf / 34) * 2.4 + s8Cam.x + drift(lf, 1.4, 148),
    y: cC.y + Math.sin(lf / 21) * 2.2 + s8Cam.y + drift(lf, 1.2, 119, 1.3),
    z: cC.z * (1 + 0.005 * Math.sin(lf / 26)) * s8Cam.z,
  };
  const whipBlur = 6.5 * s8Bump(lf, 88, 12);

  // the attention envelope of the plaque beat. Peaks on the seat click, and it
  // is the ONE thing allowed to be brightest while it runs.
  const s8Focus = s8Bump(lf, 12, 38);

  // ---- BEAT 2. THE PLAQUE. Held at minus 24 degrees at frame 0, two ratchets,
  // seated with a back overshoot at f30, green enamel lamp lit at f32, and the
  // grille only allowed to speak at f40. Order matters and it is the whole point.
  // ANTICIPATION: the plaque is lifted a further seven degrees OFF the grille
  // over f8 to f16 before it ever goes on, so the seat never starts from rest.
  const s8Wind = over(lf, 8, 8, Easing.inOut(Easing.sin));
  const seat = over(lf, 16, 15, Easing.out(Easing.back(2.4)));
  // seats past level on the back ease, then keeps wobbling on its screws for
  // another forty frames. It never arrives at a dead stop.
  const plqAng = -24 - 7 * s8Wind + 31 * seat + settle(lf, 31, 5.2, 0.13, 0.072);
  const s8Sq = squash(lf, 31, 0.15, 3);
  // FOUR ratchets spread across the whole fitting run, not two in the middle.
  const s8Ratchets = [3, 12, 22, 30];
  const screw = s8Ratchets.reduce((a, t, i) => a + s8Bump(lf, t, varyDur(i, 9, 0.2)), 0);
  const lampRaw = overshoot(lf, 32, 9, 0.24);
  const lamp = Math.max(0, Math.min(1, lampRaw));
  const lampFlare = Math.max(0, lampRaw) * (1 + 0.16 * Math.sin(lf / 7));
  // the arm ticks UP a notch before it drops away, so the retract has an antic.
  const heroReach = 1 - 0.86 * over(lf, 44, 16, Easing.inOut(Easing.cubic)) + 0.08 * s8Bump(lf, 38, 7);

  // ---- BEAT 1 and 2. THE FROZEN CUSTOMER. He is held mid stride because the
  // plaque is not on yet. Disclosure staged as a physical precondition.
  const frozen = lf >= 8 && lf < 36 ? 1 : 0;
  const aX = lf < 8 ? s8Walk(lf, 0, 8, 180, 208) : s8Walk(lf, 36, 58, 208, S8_STOP);
  const aOut = over(lf, 78, 13, Easing.inOut(Easing.cubic));
  const aPos = { x: aX - aOut * 46, y: S8_LANE - aOut * 88, o: 1 - over(lf, 80, 12) };

  // ---- THE GRILLE. Warming at frame 0, allowed to speak at f40, pulsing once
  // per greeting for the rest of the scene.
  const grille = Math.min(1, 0.34 + 0.44 * over(lf, 36, 6)
    + 0.22 * (s8Bump(lf, 40, 18) + s8Bump(lf, 86, 16) + s8Bump(lf, 128, 16) + s8Bump(lf, 156, 14)));
  const talk = s8Bump(lf, 40, 24) + s8Bump(lf, 86, 20) + s8Bump(lf, 128, 20) + s8Bump(lf, 156, 18);
  const lean = 0.2 + 0.5 * talk;

  // ---- BEAT 3. THE OTHER THREE. Tiny, unremarked, staggered four frames apart.
  const plq1 = over(lf, 44, 8, Easing.out(Easing.back(1.8)));
  const plq2 = over(lf, 48, 8, Easing.out(Easing.back(1.8)));
  const plq3 = over(lf, 52, 8, Easing.out(Easing.back(1.8)));

  // ---- BEAT 4. THE EMERGENCY. A gushing main, not a spraying pipe. He runs.
  // he arrives, is taken by the hand at f106 and is DRAGGED through the door,
  // still fully visible while the hand has hold of him. Both ends of the
  // handoff are on screen together for eighteen frames, which is the point.
  const bIn = lf >= 58 && lf <= 126;
  const bGrab = over(lf, 106, 15, Easing.inOut(Easing.cubic));
  const bX = lf < 98 ? s8Walk(lf, 60, 84, -110, S8_STOP) : S8_STOP + (S8_FLAP.x + 42 - S8_STOP) * bGrab;
  const bTake = over(lf, 96, 10, Easing.inOut(Easing.cubic)) + 0.6 * s8Bump(lf, 106, 8);
  const bO = 1 - over(lf, 115, 9);
  const cord = 0.12 + 0.88 * (over(lf, 88, 5, Easing.out(Easing.cubic)) - over(lf, 104, 22, Easing.inOut(Easing.cubic)));
  const water = over(lf, 58, 12, Easing.out(Easing.cubic));

  // ---- BEAT 5. THE HANDOFF. A spring loaded flap, and a hand that is OCHRE
  // because ochre belongs to the shop owners and clay belongs to the hero alone.
  const slam = over(lf, 92, 4, Easing.out(Easing.cubic));
  const flapSpring = slam * (1 - 0.55 * over(lf, 112, 30, Easing.inOut(Easing.cubic)));
  const flapAng = -96 * flapSpring + Math.sin((lf - 92) / 5.5) * 13 * Math.max(0, 1 - (lf - 108) / 90) * slam;
  // the hand shoots out with a back overshoot, HOLDS with the customer for a
  // full eight frames, then pulls back in with him.
  const hand = over(lf, 94, 10, Easing.out(Easing.back(1.9))) - over(lf, 112, 11, Easing.in(Easing.cubic));
  const grip = s8Bump(lf, 106, 9);

  // ---- BEAT 6 and 7. TWO PATHS. Three amber customers to the grille, one red
  // customer to a person, and one slot painted red that never chimes.
  const cIn = lf >= 98;
  const cX = lf < 140 ? s8Walk(lf, 100, 130, -120, S8_STOP) : s8Walk(lf, 140, 152, S8_STOP, 350);
  const cOut = over(lf, 140, 12, Easing.inOut(Easing.cubic));
  const cO = 1 - over(lf, 142, 10);
  const dIn = lf >= 128;
  const dX = s8Walk(lf, 130, 158, -120, S8_STOP);

  const tickets = 2 + over(lf, 74, 8, Easing.out(Easing.cubic)) + over(lf, 136, 8, Easing.out(Easing.cubic)) + over(lf, 164, 8, Easing.out(Easing.cubic));

  // ---- THE HERO. Fits the plaque from the stoop, steps down and clears the door
  // for the handoff, then walks back past the booth and peels the flyer off.
  const step = over(lf, 42, 22, Easing.inOut(Easing.cubic));
  const walkBack = over(lf, 150, 18, Easing.inOut(Easing.cubic));
  const heroX = 400 + 220 * step - 75 * walkBack;
  const heroY = 560 + 100 * step;

  // ---- THE FLYER. Peeled off the booth glass at f158 and dropped in the bin,
  // without breaking stride. It is still in the air at the cut.
  const peel = over(lf, 158, 14, Easing.in(Easing.cubic));
  const flyX = 462 + (S8_BIN.x - 462) * peel;
  const flyY = 470 + (S8_BIN.y - 470) * peel * peel - Math.sin(peel * Math.PI) * 26;

  // ---- NOBODY HOME. Solid, shadowed, dustless, silent. Function gone.
  const shuffle = over(lf, 118, 62, Easing.inOut(Easing.cubic));
  const villX = S8_VILL_X + 140 * shuffle;

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: whipBlur > 0.05 ? `blur(${whipBlur}px)` : "none" }}>
        <Cam {...camPose}>
          <Street
            lf={lf}
            booth={[0, 1, 1, 1]}
            board={[tickets, 4, 3, 2]}
            lit={[1, 0.9, 0.86, 0.8]}
            sign={0}
            bracket={1}
            plaque={[0, plq1, plq2, plq3]}
            lamp={[0, plq1, plq2, plq3]}
            redSlot={5}
            tubes={2}
            tills={2}
            brackets={4}
            rain={0.72}
            lamps={1}
            rival={0.28}
            daylight={0}
            cool={0.46}
            dry={0.2}
            fill={S8_PALE}
            pigeonY={140}
            pigeonAt={12}
            far={1}
            fore={1}
          >
            {/* ---- the brass SORTER, a mail room chute flicking between two
                 paths for the whole back half. Mounted behind the booth. ---- */}
            <div style={{ position: "absolute", left: 392, top: 424, width: 52, height: 64, zIndex: 18 }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 52, height: 14, borderRadius: 3, background: grad("#BC9C3C", "#6A5314"), border: "2px solid #4E3C0C" }} />
              <div style={{ position: "absolute", left: 2, top: 30, width: 20, height: 30, borderRadius: 2, background: "linear-gradient(180deg,#3A3210,#191405)" }} />
              <div style={{ position: "absolute", left: 30, top: 30, width: 20, height: 30, borderRadius: 2, background: "linear-gradient(180deg,#3A2418,#1B1008)" }} />
              <div style={{ position: "absolute", left: 22, top: 13, width: 8, height: 22, borderRadius: 2, background: grad("#E0BC58", "#8A6A18"), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 11) * 34}deg)` }} />
              <div style={{ position: "absolute", left: 4, top: 60, width: 16, height: 4, borderRadius: 2, background: GREEN, opacity: 0.34 + 0.3 * Math.abs(Math.sin(lf / 11)) }} />
              <div style={{ position: "absolute", left: 32, top: 60, width: 16, height: 4, borderRadius: 2, background: RED, opacity: 0.3 + 0.3 * Math.abs(Math.cos(lf / 11)) }} />
            </div>

            {/* ---- the BREAK GLASS panel on the shop face. Its hammer bracket is
                 empty because Pip is holding the hammer, and nobody uses it. ---- */}
            <div style={{ position: "absolute", left: 556, top: 432, width: 62, height: 58, zIndex: 26 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "linear-gradient(180deg,#2A2027,#171018)", border: `3px solid ${RED}`, boxShadow: "0 4px 10px rgba(6,8,14,0.55)" }} />
              <div style={{ position: "absolute", left: 7, top: 7, width: 48, height: 32, background: "rgba(178,206,224,0.24)", border: "1px solid rgba(220,238,250,0.35)" }}>
                <div style={{ position: "absolute", left: -14 + ((lf * 1.6) % 90), top: 0, width: 16, height: 32, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent)", filter: "blur(2px)" }} />
              </div>
              <div style={{ position: "absolute", left: 14, top: 44, width: 34, height: 5, borderRadius: 2, background: "#6E5636" }} />
              <div style={{ position: "absolute", left: 46, top: 42, width: 9, height: 9, borderRadius: "50%", border: "2px solid #7A8290" }} />
            </div>

            {/* ---- the emergency trefoil stamped beside the red slot ---- */}
            <div style={{ position: "absolute", left: 396, top: 350, width: 22, height: 22, zIndex: 24, opacity: 0.55 + 0.25 * Math.abs(Math.sin(lf / 9)) }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ position: "absolute", left: 11 + Math.cos(i * 2.094 - 1.57) * 7 - 4, top: 11 + Math.sin(i * 2.094 - 1.57) * 7 - 4, width: 8, height: 8, borderRadius: "50%", background: RED }} />
              ))}
              <div style={{ position: "absolute", left: 8, top: 8, width: 6, height: 6, borderRadius: "50%", background: "#1A1218" }} />
            </div>

            {/* ---- NOBODY HOME. Solid and shadowed forever, zero dust, tally box
                 open at twelve, bellhop cap on, the hero's coat over one arm, the
                 hook pole held flat across his body like a man holding a coat.
                 He shuffles right, past the next booth. He makes no sound. ---- */}
            <Nobody lf={lf} x={villX} y={S8_LANE} size={158} pole={0} solid={1} dust={0}
              tally={1} count={12} money="$4,800" cap={1} coat={1}
              tilt={0.2 + 0.16 * Math.sin(lf / 23)} walk={shuffle > 0.02 && shuffle < 0.98 ? 1 : 0} z={20} />
            <div style={{ position: "absolute", left: villX - 78, top: 556, zIndex: 21, transform: `rotate(${Math.sin(lf / 26) * 1.2}deg)`, transformOrigin: "50% 50%" }}>
              <HookPole lf={lf} x={0} y={0} ang={78} len={168} z={21} />
            </div>

            {/* ---- CUSTOMERS. The grille lane. Bone, coin, one readable prop. ---- */}
            {/* even the FROZEN customer is never numerically frozen: he is held
                mid stride but he trembles and leans, waiting to be greeted. */}
            {aPos.o > 0.02 && <div style={{ position: "absolute", left: 0, top: 0, opacity: aPos.o, zIndex: 22, transformOrigin: `${aPos.x}px ${aPos.y}px`, transform: `translateY(${frozen ? idle(lf, 1.7, 24) : idle(lf, 0.8, 70)}px) rotate(${frozen ? idle(lf, 1.5, 33, 1.1) : 0}deg) scale(${breathe(lf, frozen ? 0.014 : 0.006, 40)})` }}>
              <Customer lf={lf} x={aPos.x} y={aPos.y} scarf={0} prop="pipe" coin={1 - over(lf, 66, 8)} walk={1} freeze={frozen} read={frozen} size={104} z={22} />
            </div>}
            {cIn && cO > 0.02 && <div style={{ position: "absolute", left: 0, top: 0, opacity: cO, zIndex: 22 }}>
              <Customer lf={lf} x={cX} y={S8_LANE - cOut * 86} scarf={2} prop="rad" coin={1 - over(lf, 130, 8)} walk={1} size={104} z={22} />
            </div>}
            {dIn && <Customer lf={lf} x={dX} y={S8_LANE} scarf={1} prop="cable" coin={1} walk={1} size={104} z={22} />}

            {/* ---- the emergency. A gushing main and a customer who RUNS. ---- */}
            {bIn && bO > 0.02 && <div style={{ position: "absolute", left: 0, top: 0, opacity: bO, zIndex: 23, transformOrigin: `${bX}px ${S8_LANE}px`, transform: `translateY(${bTake * -8 - bGrab * 30}px) rotate(${-11 * bGrab + idle(lf, 1.2, 26)}deg) scale(${1 - 0.2 * bGrab})` }}>
              {/* he is the biggest and best lit customer on screen while the
                  handoff runs, so there is never a question who is being taken */}
              <Customer lf={lf} x={bX} y={S8_LANE} scarf={3} prop="main" coin={1} walk={1} run={1} size={126} z={23} />
            </div>}
            {bIn && bO > 0.02 && <GelWash x={bX - 30} y={S8_LANE - 72} w={150} h={190} color={S8_KEY} o={(0.2 + 0.14 * bTake) * bO} z={24} blur={26} />}
            {/* the moment of contact: the grab throws a little water off him */}
            <Sparkles lf={lf} at={106} x={S8_FLAP.x + 62} y={S8_FLAP.y + 44} n={9} life={22} spread={70} rise={44} hue="rgba(206,232,248,0.85)" sd={31} z={31} />

            {/* ---- the wordless chit each amber customer pops into the hopper ---- */}
            {[66, 130, 158].map((t0, k) => {
              const p = s8c((lf - t0) / 14);
              if (p <= 0 || p >= 1) return null;
              const sx = S8_STOP + 30 + (S8_GRILLE.x - S8_STOP - 30) * p;
              const sy = 572 - 208 * p - Math.sin(p * Math.PI) * 22;
              return (
                <div key={"chit" + k} style={{ position: "absolute", left: sx - 16, top: sy - 12, width: 32, height: 24, borderRadius: 3, background: grad("#E2C468", "#A8842A"), border: "2px solid #6A5314", zIndex: 28, opacity: 1 - Math.max(0, (p - 0.84) * 6), transform: `rotate(${(1 - p) * 22}deg) scale(${0.8 + p * 0.2})`, boxShadow: "0 3px 7px rgba(6,8,14,0.55)" }}>
                  <div style={{ position: "absolute", left: 6, top: 6, width: 20, height: 9, borderRadius: 4, background: "#4E3C0C" }} />
                </div>
              );
            })}

            {/* ---- THE BOOTH, sharp, the doorman behind the glass, the red cord
                 already hanging inside it at frame 0. ---- */}
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 27 }}>
              <Booth lf={lf} x={S8_BOOTH_X} y={S8_BOOTH_Y} build={1} lit={0.94} lantern={0.9}
                hue="#EAD8B4" grille={grille} cord={cord} plaque={0} bolthole={seat < 0.5 ? 1 : 0} plate={0} z={27}>
                <Doorman lf={lf} x={38} y={150} size={104} lean={lean} talk={talk} cheer={s8Bump(lf, 33, 11)} z={19} />
              </Booth>
            </div>

            {/* ---- THE PLAQUE. Hinged, held in the hero's hand at minus 24 degrees
                 on frame 0, seated with a back overshoot, and its GREEN ENAMEL
                 LAMP LIGHTS BEFORE the grille is ever allowed to speak. ---- */}
            {/* brass filings thrown off the screw head on every ratchet, so the
                fitting run reads as work being done and never as a still. */}
            {s8Ratchets.map((t, i) => (
              <Sparkles key={"fil" + i} lf={lf} at={t} x={S8_PLQ.x - 4} y={S8_PLQ.y + 8} n={5} life={varyDur(i, 16, 0.3)} spread={vary(i, 44, 0.3)} rise={vary(i, 30, 0.35)} hue="#D8C8A8" sd={i * 4 + 2} z={32} o={0.9} />
            ))}
            {/* the seat CLICK: a hard little burst on the plaque, not a fade */}
            <Sparkles lf={lf} at={31} x={S8_PLQ.x + 46} y={S8_PLQ.y + 10} n={12} life={24} spread={110} rise={62} hue="#F0DCA0" sd={17} z={34} />
            <S8Ring lf={lf} at={31} x={S8_PLQ.x + 46} y={S8_PLQ.y + 12} r={120} dur={16} hue="rgba(232,214,164,0.5)" z={30} />
            {/* the green enamel lamp coming on, thrown as its own ring */}
            <S8Ring lf={lf} at={33} x={S8_PLQ.x + 116} y={S8_PLQ.y + 14} r={86} dur={20} hue="rgba(126,196,140,0.55)" z={32} />
            <Sparkles lf={lf} at={33} x={S8_PLQ.x + 116} y={S8_PLQ.y + 12} n={7} life={26} spread={62} rise={40} hue={GREEN} sd={23} z={34} o={0.85} />
            <div style={{ position: "absolute", left: S8_PLQ.x, top: S8_PLQ.y, zIndex: 31, transformOrigin: "0 50%", transform: `rotate(${plqAng}deg) scale(${s8Sq.sx}, ${s8Sq.sy})` }}>
              <Plaque lf={lf} x={0} y={0} text="ASSISTANT" on={1} lamp={lamp} s={1.22} z={31} screws={2} />
              {/* the cold glint travelling across the brass */}
              <div style={{ position: "absolute", left: -10 + ((lf * 2.2) % 150), top: -2, width: 22, height: 30, background: `linear-gradient(100deg, transparent, ${S8_KEY}, transparent)`, opacity: 0.5, filter: "blur(3px)", mixBlendMode: "screen", pointerEvents: "none" }} />
            </div>

            {/* ---- the GURU MASTERCLASS flyer, upside down on the booth glass,
                 peeled off at f158 and dropped in the bin, still in the air. ---- */}
            <div style={{ position: "absolute", left: flyX, top: flyY, width: 42, height: 54, background: "#EFE7D4", border: "1px solid #C9BEA4", zIndex: 32, transform: `rotate(${184 + peel * 260 + Math.sin(lf / 13) * 2.4}deg)`, boxShadow: "0 3px 7px rgba(6,8,14,0.45)" }}>
              <div style={{ position: "absolute", left: 4, top: 6, width: 34, height: 4, background: "#8A5A44" }} />
              <div style={{ position: "absolute", left: 4, top: 13, width: 24, height: 3, background: "#B0A897" }} />
              {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 6 + i * 5, top: 26 + i * 3, width: 22, height: 9, background: "#5E8A6A", transform: `rotate(${-12 + i * 9}deg)` }} />)}
            </div>
            {/* the bin it lands in */}
            <div style={{ position: "absolute", left: S8_BIN.x - 22, top: S8_BIN.y - 4, width: 44, height: 62, zIndex: 19 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "3px 3px 6px 6px", background: "linear-gradient(180deg,#3E4650,#232A33)", border: "2px solid #4E5763" }} />
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 4 + i * 10, top: 6, width: 3, height: 50, background: "rgba(12,16,22,0.55)" }} />)}
              <div style={{ position: "absolute", left: -4, top: -5, width: 52, height: 8, borderRadius: 3, background: "#4E5763" }} />
            </div>

            {/* ---- THE BRASS FLAP in the door, and the OCHRE hand that comes
                 straight out and takes the customer inside. Spring loaded, and it
                 is still swinging at the cut. ---- */}
            <div style={{ position: "absolute", left: S8_FLAP.x, top: S8_FLAP.y, width: S8_FLAP.w, height: S8_FLAP.h, zIndex: 29, transformOrigin: "50% 0%", transform: `perspective(220px) rotateX(${flapAng}deg)` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: grad("#C09B34", "#6A5314"), border: "2px solid #4E3C0C", boxShadow: "0 3px 7px rgba(6,8,14,0.5)" }} />
              <div style={{ position: "absolute", left: 4, top: 4, width: S8_FLAP.w - 8, height: 3, background: "rgba(255,246,214,0.4)" }} />
            </div>
            {slam > 0.4 && <div style={{ position: "absolute", left: S8_FLAP.x + 2, top: S8_FLAP.y + 2, width: S8_FLAP.w - 4, height: S8_FLAP.h - 4, background: "#090C12", zIndex: 28 }} />}
            {hand > 0.02 && <div style={{ position: "absolute", left: S8_FLAP.x + 10 - bGrab * 12, top: S8_FLAP.y + 6, width: 30 + hand * 102, height: 25, borderRadius: 12, background: OCHRE, border: "2px solid #7E5432", zIndex: 30, transformOrigin: "0 50%", transform: `rotate(${20 + hand * 16 + settle(lf, 104, 4.5, 0.15, 0.1)}deg)`, opacity: Math.min(1, hand * 2), boxShadow: "0 3px 8px rgba(6,8,14,0.5)" }}>
              <div style={{ position: "absolute", right: -7, top: -6, width: 34 + grip * 6, height: 34 - grip * 7, borderRadius: 8, background: OCHRE, border: "2px solid #7E5432" }} />
            </div>}

            {/* ---- PIP, holding the little hammer on its chain. It swings for the
                 whole scene and nobody ever has to break anything. ---- */}
            <Pip lf={lf} x={S8_PIP_X} y={655} size={72} hammer={1} look={0.7} z={33} />

            {/* ---- THE HERO ---- */}
            <S8Hero lf={lf} x={heroX} y={heroY} size={170} z={34} reach={heroReach} screw={screw} plaqueInHand={0} />

            {/* ---- FOREGROUND: the water sheeting off the stoop from the gushing
                 main, at blur(2px), catching the cold key. Ankle height, so it
                 crosses no figure. It is still sheeting at the cut. ---- */}
            {water > 0.02 && <div style={{ position: "absolute", left: 180, top: 634, width: 560, height: 46, zIndex: 42, opacity: 0.62 * water, filter: "blur(2px)", pointerEvents: "none" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${S8_KEY}, transparent 88%)`, opacity: 0.4, borderRadius: "50%" }} />
              {Array.from({ length: 22 }, (_, i) => {
                const s = seed(i * 3.7 + 17);
                const p = ((lf * (1.6 + s * 1.8) + s * 120) % 120) / 120;
                return <div key={i} style={{ position: "absolute", left: 470 - p * 440, top: 8 + s * 30, width: 34 + s * 40, height: 3, borderRadius: 2, background: "rgba(214,236,248,0.55)", opacity: (1 - p) * 0.8 }} />;
              })}
            </div>}

            {/* the scene's own dotted spill from the booth lantern, cooled */}
            <Reflect lf={lf} x={S8_GRILLE.x} y={S8_PAVE} w={340} hue="#EAD8B4" o={0.16} z={16} />

            {/* ---- THE COLD KEY, built in the world so it stays glued to the set.
                 One cold lamp off frame LEFT. It lands on edges, on the booth
                 glass, on the wet pavement and on the plaque. Everything it does
                 not reach stays dark. Screen blended ellipses only. ---- */}
            <GelWash x={318} y={452} w={330} h={430} color={S8_KEY} o={0.5 + 0.05 * Math.sin(lf / 29)} z={43} blur={40} />
            <GelWash x={470} y={476} w={190} h={300} color={S8_KEY} o={0.42 + 0.06 * Math.sin(lf / 19 + 1.4)} z={43} blur={26} />
            {/* the cold sheet the key leaves on the wet pavement */}
            <GelWash x={392} y={S8_PAVE + 26} w={620} h={104} color={S8_KEY} o={0.46 + 0.05 * Math.sin(lf / 23)} z={17} blur={32} />
            {/* a low cold RAKE running the wet pavement, so the ground reads cyan */}
            <GelBar x={-40} y={S8_PAVE - 4} w={780} h={64} color={S8_KEY} o={0.34 + 0.05 * Math.sin(lf / 27 + 0.6)} rot={-3} z={17} />
            {/* the key catching the EDGES it is thrown across: booth glass, the shop
                door jamb and the fascia lip. Thin screen blended slivers, not sheets. */}
            {[[402, 372, 15, 210], [470, 392, 11, 176], [286, 430, 13, 150], [556, 420, 10, 86]].map(([ex, ey, ew, eh], i) => (
              <div key={"edge" + i} style={{ position: "absolute", left: ex, top: ey, width: ew, height: eh, zIndex: 40, pointerEvents: "none", mixBlendMode: "screen", filter: "blur(4px)", opacity: 0.42 + 0.1 * Math.sin(lf / (17 + i * 5) + i), background: `linear-gradient(90deg, ${S8_KEY}, transparent)` }} />
            ))}
            {/* the COLD RIM on the hero. The key is off frame left, so it rides his
                left edge and travels with him. Blurred ellipse plus one edge sliver. */}
            <GelWash x={heroX - 54} y={heroY - 66} w={126} h={196} color={S8_KEY} o={0.36 + 0.05 * Math.sin(lf / 15)} z={35} blur={24} />
            <div style={{ position: "absolute", left: heroX - 92, top: heroY - 148, width: 20, height: 132, zIndex: 35, pointerEvents: "none", mixBlendMode: "screen", filter: "blur(3px)", opacity: 0.5 + 0.08 * Math.sin(lf / 12), background: `linear-gradient(90deg, ${S8_KEY}, transparent)` }} />
            {/* the plaque and its green enamel lamp are the brightest things here */}
            <GelWash x={S8_PLQ.x + 52} y={S8_PLQ.y + 10} w={230} h={124} color="#D6EEF8"
              o={0.30 + 0.30 * lampFlare + 0.22 * s8Focus + 0.05 * Math.sin(lf / 13)} z={33} blur={22} />
            {/* a live cold drizzle gust across the whole set, so no run of frames
                anywhere in the scene can ever be identical */}
            <SpeedLines lf={lf} x={-60} y={230} w={860} h={470} dir={74} n={18} on={0.22 + 0.08 * Math.sin(lf / 31)} hue="rgba(196,222,238,0.38)" z={41} sd={8} />
            {/* the SHADOW SIDE. Deep and cool, never a coloured halo. It sits ABOVE
                the world cool sheet so the right of frame stays a dense cold black.
                It OPENS UP while the plaque beat runs so the plaque wins the frame. */}
            <div style={{ position: "absolute", left: 560, top: 200, width: 900, height: 700, zIndex: 49, pointerEvents: "none", opacity: 0.62 - 0.14 * s8Focus + 0.05 * Math.sin(lf / 37), background: "linear-gradient(100deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.62) 56%, rgba(3,7,15,0.86) 100%)" }} />
          </Street>
        </Cam>
      </div>

      {/* ================= PANEL SPACE: the cool key, the tag, the zip ========= */}
      {/* THE REEL'S ONE COOL KEY, thrown from frame LEFT only. Never a full frame
          wash: the right of the panel is the shadow side and it stays deep. */}
      <div style={{ position: "absolute", left: 0, top: 200, width: 1012, height: 592, zIndex: 45, pointerEvents: "none", opacity: 0.5 - 0.1 * s8Focus + 0.06 * Math.sin(lf / 41), background: "linear-gradient(102deg, rgba(6,11,19,0) 26%, rgba(6,11,19,0.44) 70%, rgba(4,8,15,0.66) 100%)" }} />
      <GelWash x={26} y={392} w={560} h={660} color={S8_KEY} o={0.36 + 0.04 * Math.sin(lf / 31)} z={46} blur={92} />
      <GelBar x={-60} y={228} w={600} h={190} color={S8_KEY} o={0.36 + 0.05 * Math.sin(lf / 25 + 0.8)} rot={-11} z={46} />
      {/* a second cold source low left, so the wet ground carries the key too */}
      <GelWash x={120} y={688} w={620} h={280} color={S8_KEY} o={0.3 + 0.04 * Math.sin(lf / 21 + 1.9)} z={46} blur={78} />

      <SceneTag f={lf + 20} text="THE RULE" color={S8_KEY} x={40} y={214} />

      {/* the one scene with no native counter gets the StatusZip. Solid at f0. */}
      <StatusZip lf={lf} x={40} y={706} w={372}
        steps={[[-8, 0.18], [26, 0.36], [58, 0.52], [88, 0.68], [118, 0.84]] as [number, number][]}
        snapAt={150} label="SAFE" z={64} />

      <Vig o={0.52} />
    </>
  );
};

// ==== part: 19_S9.tsx ====
// ============================================================================
// SCENE 9 , WORSE THAN NEVER . 91 frames, lf 0..90. verb: CRACK.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   1  the camera is ALREADY MID WHIP, travelling right across the street at
//      speed toward Drip Bros, nine horizontal smear bars over the whole panel
//      at full strength and a 3px vertical judder. It is a smear, not a build
//   2  NOBODY HOME already standing at the rival's plateless booth, SOLID and
//      SHADOWED (continuity 2, he has been solid since S7 f107), zero dust
//      (continuity 3), the crude painted clay face ALREADY tied over his visor
//      and already worn, not being put on
//   3  the knockoff booth already bolted to the rival stoop: no brass rails
//      lantern, no ALWAYS ON plate, a BARE BOLT HOLE where a plaque belongs,
//      rain already running down its glass and the specular sheen travelling
//   4  a customer already mid stride on the pavement coming in from the left,
//      gushing main in one nub throwing fourteen water particles, brass coin
//      in the other
//   5  Drip Bros already lit at 8/8: magenta fascia buzzing, the three circle
//      dripping tap glyph mid drip, the WE PICK UP tube on, the red OPEN bar,
//      the yellow phone directory already propping their door open
//   6  our own row already warm at the far left edge: Valvotine lit, its booth
//      lantern burning and its plaque fitted, which makes the whole comparison
//      without a single caption
//   7  ALWAYS ON drizzle far and near, four catenary lamp cones flickering out
//      of phase, road colour smears plus the passing vehicle block, three
//      puddles rippling, wet pavement reflections
//   8  the red NO PLATE chip already hung off the booth on its leader wire
//   9  SceneTag DOWN THE ROAD and the greyed out HUD, both rendered solid
//  10  the pigeon chevron due at f16
//
// POLISH PASS. The one sentence this scene must say with the sound off is
// "the rival booth pretends to be human, gets the answer wrong, and its fake
// face cracks and falls off". Three things were carrying that badly:
//   a  the camera was locked dead from f12 to f60 and from f68 to f90, which is
//      where the measured dead air lived. It is now never locked: a handheld
//      floor, a slow creep in on the lie, an arrival settle out of the whip and
//      a real decaying shake on the ceramic snap and on both half landings.
//   b  the crack had no anticipation, no impact and no weight. He now leans
//      back and shudders for eight frames before the ceramic lets go, the snap
//      carries a camera hit, chips and ground rings, and each half lands on its
//      own frame with a rebound, a squash and a decaying tumble.
//   c  the mask read as two small brown tiles on wet tarmac at 60px. The two
//      halves now also sweep the LENS in the foreground at 250px with the
//      painted eye and mouth on them, which is the frame that says "that was a
//      fake face". The pavement pair then slide together so they read as one
//      broken face rather than two unrelated props.
// ============================================================================

const S9_CAM_W = { x: 1380, y: 150, z: 0.96 };   // f0, mid whip, still travelling
const S9_CAM_A = { x: 2140, y: 123, z: 1.05 };   // RIVAL, our lit row on the left edge
const S9_CAM_B = { x: 2459, y: 156, z: 1.34 };   // snapped in on the crack

const S9_VX = 2706, S9_VY = 552, S9_VS = 158;    // the villain, on the rival stoop
const S9_BX = 2760, S9_BY = 560;                 // the plateless knockoff booth
const S9_GR = { x: 2784, y: 408, w: 52, h: 34 }; // its speaking grille
const S9_CX = 2600;                              // where the customer stands to read

// the two mask halves, at the exact world pose Nobody's own mask reaches at
// mask = 1, so the handoff from his face to the pavement is seamless.
const S9_HALVES = [
  { x: 2589.1, y: 621.5, r: -42, side: 0 },
  { x: 2777.1, y: 621.5, r: 42, side: 1 },
];

const S9_TILT = 14;      // his tell. He always knows first
const S9_GREET = 16;     // the grille lights and lies
const S9_TICKET = 32;    // the wrong answer, confidently given
const S9_DROP = 28;      // the beacon housing comes down the cable
const S9_RED = 36;       // the bay floods
const S9_BURN = 46;      // the ticket ignites
const S9_STRAIN = 52;    // the ceramic starts to go. Eight frames of wind up
const S9_CRACK = 60;     // the ceramic snap
const S9_LAND = 72;      // the halves are on the pavement
const S9_LEAVE = 74;     // they walk past our row and out of the world

// the customer's whole path: walk in, stand and read, then leave the street
const s9CustX = (lf: number) => {
  if (lf <= 26) return 2380 + Easing.out(Easing.cubic)(Math.min(1, lf / 26)) * 220;
  if (lf < S9_LEAVE) return S9_CX + Math.sin(lf / 13) * 1.6;
  return S9_CX - over(lf, S9_LEAVE, 22, Easing.in(Easing.quad)) * 372;
};
// the ticket, out of the chute at the booth's base and along UNDER his feet line.
// It gets a two frame suck back into the chute first, so it is fired, not slid.
const s9TicketT = (lf: number) => Math.max(0, Math.min(1, (lf - S9_TICKET) / 11));
const s9TicketX = (lf: number) => 2782 - s9TicketT(lf) * 228 + Math.max(0, 5 * (1 - over(lf, S9_TICKET - 3, 3)));

// The flattened shock ring a hard landing pushes outward. The motion kit's
// GroundRing reaches for `Easing.poly(5)`, which Remotion's Easing does not
// export, so it throws at render. This is the same shape on Easing.poly(5),
// authored locally so this scene never depends on that bug being fixed.
const S9Ring: React.FC<{ lf: number; at: number; x: number; y: number; r?: number; dur?: number; hue?: string; z?: number; o?: number }> =
  ({ lf, at, x, y, r = 180, dur = 17, hue = "rgba(226,220,204,0.5)", z = 22, o = 1 }) => {
    const t = (lf - at) / dur;
    if (t <= 0 || t >= 1) return null;
    const e = over(lf, at, dur, Easing.out(Easing.poly(5)));
    const rr = Math.max(1, r * e);
    return <div style={{
      position: "absolute", left: x - rr, top: y - rr * 0.3, width: rr * 2, height: rr * 0.6, borderRadius: "50%",
      border: `${Math.max(1.5, 9 * (1 - e)).toFixed(2)}px solid ${hue}`, opacity: o * (1 - t) * 0.9,
      filter: "blur(2.5px)", zIndex: z, pointerEvents: "none",
    }} />;
  };

const S9: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA. The camera is a character here and is never once locked:
  // whip, an arrival settle, a slow creep in through the lie, then an
  // anticipated snap that overshoots past 1.34 and eases back.
  const whip = over(lf, 0, 12, Easing.out(Easing.poly(5)));
  // antic() dips slightly the WRONG way at f58 before pushing in, so the snap
  // does not start from rest, and it lands past its target and settles.
  const snap = Math.max(0, antic(lf, 58, 11, 0.09, Easing.out(Easing.back(1.5))));
  const cam = lerpCam(lerpCam(S9_CAM_W, S9_CAM_A, whip), S9_CAM_B, snap);
  // the whip does not dead stop: it slides 22px past RIVAL and rocks back in
  const arrive = settle(lf, 12, 22, 0.105, 0.085);
  // and through the whole "locked" greeting it creeps in a hair, so no two
  // adjacent frames anywhere in f12..f58 are identical
  const creep = over(lf, 13, 46, Easing.inOut(Easing.cubic));
  const hits = [
    { at: S9_DROP + 9, amp: 5, dur: 10 },        // the cable snaps taut
    { at: S9_CRACK, amp: 17, dur: 20 },          // the ceramic snap, the harshest in the reel
    { at: S9_LAND, amp: 8, dur: 13 },            // left half hits the pavement
    { at: S9_LAND + 2, amp: 6, dur: 11 },        // right half, two frames later
  ];
  const sc = shakeCam(lf, hits, 1);
  const judder = lf < 13 ? Math.sin(lf * 2.7) * 3 * (1 - lf / 13) : 0;
  const breathe2 = 1 + 0.004 * Math.sin(lf / 19) + 0.003 * Math.sin(lf / 7.3);
  const camX = cam.x + arrive + creep * 20 + sc.x;
  const camY = cam.y + judder + sc.y + idle(lf, 1.6, 150);
  const camZ = cam.z * breathe2 * sc.z * (1 + creep * 0.014);

  // ---- STATE RAMPS
  // the grille never sits at a flat value while it is lying: it flickers
  const grille = over(lf, S9_GREET, 6, Easing.out(Easing.back(2.2)))
    * flick(lf, 0.26, 2) * (lf < S9_CRACK ? 1 : 1 - over(lf, S9_CRACK, 5));
  const tilt = over(lf, S9_TILT, 5) - over(lf, 30, 8) * 0.4;
  // <Nobody> gates its mask on `mask > 0.02`, so a plain 0 UNMOUNTS the painted
  // face. It must be worn and intact from frame 0, so floor it just above the
  // gate (0.021 is a 1.5px offset, invisible). It reaches exactly 1 at f71, and
  // at f72 it unmounts and S9_HALVES take over at that identical world pose, so
  // the two never draw on top of each other and the rocking is never occluded.
  // The split is LINEAR in `mask`, which is what makes it read: <Nobody> moves
  // the halves sideways by mask and down by mask SQUARED, so a linear ramp gives
  // an instant sideways snap plus an accelerating fall. An eased-in ramp made
  // the first six frames after the crack look like nothing had happened.
  const maskV = lf >= S9_LAND ? 0 : 0.021 + over(lf, S9_CRACK, S9_LAND - 1 - S9_CRACK, Easing.linear) * 0.979;
  const cracked = lf >= S9_LAND ? 1 : 0;

  // ---- HIS BODY. The one thing that must not be a still sprite. He carries an
  // idle sway at all times, he LEANS BACK over the eight frames before the
  // ceramic goes (anticipation), he takes a hard recoil on the snap itself, and
  // after the halves land he settles forward into a caught slump that is still
  // drifting on frame 90.
  const strain = over(lf, S9_STRAIN, 8, Easing.inOut(Easing.sin));
  const tremor = strain * (1 - over(lf, S9_CRACK, 3)) * Math.sin(lf * 2.9) * 1.5;
  const bodyR = idle(lf, 0.9, 104) + drift(lf, 0.5, 71, 1.2)
    - strain * 3.1                                   // the wind up, away from the crack
    + settle(lf, S9_CRACK, 4.6, 0.155, 0.105)        // the snap recoil, damped
    + over(lf, S9_LAND, 12, Easing.out(Easing.cubic)) * 2.4   // caught, slumping in
    + settle(lf, S9_LAND + 12, 1.1, 0.07, 0.03);     // and never dead stopping
  const bodyY = idle(lf, 1.5, 88, 0.7) + tremor * 0.8
    + settle(lf, S9_CRACK, 5.2, 0.17, 0.12);
  const bodyX = tremor + drift(lf, 1.1, 126, 2.1);

  const hairline = over(lf, S9_STRAIN + 2, 6) * (1 - over(lf, S9_CRACK, 3));
  const beacon = over(lf, 36, 10);
  const redWash = over(lf, S9_RED, 14) * (0.86 + 0.14 * Math.sin(lf / 5.1));
  const bars = over(lf, 38, 10);
  const dying = ramp(lf, S9_LEAVE, 90);              // slots die right to left
  const neon = 1 - ramp(lf, 78, 90) * 0.55;
  const cavity = overshoot(lf, 64, 12, 0.08);        // the empty box, hinged open past true

  // CALM EVERYTHING ELSE ON THE PAYOFF. The beacon bars and the magenta pool are
  // the noisiest layers in the bay, so they duck for the fourteen frames the
  // crack and the fall need to be legible, then come back for the walk out.
  const calm = 1 - 0.52 * over(lf, S9_STRAIN + 4, 6) * (1 - over(lf, S9_LAND + 6, 8));

  // ---- THE TICKET, printed then burned
  const tT = s9TicketT(lf);
  const tX = s9TicketX(lf);
  const tVX = tX - s9TicketX(lf - 1);                // for the smear ghosts
  const tY = 566 + Easing.out(Easing.cubic)(tT) * 36 + settle(lf, S9_TICKET + 11, 3.4, 0.15, 0.14);
  const burn = over(lf, S9_BURN, 13);
  const readP = over(lf, 42, 4) * (1 - over(lf, 58, 4));
  const wrongPulse = readP * (0.5 + 0.5 * Math.sin(lf / 2.2));

  // ---- THE CUSTOMER. He recoils off the date on the ticket and flinches on the
  // ceramic snap, so cause and effect share a frame both times.
  const cx = s9CustX(lf)
    - Math.max(0, settle(lf, 44, 11, 0.115, 0.125))   // recoils off the wrong date
    - Math.max(0, settle(lf, S9_CRACK + 1, 9, 0.13, 0.13)); // flinches at the crack
  const leaving = over(lf, S9_LEAVE, 18, Easing.out(Easing.cubic));
  const cSize = 104 + leaving * 44;
  const custR = -settle(lf, 44, 4.5, 0.115, 0.125) - settle(lf, S9_CRACK + 1, 3.6, 0.13, 0.13);

  // ---- THE BEACON HOUSING. It winds UP a touch before it drops, lands past its
  // rest and swings on the cable for the rest of the scene.
  const drop = Math.max(0, antic(lf, S9_DROP - 2, 12, 0.13, Easing.out(Easing.back(1.6))));
  const swing = settle(lf, S9_DROP + 10, 9, 0.11, 0.07) + idle(lf, 1.9, 62) + drift(lf, 1.1, 97, 0.4);

  return (
    <>
      <Cam x={camX} y={camY} z={camZ}>
        <Street
            gekko={0}
          lf={lf}
          booth={[1, 1, 1, 1]}
          board={[8, 7, 7, 6]}
          lit={[1, 1, 1, 1]}
          sign={[0, 0, 0, 0]}
          bracket={[1, 1, 1, 1]}
          plaque={[1, 1, 1, 1]}
          lamp={[1, 1, 1, 1]}
          tubes={4}
          tills={4}
          brackets={4}
          rain={1}
          lamps={1}
          rival={neon}
          rivalTickets={8}
          rivalDying={dying}
          rivalBooth={0}
          rivalMask={0}
          rivalBeacon={beacon}
          rivalSharp={1}
          rivalDoorProp={1}
          redWash={redWash}
          fill="#8FA9C6"
          pigeonAt={400}
          drainGlint={0.5}
        >
          {/* ---- THE BEACON HOUSING coming DOWN the cable before it ever turns.
               A cheap submarine alarm bolted to a shopfront on a bit of wire.
               It winds up 13 percent, drops past its rest and then swings for
               the rest of the scene, so the cable is never a rigid stick. ---- */}
          {/* world y 214 down to 330: at RIVAL that is panel y 96 to 217, and at
              the f68 snap in (camY 156, z 1.34) it is panel y 78 to 233, so the
              housing itself stays IN the panel for the whole scene. At the old
              world y 146 it fell off the top edge the moment the camera snapped. */}
          {lf >= S9_DROP - 2 && (
            <div style={{
              position: "absolute", left: 2652, top: 214, width: 4, height: 4, zIndex: 28,
              transformOrigin: "50% -5400%", transform: `rotate(${swing * 0.16}deg)`,
            }}>
              <div style={{ position: "absolute", left: -20, top: drop * 116, width: 44, height: 30 }}>
                <div style={{ position: "absolute", left: 20, top: -220, width: 3, height: 222, background: "#1A1218" }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: 40, height: 26, borderRadius: "8px 8px 3px 3px", background: "#5A1A1A", border: "2px solid #2A0E0E", boxShadow: "0 6px 14px rgba(6,8,14,0.6)", transformOrigin: "50% 0%", transform: `scaleY(${squash(lf, S9_DROP + 9, 0.2, 3).sy.toFixed(3)}) scaleX(${squash(lf, S9_DROP + 9, 0.2, 3).sx.toFixed(3)})` }} />
                <div style={{ position: "absolute", left: 6, top: 5, width: 28, height: 8, borderRadius: 4, background: RED, opacity: 0.35 + beacon * 0.55 * (0.5 + 0.5 * Math.sin(lf / 2.6)) }} />
                <div style={{ position: "absolute", left: 2, top: 24, width: 36, height: 5, borderRadius: 2, background: "#2A0E0E" }} />
              </div>
            </div>
          )}

          {/* ---- THE CHEAP KNOCKOFF BOOTH. No brass rails lantern, no ALWAYS ON
               plate, and a BARE BOLT HOLE where a plaque should have gone. ---- */}
          <Booth
            lf={lf} x={S9_BX} y={S9_BY} build={1} lit={0.42} lantern={0}
            plate={0} bolthole={1} plaque={0} grille={grille} hue={RIVALMAG} z={17}
          >
            {/* what is actually inside: nothing. A bare hook and one cut wire. */}
            {cavity > 0.02 && (
              <>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#07090D,#04060A)", opacity: 0.62 * Math.min(1, cavity) }} />
                <div style={{ position: "absolute", left: 30, top: 22, width: 16, height: 5, borderRadius: 3, background: "#2E3038", opacity: Math.min(1, cavity) }} />
                <div style={{ position: "absolute", left: 36, top: 26, width: 3, height: 40, background: "#23262D", opacity: Math.min(1, cavity), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 6.4) * 9 + settle(lf, 64, 11, 0.13, 0.09)}deg)` }} />
                <div style={{ position: "absolute", left: 33, top: 64, width: 9, height: 6, borderRadius: 2, background: "#3A2A12", opacity: Math.min(1, cavity), transformOrigin: "50% -640%", transform: `rotate(${Math.sin(lf / 6.4) * 9 + settle(lf, 64, 11, 0.13, 0.09)}deg)` }} />
              </>
            )}
          </Booth>

          {/* the empty cavity behind the grille, and the grille face hinging open */}
          {cavity > 0.02 && (
            <div style={{ position: "absolute", left: S9_GR.x, top: S9_GR.y, width: S9_GR.w, height: S9_GR.h, zIndex: 20 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "radial-gradient(ellipse at 50% 30%, #12161E, #04060A 70%)", boxShadow: "inset 0 3px 10px rgba(0,0,0,0.95)", opacity: Math.min(1, cavity) }} />
              {/* two cut wires hanging in an empty box, swinging out of phase */}
              <div style={{ position: "absolute", left: 24, top: 3, width: 3, height: 20, background: "#2C3038", opacity: Math.min(1, cavity), transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 5.6) * 13 + settle(lf, 66, 15, 0.15, 0.1)}deg)` }} />
              <div style={{ position: "absolute", left: 20, top: 6, width: 4, height: 26, background: "#23262D", opacity: Math.min(1, cavity) * 0.8, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 7.1 + 1) * 10 + settle(lf, 68, 12, 0.13, 0.09)}deg)` }} />
              {/* the brass face, hinged open on the left, showing there is nobody */}
              <div style={{
                position: "absolute", left: 0, top: 0, width: S9_GR.w, height: S9_GR.h, borderRadius: 4,
                background: grad("#BC9C3C", "#6A5314"), border: "2px solid #4E3C0C",
                transformOrigin: "0% 50%", transform: `perspective(220px) rotateY(${-86 * cavity}deg)`,
                boxShadow: "0 4px 10px rgba(6,8,14,0.6)",
              }}>
                {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 6, top: 4 + i * 6, width: 40, height: 3, borderRadius: 2, background: "#4E3C0C" }} />)}
              </div>
            </div>
          )}

          {/* ---- THE RED NO PLATE CHIP, hung off the booth on a leader wire and
               pointing at the bare bolt hole. Three words is the whole caption
               budget of this scene and one of them is a hole. It takes a knock
               from the ceramic snap and swings on its wire afterwards. ---- */}
          <div style={{ position: "absolute", left: 2842, top: 356, width: 130, height: 60, zIndex: 27 }}>
            <div style={{ position: "absolute", left: 0, top: 46, width: 34, height: 2, background: RED, opacity: 0.6, transform: "rotate(22deg)", transformOrigin: "0 50%" }} />
            <div style={{
              position: "absolute", left: 16, top: 4, padding: "4px 11px", borderRadius: 5,
              background: "rgba(28,10,12,0.86)", border: `2px solid ${RED}`,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.12em",
              color: "#F6D8D2", whiteSpace: "nowrap", transformOrigin: "8% 0%",
              transform: `translateY(${Math.sin(lf / 15) * 1.8 + settle(lf, S9_CRACK, 4, 0.16, 0.11)}px) rotate(${-2 + Math.sin(lf / 21) * 1.2 + settle(lf, S9_CRACK, 7, 0.13, 0.08)}deg)`,
              boxShadow: "0 6px 14px rgba(6,8,14,0.55)",
            }}>NO PLATE</div>
          </div>

          {/* ---- NOBODY HOME. Solid, shadowed, zero dust, no pole raised. He is
               not flipping anything: every bracket on the row is locked. He is
               standing at a booth pretending to be a person, and this is the
               only scene where he tries to be one. His eyes are never shown,
               not on the crack and not on the fall.
               The wrapper carries all of his weight work: a permanent sway, the
               eight frame lean back before the ceramic goes, the recoil on the
               snap, and the slump after. Nothing here gives him agency: he does
               not touch, block or reach. He only stands and gets found out. ---- */}
          <div style={{
            position: "absolute", left: 0, top: 0, zIndex: 24,
            transformOrigin: `${S9_VX}px ${S9_VY}px`,
            transform: `translate(${bodyX.toFixed(2)}px, ${bodyY.toFixed(2)}px) rotate(${bodyR.toFixed(3)}deg)`,
          }}>
            <Nobody
              lf={lf} x={S9_VX} y={S9_VY} size={S9_VS}
              solid={1} dust={0} tally={1} count={12} pole={0}
              mask={maskV} tilt={tilt} tick={0} z={24}
            />
          </div>

          {/* THE HAIRLINE, eight frames of it. It grows DOWN the face, jitters,
              and throws a bright chip of light on the last two frames before the
              ceramic lets go, so the snap is never a surprise cut. */}
          {hairline > 0.02 && (
            <div style={{
              position: "absolute", left: 2703 + Math.sin(lf * 3.7) * 0.8, top: 447, width: 3, height: 42,
              zIndex: 31, opacity: Math.min(1, hairline * 1.4),
              transformOrigin: "50% 0%", transform: `scaleY(${(0.25 + hairline * 0.75).toFixed(3)})`,
            }}>
              <div style={{ position: "absolute", left: 1, top: 0, width: 1.5, height: 42, background: "#F6EEE2" }} />
              <div style={{ position: "absolute", left: 0, top: 12, width: 3, height: 42, background: "rgba(20,14,10,0.8)", transform: "rotate(6deg)" }} />
              {/* two short branch fractures, staggered, so it spiders */}
              {[0, 1].map((i) => (
                <div key={"br" + i} style={{
                  position: "absolute", left: 1, top: 10 + i * 18, width: 1.5,
                  height: 16 * over(lf, S9_STRAIN + 4 + stagger(i, 2), 4),
                  background: "#E8DCCA", transformOrigin: "50% 0%",
                  transform: `rotate(${i ? 52 : -46}deg)`,
                }} />
              ))}
            </div>
          )}

          {/* the ceramic chips and the shock ring at the snap itself. This is the
              harshest transient in the reel and it now disturbs the world. */}
          <S9Ring lf={lf} at={S9_CRACK} x={2706} y={508} r={124} dur={15} hue="rgba(232,220,200,0.34)" z={32} o={0.7} />
          <Debris lf={lf} at={S9_CRACK} x={2706} y={470} n={9} spread={150} rise={54} hue="#8A5A3A" sd={9} z={33} />
          <Sparkles lf={lf} at={S9_CRACK} x={2706} y={470} n={8} spread={110} rise={62} hue="#E8DCCA" sd={4} z={34} o={0.8} />
          {lf >= S9_CRACK && lf < S9_CRACK + 18 && Array.from({ length: 14 }, (_, i) => {
            const s = seed(i * 3.31 + 71);
            const p = (lf - S9_CRACK - stagger(i, 0.5)) / 18;
            if (p <= 0 || p >= 1) return null;
            return (
              <div key={"cd" + i} style={{
                position: "absolute", left: 2704 + (s - 0.5) * 90 * Math.pow(p, 0.7), top: 462 + p * p * 74 + s * 18,
                width: vary(i, 5, 0.5) + s * 4, height: vary(i, 5, 0.5) + s * 4, borderRadius: "50%", background: "#C9BFAE",
                opacity: (1 - p) * 0.5, filter: "blur(1.4px)", zIndex: 32,
              }} />
            );
          })}

          {/* THE TWO HALVES on the wet pavement. They arrive on their own frames
              (two apart), each rebounds off the stone, squashes on contact,
              keeps tumbling out of its fall, and then rocks forever. They also
              slide 18px toward each other over the fourteen frames after they
              land, so the pair reads as ONE broken face rather than two tiles. */}
          {cracked > 0 && S9_HALVES.map((h, i) => {
            const at = S9_LAND + i * 2;
            const bl = lf - at;
            const rock = Math.sin(bl / 3.4 + i * 1.7) * vary(i, 7, 0.25) * Math.max(0.25, 1 - bl / 22);
            const set = Math.min(1, Math.max(0, bl) / 8);
            // the rebound: 0 on the contact frame so the handoff is seamless,
            // then a real hop, then decaying chatter that never fully stops
            const hop = Math.max(0, settle(lf, at, 17, 0.135, 0.16));
            const spin = settle(lf, at, 24, 0.10, 0.13);
            const sq = squash(lf, at, 0.30, 3);
            const slide = (h.side === 0 ? 1 : -1) * over(lf, at, 14, Easing.out(Easing.cubic)) * 27;
            return (
              <React.Fragment key={"hf" + i}>
                <S9Ring lf={lf} at={at} x={h.x + 22} y={h.y + 40} r={vary(i, 150, 0.2)} dur={17} hue="rgba(226,220,204,0.5)" z={24} />
                <Debris lf={lf} at={at} x={h.x + 22} y={h.y + 38} n={6} spread={120} rise={38} hue="#8A5A3A" sd={i * 7 + 2} z={25} />
                <div style={{
                  position: "absolute", left: h.x + slide, top: h.y + set * 4 - hop, width: 44.2, height: 41.1, zIndex: 26,
                  transformOrigin: "50% 100%",
                  transform: `rotate(${(h.r + rock + spin).toFixed(2)}deg) scale(${sq.sx.toFixed(3)}, ${sq.sy.toFixed(3)})`,
                }}>
                  <div style={{
                    position: "absolute", inset: 0, background: "#C98A62", border: "2px solid #8A5A3A",
                    borderRadius: h.side === 0 ? "20px 0 0 20px" : "0 20px 20px 0",
                    boxShadow: "0 5px 11px rgba(6,8,14,0.6)",
                  }} />
                  <div style={{ position: "absolute", left: h.side === 0 ? 17 : 12, top: 12, width: 12, height: 5, background: "#2A1C14" }} />
                  <div style={{ position: "absolute", left: h.side === 0 ? 14 : 5, top: 27, width: 23, height: 5, borderRadius: 3, background: "#2A1C14" }} />
                  {/* the fresh broken edge, raw clay */}
                  <div style={{ position: "absolute", left: h.side === 0 ? 40 : 0, top: 0, width: 4, height: 41, background: "#8A5A3A" }} />
                </div>
              </React.Fragment>
            );
          })}

          {/* ---- THE CUSTOMER. A gushing main, a coin, and eighteen seconds of
               believing somebody picked up. He does not go next door. ---- */}
          <div style={{
            position: "absolute", left: 0, top: 0, zIndex: 25,
            filter: leaving > 0.5 ? `blur(${(leaving - 0.5) * 5}px)` : "none",
            transformOrigin: `${S9_CX}px 660px`,
            transform: `rotate(${custR.toFixed(3)}deg) translateY(${idle(lf, 1.2, 74, 2.2).toFixed(2)}px)`,
          }}>
            <Customer
              lf={lf} x={cx} y={660} scarf={2} prop="main"
              coin={tT >= 1 ? 0 : 1} walk={lf >= S9_LEAVE ? -1 : 1}
              size={cSize} z={25} read={readP}
            />
          </div>

          {/* ---- THE GREEN TICKET. It sucks back into the chute for two frames,
               then FIRES out of the booth's base and travels along BELOW his
               feet line so it crosses nobody. Three grey day blocks, the third
               ringed: three days out, zero numerals. It smears while it is
               moving 20px a frame, overshoots its stop and rocks. Then it takes
               light in his hand and curls to nothing. ---- */}
          {tT > 0 && burn < 1 && (
            <div style={{
              position: "absolute", left: tX, top: tY, width: 48, height: 30, zIndex: 26,
              transformOrigin: "0% 100%",
              transform: `rotate(${(-6 + tT * 10 + burn * 26 + settle(lf, S9_TICKET + 11, 7, 0.14, 0.13)).toFixed(2)}deg) skewX(${burn * 16}deg)`,
            }}>
              <Smear dx={tVX} dy={0} ghosts={3} o={0.26} stretch={1.22}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 48 * (1 - burn * 0.94), height: 30, borderRadius: 2, background: grad("#54B389", "#2E7A5A"), border: "2px solid #1E5A42", boxShadow: "0 3px 7px rgba(6,8,14,0.5)", overflow: "hidden" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      position: "absolute", left: 6 + i * 13, top: 9, width: 10, height: 13, borderRadius: 2,
                      background: i === 2 ? "#E6EFE8" : "rgba(16,40,30,0.55)",
                      border: i === 2 ? `2px solid ${RED}` : "none",
                      // the ringed block is the whole wrong answer, so it breathes
                      // while he is reading it and is still while he is not
                      transform: i === 2 ? `scale(${(1 + wrongPulse * 0.16).toFixed(3)})` : "none",
                    }} />
                  ))}
                </div>
              </Smear>
              {/* the ember front eating it right to left, and the smoke off it */}
              {burn > 0.02 && burn < 1 && (
                <>
                  <div style={{ position: "absolute", left: 48 * (1 - burn * 0.94) - 5, top: -2, width: 8, height: 34, background: "linear-gradient(180deg,#FFD489,#C4441E)", filter: "blur(2px)", opacity: 0.9 }} />
                  <div style={{ position: "absolute", left: 48 * (1 - burn * 0.94) - 3, top: 2, width: 4, height: 26, background: "#FFF0C6", filter: "blur(1px)", opacity: 0.8 * (0.6 + 0.4 * Math.sin(lf * 1.7)) }} />
                  {Array.from({ length: 6 }, (_, i) => {
                    const s = seed(i * 5.7 + 13);
                    const p = ((lf * 1.6 + i * 9) % 26) / 26;
                    return <div key={"sm" + i} style={{ position: "absolute", left: 48 * (1 - burn * 0.94) - 6 + (s - 0.5) * 22, top: -p * 46, width: 8 + s * 7, height: 8 + s * 7, borderRadius: "50%", background: "rgba(150,142,130,0.34)", opacity: (1 - p) * 0.7, filter: "blur(3px)" }} />;
                  })}
                </>
              )}
            </div>
          )}

          {/* the scene's own pigeon chevron, high and clear of every figure */}
          {/* world y 320 puts it at panel y ~207 at RIVAL and ~220 after the snap
              in. At the old y 60 it sat above the top edge at BOTH cameras and
              never rendered a single frame, which breaks the chevron ruling.
              x0 2050 starts it off the left edge instead of popping in at x 42. */}
          <Pigeon lf={lf} y={320} at={16} dur={94} x0={2050} x1={3120} o={0.6} z={26} />

          {/* one more layer of wet: the booth's warm-less pool on the pavement.
               A cheap booth throws a weak, cold, magenta smear. Not a warm pool.
               It ducks with everything else while the mask is coming apart. */}
          <div style={{
            position: "absolute", left: 2680, top: 600, width: 300, height: 68, zIndex: 6,
            background: `radial-gradient(ellipse at 50% 0%, ${RIVALMAG}, transparent 68%)`,
            opacity: 0.2 * neon * calm, filter: "blur(20px)", mixBlendMode: "screen", pointerEvents: "none",
            transform: `scaleX(${1 + Math.sin(lf / 26) * 0.03}) scaleY(${breathe(lf, 0.05, 61).toFixed(3)})`,
          }} />
        </Street>
      </Cam>

      {/* ================== PANEL SPACE, outside the camera ================== */}

      {/* THE WHIP. Nine horizontal smear bars plus a directional dark drag,
          at full strength on frame 0 and gone by f14. */}
      {lf < 14 && Array.from({ length: 9 }, (_, i) => {
        const s = seed(i * 4.7 + 3);
        const o = Math.max(0, 1 - (lf + stagger(i, 0.4)) / 13);
        return (
          <div key={"wh" + i} style={{
            position: "absolute", left: -60, top: 90 + i * 86 + s * 40, width: 1140, height: 16 + s * 34,
            background: `linear-gradient(90deg, transparent, rgba(226,236,255,${0.1 + s * 0.12}), transparent)`,
            filter: "blur(7px)", opacity: o, mixBlendMode: "screen", zIndex: 52, pointerEvents: "none",
            transform: `translateX(${(-o * vary(i, 90, 0.4)).toFixed(1)}px)`,
          }} />
        );
      })}
      {lf < 16 && <SpeedLines lf={lf} x={-40} y={40} w={1100} h={720} n={14} on={Math.max(0, 1 - lf / 15) * 0.8} z={52} sd={11} />}
      {lf < 14 && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 53, pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(6,8,14,0.62), transparent 34%, transparent 66%, rgba(6,8,14,0.5))",
          opacity: Math.max(0, 1 - lf / 12),
        }} />
      )}

      {/* THE STRIPED SHADOW BARS the beacon throws across the whole bay, rotating
          slowly. A light layer, in the same class as the drizzle, and it ducks
          out of the way of the crack so the payoff is the loudest thing. */}
      {bars > 0.02 && (
        <>
          <div style={{
            position: "absolute", inset: -260, zIndex: 50, pointerEvents: "none",
            background: `repeating-linear-gradient(${18 + lf * 2.1}deg, rgba(6,8,14,0.4) 0 34px, transparent 34px 84px)`,
            opacity: 0.36 * bars * calm,
          }} />
          <div style={{
            position: "absolute", inset: -260, zIndex: 51, pointerEvents: "none", mixBlendMode: "screen",
            background: `conic-gradient(from ${lf * 7}deg at 62% 46%, ${RED}66, transparent 22%, transparent 78%, ${RED}66)`,
            opacity: 0.24 * bars * calm, filter: "blur(16px)",
          }} />
        </>
      )}

      {/* THE HARD RED KEY. The reel's only red frame, and it is made of light. */}
      <GelWash x={520} y={420} w={1220} h={980} color={RED} o={0.3 * redWash} z={49} blur={86} />
      <GelWash x={760} y={300} w={620} h={560} color="#8E2A22" o={0.2 * redWash} z={49} blur={70} />

      {/* ================= THE FRAME THAT SAYS "FAKE FACE" =================
          At 60px on wet tarmac, two clay tiles do not read as a mask. So the two
          halves ALSO sweep the lens in the foreground at 250px, painted eye and
          mouth clearly on them, raw broken edge inboard, on parabolic arcs with
          real rotation and a motion smear. Storyboard FORE layer, blur(2px).
          They are staggered two frames apart and they are gone by f84, well
          clear of the walk out. */}
      {[0, 1].map((i) => {
        // they start FOUR frames after the snap, so the split on his actual face
        // is legible first and the lens pass reads as the same object arriving
        const st = S9_CRACK + 4 + stagger(i, 2);
        const dur = varyDur(i, 23, 0.1);
        const t = (lf - st) / dur;
        if (t <= 0 || t >= 1) return null;
        const side = i === 0 ? -1 : 1;
        const px = arcX(lf, st, dur, 470 + side * 30, 470 + side * 470);
        const py = arcY(lf, st, dur, 236, 54, 940);
        // it barely turns while it is still legible, then tumbles as it exits
        const rot = side * (8 + Math.pow(over(lf, st, dur, Easing.linear), 1.7) * 118);
        const w = 224, hgt = 208;
        const vx = px - arcX(lf - 1, st, dur, 470 + side * 30, 470 + side * 470);
        const vy = py - arcY(lf - 1, st, dur, 236, 54, 940);
        return (
          <div key={"fg" + i} style={{
            position: "absolute", left: px - w / 2, top: py - hgt / 2, width: w, height: hgt,
            zIndex: 56, pointerEvents: "none", filter: "blur(1.6px)",
            opacity: Math.min(1, t * 7) * (1 - Math.max(0, (t - 0.84) / 0.16)),
            transform: `rotate(${rot.toFixed(1)}deg)`, transformOrigin: "50% 50%",
          }}>
            <Smear dx={vx} dy={vy} ghosts={3} o={0.22} stretch={1.16}>
              {/* NOTE: Smear's ghost wrapper is a zero size absolute div, so any
                  child using `inset: 0` collapses to nothing and only the sized
                  rects survive. Everything below carries explicit width/height. */}
              <div style={{ position: "absolute", left: 0, top: 0, width: w, height: hgt }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, width: w, height: hgt, boxSizing: "border-box",
                  background: "linear-gradient(150deg,#DFA073,#B8774E)", border: "7px solid #8A5A3A",
                  borderRadius: side < 0 ? "102px 0 0 102px" : "0 102px 102px 0",
                  boxShadow: "0 16px 34px rgba(6,8,14,0.6)",
                }} />
                {/* the painted brow, eye and mouth. This is the whole point: a
                    stranger must see a FACE come apart, not a falling brick. */}
                <div style={{ position: "absolute", left: side < 0 ? 78 : 49, top: 41, width: 71, height: 11, borderRadius: 6, background: "#2A1C14", opacity: 0.85 }} />
                <div style={{ position: "absolute", left: side < 0 ? 81 : 53, top: 65, width: 64, height: 27, borderRadius: 4, background: "#2A1C14" }} />
                <div style={{ position: "absolute", left: side < 0 ? 56 : 14, top: 138, width: 137, height: 24, borderRadius: 12, background: "#2A1C14" }} />
                {/* the fresh raw broken edge, on the inboard side */}
                <div style={{ position: "absolute", left: side < 0 ? 205 : 0, top: 0, width: 19, height: hgt, background: "#7C4E30" }} />
                <div style={{ position: "absolute", left: side < 0 ? 201 : 5, top: 0, width: 5, height: hgt, background: "#F0DCC2", opacity: 0.55 }} />
              </div>
            </Smear>
          </div>
        );
      })}

      {/* THE ASH. Foreground lens depth, drifting down past everything, and it
          is still falling on the last frame of the scene. */}
      {lf >= S9_BURN + 2 && Array.from({ length: 24 }, (_, i) => {
        const s = seed(i * 2.93 + 47);
        const born = S9_BURN + 2 + s * 16;
        if (lf < born) return null;
        const bl = lf - born;
        const near = s > 0.72;
        const y = 300 + bl * (2.1 + s * 3.2);
        if (y > 830) return null;
        return (
          <div key={"as" + i} style={{
            position: "absolute", left: 380 + (s - 0.5) * 430 + Math.sin(bl / (9 + s * 8) + i) * 26 + bl * 0.5,
            top: y, width: near ? 9 + s * 7 : 5 + s * 5, height: near ? 7 + s * 5 : 4 + s * 4,
            borderRadius: 2, background: s > 0.86 ? "#6E5A4A" : "#8E8B84",
            // fade each fleck up over its first 7 frames: without this all 24 of
            // them pop into existence at panel y 300 out of clear air
            opacity: Math.max(0, 0.62 - bl / 120) * (near ? 0.8 : 1) * Math.min(1, bl / 7),
            filter: `blur(${near ? 3.4 : 2}px)`,
            transform: `rotate(${s * 200 + bl * (2 + s * 4)}deg)`,
            zIndex: 55, pointerEvents: "none",
          }} />
        );
      })}

      {/* foreground rain spatter off the kerb, low in frame, clear of every figure */}
      {Array.from({ length: 12 }, (_, i) => {
        const s = seed(i * 6.1 + 29);
        const p = ((lf * (1.5 + s * 1.4) + s * 60) % 60) / 60;
        return (
          <div key={"sp" + i} style={{
            position: "absolute", left: 60 + s * 880 + p * 26, top: 716 + Math.sin(p * Math.PI) * -34 + p * p * 62,
            width: 4 + s * 4, height: 4 + s * 4, borderRadius: "50%", background: "#CFE0F2",
            opacity: (1 - p) * 0.26, filter: "blur(2.4px)", zIndex: 54, pointerEvents: "none",
          }} />
        );
      })}

      {/* the greyed out safety readout. It went dark the moment the plate was
          missing, and nobody on this stoop noticed. */}
      <HUD lf={lf} text="SAFE" color="#7E848E" o={0.62} />
      <SceneTag f={lf + 30} text="DOWN THE ROAD" color={RED} />
      <Vig o={0.46} />
    </>
  );
};

// ==== part: 20_S10.tsx ====
// ============================================================================
// SCENE 10 , CTA: COMMENT CALLS . 77 frames, lf 0..76. verb: OPEN.
//
// AT FRAME 0 INVENTORY (complete, dressed, mid action, nothing builds in):
//   1  camera already at ROW (z 0.575, camX 100, camY -300), the finished row in
//      frame: three full shopfronts plus a sliver of the fourth, every fascia
//      lit at 1.0, every hanging sign reading OPEN, every sign bracket locked
//   2  four booths built and glowing on four stoops, four awning booking boards
//      already FULL at 8/8 green, four brass tubes live up the brickwork, four
//      brass money bin tills already sitting on the roof parapet
//   3  the plain brass bell already mounted on its bracket above Pipe Bros' door,
//      idling on a slow sway. It is the villain and it is furniture now. There is
//      no Nobody figure, no hook pole, no grey dust anywhere in frame
//   4  a real customer already mid stride on Pipe Bros' pavement, spraying pipe
//      in one nub, brass coin in the other, six frames from the doorway
//   5  Pip already sitting inside the lit Pipe Bros doorway, and nobody points
//      at it
//   6  THE HERO already walking right along the pavement at world 700, greatcoat,
//      pillbox cap, tool belt, till strap and clipboard, arms starting to lift
//   7  rain STOPPED and the street drying, so the always on layer is warm gold
//      embers rising instead of drizzle: four catenary lamp cones flickering out
//      of phase, the arcade ghost chasing pellets in Sparks' glass, Valvotine's
//      oil drip falling, Painless Pete's molar stutter, the road smears and the
//      passing vehicle, puddle reflections rippling as they dry, the pigeon
//      chevron due at f6, a coin glow travelling up tube 0
//   8  Drip Bros' magenta is OFF. No HUD, no SceneTag, no headline in the panel
//   9  OUTSIDE the panel, the CtaLockup already OWNS the lower third at lf 0:
//      brass kerb rail sheening, the COMMENT "CALLS" pill full contrast, the
//      artifact card landed and the padlocked prompt column withheld. Nothing
//      fades in, so the karaoke band is handed over and never goes empty
// ============================================================================

const S10_BELL = 8;                      // the one warm ring the villain ever makes
// each door swings open about six frames BEFORE its customer reaches it, so the
// cause (the door opening) and the effect (a person walking through) share frames
const S10_DOORS = [2, 34, 42, 50];
const S10_TILLS = [30, 34, 38, 42, 58, 62, 66, 70];      // a coin lands in each roof till
const S10_CUSTX = [320, 915, 1475, 2035];// where each customer reaches the door
const S10_CUSTBORN = [-14, 24, 32, 40];  // when each customer starts walking
const S10_ARRIVE = [8, 46, 54, 62];      // born + 22, the frame each one is at the door
const S10_BLUR = 34;                     // the row goes soft so the CTA reads
const S10_HOP = 44;                      // the hero's celebration hop leaves the kerb
const S10_LAND = 57;                     // and lands here, the back half's big beat
const S10_CAMY = -437;                   // anchor RAISED: the row and the pavement fill
                                         // the panel and only a slim dressed band of
                                         // road plus under street brick sits below

// the four boards do a green shimmer wave down the row, three times, and the third
// pass is still travelling at the cut so the row never settles into a still frame
const s10Wave = (lf: number, i: number) => {
  const at = [4, 40, 68];
  let v = 0;
  for (const a of at) v = Math.max(v, Math.max(0, 1 - Math.abs((lf - (a + i * 5)) / 9)));
  return v;
};

// THE LIGHT SURGE. Three waves of extra warmth run down the four shopfronts, each
// one a back eased rise with a damped falloff, staggered and varied per shop, so
// "the whole street is lit" is a thing that keeps HAPPENING rather than a flat 1.0.
// The first wave starts before frame 0, so the row is already mid surge at lf 0.
const S10_SURGE_AT = [-7, 25, 57];
const s10Surge = (lf: number, i: number) => {
  let v = 0;
  for (const a of S10_SURGE_AT) {
    const st = a + stagger(i, 4.4);
    const rise = over(lf, st, varyDur(i, 10, 0.22), Easing.out(Easing.back(2.6)));
    const fall = Math.exp(-Math.max(0, lf - st - 10) / 22);
    v = Math.max(v, Math.max(0, rise * fall));
  }
  return v * (0.86 + 0.14 * flick(lf, 0.5, i));
};

// the bell's angle as a pure function of a frame, so the clapper can LAG it and
// keep swinging after the bell itself has almost stopped
const s10BellAng = (g: number) => {
  const since = g - S10_BELL;
  // the wind up: it pulls back the other way over the five frames before the ring
  const pre = -7 * over(g, S10_BELL - 5, 5, Easing.inOut(Easing.sin)) * (1 - over(g, S10_BELL, 4, Easing.out(Easing.quad)));
  const ring = since >= 0 ? Math.sin(since / 2.35) * 26 * Math.exp(-since / 20) : 0;
  return ring + pre + drift(g, 1.7, 118);
};

// ---------------------------------------------------------------------------
// THE HERO. Doorman greatcoat over the canonical Mascot, drawn after the body.
// S10 is the only scene where he carries nothing and opens both arms.
// ---------------------------------------------------------------------------
const S10Hero: React.FC<{ lf: number; x: number; y?: number; size?: number; z?: number; open?: number; lift?: number }> =
  ({ lf, x, y = 660, size = 230, z = 30, open = 0, lift = 0 }) => {
    const u = size / 200;
    const top = standTop(y, size);
    const bob = Math.sin(lf / 6.2) * 2.2 * u;
    // the crouch before the hop and the squash on the landing, both anchored at his feet
    const crouch = 0.055 * over(lf, S10_HOP - 5, 5, Easing.inOut(Easing.sin)) * (1 - over(lf, S10_HOP, 4, Easing.out(Easing.quad)));
    const sq = squash(lf, S10_LAND, 0.19, 3);
    const sy = sq.sy - crouch;
    const sx = sq.sx + crouch * 0.7;
    // in the air he stretches slightly along the direction of travel
    const air = Math.min(1, lift / 46);
    return (
      <div style={{
        position: "absolute", left: x - size / 2, top: top - bob - lift, width: size, height: size, zIndex: z,
        transform: `scale(${(sx * (1 - air * 0.05)).toFixed(4)}, ${(sy * (1 + air * 0.07)).toFixed(4)})`,
        transformOrigin: "50% 92%",
      }}>
        <CastShadow x={size / 2} y={size * 0.9 + lift} w={size * 0.84 * (1 - air * 0.26)} o={0.34 - air * 0.14} />
        {/* both arms swinging open, drawn BEHIND the body so nothing crosses his face.
            they LAG the body on the hop, so the arms are still rising as he lands */}
        {[0, 1].map((s) => {
          const dir = s === 0 ? -1 : 1;
          const ang = dir * (16 + open * 46 + air * 13) + Math.sin(lf / 7 + s) * 3 + dir * settle(lf, S10_LAND, 7, 0.13, 0.1);
          return (
            <div key={s} style={{
              position: "absolute", left: (s === 0 ? 24 : 148) * u, top: 96 * u, width: 30 * u, height: 74 * u,
              borderRadius: 6, background: "#B85F42", transformOrigin: s === 0 ? "100% 0%" : "0% 0%",
              transform: `rotate(${ang}deg)`, zIndex: 0,
            }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 30 * u, height: 8 * u, background: "#C86D4C" }} />
              <div style={{ position: "absolute", left: 3 * u, top: 58 * u, width: 24 * u, height: 16 * u, borderRadius: 5, background: HERO }} />
            </div>
          );
        })}
        <Mascot lf={lf} size={size} tint={HERO} nodAmp={2.6} nodSpeed={9} cheer={1} gaze={1.6} />
        {/* the greatcoat, gold piping, brass buttons, epaulettes */}
        <div style={{ position: "absolute", left: 32 * u, top: 96 * u, width: 136 * u, height: 78 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 96 * u, top: 96 * u, width: 5 * u, height: 78 * u, background: GOLD, opacity: 0.78 }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 104 * u, top: (106 + i * 20) * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: GOLD }} />)}
        <div style={{ position: "absolute", left: 26 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 134 * u, top: 92 * u, width: 40 * u, height: 11 * u, borderRadius: 2, background: "#A8543A" }} />
        {/* the tool belt of brass door fittings, gained at S3 */}
        <div style={{ position: "absolute", left: 32 * u, top: 152 * u, width: 136 * u, height: 13 * u, background: "#4A3A18" }} />
        {[0, 1, 2, 3].map((i) => <div key={"f" + i} style={{ position: "absolute", left: (42 + i * 30) * u, top: 154 * u, width: 15 * u, height: 20 * u, borderRadius: 2, background: grad("#D5AE44", "#7A5E18") }} />)}
        {/* the cash till on a strap, and the clipboard on the hip, both swinging */}
        <div style={{ position: "absolute", left: 152 * u, top: 96 * u, width: 8 * u, height: 46 * u, background: "#33383F", transform: "rotate(-11deg)" }} />
        <div style={{ position: "absolute", left: 2 * u, top: 132 * u, width: 44 * u, height: 32 * u, borderRadius: 3, background: grad("#C8A02E", "#6E5310"), border: `${2 * u}px solid #4E3C0C`, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 9) * 3 + settle(lf - 2, S10_LAND, 13, 0.12, 0.075) - air * 9}deg)` }}>
          <div style={{ position: "absolute", left: 8 * u, top: 6 * u, width: 26 * u, height: 5 * u, borderRadius: 2, background: "#3A2C08" }} />
        </div>
        <div style={{ position: "absolute", left: 150 * u, top: 128 * u, width: 34 * u, height: 44 * u, borderRadius: 2, background: "#6E6252", border: `${2 * u}px solid #4A4238`, transformOrigin: "50% 0%", transform: `rotate(${5 + Math.sin(lf / 11) * 4.4 + settle(lf - 4, S10_LAND, 15, 0.11, 0.07) - air * 11}deg)` }}>
          <div style={{ position: "absolute", left: 4 * u, top: 5 * u, width: 26 * u, height: 32 * u, background: "#E4DDCC" }} />
          <div style={{ position: "absolute", left: 9 * u, top: -3 * u, width: 16 * u, height: 6 * u, borderRadius: 2, background: "#8A8272" }} />
        </div>
        {/* the bellhop pillbox cap with a small gold C */}
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 27 * u, borderRadius: 3, background: "#8E3F2A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 14 * u, width: 88 * u, height: 5 * u, background: "#A8543A" }} />
        <div style={{ position: "absolute", left: 56 * u, top: 37 * u, width: 88 * u, height: 5 * u, background: GOLD, opacity: 0.84 }} />
        <div style={{ position: "absolute", left: 92 * u, top: 17 * u, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 * u, color: GOLD, lineHeight: 1 }}>C</div>
      </div>
    );
  };

// ---------------------------------------------------------------------------
// THE DEMOTION. A plain brass bell on a bracket above Pipe Bros' door. This is
// all that is left of NOBODY HOME: no figure, no pole, no dust, no tally box.
// It rings ONCE, warmly and on the beat, as a real customer walks in.
// ---------------------------------------------------------------------------
const S10Bell: React.FC<{ lf: number; x: number; y: number; z?: number; s?: number }> = ({ lf, x, y, z = 26, s = 1 }) => {
  const since = lf - S10_BELL;
  const hit = since >= 0 ? Math.max(0, 1 - since / 44) : 0;
  const swing = s10BellAng(lf);
  // the clapper LAGS the bell by two frames and carries the swing's velocity, so it
  // is still knocking about after the bell body has nearly stopped
  const lagAng = s10BellAng(lf - 2);
  const clap = lagAng - swing + (lagAng - s10BellAng(lf - 3)) * 2.6 + drift(lf, 1.4, 96, 0.9);
  return (
    <div style={{ position: "absolute", left: x - 34, top: y, width: 68, height: 74, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 0%" }}>
      {/* the bracket bolted to the brick above the door */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: 30, borderRadius: 2, background: grad("#B08E30", "#5E4A10") }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 52, height: 10, borderRadius: 3, background: grad("#D3AE48", "#7A5E18") }} />
      <div style={{ position: "absolute", left: 3, top: 22, width: 7, height: 7, borderRadius: "50%", background: "#E6C86A" }} />
      {/* the bell itself, hung off the bracket tip */}
      <div style={{ position: "absolute", left: 46, top: 8, width: 0, height: 0, transformOrigin: "50% 0%", transform: `rotate(${swing.toFixed(3)}deg)` }}>
        <div style={{ position: "absolute", left: -3, top: 0, width: 6, height: 12, background: "#7A5E18" }} />
        <div style={{ position: "absolute", left: -24, top: 10, width: 48, height: 38, borderRadius: "24px 24px 7px 7px", background: grad("#EFCC6A", "#8A6A18"), boxShadow: "0 5px 11px rgba(6,8,14,0.55), inset 0 3px 0 rgba(255,248,214,0.45)" }} />
        <div style={{ position: "absolute", left: -28, top: 44, width: 56, height: 10, borderRadius: 4, background: grad("#F2D687", "#9A7418") }} />
        <div style={{ position: "absolute", left: -14, top: 18, width: 12, height: 16, borderRadius: "50%", background: "rgba(255,250,224,0.55)" }} />
        {/* the clapper, swinging on its own phase */}
        <div style={{ position: "absolute", left: -2, top: 44, width: 4, height: 0, transformOrigin: "50% 0%", transform: `rotate(${clap}deg)` }}>
          <div style={{ position: "absolute", left: -2, top: 0, width: 4, height: 14, background: "#6A5314" }} />
          <div style={{ position: "absolute", left: -6, top: 12, width: 12, height: 12, borderRadius: "50%", background: "#7A5E18" }} />
        </div>
      </div>
      {/* the warm ring bloom, a blurred ellipse, never a coloured halo on an edge */}
      {hit > 0.02 && <div style={{ position: "absolute", left: -34, top: -18, width: 140, height: 110, borderRadius: "50%", background: `radial-gradient(circle, ${TUNGSTEN}, transparent 66%)`, opacity: 0.34 * hit, filter: "blur(15px)", mixBlendMode: "screen", pointerEvents: "none" }} />}
      {hit > 0.02 && [0, 1, 2].map((i) => {
        const p = Math.max(0, Math.min(1, (since - i * 6) / 32));
        if (p <= 0 || p >= 1) return null;
        return <div key={i} style={{ position: "absolute", left: 46 - 40 - p * 70, top: 26 - p * 34, width: 80 + p * 140, height: 68 + p * 118, borderRadius: "50%", border: `2px solid ${TUNGSTEN}`, opacity: (1 - p) * 0.45, pointerEvents: "none" }} />;
      })}
    </div>
  );
};

const S10: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA. The one verb left in the ledger: PULL BACK. ROW is held from f0
  // and released at f34, which is the exact window Continuity Editor 8 allows.
  const pull = over(lf, 0, 30, Easing.inOut(Easing.cubic));
  const creep = over(lf, 34, 42, Easing.inOut(Easing.quad));
  // THE CAMERA IS A CHARACTER. Handheld micro noise runs from frame 0 and never
  // stops, and it takes a decaying knock off the bell, off the first coin landing
  // in a roof till, and off the hero's landing.
  const cam = shakeCam(lf, [
    { at: S10_BELL, amp: 2.4, dur: 15 },
    { at: 30, amp: 1.7, dur: 11 },
    { at: S10_LAND, amp: 8.4, dur: 17 },
  ], 1);
  // the pull back is gentled so the frame never re opens the empty ground below
  const camZ = (0.575 - 0.022 * pull - 0.007 * creep) * cam.z;   // a 5% pull back, then a creep
  const camX = 100 + 12 * pull + 8 * creep + cam.x;
  const camY = S10_CAMY + cam.y;
  const breathe2 = 1 + 0.004 * Math.sin(lf / 21);

  // ---- THE FINISHED ROW. Every switch in the reel is now on.
  const dry = 0.7 + 0.3 * over(lf, 0, 50, Easing.out(Easing.cubic));
  // each door swings wide with a real overshoot and then keeps rocking on its
  // hinge, staggered down the row. None of them dead stops on its target.
  const doorOpen = [0, 1, 2, 3].map((i) => {
    const st = S10_DOORS[i];
    const o = overshoot(lf, st, varyDur(i, 15, 0.18), 0.11);
    return Math.max(0, Math.min(1.06, o + settle(lf, st + 16, 0.05, 0.09, 0.045)));
  });
  // the four tills take a coin each and rock, right after the doors start opening
  const tillRock = S10_TILLS.reduce((a, t) => Math.max(a, Math.max(0, 1 - Math.abs(lf - t) / 11)), 0);
  const tubeCoin = ((lf * 0.019 + 0.15) % 1);
  const soft = 1.5 * over(lf, S10_BLUR, 16, Easing.out(Easing.cubic));

  // ---- THE HERO, walking right along the pavement and opening both arms, then
  // hopping off the kerb in celebration at f44 and landing hard at f57, which is
  // the one big weighted beat in the back half of the scene.
  // he walks the clear lane between Pip's doorway (world 431) and Sparks' customer
  // (world 763), so no figure is ever born or dragged behind his 230px body.
  const heroX = 560 + 76 * over(lf, 0, 40, Easing.out(Easing.cubic)) + 16 * over(lf, 44, 30, Easing.inOut(Easing.quad));
  const heroLift = -arcY(lf, S10_HOP, 13, 0, 46, 0);   // parabolic, zero outside the hop
  const heroOpen = over(lf, 18, 16, Easing.out(Easing.back(2.1)))
    + 0.2 * Math.max(0, settle(lf, S10_LAND, 1, 0.12, 0.085));

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, filter: soft > 0.02 ? `blur(${soft}px)` : "none" }}>
        <Cam x={camX} y={camY} z={camZ * breathe2}>
          <Street
            lf={lf}
            booth={1}
            board={8}
            lit={1}
            sign={0}
            bracket={1}
            plaque={1}
            lamp={1}
            doorOpen={doorOpen}
            tubes={4}
            tubeCoin={tubeCoin}
            tills={4}
            tillRock={tillRock}
            tillTag="$300 / MO"
            brackets={4}
            rain={0}
            dry={dry}
            lamps={1}
            rival={0}
            pigeonY={-236}
            pigeonAt={6}
            fore={1}
          >
            {/* ---- THE LIGHT SURGE. Three waves of extra warmth run down the four
                 shopfronts, staggered and varied, each one a back eased rise into a
                 damped falloff. The row is ALREADY mid surge at lf 0 and the third
                 wave is still travelling at the cut, so "the whole street is lit"
                 keeps reading as an event instead of a flat fill. ---- */}
            {SHOPS.map((sh, i) => {
              const g = s10Surge(lf, i);
              if (g < 0.015) return null;
              return (
                <React.Fragment key={"sg" + i}>
                  {/* the shopfront glass and doorway going brighter */}
                  <div style={{
                    position: "absolute", left: sh.x + OFF_FASCIA, top: W_FACE - 6, width: SHOP_W - 20, height: 232,
                    background: `radial-gradient(ellipse 62% 58% at 50% 62%, ${TUNGSTEN}, transparent 72%)`,
                    opacity: 0.3 * g, filter: "blur(16px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 3,
                  }} />
                  {/* the fascia name catching it a couple of frames later */}
                  <div style={{
                    position: "absolute", left: sh.x + OFF_FASCIA, top: W_FASCIA - 4, width: SHOP_W - 20, height: 62,
                    background: `linear-gradient(90deg, transparent, ${TUNGSTEN}, transparent)`,
                    opacity: 0.26 * s10Surge(lf - 3, i), filter: "blur(11px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 3,
                  }} />
                  {/* and the warm spill hitting the pavement in front of that shop */}
                  <div style={{
                    position: "absolute", left: sh.x + OFF_FASCIA, top: W_PAVE - 22, width: SHOP_W - 20, height: 74,
                    background: `radial-gradient(ellipse 54% 62% at 50% 40%, #F8DCA6, transparent 70%)`,
                    opacity: 0.24 * s10Surge(lf - 5, i), filter: "blur(18px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 7,
                  }} />
                </React.Fragment>
              );
            })}

            {/* ---- THE GREEN SHIMMER WAVE. Four full boards catch the light one
                 after another down the row, twice, so 8/8 keeps moving. ---- */}
            {SHOPS.map((sh, i) => {
              const w = s10Wave(lf, i);
              if (w < 0.02) return null;
              return (
                <div key={"bw" + i} style={{ position: "absolute", left: sh.x + OFF_FASCIA + 34, top: W_BOARD - 8, width: SHOP_W - 110, height: 40, zIndex: 2, pointerEvents: "none" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`, opacity: 0.4 * w, filter: "blur(9px)", mixBlendMode: "screen" }} />
                </div>
              );
            })}

            {/* ---- THE FOUR STOOPS' JOINED WARM POOL. Every door is open and the
                 pavement carries one continuous band of light down the row. ---- */}
            <div style={{
              position: "absolute", left: 150, top: 594, width: 2160, height: 88,
              background: `linear-gradient(90deg, transparent, ${TUNGSTEN} 14%, #F8DCA6 52%, ${TUNGSTEN} 86%, transparent)`,
              opacity: 0.32 + 0.07 * Math.sin(lf / 12) + 0.05 * Math.sin(lf / 7.3 + 1.2),
              filter: "blur(24px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 1,
              transform: `translateY(${idle(lf, 2.6, 74).toFixed(2)}px)`,
            }} />
            {/* two bright bands sliding along that pool at different speeds, so the
                pavement light is always moving even between the staged beats */}
            {[0, 1].map((i) => {
              const p = ((lf * (0.011 + i * 0.005) + i * 0.47 + 0.2) % 1);
              return (
                <div key={"pl" + i} style={{
                  position: "absolute", left: 60 + p * 2260, top: 588 + i * 10, width: 460 - i * 130, height: 78,
                  background: `linear-gradient(90deg, transparent, #FBE4B4, transparent)`,
                  opacity: (0.22 - i * 0.07) * (0.7 + 0.3 * Math.sin(lf / 9 + i * 2)),
                  filter: "blur(22px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 1,
                }} />
              );
            })}

            {/* ---- THE DEMOTED VILLAIN. A plain brass bell over Pipe Bros' door. ---- */}
            <S10Bell lf={lf} x={doorX(0)} y={300} z={26} s={1.45} />

            {/* ---- PIP, sitting inside the lit doorway. The only appreciation in
                 the reel, and nobody points at it. ---- */}
            <Pip lf={lf} x={392} y={648} size={78} sit={1} look={0.6} z={20} />

            {/* ---- FOUR REAL CUSTOMERS WALKING IN. The turnaround never fires
                 again: every one of them reaches a door and goes through it. ---- */}
            {[0, 1, 2, 3].map((i) => {
              const born = S10_CUSTBORN[i];
              const walk = Math.max(0, Math.min(1, (lf - born) / 22));
              const gone = Math.max(0, Math.min(1, (lf - (born + 24)) / 12));
              if (gone >= 1) return null;
              // he keeps walking THROUGH the doorway as he goes, rising up the stoop
              // and shrinking into the light, so he is never an opacity step
              const x = S10_CUSTX[i] - 96 + Easing.out(Easing.cubic)(walk) * 96
                + Easing.in(Easing.quad)(gone) * 30;
              const props: PropKind[] = ["pipe", "cable", "molar", "rad"];
              return (
                <div key={"cu" + i} style={{
                  position: "absolute", left: 0, top: -Easing.out(Easing.quad)(gone) * 16,
                  opacity: 1 - gone * gone, transform: `scale(${1 - gone * 0.3})`,
                  transformOrigin: `${x}px 660px`, zIndex: 21,
                }}>
                  <Customer lf={lf} x={x} y={660} scarf={i} prop={props[i]} coin={1} walk={1} size={112} z={21} />
                </div>
              );
            })}

            {/* ---- FOUR DOORWAY FLARES. The doorway visibly takes each customer:
                 the light behind the door blooms, a warm ring pushes out across the
                 stoop and a few gold sparks lift, on the exact frame he steps in, so
                 the cause and the effect are never in different frames. ---- */}
            {S10_ARRIVE.map((at, i) => {
              const p = (lf - at) / 26;
              const dx = doorX(i);
              return (
                <React.Fragment key={"df" + i}>
                  {p > 0 && p < 1 && (
                    <div style={{
                      position: "absolute", left: dx - 130, top: W_FACE + 20, width: 260, height: 300,
                      background: `radial-gradient(ellipse 50% 56% at 50% 62%, #FBE4B4, transparent 70%)`,
                      opacity: 0.46 * Math.sin(Math.min(1, Math.max(0, p)) * Math.PI), filter: "blur(15px)",
                      mixBlendMode: "screen", pointerEvents: "none", zIndex: 8,
                    }} />
                  )}
                  <GroundRing lf={lf} at={at} x={dx} y={W_PAVE + 44} r={190} dur={22} hue="rgba(248,220,166,0.5)" z={9} />
                  <Sparkles lf={lf} at={at + 1} x={dx} y={W_PAVE + 20} n={7} spread={90} rise={64} hue="#F6DC98" sd={i * 3 + 11} z={22} o={0.85} />
                </React.Fragment>
              );
            })}

            {/* ---- THE HERO. Arms open, no props, in front of the finished row. ---- */}
            <S10Hero lf={lf} x={heroX} y={660} size={230} open={heroOpen} lift={heroLift} z={30} />
            {/* the landing disturbs the world: a warm ring across the pavement and a
                scatter of gold. No dust, because S10 has zero dust anywhere. */}
            <GroundRing lf={lf} at={S10_LAND} x={heroX} y={664} r={250} dur={20} hue="rgba(248,220,166,0.55)" z={19} />
            <GroundRing lf={lf} at={S10_LAND + 3} x={heroX} y={664} r={160} dur={26} hue="rgba(248,220,166,0.4)" z={19} o={0.6} />
            <Sparkles lf={lf} at={S10_LAND} x={heroX} y={656} n={11} spread={150} rise={82} hue="#F6DC98" sd={41} z={32} />
            {/* he never stops: the till strap and coat keep swinging, and the last
                16px of drift runs to f74, one frame before the cut */}

            {/* ---- FOUR GOLD COIN SPARKS at the roof tills, one per arriving coin ---- */}
            {S10_TILLS.map((t, i) => {
              const p = Math.max(0, Math.min(1, (lf - t) / 14));
              if (p <= 0 || p >= 1) return null;
              return <Sparks key={"tk" + i} lf={lf} x={476 + (i % 4) * 150} y={-268} on={1 - p} color="#F6DC98" n={7} z={31} />;
            })}
          </Street>
        </Cam>
      </div>

      {/* ---- WARM BOKEH, panel space, in front of the row. It replaces the
           drizzle now the rain has stopped, and it never crosses a figure
           because every mote lives below panel y 580 or above panel y 66. ---- */}
      {Array.from({ length: 30 }, (_, i) => {
        const s = seed(i * 5.13 + 17);
        const rise = ((lf * (0.5 + s * 1.2) + s * 300) % 300) / 300;
        const near = s > 0.6;
        // near motes live entirely BELOW the hero's feet (panel y 631) and far motes
        // entirely ABOVE the fascia line (panel y 372), so no mote crosses a figure.
        const top = s > 0.5 ? 748 - rise * 104 : 128 - rise * 62;
        const r = near ? 12 + s * 16 : 5 + s * 6;
        return (
          <div key={"bk" + i} style={{
            position: "absolute", left: 24 + seed(i * 2.71) * 960, top, width: r, height: r, borderRadius: "50%",
            background: `radial-gradient(circle, ${TUNGSTEN}, transparent 68%)`,
            opacity: (1 - rise) * (near ? 0.34 : 0.5), filter: `blur(${near ? 5 : 1.4}px)`,
            mixBlendMode: "screen", zIndex: 55, pointerEvents: "none",
          }} />
        );
      })}

      {/* ---- THE ROAD WASH. The row's warm light spilling onto the dry asphalt
           and the under street brick, so the lower band is lit dressing and never
           a dead rectangle. Three soft reflected streaks travel across it. ---- */}
      <div style={{ position: "absolute", left: 0, top: 596, width: 1012, height: 196, zIndex: 56, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, filter: "blur(20px)", mixBlendMode: "screen",
          background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${TUNGSTEN} 34%, rgba(0,0,0,0) 96%)`,
          opacity: 0.15 + 0.05 * Math.sin(lf / 13),
        }} />
        {[0, 1, 2].map((i) => {
          const p = ((lf * 0.0085 + i / 3 + seed(i * 3.7) * 0.2) % 1);
          return (
            <div key={"rw" + i} style={{
              position: "absolute", left: -320 + p * 1500, top: 24 + i * 46, width: 300, height: 16,
              background: `linear-gradient(90deg, transparent, ${TUNGSTEN}, transparent)`,
              opacity: (0.2 - i * 0.04) * (0.6 + 0.4 * Math.sin(lf / 9 + i)), filter: "blur(9px)", mixBlendMode: "screen",
            }} />
          );
        })}
      </div>

      {/* ---- THE NEAR KERB we are standing on. Foreground tier, blurred, 1.6x
           parallax, sliding slowly as the camera pulls back. It is a SLIM 68px
           kerbstone lip at the very bottom, not a slab: the dressed road and the
           under street brick read behind it. ---- */}
      <div style={{ position: "absolute", left: -40, top: 724, width: 1120, height: 68, zIndex: 58, filter: "blur(3px)", pointerEvents: "none", transform: `translateX(${(-8 * pull - 5 * creep + idle(lf, 1.6, 190)).toFixed(2)}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 6, width: 1120, height: 62, background: "linear-gradient(180deg,#0D121B,#070A10)" }} />
        <div style={{ position: "absolute", left: 0, top: 3, width: 1120, height: 5, background: "rgba(222,192,136,0.30)" }} />
        {Array.from({ length: 9 }, (_, i) => <div key={"kj" + i} style={{ position: "absolute", left: 60 + i * 126, top: 6, width: 4, height: 44, background: "rgba(0,0,0,0.6)" }} />)}
        {/* two blurred foreground objects standing on it, never floating rects */}
        <div style={{ position: "absolute", left: 92, top: -72, width: 26, height: 80, borderRadius: "8px 8px 2px 2px", background: "#0A0E16" }} />
        <div style={{ position: "absolute", left: 86, top: -18, width: 38, height: 12, borderRadius: 3, background: "#0C1119" }} />
        <div style={{ position: "absolute", left: 862, top: -90, width: 30, height: 98, borderRadius: "9px 9px 2px 2px", background: "#0A0E16" }} />
        <div style={{ position: "absolute", left: 856, top: -38, width: 42, height: 11, borderRadius: 3, background: "#0C1119" }} />
        {/* the wet gutter still catching the row, drying out as the scene runs */}
        <div style={{ position: "absolute", left: 0, top: 8, width: 1120, height: 26, background: `linear-gradient(90deg, transparent, ${TUNGSTEN}, transparent)`, opacity: 0.16 * (1 - (dry - 0.7) / 0.3) + 0.06, mixBlendMode: "screen" }} />
      </div>

      {/* ---- A LAST WARM LIFT over the whole panel as the CTA lands. ---- */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 60, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 46% at 46% 62%, ${TUNGSTEN}, transparent 68%)`,
        opacity: 0.1 + 0.12 * over(lf, 30, 34, Easing.out(Easing.cubic)), mixBlendMode: "screen",
      }} />
      <Vig o={0.3} />
    </>
  );
};

// ============================================================================
// THE CTA LOCKUP. Rendered OUTSIDE the panel in TRUE SCREEN COORDINATES, in the
// band y 1180 to 1440. The RESULT is sharp, the PROMPT is blurred: Continuity
// Editor 12, depth of field and never a black box.
// ============================================================================

// The withheld prompt is three CHUNKY redaction bars, not text. Fewer, thicker
// and obviously held back, under a sharp label and a gold padlock.
const CTA_REDACT = [232, 198, 216];

// The lockup is CENTRED on the 1080 wide frame. Its width is capped at 820 so the
// centred block runs x 130 to 950, which clears the like, comment and share
// buttons that sit in the right 120px (x > 956).
const CTA_FRAME_W = 1080;
const CTA_W = 820;
const CTA_PAD = (CTA_FRAME_W - CTA_W) / 2;

const CtaLockup: React.FC<{ lf: number }> = ({ lf }) => {
  const sheen = ((lf * 2.4) % 190) / 190;
  // ⛔ NOTHING FADES IN. The lockup OWNS the lower third from lf 0, so the band
  // that the karaoke captions were living in is handed straight over and is
  // never empty for a single frame. Everything below is a SETTLE, not an entry:
  // each element is already at full opacity and full contrast at lf 0 and only
  // keeps easing into its resting pose, which also buys the keyword the longest
  // possible legible dwell before the cut at f77.
  const kw = 1;
  const word = over(lf, 0, 12, Easing.out(Easing.back(1.6)));
  const card = 1;
  const lines = 1;
  // STAGGERED OVERSHOOT ARRIVALS. Nothing fades, every one of these starts from a
  // pose that is already legible at lf 0 and then punches past its target and
  // wobbles back, each on its own frame, so the ending reads celebratory:
  // the pill settles first, then the card, then the FREE tag last and loudest.
  const kwPop = overshoot(lf, 0, 16, 0.13);                 // the keyword lands first
  const tag = 0.62 + 0.44 * overshoot(lf, 10, 20, 0.2);     // the tag is last and biggest
  const land = overshoot(lf, 5, 20, 0.1);                   // the card, in between
  const caret = (lf % 22) < 13 ? 1 : 0;
  const bob = Math.sin(lf / 9) * 1.4;
  // the whole lockup breathes and drifts a hair, so the lower third is never locked
  const liveX = drift(lf, 1.5, 152);
  const liveY = idle(lf, 1.1, 118, 0.7);

  return (
    <div style={{
      position: "absolute", left: 0, top: 1156, width: CTA_FRAME_W, height: 320, zIndex: 124,
      transform: `translate(${liveX.toFixed(2)}px, ${liveY.toFixed(2)}px)`,
    }}>
      {/* the cream ground the CTA lands on, so the row reads as behind it */}
      <div style={{ position: "absolute", left: 0, top: 12, width: CTA_FRAME_W, height: 300, background: "linear-gradient(180deg, rgba(236,233,226,0) 0%, #ECE9E2 9%, #ECE9E2 88%, rgba(236,233,226,0) 100%)" }} />

      {/* ---- THE BRASS KERB RAIL. Dressed and running from frame 0 so the band
           is never an empty strip waiting for a card. ---- */}
      <div style={{ position: "absolute", left: CTA_PAD, top: 6, width: CTA_W, height: 10, borderRadius: 999, background: grad("#E0BC58", "#9A7418"), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: `${-30 + sheen * 150}%`, top: 0, width: "34%", height: "100%", background: "linear-gradient(100deg, transparent, rgba(255,250,226,0.85), transparent)" }} />
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"rv" + i} style={{
          position: "absolute", left: CTA_PAD + 40 + i * 148, top: 8, width: 7, height: 7, borderRadius: "50%",
          background: "#F4E1A2", opacity: 0.55 + 0.45 * Math.abs(Math.sin(lf / 13 + i)),
          transform: `scale(${(1 + 0.5 * Math.max(0, settle(lf, 6 + stagger(i, 2.6), 1, 0.14, 0.14))).toFixed(3)})`,
        }} />
      ))}
      {/* the rail throws gold twice, once under the keyword's settle and once as
          the row behind goes soft, so the band under the words keeps sparking */}
      <Sparkles lf={lf} at={6} x={CTA_FRAME_W / 2 - 190} y={10} n={9} spread={220} rise={40} hue="#F3E3A6" sd={61} z={2} o={0.9} />
      <Sparkles lf={lf} at={40} x={CTA_FRAME_W / 2 + 190} y={10} n={9} spread={220} rise={40} hue="#F3E3A6" sd={67} z={2} o={0.9} />

      {/* ---- 1. THE KEYWORD, the strongest read in the reel. A centred comment
           field carrying COMMENT in ink and "CALLS" in clay, Fraunces 900, full
           contrast on the cream. Never a ghost. ---- */}
      <div style={{
        position: "absolute", left: CTA_PAD, top: 22 - bob, width: CTA_W, height: 108, borderRadius: 999,
        background: "#FCFAF4", border: "4px solid #C9BEA6",
        boxShadow: "0 20px 38px -14px rgba(28,24,16,0.44), 0 4px 10px rgba(28,24,16,0.18)",
        opacity: kw, transform: `scale(${(0.985 + 0.032 * kwPop).toFixed(4)})`,
        transformOrigin: "50% 50%", display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* a warm sheen sweeping across the inside of the field, so the single most
            important read in the reel is also the liveliest thing on the cream */}
        <div style={{
          position: "absolute", left: `${-40 + ((lf * 1.9) % 210) * 0.9}%`, top: 0, width: "36%", height: "100%",
          background: "linear-gradient(100deg, transparent, rgba(236,206,150,0.34), transparent)", pointerEvents: "none",
        }} />
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "center", marginRight: 78,
          transform: `scale(${(0.94 + word * 0.06).toFixed(4)})`,
        }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1, letterSpacing: "-0.01em", color: INK, whiteSpace: "nowrap" }}>COMMENT</div>
          <div style={{ width: 18 }} />
          {/* CALLS is the biggest, highest contrast glyph in the whole reel, and it
              keeps a slow pulse of its own so the eye is pulled straight to it */}
          <div style={{
            position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1,
            letterSpacing: "-0.02em", color: CLAY, whiteSpace: "nowrap",
            transform: `scale(${(breathe(lf, 0.018, 46) + 0.05 * Math.max(0, settle(lf, 8, 1, 0.12, 0.13))).toFixed(4)})`,
            transformOrigin: "50% 70%",
          }}>
            &ldquo;CALLS&rdquo;
            {/* a clay underline that keeps re drawing itself left to right */}
            <div style={{
              position: "absolute", left: 8, bottom: -6, height: 6, borderRadius: 3, background: CLAY,
              width: `${(24 + 68 * (0.5 + 0.5 * Math.sin(lf / 15 - 1.2))).toFixed(1)}%`, opacity: 0.5,
            }} />
          </div>
          <div style={{ marginLeft: 8, width: 5, height: 60, background: INK, opacity: caret, alignSelf: "center" }} />
        </div>
        <div style={{
          position: "absolute", right: 14, top: 18, width: 66, height: 66, borderRadius: "50%",
          background: grad("#E08A62", "#C2603C"), display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translateX(${(2.4 * Math.sin(lf / 8)).toFixed(2)}px) scale(${(0.94 + 0.07 * Math.abs(Math.sin(lf / 11)) + 0.08 * Math.max(0, settle(lf, 14, 1, 0.13, 0.12))).toFixed(4)})`,
          boxShadow: "0 5px 12px rgba(28,24,16,0.28)",
        }}>
          <div style={{ width: 0, height: 0, marginLeft: 7, borderTop: "15px solid transparent", borderBottom: "15px solid transparent", borderLeft: `22px solid ${PAPER}` }} />
        </div>
      </div>

      {/* ---- 2. THE LEAD MAGNET. Paper white and ink with one clay accent, sharp
           and legible from frame 0. Only the three chunky PROMPT bars are
           withheld under a padlock. Never dark plus glow. ---- */}
      <div style={{
        position: "absolute", left: CTA_PAD, top: 136 + (1 - land) * 14, width: CTA_W, height: 146,
        // the card is deliberately SUBORDINATE to the keyword: slightly smaller,
        // slightly tilted, softer border. It also never stops rocking on its corner.
        transform: `rotate(${(-1.1 - (1 - land) * 1.2 + Math.sin(lf / 17) * 0.25 + settle(lf, 21, 1.7, 0.1, 0.075)).toFixed(3)}deg) scale(${(0.966 + 0.012 * land).toFixed(4)})`,
        transformOrigin: "50% 0%", opacity: card,
        borderRadius: 14, background: PAPER, border: "3px solid #E2D9C6",
        boxShadow: "0 22px 44px -14px rgba(28,24,16,0.36), 0 6px 14px rgba(28,24,16,0.15)", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", left: 26, top: 18, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, letterSpacing: "0.2em", color: CLAY }}>THE CALLS KIT</div>
        <div style={{ position: "absolute", left: 26, top: 42, width: 460, height: 3, borderRadius: 2, background: "#E2D9C6" }} />
        <div style={{ position: "absolute", left: 26, top: 54, width: 470, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, lineHeight: 1.14, letterSpacing: "-0.01em", color: INK }}>
          The voice line build and the exact words to pitch a shop
        </div>
        {/* the rule dividing the sharp RESULT from the withheld PROMPT */}
        <div style={{ position: "absolute", left: 520, top: 20, width: 3, height: 106, borderRadius: 2, background: "#E7DFCE" }} />
        {/* ---- THE WITHHELD PROMPT. The label and the padlock stay SHARP so the
             blur reads as deliberately held back, and only three chunky
             redaction bars are soft. Never a badly rendered list. ---- */}
        <div style={{ position: "absolute", left: 548, top: 26, width: 250, display: "flex", alignItems: "center", gap: 8 }}>
          {/* the small gold padlock, shackle plus body plus keyhole */}
          <div style={{ position: "relative", width: 18, height: 22, flexShrink: 0 }}>
            <div style={{ position: "absolute", left: 4, top: 0, width: 10, height: 12, borderRadius: "5px 5px 0 0", border: "3px solid #C08E24", borderBottom: "none" }} />
            <div style={{ position: "absolute", left: 0, top: 9, width: 18, height: 13, borderRadius: 3, background: grad("#F0CB63", "#C98A22") }} />
            <div style={{ position: "absolute", left: 8, top: 13, width: 3, height: 5, borderRadius: 1, background: "#4A3708" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, letterSpacing: "0.16em", color: "#6A6153", whiteSpace: "nowrap" }}>THE PROMPT</div>
        </div>
        {/* three chunky redaction bars, the only blurred thing in the lockup */}
        <div style={{ position: "absolute", left: 548, top: 60, width: 250, filter: "blur(5px)", opacity: lines }}>
          {CTA_REDACT.map((w, i) => (
            <div key={i} style={{
              width: w * (1 + 0.02 * Math.sin(lf / 11 + i * 1.7)), height: 15, borderRadius: 4, marginTop: i === 0 ? 0 : 11,
              background: "#CFC4AE",
              opacity: 0.72 + 0.16 * Math.sin(lf / 8 + i * 1.3),
              transform: `translateX(${idle(lf, 1.5, 64 + i * 13, i).toFixed(2)}px)`,
            }} />
          ))}
        </div>
        {/* ---- 3. THE SMALL FREE TAG, last in and still settling at the cut.
             It sits in the header row beside the eyebrow, clear of the withheld
             prompt column on the right. ---- */}
        <div style={{
          position: "absolute", left: 206, top: 12, width: 84, height: 30, borderRadius: 6,
          background: grad("#F0CB63", "#C98A22"), border: "2px solid #F6E4A0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.12em", color: "#3A2A05",
          transform: `rotate(${(3 + Math.sin(lf / 13) * 1.6 + settle(lf, 24, 8, 0.12, 0.07)).toFixed(3)}deg) scale(${tag.toFixed(4)})`, transformOrigin: "50% 50%",
          boxShadow: "0 6px 14px rgba(28,24,16,0.3)",
        }}>FREE</div>
      </div>
    </div>
  );
};

// ==== part: 99_tail.tsx ====
// ---------------- the sound design ------------------------------------------
// Board: storyboards/68-calls.md, the SFX Map. Times are L relative so they
// survive re-timing. Every entry goes through <Sfx>, which carries the fade
// envelope, so nothing hard-cuts and clicks.
type Beat = [number, number, string, number, number]; // [scene, offset, file, v, dur]

const SFX: Beat[] = [
  // ---- S0 the bell that nobody answers ----
  [0, 0.00, "lib_riser.wav", 0.34, 2.6], [0, 0.27, "lib_boom.wav", 0.42, 2.0],
  [0, 0.27, "impact.wav", 0.30, 1.4], [0, 0.30, "phone_ring.wav", 0.30, 2.2],
  [0, 0.90, "villain_ting.wav", 0.22, 0.9], [0, 1.13, "chimehi.wav", 0.16, 0.8],
  [0, 1.25, "chimelo.wav", 0.16, 0.8], [0, 1.37, "chimehi.wav", 0.15, 0.8],
  [0, 1.49, "chimelo.wav", 0.15, 0.8], [0, 1.60, "lib_whoosh.wav", 0.30, 1.5],
  [0, 1.64, "sub.wav", 0.24, 1.6], [0, 2.40, "coin_slide.wav", 0.24, 1.6],
  [0, 2.80, "swooshup.wav", 0.28, 1.2], [0, 3.80, "pneu_thunk.wav", 0.20, 0.5],
  [0, 3.97, "pneu_thunk.wav", 0.20, 0.5], [0, 4.13, "pneu_thunk.wav", 0.20, 0.5],
  [0, 3.87, "ui_tap.wav", 0.14, 0.3], [0, 4.00, "ui_tap.wav", 0.14, 0.3],
  [0, 4.13, "ui_tap.wav", 0.14, 0.3], [0, 4.27, "ui_tap.wav", 0.14, 0.3],
  [0, 4.20, "cash-register.mp3", 0.22, 1.6],
  // ---- S1 twelve turnarounds ----
  [1, 0.00, "arrive_chime.wav", 0.16, 1.1], [1, 0.29, "arrive_chime.wav", 0.15, 1.1],
  [1, 0.58, "arrive_chime.wav", 0.15, 1.1], [1, 0.87, "arrive_chime.wav", 0.14, 1.1],
  [1, 1.16, "arrive_chime.wav", 0.14, 1.1], [1, 1.45, "arrive_chime.wav", 0.13, 1.1],
  [1, 0.33, "sign_clack.wav", 0.18, 0.3], [1, 0.62, "sign_clack.wav", 0.18, 0.3],
  [1, 0.91, "sign_clack.wav", 0.18, 0.3], [1, 1.20, "sign_clack.wav", 0.19, 0.3],
  [1, 1.49, "sign_clack.wav", 0.19, 0.3], [1, 1.73, "sign_clack.wav", 0.20, 0.3],
  [1, 1.80, "ratchet.wav", 0.12, 0.5], [1, 2.05, "ding.wav", 0.12, 0.8],
  [1, 2.30, "ratchet.wav", 0.12, 0.5], [1, 3.20, "lib_whoosh.wav", 0.32, 1.5],
  [1, 3.67, "ticket_click.wav", 0.15, 0.3], [1, 3.88, "ticket_click.wav", 0.15, 0.3],
  [1, 4.09, "ticket_click.wav", 0.15, 0.3], [1, 4.30, "ticket_click.wav", 0.15, 0.3],
  [1, 4.51, "ticket_click.wav", 0.15, 0.3], [1, 3.37, "metal_riser.wav", 0.78, 2.2],
  // ---- S2 both hands full ----
  [2, 0.00, "water_fan.wav", 0.14, 3.2], [2, 1.00, "lib_notif.wav", 0.18, 1.0],
  [2, 1.40, "lib_notif.wav", 0.18, 1.0], [2, 1.87, "lib_notif.wav", 0.18, 1.0],
  [2, 1.87, "bonk.mp3", 0.16, 0.8], [2, 2.33, "villain_ting_muf.wav", 0.20, 0.9],
  [2, 2.70, "metal_riser.wav", 0.74, 2.2],
  // ---- S3 the fit-out ----
  [3, 0.00, "lib_whoosh.wav", 0.30, 1.5], [3, 0.60, "thock.wav", 0.28, 0.7],
  [3, 0.80, "lib_confirm.wav", 0.24, 1.0], [3, 1.00, "swish.wav", 0.20, 0.8],
  [3, 1.20, "mech_clank.wav", 0.18, 0.7], [3, 1.33, "lib_magic_reveal.wav", 0.24, 2.4],
  [3, 1.36, "sparkle.wav", 0.14, 0.9], [3, 1.87, "rubber_bounce.wav", 0.22, 0.6],
  [3, 2.47, "phone_ring.wav", 0.20, 1.1], [3, 2.80, "phone_ring.wav", 0.24, 1.1],
  [3, 3.13, "phone_ring.wav", 0.30, 0.42], [3, 3.20, "pickup_chime.wav", 0.24, 0.5],
  [3, 3.67, "punch_thud.wav", 0.20, 0.6], [3, 4.07, "punch_thud.wav", 0.20, 0.6],
  [3, 4.33, "split_flap.wav", 0.26, 0.7], [3, 4.40, "lib_correct.wav", 0.22, 1.0],
  [3, 5.20, "lib_click.wav", 0.14, 0.4], [3, 5.80, "lib_click.wav", 0.14, 0.4],
  [3, 6.30, "ticket_click.wav", 0.15, 0.3], [3, 6.87, "cash-register.mp3", 0.22, 1.6],
  [3, 7.10, "chimehi.wav", 0.16, 0.9], [3, 5.90, "metal_riser.wav", 0.72, 2.2],
  // ---- S4 step one, pick one door ----
  [4, 0.30, "swooshup.wav", 0.20, 1.0], [4, 0.36, "lib_pop.wav", 0.18, 0.5],
  [4, 0.60, "swooshup.wav", 0.20, 1.0], [4, 0.66, "lib_pop.wav", 0.18, 0.5],
  [4, 0.90, "swooshup.wav", 0.20, 1.0], [4, 0.96, "lib_pop.wav", 0.18, 0.5],
  [4, 1.20, "swooshup.wav", 0.20, 1.0], [4, 1.26, "lib_pop.wav", 0.18, 0.5],
  [4, 0.32, "thock.wav", 0.20, 0.6], [4, 0.62, "thock.wav", 0.22, 0.6],
  [4, 0.92, "thock.wav", 0.23, 0.6], [4, 1.22, "thock.wav", 0.24, 0.6],
  [4, 1.33, "twang.wav", 0.18, 1.2],
  [4, 1.30, "lib_click.wav", 0.13, 0.4], [4, 1.42, "lib_click.wav", 0.13, 0.4],
  [4, 1.54, "lib_click.wav", 0.13, 0.4], [4, 1.66, "lib_click.wav", 0.13, 0.4],
  [4, 3.20, "screech.wav", 0.18, 0.9], [4, 3.60, "lib_pop2.wav", 0.20, 0.6],
  [4, 4.00, "ceramic_crack.wav", 0.20, 0.7], [4, 4.40, "sub.wav", 0.20, 1.0],
  [4, 4.33, "rubber_bounce.wav", 0.18, 0.6], [4, 4.42, "rubber_bounce.wav", 0.18, 0.6],
  [4, 4.51, "rubber_bounce.wav", 0.18, 0.6], [4, 4.60, "rubber_bounce.wav", 0.18, 0.6],
  [4, 5.00, "lib_boom.wav", 0.26, 1.8], [4, 5.10, "metal_riser.wav", 0.76, 2.2],
  // ---- S5 step two, build it once ----
  [5, 0.73, "mallet_tap.wav", 0.18, 0.6], [5, 0.80, "lib_click.wav", 0.14, 0.4],
  [5, 1.40, "ratchet.wav", 0.20, 0.5], [5, 1.47, "lib_click.wav", 0.14, 0.4],
  [5, 2.07, "lib_confirm.wav", 0.26, 1.0], [5, 2.14, "ticket_click.wav", 0.16, 0.3],
  [5, 3.20, "resolve.wav", 0.12, 1.6], [5, 4.00, "lib_click.wav", 0.14, 0.4],
  [5, 2.80, "metal_riser.wav", 0.72, 2.2],
  // ---- S6 it runs without him, then it repaints ----
  [6, 0.20, "phone_ring.wav", 0.20, 1.1], [6, 0.53, "phone_ring.wav", 0.24, 1.1],
  [6, 0.87, "phone_ring.wav", 0.30, 0.42], [6, 0.94, "pickup_chime.wav", 0.22, 0.5],
  [6, 1.27, "punch_thud.wav", 0.20, 0.6], [6, 1.67, "punch_thud.wav", 0.20, 0.6],
  [6, 2.20, "split_flap.wav", 0.24, 0.7], [6, 2.27, "lib_correct.wav", 0.20, 1.0],
  [6, 2.22, "data.wav", 0.14, 1.2], [6, 2.60, "split_flap.wav", 0.24, 0.7],
  [6, 2.93, "lib_whoosh.wav", 0.28, 1.5], [6, 3.73, "swish.wav", 0.16, 0.8],
  [6, 4.13, "swish.wav", 0.16, 0.8], [6, 4.53, "swish.wav", 0.16, 0.8],
  [6, 5.07, "rubber_bounce.wav", 0.14, 0.6], [6, 3.93, "metal_riser.wav", 0.80, 2.2],
  // ---- S7 step three, the question he cannot answer ----
  [7, 1.13, "lib_click.wav", 0.18, 0.4], [7, 2.47, "mech_clank.wav", 0.24, 0.7],
  [7, 2.54, "chain_clank.wav", 0.20, 0.8], [7, 2.67, "sign_clack.wav", 0.20, 0.3],
  [7, 2.87, "sign_clack.wav", 0.20, 0.3], [7, 3.07, "sign_clack.wav", 0.20, 0.3],
  [7, 3.20, "glitch_counter.wav", 0.20, 0.9], [7, 3.87, "lib_magic_reveal.wav", 0.26, 2.4],
  [7, 4.93, "coin_slide.wav", 0.26, 1.6], [7, 5.60, "lib_confirm.wav", 0.20, 1.0],
  [7, 4.60, "metal_riser.wav", 0.78, 2.2],
  // ---- S8 the brass plaque, the reel's one cold key ----
  [8, 0.00, "cello_note.wav", 0.09, 6.0], [8, 0.73, "ratchet.wav", 0.24, 0.5],
  [8, 1.00, "lib_click.wav", 0.20, 0.4], [8, 1.02, "lib_notif.wav", 0.18, 1.0],
  [8, 1.27, "ident_chirp.wav", 0.16, 0.5], [8, 2.00, "phone_ring.wav", 0.26, 1.1],
  [8, 2.93, "knife_switch.wav", 0.28, 0.8], [8, 3.00, "clap_slam.wav", 0.24, 0.8],
  [8, 3.53, "sorter_tick.wav", 0.10, 2.4], [8, 4.60, "metal_riser.wav", 0.76, 2.2],
  // ---- S9 worse than never ----
  [9, 0.00, "screech.wav", 0.20, 0.9], [9, 0.73, "blip3.wav", 0.18, 0.6],
  [9, 0.80, "villain_ting_off.wav", 0.20, 0.9], [9, 1.53, "paper_burn.wav", 0.20, 1.5],
  [9, 2.00, "ceramic_crack.wav", 0.30, 0.7], [9, 2.20, "bonk.mp3", 0.20, 0.8],
  [9, 2.47, "blip2.wav", 0.13, 0.5], [9, 2.60, "blip1.wav", 0.13, 0.5],
  [9, 2.73, "blip1.wav", 0.13, 0.5], [9, 2.87, "lib_boom.wav", 0.22, 1.8],
  [9, 2.40, "metal_riser.wav", 0.74, 2.2],
  // ---- S10 CTA ----
  [10, 0.00, "lib_boom.wav", 0.40, 2.0], [10, 0.00, "lib_riser.wav", 0.34, 1.6],
  [10, 0.20, "sparkle.wav", 0.20, 1.2], [10, 0.27, "pickup_chime.wav", 0.26, 0.6],
  [10, 0.34, "chimehi.wav", 0.16, 0.9], [10, 0.46, "chimelo.wav", 0.16, 0.9],
  [10, 1.00, "cash-register.mp3", 0.24, 1.6], [10, 1.06, "c_coin.wav", 0.18, 0.8],
  [10, 1.18, "c_coin.wav", 0.18, 0.8], [10, 1.00, "crowd_cheer.wav", 0.18, 2.2],
  [10, 1.80, "lib_click.wav", 0.14, 0.4], [10, 1.93, "lib_click.wav", 0.14, 0.4],
];

// ---------------- HOOK HEADER (house rule: every reel opens with one) --------
// memory/reel-hook-header: a big two-tone Fraunces headline that NAMES CLAUDE so
// the hook is mute-readable as a title in the first second, and that sells the
// viewer's payoff rather than the mechanic. Renders as a sibling AFTER <Panel>
// so it sits over the art like the CALLBACK reel's headline, rather than being
// clipped by the panel's own top edge. Solid at frame 0 (never a fade-in trap),
// and cleared before the problem scene starts.
const CallsHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > Lf[1] - 2) return null;
  const slam = interpolate(f, [0, 5, 9], [1.14, 0.98, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const drop = interpolate(f, [0, 7], [-22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const out = 1 - over(f, Lf[1] - 20, 18);
  const shimX = ((f * 9) % 560) - 140;
  const T = (t: string, clay = false) => <span style={{ color: clay ? CLAY : "#F4EFE4" }}>{t}</span>;
  const line = { fontFamily: fraunces.fontFamily, fontWeight: 900 as const, fontSize: 60, lineHeight: 1.04, letterSpacing: "-0.02em", whiteSpace: "nowrap" as const, textShadow: "0 3px 16px rgba(0,0,0,0.6)" };
  return (
    <div style={{ position: "absolute", left: 540, top: 430 + drop, transform: `translateX(-50%) scale(${slam})`, transformOrigin: "50% 0%", opacity: out, zIndex: 190, pointerEvents: "none" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "18px 40px 20px", borderRadius: 22, background: "linear-gradient(158deg,#151D33 0%,#080D1A 100%)", border: "2px solid rgba(207,149,68,0.45)", boxShadow: "0 30px 60px -18px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.10)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={line}>{T("Claude", true)}{T(" answers the calls")}</div>
        <div style={line}>{T("small shops keep ")}{T("missing", true)}</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: shimX, width: 150, background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.16),transparent)", transform: "skewX(-16deg)" }} />
      </div>
      <div style={{ position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 30, border: `3px solid ${GOLD}`, opacity: (1 - over(f, 0, 10)) * 0.85 }} />
    </div>
  );
};

export const ClaudeCallsReel: React.FC = () => {
  const frame = useCurrentFrame();
  // a small push on every scene onset, so cuts land with weight
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = 1 + punch * 0.022;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_calls.wav")} />
      {/* the bed starts at the song's own 0.00 and runs the whole reel, ducking 6dB into the CTA */}
      <Audio
        loop
        src={staticFile("ebm_bed.wav")}
        volume={(ff) => interpolate(ff, [0, fr(0.4), fr(CTA_L) - 10, fr(CTA_L) + 12, 99999], [0.105, 0.11, 0.11, 0.055, 0.055], { extrapolateRight: "clamp" })}
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
        </Panel>
        <CallsHeader />
        <Captions />
      </AbsoluteFill>
      {/* the CTA lockup renders outside the panel in true screen coords */}
      {scene(10) ? <CtaLockup lf={frame - Lf[10]} /> : null}
      <SnackLane f={frame} />
      <ProgressBar />
    </AbsoluteFill>
  );
};
