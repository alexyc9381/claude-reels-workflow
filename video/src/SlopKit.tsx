import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";

// When true (set by the reel ROOT), a scene suppresses its OWN chassis so the ROOT
// can own ONE continuous rail + karaoke + bg + audio while the scene's panel swipes.
export const AssemblyCtx = React.createContext(false);

/* =========================================================================
   SLOP KIT · shared chassis + clay Mascot + simulated-desktop / screen-rec
   screens for the "voicemail, not writing" reel. House chassis (CLAUDE-REELS
   PLAYBOOK §5): CREAM bg, dark Panel IS the screen, ProgressBar rail on top,
   ScreenHead title, house Captions. The screen recording lives INSIDE the
   Panel (panel-local 1012x792). Reused by the 5 hook variants.
   ========================================================================= */

// ---- house palette + helpers ----
export const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", AMBER = "#CF9544", SKY = "#5AA0DE", PINK = "#E27BA0";
export const TERM = "#0E1626", TERM2 = "#0A1120";
export const MONO = "ui-monospace,'SF Mono',Menlo,monospace";
export const APP_BG = "#FAF9F5", APP_INK = "#2B2824", APP_DIM = "#8C877D", APP_LINE = "#EAE6DC", CO = "#C96442";
const FPS = 30;
export const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
export const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";
export const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) => interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
export const fr = (s: number) => Math.round(s * FPS);
export const hexA = (h: string, a: number) => { const n = parseInt(h.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };

/* ===================== the clay Mascot (cloud sprite) ===================== */
export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; constr?: number; chef?: number; suit?: number; beard?: number; xeyes?: number; samurai?: number; fro?: number; girl?: number; cop?: number; prof?: number; capeC?: string; tint?: string }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, constr = 0, chef = 0, suit = 0, beard = 0, xeyes = 0, samurai = 0, fro = 0, girl = 0, cop = 0, prof = 0, capeC, tint }) => {
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
        {/* hero cape (behind body), gently flapping */}
        {capeC && <>
          <rect x={24} y={50} width={152} height={104 + Math.sin(lf / 6) * 6} fill={capeC} transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} />
          <rect x={24} y={144 + Math.sin(lf / 6) * 6} width={152} height={12} fill="rgba(0,0,0,0.2)" transform={`rotate(${Math.sin(lf / 7) * 2.5} 100 56)`} />
        </>}
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
        {/* business suit + tie */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" />
          <rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" />
          <polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {/* police uniform: blue jacket + gold buttons + badge */}
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" />
          <rect x={34} y={106} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={116} width={9} height={9} fill="#E7B24C" /><rect x={96} y={130} width={9} height={9} fill="#E7B24C" />
          <rect x={48} y={114} width={13} height={13} fill="#E7B24C" /><rect x={51} y={111} width={7} height={4} fill="#E7B24C" />
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
        {/* girl long hair */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={30} y={36} width={140} height={16} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={8} fill="#6E4A2C" />
        </>}
        {/* police cap */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
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

/* ===================== CHASSIS ===================== */
export const Bg: React.FC = () => {
  if (React.useContext(AssemblyCtx)) return null; // ROOT owns the global bg in a sequenced reel
  return (
  <>
    <AbsoluteFill style={{ background: CREAM }} />
    <div style={{ position: "absolute", left: -120, top: 300, width: 620, height: 620, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(CLAY, 0.1)}, transparent 62%)`, filter: "blur(16px)" }} />
    <div style={{ position: "absolute", right: -140, bottom: 120, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(SKY, 0.08)}, transparent 62%)`, filter: "blur(18px)" }} />
  </>
  );
};

// the house Panel (dark card) — the diorama lives here. Optional cinematic push-in for engagement.
export const Panel: React.FC<{ children?: React.ReactNode; glow?: string; top?: number; height?: number; pushIn?: boolean }> = ({ children, glow, top = 384, height = 792, pushIn }) => {
  const f = useCurrentFrame();
  // punchy spring-in entrance, then a lively continuous push-in + a gentle handheld drift
  const pop = pushIn ? interpolate(f, [0, 7, 12, 18], [0.9, 1.03, 0.995, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 1;
  const push = pushIn ? interpolate(f, [12, 150], [1.0, 1.09], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }) : 1;
  const swayX = pushIn ? Math.sin(f / 38) * 5 : 0;
  const swayY = pushIn ? Math.cos(f / 52) * 3.5 : 0;
  const entO = pushIn ? interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top, height, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: glow ? `${NAVYSH}, 0 0 60px ${glow}` : NAVYSH, overflow: "hidden", border: `2px solid rgba(120,150,210,0.22)`, opacity: entO }}>
      <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 54%", transform: `scale(${pop * push}) translate(${swayX}px, ${swayY}px)` }}>{children}</div>
    </div>
  );
};

// ScreenHead: a big two-tone title pill area + a live REC / status chip
export const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: string; chipColor?: string }> = ({ lf, big, clay, chip = "SCREEN REC", chipColor = "#E0443E" }) => {
  const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5)));
  const blink = 0.5 + 0.5 * Math.abs(Math.sin(lf / 5));
  return (<>
    <div style={{ position: "absolute", right: 26, top: 300, zIndex: 130, display: "flex", alignItems: "center", gap: 8, padding: "8px 15px", borderRadius: 12, background: "rgba(20,18,22,0.9)", border: `2px solid ${chipColor}`, boxShadow: `0 6px 16px rgba(0,0,0,0.4)` }}>
      <span style={{ width: 11, height: 11, borderRadius: "50%", background: chipColor, boxShadow: `0 0 10px ${chipColor}`, opacity: blink }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: 1 }}>{chip}</span>
    </div>
    <div style={{ position: "absolute", left: 40, right: 40, top: 96, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.04, color: INK, textShadow: "0 2px 8px rgba(255,251,244,0.6)" }}>{big} <span style={{ color: CLAY }}>{clay}</span></span>
    </div>
  </>);
};

// canonical GitHub-style retention rail: track + fill + collectible pellets + bonus stars +
// numbered checkpoints + a clay-mascot RUNNER head + a live SCORE + a checkered-flag reward.
export const ProgressBar: React.FC = () => {
  if (React.useContext(AssemblyCtx)) return null; // ROOT owns ONE continuous rail across the reel
  return <ProgressBarInner />;
};
const ProgressBarInner: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / durationInFrames);
  const PELLETS = [0.08, 0.15, 0.24, 0.33, 0.45, 0.55, 0.66, 0.78, 0.9];
  const MARKS = [0.28, 0.56, 0.82];
  const STARS = [0.19, 0.43, 0.71];
  const eaten = PELLETS.filter((x) => x <= p).length + MARKS.filter((x) => x <= p).length + STARS.filter((x) => x <= p).length;
  const score = PELLETS.filter((x) => x <= p).length + MARKS.filter((x) => x <= p).length * 3 + STARS.filter((x) => x <= p).length * 2;
  const cc: any = {};
  if (eaten >= 4) cc.glasses = 1;
  if (eaten >= 8) { cc.wizard = 1; cc.glasses = 0; }
  if (eaten >= 12) cc.beard = 1;
  const wake = interpolate(p, [0.86, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {PELLETS.map((np, i) => (np > p ? <div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%,-50%)", width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `translate(-50%,-50%) scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} /> : null))}
      {STARS.map((np, i) => { const passed = p >= np; return (
        <div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? `0 0 14px ${GOLD}99` : `0 0 12px ${GOLD}66` }}>{"★"}</div>
        </div>); })}
      {MARKS.map((np, i) => { const passed = p >= np; return (
        <div key={`mk${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: passed ? GREEN : "#EDE7DB", border: `4px solid ${passed ? GREEN : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : CLAY, boxShadow: passed ? `0 0 18px ${GREEN}` : "0 2px 6px rgba(0,0,0,0.2)" }}>{passed ? "✓" : i + 1}</div>
        </div>); })}
      {/* the traveling clay Mascot runner + score badge (gains costume as it collects) */}
      <div style={{ position: "absolute", left: `${Math.min(p, 0.92) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 127 }}>
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.4} nodSpeed={6.5} cheer={0.35} gaze={2} {...cc} /></div>
        <div style={{ position: "absolute", left: "50%", top: 64, transform: "translateX(-50%)", padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
      </div>
      {/* teased gift reward at the finish */}
      <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, zIndex: 131, transform: `translateY(${-wake * 3}px)` }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + wake * 26}px ${GOLD}${wake > 0.3 ? "aa" : "66"}` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, filter: `grayscale(${0.6 - wake * 0.6}) brightness(${0.85 + wake * 0.35})`, opacity: 0.6 + wake * 0.4, transform: `scale(${0.84 + wake * 0.2})` }}>{"🎁"}</div>
      </div>
    </div>
  );
};

// the hook HEADER: a big bold two-tone headline pill at the very top (the promise), house style.
// house-canonical HOOK HEADER: a WHITE title card that sits right above the screen (Panel),
// below the status rail. Snaps in with a punch, hook-only.
// house-canonical SECTION HEADER pill (router-reel style): a white card with an emoji/icon
// BADGE + two bold lines (hot line in clay), sitting just under the status rail on the
// screen's top edge. Every section gets one; snaps in at the scene's start.
export const SectionHeader: React.FC<{ f?: number; badge: React.ReactNode; l1: React.ReactNode; l2: React.ReactNode; size?: number; hero?: boolean; badgeBg?: string; badgeBorder?: string }> = ({ f = 0, badge, l1, l2, size = 46, hero = false, badgeBg, badgeBorder }) => {
  const settle = over(f, 0, fr(0.34), Easing.out(Easing.back(1.3)));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200, opacity: Math.min(1, settle), transform: `translateY(${(1 - settle) * -16}px) scale(${0.9 + settle * 0.1})` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: hero ? 18 : 15, padding: hero ? "18px 40px 18px 18px" : "12px 28px 12px 12px", borderRadius: hero ? 32 : 28, background: "linear-gradient(180deg,#FFFFFF,#F4EEE2)", border: hero ? "4px solid #ECE5D6" : "3px solid #ECE5D6", boxShadow: "0 26px 56px -14px rgba(20,26,45,0.55), inset 0 2px 0 rgba(255,255,255,0.95)" }}>
        <div style={{ width: hero ? 124 : 78, height: hero ? 124 : 78, borderRadius: hero ? 28 : 18, background: badgeBg || "linear-gradient(158deg,#E7896A,#C5603C)", border: `3px solid ${badgeBorder || "#F3C7B4"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: hero ? 56 : 42, boxShadow: "0 8px 18px -6px rgba(197,96,60,0.55), inset 0 2px 0 rgba(255,255,255,0.4)", overflow: "hidden" }}>{badge}</div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.0, gap: hero ? 3 : 0 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, color: INK, letterSpacing: "-0.015em", whiteSpace: "nowrap" }}>{l1}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, color: INK, letterSpacing: "-0.015em", whiteSpace: "nowrap" }}>{l2}</span>
        </div>
      </div>
    </div>
  );
};

// the HOOK header = a BIGGER hero SectionHeader with the OFFICIAL orange Claude logo on a WHITE badge.
export const HookHeader: React.FC<{ big: string; hot: string; f?: number }> = ({ big, hot, f = 0 }) => (
  <SectionHeader f={f} hero size={56} badgeBg="#FFFFFF" badgeBorder="#EDE7DB"
    badge={<Img src={staticFile("claude_logo.png")} style={{ width: 84, height: 84, objectFit: "contain" }} />}
    l1={<span>{big}</span>} l2={<span style={{ color: CLAY }}>{hot}</span>} />
);

// KARAOKE caption driven by VO word timings [{w,s,e}] + a sliding window, house style.
type CapWord = { w: string; s: number; e: number };
/** The canonical on-disk shape is `[{start,end,word}]` (playbook C4.4); older reels
    hold `[{w,s,e}]`. Accept either so a spec-correct file cannot crash a render. */
const asCapWords = (ws: any[]): CapWord[] =>
  ws.map((x) => ("w" in x ? x : { w: String(x.word ?? ""), s: Number(x.start ?? 0), e: Number(x.end ?? 0) }));

export const KaraokeCaption: React.FC<{ words: any[]; fps?: number; top?: number; win?: number }> = (props) => {
  if (React.useContext(AssemblyCtx)) return null; // ROOT owns ONE karaoke track across the reel
  return <KaraokeCaptionInner {...props} words={asCapWords(props.words)} />;
};
const KaraokeCaptionInner: React.FC<{ words: CapWord[]; fps?: number; top?: number; win?: number }> = ({ words, fps = 30, top = 1268 }) => {
  const f = useCurrentFrame();
  const t = f / fps;
  const lead = 0.12;
  // CANONICAL house captions: group words into short phrase-lines (max 3 words, break on a
  // >0.34s gap or a sentence end); each line shows as a unit with words filling transparent->
  // clay, the active word dark + lifted. Matches the delivered reels (TAKES/CALLS/etc).
  const clines = React.useMemo(() => {
    const out: { words: typeof words; start: number; end: number }[] = [];
    let cur: typeof words = [];
    const DANGLE = /^(i|a|an|the|to|of|and|or|you|your|for|is|it|in|on|so|my|as|at|but|if|their|its|our|his|her|with|from)$/i;
    words.forEach((w, i) => {
      cur.push(w);
      const next = words[i + 1];
      const gap = next ? next.s - w.e : 99;
      const endsSent = /[.!?]$/.test(w.w.trim());
      const lastDangles = DANGLE.test(w.w.trim().replace(/[.,!?]+$/, ""));
      // break at 3 words / a real pause / sentence-end — but never LEAVE a line ending on a
      // dangling connector (playbook caption rule); carry it onto the next line instead.
      const wantBreak = cur.length >= 3 || gap > 0.34 || endsSent;
      if (wantBreak && !(lastDangles && next && !endsSent && cur.length < 4)) {
        out.push({ words: cur, start: cur[0].s, end: w.e }); cur = [];
      }
    });
    if (cur.length) out.push({ words: cur, start: cur[0].s, end: cur[cur.length - 1].e });
    // The carry-forward above is skipped once a line reaches 4 words, which let
    // "Every guide on the" ship. Playbook C4.5 is absolute, so post-pass: any line
    // still ending on a connector hands that word to the FRONT of the next line.
    // Repeat to a FIXED POINT — handing off "the" from "Every guide on the" exposes
    // "on" underneath it, so one pass is not enough.
    for (let pass = 0; pass < 4; pass++) {
      let changed = false;
      for (let i = 0; i < out.length - 1; i++) {
        const ln = out[i];
        if (ln.words.length < 2) continue;
        const last = ln.words[ln.words.length - 1].w.trim();
        if (/[.!?]$/.test(last) || !DANGLE.test(last.replace(/[.,!?]+$/, ""))) continue;
        const moved = ln.words.pop()!;
        out[i + 1].words.unshift(moved);
        ln.end = ln.words[ln.words.length - 1].e;
        out[i + 1].start = moved.s;
        changed = true;
      }
      if (!changed) break;
    }
    // A hand-off can push a line to 5 words ("on the internet is telling" = 1054px,
    // needing a 0.81x shrink). Split anything over 4, then settle the danglers again.
    for (let pass = 0; pass < 3; pass++) {
      let split = false;
      for (let i = 0; i < out.length; i++) {
        if (out[i].words.length <= 4) continue;
        const ln = out[i]; const half = Math.ceil(ln.words.length / 2);
        const tailWords = ln.words.slice(half);
        ln.words = ln.words.slice(0, half); ln.end = ln.words[ln.words.length - 1].e;
        out.splice(i + 1, 0, { words: tailWords, start: tailWords[0].s, end: tailWords[tailWords.length - 1].e });
        split = true;
      }
      for (let i = 0; i < out.length - 1; i++) {
        const ln = out[i];
        if (ln.words.length < 2) continue;
        const last = ln.words[ln.words.length - 1].w.trim();
        if (/[.!?]$/.test(last) || !DANGLE.test(last.replace(/[.,!?]+$/, ""))) continue;
        const moved = ln.words.pop()!;
        out[i + 1].words.unshift(moved);
        ln.end = ln.words[ln.words.length - 1].e;
        out[i + 1].start = moved.s;
        split = true;
      }
      if (!split) break;
    }
    return out;
  }, [words]);
  let cur = clines[0];
  for (let i = 0; i < clines.length; i++) {
    const ln = clines[i];
    const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0;
    if (t + lead >= gate) cur = ln;
  }
  const done = t + lead >= cur.end;
  // FORCE ONE LINE: rough-measure the phrase and scale the whole row down if it would overflow.
  /* 45 px/char measured off a real render (Fraunces 900 @74px is 44.1); the old
     41 under-read by ~7%, so the widest line still overran after shrinking. */
  const rough = cur.words.reduce((a, w) => a + w.w.trim().length, 0) * 45 + (cur.words.length - 1) * 16;
  /* Captions used to be allowed 992 of 1080 px — 92% of the frame, so a long
     line ran edge to edge and read as cramped. 856 leaves a real margin on
     both sides and matches the container inset below. */
  const SAFE = 856;
  const shrink = rough > SAFE ? SAFE / rough : 1;
  return (
    <div style={{ position: "absolute", left: 112, right: 112, top, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "flex", width: "100%", flexWrap: "nowrap", whiteSpace: "nowrap", justifyContent: "center", alignItems: "baseline", gap: "0 16px", transform: `scale(${shrink})`, transformOrigin: "50% 50%" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.s; const active = !done && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].s); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.w.trim()}</span>); })}
      </div>
    </div>
  );
};

// @handle chip above the panel
export const Handle: React.FC = () => (
  <div style={{ position: "absolute", left: 46, top: 210, display: "flex", alignItems: "center", gap: 10, zIndex: 46 }}>
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: grad(GOLD, CLAY) }} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: INK }}>@nocodealex</div>
  </div>
);

// house karaoke caption (a single hook line, one word highlighted hot)
export const Caption: React.FC<{ words: string[]; hot?: number; top?: number }> = ({ words, hot = -1, top = 1236 }) => (
  <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center", zIndex: 90 }}>
    <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
      {words.map((w, i) => <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, lineHeight: 1.1, letterSpacing: "-0.01em", color: i === hot ? "#B8501F" : CLAY, transform: i === hot ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w}</span>)}
    </div>
  </div>
);

// the Claude spark logo (used in the app screens)
export const ClaudeSpark: React.FC<{ s: number; c?: string }> = ({ s, c = CO }) => (
  <svg width={s} height={s} viewBox="-20 -20 40 40" style={{ display: "block" }}>
    {Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 12 : 15.5; const tip = i % 2 ? 1.5 : 1.9; return <path key={i} d={`M -1.1 -2.6 L 1.1 -2.6 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill={c} transform={`rotate(${i * 30})`} />; })}
    <circle r="3.2" fill={c} />
  </svg>
);

// macOS traffic lights row
export const TrafficLights: React.FC<{ pad?: number }> = ({ pad = 20 }) => (
  <div style={{ display: "flex", gap: 9, padding: `0 ${pad}px` }}>
    {[["#FF5F57", "#E0443E"], ["#FEBC2E", "#DDA123"], ["#28C840", "#1DA92E"]].map(([c, b], i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, border: `0.5px solid ${b}` }} />)}
  </div>
);

/* ===================== SLOP SCREEN RECORDINGS (live inside the Panel) ===================== */

/* SCREEN A — the CLAUDE DESKTOP APP: the user asks for a VOICEMAIL, not writing.
   Claude replies with a messy, human, spoken-style transcript. This is the money screen. */
export const VoicemailAppScreen: React.FC<{ f: number }> = ({ f }) => {
  const CPF = 1.9;
  const respStart = 40;
  let budget = Math.max(0, Math.floor((f - respStart) * CPF));
  const resp = "umm ok so what I actually wanted to say is... look, most people just tell Claude to write it, and yeah it comes out clean but it sounds like a robot. so like, don't do that. here's the thing that fixed it for me...";
  const shown = resp.slice(0, budget);
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      {/* window bar */}
      <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", borderBottom: `1px solid ${APP_LINE}` }}><TrafficLights /></div>
      <div style={{ padding: "40px 60px" }}>
        {/* user prompt bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 34 }}>
          <div style={{ maxWidth: 780, background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "22px 22px 6px 22px", padding: "22px 28px", fontFamily: inter.fontFamily, fontSize: 34, lineHeight: 1.5, color: APP_INK }}>
            Don't write it. Leave me a <b>90-second voicemail</b> explaining what I wanted to say. Ramble, false starts and all. Then only cut the <i>ums</i>.
          </div>
        </div>
        {/* claude answer */}
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ marginTop: 6, flexShrink: 0 }}><ClaudeSpark s={44} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F1E9DC", borderRadius: 999, padding: "8px 18px", marginBottom: 18 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(f / 5)) }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: "#8A5A44" }}>recording voicemail · 0:{String(Math.min(90, 30 + Math.floor(f / 2))).padStart(2, "0")}</span>
            </div>
            {/* live waveform */}
            <svg width={820} height={80} style={{ display: "block", marginBottom: 20 }}>
              {Array.from({ length: 84 }, (_, i) => { const h = 8 + Math.abs(Math.sin(i * 0.7 + f / 4)) * (i < (f - respStart) * 1.4 ? 56 : 6); return <rect key={i} x={i * 10} y={40 - h / 2} width={5} height={h} rx={2.5} fill={i < (f - respStart) * 1.4 ? CO : "#E0D8C8"} />; })}
            </svg>
            <p style={{ fontFamily: fraunces.fontFamily, fontSize: 36, lineHeight: 1.5, color: APP_INK, margin: 0 }}>{shown}<span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO }}>▍</span></p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* SCREEN B — an AI-DETECTOR browser: paste the text, meter swings 100% AI (red) -> 100% HUMAN (green). */
export const AiDetectorScreen: React.FC<{ f: number }> = ({ f }) => {
  const flip = over(f, 34, 26, Easing.inOut(Easing.cubic));     // AI -> HUMAN
  const aiPct = Math.round(100 - flip * 100);
  const isAI = flip < 0.5;
  const c = isAI ? RED : GREEN;
  const shownPct = isAI ? aiPct : 100 - aiPct;                  // show the dominant class %
  const ringPct = shownPct;                                     // green fills to 100% when human
  return (
    <AbsoluteFill style={{ background: "#F3F4F7" }}>
      {/* browser chrome */}
      <div style={{ height: 60, background: "#E4E6EC", display: "flex", alignItems: "center", gap: 16, padding: "0 20px", borderBottom: "1px solid #D2D5DE" }}>
        <TrafficLights pad={0} />
        <div style={{ flex: 1, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", padding: "0 18px", fontFamily: inter.fontFamily, fontSize: 24, color: "#6B7180" }}>🔒 ai-content-detector.io</div>
      </div>
      <div style={{ padding: "44px 60px", display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "#3A3F4B", marginBottom: 16 }}>Pasted text</div>
          <div style={{ background: "#fff", border: "1px solid #DDE0E8", borderRadius: 16, padding: "22px 24px", height: 360, fontFamily: fraunces.fontFamily, fontSize: 27, lineHeight: 1.5, color: "#4A4F5A", overflow: "hidden" }}>
            umm ok so what I actually wanted to say is, look, most people just tell it to write the thing and it comes out clean but it sounds like a robot, so don't, here's what fixed it for me...
          </div>
        </div>
        {/* the meter */}
        <div style={{ width: 400, background: "#fff", border: "1px solid #DDE0E8", borderRadius: 20, padding: "34px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: "#8A8F9B", marginBottom: 20 }}>AI Probability</div>
          <div style={{ position: "relative", width: 220, height: 220, borderRadius: "50%", background: `conic-gradient(${c} ${ringPct}%, #EDEFF3 ${ringPct}%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 168, height: 168, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: c }}>{shownPct}%</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: c, letterSpacing: 2 }}>{isAI ? "AI" : "HUMAN"}</span>
            </div>
          </div>
          <div style={{ marginTop: 26, padding: "12px 26px", borderRadius: 999, background: hexA(c, 0.14), border: `2px solid ${c}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: c }}>{flip < 0.5 ? "✕ Likely AI" : "✓ Human-written"}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* SCREEN C — a SLOP CHAT: a tidy, robotic paragraph gets generated then SLOP-stamped. */
export const SlopChatScreen: React.FC<{ f: number }> = ({ f }) => {
  const CPF = 2.2;
  let budget = Math.max(0, Math.floor((f - 20) * CPF));
  const slop = "In today's fast-paced digital landscape, leveraging AI can be a game-changer. First, it saves time. Second, it boosts quality. Third, it scales effortlessly. In conclusion, the possibilities are endless.";
  const shown = slop.slice(0, budget);
  const stamp = over(f, 96, 8, Easing.out(Easing.back(2)));
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", borderBottom: `1px solid ${APP_LINE}` }}><TrafficLights /></div>
      <div style={{ padding: "40px 62px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
          <div style={{ background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "22px 22px 6px 22px", padding: "18px 26px", fontFamily: inter.fontFamily, fontSize: 32, color: APP_INK }}>Write me a post about using AI.</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ marginTop: 4, flexShrink: 0 }}><ClaudeSpark s={42} c="#9A968B" /></div>
          <p style={{ flex: 1, fontFamily: fraunces.fontFamily, fontSize: 37, lineHeight: 1.55, color: "#6E6A60", margin: 0 }}>{shown}</p>
        </div>
      </div>
      {/* the SLOP stamp slams across */}
      {stamp > 0.02 && (
        <div style={{ position: "absolute", left: "50%", top: "54%", transform: `translate(-50%,-50%) rotate(-13deg) scale(${interpolate(stamp, [0, 1], [2.4, 1])})`, opacity: Math.min(1, stamp * 1.4), zIndex: 20 }}>
          <div style={{ padding: "12px 44px", border: `9px solid ${RED}`, borderRadius: 14, color: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 128, letterSpacing: 6, background: "rgba(196,74,58,0.08)", boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}>SLOP</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* SCREEN D — a PHONE recording a voicemail (voice-memo UI), big waveform + timer + messy transcript. */
export const PhoneVoicemailScreen: React.FC<{ f: number }> = ({ f }) => {
  const t = 30 + Math.floor(f / 2);
  return (
    <AbsoluteFill style={{ background: grad("#1C1E28", "#0E1018"), display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* a phone chassis */}
      <div style={{ width: 470, height: 720, borderRadius: 54, background: "#0B0C12", border: "10px solid #23262F", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "#fff" }}><span>9:41</span><span>●●● ▾ 100%</span></div>
        <div style={{ padding: "60px 34px 0", textAlign: "center" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: "#fff", marginBottom: 6 }}>New Voicemail</div>
          <div style={{ fontFamily: MONO, fontSize: 30, color: "#FF5F57" }}>● 0:{String(Math.min(90, t)).padStart(2, "0")}</div>
          {/* waveform */}
          <svg width={400} height={150} style={{ display: "block", margin: "34px auto 0" }}>
            {Array.from({ length: 40 }, (_, i) => { const h = 10 + Math.abs(Math.sin(i * 0.9 + f / 3)) * 100; return <rect key={i} x={i * 10} y={75 - h / 2} width={5} height={h} rx={2.5} fill={CO} opacity={0.55 + 0.45 * Math.abs(Math.sin(i + f / 6))} />; })}
          </svg>
          <div style={{ marginTop: 30, fontFamily: fraunces.fontFamily, fontSize: 27, lineHeight: 1.45, color: "#C9CCD6", textAlign: "left" }}>"umm, ok, so, what I actually wanted to say... is like... hold on..."</div>
        </div>
        {/* record button */}
        <div style={{ position: "absolute", left: "50%", bottom: 40, transform: "translateX(-50%)", width: 84, height: 84, borderRadius: "50%", border: "5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FF3B30" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* a red SLOP stamp (reusable, for overlays) */
export const SlopStamp: React.FC<{ scale?: number; rot?: number }> = ({ scale = 1, rot = -13 }) => (
  <div style={{ padding: "10px 34px", border: `8px solid ${RED}`, borderRadius: 12, color: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92 * scale, letterSpacing: 5, background: "rgba(196,74,58,0.08)", transform: `rotate(${rot}deg)`, display: "inline-block" }}>SLOP</div>
);

// a crumpled-paper "slop doc" going to trash (mini prop)
export const SlopDoc: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <div style={{ width: 120 * s, height: 150 * s, borderRadius: 8, background: "#EDE9DF", border: "2px solid #D8D2C4", position: "relative", transform: "rotate(-8deg)", boxShadow: "0 6px 14px rgba(0,0,0,0.2)" }}>
    {[0, 1, 2, 3].map((r) => <div key={r} style={{ position: "absolute", left: 14 * s, right: 14 * s, top: (24 + r * 20) * s, height: 5 * s, borderRadius: 3, background: "#B9B4A6" }} />)}
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><SlopStamp scale={0.4 * s} rot={-10} /></div>
  </div>
);

/* ===================== ANIMATED HOOK PROPS (clay-house style, for the ANIMATED hook) ===================== */

// a grey robotic "slop" text brick: identical tidy lines (reads as machine-perfect writing)
export const SlopBrick: React.FC<{ x: number; y: number; w?: number; lines?: number; c?: string; rot?: number; o?: number }> = ({ x, y, w = 150, lines = 5, c = "#8E8A80", rot = 0, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, padding: "14px 14px", borderRadius: 10, background: "#2A2E38", border: "2px solid #3A404C", transform: `rotate(${rot}deg)`, opacity: o, boxShadow: "0 6px 14px rgba(0,0,0,0.3)" }}>
    {Array.from({ length: lines }, (_, i) => <div key={i} style={{ height: 7, borderRadius: 4, marginBottom: 9, width: i === lines - 1 ? "62%" : "100%", background: c }} />)}
  </div>
);

// a warm, messy human speech bubble ("umm...", "so, like...")
export const Bubble: React.FC<{ x: number; y: number; text: string; s?: number; c?: string; rot?: number }> = ({ x, y, text, s = 1, c = "#FAF9F5", rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, zIndex: 30 }}>
    <div style={{ position: "relative", padding: `${14 * s}px ${22 * s}px`, borderRadius: 22 * s, background: c, boxShadow: "0 8px 20px rgba(0,0,0,0.28)", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 30 * s, color: "#3A342C", whiteSpace: "nowrap" }}>
      {text}
      <div style={{ position: "absolute", left: 26 * s, bottom: -12 * s, width: 0, height: 0, borderLeft: `${12 * s}px solid transparent`, borderRight: `${12 * s}px solid transparent`, borderTop: `${16 * s}px solid ${c}` }} />
    </div>
  </div>
);

// a big animated phone leaving a voicemail: waveform, REC dot, rising timer
export const BigPhone: React.FC<{ x: number; y: number; f: number; s?: number; wave?: string }> = ({ x, y, f, s = 1, wave = CO }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 600 * s, borderRadius: 52 * s, background: "#0B0C12", border: `${11 * s}px solid #23262F`, boxShadow: "0 26px 50px rgba(0,0,0,0.45)", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * s, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${26 * s}px`, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20 * s, color: "#fff" }}><span>9:41</span><span>100%</span></div>
    <div style={{ padding: `${70 * s}px ${26 * s}px 0`, textAlign: "center" }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30 * s, color: "#fff", marginBottom: 6 * s }}>New Voicemail</div>
      <div style={{ fontFamily: MONO, fontSize: 26 * s, color: "#FF5F57" }}>● 0:{String(Math.min(90, 12 + Math.floor(f / 2))).padStart(2, "0")}</div>
      <svg width={248 * s} height={130 * s} style={{ display: "block", margin: `${28 * s}px auto 0` }}>
        {Array.from({ length: 30 }, (_, i) => { const h = (10 + Math.abs(Math.sin(i * 0.9 + f / 3)) * 100) * s; return <rect key={i} x={i * 8 * s} y={(65 * s) - h / 2} width={4 * s} height={h} rx={2} fill={wave} opacity={0.55 + 0.45 * Math.abs(Math.sin(i + f / 6))} />; })}
      </svg>
    </div>
    <div style={{ position: "absolute", left: "50%", bottom: 32 * s, transform: "translateX(-50%)", width: 74 * s, height: 74 * s, borderRadius: "50%", border: `${5 * s}px solid #fff`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 34 * s, height: 34 * s, borderRadius: 9 * s, background: "#FF3B30" }} />
    </div>
  </div>
);

// a physical HUMAN-O-METER gauge: needle swings SLOP (red, left) <-> HUMAN (green, right). val 0..1
export const HumanMeter: React.FC<{ x: number; y: number; val: number; s?: number }> = ({ x, y, val, s = 1 }) => {
  const ang = -90 + val * 180;   // -90 = SLOP left, +90 = HUMAN right
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 420 * s, height: 250 * s }}>
      <svg width={420 * s} height={250 * s} viewBox="0 0 420 250">
        <path d="M 30 210 A 180 180 0 0 1 390 210" fill="none" stroke="#2A2E38" strokeWidth={34} strokeLinecap="round" />
        <path d="M 30 210 A 180 180 0 0 1 210 30" fill="none" stroke={RED} strokeWidth={34} strokeLinecap="round" opacity={0.9} />
        <path d="M 210 30 A 180 180 0 0 1 390 210" fill="none" stroke={GREEN} strokeWidth={34} strokeLinecap="round" opacity={0.9} />
        <g transform={`rotate(${ang} 210 210)`}>
          <polygon points="210,210 202,210 210,58 218,210" fill="#F6E4A0" />
          <circle cx={210} cy={210} r={18} fill="#F6E4A0" stroke="#C5603C" strokeWidth={4} />
        </g>
        <text x={54} y={150} fontFamily={inter.fontFamily} fontWeight={900} fontSize={28} fill={RED} letterSpacing={1}>SLOP</text>
        <text x={300} y={150} fontFamily={inter.fontFamily} fontWeight={900} fontSize={26} fill={GREEN} letterSpacing={1}>HUMAN</text>
      </svg>
    </div>
  );
};

// a robot HEAD-BAND overlay to sit on the Mascot (antenna + blinking bulb + a grey visor): the "AI" state
export const RobotRig: React.FC<{ x: number; y: number; f: number; s?: number }> = ({ x, y, f, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 6, pointerEvents: "none" }}>
    {/* antenna */}
    <div style={{ position: "absolute", left: 56 * s, top: -34 * s, width: 4 * s, height: 34 * s, background: "#8790A0" }} />
    <div style={{ position: "absolute", left: 48 * s, top: -50 * s, width: 20 * s, height: 20 * s, borderRadius: "50%", background: "#61E0FF", boxShadow: `0 0 ${12 * s}px #61E0FF`, opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 4)) }} />
    {/* grey visor over the eyes */}
    <div style={{ position: "absolute", left: 18 * s, top: 34 * s, width: 84 * s, height: 26 * s, borderRadius: 6 * s, background: "linear-gradient(180deg,#3A4150,#20242E)", border: `2px solid #556` }}>
      <div style={{ position: "absolute", left: 8 * s, top: 9 * s, width: 22 * s, height: 6 * s, borderRadius: 3, background: "#61E0FF", opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 3)) }} />
      <div style={{ position: "absolute", right: 8 * s, top: 9 * s, width: 22 * s, height: 6 * s, borderRadius: 3, background: "#61E0FF", opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 3 + 1)) }} />
    </div>
  </div>
);

// colourful confetti burst
export const Confetti: React.FC<{ f: number; x: number; y: number; start?: number; n?: number }> = ({ f, x, y, start = 0, n = 26 }) => {
  const age = Math.max(0, f - start);
  const cols = [CO, GOLD, GREEN, SKY, PINK, "#F6E4A0"];
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + i; const dist = age * (4 + (i % 5)); const g = age * age * 0.12;
    const px = x + Math.cos(a) * dist; const py = y + Math.sin(a) * dist * 0.7 + g;
    return <div key={i} style={{ position: "absolute", left: px, top: py, width: 14, height: 20, background: cols[i % cols.length], transform: `rotate(${age * 12 + i * 40}deg)`, opacity: Math.max(0, 1 - age / 40), zIndex: 40 }} />;
  })}</>);
};

// a soft star sparkle
export const Star: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> = ({ x, y, s = 1, c = "#F6E4A0", o = 1 }) => (
  <svg width={40 * s} height={40 * s} viewBox="-20 -20 40 40" style={{ position: "absolute", left: x, top: y, opacity: o, zIndex: 35 }}>
    <path d="M0,-18 L4,-4 L18,0 L4,4 L0,18 L-4,4 L-18,0 L-4,-4 Z" fill={c} />
  </svg>
);

// canonical single-line caption for storyboard stills: 2-3 big Fraunces words, one hot.
export const CaptionLine: React.FC<{ words: string[]; hot?: number; top?: number }> = ({ words, hot = -1, top = 1240 }) => (
  React.useContext(AssemblyCtx) ? null : // ROOT owns ONE karaoke track across the reel
  <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center", zIndex: 90 }}>
    <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 18px" }}>
      {words.map((w, i) => <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: i === hot ? 88 : 76, lineHeight: 1.08, letterSpacing: "-0.01em", color: i === hot ? "#B8501F" : CLAY, transform: i === hot ? "translateY(-4px)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w}</span>)}
    </div>
  </div>
);
