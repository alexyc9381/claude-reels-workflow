import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile, Easing, Sequence } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";
import WORDS from "./data/words_design.json";

/* =========================================================================
   THE PANEL · full reel · "5 AI design tools"  (intro -> 5 contestants ->
   v0 GOLDEN BUZZER finale). Warm animation palette, real logos + glow halos,
   judges press buzzers -> stars fly to the panel. Captions = house style.
   Synced to public/vo_design.wav ; music bed from frame 0.
   ========================================================================= */

const SAFE_TOP = 250;
const FPS = 30;
// ---- WARM animation palette ----
const BG_A = "#5C3A56", BG_B = "#2E1B34";
const AMBER = "#F0A64C", ROSE = "#E88AA6", WARM = "#F6C27A";
const CURT = "#B0304A", CURT_HI = "#D25068", CURT_DK = "#66182C";
const FLOOR = "#48304E", FLOOR_HI = "#6C4870";
const GOLD = "#F0C24E", GOLD_HI = "#FCEBB0", GOLD_DK = "#A67C1E";
const CLAY = "#D97757", CLAY_DK = "#B8501F", CREAM = "#FBF4E6", MUTE = "#D8C6DE", INK = "#2A1626";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const hexA = (h: string, a: number) => { const n = parseInt(h.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/* ---- REAL LOGOS ---- */
const PATHS: Record<string, string> = {
  framer: "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z",
  figma: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.49c0 2.476-2.014 4.49-4.49 4.49z",
  v0: "M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z",
};
type Brand = { name: string; kind: "path" | "canva" | "uizard"; tile: string; mark: string; glow: string; slug?: string };
const FIELD: Brand[] = [
  { name: "Canva AI", kind: "canva", tile: "conic", mark: "#fff", glow: "#4CC7D6" },
  { name: "Uizard", kind: "uizard", tile: "#6C4CE0", mark: "#fff", glow: "#8A6CFF" },
  { name: "Framer", kind: "path", slug: "framer", tile: "#ffffff", mark: "#0055FF", glow: "#3B82FF" },
  { name: "Figma", kind: "path", slug: "figma", tile: "#1E1E1E", mark: "#F24E1E", glow: "#F2683E" },
  { name: "v0", kind: "path", slug: "v0", tile: "#111114", mark: "#ffffff", glow: "#E4E4EC" },
];
const Logo: React.FC<{ b: Brand; size: number; glow?: number }> = ({ b, size, glow = 0.5 }) => {
  const R = size * 0.235;
  const inner = (() => {
    // clean, accurate app-icon looks
    if (b.kind === "canva") return { bg: `linear-gradient(135deg, #00C4CC 0%, #5B4BE0 55%, #7D2AE8 100%)`, node: <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size * 0.52, color: "#fff" }}>C</div> };
    if (b.kind === "uizard") return { bg: `linear-gradient(150deg, #8B6BFF, #5A38D8)`, node: <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24"><path d="M3 3h5v11a4 4 0 0 0 8 0V3h5v11a9 9 0 0 1-18 0Z" fill="#fff" /></svg> };
    if (b.slug === "figma") return {
      bg: `linear-gradient(160deg, #ffffff, #F2F2F5)`, node: (
        <svg width={size * 0.42} height={size * 0.42 * (57 / 38)} viewBox="0 0 38 57">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      )
    };
    if (b.slug === "framer") return { bg: `linear-gradient(160deg, #1F6FFF, #0043D6)`, node: <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="#fff"><path d={PATHS.framer} /></svg> };
    return { bg: `linear-gradient(160deg, #1A1A1F, #050507)`, node: <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="#fff"><path d={PATHS.v0} /></svg> };
  })();
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{ position: "absolute", inset: -size * 0.4, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(b.glow, glow * 0.8)}, transparent 60%)`, filter: `blur(${size * 0.1}px)` }} />
      <div style={{ position: "relative", width: size, height: size, borderRadius: R, background: inner.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 ${size * 0.12}px ${size * 0.28}px -${size * 0.05}px rgba(0,0,0,0.55), inset 0 2px 0 ${hexA("#fff", 0.35)}, inset 0 -3px 6px ${hexA("#000", 0.2)}`, overflow: "hidden" }}>
        {/* glossy top highlight */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "42%", background: `linear-gradient(180deg, ${hexA("#fff", 0.22)}, transparent)`, borderRadius: `${R}px ${R}px 40% 40%` }} />
        {inner.node}
      </div>
    </div>
  );
};

const JUDGES = [{ suit: 1, bowtie: 1 }, { glasses: 1 }, { shades: 1 }] as any[];
// ---- contestants, frames (30fps), synced to the VO ----
type Sc = { fi: number; stars: number; f0: number; give: number; golden?: boolean };
const CONTEST: Sc[] = [
  { fi: 0, stars: 1, f0: 92, give: 182 },
  { fi: 1, stars: 1, f0: 205, give: 302 },
  { fi: 2, stars: 2, f0: 322, give: 414 },
  { fi: 3, stars: 2, f0: 435, give: 525 },
  { fi: 4, stars: 3, f0: 542, give: 656, golden: true },
];
const END = 728;
const JUDGE_BTN: [number, number][] = [[222, 1258], [540, 1258], [858, 1258]];
const PANEL_SLOTS: [number, number][] = [[422, 512], [540, 512], [658, 512]];
const CAP_FIX: Record<string, string> = { canvas: "Canva", canva: "Canva", "you": "Uizard", guys: "", youizer: "Uizard", v: "v0", designed: "design", share: "ship" };

const Star: React.FC<{ lit: boolean; size: number; pop?: number }> = ({ lit, size, pop = 0 }) => {
  const pts = "12,2.2 14.9,8.6 22,9.5 16.8,14.3 18.2,21.4 12,17.9 5.8,21.4 7.2,14.3 2,9.5 9.1,8.6";
  const s = size * (1 + pop * 0.18);
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ filter: lit ? `drop-shadow(0 2px 10px ${hexA(GOLD, 0.6)})` : "none" }}>
      <defs><linearGradient id={`p${Math.round(size)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={GOLD_HI} /><stop offset="0.5" stopColor={GOLD} /><stop offset="1" stopColor={GOLD_DK} /></linearGradient></defs>
      <polygon points={pts} fill={lit ? `url(#p${Math.round(size)})` : "transparent"} stroke={lit ? hexA(GOLD_DK, 0.8) : hexA(CREAM, 0.35)} strokeWidth={lit ? 0.5 : 1.3} strokeLinejoin="round" />
    </svg>
  );
};
const Cone: React.FC<{ x: number; base: number; c: string; op: number; spread: number; f: number; ph: number; amp: number }> = ({ x, base, c, op, spread, f, ph, amp }) => (
  <div style={{ position: "absolute", left: x, top: 40, width: spread, height: 1500, transformOrigin: "50% 0%", transform: `translateX(-50%) rotate(${base + Math.sin(f / 36 + ph) * amp}deg)`, background: `linear-gradient(${hexA(c, op)}, transparent 60%)`, clipPath: "polygon(44% 0, 56% 0, 88% 100%, 12% 100%)", filter: "blur(14px)", mixBlendMode: "screen" }} />
);

/* hanging festoon string-lights (background detail) */
const Festoon: React.FC<{ y: number; sag: number; n: number; f: number }> = ({ y, sag, n, f }) => (
  <>{new Array(n).fill(0).map((_, i) => {
    const p = i / (n - 1), x = 40 + p * 1000;
    const dip = Math.sin(p * Math.PI) * sag;
    const on = (i + Math.floor(f / 10)) % 3 === 0;
    return <div key={i} style={{ position: "absolute", left: x, top: y + dip, width: 12, height: 16, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%", background: on ? `radial-gradient(circle at 40% 30%, #fff, ${[GOLD, ROSE, WARM][i % 3]})` : hexA([GOLD, ROSE, WARM][i % 3], 0.4), boxShadow: on ? `0 0 12px 3px ${hexA([GOLD, ROSE, WARM][i % 3], 0.7)}` : "none" }} />;
  })}</>
);

/* THE CLAUDE NINJA — the mascot in ninja garb; dashes in and drop-kicks losers off stage */
const ClaudeNinja: React.FC<{ x: number; y: number; f: number; face: number; kick: number }> = ({ x, y, f, face, kick }) => {
  const bob = Math.sin(f / 3) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, transform: `translate(-50%,-50%) scaleX(${face})`, zIndex: 44 }}>
      {/* speed streaks */}
      <div style={{ position: "absolute", left: 60, top: 10, width: 120, height: 60, borderRadius: "50%", background: hexA("#fff", 0.14 * (1 - kick)), filter: "blur(8px)" }} />
      {/* the mascot in dark ninja tint + mask, lunging on the kick */}
      <div style={{ position: "relative", transform: `translateX(${kick * 34}px) rotate(${kick * 12}deg)` }}>
        <Mascot lf={f} size={168} tint="#2C2C38" heistMask={1} nodAmp={6} nodSpeed={6} />
        {/* red headband band + flapping tails */}
        <div style={{ position: "absolute", left: 42, right: 42, top: 44, height: 13, background: "linear-gradient(#E0475E,#9E1E30)", borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: 30, top: 46, width: 44, height: 8, borderRadius: 4, background: "#C22740", transformOrigin: "right", transform: `rotate(${-18 + Math.sin(f / 4) * 16}deg)` }} />
        <div style={{ position: "absolute", left: 26, top: 58, width: 36, height: 7, borderRadius: 4, background: "#9E1E30", transformOrigin: "right", transform: `rotate(${-6 + Math.sin(f / 4 + 1) * 13}deg)` }} />
      </div>
      {/* kicking leg thrust */}
      {kick > 0.12 && <div style={{ position: "absolute", left: 96, top: 104, width: 96 * kick, height: 20, borderRadius: 10, background: "linear-gradient(90deg,#2C2C38,#14141C)", transformOrigin: "left", transform: `rotate(-6deg)`, boxShadow: `0 0 ${20 * kick}px ${hexA("#fff", 0.3 * kick)}` }} />}
      {/* impact star burst at the foot */}
      {kick > 0.5 && new Array(6).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: 180, top: 104, width: 30, height: 5, background: hexA(CREAM, 0.8 * kick), transformOrigin: "left", transform: `rotate(${-40 + i * 16}deg)` }} />)}
    </div>
  );
};

/* THE CLAUDE HOST — mascot in a bowtie, opens the show and gestures the acts on */
const ClaudeHost: React.FC<{ x: number; f: number; wave: number }> = ({ x, f, wave }) => (
  <div style={{ position: "absolute", left: x, top: 900, transform: "translate(-50%,-50%)", zIndex: 24 }}>
    <div style={{ position: "absolute", left: "50%", top: 20, width: 300, height: 340, transform: "translateX(-50%)", background: `radial-gradient(circle at 50% 8%, ${hexA(GOLD_HI, 0.16)}, transparent 60%)`, mixBlendMode: "screen" }} />
    <Mascot lf={f} size={210} tint="#E7B24C" bowtie={1} suit={1} cheer={wave * 0.7} gaze={2} nodAmp={3} />
    {/* microphone */}
    <div style={{ position: "absolute", left: 150, top: 108, width: 10, height: 46, borderRadius: 5, background: "linear-gradient(#3A3A44,#16161C)", transform: `rotate(${-14}deg)` }} />
    <div style={{ position: "absolute", left: 138, top: 96, width: 30, height: 30, borderRadius: "50%", background: `radial-gradient(circle at 40% 30%, #7A7A88, #1E1E26)`, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
  </div>
);

/* ---- CAPTIONS (house style, readable on the warm stage) ---- */
type W = { w: string; start: number; end: number };
const fix = (w: string) => { const k = w.replace(/[.,!?]/g, "").toLowerCase(); return k in CAP_FIX ? (CAP_FIX[k] ? CAP_FIX[k] + (w.match(/[.,!?]$/)?.[0] || "") : "") : w; };
const LINES: { words: W[]; start: number; end: number }[] = (() => {
  const out: any[] = []; let cur: W[] = [];
  (WORDS as W[]).forEach((w, i) => { if (fix(w.w) === "") return; cur.push(w); const next = (WORDS as W[])[i + 1]; const gap = next ? next.start - w.end : 99; if (cur.length >= 3 || gap > 0.4 || /[.!?]$/.test(w.w)) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; } });
  if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return out;
})();
const Captions: React.FC<{ t: number }> = ({ t }) => {
  const lead = 0.1; let cur = LINES[0];
  for (const ln of LINES) if (t + lead >= ln.start) cur = ln;
  const done = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 1300, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => {
          const on = done || t + lead >= w.start; if (!on) return null;
          const active = !done && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start);
          return <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, lineHeight: 1.12, letterSpacing: "-0.01em", color: active ? GOLD_HI : CREAM, transform: active ? "translateY(-4px) scale(1.05)" : "none", display: "inline-block", WebkitTextStroke: `2px ${hexA("#3A0E14", 0.92)}`, paintOrder: "stroke fill" as any, textShadow: "0 4px 14px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.9)" }}>{fix(w.w).trim()}</span>;
        })}
      </div>
    </div>
  );
};

export const PanelReel: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;

  const open = spring({ frame: f - 4, fps, config: { damping: 20, mass: 0.9 }, durationInFrames: 22 });
  const curtainX = interpolate(open, [0, 1], [0, 96]);
  const stageIn = ramp(f, 8, 28);

  // active (verdict) contestant — flips exactly at each f0
  let ci = -1; for (let i = 0; i < CONTEST.length; i++) if (f >= CONTEST[i].f0) ci = i;
  const cur = ci >= 0 ? CONTEST[ci] : null;
  const brand = cur ? FIELD[cur.fi] : null;
  const nextF0 = cur && ci < CONTEST.length - 1 ? CONTEST[ci + 1].f0 : END + 999;
  const curKickF = cur && ci < CONTEST.length - 1 ? nextF0 - 12 : 1e9;
  const exit = cur ? 1 - ramp(f, curKickF, curKickF + 15) : 1;
  const SP = { damping: 11, mass: 0.9, stiffness: 130 };

  // per-contestant ACT LOGOS (rendered with OVERLAP -> smooth kick transitions)
  const actNodes = CONTEST.map((s, i) => {
    const nf0 = i < CONTEST.length - 1 ? CONTEST[i + 1].f0 : END + 999;
    if (f < s.f0 - 8 || f > nf0 + 10) return null;
    const en = spring({ frame: f - s.f0, fps, config: SP, durationInFrames: 34 });
    const kf = i < CONTEST.length - 1 ? nf0 - 12 : 1e9;
    const kp = ramp(f, kf, kf + 15);
    const pu = interpolate(f - s.f0, [0, 90], [0, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const x = interpolate(en, [0, 1], [440, 0]) - kp * kp * 1300;      // slides in, then launches left
    const y = -Math.sin(kp * Math.PI) * 190 + kp * kp * 300;          // pops up then off
    const rot = interpolate(en, [0, 1], [18, 0]) + kp * -660 + (s.golden ? Math.sin(f / 10) * 3 : 0);
    const scl = interpolate(en, [0, 1], [0.6, (s.golden ? 1.12 : 1) + pu]) * (1 - kp * 0.3);
    const op = Math.min(en * 1.3, 1) * (1 - ramp(f, kf + 9, kf + 15));
    if (op <= 0.002) return null;
    return <div key={i} style={{ position: "absolute", left: "50%", top: 770, transform: `translateX(-50%) translate(${x}px, ${y}px)`, opacity: op, zIndex: 5 }}>
      <div style={{ transform: `rotate(${rot}deg) scale(${scl}) translateY(${Math.sin(f / 22) * 7}px)` }}><Logo b={FIELD[s.fi]} size={196} glow={s.golden ? 0.9 : 0.62} /></div>
    </div>;
  });

  // the Claude ninja that kicks the loser off between acts
  let ninjaNode: React.ReactNode = null;
  for (let i = 0; i < CONTEST.length - 1; i++) {
    const kf = CONTEST[i + 1].f0 - 12;
    if (f >= kf - 17 && f <= kf + 18) {
      const nx = f < kf ? interpolate(f, [kf - 17, kf - 1], [1290, 700], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : interpolate(f, [kf + 1, kf + 18], [700, -250], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const nk = interpolate(f, [kf - 4, kf, kf + 6], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      ninjaNode = <ClaudeNinja x={nx} y={868} f={f} face={-1} kick={nk} />;
    }
  }
  // host (intro)
  const hostOp = interpolate(f, [16, 28, 78, 92], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hostX = interpolate(f, [28, 60, 92], [540, 540, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hostWave = interpolate(f, [44, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // jumbotron name appears shortly after contestant enters
  const nameIn = cur ? ramp(f, cur.f0 + 12, cur.f0 + 26) * exit : 0;

  // how many stars are lit on the panel now (staggered landing at give)
  const litCount = cur ? CONTEST.reduce((_, __) => 0, 0) : 0;
  const starsLit = (k: number) => cur && f >= cur.give + k * 6 ? 1 : 0;
  const panelPop = (k: number) => cur ? spring({ frame: f - (cur.give + k * 6), fps, config: { damping: 9, mass: 0.6 }, durationInFrames: 16 }) : 0;

  // flying stars for the active give (k = 0..stars-1)
  const flyList = cur ? new Array(cur.stars).fill(0).map((_, k) => {
    const land = cur.give + k * 6, launch = land - 16;
    const p = ramp(f, launch, land);
    const active = f >= launch && f <= land + 2;
    const x = interpolate(p, [0, 1], [JUDGE_BTN[k][0], PANEL_SLOTS[k][0]]);
    const y = interpolate(p, [0, 1], [JUDGE_BTN[k][1], PANEL_SLOTS[k][1]]) - Math.sin(p * Math.PI) * 130;
    return { k, active, x, y, p, land };
  }).filter(s => s.active) : [];

  // golden buzzer finale (v0)
  const golden = cur?.golden ? f >= cur.give + 8 : false;
  const goldSlam = cur?.golden ? spring({ frame: f - (cur.give + 8), fps, config: { damping: 8, mass: 0.7 }, durationInFrames: 18 }) : 0;

  const sceneChanged = CONTEST.some(s => Math.abs(f - s.f0) < 8);
  const sweep = CONTEST.reduce((a, s) => Math.max(a, 1 - Math.min(1, Math.abs(f - s.f0) / 8)), 0);

  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 92% at 50% 34%, ${BG_A}, ${BG_B} 72%)` }}>
      {/* ============ WARM BACKDROP ============ */}
      <div style={{ opacity: stageIn }}>
        <div style={{ position: "absolute", left: "50%", top: 240, width: 1340, height: 1340, transform: "translateX(-50%)", background: `radial-gradient(50% 46% at 50% 34%, ${hexA(WARM, 0.42 + (golden ? goldSlam * 0.3 : 0))}, ${hexA(ROSE, 0.2)} 44%, transparent 70%)`, filter: "blur(30px)" }} />
        {/* LED wall rings */}
        <div style={{ position: "absolute", left: "50%", top: 150, width: 960, height: 1120, transform: "translateX(-50%)", borderRadius: 34, overflow: "hidden", opacity: 0.5 }}>
          {new Array(9).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: "50%", top: 120 + i * 120 + Math.sin(f / 28 + i) * 8, width: 60 + i * 100, height: 60 + i * 100, transform: "translateX(-50%)", borderRadius: "50%", border: `2px solid ${hexA(i % 2 ? GOLD : ROSE, 0.12)}` }} />)}
        </div>
        {/* drifting gold sparkles */}
        {new Array(46).fill(0).map((_, i) => {
          const x = seed(i) * 1080, y = (seed(i * 2) * 1400 + f * (0.3 + seed(i * 3) * 0.5)) % 1400 + 120;
          const tw = 0.4 + 0.6 * (Math.sin(f / 8 + i) * 0.5 + 0.5);
          return <div key={"s" + i} style={{ position: "absolute", left: x, top: y, width: 4, height: 4, borderRadius: "50%", background: hexA(GOLD_HI, 0.5 * tw), boxShadow: `0 0 6px ${hexA(GOLD, 0.5 * tw)}`, zIndex: 2 }} />;
        })}
        {/* truss + warm fixtures */}
        <div style={{ position: "absolute", left: 60, right: 60, top: 92, height: 30, borderRadius: 6, background: `linear-gradient(#3A2030, #241422)`, boxShadow: `inset 0 1px 0 ${hexA(CREAM, 0.12)}` }}>
          {new Array(28).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: i * 34.5, top: 3, width: 30, height: 24, borderLeft: `2px solid ${hexA(CREAM, 0.07)}`, transform: "skewX(-22deg)" }} />)}
        </div>
        {[[150, AMBER], [370, WARM], [540, GOLD_HI], [710, WARM], [930, AMBER]].map(([x, c], i) =>
          <div key={i} style={{ position: "absolute", left: (x as number) - 17, top: 118, width: 34, height: 22, borderRadius: "6px 6px 11px 11px", background: `radial-gradient(circle at 50% 28%, #fff, ${c as string} 62%)`, boxShadow: `0 0 22px 6px ${hexA(c as string, 0.6)}` }} />)}
        {/* gold proscenium arch (frames the whole stage) */}
        <div style={{ position: "absolute", left: 96, right: 96, top: 150, bottom: 200, borderRadius: "80px 80px 0 0", border: `3px solid ${hexA(GOLD, 0.35)}`, boxShadow: `inset 0 0 80px ${hexA(GOLD, 0.06)}, 0 0 40px ${hexA(GOLD, 0.1)}` }} />
        {/* two hanging festoon light strings */}
        <Festoon y={172} sag={70} n={22} f={f} />
        <Festoon y={210} sag={54} n={18} f={f + 5} />
        <Cone x={150} base={15} c={AMBER} op={0.16} spread={320} f={f} ph={0} amp={5} />
        <Cone x={370} base={7} c={WARM} op={0.14} spread={280} f={f} ph={1.4} amp={6} />
        <Cone x={540} base={0} c={GOLD_HI} op={0.15} spread={300} f={f} ph={2.6} amp={4} />
        <Cone x={710} base={-7} c={WARM} op={0.14} spread={280} f={f} ph={3.6} amp={6} />
        <Cone x={930} base={-15} c={AMBER} op={0.16} spread={320} f={f} ph={4.7} amp={5} />
      </div>

      {/* warm floor + footlights */}
      <div style={{ opacity: stageIn }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1170, height: 750, background: `linear-gradient(180deg, ${FLOOR}, ${BG_B})` }} />
        <div style={{ position: "absolute", left: "50%", top: 1350, width: 720, height: 200, transform: "translateX(-50%)", borderRadius: "50%", background: `radial-gradient(circle at 50% 18%, ${hexA(WARM, 0.28)}, transparent 62%)`, filter: "blur(6px)", mixBlendMode: "screen" }} />
        {new Array(16).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: 150 + i * 50, top: 1268, width: 16, height: 11, borderRadius: "0 0 9px 9px", background: `radial-gradient(circle at 50% 20%, #fff, ${GOLD})`, boxShadow: `0 -6px 16px 3px ${hexA(GOLD, 0.5)}`, zIndex: 6 }} />)}
      </div>

      {/* cheering crowd */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1088, height: 150, zIndex: 3, opacity: stageIn }}>
        {[0, 1, 2].map((row) => (
          <div key={row} style={{ position: "absolute", left: -30, right: -30, top: row * 30, display: "flex", justifyContent: "space-around", filter: `brightness(${0.5 + row * 0.16})` }}>
            {new Array(24).fill(0).map((_, i) => {
              const cheer = Math.sin(f / (golden ? 4 : 7) + i * 1.3 + row) * 0.5 + 0.5, armUp = cheer > (golden ? 0.4 : 0.55);
              return (
                <div key={i} style={{ position: "relative", width: 44, height: 96 }}>
                  <div style={{ position: "absolute", bottom: 0, left: 8, width: 30, height: 48, borderRadius: "15px 15px 0 0", background: "#2A1428", transform: `translateY(${Math.sin(f / 9 + i) * 2}px)` }} />
                  <div style={{ position: "absolute", bottom: 40, left: 13, width: 20, height: 20, borderRadius: "50%", background: "#2A1428" }} />
                  <div style={{ position: "absolute", bottom: 44, left: 2, width: 8, height: 26, borderRadius: 4, background: "#2A1428", transformOrigin: "bottom", transform: `rotate(${armUp ? -30 : -8}deg)` }} />
                  <div style={{ position: "absolute", bottom: 44, right: 2, width: 8, height: 26, borderRadius: 4, background: "#2A1428", transformOrigin: "bottom", transform: `rotate(${armUp ? 30 : 8}deg)` }} />
                  {seed(i * 3.7 + row) > 0.78 && <div style={{ position: "absolute", bottom: 66, left: 18, width: 5, height: 5, borderRadius: "50%", background: seed(i) > 0.5 ? GOLD_HI : WARM, boxShadow: `0 0 8px 2px ${hexA(seed(i) > 0.5 ? GOLD : WARM, 0.8)}` }} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ============ SAFE-ZONE CONTENT ============ */}
      {/* UP NEXT — shows the remaining contestants */}
      <div style={{ position: "absolute", left: 0, right: 0, top: SAFE_TOP + 4, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: stageIn * (ci < 4 ? 1 : 0.2), zIndex: 23 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: GOLD_HI, textTransform: "uppercase" }}>Up Next</div>
        <div style={{ width: 22, height: 2, background: hexA(GOLD, 0.5) }} />
        {FIELD.map((b, i) => (i > ci ? <div key={b.name} style={{ transform: `translateY(${Math.sin(f / 26 + i) * 3}px)` }}><Logo b={b} size={54} glow={0.3} /></div> : null))}
      </div>

      {/* JUMBOTRON */}
      <div style={{ position: "absolute", left: "50%", top: 336, width: 620, transform: `translateX(-50%)`, opacity: interpolate(stageIn, [0, 1], [0, 1]), zIndex: 6 }}>
        <div style={{ borderRadius: 26, background: `linear-gradient(${CURT_DK}, #3A1622)`, padding: 11, boxShadow: `0 26px 60px -18px rgba(0,0,0,0.55)`, transform: `scale(${golden ? 1 + goldSlam * 0.04 : 1})` }}>
          <div style={{ borderRadius: 18, border: `1.5px solid ${hexA(golden ? GOLD_HI : GOLD, golden ? 1 : 0.7)}`, background: `radial-gradient(120% 100% at 50% 12%, ${hexA(golden ? GOLD : WARM, golden ? 0.4 : 0.3)}, ${hexA("#3A2038", 1)} 66%)`, padding: "28px 0 24px", position: "relative", overflow: "hidden", minHeight: 300 }}>
            <div style={{ position: "absolute", left: "50%", top: 160, width: 380, height: 380, transform: "translate(-50%,-50%)", background: `radial-gradient(circle, ${hexA(GOLD, golden ? 0.34 : 0.2)}, transparent 58%)` }} />
            <div style={{ textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 20, letterSpacing: 6, color: hexA(CREAM, 0.75), textTransform: "uppercase" }}>{ci < 0 ? "5 Design Tools" : "The Verdict"}</div>
            <div style={{ textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 60, color: CREAM, letterSpacing: "-0.02em", marginTop: 8, opacity: ci < 0 ? stageIn : nameIn, transform: `translateY(${(1 - (ci < 0 ? stageIn : nameIn)) * 14}px)`, textShadow: `0 2px 16px ${hexA("#000", 0.4)}` }}>{ci < 0 ? "On Trial" : (brand ? brand.name : " ")}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16 }}>
              {[0, 1, 2].map((i) => <Star key={i} lit={!!(cur && i < cur.stars && starsLit(i))} size={96} pop={cur ? panelPop(i) : 0} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: golden ? 34 : 28, letterSpacing: 6, textTransform: "uppercase", color: golden ? GOLD_HI : (cur && cur.stars >= 2 ? GOLD : CLAY_DK), opacity: cur && f >= cur.give ? Math.min(1, panelPop(cur.stars - 1)) : 0, textShadow: golden ? `0 0 22px ${hexA(GOLD, 0.8)}` : "none" }}>{golden ? "Golden Buzzer" : cur ? (cur.stars === 1 ? "One Star" : cur.stars === 2 ? "Two Stars" : "Three Stars") : ""}</div>
          </div>
        </div>
      </div>

      {/* THE ACTS — per contestant, overlapping so kicks read smoothly */}
      {actNodes}
      {/* THE CLAUDE HOST — opens the show */}
      {f < 94 && <div style={{ opacity: hostOp }}><ClaudeHost x={hostX} f={f} wave={hostWave} /></div>}
      {/* THE CLAUDE NINJA — kicks the loser off between acts */}
      {ninjaNode}

      {/* JUDGES */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1030, zIndex: 8, opacity: stageIn }}>
        {[222, 540, 858].map((x, i) => <div key={i} style={{ position: "absolute", left: x - 140, top: -90, width: 280, height: 380, background: `radial-gradient(circle at 50% 8%, ${hexA(WARM, 0.14)}, transparent 60%)`, mixBlendMode: "screen" }} />)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center", gap: 108, alignItems: "flex-end" }}>
          {JUDGES.map((costume, i) => {
            const gives = cur && i < cur.stars;
            const gp = gives ? interpolate(f, [cur!.give - 12, cur!.give - 4, cur!.give + 30], [0, 1, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            const cheerV = golden ? 0.8 : (gives && f >= cur!.give ? 0.74 : 0);
            const stern = cur && !gives ? interpolate(f, [cur.give - 30, cur.give - 6], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * exit : 0;
            const leap = golden ? Math.abs(Math.sin(f / 5 + i)) * 16 : 0;
            return <div key={i} style={{ position: "relative", height: 178, overflow: "visible", display: "flex", alignItems: "flex-start", transform: `translateY(${-leap}px)` }}>
              {gp > 0.01 && <div style={{ position: "absolute", left: "50%", top: 30, width: 240, height: 240, transform: "translateX(-50%)", borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD_HI, 0.5 * gp)}, transparent 60%)`, filter: "blur(6px)", zIndex: -1 }} />}
              <div style={{ height: 178, overflow: "hidden", filter: `drop-shadow(0 -4px ${10 + gp * 26}px ${hexA(GOLD, gp * 0.85)})` }}>
                <Mascot lf={f + i * 13} size={224} gaze={0} cheer={cheerV} stern={stern} nodAmp={golden ? 5 : 2.4} {...costume} />
              </div>
            </div>;
          })}
        </div>
        {/* table top */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 176, height: 96, background: `linear-gradient(180deg, ${FLOOR_HI}, ${FLOOR})`, clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0% 100%)", boxShadow: `inset 0 2px 0 ${hexA(CREAM, 0.18)}` }} />
        {/* BUZZER BUTTONS */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 182, display: "flex", justifyContent: "center", gap: 108, zIndex: 9 }}>
          {JUDGES.map((_, i) => {
            const gives = cur && i < cur.stars;
            const lit = !!(gives && f >= cur!.give - 12);
            const press = gives ? interpolate(f, [cur!.give - 15, cur!.give - 10, cur!.give - 2], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            const starHidden = flyList.some(s => s.k === i); // its star is flying
            return <div key={i} style={{ width: 210, display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 92, height: 92, transform: `translateY(${press * 8}px) scale(${1 - press * 0.1})` }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `linear-gradient(#2A1424, #180C18)`, boxShadow: `0 6px 14px rgba(0,0,0,0.5)` }} />
                <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: lit ? `radial-gradient(circle at 40% 32%, ${GOLD_HI}, ${GOLD} 52%, ${GOLD_DK})` : `radial-gradient(circle at 40% 32%, #6A3450, #3A1C30)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: lit ? `0 0 26px 6px ${hexA(GOLD, 0.75)}, inset 0 3px 8px ${hexA("#fff", 0.5)}` : `inset 0 3px 8px ${hexA("#fff", 0.12)}, inset 0 -4px 8px rgba(0,0,0,0.5)` }}>
                  <Star lit={!!(lit && f >= cur!.give && !starHidden)} size={54} />
                </div>
              </div>
            </div>;
          })}
        </div>
        {/* front panel */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 272, height: 640, background: `linear-gradient(180deg, ${CURT}, ${CURT_DK})`, boxShadow: `0 -12px 40px -10px rgba(0,0,0,0.4)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 4, background: `linear-gradient(90deg, ${GOLD_DK}, ${GOLD_HI}, ${GOLD_DK})` }} />
          <div style={{ position: "absolute", left: 60, right: 60, top: 22, height: 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${hexA(GOLD_HI, 0.7)}, transparent)`, boxShadow: `0 0 16px ${hexA(GOLD, 0.6)}` }} />
        </div>
      </div>

      {/* FLYING STARS */}
      {flyList.map((s) => (
        <div key={s.k} style={{ position: "absolute", left: s.x, top: s.y, transform: "translate(-50%,-50%)", zIndex: 30 }}>
          {new Array(6).fill(0).map((_, m) => {
            const tp = Math.max(0, s.p - m * 0.06);
            const tx = interpolate(tp, [0, 1], [JUDGE_BTN[s.k][0], PANEL_SLOTS[s.k][0]]) - s.x;
            const ty = interpolate(tp, [0, 1], [JUDGE_BTN[s.k][1], PANEL_SLOTS[s.k][1]]) - Math.sin(tp * Math.PI) * 130 - s.y;
            return <div key={m} style={{ position: "absolute", left: tx, top: ty, width: 14 - m * 1.6, height: 14 - m * 1.6, borderRadius: "50%", background: hexA(GOLD_HI, 0.5 - m * 0.07), transform: "translate(-50%,-50%)", filter: "blur(1px)" }} />;
          })}
          <div style={{ filter: `drop-shadow(0 0 24px ${hexA(GOLD, 0.95)})`, transform: `rotate(${s.p * 600}deg) scale(${1 + Math.sin(s.p * Math.PI) * 0.3})` }}><Star lit size={92} /></div>
        </div>
      ))}

      {/* ===== GOLDEN BUZZER FINALE (v0) — light show + falling confetti ===== */}
      {cur?.golden && f >= cur.give - 6 && (() => {
        const g = cur.give;
        const burst = ramp(f, g, g + 6);
        const wash = interpolate(f, [g, g + 5, g + 22, g + 120], [0, 0.42, 0.16, 0.1], { extrapolateRight: "clamp" });
        return <>
          {/* screen-wide gold wash */}
          <AbsoluteFill style={{ background: `radial-gradient(60% 50% at 50% 42%, ${hexA(GOLD_HI, wash)}, ${hexA(GOLD, wash * 0.5)} 46%, transparent 74%)`, zIndex: 38, pointerEvents: "none", mixBlendMode: "screen" }} />
          {/* radiant rays from behind the winner */}
          <div style={{ position: "absolute", left: "50%", top: 880, transform: `translate(-50%,-50%) scale(${0.4 + burst})`, opacity: burst * (1 - ramp(f, g + 30, g + 90)) * 0.8, zIndex: 39 }}>
            {new Array(28).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 30, height: 900, transformOrigin: "50% 0", transform: `rotate(${i * (360 / 28) + f * 0.6}deg)`, background: `linear-gradient(${hexA(GOLD_HI, 0.5)}, transparent 60%)`, clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)" }} />)}
          </div>
          {/* GOLD CONFETTI + STREAMERS raining from the top */}
          {new Array(140).fill(0).map((_, i) => {
            const start = g - 6 + seed(i) * 10;
            const p = ramp(f, start, start + 70 + seed(i * 5) * 50);
            if (p <= 0 || p >= 1) return null;
            const x = seed(i * 2) * 1080 + Math.sin(f / 12 + i) * 20;
            const y = -40 + p * 2100;
            const streamer = seed(i * 7) > 0.7;
            const c = [GOLD, GOLD_HI, CREAM, "#F0A64C", ROSE][i % 5];
            return <div key={i} style={{ position: "absolute", left: x, top: y, width: streamer ? 5 : 10, height: streamer ? 34 : 16, background: c, borderRadius: streamer ? 3 : 2, transform: `rotate(${seed(i) * 360 + f * (streamer ? 3 : 8)}deg)`, opacity: 0.95, zIndex: 41, boxShadow: `0 0 5px ${hexA(c, 0.5)}` }} />;
          })}
        </>;
      })()}

      {/* ===== THE CLAUDE NINJA salutes the winner during the golden buzzer ===== */}
      {cur?.golden && f >= cur.give + 2 && f < cur.give + 44 && (() => {
        const g = cur.give;
        const nx = f < g + 12 ? interpolate(f, [g + 2, g + 12], [1260, 820], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 820;
        const hop = Math.abs(Math.sin(f / 5)) * 20;
        return <div style={{ transform: `translateY(${-hop}px)` }}><ClaudeNinja x={nx} y={1030} f={f} face={1} kick={0} /></div>;
      })()}

      {/* ============ CURTAINS ============ */}
      {[0, 1].map((side) => {
        const left = side === 0;
        return (
          <div key={side} style={{ position: "absolute", top: 0, bottom: 0, [left ? "left" : "right"]: 0, width: "56%", transform: `translateX(${left ? -curtainX : curtainX}%)`, zIndex: 20 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 150, background: `linear-gradient(180deg, ${CURT_HI}, ${CURT_DK})` }} />
            {new Array(9).fill(0).map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, [left ? "left" : "right"]: `${i * 11}%`, width: "12%", background: `linear-gradient(90deg, ${i % 2 ? CURT_HI : CURT}, ${CURT_DK})`, boxShadow: `inset ${left ? "-" : ""}8px 0 22px rgba(0,0,0,0.35)` }} />)}
            <div style={{ position: "absolute", top: 0, bottom: 0, [left ? "right" : "left"]: 0, width: 10, background: `linear-gradient(${GOLD_DK}, ${GOLD_HI}, ${GOLD_DK})` }} />
            <div style={{ position: "absolute", top: 420, [left ? "right" : "left"]: 24, width: 30, height: 46, borderRadius: "0 0 15px 15px", background: `linear-gradient(${GOLD_HI}, ${GOLD_DK})`, boxShadow: `0 4px 10px rgba(0,0,0,0.35)` }} />
          </div>
        );
      })}
      {/* DRAMATIC REVEAL: title slams on the closed curtain, sparkle burst, then a flash as it opens */}
      {f < 34 && (() => {
        const slam = spring({ frame: f, fps, config: { damping: 9, mass: 0.7 }, durationInFrames: 20 });
        const titleO = interpolate(f, [0, 3, 14, 22], [0, 1, 1, 0], { extrapolateRight: "clamp" });
        const shim = ((f * 22) % 640) - 160;
        return <div style={{ position: "absolute", left: 0, right: 0, top: 820, textAlign: "center", zIndex: 22, opacity: titleO }}>
          <div style={{ position: "relative", display: "inline-block", transform: `scale(${interpolate(slam, [0, 1], [1.5, 1])}) rotate(${interpolate(slam, [0, 1], [-6, 0])}deg)` }}>
            {/* sparkle burst */}
            {new Array(12).fill(0).map((_, i) => { const a = (i / 12) * Math.PI * 2, r = slam * 150; return <div key={i} style={{ position: "absolute", left: `calc(50% + ${Math.cos(a) * r}px)`, top: `calc(50% + ${Math.sin(a) * r}px)`, width: 8, height: 8, borderRadius: "50%", background: GOLD_HI, opacity: (1 - slam) * 0.9, boxShadow: `0 0 8px ${GOLD}` }} />; })}
            <div style={{ position: "relative", overflow: "hidden", padding: "16px 40px", borderRadius: 18, background: `linear-gradient(${CURT_DK}, #2A0E18)`, border: `3px solid ${GOLD}`, boxShadow: `0 0 50px ${hexA(GOLD, 0.6)}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, letterSpacing: 2, color: GOLD_HI, textTransform: "uppercase", textShadow: `0 4px 20px rgba(0,0,0,0.6)` }}>
              The Panel
              <div style={{ position: "absolute", top: 0, bottom: 0, left: shim, width: 130, background: `linear-gradient(90deg, transparent, ${hexA("#fff", 0.4)}, transparent)`, transform: "skewX(-16deg)" }} />
            </div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: CREAM, textTransform: "uppercase", marginTop: 14, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>5 AI Design Tools, Judged</div>
          </div>
        </div>;
      })()}
      {/* white flash as the curtains burst open */}
      {f >= 16 && f < 30 && <AbsoluteFill style={{ background: hexA("#fff", interpolate(f, [16, 20, 30], [0, 0.5, 0], { extrapolateRight: "clamp" })), zIndex: 23, pointerEvents: "none" }} />}
      {/* scene-change light sweep */}
      {sweep > 0.02 && <div style={{ position: "absolute", left: `${-30 + sweep * 130}%`, top: 0, bottom: 0, width: 240, background: `linear-gradient(90deg, transparent, ${hexA(CREAM, 0.16)}, transparent)`, transform: "skewX(-14deg)", zIndex: 26, mixBlendMode: "screen" }} />}

      {/* HUD */}
      <div style={{ position: "absolute", left: 54, top: 150, display: "flex", alignItems: "center", gap: 12, zIndex: 24, opacity: stageIn }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: GOLD_HI }}>The Panel</div>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: hexA(CREAM, 0.5) }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: hexA(CREAM, 0.7) }}>@nocodealex</div>
      </div>

      <Captions t={t} />

      {/* ============ AUDIO ============ */}
      <Audio src={staticFile("ebm_bed.wav")} volume={0.15} />
      <Audio src={staticFile("vo_design.wav")} />
      {CONTEST.map((s) => <React.Fragment key={s.f0}>
        <Sequence from={s.give - 16} durationInFrames={18}><Audio src={staticFile("sfx/lib_whoosh_fast.wav")} volume={0.5} /></Sequence>
        <Sequence from={s.give - 1} durationInFrames={30}><Audio src={staticFile("sfx/sparkle.wav")} volume={0.7} /></Sequence>
      </React.Fragment>)}
      <Sequence from={CONTEST[4].give + 8} durationInFrames={40}><Audio src={staticFile("sfx/lib_cinematic_hit.wav")} volume={0.7} /></Sequence>
      <Sequence from={CONTEST[4].give + 10} durationInFrames={60}><Audio src={staticFile("sfx/c_1up.wav")} volume={0.6} /></Sequence>
    </AbsoluteFill>
  );
};

export const PANEL_DUR = END;
