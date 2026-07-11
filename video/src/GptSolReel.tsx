import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_sol.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, reframe(judge), arena(tournament), outlast(machine), cta
const L = [0.0, 9.22, 19.70, 30.84, 38.12, 44.88];
const Lf = L.map(fr);
const CUT = 47.7;
const CLOCK_START = CUT - 3.6;
const BURST = CUT + 1;

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
const SolMascot: React.FC<{ lf: number; size?: number; cheer?: number; gaze?: number; think?: number; point?: number; shock?: number }> = ({ lf, size = 150, cheer = 0, gaze = 0, think = 0, point = 0, shock = 0 }) => {
  const CHATGREEN = "#10A37F";
  const t = lf / 30;
  // idle: core breathing + gentle vertical bob; cheer adds a springy bounce
  const breathe = 1 + Math.sin(t * 2.2) * 0.02;
  const bob = Math.sin(t * 1.8) * (size * 0.012) - cheer * Math.abs(Math.sin(t * 6)) * (size * 0.05);
  // corona: slow rotation + pulsing rays; shock flares them out
  const spin = (lf * 0.55) % 360;
  const rayPulse = 1 + Math.sin(t * 3.1) * 0.08 + cheer * 0.06 + shock * 0.26;
  const bloom = 0.5 + Math.sin(t * 2.2) * 0.08 + cheer * 0.28 + shock * 0.2;
  // face
  const blink = (lf % 150) < 6 && shock < 0.3 ? 0.12 : 1;
  const eyeH = (size * 0.10) * blink * (shock > 0.4 ? 1.9 : 1);
  const eyeW = size * 0.072 * (shock > 0.4 ? 1.25 : 1);
  const gx = interpolate(gaze, [-1, 1], [-size * 0.03, size * 0.03]);
  const smile = 0.5 + cheer * 0.5; // mouth curvature
  const NR = size * 0.32; // core radius (px, core centered)
  const cx = size / 2, cy = size / 2 + bob;

  // rays geometry (chunky rounded triangles around the core)
  const rayCount = 11;
  const rays = Array.from({ length: rayCount }, (_, k) => {
    const a = (k / rayCount) * Math.PI * 2;
    const wob = 1 + Math.sin(t * 3.1 + k * 1.3) * 0.10; // each ray breathes out of phase
    const inner = NR * 1.02;
    const outer = NR * (1.44 + shock * 0.22) * rayPulse * wob;
    const halfW = NR * 0.20;
    const tx = cx + Math.cos(a) * outer, ty = cy + Math.sin(a) * outer;
    const b1x = cx + Math.cos(a - 0.18) * inner, b1y = cy + Math.sin(a - 0.18) * inner;
    const b2x = cx + Math.cos(a + 0.18) * inner, b2y = cy + Math.sin(a + 0.18) * inner;
    return { tx, ty, b1x, b1y, b2x, b2y, halfW };
  });

  // arm poses (nubs). point -> right arm extends out+up; think -> hand up in front of face
  const armLen = size * 0.16;
  const rArmAng = point > 0 ? -0.5 : 0.35 + Math.sin(t * 1.8) * 0.12;
  const rArmReach = point > 0 ? armLen * 1.9 : armLen;
  const lArmAng = cheer > 0 ? -1.1 - Math.abs(Math.sin(t * 6)) * 0.3 : 2.75 + Math.sin(t * 1.8 + 1) * 0.12;
  const lArmReach = cheer > 0 ? armLen * 1.5 : armLen;
  const legSpread = size * 0.10;
  // thinking: a hand nub rests at the chin, in FRONT of the core (drawn later)
  const thinkTap = think > 0 ? 1 + Math.sin(t * 4) * 0.06 : 0;
  const thinkHandX = cx + NR * 0.30;
  const thinkHandY = cy + NR * 0.52 - think * Math.abs(Math.sin(t * 2)) * (size * 0.01);

  return (
    <div style={{ width: size, height: size, position: "relative", display: "inline-block", overflow: "visible" }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={`solcore${size}`} cx="42%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#FFF6DA" />
            <stop offset="42%" stopColor="#F5C542" />
            <stop offset="100%" stopColor="#E08A2E" />
          </radialGradient>
          <radialGradient id={`solbloom${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBD65C" stopOpacity={0.55} />
            <stop offset="55%" stopColor="#F2A93C" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#F2A93C" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`solteal${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor={CHATGREEN} stopOpacity={0} />
            <stop offset="92%" stopColor={CHATGREEN} stopOpacity={0.34} />
            <stop offset="100%" stopColor={CHATGREEN} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* soft outer bloom */}
        <circle cx={cx} cy={cy} r={NR * 2.35} fill={`url(#solbloom${size})`} opacity={bloom} />

        {/* limbs sit behind the core so only nubs show */}
        <g stroke={AMBER} strokeWidth={size * 0.05} strokeLinecap="round">
          <line x1={cx - legSpread} y1={cy + NR * 0.82} x2={cx - legSpread} y2={cy + NR * 1.28} />
          <line x1={cx + legSpread} y1={cy + NR * 0.82} x2={cx + legSpread} y2={cy + NR * 1.28} />
        </g>
        <circle cx={cx - legSpread} cy={cy + NR * 1.34} r={size * 0.045} fill={AMBER} />
        <circle cx={cx + legSpread} cy={cy + NR * 1.34} r={size * 0.045} fill={AMBER} />
        <g stroke={AMBER} strokeWidth={size * 0.052} strokeLinecap="round">
          <line x1={cx - NR * 0.85} y1={cy + NR * 0.15} x2={cx - NR * 0.85 + Math.cos(lArmAng) * lArmReach} y2={cy + NR * 0.15 + Math.sin(lArmAng) * lArmReach} />
          <line x1={cx + NR * 0.85} y1={cy + NR * 0.15} x2={cx + NR * 0.85 + Math.cos(rArmAng) * rArmReach} y2={cy + NR * 0.15 + Math.sin(rArmAng) * rArmReach} />
        </g>
        <circle cx={cx - NR * 0.85 + Math.cos(lArmAng) * lArmReach} cy={cy + NR * 0.15 + Math.sin(lArmAng) * lArmReach} r={size * 0.05} fill={GOLD} />
        <circle cx={cx + NR * 0.85 + Math.cos(rArmAng) * rArmReach} cy={cy + NR * 0.15 + Math.sin(rArmAng) * rArmReach} r={size * 0.05} fill={GOLD} />

        {/* corona rays (rotate slowly around center) */}
        <g transform={`rotate(${spin} ${cx} ${cy})`}>
          {rays.map((r, k) => (
            <path key={k}
              d={`M ${r.b1x} ${r.b1y} L ${r.tx} ${r.ty} L ${r.b2x} ${r.b2y} Z`}
              fill="#F3B93E" stroke="#F3B93E" strokeWidth={r.halfW} strokeLinejoin="round" strokeLinecap="round"
              opacity={0.92} />
          ))}
        </g>

        {/* thin teal-green outer rim glow (ChatGPT signal) */}
        <circle cx={cx} cy={cy} r={NR * 1.12} fill={`url(#solteal${size})`} />

        {/* CORE */}
        <g transform={`translate(${cx} ${cy}) scale(${breathe}) translate(${-cx} ${-cy})`}>
          <circle cx={cx} cy={cy} r={NR} fill={`url(#solcore${size})`} stroke="#E9982B" strokeWidth={size * 0.012} />
          <circle cx={cx} cy={cy} r={NR * 0.985} fill="none" stroke={CHATGREEN} strokeWidth={size * 0.008} opacity={0.32} />
          <ellipse cx={cx - NR * 0.28} cy={cy - NR * 0.42} rx={NR * 0.42} ry={NR * 0.24} fill="#FFFBE9" opacity={0.5} />
          <ellipse cx={cx - NR * 0.46} cy={cy + NR * 0.18} rx={NR * 0.16} ry={NR * 0.11} fill="#F2795A" opacity={0.35} />
          <ellipse cx={cx + NR * 0.46} cy={cy + NR * 0.18} rx={NR * 0.16} ry={NR * 0.11} fill="#F2795A" opacity={0.35} />
          <rect x={cx - NR * 0.34 - eyeW / 2 + gx} y={cy - NR * 0.14 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#4A2B0E" />
          <rect x={cx + NR * 0.34 - eyeW / 2 + gx} y={cy - NR * 0.14 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#4A2B0E" />
          {blink > 0.5 && shock < 0.4 && <>
            <circle cx={cx - NR * 0.34 + gx + eyeW * 0.2} cy={cy - NR * 0.14 - eyeH * 0.2} r={eyeW * 0.16} fill="#FFF6DA" />
            <circle cx={cx + NR * 0.34 + gx + eyeW * 0.2} cy={cy - NR * 0.14 - eyeH * 0.2} r={eyeW * 0.16} fill="#FFF6DA" />
          </>}
          {shock > 0.4 ? (
            <ellipse cx={cx + gx} cy={cy + NR * 0.42} rx={NR * 0.15} ry={NR * 0.19} fill="#5A2E0C" />
          ) : (
            <path d={`M ${cx - NR * (0.22 + smile * 0.12) + gx} ${cy + NR * 0.34} Q ${cx + gx} ${cy + NR * (0.5 + smile * 0.28)} ${cx + NR * (0.22 + smile * 0.12) + gx} ${cy + NR * 0.34}`}
              fill="none" stroke="#5A2E0C" strokeWidth={size * 0.02} strokeLinecap="round" />
          )}
        </g>

        {/* thinking hand: forearm curves up from the side to rest a nub at the chin (in front) */}
        {think > 0 && <g opacity={Math.min(1, think)}>
          <path d={`M ${cx + NR * 1.0} ${cy + NR * 0.6} Q ${cx + NR * 0.9} ${cy + NR * 1.05} ${thinkHandX} ${thinkHandY}`}
            fill="none" stroke={AMBER} strokeWidth={size * 0.052} strokeLinecap="round" />
          <circle cx={thinkHandX} cy={thinkHandY} r={size * 0.055 * thinkTap} fill={GOLD} />
        </g>}
      </svg>
    </div>
  );
};

// ============================== LUNA (cheap moon sidekick) ==============================
const LunaMascot: React.FC<{ lf: number; size?: number; cheer?: number; gaze?: number }> = ({ lf, size = 90, cheer = 0, gaze = 0 }) => {
  const t = lf / 30;
  const bob = Math.sin(t * 2.6) * (size * 0.02) - cheer * Math.abs(Math.sin(t * 7)) * (size * 0.05);
  const blink = (lf % 130) < 6 ? 0.12 : 1;
  const eyeH = size * 0.11 * blink;
  const eyeW = size * 0.075;
  const gx = interpolate(gaze, [-1, 1], [-size * 0.028, size * 0.028]);
  const smile = 0.5 + cheer * 0.5;
  const R = size * 0.34;
  const cx = size / 2, cy = size / 2 + bob;

  // orbiting sparkles (fast = signals cheap/zippy)
  const sparks = Array.from({ length: 3 }, (_, k) => {
    const a = t * 3.4 + (k / 3) * Math.PI * 2 + seed(k) * 6;
    const rad = R * (1.5 + k * 0.14);
    return { x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.85, s: (size * 0.05) * (0.7 + Math.abs(Math.sin(t * 6 + k)) * 0.6) };
  });

  return (
    <div style={{ width: size, height: size, position: "relative", display: "inline-block", overflow: "visible" }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={`lunaface${size}`} cx="40%" cy="36%" r="75%">
            <stop offset="0%" stopColor="#F6FAFF" />
            <stop offset="55%" stopColor="#E8EEF5" />
            <stop offset="100%" stopColor="#AEB9CC" />
          </radialGradient>
          <radialGradient id={`lunaglow${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CBD8EA" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#CBD8EA" stopOpacity={0} />
          </radialGradient>
          <clipPath id={`lunaclip${size}`}>
            <circle cx={cx} cy={cy} r={R} />
          </clipPath>
        </defs>

        {/* cool glow */}
        <circle cx={cx} cy={cy} r={R * 1.7} fill={`url(#lunaglow${size})`} />

        {/* tiny stub arms */}
        <g stroke="#AEB9CC" strokeWidth={size * 0.05} strokeLinecap="round">
          <line x1={cx - R * 0.9} y1={cy + R * 0.2} x2={cx - R * 1.25} y2={cy + R * (cheer > 0 ? -0.25 : 0.35)} />
          <line x1={cx + R * 0.9} y1={cy + R * 0.2} x2={cx + R * 1.25} y2={cy + R * (cheer > 0 ? -0.25 : 0.35)} />
        </g>

        {/* moon body */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#lunaface${size})`} stroke="#9AA6BC" strokeWidth={size * 0.012} />
        {/* crescent shadow: offset darker disc clipped to the moon */}
        <g clipPath={`url(#lunaclip${size})`}>
          <circle cx={cx + R * 0.55} cy={cy - R * 0.12} r={R * 1.02} fill="#9EABC2" opacity={0.55} />
          <circle cx={cx - R * 0.28} cy={cy + R * 0.34} r={R * 0.12} fill="#C4CEDD" opacity={0.6} />
          <circle cx={cx - R * 0.42} cy={cy - R * 0.02} r={R * 0.08} fill="#C4CEDD" opacity={0.5} />
        </g>

        {/* face on the LIT side (left) */}
        <ellipse cx={cx - R * 0.30} cy={cy + R * 0.28} rx={R * 0.14} ry={R * 0.09} fill="#B9A0C4" opacity={0.3} />
        <rect x={cx - R * 0.44 - eyeW / 2 + gx} y={cy - R * 0.06 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#33405A" />
        <rect x={cx - R * 0.02 - eyeW / 2 + gx} y={cy - R * 0.06 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#33405A" />
        <path d={`M ${cx - R * 0.42 + gx} ${cy + R * 0.24} Q ${cx - R * 0.22 + gx} ${cy + R * (0.36 + smile * 0.22)} ${cx - R * 0.02 + gx} ${cy + R * 0.24}`}
          fill="none" stroke="#33405A" strokeWidth={size * 0.022} strokeLinecap="round" />

        {/* orbiting sparkles (fast) */}
        {sparks.map((s, k) => (
          <path key={k} transform={`translate(${s.x} ${s.y})`}
            d={`M 0 ${-s.s} L ${s.s * 0.28} ${-s.s * 0.28} L ${s.s} 0 L ${s.s * 0.28} ${s.s * 0.28} L 0 ${s.s} L ${-s.s * 0.28} ${s.s * 0.28} L ${-s.s} 0 L ${-s.s * 0.28} ${-s.s * 0.28} Z`}
            fill={k === 1 ? GOLD : "#DCE6F2"} opacity={0.9} />
        ))}
      </svg>
    </div>
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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0 }) => {
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
        {/* zuck tee + pale wash + optional gold chain */}
        {zuck > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.14)" />
          <rect x={34} y={106} width={132} height={40} fill="#B7BAC0" />
          <rect x={34} y={106} width={132} height={6} fill="#9DA1A8" />
          <rect x={34} y={140} width={132} height={6} fill="#A6AAB1" />
          <rect x={80} y={106} width={40} height={6} fill="#8C9098" />
          <rect x={86} y={112} width={28} height={5} fill="#8C9098" />
          <rect x={94} y={117} width={12} height={4} fill="#8C9098" />
        </>}
        {zuckChain > 0 && <>
          <rect x={78} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={84} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={92} y={119} width={16} height={4} fill="#E7B24C" />
          <rect x={106} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={114} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={98} y={121} width={4} height={4} fill="#F0CB63" />
        </>}
        {/* alexandr wang: black crew tee */}
        {wang > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.10)" />
          <rect x={34} y={106} width={132} height={40} fill="#2A2A32" />
          <rect x={34} y={106} width={132} height={6} fill="#1E1E24" />
          <rect x={34} y={140} width={132} height={6} fill="#232329" />
          <rect x={80} y={106} width={40} height={6} fill="#3A3A44" />
          <rect x={86} y={112} width={28} height={5} fill="#3A3A44" />
          <rect x={94} y={117} width={12} height={4} fill="#3A3A44" />
        </>}
        {/* bikini */}
        {bikini > 0 && <>
          <rect x={44} y={110} width={112} height={5} fill="#E23B86" />
          <rect x={44} y={114} width={112} height={13} fill="#FF4FA3" />
          <polygon points="60,114 80,114 70,130" fill="#FF4FA3" /><polygon points="120,114 140,114 130,130" fill="#FF4FA3" />
          <rect x={80} y={138} width={40} height={12} fill="#FF4FA3" />
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
        {/* business suit + tie */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" />
          <rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" />
          <polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {/* dinosaur costume: green belly + tail */}
        {dino > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#5FA85A" />
          <rect x={34} y={106} width={132} height={6} fill="#4A8C46" />
          <rect x={60} y={130} width={80} height={10} fill="#7CC276" />
          <polygon points="166,116 208,106 208,146 166,142" fill="#5FA85A" /><polygon points="188,108 196,102 196,110" fill="#3E7A3A" /><polygon points="198,110 206,105 206,113" fill="#3E7A3A" />
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
        {/* zuck hair: signature straight fringe */}
        {zuck > 0 && <>
          <rect x={30} y={40} width={140} height={14} fill="#5A4632" />
          <rect x={30} y={40} width={140} height={5} fill="#4A3927" />
          <rect x={30} y={54} width={14} height={16} fill="#5A4632" />
          <rect x={156} y={54} width={14} height={16} fill="#5A4632" />
          {zuckCurly > 0 ? <>
            <rect x={40} y={54} width={120} height={10} fill="#5A4632" />
            <rect x={44} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={68} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={92} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={116} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={140} y={64} width={16} height={6} fill="#5A4632" />
          </> : <>
            <rect x={40} y={54} width={120} height={12} fill="#5A4632" />
            <rect x={58} y={66} width={18} height={3} fill="#5A4632" />
            <rect x={124} y={66} width={18} height={3} fill="#5A4632" />
          </>}
          <rect x={96} y={54} width={8} height={6} fill="#4A3927" />
          <rect x={46} y={56} width={40} height={3} fill="#6B5540" />
        </>}
        {/* alexandr wang: short black hair */}
        {wang > 0 && <>
          <rect x={32} y={38} width={136} height={14} fill="#1C1C22" />
          <rect x={32} y={38} width={136} height={5} fill="#0F0F14" />
          <rect x={32} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={156} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={44} y={52} width={38} height={9} fill="#1C1C22" />
          <rect x={82} y={52} width={46} height={7} fill="#1C1C22" />
          <rect x={128} y={52} width={30} height={9} fill="#1C1C22" />
          <rect x={58} y={61} width={22} height={4} fill="#1C1C22" />
          <rect x={102} y={59} width={16} height={4} fill="#1C1C22" />
          <rect x={88} y={50} width={22} height={4} fill="#2C2C36" />
        </>}
        {/* girl long hair */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={30} y={36} width={140} height={16} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={7} fill="#6E4A2C" />
        </>}
        {/* dino head spikes */}
        {dino > 0 && <>
          <polygon points="66,44 78,24 90,44" fill="#3E7A3A" /><polygon points="90,44 102,20 114,44" fill="#3E7A3A" /><polygon points="114,44 126,24 138,44" fill="#3E7A3A" />
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
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5), transform: "rotate(8deg)" }} />}
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

// ---------------- the PYRAMID set (shared by scenes) ----------------
const PYR = { baseY: 640, midY: 470, topY: 300, cx: 506 };
const Pyramid: React.FC<{ lf: number; lit?: number[]; gateGlow?: number; assemble?: boolean }> = ({ lf, lit = [1, 1, 1], gateGlow = 0, assemble = false }) => {
  const lv = (_i: number) => 1;
  const W = [720, 500, 300];
  const Y = [PYR.baseY, PYR.midY, PYR.topY];
  return (<>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: PYR.cx - (W[i] / 2), top: Y[i], width: W[i], height: 115, transform: `scale(${lv(i)})`, opacity: Math.min(1, lv(i) * 1.2) * (0.45 + lit[i] * 0.55), borderRadius: 14, background: `linear-gradient(180deg, ${["#31415F", "#3A4E74", "#44598A"][i]}, ${["#243149", "#2B3A57", "#334263"][i]})`, border: "2.5px solid rgba(150,175,220,0.4)", boxShadow: lit[i] > 0.6 ? "0 18px 40px -14px rgba(10,16,34,0.7), inset 0 2px 0 rgba(255,255,255,0.1)" : "inset 0 0 40px rgba(0,0,0,0.4)" }}>
        {/* stone seams */}
        {Array.from({ length: 3 }, (_, k) => <div key={k} style={{ position: "absolute", left: `${20 + k * 25}%`, top: k % 2 ? 8 : 62, width: 3, height: 50, background: "rgba(10,16,30,0.35)", borderRadius: 2 }} />)}
      </div>
    ))}
    {/* the GATES between levels */}
    {[0, 1].map((g) => {
      const gy = g === 0 ? 608 : 440;
      const gw = g === 0 ? 150 : 120;
      return (
        <div key={g} style={{ position: "absolute", left: PYR.cx - gw / 2, top: gy - 12, width: gw, height: 22, borderRadius: 8, background: gateGlow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#1B2740", border: `2.5px solid ${gateGlow > 0.05 ? "#F6E4A0" : "rgba(231,178,76,0.5)"}`, boxShadow: gateGlow > 0.05 ? `0 0 ${18 + gateGlow * 26}px ${GOLD}` : `0 0 8px rgba(231,178,76,0.3)`, zIndex: 12 }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-52%)", fontSize: 13, opacity: 0.9 }}>{gateGlow > 0.05 ? "🔓" : "🔒"}</div>
        </div>
      );
    })}
  </>);
};

// job card (the thing that moves through the pyramid)
const JobCard: React.FC<{ label?: string; hot?: number; w?: number }> = ({ label = "job", hot = 0, w = 92 }) => (
  <div style={{ width: w, borderRadius: 10, background: hot > 0.5 ? "rgba(196,74,58,0.2)" : PAPER, border: `2.5px solid ${hot > 0.5 ? "#E58072" : "#C9BCA4"}`, padding: "7px 0 5px", textAlign: "center", boxShadow: hot > 0.5 ? `0 0 18px ${RED}88` : "0 10px 22px -8px rgba(10,16,34,0.5)" }}>
    <div style={{ fontSize: 24, lineHeight: 1 }}>{hot > 0.5 ? "🔥" : "📋"}</div>
    <div style={{ fontFamily: mono, fontSize: 13, color: hot > 0.5 ? "#FFB4A6" : "#5A5346", marginTop: 2 }}>{label}</div>
  </div>
);

// ---------------- pixel buildings + swinging gate helpers ----------------
const House: React.FC<{ w: number; h: number; kind: "apartment" | "house" | "mansion" }> = ({ w, h, kind }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    {/* roof */}
    {kind !== "apartment" && <div style={{ position: "absolute", left: -14, top: -h * 0.2, width: 0, height: 0, borderLeft: `${w / 2 + 14}px solid transparent`, borderRight: `${w / 2 + 14}px solid transparent`, borderBottom: `${h * 0.24}px solid ${kind === "mansion" ? "#8A5A9E" : "#B0603E"}` }} />}
    {kind === "apartment" && <div style={{ position: "absolute", left: -6, top: -14, width: w + 12, height: 16, background: "#5A6B85", borderRadius: 3 }} />}
    {/* body */}
    <div style={{ position: "absolute", inset: 0, background: kind === "mansion" ? "linear-gradient(180deg, #F0E6D2, #DFD0B4)" : kind === "house" ? "linear-gradient(180deg, #E8D5C0, #D6BEA4)" : "linear-gradient(180deg, #97A6BE, #7E8DA6)", border: "3px solid rgba(40,50,70,0.5)", borderRadius: 4 }} />
    {/* windows */}
    {Array.from({ length: kind === "mansion" ? 6 : kind === "house" ? 3 : 4 }, (_, i) => {
      const cols = kind === "mansion" ? 3 : 2;
      const cw = (w - 40) / cols;
      const x = 16 + (i % cols) * cw + cw / 2 - 13;
      const y = 18 + Math.floor(i / cols) * (kind === "apartment" ? h / 3.2 : h / 2.6);
      if (y > h - 46) return null;
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: 26, height: 30, background: "#F6E4A0", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: 3 }} />;
    })}
    {/* door */}
    <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: kind === "mansion" ? 44 : 32, height: kind === "mansion" ? 62 : 46, background: "#6E4A2E", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: "6px 6px 0 0" }} />
    {/* mansion columns + gold trim */}
    {kind === "mansion" && <>
      <div style={{ position: "absolute", left: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", right: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", left: 0, top: h * 0.3, width: "100%", height: 6, background: "#E7B24C" }} />
    </>}
  </div>
);

const SwingGate: React.FC<{ open: number; glow: number; w?: number }> = ({ open, glow, w = 90 }) => (
  <div style={{ position: "relative", width: w, height: 110 }}>
    <div style={{ position: "absolute", left: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", right: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", left: 10, bottom: 4, width: w - 20, height: 86, transformOrigin: "0% 50%", transform: `rotateY(${open * 74}deg)`, background: glow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#8A6844", border: `3px solid ${glow > 0.05 ? "#F6E4A0" : "#5E4630"}`, borderRadius: 6, boxShadow: glow > 0.05 ? `0 0 ${16 + glow * 20}px ${GOLD}` : "none" }}>
      {Array.from({ length: 4 }, (_, i) => <div key={i} style={{ position: "absolute", left: 8 + i * ((w - 40) / 4), top: 8, width: 6, height: 62, background: "rgba(40,30,15,0.35)", borderRadius: 3 }} />)}
    </div>
  </div>
);

// floating chat bubble over a listener
const Chat: React.FC<{ x: number; y: number; lf: number; delay: number; txt?: string }> = ({ x, y, lf, delay, txt = "💬" }) => {
  const ap = over(lf, delay, 8, Easing.out(Easing.back(1.8)));
  if (ap <= 0.01) return null;
  const bob = Math.sin(lf / 7 + delay) * 5;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, transform: `scale(${ap})`, opacity: ap, zIndex: 18 }}>
      <div style={{ padding: "5px 11px", borderRadius: 12, borderBottomLeftRadius: 3, background: "#EAF3ED", border: "2px solid #BFD8C7", fontSize: 20 }}>{txt}</div>
    </div>
  );
};

// ---- Meta brand assets (vector, editorial commentary) ----
// ---- Meta brand assets (original vector, editorial commentary — NOT the protected file) ----
// Faithful Mobius "∞": rounded filled-width blue ribbon with a real over-under center weave.
const MetaLogo: React.FC<{ size?: number }> = ({ size = 80 }) => {
  const uid = React.useId().replace(/:/g, ""); // instance-unique gradient/clip ids
  const gF = `mgF-${uid}`, gD = `mgD-${uid}`, cp = `mgC-${uid}`;
  return (
    <svg viewBox="0 0 128 76" width={size} height={(size * 76) / 128} style={{ display: "block", overflow: "visible" }}>
      <defs>
        {/* light top-left -> deep bottom-right, the Meta blue ramp */}
        <linearGradient id={gF} x1="8" y1="12" x2="120" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3DB4FF" />
          <stop offset="0.30" stopColor="#12A0FF" />
          <stop offset="0.70" stopColor="#0A74EE" />
          <stop offset="1" stopColor="#0A5AE0" />
        </linearGradient>
        {/* darker shade for the strand segment that dives UNDER at the crossover */}
        <linearGradient id={gD} x1="56" y1="30" x2="72" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A5AE0" />
          <stop offset="1" stopColor="#0645AE" />
        </linearGradient>
        {/* silhouette of the whole ribbon; clips the FRONT strand so it reads continuous on top */}
        <clipPath id={cp}>
          <path d="M64 38 C 70 27, 79 18, 91 18 C 106 18, 118 28, 118 42 C 118 56, 107 66, 93 66 C 80 66, 71 57, 64 46 C 57 57, 48 66, 35 66 C 21 66, 10 56, 10 42 C 10 28, 22 18, 37 18 C 49 18, 58 27, 64 38 Z" />
        </clipPath>
      </defs>

      {/* BACK strand: the loop that dips UNDER at the center (drawn first) */}
      <path
        d="M64 38 C 58 27, 49 18, 37 18 C 22 18, 10 28, 10 42 C 10 56, 21 66, 35 66 C 51 66, 60 53, 68 42 C 74 33, 81 26, 91 26 C 101 26, 108 33, 108 42 C 108 51, 101 58, 91 58 C 84 58, 78 53, 74 47"
        fill="none" stroke={`url(#${gF})`} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* shade the tiny segment where the back strand ducks beneath the front (fakes depth) */}
      <path d="M64 38 C 65 41, 67 43, 69 43" fill="none" stroke={`url(#${gD})`} strokeWidth={16} strokeLinecap="round" />

      {/* FRONT strand: the loop that passes OVER, clipped to the ribbon silhouette */}
      <g clipPath={`url(#${cp})`}>
        <path
          d="M64 38 C 70 27, 79 18, 91 18 C 106 18, 118 28, 118 42 C 118 56, 107 66, 93 66 C 77 66, 68 53, 60 42 C 54 33, 47 26, 37 26 C 27 26, 20 33, 20 42 C 20 51, 27 58, 37 58 C 44 58, 50 53, 54 47"
          fill="none" stroke={`url(#${gF})`} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* soft top-left sheen along the upper edge — sells the ribbon volume */}
      <path d="M37 20 C 22 20, 12 30, 12 42" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth={3.2} strokeLinecap="round" />
      <path d="M91 20 C 106 20, 116 30, 116 42" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={3.2} strokeLinecap="round" />
    </svg>
  );
};

// Optional glow/drop-shadow wrapper. `on` lets you animate the halo intensity (0..1).
const MetaLogoGlow: React.FC<{ size?: number; on?: number }> = ({ size = 80, on = 1 }) => (
  <div style={{
    display: "inline-flex",
    filter: `drop-shadow(0 0 ${10 + on * 16}px rgba(24,119,242,${0.35 + on * 0.5})) drop-shadow(0 6px 14px rgba(10,90,224,${0.30 + on * 0.25}))`,
  }}>
    <MetaLogo size={size} />
  </div>
);
const MetaMascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; cheer?: number; shock?: number }> = ({ lf, size = 200, gaze = 0, nodAmp = 3, nodSpeed = 8, cheer = 0, shock = 0 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <Mascot lf={lf} size={size} gaze={gaze} nodAmp={nodAmp} nodSpeed={nodSpeed} cheer={cheer} shock={shock} zuck={1} />
    <div style={{ position: "absolute", left: size * 0.36, top: size * 0.5, width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: "#fff", border: `2px solid ${META}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}>
      <MetaLogo size={size * 0.2} />
    </div>
  </div>
);
// ============================================================================
// MetaHQ — Menlo Park campus landmark (glass HQ + giant "Like" thumbs sign +
// "1 HACKER WAY" street sign + Zuck-caricature critter + hardhat/build nod).
// Crafted SVG/CSS only, NO emojis. Drop-in replacement; API unchanged: <MetaHQ lf={lf} />.
// Assumes shared infra in scope: fr, grad, seed, NAVYSH, META, METALO, inter.
// Reuses the MetaLogo defined above it in the file.
// ============================================================================
const Portrait: React.FC<{ who: "zuck" | "wang"; size?: number; lf?: number }> = ({ who, size = 96, lf = 0 }) => {
  const bob = Math.sin(lf / 11) * 2;
  const isZ = who === "zuck"; const isD = who === "dario";
  const ring = isD ? "#1E3A5F" : isZ ? "#B7BAC0" : "#2A2A32";
  return (
    <div style={{ width: size, height: size, transform: `translateY(${bob}px)`, filter: "drop-shadow(0 10px 18px rgba(10,16,34,0.45))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs><clipPath id={`pc-${who}`}><circle cx="50" cy="50" r="43" /></clipPath></defs>
        <circle cx="50" cy="50" r="48" fill="#FBF8F1" />
        <circle cx="50" cy="50" r="45.5" fill="none" stroke={ring} strokeWidth="5" />
        <g clipPath={`url(#pc-${who})`}>
          <rect x="0" y="0" width="100" height="100" fill={isZ ? "#DCE7F5" : "#E7DBC9"} />
          {isD ? <>
            <rect x="22" y="83" width="56" height="26" rx="11" fill="#1E3A5F" />
            <rect x="42" y="71" width="16" height="15" fill="#E9C6A2" />
            <ellipse cx="50" cy="54" rx="21" ry="23" fill="#EFD3B8" />
            <circle cx="28.5" cy="56" r="4.5" fill="#E4BE99" /><circle cx="71.5" cy="56" r="4.5" fill="#E4BE99" />
            {[[30,41],[40,33],[50,30],[60,33],[70,41],[34,47],[66,47],[25,50],[75,50]].map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r="8.5" fill="#5A4632" />)}
            <circle cx="41" cy="55.5" r="7.4" fill="rgba(210,225,245,0.28)" stroke="#3A4456" strokeWidth="2.4" /><circle cx="59" cy="55.5" r="7.4" fill="rgba(210,225,245,0.28)" stroke="#3A4456" strokeWidth="2.4" />
            <rect x="48" y="54.5" width="4" height="2.2" fill="#3A4456" />
            <circle cx="41" cy="55.5" r="2.7" fill="#2A2A30" /><circle cx="59" cy="55.5" r="2.7" fill="#2A2A30" />
            <path d="M41 65 Q50 73 59 65" fill="none" stroke="#B06A4A" strokeWidth="3" strokeLinecap="round" />
          </> : isZ ? <>
            <rect x="23" y="83" width="54" height="26" rx="11" fill="#B7BAC0" />
            <rect x="42" y="70" width="16" height="16" fill="#E9C6A2" />
            <ellipse cx="50" cy="52" rx="22" ry="24" fill="#F1DAC1" />
            <circle cx="27.5" cy="54" r="4.5" fill="#E4BE99" /><circle cx="72.5" cy="54" r="4.5" fill="#E4BE99" />
            <path d="M26 46 C26 22 74 22 74 46 C74 40 71 36 66 35 L66 40 C58 34 42 34 34 40 L34 35 C29 36 26 40 26 46 Z" fill="#6E4A2C" />
            <rect x="27" y="37" width="46" height="9" rx="2" fill="#6E4A2C" /><rect x="27" y="45" width="46" height="2.6" fill="#805A38" />
            <rect x="35" y="49.5" width="11" height="2.6" rx="1.3" fill="#5A3D24" /><rect x="54" y="49.5" width="11" height="2.6" rx="1.3" fill="#5A3D24" />
            <ellipse cx="41" cy="55.5" rx="3.1" ry="3.5" fill="#2A2A30" /><ellipse cx="59" cy="55.5" rx="3.1" ry="3.5" fill="#2A2A30" />
            <path d="M50 57 L47.6 63 L52.4 63 Z" fill="#E2BC98" />
            <rect x="44" y="67.5" width="12" height="2.8" rx="1.4" fill="#BC866A" />
          </> : <>
            <rect x="23" y="83" width="54" height="26" rx="11" fill="#2A2A32" />
            <rect x="42" y="70" width="16" height="16" fill="#D8B084" />
            <ellipse cx="50" cy="52" rx="22" ry="24" fill="#E7BD91" />
            <circle cx="27.5" cy="54" r="4.5" fill="#D3A97C" /><circle cx="72.5" cy="54" r="4.5" fill="#D3A97C" />
            <path d="M26 47 C26 23 74 23 74 47 C74 39 70 34 62 34 C55 27 40 29 34 37 C29 39 26 42 26 47 Z" fill="#17171C" />
            <path d="M31 41 C42 31 60 31 70 40 C64 33 40 31 31 41 Z" fill="#0E0E12" />
            <rect x="35" y="50" width="11" height="2.6" rx="1.3" fill="#111116" /><rect x="54" y="50" width="11" height="2.6" rx="1.3" fill="#111116" />
            <path d="M37.5 55.5 Q41 52.6 45 55.5 Q41 57.8 37.5 55.5 Z" fill="#22222A" /><path d="M55 55.5 Q58.5 52.6 62.5 55.5 Q58.5 57.8 55 55.5 Z" fill="#22222A" />
            <path d="M50 57 L48 63 L52 63 Z" fill="#D6AC80" />
            <path d="M44 66.5 Q50 70.5 56 66.5" fill="none" stroke="#AE7850" strokeWidth="2.6" strokeLinecap="round" />
          </>}
        </g>
      </svg>
    </div>
  );
};

const FaceImg: React.FC<{ name: string; size?: number; lf?: number; ring?: string }> = ({ name, size = 96, lf = 0, ring = "#B7BAC0" }) => {
  const bob = Math.sin(lf / 11) * 2;
  return (
    <div style={{ width: size, height: size, transform: `translateY(${bob}px)`, filter: "drop-shadow(0 10px 18px rgba(10,16,34,0.45))" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `${Math.max(4, size * 0.05)}px solid ${ring}`, background: "#FBF8F1" }}>
        <Img src={staticFile(`faces/${name}`)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
};
const MetaHQ: React.FC<{ lf: number }> = ({ lf }) => {
  // idle motion --------------------------------------------------------------
  const sway = Math.sin(lf / 22) * 1.1;               // whole-post gentle sway
  const thumbBob = Math.sin(lf / 15) * 2.4;           // sign lifts a touch
  const zuckBob = Math.max(0, Math.sin(lf / 12)) * 4; // proud little hop
  const beacon = (Math.sin(lf / 5) + 1) / 2;          // rooftop red beacon pulse
  const glint = ((lf / fr(3.4)) % 1);                 // sun sweep across glass
  const cloud = ((lf / fr(9)) % 1);                   // slow reflection drift

  // curtain-wall grid geometry ----------------------------------------------
  const COLS = 9, ROWS = 4;
  const winW = 40, winH = 34, gapX = 5, gapY = 7, padX = 16, padTop = 34;
  const bodyW = padX * 2 + COLS * winW + (COLS - 1) * gapX; // = 437
  const bodyH = padTop + ROWS * (winH + gapY) + 12;         // = 169

  return (
    <div style={{ position: "relative", width: 600, height: 322, transform: `translateY(${sway * 0.4}px)` }}>

      {/* ground shadow pad — grounds the whole campus */}
      <div style={{ position: "absolute", left: 46, bottom: 6, width: 512, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(10,16,34,0.5), transparent 70%)", filter: "blur(6px)" }} />

      {/* ===================== THE GLASS HQ BUILDING ===================== */}
      <div style={{ position: "absolute", left: 62, bottom: 24, width: bodyW, height: bodyH }}>
        {/* rooftop parapet + HVAC + solar sliver + blinking beacon */}
        <div style={{ position: "absolute", left: -8, top: -20, width: bodyW + 16, height: 22, background: grad("#D7DEE9", "#AEB9C9"), border: "2px solid #8B97A9", borderRadius: "6px 6px 3px 3px", boxShadow: "0 4px 10px -4px rgba(10,16,34,0.5)" }} />
        {/* HVAC units on the roof */}
        <div style={{ position: "absolute", left: 60, top: -34, width: 46, height: 16, background: grad("#C3CBD8", "#9AA6B7"), border: "2px solid #7E8A9C", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: 300, top: -34, width: 62, height: 16, background: grad("#C3CBD8", "#9AA6B7"), border: "2px solid #7E8A9C", borderRadius: 3 }} />
        {/* thin solar / skylight strip */}
        <div style={{ position: "absolute", left: 150, top: -30, width: 110, height: 12, background: grad("#2C4A78", "#16294B"), border: "1.5px solid #6E86AE", borderRadius: 2, opacity: 0.9 }} />
        {/* blinking safety beacon */}
        <div style={{ position: "absolute", left: 210, top: -46, width: 8, height: 16, background: "#7E8A9C", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 205, top: -52, width: 18, height: 10, borderRadius: "50%", background: `rgba(220,70,60,${0.35 + beacon * 0.65})`, boxShadow: `0 0 ${6 + beacon * 12}px rgba(220,70,60,${0.4 + beacon * 0.5})` }} />

        {/* building frame (aluminium curtain-wall mullions) */}
        <div style={{ position: "absolute", inset: 0, background: grad("#8B98AC", "#5E6D84"), border: "3px solid #4C5A70", borderRadius: "6px 6px 4px 4px", boxShadow: NAVYSH }} />
        {/* brand band under the parapet */}
        <div style={{ position: "absolute", left: 8, top: 6, right: 8, height: 22, borderRadius: 4, background: grad("#122A4E", "#0B1B34"), display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1.5px solid rgba(120,150,210,0.4)", overflow: "hidden" }}>
          <div style={{ transform: "scale(0.9)", display: "flex" }}><MetaLogo size={26} /></div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.14em", color: "#BFD4FF" }}>MENLO PARK HQ</div>
          {/* faint reflection sweep across the sign */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-30 + glint * 150}%`, width: 40, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)", transform: "skewX(-18deg)" }} />
        </div>

        {/* the glass curtain wall — grid of reflective panels */}
        <div style={{ position: "absolute", left: padX, top: padTop, right: padX, bottom: 12 }}>
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const c = i % COLS, r = Math.floor(i / COLS);
            const x = c * (winW + gapX);
            const y = r * (winH + gapY);
            // per-panel tint variance so the glass reads as real, not flat
            const v = seed(i * 2.3);
            const lit = seed(i * 5.1) > 0.86;             // a few warm-lit offices
            const topGlass = lit ? "#F4E3B0" : `rgba(${150 + v * 40},${190 + v * 30},${225 + v * 20},0.95)`;
            const botGlass = lit ? "#E7C878" : `rgba(${58 + v * 30},${96 + v * 34},${150 + v * 40},0.98)`;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, width: winW, height: winH, borderRadius: 2, background: `linear-gradient(155deg, ${topGlass} 0%, ${botGlass} 100%)`, border: "1.5px solid rgba(30,44,70,0.55)", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)" }}>
                {/* diagonal sky reflection streak in each pane */}
                <div style={{ position: "absolute", left: -6, top: -8, width: 14, height: winH + 16, background: "rgba(255,255,255,0.32)", transform: "rotate(20deg)" }} />
              </div>
            );
          })}
          {/* drifting cloud reflection band sweeping across the whole facade */}
          <div style={{ position: "absolute", top: "8%", left: `${-40 + cloud * 150}%`, width: "44%", height: "42%", background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.34), transparent)", filter: "blur(4px)", transform: "skewX(-14deg)", pointerEvents: "none" }} />
          {/* long specular sun-glint that rakes over the glass */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-20 + glint * 130}%`, width: 26, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "skewX(-16deg)", pointerEvents: "none" }} />
        </div>

        {/* glass lobby / entrance at the base */}
        <div style={{ position: "absolute", left: bodyW / 2 - 34, bottom: 0, width: 68, height: 26, background: grad("#BFE0FF", "#5E8FC4"), border: "2px solid #4C5A70", borderRadius: "3px 3px 0 0" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(30,44,70,0.5)" }} />
        </div>
      </div>

      {/* ===================== META LOGO PYLON (landmark, in place of the thumbs-up) ===================== */}
      <div style={{ position: "absolute", left: 92, bottom: 22, width: 52, height: 22, background: grad("#C7CDD6", "#9AA2AE"), border: "2px solid #7C8492", borderRadius: 3, zIndex: 7 }} />
      <div style={{ position: "absolute", left: 110, bottom: 42, width: 18, height: 104, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)`, background: grad("#E9EDF3", "#B9C2CF"), border: "2px solid #8B93A2", borderRadius: 3, zIndex: 7 }} />
      <div style={{ position: "absolute", left: 44, bottom: 128 + thumbBob, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)`, filter: "drop-shadow(0 14px 22px rgba(8,20,60,0.45))", zIndex: 8 }}>
        <div style={{ padding: "18px 20px", borderRadius: 24, background: "#FFFFFF", border: `5px solid ${META}`, boxShadow: `0 0 26px ${META}66, inset 0 2px 0 rgba(255,255,255,0.9)` }}>
          <MetaLogo size={112} />
        </div>
      </div>
      {/* ===================== "1 HACKER WAY" STREET SIGN ===================== */}
      <div style={{ position: "absolute", right: 58, bottom: 30, width: 8, height: 104, background: grad("#8A93A2", "#5B6472"), borderRadius: 2, zIndex: 8 }} />
      <div style={{ position: "absolute", right: 8, bottom: 108, transform: `translateY(${Math.sin(lf / 26) * 1.2}px)`, filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))", zIndex: 9 }}>
        <div style={{ padding: "7px 15px", borderRadius: 6, background: grad("#2E9E63", "#1C7A48"), border: "3px solid #E9F3EC", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25)", textAlign: "center", whiteSpace: "nowrap" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#F4FBF6", letterSpacing: "0.02em", lineHeight: 1 }}>1 HACKER WAY</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10, color: "rgba(244,251,246,0.8)", letterSpacing: "0.2em", marginTop: 2 }}>MENLO PARK · CA</div>
        </div>
      </div>

      {/* ===================== POP-CULTURE TOUCH #1: proud Zuck-caricature critter ===================== */}
      {/* stands on the entrance plaza, grey hoodie, pale face, tiny proud bob */}
      <div style={{ position: "absolute", left: 262, bottom: 20 + zuckBob, transform: "translateZ(0)", zIndex: 9 }}>
        <svg viewBox="0 0 70 96" width={64} height={88} shapeRendering="crispEdges">
          {/* body = grey tee/hoodie */}
          <rect x="16" y="44" width="38" height="40" rx="4" fill="#C9CED6" />
          <rect x="16" y="44" width="38" height="7" fill="#DDE1E7" />
          {/* hoodie collar V */}
          <path d="M28 44 L35 54 L42 44 Z" fill="#AEB4BE" />
          {/* arms crossed (proud founder pose) */}
          <rect x="10" y="58" width="20" height="9" rx="4" fill="#C9CED6" />
          <rect x="40" y="58" width="20" height="9" rx="4" fill="#BFC5CE" />
          {/* pale round face */}
          <rect x="20" y="14" width="30" height="30" rx="9" fill="#F1E2D2" />
          {/* signature straight fringe */}
          <rect x="19" y="12" width="32" height="11" rx="5" fill="#7A5236" />
          <rect x="19" y="18" width="32" height="4" fill="#6A472E" />
          {/* wide unblinking eyes */}
          <rect x="27" y="26" width="5" height="7" fill="#22303F" />
          <rect x="38" y="26" width="5" height="7" fill="#22303F" />
          {/* flat little smile */}
          <rect x="30" y="37" width="10" height="3" rx="1" fill="#C58C6A" />
          {/* legs */}
          <rect x="21" y="84" width="10" height="10" fill="#3C4654" />
          <rect x="39" y="84" width="10" height="10" fill="#3C4654" />
        </svg>
        {/* proud speech chip: he built it himself — lifted above the head */}
        <div style={{ position: "absolute", left: -8, top: -26, padding: "3px 9px", borderRadius: 9, borderBottomLeftRadius: 2, background: "#EAF2FF", border: `2px solid ${META}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: METALO, whiteSpace: "nowrap", boxShadow: "0 4px 10px -4px rgba(10,16,34,0.5)" }}>we built it ourselves</div>
      </div>

      {/* ===================== POP-CULTURE TOUCH #2: "still building" hardhat + cone ===================== */}
      {/* a yellow hardhat resting on a crate — the perpetual-construction nod */}
      <div style={{ position: "absolute", right: 168, bottom: 22, width: 40, height: 22, background: grad("#8A6844", "#6E5236"), border: "2px solid #543E28", borderRadius: 3, zIndex: 5 }}>
        {/* plank seam on the crate */}
        <div style={{ position: "absolute", left: "50%", top: 2, bottom: 2, width: 2, background: "rgba(40,28,16,0.4)" }} />
      </div>
      {/* hardhat dome + brim */}
      <div style={{ position: "absolute", right: 170, bottom: 42, width: 36, height: 18, background: grad("#F5CE55", "#D9A626"), border: "2px solid #B4841E", borderRadius: "14px 14px 3px 3px", zIndex: 5 }}>
        <div style={{ position: "absolute", left: "50%", top: -4, transform: "translateX(-50%)", width: 10, height: 6, background: "#E9BE3F", border: "1.5px solid #B4841E", borderRadius: "4px 4px 0 0" }} />
        <div style={{ position: "absolute", left: -5, bottom: -3, width: 46, height: 6, background: grad("#F5CE55", "#D9A626"), border: "2px solid #B4841E", borderRadius: 4 }} />
      </div>
      {/* a small traffic cone beside it */}
      <div style={{ position: "absolute", right: 142, bottom: 22, zIndex: 5 }}>
        <div style={{ width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderBottom: "24px solid #E4622B" }} />
        <div style={{ position: "absolute", left: -4, top: 10, width: 30, height: 5, background: "#F4F1EC", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: -7, bottom: -4, width: 36, height: 6, background: grad("#F07A3E", "#C24E1C"), borderRadius: 2 }} />
      </div>

      {/* ===================== SUBTLE CAMPUS DETAIL: topiary shrubs ===================== */}
      <div style={{ position: "absolute", left: 30, bottom: 22, zIndex: 4 }}>
        <div style={{ width: 34, height: 30, borderRadius: "50% 50% 40% 40%", background: grad("#4E8A54", "#2F5E36"), border: "2px solid #274F2D" }} />
        <div style={{ position: "absolute", left: 13, top: 26, width: 8, height: 14, background: "#5E4630", borderRadius: 2 }} />
      </div>
      <div style={{ position: "absolute", right: 30, bottom: 22, zIndex: 4 }}>
        <div style={{ width: 30, height: 26, borderRadius: "50% 50% 40% 40%", background: grad("#4E8A54", "#2F5E36"), border: "2px solid #274F2D" }} />
        <div style={{ position: "absolute", left: 11, top: 22, width: 8, height: 14, background: "#5E4630", borderRadius: 2 }} />
      </div>
    </div>
  );
};

const Tab: React.FC<{ w?: number }> = ({ w = 150 }) => (
  <div style={{ width: w, borderRadius: 8, background: "#F4F6FA", border: "2px solid #C9D3E0", overflow: "hidden", boxShadow: "0 8px 18px -8px rgba(10,16,34,0.4)" }}>
    <div style={{ height: 20, background: "#E4EAF2", display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
      {["#ED6A5E", "#F4BF4F", "#61C554"].map((c, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />)}
      <div style={{ marginLeft: 4, height: 8, borderRadius: 4, background: "#fff", flex: 1 }} />
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 34 }}>
        {[0.5, 0.8, 0.4, 0.9, 0.6, 0.7].map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: i % 2 ? "#8FB0DE" : META, borderRadius: 2 }} />)}
      </div>
    </div>
  </div>
);
const AdsManager: React.FC<{ lf: number; highlightRow?: number; dimRows?: number[]; budget?: string }> = ({ lf, highlightRow = -1, dimRows = [], budget = "" }) => {
  const rows = [["Retargeting", "3.2x", "$412"], ["Lookalike 1%", "1.1x", "$380"], ["Broad AI", "2.7x", "$500"], ["Interest, fitness", "0.9x", "$210"], ["Creative test", "1.4x", "$150"]];
  return (
    <div style={{ width: "100%", borderRadius: 14, background: "#12151C", border: "2px solid rgba(120,150,210,0.3)", overflow: "hidden", boxShadow: NAVYSH }}>
      <div style={{ height: 46, background: "#1B2130", display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
        <MetaLogo size={26} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#E6ECF5" }}>Ads Manager</div>
        {budget ? <div style={{ marginLeft: "auto", fontFamily: mono, fontSize: 18, color: GREEN }}>{budget}</div> : null}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", padding: "6px 16px", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "rgba(180,195,225,0.6)" }}>
        <div>Ad set</div><div style={{ textAlign: "right" }}>ROAS</div><div style={{ textAlign: "right" }}>Spend</div>
      </div>
      {rows.map((r, i) => {
        const dim = dimRows.includes(i);
        const hi = highlightRow === i;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", padding: "11px 16px", alignItems: "center", background: hi ? "rgba(63,158,116,0.16)" : "transparent", opacity: dim ? 0.32 : 1, borderTop: "1px solid rgba(120,150,210,0.12)", position: "relative" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: dim ? "#8792A6" : "#DDE6F2", textDecoration: dim ? "line-through" : "none", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 30, height: 18, borderRadius: 9, background: dim ? "#3A4456" : (parseFloat(r[1]) >= 1.5 ? "rgba(63,158,116,0.3)" : "rgba(196,74,58,0.3)"), border: `1.5px solid ${dim ? "#556" : (parseFloat(r[1]) >= 1.5 ? GREEN : RED)}` }} />
              {r[0]}
            </div>
            <div style={{ textAlign: "right", fontFamily: mono, fontSize: 19, color: parseFloat(r[1]) >= 1.5 ? "#8FE0B0" : "#FFB4A6" }}>{r[1]}</div>
            <div style={{ textAlign: "right", fontFamily: mono, fontSize: 19, color: "rgba(205,220,245,0.85)" }}>{r[2]}</div>
          </div>
        );
      })}
    </div>
  );
};
const CmdBubble: React.FC<{ text: string; done: boolean; w?: number }> = ({ text, done, w = 520 }) => (
  <div style={{ width: w }}>
    <div style={{ padding: "12px 18px", borderRadius: 16, borderBottomRightRadius: 4, background: grad("#E9825C", "#C7541F"), fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "#fff", boxShadow: "0 12px 26px -10px rgba(199,84,31,0.5)", marginLeft: "auto", maxWidth: "88%" }}>{text}</div>
    {done ? <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#8FE0B0" }}>✓ done</span></div> : null}
  </div>
);

// ===== v8 set-pieces: car, pogo, money gun, trophy, white Meta dashboard =====
const Car: React.FC<{ lf: number; size?: number }> = ({ lf, size = 130 }) => {
  const u = size / 130; const bnc = Math.sin(lf / 4) * 1.5;
  return (
    <div style={{ width: size, height: size * 0.62, position: "relative", transform: `translateY(${bnc}px)`, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
      <div style={{ position: "absolute", left: 0, bottom: 14 * u, width: size, height: 32 * u, borderRadius: `${16 * u}px ${16 * u}px ${6 * u}px ${6 * u}px`, background: grad("#C44A3A", "#9A2F22") }} />
      <div style={{ position: "absolute", left: 26 * u, bottom: 38 * u, width: 66 * u, height: 28 * u, borderRadius: `${12 * u}px ${12 * u}px 0 0`, background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", left: 36 * u, bottom: 42 * u, width: 46 * u, height: 20 * u, borderRadius: 6 * u, background: "#BFE0FF" }} />
      <div style={{ position: "absolute", left: 46 * u, bottom: 44 * u, width: 22 * u, height: 22 * u, borderRadius: 3, background: "#D97757" }}><div style={{ position: "absolute", left: 5 * u, top: 8 * u, width: 4 * u, height: 6 * u, background: "#151312" }} /><div style={{ position: "absolute", left: 13 * u, top: 8 * u, width: 4 * u, height: 6 * u, background: "#151312" }} /></div>
      <div style={{ position: "absolute", left: 16 * u, bottom: 0, width: 26 * u, height: 26 * u, borderRadius: "50%", background: "#1A1A1E", border: `${5 * u}px solid #55565C`, transform: `rotate(${lf * 22}deg)` }} />
      <div style={{ position: "absolute", right: 16 * u, bottom: 0, width: 26 * u, height: 26 * u, borderRadius: "50%", background: "#1A1A1E", border: `${5 * u}px solid #55565C`, transform: `rotate(${lf * 22}deg)` }} />
    </div>
  );
};
const Pogo: React.FC<{ lf: number; size?: number }> = ({ lf, size = 84 }) => {
  const bnc = Math.abs(Math.sin(lf / 4)) * 42;
  return (
    <div style={{ position: "relative", width: size, transform: `translateY(${-bnc}px)` }}>
      <Mascot lf={lf} size={size} cheer={0.6} nodAmp={0} nodSpeed={9} />
      <div style={{ position: "absolute", left: size / 2 - 4, top: size * 0.82, width: 8, height: 52, background: grad("#C44A3A", "#9A2F22"), borderRadius: 3 }} />
      <div style={{ position: "absolute", left: size / 2 - 16, top: size * 0.6, width: 32, height: 8, background: "#3A4456", borderRadius: 4 }} />
      <div style={{ position: "absolute", left: size / 2 - 15, top: size * 0.82 + 52, width: 30, height: 9, background: "#3A4456", borderRadius: 3 }} />
    </div>
  );
};
const MoneyGun: React.FC<{ lf: number; size?: number }> = ({ lf, size = 90 }) => {
  const u = size / 90;
  return (
    <div style={{ position: "relative", width: size * 3.4, height: size * 3.4, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))" }}>
      {/* the gun (aimed up-right) */}
      <div style={{ position: "absolute", left: 0, top: 44 * u, transform: "rotate(-28deg)", transformOrigin: "0% 50%" }}>
        <div style={{ width: 66 * u, height: 28 * u, borderRadius: 6 * u, background: grad("#3A4456", "#232B3C") }} />
        <div style={{ position: "absolute", left: 10 * u, top: 24 * u, width: 22 * u, height: 32 * u, borderRadius: 5 * u, background: grad("#3A4456", "#232B3C") }} />
        <div style={{ position: "absolute", left: 62 * u, top: 6 * u, width: 22 * u, height: 15 * u, background: "#232B3C" }} />
      </div>
      {/* bills fountain: launch up-right from the muzzle, then FALL with gravity */}
      {Array.from({ length: 14 }, (_, i) => {
        const t = ((lf * 1.15 + i * 7.3) % 74) / 74;
        const bx = 72 * u + t * 150 * u + Math.sin(i * 3) * 8 * u;
        const by = 30 * u - 190 * u * t + 470 * u * t * t;
        const op = t < 0.8 ? 1 : Math.max(0, (1 - t) / 0.2);
        return <div key={i} style={{ position: "absolute", left: bx, top: by, width: 28 * u, height: 17 * u, borderRadius: 3 * u, background: "linear-gradient(180deg,#BEE7C9,#8FCBA1)", border: `${1.5 * u}px solid #5FA277`, transform: `rotate(${i * 47 + lf * 5}deg)`, opacity: op, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 9 * u, color: "#2F7E5A" }}>$</div>;
      })}
    </div>
  );
};
const Trophy: React.FC<{ size?: number; lf?: number }> = ({ size = 90, lf = 0 }) => {
  const u = size / 90; const sh = Math.abs(Math.sin(lf / 6));
  return (
    <div style={{ width: size, height: size * 1.3, position: "relative", filter: `drop-shadow(0 0 ${10 + sh * 12}px ${GOLD})` }}>
      <div style={{ position: "absolute", left: 16 * u, top: 0, width: 58 * u, height: 48 * u, borderRadius: `${8 * u}px ${8 * u}px ${28 * u}px ${28 * u}px`, background: grad("#F0CB63", "#D39A2A"), border: `${2 * u}px solid #F6E4A0` }} />
      <div style={{ position: "absolute", left: 0, top: 8 * u, width: 18 * u, height: 24 * u, borderRadius: "50%", border: `${4 * u}px solid #E0B84E`, borderRight: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 8 * u, width: 18 * u, height: 24 * u, borderRadius: "50%", border: `${4 * u}px solid #E0B84E`, borderLeft: "none" }} />
      <div style={{ position: "absolute", left: 38 * u, top: 48 * u, width: 14 * u, height: 20 * u, background: grad("#D39A2A", "#A6741A") }} />
      <div style={{ position: "absolute", left: 22 * u, top: 66 * u, width: 46 * u, height: 14 * u, borderRadius: 4 * u, background: grad("#8A6844", "#6E5236") }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 14 * u, textAlign: "center", fontSize: 22 * u, color: "#fff", lineHeight: 1 }}>★</div>
    </div>
  );
};
const MetaDash: React.FC<{ w?: number }> = ({ w = 150 }) => (
  <div style={{ width: w, borderRadius: 8, background: "#FFFFFF", border: "2px solid #DCE3EC", overflow: "hidden", boxShadow: "0 8px 18px -8px rgba(10,16,34,0.3)" }}>
    <div style={{ height: 22, background: "#F0F2F5", display: "flex", alignItems: "center", padding: "0 8px", gap: 6, borderBottom: "1px solid #E2E8F0" }}>
      <MetaLogo size={16} /><div style={{ height: 6, width: 44, borderRadius: 3, background: "#C9D3E0" }} />
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 32 }}>
        {[0.5, 0.8, 0.4, 0.9, 0.6, 0.7].map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: i % 2 ? "#8FB0DE" : META, borderRadius: 2 }} />)}
      </div>
    </div>
  </div>
);
const SnailRacer: React.FC<{ size?: number; lf?: number; face?: string }> = ({ size = 120, lf = 0, face }) => (
  <div style={{ position: "relative", width: size, height: size * 0.66 }}>
    <Snail size={size} lf={lf} />
    {face ? <div style={{ position: "absolute", left: size * 0.16, top: -size * 0.04, zIndex: 3 }}><FaceImg name={face} size={size * 0.54} lf={lf} ring="#C44A3A" /></div> : null}
  </div>
);

const RocketSmoke: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none" }}>
    {Array.from({ length: 28 }, (_, i) => {
      const a = seed(i) * Math.PI * 2;
      const spread = 0.15 + seed(i * 2) * 0.85;
      const dist = spread * p * 720;
      const cx = 540 + Math.cos(a) * dist * (0.7 + seed(i) * 0.8);
      const cy = 820 + Math.sin(a) * dist * 0.72 + p * 100 + spread * 130 * p;
      const sz = (72 + seed(i * 3) * 160) * (0.5 + p * 1.5);
      const op = Math.max(0, 0.85 - p * 0.68) * (0.5 + seed(i * 5) * 0.5);
      const g = 206 + Math.floor(seed(i) * 44);
      return <div key={i} style={{ position: "absolute", left: cx - sz / 2, top: cy - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle at 40% 38%, rgba(${g},${g},${g - 4},${op}), rgba(180,180,186,0) 70%)`, filter: "blur(5px)" }} />;
    })}
    {p < 0.45 ? <div style={{ position: "absolute", left: 420, top: 700, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,232,160,${0.75 * (1 - p / 0.45)}), transparent 66%)`, filter: "blur(6px)" }} /> : null}
  </div>
);

const HorseRider: React.FC<{ lf: number; size?: number; cos?: any }> = ({ lf, size = 120, cos = {} }) => {
  const u = size / 120; const gallop = Math.abs(Math.sin(lf / 3)) * 6;
  return (
    <div style={{ position: "relative", width: size * 1.5, height: size, transform: `translateY(${-gallop}px)`, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
      <div style={{ position: "absolute", left: 20 * u, bottom: 20 * u, width: 112 * u, height: 46 * u, borderRadius: 20 * u, background: grad("#8A5A34", "#5E3C20") }} />
      <div style={{ position: "absolute", left: 120 * u, bottom: 42 * u, width: 26 * u, height: 42 * u, borderRadius: 8 * u, background: grad("#8A5A34", "#5E3C20"), transform: "rotate(-18deg)" }} />
      <div style={{ position: "absolute", left: 132 * u, bottom: 72 * u, width: 36 * u, height: 22 * u, borderRadius: 8 * u, background: grad("#8A5A34", "#5E3C20") }} />
      <div style={{ position: "absolute", left: 158 * u, bottom: 84 * u, width: 8 * u, height: 10 * u, background: "#8A5A34" }} />
      <div style={{ position: "absolute", left: 116 * u, bottom: 62 * u, width: 12 * u, height: 34 * u, background: "#3A2A18", transform: "rotate(-18deg)" }} />
      {[32, 58, 92, 116].map((x, i) => <div key={i} style={{ position: "absolute", left: x * u, bottom: 0, width: 12 * u, height: 24 * u, background: "#5E3C20", transformOrigin: "50% 0%", transform: `rotate(${(i % 2 ? 1 : -1) * gallop * 2}deg)` }} />)}
      <div style={{ position: "absolute", left: 8 * u, bottom: 24 * u, width: 14 * u, height: 32 * u, background: "#3A2A18", borderRadius: 6 * u, transform: "rotate(22deg)" }} />
      <div style={{ position: "absolute", left: 44 * u, bottom: 50 * u }}><Mascot lf={lf} size={size * 0.64} nodAmp={0} nodSpeed={9} cheer={0.4} {...cos} /></div>
    </div>
  );
};
const SpeechBubble: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = "#3A5C84", size = 18 }) => (
  <div style={{ position: "relative", padding: `${size * 0.4}px ${size * 0.75}px`, borderRadius: 12, background: "#FFFDF8", border: `2.5px solid ${color}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size, color, whiteSpace: "nowrap", boxShadow: "0 6px 14px -6px rgba(10,16,34,0.4)" }}>
    {text}
    <div style={{ position: "absolute", left: 16, bottom: -9, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `10px solid ${color}` }} />
  </div>
);
// ===== shared sprite prop for AUTOPILOT skits =====
const AdCard: React.FC<{ roas: string; good: boolean; w?: number; strike?: number; pump?: number }> = ({ roas, good, w = 150, strike = 0, pump = 0 }) => (
  <div style={{ width: w, borderRadius: 12, background: good ? "rgba(63,158,116,0.16)" : "rgba(196,74,58,0.16)", border: `2.5px solid ${good ? GREEN : RED}`, padding: "10px 14px", transform: `scale(${1 + pump * 0.3})`, boxShadow: good ? `0 0 ${10 + pump * 20}px ${GREEN}66` : "0 8px 18px -8px rgba(0,0,0,0.5)", position: "relative" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "rgba(210,225,250,0.75)" }}>ad set</div>
    <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: good ? "#8FE0B0" : "#FFB4A6" }}>{roas}</div>
    {strike > 0.1 ? <div style={{ position: "absolute", left: -4, right: -4, top: "54%", height: 4, background: RED, transform: "rotate(-10deg)", boxShadow: `0 0 8px ${RED}` }} /> : null}
  </div>
);

/* ============================================================================
   AUTOPILOT — crafted emoji-replacement props (house style: rects/paths +
   grad() + gold vocabulary F0CB63→D39A2A rim #F6E4A0 + NAVYSH + glow halos).
   Depends only on helpers already in AUTOPILOT: grad, seed, over, GOLD, CLAY,
   GREEN, RED, AMBER, META, SLATE, mono, fraunces, inter, Easing.
   Paste this block right after the AdCard component (~line 386).
   ========================================================================== */

/* -------- shared gold vocabulary (matches the coins/gates in all 4 reels) -- */
const GOLDA = "#F0CB63", GOLDB = "#D39A2A", GRIM = "#F6E4A0"; // rim highlight

/* ===== ROCKET (PRIORITY) — CLONE-style wizard-hat nose cone, all geometry ==
   `lift` adds a flame + thrust glow (COMMANDS $500/day). Without it, a clean
   idle rocket for the FUTURE orbit. ======================================== */
const RocketProp: React.FC<{ size?: number; lift?: boolean; glow?: boolean; lf?: number }> = ({ size = 120, lift = false, glow = false, lf = 0 }) => {
  const u = size / 120;                       // 120px design grid
  const flick = 1 + Math.sin(lf / 2.2) * 0.14;
  return (
    <div style={{ width: size, height: size * 1.5, position: "relative", filter: glow ? `drop-shadow(0 0 ${18 * u}px ${GOLD}) drop-shadow(0 14px 26px rgba(10,16,34,0.45))` : "drop-shadow(0 12px 22px rgba(10,16,34,0.4))" }}>
      {/* nose cone */}
      <div style={{ position: "absolute", left: 30 * u, top: 0, width: 0, height: 0, borderLeft: `${30 * u}px solid transparent`, borderRight: `${30 * u}px solid transparent`, borderBottom: `${44 * u}px solid ${CLAY}` }} />
      <div style={{ position: "absolute", left: 30 * u, top: 8 * u, width: 0, height: 0, borderLeft: `${18 * u}px solid transparent`, borderRight: `${18 * u}px solid transparent`, borderBottom: `${28 * u}px solid #E48F68` }} />
      {/* body (cream capsule, top-lit) */}
      <div style={{ position: "absolute", left: 30 * u, top: 42 * u, width: 60 * u, height: 88 * u, borderRadius: `${14 * u}px ${14 * u}px ${10 * u}px ${10 * u}px`, background: "linear-gradient(180deg,#FBF6EC,#DBCFB6)", border: `${2.5 * u}px solid rgba(40,50,70,0.4)`, boxShadow: `inset ${3 * u}px 0 ${8 * u}px rgba(255,255,255,0.5), inset -${5 * u}px 0 ${10 * u}px rgba(120,100,70,0.28)` }} />
      {/* porthole (Claude clay ring + glass) */}
      <div style={{ position: "absolute", left: 44 * u, top: 60 * u, width: 32 * u, height: 32 * u, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #BFE0FF, #5C82B8)", border: `${4 * u}px solid ${CLAY}`, boxShadow: `0 0 ${8 * u}px rgba(217,119,87,0.5), inset 0 ${2 * u}px ${4 * u}px rgba(255,255,255,0.5)` }} />
      {/* body seam + gold band */}
      <div style={{ position: "absolute", left: 30 * u, top: 104 * u, width: 60 * u, height: 6 * u, background: grad(GOLDA, GOLDB), boxShadow: `0 0 ${6 * u}px ${GOLD}` }} />
      {/* fins (css border triangles, clay, shaded) */}
      <div style={{ position: "absolute", left: 4 * u, top: 96 * u, width: 0, height: 0, borderRight: `${28 * u}px solid #B85E3E`, borderTop: `${16 * u}px solid transparent`, borderBottom: `${18 * u}px solid transparent` }} />
      <div style={{ position: "absolute", right: 4 * u, top: 96 * u, width: 0, height: 0, borderLeft: `${28 * u}px solid #C56A47`, borderTop: `${16 * u}px solid transparent`, borderBottom: `${18 * u}px solid transparent` }} />
      {/* flame */}
      {lift && (
        <div style={{ position: "absolute", left: 44 * u, top: 128 * u, transform: `scaleY(${flick})`, transformOrigin: "50% 0%" }}>
          <div style={{ position: "absolute", left: 0, width: 0, height: 0, borderLeft: `${16 * u}px solid transparent`, borderRight: `${16 * u}px solid transparent`, borderTop: `${44 * u}px solid ${GOLD}`, filter: `blur(${0.5 * u}px)` }} />
          <div style={{ position: "absolute", left: 6 * u, width: 0, height: 0, borderLeft: `${10 * u}px solid transparent`, borderRight: `${10 * u}px solid transparent`, borderTop: `${30 * u}px solid ${CLAY}` }} />
          <div style={{ position: "absolute", left: 11 * u, width: 0, height: 0, borderLeft: `${5 * u}px solid transparent`, borderRight: `${5 * u}px solid transparent`, borderTop: `${18 * u}px solid #FFF3D6` }} />
        </div>
      )}
    </div>
  );
};

/* ===== COIN + PUFF (COMMANDS thrust particles) — one prop, `puff` = smoke === */
const CoinPuff: React.FC<{ size?: number; puff?: boolean; lf?: number }> = ({ size = 26, puff = false, lf = 0 }) =>
  puff ? (
    <div style={{ width: size * 1.3, height: size * 1.3, borderRadius: "50%", background: "radial-gradient(circle at 40% 38%, rgba(232,224,210,0.9), rgba(180,170,152,0.15) 68%)", filter: "blur(1.5px)" }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: "50%", background: grad(GOLDA, GOLDB), border: `2px solid ${GRIM}`, boxShadow: `0 0 10px ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotateX(${(lf * 24) % 360}deg)` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.62, color: "#7A5410", lineHeight: 1 }}>$</span>
    </div>
  );

/* ===== MONEY STACK (PRIORITY) — SAFETY: coins the guard blocks =============
   3 stacked coins with a rising bill behind. Reads as "money" without emoji. */
const MoneyStack: React.FC<{ size?: number }> = ({ size = 64 }) => {
  const u = size / 64;
  return (
    <div style={{ width: size, height: size * 1.05, position: "relative", filter: "drop-shadow(0 8px 16px rgba(10,16,34,0.4))" }}>
      {/* bill peeking up behind */}
      <div style={{ position: "absolute", left: 12 * u, top: 0, width: 40 * u, height: 26 * u, borderRadius: 4 * u, background: "linear-gradient(180deg,#BEE7C9,#8FCBA1)", border: `${2 * u}px solid #5FA277`, boxShadow: "inset 0 0 6px rgba(255,255,255,0.4)" }}>
        <div style={{ position: "absolute", inset: `${4 * u}px`, borderRadius: 3 * u, border: `${1.5 * u}px dashed rgba(47,126,90,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13 * u, color: "#2F7E5A" }}>$</div>
      </div>
      {/* 3 stacked coins, lightest on top */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 6 * u, top: (20 + i * 13) * u, width: 52 * u, height: 22 * u, borderRadius: "50%", background: grad(i === 0 ? GOLDA : "#EAC258", GOLDB), border: `${2.5 * u}px solid ${GRIM}`, boxShadow: `0 ${3 * u}px ${6 * u}px rgba(122,84,16,0.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i === 0 && <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14 * u, color: "#7A5410" }}>$</span>}
        </div>
      ))}
    </div>
  );
};

/* ===== VAULT LOCK (PRIORITY) — SAFETY: the spend padlock on a vault plate ===
   Padlock (shackle path + navy body + gold keyhole) seated on a bolted vault
   plate, with a green safety glow. ======================================== */
const VaultLock: React.FC<{ size?: number; glow?: boolean }> = ({ size = 200, glow = true }) => {
  const u = size / 200;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: glow ? `drop-shadow(0 0 ${24 * u}px ${GREEN})` : "none" }}>
      {/* vault plate */}
      <div style={{ position: "absolute", left: 20 * u, top: 34 * u, width: 160 * u, height: 150 * u, borderRadius: 22 * u, background: grad("#3A4E74", "#26344F"), border: `${3 * u}px solid rgba(150,175,220,0.4)`, boxShadow: NAVYSH }} />
      {/* corner bolts */}
      {[[36, 50], [148, 50], [36, 158], [148, 158]].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x * u, top: y * u, width: 14 * u, height: 14 * u, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#B7C6E0,#5E6E8C)", border: `${2 * u}px solid #7E92BA` }} />
      ))}
      {/* padlock body */}
      <div style={{ position: "absolute", left: 62 * u, top: 92 * u, width: 76 * u, height: 62 * u, borderRadius: 14 * u, background: grad(GOLDA, GOLDB), border: `${3 * u}px solid ${GRIM}`, boxShadow: `0 ${6 * u}px ${14 * u}px rgba(122,84,16,0.45), inset 0 ${2 * u}px 0 rgba(255,255,255,0.4)` }} />
      {/* shackle (SVG path, metallic) */}
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={`M ${76 * u} ${96 * u} L ${76 * u} ${76 * u} A ${24 * u} ${24 * u} 0 0 1 ${124 * u} ${76 * u} L ${124 * u} ${96 * u}`} fill="none" stroke="#8FA2C4" strokeWidth={12 * u} strokeLinecap="round" />
        <path d={`M ${76 * u} ${96 * u} L ${76 * u} ${76 * u} A ${24 * u} ${24 * u} 0 0 1 ${124 * u} ${76 * u}`} fill="none" stroke="#C3D0E6" strokeWidth={4 * u} strokeLinecap="round" />
      </svg>
      {/* keyhole */}
      <div style={{ position: "absolute", left: 92 * u, top: 108 * u, width: 16 * u, height: 16 * u, borderRadius: "50%", background: "#5E4310" }} />
      <div style={{ position: "absolute", left: 96 * u, top: 118 * u, width: 8 * u, height: 20 * u, background: "#5E4310", borderRadius: 2 * u }} />
    </div>
  );
};

/* ===== CHAIN LINK (SAFETY: "$0 spent" flanked by chain) — inline, tiny ===== */
const ChainLink: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <span style={{ display: "inline-block", width: size, height: size * 0.62, borderRadius: size, border: `${size * 0.2}px solid ${GRIM}`, background: "transparent", boxShadow: `inset 0 0 ${size * 0.15}px ${GOLDB}, 0 0 ${size * 0.2}px ${GOLD}66`, verticalAlign: "middle" }} />
);

/* ===== BAN STRIKE (PRIORITY) — NOBAN stamp + SAFETY no-spend =============== */
const BanStrike: React.FC<{ size?: number }> = ({ size = 150 }) => {
  const u = size / 150;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: `drop-shadow(0 0 ${14 * u}px ${RED}) drop-shadow(0 8px 16px rgba(0,0,0,0.4))` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${16 * u}px solid ${RED}`, background: "rgba(196,74,58,0.12)", boxShadow: `inset 0 0 ${10 * u}px rgba(196,74,58,0.4)` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${3 * u}px solid #E58072`, opacity: 0.6 }} />
      {/* the slash */}
      <div style={{ position: "absolute", left: 20 * u, top: (75 - 8) * u, width: 110 * u, height: 16 * u, borderRadius: 8 * u, background: RED, transform: "rotate(-45deg)", transformOrigin: "50% 50%", boxShadow: `0 0 ${8 * u}px ${RED}` }} />
    </div>
  );
};

/* ===== SHIELD BADGE (PRIORITY) — NOBAN "SAFE" ============================== */
const ShieldBadge: React.FC<{ size?: number; label?: string }> = ({ size = 120, label = "SAFE" }) => {
  const u = size / 120;
  return (
    <div style={{ width: size, textAlign: "center", filter: `drop-shadow(0 0 ${18 * u}px ${GREEN})` }}>
      <svg viewBox="0 0 120 138" width={size} height={size * 138 / 120} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#54B98C" /><stop offset="1" stopColor="#2E7B58" /></linearGradient>
        </defs>
        {/* shield outer */}
        <path d="M60 4 L112 24 L112 66 C112 100 88 122 60 134 C32 122 8 100 8 66 L8 24 Z" fill="url(#shg)" stroke="#8FE0B0" strokeWidth={4} />
        {/* inner bevel */}
        <path d="M60 16 L100 32 L100 66 C100 92 82 110 60 120 C38 110 20 92 20 66 L20 32 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={3} />
        {/* check */}
        <path d="M40 66 L54 82 L84 46" fill="none" stroke="#F4FBF6" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36 * u, color: "#8FE0B0", marginTop: -6 * u }}>{label}</div>}
    </div>
  );
};

/* ===== SHADES (NOBAN bouncer) — geometric sunglasses ====================== */
const Shades: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 60 26" width={size * 1.5} height={size} style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}>
      <rect x={2} y={6} width={24} height={16} rx={5} fill="#14161C" stroke="#3A4456" strokeWidth={2} />
      <rect x={34} y={6} width={24} height={16} rx={5} fill="#14161C" stroke="#3A4456" strokeWidth={2} />
      <rect x={26} y={9} width={8} height={4} fill="#3A4456" />
      <rect x={6} y={9} width={9} height={4} rx={2} fill="rgba(120,170,230,0.55)" />
      <rect x={38} y={9} width={9} height={4} rx={2} fill="rgba(120,170,230,0.55)" />
    </svg>
  );
};

/* ===== SKULL TAG (NOBAN "SketchyBot" label glyph) — tiny inline mark ======= */
const SkullTag: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{ verticalAlign: "middle" }}>
    <path d="M10 2 C4 2 2 6 2 10 C2 13 4 14 4 16 L16 16 C16 14 18 13 18 10 C18 6 16 2 10 2 Z" fill="#C9D2E4" />
    <rect x={5} y={9} width={4} height={5} rx={2} fill="#1A2233" />
    <rect x={11} y={9} width={4} height={5} rx={2} fill="#1A2233" />
    <rect x={8} y={15} width={4} height={3} fill="#1A2233" />
  </svg>
);

/* ===== HAND STOP (SAFETY "needs YOU") — palm from rects ==================== */
const HandStop: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 40 44" width={size} height={size * 1.1} style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))" }}>
      {/* fingers */}
      {[6, 13, 20, 27].map((x, i) => <rect key={i} x={x} y={4 + (i === 0 || i === 3 ? 4 : 0)} width={6} height={20 - (i === 0 || i === 3 ? 4 : 0)} rx={3} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} />)}
      {/* thumb */}
      <rect x={2} y={20} width={7} height={12} rx={3.5} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} transform="rotate(-28 5 26)" />
      {/* palm */}
      <rect x={5} y={20} width={28} height={20} rx={8} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} />
    </svg>
  );
};

/* ===== PEEK EYES (REHOOK "the quiet part") — two lidded eyes ============== */
const PeekEyes: React.FC<{ size?: number; lf?: number }> = ({ size = 64, lf = 0 }) => {
  const u = size / 64;
  const look = Math.sin(lf / 12) * 3 * u;
  return (
    <div style={{ display: "flex", gap: 10 * u, filter: "drop-shadow(0 4px 8px rgba(10,16,34,0.4))" }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ width: 52 * u, height: 34 * u, borderRadius: "50%", background: "linear-gradient(180deg,#FFFFFF,#E6E2D8)", border: `${3 * u}px solid ${SLATE}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 18 * u + look, top: 8 * u, width: 18 * u, height: 18 * u, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%,#5C82B8,#1A2233)" }}>
            <div style={{ position: "absolute", left: 4 * u, top: 3 * u, width: 5 * u, height: 5 * u, borderRadius: "50%", background: "#fff" }} />
          </div>
          {/* upper lid */}
          <div style={{ position: "absolute", left: 0, right: 0, top: -14 * u, height: 16 * u, background: CLAY, borderRadius: "0 0 26px 26px" }} />
        </div>
      ))}
    </div>
  );
};

/* ===== PHONE with CLAUDE CHAT (PRIORITY) — REHOOK / optionally HOOK ========
   Bezel + notch + orange Claude header + one user bubble + one reply. ====== */
const PhoneClaude: React.FC<{ size?: number; lf?: number }> = ({ size = 124, lf = 0 }) => {
  const u = size / 124;
  return (
    <div style={{ width: size, height: size * 1.9, borderRadius: 26 * u, background: "linear-gradient(160deg,#20283A,#0E1420)", border: `${5 * u}px solid #2A3345`, boxShadow: NAVYSH, padding: 10 * u, position: "relative" }}>
      {/* notch */}
      <div style={{ position: "absolute", left: "50%", top: 8 * u, transform: "translateX(-50%)", width: 40 * u, height: 8 * u, borderRadius: 999, background: "#000" }} />
      {/* header */}
      <div style={{ marginTop: 10 * u, height: 34 * u, borderRadius: 10 * u, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", gap: 6 * u, padding: `0 ${9 * u}px` }}>
        <div style={{ width: 18 * u, height: 18 * u, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* mini Claude burst */}
          <svg viewBox="-100 -100 200 200" width={13 * u} height={13 * u}>
            {Array.from({ length: 8 }, (_, i) => <path key={i} d="M -8 -14 L 8 -14 L 10 -78 L -10 -78 Z" fill="#D97757" transform={`rotate(${i * 45})`} />)}
            <circle r={20} fill="#D97757" />
          </svg>
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 * u, color: "#fff" }}>Claude</span>
      </div>
      {/* user bubble */}
      <div style={{ marginTop: 12 * u, marginLeft: "auto", width: "78%", padding: `${7 * u}px ${9 * u}px`, borderRadius: 12 * u, borderBottomRightRadius: 3 * u, background: grad("#E9825C", "#C7541F"), fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12 * u, color: "#fff" }}>scale the winners</div>
      {/* reply bubble */}
      <div style={{ marginTop: 8 * u, width: "62%", padding: `${7 * u}px ${9 * u}px`, borderRadius: 12 * u, borderBottomLeftRadius: 3 * u, background: "#20283A", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12 * u, color: "#8FE0B0" }}>on it ✓</div>
      {/* typing dots */}
      <div style={{ marginTop: 8 * u, marginLeft: 6 * u, display: "flex", gap: 4 * u }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 6 * u, height: 6 * u, borderRadius: "50%", background: "#4A566E", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf / 6 + i)) }} />)}
      </div>
    </div>
  );
};

/* ===== TRASH CAN (COMMANDS "paused" bin) ================================== */
const TrashCan: React.FC<{ size?: number }> = ({ size = 70 }) => {
  const u = size / 70;
  return (
    <div style={{ width: size, height: size * 1.15, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))" }}>
      {/* lid + handle */}
      <div style={{ position: "absolute", left: 12 * u, top: 0, width: 28 * u, height: 5 * u, borderRadius: 999, background: "#5A6478", margin: "0 auto", left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: 4 * u, top: 6 * u, width: 62 * u, height: 10 * u, borderRadius: 5 * u, background: grad("#7E8AA2", "#5A6478"), border: `${2 * u}px solid #48526A` }} />
      {/* body (tapered) */}
      <div style={{ position: "absolute", left: 9 * u, top: 16 * u, width: 52 * u, height: 56 * u, borderRadius: `0 0 ${10 * u}px ${10 * u}px`, background: grad("#8A96AE", "#616B82"), border: `${2 * u}px solid #48526A`, clipPath: "polygon(4% 0, 96% 0, 88% 100%, 12% 100%)" }}>
        {/* ribs */}
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: `${28 + i * 20}%`, top: 6 * u, width: 3 * u, height: 44 * u, background: "rgba(30,38,54,0.35)", borderRadius: 2 }} />)}
      </div>
    </div>
  );
};

/* ===== ALARM CLOCK (BEFORE "2h/day") ===================================== */
const AlarmClock: React.FC<{ size?: number; lf?: number }> = ({ size = 60, lf = 0 }) => {
  const u = size / 60;
  const tick = Math.sin(lf / 3) * 8;
  return (
    <div style={{ width: size, height: size * 1.2, position: "relative", transform: `rotate(${tick}deg)`, filter: "drop-shadow(0 6px 12px rgba(10,16,34,0.4))" }}>
      {/* bells */}
      <div style={{ position: "absolute", left: 4 * u, top: 0, width: 16 * u, height: 12 * u, borderRadius: "50% 50% 0 0", background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, transform: "rotate(-24deg)" }} />
      <div style={{ position: "absolute", right: 4 * u, top: 0, width: 16 * u, height: 12 * u, borderRadius: "50% 50% 0 0", background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, transform: "rotate(24deg)" }} />
      {/* face */}
      <div style={{ position: "absolute", left: 6 * u, top: 8 * u, width: 48 * u, height: 48 * u, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#FBF6EC,#E2D6BE)", border: `${4 * u}px solid ${CLAY}`, boxShadow: `0 0 ${8 * u}px rgba(210,114,78,0.4)` }}>
        {/* hands (past showing ~2h) */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 15 * u, background: RED, borderRadius: 2, transformOrigin: "50% 100%", transform: "translate(-50%,-100%) rotate(60deg)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 11 * u, background: "#3A2A18", borderRadius: 2, transformOrigin: "50% 100%", transform: "translate(-50%,-100%) rotate(-20deg)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 5 * u, height: 5 * u, borderRadius: "50%", background: "#3A2A18", transform: "translate(-50%,-50%)" }} />
      </div>
    </div>
  );
};

/* ===== HAMMER (FUTURE agent building) ===================================== */
const HammerProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} style={{ filter: "drop-shadow(0 4px 7px rgba(10,16,34,0.4))" }}>
      {/* handle */}
      <rect x={20} y={16} width={7} height={26} rx={3} fill="#8A6844" stroke="#5E4630" strokeWidth={1.5} transform="rotate(20 23 30)" />
      {/* head */}
      <rect x={6} y={8} width={30} height={13} rx={3} fill="url(#hmg)" stroke="#3A4456" strokeWidth={2} transform="rotate(20 21 14)" />
      <defs><linearGradient id="hmg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B7C1D2" /><stop offset="1" stopColor="#79839A" /></linearGradient></defs>
    </svg>
  );
};

/* ===== TARGET (PRIORITY) — FUTURE audience targeting ====================== */
const TargetProp: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#F4EEE2", border: `${2 * u}px solid #C9BCA4` }} />
      <div style={{ position: "absolute", inset: 6 * u, borderRadius: "50%", background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", inset: 13 * u, borderRadius: "50%", background: "#F4EEE2" }} />
      <div style={{ position: "absolute", inset: 19 * u, borderRadius: "50%", background: RED, boxShadow: `0 0 ${6 * u}px ${RED}` }} />
      {/* dart */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 4 * u, borderRadius: 2, background: "#F6E4A0", transform: "translate(-50%,-50%)" }} />
    </div>
  );
};

/* ===== MEGAPHONE (FUTURE distribution) =================================== */
const MegaphoneProp: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))" }}>
      {/* cone */}
      <div style={{ position: "absolute", left: 4 * u, top: 14 * u, width: 0, height: 0, borderTop: `${13 * u}px solid transparent`, borderBottom: `${13 * u}px solid transparent`, borderRight: `${30 * u}px solid ${CLAY}`, transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", left: 30 * u, top: 16 * u, width: 12 * u, height: 20 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F"), border: `${2 * u}px solid #B85E3E`, transform: "rotate(-8deg)" }} />
      {/* sound waves */}
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", right: 2 * u, top: (16 + i * 6) * u, width: (6 + i * 3) * u, height: (6 + i * 3) * u, borderRight: `${2.5 * u}px solid ${GOLD}`, borderTop: `${2.5 * u}px solid ${GOLD}`, borderRadius: "0 50% 0 0", opacity: 0.8 - i * 0.2 }} />)}
    </div>
  );
};

/* ===== CREATIVE TILE (FUTURE "image/creative") — a little poster ========== */
const CreativeTile: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: 8 * u, background: PAPER, border: `${2.5 * u}px solid #C9BCA4`, padding: 5 * u, position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))", overflow: "hidden" }}>
      {/* sky */}
      <div style={{ position: "absolute", inset: 5 * u, borderRadius: 4 * u, background: "linear-gradient(180deg,#BFE0FF,#EAF4FF)" }} />
      {/* sun */}
      <div style={{ position: "absolute", left: 10 * u, top: 10 * u, width: 10 * u, height: 10 * u, borderRadius: "50%", background: grad(GOLDA, GOLDB), boxShadow: `0 0 ${5 * u}px ${GOLD}` }} />
      {/* mountains */}
      <div style={{ position: "absolute", left: 5 * u, bottom: 5 * u, width: 0, height: 0, borderLeft: `${14 * u}px solid transparent`, borderRight: `${14 * u}px solid transparent`, borderBottom: `${18 * u}px solid ${CLAY}` }} />
      <div style={{ position: "absolute", right: 5 * u, bottom: 5 * u, width: 0, height: 0, borderLeft: `${12 * u}px solid transparent`, borderRight: `${12 * u}px solid transparent`, borderBottom: `${14 * u}px solid #B85E3E` }} />
    </div>
  );
};

/* ===== DRINK (FUTURE relax) — cocktail glass ============================= */
const DrinkProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <div style={{ width: size, height: size * 1.3, position: "relative", filter: "drop-shadow(0 4px 8px rgba(10,16,34,0.35))" }}>
      {/* bowl */}
      <div style={{ position: "absolute", left: 2 * u, top: 0, width: 0, height: 0, borderLeft: `${18 * u}px solid transparent`, borderRight: `${18 * u}px solid transparent`, borderTop: `${20 * u}px solid`, borderTopColor: "rgba(230,240,255,0.35)" }} />
      {/* liquid */}
      <div style={{ position: "absolute", left: 6 * u, top: 2 * u, width: 0, height: 0, borderLeft: `${14 * u}px solid transparent`, borderRight: `${14 * u}px solid transparent`, borderTop: `${14 * u}px solid ${CLAY}` }} />
      {/* cherry + pick */}
      <div style={{ position: "absolute", left: 26 * u, top: -6 * u, width: 2 * u, height: 14 * u, background: "#9A8F78", transform: "rotate(24deg)" }} />
      <div style={{ position: "absolute", left: 28 * u, top: -8 * u, width: 8 * u, height: 8 * u, borderRadius: "50%", background: RED, boxShadow: `0 0 ${4 * u}px ${RED}88` }} />
      {/* stem + base */}
      <div style={{ position: "absolute", left: "50%", top: 20 * u, width: 3 * u, height: 22 * u, background: "rgba(230,240,255,0.4)", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 24 * u, height: 4 * u, borderRadius: 999, background: "rgba(230,240,255,0.4)", transform: "translateX(-50%)" }} />
    </div>
  );
};

/* ===== BEACH VIGNETTE (PRIORITY) — FUTURE relax base ======================
   Umbrella + sun-lounger sand strip. Sits low behind the walking mascot. == */
const BeachVignette: React.FC<{ size?: number }> = ({ size = 90 }) => {
  const u = size / 90;
  return (
    <div style={{ width: size, height: size * 0.7, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.35))" }}>
      {/* sand mound */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: size, height: 20 * u, borderRadius: "50% 50% 8px 8px / 70% 70% 8px 8px", background: grad("#F0DFA8", "#D9C081") }} />
      {/* umbrella pole */}
      <div style={{ position: "absolute", left: 40 * u, bottom: 8 * u, width: 4 * u, height: 40 * u, background: "#9A8F78", transform: "rotate(8deg)", transformOrigin: "50% 100%" }} />
      {/* umbrella canopy (striped, css cone) */}
      <div style={{ position: "absolute", left: 14 * u, top: 0, width: 56 * u, height: 26 * u, borderRadius: "50% 50% 0 0", background: `repeating-conic-gradient(from 200deg at 50% 100%, ${CLAY} 0deg 20deg, #FBF6EC 20deg 40deg)`, boxShadow: `0 ${3 * u}px ${8 * u}px rgba(10,16,34,0.3)` }} />
      {/* lounger */}
      <div style={{ position: "absolute", right: 4 * u, bottom: 6 * u, width: 34 * u, height: 8 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", right: 26 * u, bottom: 6 * u, width: 8 * u, height: 16 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F"), transform: "rotate(-32deg)", transformOrigin: "50% 100%" }} />
    </div>
  );
};
/* ===== EXTRA crafted props for AUTOPILOT (house style) ===== */
/* red notification badge — HOOK chaos (pings/alerts overload) */
const AlertBadge: React.FC<{ n?: string; size?: number }> = ({ n = "!", size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: grad("#E8604A", "#BE3220"), border: `${3 * u}px solid #F2A99B`, boxShadow: `0 0 ${11 * u}px ${RED}, 0 ${8 * u}px ${16 * u}px -6px rgba(0,0,0,0.5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * u, color: "#fff" }}>{n}</span>
    </div>
  );
};
/* gold connector plug — REVEAL cable head */
const PlugProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <div style={{ width: size, height: size * 0.8, position: "relative", filter: `drop-shadow(0 0 ${6 * u}px ${GOLD})` }}>
      <div style={{ position: "absolute", left: 10 * u, top: 5 * u, width: 24 * u, height: 22 * u, borderRadius: 5 * u, background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, boxShadow: `inset 0 ${2 * u}px 0 rgba(255,255,255,0.4)` }} />
      <div style={{ position: "absolute", left: 0, top: 9 * u, width: 12 * u, height: 4 * u, borderRadius: 2, background: grad("#D7DEEA", "#9AA6BA") }} />
      <div style={{ position: "absolute", left: 0, top: 17 * u, width: 12 * u, height: 4 * u, borderRadius: 2, background: grad("#D7DEEA", "#9AA6BA") }} />
    </div>
  );
};
/* two-bar pause glyph — COMMANDS paused markers */
const PauseIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  const u = size / 26;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(196,74,58,0.9)", border: `${2 * u}px solid #F2A99B`, boxShadow: `0 0 ${6 * u}px ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 * u }}>
      <div style={{ width: 4 * u, height: 12 * u, borderRadius: 1, background: "#fff" }} />
      <div style={{ width: 4 * u, height: 12 * u, borderRadius: 1, background: "#fff" }} />
    </div>
  );
};
/* tiny paid-SaaS app tile — REHOOK pricey-tools cards */
const AppTile: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: grad("#5A6E9C", "#3A4E74"), border: "1.5px solid rgba(150,175,220,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px -1px rgba(0,0,0,0.45)" }}>
    <div style={{ width: size * 0.42, height: size * 0.42, borderRadius: 2, background: grad(GOLDA, GOLDB) }} />
  </div>
);

// ===== v6 set-pieces: countdown ring, snail, growing Meta mansion =====
const CountdownRing: React.FC<{ p: number; vanish: number; size?: number; label?: string }> = ({ p, vanish, size = 210, label }) => (
  <div style={{ width: size, height: size, position: "relative", opacity: 1 - vanish, transform: `scale(${1 + vanish * 0.5}) rotate(${vanish * 220}deg)`, filter: `drop-shadow(0 0 22px ${META})` }}>
    <div style={{ position: "absolute", inset: size * 0.15, borderRadius: "50%", background: "radial-gradient(circle, #15274A, #0A1220)", border: "2px solid rgba(120,150,210,0.35)", boxShadow: "inset 0 0 24px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(120,150,210,0.18)", WebkitMask: "radial-gradient(circle, transparent 73%, #000 74%)", mask: "radial-gradient(circle, transparent 73%, #000 74%)" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from -90deg, ${META}, #37C6FF ${p * 360}deg, transparent ${p * 360}deg, transparent)`, WebkitMask: "radial-gradient(circle, transparent 73%, #000 74%)", mask: "radial-gradient(circle, transparent 73%, #000 74%)" }} />
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.34, color: "#EAF2FF", lineHeight: 1, textShadow: `0 0 16px ${META}` }}>{Math.max(0, Math.ceil(p * 60))}</div>
      {label ? <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size * 0.09, color: "rgba(190,205,235,0.82)", marginTop: 2 }}>{label}</div> : null}
    </div>
  </div>
);
const Snail: React.FC<{ size?: number; lf?: number }> = ({ size = 130, lf = 0 }) => {
  const u = size / 130; const wob = Math.sin(lf / 5) * 2;
  return (
    <div style={{ width: size, height: size * 0.66, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))" }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: 92 * u, height: 26 * u, borderRadius: `${18 * u}px ${18 * u}px 4px 4px`, background: grad("#C7E07A", "#8FB84E"), transform: `translateY(${wob}px)` }} />
      <div style={{ position: "absolute", left: 74 * u, bottom: 6 * u, width: 30 * u, height: 26 * u, borderRadius: "50% 50% 40% 40%", background: grad("#C7E07A", "#8FB84E") }} />
      <div style={{ position: "absolute", left: 82 * u, bottom: 28 * u, width: 3 * u, height: 16 * u, background: "#8FB84E", transformOrigin: "50% 100%", transform: "rotate(-12deg)" }}><div style={{ position: "absolute", top: -6 * u, left: -3 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: "#2A2A30" }} /></div>
      <div style={{ position: "absolute", left: 92 * u, bottom: 28 * u, width: 3 * u, height: 16 * u, background: "#8FB84E", transformOrigin: "50% 100%", transform: "rotate(12deg)" }}><div style={{ position: "absolute", top: -6 * u, left: -3 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: "#2A2A30" }} /></div>
      <div style={{ position: "absolute", left: 16 * u, bottom: 8 * u, width: 60 * u, height: 60 * u, borderRadius: "50%", background: "conic-gradient(from 200deg, #E9A65C, #C77A34, #E9A65C)", border: `${3 * u}px solid #A6631F`, boxShadow: `inset 0 0 ${10 * u}px rgba(120,60,10,0.5)` }}>
        <div style={{ position: "absolute", inset: 13 * u, borderRadius: "50%", border: `${3 * u}px solid rgba(166,99,31,0.7)` }} />
        <div style={{ position: "absolute", inset: 24 * u, borderRadius: "50%", border: `${3 * u}px solid rgba(166,99,31,0.7)` }} />
      </div>
    </div>
  );
};
const Mansion: React.FC<{ grow: number }> = ({ grow }) => {
  const floors = Math.max(1, Math.min(4, Math.floor(grow * 4) + 1)); const fh = 48; const W = 300;
  return (
    <div style={{ position: "relative", width: W, height: 44 + floors * fh, filter: "drop-shadow(0 16px 26px rgba(10,16,34,0.45))" }}>
      <div style={{ position: "absolute", left: -12, top: 4, width: 0, height: 0, borderLeft: `${W / 2 + 12}px solid transparent`, borderRight: `${W / 2 + 12}px solid transparent`, borderBottom: `42px solid ${METALO}` }} />
      <div style={{ position: "absolute", left: W / 2 - 22, top: -20, zIndex: 3 }}><div style={{ padding: 6, borderRadius: 12, background: "#fff", border: `3px solid ${META}` }}><MetaLogo size={34} /></div></div>
      {Array.from({ length: floors }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 20, top: 44 + i * fh, width: W - 40, height: fh - 4, background: grad("#DDE7F5", "#B9CBE6"), border: `2px solid ${META}` }}>
          {[0, 1, 2, 3].map((w) => <div key={w} style={{ position: "absolute", left: 16 + w * 62, top: 10, width: 42, height: fh - 26, background: grad("#8FC0FF", "#3B7BE0"), border: "2px solid #2C5AA8", borderRadius: 3 }} />)}
        </div>
      ))}
      <div style={{ position: "absolute", left: W / 2 - 22, top: 44 + (floors - 1) * fh + 2, width: 44, height: fh - 8, background: grad("#2C5AA8", "#16336B"), borderRadius: "6px 6px 0 0" }} />
    </div>
  );
};

const WIN = "#FBFAF5";
// ============================ MINT SCENES (sprite, dark cinematic)

const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: boolean }> = ({ lf, big, clay, chip = true }) => { const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5))); return (<>
  {chip && (
  <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#14B88F,#0C7D62)", border: "2px solid #7FE8CE", boxShadow: "0 6px 16px rgba(0,0,0,0.5), 0 0 12px rgba(16,163,127,0.55)" }}>
    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#EAFFF7", boxShadow: `0 0 8px #EAFFF7`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(lf / 5)) }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}>GPT-5.6 SOL · LIVE</span>
  </div>)}
  <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EEDF", textShadow: "0 3px 12px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.5)" }}>{big} <span style={{ color: "#F0A878" }}>{clay}</span></span></div>
</>); };

// Big deadline countdown for the HOOK — full-opacity animation palette, ticking
const BigCountdown: React.FC<{ lf: number }> = ({ lf }) => {
  const p = over(lf, fr(0.66), fr(0.42), Easing.out(Easing.back(1.4)));
  // clean, readable alarm countdown: ticks down one number every ~4 frames
  const cs = String(59 - (Math.floor(lf / 4) % 60)).padStart(2, "0");
  const pulse = 0.5 + 0.5 * Math.sin(lf / 4.2);          // alarm blink
  const RED1 = "#FF2A17", RED2 = "#FF3623";              // true alarm-red (border, header)
  const cells = [
    { v: "04", l: "DAYS" },
    { v: "23", l: "HRS" },
    { v: "59", l: "MIN" },
    { v: cs, l: "SEC" },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 45, transform: `scale(${p})`, opacity: p }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
        <span style={{ fontSize: 26, filter: `drop-shadow(0 0 8px rgba(255,42,22,${0.6 + pulse * 0.4}))` }}>⏰</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#FF3E2A", letterSpacing: 0.5, textShadow: `0 2px 10px rgba(0,0,0,0.7), 0 0 13px rgba(255,42,22,${0.5 + pulse * 0.4})` }}>FREE FABLE 5 ENDS IN</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {cells.map((c, i) => {
          const hot = i === 3; // seconds cell blinks brightest
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 96, height: 78, borderRadius: 12, background: "linear-gradient(180deg,#210A08,#100403)", border: `2.5px solid ${RED1}`, boxShadow: `0 8px 20px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,110,90,0.14), 0 0 ${hot ? 18 + pulse * 14 : 13}px rgba(255,42,22,${hot ? 0.6 + pulse * 0.4 : 0.5})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 44, color: hot ? "#FF5238" : "#FF3E2A", letterSpacing: -1, textShadow: `0 0 13px rgba(255,42,22,${hot ? 0.9 : 0.7}), 0 0 5px rgba(255,42,22,0.7), 0 2px 4px rgba(0,0,0,0.5)` }}>{c.v}</span>
              </div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#E8998C", letterSpacing: 2, marginTop: 6 }}>{c.l}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================ ARENA SCENES (sprite, tournament) ============================

// ============================ SOL SCENES ============================

const HookBody: React.FC<{ lf: number }> = ({ lf }) => (
(() => {
  // ---- PATTERN INTERRUPT: the sun switches ON ----
  const flash = interpolate(lf, [0, 3, 7], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nearBlack = interpolate(lf, [0, 4], [1, 0], { extrapolateRight: 'clamp' });
  // decaying screen-shake
  const shakeAmp = interpolate(lf, [2, 18], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shakeX = Math.sin(lf * 2.3) * shakeAmp;
  const shakeY = Math.cos(lf * 3.1) * shakeAmp * 0.7;
  // Sol overshoot scale-in
  const solIn = interpolate(lf, [2, 16, 24], [0, 1.16, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const solBreath = 1 + Math.sin(lf / 16) * 0.02;
  const solScale = solIn * solBreath;
  // shockwave ring
  const wave = over(lf, 2, 22, Easing.out(Easing.cubic));
  const waveR = interpolate(wave, [0, 1], [40, 620]);
  const waveOp = interpolate(wave, [0, 0.15, 1], [0, 0.9, 0]);
  // second shockwave
  const wave2 = over(lf, 10, 30, Easing.out(Easing.cubic));
  const wave2R = interpolate(wave2, [0, 1], [40, 760]);
  const wave2Op = interpolate(wave2, [0, 0.2, 1], [0, 0.55, 0]);
  // ambient continuous light flooding after burst
  const flood = interpolate(lf, [8, 90, 277], [0.2, 0.85, 1], { extrapolateRight: 'clamp' });

  // exploding light rays
  const rays = Array.from({ length: 14 }).map((_, i) => {
    const ang = (i / 14) * Math.PI * 2;
    const rp = over(lf, 2, 26, Easing.out(Easing.cubic));
    const len = interpolate(rp, [0, 1], [30, 300 + seed(i) * 120]);
    const op = interpolate(rp, [0, 0.2, 1], [0, 0.55, 0.14 + Math.sin(lf / 20 + i) * 0.05]);
    const cx = 506, cy = 400;
    return (
      <div key={i} style={{
        position: 'absolute', left: cx, top: cy, width: len, height: 4,
        transformOrigin: '0 50%', transform: `rotate(${ang}rad)`,
        background: 'linear-gradient(90deg, rgba(231,178,76,0.9), rgba(207,114,78,0))',
        opacity: op, borderRadius: 2,
      }} />
    );
  });

  // tagline pill
  const pillIn = over(lf, 40, 14, Easing.out(Easing.back(1.6)));
  // three numbered tiles
  const tile = (n, at) => {
    const p = over(lf, at, 12, Easing.out(Easing.back(1.7)));
    const pop = interpolate(p, [0, 1], [0.4, 1]);
    return { scale: pop, op: p };
  };
  const t1 = tile(0, 75), t2 = tile(0, 93), t3 = tile(0, 111);
  const tiles = [
    { x: 237, label: '1', word: 'BUILD', d: t1 },
    { x: 431, label: '2', word: 'RESEARCH', d: t2 },
    { x: 625, label: '3', word: 'AUTOMATE', d: t3 },
  ];

  // onlooker sprites reacting at bottom
  const onlooker = (x, hue, at, i) => {
    const rise = over(lf, at, 12, Easing.out(Easing.cubic));
    const bob = Math.sin(lf / 7 + i) * 4 * rise;
    const armUp = interpolate(over(lf, at + 6, 20, Easing.inOut(Easing.sin)), [0, 1], [0, 1]);
    return (
      <div key={'o' + i} style={{ position: 'absolute', left: x, top: 726 - bob, transform: `translateY(${(1 - rise) * 30}px)`, opacity: rise }}>
        {/* head */}
        <div style={{ position: 'absolute', left: 8, top: 0, width: 20, height: 20, borderRadius: '50%', background: hue, boxShadow: '0 3px 0 rgba(26,24,19,0.45)' }} />
        {/* body */}
        <div style={{ position: 'absolute', left: 4, top: 20, width: 28, height: 30, borderRadius: '12px 12px 6px 6px', background: hue, boxShadow: '0 4px 0 rgba(26,24,19,0.4)' }} />
        {/* raised arm reacting */}
        <div style={{ position: 'absolute', left: 26, top: 18 - armUp * 12, width: 7, height: 20, borderRadius: 4, background: hue, transformOrigin: 'top', transform: `rotate(${-25 - armUp * 30}deg)`, boxShadow: '0 2px 0 rgba(26,24,19,0.35)' }} />
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* ===== WARM DARK BACKDROP: warm navy -> amber, sun switching on ===== */}
      <AbsoluteFill style={{
        background: `radial-gradient(120% 90% at 50% 40%, rgba(231,178,76,${0.32 * flood}) 0%, rgba(207,149,68,${0.16 * flood}) 26%, #2A2016 55%, #1E1810 100%)`,
      }} />
      {/* upper amber sky bloom */}
      <AbsoluteFill style={{
        background: `radial-gradient(80% 55% at 50% 22%, rgba(231,178,76,${0.5 * flood}) 0%, rgba(231,178,76,0) 60%)`,
        mixBlendMode: 'screen',
      }} />

      {/* ===== EVERYTHING SHAKES DURING THE BURST ===== */}
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${shakeX}px, ${shakeY}px)` }}>

        {/* shockwave rings */}
        <div style={{ position: 'absolute', left: 506 - waveR, top: 400 - waveR, width: waveR * 2, height: waveR * 2, borderRadius: '50%', border: '6px solid #E7B24C', opacity: waveOp, boxShadow: '0 0 40px rgba(231,178,76,0.6)' }} />
        <div style={{ position: 'absolute', left: 506 - wave2R, top: 400 - wave2R, width: wave2R * 2, height: wave2R * 2, borderRadius: '50%', border: '4px solid #CF9544', opacity: wave2Op }} />

        {/* exploding rays */}
        {rays}

        {/* ===== ChatGPT logos BURSTING out of Sol — branded pattern interrupt ===== */}
        {Array.from({ length: 12 }).map((_, i) => {
          const ang = (i / 12) * Math.PI * 2 + 0.26;
          const bp = over(lf, 2 + (i % 4) * 2, 27, Easing.out(Easing.cubic));
          const dist = bp * (250 + seed(i) * 210);
          const lx = 506 + Math.cos(ang) * dist;
          const ly = 400 + Math.sin(ang) * dist;
          const sz = 48 + seed(i * 2) * 26;
          const op = interpolate(bp, [0, 0.14, 0.66, 1], [0, 1, 1, 0]);
          const spin = (seed(i) - 0.5) * 80 * bp;
          if (op < 0.01) return null;
          return (
            <div key={'cg' + i} style={{
              position: 'absolute', left: lx - sz / 2, top: ly - sz / 2, width: sz, height: sz,
              borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden', opacity: op,
              transform: `rotate(${spin}deg)`,
              border: '2px solid rgba(16,163,127,0.9)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.35), 0 0 15px rgba(16,163,127,0.55)',
            }}>
              <img src={staticFile('chatgpt_logo.png')} style={{ width: '118%', height: '118%', marginLeft: '-9%', marginTop: '-9%', display: 'block' }} />
            </div>
          );
        })}

        {/* radiant glow behind Sol */}
        <div style={{ position: 'absolute', left: 506, top: 400, width: 0, height: 0 }}>
          <div style={{ position: 'absolute', left: -280, top: -280, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(231,178,76,0.55) 0%, rgba(207,114,78,0.18) 45%, rgba(231,178,76,0) 70%)', opacity: flood }} />
        </div>

        {/* ===== SOL — the hero, centered ===== */}
        <div style={{ position: 'absolute', left: 506, top: 400, width: 0, height: 0 }}>
          <div style={{ position: 'absolute', left: -170, top: -170, width: 340, transform: `scale(${solScale})`, transformOrigin: '50% 50%' }}>
            <SolMascot lf={lf} size={340} cheer={interpolate(lf, [10, 40], [0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} gaze={Math.sin(lf / 40) * 0.5} shock={0} />
          </div>
        </div>

        {/* white flash — the sun switching ON */}
        <AbsoluteFill style={{ background: '#FFF6E2', opacity: flash, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        {/* near-black open */}
        <AbsoluteFill style={{ background: '#120E09', opacity: nearBlack, pointerEvents: 'none' }} />
      </div>

      {/* ===== TAGLINE PILL (gold fill, cream text) ~y560 ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 578, transform: `translate(-50%,-50%) scale(${interpolate(pillIn, [0, 1], [0.6, 1])})`,
        opacity: pillIn,
        background: 'linear-gradient(180deg, #EFBE5C, #CF9544)',
        padding: '15px 40px', borderRadius: 999,
        boxShadow: '0 10px 0 rgba(26,24,19,0.35), 0 0 34px rgba(231,178,76,0.45)',
        border: '2px solid rgba(255,244,220,0.55)',
      }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 34, letterSpacing: 1, color: '#2A1B0C', textShadow: '0 1px 0 rgba(255,244,220,0.5)', whiteSpace: 'nowrap' }}>
          THE MOST POWERFUL AI
        </span>
      </div>

      {/* ===== THREE NUMBERED TILES (gold) ~y660 — sequential spotlight + bob + shimmer ===== */}
      {tiles.map((tl, i) => {
        // a spotlight sweeps 1 -> 2 -> 3 -> 1 continuously; circular distance to the active slot
        const cyc = ((lf - 120) / 16) % 3;
        const raw = Math.abs(cyc - i);
        const dist = Math.min(raw, 3 - raw);
        const hl = Math.max(0, 1 - dist * 1.2) * tl.d.op;
        const bob = Math.sin(lf / 9 + i * 1.7) * 4 * tl.d.op;
        const badgePulse = 1 + Math.sin(lf / 6 + i) * 0.05 + hl * 0.16;
        const shim = ((lf * 2.4 + i * 55) % 260) - 50; // shimmer sweep x within the card
        return (
          <div key={tl.label} style={{
            position: 'absolute', left: tl.x, top: 636 + bob - hl * 11, width: 150,
            transform: `scale(${tl.d.scale * (1 + hl * 0.05)})`, transformOrigin: '50% 0', opacity: tl.d.op,
          }}>
            <div style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(180deg, #33271A, #241A10)',
              border: `2px solid rgba(231,178,76,${0.5 + hl * 0.5})`, borderRadius: 18,
              padding: '12px 8px 14px', textAlign: 'center',
              boxShadow: `0 8px 0 rgba(26,24,19,0.4), 0 0 ${10 + hl * 28}px rgba(231,178,76,${0.12 + hl * 0.55})`,
            }}>
              {/* shimmer sweep */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: shim, width: 46,
                background: 'linear-gradient(90deg, transparent, rgba(255,244,220,0.22), transparent)',
                opacity: tl.d.op, pointerEvents: 'none' }} />
              <div style={{
                width: 44, height: 44, margin: '0 auto 8px', borderRadius: '50%',
                background: 'linear-gradient(180deg, #EFBE5C, #CF9544)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `scale(${badgePulse})`,
                boxShadow: `0 4px 0 rgba(26,24,19,0.4), inset 0 2px 0 rgba(255,244,220,0.5), 0 0 ${hl * 20}px rgba(231,178,76,${hl * 0.95})`,
                fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 26, color: '#2A1B0C',
              }}>{tl.label}</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: 1.5, color: hl > 0.45 ? '#FFF4DC' : '#ECE9E2', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{tl.word}</div>
            </div>
          </div>
        );
      })}

      {/* ===== WARM SKYLINE + REACTING ONLOOKERS y700..780 ===== */}
      {/* skyline silhouette */}
      <div style={{ position: 'absolute', left: 0, top: 748, width: 1012, height: 44, display: 'flex', alignItems: 'flex-end', gap: 6, paddingLeft: 12, opacity: interpolate(lf, [14, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        {Array.from({ length: 26 }).map((_, i) => (
          <div key={'b' + i} style={{ width: 30, height: 12 + seed(i * 3) * 40, background: 'linear-gradient(180deg, #3A2C1C, #241A11)', borderRadius: '3px 3px 0 0', boxShadow: 'inset 0 3px 0 rgba(231,178,76,0.12)' }} />
        ))}
      </div>
      {onlooker(120, '#CF9544', 66, 0)}
      {onlooker(300, '#D2724E', 72, 1)}
      {onlooker(640, '#3F9E74', 70, 2)}
      {onlooker(840, '#E7B24C', 76, 3)}

      {/* ===== 3·2·1 COUNTDOWN (last ~3s of hook) — "stay, the workflows start now" ===== */}
      {(() => {
        const cutLf = 276;            // hook ends -> first workflow begins
        const start = cutLf - 90;     // 3.0s countdown (lf 186)
        if (lf < start - 14) return null;
        const inP = over(lf, start - 14, 14, Easing.out(Easing.back(1.5)));
        const outP = 1 - over(lf, cutLf - 6, 6);
        const into = Math.max(0, lf - start);          // frames into the count
        const n = Math.max(1, 3 - Math.floor(into / 30));   // 3, 2, 1
        const tick = (into % 30) / 30;
        const pop = 1 + Math.max(0, 1 - tick * 7) * 0.42;   // punch on each second
        const ring = Math.max(0, 1 - into / 90);            // ring depletes 1 -> 0 over 3s
        const C = 2 * Math.PI * 26;
        return (
          <div style={{ position: 'absolute', left: 506, top: 176, transform: `translate(-50%,-50%) scale(${inP})`, opacity: inP * Math.max(0, outP), zIndex: 60,
            display: 'flex', alignItems: 'center', gap: 15, padding: '9px 22px 9px 12px', borderRadius: 999,
            background: 'linear-gradient(180deg, rgba(32,25,16,0.94), rgba(20,15,9,0.94))',
            border: '2px solid rgba(231,178,76,0.6)', boxShadow: '0 8px 22px rgba(0,0,0,0.45), 0 0 26px rgba(231,178,76,0.28)' }}>
            <div style={{ position: 'relative', width: 60, height: 60, transform: `scale(${pop})` }}>
              <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                <circle cx="30" cy="30" r="26" fill="none" stroke="#EFBE5C" strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - ring)} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: '#FFF4DC', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>{n}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: 1.5, color: '#FFF4DC', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>FIRST WAY</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, letterSpacing: 2, color: '#F0C877' }}>STARTING…</span>
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
})()
);

const UltraBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
      {(() => {
        // ===== TIMELINE (314 frames @30fps) =====
        // 0..40   toggle flips ON near top
        // 30..70  messy tangled orb drops center
        // 70..120 big Sol appears + SPLITS into swarm
        // 120..210 swarm of 8 mini-sols in arc, working parallel (busy)
        // 210..270 merge streaming back into ONE big Sol
        // 270..314 big Sol holds finished result panel w/ check
        const CX = 506;

        // Toggle ON progress
        const togP = over(lf, 6, 22, Easing.out(Easing.cubic));
        const knobX = interpolate(togP, [0, 1], [0, 44]);
        const togGlow = interpolate(togP, [0, 1], [0, 1]);


        // Big Sol enters, then splits
        const bigInP = over(lf, 68, 18, Easing.out(Easing.cubic));
        const splitP = over(lf, 88, 26, Easing.inOut(Easing.cubic));
        const bigSolScale = interpolate(splitP, [0, 1], [1, 0.15]);
        const bigSolFade = interpolate(lf, [88, 108], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        // Swarm parameters
        const N = 8;
        const swarmArc = over(lf, 100, 24, Easing.out(Easing.back(1.2))); // fly out into arc
        const swarmMerge = over(lf, 214, 40, Easing.inOut(Easing.cubic)); // stream back to center
        // busy phase visibility
        const swarmVis = interpolate(lf, [100, 116, 236, 254], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        // Final big Sol reveal
        const finalP = over(lf, 250, 22, Easing.out(Easing.back(1.3)));
        const finalScale = interpolate(finalP, [0, 1], [0.3, 1]);
        const finalFade = interpolate(lf, [248, 262], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        // result panel
        const panelP = over(lf, 268, 20, Easing.out(Easing.cubic));
        const panelY = interpolate(panelP, [0, 1], [30, 0]);
        const checkP = over(lf, 286, 16, Easing.out(Easing.back(2)));

        // callout pills
        const pill1P = over(lf, 128, 18, Easing.out(Easing.back(1.5)));
        const pill2P = over(lf, 150, 18, Easing.out(Easing.back(1.5)));
        const pill1Float = Math.sin(lf * 0.08) * 4;
        const pill2Float = Math.sin(lf * 0.08 + 1.2) * 4;

        // Swarm arc geometry: wide arc, dropped BELOW the callout pills/toggle (arc top ~356, well clear of pill bottoms ~290)
        const arcCX = CX;
        const arcCY = 506;
        const arcRx = 330;
        const arcRy = 150;
        const miniSols = [];
        for (let i = 0; i < N; i++) {
          const t = i / (N - 1); // 0..1
          const ang = Math.PI * (1.06 + t * 0.88); // spread across top arc (upper hemisphere)
          const targetX = arcCX + Math.cos(ang) * arcRx;
          const targetY = arcCY + Math.sin(ang) * arcRy;
          // from center -> arc
          const sx = interpolate(swarmArc, [0, 1], [CX, targetX]);
          const sy = interpolate(swarmArc, [0, 1], [385, targetY]);
          // merge back center
          const mx = interpolate(swarmMerge, [0, 1], [sx, CX]);
          const my = interpolate(swarmMerge, [0, 1], [sy, 470]);
          // busy bob (parallel work)
          const bob = Math.sin(lf * 0.22 + i * 0.9) * 7 * swarmVis;
          const miniFade = interpolate(swarmMerge, [0.55, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          miniSols.push({ x: mx, y: my + bob, i, fade: swarmVis * miniFade, ang });
        }

        // chunk tick marks each mini grabs
        const chunkPulse = (i) => 0.5 + 0.5 * Math.sin(lf * 0.28 + i * 1.3);

        return (
          <>
            {/* ===== ULTRA MODE TOGGLE (top ~y190) ===== */}
            <div style={{ position: "absolute", left: 306, top: 178, width: 400, height: 58,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26,
                letterSpacing: 1, color: togP > 0.5 ? "#10A37F" : CREAM }}>ULTRA MODE</div>
              {/* switch track */}
              <div style={{ position: "relative", width: 84, height: 40, borderRadius: 20,
                background: `linear-gradient(90deg,#10A37F,#3F9E74)`,
                opacity: interpolate(togP, [0, 1], [0.35, 1]),
                boxShadow: `0 0 ${18 * togGlow}px rgba(16,163,127,${0.7 * togGlow}), inset 0 2px 4px rgba(0,0,0,0.25)`,
                border: "2px solid rgba(255,255,255,0.18)" }}>
                <div style={{ position: "absolute", top: 4, left: 4 + knobX, width: 32, height: 32,
                  borderRadius: 16, background: PAPER,
                  boxShadow: "0 3px 6px rgba(0,0,0,0.3)" }} />
              </div>
            </div>

            {/* ===== THREE SCARY DEVIL-DOCUMENTS -> get sucked INTO Sol ===== */}
            {(() => {
              const docs = [
                { rx: CX - 172, ry: 372, tilt: -10 },
                { rx: CX + 2, ry: 320, tilt: 4 },
                { rx: CX + 172, ry: 384, tilt: 11 },
              ];
              const suck = over(lf, 70, 22, Easing.in(Easing.cubic)); // vacuum into the emerging sun
              if (lf < 24 || suck >= 0.999) return null;
              return (
                <>
                  {docs.map((d, i) => {
                    const entry = over(lf, 30 + i * 7, 22, Easing.out(Easing.back(1.25)));
                    const dropY = interpolate(entry, [0, 1], [-160, 0]);
                    const jit = suck < 0.02 && lf > 50 ? Math.sin(lf * 1.25 + i * 2) * 3 : 0;
                    const bob = suck < 0.02 ? Math.sin(lf / 12 + i) * 3 : 0;
                    const x = interpolate(suck, [0, 1], [d.rx, CX]);
                    const y = interpolate(suck, [0, 1], [d.ry + dropY + bob, 385]);
                    const sc = entry * interpolate(suck, [0, 1], [1, 0.06]);
                    const op = entry * interpolate(suck, [0, 0.82, 1], [1, 0.65, 0]);
                    const rot = d.tilt + jit * 1.3 + suck * (i % 2 ? 260 : -260); // spin as it's pulled in
                    if (op < 0.01) return null;
                    return (
                      <div key={"sd" + i} style={{ position: "absolute", left: x, top: y, width: 110, height: 142,
                        transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: op, zIndex: 30 + i,
                        filter: `drop-shadow(0 9px 15px rgba(0,0,0,0.45)) drop-shadow(0 0 ${12 - suck * 9}px rgba(178,58,46,0.6))` }}>
                        {/* paper */}
                        <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(162deg,#F3ECDF,#E2D4BE)", border: "2px solid #8A7A5E", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)" }} />
                        {/* red distress corner fold */}
                        <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "22px 22px 0 0", borderColor: "#C25A48 transparent transparent transparent" }} />
                        {/* messy scribble lines up top */}
                        {[16, 28, 40].map((ty, k) => (
                          <div key={k} style={{ position: "absolute", left: 13, top: ty, height: 4, width: [74, 60, 68][k], borderRadius: 3, background: "rgba(60,50,38,0.5)" }} />
                        ))}
                        {/* DEVIL sigil */}
                        <svg viewBox="0 0 64 64" width="66" height="66" style={{ position: "absolute", left: 22, top: 58 }}>
                          <path d="M15 22 C10 10, 17 5, 22 13 C18 15, 17 19, 20 22 Z" fill="#8E2A20" />
                          <path d="M49 22 C54 10, 47 5, 42 13 C46 15, 47 19, 44 22 Z" fill="#8E2A20" />
                          <circle cx="32" cy="34" r="17" fill="#B23A2E" stroke="#6E1E16" strokeWidth="2" />
                          <path d="M21 30 L29 33 L21 35 Z" fill="#FFE08A" />
                          <path d="M43 30 L35 33 L43 35 Z" fill="#FFE08A" />
                          <path d="M23 41 L27 46 L32 41 L37 46 L41 41 L39 48 L25 48 Z" fill="#2A0806" />
                        </svg>
                      </div>
                    );
                  })}
                  <div style={{ position: "absolute", left: CX, top: 478, transform: "translateX(-50%)", textAlign: "center",
                    fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#C25A48",
                    opacity: interpolate(lf, [50, 62, 74, 84], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    messy hard job
                  </div>
                </>
              );
            })()}

            {/* ===== BIG SOL (enters, then splits) ===== */}
            {bigSolFade > 0.01 && (
              <div style={{ position: "absolute", left: CX, top: 385,
                transform: `translate(-50%,-50%) scale(${bigInP * bigSolScale})`, opacity: bigSolFade }}>
                <SolMascot lf={lf} size={160} cheer={0.4} shock={splitP} />
              </div>
            )}
            {/* split burst ring */}
            {lf > 90 && lf < 120 && (
              <div style={{ position: "absolute", left: CX, top: 385, transform: "translate(-50%,-50%)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%",
                  border: `4px solid #10A37F`,
                  transform: `scale(${interpolate(lf, [90, 118], [0.4, 9])})`,
                  opacity: interpolate(lf, [90, 118], [0.9, 0]) }} />
              </div>
            )}

            {/* ===== SWARM OF MINI-SOLS ===== */}
            {miniSols.map(({ x, y, i, fade }) => (
              <div key={i} style={{ position: "absolute", left: x, top: y,
                transform: `translate(-50%,-50%)`, opacity: fade }}>
                <div style={{ position: "relative" }}>
                  <SolMascot lf={lf + i * 11} size={72} cheer={0.5} gaze={Math.sin(lf * 0.05 + i)} />
                  {/* chunk each grabs — small work tile */}
                  <div style={{ position: "absolute", left: 44, top: 40, width: 26, height: 20,
                    borderRadius: 5, background: GOLD, border: `2px solid ${INK}`,
                    transform: `translateY(${Math.sin(lf * 0.3 + i) * 3}px)`,
                    boxShadow: `0 0 ${6 * chunkPulse(i)}px rgba(231,178,76,0.8)` }} />
                  {/* busy work bars */}
                  <div style={{ position: "absolute", left: -6, top: 66, width: 84, height: 6,
                    borderRadius: 3, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${40 + 55 * chunkPulse(i)}%`,
                      background: "#10A37F", borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            ))}

            {/* stream lines during merge */}
            {lf > 214 && lf < 256 && miniSols.map(({ i, ang }) => {
              const mp = over(lf, 214, 40, Easing.inOut(Easing.cubic));
              const fromX = arcCX + Math.cos(ang) * arcRx * (1 - mp);
              const fromY = arcCY + Math.sin(ang) * arcRy * (1 - mp) + 400 * mp * 0;
              return (
                <div key={"s" + i} style={{ position: "absolute", left: CX, top: 470,
                  width: 3, height: 40, transformOrigin: "top center",
                  transform: `rotate(${(ang * 180) / Math.PI - 90}deg) translateY(-${44 * (1 - mp)}px)`,
                  background: `linear-gradient(#10A37F,transparent)`,
                  opacity: interpolate(mp, [0, 0.3, 0.9], [0, 0.8, 0]) }} />
              );
            })}

            {/* ===== FINAL BIG SOL + RESULT PANEL ===== */}
            {finalFade > 0.01 && (
              <>
                <div style={{ position: "absolute", left: CX, top: 470,
                  transform: `translate(-50%,-50%) scale(${finalScale})`, opacity: finalFade }}>
                  <SolMascot lf={lf} size={152} cheer={0.9} point={panelP} />
                </div>
                {/* finished result panel with check — held UP beside/above Sol */}
                <div style={{ position: "absolute", left: CX + 96, top: 392 + panelY,
                  width: 232, height: 150, borderRadius: 16,
                  background: PAPER, border: `3px solid ${INK}`,
                  boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
                  opacity: panelP, transform: `rotate(-3deg)`,
                  padding: 14, boxSizing: "border-box" }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15,
                    color: INK, marginBottom: 8 }}>Result.final</div>
                  {[0, 1, 2].map((r) => (
                    <div key={r} style={{ height: 9, borderRadius: 4, marginBottom: 8,
                      width: `${[92, 78, 64][r]}%`,
                      background: r === 0 ? GOLD : r === 1 ? AMBER : "#D9D2C4" }} />
                  ))}
                  {/* check badge */}
                  <div style={{ position: "absolute", right: -18, bottom: -18, width: 52, height: 52,
                    borderRadius: 26, background: "#10A37F", border: `3px solid ${INK}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: `scale(${checkP})`, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none"
                      stroke={PAPER} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12 L10 18 L20 6" />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {/* ===== PROMINENT CALLOUT PILLS (mid-panel, up near action) ===== */}
            <div style={{ position: "absolute", left: 70 + pill1Float, top: 232,
              transform: `scale(${pill1P})`, transformOrigin: "left center",
              opacity: interpolate(lf, [128, 140, 300, 314], [0, 1, 1, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              background: `linear-gradient(100deg,${GOLD},${AMBER})`,
              border: `3px solid ${INK}`, borderRadius: 40, padding: "12px 22px",
              boxShadow: "0 8px 18px rgba(0,0,0,0.28)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: INK }}>1 AI = a whole team</span>
            </div>

            <div style={{ position: "absolute", right: 60 - pill2Float, top: 236,
              transform: `scale(${pill2P})`, transformOrigin: "right center",
              opacity: interpolate(lf, [150, 162, 300, 314], [0, 1, 1, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              background: "#10A37F", border: `3px solid ${INK}`, borderRadius: 40, padding: "12px 22px",
              boxShadow: "0 8px 18px rgba(0,0,0,0.28)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: PAPER }}>a week of work {">"} minutes</span>
            </div>

            {/* subtle parallax spark dust behind swarm for depth */}
            {[...Array(6)].map((_, k) => {
              const sp = (lf * 0.4 + seed(k) * 200) % 360;
              return (
                <div key={"d" + k} style={{ position: "absolute",
                  left: 140 + seed(k + 3) * 720,
                  top: 300 + Math.sin((lf * 0.03) + k) * 40 + seed(k) * 160,
                  width: 6, height: 6, borderRadius: "50%",
                  background: k % 2 ? GOLD : "#10A37F",
                  opacity: 0.35 * swarmVis + 0.1 }} />
              );
            })}
          </>
        );
      })()}
    </>
);

const StackBody: React.FC<{ lf: number }> = ({ lf }) => (
(() => {
  const solIn   = over(lf, 0, 22, Easing.out(Easing.cubic));
  const lunaIn  = over(lf, 14, 22, Easing.out(Easing.cubic));
  const planForm= over(lf, 26, 30, Easing.out(Easing.cubic));
  const handoff = over(lf, 96, 46, Easing.inOut(Easing.cubic));
  const zip     = over(lf, 150, 90);
  const barIn   = over(lf, 210, 34, Easing.out(Easing.cubic));
  const pillIn  = over(lf, 250, 30, Easing.out(Easing.back(1.4)));
  const breath  = Math.sin(lf/13) * 4;
  const bob     = Math.sin(lf/17) * 5;
  const cardX = interpolate(handoff, [0,1], [232, 690]);
  const cardY = interpolate(handoff, [0,1], [212, 250]);
  const cardScale = interpolate(handoff, [0,1], [1, 0.86]);
  const cardGlow = 0.5 + 0.5*Math.sin(lf/8);
  const tasks = [0,1,2,3];
  return (
    <AbsoluteFill>
      <div style={{position:'absolute', left:120, top:210, width:780, height:340,
        borderRadius:200, background:'radial-gradient(ellipse at 30% 40%, rgba(231,178,76,0.16), rgba(63,158,116,0.05) 60%, transparent 72%)',
        filter:'blur(2px)', opacity: solIn}}/>

      <div style={{position:'absolute', left:150, top:300 + bob, width:150, height:150,
        transform:`scale(${solIn})`, transformOrigin:'50% 60%'}}>
        <SolMascot lf={lf} size={150} think={1} gaze={0.35} cheer={0.2}/>
      </div>

      <div style={{position:'absolute', left:120, top:262, opacity:solIn,
        transform:`translateY(${(1-solIn)*-12}px)`}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:8,
          background:'#E7B24C', color:'#1A1813', fontFamily:inter.fontFamily, fontWeight:800,
          fontSize:24, padding:'8px 16px', borderRadius:14,
          boxShadow:'0 6px 0 #CF9544, 0 10px 20px rgba(207,149,68,0.35)',
          border:'2px solid #F7F3EA', letterSpacing:0.3, whiteSpace:'nowrap'}}>
          {'$$$'} FLAGSHIP
        </div>
      </div>

      <div style={{position:'absolute', left:150, top:452, width:150, textAlign:'center',
        opacity:solIn, fontFamily:fraunces.fontFamily, fontWeight:700, fontSize:34,
        color:'#E7B24C', letterSpacing:0.5, textShadow:'0 2px 0 rgba(207,149,68,0.45)'}}>
        Sol
      </div>
      <div style={{position:'absolute', left:130, top:492, width:190, textAlign:'center',
        opacity:solIn*0.9, fontFamily:inter.fontFamily, fontWeight:600, fontSize:15,
        color:'#ECE9E2'}}>
        plans the hard part
      </div>

      <div style={{position:'absolute', left:700, top:322 + breath, width:110, height:110,
        transform:`scale(${lunaIn})`, transformOrigin:'50% 60%'}}>
        <LunaMascot lf={lf} size={110} cheer={zip} gaze={-0.25}/>
      </div>

      <div style={{position:'absolute', left:768, top:284, opacity:lunaIn,
        transform:`translateY(${(1-lunaIn)*-12}px)`}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:8,
          background:'#3F9E74', color:'#F7F3EA', fontFamily:inter.fontFamily, fontWeight:800,
          fontSize:23, padding:'8px 15px', borderRadius:14,
          boxShadow:'0 6px 0 #2f7a58, 0 10px 20px rgba(63,158,116,0.35)',
          border:'2px solid rgba(247,243,234,0.7)', letterSpacing:0.2, whiteSpace:'nowrap'}}>
          1¢ CHEAP + FAST
        </div>
      </div>

      <div style={{position:'absolute', left:700, top:452, width:110, textAlign:'center',
        opacity:lunaIn, fontFamily:fraunces.fontFamily, fontWeight:700, fontSize:32,
        color:'#3F9E74', letterSpacing:0.5}}>
        Luna
      </div>
      <div style={{position:'absolute', left:660, top:492, width:190, textAlign:'center',
        opacity:lunaIn*0.9, fontFamily:inter.fontFamily, fontWeight:600, fontSize:15,
        color:'#ECE9E2'}}>
        runs the grunt work
      </div>

      <div style={{position:'absolute', left:598, top:530, width:320, height:0}}>
        {tasks.map((t)=>{
          const start = t/4;
          const done = interpolate(zip, [start, start+0.22], [0,1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
          const pop = done>0.5 ? 1 + 0.14*Math.max(0, 1-(zip-start)*7) : 1;
          return (
            <div key={t} style={{position:'absolute', left: t*56, top: -6,
              width:48, height:34, borderRadius:9,
              background: done>0.5 ? '#3F9E74' : 'rgba(247,243,234,0.14)',
              border:`2px solid ${done>0.5 ? '#F7F3EA' : 'rgba(236,233,226,0.3)'}`,
              opacity: lunaIn, transform:`scale(${pop})`,
              display:'flex', alignItems:'center', justifyContent:'center'}}>
              <span style={{fontFamily:inter.fontFamily, fontWeight:900, fontSize:20,
                color: done>0.5 ? '#F7F3EA' : 'rgba(236,233,226,0.4)'}}>
                {done>0.5 ? '✓' : ''}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{position:'absolute', left:cardX, top:cardY, width:150, height:96,
        transform:`scale(${cardScale}) rotate(${handoff*6-2}deg)`, transformOrigin:'50% 50%',
        opacity: planForm}}>
        <div style={{width:'100%', height:'100%', borderRadius:14,
          background:'linear-gradient(150deg,#F7F3EA,#ECE9E2)',
          border:'2px solid #E7B24C',
          boxShadow:`0 0 ${18+cardGlow*22}px rgba(231,178,76,${0.35+cardGlow*0.4}), 0 10px 22px rgba(0,0,0,0.35)`,
          padding:'10px 12px', boxSizing:'border-box'}}>
          <div style={{fontFamily:inter.fontFamily, fontWeight:800, fontSize:13,
            color:'#CF9544', letterSpacing:1, marginBottom:6}}>PLAN</div>
          <div style={{height:5, width:'86%', background:'#1A1813', opacity:0.75, borderRadius:3, marginBottom:5}}/>
          <div style={{height:5, width:'64%', background:'#1A1813', opacity:0.55, borderRadius:3, marginBottom:5}}/>
          <div style={{height:5, width:'74%', background:'#3F9E74', borderRadius:3}}/>
        </div>
      </div>

      <div style={{position:'absolute', left:400, top:250, opacity: interpolate(handoff,[0,0.15,0.85,1],[0,1,1,0]),
        fontFamily:inter.fontFamily, fontWeight:900, fontSize:40, color:'#E7B24C',
        textShadow:'0 2px 8px rgba(231,178,76,0.5)'}}>
        {'→'}
      </div>

      <div style={{position:'absolute', left:150, top:566, width:712,
        opacity:barIn, transform:`translateY(${(1-barIn)*20}px)`}}>
        <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
          <div style={{width:158, textAlign:'right', fontFamily:inter.fontFamily,
            fontWeight:800, fontSize:19, color:'#ECE9E2'}}>all on Sol</div>
          <div style={{flex:1, height:30, borderRadius:8, position:'relative',
            background:'rgba(247,243,234,0.10)', overflow:'hidden'}}>
            <div style={{position:'absolute', left:0, top:0, bottom:0,
              width: `${interpolate(barIn,[0,1],[0,96])}%`, borderRadius:8,
              background:'linear-gradient(90deg,#CF9544,#D2724E)'}}/>
          </div>
          <div style={{width:76, fontFamily:inter.fontFamily, fontWeight:900, fontSize:26,
            color:'#D2724E'}}>{'$$$$'}</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:158, textAlign:'right', fontFamily:inter.fontFamily,
            fontWeight:800, fontSize:19, color:'#ECE9E2'}}>Sol + Luna</div>
          <div style={{flex:1, height:30, borderRadius:8, position:'relative',
            background:'rgba(247,243,234,0.10)', overflow:'hidden'}}>
            <div style={{position:'absolute', left:0, top:0, bottom:0,
              width: `${interpolate(barIn,[0,1],[0,22])}%`, borderRadius:8,
              background:'linear-gradient(90deg,#3F9E74,#10A37F)',
              boxShadow:'0 0 14px rgba(63,158,116,0.5)'}}/>
          </div>
          <div style={{width:76, fontFamily:inter.fontFamily, fontWeight:900, fontSize:26,
            color:'#3F9E74'}}>{'$'}</div>
        </div>
      </div>

      <div style={{position:'absolute', left:0, top:698, width:1012, textAlign:'center',
        opacity:pillIn, transform:`translateY(${(1-pillIn)*16}px) scale(${0.9+pillIn*0.1})`}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:10,
          background:'linear-gradient(90deg,#E7B24C,#3F9E74)', color:'#1A1813',
          fontFamily:inter.fontFamily, fontWeight:900, fontSize:24,
          padding:'12px 26px', borderRadius:999,
          boxShadow:'0 8px 22px rgba(63,158,116,0.35), inset 0 2px 0 rgba(247,243,234,0.6)',
          border:'2px solid #F7F3EA', letterSpacing:0.2, whiteSpace:'nowrap'}}>
          {'✨'} flagship quality, a fraction of the cost
        </div>
      </div>
    </AbsoluteFill>
  );
})()
);

const AgentBody: React.FC<{ lf: number }> = ({ lf }) => (
(() => {
  const D = 218;
  // ---- global escalation clock ----
  const rush = over(lf, 40, 60, Easing.out(Easing.cubic));            // Sol takes the wheel
  const flurry = over(lf, 96, 96);                                     // tasks flying window
  // browser window geometry
  const winX = 300, winW = 640;
  const winY = 214, winH = 372;
  const winRise = over(lf, 4, 20, Easing.out(Easing.back(1.3)));
  const winFloat = Math.sin(lf / 26) * 4;

  // driven cursor path inside window (address bar -> form fields -> submit, looping)
  const cbeat = (lf * 1.9) % 120;
  const seg = (a, b, from, to) => interpolate(cbeat, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const curX = cbeat < 30 ? seg(0, 30, 470, 560)
    : cbeat < 55 ? seg(30, 55, 560, 405)
    : cbeat < 80 ? seg(55, 80, 405, 620)
    : cbeat < 100 ? seg(80, 100, 620, 500)
    : seg(100, 120, 500, 470);
  const curY = cbeat < 30 ? seg(0, 30, 262, 262)
    : cbeat < 55 ? seg(30, 55, 262, 372)
    : cbeat < 80 ? seg(55, 80, 372, 430)
    : cbeat < 100 ? seg(80, 100, 430, 500)
    : seg(100, 120, 500, 262);
  const clickPulse = (() => { const m = cbeat % 25; return m < 5 ? 1 - m / 5 : 0; })();

  // form fields fill progressively, checkmarks pop, on a fast repeating cycle
  const fieldFill = (i) => { const t = ((lf * 1.6) - i * 9) % 60; return t < 0 ? 0 : Math.min(1, t / 14); };
  const check = (i) => { const t = ((lf * 1.6) - i * 9) % 60; return over(t, 16, 6, Easing.out(Easing.back(2))); };

  // DONE tasks pile up (stack grows the whole time -> escalation)
  const doneLabels = ["Booked flights", "Filed report", "Replied to inbox", "Scraped leads", "Paid invoices", "Deployed site"];
  const doneCount = Math.min(6, Math.floor(over(lf, 30, 175) * 6.4));

  // tabs open one by one across the top
  const tabs = ["Gmail", "Sheets", "CRM", "Calendar"];
  const tabOpen = (i) => over(lf, 44 + i * 14, 10, Easing.out(Easing.back(1.6)));

  // human walks off to the right edge and kicks back with coffee
  const walk = over(lf, 30, 60, Easing.inOut(Easing.cubic));
  const humanX = interpolate(walk, [0, 1], [300, 956], { extrapolateRight: "clamp" }); // center-left -> far right, beside the console
  const humanBob = Math.sin(lf / 5) * (1 - over(lf, 78, 14)) * 5;                       // bob while walking, settle when seated
  const seated = over(lf, 84, 14, Easing.out(Easing.cubic));
  const steam = (lf % 34) / 34;

  const solGrip = 0.5 + rush * 0.5;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* soft focus glow behind the console */}
      <div style={{ position: "absolute", left: winX + winW / 2 - 340, top: winY + winH / 2 - 300, width: 680, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,163,127,0.18), transparent 62%)", filter: "blur(14px)" }} />

      {/* ================= BROWSER WINDOW (Sol drives it) ================= */}
      <div style={{
        position: "absolute", left: winX, top: winY + (1 - winRise) * 40 + winFloat,
        width: winW, height: winH, opacity: winRise,
        transform: `scale(${0.9 + winRise * 0.1})`, transformOrigin: "50% 60%",
        borderRadius: 20, background: grad("#12203A", "#0A1120"),
        border: "2px solid rgba(120,150,190,0.30)", boxShadow: NAVYSH, overflow: "hidden",
      }}>
        {/* title bar + traffic lights + tabs */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 42, background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }} />
        {["#E7715A", "#E7B24C", "#3F9E74"].map((c, i) => (
          <div key={i} style={{ position: "absolute", left: 16 + i * 20, top: 15, width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        {tabs.map((t, i) => {
          const o = tabOpen(i);
          return (
            <div key={t} style={{ position: "absolute", left: 92 + i * 118, top: 9 - (1 - o) * 8, width: 106, height: 26, opacity: o, borderRadius: "8px 8px 0 0", background: i === (Math.floor(lf / 22) % tabs.length) ? "rgba(16,163,127,0.28)" : "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", color: "#CFE7DD", fontFamily: inter.fontFamily, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t}</div>
          );
        })}

        {/* address bar filling itself */}
        <div style={{ position: "absolute", left: 18, top: 54, width: winW - 36, height: 30, borderRadius: 15, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", paddingLeft: 14, color: "#9FD8C6", fontFamily: mono, fontSize: 13, letterSpacing: 0.3, overflow: "hidden", whiteSpace: "nowrap" }}>
          <span style={{ color: "#3F9E74", marginRight: 8 }}>▶</span>
          {("app.crm.io/new-deal".slice(0, Math.floor(over(lf, 40, 34) * 19)))}
          <span style={{ opacity: (lf % 16) < 8 ? 1 : 0, color: "#9FD8C6" }}>|</span>
        </div>

        {/* auto-filling form panel */}
        <div style={{ position: "absolute", left: 18, top: 96, width: 300, bottom: 16, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", padding: 12 }}>
          {[0, 1, 2, 3].map((i) => {
            const f = fieldFill(i);
            const ck = check(i);
            return (
              <div key={i} style={{ position: "relative", marginBottom: 12 }}>
                <div style={{ color: "#8FA6C4", fontFamily: inter.fontFamily, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>{["NAME", "EMAIL", "COMPANY", "AMOUNT"][i]}</div>
                <div style={{ height: 22, borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${f * 100}%`, background: "linear-gradient(90deg, rgba(16,163,127,0.55), rgba(16,163,127,0.15))" }} />
                  <div style={{ position: "absolute", left: 8, top: 4, color: "#DCEFE8", fontFamily: mono, fontSize: 12, whiteSpace: "nowrap", opacity: 0.9 }}>{["Ava Chen", "ava@acme.co", "Acme Inc", "$48,000"][i].slice(0, Math.floor(f * 12))}</div>
                </div>
                {ck > 0 && (
                  <div style={{ position: "absolute", right: -6, top: 14, width: 20, height: 20, borderRadius: "50%", background: GREEN, transform: `scale(${ck})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 900, boxShadow: "0 3px 8px rgba(63,158,116,0.5)" }}>✓</div>
                )}
              </div>
            );
          })}
          {/* submit button pulsing */}
          <div style={{ marginTop: 4, height: 30, borderRadius: 8, background: grad("#10A37F", "#0C8267"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontSize: 13, fontWeight: 800, transform: `scale(${1 + ((lf % 40) < 6 ? 0.06 : 0)})`, boxShadow: "0 5px 14px rgba(16,163,127,0.4)" }}>Submit ⏎</div>
        </div>

        {/* live task ticker (right of form) */}
        <div style={{ position: "absolute", left: 330, top: 96, width: 292, bottom: 16, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "10px 12px", overflow: "hidden" }}>
          <div style={{ color: "#8FA6C4", fontFamily: inter.fontFamily, fontSize: 10, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>SOL IS DOING</div>
          {doneLabels.slice(0, doneCount).map((t, i) => {
            const pop = over(lf, 30 + i * 26, 12, Easing.out(Easing.back(1.5)));
            const row = doneCount - 1 - i; // newest on top
            return (
              <div key={t} style={{ position: "absolute", left: 12, top: 34 + row * 34, opacity: pop, transform: `translateX(${(1 - pop) * 30}px)`, width: 268, height: 28, borderRadius: 7, background: "rgba(63,158,116,0.16)", border: "1px solid rgba(63,158,116,0.4)", display: "flex", alignItems: "center", paddingLeft: 8, gap: 8 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                <span style={{ color: "#DCEFE8", fontFamily: inter.fontFamily, fontSize: 12.5, fontWeight: 700 }}>{t}</span>
              </div>
            );
          })}
        </div>

        {/* the DRIVEN cursor */}
        <div style={{ position: "absolute", left: curX, top: curY, transform: `translate(-2px,-2px) scale(${1 - clickPulse * 0.2})`, zIndex: 5, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))" }}>
          <svg width="22" height="30" viewBox="0 0 22 30"><path d="M2 2 L2 22 L7 17 L11 27 L14 26 L10 16 L18 16 Z" fill="#fff" stroke="#12203A" strokeWidth="1.5" /></svg>
          {clickPulse > 0 && <div style={{ position: "absolute", left: -8, top: -8, width: 30, height: 30, borderRadius: "50%", border: "2px solid #10A37F", opacity: clickPulse, transform: `scale(${1.4 - clickPulse})` }} />}
        </div>
      </div>

      {/* connector: Sol's ray -> window (shows it's DRIVING) */}
      <svg style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, pointerEvents: "none", zIndex: 3 }}>
        <line x1={252} y1={470} x2={winX + 6} y2={430} stroke="rgba(231,178,76,0.55)" strokeWidth={5} strokeDasharray="2 9" strokeLinecap="round" strokeDashoffset={-lf * 3} />
      </svg>

      {/* ================= SOL at the wheel ================= */}
      <div style={{ position: "absolute", left: 118, top: 372, transform: `scale(${0.94 + rush * 0.06})`, transformOrigin: "50% 90%", zIndex: 4 }}>
        <SolMascot lf={lf} size={150} point={0.55 + solGrip * 0.4} gaze={0.6} cheer={0.2 + flurry * 0.35} />
        {/* mini steering "console" under Sol's stub hands */}
        <div style={{ position: "absolute", left: 30, top: 128, width: 92, height: 20, borderRadius: 10, background: grad("#2A3E5E", "#16233C"), border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 6px 14px rgba(18,28,58,0.4)" }}>
          <div style={{ position: "absolute", left: 8 + (Math.sin(lf / 7) + 1) * 30, top: 5, width: 12, height: 10, borderRadius: 3, background: GOLD }} />
        </div>
      </div>

      {/* status chip near Sol */}
      <div style={{ position: "absolute", left: 96, top: 330, transform: `scale(${over(lf, 46, 12, Easing.out(Easing.back(1.8)))})`, transformOrigin: "0 50%", background: grad("#10A37F", "#0C8267"), color: "#fff", fontFamily: inter.fontFamily, fontSize: 15, fontWeight: 900, padding: "7px 14px", borderRadius: 20, boxShadow: "0 8px 18px rgba(16,163,127,0.45)", display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff", opacity: (lf % 20) < 10 ? 1 : 0.35 }} />AGENT LIVE
      </div>

      {/* ================= HUMAN walks off + kicks back ================= */}
      <div style={{ position: "absolute", left: humanX, top: 470 - humanBob + seated * 40, transform: "translateX(-50%)", zIndex: 2 }}>
        <div style={{ position: "relative" }}>
          <Mascot lf={lf} size={64} gaze={interpolate(walk, [0, 1], [-0.6, 1], { extrapolateRight: "clamp" })} nodAmp={2} nodSpeed={8} cheer={seated * 0.7} />
          {/* coffee mug appears once seated */}
          {seated > 0.15 && (
            <div style={{ position: "absolute", left: -10, top: 30, transform: `scale(${seated})`, transformOrigin: "100% 100%" }}>
              <div style={{ width: 20, height: 18, borderRadius: "3px 3px 5px 5px", background: grad("#E7B24C", "#CF9544"), border: "1.5px solid #12203A" }} />
              <div style={{ position: "absolute", left: -6, top: 3, width: 8, height: 8, border: "2px solid #12203A", borderRadius: "50%", borderRightColor: "transparent" }} />
              {/* steam */}
              {[0, 1].map((s) => (
                <div key={s} style={{ position: "absolute", left: 5 + s * 8, top: -10 - steam * 10, width: 3, height: 8, borderRadius: 2, background: "rgba(255,255,255,0.5)", opacity: (1 - steam) * 0.7 }} />
              ))}
            </div>
          )}
        </div>
        {/* "gone" tag over the human */}
        <div style={{ position: "absolute", left: "50%", top: -30, transform: `translateX(-50%) scale(${over(lf, 92, 12, Easing.out(Easing.back(1.8)))})`, background: "#1A1813", color: PAPER, fontFamily: inter.fontFamily, fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 12, whiteSpace: "nowrap" }}>you: gone ☕</div>
      </div>

      {/* ================= bottom banner tag ================= */}
      <div style={{ position: "absolute", left: "50%", top: 706, transform: `translateX(-50%) translateY(${(1 - over(lf, 120, 16, Easing.out(Easing.back(1.4)))) * 24}px)`, opacity: over(lf, 120, 16), display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: grad("#E7B24C", "#CF9544"), color: "#1A1813", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, padding: "8px 20px", borderRadius: 16, boxShadow: NAVYSH }}>delegating <span style={{ color: "#12203A" }}>{">"}</span> asking</div>
        <div style={{ background: "#12203A", color: "#9FD8C6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, padding: "9px 14px", borderRadius: 14, transform: `scale(${1 + (over(lf, 150, 8) - over(lf, 158, 8)) * 0.12})` }}>it DOES it</div>
      </div>

      {/* floating success sparks that escalate with the flurry */}
      {Array.from({ length: 7 }, (_, i) => {
        const t = ((lf * (1.1 + i * 0.14)) + i * 20) % 90;
        const a = flurry * (t < 45 ? t / 45 : (90 - t) / 45);
        return (
          <div key={i} style={{ position: "absolute", left: winX + 120 + seed(i) * 420, top: winY + 300 - t * 2.4, width: 8, height: 8, opacity: a * 0.9, color: GREEN, fontSize: 12, fontWeight: 900, zIndex: 6 }}>✓</div>
        );
      })}
    </div>
  );
})()
);

const RehookBody: React.FC<{ lf: number }> = ({ lf }) => (
(() => {
  const intro = interpolate(lf,[0,18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const winnerBreak = interpolate(lf,[70,120],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
  const iconsIn = interpolate(lf,[118,150],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const edgeIn = interpolate(lf,[130,158],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const bob = Math.sin(lf/16)*4;
  const cx = 506;
  const startY = 545;
  const finishY = 355;
  const packXs = [128,222,316,410,602,696,790];
  const pack = packXs.map((px,i)=>{
    const s = seed(i*3+1);
    const nudge = Math.sin(lf/13 + s*6.28)*6 + (1-intro)*(-40);
    const py = startY + Math.sin(lf/17 + s*4)*3;
    const solBob = Math.sin(lf/12 + s*5)*3;
    return (
      <div key={'p'+i} style={{position:'absolute',left:px, top:py+nudge, transform:'translate(-50%,-50%)', opacity:intro}}>
        <div style={{position:'absolute',left:0,top:-58+solBob,transform:'translateX(-50%)'}}>
          <SolMascot lf={lf} size={44} gaze={0}/>
        </div>
        <Mascot lf={lf} size={64}/>
      </div>
    );
  });
  const heroX = interpolate(winnerBreak,[0,1],[cx-8, cx]);
  const heroY = interpolate(winnerBreak,[0,1],[startY-2, finishY]) + bob;
  const orbIcons = [0,1,2].map(k=>{
    const ang = lf/22 + k*(Math.PI*2/3);
    const R = 96;
    const ox = Math.cos(ang)*R;
    const oy = Math.sin(ang)*R*0.62;
    const glyph = k===0
      ? (<g><circle cx="0" cy="-6" r="4" fill={PAPER}/><circle cx="-6" cy="6" r="4" fill={PAPER}/><circle cx="6" cy="6" r="4" fill={PAPER}/></g>)
      : k===1
      ? (<g><circle cx="-6" cy="0" r="6.5" fill={GOLD}/><circle cx="7" cy="0" r="5" fill={SLATE}/><circle cx="9" cy="0" r="4" fill="#2f2f42"/></g>)
      : (<g><rect x="-11" y="-8" width="22" height="16" rx="2.5" fill={PAPER}/><rect x="-11" y="-8" width="22" height="5" rx="2.5" fill={SLATE}/></g>);
    return (
      <div key={'o'+k} style={{position:'absolute',left:heroX+ox, top:heroY+oy, transform:`translate(-50%,-50%) scale(${iconsIn})`, opacity:iconsIn}}>
        <div style={{width:30,height:30,borderRadius:9,background:`linear-gradient(158deg, ${AMBER}, ${CLAY})`, display:'flex',alignItems:'center',justifyContent:'center', boxShadow:'0 4px 10px rgba(20,26,45,0.35), 0 0 14px rgba(231,178,76,0.5)', border:'1.5px solid rgba(247,243,234,0.55)'}}>
          <svg width="30" height="30" viewBox="-16 -16 32 32">{glyph}</svg>
        </div>
      </div>
    );
  });
  return (
    <AbsoluteFill>
      <div style={{position:'absolute',left:cx,top:400,width:900,height:640,transform:'translate(-50%,-50%)',background:'radial-gradient(ellipse at center, rgba(58,92,132,0.22), rgba(58,92,132,0) 68%)'}}/>
      <div style={{position:'absolute',left:heroX,top:heroY-4,width:420,height:420,transform:'translate(-50%,-50%)',background:`radial-gradient(circle at center, rgba(231,178,76,${0.10+winnerBreak*0.30}), rgba(231,178,76,0) 70%)`}}/>
      <div style={{position:'absolute',left:70,top:startY+70,width:872,height:8,borderRadius:4,background:`repeating-linear-gradient(90deg, ${INK} 0 14px, ${CREAM} 14px 28px)`,opacity:intro*0.9}}/>
      <div style={{position:'absolute',left:80,top:startY+84,fontFamily:mono,fontSize:15,letterSpacing:3,color:SLATE,opacity:intro*0.85,fontWeight:700}}>START</div>
      <div style={{position:'absolute',left:cx,top:finishY+70,width:360,height:22,transform:'translateX(-50%)',borderRadius:5,background:`repeating-linear-gradient(90deg, ${INK} 0 11px, ${PAPER} 11px 22px), repeating-linear-gradient(0deg, ${INK} 0 11px, ${PAPER} 11px 22px)`,backgroundBlendMode:'difference',opacity:iconsIn*0.95, boxShadow:'0 6px 14px rgba(20,26,45,0.3)'}}/>
      <div style={{position:'absolute',left:cx,top:finishY+52,width:150,height:44,transform:'translateX(-50%)',borderRadius:'8px 8px 3px 3px',background:`linear-gradient(158deg, ${GOLD}, ${AMBER})`,opacity:winnerBreak, boxShadow:'0 10px 22px rgba(20,26,45,0.35), inset 0 2px 0 rgba(255,255,255,0.4)'}}/>
      <div style={{position:'absolute',left:cx,top:finishY+52,width:150,height:44,transform:'translateX(-50%)',borderRadius:'8px 8px 3px 3px',background:'linear-gradient(125deg, rgba(255,255,255,0.34) 0%, transparent 34%)',opacity:winnerBreak}}/>
      <div style={{position:'absolute',left:cx,top:finishY+62,width:150,transform:'translateX(-50%)',textAlign:'center',fontFamily:fraunces.fontFamily,fontSize:26,fontWeight:800,color:INK,opacity:winnerBreak}}>1st</div>
      <div style={{position:'absolute',left:heroX,top:finishY+50,width:120,height:20,transform:'translate(-50%,-50%)',borderRadius:'50%',background:'rgba(20,26,45,0.28)',filter:'blur(4px)',opacity:winnerBreak*0.8}}/>
      {orbIcons}
      <div style={{position:'absolute',left:heroX,top:heroY,transform:'translate(-50%,-50%)'}}>
        <div style={{position:'absolute',left:0,top:-84,transform:'translateX(-50%)'}}>
          <SolMascot lf={lf} size={90} cheer={0} point={0}/>
        </div>
        <Mascot lf={lf} size={78}/>
      </div>
      {pack}
      <div style={{position:'absolute',left:cx,top:665,transform:'translateX(-50%)',opacity:intro}}>
        <div style={{padding:'9px 20px',borderRadius:22,background:`linear-gradient(158deg, ${SLATE}, #2c476a)`,color:PAPER,fontFamily:inter.fontFamily,fontSize:26,fontWeight:800,letterSpacing:0.2,boxShadow:'0 8px 18px rgba(20,26,45,0.4)',border:'1.5px solid rgba(247,243,234,0.35)',whiteSpace:'nowrap',textAlign:'center'}}>
          everyone gets Sol
        </div>
      </div>
      <div style={{position:'absolute',left:cx,top:165,transform:`translate(-50%,${(1-edgeIn)*-14}px)`,opacity:edgeIn}}>
        <div style={{padding:'10px 22px',borderRadius:24,background:`linear-gradient(158deg, ${GOLD}, ${CLAY})`,color:INK,fontFamily:inter.fontFamily,fontSize:26,fontWeight:900,letterSpacing:0.2,boxShadow:'0 10px 22px rgba(207,149,68,0.5), 0 0 20px rgba(231,178,76,0.4)',border:'2px solid rgba(247,243,234,0.6)',whiteSpace:'nowrap',textAlign:'center'}}>
          the edge = being <span style={{fontFamily:fraunces.fontFamily,fontStyle:'italic',fontWeight:900}}>FIRST</span>
        </div>
      </div>
    </AbsoluteFill>
  );
})()
);

const Hook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><HookBody lf={lf} /><ScreenHead lf={lf} big="GPT-5.6 SOL" clay="IS LIVE" chip={false} /></Panel>;
const Ultra: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><UltraBody lf={lf} /><ScreenHead lf={lf} big="SOL RUNS" clay="A SWARM" /></Panel>;
const Stack: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><StackBody lf={lf} /><ScreenHead lf={lf} big="SOL PLANS," clay="LUNA EXECUTES" /></Panel>;
const Agent: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><AgentBody lf={lf} /><ScreenHead lf={lf} big="SOL DOES" clay="YOUR WORK" /></Panel>;
const Rehook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><RehookBody lf={lf} /><ScreenHead lf={lf} big="ACCESS ISN'T" clay="THE EDGE" /></Panel>;

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "SOL"; const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14; const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 366, textAlign: "center", transform: `scale(${inP})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: SLATE }}>the exact setup</span></div>
      <div style={{ position: "absolute", left: 220, right: 220, top: 440, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE SOL PLAYBOOK</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff" }}>3 workflows, unfair edge</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>{["Ultra mode: run a subagent swarm", "The Sol + Luna cost stack", "The agent setup that works alone"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}><span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</span>{t}</div>)}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 796 + arrowBob, display: "flex", justifyContent: "center", opacity: inP }}><div style={{ width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `22px solid ${CLAY}` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 856, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>SOL</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "15px 24px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span><span style={{ width: 44, height: 44, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} /></span></div>
      </div>
    </AbsoluteFill>
  );
};
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => (<><CTA lf={lf} />{lf >= 0 ? <SnackLane lf={Math.min(lf, fr(8) - 1)} /> : null}</>);

const SnackLane: React.FC<{ lf: number }> = ({ lf }) => {
  const total = fr(5);
  const pr = Math.min(1, lf / (fr(8)));
  const secLeft = Math.max(1, 5 - Math.floor(lf / FPS));
  const decP = Math.max(0, 1 - (lf % FPS) / 8);
  const inP = over(lf, 0, 8, Easing.out(Easing.back(1.4)));
  const laneL = 180, laneR = 800;
  const cx = laneL - 30 + pr * (laneR - laneL + 30);
  const lastSec = secLeft === 1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1448, height: 130, opacity: inP, zIndex: 95, transform: `translateY(${(1 - inP) * 20}px)` }}>
      {/* lane track */}
      <div style={{ position: "absolute", left: 150, width: 700, top: 78, height: 10, borderRadius: 999, background: "rgba(58,92,132,0.25)" }} />
      <div style={{ position: "absolute", left: 150, width: Math.max(0, (cx - 150)), top: 78, height: 10, borderRadius: 999, background: grad("#E08A66", "#C5603C") }} />
      {/* pellets */}
      {Array.from({ length: 5 }, (_, k) => {
        const px = laneL + ((k + 0.6) / 5) * (laneR - laneL);
        const eatAt = (k + 1) * FPS - 6;
        const de = lf - eatAt;
        if (de > 14) return null;
        return (
          <div key={k} style={{ position: "absolute", left: px, top: 83 }}>
            {de < 0 && <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 10px ${GOLD}`, transform: `scale(${1 + Math.sin(lf / 6 + k * 2) * 0.14})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 0.3})`, opacity: Math.max(0, 1 - de / 11) }} />
              {Array.from({ length: 5 }, (_, j) => { const aa = (j / 5) * Math.PI * 2; const dd = de * 3.4; return <div key={j} style={{ position: "absolute", left: Math.cos(aa) * dd - 3, top: Math.sin(aa) * dd - 3, width: 6, height: 6, borderRadius: "50%", background: [GOLD, CLAY, "#F3E3A6"][j % 3], opacity: Math.max(0, 1 - de / 12) }} />; })}
            </>}
          </div>);
      })}
      {/* the critter runs the lane eating */}
      {(() => { const chompP = Math.max(0, 1 - (lf % FPS) / 9); return (
        <div style={{ position: "absolute", left: cx, top: 26, transform: "translateX(-50%)", zIndex: 30 }}>
          <Mascot lf={lf} size={62} nodAmp={3.4} nodSpeed={4.5} cheer={chompP * 0.85} gaze={4} />
        </div>); })()}
      {/* numeral dial at the finish */}
      <div style={{ position: "absolute", left: 856, top: 34, width: 92, height: 92 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#233250", "#18233A"), boxShadow: "0 10px 24px -8px rgba(18,28,58,0.5)" }} />
        <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: `conic-gradient(from 0deg, ${lastSec ? GOLD : CLAY}${lastSec ? "dd" : "aa"} ${pr * 360}deg, rgba(120,150,210,0.15) ${pr * 360}deg)`, WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)", mask: "radial-gradient(circle, transparent 58%, #000 59%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${1 + decP * 0.2})` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 0.9, color: lastSec ? "#F6E4A0" : "#F4EEE2", textShadow: lastSec ? `0 0 18px ${GOLD}` : "none" }}>{secLeft}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "rgba(190,205,235,0.7)" }}>sec</div>
        </div>
      </div>
    </div>
  );
};



// ---------------- progress bar (standing game-arc) ----------------
// ---- CHAPTER BAR (2nd progress rail, under the panel): "how far / almost ending" ----
const CHAP = [
  { s: 0.0, e: 9.22, k: '' },
  { s: 9.22, e: 19.70, k: '1' },
  { s: 19.70, e: 30.84, k: '2' },
  { s: 30.84, e: 38.12, k: '3' },
  { s: 38.12, e: 44.88, k: '' },
];
const ChapterBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const fade = interpolate(t, [0.4, 1.2, 44.0, 44.7], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (fade < 0.01) return null;
  const nearEnd = interpolate(t, [38.12, 44.4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 116, right: 150, top: 1196, height: 36, zIndex: 118, opacity: fade, display: 'flex', alignItems: 'center', gap: 9 }}>
      {CHAP.map((c, i) => {
        const fillP = interpolate(t, [c.s, c.e], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const done = t >= c.e - 0.04;
        const active = t >= c.s && t < c.e - 0.04;
        const isWay = c.k !== '';
        return (
          <div key={i} style={{ position: 'relative', flex: isWay ? 1.3 : 1, height: 16, borderRadius: 999,
            background: 'rgba(42,58,86,0.24)', overflow: 'hidden',
            boxShadow: active ? 'inset 0 0 0 1.5px rgba(231,178,76,0.7), 0 0 12px rgba(231,178,76,0.4)' : 'inset 0 0 0 1px rgba(42,58,86,0.35)' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${fillP * 100}%`,
              background: done ? grad('#3F9E74', '#2E7C57') : grad('#EFBE5C', '#CF9544'), borderRadius: 999,
              boxShadow: active ? '0 0 8px rgba(231,178,76,0.7)' : 'none' }} />
            {isWay && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, letterSpacing: 0.5,
              color: fillP > 0.5 ? '#2A1B0C' : '#8A99B2' }}>{c.k}</div>}
            {active && <div style={{ position: 'absolute', top: '50%', left: `${fillP * 100}%`, width: 16, height: 16,
              marginLeft: -8, marginTop: -8, borderRadius: '50%', background: '#FBF8F1', border: '3px solid #CF9544',
              boxShadow: `0 0 10px ${GOLD}` }} />}
          </div>
        );
      })}
      {/* finish flag — brightens + rattles as the end nears ("almost there") */}
      <div style={{ position: 'relative', width: 34, textAlign: 'center', fontSize: 25, lineHeight: '36px',
        transform: `translateX(4px) scale(${1 + nearEnd * 0.22 * (0.55 + 0.45 * Math.sin(t * 10))}) rotate(${nearEnd * Math.sin(t * 13) * 6}deg)`,
        filter: nearEnd > 0.08 ? `drop-shadow(0 0 ${5 + nearEnd * 13}px ${GOLD})` : 'grayscale(0.45) opacity(0.7)' }}>🏁</div>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = f / FPS;
  const VIRT = 47.7;
  const p = Math.min(1, t / VIRT);
  const marks = [10.0, 20.0, 31.0];
  const STARS = [4.0, 15.0, 26.0, 35.0];
  const TOTAL = VIRT;
  const PELLETS = [2, 7, 12, 18, 23, 29, 34, 38];
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
        const wake = interpolate(t, [39.5, 44.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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

export const GptSolReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.46, 0.7, 1.1, L[1] + 2.4, L[1] + 5.2, L[2] + 0.4, L[2] + 1.0, L[2] + 9.4, L[2] + 11.0, L[3] + 0.5, L[3] + 4.7, L[4] + 0.2, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_sol.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(CUT) - 18, fr(CUT), 99999], [0, 0.11, 0.11, 0.05, 0.05], { extrapolateRight: "clamp" })} />
      {/* ===== HOOK: Sol bursts in ===== */}
      <Sfx at={0.5} src="boom.wav" v={0.34} />
      <Sfx at={0.9} src="metal_riser.wav" v={0.82} dur={1.95} /><Sfx at={2.7} src="boom.wav" v={0.44} /><Sfx at={2.72} src="angelic.wav" v={0.3} dur={1.6} /><Sfx at={2.78} src="sparkle.wav" v={0.28} dur={0.8} />
      <Sfx at={3.5} src="shimmer.wav" v={0.26} dur={1.0} />
      {[6.2, 6.5, 6.8].map((t, i) => <Sfx key={`slot${i}`} at={t} src="ding.wav" v={0.22} />)}
      {/* ===== metallic RISERS peaking into EVERY scene transition ===== */}
      {([[L[1], 0.82], [L[2], 0.72], [L[3], 0.74], [L[4], 0.74], [L[5], 0.84]] as [number, number][]).map(([tt, v], i) => <Sfx key={`rz${i}`} at={tt - 1.8} src="metal_riser.wav" v={v} dur={1.95} />)}
      {[L[1], L[2], L[3], L[4]].map((tt, i) => <Sfx key={`bm${i}`} at={tt} src="boom.wav" v={0.3} />)}
      {/* ===== ULTRA ===== */}
      <Sfx at={L[1] + 0.6} src="snap.wav" v={0.3} /><Sfx at={L[1] + 1.4} src="thock.wav" v={0.28} />
      <Sfx at={L[1] + 2.4} src="fling.wav" v={0.34} /><Sfx at={L[1] + 2.5} src="sparkle.wav" v={0.2} dur={0.5} />
      {[3.2, 3.7, 4.2, 4.7, 5.2, 5.7, 6.2].map((d, i) => <Sfx key={`up${i}`} at={L[1] + d} src="tick.wav" v={0.14} dur={0.15} />)}
      <Sfx at={L[1] + 7.6} src="swooshup.wav" v={0.32} /><Sfx at={L[1] + 8.3} src="ding.wav" v={0.34} /><Sfx at={L[1] + 8.35} src="sparkle.wav" v={0.24} dur={0.6} />
      {/* ===== STACK ===== */}
      {[0.6, 1.3].map((d, i) => <Sfx key={`sp${i}`} at={L[2] + d} src="blip1.wav" v={0.2} dur={0.2} />)}
      <Sfx at={L[2] + 2.6} src="blip2.wav" v={0.24} /><Sfx at={L[2] + 4.6} src="swish.wav" v={0.3} />
      {[5.4, 5.8, 6.2, 6.6, 7.0, 7.4].map((d, i) => <Sfx key={`lz${i}`} at={L[2] + d} src="tick.wav" v={0.15} dur={0.15} />)}
      <Sfx at={L[2] + 9.4} src="ding.wav" v={0.32} /><Sfx at={L[2] + 9.45} src="sparkle.wav" v={0.22} dur={0.6} />
      {/* ===== AGENT ===== */}
      <Sfx at={L[3] + 0.5} src="swooshup.wav" v={0.3} />
      {[1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4].map((d, i) => <Sfx key={`ag${i}`} at={L[3] + d} src="tick.wav" v={0.16} dur={0.15} />)}
      {[1.6, 2.8, 4.0, 5.2].map((d, i) => <Sfx key={`agd${i}`} at={L[3] + d} src="ding.wav" v={0.18} />)}
      <Sfx at={L[3] + 6.2} src="ding.wav" v={0.3} />
      {/* ===== REHOOK ===== */}
      <Sfx at={L[4] + 0.8} src="pop.wav" v={0.26} dur={0.4} />
      <Sfx at={L[4] + 2.0} src="whoosh.wav" v={0.34} />
      <Sfx at={L[4] + 4.6} src="swooshup.wav" v={0.32} /><Sfx at={L[4] + 5.5} src="ding.wav" v={0.34} /><Sfx at={L[4] + 5.55} src="crowd_cheer.wav" v={0.2} dur={1.0} />
      {/* ===== CTA ===== */}
      <Sfx at={L[5]} src="resolve.wav" v={0.46} /><Sfx at={L[5] + 0.4} src="ding.wav" v={0.28} /><Sfx at={L[5] + 0.55} src="sparkle.wav" v={0.26} dur={0.7} />
      {/* progress pellets + clock */}
      {[3, 10, 17, 24, 31, 38, 44].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.09} dur={0.2} />)}
      {[0, 1, 2].map((n) => <Sfx key={`clk${n}`} at={CLOCK_START + n} src="tick.wav" v={0.14} dur={0.2} />)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <Hook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <Ultra lf={frame - Lf[1]} /> : null}
        {scene(2) ? <Stack lf={frame - Lf[2]} /> : null}
        {scene(3) ? <Agent lf={frame - Lf[3]} /> : null}
        {scene(4) ? <Rehook lf={frame - Lf[4]} /> : null}
        {scene(5) ? <ClockCTA lf={frame - Lf[5]} /> : null}
        <Captions />
      </AbsoluteFill>
      {(() => { const sv = over(frame, fr(5), fr(0.4), Easing.out(Easing.back(1.6))) * (1 - over(frame, fr(11), fr(0.5))); return sv > 0.02 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 344, textAlign: "center", zIndex: 140, opacity: sv, transform: `scale(${0.9 + sv * 0.1 + Math.sin(frame / 6) * 0.03})` }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 20px", borderRadius: 999, background: "#1A2233", border: `2px solid ${GOLD}`, boxShadow: `0 0 18px ${GOLD}66` }}>
            <div style={{ width: 15, height: 21, background: GOLD, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%)" }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F6E4A0" }}>save this for later</span>
          </div>
        </div>
      ) : null; })()}
      <ProgressBar />
      <ChapterBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
