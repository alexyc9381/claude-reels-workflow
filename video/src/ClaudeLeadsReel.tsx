// ==== part: 00_head.tsx ====
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_leads.json";

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
const L = [0, 5.1, 8.3, 11.44, 15.16, 18.62, 22.2, 36.375, 42.815, 48.335, 51.355];
const Lf = L.map(fr);
// per-scene time-scale = builtWindow / newWindow, so each scene plays its FULL built
// animation compressed/stretched into its (VO-driven) window. Applied to lf + SFX.
// S1 held longer (L[2] 7.88->8.3) so "dentists in Austin" fully lands before S2.
const SCL = [0.8889, 1.6146, 0.9787, 2.0625, 1.6538, 1.2991, 2.7273];
const CUT = 699;              // hard cut right after "guide" (de-silenced VO ends ~23.16s). Mirror durationInFrames in __leads_only_index.ts
const CTA_L = L[10];            // legacy CALLS window, kept only so the (now off-screen) SnackLane + audio-duck maths stay defined
const CTA_AT = Lf[6];          // the Leads CTA (in-panel scene + lockup) mounts here, frame 925, immediately after S5

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
  const giftWake = ramp(t, CTA_AT / FPS - 0.9, CTA_AT / FPS + 0.5);  // the flag lights up as the Leads CTA lands
  const giftOpen = over(f, CTA_AT + fr(0.2), fr(0.5), Easing.out(Easing.back(2)));
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
// SCENE 0 - THE FREE ORCHARD.  136 frames (lf 0..135). Verb: UNCHAIN.
// A bright sunny glass CONSERVATORY at midday. One BIG hero tree stands dead
// centre, heavy with glowing LEAD CARDS (little contact cards: a business name,
// a phone line, an @ email line). Each card is a lead, growing free on the tree.
// The broker (THE RENT-FARMER, slate) has bundled a fat stack of those same
// cards into a roped, chained "$2,000 LEAD LIST" hanging off the tree and is
// selling it. Near the end the clay Claude hero's bolt-cutters snap the chain
// and the bundle bursts open, the cards spilling free. Camera opens on the whole
// tableau, pushes gently in on the locked bundle + the cut, and ENDS MID-MOTION.
//
// PALETTE LAW (one meaning each):
//   clay #D97757  = Claude / the hero cutters ONLY (the only clay in the scene)
//   slate #5A5F6B = the Rent-Farmer + his lock / chain / padlock ONLY
//   honey-gold #E7B24C = the free glowing LEAD CARDS (leads) + the $2,000 tag
//   day sky = bright BLUE (never slate); foliage = a lush sunlit green
// ============================================================================

const OR_GOLD = "#E7B24C", OR_GOLD_HI = "#FBE6A8", OR_GOLD_LO = "#A9781F";
const OR_FOLI = "#3E7A46", OR_FOLI_HI = "#63A868", OR_FOLI_LO = "#2C5A3A";
const OR_SLATE = "#5A5F6B", OR_SLATE_HI = "#7C828E", OR_SLATE_LO = "#3A3E47";
// THE RENT-FARMER's warm RUST/PUMPKIN body/coat/hat. A distinct, browner-orange
// shade from Claude's hero clay #D97757 (Claude reads pinker/lighter). His cold
// STEEL lock / chain / padlock / meter stay OR_SLATE (his device, never orange).
const OR_BRK = "#C2683C", OR_BRK_HI = "#D98A55", OR_BRK_LO = "#8F461F";
const OR_IRON = "#191E25", OR_IRON_HI = "#333B45", OR_STONE = "#20252C";
const OR_CLAY = "#D97757", OR_CLAY_HI = "#EA967A", OR_CLAY_LO = "#B4573B";
const OR_STEEL = "#8C99A4";                 // the meter's cold glow
// the DAY sky through the glass: bright blue, kept distinct from villain slate
const OR_SKY_LO = "#5AA6D8", OR_SKY = "#82C4E8", OR_SKY_HI = "#BDE6F6";
const OR_SUN = "#FFF6D8";
// legacy night tokens kept for any dressing components still referencing them
const OR_NAVY = "#0B1730", OR_NAVY_HI = "#1A2C4C", OR_MOON = "#EAEEF6", OR_GLASS = "#8FB6BE";
// dim, desaturated props: terracotta (browner+darker than clay), spent wood crates
const OR_TERRA = "#6B4130", OR_TERRA_HI = "#8A5A40", OR_TERRA_LO = "#40271C";
const OR_WOOD = "#46331F", OR_WOOD_HI = "#6A5030", OR_LAMP = "#F5E4B4"; // warm ambient lantern light
const OR_BRONZE = "#5B5238", OR_BRONZE_HI = "#7E7250"; // weathered tool metal (warm, never slate)
const OR_STONEW = "#3C433C", OR_STONEW_HI = "#525A50", OR_STONEW_LO = "#262B26"; // dressed knee-wall stone
const OR_MOSS = "#2E3A24", OR_BURLAP = "#544A32", OR_BURLAP_HI = "#63563A"; // moss + compost sacking
const OR_VPX = 706, OR_VPY = 374;           // the misted vanishing point
const s0O = Easing.out(Easing.cubic);
const s0IO = Easing.inOut(Easing.cubic);

// a world-space LINE from (ax,ay) to (bx,by). Used for perspective ribs, path
// edges and glazing bars, so the greenhouse reads as receding glass.
const OrLine = (k: React.Key, ax: number, ay: number, bx: number, by: number, w: number, color: string, z = 1, op = 1) => {
  const len = Math.hypot(bx - ax, by - ay);
  const ang = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
  return <div key={k} style={{ position: "absolute", left: ax, top: ay - w / 2, width: len, height: w, background: color, opacity: op, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, zIndex: z, pointerEvents: "none" }} />;
};

// ---------------------------------------------------------------------------
// A GLOWING FRUIT = one lead. Honey-gold, blooming, softly pulsing. When the
// Rent-Farmer's padlock owns its tree it goes cold slate and dims.
// ---------------------------------------------------------------------------
const OrGlowFruit: React.FC<{ lf: number; x: number; y: number; r: number; i: number; locked?: number; glow?: number }> = ({ lf, x, y, r, i, locked = 0, glow = 1 }) => {
  // DORMANT in the locked hook: a small, DIM, COOL fruit accent. No bloom, no glow
  // signal (the honey-gold is reserved for the $2,000 tag). It reads as fruit-shaped
  // texture behind the bars, never a bright orb.
  const pulse = 0.9 + 0.1 * Math.sin(lf / (26 + (i % 5) * 7) + i * 1.7);
  const rr = r * 0.66;
  const col = locked > 0.5 ? "#474C56" : "#6F5F3C";   // muted dusk-bronze fruit / cold slate when owned
  const hi = locked > 0.5 ? "#565C68" : "#8A784C";
  const lo = locked > 0.5 ? OR_SLATE_LO : "#3E3218";
  const o = (locked > 0.5 ? 0.4 : 0.56) * glow * pulse;
  return (
    <div style={{ position: "absolute", left: x - rr, top: y - rr, width: rr * 2, height: rr * 2 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle at 38% 30%, ${hi}, ${col} 56%, ${lo} 100%)`, opacity: Math.min(1, o) }} />
      <div style={{ position: "absolute", left: rr * 0.52, top: rr * 0.4, width: rr * 0.44, height: rr * 0.36, borderRadius: "50%", background: "rgba(226,220,200,0.42)", opacity: 0.5 * Math.min(1, o) }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// A GLOWING LEAD CARD = one business contact = one lead. A small warm-ivory
// contact card: a gold header with an avatar dot + a name bar, a phone line and
// an @ email line under it. Honey-gold glow (the reserved lead colour). These
// hang on the hero tree like fruit, so a lead reads as a lead.
// ---------------------------------------------------------------------------
// `fill` (0..1) writes the fields on LIVE: the name bar, then the phone, then the
// @ email, and the card COMPLETES to bright honey-gold at the end (the earned
// glow). `pop` is a brief completion scale-punch. `stem` hangs it from a branch.
const OrLeadCard: React.FC<{ lf: number; x: number; y: number; s?: number; i?: number; glow?: number; tilt?: number; z?: number; dim?: number; fill?: number; pop?: number; stem?: number; name?: string; wink?: number }> = ({ lf, x, y, s = 1, i = 0, glow = 1, tilt = 0, z = 5, dim = 0, fill, pop = 0, stem = 0, name, wink = 0 }) => {
  const pulse = 0.84 + 0.16 * Math.sin(lf / (30 + (i % 5) * 8) + i * 1.7);
  const W = 64 * s, H = 48 * s;
  const bob = Math.sin(lf / (42 + (i % 4) * 11) + i * 1.3) * 2.2 * s;
  // a "ripe" breathing squash + a periodic specular GLINT that sweeps the face,
  // staggered per card so the tree TWINKLES rather than pulsing in unison.
  const ripe = 1 + 0.02 * Math.sin(lf / (46 + (i % 5) * 9) + i * 2.1);
  const glintCyc = (lf + i * 37) % (152 + (i % 4) * 26);
  const glintP = glintCyc < 26 ? glintCyc / 26 : -1;   // 0..1 while sweeping, else off
  const filling = fill !== undefined;
  const fv = filling ? Math.max(0, Math.min(1, fill as number)) : 1;
  const rev = (a: number, b: number) => Math.max(0, Math.min(1, (fv - a) / (b - a)));  // per-field reveal 0..1
  const nameR = rev(0.03, 0.30), phoneR = rev(0.34, 0.62), mailR = rev(0.66, 0.96);
  const complete = filling ? fv >= 0.985 : true;
  const eff = filling ? (complete ? 0 : 1) : (dim ? 1 : 0);   // muted while filling; honey when done
  const face = eff ? "linear-gradient(158deg, #E7DBC2 0%, #CFC0A0 100%)" : "linear-gradient(158deg, #FFF8E8 0%, #F4E6C4 100%)";
  const ink = eff ? "#8C7A54" : "#6E4E14";
  const line = eff ? "#A79366" : "#C79A46";
  const halo = (eff ? 0.16 : 0.5) + pop * 0.55;
  const scl = 1 + pop * 0.16;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H / 2 + bob, width: W, height: H, zIndex: z, transform: `rotate(${tilt}deg) scale(${(scl * ripe).toFixed(4)})`, transformOrigin: "50% -70%" }}>
      {/* a thin stem hanging the card from the branch above */}
      {stem > 0 && <div style={{ position: "absolute", left: W / 2 - 1.2 * s, top: -stem * s, width: 2.4 * s, height: stem * s, background: "linear-gradient(180deg,#4E3A1B,#7A5A2E)", borderRadius: 2 * s }} />}
      {/* the warm honey glow the lead throws */}
      <div style={{ position: "absolute", left: -W * 0.34, top: -H * 0.3, width: W * 1.68, height: H * 1.7, borderRadius: "50%", background: `radial-gradient(circle, ${OR_GOLD_HI}, rgba(231,178,76,0) 66%)`, opacity: halo * glow * pulse, filter: `blur(${8 * s}px)`, mixBlendMode: "screen" }} />
      {/* the card body, warm ivory */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, background: face, border: `${1.8 * s}px solid ${eff ? "#B79A5A" : OR_GOLD}`, boxShadow: `0 ${5 * s}px ${13 * s}px rgba(52,34,8,0.42), 0 0 ${16 * s}px rgba(231,178,76,${(0.7 * glow * pulse * (eff ? 0.3 : 1) + pop * 0.5).toFixed(2)}), inset 0 ${1.5 * s}px 0 rgba(255,255,255,0.7)` }}>
        {/* gold header: an avatar dot + a business-name bar (writes on with nameR) */}
        <div style={{ position: "absolute", left: 4.5 * s, top: 4.5 * s, right: 4.5 * s, height: 14 * s, borderRadius: 4 * s, background: grad(eff ? "#D8C286" : OR_GOLD_HI, eff ? "#B79A5A" : OR_GOLD), display: "flex", alignItems: "center", gap: 3.5 * s, paddingLeft: 3.5 * s }}>
          <div style={{ width: 8.5 * s, height: 8.5 * s, borderRadius: "50%", background: ink, boxShadow: `inset 0 ${1 * s}px 0 rgba(255,240,200,0.5)`, opacity: filling ? Math.min(1, nameR * 3) : 1 }} />
          {name ? (
            /* EASTER-EGG: a real (clean, on-brand) business name written on this lead,
               with the font auto-fit to the header so the full name reads */
            <div style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: Math.min(8 * s, ((W - 24 * s) / Math.max(9, name.length)) * 1.7), lineHeight: 1, letterSpacing: "-0.03em", color: ink, opacity: filling ? Math.min(1, nameR * 3) : 1 }}>{name}</div>
          ) : (
            <div style={{ width: 30 * s * nameR, height: 4 * s, borderRadius: 2 * s, background: ink }} />
          )}
        </div>
        {/* phone line: a tiny handset glyph + a number (writes on with phoneR) */}
        <div style={{ position: "absolute", left: 6.5 * s, top: 24 * s, display: "flex", alignItems: "center", gap: 3.5 * s, opacity: filling ? Math.min(1, phoneR * 4) : 1 }}>
          <div style={{ width: 8 * s, height: 8 * s, borderRadius: `${3 * s}px ${1.5 * s}px ${3 * s}px ${1.5 * s}px`, background: line, transform: "rotate(38deg)" }} />
          <div style={{ width: 33 * s * phoneR, height: 3.4 * s, borderRadius: 2 * s, background: line }} />
        </div>
        {/* email line: an @ glyph + a line (writes on with mailR) */}
        <div style={{ position: "absolute", left: 6 * s, top: 34 * s, display: "flex", alignItems: "center", gap: 3 * s, opacity: filling ? Math.min(1, mailR * 4) : 1 }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 12 * s, lineHeight: 1, color: line, marginTop: -1 * s }}>@</div>
          <div style={{ width: 30 * s * mailR, height: 3.4 * s, borderRadius: 2 * s, background: line }} />
        </div>
        {/* a specular GLINT that sweeps the ripe honey-gold card face (lit cards only) */}
        {glintP >= 0 && eff === 0 && (
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(-34 + glintP * 150).toFixed(1)}%`, width: "36%", background: "linear-gradient(90deg, transparent, rgba(255,252,232,0.55), transparent)", transform: "skewX(-18deg)", mixBlendMode: "screen", borderRadius: 8 * s, pointerEvents: "none" }} />
        )}
        {/* EASTER-EGG: a card that briefly winks + smiles (a tiny ^_^ in the corner) */}
        {wink > 0 && (() => {
          const wc = (lf + 40) % 96;
          if (wc >= 30) return null;                                  // a brief flash, ~once per scene
          const w1 = wc > 10 && wc < 20;                              // one eye closes mid-flash
          const fade = wc < 5 ? wc / 5 : (wc > 25 ? (30 - wc) / 5 : 1);
          return (
            <div style={{ position: "absolute", left: W - 21 * s, top: H - 18 * s, opacity: Math.min(1, fade), pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 3 * s, height: (w1 ? 1.3 : 3) * s, borderRadius: 2, background: ink }} />
              <div style={{ position: "absolute", left: 6 * s, top: 0, width: 3 * s, height: 3 * s, borderRadius: 2, background: ink }} />
              <div style={{ position: "absolute", left: 0.4 * s, top: 4.6 * s, width: 8.2 * s, height: 4 * s, borderRadius: `0 0 ${8 * s}px ${8 * s}px`, borderBottom: `${1.6 * s}px solid ${ink}`, borderLeft: `${1.1 * s}px solid ${ink}`, borderRight: `${1.1 * s}px solid ${ink}` }} />
            </div>
          );
        })()}
      </div>
      {/* a 4-point SPARKLE that flashes at the corner as a lead completes to gold */}
      {pop > 0.35 && (
        <div style={{ position: "absolute", left: W - 6 * s, top: -6 * s, width: 16 * s, height: 16 * s, opacity: Math.min(1, pop * 1.4), zIndex: 3, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, width: 2 * s, height: "100%", marginLeft: -1 * s, background: "linear-gradient(180deg, transparent, #FFF6D8, transparent)", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: "50%", left: 0, height: 2 * s, width: "100%", marginTop: -1 * s, background: "linear-gradient(90deg, transparent, #FFF6D8, transparent)", borderRadius: 2 }} />
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// A LUSH SUNLIT FRUIT-TREE = one business. Green canopy studded with glowing
// honey-gold leads. `cards` swaps the fruit to full LEAD CARDS (the hero tree);
// otherwise dim glow-orbs (the recessive background rows). `locked` -> slate.
// ---------------------------------------------------------------------------
const OrTree: React.FC<{ lf: number; x: number; groundY: number; scale?: number; locked?: number; blur?: number; sd?: number; fruits?: number; glow?: number; z?: number; cards?: number; wakeCards?: number; trunkWaveY?: number; eggIdx?: number; eggName?: string; winkIdx?: number }> = ({ lf, x, groundY, scale = 1, locked = 0, blur = 0, sd = 0, fruits = 6, glow = 1, z = 4, cards = 0, wakeCards, trunkWaveY, eggIdx, eggName, winkIdx }) => {
  const trunkH = 66 * scale, trunkW = 17 * scale, canR = 74 * scale;
  const canCY = groundY - trunkH - canR * 0.5;
  const foli = locked > 0.5 ? "#43474F" : OR_FOLI;
  const foliHi = locked > 0.5 ? OR_SLATE : OR_FOLI_HI;
  const foliLo = locked > 0.5 ? OR_SLATE_LO : OR_FOLI_LO;
  const barkHi = locked > 0.5 ? "#565A63" : "#6A5A3A";
  const barkMid = locked > 0.5 ? "#4C505A" : "#4A4032";
  const barkLo = locked > 0.5 ? "#2C2F36" : "#241B10";
  const sway = idle(lf, 0.9 * scale, 150 + sd * 9, sd);
  const waking = wakeCards !== undefined;
  const wake = waking ? Math.max(0, Math.min(1, wakeCards)) : 1;
  // a broad, full, LAYERED canopy (wide so the hero tree flanks both sides of the
  // frame); the extra low/outer blobs give the crown real depth, not one flat disc.
  const blobs: [number, number, number][] = [[0, 0.06, 1], [-0.66, -0.02, 0.72], [0.66, -0.02, 0.74], [-0.4, -0.42, 0.64], [0.42, -0.4, 0.66], [-0.02, -0.54, 0.62], [0.06, 0.3, 0.72], [-0.52, 0.22, 0.5], [0.54, 0.24, 0.52]];
  // the limbs the cards hang from: real branches fanning up from the trunk into
  // the outer / upper canopy lobes.
  const branchBaseY = groundY - trunkH * 0.52;
  const limbs = blobs.filter(([dx, dy]) => Math.abs(dx) > 0.3 || dy < -0.3);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, filter: blur > 0 ? `blur(${blur}px)` : "none" }}>
      {/* a real dark CONTACT SHADOW where the trunk meets the ground, so the tree
          reads as PLANTED, not floating */}
      <div style={{ position: "absolute", left: x - canR * 0.92, top: groundY - 11 * scale, width: canR * 1.84, height: 24 * scale, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,10,10,0.52), rgba(6,10,10,0.24) 54%, transparent 74%)", filter: "blur(5px)", zIndex: -1 }} />

      {/* THE TEXTURED TRUNK: a flared root base, a barked column with a sun-lit edge,
          a shaded edge, and vertical bark striations, so it is not a flat pill. */}
      <div style={{ position: "absolute", left: x - trunkW * 0.95 + sway * 0.3, top: groundY - trunkH * 0.28, width: trunkW * 1.9, height: trunkH * 0.34, borderRadius: "40% 40% 20% 20%", background: grad(barkMid, barkLo), zIndex: 0 }} />
      <div style={{ position: "absolute", left: x - trunkW / 2 + sway * 0.3, top: groundY - trunkH, width: trunkW, height: trunkH, borderRadius: `${trunkW * 0.4}px ${trunkW * 0.4}px ${trunkW * 0.2}px ${trunkW * 0.2}px`, background: `linear-gradient(90deg, ${barkHi} 0%, ${barkMid} 34%, ${barkMid} 66%, ${barkLo} 100%)`, transformOrigin: "50% 100%", transform: `rotate(${sway * 0.12}deg)`, boxShadow: `inset ${1.4 * scale}px 0 0 rgba(255,232,180,0.14)`, zIndex: 1 }}>
        {[0.26, 0.5, 0.72].map((t, k) => (
          <div key={"bk" + k} style={{ position: "absolute", left: `${t * 100}%`, top: `${6 + k * 4}%`, width: Math.max(1, 1.4 * scale), height: `${74 - k * 8}%`, borderRadius: 2, background: k % 2 ? "rgba(255,232,180,0.10)" : "rgba(18,12,6,0.34)" }} />
        ))}
      </div>

      {/* the light WAVE that travels up the trunk when the tree WAKES (S1) */}
      {trunkWaveY !== undefined && (() => {
        const wp = Math.max(0, Math.min(1, trunkWaveY));
        const wy = groundY - trunkH * wp;
        return (
          <React.Fragment>
            {/* the energised trunk glow below the rising band */}
            <div style={{ position: "absolute", left: x - trunkW * 1.4, top: wy - 6 * scale, width: trunkW * 2.8, height: (groundY - wy) + trunkH * 0.2, background: "linear-gradient(180deg, rgba(255,236,168,0.55), rgba(231,178,76,0.12) 70%, transparent)", borderRadius: trunkW, filter: `blur(${3 * scale}px)`, mixBlendMode: "screen", zIndex: 2 }} />
            {/* the bright travelling band */}
            <div style={{ position: "absolute", left: x - trunkW * 1.9, top: wy - 10 * scale, width: trunkW * 3.8, height: 20 * scale, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,246,214,0.95), rgba(255,224,150,0.4) 46%, transparent 74%)", filter: `blur(${2 * scale}px)`, mixBlendMode: "screen", zIndex: 3 }} />
          </React.Fragment>
        );
      })()}

      {/* THE BRANCH LIMBS, behind the foliage lobes so their tips vanish into leaf */}
      {limbs.map(([dx, dy, s], k) => {
        const tx = x + dx * canR + sway, ty = canCY + dy * canR;
        const bx = x + (dx > 0 ? 1 : -1) * trunkW * 0.22 + sway * 0.3, by = branchBaseY - k * trunkW * 0.16;
        const L = Math.hypot(tx - bx, ty - by), ang = (Math.atan2(ty - by, tx - bx) * 180) / Math.PI;
        const th = Math.max(2.4, trunkW * (0.44 - k * 0.03));
        return <div key={"br" + k} style={{ position: "absolute", left: bx, top: by - th / 2, width: L, height: th, borderRadius: th, background: `linear-gradient(90deg, ${barkMid}, ${barkLo})`, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`, boxShadow: `inset 0 ${Math.max(1, scale)}px 0 rgba(255,232,180,0.12)`, zIndex: 0 }} />;
      })}

      {/* THE LAYERED FOLIAGE LOBES (over the limbs, so branch tips vanish into leaf):
          a top-left sun highlight + an under shadow on each lobe, so the crown has
          light and shade instead of a flat green field. */}
      {blobs.map(([dx, dy, s], k) => (
        <div key={k} style={{ position: "absolute", left: x + dx * canR + sway - canR * s, top: canCY + dy * canR - canR * s, width: canR * 2 * s, height: canR * 2 * s, borderRadius: "50%", background: `radial-gradient(circle at 38% 28%, ${foliHi}, ${foli} 52%, ${foliLo} 100%)`, opacity: 1, boxShadow: `inset -${7 * scale}px -${11 * scale}px ${24 * scale}px ${foliLo}, inset ${9 * scale}px ${11 * scale}px ${28 * scale}px rgba(196,240,164,0.30)`, zIndex: 1 }} />
      ))}

      {/* INDIVIDUAL LEAF CLUSTERS breaking the lobes into real foliage, each with a
          top-left sun edge, so the crown reads as leaves not a flat disc. Only the big
          hero-sized trees (scale > 2) carry this; the recessive rows stay simple. */}
      {scale > 2 && (() => {
        const N = 18;
        return Array.from({ length: N }, (_, k) => {
          const a = seed(k * 2.7 + sd) * Math.PI * 2;
          const rad = canR * (0.34 + seed(k * 1.3 + sd) * 0.74);
          const lx = x + Math.cos(a) * rad * 1.06 + sway;
          const ly = canCY + Math.sin(a) * rad * 0.8 - canR * 0.06;
          const lr = (7 + seed(k * 3.9 + sd) * 8) * scale * 0.5;
          const sunSide = Math.cos(a) < 0.1 && Math.sin(a) < 0.15;         // upper-left = lit
          const lHi = locked > 0.5 ? OR_SLATE : (sunSide ? OR_FOLI_HI : (seed(k + sd) > 0.6 ? OR_FOLI_HI : OR_FOLI));
          const lLo = locked > 0.5 ? OR_SLATE_LO : OR_FOLI_LO;
          const rot = seed(k * 5.1 + sd) * 360 + sway * 0.5;
          return <div key={"lc" + k} style={{ position: "absolute", left: lx - lr / 2, top: ly - lr / 2, width: lr, height: lr * 1.16, borderRadius: "0 100% 34% 100%", background: `radial-gradient(circle at 36% 30%, ${lHi}, ${lLo})`, transform: `rotate(${rot.toFixed(1)}deg)`, boxShadow: `inset -${scale * 0.5}px -${scale}px ${scale * 1.6}px ${lLo}`, opacity: 0.9, zIndex: 1, pointerEvents: "none" }} />;
        });
      })()}

      {/* a soft SUN CRESCENT washing the upper-left of the whole crown (hero only) */}
      {scale > 2 && locked < 0.5 && (
        <div style={{ position: "absolute", left: x - canR * 1.2 + sway, top: canCY - canR * 1.16, width: canR * 2.3, height: canR * 1.6, borderRadius: "50%", background: "radial-gradient(ellipse at 33% 24%, rgba(214,246,178,0.5), rgba(214,246,178,0) 58%)", mixBlendMode: "screen", opacity: 0.62 * glow * wake, zIndex: 2, pointerEvents: "none" }} />
      )}

      {/* DAPPLED SUNLIGHT breaking through the crown on the sun (upper-left) side */}
      {cards > 0 && locked < 0.5 && Array.from({ length: 8 }, (_, k) => {
        const dxp = -0.14 - seed(k * 2.3 + sd) * 0.56, dyp = -0.26 - seed(k * 4.1 + sd) * 0.42;
        const dsz = (9 + seed(k + sd) * 18) * scale * 0.55;
        return <div key={"dp" + k} style={{ position: "absolute", left: x + dxp * canR + sway - dsz / 2, top: canCY + dyp * canR - dsz / 2, width: dsz, height: dsz, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,248,182,0.55), transparent 70%)", opacity: (0.42 + 0.28 * Math.sin(lf / 30 + k)) * glow, mixBlendMode: "screen", zIndex: 2 }} />;
      })}

      {/* the hero canopy carries a soft warm honey underglow from all the leads it
          bears; on WAKE it blooms up; the locked / dim rows stay quiet (hierarchy). */}
      {cards > 0 && locked < 0.5 && (
        <div style={{ position: "absolute", left: x - canR * 1.1 + sway, top: canCY - canR * 0.7, width: canR * 2.2, height: canR * 1.9, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(247,214,140,0.34), rgba(231,178,76,0) 66%)", filter: `blur(${canR * 0.12}px)`, mixBlendMode: "screen", opacity: glow * wake, zIndex: 2 }} />
      )}
      {Array.from({ length: fruits }, (_, i) => {
        if (cards > 0) {
          // spread the cards in a broad oval RING across the canopy, biased wider and
          // lower so the tree reads as one big tree HEAVY with leads (and clear of the
          // header up top). Even angular spacing + a little jitter.
          const a = (i / fruits) * Math.PI * 2 + seed(i * 5.1 + sd) * 0.7;
          const rad = canR * (0.5 + seed(i * 1.7 + sd) * 0.4);
          const fx = x + Math.cos(a) * rad * 1.18 + sway;
          const fy = canCY + Math.sin(a) * rad * 0.72 + canR * 0.3;
          const cs = (0.34 + seed(i * 2.1 + sd) * 0.12) * scale;   // card size scaled to the tree
          const tilt = (seed(i * 4.7 + sd) - 0.5) * 14;
          // WAKE: as the wave passes, each lead perks up (staggered) from dim to lit.
          let perDim = locked > 0.5 ? 1 : 0, perGlow = glow, perPop = 0;
          if (waking) {
            const stag = seed(i * 7.3 + sd);
            const lvl = Math.max(0, Math.min(1, (wake * 1.35 - stag * 0.7) / 0.26));
            perDim = lvl < 0.5 ? 1 : 0;
            perGlow = glow * (0.32 + 0.78 * lvl);
            perPop = Math.max(0, 1 - Math.abs(lvl - 0.5) * 4.2);
          }
          const eName = (eggIdx !== undefined && i === eggIdx) ? eggName : undefined;
          const eWink = (winkIdx !== undefined && i === winkIdx) ? 1 : 0;
          return <OrLeadCard key={i} lf={lf} x={fx} y={fy} s={cs} i={i + sd * 3} glow={perGlow} tilt={tilt} z={z + 1} dim={perDim} pop={perPop} stem={cards > 0 && scale > 1.4 ? 13 : 0} name={eName} wink={eWink} />;
        }
        // cluster fruit toward the lower / outer canopy where they hang heavy
        const a = seed(i * 3.3 + sd) * Math.PI * 2;
        const rr = canR * (0.4 + seed(i * 1.7 + sd) * 0.58);
        const fx = x + Math.cos(a) * rr + sway;
        const fy = canCY + Math.sin(a) * rr * 0.82 + canR * 0.14;
        return <OrGlowFruit key={i} lf={lf} x={fx} y={fy} r={(8.5 + seed(i * 2.1 + sd) * 6) * scale} i={i + sd * 3} locked={locked} glow={glow} />;
      })}

      {/* a few LEAVES drifting down off the crown (hero, unlit only) so the tree breathes */}
      {scale > 2 && locked < 0.5 && Array.from({ length: 3 }, (_, k) => {
        const dur = 152 + k * 42;
        const t = ((lf + k * 58) % dur) / dur;
        const startX = x + (seed(k * 4.3 + sd) - 0.5) * canR * 1.3;
        const fallX = startX + Math.sin(t * Math.PI * 3 + k) * 24 * scale * 0.4 + sway;
        const topY = canCY + canR * 0.24;
        const fallY = topY + t * (groundY - topY);
        const o = Math.min(1, t * 5) * (1 - Math.max(0, (t - 0.82) / 0.18));
        const lr = 9 * scale * 0.5;
        return <div key={"fl" + k} style={{ position: "absolute", left: fallX - lr / 2, top: fallY - lr / 2, width: lr, height: lr * 0.64, borderRadius: "0 100% 30% 100%", background: `radial-gradient(circle at 40% 35%, ${OR_FOLI_HI}, ${OR_FOLI_LO})`, transform: `rotate(${(t * 520 + k * 90).toFixed(0)}deg)`, opacity: o * 0.78, zIndex: 3, pointerEvents: "none" }} />;
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE PERSISTENT LEADS TALLY (retention HUD). A small honey-gold odometer chip
// pinned to the panel's top-right corner that climbs across the WHOLE reel to
// the 512 payoff (the open loop that pulls a viewer to the end). Reuses the S4
// brass + digit-reel look, compact, and stays clear of the captions + top rail.
// ---------------------------------------------------------------------------
// `sc` = scene index, `lf` = that scene's scaled local frame. The end value of
// each scene equals the start of the next, so the number never jumps at a cut,
// and it lands on 512 in sync with S4's big odometer (its COUNT_LAND, lf 56).
const leadsTally = (sc: number, lf: number): { count: number; pop: number } => {
  const ip = (a: number, b: number, c: number, d: number) =>
    interpolate(lf, [a, b], [c, d], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  let count = 0, pop = 0;
  if (sc === 0) count = 0;                                   // hook: locked list, the loop opens at 0
  else if (sc === 1) count = ip(16, 140, 0, 48);            // name -> tree blooms, a few light up
  else if (sc === 2) count = ip(4, 86, 48, 300);           // harvest: climbs fast
  else if (sc === 3) count = ip(8, 214, 300, 440);         // seal / outreach
  else if (sc === 4) { count = ip(4, 56, 440, 512); pop = Math.max(0, over(lf, 56, 3) - over(lf, 62, 16)); }  // lands 512 with a pop
  else if (sc === 5) count = 512;                           // reveal: holds
  else { count = 512; pop = Math.max(0, over(lf, 0, 4) - over(lf, 9, 20)); }                                   // CTA: holds, one last pop
  return { count, pop };
};

const LeadsHud: React.FC<{ lf: number; count: number; pop?: number }> = ({ lf, count, pop = 0 }) => {
  const digits = String(Math.max(0, Math.round(count))).split("");
  const scl = 1 + pop * 0.12;
  const H = 56;
  return (
    <div style={{ position: "absolute", right: 18, top: 14, height: H, zIndex: 72, transform: `scale(${scl.toFixed(3)})`, transformOrigin: "100% 0%", pointerEvents: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 13px", borderRadius: 14, background: grad("#EAC35C", "#7A5B15"), border: "3px solid #3E3008", boxShadow: `0 10px 22px -6px rgba(20,12,4,0.62), inset 0 2px 0 rgba(255,242,198,0.55), 0 0 ${(11 + pop * 30).toFixed(0)}px rgba(231,178,76,${(0.24 + pop * 0.5).toFixed(2)})`, position: "relative", overflow: "hidden" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.14em", color: "#2A1C06" }}>LEADS</div>
        <div style={{ display: "flex", gap: 3 }}>
          {digits.map((d, i) => (
            <div key={i} style={{ width: 22, height: 32, borderRadius: 5, background: "linear-gradient(180deg,#20150A,#0A0602)", border: "2px solid #A8842A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.85)" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, lineHeight: 1, color: "#FFD469", textShadow: "0 0 8px rgba(255,196,80,0.75)", transform: `translateY(${(i === digits.length - 1 ? -(count % 1) * 5 : 0).toFixed(2)}px)` }}>{d}</div>
            </div>
          ))}
        </div>
        {/* a specular crawling the brass so it never sits flat */}
        <div style={{ position: "absolute", left: -30 + ((lf * 2.6) % 210), top: 0, width: 24, height: H, background: "linear-gradient(90deg, transparent, rgba(255,246,214,0.3), transparent)", transform: "skewX(-16deg)", mixBlendMode: "screen" }} />
      </div>
    </div>
  );
};

// EASTER-EGG critters -------------------------------------------------------
// A tiny bluebird that HOPS + shuffles along a branch. Small + soft, so it
// rewards a pause without ever fighting the focal read.
const OrBird: React.FC<{ lf: number; x: number; y: number; s?: number; z?: number; flip?: number }> = ({ lf, x, y, s = 1, z = 17, flip = 1 }) => {
  const cyc = (lf % 64) / 64;
  const hop = Math.max(0, Math.sin(cyc * Math.PI * 2)) * 7 * s;
  const step = (Math.floor(lf / 64) % 6) * 8 * s * flip;
  const bx = x + step, by = y - hop;
  const blink = (lf % 92) < 5 ? 0.3 : 1;
  const bob = Math.sin(lf / 7) * 1.2 * s;
  return (
    <div style={{ position: "absolute", left: bx - 8 * s, top: by - 10 * s, width: 24 * s, height: 22 * s, zIndex: z, transform: `scaleX(${flip})` }}>
      <div style={{ position: "absolute", left: -6 * s, top: 6 * s, width: 10 * s, height: 5 * s, borderRadius: "3px 0 0 3px", background: "#3E6E88", transformOrigin: "100% 50%", transform: `rotate(${(-8 + Math.sin(lf / 6) * 7).toFixed(1)}deg)` }} />
      <div style={{ position: "absolute", left: 0, top: 3 * s, width: 15 * s, height: 12 * s, borderRadius: "60% 70% 60% 60%", background: grad("#6FA8C4", "#3E6E88") }} />
      <div style={{ position: "absolute", left: 3 * s, top: 7 * s, width: 8 * s, height: 7 * s, borderRadius: "50%", background: "#F2E7C8", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 9 * s, top: bob, width: 10 * s, height: 10 * s, borderRadius: "50%", background: grad("#7FB6D0", "#4E7E98") }} />
      <div style={{ position: "absolute", left: 14 * s, top: 3 * s + bob, width: 2.2 * s, height: 2.2 * s * blink, borderRadius: "50%", background: "#12181C" }} />
      <div style={{ position: "absolute", left: 18 * s, top: 4 * s + bob, width: 4 * s, height: 3 * s, background: "#E7B24C", clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
    </div>
  );
};

// A shy critter that PEEKS out from behind the trunk on a slow cycle, then ducks
// back. Placed at a z BELOW the tree so the trunk hides most of it.
const OrTrunkCritter: React.FC<{ lf: number; x: number; y: number; s?: number; z?: number; side?: number }> = ({ lf, x, y, s = 1, z = 15, side = 1 }) => {
  const cyc = (lf % 150) / 150;
  const out = cyc < 0.5 ? Math.max(0, Math.sin(cyc * Math.PI * 2)) : 0;   // eases out, then hides
  if (out < 0.02) return null;
  const dx = side * (9 + out * 17) * s;
  const blink = (lf % 74) < 5 ? 0.2 : 1;
  const bob = Math.sin(lf / 9) * 1.3 * s;
  return (
    <div style={{ position: "absolute", left: x + dx - 12 * s, top: y - 14 * s + bob, width: 24 * s, height: 22 * s, zIndex: z, opacity: Math.min(1, out * 2.4), transform: `scaleX(${side})` }}>
      <div style={{ position: "absolute", left: 3 * s, top: -3 * s, width: 6 * s, height: 8 * s, borderRadius: "50% 50% 40% 40%", background: "#9A7A52" }} />
      <div style={{ position: "absolute", left: 12 * s, top: -3 * s, width: 6 * s, height: 8 * s, borderRadius: "50% 50% 40% 40%", background: "#9A7A52" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 22 * s, height: 20 * s, borderRadius: "50%", background: grad("#B39468", "#7C5F3C") }} />
      <div style={{ position: "absolute", left: 6 * s, top: 9 * s, width: 11 * s, height: 8 * s, borderRadius: "50%", background: "#D9C29A" }} />
      <div style={{ position: "absolute", left: 5 * s, top: 6 * s, width: 3 * s, height: 3.4 * s * blink, borderRadius: "50%", background: "#141414" }} />
      <div style={{ position: "absolute", left: 13 * s, top: 6 * s, width: 3 * s, height: 3.4 * s * blink, borderRadius: "50%", background: "#141414" }} />
      <div style={{ position: "absolute", left: 10 * s, top: 11 * s, width: 3 * s, height: 2.4 * s, borderRadius: "50%", background: "#5A4028" }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE PADLOCK-METER. The Rent-Farmer's one gatekeeping device: a cold slate
// coin-meter head with a shackle that clamps around a free trunk. A gold coin
// slot (that is the toll) and a cold dial. `clamp` 0..1 closes the shackle.
// ---------------------------------------------------------------------------
const OrPadlockMeter: React.FC<{ lf: number; x: number; y: number; trunkW: number; clamp?: number; z?: number }> = ({ lf, x, y, trunkW, clamp = 1, z = 11 }) => {
  const jaw = Math.max(0, Math.min(1, clamp));
  const W = 46, H = 60;
  const tick = Math.floor(lf / 5) * 30;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z }}>
      {/* the shackle ring biting around the trunk */}
      <div style={{ position: "absolute", left: W / 2 - trunkW / 2 - 8, top: H - 12, width: trunkW + 16, height: 22, borderRadius: 12, border: `${5}px solid ${OR_SLATE}`, borderTop: "none", opacity: 0.5 + jaw * 0.5, transform: `scaleX(${0.5 + jaw * 0.5})`, transformOrigin: "50% 0%", boxShadow: `0 2px 5px rgba(4,6,10,0.6)` }} />
      {/* the meter head body, cold slate */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 42, borderRadius: 7, background: grad(OR_SLATE_HI, OR_SLATE_LO), border: `2px solid #23262D`, boxShadow: `0 5px 12px rgba(4,6,10,0.6), inset 0 2px 0 rgba(220,228,238,0.28)` }} />
      {/* the cold dial, ticking, no digits */}
      <div style={{ position: "absolute", left: 7, top: 7, width: 28, height: 28, borderRadius: "50%", background: "#12151B", border: "2px solid #23262D", overflow: "hidden", boxShadow: `inset 0 0 8px ${OR_STEEL}44` }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 13, top: 2, width: 1.5, height: 4, background: "rgba(160,178,196,0.6)", transformOrigin: "50% 12px", transform: `rotate(${i * 45}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 13, top: 5, width: 2, height: 9, background: OR_STEEL, transformOrigin: "50% 100%", transform: `rotate(${tick}deg)`, boxShadow: `0 0 4px ${OR_STEEL}` }} />
      </div>
      {/* the gold coin slot: the toll */}
      <div style={{ position: "absolute", left: W - 12, top: 12, width: 5, height: 18, borderRadius: 2, background: "#241B06", boxShadow: `0 0 5px ${OR_GOLD}, inset 0 0 3px ${OR_GOLD_HI}` }} />
      {/* the post down to the shackle */}
      <div style={{ position: "absolute", left: W / 2 - 5, top: 40, width: 10, height: H - 44, background: grad(OR_SLATE, OR_SLATE_LO) }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE COIN-METER TOWER glowing cold behind the gate: the broker's toll machine.
// A tall slate column, stacked coin-slots and a big cold dial crowning it.
// ---------------------------------------------------------------------------
const OrMeterTower: React.FC<{ lf: number; x: number; baseY: number; h?: number; z?: number }> = ({ lf, x, baseY, h = 300, z = 6 }) => {
  const W = 78;
  const pulse = 0.72 + 0.28 * Math.sin(lf / 26);
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: baseY - h, width: W, height: h, zIndex: z }}>
      {/* cold aura */}
      <div style={{ position: "absolute", left: -W * 0.7, top: -20, width: W * 2.4, height: h + 40, borderRadius: "50%", background: `radial-gradient(ellipse, ${OR_STEEL}, transparent 62%)`, opacity: 0.22 * pulse, filter: "blur(20px)", mixBlendMode: "screen" }} />
      {/* column */}
      <div style={{ position: "absolute", left: 8, top: 46, width: W - 16, height: h - 46, background: grad(OR_SLATE, OR_SLATE_LO), borderRadius: 6, boxShadow: `inset 0 2px 0 rgba(220,228,238,0.22), 0 8px 20px rgba(4,6,10,0.6)` }} />
      <div style={{ position: "absolute", left: 12, top: 46, width: 6, height: h - 46, background: "rgba(220,230,240,0.16)" }} />
      {/* stacked cold coin-slots down the shaft */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: W / 2 - 12, top: 82 + i * 40, width: 24, height: 6, borderRadius: 2, background: "#12151B", boxShadow: `inset 0 0 4px ${OR_STEEL}66, 0 0 4px ${OR_GOLD}55` }} />
      ))}
      {/* the crowning cold dial */}
      <div style={{ position: "absolute", left: W / 2 - 30, top: 0, width: 60, height: 60, borderRadius: "50%", background: grad(OR_SLATE_HI, OR_SLATE_LO), border: "3px solid #23262D", boxShadow: `0 0 18px ${OR_STEEL}${Math.round(pulse * 90).toString(16).padStart(2, "0")}, inset 0 2px 0 rgba(220,228,238,0.3)` }}>
        <div style={{ position: "absolute", left: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#12151B", border: "2px solid #23262D", overflow: "hidden" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 20, top: 3, width: 2, height: 6, background: "rgba(160,178,196,0.6)", transformOrigin: "50% 19px", transform: `rotate(${i * 30}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: 20, top: 8, width: 2.5, height: 15, background: OR_STEEL, transformOrigin: "50% 100%", transform: `rotate(${Math.floor(lf / 4) * 24}deg)`, boxShadow: `0 0 5px ${OR_STEEL}` }} />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE CLAY HERO'S HAND. A warm clay mitt gripping bolt-cutters whose steel jaws
// bite the chain at the padlock. The ONLY clay in the scene. Enters from the
// foreground, then squeezes the cut. `in01` slides it in, `cut` closes the jaws.
// ---------------------------------------------------------------------------
const OrClayHand: React.FC<{ lf: number; x: number; y: number; in01: number; cut: number; z?: number }> = ({ lf, x, y, in01, cut, z = 26 }) => {
  if (in01 <= 0.01) return null;
  const rise = interpolate(in01, [0, 1], [320, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: s0O });
  const pump = in01 >= 0.999 ? Math.sin(lf / 7) * 2 : 0;
  const jaw = 20 * (1 - cut) + 3;           // the steel jaws close as cut -> 1
  const hand = 8 + 8 * (1 - cut);           // the clay handles squeeze with the cut
  // the whole tool, jaw tips at local (0,0), tilted so it enters from lower-left
  return (
    <div style={{ position: "absolute", left: x, top: y + rise + pump, width: 2, height: 2, zIndex: z, transformOrigin: "0 0", transform: `rotate(-24deg)` }}>
      {/* the two steel cutter jaws, a V that bites the chain link above */}
      <div style={{ position: "absolute", left: -5, top: -46, width: 12, height: 48, borderRadius: "5px 5px 3px 3px", background: grad("#E2E7EC", "#79838E"), transformOrigin: "50% 100%", transform: `rotate(${jaw}deg)`, boxShadow: "0 2px 5px rgba(4,6,10,0.5)" }} />
      <div style={{ position: "absolute", left: -5, top: -46, width: 12, height: 48, borderRadius: "5px 5px 3px 3px", background: grad("#E2E7EC", "#79838E"), transformOrigin: "50% 100%", transform: `rotate(${-jaw}deg)`, boxShadow: "0 2px 5px rgba(4,6,10,0.5)" }} />
      {/* the pivot bolt */}
      <div style={{ position: "absolute", left: -11, top: -12, width: 22, height: 22, borderRadius: "50%", background: grad("#C2CBD4", "#69737E"), border: "2px solid #4A525B" }} />
      <div style={{ position: "absolute", left: -3, top: -4, width: 6, height: 6, borderRadius: "50%", background: "#3A424B" }} />
      {/* the two long clay handles going down to the fist */}
      <div style={{ position: "absolute", left: -11, top: 2, width: 22, height: 190, borderRadius: 11, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "50% 4px", transform: `rotate(${hand}deg)`, boxShadow: "0 8px 20px rgba(6,8,14,0.5)" }} />
      <div style={{ position: "absolute", left: -11, top: 2, width: 22, height: 190, borderRadius: 11, background: grad(OR_CLAY, OR_CLAY_LO), transformOrigin: "50% 4px", transform: `rotate(${-hand}deg)`, boxShadow: "0 8px 20px rgba(6,8,14,0.5)" }} />
      {/* a tidy clay grip collar clasping the two handles where they meet (NO fist,
          no fingers): a single rounded band so it reads as clean bolt-cutters. */}
      <div style={{ position: "absolute", left: -15, top: 150, width: 30, height: 26, borderRadius: 9, background: grad(OR_CLAY_HI, OR_CLAY_LO), boxShadow: "inset 0 2px 0 rgba(255,214,180,0.35), 0 4px 10px rgba(6,8,14,0.45)", zIndex: 3 }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// A HANGING PENDANT GROW-LANTERN. A cord from a roof rib to a caged warm bulb,
// throwing a soft volumetric cone and a warm halo. Ambient warm-white light (not
// clay, not the gold fruit-signal) so it stays a light source, not a subject.
// ---------------------------------------------------------------------------
const OrLantern: React.FC<{ lf: number; x: number; topY: number; y: number; s?: number; glow?: number; z?: number }> = ({ lf, x, topY, y, s = 1, glow = 1, z = 6 }) => {
  const flick = 0.85 + 0.15 * Math.sin(lf / 6 + x * 0.03) + 0.05 * Math.sin(lf / 2.3 + x);
  const cage = 26 * s, bulb = 15 * s;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, pointerEvents: "none" }}>
      {/* the warm volumetric cone falling from the lantern through the mist */}
      <div style={{ position: "absolute", left: x - 46 * s, top: y + cage, width: 92 * s, height: 420 * s, background: `linear-gradient(180deg, rgba(245,228,180,${(0.15 * glow).toFixed(3)}), transparent 80%)`, clipPath: "polygon(36% 0, 64% 0, 100% 100%, 0 100%)", filter: `blur(${7 * s}px)`, mixBlendMode: "screen", opacity: flick }} />
      {/* the cord up to the roof */}
      <div style={{ position: "absolute", left: x - 1, top: topY, width: 2, height: y - topY, background: "rgba(18,24,30,0.85)" }} />
      {/* the iron cap + finial */}
      <div style={{ position: "absolute", left: x - 7 * s, top: y - 12 * s, width: 14 * s, height: 9 * s, borderRadius: "4px 4px 0 0", background: grad(OR_IRON_HI, OR_IRON) }} />
      {/* the warm halo */}
      <div style={{ position: "absolute", left: x - cage * 1.7, top: y - cage * 1.4, width: cage * 3.4, height: cage * 3.4, borderRadius: "50%", background: `radial-gradient(circle, ${OR_LAMP}, transparent 62%)`, opacity: 0.5 * glow * flick, filter: `blur(${cage * 0.42}px)`, mixBlendMode: "screen" }} />
      {/* the glass bell */}
      <div style={{ position: "absolute", left: x - cage / 2, top: y - 2 * s, width: cage, height: cage * 1.14, borderRadius: "46% 46% 40% 40%", background: "radial-gradient(circle at 50% 34%, rgba(245,228,180,0.5), rgba(120,110,80,0.14) 72%)", border: "1.5px solid rgba(38,44,52,0.9)", boxShadow: `inset 0 0 ${cage * 0.5}px ${OR_LAMP}` }} />
      {/* the caged bulb */}
      <div style={{ position: "absolute", left: x - bulb / 2, top: y + cage * 0.22, width: bulb, height: bulb, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, #FFF7DE, ${OR_LAMP} 55%, #C79A46 100%)`, boxShadow: `0 0 ${bulb * 1.5}px ${OR_LAMP}`, opacity: flick }} />
      <div style={{ position: "absolute", left: x - cage / 2, top: y + cage * 0.42, width: cage, height: 1.4, background: "rgba(28,34,40,0.7)" }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// A TERRACOTTA PLANTER with a low dim shrub. Deliberately a DARK, desaturated
// terracotta so it never competes with Claude's warm clay.
// ---------------------------------------------------------------------------
const OrPlanter: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => {
  const W = 78 * s, H = 66 * s;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
      {/* the small dim shrub crowning the pot */}
      {([[-0.24, 0.9], [0.2, 1], [-0.02, 0.72]] as [number, number][]).map(([dx, ss], i) => (
        <div key={i} style={{ position: "absolute", left: W / 2 + dx * W * 0.42 - 17 * s * ss, top: -16 * s, width: 34 * s * ss, height: 34 * s * ss, borderRadius: "50%", background: `radial-gradient(circle at 40% 32%, ${OR_FOLI_HI}, ${OR_FOLI} 55%, ${OR_FOLI_LO})` }} />
      ))}
      {/* the rim */}
      <div style={{ position: "absolute", left: -4, top: 4 * s, width: W + 8, height: 15 * s, borderRadius: 5, background: grad(OR_TERRA_HI, OR_TERRA), boxShadow: `inset 0 2px 0 rgba(255,200,150,0.14)` }} />
      {/* the tapered body */}
      <div style={{ position: "absolute", left: 6 * s, top: 15 * s, width: W - 12 * s, height: H - 16 * s, background: grad(OR_TERRA, OR_TERRA_LO), clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)", boxShadow: `inset -9px -8px 20px ${OR_TERRA_LO}, 0 12px 22px rgba(4,6,10,0.5)` }} />
      <div style={{ position: "absolute", left: 8 * s, top: 12 * s, width: W - 16 * s, height: 11 * s, borderRadius: "50%", background: "#20140E" }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// A STACK OF SPENT WOODEN CRATES, tucked off to one side (the empty baskets that
// quietly foreshadow the harvest). Dim, in shadow.
// ---------------------------------------------------------------------------
const OrCrate: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => {
  const box = (key: string, bx: number, by: number, bs: number) => {
    const W = 92 * s * bs, Hh = W * 0.7;
    return (
      <div key={key} style={{ position: "absolute", left: bx, top: by, width: W, height: Hh }}>
        <div style={{ position: "absolute", inset: 0, background: grad(OR_WOOD_HI, OR_WOOD), borderRadius: 4, boxShadow: `inset 0 0 0 3px ${OR_WOOD}, 0 12px 22px rgba(4,6,10,0.55)` }} />
        {[0.26, 0.54, 0.82].map((t, i) => (<div key={"h" + i} style={{ position: "absolute", left: 0, top: `${t * 100}%`, width: "100%", height: 3, background: "rgba(18,12,6,0.5)" }} />))}
        {[0.3, 0.7].map((t, i) => (<div key={"v" + i} style={{ position: "absolute", left: `${t * 100}%`, top: 0, width: 3, height: "100%", background: "rgba(18,12,6,0.42)" }} />))}
        <div style={{ position: "absolute", left: "8%", top: "-9%", width: "84%", height: "22%", background: "#160D07", borderRadius: 3, transform: "skewX(-3deg)" }} />
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
      {box("b0", -96 * s, -46 * s, 1)}
      {box("b1", 6 * s, -40 * s, 0.9)}
      {box("b2", -58 * s, -118 * s, 0.84)}
    </div>
  );
};

// ---------------------------------------------------------------------------
// A CLIMBING VINE trailing down the iron frame. `sil` renders it as a dark
// near-foreground silhouette that frames an edge of the shot.
// ---------------------------------------------------------------------------
const OrVine: React.FC<{ lf: number; x: number; y: number; len: number; s?: number; z?: number; sil?: number; sd?: number }> = ({ lf, x, y, len, s = 1, z = 8, sil = 0, sd = 0 }) => {
  const n = Math.max(3, Math.round(len / 34));
  const foli = sil ? "#080F0B" : OR_FOLI;
  const foliHi = sil ? "#101C15" : OR_FOLI_HI;
  const stem = sil ? "#070D0A" : grad("#2A3A2E", "#182219");
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, pointerEvents: "none" }}>
      {Array.from({ length: n }, (_, i) => {
        const t = i / n;
        const sway = idle(lf, 2.6 * s, 180 + sd * 10, sd + i) * (sil ? 1.7 : 1);
        const px = x + Math.sin(t * 6.2 + sd) * 24 * s + sway;
        const py = y + t * len;
        const lr = (11 + seed(i * 1.3 + sd) * 11) * s;
        const side = i % 2 ? 1 : -1;
        return (
          <React.Fragment key={i}>
            {i < n - 1 && <div style={{ position: "absolute", left: px - 1.6, top: py, width: 3.2 * s, height: (len / n + 6) * 1.02, background: stem, transformOrigin: "50% 0", transform: `rotate(${Math.sin(t * 6.2 + sd) * 11}deg)` }} />}
            <div style={{ position: "absolute", left: px + side * 11 * s - lr / 2, top: py + 6 * s, width: lr, height: lr * 0.66, borderRadius: "0 80% 20% 80%", background: `radial-gradient(circle at 40% 35%, ${foliHi}, ${foli})`, transform: `rotate(${side * 42}deg)` }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ===========================================================================
// DENSE GARDEN DRESSING. A kit of crafted props for filling every empty zone.
// All are DIM / DESATURATED and get blurred in the recessive tiers so they
// dress the room without ever competing with the focal tag / gate / villain.
// ===========================================================================

// a low dressed-STONE knee-wall running the width, with offset courses + moss.
const OrKneeWall: React.FC<{ x: number; y: number; w: number; h?: number; z?: number; blur?: number }> = ({ x, y, w, h = 78, z = 2, blur = 0 }) => {
  const courses = 4, bh = h / courses, bw = 68;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: grad(OR_STONEW, OR_STONEW_LO) }} />
      {Array.from({ length: courses }, (_, r) => {
        const off = (r % 2) * (bw / 2);
        return Array.from({ length: Math.ceil(w / bw) + 1 }, (_, c) => {
          const tint = 0.55 + seed(r * 3.1 + c * 1.7) * 0.5;
          return <div key={r + "_" + c} style={{ position: "absolute", left: c * bw - off + 1.5, top: r * bh + 1.5, width: bw - 3, height: bh - 3, background: grad(`rgba(${Math.round(66 * tint)},${Math.round(76 * tint)},${Math.round(66 * tint)},1)`, OR_STONEW_LO), borderRadius: 2, boxShadow: "inset 0 1px 0 rgba(184,196,184,0.12), inset 0 -3px 5px rgba(0,0,0,0.35)" }} />;
        });
      })}
      <div style={{ position: "absolute", left: -4, top: -7, width: w + 8, height: 11, background: grad(OR_STONEW_HI, OR_STONEW), borderRadius: 2 }} />
      {Array.from({ length: Math.round(w / 34) }, (_, i) => <div key={"m" + i} style={{ position: "absolute", left: seed(i * 2.3) * w, top: seed(i * 3.7) * h, width: 10 + seed(i) * 18, height: 6 + seed(i * 1.3) * 9, borderRadius: "50%", background: `radial-gradient(ellipse, ${OR_MOSS}, transparent 72%)`, opacity: 0.72 }} />)}
    </div>
  );
};

// a swagged string of warm FAIRY-LIGHTS strung between two roof anchors.
const OrFairyLights: React.FC<{ lf: number; x0: number; y0: number; x1: number; y1: number; sag?: number; n?: number; z?: number; glow?: number }> = ({ lf, x0, y0, x1, y1, sag = 90, n = 15, z = 5, glow = 1 }) => {
  const py = (t: number) => y0 + (y1 - y0) * t + Math.sin(Math.PI * t) * sag;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), bx = x0 + (x1 - x0) * t, by = py(t);
    const fl = 0.55 + 0.45 * Math.sin(lf / 5 + i * 1.3);
    return <React.Fragment key={i}>
      {i < n - 1 && OrLine("flw" + x0 + i, bx, by, x0 + (x1 - x0) * ((i + 1) / (n - 1)), py((i + 1) / (n - 1)), 1.4, "rgba(18,24,28,0.7)", z)}
      <div style={{ position: "absolute", left: bx - 4, top: by - 3, width: 9, height: 9, borderRadius: "50%", background: `radial-gradient(circle, #FFF3CE, ${OR_LAMP} 60%, transparent)`, boxShadow: `0 0 7px ${OR_LAMP}`, opacity: (0.45 + 0.55 * fl) * glow, zIndex: z + 1, pointerEvents: "none" }} />
    </React.Fragment>;
  })}</>);
};

// a mat of climbing IVY over a region. `sil` makes it a near-foreground silhouette.
const OrIvy: React.FC<{ lf: number; x: number; y: number; w: number; h: number; n?: number; s?: number; z?: number; blur?: number; sil?: number; sd?: number }> = ({ lf, x, y, w, h, n = 34, s = 1, z = 8, blur = 0, sil = 0, sd = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
    {Array.from({ length: n }, (_, i) => {
      const px = seed(i * 2.3 + sd) * w, pyy = seed(i * 3.7 + sd) * h;
      const lr = (10 + seed(i * 1.9 + sd) * 13) * s;
      const foli = sil ? "#0A130D" : (seed(i + sd) > 0.5 ? OR_FOLI : OR_FOLI_LO);
      const foliHi = sil ? "#0F1B13" : OR_FOLI_HI;
      const sway = idle(lf, 1.5, 200 + i * 5, i + sd);
      return <div key={i} style={{ position: "absolute", left: px + sway, top: pyy, width: lr, height: lr, borderRadius: "0 100% 30% 100%", background: `radial-gradient(circle at 38% 34%, ${foliHi}, ${foli})`, transform: `rotate(${seed(i * 5 + sd) * 360}deg)`, boxShadow: `inset -2px -3px 4px ${OR_FOLI_LO}` }} />;
    })}
  </div>
);

// a trailing HANGING PLANT from a small basket.
const OrHangingPlant: React.FC<{ lf: number; x: number; y: number; len: number; strands?: number; s?: number; z?: number; blur?: number }> = ({ lf, x, y, len, strands = 5, s = 1, z = 8, blur = 0 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: x - 2, top: y - 60 * s, width: 4, height: 60 * s, background: "rgba(18,24,30,0.8)" }} />
    <div style={{ position: "absolute", left: x - 26 * s, top: y - 20 * s, width: 52 * s, height: 24 * s, borderRadius: "8px 8px 22px 22px", background: grad(OR_TERRA, OR_TERRA_LO), boxShadow: `inset 0 3px 0 ${OR_TERRA_HI}` }} />
    {Array.from({ length: strands }, (_, k) => {
      const sx = x - 22 * s + k * (44 * s / (strands - 1)), swing = idle(lf, 3 * s, 160 + k * 20, k), m = 5;
      return Array.from({ length: m }, (_, i) => {
        const t = (i + 1) / m, px = sx + Math.sin(t * 3 + k) * 10 * s + swing * t, pyy = y + t * len, lr = (7 + seed(i + k) * 6) * s;
        return <div key={k + "_" + i} style={{ position: "absolute", left: px - lr / 2, top: pyy, width: lr, height: lr * 1.3, borderRadius: "50%", background: `radial-gradient(circle at 40% 30%, ${OR_FOLI_HI}, ${OR_FOLI})` }} />;
      });
    })}
  </div>
);

// a hanging FERN BASKET with drooping fronds.
const OrFernBasket: React.FC<{ lf: number; x: number; topY: number; y: number; s?: number; z?: number; blur?: number }> = ({ lf, x, topY, y, s = 1, z = 6, blur = 0 }) => {
  const swing = idle(lf, 2.4 * s, 150, x);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
      {[-1, 0, 1].map(d => <div key={d} style={{ position: "absolute", left: x + d * 20 * s, top: topY, width: 1.6, height: y - topY, background: "rgba(18,24,30,0.75)", transformOrigin: "50% 0", transform: `rotate(${d * 6}deg)` }} />)}
      <div style={{ position: "absolute", left: x - 30 * s + swing, top: y - 6 * s, width: 60 * s, height: 26 * s, borderRadius: "10px 10px 26px 26px", background: grad("#4B4234", "#2C2618"), boxShadow: "0 8px 14px rgba(4,6,10,0.5)" }} />
      {Array.from({ length: 11 }, (_, i) => {
        const a = (i / 10 - 0.5) * Math.PI * 1.1, fr = (34 + seed(i) * 26) * s;
        return <div key={i} style={{ position: "absolute", left: x + swing, top: y + 6 * s, width: 5 * s, height: fr, borderRadius: 3, background: grad(OR_FOLI_HI, OR_FOLI_LO), transformOrigin: "50% 0", transform: `rotate(${a * 180 / Math.PI}deg)`, opacity: 0.92 }} />;
      })}
    </div>
  );
};

// a POTTING BENCH: plank top with pots, spilled soil + a trowel; a sack beneath.
const OrPottingBench: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => {
  const W = 158 * s, H = 96 * s;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 10 * s, top: 32 * s, width: 10 * s, height: H - 32 * s, background: grad(OR_WOOD_HI, OR_WOOD) }} />
      <div style={{ position: "absolute", left: W - 20 * s, top: 32 * s, width: 10 * s, height: H - 32 * s, background: grad(OR_WOOD_HI, OR_WOOD) }} />
      <div style={{ position: "absolute", left: 6 * s, top: H - 28 * s, width: W - 12 * s, height: 8 * s, background: OR_WOOD }} />
      <div style={{ position: "absolute", left: 20 * s, top: H - 46 * s, width: 46 * s, height: 24 * s, borderRadius: "12px 10px 5px 5px", background: grad(OR_BURLAP, "#332C1E") }} />
      <div style={{ position: "absolute", left: 84 * s, top: H - 44 * s, width: 40 * s, height: 22 * s, background: "#241812", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 0, top: 24 * s, width: W, height: 13 * s, background: grad(OR_WOOD_HI, OR_WOOD), borderRadius: 2, boxShadow: "0 8px 16px rgba(4,6,10,0.5)" }} />
      <div style={{ position: "absolute", left: 3 * s, top: 0, width: W - 6 * s, height: 26 * s, background: grad("#3E2E1C", OR_WOOD), borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 24 * s, top: 4 * s, width: 26 * s, height: 22 * s, background: grad(OR_TERRA, OR_TERRA_LO), clipPath: "polygon(8% 0,92% 0,82% 100%,18% 100%)" }} />
      <div style={{ position: "absolute", left: 58 * s, top: 8 * s, width: 22 * s, height: 18 * s, background: grad(OR_TERRA, OR_TERRA_LO), clipPath: "polygon(8% 0,92% 0,82% 100%,18% 100%)" }} />
      <div style={{ position: "absolute", left: 90 * s, top: 15 * s, width: 48 * s, height: 12 * s, borderRadius: "50%", background: "#241812" }} />
      <div style={{ position: "absolute", left: 112 * s, top: 2 * s, width: 6 * s, height: 22 * s, background: OR_WOOD_HI, transform: "rotate(26deg)", transformOrigin: "50% 100%" }} />
      <div style={{ position: "absolute", left: 118 * s, top: -2 * s, width: 14 * s, height: 14 * s, borderRadius: "50% 50% 50% 0", background: grad(OR_BRONZE_HI, OR_BRONZE), transform: "rotate(26deg)" }} />
    </div>
  );
};

// a wall SHELF of small pots bracketed to the iron frame.
const OrWallShelf: React.FC<{ x: number; y: number; w: number; s?: number; z?: number; blur?: number }> = ({ x, y, w, s = 1, z = 8, blur = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 60 * s, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: 0, top: 34 * s, width: w, height: 10 * s, background: grad(OR_WOOD_HI, OR_WOOD), borderRadius: 2, boxShadow: "0 6px 12px rgba(4,6,10,0.5)" }} />
    {[0, 1].map(b => <div key={b} style={{ position: "absolute", left: b ? w - 10 * s : 4 * s, top: 44 * s, width: 6 * s, height: 20 * s, background: OR_IRON }} />)}
    {Array.from({ length: Math.max(2, Math.round(w / (30 * s))) }, (_, i) => {
      const pw = (17 + seed(i * 3) * 8) * s;
      return <div key={i} style={{ position: "absolute", left: 8 * s + i * 30 * s, top: 34 * s - pw * 0.9, width: pw, height: pw * 0.9, background: grad(OR_TERRA, OR_TERRA_LO), clipPath: "polygon(6% 0,94% 0,84% 100%,16% 100%)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 4 * s, background: OR_TERRA_HI }} />
      </div>;
    })}
  </div>
);

// a galvanised WATERING CAN (warm bronze metal, never slate).
const OrWateringCan: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number; flip?: number }> = ({ x, y, s = 1, z = 8, blur = 0, flip = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none", transform: `scaleX(${flip})`, transformOrigin: "0 100%" }}>
    <div style={{ position: "absolute", left: -34 * s, top: -46 * s, width: 60 * s, height: 46 * s, borderRadius: "10px 10px 14px 14px", background: grad(OR_BRONZE_HI, OR_BRONZE), boxShadow: "inset 0 3px 0 rgba(255,240,200,0.12), 0 8px 16px rgba(4,6,10,0.5)" }} />
    <div style={{ position: "absolute", left: 18 * s, top: -50 * s, width: 46 * s, height: 8 * s, borderRadius: 4, background: grad(OR_BRONZE_HI, OR_BRONZE), transform: "rotate(-26deg)", transformOrigin: "0 50%" }} />
    <div style={{ position: "absolute", left: 54 * s, top: -80 * s, width: 17 * s, height: 13 * s, borderRadius: "50%", background: OR_BRONZE, transform: "rotate(-26deg)" }} />
    <div style={{ position: "absolute", left: -30 * s, top: -68 * s, width: 40 * s, height: 26 * s, borderRadius: "50%", border: `${5 * s}px solid ${OR_BRONZE}`, borderBottom: "none" }} />
  </div>
);

// a coiled garden HOSE (dark rubber) with a bronze nozzle.
const OrHose: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
    {[0, 1, 2, 3].map(i => { const r = (58 - i * 11) * s; return <div key={i} style={{ position: "absolute", left: -r, top: -r * 0.5, width: r * 2, height: r, borderRadius: "50%", border: `${8 * s}px solid ${i % 2 ? "#28372D" : "#1E2C24"}`, boxShadow: "inset 0 2px 3px rgba(0,0,0,0.4)" }} />; })}
    <div style={{ position: "absolute", left: 40 * s, top: -30 * s, width: 26 * s, height: 8 * s, borderRadius: 4, background: grad(OR_BRONZE_HI, OR_BRONZE), transform: "rotate(30deg)" }} />
  </div>
);

// stacked COMPOST / SOIL SACKS.
const OrSoilBags: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
    {([[-72, -4, 1], [10, 0, 0.94], [-36, -66, 0.9]] as [number, number, number][]).map(([bx, by, bs], i) => (
      <div key={i} style={{ position: "absolute", left: bx * s, top: (by - 58 * bs) * s, width: 80 * s * bs, height: 60 * s * bs, borderRadius: "26px 20px 22px 18px", background: grad(i === 2 ? OR_BURLAP_HI : OR_BURLAP, "#332C1E"), boxShadow: "inset 0 6px 0 rgba(255,240,200,0.06), 0 8px 16px rgba(4,6,10,0.5)" }}>
        <div style={{ position: "absolute", left: "36%", top: -6 * s, width: "28%", height: 10 * s, borderRadius: 6, background: "#2A2418" }} />
        <div style={{ position: "absolute", left: "30%", top: "40%", width: "40%", height: "26%", borderRadius: 3, background: "rgba(28,24,14,0.5)" }} />
      </div>
    ))}
  </div>
);

// a SEED TRAY of cells with tiny sprouts.
const OrSeedTray: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number }> = ({ x, y, s = 1, z = 8, blur = 0 }) => {
  const W = 92 * s, H = 26 * s, cols = 6, rows = 2;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: grad("#3A3222", "#241E14"), borderRadius: 4, boxShadow: "0 6px 12px rgba(4,6,10,0.5)" }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cw = (W - 8 * s) / cols, ch = (H - 8 * s) / rows;
        return <div key={i} style={{ position: "absolute", left: 4 * s + (i % cols) * cw, top: 4 * s + Math.floor(i / cols) * ch, width: cw - 2, height: ch - 2, background: "#1C160E", borderRadius: 2 }}>
          <div style={{ position: "absolute", left: "42%", top: -4 * s, width: 2, height: 6 * s, background: OR_FOLI_HI }} />
        </div>;
      })}
    </div>
  );
};

// a leaning garden TOOL (kind 0 = spade, 1 = rake). Pivots at its floor contact.
const OrTool: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number; kind?: number; tilt?: number }> = ({ x, y, s = 1, z = 8, blur = 0, kind = 0, tilt = -15 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none", transformOrigin: "0 100%", transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: "absolute", left: -4 * s, top: -256 * s, width: 8 * s, height: 256 * s, borderRadius: 4, background: grad(OR_WOOD_HI, OR_WOOD) }} />
    {kind === 0 ? (
      <div style={{ position: "absolute", left: -15 * s, top: -6 * s, width: 30 * s, height: 50 * s, borderRadius: "6px 6px 14px 14px", background: grad(OR_BRONZE_HI, OR_BRONZE) }} />
    ) : (
      <>
        <div style={{ position: "absolute", left: -28 * s, top: 0, width: 56 * s, height: 8 * s, background: OR_BRONZE }} />
        {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: -25 * s + i * 10 * s, top: 4 * s, width: 4 * s, height: 24 * s, background: OR_BRONZE }} />)}
      </>
    )}
  </div>
);

// a WHEELBARROW with a soil mound.
const OrWheelbarrow: React.FC<{ x: number; y: number; s?: number; z?: number; blur?: number; flip?: number }> = ({ x, y, s = 1, z = 8, blur = 0, flip = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none", transform: `scaleX(${flip})`, transformOrigin: "0 100%" }}>
    <div style={{ position: "absolute", left: -70 * s, top: -70 * s, width: 150 * s, height: 52 * s, background: grad(OR_BRONZE_HI, OR_BRONZE), clipPath: "polygon(6% 0, 100% 0, 84% 100%, 22% 100%)", boxShadow: "inset 0 4px 0 rgba(255,240,200,0.1), 0 10px 18px rgba(4,6,10,0.5)" }} />
    <div style={{ position: "absolute", left: -50 * s, top: -78 * s, width: 110 * s, height: 20 * s, borderRadius: "50%", background: "#241812" }} />
    <div style={{ position: "absolute", left: -66 * s, top: -18 * s, width: 8 * s, height: 30 * s, background: OR_WOOD }} />
    <div style={{ position: "absolute", left: 60 * s, top: -66 * s, width: 46 * s, height: 7 * s, background: grad(OR_WOOD_HI, OR_WOOD), transform: "rotate(8deg)" }} />
    <div style={{ position: "absolute", left: -74 * s, top: -34 * s, width: 40 * s, height: 40 * s, borderRadius: "50%", background: grad("#2A2E33", OR_IRON), border: `${5 * s}px solid #14181D` }}>
      <div style={{ position: "absolute", left: "38%", top: "38%", width: "24%", height: "24%", borderRadius: "50%", background: OR_BRONZE }} />
    </div>
  </div>
);

// a small DRIFTING BUTTERFLY (warm honey / amber wings, gently flapping), kept
// soft + recessive so it dresses the sunny air without pulling the eye.
const OrButterfly: React.FC<{ lf: number; x: number; y: number; s?: number; z?: number; hue?: string; sd?: number }> = ({ lf, x, y, s = 1, z = 8, hue = "#E7B24C", sd = 0 }) => {
  const drift = Math.sin(lf / (34 + sd * 7) + sd) * 40 * s + lf * 0.3 * s;
  const rise = Math.sin(lf / (26 + sd * 5) + sd * 2) * 22 * s;
  const flap = 0.4 + 0.6 * Math.abs(Math.sin(lf / 3.4 + sd));
  const wing = 12 * s;
  return (
    <div style={{ position: "absolute", left: x + drift, top: y + rise, width: 1, height: 1, zIndex: z, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -1 * s, top: -wing * 0.7, width: 2 * s, height: wing * 1.4, borderRadius: 2, background: "#2A1E10" }} />
      {[-1, 1].map((d) => (
        <div key={d} style={{ position: "absolute", left: 0, top: -wing * 0.6, width: wing, height: wing * 1.2, borderRadius: "60% 40% 60% 40%", background: `radial-gradient(circle at 40% 40%, ${hue}, #A9781F)`, transformOrigin: d < 0 ? "100% 50%" : "0% 50%", transform: `scaleX(${d * flap}) rotate(${d * 6}deg)`, opacity: 0.82, boxShadow: "inset 0 0 3px rgba(60,40,10,0.5)" }} />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// THE NIGHT GREENHOUSE backdrop. A deep VICTORIAN GLASS-AND-IRON glasshouse seen
// from inside: a vaulted glass roof whose iron ribs recede to a misted vanishing
// point, a deep-navy night sky + moon + stars showing THROUGH the panes, an
// arched glazed gable at the back of the nave, glazed side walls, and a warm
// tiled floor giving back the fruit-glow. Far tier is dim, cool and blurred so
// the gate + $2,000 tag + Rent-Farmer keep the frame.
// ---------------------------------------------------------------------------
const OrGlasshouseBg: React.FC<{ lf: number }> = ({ lf }) => {
  const sunBreath = 0.9 + 0.1 * Math.sin(lf / 60);
  const mist = (i: number) => (seed(i * 8.3) * 2000 + lf * (0.35 + seed(i) * 0.5)) % 2200 - 250;
  return (
    <>
      {/* the DAY wash: bright BLUE sky up top through the glass roof, warming into a
          sunlit haze band, then the lush green sunny conservatory interior below */}
      <div style={{ position: "absolute", left: -420, top: -440, width: 2260, height: 2020, background: "linear-gradient(180deg, #4E9ED0 0%, #6FB6E0 12%, #9AD2EE 22%, #CDEBEF 33%, #E9F3D8 41%, #BCE0A6 52%, #8FC97E 66%, #6BB067 82%, #4F9457 100%)", zIndex: 0 }} />

      {/* THE SUN high in the roof glass (top right), a warm bright disc + bloom */}
      <div style={{ position: "absolute", left: 1120 - 300, top: 240 - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,246,210,${(0.5 * sunBreath).toFixed(3)}), rgba(255,240,190,0.12) 40%, transparent 68%)`, filter: "blur(24px)", mixBlendMode: "screen", zIndex: 0 }} />
      <div style={{ position: "absolute", left: 1120 - 66, top: 240 - 66, width: 132, height: 132, borderRadius: "50%", background: `radial-gradient(circle at 46% 42%, #FFFFFF, ${OR_SUN} 46%, rgba(255,232,168,0.5) 78%, transparent 100%)`, boxShadow: `0 0 90px rgba(255,244,200,0.85)`, opacity: 0.96 * sunBreath, zIndex: 0 }} />
      {/* long soft god-ray shafts fanning down from the sun */}
      {Array.from({ length: 5 }, (_, i) => {
        const ang = -34 + i * 9;
        return <div key={"gray" + i} style={{ position: "absolute", left: 1120, top: 240, width: 60 + i * 14, height: 1200, transformOrigin: "50% 0%", transform: `rotate(${ang}deg)`, background: "linear-gradient(180deg, rgba(255,246,206,0.16), transparent 66%)", filter: "blur(14px)", mixBlendMode: "screen", opacity: 0.7 * sunBreath, zIndex: 1 }} />;
      })}

      {/* THE VAULTED GLASS ROOF. White iron ribs fan down the nave to a short ridge
          over the VP; horizontal purlins step back; glass panes catch the blue sky. */}
      {/* per-pane sky-blue tint quads, scattered so no pane is a flat field */}
      {Array.from({ length: 60 }, (_, i) => {
        const gx = -280 + seed(i * 2.7) * 2000, gy = -360 + seed(i * 4.3) * 840;
        const gw = 54 + seed(i * 1.9) * 120, gh = 30 + seed(i * 3.1) * 70;
        const warm = (gx > 860 && gy < 300) ? 1 : 0;               // panes near the sun read warmer
        const a = 0.05 + seed(i * 5.1) * 0.08;
        const col = warm ? `rgba(255,248,214,${a.toFixed(3)})` : `rgba(${168 + Math.round(seed(i) * 40)},${208 + Math.round(seed(i * 2) * 30)},${234 + Math.round(seed(i * 3) * 18)},${a.toFixed(3)})`;
        return <div key={"gp" + i} style={{ position: "absolute", left: gx, top: gy, width: gw, height: gh, background: col, borderRadius: 2, zIndex: 1 }} />;
      })}
      {/* the ribs: a dense fan meeting a short ridge over the VP */}
      {Array.from({ length: 30 }, (_, i) => {
        const t = i / 29; const bx = -320 + t * 2060;
        const rx = OR_VPX - 96 + t * 192;
        const bright = Math.abs(t - 0.5) < 0.05 ? 0.42 : (i % 2 ? 0.14 : 0.24);
        return OrLine("rib" + i, bx, -420, rx, OR_VPY, i % 2 ? 1.8 : 2.6, `rgba(255,252,244,${bright})`, 1);
      })}
      {/* the central RIDGE beam, brighter white iron */}
      {OrLine("ridge", OR_VPX, -420, OR_VPX, OR_VPY, 3.6, `rgba(255,255,250,0.5)`, 1)}
      {/* the horizontal purlins stepping back, dense so the glazing reads as panes */}
      {Array.from({ length: 15 }, (_, i) => {
        const t = i / 14; const yy = OR_VPY - 90 - Math.pow(1 - t, 1.8) * 480; const half = 84 + Math.pow(1 - t, 1.5) * 780;
        return <div key={"pu" + i} style={{ position: "absolute", left: OR_VPX - half, top: yy, width: half * 2, height: i > 10 ? 1.5 : 2.4, background: `rgba(255,252,244,${(0.14 + t * 0.14).toFixed(3)})`, zIndex: 1 }} />;
      })}
      {/* soft bright sheen streaks running down the roof glass */}
      {Array.from({ length: 12 }, (_, i) => {
        const cx = -160 + seed(i * 6.1) * 1900, cy = -160 + seed(i * 2.9) * 440, ch = 60 + seed(i * 4.7) * 150;
        return <div key={"cs" + i} style={{ position: "absolute", left: cx, top: cy, width: 2 + seed(i) * 2, height: ch, background: "linear-gradient(180deg, transparent, rgba(255,255,250,0.34), rgba(255,255,250,0.12), transparent)", filter: "blur(0.6px)", borderRadius: 2, zIndex: 1 }} />;
      })}
      {/* a couple of bright glassy panes catching light */}
      {[[210, 120], [1080, 60], [560, -40]].map(([fx, fy], i) => (
        <div key={"fog" + i} style={{ position: "absolute", left: fx as number, top: fy as number, width: 150, height: 96, borderRadius: 3, background: "rgba(236,246,252,0.16)", filter: "blur(5px)", zIndex: 1 }} />
      ))}
      {/* the ridge cresting / finial at the apex */}
      <div style={{ position: "absolute", left: OR_VPX - 40, top: -6, width: 80, height: 12, background: "linear-gradient(90deg, transparent, rgba(255,252,240,0.3), transparent)", zIndex: 1 }} />

      {/* GLAZED SIDE WALLS. A dense grid of vertical mullions + horizontal transoms
          receding along both flanks, with per-pane cool tint, so the flanks are
          walled in glass rather than flat colour. */}
      {[0, 1].map((side) => {
        const dir = side === 0 ? 1 : -1;
        const edge = side === 0 ? 20 : 1330;               // outer floor edge of the wall
        const inX = side === 0 ? 236 : 1114;               // where the wall meets the nave (nearer the VP)
        return (
          <React.Fragment key={"sw" + side}>
            {/* bright glass sheen behind the grid */}
            <div style={{ position: "absolute", left: side === 0 ? -60 : 1140, top: -40, width: 300, height: 1000, background: `linear-gradient(${side === 0 ? 105 : 75}deg, rgba(200,232,244,0.14), transparent 62%)`, zIndex: 1 }} />
            {/* per-pane sky tint quads down the wall */}
            {Array.from({ length: 28 }, (_, i) => {
              const col = i % 5, row = Math.floor(i / 5), ct = col / 4, rt = row / 5;
              const wx = edge + dir * ct * (inX - edge) + dir * 6;
              const wy = 40 + rt * 780 + ct * 90;
              const a = 0.05 + seed(i * 3.3 + side) * 0.07;
              return <div key={"swp" + side + i} style={{ position: "absolute", left: wx - (side === 0 ? 0 : 66 * (1 - ct)), top: wy, width: 66 * (1 - ct * 0.55), height: 120 * (1 - rt * 0.4), background: `rgba(${180 + Math.round(seed(i + side) * 36)},${216 + Math.round(seed(i * 2 + side) * 24)},${232 + Math.round(seed(i * 3) * 18)},${a.toFixed(3)})`, zIndex: 1 }} />;
            })}
            {/* vertical mullions */}
            {Array.from({ length: 5 }, (_, i) => {
              const t = i / 4; const bx = edge + dir * t * (inX - edge);
              return OrLine("mul" + side + i, bx, -10 + t * 250, bx + dir * 20, 990 - t * 210, 2.6, `rgba(248,250,244,${(0.1 + t * 0.08).toFixed(3)})`, 1);
            })}
            {/* horizontal transoms stepping down */}
            {Array.from({ length: 6 }, (_, i) => {
              const t = i / 5; const yy = 60 + t * 780;
              return OrLine("tr" + side + i, edge, yy, inX, yy + 120, 2, `rgba(248,250,244,${(0.12 + (1 - t) * 0.06).toFixed(3)})`, 1);
            })}
          </React.Fragment>
        );
      })}

      {/* a broad soft sun ambience washing the whole interior warm + bright + airy */}
      <div style={{ position: "absolute", left: 60, top: 300, width: 1700, height: 1000, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,240,190,0.2), transparent 62%)", filter: "blur(60px)", mixBlendMode: "screen", zIndex: 1 }} />

      {/* THE ARCHED GLAZED GABLE closing the far end of the nave, around the VP: a
          fan of radial glazing bars set in a white arch, bright day sky at its
          crown, the sunlit haze glowing through it. */}
      <div style={{ position: "absolute", left: OR_VPX - 232, top: OR_VPY - 250, width: 464, height: 320, borderRadius: "232px 232px 14px 14px", background: "linear-gradient(180deg, rgba(150,208,236,0.72) 0%, rgba(206,232,208,0.5) 44%, rgba(231,244,206,0.4) 100%)", border: "3px solid rgba(255,252,244,0.3)", borderBottom: "none", overflow: "hidden", zIndex: 2 }}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 8) * Math.PI;
          return <div key={"gr" + i} style={{ position: "absolute", left: 232, top: 250, width: 2, height: 250, background: "rgba(255,252,244,0.22)", transformOrigin: "50% 100%", transform: `translate(-50%,-100%) rotate(${a * 180 / Math.PI - 90}deg)` }} />;
        })}
        {[0.42, 0.68, 0.86].map((r, i) => (
          <div key={"ga" + i} style={{ position: "absolute", left: 232 - 232 * r, top: 250 - 232 * r, width: 464 * r, height: 464 * r, borderRadius: "50%", border: "2px solid rgba(255,252,244,0.18)", zIndex: 2 }} />
        ))}
      </div>
      {/* far ghost trees behind the haze, for depth beyond the VP (dim + recessive) */}
      {[[628, 470, 0.24], [784, 470, 0.24], [706, 452, 0.2]].map(([x, g, s], k) => (
        <OrTree key={"far" + k} lf={lf} x={x} groundY={g} scale={s} blur={5} glow={0.4} fruits={4} sd={k * 5 + 30} locked={0} z={2} />
      ))}
      {/* the sunlit vanishing point the rows fall toward: a warm bright haze */}
      <div style={{ position: "absolute", left: OR_VPX - 240, top: OR_VPY - 140, width: 480, height: 320, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,246,206,0.26), rgba(220,236,190,0.12) 44%, transparent 72%)", filter: "blur(32px)", opacity: 0.5 + 0.06 * Math.sin(lf / 42), mixBlendMode: "screen", zIndex: 3 }} />

      {/* THE DRESSED-STONE KNEE-WALL running the full width at the back of the nave,
          so the mid-band is masonry + ivy, not a flat colour field */}
      <OrKneeWall x={-420} y={742} w={2260} h={120} z={1} blur={2.4} />
      <OrIvy lf={lf} x={-160} y={706} w={520} h={150} n={30} s={0.9} z={1} blur={2.2} sd={12} />
      <OrIvy lf={lf} x={1000} y={706} w={520} h={150} n={30} s={0.9} z={1} blur={2.2} sd={22} />
      <OrIvy lf={lf} x={430} y={720} w={360} h={130} n={20} s={0.8} z={1} blur={2.4} sd={31} />

      {/* THE PALE-STONE FLOOR, sunlit: warm dressed flags with mossy joints, fallen
          leaves + a warm sun pool, so no flat floor band. */}
      <div style={{ position: "absolute", left: -420, top: 848, width: 2260, height: 640, background: "linear-gradient(180deg, #CDBB92 0%, #B7A374 34%, #9A8659 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", left: -420, top: 848, width: 2260, height: 320, background: "linear-gradient(180deg, rgba(255,244,200,0.22), transparent)", mixBlendMode: "screen", zIndex: 1 }} />
      {/* flag tint quads, bigger toward the front, so every flag reads distinct */}
      {Array.from({ length: 54 }, (_, i) => {
        const rowT = seed(i * 1.7); const yy = 862 + rowT * 420;
        const sizeF = 0.5 + rowT * 1.5; const fw = (70 + seed(i * 2.3) * 60) * sizeF; const fh = (26 + seed(i * 3.1) * 16) * sizeF;
        const xx = -360 + seed(i * 4.9) * 1900;
        const tint = seed(i * 5.7); const v = 168 + Math.round(tint * 40);
        return <div key={"flg" + i} style={{ position: "absolute", left: xx, top: yy, width: fw, height: fh, borderRadius: 3, background: `linear-gradient(160deg, rgba(${v + 22},${v + 12},${v - 18},0.5), rgba(${v - 6},${v - 16},${v - 40},0.5))`, boxShadow: "inset 0 1px 0 rgba(255,246,214,0.14), inset 0 -2px 4px rgba(90,70,40,0.24)", zIndex: 1 }} />;
      })}
      {/* floor seams converging to the VP */}
      {[220, 470, 942, 1200].map((fx, i) => OrLine("fx" + i, OR_VPX + (fx - OR_VPX) * 0.06, OR_VPY + 40, fx, 1200, 2, "rgba(120,96,56,0.14)", 1))}
      {/* receding transverse tile lines */}
      {Array.from({ length: 6 }, (_, i) => {
        const t = i / 5; const yy = 890 + Math.pow(t, 1.4) * 500; const half = 220 + t * 940;
        return <div key={"ft" + i} style={{ position: "absolute", left: OR_VPX - half, top: yy, width: half * 2, height: 2, background: `rgba(120,96,56,${(0.14 - t * 0.04).toFixed(3)})`, zIndex: 1 }} />;
      })}
      {/* moss creeping in the joints (light sunlit green) */}
      {Array.from({ length: 26 }, (_, i) => { const mx2 = -300 + seed(i * 3.7) * 1780, my2 = 872 + seed(i * 2.9) * 380, mw = 12 + seed(i) * 26; return (
        <div key={"mo" + i} style={{ position: "absolute", left: mx2, top: my2, width: mw, height: mw * 0.4, borderRadius: "50%", background: `radial-gradient(ellipse, ${OR_FOLI_LO}, transparent 74%)`, opacity: 0.4, zIndex: 1 }} />); })}
      {/* fallen leaves scattered on the flags */}
      {Array.from({ length: 18 }, (_, i) => { const lx = -260 + seed(i * 4.1) * 1740, ly = 884 + seed(i * 5.3) * 360, lr = 8 + seed(i) * 10; const warm = seed(i * 2.7) > 0.7; return (
        <div key={"lv" + i} style={{ position: "absolute", left: lx, top: ly, width: lr, height: lr * 0.62, borderRadius: "0 100% 30% 100%", background: warm ? "rgba(196,150,72,0.6)" : `radial-gradient(circle at 40% 35%, ${OR_FOLI_HI}, ${OR_FOLI_LO})`, transform: `rotate(${seed(i * 6) * 360}deg)`, opacity: 0.66, zIndex: 1 }} />); })}
      {/* warm SUN POOLS spilling on the sunlit floor */}
      {[[430, 1044, 220], [980, 1010, 170]].map(([px, py, pw], i) => (
        <div key={"pd" + i} style={{ position: "absolute", left: px as number, top: py as number, width: pw as number, height: (pw as number) * 0.34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,240,186,0.24), transparent 70%)", filter: "blur(10px)", mixBlendMode: "screen", zIndex: 1 }} />
      ))}
      {/* the central path receding to the VP */}
      {OrLine("pl", OR_VPX - 6, OR_VPY + 6, 470, 1120, 3, "rgba(120,96,56,0.16)", 2)}
      {OrLine("pr", OR_VPX + 6, OR_VPY + 6, 942, 1120, 3, "rgba(120,96,56,0.16)", 2)}
      <div style={{ position: "absolute", left: OR_VPX - 150, top: OR_VPY + 40, width: 300, height: 760, background: "radial-gradient(ellipse 60% 90% at 50% 90%, rgba(255,244,200,0.14), transparent 68%)", filter: "blur(20px)", mixBlendMode: "screen", zIndex: 2 }} />

      {/* LOW WARM HAZE drifting across the base of the rows (sun dust, airy) */}
      {Array.from({ length: 6 }, (_, i) => {
        const mx = mist(i); const my = 860 + seed(i * 4.1) * 220; const w = 380 + seed(i * 2.2) * 460;
        return <div key={"fm" + i} style={{ position: "absolute", left: mx, top: my, width: w, height: 120, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,244,204,0.16), transparent 70%)", filter: "blur(26px)", mixBlendMode: "screen", zIndex: 3, pointerEvents: "none" }} />;
      })}

      {/* bright light glints on the near glass */}
      {Array.from({ length: 22 }, (_, i) => { const s = seed(i * 4.4 + 2); return (
        <div key={"cd" + i} style={{ position: "absolute", left: -100 + seed(i * 2.1) * 1700, top: 120 + seed(i * 3.3) * 520, width: 2 + s * 3, height: 2 + s * 3, borderRadius: "50%", background: "rgba(255,250,224,0.55)", opacity: 0.18 + 0.28 * Math.abs(Math.sin(lf / 50 + i)), zIndex: 3 }} />); })}
    </>
  );
};

// ---------------------------------------------------------------------------
// THE RECEDING ROWS. Far + mid ranks of fruit-trees flanking the path. Back ranks
// dim cold slate under the Rent-Farmer's padlocks; the mid rows glow honey-gold.
// (The near focal padlocked tree is staged in S0 directly.)
// ---------------------------------------------------------------------------
const OrRows: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    {/* FAR ROW near the VP: a sparse line of DIM tree shapes flanking the misted
        centre, an abundance felt behind the gate, never a bright field. */}
    {([[358, 0], [520, 1], [892, 0], [1052, 1]] as [number, number][]).map(([x, l], k) => (
      <OrTree key={"fr" + k} lf={lf} x={x} groundY={512} scale={0.4} blur={5} glow={0.4} fruits={4} sd={k * 4 + 3} locked={l} z={3} />
    ))}
    {/* MID ROW: a few dim trees, deeper in shadow */}
    {([[320, 0], [520, 1], [900, 0], [1092, 0]] as [number, number][]).map(([x, l], k) => (
      <OrTree key={"md" + k} lf={lf} x={x} groundY={624} scale={0.54} blur={3.4} glow={0.46} fruits={5} sd={k * 6 + 11} locked={l} z={5} />
    ))}
    {/* NEAR-BACK ROW flanking the gate: dim dark tree masses, not forward bright trees */}
    {([[250, 0], [1152, 0]] as [number, number][]).map(([x, l], k) => (
      <OrTree key={"nb" + k} lf={lf} x={x} groundY={772} scale={0.8} blur={2.6} glow={0.48} fruits={6} sd={k * 7 + 41} locked={l} z={8} />
    ))}
  </>
);

// ---------------------------------------------------------------------------
// THE LOCKED GARDEN GATE: an ornamental wrought-iron gate (thin scroll pickets,
// a circle-band motif, spear finials, an arched crown) you clearly see the lush
// orchard THROUGH. It reads "locked garden," not "jail". `open` cracks it apart.
// ---------------------------------------------------------------------------
const ironRim = "inset 1px 0 0 rgba(160,178,196,0.22), inset -1px 0 0 rgba(231,178,76,0.14)";
const OrLeaf: React.FC<{ x0: number; x1: number; hingeX: number; open: number; dir: number }> = ({ x0, x1, hingeX, open, dir }) => {
  const els: React.ReactNode[] = [];
  for (let bx = x0; bx <= x1 - 4; bx += 52) {
    // a thin scroll picket with a spear finial (garden iron, not a jail bar)
    els.push(<div key={"p" + bx} style={{ position: "absolute", left: bx, top: 356, width: 4, height: 700, borderRadius: 2, background: grad(OR_IRON_HI, OR_IRON), boxShadow: ironRim }} />);
    els.push(<div key={"t" + bx} style={{ position: "absolute", left: bx - 5, top: 336, width: 14, height: 22, background: OR_IRON_HI, clipPath: "polygon(50% 0%, 100% 42%, 50% 100%, 0% 42%)" }} />);
    // a decorative iron ring in each gap (the classic circle band)
    if (bx + 52 <= x1 - 4) els.push(<div key={"r" + bx} style={{ position: "absolute", left: bx + 26 - 15, top: 402, width: 30, height: 30, borderRadius: "50%", border: `4px solid ${OR_IRON_HI}`, boxShadow: ironRim }} />);
  }
  return (
    <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: `${hingeX}px 700px`, transform: `translateX(${dir * open * 30}px) rotate(${dir * open * 5}deg)`, zIndex: 16 }}>
      {/* top rail (double, ornamental) + a scroll band rail + bottom rail */}
      <div style={{ position: "absolute", left: x0 - 4, top: 350, width: x1 - x0 + 8, height: 12, borderRadius: 4, background: grad(OR_IRON_HI, OR_IRON) }} />
      <div style={{ position: "absolute", left: x0 - 4, top: 432, width: x1 - x0 + 8, height: 7, borderRadius: 3, background: grad(OR_IRON_HI, OR_IRON) }} />
      <div style={{ position: "absolute", left: x0 - 4, top: 1046, width: x1 - x0 + 8, height: 14, borderRadius: 4, background: grad(OR_IRON_HI, OR_IRON) }} />
      {els}
    </div>
  );
};

const OrGate: React.FC<{ lf: number; open: number }> = ({ lf, open }) => (
  <>
    {/* two slim iron posts crowned with ball finials */}
    {[452, 944].map((px) => (
      <div key={px} style={{ position: "absolute", left: px, top: 300, width: 22, height: 772, background: grad("#333A45", "#161A20"), borderRadius: 5, boxShadow: `${ironRim}, 0 10px 26px rgba(4,6,10,0.5)`, zIndex: 18 }}>
        <div style={{ position: "absolute", left: -6, top: -26, width: 34, height: 34, borderRadius: "50%", background: grad("#3B434E", "#1A1F26"), boxShadow: "inset 2px 2px 0 rgba(160,178,196,0.2)" }} />
      </div>
    ))}
    {/* the ORNAMENTAL ARCHED CROWN above the portal, open so the orchard shows through */}
    <div style={{ position: "absolute", left: 452, top: 214, width: 490, height: 150, borderRadius: "245px 245px 0 0", border: `5px solid ${OR_IRON_HI}`, borderBottom: "none", background: "transparent", boxShadow: ironRim, zIndex: 17 }} />
    <div style={{ position: "absolute", left: 462, top: 226, width: 470, height: 138, borderRadius: "235px 235px 0 0", border: `2px solid rgba(160,178,196,0.35)`, borderBottom: "none", background: "transparent", zIndex: 17 }} />
    {/* a scroll fan + central spear finial in the arch */}
    {OrLine("af1", 697, 218, 560, 356, 3, OR_IRON, 17)}
    {OrLine("af2", 697, 218, 700, 356, 3, OR_IRON, 17)}
    {OrLine("af3", 697, 218, 838, 356, 3, OR_IRON, 17)}
    <div style={{ position: "absolute", left: 690, top: 178, width: 16, height: 44, background: OR_IRON_HI, clipPath: "polygon(50% 0%, 100% 30%, 55% 100%, 45% 100%, 0% 30%)", zIndex: 18 }} />
    {/* a low ornamental garden FENCE running off to both sides */}
    {[0, 1].map((side) => Array.from({ length: 9 }, (_, i) => {
      const bx = side === 0 ? 452 - 46 - i * 46 : 966 + i * 46;
      if (bx < 60 || bx > 1320) return null;
      return (
        <React.Fragment key={"fe" + side + i}>
          <div style={{ position: "absolute", left: bx, top: 640, width: 4, height: 420, borderRadius: 2, background: grad(OR_IRON_HI, OR_IRON), boxShadow: ironRim, zIndex: 15 }} />
          <div style={{ position: "absolute", left: bx - 5, top: 622, width: 14, height: 20, background: OR_IRON_HI, clipPath: "polygon(50% 0%, 100% 42%, 50% 100%, 0% 42%)", zIndex: 15 }} />
        </React.Fragment>
      );
    }))}
    {[0, 1].map((side) => (
      <div key={"fr" + side} style={{ position: "absolute", left: side === 0 ? 70 : 966, top: 660, width: 388, height: 9, borderRadius: 3, background: grad(OR_IRON_HI, OR_IRON), boxShadow: ironRim, zIndex: 15 }} />
    ))}
    {/* the two gate leaves */}
    <OrLeaf x0={474} x1={696} hingeX={474} open={open} dir={-1} />
    <OrLeaf x0={704} x1={922} hingeX={922} open={open} dir={1} />
  </>
);

// ---------------------------------------------------------------------------
// THE CHAIN, PADLOCK and the giant brass $2,000 TOLL TAG. The padlock locks the
// two leaves together; the tag hangs from it. `snap` severs the shackle: the
// padlock + tag drop and the chains go slack.
// ---------------------------------------------------------------------------
// SLAM_AT: the frame the $2,000 tag crashes down onto the bundle.
const OR_SLAM_AT = 7;

// ---------------------------------------------------------------------------
// THE "$2,000 LEAD LIST": a fat, rope-bound STACK of the same contact cards,
// chained to the tree with a slate padlock and slapped with a giant brass
// $2,000 price tag. This is the list the broker is selling. `snap` severs the
// chain: the padlock splits, the rope lets go, the bundle drops and a few cards
// spill free and light up. (x,y) is the CENTRE of the bundle.
// ---------------------------------------------------------------------------
const OrLeadList: React.FC<{ lf: number; x: number; y: number; snap: number; z?: number }> = ({ lf, x, y, snap, z = 20 }) => {
  const BW = 208, BH = 150;
  const rel = Math.max(0, Math.min(1, snap));
  const drop = Easing.in(Easing.quad)(rel) * 150;
  const sway = Math.sin(lf / 34) * 1.1 * (1 - rel);
  // opening slam of the $2,000 tag crashing onto the bundle face
  const fallP = Math.max(0, Math.min(1, (lf + 16) / (OR_SLAM_AT + 16)));
  const st = lf - OR_SLAM_AT;
  const jiggle = st >= 0 ? Math.sin(st * 0.9) * 13 * Math.exp(-st * 0.13) : 0;
  const tagSlamY = -300 * (1 - fallP * fallP) + jiggle;
  const tagSlamRot = fallP < 1 ? 12 * (1 - fallP) : settle(lf, OR_SLAM_AT, 5, 0.3, 0.17);
  const topY = -BH / 2;                 // local top of the bundle
  const lockY = topY - 8;               // padlock clasps the rope knot here
  const severY = topY - 92;             // the cutters bite the chain here
  const branchY = topY - 210;           // the chain hangs from a branch up here
  // slate chain, a run of links from the branch down to the padlock
  const chainLink = (key: string, y0: number, y1: number, n: number, falling: boolean) =>
    Array.from({ length: n }, (_, i) => {
      const t = n === 1 ? 0 : i / (n - 1);
      const ly = y0 + (y1 - y0) * t;
      const fo = falling && rel > 0.02 ? Math.max(0, 1 - rel * (0.4 + t) * 2) : 1;
      if (fo <= 0.04) return null;
      const fx = sway * (falling ? 1 : 0.4) + (falling ? rel * (i % 2 ? 22 : -22) : 0);
      return <div key={key + i} style={{ position: "absolute", left: -9 + fx, top: ly - 7 + (falling ? drop : -rel * 22), width: 18, height: 14, borderRadius: "50%", border: `5px solid ${i % 2 ? OR_SLATE_HI : OR_SLATE}`, opacity: fo, transform: `rotate(${i % 2 ? 24 : -24}deg)`, boxShadow: "0 2px 4px rgba(20,26,32,0.4)" }} />;
    });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 1, height: 1, zIndex: z }}>
      {/* the UPPER chain, from the branch to the sever point (stays, recoils up on cut) */}
      {chainLink("cu", branchY, severY, 8, false)}
      {/* THE FALLING ASSEMBLY: lower chain + padlock + bundle + tag, all drop on cut */}
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${sway}px, ${drop}px) rotate(${rel * 5}deg)`, transformOrigin: `0px ${severY}px` }}>
        {/* the lower chain stub from the sever point to the padlock */}
        {chainLink("cl", severY, lockY, 5, true)}

        {/* the soft ground/branch shadow under the bundle */}
        <div style={{ position: "absolute", left: -BW / 2 - 14, top: BH / 2 - 18, width: BW + 28, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,28,10,0.4), transparent 72%)", filter: "blur(7px)" }} />

        {/* THE BUNDLE STACK: a thick ream of contact cards, bound */}
        <div style={{ position: "absolute", left: -BW / 2, top: -BH / 2, width: BW, height: BH, borderRadius: 12, background: "linear-gradient(158deg, #EAD9B4 0%, #CDB988 100%)", border: "2px solid #B79A5A", boxShadow: "0 14px 30px rgba(50,34,10,0.4), inset -8px 0 16px rgba(120,94,44,0.3), inset 0 2px 0 rgba(255,248,224,0.5)" }}>
          {/* stacked card-edge striations (the ream thickness) */}
          {Array.from({ length: 13 }, (_, i) => (
            <div key={"ed" + i} style={{ position: "absolute", left: 6, right: 6, top: 12 + i * ((BH - 22) / 13), height: 1.4, background: i % 2 ? "rgba(120,94,44,0.34)" : "rgba(255,248,224,0.5)" }} />
          ))}
          {/* the loosened, fanned top edges once the rope is cut */}
          {rel > 0.05 && Array.from({ length: 3 }, (_, i) => (
            <div key={"lo" + i} style={{ position: "absolute", left: 8 + i * 4, right: 8 - i * 6, top: 8 - rel * (10 + i * 9), height: 9, borderRadius: 3, background: "linear-gradient(180deg,#FFF7E2,#EBD9AE)", border: "1px solid #C7AC70", opacity: 1 - rel * 0.3, transform: `rotate(${(i - 1) * rel * 5}deg)` }} />
          ))}
          {/* THE TOP CONTACT CARD FACE, so the stack reads as these same cards */}
          <div style={{ position: "absolute", left: 12, top: 14, width: BW - 24, height: 78, borderRadius: 7, background: "linear-gradient(158deg,#FBEFD2,#E7D4A6)", border: "2px solid #C79A46", boxShadow: "0 3px 8px rgba(60,42,12,0.28)" }}>
            {/* gold header: avatar dot + a business-name bar */}
            <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 22, borderRadius: 6, background: grad("#EAC873", "#CBA24A"), display: "flex", alignItems: "center", gap: 7, paddingLeft: 7 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#7C5A18", boxShadow: "inset 0 1px 0 rgba(255,240,200,0.5)" }} />
              <div style={{ width: 92, height: 6, borderRadius: 3, background: "#7C5A18" }} />
            </div>
            {/* phone line: a tiny handset glyph + a number bar */}
            <div style={{ position: "absolute", left: 12, top: 40, display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 12, height: 12, borderRadius: "5px 2px 5px 2px", background: "#B98A2E", transform: "rotate(38deg)" }} />
              <div style={{ width: 96, height: 5, borderRadius: 3, background: "#BE9648" }} />
            </div>
            {/* email line: an @ glyph + a line */}
            <div style={{ position: "absolute", left: 11, top: 56, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 17, lineHeight: 1, color: "#B98A2E" }}>@</div>
              <div style={{ width: 86, height: 5, borderRadius: 3, background: "#BE9648" }} />
            </div>
          </div>
          {/* TWO ROPE BANDS binding the stack + a knot at top-centre */}
          {[-0.26, 0.26].map((rx, i) => (
            <div key={"rp" + i} style={{ position: "absolute", left: BW / 2 + rx * BW - 8 - (rel > 0.05 ? rel * (rx < 0 ? -14 : 14) : 0), top: -6, width: 16, height: BH + 12, background: "repeating-linear-gradient(120deg,#7A5A2E 0 4px,#5E4522 4px 8px)", borderRadius: 4, opacity: 1 - rel * 0.7, boxShadow: "0 2px 4px rgba(30,20,6,0.4)" }} />
          ))}
        </div>

        {/* THE SLATE PADLOCK clasping the rope knot at the bundle top (splits on cut) */}
        <div style={{ position: "absolute", left: 0, top: lockY, width: 4, height: 4 }}>
          <div style={{ position: "absolute", left: -20 - rel * 8, top: -2, width: 5, height: 30, borderRadius: 3, background: OR_SLATE_HI, transformOrigin: "50% 100%", transform: `rotate(${-rel * 26}deg)` }} />
          <div style={{ position: "absolute", left: 15 + rel * 8, top: -2, width: 5, height: 30, borderRadius: 3, background: OR_SLATE_HI, transformOrigin: "50% 100%", transform: `rotate(${rel * 26}deg)` }} />
          <div style={{ position: "absolute", left: -20, top: -8, width: 40, height: 14, borderRadius: 9, borderTop: `5px solid ${OR_SLATE_HI}`, borderLeft: `5px solid ${OR_SLATE_HI}`, borderRight: `5px solid ${OR_SLATE_HI}`, opacity: 1 - rel }} />
          <div style={{ position: "absolute", left: -24, top: 22, width: 48, height: 42, borderRadius: 8, background: grad(OR_SLATE_HI, OR_SLATE_LO), border: "2px solid #23262D", boxShadow: "0 6px 14px rgba(20,26,32,0.5), inset 0 2px 0 rgba(220,228,238,0.28)" }} />
          <div style={{ position: "absolute", left: -5, top: 38, width: 10, height: 14, borderRadius: 3, background: "#1A1E24" }} />
        </div>

        {/* THE GIANT BRASS $2,000 TAG hanging off the front of the bundle */}
        <div style={{ position: "absolute", left: 30, top: BH / 2 - 118 + tagSlamY, width: 190, height: 138, transformOrigin: "20% -18px", transform: `rotate(${-8 + tagSlamRot}deg)` }}>
          {/* the tag string looping up to the bundle */}
          <div style={{ position: "absolute", left: 30, top: -20, width: 14, height: 30, borderRadius: 8, border: "5px solid #7A5A12", borderBottom: "none" }} />
          {/* the tag plate, brass with one cut corner */}
          <div style={{ position: "absolute", left: 0, top: 8, width: 190, height: 130, borderRadius: 16, background: grad("#E6BE58", "#7A5A12"), clipPath: "polygon(0% 22%, 22% 0%, 100% 0%, 100% 100%, 0% 100%)", boxShadow: "0 20px 40px rgba(40,28,8,0.5), inset 0 3px 0 rgba(255,246,214,0.45)" }} />
          <div style={{ position: "absolute", left: 24, top: 26, width: 22, height: 22, borderRadius: "50%", background: "#28200A", border: "5px solid #9A7418" }} />
          <div style={{ position: "absolute", left: 66, top: 22, width: 74, height: 7, background: "rgba(255,246,214,0.34)", transform: "skewX(-16deg)" }} />
          {/* the struck $2,000 engraving */}
          <div style={{ position: "absolute", left: 24, top: 62, width: 146, height: 58, borderRadius: 8, background: grad("#33270C", "#150F05"), border: "3px solid #B08820", boxShadow: "inset 0 2px 0 rgba(255,240,190,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.005em", color: "#FFD469", lineHeight: 1, whiteSpace: "nowrap" }}>$2,000</div>
          </div>
        </div>
      </div>

      {/* the freed cards SPILLING out and lighting up once the rope is cut */}
      {rel > 0.04 && [0, 1, 2, 3, 4].map((k) => {
        const p = Math.max(0, Math.min(1, (rel - 0.04) / 0.96));
        const dir = [-1, 1, -0.6, 0.8, 0.2][k];
        const cx = dir * (52 + k * 22) * p;
        const cy = topY + 6 - Math.sin(Math.min(1, p * 1.15) * Math.PI) * (150 + k * 20) + p * p * 46;
        const tilt = dir * p * 40;
        return <OrLeadCard key={"spill" + k} lf={lf} x={cx} y={cy} s={0.7} i={k * 3 + 2} glow={1} tilt={tilt} z={z + 4} />;
      })}
    </div>
  );
};

const OrChainTag: React.FC<{ lf: number; snap: number; z?: number }> = ({ lf, snap, z = 20 }) => {
  const sag = 5 + snap * 20;                                   // both runs go a little slack when cut
  const drop = Easing.in(Easing.quad)(Math.max(0, Math.min(1, snap))) * 170;
  // THE OPENING SLAM: the tag is already mid-fall at frame 0 (it started falling
  // before the scene opened), accelerates under gravity, and lands at OR_SLAM_AT,
  // then a hard damped jiggle. slamY offsets the whole padlock+tag group. The fall
  // height is kept moderate so the tag body stays clear of the header caption.
  const fallP = Math.max(0, Math.min(1, (lf + 16) / (OR_SLAM_AT + 16)));
  const st = lf - OR_SLAM_AT;
  const jiggle = st >= 0 ? Math.sin(st * 0.9) * 17 * Math.exp(-st * 0.13) : 0;
  const slamY = -300 * (1 - fallP * fallP) + jiggle;
  const slamRot = fallP < 1 ? -8 * (1 - fallP) : settle(lf, OR_SLAM_AT, 6, 0.3, 0.17);
  const slamSquash = st >= 0 && st < 10 ? 1 - Math.sin((st / 10) * Math.PI) * 0.14 : 1;
  const swing = Math.sin(lf / 6) * 5 * snap;
  const idleSwing = Math.sin(lf / 34) * 1.2;
  // a chain run of overlapping links from a post ring to the centre padlock. On
  // the cut side the links nearest the padlock fall away as the chain lets go.
  const run = (key: string, x0: number, x1: number, cutSide: boolean) => {
    const n = Math.round(Math.abs(x1 - x0) / 15);
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const cx = x0 + (x1 - x0) * t;
      let cy = 548 + Math.sin(Math.PI * t) * sag;
      // the chain rattles when the toll tag slams onto it, then stills
      if (st >= 0 && st < 18) cy += Math.sin(st * 1.5 + i) * 5 * Math.exp(-st * 0.18) * Math.sin(Math.PI * t);
      let o = 1, rot = i % 2 ? 22 : -22;
      if (cutSide && snap > 0.02) { const fall = snap * t * t; cy += fall * 150; o = Math.max(0, 1 - fall * 1.3); rot += fall * 90; }
      if (o <= 0.03) return null;
      return <div key={key + i} style={{ position: "absolute", left: cx - 9, top: cy - 6, width: 18, height: 13, borderRadius: "50%", border: `5px solid ${i % 2 ? OR_SLATE_HI : OR_SLATE}`, opacity: o, transform: `rotate(${rot}deg)`, boxShadow: "0 2px 4px rgba(4,6,10,0.6), inset 0 0 3px rgba(0,0,0,0.5)", zIndex: z }} />;
    });
  };
  return (
    <>
      {run("cl", 452, 700, true)}
      {run("cr", 948, 700, false)}
      {/* the freshly cut link fragments flung off the sever point */}
      {snap > 0.02 && snap < 0.9 && [0, 1, 2].map((k) => {
        const t = over(lf, 128, 20);
        return <div key={"frag" + k} style={{ position: "absolute", left: 588 + (k - 1) * 16 - t * (30 - k * 20), top: 542 + t * t * (120 + k * 40), width: 16, height: 12, borderRadius: "50%", border: `5px solid ${OR_SLATE_HI}`, opacity: 1 - t, transform: `rotate(${t * (240 + k * 120)}deg)`, zIndex: z + 3 }} />;
      })}
      {/* the padlock + tag group: crashes down at the open, hangs, drops again on cut */}
      <div style={{ position: "absolute", left: 700, top: 512 + drop + slamY, width: 4, height: 4, zIndex: z + 2, transformOrigin: "0 -30px", transform: `rotate(${swing + idleSwing + slamRot}deg) scaleY(${slamSquash})` }}>
        {/* the padlock shackle, splitting apart on the cut */}
        <div style={{ position: "absolute", left: -18 - snap * 8, top: 0, width: 5, height: 30, borderRadius: 3, background: OR_SLATE_HI, transformOrigin: "50% 100%", transform: `rotate(${-snap * 26}deg)` }} />
        <div style={{ position: "absolute", left: 13 + snap * 8, top: 0, width: 5, height: 30, borderRadius: 3, background: OR_SLATE_HI, transformOrigin: "50% 100%", transform: `rotate(${snap * 26}deg)` }} />
        <div style={{ position: "absolute", left: -18, top: -4, width: 36, height: 12, borderRadius: 8, borderTop: `5px solid ${OR_SLATE_HI}`, borderLeft: `5px solid ${OR_SLATE_HI}`, borderRight: `5px solid ${OR_SLATE_HI}`, opacity: 1 - snap }} />
        {/* the padlock body */}
        <div style={{ position: "absolute", left: -22, top: 26, width: 44, height: 38, borderRadius: 7, background: grad(OR_SLATE_HI, OR_SLATE_LO), border: "2px solid #23262D", boxShadow: "0 6px 14px rgba(4,6,10,0.6), inset 0 2px 0 rgba(220,228,238,0.28)" }} />
        <div style={{ position: "absolute", left: -4, top: 40, width: 8, height: 12, borderRadius: 3, background: "#12151B" }} />
        {/* the giant brass $2,000 TAG hanging under the padlock */}
        <div style={{ position: "absolute", left: -126, top: 62, width: 252, height: 200 }}>
          {/* the tag string looping up to the padlock */}
          <div style={{ position: "absolute", left: 118, top: -18, width: 16, height: 30, borderRadius: 8, border: "5px solid #7A5A12", borderBottom: "none" }} />
          {/* the tag plate, brass with one cut corner */}
          <div style={{ position: "absolute", left: 0, top: 10, width: 252, height: 180, borderRadius: 20, background: grad("#D9B24E", "#7A5A12"), clipPath: "polygon(0% 20%, 20% 0%, 100% 0%, 100% 100%, 0% 100%)", boxShadow: "0 24px 48px rgba(6,8,14,0.62), inset 0 3px 0 rgba(255,246,214,0.4)" }} />
          <div style={{ position: "absolute", left: 30, top: 34, width: 30, height: 30, borderRadius: "50%", background: "#28200A", border: "6px solid #9A7418" }} />
          <div style={{ position: "absolute", left: 84, top: 30, width: 96, height: 8, background: "rgba(255,246,214,0.28)", transform: "skewX(-16deg)" }} />
          {/* the struck $2,000 engraving */}
          <div style={{ position: "absolute", left: 30, top: 84, width: 192, height: 82, borderRadius: 9, background: grad("#33270C", "#150F05"), border: "4px solid #B08820", boxShadow: "inset 0 2px 0 rgba(255,240,190,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, letterSpacing: "0.005em", color: "#FFD469", lineHeight: 1, whiteSpace: "nowrap" }}>$2,000</div>
          </div>
        </div>
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// ATMOSPHERE. Four+ concurrently animated layers: drifting pollen/spore motes,
// swaying moon-shafts through the glass, a slow drizzle of light, plus the fruit
// pulse and mist breathing already carried by the trees and the backdrop.
// ---------------------------------------------------------------------------
const OrRays: React.FC<{ lf: number }> = ({ lf }) => (
  <>{[[240, "#FFF0C4", 0.05], [560, "#FFF4CE", 0.055], [820, "#FFEEBE", 0.048], [1080, "#FFF4CE", 0.052]].map(([x, c, o], k) => {
    const sway = Math.sin(lf / (60 + k * 18) + k) * 40;
    return <div key={"ry" + k} style={{ position: "absolute", left: (x as number) + sway, top: -40, width: 130, height: 1000, background: `linear-gradient(180deg, ${c}, transparent 82%)`, opacity: (o as number) * (0.7 + 0.3 * Math.sin(lf / 40 + k)), filter: "blur(18px)", mixBlendMode: "screen", transform: "rotate(9deg)", transformOrigin: "50% 0%", zIndex: 12, pointerEvents: "none" }} />;
  })}</>
);

const OrMotes: React.FC<{ lf: number }> = ({ lf }) => (
  <>{Array.from({ length: 16 }, (_, i) => {
    const s = seed(i * 5.7 + 1), s2 = seed(i * 2.3 + 4);
    const bx = -100 + s * 1700;
    const by = ((s2 * 1500 + lf * (0.18 + s * 0.4)) % 1400) + 120;
    const drift = Math.sin(lf / (28 + s * 30) + i) * 26;
    const sz = 2 + s * 3.5;
    // warm golden pollen adrift in the sunny house
    return <div key={"mt" + i} style={{ position: "absolute", left: bx + drift, top: by, width: sz, height: sz, borderRadius: "50%", background: "rgba(255,238,180,0.7)", opacity: (0.16 + s * 0.3) * (0.6 + 0.4 * Math.sin(lf / 20 + i)), filter: s < 0.4 ? "blur(1.5px)" : "none", zIndex: 13, pointerEvents: "none" }} />;
  })}</>
);

const OrDrizzle: React.FC<{ lf: number }> = ({ lf }) => (
  <>{Array.from({ length: 18 }, (_, i) => {
    const s = seed(i * 3.9 + 7);
    const bx = -80 + seed(i * 1.9) * 1660;
    const by = ((s * 1400 + lf * (0.5 + s * 0.8)) % 1500) - 100;
    return <div key={"dz" + i} style={{ position: "absolute", left: bx, top: by, width: 2 + s * 2, height: 2 + s * 2, borderRadius: "50%", background: "rgba(255,244,196,0.6)", opacity: 0.16 + s * 0.24, filter: "blur(1px)", zIndex: 14, pointerEvents: "none" }} />;
  })}</>
);

// ---------------------------------------------------------------------------
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ---- WORLD GEOMETRY ----
  const TX = 566, TG = 1044;                    // the HERO tree: trunk base, dead centre
  const BX = 556, BY = 812;                     // the $2,000 lead-list bundle centre
  const SEV_X = BX, SEV_Y = 645;                // where the cutters bite the hang-chain
  const VX = 316, VY = 1128, VS = 190;          // the Rent-Farmer, left foreground, secondary

  // ---- CAMERA: open on the whole tableau (tree + bundle + broker), then a GENTLE
  // push toward the locked bundle + the cut. The hero tree stays the biggest read. ----
  const push = interpolate(lf, [20, 120], [0, 1], { ...clamp, easing: s0IO });
  const WIDE = { x: 540 - 506 / 0.72, y: 744 - 396 / 0.72, z: 0.72 };
  const CLOSE = { x: 556 - 506 / 1.08, y: 748 - 396 / 1.08, z: 1.08 };
  const base = lerpCam(WIDE, CLOSE, push);
  // PATTERN-INTERRUPT KICK: the reel opens MID-DETONATION, so the very first beat
  // gets its own HARD camera hit at lf 0 plus a fast secondary jolt (on top of the
  // existing $2k-slam shake), and a quick zoom-punch that recoils out over ~8 frames.
  const cam = shakeCam(lf, [{ at: 0, amp: 38, dur: 16 }, { at: 3, amp: 15, dur: 9 }, { at: OR_SLAM_AT, amp: 18, dur: 15 }, { at: 129, amp: 12, dur: 16 }], 1);
  const bangZ = 1 + 0.048 * Math.max(0, 1 - lf / 8);   // 1.048x punch at lf0 -> 1.0 by lf8
  const camX = base.x + cam.x;
  const camY = base.y + cam.y;
  const camZ = base.z * cam.z * bangZ;

  // ---- THE ACTION BEATS ----
  const vLean = 0.5 + 0.5 * Math.sin(lf / 20 - 0.6);            // the broker presents the list
  const handIn = over(lf, 98, 22, s0O);                         // the clay cutters slide in
  const cut = over(lf, 118, 9, s0O);                            // the jaws squeeze
  const snap = over(lf, 127, 9, Easing.out(Easing.quad));       // the chain severs, bundle bursts

  // the broker's presenting arm, from his shoulder up to the bundle
  const SHX = VX + VS * 0.16, SHY = VY - VS * 0.5;
  const GRX = BX - 96, GRY = BY + 40;
  const armDist = Math.hypot(GRX - SHX, GRY - SHY);
  const armAng = (Math.atan2(GRY - SHY, GRX - SHX) * 180) / Math.PI;

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING (dim + blurred, supporting the hero): potting
            benches, baskets, sacks, tools + drifting butterflies, all kept soft and
            pushed to the flanks / back so nothing competes with the central tree */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrWallShelf x={880} y={372} w={196} s={0.92} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrFernBasket lf={lf} x={760} topY={196} y={438} s={0.7} z={4} blur={2.7} />
        <OrPottingBench x={1140} y={1210} s={0.82} z={7} blur={1.6} />
        <OrWheelbarrow x={1010} y={1258} s={0.72} z={7} blur={1.8} flip={-1} />
        <OrCrate x={1090} y={1116} s={0.72} z={7} blur={1.7} />
        <OrSoilBags x={1244} y={1236} s={0.68} z={7} blur={1.9} />
        <OrSeedTray x={946} y={1206} s={0.8} z={7} blur={1.8} />
        <OrPottingBench x={40} y={1236} s={0.76} z={7} blur={1.7} />
        <OrPlanter x={140} y={1256} s={0.94} z={7} blur={1.7} />
        <OrWateringCan x={214} y={1176} s={0.72} z={7} blur={1.6} />
        <OrTool x={20} y={1200} s={0.7} z={6} blur={2.1} kind={1} tilt={-13} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.2} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.3} />
        <OrButterfly lf={lf} x={230} y={780} s={1.0} z={9} hue="#F0C36A" sd={1} />
        <OrButterfly lf={lf} x={900} y={860} s={0.86} z={9} hue="#E7B24C" sd={4} />

        {/* EASTER-EGG: a shy critter peeking out from behind the hero trunk (z below
            the tree so the trunk hides most of it) */}
        <OrTrunkCritter lf={lf} x={TX + 58} y={1030} s={1.15} side={1} z={15} />

        {/* THE HERO TREE: dead centre, LARGE, heavy with glowing LEAD CARDS. The
            biggest, brightest, sharpest, most saturated thing in the frame. */}
        <OrTree lf={lf} x={TX} groundY={TG} scale={4.3} blur={0} glow={1} fruits={13} sd={41} locked={0} cards={1} z={16} />

        {/* THE RENT-FARMER (broker): left foreground, slate, eyes under a wide brim,
            a landlord's coat, presenting the locked $2,000 list he is selling. */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 12, transformOrigin: `${VX}px ${VY}px`, transform: `translate(${vLean * 5}px, ${-vLean * 3}px) rotate(${-vLean * 1.4}deg)` }}>
          {/* the presenting RUST arm from the shoulder up to the bundle (behind it),
              with a rounded shoulder pad so it reads as an arm, not a stray bar */}
          <div style={{ position: "absolute", left: SHX, top: SHY - 12, width: armDist, height: 24, borderRadius: 12, background: grad(OR_BRK, OR_BRK_LO), transformOrigin: "0% 50%", transform: `rotate(${armAng - vLean * 3}deg)`, boxShadow: "0 6px 14px rgba(40,22,10,0.45)", zIndex: 11 }} />
          <div style={{ position: "absolute", left: SHX - 20, top: SHY - 22, width: 44, height: 44, borderRadius: "50%", background: grad(OR_BRK, OR_BRK_LO), zIndex: 12 }} />
          {/* the landlord's long flared coat (rust) with a centre seam */}
          <div style={{ position: "absolute", left: VX - VS * 0.34, top: VY - VS * 0.66, width: VS * 0.68, height: VS * 0.68, borderRadius: "16px 16px 10px 10px", background: grad(OR_BRK, OR_BRK_LO), clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)", boxShadow: "0 10px 22px rgba(40,22,10,0.42)", zIndex: 13 }} />
          <div style={{ position: "absolute", left: VX - 4, top: VY - VS * 0.62, width: 8, height: VS * 0.62, background: "rgba(74,36,14,0.55)", zIndex: 14 }} />
          {/* the raised coat collar behind the head */}
          <div style={{ position: "absolute", left: VX - VS * 0.3, top: VY - VS * 0.74, width: VS * 0.6, height: VS * 0.16, borderRadius: "10px 10px 0 0", background: grad(OR_BRK_HI, OR_BRK), clipPath: "polygon(0% 100%, 24% 0%, 76% 0%, 100% 100%)", zIndex: 13 }} />
          <div style={{ position: "absolute", left: VX - VS / 2, top: VY - VS, zIndex: 14 }}>
            <Mascot lf={lf} size={VS} tint={OR_BRK} wrapShades={1} gaze={6} nodAmp={0} stern={0.5} />
          </div>
          {/* THE WIDE-BRIM HAT: a domed crown seated flush on a flat wide brim + band */}
          <div style={{ position: "absolute", left: VX - VS * 0.25, top: VY - VS - VS * 0.115, width: VS * 0.5, height: VS * 0.26, background: grad(OR_BRK_HI, OR_BRK), clipPath: "polygon(16% 100%, 6% 34%, 22% 4%, 78% 4%, 94% 34%, 84% 100%)", boxShadow: "inset 0 4px 0 rgba(255,232,190,0.26)", zIndex: 16 }} />
          <div style={{ position: "absolute", left: VX - VS * 0.23, top: VY - VS + VS * 0.03, width: VS * 0.46, height: VS * 0.05, borderRadius: 3, background: OR_BRK_LO, zIndex: 17 }} />
          <div style={{ position: "absolute", left: VX - VS * 0.54, top: VY - VS + VS * 0.075, width: VS * 1.08, height: VS * 0.17, borderRadius: "50%", background: grad(OR_BRK, OR_BRK_LO), boxShadow: "0 6px 12px rgba(40,22,10,0.5)", zIndex: 16 }} />
          {/* the shadow the brim throws across his sealed eyes (villain tell, kept) */}
          <div style={{ position: "absolute", left: VX - VS * 0.28, top: VY - VS + VS * 0.17, width: VS * 0.56, height: VS * 0.08, borderRadius: "50%", background: "rgba(30,14,6,0.55)", filter: "blur(3px)", zIndex: 17 }} />
          {/* a rust mitt gripping the underside of the bundle */}
          <div style={{ position: "absolute", left: GRX - 16, top: GRY - 14, width: 34, height: 30, borderRadius: "14px 14px 12px 12px", background: grad(OR_BRK_HI, OR_BRK_LO), boxShadow: "0 4px 10px rgba(40,22,10,0.42)", zIndex: 18 }} />
        </div>

        {/* THE $2,000 LEAD LIST: the roped, chained, price-tagged bundle of the same
            contact cards, hanging off the hero tree, which Claude cuts free. */}
        <OrLeadList lf={lf} x={BX} y={BY} snap={snap} z={20} />

        {/* THE ATMOSPHERE (world layers, so they parallax on the push) */}
        <OrRays lf={lf} />
        <OrMotes lf={lf} />

        {/* THE OPENING SLAM: the $2,000 tag crashes onto the bundle, a warm dust burst
            + thrown grit, so the frame opens mid-motion with a hard beat. */}
        <Impact lf={lf} at={OR_SLAM_AT} x={640} y={806} strength={1.6} hue="rgba(255,244,206,0.6)" dustHue="rgba(210,188,140,0.55)" z={21} debris={8} sparks={7} sd={5} />
        <Dust lf={lf} at={OR_SLAM_AT} x={640} y={812} n={7} life={40} spread={110} hue="rgba(214,192,142,0.5)" sd={4} z={21} />

        {/* ================= PATTERN-INTERRUPT DETONATION (lf 0) =================
            The reel opens MID-BANG: the $2,000 list has just SLAMMED into the tree and
            the whole frame detonates - a warm shockwave rips outward from the heart, a
            fat scatter of gold coins, torn leaves and grit blasts out and arcs away,
            hard impact-lines stab out - then it all falls and settles into the
            established hook by ~lf 20. Warm daytime palette; white only for the flash. */}
        {lf < 24 && (() => {
          const CX = 582, CY = 782;                        // the detonation heart (world)
          // rings get a HEAD-START so they are already bursting outward on frame 0
          const ws = 0.16 + 0.84 * over(lf, 0, 10);
          const ws2 = 0.24 + 0.76 * over(lf, 0, 7);
          return (
            <>
              {/* triple warm shockwave rings ripping outward FAST + WIDE across the ground */}
              <PulseRing t={ws} x={CX} y={CY} r={1560} hue="rgba(255,250,232,0.9)" o={1} z={31} />
              <PulseRing t={ws2} x={CX} y={CY} r={1080} hue="rgba(255,224,150,0.9)" o={0.95} z={31} />
              <PulseRing t={0.30 + 0.70 * over(lf, 0, 5.5)} x={CX} y={CY} r={640} hue="rgba(255,206,116,0.9)" o={0.9} z={31} />
              {/* a big hot golden ground-flare stamped at the heart, quickly gone */}
              <GroundRing lf={lf} at={-1.5} x={CX} y={CY + 30} r={720} dur={15} hue="rgba(255,236,182,0.72)" z={30} />
              {/* grit + dust blasted out of the canopy in a big cloud, warm, brief */}
              <Dust lf={lf} at={0} x={CX} y={CY} n={24} life={28} spread={520} hue="rgba(226,204,150,0.55)" sd={9} z={32} />
              <Dust lf={lf} at={1} x={CX} y={CY - 40} n={14} life={24} spread={360} hue="rgba(236,220,178,0.5)" sd={17} z={29} />
              {/* a big scatter of hot gold sparks arcing off the blast */}
              <Sparkles lf={lf} at={0} x={CX} y={CY} n={28} life={20} spread={520} rise={200} hue="#FBE6A8" sd={11} z={35} />
              {/* GOLD COIN BURST: a fat radial scatter of coins flung out fast + far on arcs */}
              {Array.from({ length: 30 }, (_, i) => {
                const a = (i / 30) * Math.PI * 2 + seed(i * 1.7) * 0.5;
                const st = (i % 4) * 0.35;
                const dur = 12 + seed(i * 3.1) * 8;
                const t = (lf - st) / dur;
                if (t < 0 || t >= 1) return null;
                const reach = 320 + seed(i * 2.3) * 420;
                const e = 0.18 + 0.82 * Math.pow(t, 0.42);   // fast early spread + head-start
                const px = CX + Math.cos(a) * reach * e;
                const py = CY + Math.sin(a) * reach * e - (150 + seed(i * 5.1) * 130) * 4 * t * (1 - t);
                return <Coin key={"bc" + i} lf={lf * (1 + seed(i) * 0.6)} x={px} y={py} r={13 + seed(i * 7.3) * 11} roll={seed(i * 9.1) * 3} o={(1 - t * t) * 0.96} z={35} />;
              })}
              {/* TORN LEAVES flung out with the coins (green chips tumbling far on arcs) */}
              {Array.from({ length: 26 }, (_, i) => {
                const a = (i / 26) * Math.PI * 2 + seed(i * 4.4 + 2) * 0.7;
                const st = (i % 3) * 0.4;
                const dur = 13 + seed(i * 2.7) * 9;
                const t = (lf - st) / dur;
                if (t < 0 || t >= 1) return null;
                const reach = 300 + seed(i * 3.9) * 400;
                const e = 0.16 + 0.84 * Math.pow(t, 0.42);
                const px = CX + Math.cos(a) * reach * e + Math.sin(lf / 6 + i) * 9;
                const py = CY + Math.sin(a) * reach * e - (100 + seed(i * 6.2) * 90) * 4 * t * (1 - t) + t * t * 80;
                const w = 13 + seed(i * 5.7) * 14, hh = 8 + seed(i * 1.3) * 8;
                const g = seed(i * 8.1);
                return <div key={"bl" + i} style={{ position: "absolute", left: px - w / 2, top: py - hh / 2, width: w, height: hh, borderRadius: "60% 40% 55% 45%", background: g > 0.5 ? "#6FA046" : "#8CB85A", opacity: (1 - t) * 0.92, zIndex: 34, transform: `rotate(${(seed(i * 2.1) * 180 + t * 560 * (i % 2 ? 1 : -1)).toFixed(1)}deg)`, boxShadow: "0 2px 4px rgba(30,40,14,0.4)" }} />;
              })}
              {/* CHUNKY SHARDS: heavy bark/wood/crate chunks blasted off and tumbling */}
              {Array.from({ length: 9 }, (_, i) => {
                const a = (i / 9) * Math.PI * 2 + seed(i * 2.9 + 4) * 0.8;
                const st = (i % 3) * 0.3;
                const dur = 13 + seed(i * 4.3) * 6;
                const t = (lf - st) / dur;
                if (t < 0 || t >= 1) return null;
                const reach = 260 + seed(i * 3.3) * 360;
                const e = 0.16 + 0.84 * Math.pow(t, 0.4);
                const px = CX + Math.cos(a) * reach * e;
                const py = CY + Math.sin(a) * reach * e - (110 + seed(i * 5.7) * 100) * 4 * t * (1 - t) + t * t * 90;
                const w = 20 + seed(i * 6.1) * 18, hh = 14 + seed(i * 2.7) * 14;
                const cols = ["#5A3E24", "#4A3420", "#6E4A24", "#7C5934"];
                const col = cols[i % cols.length];
                return <div key={"bs" + i} style={{ position: "absolute", left: px - w / 2, top: py - hh / 2, width: w, height: hh, borderRadius: `${4 + seed(i) * 8}px ${3 + seed(i * 2) * 7}px ${6 + seed(i * 3) * 6}px ${2 + seed(i * 4) * 8}px`, background: col, opacity: (1 - t * t) * 0.95, zIndex: 34, transform: `rotate(${(seed(i * 2.1) * 180 + t * 620 * (i % 2 ? 1 : -1)).toFixed(1)}deg)`, boxShadow: "0 3px 6px rgba(20,14,6,0.55)" }} />;
              })}
              {/* RADIAL BLAST-LINES: hard warm speed-streaks stabbing out of the heart */}
              {lf < 8 && Array.from({ length: 28 }, (_, i) => {
                const a = (i / 28) * Math.PI * 2 + seed(i) * 0.24;
                const inR = 40 + over(lf, 0, 7) * 150;
                const len = (200 + seed(i * 3) * 260) * (1 - over(lf, 0, 7) * 0.4);
                const x1 = CX + Math.cos(a) * inR, y1 = CY + Math.sin(a) * inR;
                return <div key={"rl" + i} style={{ position: "absolute", left: x1, top: y1, width: len, height: 2 + seed(i * 2) * 4, background: "linear-gradient(90deg, rgba(255,246,214,0.95), transparent)", transformOrigin: "0% 50%", transform: `rotate(${((a * 180) / Math.PI).toFixed(1)}deg)`, opacity: (1 - over(lf, 0, 7)) * 0.85, mixBlendMode: "screen", zIndex: 33, filter: "blur(0.6px)" }} />;
              })}
            </>
          );
        })()}

        {/* THE CUT. The clay hero's bolt-cutters snap the hang-chain. Spark on sever. */}
        <OrClayHand lf={lf} x={SEV_X + 4} y={SEV_Y + 6} in01={handIn} cut={cut} z={26} />
        {snap > 0.01 && snap < 0.95 && (
          <>
            <Sparkles lf={lf} at={127} x={SEV_X} y={SEV_Y} n={16} life={22} spread={130} rise={80} hue="#FBE6A8" sd={2} z={30} />
            <PulseRing t={over(lf, 127, 18)} x={SEV_X} y={SEV_Y} r={230} hue="rgba(251,230,168,0.65)" o={0.85} z={29} />
            <div style={{ position: "absolute", left: SEV_X - 60, top: SEV_Y - 60, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,214,0.9), transparent 66%)", opacity: (1 - over(lf, 127, 10)) * 0.9, mixBlendMode: "screen", zIndex: 31 }} />
          </>
        )}

        {/* a near-foreground tree softly framing the right edge (dim + blurred) */}
        <OrTree lf={lf} x={1236} groundY={1150} scale={1.5} blur={4.4} glow={0.5} fruits={5} sd={61} locked={0} z={22} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT + FOREGROUND ================= */}

      {/* a bright, airy day fill: a faint sky-blue top wash + a warm base, screened
          so the conservatory stays luminous, never muddy. */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />

      {/* THE ONE FOCAL READ: a warm KEY pool haloing the hero tree + bundle at centre */}
      <div style={{ position: "absolute", left: 40, top: -60, width: 940, height: 1000, background: "radial-gradient(ellipse at 52% 46%, rgba(255,224,150,0.28), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      {/* a gentle, LIGHT periphery vignette (day: never a black hole) */}
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />

      {/* the closest tier of drifting pollen, down the lens */}
      <OrDrizzle lf={lf} />

      {/* a couple of soft, out-of-focus warm pollen bokeh tumbling PAST the lens */}
      {[0, 1].map((k) => {
        const t = (lf + k * 30) % 90;
        const p = t / 90;
        return <div key={"fg" + k} style={{ position: "absolute", left: 760 + k * 150 - p * 40, top: -60 + p * 980, width: 12 + k * 5, height: 12 + k * 5, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, rgba(255,242,196,0.6), rgba(230,200,130,0.3) 60%, transparent 100%)", opacity: 0.34, filter: `blur(${3 + k}px)`, zIndex: 55, pointerEvents: "none" }} />;
      })}

      {/* ===== PANEL-SPACE FIREBALL: the bright bloom of the opening BOMB BLAST. A
           white-hot flashpoint + a big honey-gold->orange fireball with turbulent
           lobes erupts out of the tree's heart, a warm whiteout blows the frame for a
           beat, and a crisp white shock-rim snaps outward - all gone by ~lf 9 so the
           scene resolves clean into the hook. Warm palette; white-hot only briefly. ===== */}
      {lf < 9 && (
        <>
          {/* the brief warm whiteout wash over the whole panel */}
          <div style={{ position: "absolute", inset: 0, background: "rgb(255,248,232)", opacity: interpolate(lf, [0, 2, 7], [0.6, 0.22, 0], clamp), mixBlendMode: "screen", zIndex: 58, pointerEvents: "none" }} />
          {/* the FIREBALL body + turbulence lobes: white-hot center -> honey -> orange */}
          {[[0, 0, 1.0, 1.0], [110, -60, 0.74, 0.86], [-95, 45, 0.68, 0.82], [40, 95, 0.62, 0.8], [-70, -80, 0.58, 0.76]].map(([dx, dy, s, op], k) => {
            const R = 720;
            const sc = interpolate(lf, [0, 9], [0.44 * (s as number), 1.32 * (s as number)], clamp);
            const o = interpolate(lf, [0, 4, 9], [0.95 * (op as number), 0.42 * (op as number), 0], clamp);
            return <div key={"fb" + k} style={{ position: "absolute", left: 506 + (dx as number) - R, top: 430 + (dy as number) - R, width: R * 2, height: R * 2, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,252,0.98) 0%, rgba(255,244,206,0.9) 14%, rgba(255,214,120,0.72) 34%, rgba(240,150,60,0.4) 54%, transparent 72%)", opacity: o, mixBlendMode: "screen", transform: `scale(${sc})`, transformOrigin: "506px 430px", filter: "blur(2px)", zIndex: 59, pointerEvents: "none" }} />;
          })}
          {/* the WHITE-HOT flashpoint at the very center, gone fast by ~lf5 */}
          <div style={{ position: "absolute", left: 506 - 280, top: 430 - 280, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,251,238,0.82) 28%, transparent 64%)", opacity: interpolate(lf, [0, 3, 5], [1, 0.4, 0], clamp), mixBlendMode: "screen", transform: `scale(${interpolate(lf, [0, 5], [0.5, 1.15], clamp)})`, transformOrigin: "506px 430px", zIndex: 60, pointerEvents: "none" }} />
          {/* a crisp white screen-space shock rim snapping outward (head-start so it
              is already mid-burst on frame 0) */}
          {(() => { const rw = 0.12 + 0.88 * over(lf, 0, 8); return (
          <div style={{ position: "absolute", left: 506, top: 430, width: 0, height: 0, zIndex: 60, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: -rw * 780, top: -rw * 780, width: rw * 1560, height: rw * 1560, borderRadius: "50%", border: `${Math.max(2, 20 * (1 - rw))}px solid rgba(255,250,236,0.92)`, opacity: (1 - rw) * 0.9, filter: "blur(1.5px)", mixBlendMode: "screen" }} />
          </div>); })()}
        </>
      )}

      <Vig o={0.16} />
      {/* the persistent LEADS tally (opens the loop at 0) */}
      <LeadsHud lf={lf} {...leadsTally(0, lf)} />
    </AbsoluteFill>
  );
};

// ==== part: 11_S1.tsx ====

// ============================================================================
// SCENE 1 - NAME.  155 frames (lf 0..154).  Verb: PLANT.
// VO: "you give Claude Code one line, your niche and your city, like dentists in
// Austin or gyms in Miami."  Same bright daytime conservatory, the big hero tree
// dead centre. Claude (clay) slots ONE wooden SEED-LABEL reading DENTISTS . AUSTIN
// into the soil at the tree base (this is "one line", no terminal). The tree WAKES:
// a wave of light runs up the trunk and the dormant lead-cards perk up and glow.
// The orange broker reacts small in the back. Opens mid-plant, ends mid-glow.
// ============================================================================

const S1_TX = 566, S1_TG = 1044;                 // the hero tree (same world as S0/S2)
const S1_SOIL = 1046;                            // soil line the label CHUNK-locks into
const S1_LX = 484;                               // the niche+city label, centred here
const S1_CX = 288, S1_CG = 1076, S1_CS = 250;    // Claude, left of the trunk, working it
const s1O = Easing.out(Easing.cubic);
const s1IO = Easing.inOut(Easing.cubic);
// the two options the label cycles through: it flips through the first, then
// CHUNK-locks on the second right as the VO hits "dentists in Austin".
const S1_OPT_A = { niche: "GYMS", city: "MIAMI" };
const S1_OPT_B = { niche: "DENTISTS", city: "AUSTIN" };

// ONE ENGRAVED PLATE on the signboard. `pinch` (any real) spins it edge-on and
// back (scaleY = |cos(pinch·pi)|) so a WORD SWAP hides at the edge, like a split
// flap board. `lock` (0..1) fires a warm brass flash the instant it locks home.
const OrPlate: React.FC<{ text: string; w: number; h: number; fs: number; ls: string; pinch: number; lock?: number }> =
  ({ text, w, h, fs, ls, pinch, lock = 0 }) => {
    const sy = Math.max(0.05, Math.abs(Math.cos(pinch * Math.PI)));
    const edge = 1 - sy;                          // brightest metallic glint when edge-on
    return (
      <div style={{ position: "relative", width: w, height: h, transform: `scaleY(${sy})`, transformOrigin: "50% 50%" }}>
        {/* the planed brass-in-wood plate */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: "linear-gradient(158deg, #D0A464 0%, #A0723C 100%)", border: "3px solid #6E4A24", boxShadow: "0 8px 15px rgba(30,18,8,0.4), inset 0 3px 0 rgba(255,240,204,0.5), inset 0 -5px 10px rgba(70,44,20,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {[0.26, 0.74].map((t, i) => <div key={i} style={{ position: "absolute", left: 8, right: 8, top: `${t * 100}%`, height: 2, background: "rgba(70,44,20,0.2)" }} />)}
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: fs, letterSpacing: ls, color: "#2E1B0C", lineHeight: 1, whiteSpace: "nowrap", textShadow: "0 1px 0 rgba(255,240,200,0.55)" }}>{text}</div>
          {/* the edge-on metallic glint sliding across it while it flips */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(255,246,212,0.92), transparent)", opacity: edge * 0.9, mixBlendMode: "screen" }} />
        </div>
        {/* the chunk-lock brass flash ring */}
        {lock > 0.01 && <div style={{ position: "absolute", inset: -6, borderRadius: 13, border: `3px solid ${OR_GOLD_HI}`, opacity: lock * 0.95, boxShadow: `0 0 20px ${OR_GOLD}`, mixBlendMode: "screen" }} />}
      </div>
    );
  };

// THE ONE-LINE INPUT, planted at the tree base: a wooden signboard carrying a
// NICHE plate over a CITY plate. Claude dials the two plates through an option
// and CHUNK-locks the sign into the soil, which is what wakes the tree. `seat`
// 0..1 drives it down out of Claude's hands into the earth on the lock.
const OrNicheLabel: React.FC<{ lf: number; x: number; soilY: number; seat: number; hover: number; niche: string; city: string; nPinch: number; cPinch: number; lock: number; z?: number }> =
  ({ lf, x, soilY, seat, hover, niche, city, nPinch, cPinch, lock, z = 25 }) => {
    const st = Math.max(0, Math.min(1, seat));
    const y = interpolate(st, [0, 1], [-hover, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: s1O });
    const settleR = st >= 0.999 ? Math.sin(lf / 10) * 0.4 : 0;
    const boardW = 248, boardH = 138, stakeH = 58;
    const topY = soilY - stakeH - boardH;
    return (
      <div style={{ position: "absolute", left: x, top: 0, width: 1, height: 1, zIndex: z, transformOrigin: `0px ${soilY}px`, transform: `translateY(${y}px) rotate(${settleR}deg)` }}>
        {/* the driven wooden STAKE going down into the soil, cut to a point */}
        <div style={{ position: "absolute", left: -11, top: topY + boardH, width: 22, height: stakeH + 30, background: grad(OR_WOOD_HI, OR_WOOD), clipPath: "polygon(0 0, 100% 0, 100% 84%, 50% 100%, 0 84%)", boxShadow: "inset -4px 0 8px rgba(18,12,6,0.4)" }} />
        {/* the signboard the two engraved plates are mounted on */}
        <div style={{ position: "absolute", left: -boardW / 2, top: topY, width: boardW, height: boardH, borderRadius: 15, background: "linear-gradient(158deg,#7C5934,#4A3420)", border: "4px solid #38260F", boxShadow: "0 16px 28px rgba(30,18,8,0.46), inset 0 3px 0 rgba(255,232,190,0.26)", display: "flex", flexDirection: "column", gap: 9, alignItems: "center", justifyContent: "center", padding: 13 }}>
          <OrPlate text={niche} w={boardW - 34} h={54} fs={32} ls="0.03em" pinch={nPinch} lock={lock} />
          <OrPlate text={city} w={boardW - 62} h={44} fs={26} ls="0.08em" pinch={cPinch} lock={lock} />
          {/* two mounting studs top corners so it reads as a fitted board */}
          {[-1, 1].map((d) => <div key={d} style={{ position: "absolute", left: `calc(50% + ${d * (boardW / 2 - 15)}px)`, top: 9, width: 8, height: 8, borderRadius: "50%", background: "#2E1F0E", boxShadow: "inset 0 1px 0 rgba(255,236,196,0.4)" }} />)}
        </div>
      </div>
    );
  };

// a low SOIL BED mounded at the tree base, so the label plants into earth not stone.
const OrSoilBed: React.FC<{ x: number; y: number; w?: number; z?: number }> = ({ x, y, w = 460, z = 9 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - 34, width: w, height: 70, zIndex: z, pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 30%, #5A3E24, #351F10 70%, transparent 92%)", boxShadow: "inset 0 6px 12px rgba(255,224,170,0.14)" }} />
    {Array.from({ length: 16 }, (_, i) => <div key={i} style={{ position: "absolute", left: seed(i * 2.3) * w, top: 12 + seed(i * 3.1) * 40, width: 5 + seed(i) * 8, height: 4 + seed(i * 1.7) * 5, borderRadius: "50%", background: seed(i * 4.1) > 0.6 ? "#6B4A2A" : "#2C1A0E", opacity: 0.7 }} />)}
  </div>
);

// THE RENT-FARMER, SMALL and in the back (secondary): same rust villain, reacting.
const OrBrokerMini: React.FC<{ lf: number; x: number; y: number; s?: number; recoil?: number; z?: number; blur?: number }> = ({ lf, x, y, s = 92, recoil = 0, z = 8, blur = 0 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, zIndex: z, filter: blur ? `blur(${blur}px)` : "none", pointerEvents: "none", transformOrigin: `${x}px ${y}px`, transform: `translate(${-recoil * 12}px, ${-recoil * 3}px) rotate(${-recoil * 5}deg)` }}>
    {/* the flared coat */}
    <div style={{ position: "absolute", left: x - s * 0.32, top: y - s * 0.6, width: s * 0.64, height: s * 0.62, borderRadius: "12px 12px 8px 8px", background: grad(OR_BRK, OR_BRK_LO), clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)" }} />
    <div style={{ position: "absolute", left: x - s / 2, top: y - s, zIndex: 1 }}>
      <Mascot lf={lf} size={s} tint={OR_BRK} wrapShades={1} gaze={-6} nodAmp={0} stern={0.5} />
    </div>
    {/* the wide-brim hat */}
    <div style={{ position: "absolute", left: x - s * 0.24, top: y - s - s * 0.1, width: s * 0.48, height: s * 0.24, background: grad(OR_BRK_HI, OR_BRK), clipPath: "polygon(16% 100%, 6% 34%, 22% 4%, 78% 4%, 94% 34%, 84% 100%)", zIndex: 2 }} />
    <div style={{ position: "absolute", left: x - s * 0.52, top: y - s + s * 0.06, width: s * 1.04, height: s * 0.16, borderRadius: "50%", background: grad(OR_BRK, OR_BRK_LO), zIndex: 2 }} />
    <div style={{ position: "absolute", left: x - s * 0.27, top: y - s + s * 0.15, width: s * 0.54, height: s * 0.08, borderRadius: "50%", background: "rgba(30,14,6,0.5)", filter: "blur(3px)", zIndex: 3 }} />
  </div>
);

const S1: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ============================ ACTION BEATS ============================
  // The two plates SPIN into place (staggered) showing the first option, HOLD,
  // then FLIP once to the second option, and CHUNK-LOCK into the soil at f92,
  // which fires a shockwave up the trunk and BLOOMS the whole tree.
  const LOCK = 92;
  // per-plate flip pinch: an intro spin (0->2, lands flat) then a single swap
  // flip (0->1, lands flat). Both windows rest flat, so switching never jumps.
  const nSpin = 2 * over(lf, -6, 18, s1IO);       // already mid-spin at f0 (open mid-action)
  const nSwap = over(lf, 58, 14, s1IO);
  const nPinch = lf < 44 ? nSpin : nSwap;
  const cSpin = 2 * over(lf, 2, 18, s1IO);
  const cSwap = over(lf, 66, 16, s1IO);
  const cPinch = lf < 50 ? cSpin : cSwap;
  const niche = lf < 65 ? S1_OPT_A.niche : S1_OPT_B.niche;   // swaps at its flip's edge (~f65)
  const city = lf < 74 ? S1_OPT_A.city : S1_OPT_B.city;      // swaps at its flip's edge (~f74)
  const seat = over(lf, LOCK - 1, 10, s1O);                  // the sign drives home on lock
  const lockFlash = Math.max(0, over(lf, LOCK, 3) - over(lf, LOCK + 4, 12));

  // THE TREE ERUPTION, fired by the lock
  const trunkWaveY = (lf >= LOCK + 2 && lf <= LOCK + 34) ? interpolate(lf, [LOCK + 2, LOCK + 28], [0, 1.06], clamp) : undefined;
  const wakeCards = interpolate(lf, [0, LOCK, LOCK + 40], [0.05, 0.06, 1], clamp);   // dormant, then fast bloom
  const canopyFlash = over(lf, LOCK + 22, 20);
  const brokerRecoil = over(lf, LOCK + 6, 16, s1O) * (1 - over(lf, LOCK + 50, 30));   // he flinches, then eases

  // ---- CAMERA: hold low on Claude + the label through the dial, then a KICK on
  // the lock and a quick push UP that follows the wave to the blooming canopy. ----
  const camPush = over(lf, LOCK, 46, s1IO);
  const Acx = 500, Acy = 902, Az = 0.92;      // low: Claude, the label, the trunk base
  const Bcx = 548, Bcy = 720, Bz = 0.99;      // up: the whole blooming crown
  const kick = Math.max(0, over(lf, LOCK, 3) - over(lf, LOCK + 3, 14));   // a fast zoom punch on the lock
  const ccz = (Az + (Bz - Az) * camPush) * (1 + kick * 0.05);
  const ccx = Acx + (Bcx - Acx) * camPush;
  const ccy = Acy + (Bcy - Acy) * camPush;
  const shk = shakeCam(lf, [{ at: LOCK, amp: 14, dur: 16 }, { at: LOCK + 8, amp: 7, dur: 12 }], 1);
  const camZ = ccz * shk.z;
  const camX = (ccx - 506 / camZ) + shk.x;
  const camY = (ccy - 396 / camZ) + shk.y;

  // Claude holds the sign UP by its left edge while he dials it, then drives it
  // DOWN on the lock, then leans back and looks up as the tree erupts.
  const yOff = interpolate(seat, [0, 1], [-96, 0], { ...clamp, easing: s1O });
  const CSHX = S1_CX + S1_CS * 0.32, CSHY = S1_CG - S1_CS * 0.5;   // his working shoulder
  const gripX = S1_LX - 130, gripY = 918 + yOff;                   // his mitt on the board's left edge
  const armL = Math.hypot(gripX - CSHX, gripY - CSHY);
  const armA = (Math.atan2(gripY - CSHY, gripX - CSHX) * 180) / Math.PI;
  const react = over(lf, LOCK + 4, 12) * (1 - over(lf, LOCK + 46, 30));   // lean back at the burst
  const claudeTilt = -react * 6;
  const claudeGaze = Math.round(react * -4);   // eyes flick up to the canopy

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING (dim, blurred, supporting the hero) */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrPottingBench x={1120} y={1210} s={0.8} z={7} blur={1.7} />
        <OrWheelbarrow x={1004} y={1256} s={0.7} z={7} blur={1.9} flip={-1} />
        <OrSeedTray x={946} y={1206} s={0.78} z={7} blur={1.8} />
        <OrPlanter x={150} y={1256} s={0.9} z={7} blur={1.8} />
        <OrWateringCan x={224} y={1176} s={0.7} z={7} blur={1.7} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.4} />
        <OrButterfly lf={lf} x={250} y={800} s={1.0} z={9} hue="#F0C36A" sd={1} />

        {/* two DIM background trees, so the light-sweep can pick out THIS one */}
        <OrTree lf={lf} x={92} groundY={1214} scale={1.28} blur={4.7} glow={0.4} fruits={5} sd={73} locked={0} z={6} />

        {/* THE RENT-FARMER, small in the back, reacting (secondary) */}
        <OrBrokerMini lf={lf} x={946} y={968} s={104} recoil={brokerRecoil} z={9} blur={0.6} />

        {/* the soil bed the label locks into */}
        <OrSoilBed x={S1_TX} y={S1_SOIL + 6} w={520} z={9} />

        {/* a SWEEP OF LIGHT that walks the greenhouse and lands on THIS tree at the
            lock, selecting your niche + your city out of the dim rows */}
        {(() => {
          const sweepX = interpolate(lf, [72, LOCK], [-160, S1_TX], clamp);
          const sweepOn = over(lf, 72, 6) * (1 - over(lf, LOCK + 4, 14));
          return sweepOn > 0.01 ? <div style={{ position: "absolute", left: sweepX - 150, top: 360, width: 300, height: 760, background: "radial-gradient(ellipse at 50% 40%, rgba(255,244,196,0.5), transparent 70%)", filter: "blur(30px)", mixBlendMode: "screen", opacity: sweepOn, zIndex: 14, pointerEvents: "none" }} /> : null;
        })()}

        {/* THE HERO TREE: dead centre, ERUPTING to life on the lock. Two easter eggs
            ride the canopy: a lead named "Big Tuna Dental" and one that winks. */}
        <OrTree lf={lf} x={S1_TX} groundY={S1_TG} scale={4.3} blur={0} glow={1} fruits={13} sd={41} locked={0} cards={1} wakeCards={wakeCards} trunkWaveY={trunkWaveY} eggIdx={7} eggName="Big Tuna Dental" winkIdx={2} z={16} />
        {/* EASTER-EGG: a little bluebird hopping along a branch tip near the crown top */}
        <OrBird lf={lf} x={648} y={512} s={1.0} z={30} />

        {/* CLAUDE (clay hero): dialing the one line, then locking it in */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 24 }}>
          {/* the working clay arm from his shoulder to the board's edge */}
          <div style={{ position: "absolute", left: CSHX, top: CSHY - 13, width: armL, height: 26, borderRadius: 13, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "0% 50%", transform: `rotate(${armA}deg)`, boxShadow: "0 6px 14px rgba(70,30,16,0.4)", zIndex: 24 }} />
          <div style={{ position: "absolute", left: gripX - 17, top: gripY - 16, width: 34, height: 32, borderRadius: "14px 14px 12px 12px", background: grad(OR_CLAY_HI, OR_CLAY_LO), boxShadow: "inset 0 3px 0 rgba(255,214,180,0.4), 0 5px 12px rgba(70,30,16,0.4)", zIndex: 26 }} />
        </div>
        <div style={{ position: "absolute", left: S1_CX - S1_CS / 2, top: S1_CG - S1_CS, zIndex: 22, transformOrigin: `${S1_CS / 2}px ${S1_CS}px`, transform: `rotate(${claudeTilt}deg)` }}>
          <Mascot lf={lf} size={S1_CS} nodAmp={2} nodSpeed={12} gaze={9 + claudeGaze} />
        </div>

        {/* THE ONE-LINE INPUT: two plates, spun in, flipped, and locked */}
        <OrNicheLabel lf={lf} x={S1_LX} soilY={S1_SOIL} seat={seat} hover={96} niche={niche} city={city} nPinch={nPinch} cPinch={cPinch} lock={lockFlash} z={25} />

        {/* the CHUNK-LOCK: a puff, a ground ring and a light sinking into the soil */}
        <Dust lf={lf} at={LOCK + 8} x={S1_LX} y={S1_SOIL} n={8} life={36} spread={104} hue="rgba(150,110,60,0.5)" sd={3} z={27} />
        <GroundRing lf={lf} at={LOCK + 6} x={S1_LX} y={S1_SOIL + 2} r={180} dur={20} hue="rgba(255,232,168,0.55)" z={15} />
        <Sparkles lf={lf} at={LOCK} x={S1_LX} y={S1_SOIL - 108} n={12} life={24} spread={150} rise={70} hue="#FBE6A8" sd={9} z={28} o={0.9} />

        {/* THE SHOCKWAVE up the trunk, then the CANOPY BLOOM burst */}
        <PulseRing t={over(lf, LOCK + 2, 22)} x={S1_TX} y={S1_TG - 40} r={520} hue="rgba(255,236,170,0.6)" o={0.7} z={15} />
        {canopyFlash > 0.01 && canopyFlash < 0.99 && (
          <>
            <PulseRing t={canopyFlash} x={S1_TX} y={620} r={470} hue="rgba(251,230,168,0.62)" o={0.85} z={17} />
            <Sparkles lf={lf} at={LOCK + 20} x={S1_TX} y={600} n={22} life={30} spread={420} rise={120} hue="#FBE6A8" sd={4} z={30} />
            <Sparkles lf={lf} at={LOCK + 26} x={S1_TX} y={560} n={16} life={26} spread={360} rise={90} hue="#FFF4C6" sd={14} z={30} />
            <div style={{ position: "absolute", left: S1_TX - 300, top: 340, width: 600, height: 520, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,244,196,0.5), transparent 66%)", opacity: (1 - canopyFlash) * 0.75, mixBlendMode: "screen", zIndex: 17 }} />
          </>
        )}

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
        <OrTree lf={lf} x={1236} groundY={1150} scale={1.5} blur={4.4} glow={0.5} fruits={5} sd={61} locked={0} z={22} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 40, top: -40, width: 940, height: 1000, background: "radial-gradient(ellipse at 52% 44%, rgba(255,224,150,0.26), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.16} />
      <LeadsHud lf={lf} {...leadsTally(1, lf)} />
    </AbsoluteFill>
  );
};

// ==== part: 12_S2.tsx ====

// ============================================================================
// SCENE 2 - HARVEST.  92 frames (lf 0..91).  Verb: PICK.
// VO: "it fires up a free scraper and a table starts filling live, every business'
// name, phone, and real email."  Claude drives a warm CLAY HARVESTER that works
// the hero tree and PICKS the lead-cards. As each is picked its fields write on
// LIVE (name, then phone, then the @ email) and it lights HONEY-GOLD when it
// completes (the earned glow). Completed cards drop into a crate and a counter
// rolls up. Opens mid-harvest, ends mid-pick.
// ============================================================================

const S2_TX = 566, S2_TG = 1044;                 // the hero tree (same world as S0/S1)
const S2_PLUCK = { x: 596, y: 706 };             // where the picker arm meets the canopy
const S2_HARV = { x: 742, y: 1016 };             // the harvester chassis anchor
const S2_CRATE = { x: 902, y: 1030 };            // the collection crate
const s2O = Easing.out(Easing.cubic);

// four in-flight picks, evenly out of phase, so at any frame a card is mid-fill.
const S2_PICKN = 4, S2_PICKP = 30;
const s2clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// THE CLAY HARVESTER: a rounded clay machine on wheels with a raised picker arm and
// a delivery chute. Claude rides it. The ONLY clay (plus his tools) in the scene.
const OrHarvester: React.FC<{ lf: number; x: number; y: number; reach: number; z?: number }> = ({ lf, x, y, reach, z = 22 }) => {
  const bodyW = 210, bodyH = 118;
  const bob = idle(lf, 2, 90);
  // the picker arm swings up into the canopy and back on the pick cycle
  const ax0 = x - bodyW * 0.32, ay0 = y - bodyH * 0.9;
  const tipX = S2_PLUCK.x + 6, tipY = S2_PLUCK.y + 30;
  const armX = ax0 + (tipX - ax0) * (0.5 + reach * 0.5);
  const armY = ay0 + (tipY - ay0) * (0.5 + reach * 0.5);
  const armL = Math.hypot(armX - ax0, armY - ay0), armA = (Math.atan2(armY - ay0, armX - ax0) * 180) / Math.PI;
  const claw = 0.4 + 0.6 * reach;
  return (
    <div style={{ position: "absolute", left: 0, top: bob, width: 1, height: 1, zIndex: z }}>
      {/* the delivery CHUTE from the body down to the crate */}
      <div style={{ position: "absolute", left: x + bodyW * 0.28, top: y - bodyH * 0.4, width: (S2_CRATE.x - (x + bodyW * 0.28)) + 30, height: 26, borderRadius: 8, background: grad(OR_CLAY, OR_CLAY_LO), transformOrigin: "0% 50%", transform: "rotate(20deg)", boxShadow: "inset 0 3px 0 rgba(255,214,180,0.3), 0 8px 16px rgba(70,30,16,0.4)", zIndex: z - 1 }} />
      {/* the CHASSIS body (clay), a rounded hopper with a dark INTAKE MOUTH + rivets
          (a machine that swallows cards, not a screen) */}
      <div style={{ position: "absolute", left: x - bodyW / 2, top: y - bodyH, width: bodyW, height: bodyH, borderRadius: "26px 30px 16px 16px", background: grad(OR_CLAY_HI, OR_CLAY_LO), border: "3px solid #8A3F26", boxShadow: "inset 0 4px 0 rgba(255,214,180,0.4), inset -10px -12px 26px rgba(120,50,28,0.5), 0 16px 30px rgba(40,18,8,0.5)" }}>
        {/* the dark hopper intake with gold card-edges being swallowed */}
        <div style={{ position: "absolute", left: 18, top: 22, width: bodyW - 60, height: 46, borderRadius: 8, background: "linear-gradient(180deg, #3A1E12, #1E0F08)", border: "3px solid #6E3220", boxShadow: "inset 0 4px 10px rgba(0,0,0,0.7)", overflow: "hidden" }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 8 + i * 10, top: 6 - i * 2, right: 8 - i * 6, height: 12, borderRadius: 3, background: "linear-gradient(180deg,#F4E6BE,#E7C874)", opacity: 0.9 - i * 0.2 }} />)}
        </div>
        {/* a couple of warm brass GAUGE dials, so it reads as machinery */}
        {[0.14, 0.86].map((t, i) => <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: "74%", width: 14, height: 14, borderRadius: "50%", background: grad("#E6BE58", "#8A6418"), border: "2px solid #5A3C10", marginLeft: -7 }}><div style={{ position: "absolute", left: 5, top: 2, width: 2, height: 6, background: "#2A1C06", transformOrigin: "50% 100%", transform: `rotate(${i ? 40 : -30}deg)` }} /></div>)}
        {/* a stubby exhaust with a warm puff */}
        <div style={{ position: "absolute", left: bodyW - 34, top: -18, width: 14, height: 24, borderRadius: 4, background: grad("#8A3F26", "#5A2814") }} />
      </div>
      {/* exhaust puffs */}
      <Dust lf={lf} at={Math.floor(lf / 22) * 22} x={x + bodyW / 2 - 27} y={y - bodyH - 14} n={4} life={22} spread={40} hue="rgba(230,210,180,0.5)" sd={2} z={z + 1} />
      {/* the two chunky clay WHEELS */}
      {[-0.3, 0.34].map((t, i) => (
        <div key={i} style={{ position: "absolute", left: x + t * bodyW - 30, top: y - 24, width: 60, height: 60, borderRadius: "50%", background: grad("#B4573B", "#6E2E18"), border: "5px solid #4A1E0E", zIndex: z - 1 }}>
          <div style={{ position: "absolute", left: "38%", top: "38%", width: "24%", height: "24%", borderRadius: "50%", background: OR_CLAY_HI }} />
        </div>
      ))}
      {/* THE PICKER ARM reaching up into the canopy, with a small claw */}
      <div style={{ position: "absolute", left: ax0, top: ay0 - 8, width: armL, height: 17, borderRadius: 9, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "0% 50%", transform: `rotate(${armA}deg)`, boxShadow: "0 5px 12px rgba(70,30,16,0.4)", zIndex: z + 2 }} />
      <div style={{ position: "absolute", left: armX - 14, top: armY - 14, width: 28, height: 28, zIndex: z + 3 }}>
        {[-1, 1].map((d) => <div key={d} style={{ position: "absolute", left: 14 - d * 2, top: 2, width: 5, height: 20, borderRadius: 3, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "50% 0%", transform: `rotate(${d * (10 + claw * 24)}deg)` }} />)}
        <div style={{ position: "absolute", left: 6, top: -4, width: 16, height: 14, borderRadius: 6, background: grad(OR_CLAY_HI, OR_CLAY_LO) }} />
      </div>
    </div>
  );
};

// THE COLLECTION CRATE with a rolling odometer COUNTER on its face.
const OrHarvestCrate: React.FC<{ lf: number; x: number; y: number; count: number; stack: number; z?: number }> = ({ lf, x, y, count, stack, z = 20 }) => {
  const W = 150, H = 118;
  const digits = String(Math.round(count)).padStart(3, "0").split("");
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z }}>
      {/* the completed honey-gold cards stacked inside, growing with `stack` */}
      {Array.from({ length: Math.round(stack * 7) }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 16 + (i % 2) * 6, top: -6 - i * 8, width: W - 40, height: 22, borderRadius: 5, background: "linear-gradient(158deg,#FBEFD2,#E7C874)", border: "2px solid #C79A46", boxShadow: `0 3px 7px rgba(60,42,12,0.34), 0 0 10px rgba(231,178,76,0.5)` }}>
          <div style={{ position: "absolute", left: 6, top: 6, width: 10, height: 10, borderRadius: "50%", background: "#7C5A18" }} />
          <div style={{ position: "absolute", left: 22, top: 8, width: 40, height: 4, borderRadius: 2, background: "#7C5A18" }} />
        </div>
      ))}
      {/* the wooden crate */}
      <div style={{ position: "absolute", left: 0, top: 22, width: W, height: H - 22, borderRadius: 6, background: grad("#8A6838", "#5A4020"), border: "3px solid #3E2C14", boxShadow: "0 12px 22px rgba(20,12,4,0.5)" }}>
        {[0.34, 0.7].map((t, i) => <div key={i} style={{ position: "absolute", left: 0, top: `${t * 100}%`, width: "100%", height: 3, background: "rgba(30,18,8,0.5)" }} />)}
        {/* the odometer COUNTER window */}
        <div style={{ position: "absolute", left: W / 2 - 52, top: 30, width: 104, height: 42, borderRadius: 7, background: "linear-gradient(180deg,#241706,#120B02)", border: "3px solid #A8842A", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.7)" }}>
          {digits.map((dch, i) => (
            <div key={i} style={{ width: 24, height: 32, borderRadius: 4, background: "linear-gradient(180deg,#3A2A0C,#1A1204)", border: "1px solid #6A5314", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, lineHeight: 1, color: "#FFD469", transform: `translateY(${(i === 2 ? -(count % 1) * 4 : 0)}px)` }}>{dch}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: W / 2 - 30, top: 8, width: 60, height: 4, borderRadius: 2, background: "rgba(231,178,76,0.5)" }} />
      </div>
    </div>
  );
};

const S2: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA: framed on the lower canopy + harvester + crate, a gentle push. ----
  const push = interpolate(lf, [4, 82], [0, 1], { ...s2clamp, easing: Easing.inOut(Easing.cubic) });
  const A = { x: 622 - 506 / 0.92, y: 792 - 396 / 0.92, z: 0.92 };
  const B = { x: 656 - 506 / 1.02, y: 812 - 396 / 1.02, z: 1.02 };
  const base = lerpCam(A, B, push);
  const shk = shakeCam(lf, [{ at: 8, amp: 7, dur: 12 }], 1);
  const camX = base.x + shk.x, camY = base.y + shk.y, camZ = base.z * shk.z;

  // the harvester picker cycle (reach up, grab, come back)
  const cyc = (lf % 26) / 26;
  const reach = Math.sin(cyc * Math.PI);

  // the counter rolls up steadily, 24 -> a few hundred across the scene
  const count = interpolate(lf, [0, 88], [24, 342], s2clamp);
  const stack = interpolate(lf, [0, 88], [0.2, 1], s2clamp);

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrPlanter x={150} y={1256} s={0.9} z={7} blur={1.8} />
        <OrWateringCan x={224} y={1176} s={0.7} z={7} blur={1.7} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.4} />
        <OrButterfly lf={lf} x={260} y={820} s={0.9} z={9} hue="#F0C36A" sd={2} />

        {/* soil bed with the planted DENTISTS . AUSTIN label still standing */}
        <OrSoilBed x={S2_TX} y={S2_TG + 14} w={520} z={9} />

        {/* EASTER-EGG: the shy critter peeks from behind the trunk between picks */}
        <OrTrunkCritter lf={lf} x={S2_TX - 58} y={1030} s={1.1} side={-1} z={15} />

        {/* THE HERO TREE: fully awake, heavy with lit leads (the biggest read). Two
            eggs ride it: the "Big Tuna Dental" lead and a card that winks. */}
        <OrTree lf={lf} x={S2_TX} groundY={S2_TG} scale={4.3} blur={0} glow={1} fruits={13} sd={41} locked={0} cards={1} eggIdx={7} eggName="Big Tuna Dental" winkIdx={11} z={16} />

        {/* THE HARVESTER working the tree, driven by Claude */}
        <OrHarvester lf={lf} x={S2_HARV.x} y={S2_HARV.y} reach={reach} z={22} />
        <div style={{ position: "absolute", left: S2_HARV.x - 44, top: S2_HARV.y - 214, zIndex: 25 }}>
          <Mascot lf={lf} size={128} nodAmp={2.4} nodSpeed={11} gaze={-6} />
        </div>

        {/* the picker's small spark when it plucks at the top of each reach */}
        {reach > 0.86 && <Sparkles lf={lf} at={Math.round(lf / 26) * 26 + 13} x={S2_PLUCK.x} y={S2_PLUCK.y} n={8} life={16} spread={70} rise={40} hue="#FBE6A8" sd={3} z={30} />}

        {/* THE IN-FLIGHT PICKS: each card travels pluck -> chute -> crate, filling its
            fields LIVE along the way and completing honey-gold before it drops. */}
        {Array.from({ length: S2_PICKN }, (_, k) => {
          const t = ((lf + k * (S2_PICKP / S2_PICKN)) % S2_PICKP) / S2_PICKP;   // 0..1 travel, out of phase
          if (t < 0.02) return null;
          // path: canopy pluck -> a fill hover -> the crate
          const seg = t;
          const pathX = S2_PLUCK.x + (S2_CRATE.x - S2_PLUCK.x) * Easing.inOut(Easing.cubic)(seg);
          const pathY = S2_PLUCK.y + 30 + (S2_CRATE.y - 78 - (S2_PLUCK.y + 30)) * seg + Math.sin(seg * Math.PI) * -46;
          const fill = Math.max(0, Math.min(1, (t - 0.08) / 0.72));      // fields write on across the flight
          const done = t > 0.86;
          const pop = done ? Math.max(0, 1 - (t - 0.86) / 0.12) : 0;
          const drop = t > 0.9 ? (t - 0.9) / 0.1 : 0;
          const cy = pathY + drop * 60;
          const cs = 0.9 + Math.sin(seg * Math.PI) * 0.12;
          return <OrLeadCard key={k} lf={lf} x={pathX} y={cy} s={cs} i={k * 5 + 2} glow={1} tilt={(seed(k * 3.1) - 0.5) * 12} z={28} fill={fill} pop={pop} />;
        })}

        {/* THE COLLECTION CRATE + rolling counter */}
        <OrHarvestCrate lf={lf} x={S2_CRATE.x} y={S2_CRATE.y} count={count} stack={stack} z={20} />

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
        <OrTree lf={lf} x={1236} groundY={1150} scale={1.5} blur={4.4} glow={0.5} fruits={5} sd={61} locked={0} z={19} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 80, top: 40, width: 940, height: 980, background: "radial-gradient(ellipse at 54% 46%, rgba(255,224,150,0.24), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.16} />
      <LeadsHud lf={lf} {...leadsTally(2, lf)} />
    </AbsoluteFill>
  );
};

// (S2 helpers live above in this part.)

// ==== part: 13_S3.tsx ====

// ===========================================================================
// SCENE 3, THE SEAL. 231 frames, lf 0 to 230. Verb: STAMP + POST.
// VO: "then, Claude Code takes each row and writes a cold email personalized to
// that exact business."
//
// Bright daytime greenhouse. The focal subject is a warm CLAY STAMPING PRESS
// straddling a little CONVEYOR that carries the harvested honey-gold lead cards.
// Claude runs it. For each card a brass wax-seal DIE slams down with a squash, a
// spark and a puff, imprinting THAT business's own crest, and the card folds into
// a sealed LETTER that launches up-right and posts away. Stamp, launch, stamp,
// launch. Three distinct crests cycle, so each letter is personalised, never a
// template. The camera pushes and drifts to follow the line. Opens mid-action:
// cards already ride the belt, one is under the die, letters already in flight.
// ===========================================================================

const S3_IO = Easing.inOut(Easing.cubic);
const S3_OUTQ = Easing.out(Easing.quad);
const S3_OUTC = Easing.out(Easing.cubic);

// world anchors for the stamping line
const S3_BELTY = 918;                 // the card centres ride this line
const S3_PRESSX = 600;                // the press + die straddle here
const S3_FEEDX = 250;                 // the feed crate of harvested leads
const S3_Ps = 18, S3_D = 78;          // one card every 18f; a full journey is 78f
const S3_ARRIVE = 22, S3_STAMP = 27, S3_LETTER = 32, S3_LAUNCH = 40;
const S3_E = (n: number) => n * S3_Ps + 18;   // the frame card n enters the belt

// A CREST = one business's own mark. Three distinct silhouettes cycle, so every
// sealed letter is personalised to that exact business, not one template.
const S3Crest: React.FC<{ kind: number; size: number; col: string }> = ({ kind, size, col }) => {
  const k = ((kind % 3) + 3) % 3;
  const u = size / 24;
  const B = { position: "absolute" as const, background: col };
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {k === 0 && <>{/* a TOOTH */}
        <div style={{ ...B, left: 5 * u, top: 3 * u, width: 14 * u, height: 12 * u, borderRadius: "48% 48% 40% 40%" }} />
        <div style={{ ...B, left: 7.5 * u, top: 12 * u, width: 3.4 * u, height: 8 * u, borderRadius: 2 * u }} />
        <div style={{ ...B, left: 13 * u, top: 12 * u, width: 3.4 * u, height: 8 * u, borderRadius: 2 * u }} />
      </>}
      {k === 1 && <>{/* a DUMBBELL */}
        <div style={{ ...B, left: 5 * u, top: 10.4 * u, width: 14 * u, height: 3.2 * u, borderRadius: 1.6 * u }} />
        {[3.6, 6.4, 15.2, 18].map((x, i) => <div key={i} style={{ ...B, left: x * u, top: (i === 0 || i === 3 ? 9 : 7) * u, width: 2.4 * u, height: (i === 0 || i === 3 ? 6 : 10) * u, borderRadius: 1.2 * u }} />)}
      </>}
      {k === 2 && <>{/* a WRENCH */}
        <div style={{ ...B, left: 4.5 * u, top: 5 * u, width: 5 * u, height: 16 * u, borderRadius: 2.5 * u, transform: "rotate(-42deg)", transformOrigin: "50% 50%" }} />
        <div style={{ position: "absolute", left: 11.5 * u, top: 2.5 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", border: `${2.6 * u}px solid ${col}`, boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 12 * u, top: 1.5 * u, width: 5 * u, height: 4 * u, background: "transparent", borderTop: `${3 * u}px solid ${col}`, transform: "rotate(38deg)", transformOrigin: "0% 50%" }} />
      </>}
    </div>
  );
};

// THE CONVEYOR: a warm wooden trough with a scrolling tread, two spinning clay
// rollers and legs to the floor. The harvested leads ride it into the press.
const S3Belt: React.FC<{ lf: number; x0: number; x1: number; y: number; z?: number }> = ({ lf, x0, x1, y, z = 12 }) => {
  const W = x1 - x0, H = 34;
  const off = (lf * 2.4) % 28;
  return (
    <div style={{ position: "absolute", left: x0, top: y - H / 2, width: W, height: H, zIndex: z }}>
      {/* legs to the floor */}
      {[W * 0.16, W * 0.84].map((lx, i) => <div key={i} style={{ position: "absolute", left: lx, top: H - 6, width: 18, height: 132, background: grad("#6E4A2A", "#41290F"), borderRadius: 3, zIndex: -1, boxShadow: "0 10px 18px rgba(20,12,4,0.4)" }} />)}
      {/* the belt bed with a scrolling tread */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: grad("#8A5A3A", "#5A3722"), border: "3px solid #3E2614", boxShadow: "inset 0 3px 0 rgba(255,214,180,0.24), 0 10px 20px rgba(30,18,8,0.42)", overflow: "hidden" }}>
        {Array.from({ length: Math.ceil(W / 28) + 2 }, (_, i) => <div key={i} style={{ position: "absolute", left: i * 28 - off, top: 5, width: 12, height: H - 10, background: "rgba(28,16,6,0.3)", transform: "skewX(-24deg)" }} />)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 4, background: "rgba(255,224,180,0.18)" }} />
      </div>
      {/* the two end rollers, spinning */}
      {[-4, W - 22].map((rx, i) => (
        <div key={i} style={{ position: "absolute", left: rx, top: -7, width: 26, height: H + 14, borderRadius: "50%", background: grad("#B4573B", "#6E2E18"), border: "4px solid #4A1E0E", zIndex: 1 }}>
          <div style={{ position: "absolute", left: "38%", top: "44%", width: "24%", height: "12%", borderRadius: 2, background: OR_CLAY_HI, transformOrigin: "50% 50%", transform: `rotate(${off * 13 * (i ? 1 : 1)}deg)` }} />
        </div>
      ))}
    </div>
  );
};

// THE SEALED LETTER: a folded honey-ivory envelope carrying a triangular flap, a
// wax seal struck with that business's crest, and a name line. It is the card,
// sealed. `seal` pops the wax in, `crest` picks the business mark.
const S3Letter: React.FC<{ lf: number; x: number; y: number; s?: number; rot?: number; sy?: number; crest: number; seal: number; glow?: number; z?: number }> =
  ({ lf, x, y, s = 1, rot = 0, sy = 1, crest, seal, glow = 1, z = 26 }) => {
    const W = 68 * s, H = 46 * s;
    return (
      <div style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H, zIndex: z, transform: `rotate(${rot}deg) scaleY(${sy})`, transformOrigin: "50% 50%" }}>
        {/* the warm honey glow it carries */}
        <div style={{ position: "absolute", left: -W * 0.3, top: -H * 0.3, width: W * 1.6, height: H * 1.6, borderRadius: "50%", background: `radial-gradient(circle, ${OR_GOLD_HI}, rgba(231,178,76,0) 66%)`, opacity: 0.42 * glow, filter: `blur(${8 * s}px)`, mixBlendMode: "screen" }} />
        {/* the envelope body */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s, background: "linear-gradient(158deg,#FFF8E8,#F0DEB8)", border: `${1.8 * s}px solid ${OR_GOLD}`, boxShadow: `0 ${5 * s}px ${12 * s}px rgba(52,34,8,0.42), inset 0 ${1.4 * s}px 0 rgba(255,255,255,0.7)`, overflow: "hidden" }}>
          {/* the triangular flap folded down over the letter */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, borderLeft: `${W / 2}px solid transparent`, borderRight: `${W / 2}px solid transparent`, borderTop: `${H * 0.62}px solid rgba(199,154,70,0.34)` }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: "52%", height: 2, background: "rgba(150,110,40,0.35)", transformOrigin: "0 0", transform: `rotate(${(Math.atan2(H * 0.62, W / 2) * 180) / Math.PI}deg)` }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: "52%", height: 2, background: "rgba(150,110,40,0.35)", transformOrigin: "100% 0", transform: `rotate(${(-Math.atan2(H * 0.62, W / 2) * 180) / Math.PI}deg)` }} />
          {/* a short business-name line */}
          <div style={{ position: "absolute", left: 8 * s, top: H - 11 * s, width: 24 * s, height: 4 * s, borderRadius: 2 * s, background: "#C79A46" }} />
        </div>
        {/* THE WAX SEAL with the business crest struck into it */}
        <div style={{ position: "absolute", left: W / 2 - 12 * s, top: H / 2 - 12 * s, width: 24 * s, height: 24 * s, borderRadius: "50%", background: grad("#DBAA42", "#8A5E14"), border: `${1.6 * s}px solid #6E4A0E`, boxShadow: `0 ${2 * s}px ${5 * s}px rgba(40,24,4,0.5), inset 0 ${1.6 * s}px 0 rgba(255,240,186,0.55)`, transform: `scale(${Math.max(0, seal)})`, transformOrigin: "50% 50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <S3Crest kind={crest} size={16 * s} col="#5A3E0E" />
          {/* a couple of wax drips */}
          <div style={{ position: "absolute", left: -2 * s, top: 15 * s, width: 6 * s, height: 6 * s, borderRadius: "50%", background: "#B07A1E" }} />
          <div style={{ position: "absolute", right: 0 * s, top: 17 * s, width: 4 * s, height: 4 * s, borderRadius: "50%", background: "#B07A1E" }} />
        </div>
      </div>
    );
  };

// THE STAMPING PRESS: a clay gantry over the belt with a steel ram and a brass
// seal DIE. `slam` 0..1 drives the die down onto the card. Claude's clay machine.
const S3Press: React.FC<{ lf: number; x: number; beltY: number; slam: number; z?: number }> = ({ lf, x, beltY, slam, z = 22 }) => {
  const topY = beltY - 300;
  const dieUpY = beltY - 168, dieDownY = beltY - 52;
  const dieY = dieUpY + (dieDownY - dieUpY) * Math.max(0, Math.min(1, slam));
  const ramTop = topY + 52;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z }}>
      {/* the two clay posts flanking the belt */}
      {[-1, 1].map((d) => (
        <div key={d} style={{ position: "absolute", left: x + d * 86 - 16, top: topY + 40, width: 32, height: 320, borderRadius: 9, background: grad(OR_CLAY_HI, OR_CLAY_LO), border: "3px solid #8A3F26", boxShadow: "inset -7px 0 13px rgba(120,50,28,0.42), 0 12px 22px rgba(40,18,8,0.42)", zIndex: z - 1 }}>
          {[0.22, 0.5, 0.78].map((t, i) => <div key={i} style={{ position: "absolute", left: 5, top: `${t * 100}%`, width: 8, height: 8, borderRadius: "50%", background: "#8A3F26", boxShadow: "inset 0 1px 0 rgba(255,214,180,0.4)" }} />)}
        </div>
      ))}
      {/* the clay crossbeam body: a gauge that swings with the slam + a brass plate */}
      <div style={{ position: "absolute", left: x - 112, top: topY - 12, width: 224, height: 70, borderRadius: "22px 22px 12px 12px", background: grad(OR_CLAY_HI, OR_CLAY_LO), border: "3px solid #8A3F26", boxShadow: "inset 0 4px 0 rgba(255,214,180,0.42), inset -10px -12px 24px rgba(120,50,28,0.44), 0 14px 26px rgba(40,18,8,0.5)" }}>
        <div style={{ position: "absolute", left: 22, top: 22, width: 26, height: 26, borderRadius: "50%", background: grad("#E6BE58", "#8A6418"), border: "2px solid #5A3C10" }}>
          <div style={{ position: "absolute", left: 12, top: 4, width: 2.4, height: 10, background: "#2A1C06", transformOrigin: "50% 100%", transform: `rotate(${slam * 130 - 44}deg)` }} />
        </div>
        <div style={{ position: "absolute", right: 16, top: 24, width: 128, height: 24, borderRadius: 5, background: grad("#D0A464", "#9E703B"), border: "2px solid #6E4A24", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, letterSpacing: "0.06em", color: "#2E1B0C" }}>OUTREACH</div>
      </div>
      {/* the steel ram driving the die */}
      <div style={{ position: "absolute", left: x - 10, top: ramTop, width: 20, height: Math.max(6, dieY - ramTop), background: grad("#9AA4AE", "#5A636E"), borderRadius: 5, boxShadow: "inset 2px 0 0 rgba(240,246,252,0.4)", zIndex: z + 1 }} />
      {/* the DIE head carrying the brass seal face */}
      <div style={{ position: "absolute", left: x - 36, top: dieY, width: 72, height: 44, borderRadius: "12px 12px 15px 15px", background: grad(OR_CLAY_HI, OR_CLAY_LO), border: "3px solid #8A3F26", boxShadow: "0 6px 14px rgba(40,18,8,0.5), inset 0 3px 0 rgba(255,214,180,0.4)", zIndex: z + 2 }}>
        <div style={{ position: "absolute", left: 20, top: 30, width: 32, height: 16, borderRadius: "4px 4px 9px 9px", background: grad("#E6C06A", "#8A6418"), border: "2px solid #5A3C10", boxShadow: "inset 0 2px 0 rgba(255,240,186,0.5)" }} />
      </div>
    </div>
  );
};

const S3: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // ------- the active cards on the line (belt -> stamp -> fold -> launch) -------
  const cards: { n: number; ct: number }[] = [];
  for (let n = Math.floor((lf - S3_D - 20) / S3_Ps); n <= Math.ceil((lf) / S3_Ps) + 1; n++) {
    const ct = lf - S3_E(n);
    if (ct >= 0 && ct <= S3_D) cards.push({ n, ct });
  }

  // the die slam: peaks the instant a card sits at ct=STAMP, so press and card
  // are always in sync. Fully retracts between cards, so the rhythm reads.
  let strike = 0;
  for (const c of cards) strike = Math.max(strike, Math.max(0, 1 - Math.abs(c.ct - S3_STAMP) / 5));
  // a hair of overshoot so the die never dead-stops at the bottom
  const slam = Math.max(0, Math.min(1, strike)) + settle(lf, 0, 0, 0, 0);   // strike drives it

  // ---- CAMERA: opens on the press + belt, a slow push and rightward drift that
  // follows the letters as they launch, plus a micro-kick on every slam. ----
  const push = over(lf, 4, 214, S3_IO);
  const ccx = 606 + 86 * push;
  const ccy = 872 - 74 * push;
  const ccz = 0.95 + 0.075 * push;
  const life = shakeCam(lf, [], 1);
  const camZ = ccz * life.z;
  const camX = (ccx - 506 / camZ) + life.x;
  const camY = (ccy - 396 / camZ) + life.y + strike * 3;

  // ---- CLAUDE runs the press from its right, pumping a clay handle in time. ----
  const CX = 826, CG = 1050, CS = 152;
  const knobX = 712, knobY = 760 + slam * 46;              // the pump handle he works
  const CSHX = CX - CS * 0.30, CSHY = CG - CS * 0.52;
  const armL = Math.hypot(knobX - CSHX, knobY - CSHY);
  const armA = (Math.atan2(knobY - CSHY, knobX - CSHX) * 180) / Math.PI;

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING (dim, blurred, supporting the hero) */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.4} />
        <OrButterfly lf={lf} x={300} y={780} s={0.9} z={9} hue="#F0C36A" sd={5} />

        {/* the DIM harvested tree in the back, where these leads came from */}
        <OrTree lf={lf} x={168} groundY={1226} scale={1.32} blur={4.6} glow={0.5} fruits={6} sd={41} locked={0} z={6} />

        {/* THE FEED CRATE of harvested honey-gold leads, feeding the belt */}
        <OrHarvestCrate lf={lf} x={S3_FEEDX} y={1006} count={342} stack={1} z={11} />

        {/* THE CONVEYOR carrying the leads into the press */}
        <S3Belt lf={lf} x0={300} x1={720} y={S3_BELTY} z={12} />

        {/* CLAUDE (clay hero) working the press from its right */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 20 }}>
          <div style={{ position: "absolute", left: CSHX, top: CSHY - 12, width: armL, height: 24, borderRadius: 12, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "0% 50%", transform: `rotate(${armA}deg)`, boxShadow: "0 6px 14px rgba(70,30,16,0.4)", zIndex: 20 }} />
          <div style={{ position: "absolute", left: knobX - 15, top: knobY - 15, width: 30, height: 30, borderRadius: "50%", background: grad("#9AA4AE", "#5A636E"), border: "3px solid #4A525B", zIndex: 21 }} />
        </div>
        <div style={{ position: "absolute", left: CX - CS / 2, top: CG - CS, zIndex: 21, transformOrigin: `${CS / 2}px ${CS}px`, transform: `rotate(${-slam * 2}deg)` }}>
          <Mascot lf={lf} size={CS} nodAmp={2.2} nodSpeed={11} gaze={-7} />
        </div>

        {/* THE STAMPING PRESS straddling the belt (biggest, sharpest read) */}
        <S3Press lf={lf} x={S3_PRESSX} beltY={S3_BELTY} slam={slam} z={22} />

        {/* ---------------- THE CARDS: ride, stamp, fold, launch ---------------- */}
        {cards.map(({ n, ct }) => {
          const crest = ((n % 3) + 3) % 3;
          const posFor = (t: number) => {
            if (t <= S3_ARRIVE) { const u = t / S3_ARRIVE; return { x: 320 + (S3_PRESSX - 320) * u, y: S3_BELTY, sc: 1, rot: 0, lp: 0 }; }
            if (t <= S3_LAUNCH) return { x: S3_PRESSX, y: S3_BELTY, sc: 1, rot: 0, lp: 0 };
            const lp = Math.min(1, (t - S3_LAUNCH) / (S3_D - S3_LAUNCH));
            const ex = S3_OUTQ(lp), ey = S3_OUTC(lp);
            return { x: S3_PRESSX + (1210 - S3_PRESSX) * ex, y: S3_BELTY - (S3_BELTY - 452) * ey, sc: 1 - 0.5 * lp, rot: -5 + lp * 28, lp };
          };
          const p = posFor(ct), pm = posFor(ct - 1);
          const vx = p.x - pm.x, vy = p.y - pm.y;
          const fade = 1 - Math.max(0, (p.lp - 0.82) / 0.18);
          if (fade <= 0.02) return null;

          if (ct < S3_LETTER) {
            // the honey-gold LEAD riding the belt / sitting under the die, taking
            // the seal from ct=STAMP (the wax pops on as the die presses)
            const sealPop = Math.max(0, Math.min(1, (ct - S3_STAMP) / 4));
            const sq = squash(ct, S3_STAMP, 0.26, 3);
            return (
              <React.Fragment key={n}>
                <div style={{ position: "absolute", left: 0, top: 0, zIndex: 25, transformOrigin: `${p.x}px ${p.y + 24}px`, transform: `scale(${sq.sx}, ${sq.sy})` }}>
                  <OrLeadCard lf={lf} x={p.x} y={p.y} s={1.5} i={n * 3 + 4} glow={1} tilt={(seed(n * 3.1) - 0.5) * 8} z={25} />
                </div>
                {sealPop > 0.01 && (
                  <div style={{ position: "absolute", left: p.x - 18, top: p.y - 18, width: 36, height: 36, borderRadius: "50%", background: grad("#DBAA42", "#8A5E14"), border: "2.4px solid #6E4A0E", boxShadow: "0 3px 7px rgba(40,24,4,0.5), inset 0 2px 0 rgba(255,240,186,0.55)", transform: `scale(${sealPop})`, transformOrigin: "50% 50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 29 }}>
                    <S3Crest kind={crest} size={24} col="#5A3E0E" />
                  </div>
                )}
              </React.Fragment>
            );
          }
          // the SEALED LETTER: a quick fold squash, then it launches and posts away
          const foldSY = 1 - 0.32 * Math.max(0, 1 - Math.abs(ct - (S3_LETTER + 1)) / 3);
          return (
            <Smear key={n} dx={vx} dy={vy} ghosts={3} on={p.lp > 0 ? 1 : 0} o={0.28} z={26}>
              <S3Letter lf={lf} x={p.x} y={p.y} s={1.5 * p.sc} rot={p.rot} sy={foldSY} crest={crest} seal={1} glow={fade} z={26} />
            </Smear>
          );
        })}

        {/* THE STAMP HIT: for each card, a spark, a bright contact flash and a puff
            of packing dust off the die on the exact frame it strikes */}
        {cards.map(({ n, ct }) => {
          const at = S3_E(n) + S3_STAMP;
          return (
            <React.Fragment key={"fx" + n}>
              <Sparkles lf={lf} at={at} x={S3_PRESSX} y={S3_BELTY - 8} n={10} life={18} spread={104} rise={62} hue="#FBE6A8" sd={n * 7 + 3} z={31} o={0.9} />
              <Dust lf={lf} at={at} x={S3_PRESSX} y={S3_BELTY + 8} n={7} life={30} spread={92} hue="rgba(214,184,124,0.5)" sd={n * 3 + 1} z={19} o={0.85} />
              {Math.abs(ct - S3_STAMP) < 4 && (
                <div style={{ position: "absolute", left: S3_PRESSX - 60, top: S3_BELTY - 44, width: 120, height: 90, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,244,196,0.85), transparent 66%)", opacity: (1 - Math.abs(ct - S3_STAMP) / 4) * 0.8, filter: "blur(8px)", mixBlendMode: "screen", zIndex: 30, pointerEvents: "none" }} />
              )}
            </React.Fragment>
          );
        })}
        {/* the ground ring the die pushes across the belt on each strike */}
        {cards.map(({ n }) => <GroundRing key={"gr" + n} lf={lf} at={S3_E(n) + S3_STAMP} x={S3_PRESSX} y={S3_BELTY + 14} r={150} dur={16} hue="rgba(240,222,178,0.5)" z={18} />)}

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT (bright greenhouse day) ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 60, top: 0, width: 960, height: 980, background: "radial-gradient(ellipse at 52% 46%, rgba(255,224,150,0.24), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.16} />
      <LeadsHud lf={lf} {...leadsTally(3, lf)} />
    </AbsoluteFill>
  );
};

// ==== part: 14_S4.tsx ====

// ============================================================================
// SCENE 4 - TALLY / PAYOFF.  172 frames (lf 0..171).  Verb: PILE + KILL.
// VO: "20 minutes later, you've got hundreds of real leads, emails included,
// ready to send, no Clay, no Apollo, nothing with a monthly bill."
//
// Bright daytime greenhouse. Crates of sealed honey-gold leads POUR in from
// above and stack into a MOUNTAIN while a big brass ODOMETER spins up to 512 and
// lands with a pop and a flash (the hero number). Then Claude reaches over and
// YANKS the cords out of two cold-steel subscription meters, "$500 / mo" (CLAY)
// and "$99 / mo" (APOLLO): their needles drop to zero, their screens go dark,
// their billing lights die and they slump. Opens mid-pour, ends on the two dead
// meters and the glowing 512.
// ============================================================================

// a wooden crate HEAPED with glowing honey-gold lead cards spilling over the top.
const S4Crate: React.FC<{ lf: number; x: number; y: number; s?: number; sd?: number; z?: number }> = ({ lf, x, y, s = 1, sd = 0, z = 20 }) => {
  const W = 150 * s, H = 100 * s;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z }}>
      {/* honey underglow the heap of leads throws */}
      <div style={{ position: "absolute", left: -W * 0.16, top: -H * 0.28, width: W * 1.32, height: H * 0.9, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(231,178,76,0.42), transparent 66%)", filter: `blur(${9 * s}px)`, mixBlendMode: "screen" }} />
      {/* the wooden crate body */}
      <div style={{ position: "absolute", left: 0, top: H * 0.32, width: W, height: H * 0.68, borderRadius: 6 * s, background: grad("#8A6838", "#523A1C"), border: `${3 * s}px solid #33240F`, boxShadow: `0 ${12 * s}px ${22 * s}px rgba(20,12,4,0.5), inset 0 ${2 * s}px 0 rgba(255,224,170,0.24)` }}>
        {[0.42, 0.74].map((t, i) => <div key={i} style={{ position: "absolute", left: 0, top: `${t * 100}%`, width: "100%", height: 3 * s, background: "rgba(28,16,6,0.5)" }} />)}
        {[0.12, 0.88].map((t, i) => <div key={"v" + i} style={{ position: "absolute", left: `${t * 100}%`, top: 0, width: 3 * s, height: "100%", background: "rgba(28,16,6,0.4)" }} />)}
      </div>
      {/* the mound of glowing honey-gold cards heaped over the crate */}
      {Array.from({ length: 6 }, (_, i) => {
        const cx = W / 2 + (seed(i * 2.3 + sd) - 0.5) * W * 0.66;
        const cy = H * 0.34 - i * 6 * s - seed(i * 1.7 + sd) * 9 * s;
        return <OrLeadCard key={i} lf={lf} x={cx} y={cy} s={0.32 * s} i={i * 3 + sd} glow={1} tilt={(seed(i * 3.1 + sd) - 0.5) * 26} z={z + 2 + i} />;
      })}
    </div>
  );
};

// THE HERO ODOMETER: a big brass counter board hung on two chains, honey-gold
// digit wheels on a dark face. `pop` punches it on the landing frame.
const S4Counter: React.FC<{ lf: number; x: number; y: number; count: number; pop?: number; z?: number }> = ({ lf, x, y, count, pop = 0, z = 30 }) => {
  const digits = String(Math.round(count)).padStart(3, "0").split("");
  const W = 320, H = 152;
  const scl = 1 + pop * 0.13;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H, width: W, height: H, zIndex: z, transform: `scale(${scl})`, transformOrigin: "50% 40%" }}>
      {/* the two hanging chains */}
      {[-1, 1].map((d) => <div key={d} style={{ position: "absolute", left: W / 2 + d * (W * 0.34) - 3, top: -120, width: 6, height: 122, background: "linear-gradient(180deg,#6A5310,#B99A38)", borderRadius: 3 }} />)}
      {/* brass frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: grad("#D2AC42", "#5E4710"), border: "6px solid #3E3008", boxShadow: `0 20px 36px rgba(20,12,4,0.55), inset 0 4px 0 rgba(255,242,198,0.5), 0 0 ${(24 + pop * 40).toFixed(0)}px rgba(231,178,76,${(0.3 + pop * 0.5).toFixed(2)})` }}>
        <div style={{ position: "absolute", left: 0, top: 12, width: "100%", textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.26em", color: "#2A1C06" }}>LEADS</div>
        <div style={{ position: "absolute", left: W / 2 - (digits.length * 46) / 2, top: 44, display: "flex", gap: 7 }}>
          {digits.map((d, i) => (
            <div key={i} style={{ width: 40, height: 66, borderRadius: 7, background: "linear-gradient(180deg,#20150A,#0A0602)", border: "2px solid #A8842A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "inset 0 3px 10px rgba(0,0,0,0.85)" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, lineHeight: 1, color: "#FFD469", textShadow: "0 0 12px rgba(255,196,80,0.8)", transform: `translateY(${(i === digits.length - 1 ? -(count % 1) * 7 : 0)}px)` }}>{d}</div>
            </div>
          ))}
        </div>
        {/* a specular crawling the brass so it never sits flat */}
        <div style={{ position: "absolute", left: -40 + ((lf * 3.2) % (W + 80)), top: 0, width: 34, height: H, background: "linear-gradient(90deg, transparent, rgba(255,246,214,0.28), transparent)", transform: "skewX(-16deg)", mixBlendMode: "screen" }} />
      </div>
    </div>
  );
};

// A COLD-STEEL SUBSCRIPTION METER. A round billing gauge, a green $ readout, a
// brand nameplate and a red billing LED, on a steel stand with a power cord.
// `dead` 0..1 drops the needle to zero, kills the screen and LED, darkens the
// steel, yanks the cord out and slumps the whole unit.
const S4Meter: React.FC<{ lf: number; x: number; footY: number; label: string; brand: string; logo?: string; dead?: number; s?: number; z?: number }> = ({ lf, x, footY, label, brand, logo, dead = 0, s = 1, z = 24 }) => {
  const d = Math.max(0, Math.min(1, dead));
  const alive = 1 - d;
  const W = 138 * s, H = 172 * s;
  const topY = footY - H - 44 * s;
  const zeroAng = -84, billAng = 20 + 18 * Math.sin(lf / 6);
  const needleAng = zeroAng + (billAng - zeroAng) * alive;
  const led = alive * (0.55 + 0.45 * Math.sin(lf / 5));
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: 0, width: W, height: footY, zIndex: z, transformOrigin: `${W / 2}px ${footY}px`, transform: `rotate(${(d * 12).toFixed(2)}deg)` }}>
      {/* the stand + base */}
      <div style={{ position: "absolute", left: W / 2 - 7 * s, top: topY + H - 8 * s, width: 14 * s, height: 52 * s, background: grad(OR_IRON_HI, OR_STONE), borderRadius: 3 * s }} />
      <div style={{ position: "absolute", left: W / 2 - 36 * s, top: footY - 15 * s, width: 72 * s, height: 18 * s, borderRadius: "50%", background: grad(OR_STONE, "#0C0F14") }} />
      {/* the cold-steel body */}
      <div style={{ position: "absolute", left: 0, top: topY, width: W, height: H, borderRadius: 13 * s, background: grad(OR_IRON_HI, OR_IRON), border: `${3 * s}px solid #0C1015`, boxShadow: `0 ${13 * s}px ${24 * s}px rgba(6,10,16,0.6), inset 0 ${2 * s}px 0 rgba(190,206,224,0.26)`, filter: d > 0.25 ? `brightness(${(1 - 0.42 * d).toFixed(2)}) saturate(${(1 - 0.55 * d).toFixed(2)})` : "none" }}>
        {/* the round billing gauge */}
        <div style={{ position: "absolute", left: W / 2 - 44 * s, top: 15 * s, width: 88 * s, height: 88 * s, borderRadius: "50%", background: "radial-gradient(circle at 42% 36%, #C9D4DE, #7C8894 58%, #444D58)", border: `${3 * s}px solid #262D36`, boxShadow: "inset 0 3px 9px rgba(0,0,0,0.42)" }}>
          {Array.from({ length: 7 }, (_, i) => { const a = (-90 + i * 30) * Math.PI / 180; return <div key={i} style={{ position: "absolute", left: `${50 + Math.cos(a) * 39}%`, top: `${50 + Math.sin(a) * 39}%`, width: 3 * s, height: 7 * s, background: "#262D36", transform: `translate(-50%,-50%) rotate(${i * 30}deg)` }} />; })}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 4 * s, height: 36 * s, background: d > 0.5 ? "#5A636E" : "#C4463A", borderRadius: 2 * s, transformOrigin: "50% 100%", transform: `translate(-50%,-100%) rotate(${needleAng.toFixed(1)}deg)` }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 11 * s, height: 11 * s, borderRadius: "50%", background: "#262D36", transform: "translate(-50%,-50%)" }} />
        </div>
        {/* the digital $ per-month readout */}
        <div style={{ position: "absolute", left: 12 * s, top: 112 * s, right: 12 * s, height: 30 * s, borderRadius: 5 * s, background: d > 0.5 ? "#080B10" : "#0A1A12", border: `${2 * s}px solid #080B10`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18 * s, whiteSpace: "nowrap", color: d > 0.5 ? "#2A3038" : "#6FE0A2", letterSpacing: "0.01em", textShadow: d > 0.5 ? "none" : "0 0 8px rgba(90,220,150,0.55)" }}>{label}</div>
        </div>
        {/* the brand nameplate */}
        <div style={{ position: "absolute", left: 0, top: 146 * s, width: "100%", textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s, letterSpacing: "0.24em", color: d > 0.5 ? "#454C56" : "#B4C2D0" }}>{brand}</div>
        {/* the red billing LED */}
        <div style={{ position: "absolute", left: 15 * s, top: 17 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", background: led > 0.1 ? "#FF5A4A" : "#331C1C", boxShadow: led > 0.1 ? `0 0 ${10 * s}px rgba(255,90,74,${Math.max(0, led).toFixed(2)})` : "none" }} />
      </div>
      {/* the OFFICIAL brand logo badge crowning the meter (greys + dims on death) */}
      {logo ? (
        <div style={{ position: "absolute", left: W / 2 - 31 * s, top: topY - 36 * s, width: 62 * s, height: 62 * s, borderRadius: 15 * s, background: "#F5F3ED", border: `${3 * s}px solid #0C1015`, boxShadow: `0 ${7 * s}px ${16 * s}px rgba(6,10,16,0.5), inset 0 ${2 * s}px 0 rgba(255,255,255,0.65)`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", filter: d > 0.2 ? `grayscale(${(0.9 * d).toFixed(2)}) brightness(${(1 - 0.42 * d).toFixed(2)})` : "none", opacity: 1 - d * 0.22, transform: `rotate(${(d * 8).toFixed(1)}deg)` }}>
          <Img src={logo} style={{ width: "82%", height: "82%", objectFit: "contain" }} />
        </div>
      ) : null}
      {/* the power cord + plug: yanked out and dropping on death */}
      <div style={{ position: "absolute", left: W - 8 * s, top: topY + H * 0.44, width: (32 - d * 10) * s, height: 8 * s, borderRadius: 4 * s, background: "#1C2229", transformOrigin: "0% 50%", transform: `rotate(${(d * 30).toFixed(1)}deg)` }} />
      <div style={{ position: "absolute", left: (W + 26) * s - d * 46 * s, top: topY + H * 0.44 - 3 * s + d * 66 * s, width: 22 * s, height: 15 * s, borderRadius: 3 * s, background: grad("#3A424C", "#181E25"), transform: `rotate(${(d * 70).toFixed(1)}deg)` }}>
        {[5, 12].map((px) => <div key={px} style={{ position: "absolute", left: px * s, top: -5 * s, width: 3 * s, height: 6 * s, background: "#8A97A4" }} />)}
      </div>
    </div>
  );
};

const S4: React.FC<{ lf: number }> = ({ lf }) => {
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const COUNT_LAND = 56, KILL_A = 84, KILL_B = 118;

  // ---- CAMERA: framed on the growing mountain + the counter, easing back and
  // drifting right so the two meters come fully into frame for their kill. ----
  const push = over(lf, 0, 156, Easing.inOut(Easing.cubic));
  const A = { x: 548 - 506 / 1.03, y: 826 - 396 / 1.03, z: 1.03 };
  const B = { x: 744 - 506 / 0.94, y: 852 - 396 / 0.94, z: 0.94 };
  const base = lerpCam(A, B, push);
  const shk = shakeCam(lf, [{ at: COUNT_LAND, amp: 14, dur: 17 }, { at: KILL_A, amp: 9, dur: 13 }, { at: KILL_B, amp: 9, dur: 13 }], 1);
  const camX = base.x + shk.x, camY = base.y + shk.y, camZ = base.z * shk.z;

  // ---- THE COUNTER rolls fast then lands on 512 with a pop. ----
  const count = interpolate(lf, [4, COUNT_LAND], [37, 512], { ...clamp, easing: Easing.out(Easing.cubic) });
  const counterPop = Math.max(0, over(lf, COUNT_LAND, 3) - over(lf, COUNT_LAND + 6, 16));

  // ---- THE TWO METERS die, one then the other. ----
  const deadA = over(lf, KILL_A, 13, Easing.out(Easing.cubic));
  const deadB = over(lf, KILL_B, 13, Easing.out(Easing.cubic));
  const MA = { x: 884, footY: 1116 }, MB = { x: 1066, footY: 1122 };

  // ---- CLAUDE, right of the pile, cheers on the landing then reaches over and
  // yanks each cord out. The drawn clay arm extends to a plug then snaps back. ----
  const CX = 742, CG = 1156, CS = 150;
  const shX = CX + CS * 0.18, shY = CG - CS * 0.52;
  let tx = 900, ty = 1010;
  let ext = 0;
  if (lf < KILL_B - 20) { tx = 962; ty = 992; ext = over(lf, KILL_A - 18, 15) * (1 - over(lf, KILL_A, 6, Easing.in(Easing.quad))); }
  else { tx = 1150; ty = 992; ext = over(lf, KILL_B - 18, 15) * (1 - over(lf, KILL_B, 6, Easing.in(Easing.quad))); }
  const handX = shX + (tx - shX) * ext, handY = shY + (ty - shY) * ext;
  const armL = Math.hypot(handX - shX, handY - shY), armA = Math.atan2(handY - shY, handX - shX) * 180 / Math.PI;
  const cheer = Math.max(0, over(lf, COUNT_LAND - 2, 6) - over(lf, COUNT_LAND + 22, 18));
  const claudeGaze = lf < KILL_B - 20 ? 6 : 9;

  // ---- THE POUR: crates fall from above and stack into a mountain. ----
  const CRATES: { x: number; y: number; s: number; at: number }[] = [
    { x: 300, y: 1148, s: 1.00, at: 3 },
    { x: 452, y: 1150, s: 1.05, at: 9 },
    { x: 600, y: 1148, s: 0.98, at: 15 },
    { x: 222, y: 1150, s: 0.82, at: 21 },
    { x: 374, y: 1082, s: 0.94, at: 28 },
    { x: 524, y: 1082, s: 0.96, at: 35 },
    { x: 664, y: 1092, s: 0.78, at: 42 },
    { x: 300, y: 1082, s: 0.74, at: 48 },
    { x: 448, y: 1016, s: 0.88, at: 55 },
    { x: 388, y: 958, s: 0.72, at: 64 },
  ];

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.4} />
        <OrButterfly lf={lf} x={300} y={780} s={0.9} z={9} hue="#F0C36A" sd={4} />
        <OrPottingBench x={1180} y={1220} s={0.8} z={7} blur={1.7} />

        {/* the DIM harvested hero tree in the back, where these leads came from */}
        <OrTree lf={lf} x={160} groundY={1236} scale={1.3} blur={4.6} glow={0.5} fruits={6} sd={41} locked={0} z={6} />

        {/* THE HERO ODOMETER, hung above the pile */}
        <S4Counter lf={lf} x={430} y={604} count={count} pop={counterPop} z={13} />
        {/* the counter LANDING: a flash, a pulse ring and a burst of sparks */}
        {counterPop > 0.01 && (
          <>
            <PulseRing t={over(lf, COUNT_LAND, 20)} x={430} y={548} r={360} hue="rgba(251,230,168,0.65)" o={0.85} z={12} />
            <Sparkles lf={lf} at={COUNT_LAND} x={430} y={548} n={20} life={26} spread={300} rise={120} hue="#FBE6A8" sd={7} z={40} o={0.9} />
            <div style={{ position: "absolute", left: 430 - 220, top: 548 - 150, width: 440, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,246,214,0.85), transparent 66%)", opacity: counterPop * 0.9, mixBlendMode: "screen", zIndex: 12, pointerEvents: "none" }} />
          </>
        )}

        {/* ---- THE POUR: crates falling and stacking, each landing with an impact ---- */}
        {CRATES.map((c, i) => {
          const FALL = 30;
          const startT = c.at - FALL;
          if (lf < startT) return null;
          const p = Math.max(0, Math.min(1, (lf - startT) / FALL));
          const airborne = lf < c.at;
          const y = airborne ? c.y - (1 - p * p) * 660 : c.y;
          const sq = squash(lf, c.at, 0.22, 3);
          const zc = Math.round(c.y / 6);
          return (
            <React.Fragment key={"cr" + i}>
              <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: `${c.x}px ${y}px`, transform: `scale(${sq.sx.toFixed(3)}, ${sq.sy.toFixed(3)})`, zIndex: zc }}>
                <S4Crate lf={lf} x={c.x} y={y} s={c.s} sd={i * 5 + 1} z={zc} />
              </div>
              {!airborne && lf < c.at + 34 && (
                <Impact lf={lf} at={c.at} x={c.x} y={c.y} strength={0.7 * c.s} hue="rgba(255,244,206,0.55)" dustHue="rgba(214,192,142,0.5)" z={zc + 5} debris={4} sparks={5} sd={i * 3 + 2} />
              )}
            </React.Fragment>
          );
        })}

        {/* ---- THE TWO COLD-STEEL SUBSCRIPTION METERS ---- */}
        <S4Meter lf={lf} x={MA.x} footY={MA.footY} label="$500 / mo" brand="CLAY" logo={staticFile("logos/clay.png")} dead={deadA} z={150} />
        <S4Meter lf={lf} x={MB.x} footY={MB.footY} label="$99 / mo" brand="APOLLO" logo={staticFile("logos/apollo.png")} dead={deadB} z={152} />
        {/* the spark + dark puff the moment each cord is yanked out */}
        <Sparkles lf={lf} at={KILL_A} x={MA.x + 74} y={984} n={9} life={16} spread={90} rise={40} hue="#C7E0F2" sd={3} z={160} o={0.8} />
        <Dust lf={lf} at={KILL_A + 1} x={MA.x} y={1044} n={7} life={54} spread={80} hue="rgba(120,132,146,0.42)" sd={6} z={149} />
        <GroundRing lf={lf} at={KILL_A + 2} x={MA.x} y={MA.footY} r={150} dur={18} hue="rgba(150,164,180,0.5)" z={149} />
        <Sparkles lf={lf} at={KILL_B} x={MB.x + 74} y={990} n={9} life={16} spread={90} rise={40} hue="#C7E0F2" sd={9} z={162} o={0.8} />
        <Dust lf={lf} at={KILL_B + 1} x={MB.x} y={1050} n={7} life={54} spread={80} hue="rgba(120,132,146,0.42)" sd={11} z={151} />
        <GroundRing lf={lf} at={KILL_B + 2} x={MB.x} y={MB.footY} r={150} dur={18} hue="rgba(150,164,180,0.5)" z={151} />

        {/* ---- CLAUDE (clay hero): the yanking arm, then the body ---- */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 197 }}>
          <div style={{ position: "absolute", left: shX, top: shY - 12, width: armL, height: 24, borderRadius: 12, background: grad(OR_CLAY_HI, OR_CLAY_LO), transformOrigin: "0% 50%", transform: `rotate(${armA.toFixed(2)}deg)`, boxShadow: "0 6px 14px rgba(70,30,16,0.4)", opacity: ext > 0.04 ? 1 : 0 }} />
          {ext > 0.04 && <div style={{ position: "absolute", left: handX - 16, top: handY - 15, width: 32, height: 30, borderRadius: "14px 14px 12px 12px", background: grad(OR_CLAY_HI, OR_CLAY_LO), boxShadow: "inset 0 3px 0 rgba(255,214,180,0.4), 0 5px 12px rgba(70,30,16,0.4)" }} />}
        </div>
        <div style={{ position: "absolute", left: CX - CS / 2, top: CG - CS, zIndex: 198 }}>
          <Mascot lf={lf} size={CS} nodAmp={2.4} nodSpeed={11} gaze={claudeGaze} cheer={cheer} />
        </div>

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
        <OrTree lf={lf} x={1236} groundY={1160} scale={1.4} blur={4.4} glow={0.5} fruits={5} sd={61} locked={0} z={205} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT (bright greenhouse day) ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 20, top: -40, width: 900, height: 1000, background: "radial-gradient(ellipse at 46% 44%, rgba(255,224,150,0.26), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.16} />
      {/* the persistent tally lands on 512 in lock-step with the big brass odometer */}
      <LeadsHud lf={lf} {...leadsTally(4, lf)} />
    </AbsoluteFill>
  );
};

// ==== part: 15_S5.tsx ====

// ============================================================================
// SCENE 5 - REVEAL + VILLAIN DEMOTION.  138 frames (lf 0..137).  Verb: REVEAL.
// VO: "this is the same lead machine that runs six-figure agencies, and you've
// just built it in one chat."
//
// The camera CRANES UP and PULLS BACK off the one hero tree to reveal a whole
// FIELD of the same lead-trees under a hanging "SIX-FIGURE / AGENCIES" sign (this
// is the rig a big agency runs), then SNAPS back down to Claude's single planted
// input, the DENTISTS . AUSTIN seed-label (you built it in one chat). Meanwhile
// the Rent-Farmer is COUNTED: his redacted RENTED ROWS ledger flips open and the
// number resolves, his cold-steel padlock shatters (the row it owned greens back
// to life), and he SHRINKS and slumps as his placard flips LANDLORD to TENANT.
// He ends small, still present, no longer in control.
// ============================================================================

const S5_TX = 566, S5_TG = 1044;                 // the hero tree (same world as S1/S2)

// the LANDLORD -> TENANT placard, a small wooden sign that flips edge-on.
const S5Placard: React.FC<{ flip: number; x: number; y: number; z?: number }> = ({ flip, x, y, z = 30 }) => {
  const f = Math.max(0, Math.min(1, flip));
  const face = f > 0.5;
  return (
    <div style={{ position: "absolute", left: x - 74, top: y, width: 148, height: 48, zIndex: z, transformOrigin: "50% 50%", transform: `rotateY(${(f * 180).toFixed(1)}deg)` }}>
      <div style={{ position: "absolute", left: 68, top: -16, width: 3, height: 18, background: "#5A4526" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: face ? grad("#5A616C", "#3A404A") : grad("#8A5A34", "#5A3A20"), border: `3px solid ${face ? "#2A2F38" : "#3A2410"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(20,12,4,0.5)" }}>
        <span style={{ transform: `rotateY(${(f * -180).toFixed(1)}deg)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: "0.08em", color: face ? "#C3CBD5" : "#F4E4C4" }}>{face ? "TENANT" : "LANDLORD"}</span>
      </div>
    </div>
  );
};

const S5: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- CAMERA: hero tree -> crane up + pull back to the whole field -> snap back
  // down to the one input label. Ease out on the pull so f0 is the fastest frame. ----
  const cen = (cx: number, cy: number, z: number) => ({ x: cx - 506 / z, y: cy - 396 / z, z });
  const PA = cen(566, 832, 1.06);   // start: the hero tree
  const PB = cen(812, 704, 0.56);   // wide: the whole agency field + the sign
  const PC = cen(468, 972, 1.12);   // snap: the one planted input + Claude
  const pull = over(lf, 0, 66, Easing.out(Easing.cubic));
  const snap = over(lf, 98, 34, Easing.inOut(Easing.cubic));
  const base = lerpCam(lerpCam(PA, PB, pull), PC, snap);
  const shk = shakeCam(lf, [{ at: 2, amp: 9, dur: 14 }, { at: 70, amp: 11, dur: 15 }, { at: 100, amp: 9, dur: 14 }], 1);
  const camX = base.x + shk.x, camY = base.y + shk.y, camZ = base.z * shk.z;

  // ---- THE AGENCY SIGN over the field. Settles in on the pull, recedes on snap. ----
  const signIn = over(lf, 22, 24, Easing.out(Easing.back(1.6)));
  const signOut = over(lf, 96, 18);
  const signV = signIn * (1 - signOut);
  const signDrop = (1 - signIn) * -40;

  // ---- THE VILLAIN, COUNTED then DEMOTED. ----
  const ledgerOpen = over(lf, 42, 22, Easing.out(Easing.cubic));   // the redacted ledger flips open
  const ledgerCount = interpolate(lf, [46, 68], [0, 512], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const strike = over(lf, 70, 10);                                 // a red bar strikes his price
  const shatter = over(lf, 60, 16, Easing.out(Easing.quad));       // the padlock breaks
  const unlock = over(lf, 62, 18);                                 // the row it owned greens back
  const shrink = over(lf, 66, 30, Easing.inOut(Easing.cubic));     // he shrinks
  const slump = over(lf, 68, 26);                                  // and slumps
  const placardFlip = over(lf, 76, 14, Easing.inOut(Easing.cubic));
  const brokerS = 128 * (1 - 0.56 * shrink);
  const brokerRecoil = Math.max(0, over(lf, 60, 8) - over(lf, 88, 22));

  // ---- CLAUDE at the input for the snap-back ending. ----
  const claudeGaze = 8;

  // ---- the agency field trees. Hero front + biggest; the rest smaller, dimmer,
  // set further back, so the hero keeps the hierarchy. ----
  const FIELD: { x: number; g: number; s: number; glow: number; blur: number; sd: number }[] = [
    { x: 128, g: 998, s: 2.5, glow: 0.66, blur: 0.8, sd: 12 },
    { x: 1030, g: 990, s: 2.4, glow: 0.64, blur: 1.0, sd: 24 },
    { x: 1390, g: 974, s: 2.1, glow: 0.58, blur: 1.5, sd: 33 },
    { x: 1620, g: 964, s: 1.9, glow: 0.54, blur: 1.9, sd: 47 },
  ];

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* recessive DAY DRESSING */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrButterfly lf={lf} x={640} y={800} s={0.9} z={9} hue="#F0C36A" sd={6} />

        {/* ---- THE AGENCY FIELD: a row of the same lead-trees behind the hero ---- */}
        {FIELD.map((t, i) => (
          <OrTree key={"af" + i} lf={lf} x={t.x} groundY={t.g} scale={t.s} blur={t.blur} glow={t.glow * (0.55 + 0.45 * pull)} fruits={11} sd={t.sd} locked={0} cards={1} z={10 + i} />
        ))}

        {/* EASTER-EGG: a tiny clay-Claude out in the far field, celebrating and
            juggling a lead as the whole orchard is revealed on the pull-back */}
        {(() => {
          const hop = Math.abs(Math.sin(lf / 9)) * 12;
          const jx = 1232, jy = 1010;
          const cardY = jy - 80 - Math.abs(Math.sin(lf / 9 + 1.2)) * 30;
          return (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 12, filter: "blur(0.9px)", opacity: 0.9 * (0.35 + 0.65 * pull) }}>
              <OrLeadCard lf={lf} x={jx} y={cardY} s={0.34} i={5} glow={1} tilt={Math.sin(lf / 9) * 16} z={12} />
              <div style={{ position: "absolute", left: jx - 24, top: jy - 48 - hop }}>
                <Mascot lf={lf} size={48} nodAmp={0} cheer={0.8} gaze={0} tint={OR_CLAY} />
              </div>
            </div>
          );
        })()}

        {/* THE HANGING AGENCY SIGN over the field, high enough to clear the hero
            canopy and drawn in front (z 30) so it always reads. */}
        <div style={{ position: "absolute", left: 904 - 300, top: 296 + signDrop, width: 600, height: 128, zIndex: 30, opacity: Math.max(0, signV), transformOrigin: "50% 0%", transform: `scale(${(0.9 + 0.1 * signIn).toFixed(3)})` }}>
          {[-1, 1].map((d) => <div key={d} style={{ position: "absolute", left: 300 + d * 210 - 3, top: -52, width: 6, height: 54, background: "linear-gradient(180deg,#6A5310,#B99A38)", borderRadius: 3 }} />)}
          <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: grad("#D2AC42", "#6E5314"), border: "6px solid #3E3008", boxShadow: "0 20px 40px rgba(20,12,4,0.5), inset 0 4px 0 rgba(255,242,198,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, lineHeight: 1, letterSpacing: "-0.01em", color: "#2E1B0C", textShadow: "0 2px 0 rgba(255,240,196,0.5)" }}>SIX-FIGURE</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.34em", color: "#4A3210" }}>AGENCIES</div>
          </div>
        </div>

        {/* ---- THE HERO TREE: front, biggest, brightest (egg: a "Molar Patrol" lead) ---- */}
        <OrSoilBed x={S5_TX} y={1050} w={520} z={9} />
        <OrTree lf={lf} x={S5_TX} groundY={S5_TG} scale={4.3} blur={0} glow={1} fruits={13} sd={41} locked={0} cards={1} eggIdx={5} eggName="Molar Patrol" z={22} />

        {/* the DENTISTS . AUSTIN input Claude planted (the "one chat" trace) */}
        <OrNicheLabel lf={lf} x={S1_LX} soilY={S1_SOIL} seat={1} hover={0} niche={S1_OPT_B.niche} city={S1_OPT_B.city} nPinch={0} cPinch={0} lock={0} z={25} />
        {/* a warm callout ring that pulses the input on the snap-back */}
        {snap > 0.2 && <PulseRing t={over(lf, 104, 22)} x={S1_LX} y={950} r={220} hue="rgba(251,230,168,0.6)" o={0.7} z={24} />}

        {/* CLAUDE at his single input */}
        <div style={{ position: "absolute", left: 288 - 250 / 2, top: 1076 - 250, zIndex: 24 }}>
          <Mascot lf={lf} size={250} nodAmp={2.2} nodSpeed={12} gaze={claudeGaze} cheer={Math.max(0, over(lf, 112, 8))} />
        </div>

        {/* ================= THE VILLAIN, lower-left, counted then demoted ================= */}
        {/* the row he had padlocked, greening back to life as the lock shatters */}
        <OrTree lf={lf} x={110} groundY={1268} scale={1.55} blur={2.4} glow={0.5 + 0.4 * unlock} fruits={6} sd={73} locked={1 - unlock} z={18} />
        {/* the cold-steel padlock on the trunk, shattering into two halves */}
        {(() => {
          const lx = 110, ly = 1150;
          if (shatter >= 0.98) return null;
          return (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 20 }}>
              {[-1, 1].map((d) => (
                <div key={d} style={{ position: "absolute", left: lx - 20 + (d < 0 ? 0 : 20), top: ly, width: 20, height: 40, transform: `translate(${(d * shatter * 90).toFixed(0)}px, ${(shatter * shatter * 220).toFixed(0)}px) rotate(${(d * shatter * 220).toFixed(0)}deg)`, opacity: 1 - over(lf, 60, 22) }}>
                  <div style={{ position: "absolute", left: d < 0 ? 6 : -6, top: -12, width: 20, height: 18, borderRadius: "10px 10px 0 0", border: "5px solid #8C99A4", borderBottom: "none", clipPath: d < 0 ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)" }} />
                  <div style={{ position: "absolute", left: 0, top: 4, width: 20, height: 34, borderRadius: 4, background: grad("#9AA6B2", "#4A535E"), border: "2px solid #2A313A", clipPath: d < 0 ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)" }} />
                </div>
              ))}
            </div>
          );
        })()}
        {shatter > 0.01 && shatter < 0.9 && <>
          <Sparkles lf={lf} at={60} x={110} y={1156} n={12} life={20} spread={130} rise={70} hue="#C7D2DE" sd={5} z={30} o={0.85} />
          <GroundRing lf={lf} at={62} x={110} y={1264} r={200} dur={20} hue="rgba(150,164,180,0.5)" z={19} />
        </>}

        {/* the broker himself, shrinking and slumping */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 21, transformOrigin: "252px 1236px", transform: `rotate(${(slump * 10).toFixed(2)}deg) translate(${(-slump * 6).toFixed(0)}px, ${(slump * 10).toFixed(0)}px)` }}>
          <OrBrokerMini lf={lf} x={252} y={1236} s={brokerS} recoil={brokerRecoil} z={21} blur={0.4} />
        </div>

        {/* his RENTED ROWS ledger, redacted, flipping open as the number resolves */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 26, transform: `scale(${(1 - 0.36 * shrink).toFixed(3)})`, transformOrigin: "336px 1150px" }}>
          <TallyBox lf={lf} x={336} y={1108} open={ledgerOpen} count={Math.round(ledgerCount)} money="$2,000" s={1.15} z={26} tick={ledgerOpen > 0.1 && ledgerOpen < 0.9 ? 1 : 0} label="RENTED ROWS" />
          {/* the red bar that strikes his $2,000 price once the ledger is open */}
          {strike > 0.02 && ledgerOpen > 0.85 && (
            <div style={{ position: "absolute", left: 336 + 11, top: 1108 + 44 + 10, width: 76 * strike, height: 5, borderRadius: 3, background: RED, transform: "rotate(-8deg)", boxShadow: "0 0 8px rgba(196,74,58,0.7)", zIndex: 27 }} />
          )}
        </div>

        {/* his placard, flipping LANDLORD -> TENANT, in the villain's own corner */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 28, transform: `scale(${(1 - 0.34 * shrink).toFixed(3)})`, transformOrigin: "214px 1150px" }}>
          <S5Placard flip={placardFlip} x={214} y={1120} z={28} />
        </div>

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT (bright greenhouse day) ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 60, top: -20, width: 960, height: 1000, background: "radial-gradient(ellipse at 52% 46%, rgba(255,224,150,0.24), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.16} />
      <LeadsHud lf={lf} {...leadsTally(5, lf)} />
    </AbsoluteFill>
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
// The Leads lockup card: three honey-tinted content lines, blurred, spanning the
// card so the LEADS KIT reads as a real deliverable held back behind the comment.
const CTA_KIT_LINES = [700, 632, 520];

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
           field carrying COMMENT in ink and "LEADS" in clay, Fraunces 900, full
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
          {/* LEADS is the biggest, highest contrast glyph in the whole reel, and it
              keeps a slow pulse of its own so the eye is pulled straight to it */}
          <div style={{
            position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1,
            letterSpacing: "-0.02em", color: CLAY, whiteSpace: "nowrap",
            transform: `scale(${(breathe(lf, 0.018, 46) + 0.05 * Math.max(0, settle(lf, 8, 1, 0.12, 0.13))).toFixed(4)})`,
            transformOrigin: "50% 70%",
          }}>
            &ldquo;LEADS&rdquo;
            {/* a clay underline that keeps re drawing itself left to right */}
            <div style={{
              position: "absolute", left: 8, bottom: -6, height: 6, borderRadius: 3, background: CLAY,
              width: `${(24 + 68 * (0.5 + 0.5 * Math.sin(lf / 15 - 1.2))).toFixed(1)}%`, opacity: 0.5,
            }} />
          </div>
          <div style={{ marginLeft: 8, width: 5, height: 60, background: INK, opacity: caret, alignSelf: "center" }} />
        </div>
        {/* Claude's clay REPLY button (clay is reserved for Claude): a paper send
            arrow, so the field reads "comment and Claude sends it back". */}
        <div style={{
          position: "absolute", right: 14, top: 18, width: 66, height: 66, borderRadius: "50%",
          background: grad(OR_CLAY_HI, OR_CLAY_LO), display: "flex", alignItems: "center", justifyContent: "center",
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
        <div style={{ position: "absolute", left: 26, top: 18, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, letterSpacing: "0.2em", color: CLAY }}>THE FREE GUIDE</div>
        <div style={{ position: "absolute", left: 26, top: 42, width: 620, height: 3, borderRadius: 2, background: "#E2D9C6" }} />
        {/* ---- THE WITHHELD KIT: three honey-tinted content lines, softly blurred,
             so the deliverable reads as real but held back until they comment.
             The only blurred thing in the lockup. No readable body copy. ---- */}
        <div style={{ position: "absolute", left: 26, top: 62, right: 26, filter: "blur(5px)", opacity: lines }}>
          {CTA_KIT_LINES.map((w, i) => (
            <div key={i} style={{
              width: w * (1 + 0.02 * Math.sin(lf / 11 + i * 1.7)), height: 16, borderRadius: 5, marginTop: i === 0 ? 0 : 12,
              background: "linear-gradient(90deg, #E9D7A8, #D8C088)",
              opacity: 0.78 + 0.14 * Math.sin(lf / 8 + i * 1.3),
              transform: `translateX(${idle(lf, 1.5, 60 + i * 13, i).toFixed(2)}px)`,
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

// ============================================================================
// THE LEADS CTA SCENE (in-panel). Plays from frame 925 (right after S5) to the
// cut. The freed hero orchard ERUPTS fully lit, a planted DEED-POST is branded
// "$0 / OWNED" with a hot sear, and the beaten rust broker scurries off tiny.
// Ends calm on the lit tree, so it loops cleanly back into the S0 hook.
// ============================================================================

// THE DEED-POST. The ownership payoff: a planted wooden claim-post whose plaque
// is BRANDED with the mark. `sear` (0..1) burns the char in; `ember` (0..1) is
// the hot honey glow that blooms as it strikes and then cools. The two words are
// STACKED and split by a seared rule (no dash), so it reads "$0, OWNED".
const LeadsDeedPost: React.FC<{ lf: number; x: number; groundY: number; sear: number; ember: number; s?: number; z?: number }> = ({ lf, x, groundY, sear, ember, s = 1, z = 30 }) => {
  const sv = Math.max(0, Math.min(1, sear));
  const em = Math.max(0, Math.min(1, ember));
  const PW = 300 * s, PH = 178 * s;
  const postW = 46 * s, postLen = 132 * s;
  const plaqueBottom = groundY - postLen;
  const plaqueTop = plaqueBottom - PH;
  const plaqueLeft = x - PW / 2;
  const sway = Math.sin(lf / 42) * 0.4;
  const hotLocal = 24 * s + sv * (PH - 48 * s);            // the burn line, inside the plaque
  const CHAR = "#2A1608";
  const bolt = (bx: number, by: number, k: number) => (
    <div key={"bolt" + k} style={{ position: "absolute", left: bx - 6 * s, top: by - 6 * s, width: 12 * s, height: 12 * s, borderRadius: "50%", background: grad("#7A6A4A", "#3A2E18"), border: `${1.6 * s}px solid #241A0C`, boxShadow: `inset 0 ${1 * s}px 0 rgba(255,232,180,0.4)` }} />
  );
  const worded = (txt: string, size: number) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* the ember (hot honey) copy behind, blooming then cooling */}
      <div style={{ position: "absolute", inset: 0, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: "-0.01em", color: "#FFE9A6", opacity: em, filter: `blur(${5 * s}px)`, mixBlendMode: "screen", whiteSpace: "nowrap" }}>{txt}</div>
      {/* the seared CHAR copy on top */}
      <div style={{ position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: "-0.01em", color: CHAR, opacity: sv, textShadow: `0 0 ${em * 26 * s}px rgba(251,230,168,${(0.9 * em).toFixed(2)}), 0 ${2 * s}px 0 rgba(255,232,180,0.12)`, whiteSpace: "nowrap" }}>{txt}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z }}>
      {/* contact shadow + soil mound at the planted base */}
      <div style={{ position: "absolute", left: x - 66 * s, top: groundY - 8 * s, width: 132 * s, height: 26 * s, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,10,10,0.5), rgba(6,10,10,0.2) 55%, transparent 76%)", filter: "blur(4px)", zIndex: z - 1 }} />
      <div style={{ position: "absolute", left: x - 42 * s, top: groundY - 18 * s, width: 84 * s, height: 24 * s, borderRadius: "50% 50% 46% 46%", background: grad("#5A4026", "#341F0C"), boxShadow: `inset 0 ${2 * s}px 0 rgba(120,90,50,0.4)`, zIndex: z }} />
      {/* the wooden POST */}
      <div style={{ position: "absolute", left: x - postW / 2 + sway, top: plaqueBottom - 8 * s, width: postW, height: postLen + 12 * s, borderRadius: 4 * s, background: "linear-gradient(90deg, #7A5630 0%, #5A3D22 42%, #4A3018 70%, #34210E 100%)", boxShadow: `inset ${1.6 * s}px 0 0 rgba(255,232,180,0.16), 0 ${8 * s}px ${16 * s}px rgba(20,12,4,0.4)`, zIndex: z }}>
        {[0.3, 0.62].map((t, k) => <div key={k} style={{ position: "absolute", left: `${t * 100}%`, top: "6%", width: Math.max(1, 1.4 * s), height: "82%", background: k % 2 ? "rgba(255,232,180,0.10)" : "rgba(18,12,6,0.34)" }} />)}
      </div>
      {/* the PLAQUE board mounted on the post */}
      <div style={{ position: "absolute", left: plaqueLeft + sway, top: plaqueTop, width: PW, height: PH, borderRadius: 12 * s, background: "linear-gradient(158deg, #805834 0%, #5C3E22 52%, #47301A 100%)", border: `${4 * s}px solid #34210E`, boxShadow: `0 ${16 * s}px ${32 * s}px -${9 * s}px rgba(20,12,4,0.6), inset 0 ${2 * s}px 0 rgba(255,224,170,0.18)`, overflow: "hidden" }}>
        {/* routed inner frame + faint wood grain */}
        <div style={{ position: "absolute", inset: 11 * s, borderRadius: 7 * s, border: `${2.4 * s}px solid rgba(30,18,6,0.5)`, boxShadow: `inset 0 0 ${10 * s}px rgba(20,12,4,0.4)` }} />
        {[0.22, 0.5, 0.8].map((t, k) => <div key={"g" + k} style={{ position: "absolute", left: 0, right: 0, top: `${t * 100}%`, height: Math.max(1, 1.2 * s), background: k % 2 ? "rgba(255,224,170,0.07)" : "rgba(20,12,4,0.2)" }} />)}
        {[[20, 20], [PW - 20, 20], [20, PH - 20], [PW - 20, PH - 20]].map(([bx, by], k) => bolt(bx, by, k))}
        {/* the branded mark, stacked and split by a seared rule */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 * s }}>
          {worded("$0", 92 * s)}
          <div style={{ width: 130 * s * sv, height: 3.2 * s, borderRadius: 2, background: "#3A2410", boxShadow: `0 0 ${em * 16 * s}px rgba(251,230,168,${em.toFixed(2)})`, opacity: sv }} />
          {worded("OWNED", 42 * s)}
        </div>
        {/* the ember wash + the hot burn line that sweeps down as it sears */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 46%, rgba(255,236,168,0.5), transparent 68%)", mixBlendMode: "screen", opacity: em, pointerEvents: "none" }} />
        {em > 0.02 && <div style={{ position: "absolute", left: 10 * s, right: 10 * s, top: hotLocal, height: 8 * s, background: "linear-gradient(90deg, transparent, rgba(255,246,206,0.95), transparent)", filter: `blur(${3 * s}px)`, mixBlendMode: "screen", opacity: em, pointerEvents: "none" }} />}
      </div>
    </div>
  );
};

const LEADS_TX = 566, LEADS_TG = 1044;      // the hero tree, same anchor as S0/S1/S2
const LEADS_CANY = 601;                      // its canopy centre (trunkH + canR from scale 4.3)

const LeadsCta: React.FC<{ lf: number }> = ({ lf }) => {
  const io = Easing.inOut(Easing.cubic);
  const outc = Easing.out(Easing.cubic);

  // CAMERA: a gentle settling push centred on the tree + deed-post, with an
  // eruption kick at lf 0 and a stamp kick as the brand sears.
  const push = over(lf, 0, 82, io);
  const A = { x: 560 - 506 / 0.84, y: 792 - 396 / 0.84, z: 0.84 };
  const B = { x: 574 - 506 / 0.95, y: 812 - 396 / 0.95, z: 0.95 };
  const base = lerpCam(A, B, push);
  const cam = shakeCam(lf, [{ at: 0, amp: 20, dur: 16 }, { at: 13, amp: 12, dur: 14 }], 1);
  const camX = base.x + cam.x, camY = base.y + cam.y, camZ = base.z * cam.z;

  // the orchard ERUPTS: the hero tree's leads light in a fast celebratory wave;
  // a bright flare blooms over the canopy and settles.
  const wake = over(lf, 0, 15, outc);
  const bloom = Math.max(0, over(lf, 0, 6) - over(lf, 8, 26));
  const heroPop = 1 + 0.045 * Math.max(0, 1 - lf / 11);

  // the deed-post brand: the plaque sears the mark in; the ember blooms then cools.
  const sear = over(lf, 12, 15, outc);
  const ember = Math.max(0, over(lf, 12, 4) - over(lf, 20, 30));

  // the rust broker, already beaten, scurries off tiny and vanishes.
  const brokerX = 236 - over(lf, 0, 30, Easing.in(Easing.quad)) * 300;
  const brokerS = 58 * (1 - over(lf, 4, 22));

  return (
    <AbsoluteFill>
      <Cam x={camX} y={camY} z={camZ}>
        <OrGlasshouseBg lf={lf} />
        <OrRows lf={lf} />

        {/* light recessive day dressing (kept soft, supporting the hero) */}
        <OrWallShelf x={40} y={392} w={188} s={0.9} z={3} blur={2.6} />
        <OrWallShelf x={880} y={372} w={196} s={0.92} z={3} blur={2.6} />
        <OrFernBasket lf={lf} x={392} topY={200} y={452} s={0.72} z={4} blur={2.6} />
        <OrFernBasket lf={lf} x={760} topY={196} y={438} s={0.7} z={4} blur={2.7} />
        <OrHangingPlant lf={lf} x={168} y={470} len={150} s={0.8} z={4} blur={2.3} />
        <OrHangingPlant lf={lf} x={992} y={452} len={140} s={0.78} z={4} blur={2.4} />
        <OrButterfly lf={lf} x={250} y={760} s={1.0} z={9} hue="#F0C36A" sd={1} />
        <OrButterfly lf={lf} x={900} y={840} s={0.86} z={9} hue="#E7B24C" sd={4} />

        {/* a dim framing tree at the right edge */}
        <OrTree lf={lf} x={1236} groundY={1150} scale={1.5} blur={4.4} glow={0.62} fruits={5} sd={61} locked={0} z={8} />

        {/* THE HERO TREE, erupting fully lit with honey-gold leads */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 16, transformOrigin: `${LEADS_TX}px ${LEADS_CANY}px`, transform: `scale(${heroPop.toFixed(4)})` }}>
          <OrTree lf={lf} x={LEADS_TX} groundY={LEADS_TG} scale={4.3} blur={0} glow={1} fruits={13} sd={41} locked={0} cards={1} wakeCards={wake} eggIdx={9} eggName="Floss Boss" winkIdx={3} z={16} />
        </div>

        {/* the eruption bloom over the canopy */}
        <div style={{ position: "absolute", left: LEADS_TX - 430, top: LEADS_CANY - 390, width: 860, height: 780, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,196,0.72), rgba(247,214,140,0.2) 46%, transparent 70%)", opacity: 0.28 + bloom * 0.72, filter: "blur(32px)", mixBlendMode: "screen", zIndex: 17, pointerEvents: "none" }} />

        {/* a few leads lift off celebratorily as the tree comes to life */}
        {[0, 1, 2].map((k) => {
          const p = over(lf, k * 5, 44, outc);
          const rx = LEADS_TX + (k - 1) * 168 + Math.sin(lf / 16 + k) * 22;
          const ry = LEADS_CANY + 30 - p * 280;
          const o = (1 - over(lf, k * 5 + 30, 20)) * over(lf, k * 5, 6);
          if (o <= 0.02) return null;
          return <div key={"lift" + k} style={{ opacity: o, position: "absolute", inset: 0, zIndex: 19 }}><OrLeadCard lf={lf} x={rx} y={ry} s={0.52} i={k * 7 + 3} glow={1} tilt={(seed(k * 3.1) - 0.5) * 16} z={19} pop={Math.max(0, 1 - p * 3)} /></div>;
        })}

        {/* the tiny beaten broker scurrying off */}
        {brokerS > 3 && <OrBrokerMini lf={lf} x={brokerX} y={1176} s={brokerS} recoil={1} z={10} blur={0.5} />}

        {/* THE DEED-POST: the ownership payoff, branded $0 / OWNED */}
        <LeadsDeedPost lf={lf} x={792} groundY={1214} sear={sear} ember={ember} s={1.02} z={30} />

        {/* the sear FX at the plaque: sparks, a puff of smoke, a ground ring */}
        <Sparkles lf={lf} at={12} x={792} y={1004} n={12} life={20} spread={150} rise={70} hue="#FBE6A8" sd={9} z={33} o={0.95} />
        <Dust lf={lf} at={13} x={792} y={1010} n={8} life={34} spread={120} hue="rgba(206,180,120,0.5)" sd={5} z={31} o={0.85} />
        <GroundRing lf={lf} at={12} x={792} y={1032} r={200} dur={18} hue="rgba(240,222,178,0.55)" z={18} />

        {/* the eruption ring + burst from the canopy */}
        <PulseRing t={over(lf, 0, 22)} x={LEADS_TX} y={LEADS_CANY} r={360} hue="rgba(251,230,168,0.6)" o={0.8} z={19} />
        <Sparkles lf={lf} at={0} x={LEADS_TX} y={LEADS_CANY} n={16} life={26} spread={300} rise={120} hue="#FBE6A8" sd={2} z={20} o={0.9} />
        <Sparkles lf={lf} at={9} x={LEADS_TX} y={LEADS_CANY - 60} n={12} life={22} spread={260} rise={100} hue="#F7D68C" sd={7} z={20} o={0.85} />

        <OrRays lf={lf} />
        <OrMotes lf={lf} />
      </Cam>

      {/* ================= PANEL-SPACE LIGHT (bright greenhouse day) ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(176,214,238,0.16) 0%, rgba(255,244,206,0.10) 52%, rgba(255,236,186,0.12) 100%)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 40, top: -60, width: 940, height: 1000, background: "radial-gradient(ellipse at 52% 46%, rgba(255,224,150,0.28), rgba(255,210,120,0.1) 44%, transparent 66%)", mixBlendMode: "screen", filter: "blur(48px)", zIndex: 40, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -120, background: "radial-gradient(ellipse 62% 60% at 50% 46%, transparent 52%, rgba(60,54,30,0.14) 86%, rgba(48,42,22,0.22) 100%)", zIndex: 41, pointerEvents: "none" }} />
      <OrDrizzle lf={lf} />
      <Vig o={0.15} />
      {/* the tally holds on the 512 payoff through the CTA */}
      <LeadsHud lf={lf} {...leadsTally(6, lf)} />
    </AbsoluteFill>
  );
};

// ==== part: 99_tail.tsx ====
// ---------------- the sound design ------------------------------------------
// Board: storyboards/68-calls.md, the SFX Map. Times are L relative so they
// survive re-timing. Every entry goes through <Sfx>, which carries the fade
// envelope, so nothing hard-cuts and clicks.
type Beat = [number, number, string, number, number]; // [scene, offset, file, v, dur]

const SFX: Beat[] = [
  // ---- S0  the $2,000 SLAM + the chain CUT (L[0]=0.00, lf0..135) ----
  // OPENING BOMB BLAST at t=0 (the pattern-interrupt detonation on frame 0): a real
  // explosion (boom body + debris tail) + a deep low punch + sub rumble + a crash tail.
  // Layered strong but summed under 0 dBFS; each cue ramps in over ~2 frames (anti-click).
  [0, 0.00, "rocket_explode.wav", 0.30, 0.6], [0, 0.00, "lib_boom.wav", 0.24, 0.55],
  [0, 0.00, "impact_deep.wav", 0.24, 0.45], [0, 0.00, "sub.wav", 0.42, 0.55],
  [0, 0.00, "swooshup.wav", 0.24, 0.5],
  [0, 0.23, "boom.wav", 0.42, 1.8], [0, 0.23, "sub.wav", 0.26, 1.4],
  [0, 0.23, "impact.wav", 0.30, 1.2], [0, 0.50, "coin_slide.wav", 0.24, 1.4],
  [0, 0.70, "chimehi.wav", 0.18, 0.8], [0, 1.00, "chimelo.wav", 0.17, 0.8],
  [0, 1.20, "can_rattle.wav", 0.20, 0.9], [0, 1.40, "chain_clank.wav", 0.15, 0.8],
  [0, 3.27, "swish.wav", 0.22, 0.6], [0, 3.93, "mech_clank.wav", 0.20, 0.5],
  [0, 4.23, "katana_shing.wav", 0.28, 0.7], [0, 4.23, "snap.wav", 0.24, 0.4],
  [0, 4.23, "sparkle.wav", 0.20, 0.9], [0, 4.30, "impact_deep.wav", 0.24, 1.0],
  // ---- S1  the one line CHUNK-locks, the tree BLOOMS (L[1]=4.545, lf0..154) ----
  [1, 0.13, "sign_clack.wav", 0.16, 0.3], [1, 0.40, "split_flap.wav", 0.17, 0.4],
  [1, 0.67, "split_flap.wav", 0.16, 0.4], [1, 1.93, "sign_clack.wav", 0.18, 0.3],
  [1, 2.20, "sign_clack.wav", 0.18, 0.3], [1, 2.47, "tick.wav", 0.15, 0.2],
  [1, 2.93, "swooshup.wav", 0.18, 0.6],
  [1, 3.07, "thock.wav", 0.30, 0.7], [1, 3.07, "snap.wav", 0.20, 0.4],
  [1, 3.07, "sub.wav", 0.22, 1.0], [1, 3.07, "metal_riser.wav", 0.30, 1.6],
  [1, 3.27, "pop.wav", 0.15, 0.4],
  [1, 3.73, "sparkle.wav", 0.22, 1.0], [1, 3.73, "chimehi.wav", 0.20, 0.9],
  [1, 3.93, "chimelo.wav", 0.18, 0.9],
  // ---- S2  the harvester picks the leads (L[2]=9.705, lf0..91) ----
  [2, 0.00, "machine_bed.wav", 0.08, 3.1],
  [2, 0.43, "lib_pop.wav", 0.17, 0.4], [2, 0.43, "tick.wav", 0.13, 0.2],
  [2, 0.73, "arrive_chime.wav", 0.16, 0.8],
  [2, 1.30, "blip2.wav", 0.16, 0.4], [2, 1.30, "tick.wav", 0.13, 0.2],
  [2, 1.60, "arrive_chime.wav", 0.15, 0.8],
  [2, 2.17, "lib_pop2.wav", 0.17, 0.4], [2, 2.17, "tick.wav", 0.13, 0.2],
  [2, 2.47, "arrive_chime.wav", 0.15, 0.8], [2, 2.80, "ding.wav", 0.18, 0.9],
  // ---- S3  the SEAL: stamp, launch, stamp, launch (L[3]=12.765, lf0..230) ----
  [3, 0.00, "machine_bed.wav", 0.07, 3.9], [3, 3.80, "machine_bed.wav", 0.07, 3.9],
  [3, 0.30, "stamp_press.wav", 0.20, 0.5], [3, 0.30, "thock.wav", 0.22, 0.5],
  [3, 0.90, "stamp_press.wav", 0.20, 0.5], [3, 0.90, "chimehi.wav", 0.14, 0.7],
  [3, 1.50, "stamp_press.wav", 0.20, 0.5], [3, 1.50, "thock.wav", 0.22, 0.5],
  [3, 2.10, "stamp_press.wav", 0.20, 0.5],
  [3, 2.70, "stamp_press.wav", 0.20, 0.5], [3, 2.70, "thock.wav", 0.22, 0.5],
  [3, 3.30, "stamp_press.wav", 0.20, 0.5],
  [3, 3.90, "stamp_press.wav", 0.20, 0.5], [3, 3.90, "thock.wav", 0.22, 0.5],
  [3, 4.50, "stamp_press.wav", 0.20, 0.5], [3, 4.50, "chimehi.wav", 0.14, 0.7],
  [3, 5.10, "stamp_press.wav", 0.20, 0.5], [3, 5.10, "thock.wav", 0.22, 0.5],
  [3, 5.70, "stamp_press.wav", 0.20, 0.5],
  [3, 6.30, "stamp_press.wav", 0.20, 0.5], [3, 6.30, "thock.wav", 0.22, 0.5],
  [3, 6.90, "stamp_press.wav", 0.20, 0.5],
  [3, 7.50, "stamp_press.wav", 0.20, 0.5], [3, 7.50, "thock.wav", 0.22, 0.5],
  [3, 0.73, "swish.wav", 0.18, 0.6], [3, 1.93, "swish.wav", 0.18, 0.6],
  [3, 3.13, "swish.wav", 0.18, 0.6], [3, 4.33, "swish.wav", 0.18, 0.6],
  [3, 5.53, "swish.wav", 0.18, 0.6], [3, 6.73, "swish.wav", 0.18, 0.6],
  // ---- S4  crates POUR, the counter LANDS on 512, the meters DIE (L[4]=20.455, lf0..171) ----
  [4, 0.10, "thock.wav", 0.24, 0.5], [4, 0.70, "dead_thud.wav", 0.22, 0.5],
  [4, 1.40, "thock.wav", 0.24, 0.5], [4, 1.83, "thock.wav", 0.26, 0.5],
  [4, 1.83, "sub.wav", 0.18, 0.8], [4, 2.13, "rebuild_thud.wav", 0.22, 0.6],
  [4, 0.27, "sorter_tick.wav", 0.12, 1.7], [4, 1.33, "metal_riser.wav", 0.24, 0.8],
  [4, 1.87, "lib_pop2.wav", 0.22, 0.5], [4, 1.87, "ding.wav", 0.22, 0.9],
  [4, 1.87, "resolve.wav", 0.18, 1.4], [4, 1.87, "impact.wav", 0.22, 1.0],
  [4, 2.80, "knife_switch.wav", 0.24, 0.6], [4, 2.80, "neon_off.wav", 0.24, 1.0],
  [4, 2.84, "dead_thud.wav", 0.16, 0.6],
  [4, 3.93, "knife_switch.wav", 0.24, 0.6], [4, 3.93, "neon_off.wav", 0.22, 1.0],
  [4, 3.97, "dead_thud.wav", 0.16, 0.6],
  // ---- S5  the pull-back REVEAL, the villain COUNTED + DEMOTED (L[5]=26.245, lf0..137) ----
  [5, 0.00, "lib_magic_reveal.wav", 0.28, 2.4], [5, 0.00, "lib_whoosh.wav", 0.24, 1.2],
  [5, 0.73, "thock.wav", 0.16, 0.5], [5, 0.73, "sign_clack.wav", 0.16, 0.3],
  [5, 1.53, "glitch_counter.wav", 0.16, 0.9],
  [5, 2.00, "ceramic_crack.wav", 0.26, 0.7], [5, 2.00, "metal_ping.wav", 0.18, 0.5],
  [5, 2.20, "swooshdn.wav", 0.20, 0.7],
  [5, 2.33, "stamp_press.wav", 0.20, 0.5], [5, 2.33, "tick.wav", 0.14, 0.2],
  [5, 2.53, "split_flap.wav", 0.18, 0.5],
  [5, 3.27, "swooshup.wav", 0.20, 0.8], [5, 3.47, "arrive_chime.wav", 0.16, 0.9],
  [5, 3.73, "chimehi.wav", 0.16, 0.9],
  // ---- CTA  the orchard ERUPTS, "$0 / OWNED" SEARS, the pill POPS (L[6]=30.835, lf0..89) ----
  [6, 0.00, "lib_boom.wav", 0.40, 2.0], [6, 0.00, "riser_cine.wav", 0.30, 1.8],
  [6, 0.00, "angelic.wav", 0.24, 2.0], [6, 0.00, "sparkle.wav", 0.22, 1.2],
  [6, 0.00, "chimehi.wav", 0.18, 0.9],
  [6, 0.20, "lib_pop2.wav", 0.22, 0.5], [6, 0.20, "chimelo.wav", 0.16, 0.9],
  [6, 0.33, "pop.wav", 0.18, 0.4],
  [6, 0.40, "gold_stamp.wav", 0.28, 0.6], [6, 0.40, "paper_burn.wav", 0.22, 1.2],
  [6, 0.40, "sub.wav", 0.18, 1.0],
  [6, 1.33, "sparkle.wav", 0.16, 0.9], [6, 1.47, "shimmer.wav", 0.16, 1.4],
];

// ---------------- HOOK HEADER (house rule: every reel opens with one) --------
// memory/reel-hook-header: a big two-tone Fraunces headline that NAMES CLAUDE so
// the hook is mute-readable as a title in the first second, and that sells the
// viewer's payoff rather than the mechanic. Renders as a sibling AFTER <Panel>
// so it sits over the art like the CALLBACK reel's headline, rather than being
// clipped by the panel's own top edge. Solid at frame 0 (never a fade-in trap),
// and cleared before the problem scene starts.
const LeadsHeader: React.FC = () => {
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
        <div style={line}>{T("Claude", true)}{T(" builds the")}</div>
        <div style={line}>{T("$2,000 lead list ")}{T("free", true)}</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: shimX, width: 150, background: "linear-gradient(90deg,transparent,rgba(255,240,200,0.16),transparent)", transform: "skewX(-16deg)" }} />
      </div>
      <div style={{ position: "absolute", left: -14, top: -14, right: -14, bottom: -14, borderRadius: 30, border: `3px solid ${GOLD}`, opacity: (1 - over(f, 0, 10)) * 0.85 }} />
    </div>
  );
};

// ---------------- Google-Sheets "proof footage" overlay (ADDITIVE; renders ON TOP) --------------
// A floating browser CARD showing a real-looking Google Sheet of scraped dentist/gym leads. It
// pops in over the running orchard animation ~frame 84, auto-scrolls its rows (a faint green
// selection cell sweeping down), then slides out ~192. Driven by the GLOBAL useCurrentFrame() and
// drawn in true screen coords (outside the zoomed panel) so nothing in the reel shifts. Timing,
// scene dispatch, SFX table and durationInFrames are all left untouched - this is purely additive.
const SHEET_ROWS: [string, string, string][] = [
  ["Bright Smile Dental", "(512) 555-0142", "hello@brightsmileatx.com"],
  ["Lone Star Orthodontics", "(512) 555-0188", "front@lonestarortho.com"],
  ["Barton Springs Dental", "(512) 555-0164", "care@bartonspringsdental.com"],
  ["Congress Ave Dentistry", "(512) 555-0117", "team@congressavedental.com"],
  ["Zilker Family Dental", "(512) 555-0193", "hi@zilkerfamilydental.com"],
  ["South Lamar Smiles", "(512) 555-0175", "hello@southlamarsmiles.com"],
  ["Gymrat Fitness Co", "(512) 555-0206", "join@gymratfitness.com"],
  ["Mueller Modern Dental", "(512) 555-0129", "info@muellermoderndental.com"],
  ["Hyde Park Orthodontics", "(512) 555-0151", "smile@hydeparkortho.com"],
  ["Cedar Park Dental Care", "(512) 555-0198", "front@cedarparkdental.com"],
  ["Westlake Family Dentistry", "(512) 555-0134", "care@westlakefamdental.com"],
  ["Riverside Dental Group", "(512) 555-0162", "hello@riversidedentalatx.com"],
  ["Iron Peak Gym", "(512) 555-0211", "team@ironpeakgym.com"],
  ["Domain Dental Studio", "(512) 555-0147", "hi@domaindentalstudio.com"],
  ["East Austin Orthodontics", "(512) 555-0183", "front@eastaustinortho.com"],
  ["Pecan Street Dental", "(512) 555-0125", "care@pecanstreetdental.com"],
  ["Travis Heights Dentistry", "(512) 555-0170", "hello@travisheightsdds.com"],
  ["Clarksville Smile Co", "(512) 555-0159", "smile@clarksvillesmile.com"],
  ["Sunset Valley Dental", "(512) 555-0136", "info@sunsetvalleydental.com"],
  ["Onnit Strength Club", "(512) 555-0218", "join@onnitstrength.com"],
  ["Rollingwood Orthodontics", "(512) 555-0191", "front@rollingwoodortho.com"],
  ["Allandale Family Dental", "(512) 555-0143", "care@allandalefamdental.com"],
  ["Bee Cave Dental Arts", "(512) 555-0167", "hello@beecavedentalarts.com"],
  ["Northwest Hills Dentistry", "(512) 555-0121", "team@nwhillsdental.com"],
  ["Slaughter Lane Smiles", "(512) 555-0185", "hi@slaughterlanesmiles.com"],
  ["Tarrytown Dental Care", "(512) 555-0132", "front@tarrytowndental.com"],
  ["Manor Road Orthodontics", "(512) 555-0177", "smile@manorroadortho.com"],
  ["Lakeline Family Dentistry", "(512) 555-0154", "care@lakelinefamdental.com"],
  ["Barbell Republic Gym", "(512) 555-0223", "join@barbellrepublic.com"],
  ["Oak Hill Dental Group", "(512) 555-0139", "hello@oakhilldentalatx.com"],
  ["Round Rock Smile Studio", "(512) 555-0196", "front@roundrocksmile.com"],
  ["Guadalupe Dental Loft", "(512) 555-0128", "hi@guadalupedentalloft.com"],
  ["Cherrywood Orthodontics", "(512) 555-0172", "smile@cherrywoodortho.com"],
  ["Steiner Ranch Dentistry", "(512) 555-0148", "care@steinerranchdds.com"],
];
const SHEET_GREEN = "#0F9D58";
const SheetCard: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 84 || f > 194) return null;

  // pop IN 84-94, HOLD + auto-scroll 94-176, slide OUT 176-192
  const popIn = over(f, 84, 10, Easing.out(Easing.back(1.5)));
  const slideOut = over(f, 176, 16, Easing.in(Easing.cubic));
  const vis = Math.min(popIn, 1 - slideOut);
  const scale = 0.9 + 0.1 * popIn - 0.1 * slideOut;
  const ty = (1 - popIn) * 26 + slideOut * 54;
  const tilt = -1.1; // a touch of life

  // card + grid geometry
  const W = 700, H = 560;
  const GUT = 44, C1 = 256, C2 = 168, C3 = W - GUT - C1 - C2; // gutter | Business | Phone | Email
  const CHROME = 46, TITLE = 44, ACCENT = 4, TOOL = 30, LETTERS = 22, HEADER = 38;
  const bodyH = H - (CHROME + TITLE + ACCENT + TOOL + LETTERS + HEADER); // 376
  const rowH = 40;
  const n = SHEET_ROWS.length;
  const maxScroll = Math.max(0, n * rowH - bodyH);
  const scrollT = interpolate(f, [96, 174], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const scrollY = scrollT * maxScroll;
  const activeRow = Math.min(n - 1, Math.floor(scrollT * (n - 1)));

  const gridText: React.CSSProperties = { fontFamily: inter.fontFamily, fontSize: 15, color: "#202124", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  const cellBase: React.CSSProperties = { height: rowH, display: "flex", alignItems: "center", padding: "0 10px", boxSizing: "border-box", borderRight: "1px solid #E4E4E4", borderBottom: "1px solid #E4E4E4" };

  return (
    <div style={{ position: "absolute", left: 540, top: 540, width: W, height: H, transform: `translateX(-50%) translateY(${ty}px) rotate(${tilt}deg) scale(${scale})`, transformOrigin: "50% 26%", opacity: vis, zIndex: 400, pointerEvents: "none", borderRadius: 16, background: "#fff", overflow: "hidden", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 46px 92px -24px rgba(8,14,28,0.62), 0 16px 40px -20px rgba(8,14,28,0.5)" }}>

      {/* ---- browser chrome ---- */}
      <div style={{ height: CHROME, background: "#DEE1E6", display: "flex", alignItems: "flex-end", padding: "0 14px 0", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", height: CHROME }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ marginLeft: 6, height: 32, background: "#fff", borderRadius: "9px 9px 0 0", padding: "0 12px", display: "flex", alignItems: "center", gap: 8, maxWidth: 236 }}>
          <div style={{ width: 15, height: 15, borderRadius: 3, background: SHEET_GREEN }} />
          <span style={{ fontFamily: inter.fontFamily, fontSize: 13, color: "#3C4043", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Leads — Dentists, Austin</span>
        </div>
        <div style={{ flex: 1, height: 27, marginBottom: 7, background: "#fff", borderRadius: 999, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 12, color: "#5F6368" }}>🔒</span>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 13, color: "#3C4043", whiteSpace: "nowrap" }}>docs.google.com/spreadsheets</span>
        </div>
      </div>

      {/* ---- Google Sheets title bar ---- */}
      <div style={{ height: TITLE, background: "#fff", display: "flex", alignItems: "center", padding: "0 14px", gap: 11 }}>
        <div style={{ width: 27, height: 27, borderRadius: 5, background: SHEET_GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16 }}>⊞</div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.12 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 16, color: "#202124" }}>Leads — Dentists, Austin</span>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 11, color: "#5F6368", letterSpacing: "0.01em" }}>File   Edit   View   Insert   Format   Data   Tools</span>
        </div>
      </div>
      {/* green accent strip */}
      <div style={{ height: ACCENT, background: SHEET_GREEN }} />

      {/* ---- faux toolbar row of tiny grey icons ---- */}
      <div style={{ height: TOOL, background: "#F8F9FA", borderBottom: "1px solid #E4E4E4", display: "flex", alignItems: "center", gap: 9, padding: "0 14px" }}>
        {[18, 12, 12, 22, 14, 14, 14, 20, 12, 12, 26, 14].map((w, i) => (
          <div key={i} style={{ width: w, height: 14, borderRadius: 3, background: "#DADCE0" }} />
        ))}
      </div>

      {/* ---- column-letter row (A B C) ---- */}
      <div style={{ height: LETTERS, display: "flex", background: "#F1F3F4", borderBottom: "1px solid #C8CCD0", fontFamily: inter.fontFamily, fontSize: 12, color: "#5F6368", fontWeight: 600 }}>
        <div style={{ width: GUT, borderRight: "1px solid #C8CCD0" }} />
        {[["A", C1], ["B", C2], ["C", C3]].map(([t, w]) => (
          <div key={t as string} style={{ width: w as number, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #C8CCD0" }}>{t}</div>
        ))}
      </div>

      {/* ---- frozen header row (row 1: Business | Phone | Email) ---- */}
      <div style={{ height: HEADER, display: "flex", background: "#F8F9FA", borderBottom: "2px solid #C8CCD0" }}>
        <div style={{ width: GUT, ...cellBase, justifyContent: "center", padding: 0, background: "#F1F3F4", borderRight: "1px solid #C8CCD0", color: "#5F6368", fontFamily: inter.fontFamily, fontSize: 12 }}>1</div>
        {[["Business", C1], ["Phone", C2], ["Email", C3]].map(([t, w]) => (
          <div key={t as string} style={{ ...cellBase, width: w as number, borderBottom: "none", ...gridText, fontWeight: 700 }}>{t}</div>
        ))}
      </div>

      {/* ---- scrolling grid body ---- */}
      <div style={{ height: bodyH, position: "relative", overflow: "hidden", background: "#fff" }}>
        <div style={{ position: "absolute", left: 0, top: -scrollY, width: W }}>
          {SHEET_ROWS.map((r, i) => {
            const on = i === activeRow;
            return (
              <div key={i} style={{ display: "flex", height: rowH }}>
                <div style={{ width: GUT, ...cellBase, justifyContent: "center", padding: 0, background: "#F8F9FA", borderRight: "1px solid #C8CCD0", color: "#5F6368", fontFamily: inter.fontFamily, fontSize: 12 }}>{i + 2}</div>
                <div style={{ ...cellBase, width: C1, ...gridText, background: on ? "#E6F4EA" : "#fff", boxShadow: on ? `inset 0 0 0 2px ${SHEET_GREEN}` : undefined }}>{r[0]}</div>
                <div style={{ ...cellBase, width: C2, ...gridText, color: "#3C4043" }}>{r[1]}</div>
                <div style={{ ...cellBase, width: C3, ...gridText, color: "#1A73E8" }}>{r[2]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- "512 rows" status chip ---- */}
      <div style={{ position: "absolute", right: 14, bottom: 12, background: SHEET_GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, padding: "5px 13px", borderRadius: 999, boxShadow: "0 6px 16px -4px rgba(15,157,88,0.6)" }}>512 rows</div>
    </div>
  );
};

export const ClaudeLeadsReel: React.FC = () => {
  const frame = useCurrentFrame();
  // a small push on every scene onset, so cuts land with weight
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = 1 + punch * 0.022;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      {/* LEADS VOICEOVER GOES HERE once recorded (e.g. vo_leads.wav). The old CALLS
          VO (vo_calls.wav) is intentionally NOT played - it is the wrong script. */}
      {/* LEADS voiceover (de-flubbed + re-spaced so each line lands on its scene). */}
      <Audio src={staticFile("vo_leads.wav")} />
      {/* "Another Day of Sun" (La La Land instrumental) bed: held low under the VO for
          clarity, swelling into the CTA eruption, with a soft tail for the loop. */}
      <Audio
        src={staticFile("ados_bed.wav")}
        volume={(ff) => interpolate(ff, [0, fr(0.5), 640, 670, 694, 698], [0, 0.14, 0.14, 0.22, 0.22, 0.08], { extrapolateRight: "clamp" })}
      />
      {SFX.map(([s, off, src, v, dur], i) => (
        <Sfx key={"sx" + i} at={L[s] + off / (SCL[s] ?? 1)} src={src} v={v} dur={dur} />
      ))}
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Panel>
          {scene(0) ? <S0 lf={(frame - Lf[0]) * SCL[0]} /> : null}
          {scene(1) ? <S1 lf={(frame - Lf[1]) * SCL[1]} /> : null}
          {scene(2) ? <S2 lf={(frame - Lf[2]) * SCL[2]} /> : null}
          {scene(3) ? <S3 lf={(frame - Lf[3]) * SCL[3]} /> : null}
          {scene(4) ? <S4 lf={(frame - Lf[4]) * SCL[4]} /> : null}
          {scene(5) ? <S5 lf={(frame - Lf[5]) * SCL[5]} /> : null}
          {/* after S5 the Leads CTA scene plays. lf is scaled so each scene's full
              built animation fits its (VO-driven) window. */}
          {frame >= CTA_AT ? <LeadsCta lf={(frame - CTA_AT) * SCL[6]} /> : null}
        </Panel>
        <LeadsHeader />
        <Captions />
      </AbsoluteFill>
      {/* the CTA lockup renders outside the panel in true screen coords */}
      {frame >= CTA_AT ? <CtaLockup lf={(frame - CTA_AT) * SCL[6]} /> : null}
      <SnackLane f={frame} />
      <ProgressBar />
      {/* ADDITIVE Google-Sheets proof-footage overlay: pops in ~frame 84, scrolls, slides out ~192 */}
      <SheetCard />
      <Sfx at={2.8} src="swish.wav" v={0.3} dur={0.6} />
    </AbsoluteFill>
  );
};
