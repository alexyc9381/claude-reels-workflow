import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Sequence, spring, Audio, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import routeWords from "./data/words_route.json";
import { RouteSetupRec, RouteRunRec } from "./RouteScreenRec";

// ============================== palette / helpers (same chassis as UNLOCK) ==============================
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", CLAYD = "#B8501F", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", SKY = "#5AA0DE";
const GBLUE = "#4A90F0", GBLUED = "#1D63D6", GSPARK = "#CFE1FF";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "0 34px 66px -22px rgba(18,28,58,0.5), 0 10px 24px rgba(18,28,58,0.28)";
const P_TOP = 384, P_H = 792;
const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const bob = (f: number, amp = 6, period = 60, ph = 0) => Math.sin((f / period + ph) * Math.PI * 2) * amp;
const spr = (frame: number, delay = 0, damping = 12, stiffness = 200, mass = 1) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness, mass }, durationInFrames: 200 });

const Grain: React.FC<{ op?: number }> = ({ op = 0.05 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "overlay", opacity: op }}>
    <filter id="gnr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
    <rect width="100%" height="100%" filter="url(#gnr)" />
  </svg>
);
const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.5 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 62% 58% at 50% 42%, transparent 44%, rgba(6,10,20,${strength}) 100%)` }} />
);
const Sparkles: React.FC<{ lf: number; at: number; x: number; y: number; n?: number; spread?: number; colors?: string[]; dur?: number }> = ({ lf, at, x, y, n = 12, spread = 130, colors = ["#F2E14C", "#FFFFFF", CLAY], dur = 0.8 }) => {
  const p = ramp(lf, fr(at), fr(at + dur));
  if (p <= 0.001 || p >= 0.999) return null;
  return <>{Array.from({ length: n }).map((_, k) => { const a = (k / n) * Math.PI * 2 + seed(k); const d = Math.pow(p, 0.55) * spread * (0.55 + seed(k * 2) * 0.7); const s = 6 + seed(k * 3) * 6; const o = Math.max(0, 1 - p); const c = colors[k % colors.length]; return <div key={k} style={{ position: "absolute", left: x + Math.cos(a) * d - s / 2, top: y + Math.sin(a) * d - s / 2 + p * p * 20, width: s, height: s, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}`, pointerEvents: "none" }} />; })}</>;
};

// ============================== the clay critter — Claude (copied verbatim, incl. `constr` hardhat costume) ==============================
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; constr?: number; tint?: string }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, constr = 0, tint }) => {
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
        {constr > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#E4622B" />
          <rect x={44} y={113} width={112} height={5} fill="#F4F1EA" /><rect x={44} y={134} width={112} height={5} fill="#F4F1EA" />
          <rect x={92} y={106} width={16} height={40} fill="#C94E1C" />
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {constr > 0 && <>
          <polygon points="100,10 62,34 138,34" fill="#F5CE55" />
          <rect x={44} y={30} width={112} height={12} fill="#F5CE55" />
          <rect x={30} y={40} width={140} height={10} fill="#D9A626" />
          <rect x={94} y={16} width={12} height={16} fill="#E9BE3F" />
        </>}
      </svg>
    </div>
  );
};

// ============================== NEW sprite — Gemini worker bot (blue sibling + spark emblem) ==============================
const GeminiBot: React.FC<{ lf: number; size?: number; gaze?: number; cheer?: number; work?: number }> = ({ lf, size = 250, gaze = 0, cheer = 0, work = 0 }) => {
  const hop = Math.max(0, Math.sin(lf / 6)) * 3.4;
  const blink = (lf % 84) < 5 ? 0.15 : 1;
  const eyeH = 24 * blink;
  const swing = work ? Math.sin(lf / 4) * 24 : 0;
  const armY = 86 - cheer * 26;
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop}px)`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        <rect x={8} y={armY} width={26} height={26} fill={GBLUE} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : `rotate(${swing} 21 99)`} />
        <rect x={166} y={armY} width={26} height={26} fill={GBLUE} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : `rotate(${-swing} 179 99)`} />
        <rect x={34} y={44} width={132} height={102} fill={GBLUE} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.2)" />
        {/* tool belt */}
        <rect x={34} y={128} width={132} height={12} fill={GBLUED} />
        <rect x={92} y={126} width={16} height={16} fill="#A9C4F2" />
        {/* Gemini 4-point spark emblem on chest */}
        <path d="M100 60 C104 78 112 86 130 90 C112 94 104 102 100 120 C96 102 88 94 70 90 C88 86 96 78 100 60 Z" fill={GSPARK} />
        {/* legs */}
        <rect x={52} y={146} width={17} height={38} fill={GBLUE} />
        <rect x={77} y={146} width={17} height={38} fill={GBLUE} />
        <rect x={124} y={146} width={17} height={38} fill={GBLUE} />
        <rect x={149} y={146} width={17} height={38} fill={GBLUE} />
        {/* eyes */}
        <rect x={70 + gaze} y={70 + (24 - eyeH) / 2} width={15} height={eyeH} fill="#0B1B3A" />
        <rect x={116 + gaze} y={70 + (24 - eyeH) / 2} width={15} height={eyeH} fill="#0B1B3A" />
        {/* white worker hardhat */}
        <polygon points="100,10 62,34 138,34" fill="#EDF3FF" />
        <rect x={44} y={30} width={112} height={12} fill="#EDF3FF" />
        <rect x={30} y={40} width={140} height={10} fill="#B9CCEC" />
        <rect x={94} y={16} width={12} height={16} fill="#DCE7FB" />
      </svg>
    </div>
  );
};

// ============================== studio bg (cream, same look) ==============================
const StudioBg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(178deg, #F7F0E4 0%, #F3EAD9 44%, #F1E4D0 72%, #EADAC2 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 720, background: "radial-gradient(ellipse 72% 62% at 50% 0%, rgba(255,251,244,0.7), transparent 72%)" }} />
      <div style={{ position: "absolute", left: -120, right: -120, bottom: 0, height: 560, borderRadius: "50% 50% 0 0 / 20% 20% 0 0", background: "linear-gradient(180deg, rgba(228,206,176,0.0), rgba(220,194,158,0.6))" }} />
      {[{ c: CLAY, x: 120, y: 200 }, { c: SKY, x: 970, y: 260 }, { c: SKY, x: 150, y: 1670 }, { c: GOLD, x: 950, y: 1640 }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x - 300 + Math.sin(f / 50 + i) * 22, top: b.y - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${b.c}, transparent 62%)`, opacity: 0.1, filter: "blur(16px)" }} />
      ))}
      <div style={{ position: "absolute", left: 90, right: 90, top: P_TOP + P_H - 14, height: 64, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,30,18,0.3), transparent 70%)", filter: "blur(9px)" }} />
      <Grain op={0.04} />
    </AbsoluteFill>
  );
};

// ============================== the dark panel (same look) ==============================
const Panel: React.FC<{ label?: string; children?: React.ReactNode }> = ({ label, children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: P_TOP, height: P_H, borderRadius: 36, background: grad("#1B2334", "#0F1522"), boxShadow: SH, overflow: "hidden", border: `2px solid rgba(120,150,200,0.22)` }}>
    <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(220,235,255,0.08), inset 0 0 150px rgba(0,0,0,0.55)", pointerEvents: "none", borderRadius: 36 }} />
    <Vignette strength={0.4} />
    <Grain op={0.045} />
    <div style={{ position: "absolute", left: 26, top: 20, display: "flex", gap: 9, alignItems: "center", zIndex: 30 }}>
      {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}
      {label && <span style={{ marginLeft: 12, fontFamily: mono, fontSize: 20, color: "rgba(190,205,235,0.5)" }}>{label}</span>}
    </div>
  </div>
);

// ============================== top gamified rail (same styling) ==============================
const Rail: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const done = [0, 1, 2, 3, 4].filter((i) => p >= ((i + 1) / 5) * 0.94 - 0.001).length;
  const score = Math.round(p * 47);
  const stars = [0.13, 0.5, 0.87];
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 262, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999 }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {stars.map((s, i) => { const passed = p >= s; return (
        <div key={`s${i}`} style={{ position: "absolute", left: `${s * 100}%`, top: 8, transform: "translateX(-50%)", width: 42, height: 42 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: passed ? "#fff" : GOLD }}>★</div>
        </div>); })}
      {[0, 1, 2, 3, 4].map((i) => { const np = ((i + 1) / 5) * 0.94; const passed = i < done; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 54, height: 54 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: passed ? GREEN : "#EDE7DB", border: `4px solid ${passed ? GREEN : CLAY}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: passed ? "#fff" : CLAY }}>{passed ? "✓" : i + 1}</div>
        </div>); })}
      <div style={{ position: "absolute", left: `${Math.min(p, 0.92) * 100}%`, top: -12, transform: "translateX(-50%)", zIndex: 126 }}>
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}` }} />
        <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.4} nodSpeed={7} cheer={0.18} gaze={2} /></div>
        <div style={{ position: "absolute", left: "50%", top: -33, transform: "translateX(-50%)", padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", zIndex: 3 }}>{"★ " + score}</div>
      </div>
    </div>
  );
};

// ============================== header pill (same styling) ==============================
const HeaderPill: React.FC<{ badge: string; l1: React.ReactNode; l2: React.ReactNode; size?: number }> = ({ badge, l1, l2, size = 50 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 322, display: "flex", justifyContent: "center", zIndex: 200 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "14px 30px 14px 14px", borderRadius: 26, background: "linear-gradient(180deg, #FFFFFF 0%, #F4EEE2 100%)", border: "3px solid #ECE5D6", boxShadow: "0 22px 50px -14px rgba(20,26,45,0.45), inset 0 2px 0 rgba(255,255,255,0.95)" }}>
      <div style={{ width: 88, height: 88, borderRadius: 20, background: "linear-gradient(158deg, #E7896A, #C5603C)", border: "3px solid #F3C7B4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{badge}</div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.0 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, color: INK, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{l1}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, color: INK, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{l2}</span>
      </div>
    </div>
  </div>
);

// ============================== karaoke caption (same styling, static per-still) ==============================
const Caption: React.FC<{ parts: string[]; active: number }> = ({ parts, active }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top: 1270, textAlign: "center", zIndex: 90 }}>
    <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
      {parts.map((w, i) => { const on = i <= active; const act = i === active; return (
        <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1.1, color: on ? (act ? CLAYD : CLAY) : "#5A463C", transform: act ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: act ? "0 2px 14px rgba(255,251,244,0.95)" : "0 1px 3px rgba(90,70,60,0.35)" }}>{w}</span>); })}
    </div>
  </div>
);

// ============================== construction backdrop (inside panel) ==============================
const ConstrBg: React.FC<{ dim?: number }> = ({ dim = 1 }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#243049 0%,#141C2C 60%,#0E1420 100%)" }} />
    {[120, 340, 680, 880].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 80, bottom: 150, width: 8, background: `rgba(231,178,76,${0.12 * dim})` }} />)}
    {[240, 420, 600].map((y, i) => <div key={i} style={{ position: "absolute", left: 60, right: 60, top: y, height: 6, background: `rgba(231,178,76,${0.08 * dim})` }} />)}
    <div style={{ position: "absolute", left: 40, top: 60, width: 620, height: 10, background: `rgba(231,178,76,${0.22 * dim})` }} />
    <div style={{ position: "absolute", left: 60, top: 60, width: 10, height: 150, background: `rgba(231,178,76,${0.22 * dim})` }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: "linear-gradient(180deg,#2A3550,#1A2234)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 96, height: 10, background: "repeating-linear-gradient(45deg,#E7B24C,#E7B24C 14px,#1A2234 14px,#1A2234 28px)", opacity: 0.45 * dim }} />
  </>
);

// ============================== screen-recording inset (device window) ==============================
const ScreenRec: React.FC<{ x: number; y: number; w: number; h: number; title: string; lines: { t: string; c: string }[]; lf: number; rec?: boolean }> = ({ x, y, w, h, title, lines, lf, rec = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 16, background: "#0C121E", border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 24px 46px -16px rgba(0,0,0,0.7)", overflow: "hidden", zIndex: 8 }}>
    <div style={{ height: 40, background: "#161E2C", display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
      {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />)}
      <span style={{ marginLeft: 12, fontFamily: mono, fontSize: 18, color: "rgba(200,210,235,0.62)" }}>{title}</span>
      {rec && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: RED, opacity: lf % 30 < 16 ? 1 : 0.25 }} />
        <span style={{ fontFamily: mono, fontSize: 16, color: RED, letterSpacing: 1 }}>REC</span>
      </div>}
    </div>
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      {lines.map((l, i) => <span key={i} style={{ fontFamily: mono, fontSize: 23, color: l.c, opacity: lf > i * 5 + 4 ? 1 : 0.12 }}>{l.t}</span>)}
    </div>
  </div>
);

// ============================== DETAILED CONSTRUCTION-SITE DIORAMA (hook backdrop) ==============================
// tower crane silhouette (mast lattice + jib + counter-weight + swaying cable/hook or a lifted I-beam)
const Crane: React.FC<{ x: number; y: number; w: number; flip?: boolean; op?: number; lf: number; beam?: boolean }> = ({ x, y, w, flip, op = 1, lf, beam = false }) => {
  const sway = Math.sin(lf / 45) * 5;
  return (
    <svg viewBox="0 0 300 400" width={w} height={w * 400 / 300} style={{ position: "absolute", left: x, top: y, opacity: op, transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}>
      <rect x={128} y={366} width={44} height={22} fill="#101A2E" />
      <rect x={140} y={70} width={20} height={300} fill="#1C2B45" />
      <path d="M140 70 L160 100 M160 70 L140 100 M140 130 L160 160 M160 130 L140 160 M140 190 L160 220 M160 190 L140 220 M140 250 L160 280 M160 250 L140 280 M140 310 L160 340 M160 310 L140 340" stroke="#2E3F60" strokeWidth={3} />
      <rect x={126} y={50} width={48} height={26} fill="#24344F" />
      <polygon points="150,46 300,64 300,76 150,72" fill="#24344F" />
      <path d="M168 56 L196 72 M212 58 L240 74 M256 60 L284 76" stroke="#37496E" strokeWidth={3} />
      <polygon points="150,50 66,64 66,74 150,66" fill="#1C2B45" />
      <rect x={60} y={60} width={28} height={28} fill="#0E1830" />
      <line x1={266 + sway} y1={70} x2={266 + sway} y2={beam ? 250 : 182} stroke="rgba(180,200,230,0.5)" strokeWidth={2} />
      {beam
        ? <rect x={236 + sway} y={250} width={80} height={16} fill="#39506F" stroke="#4A648A" strokeWidth={2} />
        : <path d={`M${258 + sway} 182 h16 l-4 14 h-8 z`} fill="#3A4E72" />}
      <circle cx={150} cy={40} r={5} fill="#E24B4A" opacity={lf % 30 < 15 ? 1 : 0.35} />
    </svg>
  );
};
const Skyline: React.FC = () => (
  <>{[{ x: 20, w: 92, h: 130 }, { x: 118, w: 66, h: 190 }, { x: 190, w: 104, h: 150 }, { x: 300, w: 60, h: 110 }, { x: 720, w: 78, h: 168 }, { x: 806, w: 112, h: 210 }, { x: 924, w: 64, h: 130 }].map((b, i) => (
    <div key={i} style={{ position: "absolute", left: b.x, top: 560 - b.h, width: b.w, height: b.h, background: "#0C1424" }}>
      {Array.from({ length: Math.floor(b.h / 30) * 2 }).map((_, k) => { const lit = seed(i * 7 + k) > 0.62; return <div key={k} style={{ position: "absolute", left: 9 + (k % 2) * (b.w / 2), top: 12 + Math.floor(k / 2) * 30, width: b.w / 2 - 17, height: 13, background: lit ? "rgba(231,178,76,0.32)" : "rgba(120,140,180,0.07)" }} />; })}
    </div>
  ))}</>
);
const Girders: React.FC = () => {
  const x = 690, y = 300, w = 282, h = 376, cols = 4, floors = 5;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,32,52,0.35),rgba(12,20,36,0.8))" }} />
      {[0.42, 0.62, 0.82].map((fy, i) => <div key={i} style={{ position: "absolute", left: 0, top: h * fy, width: i === 0 ? w * 0.55 : w, height: 14, background: i === 0 ? "#363E52" : "#3E475C" }} />)}
      {Array.from({ length: cols + 1 }).map((_, c) => <div key={c} style={{ position: "absolute", left: c * (w / cols) - 4, top: 0, width: 8, height: h, background: "#2C3C5A" }} />)}
      {Array.from({ length: floors + 1 }).map((_, r) => <div key={r} style={{ position: "absolute", left: 0, top: r * (h / floors) - 4, width: w, height: 7, background: "#374A6E" }} />)}
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        <path d={`M0 ${h / floors} L${w / cols} 0 M${w / cols} ${h / floors} L0 0`} stroke="#2C3C5A" strokeWidth={4} />
        <path d={`M${w - w / cols} ${h * 2 / floors} L${w} ${h / floors} M${w} ${h * 2 / floors} L${w - w / cols} ${h / floors}`} stroke="#2C3C5A" strokeWidth={4} />
      </svg>
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 22 + i * 82, top: h * 0.86, width: 54, height: h * 0.1, background: "rgba(231,178,76,0.26)" }} />)}
      <div style={{ position: "absolute", left: 0, top: -4, width: w, height: 46, background: "repeating-linear-gradient(45deg,rgba(150,168,196,0.16) 0 6px,transparent 6px 12px)" }} />
    </div>
  );
};
const LeftBuild: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 34, top: 314, width: 206, height: 362, background: "linear-gradient(180deg,#152134,#0F1930)" }} />
    {Array.from({ length: 12 }).map((_, k) => { const lit = seed(k * 3) > 0.64; return <div key={k} style={{ position: "absolute", left: 54 + (k % 2) * 86, top: 340 + Math.floor(k / 2) * 54, width: 64, height: 34, background: lit ? "rgba(231,178,76,0.28)" : "rgba(120,140,180,0.06)", border: "1px solid rgba(120,140,180,0.12)" }} />; })}
    {[44, 118, 196, 236].map((px, i) => <div key={i} style={{ position: "absolute", left: px, top: 320, width: 6, height: 356, background: "#4A566E" }} />)}
    {[366, 446, 526, 606].map((py, i) => <div key={i} style={{ position: "absolute", left: 40, top: py, width: 200, height: 8, background: "#7A6A4A" }} />)}
    <svg viewBox="0 0 210 360" width={210} height={360} style={{ position: "absolute", left: 34, top: 320 }}>
      {[0, 1, 2].map((r) => <path key={r} d={`M6 ${46 + r * 80} L200 ${126 + r * 80} M200 ${46 + r * 80} L6 ${126 + r * 80}`} stroke="rgba(120,134,158,0.28)" strokeWidth={2} />)}
    </svg>
  </>
);
const WorkLight: React.FC<{ x: number; flip?: boolean }> = ({ x, flip }) => (
  <div style={{ position: "absolute", left: x, top: 248, transform: flip ? "scaleX(-1)" : undefined }}>
    <div style={{ position: "absolute", left: -160, top: 44, width: 340, height: 460, clipPath: "polygon(44% 0,56% 0,100% 100%,0 100%)", background: "linear-gradient(180deg,rgba(255,214,138,0.18),transparent 80%)" }} />
    <div style={{ position: "absolute", left: -4, top: 44, width: 8, height: 434, background: "#39445E" }} />
    <div style={{ position: "absolute", left: -30, top: 22, width: 64, height: 30, borderRadius: 6, background: "#4A5670", border: "2px solid #5E6C8A" }} />
    <div style={{ position: "absolute", left: -24, top: 28, width: 52, height: 18, background: "rgba(255,226,152,0.95)", boxShadow: "0 0 26px rgba(255,212,132,0.85)" }} />
  </div>
);
const BrickStack: React.FC<{ x: number; y: number; rows?: number }> = ({ x, y, rows = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    {Array.from({ length: rows }).map((_, r) => <div key={r} style={{ position: "absolute", left: (r % 2) * 6, top: -r * 16, display: "flex", gap: 3 }}>{[0, 1, 2, 3].map((c) => <div key={c} style={{ width: 22, height: 13, background: (r + c) % 2 ? "#B0542E" : "#9A4726", border: "1px solid #7A3A1E" }} />)}</div>)}
  </div>
);
const Cone: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <svg viewBox="0 0 40 50" width={40 * s} height={50 * s} style={{ position: "absolute", left: x, top: y }}>
    <polygon points="20,4 30,44 10,44" fill="#E0662B" />
    <rect x={11} y={26} width={18} height={7} fill="#F4E9DA" />
    <rect x={6} y={44} width={28} height={6} rx={2} fill="#C4531F" />
  </svg>
);
const WarnSign: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg viewBox="0 0 60 74" width={60} height={74} style={{ position: "absolute", left: x, top: y }}>
    <rect x={27} y={44} width={6} height={30} fill="#3A445E" />
    <polygon points="30,4 56,48 4,48" fill="#E7B24C" stroke="#1A1813" strokeWidth={3} />
    <rect x={27} y={18} width={6} height={16} fill="#1A1813" />
    <rect x={27} y={38} width={6} height={5} fill="#1A1813" />
  </svg>
);
const Mixer: React.FC<{ x: number; y: number; lf: number }> = ({ x, y, lf }) => (
  <svg viewBox="0 0 100 84" width={100} height={84} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <rect x={12} y={58} width={76} height={8} fill="#2A3450" />
    <circle cx={26} cy={72} r={10} fill="#141E30" stroke="#3A465E" strokeWidth={3} />
    <circle cx={74} cy={72} r={10} fill="#141E30" stroke="#3A465E" strokeWidth={3} />
    <rect x={20} y={30} width={10} height={30} fill="#3A465E" />
    <g transform={`rotate(${lf * 3} 56 40)`}><ellipse cx={56} cy={40} rx={26} ry={22} fill="#D9A430" /><ellipse cx={56} cy={40} rx={14} ry={12} fill="#B8871C" /></g>
  </svg>
);
const Pipes: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg viewBox="0 0 90 40" width={90} height={40} style={{ position: "absolute", left: x, top: y }}>
    {[0, 1, 2].map((i) => <circle key={i} cx={16 + i * 28} cy={26} r={13} fill="#33455F" stroke="#4A5E7E" strokeWidth={3} />)}
    {[0, 1].map((i) => <circle key={i} cx={30 + i * 28} cy={13} r={13} fill="#2A3A52" stroke="#4A5E7E" strokeWidth={3} />)}
  </svg>
);
const Toolbox: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg viewBox="0 0 70 50" width={70} height={50} style={{ position: "absolute", left: x, top: y }}>
    <rect x={6} y={20} width={58} height={26} rx={3} fill="#C4472A" />
    <rect x={6} y={20} width={58} height={7} fill="#A63A20" />
    <rect x={26} y={10} width={18} height={10} rx={3} fill="none" stroke="#8A5A2A" strokeWidth={4} />
    <rect x={30} y={30} width={10} height={8} fill="#7A2E18" />
  </svg>
);
const Dust: React.FC<{ lf: number }> = ({ lf }) => (
  <>{Array.from({ length: 16 }).map((_, i) => { const life = 120 + seed(i) * 80; const t = (lf + seed(i * 3) * life) % life; const p = t / life; const x = seed(i) * 1012; const y = 700 - p * 280; const s = 2 + seed(i * 2) * 4; return <div key={i} style={{ position: "absolute", left: x + Math.sin(lf / 20 + i) * 20, top: y, width: s, height: s, borderRadius: "50%", background: "rgba(224,214,192,0.5)", opacity: (1 - p) * 0.5 }} />; })}</>
);
const ConstrSite: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0C1626 0%,#172640 46%,#243250 66%,#2B2C3D 82%,#20222E 100%)" }} />
    <div style={{ position: "absolute", left: "50%", top: 420, width: 920, height: 380, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(231,150,80,0.15),transparent 66%)" }} />
    <div style={{ position: "absolute", left: 828, top: 108, width: 54, height: 54, borderRadius: "50%", background: "radial-gradient(circle at 38% 38%,#F4ECD6,#CBB98E)", boxShadow: "0 0 40px rgba(244,236,214,0.28)" }} />
    <Skyline />
    <Crane lf={lf} x={-14} y={150} w={210} op={0.48} />
    <Crane lf={lf} x={782} y={118} w={228} flip op={0.54} />
    <LeftBuild />
    <Girders />
    <Crane lf={lf} x={330} y={68} w={300} op={0.92} beam />
    {/* ground */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 676, height: 116, background: "linear-gradient(180deg,#28344E,#131D2E)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 666, height: 12, background: "repeating-linear-gradient(45deg,#E7B24C 0 16px,#1A1813 16px 32px)", opacity: 0.55 }} />
    <WorkLight x={196} />
    <WorkLight x={820} flip />
    {/* foreground props */}
    <BrickStack x={64} y={666} rows={3} />
    <BrickStack x={150} y={670} rows={2} />
    <Pipes x={256} y={646} />
    <Mixer x={406} y={606} lf={lf} />
    <WarnSign x={556} y={598} />
    <Cone x={518} y={634} />
    <Cone x={612} y={640} s={0.85} />
    <Toolbox x={874} y={648} />
    <Dust lf={lf} />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)", pointerEvents: "none" }} />
  </>
);

// ============================== richer hook header (draining battery gauge + hazard accent + alert tag) ==============================
const BatteryGauge: React.FC<{ pct: number; lf: number }> = ({ pct, lf }) => (
  <svg viewBox="0 0 72 72" width={72} height={72}>
    <rect x={8} y={22} width={48} height={30} rx={6} fill="#211A12" stroke="#F0DFBE" strokeWidth={3.5} />
    <rect x={56} y={31} width={7} height={12} rx={2} fill="#F0DFBE" />
    <rect x={12} y={26} width={40 * pct} height={22} rx={3} fill={pct < 0.35 ? "#E24B4A" : "#E7B24C"} />
    <path d="M34 24 L24 40 L33 40 L30 52 L44 34 L35 34 Z" fill="#fff" opacity={0.95} />
    {pct < 0.35 && <circle cx={62} cy={15} r={4} fill="#E24B4A" opacity={lf % 24 < 12 ? 1 : 0.2} />}
  </svg>
);
// hook header variants for A/B testing (0 = value, 1 = curiosity, 2 = pain)
const HOOK_HEADERS: { size: number; l1: React.ReactNode; l2: React.ReactNode }[] = [
  { size: 58, l1: (<><span style={{ color: GBLUED }}>GEMINI 3.6</span> IN CLAUDE</>), l2: (<>= <span style={{ color: CLAY }}>90% LESS USAGE</span></>) },
  { size: 62, l1: (<>RUN <span style={{ color: GBLUED }}>GEMINI 3.6</span></>), l2: (<>IN <span style={{ color: CLAY }}>CLAUDE CODE</span></>) },
  { size: 60, l1: (<>STOP <span style={{ color: CLAY }}>WASTING</span></>), l2: (<>CLAUDE TOKENS</>) },
];
const HookHeaderRich: React.FC<{ lf: number; variant?: number }> = ({ lf, variant = 0 }) => {
  const settle = over(lf, 0, fr(0.5), Easing.out(Easing.back(1.3)));
  const H = HOOK_HEADERS[variant] || HOOK_HEADERS[0];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 292, display: "flex", justifyContent: "center", zIndex: 200, transform: `translateY(${(1 - settle) * -18}px) scale(${0.92 + settle * 0.08})` }}>
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 18, padding: "18px 38px 18px 18px", borderRadius: 32, background: "linear-gradient(180deg,#FFFFFF,#F4EEE2)", border: "3px solid #ECE5D6", boxShadow: "0 24px 54px -14px rgba(20,26,45,0.55),inset 0 2px 0 rgba(255,255,255,0.95)" }}>
        <div style={{ width: 116, height: 116, borderRadius: 26, background: "linear-gradient(158deg,#5EA0F5,#1B63D6)", border: "3px solid #AECCFA", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 18px -6px rgba(29,99,214,0.6), inset 0 2px 0 rgba(255,255,255,0.35)" }}>
          <svg viewBox="0 0 100 100" width={72} height={72}><path d="M50 10 C56 40 60 44 90 50 C60 56 56 60 50 90 C44 60 40 56 10 50 C40 44 44 40 50 10 Z" fill="#fff" /></svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.02 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: H.size, color: INK, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{H.l1}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: H.size, color: INK, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{H.l2}</span>
        </div>
      </div>
    </div>
  );
};

// ============================== SCENE 1 — HOOK (rivals on a detailed site + draining usage HUD) ==============================
const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const usage = interpolate(f, [4, 26], [0.82, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clashPulse = 0.5 + Math.sin(f / 4) * 0.5;
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.08} done={0} />
      <HookHeaderRich lf={f} />
      <Panel label="claude vs gemini">
        <ConstrSite lf={f} />
        {/* draining usage HUD (framed screen) */}
        <div style={{ position: "absolute", left: 276, top: 150, width: 460, padding: "16px 22px", borderRadius: 16, background: "rgba(12,20,34,0.82)", border: "1.5px solid rgba(231,178,76,0.35)", boxShadow: "0 0 30px rgba(0,0,0,0.4)", zIndex: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontFamily: mono, fontSize: 21, color: "#E7D9C4", letterSpacing: 1 }}>CLAUDE USAGE</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: RED }}>▼ {Math.round(usage * 100)}%</span>
          </div>
          <div style={{ height: 26, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", border: "2px solid rgba(255,255,255,0.16)" }}>
            <div style={{ height: "100%", width: `${usage * 100}%`, background: grad("#E06A50", "#B8341F"), borderRadius: 999, boxShadow: "0 0 18px rgba(196,74,58,0.75)" }} />
          </div>
        </div>
        {/* Claude foreman (left) */}
        <div style={{ position: "absolute", left: 70, top: 426, zIndex: 10 }}><Mascot lf={f} size={250} constr={1} gaze={4} stern={0.5} nodAmp={2} /></div>
        {/* Gemini worker (right) */}
        <div style={{ position: "absolute", left: 698, top: 426, transform: "scaleX(-1)", zIndex: 10 }}><GeminiBot lf={f} size={250} gaze={4} /></div>
        {/* clash VS badge */}
        <div style={{ position: "absolute", left: 506, top: 512, transform: `translate(-50%,-50%) scale(${1 + clashPulse * 0.12})`, zIndex: 14, padding: "10px 24px", borderRadius: 16, background: RED, border: "4px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: "#fff", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.6)" }}>VS</div>
        <div style={{ position: "absolute", left: 506, top: 512 }}><Sparkles lf={f} at={0.2} x={0} y={0} n={12} spread={130} colors={[RED, "#FFCE5A", "#fff"]} dur={0.9} /></div>
      </Panel>
      <Caption parts={["stop", "burning", "your", "Claude", "limits"]} active={3} />
    </AbsoluteFill>
  );
};

// ============================== SCENE 2 — SETUP (screen-rec on top, foreman + checklist below) ==============================
const CHECK = ["Google AI key", "Gemini CLI", "Gemini plugin", "/route skill"];
const SceneSetup: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.34} done={1} />
      <Panel label="setup · step 1 / 4">
        <ConstrBg dim={0.6} />
        {/* the screen recording slot */}
        <ScreenRec lf={f} x={106} y={70} w={800} h={300} title="terminal · install the Gemini CLI"
          lines={[
            { t: "$ npm i -g @google/gemini-cli", c: "#8FE3B6" },
            { t: "added 1 package in 3s", c: "#9FB2CF" },
            { t: "$ gemini  # paste your free AI key", c: "#8FE3B6" },
            { t: "✓ connected to gemini-3", c: "#7FD0FF" },
          ]} />
        {/* label ribbon that this is YOUR recording */}
        <div style={{ position: "absolute", left: 106, top: 44, zIndex: 12, padding: "5px 14px", borderRadius: 10, background: "rgba(196,74,58,0.16)", border: `1.5px solid ${RED}`, fontFamily: mono, fontSize: 17, color: "#F0B4AB", letterSpacing: 1 }}>◉ YOUR SCREEN RECORDING</div>
        {/* Claude foreman pointing up */}
        <div style={{ position: "absolute", left: 90, top: 396, zIndex: 10 }}><Mascot lf={f} size={230} constr={1} cheer={0.7} gaze={3} nodAmp={2.5} /></div>
        {/* checklist card */}
        <div style={{ position: "absolute", left: 470, top: 410, width: 440, borderRadius: 18, background: "rgba(20,28,42,0.92)", border: "1.5px solid rgba(255,255,255,0.14)", padding: "20px 24px", zIndex: 9 }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff", marginBottom: 14 }}>SETUP</div>
          {CHECK.map((c, i) => { const done = i === 0; return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: done ? GREEN : "transparent", border: `2.5px solid ${done ? GREEN : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 22 }}>{done ? "✓" : i + 1}</div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: done ? "#fff" : "rgba(220,228,244,0.6)", textDecoration: done ? "none" : "none" }}>{c}</span>
            </div>); })}
        </div>
      </Panel>
      <Caption parts={["grab", "a", "free", "Google", "AI", "key"]} active={4} />
    </AbsoluteFill>
  );
};

// ============================== SCENE 3 — DEMO (the /route loop: boss delegates, worker builds, boss reviews) ==============================
const Blueprint: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="0 0 120 90" width={s} height={s * 90 / 120} style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))" }}>
    <rect x={4} y={4} width={112} height={82} rx={6} fill="#1C3A94" />
    {[20, 34, 48, 62, 76].map((y) => <line key={y} x1={12} y1={y} x2={108} y2={y} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />)}
    {[24, 48, 72, 96].map((x) => <line key={x} x1={x} y1={12} x2={x} y2={80} stroke="rgba(255,255,255,0.16)" strokeWidth={1} />)}
    <polygon points="42,58 60,42 78,58" fill="none" stroke="#EDF3FF" strokeWidth={3} />
    <rect x={47} y={58} width={26} height={18} fill="none" stroke="#EDF3FF" strokeWidth={3} />
  </svg>
);
const BrickTower: React.FC<{ rows: number; x: number; baseY: number }> = ({ rows, x, baseY }) => (
  <>{Array.from({ length: rows }).map((_, r) => (
    <div key={r} style={{ position: "absolute", left: x, top: baseY - (r + 1) * 30, display: "flex", gap: 4, zIndex: 9 }}>
      {[0, 1, 2].map((c) => <div key={c} style={{ width: 46, height: 26, background: (r + c) % 2 ? "#C86A3E" : "#B0542E", border: "2px solid #8B4322", borderRadius: 3 }} />)}
    </div>))}</>
);
const FlowTag: React.FC<{ x: number; y: number; label: string; c: string }> = ({ x, y, label, c }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 15, display: "flex", alignItems: "center", gap: 8, padding: "7px 15px", borderRadius: 999, background: c, border: "2px solid rgba(255,255,255,0.85)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#fff", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.55)", whiteSpace: "nowrap" }}>{label}</div>
);
const SceneDemo: React.FC = () => {
  const f = useCurrentFrame();
  const rows = Math.round(interpolate(f, [4, 40], [1, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.72} done={4} />
      <Panel label="/route · claude orchestrates, gemini builds">
        <ConstrBg />
        {/* boss: Claude + blueprint */}
        <div style={{ position: "absolute", left: 46, top: 300, zIndex: 10 }}><Mascot lf={f} size={210} constr={1} gaze={5} nodAmp={2} /></div>
        <div style={{ position: "absolute", left: 214, top: 356, zIndex: 12 }}><Blueprint s={132} /></div>
        <div style={{ position: "absolute", left: 132, top: 300, transform: "translateX(-50%)", zIndex: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: GOLD }}>BOSS</div>
        {/* delegate arrow */}
        <FlowTag x={400} y={440} label="→ delegates" c={CLAY} />
        {/* worker: Gemini building the tower */}
        <BrickTower rows={rows} x={640} baseY={648} />
        <div style={{ position: "absolute", left: 760, top: 372, zIndex: 10 }}><GeminiBot lf={f} size={210} work={1} gaze={3} /></div>
        <div style={{ position: "absolute", left: 812, top: 344, transform: "translateX(-50%)", zIndex: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#9FC2FF" }}>WORKER</div>
        {/* review loop */}
        <div style={{ position: "absolute", left: 640, top: 250, zIndex: 16, padding: "7px 16px", borderRadius: 10, background: GREEN, border: "3px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff", transform: "rotate(-7deg)", boxShadow: "0 10px 22px -8px rgba(0,0,0,0.5)" }}>✓ APPROVED</div>
        <FlowTag x={506} y={210} label="↺ Claude reviews" c="#2E7D57" />
        {/* terminal inset — the money shot */}
        <ScreenRec lf={f} x={332} y={548} w={520} h={188} title="claude code" rec={true}
          lines={[
            { t: "$ /route", c: "#8FE3B6" },
            { t: "▸ planning → delegating to gemini-3", c: "#7FD0FF" },
            { t: "✓ reviewed · shipped", c: "#C7B7F0" },
          ]} />
      </Panel>
      <Caption parts={["type", "slash", "route", "Claude", "takes", "over"]} active={2} />
    </AbsoluteFill>
  );
};

// ============================== sfx helper ==============================
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 1.6 }) => {
  const D = fr(dur);
  return (
    <Sequence from={fr(at)} durationInFrames={D}>
      <Audio src={staticFile(`sfx/${src}`)} volume={(f) => v * Math.min(1, f / 2) * Math.min(1, Math.max(0, (D - 1 - f) / 6))} />
    </Sequence>
  );
};

// ============================== character-action props ==============================
// overloaded Claude carries a teetering overhead stack of bricks (grows shakier)
const CarryStack: React.FC<{ cx: number; baseY: number; rows: number; lf: number; teeter: number }> = ({ cx, baseY, rows, lf, teeter }) => {
  const sway = (Math.sin(lf / 13) * 5 + Math.sin(lf / 5.5) * 2.2) * teeter;
  return (
    <div style={{ position: "absolute", left: cx, top: baseY, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)`, zIndex: 11 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ position: "absolute", left: -39, top: -(r + 1) * 21, display: "flex", gap: 3 }}>
          {[0, 1].map((c) => <div key={c} style={{ width: 37, height: 18, background: (r + c) % 2 ? "#C86A3E" : "#B0542E", border: "2px solid #8B4322", borderRadius: 3 }} />)}
        </div>))}
    </div>
  );
};
// tug-of-war rope with a center knot that shifts toward whoever's winning
const TugRope: React.FC<{ x1: number; x2: number; y: number; pull: number }> = ({ x1, x2, y, pull }) => {
  const midx = (x1 + x2) / 2 + pull * 34; const sag = 22;
  return (
    <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 11, pointerEvents: "none", overflow: "visible" }}>
      <path d={`M${x1} ${y} Q ${midx} ${y + sag} ${x2} ${y}`} stroke="#B8925A" strokeWidth={8} fill="none" strokeLinecap="round" />
      <g transform={`translate(${midx} ${y + sag}) rotate(${pull * 12})`}><rect x={-7} y={-3} width={14} height={26} fill="#C44A3A" /><rect x={-7} y={-3} width={14} height={6} fill="#9A3226" /></g>
    </svg>
  );
};
// a brick handed off through the air (Claude -> Gemini) on an arc
const FlyBrick: React.FC<{ x1: number; y1: number; x2: number; y2: number; t: number }> = ({ x1, y1, x2, y2, t }) => {
  const x = x1 + (x2 - x1) * t; const y = y1 + (y2 - y1) * t - Math.sin(t * Math.PI) * 74;
  return <div style={{ position: "absolute", left: x, top: y, width: 40, height: 21, background: "#C86A3E", border: "2px solid #8B4322", borderRadius: 3, transform: `rotate(${t * 180}deg)`, zIndex: 14 }} />;
};
const Sweat: React.FC<{ x: number; y: number; lf: number }> = ({ x, y, lf }) => (
  <>{[0, 1, 2].map((i) => { const life = 24; const t = (((lf + i * 8) % life) + life) % life / life; const dx = (i - 1) * 15 + t * (i - 1) * 10; const dy = -6 - t * 26 + t * t * 52; const op = Math.max(0, 1 - t) * Math.min(1, t * 8); return (
    <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: 9, height: 12, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#C6E7FF,#5FA8E8)", opacity: op * 0.9, transform: "rotate(8deg)", zIndex: 13 }} />); })}</>
);
const MiniTower: React.FC<{ rows: number; x: number; baseY: number }> = ({ rows, x, baseY }) => (
  <>{Array.from({ length: Math.max(0, rows) }).map((_, r) => (
    <div key={r} style={{ position: "absolute", left: x + (r % 2) * 4, top: baseY - (r + 1) * 23, display: "flex", gap: 3, zIndex: 8 }}>
      {[0, 1, 2].map((c) => <div key={c} style={{ width: 38, height: 19, background: (r + c) % 2 ? "#C86A3E" : "#B0542E", border: "2px solid #8B4322", borderRadius: 3 }} />)}
    </div>))}</>
);

// ============================== the /route engine (central focal machine) ==============================
const RouteHub: React.FC<{ x: number; y: number; lf: number; pulse: number }> = ({ x, y, lf, pulse }) => {
  const rot = lf * 2.2;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 9 }}>
      <div style={{ position: "absolute", left: -105, top: -105, width: 210, height: 210, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${0.3 + pulse * 0.4}), transparent 66%)`, filter: "blur(5px)" }} />
      <svg viewBox="-64 -64 128 128" width={168} height={168} style={{ overflow: "visible" }}>
        <g transform={`rotate(${rot})`}>
          {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-5} y={-60} width={10} height={16} rx={2} fill="#3A4E72" transform={`rotate(${i * 30})`} />)}
          <circle r={48} fill="#16223A" stroke="#3A4E72" strokeWidth={6} />
        </g>
        <g transform={`rotate(${-rot * 1.5})`}><circle r={31} fill="#0E1A30" stroke="#5AA0DE" strokeWidth={3} strokeDasharray="6 5" /></g>
        <g transform={`scale(${1 + pulse * 0.12})`}>
          <path d="M-15 -7 A 15 15 0 1 1 -15 7" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
          <polygon points="-21,4 -9,4 -15,15" fill={GOLD} />
          <path d="M15 7 A 15 15 0 1 1 15 -7" fill="none" stroke="#6FB0EE" strokeWidth={5} strokeLinecap="round" />
          <polygon points="21,-4 9,-4 15,-15" fill="#6FB0EE" />
        </g>
      </svg>
      <div style={{ position: "absolute", left: "50%", top: 92, transform: "translateX(-50%)", padding: "5px 16px", borderRadius: 9, background: "#0E1626", border: "1.5px solid rgba(231,178,76,0.55)", fontFamily: mono, fontSize: 22, color: GOLD, whiteSpace: "nowrap", boxShadow: `0 0 ${10 + pulse * 16}px rgba(231,178,76,0.5)` }}>/route</div>
    </div>
  );
};
// a stream of glowing packets flowing from -> hub -> to (with comet trails)
const FlowStream: React.FC<{ lf: number; from: [number, number]; hub: [number, number]; to: [number, number]; n: number; color: string; speed: number; size?: number }> = ({ lf, from, hub, to, n, color, speed, size = 15 }) => {
  const pos = (p: number): [number, number] => {
    if (p < 0.5) { const t = p / 0.5; return [from[0] + (hub[0] - from[0]) * t, from[1] + (hub[1] - from[1]) * t - Math.sin(t * Math.PI) * 34]; }
    const t = (p - 0.5) / 0.5; return [hub[0] + (to[0] - hub[0]) * t, hub[1] + (to[1] - hub[1]) * t - Math.sin(t * Math.PI) * 34];
  };
  return <>{Array.from({ length: n }).map((_, i) => {
    const p = ((lf * speed / 100 + i / n) % 1 + 1) % 1;
    return <React.Fragment key={i}>{[0, 1, 2, 3].map((tr) => { const pp = p - tr * 0.022; if (pp < 0) return null; const [tx, ty] = pos(pp); const s = size - tr * 3; const o = (1 - tr * 0.26); return <div key={tr} style={{ position: "absolute", left: tx - s / 2, top: ty - s / 2, width: s, height: s, borderRadius: "50%", background: color, opacity: o, boxShadow: `0 0 ${13 - tr * 3}px ${color}`, zIndex: 10 }} />; })}</React.Fragment>;
  })}</>;
};
// a bright skyscraper the worker raises; lit floors glow (clear, not tiny bricks)
const GlowTower: React.FC<{ x: number; baseY: number; floors: number; lit: number; lf: number }> = ({ x, baseY, floors, lit, lf }) => (
  <>{Array.from({ length: floors }).map((_, r) => { const on = r < lit; const justOn = r === lit - 1; const pop = justOn ? 1 + Math.max(0, 1 - (lf % 400) * 0) * 0 : 1; return (
    <div key={r} style={{ position: "absolute", left: x, top: baseY - (r + 1) * 27, width: 122, height: 25, borderRadius: 3, background: on ? grad("#4A90F0", "#1D63D6") : "#182238", border: `2px solid ${on ? "#9AC6FF" : "#28374F"}`, boxShadow: on ? "0 0 16px rgba(74,144,240,0.6)" : "none", display: "flex", gap: 5, alignItems: "center", justifyContent: "center", transform: `scale(${pop})`, zIndex: 8 }}>
      {[0, 1, 2].map((w) => <div key={w} style={{ width: 22, height: 13, borderRadius: 2, background: on ? "rgba(255,244,196,0.9)" : "rgba(120,140,180,0.12)" }} />)}
    </div>); })}</>
);

// the BIG bright central tower both agents raise together (the eye-catching focal)
const MegaTower: React.FC<{ cx: number; baseY: number; floors: number; lit: number; lf: number }> = ({ cx, baseY, floors, lit, lf }) => {
  const topY = baseY - Math.max(1, lit) * 34;
  const done = lit >= floors;
  return (
    <>
      {/* ground glow */}
      <div style={{ position: "absolute", left: cx, top: (baseY + topY) / 2, transform: "translate(-50%,-50%)", width: 420, height: baseY - topY + 280, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(90,160,222,${0.26 + 0.1 * Math.sin(lf / 6)}), transparent 66%)`, filter: "blur(6px)", zIndex: 6 }} />
      {/* light beam */}
      <div style={{ position: "absolute", left: cx - 82, top: topY - 170, width: 164, height: baseY - topY + 170, background: "linear-gradient(180deg, rgba(143,194,255,0) 0%, rgba(143,194,255,0.18) 34%, rgba(143,194,255,0.04) 100%)", clipPath: "polygon(36% 0,64% 0,100% 100%,0 100%)", zIndex: 6, pointerEvents: "none" }} />
      {/* pulsing energy rings expanding off the base */}
      {[0, 1, 2].map((k) => { const p = (((lf / 26) + k * 0.34) % 1 + 1) % 1; const rr = 66 + p * 176; return <div key={k} style={{ position: "absolute", left: cx, top: baseY - 30, transform: "translate(-50%,-50%)", width: rr * 2, height: rr * 0.66, borderRadius: "50%", border: `2px solid rgba(130,195,255,${(1 - p) * 0.55})`, zIndex: 6, pointerEvents: "none" }} />; })}
      {/* floors — tapering glossy skyscraper */}
      {Array.from({ length: floors }).map((_, r) => { const on = r < lit; const w = 180 - r * 8; const yy = baseY - (r + 1) * 34; const nWin = 4; const pop = on ? Math.max(0, 1 - Math.abs(lf - (10 + (r + 1) * 12)) / 6) : 0; return (
        <div key={r} style={{ position: "absolute", left: cx - w / 2, top: yy, width: w, height: 31, borderRadius: 5, background: on ? "linear-gradient(180deg,#82BEFF,#1D63D6)" : "#141E30", border: `2px solid ${on ? "#CFE6FF" : "#26344C"}`, boxShadow: on ? `0 0 ${28 + pop * 30}px rgba(90,160,222,${0.8 + pop * 0.2}), inset 0 2px 0 rgba(255,255,255,0.35)` : "none", transform: `scale(${1 + pop * 0.16})`, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", zIndex: 8 }}>
          {Array.from({ length: nWin }).map((_, wi) => { const twk = on ? 0.55 + 0.45 * Math.abs(Math.sin(lf / 5 + r * 1.3 + wi)) : 0.1; return <div key={wi} style={{ width: Math.max(12, (w - 44) / nWin - 4), height: 15, borderRadius: 2, background: on ? `rgba(255,244,196,${twk})` : "rgba(120,140,180,0.1)", boxShadow: on ? `0 0 8px rgba(255,240,180,${twk * 0.9})` : "none" }} />; })}
        </div>); })}
      {/* antenna spire + diamond beacon */}
      <div style={{ position: "absolute", left: cx - 2.5, top: topY - 56, width: 5, height: 56, background: "linear-gradient(180deg,#CFE6FF,#5AA0DE)", borderRadius: 3, zIndex: 8, opacity: lit > 1 ? 1 : 0 }} />
      <div style={{ position: "absolute", left: cx, top: topY - 62, transform: `translate(-50%,-50%) rotate(45deg) scale(${1 + Math.sin(lf / 4) * 0.13})`, width: 22, height: 22, background: grad("#FFF4C4", "#FFD24C"), borderRadius: 3, boxShadow: `0 0 ${18 + Math.sin(lf / 4) * 11}px #FFE08A`, zIndex: 9, opacity: lit > 1 ? 1 : 0 }} />
      {done && <div style={{ position: "absolute", left: cx, top: topY - 62, transform: "translate(-50%,-50%)", zIndex: 9 }}><Sparkles lf={lf} at={4.35} x={0} y={0} n={14} spread={130} colors={["#FFE08A", "#fff", "#8FC2FF"]} dur={0.9} /></div>}
      {/* rising sparks */}
      {Array.from({ length: 16 }).map((_, i) => { const life = 52 + seed(i) * 40; const t = (((lf + seed(i * 3) * life) % life) + life) % life / life; const x = cx - 100 + seed(i) * 200; const y = baseY - t * (baseY - topY + 100); const s = 3 + seed(i * 2) * 4; return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: i % 2 ? "#8FC2FF" : "#FFE08A", opacity: (1 - t) * 0.75, zIndex: 9 }} />; })}
    </>
  );
};

// Gemini brand spark (gradient 4-point star), for hook branding
const GSpark: React.FC<{ s: number; light?: boolean }> = ({ s, light }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><defs><linearGradient id={light ? "ghkL" : "ghk"} x1="1" y1="4" x2="23" y2="20" gradientUnits="userSpaceOnUse">{light ? (<><stop offset="0" stopColor="#DCEBFF" /><stop offset="0.5" stopColor="#fff" /><stop offset="1" stopColor="#BFDcFF" /></>) : (<><stop offset="0" stopColor="#4989F5" /><stop offset="0.4" stopColor="#9334EA" /><stop offset="0.72" stopColor="#E0447F" /><stop offset="1" stopColor="#F9A94B" /></>)}</linearGradient></defs><path d="M12 1.5c.45 5.2 4.8 9.55 10 10-5.2.45-9.55 4.8-10 10-.45-5.2-4.8-9.55-10-10 5.2-.45 9.55-4.8 10-10z" fill={`url(#${light ? "ghkL" : "ghk"})`} /></svg>
);
// ============================== played-out HOOK stage — bright central tower (boss + worker feed it) ==============================
const HookStage: React.FC = () => {
  const f = useCurrentFrame();
  const boot = f < 16 ? Math.max(0, 1 - f / 16) : 0;
  const shakeX = f < 16 ? Math.sin(f * 3.2) * (1 - f / 16) * 11 : 0;
  const shakeY = f < 16 ? Math.cos(f * 3.6) * (1 - f / 16) * 7 : 0;
  const punch = interpolate(f, [0, 11], [1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
  const sw = f / 18;
  const lit = Math.max(0, Math.min(10, Math.floor((f - 10) / 12)));  // central tower rockets up
  const done = f >= 132;
  const gesture = 0.26 + 0.22 * Math.max(0, Math.sin(f / 5));         // Claude directing
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${shakeX}px, ${shakeY}px) scale(${punch})`, transformOrigin: "50% 46%" }}>
      <ConstrSite lf={f} />
      {/* opening pattern interrupt: shockwave rings blasting out of the ignite */}
      {f < 18 && [0, 1].map((k) => { const pp = Math.max(0, Math.min(1, sw - k * 0.16)); if (pp <= 0 || pp >= 1) return null; return <div key={k} style={{ position: "absolute", left: 506, top: 520, transform: "translate(-50%,-50%)", width: pp * 640, height: pp * 640, borderRadius: "50%", border: `${8 - k * 3}px solid ${k ? "#8FC2FF" : GOLD}`, opacity: (1 - pp) * 0.75, zIndex: 16, pointerEvents: "none" }} />; })}

      {/* Claude BOSS on a raised platform (left) — feeds tasks in */}
      <div style={{ position: "absolute", left: 30, top: 566, width: 210, height: 122, borderRadius: 8, background: "linear-gradient(180deg,#2A3550,#1A2438)", border: "2px solid #3A445E", zIndex: 8 }} />
      <div style={{ position: "absolute", left: 30, top: 566, width: 210, height: 12, background: "repeating-linear-gradient(90deg,#E7B24C 0 14px,#1A2234 14px 28px)", opacity: 0.5, zIndex: 9 }} />
      <div style={{ position: "absolute", left: 52, top: 392, zIndex: 10 }}><Mascot lf={f} size={184} constr={1} gaze={9} cheer={gesture} nodAmp={2.4} nodSpeed={7} /></div>
      {/* Gemini WORKER (right) — builds */}
      <div style={{ position: "absolute", left: 790, top: 470, transform: "scaleX(-1)", zIndex: 10 }}><GeminiBot lf={f} size={190} gaze={6} work={1} /></div>

      {/* CENTER: the bright tower both raise via /route (the eye-catching focal) */}
      <MegaTower cx={506} baseY={686} floors={10} lit={lit} lf={f} />
      <div style={{ position: "absolute", left: 506, top: 700, transform: "translate(-50%,-50%)", zIndex: 12, padding: "5px 16px", borderRadius: 10, background: "#0E1626", border: "1.5px solid rgba(231,178,76,0.6)", boxShadow: `0 0 ${14 + 10 * Math.abs(Math.sin(f / 6))}px rgba(231,178,76,0.6)`, fontFamily: mono, fontSize: 22, color: GOLD, whiteSpace: "nowrap" }}>/route</div>
      {done && <div style={{ position: "absolute", left: 506, top: 686 - 10 * 34 - 42, transform: "translate(-50%,-50%) rotate(-5deg)", zIndex: 16, padding: "7px 18px", borderRadius: 10, background: GREEN, border: "3px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#fff", whiteSpace: "nowrap" }}>SHIPPED ✓</div>}

      {/* packets converge into the center tower base (gold from Claude, blue from Gemini) */}
      {f > 8 && <FlowStream lf={f} from={[224, 470]} hub={[366, 428]} to={[500, 600]} n={5} color={GOLD} speed={3.0} size={16} />}
      {f > 8 && <FlowStream lf={f} from={[812, 500]} hub={[648, 428]} to={[512, 600]} n={5} color={"#6FB0EE"} speed={3.0} size={16} />}

      {/* hierarchy name chips */}
      <div style={{ position: "absolute", left: 40, top: 704, zIndex: 13, padding: "6px 16px", borderRadius: 999, background: "linear-gradient(158deg,#E7896A,#C5603C)", border: "2px solid #fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#fff", whiteSpace: "nowrap" }}>CLAUDE <span style={{ opacity: 0.85 }}>· BOSS</span></div>
      <div style={{ position: "absolute", left: 664, top: 704, zIndex: 13, padding: "6px 16px", borderRadius: 999, background: "linear-gradient(158deg,#5EA0F5,#1B63D6)", border: "2px solid #fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#fff", whiteSpace: "nowrap" }}>GEMINI 3.6 <span style={{ opacity: 0.85 }}>· WORKER</span></div>

      {/* Gemini 3.6 performance proof: SLAMS in big on "brand new Gemini 3.6", holds center, then docks */}
      {f >= 82 && (() => {
        const s0 = Math.min(1.05, spr(f, 82, 9, 175));  // bold overshoot
        const move = over(f, 122, 20);                   // hold center longer, then dock
        const scale = s0 * (1 - move * 0.6);
        const tx = move * 306, ty = move * -252;
        const tilt = (1 - Math.min(1, spr(f, 82, 13, 200))) * -5 + move * 3.5;
        const flash = Math.max(0, 1 - (f - 82) / 9);
        const shock = over(f, 82, 13);
        const nbeat = 1 + Math.abs(Math.sin(f / 6)) * 0.18;
        const glow = 22 + (0.5 + 0.5 * Math.abs(Math.sin(f / 8))) * 30;
        return (
          <>
            {shock < 1 && <div style={{ position: "absolute", left: 506, top: 452 + ty, transform: `translate(-50%,-50%) scale(${0.45 + shock * 1.7})`, width: 900, height: 520, borderRadius: 30, border: `7px solid rgba(120,185,255,${(1 - shock) * 0.75})`, zIndex: 21, pointerEvents: "none" }} />}
            <div style={{ position: "absolute", left: 506, top: 452, transform: `translate(-50%,-50%) translate(${tx}px,${ty}px) scale(${scale}) rotate(${tilt}deg)`, width: 906, borderRadius: 26, overflow: "hidden", border: "6px solid #fff", boxShadow: `0 44px 84px -18px rgba(8,18,46,0.72), 0 0 ${glow}px rgba(94,160,245,0.75)`, zIndex: 22 }}>
              <div style={{ background: "linear-gradient(158deg,#5EA0F5,#1B57C8)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 13 }}>
                <GSpark s={34} light />
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33, color: "#fff", letterSpacing: 0.2 }}>GEMINI 3.6 · BEATS EVERY MODEL 🤯</span>
                <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#0E2A5E", background: "#FFD24C", padding: "5px 14px", borderRadius: 999, transform: `scale(${nbeat})` }}>NEW</span>
              </div>
              <Img src={staticFile("gemini36_bench.png")} style={{ width: "100%", display: "block" }} />
              {flash > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,255,255,${flash * 0.85})`, zIndex: 5, pointerEvents: "none" }} />}
            </div>
          </>
        );
      })()}
      {/* ignite flash + bursts */}
      {boot > 0.01 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,238,190,${boot * 0.5})`, zIndex: 17, pointerEvents: "none" }} />}
      <div style={{ position: "absolute", left: 506, top: 640, zIndex: 16 }}><Sparkles lf={f} at={0.03} x={0} y={0} n={18} spread={170} colors={[GOLD, "#fff", "#6FB0EE"]} dur={0.7} /></div>
      {done && <div style={{ position: "absolute", left: 506, top: 686 - 10 * 34 }}><Sparkles lf={f} at={4.4} x={0} y={0} n={20} spread={210} colors={["#4A90F0", GOLD, "#fff"]} dur={1.1} /></div>}
    </div>
  );
};

// hook captions (karaoke), timed to the cut VO
// short groups so every caption fits on ONE line
const HOOK_LINES: { words: [string, number][]; end: number }[] = [
  { words: [["Most", 0], ["people", 0.22], ["don't", 0.38], ["know", 0.58]], end: 0.68 },
  { words: [["that", 0.68], ["you", 0.78], ["can", 0.86], ["stop", 0.96]], end: 1.14 },
  { words: [["burning", 1.14], ["through", 1.34], ["your", 1.52]], end: 1.62 },
  { words: [["Claude", 1.62], ["usage", 1.78], ["limits", 2.06]], end: 2.32 },
  { words: [["by", 2.32], ["running", 2.52], ["Google's", 2.76]], end: 3.10 },
  { words: [["brand", 3.10], ["new", 3.26], ["Gemini", 3.46], ["3.6", 3.64]], end: 4.34 },
  { words: [["inside", 4.34], ["of", 4.56], ["Claude", 4.70], ["Code", 4.84]], end: 5.06 },
  { words: [["All", 5.26], ["the", 5.32], ["smartest", 5.44], ["builders", 5.70]], end: 6.00 },
  { words: [["are", 6.00], ["already", 6.26], ["doing", 6.42], ["this", 6.70]], end: 6.84 },
  { words: [["making", 6.96], ["Claude", 7.18], ["the", 7.36], ["boss", 7.48]], end: 7.64 },
  { words: [["and", 7.64], ["Gemini", 7.84], ["the", 7.98], ["worker", 8.20]], end: 8.6 },
];
const HookCaptions: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const lead = 0.1;
  let li = 0;
  for (let i = 0; i < HOOK_LINES.length; i++) { if (t + lead >= HOOK_LINES[i].words[0][1]) li = i; }
  const ln = HOOK_LINES[li]; const done = t + lead >= ln.end;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1270, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {ln.words.map((w, i) => { const on = done || t + lead >= w[1]; const nxt = ln.words[i + 1]; const active = !done && on && (!nxt || t + lead < nxt[1]); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1.1, color: on ? (active ? CLAYD : CLAY) : "#5A463C", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: active ? "0 2px 14px rgba(255,251,244,0.95)" : "0 1px 3px rgba(90,70,60,0.35)" }}>{w[0]}</span>); })}
      </div>
    </div>
  );
};

// ============================== PLAYED-OUT HOOK (video, with VO + music + sfx) ==============================
export const RouteHook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <StudioBg />
      <Rail p={0.08} done={0} />
      <HookHeaderRich lf={f} />
      <Panel label="claude vs gemini"><HookStage /></Panel>
      <HookCaptions />
      {/* audio */}
      <Audio src={staticFile("route_vo.wav")} />
      {/* "Another Day of Sun" (La La Land) bed — from the Drive Soundtracks folder, energetic groove */}
      <Audio loop startFrom={fr(8.5)} src={staticFile("route_music.mp3")} volume={(ff) => 0.19 * Math.min(1, ff / 6) * Math.min(1, Math.max(0, (155 - ff) / 14))} />
      {/* opening pattern interrupt — big ignite */}
      <Sfx at={0.03} src="boom.wav" v={0.42} dur={1.3} />
      <Sfx at={0.05} src="_source_popular-riser-metallic.mp3" v={0.22} dur={1.3} />
      <Sfx at={0.1} src="c_power.wav" v={0.32} dur={1.1} />
      <Sfx at={0.55} src="blip_up.wav" v={0.3} dur={0.7} />
      <Sfx at={0.3} src="construction.wav" v={0.07} dur={5} />
      {/* packets stream + floors light — blips throughout */}
      <Sfx at={0.9} src="blip2.wav" v={0.2} dur={0.35} />
      <Sfx at={1.5} src="blip3.wav" v={0.2} dur={0.35} />
      <Sfx at={2.1} src="blip2.wav" v={0.2} dur={0.35} />
      <Sfx at={2.7} src="blip3.wav" v={0.2} dur={0.35} />
      <Sfx at={3.3} src="blip2.wav" v={0.2} dur={0.35} />
      <Sfx at={3.9} src="blip3.wav" v={0.2} dur={0.35} />
      {/* tower tops out (~4.4s) */}
      <Sfx at={4.35} src="c_fanfare.wav" v={0.34} dur={1.5} />
      <Sfx at={4.35} src="crowd_cheer.wav" v={0.22} dur={1.6} />
      <Sfx at={4.5} src="c_1up.wav" v={0.3} dur={1.0} />
    </AbsoluteFill>
  );
};

// ============================== distinct per-scene BACKGROUNDS ==============================
// ---- Roman / gladiator props for the Colosseum scene ----
const Torch: React.FC<{ x: number; y: number; lf: number; s?: number }> = ({ x, y, lf, s = 1 }) => {
  const fl = 0.5 + 0.5 * Math.sin(lf / 3.3) + 0.18 * Math.sin(lf / 1.6);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "bottom", zIndex: 9 }}>
      <div style={{ position: "absolute", left: -46, top: -66, width: 112, height: 130, borderRadius: "50%", background: `radial-gradient(circle,rgba(255,180,80,${0.26 + fl * 0.2}),transparent 68%)`, filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: -9, top: -38 - fl * 8, width: 18, height: 44 + fl * 10, borderRadius: "50% 50% 45% 45%", background: "linear-gradient(180deg,#FFF0A0,#FF9A2E 55%,#E0561A)" }} />
      <div style={{ position: "absolute", left: -5, top: -30 - fl * 6, width: 10, height: 26, borderRadius: "50%", background: "#FFE9A0", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: -14, top: -4, width: 28, height: 14, borderRadius: "0 0 8px 8px", background: "#3A2A1A" }} />
      <div style={{ position: "absolute", left: -5, top: 8, width: 10, height: 130, background: "#2A1E12" }} />
    </div>
  );
};
const RomanBanner: React.FC<{ x: number; y: number; h?: number; c: string; lf: number }> = ({ x, y, h = 150, c, lf }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${Math.sin(lf / 40) * 2}deg)`, transformOrigin: "top center", zIndex: 9 }}>
    <div style={{ position: "absolute", left: -34, top: 0, width: 68, height: h, background: `linear-gradient(180deg,${c},#3A1414)`, clipPath: "polygon(0 0,100% 0,100% 88%,50% 100%,0 88%)", border: "2px solid #C9932A" }} />
    <div style={{ position: "absolute", left: -19, top: h * 0.26, width: 38, height: 38, borderRadius: "50%", border: "3px solid #E7B24C", display: "flex", alignItems: "center", justifyContent: "center", color: "#E7B24C", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24 }}>❋</div>
  </div>
);
const Laurel: React.FC<{ s: number }> = ({ s }) => (
  <svg viewBox="-60 -60 120 120" width={s} height={s} style={{ overflow: "visible" }}>
    {[-1, 1].map((side) => <g key={side} transform={`scale(${side},1)`}>
      {Array.from({ length: 7 }).map((_, i) => { const a = 202 + i * 13; const rad = a * Math.PI / 180; const cx = Math.cos(rad) * 50; const cy = Math.sin(rad) * 50; return <ellipse key={i} cx={cx} cy={cy} rx={10} ry={5} fill="#3F9E74" transform={`rotate(${a + 90} ${cx} ${cy})`} />; })}
    </g>)}
  </svg>
);
const ArenaShield: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 11 }}>
    <div style={{ position: "relative", width: 60, height: 74, borderRadius: "50% 50% 50% 50% / 40% 40% 62% 62%", background: `linear-gradient(158deg,${c},#1a2438)`, border: "4px solid #C9932A", boxShadow: "0 6px 12px rgba(0,0,0,0.45)" }}>
      <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", width: 18, height: 18, borderRadius: "50%", background: "#C9932A" }} />
    </div>
  </div>
);
const CrossedSwords: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 200 }) => (
  <svg viewBox="0 0 160 160" width={s} height={s} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 8, opacity: 0.92, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
    {[45, -45].map((r, i) => <g key={i} transform={`rotate(${r} 80 80)`}>
      <rect x={76} y={18} width={8} height={92} fill="#CFD6E0" /><polygon points="76,18 84,18 80,8" fill="#EAF0F8" />
      <rect x={64} y={108} width={32} height={8} fill="#C9932A" /><rect x={77} y={116} width={6} height={22} fill="#6A4A2A" /><circle cx={80} cy={142} r={6} fill="#C9932A" />
    </g>)}
  </svg>
);
const NameBanner: React.FC<{ x: number; y: number; label: string; c: string }> = ({ x, y, label, c }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translateX(-50%)", zIndex: 13, padding: "8px 20px 14px", background: `linear-gradient(180deg,${c},#3A1414)`, clipPath: "polygon(0 0,100% 0,100% 76%,50% 100%,0 76%)", border: "2px solid #C9932A", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: "#F4E6C8", whiteSpace: "nowrap" }}>{label}</div>
);

// TEAM — a detailed COLOSSEUM (gladiator arena: arcades, crowd, sand floor, torches, banners)
const SceneBgColosseum: React.FC<{ lf: number }> = ({ lf }) => {
  const tier = (y: number, h: number, count: number, stone: string, dark: string) => { const aw = 1012 / count; return (
    <React.Fragment key={y}>
      <div style={{ position: "absolute", left: 0, right: 0, top: y, height: h, background: stone }} />
      {Array.from({ length: count }).map((_, i) => <svg key={i} viewBox={`0 0 ${aw} ${h}`} width={aw} height={h} style={{ position: "absolute", left: i * aw, top: y }}>
        <path d={`M${aw * 0.2} ${h} L${aw * 0.2} ${h * 0.46} A ${aw * 0.3} ${aw * 0.3} 0 0 1 ${aw * 0.8} ${h * 0.46} L${aw * 0.8} ${h} Z`} fill={dark} />
        <rect x={aw * 0.46} y={h * 0.32} width={aw * 0.08} height={h * 0.18} fill={stone} />
      </svg>)}
      {Array.from({ length: count + 1 }).map((_, i) => <div key={`p${i}`} style={{ position: "absolute", left: i * aw - 3, top: y, width: 6, height: h, background: "rgba(0,0,0,0.16)" }} />)}
    </React.Fragment>); };
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#241C3A 0%,#3A2C44 32%,#7A4A38 64%,#3A241C 100%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 360, width: 900, height: 400, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(231,150,80,0.18),transparent 66%)" }} />
      {/* attic wall + awning poles */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 44, background: "#9A8A70" }} />
      {Array.from({ length: 18 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 22 + i * 56, top: 108, width: 20, height: 22, background: "#2A2018" }} />)}
      {Array.from({ length: 18 }).map((_, i) => <div key={`pl${i}`} style={{ position: "absolute", left: 46 + i * 56, top: 80, width: 5, height: 20, background: "#6A5A46" }} />)}
      {tier(140, 84, 9, "#8A7A62", "#241C16")}
      {tier(224, 90, 9, "#7E6E56", "#1E1712")}
      {/* tiered seating with crowd */}
      {[0, 1, 2, 3, 4].map((k) => { const y = 314 + k * 46; const ins = 210 - k * 46; const n = 26 - k * 3; return (
        <div key={k} style={{ position: "absolute", left: ins, right: ins, top: y, height: 46, background: k % 2 ? "#6A5A46" : "#5E4E3C", borderRadius: "50% / 70px", borderTop: "2px solid rgba(0,0,0,0.2)" }}>
          {Array.from({ length: n }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${4 + i * (92 / n)}%`, top: 7, width: 12, height: 14, borderRadius: "50% 50% 40% 40%", background: seed(k * 7 + i) > 0.5 ? "#C9A98A" : "#A98A6E", opacity: 0.72 }} />)}
        </div>); })}
      {/* arena sand floor */}
      <div style={{ position: "absolute", left: "50%", top: 640, width: 1040, height: 300, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%,#D3B27E,#A6824F 78%)" }} />
      {Array.from({ length: 12 }).map((_, i) => { const life = 90; const t = (((lf + seed(i * 3) * life) % life) + life) % life / life; return <div key={i} style={{ position: "absolute", left: 200 + seed(i) * 612, top: 700 - t * 90, width: 4 + seed(i) * 4, height: 4, borderRadius: "50%", background: "rgba(220,200,160,0.4)", opacity: (1 - t) * 0.5 }} />; })}
      <Torch x={78} y={520} lf={lf} s={1.1} />
      <Torch x={934} y={520} lf={lf} s={1.1} />
      <RomanBanner x={250} y={96} c="#8B2E2E" lf={lf} />
      <RomanBanner x={762} y={96} c="#2E4A8B" lf={lf} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px rgba(0,0,0,0.5)" }} />
    </>
  );
};
// SETUP — a warm developer workshop bench (pegboard tools, desk, lamp, mug)
const SceneBgDesk: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3A2E24 0%,#2E241C 60%,#241C16 100%)" }} />
    <div style={{ position: "absolute", left: 80, top: 92, width: 560, height: 300, background: "#4A3A2A", borderRadius: 6 }} />
    {Array.from({ length: 40 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 104 + (i % 10) * 54, top: 112 + Math.floor(i / 10) * 70, width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.3)" }} />)}
    <div style={{ position: "absolute", left: 132, top: 132, width: 10, height: 120, background: "#8A7A5A", borderRadius: 4 }} />
    <div style={{ position: "absolute", left: 200, top: 150, width: 84, height: 12, background: "#7A6A4A", borderRadius: 6 }} />
    <div style={{ position: "absolute", left: 320, top: 132, width: 14, height: 100, background: "#9A8A6A", borderRadius: 6 }} />
    <div style={{ position: "absolute", left: 700, top: 224, width: 230, height: 10, background: "#5A4632" }} />
    <div style={{ position: "absolute", left: 722, top: 174, width: 34, height: 50, background: "#6A5238" }} />
    <div style={{ position: "absolute", left: 772, top: 164, width: 30, height: 60, background: "#7A5E42" }} />
    <div style={{ position: "absolute", left: 842, top: 150, width: 40, height: 24, background: "#5A4632", borderRadius: "0 0 8px 8px" }} />
    <div style={{ position: "absolute", left: 850, top: 118, width: 24, height: 38, background: "#3F7A54", borderRadius: "50% 50% 40% 40%" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 208, background: "linear-gradient(180deg,#6A4E34,#4A3624)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 198, height: 10, background: "#7A5C40" }} />
    <div style={{ position: "absolute", left: 604, top: 118, width: 8, height: 224, background: "#2A2018", transform: "rotate(8deg)", transformOrigin: "bottom" }} />
    <div style={{ position: "absolute", left: 560, top: 108, width: 70, height: 26, borderRadius: "40% 40% 6px 6px", background: "#C9932A" }} />
    <div style={{ position: "absolute", left: 430, top: 120, width: 360, height: 520, clipPath: "polygon(44% 0,56% 0,100% 100%,0 100%)", background: "linear-gradient(180deg,rgba(255,214,138,0.18),transparent 80%)" }} />
    <div style={{ position: "absolute", left: 120, bottom: 150, width: 44, height: 40, background: "#C4472A", borderRadius: "4px 4px 8px 8px" }} />
    <div style={{ position: "absolute", left: 214, bottom: 150, width: 54, height: 54, background: "#E7CE62", transform: "rotate(-5deg)" }} />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.4)" }} />
  </>
);
// LOOP — an industrial factory / machine room (pipes, gauges, gears, conveyor, steam)
const SceneBgFactory: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1E2836 0%,#18202C 60%,#121821 100%)" }} />
    {[118, 148].map((y, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: y, height: 16, background: "#33455F" }} />)}
    <div style={{ position: "absolute", left: 200, top: 120, width: 16, height: 180, background: "#33455F" }} />
    <div style={{ position: "absolute", left: 800, top: 150, width: 16, height: 150, background: "#33455F" }} />
    {[300, 860].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 168, width: 40, height: 40, borderRadius: "50%", background: "#0E1826", border: "3px solid #4A5E7E" }} />)}
    {[{ x: 180, y: 360, r: 60, d: 1 }, { x: 840, y: 380, r: 50, d: -1 }].map((g, i) => (
      <svg key={i} viewBox="-70 -70 140 140" width={g.r * 2} height={g.r * 2} style={{ position: "absolute", left: g.x - g.r, top: g.y - g.r, opacity: 0.5 }}>
        <g transform={`rotate(${lf * 1.5 * g.d})`}>{Array.from({ length: 10 }).map((_, k) => <rect key={k} x={-8} y={-66} width={16} height={20} fill="#2E3F60" transform={`rotate(${k * 36})`} />)}<circle r={46} fill="#1B2740" stroke="#3A4E72" strokeWidth={6} /></g>
      </svg>))}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 120, height: 60, background: "#2A3550" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 6, background: "repeating-linear-gradient(90deg,#4A5E7E 0 20px,transparent 20px 40px)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "linear-gradient(180deg,#232F45,#141E2C)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 120, height: 10, background: "repeating-linear-gradient(45deg,#E7B24C 0 16px,#1A1E28 16px 32px)", opacity: 0.5 }} />
    {Array.from({ length: 8 }).map((_, i) => { const life = 80; const t = (((lf + seed(i * 3) * life) % life) + life) % life / life; return <div key={i} style={{ position: "absolute", left: 120 + seed(i) * 760, top: 300 - t * 170, width: 30 + t * 34, height: 30 + t * 34, borderRadius: "50%", background: "rgba(200,210,225,0.06)", opacity: (1 - t) * 0.5 }} />; })}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }} />
  </>
);
// a classical Greek/Roman temple (pediment + Doric columns + stepped stylobate)
const Temple: React.FC<{ x: number; baseY: number; w: number; cols: number; hcol: number; marble: string; shade: string; z?: number }> = ({ x, baseY, w, cols, hcol, marble, shade, z = 6 }) => {
  const colW = Math.max(9, w / (cols * 1.7)); const gap = (w - cols * colW) / (cols - 1);
  return (
    <div style={{ position: "absolute", left: x, top: baseY - hcol - 116, width: w, zIndex: z }}>
      <div style={{ position: "absolute", left: -10, top: 0, width: 0, height: 0, borderLeft: `${w / 2 + 10}px solid transparent`, borderRight: `${w / 2 + 10}px solid transparent`, borderBottom: `62px solid ${marble}` }} />
      <div style={{ position: "absolute", left: -8, top: 60, width: w + 16, height: 24, background: marble }} />
      <div style={{ position: "absolute", left: -8, top: 78, width: w + 16, height: 6, background: shade }} />
      {Array.from({ length: cols }).map((_, i) => { const cx = i * (colW + gap); return (
        <div key={i} style={{ position: "absolute", left: cx, top: 84, width: colW, height: hcol, background: `linear-gradient(90deg,${shade},${marble} 38%,${marble} 62%,${shade})` }}>
          <div style={{ position: "absolute", left: -4, top: -8, width: colW + 8, height: 9, background: marble, borderRadius: 2 }} />
          {[0.34, 0.5, 0.66].map((fl, j) => <div key={j} style={{ position: "absolute", left: `${fl * 100}%`, top: 0, bottom: 0, width: 1.5, background: "rgba(90,60,30,0.16)" }} />)}
        </div>); })}
      <div style={{ position: "absolute", left: -6, top: 84 + hcol, width: w + 12, height: 12, background: marble }} />
      <div style={{ position: "absolute", left: -18, top: 96 + hcol, width: w + 36, height: 12, background: shade }} />
      <div style={{ position: "absolute", left: -30, top: 108 + hcol, width: w + 60, height: 13, background: marble }} />
    </div>
  );
};
// WHY — a majestic golden-hour ACROPOLIS / Roman city (the payoff: an empire you built)
const SceneBgAcropolis: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#8FB0D8 0%,#E9C79A 42%,#F2A860 68%,#D98A54 100%)" }} />
    <div style={{ position: "absolute", left: 506, top: 250, width: 150, height: 150, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle,#FFF6DE,#FFD98A)", boxShadow: "0 0 120px rgba(255,220,150,0.7)" }} />
    {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 504, top: 250, width: 4, height: 210, transform: `rotate(${i * 30}deg)`, transformOrigin: "top center", background: "linear-gradient(180deg,rgba(255,240,190,0.22),transparent)" }} />)}
    {[{ x: 150, y: 128, s: 1 }, { x: 840, y: 108, s: 0.9 }, { x: 660, y: 190, s: 0.7 }].map((c, i) => <div key={i} style={{ position: "absolute", left: c.x + Math.sin(lf / 60 + i) * 10, top: c.y, width: 150 * c.s, height: 44 * c.s, borderRadius: 999, background: "rgba(255,248,235,0.6)" }} />)}
    <div style={{ position: "absolute", left: -40, top: 344, width: 600, height: 220, background: "#B98A6E", clipPath: "polygon(0 100%,18% 44%,38% 72%,58% 26%,80% 62%,100% 40%,100% 100%)", opacity: 0.45 }} />
    <div style={{ position: "absolute", right: -40, top: 360, width: 600, height: 220, background: "#A87E62", clipPath: "polygon(0 60%,22% 34%,44% 72%,66% 28%,86% 58%,100% 44%,100% 100%,0 100%)", opacity: 0.45 }} />
    {/* aqueduct */}
    <div style={{ position: "absolute", left: 10, top: 424, width: 300, height: 96, zIndex: 3 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 14, background: "#CBB08A" }} />
      {Array.from({ length: 6 }).map((_, i) => <React.Fragment key={i}><div style={{ position: "absolute", left: i * 52, top: 14, width: 10, height: 78, background: "#CBB08A" }} /><div style={{ position: "absolute", left: i * 52 + 10, top: 20, width: 42, height: 42, borderRadius: "40px 40px 0 0", background: "rgba(110,84,56,0.55)" }} /></React.Fragment>)}
    </div>
    {/* lower city buildings */}
    {[{ x: 30, w: 84, h: 120 }, { x: 128, w: 60, h: 150 }, { x: 828, w: 92, h: 140 }, { x: 928, w: 70, h: 110 }].map((b, i) => <div key={i} style={{ position: "absolute", left: b.x, top: 560 - b.h, width: b.w, height: b.h, background: "#C7A582", borderRadius: "3px 3px 0 0", zIndex: 4 }}><div style={{ position: "absolute", left: -4, top: -10, width: b.w + 8, height: 12, background: "#B58F6A" }} /></div>)}
    {/* obelisk */}
    <div style={{ position: "absolute", left: 150, top: 360, zIndex: 5 }}><div style={{ width: 20, height: 200, background: "linear-gradient(90deg,#B58F6A,#E3CFA6 50%,#B58F6A)", clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)" }} /><div style={{ position: "absolute", left: -8, top: 200, width: 36, height: 18, background: "#B58F6A" }} /></div>
    {/* Acropolis plateau + grand steps */}
    <div style={{ position: "absolute", left: 176, top: 522, width: 660, height: 120, background: "linear-gradient(180deg,#CBB48E,#A98A66)", borderRadius: "44% 44% 0 0 / 34px", zIndex: 5 }} />
    {[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", left: 402 - k * 22, top: 560 + k * 14, width: 208 + k * 44, height: 14, background: k % 2 ? "#D8C6A2" : "#C2AC84", zIndex: 6 }} />)}
    {/* cypress trees */}
    {[236, 300, 728, 792].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 442, zIndex: 6 }}><div style={{ width: 32, height: 118, background: "linear-gradient(180deg,#2E5A3A,#1E3E28)", borderRadius: "50% 50% 40% 40%" }} /><div style={{ position: "absolute", left: 11, top: 116, width: 10, height: 16, background: "#5A4632" }} /></div>)}
    {/* flanking temples */}
    <Temple x={150} baseY={548} w={128} cols={4} hcol={78} marble="#EEE2CA" shade="#C6B189" z={6} />
    <Temple x={736} baseY={548} w={128} cols={4} hcol={78} marble="#EEE2CA" shade="#C6B189" z={6} />
    {/* the Parthenon */}
    <Temple x={356} baseY={562} w={300} cols={8} hcol={132} marble="#F5ECD6" shade="#CBB68E" z={8} />
    {[{ x: 638, y: 148 }, { x: 690, y: 136 }].map((bd, i) => <svg key={i} width={26} height={12} viewBox="0 0 26 12" style={{ position: "absolute", left: bd.x + Math.sin(lf / 30 + i) * 18, top: bd.y, zIndex: 3 }}><path d="M1 8 Q7 1 13 8 Q19 1 25 8" fill="none" stroke="#6A4A34" strokeWidth={2} /></svg>)}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 100, background: "linear-gradient(180deg,#C2A47E,#A6845E)", zIndex: 4 }} />
  </>
);
// a firework burst (radiating sparks, looping)
const Firework: React.FC<{ x: number; y: number; c: string; lf: number; phase: number; n?: number }> = ({ x, y, c, lf, phase, n = 16 }) => {
  const life = 66; const t = (((lf + phase) % life) + life) % life / life; const r = t * 96; const op = Math.max(0, 1 - t);
  return <>{Array.from({ length: n }).map((_, i) => { const a = i / n * Math.PI * 2; return <div key={i} style={{ position: "absolute", left: x + Math.cos(a) * r, top: y + Math.sin(a) * r + t * t * 26, width: 5, height: 5, borderRadius: "50%", background: c, opacity: op, boxShadow: `0 0 7px ${c}` }} />; })}
    <div style={{ position: "absolute", left: x - 3, top: y - 3, width: 6, height: 6, borderRadius: "50%", background: "#fff", opacity: op * 0.8 }} /></>;
};
// CTA — a festive NIGHT CELEBRATION over the finished city (fireworks, confetti, laurels, torches)
const SceneBgCelebrate: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1A1636 0%,#2A2050 44%,#4A2E58 74%,#3A2440 100%)" }} />
    {Array.from({ length: 40 }).map((_, i) => { const tw = 0.4 + 0.6 * Math.abs(Math.sin(lf / 8 + i)); return <div key={i} style={{ position: "absolute", left: seed(i) * 1012, top: seed(i * 2) * 420, width: 3, height: 3, borderRadius: "50%", background: "#fff", opacity: tw * 0.7 }} />; })}
    {/* fireworks */}
    <Firework x={230} y={230} c="#FFCE5A" lf={lf} phase={0} />
    <Firework x={790} y={200} c="#6FB0EE" lf={lf} phase={22} />
    <Firework x={510} y={150} c="#5FCF97" lf={lf} phase={44} n={20} />
    <Firework x={150} y={330} c="#E27BA0" lf={lf} phase={12} />
    <Firework x={890} y={340} c="#FFCE5A" lf={lf} phase={34} />
    {/* torch glow at the sides */}
    <div style={{ position: "absolute", left: -60, top: 300, width: 260, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,170,70,0.18),transparent 68%)" }} />
    <div style={{ position: "absolute", right: -60, top: 300, width: 260, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,170,70,0.18),transparent 68%)" }} />
    {/* the finished city skyline (lit) */}
    {[{ x: 20, w: 90, h: 150 }, { x: 116, w: 66, h: 210 }, { x: 190, w: 100, h: 170 }, { x: 300, w: 78, h: 230 }, { x: 640, w: 96, h: 220 }, { x: 748, w: 120, h: 180 }, { x: 878, w: 84, h: 150 }].map((b, i) => (
      <div key={i} style={{ position: "absolute", left: b.x, top: 640 - b.h, width: b.w, height: b.h, background: "#241C38", borderRadius: "4px 4px 0 0" }}>
        {Array.from({ length: Math.floor(b.h / 34) * 2 }).map((_, k) => { const lit = seed(i * 5 + k) > 0.35; return <div key={k} style={{ position: "absolute", left: 10 + (k % 2) * (b.w / 2), top: 12 + Math.floor(k / 2) * 34, width: b.w / 2 - 18, height: 16, background: lit ? "rgba(255,214,120,0.85)" : "rgba(120,110,150,0.2)" }} />; })}
      </div>))}
    {/* confetti + streamers */}
    {Array.from({ length: 46 }).map((_, i) => { const life = 120 + seed(i) * 60; const t = (((lf + seed(i * 3) * life) % life) + life) % life / life; const x = seed(i) * 1012 + Math.sin(lf / 16 + i) * 20; const y = -20 + t * 820; const cols = ["#FFCE5A", "#6FB0EE", "#5FCF97", "#E27BA0", "#D2724E"]; return <div key={i} style={{ position: "absolute", left: x, top: y, width: 8, height: 12, background: cols[i % 5], opacity: 0.85, transform: `rotate(${lf * 4 + i * 40}deg)`, borderRadius: 1 }} />; })}
    {/* floating laurels + stars */}
    {Array.from({ length: 6 }).map((_, i) => { const life = 150 + seed(i) * 60; const t = (((lf + seed(i * 4) * life) % life) + life) % life / life; const x = 80 + seed(i * 6) * 840; const y = 720 - t * 720; return <div key={i} style={{ position: "absolute", left: x, top: y, opacity: (1 - t) * 0.7 }}><Laurel s={44} /></div>; })}
    {/* garland across the top */}
    <svg width={1012} height={70} viewBox="0 0 1012 70" style={{ position: "absolute", left: 0, top: 66 }}><path d="M0 6 Q253 64 506 8 Q759 64 1012 6" fill="none" stroke="#3F9E74" strokeWidth={5} /></svg>
    {[130, 380, 632, 882].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 92, width: 22, height: 28, borderRadius: "0 0 50% 50%", background: i % 2 ? "#E27BA0" : "#FFCE5A" }} />)}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.4)" }} />
  </>
);

// a Roman triumphal arch (Arch-of-Constantine style: 3 arches, columns, attic, statues)
const TriumphalArch: React.FC<{ x: number; baseY: number; w: number; marble: string; shade: string; z?: number }> = ({ x, baseY, w, marble, shade, z = 7 }) => {
  const H = 268;
  return (
    <div style={{ position: "absolute", left: x, top: baseY - H, width: w, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 62, width: w, height: H - 62, background: `linear-gradient(180deg,${marble},${shade})` }} />
      <div style={{ position: "absolute", left: -12, top: 0, width: w + 24, height: 64, background: marble, borderBottom: `4px solid ${shade}` }} />
      <div style={{ position: "absolute", left: w * 0.3, top: 16, width: w * 0.4, height: 32, background: shade, border: `2px solid ${marble}` }} />
      <div style={{ position: "absolute", left: w * 0.36, top: 108, width: w * 0.28, height: H - 108, background: "#2A2018", borderRadius: `${w * 0.14}px ${w * 0.14}px 0 0` }} />
      <div style={{ position: "absolute", left: w * 0.11, top: 150, width: w * 0.16, height: H - 150, background: "#2A2018", borderRadius: `${w * 0.08}px ${w * 0.08}px 0 0` }} />
      <div style={{ position: "absolute", left: w * 0.73, top: 150, width: w * 0.16, height: H - 150, background: "#2A2018", borderRadius: `${w * 0.08}px ${w * 0.08}px 0 0` }} />
      {[0.05, 0.31, 0.64, 0.9].map((cx, i) => <div key={i} style={{ position: "absolute", left: w * cx, top: 64, width: w * 0.05, height: H - 64, background: `linear-gradient(90deg,${shade},${marble} 45%,${shade})` }} />)}
      {[0.2, 0.4, 0.6, 0.8].map((sx, i) => <div key={i} style={{ position: "absolute", left: w * sx - 8, top: -30, width: 16, height: 34, background: marble, borderRadius: "7px 7px 0 0" }} />)}
    </div>
  );
};
const Statue: React.FC<{ x: number; baseY: number; s?: number; marble?: string }> = ({ x, baseY, s = 1, marble = "#E8DCC4" }) => (
  <div style={{ position: "absolute", left: x, top: baseY - 130 * s, zIndex: 6 }}>
    <div style={{ position: "absolute", left: 6 * s, top: 0, width: 30 * s, height: 90 * s, background: `linear-gradient(90deg,#B7A784,${marble} 45%,#B7A784)`, borderRadius: "14px 14px 4px 4px" }} />
    <div style={{ position: "absolute", left: 14 * s, top: -14 * s, width: 16 * s, height: 18 * s, borderRadius: "50%", background: marble }} />
    <div style={{ position: "absolute", left: -2 * s, top: 90 * s, width: 46 * s, height: 14 * s, background: "#9A8A6A" }} />
    <div style={{ position: "absolute", left: -6 * s, top: 104 * s, width: 54 * s, height: 26 * s, background: "#8A7A5A" }} />
  </div>
);
// CTA — a grand golden-hour ROMAN FORUM/city with a triumphal arch (+ festive confetti finale)
const SceneBgRomanForum: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#6E6AA0 0%,#C98A8A 40%,#EDA65E 70%,#C57A44 100%)" }} />
    <div style={{ position: "absolute", left: 506, top: 260, width: 150, height: 150, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle,#FFF3D6,#FFCF88)", boxShadow: "0 0 120px rgba(255,205,130,0.7)" }} />
    {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 504, top: 260, width: 4, height: 200, transform: `rotate(${i * 30}deg)`, transformOrigin: "top center", background: "linear-gradient(180deg,rgba(255,240,200,0.2),transparent)" }} />)}
    {[{ x: 150, y: 130, s: 1 }, { x: 850, y: 120, s: 0.85 }].map((c, i) => <div key={i} style={{ position: "absolute", left: c.x + Math.sin(lf / 60 + i) * 10, top: c.y, width: 150 * c.s, height: 44 * c.s, borderRadius: 999, background: "rgba(255,245,228,0.55)" }} />)}
    {/* distant city rooftops */}
    {[{ x: 10, w: 120, h: 130 }, { x: 130, w: 90, h: 170 }, { x: 812, w: 100, h: 160 }, { x: 916, w: 96, h: 120 }].map((b, i) => <div key={i} style={{ position: "absolute", left: b.x, top: 566 - b.h, width: b.w, height: b.h, background: "#B98A6A", borderRadius: "3px 3px 0 0", zIndex: 3 }}><div style={{ position: "absolute", left: -6, top: -12, width: b.w + 12, height: 14, background: "#A67A58", clipPath: "polygon(6% 100%,20% 0,80% 0,94% 100%)" }} /></div>)}
    {/* colonnades (rows of columns) flanking */}
    {[70, 872].map((cx, side) => <div key={side} style={{ position: "absolute", left: cx, top: 440, zIndex: 4 }}>{Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ position: "absolute", left: i * 24, top: 0, width: 15, height: 120, background: "linear-gradient(90deg,#B7A382,#EEE2C6 45%,#B7A382)" }} />)}<div style={{ position: "absolute", left: -6, top: -14, width: 108, height: 14, background: "#EEE2C6" }} /><div style={{ position: "absolute", left: -6, top: 120, width: 108, height: 12, background: "#C6B189" }} /></div>)}
    {/* obelisk */}
    <div style={{ position: "absolute", left: 236, top: 360, zIndex: 5 }}><div style={{ width: 18, height: 200, background: "linear-gradient(90deg,#B58F6A,#E7D2A8 50%,#B58F6A)", clipPath: "polygon(32% 0,68% 0,100% 100%,0 100%)" }} /><div style={{ position: "absolute", left: -8, top: 200, width: 34, height: 18, background: "#B58F6A" }} /></div>
    {/* statues */}
    <Statue x={318} baseY={620} s={1} />
    <Statue x={700} baseY={620} s={1} />
    {/* the triumphal arch (centerpiece) */}
    <TriumphalArch x={356} baseY={628} w={300} marble="#F1E6CE" shade="#CBB68E" z={7} />
    {/* paved plaza */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "linear-gradient(180deg,#CBAE86,#A98A62)", zIndex: 4 }} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <div key={i} style={{ position: "absolute", left: i * 130, bottom: 0, width: 3, height: 120, background: "rgba(120,90,60,0.3)", zIndex: 4 }} />)}
    {/* hanging banners on the arch */}
    <RomanBanner x={430} y={372} h={120} c="#8B2E2E" lf={lf} />
    <RomanBanner x={582} y={372} h={120} c="#2E4A8B" lf={lf} />
    {/* festive confetti (finale) */}
    {Array.from({ length: 40 }).map((_, i) => { const life = 120 + seed(i) * 60; const t = (((lf + seed(i * 3) * life) % life) + life) % life / life; const x = seed(i) * 1012 + Math.sin(lf / 16 + i) * 20; const y = -20 + t * 820; const cols = ["#FFCE5A", "#6FB0EE", "#5FCF97", "#E27BA0", "#D2724E"]; return <div key={i} style={{ position: "absolute", left: x, top: y, width: 8, height: 12, background: cols[i % 5], opacity: 0.85, transform: `rotate(${lf * 4 + i * 40}deg)`, borderRadius: 1, zIndex: 14 }} />; })}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.32)" }} />
  </>
);

// ============================== STORYBOARD scenes (one per VO section) ==============================
const SceneFrame: React.FC<{ p: number; done: number; header: React.ReactNode; parts: string[]; active: number; children: React.ReactNode }> = ({ p, done, header, parts, active, children }) => (
  <AbsoluteFill>
    <StudioBg />
    <Rail p={p} done={done} />
    {header}
    <Panel>{children}</Panel>
  </AbsoluteFill>
);
const ModelCard: React.FC<{ x: number; name: string; sub: string; accent: string; lf: number; delay: number; who: "claude" | "gemini" }> = ({ x, name, sub, accent, lf, delay, who }) => {
  const s = Math.min(1.03, spr(lf, delay, 12, 210)); if (s < 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x, top: 150, transform: `translate(-50%,0) scale(${s})`, width: 300, borderRadius: 22, background: "rgba(14,20,34,0.92)", border: `2.5px solid ${accent}`, boxShadow: `0 0 34px ${accent}55`, padding: "22px 20px 18px", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 12 }}>
      <div style={{ height: 152, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>{who === "claude" ? <Mascot lf={lf} size={150} constr={1} gaze={0} /> : <GeminiBot lf={lf} size={150} gaze={0} />}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff", marginTop: 6 }}>{name}</div>
      <div style={{ fontFamily: mono, fontSize: 19, color: accent, marginTop: 4 }}>{sub}</div>
    </div>
  );
};

// a clean gladius the fighters raise and clash (grip at bottom = the hand, blade points up)
const Sword: React.FC<{ x: number; y: number; angle: number; flip?: boolean }> = ({ x, y, angle, flip }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 11, transform: `scaleX(${flip ? -1 : 1}) rotate(${angle}deg)`, transformOrigin: "bottom center" }}>
    <svg width={46} height={210} viewBox="0 0 46 210" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}>
      <polygon points="23,4 31,28 31,150 23,166 15,150 15,28" fill="#DCE3EC" stroke="#A9B3C1" strokeWidth="1.6" />
      <rect x="20" y="26" width="6" height="122" fill="#F6FAFF" opacity="0.8" />
      <rect x="3" y="158" width="40" height="10" rx="4" fill="#C9932A" stroke="#8E6418" strokeWidth="1" />
      <rect x="18" y="166" width="10" height="26" rx="3" fill="#6A4A2A" />
      <circle cx="23" cy="199" r="6.5" fill="#C9932A" />
    </svg>
  </div>
);
// comic impact star at the point two blades meet
const StarBurst: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => {
  if (s < 0.03) return null;
  const pts: string[] = []; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; const r = i % 2 ? 23 : 50; pts.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`); }
  const inner = pts.map((p) => { const [px, py] = p.split(",").map(Number); return `${50 + (px - 50) * 0.52},${50 + (py - 50) * 0.52}`; });
  return <svg width={168} height={168} viewBox="0 0 100 100" style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${s}) rotate(${s * 36}deg)`, zIndex: 18, filter: "drop-shadow(0 0 12px rgba(255,220,140,0.85))" }}><polygon points={pts.join(" ")} fill="#FFEFA6" stroke="#fff" strokeWidth={3} /><polygon points={inner.join(" ")} fill="#fff" /></svg>;
};
const ATTACKS = [8, 32, 56, 80, 104, 128, 152, 176, 200, 224];
// SCENE 2 — TEAM ("stop arguing over which model is better, use both") — a Colosseum sword fight
const SB_Team: React.FC<{ cdBig?: boolean }> = ({ cdBig = false }) => {
  const f = useCurrentFrame();
  let clash = 0, cLunge = 0, gLunge = 0, cSw = 0, gSw = 0;
  for (let i = 0; i < ATTACKS.length; i++) {
    const d = f - ATTACKS[i]; const claudeAtk = i % 2 === 0;
    const env = d >= -13 && d < 0 ? (d + 13) / 13 : (d >= 0 && d < 10 ? 1 - d / 10 : 0);
    if (env <= 0) continue;
    if (d >= 0 && d < 8) clash = Math.max(clash, 1 - d / 8);
    if (claudeAtk) { cLunge = Math.max(cLunge, env * 156); gLunge = Math.max(gLunge, env * 22); cSw = Math.max(cSw, env); }
    else { gLunge = Math.max(gLunge, env * 156); cLunge = Math.max(cLunge, env * 22); gSw = Math.max(gSw, env); }
  }
  const shakeX = clash > 0 ? Math.sin(f * 4.6) * clash * 14 : 0;
  const shakeY = clash > 0 ? Math.cos(f * 5.2) * clash * 8 : 0;
  const anger = 0.45 + 0.55 * Math.abs(Math.sin(f / 6));
  const claudeX = 168 + cLunge;
  const gemX = 638 - gLunge;
  const crownBob = Math.sin(f / 12) * 4;
  return (
    <SceneFrame p={interpolate(f, [0, 231], [0.116, 0.295], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} done={0} parts={["use", "both", "on", "one", "team"]} active={4}
      header={<HeaderPill badge="⚔️" l1={<>STOP <span style={{ color: CLAY }}>ARGUING</span></>} l2={<>USE BOTH</>} />}>
      <SceneBgColosseum lf={f} />
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shakeX}px, ${shakeY}px)` }}>
        {/* speed lines behind whoever is lunging */}
        {cLunge > 70 && [0, 1, 2, 3].map((i) => <div key={`cs${i}`} style={{ position: "absolute", left: claudeX - 70 - i * 34, top: 508 + i * 26, width: 56 + i * 22, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.5)", zIndex: 9, opacity: (cLunge - 70) / 90 }} />)}
        {gLunge > 70 && [0, 1, 2, 3].map((i) => <div key={`gs${i}`} style={{ position: "absolute", left: gemX + 190 + i * 34, top: 508 + i * 26, width: 56 + i * 22, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.5)", zIndex: 9, opacity: (gLunge - 70) / 90 }} />)}
        {/* dust kicked up at their feet on impact */}
        {clash > 0.18 && [claudeX + 96, gemX + 96].map((dx, i) => <div key={i} style={{ position: "absolute", left: dx, top: 662, width: 78 * clash, height: 36 * clash, borderRadius: "50%", background: "rgba(214,192,150,0.5)", transform: "translate(-50%,-50%)", filter: "blur(4px)", zIndex: 9 }} />)}

        {/* Claude (BOSS) fighter + gladius */}
        <div style={{ position: "absolute", left: claudeX, top: 452, zIndex: 10, transform: `rotate(${3 + cSw * 9}deg)`, transformOrigin: "bottom center" }}><Mascot lf={f} size={206} constr={1} gaze={9} stern={anger} nodAmp={1} /></div>
        <Sword x={claudeX + 150} y={300} angle={16 + cSw * 20} />
        <div style={{ position: "absolute", left: claudeX + 60, top: 398 + crownBob, zIndex: 13, fontSize: 42, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}>👑</div>
        {/* Gemini (WORKER) fighter + gladius */}
        <div style={{ position: "absolute", left: gemX, top: 452, transform: `scaleX(-1) rotate(${3 + gSw * 9}deg)`, transformOrigin: "bottom center", zIndex: 10 }}><GeminiBot lf={f} size={206} gaze={9} /></div>
        <Sword x={gemX + 46} y={300} angle={-16 - gSw * 20} flip />
        <div style={{ position: "absolute", left: gemX + 66, top: 400 - crownBob, zIndex: 13, fontSize: 38, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }}>🔧</div>

        {/* impact star + sparks where the blades meet (no soft central blob) */}
        <StarBurst x={506} y={346} s={clash} />
        {ATTACKS.map((b, i) => <div key={i} style={{ position: "absolute", left: 506, top: 346, zIndex: 17 }}><Sparkles lf={f} at={b / 30} x={0} y={0} n={15} spread={185} colors={["#FFE08A", "#fff", "#FFB25A"]} dur={0.3} /></div>)}

        {/* fighter name banners with roles */}
        <NameBanner x={214} y={636} label="CLAUDE · BOSS" c="#8B2E2E" />
        <NameBanner x={800} y={636} label="GEMINI · WORKER" c="#2E4A8B" />
      </div>
      {/* retention: circular "TUTORIAL IN 5..1" countdown (fight is ~7.7s) */}
      {(() => {
        const cd = Math.max(1, 5 - Math.floor(f / 44));
        const prog = Math.min(1, f / 224);
        const sz = cdBig ? 166 : 92, R = cdBig ? 63 : 33, sw = cdBig ? 13 : 8, C = 2 * Math.PI * R;
        const numSz = cdBig ? 82 : 44, labelSz = cdBig ? 30 : 22;
        const cx = cdBig ? 506 : 872, cy = cdBig ? 296 : 150;
        const tick = 1 + Math.max(0, Math.sin((f - (5 - cd) * 44) / 3)) * 0.34;
        return (
          <div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: cdBig ? 11 : 7 }}>
            <div style={{ position: "relative", width: sz, height: sz }}>
              <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ transform: "rotate(-90deg)", filter: "drop-shadow(0 5px 16px rgba(0,0,0,0.55))" }}>
                <circle cx={sz / 2} cy={sz / 2} r={R} fill="rgba(14,20,34,0.94)" stroke="rgba(255,255,255,0.22)" strokeWidth={sw} />
                <circle cx={sz / 2} cy={sz / 2} r={R} fill="none" stroke={GOLD} strokeWidth={sw} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * prog} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: numSz, color: "#fff", transform: `scale(${tick})` }}>{cd}</div>
            </div>
            <div style={{ padding: cdBig ? "10px 26px" : "6px 16px", borderRadius: 999, background: "rgba(14,20,34,0.94)", border: `${cdBig ? 3 : 2}px solid ${GOLD}`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: labelSz, color: "#fff", whiteSpace: "nowrap", boxShadow: "0 5px 16px rgba(0,0,0,0.5)" }}>TUTORIAL IN</div>
          </div>
        );
      })()}
    </SceneFrame>
  );
};

// SCENE 3 — SETUP ("first, grab a free Google AI key and install the Gemini CLI ...")
const STEP_REC = [
  { title: "terminal · free Google AI key + Gemini CLI", lines: [{ t: "$ npm i -g @google/gemini-cli", c: "#8FE3B6" }, { t: "added 1 package in 3s", c: "#9FB2CF" }, { t: "$ gemini   # paste your free AI key", c: "#8FE3B6" }, { t: "✓ connected to gemini-3.6", c: "#7FD0FF" }] },
  { title: "claude code · install the Gemini plugin", lines: [{ t: "/plugin marketplace add gemini", c: "#8FE3B6" }, { t: "▸ fetching plugin…", c: "#9FB2CF" }, { t: "✓ gemini plugin installed", c: "#7FD0FF" }] },
  { title: "prompt #1 · let Claude call Gemini 3.6", lines: [{ t: "# paste the first prompt", c: "#C7B7F0" }, { t: "▸ wiring claude → gemini-3.6", c: "#9FB2CF" }, { t: "✓ Claude can call Gemini now", c: "#7FD0FF" }] },
  { title: "prompt #2 · build the /route skill", lines: [{ t: "# paste the second prompt", c: "#C7B7F0" }, { t: "✓ /route skill created", c: "#8FE3B6" }, { t: "claude = orchestrator · gemini = executor", c: "#7FD0FF" }] },
];
const SB_Setup: React.FC = () => {
  const f = useCurrentFrame();
  const litSteps = Math.min(4, Math.floor(f / 108) + 1);
  const step = Math.min(3, litSteps - 1); const rec = STEP_REC[step];
  return (
    <SceneFrame p={0.4} done={1} parts={["grab", "a", "free", "Google", "AI", "key"]} active={4}
      header={<HeaderPill badge="🛠️" l1={<>SET IT UP IN</>} l2={<><span style={{ color: CLAY }}>4 STEPS</span></>} />}>
      <SceneBgDesk lf={f} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,22,0.26)", zIndex: 4 }} />
      <ScreenRec lf={f} x={94} y={98} w={824} h={300} title={rec.title} lines={rec.lines} />
      <div style={{ position: "absolute", left: 94, top: 72, zIndex: 12, padding: "5px 14px", borderRadius: 10, background: "rgba(196,74,58,0.18)", border: `1.5px solid ${RED}`, fontFamily: mono, fontSize: 17, color: "#F0B4AB", letterSpacing: 1 }}>◉ YOUR SCREEN RECORDING · STEP {step + 1}/4</div>
      <div style={{ position: "absolute", left: 470, top: 432, width: 452, borderRadius: 18, background: "rgba(16,24,38,0.94)", border: "1.5px solid rgba(255,255,255,0.14)", padding: "18px 22px", zIndex: 9 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#fff", marginBottom: 12 }}>SETUP</div>
        {CHECK.map((c, i) => { const dn = i < litSteps; const cur = i === litSteps - 1; return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: dn ? GREEN : "transparent", border: `2.5px solid ${dn ? GREEN : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 20, boxShadow: cur ? `0 0 12px ${GREEN}88` : "none" }}>{dn ? "✓" : i + 1}</div>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: dn ? "#fff" : "rgba(220,228,244,0.62)" }}>{c}</span>
          </div>); })}
      </div>
      <div style={{ position: "absolute", left: 96, top: 432, zIndex: 10 }}><Mascot lf={f} size={196} constr={1} cheer={0.55} gaze={4} /></div>
    </SceneFrame>
  );
};

// SCENE 4 — HOW IT WORKS ("type slash route, Claude interviews, plans, hands to Gemini, reviews, loops")
const SB_Loop: React.FC = () => {
  const f = useCurrentFrame(); const stages = ["interview", "plan", "delegate", "build", "review"];
  const litStage = Math.min(5, Math.floor(f / 46) + 1);
  return (
    <SceneFrame p={0.62} done={3} parts={["you", "type", "slash", "route"]} active={3}
      header={<HeaderPill badge="🔁" l1={<>HOW <span style={{ color: CLAY }}>/route</span></>} l2={<>WORKS</>} />}>
      <SceneBgFactory lf={f} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,22,0.3)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 34, right: 34, top: 118, display: "flex", justifyContent: "space-between", zIndex: 12 }}>
        {stages.map((s, i) => { const on = i < litStage; const cc = i === 4 ? GREEN : GOLD; const pop = i === litStage - 1 ? 1 + Math.max(0, 1 - (f - i * 46) / 8) * 0.14 : 1; return <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: 999, background: on ? "rgba(16,24,38,0.96)" : "rgba(16,24,38,0.5)", border: `1.5px solid ${on ? cc : "rgba(255,255,255,0.18)"}`, boxShadow: on ? `0 0 14px ${cc}66` : "none", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: on ? "#fff" : "rgba(220,228,244,0.5)", whiteSpace: "nowrap", transform: `scale(${pop})` }}><span style={{ color: on ? cc : "rgba(220,228,244,0.5)", fontWeight: 900 }}>{i + 1}</span>{s}{i === 4 ? " ↺" : ""}</div>; })}
      </div>
      <div style={{ position: "absolute", left: 58, top: 366, zIndex: 10 }}><Mascot lf={f} size={200} constr={1} gaze={8} cheer={0.2} /></div>
      <RouteHub x={506} y={478} lf={f} pulse={0.6} />
      {f > 4 && <FlowStream lf={f} from={[258, 476]} hub={[506, 452]} to={[760, 476]} n={5} color={GOLD} speed={2.6} size={15} />}
      {f > 4 && <FlowStream lf={f} from={[760, 476]} hub={[506, 512]} to={[258, 476]} n={3} color={"#5FCF97"} speed={1.7} size={12} />}
      <div style={{ position: "absolute", left: 700, top: 386, transform: "scaleX(-1)", zIndex: 10 }}><GeminiBot lf={f} size={200} gaze={6} work={1} /></div>
      <div style={{ position: "absolute", left: 592, top: 460, transform: "translateX(-50%)", zIndex: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: GOLD }}>BOSS</div>
      <div style={{ position: "absolute", left: 812, top: 388, transform: "translateX(-50%)", zIndex: 13, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#9FC2FF" }}>WORKER</div>
      <ScreenRec lf={f} x={306} y={560} w={520} h={168} title="claude code" rec={true} lines={[
        { t: "$ /route", c: "#8FE3B6" },
        { t: "▸ interview → plan → delegate", c: "#7FD0FF" },
        { t: "✓ review · loop until done", c: "#C7B7F0" }]} />
    </SceneFrame>
  );
};

// SCENE 5 — WHY ("both are incredible but way better together. save usage limits, build more, fewer tokens")
const VALS = [{ t: "CLAUDE USAGE", n: 90, suf: "%", tail: "SAVED", dir: -1, c: GREEN }, { t: "YOU SHIP", n: 5, suf: "×", tail: "MORE", dir: 1, c: SKY }, { t: "TOKENS BURNED", n: 90, suf: "%", tail: "FEWER", dir: -1, c: GOLD }];
// a wooden Trojan horse (Gemini hidden inside Claude) for the Acropolis scene
const TrojanHorse: React.FC<{ x: number; y: number; s?: number; lf: number }> = ({ x, y, s = 1, lf }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,0) scale(${s}) rotate(${Math.sin(lf / 34) * 1.2}deg)`, transformOrigin: "bottom center", zIndex: 8 }}>
    <svg width={230} height={210} viewBox="0 0 230 210" style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.4))" }}>
      <rect x={22} y={176} width={186} height={13} rx={5} fill="#7A5A38" stroke="#5A4026" strokeWidth={2} />
      {[58, 172].map((cx, i) => <g key={i}><circle cx={cx} cy={196} r={13} fill="#5A4026" stroke="#3A2A18" strokeWidth={3} /><circle cx={cx} cy={196} r={4} fill="#8A6A44" /></g>)}
      <rect x={64} y={152} width={15} height={28} fill="#7A5636" /><rect x={150} y={152} width={15} height={28} fill="#7A5636" />
      <rect x={46} y={94} width={138} height={82} rx={17} fill="#9A6E42" stroke="#6A4A28" strokeWidth={3} />
      <line x1={46} y1={122} x2={184} y2={122} stroke="#6A4A28" strokeWidth={2} /><line x1={46} y1={150} x2={184} y2={150} stroke="#6A4A28" strokeWidth={2} />
      <rect x={46} y={100} width={138} height={11} fill="#C9932A" opacity={0.85} />
      <path d="M156 100 L182 40 L214 44 L208 72 L188 76 L178 108 Z" fill="#9A6E42" stroke="#6A4A28" strokeWidth={3} />
      <path d="M182 40 L176 24 L192 36 Z" fill="#7A5636" />
      <circle cx={199} cy={56} r={4.5} fill="#241608" />
      {/* the hatch (the trick) with a faint blue Gemini glow peeking out */}
      <rect x={96} y={124} width={32} height={40} rx={4} fill="#5A4026" stroke="#3A2A18" strokeWidth={2} />
      <circle cx={112} cy={144} r={7} fill="#6FB0EE" opacity={0.55 + 0.35 * Math.abs(Math.sin(lf / 6))} />
    </svg>
  </div>
);
const SB_Why: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <SceneFrame p={0.85} done={4} parts={["save", "a", "ton", "of", "usage", "limits"]} active={4}
      header={<HeaderPill badge="🔋" l1={<>GEMINI IN CLAUDE</>} l2={<><span style={{ color: CLAY }}>= 90% LESS TOKENS</span></>} size={42} />}>
      <SceneBgAcropolis lf={f} />
      {/* rising golden motes over the empire */}
      {Array.from({ length: 14 }).map((_, i) => { const life = 74 + seed(i) * 40; const t = (((f + seed(i * 3) * life) % life) + life) % life / life; return <div key={i} style={{ position: "absolute", left: 60 + seed(i) * 900, top: 720 - t * 360, width: 5 + seed(i * 2) * 4, height: 5 + seed(i * 2) * 4, borderRadius: "50%", background: i % 2 ? GOLD : "#FFE7A6", opacity: (1 - t) * 0.6, zIndex: 6 }} />; })}
      {/* a cheering crowd of mini mascots on the steps */}
      {Array.from({ length: 7 }).map((_, i) => { const x = 78 + i * 130; const claude = i % 2 === 0; const bob = Math.abs(Math.sin(f / 7 + i * 1.3)) * 9; const sz = 50 + (i % 3) * 6; return (
        <div key={`cr${i}`} style={{ position: "absolute", left: x, top: 486 - bob, zIndex: 7, transform: claude ? "none" : "scaleX(-1)" }}>{claude ? <Mascot lf={f + i * 7} size={sz} constr={1} cheer={0.7} gaze={3} nodAmp={2} /> : <GeminiBot lf={f + i * 9} size={sz} cheer={0.7} gaze={3} />}</div>); })}
      {/* the Trojan horse — Gemini hidden inside, running under Claude */}
      <TrojanHorse x={506} y={506} s={1.02} lf={f} />
      {/* two BIG builders celebrating (fists pumping) */}
      {(() => {
        const pump = Math.abs(Math.sin(f / 7));
        const cbob = Math.abs(Math.sin(f / 9)) * 13;
        return <>
          <div style={{ position: "absolute", left: 138, top: 392 - cbob, zIndex: 11 }}><Mascot lf={f} size={182} constr={1} cheer={0.7 + pump * 0.3} gaze={6} nodAmp={3.6} /></div>
          <div style={{ position: "absolute", left: 690, top: 392 - cbob, transform: "scaleX(-1)", zIndex: 11 }}><GeminiBot lf={f} size={182} cheer={0.7 + pump * 0.3} gaze={6} /></div>
        </>;
      })()}
      {/* countdown retention badge — teases the free guide at the CTA */}
      {(() => { const cd = Math.max(1, 5 - Math.floor(f / 46)); const tick = 1 + Math.max(0, Math.sin((f - (5 - cd) * 46) / 3)) * 0.28; return (
        <div style={{ position: "absolute", left: 506, top: 128, transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 22px", borderRadius: 999, background: "rgba(14,20,34,0.94)", border: `2px solid ${GOLD}`, boxShadow: "0 0 20px rgba(231,178,76,0.55)" }}>
            <span style={{ fontSize: 26 }}>⏳</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", whiteSpace: "nowrap", letterSpacing: 0.3 }}>FREE GUIDE IN</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: GOLD, minWidth: 30, textAlign: "center", display: "inline-block", transform: `scale(${tick})` }}>{cd}</span>
          </div>
          <div style={{ width: 240, height: 7, borderRadius: 999, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.max(0, 1 - f / 232) * 100}%`, background: GOLD }} /></div>
        </div>); })()}
      {/* value cards with a light-sweep shine + bouncing arrow */}
      {VALS.map((vv, i) => { const s = Math.min(1.03, spr(f, 28 + i * 12, 12, 210)); const cnt = over(f, 34 + i * 12, 24); const val = vv.n <= 5 ? (vv.n * cnt).toFixed(vv.n * cnt >= 4.95 ? 0 : 1) : Math.round(vv.n * cnt); const shine = (((f - 44 - i * 12) % 84) + 84) % 84 / 84; const abob = Math.sin(f / 5 + i) * 6; const pop = cnt >= 1 ? 1 + Math.max(0, Math.sin((f - (58 + i * 12)) / 4)) * 0.05 : 1; return (
        <div key={i} style={{ position: "absolute", left: 36 + i * 320, top: 590, width: 300, height: 124, transform: `translateY(${(1 - s) * 22}px) scale(${s})`, transformOrigin: "bottom", borderRadius: 16, background: "rgba(14,20,34,0.96)", border: `2.5px solid ${vv.c}`, boxShadow: `0 10px 26px -8px rgba(0,0,0,0.5),0 0 24px ${vv.c}45`, padding: "14px 20px", zIndex: 12, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          {s > 0.92 && <div style={{ position: "absolute", top: 0, bottom: 0, left: `${shine * 150 - 25}%`, width: 64, background: "linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)", transform: "skewX(-18deg)", pointerEvents: "none" }} />}
          <div style={{ fontFamily: mono, fontSize: 17, color: "#C7D6EC", letterSpacing: 1 }}>{vv.t}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 3, transform: `scale(${pop})`, transformOrigin: "left center" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: vv.c, transform: `translateY(${abob}px)`, display: "inline-block" }}>{vv.dir < 0 ? "▼" : "▲"}</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: vv.c, lineHeight: 1 }}>{val}{vv.suf}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: "#EAF0FA", letterSpacing: 0.5 }}>{vv.tail}</span>
          </div>
          <div style={{ marginTop: 9, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.14)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${cnt * 100}%`, borderRadius: 999, background: vv.c, boxShadow: `0 0 8px ${vv.c}` }} />
          </div>
        </div>); })}
    </SceneFrame>
  );
};

// SCENE 6 — CTA ("save & send it... comment route down below and I'll send it over")
const SB_Cta: React.FC = () => {
  const f = useCurrentFrame(); const pop = spr(f, 4, 11, 220);
  const typed = "route";
  const T0 = 23; // type "route" right as the VO says "comment route" — video hard-cuts on the word
  const nChars = Math.max(0, Math.min(typed.length, Math.floor((f - T0) / 5)));
  const shown = typed.slice(0, nChars);
  const doneTyping = nChars >= typed.length;
  const cursorOn = Math.floor(f / 8) % 2 === 0;
  const pressed = false;
  const postScale = doneTyping ? 1 + Math.max(0, Math.sin((f - 48) / 5)) * 0.06 : 1;
  const posted = false;
  const glow = doneTyping ? 5 + Math.max(0, Math.sin((f - 48) / 5)) * 7 : 0;
  const flyT = 0;
  const envY = 292 + flyT * 96;
  const envScale = flyT < 0.5 ? 0.6 + flyT * 0.8 : 1 - (flyT - 0.5) * 0.9;
  const cbob = Math.abs(Math.sin(f / 8)) * (posted ? 16 : 8);
  const arrowBob = Math.abs(Math.sin(f / 6)) * 12;
  const giftWig = Math.sin(f / 7) * 3;
  return (
    <SceneFrame p={interpolate(f, [0, 157], [0.878, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} done={5} parts={["just", "comment", "route", "below"]} active={2}
      header={<div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", alignItems: "center", gap: 4, zIndex: 200 }}>
        <div style={{ transform: "scaleX(-1)" }}><Laurel s={80} /></div>
        <div style={{ padding: "13px 28px", borderRadius: 16, background: grad("#EBCB78", "#C4901F"), border: "4px solid #FBEFCF", boxShadow: "0 22px 50px -14px rgba(20,26,45,0.5)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#3A2408", whiteSpace: "nowrap", textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}>COMMENT “ROUTE”</div>
        <Laurel s={80} />
      </div>}>
      <SceneBgRomanForum lf={f} />
      {/* Roman scroll comment box */}
      <div style={{ position: "absolute", left: 506, top: 244, transform: `translate(-50%,0) scale(${Math.min(1.03, pop)})`, width: 656, zIndex: 12 }}>
        <div style={{ position: "absolute", left: -16, top: "50%", transform: "translateY(-50%)", width: 26, height: 106, borderRadius: 9, background: "linear-gradient(90deg,#7A5216,#C9932A 58%,#E7C56A)", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)", width: 26, height: 106, borderRadius: 9, background: "linear-gradient(90deg,#E7C56A,#C9932A 42%,#7A5216)", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(180deg,#F7EBCC,#EAD6A4)", border: `4px solid ${doneTyping ? "#3F9E74" : "#C9932A"}`, boxShadow: "0 20px 44px -16px rgba(40,24,8,0.5), inset 0 0 46px rgba(170,130,60,0.22)", padding: "15px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#F1D889,#B8862B)", border: "3px solid #8E6418", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#5A3A12" }}>❋</div>
          <div style={{ flex: 1, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#5A3A16", whiteSpace: "nowrap", overflow: "hidden", textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}>
            {shown || "type your comment…"}{!doneTyping && cursorOn && <span style={{ color: "#B8501F" }}>|</span>}
          </div>
          <div style={{ padding: "10px 22px", borderRadius: 9, background: posted ? "linear-gradient(180deg,#5EC08A,#2E9E63)" : "linear-gradient(180deg,#DDAB44,#B8862B)", border: "2px solid #8E6418", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, transform: `scale(${postScale})`, boxShadow: `0 0 0 ${glow}px rgba(201,147,42,0.4)`, flexShrink: 0, whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            {posted ? "POSTED ✓" : "POST"}
          </div>
        </div>
      </div>
      {/* envelope flies from the posted comment down to the free guide */}
      {flyT > 0 && flyT < 1 && (
        <div style={{ position: "absolute", left: 506, top: envY, transform: `translate(-50%,0) scale(${envScale})`, zIndex: 14, fontSize: 46, filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.35))" }}>📩</div>
      )}
      {/* bouncing pointer at the comment box */}
      <div style={{ position: "absolute", left: 852, top: 214 - arrowBob, zIndex: 15, fontSize: 52, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", transform: "rotate(-18deg)" }}>👈</div>
      <div style={{ position: "absolute", left: 506, top: 388, transform: `translate(-50%,0) rotate(${giftWig}deg)`, transformOrigin: "center", width: 580, borderRadius: 14, background: "linear-gradient(180deg,#3C2B13,#241606)", border: "3px solid #E7B24C", padding: "15px 22px", zIndex: 12, display: "flex", alignItems: "center", gap: 15, boxShadow: `0 0 ${14 + 10 * Math.abs(Math.sin(f / 7))}px rgba(231,178,76,0.6)` }}>
        <span style={{ fontSize: 40, display: "inline-block", transform: `rotate(${-giftWig * 2}deg)` }}>📜</span>
        <div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#FBEFCF" }}>FREE BUILD GUIDE + PROMPTS</div><div style={{ fontFamily: mono, fontSize: 18, color: GOLD }}>sent straight to you</div></div>
      </div>
      <div style={{ position: "absolute", left: 506, top: 504, transform: "translate(-50%,0)", zIndex: 12, padding: "8px 22px", borderRadius: 999, background: "linear-gradient(180deg,#3C2B13,#241606)", border: "2px solid #C9932A", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#F0E3C6", whiteSpace: "nowrap" }}>📌 save this + send it to a friend</div>
      {/* celebration bursts once the comment posts */}
      {posted && <>
        <div style={{ position: "absolute", left: 210, top: 470, zIndex: 16 }}><Sparkles lf={f} at={1.87} x={0} y={0} n={16} spread={200} colors={[GOLD, "#fff", GREEN]} dur={1.1} /></div>
        <div style={{ position: "absolute", left: 800, top: 470, zIndex: 16 }}><Sparkles lf={f} at={1.93} x={0} y={0} n={16} spread={200} colors={["#6FB0EE", "#fff", GOLD]} dur={1.1} /></div>
      </>}
      <div style={{ position: "absolute", left: 150, top: 542 - cbob, zIndex: 10 }}><Mascot lf={f} size={148} constr={1} cheer={posted ? 1 : 0.6} gaze={4} nodAmp={3.2} /></div>
      <div style={{ position: "absolute", left: 744, top: 542 - cbob, transform: "scaleX(-1)", zIndex: 10 }}><GeminiBot lf={f} size={148} cheer={posted ? 1 : 0.6} gaze={4} /></div>
    </SceneFrame>
  );
};

export const RouteBoard: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }}>
    <Sequence from={0} durationInFrames={40}><SB_Team /></Sequence>
    <Sequence from={40} durationInFrames={40}><SB_Setup /></Sequence>
    <Sequence from={80} durationInFrames={40}><SB_Loop /></Sequence>
    <Sequence from={120} durationInFrames={40}><SB_Why /></Sequence>
    <Sequence from={160} durationInFrames={40}><SB_Cta /></Sequence>
  </AbsoluteFill>
);

// ============================== main preview comp (3 stills: hook / setup / demo) ==============================
export const ClaudeRouteReel: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }}>
    <Sequence from={0} durationInFrames={60}><SceneHook /></Sequence>
    <Sequence from={60} durationInFrames={60}><SceneSetup /></Sequence>
    <Sequence from={120} durationInFrames={60}><SceneDemo /></Sequence>
  </AbsoluteFill>
);

// ============================== FULL REEL — global VO-synced captions ==============================
type RWd = { start: number; end: number; word: string };
const rcw: RWd[] = (() => { const out: RWd[] = []; (routeWords as RWd[]).forEach((w) => { const tk = w.word.trim(); const frag = tk === "" || /^[%\-.,!?;:)]/.test(tk); if (frag && out.length) { const p = out[out.length - 1]; out[out.length - 1] = { ...p, word: p.word + w.word, end: w.end }; } else out.push({ ...w }); }); return out; })();
const rclines: { words: RWd[]; start: number; end: number }[] = (() => { const out: { words: RWd[]; start: number; end: number }[] = []; let cur: RWd[] = []; let chars = 0; rcw.forEach((w, i) => { cur.push(w); chars += w.word.trim().length + 1; const next = rcw[i + 1]; const gap = next ? next.start - w.end : 99; const endsSent = /[.!?]$/.test(w.word.trim()); if (chars >= 15 || gap > 0.34 || endsSent || cur.length >= 4) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; chars = 0; } }); if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end }); return out; })();
const RouteCaptions: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const lead = 0.12; let cur = rclines[0];
  for (let i = 0; i < rclines.length; i++) { if (t + lead >= rclines[i].words[0].start) cur = rclines[i]; }
  const done = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1272, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 15px" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.start; const nxt = cur.words[i + 1]; const active = !done && on && (!nxt || t + lead < nxt.start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.1, color: on ? (active ? CLAYD : CLAY) : "#5A463C", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: active ? "0 2px 14px rgba(255,251,244,0.95)" : "0 1px 3px rgba(90,70,60,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};
// SETUP — the realistic Claude desktop app recording (big, not full-bleed) + Claude sprite reacting
const SB_SetupRec: React.FC = () => {
  const f = useCurrentFrame(); const bob = Math.sin(f / 10) * 4;
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={interpolate(f, [0, 469], [0.295, 0.659], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <HeaderPill badge="🖥️" l1={<>SET IT UP</>} l2={<><span style={{ color: CLAY }}>IN 2 MINUTES</span></>} />
      {/* the recording window — takes most of the frame, floating on the studio bg */}
      <div style={{ position: "absolute", left: 92, top: 430, width: 896, height: 560, borderRadius: 22, overflow: "hidden", boxShadow: SH, border: "4px solid #EBE3D2", background: "#0E1016", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1600, height: 1000, transform: "scale(0.56)", transformOrigin: "top left" }}><RouteSetupRec /></div>
      </div>
      <SetupHud f={f} />
      {/* Claude sprite presenting the screen */}
      <div style={{ position: "absolute", left: 110, top: 1004 + bob, zIndex: 12 }}><Mascot lf={f} size={190} constr={1} cheer={0.7} gaze={5} nodAmp={2.5} /></div>
      <div style={{ position: "absolute", left: 322, top: 1030, zIndex: 12, background: "#fff", border: "3px solid #EBE3D2", borderRadius: 20, padding: "16px 26px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 38, color: INK, boxShadow: SH, whiteSpace: "nowrap" }}>just follow along <span style={{ display: "inline-block", transform: `translateY(${-bob}px)` }}>👆</span></div>
    </AbsoluteFill>
  );
};
// retention HUD: a video-scrubber over the recording that keeps moving so viewers stay
const SetupHud: React.FC<{ f: number }> = ({ f }) => {
  const total = 469; const bounds = [0, 64, 102, 152, 245];
  const labels = ["Grab your free Google AI key", "Install the Gemini CLI", "Add the Gemini plugin to Claude", "Copy prompt 1 into Claude", "Paste prompt 2, builds /route"];
  let cur = 0; for (let i = 0; i < 5; i++) if (f >= bounds[i]) cur = i;
  const p = Math.min(1, f / total);
  return (
    <div style={{ position: "absolute", left: 92, top: 902, width: 896, height: 88, background: "linear-gradient(180deg,rgba(12,15,22,0) 0%,rgba(12,15,22,0.97) 48%)", borderRadius: "0 0 18px 18px", zIndex: 15, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 26px 15px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16 }}>{cur + 1}</div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: "#fff", whiteSpace: "nowrap" }}>{labels[cur]}</span>
        <span style={{ marginLeft: "auto", fontFamily: mono, fontWeight: 700, fontSize: 23, color: GOLD, whiteSpace: "nowrap" }}>Step {cur + 1}/5</span>
      </div>
      <div style={{ position: "relative", height: 11, borderRadius: 999, background: "rgba(255,255,255,0.22)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 999, background: "linear-gradient(90deg,#D2724E,#E7B24C)" }} />
        {bounds.slice(1).map((b, i) => <div key={i} style={{ position: "absolute", left: `${b / total * 100}%`, top: -3, bottom: -3, width: 2, background: "rgba(255,255,255,0.5)" }} />)}
        <div style={{ position: "absolute", left: `calc(${p * 100}% - 9px)`, top: -5, width: 20, height: 20, borderRadius: "50%", background: "#fff", border: `3px solid ${CLAY}`, boxShadow: "0 2px 6px rgba(0,0,0,0.45)" }} />
      </div>
    </div>
  );
};
// SCENE 4 (recording) — HOW IT WORKS: type /route, watch Claude orchestrate Gemini
// a tiny costumed Claude hammering away in the corner of the /route screen while it runs
const MiniBuilder: React.FC<{ f: number }> = ({ f }) => {
  const pop = Math.min(1, spr(f, 82, 12, 200)); if (pop < 0.02) return null;
  const swing = Math.sin(f / 3.6) * 30 - 12;
  const hit = Math.sin(f / 3.6) > 0.9;
  const blocks = Math.min(5, 1 + Math.floor(Math.max(0, f - 96) / 30));
  return (
    <div style={{ position: "absolute", left: 700, top: 792, zIndex: 16, transform: `scale(${pop})`, transformOrigin: "bottom center" }}>
      {/* the little tower it is building */}
      <div style={{ position: "absolute", left: 150, bottom: 2, display: "flex", flexDirection: "column-reverse", gap: 3, alignItems: "center" }}>
        {Array.from({ length: blocks }).map((_, i) => <div key={i} style={{ width: 42 - i * 2, height: 18, borderRadius: 4, background: i % 2 ? GOLD : CLAY, border: "2px solid #fff", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />)}
      </div>
      {/* swinging hammer */}
      <div style={{ position: "absolute", left: 116, top: 30, transform: `rotate(${swing}deg)`, transformOrigin: "10px 48px", zIndex: 18 }}>
        <div style={{ position: "absolute", left: 6, top: 10, width: 7, height: 44, background: "#7A5233", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: -6, top: 0, width: 30, height: 17, background: "#9AA6B2", borderRadius: 4, border: "2px solid #5E6672" }} />
      </div>
      {hit && <div style={{ position: "absolute", left: 150, top: 46, zIndex: 19, fontSize: 20, color: GOLD }}>✦</div>}
      <Mascot lf={f} size={118} constr={1} gaze={7} cheer={0.25} nodAmp={1.6} />
      <div style={{ position: "absolute", left: -6, top: -24, background: "rgba(14,17,24,0.92)", border: `1.5px solid ${GOLD}`, borderRadius: 9, padding: "3px 10px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "#fff", whiteSpace: "nowrap", zIndex: 20 }}>on it 🔨</div>
    </div>
  );
};
const SB_LoopRec: React.FC = () => {
  const f = useCurrentFrame(); const bob = Math.sin(f / 10) * 4;
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={interpolate(f, [0, 283], [0.659, 0.878], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <HeaderPill badge="⚙️" l1={<>TYPE /ROUTE ONCE</>} l2={<><span style={{ color: CLAY }}>IT BUILDS IT ALL</span></>} />
      <div style={{ position: "absolute", left: 92, top: 430, width: 896, height: 560, borderRadius: 22, overflow: "hidden", boxShadow: SH, border: "4px solid #EBE3D2", background: "#0E1016", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1600, height: 1000, transform: "scale(0.56)", transformOrigin: "top left" }}><RouteRunRec /></div>
      </div>
      <MiniBuilder f={f} />
      <div style={{ position: "absolute", left: 110, top: 1004 + bob, zIndex: 12 }}><Mascot lf={f} size={190} constr={1} cheer={0.7} gaze={5} nodAmp={2.5} /></div>
      <div style={{ position: "absolute", left: 322, top: 1030, zIndex: 12, background: "#fff", border: "3px solid #EBE3D2", borderRadius: 20, padding: "16px 26px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 38, color: INK, boxShadow: SH, whiteSpace: "nowrap" }}>Claude runs the show <span style={{ display: "inline-block", transform: `translateY(${-bob}px)` }}>👇</span></div>
    </AbsoluteFill>
  );
};
// the hook as a full scene (no own audio/captions — the full reel supplies those)
const HookFullScene: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={interpolate(f, [0, 150], [0, 0.116], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <HookHeaderRich lf={f} variant={variant} />
      <Panel label="claude vs gemini"><HookStage /></Panel>
    </AbsoluteFill>
  );
};

// ============================== THE FULL ~61s REEL (route_vo v2) ==============================
export const ClaudeRouteFull: React.FC<{ hook?: number; cdBig?: boolean }> = ({ hook = 0, cdBig = false }) => (
  <AbsoluteFill style={{ background: CREAM }}>
    <Sequence from={0} durationInFrames={150}><HookFullScene variant={hook} /></Sequence>
    <Sequence from={150} durationInFrames={231}><SB_Team cdBig={cdBig} /></Sequence>
    <Sequence from={381} durationInFrames={469}><SB_SetupRec /></Sequence>
    <Sequence from={850} durationInFrames={283}><SB_LoopRec /></Sequence>
    <Sequence from={1133} durationInFrames={55}><SB_Cta /></Sequence>
    <RouteCaptions />
    {/* audio */}
    <Audio src={staticFile("route_vo.wav")} />
    <Audio loop startFrom={fr(8.5)} src={staticFile("route_music.mp3")} volume={(ff) => 0.16 * Math.min(1, ff / 12) * Math.min(1, Math.max(0, (1188 - ff) / 22))} />
    {/* ============ HOOK ============ */}
    <Sfx at={0.05} src="boom.wav" v={0.4} dur={1.2} />
    <Sfx at={0.05} src="lib_cinematic_hit.wav" v={0.34} dur={1.2} />
    <Sfx at={0.08} src="lib_riser.wav" v={0.24} dur={1.6} />
    <Sfx at={0.1} src="c_power.wav" v={0.3} dur={1.1} />
    <Sfx at={0.5} src="swooshup.wav" v={0.26} dur={0.6} />
    {/* tower floors slamming in, one per lit floor */}
    {[0.73, 1.13, 1.53, 1.93, 2.33, 2.73, 3.13, 3.53, 3.93, 4.33].map((t, i) => <Sfx key={`fl${i}`} at={t} src="thock.wav" v={0.16} dur={0.3} />)}
    {/* the benchmark screenshot SLAMS in (camera shutter + whoosh + shimmer) */}
    <Sfx at={2.73} src="lib_camera_shutter.wav" v={0.4} dur={0.6} />
    <Sfx at={2.73} src="swooshup.wav" v={0.3} dur={0.6} />
    <Sfx at={2.82} src="shimmer.wav" v={0.26} dur={1.0} />
    {/* tower tops out */}
    <Sfx at={4.35} src="c_fanfare.wav" v={0.3} dur={1.3} />
    <Sfx at={4.4} src="c_1up.wav" v={0.28} dur={1.0} />
    <Sfx at={4.4} src="crowd_cheer.wav" v={0.18} dur={1.4} />
    {/* ============ scene transitions (whoosh) ============ */}
    {[5.0, 12.7, 28.33, 37.77].map((t, i) => <Sfx key={`tr${i}`} at={t} src="lib_whoosh.wav" v={0.3} dur={0.7} />)}
    {[5.0, 12.7, 28.33, 37.77].map((t, i) => <Sfx key={`trs${i}`} at={t} src="chrome_shine.wav" v={0.18} dur={0.7} />)}
    {/* ============ TEAM (fight) ============ */}
    <Sfx at={5.0} src="stamp_press.wav" v={0.26} dur={0.5} />
    <Sfx at={5.0} src="crowd_cheer.wav" v={0.2} dur={2.4} />
    <Sfx at={5.0} src="crowd_ambience.wav" v={0.09} dur={7.6} />
    {/* clashes: alternating shing / clank + an impact on each */}
    {[5.27, 6.07, 6.87, 7.67, 8.47, 9.27, 10.07, 10.87, 11.67, 12.47].map((t, i) => <Sfx key={`cl${i}`} at={t} src={i % 2 ? "katana_shing.wav" : "mech_clank.wav"} v={0.3} dur={0.4} />)}
    {[5.27, 6.87, 8.47, 10.07, 11.67].map((t, i) => <Sfx key={`ci${i}`} at={t} src="impact.wav" v={0.2} dur={0.35} />)}
    {/* countdown ticks */}
    {[6.47, 7.93, 9.4, 10.87].map((t, i) => <Sfx key={`tk${i}`} at={t} src="tick.wav" v={0.3} dur={0.25} />)}
    {/* ============ SETUP (recording) ============ */}
    {[14.83, 16.1, 17.77, 20.87].map((t, i) => <Sfx key={`ss${i}`} at={t} src="swish.wav" v={0.22} dur={0.4} />)}
    <Sfx at={13.97} src="arrive_chime.wav" v={0.28} dur={0.8} />
    {[13.43, 14.77, 15.83, 16.83, 19.67, 21.73].map((t, i) => <Sfx key={`clk${i}`} at={t} src="lib_click.wav" v={0.34} dur={0.25} />)}
    <Sfx at={17.43} src="lib_confirm.wav" v={0.3} dur={0.6} />
    {[19.2, 21.2].map((t, i) => <Sfx key={`sc${i}`} at={t} src="scanner_sweep.wav" v={0.2} dur={0.7} />)}
    {[19.67, 21.73].map((t, i) => <Sfx key={`cp${i}`} at={t} src="c_collect.wav" v={0.28} dur={0.55} />)}
    {[19.67, 21.73].map((t, i) => <Sfx key={`gs${i}`} at={t} src="gold_stamp.wav" v={0.24} dur={0.5} />)}
    {[20.5, 22.6].map((t, i) => <Sfx key={`nt${i}`} at={t} src="lib_notif.wav" v={0.2} dur={0.5} />)}
    {/* ============ LOOP (/route) ============ */}
    <Sfx at={29.0} src="lib_mactype.wav" v={0.46} dur={1.1} />
    <Sfx at={29.0} src="lib_typing.wav" v={0.34} dur={1.0} />
    <Sfx at={29.97} src="lib_pop.wav" v={0.26} dur={0.4} />
    {[30.5, 31.5, 32.5, 33.5].map((t, i) => <Sfx key={`tc${i}`} at={t} src="lib_correct.wav" v={0.26} dur={0.4} />)}
    {[31.0, 32.0, 33.0].map((t, i) => <Sfx key={`mb${i}`} at={t} src="mallet_tap.wav" v={0.18} dur={0.3} />)}
    <Sfx at={34.9} src="c_powerbig.wav" v={0.3} dur={1.0} />
    <Sfx at={34.95} src="resolve.wav" v={0.26} dur={1.2} />
    {/* ============ CTA (types "route", then the video hard-cuts on the word) ============ */}
    <Sfx at={38.53} src="lib_mactype.wav" v={0.46} dur={0.9} />
    <Sfx at={38.53} src="lib_typing.wav" v={0.34} dur={0.8} />
    <Sfx at={39.37} src="c_coin.wav" v={0.32} dur={0.5} />
  </AbsoluteFill>
);

// ============================== OPEN reel — HOOK VARIANTS (7 free AI tools listicle) ==============================
// ---- rich STORE world props (Variant A) ----
const ShelfUnit: React.FC<{ x: number; flip?: boolean }> = ({ x, flip }) => (
  <div style={{ position: "absolute", left: x, top: 92, width: 156, height: 486, transform: flip ? "scaleX(-1)" : "none", zIndex: 5 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(96deg,#B7A98D,#D8CCB2)", boxShadow: "0 14px 30px rgba(0,0,0,0.28)" }} />
    <div style={{ position: "absolute", left: 4, right: 4, top: 4, bottom: 4, borderRadius: 6, background: "linear-gradient(180deg,#4A4234,#2E281F)" }} />
    {[0, 1, 2, 3].map((r) => (<React.Fragment key={r}>
      {[0, 1, 2].map((c) => { const col = ["#E27B5A", "#5AA0DE", "#6FC08A", "#E7B24C", "#B98ADE", "#E0A24C"][(r * 3 + c) % 6]; return <div key={c} style={{ position: "absolute", left: 16 + c * 44, top: 34 + r * 112, width: 36, height: 52, borderRadius: 5, background: `linear-gradient(180deg,${col},#00000022)`, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.28), 0 3px 5px rgba(0,0,0,0.3)" }} />; })}
      <div style={{ position: "absolute", left: 8, right: 8, top: 90 + r * 112, height: 10, background: "linear-gradient(180deg,#9A8B6E,#6E6047)", borderRadius: 2 }} />
    </React.Fragment>))}
  </div>
);
const NeonSign: React.FC<{ lf: number }> = ({ lf }) => { const flick = (lf % 90 < 3 || lf % 47 < 2) ? 0.55 : 1; return (
  <div style={{ position: "absolute", left: 506, top: 118, transform: "translate(-50%,-50%)", zIndex: 9, padding: "12px 40px", borderRadius: 18, border: `4px solid rgba(94,208,150,${flick})`, background: "rgba(10,20,16,0.6)", boxShadow: `0 0 ${26 * flick}px rgba(94,208,150,0.85), inset 0 0 22px rgba(94,208,150,0.5)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#EAFBF0", letterSpacing: 2, textShadow: `0 0 ${16 * flick}px rgba(94,208,150,1)`, whiteSpace: "nowrap", opacity: flick }}>★ ALL FREE ★</div>); };
const Cart: React.FC = () => (
  <svg width={190} height={150} viewBox="0 0 190 150" style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.4))" }}>
    <path d="M8 14 H34 L52 96 H150 L166 40 H50" fill="none" stroke="#3A6E9E" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 96 L48 112 H160" stroke="#3A6E9E" strokeWidth={7} strokeLinecap="round" fill="none" />
    {[62, 92, 122, 150].map((x, i) => <line key={i} x1={x} y1={44} x2={x + (i === 3 ? -4 : 2)} y2={92} stroke="#5AA0DE" strokeWidth={4} opacity={0.7} />)}
    <circle cx={70} cy={130} r={13} fill="#2E4C6E" stroke="#5AA0DE" strokeWidth={4} /><circle cx={140} cy={130} r={13} fill="#2E4C6E" stroke="#5AA0DE" strokeWidth={4} />
    {/* items in cart */}
    <rect x={64} y={54} width={30} height={40} rx={5} fill="#E27B5A" /><rect x={100} y={48} width={30} height={46} rx={5} fill="#6FC08A" /><rect x={132} y={58} width={22} height={36} rx={5} fill="#E7B24C" />
  </svg>
);
// Variant A — a detailed STORE aisle: paid AI-tool products slashed to FREE (Black-Friday / infomercial energy)
export const OpenHookA: React.FC = () => {
  const f = useCurrentFrame();
  const tools = [{ ic: "✂️", n: "Token Cutter", p: "$39/mo" }, { ic: "🎨", n: "Design AI", p: "$20/mo" }, { ic: "🧠", n: "Agent Pro", p: "$30/mo" }];
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.06} />
      <HeaderPill badge="🏷️" l1={<>7 <span style={{ color: GREEN }}>FREE</span> CLAUDE</>} l2={<>TOOLS YOU <span style={{ color: RED }}>PAY FOR</span></>} size={54} />
      <Panel label="stop paying for these">
        {/* store interior: warm wall + perspective floor + ceiling */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#EFE6D4 0%,#E7DCC6 54%,#D9CDB2 62%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 70, background: "linear-gradient(180deg,#CDBF9F,#E2D7BE)" }} />
        {/* track ceiling lights + beams */}
        {[220, 506, 792].map((x, i) => (<React.Fragment key={i}>
          <div style={{ position: "absolute", left: x - 20, top: 60, width: 40, height: 16, borderRadius: 5, background: "#6A5E48", zIndex: 6 }} />
          <div style={{ position: "absolute", left: x - 90, top: 74, width: 180, height: 360, background: "linear-gradient(180deg,rgba(255,244,214,0.5),transparent 72%)", clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)", zIndex: 4 }} />
        </React.Fragment>))}
        {/* floor perspective lines */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 496, bottom: 0, background: "linear-gradient(180deg,#D3C6AC,#BCAD8E)" }} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{ position: "absolute", left: `${8 + i * 14}%`, bottom: 0, width: 2, height: 296, background: "rgba(120,104,74,0.28)", transform: `translateX(${(i - 3) * 30}px)`, transformOrigin: "bottom" }} />)}
        <NeonSign lf={f} />
        <ShelfUnit x={-6} />
        <ShelfUnit x={874} flip />
        {/* central display podium */}
        <div style={{ position: "absolute", left: 506, top: 520, transform: "translateX(-50%)", width: 720, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,244,214,0.6),transparent 70%)", zIndex: 6 }} />
        <div style={{ position: "absolute", left: 176, top: 470, width: 660, height: 26, borderRadius: 10, background: "linear-gradient(180deg,#C6B692,#9E8C68)", zIndex: 7, boxShadow: "0 8px 18px rgba(0,0,0,0.25)" }} />
        {/* 3 featured products with price tags -> FREE */}
        {tools.map((t, i) => { const pop = spr(f, 8 + i * 7, 11, 210); const stamp = spr(f, 26 + i * 8, 9, 200); const bob = Math.sin(f / 12 + i) * 4; return (
          <div key={i} style={{ position: "absolute", left: 214 + i * 200, top: 226 - bob, width: 176, height: 250, borderRadius: 18, background: "#fff", border: "3px solid #E6DFCF", boxShadow: SH, transform: `translateY(${(1 - pop) * 28}px) scale(${Math.min(1.03, pop)})`, zIndex: 11, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 12px" }}>
            <div style={{ width: 84, height: 84, borderRadius: 20, background: grad("#EDE7DB", "#D6CBB6"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{t.ic}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: INK, marginTop: 12, textAlign: "center" }}>{t.n}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: "#B0342A", marginTop: 8, textDecoration: "line-through", opacity: 0.85 }}>{t.p}</div>
            <div style={{ position: "absolute", left: "50%", top: 176, transform: `translate(-50%,-50%) rotate(-11deg) scale(${Math.min(1.12, stamp)})`, padding: "7px 22px", borderRadius: 11, background: grad("#54C892", "#2E9E63"), border: "4px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#fff", boxShadow: "0 10px 22px rgba(46,158,99,0.55)" }}>FREE</div>
          </div>); })}
        {/* flying savings coins */}
        {Array.from({ length: 10 }).map((_, i) => { const life = 46 + seed(i) * 30; const t = (((f + seed(i * 3) * life) % life) + life) % life / life; return <div key={`co${i}`} style={{ position: "absolute", left: 300 + seed(i) * 420, top: 460 - t * 300, width: 26, height: 26, borderRadius: "50%", background: grad("#F3D06A", "#C99A2E"), border: "2px solid #fff8dd", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 16, color: "#7a5a10", opacity: (1 - t) * 0.95, zIndex: 13 }}>$</div>; })}
        {/* shopper mascot + cart */}
        <div style={{ position: "absolute", left: 118, top: 500 + Math.sin(f / 11) * 4, zIndex: 14 }}><Mascot lf={f} size={196} cheer={0.85} gaze={6} nodAmp={3.2} /></div>
        <div style={{ position: "absolute", left: 296, top: 590, zIndex: 13 }}><Cart /></div>
        <div style={{ position: "absolute", left: 700, top: 470, zIndex: 15 }}><Sparkles lf={f} at={0.35} x={0} y={0} n={16} spread={200} colors={[GREEN, GOLD, "#fff"]} dur={1.1} /></div>
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 160px rgba(80,60,30,0.32)", pointerEvents: "none", zIndex: 16 }} />
      </Panel>
    </AbsoluteFill>
  );
};
// ---- rich VAULT world props (Variant B) ----
const StoneWall: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2C2820 0%,#221E18 58%,#161309 100%)" }} />
    {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 10 }).map((_, c) => { const off = r % 2 ? 60 : 0; const x = -50 + c * 120 + off; const shade = ["#3A342A", "#332E25", "#2C271F", "#39332A"][(r * 10 + c) % 4]; return <div key={`${r}-${c}`} style={{ position: "absolute", left: x, top: 4 + r * 68, width: 112, height: 60, borderRadius: 4, background: shade, boxShadow: "inset 2px 2px 3px rgba(255,255,255,0.045), inset -2px -3px 6px rgba(0,0,0,0.55)", zIndex: 3 }} />; }))}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 56% 46%, transparent 30%, rgba(0,0,0,0.5) 100%)", zIndex: 4 }} />
  </>
);
const VaultDoor: React.FC<{ open: number; lf: number }> = ({ open, lf }) => (
  <div style={{ position: "absolute", left: 150, top: 400, transform: `translate(-50%,-50%) perspective(1000px) rotateY(${-52 - open * 34}deg)`, transformOrigin: "left center", zIndex: 16 }}>
    <svg width={332} height={452} viewBox="0 0 332 452" style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.65))" }}>
      <defs><linearGradient id="vsteel" x1="20" y1="0" x2="312" y2="0"><stop offset="0" stopColor="#565E6A" /><stop offset="0.5" stopColor="#828A96" /><stop offset="1" stopColor="#40474F" /></linearGradient></defs>
      <rect x={18} y={10} width={296} height={432} rx={30} fill="url(#vsteel)" stroke="#282E38" strokeWidth={6} />
      {Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2; const cx = 166 + Math.cos(a) * 128, cy = 226 + Math.sin(a) * 192; return <circle key={i} cx={cx} cy={cy} r={8} fill="#9AA2AE" stroke="#333A44" strokeWidth={2} />; })}
      <circle cx={166} cy={226} r={78} fill="none" stroke="#333A44" strokeWidth={15} />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={159} y={150} width={14} height={152} rx={5} fill="#6C747F" transform={`rotate(${k * 36 + lf * 0.7} 166 226)`} />)}
      <circle cx={166} cy={226} r={30} fill="#5A626E" stroke="#333A44" strokeWidth={6} />
    </svg>
  </div>
);
// Variant B — a detailed treasure VAULT of open-source repos (Indiana-Jones / heist energy)
export const OpenHookB: React.FC = () => {
  const f = useCurrentFrame();
  const open = over(f, 8, fr(0.8));
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.06} />
      <HeaderPill badge="🗝️" l1={<>CLAUDE'S <span style={{ color: GOLD }}>FREE</span></>} l2={<>TOOL VAULT</>} size={56} />
      <Panel label="⭐ 100k+ stars inside">
        <StoneWall />
        {/* glowing treasure chamber through the doorway */}
        <div style={{ position: "absolute", left: 566, top: 400, transform: "translate(-50%,-50%)", width: 486, height: 486, borderRadius: 30, overflow: "hidden", boxShadow: "inset 0 0 70px rgba(0,0,0,0.75), 0 0 4px #1a140a", background: "radial-gradient(ellipse at 50% 58%,#6E5220 0%,#3A2C12 68%)", zIndex: 8 }}>
          <div style={{ position: "absolute", left: "50%", top: "56%", transform: "translate(-50%,-50%)", width: 456, height: 360, borderRadius: "50%", background: `radial-gradient(ellipse,rgba(231,178,76,${0.52 + 0.15 * Math.sin(f / 7)}),transparent 66%)` }} />
          <div style={{ position: "absolute", left: "50%", top: -30, width: 250, height: 470, transform: "translateX(-50%)", background: "linear-gradient(180deg,rgba(255,246,204,0.5),transparent 72%)", clipPath: "polygon(40% 0,60% 0,100% 100%,0 100%)" }} />
          {/* coin mounds along the floor */}
          {[[70, 386, 128], [200, 408, 168], [360, 388, 120]].map(([x, y, w], i) => <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: 66, borderRadius: "50% 50% 42% 42%", background: "linear-gradient(180deg,#F5D473,#B8862B)", boxShadow: "0 -4px 12px rgba(255,240,180,0.5)" }} />)}
        </div>
        {/* steel vault frame ring around the doorway */}
        <div style={{ position: "absolute", left: 566, top: 400, transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: 34, border: "16px solid", borderColor: "#5E6673 #4A525E #3A424E #4A525E", zIndex: 9, boxShadow: "0 16px 34px rgba(0,0,0,0.5)" }} />
        {/* three star repos on pedestals, evenly displayed */}
        {[0, 1, 2].map((i) => { const s = spr(f, 22 + i * 9, 11, 210); const gy = Math.sin(f / 9 + i * 1.3) * 6; const cx = 476 + i * 90; return (
          <div key={i} style={{ position: "absolute", left: cx, top: 252 - gy, transform: `translateX(-50%) scale(${Math.min(1.06, s)})`, transformOrigin: "bottom center", zIndex: 12, opacity: open, textAlign: "center" }}>
            <div style={{ width: 90, height: 110, borderRadius: 15, background: "#fff", border: "2px solid #E6DFCF", boxShadow: "0 12px 26px rgba(0,0,0,0.5), 0 0 28px rgba(231,178,76,0.42)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <div style={{ fontSize: 40 }}>{["✂️", "🎨", "🧠"][i]}</div>
              <div style={{ fontFamily: mono, fontSize: 15, color: "#B8862B", fontWeight: 800, marginTop: 6 }}>⭐{["48k", "31k", "62k"][i]}</div>
            </div>
            <div style={{ width: 62, height: 18, margin: "6px auto 0", borderRadius: 4, background: "linear-gradient(180deg,#6A5A3A,#3A3020)", boxShadow: "0 6px 10px rgba(0,0,0,0.4)" }} />
          </div>); })}
        {/* floating gold star-gems */}
        {Array.from({ length: 14 }).map((_, i) => { const life = 58 + seed(i) * 40; const t = (((f + seed(i * 3) * life) % life) + life) % life / life; return <div key={`gm${i}`} style={{ position: "absolute", left: 430 + seed(i) * 300, top: 510 - t * 260, fontSize: 15 + seed(i * 2) * 14, opacity: (1 - t) * 0.95, zIndex: 13, filter: "drop-shadow(0 0 7px rgba(231,178,76,0.9))" }}>⭐</div>; })}
        <VaultDoor open={open} lf={f} />
        <Torch x={70} y={476} lf={f} s={1.2} />
        <Torch x={946} y={476} lf={f} s={1.2} />
        {/* dust motes */}
        {Array.from({ length: 16 }).map((_, i) => { const life = 90; const t = (((f * 0.5 + seed(i * 5) * life) % life) + life) % life / life; return <div key={`d${i}`} style={{ position: "absolute", left: 120 + seed(i) * 800, top: 120 + seed(i * 2) * 560, width: 3 + seed(i) * 3, height: 3 + seed(i) * 3, borderRadius: "50%", background: "rgba(231,200,140,0.5)", opacity: (0.5 - Math.abs(t - 0.5)) * 1.2, zIndex: 14 }} />; })}
        <div style={{ position: "absolute", left: 820, top: 512 + Math.sin(f / 10) * 4, zIndex: 17 }}><Mascot lf={f} size={188} cheer={0.5} shock={0.45} gaze={-6} nodAmp={2.6} /></div>
        <div style={{ position: "absolute", left: 566, top: 636, transform: "translate(-50%,-50%)", zIndex: 18, padding: "8px 22px", borderRadius: 999, background: "rgba(14,20,34,0.9)", border: `2px solid ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: GOLD, whiteSpace: "nowrap", boxShadow: "0 0 18px rgba(231,178,76,0.5)" }}>⭐ 100k+ stars</div>
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.62)", pointerEvents: "none", zIndex: 19 }} />
      </Panel>
    </AbsoluteFill>
  );
};
// ---- rich ARCADE claw-machine world (Variant C) ----
const ClawCabinetBack: React.FC<{ x: number; hue: string; lf: number; k: number }> = ({ x, hue, lf, k }) => (
  <div style={{ position: "absolute", left: x, top: 262, width: 148, height: 320, zIndex: 4, opacity: 0.5 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "linear-gradient(180deg,#2A1C4E,#160E2A)", border: `2px solid ${hue}66` }} />
    <div style={{ position: "absolute", left: 14, right: 14, top: 28, height: 92, borderRadius: 8, background: hue, opacity: 0.32 + 0.24 * Math.sin(lf / 9 + k), boxShadow: `0 0 22px ${hue}` }} />
    <div style={{ position: "absolute", left: 20, right: 20, top: 150, height: 58, borderRadius: 6, background: "#0C0820" }} />
  </div>
);
// Variant C — a FREE-PLAY arcade claw machine grabbing all 7 tools (Toy-Story "the claw" energy)
export const OpenHookC: React.FC = () => {
  const f = useCurrentFrame();
  const caps = [
    { ic: "✂️", c: "#4FD08A" }, { ic: "🎨", c: "#5AA0DE" }, { ic: "👥", c: "#E0894C" },
    { ic: "🧠", c: "#E7B24C" }, { ic: "🔎", c: "#9A7BE0" }, { ic: "🎬", c: "#E2685C" }, { ic: "🐳", c: "#48B8D0" },
  ];
  // resting spots inside the glass (page coords); index 6 sits directly under the claw and gets grabbed
  const spots = [[322, 454], [400, 468], [478, 460], [556, 454], [368, 414], [540, 412], [472, 402]];
  const grabIdx = 6;
  const reach = over(f, 8, 34);
  const lift = over(f, 52, 26);
  const clawX = 472;
  const clawY = 70 + reach * 214 - lift * 214;
  return (
    <AbsoluteFill>
      <StudioBg />
      <Rail p={0.06} />
      <HeaderPill badge="⚡" l1={<>7 <span style={{ color: GREEN }}>FREE</span> CLAUDE</>} l2={<>POWER-UPS</>} size={56} />
      <Panel label="insert coin · $0.00">
        {/* arcade night bg */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#241640 0%,#1A1030 56%,#120A22 100%)" }} />
        {/* neon grid floor */}
        {Array.from({ length: 11 }).map((_, i) => <div key={`v${i}`} style={{ position: "absolute", left: `${i * 10}%`, bottom: 0, width: 2, height: 250, background: "rgba(130,96,224,0.4)", transform: `translateX(${(i - 5) * 52}px)`, transformOrigin: "bottom", zIndex: 3 }} />)}
        {[0, 1, 2, 3].map((i) => <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, bottom: 8 + i * i * 20, height: 2, background: `rgba(130,96,224,${0.4 - i * 0.07})`, zIndex: 3 }} />)}
        {/* background cabinets */}
        <ClawCabinetBack x={64} hue="#E2685C" lf={f} k={0} />
        <ClawCabinetBack x={866} hue="#5AA0DE" lf={f} k={2} />
        {/* ===== central claw machine ===== */}
        <div style={{ position: "absolute", left: 262, top: 196, width: 420, height: 470, borderRadius: 22, background: "linear-gradient(180deg,#E2685C,#B33F38)", boxShadow: "0 24px 50px rgba(0,0,0,0.55), inset 0 3px 0 rgba(255,255,255,0.25)", zIndex: 8 }} />
        {/* marquee */}
        {(() => { const fl = (f % 80 < 4 || f % 41 < 2) ? 0.55 : 1; return (
          <div style={{ position: "absolute", left: 472, top: 176, transform: "translate(-50%,-50%)", width: 300, height: 58, borderRadius: 12, background: "rgba(12,8,32,0.72)", border: `3px solid rgba(231,178,76,${fl})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#FFE9AE", letterSpacing: 2, textShadow: `0 0 ${14 * fl}px #E7B24C`, boxShadow: `0 0 ${24 * fl}px rgba(231,178,76,0.7)`, zIndex: 12, opacity: fl }}>FREE PLAY</div>); })()}
        {/* glass box */}
        <div style={{ position: "absolute", left: 282, top: 226, width: 380, height: 300, borderRadius: 12, overflow: "hidden", background: "linear-gradient(180deg,rgba(150,200,240,0.18),rgba(80,120,200,0.12))", border: "3px solid rgba(200,230,255,0.4)", boxShadow: "inset 0 0 40px rgba(120,180,255,0.25)", zIndex: 9 }}>
          <div style={{ position: "absolute", left: -20, top: -20, width: 120, height: 340, background: "linear-gradient(120deg,rgba(255,255,255,0.22),transparent)", transform: "rotate(12deg)" }} />
        </div>
        {/* claw rail + cord */}
        <div style={{ position: "absolute", left: 292, top: 236, width: 360, height: 8, borderRadius: 4, background: "#7A5A2A", zIndex: 13 }} />
        <div style={{ position: "absolute", left: clawX, top: 240, width: 4, height: clawY, background: "#C9BEA0", transform: "translateX(-50%)", zIndex: 13 }} />
        {(() => { const op = lift > 0 ? 0 : 1 - reach * 0.6; return (
          <svg width={92} height={80} viewBox="0 0 92 80" style={{ position: "absolute", left: clawX, top: 240 + clawY, transform: "translate(-50%,-6px)", zIndex: 14 }}>
            <rect x={40} y={0} width={12} height={20} rx={3} fill="#9AA2AE" />
            <circle cx={46} cy={22} r={10} fill="#C0C6CE" stroke="#6A727C" strokeWidth={2} />
            <path d={`M46 30 Q${20 - op * 8} ${50 + op * 6} ${16 - op * 10} ${72 + op * 4}`} fill="none" stroke="#B0B6BE" strokeWidth={7} strokeLinecap="round" />
            <path d="M46 30 Q46 54 46 76" fill="none" stroke="#B0B6BE" strokeWidth={7} strokeLinecap="round" />
            <path d={`M46 30 Q${72 + op * 8} ${50 + op * 6} ${76 + op * 10} ${72 + op * 4}`} fill="none" stroke="#B0B6BE" strokeWidth={7} strokeLinecap="round" />
          </svg>); })()}
        {/* capsules inside */}
        {caps.map((cp, i) => { const grabbed = i === grabIdx; const s = spr(f, 4 + i * 3, 12, 200); const [sx, sy] = spots[i]; const bob = Math.sin(f / 10 + i) * 3; const px = grabbed ? clawX : sx; const py = grabbed ? 240 + clawY + 58 : sy + bob; return (
          <div key={i} style={{ position: "absolute", left: px, top: py, transform: `translate(-50%,-50%) scale(${Math.min(1.05, s)})`, width: 74, height: 74, borderRadius: "50%", background: `linear-gradient(180deg,${cp.c},#00000033)`, border: "3px solid rgba(255,255,255,0.7)", boxShadow: `0 6px 14px rgba(0,0,0,0.4), inset 0 3px 0 rgba(255,255,255,0.5), 0 0 18px ${cp.c}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, zIndex: grabbed ? 15 : 10 }}>
            <div style={{ position: "absolute", left: "24%", top: "18%", width: "34%", height: "24%", borderRadius: "50%", background: "rgba(255,255,255,0.55)" }} />
            <span style={{ position: "relative", zIndex: 2 }}>{cp.ic}</span>
          </div>); })}
        {/* control panel + joystick + buttons */}
        <div style={{ position: "absolute", left: 282, top: 536, width: 380, height: 96, borderRadius: 10, background: "linear-gradient(180deg,#8E332E,#6E2622)", zIndex: 11, boxShadow: "inset 0 3px 0 rgba(255,255,255,0.15)" }} />
        <div style={{ position: "absolute", left: 368, top: 556, width: 12, height: 44, background: "#2A2030", transform: `rotate(${Math.sin(f / 12) * 11}deg)`, transformOrigin: "bottom", zIndex: 12 }} />
        <div style={{ position: "absolute", left: 356, top: 548, width: 34, height: 34, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,#F26A3C,#B33F1E)", zIndex: 13, boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }} />
        {["#4FD08A", "#E7B24C"].map((c, i) => <div key={i} style={{ position: "absolute", left: 540 + i * 58, top: 556, width: 40, height: 40, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%,${c},#00000055)`, zIndex: 13, boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 0 14px ${c}` }} />)}
        {/* coin slot $0 tag */}
        <div style={{ position: "absolute", left: 472, top: 596, transform: "translate(-50%,-50%) rotate(-8deg)", padding: "4px 14px", borderRadius: 8, background: grad("#54C892", "#2E9E63"), border: "2px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#fff", zIndex: 16, boxShadow: "0 6px 14px rgba(46,158,99,0.5)" }}>$0.00</div>
        {/* prize chute */}
        <div style={{ position: "absolute", left: 292, top: 600, width: 88, height: 56, borderRadius: "8px 8px 10px 10px", background: "rgba(10,6,26,0.7)", border: "2px solid rgba(255,255,255,0.2)", zIndex: 12 }} />
        {/* mascot playing */}
        <div style={{ position: "absolute", left: 726, top: 476 + Math.sin(f / 11) * 4, zIndex: 15 }}><Mascot lf={f} size={196} cheer={0.8} gaze={-8} nodAmp={3.2} /></div>
        {lift > 0.3 && <div style={{ position: "absolute", left: clawX, top: 240 + clawY + 58, zIndex: 17 }}><Sparkles lf={f} at={0.5} x={0} y={0} n={14} spread={150} colors={[GOLD, GREEN, "#fff"]} dur={1} /></div>}
        <div style={{ position: "absolute", left: 472, top: 648, transform: "translate(-50%,-50%)", zIndex: 18, padding: "8px 24px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#3a2a05", boxShadow: "0 8px 20px rgba(211,154,42,0.5)" }}>ALL 7 FREE</div>
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(0,0,0,0.5)", pointerEvents: "none", zIndex: 19 }} />
      </Panel>
    </AbsoluteFill>
  );
};
