import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_takes.json";

// ============================================================================
// REEL 62 - TAKES - "Claude vs Take One"
// Board: storyboards/62-takes.md + 62-takes-VILLAIN-BIBLE.md (bible wins on conflict,
// continuity editor wins over the cards).
// House chassis per CLAUDE-REELS-PLAYBOOK.md 5: cream bg + <Panel> + karaoke pills
// + top ProgressBar rail. Panel-local 1012x792. NOT split-screen (Alex ruled).
// ============================================================================

const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";

// ---- THE TAKES PALETTE (continuity editor rule 6: these are spent exactly where stated) ----
const HERO = "#D97757";     // warm clay. THE HERO ALONE.
const VILL = "#5A5F6B";     // slate. Take One + all five copies + the sixth.
const STAGEKEY = "#F0E2C0"; // hard theatrical stage lamp. The whole reel except the booth.
const VOID = "#0E0F12";     // black-velvet void. Zero geometry in it.
const OCHRE = "#C9A227";    // PRINT IT stamp ONLY.
const COOL = "#C8D8E8";     // the sealed booth ONLY. The reel's only cool light.
// GREEN (#3F9E74) is RESERVED: monitor four's border at S7 f70. Nowhere else.

const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec), derived from words_takes.json onsets. VO drives timing (bible 2).
// S0 print it | S1 trailer door | S2 defence | S3 five stages | S4 walls
// S5 cutting room | S6 blackout | S7 verdict | S8 thesis | S9 cta
const L = [0, 2.63, 7.68, 11.16, 14.55, 17.28, 21.94, 26.23, 31.14, 34.78];
const Lf = L.map(fr);
const CUT = 38.0;                  // full VO length (4 cut-cuts spliced, pauses capped 0.30s, x1.05)
const TAKEMARKS = [L[3], L[4], L[5], L[6], L[7]];  // the rail's five checkpoints

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
          <rect x={137} y={110} width={7} height={7} fill={"#C9A227"} />
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
          <rect x={195} y={armY - 46} width={12} height={9} fill="#3F9E74" transform={`rotate(28 200 ${armY - 41})`} />
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
          <rect x={40} y={20} width={120} height={24} fill="#3C6B8C" />
          <rect x={40} y={20} width={120} height={6} fill="#4C7FA3" />
          <rect x={150} y={30} width={34} height={9} fill="#2F5673" />
          <rect x={92} y={24} width={16} height={7} fill="#EDEAE0" />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};


// ================= THE VILLAIN: "TAKE ONE" =================
// He is Claude's first answer made flesh. Not evil, not strong, not even bad at his job.
// He is good enough, and he is first, and that is the entire problem.
// Bible sheet: slate clay, backward flat cap, opaque wraparound shades (eyes NEVER visible),
// a viewfinder on a lanyard he never lifts, a clapperboard he only uses to END takes,
// and a PRINT IT stamp. His aura is THE BLACKOUT (lamps die behind him), not code rain.
// He NEVER multiplies. He NEVER speaks. He only CLAPS.
// ALWAYS use this component. Never hand-roll him.
// (Continuity editor 3: CLAP LEDGER. S0 one, successful. S1/S2/S3 none. S4 five, all failed. S5+ never again.)
// (Continuity editor 4: the blackout aura DIES at S3 f60 and never returns.)

// THE CLAPPERBOARD. A fat hinged slate, diagonal stripes on the clapstick, chalk dust.
// `open` 0..1 = the clapstick angle. Slam = drive open -> 0 hard.
export const Clapper: React.FC<{ x: number; y: number; s?: number; open?: number; rot?: number; o?: number; z?: number }> = ({ x, y, s = 1, open = 0, rot = 0, o = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "10% 90%", opacity: o, zIndex: z }}>
    {/* the slate face */}
    <div style={{ position: "absolute", left: 0, top: 14, width: 96, height: 74, background: "#20242B", border: "3px solid #12151A", borderRadius: 3, boxShadow: "0 6px 16px -5px rgba(0,0,0,0.8)" }}>
      {/* chalk rows: shape only, sub-resolution scribble, NO readable digits (continuity 10) */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 7, top: 12 + i * 20, width: 80, height: 2, background: "rgba(226,222,210,0.30)" }} />
      ))}
      <div style={{ position: "absolute", left: 9, top: 8, width: 26, height: 9, background: "rgba(226,222,210,0.5)" }} />
      <div style={{ position: "absolute", left: 44, top: 28, width: 17, height: 9, background: "rgba(226,222,210,0.42)" }} />
    </div>
    {/* the clapstick, hinged at left */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 20, transformOrigin: "4% 100%", transform: `rotate(${-open * 34}deg)` }}>
      <div style={{ position: "absolute", inset: 0, background: "#1A1D23", border: "3px solid #12151A", borderRadius: 3, overflow: "hidden" }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: i * 15 - 8, top: -4, width: 9, height: 30, background: i % 2 ? "#E6E2D8" : "transparent", transform: "skewX(-24deg)" }} />
        ))}
      </div>
    </div>
  </div>
);

// THE PRINT IT STAMP. Smug gold-ochre, crooked. Ochre is spent here and nowhere else.
export const PrintIt: React.FC<{ x: number; y: number; s?: number; rot?: number; o?: number; z?: number }> = ({ x, y, s = 1, rot = -8, o = 1, z = 27 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%", zIndex: z }}>
    <div style={{ padding: "5px 13px", border: `4px solid ${OCHRE}`, borderRadius: 5, background: "rgba(201,162,39,0.14)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.04em", color: OCHRE, textShadow: `0 0 9px rgba(201,162,39,0.5)`, whiteSpace: "nowrap", boxShadow: "0 5px 14px -5px rgba(0,0,0,0.7)" }}>PRINT IT</div>
  </div>
);

// TAKE ONE himself. Slate + backward cap + opaque shades + viewfinder on a lanyard.
// `board` = carry the clapperboard (default on). `boardOpen` drives the clapstick.
// `lowered` = board hangs at his side (from S4 f150 he never raises it again).
export const Villain: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; board?: number; boardOpen?: number; lowered?: number }> = ({ lf, size = 250, board = 1, boardOpen = 0, lowered = 0, ...rest }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "relative", zIndex: 2 }}>
      <Mascot lf={lf} size={size} tint={VILL} capBack={1} wrapShades={1} {...rest} />
    </div>
    {/* the viewfinder on a lanyard, swinging on his chest, NEVER lifted to his eye */}
    <div style={{ position: "absolute", left: size * 0.40, top: size * 0.30, width: size * 0.2, height: size * 0.02, background: "rgba(20,22,26,0.75)", transform: `rotate(${Math.sin(lf / 22) * 5}deg)`, transformOrigin: "50% 0%", zIndex: 3 }} />
    <div style={{ position: "absolute", left: size * 0.44, top: size * 0.44 + Math.sin(lf / 22) * 2, width: size * 0.13, height: size * 0.09, background: "#171A1F", border: "2px solid #0D0F12", borderRadius: 2, zIndex: 3, boxShadow: "0 3px 8px -2px rgba(0,0,0,0.8)" }}>
      <div style={{ position: "absolute", right: -size * 0.03, top: size * 0.02, width: size * 0.035, height: size * 0.045, background: "#20242B", borderRadius: 1 }} />
    </div>
    {board > 0 && <Clapper x={size * (lowered > 0 ? 0.74 : 0.60)} y={size * (lowered > 0 ? 0.62 : 0.34)} s={size / 250 * 0.72} open={boardOpen} rot={lowered > 0 ? 84 : 0} z={4} />}
  </div>
);

// A TAKE. Identical slate mascot: no cap, no board, no stamp, eyes NOT visible.
// (Continuity editor 1: SAMENESS IS THE THESIS. Never give one a role, hat, tool or personality.)
export const Take: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; cheer?: number; stern?: number }> = ({ lf, size = 250, ...rest }) => (
  <Mascot lf={lf} size={size} tint={VILL} wrapShades={1} {...rest} />
);

// THE SIXTH. Slate, blank, clean: no cap, no board, no tools, NO SAWDUST, ever.
// (Continuity editor 8: its blankness is its credibility. No robe, no gavel, no character.)
export const Sixth: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number }> = ({ lf, size = 250, ...rest }) => (
  <Mascot lf={lf} size={size} tint={VILL} wrapShades={1} nodAmp={0.7} nodSpeed={26} {...rest} />
);

// THE GRIP CAMEO. Knee-high Claude, tool belt, ear defenders. The reel's only happy sprite.
export const Grip: React.FC<{ lf: number; x: number; y: number; size?: number; flip?: number; z?: number }> = ({ lf, x, y, size = 74, flip = 0, z = 22 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scaleX(${flip ? -1 : 1})` }}>
    <Mascot lf={lf} size={size} tint={HERO} nodAmp={4.2} nodSpeed={7} gaze={1} />
    {/* ear defenders */}
    <div style={{ position: "absolute", left: -size * 0.04, top: size * 0.28, width: size * 0.14, height: size * 0.19, background: "#2E3540", borderRadius: 3, zIndex: 4 }} />
    <div style={{ position: "absolute", left: size * 0.90, top: size * 0.28, width: size * 0.14, height: size * 0.19, background: "#2E3540", borderRadius: 3, zIndex: 4 }} />
    <div style={{ position: "absolute", left: size * 0.08, top: size * 0.20, width: size * 0.84, height: size * 0.05, background: "#2E3540", borderRadius: 3, zIndex: 4 }} />
    {/* tool belt */}
    <div style={{ position: "absolute", left: size * 0.14, top: size * 0.62, width: size * 0.72, height: size * 0.08, background: "#6B4A2E", borderRadius: 2, zIndex: 5 }} />
    <div style={{ position: "absolute", left: size * 0.22, top: size * 0.66, width: size * 0.09, height: size * 0.13, background: "#8A6236", borderRadius: 2, zIndex: 5 }} />
  </div>
);


// ================= THE SOUND-STAGE KIT =================
// THE WORLD (board, binding): an interior sound stage. Hard theatrical lamps in a
// black-velvet void. Five bays in a row, receding. The JOB is a physical thing being
// made on a set: A CHAIR. The ATTEMPT is a reel of film. The GRADE is a verdict.
// NEVER a terminal, NEVER a prompt, NEVER a UI (clarity mandate).

// ---- THE DEPTH RECIPE (the CALLBACK cinematic-set bar, per design-stack-reel memory) ----
// back-wall gradient + trapezoid floor + receding grid + horizon glow + keylight cone
// + floor light-pool + cast-shadow ellipse + drifting haze + vignette.
export const StageFloor: React.FC<{ horizon?: number; o?: number; tint?: string }> = ({ horizon = 430, o = 1, tint = "#171A20" }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: horizon, background: `linear-gradient(180deg, ${VOID} 0%, #14171D 74%, ${tint} 100%)`, opacity: o }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: `linear-gradient(180deg, ${tint} 0%, #0C0E12 100%)`, opacity: o }} />
    {/* receding deck boards -> vanishing point */}
    {Array.from({ length: 13 }, (_, i) => {
      const p = i / 12;
      const yy = horizon + Math.pow(p, 1.7) * (792 - horizon);
      return <div key={i} style={{ position: "absolute", left: 0, right: 0, top: yy, height: 1, background: `rgba(226,222,210,${0.05 + p * 0.05})`, opacity: o }} />;
    })}
    {Array.from({ length: 11 }, (_, i) => {
      const x0 = 506 + (i - 5) * 34, x1 = 506 + (i - 5) * 210;
      return <div key={i} style={{ position: "absolute", left: 0, top: horizon, width: 1012, height: 792 - horizon, opacity: o }}>
        <svg width={1012} height={792 - horizon} style={{ position: "absolute", inset: 0 }}>
          <line x1={x0} y1={0} x2={x1} y2={792 - horizon} stroke="rgba(226,222,210,0.05)" strokeWidth={1} />
        </svg>
      </div>;
    })}
  </>
);

// A hard theatrical key with real barn-door edges + the pool it lands in.
export const KeyCone: React.FC<{ x: number; y?: number; w?: number; h?: number; o?: number; color?: string; poolY?: number; poolW?: number }> = ({ x, y = 128, w = 150, h = 470, o = 0.5, color = STAGEKEY, poolY, poolW }) => (
  <>
    <div style={{ position: "absolute", left: x - w * 0.28, top: y, width: w * 0.56, height: h, background: `linear-gradient(180deg, ${color}${Math.round(o * 90).toString(16).padStart(2, "0")}, transparent 88%)`, clipPath: `polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)`, filter: "blur(5px)", pointerEvents: "none" }} />
    {poolY !== undefined && <div style={{ position: "absolute", left: x - (poolW || w) / 2, top: poolY, width: poolW || w, height: (poolW || w) * 0.30, borderRadius: "50%", background: `radial-gradient(ellipse, ${color}${Math.round(o * 130).toString(16).padStart(2, "0")}, transparent 68%)`, filter: "blur(7px)" }} />}
  </>
);

// A hung lamp on the truss, with barn doors + safety chain. `on` 0..1.
export const Lamp: React.FC<{ x: number; y?: number; on?: number; s?: number }> = ({ x, y = 96, on = 1, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 0%", zIndex: 8 }}>
    <div style={{ position: "absolute", left: 15, top: -8, width: 2, height: 10, background: "rgba(160,168,180,0.5)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 27, background: "#232830", border: "2px solid #171A20", borderRadius: 3 }} />
    {/* barn doors */}
    <div style={{ position: "absolute", left: -5, top: 21, width: 12, height: 9, background: "#1B1F26", transform: "rotate(-26deg)" }} />
    <div style={{ position: "absolute", left: 28, top: 21, width: 12, height: 9, background: "#1B1F26", transform: "rotate(26deg)" }} />
    {/* the lens */}
    <div style={{ position: "absolute", left: 6, top: 22, width: 22, height: 8, borderRadius: 2, background: on > 0.02 ? STAGEKEY : "#2C313A", opacity: 0.35 + on * 0.65, boxShadow: on > 0.02 ? `0 0 ${10 + on * 16}px ${STAGEKEY}` : "none" }} />
  </div>
);

// The overhead truss the lamps hang from.
export const Truss: React.FC<{ x0?: number; x1?: number; y?: number }> = ({ x0 = 0, x1 = 1012, y = 96 }) => (
  <div style={{ position: "absolute", left: x0, top: y - 34, width: x1 - x0, height: 34, zIndex: 7 }}>
    <div style={{ position: "absolute", left: 0, top: 3, width: "100%", height: 4, background: "#3A414D" }} />
    <div style={{ position: "absolute", left: 0, top: 26, width: "100%", height: 4, background: "#333A45" }} />
    {Array.from({ length: Math.ceil((x1 - x0) / 46) }, (_, i) => (
      <svg key={i} width={46} height={34} style={{ position: "absolute", left: i * 46, top: 0 }}>
        <line x1={0} y1={30} x2={23} y2={5} stroke="#39404B" strokeWidth={3} />
        <line x1={23} y1={5} x2={46} y2={30} stroke="#39404B" strokeWidth={3} />
      </svg>
    ))}
  </div>
);

// ---- THE CHAIR: the job. One component, `solve` picks the geometry. ----
// solve 0 = THE FINE CHAIR (S0). It is FINE. Not bad, not special. The scene dies if it is bad.
// solve 1..5 = the five bays' answers to one kit. ALL legible as chairs, ALL legible as
// different, NONE a joke chair. solve 4 = the winner (the graceful curve a stranger reads instantly).
// `build` 0..1 = assembly progress (0 = flat-packed kit on the mark, 1 = finished).
export const Chair: React.FC<{ x: number; y: number; s?: number; solve?: number; build?: number; o?: number; z?: number; rot?: number; wood?: string }> = ({ x, y, s = 1, solve = 0, build = 1, o = 1, z = 20, rot = 0, wood = "#B98A56" }) => {
  const dark = "#8A6236", light = "#D2A472";
  const kit = build < 0.06;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 100%", opacity: o, zIndex: z }}>
      {kit ? (
        // flat-packed kit, stacked flat on the mark
        <div style={{ position: "absolute", left: -46, top: -13, width: 92, height: 13 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: i * 2, top: i * -4, width: 92 - i * 4, height: 5, background: i % 2 ? dark : wood, border: "1px solid rgba(0,0,0,0.4)", borderRadius: 1 }} />)}
        </div>
      ) : (
        <svg width={132} height={148} viewBox="0 0 132 148" style={{ position: "absolute", left: -66, top: -148, overflow: "visible" }} shapeRendering="geometricPrecision">
          {/* legs (all solves) */}
          <rect x={20} y={92 + (1 - build) * 30} width={9} height={56 * build} fill={dark} />
          <rect x={103} y={92 + (1 - build) * 30} width={9} height={56 * build} fill={dark} />
          <rect x={30} y={92 + (1 - build) * 30} width={7} height={56 * build} fill={wood} opacity={0.85} />
          <rect x={95} y={92 + (1 - build) * 30} width={7} height={56 * build} fill={wood} opacity={0.85} />
          {/* seat */}
          {build > 0.24 && (solve === 2
            ? <rect x={8} y={84} width={116} height={11} fill={wood} rx={2} />   // low + wide
            : solve === 3
              ? <rect x={22} y={86} width={88} height={8} fill={wood} rx={1} />  // spindly
              : solve === 5
                ? <rect x={16} y={84} width={100} height={13} fill={wood} rx={2} /> // cantilever slab
                : <rect x={20} y={84} width={92} height={11} fill={wood} rx={2} />)}
          {build > 0.24 && <rect x={solve === 2 ? 8 : 20} y={84} width={solve === 2 ? 116 : 92} height={3} fill={light} opacity={0.6} rx={1} />}
          {/* the BACK: this is where the five solves diverge and it must read by shape alone */}
          {build > 0.55 && <>
            {solve === 0 && <>{/* S0 FINE: blunt right angle. acceptable, unremarkable. */}
              <rect x={22} y={30} width={9} height={56} fill={dark} />
              <rect x={101} y={30} width={9} height={56} fill={dark} />
              <rect x={22} y={30} width={88} height={9} fill={wood} />
              <rect x={22} y={54} width={88} height={7} fill={wood} opacity={0.9} />
            </>}
            {solve === 1 && <>{/* ladder-back, heavy, square */}
              <rect x={22} y={26} width={10} height={60} fill={dark} />
              <rect x={100} y={26} width={10} height={60} fill={dark} />
              {[0, 1, 2].map((i) => <rect key={i} x={26} y={32 + i * 18} width={80} height={8} fill={wood} />)}
            </>}
            {solve === 2 && <>{/* low + wide lounge, fat rail */}
              <rect x={12} y={48} width={11} height={38} fill={dark} />
              <rect x={109} y={48} width={11} height={38} fill={dark} />
              <rect x={12} y={44} width={108} height={14} fill={wood} rx={6} />
            </>}
            {solve === 3 && <>{/* spindly + elegant: thin verticals */}
              <rect x={26} y={28} width={5} height={58} fill={dark} />
              <rect x={101} y={28} width={5} height={58} fill={dark} />
              {[0, 1, 2, 3].map((i) => <rect key={i} x={42 + i * 16} y={34} width={4} height={52} fill={wood} opacity={0.92} />)}
              <rect x={26} y={26} width={80} height={7} fill={wood} rx={3} />
            </>}
            {solve === 4 && <>{/* THE WINNER: the graceful curve where take one had a blunt right angle */}
              <path d={`M 26 88 C 24 44, 44 22, 66 22 C 88 22, 108 44, 106 88`} fill="none" stroke={wood} strokeWidth={11} strokeLinecap="round" />
              <path d={`M 26 88 C 24 44, 44 22, 66 22 C 88 22, 108 44, 106 88`} fill="none" stroke={light} strokeWidth={3} strokeLinecap="round" opacity={0.55} />
              <path d={`M 38 86 C 37 56, 50 42, 66 42 C 82 42, 95 56, 94 86`} fill="none" stroke={dark} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
            </>}
            {solve === 5 && <>{/* clean cantilever: a single continuous bent frame */}
              <path d={`M 16 96 L 16 34 L 116 34`} fill="none" stroke={dark} strokeWidth={10} strokeLinejoin="round" />
              <rect x={20} y={38} width={92} height={9} fill={wood} rx={2} />
              <rect x={20} y={62} width={92} height={9} fill={wood} rx={2} />
            </>}
          </>}
          {/* the mallet-in-progress wobble while building */}
          {build > 0.24 && build < 1 && <rect x={20} y={84} width={92} height={11} fill="rgba(240,226,192,0.10)" />}
        </svg>
      )}
    </div>
  );
};

// ---- THE REEL CAN: the attempt. Flat circle. `printIt` = the stamp. `slate` = the numbered
// slate taped to the lid (S4/S5). `blacked` = S6 kills the number but KEEPS the shape.
export const ReelCan: React.FC<{ x: number; y: number; s?: number; printIt?: number; slate?: number; blacked?: number; rot?: number; o?: number; z?: number }> = ({ x, y, s = 1, printIt = 0, slate = 0, blacked = 0, rot = 0, o = 1, z = 21 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 50%", opacity: o, zIndex: z }}>
    <div style={{ position: "absolute", left: -42, top: -42, width: 84, height: 84, borderRadius: "50%", background: "radial-gradient(circle at 36% 32%, #4A525E, #262B33 72%)", border: "3px solid #171A20", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.85)" }}>
      <div style={{ position: "absolute", inset: 11, borderRadius: "50%", border: "2px solid rgba(226,222,210,0.14)" }} />
      <div style={{ position: "absolute", inset: 30, borderRadius: "50%", background: "#1B1F26", border: "2px solid rgba(226,222,210,0.10)" }} />
      {/* the scuffs + tape flag: IDENTICAL on every can (S2: it is visibly the SAME reel) */}
      <div style={{ position: "absolute", left: 12, top: 24, width: 17, height: 2, background: "rgba(226,222,210,0.16)", transform: "rotate(-18deg)" }} />
      <div style={{ position: "absolute", left: 48, top: 58, width: 13, height: 2, background: "rgba(226,222,210,0.12)", transform: "rotate(12deg)" }} />
    </div>
    {/* the numbered slate taped to the lid. Sub-resolution scribble: the SHAPE reads, the digit never does. */}
    {slate > 0 && (
      <div style={{ position: "absolute", left: -17, top: -13, width: 34, height: 26, background: blacked > 0.5 ? VOID : "#20242B", border: `2px solid ${blacked > 0.5 ? "#0A0C0F" : "#12151A"}`, borderRadius: 2, boxShadow: "0 2px 5px -1px rgba(0,0,0,0.7)" }}>
        {blacked < 0.5 && <>
          <div style={{ position: "absolute", left: 6, top: 6, width: 9, height: 13, background: "rgba(226,222,210,0.55)" }} />
          <div style={{ position: "absolute", left: 19, top: 9, width: 8, height: 10, background: "rgba(226,222,210,0.34)" }} />
        </>}
      </div>
    )}
    {printIt > 0 && <PrintIt x={-38} y={-13} s={0.62} rot={-11} o={printIt} z={z + 2} />}
  </div>
);

// ---- A BAY: one stage. The five bays are THIS component instanced five times
// (runbook 6: do not hand-author five bays). `lit` 0..1. Dressed IDENTICALLY, always.
export const Bay: React.FC<{ x: number; w?: number; lit?: number; lf?: number; children?: React.ReactNode; flat?: string }> = ({ x, w = 180, lit = 1, lf = 0, children, flat = "#2A3038" }) => (
  <div style={{ position: "absolute", left: x, top: 0, width: w, height: 792, zIndex: 6 }}>
    {/* the painted flat behind */}
    <div style={{ position: "absolute", left: 6, top: 196, width: w - 12, height: 300, background: `linear-gradient(180deg, ${flat}, #1C2128)`, opacity: 0.35 + lit * 0.65, boxShadow: lit > 0.1 ? `inset 0 0 40px rgba(240,226,192,${lit * 0.10})` : "none" }} />
    {/* chalk tape marks on the deck, four colours */}
    {["#D2724E", "#E7B24C", "#7FA8C9", "#8FBF8F"].map((c, i) => (
      <div key={i} style={{ position: "absolute", left: 22 + i * 15, top: 560 + i * 5, width: 20, height: 3, background: c, opacity: (0.16 + lit * 0.34) }} />
    ))}
    {/* the stand + a sandbag on every leg */}
    <div style={{ position: "absolute", left: w - 34, top: 470, width: 3, height: 130, background: "#333A45", opacity: 0.4 + lit * 0.6 }} />
    <div style={{ position: "absolute", left: w - 44, top: 592, width: 25, height: 13, borderRadius: 4, background: "#2C3138", opacity: 0.4 + lit * 0.6 }} />
    {lit > 0.02 && <KeyCone x={w / 2} y={124} w={w * 0.94} h={430} o={lit * 0.44} poolY={556} poolW={w * 0.74} />}
    {children}
  </div>
);

// drifting stage haze. It only lives inside a lamp cone: when a lamp dies its haze
// loses shape, which is how the audience FEELS the room shrink (S0 L5).
export const Haze: React.FC<{ lf: number; x: number; y?: number; w?: number; h?: number; o?: number; n?: number; sd?: number }> = ({ lf, x, y = 170, w = 170, h = 400, o = 1, n = 7, sd = 0 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const s = seed(i * 3.7 + sd + 1);
    const drift = ((lf * (0.16 + s * 0.3) + s * 300) % (w + 90)) - 45;
    const yy = y + s * h * 0.82;
    const sz = 44 + s * 74;
    return <div key={i} style={{ position: "absolute", left: x + drift, top: yy + Math.sin(lf / (34 + s * 22) + i) * 9, width: sz, height: sz * 0.56, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(240,226,192,${0.05 + s * 0.05}), transparent 70%)`, filter: "blur(9px)", opacity: o, pointerEvents: "none", zIndex: 12 }} />;
  })}</>
);

// a cast-shadow ellipse under a body/prop, so nothing floats
export const CastShadow: React.FC<{ x: number; y: number; w?: number; o?: number }> = ({ x, y, w = 100, o = 0.5 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: w * 0.22, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(0,0,0,${o}), transparent 70%)`, filter: "blur(5px)", zIndex: 14 }} />
);

// the vignette every scene closes with
export const Vig: React.FC<{ o?: number }> = ({ o = 0.5 }) => (
  <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 190px rgba(0,0,0,${o})`, pointerEvents: "none", zIndex: 60 }} />
);

// the hanging production board: rows for takes 1..5. Shape, never digits.
export const ProdBoard: React.FC<{ x: number; y: number; filled?: number; s?: number; o?: number }> = ({ x, y, filled = 1, s = 1, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 0%", opacity: o, zIndex: 9 }}>
    <div style={{ position: "absolute", left: 26, top: -12, width: 2, height: 12, background: "rgba(160,168,180,0.4)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 108, height: 88, background: "#1E232A", border: "2px solid #12151A", borderRadius: 3 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ position: "absolute", left: 7, top: 8 + i * 16, width: 94, height: 12, borderBottom: "1px solid rgba(226,222,210,0.14)" }}>
          {i < filled && <>
            <div style={{ position: "absolute", left: 2, top: 3, width: 15, height: 6, background: "rgba(226,222,210,0.42)" }} />
            <div style={{ position: "absolute", left: 23, top: 3, width: 34, height: 6, background: "rgba(226,222,210,0.26)" }} />
          </>}
        </div>
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

// ============================ S0 PRINT IT ============================
const S0: React.FC<{ lf: number }> = ({ lf }) => {
  // ================= S0 PRINT IT (79f, VO-locked) =================
  // "You've never seen Claude's best work. You've only seen its first take."
  // Verb: SLAM. Clap ledger: exactly ONE clap, and it works.

  // ---- L6 CAMERA: 5pct push to the chair, a 2pct flinch on the slam, then a drift right ----
  const push = over(lf, 0, 27, Easing.inOut(Easing.cubic));
  const flinch = Math.max(0, 1 - Math.abs(lf - 28) / 6);
  const driftX = -over(lf, 38, 41, Easing.inOut(Easing.cubic)) * 36;
  const camScale = 1 + push * 0.05 - flinch * 0.02;

  // ---- L1 HERO: mallet mid-swing at f0, hands off f18, hopeful lean f22, flinch f27, shrug f37, tidy f40+ ----
  const swingAt = (x: number) => {
    const p = ((x + 5) % 9) / 9;
    return interpolate(p, [0, 0.62, 0.92, 1], [20, -46, -46, 20]);
  };
  const hit = Math.max(0, 1 - Math.abs(lf - 4) / 3) + Math.max(0, 1 - Math.abs(lf - 13) / 3);
  const mDown = over(lf, 18, 4);
  const mx = interpolate(mDown, [0, 1], [322, 262]);
  const my = interpolate(mDown, [0, 1], [566, 700]);
  const mang = lf < 18 ? swingAt(lf) : interpolate(mDown, [0, 1], [swingAt(18), 96]);
  const lean = over(lf, 22, 4) - over(lf, 27, 3);
  const shrug = Math.max(0, 1 - Math.abs(lf - 38) / 7);
  const tidy = over(lf, 40, 9);
  const gaze = interpolate(lf, [0, 36, 46], [4, 4, -3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const build = interpolate(lf, [0, 4, 13, 18], [0.6, 0.78, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const heroX = 120 - flinch * 7 - tidy * 16;
  const heroY = 458 + lean * 4 + shrug * 5;

  // ---- L2 TAKE ONE: simply there at f22 at peak power. SLAM f27. Stamp f35. Walks f38 to f79. ----
  const vOn = lf >= 22 ? 1 : 0;
  const walkP = over(lf, 38, 41, Easing.linear);
  const vx = interpolate(walkP, [0, 1], [520, 900]);
  const vsize = interpolate(walkP, [0, 1], [250, 198]);
  const vtop = interpolate(walkP, [0, 1], [450, 474]);
  const bOpen = interpolate(lf, [22, 26, 27, 29, 31, 33], [1, 1, 0, 0.16, 0.02, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slamFlash = Math.max(0, 1 - Math.abs(lf - 27) / 4);

  // ---- L3 THE BLACKOUT: 8 lamps die ~5f apart, tracking his walk. Bay 1 never dies. ----
  const dieX = [430, 496, 562, 628, 694, 760, 826, 892];
  const dieOn = dieX.map((_, i) => 1 - over(lf, 38 + i * 5, 6, Easing.linear));
  const darkBays = [{ x: 436, w: 156 }, { x: 600, w: 138 }, { x: 748, w: 122 }, { x: 880, w: 108 }];
  const bayLit = (k: number) => 0.18 * ((dieOn[k * 2] + dieOn[k * 2 + 1]) / 2);

  // ---- L4 THE GRIP: coiling at f0, wrapping up before anyone told him to, walking out by f79 ----
  const gx = interpolate(lf, [58, 79], [42, -86], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- the stamp, still rocking on the lid at f78 ----
  const stampO = over(lf, 35, 4);
  const stampPop = interpolate(lf, [35, 37, 40], [1.75, 0.93, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampRock = -11 + Math.sin((lf - 35) / 2.4) * 4.5 * Math.exp(-Math.max(0, lf - 35) / 60);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${camScale}) translateX(${driftX}px)`, transformOrigin: "38% 58%" }}>
        {/* ---------- FAR: the black velvet void + the receding deck ---------- */}
        <StageFloor horizon={432} tint="#171A20" />
        {/* the far back wall of the row, catching almost nothing */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, height: 60, background: `linear-gradient(180deg, transparent, rgba(240,226,192,${0.03 + 0.05 * dieOn[7]}))`, zIndex: 1 }} />

        {/* ---------- BACKGROUND: THE FOUR DARK BAYS, dressed identically, chair kits on the marks ---------- */}
        {darkBays.map((b, k) => {
          const bl = bayLit(k);
          return (
            <div key={k} style={{ position: "absolute", inset: 0, zIndex: 6, opacity: Math.min(1, bl * 5.6) }}>
              <Bay x={b.x} w={b.w} lit={0} lf={lf}>
                {/* the unbuilt kit, stacked flat on the mark. Never built. Only ever switched on. */}
                <Chair x={b.w / 2} y={636} s={0.62} build={0} o={0.9} z={7} />
                {/* the spill this bay is borrowing off bay one, and losing */}
                <div style={{ position: "absolute", left: 4, top: 470, width: b.w - 8, height: 130, background: `radial-gradient(ellipse at 50% 90%, rgba(240,226,192,${bl * 0.9}), transparent 70%)`, filter: "blur(8px)" }} />
              </Bay>
              <Haze lf={lf} x={b.x} y={250} w={b.w} h={280} o={bl * 3.4} n={3} sd={k * 5 + 2} />
            </div>
          );
        })}

        {/* ---------- BAY ONE, LIT: painted flat, chalk marks, sandbagged stand, key cone ---------- */}
        <Bay x={20} w={400} lit={1} lf={lf} flat="#2E353F" />
        {/* wear on the painted flat: a patched seam and a scuff line */}
        <div style={{ position: "absolute", left: 176, top: 200, width: 3, height: 292, background: "rgba(226,222,210,0.08)", zIndex: 7 }} />
        <div style={{ position: "absolute", left: 44, top: 462, width: 300, height: 2, background: "rgba(226,222,210,0.07)", zIndex: 7 }} />

        {/* ---------- FAR: THE LAMP RIG. Truss, barn doors, dimmer run. ---------- */}
        <Truss x0={0} x1={1012} y={168} />
        {/* the dimmer run: pulses crawling the truss, always moving */}
        {Array.from({ length: 6 }, (_, i) => {
          const dx = ((lf * 3.1 + i * 176) % 1080) - 34;
          return <div key={i} style={{ position: "absolute", left: dx, top: 176, width: 5, height: 3, borderRadius: 2, background: "rgba(140,170,210,0.5)", zIndex: 7 }} />;
        })}
        <div style={{ position: "absolute", left: 0, top: 179, width: 1012, height: 1, background: "rgba(90,100,116,0.4)", zIndex: 7 }} />
        {/* bay one's three lamps: these NEVER die. One cone is left at f78. */}
        {[110, 210, 310].map((x, i) => <Lamp key={i} x={x} y={168} on={0.94 + Math.sin(lf / 7 + i) * 0.06} s={0.94} />)}
        {/* the eight that die, one by one, tracking his walk */}
        {dieX.map((x, i) => (
          <React.Fragment key={i}>
            <Lamp x={x} y={168} on={dieOn[i]} s={0.86} />
            {/* the filament still cooling: the glow lags the lens */}
            <div style={{ position: "absolute", left: x - 46, top: 190, width: 128, height: 300, background: `radial-gradient(ellipse at 50% 0%, rgba(240,226,192,${dieOn[i] * 0.10}), transparent 68%)`, filter: "blur(10px)", zIndex: 5, pointerEvents: "none" }} />
          </React.Fragment>
        ))}

        {/* ---------- FAR: THE PRODUCTION BOARD. Row one filled. Rows two to five blank, in plain sight. ---------- */}
        <ProdBoard x={740} y={244} filled={1} s={1} o={0.34 + dieOn[4] * 0.5} />

        {/* ---------- MIDGROUND: the deck dressing ---------- */}
        {/* the cable run, taped down badly, with a trip loop nobody will ever fix */}
        <svg width={1012} height={200} style={{ position: "absolute", left: 0, top: 636, zIndex: 15, overflow: "visible" }}>
          <path d={`M -20 118 C 120 ${104 + Math.sin(lf / 21) * 2}, 168 152, 246 148 C 320 144, 300 ${100 + Math.sin(lf / 17) * 2}, 232 104 C 176 108, 214 146, 322 132 C 470 112, 610 96, 780 82`} fill="none" stroke="#15181D" strokeWidth={7} strokeLinecap="round" />
          <path d={`M -20 118 C 120 ${104 + Math.sin(lf / 21) * 2}, 168 152, 246 148 C 320 144, 300 ${100 + Math.sin(lf / 17) * 2}, 232 104 C 176 108, 214 146, 322 132 C 470 112, 610 96, 780 82`} fill="none" stroke="rgba(226,222,210,0.10)" strokeWidth={2} strokeLinecap="round" />
          {/* gaffer tape lifting at the edges */}
          {[[96, 128], [352, 126], [520, 106]].map((p, i) => (
            <rect key={i} x={p[0]} y={p[1] - 7} width={26} height={13} fill="rgba(226,222,210,0.13)" transform={`rotate(${i * 5 - 6} ${p[0] + 13} ${p[1]})`} />
          ))}
        </svg>
        {/* the distro box the cable runs to, LEDs working all scene */}
        <div style={{ position: "absolute", left: 34, top: 690, width: 62, height: 46, background: "linear-gradient(160deg,#2A3038,#171A20)", border: "2px solid #101318", borderRadius: 3, zIndex: 16, boxShadow: "0 8px 16px -6px rgba(0,0,0,0.8)" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 8 + i * 15, top: 8, width: 7, height: 7, borderRadius: "50%", background: i === 1 ? "#C9A227" : "#7FA8C9", opacity: 0.35 + Math.abs(Math.sin(lf / (8 + i * 5) + i * 2)) * 0.65 }} />
          ))}
          <div style={{ position: "absolute", left: 8, top: 24, width: 46, height: 3, background: "rgba(226,222,210,0.12)" }} />
          <div style={{ position: "absolute", left: 8, top: 32, width: 30, height: 3, background: "rgba(226,222,210,0.09)" }} />
        </div>
        {/* a stray sandbag on the deck */}
        <div style={{ position: "absolute", left: 396, top: 704, width: 44, height: 20, borderRadius: 6, background: "linear-gradient(180deg,#333941,#1D2128)", border: "1px solid #12151A", zIndex: 16 }} />
        {/* THE DIRECTOR'S CHAIR SILHOUETTE. Where he stopped. It never moves with him. */}
        <div style={{ position: "absolute", left: 636, top: 452, width: 84, height: 96, zIndex: 5, opacity: 0.5 * (0.3 + dieOn[3] * 0.7) }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 84, height: 26, background: "#0A0C0F", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 4, top: 26, width: 4, height: 70, background: "#0A0C0F" }} />
          <div style={{ position: "absolute", left: 76, top: 26, width: 4, height: 70, background: "#0A0C0F" }} />
          <div style={{ position: "absolute", left: 0, top: 62, width: 84, height: 4, background: "#0A0C0F", transform: "rotate(9deg)" }} />
        </div>

        {/* ---------- MIDGROUND: shadows so nothing floats ---------- */}
        <CastShadow x={240} y={672} w={196} o={0.55} />
        <CastShadow x={330} y={686} w={128} o={0.42} />
        {vOn > 0 && <CastShadow x={vx} y={vtop + vsize * 0.9} w={vsize * 0.74} o={0.46 * (0.4 + dieOn[2] * 0.6)} />}
        <CastShadow x={gx + 38} y={694} w={76} o={0.38} />

        {/* ---------- MIDGROUND: THE CHAIR. It is FINE. That is the whole problem. ---------- */}
        <Chair x={330} y={688} s={1} solve={0} build={build} rot={hit * 1.3} z={20} />
        {/* sawdust puffing off the joint on every mallet hit */}
        {hit > 0.02 && Array.from({ length: 7 }, (_, i) => {
          const s = seed(i * 4.1 + 2);
          return <div key={i} style={{ position: "absolute", left: 300 + s * 60, top: 640 - hit * (14 + s * 24), width: 3, height: 3, background: "rgba(240,226,192,0.7)", opacity: hit * 0.8, zIndex: 21 }} />;
        })}

        {/* ---------- MIDGROUND: THE HERO. Warm clay, eyes visible at all times. ---------- */}
        <div style={{ position: "absolute", left: heroX, top: heroY, zIndex: 20, transform: `rotate(${-lean * 5 - flinch * 3}deg)`, transformOrigin: "50% 100%" }}>
          <Mascot lf={lf} size={240} tint={HERO} gaze={gaze} nodAmp={tidy > 0.3 ? 4.4 : 2.6} nodSpeed={tidy > 0.3 ? 7 : 11} shock={flinch * 0.36} cheer={shrug * 0.32} />
          {/* sawdust on one shoulder, a tape measure at the hip, a pencil behind the ear nub */}
          <div style={{ position: "absolute", left: 52, top: 56, width: 26, height: 4, background: "rgba(240,226,192,0.35)", zIndex: 6 }} />
          <div style={{ position: "absolute", left: 60, top: 62, width: 9, height: 3, background: "rgba(240,226,192,0.28)", zIndex: 6 }} />
          <div style={{ position: "absolute", left: 152, top: 128, width: 20, height: 15, background: "#C9A227", opacity: 0.55, borderRadius: 2, zIndex: 6 }} />
          <div style={{ position: "absolute", left: 46, top: 30, width: 22, height: 4, background: "#D2A472", transform: "rotate(-22deg)", zIndex: 6 }} />
        </div>
        {/* the cable coil he winds while he agrees with the man who ended his day */}
        {tidy > 0.02 && (
          <div style={{ position: "absolute", left: heroX + 8, top: 566, width: 54, height: 54, zIndex: 23, opacity: tidy, transform: `rotate(${lf * 8}deg) scaleY(0.44)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "7px solid #1A1E24", boxShadow: "0 0 0 1px rgba(226,222,210,0.10) inset" }} />
          </div>
        )}
        {/* THE MALLET: mid-swing on frame zero, set down at f18, lying on the deck after */}
        <div style={{ position: "absolute", left: mx, top: my, width: 12, height: 66, zIndex: 24, transform: `rotate(${mang}deg)`, transformOrigin: "50% 92%" }}>
          <div style={{ position: "absolute", left: 3, top: 16, width: 7, height: 50, background: "#8A6236", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: -12, top: 0, width: 36, height: 19, background: "linear-gradient(180deg,#D2A472,#8A6236)", border: "2px solid #5E4324", borderRadius: 2 }} />
        </div>

        {/* ---------- MIDGROUND: TAKE ONE. Peak power, no build up, no entrance. ---------- */}
        {vOn > 0 && (
          <>
            {/* THE BLACKOUT AURA. His whole power: there is no reason to shoot anything else. */}
            <div style={{ position: "absolute", left: vx - 210, top: vtop - 60, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,15,18,0.72), transparent 66%)", filter: "blur(16px)", zIndex: 17, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: vx - vsize / 2, top: vtop, zIndex: 24 }}>
              <Villain lf={lf} size={vsize} gaze={-2} nodAmp={walkP > 0.02 ? 4 : 1.4} nodSpeed={walkP > 0.02 ? 9 : 24} boardOpen={bOpen} lowered={0} />
            </div>
            {/* THE SLAM: chalk dust off the face, and a hard white edge on the clapstick */}
            {slamFlash > 0.02 && <div style={{ position: "absolute", left: vx - 40, top: vtop + 58, width: 150, height: 40, background: `rgba(240,226,192,${slamFlash * 0.5})`, filter: "blur(9px)", zIndex: 28, pointerEvents: "none" }} />}
            {lf > 26 && lf < 46 && Array.from({ length: 9 }, (_, i) => {
              const s = seed(i * 2.9 + 5);
              const a = (lf - 27) / 19;
              return <div key={i} style={{ position: "absolute", left: vx + 8 + (s - 0.5) * 90 + a * (s - 0.5) * 54, top: vtop + 86 + a * (16 + s * 42), width: 3 + s * 2, height: 3 + s * 2, borderRadius: "50%", background: "rgba(226,222,210,0.75)", opacity: Math.max(0, 1 - a) * 0.8, zIndex: 29 }} />;
            })}
          </>
        )}

        {/* ---------- FOREGROUND: THE REEL CAN + THE STAMP. Crooked. Smug. Still rocking at f78. ---------- */}
        <ReelCan x={640} y={712} s={0.85} printIt={0} slate={0} rot={-4} z={32} />
        {stampO > 0.01 && <PrintIt x={580} y={678} s={0.68 * stampPop} rot={stampRock} o={stampO} z={34} />}

        {/* ---------- L4 THE GRIP: knee high, ear defenders, already coiling on frame zero ---------- */}
        <Grip lf={lf} x={gx} y={620} size={78} z={26} />
        <div style={{ position: "absolute", left: gx + 56, top: 656, width: 34, height: 34, zIndex: 27, transform: `rotate(${-lf * 9}deg) scaleY(0.4)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "5px solid #15181D" }} />
        </div>
        {/* the stand he kills on his way out */}
        <div style={{ position: "absolute", left: 108, top: 596 + over(lf, 50, 8) * 96, width: 3, height: 108, background: "#333A45", zIndex: 25, transform: `rotate(${over(lf, 50, 8) * 78}deg)`, transformOrigin: "50% 100%", opacity: 0.7 }} />

        {/* ---------- L5 HAZE: it only lives in a cone. As lamps die the room shrinks. ---------- */}
        <Haze lf={lf} x={30} y={196} w={380} h={430} o={0.95} n={8} sd={1} />
        {/* dust hanging in bay one's key, always falling, still falling at f78 */}
        {Array.from({ length: 22 }, (_, i) => {
          const s = seed(i * 1.9 + 11);
          const yy = 210 + ((s * 470 + lf * (0.5 + s * 1.1)) % 470);
          return <div key={i} style={{ position: "absolute", left: 70 + s * 300, top: yy, width: 2, height: 2, borderRadius: "50%", background: "rgba(240,226,192,0.85)", opacity: 0.2 + s * 0.4, zIndex: 13 }} />;
        })}

        {/* ---------- FOREGROUND: near black chunks, and haze crossing in front of the lens ---------- */}
        <div style={{ position: "absolute", left: -18, top: 736, width: 132, height: 46, borderRadius: 9, background: "linear-gradient(180deg,#1B1F26,#0B0D10)", border: "2px solid #08090C", zIndex: 44 }}>
          <div style={{ position: "absolute", left: 16, top: 8, width: 60, height: 3, background: "rgba(226,222,210,0.07)" }} />
        </div>
        <div style={{ position: "absolute", left: 946, top: 386, width: 9, height: 400, background: "linear-gradient(90deg,#12151A,#05070A)", zIndex: 44 }} />
        <div style={{ position: "absolute", left: 902, top: 762, width: 98, height: 16, background: "#0A0C0F", borderRadius: 3, zIndex: 44 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 45, pointerEvents: "none" }}>
          <Haze lf={lf} x={-60} y={560} w={1120} h={210} o={0.55} n={4} sd={9} />
        </div>

        <Vig o={0.5 + over(lf, 38, 41, Easing.linear) * 0.22} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================ S1 THE TRAILER DOOR ============================
const S1: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S1 */}</AbsoluteFill>);
};

// ============================ S2 THE DEFENCE ============================
const S2: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S2 */}</AbsoluteFill>);
};

// ============================ S3 FIVE STAGES ============================
const S3: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S3 */}</AbsoluteFill>);
};

// ============================ S4 THE WALLS ============================
const S4: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S4 */}</AbsoluteFill>);
};

// ============================ S5 THE CUTTING ROOM ============================
const S5: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S5 */}</AbsoluteFill>);
};

// ============================ S6 THE BLACKOUT ============================
const S6: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S6 */}</AbsoluteFill>);
};

// ============================ S7 THE VERDICT ============================
const S7: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S7 */}</AbsoluteFill>);
};

// ============================ S8 THE THESIS ============================
const S8: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S8 */}</AbsoluteFill>);
};

// ============================ S9 CTA ============================
const S9: React.FC<{ lf: number }> = ({ lf }) => {
  return (<AbsoluteFill>{/* SCENE_BODY_S9 */}</AbsoluteFill>);
};

// ---------------- the top game rail (house chassis, re-skinned TAKES n/5) ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const count = TAKEMARKS.filter((x) => t >= x).length;
  const litTimes = TAKEMARKS.filter((x) => t >= x);
  const lastTool = litTimes.length ? Math.max(...litTimes) : -9;
  const pop = Math.max(0, 1 - (t - lastTool) * 3);
  const giftOpen = over(f, Lf[9] + fr(0.3), fr(0.5), Easing.out(Easing.back(2)));
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(90,95,107,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const np = (i + 1) / 6;
        const lit = count > i;
        const dt = lit ? t - TAKEMARKS[i] : 99;
        const pp = lit ? 1 + Math.max(0, 1 - dt * 2.2) * 0.5 : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 4, transform: "translateX(-50%)", width: 50, height: 50 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pp})`, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#252A33", border: `4px solid ${lit ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: lit ? "#3a2a05" : GOLD, boxShadow: lit ? (dt < 0.5 ? `0 0 ${Math.max(8, 26 - dt * 36)}px ${GOLD}` : `0 0 13px ${GOLD}99`) : `0 0 9px ${GOLD}44` }}>{lit ? "✓" : i + 1}</div>
            {lit && dt < 0.7 && <div style={{ position: "absolute", left: 25, top: 25, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + dt * 12})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
          </div>);
      })}
      <div style={{ position: "absolute", right: -22, top: -20, width: 90, height: 90, transform: `translateY(${Math.sin(t * 2.4) * 3}px) scale(${1 + giftOpen * 0.12})`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${giftOpen > 0.1 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + giftOpen * 22}px ${GOLD}66` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, lineHeight: 1, filter: giftOpen > 0.1 ? "none" : "grayscale(0.6) brightness(0.85)", opacity: giftOpen > 0.1 ? 1 : 0.62, transform: `scale(${0.84 + giftOpen * 0.16})` }}>{"🎁"}</div>
      </div>
      <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: pop > 0.05 ? `0 0 ${14 + pop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + pop * 2.4} nodSpeed={6.5} cheer={Math.max(pop * 0.8, count >= 5 ? 0.7 : 0)} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + pop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: pop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>TAKES {count}/5</div>
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


export const ClaudeTakesReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.026;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_takes.wav")} />
      <Audio loop src={staticFile("ebm_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[9]) - 8, fr(L[9]) + 14, 99999], [0, 0.09, 0.09, 0.07, 0.07], { extrapolateRight: "clamp" })} />
      {/* SFX_BLOCK */}
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Panel tint="rgba(150,160,180,0.22)" label="sound stage 1 / take 1">
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
    </AbsoluteFill>
  );
};
