import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_jarvis1.json";
import duckRaw from "./data/duck_jarvis1.json";

// ============================================================================
// reel 62 - JARVIS, PART 1: THE BRAIN   (keyword JARVIS)
// SOLO chassis: ONE framed dark panel (reel-never-dual-screen, ABSOLUTE).
// Chrome cloned from ClaudeFactoryReel; Mascot ported from ClaudeBlueprintReel.
// Scene bodies are PANEL-LOCAL 0..792 (reel-build-gotchas).
// SFX: every cue is emitted as L[i] + local seconds. The cloned Factory ROOT cue
// map has been DELETED on purpose (sfx-root-timeline-trap: a scene-local `at` in
// C2+ typechecks, renders, and is SILENT).
// ============================================================================

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const IRON = "#B4423A", IRONG = "#E7B24C", HUD = "#7FE8FF";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec) - derived from vo_jarvis1.wav word onsets, never guessed
const L = [0.0, 3.28, 6.14, 7.64, 13.46, 18.32, 23.30, 24.48, 30.32, 35.40, 40.72, 44.34];
const Lf = L.map(fr);
const CUT = 46.213;
const CLOCK_START = CUT - 3.6;

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

// ============================== SOL (hero sun) ==============================

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

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; iron?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, iron = 0 }) => {
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
        {/* police cap: blue crown + band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
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
        {/* IRON CLAUDE faceplate (knockoff, never branded) */}
        {iron > 0 && <g opacity={iron}>
          <path d="M62,52 L138,52 L146,86 L138,124 Q100,146 62,124 L54,86 Z" fill="#B4423A" stroke="#E7B24C" strokeWidth={3} strokeLinejoin="round" />
          <path d="M62,52 L138,52 L142,70 L58,70 Z" fill="#C9524A" />
          <rect x={68} y={78} width={26} height={9} rx={4} fill="#7FE8FF" opacity={0.55 + 0.45 * Math.abs(Math.sin(lf / 9))} />
          <rect x={106} y={78} width={26} height={9} rx={4} fill="#7FE8FF" opacity={0.55 + 0.45 * Math.abs(Math.sin(lf / 9))} />
          <g stroke="#E7B24C" strokeWidth={2.5} strokeLinecap="round">
            <line x1={80} y1={106} x2={120} y2={106} />
            <line x1={84} y1={116} x2={116} y2={116} />
          </g>
          <path d="M62,52 L138,52 L146,86 L138,124 Q100,146 62,124 L54,86 Z" fill="none" stroke="rgba(255,240,200,0.35)" strokeWidth={1.5} />
        </g>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.1, width: size * 0.055, height: size * 0.075, background: "#8FC7E8", borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", clipPath: "polygon(50% 0%, 88% 62%, 72% 96%, 28% 96%, 12% 62%)", opacity: Math.min(1, shock * 1.5), boxShadow: "inset -2px -3px 0 rgba(255,255,255,0.5)" }} />}
    </div>
  );
};


// ============ SFX BUS: global trim + VOICE-SIDECHAIN DUCK ============
// The VO is the priority. Measured on v25, the SFX bus sat +2.8 dB ABOVE the voice during speech
// (worst moments +14 dB), so the cues were covering the read. SFX_DUCK is a per-frame envelope
// baked from the VO's own energy (instant attack, ~0.2s release, 2-frame lookahead): 1.0 in the
// gaps, down to 0.38 while he is talking. Together with SFX_TRIM this lands the bus about 7.5 dB
// UNDER the voice during speech while keeping the impacts big in the gaps.
const duckMap = duckRaw as number[];
const SFX_TRIM = 0.8;
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number; rel?: number }> = ({ at, src, v = 0.35, dur = 2.2, rel }) => {
  const D = Math.max(6, fr(dur));
  // RELEASE. The old envelope faded over the last 4 frames (0.13s), which chopped the tail off
  // any decaying sound (explosions read as "ending abruptly"). Release is now a real slope:
  // 35% of the cue, capped at `rel` seconds (default 0.42), floored at 3 frames.
  const R = Math.min(Math.max(3, Math.floor(D * 0.35)), fr(rel ?? 0.42));
  const o = Math.min(D - 2, Math.max(2, D - R));
  const start = fr(at);
  return (
    <Sequence from={start} durationInFrames={D}>
      <Audio src={staticFile(`sfx/${src}`)} volume={(f) => {
        const env = interpolate(f, [0, 1, o, D - 1], [0, v, v, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const gi = Math.max(0, Math.min(duckMap.length - 1, start + f));   // duck is indexed on the ROOT timeline
        return env * SFX_TRIM * (duckMap[gi] ?? 1);
      }} />
    </Sequence>
  );
};

// ============ SCENE HEADER - designed chapter card, changes per scene ============
// Fixes the floating "NO CODE" slab: a compact HUD-styled header that sits on a
// gradient scrim, changes per scene (adds variety + acts as a mini pattern-interrupt),
// and stays mute-readable (reel-hook-header). frame-0 complete, no fade-in.
const HEADERS: { big: string; badge?: string }[] = [
  { big: "BUILD JARVIS", badge: "PT. 1" }, // S0
  { big: "BUILD JARVIS · THE BRAIN", badge: "PT. 1" }, // S1
  { big: "BUILD JARVIS · THE BRAIN", badge: "PT. 1" }, // S2
  { big: "CONNECT · OBSIDIAN", badge: "PT. 1" },       // S3
  { big: "CONNECT · FIREFLIES", badge: "PT. 1" },      // S4
  { big: "CONNECT · GMAIL", badge: "PT. 1" },          // S5
  { big: "THE PART EVERYONE MISSES", badge: "PT. 1" }, // S6
  { big: "NOW IT SOUNDS LIKE YOU", badge: "PT. 1" },   // S7
  { big: "IT KNOWS YOU", badge: "PT. 1" },             // S8
  { big: "IT WRITES LIKE YOU", badge: "PT. 1" },       // S9
  { big: "NEXT · IT GETS HANDS", badge: "PT. 1" },     // S10
  { big: "COMMENT JARVIS", badge: "PT. 1" },           // S11
];
const SceneHeader: React.FC<{ idx: number; lf: number }> = ({ idx, lf }) => {
  const h = HEADERS[idx] || HEADERS[0];
  // enter: quick rise+settle at each scene start (mini pattern-interrupt)
  const p = over(lf, 0, fr(0.34), Easing.out(Easing.back(1.5)));
  const y = (1 - p) * 14;
  // length-responsive font so long headers ("THE PART EVERYONE MISSES") never overflow/clip the panel edges.
  // budget ~860px for the text (leaving room for the badge + side margins inside the 1012 panel).
  const budget = 860 - (h.badge ? 150 : 0);
  const hfs = Math.max(34, Math.min(62, Math.floor(budget / (h.big.length * 0.60))));
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top: 426, zIndex: 135, textAlign: "center", opacity: p, transform: `translateY(${y}px)` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: -14, height: 120, borderRadius: "26px 26px 0 0", background: "linear-gradient(180deg, rgba(9,13,20,0.72) 0%, rgba(9,13,20,0.30) 62%, transparent 100%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 14, maxWidth: "100%" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: hfs, lineHeight: 1.0, letterSpacing: "-0.01em", color: "#F4EEDF", textShadow: "0 3px 14px rgba(0,0,0,0.75)", whiteSpace: "nowrap" }}>{h.big}</span>
        {h.badge && <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: 1.5, color: "#0B1018", background: `linear-gradient(180deg, ${IRONG}, #C5883A)`, border: "2px solid #FFF0C8", borderRadius: 10, padding: "5px 11px", boxShadow: `0 0 16px ${IRONG}99`, whiteSpace: "nowrap", transform: `rotate(-3deg) scale(${0.9 + 0.1 * Math.abs(Math.sin(lf / 7))})` }}>{h.badge}</span>}
      </div>
      <div style={{ margin: "8px auto 0", width: `${64 * p}%`, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${HUD} 20%, ${IRONG} 80%, transparent)`, boxShadow: `0 0 12px ${HUD}88` }} />
    </div>
  );
};

// ================= TOOL CARD (real company-logo card, appears when a tool is named) =================
const TOOLS: { [k: string]: { logo: string; tag: string; accent: string } } = {
  Obsidian: { logo: "logos/obsidian_real.png", tag: "your whole vault", accent: "#A88BFF" },
  Fireflies: { logo: "logos/fireflies_real.png", tag: "every meeting, transcribed", accent: "#7C5CFF" },
  Gmail: { logo: "logos/gmail.svg", tag: "your sent folder", accent: "#EA4335" },
};
const ToolCard: React.FC<{ lf: number; at: number; name: string }> = ({ lf, at, name }) => {
  const t = TOOLS[name];
  if (!t) return null;
  const p = over(lf, at, 8, Easing.out(Easing.back(1.4)));
  // EXIT: a fast ease-IN over 6 frames plus a lift, so the card never dwells at 30-50% opacity
  // looking like a rendering fault (it used to dissolve in place over 12 frames).
  const out = over(lf, at + 52, 6, Easing.in(Easing.cubic));
  const vis = p * (1 - out);
  if (vis < 0.01) return null;
  const scan = over(lf, at + 4, 14);
  return (
    <div style={{ position: "absolute", left: 306, top: 154, width: 400, opacity: vis, transform: `translateY(${(1 - p) * -18 - out * 30}px) scale(${0.95 + 0.05 * p})`, zIndex: 134 }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderRadius: 18, background: "linear-gradient(160deg, rgba(16,26,40,0.97), rgba(9,14,22,0.97))", border: `2px solid ${t.accent}`, boxShadow: `0 18px 42px -12px rgba(0,0,0,0.7), 0 0 24px ${t.accent}55`, overflow: "hidden" }}>
        <div style={{ width: 66, height: 66, borderRadius: 16, background: "#F5F2EC", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.45)", flex: "0 0 auto" }}>
          <Img src={staticFile(t.logo)} style={{ width: 46, height: 46, objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#F4EEDF", lineHeight: 1 }}>{name}</div>
          <div style={{ fontFamily: mono, fontSize: 17, color: "rgba(200,220,240,0.72)", marginTop: 5 }}>{t.tag}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: "rgba(63,158,116,0.20)", border: "1.5px solid #3F9E74", flex: "0 0 auto" }}>
          <span style={{ color: "#7BE0AE", fontSize: 17, fontWeight: 900 }}>{"\u2713"}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "#9FE9C4", letterSpacing: 1 }}>LINKED</span>
        </div>
        {scan < 1 && <div style={{ position: "absolute", left: `${scan * 118 - 18}%`, top: 0, bottom: 0, width: 70, background: `linear-gradient(90deg, transparent, ${t.accent}55, transparent)` }} />}
      </div>
    </div>
  );
};

// ================= CANONICAL IRON CLAUDE HELMET (ONE definition, kills drift) =================
// Every scene renders THIS. glow 0..1 drives the eye/HUD brightness (the memory-fill read).
// Crimson shell + gold faceplate, angular HUD eye-slits, jaw vents, forehead ridge, warm key / cool rim.
const IronHelmet: React.FC<{ lf: number; glow: number; size?: number; left: number; top: number; z?: number; look?: number; tiltDeg?: number }> = ({ lf, glow, size = 300, left, top, z = 20, look = 0, tiltDeg = 0 }) => {
  const g = Math.max(0, Math.min(1, glow));
  const blink = (lf % 96) < 4 && g > 0.1 ? 0.2 : 1;
  const eyeA = (0.12 + g * 0.88) * blink;
  const scan = (lf % 60) / 60; // faint HUD scanline sweep in the eyes
  const W = 200, H = 244;
  const gx = look * 5;
  return (
    <div style={{ position: "absolute", left, top, width: size, height: size * (H / W), zIndex: z, transform: `rotate(${tiltDeg}deg)`, transformOrigin: "50% 60%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`shell${size}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#C24339" /><stop offset="55%" stopColor="#9E2E27" /><stop offset="100%" stopColor="#6E1E1A" />
          </linearGradient>
          <linearGradient id={`face${size}`} x1="0.2" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#F1CE7A" /><stop offset="48%" stopColor="#E0AC45" /><stop offset="100%" stopColor="#B07E28" />
          </linearGradient>
          <radialGradient id={`eye${size}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#EAFBFF" /><stop offset="55%" stopColor="#7FE8FF" /><stop offset="100%" stopColor="#2FA8D6" />
          </radialGradient>
        </defs>
        {/* halo bloom = the mute progress read */}
        <ellipse cx={W/2} cy={116} rx={128} ry={140} fill="#7FE8FF" opacity={0.16 * g} style={{ filter: "blur(14px)" }} />
        {/* crimson outer shell */}
        <path d="M100,6 C150,6 186,40 192,96 L196,150 C196,186 176,214 150,232 C134,242 116,246 100,246 C84,246 66,242 50,232 C24,214 4,186 4,150 L8,96 C14,40 50,6 100,6 Z" fill={`url(#shell${size})`} stroke="#5A1815" strokeWidth={2} />
        {/* cool rim light (left) + warm key (right) for depth */}
        <path d="M100,6 C60,6 22,36 12,92 L8,150 C8,182 24,208 46,226" fill="none" stroke="rgba(150,200,255,0.5)" strokeWidth={4} strokeLinecap="round" />
        <path d="M192,96 L196,150 C196,182 178,208 154,226" fill="none" stroke="rgba(255,210,150,0.55)" strokeWidth={5} strokeLinecap="round" />
        {/* gold faceplate */}
        <path d="M100,54 C138,54 160,74 164,108 L162,150 C160,182 140,206 100,222 C60,206 40,182 38,150 L36,108 C40,74 62,54 100,54 Z" fill={`url(#face${size})`} stroke="#8A5F18" strokeWidth={1.5} />
        {/* forehead ridge */}
        <path d="M100,30 L100,60" stroke="#7A211C" strokeWidth={5} strokeLinecap="round" />
        <path d="M100,58 L100,86" stroke="#A9781F" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        {/* HUD eye slits (angular) */}
        <g transform={`translate(${gx},0)`}>
          <path d="M52,118 L92,110 L96,128 L56,138 Z" fill={`url(#eye${size})`} opacity={eyeA} />
          <path d="M148,118 L108,110 L104,128 L144,138 Z" fill={`url(#eye${size})`} opacity={eyeA} />
          {/* scanline glint */}
          <rect x={54} y={112 + scan * 20} width={40} height={2} fill="#EAFBFF" opacity={eyeA * 0.5} />
          <rect x={108} y={112 + scan * 20} width={38} height={2} fill="#EAFBFF" opacity={eyeA * 0.5} />
        </g>
        {/* eye outer glow */}
        <ellipse cx={74} cy={124} rx={30} ry={16} fill="#7FE8FF" opacity={0.28 * g} style={{ filter: "blur(7px)" }} />
        <ellipse cx={126} cy={124} rx={30} ry={16} fill="#7FE8FF" opacity={0.28 * g} style={{ filter: "blur(7px)" }} />
        {/* jaw vents */}
        <g stroke="#7A5417" strokeWidth={3} strokeLinecap="round">
          {[84, 92, 100, 108, 116].map((x, i) => <line key={i} x1={x} y1={168} x2={x} y2={190} />)}
        </g>
        <path d="M78,164 L122,164 L118,194 L82,194 Z" fill="none" stroke="#8A5F18" strokeWidth={1.5} />
      </svg>
    </div>
  );
};


// ================= CHARACTER: IRON CLAUDE (full-armor hero) =================
const IronClaude: React.FC<{ lf: number; size?: number; left: number; top: number; pose?: string; core?: number; flip?: number; z?: number }> = ({ lf, size = 300, left, top, pose = "idle", core = 1, flip = 1, z = 30 }) => {
  const W = 240, H = 400;
  const t = lf;
  const g = Math.max(0, Math.min(1, core));
  const pulse = 0.5 + 0.5 * Math.sin(t / 9);
  const spin = t * 1.6;
  const breath = 1 + Math.sin(t / 16) * 0.02;
  const idleBob = Math.sin(t / 18) * 4;
  const hover = Math.sin(t / 20) * 3;

  // ---- pose table (comic action, not tiny nudges) ----
  type PoseCfg = { lean: number; dy: number; cr: number; la: number; ra: number; laFlame: number; raFlame: number; boots: number; beam: number; still?: boolean; wind?: boolean; charge?: boolean; victory?: boolean };
  const poses: { [k: string]: PoseCfg } = {
    idle:    { lean: 0,   dy: idleBob,       cr: 0, la: -12, ra: 12,  laFlame: 0, raFlame: 0, boots: 0, beam: 0 },
    fly:     { lean: 26,  dy: hover,         cr: 0, la: 205, ra: 205, laFlame: 1, raFlame: 1, boots: 1, beam: 0 },
    blast:   { lean: 7,   dy: idleBob * 0.5, cr: 0, la: -42, ra: 92,  laFlame: 0, raFlame: 0, boots: 0, beam: 1, still: true },
    punch:   { lean: 16,  dy: 0,             cr: 0, la: -50, ra: 90,  laFlame: 0, raFlame: 0, boots: 0, beam: 0, wind: true },
    charge:  { lean: 0,   dy: 6,             cr: 1, la: -60, ra: 60,  laFlame: 0, raFlame: 0, boots: 0, beam: 0, charge: true },
    victory: { lean: 0,   dy: idleBob,       cr: 0, la: -150, ra: 150, laFlame: 0, raFlame: 0, boots: 0, beam: 0, victory: true },
    point:   { lean: 0,   dy: idleBob,       cr: 0, la: -14, ra: 80,  laFlame: 0, raFlame: 0, boots: 0, beam: 0 },
  };
  const P = poses[pose] || poses.idle;

  // arc-reactor + eye brightness
  let reactor = g;
  if (P.charge) reactor = Math.max(0, Math.min(1, g * (0.55 + 0.6 * pulse) + 0.15));
  if (P.victory) reactor = Math.max(g, 0.8 + 0.2 * pulse);
  const blink = (t % 96) < 4 && reactor > 0.1 ? 0.2 : 1;
  const eyeA = (0.12 + reactor * 0.88) * blink;
  const scan = (t % 60) / 60;
  const gx = Math.sin(t / 30) * 0.3 * 5;
  const headTilt = Math.sin(t / 22) * 2;
  const cr = P.cr;

  const SHELL = `url(#icShell${size})`;
  const SHELLD = `url(#icShellD${size})`;
  const FACE = `url(#icFace${size})`;
  const STROKE = "#54120F";        // crimson outline (darker tone, not pure black)
  const GSTROKE = "#7A5214";       // gold outline
  const RIM = "rgba(150,200,255,0.55)";   // cool rim light (left)
  const KEY = "rgba(255,214,150,0.6)";    // warm key light (right)

  // ---- reusable rivet (metal bolt with tiny specular) ----
  const rivet = (x: number, y: number, r: number) => (
    <g>
      <circle cx={x} cy={y} r={r} fill="#7A211C" stroke={STROKE} strokeWidth={1} />
      <circle cx={x - r * 0.32} cy={y - r * 0.32} r={r * 0.4} fill="#F7D9A2" opacity={0.75} />
    </g>
  );
  const goldRivet = (x: number, y: number, r: number) => (
    <g>
      <circle cx={x} cy={y} r={r} fill="#B07E28" stroke={GSTROKE} strokeWidth={1} />
      <circle cx={x - r * 0.32} cy={y - r * 0.32} r={r * 0.4} fill="#FFF0C9" opacity={0.85} />
    </g>
  );

  // ---- flame jet (draws pointing +y from local origin) ----
  const jet = (len: number, wid: number, key: number) => {
    const f = 1 + Math.sin(t / 2.3 + key) * 0.18 + (seed(Math.floor(t / 2) + key) - 0.5) * 0.24;
    const L = Math.max(8, len * f);
    return (
      <g>
        <path d={`M ${-wid * 1.25} 0 Q 0 ${L * 1.35} ${wid * 1.25} 0 Q 0 ${L * 0.3} ${-wid * 1.25} 0 Z`} fill="#4FC8F0" opacity={0.42} style={{ filter: "blur(3px)" }} />
        <path d={`M ${-wid} 0 Q 0 ${L * 1.25} ${wid} 0 Q 0 ${L * 0.3} ${-wid} 0 Z`} fill="#7FE8FF" opacity={0.55} style={{ filter: "blur(1px)" }} />
        <path d={`M ${-wid * 0.6} 0 Q 0 ${L} ${wid * 0.6} 0 Z`} fill="#BFF6FF" opacity={0.9} />
        <path d={`M ${-wid * 0.3} 0 Q 0 ${L * 0.7} ${wid * 0.3} 0 Z`} fill="#FFFFFF" opacity={0.95} />
      </g>
    );
  };

  // ---- one arm: crimson upper, gold gauntlet forearm, gold fist ----
  const arm = (side: number, rot: number, o: { flame?: number; beam?: number; fist?: number; len?: number; still?: boolean; wind?: boolean }) => {
    const px = 120 + side * 42, py = 200;
    const sway = o.still ? 0 : Math.sin(t / 17 + (side < 0 ? 0 : 1.6)) * 3;
    const R = rot + sway + (o.wind ? Math.sin(t / 6) * 7 : 0);
    const len = o.len ?? 1;
    const fistR = o.fist ?? 16;
    return (
      <g transform={`translate(${px},${py})`}>
        {/* deltoid cap blends the joint under the pauldron */}
        <circle cx={0} cy={0} r={18} fill={SHELLD} stroke={STROKE} strokeWidth={2} />
        <ellipse cx={-5} cy={-5} rx={9} ry={6} fill="#D8564A" opacity={0.5} />
        <g transform={`rotate(${R})`}>
          {/* upper arm (crimson) with AO seam + specular edge */}
          <rect x={-14} y={-6} width={28} height={54} rx={13} fill={SHELL} stroke={STROKE} strokeWidth={2} />
          <rect x={-14} y={-6} width={7} height={54} rx={5} fill={RIM} opacity={0.45} />
          <rect x={9} y={-6} width={5} height={54} rx={4} fill="#3D0D0B" opacity={0.35} />
          <rect x={-14} y={38} width={28} height={7} rx={3} fill="#3D0D0B" opacity={0.4} />
          <g transform={`translate(0,46) scale(1,${len})`}>
            {/* forearm gauntlet (gold) */}
            <rect x={-15} y={0} width={30} height={46} rx={12} fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
            <rect x={-15} y={0} width={6} height={46} rx={4} fill="#FFF0C9" opacity={0.5} />
            <rect x={-15} y={20} width={30} height={6} fill="#7A5214" opacity={0.55} />
            <rect x={-13} y={4} width={4} height={34} rx={2} fill="#F7E3AE" opacity={0.55} />
            {goldRivet(-9, 9, 1.8)}
            {goldRivet(9, 9, 1.8)}
            {goldRivet(-9, 40, 1.8)}
            {goldRivet(9, 40, 1.8)}
            {/* fist */}
            <g transform="translate(0,54)">
              {o.beam ? (
                <g>
                  <path d={`M -14 0 Q 0 ${132 + Math.sin(t / 3) * 14} 14 0 Z`} fill={`url(#icJet${size})`} opacity={0.55} style={{ filter: "blur(4px)" }} />
                  <path d={`M -11 0 Q 0 ${120 + Math.sin(t / 3) * 14} 11 0 Z`} fill={`url(#icJet${size})`} opacity={0.9} style={{ filter: "blur(1px)" }} />
                  <path d={`M -4 0 L 0 152 L 4 0 Z`} fill="#EAFDFF" opacity={0.92} />
                </g>
              ) : null}
              <circle cx={0} cy={0} r={fistR} fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
              <ellipse cx={-fistR * 0.3} cy={-fistR * 0.35} rx={fistR * 0.5} ry={fistR * 0.35} fill="#FFF0C9" opacity={0.5} />
              <g stroke={GSTROKE} strokeWidth={1.4}>
                <line x1={-9} y1={-6} x2={-9} y2={6} /><line x1={-3} y1={-8} x2={-3} y2={8} />
                <line x1={3} y1={-8} x2={3} y2={8} /><line x1={9} y1={-6} x2={9} y2={6} />
              </g>
              {/* repulsor lens in palm */}
              {o.beam ? (
                <g>
                  <circle cx={0} cy={0} r={11} fill="#0E2A33" stroke="#9C6A24" strokeWidth={1.5} />
                  <circle cx={0} cy={0} r={9} fill={`url(#icReact${size})`} opacity={0.5 + 0.5 * pulse} />
                  <circle cx={0} cy={0} r={4} fill="#EAFDFF" opacity={0.7 + 0.3 * pulse} />
                </g>
              ) : null}
              {o.flame ? jet(48, 15, side * 3 + 1) : null}
            </g>
          </g>
        </g>
      </g>
    );
  };

  // ---- one leg: crimson thigh, gold greave + boot ----
  const leg = (side: number) => {
    const hx = 120 + side * 20;
    const kx = 120 + side * (20 + cr * 12);
    const bx = 120 + side * (22 + cr * 14);
    return (
      <g>
        {/* thigh (crimson) */}
        <path d={`M ${hx - 17} 288 L ${hx + 17} 288 L ${kx + 16} 336 L ${kx - 16} 336 Z`} fill={SHELL} stroke={STROKE} strokeWidth={2} />
        <path d={`M ${hx - 17} 288 L ${hx - 11} 288 L ${kx - 10} 336 L ${kx - 16} 336 Z`} fill={side < 0 ? RIM : "#3D0D0B"} opacity={side < 0 ? 0.4 : 0.3} />
        <path d={`M ${hx + 11} 288 L ${hx + 17} 288 L ${kx + 16} 336 L ${kx + 10} 336 Z`} fill={side < 0 ? "#3D0D0B" : KEY} opacity={side < 0 ? 0.3 : 0.4} />
        {/* knee joint */}
        <circle cx={kx} cy={335} r={9} fill={SHELLD} stroke={STROKE} strokeWidth={1.6} />
        {goldRivet(kx, 335, 2.4)}
        {/* greave (gold) */}
        <path d={`M ${kx - 16} 334 L ${kx + 16} 334 L ${bx + 15} 380 L ${bx - 15} 380 Z`} fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
        <line x1={kx - 8} y1={338} x2={bx - 8} y2={376} stroke="#FFF0C9" strokeWidth={2.4} opacity={0.5} />
        <line x1={kx} y1={340} x2={bx} y2={376} stroke="#7A5214" strokeWidth={2.4} opacity={0.5} />
        {/* boot (gold, toe forward) */}
        <path d={`M ${bx - 16} 372 L ${bx + 16} 372 L ${bx + 24} 392 Q ${bx + 26} 398 ${bx + 18} 398 L ${bx - 18} 398 Q ${bx - 18} 380 ${bx - 16} 372 Z`} fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
        <path d={`M ${bx - 16} 372 L ${bx + 16} 372 L ${bx + 14} 378 L ${bx - 14} 378 Z`} fill="#FFF0C9" opacity={0.5} />
        <path d={`M ${bx - 12} 384 L ${bx + 18} 384`} stroke="#7A5214" strokeWidth={2} opacity={0.6} />
        {goldRivet(bx - 10, 388, 1.8)}
        {goldRivet(bx + 6, 388, 1.8)}
      </g>
    );
  };

  // ---- canonical helmet head (crimson shell + gold faceplate + cyan HUD slits) ----
  const head = (
    <g style={{ transformOrigin: "120px 150px", transform: `rotate(${headTilt}deg)` }}>
      <g transform="translate(78,92) scale(0.42)">
        <ellipse cx={100} cy={116} rx={128} ry={140} fill="#7FE8FF" opacity={0.16 * reactor} style={{ filter: "blur(14px)" }} />
        {/* crimson helmet shell */}
        <path d="M100,6 C150,6 186,40 192,96 L196,150 C196,186 176,214 150,232 C134,242 116,246 100,246 C84,246 66,242 50,232 C24,214 4,186 4,150 L8,96 C14,40 50,6 100,6 Z" fill={SHELL} stroke={STROKE} strokeWidth={2.5} />
        {/* AO under jaw + inner shell shade */}
        <path d="M100,246 C84,246 66,242 50,232 C34,222 20,206 12,188 C40,214 70,224 100,224 C130,224 160,214 188,188 C180,206 166,222 150,232 C134,242 116,246 100,246 Z" fill="#3D0D0B" opacity={0.4} />
        {/* cool rim (left) + warm key (right) */}
        <path d="M100,6 C60,6 22,36 12,92 L8,150 C8,182 24,208 46,226" fill="none" stroke={RIM} strokeWidth={5} strokeLinecap="round" />
        <path d="M192,96 L196,150 C196,182 178,208 154,226" fill="none" stroke={KEY} strokeWidth={6} strokeLinecap="round" />
        {/* broad crown specular */}
        <path d="M60,40 Q100,18 150,44" fill="none" stroke="#F0897E" strokeWidth={7} strokeLinecap="round" opacity={0.55} />
        {/* gold faceplate */}
        <path d="M100,54 C138,54 160,74 164,108 L162,150 C160,182 140,206 100,222 C60,206 40,182 38,150 L36,108 C40,74 62,54 100,54 Z" fill={FACE} stroke={GSTROKE} strokeWidth={2} />
        <path d="M100,54 C82,54 68,62 58,80 Q100,66 142,80 C132,62 118,54 100,54 Z" fill="#FFF0C9" opacity={0.45} />
        <path d="M40,150 C42,180 60,202 100,220 C88,214 74,202 66,182 C58,166 54,152 52,132 Z" fill="#7A5214" opacity={0.35} />
        {/* central brow ridge */}
        <path d="M100,30 L100,60" stroke="#7A211C" strokeWidth={5} strokeLinecap="round" />
        <path d="M100,58 L100,86" stroke="#A9781F" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        {/* HUD eyes */}
        <g transform={`translate(${gx},0)`}>
          <path d="M52,118 L92,110 L96,128 L56,138 Z" fill={`url(#icEye${size})`} opacity={eyeA} />
          <path d="M148,118 L108,110 L104,128 L144,138 Z" fill={`url(#icEye${size})`} opacity={eyeA} />
          <rect x={54} y={112 + scan * 20} width={40} height={2} fill="#EAFBFF" opacity={eyeA * 0.5} />
          <rect x={108} y={112 + scan * 20} width={38} height={2} fill="#EAFBFF" opacity={eyeA * 0.5} />
        </g>
        <ellipse cx={74} cy={124} rx={30} ry={16} fill="#7FE8FF" opacity={0.3 * reactor} style={{ filter: "blur(7px)" }} />
        <ellipse cx={126} cy={124} rx={30} ry={16} fill="#7FE8FF" opacity={0.3 * reactor} style={{ filter: "blur(7px)" }} />
        {/* faceplate seam + mouth grille */}
        <g stroke="#7A5417" strokeWidth={3} strokeLinecap="round">
          {[84, 92, 100, 108, 116].map((x, i) => <line key={i} x1={x} y1={168} x2={x} y2={190} />)}
        </g>
        <path d="M78,164 L122,164 L118,194 L82,194 Z" fill="none" stroke={GSTROKE} strokeWidth={1.6} />
        {/* cheek plate seams + rivets */}
        <path d="M50,120 Q44,150 60,190" fill="none" stroke="#7A5214" strokeWidth={2} opacity={0.5} />
        <path d="M150,120 Q156,150 140,190" fill="none" stroke="#7A5214" strokeWidth={2} opacity={0.5} />
        {goldRivet(58, 96, 3)}
        {goldRivet(142, 96, 3)}
      </g>
    </g>
  );

  return (
    <div style={{ position: "absolute", left, top, width: size * (W / H), height: size, zIndex: z }}>
      <div style={{ width: "100%", height: "100%", transform: `scaleX(${flip})`, transformOrigin: "50% 50%" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id={`icShell${size}`} x1="0.15" y1="0" x2="0.55" y2="1">
              <stop offset="0%" stopColor="#E4574A" /><stop offset="30%" stopColor="#C24339" /><stop offset="62%" stopColor="#9E2E27" /><stop offset="100%" stopColor="#651A16" />
            </linearGradient>
            <linearGradient id={`icShellD${size}`} x1="0.2" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#A2312A" /><stop offset="100%" stopColor="#4E1512" />
            </linearGradient>
            <linearGradient id={`icFace${size}`} x1="0.2" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#FBE4A6" /><stop offset="35%" stopColor="#EEC463" /><stop offset="66%" stopColor="#D9A63E" /><stop offset="100%" stopColor="#A9761F" />
            </linearGradient>
            <radialGradient id={`icEye${size}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" /><stop offset="40%" stopColor="#EAFBFF" /><stop offset="72%" stopColor="#7FE8FF" /><stop offset="100%" stopColor="#2FA8D6" />
            </radialGradient>
            <radialGradient id={`icReact${size}`} cx="50%" cy="45%" r="58%">
              <stop offset="0%" stopColor="#FFFFFF" /><stop offset="28%" stopColor="#EAFDFF" /><stop offset="60%" stopColor="#8FEEFF" /><stop offset="100%" stopColor="#2FA8D6" />
            </radialGradient>
            <linearGradient id={`icJet${size}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAFDFF" /><stop offset="40%" stopColor="#7FE8FF" /><stop offset="100%" stopColor="#2FA8D6" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`icGround${size}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.34" /><stop offset="70%" stopColor="#000000" stopOpacity="0.16" /><stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* soft grounding shadow (radial, feathered) */}
          <ellipse cx={120} cy={396} rx={84 - cr * 6} ry={15} fill={`url(#icGround${size})`} style={{ filter: "blur(2px)" }} />

          <g style={{ transformOrigin: "120px 300px", transform: `translateY(${P.dy}px) rotate(${P.lean}deg)` }}>
            {/* boot jet flames (fly) */}
            {P.boots ? (
              <g>
                <g transform={`translate(${120 - 22},396)`}>{jet(52, 16, 11)}</g>
                <g transform={`translate(${120 + 22},396)`}>{jet(52, 16, 22)}</g>
              </g>
            ) : null}

            {/* legs */}
            {leg(-1)}
            {leg(1)}

            {/* pelvis / hip plate */}
            <path d="M 92 284 Q 120 276 148 284 L 150 300 Q 120 312 90 300 Z" fill={SHELLD} stroke={STROKE} strokeWidth={2} />
            {goldRivet(100, 292, 2)}
            {goldRivet(140, 292, 2)}

            {/* upper body (crouch drop + breathe) */}
            <g transform={`translate(0,${cr * 12})`}>
              <g style={{ transformOrigin: "120px 236px", transform: `scale(${breath})` }}>
                {/* neck */}
                <rect x={107} y={178} width={26} height={26} rx={7} fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
                <rect x={107} y={178} width={6} height={26} rx={3} fill="#FFF0C9" opacity={0.45} />
                <rect x={107} y={196} width={26} height={8} rx={3} fill="#7A5214" opacity={0.4} />

                {/* torso chest-plate (crimson) */}
                <path d="M 82 194 Q 120 182 158 194 L 156 252 Q 120 268 84 252 Z" fill={SHELL} stroke={STROKE} strokeWidth={2.5} />
                {/* broad top specular */}
                <path d="M 92 192 Q 120 184 148 192" fill="none" stroke="#F0897E" strokeWidth={5} strokeLinecap="round" opacity={0.5} />
                {/* AO under chest */}
                <path d="M 86 246 Q 120 262 154 246 L 152 252 Q 120 268 88 252 Z" fill="#3D0D0B" opacity={0.4} />
                {/* pectoral seam + split lights */}
                <path d="M 120 190 L 120 250" stroke="#7A211C" strokeWidth={3} opacity={0.6} />
                <path d="M 90 198 Q 88 226 96 250" fill="none" stroke={RIM} strokeWidth={4} strokeLinecap="round" />
                <path d="M 150 198 Q 152 226 144 250" fill="none" stroke={KEY} strokeWidth={4} strokeLinecap="round" />
                {/* upper-pec panel seams + rivets */}
                <path d="M 96 200 Q 108 196 118 202" fill="none" stroke="#7A211C" strokeWidth={1.6} opacity={0.5} />
                <path d="M 144 200 Q 132 196 122 202" fill="none" stroke="#7A211C" strokeWidth={1.6} opacity={0.5} />
                {rivet(92, 208, 2)}
                {rivet(148, 208, 2)}

                {/* ab segments (gold) */}
                <path d="M 90 256 Q 120 268 150 256 L 147 292 Q 120 302 93 292 Z" fill={FACE} stroke={GSTROKE} strokeWidth={1.6} />
                <path d="M 92 258 Q 120 268 148 258 L 147 264 Q 120 274 93 264 Z" fill="#FFF0C9" opacity={0.4} />
                <g stroke="#7A5214" strokeWidth={1.6} opacity={0.7}>
                  <line x1={120} y1={258} x2={120} y2={296} />
                  <line x1={98} y1={272} x2={142} y2={272} />
                  <line x1={100} y1={286} x2={140} y2={286} />
                </g>

                {/* ================= ARC REACTOR ================= */}
                <g>
                  {/* outer bloom (core-driven) */}
                  <circle cx={120} cy={224} r={40} fill="#7FE8FF" opacity={0.26 * reactor} style={{ filter: "blur(11px)" }} />
                  {/* gold housing bezel with AO ring */}
                  <circle cx={120} cy={224} r={24} fill="#0C242C" stroke="#C9922E" strokeWidth={4} />
                  <circle cx={120} cy={224} r={24} fill="none" stroke="#3D0D0B" strokeWidth={1.5} opacity={0.5} />
                  <circle cx={120} cy={224} r={20} fill="#0E2A33" stroke="#7A5214" strokeWidth={1.5} />
                  {/* concentric coil segments (slow spin) */}
                  <g opacity={0.55 + 0.35 * reactor}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                      const a = (i / 8) * Math.PI * 2 + spin * 0.02;
                      return <line key={i} x1={120 + Math.cos(a) * 9} y1={224 + Math.sin(a) * 9} x2={120 + Math.cos(a) * 17} y2={224 + Math.sin(a) * 17} stroke="#2FA8D6" strokeWidth={2.2} strokeLinecap="round" />;
                    })}
                  </g>
                  {/* cyan concentric ring */}
                  <circle cx={120} cy={224} r={14} fill="none" stroke="#4FC8F0" strokeWidth={2} opacity={0.4 + 0.5 * reactor} />
                  {/* inner white-hot core */}
                  <circle cx={120} cy={224} r={12} fill={`url(#icReact${size})`} opacity={0.35 + 0.65 * reactor} />
                  <circle cx={120} cy={224} r={5} fill="#FFFFFF" opacity={0.5 + 0.5 * reactor} />
                  {/* lens flare (cross streaks, core-driven) */}
                  <g opacity={(0.35 + 0.55 * pulse) * reactor}>
                    <rect x={120 - 44} y={223} width={88} height={2} fill="#EAFDFF" style={{ filter: "blur(1px)" }} />
                    <rect x={119} y={224 - 40} width={2} height={80} fill="#EAFDFF" style={{ filter: "blur(1px)" }} />
                    <circle cx={120} cy={224} r={3} fill="#FFFFFF" />
                  </g>
                  {P.charge ? <circle cx={120} cy={224} r={26 + pulse * 12} fill="none" stroke="#7FE8FF" strokeWidth={2} opacity={0.45 * reactor * (1 - pulse)} /> : null}
                </g>

                {/* pauldrons (crimson shoulder domes) with overlap AO + specular */}
                <ellipse cx={78} cy={196} rx={28} ry={24} fill={SHELL} stroke={STROKE} strokeWidth={2.5} />
                <ellipse cx={162} cy={196} rx={28} ry={24} fill={SHELL} stroke={STROKE} strokeWidth={2.5} />
                {/* overlap shadow where pauldron meets chest */}
                <path d="M 96 188 Q 100 210 96 224" fill="none" stroke="#3D0D0B" strokeWidth={5} opacity={0.35} style={{ filter: "blur(1px)" }} />
                <path d="M 144 188 Q 140 210 144 224" fill="none" stroke="#3D0D0B" strokeWidth={5} opacity={0.35} style={{ filter: "blur(1px)" }} />
                <ellipse cx={70} cy={188} rx={13} ry={8} fill="#F0897E" opacity={0.5} />
                <ellipse cx={170} cy={188} rx={13} ry={8} fill="#E4574A" opacity={0.4} />
                <path d="M 56 194 Q 78 178 100 192" fill="none" stroke="#F7E3AE" strokeWidth={3} opacity={0.6} />
                <path d="M 140 192 Q 162 178 184 194" fill="none" stroke="#F7E3AE" strokeWidth={3} opacity={0.6} />
                {rivet(66, 200, 2)}
                {rivet(90, 200, 2)}
                {rivet(150, 200, 2)}
                {rivet(174, 200, 2)}

                {/* arms (over pauldrons, under head) */}
                {arm(-1, P.la, { flame: P.laFlame, fist: pose === "charge" ? 18 : 16 })}
                {arm(1, P.ra, { flame: P.raFlame, beam: P.beam, wind: P.wind, still: P.still, fist: pose === "punch" ? 26 : pose === "charge" ? 18 : 16, len: pose === "punch" ? 1.12 : 1 })}

                {/* head */}
                {head}
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

// ================= CHARACTER: GENERIC-9000 (villain droid) =================
// ================= THE VILLAIN: GENERIC-9000 (soulless corporate AI droid) =================
// Cold gunmetal + sickly institutional teal. Boxy, hovering, characterless. The ENEMY of the
// warm crimson IRON CLAUDE. menace 0..1 = threat/lit (0 = powered down/defeated). Never static.
const Generic9000: React.FC<{ lf: number; size?: number; left: number; top: number; pose?: string; menace?: number; flip?: number; z?: number }> = ({ lf, size = 300, left, top, pose = "loom", menace = 1, flip = 1, z = 28 }) => {
  const W = 280, H = 440;
  const m = Math.max(0, Math.min(1, menace));
  const lit = m;
  const attack = pose === "attack", stagger = pose === "stagger", shatter = pose === "shatter", mock = pose === "mock";

  // --- continuous menacing hover / idle so it is NEVER a static statue ---
  const bob = Math.sin(lf / 16) * 4.4 + Math.sin(lf / 8.5 + 1) * 1.4;
  const sway = Math.sin(lf / 26) * 1.7;
  const breathe = Math.sin(lf / 21) * 0.7;                 // shoulder actuator idle
  const headScan = Math.sin(lf / 33) * 2.4;                // slow menacing head pan

  // --- pose drivers ---
  const brk = shatter ? interpolate(lf, [0, fr(0.9)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 0;
  const lunge = attack ? interpolate(lf, [0, fr(0.28), fr(0.9)], [0, 1, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 0;
  const knock = stagger ? interpolate(lf, [0, fr(0.22), fr(1.1)], [0, 1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 0;
  const glitch = stagger ? (seed(Math.floor(lf / 2)) - 0.5) * 6 * (1 - knock * 0.3) : 0;

  const bodyRot = sway + (stagger ? -16 * knock : 0) + (attack ? 8 * lunge : 0) + (mock ? -3 : 0);
  const bodyTx = (attack ? 20 * lunge : 0) + (stagger ? -26 * knock : 0) + glitch;
  const bodyScale = 1 + (attack ? 0.055 * lunge : 0) - (shatter ? 0.03 * brk : 0);
  const loomLean = pose === "loom" ? (2.4 + Math.sin(lf / 40) * 1.2) : (attack ? 9 * lunge : 0);   // forward jut of the head/chest
  const headDrop = pose === "loom" ? 2.5 : 0;

  // --- cold, soulless palette (crimson is the HERO; this thing gets none) ---
  const eyeTeal = "#5FEAD6", eyeRed = "#FF4133", coreCyan = "#63E9FF";
  const coldGrey = "#414B52";
  const INK = "#0D1215", INK2 = "#060A0C", SEAM = "#04080A";
  const STEEL = "#8B959B";
  const eyeCol = attack ? eyeRed : (m < 0.15 ? coldGrey : eyeTeal);
  const coreCol = m < 0.15 ? coldGrey : (attack ? "#9CF4FF" : coreCyan);
  const eyeLit = attack ? 1 : (shatter ? (0.4 + 0.6 * Math.abs(Math.sin(lf * 1.3))) * (1 - brk * 0.85) : (0.3 + 0.7 * m));
  const corePulse = 0.5 + 0.5 * Math.sin(lf / 7);
  const coreLit = attack ? 1 : (shatter ? (1 - brk) * (0.28 + 0.5 * corePulse) : (0.24 + 0.76 * m) * (0.72 + 0.28 * corePulse));
  const eyeBloom = attack ? (26 + 10 * lunge) : 15;

  const gid = `g9k${Math.round(size)}`;

  // arm angle presets (deg; 0 = straight down)
  const AP: { [k: string]: { lU: number; lF: number; rU: number; rF: number } } = {
    loom:    { lU: 116, lF: 26,  rU: -116, rF: -26 },   // raised wide, claws out, looming
    attack:  { lU: 56,  lF: 74,  rU: -56,  rF: -74 },   // both claws reaching forward
    stagger: { lU: 14,  lF: -48, rU: -142, rF: 54  },   // asymmetric flail
    mock:    { lU: 142, lF: 88,  rU: -142, rF: -88 },   // crossed over chest core
    shatter: { lU: 62,  lF: 20,  rU: -62,  rF: -20 },
  };
  const ap = AP[pose] || AP.loom;

  // --- segmented gunmetal arm + clawed hand ---
  const arm = (sx: number, sy: number, uDeg: number, fDeg: number, flyDir: number) => (
    <g transform={`translate(${sx + flyDir * 34 * brk},${sy - 12 * brk}) rotate(${uDeg + breathe * (flyDir > 0 ? 1 : -1) + 52 * brk * Math.sign(flyDir)})`} opacity={1 - brk * 0.5}>
      {/* upper arm */}
      <line x1={0} y1={0} x2={0} y2={42} stroke={INK2} strokeWidth={21} strokeLinecap="round" opacity={0.55} />
      <line x1={0} y1={0} x2={0} y2={42} stroke={`url(#${gid}arm)`} strokeWidth={16} strokeLinecap="round" />
      <line x1={-4} y1={5} x2={-4} y2={36} stroke="#B4BDC2" strokeWidth={2} strokeLinecap="round" opacity={0.32} />
      <line x1={-6.5} y1={21} x2={6.5} y2={21} stroke={INK} strokeWidth={1.5} opacity={0.6} />
      {/* shoulder actuator */}
      <circle cx={0} cy={0} r={12} fill={`url(#${gid}ball)`} stroke={INK} strokeWidth={2.2} />
      <circle cx={-3.2} cy={-3.2} r={3} fill="#C7CFD3" opacity={0.5} />
      <circle cx={0} cy={0} r={4} fill={eyeCol} opacity={0.4 * lit} />
      <g transform={`translate(0,42) rotate(${fDeg})`}>
        {/* elbow servo */}
        <circle cx={0} cy={0} r={8.5} fill={`url(#${gid}ball)`} stroke={INK} strokeWidth={2} />
        <circle cx={0} cy={0} r={3} fill={eyeCol} opacity={0.55 * lit} />
        {/* forearm */}
        <line x1={0} y1={0} x2={0} y2={40} stroke={INK2} strokeWidth={17} strokeLinecap="round" opacity={0.55} />
        <line x1={0} y1={0} x2={0} y2={40} stroke={`url(#${gid}arm)`} strokeWidth={13} strokeLinecap="round" />
        <line x1={-3.4} y1={5} x2={-3.4} y2={34} stroke="#B4BDC2" strokeWidth={1.8} strokeLinecap="round" opacity={0.38} />
        <line x1={-5.5} y1={20} x2={5.5} y2={20} stroke={INK} strokeWidth={1.3} opacity={0.6} />
        {/* clawed hand */}
        <g transform="translate(0,40)">
          <path d="M-10,-1 L10,-1 L8,9 L-8,9 Z" fill={`url(#${gid}body)`} stroke={INK} strokeWidth={1.8} />
          <path d="M-10,-1 L10,-1 L9,2 L-9,2 Z" fill="#C0C8CD" opacity={0.28} />
          {/* three inward-curling claws */}
          {[-6.5, 0, 6.5].map((fx, i) => (
            <path key={i} d={`M${fx},8 L${fx * 0.66},20 L${fx * 0.34},29`} fill="none" stroke={`url(#${gid}arm)`} strokeWidth={4.4 - i * 0} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {/* opposed thumb-claw */}
          <path d="M-10,3 L-15,11 L-14,18" fill="none" stroke={`url(#${gid}arm)`} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          {/* claw-tip menace glints */}
          {[-2.2, 0, 2.2].map((fx, i) => <circle key={`ct${i}`} cx={fx} cy={29} r={1.8} fill={eyeCol} opacity={0.55 * lit} />)}
        </g>
      </g>
    </g>
  );

  const rivet = (x: number, y: number, k: number) => (
    <g key={k}>
      <circle cx={x} cy={y} r={2.7} fill={INK2} />
      <circle cx={x} cy={y} r={2.7} fill={`url(#${gid}ball)`} opacity={0.85} />
      <circle cx={x - 0.8} cy={y - 0.9} r={1} fill="#C7CFD3" opacity={0.8} />
    </g>
  );

  const scuff = (x: number, y: number, w: number, r: number, k: number) => (
    <g key={`sc${k}`} transform={`rotate(${r} ${x} ${y})`} opacity={0.5}>
      <line x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} stroke={INK2} strokeWidth={1.7} strokeLinecap="round" />
      <line x1={x - w / 2} y1={y + 1} x2={x + w / 2} y2={y + 1} stroke="#B4BDC2" strokeWidth={0.7} strokeLinecap="round" opacity={0.5} />
    </g>
  );

  // radiating crack lines over the chest core (glow when powered; go dead-dark on shatter)
  const cracks = ["M140,244 L120,214 M140,244 L166,220 M140,244 L112,258 M140,244 L172,256 M140,244 L134,282 M140,244 L156,278"];
  const crackCol = shatter ? "#04090B" : coreCol;

  const statusOn = (lf % 40) < 24 ? 1 : 0.22;
  const sneer = mock ? 7 : 0;
  const cx = 140;

  return (
    <div style={{ position: "absolute", left, top, width: size * (W / H), height: size, zIndex: z }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`${gid}body`} x1="0.1" y1="0" x2="0.44" y2="1">
            <stop offset="0%" stopColor="#B6C0C6" /><stop offset="26%" stopColor="#7E888F" /><stop offset="60%" stopColor="#49535A" /><stop offset="100%" stopColor="#1F262B" />
          </linearGradient>
          <linearGradient id={`${gid}bodyDk`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#3E484F" /><stop offset="100%" stopColor="#161D22" />
          </linearGradient>
          <linearGradient id={`${gid}arm`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#949EA4" /><stop offset="45%" stopColor="#5A646B" /><stop offset="100%" stopColor="#262D32" />
          </linearGradient>
          <radialGradient id={`${gid}ball`} cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#A2ACB2" /><stop offset="55%" stopColor="#556069" /><stop offset="100%" stopColor="#191F24" />
          </radialGradient>
          <linearGradient id={`${gid}spec`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDF3F6" stopOpacity="0.6" /><stop offset="100%" stopColor="#EDF3F6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${gid}ao`} cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" /><stop offset="64%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id={`${gid}rim`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={eyeTeal} stopOpacity="0.55" /><stop offset="42%" stopColor={eyeTeal} stopOpacity="0" /><stop offset="100%" stopColor={eyeTeal} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${gid}core`} cx="50%" cy="46%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" /><stop offset="38%" stopColor={coreCol} /><stop offset="100%" stopColor="#08313A" stopOpacity="0.2" />
          </radialGradient>
          <linearGradient id={`${gid}jet`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={coreCol} stopOpacity={0.7} /><stop offset="100%" stopColor={coreCol} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* faint repulsor shadow + under-glow (it HOVERS, no legs) */}
        <ellipse cx={140} cy={424} rx={(70 - bob * 0.8) * (1 - brk * 0.4)} ry={12} fill="#000" opacity={0.32 * (0.5 + 0.5 * lit)} style={{ filter: "blur(6px)" }} />
        <ellipse cx={140} cy={422} rx={(34 - bob * 0.5) * (1 - brk * 0.4)} ry={6} fill={coreCol} opacity={0.14 * lit} style={{ filter: "blur(5px)" }} />

        {/* ROBOT: pivot(140,220) -> flip -> pose transform */}
        <g transform={`translate(140,${220 + bob}) scale(${flip},1)`}>
          <g transform={`translate(${bodyTx},0) rotate(${bodyRot}) scale(${bodyScale})`}>
            <g transform="translate(-140,-220)">

              {/* ---- twin repulsor thrusters beneath the chassis ---- */}
              {[112, 168].map((jx, i) => { const fl = 0.55 + 0.45 * Math.sin(lf * 0.9 + i * 2); return (
                <g key={`j${i}`} opacity={lit * (1 - brk) * fl}>
                  <rect x={jx - 7} y={338} width={14} height={40} rx={5} fill={`url(#${gid}jet)`} />
                  <ellipse cx={jx} cy={340} rx={10} ry={4.5} fill={coreCol} opacity={0.5} style={{ filter: "blur(3px)" }} />
                  <ellipse cx={jx} cy={340} rx={4.5} ry={2.4} fill="#EAFDFF" opacity={0.6} />
                </g>
              ); })}

              {/* ================= LOWER BODY (tapers to repulsor nub) ================= */}
              <g transform={shatter ? `translate(${-3 * brk},${8 * brk})` : ""}>
                <polygon points="106,300 174,300 164,352 140,368 116,352" fill={`url(#${gid}bodyDk)`} stroke={INK} strokeWidth={2.4} />
                <polygon points="112,304 168,304 164,318 116,318" fill={`url(#${gid}spec)`} opacity={0.4} />
                <line x1={140} y1={306} x2={140} y2={360} stroke={INK} strokeWidth={1.6} opacity={0.6} />
                <ellipse cx={140} cy={362} rx={13} ry={7} fill={`url(#${gid}core)`} opacity={0.8 * coreLit} />
                <ellipse cx={140} cy={362} rx={7} ry={4} fill="#FFFFFF" opacity={0.5 * coreLit} />
              </g>

              {/* ================= HEAVY PAULDRONS ================= */}
              {[-1, 1].map((s) => (
                <g key={`pa${s}`} transform={`translate(140,168) scale(${s},1) translate(-140,0)`}>
                  <path d="M60,4 L104,-6 L110,20 L96,46 L60,42 L52,20 Z" fill={`url(#${gid}body)`} stroke={INK} strokeWidth={2.5} />
                  <path d="M64,2 L100,-5 L104,10 L66,16 Z" fill={`url(#${gid}spec)`} opacity={0.5} />
                  <path d="M60,42 L96,46 L110,20 L104,42 L70,50 Z" fill={`url(#${gid}ao)`} opacity={0.6} />
                  <line x1={62} y1={26} x2={102} y2={22} stroke={INK} strokeWidth={2} opacity={0.7} />
                  {[68, 82, 96].map((vx, i) => <line key={i} x1={vx} y1={32} x2={vx} y2={44} stroke={INK} strokeWidth={2.2} strokeLinecap="round" opacity={0.75} />)}
                  {rivet(64, 8, 0)}{rivet(100, 4, 1)}
                </g>
              ))}

              {/* ================= TORSO (broad, angular, cracked core) ================= */}
              <g transform={shatter ? `translate(${-5 * brk},${5 * brk})` : ""}>
                {/* main plate */}
                <path d="M88,182 L192,182 L200,214 L184,300 L96,300 L80,214 Z" fill={`url(#${gid}body)`} stroke={INK} strokeWidth={2.6} />
                <path d="M88,182 L192,182 L200,214 L184,300 L96,300 L80,214 Z" fill={`url(#${gid}ao)`} />
                <path d="M88,182 L192,182 L200,214 L184,300 L96,300 L80,214 Z" fill={`url(#${gid}rim)`} opacity={0.5 + 0.5 * lit} />
                {/* top bevel specular */}
                <path d="M94,186 L186,186 L190,196 L90,196 Z" fill={`url(#${gid}spec)`} />
                {/* clavicle vents */}
                {[100, 110, 120].map((_, i) => <line key={`cv${i}`} x1={98 + i * 2} y1={196 + i * 5} x2={182 - i * 2} y2={196 + i * 5} stroke={INK} strokeWidth={2.2} strokeLinecap="round" opacity={0.6} />)}
                {/* side abdominal segment seams */}
                <line x1={84} y1={252} x2={196} y2={252} stroke={INK} strokeWidth={2} />
                <line x1={84} y1={251} x2={196} y2={251} stroke={STEEL} strokeWidth={0.7} opacity={0.35} />
                <line x1={90} y1={276} x2={190} y2={276} stroke={INK} strokeWidth={2} />
                {/* flank vents */}
                {[262, 268, 274].map((vy, i) => <line key={`fl${i}`} x1={92} y1={vy} x2={112} y2={vy} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />)}
                {[262, 268, 274].map((vy, i) => <line key={`fr${i}`} x1={168} y1={vy} x2={188} y2={vy} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />)}
                {/* battle-worn scuffs */}
                {scuff(112, 232, 16, -18, 1)}
                {scuff(172, 210, 11, 26, 2)}
                {scuff(96, 286, 10, 10, 3)}
                {scuff(184, 264, 9, -22, 4)}
                {/* rivets */}
                {[[92, 190], [188, 190], [88, 292], [192, 292]].map((p, i) => rivet(p[0], p[1], i))}

                {/* ---- cracked CHEST CORE ---- */}
                <polygon points="116,214 164,214 174,246 140,274 106,246" fill={`url(#${gid}bodyDk)`} stroke={INK} strokeWidth={2.6} />
                <polygon points="120,218 160,218 168,244 140,268 112,244" fill="#050C0F" stroke={SEAM} strokeWidth={1.4} />
                {/* radiating cracks in the plating */}
                <g stroke={crackCol} strokeWidth={2} strokeLinecap="round" opacity={shatter ? 0.9 : (0.35 + 0.4 * coreLit)}>
                  {cracks[0].split("M").filter(Boolean).map((seg, i) => <path key={i} d={`M${seg}`} fill="none" />)}
                </g>
                {/* core bloom + ring + hot center */}
                <circle cx={140} cy={244} r={eyeBloom} fill={coreCol} opacity={0.32 * coreLit} style={{ filter: "blur(9px)" }} />
                <circle cx={140} cy={244} r={16} fill="none" stroke={coreCol} strokeWidth={2.6} opacity={0.85 * coreLit} />
                {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2 + lf * 0.06; return <line key={`ck${i}`} x1={140 + Math.cos(a) * 11} y1={244 + Math.sin(a) * 11} x2={140 + Math.cos(a) * 15} y2={244 + Math.sin(a) * 15} stroke={coreCol} strokeWidth={1.6} opacity={(0.3 + 0.6 * (0.5 + 0.5 * Math.sin(lf / 5 + i))) * coreLit} />; })}
                <circle cx={140} cy={244} r={9} fill={`url(#${gid}core)`} opacity={coreLit} />
                <circle cx={140} cy={244} r={3.6} fill="#FFFFFF" opacity={0.85 * coreLit} />

                {/* maker's plate: the cold irony */}
                <g transform="translate(140,290)">
                  <rect x={-38} y={-9} width={76} height={17} rx={3} fill={`url(#${gid}bodyDk)`} stroke="#4E575D" strokeWidth={1} />
                  <rect x={-38} y={-9} width={76} height={4} rx={2} fill={`url(#${gid}spec)`} opacity={0.5} />
                  <g transform={`scale(${flip},1)`}>
                    <text x={0} y={4} textAnchor="middle" fontFamily="monospace" fontSize={8.5} fontWeight={700} letterSpacing="0.5" fill="#9AA4A9">GENERIC-9000</text>
                  </g>
                </g>
              </g>

              {/* segmented clawed arms (in front of torso) */}
              {arm(96, 172, ap.lU, ap.lF, -50)}
              {arm(184, 172, ap.rU, ap.rF, 50)}

              {/* ================= EXPOSED MECHANICAL NECK / SPINE ================= */}
              <g transform={shatter ? `translate(${-3 * brk},${-22 * brk})` : ""} opacity={1 - brk * 0.5}>
                {[0, 1, 2].map((i) => (
                  <g key={`sp${i}`}>
                    <rect x={128} y={150 + i * 10} width={24} height={9} rx={2.5} fill={`url(#${gid}bodyDk)`} stroke={INK} strokeWidth={1.8} />
                    <rect x={131} y={151 + i * 10} width={18} height={2.4} rx={1} fill={STEEL} opacity={0.35} />
                  </g>
                ))}
                <circle cx={140} cy={150} r={5} fill={`url(#${gid}ball)`} stroke={INK} strokeWidth={1.6} />
                {/* neck cabling */}
                <path d="M126,178 q-4,-14 4,-30" fill="none" stroke={INK2} strokeWidth={3.4} opacity={0.7} />
                <path d="M154,178 q4,-14 -4,-30" fill="none" stroke={INK2} strokeWidth={3.4} opacity={0.7} />
              </g>

              {/* ================= HEAD: sinister angular faceplate ================= */}
              <g transform={`translate(${loomLean * (flip > 0 ? 1 : -1) * 0 + 0},${headDrop}) rotate(${headScan * 0.3} 140 84) ${shatter ? `translate(${-7 * brk},${-50 * brk}) rotate(${-15 * brk} 140 84)` : ""}`} opacity={1 - brk * 0.5}>
                {/* crest fins / horns for menace */}
                {[-1, 1].map((s) => (
                  <path key={`cr${s}`} d={`M${140 + s * 34},52 L${140 + s * 52},30 L${140 + s * 40},60 Z`} fill={`url(#${gid}body)`} stroke={INK} strokeWidth={2} />
                ))}
                {/* antenna + status light (red on attack) */}
                <line x1={140} y1={38} x2={140} y2={18} stroke="#2A3136" strokeWidth={4} strokeLinecap="round" />
                <circle cx={140} cy={15} r={4.6} fill={attack ? eyeRed : eyeTeal} opacity={statusOn * (0.3 + 0.7 * lit)} />
                <circle cx={140} cy={15} r={9} fill={attack ? eyeRed : eyeTeal} opacity={0.35 * statusOn * lit} style={{ filter: "blur(3px)" }} />

                {/* head shell (angular hex helmet, tapers to a hard chin) */}
                <path d="M98,42 L182,42 L194,74 L176,118 L140,132 L104,118 L86,74 Z" fill={`url(#${gid}body)`} stroke={INK} strokeWidth={2.6} />
                <path d="M98,42 L182,42 L194,74 L176,118 L140,132 L104,118 L86,74 Z" fill={`url(#${gid}rim)`} opacity={0.5 + 0.5 * lit} />
                <path d="M104,46 L176,46 L182,62 L98,62 Z" fill={`url(#${gid}spec)`} opacity={0.7} />
                {scuff(108, 110, 12, -14, 5)}
                {scuff(170, 66, 9, 22, 6)}
                {rivet(100, 50, 0)}{rivet(180, 50, 1)}{rivet(112, 124, 2)}{rivet(168, 124, 3)}

                {/* heavy brow ridge casting a cruel shadow over the eyes */}
                <path d="M96,68 L184,68 L176,86 L104,86 Z" fill={`url(#${gid}bodyDk)`} stroke={INK} strokeWidth={2} />
                <path d="M96,68 L184,68 L182,73 L98,73 Z" fill={STEEL} opacity={0.22} />

                {/* dark eye recess */}
                <path d="M100,80 L180,80 L172,104 L108,104 Z" fill="#04090B" stroke={SEAM} strokeWidth={1.4} />

                {/* cold cheek vent under the eyes */}
                <line x1={112} y1={100} x2={168} y2={100} stroke={eyeCol} strokeWidth={1.4} opacity={0.3 * eyeLit} />

                {/* thin cruel EYE SLITS (angled down toward the nose = angry) */}
                {(() => {
                  const flick = 0.82 + 0.18 * Math.sin(lf * 0.8) + (seed(Math.floor(lf / 6)) - 0.5) * 0.1;
                  const el = eyeLit * flick;
                  const scanX = Math.sin(lf / 10) * 2;
                  return (
                    <g>
                      {/* bloom */}
                      <ellipse cx={122} cy={91} rx={eyeBloom * 0.7} ry={7} fill={eyeCol} opacity={0.3 * el} style={{ filter: "blur(6px)" }} />
                      <ellipse cx={158} cy={91} rx={eyeBloom * 0.7} ry={7} fill={eyeCol} opacity={0.3 * el} style={{ filter: "blur(6px)" }} />
                      {/* left slit */}
                      <polygon points="106,84 132,92 130,97 106,90" fill={eyeCol} opacity={el} />
                      <polygon points="106,84 132,92 131,94 106,86.5" fill="#FFFFFF" opacity={0.55 * el} />
                      {/* right slit */}
                      <polygon points="174,84 148,92 150,97 174,90" fill={eyeCol} opacity={el} />
                      <polygon points="174,84 148,92 149,94 174,86.5" fill="#FFFFFF" opacity={0.55 * el} />
                      {/* scanning pupil glints */}
                      <circle cx={120 + scanX} cy={90} r={2} fill="#FFFFFF" opacity={0.8 * el} />
                      <circle cx={160 + scanX} cy={90} r={2} fill="#FFFFFF" opacity={0.8 * el} />
                    </g>
                  );
                })()}

                {/* grimace-vent MOUTH (clenched metal teeth; sneer on mock) */}
                <g transform={`translate(140,116) rotate(${sneer})`}>
                  <path d="M-26,-6 L26,-6 L20,10 L-20,10 Z" fill="#05090B" stroke={SEAM} strokeWidth={1.6} />
                  {[-20, -13, -6, 1, 8, 15].map((tx, i) => (
                    <rect key={`t${i}`} x={tx} y={-5} width={4.4} height={13} fill={`url(#${gid}arm)`} stroke={INK} strokeWidth={0.9} />
                  ))}
                  {/* menace vent-light bleeding between the teeth */}
                  <rect x={-22} y={2} width={44} height={2.2} fill={eyeCol} opacity={0.28 * eyeLit} />
                </g>
              </g>

              {/* shatter: plates flinging off + core dying */}
              {shatter && [[-84, 40, -60], [78, 56, 80], [-40, 108, 120], [50, 90, -140], [0, -60, 40]].map((p, i) => {
                const dx = p[0] * brk, dy = p[1] * brk - 34 * brk, rot = p[2] * brk;
                return <rect key={`sh${i}`} x={120} y={220} width={30} height={22} rx={3} fill={`url(#${gid}body)`} stroke={INK} strokeWidth={2} opacity={(1 - brk) * 0.9} transform={`translate(${dx},${dy}) rotate(${rot} 135 231)`} />;
              })}

              {/* stagger: electrical sparks */}
              {stagger && Array.from({ length: 11 }).map((_, i) => {
                const b = Math.floor(lf / 2) + i * 3;
                const sx = 100 + seed(b) * 100, sy = 90 + seed(b + 5) * 150;
                const on = seed(b + 11) > 0.35 ? 1 : 0;
                return <circle key={`sp${i}`} cx={sx} cy={sy} r={1.3 + seed(b) * 2.4} fill={i % 2 ? "#FFE08A" : eyeRed} opacity={on * (0.45 + 0.55 * Math.abs(Math.sin(lf + i)))} />;
              })}

            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

// ================= SETUP GUIDE DOC (premium CTA lead-magnet) =================
const SetupGuideDoc: React.FC<{ lf: number; reveal?: number; cx?: number; cy?: number; scale?: number }> = ({ lf, reveal = 1, cx = 506, cy = 470, scale = 1 }) => (
  (() => {
    const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
    const W = 312, H = 400;
    const rv = Math.max(0, Math.min(1, reveal));

    // ---- SLAM / BOOT-IN (reveal 0..1): overshoot then settle ----
    const app = interpolate(rv, [0, 0.20], [0, 1], clamp);
    const pop = interpolate(rv, [0, 0.5, 0.72, 0.88, 1], [0.42, 1.08, 0.972, 1.014, 1], clamp);
    const entRot = interpolate(rv, [0, 1], [-11, 0], clamp);
    const entY = interpolate(rv, [0, 1], [40, 0], clamp);
    const flare = Math.max(0, 1 - Math.abs(rv - 0.58) / 0.22);
    const entSheen = interpolate(rv, [0.40, 1], [-55, 165], clamp);   // single sheen rip on land
    const settled = interpolate(rv, [0.82, 1], [0, 1], clamp);

    // ---- IDLE (never static): gentle float, breathe, reactor pulse, slow sheen drift ----
    const pr = 0.5 + 0.5 * Math.sin(lf / 26);        // slow reactor pulse
    const pr2 = 0.5 + 0.5 * Math.sin(lf / 15 + 1.1);
    const floatY = Math.sin(lf / 44) * 4.5 * settled;
    const tilt = Math.sin(lf / 52) * 1.1 * settled;
    const drift = ((lf * 0.5) % 260) - 60;           // slow gloss drift %
    const spotX = 46 + Math.sin(lf / 60) * 7;        // soft top spotlight wander

    const rot = -3.2 + entRot + tilt;
    const S = pop * scale;

    const TOOLS = [
      { logo: "logos/obsidian_real.png", label: "Obsidian" },
      { logo: "logos/gmail.svg", label: "Gmail" },
      { logo: "logos/fireflies_real.png", label: "Fireflies" },
    ];

    const Check = () => (
      <svg width={19} height={19} viewBox="0 0 20 20" style={{ flex: "0 0 auto" }}>
        <circle cx={10} cy={10} r={9} fill={GREEN} opacity={0.12} />
        <circle cx={10} cy={10} r={9} fill="none" stroke={GREEN} strokeWidth={1.5} opacity={0.85} />
        <path d="M5.7 10.3 l2.7 2.7 l5.9 -6.5" fill="none" stroke={GREEN} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    return (
      <div style={{ position: "absolute", left: cx, top: cy, zIndex: 60, transformOrigin: "50% 50%", transform: `translate(-50%,-50%) translateY(${entY + floatY}px) rotate(${rot}deg) scale(${S})`, opacity: app, pointerEvents: "none", filter: `drop-shadow(0 34px 52px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.28))` }}>
        <div style={{ position: "relative", width: W, height: H }}>

          {/* ======= PAGE THICKNESS (a slim, tidy booklet) ======= */}
          <div style={{ position: "absolute", left: 6, top: 7, width: W, height: H, borderRadius: 20, background: grad("#E6DECC", "#D2C7AC"), transform: "rotate(1.1deg)" }} />
          <div style={{ position: "absolute", left: 3, top: 3.5, width: W, height: H, borderRadius: 20, background: grad("#EFE7D5", "#DED3B8"), transform: "rotate(0.5deg)" }} />

          {/* ======= COVER SHEET ======= */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden", background: grad("#FDFAF3", "#F1EADB"), boxShadow: "inset 0 0 0 1px rgba(120,90,40,0.16), inset 0 1px 0 rgba(255,255,255,0.85)" }}>

            {/* soft top spotlight */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 46% at ${spotX}% -4%, rgba(255,255,255,0.55), transparent 70%)`, mixBlendMode: "screen" }} />
            {/* gentle warm floor so it never reads flat */}
            <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 -60px 80px -60px rgba(120,86,40,0.22)" }} />

            {/* faint paper texture */}
            <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", opacity: 0.035 }} aria-hidden>
              <filter id="sg_grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={7} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
              <rect width={W} height={H} filter="url(#sg_grain)" />
            </svg>

            {/* one subtle gold-foil hairline at the very top edge */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: grad("#F3D488", GOLD) }} />

            {/* ---- KICKER ---- */}
            <div style={{ position: "absolute", left: 30, top: 34, fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#B07E2E" }}>JARVIS BUILD GUIDE</div>

            {/* ---- TITLE ---- */}
            <div style={{ position: "absolute", left: 28, top: 54, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 50, lineHeight: 0.92, letterSpacing: "-0.028em", color: "#1B1712" }}>DAY 1<br />SETUP</div>

            {/* one subtle gold-foil glint sweeping the title */}
            <div style={{ position: "absolute", left: 26, top: 58, width: 170, height: 96, overflow: "hidden", pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: `${drift}%`, width: "36%", background: "linear-gradient(105deg,transparent,rgba(255,238,190,0.55),transparent)", opacity: 0.5, mixBlendMode: "screen" }} />
            </div>

            {/* ---- ARC-REACTOR SEAL (small cyan mark, slow pulse) ---- */}
            <div style={{ position: "absolute", left: W - 62, top: 32, width: 42, height: 42 }}>
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, rgba(127,232,255,${0.16 + 0.16 * pr + 0.3 * flare}), transparent 68%)`, filter: "blur(3px)" }} />
              <svg viewBox="0 0 100 100" width={42} height={42} style={{ position: "relative", overflow: "visible" }}>
                <defs>
                  <radialGradient id="sg_core"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="45%" stopColor="#BEF3FF" /><stop offset="100%" stopColor="rgba(127,232,255,0)" /></radialGradient>
                </defs>
                <circle cx={50} cy={50} r={40} fill="rgba(10,26,34,0.5)" stroke="rgba(127,232,255,0.35)" strokeWidth={2.6} />
                <circle cx={50} cy={50} r={30} fill="none" stroke={HUD} strokeWidth={1.8} opacity={0.5 + 0.35 * pr} />
                <polygon points="50,28 69,39 69,61 50,72 31,61 31,39" fill="none" stroke="#9FEBFF" strokeWidth={1.8} opacity={0.85} />
                <circle cx={50} cy={50} r={14} fill="url(#sg_core)" opacity={0.7 + 0.3 * pr2} />
                <circle cx={50} cy={50} r={5.5} fill="#EAFDFF" />
              </svg>
            </div>

            {/* ---- SLIM PART PILL ---- */}
            <div style={{ position: "absolute", left: 28, top: 162, display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, background: "#1C1913", boxShadow: "inset 0 0 0 1px rgba(231,178,76,0.5)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, letterSpacing: 1.4, color: "#F1E4C4" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: HUD, boxShadow: `0 0 6px ${HUD}` }} />
              PART 1 OF 10
            </div>

            {/* ---- CONNECTED TOOLS ROW (real logos on white tiles) ---- */}
            <div style={{ position: "absolute", left: 30, top: 206, fontFamily: mono, fontSize: 9.5, fontWeight: 700, letterSpacing: 2.4, color: "#A79877" }}>CONNECTS TO</div>
            <div style={{ position: "absolute", left: 28, top: 224, display: "flex", gap: 16 }}>
              {TOOLS.map((t, i) => (
                <div key={t.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FFFFFF", boxShadow: "0 5px 12px -5px rgba(60,45,20,0.35), inset 0 0 0 1px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${Math.sin(lf / 40 + i * 1.6) * 1.2 * settled}px)` }}>
                    <Img src={staticFile(t.logo)} style={{ width: 24, height: 24, objectFit: "contain" }} />
                  </div>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9.5, letterSpacing: 0.2, color: "#8B7C5E" }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* ---- CHECKLIST (2 clear, 1 gated) ---- */}
            <div style={{ position: "absolute", left: 30, right: 28, top: 306 }}>
              {["Connect your vault", "Wire your inbox"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
                  <Check />
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 15, color: "#2A2419" }}>{s}</span>
                </div>
              ))}
            </div>

            {/* third item, softly blurred behind the value gate */}
            <div style={{ position: "absolute", left: 30, right: 28, top: 358, filter: "blur(3.2px)", opacity: 0.55, display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 17, height: 17, borderRadius: "50%", border: "2px solid rgba(90,74,48,0.55)" }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 15, color: "rgba(60,50,34,0.85)" }}>Set the morning routine</span>
            </div>

            {/* ======= GLOSSY EDGE + SHEEN ======= */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "linear-gradient(125deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 30%)", mixBlendMode: "screen", pointerEvents: "none" }} />
            {/* single entrance sheen sweep on the slam */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${entSheen}%`, width: "38%", background: "linear-gradient(105deg,transparent,rgba(255,255,255,0.6),transparent)", opacity: 1 - settled, mixBlendMode: "screen", pointerEvents: "none" }} />
            {/* slow idle gloss drift */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${drift}%`, width: "26%", background: "linear-gradient(105deg,transparent,rgba(255,246,220,0.32),transparent)", opacity: 0.4 * settled, mixBlendMode: "screen", pointerEvents: "none" }} />
          </div>

          {/* impact flare burst on slam */}
          {flare > 0.02 && (
            <div style={{ position: "absolute", left: W / 2, top: H / 2, width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,248,224,0.85), rgba(231,178,76,0.35) 40%, transparent 70%)", transform: `scale(${1 + flare * 8})`, opacity: flare * 0.7, mixBlendMode: "screen" }} />
          )}
        </div>
      </div>
    );
  })()
);

// ================= JARVIS DASHBOARD (the end-result glimpse) =================
const JarvisDashboard: React.FC<{ lf: number; reveal?: number; scale?: number; cx?: number; cy?: number }> = ({ lf, reveal = 1, scale = 1, cx = 506, cy = 452 }) => (
  (() => {
    const CY = '#7FE8FF';
    const CY2 = '#39C8F0';
    const GLD = '#E7B24C';
    const M = '"SF Mono", ui-monospace, Menlo, monospace';
    const LAB = (typeof inter !== 'undefined' && inter.fontFamily) || 'Inter, system-ui, sans-serif';
    const DISP = (typeof fraunces !== 'undefined' && fraunces.fontFamily) || 'Georgia, serif';
    const rootOp = interpolate(reveal, [0, 0.04], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const rv = (a: number, b: number) => interpolate(reveal, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    const breathe = 1 + 0.012 * Math.sin(lf * 0.06);
    const sd = (i: number) => (typeof seed === 'function' ? seed(i) : ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1);

    // ---- reusable holo panel ----
    const Panel = (o: any) => {
      const p = o.p;
      if (p <= 0.001) return null;
      const s = 0.9 + 0.1 * p;
      const acc = o.accent || CY;
      return (
        <g opacity={p} transform={`translate(${o.x} ${o.y})`}>
          <defs>
            <clipPath id={`jd-clip-${o.k}`}>
              <rect x={-10} y={-10} width={o.w + 20} height={(o.h + 26) * Math.max(0.06, p)} rx={14} />
            </clipPath>
          </defs>
          <g clipPath={`url(#jd-clip-${o.k})`}>
            <g transform={`translate(${o.w / 2} ${o.h / 2}) scale(${s}) translate(${-o.w / 2} ${-o.h / 2})`}>
              <rect x={0} y={0} width={o.w} height={o.h} rx={12} fill="url(#jd-panel)" stroke={acc} strokeOpacity={0.5} strokeWidth={1.4} filter="url(#jd-soft)" />
              <rect x={0} y={0} width={o.w} height={o.h} rx={12} fill="none" stroke={acc} strokeOpacity={0.85} strokeWidth={1} />
              <rect x={0} y={0} width={o.w} height={22} rx={12} fill={acc} opacity={0.10} />
              {/* corner ticks */}
              {[[0, 0, 1, 1], [o.w, 0, -1, 1], [0, o.h, 1, -1], [o.w, o.h, -1, -1]].map((c, i) => (
                <path key={i} d={`M ${c[0]} ${c[1] + 14 * c[3]} L ${c[0]} ${c[1]} L ${c[0] + 14 * c[2]} ${c[1]}`} stroke={GLD} strokeWidth={1.6} fill="none" opacity={0.9} />
              ))}
              {o.title && (
                <text x={12} y={16} fontFamily={M} fontSize={9.5} letterSpacing={2} fill={acc} opacity={0.9}>{o.title}</text>
              )}
              <g style={{ fontFamily: LAB }}>{o.body}</g>
            </g>
          </g>
          {/* scan wipe bar during boot */}
          {p < 0.999 && (
            <rect x={-6} y={(o.h + 20) * p - 3} width={o.w + 12} height={3} fill={acc} opacity={0.9 * (1 - p) + 0.2} filter="url(#jd-glow)" />
          )}
        </g>
      );
    };

    // ---- morning brief body ----
    const briefW = 288;
    const briefBody = (
      <g>
        <text x={16} y={64} fontFamily={DISP} fontSize={34} fontWeight={600} fill={CY}>Good morning</text>
        <text x={16} y={86} fontFamily={M} fontSize={10} letterSpacing={1.5} fill={GLD} opacity={0.85}>SYSTEMS ONLINE</text>
        {[
          ['Calendar', '4 events'],
          ['Inbox', '200 to 1 that matters'],
          ['Drafts', 'ready'],
        ].map((r, i) => {
          const rp = interpolate(reveal, [0.3 + i * 0.06, 0.5 + i * 0.06], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const yy = 118 + i * 34;
          return (
            <g key={i} opacity={rp} transform={`translate(${(1 - rp) * -12} 0)`}>
              <circle cx={22} cy={yy - 4} r={3.4} fill={GLD} opacity={0.5 + 0.5 * Math.sin(lf * 0.15 + i)} />
              <text x={38} y={yy} fontFamily={LAB} fontSize={14} fontWeight={600} fill="#DDF6FF">{r[0]}</text>
              <text x={briefW - 14} y={yy} textAnchor="end" fontFamily={M} fontSize={12.5} fill={CY}>{r[1]}</text>
              <line x1={38} y1={yy + 11} x2={briefW - 14} y2={yy + 11} stroke={CY} strokeOpacity={0.14} strokeWidth={1} />
            </g>
          );
        })}
      </g>
    );

    // ---- live metric body ----
    const mv = 840 + Math.floor(interpolate(reveal, [0.3, 1], [0, 380], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })) + (Math.floor(lf * 2) % 9) + Math.floor(6 * (1 + Math.sin(lf * 0.07)));
    const cw = 232, ch = 66;
    const metricBody = (
      <g>
        <text x={16} y={54} fontFamily={M} fontSize={40} fontWeight={700} fill="#EAFBFF">{mv.toLocaleString()}</text>
        <text x={16} y={72} fontFamily={M} fontSize={9.5} letterSpacing={1.5} fill={GLD}>TASKS AUTOMATED / WK  {'▲'} 12%</text>
        <g transform="translate(14 92)">
          {[...Array(9)].map((_, i) => {
            const h = 8 + (0.5 + 0.5 * Math.sin(i * 0.7 + lf * 0.05)) * ch * 0.55 + i * 2.6;
            return <rect key={i} x={i * (cw / 9)} y={ch - h} width={cw / 9 - 5} height={h} rx={2} fill={CY} opacity={0.16 + 0.05 * Math.sin(lf * 0.1 + i)} />;
          })}
          <polyline
            points={[...Array(9)].map((_, i) => {
              const px = i * (cw / 9) + (cw / 9 - 5) / 2;
              const yv = ch - (8 + (0.5 + 0.5 * Math.sin(i * 0.7 + lf * 0.05)) * ch * 0.55 + i * 2.6);
              return `${px},${yv}`;
            }).join(' ')}
            fill="none" stroke={CY} strokeWidth={2} filter="url(#jd-glow)" />
          {[...Array(9)].map((_, i) => {
            const px = i * (cw / 9) + (cw / 9 - 5) / 2;
            const yv = ch - (8 + (0.5 + 0.5 * Math.sin(i * 0.7 + lf * 0.05)) * ch * 0.55 + i * 2.6);
            return <circle key={i} cx={px} cy={yv} r={2.2} fill="#EAFBFF" />;
          })}
        </g>
      </g>
    );

    // ---- premium hologram GLOBE body ----
    const R = 62;
    const spinG = lf * 0.9;                          // longitude spin
    const radarBody = (
      <g transform="translate(122 118)">
        {/* atmosphere bloom */}
        <circle cx={0} cy={0} r={R + 12} fill="rgba(127,232,255,0.14)" style={{ filter: "blur(6px)" }} />
        {/* solid sphere with day/terminator shading */}
        <defs>
          <radialGradient id={`jd-globe`} cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#1B4C63" /><stop offset="52%" stopColor="#0C2A3A" /><stop offset="100%" stopColor="#05141D" />
          </radialGradient>
        </defs>
        <circle cx={0} cy={0} r={R} fill={`url(#jd-globe)`} stroke={CY} strokeOpacity={0.5} strokeWidth={1.2} />
        {/* clip everything to the sphere */}
        <clipPath id={`jd-gclip`}><circle cx={0} cy={0} r={R - 1} /></clipPath>
        <g clipPath={`url(#jd-gclip)`}>
          {/* latitude bands */}
          {[-40, -20, 0, 20, 40].map((yo, i) => (
            <ellipse key={`la${i}`} cx={0} cy={yo * 0.62} rx={Math.max(6, Math.sqrt(Math.max(0, R * R - yo * yo)))} ry={7} fill="none" stroke={CY} strokeOpacity={0.24} strokeWidth={0.9} />
          ))}
          {/* rotating longitude meridians */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const rx = R * Math.abs(Math.cos(spinG * 0.017 + (i * Math.PI) / 6));
            return <ellipse key={`lo${i}`} cx={0} cy={0} rx={rx} ry={R} fill="none" stroke={CY} strokeOpacity={0.18} strokeWidth={0.9} />;
          })}
          {/* drifting "continent" blobs (parallax-scroll across the face) */}
          {[[-30, -22, 26, 16], [16, -8, 30, 18], [-10, 20, 22, 13], [34, 24, 16, 11]].map((c, i) => {
            const off = ((spinG * 0.6 + c[0] + 120) % 150) - 75;                 // scroll horizontally, wrap
            const vis = Math.max(0, 1 - Math.abs(off) / 62);                     // fade at the limb
            return <ellipse key={`ct${i}`} cx={off * 0.9} cy={c[1]} rx={c[2] * (0.5 + vis * 0.5)} ry={c[3]} fill={CY} opacity={0.10 + vis * 0.16} />;
          })}
          {/* glowing network nodes + connecting arcs (the "sync") */}
          {[...Array(6)].map((_, i) => {
            const off = ((spinG * 0.6 + sd(i) * 150) % 150) - 75;
            const ny = (sd(i + 4) - 0.5) * 2 * R * 0.7;
            const vis = Math.max(0, 1 - Math.abs(off) / 62) * Math.max(0, 1 - Math.abs(ny) / R);
            return <circle key={`nd${i}`} cx={off * 0.9} cy={ny} r={1.8} fill={GLD} opacity={0.4 + vis * 0.5} />;
          })}
        </g>
        {/* limb highlight */}
        <circle cx={0} cy={0} r={R} fill="none" stroke="#BEF3FF" strokeOpacity={0.35} strokeWidth={1} />
        <ellipse cx={-R * 0.34} cy={-R * 0.36} rx={R * 0.28} ry={R * 0.18} fill="#EAFDFF" opacity={0.12} />
        {/* radar sweep + orbit ring */}
        <circle cx={0} cy={0} r={R + 7} fill="none" stroke={GLD} strokeOpacity={0.28} strokeWidth={0.8} strokeDasharray="3 8" transform={`rotate(${-spinG})`} />
        <g transform={`rotate(${(lf * 2.2) % 360})`}>
          <path d={`M 0 0 L ${R} 0 A ${R} ${R} 0 0 1 ${R * 0.7} ${R * 0.7} Z`} fill="url(#jd-sweep)" opacity={0.45} />
          <line x1={0} y1={0} x2={R} y2={0} stroke={GLD} strokeWidth={1.6} opacity={0.9} />
        </g>
        {[...Array(5)].map((_, i) => {
          const a = sd(i) * 6.28 + lf * 0.01;
          const r = 14 + sd(i + 9) * 44;
          return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={2} fill={GLD} opacity={0.4 + 0.5 * Math.sin(lf * 0.12 + i)} />;
        })}
      </g>
    );

    // ---- waveform body ----
    const wfBody = (
      <g transform="translate(0 34)">
        <text x={276} y={-14} textAnchor="end" fontFamily={M} fontSize={9} letterSpacing={2} fill={GLD} opacity={0.85}>{'●'} LISTENING</text>
        {[...Array(30)].map((_, i) => {
          const h = 5 + (0.5 + 0.5 * Math.sin(lf * 0.28 + i * 0.55 + sd(i) * 6)) * 42;
          const x = 14 + i * 9;
          return <rect key={i} x={x} y={30 - h / 2} width={4} height={h} rx={2} fill={CY} opacity={0.5 + 0.4 * Math.sin(lf * 0.2 + i)} />;
        })}
      </g>
    );

    // ---- connected tools ----
    const tools = ['Obsidian', 'Gmail', 'Calendar', 'Notion'];
    const chipW = 118, chipGap = 14;
    const rowW = tools.length * chipW + (tools.length - 1) * chipGap;

    return (
      <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <g opacity={rootOp} transform={`translate(${cx} ${cy}) scale(${scale})`}>
        <defs>
          <radialGradient id="jd-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.95} />
            <stop offset="24%" stopColor={CY} stopOpacity={0.9} />
            <stop offset="60%" stopColor={CY2} stopOpacity={0.35} />
            <stop offset="100%" stopColor={CY2} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="jd-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={CY} stopOpacity={0.5} />
            <stop offset="100%" stopColor={CY} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="jd-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12324A" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#081524" stopOpacity={0.72} />
          </linearGradient>
          <linearGradient id="jd-sweep" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor={CY} stopOpacity={0.55} />
            <stop offset="100%" stopColor={CY} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="jd-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CY} stopOpacity={0.22} />
            <stop offset="100%" stopColor={CY} stopOpacity={0} />
          </linearGradient>
          <filter id="jd-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="jd-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /></feMerge>
          </filter>
        </defs>

        {/* ambient vignette / rays */}
        <g opacity={rv(0, 0.3) * 0.9}>
          {[...Array(7)].map((_, i) => {
            const a = (i / 7) * 360 + lf * 0.15;
            return <path key={i} d="M 0 0 L 40 -520 L -40 -520 Z" transform={`rotate(${a})`} fill="url(#jd-halo)" opacity={0.06 + 0.03 * Math.sin(lf * 0.05 + i)} />;
          })}
        </g>

        {/* grid floor reflection */}
        <g opacity={rv(0.3, 0.7) * 0.7} transform="translate(0 226)">
          {[...Array(7)].map((_, i) => {
            const yy = i * 12 + (lf % 12);
            const wdt = 120 + i * 78;
            return <line key={i} x1={-wdt} y1={yy} x2={wdt} y2={yy} stroke="url(#jd-floor)" strokeWidth={1} opacity={0.5 - i * 0.05} />;
          })}
          {[...Array(11)].map((_, i) => {
            const fx = (i - 5) * 44;
            return <line key={i} x1={fx} y1={0} x2={fx * 6} y2={84} stroke={CY} strokeOpacity={0.1} strokeWidth={1} />;
          })}
        </g>

        {/* ---- CENTRAL ARC REACTOR CORE ---- */}
        <g transform={`translate(0 -6) scale(${breathe})`} opacity={rv(0, 0.35)}>
          <circle cx={0} cy={0} r={150} fill="url(#jd-halo)" opacity={0.5} />
          {/* rotating rings */}
          <g transform={`rotate(${lf * 0.6})`}>
            <circle cx={0} cy={0} r={116} fill="none" stroke={CY} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="3 10" />
          </g>
          <g transform={`rotate(${-lf * 0.42})`}>
            <circle cx={0} cy={0} r={98} fill="none" stroke={CY} strokeOpacity={0.55} strokeWidth={1.4} strokeDasharray="26 14" />
            {[...Array(12)].map((_, i) => {
              const a = (i / 12) * 6.283;
              return <line key={i} x1={Math.cos(a) * 88} y1={Math.sin(a) * 88} x2={Math.cos(a) * 98} y2={Math.sin(a) * 98} stroke={GLD} strokeWidth={2} opacity={0.7} />;
            })}
          </g>
          <g transform={`rotate(${lf * 0.28})`}>
            <circle cx={0} cy={0} r={78} fill="none" stroke={GLD} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 8" />
          </g>
          {/* reticle crosshair */}
          <g opacity={0.8}>
            {[0, 90, 180, 270].map((a, i) => (
              <line key={i} x1={0} y1={0} x2={0} y2={-64} transform={`rotate(${a})`} stroke={CY} strokeOpacity={0.3} strokeWidth={1} />
            ))}
            <circle cx={0} cy={0} r={62} fill="none" stroke={CY} strokeOpacity={0.4} strokeWidth={1} />
            <circle cx={0} cy={0} r={62} fill="none" stroke={CY} strokeOpacity={0.9} strokeWidth={2} strokeDasharray={`${6.28 * 62 * 0.28} ${6.28 * 62}`} transform={`rotate(${lf * 1.5})`} />
          </g>
          {/* hot core */}
          <circle cx={0} cy={0} r={46} fill="url(#jd-core)" filter="url(#jd-glow)" />
          <g transform={`rotate(${lf * 0.9})`}>
            <path d="M 0 -30 L 26 15 L -26 15 Z" fill="none" stroke="#EAFBFF" strokeWidth={1.6} opacity={0.85} />
            <path d="M 0 30 L 26 -15 L -26 -15 Z" fill="none" stroke={CY} strokeWidth={1.4} opacity={0.7} />
          </g>
          <circle cx={0} cy={0} r={12} fill="#FFFFFF" opacity={0.9 + 0.1 * Math.sin(lf * 0.3)} />
          <text x={0} y={132} textAnchor="middle" fontFamily={M} fontSize={11} letterSpacing={4} fill={CY} opacity={0.85}>J.A.R.V.I.S</text>
        </g>

        {/* ---- PANELS ---- */}
        <Panel k="brief" x={-462} y={-232} w={288} h={224} p={rv(0.15, 0.45)} accent={CY} title="MORNING BRIEF" body={briefBody} />
        <Panel k="metric" x={182} y={-234} w={262} h={168} p={rv(0.25, 0.55)} accent={CY} title="LIVE" body={metricBody} />
        <Panel k="radar" x={192} y={-50} w={252} h={222} p={rv(0.35, 0.65)} accent={GLD} title="GLOBAL SYNC" body={radarBody} />
        <Panel k="wave" x={-462} y={16} w={288} h={104} p={rv(0.45, 0.72)} accent={CY} title="VOICE" body={wfBody} />

        {/* ---- connected tools row ---- */}
        <g opacity={rv(0.55, 0.82)} transform={`translate(${-rowW / 2} 196)`}>
          <text x={0} y={-10} fontFamily={M} fontSize={9.5} letterSpacing={2} fill={CY} opacity={0.7}>CONNECTED TOOLS</text>
          {tools.map((tool, i) => {
            const cp = interpolate(reveal, [0.6 + i * 0.05, 0.8 + i * 0.05], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const pulse = 0.4 + 0.35 * Math.sin(lf * 0.14 + i * 1.3);
            return (
              <g key={i} opacity={cp} transform={`translate(${i * (chipW + chipGap)} ${(1 - cp) * 10})`}>
                <rect x={0} y={0} width={chipW} height={46} rx={10} fill="url(#jd-panel)" stroke={CY} strokeOpacity={0.55} strokeWidth={1.2} />
                {/* real brand logo on a light app-icon tile */}
                <rect x={9} y={11} width={24} height={24} rx={6} fill="#F4F1EA" stroke={GLD} strokeOpacity={0.5} strokeWidth={1} />
                <image href={staticFile(`logos/${({ Obsidian: 'obsidian', Gmail: 'gmail', Calendar: 'googlecalendar', Notion: 'notion' } as any)[tool]}.svg`)} x={12.5} y={14.5} width={17} height={17} />
                <text x={41} y={21} fontFamily={LAB} fontSize={13} fontWeight={600} fill="#DDF6FF">{tool}</text>
                <text x={41} y={35} fontFamily={M} fontSize={8.5} letterSpacing={1} fill={CY} opacity={0.75}>{'●'} online</text>
              </g>
            );
          })}
        </g>

        {/* ---- floating tick readouts ---- */}
        <g opacity={rv(0.6, 0.9)} fontFamily={M} fontSize={10}>
          {[
            ['-150 -292', 'SYS 98%'],
            ['96 -286', 'LAT 12ms'],
            ['-176 150', 'PWR 4.2GW'],
            ['150 -6', 'UPLINK OK'],
            ['-58 -150', 'CPU 41%'],
            ['70 148', 'MEM 6.8G'],
          ].map((r, i) => {
            const blink = 0.55 + 0.45 * Math.sin(lf * 0.1 + i * 1.7);
            const p = r[0].split(' ');
            return (
              <g key={i} transform={`translate(${p[0]} ${p[1]})`} opacity={blink}>
                <rect x={-4} y={-11} width={r[1].length * 6.6 + 8} height={16} rx={3} fill="#081524" fillOpacity={0.5} stroke={CY} strokeOpacity={0.25} strokeWidth={0.8} />
                <circle cx={2} cy={-3} r={2} fill={GLD} />
                <text x={10} y={1} fill={CY} opacity={0.9}>{r[1]}</text>
              </g>
            );
          })}
        </g>

        {/* ---- rising particles ---- */}
        <g opacity={rv(0.4, 0.8)}>
          {[...Array(16)].map((_, i) => {
            const span = 560;
            const px = -430 + sd(i) * 860;
            const yy = 260 - ((lf * (1.1 + sd(i + 3) * 1.6) + sd(i) * span) % span);
            const op = Math.max(0, 0.6 * (1 - Math.abs(yy) / 280)) * (0.5 + 0.5 * Math.sin(lf * 0.2 + i));
            return <circle key={i} cx={px} cy={yy} r={1 + sd(i + 5) * 1.6} fill={i % 4 === 0 ? GLD : CY} opacity={op} />;
          })}
        </g>

        {/* ---- scanline overlay + flicker ---- */}
        <g opacity={0.06 + 0.02 * Math.sin(lf * 0.5)}>
          {[...Array(28)].map((_, i) => (
            <line key={i} x1={-470} y1={-290 + i * 21} x2={470} y2={-290 + i * 21} stroke={CY} strokeWidth={1} />
          ))}
        </g>
      </g>
      </svg>
    );
  })()
);

// ================= SHARED ABSTRACT STAGE (kinetic dark void, NOT a diorama) =================
// A premium HUD/hologram space: deep gradient void + a perspective energy grid + drifting
// particles + a central bloom + vignette. Continuity backdrop for kinetic ABSTRACT action.
// energy = 0..1 how charged the field is; hue "cool"|"warm"|"crimson" tints it.
const Stage: React.FC<{ lf: number; energy?: number; hue?: string; grid?: boolean }> = ({ lf, energy = 0.5, hue = "cool", grid = true }) => {
  const e = Math.max(0, Math.min(1, energy));
  const base = hue === "warm" ? ["#241706", "#0C0A06"] : hue === "crimson" ? ["#210E0C", "#0A0607"] : ["#0C1826", "#05080D"];
  const glow = hue === "warm" ? "255,178,88" : hue === "crimson" ? "228,120,90" : "127,232,255";
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(125% 100% at 50% 42%, ${base[0]} 0%, ${base[1]} 72%, #04060A 100%)` }} />
      {/* perspective energy grid floor (converging lines) */}
      {grid && <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 322, overflow: "hidden", opacity: 0.4 + e * 0.4, perspective: "600px" }}>
        <div style={{ position: "absolute", inset: 0, transform: "rotateX(64deg)", transformOrigin: "50% 0%" }}>
          {Array.from({ length: 12 }, (_, i) => <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: i * 40 + (lf * 1.6) % 40, height: 2, background: `rgba(${glow},${0.10 + e * 0.16})` }} />)}
          {Array.from({ length: 13 }, (_, i) => <div key={`v${i}`} style={{ position: "absolute", left: `${i * 8.3}%`, top: 0, bottom: 0, width: 2, background: `rgba(${glow},${0.06 + e * 0.12})` }} />)}
        </div>
      </div>}
      {/* central bloom */}
      <div style={{ position: "absolute", left: 506 - 320, top: 396 - 320, width: 640, height: 640, borderRadius: "50%", background: `radial-gradient(circle, rgba(${glow},${0.10 + e * 0.14}) 0%, transparent 66%)`, filter: "blur(18px)" }} />
      {/* drifting particles (depth) */}
      {Array.from({ length: 22 }, (_, i) => { const sd = seed(i + 4); const x = seed(i * 2.3) * 1012; const y = (seed(i * 1.7) * 792 + lf * (0.3 + sd * 0.7)) % 792; const sz = 2 + sd * 4; return (
        <div key={`p${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgba(${glow},0.7)`, opacity: (0.12 + sd * 0.32) * (0.5 + e * 0.5), boxShadow: `0 0 ${4 + sd * 6}px rgba(${glow},0.6)` }} />); })}
      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px rgba(0,0,0,0.7)" }} />
    </>
  );
};

// ================= THE RUNNING GAG - unbuilt gauntlets in the corner =================
const CornerGauntlets: React.FC<{ lf: number; wake?: number }> = ({ lf, wake = 0 }) => {
  const flare = Math.pow(Math.max(0, Math.sin(lf / 38)), 4);
  const rep = Math.min(1, (0.3 + wake * 0.7) * (0.68 + 0.32 * Math.sin(lf / 9)) + flare * 0.5);
  const one = (key: string, x: number, rot: number) => (
    <g key={key} transform={`translate(${x},${4 + Math.sin(lf / 15 + (rot > 0 ? 1.6 : 0)) * 2.4}) rotate(${rot + Math.sin(lf / 22 + (rot > 0 ? 1 : 0)) * 1.8} 28 60)`}>
      {/* fingers: 4 fingers, each 2 crimson segments + gold knuckle joints + gold tip cap */}
      {[15.5, 23.5, 31.5, 39.5].map((fx, i) => {
        const h1 = 7, h2 = i === 0 || i === 3 ? 9 : 11; // outer fingers shorter (natural hand)
        const top = 30 - h1 - h2 - 4;
        return (
          <g key={i} transform={`rotate(${Math.sin(lf / 13 + i * 0.55) * 3.4} ${fx} ${top + h2 + 5})`}>
            {/* gold fingertip cap */}
            <path d={`M ${fx - 3} ${top + 3} Q ${fx} ${top - 2} ${fx + 3} ${top + 3} L ${fx + 3} ${top + 5} L ${fx - 3} ${top + 5} Z`} fill="url(#gaGold)" stroke="#7A5214" strokeWidth={0.6} />
            {/* tip segment */}
            <rect x={fx - 3.3} y={top + 4} width={6.6} height={h2} rx={2.6} fill="url(#gaCrim)" stroke="#5A1815" strokeWidth={0.8} />
            <rect x={fx - 2.7} y={top + 5} width={1.8} height={h2 - 2} fill="#D8564A" opacity={0.5} />
            {/* gold knuckle joint */}
            <rect x={fx - 3.6} y={top + h2 + 3} width={7.2} height={3.4} rx={1.4} fill="url(#gaGold)" stroke="#7A5214" strokeWidth={0.5} />
            {/* base segment */}
            <rect x={fx - 3.3} y={top + h2 + 6} width={6.6} height={h1 + 4} rx={2.4} fill="url(#gaCrim)" stroke="#5A1815" strokeWidth={0.8} />
            <rect x={fx - 2.7} y={top + h2 + 7} width={1.8} height={h1 + 2} fill="#D8564A" opacity={0.5} />
          </g>
        );
      })}
      {/* thumb */}
      <g transform="rotate(-26 9 46)"><rect x={4} y={38} width={6.4} height={16} rx={3.2} fill="url(#gaCrim)" stroke="#5A1815" strokeWidth={0.8} /><rect x={4.4} y={39} width={2} height={14} fill="#D8564A" opacity={0.5} /></g>
      {/* back-of-hand knuckle plate (gold, layered) */}
      <path d="M11,29 L45,29 L47,60 L9,60 Z" fill="url(#gaGold)" stroke="#7A5214" strokeWidth={1.2} />
      <rect x={13} y={43} width={30} height={3.5} fill="#7A5214" opacity={0.5} />
      <rect x={12} y={31} width={5} height={27} fill="#FFF0C9" opacity={0.4} />
      {/* forearm cuff (crimson) */}
      <path d="M9,58 L47,58 L45,106 Q28,113 11,106 Z" fill="url(#gaCrim)" stroke="#5A1815" strokeWidth={1.5} />
      <path d="M9,58 L15,58 L14,106 Q11,108 11,106 Z" fill="rgba(150,200,255,0.4)" />
      <rect x={12} y={64} width={32} height={6} rx={2} fill="url(#gaGold)" stroke="#7A5214" strokeWidth={0.6} />
      <circle cx={17} cy={67} r={1.7} fill="#FFE9B0" /><circle cx={39} cy={67} r={1.7} fill="#FFE9B0" />
      {/* palm repulsor (layered glow) */}
      <circle cx={28} cy={80} r={13} fill="#7FE8FF" opacity={0.32 * rep} style={{ filter: "blur(5px)" }} />
      <circle cx={28} cy={80} r={8} fill="#0E2A33" stroke="#9C6A24" strokeWidth={1.4} />
      {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x={27} y={73} width={2} height={4} fill="#9C6A24" transform={`rotate(${a} 28 80)`} opacity={0.7} />)}
      <circle cx={28} cy={80} r={5.6} fill="url(#gaRep)" opacity={0.5 + 0.5 * rep} />
      <circle cx={28} cy={80} r={2.4} fill="#EAFDFF" opacity={0.7 + 0.3 * rep} />
    </g>
  );
  return (
    <div style={{ position: "absolute", left: 806, top: 584, width: 176, height: 130, zIndex: 22, opacity: 0.72 + wake * 0.28, filter: "drop-shadow(0 7px 9px rgba(0,0,0,0.55))" }}>
      <svg viewBox="0 0 176 130" width={176} height={130} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="gaCrim" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor="#C94A3E" /><stop offset="58%" stopColor="#8E2A25" /><stop offset="100%" stopColor="#571714" /></linearGradient>
          <linearGradient id="gaGold" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stopColor="#F5D488" /><stop offset="50%" stopColor="#E0AC45" /><stop offset="100%" stopColor="#A9781F" /></linearGradient>
          <radialGradient id="gaRep" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#EAFDFF" /><stop offset="55%" stopColor="#7FE8FF" /><stop offset="100%" stopColor="#2FA8D6" /></radialGradient>
        </defs>
        {one("L", 6, -9)}
        {one("R", 84, 9)}
      </svg>
    </div>
  );
};

type W = { start: number; end: number; word: string };
const cw = words as W[];
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

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = f / FPS;
  const VIRT = CUT;
  const p = Math.min(1, t / VIRT);
  const marks = [11.93, 24.0, 37.0];
  const STARS = [5.0, 18.0, 30.0, 41.0];
  const TOTAL = VIRT;
  const PELLETS = [3, 8, 14, 20, 26, 32, 38, 43];
  const score = PELLETS.filter((pt) => t >= pt).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((m) => t >= m).length * 2;
  const incTimes = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const allItems = [...PELLETS, ...marks, ...STARS];
  const eaten = allItems.filter((x) => t >= x).length;

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
      {/* teased gift at the end — WAKES UP as the finish nears (reward about to unlock: "stay") */}
      {(() => {
        const wake = interpolate(t, [41.0, 45.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rattle = wake * Math.sin(t * 26) * 4;
        return (
          <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translate(${rattle}px, ${Math.sin(t * 2.4) * 3 - wake * 3}px) rotate(${rattle * 0.6}deg)`, zIndex: 131 }}>
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + wake * 26}px ${GOLD}${wake > 0.3 ? "aa" : "66"}` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: `grayscale(${0.6 - wake * 0.6}) brightness(${0.85 + wake * 0.35})`, opacity: 0.6 + wake * 0.4, transform: `scale(${0.84 + wake * 0.2})` }}>🎁</div>
            {/* sparkles popping around the gift as it wakes */}
            {wake > 0.15 && Array.from({ length: 5 }).map((_, k) => {
              const a = (k / 5) * Math.PI * 2 + t * 1.5;
              const rr = 30 + Math.sin(t * 4 + k) * 6;
              return <div key={k} style={{ position: "absolute", left: 48 + Math.cos(a) * rr, top: 48 + Math.sin(a) * rr, width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5, borderRadius: "50%", background: "#F6E4A0", opacity: wake * (0.5 + 0.5 * Math.sin(t * 6 + k * 2)), boxShadow: `0 0 8px ${GOLD}` }} />;
            })}
          </div>
        );
      })()}
      {(() => {
        const cs = 24 + Math.min(1, eaten / 16) * 46;
        const cc: any = {};
        if (eaten >= 4) cc.glasses = 1;
        if (eaten >= 9) { cc.wizard = 1; cc.glasses = 0; }
        if (eaten >= 14) cc.beard = 1;
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (
          <div style={{ position: "absolute", left: `${p * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
            <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
          </div>
        );
      })()}
      {(() => { const slamShock = t >= 2.35 && t < 3.4 ? Math.min(1, (t - 2.35) / 0.25) * 0.9 : 0; const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />

          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"\u2605 " + score}</div>
        </div>); })()}
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

const S0: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="forge // suit_up.exe">
    {(() => {
      // ===== PATTERN INTERRUPT: white-hot MACRO seam on pure black -> HAMMER STRIKE pre-beat -> LIGHT-BOMB ignition -> SMASH-ZOOM-OUT reveal =====
      const IGNITE = 10;                                   // the POW / ignition frame (main spike; claim reads before this)
      const STRIKE = 3;                                    // micro pre-beat: the forge hammer lands
      const RX = 506, RY = 471;                            // arc-reactor / world focus

      // ---- PRE-BEAT: the strike jolt + white-hot seam that owns frame 0 ----
      const strikeJolt = Math.max(0, 1 - Math.abs(lf - STRIKE) / 3.2);         // triangular punch around the strike
      const strikeFlash = lf < STRIKE ? 0 : Math.max(0, 1 - (lf - STRIKE) / 5); // hot spark-burst decay
      const charge = ramp(lf, STRIKE, IGNITE);                                  // tri-coil spins up 0 -> 1 into ignition
      const seam = lf < IGNITE
        ? (0.42 + 0.58 * Math.abs(Math.sin(lf * 0.9))) * (0.35 + 0.65 * charge) + strikeFlash * 0.6
        : Math.max(0, 1 - (lf - IGNITE) / 5);              // searing back-seam behind the dormant reactor (frame-0 hero image)

      // ---- CAMERA: MACRO PUSH on the dark reactor (+ strike punch) -> SMASH DOLLY-OUT 3.05->1.0 -> slow CRANE-UP over the forge ----
      const macro = over(lf, 0, IGNITE, Easing.inOut(Easing.cubic));      // 0..1 macro push-in across the closeup hold
      const zo = over(lf, IGNITE, 6, Easing.out(Easing.cubic));           // 0..1 ignition zoom-out (the smash)
      const push = over(lf, IGNITE + 6, 84, Easing.inOut(Easing.cubic));  // slow post-reveal push (act 2/3 keeps moving)
      const crane = over(lf, IGNITE + 22, 72, Easing.inOut(Easing.cubic));// slow crane-up revealing the vast forge
      const camScale = lf < IGNITE
        ? (3.66 - macro * 0.61) + Math.sin(lf / 2.3) * 0.05 + strikeJolt * 0.11    // MACRO PUSH-IN + heartbeat breath + strike punch-in
        : interpolate(zo, [0, 1], [3.05, 1.0]) + push * 0.11 - crane * 0.05;
      const kick = lf < IGNITE ? 0 : Math.max(0, 1 - (lf - IGNITE) / 9);  // ignition camera punch (drives shake + chroma)
      const craneY = crane * 46;                                          // camera lifts -> world slides down, revealing overhead forge
      const shX = kick * Math.sin(lf * 3.1) * 15 + strikeJolt * Math.sin(lf * 5.2) * 7 + Math.sin(lf / 30) * 4 * push;
      const shY = kick * Math.cos(lf * 2.6) * 12 + strikeJolt * Math.cos(lf * 5.2) * 5 - push * 6 + craneY;
      const camRot = kick * Math.sin(lf * 2.2) * 1.1 + strikeJolt * Math.sin(lf * 6) * 0.5 - crane * 0.6; // whip-tilt on smash + micro strike shake

      // ---- STATE ----
      const core = lf < IGNITE ? charge * 0.12 : over(lf, IGNITE, 14);   // arc-reactor faint charge -> full 1
      const lit = Math.min(1, core);
      // The ignited bloom was authored for the MACRO close-up (camScale ~3). Once the smash
      // dolly-out lands on the wide shot the same radii cover the hero's chest AND face, so
      // collapse the bloom to a chest-sized reactor halo as the reveal completes.
      const wideNow = over(lf, IGNITE, 12);
      const bloomK = 1 - wideNow * 0.74;
      const pose = lf < IGNITE ? "charge" : "victory";                    // crouched charge -> victory on the flash
      const esc = ramp(lf, IGNITE + 6, 98);                              // post-reveal escalation
      const beat = 0.5 + 0.5 * Math.sin(lf / 2.2);                       // heartbeat pulse

      // ---- SECOND BEAT: HUD BOOT-UP SWEEP races across the armor after the reveal ----
      const bootP = over(lf, IGNITE + 12, 30, Easing.inOut(Easing.cubic)); // 0..1 diagnostic scan
      const scanY = 300 + bootP * 300;                                    // scan-line travels DOWN the hero
      const bootBand = bootP > 0 && bootP < 1;
      const bootGlow = Math.sin(Math.min(1, bootP / 0.9) * Math.PI);      // rises then settles
      const online = over(lf, IGNITE + 34, 14);                          // systems-nominal confirm flare

      // ---- FORESHADOW BEAT: the VILLAIN's cyclops optic burns awake deep in the forge shadow, then vanishes ----
      const eyeVis = over(lf, 26, 7) * (1 - over(lf, 40, 7));

      // ---- REVEAL VEILS ----
      const closeupOn = lf < IGNITE ? 1 : Math.max(0, 1 - (lf - IGNITE) / 10); // dark-reactor detail dissolves into the hero
      const dark = lf < IGNITE ? 1 : Math.max(0, 1 - (lf - IGNITE) / 6);       // near-black veil lifts on ignition
      const heart = closeupOn * (0.16 + beat * 0.2);
      const flash = lf < IGNITE ? 0 : Math.max(0, 1 - (lf - IGNITE) / 9);      // blinding white ignition bloom
      const whiteBomb = lf < IGNITE ? 0 : Math.max(0, 1 - (lf - IGNITE) / 4);  // the LIGHT-BOMB: near-fullscreen 4-frame detonation

      // ---- FX BEATS ----
      const shock = over(lf, IGNITE, 22);
      const shock2 = over(lf, IGNITE + 6, 26);
      const seal = over(lf, 60, 24);                                     // late "power sealed" ring keeps act 3 alive
      const bprog = ramp(lf, IGNITE, IGNITE + 18);                       // ignition burst rays
      const speedln = over(lf, IGNITE, 15, Easing.out(Easing.cubic));    // radial speed-lines snapping out of the blast

      // ---- STRIKE SPARK BURST (pre-beat, deterministic) ----
      const strikeSparks = strikeFlash > 0.01 ? Array.from({ length: 24 }, (_, i) => {
        const a = seed(i * 1.7) * Math.PI * 2;
        const life = 1 - strikeFlash;
        const spd = 120 + seed(i * 2.3) * 300;
        const x = RX + Math.cos(a) * spd * life;
        const y = RY + Math.sin(a) * spd * life * 0.7 + life * life * 96;
        return { x, y, o: strikeFlash * (0.5 + seed(i * 3.1) * 0.5), r: 1.3 + seed(i * 4.3) * 2.4 };
      }) : [];

      // ---- IGNITION DEBRIS: slag + torn housing chunks blown outward from the core ----
      const debris = Array.from({ length: 16 }, (_, i) => {
        const a = seed(i * 1.3) * Math.PI * 2;
        const spd = 240 + seed(i * 2.1) * 440;
        const p = over(lf, IGNITE, 26 + seed(i) * 14, Easing.out(Easing.cubic));
        const dist = spd * p;
        const x = RX + Math.cos(a) * dist;
        const y = RY + Math.sin(a) * dist + p * p * 170;                 // gravity droop
        const rot = seed(i * 3.3) * 360 + p * (seed(i * 4.7) - 0.5) * 960;
        const sz = 5 + seed(i * 5.9) * 12;
        const o = Math.min(1, p * 8) * (1 - ramp(p, 0.72, 1));
        return { x, y, rot, sz, o, gold: seed(i * 6.7) > 0.62 };
      });

      // ---- ARMOUR PLATES: SLAM home during the zoom-out, still locking on after ----
      const homes = [
        { hx: 506, hy: 352, s: 1.15, gold: true,  rot: 0 },   // helmet crown
        { hx: 450, hy: 408, s: 1.0,  gold: false, rot: -18 }, // L pauldron
        { hx: 562, hy: 408, s: 1.0,  gold: false, rot: 18 },  // R pauldron
        { hx: 506, hy: 456, s: 1.1,  gold: false, rot: 0 },   // chest
        { hx: 470, hy: 548, s: 0.85, gold: false, rot: -10 }, // L thigh
        { hx: 542, hy: 548, s: 0.85, gold: false, rot: 10 },  // R thigh
        { hx: 424, hy: 486, s: 0.78, gold: true,  rot: -30 }, // L gauntlet
        { hx: 588, hy: 486, s: 0.78, gold: true,  rot: 30 },  // R gauntlet
      ];
      const plates = homes.map((h, i) => {
        const ang = seed(i * 1.7) * Math.PI * 2;
        const dist = 540 + seed(i * 2.3) * 260;
        const ex = h.hx + Math.cos(ang) * dist, ey = h.hy + Math.sin(ang) * dist;
        const p = over(lf, IGNITE + i * 0.9, 16, Easing.out(Easing.cubic));
        const x = h.hx + (ex - h.hx) * (1 - p), y = h.hy + (ey - h.hy) * (1 - p);
        const rot = h.rot + (1 - p) * (seed(i * 3.1) - 0.5) * 700;
        const op = Math.min(1, p * 7) * (1 - ramp(p, 0.88, 1));
        const lock = ramp(p, 0.82, 0.98) * (1 - ramp(p, 0.98, 1.08));
        // boot-sweep highlight ripping across each plate as the scan passes its home
        const boot = bootBand ? Math.max(0, 1 - Math.abs(h.hy - scanY) / 70) : 0;
        return { ...h, x, y, rot, op, p, lock, boot };
      });

      // ---- forge + weld sparks (deterministic) ----
      const sparks = Array.from({ length: 34 }, (_, i) => {
        const dur = 30;
        const life = ((lf * (1.1 + seed(i) * 0.6) + seed(i * 2.7) * dur) % dur) / dur;
        const a = seed(i * 1.9) * Math.PI * 2, spd = 50 + seed(i * 3.3) * 120;
        const a0 = seed(i * 4.1) * Math.PI * 2;
        const ox = RX + Math.cos(a0) * (55 + seed(i * 5) * 80);
        const oy = RY + Math.sin(a0) * (75 + seed(i * 6) * 95);
        const x = ox + Math.cos(a) * spd * life;
        const y = oy + Math.sin(a) * spd * life * 0.6 + life * life * 74;
        return { x, y, o: (1 - life) * (0.2 + lit * 0.4 + esc * 0.3), r: 1.4 + seed(i * 7) * 1.8 };
      });

      // ---- GAG: bystander rivet skitters across the forge floor (after the reveal, startled hop) ----
      const bp = ramp(lf, IGNITE + 6, 84);
      const boltX = -30 + bp * 1090;
      const boltY = 726 - Math.abs(Math.sin(lf / 5)) * 8 - kick * 22;

      return (
        <>
          {/* ================= CAMERA WORLD (macro push -> smash-zoom -> crane) ================= */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${shX}px,${shY}px) rotate(${camRot}deg) scale(${camScale})`, transformOrigin: `${RX}px ${RY}px` }}>
            <Stage lf={lf} energy={0.5 + lit * 0.42} hue="crimson" />

            {/* ===== DEEPEST BACKDROP (slowest parallax): a vast furnace hall of receding stacks fading into haze ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 3, overflow: "visible", filter: "blur(7px)", transform: `translateY(${crane * -26}px) scale(${1.05 + push * 0.02})`, transformOrigin: `${RX}px ${RY}px` }}>
              <defs>
                <linearGradient id="deepHallS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A0605" /><stop offset="58%" stopColor="#1C0B08" /><stop offset="100%" stopColor="#2C0F0A" />
                </linearGradient>
                <radialGradient id="deepGlowS0" cx="50%" cy="72%" r="62%">
                  <stop offset="0%" stopColor="#FF9A48" stopOpacity="0.62" /><stop offset="58%" stopColor="#B0341C" stopOpacity="0.24" /><stop offset="100%" stopColor="#5A140C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect x={0} y={90} width={1012} height={702} fill="url(#deepHallS0)" />
              {/* a colonnade of distant furnace stacks, each breathing its own molten mouth */}
              {Array.from({ length: 7 }, (_, i) => {
                const bx = 66 + i * 138;
                const hh = 300 + (i % 3) * 66;
                const glow = 0.28 + lit * 0.28 + esc * 0.2 + Math.sin(lf / 10 + i * 1.4) * 0.08;
                return (
                  <g key={`fst${i}`}>
                    <rect x={bx} y={520 - hh} width={68} height={hh} fill="#0D0503" opacity={0.82} />
                    <rect x={bx + 46} y={520 - hh} width={8} height={hh} fill="#050201" opacity={0.6} />
                    <rect x={bx + 15} y={480 - hh * 0.5} width={38} height={hh * 0.5} fill="url(#deepGlowS0)" opacity={Math.max(0, glow)} style={{ mixBlendMode: "screen" }} />
                  </g>
                );
              })}
              {/* far catwalk silhouette threading across the hall */}
              <rect x={0} y={430} width={1012} height={10} fill="#0A0604" opacity={0.7} />
              {Array.from({ length: 24 }, (_, i) => <rect key={`fcw${i}`} x={20 + i * 42} y={440} width={5} height={26} fill="#0A0604" opacity={0.55} />)}
              {/* deep atmospheric haze pooling in the hall */}
              <rect x={0} y={352} width={1012} height={290} fill="url(#deepGlowS0)" opacity={0.15 + esc * 0.12} style={{ mixBlendMode: "screen" }} />
            </svg>

            {/* ===== DEEP BACKWALL (deep parallax): molten furnace slit + brick kiln, DOF-blurred ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 4, overflow: "visible", filter: "blur(5px)", transform: `translateY(${crane * -18}px) scale(${1 + push * 0.03})`, transformOrigin: `${RX}px ${RY}px` }}>
              <defs>
                <linearGradient id="wallS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#160A08" /><stop offset="55%" stopColor="#2A100C" /><stop offset="100%" stopColor="#3E1610" />
                </linearGradient>
                <radialGradient id="moltenS0" cx="50%" cy="60%" r="60%">
                  <stop offset="0%" stopColor="#FFE7A0" /><stop offset="34%" stopColor="#FF8A3C" /><stop offset="70%" stopColor="#C22E1E" /><stop offset="100%" stopColor="#5A140C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect x={0} y={120} width={1012} height={672} fill="url(#wallS0)" />
              {/* dark brick kiln rows */}
              <g opacity={0.5}>
                {Array.from({ length: 9 }, (_, r) => Array.from({ length: 14 }, (_, c) => (
                  <rect key={`bk${r}-${c}`} x={-20 + c * 78 + (r % 2) * 39} y={150 + r * 60} width={72} height={54} fill="none" stroke="#120806" strokeWidth={3} />
                )))}
              </g>
              {/* the molten furnace mouth breathing behind the hero */}
              <ellipse cx={506} cy={470} rx={250 + Math.sin(lf / 9) * 14} ry={300 + Math.cos(lf / 11) * 12} fill="url(#moltenS0)" opacity={0.5 + lit * 0.28 + esc * 0.12} style={{ mixBlendMode: "screen" }} />
              {/* lava seams cracking through the brick */}
              <g stroke="#FF7A32" strokeWidth={3} strokeLinecap="round" opacity={0.4 + esc * 0.3} style={{ mixBlendMode: "screen" }}>
                <path d="M120,300 L180,360 L150,430 L210,500" fill="none" />
                <path d="M860,280 L810,350 L850,410 L800,480" fill="none" />
                <path d="M300,700 L360,640 L340,580" fill="none" />
              </g>
            </svg>

            {/* ===== FORESHADOW: the villain's cyclops optic smouldering in the deep catwalk shadow ===== */}
            {eyeVis > 0.01 && (
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 7, overflow: "visible", filter: "blur(0.6px)" }}>
                <g opacity={eyeVis} style={{ mixBlendMode: "screen" }}>
                  <ellipse cx={300} cy={330} rx={78} ry={30} fill="#1E6E68" opacity={0.55} style={{ filter: "blur(18px)" }} />
                  <rect x={262} y={324} width={76} height={7} rx={3.5} fill="#5AD9C6" />
                  <rect x={262} y={323} width={76} height={9} rx={4.5} fill="#EAFFFB" opacity={0.35 + 0.4 * Math.abs(Math.sin(lf * 0.8))} style={{ filter: "blur(2.5px)" }} />
                  <rect x={288} y={325} width={24} height={5} rx={2.5} fill="#FF5648" opacity={0.45 * Math.max(0, Math.sin(lf * 0.5))} />
                </g>
              </svg>
            )}

            {/* ===== FAR MIDGROUND: exposed pipework, a crossing catwalk, valve wheels, hazard columns, heavy load chains ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "visible", filter: "blur(3.4px)", transform: `translateY(${crane * -14}px)`, transformOrigin: `${RX}px ${RY}px` }}>
              <defs>
                <linearGradient id="pipeS0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0A0F15" /><stop offset="45%" stopColor="#28323D" /><stop offset="100%" stopColor="#0A0F15" />
                </linearGradient>
              </defs>
              {/* banks of exposed pipework climbing both walls, with flange collars */}
              {[64, 112, 900, 948].map((px, i) => (
                <g key={`pp${i}`}>
                  <rect x={px} y={150} width={20} height={642} fill="url(#pipeS0)" stroke="#05080C" strokeWidth={2} />
                  {Array.from({ length: 8 }, (_, j) => <rect key={`pf${i}-${j}`} x={px - 5} y={192 + j * 74} width={30} height={8} rx={2} fill="#0B1119" />)}
                </g>
              ))}
              {/* a mid-height catwalk with railing + grated deck crossing behind the hero */}
              <g opacity={0.9}>
                <rect x={0} y={352} width={1012} height={12} fill="#10161E" />
                <rect x={0} y={344} width={1012} height={4} fill="#1E2833" />
                {Array.from({ length: 26 }, (_, i) => <rect key={`crg${i}`} x={20 + i * 38} y={318} width={4} height={30} fill="#151D26" />)}
                <rect x={0} y={314} width={1012} height={4} fill="#232E3A" />
                {Array.from({ length: 40 }, (_, i) => <rect key={`grt${i}`} x={i * 26} y={354} width={12} height={9} fill="#070B10" opacity={0.7} />)}
              </g>
              {/* big spoked valve wheels bolted to the walls */}
              {[{ x: 90, y: 300 }, { x: 922, y: 300 }].map((v, i) => (
                <g key={`vw${i}`} stroke="#243039" strokeWidth={5} fill="none" opacity={0.85}>
                  <circle cx={v.x} cy={v.y} r={30} />
                  <circle cx={v.x} cy={v.y} r={9} fill="#0C1219" />
                  {Array.from({ length: 6 }, (_, k) => { const a = k * Math.PI / 3; return <line key={`vs${i}-${k}`} x1={v.x + Math.cos(a) * 9} y1={v.y + Math.sin(a) * 9} x2={v.x + Math.cos(a) * 30} y2={v.y + Math.sin(a) * 30} />; })}
                </g>
              ))}
              {/* heavy load chains hanging from the ceiling, slow independent sway */}
              {[264, 430, 596, 762].map((cx, k) => (
                <g key={`hc${k}`} transform={`rotate(${Math.sin(lf / 24 + k) * 2} ${cx} 166)`}>
                  {Array.from({ length: 13 }, (_, i) => <ellipse key={`hcl${k}-${i}`} cx={cx} cy={174 + i * 15} rx={6} ry={9} fill="none" stroke="#0C1119" strokeWidth={4} opacity={0.85} />)}
                </g>
              ))}
              {/* hazard-striped structural columns flanking the floor */}
              {[38, 950].map((cx, i) => (
                <g key={`hcz${i}`}>
                  <rect x={cx} y={470} width={22} height={322} fill="#0B0F16" stroke="#05080C" strokeWidth={2} />
                  {Array.from({ length: 9 }, (_, j) => <rect key={`hs${i}-${j}`} x={cx} y={476 + j * 34} width={22} height={15} fill={j % 2 ? "#7A5E1A" : "#0B0F16"} opacity={0.55} />)}
                </g>
              ))}
            </svg>

            {/* ===== FAR LAYER (depth-of-field blurred): spotlights, gantry, embers, dais, haze ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 6, overflow: "visible", filter: "blur(2.6px)", transform: `translateY(${crane * -10}px)` }}>
              <defs>
                <linearGradient id="spotS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF3D8" stopOpacity="0" />
                  <stop offset="10%" stopColor="#FFEFCB" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#FFE1A6" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="daisS0" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF6DE" /><stop offset="45%" stopColor="#E7B24C" /><stop offset="100%" stopColor="#7A4A16" />
                </radialGradient>
                <linearGradient id="hazeS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C24339" stopOpacity="0" />
                  <stop offset="100%" stopColor="#7A2A20" stopOpacity="0.55" />
                </linearGradient>
              </defs>

              {/* three key spotlights raking down onto the dais */}
              {[{ ax: 330, bx: 466 }, { ax: 506, bx: 506 }, { ax: 686, bx: 548 }].map((c, i) => (
                <polygon key={`sp${i}`} points={`${c.ax - 16},132 ${c.ax + 16},132 ${c.bx + 156},662 ${c.bx - 156},662`} fill="url(#spotS0)" opacity={0.42 + lit * 0.5 + flash * 0.4 + esc * 0.14} style={{ mixBlendMode: "screen" }} />
              ))}

              {/* DEEPER industrial gantry: twin side towers + overhead trusses + hanging chain-hoists */}
              <g fill="#090D14" stroke="#1B2430" strokeWidth={2}>
                <rect x={20} y={150} width={30} height={642} />
                <rect x={962} y={150} width={30} height={642} />
                <rect x={70} y={150} width={16} height={642} opacity={0.7} />
                <rect x={926} y={150} width={16} height={642} opacity={0.7} />
                <polygon points="20,150 50,150 118,214 88,214" />
                <polygon points="992,150 962,150 894,214 924,214" />
                <rect x={-4} y={150} width={1020} height={16} />
                <rect x={-4} y={206} width={1020} height={10} opacity={0.8} />
              </g>
              {/* criss-cross truss webbing across the ceiling for depth */}
              <g stroke="#141C26" strokeWidth={3} opacity={0.8}>
                {Array.from({ length: 12 }, (_, i) => <line key={`tr${i}`} x1={30 + i * 84} y1={166} x2={30 + i * 84 + 84} y2={206} />)}
                {Array.from({ length: 12 }, (_, i) => <line key={`tr2${i}`} x1={30 + i * 84 + 84} y1={166} x2={30 + i * 84} y2={206} />)}
              </g>
              {/* two hanging chain hoists + swaying hooks */}
              {[210, 806].map((cx, k) => (
                <g key={`ho${k}`} stroke="#0C1119" strokeWidth={5} opacity={0.9}>
                  <line x1={cx} y1={166} x2={cx} y2={250} />
                  {Array.from({ length: 6 }, (_, i) => <circle key={`ch${k}-${i}`} cx={cx} cy={180 + i * 14} r={5} fill="none" />)}
                </g>
              ))}
              <path d="M198,250 Q210,236 222,250 L222,262 Q210,276 198,262 Z" fill="#121A24" stroke="#26303C" strokeWidth={2} opacity={0.9} transform={`rotate(${Math.sin(lf / 26) * 3} 210 250)`} />
              <path d="M794,250 Q806,236 818,250 L818,262 Q806,276 794,262 Z" fill="#121A24" stroke="#26303C" strokeWidth={2} opacity={0.9} transform={`rotate(${Math.sin(lf / 21 + 1) * 3} 806 250)`} />

              {/* MORE rising embers (particulate) */}
              {Array.from({ length: 34 }, (_, i) => { const sd = seed(i + 9); const x = 90 + seed(i * 2.2) * 832; const yy = 782 - ((lf * (0.8 + sd * 1.4) + seed(i * 1.3) * 782) % 782); return (
                <circle key={`em${i}`} cx={x + Math.sin(lf / 12 + i) * 8} cy={yy} r={1.2 + sd * 2} fill={sd > 0.6 ? "#FFE0A0" : "#FFC271"} opacity={(0.12 + sd * 0.3 + esc * 0.18) * (yy > 300 ? 1 : yy / 300)} />); })}

              {/* volumetric haze rising off the forge floor */}
              <rect x={0} y={430} width={1012} height={362} fill="url(#hazeS0)" opacity={0.22 + esc * 0.3} style={{ mixBlendMode: "screen" }} />

              {/* the hero dais: warm forge ring flashing cyan on ignition */}
              <ellipse cx={506} cy={648} rx={196} ry={44} fill="none" stroke="url(#daisS0)" strokeWidth={7} opacity={0.72} />
              <ellipse cx={506} cy={648} rx={140} ry={30} fill="none" stroke="#E7B24C" strokeWidth={3} opacity={0.4 + 0.2 * Math.sin(lf / 7)} />
              <ellipse cx={506} cy={648} rx={200} ry={48} fill="#7FE8FF" opacity={0.22 * lit} style={{ filter: "blur(10px)" }} />
              <ellipse cx={506} cy={648} rx={210} ry={54} fill="none" stroke="#BFF6FF" strokeWidth={4} opacity={lit * (0.4 + 0.3 * Math.sin(lf / 4))} />

              {/* hazard stripes on the floor lip */}
              {Array.from({ length: 14 }, (_, i) => (
                <polygon key={`hz${i}`} points={`${60 + i * 66},780 ${88 + i * 66},780 ${68 + i * 66},792 ${40 + i * 66},792`} fill={i % 2 ? "#0B0F16" : "#8A6A1E"} opacity={0.5} />
              ))}

              {/* hero underglow (amber forge -> cyan reactor) */}
              <ellipse cx={RX} cy={RY} rx={170} ry={210} fill="#C24339" opacity={0.16 + esc * 0.1} style={{ filter: "blur(26px)" }} />
              <ellipse cx={RX} cy={RY} rx={90 + lit * 90} ry={120 + lit * 130} fill="#7FE8FF" opacity={lit * 0.4} style={{ filter: "blur(22px)" }} />
            </svg>

            {/* ===== VOLUMETRIC GOD-RAYS (sweep + intensify, sharper twin-tint) ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 8, overflow: "visible" }}>
              <defs>
                <linearGradient id="grayS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF0C6" stopOpacity="0.72" />
                  <stop offset="46%" stopColor="#FFC271" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#FFC271" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grayCoolS0" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CFF4FF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7FE8FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 8 }, (_, i) => {
                const sway = Math.sin(lf / 34 + i * 1.3) * 26;
                const topX = 110 + i * 112 + sway;
                const inten = (0.14 + esc * 0.28 + flash * 0.6) * (0.5 + 0.5 * Math.sin(lf / 20 + i));
                const cool = i % 2 === 0;
                return <polygon key={`gr${i}`} points={`${topX - 26},128 ${topX + 26},128 ${topX + 128},792 ${topX - 128},792`} fill={cool ? "url(#grayCoolS0)" : "url(#grayS0)"} opacity={Math.max(0, inten) * (cool ? 0.5 + lit * 0.5 : 1)} style={{ mixBlendMode: "screen" }} />;
              })}
            </svg>

            {/* ===== NEAR FOREGROUND SILHOUETTES (fastest parallax, heavy DOF): cable drape, pipe elbow, gantry leg, hoist block framing the corners ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 9, overflow: "visible", filter: "blur(7px)", transform: `translate(${push * 8 - crane * 4}px, ${crane * 11}px) scale(1.06)`, transformOrigin: `${RX}px ${RY}px`, pointerEvents: "none" }}>
              {/* top-left cable bundle draping into frame */}
              <g stroke="#05070B" fill="none" opacity={0.92}>
                <path d="M-40,-60 Q90,30 30,182" strokeWidth={11} />
                <path d="M-40,-20 Q120,60 58,222" strokeWidth={16} />
                <path d="M-40,20 Q152,80 110,242" strokeWidth={12} />
              </g>
              {/* top-right heavy pipe elbow bending out of frame */}
              <g fill="#06090D" stroke="#0E141C" strokeWidth={3} opacity={0.95}>
                <path d="M1054,-20 L1054,178 Q1054,250 982,250 L900,250 L900,198 L972,198 Q1004,198 1004,148 L1004,-20 Z" />
                <rect x={896} y={194} width={16} height={60} fill="#0A0F16" />
              </g>
              {/* bottom-left foreground gantry leg anchoring the corner */}
              <g fill="#04060A" opacity={0.95}>
                <polygon points="-20,812 122,812 82,540 42,540" />
                <rect x={32} y={560} width={72} height={14} />
                <rect x={42} y={642} width={62} height={12} />
              </g>
              {/* right-side chain-hoist block hanging into the top of frame */}
              <g opacity={0.9}>
                {Array.from({ length: 8 }, (_, i) => <ellipse key={`fch${i}`} cx={884} cy={-12 + i * 18} rx={7} ry={11} fill="none" stroke="#05080C" strokeWidth={5} />)}
                <rect x={860} y={138} width={48} height={60} rx={6} fill="#05080C" />
                <polygon points="884,198 870,222 898,222" fill="#05080C" />
              </g>
            </svg>

            {/* ================= THE HERO (sharp; focus-pulls in as the reactor lights) ================= */}
            <div style={{ position: "absolute", inset: 0, zIndex: 30, filter: `blur(${(1 - lit) * 1.4}px)`, transform: `scale(${1 + kick * 0.06 + Math.sin(lf / 9) * 0.006 * esc})`, transformOrigin: `${RX}px ${RY}px` }}>
              <IronClaude lf={lf} size={380} left={392} top={258} pose={pose} core={core} />
            </div>

            {/* ================= FRONT LAYER: reticles, plates, sparks, shock, debris, speed-lines, seal, bolt ================= */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 34, overflow: "visible" }}>
              <defs>
                <linearGradient id="pcrimS0" x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor="#C24339" /><stop offset="60%" stopColor="#9E2E27" /><stop offset="100%" stopColor="#6E1E1A" />
                </linearGradient>
                <linearGradient id="pgoldS0" x1="0.2" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor="#F1CE7A" /><stop offset="50%" stopColor="#E0AC45" /><stop offset="100%" stopColor="#B07E28" />
                </linearGradient>
              </defs>

              {/* HUD target reticles + guide beams (JARVIS assembly read) */}
              {plates.map((p, i) => (
                <g key={`ret${i}`}>
                  {p.p > 0.05 && p.p < 0.94 && <line x1={p.x} y1={p.y} x2={p.hx} y2={p.hy} stroke="#7FE8FF" strokeWidth={1.4} strokeDasharray="4 7" opacity={0.35 * p.op} />}
                  {p.lock > 0.02 && <g stroke="#7FE8FF" strokeWidth={2} fill="none" opacity={p.lock * 0.9}>
                    <path d={`M${p.hx - 20},${p.hy - 20} h-9 v9`} /><path d={`M${p.hx + 20},${p.hy - 20} h9 v9`} />
                    <path d={`M${p.hx - 20},${p.hy + 20} h-9 v-9`} /><path d={`M${p.hx + 20},${p.hy + 20} h9 v-9`} />
                  </g>}
                </g>
              ))}

              {/* the armour plates, slamming home (with boot-sweep specular rip) */}
              {plates.map((p, i) => (
                <g key={`pl${i}`} transform={`translate(${p.x},${p.y}) rotate(${p.rot}) scale(${p.s})`} opacity={p.op}>
                  <path d="M -28 -18 L 24 -22 L 32 12 L -20 22 Z" fill={`url(#${p.gold ? "pgoldS0" : "pcrimS0"})`} stroke={p.gold ? "#8A5F18" : "#5A1815"} strokeWidth={2} />
                  <path d="M -28 -18 L 24 -22" stroke="rgba(255,225,170,0.75)" strokeWidth={3} strokeLinecap="round" />
                  <path d="M -18 -12 L 14 -15" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeLinecap="round" />
                  {p.boot > 0.02 && <path d="M -28 -18 L 24 -22 L 32 12 L -20 22 Z" fill="#EAFDFF" opacity={p.boot * 0.6} style={{ mixBlendMode: "screen" }} />}
                  {p.lock > 0.02 && <circle cx={0} cy={0} r={20 + p.lock * 18} fill="none" stroke="#EAFDFF" strokeWidth={3} opacity={p.lock * 0.9} />}
                </g>
              ))}

              {/* forge + weld sparks */}
              {sparks.map((s, i) => s.o > 0.02 && (
                <circle key={`sk${i}`} cx={s.x} cy={s.y} r={s.r} fill={i % 3 ? "#FFD37A" : "#FFF2CC"} opacity={s.o} />
              ))}

              {/* STRIKE pre-beat: white spark shower off the anvil */}
              {strikeSparks.map((s, i) => s.o > 0.02 && (
                <circle key={`ssk${i}`} cx={s.x} cy={s.y} r={s.r} fill={i % 2 ? "#FFFFFF" : "#FFE7A0"} opacity={s.o} style={{ mixBlendMode: "screen" }} />
              ))}

              {/* IGNITION DEBRIS: torn slag chunks blasted outward, hot leading edge */}
              {debris.map((d, i) => d.o > 0.02 && (
                <g key={`db${i}`} transform={`translate(${d.x},${d.y}) rotate(${d.rot})`} opacity={d.o}>
                  <polygon points={`${-d.sz},${-d.sz * 0.6} ${d.sz},${-d.sz * 0.4} ${d.sz * 0.7},${d.sz * 0.7} ${-d.sz * 0.8},${d.sz * 0.5}`} fill={d.gold ? "#C08A2E" : "#191D22"} stroke="#0A0C0E" strokeWidth={1.5} />
                  <path d={`M${-d.sz},${-d.sz * 0.6} L${d.sz},${-d.sz * 0.4}`} stroke={d.gold ? "#FFE7A0" : "#FF7A32"} strokeWidth={2} strokeLinecap="round" opacity={0.9} />
                </g>
              ))}

              {/* ignition burst rays */}
              {bprog > 0 && bprog < 1 && Array.from({ length: 26 }, (_, i) => {
                const a = (i / 26) * Math.PI * 2 + lf * 0.02;
                const r0 = 26 + bprog * 90, r1 = 26 + bprog * 340;
                return <line key={`br${i}`} x1={RX + Math.cos(a) * r0} y1={RY + Math.sin(a) * r0} x2={RX + Math.cos(a) * r1} y2={RY + Math.sin(a) * r1} stroke={i % 2 ? "#BFF6FF" : "#FFF2CC"} strokeWidth={(1 - bprog) * 4 + 1} strokeLinecap="round" opacity={(1 - bprog) * 0.9} />;
              })}

              {/* RADIAL SPEED-LINES snapping out of the detonation */}
              {speedln > 0 && speedln < 1 && Array.from({ length: 44 }, (_, i) => {
                const a = (i / 44) * Math.PI * 2 + seed(i) * 0.28;
                const r0 = 70 + speedln * 300;
                const r1 = r0 + 150 + seed(i * 2.2) * 300;
                const o = (1 - speedln) * 0.85 * (0.4 + seed(i * 3.3) * 0.6);
                return <line key={`sl${i}`} x1={RX + Math.cos(a) * r0} y1={RY + Math.sin(a) * r0} x2={RX + Math.cos(a) * r1} y2={RY + Math.sin(a) * r1} stroke={i % 3 ? "#EAFDFF" : "#BFF6FF"} strokeWidth={(1 - speedln) * 2.6 + 0.5} strokeLinecap="round" opacity={o} style={{ mixBlendMode: "screen" }} />;
              })}

              {/* shockwave rings + late power-sealed ring */}
              {shock > 0 && shock < 1 && <circle cx={RX} cy={RY} r={40 + shock * 580} fill="none" stroke="#BFF6FF" strokeWidth={(1 - shock) * 13 + 2} opacity={(1 - shock) * 0.9} />}
              {shock2 > 0 && shock2 < 1 && <circle cx={RX} cy={RY} r={30 + shock2 * 620} fill="none" stroke="#E7B24C" strokeWidth={(1 - shock2) * 8 + 2} opacity={(1 - shock2) * 0.6} />}
              {seal > 0 && seal < 1 && <circle cx={RX} cy={RY} r={60 + seal * 360} fill="none" stroke="#E7B24C" strokeWidth={(1 - seal) * 7 + 2} opacity={(1 - seal) * 0.55} />}

              {/* ===== SECOND BEAT: HUD BOOT-UP SWEEP scanning down the armor ===== */}
              {bootBand && <g style={{ mixBlendMode: "screen" }}>
                <rect x={356} y={scanY - 4} width={300} height={8} fill="#BFF6FF" opacity={0.55 * bootGlow} />
                <rect x={356} y={scanY - 22} width={300} height={44} fill="#7FE8FF" opacity={0.16 * bootGlow} style={{ filter: "blur(6px)" }} />
                <line x1={356} y1={scanY} x2={656} y2={scanY} stroke="#EAFDFF" strokeWidth={1.5} opacity={0.9 * bootGlow} strokeDasharray="3 6" />
                {/* diagnostic tick readouts riding the scan edge */}
                {Array.from({ length: 5 }, (_, i) => <rect key={`tk${i}`} x={360 + i * 68} y={scanY - 3} width={10 + (i % 3) * 8} height={6} fill="#7FE8FF" opacity={0.7 * bootGlow} />)}
              </g>}
              {/* systems-nominal confirm flare over the reactor */}
              {online > 0 && online < 1 && <g opacity={Math.sin(online * Math.PI)}>
                <circle cx={RX} cy={RY} r={34} fill="none" stroke="#BFF6FF" strokeWidth={3} opacity={0.8} />
                <path d={`M${RX - 14},${RY} l9,10 l18,-22`} fill="none" stroke="#EAFDFF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              </g>}

              {/* GAG: bystander rivet skittering across the floor */}
              <g transform={`translate(${boltX},${boltY}) rotate(${lf * 22})`} opacity={0.92 * Math.min(1, bp * 6)}>
                <g stroke="rgba(255,255,255,0.35)" strokeWidth={2} strokeLinecap="round" opacity={0.5}>
                  <line x1={-30} y1={-6} x2={-16} y2={-6} /><line x1={-34} y1={4} x2={-18} y2={4} />
                </g>
                <polygon points="12,0 6,10 -6,10 -12,0 -6,-10 6,-10" fill="#8A9095" stroke="#3A4145" strokeWidth={2} />
                <polygon points="7,0 3.5,6 -3.5,6 -7,0 -3.5,-6 3.5,-6" fill="#2A3033" />
                <path d="M12,0 L6,-10 L-6,-10" stroke="#D6DCE0" strokeWidth={2} fill="none" opacity={0.8} />
              </g>
            </svg>

            {/* ===== FG STREAK PLANE: embers/sparks streaking past the lens (blurred, large, own fast drift) ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 39, overflow: "visible", filter: "blur(3px)", pointerEvents: "none" }}>
              {Array.from({ length: 14 }, (_, i) => {
                const sd = seed(i + 31);
                const dur = 22 + sd * 20;
                const life = ((lf * (2.2 + sd * 1.6) + seed(i * 2.1) * dur) % dur) / dur;
                const y0 = 120 + seed(i * 3.7) * 620 + Math.sin(lf / 8 + i) * 30;
                const x = 1140 - life * 1360 * (0.8 + sd * 0.5);
                const len = 60 + sd * 130;
                const o = Math.max(0, Math.min(1, (1 - life) * life * 4)) * (0.28 + esc * 0.42 + flash * 0.3);
                return <line key={`fs${i}`} x1={x} y1={y0} x2={x + len} y2={y0 - len * 0.22} stroke={sd > 0.5 ? "#FFC271" : "#FFE7A0"} strokeWidth={2.4 + sd * 3.2} strokeLinecap="round" opacity={o} style={{ mixBlendMode: "screen" }} />;
              })}
            </svg>

            {/* ===== NEAR FOREGROUND BOKEH (out-of-focus depth-of-field embers) ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none" }}>
              {Array.from({ length: 9 }, (_, i) => { const sd = seed(i + 21); const x = 60 + seed(i * 3.1) * 880; const yy = 812 - ((lf * (0.5 + sd * 0.9) + seed(i * 1.7) * 812) % 812); const r = 12 + sd * 18; return (
                <div key={`fg${i}`} style={{ position: "absolute", left: x - r, top: yy - r, width: r * 2, height: r * 2, borderRadius: "50%", background: sd > 0.5 ? "radial-gradient(circle, rgba(255,190,110,0.55) 0%, transparent 70%)" : "radial-gradient(circle, rgba(127,232,255,0.4) 0%, transparent 70%)", filter: "blur(8px)", opacity: 0.45 * (0.4 + esc * 0.5), mixBlendMode: "screen" }} />); })}
            </div>

            {/* ===== NEAR-BLACK VEIL (the closeup) - dead black at frame 0, lifts on ignition ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 42, pointerEvents: "none", background: `radial-gradient(26% 22% at ${RX}px ${RY}px, rgba(4,7,12,${dark * 0.62}) 0%, rgba(1,2,4,${dark}) 60%)` }} />

            {/* ===== THE DARK ARC-REACTOR closeup graphic: white-hot back-seam (frame-0 hero image) -> charge -> blaze ===== */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 45, overflow: "visible" }}>
              <defs>
                <linearGradient id="rgoldS0" x1="0.2" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor="#F1CE7A" /><stop offset="50%" stopColor="#C08A2E" /><stop offset="100%" stopColor="#7A5417" />
                </linearGradient>
                <radialGradient id="rcoreS0" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EAFDFF" /><stop offset="45%" stopColor="#7FE8FF" /><stop offset="100%" stopColor="#1B6C86" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="seamS0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF7A32" stopOpacity="0" />
                  <stop offset="30%" stopColor="#FFB25A" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFB25A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FF7A32" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* the searing white-hot molten seam blazing behind the dormant reactor - owns the black frame 0 */}
              <g opacity={closeupOn} style={{ mixBlendMode: "screen" }}>
                <rect x={RX - 300} y={RY - 3} width={600} height={6} fill="url(#seamS0)" opacity={seam} style={{ filter: `blur(${1 + seam * 1.5}px)` }} />
                <rect x={RX - 300} y={RY - 12} width={600} height={24} fill="url(#seamS0)" opacity={seam * 0.4} style={{ filter: "blur(10px)" }} />
                <circle cx={RX} cy={RY} r={20 + charge * 40} fill="url(#rcoreS0)" opacity={0.3 + charge * 0.5} style={{ filter: "blur(6px)" }} />
              </g>
              {/* dormant housing silhouette with a hard cyan rim-light on its upper-left edge (high-contrast edge) */}
              <g opacity={closeupOn}>
                <circle cx={RX} cy={RY} r={116} fill="#040608" stroke="url(#rgoldS0)" strokeWidth={11} />
                <path d={`M${RX - 82} ${RY - 82} A116 116 0 0 1 ${RX + 40} ${RY - 109}`} fill="none" stroke="#BFF6FF" strokeWidth={4} strokeLinecap="round" opacity={0.5 + charge * 0.4} style={{ filter: "blur(0.6px)" }} />
                <circle cx={RX} cy={RY} r={116} fill="none" stroke="#2A1E10" strokeWidth={11} strokeDasharray="5 34" opacity={0.6} />
                <circle cx={RX} cy={RY} r={92} fill="none" stroke="#16202C" strokeWidth={7} />
                {/* the three charging coils, spinning brighter into ignition */}
                {Array.from({ length: 3 }, (_, i) => { const a = i * (Math.PI * 2 / 3) + Math.PI / 2 + lf * 0.04 * charge; return <line key={`co${i}`} x1={RX + Math.cos(a) * 34} y1={RY + Math.sin(a) * 34} x2={RX + Math.cos(a) * 76} y2={RY + Math.sin(a) * 76} stroke={charge > 0.35 ? "#7FE8FF" : "#123244"} strokeWidth={9} strokeLinecap="round" opacity={0.5 + charge * 0.5} style={{ filter: charge > 0.35 ? `blur(${charge}px)` : "none" }} />; })}
                <circle cx={RX} cy={RY} r={40} fill="#06121A" stroke="#123244" strokeWidth={4} />
                {/* faint cyan heartbeat, rising with the charge */}
                <circle cx={RX} cy={RY} r={26} fill="#7FE8FF" opacity={heart + charge * 0.4} style={{ filter: "blur(4px)" }} />
                <circle cx={RX} cy={RY} r={12} fill="#EAFDFF" opacity={heart * 0.9 + charge * 0.5} />
              </g>
              {/* ignited core bloom (persists as the reactor blazes) */}
              {lit > 0 && <g>
                <circle cx={RX} cy={RY} r={(40 + lit * 72) * bloomK} fill="url(#rcoreS0)" opacity={lit * (1 - wideNow * 0.28)} style={{ filter: "blur(6px)", mixBlendMode: "screen" }} />
                <circle cx={RX} cy={RY} r={(20 + lit * 16) * bloomK} fill="#EAFDFF" opacity={lit * (1 - wideNow * 0.55)} />
              </g>}
            </svg>

            {/* ===== COMPLEMENTARY COLOR GRADE (cool reactor center / warm forge base) ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 46, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(66% 58% at ${RX}px ${RY}px, rgba(127,232,255,${0.05 + lit * 0.15}) 0%, transparent 54%), radial-gradient(120% 120% at 50% 122%, rgba(194,67,57,${0.12 + esc * 0.14}) 0%, transparent 60%)` }} />

            {/* ===== MOODY VIGNETTE ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 47, pointerEvents: "none", boxShadow: "inset 0 0 240px rgba(4,6,10,0.82)" }} />

            {/* ===== IGNITION LIGHT-BOMB: wide bloom + near-fullscreen detonation pop + anamorphic streak ===== */}
            {flash > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 48, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(56% 50% at ${RX}px ${RY}px, rgba(255,252,240,${flash * 0.68}) 0%, rgba(191,246,255,${flash * 0.34}) 42%, transparent 76%)` }} />}
            {whiteBomb > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 48, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(120% 110% at ${RX}px ${RY}px, rgba(255,255,255,${whiteBomb * 0.78}) 0%, rgba(234,253,255,${whiteBomb * 0.4}) 46%, transparent 80%)` }} />}
            {flash > 0 && <div style={{ position: "absolute", left: 0, top: RY - 3, width: "100%", height: 6, zIndex: 49, pointerEvents: "none", mixBlendMode: "screen", transform: `scaleX(${0.4 + flash})`, transformOrigin: `${RX}px 50%`, background: `linear-gradient(90deg, transparent, rgba(191,246,255,${flash * 0.9}) 45%, rgba(234,253,255,${flash}) 50%, rgba(191,246,255,${flash * 0.9}) 55%, transparent)`, filter: `blur(${2 + flash * 3}px)` }} />}

            {/* ===== CHROMATIC SHOCK: red/cyan channel split fringing the blast ===== */}
            {kick > 0.02 && <div style={{ position: "absolute", inset: 0, zIndex: 49, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(42% 36% at ${RX - 16 * kick}px ${RY}px, rgba(255,44,44,${kick * 0.5}) 0%, transparent 60%), radial-gradient(42% 36% at ${RX + 16 * kick}px ${RY}px, rgba(40,180,255,${kick * 0.5}) 0%, transparent 60%)` }} />}
          </div>

          {/* ===== SCREEN-SPACE FILM GRAIN (constant, post-process) ===== */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 58, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.12 + esc * 0.04 }}>
            <filter id="grainS0">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(lf) % 8} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grainS0)" />
          </svg>

          {/* ===== status tag (armour online) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 59, opacity: over(lf, IGNITE + 10, 12), pointerEvents: "none" }}>
            <Pill text="ARMOR ONLINE" x={44} y={706} />
          </div>
        </>
      );
    })()}

      {/* ===== FLASH-FORWARD GLIMPSE: the finished JARVIS dashboard (the end result) ===== */}
      {(() => {
        const gIn = over(lf, 44, 8);
        const gOut = over(lf, 70, 10);
        const vis = gIn * (1 - gOut);
        if (vis < 0.01) return null;
        const rev = over(lf, 45, 16);
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 120, opacity: vis }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 44%, rgba(10,20,32,0.96), #05080d 78%)" }} />
            <JarvisDashboard lf={lf} reveal={rev} scale={0.98} cx={506} cy={452} />
            <div style={{ position: "absolute", left: 40, top: 150, right: 40, textAlign: "center", fontFamily: mono, fontSize: 20, letterSpacing: 3, color: "rgba(127,232,255,0.8)" }}>END RESULT // PART 1</div>
          </div>
        );
      })()}
    </Panel>
);

const S1: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="dawn // patrol">
    {(() => {
      // ================= MASTER CLOCK (2.86s ~ 86f) =================
      const esc = ramp(lf, 0, 86);                                   // 0 -> 1 escalation
      const dawn = over(lf, 2, 30, Easing.inOut(Easing.cubic));      // night -> dawn
      const flyE = over(lf, 0, 86, Easing.inOut(Easing.cubic));      // eased forward flight
      const diveEnv = Math.sin(over(lf, 0, 86) * Math.PI);          // 0 ->1(mid)->0  dive & pull-up
      const gate = Math.sin(Math.max(0, Math.min(1, (lf - 30) / 26)) * Math.PI); // twin-tower squeeze beat
      const pull = over(lf, 60, 26, Easing.out(Easing.cubic));       // 3rd-act pull-up into the light
      const flare = Math.sin(Math.max(0, Math.min(1, (lf - 40) / 40)) * Math.PI); // anamorphic sun-flare bloom
      const chan = (a: number, b: number) => Math.round(interpolate(dawn, [0, 1], [a, b]));

      // ================= TRACKING CAMERA (banked dive) =================
      const CX = 506, CY = 470;
      const pan = flyE * 1300;                                       // world rushes left
      const zoom = 1.06 + diveEnv * 0.14 + esc * 0.03 + gate * 0.05; // push-in peaks mid-dive + gate squeeze
      const worldBank = -diveEnv * 9 - Math.sin(lf / 19) * 1.6 - gate * 3; // dutch-tilt swing
      const climb = diveEnv * 30;                                    // vertical plunge dip
      const rush = 0.35 + diveEnv * 0.65 + esc * 0.15 + gate * 0.3;  // instantaneous speed
      const nearBlur = 2.2 + rush * 4.2, foreBlur = 8 + rush * 5;    // depth-of-field
      const camXform = (px: number, py: number) =>
        `translate(${CX}px,${CY}px) rotate(${worldBank}deg) scale(${zoom}) translate(${-CX}px,${-CY}px) translate(${px}px,${py}px)`;
      const XF_DEEP = camXform(-pan * 0.03, climb * 0.08);           // farthest mega-towers (aerial haze)
      const XF_SKY = camXform(-pan * 0.06, climb * 0.15);
      const XF_CLOUD = camXform(-pan * 0.12, climb * 0.24);
      const XF_BACK = camXform(-pan * 0.20, climb * 0.35);
      const XF_TRAFFIC = camXform(-pan * 0.5, climb * 0.5);          // flying traffic between layers
      const XF_NEAR = camXform(-pan * 0.80, climb * 0.70);
      const XF_GATE = camXform(-pan * 1.02, climb * 0.86);
      const XF_FORE = camXform(-pan * 1.25, climb * 1.00);
      const XF_FORE2 = camXform(-pan * 1.42, climb * 1.08);          // extreme-near spires + embers

      // ================= HERO: banking hard through the dive =================
      const HEROS = 236, figW = 142, figH = 236;
      const heroX = 372 + flyE * 150 + Math.sin(lf / 11) * 6;
      const heroY = 300 + diveEnv * 48 - over(lf, 60, 26) * 26 + Math.sin(lf / 9) * 4; // dive -> pull-up
      const rollPulse = Math.sin(Math.max(0, Math.min(1, (lf - 34) / 18)) * Math.PI);  // bank-roll accent
      const heroRot = 10 + diveEnv * 18 + Math.sin(lf / 13) * 4 + rollPulse * 30;       // lean into it
      const reactor = 0.16 + 0.07 * Math.abs(Math.sin(lf / 3.4)) + esc * 0.05 + gate * 0.06;
      const tLen = 150 + esc * 120 + diveEnv * 90;                   // jet plume length

      // ================= SUN + volumetric god-rays =================
      const sunX = 506 + Math.sin(lf / 50) * 6, sunY = 596 - dawn * 100;
      const sunRays = Array.from({ length: 11 }, (_, i) => {
        const a = -Math.PI / 2 + (i - 5) * 0.14 + Math.sin(lf / 44 + i) * 0.02;
        const len = 700, hw = 0.05;
        const o = (0.05 + dawn * 0.17) * (0.5 + 0.5 * Math.abs(Math.sin(lf / 12 + i * 1.7))) * (1 + esc * 0.7);
        return {
          pts: `${sunX},${sunY} ${sunX + Math.cos(a - hw) * len},${sunY + Math.sin(a - hw) * len} ${sunX + Math.cos(a + hw) * len},${sunY + Math.sin(a + hw) * len}`,
          o,
        };
      });
      const halo = Array.from({ length: 12 }, (_, j) => {
        const a = (j / 12) * Math.PI * 2 + lf * 0.02;
        const r1 = 64, r2 = 86 + Math.sin(lf / 6 + j) * 8;
        return { x1: sunX + Math.cos(a) * r1, y1: sunY + Math.sin(a) * r1, x2: sunX + Math.cos(a) * r2, y2: sunY + Math.sin(a) * r2 };
      });

      // ================= CLOUD BANK (backlit, drifting) =================
      const clouds = Array.from({ length: 7 }, (_, i) => {
        const base = seed(i * 3.7) * 1240 - 120;
        const cx = ((base - lf * (0.5 + seed(i * 1.9) * 0.7)) % 1400 + 1400) % 1400 - 200;
        const cy = 150 + seed(i * 2.3) * 300;
        const cs = 0.7 + seed(i * 4.1) * 0.9;
        const puff = seed(i * 5.3);
        return { cx, cy, cs, puff, o: 0.16 + dawn * 0.28 + puff * 0.1 };
      });

      // ================= DEEP backdrop: farthest mega-towers (new far plane) =================
      const deepT = Array.from({ length: 10 }, (_, i) => {
        const bx = -180 + i * 138 + seed(i * 7.7) * 44;
        const bw = 54 + seed(i * 3.3) * 46;
        const bt = 440 - seed(i * 5.1) * 168;
        return { bx, bw, bt, beacon: 0.4 + 0.6 * Math.abs(Math.sin(lf / 5 + i * 1.7)) };
      });

      // ================= SKYLINE (parallax layers) =================
      const backB = Array.from({ length: 13 }, (_, i) => ({ bx: -220 + i * 112 + seed(i * 4.1) * 30, bw: 84 + seed(i * 2.7) * 54, bt: 486 - seed(i * 1.9) * 120 }));
      const frontB = Array.from({ length: 10 }, (_, i) => ({ bx: -260 + i * 168 + seed(i * 5.3) * 40, bw: 120 + seed(i * 3.7) * 72, bt: 520 - seed(i * 2.3) * 190 }));
      const wins: { x: number; y: number; o: number }[] = [];
      frontB.forEach((b, bi) => {
        const cols = Math.max(2, Math.round(b.bw / 44));
        const rows = Math.min(10, Math.floor((900 - b.bt) / 42));
        const gapX = b.bw / (cols + 1);
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          if (seed(bi * 9 + r * 3.1 + c * 1.7) < 0.46) continue;
          const flick = 0.72 + 0.28 * Math.sin(lf / 7 + bi * 2 + r + c);
          wins.push({ x: b.bx + gapX * (c + 1) - 8, y: b.bt + 20 + r * 42, o: (0.85 - dawn * 0.55) * flick });
        }
      });
      // rooftop neon signage on the near skyline
      const signs = [
        { x: 92, y: 250, w: 118, txt: "IRON", col: "#5FE6FF" },
        { x: 470, y: 214, w: 150, txt: "STARK", col: "#FF6FA8" },
        { x: 812, y: 268, w: 108, txt: "ARC", col: "#7CFFB0" },
      ].map((s, i) => ({ ...s, on: 0.55 + 0.45 * Math.abs(Math.sin(lf / (4 + i) + i * 2.1)), pull: dawn }));
      const fg = Array.from({ length: 6 }, (_, i) => ({ x: -100 + i * 430 + seed(i * 6.1) * 120, w: 150 + seed(i * 3.4) * 130, t: 470 + seed(i * 2.6) * 130 }));

      // ================= GATEWAY TOWERS: hero dives between them =================
      // twin towers slam past on both sides at the mid-dive gate beat
      const gateSlide = flyE;                                       // enter from right, exit left
      const twrL = { x: 150 - gateSlide * 640, w: 168, t: 150 };    // left pylon
      const twrR = { x: 720 - gateSlide * 640, w: 176, t: 120 };    // right pylon
      const gateWins = (bx: number, bw: number, bt: number, salt: number) => {
        const out: { x: number; y: number; o: number }[] = [];
        const cols = Math.max(3, Math.round(bw / 40));
        const rows = Math.floor((900 - bt) / 40);
        const gapX = bw / (cols + 1);
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          if (seed(salt + r * 2.3 + c * 1.3) < 0.34) continue;
          const flick = 0.7 + 0.3 * Math.sin(lf / 5 + salt + r + c);
          out.push({ x: bx + gapX * (c + 1) - 8, y: bt + 18 + r * 40, o: (0.8 - dawn * 0.4) * flick });
        }
        return out;
      };

      // ================= stars, haze, drifting motes =================
      const stars = Array.from({ length: 24 }, (_, i) => ({ x: seed(i * 1.3) * 1012, y: 60 + seed(i * 2.1) * 280, r: 1.3 + seed(i * 3.7) * 1.7, o: (1 - dawn) * (0.35 + 0.5 * (0.5 + 0.5 * Math.sin(lf / 6 + i * 1.3))) }));
      const motes = Array.from({ length: 34 }, (_, i) => {
        const drift = lf * (0.4 + seed(i * 1.7) * 0.9);
        return {
          x: ((seed(i * 2.3) * 1012 - pan * 0.5 - drift * 4) % 1012 + 1012) % 1012,
          y: ((seed(i * 3.1) * 792 - drift * 2) % 792 + 792) % 792,
          r: 1 + seed(i * 4.9) * 2.2,
          o: 0.14 + 0.16 * Math.abs(Math.sin(lf / 9 + i)),
        };
      });

      // ================= distant flying traffic (aircars between building layers) =================
      const traffic = Array.from({ length: 9 }, (_, i) => {
        const spd = 1.3 + seed(i * 2.7) * 1.5;
        const dir = seed(i * 3.9) < 0.5 ? 1 : -1;
        const span = 1300;
        const raw = seed(i * 1.1) * span + dir * lf * spd * 6;
        const tx = ((raw % span) + span) % span - 150;
        const ty = 248 + seed(i * 4.3) * 236;
        const sc = 0.5 + seed(i * 5.9) * 0.7;
        return { tx, ty, sc, dir, blink: 0.6 + 0.4 * Math.abs(Math.sin(lf / 3 + i * 2)) };
      });

      // ================= extreme-near foreground: spires + rising embers =================
      const spires = Array.from({ length: 4 }, (_, i) => ({ sx: -120 + i * 358 + seed(i * 8.1) * 160, sw: 16 + seed(i * 2.2) * 22, st: 300 + seed(i * 3.6) * 160 }));
      const embers = Array.from({ length: 14 }, (_, i) => {
        const rise = lf * (1.1 + seed(i * 1.9) * 1.6);
        const ex = ((seed(i * 2.7) * 1012 - pan * 1.1) % 1012 + 1012) % 1012;
        const ey = ((seed(i * 3.3) * 792 + 792 - rise * 3) % 792 + 792) % 792;
        return { ex, ey, er: 1.4 + seed(i * 4.1) * 2.6, eo: 0.2 + 0.2 * Math.abs(Math.sin(lf / 7 + i)) };
      });

      // ================= screen speed-lines (radiating rush) =================
      const streaks = Array.from({ length: 15 }, (_, i) => {
        const spd = 24 + esc * 46 + seed(i * 1.7) * 30;
        const x = ((seed(i) * 1500 - lf * spd) % 1500 + 1500) % 1500 - 240;
        return { x, y: 110 + seed(i * 2.3) * 540, len: 90 + seed(i * 3.1) * 170 + esc * 90, o: (0.14 + esc * 0.22) * (0.55 + 0.45 * seed(i * 4.7)), w: 1.6 + esc * 1.7 };
      });

      // ================= GAG: startled bird flock bolts clear =================
      const birdT = over(lf, 28, 40);
      const birdCol = `rgb(${chan(22, 60)},${chan(22, 54)},${chan(28, 60)})`;
      const flock = Array.from({ length: 5 }, (_, i) => {
        const ph = i * 1.4;
        const spread = (i - 2) * 34;
        const bx = 636 + spread + birdT * (120 + i * 16) + Math.sin(lf / 6 + ph) * 3;
        const by = 250 - i * 12 - birdT * (140 + i * 12) - (1 - birdT) * Math.sin(lf / 9 + ph) * 3;
        const tip = Math.sin(lf * (0.6 + birdT * 1.6) + ph) * (7 + birdT * 13);
        return { bx, by, tip, lead: i === 0 };
      });

      // ================= distant threat + lock-on reticle =================
      const vLeft = 879, vTop = 239, vcx = vLeft + 69, vcy = vTop + 91;
      const ret = over(lf, 46, 30);
      const lock = over(lf, 46, 16, Easing.out(Easing.cubic));
      const rb = 92 + (1 - lock) * 42;
      const corner = (dx: number, dy: number, sx: number, sy: number) => (
        <path d={`M ${vcx + dx} ${vcy + dy + sy * 22} L ${vcx + dx} ${vcy + dy} L ${vcx + dx + sx * 22} ${vcy + dy}`} stroke={HUD} strokeWidth={3} fill="none" strokeLinecap="round" />
      );

      // ================= MISSILE VOLLEY: 4-tube salvo, predictive lead, convergent multi-hit =====
      // XF_BACK-local -> screen. CSS applies a transform list right-to-left, so a local point p maps
      // to  screen = C + R(worldBank) * zoom * (p + (-pan*0.20, climb*0.35) - C).
      const camAt = (f: number) => {
        const e = ramp(f, 0, 86);
        const fE = over(f, 0, 86, Easing.inOut(Easing.cubic));
        const dE = Math.sin(over(f, 0, 86) * Math.PI);
        const gt = Math.sin(Math.max(0, Math.min(1, (f - 30) / 26)) * Math.PI);
        return {
          pan: fE * 1300,
          zoom: 1.06 + dE * 0.14 + e * 0.03 + gt * 0.05,
          bank: -dE * 9 - Math.sin(f / 19) * 1.6 - gt * 3,
          climb: dE * 30,
        };
      };
      const projAt = (f: number, bx: number, by: number) => {
        const c = camAt(f);
        const qx = bx - c.pan * 0.20 - CX, qy = by + c.climb * 0.35 - CY;
        const r = (c.bank * Math.PI) / 180, cr = Math.cos(r), sr = Math.sin(r);
        return { x: CX + (qx * cr - qy * sr) * c.zoom, y: CY + (qx * sr + qy * cr) * c.zoom };
      };
      // live projection, recomputed every frame straight off the in-scope camera values
      const projBack = (bx: number, by: number) => {
        const qx = bx - pan * 0.20 - CX, qy = by + climb * 0.35 - CY;
        const r = (worldBank * Math.PI) / 180, cr = Math.cos(r), sr = Math.sin(r);
        return { x: CX + (qx * cr - qy * sr) * zoom, y: CY + (qx * sr + qy * cr) * zoom };
      };
      const mTgt = projBack(vcx, vcy);

      // hero rig re-evaluated at an ARBITRARY frame, so each launch point freezes in the air
      const mHeroAt = (f: number) => {
        const fE = over(f, 0, 86, Easing.inOut(Easing.cubic));
        const dE = Math.sin(over(f, 0, 86) * Math.PI);
        const rP = Math.sin(Math.max(0, Math.min(1, (f - 34) / 18)) * Math.PI);
        return {
          x: 372 + fE * 150 + Math.sin(f / 11) * 6,
          y: 300 + dE * 48 - over(f, 60, 26) * 26 + Math.sin(f / 9) * 4,
          rot: 10 + dE * 18 + Math.sin(f / 13) * 4 + rP * 30,
        };
      };
      const M_POD: number[][] = [[-26, -46], [-20, -16], [-26, -46], [-20, -16]]; // shoulder pod / gauntlet
      const mPodAt = (f: number, i: number) => {
        const h = mHeroAt(f);
        const a = (h.rot * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a);
        const lx = M_POD[i][0], ly = M_POD[i][1];
        return { x: h.x + lx * ca - ly * sa, y: h.y + lx * sa + ly * ca };
      };
      const mPodNow = (i: number) => {
        const a = (heroRot * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a);
        return { x: heroX + M_POD[i][0] * ca - M_POD[i][1] * sa, y: heroY + M_POD[i][0] * sa + M_POD[i][1] * ca };
      };

      const M_LAU = [52, 55, 58, 61];          // staggered tube fire, inside the settled lock
      const M_DUR = [13, 13, 14, 15];          // unequal burns, so the beats space out on arrival
      const M_BOW = [-40, 22, -28, 32];        // perpendicular control offset: real arc, never off-bearing
      const M_HIT = M_LAU.map((l, i) => l + M_DUR[i]);
      const M_LIFE = 7;

      // Each round owns a HULL-LOCAL aim point inside the robot silhouette. The flight solves to that
      // point PROJECTED AT ITS OWN IMPACT FRAME (predictive lead), so P0/P1/P2 are all constants and the
      // trail is genuinely historical. The blast then rides the LIVE projection of the same hull point,
      // so it stays glued to the robot as the camera keeps moving. The two agree exactly at impact.
      const mHull = (i: number) => ({ x: vcx + (seed(i * 2.9) - 0.5) * 52, y: vcy + (seed(i * 4.7) - 0.5) * 44 });
      const mBez = (m: { P0: { x: number; y: number }; P1: { x: number; y: number }; P2: { x: number; y: number } }, t: number) => {
        const k = 1 - t;
        return { x: k * k * m.P0.x + 2 * k * t * m.P1.x + t * t * m.P2.x, y: k * k * m.P0.y + 2 * k * t * m.P1.y + t * t * m.P2.y };
      };

      const volley = [0, 1, 2, 3].map((i) => {
        const L = M_LAU[i], D = M_DUR[i], H = M_HIT[i];
        const P0 = mPodAt(L, i);
        const hl = mHull(i);
        const P2 = projAt(H, hl.x, hl.y);
        const dx = P2.x - P0.x, dy = P2.y - P0.y, dl = Math.max(1, Math.hypot(dx, dy));
        const nx = -dy / dl, ny = dx / dl;
        const P1 = { x: (P0.x + P2.x) / 2 + nx * M_BOW[i], y: (P0.y + P2.y) / 2 + ny * M_BOW[i] };
        const m = { P0, P1, P2 };

        const ft = lf - L;
        const t = Math.max(0, Math.min(1, ft / D));
        const u = Math.pow(t, 1.42);                       // accelerating burn, never an ease-out
        const kick = Math.max(0, 1 - Math.max(0, ft) / 4); // short drop-then-ignite off the rail
        const p = mBez(m, u);
        // rotation from the path tangent, with the sample PAIR FLOORED so it can never be atan2(0,0),
        // plus a bounded nose-down pitch from the kick instead of letting the kick tumble the body
        const ur = Math.max(u, 0.05);
        const a1 = mBez(m, ur), a0 = mBez(m, ur - 0.05);
        const ang = (Math.atan2(a1.y - a0.y, a1.x - a0.x) * 180) / Math.PI + kick * kick * 26;
        const pos = { x: p.x - kick * kick * 7, y: p.y + kick * kick * 11 };
        const sc = (1.02 - 0.44 * u) * (0.5 + 0.5 * Math.min(1, Math.max(0, ft) / 2));
        const flick = 0.7 + 0.3 * Math.sin(lf * 2.1 + i * 2.3);
        const flame = (22 + 13 * flick) * sc * (0.25 + 0.75 * Math.min(1, Math.max(0, ft) / 3));

        // tapered trail: 15 samples walked BACK along the arc actually flown (P0/P1/P2 are constants,
        // so this really is history), each offset on the true local normal with a per-sample wobble
        const span = Math.min(u, 0.40 + seed(i * 3.3) * 0.16);
        const trail = Array.from({ length: 15 }, (_, k) => {
          const kk = k / 14;
          const tt = Math.max(0, u - span * kk);
          const q = mBez(m, tt);
          const qa = mBez(m, Math.max(0, tt - 0.014)), qb = mBez(m, Math.min(1, tt + 0.014));
          const tx = qb.x - qa.x, ty = qb.y - qa.y, tl = Math.max(0.001, Math.hypot(tx, ty));
          const wob = Math.sin(lf * 0.42 + k * 0.85 + i * 2.7) * (1.4 + kk * 7) * sc;
          return {
            x: q.x + (-ty / tl) * wob, y: q.y + (tx / tl) * wob,
            r: (2.4 + kk * 13) * sc * (0.55 + 0.45 * seed(i * 2.1 + k * 1.9)),
            o: 0.4 * Math.pow(1 - kk, 0.95) * Math.min(1, kk * 4) * (0.55 + 0.45 * (1 - u)),
            kk,
          };
        });
        const spine = trail.map((s) => `${s.x.toFixed(1)},${s.y.toFixed(1)}`).join(" ");

        // launch residue frozen at the pod it left from, drifting back and dissipating
        const smoke = Array.from({ length: 4 }, (_, k) => {
          const ag = ft - k * 1.6;
          return {
            x: P0.x - ag * 2.4 - k * 5, y: P0.y - ag * 0.55 + k * 3,
            r: (5 + ag * 1.5 + k * 2) * 0.9,
            o: ag > 0 ? 0.28 * Math.max(0, 1 - ag / 20) * (0.6 + 0.4 * seed(i + k)) : 0,
          };
        }).filter((s) => s.o > 0.004);

        // impact rides the LIVE projection of this round's hull point
        const ic = projBack(hl.x, hl.y);
        const it = lf - H;
        const ia = Math.max(0, Math.min(1, it / M_LIFE));
        const big = i === 3 ? 1.5 : 0.85 + i * 0.05;       // the last one lands hardest
        const shards = Array.from({ length: i === 3 ? 11 : 7 }, (_, j) => {
          const sa2 = seed(i * 6.1 + j * 1.7) * Math.PI * 2;
          const r0 = 6 + ia * (14 + seed(i * 3.3 + j * 2.9) * 26) * big;
          const r1 = r0 + (10 + seed(i * 1.9 + j * 2.3) * 18) * big * (1 - ia * 0.5);
          return { x1: ic.x + Math.cos(sa2) * r0, y1: ic.y + Math.sin(sa2) * r0, x2: ic.x + Math.cos(sa2) * r1, y2: ic.y + Math.sin(sa2) * r1 };
        });

        return {
          i, L, H, pos, ang, sc, flame, flick, trail, spine, smoke, P0,
          live: lf >= L && lf < H,
          fired: lf >= L,
          muz: Math.max(0, 1 - Math.max(0, ft) / 4.5),
          hit: it >= 0 && it < M_LIFE,
          ic, ia, big, shards,
          fo: Math.pow(1 - ia, 1.7),
          fr2: (6 + 26 * big) * (0.35 + 0.65 * Math.pow(ia, 0.4)),
          rr: 10 + 74 * big * (1 - Math.pow(1 - ia, 2.4)),
          ro: Math.pow(1 - ia, 1.35),
          rw: 1.4 + 5.6 * (1 - ia),
        };
      });

      // pods spin up on the same beat the reticle starts locking, then each tube kicks on fire
      const mCharge = over(lf, 46, 6) * (1 - over(lf, 61, 8));
      const mRecoil = volley.reduce((a, m) => Math.max(a, m.fired ? m.muz : 0), 0);
      const mBurn = over(lf, 65, 10) * (0.55 + 0.45 * Math.abs(Math.sin(lf / 2.6)));

      return (
        <>
          {/* ===== SKY BASE (fixed, night crossfading to dawn) ===== */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#05061A 0%,#0C1030 34%,#161A3E 60%,#241E3C 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, opacity: dawn, background: "linear-gradient(180deg,#1B3C74 0%,#4E5388 30%,#9A6E86 54%,#D3773F 76%,#F6C64E 100%)", zIndex: 0 }} />

          {/* ===== FAR: stars, cresting sun, volumetric god-rays, anamorphic flare ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: XF_SKY, transformOrigin: "0 0", filter: "blur(1.4px)" }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <radialGradient id="sunS1x" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF7DE" /><stop offset="46%" stopColor="#F6C24E" /><stop offset="100%" stopColor="#DE7C2C" />
                </radialGradient>
              </defs>
              {stars.map((s, i) => <circle key={`st${i}`} cx={s.x} cy={s.y} r={s.r} fill="#EAF2FF" opacity={s.o} />)}
              <g style={{ mixBlendMode: "screen", filter: "blur(7px)" }} opacity={dawn}>
                {sunRays.map((r, i) => <polygon key={`gr${i}`} points={r.pts} fill="#FFD98A" opacity={r.o} />)}
              </g>
              <g opacity={dawn}>
                <circle cx={sunX} cy={sunY} r={96 + flare * 26} fill="#FFB458" opacity={0.26 + flare * 0.14} style={{ filter: "blur(12px)" }} />
                <g stroke="#FFD98A" strokeWidth={4} strokeLinecap="round" opacity={0.82}>
                  {halo.map((r, i) => <line key={`hl${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />)}
                </g>
                <circle cx={sunX} cy={sunY} r={60} fill="url(#sunS1x)" />
                <circle cx={sunX - 14} cy={sunY - 16} r={17} fill="#FFF7DE" opacity={0.75} />
              </g>
              {/* anamorphic lens streak, blooms as the hero climbs into the sun */}
              <g opacity={dawn * (0.35 + flare * 0.65)} style={{ mixBlendMode: "screen" }}>
                <ellipse cx={sunX} cy={sunY} rx={480 + flare * 300} ry={3 + flare * 4} fill="#FFE9B4" opacity={0.55} style={{ filter: "blur(3px)" }} />
                <ellipse cx={sunX} cy={sunY} rx={9} ry={200 + flare * 180} fill="#FFF4CE" opacity={0.4} style={{ filter: "blur(3px)" }} />
                <circle cx={sunX} cy={sunY} r={22 + flare * 20} fill="#FFFDF3" opacity={0.5 * flare} style={{ filter: "blur(4px)" }} />
              </g>
            </svg>
          </div>

          {/* ===== DEEP backdrop: farthest mega-towers, silhouetted against the sun (aerial haze) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, transform: XF_DEEP, transformOrigin: "0 0", filter: "blur(3.4px)" }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {deepT.map((b, i) => (
                <g key={`dt${i}`}>
                  <rect x={b.bx} y={b.bt} width={b.bw} height={900 - b.bt} fill={`rgb(${chan(12, 58)},${chan(17, 70)},${chan(36, 112)})`} opacity={0.66} />
                  <rect x={b.bx} y={b.bt} width={b.bw} height={2} fill={`rgba(180,205,245,${0.2 + dawn * 0.4})`} />
                  <circle cx={b.bx + b.bw / 2} cy={b.bt - 4} r={2.4} fill={RED} opacity={0.5 * b.beacon} />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== CLOUD BANK (soft, backlit, DOF blur) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, transform: XF_CLOUD, transformOrigin: "0 0", filter: "blur(5px)" }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {clouds.map((c, i) => (
                <g key={`cl${i}`} transform={`translate(${c.cx} ${c.cy}) scale(${c.cs})`} opacity={c.o} style={{ mixBlendMode: "screen" }}>
                  <ellipse cx={0} cy={0} rx={130} ry={34} fill="#F2D9B0" />
                  <ellipse cx={-70} cy={10} rx={78} ry={26} fill="#E7C79A" />
                  <ellipse cx={80} cy={8} rx={90} ry={28} fill="#F7E4C2" />
                  <ellipse cx={20} cy={-16} rx={64} ry={24} fill="#FFF0D2" />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== BACK skyline (far DOF drift) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 3, transform: XF_BACK, transformOrigin: "0 0", filter: "blur(2.7px)" }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {backB.map((b, i) => (
                <g key={`bb${i}`}>
                  <rect x={b.bx} y={b.bt} width={b.bw} height={900 - b.bt} fill={`rgb(${chan(9, 46)},${chan(13, 60)},${chan(30, 96)})`} />
                  <rect x={b.bx} y={b.bt} width={b.bw} height={3} fill={`rgba(150,185,235,${dawn * 0.5})`} />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== distant grey menace, brooding on the horizon ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 4, transform: XF_BACK, transformOrigin: "0 0", filter: "blur(1.05px)" }}>
            <Generic9000 lf={lf} size={150} left={vLeft} top={vTop} pose="loom" menace={0.34 + esc * 0.2} z={1} />
          </div>

          {/* ===== atmospheric haze band between building layers ===== */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 260, zIndex: 5, pointerEvents: "none", background: `linear-gradient(180deg, transparent 0%, rgba(210,150,90,${0.06 + dawn * 0.16}) 55%, transparent 100%)`, mixBlendMode: "screen", filter: "blur(6px)" }} />

          {/* ===== deeper atmosphere: high cool haze band + low horizon sun-glow ===== */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 180, height: 200, zIndex: 5, pointerEvents: "none", background: `linear-gradient(180deg, transparent 0%, rgba(150,180,220,${0.04 + dawn * 0.08}) 60%, transparent 100%)`, mixBlendMode: "screen", filter: "blur(10px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, zIndex: 5, pointerEvents: "none", background: `linear-gradient(0deg, rgba(255,150,70,${0.06 + dawn * 0.22}) 0%, transparent 100%)`, mixBlendMode: "screen", filter: "blur(4px)" }} />

          {/* ===== drifting particulate / dust motes ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 6, overflow: "hidden" }}>
            {motes.map((m, i) => <circle key={`mo${i}`} cx={m.x} cy={m.y} r={m.r} fill="#FFE7BE" opacity={m.o} style={{ mixBlendMode: "screen" }} />)}
          </svg>

          {/* ===== NEAR skyline: rushing + motion-blurred, lit windows + neon signage ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 7, transform: XF_NEAR, transformOrigin: "0 0", filter: `blur(${nearBlur}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {frontB.map((b, i) => (
                <g key={`fb${i}`}>
                  <rect x={b.bx} y={b.bt} width={b.bw} height={900 - b.bt} fill={`rgb(${chan(5, 24)},${chan(7, 22)},${chan(16, 42)})`} />
                  <rect x={b.bx} y={b.bt} width={b.bw} height={3} fill={`rgba(255,196,120,${dawn * 0.6})`} />
                </g>
              ))}
              {wins.map((w, i) => <rect key={`wn${i}`} x={w.x} y={w.y} width={15} height={19} rx={2} fill="#FFCF82" opacity={w.o} />)}
              {signs.map((s, i) => (
                <g key={`sg${i}`} style={{ mixBlendMode: "screen" }}>
                  <rect x={s.x - 8} y={s.y - 8} width={s.w + 16} height={44} rx={6} fill={s.col} opacity={0.1 * s.on} style={{ filter: "blur(6px)" }} />
                  <text x={s.x} y={s.y + 24} fill={s.col} opacity={0.72 + 0.28 * s.on} style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>{s.txt}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* ===== distant flying traffic: aircars streaking between the towers ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 8, transform: XF_TRAFFIC, transformOrigin: "0 0", filter: `blur(${1.2 + rush * 2}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {traffic.map((t, i) => (
                <g key={`tf${i}`} transform={`translate(${t.tx} ${t.ty}) scale(${t.sc})`} style={{ mixBlendMode: "screen" }}>
                  <line x1={0} y1={0} x2={t.dir * -46} y2={0} stroke="#8FE6FF" strokeWidth={2} strokeLinecap="round" opacity={0.4} style={{ filter: "blur(1px)" }} />
                  <rect x={-6} y={-2.5} width={12} height={5} rx={2.5} fill={`rgb(${chan(30, 80)},${chan(36, 86)},${chan(60, 120)})`} opacity={0.85} />
                  <circle cx={t.dir * 6} cy={0} r={2} fill="#FFF3D6" opacity={0.7 + 0.3 * t.blink} />
                  <circle cx={t.dir * -6} cy={0} r={1.8} fill={RED} opacity={0.6 * t.blink} />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== GATEWAY TOWERS: twin pylons the hero threads between ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 9, transform: XF_GATE, transformOrigin: "0 0", filter: `blur(${1.4 + rush * 3}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <linearGradient id="twrS1x" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={`rgb(${chan(4, 18)},${chan(6, 20)},${chan(14, 36)})`} />
                  <stop offset="70%" stopColor={`rgb(${chan(8, 30)},${chan(10, 26)},${chan(20, 48)})`} />
                  <stop offset="100%" stopColor={`rgba(255,190,110,${0.2 + dawn * 0.4})`} />
                </linearGradient>
              </defs>
              {[twrL, twrR].map((t, ti) => (
                <g key={`tw${ti}`}>
                  <rect x={t.x} y={t.t} width={t.w} height={900 - t.t} fill="url(#twrS1x)" />
                  <rect x={ti === 0 ? t.x + t.w - 5 : t.x} y={t.t} width={5} height={900 - t.t} fill={`rgba(255,205,130,${0.4 + dawn * 0.5})`} />
                  <polygon points={`${t.x},${t.t} ${t.x + t.w},${t.t} ${t.x + t.w / 2},${t.t - 46}`} fill={`rgb(${chan(10, 34)},${chan(12, 28)},${chan(22, 50)})`} />
                  <circle cx={t.x + t.w / 2} cy={t.t - 46} r={5 + gate * 3} fill={RED} opacity={0.6 + 0.4 * Math.abs(Math.sin(lf / 4 + ti))} />
                  {gateWins(t.x, t.w, t.t, ti * 40 + 3).map((w, i) => <rect key={`gw${ti}_${i}`} x={w.x} y={w.y} width={13} height={17} rx={2} fill="#FFD592" opacity={w.o} />)}
                </g>
              ))}
            </svg>
          </div>

          {/* ===== EXTREME foreground: heavy-blur slabs whipping past (depth) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, transform: XF_FORE, transformOrigin: "0 0", filter: `blur(${foreBlur}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {fg.map((f, i) => <rect key={`fg${i}`} x={f.x} y={f.t} width={f.w} height={900 - f.t} fill="#05060F" />)}
            </svg>
          </div>

          {/* ===== FOREGROUND detail: antenna spires whipping past (extreme near depth) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, transform: XF_FORE2, transformOrigin: "0 0", filter: `blur(${foreBlur + 2}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {spires.map((s, i) => (
                <g key={`sp${i}`}>
                  <rect x={s.sx} y={s.st} width={s.sw} height={900 - s.st} fill="#04050C" />
                  <line x1={s.sx + s.sw / 2} y1={s.st} x2={s.sx + s.sw / 2} y2={s.st - 60} stroke="#04050C" strokeWidth={4} />
                  <circle cx={s.sx + s.sw / 2} cy={s.st - 60} r={4} fill={RED} opacity={0.5 + 0.5 * Math.abs(Math.sin(lf / 4 + i))} />
                </g>
              ))}
            </svg>
          </div>

          {/* ===== warm embers rising through the foreground ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 10, overflow: "hidden", filter: "blur(1.4px)" }}>
            {embers.map((m, i) => <circle key={`em${i}`} cx={m.ex} cy={m.ey} r={m.er} fill="#FFCF8A" opacity={m.eo} style={{ mixBlendMode: "screen" }} />)}
          </svg>

          {/* ===== screen speed-lines ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 11, overflow: "hidden" }}>
            <g stroke="#CFE9FF" strokeLinecap="round">
              {streaks.map((s, i) => <line key={`ss${i}`} x1={s.x} y1={s.y} x2={s.x + s.len} y2={s.y} strokeWidth={s.w} opacity={s.o} />)}
            </g>
          </svg>

          {/* ===== lock-on reticle (tracks the far menace) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 12, transform: XF_BACK, transformOrigin: "0 0", pointerEvents: "none" }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <g opacity={ret * 0.9}>
                {corner(-rb, -rb, 1, 1)}{corner(rb, -rb, -1, 1)}{corner(-rb, rb, 1, -1)}{corner(rb, rb, -1, -1)}
                <line x1={vcx - 12} y1={vcy} x2={vcx + 12} y2={vcy} stroke={HUD} strokeWidth={2} />
                <line x1={vcx} y1={vcy - 12} x2={vcx} y2={vcy + 12} stroke={HUD} strokeWidth={2} />
                <text x={vcx - rb} y={vcy - rb - 12} fill={HUD} style={{ fontFamily: mono, fontSize: 20, letterSpacing: 3 }}>TARGET</text>
              </g>
            </svg>
          </div>

          {/* ===== HERO jet plume (trails along the dive vector) ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 13, overflow: "visible" }}>
            <defs>
              <linearGradient id="jetS1x" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7FE8FF" stopOpacity="0" /><stop offset="100%" stopColor="#EAFDFF" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <g transform={`translate(${heroX} ${heroY}) rotate(${heroRot})`}>
              <polygon points={`30,-27 30,27 ${-tLen},4`} fill="url(#jetS1x)" opacity={0.5} style={{ filter: "blur(4px)" }} />
              <polygon points={`24,-13 24,13 ${-tLen * 0.66},2`} fill="#BFF6FF" opacity={0.7} />
              <polygon points={`18,-6 18,6 ${-tLen * 0.4},1`} fill="#F4FEFF" opacity={0.9} />
              <g stroke="#EAFDFF" strokeLinecap="round">
                {Array.from({ length: 5 }, (_, i) => {
                  const dx = -40 - (i + 1) * (26 + esc * 24) - (lf % 8);
                  return <line key={`jd${i}`} x1={dx} y1={(seed(i * 2.1) - 0.5) * 40} x2={dx - (30 + esc * 44)} y2={(seed(i * 2.1) - 0.5) * 40} strokeWidth={3} opacity={(0.5 - i * 0.07) * (0.6 + esc * 0.4)} />;
                })}
              </g>
            </g>
          </svg>

          {/* ===== COOL RIM light wrapping the hero from screen-left (rim/key split) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 13, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(30% 26% at ${heroX - 74}px ${heroY - 44}px, rgba(96,176,255,${0.12 + esc * 0.16 + gate * 0.08}) 0%, transparent 60%)` }} />

          {/* ===== HERO: Iron Claude, banking hard into the dive ===== */}
          <div style={{ position: "absolute", left: heroX - figW / 2, top: heroY - figH / 2, width: figW, height: figH, zIndex: 14, transform: `rotate(${heroRot}deg)`, transformOrigin: "50% 50%" }}>
            <IronClaude lf={lf} size={HEROS} left={0} top={0} pose="fly" core={reactor} flip={1} />
          </div>

          {/* ===== recoil glow off the pods (restrained, screen blend) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none", mixBlendMode: "screen", opacity: mRecoil * 0.5, background: `radial-gradient(16% 13% at ${mPodNow(0).x}px ${mPodNow(0).y}px, rgba(255,206,132,0.65) 0%, transparent 64%)` }} />

          {/* ===== MISSILE VOLLEY: 4 tubes, predictive lead, convergent multi-hit ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 15, overflow: "visible", pointerEvents: "none" }}>
            <defs>
              <radialGradient id="mzS1mx" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFDF2" stopOpacity="1" />
                <stop offset="42%" stopColor="#FFD07A" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FF7A2E" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hitS1mx" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="30%" stopColor="#FFE9A8" stopOpacity="0.9" />
                <stop offset="62%" stopColor="#FF9536" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF5A1E" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="exhS1mx" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#FFFEF6" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#FFC961" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FF6A20" stopOpacity="0" />
              </linearGradient>
              {volley.filter((m) => m.live).map((m) => (
                <linearGradient key={`vgS1mx${m.i}`} id={`vapS1mx${m.i}`} gradientUnits="userSpaceOnUse"
                  x1={m.trail[0].x} y1={m.trail[0].y} x2={m.trail[14].x} y2={m.trail[14].y}>
                  <stop offset="0%" stopColor="#FFF6DC" stopOpacity="0.9" />
                  <stop offset="30%" stopColor={HUD} stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#B9CEEA" stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {/* pods spin up on the lock beat */}
            {mCharge > 0.01 ? (
              <g style={{ mixBlendMode: "screen" }}>
                {[0, 1].map((k) => (
                  <circle key={`chS1mx${k}`} cx={mPodNow(k).x} cy={mPodNow(k).y} r={7 + mCharge * 5}
                    fill={HUD} opacity={mCharge * (0.34 + 0.26 * Math.abs(Math.sin(lf / 2.4 + k)))} style={{ filter: "blur(3px)" }} />
                ))}
              </g>
            ) : null}

            {/* launch residue hanging in the air behind the frozen pod */}
            <g style={{ filter: "blur(3.4px)" }}>
              {volley.map((m) => (
                <g key={`lsS1mx${m.i}`}>
                  {m.smoke.map((s, k) => <circle key={`lp${k}`} cx={s.x} cy={s.y} r={s.r} fill="#C9D8EE" opacity={s.o} />)}
                </g>
              ))}
            </g>

            {/* the volley */}
            {volley.filter((m) => m.live).map((m) => (
              <g key={`mvS1mx${m.i}`}>
                <g style={{ filter: "blur(2.6px)" }}>
                  {m.trail.map((s, k) => (
                    <circle key={`tp${k}`} cx={s.x} cy={s.y} r={s.r} fill={k < 4 ? "#FFD9A6" : "#C6D6EC"} opacity={s.o} />
                  ))}
                </g>
                <polyline points={m.spine} fill="none" stroke={`url(#vapS1mx${m.i})`} strokeWidth={2.8 * m.sc}
                  strokeLinecap="round" style={{ mixBlendMode: "screen" }} />

                <g transform={`translate(${m.pos.x} ${m.pos.y}) rotate(${m.ang}) scale(${m.sc})`}>
                  {/* three-layer exhaust cone */}
                  <g style={{ mixBlendMode: "screen" }}>
                    <polygon points={`-16,-7 -16,7 ${-16 - m.flame},0`} fill="url(#exhS1mx)" opacity={0.85} style={{ filter: "blur(2px)" }} />
                    <polygon points={`-16,-4.4 -16,4.4 ${-16 - m.flame * 0.6},0`} fill="#FFD489" opacity={0.92} />
                    <polygon points={`-16,-2.2 -16,2.2 ${-16 - m.flame * 0.32},0`} fill="#FFFDF4" opacity={0.95 * m.flick} />
                  </g>
                  {/* hard-edged INK-stroked hull, swept fins, gold band, red warhead stripe */}
                  <polygon points="-15,-7 -24,-15 -19,-5" fill={IRON} stroke={INK} strokeWidth={1.1} strokeLinejoin="round" />
                  <polygon points="-15,7 -24,15 -19,5" fill={IRON} stroke={INK} strokeWidth={1.1} strokeLinejoin="round" />
                  <path d="M 20 0 L 7 -7 L -16 -7 L -16 7 L 7 7 Z" fill={IRON} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
                  <path d="M 18 -1.2 L 7 -7 L -16 -7 L -16 -3.2 L 8 -3.2 Z" fill={IRONG} opacity={0.9} />
                  <rect x={0.5} y={-7} width={4} height={14} fill={RED} />
                  <rect x={-11} y={-7} width={2.4} height={14} fill={GOLD} opacity={0.9} />
                  <circle cx={12} cy={-2} r={1.5} fill={HUD} opacity={0.6 + 0.4 * m.flick} />
                </g>
              </g>
            ))}

            {/* muzzle flash at the pod that just fired */}
            {volley.filter((m) => m.fired && m.muz > 0.01).map((m) => {
              const mp = mPodNow(m.i);
              const pop = Math.sin(Math.min(1, (lf - m.L + 0.6) / 4.5) * Math.PI);
              return (
                <g key={`mfS1mx${m.i}`} opacity={m.muz} style={{ mixBlendMode: "screen" }}>
                  <circle cx={mp.x} cy={mp.y} r={14 + pop * 16} fill="url(#mzS1mx)" opacity={0.65} />
                  <circle cx={mp.x} cy={mp.y} r={4 + pop * 5} fill="#FFFDF2" opacity={0.85} />
                  <g stroke="#FFF3D2" strokeWidth={2.4 * m.muz} strokeLinecap="round" opacity={0.8}>
                    {Array.from({ length: 4 }, (_, j) => {
                      const aa = seed(m.i * 3.3 + j * 2.1) * Math.PI * 2;
                      const ln = 10 + pop * 16;
                      return <line key={`mzl${j}`} x1={mp.x} y1={mp.y} x2={mp.x + Math.cos(aa) * ln} y2={mp.y + Math.sin(aa) * ln} />;
                    })}
                  </g>
                </g>
              );
            })}

            {/* IMPACTS: each round strikes a different part of the hull, last one escalates */}
            <g style={{ mixBlendMode: "screen" }}>
              {volley.filter((m) => m.hit).map((m) => (
                <g key={`imS1mx${m.i}`}>
                  <circle cx={m.ic.x} cy={m.ic.y} r={m.fr2 * 1.9} fill="url(#hitS1mx)" opacity={m.fo * 0.5} style={{ filter: "blur(9px)" }} />
                  <circle cx={m.ic.x} cy={m.ic.y} r={m.fr2} fill="url(#hitS1mx)" opacity={m.fo} />
                  <circle cx={m.ic.x} cy={m.ic.y} r={m.fr2 * 0.34} fill="#FFFFFF" opacity={m.fo * 0.95} />
                  <circle cx={m.ic.x} cy={m.ic.y} r={m.rr} fill="none" stroke="#FFE1A4" strokeWidth={m.rw} opacity={m.ro * 0.8} />
                  <circle cx={m.ic.x} cy={m.ic.y} r={m.rr * 0.6} fill="none" stroke="#FFFBEE" strokeWidth={m.rw * 0.5} opacity={m.ro * 0.55} />
                  {m.big > 1 ? (
                    <circle cx={m.ic.x} cy={m.ic.y} r={m.rr * 1.34} fill="none" stroke={HUD} strokeWidth={m.rw * 0.6} opacity={m.ro * 0.5} style={{ filter: "blur(1.4px)" }} />
                  ) : null}
                  <g stroke="#FFD98A" strokeWidth={2.2 * m.big * (1 - m.ia * 0.6)} strokeLinecap="round" opacity={m.ro * 0.9}>
                    {m.shards.map((s, j) => <line key={`sh${j}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />)}
                  </g>
                </g>
              ))}
              {/* residual burn, glued to the live target so the robot stays visibly damaged */}
              <circle cx={mTgt.x} cy={mTgt.y} r={28 + mBurn * 20} fill="#FF8A3C" opacity={mBurn * 0.28} style={{ filter: "blur(11px)" }} />
              <circle cx={mTgt.x} cy={mTgt.y} r={10 + mBurn * 6} fill="#FFE0A6" opacity={mBurn * 0.38} style={{ filter: "blur(5px)" }} />
            </g>
          </svg>

          {/* ===== WARM KEY off the rising sun, raking the hero's near side ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(34% 30% at ${heroX + 82}px ${heroY + 58}px, rgba(255,190,110,${0.12 + dawn * 0.2 + pull * 0.12}) 0%, transparent 62%)` }} />

          {/* ===== GAG: panicked bird flock scatters off the flight path ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 16, overflow: "visible" }}>
            {flock.map((b, i) => (
              <g key={`bd${i}`}>
                <g stroke={birdCol} strokeWidth={b.lead ? 4.5 : 3.4} fill="none" strokeLinecap="round" opacity={b.lead ? 0.92 : 0.72}>
                  <path d={`M ${b.bx - 24} ${b.by - b.tip} Q ${b.bx - 8} ${b.by + 6} ${b.bx} ${b.by}`} />
                  <path d={`M ${b.bx + 24} ${b.by - b.tip} Q ${b.bx + 8} ${b.by + 6} ${b.bx} ${b.by}`} />
                </g>
                <ellipse cx={b.bx} cy={b.by + 1} rx={b.lead ? 5 : 4} ry={b.lead ? 4 : 3} fill={birdCol} opacity={b.lead ? 0.92 : 0.72} />
              </g>
            ))}
            {birdT > 0.25 && <g stroke={birdCol} strokeWidth={2.4} strokeLinecap="round" opacity={0.5 * birdT}>
              <line x1={flock[0].bx - 30} y1={flock[0].by + 18} x2={flock[0].bx - 54} y2={flock[0].by + 26} />
              <line x1={flock[0].bx - 22} y1={flock[0].by + 30} x2={flock[0].bx - 42} y2={flock[0].by + 40} />
            </g>}
          </svg>

          {/* ===== warm dawn bloom off the reactor (hands to S2) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 18, pointerEvents: "none", background: `radial-gradient(40% 32% at ${heroX + 30}px ${heroY}px, rgba(255,220,150,${(0.22 + over(lf, 62, 24) * 0.3)}) 0%, transparent 62%)`, mixBlendMode: "screen" }} />

          {/* ===== 3rd-act HORIZON BURST: the whole sky floods as he pulls up into the sun ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 19, pointerEvents: "none", mixBlendMode: "screen", opacity: pull, background: `radial-gradient(90% 44% at 50% ${sunY}px, rgba(255,214,140,0.34) 0%, rgba(255,180,96,0.12) 40%, transparent 66%)` }} />

          {/* ===== FILM GRAIN ===== */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 21, mixBlendMode: "overlay", opacity: 0.1 + esc * 0.07, pointerEvents: "none" }}>
            <filter id="grainS1x">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(lf * 1.7) % 91} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grainS1x)" />
          </svg>

          {/* ===== teal-orange grade + vignette ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 22, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(72% 60% at 52% 84%, rgba(255,168,88,${0.1 + dawn * 0.2}) 0%, transparent 62%)` }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 22, pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 2%, rgba(38,92,124,0.24) 0%, transparent 54%), radial-gradient(78% 78% at 50% 50%, transparent 54%, rgba(5,7,20,0.52) 100%)" }} />

          {/* ===== HUD: mission tag ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 24, opacity: over(lf, 6, 14), pointerEvents: "none" }}>
            <Pill text="DAWN PATROL" x={44} y={700} />
            <div style={{ position: "absolute", left: 46, top: 744, fontFamily: mono, fontSize: 21, letterSpacing: 1, color: "rgba(160,220,240,0.92)" }}>objective: run the morning</div>
          </div>
        </>
      );
    })()}
  </Panel>
);

const S2: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="mainframe // node-01">
    {(() => {
      // ================= CAMERA: worm's-eye LOW-ANGLE CRANE UP the towering villain + creeping DUTCH tilt =================
      const esc = Math.min(1, lf / 44);                                   // continuous escalation, whole 1.5s
      const craneUp = over(lf, 0, 40, Easing.inOut(Easing.cubic));        // the crane rises the WHOLE scene
      const pushIn = over(lf, 0, 30, Easing.out(Easing.cubic));
      const camScale = 1.02 + pushIn * 0.05 + esc * 0.05;                 // slow dolly push into the giant
      const dutch = -1.1 - craneUp * 2.6 + Math.sin(lf / 3.2) * 0.42 * (1 - esc * 0.5); // unease tilt + faint handheld
      const camTx = -esc * 22;                                            // drift toward the villain
      const camTy = craneUp * 30;                                         // world SINKS = camera cranes UP his body

      // ================= VILLAIN: LOOMS -> curls into a smug crossed-arm mock =================
      const villPose = lf >= 26 ? "mock" : "loom";
      const mockPunch = lf < 26 ? 0 : Math.max(0, 1 - (lf - 26) / 7);     // dominance bump when the taunt lands
      const alert = 0.26 + esc * 0.5;
      const spin = lf * 9;
      const bubbleP = over(lf, 15, 9, Easing.out(Easing.back(2.1)));
      const cursor = (lf % 20) < 12 ? 1 : 0.2;

      // ---- the villain's screen FLICKS its dismissive spinner DOWN at the tiny hero ----
      const FLICK = 29;
      const flk = over(lf, FLICK, 11, Easing.in(Easing.cubic));
      const flkLive = lf >= FLICK && flk < 1;
      const impact = over(lf, FLICK + 11, 8, Easing.out(Easing.cubic));
      const impLive = lf >= FLICK + 11;
      const flkX = interpolate(flk, [0, 1], [686, 176]);
      const flkY = interpolate(flk, [0, 1], [236, 512]) - Math.sin(flk * Math.PI) * 78;
      const flkScale = 1 - flk * 0.34;
      const flkSpin = spin * 2.4;
      const wind = over(lf, FLICK - 6, 6, Easing.inOut(Easing.cubic)) * (lf < FLICK ? 1 : Math.max(0, 1 - (lf - FLICK) / 3));

      // ================= HERO: dwarfed + ACTIVE - staggers back, cranes UP at the giant, reactor dim =================
      const heroStagger = over(lf, 4, 22, Easing.out(Easing.cubic));
      const flinch = lf < 26 ? 0 : Math.max(0, 1 - (lf - 26) / 9);
      const flinch2 = impLive ? Math.max(0, 1 - (lf - (FLICK + 11)) / 8) : 0;
      const braceBob = Math.sin(lf / 4) * 1.4 * (1 - heroStagger * 0.4);
      const hx = -heroStagger * 16 - flinch * 12 - flinch2 * 18;
      const hy = heroStagger * 8 + flinch * 5 + braceBob + flinch2 * 6;
      const hrot = heroStagger * 4 + flinch * 3 + flinch2 * 5;
      const heroCore = 0.07 + 0.05 * Math.abs(Math.sin(lf / 5)) * seed(Math.floor(lf / 4) + 1); // sputtering, dim

      const STEEL = "#28303A", TEAL = "#5AD9C6", REDA = "#FF5648", COLD = "#7FB4FF";

      // worm's-eye vanishing point ABOVE the frame -> everything leans IN at the top (we're looking up)
      const VVPx = 600, VVPy = -240, baseY = 560, topY = 150;
      const uu = (baseY - topY) / (baseY - VVPy);
      const towers = Array.from({ length: 6 }, (_, i) => {
        const w = 120, bx = -34 + i * 190;
        const tlx = bx + (VVPx - bx) * uu;
        const trx = (bx + w) + (VVPx - (bx + w)) * uu;
        const d = 1 - Math.abs((bx + w / 2) - VVPx) / 720;
        return { bx, w, tlx, trx, d, i };
      });
      const baseY2 = 508, topY2 = 200, uu2 = (baseY2 - topY2) / (baseY2 - VVPy);
      const towersBack = Array.from({ length: 8 }, (_, i) => {
        const w = 86, bx = -30 + i * 148;
        const tlx = bx + (VVPx - bx) * uu2;
        const trx = (bx + w) + (VVPx - (bx + w)) * uu2;
        return { bx, w, tlx, trx, i };
      });
      // deepest 3rd corridor row (tiny, hazed to nothing) - endless data-hall
      const baseY3 = 462, topY3 = 236, uu3 = (baseY3 - topY3) / (baseY3 - VVPy);
      const towersDeep = Array.from({ length: 10 }, (_, i) => {
        const w = 60, bx = -20 + i * 112;
        const tlx = bx + (VVPx - bx) * uu3;
        const trx = (bx + w) + (VVPx - (bx + w)) * uu3;
        return { bx, w, tlx, trx, i };
      });

      // overhead COLD volumetric shafts raking DOWN onto the villain
      const rays = Array.from({ length: 8 }, (_, i) => {
        const Ox = 706, Oy = 112, bottomY = 660;
        const ang = -0.2 + i * 0.06 + Math.sin(lf / 22 + i) * 0.022;
        const bx = Ox + Math.tan(ang) * (bottomY - Oy);
        const half = 24 + i * 8;
        const op = (0.5 + esc * 0.55) * (0.55 + 0.45 * Math.sin(lf / 8 + i * 1.3));
        return { pts: `${Ox - 3},${Oy} ${Ox + 3},${Oy} ${bx + half},${bottomY} ${bx - half},${bottomY}`, op };
      });

      // NEW: a SECOND cluster of cold shafts raking down the far-left corridor (fills the empty upper-left)
      const raysL = Array.from({ length: 5 }, (_, i) => {
        const Ox = 210, Oy = 120, bottomY = 600;
        const ang = 0.16 + i * 0.05 + Math.sin(lf / 26 + i * 1.7) * 0.02;
        const bx = Ox + Math.tan(ang) * (bottomY - Oy);
        const half = 20 + i * 7;
        const op = (0.32 + esc * 0.3) * (0.5 + 0.5 * Math.sin(lf / 9 + i * 1.1));
        return { pts: `${Ox - 2},${Oy} ${Ox + 2},${Oy} ${bx + half},${bottomY} ${bx - half},${bottomY}`, op };
      });

      const grainSeed = Math.floor(lf) % 50;

      return (
        <>
          {/* ================= WORLD (camera crane-up dolly + dutch tilt) ================= */}
          <div style={{ position: "absolute", inset: 0, transform: `rotate(${dutch}deg) scale(${camScale})`, transformOrigin: "560px 400px" }}>

            {/* ========== PLANE 0 - DEEPEST BACKDROP: dormant mainframe monolith + cold core furnace (heavy DOF) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 0.18}px,${camTy * 0.18}px)`, filter: "blur(7px)" }}>
              <div style={{ position: "absolute", inset: 0, background: grad("#101720", "#04060A") }} />
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s2main" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A222B" /><stop offset="55%" stopColor="#0E141B" /><stop offset="100%" stopColor="#05080C" />
                  </linearGradient>
                  <radialGradient id="s2dorm" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#2E5478" /><stop offset="55%" stopColor="#12212F" /><stop offset="100%" stopColor="#070C12" />
                  </radialGradient>
                </defs>

                {/* GIANT DORMANT MAINFRAME slab looming dead-center behind the whole hall */}
                <polygon points="332,556 692,556 656,120 368,120" fill="url(#s2main)" stroke="#03060A" strokeWidth={4} />
                {/* buttress wings flanking the slab */}
                <polygon points="300,560 356,556 384,120 336,120" fill="#0A0F16" stroke="#04070B" strokeWidth={2} opacity={0.9} />
                <polygon points="724,560 668,556 640,120 688,120" fill="#0A0F16" stroke="#04070B" strokeWidth={2} opacity={0.9} />
                {/* vertical structural seams up the slab */}
                {Array.from({ length: 6 }, (_, i) => {
                  const f = i / 5;
                  const xb = 368 + f * (656 - 368);
                  const xt = 388 + f * (636 - 388);
                  return <line key={`ms${i}`} x1={xb} y1={556} x2={xt} y2={120} stroke="rgba(8,14,20,0.9)" strokeWidth={2} />;
                })}
                {/* central DORMANT reactor eye - the mothballed brain, barely alive */}
                <circle cx={512} cy={318} r={104} fill="url(#s2dorm)" stroke="#0A1826" strokeWidth={5} opacity={0.55 + esc * 0.22} />
                <circle cx={512} cy={318} r={70} fill="none" stroke={`rgba(96,150,214,${0.14 + 0.1 * Math.sin(lf / 9)})`} strokeWidth={4} />
                <circle cx={512} cy={318} r={40} fill="none" stroke={`rgba(127,180,255,${0.1 + 0.08 * Math.sin(lf / 6 + 1)})`} strokeWidth={2.5} />
                {/* dim dormant status matrix - mostly dead, an occasional cold flicker */}
                {Array.from({ length: 6 }, (_, r) => Array.from({ length: 7 }, (_, c) => {
                  const on = seed(r * 7 + c + Math.floor(lf / 12)) > 0.87 ? 1 : 0.1;
                  return <rect key={`md${r}-${c}`} x={410 + c * 28} y={430 + r * 18} width={13} height={4} rx={1} fill={COLD} opacity={on * 0.32} />;
                }))}
              </svg>
              {/* cold institutional core furnace bloom around the dormant brain */}
              <div style={{ position: "absolute", left: 300, top: 60, width: 820, height: 720, borderRadius: "50%", background: `radial-gradient(circle, rgba(127,180,255,${0.1 + esc * 0.06}) 0%, rgba(70,120,200,${0.05 + esc * 0.03}) 32%, transparent 62%)`, filter: "blur(30px)", mixBlendMode: "screen" }} />
            </div>

            {/* ========== PLANE 1 - FAR: endless data-hall racks receding (slow parallax + DOF blur) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 0.35}px,${camTy * 0.35}px)`, filter: "blur(4.5px)" }}>

              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s2tower" x1="0" y1="0" x2="0.25" y2="1">
                    <stop offset="0%" stopColor="#39434D" /><stop offset="58%" stopColor="#222A32" /><stop offset="100%" stopColor="#10151A" />
                  </linearGradient>
                  <linearGradient id="s2towerB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#232B34" /><stop offset="100%" stopColor="#0B1015" />
                  </linearGradient>
                  <linearGradient id="s2towerC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B222A" /><stop offset="100%" stopColor="#0A0E13" />
                  </linearGradient>
                  <linearGradient id="s2wall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B222A" /><stop offset="100%" stopColor="#070A0E" />
                  </linearGradient>
                </defs>

                <rect x={0} y={150} width={1012} height={430} fill="url(#s2wall)" opacity={0.86} />

                {/* far-wall LED status banks flickering high up the corridor (fills upper band) */}
                {Array.from({ length: 5 }, (_, b) => Array.from({ length: 6 }, (_, c) => {
                  const bx = 120 + b * 168, y = 172 + c * 9;
                  const on = seed(b * 6 + c + Math.floor(lf / 8)) > 0.6 ? 1 : 0.14;
                  const col = seed(b + c * 3) > 0.86 ? REDA : COLD;
                  return <rect key={`wl${b}-${c}`} x={bx} y={y} width={22} height={4} rx={1} fill={col} opacity={on * 0.2} />;
                }))}

                {/* ceiling ribs converging to the HIGH vanishing point = we are looking UP */}
                {Array.from({ length: 9 }, (_, i) => {
                  const ex = (i / 8) * 1012;
                  return <line key={`cr${i}`} x1={VVPx} y1={VVPy} x2={ex} y2={150} stroke={`rgba(127,180,255,${0.05 + esc * 0.05})`} strokeWidth={1.3} />;
                })}

                {/* deepest corridor row (dissolving into haze) */}
                {towersDeep.map((t) => (
                  <polygon key={`td${t.i}`} points={`${t.bx},${baseY3} ${t.bx + t.w},${baseY3} ${t.trx},${topY3} ${t.tlx},${topY3}`} fill="url(#s2towerC)" stroke="#070A0E" strokeWidth={1.1} opacity={0.7} />
                ))}

                {/* second-back row racks */}
                {towersBack.map((t) => (
                  <g key={`tb${t.i}`}>
                    <polygon points={`${t.bx},${baseY2} ${t.bx + t.w},${baseY2} ${t.trx},${topY2} ${t.tlx},${topY2}`} fill="url(#s2towerB)" stroke="#070B0F" strokeWidth={1.6} />
                    {Array.from({ length: 5 }, (_, k) => {
                      const frac = (k + 1) / 6;
                      const y = baseY2 + (topY2 - baseY2) * frac;
                      const lx = t.bx + (t.tlx - t.bx) * frac;
                      const rx = (t.bx + t.w) + (t.trx - (t.bx + t.w)) * frac;
                      const on = seed(t.i * 5 + k + Math.floor(lf / 7)) > 0.5 ? 1 : 0.2;
                      return <rect key={k} x={lx + (rx - lx) * 0.3} y={y} width={(rx - lx) * 0.4} height={5} rx={2} fill={COLD} opacity={on * 0.24} />;
                    })}
                  </g>
                ))}

                {/* main server towers leaning IN at the top with cold LED columns */}
                {towers.map((t) => (
                  <g key={`tw${t.i}`}>
                    <polygon points={`${t.bx},${baseY} ${t.bx + t.w},${baseY} ${t.trx},${topY} ${t.tlx},${topY}`} fill="url(#s2tower)" stroke="#090D11" strokeWidth={2.5} />
                    {Array.from({ length: 8 }, (_, k) => {
                      const frac = (k + 1) / 9;
                      const y = baseY + (topY - baseY) * frac;
                      const lx = t.bx + (t.tlx - t.bx) * frac;
                      const rx = (t.bx + t.w) + (t.trx - (t.bx + t.w)) * frac;
                      const on = seed(t.i * 3 + k + Math.floor(lf / 6)) > 0.42 ? 1 : 0.16;
                      const col = seed(t.i + k * 2) > 0.82 ? REDA : TEAL;
                      return <rect key={k} x={lx + (rx - lx) * 0.28} y={y} width={(rx - lx) * 0.44} height={7} rx={2} fill={col} opacity={on * (0.32 + t.d * 0.4)} />;
                    })}
                  </g>
                ))}
              </svg>

              {/* distant dust particulate drifting up the shaft */}
              {Array.from({ length: 12 }, (_, i) => {
                const sd = seed(i + 9);
                const x = seed(i * 2.3) * 1012;
                const y = (seed(i * 1.7) * 792 - lf * (0.5 + sd)) % 792;
                return <div key={`fd${i}`} style={{ position: "absolute", left: x, top: (y + 792) % 792, width: 2 + sd * 2, height: 2 + sd * 2, borderRadius: "50%", background: "rgba(150,200,255,0.8)", opacity: 0.14 + sd * 0.16 }} />;
              })}
            </div>

            {/* ========== PLANE 1.5 - OVERHEAD RIG: ceiling gantry, cable trays + hanging harnesses (mid parallax) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 0.62}px,${camTy * 0.62}px)`, pointerEvents: "none" }}>
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s2beam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#232C36" /><stop offset="100%" stopColor="#0A0F14" />
                  </linearGradient>
                </defs>
                {/* main structural I-beam spanning the hall ceiling */}
                <rect x={-40} y={150} width={1092} height={20} fill="url(#s2beam)" stroke="#05080B" strokeWidth={2} />
                <rect x={-40} y={168} width={1092} height={7} fill="#05080B" opacity={0.8} />
                {/* diagonal truss bracing along the beam */}
                {Array.from({ length: 11 }, (_, i) => {
                  const x0 = -40 + i * 100;
                  return <path key={`tr${i}`} d={`M ${x0} 150 L ${x0 + 50} 170 L ${x0 + 100} 150`} stroke="rgba(20,28,36,0.9)" strokeWidth={3} fill="none" />;
                })}
                {/* cable LADDER TRAY hung below the beam, rungs receding */}
                <path d="M -40 196 L 1052 196 M -40 214 L 1052 214" stroke="#0C121A" strokeWidth={3} />
                {Array.from({ length: 22 }, (_, i) => {
                  const x = -40 + i * 50;
                  return <line key={`rung${i}`} x1={x} y1={196} x2={x} y2={214} stroke="rgba(24,34,44,0.9)" strokeWidth={2} />;
                })}
                {/* thick bundled wire runs riding the tray, sagging between hangers */}
                {Array.from({ length: 4 }, (_, i) => {
                  const y = 200 + i * 4;
                  const col = i === 1 ? "rgba(90,180,255,0.55)" : i === 3 ? "rgba(90,217,198,0.4)" : "rgba(12,18,24,0.95)";
                  const path = Array.from({ length: 6 }, (_, k) => {
                    const x0 = -40 + k * 190, xm = x0 + 95, x1 = x0 + 190;
                    const sag = y + 16 + i * 3 + Math.sin(lf / 22 + k + i) * 4;
                    return `M ${x0} ${y} Q ${xm} ${sag} ${x1} ${y}`;
                  }).join(" ");
                  return <path key={`wr${i}`} d={path} stroke={col} strokeWidth={i % 2 === 0 ? 4 : 2.5} fill="none" strokeLinecap="round" />;
                })}
                {/* vertical hanger rods dropping from beam to tray */}
                {Array.from({ length: 8 }, (_, i) => {
                  const x = 40 + i * 130;
                  return <line key={`hg${i}`} x1={x} y1={170} x2={x} y2={196} stroke="rgba(16,22,30,0.9)" strokeWidth={3} />;
                })}
                {/* dormant caged worklamp hung on a chain over the corridor */}
                <line x1={360} y1={170} x2={360} y2={244} stroke="rgba(16,22,30,0.9)" strokeWidth={2} />
                <circle cx={360} cy={256} r={14} fill="#0C1218" stroke="#05080B" strokeWidth={2} />
                <circle cx={360} cy={256} r={7} fill={COLD} opacity={0.16 + 0.1 * Math.sin(lf / 5)} />
                <line x1={800} y1={170} x2={800} y2={230} stroke="rgba(16,22,30,0.9)" strokeWidth={2} />
                <circle cx={800} cy={242} r={12} fill="#0C1218" stroke="#05080B" strokeWidth={2} />
                <circle cx={800} cy={242} r={6} fill={REDA} opacity={0.14 + 0.08 * Math.sin(lf / 4 + 2)} />
              </svg>
            </div>

            {/* ========== PLANE 2 - ATMOS: cold teal volumetric shafts + drifting floor fog (own slow drift) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 0.55}px,${camTy * 0.55}px)`, pointerEvents: "none" }}>
              {/* red / cold ALERT wash behind the villain - it is winning */}
              <div style={{ position: "absolute", left: 470, top: 110, width: 540, height: 480, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,86,72,${alert * 0.16}) 0%, rgba(127,180,255,${alert * 0.12}) 40%, transparent 68%)`, filter: "blur(24px)", mixBlendMode: "screen" }} />

              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s2ray" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DCEBFF" stopOpacity="0.5" />
                    <stop offset="58%" stopColor="#7FB4FF" stopOpacity="0.13" />
                    <stop offset="100%" stopColor="#7FB4FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {raysL.map((r, i) => (
                  <polygon key={`ryL${i}`} points={r.pts} fill="url(#s2ray)" opacity={r.op} style={{ mixBlendMode: "screen", filter: "blur(8px)" }} />
                ))}
                {rays.map((r, i) => (
                  <polygon key={`ry${i}`} points={r.pts} fill="url(#s2ray)" opacity={r.op} style={{ mixBlendMode: "screen", filter: "blur(7px)" }} />
                ))}
                {/* drifting volumetric haze band across the hall */}
                <rect x={-120} y={300 + Math.sin(lf / 24) * 16} width={1300} height={200} fill={`rgba(127,180,255,${0.05 + esc * 0.025})`} opacity={0.6} style={{ filter: "blur(28px)", mixBlendMode: "screen" }} />
                {/* second, higher haze stratum drifting counter (added depth) */}
                <rect x={-120} y={210 - Math.sin(lf / 30) * 12} width={1300} height={130} fill={`rgba(110,160,230,${0.035 + esc * 0.02})`} opacity={0.5} style={{ filter: "blur(30px)", mixBlendMode: "screen" }} />
              </svg>

              {/* rolling floor fog banks creeping toward the hero */}
              {Array.from({ length: 3 }, (_, i) => {
                const sd = seed(i + 21);
                const w = 520 + sd * 260;
                const x = ((i * 340 + lf * (0.9 + sd)) % 1500) - 240;
                return <div key={`fog${i}`} style={{ position: "absolute", left: x, top: 588 + i * 22, width: w, height: 150, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(140,185,255,${0.09 + esc * 0.04}) 0%, transparent 68%)`, filter: "blur(26px)", mixBlendMode: "screen" }} />;
              })}

              {/* cold data-embers rising slowly through the shafts (new particulate stratum) */}
              {Array.from({ length: 10 }, (_, i) => {
                const sd = seed(i + 31);
                const x = 140 + seed(i * 4.1) * 760;
                const y = (720 - ((lf * (0.7 + sd) + sd * 792) % 820));
                const tw = 0.5 + 0.5 * Math.sin(lf / 5 + i);
                const col = sd > 0.8 ? "rgba(255,120,100,0.9)" : "rgba(150,205,255,0.95)";
                return <div key={`em${i}`} style={{ position: "absolute", left: x + Math.sin(lf / 14 + i) * 10, top: y, width: 2 + sd * 2.5, height: 2 + sd * 2.5, borderRadius: "50%", background: col, opacity: (0.12 + sd * 0.2) * tw, filter: "blur(0.4px)", boxShadow: `0 0 6px ${col}` }} />;
              })}
            </div>

            {/* ========== PLANE 3 - FAR-MID DRAMA FLOOR: reflections, shadows, cable clutter (sharp) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 0.8}px,${camTy * 0.8}px)` }}>
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                {/* reflective wet floor: gloss plane + horizon gleam */}
                <rect x={0} y={560} width={1012} height={232} fill="url(#s2wall)" opacity={0.85} />
                <rect x={0} y={560} width={1012} height={232} fill="rgba(127,180,255,0.05)" style={{ mixBlendMode: "screen" }} />
                <line x1={0} y1={561} x2={1012} y2={561} stroke="rgba(160,210,255,0.5)" strokeWidth={2} />
                {/* the dormant mainframe's cold reflection smeared down the wet floor */}
                <rect x={356} y={562} width={312} height={170} fill={`rgba(96,150,214,${0.07 + esc * 0.04})`} style={{ filter: "blur(16px)", mixBlendMode: "screen" }} />
                {towers.map((t) => {
                  const cx = t.bx + t.w / 2, rw = t.w * 0.7;
                  const col = seed(t.i) > 0.8 ? REDA : TEAL;
                  return <rect key={`rf${t.i}`} x={cx - rw / 2} y={562} width={rw} height={150} fill={col} opacity={(0.06 + t.d * 0.05) * (0.7 + 0.3 * Math.sin(lf / 6 + t.i))} style={{ filter: "blur(9px)", mixBlendMode: "screen" }} />;
                })}
                {/* villain's cold reflection pooling on the floor */}
                <ellipse cx={720} cy={606} rx={214} ry={122} fill={`rgba(127,180,255,${0.08 + esc * 0.05})`} style={{ filter: "blur(24px)", mixBlendMode: "screen" }} />

                {/* the villain's SHADOW pouring down the floor toward the hero (grows the whole scene) */}
                <polygon points={`648,500 792,500 ${548 - esc * 96},792 ${20 - esc * 44},744`} fill="#04070A" opacity={0.34 + esc * 0.22} style={{ filter: "blur(4px)" }} />

                {/* floor cable trays + conduit snaking between the rack bases (new floor detail) */}
                {Array.from({ length: 3 }, (_, i) => {
                  const y = 590 + i * 40;
                  const col = i === 1 ? "rgba(90,180,255,0.45)" : "rgba(10,15,20,0.9)";
                  return <path key={`fc${i}`} d={`M -40 ${y} C 240 ${y - 14}, 520 ${y + 20}, 1052 ${y - 6}`} stroke={col} strokeWidth={i === 1 ? 3 : 7} fill="none" strokeLinecap="round" />;
                })}
                {/* stacked conduit junction box at the rack base, left corridor */}
                <rect x={250} y={548} width={64} height={30} rx={3} fill="#0C1218" stroke="#05080B" strokeWidth={2} />
                {Array.from({ length: 3 }, (_, i) => (
                  <circle key={`jb${i}`} cx={264 + i * 18} cy={563} r={3.5} fill={seed(i + Math.floor(lf / 9)) > 0.5 ? TEAL : "#16202A"} opacity={0.7} />
                ))}

                {/* mid cable clutter draping between the racks */}
                {Array.from({ length: 5 }, (_, i) => {
                  const x0 = 120 + i * 180, x1 = x0 + 150;
                  const sag = 250 + i * 24 + Math.sin(lf / 20 + i) * 6;
                  const col = i % 3 === 0 ? "rgba(90,180,255,0.5)" : "rgba(14,20,26,0.9)";
                  return <path key={`mc${i}`} d={`M ${x0} ${200 + i * 10} Q ${(x0 + x1) / 2} ${sag} ${x1} ${205 + i * 8}`} stroke={col} strokeWidth={i % 3 === 0 ? 3 : 6} fill="none" strokeLinecap="round" />;
                })}
                {/* faint floor scanlines converging up */}
                {Array.from({ length: 4 }, (_, i) => {
                  const p = (i + ((lf * 0.05) % 1)) / 4;
                  const y = 592 + (792 - 592) * p;
                  return <line key={`flr${i}`} x1={-40} y1={y} x2={1052} y2={y} stroke={`rgba(127,180,255,${0.05 + esc * 0.03})`} strokeWidth={1.2} />;
                })}
              </svg>
            </div>

            {/* ========== PLANE 4 - HERO + VILLAIN (the sharp drama plane) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx}px,${camTy}px)` }}>

              {/* hero's pooled shadow on the floor */}
              <div style={{ position: "absolute", left: 20, top: 632, width: 260, height: 46, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 72%)", filter: "blur(6px)" }} />

              {/* HERO: tiny, low, in shadow, ACTIVE - staggering back + craning up */}
              <div style={{ position: "absolute", inset: 0, transform: `translate(${hx}px,${hy}px) rotate(${hrot}deg)`, transformOrigin: "170px 560px" }}>
                <IronClaude lf={lf} size={244} left={44} top={438} pose="idle" core={heroCore} flip={1} z={26} />
              </div>

              {/* the villain's shadow FALLING over the hero (he is dwarfed, in the dark) */}
              <div style={{ position: "absolute", left: -20, top: 380, width: 380, height: 412, background: "linear-gradient(120deg, rgba(4,7,10,0.44) 0%, rgba(4,7,10,0.16) 46%, transparent 74%)", mixBlendMode: "multiply", pointerEvents: "none" }} />

              {/* MID: the VILLAIN looming huge upper-right, full menace, mocking */}
              <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + mockPunch * 0.03})`, transformOrigin: "737px 336px" }}>
                <Generic9000 lf={lf} size={362} left={556} top={174} pose={villPose} menace={1} flip={-1} z={34} />
              </div>

              {/* windup glint charging on the cyclops screen right before the flick */}
              {wind > 0.02 && (
                <div style={{ position: "absolute", left: 656, top: 210, width: 46, height: 46, zIndex: 41, borderRadius: "50%", background: `radial-gradient(circle, rgba(220,235,255,${wind * 0.9}) 0%, rgba(127,180,255,0) 70%)`, filter: "blur(2px)", pointerEvents: "none" }} />
              )}

              {/* smug loading-spinner ON the cyclops screen (before it is hurled) */}
              {lf < FLICK && (
                <div style={{ position: "absolute", left: 648, top: 202, width: 62, height: 62, zIndex: 40, transform: `rotate(${spin}deg)`, opacity: 0.92 }}>
                  <svg viewBox="0 0 62 62" width="62" height="62">
                    <circle cx={31} cy={31} r={23} fill="none" stroke="rgba(127,180,255,0.24)" strokeWidth={7} />
                    <circle cx={31} cy={31} r={23} fill="none" stroke={COLD} strokeWidth={7} strokeLinecap="round" strokeDasharray="34 130" />
                  </svg>
                </div>
              )}

              {/* the dismissive spinner HURLED down at the tiny hero */}
              {flkLive && (
                <div style={{ position: "absolute", left: flkX, top: flkY, width: 62, height: 62, zIndex: 55, transform: `translate(-31px,-31px) rotate(${flkSpin}deg) scale(${flkScale})` }}>
                  <div style={{ position: "absolute", left: -18, top: 4, width: 96, height: 54, borderRadius: "50%", background: `linear-gradient(90deg, rgba(127,180,255,0) 0%, rgba(127,180,255,0.32) 100%)`, filter: "blur(6px)", transform: "rotate(28deg)" }} />
                  <svg viewBox="0 0 62 62" width="62" height="62" style={{ position: "relative", filter: "drop-shadow(0 0 10px rgba(127,180,255,0.6))" }}>
                    <circle cx={31} cy={31} r={23} fill="rgba(10,16,24,0.6)" stroke="rgba(127,180,255,0.28)" strokeWidth={7} />
                    <circle cx={31} cy={31} r={23} fill="none" stroke={COLD} strokeWidth={7} strokeLinecap="round" strokeDasharray="34 130" />
                    <text x={31} y={39} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={900} fill="#DCEBFF">x</text>
                  </svg>
                </div>
              )}

              {/* impact shockwave + spark where the token lands next to the hero */}
              {impLive && impact < 1 && (
                <div style={{ position: "absolute", left: 176, top: 512, zIndex: 54, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
                  <div style={{ position: "absolute", left: `${-40 - impact * 40}px`, top: `${-40 - impact * 40}px`, width: 80 + impact * 80, height: 80 + impact * 80, borderRadius: "50%", border: `${4 - impact * 3}px solid rgba(127,180,255,${(1 - impact) * 0.8})` }} />
                  {Array.from({ length: 6 }, (_, i) => {
                    const a = (i / 6) * Math.PI * 2, r = impact * 42;
                    return <div key={`sp${i}`} style={{ position: "absolute", left: Math.cos(a) * r, top: Math.sin(a) * r, width: 4, height: 4, borderRadius: "50%", background: "#DCEBFF", opacity: 1 - impact }} />;
                  })}
                </div>
              )}
            </div>

            {/* ========== PLANE 5 - FG: blurred server-cable silhouettes framing the edges (fast parallax + DOF) ========== */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${camTx * 1.8}px,${camTy * 1.8}px)`, filter: "blur(5.5px)", pointerEvents: "none" }}>
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                {/* extreme-foreground dark racks leaning in from the corners */}
                <polygon points="-60,792 150,792 96,150 -60,150" fill="#05080B" />
                <polygon points="1072,792 862,792 922,140 1072,140" fill="#04070A" />
                {/* a near out-of-focus rack face with cold LED strip on the left edge */}
                {Array.from({ length: 6 }, (_, i) => {
                  const on = seed(i + Math.floor(lf / 5)) > 0.5 ? 1 : 0.2;
                  return <rect key={`fgl${i}`} x={26} y={230 + i * 62} width={38} height={9} rx={3} fill={seed(i) > 0.85 ? REDA : TEAL} opacity={on * 0.5} />;
                })}
                {/* slack cable bundles drooping across the corners */}
                <path d={`M 1072 210 Q 900 ${300 + Math.sin(lf / 18) * 8} 852 470`} stroke="#0A0F13" strokeWidth={11} fill="none" strokeLinecap="round" />
                <path d={`M 1072 268 Q 936 ${372 + Math.sin(lf / 15) * 7} 890 520`} stroke="#0C1217" strokeWidth={7} fill="none" strokeLinecap="round" />
                <path d={`M 1072 330 Q 908 ${430 + Math.sin(lf / 13 + 2) * 7} 872 588`} stroke="rgba(60,120,180,0.5)" strokeWidth={4} fill="none" strokeLinecap="round" />
                <path d={`M -60 300 Q 70 ${420 + Math.sin(lf / 17 + 1) * 8} 128 560`} stroke="#080C10" strokeWidth={13} fill="none" strokeLinecap="round" />
                <path d={`M -60 356 Q 96 ${470 + Math.sin(lf / 21) * 6} 150 620`} stroke="rgba(60,120,180,0.5)" strokeWidth={4} fill="none" strokeLinecap="round" />
              </svg>
              {/* big near dust motes blurred in the lens */}
              {Array.from({ length: 7 }, (_, i) => {
                const sd = seed(i + 3);
                const x = seed(i * 3.1) * 1012;
                const y = (seed(i * 2.2) * 792 - lf * (1.1 + sd)) % 792;
                return <div key={`nd${i}`} style={{ position: "absolute", left: x, top: (y + 792) % 792, width: 5 + sd * 5, height: 5 + sd * 5, borderRadius: "50%", background: "rgba(170,210,255,0.85)", opacity: 0.2 + sd * 0.16 }} />;
              })}
            </div>

            {/* ========== THE GAG: soulless AI-slop blip mocking the powered-down hero (sharp content) ========== */}
            <div style={{ position: "absolute", left: 168, top: 214, zIndex: 60, transform: `translate(${camTx}px,${camTy + (1 - bubbleP) * 16}px) scale(${0.86 + Math.min(1, bubbleP) * 0.14})`, transformOrigin: "88% 40%", opacity: Math.min(1, bubbleP) }}>
              <div style={{ position: "relative", width: 356, padding: "16px 20px", borderRadius: 16, background: grad("#E7EAEC", "#C6CDD1"), border: "3px solid #9AA6AC", boxShadow: "0 14px 30px -10px rgba(0,0,0,0.6)" }}>
                <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 1, color: "#7A868C", marginBottom: 4 }}>GENERIC-9000</div>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, lineHeight: 1.08, color: "#252B2F" }}>
                  "As an AI language model,<br />I have no memory of you<span style={{ opacity: cursor, color: "#8A959A" }}>_</span>"
                </div>
                <div style={{ position: "absolute", right: 26, top: -18, width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "10px solid transparent", borderBottom: "22px solid #C6CDD1", transform: "rotate(18deg)" }} />
              </div>
            </div>
          </div>

          {/* ================= SCREEN-SPACE GRADE + GRAIN + VIGNETTE (lens, not tilted) ================= */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(255,138,76,0.12) 0%, rgba(255,138,76,0) 40%, rgba(24,60,110,0.26) 100%)", mixBlendMode: "soft-light", pointerEvents: "none" }} />
          <svg viewBox="0 0 1012 792" width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity: 0.16, mixBlendMode: "soft-light", pointerEvents: "none" }}>
            <defs>
              <filter id="s2grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={grainSeed} stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="1012" height="792" filter="url(#s2grain)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 240px rgba(0,0,0,0.8)", pointerEvents: "none" }} />
        </>
      );
    })()}
  </Panel>
);

const S3: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="obsidian · vault">
    {(() => {
      // ===================== TIMELINE (vault cracks in STAGES -> DETONATES -> pours) =====================
      const DET = 15;                                   // obsidian fully DETONATES
      const CR1 = 5, CR2 = 9, CR3 = 12;
      const crackPulse = (t: number, mag: number) => { const p = over(lf, t, fr(0.28)); return p > 0 && p < 1 ? (1 - p) * mag : 0; };
      const crk1 = crackPulse(CR1, 0.45), crk2 = crackPulse(CR2, 0.72), crk3 = crackPulse(CR3, 1.0);
      const crackFlash = crk1 + crk2 + crk3;
      const fissure = over(lf, CR1, fr(0.5)) * 0.5 + over(lf, CR2, fr(0.5)) * 0.3 + over(lf, CR3, fr(0.4)) * 0.7;
      const charge = over(lf, 0, DET);
      const vib = Math.sin(lf * 1.9) * charge * 4.2 + (crk1 + crk2 + crk3) * 6;
      const shatter = over(lf, DET, fr(0.9));
      const husk = 1 - over(lf, DET, fr(0.42));
      const flash = over(lf, DET, fr(0.5));
      const wave = over(lf, DET, fr(0.95));
      const escalate = ramp(lf, DET, 168);              // torrent thickens to a peak across the whole scene
      const source = 0.3 + 0.7 * over(lf, DET, fr(0.7));
      const core = 0.1 + over(lf, DET, fr(4.2)) * 0.3;  // arc-reactor fills its FIRST THIRD (0.1 -> 0.4)
      const surge = over(lf, 150, 18);
      const notes = Math.round(ramp(lf, DET, 168) * 1240);
      const fmt = (n: number) => (n >= 1000 ? Math.floor(n / 1000) + "," + String(n % 1000).padStart(3, "0") : String(n));

      // ===================== CAMERA: a slow ORBIT that ARCS around the obsidian vault (escalates the whole time) =====================
      const prog = over(lf, 0, 178, Easing.inOut(Easing.cubic));
      const acc = prog * prog;                                       // orbit ACCELERATES into the 3rd act (never freezes)
      const az = -0.62 + prog * 0.7 + acc * 0.5 + Math.sin(lf / 40) * 0.05;   // azimuth (rad): arcs, tightens late
      const push = 1.02 + prog * 0.1 + acc * 0.075;                 // dolly-in as intensity escalates
      const shk = lf >= DET && lf < DET + 11 ? 1 - (lf - DET) / 11 : 0;
      const microShk = (crk1 + crk2 + crk3) * 0.9;
      const shakeX = (shk + microShk) * Math.sin(lf * 3.3) * 5.6, shakeY = (shk + microShk) * Math.cos(lf * 3.0) * 4.2;
      const camRot = az * 3.2 + Math.sin(lf / 46) * 0.5;
      const panX = az * 48 + shakeX;
      const panY = -prog * 9 + Math.sin(lf / 52) * 5 + shakeY;
      const azDeg = az * 28;                            // local rotateY turn for vault + housing + chamber
      const farParX = -az * 90;                         // far band counter-parallax (opposite the orbit)
      const midParX = -az * 54;
      const nearParX = az * 34;                         // near foreground rides WITH the orbit

      // ===================== WORLD ANCHORS =====================
      const Vx = 432, Vy = 398;                          // obsidian vault centre
      const heroSize = 356, heroTop = 314, REACH = DET + 6;
      const strainY = Math.sin(lf * 1.2) * escalate * 3;
      const heroRecoilX = escalate * 9 + Math.sin(lf * 1.1) * escalate * 2.2;
      const heroLeft = 596 + az * 30 + heroRecoilX;
      const Rx = heroLeft + heroSize * 0.6 * 0.5;
      const Ry = heroTop + strainY + heroSize * 0.56;
      const heroPose = lf < REACH ? "point" : "charge";
      const focal = 540;

      // ===================== 3D GLYPH TORRENT (erupts from the vault, orbits, converges into the reactor) =====================
      const makeGlyph = (i: number): { front: boolean; el: JSX.Element } | null => {
        if (lf < DET) return null;
        const sd0 = seed(i + 1), sd1 = seed(i * 1.7 + 2), sd2 = seed(i * 2.3 + 3), sd3 = seed(i * 3.1 + 5), sd4 = seed(i * 4.2 + 7);
        if (sd4 > 0.35 + escalate * 0.65) return null;
        const theta = sd0 * Math.PI * 2, elev = (sd1 - 0.5) * 0.9, rad = 58 + sd2 * 150, speed = 0.5 + sd3 * 0.85;
        const life = lf - (DET + sd1 * 9);
        if (life <= 0) return null;
        const u = ((life * 0.0115 * speed) % 1 + 1) % 1;
        const ang = theta + az * 1.15;
        const depth = Math.sin(ang) * rad, worldX = Math.cos(ang) * rad, ps = focal / (focal - depth);
        const haloX = Vx + worldX * ps, haloY = Vy - 16 + elev * rad * ps - u * 26;
        const depthT = (depth + rad) / (2 * rad);
        const w = Math.pow(u, 1.7);
        const x = haloX + (Rx - haloX) * w, y = haloY + (Ry - haloY) * w;
        const env = ramp(u, 0, 0.08) * (1 - ramp(u, 0.82, 1));
        const bright = env * (0.42 + escalate * 0.58) * (0.4 + depthT * 0.6) * (0.6 + sd2 * 0.4);
        if (bright < 0.06) return null;
        const gsc = (0.66 + escalate * 0.34) * ps * (1 - u * 0.34) * (0.7 + sd0 * 0.55);
        const blurPx = (1 - depthT) * 2.6;
        const front = depthT > 0.5;
        const zi = front ? 12 : 6;
        const deg = Math.atan2(Ry - haloY, Rx - haloX) * 57.3 * w + ang * 57.3 * (1 - w) * 0.4 + Math.sin(lf * 0.1 + i) * 8;
        if (i % 3 === 0) {
          const gw = (15 + sd2 * 9) * gsc;
          return { front, el: (
            <div key={"g" + i} style={{ position: "absolute", left: x - gw / 2, top: y - gw * 0.64, width: gw, height: gw * 1.28, zIndex: zi, transform: `rotate(${deg * 0.5}deg)`, background: "linear-gradient(180deg, rgba(200,244,255,0.95) 0 24%, rgba(120,190,225,0.68) 24% 100%)", borderRadius: 3, border: "1px solid rgba(234,251,255,0.85)", boxShadow: `0 0 ${6 + sd2 * 8}px rgba(127,232,255,0.7)`, opacity: Math.min(1, bright), filter: blurPx > 0.3 ? `blur(${blurPx}px)` : undefined }}>
              <div style={{ position: "absolute", left: 3, right: 3, top: gw * 0.44, height: 1.4, background: "rgba(20,40,56,0.6)" }} />
              <div style={{ position: "absolute", left: 3, right: 6, top: gw * 0.68, height: 1.4, background: "rgba(20,40,56,0.45)" }} />
            </div>) };
        }
        const sz = (3 + sd2 * 5) * gsc, len = sz * (2.4 + sd3);
        return { front, el: (
          <div key={"d" + i} style={{ position: "absolute", left: x - len / 2, top: y - sz / 2, width: len, height: sz, zIndex: zi, transform: `rotate(${deg}deg)`, background: "linear-gradient(90deg, rgba(127,232,255,0) 0%, #BFF2FF 60%, #EAFBFF 100%)", borderRadius: 999, boxShadow: `0 0 ${5 + sd2 * 7}px rgba(127,232,255,0.8)`, opacity: Math.min(1, bright), filter: blurPx > 0.3 ? `blur(${blurPx}px)` : undefined }} />) };
      };
      const built = Array.from({ length: 90 }, (_, i) => makeGlyph(i)).filter(Boolean) as { front: boolean; el: JSX.Element }[];
      const backGlyphs = built.filter((g) => !g.front).map((g) => g.el);
      const frontGlyphs = built.filter((g) => g.front).map((g) => g.el);

      // ===================== DISTANT GLYPH SHOALS (far parallax, heavy DoF, drift past before the blast too) =====================
      const shoal = Array.from({ length: 26 }, (_, i) => {
        const sa = seed(i * 1.3 + 11), sb = seed(i * 2.1 + 4), sc = seed(i * 3.7 + 9);
        const bandY = 150 + sb * 300;
        const drift = ((lf * (0.5 + sc) + sa * 1012) % 1120) - 54;
        const gx = drift + Math.sin(lf * 0.02 + i) * 8;
        const depthBlur = 3 + sc * 4;
        const op = (0.14 + sc * 0.16) * (0.55 + charge * 0.25 + escalate * 0.2);
        const sz = 6 + sc * 7;
        return <div key={"sho" + i} style={{ position: "absolute", left: gx, top: bandY, width: sz * 1.7, height: sz, borderRadius: 999, background: "linear-gradient(90deg, rgba(127,232,255,0) 0%, rgba(160,220,245,0.9) 70%)", filter: `blur(${depthBlur}px)`, opacity: op }} />;
      });

      // ===================== ADDED: DEEPEST RUNE SHOAL (a second, far-far band of glyph-slabs, extreme DoF, slow drift) =====================
      const deepShoal = Array.from({ length: 22 }, (_, i) => {
        const sa = seed(i * 2.7 + 41), sb = seed(i * 1.5 + 8), sc = seed(i * 3.9 + 3);
        const bandY = 84 + sb * 540;
        const drift = ((lf * (0.22 + sc * 0.38) + sa * 1012) % 1180) - 90;
        const gx = drift + Math.sin(lf * 0.014 + i) * 6;
        const sz = 10 + sc * 14;
        const op = (0.07 + sc * 0.09) * (0.5 + charge * 0.2 + escalate * 0.18);
        return (
          <div key={"dsh" + i} style={{ position: "absolute", left: gx, top: bandY, width: sz * 1.55, height: sz * 1.9, borderRadius: 3, background: "linear-gradient(180deg, rgba(150,210,240,0.85) 0 26%, rgba(84,140,196,0.5) 26% 100%)", filter: `blur(${7 + sc * 5}px)`, opacity: op }}>
            <div style={{ position: "absolute", left: 3, right: 3, top: sz * 0.72, height: 1.6, background: "rgba(30,60,84,0.5)" }} />
          </div>
        );
      });

      // ===================== ADDED: VOLUMETRIC HAZE BANDS drifting across the chamber (soft cyan fog, mid depth) =====================
      const hazeBands = Array.from({ length: 5 }, (_, i) => {
        const ha = seed(i * 3.1 + 17);
        const hy = 150 + i * 128;
        const hx = ((lf * (0.16 + ha * 0.3) + ha * 1200) % 1400) - 200;
        const hop = (0.05 + ha * 0.05) * (0.6 + charge * 0.3 + escalate * 0.25);
        return <div key={"haze" + i} style={{ position: "absolute", left: hx, top: hy, width: 560, height: 150, borderRadius: "50%", background: "radial-gradient(60% 60% at 50% 50%, rgba(110,170,225,0.7), transparent 72%)", filter: "blur(26px)", opacity: hop }} />;
      });

      // ===================== ADDED: FLOATING DATA-MOTE FIELD (fine dust motes suspended through the chamber air, multi-depth) =====================
      const motes = Array.from({ length: 44 }, (_, i) => {
        const ma = seed(i * 1.7 + 31), mb = seed(i * 2.9 + 12), mc = seed(i * 3.3 + 5);
        const depth = 0.3 + mc * 0.7;
        const mx = ((ma * 1012 + lf * (0.2 + mb * 0.6) * depth) % 1040) - 14;
        const my = 84 + mb * 630 + Math.sin(lf * 0.03 + i) * (10 + mc * 22);
        const msz = (1.2 + mc * 3) * depth;
        const mop = (0.14 + mc * 0.32) * (0.5 + charge * 0.3 + escalate * 0.24) * depth;
        return <div key={"mote" + i} style={{ position: "absolute", left: mx, top: my, width: msz, height: msz, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,244,255,0.95), rgba(127,232,255,0) 70%)", boxShadow: `0 0 ${3 + mc * 5}px rgba(127,232,255,0.6)`, opacity: mop, filter: depth < 0.6 ? `blur(${(0.6 - depth) * 4}px)` : undefined }} />;
      });

      // ===================== ADDED: CEILING GOD-RAY SHAFTS pouring DOWN from the apex keystone (volumetric, top-lit) =====================
      const ceilingRays = Array.from({ length: 7 }, (_, i) => {
        const a = -0.5 + (i - 3) * 0.14 + az * 0.28 + Math.sin(lf * 0.04 + i) * 0.03;
        const len = 420 + i * 24;
        const op = (0.04 + 0.05 * Math.abs(Math.sin(lf * 0.07 + i * 1.3))) * (0.5 + escalate * 0.4 + charge * 0.3) + crackFlash * 0.06;
        return <div key={"cray" + i} style={{ position: "absolute", left: Vx, top: 118, width: 34 + i * 5, height: len, transformOrigin: "50% 0%", transform: `rotate(${a * 57.3}deg)`, background: "linear-gradient(180deg, rgba(150,200,255,0.55) 0%, rgba(127,232,255,0.3) 42%, rgba(127,232,255,0) 82%)", filter: "blur(9px)", opacity: op }} />;
      });

      // ===================== GAG: the one 2am note you can actually read, riding the current into the helmet =====================
      const gLife = lf - (DET + 22);
      const gu = Math.max(0, Math.min(1, gLife * 0.0072));
      const gang = 0.7 + az * 1.15, grd = 150, gdepth = Math.sin(gang) * grd, gps = focal / (focal - gdepth);
      const ghaloX = Vx + Math.cos(gang) * grd * gps, ghaloY = Vy - 10 - 0.15 * grd * gps - gu * 26;
      const gw = Math.pow(gu, 1.7);
      const gx = ghaloX + (Rx - ghaloX) * gw, gy = ghaloY + (Ry - ghaloY) * gw;
      const gO = ramp(gu, 0.02, 0.12) * (1 - ramp(gu, 0.8, 0.98));
      const gScale = (0.86 + escalate * 0.18) * gps * (1 - gu * 0.3);

      // ===================== THE OBSIDIAN GEODE: faceted volcanic glass that cracks open and keeps burning =====================
      // A real (small) 3D renderer, not a drawn illustration. Every facet is a projected polygon with a
      // true surface normal, shaded by four independent light terms plus violet core-fire transmitted
      // THROUGH the glass. The fire is gated by the facet's radial distance from the crystal axis, which
      // is what separates near-black obsidian from a purple amethyst.
      const oVF = 780;                                                        // vault-local focal length
      const oYaw = az * 0.42 + Math.sin(lf / 74) * 0.05;                      // the stone turns ON its plinth; the ORBIT stays on the wrapper (rotateY(azDeg)) exactly as before
      const oOpen = over(lf, DET, fr(1.1), Easing.out(Easing.cubic));         // the geode cracks open along its seams and STAYS open
      const oSeal = husk;                                                     // the intact glass skin sealing the core: gone once it blows
      // heat keeps climbing on ESCALATE, so the spent shell burns hotter as the note counter climbs
      const oHeat = 0.10 + charge * 0.42 + crackFlash * 0.26 + escalate * 0.30;
      const oDen = 0.22 + charge * 0.28 + escalate * 0.50;                    // archive density: fills as the counter climbs, never empties
      const oBreath = 0.88 + 0.12 * Math.sin(lf * 0.34);
      const oC = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
      const oNrm = (a: { X: number; Y: number; Z: number }, b: { X: number; Y: number; Z: number }, c: { X: number; Y: number; Z: number }) => {
        const ux = b.X - a.X, uy = b.Y - a.Y, uz = b.Z - a.Z;
        const vx = c.X - a.X, vy = c.Y - a.Y, vz = c.Z - a.Z;
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        return [nx / L, ny / L, nz / L];
      };
      // per-facet material response. Obsidian is BLACK glass: almost no diffuse, all specular + hard rim,
      // and the violet fire only shows through the DEEP centre of the body, never as a flat tint on every face.
      const oFill = (n: number[], back: boolean, rad: number) => {
        const lam = Math.max(0, n[0] * -0.42 + n[1] * -0.78 + n[2] * 0.46);                   // key light, upper left
        const rimv = Math.pow(Math.max(0, n[0] * 0.66 + n[1] * -0.26 + n[2] * -0.70), 2.2);   // hard rim from behind
        const spc = Math.pow(Math.max(0, n[0] * -0.20 + n[1] * -0.50 + n[2] * 0.84), 22);     // glassy specular
        const wrm = Math.pow(Math.max(0, n[0] * 0.86 + n[1] * 0.08 + n[2] * 0.50), 2.4);      // gold bounce off the hero
        const thru = Math.max(0, n[2]) * oHeat * Math.pow(1 - Math.min(1, rad), 1.7);         // fire through the deep centre ONLY
        const m = back ? 0.5 : 1;
        const r = oC(4 + (lam * 9 + rimv * 64 + spc * 150 + wrm * 30) * m + thru * 104);
        const g = oC(3 + (lam * 6 + rimv * 84 + spc * 162 + wrm * 18) * m + thru * 26);
        const b = oC(8 + (lam * 19 + rimv * 122 + spc * 176 + wrm * 8) * m + thru * 196);
        return `rgb(${r},${g},${b})`;
      };

      const oFacets: { d: string; f: string; z: number; o: number; k: string }[] = [];
      const oLimbs: { d: string; k: string; w: number }[] = [];
      const oSeams: { d: string; k: string; ph: number }[] = [];
      const oClipPts: string[] = [];

      // builds one crystal (bipyramid with a crown course) into the shared draw lists
      const oBuild = (ox: number, oy: number, sc: number, yawOff: number, lean: number, sides: number, sb: number, isMain: boolean) => {
        const R = 100 * sc, TOPY = -158 * sc, CRNY = -74 * sc, BOTY = 124 * sc;
        const cl = Math.cos(lean), sl = Math.sin(lean);
        const pt = (a: number, r: number, y: number) => {
          const x0 = Math.cos(a) * r, z0 = Math.sin(a) * r;
          const xr = x0 * cl - y * sl, yr = x0 * sl + y * cl;
          const ps = oVF / (oVF - z0);
          return { X: xr, Y: yr, Z: z0, ps, sx: Vx + ox + xr * ps, sy: Vy + oy + yr * ps };
        };
        const gir = [] as ReturnType<typeof pt>[], crn = [] as ReturnType<typeof pt>[];
        for (let i = 0; i < sides; i++) {
          const a = (i / sides) * Math.PI * 2 + yawOff + oYaw;
          gir.push(pt(a, R * (0.80 + seed(i * 3.3 + sb) * 0.40), 0));                          // conchoidal irregularity: no two facets match
          crn.push(pt(a + 0.15, R * 0.78 * (0.86 + seed(i * 5.1 + sb + 7) * 0.30), CRNY));
        }
        const apex = pt(0, 0, TOPY), base = pt(0, 0, BOTY);
        const add = (vs: ReturnType<typeof pt>[], fi: number) => {
          const n = oNrm(vs[0], vs[1], vs[2]);
          let cx = 0, cy = 0, cz = 0;
          vs.forEach((p) => { cx += p.X; cy += p.Y; cz += p.Z; });
          cx /= vs.length; cy /= vs.length; cz /= vs.length;
          if (n[0] * cx + n[1] * cy + n[2] * cz < 0) { n[0] = -n[0]; n[1] = -n[1]; n[2] = -n[2]; }
          const off = oOpen * (4 + seed(fi * 2.7 + sb + 3) * 5) * sc;                           // opens along the seams, capped so the footprint holds
          const d = vs.map((p) => `${(p.sx + n[0] * off).toFixed(1)},${(p.sy + n[1] * off).toFixed(1)}`).join(" ");
          const back = cz < 0;
          const rad = Math.min(1, Math.sqrt(cx * cx + cz * cz) / (R * 0.95));                   // 0 on the axis, 1 at the girdle
          // glass is transparent head-on and near-mirror at grazing angles, so the core and the contained
          // notes read THROUGH the middle while the limb stays hard. The dense body underlay carries the mass.
          oFacets.push({ d, f: oFill(n, back, rad), z: cz, o: back ? 0.34 : 0.62 + rad * 0.34, k: sb + "f" + fi });
          oClipPts.push(d);
        };
        let fi = 0;
        for (let i = 0; i < sides; i++) {
          const j = (i + 1) % sides;
          add([apex, crn[i], crn[j]], fi++);                                                    // crown facets
          add([crn[i], crn[j], gir[j], gir[i]], fi++);                                          // girdle band
          add([gir[i], gir[j], base], fi++);                                                    // pavilion facets
        }
        // silhouette limbs: the hard edge light that sells the material. Stroke width tracks the local
        // projection so far-side geometry does not thin out.
        let iL = 0, iR = 0;
        gir.forEach((p, i) => { if (p.sx < gir[iL].sx) iL = i; if (p.sx > gir[iR].sx) iR = i; });
        [iL, iR].forEach((i, q) => oLimbs.push({
          k: sb + "l" + q, w: (isMain ? 2.6 : 1.5) * gir[i].ps,
          d: `M ${apex.sx.toFixed(1)} ${apex.sy.toFixed(1)} L ${crn[i].sx.toFixed(1)} ${crn[i].sy.toFixed(1)} L ${gir[i].sx.toFixed(1)} ${gir[i].sy.toFixed(1)} L ${base.sx.toFixed(1)} ${base.sy.toFixed(1)}`,
        }));
        // meridian seams: the lines the vault cracks along, drawn on unsplit geometry so they retire as it opens
        if (isMain) for (let i = 0; i < sides; i++) oSeams.push({
          k: sb + "s" + i, ph: i / sides,
          d: `M ${apex.sx.toFixed(1)} ${apex.sy.toFixed(1)} L ${crn[i].sx.toFixed(1)} ${crn[i].sy.toFixed(1)} L ${gir[i].sx.toFixed(1)} ${gir[i].sy.toFixed(1)} L ${base.sx.toFixed(1)} ${base.sy.toFixed(1)}`,
        });
      };

      oBuild(0, 0, 1, 0, 0, 9, 0, true);                          // the hero stone
      oBuild(-112, 86, 0.26, 0.7, -0.34, 6, 40, false);            // cluster shards around its foot
      oBuild(108, 92, 0.24, 1.9, 0.30, 6, 70, false);
      oBuild(-30, 74, 0.18, 3.1, 0.12, 6, 90, false);
      oFacets.sort((a, b) => a.z - b.z);
      const oBack = oFacets.filter((f) => f.z < 0);
      const oFront = oFacets.filter((f) => f.z >= 0);

      // CONTAINED ARCHIVE: note slabs suspended INSIDE the glass, rising through the molten interior.
      // Density rides oDen so the vault visibly fills as the note counter climbs, and it NEVER empties:
      // this is the "it holds something precious" read for the whole back half of the scene.
      const oCards = Array.from({ length: 22 }, (_, k) => {
        const s0 = seed(k * 1.9 + 13), s1 = seed(k * 2.7 + 5), s2 = seed(k * 3.5 + 21);
        if (s2 > oDen) return null;
        const a = s0 * Math.PI * 2 + oYaw * 1.1;
        const rr = 14 + s1 * 40 + oOpen * 10;
        const yy = 86 - ((lf * (0.5 + s1 * 1.1) + s0 * 230) % 230);                              // rising column through the vault
        const env = Math.max(0, Math.min(1, (86 - yy) / 34, (yy + 144) / 34));
        const z0 = Math.sin(a) * rr, x0 = Math.cos(a) * rr;
        const ps = oVF / (oVF - z0);
        const w = (13 + s1 * 9) * ps, h = w * 1.28;
        const op = (0.55 + s2 * 0.45) * env * (0.62 + (z0 / rr) * 0.38) * (0.34 + oOpen * 0.66) * (0.5 + escalate * 0.5);
        if (op < 0.04) return null;
        return { k, x: Vx + x0 * ps, y: Vy + yy * ps, w, h, op: Math.min(0.98, op), rot: (s0 - 0.5) * 40 + Math.sin(lf * 0.05 + k) * 5 };
      }).filter(Boolean) as { k: number; x: number; y: number; w: number; h: number; op: number; rot: number }[];

      // FLOOR CAUSTICS: directional splay, because a faceted body throws shaped light, not a smudge
      const oCaust = Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2 + oYaw * 1.4 + Math.sin(lf * 0.03 + i) * 0.08;
        return { i, a: a * 57.3, len: 84 + seed(i * 4.1 + 2) * 66, w: 13 + seed(i * 1.7) * 15,
          op: (0.10 + seed(i * 2.3 + 6) * 0.16) * Math.min(1.3, 0.4 + oHeat * 1.1) * source };
      });

      // ENGRAVED NAMEPLATE: cut per character into the plinth arc BELOW the stone, so no label sits on
      // top of the hero object and nothing lands on the housing ring (arc r=160, inner cyan ring is r=178)
      const oPlate = "OBSIDIAN VAULT".split("").map((ch, i) => {
        const a = Math.PI / 2 - (i - 6.5) * 0.0805;   // minus: index must sweep LEFT to RIGHT or the word reads reversed
        const px = Vx + Math.cos(a) * 160, py = Vy + Math.sin(a) * 160;
        return { ch, i, x: px, y: py, deg: a * 57.2958 - 90 };
      });

      return (<>
        {/* =============================== CAMERA WORLD (orbit + dolly + pan + shake) =============================== */}
        <div style={{ position: "absolute", inset: 0, transform: `translate(${panX}px, ${panY}px) rotate(${camRot}deg) scale(${push})`, transformOrigin: `${Vx}px ${Vy}px` }}>
          <Stage lf={lf} energy={0.7 + escalate * 0.25} hue="cool" />

          {/* ---- LAYER 0 (deepest): indigo->cyan nebula furnace behind the whole chamber ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${farParX * 1.4}px)`, filter: "blur(7px)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 80% at 44% 34%, rgba(46,58,150,0.5), rgba(8,14,34,0.9) 60%, rgba(3,7,16,0.98) 88%)" }} />
            <div style={{ position: "absolute", left: Vx - 300, top: Vy - 320, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,120,220,0.28), transparent 62%)", filter: "blur(30px)", opacity: 0.5 + charge * 0.4 + escalate * 0.3 }} />
          </div>

          {/* ---- ADDED LAYER 0b (deepest backdrop detail): drifting nebula clots + starfield sparks behind the chamber ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${farParX * 1.5}px)`, filter: "blur(9px)" }}>
            {Array.from({ length: 6 }, (_, i) => {
              const na = seed(i * 4.4 + 51);
              const nx = 120 + na * 760 + Math.sin(lf * 0.01 + i) * 20;
              const ny = 80 + seed(i * 2.2 + 3) * 520;
              const nsz = 180 + na * 220;
              const hueMix = i % 2 === 0 ? "rgba(70,90,210,0.22)" : "rgba(52,120,200,0.2)";
              return <div key={"neb" + i} style={{ position: "absolute", left: nx - nsz / 2, top: ny - nsz / 2, width: nsz, height: nsz, borderRadius: "50%", background: `radial-gradient(circle, ${hueMix}, transparent 66%)`, opacity: 0.5 + charge * 0.2 + escalate * 0.15 }} />;
            })}
            {Array.from({ length: 30 }, (_, i) => {
              const sa = seed(i * 1.9 + 61), sb = seed(i * 3.1 + 22);
              const sx = sa * 1012, sy = 40 + sb * 640;
              const tw = 0.2 + 0.5 * Math.abs(Math.sin(lf * 0.05 + i * 1.7));
              return <div key={"star" + i} style={{ position: "absolute", left: sx, top: sy, width: 2, height: 2, borderRadius: "50%", background: "rgba(200,224,255,0.9)", opacity: tw * (0.3 + sb * 0.4) }} />;
            })}
          </div>

          {/* ---- ADDED LAYER 0c: DEEPEST rune shoal band (extreme DoF, slow drift) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${farParX * 1.25}px)` }}>{deepShoal}</div>

          {/* ---- LAYER 1 (FAR ARCHITECTURE): a VAULTED HOLOGRAPHIC CHAMBER, ribs sweeping in 3D as we orbit (heavy DoF) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${farParX * 1.1}px)`, filter: "blur(6px)", perspective: "1300px" }}>
            <div style={{ position: "absolute", inset: 0, transform: `rotateY(${azDeg * 1.25}deg)`, transformOrigin: `${Vx}px ${Vy}px` }}>
              <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s3rib" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(70,96,200,0)" /><stop offset="45%" stopColor="rgba(84,150,225,0.45)" /><stop offset="100%" stopColor="rgba(150,225,255,0.7)" />
                  </linearGradient>
                </defs>
                {/* vaulted ribs converging to an apex keystone above the vault */}
                {Array.from({ length: 9 }, (_, i) => {
                  const spread = (i - 4) * 118;
                  const baseX = Vx + spread;
                  const glow = 0.4 + escalate * 0.4 + crackFlash * 0.5 + 0.14 * Math.abs(Math.sin(lf * 0.05 + i));
                  return <path key={"rib" + i} d={`M ${baseX} 792 C ${baseX} 430, ${Vx + spread * 0.34} 220, ${Vx} 118`} fill="none" stroke="url(#s3rib)" strokeWidth={2.4} opacity={Math.min(0.85, glow)} />;
                })}
                {/* horizontal vault bands (arched courses) */}
                {Array.from({ length: 6 }, (_, i) => {
                  const ry = 150 + i * 96;
                  const rx = 150 + i * 78;
                  return <path key={"band" + i} d={`M ${Vx - rx} ${ry + i * 8} Q ${Vx} ${ry - 70} ${Vx + rx} ${ry + i * 8}`} fill="none" stroke="rgba(120,200,240,0.4)" strokeWidth={1.6} opacity={0.28 + escalate * 0.18 + crackFlash * 0.3} />;
                })}
                {/* ADDED: fine arcane vaulting between the ribs (secondary tracery arches) */}
                {Array.from({ length: 8 }, (_, i) => {
                  const spread = (i - 3.5) * 118;
                  const baseX = Vx + spread;
                  return <path key={"rib2" + i} d={`M ${baseX} 792 C ${baseX} 470, ${Vx + spread * 0.5} 300, ${Vx + spread * 0.14} 150`} fill="none" stroke="rgba(96,160,220,0.28)" strokeWidth={1} opacity={0.22 + escalate * 0.12 + crackFlash * 0.24} />;
                })}
                {/* apex keystone glow */}
                <circle cx={Vx} cy={122} r={16 + crackFlash * 20} fill="rgba(180,230,255,0.6)" opacity={0.4 + escalate * 0.4 + crackFlash * 0.5} />
                {/* ADDED: keystone rune halo */}
                <circle cx={Vx} cy={122} r={30 + crackFlash * 10} fill="none" stroke="rgba(150,220,255,0.5)" strokeWidth={1.4} strokeDasharray="3 8" opacity={0.3 + escalate * 0.3 + crackFlash * 0.4} />
              </svg>
            </div>
          </div>

          {/* ---- ADDED LAYER 1b: ARCANE WALL CIRCUITRY etched down both flank walls (glyph-trace conduits, orbit parallax) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${farParX * 0.95}px)`, filter: "blur(4px)" }}>
            <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <linearGradient id="s3conduit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(127,232,255,0)" /><stop offset="50%" stopColor="rgba(127,232,255,0.5)" /><stop offset="100%" stopColor="rgba(127,232,255,0)" />
                </linearGradient>
              </defs>
              {[70, 118, 900, 948].map((wx, i) => {
                const pulse = 0.16 + 0.14 * Math.abs(Math.sin(lf * 0.09 + i * 1.3)) + escalate * 0.14 + crackFlash * 0.24;
                return <path key={"cond" + i} d={`M ${wx} 130 L ${wx} 300 L ${wx + (i < 2 ? 30 : -30)} 340 L ${wx + (i < 2 ? 30 : -30)} 520 L ${wx} 560 L ${wx} 700`} fill="none" stroke="url(#s3conduit)" strokeWidth={1.6} opacity={pulse} />;
              })}
              {/* circuit nodes glowing along the conduits */}
              {Array.from({ length: 10 }, (_, i) => {
                const side = i % 2 === 0 ? 94 : 924;
                const ny = 160 + (i % 5) * 108;
                const on = 0.3 + 0.5 * Math.abs(Math.sin(lf * 0.12 + i * 0.9)) + crackFlash * 0.3;
                return <circle key={"node" + i} cx={side} cy={ny} r={3.4} fill="#7FE8FF" opacity={Math.min(0.8, on) * (0.5 + escalate * 0.3)} />;
              })}
            </svg>
          </div>

          {/* ---- ADDED LAYER 1c: VOLUMETRIC HAZE BANDS drifting through the chamber ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, transform: `translateX(${farParX * 0.7}px)`, mixBlendMode: "screen" }}>{hazeBands}</div>

          {/* ---- LAYER 2 (far): concentric ENERGY CHAMBER rings around the vault (breathing, orbit-parallax) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, transform: `translateX(${farParX}px)`, filter: "blur(1.4px)" }}>
            <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {Array.from({ length: 5 }, (_, i) => {
                const rr = 250 + i * 74;
                const pulse = 0.10 + 0.10 * Math.abs(Math.sin(lf * 0.06 - i * 0.6)) + escalate * 0.08 + crackFlash * 0.18;
                return <circle key={"cr" + i} cx={Vx} cy={Vy} r={rr} fill="none" stroke="#7FE8FF" strokeWidth={1.5 + (4 - i) * 0.4} strokeDasharray={`${2 + i} ${20 + i * 6}`} strokeDashoffset={-lf * (1.4 + i * 0.5)} opacity={pulse} />;
              })}
              <circle cx={Vx} cy={Vy} r={324} fill="none" stroke="rgba(231,178,76,0.16)" strokeWidth={2} strokeDasharray="1 30" opacity={0.4 + escalate * 0.2} />
              {/* ADDED: two deeper counter-rotating rune rings for extra concentric depth */}
              <circle cx={Vx} cy={Vy} r={398} fill="none" stroke="rgba(127,232,255,0.5)" strokeWidth={1.2} strokeDasharray="2 26" strokeDashoffset={lf * 1.1} opacity={0.14 + escalate * 0.1 + crackFlash * 0.14} />
              <circle cx={Vx} cy={Vy} r={456} fill="none" stroke="rgba(96,150,220,0.5)" strokeWidth={1} strokeDasharray="1 34" strokeDashoffset={-lf * 0.7} opacity={0.1 + escalate * 0.08} />
            </svg>
          </div>

          {/* ---- LAYER 3 (far-mid): back chamber pillars + watching villain (DoF blur, counter-parallax) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 3, transform: `translateX(${farParX}px)`, filter: "blur(4px)" }}>
            {[150, 262, 430].map((x, i) => (
              <div key={"pil" + i} style={{ position: "absolute", left: x, top: 178, width: 26, height: 372, background: "linear-gradient(180deg, rgba(127,232,255,0) 0%, rgba(127,232,255,0.20) 50%, rgba(127,232,255,0) 100%)", filter: "blur(6px)", opacity: 0.4 + 0.3 * Math.abs(Math.sin(lf * 0.12 + i)) }} />
            ))}
            {/* ADDED: matching pillars on the right flank + carved capitals so the chamber wraps both sides */}
            {[590, 758, 872].map((x, i) => (
              <div key={"pilR" + i} style={{ position: "absolute", left: x, top: 178, width: 24, height: 372, background: "linear-gradient(180deg, rgba(127,232,255,0) 0%, rgba(96,168,220,0.18) 50%, rgba(127,232,255,0) 100%)", filter: "blur(6px)", opacity: 0.32 + 0.26 * Math.abs(Math.sin(lf * 0.1 + i + 2)) }} />
            ))}
            <div style={{ position: "absolute", left: 66, top: 132, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,20,30,0.8), transparent 68%)", filter: "blur(8px)" }} />
            <Generic9000 lf={lf} size={150} left={118} top={150} pose="loom" menace={0.7} z={3} />
          </div>
          <div style={{ position: "absolute", inset: 0, zIndex: 4, background: "radial-gradient(38% 46% at 16% 30%, rgba(6,16,26,0.55), transparent 70%)" }} />

          {/* ---- LAYER 4: REFLECTIVE OBSIDIAN FLOOR (mirrors the vault glow + god-rays, perspective plane) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 5, perspective: "900px" }}>
            <div style={{ position: "absolute", left: -200, right: -200, top: Vy + 236, height: 360, transform: `rotateX(66deg) translateX(${midParX * 0.4}px)`, transformOrigin: "50% 0%", background: "linear-gradient(180deg, rgba(18,44,64,0.55) 0%, rgba(6,14,24,0.2) 46%, rgba(4,10,18,0) 100%)", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: Vx - 150, top: 6, width: 300, height: 210, borderRadius: "50%", background: "radial-gradient(circle, rgba(127,232,255,0.5), transparent 66%)", filter: "blur(20px)", opacity: source * (0.55 + crackFlash * 0.5) }} />
              {Array.from({ length: 7 }, (_, i) => (
                <div key={"rf" + i} style={{ position: "absolute", left: Vx - 168 + i * 56, top: 0, width: 2, height: 300, background: "linear-gradient(180deg, rgba(127,232,255,0.4), rgba(127,232,255,0) 80%)", filter: "blur(1.5px)", opacity: (0.2 + 0.25 * Math.abs(Math.sin(lf * 0.1 + i))) * source }} />
              ))}
              {/* ADDED: mirrored villain silhouette + ceiling-rib reflection streaks on the floor */}
              <div style={{ position: "absolute", left: 100, top: 8, width: 120, height: 200, background: "linear-gradient(180deg, rgba(60,90,120,0.25), transparent 76%)", filter: "blur(9px)", opacity: 0.3 + escalate * 0.15 }} />
              {Array.from({ length: 5 }, (_, i) => (
                <div key={"rfrib" + i} style={{ position: "absolute", left: Vx - 220 + i * 110, top: 0, width: 3, height: 240, transform: `skewX(${(i - 2) * 12}deg)`, background: "linear-gradient(180deg, rgba(150,210,255,0.3), rgba(127,232,255,0) 70%)", filter: "blur(2px)", opacity: (0.14 + 0.16 * Math.abs(Math.sin(lf * 0.08 + i))) * source }} />
              ))}
              <svg width={1012} height={360} style={{ position: "absolute", inset: 0, opacity: 0.14 }}>
                {Array.from({ length: 5 }, (_, r) => Array.from({ length: 9 }, (_, c) => { const cx = 70 + c * 110 + (r % 2) * 55, cy = 30 + r * 66; return <polygon key={"hx" + r + "_" + c} points={`${cx},${cy - 26} ${cx + 22},${cy - 13} ${cx + 22},${cy + 13} ${cx},${cy + 26} ${cx - 22},${cy + 13} ${cx - 22},${cy - 13}`} fill="none" stroke="#7FE8FF" strokeWidth={1} />; }))}
              </svg>
            </div>
          </div>

          {/* ---- ADDED: CEILING GOD-RAY SHAFTS pouring DOWN from the apex keystone ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 6, transform: `translateX(${midParX * 0.5}px)`, mixBlendMode: "screen" }}>{ceilingRays}</div>

          {/* ---- VOLUMETRIC GOD-RAYS pouring off the vault (indigo->cyan) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 6 }}>
            {Array.from({ length: 9 }, (_, i) => {
              const a = -1.5 + i * 0.26 + az * 0.5 + Math.sin(lf * 0.05 + i) * 0.05;
              const len = 300 + i * 26;
              const op = (0.05 + 0.06 * Math.abs(Math.sin(lf * 0.08 + i))) * (0.5 + escalate * 0.5) * source + crackFlash * 0.07;
              return <div key={"ray" + i} style={{ position: "absolute", left: Vx, top: Vy, width: len, height: 26 + i * 4, transformOrigin: "0 50%", transform: `rotate(${a * 57.3}deg)`, background: "linear-gradient(90deg, rgba(96,140,235,0.5) 0%, rgba(127,232,255,0.42) 40%, rgba(127,232,255,0) 80%)", filter: "blur(7px)", opacity: op }} />;
            })}
            <div style={{ position: "absolute", left: Rx - 40, top: Ry - 250, width: 60, height: 360, transformOrigin: "50% 100%", transform: "rotate(20deg)", background: "linear-gradient(180deg, rgba(231,178,76,0.28), rgba(231,178,76,0) 82%)", filter: "blur(12px)", mixBlendMode: "screen", opacity: 0.35 + escalate * 0.35 }} />
          </div>

          {/* ---- ADDED: SUSPENDED DATA-MOTE FIELD floating through the chamber air ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 6, transform: `translateX(${midParX * 0.6}px)` }}>{motes}</div>

          {/* ---- HOUSING RING + HEX FLOOR (turns on rotateY around the vault = orbit) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 7, perspective: "1400px" }}>
            <div style={{ position: "absolute", inset: 0, transform: `rotateY(${azDeg * 0.8}deg)`, transformOrigin: `${Vx}px ${Vy}px` }}>
              <svg width={1012} height={792} viewBox="0 0 1012 792" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                <defs>
                  <linearGradient id="s3ring" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F1CE7A" /><stop offset="55%" stopColor="#C08A2E" /><stop offset="100%" stopColor="#7A5417" />
                  </linearGradient>
                </defs>
                <ellipse cx={Vx} cy={Vy + 228} rx={190} ry={46} fill="rgba(127,232,255,0.10)" style={{ filter: "blur(10px)" }} />
                <polygon points={`${Vx - 150},${Vy + 228} ${Vx - 78},${Vy + 188} ${Vx + 78},${Vy + 188} ${Vx + 150},${Vy + 228} ${Vx + 78},${Vy + 268} ${Vx - 78},${Vy + 268}`} fill="none" stroke="rgba(127,232,255,0.4)" strokeWidth={2.5} />
                <polygon points={`${Vx - 96},${Vy + 228} ${Vx - 50},${Vy + 204} ${Vx + 50},${Vy + 204} ${Vx + 96},${Vy + 228} ${Vx + 50},${Vy + 252} ${Vx - 50},${Vy + 252}`} fill="none" stroke="rgba(127,232,255,0.28)" strokeWidth={2} />
                <circle cx={Vx} cy={Vy} r={206} fill="none" stroke="url(#s3ring)" strokeWidth={9} opacity={0.9} />
                <circle cx={Vx} cy={Vy} r={206} fill="none" stroke="#2A1E10" strokeWidth={9} strokeDasharray="4 40" opacity={0.5} />
                <circle cx={Vx} cy={Vy} r={178} fill="none" stroke="#7FE8FF" strokeWidth={3} opacity={0.22 + 0.3 * Math.abs(Math.sin(lf * 0.1)) + escalate * 0.15 + crackFlash * 0.3} />
                <circle cx={Vx} cy={Vy} r={192} fill="none" stroke="#7FE8FF" strokeWidth={2} strokeDasharray="18 26" strokeDashoffset={-lf * 2.2} opacity={0.4} />
                {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <circle key={"b" + i} cx={Vx + Math.cos(a) * 206} cy={Vy + Math.sin(a) * 206} r={7} fill="#3A2A14" stroke="#E7B24C" strokeWidth={2} opacity={0.9} />; })}
              </svg>
            </div>
          </div>

          {/* ---- BACK glyphs (behind the vault, so the torrent orbits AROUND it) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 8 }}>{backGlyphs}</div>

        {/* ================= THE OBSIDIAN GEODE: black volcanic glass, molten violet core, cracks open and pours ================= */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, perspective: "1100px" }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: `${Vx}px ${Vy}px`, transform: `translate(${vib}px, ${vib * 0.4 + Math.sin(lf / 16) * 5}px) rotateY(${azDeg}deg) rotate(${Math.sin(lf * 0.24 + 0.5) * 2.4}deg)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <radialGradient id="s3vlt_core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF2FF" stopOpacity="0.95" />
                  <stop offset="26%" stopColor="#D6A8FF" stopOpacity="0.85" />
                  <stop offset="56%" stopColor="#8B45E8" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#3A1C7A" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="s3vlt_halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A56BFF" stopOpacity="0.55" />
                  <stop offset="48%" stopColor="#5A3ACC" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#2A1E66" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="s3vlt_caust" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C79BFF" stopOpacity="0.7" />
                  <stop offset="44%" stopColor="#7A4CE0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2C1A5E" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="s3vlt_limb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F4EBFF" /><stop offset="42%" stopColor="#C9E9FF" /><stop offset="100%" stopColor="#6A54C8" />
                </linearGradient>
                <linearGradient id="s3vlt_gloss" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="58%" stopColor="#DCEBFF" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="s3vlt_card" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F6FCFF" /><stop offset="30%" stopColor="#E4F5FF" /><stop offset="100%" stopColor="#AFD8F2" />
                </linearGradient>
                <linearGradient id="s3vlt_shard" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2B1A4E" /><stop offset="52%" stopColor="#120C24" /><stop offset="100%" stopColor="#05040C" />
                </linearGradient>
                <clipPath id="s3vlt_clip">
                  {oClipPts.map((d, i) => <polygon key={"vcp" + i} points={d} />)}
                </clipPath>
              </defs>

              {/* --- floor caustics: shaped light thrown down onto the plinth, splayed and turning with the yaw --- */}
              <g>
                <ellipse cx={Vx} cy={Vy + 196} rx={150} ry={36} fill="url(#s3vlt_caust)" opacity={(0.3 + oHeat * 0.6) * source} style={{ filter: "blur(13px)" }} />
                <g transform={`translate(${Vx} ${Vy + 196}) scale(1 0.34)`}>
                  {oCaust.map((c) => (
                    <rect key={"cst" + c.i} x={0} y={-c.w / 2} width={c.len} height={c.w} fill="url(#s3vlt_caust)" opacity={c.op}
                      transform={`rotate(${c.a})`} style={{ filter: "blur(7px)" }} />
                  ))}
                </g>
                <ellipse cx={Vx} cy={Vy + 150} rx={96} ry={20} fill="#03040A" opacity={0.62} style={{ filter: "blur(9px)" }} />
              </g>

              {/* --- volumetric bloom the stone sits inside --- */}
              <ellipse cx={Vx} cy={Vy - 14} rx={196} ry={216} fill="url(#s3vlt_halo)" opacity={Math.min(0.6, 0.16 + oHeat * 0.44) * oBreath} style={{ filter: "blur(26px)" }} />

              {/* --- DENSE BLACK-GLASS BODY: full opacity for the WHOLE scene, so the spent shell is a stone, not a ghost --- */}
              <g clipPath="url(#s3vlt_clip)">
                <rect x={Vx - 190} y={Vy - 220} width={380} height={400} fill="#06050F" opacity={0.97} />
              </g>

              {/* --- BACK facets: internal structure glimpsed through the body --- */}
              <g>{oBack.map((f) => <polygon key={"bf" + f.k} points={f.d} fill={f.f} opacity={f.o} stroke="#8E6BE8" strokeOpacity={0.14} strokeWidth={0.7} />)}</g>

              {/* --- MOLTEN VIOLET CORE burning inside the glass (clipped: it lives INSIDE the stone) --- */}
              <g clipPath="url(#s3vlt_clip)">
                <ellipse cx={Vx} cy={Vy - 14} rx={62 * oBreath} ry={78 * oBreath} fill="url(#s3vlt_core)" opacity={Math.min(1, 0.25 + oHeat * 0.95)} style={{ filter: "blur(11px)" }} />
                <polygon points={`${Vx},${Vy - 62} ${Vx + 25},${Vy - 20} ${Vx + 16},${Vy + 38} ${Vx - 16},${Vy + 38} ${Vx - 25},${Vy - 20}`}
                  fill="#F3E4FF" opacity={Math.min(0.92, 0.2 + oHeat * 0.9)} style={{ filter: `blur(${4 + oOpen * 7}px)` }} />
                {/* receding shelves inside the opened archive: this is a vault with DEPTH, not a hollow */}
                {[-52, -14, 26, 66].map((dy, i) => {
                  const hw = 30 + i * 17;
                  return (
                    <g key={"vsh" + i} opacity={oOpen * (0.3 + escalate * 0.5)}>
                      <rect x={Vx - hw} y={Vy + dy} width={hw * 2} height={1.6 + i * 0.4} fill="#F0DCFF" opacity={0.5} />
                      <rect x={Vx - hw} y={Vy + dy + 2} width={hw * 2} height={6 + i * 2} fill="#0C0420" opacity={0.55} />
                    </g>
                  );
                })}
              </g>

              {/* --- CONTAINED NOTES rising inside the vault (clipped to the stone: unambiguously INSIDE it) --- */}
              <g clipPath="url(#s3vlt_clip)">{oCards.map((n) => (
                <g key={"in" + n.k} transform={`rotate(${n.rot.toFixed(1)} ${n.x.toFixed(1)} ${n.y.toFixed(1)})`} opacity={n.op}>
                  <rect x={n.x - n.w / 2 - 2} y={n.y - n.h / 2 - 2} width={n.w + 4} height={n.h + 4} rx={3} fill="#9AD8FF" opacity={0.4} style={{ filter: "blur(4px)" }} />
                  <rect x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h} rx={1.8} fill="url(#s3vlt_card)" stroke="#CFEBFF" strokeWidth={0.7} strokeOpacity={0.8} />
                  <rect x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h * 0.26} rx={1.8} fill="#FFFFFF" opacity={0.75} />
                  <rect x={n.x - n.w / 2 + 2} y={n.y - n.h * 0.06} width={n.w - 4.5} height={1.2} fill="#1E3557" opacity={0.74} />
                  <rect x={n.x - n.w / 2 + 2} y={n.y + n.h * 0.16} width={n.w - 7.5} height={1.2} fill="#1E3557" opacity={0.6} />
                </g>
              ))}</g>

              {/* --- the SEALED glass skin over the core: intact while it charges, gone once it blows (rides husk) --- */}
              <g clipPath="url(#s3vlt_clip)" opacity={oSeal}>
                <ellipse cx={Vx} cy={Vy - 14} rx={74} ry={92} fill="#0A0718" opacity={0.55} />
                <ellipse cx={Vx - 20} cy={Vy - 48} rx={26} ry={40} fill="#CBB6FF" opacity={0.12} transform={`rotate(-24 ${Vx - 20} ${Vy - 48})`} style={{ filter: "blur(6px)" }} />
              </g>

              {/* --- FRONT facets --- */}
              <g>{oFront.map((f) => <polygon key={"ff" + f.k} points={f.d} fill={f.f} opacity={f.o} stroke="#B9A2F5" strokeOpacity={0.17} strokeWidth={0.7} />)}</g>

              {/* --- core light ESCAPING through the front faces: the glow reading THROUGH glass --- */}
              <g clipPath="url(#s3vlt_clip)" style={{ mixBlendMode: "screen" }}>
                <ellipse cx={Vx} cy={Vy - 14} rx={54 * oBreath} ry={70 * oBreath} fill="url(#s3vlt_core)" opacity={Math.min(0.8, 0.14 + oHeat * 0.66)} style={{ filter: "blur(14px)" }} />
              </g>

              {/* --- MOLTEN GAPS: once it is open, violet fire burns in every fracture between the facets (this is the LATE-SCENE read) --- */}
              {oOpen > 0.01 && (
                <g fill="none" strokeLinejoin="round">
                  {oFront.map((f) => <polygon key={"mg" + f.k} points={f.d} stroke="#B07BFF" strokeWidth={2.6} opacity={oOpen * 0.3 * (0.4 + oHeat)} style={{ filter: "blur(3px)" }} />)}
                  {oFront.map((f) => <polygon key={"mh" + f.k} points={f.d} stroke="#F0DEFF" strokeWidth={0.9} opacity={oOpen * 0.34 * (0.4 + oHeat)} />)}
                </g>
              )}

              {/* --- FRACTURE SEAMS igniting in stages before the break (retire as the geometry opens) --- */}
              <g strokeLinecap="round" fill="none" opacity={1 - oOpen}>
                {oSeams.map((s) => {
                  const lit = Math.min(1, Math.max(0, fissure * 2.4 - s.ph * 0.8));
                  if (lit <= 0.01) return null;
                  return (
                    <g key={"sm" + s.k}>
                      <path d={s.d} stroke="#B07BFF" strokeWidth={(4 + crk3 * 5) * lit} opacity={lit * 0.4} style={{ filter: "blur(4px)" }} />
                      <path d={s.d} stroke="#FBF3FF" strokeWidth={1.2 + (crk1 + crk2 + crk3) * 2.2} strokeDasharray="360" strokeDashoffset={360 - lit * 360} opacity={0.55 + lit * 0.45} />
                    </g>
                  );
                })}
              </g>

              {/* --- HARD RIM LIGHT on the silhouette + chromatic edge fringing (full strength for the whole scene) --- */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {oLimbs.map((l) => <path key={"lg" + l.k} d={l.d} stroke="#8FD4FF" strokeWidth={l.w * 3.4} opacity={0.26 + crackFlash * 0.3} style={{ filter: "blur(6px)" }} />)}
                {oLimbs.map((l) => <path key={"lm" + l.k} d={l.d} stroke="#FF77E0" strokeWidth={l.w} opacity={0.3} transform="translate(-1.4 0.6)" />)}
                {oLimbs.map((l) => <path key={"lc" + l.k} d={l.d} stroke="#66E4FF" strokeWidth={l.w} opacity={0.3} transform="translate(1.4 -0.6)" />)}
                {oLimbs.map((l) => <path key={"lw" + l.k} d={l.d} stroke="url(#s3vlt_limb)" strokeWidth={l.w} opacity={0.92} />)}
              </g>

              {/* --- SPECULAR GLOSS sweeping across the facet faces --- */}
              <g clipPath="url(#s3vlt_clip)" opacity={(0.55 + charge * 0.35) * (1 - oOpen * 0.3)}>
                <rect x={Vx - 250 + Math.sin(lf * 0.05) * 26} y={Vy - 280} width={78} height={560} fill="url(#s3vlt_gloss)"
                  transform={`rotate(-26 ${Vx} ${Vy})`} style={{ filter: "blur(3px)" }} />
                <rect x={Vx + 24 + Math.sin(lf * 0.05 + 1.2) * 20} y={Vy - 280} width={34} height={560} fill="url(#s3vlt_gloss)"
                  transform={`rotate(-26 ${Vx} ${Vy})`} opacity={0.6} style={{ filter: "blur(2px)" }} />
              </g>

              {/* --- CRACK-STAGE FLASHES: light bursting out of the seams, not a full-frame wash --- */}
              {crackFlash > 0.01 && (
                <circle cx={Vx} cy={Vy - 14} r={60 + crackFlash * 42} fill="url(#s3vlt_core)" opacity={Math.min(0.44, crackFlash * 0.46)} style={{ filter: "blur(10px)" }} />
              )}

              {/* --- DETONATION: the geode bursts and hurls glass (transient, frames DET..DET+27) --- */}
              {shatter > 0 && shatter < 1 && Array.from({ length: 16 }, (_, i) => {
                const a = seed(i * 5.5) * Math.PI * 2, d = shatter * (70 + seed(i) * 120);
                const rot = shatter * (seed(i + 2) - 0.5) * 470, ssz = 12 + seed(i * 1.3) * 18;
                const cx = Vx + Math.cos(a) * d, cy = Vy + Math.sin(a) * d - 10;
                return (
                  <polygon key={"osh" + i} points={`${cx},${cy - ssz} ${cx + ssz * 0.72},${cy + ssz * 0.24} ${cx + ssz * 0.2},${cy + ssz} ${cx - ssz * 0.66},${cy + ssz * 0.4}`}
                    fill="url(#s3vlt_shard)" stroke="#C6A6FF" strokeWidth={1.1} strokeOpacity={0.7} opacity={1 - shatter}
                    transform={`rotate(${rot} ${cx} ${cy})`} />
                );
              })}
              {flash > 0 && flash < 1 && (
                <circle cx={Vx} cy={Vy - 10} r={132 + flash * 190} fill="url(#s3vlt_core)" opacity={(1 - flash) * 0.8} style={{ filter: "blur(6px)" }} />
              )}
              {wave > 0 && wave < 1 && (
                <circle cx={Vx} cy={Vy - 10} r={40 + wave * 190} fill="none" stroke="#D9B6FF" strokeWidth={Math.max(1.5, 7 * (1 - wave))} opacity={(1 - wave) * 0.85} />
              )}

              {/* --- ENGRAVED NAMEPLATE: cut per character into the plinth arc BELOW the stone --- */}
              <g>
                {oPlate.map((p) => (
                  <g key={"pl" + p.i} transform={`rotate(${p.deg.toFixed(2)} ${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
                    <text x={p.x} y={p.y + 1.2} textAnchor="middle" dominantBaseline="middle" fontFamily={inter.fontFamily} fontWeight={800} fontSize={13} fill="#05030C" opacity={0.9}>{p.ch}</text>
                    <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontFamily={inter.fontFamily} fontWeight={800} fontSize={13} fill="#E6D8FF"
                      opacity={0.72 + oHeat * 0.28} style={{ filter: "drop-shadow(0 0 7px rgba(150,110,255,0.8))" }}>{p.ch}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

          {/* ---- FRONT glyphs (in front of the vault) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 12 }}>{frontGlyphs}</div>

          {/* ---- GAG NOTE riding the current into the helmet ---- */}
          {gO > 0.01 && (
            <div style={{ position: "absolute", left: gx - 162, top: gy - 40, width: 324, zIndex: 13, transform: `perspective(760px) rotateX(4deg) rotate(${Math.sin(lf * 0.11) * 4}deg) scale(${gScale})`, opacity: gO }}>
              {/* premium note-app card: gradient surface, soft shadow, hairline border, gloss, header row + divider + clean body */}
              <div style={{ position: "relative", borderRadius: 16, background: "linear-gradient(158deg, rgba(23,36,53,0.985) 0%, rgba(13,21,33,0.985) 62%, rgba(10,16,26,0.985) 100%)", border: "1px solid rgba(127,232,255,0.26)", boxShadow: "0 26px 50px -16px rgba(0,0,0,0.80), 0 3px 12px rgba(0,0,0,0.5), 0 0 26px rgba(127,232,255,0.16), inset 0 1px 0 rgba(205,245,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.4)", overflow: "hidden" }}>
                {/* faint paper grain + top gloss sheen */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "radial-gradient(120% 80% at 18% -10%, rgba(127,232,255,0.10), transparent 52%), linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 30%)", pointerEvents: "none" }} />
                {/* header row: status dot + mono time + filename */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 17px 8px" }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 32% 30%, #DFF7FF, #4FB6D6)", boxShadow: "0 0 8px rgba(127,232,255,0.7)" }} />
                  <span style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: 1.4, color: "rgba(158,202,232,0.9)" }}>2:07 AM</span>
                  <span style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: 0.6, color: "rgba(120,158,188,0.62)", marginLeft: "auto" }}>untitled.md</span>
                </div>
                {/* hairline divider */}
                <div style={{ height: 1, margin: "0 16px", background: "linear-gradient(90deg, rgba(127,232,255,0) 0%, rgba(127,232,255,0.32) 20%, rgba(127,232,255,0.32) 80%, rgba(127,232,255,0) 100%)" }} />
                {/* body: title + tidy ruled lines */}
                <div style={{ padding: "12px 17px 16px" }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, lineHeight: 1.16, color: "#EAFBFF", letterSpacing: 0.2 }}>app idea: uber but for</div>
                  <div style={{ marginTop: 11, height: 5, width: "86%", borderRadius: 3, background: "rgba(158,202,232,0.22)" }} />
                  <div style={{ marginTop: 7, height: 5, width: "60%", borderRadius: 3, background: "rgba(158,202,232,0.14)" }} />
                </div>
              </div>
            </div>
          )}

          {/* ---- IRON CLAUDE: REACHES toward the vault, then BRACES and drinks the torrent in ---- */}
          <div style={{ position: "absolute", left: Rx - 60, top: Ry - 60, width: 120, height: 120, borderRadius: "50%", zIndex: 28, background: "radial-gradient(circle, rgba(127,232,255,0.75), transparent 66%)", filter: "blur(6px)", opacity: over(lf, DET, fr(1.2)) * (0.3 + escalate * 0.55) * (0.78 + 0.22 * Math.sin(lf * 0.5)) + surge * 0.4 }} />
          <IronClaude lf={lf} size={heroSize} left={heroLeft} top={heroTop + strainY} pose={heroPose} core={core} flip={-1} z={30} />
          <div style={{ position: "absolute", left: Rx - 130, top: Ry - 120, width: 260, height: 260, borderRadius: "50%", zIndex: 27, background: "radial-gradient(circle, rgba(231,178,76,0.16), transparent 68%)", filter: "blur(10px)", mixBlendMode: "screen", opacity: 0.4 + escalate * 0.4 }} />

          {/* ---- NEAR foreground haze (DoF near, drifts with the orbit) ---- */}
          <div style={{ position: "absolute", left: 40 + nearParX * 2, top: 470, width: 360, height: 300, zIndex: 33, borderRadius: "50%", background: "radial-gradient(circle, rgba(12,30,44,0.5), transparent 70%)", filter: "blur(13px)" }} />
          <div style={{ position: "absolute", left: 640 - az * 48, top: 500, width: 320, height: 260, zIndex: 33, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,18,10,0.4), transparent 70%)", filter: "blur(14px)" }} />

          {/* ---- ADDED: FOREGROUND SILHOUETTE MACHINERY framing the lens (heavy DoF, rides the orbit) ---- */}
          <div style={{ position: "absolute", left: -60 + nearParX * 2.2, top: 300, width: 150, height: 492, zIndex: 32, background: "linear-gradient(90deg, rgba(4,10,18,0.92) 0%, rgba(6,16,26,0.5) 70%, transparent 100%)", filter: "blur(10px)" }}>
            <div style={{ position: "absolute", right: 18, top: 90, width: 8, height: 320, background: "linear-gradient(180deg, rgba(127,232,255,0) 0%, rgba(96,168,220,0.3) 50%, rgba(127,232,255,0) 100%)", filter: "blur(2px)", opacity: 0.5 + escalate * 0.2 }} />
          </div>
          <div style={{ position: "absolute", left: 940 - nearParX * 2.2, top: 260, width: 150, height: 532, zIndex: 32, background: "linear-gradient(270deg, rgba(4,10,18,0.9) 0%, rgba(8,16,26,0.45) 70%, transparent 100%)", filter: "blur(11px)" }}>
            <div style={{ position: "absolute", left: 22, top: 120, width: 7, height: 300, background: "linear-gradient(180deg, rgba(127,232,255,0) 0%, rgba(127,232,255,0.28) 50%, rgba(127,232,255,0) 100%)", filter: "blur(2px)", opacity: 0.44 + escalate * 0.2 }} />
          </div>

          {/* ---- FG note-glyph MOTES streaking past the lens (big, heavily out of focus, ride the orbit) ---- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 34 }}>
            {Array.from({ length: 11 }, (_, i) => {
              const sa = seed(i * 2.7 + 21), sb = seed(i * 1.9 + 6), sc = seed(i * 3.3 + 14);
              const speed = 1.3 + sb * 1.9;
              const fx = ((lf * speed + sa * 1180) % 1260) - 120 + nearParX * 1.4;
              const fy = 320 + sa * 400 + Math.sin(lf * 0.05 + i) * 26;
              const fw = 26 + sc * 40, fh = fw * 0.72;
              const tilt = (sa - 0.5) * 26;
              return (
                <div key={"nm" + i} style={{ position: "absolute", left: fx, top: fy, width: fw, height: fh, zIndex: 34, transform: `rotate(${tilt}deg)`, borderRadius: 4, background: "linear-gradient(180deg, rgba(190,238,255,0.5) 0 26%, rgba(120,185,225,0.32) 26% 100%)", border: "1px solid rgba(200,244,255,0.4)", filter: `blur(${7 + sc * 5}px)`, opacity: 0.22 + sb * 0.22 }}>
                  <div style={{ position: "absolute", left: 4, right: 4, top: fh * 0.5, height: 2, background: "rgba(30,60,80,0.5)" }} />
                  <div style={{ position: "absolute", left: 4, right: 8, top: fh * 0.72, height: 2, background: "rgba(30,60,80,0.4)" }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* =============================== COLOR GRADE (camera-fixed complementary split) =============================== */}
        <div style={{ position: "absolute", inset: 0, zIndex: 38, mixBlendMode: "screen", background: "radial-gradient(58% 58% at 30% 38%, rgba(56,110,210,0.17), transparent 72%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 38, mixBlendMode: "screen", background: "radial-gradient(52% 52% at 74% 66%, rgba(220,132,74,0.15), transparent 72%)" }} />
        {crackFlash > 0.01 && <div style={{ position: "absolute", inset: 0, zIndex: 38, mixBlendMode: "screen", background: "radial-gradient(46% 46% at 42% 50%, rgba(200,244,255,0.5), transparent 66%)", opacity: Math.min(0.6, crackFlash) }} />}
        <div style={{ position: "absolute", inset: 0, zIndex: 38, boxShadow: "inset 0 0 260px rgba(0,0,0,0.6)" }} />

        {/* =============================== FILM GRAIN =============================== */}
        <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 39, mixBlendMode: "overlay", opacity: 0.5 }}>
          <filter id="s3grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(lf) % 100} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#s3grain)" />
        </svg>

        {/* =============================== UI (camera-fixed) =============================== */}
        <div style={{ position: "absolute", left: 40, top: 636, zIndex: 40, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, color: "rgba(160,205,235,0.7)" }}>CORE</span>
          {[0, 1, 2].map((k) => { const on = k === 0 ? Math.min(1, core / 0.3) : 0; return <div key={k} style={{ width: 34, height: 12, borderRadius: 3, background: on > 0.05 ? `rgba(127,232,255,${0.35 + on * 0.6})` : "rgba(90,120,150,0.25)", border: "1px solid rgba(127,232,255,0.5)", boxShadow: on > 0.5 ? "0 0 10px rgba(127,232,255,0.7)" : "none" }} />; })}
          <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(160,205,235,0.7)" }}>1 / 3</span>
        </div>

        <div style={{ position: "absolute", left: 40, top: 686, zIndex: 40, fontFamily: mono }}>
          <div style={{ fontSize: 17, letterSpacing: 2, color: "rgba(160,205,235,0.78)" }}>READING VAULT</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#BFF2FF", textShadow: "0 0 12px rgba(127,232,255,0.6)" }}>{fmt(notes)}</span>
            <span style={{ fontSize: 20, color: "rgba(160,205,235,0.85)" }}>notes</span>
            <span style={{ width: 11, height: 22, background: "#7FE8FF", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.4)), marginLeft: 2 }} />
          </div>
        </div>

        <CornerGauntlets lf={lf} wake={0.2} />
      </>);
    })()}
  
      <ToolCard lf={lf} at={4} name="Obsidian" />
    </Panel>
);

const S4: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="fireflies · transcribe">
    {(() => {
      // ================= master timeline (lf 0..146 · 4.86s) =================
      // RE-SHOT AS A MACRO PUSH: the lens dives THROUGH the firefly swarm and settles
      // CLOSE on the hero, head tilting up, motes streaming past the glass. Five parallax
      // planes (FG bokeh blurred+big · HERO sharp · swirling MID vortex · FAR forest-tech
      // void · ATMOS firefly-glow + ground fog). god-rays, bloom, DOF, grain, warm/teal grade.
      // PRESERVED: room collapses to black · swarm is the sole light charging reactor 2/3 ·
      // the "2024" ribbon gag · the ghostly-face assemble-and-pour beat.
      const RX = 506, RY = 500;                                    // arc-reactor anchor (hero chest, centred)
      const TAU = Math.PI * 2;
      const frac = (z: number) => ((z % 1) + 1) % 1;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const coreProg = over(lf, 6, 134);                           // fireflies filling: 0 -> 1
      const coreFill = 0.4 + coreProg * 0.26;                      // reactor 0.40 -> 0.66 (two thirds) PRESERVED
      const gather   = over(lf, 6, 128);                           // swarm density + inflow ESCALATE across scene
      const appear   = 0.3 + 0.7 * over(lf, 0, 8);                 // swarm already alive at frame 0
      const dark     = over(lf, 0, 12) * 0.82;                     // chamber collapses to near-black
      const teal     = 0.5 * (1 - gather * 0.4);                   // villain cold wash recedes as warmth grows
      const intake   = 0.3 + gather * 0.6;                         // chest intake bloom

      // ---- CAMERA: MACRO PUSH through the swarm, then SETTLE close on the hero ----
      const dive  = over(lf, 0, 92, Easing.out(Easing.cubic));     // fast plunge in
      const settle= over(lf, 92, 54, Easing.inOut(Easing.cubic));  // easing to rest on the hero
      const push  = dive * 0.78 + settle * 0.22;                   // combined 0 -> 1, front-loaded (macro dive)
      const camScale = 1.02 + push * 0.34 - settle * (1 - settle) * 0.05; // 1.02 -> ~1.36 with a breath as it lands
      const dutch = -3.4 * push + Math.sin(lf * 0.05) * 0.7;       // slow tilt into frame
      const jitter = (Math.sin(lf * 1.3) + Math.sin(lf * 0.71)) * 0.5 * gather;
      const swayX = Math.sin(lf * 0.028) * 7 * (0.4 + push * 0.7) + jitter;
      const swayY = Math.cos(lf * 0.034) * 5 - dive * 6;           // slight downward-track as we plunge

      // ---- HERO ACTION: braces, then STRAINS upward, head tilting BACK as the swarm floods in ----
      const brace  = Math.sin(over(lf, 0, 18, Easing.out(Easing.cubic)) * Math.PI); // 0 -> 1 -> 0 recoil
      const rise   = over(lf, 14, 128, Easing.inOut(Easing.cubic));
      const surge  = over(lf, 102, 44, Easing.out(Easing.cubic));  // final power surge
      const tremor = Math.sin(lf * 0.85) * (0.4 + gather * 0.8);   // absorption strain shake
      const heroLift  = brace * 7 - rise * 13 - surge * 9 + Math.sin(lf * 0.5) * 2 * gather;
      const heroTilt  = -4.6 * rise - 2.2 * surge + tremor * 0.3;  // head tilts up/back
      const heroSwayX = Math.sin(lf * 0.5) * 3 * gather;
      const heroScale = 1 + surge * 0.03 + Math.sin(lf * 0.6) * 0.006 * (0.4 + gather);

      // ---- one spiral, three depth passes (far tiny · focal sharp · near big+blur) ----
      const spiral = (i: number, t: number, rBase: number, spin: number, inflow: number): [number, number, number] => {
        const a0 = seed(i) * TAU;
        const dir = seed(i + 7) > 0.5 ? 1 : -1;
        const rOut = rBase + seed(i + 11) * rBase * 0.9;
        const sp = 0.5 + seed(i * 1.7) * 0.9;
        const phase = seed(i * 2.3);
        const u = frac(phase + t * 0.006 * sp * (0.55 + gather * 0.9) * inflow); // 0 far -> 1 reactor
        const ang = a0 + t * (0.018 + seed(i + 5) * 0.03) * dir * spin + u * 2.7 * dir;
        const rad = rOut * (1 - u) + 13 + Math.sin(t * 0.05 + i) * 10;
        return [RX + Math.cos(ang) * rad, RY + Math.sin(ang) * rad * 0.7, u];
      };

      // ---- THE FACE BEAT: the swarm gathers into a ghostly visage, holds, then dissolves inward ----
      const faceCX = RX, faceCY = 372;
      const facePts: [number, number][] = (() => {
        const p: [number, number][] = [];
        for (let k = 0; k < 30; k++) { const a = (k / 30) * TAU; p.push([Math.cos(a) * 100, Math.sin(a) * 128]); } // outline
        for (let e = 0; e < 2; e++) { const cx = e ? 40 : -40; for (let k = 0; k < 7; k++) { const a = (k / 7) * TAU; p.push([cx + Math.cos(a) * 15, -34 + Math.sin(a) * 11]); } } // eyes
        for (let k = 0; k < 5; k++) p.push([lerp(-14, 14, k / 4), lerp(-2, 40, 0) + k * 0]); // nose ridge
        for (let k = 0; k < 5; k++) p.push([0, lerp(-4, 40, k / 4)]);                        // nose bridge
        for (let k = 0; k < 14; k++) { const a = (k / 13) * Math.PI; p.push([Math.cos(a) * -46, 58 + Math.sin(a) * 26]); } // open mouth (agape)
        return p;
      })();
      const fForm = over(lf, 30, 18, Easing.out(Easing.cubic));    // scatter -> face
      const fDis  = over(lf, 66, 26, Easing.in(Easing.cubic));     // face -> pours into reactor
      const faceOn = over(lf, 30, 9) * (1 - over(lf, 82, 14));     // whole-beat opacity envelope
      const faceHold = fForm * (1 - fDis);                         // 1 only while the face is coherent

      return (
        <>
          {/* ================= CAMERA-PUSHED WORLD ================= */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${swayX}px, ${swayY}px) scale(${camScale}) rotate(${dutch}deg)`, transformOrigin: `${RX}px ${RY}px` }}>
            {/* deep night-clearing gradient (cool canopy top, warm ember floor) */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 58%, #26180A 0%, #0B0A0A 60%, #05070B 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18,40,52,0.55) 0%, rgba(8,10,14,0) 42%, rgba(40,22,6,0.4) 100%)" }} />

            {/* === ADDED · DEEP BACKDROP (z1): a suspended field of distant bioluminescent tech-nodes deep in the void (farthest plane, heavy DOF, barely parallaxing) === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1, filter: `blur(${6 + push * 3}px)`, transform: `translateX(${Math.sin(lf * 0.006) * 6}px) scale(${1 - push * 0.09})`, transformOrigin: `${RX}px ${RY}px`, opacity: 0.72 - dark * 0.4 }}>
              {Array.from({ length: 24 }, (_, i) => {
                const nx = seed(i * 3.7) * 1012;
                const ny = 70 + seed(i * 2.1) * 560;
                const sz = 2 + seed(i + 4) * 3.6;
                const pulse = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.03 + i * 1.3));
                const cyan = seed(i + 8) > 0.68;
                const col = cyan ? "150,220,235" : "255,196,120";
                return <div key={`dn${i}`} style={{ position: "absolute", left: nx, top: ny, width: sz, height: sz, borderRadius: "50%", background: `rgba(${col},0.9)`, boxShadow: `0 0 9px rgba(${col},0.7)`, filter: "blur(1.4px)", opacity: 0.3 * pulse }} />;
              })}
              {/* faint far constellation haze pockets keeping the deep void from going flat */}
              {[0, 1, 2].map((k) => (
                <div key={`dh${k}`} style={{ position: "absolute", left: 120 + k * 340 + Math.sin(lf * 0.008 + k) * 30, top: 150 + k * 90, width: 260, height: 200, borderRadius: "50%", background: `radial-gradient(circle, rgba(${k === 1 ? "140,210,225" : "255,190,120"},0.12) 0%, transparent 68%)`, filter: "blur(26px)", mixBlendMode: "screen" }} />
              ))}
            </div>

            {/* === FAR PLANE 1: night treeline silhouette (heavy DOF blur, slow drift) === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: `blur(${9 + push * 4}px)`, opacity: 0.9 - dark * 0.5, transform: `translateX(${Math.sin(lf * 0.01) * 10}px) scale(${1 - push * 0.06})`, transformOrigin: `${RX}px ${RY}px` }}>
              {Array.from({ length: 9 }, (_, i) => {
                const x = 40 + i * 118 + seed(i) * 40;
                const w = 34 + seed(i + 3) * 46;
                const h = 300 + seed(i + 6) * 300;
                return <div key={`tr${i}`} style={{ position: "absolute", left: x, bottom: -30, width: w, height: h, borderRadius: "44% 44% 0 0", background: "linear-gradient(180deg, #0A1418 0%, #050708 100%)" }} />;
              })}
              {/* hanging canopy fringe */}
              <div style={{ position: "absolute", left: 0, top: -20, width: 1012, height: 190, background: "radial-gradient(80% 100% at 50% 0%, #0B141A 0%, transparent 72%)" }} />
            </div>

            {/* === ADDED · FAR PLANE 1b: bioluminescent tech-veins tracing up the treeline + hanging light-vines (forest-meets-tech) === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: `blur(${5 + push * 3}px)`, opacity: (0.5 - dark * 0.32) * (0.4 + gather * 0.5), mixBlendMode: "screen" }}>
              {Array.from({ length: 8 }, (_, i) => {
                const x = 66 + i * 124 + seed(i + 2) * 30;
                const h = 190 + seed(i + 5) * 200;
                const flow = 0.5 + 0.5 * Math.sin(lf * 0.04 + i * 1.7);
                const cyan = seed(i + 3) > 0.5;
                const col = cyan ? "140,225,180" : "255,200,130";
                return <div key={`tv${i}`} style={{ position: "absolute", left: x, bottom: 0, width: 2, height: h, background: `linear-gradient(180deg, transparent 0%, rgba(${col},${0.28 * flow}) 55%, rgba(255,200,130,${0.42 * flow}) 100%)`, boxShadow: `0 0 6px rgba(${col},0.5)` }} />;
              })}
              {/* hanging glow-vines dripping from the canopy */}
              {Array.from({ length: 6 }, (_, i) => {
                const x = 120 + i * 156 + seed(i * 2.2) * 40;
                const h = 120 + seed(i + 7) * 130;
                const drip = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.03 + i * 2.1));
                return <div key={`hv${i}`} style={{ position: "absolute", left: x, top: -10, width: 1.6, height: h, background: `linear-gradient(180deg, rgba(150,225,195,${0.34 * drip}) 0%, transparent 92%)`, boxShadow: "0 0 5px rgba(150,225,195,0.4)" }} />;
              })}
            </div>

            {/* === FAR PLANE 2: distant firefly bokeh drifting between the trees === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 3, transform: `scale(${1 - push * 0.04})`, transformOrigin: `${RX}px ${RY}px` }}>
              {Array.from({ length: 16 }, (_, i) => {
                const bx = seed(i * 2.7) * 1012 + Math.sin(lf * 0.012 + i) * 22;
                const by = 120 + seed(i * 1.3) * 520 + Math.cos(lf * 0.009 + i) * 18;
                const sz = 3 + seed(i + 2) * 5;
                const tw = 0.3 + 0.7 * Math.abs(Math.sin(lf * 0.05 + i * 2.1));
                return <div key={`fb${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz, borderRadius: "50%", background: "rgba(255,206,140,0.9)", boxShadow: "0 0 10px rgba(255,190,110,0.7)", filter: "blur(2.4px)", opacity: 0.4 * tw * (1 - dark * 0.4) }} />;
              })}
            </div>

            {/* === ADDED · FAR MIDGROUND (z4): bioluminescent flora on the clearing floor - glowing caps + stems rising through the fog === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 4, filter: `blur(${3 + push * 3}px)`, opacity: 0.82 - dark * 0.4, transform: `translateX(${Math.sin(lf * 0.01) * 9}px) scale(${1 - push * 0.05})`, transformOrigin: `${RX}px ${RY}px` }}>
              {Array.from({ length: 12 }, (_, i) => {
                const fx = 24 + i * 88 + seed(i * 1.7) * 40;
                const fy = 578 + seed(i + 3) * 152;
                const glow = 0.45 + 0.55 * Math.abs(Math.sin(lf * 0.035 + i * 0.9));
                const cyan = seed(i + 6) > 0.58;
                const col = cyan ? "150,230,200" : "255,190,120";
                const cap = 8 + seed(i + 2) * 11;
                return (
                  <div key={`fl${i}`} style={{ position: "absolute", left: fx, top: fy }}>
                    <div style={{ position: "absolute", left: cap / 2 - 1, top: cap * 0.5, width: 2, height: 14 + seed(i + 4) * 13, background: "linear-gradient(180deg, rgba(46,64,54,0.9), rgba(10,16,14,0.35))" }} />
                    <div style={{ position: "absolute", left: 0, top: 0, width: cap, height: cap * 0.72, borderRadius: "50% 50% 42% 42%", background: `radial-gradient(circle at 50% 38%, rgba(${col},${0.85 * glow}) 0%, rgba(${col},0.22) 68%, transparent 100%)`, boxShadow: `0 0 ${8 + cap}px rgba(${col},${0.55 * glow})` }} />
                  </div>
                );
              })}
              {/* a few taller curled fronds catching the swarm-light */}
              {Array.from({ length: 5 }, (_, i) => {
                const fx = 90 + i * 190 + seed(i * 4.1) * 40;
                const h = 90 + seed(i + 1) * 70;
                const sway = Math.sin(lf * 0.02 + i * 1.4) * 5;
                return <div key={`frd${i}`} style={{ position: "absolute", left: fx + sway, bottom: 40 + seed(i + 5) * 40, width: 3, height: h, borderRadius: "0 0 0 60%", background: "linear-gradient(180deg, rgba(120,200,160,0.5) 0%, rgba(24,40,32,0.2) 100%)", boxShadow: "0 0 6px rgba(120,200,160,0.35)", transform: `rotate(${-8 + sway}deg)` }} />;
              })}
            </div>

            {/* === ADDED · ATMOS (z5): fine pollen drift - very small particulate rising slowly, thickening the volumetric haze === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 5, opacity: 0.62 - dark * 0.3 }}>
              {Array.from({ length: 36 }, (_, i) => {
                const px = seed(i * 2.3) * 1012 + Math.sin(lf * 0.015 + i) * 20;
                const py = ((seed(i * 1.7) * 812 - lf * (0.12 + seed(i) * 0.3)) % 812 + 812) % 812;
                const sz = 0.8 + seed(i + 2) * 1.4;
                const tw = 0.3 + 0.7 * Math.abs(Math.sin(lf * 0.06 + i * 1.9));
                const cyan = seed(i + 11) > 0.82;
                const col = cyan ? "180,230,220" : "255,224,170";
                return <div key={`po${i}`} style={{ position: "absolute", left: px, top: py, width: sz, height: sz, borderRadius: "50%", background: `rgba(${col},0.8)`, boxShadow: `0 0 4px rgba(${col},0.5)`, filter: "blur(0.5px)", opacity: 0.22 * tw }} />;
              })}
            </div>

            {/* volumetric god-rays fanning out of the reactor (two counter-rotating banks) */}
            <div style={{ position: "absolute", left: RX - 380, top: RY - 380, width: 760, height: 760, zIndex: 8, transform: `rotate(${lf * 0.55}deg)`, mixBlendMode: "screen", opacity: 0.14 + coreProg * 0.4, filter: "blur(7px)", background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,200,120,0) 0deg, rgba(255,204,124,0.55) 5deg, rgba(255,200,120,0) 11deg)", WebkitMaskImage: "radial-gradient(circle, #000 6%, transparent 64%)", maskImage: "radial-gradient(circle, #000 6%, transparent 64%)" }} />
            <div style={{ position: "absolute", left: RX - 380, top: RY - 380, width: 760, height: 760, zIndex: 8, transform: `rotate(${-lf * 0.32 + 17}deg)`, mixBlendMode: "screen", opacity: 0.1 + coreProg * 0.26, filter: "blur(10px)", background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(127,232,255,0) 0deg, rgba(127,232,255,0.4) 4deg, rgba(127,232,255,0) 13deg)", WebkitMaskImage: "radial-gradient(circle, #000 4%, transparent 58%)", maskImage: "radial-gradient(circle, #000 4%, transparent 58%)" }} />

            {/* the veil: the field goes near-black so the swarm is the sole light */}
            <div style={{ position: "absolute", inset: 0, zIndex: 9, background: "#040207", opacity: dark }} />

            {/* villain lingering cold-teal wash (top-right) - GENERIC-9000 is still winning */}
            <div style={{ position: "absolute", right: -140, top: 60, width: 640, height: 640, borderRadius: "50%", zIndex: 10, background: "radial-gradient(circle, rgba(90,213,198,0.18), transparent 62%)", filter: "blur(18px)", opacity: teal, mixBlendMode: "screen" }} />

            {/* two slow warm nebulae keep the void deep, not flat (heavy blur = far DOF) */}
            {[0, 1].map((k) => { const bx = 300 + k * 420 + Math.sin(lf * (0.012 + k * 0.004) + k) * 74; const by = 440 + Math.cos(lf * 0.01 + k * 2) * 56; return (
              <div key={`neb${k}`} style={{ position: "absolute", left: bx - 320, top: by - 320, width: 640, height: 640, borderRadius: "50%", zIndex: 11, background: `radial-gradient(circle, rgba(255,${168 + k * 28},90,${0.11 + gather * 0.05}) 0%, transparent 62%)`, filter: "blur(30px)", mixBlendMode: "screen" }} />); })}

            {/* === ATMOS PLANE: GROUND FOG (far bank): slow layered mist drifting across the clearing floor === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 12 }}>
              {[0, 1, 2].map((k) => { const off = Math.sin(lf * (0.01 + k * 0.004) + k * 2) * 60; return (
                <div key={`fog${k}`} style={{ position: "absolute", left: -120 + off, bottom: -70 + k * 26, width: 1260, height: 210 - k * 34, borderRadius: "50%", background: `radial-gradient(60% 100% at 50% 100%, rgba(${k === 1 ? "150,210,205" : "255,200,150"},${0.1 + gather * 0.05}) 0%, transparent 72%)`, filter: `blur(${24 + k * 8}px)`, mixBlendMode: "screen", opacity: 0.7 - k * 0.12 }} />); })}
            </div>

            {/* drifting spores + ambient embers rising through the beam (particulate haze, bokeh) */}
            <div style={{ position: "absolute", inset: 0, zIndex: 13 }}>
              {Array.from({ length: 26 }, (_, i) => {
                const bx = seed(i * 3.1) * 1012;
                const by = ((seed(i * 1.9) * 812 - lf * (0.4 + seed(i) * 0.7)) % 812 + 812) % 812 - 10;
                const sway = Math.sin(lf * 0.02 + i) * 14;
                const sz = 1.2 + seed(i + 3) * 2.2;
                const op = 0.26 + seed(i + 5) * 0.3;
                return <div key={`e${i}`} style={{ position: "absolute", left: bx + sway, top: by, width: sz, height: sz, borderRadius: "50%", background: `rgba(255,210,140,${op})`, boxShadow: "0 0 6px rgba(255,190,110,0.5)", filter: "blur(0.6px)" }} />;
              })}
              {Array.from({ length: 12 }, (_, i) => {
                const bx = seed(i * 5.3 + 1) * 1012;
                const by = ((seed(i * 2.7 + 2) * 812 - lf * (0.16 + seed(i + 4) * 0.24)) % 812 + 812) % 812;
                const sway = Math.sin(lf * 0.013 + i * 1.7) * 26;
                const sz = 6 + seed(i + 7) * 9;
                return <div key={`sp${i}`} style={{ position: "absolute", left: bx + sway, top: by, width: sz, height: sz, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,236,220,0.5) 0%, rgba(255,214,150,0.16) 45%, transparent 72%)", filter: "blur(2.4px)", opacity: (0.3 + seed(i + 9) * 0.3) * (1 - dark * 0.3) }} />;
              })}
            </div>

            {/* ===== FAR PLANE 3 (subject-back): THE VILLAIN looms in the deep void, pushed OUT of focus (DOF) ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 14, filter: `blur(${4 + push * 4}px) brightness(0.72)`, transform: `scale(${1 - push * 0.03})`, transformOrigin: `${RX}px ${RY}px` }}>
              <Generic9000 lf={lf} size={288} left={648} top={232} pose="mock" menace={0.9} flip={-1} z={14} />
            </div>

            {/* reactor bloom pooling on the chest, intensifying as motes feed it */}
            <div style={{ position: "absolute", left: RX - 300, top: RY - 300, width: 600, height: 600, borderRadius: "50%", zIndex: 15, background: `radial-gradient(circle, rgba(255,196,120,${0.1 + coreProg * 0.32}) 0%, rgba(127,232,255,${coreProg * 0.2}) 34%, transparent 64%)`, filter: "blur(16px)", opacity: 0.45 + coreProg * 0.55 }} />

            {/* === MID PLANE: FAR swarm body - tiny, softly blurred, the deep body of the vortex behind the hero === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 16 }}>
              {Array.from({ length: 64 }, (_, i) => {
                if (seed(i * 4.3) > 0.5 + gather * 0.4) return null;
                const [x, y, u] = spiral(i + 200, lf, 320, 1.2, 0.9);
                const sd = seed(i + 41);
                const sz = 1.3 + sd * 1.9;
                const cyan = seed(i + 43) > 0.85;
                const col = cyan ? "127,232,255" : `255,${(180 + sd * 50) | 0},${(96 + sd * 46) | 0}`;
                const env = ramp(u, 0, 0.08) * (1 - ramp(u, 0.82, 1));
                const op = (0.28 + sd * 0.24) * appear * env;
                if (op < 0.04) return null;
                return <div key={`far${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", transform: "translate(-50%,-50%)", background: `rgba(${col},0.95)`, boxShadow: `0 0 5px rgba(${col},0.7)`, filter: "blur(1.3px)", opacity: op }} />;
              })}
            </div>

            {/* ===== HERO PLANE: IRON CLAUDE, pose CHARGE, STRAINING as the swarm envelops him, head tilting up ===== */}
            <div style={{ position: "absolute", inset: 0, zIndex: 30, transform: `translate(${heroSwayX}px, ${heroLift}px) rotate(${heroTilt}deg) scale(${heroScale})`, transformOrigin: `${RX}px 662px` }}>
              <IronClaude lf={lf} size={470} left={365} top={236} pose="charge" core={coreFill} flip={1} z={30} />
            </div>

            {/* chest intake funnel-bloom (over the hero, the swarm being drunk in) */}
            <div style={{ position: "absolute", left: RX - 70, top: RY - 62, width: 140, height: 128, borderRadius: "50%", zIndex: 32, background: "radial-gradient(circle, rgba(127,232,255,0.72) 0%, rgba(255,206,140,0.36) 44%, transparent 70%)", filter: "blur(8px)", opacity: intake * (0.6 + 0.4 * Math.sin(lf / 4)) }} />

            {/* absorption shock-rings blipping at the reactor as the swarm lands */}
            {Array.from({ length: 3 }, (_, k) => {
              const period = 24, p = ((((lf - k * 8) % period) + period) % period) / period;
              const o = (1 - p) * 0.5 * gather;
              if (o < 0.03) return null;
              const d = 30 + p * 160;
              return <div key={`ar${k}`} style={{ position: "absolute", left: RX, top: RY, width: d, height: d * 0.7, marginLeft: -d / 2, marginTop: -d * 0.7 / 2, borderRadius: "50%", border: "2px solid rgba(255,206,140,0.8)", opacity: o, zIndex: 33 }} />;
            })}

            {/* === MID PLANE: FOCAL swarm - warm transcript-motes trailing ribbons, pouring INTO the reactor === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 34 }}>
              {Array.from({ length: 120 }, (_, i) => {
                if (seed(i * 5.9) > 0.32 + gather * 0.64) return null;   // density ESCALATES over the scene
                const [x, y, u] = spiral(i, lf, 230, 1.5, 1);
                const [px, py] = spiral(i, lf - 2.6, 230, 1.5, 1);
                const dx = x - px, dy = y - py;
                const ang = Math.atan2(dy, dx) * 180 / Math.PI;
                const spd = Math.min(42, Math.hypot(dx, dy));
                const sd = seed(i + 13);
                const sz = 2.5 + sd * 4.5;
                const cyan = seed(i + 17) > 0.85;
                const col = cyan ? "127,232,255" : `255,${(185 + seed(i + 19) * 55) | 0},${(95 + seed(i + 23) * 55) | 0}`;
                const env = ramp(u, 0, 0.06) * (1 - ramp(u, 0.86, 1));  // born far, absorbed at the chest
                const tw = 0.72 + 0.28 * Math.sin(lf * 0.3 + i * 1.7);
                const op = (0.55 + sd * 0.4) * appear * tw * env;
                if (op < 0.05) return null;
                const len = 7 + sz + spd * 1.2;
                return (
                  <div key={i} style={{ position: "absolute", left: x, top: y, width: len, height: sz, borderRadius: sz, transform: `translate(-100%, -50%) rotate(${ang}deg)`, transformOrigin: "100% 50%", background: `linear-gradient(90deg, rgba(${col},0) 0%, rgba(${col},0.16) 55%, rgba(${col},0.95) 100%)`, boxShadow: `0 0 ${5 + sz + (cyan ? 4 : 0)}px rgba(${col},0.65)`, opacity: op }} />
                );
              })}
            </div>

            {/* ===== THE FACE BEAT: the swarm assembles into a GHOSTLY VISAGE, holds, then dissolves inward ===== */}
            {faceOn > 0.02 && (
              <div style={{ position: "absolute", inset: 0, zIndex: 35 }}>
                {/* soft eerie aura behind the visage, brightest while the face is coherent */}
                <div style={{ position: "absolute", left: faceCX - 170, top: faceCY - 190, width: 340, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,230,210,0.22) 0%, rgba(255,206,140,0.12) 44%, transparent 70%)", filter: "blur(20px)", opacity: faceHold * 0.9 }} />
                {facePts.map((pt, i) => {
                  const [tx, ty] = pt;
                  // scatter origin swirling in the vortex, then form the face, then rush to the reactor
                  const sa = seed(i * 1.9) * TAU, sr = 240 + seed(i * 3.3) * 260;
                  const sx = RX + Math.cos(sa) * sr + Math.sin(lf * 0.04 + i) * 12;
                  const sy = RY + Math.sin(sa) * sr * 0.7 + Math.cos(lf * 0.05 + i) * 10;
                  const fxTarget = faceCX + tx + Math.sin(lf * 0.12 + i) * 2.4;   // living jitter while held
                  const fyTarget = faceCY + ty + Math.cos(lf * 0.12 + i) * 2.4;
                  const bx = lerp(sx, fxTarget, fForm);
                  const by = lerp(sy, fyTarget, fForm);
                  const x = lerp(bx, RX, fDis);
                  const y = lerp(by, RY, fDis);
                  const cyan = seed(i + 61) > 0.72;
                  const col = cyan ? "170,236,224" : "255,214,150";
                  const sz = 3.4 + seed(i + 5) * 2.6;
                  const op = faceOn * (0.6 + 0.4 * Math.sin(lf * 0.4 + i * 2.3));
                  return <div key={`fc${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", transform: "translate(-50%,-50%)", background: `rgba(${col},0.98)`, boxShadow: `0 0 ${6 + sz}px rgba(${col},0.85)`, filter: `blur(${lerp(1.2, 0.2, faceHold)}px)`, opacity: op }} />;
                })}
              </div>
            )}

            {/* a scatter of legible transcript ribbons ride the same current */}
            <div style={{ position: "absolute", inset: 0, zIndex: 36 }}>
              {Array.from({ length: 14 }, (_, k) => {
                const m = k * 8 + 5;
                const [x, y, u] = spiral(m, lf, 230, 1.5, 1);
                if (u < 0.12 || u > 0.76) return null;
                const rot = (seed(m) - 0.5) * 30;
                const sc = 1 - u * 0.4;
                return (
                  <div key={`fr${k}`} style={{ position: "absolute", left: x - 19, top: y - 8, width: 38, height: 16, borderRadius: 4, transform: `rotate(${rot}deg) scale(${sc})`, background: "linear-gradient(180deg, rgba(255,214,150,0.26), rgba(255,180,110,0.13))", border: "1px solid rgba(255,206,140,0.62)", boxShadow: "0 0 10px rgba(255,190,110,0.35)", opacity: 0.72 * appear, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2.5, padding: "0 4px" }}>
                    <div style={{ height: 1.8, borderRadius: 1, background: "rgba(255,238,205,0.88)", width: "86%" }} />
                    <div style={{ height: 1.8, borderRadius: 1, background: "rgba(255,238,205,0.6)", width: "58%" }} />
                  </div>
                );
              })}
            </div>

            {/* villain AI-slop mockery (the joke: it has no memory, and that is the point) - kept crisp + readable */}
            <div style={{ position: "absolute", left: 578, top: 268, width: 286, zIndex: 40, opacity: 0.92 * over(lf, 12, 10) }}>
              <div style={{ position: "absolute", left: 44, top: -9, width: 20, height: 20, background: "rgba(30,34,38,0.96)", border: "1.5px solid rgba(90,213,198,0.5)", borderRight: "none", borderBottom: "none", transform: "rotate(45deg)" }} />
              <div style={{ position: "relative", padding: "10px 13px", borderRadius: 12, background: "linear-gradient(158deg, rgba(42,48,52,0.97), rgba(24,28,32,0.97))", border: "1.5px solid rgba(90,213,198,0.5)", boxShadow: "0 14px 32px -12px rgba(0,0,0,0.75)" }}>
                <div style={{ fontFamily: mono, fontSize: 16, lineHeight: 1.3, color: "rgba(204,218,216,0.95)" }}>As an AI language model,<br />I have no memory of you.</div>
              </div>
            </div>

            {/* === FG PLANE: NEAR swarm - big + heavily blurred motes STREAMING PAST THE LENS (shallow DOF) === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
              {Array.from({ length: 20 }, (_, k) => {
                const i = k * 3 + 2;
                const [x, y, u] = spiral(i + 400, lf, 360, 2.3, 1.35);
                const [px, py] = spiral(i + 400, lf - 3, 360, 2.3, 1.35);
                const dx = x - px, dy = y - py;
                const ang = Math.atan2(dy, dx) * 180 / Math.PI;
                const spd = Math.min(78, Math.hypot(dx, dy));
                const sd = seed(i + 29);
                const sz = (13 + sd * 18) * (1 + push * 0.5);           // grow as the lens dives in
                const blur = 5 + sd * 7 + push * 3;
                const cyan = seed(i + 31) > 0.8;
                const col = cyan ? "127,232,255" : `255,${(190 + sd * 50) | 0},${(110 + sd * 40) | 0}`;
                const env = ramp(u, 0, 0.05) * (1 - ramp(u, 0.68, 1));
                const op = (0.5 + sd * 0.34) * appear * env;
                if (op < 0.05) return null;
                const len = sz + spd * 1.5;
                return <div key={`nr${k}`} style={{ position: "absolute", left: x, top: y, width: len, height: sz, borderRadius: sz, transform: `translate(-100%, -50%) rotate(${ang}deg)`, transformOrigin: "100% 50%", background: `linear-gradient(90deg, rgba(${col},0) 0%, rgba(${col},0.2) 50%, rgba(${col},0.92) 100%)`, boxShadow: `0 0 ${sz}px rgba(${col},0.6)`, filter: `blur(${blur}px)`, opacity: op }} />;
              })}
            </div>

            {/* === FG PLANE (closest): out-of-focus canopy branches + close bokeh streaking past the lens === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 48, filter: `blur(${11 + push * 5}px)`, opacity: 0.82, transform: `scale(${1 + push * 0.14})`, transformOrigin: `${RX}px ${RY}px` }}>
              <div style={{ position: "absolute", left: -60, top: -50, width: 460, height: 260, borderRadius: "0 0 60% 0", background: "linear-gradient(150deg, #0A1216 0%, rgba(6,9,11,0) 78%)", transform: `rotate(${-6 + Math.sin(lf * 0.014) * 1.4}deg)` }} />
              <div style={{ position: "absolute", right: -70, bottom: -60, width: 500, height: 280, borderRadius: "60% 0 0 0", background: "linear-gradient(300deg, #0A1216 0%, rgba(6,9,11,0) 78%)", transform: `rotate(${5 + Math.cos(lf * 0.012) * 1.4}deg)` }} />
            </div>
            <div style={{ position: "absolute", inset: 0, zIndex: 49, transform: `scale(${1 + push * 0.2})`, transformOrigin: `${RX}px ${RY}px` }}>
              {Array.from({ length: 8 }, (_, i) => {
                const bx = ((seed(i * 6.1) * 1240 - lf * (1.3 + seed(i) * 1.1)) % 1240 + 1240) % 1240 - 120;
                const by = 90 + seed(i * 4.7) * 600;
                const sz = (26 + seed(i + 2) * 40) * (1 + push * 0.6);
                return <div key={`fgb${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,214,150,0.45) 0%, rgba(255,190,110,0.14) 44%, transparent 70%)", filter: `blur(${9 + push * 4}px)`, opacity: 0.5 * (1 - dark * 0.3) }} />;
              })}
            </div>

            {/* === ADDED · FG CLOSEST (z50): out-of-focus fern-frond silhouettes sweeping the corners in deep shadow (shallow DOF, big parallax) === */}
            <div style={{ position: "absolute", inset: 0, zIndex: 50, filter: `blur(${13 + push * 6}px)`, opacity: 0.72, transform: `scale(${1 + push * 0.24})`, transformOrigin: `${RX}px ${RY}px` }}>
              <div style={{ position: "absolute", left: -50, bottom: -70, width: 320, height: 360, background: "radial-gradient(58% 78% at 18% 100%, #060B0D 0%, rgba(5,8,10,0) 70%)", transform: `rotate(${18 + Math.sin(lf * 0.016) * 2}deg)` }} />
              <div style={{ position: "absolute", right: -60, top: -80, width: 360, height: 320, background: "radial-gradient(58% 78% at 82% 0%, #060B0D 0%, rgba(5,8,10,0) 70%)", transform: `rotate(${-14 + Math.cos(lf * 0.013) * 2}deg)` }} />
              {/* a couple of near light-catching frond ribs against the shadow */}
              {Array.from({ length: 3 }, (_, i) => {
                const fx = i === 0 ? 70 : i === 1 ? 900 : 150;
                const fy = i === 0 ? 700 : i === 1 ? 120 : 90;
                const rot = i === 1 ? -32 : 26;
                return <div key={`frib${i}`} style={{ position: "absolute", left: fx, top: fy, width: 4, height: 180, borderRadius: 4, background: "linear-gradient(180deg, rgba(150,220,180,0.28) 0%, transparent 88%)", transform: `rotate(${rot + Math.sin(lf * 0.02 + i) * 2}deg)`, boxShadow: "0 0 8px rgba(150,220,180,0.25)" }} />;
              })}
            </div>

            {/* ===== THE GAG: a promise from a meeting you never kept, still swimming in the swarm ===== */}
            {(() => {
              const gA = over(lf, 6, 14);
              const gInw = over(lf, 28, 100);
              const gAng = 2.1 + lf * 0.014 + gInw * 2.2;
              const gRad = 330 * (1 - gInw) + 22;
              const gx = RX + Math.cos(gAng) * gRad;
              const gy = RY + Math.sin(gAng) * gRad * 0.7;
              const gSc = 1 - gInw * 0.44;
              const gO = gA * (1 - over(lf, 120, 20));
              if (gO < 0.05) return null;
              return (
                <div style={{ position: "absolute", left: gx, top: gy, transform: `translate(-50%,-50%) scale(${gSc})`, zIndex: 46, opacity: gO, display: "flex", alignItems: "center", gap: 10, padding: "9px 15px", borderRadius: 12, background: "linear-gradient(158deg, rgba(40,26,10,0.96), rgba(20,12,6,0.96))", border: "1.5px solid rgba(231,178,76,0.6)", boxShadow: "0 12px 30px -10px rgba(0,0,0,0.72), 0 0 22px rgba(255,190,110,0.3)", whiteSpace: "nowrap" }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: HUD, boxShadow: `0 0 10px ${HUD}`, transform: `scale(${1 + Math.sin(lf / 6) * 0.22})` }} />
                  <span style={{ fontFamily: mono, fontSize: 25, color: "#F3E7CE", fontWeight: 600 }}>"yeah I'll send that tonight"</span>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: 1, color: "#0B1018", background: `linear-gradient(180deg, ${IRONG}, #C5883A)`, border: "1.5px solid #FFF0C8", borderRadius: 8, padding: "3px 9px" }}>2024</span>
                </div>
              );
            })()}
          </div>

          {/* ================= LENS + GRADE (do not travel with the camera) ================= */}
          {/* rich complementary grade: warm amber core vs cold teal periphery */}
          <div style={{ position: "absolute", inset: 0, zIndex: 52, mixBlendMode: "soft-light", background: "radial-gradient(72% 62% at 50% 54%, rgba(255,182,92,0.5), rgba(10,32,42,0.5) 100%)" }} />
          {/* cinematic vignette */}
          <div style={{ position: "absolute", inset: 0, zIndex: 53, background: "radial-gradient(circle at 50% 52%, transparent 42%, rgba(3,2,7,0.72) 100%)" }} />
          {/* animated film grain (deterministic per-frame seed) */}
          <svg width="1012" height="792" style={{ position: "absolute", inset: 0, zIndex: 54, mixBlendMode: "overlay", opacity: 0.13, pointerEvents: "none" }}>
            <filter id="grainS4">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(lf) % 97} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="1012" height="792" filter="url(#grainS4)" />
          </svg>

          {/* ================= HUD OVERLAY (fixed) ================= */}
          {/* memory-core gauge: OBSIDIAN locked, FIREFLIES filling now, GMAIL still dark */}
          <div style={{ position: "absolute", left: 40, top: 676, zIndex: 60, fontFamily: mono }}>
            <div style={{ fontSize: 16, letterSpacing: 2, fontWeight: 700, color: "rgba(255,214,150,0.9)", marginBottom: 8 }}>MEMORY CORE · 2 / 3</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {[0, 1, 2].map((s) => {
                const done = s === 0, active = s === 1;
                const fill = done ? 1 : active ? 0.12 + coreProg * 0.88 : 0;
                return (
                  <div key={s} style={{ position: "relative", width: 66, height: 15, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: `1.5px solid ${done || active ? "rgba(255,206,140,0.85)" : "rgba(150,150,150,0.4)"}`, overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: grad(IRONG, "#C5603C"), boxShadow: `0 0 12px ${IRONG}` }} />
                    {active && <div style={{ position: "absolute", top: 0, bottom: 0, width: 10, left: `${fill * 100}%`, marginLeft: -10, background: "rgba(255,247,220,0.85)", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf / 4)) }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {["OBSIDIAN", "FIREFLIES", "GMAIL"].map((nm, s) => (
                <div key={nm} style={{ width: 66, textAlign: "center", fontSize: 11, letterSpacing: 0.5, fontWeight: 700, color: s === 0 ? "rgba(255,206,140,0.72)" : s === 1 ? "rgba(255,228,172,0.98)" : "rgba(190,190,190,0.6)" }}>{nm}</div>
              ))}
            </div>
          </div>
        </>
      );
    })()}
  
      <ToolCard lf={lf} at={4} name="Fireflies" />
    </Panel>
);

const S5: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="gmail · sent">
    {(() => {
      // ================= S5 - POWER-UP 3: GMAIL - INBOX (grey noise) vs SENT (gold you) =================
      // MINI-STORY, three beats, RE-SHOT with a WHIP camera:
      //  (1) 0..SHOVE   a DRAB GREY STORM of INBOX envelopes floods in and buries the frame; villain
      //                 (upper-left) gloats; hero winds up.  -> pose "punch"
      //  (2) SHOVE      hero SHOVES the grey away (shockwave + camera SLAM). Label INBOX struck.
      //  (3) WHIP->SENT the camera WHIPS from the grey inbox side across/down to a golden SENT drawer,
      //                 then PUSHES IN as glowing GOLD envelopes (stamped with his cyan voice-waveform)
      //                 stream INTO his reactor -> FULL BLAZE.  charge -> victory
      const SHOVE = 40;                                 // the punch clears the grey
      const DRW = 62;                                   // the SENT drawer breaks open
      const HX = 398, HY = 150, HS = 352;              // hero box (center, facing LEFT into the storm)
      const REACTOR = { x: 504, y: 346 };              // hero arc-reactor, panel-local
      const CX = 372, CY = 300;                         // shove contact point (forward fist)
      const DRAWER = { x: 506, y: 660 };               // SENT drawer mouth, lower-center

      // ---- drivers ----
      const charge = interpolate(lf, [0, SHOVE, DRW + 8, 118, 138], [0.60, 0.60, 0.70, 0.98, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const heroPose = lf < 52 ? "punch" : lf < 120 ? "charge" : "victory";
      const menace = interpolate(lf, [0, 149], [0.74, 0.36], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const worry = over(lf, SHOVE + 2, 52, Easing.out(Easing.cubic));    // villain recoils after the shove
      const gold = over(lf, DRW, 46, Easing.out(Easing.cubic));           // SENT gold ramp
      const drawerOpen = over(lf, DRW, 20, Easing.out(Easing.cubic));     // drawer slide-open
      const shaft = over(lf, DRW - 2, 26);                               // light shaft bloom

      // ---- hero physicality: wind up into the shove, snap back on the hit, straighten for victory ----
      const wind = interpolate(lf, [SHOVE - 14, SHOVE, SHOVE + 18], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
      const recoil = Math.max(0, 1 - Math.max(0, lf - SHOVE) / 12);
      const rise = over(lf, 120, 20, Easing.out(Easing.cubic));           // small victory lift
      const heroTx = -wind * 13 + (lf >= SHOVE ? recoil * 17 : 0);
      const heroTy = -wind * 5 + (lf >= SHOVE ? recoil * -7 : 0) - rise * 7;
      const heroRot = -wind * 3.6 + (lf >= SHOVE ? recoil * 4.6 : 0);

      // ---- CAMERA: brace on the INBOX storm -> WHIP across/down to the SENT drawer -> push in on the absorb ----
      const lean = interpolate(lf, [0, SHOVE, SHOVE + 30], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
      const st = Math.max(0, lf - SHOVE);
      const shake = Math.max(0, 1 - st / 15);
      const shakeX = Math.sin(st * 1.65) * 22 * shake;
      const shakeY = Math.cos(st * 2.15) * 15 * shake;
      const shakeR = Math.sin(st * 1.9) * 1.7 * shake;
      // THE WHIP: fast swing from the grey inbox side to the golden drawer, with a lateral overshoot + roll
      const WHIP0 = DRW - 7, WHIP1 = DRW + 7;
      const whip = interpolate(lf, [WHIP0, WHIP1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
      const whipT = Math.sin(Math.max(0, Math.min(1, (lf - WHIP0) / (WHIP1 - WHIP0))) * Math.PI); // 0->1->0 speed bump
      // aim: pre = upper-left inbox storm, post = SENT drawer lower-center (world-translate to center the focus)
      const aimX = interpolate(whip, [0, 1], [54, 4]) - whipT * 66;       // swing hard left "across", then land
      const aimY = interpolate(whip, [0, 1], [38, -120]);                 // drop the frame onto the drawer
      const push = over(lf, DRW + 4, 92, Easing.inOut(Easing.cubic));     // push-in AFTER the whip lands (act 3)
      const blaze = lf > 130 ? Math.sin((lf - 130) * 1.8) * (1 - over(lf, 130, 18)) * 5 : 0;
      const camX = aimX - lean * 12 + shakeX + blaze;
      const camY = aimY - lean * 8 + shakeY;
      const camRot = -lean * 1.2 + shakeR + whipT * 2.4;                  // roll into the whip
      const camScale = 1.06 + push * 0.13 + shake * 0.03 + whipT * 0.05;
      const cam = `translate(${camX}px, ${camY}px) rotate(${camRot}deg) scale(${camScale})`;

      // comic shove starburst points
      let burst = "";
      for (let a = 0; a < 24; a++) { const r = a % 2 ? 34 : 66; const an = (a / 24) * Math.PI * 2; burst += `${74 + Math.cos(an) * r},${74 + Math.sin(an) * r} `; }
      // one gold voice-waveform bar-run (reused per envelope, deterministic)
      const wave = [0.5, 0.9, 0.35, 1.0, 0.6, 0.85, 0.4, 0.7];

      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: cam, transformOrigin: "50% 48%" }}>

          {/* ============ PLANE E - FAR: defocused mail-warehouse (deep DOF blur, counter-parallax = lags) ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${-aimX * 0.18 - shakeX * 0.4}px, ${-aimY * 0.18 - shakeY * 0.4}px) scale(1.10)`, filter: "blur(3.5px)", zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 70%, rgba(70,96,132,0.20) 0%, #0C1826 40%, #060B14 80%, #04060A 100%)" }} />
            {/* NEW: cold-grey (inbox side) vs warm-gold (vault side) ambient split wash */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, rgba(40,58,86,0.42) 0%, rgba(20,30,46,0.14) 42%, rgba(90,66,26,${0.12 + gold * 0.22}) 74%, rgba(231,178,76,${0.06 + gold * 0.2}) 100%)`, mixBlendMode: "screen" }} />
            {/* NEW: rear wall of the sorting hall + overhead trusses + hanging lamp cones */}
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              <rect x={0} y={286} width={1012} height={210} fill="rgba(16,26,42,0.5)" />
              <rect x={0} y={286} width={1012} height={4} fill="rgba(96,132,180,0.26)" />
              {Array.from({ length: 7 }, (_, k) => { const t = k / 6; const y = 40 + t * 150; const sp = 40 + t * 470; return (
                <g key={`tr${k}`} opacity={0.10 + t * 0.13} stroke="rgba(110,144,190,0.6)" strokeWidth={1.3} fill="none">
                  <line x1={506 - sp} y1={y} x2={506 + sp} y2={y} />
                  {Array.from({ length: 8 }, (_, z) => { const zx = 506 - sp + (z / 7) * sp * 2; const zx2 = 506 - sp + ((z + 0.5) / 7) * sp * 2; const zx3 = 506 - sp + ((z + 1) / 7) * sp * 2; return <path key={z} d={`M ${zx} ${y} L ${zx2} ${y + 12} L ${zx3} ${y}`} />; })}
                </g>); })}
              {[276, 506, 736].map((lx, i) => (
                <g key={`lmp${i}`}>
                  <line x1={lx} y1={70} x2={lx} y2={110} stroke="rgba(110,144,190,0.5)" strokeWidth={1.4} />
                  <ellipse cx={lx} cy={118} rx={20} ry={8} fill="rgba(180,200,225,0.18)" />
                  <polygon points={`${lx - 20},118 ${lx + 20},118 ${lx + 70},300 ${lx - 70},300`} fill="rgba(150,180,215,0.05)" />
                </g>
              ))}
            </svg>
            {/* deep mail-rack silhouettes (rows of pigeonholes receding) */}
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              {Array.from({ length: 6 }, (_, r) => { const t = r / 5; const y = 150 + t * 300; const h = 26 + t * 30; const sp = 120 + t * 420; return (
                <g key={`rk${r}`} opacity={0.10 + t * 0.14}>
                  <rect x={506 - sp} y={y} width={sp * 2} height={h} fill="none" stroke="rgba(96,132,180,0.5)" strokeWidth={1.4} />
                  {Array.from({ length: 9 }, (_, c) => { const cx = 506 - sp + (c / 8) * sp * 2; return <line key={c} x1={cx} y1={y} x2={cx} y2={y + h} stroke="rgba(96,132,180,0.45)" strokeWidth={1} />; })}
                </g>); })}
            </svg>
            {/* NEW: GOLDEN SENT VAULT DOOR at the hall's end (warm, ramps with gold) */}
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              <defs>
                <radialGradient id="s5vault" cx="0.5" cy="0.42" r="0.62">
                  <stop offset="0%" stopColor="#FFE6A8" stopOpacity={0.5 + gold * 0.4} />
                  <stop offset="55%" stopColor="#E7B24C" stopOpacity={0.22 + gold * 0.3} />
                  <stop offset="100%" stopColor="#7A5A1E" stopOpacity={0.1} />
                </radialGradient>
              </defs>
              <path d="M 406 476 L 406 372 Q 506 316 606 372 L 606 476 Z" fill="rgba(38,28,12,0.92)" stroke="rgba(231,178,76,0.5)" strokeWidth={2.4} />
              <path d="M 418 470 L 418 380 Q 506 330 594 380 L 594 470 Z" fill="url(#s5vault)" />
              <g opacity={0.5 + gold * 0.5}>
                <ellipse cx={470} cy={420} rx={52} ry={62} fill="rgba(46,34,14,0.9)" stroke="rgba(231,178,76,0.6)" strokeWidth={2} />
                <ellipse cx={470} cy={420} rx={34} ry={42} fill="none" stroke="rgba(231,178,76,0.4)" strokeWidth={1.4} />
                {Array.from({ length: 8 }, (_, b) => { const an = (b / 8) * Math.PI * 2; return <circle key={b} cx={470 + Math.cos(an) * 44} cy={420 + Math.sin(an) * 52} r={2.4} fill="rgba(246,220,152,0.85)" />; })}
                {Array.from({ length: 6 }, (_, b) => { const an = (b / 6) * Math.PI * 2 + lf * 0.004; return <line key={`sp${b}`} x1={470} y1={420} x2={470 + Math.cos(an) * 30} y2={420 + Math.sin(an) * 38} stroke="rgba(231,178,76,0.6)" strokeWidth={2} />; })}
              </g>
            </svg>
            {/* NEW: towering grey-parcel shelving, both flanks receding */}
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              {[0, 1].map((side) => { const dir = side === 0 ? -1 : 1; return (
                <g key={`shf${side}`}>
                  {Array.from({ length: 4 }, (_, col) => { const t = col / 3; const x = 506 + dir * (150 + t * 340); const w = 158 - t * 78; const y0 = 246 - t * 34; const rows = 5; const op = 0.34 - t * 0.15; const bodyH = 232 + t * 18; return (
                    <g key={col} opacity={op}>
                      <rect x={x - w / 2} y={y0} width={w} height={bodyH} fill="rgba(24,34,50,0.7)" stroke="rgba(96,132,180,0.4)" strokeWidth={1.2} />
                      {Array.from({ length: rows }, (_, r) => { const ry = y0 + 8 + r * (bodyH / rows); const bh = (bodyH / rows) - 8; return (
                        <g key={r}>
                          <line x1={x - w / 2} y1={ry - 4} x2={x + w / 2} y2={ry - 4} stroke="rgba(96,132,180,0.32)" strokeWidth={1} />
                          {Array.from({ length: 3 }, (_, p) => { const pw = w / 3.5; const px = x - w / 2 + 6 + p * (pw + 4); const ph = 10 + ((p + r) % 3) * 6; return <rect key={p} x={px} y={ry + bh - ph} width={pw} height={ph} rx={1.5} fill="#8A8E96" stroke="#6A6E76" strokeWidth={0.8} />; })}
                        </g>); })}
                    </g>); })}
                </g>); })}
            </svg>
            {/* perspective floor grid (converging to the drawer) */}
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              <rect x={0} y={476} width={1012} height={3} fill={HUD} opacity={0.16} />
              {Array.from({ length: 15 }, (_, k) => { const kk = k - 7; const xb = 506 + kk * 150; return <line key={`fv${k}`} x1={xb} y1={792} x2={506} y2={478} stroke={HUD} strokeWidth={1.4} strokeOpacity={0.09} />; })}
              {Array.from({ length: 9 }, (_, j) => { const t = j / 8; const y = 478 + Math.pow(t, 1.85) * 314; const sp = 60 + t * 560; return <line key={`fh${j}`} x1={506 - sp} y1={y} x2={506 + sp} y2={y} stroke={HUD} strokeWidth={1.4} strokeOpacity={0.05 + t * 0.13} />; })}
            </svg>
            {/* side energy conduits with pulsing nodes */}
            {[22, 966].map((lx, s) => (
              <div key={`cd${s}`} style={{ position: "absolute", left: lx, top: 130, width: 24, height: 540, background: "linear-gradient(180deg, rgba(46,66,96,0.7), rgba(12,20,34,0.9))", borderRadius: 6, boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)" }}>
                {Array.from({ length: 5 }, (_, k) => { const pul = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.16 + k * 1.3 + s)); return (
                  <div key={k} style={{ position: "absolute", left: 4, top: 40 + k * 104, width: 15, height: 15, borderRadius: "50%", background: HUD, opacity: 0.28 + pul * 0.5, boxShadow: `0 0 ${8 + pul * 12}px ${HUD}` }} />); })}
              </div>
            ))}
          </div>

          {/* ============ PLANE E(deep) - NEW: warm god-ray shaft pouring OUT of the back vault ============ */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 1, mixBlendMode: "screen", filter: "blur(5px)", opacity: 0.32 + gold * 0.5, transform: `translate(${-aimX * 0.14}px, ${-aimY * 0.14}px)` }}>
            <defs>
              <linearGradient id="s5vshaft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE6A8" stopOpacity={0.5} />
                <stop offset="70%" stopColor="#E7B24C" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#E7B24C" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[-2, -1, 0, 1, 2].map((k, i) => (
              <polygon key={`vs${i}`} points={`${470 - 30},420 ${470 + 30},420 ${470 + 190 + k * 60},792 ${470 - 190 + k * 60},792`} fill="url(#s5vshaft)" opacity={0.4 + 0.6 * Math.abs(Math.sin(lf * 0.045 + i))} />
            ))}
          </svg>

          {/* ============ PLANE E: FAR blurred INBOX drift (grey noise floating deep behind, always) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "blur(5px)", opacity: 0.5, pointerEvents: "none", transform: `translate(${-aimX * 0.12 - shakeX * 0.5}px, ${-aimY * 0.12 - shakeY * 0.5}px)` }}>
            {Array.from({ length: 10 }, (_, i) => { const sd = seed(i + 31); const x = seed(i * 2.9) * 1012; const y = (seed(i * 1.9) * 792 + lf * (0.35 + sd * 0.5)) % 792; const push2 = over(lf, SHOVE, 16); const yy = y - push2 * (200 + sd * 200); const op = (1 - push2) * (0.4 + sd * 0.4); if (op <= 0.03) return null; return (
              <div key={`fe${i}`} style={{ position: "absolute", left: x, top: yy, opacity: op, transform: `rotate(${(sd - 0.5) * 40}deg)` }}>
                <svg width={40} height={27} viewBox="0 0 40 27"><rect x="1" y="1" width="38" height="25" rx="3" fill="#8A8E96" stroke="#6A6E76" strokeWidth="1.4" /><path d="M2,3 L20,15 L38,3" fill="none" stroke="#5C606A" strokeWidth="1.8" /></svg>
              </div>); })}
          </div>

          {/* ============ PLANE D - NEW: CONVEYOR RAILS feeding grey parcels toward the vault ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 3, filter: "blur(1.6px)", transform: `translate(${-aimX * 0.22 - shakeX * 0.3}px, ${-aimY * 0.22 - shakeY * 0.3}px)`, pointerEvents: "none" }}>
            <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
              {[{ x0: 40 }, { x0: 972 }].map((b, bi) => { const vx = 470, vy = 470, y0 = 792; const dirf = bi ? -1 : 1; return (
                <g key={`bl${bi}`} opacity={0.5}>
                  <polygon points={`${b.x0 - 46},${y0} ${b.x0 + 46},${y0} ${vx + 26},${vy} ${vx - 26},${vy}`} fill="rgba(20,30,46,0.8)" stroke="rgba(96,132,180,0.4)" strokeWidth={1.4} />
                  {Array.from({ length: 9 }, (_, s) => { const t = ((s / 9) + ((lf * 0.006 * dirf) % 1) + 1) % 1; const lx = b.x0 + (vx - b.x0) * t; const ly = y0 + (vy - y0) * t; const w = 92 - t * 66; return <line key={s} x1={lx - w / 2} y1={ly} x2={lx + w / 2} y2={ly} stroke="rgba(110,144,190,0.35)" strokeWidth={1.2} />; })}
                  {Array.from({ length: 4 }, (_, s) => { const t = ((s / 4) + ((lf * 0.004 * dirf) % 1) + 1) % 1; const lx = b.x0 + (vx - b.x0) * t; const ly = y0 + (vy - y0) * t; const sc = 1 - t * 0.7; const g2 = over(lf, SHOVE, 16); return (
                    <g key={`pc${s}`} transform={`translate(${lx},${ly}) scale(${sc})`} opacity={0.7 * (1 - g2 * 0.5)}>
                      <rect x={-18} y={-24} width={36} height={24} rx={2} fill="#9599A0" stroke="#70747C" strokeWidth={1.2} />
                      <line x1={-18} y1={-12} x2={18} y2={-12} stroke="#70747C" strokeWidth={1} />
                    </g>); })}
                </g>); })}
            </svg>
          </div>

          {/* ============ PLANE D - NEW: mid-depth floating grey envelopes (bridges far drift + foreground) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 4, filter: "blur(2.4px)", opacity: 0.6, pointerEvents: "none", transform: `translate(${-aimX * 0.16 - shakeX * 0.35}px, ${-aimY * 0.16 - shakeY * 0.35}px)` }}>
            {Array.from({ length: 8 }, (_, i) => { const sd = seed(i + 61); const x = seed(i * 3.7) * 1012; const baseY = seed(i * 2.2) * 520 + 120; const y = baseY + Math.sin(lf * 0.02 + i) * 22; const push2 = over(lf, SHOVE, 16); const yy = y - push2 * (160 + sd * 180); const op = (1 - push2 * 0.85) * (0.4 + sd * 0.35); if (op <= 0.03) return null; const sz = 30 + sd * 20; return (
              <div key={`me${i}`} style={{ position: "absolute", left: x, top: yy, opacity: op, transform: `rotate(${(sd - 0.5) * 30}deg)` }}>
                <svg width={sz} height={sz * 0.66} viewBox="0 0 40 27"><rect x="1" y="1" width="38" height="25" rx="3" fill="#9599A0" stroke="#70747C" strokeWidth="1.4" /><path d="M2,3 L20,15 L38,3" fill="none" stroke="#5C606A" strokeWidth="1.6" /></svg>
              </div>); })}
          </div>

          {/* ============ PLANE A(atmos) VOLUMETRIC GOD-RAYS: cool ambient from upper-left (the grey side) ============ */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 5, mixBlendMode: "screen", filter: "blur(3px)", transform: `translate(${-aimX * 0.08}px, 0)` }}>
            <defs>
              <linearGradient id="s5cool" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#AFC4DC" stopOpacity={0.10 + (1 - gold) * 0.10} />
                <stop offset="60%" stopColor="#6E90BC" stopOpacity={0.05 + (1 - gold) * 0.05} />
                <stop offset="100%" stopColor="#6E90BC" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => { const x0 = -40 + i * 74; return (
              <polygon key={`cray${i}`} points={`${x0},96 ${x0 + 46},96 ${x0 + 320 + i * 40},792 ${x0 + 210 + i * 40},792`} fill="url(#s5cool)" />); })}
          </svg>

          {/* ============ NEW: dust drifting IN the back-vault light shaft ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0.4 + gold * 0.5 }}>
            {Array.from({ length: 14 }, (_, i) => { const sd = seed(i + 71); const x = 470 - 80 + sd * 160 + Math.sin(lf * 0.03 + i) * 18; const y = ((470 + (i / 14) * 322 + lf * (0.4 + sd * 0.5)) % 340) + 452; const sz = 1.5 + sd * 3; return (
              <div key={`vd${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: "#FFE6A8", opacity: 0.2 + sd * 0.3, boxShadow: `0 0 ${4 + sd * 5}px #E7B24C` }} />); })}
          </div>

          {/* ============ PLANE A(atmos) SENT SHAFT: warm god-rays fanning UP out of the drawer ============ */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 12, mixBlendMode: "screen", filter: "blur(4px)", opacity: shaft }}>
            <defs>
              <linearGradient id="s5warm" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FFE6A8" stopOpacity={0.55 * (0.7 + charge * 0.3)} />
                <stop offset="55%" stopColor="#E7B24C" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#E7B24C" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[-3, -1.5, 0, 1.5, 3].map((k, i) => (
              <polygon key={`wray${i}`} points={`${DRAWER.x - 60},${DRAWER.y} ${DRAWER.x + 60},${DRAWER.y} ${DRAWER.x + 300 + k * 70},110 ${DRAWER.x - 300 + k * 70},110`} fill="url(#s5warm)" opacity={0.4 + 0.6 * Math.abs(Math.sin(lf * 0.05 + i))} />
            ))}
          </svg>

          {/* reactor bloom behind hero (complementary cyan+gold, intensifies as the core fills) */}
          <div style={{ position: "absolute", left: REACTOR.x - 340, top: REACTOR.y - 340, width: 680, height: 680, borderRadius: "50%", background: `radial-gradient(circle, rgba(127,232,255,${0.10 + charge * 0.38}) 0%, rgba(231,178,76,${0.05 + gold * 0.26}) 34%, transparent 66%)`, filter: "blur(16px)", zIndex: 6 }} />

          {/* ============ PLANE C - MID: drifting haze band + particulate (cool -> warm as SENT takes over) ============ */}
          <div style={{ position: "absolute", left: -80, top: 320, width: 1280, height: 300, background: `linear-gradient(90deg, transparent, rgba(90,130,180,${0.10 * (1 - gold * 0.6)}) 40%, rgba(231,178,76,${0.05 + gold * 0.08}) 70%, transparent)`, filter: "blur(22px)", transform: `translateX(${Math.sin(lf * 0.03) * 40 - 40 + aimX * 0.1}px)`, zIndex: 7, mixBlendMode: "screen", pointerEvents: "none" }} />
          {Array.from({ length: 22 }, (_, i) => { const sd = seed(i + 4); const x = seed(i * 2.3) * 1012 + aimX * 0.12; const y = (seed(i * 1.7) * 792 - lf * (0.3 + sd * 0.7) + 792 * 3) % 792; const sz = 2 + sd * 4; const warm = sd > 0.55 && gold > 0.3; return (
            <div key={`dust${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: warm ? IRONG : HUD, opacity: (0.10 + sd * 0.22), boxShadow: `0 0 ${4 + sd * 5}px ${warm ? IRONG : HUD}`, zIndex: 8 }} />); })}
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 240px rgba(0,0,0,0.72)", zIndex: 9, pointerEvents: "none" }} />

          {/* ============ VILLAIN: GENERIC-9000 (upper-left, smug -> worried, buried in his own grey) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 14, transform: `translate(${-worry * 42}px, ${-worry * 6}px) rotate(${-worry * 7}deg) scale(${1 - worry * 0.08})`, transformOrigin: "150px 250px", filter: `saturate(${1 - worry * 0.55}) blur(${worry * 0.6}px)` }}>
            <Generic9000 lf={lf} size={196} left={58} top={140} pose="mock" menace={menace} flip={1} z={14} />
          </div>
          {/* villain worried "?!" bubble */}
          {worry > 0.05 && (
            <div style={{ position: "absolute", left: 214, top: 168, zIndex: 42, opacity: Math.min(1, worry * 1.6), transform: `translateY(${(1 - Math.min(1, worry * 1.6)) * 12}px) scale(${0.8 + Math.min(1, worry * 1.6) * 0.2})` }}>
              <div style={{ position: "relative", padding: "6px 16px", borderRadius: 14, background: "#EEF3F8", border: "2px solid #20303f", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)" }}>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#20303f", lineHeight: 1 }}>?!</span>
                <div style={{ position: "absolute", left: 14, bottom: -12, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "10px solid transparent", borderTop: "14px solid #EEF3F8" }} />
              </div>
            </div>
          )}

          {/* ============ PLANE B(mid-hero): THE SENT DRAWER slides open from below ============ */}
          {shaft > 0.01 && (() => {
            const dy = (1 - drawerOpen) * 92;                              // slides up into view
            const pulse = 0.85 + 0.15 * Math.sin(lf / 5);
            return (
              <div style={{ position: "absolute", left: DRAWER.x - 180, top: DRAWER.y - 6 + dy, width: 360, height: 118, zIndex: 15, opacity: drawerOpen }}>
                {/* drawer body */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(180deg, #3A2E16 0%, #241B0C 100%)", border: `2px solid ${IRONG}`, boxShadow: `0 -14px 40px rgba(231,178,76,${0.30 * pulse}), inset 0 8px 22px rgba(255,230,168,0.28)` }} />
                {/* open mouth glow */}
                <div style={{ position: "absolute", left: 14, right: 14, top: 8, height: 30, borderRadius: 8, background: `linear-gradient(180deg, rgba(255,240,200,${0.9 * pulse}), rgba(231,178,76,0.2))`, boxShadow: `0 0 26px ${IRONG}`, filter: "blur(1px)" }} />
                {/* face plate + handle + label */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 58, borderRadius: "0 0 12px 12px", background: "linear-gradient(180deg, #2C2210, #1A140A)", borderTop: `1px solid rgba(231,178,76,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 54, height: 8, borderRadius: 5, background: IRONG, boxShadow: `0 0 12px ${IRONG}` }} />
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: 6, color: "#F6DC98", textShadow: `0 0 16px ${IRONG}` }}>SENT</span>
                  <div style={{ width: 54, height: 8, borderRadius: 5, background: IRONG, boxShadow: `0 0 12px ${IRONG}` }} />
                </div>
              </div>
            );
          })()}

          {/* ============ PLANE B - HERO: IRON CLAUDE (punch -> charge -> victory), sharp, wrapped for recoil ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 30, transform: `translate(${heroTx}px, ${heroTy}px) rotate(${heroRot}deg)`, transformOrigin: `${REACTOR.x}px ${REACTOR.y}px` }}>
            <IronClaude lf={lf} size={HS} left={HX} top={HY} pose={heroPose} core={charge} flip={-1} z={30} />
          </div>

          {/* reactor intake bloom (brightens as the SENT gold funnels in) */}
          <div style={{ position: "absolute", left: REACTOR.x - 58, top: REACTOR.y - 40, width: 116, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(127,232,255,0.74), transparent 70%)", filter: "blur(9px)", opacity: gold * (0.5 + 0.5 * Math.sin(lf / 4)), zIndex: 31 }} />

          {/* ============ SENT: GOLD envelopes rise out of the drawer -> stream INTO the reactor ============ */}
          {gold > 0 && Array.from({ length: 12 }, (_, i) => {
            const s1 = seed(i + 5.5), s2 = seed(i * 2.3 + 1.1);
            const startDelay = DRW + 4 + s1 * 40;
            const dur = 44 + s2 * 20;
            const raw = (lf - startDelay) / dur;
            if (raw < 0 || raw > 1.08) return null;
            const p = Math.min(1, raw);
            const spread = (s1 - 0.5) * 150;
            const sx = DRAWER.x + spread * 0.4;
            const sy = DRAWER.y - 18;
            const mx = DRAWER.x + spread + (REACTOR.x - DRAWER.x) * 0.2;
            const my = 300 - s2 * 90;
            const ex = REACTOR.x, ey = REACTOR.y;
            const q = 1 - p;
            const x = q * q * sx + 2 * q * p * mx + p * p * ex;
            const y = q * q * sy + 2 * q * p * my + p * p * ey;
            const scl = interpolate(p, [0, 0.15, 0.82, 1], [0.3, 1, 1, 0.35], { extrapolateRight: "clamp" });
            const op = interpolate(p, [0, 0.12, 0.8, 1], [0, 1, 1, 0], { extrapolateRight: "clamp" }) * over(lf, startDelay, 5);
            if (op <= 0.03) return null;
            const rot = (s1 - 0.5) * 34 - p * 20;
            return (
              <div key={`gold${i}`} style={{ position: "absolute", left: x - 27, top: y - 18, opacity: op, transform: `rotate(${rot}deg) scale(${scl})`, zIndex: 33, filter: `drop-shadow(0 0 12px rgba(231,178,76,0.85))` }}>
                <svg width={54} height={36} viewBox="0 0 54 36">
                  <rect x="1" y="1" width="52" height="34" rx="4" fill="#F6DC98" stroke="#C99A2E" strokeWidth="1.6" />
                  <rect x="1" y="1" width="52" height="9" rx="4" fill="#E7B24C" />
                  <path d="M2,3 L27,20 L52,3" fill="none" stroke="#B8862A" strokeWidth="1.6" />
                  {wave.map((h, w) => (
                    <rect key={w} x={9 + w * 5} y={26 - h * 12} width={3} height={h * 12} rx={1.5} fill="#7FE8FF" />
                  ))}
                </svg>
              </div>
            );
          })}

          {/* SENT trailing ribbon (drawer -> reactor) under the envelopes */}
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 16, opacity: gold * 0.8, filter: "blur(2px)", mixBlendMode: "screen" }}>
            <defs>
              <linearGradient id="s5ribbon" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#E7B24C" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#7FE8FF" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#7FE8FF" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((k) => (
              <path key={`rb${k}`} d={`M ${DRAWER.x + (k - 1) * 40} ${DRAWER.y - 20} Q ${DRAWER.x + (k - 1) * 90} 320, ${REACTOR.x} ${REACTOR.y}`} fill="none" stroke="url(#s5ribbon)" strokeWidth={16 - k * 4} strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(lf / 5 + k))} />
            ))}
          </svg>

          {/* ============ INBOX GREY STORM - floods from every edge, then SHOVED away ============ */}
          {Array.from({ length: 22 }, (_, i) => {
            const ti = i * 1.1;
            const enter = over(lf, ti, 15, Easing.in(Easing.cubic));
            const edge = i % 4;
            const sx = edge === 0 ? -100 - seed(i) * 120 : edge === 1 ? 1112 + seed(i) * 120 : 120 + seed(i * 2) * 780;
            const sy = edge === 2 ? -120 - seed(i * 3) * 120 : edge === 3 ? 900 + seed(i * 3) * 120 : 100 + seed(i * 5) * 560;
            const cx = CX + (seed(i * 5) - 0.5) * 260, cy = CY + (seed(i * 2 + 2) - 0.5) * 240;
            let x = sx + (cx - sx) * enter;
            let y = sy + (cy - sy) * enter;
            let rot = (seed(i * 7) - 0.5) * 60 * enter;
            const g = over(lf, SHOVE, 13, Easing.in(Easing.cubic));
            const defAng = -2.35 + (seed(i * 7) - 0.5) * 1.5;
            const dist = g * g * (780 + seed(i * 9) * 620);
            x += dist * Math.cos(defAng);
            y += dist * Math.sin(defAng) - Math.sin(g * Math.PI) * 64;
            rot += g * (-360 - seed(i * 11) * 440);
            const op = enter * (1 - over(lf, SHOVE + 4, 12));
            if (op <= 0.02) return null;
            return (
              <div key={`env${i}`} style={{ position: "absolute", left: x, top: y, opacity: op, transform: `rotate(${rot}deg)`, zIndex: 34, filter: "drop-shadow(0 9px 11px rgba(0,0,0,0.5)) grayscale(0.4)" }}>
                <svg width={46} height={31} viewBox="0 0 46 31">
                  <rect x="1" y="1" width="44" height="29" rx="3" fill="#B8BAC0" stroke="#8A8E96" strokeWidth="1.5" />
                  <rect x="1" y="1" width="44" height="7" fill="#8A8E96" opacity="0.7" />
                  <path d="M2,3 L23,18 L44,3" fill="none" stroke="#6A6E76" strokeWidth="2" />
                </svg>
              </div>
            );
          })}
          {/* heavier stacked grey message-slabs to sell the AVALANCHE mass */}
          {Array.from({ length: 5 }, (_, i) => {
            const ti = 2 + i * 3;
            const enter = over(lf, ti, 17, Easing.in(Easing.cubic));
            const sx = -140 + seed(i * 4 + 2) * 1200, sy = -220 - seed(i * 6) * 160;
            const cx = CX - 30 + (seed(i * 9 + 1) - 0.5) * 220, cy = CY - 10 + (seed(i * 3) - 0.5) * 180;
            let x = sx + (cx - sx) * enter;
            let y = sy + (cy - sy) * enter;
            let rot = 16 - enter * 28;
            const g = over(lf, SHOVE, 13, Easing.in(Easing.cubic));
            const defAng = -2.3 + (seed(i * 5) - 0.5) * 1.2;
            const dist = g * g * (720 + seed(i * 8) * 540);
            x += dist * Math.cos(defAng);
            y += dist * Math.sin(defAng) - Math.sin(g * Math.PI) * 72;
            rot += g * (-320 - seed(i * 7) * 380);
            const op = enter * (1 - over(lf, SHOVE + 4, 12));
            if (op <= 0.02) return null;
            return (
              <div key={`slab${i}`} style={{ position: "absolute", left: x, top: y, opacity: op, transform: `rotate(${rot}deg)`, zIndex: 33, filter: "drop-shadow(0 10px 13px rgba(0,0,0,0.55)) grayscale(0.5)" }}>
                <svg width={92} height={46} viewBox="0 0 92 46">
                  <rect x="1" y="1" width="90" height="44" rx="5" fill="#AFB2B8" stroke="#82868E" strokeWidth="1.6" />
                  <circle cx="15" cy="14" r="7" fill="#909399" />
                  <rect x="28" y="9" width="52" height="6" rx="3" fill="#9A9DA3" />
                  <rect x="28" y="21" width="40" height="5" rx="2.5" fill="#A6A9AF" />
                  <rect x="28" y="31" width="46" height="5" rx="2.5" fill="#A6A9AF" />
                </svg>
              </div>
            );
          })}

          {/* ============ THE SHOVE - shockwave, speed-lines + comic starburst ============ */}
          {(() => {
            const g = over(lf, SHOVE - 2, 16);
            if (g <= 0 || lf > SHOVE + 26) return null;
            const ring = over(lf, SHOVE, 20);
            const bs = over(lf, SHOVE - 4, 8) * (1 - over(lf, SHOVE + 14, 12));
            return (
              <>
                <div style={{ position: "absolute", left: CX - ring * 780, top: CY - ring * 780, width: ring * 1560, height: ring * 1560, borderRadius: "50%", border: `3px solid rgba(127,232,255,${(1 - ring) * 0.6})`, zIndex: 35 }} />
                {Array.from({ length: 10 }, (_, i) => { const s = seed(i + 9); const yy = CY - 160 + i * 38; const w = 110 + s * 190; const lxx = CX + 60 - (g + s * 0.3) * 920; return (
                  <div key={`sl${i}`} style={{ position: "absolute", left: lxx, top: yy, width: w, height: 3, background: "rgba(234,251,255,0.85)", opacity: Math.sin(g * Math.PI) * 0.5, filter: "blur(1px)", transform: "skewX(12deg)", zIndex: 35 }} />); })}
                {bs > 0.02 && (
                  <div style={{ position: "absolute", left: CX - 92, top: CY - 120, width: 184, height: 152, zIndex: 38, opacity: bs, transform: `rotate(8deg) scale(${0.7 + bs * 0.4})` }}>
                    <svg viewBox="0 0 148 148" width={184} height={152} style={{ overflow: "visible", position: "absolute", left: 0, top: 0 }}>
                      <polygon points={burst} fill="#FFE9A8" stroke="#C24339" strokeWidth={4} strokeLinejoin="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#B4423A", WebkitTextStroke: "1.5px #5A1815", letterSpacing: -1 }}>SHOVE!</span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* ============ LABELS: INBOX (grey, struck, swept up-left) / SENT (gold) ============ */}
          {(() => {
            const g = over(lf, SHOVE, 14, Easing.in(Easing.cubic));
            const op = over(lf, 2, 8) * (1 - over(lf, SHOVE + 4, 10));
            if (op <= 0.02) return null;
            return (
              <div style={{ position: "absolute", left: 300 - g * g * 300, top: 250 - g * g * 240, opacity: op, transform: `rotate(${-g * 200}deg)`, zIndex: 40 }}>
                <div style={{ position: "relative", padding: "6px 16px", borderRadius: 10, background: "rgba(30,40,58,0.92)", border: `1.5px solid ${MUTE}`, display: "inline-block" }}>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: "#BCC5D4" }}>INBOX</span>
                  <div style={{ position: "absolute", left: 8, right: 8, top: "50%", height: 3, borderRadius: 2, background: RED, opacity: 0.92, transform: `scaleX(${over(lf, SHOVE - 8, 6)})`, transformOrigin: "left" }} />
                </div>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 16, letterSpacing: 1, color: "rgba(188,197,212,0.85)", marginTop: 4 }}>everyone does that</div>
              </div>
            );
          })()}
          <div style={{ position: "absolute", left: DRAWER.x - 160, top: 566, width: 320, textAlign: "center", zIndex: 41, opacity: over(lf, DRW + 8, 12) }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, letterSpacing: 2, color: "rgba(246,220,152,0.92)", textShadow: `0 0 14px rgba(231,178,76,0.6)` }}>how you actually talk</div>
          </div>

          {/* full-blaze ring - the reactor hits 100% */}
          {lf >= 132 && (() => { const p = over(lf, 132, 17); return (
            <div style={{ position: "absolute", left: REACTOR.x, top: REACTOR.y, width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: "50%", border: "3px solid rgba(234,251,255,0.9)", transform: `scale(${0.4 + p * 1.9})`, opacity: (1 - p) * 0.9, zIndex: 44 }} />); })()}

          {/* ============ WHIP MOTION-BLUR: horizontal light-smear streaks during the camera whip ============ */}
          {whipT > 0.02 && (
            <div style={{ position: "absolute", inset: 0, zIndex: 52, pointerEvents: "none", opacity: whipT * 0.9, mixBlendMode: "screen" }}>
              {Array.from({ length: 15 }, (_, i) => { const yy = (i / 14) * 792; const warm = i % 2 === 0; return (
                <div key={`whb${i}`} style={{ position: "absolute", left: -120, top: yy, width: 1260, height: 2 + (i % 3), background: `linear-gradient(90deg, transparent, ${warm ? "rgba(231,178,76,0.55)" : "rgba(127,232,255,0.5)"}, transparent)`, filter: "blur(2px)", transform: `translateX(${-whipT * 130}px)` }} />); })}
            </div>
          )}

          {/* ============ PLANE A - FG: envelopes tumbling PAST THE LENS (heavy DOF blur, fastest parallax) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 49, filter: "blur(7px)", pointerEvents: "none", transform: `translate(${aimX * 0.34 + shakeX * 0.6}px, ${aimY * 0.34 + shakeY * 0.6}px)` }}>
            {Array.from({ length: 5 }, (_, i) => { const sd = seed(i + 40); const warm = gold > 0.3 && sd > 0.5; const x = ((seed(i * 3.3) * 1200 + lf * (3 + sd * 3)) % 1320) - 150; const y = ((seed(i * 2.1) * 940 + lf * (2 + sd * 2)) % 1040) - 130; const rot = lf * (1.2 + sd * 2) * (sd > 0.5 ? 1 : -1); const sz = 74 + sd * 44; return (
              <div key={`fgv${i}`} style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, opacity: 0.5 }}>
                <svg width={sz} height={sz * 0.66} viewBox="0 0 54 36"><rect x="1" y="1" width="52" height="34" rx="4" fill={warm ? "#F6DC98" : "#9DA1A9"} stroke={warm ? "#C99A2E" : "#767A82"} strokeWidth="1.6" /><path d="M2,3 L27,20 L52,3" fill="none" stroke={warm ? "#B8862A" : "#5E626A"} strokeWidth="1.8" /></svg>
              </div>); })}
          </div>

          {/* ============ PLANE A - NEAR foreground bokeh (defocused, exaggerated parallax = depth of field) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 50, filter: "blur(6px)", transform: `translate(${aimX * 0.3 + shakeX * 0.6}px, ${aimY * 0.3 + shakeY * 0.6}px)`, pointerEvents: "none" }}>
            {Array.from({ length: 7 }, (_, i) => { const sd = seed(i + 21); const x = seed(i * 3.1) * 1012; const y = (seed(i * 2.7) * 792 + lf * (0.6 + sd)) % 860 - 40; const sz = 22 + sd * 40; const warm = sd > 0.5 && gold > 0.3; return (
              <div key={`bok${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: warm ? "rgba(231,178,76,0.22)" : "rgba(127,232,255,0.20)", boxShadow: `0 0 ${sz}px ${warm ? "rgba(231,178,76,0.30)" : "rgba(127,232,255,0.28)"}` }} />); })}
          </div>

          {/* ============ GRADE + VIGNETTE + FILM-GRAIN (cinematic finish) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 58, mixBlendMode: "soft-light", background: `radial-gradient(70% 60% at 50% 74%, rgba(231,178,76,${0.20 + gold * 0.16}), transparent 60%), radial-gradient(120% 120% at 20% 12%, rgba(70,120,180,0.22), transparent 55%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 59, boxShadow: "inset 0 0 300px rgba(4,7,12,0.82)", pointerEvents: "none" }} />
          <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 60, mixBlendMode: "overlay", opacity: 0.09, pointerEvents: "none" }}>
            <filter id="s5grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect x={-(lf % 3)} y={-(lf % 2)} width={1020} height={800} filter="url(#s5grain)" />
          </svg>
        </div>
      );
    })()}

      <ToolCard lf={lf} at={4} name="Gmail" />
    </Panel>
);

const S6: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="jarvis // COMBAT">
    {(() => {
      // ================= S6 - SHOWDOWN / CLASH (hardest interrupt, 35f / 1.18s) =================
      // Beat: reactor FULL. GENERIC-9000 red-alerts and CHARGES from the left; IRON CLAUDE does NOT
      // wait - he DRIVES in from the right and PUNCHES. They collide dead-center. A real WHIP-ZOOM
      // rides the closing distance, freeze-flash + starburst on contact, shock ring rips the arena.
      // RE-SHOT: 5 clean parallax planes each drifting at its own rate (FG dust/sparks + FAR crowd-void
      // are DOF-blurred), volumetric warm-key vs cool-rim clash, god-rays + haze, epic scale contrast.
      // BG DEEPENED: deep colosseum shell (arch arcade + pillars), overhead spotlight rig cones,
      // spotlit circular combat dais w/ reflective sheen, faction banners, floor debris, far embers.
      const DUR = 35;
      const HIT = 20;                         // the impact frame
      const CX = 512, CY = 448;               // clash point - panel CENTER
      const posClock = Math.min(lf, HIT);     // freeze the closing distance exactly at contact
      const vlf = Math.min(lf, HIT + 2);      // FREEZE-FRAME the fighters' internal animation on impact
      const app = over(posClock, 0, HIT, Easing.in(Easing.cubic));   // both ACCELERATE toward center
      const charge = app;                     // atmosphere climbs with the charge
      const post = over(lf, HIT, DUR - HIT, Easing.out(Easing.cubic)); // aftermath clock

      // ---- villain charges IN from the left (grows = comes at camera = powerful) ----
      const vLeft = -180 + app * 452;         // -180 -> 272
      const vSize = 250 + app * 92;           // 250 -> 342
      const vTop = 402 - app * 42;            // 402 -> 360 (rises to meet the hero's fist)

      // ---- HERO charges IN from the right and PUNCHES (active, not braced) ----
      const hLeft = 952 - app * 500;          // 952 -> 452
      const hSize = 330 + app * 26;           // 330 -> 356
      const hTop = 360 - app * 8;             // 360 -> 352
      const heroPose = lf < HIT - 1 ? "charge" : "punch";

      // ---- camera: hard WHIP-ZOOM ramps on the closing distance, snap kick + shake + whip-tilt ----
      const kick = lf >= HIT ? Math.max(0, 1 - (lf - HIT) / 6) : 0;
      const zoomCharge = over(posClock, 0, HIT, Easing.in(Easing.quad)); // scale accelerates INTO the hit
      const camScale = 1.02 + zoomCharge * 0.22 + (lf >= HIT ? (0.06 - post * 0.05) : 0) + kick * 0.045;
      const sd = lf >= HIT && lf < HIT + 7 ? 1 - (lf - HIT) / 7 : 0;
      const shx = sd > 0 ? Math.sin((lf - HIT) * 3.3) * sd * 11 : 0;
      const shy = sd > 0 ? Math.cos((lf - HIT) * 4.1) * sd * 7 : 0;
      const camRot = interpolate(lf, [0, HIT - 2, HIT, HIT + 5, DUR], [0.6, -1.3, 1.9, 0.4, 0], { extrapolateRight: "clamp" }); // whip tilt through the hit
      const camX = interpolate(lf, [0, HIT - 4, HIT, DUR], [0, 11, 0, 0], { extrapolateRight: "clamp" });                        // pre-impact drift snaps back = whip-pan

      // ---- clash energetics ----
      const flash = lf >= HIT ? Math.max(0, 1 - (lf - HIT) / 5) : 0;
      const freeze = lf >= HIT && lf < HIT + 2 ? 1 - (lf - HIT) / 2 : 0;   // 2-frame freeze-flash pop
      const redAlert = interpolate(lf, [3, HIT, HIT + 6], [0, 0.28, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const swp = over(lf, HIT, 15, Easing.out(Easing.cubic));
      const swp2 = over(lf, HIT + 2, 15, Easing.out(Easing.cubic));
      const shockRing = over(lf, HIT, 13, Easing.out(Easing.cubic));       // hard flat ground SHOCK RING across the arena
      const starP = over(lf, HIT, 9, Easing.out(Easing.cubic));
      const spokes = over(lf, HIT, 12, Easing.out(Easing.cubic));
      const coreFlare = flash * 0.7 + Math.max(0, 1 - Math.abs(lf - HIT) / 3) * 0.5;   // collision core disc
      const contrastFlt = lf >= HIT && lf < HIT + 4 ? "contrast(1.26) brightness(1.12) saturate(1.12)" : "none";
      const floorPulse = 0.3 + charge * 0.4 + flash * 0.9;                 // energy floor swells to impact then flares
      const eyeGlint = 0.32 + Math.abs(Math.sin(lf / 7)) * 0.16 + flash * 0.6;  // crowd eyes react (glint hard on the hit)

      // comic starburst (12-point) built deterministically
      const star = Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; const r = i % 2 ? 30 : 74; return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(" ");

      const ring = (p: number, col: string, w: number) => (p > 0 && p < 1 ? (
        <div style={{ position: "absolute", left: CX, top: CY, width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: "50%", border: `${w}px solid ${col}`, transform: `scale(${0.15 + p * 4.6})`, opacity: (1 - p) * 0.92, boxShadow: `0 0 46px ${col}`, mixBlendMode: "screen", pointerEvents: "none" }} />
      ) : null);

      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translate(${shx + camX}px,${shy}px) scale(${camScale}) rotate(${camRot}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
          {/* ================= PLANE E - ATMOSPHERE / FAR BACKDROP (slowest drift, DOF-blurred) ================= */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${-shx * 0.22 + Math.sin(lf / 30) * 4}px,${-shy * 0.22}px) scale(${1.05 + zoomCharge * 0.03})`, filter: "blur(3px)", zIndex: 1 }}>
            <Stage lf={lf} energy={1} hue="crimson" grid />
          </div>
          {/* far furnace nebula - warm villain-side vs cool hero-side wells of light */}
          <div style={{ position: "absolute", left: -120, top: -60, width: 720, height: 700, background: "radial-gradient(60% 60% at 30% 40%, rgba(255,86,58,0.30), transparent 68%)", filter: "blur(40px)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -120, top: -40, width: 720, height: 700, background: "radial-gradient(60% 60% at 70% 40%, rgba(90,200,255,0.26), transparent 68%)", filter: "blur(40px)", zIndex: 1, pointerEvents: "none" }} />

          {/* ================= DEEP COLOSSEUM SHELL - tiered arch arcade + pillar gallery ringing the bowl (deepest plane, heavy DoF) ================= */}
          <div style={{ position: "absolute", left: -80, top: 8, width: 1172, height: 400, filter: "blur(5px)", transform: `translate(${-shx * 0.16 + Math.sin(lf / 34) * 3}px,0) scale(${1.05 + zoomCharge * 0.02})`, transformOrigin: "50% 26%", zIndex: 1, pointerEvents: "none", opacity: 0.9 }}>
            {/* massive stone bowl lip curving across the top */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1172, height: 158, borderRadius: "0 0 50% 50%/0 0 100% 100%", background: "linear-gradient(180deg, rgba(20,16,22,0.96), rgba(10,8,14,0.5))", boxShadow: "inset 0 -30px 60px rgba(0,0,0,0.7)" }} />
            {/* upper arch arcade - repeating colonnade around the rim, dipping toward the pit */}
            {Array.from({ length: 24 }, (_, i) => {
              const ax = 10 + i * 48.5;
              const dip = Math.pow(Math.abs(ax - 586) / 586, 2) * 74;
              const warm = ax < 586;
              return <div key={`arcU${i}`} style={{ position: "absolute", left: ax, top: 44 + dip, width: 34, height: 96, borderRadius: "17px 17px 0 0", background: warm ? "linear-gradient(180deg, rgba(46,20,22,0.55), rgba(16,10,12,0.2))" : "linear-gradient(180deg, rgba(18,26,36,0.55), rgba(10,14,20,0.2))", border: "1px solid rgba(0,0,0,0.5)", boxShadow: "inset 0 0 14px rgba(0,0,0,0.6)" }} />;
            })}
            {/* lower gallery pillars beneath the arcade */}
            {Array.from({ length: 24 }, (_, i) => {
              const ax = 10 + i * 48.5;
              const dip = Math.pow(Math.abs(ax - 586) / 586, 2) * 74;
              return <div key={`pilL${i}`} style={{ position: "absolute", left: ax + 8, top: 152 + dip, width: 18, height: 150, background: "linear-gradient(90deg, rgba(6,6,10,0.2), rgba(30,26,32,0.5), rgba(6,6,10,0.2))" }} />;
            })}
          </div>

          {/* far drifting EMBERS floating through the upper bowl (deep plane, blurred, warm vs cool) */}
          {Array.from({ length: 14 }, (_, i) => {
            const s = seed(i + 91);
            const ex = 40 + s * 940 + Math.sin((lf + i * 6) / 20) * 16;
            const ey = 372 - ((lf * (3 + s * 5) + s * 400) % 430);
            const sz = 1.6 + s * 2.4;
            const warm = i % 2 === 0;
            return <div key={`emb${i}`} style={{ position: "absolute", left: ex, top: ey, width: sz, height: sz, borderRadius: "50%", background: warm ? "rgba(255,150,90,0.9)" : "rgba(150,214,255,0.85)", opacity: (0.3 + s * 0.4) * (0.6 + charge * 0.5), filter: "blur(1px)", boxShadow: `0 0 6px ${warm ? "rgba(255,130,70,0.7)" : "rgba(130,200,255,0.7)"}`, mixBlendMode: "screen", zIndex: 2, pointerEvents: "none" }} />;
          })}

          {/* ARENA BANNERS draped from the upper gallery (warm faction left, cool faction right, subtle sway) */}
          {Array.from({ length: 6 }, (_, i) => {
            const warm = i < 3;
            const bx = warm ? 40 + i * 92 : 700 + (i - 3) * 92;
            const sway = Math.sin((lf + i * 9) / 22) * 3;
            const len = 208 + seed(i + 7) * 64;
            return <div key={`ban${i}`} style={{ position: "absolute", left: bx, top: 118, width: 46, height: len, transform: `rotate(${sway}deg)`, transformOrigin: "50% 0%", filter: "blur(1.2px)", zIndex: 2, pointerEvents: "none", opacity: 0.66 }}>
              <div style={{ position: "absolute", inset: 0, background: warm ? "linear-gradient(180deg, rgba(150,40,36,0.85), rgba(70,18,16,0.7))" : "linear-gradient(180deg, rgba(30,86,120,0.85), rgba(14,40,66,0.7))", clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", left: 15, top: 26, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${warm ? "rgba(255,180,120,0.6)" : "rgba(150,220,255,0.6)"}` }} />
            </div>;
          })}

          {/* ===== CROWD-VOID: tiered stadium silhouettes ringing the arena (FAR plane, deep DoF) ===== */}
          <div style={{ position: "absolute", left: -40, top: 96, width: 1092, height: 300, filter: "blur(3.4px)", transform: `translate(${-shx * 0.3}px,0) scale(${1 + zoomCharge * 0.02})`, zIndex: 2, pointerEvents: "none" }}>
            {/* stand banks - dark bowl shapes rising at the sides */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 360, height: 300, background: "radial-gradient(120% 90% at 20% 40%, rgba(28,10,14,0.96), rgba(10,8,14,0.4) 70%, transparent)", transform: "skewY(6deg)" }} />
            <div style={{ position: "absolute", right: 0, top: 0, width: 360, height: 300, background: "radial-gradient(120% 90% at 80% 40%, rgba(10,18,26,0.96), rgba(8,10,16,0.4) 70%, transparent)", transform: "skewY(-6deg)" }} />
            <div style={{ position: "absolute", left: 300, top: -10, width: 492, height: 210, background: "radial-gradient(100% 120% at 50% 0%, rgba(8,10,16,0.9), transparent 72%)" }} />
            {/* glinting EYES in the void - warm on villain side, cool on hero side, they GLINT on the hit */}
            {Array.from({ length: 46 }, (_, i) => {
              const s = seed(i + 11);
              const s2 = seed(i + 31);
              const side = i % 2;                       // 0 villain-left, 1 hero-right
              const ex = side === 0 ? 30 + s * 320 : 720 + s * 320;
              const ey = 40 + s2 * 210 - Math.abs(ex - 546) * 0.12;   // dip toward the pit
              const warm = side === 0;
              const tw = 0.4 + Math.abs(Math.sin((lf + i * 5) / 6)) * 0.6;  // per-eye twinkle
              const op = Math.min(0.95, eyeGlint * tw);
              const sz = 2.4 + s * 2.2;
              return <div key={`eye${i}`} style={{ position: "absolute", left: ex, top: ey, width: sz, height: sz, borderRadius: "50%", background: warm ? "rgba(255,150,96,1)" : "rgba(150,224,255,1)", opacity: op, boxShadow: `0 0 ${5 + flash * 10}px ${warm ? "rgba(255,120,70,0.9)" : "rgba(120,210,255,0.9)"}`, mixBlendMode: "screen" }} />;
            })}
          </div>

          {/* ===== SPOTLIT CIRCULAR PLATFORM - the raised combat dais the fighters stand on ===== */}
          <div style={{ position: "absolute", left: CX - 430, top: 552, width: 860, height: 214, zIndex: 3, pointerEvents: "none", transform: `translate(${-shx * 0.45}px,0)` }}>
            {/* dais slab */}
            <div style={{ position: "absolute", left: 40, top: 40, width: 780, height: 150, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 34%, rgba(60,58,70,0.9), rgba(20,20,28,0.85) 60%, rgba(8,8,12,0.9))", boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 8px 30px rgba(255,240,210,0.06)" }} />
            {/* bright rim ring lit by the reactor glow */}
            <div style={{ position: "absolute", left: 20, top: 24, width: 820, height: 176, borderRadius: "50%", border: "3px solid rgba(127,232,255,0.5)", boxShadow: `0 0 ${20 + flash * 40}px rgba(127,232,255,${0.4 + flash * 0.5})`, opacity: 0.8 }} />
            {/* concentric gold inlay ring */}
            <div style={{ position: "absolute", left: 150, top: 70, width: 560, height: 96, borderRadius: "50%", border: "2px solid rgba(231,178,76,0.35)" }} />
            {/* reflective sheen sweeping the polished dais */}
            <div style={{ position: "absolute", left: 60, top: 60, width: 740, height: 110, borderRadius: "50%", background: `linear-gradient(100deg, transparent 30%, rgba(214,244,255,${0.1 + flash * 0.25}) 50%, transparent 70%)`, mixBlendMode: "screen", filter: "blur(4px)" }} />
          </div>

          {/* drifting volumetric HAZE blobs (warm vs cool) - ATMOS drift */}
          <div style={{ position: "absolute", left: CX - 360 + Math.sin(lf / 22) * 22, top: 120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,110,80,0.17), transparent 66%)", filter: "blur(32px)", zIndex: 3, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: CX - 40 - Math.sin(lf / 26) * 22, top: 200, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,200,255,0.15), transparent 66%)", filter: "blur(32px)", zIndex: 3, pointerEvents: "none" }} />

          {/* ================= PLANE C - MIDGROUND: ENERGY FLOOR grid the fighters stand on ================= */}
          <div style={{ position: "absolute", left: 0, top: 560, width: 1012, height: 232, transform: `translate(${-shx * 0.5}px,0)`, zIndex: 4, pointerEvents: "none", overflow: "hidden" }}>
            {/* base wash - cool cyan bleeding to warm under the villain side */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent, rgba(20,40,60,0.5) 40%, rgba(10,16,26,0.85))`, opacity: 0.9 }} />
            {/* perspective grid lines converging toward the clash */}
            {Array.from({ length: 9 }, (_, i) => {
              const gy = i / 8;
              const y = gy * gy * 232;
              const spread = 40 + gy * 900;
              const glow = floorPulse * (0.25 + gy * 0.6);
              return <div key={`fh${i}`} style={{ position: "absolute", left: 506 - spread / 2, top: y, width: spread, height: 2, background: `rgba(120,210,255,${Math.min(0.7, glow)})`, boxShadow: `0 0 ${6 + flash * 14}px rgba(120,210,255,${glow})` }} />;
            })}
            {Array.from({ length: 11 }, (_, i) => {
              const t = (i - 5) / 5;
              const glow = floorPulse * 0.35;
              return <div key={`fv${i}`} style={{ position: "absolute", left: 506, top: 0, width: 2, height: 232, background: `rgba(120,210,255,${Math.min(0.5, glow)})`, transformOrigin: "50% 0%", transform: `rotate(${t * 30}deg)`, boxShadow: `0 0 5px rgba(120,210,255,${glow * 0.8})` }} />;
            })}
            {/* hot pool of light right under the impact point */}
            <div style={{ position: "absolute", left: CX - 260, top: -30, width: 520, height: 180, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,244,220,${0.2 + flash * 0.6}), rgba(127,232,255,${0.14 + flash * 0.3}) 40%, transparent 70%)`, filter: "blur(6px)", mixBlendMode: "screen" }} />
          </div>

          {/* backlight bloom separating the fighters from the dark */}
          <div style={{ position: "absolute", left: CX - 360, top: CY - 320, width: 720, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.24), rgba(127,232,255,0.11) 42%, transparent 68%)", filter: "blur(24px)", zIndex: 5, pointerEvents: "none" }} />

          {/* ===== OVERHEAD SPOTLIGHT RIG - volumetric cones stabbing down onto the dais (intensify to impact) ===== */}
          {Array.from({ length: 5 }, (_, i) => {
            const rigX = 180 + i * 168;
            const warm = i < 2;
            const cool = i > 2;
            const spin = Math.sin((lf + i * 12) / 20) * 3;
            const op = 0.12 + charge * 0.12 + flash * 0.4;
            const col = warm ? "rgba(255,180,120," : cool ? "rgba(140,210,255," : "rgba(255,244,220,";
            return <div key={`spot${i}`} style={{ position: "absolute", left: rigX, top: -40, width: 30, height: 700, background: `linear-gradient(180deg, ${col}${op}) 0%, ${col}${(op * 0.5).toFixed(3)}) 40%, ${col}0) 88%)`, transform: `translateX(${((CX - rigX) * 0.14).toFixed(1)}px) rotate(${((rigX - CX) / 70 + spin).toFixed(2)}deg)`, transformOrigin: "50% 0%", clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0% 100%)", filter: "blur(6px)", mixBlendMode: "screen", zIndex: 6, pointerEvents: "none" }} />;
          })}

          {/* complementary side washes - WARM KEY villain-side / COOL RIM hero-side, deepen into the hit */}
          <div style={{ position: "absolute", left: -80, top: 40, width: 520, height: 800, background: `linear-gradient(120deg, rgba(255,70,58,${0.20 + charge * 0.12}), transparent 58%)`, filter: "blur(18px)", transform: "skewX(-8deg)", zIndex: 6, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -80, top: 40, width: 520, height: 800, background: `linear-gradient(240deg, rgba(127,232,255,${0.20 + charge * 0.12}), transparent 58%)`, filter: "blur(18px)", transform: "skewX(8deg)", zIndex: 6, pointerEvents: "none" }} />

          {/* VOLUMETRIC GOD-RAYS raking down from a top light source (intensify to impact) */}
          {Array.from({ length: 6 }, (_, i) => {
            const s = seed(i + 3);
            const ang = 66 + i * 10 + s * 4;
            const w = 40 + s * 70;
            const op = (0.10 + charge * 0.15 + flash * 0.5) * (0.6 + s * 0.5);
            return <div key={`gr${i}`} style={{ position: "absolute", left: CX, top: -60, width: 900, height: w, marginTop: -w / 2, background: `linear-gradient(90deg, rgba(255,232,180,${op}), rgba(255,232,180,0) 72%)`, transform: `rotate(${ang}deg)`, transformOrigin: "0 50%", filter: "blur(10px)", mixBlendMode: "screen", zIndex: 7, pointerEvents: "none" }} />;
          })}

          {/* CONVERGING speed streaks - everything rushes into the collision, gone on impact */}
          {Array.from({ length: 22 }, (_, i) => {
            const a = (i / 22) * Math.PI * 2 + seed(i) * 0.3;
            const rr = 580 - charge * 450 - seed(i + 1) * 40;
            const len = 60 + charge * 200 + seed(i + 2) * 60;
            const op = charge * 0.58 * (1 - over(lf, HIT, 4));
            if (op <= 0.03) return null;
            const x = CX + Math.cos(a) * rr;
            const y = CY + Math.sin(a) * rr;
            const deg = (a * 180) / Math.PI + 180;
            return <div key={`cv${i}`} style={{ position: "absolute", left: x, top: y, width: len, height: 2 + seed(i) * 2, marginTop: -1, background: i % 3 === 0 ? "linear-gradient(90deg, rgba(255,86,72,0), rgba(255,86,72,0.9))" : "linear-gradient(90deg, rgba(214,244,255,0), rgba(214,244,255,0.9))", opacity: op, transform: `rotate(${deg}deg)`, transformOrigin: "0 50%", filter: "blur(0.6px)", zIndex: 8, pointerEvents: "none" }} />;
          })}

          {/* ground contact shadow pooled under the clash */}
          <div style={{ position: "absolute", left: CX - 220, top: 672, width: 440, height: 46, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", filter: "blur(8px)", zIndex: 9, pointerEvents: "none" }} />

          {/* ===== battle DEBRIS + rubble scattered at the dais edge (rattles on the shock) ===== */}
          {Array.from({ length: 10 }, (_, i) => {
            const s = seed(i + 71);
            const side = i % 2 ? 1 : -1;
            const dx = side * (150 + s * 260);
            const jolt = sd > 0 ? Math.sin((lf - HIT) * 4 + i) * sd * 3 : 0;
            const sz = 10 + s * 26;
            return <div key={`deb${i}`} style={{ position: "absolute", left: CX + dx, top: 690 + s * 20 + jolt, width: sz, height: sz * 0.7, background: "linear-gradient(150deg, rgba(48,44,52,0.95), rgba(16,14,20,0.9))", borderRadius: 3, transform: `rotate(${s * 80}deg)`, boxShadow: "0 4px 8px rgba(0,0,0,0.5)", zIndex: 10, pointerEvents: "none" }} />;
          })}

          {/* red-alert cast rising as the droid closes (screen goes hostile) */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 100% at ${(CX / 1012) * 100}% 54%, rgba(255,70,58,${redAlert}) 0%, transparent 66%)`, zIndex: 12, pointerEvents: "none" }} />

          {/* drifting PARTICULATE motes rising through the arena */}
          {Array.from({ length: 18 }, (_, i) => {
            const s = seed(i + 9);
            const px = 60 + s * 900 + Math.sin((lf + i * 7) / 16) * 10;
            const py = 720 - ((lf * (7 + s * 10) + s * 760) % 780);
            const sz = 2 + s * 4;
            const op = (0.2 + s * 0.3) * (0.5 + charge * 0.5) + flash * 0.3;
            return <div key={`pt${i}`} style={{ position: "absolute", left: px, top: py, width: sz, height: sz, borderRadius: "50%", background: i % 4 === 0 ? "rgba(255,120,86,0.9)" : "rgba(214,244,255,0.9)", opacity: Math.min(0.85, op), filter: "blur(0.6px)", boxShadow: "0 0 6px rgba(214,244,255,0.6)", mixBlendMode: "screen", zIndex: 14, pointerEvents: "none" }} />;
          })}

          {/* ================= PLANE B - THE FIGHTERS (sharp hero plane; freeze-locked + contrast pop on impact) ================= */}
          <div style={{ position: "absolute", inset: 0, filter: contrastFlt, zIndex: 20 }}>
            {/* villain speed-ghosts trailing back to the left */}
            {lf < HIT - 1 && (
              <>
                <div style={{ position: "absolute", inset: 0, opacity: app * 0.16, filter: "blur(2px)", pointerEvents: "none" }}>
                  <Generic9000 lf={vlf} size={vSize} left={vLeft - 70} top={vTop + 6} pose="attack" menace={1} flip={1} z={28} />
                </div>
                <div style={{ position: "absolute", inset: 0, opacity: app * 0.26, filter: "blur(1px)", pointerEvents: "none" }}>
                  <Generic9000 lf={vlf} size={vSize} left={vLeft - 34} top={vTop + 3} pose="attack" menace={1} flip={1} z={29} />
                </div>
                {/* hero speed-ghosts trailing back to the right (he is CHARGING too) */}
                <div style={{ position: "absolute", inset: 0, opacity: app * 0.16, filter: "blur(2px)", pointerEvents: "none" }}>
                  <IronClaude lf={vlf} size={hSize} left={hLeft + 64} top={hTop + 4} pose="charge" core={1} flip={-1} z={28} />
                </div>
                <div style={{ position: "absolute", inset: 0, opacity: app * 0.24, filter: "blur(1px)", pointerEvents: "none" }}>
                  <IronClaude lf={vlf} size={hSize} left={hLeft + 30} top={hTop + 2} pose="charge" core={1} flip={-1} z={29} />
                </div>
              </>
            )}
            {/* GENERIC-9000 - red-alert, charging in from the left (still POWERFUL) */}
            <Generic9000 lf={vlf} size={vSize} left={vLeft} top={vTop} pose="attack" menace={1} flip={1} z={30} />
            {/* IRON CLAUDE - reactor FULL, driving in and PUNCHING (the active protagonist) */}
            <IronClaude lf={vlf} size={hSize} left={hLeft} top={hTop} pose={heroPose} core={1} flip={-1} z={32} />
          </div>

          {/* DUST kick blasting up off the floor at the point of contact */}
          {lf >= HIT && lf < HIT + 12 && Array.from({ length: 12 }, (_, i) => {
            const p = (lf - HIT) / 12;
            const s = seed(i + 21);
            const dir = i % 2 ? 1 : -1;
            const dx = dir * (30 + s * 220) * p;
            const dy = -20 - s * 60 * p + p * p * 90;         // up then settle
            const sz = 40 + s * 70 + p * 90;
            return <div key={`dust${i}`} style={{ position: "absolute", left: CX + dx - sz / 2, top: 600 + dy - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, rgba(198,178,150,${(1 - p) * 0.4}), transparent 70%)`, filter: "blur(5px)", zIndex: 36, pointerEvents: "none" }} />;
          })}

          {/* SPARKS spraying off the punch */}
          {lf >= HIT && lf < HIT + 10 && Array.from({ length: 16 }, (_, i) => {
            const p = (lf - HIT) / 10;
            const a = seed(i + 41) * 6.283;
            const spd = 60 + seed(i + 51) * 260;
            const x = CX + Math.cos(a) * spd * p;
            const y = CY + Math.sin(a) * spd * p + p * p * 60;   // gravity droop
            const len = 6 + seed(i) * 14;
            return <div key={`spk${i}`} style={{ position: "absolute", left: x, top: y, width: len, height: 2.5, marginTop: -1, background: i % 3 === 0 ? "rgba(255,120,86,1)" : "rgba(255,244,210,1)", opacity: (1 - p) * 0.95, transform: `rotate(${(a * 180) / Math.PI}deg)`, transformOrigin: "0 50%", boxShadow: "0 0 6px rgba(255,220,160,0.9)", mixBlendMode: "screen", zIndex: 37, pointerEvents: "none" }} />;
          })}

          {/* collision CORE disc igniting where the punch lands */}
          {coreFlare > 0.02 && (
            <div style={{ position: "absolute", left: CX - 160, top: CY - 160, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,248,236,${Math.min(0.95, coreFlare)}) 0%, rgba(127,232,255,${coreFlare * 0.5}) 34%, rgba(255,120,86,${coreFlare * 0.3}) 55%, transparent 72%)`, filter: "blur(4px)", mixBlendMode: "screen", transform: `scale(${0.6 + coreFlare * 0.8})`, zIndex: 38, pointerEvents: "none" }} />
          )}

          {/* HARD SHOCK RING - a flat blast wave skimming the floor clear across the arena */}
          {shockRing > 0 && shockRing < 1 && (
            <div style={{ position: "absolute", left: CX, top: CY + 60, width: 300, height: 120, marginLeft: -150, marginTop: -60, borderRadius: "50%", border: "5px solid rgba(214,244,255,0.9)", transform: `scale(${0.2 + shockRing * 5.4})`, opacity: (1 - shockRing) * 0.9, boxShadow: "0 0 50px rgba(127,232,255,0.9), inset 0 0 30px rgba(127,232,255,0.5)", mixBlendMode: "screen", zIndex: 39, pointerEvents: "none" }} />
          )}

          {/* SHOCKWAVE rings ripping out of the clash */}
          <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none" }}>
            {ring(swp, "rgba(127,232,255,0.95)", 6)}
            {ring(swp2, "rgba(255,120,86,0.9)", 4)}
          </div>

          {/* radial impact spokes */}
          {spokes > 0 && spokes < 1 && Array.from({ length: 18 }, (_, i) => {
            const a = (i / 18) * 360 + 6;
            const len = 46 + spokes * 258 * (0.7 + seed(i) * 0.6);
            return <div key={`sp${i}`} style={{ position: "absolute", left: CX, top: CY, width: len, height: 4, marginTop: -2, background: i % 2 ? "linear-gradient(90deg, rgba(255,240,200,0.95), transparent)" : "linear-gradient(90deg, rgba(214,244,255,0.95), transparent)", opacity: (1 - spokes) * 0.85, transform: `rotate(${a}deg)`, transformOrigin: "0 50%", zIndex: 41, pointerEvents: "none", filter: "blur(0.5px)" }} />;
          })}

          {/* comic STARBURST clash flare */}
          {starP > 0 && starP < 1 && (
            <svg width={320} height={320} viewBox="-160 -160 320 320" style={{ position: "absolute", left: CX - 160, top: CY - 160, zIndex: 44, pointerEvents: "none", transform: `scale(${0.3 + starP * 2.6}) rotate(${starP * 40}deg)`, opacity: (1 - starP) * 0.98, mixBlendMode: "screen" }}>
              <polygon points={star} fill="#FFF6E2" opacity={0.9} />
              <polygon points={star} fill="none" stroke="#FFB86C" strokeWidth={5} transform="scale(0.66)" />
            </svg>
          )}

          {/* GAG - the droid spouts AI-slop mid-charge; the taunt gets OBLITERATED on impact */}
          {lf < HIT && (() => {
            const bo = over(lf, 2, 5) * (1 - over(lf, HIT - 3, 3));
            if (bo <= 0.03) return null;
            return (
              <div style={{ position: "absolute", left: vLeft + vSize * 0.46, top: vTop - 26, opacity: bo, transform: `rotate(-5deg) scale(${0.8 + over(lf, 2, 5) * 0.2})`, transformOrigin: "0 100%", zIndex: 46 }}>
                <div style={{ position: "relative", padding: "10px 18px", background: "#F7F3EA", border: "4px solid #12181A", borderRadius: 16, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: 0.5, color: "#20272B", boxShadow: "0 8px 20px -6px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
                  AS AN AI...
                  <div style={{ position: "absolute", left: 16, bottom: -18, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "18px solid transparent", borderTop: "20px solid #12181A" }} />
                  <div style={{ position: "absolute", left: 19, bottom: -12, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "13px solid transparent", borderTop: "14px solid #F7F3EA" }} />
                </div>
              </div>
            );
          })()}
          {/* taunt SHARDS blasting apart at impact */}
          {lf >= HIT && lf < HIT + 9 && Array.from({ length: 7 }, (_, i) => {
            const p = (lf - HIT) / 9;
            const ang = seed(i) * 6.283;
            const dist = p * (120 + seed(i + 3) * 140);
            const x = 300 + Math.cos(ang) * dist;
            const y = 240 + Math.sin(ang) * dist - p * 20;
            return <div key={`shd${i}`} style={{ position: "absolute", left: x, top: y, width: 20 + seed(i + 1) * 20, height: 12 + seed(i + 2) * 14, background: "#F7F3EA", border: "3px solid #12181A", borderRadius: 3, opacity: (1 - p) * 0.95, transform: `rotate(${ang * 90 + p * 260}deg)`, zIndex: 46, pointerEvents: "none" }} />;
          })}

          {/* ================= PLANE A - FOREGROUND: DoF bokeh + streaking dust/sparks (heavy blur, extra parallax) ================= */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${shx * 0.9 + camX * 0.6}px,${shy * 0.9}px)`, zIndex: 42, pointerEvents: "none" }}>
            {/* soft blurred bokeh orbs riding the panel edges */}
            {Array.from({ length: 6 }, (_, i) => {
              const s = seed(i + 5);
              const bx = (i % 2 === 0 ? -50 : 900) + s * 150;
              const by = 100 + ((lf * (7 + s * 9) + s * 600) % 780);
              const sz = 70 + s * 100;
              const op = 0.18 + s * 0.14 + charge * 0.14;
              return <div key={`bk${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz, borderRadius: "50%", background: i % 2 ? "radial-gradient(circle, rgba(255,180,110,0.7), transparent 70%)" : "radial-gradient(circle, rgba(120,210,255,0.7), transparent 70%)", filter: "blur(11px)", opacity: op, mixBlendMode: "screen" }} />;
            })}
            {/* fast blurred FG dust streaks raked by the charge, spraying on the hit */}
            {Array.from({ length: 8 }, (_, i) => {
              const s = seed(i + 61);
              const dir = i % 2 ? 1 : -1;
              const fx = CX + dir * (200 + s * 300) - charge * dir * 120 + post * dir * 160;
              const fy = 150 + s * 520 + Math.sin((lf + i * 9) / 12) * 14;
              const len = 90 + s * 130 + charge * 60;
              const op = (0.14 + s * 0.2) * (0.5 + charge * 0.6) + flash * 0.35;
              return <div key={`fgd${i}`} style={{ position: "absolute", left: fx, top: fy, width: len, height: 3 + s * 3, marginTop: -1.5, background: i % 3 === 0 ? "linear-gradient(90deg, rgba(255,150,96,0), rgba(255,150,96,0.85))" : "linear-gradient(90deg, rgba(214,244,255,0), rgba(214,244,255,0.85))", opacity: Math.min(0.75, op), transform: `rotate(${dir < 0 ? 180 : 0}deg)`, transformOrigin: "0 50%", filter: "blur(3px)", mixBlendMode: "screen" }} />;
            })}
          </div>

          {/* freeze-flash / white shock on contact */}
          {(flash > 0 || freeze > 0) && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${(CX / 1012) * 100}% ${(CY / 792) * 100}%, rgba(255,248,236,${Math.min(0.85, flash * 0.5 + freeze * 0.6)}), transparent ${58 - freeze * 20}%)`, zIndex: 48, pointerEvents: "none" }} />}

          {/* master COMPLEMENTARY color grade (warm villain-side to cool hero-side) */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(255,150,70,0.5) 0%, rgba(20,20,30,0) 45%, rgba(60,200,255,0.45) 100%)", mixBlendMode: "soft-light", zIndex: 56, pointerEvents: "none" }} />

          {/* cinematic vignette (deepens as the camera pushes in) */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 130% at ${(CX / 1012) * 100}% 46%, transparent 40%, rgba(4,6,10,${0.34 + charge * 0.18}) 100%)`, zIndex: 58, pointerEvents: "none" }} />

          {/* film GRAIN (desaturated turbulence, gently crawling) */}
          <svg viewBox="0 0 1012 792" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, width: "120%", height: "120%", transform: `translate(${-(lf % 6) * 3}px,${-(lf % 4) * 3}px)`, mixBlendMode: "overlay", opacity: 0.42, zIndex: 60, pointerEvents: "none" }}>
            <filter id="s6grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="1012" height="792" filter="url(#s6grain)" />
          </svg>

          {/* running gag - the unbuilt gauntlets RATTLE in the corner from the shock */}
          <div style={{ position: "absolute", inset: 0, transform: sd > 0 ? `translate(${Math.sin(lf * 5) * sd * 5}px, ${Math.cos(lf * 6) * sd * 4}px)` : "none", zIndex: 22, pointerEvents: "none" }}>
            <CornerGauntlets lf={lf} wake={0.7} />
          </div>
        </div>
      );
    })()}
  </Panel>
);

const S7: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="jarvis // VOICE-MATCH">
    {(() => {
      // ================= S7 - FIRST BLOW: YOUR VOICE (OVER-THE-SHOULDER dolly down the beam corridor) =================
      // Re-shot cinematically: camera rides BEHIND the hero (lower-left FG), looking PAST his raised
      // repulsor DOWN a cyan beam-corridor across a vast arena at the tiny, distant droid. Five parallax
      // planes drift at their own rate; DOF blurs the FG motes and the FAR villain. Warm key on the hero
      // vs cool cyan rim down the corridor; visible god-rays; red alarm ATMOS vs cyan beam bloom + haze.
      // The hero BLASTS the voice-waveform beam, "your voice" phase-locks, first blow drives into
      // GENERIC-9000 (menace 1->0.6, coughs AI-slop), screen SHAKES on the blast. Escalates the whole time.
      const PI = Math.PI;
      const CYc = "127,232,255";       // hero repulsor cyan (cool rim)
      const CLc = "210,114,78";        // YOUR voice clay (warm key)
      const GYc = "150,158,163";       // generic grey
      const WKc = "255,176,104";       // warm key wash

      // ---- corridor geometry: foreground emitter E -> distant villain vanishing point V ----
      const E = { x: 356, y: 604 };
      const V = { x: 762, y: 366 };
      const dx = V.x - E.x, dy = V.y - E.y;
      const L = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / L, uy = dy / L;          // unit dir E->V
      const nx = -uy, ny = ux;                 // unit normal (perp)
      const mid = { x: E.x + dx * 0.5, y: E.y + dy * 0.5 };

      // ---- story drivers (semantics preserved) ----
      const lock = ramp(lf, 36, 74);                              // your-voice identity match
      const push = over(lf, 68, 58, Easing.inOut(Easing.cubic));  // hero overpowers
      const press = over(lf, 16, 30) * (1 - over(lf, 62, 12));    // villain presses, releases at lock
      const wob = Math.sin(lf / 2.4) * 0.012 * (1 - push * 0.7);  // grinding stalemate tremor (t-units)
      const clashOn = over(lf, 16, 6);
      const clashPulse = clashOn * (2 + 2 * Math.abs(Math.sin(lf / 3)));
      const blow = over(lf, 106, 12, Easing.out(Easing.cubic));   // the blow lands
      const blowRecoil = lf >= 106 ? Math.max(0, 1 - (lf - 106) / 26) : 0;
      const flash = lf >= 106 ? Math.max(0, 1 - (lf - 106) / 8) : 0;
      const winFlood = over(lf, 130, 42);                         // light floods the corridor as he wins

      // clash param along corridor (0=hero, 1=villain): villain shoves it back, lock+blow drive it in
      const ct = Math.max(0.12, Math.min(0.985, 0.46 - press * 0.13 + push * 0.44 + wob + blow * 0.30));
      const Cx = E.x + dx * ct, Cy = E.y + dy * ct;
      const persp = 1 - ct * 0.42;                                // clash shrinks as it drives into depth

      // ---- villain (FAR plane, tiny -> epic scale contrast) ----
      const villPose = lf < 106 ? "attack" : "stagger";
      const menace = interpolate(lf, [106, 150], [1, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const villTf = `translate(${blow * 34 + Math.sin(lf * 3.1) * blowRecoil * 4}px, ${-blow * 13}px) rotate(${blow * 11}deg)`;
      const villBlur = Math.max(0.7, 3.6 - over(lf, 0, 172) * 2.5).toFixed(2);   // sharpens as we push in

      // ---- CAMERA: over-the-shoulder DOLLY along the beam toward V + clash/blow shake + grind tremor ----
      const dolly = over(lf, 0, 172, Easing.inOut(Easing.cubic));
      const kick = (lf >= 18 ? Math.max(0, 1 - (lf - 18) / 8) : 0) * 0.02 + (lf >= 106 ? Math.max(0, 1 - (lf - 106) / 10) : 0) * 0.04;
      const grind = (lf > 20 && lf < 128) ? 1.6 * Math.abs(Math.sin(lf / 2.3)) * (0.45 + 0.55 * (1 - push)) : 0;
      const clashShake = lf >= 16 ? Math.max(0, 6.5 * (1 - (lf - 16) / 14)) : 0;
      const blowShake = lf >= 106 ? Math.max(0, 12 * (1 - (lf - 106) / 18)) : 0;   // hard screen-shake on blast
      const shk = grind + clashShake + blowShake;
      const camScale = 1.0 + dolly * 0.19 + kick;
      const camRot = (Math.sin(lf * 0.03) * 0.35) - blow * 0.5;   // subtle handheld roll
      const camera = `translate(${((seed(lf) - 0.5) * shk).toFixed(2)}px, ${((seed(lf + 7) - 0.5) * shk * 0.8).toFixed(2)}px) scale(${camScale.toFixed(3)}) rotate(${camRot.toFixed(3)}deg)`;

      // ---- one shared waveform so hero + clay overlap EXACTLY once phase & baseline match ----
      const waveShp = (s: number, ph: number) =>
        Math.sin(s * 0.028 + ph) * 0.60 + Math.sin(s * 0.049 - ph * 1.4) * 0.27 + Math.sin(s * 0.083 + ph * 0.7) * 0.13;
      const corridorPath = (t0: number, t1: number, ph: number, ampN: number, ampF: number, bias: number) => {
        const seg = Math.max(3, Math.round(Math.abs(t1 - t0) * 52));
        let d = "";
        for (let i = 0; i <= seg; i++) {
          const t = t0 + (t1 - t0) * (i / seg);
          const bx = E.x + dx * t, by = E.y + dy * t;
          const amp = ampN * (1 - t) + ampF * t;
          const disp = amp * waveShp(t * L, ph) + bias;
          d += (i === 0 ? "M" : "L") + (bx + nx * disp).toFixed(1) + " " + (by + ny * disp).toFixed(1) + " ";
        }
        return d;
      };
      const ribbonPath = (t0: number, t1: number, wN: number, wF: number) => {
        const seg = 26; const top: string[] = []; const bot: string[] = [];
        for (let i = 0; i <= seg; i++) {
          const t = t0 + (t1 - t0) * (i / seg); const bx = E.x + dx * t, by = E.y + dy * t; const w = (wN * (1 - t) + wF * t) / 2;
          top.push((i === 0 ? "M" : "L") + (bx + nx * w).toFixed(1) + " " + (by + ny * w).toFixed(1));
          bot.push((bx - nx * w).toFixed(1) + " " + (by - ny * w).toFixed(1));
        }
        return top.join(" ") + " L" + bot.reverse().join(" L") + " Z";
      };

      const hph = lf * 0.22;
      const vph = -lf * 0.2;
      const hampN = 30 + push * 8 + clashPulse * 0.7, hampF = 7 + push * 2;
      const cph = hph + (1 - lock) * PI;               // opposite phase -> identical at lock
      const cbias = (1 - lock) * 44;                   // clay slides perpendicular onto hero river
      const vFlick = lf >= 106 ? 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.9)) : 1;
      const vOn = (1 - over(lf, 106, 22) * 0.72) * vFlick;

      const heroD = corridorPath(0, ct, hph, hampN, hampF, 0);
      const clayD = corridorPath(0, ct, cph, hampN, hampF, cbias);
      const villD = corridorPath(ct, 1, vph, 26, 6, 0);

      const bright = 0.82 + 0.18 * lock + clashOn * 0.12 * (0.5 + 0.5 * Math.sin(lf / 3)) + winFlood * 0.1;
      const flareR = (34 + push * 42 + clashPulse * 2) * persp;

      // ---- HERO ACTION: strain in, recoil on fire, lunge on the blow (+ dolly parallax past him) ----
      const fire = Math.max(0, Math.sin(lf / 3));
      const recoil = clashOn * fire * 5 * (1 - push * 0.5);
      const strain = over(lf, 18, 54);
      const heroX = -dolly * 54 + strain * 9 + blow * 20 - recoil * 7;   // HERO plane drifts opposite the push
      const heroY = dolly * 34 - strain * 6 - blow * 8 + recoil * 4;
      const heroRot = -1.6 + strain * 4.2 - recoil * 0.6 - blow * 1.6;
      const heroScale = 1 + dolly * 0.13;
      const heroTf = `translate(${heroX.toFixed(2)}px, ${heroY.toFixed(2)}px) rotate(${heroRot.toFixed(2)}deg) scale(${heroScale.toFixed(3)})`;

      const rayBase = Math.atan2(E.y - V.y, E.x - V.x);
      const ringMeet = over(lf, 16, 20, Easing.out(Easing.cubic));
      const ringBlow = over(lf, 106, 24, Easing.out(Easing.cubic));

      // ---- independent parallax drifts (each plane its own rate) ----
      const pFar = -dolly * 14;                 // FAR backdrop barely moves
      const pMid = -dolly * 30;                 // MIDGROUND
      const pAtm = Math.sin(lf * 0.02) * 10;    // ATMOSPHERE sway
      const pArch = -dolly * 9;                 // deep arena architecture (slowest)
      const pGantry = -dolly * 22;              // gantries / catwalks / conduits
      const pFore = -dolly * 48;                // near foreground debris (fastest)
      const alarm = 0.5 + 0.5 * Math.abs(Math.sin(lf / 5));   // red strobe cadence (villain side)
      const alarm2 = 0.5 + 0.5 * Math.abs(Math.sin(lf / 5 + 1.3));

      return (
        <div style={{ position: "absolute", inset: 0, transform: camera, transformOrigin: `${mid.x.toFixed(0)}px ${mid.y.toFixed(0)}px` }}>
          {/* ============ PLANE E - ATMOSPHERE / FAR backdrop: multi-stop furnace + nebula depth (DOF blur) ============ */}
          <div style={{ position: "absolute", inset: -60, zIndex: 1, transform: `translate(${pFar}px, ${(-dolly * 8).toFixed(1)}px) scale(${(1.06 - dolly * 0.02).toFixed(3)})`, background: "radial-gradient(150% 120% at 74% 26%, rgba(38,20,16,0.9) 0%, rgba(12,14,22,0.96) 44%, #05070c 78%)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "blur(10px)", transform: `translate(${pFar}px,0) scale(${(1.04 - dolly * 0.02).toFixed(3)})` }}>
            <Stage lf={lf} energy={0.5 + push * 0.4} hue="cool" grid />
          </div>

          {/* ============ DEEP ARENA ARCHITECTURE - colossal colonnade + tiered stands framing the vanishing point (DOF blur) ============ */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 3, overflow: "visible", filter: "blur(6px)", transform: `translate(${pArch}px, ${(-dolly * 5).toFixed(1)}px) scale(${(1.03 - dolly * 0.015).toFixed(3)})` }}>
            {/* far arena floor line + back wall */}
            <rect x={0} y={288} width={1012} height={132} fill="rgba(14,17,24,0.7)" />
            <rect x={0} y={286} width={1012} height={5} fill={`rgba(${CYc},0.10)`} />
            {/* tiered spectator stands sweeping around the far wall */}
            {Array.from({ length: 4 }, (_, r) => (
              <rect key={`tier${r}`} x={-20} y={196 + r * 24} width={1052} height={15} rx={4}
                fill={`rgba(${r % 2 ? "40,52,60" : "30,40,48"},0.55)`} />
            ))}
            {/* colossal columns receding to V on both sides (perspective spacing) */}
            {Array.from({ length: 6 }, (_, i) => {
              const f = i / 5;                                   // 0 near-left ... 1 far
              const lxTop = 20 + f * (V.x - 20 - 30), lxW = 78 - f * 60;
              const rxTop = 992 - f * (992 - V.x - 30), rxW = 78 - f * 60;
              const topY = 214 + f * 150, botY = 470 - f * 92;
              const op = 0.5 - f * 0.28;
              return (
                <g key={`col${i}`}>
                  <rect x={lxTop} y={topY} width={lxW} height={botY - topY} fill={`rgba(22,28,36,${op.toFixed(2)})`} />
                  <rect x={lxTop} y={topY} width={Math.max(3, lxW * 0.18)} height={botY - topY} fill={`rgba(${CYc},${(0.05 + winFlood * 0.05).toFixed(3)})`} />
                  <rect x={rxTop} y={topY} width={rxW} height={botY - topY} fill={`rgba(22,28,36,${op.toFixed(2)})`} />
                  <rect x={rxTop + rxW - Math.max(3, rxW * 0.18)} y={topY} width={Math.max(3, rxW * 0.18)} height={botY - topY} fill={`rgba(196,90,74,${(0.05 + press * 0.05).toFixed(3)})`} />
                </g>
              );
            })}
            {/* distant hazard chevrons striping the arena floor toward V */}
            {Array.from({ length: 7 }, (_, i) => {
              const g = i / 6; const y = 430 - g * 60; const w = 320 * (1 - g) + 30;
              return <rect key={`chev${i}`} x={V.x - w / 2} y={y} width={w} height={3} fill={`rgba(231,178,76,${(0.05 + 0.05 * (1 - g)).toFixed(3)})`} />;
            })}
          </svg>

          {/* far nebula/skyline glow bands */}
          <div style={{ position: "absolute", left: -40, top: 110, width: 640, height: 620, zIndex: 3, background: `radial-gradient(circle at 34% 60%, rgba(90,217,198,${(0.18 + winFlood * 0.06).toFixed(3)}), transparent 62%)`, filter: "blur(18px)", transform: `translate(${pFar}px,0)` }} />
          <div style={{ position: "absolute", right: -90, top: 70, width: 660, height: 600, zIndex: 3, background: `radial-gradient(circle at 66% 40%, rgba(196,74,58,${(0.24 + press * 0.06).toFixed(3)}), transparent 60%)`, filter: "blur(18px)", transform: `translate(${(pFar * 0.6).toFixed(1)}px,0)` }} />

          {/* ============ VILLAIN-SIDE RED ALARM STROBE PANELS bolted along the far right wall ============ */}
          {[{ x: 830, y: 236, w: 96, h: 20, a: alarm }, { x: 872, y: 300, w: 78, h: 16, a: alarm2 }, { x: 812, y: 350, w: 66, h: 14, a: alarm }].map((p, i) => (
            <div key={`strobe${i}`} style={{ position: "absolute", left: p.x, top: p.y, width: p.w, height: p.h, zIndex: 4, borderRadius: 4, background: `rgba(255,70,58,${(0.14 + 0.42 * p.a * (1 - winFlood)).toFixed(3)})`, boxShadow: `0 0 ${16 + 22 * p.a}px rgba(255,70,58,${(0.4 * p.a * (1 - winFlood)).toFixed(3)})`, filter: "blur(1px)", transform: `translate(${pArch}px,0)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          ))}

          {/* red ALARM pulse washing the far arena (cool corridor vs warm alarm) */}
          <div style={{ position: "absolute", right: -40, top: 150, width: 520, height: 460, zIndex: 4, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,72,58,${(0.10 + 0.10 * Math.abs(Math.sin(lf / 5)) * (1 - winFlood)).toFixed(3)}) 0%, transparent 66%)`, filter: "blur(20px)", mixBlendMode: "screen", pointerEvents: "none" }} />

          {/* ============ CRACKLING ENERGY CONDUITS - cables + arcing power lines running the arena walls (GANTRY plane) ============ */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 5, overflow: "visible", transform: `translate(${pGantry}px,0)` }}>
            {/* slack conduit cables draping down both sides */}
            {[{ x0: 30, x1: 250, y0: 250, sag: 66, c: CYc }, { x0: 60, x1: 300, y0: 320, sag: 52, c: CYc }, { x0: 760, x1: 980, y0: 240, sag: 60, c: "196,90,74" }, { x0: 720, x1: 964, y0: 316, sag: 48, c: "196,90,74" }].map((cb, i) => (
              <path key={`cab${i}`} d={`M${cb.x0} ${cb.y0} Q${(cb.x0 + cb.x1) / 2} ${cb.y0 + cb.sag} ${cb.x1} ${cb.y0 + 12}`} fill="none" stroke={`rgba(${cb.c},${(0.16 + winFlood * 0.06).toFixed(3)})`} strokeWidth={3} strokeLinecap="round" />
            ))}
            {/* energized conduit runs on the near walls with travelling charge nodes */}
            {[{ y: 470, c: CYc }, { y: 540, c: CYc }].map((rn, r) => (
              <line key={`condL${r}`} x1={-10} y1={rn.y} x2={190} y2={rn.y - 44} stroke={`rgba(${rn.c},0.18)`} strokeWidth={2.4} />
            ))}
            {[{ y: 470 }, { y: 540 }].map((rn, r) => (
              <line key={`condR${r}`} x1={1022} y1={rn.y} x2={840} y2={rn.y - 40} stroke={`rgba(196,90,74,0.16)`} strokeWidth={2.4} />
            ))}
            {/* arcing charge sparks travelling the conduits */}
            {Array.from({ length: 6 }, (_, i) => {
              const t = (seed(i * 2.3) + lf * (0.012 + seed(i) * 0.01)) % 1;
              const leftSide = i % 2 === 0;
              const px = leftSide ? -10 + t * 200 : 1022 - t * 182;
              const py = leftSide ? 470 - t * 44 : 470 - t * 40;
              const c = leftSide ? CYc : "255,120,96";
              return <circle key={`arc${i}`} cx={px} cy={py} r={2 + seed(i + 3) * 2} fill={`rgba(${c},${(0.6 + clashOn * 0.3).toFixed(2)})`} style={{ filter: `drop-shadow(0 0 5px rgba(${c},0.8))` }} />;
            })}
          </svg>

          {/* ===================== VOLUMETRIC GOD-RAYS from the far light (ATMOS) ===================== */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 6, overflow: "visible", mixBlendMode: "screen", filter: "blur(4px)", transform: `translate(${pAtm.toFixed(1)}px,0)` }}>
            {Array.from({ length: 8 }, (_, i) => {
              const a = rayBase + (i - 3.5) * 0.15 + Math.sin(lf * 0.02 + i) * 0.02;
              const wA = 0.02 + 0.006 * Math.sin(lf * 0.05 + i);
              const R = 1220;
              const p2x = V.x + Math.cos(a - wA) * R, p2y = V.y + Math.sin(a - wA) * R;
              const p3x = V.x + Math.cos(a + wA) * R, p3y = V.y + Math.sin(a + wA) * R;
              const op = 0.05 + 0.06 * lock + winFlood * 0.07 + clashOn * 0.03 * Math.abs(Math.sin(lf / 3 + i));
              return <polygon key={`ray${i}`} points={`${V.x},${V.y} ${p2x.toFixed(0)},${p2y.toFixed(0)} ${p3x.toFixed(0)},${p3y.toFixed(0)}`} fill={`rgba(${CYc},${op.toFixed(3)})`} />;
            })}
          </svg>

          {/* ============ ATMOSPHERIC SMOKE PLUMES rolling up the far arena (own slow drift) ============ */}
          {Array.from({ length: 5 }, (_, i) => {
            const base = 120 + i * 176;
            const sx = base + Math.sin(lf * 0.008 + i * 1.9) * 46 + pAtm * 1.2;
            const sy = 430 - ((lf * (0.5 + seed(i) * 0.5) + seed(i) * 300) % 300);
            const warm = i % 2 === 0;
            return <div key={`smoke${i}`} style={{ position: "absolute", left: sx - 150, top: sy - 130, width: 300, height: 260, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${warm ? "150,70,54" : "60,80,96"},${(0.10 + press * 0.03).toFixed(3)}) 0%, transparent 70%)`, filter: "blur(20px)", zIndex: 7, pointerEvents: "none" }} />;
          })}

          {/* ===================== PLANE D - MIDGROUND: corridor light-gates marching toward camera ===================== */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 8, overflow: "visible", mixBlendMode: "screen", transform: `translate(${pMid}px,0)` }}>
            {Array.from({ length: 8 }, (_, i) => {
              const g = 1 - (((i / 8) + lf * 0.006) % 1);      // marches far(1)->near(0)
              const bx = E.x + dx * g, by = E.y + dy * g;
              const w = (172 * (1 - g) + 20 * g) / 2;
              const op = 0.10 + 0.24 * Math.sin(Math.max(0, Math.min(1, g)) * PI);
              return <line key={`gate${i}`} x1={(bx + nx * w).toFixed(1)} y1={(by + ny * w).toFixed(1)} x2={(bx - nx * w).toFixed(1)} y2={(by - ny * w).toFixed(1)} stroke={`rgba(${CYc},${op.toFixed(3)})`} strokeWidth={2 + (1 - g) * 2.4} strokeLinecap="round" />;
            })}
            {/* perspective floor rails converging to V (epic depth) */}
            <line x1={E.x - 210} y1={E.y + 104} x2={V.x - 24} y2={V.y + 42} stroke={`rgba(${CYc},0.15)`} strokeWidth={2.2} />
            <line x1={E.x + 168} y1={E.y + 118} x2={V.x + 24} y2={V.y + 42} stroke={`rgba(231,178,76,0.13)`} strokeWidth={2.2} />
          </svg>

          {/* ============ MOTION STREAKS ripping down the corridor toward camera (speed-lines) ============ */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 9, overflow: "visible", mixBlendMode: "screen", transform: `translate(${pMid}px,0)` }}>
            {Array.from({ length: 9 }, (_, i) => {
              const off = (seed(i * 4.1) - 0.5) * 220;
              const t = (seed(i) + lf * (0.02 + seed(i + 1) * 0.02)) % 1;
              const g0 = 0.05 + t * 0.9, g1 = Math.min(0.99, g0 + 0.10);
              const bx0 = E.x + dx * g0 + nx * off * g0, by0 = E.y + dy * g0 + ny * off * g0;
              const bx1 = E.x + dx * g1 + nx * off * g1, by1 = E.y + dy * g1 + ny * off * g1;
              const c = i % 3 === 0 ? WKc : CYc;
              return <line key={`streak${i}`} x1={bx0.toFixed(1)} y1={by0.toFixed(1)} x2={bx1.toFixed(1)} y2={by1.toFixed(1)} stroke={`rgba(${c},${(0.10 + 0.18 * g0 + push * 0.1).toFixed(3)})`} strokeWidth={1.4 + g0 * 2.4} strokeLinecap="round" />;
            })}
          </svg>

          {/* ============ SCREEN-SHAKE DEBRIS - chunks knocked loose from the arena, tumbling through midground ============ */}
          {Array.from({ length: 8 }, (_, i) => {
            const rise = (lf * (0.7 + seed(i) * 1.1) + seed(i + 2) * 400) % 420;
            const dbx = 120 + seed(i * 3.7) * 780 + Math.sin(lf * 0.04 + i) * 20 + pMid;
            const dby = 470 - rise * 0.6 + blowShake * (seed(i) - 0.5) * 2;
            const sz = 5 + seed(i + 5) * 11;
            const rot = (lf * (1.5 + seed(i) * 3) + i * 40) % 360;
            return <div key={`deb${i}`} style={{ position: "absolute", left: dbx, top: dby, width: sz, height: sz * (0.5 + seed(i + 8) * 0.6), zIndex: 11, background: `rgba(${i % 3 ? "58,66,74" : "84,68,58"},${(0.5 * (1 - rise / 420)).toFixed(2)})`, transform: `rotate(${rot}deg)`, boxShadow: `0 2px 5px rgba(0,0,0,0.4)`, pointerEvents: "none" }} />;
          })}

          {/* drifting volumetric HAZE crossing the corridor (own drift rate) */}
          {Array.from({ length: 4 }, (_, i) => {
            const hx = mid.x + Math.sin(lf * 0.01 + i * 2.1) * 180 + (i - 1.5) * 66 + pAtm * 1.4;
            const hy = mid.y + Math.cos(lf * 0.012 + i * 1.7) * 78;
            return <div key={`haze${i}`} style={{ position: "absolute", left: hx - 160, top: hy - 96, width: 320, height: 192, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${i % 2 ? "196,120,90" : CYc},${0.05 + clashOn * 0.03}) 0%, transparent 70%)`, filter: "blur(11px)", zIndex: 20, pointerEvents: "none" }} />;
          })}

          {/* ===================== PLANE C - FAR VILLAIN (tiny, atmospheric blur, epic scale contrast) ===================== */}
          <div style={{ position: "absolute", right: 60, top: 336, width: 300, height: 150, zIndex: 12, transform: `translate(${pMid}px,0)`, background: `radial-gradient(ellipse at 50% 50%, rgba(${GYc},${0.20 * menace}) 0%, transparent 66%)`, filter: "blur(8px)" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 14, transform: `translate(${pMid}px,0) ${villTf}`, transformOrigin: "762px 366px", filter: `blur(${villBlur}px)` }}>
            <Generic9000 lf={lf} size={168} left={678} top={282} pose={villPose} menace={menace} flip={-1} />
          </div>
          {/* villain emitter bloom (far, small) */}
          <div style={{ position: "absolute", left: V.x - 44, top: V.y - 44, width: 88, height: 88, zIndex: 13, borderRadius: "50%", background: `radial-gradient(circle, rgba(${GYc},${0.4 * menace}) 0%, transparent 66%)`, filter: "blur(4px)", transform: `translate(${pMid}px,0)`, pointerEvents: "none" }} />

          {/* ===================== PLANE B - THE BEAM CORRIDOR (hero plane) ===================== */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 22, overflow: "visible" }}>
            {/* tapering cyan glow ribbon = corridor of energy in perspective */}
            <path d={ribbonPath(0, ct, 128, 20)} fill={`rgba(${CYc},${(0.10 + push * 0.06).toFixed(3)})`} />
            <path d={ribbonPath(0, ct, 76, 12)} fill={`rgba(${CYc},${(0.12 + push * 0.07).toFixed(3)})`} />

            {/* villain GREY generic wave (crushed + sputtering) */}
            <path d={villD} fill="none" stroke={`rgba(${GYc},${0.14 * vOn})`} strokeWidth={12} strokeLinecap="round" />
            <path d={villD} fill="none" stroke={`rgba(${GYc},${0.5 * vOn})`} strokeWidth={5} strokeLinecap="round" />
            <path d={villD} fill="none" stroke={`rgba(${GYc},${0.9 * vOn})`} strokeWidth={2.2} strokeLinecap="round" />

            {/* CLAY your-voice wave sliding onto the hero river (warm) */}
            <path d={clayD} fill="none" stroke={`rgba(${CLc},${0.16 * bright})`} strokeWidth={16} strokeLinecap="round" />
            <path d={clayD} fill="none" stroke={`rgba(${CLc},${0.5 * bright})`} strokeWidth={7} strokeLinecap="round" />
            <path d={clayD} fill="none" stroke={`rgba(${CLc},0.95)`} strokeWidth={3} strokeLinecap="round" />

            {/* HERO CYAN repulsor wave (cool) */}
            <path d={heroD} fill="none" stroke={`rgba(${CYc},${0.18 * bright})`} strokeWidth={19} strokeLinecap="round" />
            <path d={heroD} fill="none" stroke={`rgba(${CYc},${0.52 * bright})`} strokeWidth={8} strokeLinecap="round" />
            <path d={heroD} fill="none" stroke={`rgba(${CYc},0.96)`} strokeWidth={3.2} strokeLinecap="round" />

            {/* white UNIFY core = perfect identity overlap once locked */}
            {lock > 0.45 && <path d={heroD} fill="none" stroke="#EAFBFF" strokeWidth={2} strokeLinecap="round" opacity={0.4 + 0.5 * lock} />}

            {/* shock rings off the clash point */}
            {ringMeet > 0 && ringMeet < 1 && <circle cx={Cx} cy={Cy} r={(16 + ringMeet * 150) * persp} fill="none" stroke={`rgba(${CYc},${(1 - ringMeet) * 0.6})`} strokeWidth={4 * persp} />}
            {ringBlow > 0 && ringBlow < 1 && <circle cx={Cx} cy={Cy} r={(22 + ringBlow * 210) * persp} fill="none" stroke={`rgba(255,246,224,${(1 - ringBlow) * 0.6})`} strokeWidth={4 * persp} />}
          </svg>

          {/* particles flowing DOWN the corridor into depth (hero cyan) */}
          {Array.from({ length: 16 }, (_, i) => {
            const sp = 0.010 + seed(i * 1.7) * 0.009; const tp = (seed(i) + lf * sp) % Math.max(0.04, ct);
            const bx = E.x + dx * tp, by = E.y + dy * tp; const amp = 30 * (1 - tp) + 7 * tp;
            const disp = amp * waveShp(tp * L, hph); const px = bx + nx * disp, py = by + ny * disp;
            const s = (2.6 + seed(i + 2) * 3) * (1 - tp * 0.62);
            return <div key={`hp${i}`} style={{ position: "absolute", left: px, top: py, width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", background: `rgba(${CYc},0.95)`, opacity: 0.6 + seed(i + 5) * 0.3, boxShadow: `0 0 ${5 + s}px rgba(${CYc},0.85)`, zIndex: 25 }} />;
          })}
          {/* your-voice particles (clay), fading in as it locks */}
          {Array.from({ length: 10 }, (_, i) => {
            const sp = 0.009 + seed((i + 4) * 1.7) * 0.008; const tp = (seed(i + 4) + lf * sp) % Math.max(0.04, ct);
            const bx = E.x + dx * tp, by = E.y + dy * tp; const amp = 30 * (1 - tp) + 7 * tp;
            const disp = amp * waveShp(tp * L, cph) + cbias; const px = bx + nx * disp, py = by + ny * disp;
            const s = (2.4 + seed(i + 7) * 2.4) * (1 - tp * 0.6);
            return <div key={`cp${i}`} style={{ position: "absolute", left: px, top: py, width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", background: `rgba(${CLc},0.95)`, opacity: (0.5 + seed(i + 9) * 0.3) * (0.4 + 0.6 * lock), boxShadow: `0 0 ${4 + s}px rgba(${CLc},0.8)`, zIndex: 25 }} />;
          })}

          {/* ===================== CLASH FLARE (drives into depth toward the droid) ===================== */}
          <div style={{ position: "absolute", left: Cx - flareR, top: Cy - flareR, width: flareR * 2, height: flareR * 2, borderRadius: "50%", background: `radial-gradient(circle, #EAFBFF 0%, rgba(${CYc},${0.7 + push * 0.2}) 34%, transparent 68%)`, opacity: clashOn * (0.8 + 0.2 * Math.sin(lf / 3)), filter: "blur(3px)", zIndex: 30, pointerEvents: "none" }} />
          {clashOn > 0.3 && Array.from({ length: 12 }, (_, i) => {
            const b = Math.floor(lf / 2) + i * 4; const a = seed(b) * 6.283; const rr = (10 + seed(b + 3) * (30 + push * 30)) * persp; const on = seed(b + 8) > 0.35 ? 1 : 0;
            return <div key={`sk${i}`} style={{ position: "absolute", left: Cx + Math.cos(a) * rr, top: Cy + Math.sin(a) * rr * 0.7, width: (2 + seed(b) * 3) * persp, height: (2 + seed(b) * 3) * persp, borderRadius: "50%", background: i % 3 ? "#EAFBFF" : "#FFE08A", opacity: on * (0.5 + 0.5 * Math.abs(Math.sin(lf + i))), zIndex: 31 }} />;
          })}

          {/* ============ SPARKS RAINING off the clash + corridor (arc down under gravity, DOF near-plane) ============ */}
          {Array.from({ length: 14 }, (_, i) => {
            const life = (lf * (1.3 + seed(i) * 1.6) + seed(i + 4) * 200) % 90;
            const org = i % 2 === 0 ? { x: Cx, y: Cy } : { x: E.x + (seed(i) - 0.3) * 60, y: E.y - 30 };
            const va = (seed(i * 2.9) - 0.5) * 2.4;
            const spd = (1.6 + seed(i + 6) * 2.4) * persp;
            const sx = org.x + Math.cos(va - PI / 2) * spd * life;
            const sy = org.y + Math.sin(va - PI / 2) * spd * life + 0.06 * life * life;  // gravity
            const fade = Math.max(0, 1 - life / 90);
            const c = i % 4 === 0 ? "255,224,138" : CYc;
            return <div key={`spark${i}`} style={{ position: "absolute", left: sx, top: sy, width: 2 + seed(i) * 2, height: 4 + seed(i + 1) * 6, marginLeft: -1, borderRadius: 2, background: `rgba(${c},${(0.9 * fade).toFixed(2)})`, boxShadow: `0 0 6px rgba(${c},${(0.7 * fade).toFixed(2)})`, transform: `rotate(${(va * 40).toFixed(1)}deg)`, zIndex: 32, pointerEvents: "none" }} />;
          })}

          {/* ===================== PLANE B - HERO (near FG, over-the-shoulder, ATTACKING) ===================== */}
          {/* warm KEY wash spilling off the hero from the near-left */}
          <div style={{ position: "absolute", left: -80, top: 300, width: 520, height: 500, zIndex: 33, borderRadius: "50%", background: `radial-gradient(circle at 40% 55%, rgba(${WKc},${(0.16 + strain * 0.08).toFixed(3)}) 0%, transparent 62%)`, filter: "blur(16px)", mixBlendMode: "screen", pointerEvents: "none", transform: heroTf, transformOrigin: "220px 620px" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 34, transform: heroTf, transformOrigin: "220px 620px", filter: "drop-shadow(0 22px 30px rgba(0,0,0,0.6))" }}>
            <IronClaude lf={lf} size={470} left={-84} top={316} pose="blast" core={1} flip={-1} />
          </div>
          {/* repulsor emitter bloom bursting from his hand (hot point) */}
          <div style={{ position: "absolute", left: E.x - 82, top: E.y - 82, width: 164, height: 164, borderRadius: "50%", background: `radial-gradient(circle, #EAFBFF 0%, rgba(${CYc},${0.55 + 0.3 * Math.abs(Math.sin(lf / 6)) + push * 0.15}) 30%, transparent 66%)`, filter: "blur(4px)", zIndex: 35, pointerEvents: "none" }} />

          {/* ===================== "YOUR VOICE" TAG (foreground, on the clay river) ===================== */}
          {(() => { const p = over(lf, 20, 14); return (
            <div style={{ position: "absolute", left: 96, top: 512, zIndex: 40, opacity: Math.max(0.7, p), transform: `translateY(${(1 - p) * 12}px)` }}>
              <div style={{ padding: "6px 16px", borderRadius: 999, background: "rgba(38,20,12,0.92)", border: `1.6px solid rgba(${CLc},0.85)`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#FFD9C2", boxShadow: `0 0 18px rgba(${CLc},0.5)`, whiteSpace: "nowrap" }}>your voice</div>
              {lock > 0.6 && <div style={{ marginTop: 5, marginLeft: 6, fontFamily: mono, fontSize: 15, letterSpacing: 2, color: `rgba(${CLc},0.95)` }}>LOCKED</div>}
            </div>
          ); })()}

          {/* ===================== GAG: the droid coughs AI-slop as it staggers ===================== */}
          {(() => { const g = over(lf, 108, 10); if (g <= 0) return null; const jx = (seed(Math.floor(lf / 2)) - 0.5) * 6; const gl = lf % 6 < 2; return (
            <div style={{ position: "absolute", left: 458, top: 166, width: 306, zIndex: 42, opacity: Math.max(0.66, g), transform: `translate(${jx + blow * 34 + pMid}px, ${-blow * 8}px)` }}>
              <div style={{ position: "relative", padding: "13px 16px", borderRadius: 14, background: "linear-gradient(160deg, #16181C, #0A0C0F)", border: "2px solid rgba(255,86,72,0.75)", boxShadow: "0 16px 34px -12px rgba(0,0,0,0.7), 0 0 22px rgba(255,86,72,0.35)" }}>
                <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, color: "#FF8E82", marginBottom: 6 }}>// SYSTEM ERROR</div>
                <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, lineHeight: 1.18, color: "#CFE9EC" }}>
                  As an AI language model{" "}
                  <span style={{ color: "#FF6A5C", textShadow: gl ? "2px 0 #7FE8FF, -2px 0 #FF5648" : "none" }}>I cannot</span>
                  <span style={{ display: "inline-block", width: 12, height: 22, marginLeft: 3, verticalAlign: "-3px", background: "#FF6A5C", opacity: lf % 16 < 8 ? 0.9 : 0.15 }} />
                </div>
                {/* speech tail toward the droid */}
                <div style={{ position: "absolute", right: 34, bottom: -12, width: 22, height: 22, background: "#0A0C0F", borderRight: "2px solid rgba(255,86,72,0.75)", borderBottom: "2px solid rgba(255,86,72,0.75)", transform: "rotate(45deg)" }} />
              </div>
            </div>
          ); })()}

          {/* ===================== PLANE A - FOREGROUND: crackling energy motes (DOF-blurred, large) ===================== */}
          {Array.from({ length: 9 }, (_, i) => {
            const fx = (seed(i * 3.1) * 1012 + lf * (1.4 + seed(i) * 2.2)) % 1080 - 34;
            const fy = 470 + seed(i + 3) * 320 + Math.sin(lf * 0.05 + i) * 26;
            const s = 8 + seed(i + 6) * 20;
            return <div key={`fgmote${i}`} style={{ position: "absolute", left: fx, top: fy, width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2, borderRadius: "50%", background: `rgba(${i % 2 ? CYc : WKc},0.9)`, opacity: 0.28 + 0.2 * Math.abs(Math.sin(lf * 0.1 + i)), filter: "blur(5px)", boxShadow: `0 0 ${s}px rgba(${i % 2 ? CYc : WKc},0.6)`, zIndex: 45, pointerEvents: "none" }} />;
          })}

          {/* ============ FOREGROUND DEBRIS SILHOUETTES - blown-out floor plating framing the lower corners (DOF blur, fastest parallax) ============ */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 45, overflow: "visible", filter: "blur(4px)", transform: `translate(${pFore}px, ${(blowShake * 0.6).toFixed(1)}px)`, pointerEvents: "none" }}>
            {/* lower-left cracked plate wedge */}
            <polygon points="-40,792 -40,690 150,724 234,792" fill="rgba(8,11,16,0.82)" />
            <polygon points="-40,690 150,724 150,732 -40,700" fill={`rgba(${WKc},0.10)`} />
            {/* lower-right torn girder */}
            <polygon points="1052,792 1052,700 878,748 806,792" fill="rgba(8,11,16,0.8)" />
            <polygon points="1052,700 878,748 878,756 1052,708" fill={`rgba(196,90,74,0.10)`} />
            {/* a couple of tumbling near chunks */}
            {Array.from({ length: 3 }, (_, i) => {
              const cx = 200 + i * 320 + Math.sin(lf * 0.05 + i) * 24; const cy = 700 + Math.sin(lf * 0.08 + i * 2) * 18;
              const rot = (lf * (1 + i) + i * 60) % 360;
              return <rect key={`fchunk${i}`} x={cx} y={cy} width={22 + i * 6} height={12} rx={2} fill="rgba(12,15,20,0.72)" transform={`rotate(${rot} ${cx + 11} ${cy + 6})`} />;
            })}
          </svg>

          {/* out-of-focus bokeh + near haze (FG plane) */}
          {[{ x: 96, y: 736, r: 132, c: CYc, op: 0.16 }, { x: 900, y: 690, r: 154, c: "196,120,90", op: 0.14 }].map((bk, i) => (
            <div key={`bok${i}`} style={{ position: "absolute", left: bk.x - bk.r + Math.sin(lf * 0.02 + i) * 16, top: bk.y - bk.r, width: bk.r * 2, height: bk.r * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${bk.c},${bk.op}) 0%, transparent 68%)`, filter: "blur(15px)", zIndex: 46, pointerEvents: "none" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 200, background: "linear-gradient(0deg, rgba(6,10,16,0.58), transparent)", filter: "blur(6px)", zIndex: 46, pointerEvents: "none" }} />

          {/* the first-blow white flash */}
          {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${Cx}px ${Cy}px, rgba(255,248,236,${flash * 0.58}), transparent 58%)`, zIndex: 48, pointerEvents: "none" }} />}

          {/* ===================== COLOR GRADE (teal-orange) + VIGNETTE ===================== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 49, pointerEvents: "none", background: "radial-gradient(120% 100% at 24% 90%, rgba(70,150,158,0.12), transparent 44%), radial-gradient(120% 110% at 78% 30%, rgba(150,60,44,0.16), transparent 46%), radial-gradient(140% 120% at 50% 52%, transparent 50%, rgba(4,7,12,0.64))" }} />
          {/* ===================== FILM GRAIN ===================== */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 50, mixBlendMode: "overlay", opacity: 0.07, pointerEvents: "none" }}>
            <filter id="s7grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
            <rect width="100%" height="100%" filter="url(#s7grain)" />
          </svg>

          {/* running gag - the hero's gauntlets glow harder as he wins */}
          <CornerGauntlets lf={lf} wake={0.55 + push * 0.45} />
        </div>
      );
    })()}
  </Panel>
);

const S8: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="MEMORY // recall">
    {(() => {
      // ===== S8 - THE PEAK, RE-SHOT AS AN INTIMATE SLOW MACRO PUSH =====
      // The whole arena falls to deep shadow; ONE thing is lit: the note in the hero's raised
      // gauntlet. He THRUSTS it up (pose "point"); the camera does a SLOW MACRO PUSH straight
      // down the barrel onto the page. The folded page UNFURLS - lifts, turns edge-on, swings
      // flat into the key-light, and only THEN goes legible, while GENERIC-9000 reels small and
      // dim in the far murk, searching a memory it never kept.
      // FIVE PLANES: FG dust motes (blurred) / HERO note+hand (sharp) / MID hero silhouette /
      // FAR villain reeling small+dim (rack-blurred) / ATMOS one volumetric shaft + shadow falloff.
      const FX = 548, FY = 412;                                          // the note = the focal point of the entire shot

      // ---- beat clock ----
      const thrust  = over(lf, 0, 18, Easing.out(Easing.back(1.35)));    // hero PUNCHES the note up into the key-light
      const unfurl  = over(lf, 4, 30, Easing.out(Easing.cubic));         // the page rotates edge-on -> swings flat open
      const settle  = over(lf, 18, 32);                                  // page turns fully legible AFTER it opens
      const recog   = over(lf, 22, 36);                                  // recognition pulse (after the open)
      const shine   = over(lf, 30, 44);                                  // spec sweep across the page
      const warmHit = over(lf, 16, 26) * (1 - over(lf, 27, 40));         // reveal flash fires ON the open, not before
      const hold    = over(lf, 34, 66);                                  // gentle float once locked

      // ---- CAMERA: SLOW MACRO PUSH that never stops - accelerating creep into the page ----
      const macro     = 1.04 + over(lf, 0, 30, Easing.out(Easing.quad)) * 0.10 + ramp(lf, 20, 158) * 0.40; // relentless push, deeper by the end
      const dutch      = interpolate(lf, [0, 158], [0.8, -2.6], { extrapolateRight: "clamp" });            // creeps off-axis for intimacy
      const sway       = Math.sin(lf / 27) * (1.4 + ramp(lf, 0, 158) * 3.4);                               // faint handheld breath
      const midScale   = macro;                                          // note + hero, sharp
      const silScale   = 1.02 + (macro - 1.04) * 0.62;                   // hero silhouette plane drifts slower
      const farScale   = 1.0 + (macro - 1.04) * 0.30;                    // murk + villain move LEAST (deep parallax)
      const voidScale  = 1.0 + (macro - 1.04) * 0.14;                    // cathedral void drifts LEAST of all (deepest plane)
      const nearScale  = 1.06 + (macro - 1.04) * 2.05;                   // foreground haze/motes move MOST
      const rack       = 3.4 + ramp(lf, 18, 158) * 5.6;                  // rack-focus: far murk blurs deeper as we commit
      const shadow     = 0.76 + ramp(lf, 0, 158) * 0.19;                 // arena keeps sinking into black

      // ---- HERO: reactor FULL, blazing ----
      const core = Math.min(1, 0.78 + 0.22 * Math.abs(Math.sin(lf / 9)));

      // ---- VILLAIN (FAR plane): reels back small + dim, near-shatter (finishing SHATTER saved for S9) ----
      const men    = interpolate(lf, [0, 18, 110, 158], [0.58, 0.46, 0.30, 0.21], { extrapolateRight: "clamp" });
      const knock  = over(lf, 2, 12, Easing.out(Easing.cubic));         // recoil kick off the evidence
      const sink   = over(lf, 38, 100);                                 // sinks away into the murk
      const jitter = (Math.sin(lf / 3.1) * 1.6 + (seed(Math.floor(lf / 3)) - 0.5) * 3.0) * (1 - sink * 0.5);
      const vTx    = knock * 44 + sink * 38 + jitter;
      const vTy    = sink * 40 + Math.sin(lf / 7) * 2;
      const vRot   = knock * 8 + sink * 7;
      const crack  = over(lf, 96, 52);                                  // glowing hairline cracks crawl in late
      const spin   = (lf * 8) % 360;                                    // search spinner grinds
      const die    = over(lf, 66, 74);                                  // the search finds nothing and dies

      // ---- note float geometry + the UNFURL turn ----
      const nTy   = (1 - thrust) * 78 - Math.sin(lf / 24) * 5 * hold;
      const nSc   = 0.80 + thrust * 0.20;
      const nRz   = (1 - thrust) * -8 + Math.sin(lf / 30) * 1.0 * hold;
      const nRotY = (1 - unfurl) * 84 - Math.sin(lf / 34) * 3.0 * hold; // 84deg = nearly edge-on -> 0 = face-on
      const faceLit = Math.max(0, Math.cos((nRotY * Math.PI) / 180));   // page face brightens as it turns toward us

      const rayGrow  = 0.44 + ramp(lf, 0, 158) * 0.56;
      const gradeA   = 0.16 + ramp(lf, 0, 158) * 0.22;
      const grainO   = 0.06 + ramp(lf, 0, 158) * 0.06;

      return (
        <>
          {/* ===== dim arena backdrop ===== */}
          <Stage lf={lf} energy={0.11} hue="crimson" grid={false} />

          {/* ===== DEEP BACKDROP PLANE: a vast dark cathedral-like void (deepest, drifts + blurs most) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 7, transform: `scale(${voidScale.toFixed(4)}) translate(${(sway * 0.14).toFixed(1)}px, 0)`, transformOrigin: `${FX}px ${FY}px`, filter: `blur(${(rack + 2.6).toFixed(1)}px)`, pointerEvents: "none" }}>
            {/* the void mouth - a cold near-black falloff swallowing the whole nave */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(122% 122% at 50% 6%, rgba(16,26,40,0.5) 0%, rgba(3,5,10,0) 46%)" }} />
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <linearGradient id="s8vault" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(46,72,104,0.22)" />
                  <stop offset="100%" stopColor="rgba(10,16,28,0)" />
                </linearGradient>
              </defs>
              {/* great pointed arches of the nave receding into shadow */}
              {[0, 1, 2, 3].map((i) => {
                const s = 1 - i * 0.2;
                const w = 520 * s;
                const topY = 20 + i * 26;
                const spring = 300 + i * 30;
                return <path key={`arch${i}`} d={`M${506 - w} ${spring} L${506 - w} ${topY + 120} Q506 ${topY - 60} ${506 + w} ${topY + 120} L${506 + w} ${spring}`} fill="none" stroke={`rgba(64,92,128,${(0.16 - i * 0.03).toFixed(3)})`} strokeWidth={2.4} />;
              })}
              {/* the ceiling vault dissolving up into black */}
              <path d="M0 0 H1012 V150 Q506 -40 0 150 Z" fill="url(#s8vault)" />
              {/* rib bundles fanning from the unseen apex */}
              {[-3, -2, -1, 0, 1, 2, 3].map((k, i) => (
                <line key={`rib${i}`} x1={506} y1={-20} x2={506 + k * 150} y2={300} stroke={`rgba(58,84,120,${(0.12 - Math.abs(k) * 0.012).toFixed(3)})`} strokeWidth={2} />
              ))}
            </svg>
            {/* long tattered banners hanging in the gloom, catching almost no light */}
            {[130, 250, 764, 884].map((x, i) => (
              <div key={`ban${i}`} style={{ position: "absolute", left: x, top: 40, width: 46, height: 300 + (i % 2) * 40, background: `linear-gradient(180deg, rgba(96,40,44,${0.10 + (i % 2) * 0.03}) 0%, rgba(40,16,20,0) 88%)`, transform: `skewX(${(i % 2 ? 1 : -1) * 2}deg)`, borderRadius: "0 0 20px 20px" }} />
            ))}
          </div>

          {/* ===== FAR PARALLAX PLANE: the murk + the reeling droid (rack-blurred, moves least) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 8, transform: `scale(${farScale.toFixed(4)}) translate(${(sway * 0.28).toFixed(1)}px, 0)`, transformOrigin: `${FX}px ${FY}px`, filter: `blur(${rack.toFixed(1)}px)`, pointerEvents: "none" }}>
            {/* deep cold gradient wash behind everything */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(150% 105% at 78% 32%, rgba(28,52,72,0.52) 0%, rgba(5,9,17,0) 58%)" }} />
            {/* distant arena tiers + cold columns receding into the dark - environmental depth */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              {[240, 300, 360, 420, 480].map((r, i) => (
                <ellipse key={i} cx={506} cy={150} rx={r + 120} ry={r * 0.5} fill="none" stroke={`rgba(108,138,188,${(0.10 - i * 0.013).toFixed(3)})`} strokeWidth={2} />
              ))}
              {[150, 300, 720, 862].map((x, i) => (
                <rect key={`col${i}`} x={x} y={40} width={26} height={430} rx={6} fill="rgba(38,64,86,0.13)" />
              ))}
              {/* tall pointed windows in the far wall, faint cold cathedral glow */}
              {[120, 250, 762, 892].map((x, i) => (
                <g key={`win${i}`}>
                  <path d={`M${x} 210 L${x} 120 Q${x + 26} 78 ${x + 52} 120 L${x + 52} 210 Z`} fill="rgba(46,78,104,0.10)" stroke="rgba(96,140,180,0.10)" strokeWidth={1.5} />
                  <line x1={x + 26} y1={92} x2={x + 26} y2={210} stroke="rgba(96,140,180,0.08)" strokeWidth={1} />
                </g>
              ))}
              {/* flying-buttress diagonals bracing the columns */}
              {[150, 300, 720, 862].map((x, i) => (
                <line key={`but${i}`} x1={x + 13} y1={470} x2={x + (i < 2 ? -60 : 72)} y2={560} stroke="rgba(38,64,86,0.10)" strokeWidth={5} />
              ))}
            </svg>
            {/* the failing droid - SMALL + DIM, recoiling into the far murk */}
            <div style={{ position: "absolute", inset: 0, transform: `translate(${vTx.toFixed(1)}px, ${vTy.toFixed(1)}px) rotate(${vRot.toFixed(1)}deg) scale(${(0.9 - sink * 0.14).toFixed(3)})`, transformOrigin: "790px 320px" }}>
              <div style={{ position: "absolute", left: 660, top: 220, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(90,217,198,${(0.10 * men).toFixed(3)}), transparent 66%)` }} />
              <Generic9000 lf={lf} size={140} left={732} top={250} pose="stagger" menace={men} flip={1} z={9} />

              {/* it searches a memory it never kept - spinner grinds, then flatlines */}
              <div style={{ position: "absolute", left: 762, top: 308, width: 38, height: 38, opacity: 0.7 * (1 - die) }}>
                <svg viewBox="0 0 40 40" width={38} height={38}>
                  <circle cx={20} cy={20} r={14} fill="none" stroke="rgba(90,217,198,0.16)" strokeWidth={4} />
                  <circle cx={20} cy={20} r={14} fill="none" stroke="#5AD9C6" strokeWidth={4} strokeLinecap="round" strokeDasharray="20 68" transform={`rotate(${spin} 20 20)`} />
                </svg>
              </div>
              {/* dead-search flatline once it gives up */}
              <div style={{ position: "absolute", left: 744, top: 326, width: 72, height: 2, background: "rgba(90,217,198,0.5)", opacity: die * (((lf % 11) < 3) ? 0.5 : 1) }} />

              {/* near-shatter: glowing hairline cracks crawl across the chassis */}
              {crack > 0 && (
                <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                  <g fill="none" stroke="rgba(16,22,26,0.92)" strokeWidth={2.2} opacity={crack} strokeLinecap="round">
                    <polyline points="762,296 778,318 766,336 782,356" />
                    <polyline points="798,306 812,328 802,344" />
                    <polyline points="756,340 742,360 752,382" />
                  </g>
                  <g fill="none" stroke="rgba(180,235,255,0.68)" strokeWidth={1} opacity={crack * 0.7} strokeLinecap="round">
                    <polyline points="762,296 778,318 766,336 782,356" />
                    <polyline points="798,306 812,328 802,344" />
                  </g>
                </svg>
              )}
            </div>
          </div>

          {/* ===== FAR EMBERS: faint dim embers drifting up through the cathedral void (deep, soft) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 9, filter: "blur(1.6px)", pointerEvents: "none" }}>
            {Array.from({ length: 20 }, (_, i) => {
              const sd = seed(i + 80);
              const yy = 760 - ((seed(i * 1.7) * 760 + lf * (0.22 + sd * 0.42)) % 760);
              const xx = 60 + seed(i * 2.3) * 892 + Math.sin(lf / 50 + i) * 14;
              const r = 1.6 + sd * 2.2;
              const tw = 0.4 + 0.6 * Math.abs(Math.sin(lf / 12 + i * 1.7));
              return <div key={`em${i}`} style={{ position: "absolute", left: xx, top: yy, width: r, height: r, borderRadius: "50%", background: "rgba(255,168,86,0.92)", boxShadow: "0 0 6px rgba(255,150,70,0.8)", opacity: (0.16 + sd * 0.18) * tw * (0.5 + ramp(lf, 0, 158) * 0.5) }} />;
            })}
          </div>

          {/* ===== ATMOS: crush the room to near-black so ONE lit page carries the frame ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, background: `radial-gradient(120% 92% at ${(FX / 1012 * 100).toFixed(1)}% ${(FY / 792 * 100).toFixed(1)}%, rgba(6,8,14,0.05) 0%, rgba(2,3,6,${shadow.toFixed(3)}) 68%)`, pointerEvents: "none" }} />
          {/* tighter warm falloff ring for richer rolloff around the page */}
          <div style={{ position: "absolute", inset: 0, zIndex: 11, background: `radial-gradient(56% 44% at ${(FX / 1012 * 100).toFixed(1)}% ${(FY / 792 * 100).toFixed(1)}%, rgba(255,244,214,${(0.11 * settle).toFixed(3)}) 0%, transparent 52%)`, mixBlendMode: "screen", pointerEvents: "none" }} />

          {/* ===== ATMOS: the ONE dramatic volumetric shaft + supporting god-rays raking down onto the note ===== */}
          <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 12, pointerEvents: "none" }}>
            <defs>
              <linearGradient id="s8ray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,236,196,0)" />
                <stop offset="22%" stopColor="rgba(255,232,186,0.22)" />
                <stop offset="100%" stopColor="rgba(255,220,168,0)" />
              </linearGradient>
              <linearGradient id="s8spot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,246,222,0.44)" />
                <stop offset="100%" stopColor="rgba(255,246,222,0)" />
              </linearGradient>
            </defs>
            {[-232, -140, -52, 40, 132, 224].map((off, i) => {
              const topx = FX + off * 0.22 + Math.sin(lf / 44 + i) * 12;
              const w = 22 + i * 5;
              return <polygon key={i} points={`${topx - w},-24 ${topx + w},-24 ${FX + off + 82},600 ${FX + off - 82},600`} fill="url(#s8ray)" opacity={(0.26 + 0.24 * Math.abs(Math.sin(lf / 34 + i))) * rayGrow} style={{ mixBlendMode: "screen" }} />;
            })}
            {/* THE dramatic key shaft onto the page - narrows + intensifies as the page opens */}
            <polygon points={`${FX + Math.sin(lf / 40) * 5},-30 ${FX - (214 - unfurl * 76)},580 ${FX + (214 - unfurl * 76)},580`} fill="url(#s8spot)" opacity={0.44 + settle * 0.36} style={{ mixBlendMode: "screen" }} />
          </svg>

          {/* ===== FG PLANE: volumetric dust motes drifting UP through the key light (soft-blurred, own drift rate) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 14, filter: "blur(1.4px)", pointerEvents: "none" }}>
            {Array.from({ length: 26 }, (_, i) => {
              const sd = seed(i + 30);
              const yy = ((seed(i * 2.7) * 540 + lf * (0.30 + sd * 0.62)) % 540) + 18;
              const hw = 20 + (yy / 560) * 178;
              const xx = FX + (seed(i * 3.3) - 0.5) * 1.85 * hw + Math.sin(lf / 30 + i) * 8;
              const r = 2 + sd * 2.4;
              return <div key={`du${i}`} style={{ position: "absolute", left: xx, top: yy, width: r, height: r, borderRadius: "50%", background: "rgba(255,246,222,0.92)", opacity: (0.08 + sd * 0.16) * (0.42 + settle * 0.58) }} />;
            })}
          </div>

          {/* ===== MID HAZE: slow volumetric fog banks rolling through the shaft (behind the hero) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 16, filter: "blur(22px)", pointerEvents: "none", opacity: 0.5 + settle * 0.3 }}>
            <div style={{ position: "absolute", left: FX - 360 + Math.sin(lf / 70) * 40, top: 300, width: 720, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,232,190,0.10), transparent 68%)" }} />
            <div style={{ position: "absolute", left: FX - 200 + Math.cos(lf / 58) * 30, top: 430, width: 520, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,180,210,0.06), transparent 70%)" }} />
          </div>

          {/* ===== MID PLANE: hero silhouette base glow (drifts slower than the sharp note) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 18, transform: `scale(${silScale.toFixed(4)}) translate(${(sway * 0.6).toFixed(1)}px, 0)`, transformOrigin: `${FX}px ${FY}px`, filter: "blur(2.4px)", pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: -30, top: 356, width: 360, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,120,90,0.18), transparent 64%)" }} />
          </div>

          {/* ===== HERO PLANE: the macro push onto hero + the SHARP note ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: `translate(${sway.toFixed(1)}px, ${(sway * 0.4).toFixed(1)}px) scale(${midScale.toFixed(4)}) rotate(${dutch.toFixed(2)}deg)`, transformOrigin: `${FX}px ${FY}px` }}>

            {/* floor pool + reflected warmth grounds the key-light */}
            <div style={{ position: "absolute", left: FX - 250, top: 306, width: 500, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,210,0.44) 0%, rgba(255,232,198,0.12) 34%, transparent 60%)", opacity: 0.5 + settle * 0.4, zIndex: 21, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: FX - 150, top: 588, width: 300, height: 70, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.26), transparent 66%)", filter: "blur(8px)", opacity: settle, zIndex: 21, pointerEvents: "none" }} />

            {/* warm rim so the hero reads against the black */}
            <div style={{ position: "absolute", left: -30, top: 356, width: 340, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,120,90,0.20), transparent 64%)", zIndex: 22, pointerEvents: "none" }} />

            {/* HERO: Iron Claude, thrusting the evidence UP (pose "point") */}
            <div style={{ position: "absolute", inset: 0, transform: `translateY(${(-thrust * 12).toFixed(1)}px)`, zIndex: 30 }}>
              <IronClaude lf={lf} size={382} left={-30} top={306} pose="point" core={core} flip={1} z={30} />
            </div>

            {/* holo tether: raised gauntlet -> page (fades as we push past him) */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 26, pointerEvents: "none" }}>
              <path d={`M196 458 Q ${(196 + FX) / 2} 372 ${FX - 8} ${FY + 92}`} fill="none" stroke="rgba(127,232,255,0.5)" strokeWidth={4} strokeLinecap="round" opacity={thrust * (1 - ramp(lf, 66, 140))} />
              <path d={`M196 458 Q ${(196 + FX) / 2} 372 ${FX - 8} ${FY + 92}`} fill="none" stroke="#EAFBFF" strokeWidth={1.6} strokeLinecap="round" opacity={0.7 * thrust * (1 - ramp(lf, 66, 140))} />
            </svg>

            {/* comic impact / speed lines bursting off the page at the OPEN */}
            {warmHit > 0.02 && Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * 6.283;
              const r0 = 84, r1 = 84 + warmHit * 172;
              return <div key={`sp${i}`} style={{ position: "absolute", left: FX + Math.cos(a) * r0, top: FY + Math.sin(a) * r0, width: r1 - r0, height: 3, transformOrigin: "0 50%", transform: `rotate(${(a * 180 / Math.PI).toFixed(1)}deg)`, background: "linear-gradient(90deg, rgba(255,224,150,0.9), transparent)", opacity: warmHit * 0.75, zIndex: 34, pointerEvents: "none" }} />;
            })}

            {/* recognition ring - one clean pulse as the page locks flat into the light */}
            {(() => { const p = recog; if (p <= 0 || p >= 1) return null; return (
              <div style={{ position: "absolute", left: FX - 36, top: FY - 36, width: 72, height: 72, borderRadius: "50%", border: `2px solid rgba(127,232,255,${(0.55 * (1 - p)).toFixed(3)})`, transform: `scale(${0.4 + p * 3.6})`, zIndex: 35, pointerEvents: "none" }} />
            ); })()}

            {/* ============ THE ONE LIT OBJECT - YOUR note, UNFURLING aloft in the key-light ============ */}
            {/* PREMIUM redesign: a real high-end note-app card - crisp gradient surface, soft drop shadow,
                hairline border, header row (accent dot + mono meta label), thin divider, clean title, tidy
                ruled body. Position + entrance + unfurl geometry preserved exactly. Text meaning kept:
                "8 MONTHS AGO" + "pricing". */}
            <div style={{ position: "absolute", left: FX - 190, top: FY - 125, width: 380, height: 250, zIndex: 40, perspective: 1400, transform: `translateY(${nTy.toFixed(1)}px) rotate(${nRz.toFixed(2)}deg) scale(${nSc.toFixed(3)})`, transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 18, transformStyle: "preserve-3d", transform: `rotateY(${nRotY.toFixed(2)}deg)`, transformOrigin: "50% 50%", background: "linear-gradient(158deg, #FCF9F1 0%, #F4EEDF 54%, #ECE3CF 100%)", border: "1px solid rgba(120,90,40,0.24)", boxShadow: "0 40px 70px -14px rgba(0,0,0,0.78), 0 2px 0 rgba(255,255,255,0.6) inset, 0 0 60px rgba(255,238,198,0.55)", overflow: "hidden", filter: `brightness(${(0.62 + 0.38 * faceLit).toFixed(3)})` }}>
                {/* soft corner gloss */}
                <div style={{ position: "absolute", left: -48, top: -60, width: 300, height: 260, background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.62), transparent 60%)", pointerEvents: "none" }} />
                {/* faint paper grain / UI dot-texture */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.45, backgroundImage: "radial-gradient(rgba(120,90,40,0.05) 1px, transparent 1px)", backgroundSize: "7px 7px", pointerEvents: "none" }} />
                {/* crisp top highlight */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

                {/* HEADER ROW: app-style accent dot + mono meta label + tidy trailing dots */}
                <div style={{ position: "absolute", left: 28, right: 28, top: 24, display: "flex", alignItems: "center", gap: 11, opacity: settle }}>
                  <div style={{ width: 13, height: 13, borderRadius: "50%", background: "linear-gradient(135deg, #E8A24A, #CF9544)", boxShadow: "0 0 0 3px rgba(207,149,68,0.18)" }} />
                  <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2.6, color: "#6B5A3A", fontWeight: 600 }}>SAVED &middot; 8 MONTHS AGO</div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
                    {[0, 1, 2].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(120,90,40,0.26)" }} />)}
                  </div>
                </div>
                {/* thin divider */}
                <div style={{ position: "absolute", left: 28, right: 28, top: 54, height: 1, background: "linear-gradient(90deg, rgba(120,90,40,0.06), rgba(120,90,40,0.30), rgba(120,90,40,0.06))", opacity: settle }} />

                {/* TITLE - clean, crisp */}
                <div style={{ position: "absolute", left: 28, top: 74, fontFamily: fraunces.fontFamily, fontWeight: 900, fontStyle: "italic", fontSize: 56, lineHeight: 1, color: INK, opacity: settle }}>pricing</div>

                {/* BODY - tidy ruled note lines (neat, not scribbled) */}
                <div style={{ position: "absolute", left: 28, right: 30, top: 152, opacity: settle * 0.92 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ height: 9, borderRadius: 5, marginBottom: 15, width: i === 2 ? "56%" : "100%", background: "linear-gradient(90deg, rgba(120,100,66,0.30), rgba(120,100,66,0.13))" }} />
                  ))}
                </div>

                {/* spec sweep across the page */}
                <div style={{ position: "absolute", top: -20, bottom: -20, width: 104, left: -170 + shine * 560, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "skewX(-16deg)", opacity: shine * (1 - shine) * 4, pointerEvents: "none" }} />
              </div>
            </div>
          </div>

          {/* ===== NEAR FOREGROUND PLANE: warm bokeh + haze (heavily blurred, fastest parallax) ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 50, transform: `scale(${nearScale.toFixed(4)}) translate(${(sway * 1.85).toFixed(1)}px, 0)`, transformOrigin: `${FX}px ${FY}px`, filter: "blur(9px)", pointerEvents: "none" }}>
            {Array.from({ length: 9 }, (_, i) => {
              const sd = seed(i + 61);
              const bx = 120 + sd * 780 + Math.sin(lf / 40 + i) * 28;
              const by = 250 + seed(i * 1.9) * 460 + Math.cos(lf / 46 + i) * 24;
              const r = 30 + sd * 52;
              const warm = i % 2 === 0;
              return <div key={`bk${i}`} style={{ position: "absolute", left: bx, top: by, width: r, height: r, borderRadius: "50%", background: warm ? "radial-gradient(circle, rgba(255,214,150,0.32), transparent 70%)" : "radial-gradient(circle, rgba(120,210,220,0.16), transparent 70%)", opacity: 0.4 + settle * 0.4 }} />;
            })}
            <div style={{ position: "absolute", left: -60 + Math.sin(lf / 60) * 42, top: 470, width: 1140, height: 260, background: "linear-gradient(90deg, transparent, rgba(210,170,120,0.11), transparent)" }} />
            {/* out-of-focus pillar edge biting into the near foreground - frames the void */}
            <div style={{ position: "absolute", left: -40, top: -40, width: 150, height: 880, background: "linear-gradient(90deg, rgba(4,6,10,0.6), rgba(4,6,10,0.14) 62%, transparent)" }} />
            <div style={{ position: "absolute", right: -40, top: -40, width: 130, height: 880, background: "linear-gradient(270deg, rgba(4,6,10,0.55), rgba(4,6,10,0.12) 62%, transparent)" }} />
            <div style={{ position: "absolute", left: -40, bottom: -30, width: 1100, height: 150, background: "linear-gradient(0deg, rgba(4,6,10,0.52), transparent)" }} />
          </div>

          {/* ===== rich complementary color grade (warm key vs cold murk), escalating ===== */}
          <div style={{ position: "absolute", inset: 0, zIndex: 58, background: `linear-gradient(214deg, rgba(255,196,120,${gradeA.toFixed(3)}) 0%, transparent 40%, transparent 60%, rgba(56,178,190,${(gradeA * 0.9).toFixed(3)}) 100%)`, mixBlendMode: "soft-light", pointerEvents: "none" }} />

          {/* ===== film grain (animated fractal noise) ===== */}
          <svg width="100%" height="100%" viewBox="0 0 1012 792" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 60, mixBlendMode: "overlay", opacity: grainO, pointerEvents: "none" }}>
            <filter id="s8grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(lf) % 13} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="1012" height="792" filter="url(#s8grain)" />
          </svg>

          {/* ===== cinema vignette ===== */}
          <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 250px rgba(0,0,0,${(0.74 + ramp(lf, 0, 158) * 0.15).toFixed(3)})`, zIndex: 62, pointerEvents: "none" }} />

          <CornerGauntlets lf={lf} wake={0.35} />
        </>
      );
    })()}
  </Panel>
);

const S9: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="voice://you // FINAL_STRIKE">
    {(() => {
      // ===== THE FINAL BLOW - re-shot to the CINEMATIC bar: a hard WHIP into the shatter (cold grey shards
      // streak PAST the lens, motion-blurred) that SETTLES onto the earned victory. Five distinct parallax
      // planes each drift at their own rate with DOF on the near + far: (a) FG villain shards past the lens,
      // (b) HERO on the finishing blow, (c) MID the shattering GENERIC-9000 + embers, (d) FAR arena,
      // (e) ATMOS god-rays breaking through as the palette swings COLD -> WARM. Your rewrite overwrites the
      // AI slop; the words fly as the killing strike; a SLOW-MO hit-stop holds the blast pose, then time snaps
      // back and the camera racks onto the hero. =====
      const TXT = "In todays fast-paced world";
      const BLOW = 100;                                    // words land / villain shatters / near-shards launch

      // ---- SLOW-MO time-remap: the shatter world crawls for a held beat, then resumes (NEVER freezes) ----
      const HOLD = 9, SLOW = 0.34;                         // hit-stop window + speed during it
      const tw = (f: number) => { if (f <= BLOW) return f; const d = f - BLOW; return d <= HOLD ? BLOW + d * SLOW : BLOW + HOLD * SLOW + (d - HOLD); };
      const sf = tw(lf);                                   // shatter / debris / villain clock (slow-mo aware)
      const slowmo = lf > BLOW ? Math.max(0, 1 - (lf - BLOW) / HOLD) : 0;  // 1 at impact -> 0 as time resumes

      // ---- camera beat clock (the WHIP waits out the slow-mo, then snaps) ----
      const preRoll = over(lf, 0, BLOW, Easing.inOut(Easing.quad));      // slow creep toward the duel
      const whip    = over(lf, 108, 9, Easing.in(Easing.cubic));         // hard SNAP into the shatter (post hit-stop)
      const settle  = over(lf, 121, 42, Easing.inOut(Easing.cubic));     // rack back + pan onto the hero
      const dolly   = over(lf, 121, 46, Easing.out(Easing.quad));        // continued push-in through victory (no freeze)

      // ---- HERO: gathers (charge) -> BLASTS the finishing blow (active, lunging) -> earned victory ----
      const heroPose  = lf < 62 ? "charge" : lf < 128 ? "blast" : "victory";
      const heroCore  = Math.min(1, 0.8 + 0.2 * Math.abs(Math.sin(lf / 8)));       // reactor FULL, pulsing
      const heroLunge = over(lf, 60, 16, Easing.out(Easing.cubic)) * (1 - over(lf, 116, 22)); // drives THROUGH the frame, HOLDS through the slow-mo, then recovers
      const heroKick  = lf >= BLOW ? Math.max(0, 1 - (lf - BLOW) / 8) : 0;         // recoil brace at impact
      const heroRise  = over(lf, 124, 30, Easing.out(Easing.cubic));              // rises into victory
      const heroX = heroLunge * 50 - heroKick * 16;
      const heroY = -heroRise * 12 - heroKick * 7;
      const heroSc = 1 + heroLunge * 0.055 + heroRise * 0.035 + slowmo * 0.02;    // subtle slow-mo swell on the held pose

      // ---- VILLAIN: gloats (mock) then SHATTERS. shatter clocks from the slow-mo-aware local lf ----
      const villainPose = lf < BLOW ? "mock" : "shatter";
      const villainLf = lf < BLOW ? lf : sf - BLOW;
      const menace = lf < BLOW ? 0.8 + 0.14 * Math.sin(lf / 8) : Math.max(0, 1 - ramp(sf, BLOW, BLOW + 22));

      // ---- CAMERA rig: dutch-tilted WHIP after the hit-stop, shake on impact, then rack-focus onto the hero ----
      const shakeE = lf >= BLOW ? Math.max(0, 1 - (lf - BLOW) / 9) : 0;
      const shX = shakeE * Math.sin(lf * 2.7) * 10;
      const shY = shakeE * Math.cos(lf * 3.1) * 8;
      const camX = -46 - 366 * whip + 604 * settle + shX;   // neutral -> WHIP upper-right -> pan left onto hero
      const camY = 40 * whip - 44 * settle + shY;
      const camScale = 1.05 + 0.05 * preRoll + 0.34 * whip - 0.22 * settle + 0.07 * dolly + slowmo * 0.03;
      const camRot = -4.1 * whip * (1 - settle);            // dutch into the whip, levels on settle
      const mb = whip * (1 - settle);                       // motion-blur energy (peaks mid-whip)

      // ---- PARALLAX planes - each strata drifts at its own rate off the hero cam ----
      const fx = camX * 0.40, fy = camY * 0.40;             // FAR backdrop (arena) - most DOF
      const fScale = 1.02 + 0.03 * preRoll + 0.12 * whip - 0.08 * settle;
      const mgx = camX * 0.70, mgy = camY * 0.70;           // MID (embers / furnace behind the duel)
      const mgSc = 1.01 + 0.02 * preRoll + 0.09 * whip - 0.055 * settle;
      const atx = camX * 0.56, aty = camY * 0.56;           // ATMOS (god-rays / bloom motes)
      const atSc = 1.015 + 0.05 * whip - 0.03 * settle;
      const dpx = camX * 0.22, dpy = camY * 0.22;           // DEEPEST backdrop (distant tiers / vault) - heaviest DOF

      // ---- COLD->WARM palette shift: one decisive grade that swings on the blow (drives every warm/cold weight) ----
      const swing = over(lf, BLOW - 4, 34, Easing.inOut(Easing.quad));   // 0 = cold duel, 1 = warm victory
      const flood = over(lf, BLOW, 40, Easing.out(Easing.quad));
      const flash = lf >= BLOW ? Math.max(0, 1 - (lf - BLOW) / 8) : 0;

      // ---- the warm rewrite flight-path (words -> villain), the finishing strike ----
      const rib = over(lf, 88, 12, Easing.out(Easing.cubic));
      const ribFade = ramp(lf, 108, 138);
      const bez = (t: number, a: number, b: number, c: number) => { const u = 1 - t; return u * u * a + 2 * u * t * b + t * t * c; };
      const hx = bez(rib, 636, 762, 846), hy = bez(rib, 452, 356, 306);

      // ---- writing clocks (the page rewrite is the trigger) ----
      const writeProg = over(lf, 62, 40);
      const nibX = 300 + writeProg * 300;
      const nibFlare = over(lf, 92, 8) * (1 - over(lf, 104, 10));

      // ---- GAG: the maker's-plate spins off reading "GENERIC-9000" ----
      const gp = over(sf, 104, 48, Easing.out(Easing.cubic));
      const gx = 812 - gp * 560, gy = 348 - gp * 120 + gp * gp * 200, grot = gp * -470;
      const gop = over(sf, 104, 6) * (1 - ramp(sf, 138, 158));

      const ring = (p: number, col: string, w: number) => (p > 0 && p < 1 ? (
        <div style={{ position: "absolute", left: 846, top: 322, width: 180, height: 180, marginLeft: -90, marginTop: -90, borderRadius: "50%", border: `${w}px solid ${col}`, transform: `scale(${0.25 + p * 4.4})`, opacity: (1 - p) * 0.9, boxShadow: `0 0 40px ${col}`, mixBlendMode: "screen" }} />
      ) : null);

      return (
        <>
          {/* static crimson base BEHIND everything so the whip never exposes bare panel (warms on the swing) */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(125% 100% at ${42 - swing * 6}% 44%, ${swing > 0 ? `rgb(${35 + swing * 30},${16 + swing * 8},${13})` : "#23100D"} 0%, #0A0607 72%, #04060A 100%)` }} />

          {/* ============ (f) DEEPEST BACKDROP (parallax 0.22, heaviest DOF) - distant colosseum tiers + crowd glow banks + cold->warm vault break ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${dpx}px, ${dpy}px) scale(${1.06 + 0.02 * preRoll}) rotate(${camRot * 0.3}deg)`, transformOrigin: "506px 400px", filter: `blur(${4.4 + mb * 2.6}px)`, pointerEvents: "none" }}>
            {/* cold->warm vault sky breaking open at the very top */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(178deg, rgba(${18 + swing * 58},${16 + swing * 32},${28 - swing * 8},0.9) 0%, rgba(10,7,10,0) 46%)` }} />
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <radialGradient id="s9crowdW" cx="50%" cy="100%" r="70%">
                  <stop offset="0%" stopColor="#FFC878" stopOpacity="0.5" /><stop offset="100%" stopColor="#FFC878" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="s9crowdC" cx="50%" cy="100%" r="70%">
                  <stop offset="0%" stopColor="#6FD8DC" stopOpacity="0.42" /><stop offset="100%" stopColor="#6FD8DC" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* distant tiered colosseum arcs sweeping across the vault */}
              {[86, 122, 162, 206].map((yy, r) => (
                <path key={`tier${r}`} d={`M-40 ${yy} Q506 ${yy - 52} 1052 ${yy}`} fill="none" stroke="#170E12" strokeWidth={15 + r * 4} opacity={0.5 - r * 0.06} />
              ))}
              {/* far tier speckle crowd (warm hero-side, cold villain-side) */}
              {Array.from({ length: 72 }, (_, i) => { const x = seed(i * 3.1) * 1012; const y = 76 + seed(i * 1.7) * 150; const warm = x < 520; const tk = 0.2 + 0.28 * Math.abs(Math.sin(lf / 22 + i)); return <circle key={`fc${i}`} cx={x} cy={y} r={1.3 + seed(i) * 1.8} fill={warm ? "#C98A46" : "#5FB6BE"} opacity={tk * (warm ? (0.5 + swing * 0.6) : Math.max(0.2, 1 - swing))} />; })}
              {/* crowd glow banks rising off the tiers */}
              <ellipse cx={300} cy={250} rx={430} ry={150} fill="url(#s9crowdW)" opacity={0.4 + swing * 0.5 + flash * 0.3} style={{ mixBlendMode: "screen" }} />
              <ellipse cx={764} cy={252} rx={360} ry={140} fill="url(#s9crowdC)" opacity={0.32 * (1 - swing) * (0.4 + 0.6 * menace)} style={{ mixBlendMode: "screen" }} />
            </svg>
          </div>

          {/* ============ (d) FAR LAYER (parallax-reduced 0.40, heaviest depth-of-field) ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${fx}px, ${fy}px) scale(${fScale}) rotate(${camRot * 0.5}deg)`, transformOrigin: "506px 400px", filter: `blur(${2.6 + mb * 2.4}px)` }}>
            <Stage lf={lf} energy={0.58 + flash * 0.3 + flood * 0.14} hue="crimson" grid />

            {/* arena architecture + VOLUMETRIC GOD-RAYS + far crowd */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "visible" }}>
              <defs>
                <linearGradient id="s9warm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE7B6" stopOpacity="0.42" /><stop offset="100%" stopColor="#FFD68A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="s9cold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8DE6E0" stopOpacity="0.34" /><stop offset="100%" stopColor="#5AD9C6" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="s9burst" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF6DE" stopOpacity="0.9" /><stop offset="100%" stopColor="#FFD68A" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* back wall + arches (depth) */}
              <rect x={0} y={150} width={1012} height={156} fill="#0B0709" opacity={0.55} />
              {[70, 250, 430, 610, 790, 970].map((x, i) => (
                <path key={`ar${i}`} d={`M${x - 46} 306 L${x - 46} 196 Q${x} 150 ${x + 46} 196 L${x + 46} 306 Z`} fill="#120A0C" stroke="#2A1518" strokeWidth={2} opacity={0.72} />
              ))}
              {/* far crowd speckle */}
              {Array.from({ length: 46 }, (_, i) => { const x = seed(i * 2.1) * 1012; const y = 168 + seed(i * 1.3) * 100; return <circle key={`cr${i}`} cx={x} cy={y} r={2.4 + seed(i) * 2} fill="#3A2020" opacity={0.32 + 0.2 * Math.sin(lf / 20 + i)} />; })}
              {/* WARM god-ray shafts raking down the hero side (bloom on flash + swing) */}
              {[
                { p: "150,170 236,170 470,720 170,720", o: 0.5 },
                { p: "300,150 372,150 560,720 300,720", o: 0.4 },
                { p: "220,158 268,158 400,720 210,720", o: 0.3 },
              ].map((s, i) => (
                <polygon key={`gw${i}`} points={s.p} fill="url(#s9warm)" opacity={(s.o + flash * 0.4) * (0.55 + swing * 0.8)} style={{ mixBlendMode: "screen" }} />
              ))}
              {/* COLD god-ray shafts on the villain side (recede as the palette swings warm) */}
              {[
                { p: "700,150 770,150 940,720 700,720", o: 0.42 },
                { p: "838,150 900,150 1010,700 830,700", o: 0.34 },
              ].map((s, i) => (
                <polygon key={`gc${i}`} points={s.p} fill="url(#s9cold)" opacity={s.o * (0.3 + 0.7 * (1 - swing) * (0.5 + 0.5 * menace))} style={{ mixBlendMode: "screen" }} />
              ))}
              {/* a broad WARM victory shaft that grows and floods from upper-right */}
              <polygon points="640,150 1012,150 1012,760 470,760" fill="url(#s9warm)" opacity={0.55 * swing} style={{ mixBlendMode: "screen" }} />
              {/* arena floor line + hazard lip */}
              <line x1={0} y1={656} x2={1012} y2={656} stroke="#3A1E1A" strokeWidth={3} opacity={0.6} />
              {Array.from({ length: 15 }, (_, i) => <polygon key={`hz${i}`} points={`${58 + i * 66},780 ${86 + i * 66},780 ${66 + i * 66},792 ${38 + i * 66},792`} fill={i % 2 ? "#0B0709" : "#7A4A16"} opacity={0.5} />)}
            </svg>

            {/* overhead rafter trusses + hanging banners + flanking pillars + rubble + reflective floor (far-plane structure) */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "visible" }}>
              {/* truss beams crossing the vault */}
              {[126, 148].map((yy, r) => (
                <g key={`tr${r}`} opacity={0.5 - r * 0.14}>
                  <line x1={-20} y1={yy} x2={1032} y2={yy + (r ? 8 : -6)} stroke="#241318" strokeWidth={9} />
                  {Array.from({ length: 26 }, (_, i) => <line key={i} x1={i * 40} y1={yy} x2={i * 40 + 20} y2={yy + 18} stroke="#1A0F13" strokeWidth={3} />)}
                </g>
              ))}
              {/* hanging tattered banners - warm hero-side, cold villain-side (sway) */}
              {[{ x: 190, warm: true }, { x: 358, warm: true }, { x: 688, warm: false }, { x: 858, warm: false }].map((b, i) => {
                const sway = Math.sin(lf / 40 + i) * 6;
                const col = b.warm ? `rgba(150,70,36,${0.5 + swing * 0.24})` : `rgba(46,96,104,${0.42 * (1 - swing * 0.4)})`;
                return <path key={`bn${i}`} d={`M${b.x} 150 L${b.x + 52} 150 L${b.x + 52 + sway} 300 L${b.x + 40 + sway} 316 L${b.x + 26 + sway} 300 L${b.x + 12 + sway} 316 L${b.x + sway} 300 Z`} fill={col} stroke="rgba(0,0,0,0.4)" strokeWidth={1.5} />;
              })}
              {/* broken flanking pillars framing the arena */}
              <path d="M40 300 L120 300 L110 660 L54 660 Z" fill="#140C0E" stroke="#2A1518" strokeWidth={2} opacity={0.6} />
              <path d="M896 300 L976 300 L968 660 L910 660 Z" fill="#120A0C" stroke="#241417" strokeWidth={2} opacity={0.58} />
              {/* rubble on the arena floor */}
              {Array.from({ length: 12 }, (_, i) => { const x = 80 + seed(i * 4.3) * 860; const y = 636 + seed(i + 2) * 30; const w = 14 + seed(i) * 30; return <polygon key={`rb${i}`} points={`${x} ${y} ${x + w} ${y - 6} ${x + w + 4} ${y + 10} ${x - 4} ${y + 12}`} fill={i % 2 ? "#1B1214" : "#241A18"} stroke="#0A0708" strokeWidth={1} opacity={0.7} />; })}
              {/* reflective warm floor streak (grows with the swing + flood) */}
              <ellipse cx={320} cy={700} rx={360} ry={40} fill="rgba(226,140,72,0.16)" opacity={0.3 + swing * 0.5 + flood * 0.3} style={{ mixBlendMode: "screen" }} />
            </svg>

            {/* drifting volumetric HAZE blobs (breathing; warm swells + cold burns off on the swing) */}
            <div style={{ position: "absolute", left: -60 + Math.sin(lf / 55) * 30, top: 340, width: 620, height: 460, background: `radial-gradient(circle at 34% 50%, rgba(214,120,76,${0.2 + swing * 0.16}), transparent 62%)`, filter: "blur(26px)", zIndex: 6, mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", right: -40 - Math.cos(lf / 48) * 26, top: 190, width: 520, height: 460, background: `radial-gradient(circle at 66% 42%, rgba(90,217,198,${0.16 * (1 - swing) * menace}), transparent 60%)`, filter: "blur(26px)", zIndex: 6, mixBlendMode: "screen" }} />
          </div>

          {/* ============ (c) MID LAYER (own drift 0.70, light DOF) - furnace bloom + embers behind the duel ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${mgx}px, ${mgy}px) scale(${mgSc}) rotate(${camRot * 0.72}deg)`, transformOrigin: "506px 400px", filter: `blur(${1.1 + mb * 1.5}px)`, zIndex: 8, pointerEvents: "none" }}>
            {/* warm furnace bloom low-center that hardens on the swing */}
            <div style={{ position: "absolute", left: 200, top: 428, width: 640, height: 392, background: `radial-gradient(circle at 40% 60%, rgba(226,120,60,${0.14 + swing * 0.2}), transparent 64%)`, mixBlendMode: "screen" }} />
            {/* cold villain-side furnace that burns off */}
            <div style={{ position: "absolute", right: 96, top: 246, width: 468, height: 364, background: `radial-gradient(circle at 60% 40%, rgba(70,180,190,${0.12 * (1 - swing) * menace}), transparent 62%)`, mixBlendMode: "screen" }} />
            {/* volumetric spotlight cones raking from the rafters (bloom on the swing/flash) */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible", mixBlendMode: "screen" }}>
              {[{ x: 262, warm: true }, { x: 470, warm: true }, { x: 782, warm: false }].map((s, i) => {
                const warm = s.warm; const col = warm ? "255,210,140" : "110,205,210";
                const op = warm ? (0.1 + swing * 0.24 + flash * 0.2) : 0.12 * (1 - swing) * (0.5 + 0.5 * menace);
                return <polygon key={`sc${i}`} points={`${s.x} 150 ${s.x + 30} 150 ${s.x + 150} 640 ${s.x - 120} 640`} fill={`rgba(${col},${op})`} />;
              })}
            </svg>
            {/* hanging chains swaying from the rafters (depth props) */}
            {[236, 470, 706].map((cx, i) => { const sway = Math.sin(lf / 34 + i * 1.3) * 5; return (
              <svg key={`ch${i}`} viewBox="0 0 40 300" width={40} height={300} style={{ position: "absolute", left: cx + sway, top: 150, overflow: "visible", opacity: 0.4 }}>
                {Array.from({ length: 14 }, (_, k) => <ellipse key={k} cx={20 + Math.sin(k) * 2} cy={12 + k * 18} rx={4} ry={7} fill="none" stroke="#2A2024" strokeWidth={3} />)}
              </svg>
            ); })}
            {/* rising mid embers (warm hero-side, cold villain-side scatters on the blow) */}
            {Array.from({ length: 18 }, (_, i) => {
              const warm = seed(i) > 0.4;
              const clk = warm ? lf : sf;
              const bx = 120 + seed(i * 1.9) * 760;
              const x = bx + Math.sin((clk + i * 24) / 46) * (16 + seed(i + 3) * 20);
              const y = 700 - ((clk * (0.4 + seed(i + 2) * 0.7) + seed(i + 6) * 720) % 780);
              const sz = 2 + seed(i + 4) * 3.4;
              const op = (0.22 + 0.22 * Math.abs(Math.sin(lf / 18 + i))) * (warm ? (0.7 + swing * 0.5) : Math.max(0.15, menace));
              const col = warm ? "236,150,88" : "120,200,205";
              return <div key={`mg${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgba(${col},${op})`, boxShadow: `0 0 ${5 + sz}px rgba(${col},${op * 0.8})` }} />;
            })}
          </div>

          {/* ============ (b) HERO / NEAR LAYER (full camera 1.0, sharp subjects) ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${camX}px, ${camY}px) scale(${camScale}) rotate(${camRot}deg)`, transformOrigin: "506px 400px", filter: mb > 0.02 ? `blur(${mb * 3.6}px)` : "none" }}>
            {/* drifting particulate/dust (warm hero-side, cold villain-side that scatters on the blow; crawls in slow-mo) */}
            {Array.from({ length: 26 }, (_, i) => {
              const warm = seed(i) > 0.42;
              const clk = warm ? lf : sf;                                 // cold motes crawl during the hit-stop
              const bx = 60 + seed(i * 1.7) * 900;
              const x = bx + Math.sin((clk + i * 30) / 40) * (14 + seed(i + 2) * 22);
              const y = 720 - ((clk * (0.5 + seed(i + 4) * 0.9) + seed(i + 5) * 760) % 800);
              const sz = 1.6 + seed(i + 6) * 3;
              const base = 0.28 + 0.28 * Math.abs(Math.sin(lf / 16 + i));
              const op = base * (warm ? (0.7 + swing * 0.5) : Math.max(0.15, lf < BLOW ? 1 : menace));
              const col = warm ? "255,206,140" : "150,220,210";
              return <div key={`dm${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgba(${col},${op})`, boxShadow: `0 0 ${4 + sz}px rgba(${col},${op * 0.8})`, zIndex: 20 }} />;
            })}

            {/* warm hero-side underglow */}
            <div style={{ position: "absolute", left: -40, top: 400, width: 520, height: 400, background: `radial-gradient(circle at 30% 50%, rgba(214,120,80,${0.24 + swing * 0.16}), transparent 64%)`, filter: "blur(16px)", zIndex: 6 }} />

            {/* ============ THE DOCUMENT - cold AI slop rewritten in YOUR voice (premium note card; page rewrite is the trigger) ============ */}
            <div style={{ position: "absolute", left: 296, top: 344, width: 432, height: 232, zIndex: 24, transform: `perspective(1500px) rotateX(3deg) rotate(-4deg) translateY(${Math.sin(lf / 24) * 3}px)`, transformOrigin: "50% 70%", borderRadius: 18, background: "linear-gradient(160deg, #FEFCF7 0%, #F6F1E6 52%, #ECE4D3 100%)", border: "1px solid rgba(150,120,70,0.30)", boxShadow: `0 2px 1px rgba(255,255,255,0.9) inset, 0 40px 64px -22px rgba(20,12,4,0.66), 0 12px 24px -14px rgba(20,12,4,0.5), 0 0 34px rgba(255,208,140,${0.14 + nibFlare * 0.3 + swing * 0.14})`, overflow: "hidden" }}>
              {/* faint paper grain (fine ruled tooth) + top gloss */}
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(122deg, rgba(120,90,40,0.03) 0 2px, transparent 2px 5px)", opacity: 0.55 }} />
              <div style={{ position: "absolute", left: -60, top: -70, width: 360, height: 240, background: "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.85), transparent 62%)" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)" }} />

              {/* tidy HEADER ROW: app-style icon + mono filename meta + DRAFT v1 tag */}
              <div style={{ position: "absolute", left: 22, top: 18, width: 388, height: 22, display: "flex", alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: "linear-gradient(145deg, #E8A33F, #C97B1E)", boxShadow: "0 2px 6px rgba(180,110,30,0.5), inset 0 1px 1px rgba(255,255,255,0.6)" }} />
                <span style={{ marginLeft: 10, fontFamily: mono, fontSize: 13, letterSpacing: 2, color: "#8A7038", fontWeight: 700 }}>draft_v1.txt</span>
                <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, letterSpacing: 2, color: "#B2A277", padding: "3px 8px", borderRadius: 999, border: "1px solid rgba(150,120,70,0.28)", background: "rgba(150,120,70,0.06)" }}>DRAFT · v1</span>
              </div>
              {/* hairline divider */}
              <div style={{ position: "absolute", left: 22, top: 48, width: 388, height: 1, background: "linear-gradient(90deg, rgba(120,90,40,0.06), rgba(120,90,40,0.34), rgba(120,90,40,0.06))" }} />

              {/* BODY: the sentence on one baseline - cold slop cleanly dissolves, your rewrite reflows crisp */}
              <div style={{ position: "absolute", left: 28, top: 80, width: 376, height: 40 }}>
                {/* COLD AI-SLOP (mono) - types in per char, then dissolves cleanly upward */}
                <div style={{ position: "absolute", left: 0, top: 0, whiteSpace: "pre", fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: 0.4, color: "#5FBBD0" }}>
                  {TXT.split("").map((raw, c) => {
                    const ch = raw === " " ? " " : raw;
                    const on = over(lf, 2 + c * 1.5, 6);
                    const dis = over(lf, 60 + c * 0.55, 14);
                    const op = on * (1 - dis);
                    return <span key={c} style={{ display: "inline-block", opacity: op, transform: `translateY(${-dis * 14}px) scale(${1 - dis * 0.12})`, filter: dis > 0.02 ? `blur(${dis * 3}px)` : "none" }}>{ch}</span>;
                  })}
                  {(() => { const blink = (lf % 16) < 8 ? 1 : 0.25; const fade = 1 - over(lf, 58, 8); return <span style={{ display: "inline-block", width: 2, height: 22, marginLeft: 3, verticalAlign: "-4px", background: "#5FBBD0", opacity: blink * fade * 0.8 }} />; })()}
                </div>
                {/* YOUR REWRITE - clean premium serif, crisp per-letter reflow, NO scrawl/jitter */}
                <div style={{ position: "absolute", left: 0, top: 0, whiteSpace: "pre", fontFamily: fraunces.fontFamily, fontSize: 24, fontWeight: 600, letterSpacing: 0.2, color: "#B8701C" }}>
                  {TXT.split("").map((raw, c) => {
                    const ch = raw === " " ? " " : raw;
                    const rv = over(lf, 62 + c * 1.2, 12, Easing.out(Easing.cubic));
                    return <span key={c} style={{ display: "inline-block", opacity: rv, transform: `translateY(${(1 - rv) * 8}px) scale(${0.9 + rv * 0.1})`, textShadow: `0 1px ${6 * rv}px rgba(184,112,28,${0.32 * rv})` }}>{ch}</span>;
                  })}
                  {/* clean edit caret riding the write head */}
                  <span style={{ position: "absolute", left: Math.min(372, (nibX - 300) * 1.24 + 4), top: -1, width: 2, height: 26, borderRadius: 2, background: "linear-gradient(180deg, #E8A33F, #C97B1E)", opacity: writeProg > 0 && writeProg < 1 ? 0.9 : 0, boxShadow: `0 0 ${6 + nibFlare * 14}px rgba(231,178,76,0.9)` }} />
                </div>
              </div>

              {/* tidy ruled body lines below (reveal L->R as you write; neutral placeholder, no text bleed) */}
              {[150, 174, 198].map((yy, r) => (
                <div key={`rl${r}`} style={{ position: "absolute", left: 28, top: yy, width: (300 - r * 64) * over(lf, 84 + r * 6, 22), height: 3, borderRadius: 2, background: "linear-gradient(90deg, rgba(200,150,80,0.4), rgba(200,150,80,0.12))" }} />
              ))}
            </div>

            {/* ============ THE MORPH - cold glyphs shatter into a warm river that reflows ============ */}
            {Array.from({ length: 60 }, (_, i) => {
              const sx = 96 + (i / 60) * 260 + (seed(i) - 0.5) * 20;
              const sy = 456 + (seed(i + 1) - 0.5) * 30;
              const bStart = 60 + (i / 60) * 12;
              const dur = 30 + seed(i + 7) * 16;
              const prog = over(lf, bStart, dur, Easing.inOut(Easing.cubic));
              const ang = seed(i + 2) * 6.283, dir = seed(i + 3) > 0.5 ? 1 : -1;
              const amp = (18 + seed(i + 5) * 54) * Math.sin(prog * Math.PI);
              const x = sx + prog * ((296 + 60) - sx) + Math.cos(ang + prog * 5 * dir) * amp;
              const y = sy + Math.sin(ang + prog * 5 * dir) * amp * 0.6 - Math.sin(prog * Math.PI) * 40;
              const op = over(lf, bStart, 5) * (0.9 - over(lf, bStart + dur, 20) * 0.7);
              const cr = Math.round(127 + 74 * prog), cg = Math.round(216 - 83 * prog), cb = Math.round(232 - 185 * prog);
              const sz = 2 + seed(i + 8) * 3;
              return <div key={`mp${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgb(${cr},${cg},${cb})`, opacity: op, boxShadow: `0 0 ${4 + sz * 2}px rgba(${cr},${cg},${cb},0.85)`, transform: "translate(-50%,-50%)", zIndex: 26 }} />;
            })}

            {/* ============ THE VILLAIN - gloats, then SHATTERS (upper right) ============ */}
            <div style={{ position: "absolute", inset: 0, zIndex: 30 }}>
              <Generic9000 lf={villainLf} size={300} left={726} top={196} pose={villainPose} menace={menace} flip={-1} z={30} />
            </div>

            {/* SLOW-MO god-ray BURST breaking through the impact point (radial spokes, blooms on the hit-stop) */}
            {(flash > 0 || slowmo > 0) && (
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 32, overflow: "visible", pointerEvents: "none", mixBlendMode: "screen" }}>
                <circle cx={846} cy={322} r={90 + slowmo * 40} fill="url(#s9burst)" opacity={0.4 * flash + 0.3 * slowmo} />
                {Array.from({ length: 14 }, (_, i) => {
                  const a = (i / 14) * 6.283 + lf * 0.01;
                  const len = 220 + seed(i) * 260;
                  const w = 6 + seed(i + 3) * 12;
                  const ex = 846 + Math.cos(a) * len, ey = 322 + Math.sin(a) * len;
                  const px = 846 - Math.sin(a) * w, py = 322 + Math.cos(a) * w;
                  const qx = 846 + Math.sin(a) * w, qy = 322 - Math.cos(a) * w;
                  return <polygon key={`bs${i}`} points={`${px},${py} ${qx},${qy} ${ex},${ey}`} fill="url(#s9warm)" opacity={(0.5 * flash + 0.34 * slowmo) * (0.5 + seed(i + 5) * 0.5)} />;
                })}
              </svg>
            )}

            {/* shatter shock rings */}
            <div style={{ position: "absolute", inset: 0, zIndex: 33, pointerEvents: "none" }}>
              {ring(over(sf, BLOW, 20, Easing.out(Easing.cubic)), "rgba(255,196,118,0.92)", 5)}
              {ring(over(sf, BLOW + 4, 22, Easing.out(Easing.cubic)), "rgba(127,232,255,0.8)", 3)}
            </div>

            {/* mid-plane debris flung on the shatter (the far half of the blast; slow-mo clocked) */}
            {sf >= BLOW && Array.from({ length: 14 }, (_, i) => {
              const p = over(sf, BLOW + 2, 44 + seed(i) * 20, Easing.out(Easing.cubic));
              const a = seed(i * 2.3) * 6.283, sp = 120 + seed(i * 1.7) * 220;
              const x = 846 + Math.cos(a) * sp * p, y = 322 + Math.sin(a) * sp * p * 0.7 + p * p * 140;
              const s = 4 + seed(i + 3) * 8;
              return <div key={`db${i}`} style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.7, borderRadius: 2, background: "linear-gradient(158deg, #6E777D, #30373C)", border: "1px solid #1B2124", opacity: (1 - p) * 0.95, transform: `rotate(${p * (seed(i) - 0.5) * 900}deg)`, zIndex: 34 }} />;
            })}

            {/* ============ THE HERO - gathers, LUNGES, blasts; the words fly from his strike ============ */}
            <div style={{ position: "absolute", inset: 0, zIndex: 36, transform: `translate(${heroX}px, ${heroY}px) scale(${heroSc})`, transformOrigin: "180px 500px" }}>
              <IronClaude lf={lf} size={322} left={54} top={338} pose={heroPose} core={heroCore} flip={1} />
            </div>

            {/* SLOW-MO SPEED-LINES converging on the impact (sells the held blast pose) */}
            {slowmo > 0.02 && (
              <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 40, overflow: "visible", pointerEvents: "none", mixBlendMode: "screen", opacity: slowmo }}>
                {Array.from({ length: 22 }, (_, i) => {
                  const a = (i / 22) * 6.283 + seed(i) * 0.4;
                  const r0 = 300 + seed(i + 2) * 220, r1 = 120 + seed(i + 4) * 70;
                  const x0 = 846 + Math.cos(a) * r0, y0 = 322 + Math.sin(a) * r0;
                  const x1 = 846 + Math.cos(a) * r1, y1 = 322 + Math.sin(a) * r1;
                  return <line key={`sl${i}`} x1={x0} y1={y0} x2={x1} y2={y1} stroke="rgba(255,236,190,0.7)" strokeWidth={2 + seed(i + 6) * 3} strokeLinecap="round" opacity={0.4 + seed(i + 8) * 0.5} />;
                })}
              </svg>
            )}

            {/* ============ THE STRIKE - warm words streak from the page to the villain ============ */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 42, overflow: "visible", pointerEvents: "none", opacity: 1 - ribFade }}>
              <path d={`M636 452 Q 762 356 ${hx.toFixed(0)} ${hy.toFixed(0)}`} fill="none" stroke="rgba(231,178,76,0.32)" strokeWidth={16} strokeLinecap="round" />
              <path d={`M636 452 Q 762 356 ${hx.toFixed(0)} ${hy.toFixed(0)}`} fill="none" stroke="rgba(242,201,122,0.9)" strokeWidth={6} strokeLinecap="round" />
              <path d={`M636 452 Q 762 356 ${hx.toFixed(0)} ${hy.toFixed(0)}`} fill="none" stroke="#FFF3D0" strokeWidth={2.4} strokeLinecap="round" opacity={0.9} />
              {rib < 1 && <circle cx={hx} cy={hy} r={12} fill="#FFF6E2" style={{ filter: "blur(1px)" }} />}
              {rib < 1 && <circle cx={hx} cy={hy} r={5} fill="#FFFFFF" />}
              {Array.from({ length: 12 }, (_, i) => { const tt = Math.min(1, rib * (0.5 + seed(i) * 0.6)); const mx = bez(tt, 636, 762, 846) + (seed(i + 2) - 0.5) * 16; const my = bez(tt, 452, 356, 306) + (seed(i + 3) - 0.5) * 16; return <circle key={`rm${i}`} cx={mx} cy={my} r={1.6 + seed(i + 4) * 2.4} fill="#FFD98A" opacity={rib < 1 ? 0.5 + seed(i + 5) * 0.4 : 0} />; })}
            </svg>

            {/* ============ GAG: the "GENERIC-9000" maker's plate spins off (premium engraved brushed-metal) ============ */}
            <div style={{ position: "absolute", left: gx, top: gy, width: 172, height: 40, zIndex: 46, transform: `rotate(${grot}deg)`, opacity: gop }}>
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 6, background: "linear-gradient(158deg, #3A444A 0%, #232A2F 48%, #161B1F 100%)", border: "1px solid #545F64", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 2px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* brushed-metal diagonal sheen */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)" }} />
                {/* corner rivets */}
                {[[6, 6], [162, 6], [6, 30], [162, 30]].map((p, i) => (
                  <div key={`rv${i}`} style={{ position: "absolute", left: p[0], top: p[1], width: 4, height: 4, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #7B858A, #2A3236)", boxShadow: "0 0 1px rgba(0,0,0,0.6)" }} />
                ))}
                <span style={{ position: "relative", fontFamily: mono, fontSize: 18, fontWeight: 700, letterSpacing: 2, color: "#9BA6AB", textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.06)" }}>GENERIC-9000</span>
              </div>
            </div>
          </div>

          {/* ============ (e) ATMOSPHERE PLANE (own drift 0.56, DOF-soft) - god-rays BREAK THROUGH + warm bloom over the world ============ */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(${atx}px, ${aty}px) scale(${atSc})`, transformOrigin: "506px 400px", filter: `blur(${1.6 + mb * 1.2}px)`, zIndex: 50, pointerEvents: "none", mixBlendMode: "screen" }}>
            {/* warm god-ray shafts breaking through from upper-right, growing hard with the swing */}
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {[
                { p: "902,110 1012,110 724,792 468,792", o: 0.4 },
                { p: "760,110 882,110 560,792 356,792", o: 0.3 },
                { p: "1012,150 1012,520 640,792 470,792", o: 0.28 },
              ].map((s, i) => (
                <polygon key={`atr${i}`} points={s.p} fill="url(#s9warm)" opacity={s.o * (0.22 + swing * 0.98) + flash * 0.3} />
              ))}
            </svg>
            {/* drifting warm bloom motes catching the broken light */}
            {Array.from({ length: 16 }, (_, i) => {
              const x = 140 + seed(i * 2.7) * 760 + Math.sin((lf + i * 33) / 38) * 24;
              const y = 680 - ((lf * (0.5 + seed(i + 3) * 0.8) + seed(i + 7) * 760) % 800);
              const sz = 1.4 + seed(i + 5) * 2.6;
              const op = (0.3 + 0.3 * Math.abs(Math.sin(lf / 14 + i))) * (0.4 + swing * 0.7);
              return <div key={`atm${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgba(255,214,150,${op})`, boxShadow: `0 0 ${6 + sz * 2}px rgba(255,206,140,${op})` }} />;
            })}
            {/* the warm bloom breaking in from the victory side */}
            <div style={{ position: "absolute", right: -60, top: 110, width: 660, height: 640, background: `radial-gradient(circle at 70% 40%, rgba(255,210,140,${0.3 * swing + flash * 0.3}), transparent 60%)` }} />
          </div>

          {/* ============ (a) FOREGROUND (over the lens) - the villain shatters TOWARD the camera ============ */}
          {/* white kill-flash */}
          {flash > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 58, background: `radial-gradient(circle at 74% 42%, rgba(255,248,236,${flash * 0.72}), rgba(255,236,200,${flash * 0.24}) 32%, transparent 60%)`, pointerEvents: "none" }} />}
          {/* warm VICTORY light floods the frame */}
          <div style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none", background: `radial-gradient(92% 82% at 30% 52%, rgba(255,214,140,${0.42 * flood}), rgba(255,182,92,${0.14 * flood}) 40%, transparent 72%)`, mixBlendMode: "screen" }} />
          {/* BIG COLD grey shards flying PAST the lens with MOTION-BLUR TRAILS (near, huge, out of focus; slow-mo clocked) */}
          {sf >= BLOW && Array.from({ length: 14 }, (_, i) => {
            const d0 = seed(i * 1.3) * 5;
            const p = over(sf, BLOW + d0, 24 + seed(i + 4) * 18, Easing.out(Easing.cubic));
            if (p <= 0 || p >= 1) return null;
            const a = (seed(i * 2.1) - 0.5) * 3.2;
            const dist = 260 + seed(i + 2) * 520;
            const ox = 812 + (seed(i + 7) - 0.5) * 90;
            const oy = 320 + (seed(i + 9) - 0.5) * 80;
            const x = ox + Math.sin(a) * dist * p * 1.4 - 130 * p;
            const y = oy + Math.cos(a) * dist * p + p * p * 280;
            const sc = 0.5 + p * (5.4 + seed(i + 1) * 3.4);
            const blur = 2 + p * 15;
            const w = 30 + seed(i + 5) * 48, h = w * (0.5 + seed(i + 6) * 0.5);
            const rot = (seed(i) - 0.5) * 200 + p * (seed(i + 3) - 0.5) * 540;
            const op = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.72) / 0.28));
            // motion-blur streak: elongated along the shard's travel vector, trailing behind it
            const vang = (Math.atan2(y - oy, x - ox) * 180) / Math.PI;
            const tlen = (60 + p * 300) * (0.6 + seed(i + 11) * 0.6) * (1 - slowmo * 0.55); // crawls (short) in slow-mo
            const th = Math.max(6, h * sc * 0.42);
            return (
              <React.Fragment key={`ns${i}`}>
                <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${vang}deg)`, zIndex: 61, pointerEvents: "none" }}>
                  <div style={{ position: "absolute", left: -tlen, top: -th / 2, width: tlen, height: th, borderRadius: th, background: "linear-gradient(90deg, rgba(120,132,140,0) 0%, rgba(110,122,130,0.5) 78%, rgba(150,162,170,0.75) 100%)", filter: `blur(${4 + p * 10}px)`, opacity: op * 0.8 }} />
                </div>
                <div style={{ position: "absolute", left: x, top: y, width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform: `scale(${sc}) rotate(${rot}deg)`, filter: `blur(${blur}px)`, background: "linear-gradient(150deg, #8A959B 0%, #4A545A 46%, #262C31 100%)", clipPath: "polygon(12% 0, 100% 22%, 82% 100%, 0 70%)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", opacity: op, zIndex: 62 }} />
              </React.Fragment>
            );
          })}
          {/* a few WARM sparks sweeping past for the victory read */}
          {sf >= BLOW && Array.from({ length: 6 }, (_, i) => {
            const p = over(sf, BLOW + 2 + seed(i) * 6, 30 + seed(i + 2) * 16, Easing.out(Easing.cubic));
            if (p <= 0 || p >= 1) return null;
            const a = (seed(i * 2.3) - 0.5) * 2.4;
            const x = 300 + Math.sin(a) * 720 * p - 40 * p;
            const y = 470 + Math.cos(a) * 300 * p + p * p * 130;
            const sc = 0.4 + p * 3.2, blur = 1 + p * 10;
            const op = Math.min(1, p * 5) * (1 - Math.max(0, (p - 0.65) / 0.35));
            return <div key={`sp${i}`} style={{ position: "absolute", left: x, top: y, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", transform: `scale(${sc})`, filter: `blur(${blur}px)`, background: "radial-gradient(circle, #FFF3D0, #E8A33F 60%, transparent 72%)", opacity: op, zIndex: 64 }} />;
          })}

          {/* ============ (a2) NEAR FOREGROUND SILHOUETTES (parallax 1.22, heavy DOF) - rafter cables + broken beam + rubble framing the lens ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 57, pointerEvents: "none", transform: `translate(${camX * 1.22 + shX * 0.6}px, ${camY * 1.22}px) scale(1.04)`, transformOrigin: "506px 400px", filter: `blur(${5 + mb * 8}px)` }}>
            <svg viewBox="0 0 1012 792" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              {/* draped cables sagging across the top corners */}
              <path d="M-60 40 Q160 150 340 70" fill="none" stroke="#050405" strokeWidth={10} opacity={0.85} />
              <path d="M-40 -6 Q120 84 260 22" fill="none" stroke="#070608" strokeWidth={6} opacity={0.75} />
              <path d="M1080 30 Q900 150 720 60" fill="none" stroke="#050405" strokeWidth={12} opacity={0.8} />
              {/* a broken rafter beam jutting in from the top-right */}
              <polygon points="1012,-10 1012,124 720,42 762,-10" fill="#040305" opacity={0.82} />
              {/* foreground rubble chunks bottom-right (away from the hero) */}
              <polygon points="1012,792 1012,598 838,690 902,792" fill="#050406" opacity={0.85} />
              <polygon points="762,792 700,712 640,792" fill="#060507" opacity={0.7} />
            </svg>
            {/* big out-of-focus near motes drifting past the lens (depth) */}
            {Array.from({ length: 8 }, (_, i) => { const x = 40 + seed(i * 5.1) * 940; const y = 760 - ((lf * (0.7 + seed(i + 3)) + seed(i + 6) * 800) % 860); const sz = 8 + seed(i) * 16; const op = 0.12 + 0.12 * Math.abs(Math.sin(lf / 12 + i)); return <div key={`nf${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, borderRadius: "50%", background: `rgba(${seed(i) > 0.5 ? "255,206,140" : "120,150,150"},${op})`, filter: "blur(6px)" }} />; })}
          </div>

          {/* ============ COLOR GRADE + VIGNETTE (complementary; cold burns off as the palette swings warm) ============ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 74, pointerEvents: "none", mixBlendMode: "soft-light", background: `linear-gradient(104deg, rgba(214,124,64,${0.14 + swing * 0.16}) 0%, rgba(0,0,0,0) 44%, rgba(0,0,0,0) 58%, rgba(46,150,150,${0.16 * (1 - swing) * menace}) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 75, pointerEvents: "none", background: "radial-gradient(122% 100% at 50% 46%, transparent 44%, rgba(4,4,8,0.52) 100%)" }} />

          {/* ============ FILM GRAIN (shimmering, soft-light texture) ============ */}
          <svg width="100%" height="100%" viewBox="0 0 1012 792" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 78, pointerEvents: "none", mixBlendMode: "soft-light", opacity: 0.5 }}>
            <filter id="s9grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(lf) % 40} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="1012" height="792" filter="url(#s9grain)" opacity="0.6" />
          </svg>

          {/* ============ STABLE OVERLAYS (do not ride the camera) ============ */}
          <Pill text="full setup in the guide" x={368} y={632} o={0.6} />
          <CornerGauntlets lf={lf} wake={0.6 + over(lf, BLOW, 24) * 0.4} />
        </>
      );
    })()}
  </Panel>
);

const S10: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="jarvis · part 2 · hands">
    {(() => {
      // ===== BEAT MAP (108f) - the PART 2 cliffhanger =====
      // 0-14   aftermath: villain wreckage smoulders on the forge floor, hero stands
      // 10-38  an overhead RIG lowers the PART-2 gauntlets on cables (sparks, chains, hazard strobe)
      // 34-52  LOCK-ON: plates slam onto the forearms, bolt rings seat, light runs up the arms
      // 50-78  HUD boots + capability chips fly in and get pulled into the fists
      // 74-92  CLENCH: shockwave ring, flare, screen kick, chips burst
      // 88-100 "PART 2" plate slams in
      // 96-108 cut to black
      const CX = 506;
      const HX = 416, HY = 300, HS = 300;
      const handY = HY + HS * 0.6;

      const clear = over(lf, 2, 26);
      const DROP = 10, LOCK = 34, HUDB = 50, CLENCH = 74, PLATE = 88;
      const drop = over(lf, DROP, 26, Easing.inOut(Easing.cubic));
      const lock = over(lf, LOCK, 14, Easing.out(Easing.back(2.2)));
      const retract = over(lf, LOCK + 10, 22, Easing.in(Easing.cubic));
      const hud = over(lf, HUDB, 18);
      const clench = over(lf, CLENCH, 7, Easing.out(Easing.cubic));
      const flare = over(lf, CLENCH, 5) * (1 - over(lf, CLENCH + 9, 14));
      const ring = over(lf, CLENCH, 22);
      const ring2 = over(lf, CLENCH + 6, 24);
      const plate = over(lf, PLATE, 9, Easing.out(Easing.back(1.7)));
      const toBlack = over(lf, 96, 12);

      const core = Math.min(1, 0.22 + clear * 0.14 + lock * 0.32 + hud * 0.16 + clench * 0.22);
      const pose = lf < LOCK ? "idle" : lf < CLENCH ? "charge" : "victory";

      // camera: slow push in, hard kick on the clench
      const push = over(lf, 0, 100, Easing.inOut(Easing.cubic));
      const camScale = 1.03 + push * 0.14 + flare * 0.04;
      const kickX = flare * Math.sin(lf * 3.1) * 7;
      const kickY = flare * Math.cos(lf * 2.6) * 4;
      const strobe = 0.5 + 0.5 * Math.sin(lf * 0.42);

      // the cradle that carries the gauntlets down
      const cradleY = -120 + drop * (handY + 80) - retract * 620;
      const cableSway = Math.sin(lf * 0.07) * (1 - lock) * 5;

      // capability chips: what "hands" actually means - they converge into the fists
      const CHIPS = [
        { t: "SEND", a: -164, d: 0 },
        { t: "SCHEDULE", a: -122, d: 4 },
        { t: "DEPLOY", a: -58, d: 8 },
        { t: "FILE", a: -16, d: 12 },
        { t: "BOOK", a: 28, d: 16 },
      ];

      const embers = Array.from({ length: 34 }, (_, k) => {
        const sd = seed(k + 3);
        const x = 60 + seed(k * 2.1) * 900;
        const yy = 760 - ((lf * (0.8 + sd * 1.9) + seed(k) * 760) % 760);
        return { x, y: yy, o: (0.2 + sd * 0.42) * (0.45 + lock * 0.55), r: 1.2 + sd * 2.8 };
      });

      return (
        <>
          <div style={{ position: "absolute", inset: 0, transform: `translate(${kickX}px,${kickY}px) scale(${camScale})`, transformOrigin: "50% 60%" }}>
            <Stage lf={lf} energy={0.35 + lock * 0.45} hue="crimson" grid={false} />

            {/* ---- P1 deep furnace wall (heavily blurred, slow drift) ---- */}
            <div style={{ position: "absolute", inset: -40, zIndex: 1, filter: "blur(16px)", transform: `translateX(${Math.sin(lf * 0.006) * 8}px) scale(${1.04 - push * 0.03})` }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 70% at 50% 78%, rgba(196,74,58,0.42), rgba(38,16,14,0.9) 62%, rgba(8,7,10,1) 100%)" }} />
              {Array.from({ length: 7 }, (_, k) => (
                <div key={`fw${k}`} style={{ position: "absolute", left: -60, right: -60, top: 90 + k * 96, height: 26, background: `rgba(255,150,80,${0.06 + seed(k) * 0.07})` }} />
              ))}
            </div>

            {/* ---- P2 far gantry trusses (silhouettes, blurred) ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "blur(6px)", opacity: 0.9, transform: `translateX(${Math.sin(lf * 0.009) * 13}px) scale(${1 - push * 0.05})` }}>
              {Array.from({ length: 6 }, (_, k) => {
                const x = 30 + k * 178 + seed(k) * 40;
                const h = 240 + seed(k * 3) * 200;
                return (
                  <div key={`gt${k}`} style={{ position: "absolute", left: x, top: 0, width: 26 + seed(k * 5) * 16, height: h, background: "linear-gradient(180deg, rgba(14,12,16,0.95), rgba(20,16,18,0.7))", borderRight: "2px solid rgba(255,170,100,0.28)" }} />
                );
              })}
              {Array.from({ length: 3 }, (_, k) => (
                <div key={`cw${k}`} style={{ position: "absolute", left: -20, right: -20, top: 150 + k * 120, height: 12, background: "rgba(12,10,14,0.85)" }} />
              ))}
            </div>

            {/* ---- P3 god-ray shafts raking down through the haze ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 3, mixBlendMode: "screen", opacity: 0.5 + lock * 0.35 }}>
              {Array.from({ length: 4 }, (_, k) => {
                const x = 150 + k * 230;
                return (
                  <div key={`gr${k}`} style={{ position: "absolute", left: x, top: -30, width: 150 + seed(k) * 90, height: 700, background: `linear-gradient(180deg, rgba(255,226,180,${0.2 + seed(k) * 0.12}), rgba(255,190,130,0.05) 58%, transparent)`, clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)", filter: "blur(5px)", transform: `translateX(${Math.sin(lf * 0.012 + k) * 7}px)` }} />
                );
              })}
            </div>

            {/* ---- P4 molten channel across the floor + reflected heat ---- */}
            <div style={{ position: "absolute", left: -30, right: -30, top: 646, height: 26, zIndex: 4, borderRadius: 14, background: "linear-gradient(90deg, rgba(255,120,50,0.25), rgba(255,196,110,0.85) 34%, rgba(255,120,50,0.3) 72%, rgba(255,170,90,0.6))", filter: `blur(${2.5 + Math.sin(lf * 0.1) * 0.7}px)`, boxShadow: "0 0 70px rgba(255,150,70,0.55)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 672, height: 120, zIndex: 4, background: "linear-gradient(180deg, rgba(255,150,80,0.3), transparent)", filter: "blur(12px)" }} />

            {/* ---- P5 villain wreckage smouldering on the floor (the fight is over) ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 6, opacity: 0.95 - retract * 0.15 }}>
              {Array.from({ length: 9 }, (_, k) => {
                const sd = seed(k * 7 + 2);
                const x = k < 5 ? 70 + sd * 200 : 700 + sd * 230;
                const y = 600 + sd * 60;
                const w = 30 + sd * 62, h = 12 + sd * 22;
                const rot = (sd - 0.5) * 70;
                return (
                  <div key={`wk${k}`} style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `rotate(${rot}deg)`, background: "linear-gradient(158deg, rgba(74,82,88,0.95), rgba(34,40,46,0.95))", border: "1px solid rgba(110,122,130,0.6)", borderRadius: 3, boxShadow: "0 8px 16px -6px rgba(0,0,0,0.8)" }} />
                );
              })}
              {Array.from({ length: 5 }, (_, k) => {
                const sd = seed(k * 11 + 5);
                const x = k < 3 ? 110 + sd * 170 : 730 + sd * 190;
                const blink = Math.max(0, Math.sin(lf * (0.06 + sd * 0.05) + k)) * (1 - clear * 0.5);
                return <div key={`ld${k}`} style={{ position: "absolute", left: x, top: 612 + sd * 50, width: 5, height: 5, borderRadius: "50%", background: "#5AD5C6", opacity: 0.35 + blink * 0.5, boxShadow: `0 0 ${6 + blink * 10}px rgba(90,213,198,0.9)` }} />;
              })}
            </div>

            {/* ---- P6 hanging chains, swinging ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 8, opacity: 0.8 }}>
              {Array.from({ length: 5 }, (_, k) => {
                const x = 80 + k * 214 + seed(k * 4) * 40;
                const len = 190 + seed(k * 6) * 170;
                const sw = Math.sin(lf * 0.05 + k * 1.3) * 6;
                return (
                  <div key={`ch${k}`} style={{ position: "absolute", left: x, top: -10, width: 7, height: len, transform: `rotate(${sw * 0.25}deg)`, transformOrigin: "50% 0%" }}>
                    {Array.from({ length: Math.floor(len / 15) }, (_, j) => (
                      <div key={j} style={{ position: "absolute", left: 0, top: j * 15, width: 7, height: 11, borderRadius: 3, border: "1.5px solid rgba(168,152,134,0.95)", boxShadow: "0 0 4px rgba(255,180,110,0.35)" }} />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* ---- P7 THE DESCENDING RIG: cables + hazard lamp + the PART-2 gauntlet cradle ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 26, opacity: 1 - retract * 0.9 }}>
              {[-118, 118].map((dx, k) => (
                <div key={`cb${k}`} style={{ position: "absolute", left: CX + dx + cableSway * (k === 0 ? 1 : -1), top: -20, width: 4, height: Math.max(0, cradleY + 40), background: "linear-gradient(180deg, rgba(150,140,130,0.5), rgba(196,186,170,0.95))", boxShadow: "0 0 8px rgba(0,0,0,0.6)" }} />
              ))}
              <div style={{ position: "absolute", left: CX - 168, top: cradleY, width: 336, height: 30, transform: `translateX(${cableSway}px)`, borderRadius: 6, background: "linear-gradient(180deg, #7C8288, #3A4046)", border: "2px solid rgba(180,190,196,0.7)", boxShadow: "0 14px 26px -10px rgba(0,0,0,0.85)" }}>
                <div style={{ position: "absolute", left: 12, top: 8, width: 40, height: 14, borderRadius: 3, background: `rgba(255,176,60,${0.35 + strobe * 0.6})`, boxShadow: `0 0 ${8 + strobe * 16}px rgba(255,170,60,0.9)` }} />
                <div style={{ position: "absolute", right: 12, top: 8, width: 40, height: 14, borderRadius: 3, background: `rgba(255,176,60,${0.35 + (1 - strobe) * 0.6})`, boxShadow: `0 0 ${8 + (1 - strobe) * 16}px rgba(255,170,60,0.9)` }} />
                <div style={{ position: "absolute", left: 74, right: 74, top: 11, height: 8, borderRadius: 4, background: "repeating-linear-gradient(115deg, rgba(255,176,60,0.85) 0 8px, rgba(30,26,24,0.9) 8px 16px)" }} />
              </div>
              {/* spark shower raining off the rig as it lowers */}
              {drop > 0.02 && drop < 0.99 && Array.from({ length: 14 }, (_, k) => {
                const sd = seed(k * 5 + 9);
                const t = ((lf * (1.6 + sd * 2.2) + sd * 60) % 60) / 60;
                return (
                  <div key={`sp${k}`} style={{ position: "absolute", left: CX - 150 + sd * 300, top: cradleY + 30 + t * 190, width: 2, height: 9 + sd * 10, borderRadius: 2, background: "linear-gradient(180deg, rgba(255,236,190,0.95), rgba(255,150,60,0))", opacity: (1 - t) * 0.9 }} />
                );
              })}
              {[-92, 92].map((dx, k) => {
                const rel = lock;
                const gy = cradleY + 34 + rel * (handY - (cradleY + 34)) * 0.92;
                const gx = CX + dx + cableSway - rel * dx * 0.42;
                return (
                  <div key={`gv${k}`} style={{ position: "absolute", left: gx - 30, top: gy, width: 60, height: 72, transform: `rotate(${(1 - rel) * (k === 0 ? -14 : 14)}deg)`, opacity: 1 - lock * 0.92 }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "12px 12px 8px 8px", background: `linear-gradient(158deg, ${IRON}, #7E2C27)`, border: `2px solid ${IRONG}`, boxShadow: "0 10px 22px -8px rgba(0,0,0,0.8)" }} />
                    <div style={{ position: "absolute", left: 16, top: 22, width: 28, height: 28, borderRadius: "50%", background: `radial-gradient(circle, rgba(234,251,255,${0.5 + lock * 0.5}), ${HUD} 55%, rgba(20,60,80,0.9))`, boxShadow: `0 0 ${10 + lock * 22}px rgba(127,232,255,0.9)` }} />
                    <div style={{ position: "absolute", left: 8, bottom: 8, width: 44, height: 5, borderRadius: 3, background: IRONG, opacity: 0.85 }} />
                  </div>
                );
              })}
            </div>

            {/* ---- reactor bloom behind the hero ---- */}
            <div style={{ position: "absolute", left: CX - 220, top: (HY + HS * 0.5) - 220, width: 440, height: 440, zIndex: 20, borderRadius: "50%", background: `radial-gradient(circle, rgba(127,232,255,${0.1 + core * 0.2 + flare * 0.3}), transparent 66%)`, filter: "blur(16px)" }} />

            {/* ---- THE HERO ---- */}
            <IronClaude lf={lf} size={HS} left={HX} top={HY} pose={pose} core={core} />

            {/* ---- LOCK-ON impact: bolt rings seating on each forearm ---- */}
            {lock > 0.02 && [-78, 78].map((dx, k) => {
              const s = Math.min(1, lock * 1.15);
              const R = 20 + (1 - s) * 46;
              return (
                <div key={`bl${k}`} style={{ position: "absolute", left: CX + dx - R, top: handY - R + 6, width: R * 2, height: R * 2, zIndex: 34, borderRadius: "50%", border: `${Math.max(1.5, 4 - s * 2)}px solid rgba(231,178,76,0.9)`, boxShadow: `0 0 ${12 + s * 18}px rgba(255,196,110,${0.5 * s})`, transform: `rotate(${s * 140}deg)`, opacity: (1 - s * 0.15) * (1 - hud) }} />
              );
            })}

            {/* ---- HUD boot: targeting reticles + status readout by the fists ---- */}
            {hud > 0.02 && (
              <div style={{ position: "absolute", inset: 0, zIndex: 36, opacity: hud * (1 - clench) }}>
                {[-78, 78].map((dx, k) => (
                  <div key={`rt${k}`} style={{ position: "absolute", left: CX + dx - 44, top: handY - 38, width: 88, height: 88 }}>
                    <div style={{ position: "absolute", inset: 0, border: "1.6px solid rgba(127,232,255,0.75)", borderRadius: 8, transform: `rotate(${45 + lf * 1.1}deg)` }} />
                    <div style={{ position: "absolute", left: 26, top: 26, width: 36, height: 36, border: "1.4px solid rgba(127,232,255,0.9)", borderRadius: "50%" }} />
                    {[0, 90, 180, 270].map((a) => (
                      <div key={a} style={{ position: "absolute", left: 43, top: 4, width: 2, height: 12, background: HUD, transformOrigin: "1px 40px", transform: `rotate(${a}deg)` }} />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* ---- capability chips converging into the fists (what "hands" means) ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 40 }}>
              {CHIPS.map((c) => {
                const app = over(lf, HUDB + c.d, 10);
                if (app <= 0.01) return null;
                const pull = over(lf, HUDB + c.d + 4, 22, Easing.in(Easing.cubic));
                const burst = over(lf, CLENCH, 8, Easing.out(Easing.cubic));
                const R = (356 - pull * 282) + burst * 430;
                const rad = (c.a * Math.PI) / 180;
                const x = CX + Math.cos(rad) * R;
                const y = handY + Math.sin(rad) * R * 0.66;
                const sc = (0.72 + app * 0.28) * (1 - pull * 0.34) * (1 + burst * 0.5);
                const fs = 15;
                const w = c.t.length * fs * 0.64 + 30;
                const op = app * (1 - burst) * (1 - pull * 0.15);
                return (
                  <div key={c.t} style={{ position: "absolute", left: x - w / 2, top: y - 17, width: w, height: 34, transform: `scale(${sc})`, opacity: op, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "linear-gradient(158deg, rgba(18,30,42,0.97), rgba(10,18,28,0.97))", border: `1.6px solid rgba(127,232,255,${0.55 + pull * 0.4})`, boxShadow: `0 0 ${10 + pull * 22}px rgba(127,232,255,${0.3 + pull * 0.4})` }}>
                    <span style={{ fontFamily: mono, fontSize: fs, letterSpacing: 1.2, color: "#DFF3F8", whiteSpace: "nowrap" }}>{c.t}</span>
                  </div>
                );
              })}
            </div>

            {/* ---- CLENCH: double shockwave rings ---- */}
            {[ring, ring2].map((rr, k) => (rr > 0 && rr < 1 ? (
              <div key={`sr${k}`} style={{ position: "absolute", left: CX - (40 + rr * 400), top: (HY + HS * 0.5) - (40 + rr * 400), width: (40 + rr * 400) * 2, height: (40 + rr * 400) * 2, zIndex: 44, borderRadius: "50%", border: `${Math.max(1, 6 - rr * 5)}px solid rgba(127,232,255,${(1 - rr) * (k === 0 ? 0.85 : 0.5)})`, boxShadow: `0 0 26px rgba(127,232,255,${(1 - rr) * 0.5})` }} />
            ) : null))}

            {/* ---- clench flare ---- */}
            {flare > 0.01 && <div style={{ position: "absolute", left: CX - 340, top: (HY + HS * 0.5) - 340, width: 680, height: 680, zIndex: 46, borderRadius: "50%", background: `radial-gradient(circle, rgba(234,251,255,${0.72 * flare}) 0%, rgba(127,232,255,${0.42 * flare}) 34%, transparent 62%)`, mixBlendMode: "screen" }} />}

            {/* ---- P9 foreground embers streaking past the lens ---- */}
            <div style={{ position: "absolute", inset: 0, zIndex: 50, filter: "blur(1.4px)" }}>
              {embers.map((e, k) => <div key={`em${k}`} style={{ position: "absolute", left: e.x, top: e.y, width: e.r, height: e.r, borderRadius: "50%", background: "#FFC271", opacity: e.o, boxShadow: "0 0 7px rgba(255,170,90,0.85)" }} />)}
            </div>

            {/* ---- "PART 2" plate slams in ---- */}
            {plate > 0.01 && (
              <div style={{ position: "absolute", left: CX - 210, top: 200, width: 420, zIndex: 60, transform: `scale(${0.82 + plate * 0.18})`, opacity: plate }}>
                <div style={{ position: "relative", padding: "12px 0 14px", borderRadius: 12, textAlign: "center", background: "linear-gradient(158deg, rgba(20,16,18,0.94), rgba(10,8,10,0.94))", border: `2px solid ${IRONG}`, boxShadow: "0 18px 40px -14px rgba(0,0,0,0.9)" }}>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1, color: CREAM, letterSpacing: 1 }}>PART 2</div>
                  <div style={{ fontFamily: mono, fontSize: 14, letterSpacing: 3, color: IRONG, marginTop: 6 }}>IT GETS HANDS</div>
                </div>
              </div>
            )}
          </div>

          {/* hard cut to black at the very end (the tease) */}
          {toBlack > 0 && <div style={{ position: "absolute", inset: 0, background: "#05060a", opacity: toBlack, zIndex: 200 }} />}
        </>
      );
    })()}
  </Panel>
);

const S11: React.FC<{ lf: number }> = ({ lf }) => (
  (() => {
    // ===== HERO SPLASH: victorious IronClaude, radial god-ray BURST, DAY 1 SETUP doc SLAMS to the lens =====
    // ===== RE-SHOT: hard PUSH-IN, 5 true parallax planes, warm-key/cool-rim split, god-rays + bloom + haze =====
    // ===== BG-DEEPENED: grand celebratory HALL (colonnade + vaulted arch), cheering CROWD-GLOW void, =====
    // =====             victory BANNERS, hanging CHANDELIERS, falling CONFETTI, REFLECTIVE floor, LENS FLARES =====
    const CX = 506, CY = 449;                                                  // hero chest arc-reactor = the splash origin
    const GX = 506, GY = 424;                                                  // god-ray radiant point (just behind reactor)
    const push = over(lf, 0, 56, Easing.out(Easing.cubic));                    // triumphant push-in, whole scene
    const SLAM = 34;                                                            // the doc-impact frame
    const kick = Math.max(0, 1 - Math.abs(lf - SLAM) / 6);                     // camera punch on the slam
    const finale = over(lf, 40, 16, Easing.out(Easing.cubic));                 // 3rd-act bloom (never freeze)
    const pulse = 0.5 + 0.5 * Math.sin(lf / 6);
    const pulse2 = 0.5 + 0.5 * Math.sin(lf / 4.2 + 1.3);
    const breathe = 0.5 + 0.5 * Math.sin(lf / 9 + 0.6);
    const hallIn = over(lf, 0, 22, Easing.out(Easing.cubic));                  // grand-hall settle-in

    // ---- PARALLAX RIG: 5 planes, far barely moves, near punches hardest (real depth push-in) ----
    const atmosScale = 1 + push * 0.02;                                        // (e) ATMOSPHERE, deepest, DOF
    const bgScale = 1 + push * 0.035;                                          // (d) FAR backdrop
    const farScale = 1 + push * 0.06;                                          // rays / midground bloom
    const cam = 1 + push * 0.14 + kick * 0.035;                               // (b) HERO plane
    const nearScale = 1 + push * 0.19 + kick * 0.05;                          // (a) FOREGROUND doc + motes
    // subtle triumphant crane: the world lifts a touch as it pushes in
    const craneY = -push * 10 + kick * 4;

    // ---- HERO is ACTIVE: surges UP into victory, braces on the impact ----
    const rise = over(lf, 0, 20, Easing.out(Easing.cubic));
    const heroY = (1 - rise) * 58;
    const brace = Math.max(0, 1 - Math.abs(lf - SLAM) / 5);
    const heroScale = 0.92 + rise * 0.1 + brace * 0.03;
    const blaze = 0.55 + 0.45 * over(lf, 4, 22);

    // ---- convergence -> burst ----
    const flash = interpolate(lf, [6, 13, 26], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const ringP = over(lf, 10, 22, Easing.out(Easing.cubic));
    const ring2 = over(lf, 12, 16, Easing.out(Easing.cubic));
    const ring3 = over(lf, 15, 20, Easing.out(Easing.cubic));

    // ---- the SETUP doc rushes TOWARD camera, huge, lands lower-left foreground ----
    const DS = 22;
    const docIn = over(lf, DS, 13, Easing.out(Easing.back(1.4)));
    const docFade = over(lf, DS, 4);
    const jolt = Math.max(0, 1 - Math.abs(lf - SLAM) / 5) * (lf > DS ? 1 : 0);
    const dScale = 0.30 + docIn * 0.82;
    const dTX = (1 - docIn) * 150;
    const dTY = (1 - docIn) * -140 + jolt * 8;
    const dRot = -6 + (1 - docIn) * -16 + jolt * 1.6;
    const DCX = 278, DCY = 448;                                                 // landed-doc centre = the convergence target

    // ---- GAG: the soulless knockoff finally crumbles, swept off in the corner ----
    const villainFade = 1 - over(lf, 2, 12);

    // ---- JARVIS keyword resolves + IGNITES with a flare, then keeps breathing ----
    const jp = over(lf, 28, 12, Easing.out(Easing.cubic));
    const jpop = 0.74 + 0.26 * over(lf, 28, 16, Easing.out(Easing.back(1.5))) + finale * 0.03;
    const IGN = 40;                                                             // the JARVIS ignition frame
    const ignite = Math.max(0, 1 - Math.abs(lf - IGN) / 5);                     // sharp flare spike on ignition
    const igniteHold = over(lf, IGN, 20);                                       // sustained glow after the flare

    return (
      <Panel label="deploy · day 1">

        {/* ============================ (e) ATMOSPHERE PLANE (deepest, heavy DOF, haze + motes) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${craneY * 0.3}px) scale(${atmosScale})`, filter: "blur(5px) saturate(1.1)", pointerEvents: "none" }}>
          {/* multi-stop furnace-to-void gradient, never a flat fill */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(150% 120% at 50% 26%, rgba(78,42,16,0.62) 0%, rgba(40,30,20,0.5) 30%, rgba(16,22,34,0.78) 66%, rgba(5,10,18,0.96) 100%)` }} />
          {/* NEW: vaulted grand-hall ceiling glow arcing across the very top */}
          <div style={{ position: "absolute", left: CX, top: -230, width: 1240, height: 560, marginLeft: -620, borderRadius: "0 0 50% 50%", background: `radial-gradient(60% 100% at 50% 0%, rgba(255,196,110,${0.16 + 0.06 * breathe}) 0%, rgba(150,90,60,0.10) 46%, transparent 74%)`, filter: "blur(28px)" }} />
          {/* warm nebula bloom drifting behind everything */}
          <div style={{ position: "absolute", left: CX - 40 + Math.sin(lf / 50) * 20, top: 150, width: 1000, height: 720, marginLeft: -500, marginTop: -170, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,168,88,${0.16 + 0.07 * breathe}) 0%, rgba(120,70,150,0.10) 42%, transparent 66%)`, filter: "blur(30px)" }} />
          {/* cool complementary haze pooling at the lower edges */}
          <div style={{ position: "absolute", left: 0, bottom: -60, width: 1012, height: 360, background: `radial-gradient(120% 100% at 50% 100%, rgba(30,74,104,${0.28 + 0.08 * pulse2}), transparent 70%)`, filter: "blur(26px)" }} />
        </div>

        {/* ============================ (d) FAR BACKDROP PLANE (DOF, grand hall the hero just saved) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${craneY * 0.5}px) scale(${bgScale})`, filter: "blur(3.2px) saturate(1.16)", pointerEvents: "none" }}>
          {/* deep silhouetted skyline props */}
          {Array.from({ length: 9 }, (_, i) => {
            const bw = 70 + seed(i) * 120;
            const bh = 150 + seed(i + 3) * 300;
            const bx = i * 118 - 40;
            const sway = Math.sin(lf / 40 + i) * 2;
            const rim = 0.3 + 0.5 * seed(i + 5);
            return <div key={`tower${i}`} style={{ position: "absolute", left: bx + sway, bottom: 0, width: bw, height: bh, background: `linear-gradient(180deg, rgba(24,32,44,0.7), rgba(9,15,23,0.96))`, borderRadius: "3px 3px 0 0", boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 2px 0 12px rgba(255,150,70,${0.14 * rim})` }} />;
          })}

          {/* NEW: GRAND VAULTED ARCH framing the hall behind the hero */}
          <div style={{ position: "absolute", left: CX, top: 40, width: 720 * hallIn + 40, height: 620, marginLeft: -(720 * hallIn + 40) / 2, borderRadius: "50% 50% 0 0 / 60% 60% 0 0", border: "10px solid rgba(40,50,66,0.66)", borderBottom: "none", boxShadow: `inset 0 40px 90px rgba(0,0,0,0.5), 0 0 40px rgba(255,168,90,${0.12 * hallIn})`, opacity: hallIn }} />
          <div style={{ position: "absolute", left: CX, top: 66, width: 600 * hallIn, height: 560, marginLeft: -(600 * hallIn) / 2, borderRadius: "50% 50% 0 0 / 60% 60% 0 0", border: "3px solid rgba(214,150,84,0.34)", borderBottom: "none", opacity: hallIn * (0.5 + 0.5 * pulse) }} />

          {/* NEW: symmetrical COLONNADE of hall pillars receding down both flanks */}
          {Array.from({ length: 8 }, (_, i) => {
            const side = i % 2 === 0 ? 0 : 1;                                   // 0 = left, 1 = right
            const idx = Math.floor(i / 2);                                      // 0..3 depth rank
            const inset = 26 + idx * 62;
            const px = side === 0 ? inset : 1012 - inset;
            const pw = 46 - idx * 6;
            const ph = 470 - idx * 44;
            const glow = 0.10 + 0.10 * seed(i + 2);
            return (
              <div key={`col${i}`} style={{ position: "absolute", left: px - pw / 2, bottom: 0, width: pw, height: ph * hallIn, opacity: hallIn }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, rgba(12,18,26,0.95), rgba(46,56,72,0.85) 46%, rgba(10,16,24,0.95))`, borderRadius: "4px 4px 0 0", boxShadow: `inset 0 0 22px rgba(0,0,0,0.55), 0 0 18px rgba(255,160,80,${glow})` }} />
                {/* pillar capital + base */}
                <div style={{ position: "absolute", left: -6, top: 0, width: pw + 12, height: 14, background: "rgba(52,62,80,0.9)", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: -6, bottom: 0, width: pw + 12, height: 12, background: "rgba(30,38,52,0.95)" }} />
                {/* warm rim catching the victory light */}
                <div style={{ position: "absolute", [side === 0 ? "right" : "left"]: 0, top: 0, width: 3, height: "100%", background: `linear-gradient(180deg, rgba(255,196,120,${0.4 + 0.3 * pulse}), transparent)` }} />
              </div>
            );
          })}

          {/* NEW: CHEERING CROWD-GLOW VOID -- a band of bobbing silhouette heads packing the base */}
          <div style={{ position: "absolute", left: 0, bottom: 0, width: 1012, height: 150, opacity: hallIn }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent, rgba(255,176,96,${0.14 + 0.06 * pulse}) 60%, rgba(120,150,190,0.10))`, filter: "blur(10px)" }} />
            {Array.from({ length: 30 }, (_, i) => {
              const cxp = i * 34 + (seed(i) - 0.5) * 16;
              const hs = 15 + seed(i + 2) * 12;
              const bob = Math.sin(lf / 5 + i * 1.3) * (3 + seed(i + 4) * 4);   // the crowd cheering / bobbing
              const cheer = 0.5 + 0.5 * Math.sin(lf / 4 + i);
              return (
                <div key={`crowd${i}`} style={{ position: "absolute", left: cxp, bottom: -6 + bob, width: hs, height: hs * 1.5 }}>
                  <div style={{ position: "absolute", left: 0, bottom: 0, width: hs, height: hs * 1.2, borderRadius: "50% 50% 40% 40%", background: "rgba(8,12,20,0.92)" }} />
                  {/* raised-arm hint + rim glow */}
                  <div style={{ position: "absolute", left: -2, top: -6, width: hs + 4, height: 8, borderRadius: 6, background: `rgba(255,196,120,${0.16 * cheer})`, filter: "blur(3px)" }} />
                </div>
              );
            })}
            {/* twinkling phone-light specks over the crowd */}
            {Array.from({ length: 16 }, (_, i) => {
              const sx = seed(i + 20) * 1012;
              const sy = 110 - seed(i + 11) * 70;
              const tw = 0.4 + 0.6 * Math.sin(lf / 3 + i * 2.1);
              return <div key={`ph${i}`} style={{ position: "absolute", left: sx, top: sy, width: 3, height: 3, borderRadius: "50%", background: i % 3 === 0 ? "#BEF3FF" : "#FFE7B0", opacity: 0.5 * tw, boxShadow: `0 0 6px ${i % 3 === 0 ? HUD : GOLD}` }} />;
            })}
          </div>

          {/* NEW: REFLECTIVE HALL FLOOR catching the hero + crowd glow */}
          <div style={{ position: "absolute", left: 0, bottom: 0, width: 1012, height: 130, background: `linear-gradient(180deg, transparent, rgba(30,40,58,0.5) 40%, rgba(14,22,34,0.85))`, opacity: hallIn }} />
          <div style={{ position: "absolute", left: CX - 150, bottom: 0, width: 300, height: 120, background: `radial-gradient(60% 100% at 50% 0%, rgba(255,206,120,${0.22 + 0.12 * pulse + 0.1 * finale}), transparent 72%)`, filter: "blur(14px)", opacity: hallIn }} />

          {/* faint horizon warmth breaking through the skyline */}
          <div style={{ position: "absolute", left: CX, top: 300, width: 900, height: 500, marginLeft: -450, marginTop: -180, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,170,90,${0.16 + 0.08 * pulse}), transparent 60%)`, filter: "blur(24px)" }} />
        </div>

        {/* ============================ (c) MIDGROUND PLANE: god-rays + far bloom + embers (DOF soft) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 4, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${craneY * 0.7}px) scale(${farScale})`, filter: "blur(1.3px)" }}>
          <Stage lf={lf} energy={1} hue="warm" grid />

          {/* NEW: hanging VICTORY BANNERS draping from the vault, flanking the hero */}
          {[0, 1].map((s) => {
            const bx = s === 0 ? 138 : 874;
            const drop = over(lf, 2 + s * 3, 16, Easing.out(Easing.back(1.2)));
            const swing = Math.sin(lf / 16 + s * 2) * 1.4;
            const bw = 118, bh = 340 * drop;
            return (
              <div key={`ban${s}`} style={{ position: "absolute", left: bx - bw / 2, top: 24, width: bw, height: bh, transformOrigin: "50% 0%", transform: `rotate(${swing}deg)`, opacity: drop, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0,100% 0,100% 88%,50% 100%,0 88%)", background: `linear-gradient(180deg, ${CLAY}, ${RED} 60%, #6d1414)`, boxShadow: `inset 0 0 26px rgba(0,0,0,0.45), 0 0 22px rgba(220,90,50,0.3)` }} />
                {/* gold trim edges */}
                <div style={{ position: "absolute", left: 4, top: 4, bottom: 20, width: 3, background: `rgba(231,178,76,${0.5 + 0.3 * pulse})` }} />
                <div style={{ position: "absolute", right: 4, top: 4, bottom: 20, width: 3, background: `rgba(231,178,76,${0.5 + 0.3 * pulse})` }} />
                {/* emblem roundel */}
                <div style={{ position: "absolute", left: "50%", top: 70, width: 54, height: 54, marginLeft: -27, borderRadius: "50%", border: "3px solid rgba(231,178,76,0.8)", boxShadow: `0 0 16px rgba(231,178,76,${0.4 + 0.3 * pulse})` }} />
                <div style={{ position: "absolute", left: "50%", top: 84, width: 26, height: 26, marginLeft: -13, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}, ${CLAY})`, boxShadow: `0 0 14px ${GOLD}` }} />
              </div>
            );
          })}

          {/* NEW: hanging CHANDELIER light-fixtures with volumetric down-cones (grand hall) */}
          {[{ x: 250, y: 96 }, { x: 762, y: 96 }].map((c, i) => {
            const glow = 0.5 + 0.5 * Math.sin(lf / 7 + i * 2);
            const sway = Math.sin(lf / 22 + i) * 6;
            return (
              <div key={`chand${i}`} style={{ position: "absolute", left: c.x + sway, top: c.y, opacity: hallIn, pointerEvents: "none" }}>
                {/* suspension line */}
                <div style={{ position: "absolute", left: 0, top: -c.y, width: 2, height: c.y, background: "rgba(60,70,88,0.6)" }} />
                {/* fixture ring */}
                <div style={{ position: "absolute", left: -30, top: 0, width: 60, height: 20, borderRadius: "50%", border: "2px solid rgba(214,150,84,0.7)", boxShadow: `0 0 16px rgba(255,196,110,${0.4 * glow})` }} />
                {/* candle bulbs */}
                {Array.from({ length: 5 }, (_, k) => (
                  <div key={k} style={{ position: "absolute", left: -26 + k * 13, top: 8, width: 6, height: 6, borderRadius: "50%", background: "#FFE7B0", boxShadow: `0 0 10px ${GOLD}`, opacity: 0.7 + 0.3 * Math.sin(lf / 4 + k) }} />
                ))}
                {/* volumetric down-cone */}
                <div style={{ position: "absolute", left: -70, top: 14, width: 140, height: 300, clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", background: `linear-gradient(180deg, rgba(255,214,140,${0.16 * glow}), transparent 78%)`, filter: "blur(9px)", mixBlendMode: "screen" }} />
              </div>
            );
          })}

          {/* warm triumphant spotlight bloom behind the hero (warm KEY) */}
          <div style={{ position: "absolute", left: CX, top: 320, width: 780, height: 640, marginLeft: -390, marginTop: -170, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,208,122,${0.28 + 0.14 * pulse + 0.14 * finale}) 0%, rgba(214,88,52,0.15) 40%, transparent 68%)`, filter: "blur(18px)", pointerEvents: "none" }} />

          {/* VOLUMETRIC GOD-RAYS radiating 360deg from behind the hero (warm key + cyan rim) */}
          {Array.from({ length: 20 }, (_, i) => {
            const rot = (360 / 20) * i + lf * 0.7;
            const grow = over(lf, 1, 24, Easing.out(Easing.cubic));
            const flick = 0.55 + 0.45 * Math.sin(lf / 6 + i * 1.7);
            const len = 150 + (450 + finale * 150) * grow;
            const sw = 30 + seed(i) * 28;
            const cyan = i % 4 === 0;
            const o = (0.07 + 0.17 * grow + 0.07 * finale + 0.06 * ignite) * flick;
            const col = cyan ? "127,232,255" : "255,214,150";
            return <div key={`ray${i}`} style={{ position: "absolute", left: GX, top: GY, width: sw, height: len, marginLeft: -sw / 2, transformOrigin: "50% 0%", transform: `rotate(${rot}deg)`, background: `linear-gradient(180deg, rgba(${col},${o}) 0%, rgba(${col},${o * 0.5}) 42%, transparent 100%)`, filter: "blur(10px)", mixBlendMode: "screen", pointerEvents: "none" }} />;
          })}

          {/* NEW: falling CELEBRATORY CONFETTI ribbons drifting down through the hall */}
          {Array.from({ length: 26 }, (_, i) => {
            const cxp = seed(i) * 1012;
            const fall = ((lf * (1.1 + seed(i + 2) * 1.4) + seed(i + 5) * 900) % 980);
            const cy = -30 + fall;
            const sway = Math.sin(lf / 8 + i * 1.5) * 22;
            const sz = 5 + seed(i + 3) * 7;
            const rotd = seed(i + 1) * 360 + lf * (5 + seed(i) * 8);
            const pick = i % 4;
            const col = pick === 0 ? "#BEF3FF" : pick === 1 ? "#FFE7B0" : pick === 2 ? CLAY : GOLD;
            const o = 0.5 + 0.35 * seed(i + 7);
            return <div key={`conf${i}`} style={{ position: "absolute", left: cxp + sway, top: cy, width: sz, height: sz * 0.42, transform: `rotate(${rotd}deg)`, borderRadius: 1, background: col, opacity: o * over(lf, 0, 10), boxShadow: `0 0 4px ${col}` }} />;
          })}

          {/* drifting embers rising (mid, softly blurred, warm key vs cool rim) */}
          {Array.from({ length: 22 }, (_, i) => {
            const bx = seed(i) * 1012;
            const by = 792 - ((lf * (0.6 + seed(i + 2) * 0.7) + seed(i + 4) * 400) % 940);
            const sz = 2 + seed(i + 6) * 4;
            const cyan = i % 5 === 0;
            const o = (0.30 + 0.35 * seed(i + 8)) * (0.5 + 0.5 * Math.sin(lf / 5 + i)) * over(lf, 0, 8);
            return <div key={`pf${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz, borderRadius: "50%", background: cyan ? "#BEF3FF" : "#FFDCA0", opacity: o, filter: "blur(1px)", boxShadow: `0 0 7px ${cyan ? HUD : GOLD}` }} />;
          })}

          {/* GAG: GENERIC-9000, the knockoff, shatters to dust in the corner (defeated, receding) */}
          {villainFade > 0.02 && (
            <div style={{ position: "absolute", inset: 0, opacity: Math.max(0, villainFade), filter: "blur(2px)" }}>
              <Generic9000 lf={lf} size={132} left={806} top={470} pose="shatter" menace={0.2} flip={-1} z={6} />
            </div>
          )}
        </div>

        {/* ============================ (b) HERO PLANE (the victor + energy, sharp, hardest push-in) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${craneY}px) scale(${cam})` }}>

          {/* CONVERGENCE STREAMS funnel inward, seat into the core, then hand off to the burst */}
          {Array.from({ length: 16 }, (_, i) => {
            const ang = seed(i) * Math.PI * 2;
            const phase = seed(i + 7) * 7;
            const p = ramp(lf, phase, phase + 16);
            const pe = p * p;
            const R = 600 * (1 - pe) + 26;
            const len = 60 + pe * 140;
            const midR = R + len / 2;
            const mx = CX + Math.cos(ang) * midR, my = CY + Math.sin(ang) * midR;
            const deg = (ang * 180) / Math.PI;
            const cyan = i % 3 === 0;
            const col = cyan ? HUD : IRONG;
            const arr = 1 - ramp(p, 0.82, 1);
            const op = (0.18 + pe * 0.66) * arr;
            const th = cyan ? 3 : 4 + pe * 3;
            return <div key={`st${i}`} style={{ position: "absolute", left: mx, top: my, width: len, height: th, transform: `translate(-50%,-50%) rotate(${deg}deg)`, background: `linear-gradient(90deg, ${col}, transparent)`, borderRadius: th, opacity: op, filter: "blur(0.6px)" }} />;
          })}

          {/* white core flash at convergence */}
          <div style={{ position: "absolute", left: CX, top: CY, width: 540, height: 540, marginLeft: -270, marginTop: -270, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,244,214,${0.85 * flash}) 0%, rgba(231,178,76,${0.5 * flash}) 26%, transparent 60%)`, filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none" }} />

          {/* COOL RIM back-light kissing the hero's silhouette (opposes the warm key) */}
          <div style={{ position: "absolute", left: CX, top: CY - 30, width: 430, height: 470, marginLeft: -215, marginTop: -235, borderRadius: "50%", background: `radial-gradient(circle, transparent 52%, rgba(120,224,255,${0.20 + 0.1 * pulse2}) 66%, transparent 78%)`, filter: "blur(14px)", mixBlendMode: "screen", pointerEvents: "none" }} />

          {/* THE HERO: full crimson+gold armor, arms up, reactor at FULL BLAZE, SURGING toward camera */}
          <div style={{ position: "absolute", inset: 0, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${heroY}px) scale(${heroScale})` }}>
            <IronClaude lf={lf} size={470} left={365} top={186} pose="victory" core={1} z={30} />
          </div>

          {/* extra reactor over-glow that blazes up */}
          <div style={{ position: "absolute", left: CX, top: CY, width: 210, height: 210, marginLeft: -105, marginTop: -105, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,240,200,${0.5 * blaze}) 0%, rgba(231,178,76,${0.4 * blaze}) 34%, transparent 68%)`, filter: "blur(5px)", mixBlendMode: "screen", pointerEvents: "none" }} />

          {/* burst rings detonating off the reactor (triple, staggered) */}
          {(() => { const R = 44 + ringP * 320; return (
            <div style={{ position: "absolute", left: CX, top: CY, width: R * 2, height: R * 2, marginLeft: -R, marginTop: -R, borderRadius: "50%", border: `${6 - ringP * 4}px solid rgba(255,206,120,${(1 - ringP) * 0.85})`, boxShadow: `0 0 34px rgba(231,178,76,${(1 - ringP) * 0.6})`, opacity: over(lf, 10, 3), pointerEvents: "none" }} />); })()}
          {(() => { const R = 32 + ring2 * 230; return (
            <div style={{ position: "absolute", left: CX, top: CY, width: R * 2, height: R * 2, marginLeft: -R, marginTop: -R, borderRadius: "50%", border: `2px solid rgba(127,232,255,${(1 - ring2) * 0.7})`, opacity: over(lf, 12, 3), pointerEvents: "none" }} />); })()}
          {(() => { const R = 60 + ring3 * 420; return (
            <div style={{ position: "absolute", left: CX, top: CY, width: R * 2, height: R * 2, marginLeft: -R, marginTop: -R, borderRadius: "50%", border: `${3 - ring3 * 2.4}px solid rgba(255,224,150,${(1 - ring3) * 0.4})`, opacity: over(lf, 15, 4) * (1 - ring3), pointerEvents: "none" }} />); })()}

          {/* NEW BEAT: energy filaments stream FROM the reactor DOWN INTO the doc (the setup is being written) */}
          {lf > DS + 2 && Array.from({ length: 9 }, (_, i) => {
            const p = ramp(lf, DS + 3 + seed(i + 1) * 6, DS + 3 + seed(i + 1) * 6 + 12);
            if (p <= 0 || p >= 1) return null;
            const sx = CX + (seed(i) - 0.5) * 60;
            const sy = CY + 20;
            const x = sx + (DCX - sx) * p;
            const y = sy + (DCY - sy) * p - Math.sin(p * Math.PI) * 70;         // gentle arc down to the doc
            const sz = 5 + seed(i + 4) * 6;
            const cyan = i % 3 === 0;
            const o = Math.sin(p * Math.PI) * 0.85;
            return <div key={`feed${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, marginLeft: -sz / 2, marginTop: -sz / 2, borderRadius: "50%", background: cyan ? "#CFF6FF" : "#FFE7B0", opacity: o, filter: "blur(0.5px)", boxShadow: `0 0 12px ${cyan ? HUD : GOLD}`, pointerEvents: "none" }} />;
          })}

          {/* screen-wide warm flare pulse at the burst */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(58% 44% at ${CX}px ${CY}px, rgba(255,236,190,${0.34 * flash}), transparent 70%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
        </div>

        {/* ============================ ANAMORPHIC LENS FLARE CHAIN (over the hero plane, screen blend) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 62, pointerEvents: "none", mixBlendMode: "screen" }}>
          {/* horizontal anamorphic streak through the reactor */}
          <div style={{ position: "absolute", left: 0, top: CY - 3, width: 1012, height: 6, background: `linear-gradient(90deg, transparent 8%, rgba(127,232,255,${0.16 + 0.14 * blaze + 0.2 * flash}) 34%, rgba(230,244,255,${0.3 + 0.3 * flash}) 50%, rgba(127,232,255,${0.16 + 0.14 * blaze + 0.2 * flash}) 66%, transparent 92%)`, filter: "blur(2px)", transform: `scaleY(${1 + flash * 2})` }} />
          {/* flare-orb chain marching off the core along the diagonal */}
          {[-0.62, -0.34, 0.28, 0.5, 0.78].map((t, i) => {
            const fx = CX + t * 360;
            const fy = CY + t * 150;
            const sz = 26 + Math.abs(t) * 40;
            const cyan = i % 2 === 0;
            const o = (0.10 + 0.16 * blaze + 0.2 * flash) * (1 - Math.abs(t) * 0.4);
            return <div key={`flare${i}`} style={{ position: "absolute", left: fx - sz / 2, top: fy - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle, ${cyan ? "rgba(160,236,255," : "rgba(255,214,150,"}${o}) 0%, transparent 70%)`, filter: "blur(2px)" }} />;
          })}
        </div>

        {/* ============================ (a) FOREGROUND PLANE (doc slams TOWARD camera + near bokeh, DOF) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50, transformOrigin: `${CX}px ${CY}px`, transform: `translateY(${craneY * 1.2}px) scale(${nearScale})` }}>

          {/* THE DOCUMENT: rushes from behind the hero straight at the lens, ending LARGE in the foreground */}
          {docFade > 0 && (
            <SetupGuideDoc lf={lf} reveal={docIn} cx={278} cy={452} scale={1.02} />
          )}

          {/* doc impact shockwave */}
          {(() => { const b = over(lf, SLAM - 4, 4) * (1 - over(lf, SLAM, 12)); if (b <= 0) return null; const R = 30 + over(lf, SLAM - 4, 16) * 210; return (
            <div style={{ position: "absolute", left: 260, top: 470, width: R * 2, height: R * 2, marginLeft: -R, marginTop: -R, borderRadius: "50%", border: "4px solid rgba(255,214,150,0.8)", opacity: b, pointerEvents: "none" }} />); })()}

          {/* SPARK-CONFETTI motes bursting off the slam + hero, tumbling toward the lens */}
          {Array.from({ length: 24 }, (_, i) => {
            const born = SLAM - 6 + seed(i) * 10;
            const life = ramp(lf, born, born + 22);
            if (life <= 0 || life >= 1) return null;
            const ang = seed(i + 2) * Math.PI * 2;
            const spd = 120 + seed(i + 5) * 260;
            const x = DCX + Math.cos(ang) * spd * life;
            const y = DCY + Math.sin(ang) * spd * life - 40 * life + 160 * life * life; // pop up then gravity
            const sz = 4 + seed(i + 1) * 9;
            const cyan = i % 4 === 0;
            const rotd = seed(i + 3) * 360 + lf * (6 + seed(i) * 10);
            const o = (1 - life) * 0.95;
            return <div key={`spark${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 0.5, marginLeft: -sz / 2, marginTop: -sz / 4, transform: `rotate(${rotd}deg)`, borderRadius: 2, background: cyan ? "#BEF3FF" : (i % 3 === 0 ? "#FFF0C4" : "#F2A94C"), opacity: o, boxShadow: `0 0 9px ${cyan ? HUD : GOLD}`, pointerEvents: "none" }} />;
          })}

          {/* FG spark-confetti motes drifting in front of the lens (heavy DOF near-blur) */}
          {Array.from({ length: 8 }, (_, i) => {
            const bx = seed(i * 3 + 1) * 1012;
            const by = 900 - ((lf * (0.9 + seed(i) * 0.6) + seed(i + 5) * 500) % 1080);
            const sz = 30 + seed(i + 2) * 48;
            const cyan = i % 2 === 0;
            const o = (0.14 + 0.1 * Math.sin(lf / 7 + i * 2)) * over(lf, 0, 8);
            return <div key={`nb${i}`} style={{ position: "absolute", left: bx, top: by, width: sz, height: sz, borderRadius: "50%", background: cyan ? "rgba(127,232,255,0.9)" : "rgba(255,206,120,0.9)", opacity: Math.max(0, o), filter: "blur(9px)", pointerEvents: "none" }} />;
          })}
        </div>

        {/* ============================ COLOR GRADE + VIGNETTE (warm center / cool complementary edges) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 70, pointerEvents: "none", background: `radial-gradient(72% 60% at 50% 44%, rgba(255,182,96,${0.12 + 0.07 * finale + 0.06 * igniteHold}), transparent 62%)`, mixBlendMode: "soft-light" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 71, pointerEvents: "none", background: `radial-gradient(120% 118% at 50% 46%, transparent 52%, rgba(9,26,40,${0.42 + 0.14 * finale}) 100%)` }} />

        {/* ============================ JARVIS keyword resolves large + IGNITES (locked title) ============================ */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 654, textAlign: "center", zIndex: 85, opacity: jp }}>
          {/* ignition flare halo blooms on the ignite frame */}
          <div style={{ position: "absolute", left: "50%", top: 52, width: 620 + ignite * 260, height: 214 + ignite * 120, marginLeft: -(310 + ignite * 130), marginTop: -(107 + ignite * 60), borderRadius: "50%", background: `radial-gradient(circle, rgba(210,246,255,${0.3 * jp + 0.5 * ignite}) 0%, rgba(255,214,110,${0.18 * jp + 0.34 * ignite}) 40%, transparent 68%)`, filter: "blur(10px)", mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* anamorphic ignition streak across the wordmark */}
          <div style={{ position: "absolute", left: "50%", top: 60, width: 760, height: 6, marginLeft: -380, marginTop: -3, background: "linear-gradient(90deg, transparent, rgba(210,246,255,0.95), rgba(255,232,170,0.9), transparent)", filter: "blur(2px)", opacity: ignite, mixBlendMode: "screen", pointerEvents: "none", transform: `scaleX(${0.4 + ignite})` }} />
          {/* spark shards flinging off the wordmark at ignition */}
          {ignite > 0.02 && Array.from({ length: 12 }, (_, i) => {
            const ang = (Math.PI * 2 / 12) * i;
            const d = (1 - ignite) * 190;
            const x = 380 + Math.cos(ang) * (d + 40);
            const y = 60 + Math.sin(ang) * (d * 0.5 + 20);
            const sz = 4 + seed(i) * 6;
            const cyan = i % 3 === 0;
            return <div key={`js${i}`} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, marginLeft: -sz / 2, marginTop: -sz / 2, borderRadius: "50%", background: cyan ? "#CFF6FF" : "#FFE7B0", opacity: ignite, boxShadow: `0 0 10px ${cyan ? HUD : GOLD}`, mixBlendMode: "screen", pointerEvents: "none" }} />;
          })}
          <div style={{ position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 126, letterSpacing: "0.04em", color: "#F6EFDD", transform: `scale(${jpop + ignite * 0.05})`, textShadow: `0 0 ${18 + pulse * 16 + ignite * 40}px rgba(127,232,255,${0.85 + 0.15 * ignite}), 0 0 ${40 + ignite * 50}px rgba(231,178,76,${0.55 + 0.35 * ignite}), 0 4px 18px rgba(0,0,0,0.6)` }}>JARVIS</div>
        </div>

        {/* ============================ FILM GRAIN (fine animated texture over all) ============================ */}
        <div style={{ position: "absolute", inset: 0, zIndex: 95, pointerEvents: "none", opacity: 0.55, mixBlendMode: "overlay", backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px)", backgroundPosition: `${lf % 3}px ${(lf * 2) % 3}px` }} />
      </Panel>
    );
  })()
);

export const ClaudeJarvisReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_jarvis1.wav")} />
      <Audio loop src={staticFile("callback_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.06), fr(3), fr(6), fr(10), fr(16), fr(22), fr(30), fr(38), fr(CUT)], [0.30, 0.34, 0.32, 0.24, 0.135, 0.115, 0.104, 0.125, 0.125, 0.115], { extrapolateRight: "clamp" })} />

      {/* ============ SOUND DESIGN (root timeline, synced to physical action) ============ */}
      {/* ⛔ 2 RISERS MAX per reel: one into the showdown clash (S6), one into the CTA payoff (S11). */}

      {/* S0 HOOK - dark-reactor heartbeat -> IGNITION (3-deep hero hit) -> plate seats -> HUD boot sweep */}
      {/* ================= SFX CUE MAP =================
          Emitted as L[i] + local seconds. Sfx at is measured against the ROOT timeline
          (scene bodies are not Sequence-wrapped), so a bare scene-local value would
          typecheck, render, and be SILENT.
          dur + rel are sized so decaying sounds ring out instead of being chopped, and no
          heavy/impact file is used more than 3 times reel-wide. ======================= */}
      {/* ===== S0: HOOK / forge ignition ===== */}
      <Sfx at={L[0] + 0} src="heartbeat.mp3" v={0.1} dur={0.34} rel={0.5} />
      <Sfx at={L[0] + 0.1} src="impact.wav" v={0.24} dur={0.62} rel={0.45} />
      <Sfx at={L[0] + 0.1} src="swooshup.wav" v={0.16} dur={0.42} rel={0.3} />
      <Sfx at={L[0] + 0.333} src="lib_cinematic_hit.wav" v={0.3} dur={2.6} rel={0.85} />
      <Sfx at={L[0] + 0.335} src="sub.wav" v={0.2} dur={0.5} rel={0.35} />
      <Sfx at={L[0] + 0.36} src="lib_deep_whoosh.wav" v={0.18} dur={1.4} rel={0.7} />
      <Sfx at={L[0] + 0.6} src="thock.wav" v={0.2} dur={0.32} />
      <Sfx at={L[0] + 0.6} src="m_bump.wav" v={0.16} dur={0.3} />
      <Sfx at={L[0] + 0.733} src="digital-loading.wav" v={0.13} dur={1} rel={0.6} />
      <Sfx at={L[0] + 0.82} src="pk_hit.wav" v={0.18} dur={0.3} />
      <Sfx at={L[0] + 0.82} src="snap.wav" v={0.15} dur={0.28} />
      <Sfx at={L[0] + 0.9} src="glitch_counter.mp3" v={0.11} dur={1.1} rel={0.6} />
      <Sfx at={L[0] + 1} src="lib_click.wav" v={0.13} dur={0.28} />
      <Sfx at={L[0] + 1.467} src="lib_confirm.wav" v={0.2} dur={1.3} rel={0.6} />
      <Sfx at={L[0] + 1.467} src="magic-reveal.mp3" v={0.18} dur={0.84} rel={0.3} />
      <Sfx at={L[0] + 2} src="resolve.wav" v={0.15} dur={0.8} rel={0.4} />
      <Sfx at={L[0] + 2.05} src="sparkle.wav" v={0.12} dur={0.5} rel={0.3} />
      {/* ===== S1: FLIGHT + MISSILE VOLLEY ===== */}
      <Sfx at={L[1] + 0.05} src="lib_whoosh_fast.wav" v={0.16} dur={1.76} rel={0.6} />
      <Sfx at={L[1] + 1.43} src="lib_deep_whoosh.wav" v={0.18} dur={2} rel={0.7} />
      <Sfx at={L[1] + 1.43} src="swish.wav" v={0.12} dur={0.24} />
      <Sfx at={L[1] + 1.53} src="blip4.wav" v={0.13} dur={0.25} />
      <Sfx at={L[1] + 1.53} src="data.wav" v={0.11} dur={0.3} />
      <Sfx at={L[1] + 1.733} src="whoosh-2-fast.mp3" v={0.13} dur={1.8} rel={0.55} />
      <Sfx at={L[1] + 1.733} src="lib_click.wav" v={0.1} dur={0.29} />
      <Sfx at={L[1] + 1.75} src="zipline.wav" v={0.11} dur={1.5} rel={0.6} />
      <Sfx at={L[1] + 1.833} src="whoosh.wav" v={0.12} dur={0.4} />
      <Sfx at={L[1] + 1.833} src="swish.wav" v={0.11} dur={0.24} />
      <Sfx at={L[1] + 1.933} src="whoosh.mp3" v={0.12} dur={0.43} />
      <Sfx at={L[1] + 2.033} src="swooshup.wav" v={0.13} dur={0.42} />
      <Sfx at={L[1] + 2.167} src="rocket_explode.wav" v={0.22} dur={2.4} rel={0.6} />
      <Sfx at={L[1] + 2.167} src="impact.wav" v={0.15} dur={0.62} />
      <Sfx at={L[1] + 2.267} src="vine_boom.wav" v={0.19} dur={0.9} rel={0.35} />
      <Sfx at={L[1] + 2.267} src="click.mp3" v={0.13} dur={0.3} />
      <Sfx at={L[1] + 2.4} src="ice-in-glass.mp3" v={0.18} dur={2.9} rel={0.8} />
      <Sfx at={L[1] + 2.4} src="sand-steps.mp3" v={0.12} dur={1.2} rel={0.6} />
      <Sfx at={L[1] + 2.533} src="cinematic-impact.mp3" v={0.3} dur={3.2} rel={0.9} />
      <Sfx at={L[1] + 2.533} src="crash.wav" v={0.16} dur={0.7} />
      {/* ===== S2: VILLAIN LAIR ===== */}
      <Sfx at={L[2] + 0} src="suspense_approach.wav" v={0.12} dur={1.5} rel={0.7} />
      <Sfx at={L[2] + 0} src="screech.wav" v={0.11} dur={1.3} rel={0.65} />
      <Sfx at={L[2] + 0} src="heartbeat.mp3" v={0.1} dur={1.5} rel={0.75} />
      <Sfx at={L[2] + 0.5} src="blip2.wav" v={0.15} dur={0.3} />
      <Sfx at={L[2] + 0.5} src="pop.wav" v={0.12} dur={0.25} />
      <Sfx at={L[2] + 0.867} src="m_stomp.wav" v={0.16} dur={0.3} />
      <Sfx at={L[2] + 0.867} src="twang.wav" v={0.13} dur={0.5} rel={0.45} />
      <Sfx at={L[2] + 0.967} src="swooshdn.wav" v={0.2} dur={0.42} rel={0.45} />
      <Sfx at={L[2] + 0.967} src="whoosh.wav" v={0.13} dur={0.4} rel={0.4} />
      <Sfx at={L[2] + 0.967} src="lib_click.wav" v={0.12} dur={0.2} />
      <Sfx at={L[2] + 1.333} src="hit.mp3" v={0.3} dur={1.7} rel={0.8} />
      <Sfx at={L[2] + 1.333} src="lib_boom.wav" v={0.2} dur={2} rel={0.6} />
      <Sfx at={L[2] + 1.333} src="m_bump.wav" v={0.14} dur={0.3} />
      {/* ===== S3: CONNECT OBSIDIAN ===== */}
      <Sfx at={L[3] - 1.45} src="metal_riser.wav" v={0.15} dur={1.95} rel={0.3} />
      <Sfx at={L[3] + 0.13} src="lib_pop.wav" v={0.2} dur={0.35} />
      <Sfx at={L[3] + 0.13} src="thock.wav" v={0.19} dur={0.3} />
      <Sfx at={L[3] + 0.167} src="pk_hit.wav" v={0.13} dur={0.3} />
      <Sfx at={L[3] + 0.3} src="twang.wav" v={0.15} dur={0.5} rel={0.3} />
      <Sfx at={L[3] + 0.3} src="m_bump.wav" v={0.12} dur={0.28} />
      <Sfx at={L[3] + 0.4} src="snap.wav" v={0.18} dur={0.28} />
      <Sfx at={L[3] + 0.5} src="lib_cinematic_hit.wav" v={0.3} dur={3.4} rel={0.9} />
      <Sfx at={L[3] + 0.5} src="boom.wav" v={0.2} dur={0.55} rel={0.35} />
      <Sfx at={L[3] + 0.56} src="crash.wav" v={0.18} dur={0.9} rel={0.5} />
      <Sfx at={L[3] + 0.7} src="lib_whoosh.wav" v={0.2} dur={1.7} rel={0.7} />
      <Sfx at={L[3] + 0.7} src="shimmer.wav" v={0.14} dur={0.9} rel={0.4} />
      <Sfx at={L[3] + 1.2} src="digital-loading.wav" v={0.12} dur={1.4} rel={0.7} />
      <Sfx at={L[3] + 1.33} src="paper.wav" v={0.15} dur={0.45} />
      <Sfx at={L[3] + 1.7} src="lib_magic_reveal.wav" v={0.15} dur={1.8} rel={0.7} />
      <Sfx at={L[3] + 1.79} src="chimelo.wav" v={0.2} dur={0.6} rel={0.3} />
      <Sfx at={L[3] + 1.9} src="lib_paper.wav" v={0.12} dur={0.45} />
      <Sfx at={L[3] + 2.05} src="swooshdn.wav" v={0.13} dur={0.42} rel={0.25} />
      <Sfx at={L[3] + 2.35} src="data.wav" v={0.11} dur={0.4} />
      <Sfx at={L[3] + 2.75} src="blip3.wav" v={0.1} dur={0.3} />
      <Sfx at={L[3] + 3.05} src="metal_riser_smooth.wav" v={0.16} dur={1.95} rel={0.35} />
      <Sfx at={L[3] + 4.85} src="swish.wav" v={0.13} dur={0.35} />
      <Sfx at={L[3] + 5} src="lib_confirm.wav" v={0.22} dur={1.4} rel={0.7} />
      <Sfx at={L[3] + 5} src="sparkle.wav" v={0.16} dur={0.7} rel={0.3} />
      {/* ===== S4: CONNECT FIREFLIES ===== */}
      <Sfx at={L[4] + 0.03} src="lib_deep_whoosh.wav" v={0.18} dur={1.9} rel={0.8} />
      <Sfx at={L[4] + 0.03} src="swish.wav" v={0.13} dur={0.4} />
      <Sfx at={L[4] + 0.03} src="shimmer.wav" v={0.12} dur={0.9} rel={0.5} />
      <Sfx at={L[4] + 0.13} src="lib_pop.wav" v={0.18} dur={0.35} />
      <Sfx at={L[4] + 0.13} src="thock.wav" v={0.14} dur={0.3} />
      <Sfx at={L[4] + 0.27} src="lib_confirm.wav" v={0.15} dur={1.7} rel={0.7} />
      <Sfx at={L[4] + 0.67} src="lib_paper.wav" v={0.11} dur={0.4} />
      <Sfx at={L[4] + 0.73} src="glitch_counter.mp3" v={0.11} dur={1.6} rel={0.6} />
      <Sfx at={L[4] + 0.73} src="blip4.wav" v={0.1} dur={0.25} />
      <Sfx at={L[4] + 1} src="lib_riser.wav" v={0.14} dur={1.5} rel={0.5} />
      <Sfx at={L[4] + 1.6} src="magic-reveal.mp3" v={0.22} dur={0.9} rel={0.4} />
      <Sfx at={L[4] + 1.6} src="sparkle.wav" v={0.13} dur={0.6} />
      <Sfx at={L[4] + 1.6} src="angelic.wav" v={0.1} dur={1.9} rel={0.8} />
      <Sfx at={L[4] + 2.2} src="zipline.wav" v={0.14} dur={1.5} rel={0.6} />
      <Sfx at={L[4] + 2.2} src="data.wav" v={0.11} dur={0.4} />
      <Sfx at={L[4] + 2.55} src="blip3.wav" v={0.08} dur={0.25} />
      <Sfx at={L[4] + 2.82} src="blip1.wav" v={0.08} dur={0.25} />
      <Sfx at={L[4] + 3.07} src="lib_boom.wav" v={0.2} dur={2.4} rel={0.5} />
      <Sfx at={L[4] + 3.07} src="m_bump.wav" v={0.13} dur={0.3} />
      <Sfx at={L[4] + 3.4} src="riser.mp3" v={0.12} dur={1.5} rel={0.75} />
      <Sfx at={L[4] + 3.4} src="chimelo.wav" v={0.1} dur={0.7} />
      <Sfx at={L[4] + 4.67} src="chimehi.wav" v={0.18} dur={0.7} rel={0.4} />
      <Sfx at={L[4] + 4.67} src="lib_correct.wav" v={0.14} dur={1.5} rel={0.7} />
      {/* ===== S5: CONNECT GMAIL (email design) ===== */}
      <Sfx at={L[5] + 0.05} src="lib_whoosh.wav" v={0.14} dur={2} rel={0.6} />
      <Sfx at={L[5] + 0.05} src="construction.wav" v={0.08} dur={1.6} rel={0.7} />
      <Sfx at={L[5] + 0.1} src="paper.wav" v={0.13} dur={0.3} />
      <Sfx at={L[5] + 0.23} src="lib_pop.wav" v={0.18} dur={0.3} />
      <Sfx at={L[5] + 0.23} src="thock.wav" v={0.15} dur={0.3} />
      <Sfx at={L[5] + 0.37} src="lib_paper.wav" v={0.11} dur={0.3} />
      <Sfx at={L[5] + 0.5} src="swish.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 0.6} src="metal_riser.wav" v={0.1} dur={1.6} rel={0.7} />
      <Sfx at={L[5] + 0.63} src="paper.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 0.8} src="lib_paper.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 0.93} src="swooshdn.wav" v={0.11} dur={0.42} />
      <Sfx at={L[5] + 1.07} src="snap.wav" v={0.13} dur={0.3} />
      <Sfx at={L[5] + 1.15} src="lib_paper.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 1.33} src="cinematic-hit.mp3" v={0.3} dur={1.18} rel={0.7} />
      <Sfx at={L[5] + 1.33} src="vine_boom.wav" v={0.2} dur={0.9} rel={0.35} />
      <Sfx at={L[5] + 1.33} src="click.mp3" v={0.14} dur={0.3} />
      <Sfx at={L[5] + 1.47} src="fling.wav" v={0.16} dur={1.1} />
      <Sfx at={L[5] + 1.47} src="paper.wav" v={0.14} dur={0.3} />
      <Sfx at={L[5] + 1.57} src="lib_paper.wav" v={0.12} dur={0.3} />
      <Sfx at={L[5] + 1.84} src="whoosh-2-fast.mp3" v={0.2} dur={1.8} rel={0.7} />
      <Sfx at={L[5] + 1.98} src="swooshdn.wav" v={0.12} dur={0.42} />
      <Sfx at={L[5] + 2.07} src="m_bump.wav" v={0.18} dur={0.3} />
      <Sfx at={L[5] + 2.07} src="angelic.wav" v={0.13} dur={1.8} rel={0.8} />
      <Sfx at={L[5] + 2.13} src="ding.wav" v={0.13} dur={0.6} />
      <Sfx at={L[5] + 2.27} src="swish.wav" v={0.14} dur={0.3} />
      <Sfx at={L[5] + 2.3} src="swooshup.wav" v={0.11} dur={0.42} />
      <Sfx at={L[5] + 2.3} src="lib_paper.wav" v={0.12} dur={0.3} />
      <Sfx at={L[5] + 2.5} src="soft_pop.mp3" v={0.11} dur={0.3} />
      <Sfx at={L[5] + 2.5} src="paper.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 2.72} src="whoosh.wav" v={0.1} dur={0.4} />
      <Sfx at={L[5] + 2.9} src="lib_pop2.wav" v={0.1} dur={0.25} />
      <Sfx at={L[5] + 2.9} src="lib_paper.wav" v={0.11} dur={0.3} />
      <Sfx at={L[5] + 3.1} src="swish.wav" v={0.09} dur={0.3} />
      <Sfx at={L[5] + 3.28} src="toggle.mp3" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 3.45} src="paper.wav" v={0.1} dur={0.3} />
      <Sfx at={L[5] + 3.67} src="pop.mp3" v={0.11} dur={0.25} />
      <Sfx at={L[5] + 3.85} src="pop.wav" v={0.1} dur={0.25} />
      <Sfx at={L[5] + 3.91} src="soft_pop.mp3" v={0.12} dur={0.3} />
      <Sfx at={L[5] + 4.05} src="lib_notif.wav" v={0.12} dur={2} rel={0.8} />
      <Sfx at={L[5] + 4.2} src="pop.mp3" v={0.1} dur={0.25} />
      <Sfx at={L[5] + 4.4} src="lib_correct.wav" v={0.2} dur={1.6} rel={0.8} />
      <Sfx at={L[5] + 4.4} src="chimehi.wav" v={0.18} dur={0.55} />
      <Sfx at={L[5] + 4.45} src="sparkle.wav" v={0.12} dur={0.5} />
      {/* ===== S6: THE PIVOT ===== */}
      <Sfx at={L[6] - 1.35} src="metal_riser_smooth.wav" v={0.24} dur={1.95} rel={0.3} />
      <Sfx at={L[6] + 0.067} src="alarm.wav" v={0.12} dur={0.62} rel={0.5} />
      <Sfx at={L[6] + 0.2} src="whoosh.mp3" v={0.15} dur={0.43} rel={0.2} />
      <Sfx at={L[6] + 0.667} src="cinematic-impact.mp3" v={0.3} dur={2.4} rel={0.9} />
      <Sfx at={L[6] + 0.667} src="m_stomp.wav" v={0.19} dur={0.3} />
      <Sfx at={L[6] + 0.669} src="sub.wav" v={0.21} dur={0.42} rel={0.35} />
      <Sfx at={L[6] + 0.7} src="sand-steps.mp3" v={0.13} dur={1.3} rel={0.6} />
      <Sfx at={L[6] + 0.71} src="lib_whoosh_fast.wav" v={0.16} dur={1.76} rel={0.6} />
      <Sfx at={L[6] + 0.72} src="crowd_cheer.wav" v={0.1} dur={2.2} rel={0.8} />
      {/* ===== S7: VOICE DUEL ===== */}
      <Sfx at={L[7] + 0} src="construction.wav" v={0.09} dur={1.4} rel={0.7} />
      <Sfx at={L[7] + 0} src="swooshup.wav" v={0.13} dur={0.6} rel={0.3} />
      <Sfx at={L[7] + 0.02} src="lib_deep_whoosh.wav" v={0.15} dur={1.6} rel={0.7} />
      <Sfx at={L[7] + 0.53} src="cinematic-hit.mp3" v={0.3} dur={1.18} rel={0.6} />
      <Sfx at={L[7] + 0.54} src="slash.wav" v={0.17} dur={0.5} rel={0.25} />
      <Sfx at={L[7] + 0.55} src="key.wav" v={0.13} dur={0.3} />
      <Sfx at={L[7] + 0.67} src="thock.wav" v={0.14} dur={0.3} />
      <Sfx at={L[7] + 1.2} src="digital-loading.wav" v={0.13} dur={1.4} rel={0.7} />
      <Sfx at={L[7] + 1.53} src="downer.mp3" v={0.13} dur={1} rel={0.7} />
      <Sfx at={L[7] + 1.55} src="screech.wav" v={0.13} dur={1.24} rel={0.55} />
      <Sfx at={L[7] + 1.96} src="lib_confirm.wav" v={0.19} dur={1.6} rel={0.7} />
      <Sfx at={L[7] + 1.97} src="blip4.wav" v={0.11} dur={0.25} />
      <Sfx at={L[7] + 2.27} src="lib_whoosh_fast.wav" v={0.2} dur={1.76} rel={0.7} />
      <Sfx at={L[7] + 2.29} src="twang.wav" v={0.12} dur={0.5} rel={0.25} />
      <Sfx at={L[7] + 2.86} src="riser.wav" v={0.2} dur={0.75} rel={0.2} />
      <Sfx at={L[7] + 3.53} src="hit.mp3" v={0.3} dur={2.3} rel={0.85} />
      <Sfx at={L[7] + 3.53} src="boom.wav" v={0.22} dur={0.55} rel={0.3} />
      <Sfx at={L[7] + 3.56} src="crash.wav" v={0.18} dur={0.7} rel={0.35} />
      <Sfx at={L[7] + 3.93} src="roblox-oof.mp3" v={0.17} dur={1.04} rel={0.45} />
      <Sfx at={L[7] + 3.95} src="glitch_counter.mp3" v={0.13} dur={1.6} rel={0.7} />
      <Sfx at={L[7] + 4.05} src="cry_whimper.wav" v={0.12} dur={1.1} rel={0.5} />
      <Sfx at={L[7] + 4.33} src="shimmer.wav" v={0.14} dur={1.3} rel={0.6} />
      <Sfx at={L[7] + 4.35} src="sparkle.wav" v={0.12} dur={0.5} rel={0.3} />
      {/* ===== S8: IT KNOWS YOU (quiet - VO is hero) ===== */}
      <Sfx at={L[8] + 0.02} src="heartbeat.mp3" v={0.13} dur={1.2} rel={0.7} />
      <Sfx at={L[8] + 0.13} src="lib_paper.wav" v={0.14} dur={0.5} />
      <Sfx at={L[8] + 0.53} src="thock.wav" v={0.13} dur={0.35} />
      <Sfx at={L[8] + 0.73} src="lib_pop2.wav" v={0.1} dur={0.25} />
      <Sfx at={L[8] + 1.13} src="lib_magic_reveal.wav" v={0.18} dur={1.8} rel={0.8} />
      <Sfx at={L[8] + 1.13} src="paper.wav" v={0.13} dur={0.5} />
      <Sfx at={L[8] + 1.15} src="chimelo.wav" v={0.12} dur={0.65} rel={0.5} />
      <Sfx at={L[8] + 1.3} src="shimmer.wav" v={0.1} dur={0.95} rel={0.55} />
      <Sfx at={L[8] + 2.2} src="downer.mp3" v={0.11} dur={1.6} rel={0.75} />
      <Sfx at={L[8] + 3.2} src="twang.wav" v={0.11} dur={0.6} rel={0.5} />
      {/* ===== S9: IT WRITES LIKE YOU ===== */}
      <Sfx at={L[9] + 0.1} src="lib_mactype.wav" v={0.1} dur={1.4} rel={0.6} />
      <Sfx at={L[9] + 2} src="swooshup.wav" v={0.15} dur={0.42} rel={0.3} />
      <Sfx at={L[9] + 2} src="thock.wav" v={0.14} dur={0.3} />
      <Sfx at={L[9] + 2.07} src="lib_typing.wav" v={0.11} dur={1.25} rel={0.55} />
      <Sfx at={L[9] + 2.93} src="lib_whoosh_fast.wav" v={0.22} dur={1.76} rel={0.5} />
      <Sfx at={L[9] + 2.93} src="fling.wav" v={0.13} dur={1.1} rel={0.4} />
      <Sfx at={L[9] + 3.07} src="sparkle.wav" v={0.1} dur={0.5} />
      <Sfx at={L[9] + 3.27} src="slash.wav" v={0.16} dur={0.5} />
      <Sfx at={L[9] + 3.333} src="lib_cinematic_hit.wav" v={0.3} dur={2.6} rel={0.85} />
      <Sfx at={L[9] + 3.333} src="ice-in-glass.mp3" v={0.22} dur={3} rel={0.75} />
      <Sfx at={L[9] + 3.333} src="m_stomp.wav" v={0.16} dur={0.3} />
      <Sfx at={L[9] + 3.47} src="pk_hit.wav" v={0.14} dur={0.3} />
      <Sfx at={L[9] + 3.53} src="screech.wav" v={0.13} dur={1.24} rel={0.6} />
      <Sfx at={L[9] + 3.53} src="downer.mp3" v={0.1} dur={1.2} rel={0.75} />
      <Sfx at={L[9] + 3.6} src="whoosh-2-fast.mp3" v={0.2} dur={1.8} rel={0.5} />
      <Sfx at={L[9] + 3.73} src="twang.wav" v={0.14} dur={0.5} />
      <Sfx at={L[9] + 3.8} src="bonk.mp3" v={0.12} dur={2.14} rel={0.7} />
      <Sfx at={L[9] + 4.03} src="lib_whoosh.wav" v={0.13} dur={1.9} rel={0.6} />
      <Sfx at={L[9] + 4.03} src="shimmer.wav" v={0.11} dur={0.8} />
      <Sfx at={L[9] + 4.13} src="snap.wav" v={0.12} dur={0.3} />
      <Sfx at={L[9] + 4.33} src="resolve.wav" v={0.14} dur={0.8} />
      <Sfx at={L[9] + 4.7} src="chimehi.wav" v={0.1} dur={0.55} />
      {/* ===== S10: NEXT / IT GETS HANDS ===== */}
      <Sfx at={L[10] + 0.33} src="zipline.wav" v={0.15} dur={1.5} rel={0.5} />
      <Sfx at={L[10] + 0.33} src="construction.wav" v={0.1} dur={1.1} rel={0.65} />
      <Sfx at={L[10] + 1.13} src="impact.wav" v={0.22} dur={0.62} rel={0.3} />
      <Sfx at={L[10] + 1.13} src="lib_boom.wav" v={0.18} dur={2} rel={0.7} />
      <Sfx at={L[10] + 1.13} src="thock.wav" v={0.15} dur={0.3} />
      <Sfx at={L[10] + 1.23} src="toggle.mp3" v={0.13} dur={0.3} />
      <Sfx at={L[10] + 1.47} src="swooshup.wav" v={0.15} dur={0.42} />
      <Sfx at={L[10] + 1.67} src="digital-loading.wav" v={0.12} dur={0.95} rel={0.6} />
      <Sfx at={L[10] + 1.67} src="blip3.wav" v={0.11} dur={0.25} />
      <Sfx at={L[10] + 1.9} src="soft_pop.mp3" v={0.11} dur={0.25} />
      <Sfx at={L[10] + 2.07} src="blip5.wav" v={0.11} dur={0.25} />
      <Sfx at={L[10] + 2.2} src="whoosh.wav" v={0.13} dur={0.4} />
      <Sfx at={L[10] + 2.25} src="lib_pop2.wav" v={0.1} dur={0.22} />
      <Sfx at={L[10] + 2.47} src="rocket_explode.wav" v={0.19} dur={2.4} rel={0.6} />
      <Sfx at={L[10] + 2.47} src="sand-steps.mp3" v={0.09} dur={1.3} rel={0.6} />
      <Sfx at={L[10] + 2.55} src="shimmer.wav" v={0.09} dur={0.8} rel={0.4} />
      <Sfx at={L[10] + 2.86} src="swish.wav" v={0.13} dur={0.24} />
      <Sfx at={L[10] + 2.93} src="cinematic-hit.mp3" v={0.16} dur={1.18} rel={0.6} />
      <Sfx at={L[10] + 2.93} src="m_bump.wav" v={0.1} dur={0.3} />
      {/* ===== S11: CTA ===== */}
      <Sfx at={L[11] - 1.5} src="metal_riser_smooth.wav" v={0.2} dur={1.5} rel={0.45} />
      <Sfx at={L[11] + 0} src="hit.mp3" v={0.3} dur={2.2} rel={0.8} />
      <Sfx at={L[11] + 0} src="boom.wav" v={0.22} dur={0.55} />
      <Sfx at={L[11] + 0.01} src="sub.wav" v={0.2} dur={0.42} />
      <Sfx at={L[11] + 0.1} src="cry_whimper.wav" v={0.1} dur={1} rel={0.4} />
      <Sfx at={L[11] + 0.4} src="lib_magic_reveal.wav" v={0.2} dur={1.5} rel={0.6} />
      <Sfx at={L[11] + 0.4} src="angelic.wav" v={0.13} dur={1.5} rel={0.7} />
      <Sfx at={L[11] + 0.417} src="shimmer.wav" v={0.16} dur={0.8} />
      <Sfx at={L[11] + 0.733} src="whoosh-2-fast.mp3" v={0.16} dur={1.1} rel={0.7} />
      <Sfx at={L[11] + 0.933} src="lib_pop2.wav" v={0.14} dur={0.25} />
      <Sfx at={L[11] + 1.133} src="vine_boom.wav" v={0.22} dur={0.9} rel={0.4} />
      <Sfx at={L[11] + 1.133} src="paper.wav" v={0.15} dur={0.3} />
      <Sfx at={L[11] + 1.143} src="tick.wav" v={0.14} dur={0.3} />
      <Sfx at={L[11] + 1.333} src="sparkle.wav" v={0.18} dur={0.5} />
      <Sfx at={L[11] + 1.333} src="ding.wav" v={0.15} dur={0.6} />
      <Sfx at={L[11] + 1.343} src="lib_correct.wav" v={0.17} dur={1.5} rel={0.55} />
      <Sfx at={L[11] + 1.353} src="crowd_cheer.wav" v={0.14} dur={1.6} rel={0.7} />

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
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
        {(() => { const i = Lf.findIndex((_, k) => frame >= Lf[k] && (k === Lf.length - 1 || frame < Lf[k + 1])); return <SceneHeader idx={Math.max(0, i)} lf={frame - Lf[Math.max(0, i)]} />; })()}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.35, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
