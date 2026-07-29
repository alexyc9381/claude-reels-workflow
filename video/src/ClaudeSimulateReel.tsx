import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_simulate.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, architect(spec), line(terra->luna), qa(inspect), payoff, cta
const L = [0.0, 6.5192, 14.0, 20.8846, 24.6346, 29.0962]; // VO re-timed at 1.04x
const Lf = L.map(fr);
const CUT = 38.6058;
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

// TERRA — the balanced middle tier = a friendly green EARTH-globe creature (continents drift, atmosphere glow, a tilted orbit ring)
const TerraMascot: React.FC<{ lf: number; size?: number; cheer?: number; gaze?: number }> = ({ lf, size = 90, cheer = 0, gaze = 0 }) => {
  const t = lf / 30;
  const bob = Math.sin(t * 2.4) * (size * 0.02) - cheer * Math.abs(Math.sin(t * 7)) * (size * 0.05);
  const blink = (lf % 145) < 6 ? 0.12 : 1;
  const eyeH = size * 0.115 * blink;
  const eyeW = size * 0.075;
  const gx = interpolate(gaze, [-1, 1], [-size * 0.028, size * 0.028]);
  const smile = 0.5 + cheer * 0.5;
  const R = size * 0.34;
  const cx = size / 2, cy = size / 2 + bob;
  const drift = Math.sin(t * 0.7) * R * 0.14;
  return (
    <div style={{ width: size, height: size, position: "relative", display: "inline-block", overflow: "visible" }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={`terraface${size}`} cx="37%" cy="33%" r="80%">
            <stop offset="0%" stopColor="#9CE0B4" />
            <stop offset="52%" stopColor="#4FA877" />
            <stop offset="100%" stopColor="#2C7A52" />
          </radialGradient>
          <radialGradient id={`terraglow${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8FE7B6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#8FE7B6" stopOpacity={0} />
          </radialGradient>
          <clipPath id={`terraclip${size}`}><circle cx={cx} cy={cy} r={R} /></clipPath>
        </defs>
        {/* atmosphere glow */}
        <circle cx={cx} cy={cy} r={R * 1.72} fill={`url(#terraglow${size})`} />
        {/* tilted orbit ring behind */}
        <ellipse cx={cx} cy={cy} rx={R * 1.5} ry={R * 0.48} fill="none" stroke="#7FE0AE" strokeWidth={size * 0.02} opacity={0.4} transform={`rotate(-24 ${cx} ${cy})`} />
        {/* stub arms */}
        <g stroke="#2C7A52" strokeWidth={size * 0.05} strokeLinecap="round">
          <line x1={cx - R * 0.9} y1={cy + R * 0.2} x2={cx - R * 1.25} y2={cy + R * (cheer > 0 ? -0.25 : 0.35)} />
          <line x1={cx + R * 0.9} y1={cy + R * 0.2} x2={cx + R * 1.25} y2={cy + R * (cheer > 0 ? -0.25 : 0.35)} />
        </g>
        {/* globe body */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#terraface${size})`} stroke="#256A46" strokeWidth={size * 0.012} />
        {/* continents (subtle, drifting, kept away from the face center) */}
        <g clipPath={`url(#terraclip${size})`}>
          <ellipse cx={cx - R * 0.42 + drift} cy={cy - R * 0.44} rx={R * 0.34} ry={R * 0.2} fill="#2C7A52" opacity={0.6} />
          <ellipse cx={cx + R * 0.5 + drift} cy={cy - R * 0.05} rx={R * 0.22} ry={R * 0.3} fill="#2C7A52" opacity={0.55} />
          <ellipse cx={cx + R * 0.05 + drift} cy={cy + R * 0.6} rx={R * 0.3} ry={R * 0.16} fill="#2C7A52" opacity={0.5} />
          <ellipse cx={cx - R * 0.4} cy={cy - R * 0.42} rx={R * 0.3} ry={R * 0.18} fill="#D6F4E2" opacity={0.28} />
        </g>
        {/* face */}
        <ellipse cx={cx - R * 0.32} cy={cy + R * 0.30} rx={R * 0.14} ry={R * 0.09} fill="#E88A6A" opacity={0.4} />
        <ellipse cx={cx + R * 0.32} cy={cy + R * 0.30} rx={R * 0.14} ry={R * 0.09} fill="#E88A6A" opacity={0.4} />
        <rect x={cx - R * 0.30 - eyeW / 2 + gx} y={cy - R * 0.02 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#173A28" />
        <rect x={cx + R * 0.30 - eyeW / 2 + gx} y={cy - R * 0.02 - eyeH / 2} width={eyeW} height={eyeH} rx={eyeW * 0.45} fill="#173A28" />
        <path d={`M ${cx - R * 0.24 + gx} ${cy + R * 0.28} Q ${cx + gx} ${cy + R * (0.42 + smile * 0.22)} ${cx + R * 0.24 + gx} ${cy + R * 0.28}`}
          fill="none" stroke="#173A28" strokeWidth={size * 0.024} strokeLinecap="round" />
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
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number; apron?: number; beanie?: number; cap?: number; scarf?: number; hoodie?: number; backpack?: number; tote?: number; headphones?: number; cup?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0, apron = 0, beanie = 0, cap = 0, scarf = 0, hoodie = 0, backpack = 0, tote = 0, headphones = 0, cup = 0 }) => {
  const C = "#D97757";
  const CD = "#B85F44";
  const CL = "#E79070";
  const CREAM = "#F4F1EA";
  const BONE = "#F4EEE2";
  const INK = "#151312";
  const GOLD = "#E7B24C";
  const GOLDL = "#F0CB63";
  const NAVY = "#26324A";
  const NAVYD = "#1A2438";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  const armY = 86 - hop * 0.4 - cheer * 26;
  const swing = Math.sin(lf / (nodSpeed * 0.6) - 0.9);
  const lag = hopP * 6 + swing * 2.2;
  const sway = Math.sin(lf / (nodSpeed * 0.9) - 0.5) * 2.4;
  const fixed = hop + jump;
  const steam = (i: number) => ((lf * 0.85 + i * 13) % 34);
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        {/* hoodie: hood shell sits BEHIND the head */}
        {hoodie > 0 && <>
          <rect x={24} y={30} width={152} height={86} fill="#3C4557" />
          <rect x={24} y={30} width={152} height={7} fill="#4E596E" />
          <rect x={24} y={104} width={152} height={12} fill="#333B4A" />
          <rect x={18} y={92} width={16} height={26} fill="#3C4557" />
          <rect x={166} y={92} width={16} height={26} fill="#3C4557" />
        </>}
        {/* backpack: pack body peeking past the shoulder */}
        {backpack > 0 && <>
          <rect x={160} y={62} width={30} height={72} fill="#39424F" />
          <rect x={160} y={62} width={30} height={7} fill="#4A5665" />
          <rect x={160} y={126} width={30} height={8} fill="#2C333E" />
          <rect x={166} y={86} width={20} height={18} fill="#4A5665" />
          <rect x={172} y={92} width={8} height={4} fill={GOLD} />
        </>}
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={8 - cheer * 4} y={armY} width={26} height={5} fill={CL} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={5} fill={CL} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        <rect x={34} y={138} width={132} height={8} fill={CD} />
        {/* white wise beard, layered strands */}
        {beard > 0 && <>
          <rect x={44} y={98} width={112} height={26} fill={BONE} />
          <rect x={44} y={98} width={112} height={5} fill="#FFFCF4" />
          <rect x={56} y={122} width={88} height={20} fill={BONE} />
          <rect x={74} y={140} width={52} height={16} fill={BONE} />
          <rect x={90} y={154} width={20} height={12} fill="#EDE6D6" />
          <rect x={62} y={112} width={8} height={26} fill="#E4DCC8" />
          <rect x={88} y={118} width={7} height={34} fill="#E4DCC8" />
          <rect x={112} y={112} width={8} height={28} fill="#E4DCC8" />
          <rect x={130} y={106} width={7} height={20} fill="#E4DCC8" />
          <rect x={78} y={100} width={44} height={6} fill="#D8CFB8" />
        </>}
        {/* police uniform: jacket, epaulettes with shoulder numbers, belt, badge */}
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" />
          <rect x={34} y={106} width={132} height={6} fill="#5A88D2" />
          <rect x={34} y={112} width={132} height={4} fill="#2E55A3" />
          <rect x={34} y={134} width={132} height={7} fill="#2A4E96" />
          <rect x={34} y={141} width={132} height={5} fill="#22407C" />
          <rect x={96} y={116} width={9} height={9} fill={GOLD} />
          <rect x={96} y={116} width={4} height={3} fill={GOLDL} />
          <rect x={96} y={130} width={9} height={9} fill={GOLD} />
          <rect x={96} y={130} width={4} height={3} fill={GOLDL} />
          <rect x={48} y={114} width={13} height={13} fill={GOLD} />
          <rect x={51} y={111} width={7} height={4} fill={GOLD} />
          <rect x={51} y={117} width={5} height={5} fill={GOLDL} />
          <rect x={34} y={106} width={22} height={9} fill="#2E55A3" />
          <rect x={144} y={106} width={22} height={9} fill="#2E55A3" />
          <rect x={38} y={108} width={4} height={5} fill={GOLD} />
          <rect x={45} y={108} width={4} height={5} fill={GOLD} />
          <rect x={150} y={108} width={4} height={5} fill={GOLD} />
          <rect x={157} y={108} width={4} height={5} fill={GOLD} />
          <rect x={8} y={armY + 18} width={26} height={8} fill="#2E55A3" />
          <rect x={166} y={armY + 18} width={26} height={8} fill="#2E55A3" />
        </>}
        {/* zuck tee + pale wash + optional gold chain */}
        {zuck > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.14)" />
          <rect x={34} y={106} width={132} height={40} fill="#B7BAC0" />
          <rect x={34} y={106} width={132} height={6} fill="#C8CBD0" />
          <rect x={34} y={112} width={132} height={3} fill="#9DA1A8" />
          <rect x={34} y={140} width={132} height={6} fill="#A6AAB1" />
          <rect x={80} y={106} width={40} height={6} fill="#8C9098" />
          <rect x={86} y={112} width={28} height={5} fill="#8C9098" />
          <rect x={94} y={117} width={12} height={4} fill="#8C9098" />
          <rect x={8} y={armY + 20} width={26} height={6} fill="#A6AAB1" />
          <rect x={166} y={armY + 20} width={26} height={6} fill="#A6AAB1" />
        </>}
        {zuckChain > 0 && <>
          <rect x={78} y={112} width={8} height={4} fill={GOLD} />
          <rect x={84} y={116} width={8} height={4} fill={GOLD} />
          <rect x={92} y={119} width={16} height={4} fill={GOLD} />
          <rect x={106} y={116} width={8} height={4} fill={GOLD} />
          <rect x={114} y={112} width={8} height={4} fill={GOLD} />
          <rect x={98} y={121} width={4} height={4} fill={GOLDL} />
        </>}
        {/* alexandr wang: black crew tee */}
        {wang > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.10)" />
          <rect x={34} y={106} width={132} height={40} fill="#2A2A32" />
          <rect x={34} y={106} width={132} height={6} fill="#3A3A44" />
          <rect x={34} y={112} width={132} height={3} fill="#1E1E24" />
          <rect x={34} y={140} width={132} height={6} fill="#232329" />
          <rect x={80} y={106} width={40} height={6} fill="#3A3A44" />
          <rect x={86} y={112} width={28} height={5} fill="#3A3A44" />
          <rect x={94} y={117} width={12} height={4} fill="#3A3A44" />
          <rect x={8} y={armY + 20} width={26} height={6} fill="#232329" />
          <rect x={166} y={armY + 20} width={26} height={6} fill="#232329" />
        </>}
        {/* bikini */}
        {bikini > 0 && <>
          <rect x={44} y={110} width={112} height={5} fill="#E23B86" />
          <rect x={44} y={114} width={112} height={13} fill="#FF4FA3" />
          <polygon points="60,114 80,114 70,130" fill="#FF4FA3" /><polygon points="120,114 140,114 130,130" fill="#FF4FA3" />
          <rect x={80} y={138} width={40} height={12} fill="#FF4FA3" />
          <rect x={80} y={138} width={40} height={4} fill="#FF7ABC" />
          <rect x={96} y={118} width={8} height={5} fill="#FFB3D6" />
        </>}
        {/* professor tweed blazer, bow tie, elbow patches */}
        {prof > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#6E5A3C" />
          <rect x={34} y={106} width={132} height={6} fill="#83714F" />
          <rect x={34} y={112} width={132} height={3} fill="#57462A" />
          <rect x={34} y={140} width={132} height={6} fill="#5B4A2F" />
          <rect x={92} y={106} width={16} height={40} fill="#EDE6D6" />
          <polygon points="82,106 100,132 118,106" fill="#5A4A30" />
          <rect x={70} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(6 75 123)" />
          <rect x={120} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(-6 125 123)" />
          <rect x={62} y={124} width={12} height={9} fill="#57462A" />
          <rect x={126} y={124} width={12} height={9} fill="#57462A" />
          <rect x={88} y={112} width={10} height={11} fill="#8B2E2E" />
          <rect x={102} y={112} width={10} height={11} fill="#8B2E2E" />
          <rect x={97} y={115} width={6} height={6} fill="#A83B3B" />
          <rect x={8} y={armY + 4} width={26} height={12} fill="#57462A" />
          <rect x={166} y={armY + 4} width={26} height={12} fill="#57462A" />
        </>}
        {/* business suit: lapels, pocket square, belt, shirt cuffs */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill={NAVY} />
          <rect x={34} y={106} width={132} height={6} fill="#33415E" />
          <rect x={34} y={112} width={132} height={3} fill={NAVYD} />
          <rect x={88} y={106} width={24} height={40} fill={CREAM} />
          <polygon points="88,106 100,124 112,106" fill={NAVY} />
          <polygon points="74,106 88,106 100,126 84,126" fill="#31405C" />
          <polygon points="126,106 112,106 100,126 116,126" fill="#31405C" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
          <rect x={95} y={116} width={4} height={22} fill="#A03636" />
          <rect x={34} y={134} width={132} height={8} fill="#1C2436" />
          <rect x={94} y={134} width={13} height={8} fill={GOLD} />
          <rect x={96} y={136} width={5} height={3} fill={GOLDL} />
          <rect x={124} y={116} width={18} height={7} fill={CREAM} />
          <rect x={128} y={113} width={5} height={4} fill={CREAM} />
          <rect x={8} y={armY + 17} width={26} height={7} fill={CREAM} />
          <rect x={166} y={armY + 17} width={26} height={7} fill={CREAM} />
          <rect x={8} y={armY + 24} width={26} height={2} fill="#D9D3C6" />
          <rect x={166} y={armY + 24} width={26} height={2} fill="#D9D3C6" />
        </>}
        {/* dinosaur costume: green belly + tail */}
        {dino > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#5FA85A" />
          <rect x={34} y={106} width={132} height={6} fill="#74BC6E" />
          <rect x={34} y={112} width={132} height={3} fill="#4A8C46" />
          <rect x={34} y={140} width={132} height={6} fill="#4E9149" />
          <rect x={60} y={124} width={80} height={7} fill="#7CC276" />
          <rect x={60} y={131} width={80} height={7} fill="#8ACE84" />
          <polygon points="166,116 208,106 208,146 166,142" fill="#5FA85A" /><polygon points="188,108 196,102 196,110" fill="#3E7A3A" /><polygon points="198,110 206,105 206,113" fill="#3E7A3A" />
        </>}
        {/* construction hi-vis vest + tool belt */}
        {constr > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#E4622B" />
          <rect x={34} y={106} width={132} height={5} fill="#F27C46" />
          <rect x={44} y={113} width={112} height={5} fill={CREAM} /><rect x={44} y={126} width={112} height={5} fill={CREAM} />
          <rect x={92} y={106} width={16} height={40} fill="#C94E1C" />
          <rect x={34} y={134} width={132} height={12} fill="#6E5236" />
          <rect x={34} y={134} width={132} height={3} fill="#87663F" />
          <rect x={92} y={135} width={16} height={10} fill={GOLD} />
          <rect x={95} y={137} width={6} height={4} fill={GOLDL} />
          <rect x={56} y={137} width={9} height={13} fill="#4A5665" />
          <rect x={124} y={137} width={11} height={11} fill="#8A6844" />
          <rect x={127} y={146} width={5} height={7} fill="#4A5665" />
        </>}
        {/* chef jacket: double-breast, apron strings, pocket, rolled cuffs */}
        {chef > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill={CREAM} />
          <rect x={34} y={106} width={132} height={6} fill="#FBF9F4" />
          <rect x={34} y={112} width={132} height={3} fill="#E2DDD0" />
          <rect x={34} y={140} width={132} height={6} fill="#E6E1D4" />
          <rect x={92} y={106} width={8} height={40} fill="#D8D2C4" />
          <rect x={80} y={106} width={40} height={5} fill="#E2DDD0" />
          <rect x={70} y={116} width={7} height={7} fill="#3A4456" /><rect x={70} y={130} width={7} height={7} fill="#3A4456" /><rect x={123} y={116} width={7} height={7} fill="#3A4456" /><rect x={123} y={130} width={7} height={7} fill="#3A4456" />
          <rect x={71} y={117} width={3} height={2} fill="#5C6A82" /><rect x={124} y={117} width={3} height={2} fill="#5C6A82" />
          <rect x={40} y={132} width={40} height={5} fill="#C9C2B2" />
          <rect x={120} y={132} width={40} height={5} fill="#C9C2B2" />
          <rect x={132} y={118} width={18} height={14} fill="#E6E1D4" />
          <rect x={132} y={118} width={18} height={3} fill="#D2CBBA" />
          <rect x={8} y={armY + 15} width={26} height={9} fill="#E6E1D4" />
          <rect x={166} y={armY + 15} width={26} height={9} fill="#E6E1D4" />
          <rect x={8} y={armY + 15} width={26} height={3} fill="#FBF9F4" />
          <rect x={166} y={armY + 15} width={26} height={3} fill="#FBF9F4" />
        </>}
        {/* wizard robe: belt, hem stars, shading */}
        {wizard > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#4B3E8E" />
          <rect x={34} y={102} width={132} height={6} fill="#5E4FA8" />
          <rect x={34} y={108} width={132} height={3} fill="#3A2F73" />
          <rect x={34} y={140} width={132} height={6} fill="#3F3479" />
          <rect x={34} y={126} width={132} height={9} fill="#2F2760" />
          <rect x={92} y={126} width={16} height={9} fill={GOLD} />
          <rect x={95} y={128} width={6} height={4} fill={GOLDL} />
          <rect x={70} y={112} width={9} height={9} fill={GOLD} />
          <rect x={120} y={114} width={9} height={9} fill={GOLD} />
          <rect x={52} y={116} width={8} height={8} fill={GOLD} />
          <rect x={46} y={137} width={7} height={7} fill={GOLDL} />
          <rect x={72} y={139} width={6} height={6} fill={GOLDL} />
          <rect x={122} y={138} width={6} height={6} fill={GOLDL} />
          <rect x={146} y={137} width={7} height={7} fill={GOLDL} />
          <rect x={8} y={armY + 16} width={26} height={10} fill="#3A2F73" />
          <rect x={166} y={armY + 16} width={26} height={10} fill="#3A2F73" />
        </>}
        {/* judge robe + collar + gavel */}
        {judge > 0 && <>
          <rect x={34} y={100} width={132} height={46} fill="#2A2438" />
          <rect x={34} y={100} width={132} height={6} fill="#3A3350" />
          <rect x={34} y={106} width={132} height={3} fill="#1D1930" />
          <rect x={34} y={140} width={132} height={6} fill="#221D30" />
          <rect x={84} y={100} width={14} height={18} fill={BONE} />
          <rect x={102} y={100} width={14} height={18} fill={BONE} />
          <rect x={84} y={100} width={14} height={4} fill="#FFFCF4" />
          <rect x={102} y={100} width={14} height={4} fill="#FFFCF4" />
          <rect x={60} y={112} width={6} height={30} fill="#231E32" />
          <rect x={134} y={112} width={6} height={30} fill="#231E32" />
          <rect x={176} y={armY - 30} width={9} height={44} fill="#8A6844" transform={`rotate(24 180 ${armY - 8})`} />
          <rect x={168} y={armY - 44} width={30} height={17} fill="#6E5236" transform={`rotate(24 183 ${armY - 36})`} />
          <rect x={168} y={armY - 44} width={30} height={4} fill="#87663F" transform={`rotate(24 183 ${armY - 36})`} />
        </>}
        {/* sherlock cape */}
        {sherlock > 0 && <>
          <rect x={30} y={98} width={140} height={26} fill="#9C7A50" />
          <rect x={30} y={98} width={140} height={5} fill="#B08D60" />
          <rect x={30} y={120} width={140} height={5} fill="#7A5A3C" />
          <rect x={64} y={104} width={8} height={8} fill="#7A5A3C" /><rect x={126} y={106} width={8} height={8} fill="#7A5A3C" />
          <rect x={92} y={100} width={16} height={7} fill="#8A6844" />
          <rect x={95} y={102} width={10} height={3} fill="#B08D60" />
        </>}
        {/* hoodie front: body, kangaroo pocket, swaying drawstrings */}
        {hoodie > 0 && <>
          <rect x={34} y={104} width={132} height={42} fill="#4A5468" />
          <rect x={34} y={104} width={132} height={6} fill="#5C6980" />
          <rect x={34} y={110} width={132} height={3} fill="#3C4557" />
          <rect x={34} y={140} width={132} height={6} fill="#3F485A" />
          <rect x={62} y={124} width={76} height={16} fill="#414B5E" />
          <rect x={62} y={124} width={76} height={3} fill="#556076" />
          <rect x={62} y={124} width={5} height={16} fill="#37404F" />
          <rect x={133} y={124} width={5} height={16} fill="#37404F" />
          <rect x={84 + sway * 0.6} y={106} width={5} height={20} fill="#DCD6C8" />
          <rect x={111 - sway * 0.6} y={106} width={5} height={18} fill="#DCD6C8" />
          <rect x={83 + sway * 0.6} y={125} width={7} height={6} fill="#C2BBAA" />
          <rect x={110 - sway * 0.6} y={123} width={7} height={6} fill="#C2BBAA" />
          <rect x={8} y={armY + 16} width={26} height={10} fill="#3C4557" />
          <rect x={166} y={armY + 16} width={26} height={10} fill="#3C4557" />
        </>}
        {/* barista apron: bib, waist tie, chest pocket, pen */}
        {apron > 0 && <>
          <rect x={70} y={92} width={60} height={54} fill="#3F5D4A" />
          <rect x={70} y={92} width={60} height={5} fill="#527A61" />
          <rect x={70} y={140} width={60} height={6} fill="#35503F" />
          <rect x={64} y={110} width={72} height={36} fill="#3F5D4A" />
          <rect x={64} y={140} width={72} height={6} fill="#35503F" />
          <rect x={72} y={78} width={7} height={18} fill="#35503F" transform="rotate(-14 75 87)" />
          <rect x={121} y={78} width={7} height={18} fill="#35503F" transform="rotate(14 124 87)" />
          <rect x={44} y={108} width={112} height={7} fill="#2E4636" />
          <rect x={44} y={108} width={112} height={2} fill="#4A6E56" />
          <rect x={38 - lag * 0.5} y={112} width={9} height={22} fill="#2E4636" />
          <rect x={153 + lag * 0.5} y={112} width={9} height={20} fill="#2E4636" />
          <rect x={98} y={106} width={16} height={9} fill="#2E4636" />
          <rect x={78} y={120} width={22} height={16} fill="#365140" />
          <rect x={78} y={120} width={22} height={3} fill="#4A6E56" />
          <rect x={86} y={114} width={5} height={14} fill={GOLD} />
          <rect x={86} y={114} width={5} height={4} fill={INK} />
        </>}
        {/* backpack strap across the chest */}
        {backpack > 0 && <>
          <rect x={124} y={100} width={13} height={46} fill="#2C333E" transform="rotate(9 130 123)" />
          <rect x={124} y={100} width={13} height={4} fill="#4A5665" transform="rotate(9 130 123)" />
          <rect x={122} y={120} width={17} height={8} fill="#4A5665" transform="rotate(9 130 124)" />
          <rect x={126} y={122} width={8} height={4} fill={GOLD} transform="rotate(9 130 124)" />
        </>}
        {/* scarf: wrap over the neck, tails lag behind the bob */}
        {scarf > 0 && <>
          <rect x={44} y={94} width={112} height={18} fill="#8B2E2E" />
          <rect x={44} y={94} width={112} height={4} fill="#A83B3B" />
          <rect x={44} y={108} width={112} height={4} fill="#742525" />
          <rect x={56} y={94} width={9} height={18} fill="#C9A05A" />
          <rect x={112} y={94} width={9} height={18} fill="#C9A05A" />
          <rect x={70} y={104} width={60} height={11} fill="#9C3535" />
          <g transform={`rotate(${lag * 0.9} 78 110)`}>
            <rect x={68} y={110} width={18} height={40} fill="#8B2E2E" />
            <rect x={68} y={110} width={18} height={4} fill="#A83B3B" />
            <rect x={68} y={132} width={18} height={6} fill="#C9A05A" />
            <rect x={68} y={146} width={18} height={5} fill="#742525" />
          </g>
          <g transform={`rotate(${-lag * 0.7} 118 110)`}>
            <rect x={112} y={110} width={16} height={32} fill="#7E2A2A" />
            <rect x={112} y={110} width={16} height={4} fill="#9C3535" />
            <rect x={112} y={128} width={16} height={5} fill="#B08D60" />
            <rect x={112} y={138} width={16} height={4} fill="#682020" />
          </g>
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill={INK} transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill={INK} transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill={INK} />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill={INK} />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill={INK} />}
        {/* smart glasses */}
        {glasses > 0 && <>
          <rect x={62} y={64} width={32} height={28} fill="none" stroke={INK} strokeWidth={5} />
          <rect x={108} y={64} width={32} height={28} fill="none" stroke={INK} strokeWidth={5} />
          <rect x={94} y={74} width={14} height={5} fill={INK} />
          <rect x={34} y={72} width={28} height={5} fill={INK} />
          <rect x={140} y={72} width={26} height={5} fill={INK} />
          <rect x={66} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
          <rect x={112} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
        </>}
        {/* over-ear headphones: band holds still while the body bobs */}
        {headphones > 0 && <>
          <g transform={`translate(0 ${fixed})`}>
            <rect x={40} y={30} width={120} height={11} fill="#2A2A32" />
            <rect x={40} y={30} width={120} height={4} fill="#3E3E4A" />
            <rect x={36} y={38} width={13} height={16} fill="#2A2A32" />
            <rect x={151} y={38} width={13} height={16} fill="#2A2A32" />
            <rect x={30} y={52} width={24} height={34} fill="#2A2A32" />
            <rect x={146} y={52} width={24} height={34} fill="#2A2A32" />
            <rect x={34} y={58} width={16} height={22} fill="#4A5665" />
            <rect x={150} y={58} width={16} height={22} fill="#4A5665" />
            <rect x={34} y={58} width={16} height={4} fill="#5C6A7C" />
            <rect x={150} y={58} width={16} height={4} fill="#5C6A7C" />
            <rect x={38} y={82} width={8} height={4} fill={GOLD} />
            <rect x={154} y={82} width={8} height={4} fill={GOLD} />
          </g>
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
          <rect x={44} y={10} width={112} height={5} fill="#B08D60" />
          <rect x={88} y={2} width={24} height={10} fill="#8A6844" />
          <rect x={60} y={16} width={8} height={8} fill="#7A5A3C" /><rect x={100} y={20} width={8} height={8} fill="#7A5A3C" /><rect x={132} y={14} width={8} height={8} fill="#7A5A3C" />
        </>}
        {/* judge wig: white curls */}
        {judge > 0 && <>
          <rect x={40} y={24} width={120} height={20} fill={BONE} />
          <rect x={40} y={24} width={120} height={4} fill="#FFFCF4" />
          <rect x={30} y={40} width={22} height={40} fill={BONE} />
          <rect x={148} y={40} width={22} height={40} fill={BONE} />
          <rect x={30} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={148} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={40} y={36} width={120} height={5} fill="#D9D2C2" />
        </>}
        {/* police cap: blue crown + band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={46} y={14} width={108} height={5} fill="#5A88D2" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill={GOLD} />
          <rect x={95} y={20} width={7} height={5} fill={GOLDL} />
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
        {/* girl long hair, softer blocks + tie and bow */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={7} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={7} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={9} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={9} fill="#5F4026" />
          <rect x={20} y={100} width={16} height={9} rx={4} fill="#8B2E2E" />
          <rect x={164} y={100} width={16} height={9} rx={4} fill="#8B2E2E" />
          <rect x={30} y={36} width={140} height={16} rx={7} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} rx={2} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={7} rx={3} fill="#6E4A2C" />
          <rect x={52} y={48} width={30} height={4} rx={2} fill="#845B39" />
          <rect x={126} y={28} width={16} height={13} rx={5} fill="#C9455F" />
          <rect x={142} y={28} width={16} height={13} rx={5} fill="#C9455F" />
          <rect x={138} y={31} width={8} height={8} rx={3} fill="#A83350" />
          <rect x={128} y={30} width={7} height={4} rx={2} fill="#E0687F" />
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
        {/* chef toque: taller crown + band */}
        {chef > 0 && <>
          <rect x={54} y={26} width={92} height={22} fill={CREAM} />
          <rect x={50} y={-6} width={26} height={34} rx={11} fill={CREAM} />
          <rect x={80} y={-14} width={30} height={42} rx={13} fill="#F8F5EF" />
          <rect x={114} y={-8} width={28} height={36} rx={12} fill={CREAM} />
          <rect x={62} y={2} width={70} height={5} fill="#FBF9F4" />
          <rect x={54} y={38} width={92} height={11} fill="#E2DDD0" />
          <rect x={54} y={38} width={92} height={3} fill="#EFEBE0" />
          <rect x={54} y={47} width={92} height={3} fill="#D2CBBA" />
          <rect x={92} y={38} width={16} height={11} fill="#D8D2C4" />
        </>}
        {/* wizard hat: deeper brim */}
        {wizard > 0 && <>
          <polygon points="100,0 62,40 138,40" fill="#4B3E8E" />
          <rect x={46} y={34} width={108} height={14} fill="#3A2F73" />
          <rect x={38} y={44} width={124} height={9} fill="#2F2760" />
          <rect x={46} y={34} width={108} height={3} fill="#5E4FA8" />
          <rect x={94} y={8} width={10} height={10} fill={GOLD} />
          <rect x={78} y={24} width={8} height={8} fill={GOLD} />
          <rect x={112} y={22} width={8} height={8} fill={GOLD} />
          <rect x={182} y={armY - 34} width={7} height={54} fill="#8A6844" transform={`rotate(26 185 ${armY + 8})`} />
          <rect x={196} y={armY - 46} width={14} height={14} fill={GOLD} transform={`rotate(26 203 ${armY - 39})`} />
          <rect x={200} y={armY - 42} width={6} height={6} fill="#FFF3D6" transform={`rotate(26 203 ${armY - 39})`} />
        </>}
        {/* knit beanie: fold band + bobble */}
        {beanie > 0 && <>
          <rect x={48} y={16} width={104} height={26} fill="#3E7A72" />
          <rect x={48} y={16} width={104} height={5} fill="#4E9188" />
          <rect x={56} y={8} width={88} height={10} fill="#3E7A72" />
          <rect x={62} y={20} width={6} height={22} fill="#357068" />
          <rect x={82} y={20} width={6} height={22} fill="#357068" />
          <rect x={102} y={20} width={6} height={22} fill="#357068" />
          <rect x={122} y={20} width={6} height={22} fill="#357068" />
          <rect x={40} y={38} width={120} height={13} fill="#2F5F59" />
          <rect x={40} y={38} width={120} height={3} fill="#3E7A72" />
          <rect x={40} y={48} width={120} height={3} fill="#274F4A" />
          <rect x={86} y={-6} width={26} height={18} rx={8} fill={BONE} />
          <rect x={90} y={-4} width={11} height={6} rx={3} fill="#FFFCF4" />
        </>}
        {/* baseball cap: crown, curved peak, button */}
        {cap > 0 && <>
          <rect x={50} y={18} width={100} height={24} fill="#3A4456" />
          <rect x={50} y={18} width={100} height={5} fill="#4C5972" />
          <rect x={58} y={12} width={84} height={8} fill="#3A4456" />
          <rect x={94} y={6} width={12} height={8} fill="#4C5972" />
          <rect x={96} y={2} width={8} height={6} fill={GOLD} />
          <rect x={98} y={20} width={4} height={22} fill="#2C3444" />
          <rect x={44} y={38} width={112} height={9} fill="#2C3444" />
          <rect x={30} y={44} width={140} height={9} fill="#2C3444" />
          <rect x={38} y={51} width={124} height={5} fill="#232B38" />
          <rect x={78} y={24} width={44} height={9} fill={GOLD} />
          <rect x={78} y={24} width={44} height={3} fill={GOLDL} />
        </>}
        {/* tote bag hanging off the left arm, swinging */}
        {tote > 0 && <>
          <g transform={`rotate(${lag * 1.2} 21 ${armY + 20})`}>
            <rect x={4} y={armY + 8} width={7} height={26} fill="#8A6844" />
            <rect x={30} y={armY + 8} width={7} height={26} fill="#8A6844" />
            <rect x={4} y={armY + 8} width={33} height={7} fill="#8A6844" />
            <rect x={0} y={armY + 30} width={42} height={44} fill="#D8CFBB" />
            <rect x={0} y={armY + 30} width={42} height={5} fill="#E6DFCE" />
            <rect x={0} y={armY + 66} width={42} height={8} fill="#C2B79E" />
            <rect x={8} y={armY + 42} width={26} height={16} fill="#B85F44" />
            <rect x={8} y={armY + 42} width={26} height={4} fill="#C97052" />
            <rect x={14} y={armY + 48} width={14} height={5} fill="#E6DFCE" />
          </g>
        </>}
        {/* takeaway coffee cup held at the right nub, with rising steam */}
        {cup > 0 && <>
          <rect x={168} y={armY - 4} width={28} height={5} fill={CD} />
          <rect x={169} y={armY - 30} width={26} height={26} fill={CREAM} />
          <rect x={169} y={armY - 30} width={26} height={4} fill="#FBF9F4" />
          <rect x={169} y={armY - 8} width={26} height={4} fill="#DED8C9" />
          <rect x={169} y={armY - 20} width={26} height={10} fill="#A87A52" />
          <rect x={169} y={armY - 20} width={26} height={3} fill="#BC8C61" />
          <rect x={175} y={armY - 18} width={14} height={5} fill="#8A6844" />
          <rect x={165} y={armY - 36} width={34} height={7} fill="#3A4456" />
          <rect x={165} y={armY - 36} width={34} height={3} fill="#4C5972" />
          <rect x={178} y={armY - 41} width={10} height={6} fill="#2C3444" />
          <rect x={176} y={armY - 48 - steam(0)} width={6} height={9} fill="#DCE6EE" opacity={Math.max(0.28, 0.8 - steam(0) / 44)} />
          <rect x={186} y={armY - 46 - steam(1)} width={5} height={8} fill="#DCE6EE" opacity={Math.max(0.28, 0.8 - steam(1) / 44)} />
          <rect x={181} y={armY - 52 - steam(2)} width={5} height={7} fill="#E8F0F6" opacity={Math.max(0.28, 0.75 - steam(2) / 44)} />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5), transform: "rotate(8deg)" }} />}
    </div>
  );
};

const Actor: React.FC<{ x: number; groundY: number; size: number; z?: number; flip?: boolean; shadow?: number; children: React.ReactNode }> = ({ x, groundY, size, z = 6, flip = false, shadow = 1, children }) => (
  <div style={{ position: "absolute", left: Math.round(x - size / 2), top: Math.round(groundY - size * 0.92), width: size, height: size, zIndex: z }}>
    {shadow > 0 && <>
      {/* wide soft pool — MUST extend past the sprite footprint or it hides behind the body */}
      <div style={{ position: "absolute", left: -size * 0.06, top: size * 0.868, width: size * 1.12, height: size * 0.155, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.30) 38%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0) 78%)", opacity: shadow, zIndex: 0 }} />
      {/* tight dark contact core right under the feet */}
      <div style={{ position: "absolute", left: size * 0.19, top: size * 0.895, width: size * 0.62, height: size * 0.075, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.34) 55%, rgba(0,0,0,0) 82%)", opacity: shadow, zIndex: 0 }} />
    </>}
    <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: flip ? "scaleX(-1)" : undefined }}>{children}</div>
  </div>
);

// Subtle hologram scanlines + edge vignette — the "this is a simulation" motif. Drop on top of a scene.
const SimScan: React.FC<{ o?: number; hue?: string }> = ({ o = 1, hue = "120,180,255" }) => (
  <>
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 41, background: `repeating-linear-gradient(0deg, rgba(${hue},0.05) 0px, rgba(${hue},0.05) 1px, transparent 2px, transparent 5px)`, opacity: 0.5 * o, mixBlendMode: "screen" }} />
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 41, boxShadow: `inset 0 0 120px rgba(8,14,30,0.6), inset 0 0 30px rgba(${hue},0.10)`, opacity: o }} />
  </>
);

// Small corner readout chip for the sim ("SIM · DAY 3", "RUN 12", etc.)
const SimTag: React.FC<{ text: string; x?: number; y?: number; hue?: string }> = ({ text, x = 22, y = 20, hue = "150,190,255" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 44, padding: "6px 14px", borderRadius: 9, background: "rgba(10,18,36,0.82)", border: `1.5px solid rgba(${hue},0.5)`, fontFamily: mono, fontSize: 20, fontWeight: 700, letterSpacing: 1, color: `rgba(${hue},0.95)`, boxShadow: `0 0 14px rgba(${hue},0.25)` }}>{text}</div>
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

const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: boolean }> = ({ lf, big, clay, chip = true }) => { const p = over(lf, 0, fr(0.14), Easing.out(Easing.cubic)); return (<>
  {chip && (
  <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#14B88F,#0C7D62)", border: "2px solid #7FE8CE", boxShadow: "0 6px 16px rgba(0,0,0,0.5), 0 0 12px rgba(16,163,127,0.55)" }}>
    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#EAFFF7", boxShadow: `0 0 8px #EAFFF7`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(lf / 5)) }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}>GPT-5.6 SOL · LIVE</span>
  </div>)}
  <div style={{ position: "absolute", left: 0, right: 0, top: 48, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p, lineHeight: 1.02 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EEDF", textShadow: "0 3px 12px rgba(0,0,0,0.75), 0 0 10px rgba(0,0,0,0.55)", whiteSpace: "nowrap" }}>{big}</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F0A878", textShadow: "0 3px 12px rgba(0,0,0,0.75), 0 0 14px rgba(240,168,120,0.35)", whiteSpace: "nowrap" }}>{clay}</div>
  </div>
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

// Fast per-scene retention bar: a slim zip-fill that races in eased spurts + snaps to 100% + a ✓ just before the scene cut (Zeigarnik "almost done, don't scroll").
const StatusZip: React.FC<{ lf: number; dur: number; label: string; from: number; to: number; suffix?: string; variant?: string; y?: number }> = ({ lf, dur, label, from, to, suffix = '', variant = 'green', y = 660 }) => {
  const W = 372, end = dur - 16;
  const steps: [number, number][] = [[0.05, 0.17], [0.22, 0.35], [0.40, 0.56], [0.58, 0.74], [0.76, 0.90], [0.90, 1.0]];
  let prog = 0;
  steps.forEach(([t0, v]) => { prog = Math.max(prog, v * over(lf, t0 * end, 6, Easing.out(Easing.cubic))); });
  prog = Math.min(1, prog);
  const val = Math.round(interpolate(prog, [0, 1], [from, to]));
  const done = prog >= 0.985;
  const fill = variant === 'red' ? grad('#C44A3A', '#D2724E') : grad('#10A37F', '#3F9E74');
  const spark = variant === 'red' ? '#FFB020' : '#4FE8C0';
  const appear = over(lf, 5, 12);
  const doneP = done ? over(lf, end, 10, Easing.out(Easing.back(1.7))) : 0;
  return (
    <div style={{ position: 'absolute', left: 506 - W / 2, top: y, width: W, opacity: appear, zIndex: 45 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 13, fontWeight: 900, letterSpacing: 2, color: variant === 'red' ? '#E58A63' : '#8FE0C4' }}>{label}</span>
        <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: variant === 'red' ? '#FF6A3A' : '#3FD9A8' }}>{val.toLocaleString('en-US')}{suffix}</span>
      </div>
      <div style={{ position: 'relative', height: 11, borderRadius: 6, background: '#1a1712', border: '1px solid rgba(26,24,19,0.9)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${prog * 100}%`, borderRadius: 6, background: fill, boxShadow: `0 0 12px ${spark}99` }} />
        <div style={{ position: 'absolute', left: `${prog * 100}%`, top: -3, width: 9, height: 17, marginLeft: -4, borderRadius: 4, background: spark, boxShadow: `0 0 14px ${spark}`, opacity: done ? 0 : 1 }} />
        {done && (<div style={{ position: 'absolute', right: -12, top: -10, width: 28, height: 28, borderRadius: 14, background: '#10A37F', border: `2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 900, transform: `scale(${doneP})`, boxShadow: '0 0 14px rgba(16,163,127,0.7)' }}>✓</div>)}
      </div>
    </div>
  );
};

const HookBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
{(() => {
  const CX = 506;
  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
  const pA = interpolate(lf, [0, 132, 138], [1, 1, 0], clamp);
  const pB = interpolate(lf, [139, 153, 262, 278], [0, 1, 1, 0], clamp);
  const pC = interpolate(lf, [270, 288], [0, 1], clamp);
  const sheen = 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 34%)';
  const PLANETS = [
    { k: 'terra', c1: '#8FE0B0', c2: '#2C7A52', ring: false, r: 1.0 },
    { k: 'luna', c1: '#F2F5FA', c2: '#A7B3C8', ring: false, r: 0.74 },
    { k: 'mars', c1: '#EC8A5E', c2: '#9C3E24', ring: false, r: 0.8 },
    { k: 'nept', c1: '#74ADE6', c2: '#2A559A', ring: false, r: 0.9 },
    { k: 'sat', c1: '#EDCE86', c2: '#AE8636', ring: true, r: 0.86 },
  ];
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(120% 92% at 50% 44%, rgba(231,178,76,0.10), #1c1710 52%, #120c08 100%)' }} />

      {/* ===== BEAT A (0-4.3s): COSMIC WHIRL — Sol sucks the planets in, spins, FLINGS them out ===== */}
      {pA > 0.01 && (() => {
        const solY = 432;
        const spin = lf * 0.05 + Math.pow(over(lf, 30, 64), 2) * 10.5;
        const rMul = lf < 99
          ? interpolate(lf, [28, 99], [1, 0.13], { ...clamp, easing: Easing.in(Easing.cubic) })
          : interpolate(lf, [100, 132], [0.13, 4.6], { ...clamp, easing: Easing.out(Easing.cubic) });
        const flash = interpolate(lf, [92, 100, 113], [0, 0.92, 0], clamp);
        const solScale = interpolate(lf, [0, 40, 96, 100, 106, 132], [1, 1, 1.26, 1.64, 1.34, 1.18], clamp);
        const flingFade = 1 - over(lf, 114, 20);
        const wave = over(lf, 99, 30);
        const appear = interpolate(lf, [0, 12], [0, 1], clamp);
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: pA }}>
            {/* core bloom */}
            <div style={{ position: 'absolute', left: CX - 270, top: solY - 270, width: 540, height: 540, borderRadius: '50%', background: `radial-gradient(circle, rgba(231,178,76,${0.28 + (solScale - 1) * 0.4}), rgba(207,114,78,0.12) 44%, transparent 70%)`, filter: 'blur(4px)' }} />
            {/* faint orbit trail ellipse */}
            <div style={{ position: 'absolute', left: CX - 214, top: solY - 132, width: 428, height: 264, borderRadius: '50%', border: '1.5px dashed rgba(231,178,76,0.14)', opacity: (1 - over(lf, 88, 16)) * appear, transform: `scale(${rMul < 1 ? Math.max(rMul, 0.3) : 1})`, transformOrigin: 'center' }} />
            {/* shockwave on the fling */}
            {wave > 0.01 && wave < 1 && (
              <div style={{ position: 'absolute', left: CX - 20, top: solY - 20, width: 40, height: 40, borderRadius: '50%', border: '5px solid #E7B24C', transform: `scale(${interpolate(wave, [0, 1], [1, 18])})`, opacity: interpolate(wave, [0, 0.2, 1], [0, 0.85, 0]) }} />
            )}
            {/* orbiting planets */}
            {PLANETS.map((pl, i) => {
              const ang = spin + i * (Math.PI * 2 / 5);
              const px = CX + Math.cos(ang) * 214 * rMul;
              const py = solY + Math.sin(ang) * 132 * rMul;
              const psz = 48 * pl.r;
              const behind = Math.sin(ang) < -0.15;
              const op = flingFade * appear;
              return (
                <div key={pl.k} style={{ position: 'absolute', left: px - psz / 2, top: py - psz / 2, width: psz, height: psz, zIndex: behind ? 5 : 22, opacity: op }}>
                  {pl.ring && <div style={{ position: 'absolute', left: -psz * 0.36, top: psz * 0.3, width: psz * 1.72, height: psz * 0.54, borderRadius: '50%', border: `${psz * 0.09}px solid ${pl.c2}`, opacity: 0.7, transform: 'rotate(-18deg)', boxSizing: 'border-box' }} />}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 34% 30%, ${pl.c1}, ${pl.c2} 92%)`, boxShadow: `0 3px 8px rgba(0,0,0,0.5), inset ${-psz * 0.12}px ${-psz * 0.1}px ${psz * 0.3}px rgba(0,0,0,0.45)` }} />
                </div>
              );
            })}
            {/* Sol at the center (the sun eating the system) */}
            <div style={{ position: 'absolute', left: CX - 90, top: solY - 90, width: 180, transform: `scale(${solScale})`, transformOrigin: 'center', zIndex: 12 }}>
              <SolMascot lf={lf} size={180} cheer={0.5} gaze={Math.sin(lf / 24) * 0.4} shock={interpolate(lf, [90, 101], [0, 0.5], clamp) * (1 - over(lf, 112, 16))} />
            </div>
            {/* white flash at the climax */}
            <div style={{ position: 'absolute', inset: 0, background: '#FFF3D6', opacity: flash, mixBlendMode: 'screen', pointerEvents: 'none' }} />
            {/* ChatGPT brand badge (less zoomed) */}
            <div style={{ position: 'absolute', left: CX - 52, top: 176, width: 104, height: 104, borderRadius: '50%', overflow: 'hidden', background: '#fff', border: '4px solid #10A37F', boxShadow: '0 8px 18px rgba(0,0,0,0.4), 0 0 16px rgba(16,163,127,0.5)', opacity: over(lf, 4, 12), zIndex: 30 }}>
              <Img src={staticFile('chatgpt_logo.png')} style={{ width: '86%', height: '86%', marginLeft: '7%', marginTop: '7%', display: 'block' }} />
            </div>

            {/* ===== CHAMPION REVEAL — the fling crowns Sol #1, beating Claude Mythos ===== */}
            {lf >= 96 && (() => {
              const crownScale = over(lf, 100, 10, Easing.out(Easing.back(2.2)));
              const crownY = interpolate(lf, [100, 109, 112], [solY - 234, solY - 116, solY - 128], clamp);
              const podRise = over(lf, 104, 16, Easing.out(Easing.cubic));
              const podY = interpolate(podRise, [0, 1], [200, 0]);
              const mythOp = over(lf, 108, 10) * 0.64;
              const tag = over(lf, 104, 10);
              const sparkle = 1 - over(lf, 109, 7);
              return (
                <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
                  {/* #2 podium step (CLAUDE MYTHOS) — shorter, dim, desaturated */}
                  <div style={{ position: 'absolute', left: 612, top: 566, width: 150, height: 156, transform: `translateY(${podY}px)`, opacity: mythOp, background: grad('#2A3340', '#1C242F'), border: '1px solid rgba(150,170,215,0.18)', borderRadius: '10px 10px 0 0' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 20, textAlign: 'center' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: '#C4613A', margin: '0 auto 8px' }} />
                      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: '#8792A6', letterSpacing: 0.4 }}>CLAUDE MYTHOS</div>
                      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 30, color: '#AEB8C6', marginTop: 2 }}>88.0</div>
                    </div>
                  </div>
                  {/* #1 podium step (SOL) — tall, gold, glowing */}
                  <div style={{ position: 'absolute', left: 420, top: 512, width: 172, height: 210, transform: `translateY(${podY}px)`, opacity: podRise, background: grad('#8A5E12', '#4A3208'), border: '3px solid #E7B24C', borderRadius: '10px 10px 0 0', boxShadow: '0 0 28px rgba(231,178,76,0.45), inset 0 2px 0 rgba(255,224,138,0.4)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 8, textAlign: 'center', fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 150, lineHeight: 1, color: 'rgba(231,178,76,0.15)' }}>1</div>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 34, textAlign: 'center' }}>
                      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: '#F2B845', letterSpacing: 1 }}>SOL</div>
                      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: '#FFE08A', textShadow: '0 0 14px rgba(255,224,138,0.5)' }}>91.9</div>
                    </div>
                  </div>
                  {/* CROWN on Sol */}
                  <div style={{ position: 'absolute', left: CX - 60, top: crownY, width: 120, height: 78, transform: `scale(${crownScale})`, transformOrigin: 'center bottom', zIndex: 46 }}>
                    <svg viewBox="0 0 120 78" width="120" height="78">
                      <defs><linearGradient id="crownG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F6D27A" /><stop offset="100%" stopColor="#D89A2A" /></linearGradient></defs>
                      <path d="M12 70 L8 26 L36 48 L60 14 L84 48 L112 26 L108 70 Z" fill="url(#crownG)" stroke="#1A1813" strokeWidth="4" strokeLinejoin="round" />
                      <rect x="12" y="60" width="96" height="15" rx="4" fill="url(#crownG)" stroke="#1A1813" strokeWidth="4" />
                      <circle cx="60" cy="40" r="7" fill="#10A37F" stroke="#1A1813" strokeWidth="3" />
                      <circle cx="30" cy="52" r="4" fill="#E7B24C" /><circle cx="90" cy="52" r="4" fill="#E7B24C" />
                    </svg>
                  </div>
                  {/* THE NEW #1 line under the header */}
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', opacity: tag, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, letterSpacing: 1.5, color: '#10A37F' }}>THE NEW #1 · TERMINAL-BENCH 2.1</div>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* ===== BEAT B (4.3-9.2s): ONE Sol buried under an avalanche of 50 tasks, cash spinning up ===== */}
      {pB > 0.01 && (() => {
        const solY = 494;
        const stress = over(lf, 150, 44);
        const cost = Math.round(interpolate(lf, [142, 272], [260, 5400], clamp));
        const pileN = Math.min(16, Math.floor(over(lf, 150, 120) * 16));
        const shake = Math.sin(lf * 1.4) * (1.5 + stress * 1.5);
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: pB }}>
            {/* stress bloom behind Sol */}
            <div style={{ position: 'absolute', left: CX - 240, top: 330, width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, rgba(196,74,58,${0.12 + stress * 0.12}), rgba(231,178,76,0.05) 46%, transparent 68%)`, filter: 'blur(6px)' }} />
            {/* contact shadow under the pile */}
            <div style={{ position: 'absolute', left: CX - 210, top: 616, width: 420, height: 40, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent 72%)', filter: 'blur(9px)' }} />

            {/* AVALANCHE: task-cards rain down onto the pile (behind Sol) */}
            {Array.from({ length: 13 }).map((_, i) => {
              const per = 190; const ph = ((lf * 1.05 + i * (per / 13)) % per + per) % per / per;
              const x = CX - 148 + (i / 13) * 296 + Math.sin(lf / 15 + i * 2) * 10;
              const y = 156 + ph * 420;
              const op = interpolate(ph, [0, 0.1, 0.86, 1], [0, 1, 1, 0]);
              return (
                <div key={`rn${i}`} style={{ position: 'absolute', left: x, top: y, width: 46, height: 58, borderRadius: 5, overflow: 'hidden', background: grad('#F7F3EA', '#E4D8C4'), border: '2px solid #8A7A5E', transform: `rotate(${(seed(i) - 0.5) * 46}deg)`, opacity: op, boxShadow: '0 3px 8px rgba(0,0,0,0.4)', zIndex: 6 }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: grad('#C8896A', '#A2503A') }} />
                  <div style={{ position: 'absolute', left: 6, top: 20, right: 6, height: 4, borderRadius: 2, background: 'rgba(60,50,38,0.4)' }} />
                  <div style={{ position: 'absolute', left: 6, top: 30, width: 22, height: 4, borderRadius: 2, background: 'rgba(60,50,38,0.3)' }} />
                </div>
              );
            })}

            {/* the growing PILE burying Sol's lower half */}
            {Array.from({ length: 16 }).map((_, i) => { const on = i < pileN; const col = i % 6; const row = Math.floor(i / 6);
              return on ? (
                <div key={`pl${i}`} style={{ position: 'absolute', left: CX - 172 + col * 58 + row * 16, top: 612 - row * 30, width: 54, height: 64, borderRadius: 5, overflow: 'hidden', background: grad('#F3ECDF', '#E0D0B8'), border: '2px solid #8A7A5E', transform: `rotate(${(seed(i + 9) - 0.5) * 18}deg)`, boxShadow: '0 4px 9px rgba(0,0,0,0.32)', zIndex: row < 1 ? 4 : 15 }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: grad('#C8896A', '#A2503A') }} />
                  <div style={{ position: 'absolute', left: 6, top: 20, right: 6, height: 4, borderRadius: 2, background: 'rgba(60,50,38,0.35)' }} />
                </div>
              ) : null; })}

            {/* Sol — overwhelmed, no props, just a stressed face, jittering under the load */}
            <div style={{ position: 'absolute', left: CX - 86 + shake, top: solY - 86, width: 172, zIndex: 10 }}>
              <SolMascot lf={lf} size={172} cheer={interpolate(stress, [0, 1], [0.25, 0])} gaze={Math.sin(lf / 12) * 0.6} shock={0.5 + stress * 0.3} />
            </div>
            {/* sweat flying off */}
            {[0, 1, 2, 3].map((k) => { const sp = (((lf * 1.6 + k * 12) % 38) + 38) % 38 / 38; const side = k % 2 === 0 ? -1 : 1;
              return sp < 0.85 ? <div key={`sw${k}`} style={{ position: 'absolute', left: CX + side * (54 + Math.floor(k / 2) * 22) + side * sp * 26, top: solY - 70 - sp * 26, width: 9, height: 13, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#8FD0FF', opacity: (1 - sp) * 0.75, zIndex: 11 }} /> : null; })}

            {/* the $$$ cost odometer, spinning up fast (top-right, clear of the avalanche) */}
            <div style={{ position: 'absolute', left: 686, top: 232, width: 270, textAlign: 'center' }}>
              <div style={{ fontFamily: inter.fontFamily, fontSize: 15, fontWeight: 900, letterSpacing: 1, color: '#E58A63' }}>1 SOL DOES IT ALL</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontSize: 60, fontWeight: 900, color: RED, textShadow: '0 0 22px rgba(196,74,58,0.55)', lineHeight: 1.04 }}>{'$' + cost.toLocaleString('en-US')}</div>
              <div style={{ marginTop: 6, display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(196,74,58,0.16)', border: '1.5px solid rgba(196,74,58,0.5)', fontFamily: inter.fontFamily, fontSize: 18, fontWeight: 800, color: '#F0C877' }}>and SLOW</div>
            </div>
          </div>
        );
      })()}
      {/* ===== BEAT C (9.2-12s): the crew forms the assembly line ===== */}
      {pC > 0.01 && (() => {
        const beltIn = over(lf, 284, 22);
        const crew = [{ m: 'sol', x: 232 }, { m: 'terra', x: 506 }, { m: 'luna', x: 780 }];
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: pC }}>
            <div style={{ position: 'absolute', left: CX - 220, top: 300, width: 440, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(63,158,116,0.16), transparent 66%)', filter: 'blur(6px)' }} />
            <div style={{ position: 'absolute', left: 92, top: 604, width: 828, height: 30, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45), transparent 72%)', filter: 'blur(7px)' }} />
            <div style={{ position: 'absolute', left: 76, right: 76, top: 512, height: 16, borderRadius: 8, background: 'repeating-linear-gradient(90deg,#3A2C1C 0 18px,#2A2013 18px 36px)', transform: `scaleX(${beltIn})`, transformOrigin: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />
            {crew.map((s, i) => { const pin = over(lf, 288 + i * 7, 15, Easing.out(Easing.back(1.5)));
              return (
                <div key={`cw${i}`} style={{ position: 'absolute', left: s.x - 60, top: 366, width: 120, transform: `translateY(${(1 - pin) * 30}px) scale(${pin})`, opacity: pin, textAlign: 'center' }}>
                  {s.m === 'sol' ? <SolMascot lf={lf} size={112} cheer={0.7} /> : s.m === 'terra' ? <TerraMascot lf={lf} size={112} cheer={0.5} /> : <LunaMascot lf={lf} size={106} cheer={0.6} />}
                  <div style={{ marginTop: 6, fontFamily: inter.fontFamily, fontSize: 14, fontWeight: 900, letterSpacing: 1, color: s.m === 'sol' ? GOLD : s.m === 'terra' ? '#7FD8A6' : '#B9C6D8' }}>{s.m.toUpperCase()}</div>
                </div>
              );
            })}
            <div style={{ position: 'absolute', left: CX, top: 256, transform: `translateX(-50%) scale(${over(lf, 298, 14, Easing.out(Easing.back(1.5)))})`, padding: '11px 28px', borderRadius: 999, background: grad('#EFBE5C', '#CF9544'), border: `3px solid ${INK}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: '#2A1B0C', boxShadow: '0 8px 0 rgba(26,24,19,0.35)', whiteSpace: 'nowrap' }}>THE ASSEMBLY LINE</div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
})()}
</>
);

const UltraBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
{(() => {
  const heroIn = over(lf, 0, 12, Easing.out(Easing.cubic));
  const bloomPulse = 0.7 + Math.sin(lf / 9) * 0.3;
  const solBob = Math.sin(lf / 22) * 5;
  const stampDrop = over(lf, 24, 22, Easing.out(Easing.cubic));
  const specSettle = over(lf, 40, 16, Easing.out(Easing.back(1.4)));
  const stampFlash = Math.max(0, 1 - over(lf, 46, 20));
  const specY = 300 - (1 - stampDrop) * 130;
  const qFill = over(lf, 60, 44, Easing.out(Easing.cubic));
  const setPop = over(lf, 104, 14, Easing.out(Easing.back(1.8)));
  const glintX = ((lf % 60) / 60);
  const pillIn = over(lf, 14, 12, Easing.out(Easing.back(1.5)));
  const tread = (lf * 2.4) % 44;
  const stations = [
    { x: 556, type: 'terra', label: 'TERRA', ring: '#7FD8A6', seed: 1 },
    { x: 700, type: 'luna', label: 'LUNA', ring: '#B9C6D8', seed: 2 },
    { x: 844, type: 'sol', label: 'SOL', ring: GOLD, seed: 3 },
  ];
  const embers = [0, 1, 2, 3, 4, 5];
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <div style={{
        position: 'absolute', width: 620, height: 620,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(231,178,76,0.26), rgba(207,149,68,0.10) 40%, transparent 68%)',
        transform: `translate(-50%,-50%) scale(${0.9 + bloomPulse * 0.14})`,
        left: 210, top: 470,
        opacity: 0.85 * heroIn, filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', left: 300, top: 560, width: 260, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,163,127,0.20), transparent 66%)',
        transform: `translate(-50%,-50%)`, opacity: 0.7 * heroIn, filter: 'blur(3px)',
      }} />
      <div style={{
        position: 'absolute', left: 60, top: 646, width: 900, height: 60,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 72%)',
        filter: 'blur(8px)', opacity: heroIn,
      }} />
      <div style={{
        position: 'absolute', left: 70, top: 560, width: 882, height: 84,
        borderRadius: 42,
        background: grad('#3A2C1C', '#231A10'),
        boxShadow: NAVYSH + ', inset 0 2px 0 rgba(255,255,255,0.10), inset 0 -6px 14px rgba(0,0,0,0.55)',
        opacity: heroIn,
        transform: `translateY(${(1 - heroIn) * 30}px)`,
      }}>
        <div style={{
          position: 'absolute', inset: '14px 30px', borderRadius: 24, overflow: 'hidden',
          background: `repeating-linear-gradient(90deg, #2A2013 0px, #2A2013 22px, #372A1A 22px, #372A1A 44px)`,
          backgroundPositionX: `${-tread}px`,
          boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 34%)',
          }} />
        </div>
        {[42, 840].map((rx, i) => (
          <div key={`roller-${i}`} style={{
            position: 'absolute', top: 6, left: rx, width: 72, height: 72,
            borderRadius: '50%',
            background: grad('#7C93AE', '#2E455F'),
            boxShadow: 'inset 0 3px 4px rgba(255,255,255,0.4), inset 0 -6px 10px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              position: 'absolute', inset: '18%', borderRadius: '50%',
              background: grad('#516D8C', '#22364C'),
              boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.5)',
              transform: `rotate(${(lf * 6) * (i ? -1 : 1)}deg)`,
            }}>
              <div style={{
                position: 'absolute', top: '46%', left: '10%', right: '10%', height: 3,
                background: 'rgba(255,255,255,0.35)', borderRadius: 2,
              }} />
            </div>
          </div>
        ))}
      </div>
      {stations.map((st, i) => {
        const flicker = 0.84 + Math.sin(lf / 14 + st.seed * 2) * 0.06;
        return (
          <div key={`st-${i}`} style={{
            position: 'absolute', left: st.x - 43, top: 496, opacity: heroIn * flicker, textAlign: 'center',
          }}>
            <div style={{
              position: 'absolute', left: 4, top: 78, width: 82, height: 20,
              borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 72%)',
              filter: 'blur(4px)',
            }} />
            <div style={{ width: 86, height: 86, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {st.type === 'terra' ? <TerraMascot lf={lf} size={82} gaze={-0.2} />
                : st.type === 'luna' ? <LunaMascot lf={lf} size={78} gaze={-0.2} />
                : <SolMascot lf={lf} size={82} gaze={-0.2} />}
            </div>
            <div style={{ fontFamily: inter.fontFamily, fontSize: 12, fontWeight: 900, letterSpacing: 1, color: st.ring, marginTop: 2 }}>{st.label}</div>
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 5 }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{
                  width: 5, height: 5, borderRadius: '50%', background: st.ring,
                  opacity: 0.3 + 0.5 * Math.max(0, Math.sin(lf / 8 - d * 0.8)),
                }} />
              ))}
            </div>
          </div>
        );
      })}
      {stampDrop > 0.01 && (
        <div style={{
          position: 'absolute', left: 300, top: specY,
          transform: `translate(-50%,0) rotate(${(1 - specSettle) * -6}deg) scale(${0.9 + specSettle * 0.1})`,
          opacity: Math.min(1, stampDrop * 1.4),
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: 236,
            width: 200 * (0.6 + stampDrop * 0.4), height: 26,
            transform: 'translateX(-50%)', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 72%)',
            filter: 'blur(5px)', opacity: stampDrop,
          }} />
          <div style={{
            width: 214, height: 236, borderRadius: 14,
            background: grad('#1E3A64', '#12264A'),
            border: '2px solid rgba(231,178,76,0.85)',
            boxShadow: NAVYSH + ', 0 0 26px rgba(30,58,100,0.6), inset 0 1px 0 rgba(255,255,255,0.18)',
            position: 'relative', overflow: 'hidden',
            filter: 'blur(3px)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, rgba(120,170,230,0.16) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(120,170,230,0.16) 0 1px, transparent 1px 22px)',
            }} />
            <div style={{
              position: 'absolute', top: 14, left: 16, width: 120, height: 12,
              borderRadius: 4, background: 'rgba(231,178,76,0.85)',
            }} />
            <div style={{
              position: 'absolute', top: 34, left: 16, width: 82, height: 7,
              borderRadius: 3, background: 'rgba(180,205,240,0.7)',
            }} />
            {[70, 92, 114, 136, 158, 180].map((ty, i) => (
              <div key={i} style={{
                position: 'absolute', top: ty, left: 16, width: 150 - (i % 3) * 26, height: 6,
                borderRadius: 3, background: 'rgba(150,185,230,0.55)',
              }} />
            ))}
            <div style={{ position: 'absolute', top: 70, right: 16, width: 40, height: 40, borderRadius: 6, border: '1.5px solid rgba(231,178,76,0.7)', background: 'rgba(231,178,76,0.12)' }} />
            <div style={{ position: 'absolute', top: 120, right: 16, width: 40, height: 40, borderRadius: 6, border: '1.5px solid rgba(120,170,230,0.6)', background: 'rgba(120,170,230,0.1)' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 34%)',
            }} />
          </div>
          <div style={{
            position: 'absolute', left: '50%', top: 92, transform: 'translate(-50%,0)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: specSettle,
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%',
              background: grad('#2A2013', '#171008'),
              border: '2px solid rgba(231,178,76,0.9)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ position: 'relative', width: 22, height: 20 }}>
                <div style={{
                  position: 'absolute', top: 0, left: 4, width: 14, height: 12,
                  borderRadius: '8px 8px 0 0', border: '3px solid ' + GOLD, borderBottom: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, width: 22, height: 13,
                  borderRadius: 3, background: GOLD,
                }} />
              </div>
            </div>
          </div>
          <div style={{
            position: 'absolute', left: '50%', top: 246, transform: 'translate(-50%,0)',
            padding: '7px 14px', borderRadius: 20, whiteSpace: 'nowrap',
            background: grad('#2A2013', '#191108'),
            border: '1px solid rgba(231,178,76,0.7)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.45)',
            fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 0.4,
            color: GOLD, opacity: specSettle,
          }}>
            MASTER SPEC · in the guide
          </div>
          {stampFlash > 0.01 && (
            <div style={{
              position: 'absolute', left: '50%', top: 118,
              width: 214 + (1 - stampFlash) * 120, height: 236 + (1 - stampFlash) * 120,
              transform: 'translate(-50%,-50%)', borderRadius: 20,
              border: `3px solid rgba(231,178,76,${0.7 * stampFlash})`,
              opacity: stampFlash,
            }} />
          )}
        </div>
      )}
      <div style={{
        position: 'absolute', left: 210, top: 350 + solBob,
        transform: `translate(-50%,-50%) scale(${0.86 + heroIn * 0.14})`,
        opacity: heroIn,
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: 150, width: 190, height: 40,
          transform: 'translateX(-50%)', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 72%)',
          filter: 'blur(7px)',
        }} />
        <SolMascot lf={lf} size={172} cheer={0.25} gaze={0.35} point={over(lf, 22, 10)} think={0.4} />
      </div>
      <div style={{
        position: 'absolute', left: 210, top: 470,
        transform: `translate(-50%,0)`, opacity: heroIn,
      }}>
        <div style={{
          width: 176, height: 60, borderRadius: 14,
          background: grad('#2E455F', '#182635'),
          border: '1.5px solid rgba(124,147,174,0.5)',
          boxShadow: NAVYSH + ', inset 0 2px 0 rgba(255,255,255,0.14)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: '8px 12px', borderRadius: 6,
            background: 'repeating-linear-gradient(115deg, rgba(150,185,230,0.14) 0 1px, transparent 1px 14px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(125deg, rgba(255,255,255,0.24) 0%, transparent 34%)',
          }} />
        </div>
      </div>
      <div style={{
        position: 'absolute', left: 210, top: 168,
        transform: `translate(-50%,0) scale(${0.85 + pillIn * 0.15})`,
        opacity: pillIn,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 20px', borderRadius: 30, whiteSpace: 'nowrap',
        background: grad('#10A37F', '#0B7A5E'),
        border: '1.5px solid rgba(255,255,255,0.28)',
        boxShadow: '0 8px 20px rgba(16,163,127,0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', overflow: 'hidden',
          background: '#fff', border: '1.5px solid #10A37F', flexShrink: 0,
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}>
          <Img src={staticFile('chatgpt_logo.png')} style={{ width: '118%', height: '118%', marginLeft: '-9%', marginTop: '-9%', display: 'block' }} />
        </div>
        <span style={{
          fontSize: 20, fontWeight: 800, letterSpacing: 0.6, color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>SOL: 1 JOB ONLY</span>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `${-40 + glintX * 180}%`, width: '30%',
          background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent)',
          transform: 'skewX(-18deg)', pointerEvents: 'none',
        }} />
      </div>
      <div style={{
        position: 'absolute', left: 660, top: 180, width: 300,
        opacity: heroIn, transform: `translateY(${(1 - heroIn) * 18}px)`,
      }}>
        <div style={{
          padding: '18px 20px 20px', borderRadius: 16,
          background: grad('#20303F', '#131E29'),
          border: '1.5px solid rgba(124,147,174,0.4)',
          boxShadow: NAVYSH + ', inset 0 1px 0 rgba(255,255,255,0.1)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 16,
            background: 'linear-gradient(125deg, rgba(255,255,255,0.2) 0%, transparent 34%)',
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{
              fontSize: 15, fontWeight: 700, letterSpacing: 1.2, color: MUTE,
            }}>QUALITY BAR</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              opacity: setPop, transform: `scale(${0.6 + setPop * 0.4})`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: grad('#4FBF8C', '#2E7A56'),
                boxShadow: '0 2px 8px rgba(63,158,116,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 9, height: 5, borderLeft: '2.5px solid #fff', borderBottom: '2.5px solid #fff',
                  transform: 'rotate(-45deg) translate(0px,-1px)',
                }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: GREEN, letterSpacing: 0.5 }}>SET</span>
            </div>
          </div>
          <div style={{
            position: 'relative', height: 40, borderRadius: 10,
            background: 'rgba(58,92,132,0.28)',
            border: '1px solid rgba(124,147,174,0.3)',
            boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0,
              width: `${(0.06 + qFill * 0.84) * 100}%`,
              background: grad('#F0C766', '#CF9544'),
              borderRadius: 9,
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), 0 0 16px rgba(231,178,76,0.5)',
            }}>
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: `${-30 + glintX * 160}%`, width: '26%',
                background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent)',
                transform: 'skewX(-18deg)',
              }} />
            </div>
            <div style={{
              position: 'absolute', top: -3, bottom: -3, left: '90%', width: 3,
              background: GREEN, borderRadius: 2,
              boxShadow: `0 0 8px ${GREEN}`,
            }} />
            <div style={{
              position: 'absolute', top: -9, left: '90%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
              borderTop: `7px solid ${GREEN}`,
            }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
            <span style={{
              fontFamily: fraunces.fontFamily, fontSize: 34, fontWeight: 700, color: GOLD,
              textShadow: '0 0 14px rgba(231,178,76,0.4)',
            }}>{Math.round((0.06 + qFill * 0.84) * 100)}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: GOLD }}>%</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: MUTE, marginLeft: 'auto', letterSpacing: 0.5 }}>TARGET 90%</span>
          </div>
        </div>
        <div style={{
          position: 'absolute', left: '50%', top: 168, width: 260, height: 24,
          transform: 'translateX(-50%)', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 72%)',
          filter: 'blur(7px)',
        }} />
      </div>
      {embers.map(i => {
        const s = seed(i * 3 + 1);
        const s2 = seed(i * 7 + 2);
        const cyc = (lf * (0.5 + s * 0.5) + i * 40) % 200;
        const ex = 120 + s * 760;
        const ey = 720 - cyc * 2.2;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(lf / 10 + i));
        return (
          <div key={`ember-${i}`} style={{
            position: 'absolute', left: ex + Math.sin(lf / 18 + i) * 14, top: ey,
            width: 4 + s2 * 3, height: 4 + s2 * 3, borderRadius: '50%',
            background: i % 2 ? GOLD : '#10A37F',
            opacity: tw * 0.6 * heroIn,
            boxShadow: `0 0 8px ${i % 2 ? GOLD : '#10A37F'}`,
            filter: 'blur(0.4px)',
          }} />
        );
      })}
      <div style={{
        position: 'absolute', top: 140, bottom: 40, left: `${-30 + ((lf % 120) / 120) * 150}%`, width: '18%',
        background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.06), transparent)',
        transform: 'skewX(-14deg)', pointerEvents: 'none',
        opacity: heroIn,
      }} />
    </AbsoluteFill>
  );
})()}
</>
);

const StackBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
{(() => {
  // ===== timing / progress =====
  const bob = Math.sin(lf / 22) * 5;
  const beltShift = (lf * 3.2) % 40;            // fast conveyor tread
  const count = Math.round(interpolate(lf, [120, 290], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const pressPulse = ((lf - 96) % 11 + 11) % 11; // stamp cycle ~ every 11f once press live
  const pressActive = lf > 96 ? 1 : 0;
  const punch = pressActive ? Math.max(0, 1 - pressPulse / 5) : 0; // 1 at strike -> 0
  const tick = pressActive && pressPulse < 2 ? 1 : 0;
  const bloomPulse = 0.7 + Math.sin(lf / 9) * 0.3;

  // stations
  const solIn = over(lf, 0, 16, Easing.out(Easing.cubic));
  const solStep = over(lf, 40, 26, Easing.inOut(Easing.cubic)); // Sol steps back + dims
  const handoff = over(lf, 20, 18);
  const terraIn = over(lf, 30, 18, Easing.out(Easing.back(1.4)));
  const lunaIn = over(lf, 66, 20, Easing.out(Easing.back(1.3)));
  const finalPop = over(lf, 300, 26, Easing.out(Easing.back(1.7)));

  // belt geometry
  const beltY = 560;
  const beltLeft = 60, beltRight = 952, beltW = beltRight - beltLeft;

  // draft fan cards (Terra output)
  const drafts = [0, 1, 2, 3, 4];
  // stacked finished units (right pile) count derived from counter
  const pileMax = 14;
  const pileShown = Math.min(pileMax, Math.round(count / 50 * pileMax));

  const goldNum = grad(GOLD, AMBER);
  const sheen = 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 34%)';

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* ===== L1 ambient blooms ===== */}
      <div style={{ position: 'absolute', left: 506 - 380, top: beltY - 300, width: 760, height: 620,
        background: `radial-gradient(circle, rgba(231,178,76,${0.20 * bloomPulse}), transparent 66%)`,
        filter: 'blur(6px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 720, top: 300, width: 460, height: 460,
        background: `radial-gradient(circle, rgba(63,158,116,${0.16 * bloomPulse}), transparent 68%)`,
        filter: 'blur(4px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 40, top: 300, width: 420, height: 420,
        background: `radial-gradient(circle, rgba(231,178,76,${0.18 * bloomPulse}), transparent 68%)`,
        filter: 'blur(4px)', pointerEvents: 'none' }} />

      {/* drifting embers */}
      {[0,1,2,3,4,5,6,7].map((i) => {
        const s = seed(i * 7 + 3);
        const x = 90 + s * 840;
        const driftY = ((lf * (0.5 + s * 0.9) + i * 90) % 520);
        const yy = 700 - driftY;
        const tw = 0.25 + Math.abs(Math.sin(lf / 12 + i)) * 0.55;
        return (<div key={`em${i}`} style={{ position: 'absolute', left: x, top: yy,
          width: 4 + s * 3, height: 4 + s * 3, borderRadius: '50%',
          background: i % 3 === 0 ? 'rgba(63,158,116,0.8)' : 'rgba(231,178,76,0.85)',
          opacity: tw, filter: 'blur(0.4px)', boxShadow: '0 0 8px rgba(231,178,76,0.6)' }} />);
      })}

      {/* ===== HEADLINE strip: cost pill + counter ===== */}
      {/* ×N COUNTER — top center */}
      <div style={{ position: 'absolute', left: 506, top: 168, transform: `translate(-50%,0) scale(${0.9 + finalPop * 0.12 + (tick ? 0.03 : 0)})`, textAlign: 'center' }}>
        <div style={{ fontFamily: inter.fontFamily, fontSize: 22, fontWeight: 800, letterSpacing: 3,
          color: MUTE, opacity: over(lf, 60, 14) }}>TASKS SHIPPED</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 2 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontSize: 96, fontWeight: 800, lineHeight: 1,
            background: goldNum, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.45))', opacity: over(lf, 62, 12) }}>{count}</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontSize: 48, fontWeight: 700, color: MUTE,
            opacity: over(lf, 62, 12) }}>/50</span>
          {count >= 50 && (<span style={{ fontFamily: inter.fontFamily, fontSize: 44, fontWeight: 900,
            color: GREEN, marginLeft: 6, transform: `scale(${0.6 + finalPop * 0.7})`,
            filter: 'drop-shadow(0 0 10px rgba(63,158,116,0.6))' }}>✓</span>)}
        </div>
      </div>

      {/* COST METER pill — top right, tiny green */}
      <div style={{ position: 'absolute', left: 754, top: 284, width: 208,
        opacity: over(lf, 18, 16), transform: `translateY(${(1 - over(lf, 18, 16)) * -14}px)` }}>
        <div style={{ position: 'relative', borderRadius: 16, padding: '13px 15px',
          background: grad('rgba(20,32,40,0.92)', 'rgba(12,20,26,0.92)'),
          border: '1px solid rgba(63,158,116,0.35)',
          boxShadow: '0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: sheen, pointerEvents: 'none' }} />
          <div style={{ fontFamily: inter.fontFamily, fontSize: 13, fontWeight: 800, letterSpacing: 2, color: MUTE }}>COST</div>
          <div style={{ position: 'relative', marginTop: 7, height: 12, borderRadius: 6, background: 'rgba(58,92,132,0.28)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '18%',
              background: grad(GREEN, '#2E7E5A'), borderRadius: 6,
              boxShadow: '0 0 12px rgba(63,158,116,0.6)' }} />
          </div>
          <div style={{ marginTop: 9, display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,163,127,0.16)', border: '1px solid rgba(16,163,127,0.5)',
            borderRadius: 999, padding: '4px 11px' }}>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 16, fontWeight: 900, color: '#10A37F' }}>1/5 the cost</span>
          </div>
        </div>
      </div>

      {/* ===== THE BATCH 50-tracker (right) — anchors the right side from the start ===== */}
      <div style={{ position: 'absolute', left: 754, top: 400, width: 208,
        opacity: over(lf, 10, 16), transform: `translateY(${(1 - over(lf, 10, 16)) * 14}px)` }}>
        <div style={{ position: 'relative', borderRadius: 16, padding: '13px 15px',
          background: grad('rgba(22,32,48,0.92)', 'rgba(12,20,32,0.92)'),
          border: '1px solid rgba(231,178,76,0.22)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: sheen, pointerEvents: 'none' }} />
          <div style={{ fontFamily: inter.fontFamily, fontSize: 13, fontWeight: 800, letterSpacing: 2, color: MUTE, marginBottom: 9 }}>THE BATCH</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4 }}>
            {Array.from({ length: 50 }).map((_, k) => { const done = k < count; return (
              <div key={`bt${k}`} style={{ width: '100%', paddingBottom: '120%', borderRadius: 3,
                background: done ? grad('#10A37F', '#0C7C60') : 'rgba(58,92,132,0.26)',
                boxShadow: done ? '0 0 5px rgba(16,163,127,0.55)' : 'inset 0 0 0 1px rgba(231,178,76,0.10)' }} />); })}
          </div>
        </div>
      </div>

      {/* ===== CONVEYOR BELT ===== */}
      {/* contact shadow under belt */}
      <div style={{ position: 'absolute', left: beltLeft - 6, top: beltY + 62, width: beltW + 12, height: 44,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 72%)', filter: 'blur(8px)' }} />
      {/* track */}
      <div style={{ position: 'absolute', left: beltLeft, top: beltY, width: beltW, height: 62,
        borderRadius: 34, overflow: 'hidden',
        background: grad('#3A2C1C', '#2A2013'),
        border: '1px solid rgba(231,178,76,0.18)',
        boxShadow: '0 16px 34px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -8px 18px rgba(0,0,0,0.5)' }}>
        {/* animated tread */}
        <div style={{ position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(90deg, rgba(0,0,0,0.30) 0px, rgba(0,0,0,0.30) 6px, rgba(231,178,76,0.10) 6px, rgba(231,178,76,0.10) 12px, transparent 12px, transparent 40px)`,
          transform: `translateX(${-beltShift}px)`, width: 'calc(100% + 40px)' }} />
        {/* top rim light */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 10,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.16), transparent)' }} />
      </div>
      {/* metal rollers */}
      {[beltLeft - 2, beltRight - 34].map((rx, i) => (
        <div key={`roll${i}`} style={{ position: 'absolute', left: rx, top: beltY - 4, width: 40, height: 70,
          borderRadius: 20, background: grad('#5A76A0', SLATE),
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 18px rgba(0,0,0,0.5), inset -3px 0 8px rgba(0,0,0,0.4), inset 3px 0 6px rgba(255,255,255,0.22)' }} />
      ))}

      {/* ===== STATION 1: SOL head — hands off + steps back/dims ===== */}
      <div style={{ position: 'absolute', left: 40 - solStep * 24, top: 330 + bob * 0.5,
        transform: `translateY(${(1 - solIn) * 30}px)`,
        opacity: (0.35 + solIn * 0.65) * (1 - solStep * 0.42) }}>
        <div style={{ position: 'absolute', left: 20, top: 168, width: 190, height: 30,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent 72%)', filter: 'blur(6px)' }} />
        <SolMascot lf={lf} size={150} gaze={0.6} point={handoff} think={0.2 * (1 - handoff)} />
      </div>
      {/* SOL 'hands off' tag */}
      <div style={{ position: 'absolute', left: 96, top: 486,
        opacity: handoff * (1 - solStep * 0.5), transform: `translateY(${(1 - handoff) * 10}px)` }}>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6,
          borderRadius: 999, padding: '6px 13px',
          background: grad('rgba(231,178,76,0.20)', 'rgba(207,149,68,0.12)'),
          border: '1px solid rgba(231,178,76,0.5)', boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 15, fontWeight: 800, color: GOLD, letterSpacing: 0.5 }}>hands off spec →</span>
        </div>
      </div>
      {/* SPEC packet travelling from Sol toward Terra */}
      {(() => {
        const t = over(lf, 20, 26, Easing.inOut(Easing.cubic));
        const sx = interpolate(t, [0, 1], [175, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const sy = 470 - Math.sin(t * Math.PI) * 40;
        if (lf < 18 || lf > 60) return null;
        return (
          <div style={{ position: 'absolute', left: sx, top: sy, transform: `rotate(${t * 20}deg)` }}>
            <div style={{ position: 'relative', width: 46, height: 58, borderRadius: 7,
              background: grad(PAPER, '#E6DFCF'), border: '1px solid rgba(0,0,0,0.15)',
              boxShadow: '0 8px 18px rgba(0,0,0,0.45)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 7, background: sheen }} />
              <div style={{ position: 'absolute', left: 6, top: 8, width: 34, height: 6, borderRadius: 3, background: SLATE, opacity: 0.7 }} />
              <div style={{ position: 'absolute', left: 6, top: 20, width: 26, height: 4, borderRadius: 2, background: MUTE }} />
              <div style={{ position: 'absolute', left: 6, top: 30, width: 30, height: 4, borderRadius: 2, background: MUTE }} />
            </div>
          </div>
        );
      })()}

      {/* ===== STATION 2: TERRA — green earth node + draft FAN ===== */}
      <div style={{ position: 'absolute', left: 330, top: 360 + Math.sin(lf / 24) * 4,
        transform: `translateY(${(1 - terraIn) * 26}px) scale(${0.9 + terraIn * 0.1})`, opacity: terraIn }}>
        {/* node contact shadow */}
        <div style={{ position: 'absolute', left: -6, top: 128, width: 120, height: 26,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent 72%)', filter: 'blur(6px)' }} />
        {/* Terra earth-globe mascot */}
        <div style={{ position: 'relative', width: 108, height: 108, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TerraMascot lf={lf} size={114} cheer={0.35} gaze={0.4} />
          <div style={{ position: 'absolute', bottom: -26, left: '50%', transform: 'translateX(-50%)',
            fontFamily: inter.fontFamily, fontSize: 15, fontWeight: 800, letterSpacing: 2, color: GREEN }}>TERRA</div>
        </div>
      </div>
      {/* DRAFT FAN emitted upward-right of Terra */}
      {drafts.map((i) => {
        const dl = over(lf, 44 + i * 5, 18, Easing.out(Easing.back(1.3)));
        const ang = (i - 2) * 11;
        const rise = -8 - i * 3;
        return (
          <div key={`dr${i}`} style={{ position: 'absolute', left: 452 + i * 6, top: 356 + rise,
            transform: `translateY(${(1 - dl) * 24}px) rotate(${ang * dl}deg) scale(${0.7 + dl * 0.3})`,
            transformOrigin: 'bottom left', opacity: dl }}>
            <div style={{ position: 'relative', width: 68, height: 90, borderRadius: 9,
              background: grad('#FBF7EE', '#E9E1CF'), border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 9, background: sheen, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 8, top: 9, right: 8, height: 12, borderRadius: 4, background: grad(SLATE, '#2E4B6E'), opacity: 0.85 }} />
              <div style={{ position: 'absolute', left: 8, top: 30, width: 44, height: 5, borderRadius: 3, background: MUTE }} />
              <div style={{ position: 'absolute', left: 8, top: 42, width: 50, height: 5, borderRadius: 3, background: 'rgba(154,150,139,0.7)' }} />
              <div style={{ position: 'absolute', left: 8, top: 54, width: 38, height: 5, borderRadius: 3, background: 'rgba(154,150,139,0.6)' }} />
              <div style={{ position: 'absolute', left: 8, bottom: 8, fontFamily: inter.fontFamily, fontSize: 9, fontWeight: 800, color: GREEN, letterSpacing: 1 }}>DRAFT</div>
            </div>
          </div>
        );
      })}
      {/* 'drafts' micro-label */}
      <div style={{ position: 'absolute', left: 470, top: 300, opacity: over(lf, 58, 12),
        fontFamily: inter.fontFamily, fontSize: 14, fontWeight: 700, color: MUTE, letterSpacing: 1 }}>turns spec → drafts</div>

      {/* ===== STATION 3: LUNA at the STAMP PRESS ===== */}
      {/* Luna moon above press */}
      <div style={{ position: 'absolute', left: 636, top: 336 + Math.sin(lf / 20) * 5,
        transform: `translateY(${(1 - lunaIn) * 28}px) scale(${0.85 + lunaIn * 0.15})`, opacity: lunaIn }}>
        <div style={{ position: 'absolute', left: 14, top: 118, width: 110, height: 24,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45), transparent 72%)', filter: 'blur(6px)' }} />
        <LunaMascot lf={lf} size={128} gaze={-0.3} cheer={0.3 + punch * 0.5} />
        <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
          fontFamily: inter.fontFamily, fontSize: 14, fontWeight: 800, letterSpacing: 2, color: '#9DB6D6' }}>LUNA</div>
      </div>

      {/* PRESS RIG — frame + punching head */}
      <div style={{ position: 'absolute', left: 626, top: 462, opacity: lunaIn }}>
        {/* frame posts */}
        <div style={{ position: 'absolute', left: -8, top: 0, width: 12, height: 108, borderRadius: 6,
          background: grad('#5A76A0', '#33507A'), boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.25), inset -2px 0 4px rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', left: 152, top: 0, width: 12, height: 108, borderRadius: 6,
          background: grad('#5A76A0', '#33507A'), boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.25), inset -2px 0 4px rgba(0,0,0,0.4)' }} />
        {/* crossbar */}
        <div style={{ position: 'absolute', left: -12, top: -8, width: 176, height: 20, borderRadius: 8,
          background: grad('#647FA8', SLATE), boxShadow: '0 4px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }} />
        {/* PUNCH HEAD */}
        <div style={{ position: 'absolute', left: 20, top: 16 + punch * 40,
          width: 116, height: 46, borderRadius: 10,
          background: grad('#C9DAF0', '#7E9AC4'),
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: `0 ${8 + punch * 6}px ${16 + punch * 8}px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.5)` }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: sheen, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -8, left: 30, width: 56, height: 10, borderRadius: 4,
            background: grad('#8FA8CC', SLATE), boxShadow: '0 3px 6px rgba(0,0,0,0.4)' }} />
        </div>
        {/* strike spark */}
        {tick === 1 && (
          <div style={{ position: 'absolute', left: 78, top: 108, width: 30, height: 30, transform: 'translate(-50%,-50%)' }}>
            {[0,1,2,3,4,5].map((k) => (
              <div key={`sp${k}`} style={{ position: 'absolute', left: '50%', top: '50%',
                width: 3, height: 14, borderRadius: 2, background: GOLD,
                transform: `rotate(${k * 60}deg) translateY(-11px)`, transformOrigin: 'center top',
                opacity: 0.9, filter: 'drop-shadow(0 0 6px rgba(231,178,76,0.8))' }} />
            ))}
          </div>
        )}
      </div>
      {/* tick ripple on belt under press */}
      {tick === 1 && (
        <div style={{ position: 'absolute', left: 704, top: beltY + 6, width: 60, height: 60,
          transform: 'translate(-50%,0)', borderRadius: '50%',
          border: '2px solid rgba(231,178,76,0.7)', opacity: 0.7 }} />
      )}

      {/* ===== FINISHED UNITS on belt (freshly stamped, sliding right) ===== */}
      {[0,1,2].map((i) => {
        // each unit born at press then rides belt right
        const phase = ((lf * 3.2) + i * 90);
        const ride = (phase % 260);
        const ux = 704 + ride;
        if (ux > beltRight - 40 || lf < 100) return null;
        const born = Math.min(1, ride / 20);
        return (
          <div key={`unit${i}`} style={{ position: 'absolute', left: ux, top: beltY - 30,
            transform: `scale(${0.6 + born * 0.4})`, opacity: born }}>
            <div style={{ position: 'absolute', left: 4, top: 62, width: 54, height: 12,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45), transparent 72%)', filter: 'blur(4px)' }} />
            <div style={{ position: 'relative', width: 58, height: 64, borderRadius: 8,
              background: grad('#FBF7EE', '#EAE2D0'), border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: sheen, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 7, top: 7, right: 7, height: 11, borderRadius: 4, background: grad('#10A37F', '#0C7C60') }} />
              <div style={{ position: 'absolute', left: 7, top: 26, width: 38, height: 5, borderRadius: 3, background: MUTE }} />
              <div style={{ position: 'absolute', left: 7, top: 37, width: 30, height: 5, borderRadius: 3, background: 'rgba(154,150,139,0.7)' }} />
              <div style={{ position: 'absolute', right: 6, bottom: 5, width: 15, height: 15, borderRadius: '50%',
                background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 8px rgba(63,158,116,0.6)' }}>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== GROWING PILE (right end, with depth) ===== */}
      <div style={{ position: 'absolute', left: 852, top: beltY - 8 }}>
        {/* pile contact shadow */}
        <div style={{ position: 'absolute', left: -30, top: 66, width: 130, height: 24,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 72%)', filter: 'blur(7px)' }} />
        {Array.from({ length: pileShown }).map((_, i) => {
          const g = seed(i * 3 + 1);
          const pop = over(lf, 122 + i * 11, 10, Easing.out(Easing.back(1.5)));
          return (
            <div key={`pile${i}`} style={{ position: 'absolute',
              left: -6 + (g - 0.5) * 14, top: 34 - i * 9,
              transform: `rotate(${(g - 0.5) * 8}deg) scale(${pop})`, opacity: pop, transformOrigin: 'bottom center' }}>
              <div style={{ width: 78, height: 20, borderRadius: 5,
                background: grad('#FBF7EE', '#E7DFCD'),
                border: '1px solid rgba(0,0,0,0.12)',
                boxShadow: '0 5px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                <div style={{ position: 'absolute', left: 6, top: 6, width: 22, height: 7, borderRadius: 3, background: '#10A37F', opacity: 0.9 }} />
                <div style={{ position: 'absolute', right: 6, top: 6, width: 10, height: 10, borderRadius: '50%', background: GREEN,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 7, fontWeight: 900 }}>✓</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== foreground GLINT sweep across belt ===== */}
      {(() => {
        const gp = (lf % 150) / 150;
        const gx = interpolate(gp, [0, 1], [-160, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const go = Math.sin(gp * Math.PI) * 0.5;
        return (
          <div style={{ position: 'absolute', left: gx, top: beltY - 90, width: 130, height: 240,
            transform: 'skewX(-18deg)', pointerEvents: 'none', opacity: go,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            filter: 'blur(3px)' }} />
        );
      })()}

      {/* ===== FINAL x50 ✓ celebratory seal ===== */}
      {finalPop > 0.01 && (
        <div style={{ position: 'absolute', left: 506, top: 690, transform: `translate(-50%,0) scale(${finalPop})`, opacity: Math.min(1, finalPop * 1.3) }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10,
            borderRadius: 999, padding: '11px 24px',
            background: grad('rgba(63,158,116,0.22)', 'rgba(16,163,127,0.16)'),
            border: '1px solid rgba(63,158,116,0.6)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 30px rgba(63,158,116,0.4)' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: sheen, pointerEvents: 'none' }} />
            <span style={{ fontFamily: fraunces.fontFamily, fontSize: 30, fontWeight: 800, color: '#EAF7F0' }}>50 shipped</span>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 26, fontWeight: 900, color: GREEN,
              filter: 'drop-shadow(0 0 8px rgba(63,158,116,0.7))' }}>✓</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
})()}
</>
);

const AgentBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
{(() => {
  const heroIn = over(lf, 0, 14, Easing.out(Easing.cubic));
  const bob = Math.sin(lf / 22) * 5;
  const bloomPulse = 0.7 + Math.sin(lf / 9) * 0.3;
  const tread = (lf * 2.4) % 40;
  const cx = 506;

  // conveyor geometry
  const beltY = 560;
  const beltH = 92;
  const beltX = 70;
  const beltW = 872;

  // rollers
  const rollers = [beltX + 30, beltX + beltW - 30];

  // reject beat window
  const rejectStart = 138;
  const rejectKick = over(lf, rejectStart, 46, Easing.out(Easing.cubic));
  const rejectArc = Math.sin(Math.min(1, rejectKick) * Math.PI);

  // batch-clean seal at the end
  const cleanIn = over(lf, 196, 20, Easing.out(Easing.back(1.6)));
  const cleanPulse = 0.85 + Math.sin(lf / 7) * 0.15;

  // scanning magnifier sweep
  const scanPhase = (lf / 40) % 1;

  // travelling units on the belt: each has a spawn frame and lane position
  const units = [
    { id: 0, t0: -30, good: 1 },
    { id: 1, t0: 8, good: 1 },
    { id: 2, t0: 52, good: 1 },
    { id: 3, t0: 96, good: 1 },
    { id: 4, t0: rejectStart - 44, good: 0 },
    { id: 5, t0: 182, good: 1 },
    { id: 6, t0: 214, good: 1 }
  ];

  const inspectX = cx + 40; // x where Sol inspects
  const unitW = 116;
  const unitH = 128;

  const emberN = 7;

  const sheen = 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 34%)';

  return (
    <AbsoluteFill style={{ opacity: heroIn }}>

      {/* BLOOM behind Sol inspector */}
      <div style={{
        position: 'absolute', left: inspectX - 320, top: 150, width: 640, height: 640,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(231,178,76,0.26), rgba(207,149,68,0.10) 42%, transparent 68%)',
        opacity: bloomPulse, filter: 'blur(2px)'
      }} />

      {/* drifting embers */}
      {Array.from({ length: emberN }).map((_, i) => {
        const s = seed(i * 7 + 3);
        const ex = 180 + s * 680;
        const drift = Math.sin(lf / (16 + s * 10) + i) * 26;
        const ey = 210 + ((lf * (0.5 + s) + i * 90) % 360);
        const tw = 0.25 + (0.5 + Math.sin(lf / 6 + i) * 0.5) * 0.55;
        return (
          <div key={`em${i}`} style={{
            position: 'absolute', left: ex + drift, top: ey,
            width: 6 + s * 5, height: 6 + s * 5, borderRadius: '50%',
            background: i % 2 ? 'rgba(231,178,76,0.9)' : 'rgba(207,114,78,0.85)',
            boxShadow: '0 0 10px rgba(231,178,76,0.55)', opacity: tw
          }} />
        );
      })}

      {/* QA GATE seal — top left */}
      <div style={{
        position: 'absolute', left: 96, top: 172,
        display: 'flex', alignItems: 'center', gap: 12,
        transform: `translateY(${Math.sin(lf / 26) * 3}px)`
      }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          background: grad('#3F9E74', '#2E7A57'),
          boxShadow: '0 8px 18px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.25)', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: sheen }} />
          <div style={{ color: '#F7F3EA', fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 30 }}>QA</div>
        </div>
        <div style={{
          fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: 3,
          color: '#ECE9E2', textShadow: '0 2px 6px rgba(0,0,0,0.5)'
        }}>QA GATE</div>
      </div>

      {/* GATED QA rubric card — off to the right, blurred */}
      <div style={{
        position: 'absolute', right: 60, top: 168, width: 176, height: 214,
        transform: `translateY(${Math.sin(lf / 24 + 1) * 4}px) rotate(3deg)`
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16,
          background: grad('rgba(58,92,132,0.9)', 'rgba(30,52,80,0.92)'),
          boxShadow: NAVYSH, border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden',
          filter: 'blur(3px)'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: sheen }} />
          <div style={{ position: 'absolute', top: 16, left: 16, right: 16, height: 12, borderRadius: 4, background: 'rgba(231,178,76,0.55)' }} />
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={`ru${r}`} style={{
              position: 'absolute', left: 16, right: 16, top: 44 + r * 26, height: 10, borderRadius: 3,
              background: `rgba(236,233,226,${0.4 - r * 0.04})`, width: `${72 - r * 8}%`
            }} />
          ))}
        </div>
        {/* lock cue + label (sharp, above blur) */}
        <div style={{
          position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%', background: 'rgba(20,25,35,0.82)',
            border: '2px solid rgba(231,178,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: 24 }}>🔒</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', left: '50%', bottom: -30, transform: 'translateX(-50%)',
          fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap',
          color: '#E7B24C', textShadow: '0 2px 5px rgba(0,0,0,0.6)'
        }}>QA rubric · in the guide</div>
      </div>

      {/* CONVEYOR contact shadow */}
      <div style={{
        position: 'absolute', left: beltX + 20, top: beltY + beltH - 8, width: beltW - 40, height: 46,
        borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)',
        filter: 'blur(6px)'
      }} />

      {/* CONVEYOR belt track */}
      <div style={{
        position: 'absolute', left: beltX, top: beltY, width: beltW, height: beltH, borderRadius: 46,
        background: grad('#3A2C1C', '#241A0F'),
        boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.08), inset 0 -8px 16px rgba(0,0,0,0.55), 0 10px 24px rgba(0,0,0,0.4)',
        overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)'
      }}>
        {/* animated tread */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 3px, transparent 3px, transparent 40px)',
          transform: `translateX(${-tread}px)`
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: 'linear-gradient(180deg, rgba(255,255,255,0.10), transparent)' }} />
      </div>

      {/* metal rollers */}
      {rollers.map((rx, i) => (
        <div key={`rl${i}`} style={{
          position: 'absolute', left: rx - 26, top: beltY - 6, width: 52, height: beltH + 12, borderRadius: 26,
          background: grad('#4C6E96', '#2C4360'),
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -6px 12px rgba(0,0,0,0.5), 0 6px 14px rgba(0,0,0,0.4)',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 3px, transparent 3px, transparent 9px)',
            transform: `translateY(${-(lf * 2.4) % 12}px)`
          }} />
          <div style={{ position: 'absolute', top: 6, left: 8, width: 8, height: beltH, borderRadius: 4, background: 'rgba(255,255,255,0.35)', filter: 'blur(1px)' }} />
        </div>
      ))}

      {/* TRAVELLING UNITS */}
      {units.map((u) => {
        const age = lf - u.t0;
        if (age < 0) return null;
        // travel speed along belt
        const speed = 6.0;
        let ux = beltX + 40 + age * speed;
        // pause slightly under inspector to be scanned
        const atInspect = ux > inspectX - 70 && ux < inspectX + 30;
        if (ux > beltX + beltW + 90) return null;

        const uy = beltY - unitH - 4;

        // decide stamp reveal once past inspector
        const passedInspect = ux > inspectX;
        const stampP = passedInspect ? over(lf, u.t0 + (inspectX - beltX - 40) / speed, 8, Easing.out(Easing.back(1.6))) : 0;

        // reject unit kick-back arc
        let liftY = 0, kickX = 0, rot = 0, redPulse = 0;
        if (u.good === 0) {
          // when it reaches inspector, kick it back up and to the left
          const reachF = u.t0 + (inspectX - beltX - 40) / speed;
          const kp = over(lf, reachF, 46, Easing.inOut(Easing.cubic));
          const arc = Math.sin(Math.min(1, kp) * Math.PI);
          liftY = -arc * 220;
          kickX = -kp * 300;
          rot = -kp * 40;
          redPulse = arc;
          // freeze its baseline x at inspector so the arc reads as a bounce-back
          ux = inspectX - 8;
        }

        const good = u.good === 1;
        const stripe = good ? grad('#3F9E74', '#2E7A57') : grad('#C44A3A', '#9A3327');

        return (
          <div key={`u${u.id}`} style={{
            position: 'absolute', left: ux + kickX - unitW / 2, top: uy + liftY,
            width: unitW, height: unitH,
            transform: `rotate(${rot}deg) scale(${atInspect ? 1.04 : 1})`,
            transformOrigin: 'center bottom', zIndex: u.good === 0 ? 40 : 20
          }}>
            {/* contact shadow */}
            <div style={{
              position: 'absolute', left: 12, bottom: -14 - liftY * 0.02, width: unitW - 24, height: 20,
              borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)',
              filter: 'blur(3px)', opacity: 1 - Math.min(1, -liftY / 220) * 0.6
            }} />
            {/* card */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 12,
              background: grad('#F7F3EA', '#E4DECF'),
              boxShadow: `0 10px 22px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9)${redPulse > 0 ? `, 0 0 ${20 + redPulse * 26}px rgba(196,74,58,${redPulse * 0.9})` : ''}`,
              overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: sheen }} />
              {/* header stripe */}
              <div style={{ position: 'absolute', top: 10, left: 10, right: 10, height: 16, borderRadius: 5, background: stripe }} />
              {/* text bars */}
              <div style={{ position: 'absolute', top: 40, left: 10, width: '74%', height: 9, borderRadius: 3, background: 'rgba(58,92,132,0.35)' }} />
              <div style={{ position: 'absolute', top: 58, left: 10, width: '56%', height: 9, borderRadius: 3, background: 'rgba(58,92,132,0.25)' }} />
              <div style={{ position: 'absolute', top: 76, left: 10, width: '64%', height: 9, borderRadius: 3, background: 'rgba(58,92,132,0.2)' }} />
              {/* stamp */}
              {stampP > 0 && (
                <div style={{
                  position: 'absolute', right: 8, bottom: 8, width: 40, height: 40, borderRadius: '50%',
                  background: good ? grad('#3F9E74', '#2E7A57') : grad('#C44A3A', '#9A3327'),
                  transform: `scale(${stampP})`,
                  boxShadow: `0 4px 10px rgba(0,0,0,0.4), 0 0 ${good ? 14 : 18}px ${good ? 'rgba(63,158,116,0.7)' : 'rgba(196,74,58,0.8)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F7F3EA', fontWeight: 900, fontSize: 24, fontFamily: inter.fontFamily,
                  border: '2px solid rgba(255,255,255,0.4)'
                }}>{good ? '✓' : '✗'}</div>
              )}
              {/* green flash on good stamp */}
              {good && stampP > 0 && stampP < 1 && (
                <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(63,158,116,0.4)', opacity: (1 - stampP) }} />
              )}
            </div>
          </div>
        );
      })}

      {/* INSPECTOR RIG — overhead beam */}
      <div style={{
        position: 'absolute', left: inspectX - 150, top: 150, width: 300, height: 20, borderRadius: 8,
        background: grad('#4C6E96', '#2C4360'),
        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), 0 6px 14px rgba(0,0,0,0.4)'
      }} />
      {[-1, 1].map((s) => (
        <div key={`post${s}`} style={{
          position: 'absolute', left: inspectX + s * 130 - 6, top: 160, width: 12, height: 210,
          background: grad('#3A5C84', '#26405e'),
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.3)'
        }} />
      ))}

      {/* SCAN GLINT sweep under the rig */}
      <div style={{
        position: 'absolute', left: inspectX - 140, top: 176, width: 280, height: 200, overflow: 'hidden', pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: `${scanPhase * 100}%`, width: 60, height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(231,178,76,0.35), transparent)',
          transform: 'skewX(-16deg)', opacity: 0.6
        }} />
      </div>

      {/* SOL INSPECTOR with magnifier — hero */}
      <div style={{
        position: 'absolute', left: inspectX - 90, top: 178 + bob, width: 180, height: 180, zIndex: 50
      }}>
        {/* sol contact shadow */}
        <div style={{
          position: 'absolute', left: 20, bottom: -18, width: 140, height: 26, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)', filter: 'blur(5px)'
        }} />
        <SolMascot lf={lf} size={160} gaze={-0.3} point={0.4} think={0.5} />
      </div>

      {/* MAGNIFIER — crafted lens held out over the belt */}
      <div style={{
        position: 'absolute', left: inspectX + 40, top: 330 + bob + Math.sin(lf / 14) * 4,
        width: 150, height: 150, zIndex: 55,
        transform: `rotate(${28 + Math.sin(lf / 20) * 4}deg)`
      }}>
        {/* handle — diagonal, seated into the ring's lower-right edge */}
        <div style={{
          position: 'absolute', left: 90, top: 98, width: 70, height: 17, borderRadius: 9,
          transform: 'rotate(45deg)', transformOrigin: '0% 50%',
          background: grad('#E7B24C', '#B98426'),
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.4)'
        }} />
        {/* collar where the handle meets the ring */}
        <div style={{ position: 'absolute', left: 92, top: 92, width: 24, height: 24, borderRadius: '50%', background: grad('#E7B24C', '#B98426'), boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5)' }} />
        {/* ring */}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 118, height: 118, borderRadius: '50%',
          background: grad('#E7B24C', '#B98426'),
          boxShadow: '0 10px 22px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.5)',
          padding: 12, boxSizing: 'border-box'
        }}>
          {/* glass */}
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.5), rgba(120,170,210,0.28) 40%, rgba(58,92,132,0.35) 100%)',
            boxShadow: 'inset 0 0 24px rgba(58,92,132,0.4)', overflow: 'hidden', position: 'relative'
          }}>
            {/* moving glint */}
            <div style={{
              position: 'absolute', top: `${10 + Math.sin(lf / 9) * 10}%`, left: `${8 + Math.sin(lf / 11) * 8}%`,
              width: 40, height: 40, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)', opacity: 0.85
            }} />
          </div>
        </div>
      </div>

      {/* MID-SCENE reject pulse ring at inspector when kicking */}
      {rejectArc > 0.05 && (
        <div style={{
          position: 'absolute', left: inspectX - 90, top: 380, width: 180, height: 180, borderRadius: '50%',
          border: `4px solid rgba(196,74,58,${rejectArc * 0.8})`,
          transform: `translate(-30px,-30px) scale(${1 + rejectArc * 0.8})`,
          boxShadow: `0 0 ${rejectArc * 40}px rgba(196,74,58,0.6)`, zIndex: 45
        }} />
      )}

      {/* "REJECTED" flag on kickback */}
      {rejectArc > 0.15 && (
        <div style={{
          position: 'absolute', left: inspectX - 190 - rejectKick * 60, top: 320 - rejectArc * 200,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: 2,
          color: '#C44A3A', textShadow: '0 3px 8px rgba(0,0,0,0.6)', opacity: rejectArc,
          transform: `rotate(-8deg) scale(${0.8 + rejectArc * 0.3})`, zIndex: 60
        }}>REJECT ✗</div>
      )}

      {/* ESCALATION: BATCH CLEAN seal at the end */}
      {cleanIn > 0.01 && (
        <div style={{
          position: 'absolute', left: cx - 150, top: 690, width: 300, height: 68,
          transform: `translateY(${(1 - cleanIn) * 30}px) scale(${0.9 + cleanIn * 0.1})`,
          opacity: cleanIn, zIndex: 70
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 34,
            background: grad('#3F9E74', '#2E7A57'),
            boxShadow: `0 12px 28px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.4), 0 0 ${cleanPulse * 30}px rgba(63,158,116,0.55)`,
            border: '2px solid rgba(255,255,255,0.28)', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12
          }}>
            <div style={{ position: 'absolute', inset: 0, background: sheen }} />
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F7F3EA', fontWeight: 900, fontSize: 24, border: '2px solid rgba(255,255,255,0.4)'
            }}>✓</div>
            <div style={{
              fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: 1,
              color: '#F7F3EA', textShadow: '0 2px 5px rgba(0,0,0,0.35)'
            }}>Batch clean</div>
          </div>
        </div>
      )}

      {/* foreground vignette for depth */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 55% 45%, transparent 55%, rgba(0,0,0,0.28) 100%)'
      }} />

      <StatusZip lf={lf} dur={241} label="INSPECTING BATCH" from={0} to={50} suffix="/50" y={664} />
    </AbsoluteFill>
  );
})()}
</>
);

const RehookBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
{(() => {
  // ===== timing beats =====
  const heroIn = over(lf, 0, 14, Easing.out(Easing.cubic));           // grid settles fast
  const sealIn = over(lf, 78, 16, Easing.out(Easing.back(1.6)));      // seal slams
  const sealPunch = interpolate(lf, [78, 86, 96], [0.5, 1.08, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const costIn = over(lf, 150, 14, Easing.out(Easing.cubic));         // cost compare
  const loopIn = over(lf, 178, 16, Easing.out(Easing.back(1.4)));     // loop badge
  const bloomPulse = 0.72 + Math.sin(lf / 9) * 0.28;
  const bob = Math.sin(lf / 22) * 4;
  const beltOff = (lf * 2.4) % 44;                                     // conveyor tread
  const spin = (lf * 4.2) % 360;                                       // loop arrow
  const strike = over(lf, 158, 12, Easing.out(Easing.cubic));         // strike-through on $$$

  // ===== finished unit grid: 5 cols x 6 rows = 30 SHARP units =====
  const COLS = 5, ROWS = 6, N = COLS * ROWS;
  const gW = 148, gH = 92, gapX = 20, gapY = 16;
  const gridW = COLS * gW + (COLS - 1) * gapX;   // 5*148 + 4*20 = 820
  const gridH = ROWS * gH + (ROWS - 1) * gapY;   // 6*92 + 5*16 = 632
  const gridX = 506 - gridW / 2;                  // ~96
  const gridY = 150 + (620 - gridH) / 2 + 4;      // vertically center in 150..770 band

  const units = Array.from({ length: N }, (_, i) => {
    const col = i % COLS, row = Math.floor(i / COLS);
    const s = seed(i);
    const delay = 4 + (row * COLS + col) * 1.4 + s * 3;               // stagger stack-in
    const t = over(lf, delay, 12, Easing.out(Easing.cubic));
    const x = gridX + col * (gW + gapX);
    const y = gridY + row * (gH + gapY);
    const drift = Math.sin(lf / 26 + i * 0.7) * 1.6;                  // secondary parallax
    const checkT = over(lf, delay + 8, 8, Easing.out(Easing.back(1.5)));
    const z = 0.94 + s * 0.06;                                        // staggered depth
    return { i, col, row, s, t, x, y, drift, checkT, z };
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* ===== L1: celebratory warm radial bloom ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 470,
        width: 720, height: 720, transform: `translate(-50%,-50%) scale(${0.9 + bloomPulse * 0.14})`,
        background: 'radial-gradient(circle, rgba(231,178,76,0.26), rgba(207,149,68,0.10) 42%, transparent 68%)',
        opacity: 0.55 + bloomPulse * 0.35, filter: 'blur(2px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 506, top: 380,
        width: 1100, height: 900, transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(ellipse at center, rgba(63,158,116,0.10), transparent 60%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* ===== L2: soft belt still running in the far background (runs itself) ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 726, width: 900, height: 40,
        transform: 'translate(-50%,-50%)', borderRadius: 20, opacity: 0.5,
        background: grad('#2A2013', '#3A2C1C'),
        boxShadow: '0 18px 34px rgba(0,0,0,0.42), inset 0 2px 3px rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 3px, transparent 3px, transparent 22px)`,
          transform: `translateX(${-beltOff}px)`,
        }} />
        {/* rollers */}
        <div style={{ position: 'absolute', left: 6, top: 4, width: 32, height: 32, borderRadius: '50%', background: grad('#5A7BA0', '#2E4560'), boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', right: 6, top: 4, width: 32, height: 32, borderRadius: '50%', background: grad('#5A7BA0', '#2E4560'), boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)' }} />
      </div>

      {/* ===== L4: THE PROOF — sharp finished-unit grid ===== */}
      <div style={{
        position: 'absolute', left: gridX, top: gridY, width: gridW, height: gridH,
        transform: `scale(${0.985 + heroIn * 0.015})`, opacity: heroIn,
      }}>
        {/* grounding contact shadow under the whole stack */}
        <div style={{
          position: 'absolute', left: '50%', bottom: -34, width: gridW * 0.9, height: 56,
          transform: 'translateX(-50%)', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)', filter: 'blur(10px)',
        }} />
        {units.map((u) => (
          <div key={`u${u.i}`} style={{
            position: 'absolute',
            left: u.x - gridX, top: (u.y - gridY) + u.drift + (1 - u.t) * 22,
            width: gW, height: gH,
            opacity: u.t,
            transform: `translateY(${bob * (0.3 + u.s * 0.4)}px) scale(${(0.9 + u.t * 0.1) * u.z})`,
          }}>
            {/* per-card contact shadow */}
            <div style={{
              position: 'absolute', left: '8%', bottom: -7, width: '84%', height: 12,
              borderRadius: '50%', background: 'rgba(0,0,0,0.32)', filter: 'blur(5px)',
            }} />
            {/* card body */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 11, overflow: 'hidden',
              background: `linear-gradient(158deg, ${PAPER}, #E9E2D2)`,
              border: '1px solid rgba(26,24,19,0.14)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.30), 0 3px 6px rgba(0,0,0,0.24)',
            }}>
              {/* inner rim-light highlight */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: 11, border: '1px solid rgba(255,255,255,0.55)', maskImage: 'linear-gradient(180deg, #000, transparent 55%)', pointerEvents: 'none' }} />
              {/* header stripe (teal brand) */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 16, background: `linear-gradient(90deg, #10A37F, ${GREEN})` }} />
              {/* 2 text bars — slate-tinted, never grey */}
              <div style={{ position: 'absolute', top: 30, left: 14, width: '62%', height: 8, borderRadius: 4, background: 'rgba(58,92,132,0.34)' }} />
              <div style={{ position: 'absolute', top: 46, left: 14, width: '80%', height: 8, borderRadius: 4, background: 'rgba(58,92,132,0.22)' }} />
              <div style={{ position: 'absolute', top: 62, left: 14, width: '48%', height: 8, borderRadius: 4, background: 'rgba(58,92,132,0.18)' }} />
              {/* baked diagonal sheen */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 34%)', pointerEvents: 'none' }} />
              {/* green check when done */}
              <div style={{
                position: 'absolute', bottom: 10, right: 12, width: 22, height: 22, borderRadius: '50%',
                background: grad(GREEN, '#2F7D58'), boxShadow: '0 2px 5px rgba(47,125,88,0.5), inset 0 1px 2px rgba(255,255,255,0.5)',
                transform: `scale(${u.checkT})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== L4b: cost comparison (lands mid-back) ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 196,
        transform: `translate(-50%, ${(1 - costIn) * -18}px)`, opacity: costIn,
        display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap',
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 800, color: MUTE, letterSpacing: 1 }}>$$$</span>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 17, color: MUTE, marginLeft: 8, fontWeight: 600 }}>all on Sol</span>
          {/* strike-through sweeps in */}
          <div style={{
            position: 'absolute', left: -4, top: '52%', height: 3, width: `${strike * 118}%`,
            background: RED, borderRadius: 2, transform: 'translateY(-50%)',
            boxShadow: '0 1px 3px rgba(196,74,58,0.6)',
          }} />
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 22, color: GOLD, fontWeight: 800 }}>{'>'}</span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 999,
          background: 'rgba(63,158,116,0.16)', border: `1.5px solid ${GREEN}`,
          boxShadow: '0 4px 12px rgba(63,158,116,0.28)',
        }}>
          <span style={{ fontFamily: mono, fontSize: 26, fontWeight: 800, color: GREEN }}>$</span>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 16, color: GREEN, fontWeight: 700 }}>the line</span>
        </div>
      </div>

      {/* ===== L4c: THE SEAL — embossed stamp slams over the grid ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 462,
        transform: `translate(-50%,-50%) scale(${sealIn * sealPunch}) rotate(${-5 + (1 - sealIn) * -9}deg)`,
        opacity: sealIn,
      }}>
        {/* seal contact shadow */}
        <div style={{
          position: 'absolute', left: '50%', top: '58%', width: 360, height: 120,
          transform: 'translate(-50%,-50%)', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)', filter: 'blur(16px)',
        }} />
        <div style={{
          position: 'relative', padding: '20px 42px', borderRadius: 22,
          background: `linear-gradient(158deg, ${GOLD}, ${AMBER})`,
          border: `5px solid ${INK}`,
          boxShadow: '0 26px 46px rgba(0,0,0,0.5), 0 10px 18px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -4px 8px rgba(120,80,20,0.4)',
          textAlign: 'center', overflow: 'hidden',
        }}>
          {/* inner engraved rim */}
          <div style={{ position: 'absolute', inset: 8, borderRadius: 14, border: '2px solid rgba(26,24,19,0.4)', pointerEvents: 'none' }} />
          {/* glint sweep across the seal */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: `${-40 + ((lf * 3.4) % 200)}%`, width: '30%',
            background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent)',
            transform: 'skewX(-18deg)', opacity: 0.7, pointerEvents: 'none',
          }} />
          <div style={{
            fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 72, lineHeight: 0.9,
            color: INK, letterSpacing: 1, textShadow: '0 2px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.25)',
          }}>50 UNITS</div>
          <div style={{
            marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21,
            color: INK, letterSpacing: 3, opacity: 0.92,
          }}>FLAGSHIP QUALITY</div>
          <div style={{
            marginTop: 3, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17,
            color: '#5A3E14', letterSpacing: 2,
          }}>· PENNIES ·</div>
        </div>
      </div>

      {/* ===== L4d: build-once / runs-forever loop badge ===== */}
      <div style={{
        position: 'absolute', left: 506, top: 712,
        transform: `translate(-50%, ${(1 - loopIn) * 20}px) scale(${loopIn})`, opacity: loopIn,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 20px', borderRadius: 999,
        background: `linear-gradient(158deg, ${TERM}, ${TERM2})`,
        border: '1.5px solid rgba(16,163,127,0.5)',
        boxShadow: '0 14px 26px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.10)',
        whiteSpace: 'nowrap',
      }}>
        {/* spinning loop arrow */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(16,163,127,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `rotate(${spin}deg)`,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12a8 8 0 0 1 13.6-5.6M20 12a8 8 0 0 1-13.6 5.6" stroke="#10A37F" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M18 3v4h-4M6 21v-4h4" stroke="#10A37F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: CREAM, letterSpacing: 0.3 }}>
          build once · <span style={{ color: '#10A37F' }}>runs forever</span>
        </span>
      </div>

      {/* ===== L5: drifting embers + foreground glint sweep ===== */}
      {Array.from({ length: 10 }, (_, i) => {
        const s = seed(i * 3 + 1);
        const px = 120 + s * 780;
        const rise = ((lf * (0.7 + s * 0.8) + i * 40) % 620);
        const py = 780 - rise;
        const tw = 0.3 + Math.abs(Math.sin(lf / 12 + i)) * 0.6;
        return (
          <div key={`e${i}`} style={{
            position: 'absolute', left: px, top: py, width: 4 + s * 3, height: 4 + s * 3,
            borderRadius: '50%', background: i % 3 === 0 ? GREEN : GOLD,
            opacity: tw * (0.5 + heroIn * 0.5), filter: 'blur(0.5px)',
            boxShadow: `0 0 8px ${i % 3 === 0 ? 'rgba(63,158,116,0.7)' : 'rgba(231,178,76,0.7)'}`,
            pointerEvents: 'none',
          }} />
        );
      })}
      {/* full-panel celebratory glint sweep once the seal lands */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${-30 + (over(lf, 90, 34) * 150)}%`, width: '26%',
        background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.14), transparent)',
        transform: 'skewX(-16deg)', opacity: over(lf, 90, 8) * (1 - over(lf, 116, 12)) * 0.8,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
})()}
</>
);

// ===== SIMULATE CINEMATIC SCENES (S1..S6) =====
// ===== SIMULATE v4 SCENES =====
// ===== SIMULATE v5 ACTION SCENES =====
// ===== SIMULATE v7 GROUNDED (dream shop) =====
const S1Body: React.FC<{lf:number}> = ({lf}) => {
  const IV = (x:number, ins:number[], outs:number[]) => interpolate(x, ins, outs, {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
  const CREAM = "#ECE9E2", PAPER = "#F7F3EA", INK = "#1A1813";
  const SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C";
  const GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
  const MONO = "ui-monospace, Menlo, monospace";
  const CB = 66, CC = 130;
  const SHOT = lf < CB ? 0 : (lf < CC ? 1 : 2);
  const sA = lf, sB = lf - CB, sC = lf - CC;
  const panel = (op:number) => "0 14px 30px rgba(0,0,0," + op + ")";
  const Shadow = (key:string, x:number, y:number, w:number, h:number, op:number) => (
    <div key={key} style={{position:"absolute", left:x - w / 2, top:y - h / 2, width:w, height:h,
      borderRadius:"50%", pointerEvents:"none",
      background:"radial-gradient(closest-side, rgba(30,18,6," + op + "), rgba(30,18,6,0) 72%)"}} />
  );
  const ColdShadow = (key:string, x:number, y:number, w:number, h:number, op:number) => (
    <div key={key} style={{position:"absolute", left:x - w / 2, top:y - h / 2, width:w, height:h,
      borderRadius:"50%", pointerEvents:"none",
      background:"radial-gradient(closest-side, rgba(58,72,96," + op + "), rgba(58,72,96,0) 74%)"}} />
  );
  const Pool = (key:string, x:number, y:number, w:number, h:number, op:number) => (
    <div key={key} style={{position:"absolute", left:x - w / 2, top:y - h / 2, width:w, height:h,
      borderRadius:"50%", pointerEvents:"none", opacity: Math.max(0, op),
      background:"radial-gradient(closest-side, rgba(255,226,164,0.85), rgba(231,178,76,0.34) 44%, rgba(207,149,68,0) 78%)"}} />
  );
  const camZ = SHOT === 0 ? IV(sA, [0, 66], [1.000, 1.020])
             : SHOT === 1 ? IV(sB, [0, 64], [1.028, 1.002])
             : IV(sC, [0, 66], [1.002, 1.024]);
  // ============ SHOT A : THE DEAD CAFE (bright, complete at frame 0) ============
  const GY = 704;
  const WALL_L = 56, WALL_W = 900;
  const failN = Math.round(IV(sA, [0, 50], [9, 36]));
  const tick = Math.max(0, 1 - ((sA % 5) / 5));
  const swing = Math.sin(sA * 0.13) * 4.6 + Math.sin(sA * 0.41) * 1.2;
  const litter = [
    {w: 52, h: 30, sp: 9.2, y: GY + 6, rot: 7.5, c: PAPER},
    {w: 40, h: 24, sp: 12.4, y: GY + 16, rot: -9.0, c: "#DED9CC"},
    {w: 30, h: 20, sp: 7.4, y: GY + 2, rot: 11.0, c: "#E5E0D2"},
  ];
  // large hard-edged movers : traffic carries on past the dead shop. TWO vehicles,
  // staggered half a period apart so at least one big opaque body is always on screen
  // (a blurred gradient does not register on a frame-delta metric; these are hard + opaque).
  const cars = [
    {ph: 240, sp: 24, c1: "#5C7592", c2: "#33465C", cab: "#6B84A0", cabB: "#3A4E64"},
    {ph: 240 - 780, sp: 24, c1: "#6E6A62", c2: "#403C34", cab: "#807A70", cabB: "#4A453D"},
  ];
  // ============ SHOT B : THE LAB, THE CAST ============
  const DESK_Y = 650;
  const AX = 584, AY = 418, AR = 150;
  const wizX = IV(sB, [0, 16, 34, 52, 64], [232, 252, 224, 252, 240]);
  const pivX = wizX + 78, pivY = 512, wandL = 118;
  const raiseP = over(sB, 2, 12, Easing.inOut(Easing.cubic));
  const castP = over(sB, 14, 8, Easing.out(Easing.cubic));
  const ignite = over(sB, 14, 8, Easing.out(Easing.cubic));
  const burstP = over(sB, 14, 20, Easing.out(Easing.cubic));
  const rattle = sB >= 14 ? Math.max(0, 1 - (sB - 14) / 22) : 0;
  const aimDeg = (Math.atan2(AY - pivY, AX - pivX) * 180) / Math.PI;
  const wandDeg = sB < 14 ? IV(raiseP, [0, 1], [28, -34]) : (aimDeg + Math.sin(sB * 0.22) * 3.4);
  const wandRad = (wandDeg * Math.PI) / 180;
  const tipX = pivX + wandL * Math.cos(wandRad);
  const tipY = pivY + wandL * Math.sin(wandRad);
  const bdx = AX - tipX, bdy = AY - tipY;
  const boltLen = Math.sqrt(Math.max(0.01, bdx * bdx + bdy * bdy));
  const boltDeg = (Math.atan2(bdy, bdx) * 180) / Math.PI;
  const gShakeX = Math.sin(sB * 2.7) * 9 * rattle + Math.sin(sB * 0.08) * 5;
  const gShakeY = Math.cos(sB * 2.2) * 6 * rattle + Math.sin(sB * 0.062) * 4;
  const gShakeR = Math.sin(sB * 1.9) * 3.6 * rattle;
  const breathe = 0.30 + 0.10 * Math.sin(sB * 0.16);
  const labLit = Math.min(1.35, breathe + 1.05 * ignite * (0.80 + 0.20 * Math.sin(sB * 0.42)));
  const runes = [
    {x: 214, y: 300, s: 26, g: "✵"}, {x: 296, y: 246, s: 28, g: "◇"},
    {x: 344, y: 336, s: 22, g: "✦"}, {x: 700, y: 236, s: 24, g: "✦"},
    {x: 762, y: 300, s: 28, g: "✹"}, {x: 940, y: 250, s: 26, g: "◇"},
    {x: 786, y: 452, s: 22, g: "✵"}, {x: 946, y: 466, s: 24, g: "✦"},
  ];
  // ============ SHOT C : INSIDE THE GLOBE ============
  const GRD = 596, PAV = 740;
  const BB = [
    {x: 60,  w: 152, h: 208, a: "#5C86BC", b: "#2E4B72", roof: RED,   win: "#FFE9BE", shop: "#E7B24C"},
    {x: 224, w: 128, h: 300, a: "#E6DCC4", b: "#A08F72", roof: GREEN, win: "#FFF0CE", shop: "#4FBE8C"},
    {x: 366, w: 178, h: 174, a: "#EBB95C", b: "#A87528", roof: RED,   win: "#FFF3D6", shop: "#D2724E"},
    {x: 560, w: 138, h: 252, a: "#4FBE8C", b: "#26694A", roof: CLAY,  win: "#FFEDBE", shop: "#EBB95C"},
    {x: 712, w: 118, h: 196, a: "#E08558", b: "#94472C", roof: SLATE, win: "#FFE9BE", shop: "#5C86BC"},
    {x: 844, w: 122, h: 286, a: "#D9A24E", b: "#8A5F22", roof: GREEN, win: "#FFF0CE", shop: "#E6DCC4"},
  ];
  const cloudX = sC * 7.6;
  const bandX = -380 + ((sC * 21) % 1500);
  const specX = ((sC * 14) % 1520) - 320;
  const vT = sC >= 4 ? (sC - 4) * 17 : -1;
  const crackP = over(sC, 36, 24, Easing.out(Easing.cubic));
  const crackLive = crackP > 0 ? (0.78 + 0.22 * Math.abs(Math.sin(sC * 0.9))) : 0;
  const cits = [
    {x0: 140, sp: 3.0, size: 150, flip: 0, g: 8, cap: 1, tote: 0, scarf: 0},
    {x0: 560, sp: 2.2, size: 142, flip: 0, g: 6, cap: 0, tote: 1, scarf: 1},
    {x0: 880, sp: 0.9, size: 152, flip: 1, g: -8, cap: 0, tote: 0, scarf: 0},
  ];
  return (
    <AbsoluteFill style={{background:"#241B12", overflow:"hidden", fontFamily:"Inter, system-ui, sans-serif"}}>
      <div style={{position:"absolute", inset:0, transform:"scale(" + camZ + ")", transformOrigin:"50% 50%"}}>
        {/* ============ SHOT A : THE FAILURE, ALREADY HAPPENED ============ */}
        {SHOT === 0 ? (
          <div style={{position:"absolute", inset:0}}>
            <div style={{position:"absolute", inset:0,
              background:"linear-gradient(180deg,#BFD6EC 0%,#D6E5F2 34%,#E9F0F5 62%,#EDECE6 100%)"}} />
            {[0,1,2].map((i) => {
              const cx = -560 + (((sA * 7.0) + i * 560) % 1660);
              return (
                <div key={"skc" + i} style={{position:"absolute", left: cx, top: 176 + i * 34, width:540, height:158,
                  borderRadius:"52% 48% 46% 54%", pointerEvents:"none", opacity: 0.62,
                  background:"linear-gradient(180deg, rgba(255,255,255,0.92), rgba(222,235,246,0.20))"}} />
              );
            })}
            <div style={{position:"absolute", left:0, top:GY, width:1012, height:88,
              background:"linear-gradient(180deg,#CFCBC1,#ADA89C)"}} />
            <div style={{position:"absolute", left:0, top:GY, width:1012, height:6,
              background:"rgba(120,116,106,0.75)"}} />
            {Array.from({length: 9}, (_, i) => (
              <div key={"pvj" + i} style={{position:"absolute", left: 24 + i * 120, top:GY + 6, width:3, height:82,
                background:"rgba(122,118,108,0.42)"}} />
            ))}
            <div style={{position:"absolute", left:WALL_L, top:232, width:WALL_W, height: GY - 232,
              background:"linear-gradient(180deg,#F2EFE7 0%," + CREAM + " 46%,#D8D3C7 100%)",
              boxShadow:"inset 0 3px 0 rgba(255,255,255,0.9)"}} />
            <div style={{position:"absolute", left:WALL_L - 14, top:214, width:WALL_W + 28, height:22, borderRadius:3,
              background:"linear-gradient(180deg,#B7B2A6,#8B8579)", boxShadow:"0 8px 16px rgba(60,60,60,0.22)"}} />
            <div style={{position:"absolute", left:WALL_L, top:236, width:WALL_W, height:70,
              background:"linear-gradient(180deg,#2A2722," + INK + ")",
              display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div style={{fontFamily:MONO, fontSize:38, letterSpacing:12, fontWeight:800, color:MUTE}}>CORNER CAFE</div>
            </div>
            {[0,1].map((i) => {
              const t = ((sA * 9.4) + i * 760) % 1520;
              return (
                <div key={"csh" + i} style={{position:"absolute", left: 1060 - t, top:236, width:560, height: GY - 236,
                  pointerEvents:"none",
                  background:"linear-gradient(90deg, rgba(58,80,110,0), rgba(58,80,110,0.20) 42%, rgba(58,80,110,0.20) 62%, rgba(58,80,110,0))"}} />
              );
            })}
            {/* LEFT WINDOW : the receipt taped inside */}
            <div style={{position:"absolute", left:96, top:356, width:400, height:284, borderRadius:3,
              background:"linear-gradient(180deg,#3C4E62,#212C3A)",
              border:"9px solid #8B8579", boxShadow:"inset 0 10px 26px rgba(10,16,24,0.6)"}} />
            <div style={{position:"absolute", left:110, top:366, width:180, height:120, pointerEvents:"none",
              transform:"skewX(-16deg)", opacity:0.16,
              background:"linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0))"}} />
            <div style={{position:"absolute", left:116, top:376, width:360, height:244, borderRadius:3,
              transform:"rotate(-1.1deg)", background: grad(PAPER, "#E4DECD"),
              boxShadow:"0 12px 24px rgba(12,18,26,0.55)"}}>
              <div style={{position:"absolute", left:0, top:0, width:360, height:48, background: INK,
                display:"flex", alignItems:"center", justifyContent:"center"}}>
                <div style={{fontFamily:MONO, fontSize:28, letterSpacing:7, fontWeight:900, color:PAPER}}>RUN 40</div>
              </div>
              <div style={{position:"absolute", left:0, top:56, width:360, height:112,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:MONO, fontSize:100, fontWeight:900, lineHeight:"104px",
                color: RED, opacity: 0.86 + 0.14 * tick}}>{failN}</div>
              <div style={{position:"absolute", left:0, top:176, width:360, height:34,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:MONO, fontSize:25, letterSpacing:3, fontWeight:900, color:INK}}>FAILURES LOGGED</div>
              <div style={{position:"absolute", left:44, top:220, width:272, height:5, borderRadius:2,
                background:"rgba(26,24,19,0.28)"}} />
            </div>
            {[{x:118, y:370, r:-24}, {x:432, y:368, r:22}].map((tp, i) => (
              <div key={"tap" + i} style={{position:"absolute", left:tp.x, top:tp.y, width:60, height:22,
                transform:"rotate(" + tp.r + "deg)", background:"rgba(255,255,255,0.62)",
                border:"1px solid rgba(255,255,255,0.85)"}} />
            ))}
            {/* RIGHT WINDOW : the till reading $0 */}
            <div style={{position:"absolute", left:726, top:356, width:210, height:284, borderRadius:3,
              background:"linear-gradient(180deg,#3C4E62,#212C3A)",
              border:"9px solid #8B8579", boxShadow:"inset 0 10px 26px rgba(10,16,24,0.6)"}} />
            <div style={{position:"absolute", left:736, top:560, width:190, height:16,
              background:"linear-gradient(180deg,#9E978A,#5E594E)"}} />
            <div style={{position:"absolute", left:762, top:466, width:138, height:96, borderRadius:5,
              background:"linear-gradient(180deg,#6E695C,#33302A)", boxShadow:"0 10px 18px rgba(10,16,24,0.5)"}}>
              <div style={{position:"absolute", left:14, top:14, width:110, height:46, borderRadius:3,
                background:"#141A16", border:"2px solid rgba(236,233,226,0.35)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:MONO, fontSize:34, fontWeight:900, letterSpacing:3, color:"#5FA98A"}}>$0</div>
              {[0,1,2,3].map((k) => (
                <div key={"tk" + k} style={{position:"absolute", left: 16 + k * 28, top:70, width:20, height:12, borderRadius:2,
                  background:"rgba(236,233,226,0.32)"}} />
              ))}
            </div>
            {/* DOOR : boarded, CLOSED */}
            <div style={{position:"absolute", left:530, top:356, width:150, height: GY - 356, borderRadius:"3px 3px 0 0",
              background:"linear-gradient(180deg,#4A5F76,#26313F)", border:"7px solid #8B8579",
              boxShadow:"inset 0 8px 22px rgba(10,16,24,0.55)"}} />
            <div style={{position:"absolute", left:548, top:388, width:114, height:56, borderRadius:3,
              background: RED, border:"3px solid " + PAPER,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:MONO, fontSize:24, letterSpacing:3, fontWeight:900, color:PAPER,
              boxShadow:"0 8px 16px rgba(12,18,26,0.45)"}}>CLOSED</div>
            {[{y: 500, r: 6.5}, {y: 578, r: -5.5}].map((pk, i) => (
              <div key={"plk" + i} style={{position:"absolute", left:508, top:pk.y, width:194, height:30, borderRadius:3,
                transform:"rotate(" + pk.r + "deg)",
                background:"linear-gradient(180deg,#C39A63,#8A6435)",
                boxShadow:"0 8px 16px rgba(12,18,26,0.42), inset 0 2px 0 rgba(255,240,214,0.4)"}}>
                <div style={{position:"absolute", left:14, top:11, width:8, height:8, borderRadius:"50%", background:"#4A3A24"}} />
                <div style={{position:"absolute", left:170, top:11, width:8, height:8, borderRadius:"50%", background:"#4A3A24"}} />
              </div>
            ))}
            {/* HANGING "FOR LEASE" NOTICE : swings the whole shot */}
            <div style={{position:"absolute", left:660, top:310, width:12, height:14, background:"#6E695C"}} />
            <div style={{position:"absolute", left:596, top:306, width:150, height:8, borderRadius:3,
              background:"linear-gradient(180deg,#8B8579,#4E4A41)"}} />
            <div style={{position:"absolute", left:596, top:312, width:150, height:86,
              transformOrigin:"50% 0%", transform:"rotate(" + swing + "deg)"}}>
              <div style={{position:"absolute", left:34, top:0, width:4, height:16, background:"#5E594E"}} />
              <div style={{position:"absolute", left:112, top:0, width:4, height:16, background:"#5E594E"}} />
              <div style={{position:"absolute", left:0, top:14, width:150, height:70, borderRadius:4,
                background: PAPER, border:"4px solid " + RED,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 12px 22px rgba(12,18,26,0.36)"}}>
                <div style={{fontFamily:MONO, fontSize:22, letterSpacing:2, fontWeight:900, color:INK,
                  textAlign:"center", lineHeight:"24px"}}>FOR<br />LEASE</div>
              </div>
            </div>
            <div style={{position:"absolute", left:WALL_L - 20, top: GY - 12, width: WALL_W + 40, height:26,
              pointerEvents:"none",
              background:"linear-gradient(180deg, rgba(52,60,74,0), rgba(52,60,74,0.38))"}} />
            {ColdShadow("bcs", 506, GY + 10, 940, 44, 0.30)}
            {litter.map((L, i) => {
              const lx = -120 + (((sA * L.sp) + i * 380) % 1300);
              const bob = Math.sin(sA * 0.34 + i * 1.7) * 5;
              return (
                <div key={"lit" + i} style={{position:"absolute", left:lx, top: L.y + bob, width:L.w, height:L.h,
                  borderRadius:"6px 3px 8px 4px",
                  transform:"rotate(" + (sA * L.rot) + "deg)", background: L.c,
                  boxShadow:"0 5px 9px rgba(52,60,74,0.30)"}} />
              );
            })}
            <div style={{position:"absolute", left:262, top:660, width:70, height:38, borderRadius:2,
              transformOrigin:"0% 50%", transform:"rotate(" + (-6 + Math.sin(sA * 0.3) * 5) + "deg)",
              background:"#E8E3D5", boxShadow:"0 5px 10px rgba(52,60,74,0.28)"}}>
              {[0,1,2].map((k) => (
                <div key={"fly" + k} style={{position:"absolute", left:8, top: 8 + k * 10, width: 50 - k * 12, height:4,
                  borderRadius:2, background:"rgba(26,24,19,0.28)"}} />
              ))}
            </div>
            {/* FOREGROUND CARS : the world carries on past the dead shop (the big hard movers) */}
            {cars.map((C, i) => {
              const cx = -540 + (((sA * C.sp) + C.ph) % 1560);
              if (cx <= -460 || cx >= 1020) return null;
              return (
                <div key={"car" + i} style={{position:"absolute", left: cx, top:712, width:452, height:80}}>
                  <div style={{position:"absolute", left:0, top:22, width:452, height:52, borderRadius:14,
                    background:"linear-gradient(180deg," + C.c1 + "," + C.c2 + ")",
                    boxShadow:"0 -6px 16px rgba(52,60,74,0.30)"}} />
                  <div style={{position:"absolute", left:104, top:0, width:212, height:34, borderRadius:"16px 16px 0 0",
                    background:"linear-gradient(180deg," + C.cab + "," + C.cabB + ")"}} />
                  <div style={{position:"absolute", left:122, top:8, width:78, height:22, borderRadius:"7px 7px 0 0",
                    background:"#C6D3E0"}} />
                  <div style={{position:"absolute", left:214, top:8, width:78, height:22, borderRadius:"7px 7px 0 0",
                    background:"#C6D3E0"}} />
                  <div style={{position:"absolute", left:66, top:60, width:44, height:44, borderRadius:"50%",
                    background:"#20262E", border:"6px solid #9AA3AD",
                    transform:"rotate(" + (cx * 5) + "deg)"}} />
                  <div style={{position:"absolute", left:340, top:60, width:44, height:44, borderRadius:"50%",
                    background:"#20262E", border:"6px solid #9AA3AD",
                    transform:"rotate(" + (cx * 5) + "deg)"}} />
                </div>
              );
            })}
            <div style={{position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(136% 108% at 50% 44%, rgba(0,0,0,0) 64%, rgba(48,60,78,0.20) 100%)"}} />
          </div>
        ) : null}
        {/* ============ SHOT B : THE LAB, THE GLOBE IGNITES ============ */}
        {SHOT === 1 ? (
          <div style={{position:"absolute", inset:0}}>
            <div style={{position:"absolute", inset:0, background: grad("#7A5A34", "#33251A")}} />
            <div style={{position:"absolute", inset:0,
              background:"radial-gradient(120% 90% at 50% 62%, rgba(255,206,138,0.34), rgba(120,78,36,0.10) 52%, rgba(20,14,8,0.42) 100%)"}} />
            {Array.from({length: 7}, (_, i) => (
              <div key={"w" + i} style={{position:"absolute", left:0, right:0, top: 118 + i * 82, height:3,
                background:"linear-gradient(90deg, rgba(255,226,170,0), rgba(255,226,170,0.20), rgba(255,226,170,0))"}} />
            ))}
            {[0,1,2,3].map((i) => (
              <div key={"pil" + i} style={{position:"absolute", left: 8 + i * 332, top:214, width:26, height:436,
                background:"linear-gradient(90deg, rgba(255,222,166,0.30), rgba(122,86,44,0.55) 55%, rgba(48,32,16,0.55))",
                boxShadow:"6px 0 20px rgba(30,18,6,0.34)"}} />
            ))}
            {[0,1].map((i) => {
              const t = ((sB * 8.6) + i * 780) % 1560;
              return (
                <div key={"cld" + i} style={{position:"absolute", left: 1012 - t, top:222, width:540, height:352,
                  pointerEvents:"none",
                  background:"linear-gradient(90deg, rgba(255,214,150,0), rgba(255,214,150,0.16) 34%, rgba(46,28,10,0.26) 66%, rgba(46,28,10,0))"}} />
              );
            })}
            <div style={{position:"absolute", left:AX-620, top:AY-620, width:1240, height:1240, borderRadius:"50%",
              pointerEvents:"none", opacity: Math.min(0.85, 0.28 + 0.5 * labLit),
              background:"radial-gradient(closest-side, rgba(255,214,150,0.52), rgba(207,149,68,0.20) 44%, rgba(207,149,68,0) 76%)"}} />
            <div style={{position:"absolute", left:32, top:236, width:122, height:196,
              background:"linear-gradient(180deg,#8A6435,#493117)",
              border:"2px solid rgba(231,178,76,0.70)", borderRadius:4,
              boxShadow:"0 20px 40px rgba(20,10,2,0.45), inset 0 3px 0 rgba(255,232,180,0.24)"}}>
              {[0,1,2].map((s) => (
                <div key={"bs" + s} style={{position:"absolute", left:4, top: 56 + s * 46, width:114, height:6, borderRadius:2,
                  background:"linear-gradient(180deg,#B98B44,#54391A)", boxShadow:"0 4px 10px rgba(20,10,2,0.5)"}} />
              ))}
              {Array.from({length: 18}, (_, i) => {
                const row = i % 3, col = Math.floor(i / 3);
                const hgt = 26 + seed(i * 3 + 1) * 12;
                const cols = ["#E2825C", "#5C86BC", "#EBB95C", "#C9C3B4", "#4FBE8C", "#D85643"];
                const nud = i === 5 ? IV(sB, [16, 24, 38], [0, -7, 0]) : (i === 12 ? IV(sB, [30, 38, 52], [0, -6, 0]) : 0);
                return (
                  <div key={"bk" + i} style={{position:"absolute", left: 8 + col * 18 + (col > 2 ? 4 : 0),
                    top: 56 + row * 46 - hgt + nud, width: 12 + seed(i * 7) * 4, height: hgt, borderRadius:"2px 2px 0 0",
                    background: cols[i % 6], boxShadow:"inset -3px 0 6px rgba(40,20,4,0.42)"}} />
                );
              })}
            </div>
            <div style={{position:"absolute", left:40, top:448, width:82, height:164,
              transform:"rotate(" + (Math.sin(sB * 0.05) * 1.4 + Math.sin(sB * 0.7) * 2.6 * rattle) + "deg)", transformOrigin:"50% 0%",
              background:"linear-gradient(180deg,#B65440,#5E2C1E)",
              border:"2px solid rgba(231,178,76,0.72)", borderRadius:"3px 3px 0 0",
              boxShadow:"0 16px 32px rgba(20,10,2,0.42), inset 0 3px 0 rgba(255,232,180,0.22)"}}>
              <div style={{position:"absolute", left:16, top:22, width:50, height:50, borderRadius:"50%",
                border:"2px solid rgba(255,224,150,0.85)"}} />
              <div style={{position:"absolute", left:30, top:36, width:22, height:22, borderRadius:"50%",
                background:"rgba(255,214,140,0.80)"}} />
              {[0,1,2].map((i) => (
                <div key={"bnr" + i} style={{position:"absolute", left:16, top: 92 + i * 16, width: 50 - i * 12, height:4,
                  borderRadius:2, background:"rgba(255,240,214,0.52)"}} />
              ))}
              <div style={{position:"absolute", left:0, top:162, width:82, height:14,
                background:"linear-gradient(180deg,#B65440,#4A2116)", clipPath:"polygon(0 0,100% 0,50% 100%)"}} />
            </div>
            {[0,1,2].map((i) => {
              const bx = 178 + i * 30;
              const sw = Math.sin(sB * 0.05 + i * 1.4) * 1.8 + Math.sin(sB * 0.62 + i) * 3.4 * rattle;
              return (
                <div key={"hb" + i} style={{position:"absolute", left:bx, top:236,
                  transform:"rotate(" + sw + "deg)", transformOrigin:"50% 0%"}}>
                  <div style={{position:"absolute", left:8, top:0, width:2, height: 26 + i * 8,
                    background:"rgba(214,196,160,0.7)"}} />
                  <div style={{position:"absolute", left:0, top: 24 + i * 8, width:18, height:34, borderRadius:"3px 3px 10px 10px",
                    background:"linear-gradient(180deg,#79C793,#2E5A40)", boxShadow:"0 6px 14px rgba(20,10,2,0.4)"}} />
                </div>
              );
            })}
            <div style={{position:"absolute", left:806, top:238, width:120, height:122, borderRadius:3,
              background:"linear-gradient(180deg,#3B587C,#1B2836)", border:"3px solid #C08F3C",
              boxShadow:"0 16px 34px rgba(20,10,2,0.45), inset 0 2px 0 rgba(255,232,180,0.22)"}}>
              {Array.from({length: 14}, (_, i) => (
                <div key={"sc" + i} style={{position:"absolute", left: 8 + seed(i * 5 + 2) * 100, top: 8 + seed(i * 9 + 4) * 100,
                  width:3, height:3, borderRadius:"50%",
                  background:"rgba(255,244,220," + (0.4 + 0.5 * Math.abs(Math.sin(sB * 0.06 + i))) + ")"}} />
              ))}
              <svg width="120" height="122" viewBox="0 0 120 122" style={{position:"absolute", left:0, top:0}}>
                <path d="M18 92 L40 46 L74 62 L98 24" stroke="rgba(255,224,150,0.85)" strokeWidth="1.6" fill="none" />
                <circle cx="60" cy="62" r="34" stroke="rgba(236,233,226,0.55)" strokeWidth="1" fill="none" />
              </svg>
              <div style={{position:"absolute", left: 8 + ((sB * 1.6) % 104), top: 96, width:6, height:2, borderRadius:1,
                background:"rgba(255,224,150,0.8)"}} />
            </div>
            <div style={{position:"absolute", left:900, top:320, width:88, height:120}}>
              {[0,1].map((s) => (
                <div key={"shf" + s} style={{position:"absolute", left:0, top: 52 + s * 58, width:88, height:7, borderRadius:2,
                  background:"linear-gradient(180deg,#B98B44,#54391A)", boxShadow:"0 5px 12px rgba(20,10,2,0.45)"}} />
              ))}
              {[0,1,2,3,4,5].map((i) => {
                const row = i < 3 ? 0 : 1, col = i % 3;
                const hh = 24 + seed(i * 5 + 2) * 12;
                const cc = ["#4FBE8C", "#E2825C", "#5C86BC", "#EBB95C", "#C9C3B4", "#D85643"];
                const jig = Math.sin(sB * 1.8 + i) * 2.2 * rattle;
                return (
                  <div key={"jr" + i} style={{position:"absolute", left: 8 + col * 27 + jig, top: 52 + row * 58 - hh,
                    width:20, height:hh, borderRadius:"5px 5px 8px 8px",
                    background:"linear-gradient(180deg," + cc[i] + ", rgba(70,44,18,0.9))",
                    border:"1px solid rgba(255,240,214,0.42)", boxShadow:"inset -4px -4px 9px rgba(30,16,4,0.35)"}} />
                );
              })}
            </div>
            {runes.map((r, i) => {
              const puls = 0.42 + 0.16 * Math.sin(sB * 0.09 + i * 1.7) + 0.24 * raiseP + 0.30 * ignite;
              return (
                <div key={"r" + i} style={{position:"absolute", left:r.x, top:r.y, fontSize:r.s,
                  color:"rgba(255,224,150," + Math.min(0.98, puls) + ")",
                  textShadow:"0 0 " + (8 + 16 * ignite) + "px rgba(231,178,76,0.8)",
                  transform:"rotate(" + (seed(i) * 40 - 20 + Math.sin(sB * 0.06 + i) * 7) + "deg)"}}>{r.g}</div>
              );
            })}
            <div style={{position:"absolute", left:AX-238, top:AY-238, width:476, height:476, borderRadius:"50%",
              border:"2px solid rgba(255,224,150," + (0.20 + 0.26 * raiseP + 0.38 * ignite) + ")",
              boxShadow:"0 0 " + (14 + 40 * ignite) + "px rgba(231,178,76," + (0.25 + 0.45 * ignite) + ")",
              transform:"rotate(" + (sB * 1.1) + "deg)"}} />
            <div style={{position:"absolute", left:AX-196, top:AY-196, width:392, height:392, borderRadius:"50%",
              border:"1px dashed rgba(255,238,196," + (0.22 + 0.36 * ignite) + ")",
              transform:"rotate(" + (-sB * 1.5) + "deg)"}} />
            <div style={{position:"absolute", left:-40, top:DESK_Y - 6, width:1092, height:34, borderRadius:10,
              background:"linear-gradient(180deg,#C58C48,#8E5F2C 40%,#5A3818)", boxShadow:"0 22px 48px rgba(20,10,2,0.5)"}} />
            {Array.from({length: 12}, (_, i) => (
              <div key={"grn" + i} style={{position:"absolute", left:-40 + i * 92, top:DESK_Y - 2, width:78, height:3, borderRadius:2,
                background:"rgba(78,46,16," + (0.24 + 0.2 * seed(i * 3 + 2)) + ")"}} />
            ))}
            <div style={{position:"absolute", left:-40, top:DESK_Y - 8, width:1092, height:4,
              background:"linear-gradient(90deg, rgba(255,236,196,0.0), rgba(255,236,196,0.85), rgba(255,236,196,0.0))"}} />
            <div style={{position:"absolute", left:-40, top:DESK_Y + 26, width:1092, height:160,
              background:"linear-gradient(180deg,#6B4522,#2E1C0C)"}} />
            {Array.from({length: 9}, (_, i) => (
              <div key={"g" + i} style={{position:"absolute", left:-30 + i * 122, top:DESK_Y + 30, width:2, height:150,
                background:"linear-gradient(180deg, rgba(255,214,150,0.24), rgba(0,0,0,0))"}} />
            ))}
            {Pool("plG", AX, DESK_Y + 2, 720, 128, Math.min(0.9, 0.34 + 0.5 * labLit))}
            {Pool("plW", wizX, DESK_Y + 4, 380, 82, Math.min(0.7, 0.16 + 0.42 * labLit))}
            {Shadow("shW", wizX, DESK_Y + 4, 234, 34, 0.5)}
            {Shadow("shG", AX + 8, DESK_Y + 2, 258, 32, 0.46)}
            {Shadow("shB", 142, DESK_Y + 2, 196, 24, 0.4)}
            {Shadow("shP", 812, DESK_Y + 2, 104, 22, 0.4)}
            {Shadow("shC", 700, DESK_Y + 2, 78, 20, 0.4)}
            <div style={{position:"absolute", inset:0, pointerEvents:"none",
              transform:"translate(" + gShakeX + "px," + gShakeY + "px) rotate(" + gShakeR + "deg)",
              transformOrigin: AX + "px " + (AY + AR + 60) + "px"}}>
              <div style={{position:"absolute", left:AX-390, top:AY-390, width:780, height:780, borderRadius:"50%",
                opacity: Math.min(1, 0.42 + 0.58 * labLit),
                background:"radial-gradient(closest-side, rgba(255,236,186,0.62) 34%, rgba(231,178,76,0.30) 52%, rgba(207,149,68,0) 78%)"}} />
              <div style={{position:"absolute", left:AX-AR-26, top:AY-AR-26, width:AR*2+52, height:AR*2+52, borderRadius:"50%",
                opacity: Math.min(1, 0.55 + 0.45 * labLit),
                background:"radial-gradient(closest-side, rgba(255,246,214,0) 66%, rgba(255,232,178,0.75) 84%, rgba(231,178,76,0) 100%)"}} />
              <div style={{position:"absolute", left:AX-92, top:AY+AR-40, width:184, height:96}}>
                <div style={{position:"absolute", left:52, top:0, width:80, height:54, borderRadius:"0 0 40px 40px",
                  background:"linear-gradient(180deg,#E5B44E,#9A7526)", boxShadow:"inset 0 -6px 14px rgba(40,24,4,0.4)"}} />
                <div style={{position:"absolute", left:74, top:48, width:36, height:20,
                  background:"linear-gradient(180deg,#F0C560,#A87E2A)"}} />
                <div style={{position:"absolute", left:6, top:64, width:172, height:26, borderRadius:12,
                  background:"linear-gradient(180deg,#FFD974," + GOLD + " 55%,#7A5A1C)",
                  boxShadow:"0 12px 26px rgba(20,10,2,0.5), inset 0 2px 0 rgba(255,248,224,0.6)"}} />
                <div style={{position:"absolute", left:26, top:60, width:132, height:26, borderRadius:6,
                  background:"linear-gradient(180deg,#FFF2C4,#D8AC48)", border:"2px solid " + PAPER,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:MONO, fontSize:15, letterSpacing:2, fontWeight:900, color:"#2A1C02",
                  boxShadow:"0 6px 14px rgba(20,10,2,0.5)"}}>RUN 41</div>
              </div>
              <div style={{position:"absolute", left:AX-AR, top:AY-AR, width:AR*2, height:AR*2, borderRadius:"50%",
                overflow:"hidden",
                background:"radial-gradient(120% 120% at 36% 26%, " + (ignite > 0.2 ? "#FFE7B4" : "#8FB4DA") + ", #C98F52 30%, #4E74A0 58%, #2A4364 82%)",
                boxShadow:"0 26px 60px rgba(20,10,2,0.5), 0 0 " + (44 + 150 * labLit) + "px rgba(255,214,150," + Math.min(0.95, 0.45 + 0.5 * labLit) + ")"}}>
                <div style={{position:"absolute", left:44, top:196, width:212, height:38, borderRadius:"50%",
                  background:"radial-gradient(120% 150% at 50% 8%, #8A7550, #514227 55%, #2E2617)"}} />
                {Array.from({length: 22}, (_, i) => (
                  <div key={"gst" + i} style={{position:"absolute", left: 40 + seed(i * 2 + 5) * 220, top: 34 + seed(i * 3 + 9) * 120,
                    width:2, height:2, borderRadius:"50%",
                    background:"rgba(255,246,220," + (0.3 + 0.5 * Math.abs(Math.sin(sB * 0.1 + i))) + ")"}} />
                ))}
                <div style={{position:"absolute", left: 150 - 240 * ignite, top: 150 - 240 * ignite,
                  width: 480 * ignite, height: 480 * ignite, borderRadius:"50%", opacity: 0.95 * ignite,
                  background:"radial-gradient(closest-side, rgba(255,252,238,0.98), rgba(255,226,164,0.7) 38%, rgba(207,149,68,0) 76%)"}} />
                <div style={{position:"absolute", left:64, top:64, width:172, height:172, borderRadius:"50%",
                  opacity: Math.min(1, 0.35 + 0.65 * labLit),
                  background:"radial-gradient(closest-side, rgba(255,250,232,0.95), rgba(255,220,150,0.42) 46%, rgba(231,178,76,0) 80%)"}} />
                {[0,1,2,3,4].map((i) => (
                  <div key={"arc" + i} style={{position:"absolute", left: 14 + i * 8, top: 14 + i * 8,
                    width: 272 - i * 16, height: 272 - i * 16, borderRadius:"50%",
                    opacity: Math.min(1, (0.20 + 0.8 * ignite) * (0.85 - i * 0.1)),
                    border:"2px dashed rgba(255,244,206," + (0.8 - i * 0.1) + ")",
                    boxShadow:"0 0 26px rgba(255,214,150,0.7)",
                    transform:"rotate(" + (sB * (7 + i * 5) * (i % 2 === 0 ? 1 : -1)) + "deg)"}} />
                ))}
                {Array.from({length: 14}, (_, i) => {
                  const ang = (sB * (0.10 + i * 0.012) + seed(i) * 6.28);
                  const rr = 52 + seed(i * 3 + 1) * 88;
                  return <div key={"orb" + i} style={{position:"absolute",
                    left: 150 + Math.cos(ang) * rr, top: 150 + Math.sin(ang) * rr,
                    width: 5 + seed(i * 7) * 7, height: 5 + seed(i * 7) * 7, borderRadius:"50%",
                    opacity: Math.min(1, 0.35 + 0.65 * ignite), background:"rgba(255,252,236,0.98)",
                    boxShadow:"0 0 20px rgba(255,214,140,0.95)"}} />;
                })}
                <div style={{position:"absolute", inset:0, borderRadius:"50%", pointerEvents:"none",
                  background:"radial-gradient(120% 120% at 30% 22%, rgba(255,252,240,0.42), rgba(255,252,240,0) 46%)"}} />
                <div style={{position:"absolute", inset:0, borderRadius:"50%", pointerEvents:"none",
                  boxShadow:"inset -26px -30px 60px rgba(40,22,6," + (0.42 - 0.22 * ignite) + ")"}} />
              </div>
              <div style={{position:"absolute", left:AX-AR, top:AY-AR, width:AR*2, height:AR*2, borderRadius:"50%",
                border:"2px solid rgba(255,248,224," + (0.55 + 0.4 * ignite) + ")", pointerEvents:"none",
                boxShadow:"0 0 " + (16 + 36 * labLit) + "px rgba(255,224,150,0.8)"}} />
              <div style={{position:"absolute", left:AX-84, top:AY-116, width:70, height:42, borderRadius:"50%",
                background:"linear-gradient(140deg, rgba(255,252,240,0.7), rgba(255,252,240,0))",
                transform:"rotate(-24deg)"}} />
            </div>
            <div style={{position:"absolute", left:pivX, top:pivY, width:wandL, height:8, borderRadius:4,
              transformOrigin:"0% 50%", transform:"rotate(" + wandDeg + "deg)",
              background:"linear-gradient(90deg,#6B4C24,#A87A3A 60%,#4A3418)", boxShadow: panel(0.4)}}>
              <div style={{position:"absolute", right:-8, top:-7, width:22, height:22, borderRadius:"50%",
                background:"radial-gradient(closest-side, #FFFBEC, " + GOLD + ")",
                boxShadow:"0 0 " + (16 + 40 * ignite) + "px rgba(255,214,140," + (0.55 + 0.45 * ignite) + ")"}} />
            </div>
            {castP > 0 ? (
              <div style={{position:"absolute", left:tipX, top:tipY - 7, width: boltLen * Math.min(1, castP * 1.2), height:14, borderRadius:7,
                transformOrigin:"0% 50%", transform:"rotate(" + boltDeg + "deg)", opacity: IV(sB, [14, 18, 34, 46], [1, 1, 0.75, 0]),
                background:"linear-gradient(90deg, #FFFDF4, #FFF0C4 40%, " + GOLD + " 70%, rgba(226,130,92,0.3))",
                boxShadow:"0 0 48px rgba(255,214,140,0.95)"}} />
            ) : null}
            {[0,1,2,3,4,5].map((k) => {
              const st = 14 + k * 6;
              const p = over(sB, st, 12, Easing.linear);
              if (p <= 0 || p >= 1) return null;
              const trav = -160 + p * (boltLen + 190);
              return (
                <div key={"rib" + k} style={{position:"absolute", left:tipX, top:tipY, width:0, height:0,
                  transform:"rotate(" + boltDeg + "deg)"}}>
                  <div style={{position:"absolute", left: trav, top:-78, width:170, height:156,
                    borderRadius:"46% 54% 50% 50%", transform:"skewX(-16deg)",
                    opacity: IV(p, [0, 0.12, 0.7, 1], [0, 0.8, 0.6, 0]),
                    background:"linear-gradient(90deg, rgba(255,214,150,0), #FFDD9A 40%, " + GOLD + " 68%, rgba(226,130,92,0.25))",
                    boxShadow:"0 0 52px rgba(255,214,140,0.65)"}} />
                </div>
              );
            })}
            {burstP > 0 && burstP < 1 ? (
              <div style={{position:"absolute", left:AX - 330 * burstP, top:AY - 330 * burstP,
                width:660 * burstP, height:660 * burstP, borderRadius:"50%",
                border:(5 * (1 - burstP) + 1) + "px solid rgba(255,236,186," + (1 - burstP) + ")",
                boxShadow:"0 0 " + (80 * (1 - burstP)) + "px rgba(255,214,140,0.75)"}} />
            ) : null}
            {Array.from({length: 24}, (_, i) => {
              const p = over(sB, 14 + (i % 6), 26, Easing.out(Easing.cubic));
              if (p <= 0 || p >= 1) return null;
              const ang = seed(i * 13 + 1) * Math.PI * 2;
              const d = 70 + seed(i * 5 + 2) * 230;
              const sz = 3 + seed(i * 9) * 7;
              return <div key={"sp" + i} style={{position:"absolute",
                left: AX + Math.cos(ang) * d * p, top: AY + Math.sin(ang) * d * p,
                width:sz, height:sz, borderRadius:"50%", opacity: 1 - p,
                background:"rgba(255,250,230,0.98)", boxShadow:"0 0 18px rgba(255,214,140,0.9)"}} />;
            })}
            <Actor x={wizX} groundY={DESK_Y} size={244}>
              <Mascot lf={lf} size={244} wizard={1}
                gaze={IV(sB, [0, 16, 64], [4, 9, 10])}
                nodAmp={2.2 + 2.2 * rattle} nodSpeed={0.08}
                shock={IV(sB, [12, 18, 34], [0, 0.5, 0.2])}
                cheer={IV(sB, [20, 34, 64], [0, 0.6, 0.5])} />
            </Actor>
            <div style={{position:"absolute", left: wizX - 40, top: DESK_Y - 258, width:230, height:274,
              pointerEvents:"none", opacity: Math.min(0.62, 0.16 + 0.4 * labLit), borderRadius:"46% 54% 40% 40%",
              background:"linear-gradient(255deg, rgba(255,224,158,0.62), rgba(255,214,150,0.10) 46%, rgba(255,214,150,0) 72%)"}} />
            <div style={{position:"absolute", left:52, top:DESK_Y - 46}}>
              <div style={{width:170, height:46, borderRadius:"6px 10px 10px 6px",
                background:"linear-gradient(180deg,#C4503C,#6E2618)",
                boxShadow:"0 14px 26px rgba(20,10,2,0.5), inset 0 2px 0 rgba(255,240,214,0.34)"}} />
              <div style={{position:"absolute", left:8, top:6, width:154, height:12, borderRadius:3,
                background:"linear-gradient(180deg," + PAPER + ",#DACAA4)"}} />
              <div style={{position:"absolute", left:8, top:2, width:154, height:10, borderRadius:3,
                transformOrigin:"50% 100%", transform:"scaleY(" + (1 + 1.8 * rattle) + ")",
                opacity: 0.5 + 0.45 * rattle,
                background:"linear-gradient(180deg," + PAPER + ",#EADCB8)"}} />
            </div>
            <div style={{position:"absolute", left:790, top:DESK_Y - 92}}>
              <div style={{width:52, height:64, borderRadius:"14px 14px 22px 22px",
                background:"linear-gradient(180deg, rgba(255,248,228,0.5), #4FBE8C 55%, #24634A)",
                border:"1px solid rgba(255,248,228,0.5)", boxShadow:"0 12px 22px rgba(20,10,2,0.45)"}} />
              <div style={{position:"absolute", left:14, top:-16, width:24, height:22, borderRadius:4,
                background:"linear-gradient(180deg,#D8A44E,#8A6224)"}} />
              <div style={{position:"absolute", left:8, top: 32 + Math.sin(sB * 0.18) * 3 + Math.sin(sB * 1.7) * 4 * rattle,
                width:36, height:6, borderRadius:3, background:"rgba(255,248,228,0.62)"}} />
            </div>
            <div style={{position:"absolute", left:686, top:DESK_Y - 74}}>
              <div style={{width:20, height:62, borderRadius:5, background: grad(PAPER, "#CBB07A"), boxShadow: panel(0.4)}} />
              <div style={{position:"absolute", left:5, top: -22 - Math.abs(Math.sin(sB * 0.5)) * 6, width:9,
                height: 26 + Math.abs(Math.sin(sB * 0.5)) * 8, borderRadius:"50% 50% 42% 42%",
                transform:"translateX(" + (Math.sin(sB * 1.6) * 3 * rattle) + "px)",
                background:"linear-gradient(180deg,#FFF3C8," + AMBER + " 52%," + CLAY + ")",
                boxShadow:"0 0 22px rgba(255,214,140,0.8)"}} />
            </div>
            {[0,1].map((i) => {
              const t = ((sB * 11) + i * 810) % 1620;
              return (
                <div key={"fgs" + i} style={{position:"absolute", left: -560 + t, top:672, width:560, height:100,
                  borderRadius:"26px 34px 20px 20px", pointerEvents:"none",
                  background:"linear-gradient(180deg,#7A5730,#42301A 62%,#241906)",
                  boxShadow:"0 -16px 32px rgba(20,10,2,0.5), inset 0 3px 0 rgba(255,232,180,0.22)"}}>
                  <div style={{position:"absolute", left:0, top:0, width:560, height:8,
                    background:"linear-gradient(90deg, rgba(255,236,196,0), rgba(255,236,196,0.4), rgba(255,236,196,0))"}} />
                </div>
              );
            })}
            <div style={{position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(132% 104% at 50% 48%, rgba(0,0,0,0) 56%, rgba(24,12,2,0.34) 100%)"}} />
            <SimScan />
            {sB < 5 ? (
              <div style={{position:"absolute", left: -460 + (sB / 5) * 1560, top:0, width:460, height:792,
                transform:"skewX(-13deg)", pointerEvents:"none",
                background:"linear-gradient(90deg, rgba(255,248,226,0), rgba(255,248,226,0.92), rgba(255,248,226,0))"}} />
            ) : null}
          </div>
        ) : null}
        {/* ============ SHOT C : INSIDE THE GLOBE ============ */}
        {SHOT === 2 ? (
          <div style={{position:"absolute", inset:0}}>
            <div style={{position:"absolute", inset:0,
              background:"linear-gradient(180deg,#31527E 0%,#4E79A8 24%,#8FA7BE 46%,#D9A264 70%,#F2CE8C 88%,#FCE6B4 100%)"}} />
            <div style={{position:"absolute", left:296, top: GRD - 470, width:420, height:420, borderRadius:"50%",
              pointerEvents:"none",
              background:"radial-gradient(closest-side, rgba(255,246,214,0.85), rgba(255,214,150,0.34) 44%, rgba(255,214,150,0) 76%)"}} />
            {Array.from({length: 18}, (_, i) => (
              <div key={"bst" + i} style={{position:"absolute", left: 30 + seed(i * 2 + 3) * 950, top: 44 + seed(i * 5 + 1) * 150,
                width:3, height:3, borderRadius:"50%",
                background:"rgba(255,250,235," + (0.16 + 0.3 * Math.abs(Math.sin(sC * 0.1 + i))) + ")"}} />
            ))}
            {[0,1,2].map((i) => {
              const x = -520 + ((cloudX + i * 540) % 1600);
              return (
                <div key={"bcl" + i} style={{position:"absolute", left:x, top: 246 + i * 62, width:520, height:170,
                  borderRadius:"48% 52% 46% 54%", pointerEvents:"none",
                  background:"linear-gradient(180deg, rgba(255,244,220,0.60), rgba(255,206,150,0.16))"}} />
              );
            })}
            <div style={{position:"absolute", left:-120, top: GRD - 150, width:1252, height:170,
              borderRadius:"50% 50% 0 0 / 100px 100px 0 0",
              background:"linear-gradient(180deg,#7FBE8E,#3E7A57)"}} />
            <div style={{position:"absolute", left:-220, top: GRD - 112, width:1452, height:140,
              borderRadius:"50% 50% 0 0 / 74px 74px 0 0",
              background:"linear-gradient(180deg,#65A97A,#2F6446)"}} />
            <div style={{position:"absolute", left:0, top:GRD - 8, width:1012, height:16,
              background:"linear-gradient(90deg, rgba(255,214,150,0), rgba(255,250,224,0.95), rgba(255,214,150,0))",
              boxShadow:"0 0 52px rgba(255,214,140,0.85)"}} />
            <div style={{position:"absolute", left:-160, top:GRD, width:1332, height:230, overflow:"hidden",
              borderRadius:"50% 50% 0 0 / 46px 46px 0 0",
              background:"linear-gradient(180deg,#C8A868,#8A6C3E)"}}>
              {[0,1,2,3,4].map((i) => (
                <div key={"gh" + i} style={{position:"absolute", left:0, top: 12 + i * 30, width:1332, height:2,
                  opacity: Math.max(0, 0.32 - i * 0.05),
                  background:"linear-gradient(90deg, rgba(255,214,150,0), rgba(255,248,220,0.9), rgba(255,214,150,0))"}} />
              ))}
            </div>
            <div style={{position:"absolute", left:0, top:GRD + 10, width:1012, height:96, overflow:"hidden",
              borderRadius:"40% 40% 0 0 / 22px 22px 0 0",
              background:"linear-gradient(180deg,#6E6353,#42392B)"}}>
              {Array.from({length: 9}, (_, i) => (
                <div key={"ln" + i} style={{position:"absolute", left: 34 + i * 116, top:46, width:64, height:6, borderRadius:3,
                  background:"rgba(255,248,224,0.85)"}} />
              ))}
            </div>
            <div style={{position:"absolute", left:-40, top:PAV - 34, width:1092, height:34,
              borderRadius:"36% 36% 0 0 / 16px 16px 0 0",
              background:"linear-gradient(180deg,#B4A88E,#6E6350)"}} />
            <div style={{position:"absolute", left:0, top:PAV - 38, width:1012, height:5,
              background:"linear-gradient(90deg, rgba(255,232,180,0), rgba(255,246,214,0.9), rgba(255,232,180,0))"}} />
            <div style={{position:"absolute", left:-40, top:PAV, width:1092, height:60,
              background:"linear-gradient(180deg,#6E5334,#3A2916)"}} />
            {BB.map((b, i) => (
              <div key={"BBb" + i} style={{position:"absolute", left:b.x, top: GRD - b.h, width:b.w, height:b.h}}>
                <div style={{position:"absolute", left:0, top:0, width:b.w, height:b.h,
                  background:"linear-gradient(180deg," + b.a + "," + b.b + ")",
                  boxShadow:"inset 0 4px 0 rgba(255,248,224,0.45)"}} />
                <div style={{position:"absolute", left:0, top:0, width: b.w * 0.52, height:b.h, pointerEvents:"none",
                  background:"linear-gradient(90deg, rgba(255,238,196,0.42), rgba(255,238,196,0))"}} />
                <div style={{position:"absolute", left: b.w * 0.58, top:0, width: b.w * 0.42, height:b.h, pointerEvents:"none",
                  background:"linear-gradient(90deg, rgba(60,34,10,0), rgba(60,34,10,0.42))"}} />
                <div style={{position:"absolute", left:-7, top:-12, width: b.w + 14, height:16, borderRadius:5,
                  background: b.roof, boxShadow:"0 5px 12px rgba(40,22,6,0.45), inset 0 2px 0 rgba(255,248,224,0.4)"}} />
                <div style={{position:"absolute", left:10, top: b.h - 44, width: b.w - 20, height:44, borderRadius:"4px 4px 0 0",
                  background:"linear-gradient(180deg," + b.shop + ", rgba(70,44,18,0.55))",
                  border:"2px solid rgba(255,248,224,0.5)"}}>
                  <div style={{position:"absolute", left: (b.w - 20) / 2 - 12, top:12, width:24, height:32, borderRadius:"6px 6px 0 0",
                    background:"linear-gradient(180deg,#FFF0C8,#C99A50)"}} />
                </div>
                {Array.from({length: 10}, (_, k) => {
                  const wx = 16 + (k % 3) * ((b.w - 40) / 2), wy = 30 + Math.floor(k / 3) * 62;
                  if (wy > b.h - 76) return null;
                  return <div key={"BBw" + i + "_" + k} style={{position:"absolute", left:wx, top:wy,
                    width:26, height:32, borderRadius:3, background:"linear-gradient(180deg," + b.win + ",#E8B25C)",
                    border:"2px solid rgba(255,252,238,0.55)",
                    opacity: 0.86 + 0.14 * Math.abs(Math.sin(sC * 0.14 + i + k))}} />;
                })}
              </div>
            ))}
            {BB.map((b, i) => Shadow("BBs" + i, b.x + b.w / 2, GRD + 8, b.w + 60, 26, 0.42))}
            <div style={{position:"absolute", left:368, top: GRD - 62, width:174, height:34,
              borderRadius:"5px 5px 3px 3px", overflow:"hidden",
              background:"repeating-linear-gradient(90deg,#E2825C 0 22px," + PAPER + " 22px 44px)",
              boxShadow:"0 10px 18px rgba(40,22,6,0.42)"}} />
            {[{x: 66, c: "#4FBE8C"}, {x: 716, c: "#5C86BC"}, {x: 848, c: "#D85643"}].map((aw, i) => (
              <div key={"aw2" + i} style={{position:"absolute", left:aw.x, top: GRD - 58, width:112, height:28,
                borderRadius:"5px 5px 3px 3px",
                background:"repeating-linear-gradient(90deg," + aw.c + " 0 18px," + PAPER + " 18px 36px)",
                boxShadow:"0 8px 14px rgba(40,22,6,0.4)"}} />
            ))}
            <div style={{position:"absolute", left:392, top: GRD - 132, width:126, height:38, borderRadius:5,
              transform:"rotate(" + (Math.sin(sC * 0.11) * 2.2) + "deg)", transformOrigin:"50% 0%",
              background:"linear-gradient(180deg,#FFF3C8," + GOLD + ")",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:MONO, fontSize:22, fontWeight:900, letterSpacing:3, color:"#2A1C02",
              boxShadow:"0 8px 16px rgba(40,22,6,0.45)"}}>CAFE</div>
            {[0,1,2].map((i) => {
              const lx = 176 + i * 320;
              return (
                <div key={"lp" + i} style={{position:"absolute", left:lx, top: GRD - 172}}>
                  <div style={{position:"absolute", left:0, top:14, width:7, height:158,
                    background:"linear-gradient(180deg,#8A7E68,#3A342A)"}} />
                  <div style={{position:"absolute", left:-11, top:0, width:29, height:22, borderRadius:"6px 6px 11px 11px",
                    background:"linear-gradient(180deg,#FFF6DA," + GOLD + ")",
                    boxShadow:"0 0 40px rgba(255,214,140,0.75)"}} />
                </div>
              );
            })}
            {[0,1].map((i) => {
              const tx = 322 + i * 456;
              return (
                <div key={"tr" + i} style={{position:"absolute", left:tx, top: GRD - 116}}>
                  <div style={{position:"absolute", left:16, top:64, width:12, height:52,
                    background:"linear-gradient(180deg,#9C7038,#4E3618)"}} />
                  <div style={{position:"absolute", left:0, top:16, width:60, height:60, borderRadius:"50%",
                    transform:"rotate(" + (Math.sin(sC * 0.1 + i) * 4) + "deg)", transformOrigin:"50% 100%",
                    background:"linear-gradient(180deg,#79C793,#2F6A46)", boxShadow:"0 10px 18px rgba(40,22,6,0.34)"}} />
                  <div style={{position:"absolute", left:14, top:0, width:36, height:36, borderRadius:"50%",
                    background:"linear-gradient(180deg,#9EDCAE,#3B7A55)"}} />
                </div>
              );
            })}
            <div style={{position:"absolute", left:bandX, top: GRD - 90, width:340, height:280,
              transform:"skewX(-16deg)", pointerEvents:"none", opacity:0.42,
              background:"linear-gradient(90deg, rgba(255,246,214,0), rgba(255,246,214,0.8) 46%, rgba(255,214,140,0))",
              boxShadow:"0 0 70px rgba(255,214,140,0.55)"}} />
            {vT >= 0 && vT < 1420 ? (
              <div style={{position:"absolute", left: -430 + vT, top: GRD + 6, width:420, height:110,
                opacity: IV(vT, [0, 40, 1300, 1420], [0, 1, 1, 0])}}>
                <div style={{position:"absolute", left:0, top:34, width:420, height:52, borderRadius:16,
                  background:"linear-gradient(180deg,#F0B95E,#B4712A)", boxShadow:"0 14px 24px rgba(40,22,6,0.45), inset 0 3px 0 rgba(255,250,228,0.6)"}} />
                <div style={{position:"absolute", left:90, top:0, width:200, height:44, borderRadius:"14px 14px 0 0",
                  background:"linear-gradient(180deg,#E2825C,#94472C)"}} />
                <div style={{position:"absolute", left:112, top:10, width:156, height:28, borderRadius:"9px 9px 0 0",
                  background:"linear-gradient(180deg,#CFE4F4,#8FB4DA)"}} />
                <div style={{position:"absolute", left:52, top:76, width:44, height:44, borderRadius:"50%",
                  background:"#302A20", border:"5px solid #C9C3B4", transform:"rotate(" + (vT * 6) + "deg)"}} />
                <div style={{position:"absolute", left:318, top:76, width:44, height:44, borderRadius:"50%",
                  background:"#302A20", border:"5px solid #C9C3B4", transform:"rotate(" + (vT * 6) + "deg)"}} />
              </div>
            ) : null}
            {cits.map((c, i) => {
              const cx3 = Math.max(80, Math.min(940, c.x0 + sC * c.sp));
              return (
                <Actor key={"cit" + i} x={cx3} groundY={PAV} size={c.size} flip={c.flip}>
                  <Mascot lf={lf + i * 9} size={c.size} gaze={c.g} nodAmp={2.4} nodSpeed={0.12}
                    cap={c.cap} tote={c.tote} scarf={c.scarf} />
                </Actor>
              );
            })}
            <div style={{position:"absolute", left:506-620, top:396-620, width:1240, height:1240, borderRadius:"50%",
              pointerEvents:"none", border:"14px solid rgba(255,246,220,0.30)",
              boxShadow:"0 0 60px rgba(255,214,140,0.42), inset 0 0 90px rgba(255,224,160,0.26)"}} />
            <div style={{position:"absolute", left:506-596, top:396-596, width:1192, height:1192, borderRadius:"50%",
              pointerEvents:"none", border:"3px solid rgba(255,252,240,0.55)"}} />
            <div style={{position:"absolute", left: specX, top:-140, width:180, height:1070,
              transform:"rotate(18deg)", pointerEvents:"none", opacity:0.28,
              background:"linear-gradient(90deg, rgba(255,252,240,0), rgba(255,252,240,0.85), rgba(255,252,240,0))"}} />
            <svg width="1012" height="792" viewBox="0 0 1012 792" style={{position:"absolute", left:0, top:0,
              pointerEvents:"none", opacity: crackLive}}>
              <path d="M196 96 L318 214 L262 296 L430 402 L370 500 L548 604 L500 700"
                stroke={RED} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="1120" strokeDashoffset={1120 * (1 - crackP)} />
              <path d="M318 214 L448 168 M430 402 L588 340 M370 500 L236 556 M548 604 L692 566"
                stroke="#E4705F" strokeWidth="3.4" fill="none" strokeLinecap="round"
                strokeDasharray="640" strokeDashoffset={640 * (1 - Math.max(0, crackP - 0.34) / 0.66)} />
            </svg>
            <div style={{position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(64% 62% at 50% 50%, rgba(0,0,0,0) 58%, rgba(28,20,10,0.45) 84%, rgba(20,14,6,0.72) 100%)"}} />
            {sC < 5 ? (
              <div style={{position:"absolute", left: 1090 - (sC / 5) * 1580, top:0, width:440, height:792,
                transform:"skewX(13deg)", pointerEvents:"none",
                background:"linear-gradient(90deg, rgba(255,248,226,0), rgba(255,248,226,0.92), rgba(255,248,226,0))"}} />
            ) : null}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const S2Body: React.FC<{lf:number}> = ({lf}) => {
  const IV = (x: number, ins: number[], outs: number[]) =>
    interpolate(x, ins, outs, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const CREAM = "#ECE9E2", PAPER = "#F7F3EA", INK = "#1A1813", SLATE = "#3A5C84";
  const CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74";
  const MUTE = "#9A968B", TERM = "#0E1626", TERM2 = "#0A1120", RED = "#C44A3A";
  const SLATE2 = "#2B4463", HAZE = "#CFCBBF";
  const soft = "0 16px 32px rgba(26,24,19,0.30)";
  const softer = "0 8px 18px rgba(26,24,19,0.24)";
  const tiny = "0 4px 9px rgba(26,24,19,0.26)";
  const bevel = "inset 0 2px 0 rgba(255,255,255,0.16)";
  const rim = "inset 0 1.5px 0 rgba(255,255,255,0.22)";
  const mono = "Menlo, monospace";
  const CA = 54, CB = 112, CC = 166;
  const SHOT = lf < CA ? 0 : lf < CB ? 1 : lf < CC ? 2 : 3;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB, s3 = lf - CC;
  const cam =
    SHOT === 0 ? IV(s0, [0, CA], [1.012, 1.030]) :
    SHOT === 1 ? IV(s1, [0, 58], [1.030, 1.006]) :
    SHOT === 2 ? IV(s2, [0, 54], [1.006, 1.026]) :
                 IV(s3, [0, 58], [1.026, 1.006]);
  const cutD = SHOT === 0 ? s0 : SHOT === 1 ? s1 : SHOT === 2 ? s2 : s3;
  const cutX = IV(cutD, [0, 5], [-420, 1120]);
  const tagTxt = SHOT === 0 ? "SIM  INPUT" : SHOT === 1 ? "SIM  BUILD" : SHOT === 2 ? "SIM  PEOPLE" : "SIM  DAY 1";
  const mod = (v: number, m: number) => ((v % m) + m) % m;
  const brickTex = `repeating-linear-gradient(0deg,rgba(26,24,19,0.10) 0 1.5px,rgba(0,0,0,0) 1.5px 17px), repeating-linear-gradient(90deg,rgba(26,24,19,0.07) 0 1.5px,rgba(0,0,0,0) 1.5px 34px)`;
  const plaster = `repeating-linear-gradient(126deg,rgba(26,24,19,0.05) 0 2px,rgba(0,0,0,0) 2px 13px)`;
  const woodTex = `repeating-linear-gradient(92deg,rgba(26,24,19,0.09) 0 1.5px,rgba(0,0,0,0) 1.5px 21px)`;
  // ---------- reusable small props ----------
  const Skyline = (o: { top: number; op: number; drift: number; tone: string }) => (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 2, pointerEvents: "none" }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        const h = 58 + seed(i * 7 + 3) * 132;
        const w = 62 + seed(i * 3 + 5) * 54;
        const lx = mod(-34 + i * 98 - o.drift, 1140) - 62;
        return (
          <div key={i} style={{ position: "absolute", left: lx, top: o.top - h, width: w, height: h + 40, opacity: o.op, background: `linear-gradient(180deg,${o.tone} 0%,${HAZE} 100%)`, borderRadius: "5px 5px 0 0" }}>
            {i % 3 === 0 && <div style={{ position: "absolute", left: w * 0.5 - 3, top: -26, width: 6, height: 26, background: o.tone }} />}
            {i % 4 === 1 && <div style={{ position: "absolute", left: 8, top: -14, width: 16, height: 16, background: o.tone, borderRadius: 3 }} />}
            <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h + 40, background: "repeating-linear-gradient(90deg,rgba(26,24,19,0.13) 0 6px,rgba(0,0,0,0) 6px 19px)" }} />
          </div>
        );
      })}
    </div>
  );
  const Puff = (o: { x: number; y: number; t: number; sc: number }) => {
    const L = lf - o.t;
    if (L < 0 || L > 26) return null;
    const up = IV(L, [0, 26], [0, -54]);
    const sp = IV(L, [0, 26], [0.4, 1.5]) * o.sc;
    const op = Math.min(IV(L, [0, 5], [0, 0.42]), IV(L, [12, 26], [0.42, 0]));
    return (
      <div style={{ position: "absolute", left: o.x - 32, top: o.y + up - 32, width: 64, height: 64, zIndex: 52, opacity: op, transform: `scale(${sp})` }}>
        <div style={{ position: "absolute", left: 0, top: 16, width: 40, height: 34, borderRadius: 40, background: "#CFC8B8" }} />
        <div style={{ position: "absolute", left: 24, top: 6, width: 36, height: 32, borderRadius: 36, background: "#DED7C7" }} />
        <div style={{ position: "absolute", left: 14, top: 28, width: 34, height: 26, borderRadius: 34, background: "#C1B9A7" }} />
      </div>
    );
  };
  const Steam = (o: { x: number; y: number; ph: number; z: number }) => (
    <div style={{ position: "absolute", left: o.x, top: o.y, width: 40, height: 74, zIndex: o.z, pointerEvents: "none" }}>
      {[0, 1, 2, 3].map((k) => {
        const t = mod(lf * 0.9 + o.ph + k * 15, 60) / 60;
        return (
          <div key={k} style={{ position: "absolute", left: 12 + Math.sin(t * 6.1 + k) * 11, top: 66 - t * 62, width: 13 - t * 5, height: 13 - t * 5, borderRadius: 13, background: PAPER, opacity: (1 - t) * 0.5 }} />
        );
      })}
    </div>
  );
  const Planter = (o: { x: number; y: number; z: number; sway: number }) => (
    <div style={{ position: "absolute", left: o.x, top: o.y, width: 74, height: 78, zIndex: o.z }}>
      {[0, 1, 2, 3, 4].map((k) => (
        <div key={k} style={{ position: "absolute", left: 8 + k * 13, top: 6 - (k % 2) * 5, width: 11, height: 34 + (k % 3) * 8, borderRadius: "8px 8px 3px 3px", transformOrigin: "50% 100%", transform: `rotate(${Math.sin(o.sway * 0.09 + k * 0.9) * 6 + (k - 2) * 5}deg)`, background: `linear-gradient(180deg,#4FAE83 0%,#2E6E52 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: 2, top: 40, width: 70, height: 36, borderRadius: "5px 5px 9px 9px", background: `linear-gradient(180deg,${CLAY} 0%,#8E4830 100%)`, boxShadow: `${tiny}, ${rim}` }}>
        <div style={{ position: "absolute", left: 0, top: 5, width: 70, height: 5, background: "rgba(26,24,19,0.16)" }} />
      </div>
    </div>
  );
  const Crate = (o: { x: number; y: number; z: number }) => (
    <div style={{ position: "absolute", left: o.x, top: o.y, width: 66, height: 74, zIndex: o.z }}>
      <div style={{ position: "absolute", left: 6, top: 40, width: 60, height: 34, borderRadius: 4, background: `linear-gradient(180deg,#C9A468 0%,#96723F 100%)`, boxShadow: `${tiny}, ${rim}` }}>
        <div style={{ position: "absolute", left: 0, top: 12, width: 60, height: 3, background: "rgba(26,24,19,0.22)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 8, width: 56, height: 34, borderRadius: 4, background: `linear-gradient(180deg,#D6B478 0%,#A17E48 100%)`, boxShadow: `${tiny}, ${rim}` }}>
        <div style={{ position: "absolute", left: 0, top: 13, width: 56, height: 3, background: "rgba(26,24,19,0.22)" }} />
        <div style={{ position: "absolute", left: 10, top: 4, width: 36, height: 6, borderRadius: 3, background: "rgba(26,24,19,0.14)" }} />
      </div>
    </div>
  );
  // ================= shared cafe facade (used by SHOT B build + SHOT D day) =================
  const Cafe = (p: { rise: number; awn: number; signTop: number; signTxt: number; menu: number; front: number; lit: number; sway: number }) => (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 10 }}>
      <div style={{ position: "absolute", left: 296, top: 180, width: 440, height: 440, transform: `scaleY(${p.rise})`, transformOrigin: "50% 100%", borderRadius: "12px 12px 4px 4px", background: `linear-gradient(180deg,${PAPER} 0%,${CREAM} 52%,#D6CDBA 100%)`, boxShadow: `0 26px 52px rgba(26,24,19,0.32), ${bevel}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: plaster }} />
        <div style={{ position: "absolute", left: 0, top: 92, width: 440, height: 300, background: brickTex, opacity: 0.55 }} />
        <div style={{ position: "absolute", left: -8, top: -2, width: 456, height: 22, borderRadius: 7, background: `linear-gradient(180deg,${CLAY} 0%,#A9573A 100%)`, boxShadow: softer }} />
        <div style={{ position: "absolute", left: -8, top: 20, width: 456, height: 7, background: "rgba(26,24,19,0.22)" }} />
        <div style={{ position: "absolute", left: 0, top: 392, width: 440, height: 48, background: "repeating-linear-gradient(90deg,rgba(26,24,19,0.10) 0 40px,rgba(0,0,0,0) 40px 44px)" }} />
        <div style={{ position: "absolute", left: 0, top: 386, width: 440, height: 8, background: `linear-gradient(180deg,#C0B7A4,#9A927F)` }} />
        <div style={{ position: "absolute", left: 24, top: 60, width: 392, height: 8, borderRadius: 4, background: "rgba(26,24,19,0.10)" }} />
        <div style={{ position: "absolute", left: 12, top: 30, width: 13, height: 362, borderRadius: 5, background: `linear-gradient(90deg,#B7AE9B 0%,#6E6A60 100%)`, boxShadow: tiny }} />
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 8, top: 78 + k * 118, width: 21, height: 9, borderRadius: 3, background: "#5F5C55" }} />
        ))}
      </div>
      {/* awning */}
      <div style={{ position: "absolute", left: 280, top: 274, width: 472, height: 52, zIndex: 12, overflow: "hidden", borderRadius: "8px 8px 3px 3px", boxShadow: soft, transform: `scaleX(${p.awn})`, transformOrigin: "50% 0%" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * 40, top: Math.sin(p.sway * 0.14 + i * 0.62) * 3 - 3, width: 40, height: 58, background: i % 2 === 0 ? `linear-gradient(180deg,${CLAY} 0%,#A9573A 100%)` : `linear-gradient(180deg,${PAPER} 0%,#DCD3C0 100%)` }} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * 40 - 1, top: -6, width: 2.5, height: 62, background: "rgba(26,24,19,0.20)" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,0.16) 0%,rgba(26,24,19,0.22) 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 280, top: 324, width: 472, height: 17, zIndex: 12, display: "flex", transform: `scaleX(${p.awn})`, transformOrigin: "50% 0%" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} style={{ width: 40, height: 17, borderRadius: "0 0 20px 20px", transform: `translateY(${Math.sin(p.sway * 0.14 + i * 0.62) * 3}px)`, background: i % 2 === 0 ? "#A9573A" : "#DCD3C0" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 296, top: 341, width: 440, height: 30, zIndex: 11, opacity: p.awn * 0.5, background: "linear-gradient(180deg,rgba(26,24,19,0.30) 0%,rgba(26,24,19,0) 100%)" }} />
      {/* hanging sign on a bracket with two chain links */}
      <div style={{ position: "absolute", left: 300, top: 336, width: 82, height: 62, zIndex: 16, opacity: p.menu, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(p.sway * 0.08) * 2.4}deg)` }}>
        {[16, 60].map((cx, k) => (
          <div key={k} style={{ position: "absolute", left: cx, top: 0, width: 5, height: 12, borderRadius: 3, background: "#6E6A60" }} />
        ))}
        <div style={{ position: "absolute", left: 3, top: 10, width: 76, height: 44, borderRadius: 7, background: `linear-gradient(180deg,#241F18 0%,${INK} 100%)`, boxShadow: `${tiny}, inset 0 0 0 2.5px ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: GOLD, whiteSpace: "nowrap" }}>COFFEE</div>
        </div>
      </div>
      {/* door */}
      <div style={{ position: "absolute", left: 330, top: 396, width: 118, height: 224, zIndex: 13, opacity: p.front, background: `linear-gradient(180deg,#2A241C 0%,${INK} 100%)`, borderRadius: "56px 56px 3px 3px", boxShadow: `inset 0 0 0 6px ${CLAY}, 0 12px 24px rgba(26,24,19,0.30)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 16, top: 22, width: 86, height: 104, borderRadius: "42px 42px 4px 4px", background: `linear-gradient(160deg,${PAPER} 0%,${SLATE} 150%)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "42px 42px 4px 4px", background: AMBER, opacity: p.lit * 0.72 }} />
          <div style={{ position: "absolute", left: 41, top: 0, width: 3, height: 104, background: "rgba(26,24,19,0.35)" }} />
          <div style={{ position: "absolute", left: 0, top: 56, width: 86, height: 3, background: "rgba(26,24,19,0.30)" }} />
        </div>
        <div style={{ position: "absolute", left: 18, top: 146, width: 82, height: 30, borderRadius: 6, background: `linear-gradient(180deg,${GREEN} 0%,#2C6E51 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: bevel }}>
          <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, letterSpacing: 2, color: CREAM }}>OPEN</div>
        </div>
        <div style={{ position: "absolute", left: 96, top: 196, width: 12, height: 12, borderRadius: 12, background: AMBER }} />
        <div style={{ position: "absolute", left: 26, top: 186, width: 44, height: 8, borderRadius: 3, background: `linear-gradient(180deg,#8C877A,#4A473F)` }} />
        <div style={{ position: "absolute", left: 78, top: 132, width: 26, height: 16, fontFamily: mono, fontSize: 13, fontWeight: 800, color: GOLD, textAlign: "center", whiteSpace: "nowrap" }}>7</div>
        <div style={{ position: "absolute", left: 8, top: 204, width: 102, height: 14, borderRadius: 3, background: `linear-gradient(180deg,#8C877A,#57534A)` }} />
      </div>
      <div style={{ position: "absolute", left: 318, top: 612, width: 142, height: 14, zIndex: 14, opacity: p.front, borderRadius: 4, background: `linear-gradient(180deg,#C7BEAB,#948C7A)`, boxShadow: tiny }} />
      <div style={{ position: "absolute", left: 344, top: 622, width: 92, height: 15, zIndex: 15, opacity: p.front, borderRadius: 3, background: `linear-gradient(180deg,#8E7A5C,#5F5138)` }}>
        <div style={{ position: "absolute", inset: 2, background: "repeating-linear-gradient(90deg,rgba(236,233,226,0.30) 0 3px,rgba(0,0,0,0) 3px 9px)" }} />
      </div>
      {/* main window with mullions and sill */}
      <div style={{ position: "absolute", left: 466, top: 372, width: 138, height: 128, zIndex: 13, opacity: p.front, background: `linear-gradient(160deg,${PAPER} 0%,#A9B6C6 46%,${SLATE} 100%)`, borderRadius: 8, boxShadow: `inset 0 0 0 6px ${CREAM}, 0 10px 20px rgba(26,24,19,0.24)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: AMBER, opacity: p.lit * 0.66 }} />
        <div style={{ position: "absolute", left: -48, top: -40, width: 58, height: 220, background: "rgba(247,243,234,0.30)", transform: "rotate(18deg)" }} />
        <div style={{ position: "absolute", left: 38, top: -40, width: 20, height: 220, background: "rgba(247,243,234,0.20)", transform: "rotate(18deg)" }} />
        <div style={{ position: "absolute", left: 16, top: 78, width: 106, height: 10, borderRadius: 4, background: `linear-gradient(180deg,${CREAM},#A29A88)` }} />
        {[0, 1, 2, 3].map((k) => (
          <div key={k} style={{ position: "absolute", left: 20 + k * 26, top: 58, width: 18, height: 18, borderRadius: "9px 9px 5px 5px", background: `linear-gradient(180deg,${AMBER} 0%,#A6742F 100%)` }} />
        ))}
        <div style={{ position: "absolute", left: 66, top: 0, width: 5, height: 128, background: "rgba(236,233,226,0.85)" }} />
        <div style={{ position: "absolute", left: 0, top: 40, width: 138, height: 5, background: "rgba(236,233,226,0.75)" }} />
        <div style={{ position: "absolute", left: 8, top: 12, width: 42, height: 16, borderRadius: 3, background: CLAY, opacity: 0.85 }} />
      </div>
      <div style={{ position: "absolute", left: 458, top: 498, width: 154, height: 12, zIndex: 14, opacity: p.front, borderRadius: 3, background: `linear-gradient(180deg,${CREAM},#9A927F)`, boxShadow: tiny }} />
      {/* menu board with fully visible prices */}
      <div style={{ position: "absolute", left: 616, top: 372, width: 114, height: 128, zIndex: 13, opacity: p.menu, borderRadius: 9, padding: "8px 10px", background: `linear-gradient(180deg,#241F18 0%,${INK} 100%)`, boxShadow: `0 12px 22px rgba(26,24,19,0.34), inset 0 0 0 4px ${AMBER}` }}>
        <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 800, letterSpacing: 2, color: AMBER, textAlign: "center", marginBottom: 6 }}>MENU</div>
        {[["LATTE", "$4"], ["LOAF", "$6"], ["COOKIE", "$3"]].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", whiteSpace: "nowrap", fontFamily: mono, fontSize: 14, fontWeight: 700, marginBottom: 6, color: i === Math.floor((p.sway / 18) % 3) ? GOLD : CREAM }}>
            <span>{r[0]}</span><span>{r[1]}</span>
          </div>
        ))}
        <div style={{ position: "absolute", left: 10, top: 106, width: 94, height: 3, background: "rgba(236,233,226,0.22)" }} />
      </div>
      <div style={{ position: "absolute", left: 466, top: 516, width: 138, height: 88, zIndex: 13, opacity: p.menu, borderRadius: 8, padding: "8px 10px", background: "linear-gradient(180deg,#25302A 0%,#16201B 100%)", boxShadow: `0 12px 22px rgba(26,24,19,0.34), inset 0 0 0 4px ${CLAY}` }}>
        <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, letterSpacing: 2, color: MUTE, whiteSpace: "nowrap" }}>TODAY ONLY</div>
        <div style={{ fontFamily: mono, fontSize: 19, fontWeight: 800, color: CREAM, marginTop: 6, whiteSpace: "nowrap" }}>MOCHA $5</div>
        <div style={{ position: "absolute", left: 10, top: 62, width: 60, height: 6, borderRadius: 3, background: "rgba(236,233,226,0.20)" }} />
      </div>
      <div style={{ position: "absolute", left: 616, top: 538, width: 114, height: 66, zIndex: 13, opacity: p.menu }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 114, height: 12, borderRadius: 5, background: `linear-gradient(180deg,${CREAM},#A29A88)`, boxShadow: softer }} />
        <div style={{ position: "absolute", left: 8, top: 12, width: 10, height: 52, background: `linear-gradient(90deg,${MUTE},#5F5C55)` }} />
        <div style={{ position: "absolute", left: 96, top: 12, width: 10, height: 52, background: `linear-gradient(90deg,${MUTE},#5F5C55)` }} />
        <div style={{ position: "absolute", left: 18, top: 20, width: 78, height: 8, borderRadius: 4, background: "rgba(26,24,19,0.20)" }} />
      </div>
      {/* sign */}
      <div style={{ position: "absolute", left: 336, top: p.signTop, width: 360, height: 66, zIndex: 15, background: `linear-gradient(180deg,#231F19 0%,${INK} 100%)`, borderRadius: 12, boxShadow: `${soft}, ${bevel}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 10, top: 9, width: 340, height: 48, borderRadius: 8, boxShadow: "inset 0 0 0 2px rgba(231,178,76,0.35)" }} />
        <div style={{ fontFamily: "Georgia, serif", fontSize: 32, letterSpacing: 4, fontWeight: 700, color: GOLD, whiteSpace: "nowrap", opacity: p.signTxt }}>CORNER CAFE</div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", left: 34 + i * 74, top: -7, width: 13, height: 13, borderRadius: 13, background: p.signTxt > 0.5 ? GOLD : "#6E6A60", boxShadow: "0 3px 5px rgba(26,24,19,0.4)" }} />
        ))}
      </div>
      {p.front > 0.6 && <Planter x={742} y={548} z={17} sway={p.sway} />}
      {p.front > 0.6 && <Crate x={252} y={548} z={17} />}
    </div>
  );
  // ================= SHOT A : the idea card goes in =================
  const cardL = IV(s0, [0, 18], [1120, 110]);
  const cardT = IV(s0, [0, 18], [-60, 250]);
  const cardR = IV(s0, [0, 14, 18, 22], [-16, 4, -1.5, 0]);
  const cardTx = IV(s0, [11, 15], [0, 1]);
  const carX = s0 <= 34 ? IV(s0, [14, 34], [-190, 640]) : IV(s0, [34, 54], [640, -170]);
  const scanFill = Math.max(IV(s0, [14, 34], [0, 0.6]), IV(s0, [34, 50], [0.6, 1]));
  const locked = s0 >= 40 ? 1 : 0;
  const clipDrop = over(lf, 22, 10, Easing.out(Easing.back(2.4)));
  const ShotA = () => (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* back wall : dark studio panelling */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 432, background: `linear-gradient(180deg,${TERM2} 0%,${TERM} 70%,#16233A 100%)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * 62, top: 0, width: 1.5, height: 432, background: "rgba(58,92,132,0.26)" }} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: 40 + i * 70, width: 1012, height: 1.5, background: "rgba(58,92,132,0.20)" }} />
        ))}
        {[{ l: 66, t: 138, w: 156, h: 118, r: -3 }, { l: 236, t: 158, w: 132, h: 98, r: 2.4 }].map((s, i) => (
          <div key={i} style={{ position: "absolute", left: s.l, top: s.t, width: s.w, height: s.h, transform: `rotate(${s.r + Math.sin(lf * 0.06 + i) * 0.5}deg)`, borderRadius: 4, background: `linear-gradient(180deg,#1B2C45 0%,#132038 100%)`, boxShadow: `${tiny}, inset 0 0 0 1.5px rgba(58,92,132,0.5)` }}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{ position: "absolute", left: 12, top: 16 + k * 20, width: s.w - 24 - k * 16, height: 3, background: "rgba(58,92,132,0.75)" }} />
            ))}
            <div style={{ position: "absolute", left: s.w / 2 - 5, top: -5, width: 10, height: 10, borderRadius: 10, background: CLAY, boxShadow: tiny }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: 96, width: 1012, height: 20, background: `linear-gradient(180deg,#22344F 0%,#16233A 100%)`, boxShadow: "0 8px 14px rgba(0,0,0,0.4)" }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <div key={i} style={{ position: "absolute", left: 26 + i * 84, top: 100, width: 12, height: 12, borderRadius: 12, background: SLATE }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: 470 + i * 62, top: 54, width: 40, height: 42, borderRadius: "5px 5px 7px 7px", background: `linear-gradient(160deg,#26405F 0%,#16233A 100%)`, boxShadow: rim }}>
            <div style={{ position: "absolute", left: 6, top: -8, width: 28, height: 10, borderRadius: 3, background: "#31517A" }} />
            <div style={{ position: "absolute", left: 5, top: 20, width: 30, height: 16, borderRadius: 3, background: i % 2 === 0 ? "#7B5A32" : "#4A6B52" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: 402, width: 1012, height: 30, background: `linear-gradient(180deg,#22344F 0%,#0A1120 100%)` }} />
      </div>
      {/* desk : wood grain, joints, plinth */}
      <div style={{ position: "absolute", left: 0, top: 432, width: 1012, height: 360, background: `linear-gradient(180deg,#D8D0BF 0%,#C3BAA7 42%,#A8A08D 100%)`, boxShadow: "inset 0 10px 20px rgba(26,24,19,0.22)" }}>
        <div style={{ position: "absolute", inset: 0, background: woodTex }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ position: "absolute", left: -60 + i * 138, top: 0, width: 4, height: 360, background: "rgba(26,24,19,0.12)", transform: "skewX(-19deg)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 268, width: 1012, height: 5, background: "rgba(26,24,19,0.20)" }} />
        <div style={{ position: "absolute", left: 0, top: 328, width: 1012, height: 32, background: "linear-gradient(180deg,#6B6459 0%,#413C34 100%)" }} />
        {[{ l: 640, t: 236, d: 92 }, { l: 726, t: 268, d: 58 }].map((r, i) => (
          <div key={i} style={{ position: "absolute", left: r.l, top: r.t, width: r.d, height: r.d * 0.34, borderRadius: r.d, boxShadow: "inset 0 0 0 4px rgba(120,84,44,0.22)" }} />
        ))}
        {[196, 566].map((ry, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: ry - 432, width: 1012, height: 12, background: `linear-gradient(180deg,#8C877A 0%,#4A473F 100%)`, boxShadow: tiny }} />
        ))}
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ position: "absolute", left: 46 + i * 176, top: 570, width: 26, height: 12, zIndex: 19, borderRadius: 3, background: `linear-gradient(180deg,#B7AE9B,#5F5C55)`, boxShadow: tiny }} />
      ))}
      {/* dock / slot the card slides into */}
      <div style={{ position: "absolute", left: 84, top: 232, width: 476, height: 312, zIndex: 20, borderRadius: 14, background: `linear-gradient(180deg,#1A2740 0%,${TERM2} 100%)`, boxShadow: `inset 0 0 0 5px ${SLATE}, 0 20px 34px rgba(26,24,19,0.40)` }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", left: 18, top: 20 + i * 48, width: 12, height: 24, borderRadius: 4, background: "rgba(58,92,132,0.55)" }} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", left: 446, top: 20 + i * 48, width: 12, height: 24, borderRadius: 4, background: "rgba(58,92,132,0.40)" }} />
        ))}
        <div style={{ position: "absolute", left: 40, top: 292, width: 396, height: 8, borderRadius: 4, background: "rgba(58,92,132,0.35)" }} />
      </div>
      <div style={{ position: "absolute", left: 84, top: 548, width: 476, height: 26, zIndex: 20, borderRadius: 8, background: "rgba(26,24,19,0.30)", overflow: "hidden", boxShadow: `inset 0 2px 6px rgba(0,0,0,0.4)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 476 * scanFill, height: 26, borderRadius: 8, background: `linear-gradient(90deg,#2C6E51,${GREEN})` }} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} style={{ position: "absolute", left: 58 + i * 58, top: 0, width: 2, height: 26, background: "rgba(26,24,19,0.34)" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 92, top: 586, width: 300, height: 30, zIndex: 20, fontFamily: mono, fontSize: 19, fontWeight: 800, letterSpacing: 2, color: INK, whiteSpace: "nowrap" }}>READING INPUT</div>
      <div style={{ position: "absolute", left: 92, top: 618, width: 300, height: 22, zIndex: 20, fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, color: "#5F5C55", whiteSpace: "nowrap" }}>{Math.round(scanFill * 100)}% PARSED</div>
      {/* desk clutter : pencil, sticky note */}
      <div style={{ position: "absolute", left: 596, top: 622, width: 214, height: 16, zIndex: 21, borderRadius: 4, transform: "rotate(-7deg)", background: `linear-gradient(180deg,${GOLD} 0%,#A6742F 100%)`, boxShadow: tiny }}>
        <div style={{ position: "absolute", left: 194, top: 0, width: 20, height: 16, borderRadius: "0 3px 3px 0", background: "#D8CFBC" }} />
        <div style={{ position: "absolute", left: -14, top: 2, width: 16, height: 12, background: INK, clipPath: "polygon(100% 0%,100% 100%,0% 50%)" }} />
      </div>
      <div style={{ position: "absolute", left: 812, top: 578, width: 138, height: 108, zIndex: 21, transform: "rotate(5deg)", borderRadius: 3, background: `linear-gradient(180deg,${GOLD} 0%,#C79B3C 100%)`, boxShadow: softer }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 14, top: 22 + k * 22, width: 108 - k * 26, height: 5, borderRadius: 3, background: "rgba(26,24,19,0.28)" }} />
        ))}
      </div>
      {/* the idea card */}
      <div style={{ position: "absolute", left: cardL, top: cardT, width: 420, height: 272, zIndex: 26, transform: `rotate(${cardR}deg)`, borderRadius: 14, padding: "26px 24px", background: `linear-gradient(180deg,${PAPER} 0%,${CREAM} 60%,#DCD3C0 100%)`, boxShadow: `0 26px 44px rgba(26,24,19,0.44), ${bevel}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(26,24,19,0.05) 0 1px,rgba(0,0,0,0) 1px 26px)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: 272, background: `linear-gradient(180deg,${CLAY},#8E4830)` }} />
        <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 800, letterSpacing: 3, color: CLAY, opacity: cardTx, whiteSpace: "nowrap" }}>YOUR IDEA</div>
        <div style={{ marginTop: 10, width: 372, height: 3, background: "rgba(26,24,19,0.22)" }} />
        <div style={{ marginTop: 22, fontFamily: "Georgia, serif", fontSize: 46, fontWeight: 700, letterSpacing: 1, color: INK, opacity: cardTx, whiteSpace: "nowrap" }}>OPEN A</div>
        <div style={{ marginTop: 6, fontFamily: "Georgia, serif", fontSize: 46, fontWeight: 700, letterSpacing: 1, color: INK, opacity: cardTx, whiteSpace: "nowrap" }}>CORNER CAFE</div>
        <div style={{ position: "absolute", left: 24, top: 224, width: 130, height: 8, borderRadius: 4, background: "rgba(26,24,19,0.18)", opacity: cardTx }} />
        <div style={{ position: "absolute", left: 24, top: 240, width: 86, height: 6, borderRadius: 3, background: "rgba(26,24,19,0.12)", opacity: cardTx }} />
        <div style={{ position: "absolute", left: 300, top: 208, width: 96, height: 40, borderRadius: 8, background: `linear-gradient(180deg,${AMBER} 0%,#A6742F 100%)`, boxShadow: softer, display: "flex", alignItems: "center", justifyContent: "center", opacity: cardTx }}>
          <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 800, color: INK, whiteSpace: "nowrap" }}>DAY 1</div>
        </div>
        <div style={{ position: "absolute", left: 292, top: 22, width: 104, height: 34, borderRadius: 6, transform: "rotate(-8deg)", boxShadow: `inset 0 0 0 3px ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: cardTx * locked }}>
          <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, color: RED, whiteSpace: "nowrap" }}>FILED</div>
        </div>
      </div>
      {/* paperclip dropping onto the card and settling */}
      <div style={{ position: "absolute", left: 128, top: 214 + (1 - clipDrop) * -180, width: 46, height: 84, zIndex: 30, opacity: clipDrop > 0.02 ? 1 : 0, transform: `rotate(${IV(clipDrop, [0, 1], [-40, -12])}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 22, boxShadow: `inset 0 0 0 6px #8C877A, ${tiny}` }} />
        <div style={{ position: "absolute", left: 12, top: 14, width: 22, height: 60, borderRadius: 14, boxShadow: "inset 0 0 0 5px #B7AE9B" }} />
      </div>
      {/* travelling scan carriage */}
      <div style={{ position: "absolute", left: carX, top: 214, width: 132, height: 348, zIndex: 34 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 132, height: 348, borderRadius: 10, background: `linear-gradient(90deg,#22344F 0%,${SLATE} 46%,#22344F 100%)`, boxShadow: "22px 0 34px rgba(26,24,19,0.36)" }} />
        <div style={{ position: "absolute", left: 54, top: 0, width: 8, height: 348, background: CREAM }} />
        <div style={{ position: "absolute", left: 0, top: -22, width: 132, height: 26, borderRadius: 6, background: `linear-gradient(180deg,${MUTE} 0%,#5F5C55 100%)`, boxShadow: softer }} />
        <div style={{ position: "absolute", left: 0, top: 348, width: 132, height: 22, borderRadius: 6, background: `linear-gradient(180deg,#5F5C55 0%,${INK} 100%)` }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", left: 14, top: 26 + i * 64, width: 22, height: 22, borderRadius: 22, background: "rgba(236,233,226,0.34)" }} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", left: 96, top: 34 + i * 64, width: 14, height: 8, borderRadius: 3, background: i === Math.floor(mod(lf, 5)) ? GREEN : "rgba(26,24,19,0.42)" }} />
        ))}
        <div style={{ position: "absolute", left: 22, top: -34, width: 88, height: 14, borderRadius: 4, background: `linear-gradient(180deg,#8C877A,#4A473F)` }} />
      </div>
      {/* close-up Claude watching the card go in */}
      <Actor x={790} groundY={704} size={320} z={40} shadow={1}>
        <Mascot lf={lf} size={320} gaze={-4} cheer={IV(s0, [36, 46], [0.3, 0.95])} nodAmp={5} nodSpeed={0.13} glasses={1} apron={1} cup={1} />
      </Actor>
      <Steam x={690} y={470} ph={0} z={42} />
      <div style={{ position: "absolute", left: 604, top: 56, width: 344, height: 62, zIndex: 44, borderRadius: 12, background: `linear-gradient(180deg,${TERM} 0%,${TERM2} 100%)`, boxShadow: `0 14px 26px rgba(0,0,0,0.42), inset 0 0 0 1.5px rgba(58,92,132,0.6)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 800, letterSpacing: 2, color: locked ? GREEN : GOLD, whiteSpace: "nowrap" }}>{locked ? "IDEA LOCKED" : "SCANNING IDEA"}</div>
      </div>
      <div style={{ position: "absolute", left: 604, top: 122, width: 344, height: 10, zIndex: 44, borderRadius: 5, background: "rgba(26,24,19,0.45)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 344 * scanFill, height: 10, borderRadius: 5, background: `linear-gradient(90deg,#A6742F,${GOLD})` }} />
      </div>
    </div>
  );
  // ================= SHOT B : the world builds itself =================
  const bpOp = IV(s1, [0, 34], [0.62, 0.10]);
  const roadW = IV(s1, [2, 14], [0, 1012]);
  const rise = IV(s1, [10, 22], [0, 1]);
  const lShop = over(lf, CA + 20, 10, Easing.out(Easing.back(1.6)));
  const rShop = over(lf, CA + 26, 10, Easing.out(Easing.back(1.6)));
  const awn = IV(s1, [32, 40], [0, 1]);
  const signTopB = IV(s1, [38, 46], [-118, 196]);
  const signTxtB = IV(s1, [43, 46], [0, 1]);
  const menuB = IV(s1, [30, 38], [0, 1]);
  const frontB = IV(s1, [22, 30], [0, 1]);
  const lampY = IV(s1, [44, 52], [-260, 0]);
  const treeS = over(lf, CA + 50, 8, Easing.out(Easing.back(2.2)));
  const gantX = IV(s1, [0, 58], [-400, 1070]);
  const jib = Math.sin(s1 * 0.05) * 9;
  const Ground = (opt: { road: number; night: number }) => (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 8 }}>
      <div style={{ position: "absolute", left: 0, top: 620, width: 1012, height: 172, background: `linear-gradient(180deg,#CFC8B8 0%,#B9B09E 52%,#A69C88 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 620, width: opt.road, height: 80, background: "linear-gradient(180deg,#6C6A63 0%,#4E4C46 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(113deg,rgba(236,233,226,0.05) 0 2px,rgba(0,0,0,0) 2px 15px)" }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ position: "absolute", left: mod(i * 124 - lf * 3.4, 1150) - 70, top: 38, width: 60, height: 7, borderRadius: 4, background: "rgba(236,233,226,0.55)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 5, background: "rgba(26,24,19,0.30)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 700, width: 1012, height: 92, background: `linear-gradient(180deg,${CREAM} 0%,#C4BBA8 46%,#AEA491 100%)`, boxShadow: "inset 0 6px 12px rgba(26,24,19,0.16)" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(26,24,19,0.06) 0 1px,rgba(0,0,0,0) 1px 22px)" }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ position: "absolute", left: 10 + i * 118, top: 0, width: 3, height: 62, background: "rgba(26,24,19,0.15)", transform: "skewX(-16deg)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 62, width: 1012, height: 4, background: "rgba(26,24,19,0.18)" }} />
        <div style={{ position: "absolute", left: 0, top: 66, width: 1012, height: 26, background: "linear-gradient(180deg,#5B584F 0%,#3B3934 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 620, width: 1012, height: 172, background: `rgba(58,92,132,${opt.night * 0.24})` }} />
    </div>
  );
  const Lamp = (lx: number, dy: number) => (
    <div style={{ position: "absolute", left: lx - 34, top: 452 + dy, width: 68, height: 248, zIndex: 46 }}>
      <div style={{ position: "absolute", left: 26, top: 22, width: 16, height: 226, background: `linear-gradient(90deg,${MUTE} 0%,#5F5C55 100%)`, boxShadow: softer }} />
      {[0, 1].map((k) => (
        <div key={k} style={{ position: "absolute", left: 20, top: 74 + k * 92, width: 28, height: 7, borderRadius: 3, background: "#5F5C55" }} />
      ))}
      <div style={{ position: "absolute", left: 12, top: 0, width: 44, height: 26, borderRadius: "10px 10px 4px 4px", background: `linear-gradient(180deg,${AMBER} 0%,#A6742F 100%)`, boxShadow: softer }} />
      <div style={{ position: "absolute", left: 20, top: -8, width: 28, height: 9, borderRadius: 4, background: `linear-gradient(180deg,#8C877A,#4A473F)` }} />
      <div style={{ position: "absolute", left: 6, top: 236, width: 56, height: 14, borderRadius: 6, background: `linear-gradient(180deg,${MUTE},#413C34)` }} />
    </div>
  );
  const Tree = (tx: number, sc: number) => (
    <div style={{ position: "absolute", left: tx - 78, top: 574, width: 156, height: 212, zIndex: 50, transform: `scale(${sc}) rotate(${Math.sin(lf * 0.05 + tx) * 0.8}deg)`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 66, top: 96, width: 24, height: 116, background: `linear-gradient(90deg,#8E4830,${CLAY})`, borderRadius: 5 }} />
      <div style={{ position: "absolute", left: 60, top: 118, width: 34, height: 6, borderRadius: 3, background: "rgba(26,24,19,0.18)" }} />
      <div style={{ position: "absolute", left: 10, top: 30, width: 92, height: 92, borderRadius: 92, background: `linear-gradient(180deg,${GREEN} 0%,#265D45 100%)`, boxShadow: softer }} />
      <div style={{ position: "absolute", left: 58, top: 4, width: 88, height: 88, borderRadius: 88, background: `linear-gradient(180deg,#4FAE83 0%,#2E6E52 100%)`, boxShadow: softer }} />
      <div style={{ position: "absolute", left: 40, top: 58, width: 86, height: 86, borderRadius: 86, background: `linear-gradient(180deg,${GREEN} 0%,#22553F 100%)` }} />
      <div style={{ position: "absolute", left: 24, top: 196, width: 108, height: 14, borderRadius: 40, background: "radial-gradient(ellipse,rgba(26,24,19,0.36) 0%,rgba(26,24,19,0) 74%)" }} />
    </div>
  );
  const Shopfront = (o: { l: number; t: number; w: number; h: number; sc: number; band: string; band2: string; label: string; labelCol: string; rows: number; lit: number; z: number }) => (
    <div style={{ position: "absolute", left: o.l, top: o.t, width: o.w, height: o.h, zIndex: o.z, transform: `scaleY(${o.sc})`, transformOrigin: "50% 100%", background: `linear-gradient(180deg,${CREAM} 0%,#CFC7B5 62%,#BCB2A0 100%)`, borderRadius: "8px 8px 0 0", boxShadow: `0 18px 34px rgba(26,24,19,0.20), ${bevel}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: brickTex, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: o.w, height: 18, background: `linear-gradient(180deg,${o.band},${o.band2})`, borderRadius: "6px 6px 0 0" }} />
      <div style={{ position: "absolute", left: 0, top: 18, width: o.w, height: 6, background: "rgba(26,24,19,0.20)" }} />
      <div style={{ position: "absolute", left: 22, top: 38, width: o.w - 44, height: 34, borderRadius: 6, background: `linear-gradient(180deg,#241F18,${INK})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: tiny }}>
        <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 800, letterSpacing: 2, color: o.labelCol, whiteSpace: "nowrap", opacity: o.sc > 0.9 ? 1 : 0 }}>{o.label}</div>
      </div>
      {[0, 1, 2, 3].slice(0, o.rows).map((i) => {
        const cw = o.w > 220 ? 78 : 148;
        const cx = o.w > 220 ? 24 + (i % 2) * 114 : 34;
        const cy = o.w > 220 ? 100 + Math.floor(i / 2) * 110 : 98 + i * 84;
        const ch = o.w > 220 ? 88 : 66;
        return (
          <div key={i} style={{ position: "absolute", left: cx, top: cy, width: cw, height: ch, borderRadius: 6, background: `linear-gradient(160deg,${PAPER} 0%,${SLATE} 130%)`, boxShadow: "inset 0 0 0 5px #ECE9E2", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 6, top: 6, width: cw - 12, height: ch - 12, borderRadius: 3, background: AMBER, opacity: o.lit }} />
            <div style={{ position: "absolute", left: cw / 2 - 2, top: 0, width: 4, height: ch, background: "rgba(236,233,226,0.7)" }} />
            <div style={{ position: "absolute", left: 0, top: ch / 2 - 2, width: cw, height: 4, background: "rgba(236,233,226,0.6)" }} />
            <div style={{ position: "absolute", left: -22, top: -14, width: 22, height: ch + 40, background: "rgba(247,243,234,0.24)", transform: "rotate(17deg)" }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 10, top: 24, width: 11, height: o.h - 24, borderRadius: 4, background: `linear-gradient(90deg,#B7AE9B,#6E6A60)` }} />
      <div style={{ position: "absolute", left: 0, top: o.h - 34, width: o.w, height: 10, background: `linear-gradient(180deg,#B4AB98,#8E8674)` }} />
    </div>
  );
  const ShotB = () => (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F7F3EA 0%,#ECE9E2 42%,#E3DCCC 72%,#D8CDB8 100%)" }} />
      <Skyline top={300} op={0.20} drift={s1 * 0.5} tone="#B4B0A4" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} style={{ position: "absolute", left: 24 + i * 116, top: 300 - (78 + seed(i * 5 + 2) * 150), width: 88 + seed(i * 3 + 1) * 60, height: 78 + seed(i * 5 + 2) * 150, borderRadius: "8px 8px 0 0", background: `linear-gradient(180deg,${MUTE} 0%,#6E6A60 100%)`, opacity: 0.32, zIndex: 3, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,rgba(26,24,19,0.22) 0 8px,rgba(0,0,0,0) 8px 26px)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 200, height: 6, background: "rgba(26,24,19,0.28)" }} />
        </div>
      ))}
      {/* blueprint plane, present at frame 0 */}
      <div style={{ position: "absolute", inset: 0, opacity: bpOp, zIndex: 6, pointerEvents: "none" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * 62, top: 0, width: 1.5, height: 792, background: "rgba(58,92,132,0.40)" }} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: i * 62, width: 1012, height: 1.5, background: "rgba(58,92,132,0.30)" }} />
        ))}
        {[{ l: 296, t: 180, w: 440, h: 440 }, { l: 280, t: 274, w: 472, h: 52 }, { l: 336, t: 196, w: 360, h: 66 }, { l: 40, t: 300, w: 236, h: 320 }, { l: 756, t: 268, w: 216, h: 352 }, { l: 330, t: 396, w: 118, h: 224 }, { l: 466, t: 372, w: 138, h: 128 }, { l: 616, t: 372, w: 114, h: 128 }].map((r, i) => (
          <div key={i} style={{ position: "absolute", left: r.l, top: r.t, width: r.w, height: r.h, border: `2.5px dashed ${SLATE}`, borderRadius: 6 }}>
            <div style={{ position: "absolute", left: 4, top: -2, width: r.w - 8, height: 1.5, background: "rgba(58,92,132,0.55)" }} />
            <div style={{ position: "absolute", left: -12, top: 0, width: 1.5, height: r.h, background: "rgba(58,92,132,0.45)" }} />
            <div style={{ position: "absolute", left: -18, top: r.h / 2 - 7, width: 13, height: 13, transform: "rotate(45deg)", boxShadow: "inset 0 0 0 1.5px rgba(58,92,132,0.6)" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, width: 1012, height: 2.5, top: 120 + ramp(lf, CA, CA + 40) * 560, background: `linear-gradient(90deg,rgba(58,92,132,0) 0%,${SLATE} 50%,rgba(58,92,132,0) 100%)` }} />
      </div>
      {Ground({ road: roadW, night: 0 })}
      {/* neighbour shops snap up */}
      {Shopfront({ l: 40, t: 300, w: 236, h: 320, sc: lShop, band: AMBER, band2: "#A6742F", label: "BOOK SHOP", labelCol: AMBER, rows: 4, lit: 0, z: 9 })}
      {Shopfront({ l: 756, t: 268, w: 216, h: 352, sc: rShop, band: CLAY, band2: "#9E5136", label: "FLORIST", labelCol: GOLD, rows: 3, lit: 0, z: 9 })}
      {/* scaffolding on the rising cafe */}
      <div style={{ position: "absolute", left: 286, top: 196, width: 462, height: 424, zIndex: 22, opacity: IV(s1, [12, 20, 40, 50], [0, 0.9, 0.9, 0]) }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} style={{ position: "absolute", left: 0, top: 40 + k * 104, width: 462, height: 9, borderRadius: 3, background: `linear-gradient(180deg,#C9A468,#8E6B39)`, boxShadow: tiny }} />
        ))}
        {[0, 1, 2, 3, 4].map((k) => (
          <div key={k} style={{ position: "absolute", left: 10 + k * 110, top: 0, width: 9, height: 424, background: `linear-gradient(90deg,#B7AE9B,#5F5C55)` }} />
        ))}
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 24 + k * 148, top: 46 + k * 104, width: 108, height: 5, background: "rgba(26,24,19,0.30)", transform: "rotate(-16deg)", transformOrigin: "0% 50%" }} />
        ))}
      </div>
      {Cafe({ rise, awn, signTop: signTopB, signTxt: signTxtB, menu: menuB, front: frontB, lit: 0, sway: lf })}
      {Lamp(140, lampY)}
      {Lamp(880, lampY)}
      {Tree(100, treeS)}
      {Tree(910, treeS)}
      {/* dust puffs as pieces land */}
      <Puff x={210} y={604} t={CA + 28} sc={1.1} />
      <Puff x={470} y={608} t={CA + 22} sc={1.3} />
      <Puff x={806} y={604} t={CA + 34} sc={1.1} />
      <Puff x={640} y={606} t={CA + 40} sc={1.0} />
      <Puff x={140} y={694} t={CA + 52} sc={0.9} />
      <Puff x={880} y={694} t={CA + 52} sc={0.9} />
      {/* tower crane, jib swinging */}
      <div style={{ position: "absolute", left: 792, top: 116, width: 210, height: 200, zIndex: 44, opacity: IV(s1, [0, 8, 46, 54], [0, 1, 1, 0]) }}>
        <div style={{ position: "absolute", left: 96, top: 20, width: 20, height: 180, background: `linear-gradient(90deg,${GOLD},#96702B)`, boxShadow: tiny }} />
        {[0, 1, 2, 3, 4].map((k) => (
          <div key={k} style={{ position: "absolute", left: 94, top: 30 + k * 34, width: 24, height: 4, background: "rgba(26,24,19,0.32)" }} />
        ))}
        <div style={{ position: "absolute", left: 10, top: 8, width: 192, height: 14, borderRadius: 4, transformOrigin: "50% 50%", transform: `rotate(${jib}deg)`, background: `linear-gradient(180deg,${GOLD},#96702B)`, boxShadow: tiny }} />
        <div style={{ position: "absolute", left: 44, top: 22, width: 4, height: 62 + Math.sin(s1 * 0.12) * 12, background: "rgba(26,24,19,0.45)" }} />
        <div style={{ position: "absolute", left: 30, top: 82 + Math.sin(s1 * 0.12) * 12, width: 32, height: 22, borderRadius: 4, background: `linear-gradient(180deg,${SLATE},${SLATE2})`, boxShadow: tiny }} />
      </div>
      {/* site foreman watching the build */}
      <Actor x={172} groundY={706} size={182} z={49} shadow={1}>
        <Mascot lf={lf} size={182} constr={1} cup={1} gaze={5} cheer={IV(s1, [30, 44], [0.35, 0.9])} nodAmp={4} nodSpeed={0.14} />
      </Actor>
      {/* build gantry sweeping the whole shot */}
      <div style={{ position: "absolute", left: 0, top: 92, width: 1012, height: 14, zIndex: 54, background: `linear-gradient(180deg,${MUTE} 0%,#4E4C46 100%)`, boxShadow: soft }} />
      <div style={{ position: "absolute", left: 0, top: 106, width: 1012, height: 5, zIndex: 54, background: "rgba(26,24,19,0.24)" }} />
      <div style={{ position: "absolute", left: gantX, top: 106, width: 344, height: 132, zIndex: 55 }}>
        <div style={{ position: "absolute", left: 150, top: -14, width: 44, height: 26, borderRadius: 5, background: `linear-gradient(180deg,${SLATE},#22344F)` }} />
        <div style={{ position: "absolute", left: 60, top: 10, width: 6, height: 34, background: "rgba(26,24,19,0.45)" }} />
        <div style={{ position: "absolute", left: 280, top: 10, width: 6, height: 34, background: "rgba(26,24,19,0.45)" }} />
        <div style={{ position: "absolute", left: 0, top: 40, width: 344, height: 92, borderRadius: 12, background: `linear-gradient(180deg,${SLATE} 0%,#22344F 100%)`, boxShadow: `0 20px 34px rgba(26,24,19,0.36), ${bevel}` }}>
          <div style={{ position: "absolute", left: 20, top: 22, width: 122, height: 48, borderRadius: 7, background: `linear-gradient(180deg,${TERM},${TERM2})` }}>
            <div style={{ position: "absolute", left: 10, top: 12, width: IV(mod(s1, 20), [0, 20], [16, 96]), height: 24, borderRadius: 4, background: GREEN }} />
          </div>
          <div style={{ position: "absolute", left: 164, top: 26, width: 158, height: 40, borderRadius: 7, background: `linear-gradient(180deg,${AMBER},#A6742F)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 17, fontWeight: 800, letterSpacing: 2, color: INK, whiteSpace: "nowrap", opacity: IV(gantX, [30, 110], [0, 1]) * IV(gantX, [560, 640], [1, 0]) }}>BUILDING</div>
          </div>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ position: "absolute", left: 22 + k * 30, top: 78, width: 20, height: 7, borderRadius: 3, background: k === Math.floor(mod(s1 * 0.5, 4)) ? GOLD : "rgba(26,24,19,0.40)" }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 40, top: 26, width: 284, height: 56, zIndex: 60, borderRadius: 12, background: `linear-gradient(180deg,${TERM} 0%,${TERM2} 100%)`, boxShadow: `0 14px 26px rgba(26,24,19,0.42), inset 0 0 0 1.5px rgba(58,92,132,0.55)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, letterSpacing: 2, color: GOLD, whiteSpace: "nowrap" }}>WORLD {Math.round(IV(s1, [0, 56], [8, 100]))}%</div>
      </div>
      <div style={{ position: "absolute", left: 40, top: 86, width: 284, height: 9, zIndex: 60, borderRadius: 5, background: "rgba(26,24,19,0.40)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: IV(s1, [0, 56], [22, 284]), height: 9, borderRadius: 5, background: `linear-gradient(90deg,#2C6E51,${GREEN})` }} />
      </div>
    </div>
  );
  // ================= SHOT C : the people, and how they react =================
  const PX = [196, 506, 816];
  const PS = [236, 248, 236];
  const PIN = [0, IV(s2, [0, 12], [430, 0]), IV(s2, [12, 24], [430, 0])];
  const POP = [1, IV(s2, [0, 12], [0, 1]), IV(s2, [12, 24], [0, 1])];
  const PCARD = [["STUDENT", "price sensitive", "$?"], ["COMMUTER", "in a hurry", "FAST"], ["REGULAR", "loyal every day", "USUAL"]];
  const PTAG = [["BUDGET", "WIFI"], ["7AM", "TO GO"], ["DAILY", "TIP"]];
  const PBAR = [[0.34, 0.86], [0.92, 0.30], [0.72, 0.98]];
  const PCOL = [SLATE, CLAY, GREEN];
  const PCOS: any[] = [
    { hoodie: 1, cap: 1, backpack: 1 },
    { suit: 1, tote: 1, cup: 1 },
    { beard: 1, beanie: 1, scarf: 1 },
  ];
  const sweepX = IV(s2, [24, 54], [-190, 1140]);
  const bubT = [32, 39, 46];
  const ShotC = () => (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${TERM2} 0%,${TERM} 56%,#16233A 100%)` }} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} style={{ position: "absolute", left: i * 80, top: 0, width: 1.5, height: 700, background: "rgba(58,92,132,0.24)" }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: 40 + i * 80, width: 1012, height: 1.5, background: "rgba(58,92,132,0.18)" }} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ position: "absolute", left: mod(i * 190 - s2 * (1.6 + i * 0.4), 1200) - 100, top: 122 + i * 92, width: 96, height: 3, borderRadius: 3, background: "rgba(58,92,132,0.5)" }} />
      ))}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: PX[i] - 148, top: 244, width: 296, height: 456, borderRadius: 16, background: "linear-gradient(180deg,rgba(58,92,132,0.16) 0%,rgba(58,92,132,0.02) 100%)", boxShadow: "inset 0 0 0 1.5px rgba(58,92,132,0.42)" }}>
          {[0, 1].map((k) => (
            <div key={k} style={{ position: "absolute", left: k === 0 ? 10 : 262, top: 10, width: 24, height: 24, boxShadow: `inset ${k === 0 ? "2px" : "-2px"} 2px 0 rgba(58,92,132,0.8)` }} />
          ))}
          <div style={{ position: "absolute", left: 118, top: 430, width: 60, height: 6, borderRadius: 3, background: "rgba(58,92,132,0.45)" }} />
        </div>
      ))}
      {/* drawn floor */}
      <div style={{ position: "absolute", left: 0, top: 700, width: 1012, height: 92, background: `linear-gradient(180deg,${CREAM} 0%,#BEB5A2 48%,#A69C88 100%)`, boxShadow: "inset 0 8px 16px rgba(26,24,19,0.24)" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(26,24,19,0.06) 0 1px,rgba(0,0,0,0) 1px 20px)" }} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} style={{ position: "absolute", left: 12 + i * 118, top: 0, width: 3, height: 60, background: "rgba(26,24,19,0.16)", transform: "skewX(-16deg)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 60, width: 1012, height: 32, background: "linear-gradient(180deg,#5B584F 0%,#3B3934 100%)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 694, width: 1012, height: 6, background: `linear-gradient(90deg,rgba(58,92,132,0) 0%,${SLATE} 50%,rgba(58,92,132,0) 100%)` }} />
      <div style={{ position: "absolute", left: 246, top: 40, width: 420, height: 62, zIndex: 40, borderRadius: 12, background: `linear-gradient(180deg,#22344F 0%,${TERM2} 100%)`, boxShadow: `0 14px 26px rgba(0,0,0,0.42), inset 0 0 0 1.5px rgba(58,92,132,0.6)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 23, fontWeight: 800, letterSpacing: 2, color: GOLD, whiteSpace: "nowrap" }}>GENERATING PEOPLE</div>
      </div>
      <div style={{ position: "absolute", left: 246, top: 106, width: 420, height: 8, zIndex: 40, borderRadius: 4, background: "rgba(26,24,19,0.45)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: IV(s2, [0, 26], [140, 420]), height: 8, borderRadius: 4, background: `linear-gradient(90deg,#A6742F,${GOLD})` }} />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", inset: 0, zIndex: 20 + i, opacity: POP[i], transform: `translateY(${PIN[i]}px)` }}>
          <div style={{ position: "absolute", left: PX[i] - 125, top: 268, width: 250, height: 150, borderRadius: 12, padding: "11px 13px", background: `linear-gradient(180deg,${PAPER} 0%,${CREAM} 100%)`, boxShadow: `0 16px 28px rgba(0,0,0,0.44), ${bevel}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 250, height: 5, background: PCOL[i] }} />
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 32, background: `linear-gradient(180deg,${PCOL[i]} 0%,rgba(26,24,19,0.7) 190%)`, boxShadow: rim, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 800, color: PAPER }}>{PCARD[i][0].slice(0, 1)}</div>
              </div>
              <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, letterSpacing: 1.5, color: CLAY, whiteSpace: "nowrap" }}>{PCARD[i][0]}</div>
            </div>
            <div style={{ marginTop: 8, width: 222, height: 2.5, background: "rgba(26,24,19,0.20)" }} />
            <div style={{ marginTop: 7, fontFamily: mono, fontSize: 15, fontWeight: 700, color: INK, whiteSpace: "nowrap" }}>{PCARD[i][1]}</div>
            {[0, 1].map((k) => (
              <div key={k} style={{ marginTop: 6, width: 222, height: 7, borderRadius: 4, background: "rgba(26,24,19,0.14)", overflow: "hidden" }}>
                <div style={{ width: 222 * PBAR[i][k] * IV(s2, [8 + i * 12 + k * 3, 20 + i * 12 + k * 3], [0, 1]), height: 7, borderRadius: 4, background: `linear-gradient(90deg,rgba(26,24,19,0.45),${PCOL[i]})` }} />
              </div>
            ))}
            <div style={{ position: "absolute", left: 13, top: 122, display: "flex", gap: 7 }}>
              {PTAG[i].map((t, k) => (
                <div key={k} style={{ padding: "3px 9px", borderRadius: 11, background: "rgba(26,24,19,0.10)", fontFamily: mono, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#5F5C55", whiteSpace: "nowrap" }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", left: PX[i] - 3, top: 418, width: 6, height: 30, background: "rgba(236,233,226,0.34)" }} />
          <div style={{ position: "absolute", left: PX[i] - 62, top: 688, width: 124, height: 16, borderRadius: 60, background: "radial-gradient(ellipse,rgba(26,24,19,0.34) 0%,rgba(26,24,19,0) 74%)" }} />
          <Actor x={PX[i]} groundY={704} size={PS[i]} z={20 + i} shadow={1}>
            <Mascot lf={lf} size={PS[i]} {...PCOS[i]} gaze={3} cheer={IV(s2, [bubT[i], bubT[i] + 8], [0.3, 0.9])} nodAmp={4} nodSpeed={0.12} />
          </Actor>
          <div style={{ position: "absolute", left: PX[i] + 54, top: 466, width: 104, height: 52, transform: `scale(${over(lf, CB + bubT[i], 9, Easing.out(Easing.back(2.4)))})`, transformOrigin: "0% 100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 104, height: 44, borderRadius: 22, background: `linear-gradient(180deg,${GOLD} 0%,#A6742F 100%)`, boxShadow: `0 10px 18px rgba(0,0,0,0.4), ${bevel}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 800, letterSpacing: 1, color: INK, whiteSpace: "nowrap" }}>{PCARD[i][2]}</div>
            </div>
            <div style={{ position: "absolute", left: 12, top: 42, width: 16, height: 16, borderRadius: 16, background: "#A6742F" }} />
          </div>
        </div>
      ))}
      {/* reaction sweep */}
      <div style={{ position: "absolute", left: sweepX, top: 244, width: 182, height: 462, zIndex: 46, borderRadius: 12, background: "linear-gradient(90deg,rgba(58,92,132,0.10) 0%,rgba(58,92,132,0.52) 48%,rgba(58,92,132,0.10) 100%)", boxShadow: "26px 0 40px rgba(26,24,19,0.28)" }}>
        <div style={{ position: "absolute", left: 86, top: 0, width: 7, height: 462, background: CREAM }} />
        <div style={{ position: "absolute", left: 66, top: -30, width: 48, height: 26, borderRadius: 5, background: `linear-gradient(180deg,${CREAM},#A29A88)` }} />
        <div style={{ position: "absolute", left: 66, top: 466, width: 48, height: 26, borderRadius: 5, background: `linear-gradient(180deg,#A29A88,${INK})` }} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <div key={k} style={{ position: "absolute", left: 78, top: 34 + k * 74, width: 23, height: 5, borderRadius: 3, background: "rgba(26,24,19,0.40)" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 356, top: 726, width: 300, height: 46, zIndex: 60, borderRadius: 10, background: `linear-gradient(180deg,${TERM} 0%,${TERM2} 100%)`, boxShadow: `0 12px 22px rgba(0,0,0,0.42), inset 0 0 0 1.5px rgba(58,92,132,0.55)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 800, letterSpacing: 2, color: GREEN, whiteSpace: "nowrap" }}>{Math.round(IV(s2, [0, 26], [1, 3]))} OF 3 SIMULATED</div>
      </div>
    </div>
  );
  // ================= SHOT D : the whole day plays out =================
  const sunX = IV(s3, [0, 52], [110, 872]);
  const sunY = 540 - Math.sin(IV(s3, [0, 52], [0, Math.PI])) * 388;
  const dawn = IV(s3, [0, 16], [0.22, 0]);
  const gold = IV(s3, [22, 44], [0, 0.16]);
  const dusk = IV(s3, [44, 58], [0, 0.30]);
  const litD = IV(s3, [42, 56], [0, 1]);
  const sales = Math.round(IV(s3, [0, 50], [0, 148]));
  const salePulse = Math.abs(Math.sin(s3 * 0.42)) * 0.06;
  const thrive = over(lf, CC + 44, 14, Easing.out(Easing.back(2.0)));
  const busX = IV(s3, [0, 30], [-470, 1070]);
  const vanX = IV(s3, [30, 58], [1070, -496]);
  const STARD = [6, 16, 26, 36, 46];
  const CROWD: any[] = [
    { t: -44, s: 158, cos: { glasses: 1, headphones: 1, hoodie: 1 }, dir: 1 },
    { t: -20, s: 222, cos: { girl: 1, tote: 1, scarf: 1 }, dir: 1 },
    { t: 4, s: 168, cos: { constr: 1, cup: 1 }, dir: 1 },
    { t: 22, s: 152, cos: { prof: 1, backpack: 1 }, dir: 1 },
    { t: 38, s: 184, cos: { beard: 1, beanie: 1, scarf: 1 }, dir: 1 },
  ];
  const ShotD = () => (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F7F3EA 0%,#ECE9E2 40%,#E3DCCC 70%,#D8CDB8 100%)" }} />
      <div style={{ position: "absolute", left: sunX - 58, top: sunY - 58, width: 116, height: 116, borderRadius: 116, zIndex: 2, background: `linear-gradient(180deg,${GOLD} 0%,#A6742F 100%)`, boxShadow: "0 14px 24px rgba(26,24,19,0.24)" }} />
      {[{ x: 560, y: 78, w: 220, o: 0.58, s: 2.1 }, { x: 830, y: 140, w: 158, o: 0.44, s: 3.0 }, { x: 300, y: 46, w: 140, o: 0.36, s: 1.5 }, { x: 120, y: 150, w: 176, o: 0.30, s: 2.6 }].map((c, i) => {
        const cxp = mod(c.x - s3 * c.s, 1240) - 120;
        return (
          <div key={i} style={{ position: "absolute", left: cxp, top: c.y, width: c.w, height: c.w * 0.26, borderRadius: 90, background: PAPER, opacity: c.o, zIndex: 3 }}>
            <div style={{ position: "absolute", left: c.w * 0.12, top: -c.w * 0.11, width: c.w * 0.44, height: c.w * 0.3, borderRadius: 90, background: PAPER }} />
            <div style={{ position: "absolute", left: c.w * 0.46, top: -c.w * 0.06, width: c.w * 0.34, height: c.w * 0.24, borderRadius: 90, background: "#EFEBE0" }} />
          </div>
        );
      })}
      <Skyline top={300} op={0.22} drift={s3 * 0.7} tone="#B4B0A4" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} style={{ position: "absolute", left: 24 + i * 116, top: 300 - (78 + seed(i * 5 + 2) * 150), width: 88 + seed(i * 3 + 1) * 60, height: 78 + seed(i * 5 + 2) * 150, borderRadius: "8px 8px 0 0", background: `linear-gradient(180deg,${MUTE} 0%,#6E6A60 100%)`, opacity: 0.32, zIndex: 4, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,rgba(26,24,19,0.22) 0 8px,rgba(0,0,0,0) 8px 26px)" }} />
        </div>
      ))}
      {Ground({ road: 1012, night: dusk * 2 })}
      <div style={{ position: "absolute", left: mod(-360 - s3 * 11, 1740) - 420, top: 560, width: 420, height: 232, zIndex: 12, borderRadius: 120, background: "rgba(26,24,19,0.13)", transform: "skewX(-13deg)" }} />
      {Shopfront({ l: 40, t: 300, w: 236, h: 320, sc: 1, band: AMBER, band2: "#A6742F", label: "BOOK SHOP", labelCol: AMBER, rows: 4, lit: litD, z: 9 })}
      {Shopfront({ l: 756, t: 268, w: 216, h: 352, sc: 1, band: CLAY, band2: "#9E5136", label: "FLORIST", labelCol: GOLD, rows: 3, lit: litD, z: 9 })}
      {Cafe({ rise: 1, awn: 1, signTop: 196, signTxt: 1, menu: 1, front: 1, lit: litD, sway: lf })}
      {Lamp(140, 0)}
      {Lamp(880, 0)}
      <Steam x={716} y={470} ph={12} z={18} />
      {/* traffic streaming past all day */}
      <div style={{ position: "absolute", left: busX, top: 588, width: 430, height: 112, zIndex: 20 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 430, height: 84, borderRadius: "16px 16px 6px 6px", background: `linear-gradient(180deg,${CLAY} 0%,#A9573A 100%)`, boxShadow: `${soft}, ${bevel}` }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: 22 + i * 78, top: 14, width: 56, height: 34, borderRadius: 5, background: `linear-gradient(160deg,${PAPER} 0%,${MUTE} 100%)`, boxShadow: "inset 0 0 0 2.5px rgba(26,24,19,0.22)" }} />
          ))}
          <div style={{ position: "absolute", left: 22, top: 58, width: 200, height: 14, borderRadius: 4, background: "rgba(26,24,19,0.30)" }} />
          <div style={{ position: "absolute", left: 246, top: 56, width: 158, height: 18, borderRadius: 4, background: "rgba(247,243,234,0.26)" }} />
          <div style={{ position: "absolute", left: 402, top: 22, width: 18, height: 12, borderRadius: 3, background: GOLD }} />
        </div>
        {[70, 320].map((wx, i) => (
          <div key={i} style={{ position: "absolute", left: wx, top: 72, width: 40, height: 40, borderRadius: 40, background: INK, boxShadow: bevel }}>
            <div style={{ position: "absolute", left: 13, top: 13, width: 14, height: 14, borderRadius: 14, background: MUTE, transform: `rotate(${lf * 12}deg)` }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: vanX, top: 596, width: 430, height: 104, zIndex: 20 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 430, height: 78, borderRadius: "8px 14px 6px 6px", background: `linear-gradient(180deg,${SLATE} 0%,#2B4463 100%)`, boxShadow: `${soft}, ${bevel}` }}>
          <div style={{ position: "absolute", left: 350, top: 12, width: 60, height: 34, borderRadius: 5, background: `linear-gradient(160deg,${PAPER} 0%,${MUTE} 100%)` }} />
          <div style={{ position: "absolute", left: 26, top: 18, width: 260, height: 42, borderRadius: 4, background: "rgba(236,233,226,0.24)" }} />
          <div style={{ position: "absolute", left: 44, top: 30, width: 90, height: 8, borderRadius: 3, background: "rgba(26,24,19,0.35)" }} />
          <div style={{ position: "absolute", left: 44, top: 42, width: 130, height: 6, borderRadius: 3, background: "rgba(26,24,19,0.22)" }} />
        </div>
        {[58, 320].map((wx, i) => (
          <div key={i} style={{ position: "absolute", left: wx, top: 68, width: 36, height: 36, borderRadius: 36, background: INK, boxShadow: bevel }}>
            <div style={{ position: "absolute", left: 11, top: 11, width: 14, height: 14, borderRadius: 14, background: MUTE, transform: `rotate(${-lf * 13}deg)` }} />
          </div>
        ))}
      </div>
      {/* customers streaming through in fast motion */}
      {CROWD.map((c, i) => {
        const L = s3 - c.t;
        if (L < 0 || L > 52) return null;
        const x = c.dir > 0 ? IV(L, [0, 52], [96, 942]) : IV(L, [0, 52], [942, 96]);
        const op = Math.min(IV(L, [0, 7], [0, 1]), IV(L, [45, 52], [1, 0]));
        const bob = Math.abs(Math.sin(L * 0.44)) * 9;
        return (
          <div key={i} style={{ position: "absolute", inset: 0, zIndex: 34 + i, opacity: op }}>
            <div style={{ transform: `translateY(${-bob}px)` }}>
              <Actor x={x} groundY={764} size={c.s} z={34 + i} shadow={1} flip={c.dir < 0 ? 1 : 0}>
                <Mascot lf={lf} size={c.s} {...c.cos} gaze={3} cheer={0.7} nodAmp={4} nodSpeed={0.2} />
              </Actor>
            </div>
            <div style={{ position: "absolute", left: x + c.s * 0.30, top: 764 - c.s * 0.46 - bob, width: 34, height: 30, transform: `rotate(${Math.sin(L * 0.44) * 6}deg)`, transformOrigin: "50% 0%" }}>
              <div style={{ position: "absolute", left: 0, top: 3, width: 26, height: 22, borderRadius: "4px 4px 9px 9px", background: `linear-gradient(180deg,${PAPER} 0%,#C9C1AE 100%)`, boxShadow: "0 4px 9px rgba(26,24,19,0.3)" }} />
              <div style={{ position: "absolute", left: 0, top: 3, width: 26, height: 7, borderRadius: "4px 4px 0 0", background: CLAY }} />
              <div style={{ position: "absolute", left: 5, top: 12, width: 16, height: 5, borderRadius: 3, background: "rgba(26,24,19,0.18)" }} />
            </div>
          </div>
        );
      })}
      {Tree(100, 1)}
      {Tree(910, 1)}
      {/* foreground occluders */}
      <div style={{ position: "absolute", left: 462, top: 700, width: 34, height: 78, zIndex: 62, borderRadius: "14px 14px 5px 5px", background: `linear-gradient(90deg,#B7AE9B 0%,#5F5C55 100%)`, boxShadow: softer }}>
        <div style={{ position: "absolute", left: 0, top: 24, width: 34, height: 8, background: RED, opacity: 0.8 }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 748, width: 1012, height: 12, zIndex: 61, background: "linear-gradient(180deg,rgba(26,24,19,0.18),rgba(26,24,19,0))" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 66, pointerEvents: "none", background: `rgba(58,92,132,${dawn})` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 66, pointerEvents: "none", background: `rgba(207,149,68,${gold})` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 67, pointerEvents: "none", background: `rgba(58,92,132,${dusk})` }} />
      {/* stat readout */}
      <div style={{ position: "absolute", left: 40, top: 30, width: 306, height: 182, zIndex: 80, borderRadius: 16, padding: "13px 16px", background: `linear-gradient(180deg,${TERM} 0%,${TERM2} 100%)`, boxShadow: "0 18px 36px rgba(26,24,19,0.42), inset 0 0 0 1.5px rgba(58,92,132,0.55)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: mono, fontSize: 14, letterSpacing: 2, color: SLATE }}>SALES</div>
          <div style={{ fontFamily: mono, fontSize: 34, fontWeight: 800, color: GREEN, whiteSpace: "nowrap", transform: `scale(${1 + salePulse})` }}>{"$" + sales}</div>
        </div>
        <div style={{ height: 8, borderRadius: 6, background: "rgba(236,233,226,0.12)", marginTop: 9, overflow: "hidden" }}>
          <div style={{ width: `${IV(sales, [0, 148], [4, 100])}%`, height: 8, borderRadius: 6, background: `linear-gradient(90deg,#2C6E51,${GREEN})` }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: SLATE }}>RATING</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: GOLD }}>{(4.0 + IV(s3, [0, 50], [0, 0.9])).toFixed(1)}</div>
        </div>
        <div style={{ display: "flex", gap: 7, marginTop: 6 }}>
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{ position: "relative", width: 22, height: 22 }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(236,233,226,0.16)", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${GOLD},#A6742F)`, clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", transform: `scale(${over(lf, CC + STARD[k], 9, Easing.out(Easing.back(2.6)))})` }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: SLATE }}>HOUR</div>
            <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 800, color: CREAM }}>{Math.round(IV(s3, [0, 56], [7, 19]))}</div>
          </div>
          <div style={{ padding: "6px 11px", borderRadius: 18, whiteSpace: "nowrap", background: thrive > 0.1 ? `linear-gradient(180deg,${GREEN},#2C6E51)` : "rgba(236,233,226,0.08)", fontFamily: mono, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: thrive > 0.1 ? PAPER : "rgba(236,233,226,0.34)", transform: `scale(${0.94 + thrive * 0.09})` }}>THRIVING</div>
        </div>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: grad(PAPER, CREAM) }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${cam})`, transformOrigin: "50% 50%" }}>
        {SHOT === 0 && <ShotA />}
        {SHOT === 1 && <ShotB />}
        {SHOT === 2 && <ShotC />}
        {SHOT === 3 && <ShotD />}
        <div style={{ position: "absolute", inset: 0, zIndex: 90, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 46%,rgba(0,0,0,0) 50%,rgba(26,24,19,0.26) 100%)" }} />
        {cutD < 5 && (
          <div style={{ position: "absolute", left: cutX, top: -80, width: 300, height: 960, zIndex: 94, transform: "skewX(-12deg)", background: `linear-gradient(90deg,rgba(236,233,226,0) 0%,${CREAM} 34%,${PAPER} 66%,rgba(236,233,226,0) 100%)` }} />
        )}
        {cutD < 5 && (
          <div style={{ position: "absolute", left: cutX - 190, top: -80, width: 120, height: 960, zIndex: 94, transform: "skewX(-12deg)", background: `linear-gradient(90deg,rgba(26,24,19,0) 0%,rgba(26,24,19,0.55) 60%,rgba(26,24,19,0) 100%)` }} />
        )}
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 98 }}><SimScan /></div>
      <SimTag text={tagTxt} x={716} y={26} />
    </AbsoluteFill>
  );
};

const S3Body: React.FC<{lf:number}> = ({lf}) => {
  const IV = (x: number, ins: number[], outs: number[]) => interpolate(x, ins, outs, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const CA = 52, CB = 108, CC = 158;
  const SHOT = lf < CA ? 0 : lf < CB ? 1 : lf < CC ? 2 : 3;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB, s3 = lf - CC;
  const CREAM = "#ECE9E2";
  const PAPER = "#F7F3EA";
  const INK = "#1A1813";
  const SLATE = "#3A5C84";
  const CLAY = "#D2724E";
  const AMBER = "#CF9544";
  const GOLD = "#E7B24C";
  const GREEN = "#3F9E74";
  const MUTE = "#9A968B";
  const RED = "#C44A3A";
  const TERM = "#0E1626";
  const TERM2 = "#0A1120";
  const FF = "Inter, Helvetica, sans-serif";
  const MF = "ui-monospace, Menlo, monospace";
  const panel: React.CSSProperties = {position: "absolute"};
  const GY = 700;
  const BGY = 720;
  const day = 1 + Math.floor(lf / 26);
  const STAR = "50,2 63.0,18.6 83.9,16.1 81.4,37.0 98,50 81.4,63.0 83.9,83.9 63.0,81.4 50,98 37.0,81.4 16.1,83.9 18.6,63.0 2,50 18.6,37.0 16.1,16.1 37.0,18.6";
  const BRICK = "repeating-linear-gradient(180deg, rgba(0,0,0,0.20) 0 1px, rgba(0,0,0,0) 1px 17px), repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 1px, rgba(0,0,0,0) 1px 38px)";
  const PLASTER = "radial-gradient(120px 70px at 22% 18%, rgba(247,243,234,0.07), rgba(0,0,0,0) 70%), radial-gradient(160px 90px at 76% 62%, rgba(0,0,0,0.16), rgba(0,0,0,0) 72%)";
  const WOOD = "repeating-linear-gradient(90deg, rgba(0,0,0,0.13) 0 1px, rgba(0,0,0,0) 1px 12px)";
  const VEH = [
    {body: "#3A5C84", roof: "#5D7FA9", trim: GOLD},
    {body: "#7E4A33", roof: "#A96C48", trim: CREAM},
    {body: "#454F62", roof: "#69748B", trim: AMBER},
  ];
  const NW = 540, NH = 88, ND = 1012 + NW + 90;
  const nearV = [0, 1].map((i) => {
    const raw = lf + 11 + i * 30;
    const ph = (raw % 60) / 60;
    const cyc = Math.floor(raw / 60);
    return {x: 1012 + 45 - ph * ND, k: (cyc * 2 + i) % 3};
  });
  const Vehicle = ({vx, vy, w, h, k, rev, haze}: {vx: number; vy: number; w: number; h: number; k: number; rev: number; haze: number}) => {
    const c = VEH[k % 3];
    const bob = Math.sin((vx + lf * 3) * 0.02) * 1.6;
    return (
      <div style={{...panel, left: vx, top: vy + bob, width: w, height: h}}>
        <div style={{...panel, left: w * 0.14, top: h * 0.74, width: w * 0.155, height: h * 0.40, borderRadius: "50%", background: "linear-gradient(180deg,#1B2331,#080C13)"}}/>
        <div style={{...panel, left: w * 0.70, top: h * 0.74, width: w * 0.155, height: h * 0.40, borderRadius: "50%", background: "linear-gradient(180deg,#1B2331,#080C13)"}}/>
        <div style={{...panel, left: w * 0.175, top: h * 0.86, width: w * 0.09, height: h * 0.16, borderRadius: "50%", background: "linear-gradient(180deg,#57627A,#2B3242)", transform: `rotate(${(vx * 1.4) % 360}deg)`}}/>
        <div style={{...panel, left: w * 0.735, top: h * 0.86, width: w * 0.09, height: h * 0.16, borderRadius: "50%", background: "linear-gradient(180deg,#57627A,#2B3242)", transform: `rotate(${(vx * 1.4) % 360}deg)`}}/>
        <div style={{...panel, left: 0, top: 0, width: w, height: h * 0.93, borderRadius: "24px 24px 12px 12px", background: `linear-gradient(180deg, ${c.roof} 0%, ${c.body} 46%, #131C2A 100%)`, boxShadow: "0 -10px 24px rgba(0,0,0,0.45), inset 0 3px 0 rgba(236,233,226,0.20)"}}/>
        <div style={{...panel, left: w * 0.04, top: h * 0.055, width: w * 0.92, height: 3, borderRadius: 2, background: "rgba(247,243,234,0.26)"}}/>
        {[0, 1, 2, 3].map((i) => (
          <div key={"vw" + i} style={{...panel, left: w * (0.095 + i * 0.205), top: h * 0.15, width: w * 0.145, height: h * 0.33, borderRadius: 6, background: "linear-gradient(180deg,#A6B8CC,#4C5F7C)", border: "2px solid rgba(17,25,38,0.65)", overflow: "hidden"}}>
            <div style={{...panel, left: -10, top: 4, width: w * 0.10, height: h * 0.30, transform: "rotate(24deg)", background: "rgba(247,243,234,0.30)"}}/>
          </div>
        ))}
        {[0, 1, 2].map((i) => (
          <div key={"vp" + i} style={{...panel, left: w * (0.20 + i * 0.205), top: h * 0.145, width: 3, height: h * 0.34, background: "rgba(17,25,38,0.55)"}}/>
        ))}
        <div style={{...panel, left: w * 0.05, top: h * 0.60, width: w * 0.90, height: h * 0.095, borderRadius: 4, background: c.trim}}/>
        <div style={{...panel, left: w * 0.09, top: h * 0.615, width: w * 0.82, height: 2, background: "rgba(0,0,0,0.28)"}}/>
        <div style={{...panel, left: rev ? w * 0.905 : w * 0.02, top: h * 0.44, width: w * 0.075, height: h * 0.13, borderRadius: 5, background: `linear-gradient(180deg,${GOLD},${AMBER})`}}/>
        <div style={{...panel, left: w * 0.44, top: h * 0.72, width: w * 0.12, height: h * 0.10, borderRadius: 3, background: "linear-gradient(180deg,#2A3346,#141B27)", border: "1px solid rgba(236,233,226,0.18)"}}/>
        <div style={{...panel, left: 0, top: h * 0.90, width: w, height: h * 0.16, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55), rgba(0,0,0,0))"}}/>
        {haze > 0 ? <div style={{...panel, left: 0, top: 0, width: w, height: h * 1.14, background: `rgba(12,20,34,${haze})`, borderRadius: 18}}/> : null}
      </div>
    );
  };
  const Leaf = ({lx, ly, ls, lr, lc}: {lx: number; ly: number; ls: number; lr: number; lc: string}) => (
    <div style={{...panel, left: lx, top: ly, width: ls, height: ls * 0.62, borderRadius: "60% 10% 60% 10%", background: `linear-gradient(140deg, ${lc}, rgba(0,0,0,0.55))`, transform: `rotate(${lr}deg)`, boxShadow: "0 2px 4px rgba(0,0,0,0.35)"}}>
      <div style={{...panel, left: "12%", top: "44%", width: "76%", height: 1.5, background: "rgba(0,0,0,0.35)"}}/>
    </div>
  );
  const Gremlin = ({gx, gy, s, wig, laugh, armA, armB}: {gx: number; gy: number; s: number; wig: number; laugh: number; armA: number; armB: number}) => (
    <div style={{...panel, left: gx - s / 2, top: gy - s, width: s, height: s}}>
      <div style={{...panel, left: s * 0.10, top: s * 0.92, width: s * 0.80, height: s * 0.14, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.62), rgba(0,0,0,0))"}}/>
      <div style={{...panel, left: 0, top: 0, width: s, height: s, transform: `translateY(${wig}px) rotate(${wig * 0.5 + laugh * Math.sin(lf * 0.9) * 6}deg)`, transformOrigin: "50% 92%"}}>
        <div style={{...panel, left: s * 0.02, top: s * 0.10, width: s * 0.24, height: s * 0.30, background: "linear-gradient(150deg,#6B4F86,#2A2033)", borderRadius: "60% 10% 40% 20%", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", transform: `rotate(${Math.sin(lf * 0.7) * 4}deg)`, transformOrigin: "80% 90%"}}/>
        <div style={{...panel, left: s * 0.74, top: s * 0.10, width: s * 0.24, height: s * 0.30, background: "linear-gradient(210deg,#6B4F86,#2A2033)", borderRadius: "10% 60% 20% 40%", boxShadow: "0 3px 8px rgba(0,0,0,0.5)", transform: `rotate(${-Math.sin(lf * 0.7 + 0.6) * 4}deg)`, transformOrigin: "20% 90%"}}/>
        <div style={{...panel, left: s * 0.10, top: s * 0.52, width: s * 0.80, height: s * 0.44, background: "linear-gradient(160deg,#7A5C97 0%,#4A3760 55%,#241B33 100%)", borderRadius: "42% 42% 34% 34%", boxShadow: "inset 0 -8px 14px rgba(0,0,0,0.42), 0 6px 14px rgba(0,0,0,0.5)"}}/>
        <div style={{...panel, left: s * 0.26, top: s * 0.70, width: s * 0.48, height: s * 0.20, borderRadius: "50% 50% 40% 40%", background: "linear-gradient(180deg,rgba(236,233,226,0.16),rgba(0,0,0,0.10))"}}/>
        <div style={{...panel, left: s * 0.14, top: s * 0.22, width: s * 0.72, height: s * 0.50, background: "linear-gradient(155deg,#8A68AA 0%,#503C6B 60%,#281E39 100%)", borderRadius: "48% 48% 40% 40%", boxShadow: "inset 0 -6px 12px rgba(0,0,0,0.38), 0 5px 12px rgba(0,0,0,0.5)"}}/>
        <div style={{...panel, left: s * 0.16, top: s * 0.26, width: s * 0.34, height: s * 0.11, background: "linear-gradient(90deg,rgba(236,233,226,0.22),rgba(236,233,226,0))", borderRadius: 20}}/>
        <div style={{...panel, left: s * 0.24, top: s * 0.40, width: s * 0.16, height: s * 0.125, borderRadius: "50%", background: AMBER, border: "2px solid #241B33"}}/>
        <div style={{...panel, left: s * 0.59, top: s * 0.40, width: s * 0.16, height: s * 0.125, borderRadius: "50%", background: AMBER, border: "2px solid #241B33"}}/>
        <div style={{...panel, left: s * 0.28, top: s * 0.435, width: s * 0.06, height: s * 0.06, borderRadius: "50%", background: "#241B33"}}/>
        <div style={{...panel, left: s * 0.63, top: s * 0.435, width: s * 0.06, height: s * 0.06, borderRadius: "50%", background: "#241B33"}}/>
        <div style={{...panel, left: s * 0.20, top: s * 0.345, width: s * 0.22, height: s * 0.045, borderRadius: 4, background: "#2A2033", transform: "rotate(11deg)"}}/>
        <div style={{...panel, left: s * 0.57, top: s * 0.345, width: s * 0.22, height: s * 0.045, borderRadius: 4, background: "#2A2033", transform: "rotate(-11deg)"}}/>
        <svg width={s} height={s} viewBox="0 0 100 100" style={{...panel, left: 0, top: 0}}>
          <polyline points="30,62 38,68 46,61 54,68 62,61 70,67" fill="none" stroke="#1B1425" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{...panel, left: s * 0.78, top: s * 0.62, width: s * 0.34, height: s * 0.11, background: "linear-gradient(90deg,#6B4F86,#2A2033)", borderRadius: 20, transform: `rotate(${armA + Math.sin(lf * 0.5) * 6}deg)`, transformOrigin: "0% 50%", boxShadow: "0 4px 10px rgba(0,0,0,0.5)"}}/>
        <div style={{...panel, left: -s * 0.14, top: s * 0.62, width: s * 0.30, height: s * 0.11, background: "linear-gradient(270deg,#6B4F86,#2A2033)", borderRadius: 20, transform: `rotate(${armB + Math.sin(lf * 0.44 + 1) * 5}deg)`, transformOrigin: "100% 50%", boxShadow: "0 4px 10px rgba(0,0,0,0.5)"}}/>
      </div>
    </div>
  );
  const CutWipe = ({t}: {t: number}) => {
    if (t < 0 || t > 6) return null;
    const p = IV(t, [0, 6], [0, 1]);
    const wx = -330 + p * 1440;
    return (
      <div style={{...panel, left: 0, top: 0, width: 1012, height: 792, overflow: "hidden"}}>
        <div style={{...panel, left: wx, top: 0, width: 216, height: 792, background: "linear-gradient(90deg, rgba(236,233,226,0) 0%, rgba(236,233,226,0.46) 52%, rgba(236,233,226,0.04) 100%)", opacity: 1 - p * 0.3}}/>
        <div style={{...panel, left: wx - 200, top: 0, width: 200, height: 792, background: `rgba(10,17,32,${0.66 * (1 - p)})`}}/>
        <div style={{...panel, left: wx + 216, top: 0, width: 30, height: 792, background: `rgba(207,149,68,${0.30 * (1 - p)})`}}/>
      </div>
    );
  };
  const clouds = [
    {x: ((lf * 0.16 + 40) % 1240) - 190, y: 52, w: 210, h: 44, o: 0.16},
    {x: ((lf * 0.10 + 640) % 1300) - 200, y: 108, w: 268, h: 50, o: 0.13},
    {x: ((lf * 0.22 + 300) % 1320) - 210, y: 150, w: 172, h: 36, o: 0.10},
  ];
  const birds = [
    {x: 236 + Math.sin(lf * 0.05) * 30, y: 126 + Math.sin(lf * 0.11) * 6, s: 20},
    {x: 296 + Math.sin(lf * 0.05 + 0.8) * 30, y: 142 + Math.sin(lf * 0.11 + 1) * 6, s: 15},
    {x: 626 + Math.sin(lf * 0.04 + 2) * 26, y: 118 + Math.sin(lf * 0.09) * 5, s: 17},
  ];
  const farHills = [
    {x: -40, w: 340, h: 92}, {x: 250, w: 420, h: 118}, {x: 610, w: 330, h: 82}, {x: 860, w: 260, h: 106},
  ];
  const skyline = [
    {x: 8, w: 118, h: 132}, {x: 146, w: 84, h: 178}, {x: 246, w: 132, h: 108},
    {x: 396, w: 96, h: 162}, {x: 508, w: 116, h: 122}, {x: 640, w: 88, h: 186},
    {x: 744, w: 138, h: 132}, {x: 898, w: 84, h: 166},
  ];
  const leaves = new Array(7).fill(0).map((_, i) => {
    const sd = seed(i * 5 + 2);
    const sd2 = seed(i * 11 + 7);
    const t = ((lf * (0.9 + sd * 0.9) + sd2 * 240) % 240) / 240;
    return {
      x: 60 + sd * 840 + Math.sin(t * 7 + sd2 * 6) * 54,
      y: 150 + t * 545,
      r: t * 430 + sd2 * 360,
      s: 10 + sd2 * 8,
      c: [CLAY, AMBER, MUTE, "#8B5E3C"][i % 4],
    };
  });
  const motes = new Array(14).fill(0).map((_, i) => {
    const sd = seed(i * 7 + 3);
    const sd2 = seed(i * 13 + 11);
    const life = (lf * (0.55 + sd * 0.85) + sd2 * 300) % 300;
    return {x: 50 + sd * 880, y: 770 - (life / 300) * 640, s: 2 + sd2 * 3.2, o: 0.14 + 0.30 * Math.abs(Math.sin(life * 0.03))};
  });
  const SkyRoad = ({cold}: {cold: number}) => (
    <div style={{...panel, left: 0, top: 0, width: 1012, height: 792}}>
      <div style={{...panel, inset: 0, background: `linear-gradient(180deg, ${TERM2} 0%, ${TERM} 26%, #24344F 54%, ${cold > 0.45 ? "#2B3E5C" : "#5A4436"} 76%, ${INK} 100%)`}}/>
      <div style={{...panel, left: 560, top: 40, width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(160deg, ${PAPER}, #C9C4B6)`, opacity: 0.55 + 0.32 * cold}}>
        <div style={{...panel, left: 16, top: 20, width: 16, height: 12, borderRadius: "50%", background: "rgba(26,24,19,0.10)"}}/>
        <div style={{...panel, left: 40, top: 42, width: 12, height: 9, borderRadius: "50%", background: "rgba(26,24,19,0.08)"}}/>
      </div>
      {clouds.map((c, i) => (
        <div key={"cl" + i} style={{...panel, left: c.x, top: c.y, width: c.w, height: c.h, borderRadius: "50%", background: `rgba(154,150,139,${c.o})`}}>
          <div style={{...panel, left: c.w * 0.22, top: -c.h * 0.34, width: c.w * 0.5, height: c.h * 0.9, borderRadius: "50%", background: `rgba(154,150,139,${c.o * 0.8})`}}/>
        </div>
      ))}
      <div style={{...panel, left: 0, top: 176, width: 1012, height: 130, opacity: 0.34}}>
        {farHills.map((h, i) => (
          <div key={"fh" + i} style={{...panel, left: h.x - ((lf * 0.06) % 20), top: 130 - h.h, width: h.w, height: h.h, borderRadius: "48% 52% 0 0 / 70% 70% 0 0", background: "linear-gradient(180deg,#3B4E6C,#26344B)"}}/>
        ))}
      </div>
      <div style={{...panel, left: 0, top: 250, width: 1012, height: 64, background: "linear-gradient(180deg, rgba(90,110,140,0.20), rgba(90,110,140,0))"}}/>
      <div style={{...panel, left: 0, top: 158, width: 1012, height: 200, opacity: 0.62}}>
        {skyline.map((b, i) => (
          <div key={"sk" + i} style={{...panel, left: b.x - ((lf * 0.14) % 24), top: 200 - b.h, width: b.w, height: b.h, background: `linear-gradient(180deg,#2A3A52,#141C2C), ${BRICK}`, borderRadius: "6px 6px 0 0", boxShadow: "inset 0 2px 0 rgba(236,233,226,0.10)"}}>
            <div style={{...panel, left: -4, top: -7, width: b.w + 8, height: 7, borderRadius: 2, background: "linear-gradient(180deg,#3B4E6C,#1E2838)"}}/>
            {seed(i * 3 + 1) > 0.5 ? <div style={{...panel, left: b.w * 0.62, top: -26, width: 16, height: 20, borderRadius: "2px 2px 0 0", background: "#22303F"}}/> : null}
            {seed(i * 3 + 2) > 0.6 ? <div style={{...panel, left: b.w * 0.28, top: -34, width: 2, height: 30, background: "rgba(154,150,139,0.5)"}}/> : null}
            {new Array(6).fill(0).map((_, k) => (
              <div key={k} style={{...panel, left: 10 + (k % 3) * 26, top: 18 + Math.floor(k / 3) * 34, width: 12, height: 16, background: seed(i * 9 + k) > 0.55 ? `rgba(207,149,68,${0.44 * (1 - cold) + 0.10})` : "rgba(58,92,132,0.30)", borderRadius: 2, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)"}}/>
            ))}
            <div style={{...panel, left: 6, top: 52, width: b.w - 12, height: 2, background: "rgba(236,233,226,0.07)"}}/>
          </div>
        ))}
      </div>
      <svg width={1012} height={200} viewBox="0 0 1012 200" style={{...panel, left: 0, top: 92, opacity: 0.5}}>
        <path d="M-10 40 Q 250 96 506 44 Q 760 96 1022 40" fill="none" stroke="rgba(154,150,139,0.55)" strokeWidth={2.5}/>
        <path d="M-10 78 Q 250 132 506 82 Q 760 132 1022 78" fill="none" stroke="rgba(154,150,139,0.32)" strokeWidth={2}/>
      </svg>
      {birds.map((b, i) => (
        <svg key={"bd" + i} width={b.s} height={b.s * 0.5} viewBox="0 0 40 20" style={{...panel, left: b.x, top: b.y, opacity: 0.55 - 0.3 * cold}}>
          <path d="M2 14 Q 10 2 20 12 Q 30 2 38 14" fill="none" stroke="rgba(236,233,226,0.75)" strokeWidth={3} strokeLinecap="round"/>
        </svg>
      ))}
      <div style={{...panel, left: 0, top: GY, width: 1012, height: 56, background: `linear-gradient(180deg,#3E4A5C 0%,#2B3444 60%,#1D2430 100%), ${WOOD}`, boxShadow: "inset 0 6px 16px rgba(0,0,0,0.45)"}}/>
      <div style={{...panel, left: 0, top: GY - 4, width: 1012, height: 4, background: `linear-gradient(90deg, rgba(207,149,68,${0.55 * (1 - cold) + 0.12}) 0%, rgba(154,150,139,0.35) 52%, rgba(58,92,132,0.62) 100%)`}}/>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div key={"pv" + i} style={{...panel, left: 60 + i * 146, top: GY + 4, width: 2, height: 48, background: "rgba(0,0,0,0.32)"}}/>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"pj" + i} style={{...panel, left: 132 + i * 146, top: GY + 26, width: 100, height: 2, background: "rgba(0,0,0,0.20)"}}/>
      ))}
      <div style={{...panel, left: 0, top: GY + 56, width: 1012, height: 10, background: "linear-gradient(180deg,#4C5768,#1A2029)"}}/>
      <div style={{...panel, left: 0, top: GY + 66, width: 1012, height: 26, background: `linear-gradient(180deg,#1A212C 0%,${INK} 100%)`}}/>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"cb" + i} style={{...panel, left: 46 + i * 168, top: GY + 70, width: 130, height: 3, borderRadius: 2, background: "rgba(236,233,226,0.07)"}}/>
      ))}
      <div style={{...panel, left: 0, top: GY + 40, width: 1012, height: 16, background: "linear-gradient(180deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.35) 100%)"}}/>
    </div>
  );
  const Cafe = ({warm, sagv, lk, signRot}: {warm: number; sagv: number; lk: (i: number) => number; signRot: number}) => (
    <div style={{...panel, left: 62, top: 228, width: 376, height: 472}}>
      <div style={{...panel, left: 0, top: 30, width: 376, height: 442, background: `linear-gradient(170deg,#6B4531 0%,#4A2E22 58%,#2A1A14 100%), ${BRICK}`, borderRadius: "14px 14px 0 0", boxShadow: "0 20px 44px rgba(0,0,0,0.55), inset 0 2px 0 rgba(236,233,226,0.14)"}}/>
      <div style={{...panel, left: 0, top: 30, width: 376, height: 442, background: PLASTER, borderRadius: "14px 14px 0 0"}}/>
      <div style={{...panel, left: 0, top: 16, width: 376, height: 24, background: `linear-gradient(180deg,${CLAY},#7A3F27)`, borderRadius: 8, boxShadow: "0 6px 14px rgba(0,0,0,0.45)"}}/>
      <div style={{...panel, left: 6, top: 38, width: 364, height: 6, background: "linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0))"}}/>
      <div style={{...panel, left: 34, top: 42, width: 308, height: 58, transform: `rotate(${signRot}deg)`, transformOrigin: "0% 50%", borderRadius: 10, background: `linear-gradient(180deg, rgba(210,114,78,${0.34 * warm * lk(2) + 0.1}), rgba(52,32,22,0.94))`, border: `2px solid rgba(236,233,226,${0.26 + 0.22 * warm})`, boxShadow: "0 6px 14px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{fontFamily: FF, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: CREAM, opacity: 0.6 + 0.4 * warm, whiteSpace: "nowrap"}}>CORNER CAFE</div>
      </div>
      <div style={{...panel, left: 0, top: 112, width: 376, height: 42, transform: `rotate(${sagv}deg) scaleY(${1 + sagv * 0.03})`, transformOrigin: "0% 0%", borderRadius: "6px 6px 14px 14px", background: `repeating-linear-gradient(90deg, ${warm < 0.5 ? "#6A5348" : CLAY} 0 34px, ${warm < 0.5 ? "#B8B2A5" : PAPER} 34px 68px)`, boxShadow: "0 10px 18px rgba(0,0,0,0.42)"}}>
        <div style={{...panel, left: 0, top: 0, width: 376, height: 8, background: "linear-gradient(180deg,rgba(247,243,234,0.30),rgba(247,243,234,0))"}}/>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={"sc" + i} style={{...panel, left: i * 34 + 2, top: 38, width: 30, height: 14, borderRadius: "0 0 16px 16px", background: i % 2 === 0 ? (warm < 0.5 ? "#6A5348" : CLAY) : (warm < 0.5 ? "#B8B2A5" : PAPER), transform: `translateY(${Math.sin(lf * 0.16 + i * 0.5) * 1.6}px)`}}/>
        ))}
      </div>
      <div style={{...panel, left: 0, top: 156, width: 376, height: 14, background: "linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0))"}}/>
      <div style={{...panel, left: 30, top: 196, width: 158, height: 176, borderRadius: 10, background: `linear-gradient(180deg, rgba(231,178,76,${0.26 * warm * lk(0) + 0.04}), rgba(34,22,16,0.94))`, border: "2px solid rgba(236,233,226,0.22)", overflow: "hidden"}}>
        <div style={{...panel, left: 10, top: 12, width: 58, height: 34, borderRadius: 6, background: `rgba(231,178,76,${0.22 * warm * lk(0) + 0.03})`}}/>
        <div style={{...panel, left: 18, top: 92, width: 122, height: 66, borderRadius: 8, background: `rgba(210,114,78,${0.16 * warm * lk(1) + 0.03})`}}/>
        <div style={{...panel, left: 76, top: 0, width: 3, height: 176, background: "rgba(236,233,226,0.20)"}}/>
        <div style={{...panel, left: 0, top: 86, width: 158, height: 3, background: "rgba(236,233,226,0.16)"}}/>
        <div style={{...panel, left: 8, top: 60, width: 46, height: 18, borderRadius: 3, background: `rgba(247,243,234,${0.14 + 0.16 * warm})`, transform: "rotate(-4deg)"}}/>
        <div style={{...panel, left: 96, top: 122, width: 40, height: 26, borderRadius: 4, background: `rgba(210,114,78,${0.30 * warm + 0.06})`}}/>
      </div>
      <div style={{...panel, left: 26, top: 372, width: 166, height: 8, borderRadius: 3, background: "linear-gradient(180deg,#8A5A3C,#3B2417)"}}/>
      <div style={{...panel, left: 224, top: 288, width: 124, height: 184, borderRadius: "8px 8px 0 0", background: `linear-gradient(180deg,#7A4E33,#332016), ${WOOD}`, border: "2px solid rgba(236,233,226,0.20)", boxShadow: "inset 0 3px 0 rgba(236,233,226,0.10)"}}>
        <div style={{...panel, left: 14, top: 16, width: 92, height: 88, borderRadius: 6, background: `rgba(231,178,76,${0.16 * warm * lk(1) + 0.03})`, border: "1px solid rgba(236,233,226,0.16)"}}/>
        <div style={{...panel, left: 58, top: 16, width: 2, height: 88, background: "rgba(236,233,226,0.20)"}}/>
        <div style={{...panel, left: 96, top: 126, width: 12, height: 12, borderRadius: "50%", background: "rgba(236,233,226,0.62)"}}/>
        <div style={{...panel, left: 92, top: 122, width: 20, height: 20, borderRadius: "50%", border: "1px solid rgba(236,233,226,0.22)"}}/>
        <div style={{...panel, left: 22, top: 122, width: 44, height: 7, borderRadius: 3, background: "linear-gradient(180deg,#B9B2A3,#5B5348)"}}/>
        <div style={{...panel, left: 8, top: 160, width: 104, height: 12, background: "linear-gradient(180deg,#8A5A3C,#2C1B11)"}}/>
        <div style={{...panel, left: 24, top: 112, width: 26, height: 5, background: "rgba(236,233,226,0.14)"}}/>
      </div>
      <div style={{...panel, left: 216, top: 466, width: 140, height: 10, borderRadius: 3, background: "linear-gradient(180deg,#9A9184,#4A423A)", boxShadow: "0 5px 10px rgba(0,0,0,0.45)"}}/>
      <div style={{...panel, left: 236, top: 452, width: 100, height: 14, borderRadius: 3, background: "repeating-linear-gradient(90deg,#5A4436 0 7px,#3E2E24 7px 14px)"}}/>
      <div style={{...panel, left: 280, top: 186, width: 3, height: 40, background: "rgba(236,233,226,0.24)"}}/>
      <div style={{...panel, left: 262, top: 184, width: 40, height: 3, borderRadius: 2, background: "rgba(236,233,226,0.28)"}}/>
      <div style={{...panel, left: 272, top: 224, width: 20, height: 22, borderRadius: "50% 50% 44% 44%", background: `linear-gradient(180deg, rgba(231,178,76,${0.32 + 0.6 * warm * lk(3)}), rgba(60,40,20,0.9))`, border: "1px solid rgba(26,24,19,0.5)", transform: `rotate(${Math.sin(lf * 0.11) * 5}deg)`, transformOrigin: "50% -80%"}}/>
      <div style={{...panel, left: 356, top: 170, width: 9, height: 302, borderRadius: 4, background: "linear-gradient(90deg,#8E8578,#3C362D)", boxShadow: "-3px 0 7px rgba(0,0,0,0.4)"}}/>
      {[0, 1, 2].map((i) => (
        <div key={"dpb" + i} style={{...panel, left: 352, top: 214 + i * 92, width: 17, height: 8, borderRadius: 3, background: "linear-gradient(180deg,#A79E90,#4A433A)"}}/>
      ))}
      <div style={{...panel, left: 8, top: 402, width: 74, height: 70, borderRadius: "4px 4px 8px 8px", background: "linear-gradient(180deg,#8A5A3C,#3B2417)", border: "2px solid rgba(236,233,226,0.16)", boxShadow: "0 8px 14px rgba(0,0,0,0.45)"}}>
        <div style={{...panel, left: 6, top: 8, width: 62, height: 3, background: "rgba(236,233,226,0.18)"}}/>
        <div style={{...panel, left: 6, top: 22, width: 48, height: 3, background: "rgba(236,233,226,0.14)"}}/>
        <div style={{...panel, left: 6, top: 36, width: 56, height: 3, background: "rgba(236,233,226,0.12)"}}/>
      </div>
      <div style={{...panel, left: 96, top: 424, width: 62, height: 48, borderRadius: "6px 6px 4px 4px", background: "linear-gradient(180deg,#5A4436,#2C2118)", boxShadow: "0 8px 14px rgba(0,0,0,0.45)"}}>
        <div style={{...panel, left: 6, top: -12, width: 50, height: 20, borderRadius: "50% 50% 20% 20%", background: `linear-gradient(180deg,${GREEN},#265C45)`, transform: `rotate(${Math.sin(lf * 0.13) * 3}deg)`, transformOrigin: "50% 100%"}}/>
        <div style={{...panel, left: 0, top: 10, width: 62, height: 3, background: "rgba(236,233,226,0.14)"}}/>
      </div>
    </div>
  );
  const Rival = ({dx, signY, awnW, tfade, badgeS, lo, winK}: {dx: number; signY: number; awnW: number; tfade: number; badgeS: number; lo: number[]; winK: number[]}) => (
    <div style={{...panel, left: 586, top: 0, width: 384, height: 792, transform: `translateX(${dx}px)`}}>
      <div style={{...panel, left: 0, top: 300, width: 384, height: 400, background: `linear-gradient(170deg,${SLATE} 0%,#2C4767 58%,#1B2C43 100%), ${BRICK}`, borderRadius: "14px 14px 0 0", boxShadow: "0 18px 40px rgba(0,0,0,0.55), inset 0 2px 0 rgba(236,233,226,0.16)"}}/>
      <div style={{...panel, left: 0, top: 300, width: 384, height: 400, background: PLASTER, borderRadius: "14px 14px 0 0"}}/>
      <div style={{...panel, left: 0, top: 282, width: awnW, height: 26, background: "linear-gradient(180deg,#4C6F98,#263D58)", borderRadius: 8, boxShadow: "0 6px 14px rgba(0,0,0,0.45)", overflow: "hidden"}}>
        <div style={{...panel, left: 0, top: 0, width: awnW, height: 5, background: "rgba(247,243,234,0.24)"}}/>
      </div>
      <div style={{...panel, left: 0, top: 308, width: awnW, height: 10, background: "linear-gradient(180deg, rgba(0,0,0,0.40), rgba(0,0,0,0))"}}/>
      <div style={{...panel, left: 8, top: 322, width: 168, height: 60, transform: `translateY(${signY}px)`, borderRadius: 10, background: "linear-gradient(180deg,#2C4767,#122033)", border: "2px solid rgba(236,233,226,0.42)", boxShadow: "0 6px 14px rgba(0,0,0,0.42)", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{fontFamily: FF, fontWeight: 900, fontSize: 24, letterSpacing: 1, color: CREAM, opacity: tfade, whiteSpace: "nowrap"}}>MEGA BREW</div>
      </div>
      <div style={{...panel, left: 8, top: 396, width: 190, height: 148, borderRadius: 10, background: "linear-gradient(180deg,#16273C,#0C1726)", border: "2px solid rgba(236,233,226,0.24)", boxShadow: "0 8px 18px rgba(0,0,0,0.45)"}}>
        {["ESPRESSO  $2.25", "FREE REFILLS", "OPEN 24 HOURS"].map((t, i) => (
          <div key={"bl" + i} style={{...panel, left: 12, top: 16 + i * 42, opacity: lo[i] * tfade, fontFamily: MF, fontWeight: 700, fontSize: 17, letterSpacing: 0.5, color: i === 0 ? GOLD : CREAM, whiteSpace: "nowrap"}}>{t}</div>
        ))}
        <div style={{...panel, left: 12, top: 128, width: 12 + 154 * lo[2], height: 6, borderRadius: 3, background: `linear-gradient(90deg,${SLATE},${GOLD})`}}/>
        <div style={{...panel, left: 0, top: 8, width: 5, height: 132, background: "rgba(236,233,226,0.12)"}}/>
      </div>
      <div style={{...panel, left: 196, top: 302, width: 186, height: 186, transform: `rotate(${Math.sin(lf * 0.18) * 4}deg) scale(${badgeS})`, transformOrigin: "50% 50%"}}>
        <svg width={186} height={186} viewBox="0 0 100 100" style={{...panel, left: 0, top: 0}}>
          <polygon points={STAR} fill="url(#s3badge)" stroke="#B8813A" strokeWidth={1.6}/>
          <polygon points={STAR} fill="none" stroke="rgba(247,243,234,0.34)" strokeWidth={0.7} transform="translate(50,50) scale(0.86) translate(-50,-50)"/>
          <defs>
            <linearGradient id="s3badge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD}/>
              <stop offset="100%" stopColor={AMBER}/>
            </linearGradient>
          </defs>
        </svg>
        <div style={{...panel, inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, opacity: tfade}}>
          <div style={{fontFamily: FF, fontWeight: 900, fontSize: 32, lineHeight: "34px", color: INK, whiteSpace: "nowrap"}}>50%</div>
          <div style={{fontFamily: FF, fontWeight: 900, fontSize: 26, lineHeight: "28px", letterSpacing: 2, color: INK, whiteSpace: "nowrap"}}>OFF</div>
        </div>
      </div>
      <div style={{...panel, left: 8, top: 560, width: 100, height: 110, borderRadius: 8, background: `linear-gradient(180deg, rgba(231,178,76,${0.30 * winK[0] + 0.05}), rgba(27,44,67,0.9))`, border: "2px solid rgba(236,233,226,0.26)", overflow: "hidden"}}>
        <div style={{...panel, left: 48, top: 0, width: 2, height: 110, background: "rgba(236,233,226,0.20)"}}/>
        <div style={{...panel, left: 0, top: 52, width: 100, height: 2, background: "rgba(236,233,226,0.16)"}}/>
        <div style={{...panel, left: 12, top: 66, width: 34, height: 30, borderRadius: "4px 4px 10px 10px", background: `rgba(247,243,234,${0.20 + 0.24 * winK[0]})`}}/>
        <div style={{...panel, left: 58, top: 72, width: 28, height: 24, borderRadius: 4, background: `rgba(210,114,78,${0.26 + 0.24 * winK[0]})`}}/>
      </div>
      <div style={{...panel, left: 122, top: 560, width: 110, height: 110, borderRadius: 8, background: `linear-gradient(180deg, rgba(231,178,76,${0.30 * winK[1] + 0.05}), rgba(27,44,67,0.9))`, border: "2px solid rgba(236,233,226,0.26)", overflow: "hidden"}}>
        <div style={{...panel, left: 54, top: 0, width: 2, height: 110, background: "rgba(236,233,226,0.20)"}}/>
        <div style={{...panel, left: 8, top: 14, width: 44, height: 16, borderRadius: 3, background: `rgba(247,243,234,${0.22 + 0.20 * winK[1]})`, transform: "rotate(-5deg)"}}/>
        <div style={{...panel, left: 62, top: 62, width: 36, height: 34, borderRadius: "50%", background: `rgba(207,149,68,${0.26 + 0.22 * winK[1]})`}}/>
      </div>
      <div style={{...panel, left: 250, top: 540, width: 110, height: 160, borderRadius: "8px 8px 0 0", background: `linear-gradient(180deg, rgba(231,178,76,${0.22 * winK[2] + 0.04}), rgba(12,23,38,0.96))`, border: "2px solid rgba(236,233,226,0.30)"}}>
        <div style={{...panel, left: 52, top: 6, width: 2, height: 100, background: "rgba(236,233,226,0.22)"}}/>
        <div style={{...panel, left: 12, top: 108, width: 86, height: 3, background: "rgba(236,233,226,0.18)"}}/>
        <div style={{...panel, left: 84, top: 96, width: 12, height: 12, borderRadius: "50%", background: "rgba(236,233,226,0.55)"}}/>
        <div style={{...panel, left: 24, top: 124, width: 62, height: 8, borderRadius: 3, background: "rgba(236,233,226,0.16)"}}/>
      </div>
      <div style={{...panel, left: 216, top: 508, width: 68, height: 30, borderRadius: 5, background: `linear-gradient(180deg,${PAPER},#CFC8B8)`, border: "1px solid rgba(26,24,19,0.35)", transform: "rotate(-4deg)", boxShadow: "0 5px 10px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{fontFamily: MF, fontWeight: 800, fontSize: 15, color: INK, whiteSpace: "nowrap"}}>NEW</div>
      </div>
      <div style={{...panel, left: 340, top: 300, width: 9, height: 388, borderRadius: 4, background: "linear-gradient(90deg,#8E9AAC,#2E3948)", boxShadow: "-3px 0 7px rgba(0,0,0,0.4)"}}/>
      {[0, 1, 2, 3].map((i) => (
        <div key={"rpb" + i} style={{...panel, left: 336, top: 346 + i * 92, width: 17, height: 8, borderRadius: 3, background: "linear-gradient(180deg,#A3AEBD,#39424F)"}}/>
      ))}
      <div style={{...panel, left: 8, top: 684, width: 352, height: 6, borderRadius: 3, background: "rgba(236,233,226,0.14)"}}/>
      <div style={{...panel, left: 8, top: 670, width: 352, height: 14, background: "linear-gradient(180deg,#4C6F98,#22374F)", borderRadius: "3px 3px 0 0"}}/>
    </div>
  );
  const Stats = ({cust, riv, cash, note, noteCol, barPct, custCol}: {cust: number; riv: number; cash: number; note: string; noteCol: string; barPct: number; custCol: string}) => (
    <div style={{...panel, left: 56, top: 30, width: 280, padding: "14px 18px", borderRadius: 14, background: "linear-gradient(180deg, rgba(14,22,38,0.94), rgba(10,17,32,0.96))", border: "1px solid rgba(154,150,139,0.34)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6}}>
        <span style={{fontFamily: MF, fontSize: 18, letterSpacing: 2, color: MUTE}}>CUSTOMERS</span>
        <span style={{fontFamily: FF, fontWeight: 900, fontSize: 28, color: custCol}}>{cust}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6}}>
        <span style={{fontFamily: MF, fontSize: 18, letterSpacing: 2, color: MUTE}}>MEGA BREW</span>
        <span style={{fontFamily: FF, fontWeight: 900, fontSize: 28, color: SLATE}}>{riv}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
        <span style={{fontFamily: MF, fontSize: 18, letterSpacing: 2, color: MUTE}}>TODAY</span>
        <span style={{fontFamily: FF, fontWeight: 900, fontSize: 28, color: cash < 80 ? RED : CREAM}}>${cash}</span>
      </div>
      <div style={{marginTop: 10, height: 8, borderRadius: 6, background: "rgba(236,233,226,0.10)", overflow: "hidden"}}>
        <div style={{width: `${barPct}%`, height: "100%", background: `linear-gradient(90deg,${AMBER},${RED})`}}/>
      </div>
      <div style={{marginTop: 8, fontFamily: MF, fontSize: 16, color: noteCol}}>{note}</div>
    </div>
  );
  const Railing = ({y, o}: {y: number; o: number}) => (
    <div style={{...panel, left: 0, top: y, width: 1012, height: 64, opacity: o}}>
      <div style={{...panel, left: 0, top: 0, width: 1012, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#5C6675,#232A36)", boxShadow: "0 5px 10px rgba(0,0,0,0.45)"}}/>
      <div style={{...panel, left: 0, top: 26, width: 1012, height: 5, background: "linear-gradient(180deg,#4A5360,#1D232C)"}}/>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={"rl" + i} style={{...panel, left: 24 + i * 138, top: 4, width: 7, height: 58, background: "linear-gradient(90deg,#5C6675,#1D232C)", borderRadius: 3}}/>
      ))}
    </div>
  );
  const aDx = IV(s0, [16, 44], [452, 0]) - IV(s0, [44, 48], [0, 14]) + IV(s0, [48, 52], [0, 14]);
  const aFade = IV(aDx, [10, 70], [1, 0]);
  const aSignY = IV(s0, [40, 47], [-118, 0]) + IV(s0, [47, 51], [-9, 0]);
  const aAwn = IV(s0, [30, 46], [0, 384]);
  const aBadge = IV(s0, [44, 50], [0, 1.14]) - IV(s0, [50, 52], [0, 0.14]);
  const aLo = [IV(s0, [40, 46], [0, 1]), IV(s0, [44, 50], [0, 1]), IV(s0, [47, 52], [0, 1])];
  const aWin = [IV(s0, [42, 48], [0, 1]), IV(s0, [45, 51], [0, 1]), IV(s0, [48, 52], [0, 1])];
  const aCustA = IV(s0, [28, 52], [400, 620]);
  const aCustB = IV(s0, [34, 52], [640, 880]);
  const aCustBo = 1 - IV(s0, [44, 52], [0, 1]);
  const aGremX = 586 + aDx + 296;
  const aShade = ((s0 * 8.6 + 96) % 1340) - 306;
  const aDust = new Array(6).fill(0).map((_, i) => {
    const p = IV(s0, [30 + i * 2, 50 + i * 2], [0, 1]);
    return {x: 600 + aDx + i * 46, y: 690 - p * 26, s: 10 + p * 26, o: 0.22 * (1 - p)};
  });
  const bCust1 = IV(s1, [0, 22], [600, 940]);
  const bCust1o = 1 - IV(s1, [15, 22], [0, 1]);
  const bCust2 = IV(s1, [14, 44], [520, 940]);
  const bCust2o = 1 - IV(s1, [34, 42], [0, 1]);
  const bFound = 250 - IV(s1, [44, 54], [0, 70]);
  const bDrawer = IV(s1, [42, 56], [0, 150]);
  const bZoom = IV(s1, [0, 56], [1.02, 1.0]);
  const bShade = ((s1 * 9.4 + 220) % 1420) - 340;
  const bSteam = new Array(5).fill(0).map((_, i) => {
    const sd = seed(i * 17 + 5);
    const life = ((s1 * 1.5 + sd * 90) % 90) / 90;
    return {x: 150 + i * 11 + Math.sin(life * 5 + sd * 6) * 14, y: 500 - life * 96, s: 8 + life * 11, o: 0.30 * (1 - life)};
  });
  const cCards = [
    {x: 96, label: "PRICE", num: "-50%", on: 4},
    {x: 320, label: "TRAFFIC", num: "-62%", on: 22},
    {x: 544, label: "CASH", num: "$0", on: 38},
  ];
  const cStamps = [
    {x: 46, t: "PRICE CUT", on: 16},
    {x: 356, t: "NO CUSTOMERS", on: 34},
    {x: 666, t: "CASH OUT", on: 48},
  ];
  const cLeap = IV(s2, [0, 7], [0, 1]);
  const cBars = new Array(18).fill(0).map((_, i) => ({h: 26 + seed(i * 3 + 1) * 58 * (1 - i / 26), k: i}));
  const cBarOff = -((s2 * 12) % 76);
  const cZoom = IV(s2, [0, 50], [1.0, 1.012]);
  const cShade = ((s2 * 9.8 + 40) % 1440) - 350;
  const dLT = [4, 12, 20, 28];
  const dLk = (i: number) => 1 - IV(s3, [dLT[i], dLT[i] + 6], [0, 1]);
  const dCold = IV(s3, [0, 34], [0.15, 1]);
  const dWarm = 1 - dCold * 0.8;
  const dSag = IV(s3, [6, 22], [0, 5.2]) + Math.sin(s3 * 0.09) * 0.3;
  const dOpenRot = IV(s3, [8, 16], [0, 82]);
  const dOpenDrop = IV(s3, [16, 26], [0, 320]);
  const dOpenSpin = IV(s3, [16, 26], [0, 124]);
  const dClosedOn = IV(s3, [22, 24], [0, 1]);
  const dClosedS = IV(s3, [23, 31], [1.18, 1]);
  const dClosedRot = -2 + Math.sin(Math.max(0, s3 - 30) * 0.17) * 4 * IV(s3, [30, 49], [1, 0.34]);
  const dLeaseOn = IV(s3, [30, 32], [0, 1]);
  const dLeaseY = 288 - IV(s3, [30, 38], [140, 0]) + IV(s3, [38, 44], [11, 0]);
  const dLeaseRot = IV(s3, [30, 46], [-9, -3]);
  const dShutter = IV(s3, [36, 49], [0, 176]);
  const dFound = IV(s3, [12, 40], [300, 840]);
  const dFoundO = 1 - IV(s3, [30, 40], [0, 1]);
  const dGremX = 882 - IV(s3, [8, 30], [0, 18]);
  const dBigLeaf = {x: IV(s3, [4, 49], [960, 120]), y: 604 + Math.sin(s3 * 0.16) * 22, r: s3 * 6};
  const dShade = ((s3 * 8.6 + 400) % 1340) - 306;
  const dFlick = 0.32 + 0.30 * Math.abs(Math.sin(s3 * 0.9)) * (seed(Math.floor(s3 / 3) + 3) > 0.28 ? 1 : 0.15);
  const dLitter = new Array(4).fill(0).map((_, i) => {
    const sd = seed(i * 9 + 4);
    const t = ((s3 * (1.5 + sd * 1.6) + sd * 80) % 120) / 120;
    return {x: 940 - t * 900, y: 676 + Math.sin(t * 9 + sd * 5) * 10, r: t * 320 + sd * 200, s: 12 + sd * 8};
  });
  return (
    <AbsoluteFill style={{background: TERM2, overflow: "hidden"}}>
      {SHOT === 0 ? (
        <div style={{width: "100%", height: "100%", position: "relative", transform: `scale(${IV(s0, [0, 52], [1.002, 1.014])})`, transformOrigin: "50% 60%"}}>
          <SkyRoad cold={0.1}/>
          <Rival dx={aDx} signY={aSignY} awnW={aAwn} tfade={aFade} badgeS={aBadge} lo={aLo} winK={aWin}/>
          <Cafe warm={1} sagv={0} lk={() => 1} signRot={0}/>
          <div style={{...panel, left: 452, top: 620, width: 60, height: 80}}>
            <div style={{...panel, left: 0, top: 10, width: 60, height: 70, borderRadius: "6px 6px 3px 3px", background: `linear-gradient(180deg,${RED},#7E2A20)`, boxShadow: "0 8px 16px rgba(0,0,0,0.5)"}}/>
            <div style={{...panel, left: 8, top: 24, width: 44, height: 3, background: "rgba(0,0,0,0.28)"}}/>
            <div style={{...panel, left: 8, top: 48, width: 44, height: 3, background: "rgba(0,0,0,0.24)"}}/>
            <div style={{...panel, left: -6, top: 0, width: 72, height: 14, borderRadius: 4, background: "linear-gradient(180deg,#D8604E,#7E2A20)"}}/>
            <div style={{...panel, left: 2, top: 2, width: 56, height: 3, borderRadius: 2, background: "rgba(247,243,234,0.30)"}}/>
          </div>
          <div style={{...panel, left: 520, top: 250, width: 14, height: 450, background: "linear-gradient(90deg,#5B6880,#2B3245)", borderRadius: 7, boxShadow: "0 8px 20px rgba(0,0,0,0.45)"}}/>
          <div style={{...panel, left: 502, top: 676, width: 50, height: 24, borderRadius: "6px 6px 2px 2px", background: "linear-gradient(180deg,#4C5768,#232A38)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)"}}/>
          <div style={{...panel, left: 486, top: 206, width: 82, height: 46, borderRadius: "14px 14px 8px 8px", background: "linear-gradient(180deg,#6C7590,#333A52)", boxShadow: "0 6px 14px rgba(0,0,0,0.45)"}}/>
          <div style={{...panel, left: 492, top: 210, width: 62, height: 5, borderRadius: 3, background: "rgba(247,243,234,0.24)"}}/>
          <div style={{...panel, left: 498, top: 240, width: 58, height: 20, borderRadius: "0 0 12px 12px", background: `linear-gradient(180deg, ${GOLD}, ${AMBER})`, opacity: 0.85}}/>
          <div style={{...panel, left: 470, top: 336, width: 116, height: 44, borderRadius: 6, background: "linear-gradient(180deg,#3E4A5C,#1F2733)", border: "2px solid rgba(236,233,226,0.20)", transform: `rotate(${Math.sin(lf * 0.08) * 1.2}deg)`, transformOrigin: "50% 0%", boxShadow: "0 6px 12px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{fontFamily: MF, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: CREAM, whiteSpace: "nowrap"}}>MAIN ST</div>
          </div>
          <div style={{...panel, left: 306, top: 544, width: 96, height: 44, borderRadius: 8, background: "rgba(30,18,12,0.86)", border: `2px solid ${GOLD}`, boxShadow: "0 6px 14px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{fontFamily: MF, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: GOLD, whiteSpace: "nowrap"}}>OPEN</div>
          </div>
          <div style={{...panel, left: aShade, top: 140, width: 300, height: 566, background: "linear-gradient(90deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.20) 40%, rgba(10,17,32,0.20) 60%, rgba(10,17,32,0) 100%)"}}/>
          {aDust.map((p, i) => (
            <div key={"ad" + i} style={{...panel, left: p.x, top: p.y, width: p.s, height: p.s * 0.6, borderRadius: "50%", background: `rgba(154,150,139,${p.o})`}}/>
          ))}
          <Gremlin gx={aGremX} gy={306} s={128} wig={Math.sin(s0 * 0.62) * 3} laugh={s0 > 40 ? 1 : 0} armA={26 - IV(s0, [40, 48], [0, 60])} armB={-18 - IV(s0, [42, 50], [0, 40])}/>
          <Actor x={170} groundY={GY} size={212}>
            <Mascot lf={lf} size={212} chef={1} apron={1} cheer={s0 < 38 ? 0.9 : 0} shock={s0 >= 38 ? 0.85 : 0} gaze={s0 > 30 ? 5 : 0} nodAmp={s0 < 38 ? 2.4 : 1}/>
          </Actor>
          <Actor x={aCustA} groundY={GY} size={196} flip={1}>
            <Mascot lf={lf + 9} size={196} girl={1} scarf={1} cup={1} gaze={s0 > 30 ? 5 : -4} cheer={s0 < 30 ? 0.6 : 0} shock={s0 >= 30 ? 0.6 : 0}/>
          </Actor>
          <div style={{...panel, left: 0, top: 0, width: 1012, height: 792, opacity: aCustBo}}>
            <Actor x={aCustB} groundY={GY} size={200} flip={1}>
              <Mascot lf={lf + 21} size={200} glasses={1} beanie={1} backpack={1} gaze={5} cheer={s0 < 34 ? 0.5 : 0}/>
            </Actor>
          </div>
          {nearV.map((v, i) => (
            <Vehicle key={"nv" + i} vx={v.x} vy={704} w={NW} h={NH} k={v.k} rev={0} haze={0}/>
          ))}
          {leaves.map((p, i) => (
            <Leaf key={"lv" + i} lx={p.x} ly={p.y} ls={p.s} lr={p.r} lc={p.c}/>
          ))}
          {motes.map((p, i) => (
            <div key={"e" + i} style={{...panel, left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(207,149,68,0.85)", opacity: p.o}}/>
          ))}
          <Railing y={716} o={0.9}/>
          <div style={{...panel, left: 0, top: 706, width: 1012, height: 86, background: "linear-gradient(180deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.5) 100%)"}}/>
          <Stats cust={Math.round(IV(s0, [30, 52], [12, 7]))} riv={Math.round(IV(s0, [42, 52], [0, 6]))} cash={Math.round(IV(s0, [30, 52], [128, 96]))} barPct={IV(s0, [30, 52], [100, 74])} custCol={s0 > 44 ? GOLD : GREEN} note={s0 > 42 ? "NEW COMPETITOR" : "BEST WEEK YET"} noteCol={s0 > 42 ? RED : GREEN}/>
          <SimTag text={"SIM  DAY " + day} x={700} y={20}/>
          <SimScan/>
          <CutWipe t={s0}/>
        </div>
      ) : null}
      {SHOT === 1 ? (
        <div style={{width: "100%", height: "100%", position: "relative", transform: `scale(${bZoom})`, transformOrigin: "50% 55%"}}>
          <div style={{...panel, inset: 0, background: "linear-gradient(180deg,#4A2E22 0%,#3A241B 46%,#241610 100%)"}}/>
          <div style={{...panel, left: 0, top: 0, width: 1012, height: 300, background: `linear-gradient(180deg,#5C3A2A,#3E2619), ${BRICK}`, boxShadow: "inset 0 -14px 26px rgba(0,0,0,0.42)"}}/>
          <div style={{...panel, left: 0, top: 0, width: 1012, height: 300, background: PLASTER}}/>
          <div style={{...panel, left: 0, top: 296, width: 1012, height: 14, background: "linear-gradient(180deg,#8A5A3C,#3B2417)", boxShadow: "0 8px 16px rgba(0,0,0,0.4)"}}/>
          <div style={{...panel, left: 60, top: 96, width: 560, height: 210, borderRadius: 12, background: "linear-gradient(180deg,#2A1A12,#1B100B)", border: "3px solid rgba(236,233,226,0.16)", boxShadow: "0 12px 26px rgba(0,0,0,0.5)"}}>
            <div style={{...panel, left: 34, top: -2, width: 300, height: 3, background: "rgba(236,233,226,0.14)"}}/>
            {[0, 1, 2, 3].map((i) => (
              <div key={"mn" + i} style={{...panel, left: 34, top: 26 + i * 44, width: 300 - i * 40, height: 12, borderRadius: 6, background: `rgba(236,233,226,${0.24 - i * 0.045})`}}/>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <div key={"mp" + i} style={{...panel, left: 420, top: 26 + i * 44, width: 92, height: 12, borderRadius: 6, background: `rgba(207,149,68,${0.44 - i * 0.07})`}}/>
            ))}
            {[0, 1, 2].map((i) => (
              <div key={"md" + i} style={{...panel, left: 34, top: 52 + i * 44, width: 478, height: 1, background: "rgba(236,233,226,0.07)"}}/>
            ))}
          </div>
          <div style={{...panel, left: 380, top: 424, width: 330, height: 14, borderRadius: 4, background: "linear-gradient(180deg,#8A5A3C,#4A2E1E)", boxShadow: "0 8px 16px rgba(0,0,0,0.45)"}}/>
          <div style={{...panel, left: 700, top: 230, width: 250, height: 490, borderRadius: "14px 14px 0 0", background: `linear-gradient(180deg,#1B2C43 0%,${SLATE} 62%,#22344B 100%)`, border: "6px solid #3A241B", boxShadow: "inset 0 10px 30px rgba(0,0,0,0.5)"}}>
            <div style={{...panel, left: 22, top: 40, width: 200, height: 66, borderRadius: 8, background: "linear-gradient(180deg,#2C4767,#122033)", border: "2px solid rgba(236,233,226,0.34)", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{fontFamily: FF, fontWeight: 900, fontSize: 24, letterSpacing: 1, color: CREAM, whiteSpace: "nowrap"}}>MEGA BREW</div>
            </div>
            <div style={{...panel, left: 40, top: 140, width: 164, height: 40, borderRadius: 8, background: `linear-gradient(180deg,${GOLD},${AMBER})`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${Math.sin(s1 * 0.12) * 1.4}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.4)"}}>
              <div style={{fontFamily: FF, fontWeight: 900, fontSize: 22, letterSpacing: 2, color: INK, whiteSpace: "nowrap"}}>50% OFF</div>
            </div>
            <div style={{...panel, left: 26, top: 208, width: 192, height: 76, borderRadius: 8, background: "linear-gradient(180deg,rgba(236,233,226,0.10),rgba(10,17,32,0.30))", border: "2px solid rgba(236,233,226,0.18)"}}>
              <div style={{...panel, left: 94, top: 0, width: 2, height: 76, background: "rgba(236,233,226,0.16)"}}/>
            </div>
            <div style={{...panel, left: 0, top: 300, width: 238, height: 184, background: "linear-gradient(180deg,rgba(10,17,32,0.1),rgba(10,17,32,0.55))"}}/>
            {[0, 1, 2, 3].map((i) => (
              <div key={"qq" + i} style={{...panel, left: 26 + i * 50, top: 336 + Math.sin(s1 * 0.18 + i) * 4, width: 34, height: 76, borderRadius: "16px 16px 6px 6px", background: "linear-gradient(180deg,#3E4A5C,#141C2C)"}}/>
            ))}
          </div>
          <div style={{...panel, left: 40, top: 516, width: 660, height: 58, borderRadius: "8px 8px 0 0", background: `linear-gradient(180deg,#B08258,#6B4531), ${WOOD}`, boxShadow: "0 10px 22px rgba(0,0,0,0.5), inset 0 3px 0 rgba(247,243,234,0.28)"}}/>
          <div style={{...panel, left: 40, top: 572, width: 660, height: 150, background: `linear-gradient(180deg,#5C3A2A,#2A1A12), ${WOOD}`, boxShadow: "inset 0 6px 14px rgba(0,0,0,0.4)"}}/>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={"cp" + i} style={{...panel, left: 66 + i * 130, top: 600, width: 106, height: 96, borderRadius: 6, border: "2px solid rgba(236,233,226,0.10)"}}>
              <div style={{...panel, left: 44, top: 42, width: 18, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#A79E90,#4A433A)"}}/>
            </div>
          ))}
          <div style={{...panel, left: 96, top: 470, width: 68, height: 46, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(180deg,#B9B2A3,#4E4840)", boxShadow: "0 8px 14px rgba(0,0,0,0.45)"}}>
            <div style={{...panel, left: 8, top: 8, width: 52, height: 12, borderRadius: 3, background: "rgba(10,14,21,0.55)"}}/>
            <div style={{...panel, left: 22, top: -10, width: 24, height: 12, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg,#8E8578,#413B33)"}}/>
          </div>
          <div style={{...panel, left: 200, top: 486, width: 34, height: 30, borderRadius: "4px 4px 8px 8px", background: `linear-gradient(180deg,${PAPER},#C9C2B2)`, boxShadow: "0 6px 10px rgba(0,0,0,0.4)"}}/>
          <div style={{...panel, left: 250, top: 492, width: 30, height: 24, borderRadius: "4px 4px 8px 8px", background: `linear-gradient(180deg,${CLAY},#7A3F27)`, boxShadow: "0 6px 10px rgba(0,0,0,0.4)"}}/>
          <div style={{...panel, left: 430, top: 372, width: 262, height: 146, borderRadius: 10, background: "linear-gradient(180deg,#3E4A5C,#1D2430)", border: "3px solid rgba(236,233,226,0.22)", boxShadow: "0 12px 24px rgba(0,0,0,0.5)"}}>
            <div style={{...panel, left: 20, top: 18, width: 222, height: 52, borderRadius: 6, background: "linear-gradient(180deg,#16273C,#0C1726)", border: "2px solid rgba(236,233,226,0.20)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 14}}>
              <span style={{fontFamily: MF, fontWeight: 800, fontSize: 30, color: RED, whiteSpace: "nowrap"}}>$0</span>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={"kb" + i} style={{...panel, left: 20 + i * 78, top: 88, width: 62, height: 34, borderRadius: 5, background: "linear-gradient(180deg,#69748B,#333A52)", boxShadow: "0 3px 0 rgba(0,0,0,0.35)"}}/>
            ))}
          </div>
          <div style={{...panel, left: bShade, top: 0, width: 320, height: 720, background: "linear-gradient(90deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.26) 42%, rgba(10,17,32,0.26) 58%, rgba(10,17,32,0) 100%)"}}/>
          <div style={{...panel, left: 0, top: BGY - 30, width: 1012, height: 30, background: "linear-gradient(180deg,#241610,#160D09)"}}/>
          <div style={{...panel, left: 0, top: BGY, width: 1012, height: 72, background: "repeating-linear-gradient(90deg,#6A5348 0 84px,#4A3A31 84px 168px)", boxShadow: "inset 0 8px 18px rgba(0,0,0,0.5)"}}/>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={"tj" + i} style={{...panel, left: 0, top: BGY + 34, width: 1012, height: 2, background: "rgba(0,0,0,0.22)"}}/>
          ))}
          <div style={{...panel, left: 0, top: BGY + 72, width: 1012, height: 792 - (BGY + 72), background: "linear-gradient(180deg,#3A2C25,#1A120E)"}}/>
          {bSteam.map((p, i) => (
            <div key={"bs" + i} style={{...panel, left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(236,233,226,0.9)", opacity: p.o}}/>
          ))}
          <Gremlin gx={470} gy={424} s={112} wig={Math.sin(s1 * 0.62) * 3} laugh={1} armA={26 - IV(s1, [40, 50], [0, 66])} armB={-18 - IV(s1, [30, 44], [0, 50])}/>
          <div style={{...panel, left: 430 + bDrawer * 0.16, top: 472 + bDrawer, width: 340, height: 130, borderRadius: 8, background: "linear-gradient(180deg,#69748B,#232A38)", border: "3px solid rgba(236,233,226,0.24)", boxShadow: "0 16px 30px rgba(0,0,0,0.55)"}}>
            <div style={{...panel, left: 16, top: 16, width: 308, height: 62, borderRadius: 5, background: "linear-gradient(180deg,#141A24,#0A0E15)", boxShadow: "inset 0 5px 12px rgba(0,0,0,0.6)"}}/>
            <div style={{...panel, left: 24, top: 30, fontFamily: MF, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: MUTE, whiteSpace: "nowrap"}}>EMPTY</div>
            {[0, 1, 2].map((i) => (
              <div key={"dv" + i} style={{...panel, left: 24 + i * 104, top: 92, width: 84, height: 22, borderRadius: 4, background: "rgba(10,14,21,0.7)", boxShadow: "inset 0 3px 6px rgba(0,0,0,0.5)"}}/>
            ))}
            <div style={{...panel, left: 148, top: 116, width: 46, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#A3AEBD,#39424F)"}}/>
          </div>
          <div style={{...panel, left: 640, top: 44, width: 300, padding: "12px 16px", borderRadius: 12, background: "linear-gradient(180deg, rgba(14,22,38,0.94), rgba(10,17,32,0.96))", border: "1px solid rgba(154,150,139,0.34)", boxShadow: "0 12px 26px rgba(0,0,0,0.5)"}}>
            <div style={{fontFamily: MF, fontSize: 17, letterSpacing: 2, color: MUTE, marginBottom: 6}}>WALK OUTS</div>
            <div style={{fontFamily: FF, fontWeight: 900, fontSize: 40, color: RED, lineHeight: "42px"}}>{Math.round(IV(s1, [2, 44], [0, 11]))}</div>
            <div style={{marginTop: 8, height: 6, borderRadius: 4, background: "rgba(236,233,226,0.10)", overflow: "hidden"}}>
              <div style={{width: `${IV(s1, [2, 44], [4, 100])}%`, height: "100%", background: `linear-gradient(90deg,${AMBER},${RED})`}}/>
            </div>
          </div>
          <Actor x={bFound} groundY={BGY} size={292}>
            <Mascot lf={lf} size={292} chef={1} apron={1} shock={0.95} gaze={5} nodAmp={1}/>
          </Actor>
          {s1 < 22 ? (
            <div style={{...panel, left: 0, top: 0, width: 1012, height: 792, opacity: bCust1o}}>
              <Actor x={bCust1} groundY={BGY} size={240} flip={1}>
                <Mascot lf={lf + 9} size={240} glasses={1} beanie={1} backpack={1} gaze={5}/>
              </Actor>
            </div>
          ) : null}
          {s1 >= 12 && s1 < 44 ? (
            <div style={{...panel, left: 0, top: 0, width: 1012, height: 792, opacity: bCust2o}}>
              <Actor x={bCust2} groundY={BGY} size={250} flip={1}>
                <Mascot lf={lf + 21} size={250} girl={1} scarf={1} tote={1} gaze={5}/>
              </Actor>
            </div>
          ) : null}
          <div style={{...panel, inset: 0, background: "linear-gradient(180deg, rgba(10,17,32,0.24) 0%, rgba(10,17,32,0) 34%, rgba(10,17,32,0.42) 100%)"}}/>
          <SimScan/>
          <CutWipe t={s1}/>
        </div>
      ) : null}
      {SHOT === 2 ? (
        <div style={{width: "100%", height: "100%", position: "relative", transform: `scale(${cZoom})`, transformOrigin: "50% 50%"}}>
          <div style={{...panel, inset: 0, background: `linear-gradient(180deg, ${TERM2} 0%, #16233A 52%, ${TERM} 100%)`}}/>
          <div style={{...panel, inset: 0, background: "repeating-linear-gradient(90deg, rgba(154,150,139,0.07) 0 2px, rgba(0,0,0,0) 2px 68px), repeating-linear-gradient(180deg, rgba(154,150,139,0.07) 0 2px, rgba(0,0,0,0) 2px 68px)"}}/>
          <div style={{...panel, left: 0, top: 330, width: 1012, height: 300, background: "radial-gradient(460px 220px at 50% 100%, rgba(58,92,132,0.20), rgba(0,0,0,0) 72%)"}}/>
          <div style={{...panel, left: cShade, top: 0, width: 330, height: 792, background: "linear-gradient(90deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.24) 44%, rgba(10,17,32,0.24) 56%, rgba(10,17,32,0) 100%)"}}/>
          <div style={{...panel, left: 296, top: 26, width: 420, height: 62, borderRadius: 12, background: "linear-gradient(180deg,#1B2C43,#0C1726)", border: `2px solid ${RED}`, boxShadow: "0 10px 22px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{fontFamily: FF, fontWeight: 900, fontSize: 32, letterSpacing: 4, color: PAPER, whiteSpace: "nowrap"}}>CHAIN REACTION</div>
          </div>
          <div style={{...panel, left: 748, top: 108, width: 224, height: 150, borderRadius: 12, background: "linear-gradient(180deg,#12203A,#080F1A)", border: "2px solid rgba(154,150,139,0.26)", boxShadow: "0 12px 24px rgba(0,0,0,0.5)", padding: "12px 14px"}}>
            <div style={{fontFamily: MF, fontSize: 15, letterSpacing: 3, color: MUTE, marginBottom: 8}}>DOMINOES</div>
            {["PRICE", "TRAFFIC", "CASH"].map((t, i) => (
              <div key={"sb" + i} style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6}}>
                <span style={{fontFamily: MF, fontSize: 16, color: s2 > cCards[i].on + 10 ? PAPER : "rgba(154,150,139,0.7)"}}>{t}</span>
                <span style={{fontFamily: FF, fontWeight: 900, fontSize: 18, color: s2 > cCards[i].on + 10 ? RED : MUTE}}>{s2 > cCards[i].on + 10 ? "DOWN" : "..."}</span>
              </div>
            ))}
            <div style={{marginTop: 4, height: 7, borderRadius: 4, background: "rgba(236,233,226,0.10)", overflow: "hidden"}}>
              <div style={{width: `${IV(s2, [4, 50], [6, 100])}%`, height: "100%", background: `linear-gradient(90deg,${SLATE},${RED})`}}/>
            </div>
          </div>
          <svg width={1012} height={120} viewBox="0 0 1012 120" style={{...panel, left: 0, top: 274}}>
            <path d="M180 60 L300 60" stroke="rgba(196,74,58,0.75)" strokeWidth={5} strokeDasharray="14 10" strokeLinecap="round"/>
            <path d="M420 60 L540 60" stroke="rgba(196,74,58,0.55)" strokeWidth={5} strokeDasharray="14 10" strokeLinecap="round"/>
            <path d="M292 46 L318 60 L292 74" fill="none" stroke="rgba(196,74,58,0.85)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M532 46 L558 60 L532 74" fill="none" stroke="rgba(196,74,58,0.7)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M700 60 L940 60" stroke="rgba(154,150,139,0.28)" strokeWidth={4} strokeDasharray="8 12" strokeLinecap="round"/>
          </svg>
          <div style={{...panel, left: 40, top: 600, width: 932, height: 36, borderRadius: 6, background: "linear-gradient(180deg,#3E4A5C,#1D2430)", boxShadow: "0 12px 24px rgba(0,0,0,0.5), inset 0 3px 0 rgba(236,233,226,0.14)"}}/>
          <div style={{...panel, left: 40, top: 636, width: 932, height: 10, background: "linear-gradient(180deg,#161D28,#0A0F18)"}}/>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={"bj" + i} style={{...panel, left: 96 + i * 128, top: 602, width: 2, height: 32, background: "rgba(0,0,0,0.30)"}}/>
          ))}
          {cCards.map((c, i) => {
            const rot = IV(s2, [c.on, c.on + 12], [0, 84]);
            const numY = IV(s2, [c.on + 8, c.on + 20], [0, 150]);
            const numO = 1 - IV(s2, [c.on + 14, c.on + 20], [0, 1]);
            const dustP = IV(s2, [c.on + 11, c.on + 26], [0, 1]);
            const dustO = 0.34 * (1 - dustP) * (s2 > c.on + 10 ? 1 : 0);
            return (
              <div key={"cc" + i}>
                <div style={{...panel, left: c.x - 10, top: 588, width: 232, height: 18, borderRadius: "50%", background: `radial-gradient(ellipse at center, rgba(0,0,0,${0.42 - 0.18 * (rot / 84)}), rgba(0,0,0,0))`}}/>
                <div style={{...panel, left: c.x, top: 400, width: 196, height: 200, transform: `rotate(${rot}deg)`, transformOrigin: "100% 100%", borderRadius: 12, background: `linear-gradient(170deg,${rot > 40 ? "#5A2A22" : "#22344B"} 0%,#0C1726 100%)`, border: `3px solid ${rot > 40 ? RED : "rgba(236,233,226,0.34)"}`, boxShadow: "0 16px 32px rgba(0,0,0,0.55), inset 0 3px 0 rgba(236,233,226,0.12)"}}>
                  <div style={{...panel, left: 0, top: 0, width: 12, height: 200, borderRadius: "12px 0 0 12px", background: "linear-gradient(90deg,rgba(247,243,234,0.16),rgba(247,243,234,0))"}}/>
                  <div style={{...panel, left: 178, top: 0, width: 12, height: 200, background: "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0.42))"}}/>
                  <div style={{...panel, left: 16, top: 18, width: 158, height: 8, borderRadius: 4, background: rot > 40 ? RED : SLATE}}/>
                  <div style={{...panel, left: 16, top: 40, fontFamily: FF, fontWeight: 900, fontSize: 32, letterSpacing: 1, color: PAPER, whiteSpace: "nowrap"}}>{c.label}</div>
                  <div style={{...panel, left: 16, top: 82, width: 158, height: 2, background: "rgba(236,233,226,0.16)"}}/>
                  <div style={{...panel, left: 16, top: 92, fontFamily: FF, fontWeight: 900, fontSize: 42, color: rot > 40 ? RED : CREAM, whiteSpace: "nowrap"}}>{c.num}</div>
                  <svg width={36} height={36} viewBox="0 0 22 22" style={{...panel, left: 16, top: 150}}>
                    <path d="M11 3 L11 17 M4 11 L11 18 L18 11" fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div style={{...panel, left: 108, top: 146, width: 70, height: 40, borderRadius: 6, background: "rgba(10,17,32,0.6)", border: "2px solid rgba(236,233,226,0.16)"}}>
                    <div style={{...panel, left: 8, top: 10, width: 30, height: 4, borderRadius: 2, background: "rgba(236,233,226,0.22)"}}/>
                    <div style={{...panel, left: 8, top: 22, width: 44, height: 4, borderRadius: 2, background: "rgba(236,233,226,0.14)"}}/>
                  </div>
                </div>
                {dustO > 0.01 ? [0, 1, 2, 3].map((k) => (
                  <div key={"du" + i + k} style={{...panel, left: c.x + 150 + k * 26 + dustP * (18 + k * 14), top: 584 - dustP * (16 + k * 8), width: 16 + dustP * (22 + k * 6), height: (16 + dustP * 18) * 0.62, borderRadius: "50%", background: `rgba(154,150,139,${dustO})`}}/>
                )) : null}
                <div style={{...panel, left: c.x + 24, top: 434 + numY, opacity: numO, fontFamily: MF, fontWeight: 800, fontSize: 30, color: RED, whiteSpace: "nowrap"}}>{c.num}</div>
              </div>
            );
          })}
          <Gremlin gx={194 - 84 * cLeap} gy={400 + 200 * cLeap - Math.sin(cLeap * Math.PI) * 120} s={112} wig={Math.sin(s2 * 0.5) * 3} laugh={cLeap >= 1 ? 1 : 0} armA={26 - 60 * cLeap} armB={-18 - 40 * cLeap}/>
          <div style={{...panel, left: 40, top: 660, width: 932, height: 108, borderRadius: 10, background: "linear-gradient(180deg,#0C1726,#080F1A)", border: "2px solid rgba(154,150,139,0.20)", overflow: "hidden"}}>
            <div style={{...panel, left: cBarOff, top: 0, width: 1400, height: 108}}>
              {cBars.map((b, i) => (
                <div key={"bb" + i} style={{...panel, left: 14 + i * 76, top: 96 - b.h, width: 54, height: b.h, borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg,${i % 3 === 0 ? RED : SLATE},#0C1726)`}}>
                  <div style={{...panel, left: 0, top: 0, width: 54, height: 3, background: "rgba(247,243,234,0.22)"}}/>
                </div>
              ))}
            </div>
            <div style={{...panel, left: 0, top: 96, width: 1012, height: 4, background: "rgba(236,233,226,0.16)"}}/>
            <div style={{...panel, left: 0, top: 24, width: 932, height: 1, background: "rgba(236,233,226,0.08)"}}/>
            <div style={{...panel, left: 0, top: 58, width: 932, height: 1, background: "rgba(236,233,226,0.08)"}}/>
          </div>
          {cStamps.map((st, i) => {
            const p = IV(s2, [st.on, st.on + 3], [0, 1]);
            const dy = IV(s2, [st.on, st.on + 6], [-62, 0]);
            const rr = -7 + i * 6 + IV(s2, [st.on, st.on + 6], [9, 0]);
            if (s2 < st.on) return null;
            return (
              <div key={"cs" + i} style={{...panel, left: st.x, top: 150 + dy, width: 286, height: 146, transform: `rotate(${rr}deg)`, transformOrigin: "50% 50%", opacity: p, borderRadius: 10, background: "linear-gradient(180deg,#8E2A20,#4A140E)", border: `5px solid ${RED}`, boxShadow: "0 14px 28px rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6}}>
                <div style={{...panel, left: 10, top: 8, width: 266, height: 3, background: "rgba(247,243,234,0.24)"}}/>
                <div style={{fontFamily: FF, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: PAPER, whiteSpace: "nowrap"}}>{st.t}</div>
                <div style={{fontFamily: MF, fontWeight: 800, fontSize: 15, letterSpacing: 3, color: "#E8B9B0", whiteSpace: "nowrap"}}>DAY {day}</div>
              </div>
            );
          })}
          <div style={{...panel, inset: 0, background: "linear-gradient(180deg, rgba(10,17,32,0.30) 0%, rgba(10,17,32,0) 38%, rgba(10,17,32,0.44) 100%)"}}/>
          <SimScan/>
          <CutWipe t={s2}/>
        </div>
      ) : null}
      {SHOT === 3 ? (
        <div style={{width: "100%", height: "100%", position: "relative", transform: `scale(${IV(s3, [0, 49], [1.014, 1.002])})`, transformOrigin: "50% 58%"}}>
          <SkyRoad cold={dCold}/>
          <Rival dx={0} signY={0} awnW={384} tfade={1} badgeS={1} lo={[1, 1, 1]} winK={[1, 1, 1]}/>
          <Cafe warm={dWarm} sagv={dSag} lk={dLk} signRot={-3.6 - IV(s3, [10, 26], [0, 2.8])}/>
          <div style={{...panel, left: 452, top: 620, width: 60, height: 80, transform: "rotate(84deg) translate(30px,14px)", transformOrigin: "0% 100%"}}>
            <div style={{...panel, left: 0, top: 10, width: 60, height: 70, borderRadius: "6px 6px 3px 3px", background: `linear-gradient(180deg,${RED},#7E2A20)`, boxShadow: "0 8px 16px rgba(0,0,0,0.5)"}}/>
            <div style={{...panel, left: -6, top: 0, width: 72, height: 14, borderRadius: 4, background: "linear-gradient(180deg,#D8604E,#7E2A20)"}}/>
          </div>
          <div style={{...panel, left: 216, top: 596, width: 62, height: 104, transform: "rotate(-76deg) translateY(10px)", transformOrigin: "0% 100%"}}>
            <div style={{...panel, left: 0, top: 8, width: 62, height: 96, background: `linear-gradient(180deg,#6B4531,#332016), ${WOOD}`, borderRadius: 6, border: "2px solid rgba(236,233,226,0.20)", boxShadow: "0 8px 16px rgba(0,0,0,0.5)"}}/>
            <div style={{...panel, left: 12, top: 26, width: 38, height: 4, borderRadius: 3, background: "rgba(236,233,226,0.30)"}}/>
            <div style={{...panel, left: 12, top: 44, width: 30, height: 4, borderRadius: 3, background: "rgba(236,233,226,0.24)"}}/>
          </div>
          <div style={{...panel, left: 520, top: 250, width: 14, height: 450, background: "linear-gradient(90deg,#5B6880,#2B3245)", borderRadius: 7, boxShadow: "0 8px 20px rgba(0,0,0,0.45)"}}/>
          <div style={{...panel, left: 502, top: 676, width: 50, height: 24, borderRadius: "6px 6px 2px 2px", background: "linear-gradient(180deg,#4C5768,#232A38)", boxShadow: "0 6px 12px rgba(0,0,0,0.5)"}}/>
          <div style={{...panel, left: 486, top: 206, width: 82, height: 46, borderRadius: "14px 14px 8px 8px", background: "linear-gradient(180deg,#6C7590,#333A52)", boxShadow: "0 6px 14px rgba(0,0,0,0.45)"}}/>
          <div style={{...panel, left: 498, top: 240, width: 58, height: 20, borderRadius: "0 0 12px 12px", background: `linear-gradient(180deg, ${GOLD}, ${AMBER})`, opacity: 0.16 + 0.7 * dFlick * dWarm}}/>
          <div style={{...panel, left: 468, top: 262, width: 118, height: 120, background: `linear-gradient(180deg, rgba(207,149,68,${0.10 * dFlick}) 0%, rgba(207,149,68,0) 100%)`, clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)"}}/>
          <div style={{...panel, left: dShade, top: 140, width: 300, height: 566, background: "linear-gradient(90deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.26) 40%, rgba(10,17,32,0.26) 60%, rgba(10,17,32,0) 100%)"}}/>
          <Gremlin gx={dGremX} gy={306} s={124} wig={Math.sin(s3 * 0.62) * 3} laugh={1} armA={-34} armB={-58}/>
          <div style={{...panel, left: 306, top: 544, width: 96, height: 44, transform: `translateY(${dOpenDrop}px) rotate(${dOpenRot + dOpenSpin}deg)`, transformOrigin: "6% 8%", borderRadius: 8, background: "rgba(30,18,12,0.86)", border: `2px solid ${GOLD}`, boxShadow: "0 6px 14px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{fontFamily: MF, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: GOLD, opacity: 1 - IV(s3, [18, 26], [0, 1]), whiteSpace: "nowrap"}}>OPEN</div>
          </div>
          <div style={{...panel, left: 84, top: 396, width: 320, height: 116, opacity: dClosedOn, transform: `rotate(${dClosedRot}deg) scale(${dClosedS})`, transformOrigin: "50% 100%"}}>
            <div style={{...panel, inset: 0, borderRadius: 14, background: "linear-gradient(180deg,#8E2A20,#4A140E)", border: `6px solid ${RED}`, boxShadow: "0 16px 34px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2}}>
              <div style={{fontFamily: FF, fontWeight: 900, fontSize: 52, letterSpacing: 6, color: PAPER, whiteSpace: "nowrap"}}>CLOSED</div>
              <div style={{fontFamily: MF, fontWeight: 800, fontSize: 15, letterSpacing: 4, color: "#E8B9B0", whiteSpace: "nowrap"}}>CORNER CAFE</div>
            </div>
            <div style={{...panel, left: 138, top: -14, width: 44, height: 20, borderRadius: 3, background: "rgba(247,243,234,0.42)", transform: "rotate(-6deg)"}}/>
          </div>
          <div style={{...panel, left: 286, top: 516, width: 124, height: dShutter, background: "repeating-linear-gradient(180deg,#4C5768 0 8px,#2B3444 8px 16px)", borderRadius: "4px 4px 2px 2px", boxShadow: "0 8px 16px rgba(0,0,0,0.55)"}}>
            <div style={{...panel, left: 0, top: 0, width: 8, height: dShutter, background: "linear-gradient(90deg,rgba(247,243,234,0.16),rgba(0,0,0,0))"}}/>
            {dShutter > 20 ? <div style={{...panel, left: 46, top: Math.max(0, dShutter - 14), width: 32, height: 8, borderRadius: 4, background: "linear-gradient(180deg,#A3AEBD,#39424F)"}}/> : null}
          </div>
          <div style={{...panel, left: 452, top: dLeaseY, width: 144, height: 66, opacity: dLeaseOn, transform: `rotate(${dLeaseRot}deg)`, transformOrigin: "50% 0%", borderRadius: 6, background: `linear-gradient(180deg,${PAPER},#D6D0C2)`, border: "2px solid rgba(26,24,19,0.4)", boxShadow: "0 10px 22px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4}}>
            <div style={{...panel, left: -10, top: -8, width: 40, height: 16, background: "rgba(236,233,226,0.55)", border: "1px solid rgba(26,24,19,0.18)", transform: "rotate(-24deg)"}}/>
            <div style={{...panel, left: 114, top: -8, width: 40, height: 16, background: "rgba(236,233,226,0.55)", border: "1px solid rgba(26,24,19,0.18)", transform: "rotate(22deg)"}}/>
            <div style={{fontFamily: FF, fontWeight: 900, fontSize: 20, letterSpacing: 1, color: INK, whiteSpace: "nowrap"}}>FOR LEASE</div>
            <div style={{fontFamily: MF, fontWeight: 700, fontSize: 12, letterSpacing: 1, color: "#5A5348", whiteSpace: "nowrap"}}>INQUIRE WITHIN</div>
          </div>
          <div style={{...panel, left: 0, top: 0, width: 1012, height: 792, opacity: dFoundO}}>
            <Actor x={dFound} groundY={GY} size={208} flip={1}>
              <Mascot lf={lf} size={208} chef={1} apron={1} scarf={1} stern={0.8} gaze={0} nodAmp={2.2}/>
            </Actor>
          </div>
          {nearV.map((v, i) => (
            <Vehicle key={"dv" + i} vx={v.x} vy={704} w={NW} h={NH} k={v.k} rev={0} haze={0.22}/>
          ))}
          {leaves.map((p, i) => (
            <Leaf key={"dl" + i} lx={p.x} ly={p.y} ls={p.s} lr={p.r} lc={p.c}/>
          ))}
          <Leaf lx={dBigLeaf.x} ly={dBigLeaf.y} ls={30} lr={dBigLeaf.r} lc={CLAY}/>
          {dLitter.map((p, i) => (
            <div key={"lt" + i} style={{...panel, left: p.x, top: p.y, width: p.s, height: p.s * 0.7, borderRadius: 3, background: `linear-gradient(140deg,${PAPER},#A9A296)`, transform: `rotate(${p.r}deg)`, boxShadow: "0 3px 5px rgba(0,0,0,0.4)"}}/>
          ))}
          {motes.map((p, i) => (
            <div key={"dm" + i} style={{...panel, left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(154,150,139,0.85)", opacity: p.o}}/>
          ))}
          <div style={{...panel, inset: 0, background: `linear-gradient(180deg, rgba(58,92,132,${0.32 * dCold}) 0%, rgba(10,17,32,${0.48 * dCold}) 100%)`, mixBlendMode: "multiply"}}/>
          <Railing y={716} o={0.95}/>
          <div style={{...panel, left: 0, top: 706, width: 1012, height: 86, background: "linear-gradient(180deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.55) 100%)"}}/>
          <Stats cust={Math.max(0, Math.round(IV(s3, [0, 30], [2, 0])))} riv={Math.round(IV(s3, [0, 44], [7, 19]))} cash={Math.max(0, Math.round(IV(s3, [0, 26], [42, 0])))} barPct={IV(s3, [0, 26], [30, 2])} custCol={RED} note="SHUT DOWN" noteCol={RED}/>
          <SimTag text={"SIM  DAY " + day} x={700} y={20}/>
          <SimScan/>
          <CutWipe t={s3}/>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const S4Body: React.FC<{lf:number}> = ({lf}) => {
  const IV = (x:number, ins:number[], outs:number[]) => interpolate(x, ins, outs, {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
  const DUR = 112;
  const CREAM = "#ECE9E2";
  const PAPER = "#F7F3EA";
  const INK = "#1A1813";
  const SLATE = "#3A5C84";
  const CLAY = "#D2724E";
  const AMBER = "#CF9544";
  const GOLD = "#E7B24C";
  const GREEN = "#3F9E74";
  const MUTE = "#9A968B";
  const RED = "#C44A3A";
  const TERM = "#0E1626";
  const TERM2 = "#0A1120";
  const ORANGE = "#D97757";
  const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
  const SERIF = "Fraunces, Georgia, serif";

  const GX = 56, GY = 150, GW = 900, GH = 555;
  const CW = (GW - 2) / 2;
  const CH = (GH - 2) / 2;
  const HUD = 28;
  const FLOOR = CH - 96;
  const camScale = IV(lf, [0, DUR], [1.005, 1.03]);

  const runN = Math.max(1, Math.min(40, Math.round(IV(lf, [0, 100], [4, 40]))));
  const sweepY = IV(lf, [36, 76], [-14, GH + 14]);
  const sweepA = IV(lf, [34, 42, 70, 78], [0, 0.55, 0.55, 0]);

  const wipeX = IV(lf, [24, 62], [-300, GW + 60]);
  const wipeOp = IV(lf, [22, 31, 55, 64], [0, 0.46, 0.46, 0]);
  const bankX = IV(lf, [0, DUR], [-160, 240]);

  const stampFrames = [62, 72, 82, 92];
  const popFrames = [6, 18, 30, 42];

  const Pop = (o:any) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, opacity:o.p, transform:`scale(${IV(o.p,[0,1],[0.9,1])})`, transformOrigin:`50% ${FLOOR}px`, zIndex:o.z ?? 6, pointerEvents:"none"}}>{o.children}</div>
  );

  const Haze = (o:{top:number, h:number, c:string, op:number}) => (
    <div style={{position:"absolute", left:0, top:o.top, width:CW, height:o.h, background:`linear-gradient(180deg, rgba(0,0,0,0), ${o.c})`, opacity:o.op, zIndex:1, pointerEvents:"none"}}/>
  );

  const Spires = (o:{base:number, tint:string, op:number, seedOff:number, drift:number}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, opacity:o.op, zIndex:1, pointerEvents:"none", transform:`translateX(${Math.sin(lf / 46) * o.drift}px)`}}>
      {[0,1,2,3,4,5,6,7].map(i => {
        const h = 22 + seed(i * 5 + o.seedOff) * 38;
        const w = 16 + seed(i * 3 + o.seedOff + 2) * 20;
        const x = -8 + i * 59;
        return (
          <div key={i}>
            <div style={{position:"absolute", left:x, top:o.base - h, width:w, height:h, background:o.tint, borderRadius:"2px 2px 0 0"}}/>
            <div style={{position:"absolute", left:x + w / 2 - 1.5, top:o.base - h - 13, width:3, height:13, background:o.tint}}/>
            <div style={{position:"absolute", left:x + w / 2 - 6, top:o.base - h - 6, width:12, height:7, background:o.tint, borderRadius:"60% 60% 0 0"}}/>
          </div>
        );
      })}
    </div>
  );

  const MidBlock = (o:{x:number, w:number, top:number, tint:string, lit:string, op:number, seedOff:number, z?:number}) => {
    const bh = FLOOR - o.top;
    return (
      <div style={{position:"absolute", left:o.x, top:o.top, width:o.w, height:bh, opacity:o.op, zIndex:o.z ?? 1, pointerEvents:"none"}}>
        <div style={{position:"absolute", inset:0, background:o.tint, borderRadius:"3px 3px 0 0", boxShadow:"inset -9px 0 16px rgba(0,0,0,0.45), inset 0 2px 0 rgba(236,233,226,0.08)"}}/>
        <div style={{position:"absolute", left:-4, top:-7, width:o.w + 8, height:7, background:o.lit, borderRadius:"3px 3px 0 0", boxShadow:"0 3px 6px rgba(0,0,0,0.45)"}}/>
        <div style={{position:"absolute", left:o.w * 0.16, top:-20, width:13, height:14, background:o.lit, borderRadius:"2px 2px 0 0"}}/>
        <div style={{position:"absolute", left:o.w * 0.16 - 2, top:-24, width:17, height:5, background:o.tint, borderRadius:2}}/>
        <div style={{position:"absolute", left:o.w * 0.72, top:-26, width:2, height:26, background:o.lit}}/>
        <div style={{position:"absolute", left:o.w * 0.72 - 8, top:-26, width:18, height:2, background:o.lit}}/>
        <div style={{position:"absolute", left:o.w * 0.72 - 6, top:-20, width:14, height:2, background:o.lit}}/>
        <div style={{position:"absolute", left:o.w - 8, top:2, width:3, height:bh - 2, background:"rgba(0,0,0,0.45)", borderRadius:2}}/>
        <div style={{position:"absolute", left:o.w - 11, top:bh * 0.34, width:9, height:3, background:"rgba(0,0,0,0.5)", borderRadius:1}}/>
        <div style={{position:"absolute", left:o.w - 11, top:bh * 0.68, width:9, height:3, background:"rgba(0,0,0,0.5)", borderRadius:1}}/>
        {[0,1,2].map(r => [0,1,2].map(c => {
          const wx = 9 + c * ((o.w - 20) / 3);
          const wy = 12 + r * ((bh - 26) / 3);
          const ww = (o.w - 30) / 3;
          const wh = Math.max(9, (bh - 40) / 3);
          const on = seed(r * 7 + c * 3 + o.seedOff) > 0.52;
          return (
            <div key={`${r}-${c}`}>
              <div style={{position:"absolute", left:wx, top:wy, width:ww, height:wh, background:on ? `rgba(231,178,76,0.24)` : "rgba(10,17,32,0.72)", borderRadius:1, boxShadow:"inset 0 0 0 1px rgba(0,0,0,0.45)"}}/>
              <div style={{position:"absolute", left:wx + ww / 2 - 0.5, top:wy, width:1, height:wh, background:"rgba(0,0,0,0.5)"}}/>
              <div style={{position:"absolute", left:wx, top:wy + wh / 2 - 0.5, width:ww, height:1, background:"rgba(0,0,0,0.5)"}}/>
              <div style={{position:"absolute", left:wx - 2, top:wy + wh, width:ww + 4, height:2, background:o.lit, borderRadius:1}}/>
            </div>
          );
        }))}
        <div style={{position:"absolute", left:0, top:0, width:o.w, height:bh, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0 1px, rgba(0,0,0,0) 1px 9px)", opacity:0.5}}/>
      </div>
    );
  };

  const Scallop = (o:{x:number, y:number, w:number, n:number, c:string, op?:number, z?:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:o.w, height:9, zIndex:o.z ?? 4, opacity:o.op ?? 1, pointerEvents:"none"}}>
      {Array.from({length:o.n}).map((_, i) => (
        <div key={i} style={{position:"absolute", left:i * (o.w / o.n), top:0, width:o.w / o.n, height:9, borderRadius:"0 0 50% 50%", background:i % 2 === 0 ? o.c : PAPER, boxShadow:"0 2px 3px rgba(0,0,0,0.45)"}}/>
      ))}
    </div>
  );

  const HangSign = (o:{x:number, y:number, w:number, label:string, c:string, op:number, z:number, ph:number}) => {
    const sw = Math.sin((lf + o.ph) / 9) * IV(lf, [0, 70], [6, 1.6]);
    return (
      <div style={{position:"absolute", left:o.x, top:o.y, width:o.w + 26, height:56, opacity:o.op, zIndex:o.z}}>
        <div style={{position:"absolute", left:0, top:0, width:6, height:34, background:"linear-gradient(180deg,#5A6C7E,#202C38)", borderRadius:2}}/>
        <div style={{position:"absolute", left:0, top:0, width:o.w + 20, height:5, background:"linear-gradient(180deg,#6D7F92,#26333F)", borderRadius:3, boxShadow:"0 2px 5px rgba(0,0,0,0.5)"}}/>
        <div style={{position:"absolute", left:4, top:4, width:16, height:16, borderLeft:"3px solid #4C5D6E", borderBottom:"3px solid #4C5D6E", borderRadius:"0 0 0 10px"}}/>
        <div style={{transformOrigin:`${o.w / 2 + 12}px 5px`, transform:`rotate(${sw}deg)`}}>
          <div style={{position:"absolute", left:o.w / 2 + 4, top:5, width:5, height:5, borderRadius:"50%", border:"2px solid #8B99A6"}}/>
          <div style={{position:"absolute", left:o.w / 2 + 4, top:11, width:5, height:5, borderRadius:"50%", border:"2px solid #8B99A6"}}/>
          <div style={{position:"absolute", left:6, top:18, width:o.w, height:24, borderRadius:5, background:"linear-gradient(180deg,#16233A,#0A1120)", border:`1px solid ${o.c}`, boxShadow:"0 5px 10px rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <span style={{fontFamily:MONO, fontSize:13, color:o.c, letterSpacing:0.7, fontWeight:700, whiteSpace:"nowrap"}}>{o.label}</span>
          </div>
        </div>
      </div>
    );
  };

  const Planter = (o:{x:number, y:number, w:number, c:string, op:number, z:number, ph:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:o.w, height:34, opacity:o.op, zIndex:o.z}}>
      <div style={{position:"absolute", left:0, top:12, width:o.w, height:22, borderRadius:"3px 3px 6px 6px", background:`linear-gradient(170deg,${o.c},#332217)`, boxShadow:"0 5px 9px rgba(0,0,0,0.5), inset 0 2px 0 rgba(247,243,234,0.18)"}}/>
      <div style={{position:"absolute", left:0, top:12, width:o.w, height:5, background:"rgba(0,0,0,0.24)", borderRadius:"3px 3px 0 0"}}/>
      {[0,1,2].map(i => (
        <div key={i} style={{position:"absolute", left:3 + i * (o.w / 3.2), top:12 - 10 - i * 2, width:9, height:14 + i * 3, borderRadius:"60% 10% 60% 10%", background:`linear-gradient(160deg,#4E7F5E,#26402F)`, transform:`rotate(${-14 + i * 15 + Math.sin((lf + o.ph + i * 12) / 11) * 5}deg)`, transformOrigin:"50% 100%"}}/>
      ))}
    </div>
  );

  const Bin = (o:{x:number, y:number, op:number, z:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:26, height:34, opacity:o.op, zIndex:o.z}}>
      <div style={{position:"absolute", left:1, top:6, width:24, height:28, borderRadius:"3px 3px 5px 5px", background:"linear-gradient(170deg,#48566B,#1B2331)", boxShadow:"0 5px 9px rgba(0,0,0,0.5), inset 2px 0 0 rgba(236,233,226,0.08)"}}/>
      <div style={{position:"absolute", left:0, top:2, width:26, height:6, borderRadius:3, background:"linear-gradient(180deg,#5D6D84,#242E3D)"}}/>
      <div style={{position:"absolute", left:11, top:-1, width:4, height:4, borderRadius:2, background:"#6E7F96"}}/>
      <div style={{position:"absolute", left:4, top:14, width:18, height:2, background:"rgba(0,0,0,0.4)"}}/>
      <div style={{position:"absolute", left:4, top:22, width:18, height:2, background:"rgba(0,0,0,0.32)"}}/>
    </div>
  );

  const Crates = (o:{x:number, y:number, op:number, z:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:46, height:38, opacity:o.op, zIndex:o.z}}>
      <div style={{position:"absolute", left:0, top:16, width:46, height:22, borderRadius:3, background:"linear-gradient(170deg,#7A5734,#3B2917)", boxShadow:"0 5px 9px rgba(0,0,0,0.5), inset 0 2px 0 rgba(247,243,234,0.16)"}}/>
      <div style={{position:"absolute", left:0, top:23, width:46, height:2, background:"rgba(0,0,0,0.35)"}}/>
      <div style={{position:"absolute", left:0, top:31, width:46, height:2, background:"rgba(0,0,0,0.28)"}}/>
      <div style={{position:"absolute", left:8, top:0, width:32, height:17, borderRadius:3, background:"linear-gradient(170deg,#8C673F,#43301C)", boxShadow:"0 4px 7px rgba(0,0,0,0.5), inset 0 2px 0 rgba(247,243,234,0.16)"}}/>
      <div style={{position:"absolute", left:8, top:8, width:32, height:2, background:"rgba(0,0,0,0.32)"}}/>
    </div>
  );

  const Bike = (o:{x:number, y:number, op:number, z:number, c:string}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:62, height:36, opacity:o.op, zIndex:o.z, transform:"rotate(-6deg)"}}>
      <div style={{position:"absolute", left:0, top:12, width:24, height:24, borderRadius:"50%", border:`3px solid ${o.c}`}}/>
      <div style={{position:"absolute", left:36, top:12, width:24, height:24, borderRadius:"50%", border:`3px solid ${o.c}`}}/>
      <div style={{position:"absolute", left:12, top:16, width:32, height:3, background:o.c, transform:"rotate(-16deg)", transformOrigin:"0 50%"}}/>
      <div style={{position:"absolute", left:14, top:14, width:24, height:3, background:o.c, transform:"rotate(28deg)", transformOrigin:"0 50%"}}/>
      <div style={{position:"absolute", left:12, top:6, width:12, height:4, borderRadius:2, background:o.c}}/>
      <div style={{position:"absolute", left:44, top:2, width:11, height:3, borderRadius:2, background:o.c}}/>
      <div style={{position:"absolute", left:46, top:4, width:3, height:12, background:o.c, transform:"rotate(14deg)"}}/>
      <div style={{position:"absolute", left:-4, top:36, width:70, height:6, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(0,0,0,0.5), rgba(0,0,0,0) 70%)"}}/>
    </div>
  );

  const Steam = (o:{x:number, y:number, op:number, z:number, ph:number, c:string}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:34, height:44, opacity:o.op, zIndex:o.z, pointerEvents:"none"}}>
      {[0,1,2].map(i => {
        const t = ((lf + o.ph + i * 13) % 34) / 34;
        return (
          <div key={i} style={{position:"absolute", left:8 + Math.sin((t * 6.2) + i * 2) * 9, top:38 - t * 40, width:9 + t * 7, height:9 + t * 7, borderRadius:"50%", background:o.c, opacity:(1 - t) * 0.32}}/>
        );
      })}
    </div>
  );

  const Mat = (o:{x:number, y:number, w:number, op:number, z:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:o.w, height:11, opacity:o.op, zIndex:o.z}}>
      <div style={{position:"absolute", inset:0, borderRadius:3, background:"linear-gradient(180deg,#4A4234,#241F17)", boxShadow:"0 3px 6px rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute", left:3, top:3, width:o.w - 6, height:5, borderRadius:2, background:"repeating-linear-gradient(90deg, rgba(236,233,226,0.16) 0 2px, rgba(0,0,0,0) 2px 6px)"}}/>
    </div>
  );

  const Board = (o:{x:number, y:number, op:number, z:number, l1:string, l2:string, ph:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:56, height:60, opacity:o.op, zIndex:o.z, transform:`rotate(${Math.sin((lf + o.ph) / 15) * 1.2}deg)`, transformOrigin:"50% 100%"}}>
      <div style={{position:"absolute", left:2, top:0, width:52, height:48, borderRadius:4, background:"linear-gradient(170deg,#6B4E2E,#2E2013)", boxShadow:"0 6px 11px rgba(0,0,0,0.5), inset 0 2px 0 rgba(247,243,234,0.16)"}}/>
      <div style={{position:"absolute", left:6, top:4, width:44, height:40, borderRadius:2, background:"linear-gradient(170deg,#1B2434,#0C121D)", boxShadow:"inset 0 2px 6px rgba(0,0,0,0.6)"}}/>
      <div style={{position:"absolute", left:10, top:9, width:36, height:3, borderRadius:2, background:"rgba(236,233,226,0.6)"}}/>
      <div style={{position:"absolute", left:10, top:17, width:26, height:3, borderRadius:2, background:"rgba(236,233,226,0.42)"}}/>
      <div style={{position:"absolute", left:10, top:25, width:32, height:3, borderRadius:2, background:"rgba(236,233,226,0.42)"}}/>
      <div style={{position:"absolute", left:10, top:33, width:20, height:3, borderRadius:2, background:"rgba(231,178,76,0.7)"}}/>
      <div style={{position:"absolute", left:8, top:46, width:6, height:14, background:"linear-gradient(180deg,#5B4227,#2A1D11)", transform:"rotate(9deg)"}}/>
      <div style={{position:"absolute", left:42, top:46, width:6, height:14, background:"linear-gradient(180deg,#5B4227,#2A1D11)", transform:"rotate(-9deg)"}}/>
    </div>
  );

  const Gremlin = (g:{size:number, phase:number}) => {
    const s = g.size;
    const wig = Math.sin((lf + g.phase) / 4.5) * 3.2;
    const lunge = Math.sin((lf + g.phase) / 9) * 5;
    const breathe = 1 + Math.sin((lf + g.phase) / 6.5) * 0.03;
    return (
      <div style={{position:"absolute", left:-s/2, top:-s, width:s, height:s, transform:`translateX(${lunge}px) rotate(${wig*0.5}deg) scale(${breathe})`, transformOrigin:"50% 100%"}}>
        <div style={{position:"absolute", left:s*0.09, top:s*0.10, width:s*0.20, height:s*0.30, background:"linear-gradient(160deg,#6E5389,#3B2A4E)", borderRadius:"70% 10% 60% 20%", boxShadow:"0 2px 4px rgba(0,0,0,0.5)"}}/>
        <div style={{position:"absolute", left:s*0.70, top:s*0.10, width:s*0.20, height:s*0.30, background:"linear-gradient(200deg,#6E5389,#3B2A4E)", borderRadius:"10% 70% 20% 60%", boxShadow:"0 2px 4px rgba(0,0,0,0.5)"}}/>
        <div style={{position:"absolute", left:s*0.16, top:s*0.26, width:s*0.68, height:s*0.52, background:"linear-gradient(150deg,#7E5F9B 0%,#54406E 55%,#2E2140 100%)", borderRadius:"46% 46% 40% 40%", boxShadow:"inset 0 -6px 10px rgba(0,0,0,0.42), 0 6px 12px rgba(0,0,0,0.5)"}}/>
        <div style={{position:"absolute", left:s*0.22, top:s*0.30, width:s*0.30, height:s*0.12, background:"linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0))", borderRadius:"50%"}}/>
        <div style={{position:"absolute", left:s*0.19, top:s*0.40, width:s*0.20, height:s*0.05, background:"#2A1F3B", borderRadius:2, transform:"rotate(12deg)"}}/>
        <div style={{position:"absolute", left:s*0.61, top:s*0.40, width:s*0.20, height:s*0.05, background:"#2A1F3B", borderRadius:2, transform:"rotate(-12deg)"}}/>
        <div style={{position:"absolute", left:s*0.27, top:s*0.44, width:s*0.15, height:s*0.13, background:AMBER, borderRadius:"50%"}}/>
        <div style={{position:"absolute", left:s*0.30, top:s*0.47, width:s*0.06, height:s*0.07, background:INK, borderRadius:"50%"}}/>
        <div style={{position:"absolute", left:s*0.57, top:s*0.44, width:s*0.15, height:s*0.13, background:AMBER, borderRadius:"50%"}}/>
        <div style={{position:"absolute", left:s*0.60, top:s*0.47, width:s*0.06, height:s*0.07, background:INK, borderRadius:"50%"}}/>
        <div style={{position:"absolute", left:s*0.32, top:s*0.62, width:s*0.36, height:s*0.10, background:INK, borderRadius:3, clipPath:"polygon(0 0,10% 100%,22% 0,34% 100%,46% 0,58% 100%,70% 0,82% 100%,100% 0)"}}/>
        <div style={{position:"absolute", left:s*0.24, top:s*0.74, width:s*0.16, height:s*0.24, background:"linear-gradient(180deg,#54406E,#2A1F3B)", borderRadius:"30% 30% 40% 40%"}}/>
        <div style={{position:"absolute", left:s*0.60, top:s*0.74, width:s*0.16, height:s*0.24, background:"linear-gradient(180deg,#54406E,#2A1F3B)", borderRadius:"30% 30% 40% 40%"}}/>
        <div style={{position:"absolute", left:-s*0.06, top:s*0.94, width:s*1.12, height:s*0.16, borderRadius:"50%", background:"radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.66), rgba(0,0,0,0) 70%)"}}/>
      </div>
    );
  };

  const XStamp = (o:{at:number, sx:number, sy:number}) => {
    const p = over(lf, o.at, 9, Easing.out(Easing.cubic));
    if (p <= 0.001) return null;
    const sc = IV(p, [0, 0.72, 1], [1.9, 0.92, 1]);
    const jitter = Math.sin(lf / 3) * 0.6;
    return (
      <div style={{position:"absolute", left:o.sx - 55, top:o.sy - 55, width:110, height:110, transform:`scale(${sc}) rotate(${-13 + jitter}deg)`, opacity:IV(p,[0,0.25,1],[0,1,0.96]), zIndex:9}}>
        <div style={{position:"absolute", inset:0, borderRadius:"50%", border:`5px solid ${RED}`, background:"rgba(196,74,58,0.14)", boxShadow:"0 8px 18px rgba(0,0,0,0.45)"}}/>
        <div style={{position:"absolute", inset:9, borderRadius:"50%", border:`1px dashed rgba(196,74,58,0.5)`}}/>
        <div style={{position:"absolute", left:22, top:50, width:66, height:9, background:RED, borderRadius:5, transform:"rotate(45deg)"}}/>
        <div style={{position:"absolute", left:22, top:50, width:66, height:9, background:RED, borderRadius:5, transform:"rotate(-45deg)"}}/>
        <div style={{position:"absolute", left:26, top:-4, width:58, height:15, borderRadius:3, background:"rgba(196,74,58,0.9)", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <span style={{fontFamily:MONO, fontSize:10, fontWeight:800, letterSpacing:1.4, color:PAPER, whiteSpace:"nowrap"}}>VOID</span>
        </div>
      </div>
    );
  };

  const Ground = (o:{top:string, edge:string, pave:string}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, zIndex:2, pointerEvents:"none"}}>
      <div style={{position:"absolute", left:0, top:FLOOR - 6, width:CW, height:6, background:"linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.6))"}}/>
      <div style={{position:"absolute", left:0, top:FLOOR, width:CW, height:3, background:o.edge}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 3, width:CW, height:12, background:o.top}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 15, width:CW, height:CH - FLOOR - 15, background:o.pave}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 15, width:CW, height:CH - FLOOR - 15, opacity:0.26, background:"repeating-linear-gradient(90deg, rgba(236,233,226,0.16) 0 1px, rgba(0,0,0,0) 1px 56px)"}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 44, width:CW, height:1, background:"rgba(236,233,226,0.10)"}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 15, width:CW, height:26, background:"linear-gradient(180deg, rgba(236,233,226,0.06), rgba(236,233,226,0))"}}/>
      <div style={{position:"absolute", left:0, top:FLOOR + 3, width:CW, height:12, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 1px, rgba(0,0,0,0) 1px 30px)"}}/>
    </div>
  );

  const Cracks = (o:{n:number, tint:string}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, zIndex:3, pointerEvents:"none"}}>
      {Array.from({length:o.n}).map((_, i) => {
        const cx = 16 + seed(i * 4 + 1) * (CW - 80);
        const cy = FLOOR + 10 + seed(i * 9 + 2) * 42;
        const cwid = 22 + seed(i * 6 + 5) * 44;
        const rot = -22 + seed(i * 13 + 3) * 44;
        return (
          <div key={i}>
            <div style={{position:"absolute", left:cx, top:cy, width:cwid, height:2, background:o.tint, transform:`rotate(${rot}deg)`, borderRadius:1}}/>
            <div style={{position:"absolute", left:cx + cwid * 0.55, top:cy + 3, width:cwid * 0.4, height:2, background:o.tint, transform:`rotate(${-rot * 0.8}deg)`, borderRadius:1, opacity:0.8}}/>
            <div style={{position:"absolute", left:cx + cwid * 0.2, top:cy + 6, width:cwid * 0.26, height:1.5, background:o.tint, transform:`rotate(${rot * 1.4}deg)`, borderRadius:1, opacity:0.6}}/>
          </div>
        );
      })}
    </div>
  );

  const Patch = (o:{x:number, w:number, op?:number}) => (
    <div style={{position:"absolute", left:o.x - o.w/2, top:FLOOR + 4, width:o.w, height:30, borderRadius:"50%", background:`rgba(236,233,226,${(o.op ?? 0.20) * 0.30})`, zIndex:3, pointerEvents:"none"}}/>
  );

  const Stars = (o:{n:number, seedOff:number, maxY:number}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, zIndex:1, pointerEvents:"none"}}>
      {Array.from({length:o.n}).map((_, i) => {
        const sx = 8 + seed(i * 3 + o.seedOff) * (CW - 20);
        const sy = 6 + seed(i * 5 + o.seedOff + 2) * o.maxY;
        if ((sx < 214 && sy < 48) || (sx > 326 && sy < 42)) return null;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin((lf + i * 13) / 9));
        const r = 2 + seed(i * 7 + o.seedOff) * 2;
        return <div key={i} style={{position:"absolute", left:sx, top:sy, width:r, height:r, borderRadius:"50%", background:CREAM, opacity:0.26 + tw * 0.34}}/>;
      })}
    </div>
  );

  const Moon = (o:{x:number, y:number, s:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:o.s, height:o.s, zIndex:1, pointerEvents:"none"}}>
      <div style={{position:"absolute", inset:0, borderRadius:"50%", background:"linear-gradient(160deg, #ECE9E2 0%, #C4BFB2 58%, #8E8A7E 100%)", boxShadow:"0 6px 14px rgba(0,0,0,0.45)"}}/>
      <div style={{position:"absolute", left:o.s*0.52, top:o.s*0.26, width:o.s*0.20, height:o.s*0.20, borderRadius:"50%", background:"rgba(26,24,19,0.20)"}}/>
      <div style={{position:"absolute", left:o.s*0.26, top:o.s*0.58, width:o.s*0.16, height:o.s*0.16, borderRadius:"50%", background:"rgba(26,24,19,0.16)"}}/>
      <div style={{position:"absolute", left:o.s*0.60, top:o.s*0.62, width:o.s*0.10, height:o.s*0.10, borderRadius:"50%", background:"rgba(26,24,19,0.13)"}}/>
    </div>
  );

  const ArrowR = (o:{x:number, y:number, w:number, color:string, z:number, op?:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:o.w + 17, height:16, zIndex:o.z, opacity:o.op ?? 1}}>
      <div style={{position:"absolute", left:0, top:5, width:o.w, height:6, borderRadius:3, background:`linear-gradient(90deg, rgba(236,233,226,0), ${o.color})`}}/>
      <div style={{position:"absolute", left:o.w - 2, top:0, width:0, height:0, borderTop:"8px solid transparent", borderBottom:"8px solid transparent", borderLeft:`17px solid ${o.color}`}}/>
    </div>
  );

  const ArrowD = (o:{x:number, y:number, h:number, color:string, z:number}) => (
    <div style={{position:"absolute", left:o.x, top:o.y, width:20, height:o.h + 17, zIndex:o.z}}>
      <div style={{position:"absolute", left:7, top:0, width:6, height:o.h, borderRadius:3, background:`linear-gradient(180deg, rgba(236,233,226,0), ${o.color})`}}/>
      <div style={{position:"absolute", left:0, top:o.h - 2, width:0, height:0, borderLeft:"10px solid transparent", borderRight:"10px solid transparent", borderTop:`17px solid ${o.color}`}}/>
    </div>
  );

  const Skyline = (o:{base:number, tint:string, op:number, seedOff:number}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, opacity:o.op, zIndex:1}}>
      {[0,1,2,3,4,5,6].map(i => {
        const bw = 40 + Math.round(seed(i + o.seedOff) * 24);
        const bh = 46 + Math.round(seed(i * 3 + o.seedOff + 5) * 56);
        const bx = -4 + i * 62;
        return (
          <div key={i} style={{position:"absolute", left:bx, top:o.base - bh, width:bw, height:bh, background:o.tint, borderRadius:"3px 3px 0 0", boxShadow:"inset 0 2px 0 rgba(236,233,226,0.06), inset -6px 0 10px rgba(0,0,0,0.4)"}}>
            <div style={{position:"absolute", left:-3, top:-4, width:bw + 6, height:4, background:o.tint, borderRadius:"2px 2px 0 0"}}/>
            {[0,1,2,3,4,5].map(w => (
              <div key={w} style={{position:"absolute", left:6 + (w % 2) * 18, top:10 + Math.floor(w / 2) * 16, width:9, height:8, background:`rgba(231,178,76,${seed(i * 9 + w + o.seedOff) > 0.55 ? 0.30 : 0.09})`, borderRadius:1}}/>
            ))}
            <div style={{position:"absolute", left:0, top:0, width:bw, height:bh, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, rgba(0,0,0,0) 1px 11px)"}}/>
          </div>
        );
      })}
    </div>
  );

  const Dust = (o:{n:number, tint:string}) => (
    <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, zIndex:4, pointerEvents:"none"}}>
      {Array.from({length:o.n}).map((_, i) => {
        const sp = 0.5 + seed(i * 7 + 3) * 1.4;
        const px = ((seed(i * 5 + 1) * CW + lf * sp * 2.4) % (CW + 40)) - 20;
        const py = FLOOR - 10 - seed(i * 11 + 2) * 78 + Math.sin((lf + i * 9) / 11) * 5;
        return <div key={i} style={{position:"absolute", left:px, top:py, width:3, height:3, borderRadius:"50%", background:o.tint, opacity:0.30 + seed(i * 3) * 0.26}}/>;
      })}
    </div>
  );

  const Sil = (o:{x:number, h:number, i:number, op:number}) => {
    const bob = Math.abs(Math.sin((lf + o.i * 11) / 5)) * 3;
    const sway = Math.sin((lf + o.i * 11) / 5);
    const w = o.h * 0.38;
    return (
      <div style={{position:"absolute", left:o.x, top:FLOOR - o.h - bob, width:w, height:o.h, opacity:o.op, zIndex:5}}>
        <div style={{position:"absolute", left:w*0.24, top:0, width:w*0.52, height:w*0.52, borderRadius:"50%", background:"linear-gradient(160deg,#25313F,#121821)", boxShadow:"1px 0 0 rgba(154,150,139,0.30)"}}/>
        <div style={{position:"absolute", left:w*0.06, top:w*0.56, width:w*0.88, height:o.h*0.48, borderRadius:"7px 7px 3px 3px", background:"linear-gradient(180deg,#25313F,#121821)", boxShadow:"1px 0 0 rgba(154,150,139,0.26)"}}/>
        <div style={{position:"absolute", left:w*0.80, top:o.h*0.34, width:w*0.16, height:o.h*0.26, borderRadius:4, background:"#1B2530", transform:`rotate(${sway * 9}deg)`, transformOrigin:"50% 0%"}}/>
        <div style={{position:"absolute", left:w*0.20, top:o.h*0.70, width:w*0.20, height:o.h*0.30, background:"#121821", transform:`rotate(${sway * 7}deg)`, transformOrigin:"50% 0%"}}/>
        <div style={{position:"absolute", left:w*0.58, top:o.h*0.70, width:w*0.20, height:o.h*0.30, background:"#121821", transform:`rotate(${-sway * 7}deg)`, transformOrigin:"50% 0%"}}/>
        <div style={{position:"absolute", left:-w*0.16, top:o.h, width:w*1.32, height:6, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)"}}/>
      </div>
    );
  };

  const RunTag = (o:{n:number}) => (
    <div style={{position:"absolute", right:12, top:13, padding:"3px 9px", borderRadius:5, background:"rgba(10,17,32,0.92)", border:`1px solid ${SLATE}`, zIndex:13}}>
      <span style={{fontFamily:MONO, fontSize:13, letterSpacing:1.1, color:CREAM, fontWeight:700, whiteSpace:"nowrap"}}>{`RUN #${o.n}`}</span>
    </div>
  );

  const CellChrome = (o:{idx:number}) => {
    const cy = ((lf * 3.4 + o.idx * 61) % (CH + 40)) - 20;
    return (
      <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, zIndex:11, pointerEvents:"none"}}>
        {Array.from({length:14}).map((_, i) => (
          <div key={`t${i}`} style={{position:"absolute", left:28 + i * 30, top:0, width:1, height:i % 4 === 0 ? 9 : 5, background:`rgba(58,92,132,${i % 4 === 0 ? 0.7 : 0.4})`}}/>
        ))}
        {Array.from({length:14}).map((_, i) => (
          <div key={`b${i}`} style={{position:"absolute", left:28 + i * 30, bottom:HUD, width:1, height:i % 4 === 0 ? 9 : 5, background:`rgba(58,92,132,${i % 4 === 0 ? 0.6 : 0.32})`}}/>
        ))}
        {Array.from({length:8}).map((_, i) => (
          <div key={`l${i}`} style={{position:"absolute", left:0, top:32 + i * 26, width:i % 3 === 0 ? 9 : 5, height:1, background:`rgba(58,92,132,${i % 3 === 0 ? 0.6 : 0.34})`}}/>
        ))}
        {Array.from({length:8}).map((_, i) => (
          <div key={`r${i}`} style={{position:"absolute", right:0, top:32 + i * 26, width:i % 3 === 0 ? 9 : 5, height:1, background:`rgba(58,92,132,${i % 3 === 0 ? 0.6 : 0.34})`}}/>
        ))}
        <div style={{position:"absolute", left:CW / 2 - 13, top:CH / 2 - 13, width:26, height:26, opacity:0.30}}>
          <div style={{position:"absolute", left:12, top:0, width:1, height:9, background:SLATE}}/>
          <div style={{position:"absolute", left:12, top:17, width:1, height:9, background:SLATE}}/>
          <div style={{position:"absolute", left:0, top:12, width:9, height:1, background:SLATE}}/>
          <div style={{position:"absolute", left:17, top:12, width:9, height:1, background:SLATE}}/>
        </div>
        <div style={{position:"absolute", left:0, top:cy, width:CW, height:2, background:`linear-gradient(90deg, rgba(58,92,132,0), rgba(58,92,132,0.5), rgba(58,92,132,0))`}}/>
      </div>
    );
  };

  const CellShell = (o:any) => {
    const idx = o.idx;
    const failed = lf > stampFrames[idx] + 2;
    const pulse = over(lf, stampFrames[idx], 8, Easing.out(Easing.cubic));
    return (
      <div style={{position:"absolute", left:o.x, top:o.y, width:CW, height:CH, overflow:"hidden", background:o.bg}}>
        <div style={{position:"absolute", inset:0, opacity:0.10, background:"repeating-linear-gradient(90deg, rgba(154,150,139,0.9) 0px, rgba(154,150,139,0.9) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 46px), repeating-linear-gradient(0deg, rgba(154,150,139,0.7) 0px, rgba(154,150,139,0.7) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 46px)"}}/>
        <div style={{position:"absolute", inset:0, opacity:0.06, background:"repeating-linear-gradient(90deg, rgba(154,150,139,0.9) 0px, rgba(154,150,139,0.9) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 11.5px)"}}/>
        <div style={{position:"absolute", inset:0, opacity:0.18, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px)", zIndex:11, pointerEvents:"none"}}/>
        {o.children}
        <CellChrome idx={idx}/>
        <div style={{position:"absolute", left:0, top:0, width:CW, height:CH, boxShadow:`inset 0 0 0 1px rgba(58,92,132,${failed ? 0.24 : 0.55}), inset 0 0 44px rgba(0,0,0,0.5)`, pointerEvents:"none", zIndex:10}}/>
        <div style={{position:"absolute", left:8, top:8, width:16, height:16, borderLeft:`2px solid ${SLATE}`, borderTop:`2px solid ${SLATE}`, zIndex:12}}/>
        <div style={{position:"absolute", right:8, top:8, width:16, height:16, borderRight:`2px solid ${SLATE}`, borderTop:`2px solid ${SLATE}`, zIndex:12}}/>
        <div style={{position:"absolute", left:8, bottom:8, width:16, height:16, borderLeft:`2px solid ${SLATE}`, borderBottom:`2px solid ${SLATE}`, zIndex:14}}/>
        <div style={{position:"absolute", right:8, bottom:8, width:16, height:16, borderRight:`2px solid ${SLATE}`, borderBottom:`2px solid ${SLATE}`, zIndex:14}}/>
        <RunTag n={o.run}/>
        <div style={{position:"absolute", left:14, top:12, display:"flex", alignItems:"center", gap:7, padding:"5px 12px", borderRadius:7, background:"linear-gradient(180deg, #16233A, #0A1120)", border:`1px solid ${SLATE}`, boxShadow:"0 4px 9px rgba(0,0,0,0.5)", zIndex:13}}>
          <div style={{width:7, height:7, borderRadius:"50%", background: failed ? RED : SLATE}}/>
          <span style={{fontFamily:MONO, fontSize:15, letterSpacing:1.3, color:CREAM, fontWeight:700, whiteSpace:"nowrap"}}>{o.label}</span>
        </div>
        <div style={{position:"absolute", left:0, bottom:0, width:CW, height:HUD, background:"linear-gradient(180deg, rgba(10,17,32,0.62), #0A1120 45%)", borderTop:`1px solid rgba(58,92,132,0.42)`, zIndex:12}}/>
        <div style={{position:"absolute", left:0, bottom:HUD - 1, width:CW, height:1, background:"rgba(236,233,226,0.06)", zIndex:12}}/>
        <div style={{position:"absolute", left:14, bottom:6, display:"flex", alignItems:"center", gap:8, zIndex:13}}>
          <div style={{width:9, height:9, background:RED, borderRadius:2, transform:`scale(${1 + Math.max(0, pulse * (1 - pulse) * 2.2)})`}}/>
          <span style={{fontFamily:MONO, fontSize:15, fontWeight:800, letterSpacing:1, color:RED, whiteSpace:"nowrap"}}>{o.stat}</span>
        </div>
        <div style={{position:"absolute", right:14, bottom:8, display:"flex", alignItems:"center", gap:7, zIndex:13}}>
          <div style={{position:"relative", width:58, height:7, borderRadius:4, background:"rgba(236,233,226,0.12)", overflow:"hidden"}}>
            <div style={{position:"absolute", left:0, top:0, width:`${IV(lf,[popFrames[idx], stampFrames[idx]],[6,100])}%`, height:7, background:`linear-gradient(90deg, ${CLAY}, ${RED})`}}/>
            <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 1px, rgba(0,0,0,0) 1px 9px)", opacity:0.5}}/>
          </div>
          <span style={{fontFamily:MONO, fontSize:13, fontWeight:800, letterSpacing:1.4, color:RED}}>FAIL</span>
        </div>
        <XStamp at={stampFrames[idx]} sx={o.sx} sy={o.sy}/>
      </div>
    );
  };

  const popA = over(lf, popFrames[0], 10, Easing.out(Easing.back(1.5)));
  const popB = over(lf, popFrames[1], 10, Easing.out(Easing.back(1.5)));
  const popC = over(lf, popFrames[2], 10, Easing.out(Easing.back(1.5)));
  const popD = over(lf, popFrames[3], 10, Easing.out(Easing.back(1.5)));

  const dGhost = over(lf, 14, 10, Easing.out(Easing.cubic));
  const dWalls = over(lf, 22, 10, Easing.out(Easing.back(1.2)));
  const dSign = over(lf, 30, 8, Easing.out(Easing.cubic));
  const dCrowd = over(lf, 38, 10, Easing.out(Easing.cubic));
  const dCopy = over(lf, 48, 9, Easing.out(Easing.back(2)));

  const priceTags = [{t:"$48", cx:250, r:-8}, {t:"$52", cx:296, r:5}, {t:"$60", cx:342, r:-4}];
  const crowdD = [{x0:160, x1:190, s:74, d:0}, {x0:238, x1:268, s:74, d:6}, {x0:316, x1:346, s:74, d:12}];
  const coins = [0,1,2,3,4,5,6,7,8,9];
  const custX = IV(lf, [26, 96], [388, 416]);
  const custOp = IV(lf, [26, 96], [1, 0.5]);
  const lampFlick = 0.6 + 0.4 * Math.abs(Math.sin(lf / 2.6)) * (seed(Math.floor(lf / 4) + 3) > 0.22 ? 1 : 0.4);

  return (
    <AbsoluteFill style={{background:"linear-gradient(175deg,#101A2B 0%,#0E1626 45%,#0A1120 100%)"}}>
      <div style={{position:"absolute", inset:0, transform:`scale(${camScale})`, transformOrigin:"50% 50%"}}>

        <div style={{position:"absolute", inset:0, opacity:0.08, background:"repeating-linear-gradient(0deg, rgba(154,150,139,0.6) 0px, rgba(154,150,139,0.6) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px)"}}/>
        <div style={{position:"absolute", inset:0, opacity:0.05, background:"repeating-linear-gradient(90deg, rgba(154,150,139,0.6) 0px, rgba(154,150,139,0.6) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 60px)"}}/>
        <div style={{position:"absolute", left:bankX, top:640, width:700, height:120, borderRadius:"50%", background:"radial-gradient(ellipse at 50% 50%, rgba(58,92,132,0.20), rgba(58,92,132,0) 70%)", zIndex:0}}/>
        <div style={{position:"absolute", left:760 - bankX, top:96, width:520, height:90, borderRadius:"50%", background:"radial-gradient(ellipse at 50% 50%, rgba(58,92,132,0.14), rgba(58,92,132,0) 70%)", zIndex:0}}/>

        <SimTag text="SANDBOX" x={846} y={20}/>

        <div style={{position:"absolute", left:0, top:26, width:1012, textAlign:"center", zIndex:5}}>
          <span style={{fontFamily:SERIF, fontSize:46, fontWeight:800, letterSpacing:-0.5, color:CREAM, textShadow:"0 4px 18px rgba(0,0,0,0.6)"}}>RUN IT </span>
          <span style={{fontFamily:SERIF, fontSize:46, fontWeight:800, letterSpacing:-0.5, color:CLAY, textShadow:"0 4px 18px rgba(0,0,0,0.6)"}}>AGAIN</span>
        </div>

        <div style={{position:"absolute", left:406, top:94, width:200, height:36, display:"flex", alignItems:"center", justifyContent:"center", gap:9, borderRadius:10, background:"linear-gradient(180deg, #16233A, #0A1120)", border:`1px solid ${GOLD}`, boxShadow:"0 6px 14px rgba(0,0,0,0.5)", zIndex:6, transform:`scale(${1 + Math.sin(lf/2.2)*0.012})`}}>
          <div style={{width:8, height:8, borderRadius:"50%", background:GOLD, opacity:0.65 + Math.abs(Math.sin(lf/2.4))*0.35}}/>
          <span style={{fontFamily:MONO, fontSize:18, fontWeight:800, letterSpacing:1.6, color:GOLD}}>{`RUN ${runN} / 40`}</span>
        </div>
        <div style={{position:"absolute", left:302, top:104, width:92, height:16, zIndex:5}}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{position:"absolute", left:i * 15, top:6, width:9, height:4, borderRadius:2, background:i < (runN % 7) ? GOLD : "rgba(231,178,76,0.20)"}}/>
          ))}
        </div>
        <div style={{position:"absolute", left:618, top:104, width:92, height:16, zIndex:5}}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{position:"absolute", left:i * 15, top:6, width:9, height:4, borderRadius:2, background:i < ((runN + 3) % 7) ? CLAY : "rgba(210,114,78,0.20)"}}/>
          ))}
        </div>

        <div style={{position:"absolute", left:GX-14, top:GY-12, width:GW+28, height:GH+24, borderRadius:24, background:"linear-gradient(180deg, rgba(58,92,132,0.14), rgba(58,92,132,0.04))", border:`1px solid rgba(58,92,132,0.45)`, zIndex:1}}/>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <div key={i} style={{position:"absolute", left:GX + 10 + i * 74, top:GY - 20, width:1, height:i % 3 === 0 ? 8 : 4, background:`rgba(58,92,132,${i % 3 === 0 ? 0.75 : 0.4})`, zIndex:2}}/>
        ))}

        <div style={{position:"absolute", left:GX, top:GY, width:GW, height:GH, borderRadius:18, overflow:"hidden", background:TERM2, border:`2px solid ${SLATE}`, boxShadow:"0 22px 60px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.55)", zIndex:3}}>

          <CellShell idx={0} x={0} y={0} run={37} sx={300} sy={150} label="TOO PRICEY" stat="CUSTOMERS 0" bg="linear-gradient(180deg,#17253A 0%,#0A1120 100%)">
            <Stars n={16} seedOff={3} maxY={72}/>
            <Moon x={238} y={14} s={38}/>
            <Spires base={FLOOR - 30} tint="#16233A" op={0.55} seedOff={4} drift={5}/>
            <Haze top={FLOOR - 78} h={62} c="rgba(23,37,58,0.85)" op={0.7}/>
            <Skyline base={FLOOR - 4} tint="#131F31" op={0.85} seedOff={2}/>
            <MidBlock x={330} w={92} top={64} tint="linear-gradient(180deg,#1D2C42,#0F1A29)" lit="#2C4059" op={0.85} seedOff={6}/>
            <div style={{position:"absolute", left:8, top:52, width:224, height:12, borderRadius:4, background:"linear-gradient(180deg,#3A5C84,#1B2A3D)", boxShadow:"0 5px 12px rgba(0,0,0,0.55)", zIndex:2}}/>
            <div style={{position:"absolute", left:14, top:58, width:212, height:FLOOR-58, borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg,#2B4260 0%,#1C2E44 55%,#121D2C 100%)", boxShadow:"inset 0 -14px 28px rgba(0,0,0,0.5), inset 2px 0 0 rgba(236,233,226,0.08), 0 12px 22px rgba(0,0,0,0.55)", zIndex:2}}/>
            <div style={{position:"absolute", left:14, top:58, width:212, height:FLOOR-58, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.20) 0 1px, rgba(0,0,0,0) 1px 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 1px, rgba(0,0,0,0) 1px 24px)", zIndex:2, opacity:0.7}}/>
            <div style={{position:"absolute", left:14, top:62, width:212, height:22, background:`repeating-linear-gradient(90deg,${ORANGE} 0 18px, ${PAPER} 18px 36px)`, borderRadius:"8px 8px 3px 3px", boxShadow:"0 6px 14px rgba(0,0,0,0.55), inset 0 -5px 8px rgba(0,0,0,0.24)", zIndex:3, transform:`skewY(${Math.sin(lf/13)*0.4}deg)`, transformOrigin:"0% 0%"}}/>
            <Scallop x={14} y={83} w={212} n={11} c={ORANGE} z={3}/>
            <div style={{position:"absolute", left:14, top:92, width:212, height:14, background:"linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0))", zIndex:2}}/>
            <div style={{position:"absolute", left:60, top:92, width:2, height:8, background:"rgba(236,233,226,0.4)", zIndex:3}}/>
            <div style={{position:"absolute", left:180, top:92, width:2, height:8, background:"rgba(236,233,226,0.4)", zIndex:3}}/>
            <div style={{position:"absolute", left:54, top:100, width:132, height:26, borderRadius:6, background:"linear-gradient(180deg,#132038,#0A1120)", border:`1px solid ${GOLD}`, boxShadow:"0 5px 10px rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:4}}>
              <span style={{fontFamily:MONO, fontSize:14, color:GOLD, letterSpacing:0.6, fontWeight:700, whiteSpace:"nowrap"}}>CLAUDE CORNER</span>
            </div>
            <div style={{position:"absolute", left:26, top:132, width:70, height:FLOOR-132, borderRadius:"5px 5px 0 0", background:"linear-gradient(165deg,#E7B24C 0%,#CF9544 60%,#7C5A22 100%)", boxShadow:"inset 0 2px 0 rgba(247,243,234,0.28), 0 8px 16px rgba(0,0,0,0.45)", zIndex:2}}/>
            <div style={{position:"absolute", left:60, top:132, width:2, height:FLOOR-132, background:"rgba(26,24,19,0.5)", zIndex:3}}/>
            <div style={{position:"absolute", left:26, top:156, width:70, height:2, background:"rgba(26,24,19,0.5)", zIndex:3}}/>
            <div style={{position:"absolute", left:24, top:FLOOR-6, width:74, height:5, borderRadius:2, background:"linear-gradient(180deg,#3A5C84,#1B2A3D)", zIndex:3}}/>
            <div style={{position:"absolute", left:150, top:132, width:70, height:FLOOR-132, borderRadius:"5px 5px 0 0", background:"linear-gradient(165deg,#E7B24C 0%,#CF9544 60%,#7C5A22 100%)", boxShadow:"inset 0 2px 0 rgba(247,243,234,0.28), 0 8px 16px rgba(0,0,0,0.45)", zIndex:2}}/>
            <div style={{position:"absolute", left:184, top:132, width:2, height:FLOOR-132, background:"rgba(26,24,19,0.5)", zIndex:3}}/>
            <div style={{position:"absolute", left:150, top:156, width:70, height:2, background:"rgba(26,24,19,0.5)", zIndex:3}}/>
            <div style={{position:"absolute", left:148, top:FLOOR-6, width:74, height:5, borderRadius:2, background:"linear-gradient(180deg,#3A5C84,#1B2A3D)", zIndex:3}}/>
            <div style={{position:"absolute", left:104, top:128, width:38, height:FLOOR-128, borderRadius:"5px 5px 0 0", background:"linear-gradient(180deg,#1A2B41,#0C1626)", border:`1px solid rgba(58,92,132,0.5)`, zIndex:2}}/>
            <div style={{position:"absolute", left:108, top:134, width:30, height:5, borderRadius:2, background:"rgba(236,233,226,0.10)", zIndex:3}}/>
            <div style={{position:"absolute", left:132, top:158, width:6, height:6, borderRadius:"50%", background:GOLD, zIndex:3}}/>
            <div style={{position:"absolute", left:106, top:146, width:12, height:3, borderRadius:2, background:"rgba(236,233,226,0.24)", zIndex:3}}/>
            <Mat x={100} y={FLOOR - 2} w={48} op={1} z={3}/>
            <div style={{position:"absolute", left:222, top:60, width:5, height:FLOOR-60, background:"linear-gradient(90deg,#4A5A6C,#1B2531)", borderRadius:2, zIndex:3}}/>
            {[0,1,2].map(i => (
              <div key={i} style={{position:"absolute", left:220, top:84 + i * 32, width:9, height:4, borderRadius:2, background:"#3A4757", zIndex:3}}/>
            ))}
            <Planter x={196} y={FLOOR - 30} w={26} c="#6B4E2E" op={1} z={4} ph={5}/>
            <HangSign x={226} y={44} w={132} label="OPEN TILL 9" c={GOLD} op={1} z={6} ph={0}/>
            {priceTags.map((p, i) => {
              const tp = over(lf, popFrames[0] + 2 + i*4, 9, Easing.out(Easing.back(2)));
              const sw = Math.sin((lf + i*19)/7) * 5;
              return (
                <div key={i} style={{position:"absolute", left:p.cx - 24, top:104, width:48, height:40, opacity:tp, transformOrigin:"50% 0%", transform:`rotate(${sw*0.55 + p.r*0.35}deg) scale(${IV(tp,[0,1],[0.4,1])})`, zIndex:7}}>
                  <div style={{position:"absolute", left:23, top:0, width:2, height:12, background:"rgba(236,233,226,0.8)"}}/>
                  <div style={{position:"absolute", left:0, top:10, width:48, height:28, borderRadius:6, background:`linear-gradient(180deg,${PAPER},#DDD3C0)`, border:"2px solid #A9663A", boxShadow:"0 7px 13px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.7)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <span style={{fontFamily:MONO, fontSize:17, fontWeight:800, color:RED, whiteSpace:"nowrap"}}>{p.t}</span>
                  </div>
                  <div style={{position:"absolute", left:21, top:14, width:6, height:6, borderRadius:"50%", background:"#6E4322"}}/>
                </div>
              );
            })}
            <Ground top="linear-gradient(180deg,#33506F,#1F3145)" edge="rgba(58,92,132,0.85)" pave="linear-gradient(180deg,#101B29,#0A1120)"/>
            <Patch x={280} w={240} op={0.22}/>
            <Cracks n={6} tint="rgba(154,150,139,0.26)"/>
            <Dust n={11} tint="rgba(236,233,226,0.5)"/>
            <Pop p={popA} z={6}>
              <Actor x={280} groundY={FLOOR} size={100} shadow={1}>
                <Mascot lf={lf} size={100} chef apron={1} gaze={IV(lf,[16,76],[3,-2])} nodAmp={2}/>
              </Actor>
            </Pop>
            <div style={{position:"absolute", left:222, top:146, width:114, height:FLOOR-146, borderRadius:"6px 6px 0 0", background:"linear-gradient(180deg,#4A3323 0%,#2E2016 60%,#1C130C 100%)", boxShadow:"0 -3px 10px rgba(0,0,0,0.5), inset 0 2px 0 rgba(236,233,226,0.14)", opacity:popA, zIndex:8}}/>
            <div style={{position:"absolute", left:222, top:146, width:114, height:FLOOR-146, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0 1px, rgba(0,0,0,0) 1px 15px)", opacity:popA * 0.7, zIndex:8}}/>
            <div style={{position:"absolute", left:218, top:142, width:122, height:7, borderRadius:4, background:"linear-gradient(180deg,#7A5734,#3E2A18)", boxShadow:"0 3px 7px rgba(0,0,0,0.5)", opacity:popA, zIndex:8}}/>
            <div style={{position:"absolute", left:230, top:158, width:36, height:9, borderRadius:2, background:"rgba(236,233,226,0.10)", opacity:popA, zIndex:9}}/>
            <div style={{position:"absolute", left:230, top:170, width:36, height:2, borderRadius:2, background:"rgba(236,233,226,0.07)", opacity:popA, zIndex:9}}/>
            {[0,1,2].map(i => (
              <div key={i} style={{position:"absolute", left:238 + i*20, top:126, width:16, height:18, borderRadius:"2px 2px 6px 6px", background:`linear-gradient(180deg,${PAPER},#A8A091)`, boxShadow:"0 3px 6px rgba(0,0,0,0.55)", opacity:popA, zIndex:9, transform:`translateY(${Math.sin((lf + i*11)/12) * 0.8}px)`}}/>
            ))}
            <div style={{position:"absolute", left:300, top:118, width:34, height:26, borderRadius:"18px 18px 3px 3px", background:"linear-gradient(180deg, rgba(236,233,226,0.26), rgba(154,150,139,0.10))", border:"1px solid rgba(236,233,226,0.36)", opacity:popA, zIndex:9}}/>
            <div style={{position:"absolute", left:306, top:132, width:22, height:10, borderRadius:3, background:`linear-gradient(180deg,${AMBER},#6E4A18)`, opacity:popA, zIndex:9}}/>
            <Steam x={300} y={78} op={popA} z={9} ph={0} c="rgba(236,233,226,0.75)"/>
            <div style={{position:"absolute", left:372, top:44, width:74, height:52, opacity:over(lf, popFrames[0]+6, 10, Easing.out(Easing.cubic)), transform:`scale(${IV(over(lf, popFrames[0]+6, 10, Easing.out(Easing.back(2))),[0,1],[0.45,1])})`, transformOrigin:"60% 100%", zIndex:9}}>
              <div style={{position:"absolute", left:0, top:0, width:74, height:38, borderRadius:11, background:`linear-gradient(180deg,${PAPER},#D8CEBD)`, border:"2px solid rgba(26,24,19,0.45)", boxShadow:"0 7px 14px rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <span style={{fontFamily:MONO, fontSize:18, fontWeight:800, color:RED, whiteSpace:"nowrap"}}>$52?!</span>
              </div>
              <div style={{position:"absolute", left:20, top:34, width:0, height:0, borderLeft:"9px solid transparent", borderRight:"9px solid transparent", borderTop:"14px solid #E0D6C5"}}/>
            </div>
            <Pop p={over(lf, popFrames[0]+5, 10, Easing.out(Easing.cubic))} z={6}>
              <div style={{opacity:custOp}}>
                <Actor x={custX} groundY={FLOOR} size={100} flip shadow={1}>
                  <Mascot lf={lf} size={100} beanie={1} scarf={1} cup={1} shock={IV(lf,[26,48],[0.35,1])} gaze={-5}/>
                </Actor>
              </div>
            </Pop>
            {[0,1,2].map(i => (
              <div key={i} style={{position:"absolute", left:340 - i*14, top:120 + i*4, width:9, height:20, borderRadius:5, background:"rgba(236,233,226,0.22)", opacity:popA * (0.5 - i*0.13), zIndex:5}}/>
            ))}
            {[48, 140].map((px, i) => (
              <div key={i} style={{position:"absolute", left:px, top:FLOOR+2, width:12, height:34, opacity:popA, zIndex:8}}>
                <div style={{position:"absolute", left:3, top:0, width:6, height:26, background:"linear-gradient(180deg,#C6B48A,#5C4E2C)", borderRadius:3}}/>
                <div style={{position:"absolute", left:0, top:-6, width:12, height:9, borderRadius:"50%", background:`linear-gradient(180deg,${GOLD},#8A6413)`}}/>
                <div style={{position:"absolute", left:-2, top:26, width:16, height:8, borderRadius:"50%", background:"linear-gradient(180deg,#4C4230,#221D14)"}}/>
              </div>
            ))}
            <div style={{position:"absolute", left:56, top:FLOOR+8 + Math.sin(lf/9)*1.5, width:88, height:14, borderRadius:"0 0 40px 40px", borderBottom:`4px solid ${CLAY}`, borderLeft:`2px solid rgba(210,114,78,0.5)`, borderRight:`2px solid rgba(210,114,78,0.5)`, opacity:popA, zIndex:8}}/>
            <div style={{position:"absolute", left:36, top:FLOOR+42, width:118, height:26, borderRadius:6, background:"linear-gradient(180deg,#16233A,#0A1120)", border:`1px solid ${RED}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 10px rgba(0,0,0,0.5)", opacity:popA, zIndex:9}}>
              <span style={{fontFamily:MONO, fontSize:14, fontWeight:800, color:RED, letterSpacing:1, whiteSpace:"nowrap"}}>0 IN LINE</span>
            </div>
            <Board x={2} y={FLOOR + 8} op={popA} z={9} l1="MENU" l2="" ph={9}/>
            {[0,1,2,3].map(i => (
              <div key={i} style={{position:"absolute", left:184 + (i%2)*18, top:FLOOR+34 + Math.floor(i/2)*11, width:16, height:16, borderRadius:"50%", background:`linear-gradient(160deg,${GOLD},#8A6413)`, boxShadow:"0 3px 6px rgba(0,0,0,0.55), inset 0 -3px 5px rgba(0,0,0,0.3)", opacity:popA, zIndex:9}}/>
            ))}
            <div style={{opacity:popA * IV(lf,[22,36],[0,1]), transform:`translateY(${Math.sin(lf/6)*3}px)`}}>
              <ArrowD x={236} y={FLOOR+22} h={28} color={RED} z={9}/>
            </div>
            <div style={{position:"absolute", left:302, top:FLOOR+46, width:44, height:18, borderRadius:2, background:`linear-gradient(180deg,${PAPER},#B6AC9A)`, transform:"rotate(-13deg)", boxShadow:"0 3px 6px rgba(0,0,0,0.55)", zIndex:9, opacity:popA}}>
              <div style={{position:"absolute", left:5, top:4, width:26, height:2, background:"rgba(26,24,19,0.5)"}}/>
              <div style={{position:"absolute", left:5, top:10, width:16, height:2, background:"rgba(26,24,19,0.5)"}}/>
            </div>
            <Bin x={412} y={FLOOR + 24} op={popA} z={9}/>
          </CellShell>

          <CellShell idx={1} x={CW+2} y={0} run={38} sx={140} sy={186} label="WRONG SPOT" stat="FOOT TRAFFIC 0/hr" bg="linear-gradient(180deg,#142134 0%,#0A1120 100%)">
            <Stars n={18} seedOff={11} maxY={78}/>
            <Moon x={252} y={12} s={34}/>
            <Spires base={FLOOR - 44} tint="#131F30" op={0.45} seedOff={13} drift={7}/>
            <Skyline base={FLOOR - 26} tint="#101B2B" op={0.7} seedOff={9}/>
            <Haze top={FLOOR - 62} h={62} c="rgba(10,17,32,0.9)" op={0.85}/>
            <div style={{position:"absolute", left:0, top:FLOOR-34, width:CW, height:34, background:"linear-gradient(180deg,rgba(10,17,32,0),rgba(10,17,32,0.92))", zIndex:1}}/>
            <div style={{position:"absolute", left:24, top:40, width:44, height:16, borderRadius:"7px 7px 3px 3px", background:"linear-gradient(180deg,#4E6480,#1E2C3E)", boxShadow:"0 4px 9px rgba(0,0,0,0.55)", zIndex:6}}/>
            <div style={{position:"absolute", left:32, top:54, width:28, height:11, borderRadius:"0 0 8px 8px", background:`linear-gradient(180deg,${GOLD},#8A6413)`, opacity:0.6 + lampFlick*0.4, zIndex:6}}/>
            <div style={{position:"absolute", left:42, top:56, width:7, height:FLOOR-56, background:"linear-gradient(180deg,#3A5C84,#131E2C)", borderRadius:3, zIndex:6}}/>
            <div style={{position:"absolute", left:40, top:110, width:11, height:4, borderRadius:2, background:"#25313F", zIndex:6}}/>
            <div style={{position:"absolute", left:36, top:FLOOR-8, width:19, height:10, borderRadius:2, background:"#1E2A38", zIndex:6}}/>
            <div style={{position:"absolute", left:8, top:52, width:174, height:11, borderRadius:3, background:"linear-gradient(180deg,#334A66,#182434)", zIndex:2}}/>
            <div style={{position:"absolute", left:14, top:58, width:162, height:FLOOR-58, borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg,#284058 0%,#1A2C40 55%,#111C2A 100%)", boxShadow:"inset 0 -12px 24px rgba(0,0,0,0.45), inset 2px 0 0 rgba(236,233,226,0.07), 0 10px 18px rgba(0,0,0,0.5)", zIndex:2}}/>
            <div style={{position:"absolute", left:14, top:58, width:162, height:FLOOR-58, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.20) 0 1px, rgba(0,0,0,0) 1px 10px)", opacity:0.7, zIndex:2}}/>
            <div style={{position:"absolute", left:14, top:62, width:162, height:20, background:`repeating-linear-gradient(90deg,${ORANGE} 0 16px,${PAPER} 16px 32px)`, borderRadius:"8px 8px 3px 3px", boxShadow:"0 5px 11px rgba(0,0,0,0.5)", zIndex:3, transform:`skewY(${Math.sin(lf/11 + 1)*0.5}deg)`, transformOrigin:"0% 0%"}}/>
            <Scallop x={14} y={81} w={162} n={9} c={ORANGE} z={3}/>
            <div style={{position:"absolute", left:54, top:90, width:104, height:24, borderRadius:5, background:TERM, border:`1px solid ${GOLD}`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:4}}>
              <span style={{fontFamily:MONO, fontSize:15, color:GOLD, letterSpacing:3, fontWeight:700}}>OPEN</span>
            </div>
            <div style={{position:"absolute", left:60, top:124, width:46, height:FLOOR-124, borderRadius:"4px 4px 0 0", background:"linear-gradient(180deg,#182C46,#0C1626)", border:`1px solid rgba(58,92,132,0.45)`, zIndex:3}}/>
            <div style={{position:"absolute", left:64, top:130, width:38, height:5, borderRadius:2, background:"rgba(236,233,226,0.10)", zIndex:4}}/>
            <div style={{position:"absolute", left:100, top:150, width:5, height:5, borderRadius:"50%", background:GOLD, zIndex:4}}/>
            <div style={{position:"absolute", left:62, top:142, width:11, height:3, borderRadius:2, background:"rgba(236,233,226,0.22)", zIndex:4}}/>
            <Mat x={56} y={FLOOR - 2} w={54} op={1} z={4}/>
            <div style={{position:"absolute", left:114, top:120, width:56, height:40, borderRadius:4, background:"linear-gradient(160deg,#1E3450,#0C1626)", border:`1px solid rgba(58,92,132,0.45)`, boxShadow:"inset 0 0 16px rgba(0,0,0,0.6)", zIndex:3}}/>
            <div style={{position:"absolute", left:141, top:120, width:1, height:40, background:"rgba(58,92,132,0.5)", zIndex:4}}/>
            <div style={{position:"absolute", left:114, top:139, width:56, height:1, background:"rgba(58,92,132,0.42)", zIndex:4}}/>
            <div style={{position:"absolute", left:112, top:160, width:60, height:4, borderRadius:2, background:"linear-gradient(180deg,#334A66,#182434)", zIndex:4}}/>
            <div style={{position:"absolute", left:120, top:126, width:20, height:28, background:"linear-gradient(180deg,rgba(236,233,226,0.10),rgba(236,233,226,0))", borderRadius:3, zIndex:3}}/>
            <Planter x={178} y={FLOOR - 32} w={28} c="#5D4227" op={1} z={4} ph={17}/>
            <div style={{position:"absolute", left:286, top:70, width:102, height:FLOOR-70, background:"linear-gradient(180deg,#1E293A,#0E1725)", borderRadius:"4px 4px 0 0", boxShadow:"inset 0 0 20px rgba(0,0,0,0.65), 0 8px 16px rgba(0,0,0,0.5)", zIndex:2}}/>
            <div style={{position:"absolute", left:290, top:88, width:94, height:FLOOR-96, background:"repeating-linear-gradient(0deg,#2F4155 0 5px,#19232F 5px 10px)", borderRadius:2, boxShadow:"inset 0 0 14px rgba(0,0,0,0.7)", zIndex:3}}/>
            <div style={{position:"absolute", left:286, top:70, width:102, height:9, background:"linear-gradient(180deg,#42566E,#1E2A38)", borderRadius:"3px 3px 0 0", zIndex:3}}/>
            <div style={{position:"absolute", left:294, top:79, width:86, height:4, background:"rgba(0,0,0,0.4)", zIndex:3}}/>
            <div style={{position:"absolute", left:298, top:120, transform:"rotate(-9deg)", zIndex:4}}>
              <span style={{fontFamily:SERIF, fontSize:24, fontWeight:800, color:GOLD, letterSpacing:1, whiteSpace:"nowrap"}}>ZAP</span>
            </div>
            <div style={{position:"absolute", left:290, top:150, width:96, height:5, borderRadius:3, background:`linear-gradient(90deg, rgba(196,74,58,0.7), rgba(196,74,58,0))`, zIndex:4}}/>
            <div style={{position:"absolute", left:200, top:26, width:6, height:FLOOR-26, background:"linear-gradient(180deg,#33465C,#121D2A)", zIndex:1, opacity:0.9}}/>
            <div style={{position:"absolute", left:186, top:38, width:34, height:5, borderRadius:2, background:"#33465C", zIndex:1}}/>
            <div style={{position:"absolute", left:186, top:52, width:34, height:5, borderRadius:2, background:"#33465C", zIndex:1}}/>
            <div style={{position:"absolute", left:-10, top:34, width:200, height:24, borderTop:`2px solid rgba(154,150,139,0.45)`, borderRadius:"0 0 60% 60%", zIndex:1}}/>
            <div style={{position:"absolute", left:-10, top:48, width:200, height:24, borderTop:`2px solid rgba(154,150,139,0.35)`, borderRadius:"0 0 60% 60%", zIndex:1}}/>
            <div style={{position:"absolute", left:216, top:34, width:250, height:26, borderTop:`2px solid rgba(154,150,139,0.4)`, borderRadius:"0 0 60% 60%", zIndex:1}}/>
            <div style={{position:"absolute", left:216, top:48, width:250, height:26, borderTop:`2px solid rgba(154,150,139,0.3)`, borderRadius:"0 0 60% 60%", zIndex:1}}/>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{position:"absolute", left:24 + i * 74, top:40 + Math.sin((lf + i * 20) / 14) * 2, width:5, height:5, borderRadius:"50%", background:"rgba(154,150,139,0.5)", zIndex:1}}/>
            ))}
            <div style={{position:"absolute", left:394, top:44, width:52, height:66, opacity:popB, transform:`translateY(${IV(popB,[0,1],[-46,0])}px) scale(${IV(popB,[0,1],[0.5,1])})`, zIndex:7}}>
              <div style={{position:"absolute", left:2, top:0, width:48, height:48, borderRadius:"50% 50% 50% 4%", transform:"rotate(45deg)", background:`linear-gradient(150deg,#D2724E,#8E3325)`, boxShadow:"0 9px 18px rgba(0,0,0,0.55), inset 0 -6px 12px rgba(0,0,0,0.3)"}}/>
              <div style={{position:"absolute", left:18, top:14, width:17, height:17, borderRadius:"50%", background:TERM2, boxShadow:"inset 0 2px 4px rgba(0,0,0,0.7)"}}/>
              <div style={{position:"absolute", left:20, top:34, width:13, height:3, borderRadius:2, background:"rgba(26,24,19,0.4)"}}/>
              <div style={{position:"absolute", left:12, top:58, width:30, height:7, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(0,0,0,0.5), rgba(0,0,0,0) 70%)"}}/>
            </div>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{position:"absolute", left:412, top:112 + i*13, width:3, height:7, borderRadius:2, background:"rgba(196,74,58,0.6)", opacity:popB, zIndex:5}}/>
            ))}
            <Ground top="linear-gradient(180deg,#3B4A3C,#212C25)" edge="rgba(58,92,132,0.7)" pave="linear-gradient(180deg,#0F1A27,#0A1120)"/>
            <div style={{position:"absolute", left:0, top:FLOOR+16, width:CW, height:52, background:"linear-gradient(180deg,#1A2433,#0C131E)", clipPath:"polygon(0% 100%, 100% 100%, 100% 22%, 0% 0%)", zIndex:3, opacity:0.9}}/>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{position:"absolute", left:170 + i*46, top:FLOOR + 48 - i*2, width:26, height:4, borderRadius:2, background:"rgba(231,178,76,0.32)", zIndex:4}}/>
            ))}
            <Patch x={40} w={190} op={0.26}/>
            <Cracks n={10} tint="rgba(154,150,139,0.3)"/>
            <div style={{opacity:popB}}>
              <ArrowR x={286} y={100} w={86} color={SLATE} z={5} op={0.85}/>
            </div>
            {[0,1,2,3].map(i => {
              const st = popFrames[1] + 4 + i*3;
              const w = ramp(lf, st, st + 56);
              return <Sil key={i} x={294 + i*28 + w*36} h={64 + (i%2)*8} i={i} op={over(lf, st, 8, Easing.out(Easing.cubic)) * 0.9}/>;
            })}
            <div style={{position:"absolute", left:60, top:FLOOR + 6, width:126, height:38, opacity:popB, zIndex:8}}>
              <div style={{position:"absolute", left:0, top:8, width:126, height:9, borderRadius:3, background:"linear-gradient(180deg,#546A80,#26333F)", boxShadow:"0 4px 8px rgba(0,0,0,0.55)"}}/>
              <div style={{position:"absolute", left:0, top:0, width:126, height:7, borderRadius:3, background:"linear-gradient(180deg,#63798E,#2E3D4B)"}}/>
              <div style={{position:"absolute", left:10, top:17, width:7, height:21, background:"#2A3743"}}/>
              <div style={{position:"absolute", left:108, top:17, width:7, height:21, background:"#2A3743"}}/>
              <div style={{position:"absolute", left:22, top:19, width:82, height:3, borderRadius:2, background:"rgba(0,0,0,0.34)"}}/>
            </div>
            <Crates x={196} y={FLOOR + 22} op={popB} z={8}/>
            <Bike x={4} y={FLOOR + 18} op={popB} z={8} c="#4E6480"/>
            <div style={{position:"absolute", left:330, top:FLOOR + 16, width:116, height:26, borderRadius:6, background:"linear-gradient(180deg,#16233A,#0A1120)", border:`1px solid ${GOLD}`, display:"flex", alignItems:"center", justifyContent:"center", opacity:popB, boxShadow:"0 4px 10px rgba(0,0,0,0.5)", zIndex:9}}>
              <span style={{fontFamily:MONO, fontSize:13, color:GOLD, letterSpacing:1, fontWeight:800, whiteSpace:"nowrap"}}>12 MI AWAY</span>
            </div>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{position:"absolute", left:236 + i*16, top:FLOOR + 26 - i*1.5, width:8, height:3, borderRadius:2, background:"rgba(231,178,76,0.45)", opacity:popB, zIndex:5}}/>
            ))}
            {[0,1,2].map(i => {
              const sp = 1.1 + seed(i * 5 + 2) * 1.5;
              const lx = ((seed(i * 9 + 4) * CW + lf * sp * 3.2) % (CW + 60)) - 30;
              const ly = FLOOR - 18 - seed(i * 7 + 1) * 44 + Math.sin((lf + i * 14)/8) * 7;
              return <div key={i} style={{position:"absolute", left:lx, top:ly, width:15, height:10, borderRadius:2, background:"rgba(236,233,226,0.7)", transform:`rotate(${lf*7 + i*40}deg)`, boxShadow:"0 2px 4px rgba(0,0,0,0.5)", zIndex:5}}/>;
            })}
            <div style={{position:"absolute", left:IV(lf,[popFrames[1], popFrames[1]+62],[-48, CW+48]), top:FLOOR+26, width:40, height:36, opacity:popB, transform:`rotate(${lf*11}deg)`, zIndex:9}}>
              <div style={{position:"absolute", inset:0, borderRadius:"46% 54% 50% 50%", border:"3px solid #A98652", boxShadow:"inset 0 0 8px rgba(0,0,0,0.5)"}}/>
              <div style={{position:"absolute", left:4, top:14, width:32, height:2, background:"#8E6E40", transform:"rotate(24deg)"}}/>
              <div style={{position:"absolute", left:4, top:18, width:32, height:2, background:"#8E6E40", transform:"rotate(-38deg)"}}/>
            </div>
            <Dust n={14} tint="rgba(210,190,150,0.55)"/>
            <Pop p={1} z={6}>
              <Actor x={232} groundY={FLOOR} size={100} shadow={1}>
                <Mascot lf={lf} size={100} chef apron={1} gaze={IV(lf,[22,88],[-3,6])} nodAmp={2}/>
              </Actor>
            </Pop>
          </CellShell>

          <CellShell idx={2} x={0} y={CH+2} run={39} sx={252} sy={120} label="RAN OUT OF CASH" stat="CASH -$27" bg="linear-gradient(180deg,#161F33 0%,#0A1120 100%)">
            <div style={{position:"absolute", left:0, top:0, width:CW, height:FLOOR, background:"linear-gradient(180deg,#1E293D 0%,#101828 100%)", zIndex:1}}/>
            <div style={{position:"absolute", left:0, top:0, width:CW, height:FLOOR, opacity:0.28, background:"repeating-linear-gradient(90deg, rgba(236,233,226,0.05) 0 1px, rgba(0,0,0,0) 1px 42px)", zIndex:1}}/>
            <div style={{position:"absolute", left:0, top:0, width:CW, height:FLOOR, opacity:0.20, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.30) 0 1px, rgba(0,0,0,0) 1px 14px)", zIndex:1}}/>
            <div style={{position:"absolute", left:0, top:112, width:CW, height:FLOOR-112, background:"repeating-linear-gradient(90deg, rgba(236,233,226,0.06) 0 1px, rgba(0,0,0,0) 1px 26px), repeating-linear-gradient(0deg, rgba(236,233,226,0.06) 0 1px, rgba(0,0,0,0) 1px 26px), linear-gradient(180deg,#26344D,#161F31)", zIndex:1}}/>
            <div style={{position:"absolute", left:0, top:108, width:CW, height:6, background:"linear-gradient(180deg,#3A5C84,#1C2537)", boxShadow:"0 3px 8px rgba(0,0,0,0.5)", zIndex:1}}/>
            <div style={{position:"absolute", left:0, top:0, width:CW, height:12, background:"linear-gradient(180deg,#2D3A55,#161D2F)", zIndex:2}}/>
            <div style={{position:"absolute", left:0, top:12, width:CW, height:3, background:"rgba(0,0,0,0.35)", zIndex:2}}/>
            {[200, 286].map((px, i) => (
              <div key={i}>
                <div style={{position:"absolute", left:px, top:10, width:3, height:8, background:"#2D374A", zIndex:2}}/>
                <div style={{position:"absolute", left:px-14, top:16, width:30, height:16, borderRadius:"50% 50% 12% 12%", background:"linear-gradient(180deg,#46556F,#1C2537)", boxShadow:"0 6px 12px rgba(0,0,0,0.55)", zIndex:3}}/>
                <div style={{position:"absolute", left:px-9, top:20, width:18, height:4, borderRadius:2, background:"rgba(236,233,226,0.13)", zIndex:3}}/>
              </div>
            ))}
            <div style={{position:"absolute", left:36, top:70, width:110, height:8, borderRadius:3, background:"linear-gradient(180deg,#42536D,#1C2537)", boxShadow:"0 5px 10px rgba(0,0,0,0.5)", zIndex:2}}/>
            <div style={{position:"absolute", left:38, top:78, width:6, height:4, background:"#232D40", zIndex:2}}/>
            <div style={{position:"absolute", left:138, top:78, width:6, height:4, background:"#232D40", zIndex:2}}/>
            {[0,1,2].map(i => (
              <div key={i} style={{position:"absolute", left:46 + i*32, top:50, width:22, height:20, borderRadius:"3px 3px 5px 5px", background:`linear-gradient(180deg,${["#9A968B","#CF9544","#3F9E74"][i]},#2E3B4C)`, boxShadow:"inset 0 -4px 7px rgba(0,0,0,0.35)", zIndex:3, transform:`rotate(${Math.sin((lf + i*17)/16) * 1.4}deg)`, transformOrigin:"50% 100%"}}/>
            ))}
            <div style={{position:"absolute", left:150, top:36, width:150, height:64, borderRadius:8, background:"linear-gradient(165deg,#25334D,#101B2C)", border:`1px solid rgba(58,92,132,0.55)`, boxShadow:"0 10px 20px rgba(0,0,0,0.55), inset 0 0 20px rgba(0,0,0,0.5)", zIndex:3}}>
              <span style={{position:"absolute", left:9, top:5, fontFamily:MONO, fontSize:13, letterSpacing:1.1, color:CREAM, fontWeight:700, whiteSpace:"nowrap"}}>REVENUE</span>
              <div style={{position:"absolute", left:9, top:22, width:1, height:34, background:"rgba(236,233,226,0.2)"}}/>
              <div style={{position:"absolute", left:9, top:56, width:130, height:1, background:"rgba(236,233,226,0.2)"}}/>
              {[0,1,2,3].map(i => (
                <div key={i} style={{position:"absolute", left:9, top:24 + i * 8, width:130, height:1, background:"rgba(236,233,226,0.07)"}}/>
              ))}
              {[0,1,2].map(i => {
                const segW = [38, 34, 40][i];
                const rot = [16, 30, 22][i];
                const lx = [12, 48, 80][i];
                const ly = [26, 34, 44][i];
                const app = over(lf, popFrames[2] + 2 + i*4, 8, Easing.out(Easing.cubic));
                return <div key={i} style={{position:"absolute", left:lx, top:ly, width:segW * app, height:4, borderRadius:2, background:RED, transform:`rotate(${rot}deg)`, transformOrigin:"0% 50%"}}/>;
              })}
              <div style={{position:"absolute", left:126, top:48, width:9, height:9, borderRadius:"50%", background:RED, opacity:over(lf, popFrames[2]+14, 8, Easing.out(Easing.cubic))}}/>
            </div>
            <div style={{position:"absolute", left:314, top:40, width:126, height:56, borderRadius:9, background:"linear-gradient(165deg,#3A5C84,#18243A)", boxShadow:"0 12px 22px rgba(0,0,0,0.55), inset 0 2px 0 rgba(236,233,226,0.14)", zIndex:6}}>
              <span style={{position:"absolute", left:10, top:5, fontFamily:MONO, fontSize:13, letterSpacing:0.6, color:CREAM, fontWeight:700, whiteSpace:"nowrap"}}>BANK BALANCE</span>
              <div style={{position:"absolute", left:10, top:24, width:106, height:24, borderRadius:4, background:TERM2, border:`1px solid rgba(58,92,132,0.7)`, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:8}}>
                <span style={{fontFamily:MONO, fontSize:16, fontWeight:800, color:RED, whiteSpace:"nowrap"}}>{`-$${Math.round(IV(lf,[popFrames[2], 92],[0,27]))}`}</span>
              </div>
              <div style={{position:"absolute", right:8, top:8, width:8, height:8, borderRadius:"50%", background:RED, opacity:0.6 + Math.abs(Math.sin(lf/3))*0.4}}/>
            </div>
            {[0,1,2].map(i => {
              const txt = ["RENT $1,240", "PAYROLL $860", "OVERDUE"][i];
              return (
                <div key={i} style={{position:"absolute", left:306 + i*5, top:104 + i*8, width:136, height:44, borderRadius:4, background:`linear-gradient(180deg,${PAPER},#C9C0AE)`, border:"1px solid rgba(26,24,19,0.4)", transform:`rotate(${-5 + i*4}deg)`, boxShadow:"0 6px 12px rgba(0,0,0,0.5)", opacity:over(lf, popFrames[2] + 2 + i*3, 9, Easing.out(Easing.back(1.6))), zIndex:5 + i}}>
                  <span style={{position:"absolute", left:8, top:6, fontFamily:MONO, fontSize:13, fontWeight:800, color:RED, letterSpacing:0.4, whiteSpace:"nowrap"}}>{txt}</span>
                  <div style={{position:"absolute", left:8, top:26, width:70, height:3, background:"rgba(26,24,19,0.4)"}}/>
                  <div style={{position:"absolute", left:8, top:33, width:48, height:3, background:"rgba(26,24,19,0.28)"}}/>
                  <div style={{position:"absolute", left:0, top:20, width:136, height:1, background:"rgba(26,24,19,0.12)"}}/>
                  {i === 2 ? (
                    <div>
                      <div style={{position:"absolute", left:98, top:8, width:30, height:30, borderRadius:"50%", border:`3px solid ${RED}`, transform:"rotate(-14deg)"}}/>
                      <div style={{position:"absolute", left:102, top:20, width:22, height:3, background:RED, transform:"rotate(-14deg)"}}/>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div style={{position:"absolute", left:170, top:110, width:140, height:58, borderRadius:"6px 6px 3px 3px", background:"linear-gradient(170deg,#46587A 0%,#25334D 55%,#141F33 100%)", boxShadow:"0 12px 22px rgba(0,0,0,0.6), inset 0 2px 0 rgba(236,233,226,0.16)", zIndex:6, opacity:popC}}>
              <div style={{position:"absolute", left:9, top:7, width:122, height:20, borderRadius:3, background:TERM, border:`1px solid rgba(58,92,132,0.6)`, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:7}}>
                <span style={{fontFamily:MONO, fontSize:14, fontWeight:800, color:GOLD, whiteSpace:"nowrap"}}>{`$${Math.round(IV(lf,[popFrames[2], 84],[64,0]))}`}</span>
              </div>
              <div style={{position:"absolute", left:9, top:32, width:122, height:22, borderRadius:3, background:"linear-gradient(180deg,#2E4059,#152134)", boxShadow:"inset 0 3px 8px rgba(0,0,0,0.55)", transform:`translateY(${IV(lf,[popFrames[2], popFrames[2]+12],[0,8])}px)`}}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{position:"absolute", left:7 + i*29, top:5, width:24, height:13, borderRadius:2, background:TERM, boxShadow:"inset 0 0 6px rgba(0,0,0,0.7)"}}/>
                ))}
              </div>
            </div>
            <div style={{opacity:popC * IV(lf,[40,54],[0,1])}}>
              <ArrowD x={316} y={116} h={30} color={RED} z={7}/>
            </div>
            <div style={{position:"absolute", left:124, top:146, width:38, height:22, borderRadius:"4px 4px 10px 10px", background:"linear-gradient(180deg, rgba(236,233,226,0.28), rgba(154,150,139,0.12))", border:"1px solid rgba(236,233,226,0.34)", transform:"rotate(96deg)", boxShadow:"0 3px 7px rgba(0,0,0,0.5)", opacity:popC, zIndex:8}}/>
            <div style={{position:"absolute", left:116, top:166, width:220, height:12, borderRadius:"4px 4px 0 0", background:"linear-gradient(180deg,#7A5734,#372817)", boxShadow:"0 -2px 8px rgba(0,0,0,0.5)", zIndex:8, opacity:popC}}/>
            <div style={{position:"absolute", left:120, top:178, width:212, height:26, background:"linear-gradient(180deg,#503A25 0%,#302214 65%,#1C130B 100%)", boxShadow:"inset 0 2px 0 rgba(236,233,226,0.12), 0 8px 14px rgba(0,0,0,0.5)", zIndex:8, opacity:popC}}/>
            <div style={{position:"absolute", left:120, top:178, width:212, height:26, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0 1px, rgba(0,0,0,0) 1px 17px)", zIndex:8, opacity:popC * 0.8}}/>
            <Ground top="linear-gradient(180deg,#493823,#281C10)" edge="rgba(207,149,68,0.65)" pave="linear-gradient(180deg,#0F1522,#0A1120)"/>
            <Patch x={70} w={180} op={0.26}/>
            <Cracks n={6} tint="rgba(207,149,68,0.22)"/>
            {coins.map(i => {
              const st = popFrames[2] + 4 + i*3;
              const cp = ramp(lf, st, st + 24);
              const fall = IV(cp, [0, 1], [0, 92]);
              const ox = 176 + (i % 5) * 26 + Math.sin((lf + i*9)/7) * 6;
              return (
                <div key={i} style={{position:"absolute", left:ox, top:142 + fall, width:16, height:16, borderRadius:"50%", background:`linear-gradient(160deg,${GOLD},#8A6413)`, boxShadow:"0 3px 6px rgba(0,0,0,0.5), inset 0 -3px 5px rgba(0,0,0,0.3)", opacity:IV(cp,[0,0.1,0.84,1],[0,1,1,0]), transform:`rotate(${lf*8 + i*30}deg) scaleX(${0.35 + 0.65 * Math.abs(Math.sin((lf + i * 11) / 5))})`, zIndex:9}}/>
              );
            })}
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{position:"absolute", left:132 + i*30, top:FLOOR + 34 + (i % 2) * 12, width:15, height:15, borderRadius:"50%", background:`linear-gradient(160deg,${AMBER},#7A5811)`, boxShadow:"0 2px 5px rgba(0,0,0,0.55)", zIndex:9, opacity:over(lf, popFrames[2] + 14 + i*2, 8, Easing.out(Easing.cubic))}}/>
            ))}
            <div style={{position:"absolute", left:52, top:FLOOR + 22, width:36, height:20, borderRadius:"3px 3px 12px 12px", background:`linear-gradient(180deg,${CREAM},#A29C8F)`, transform:"rotate(103deg)", boxShadow:"0 3px 7px rgba(0,0,0,0.55)", zIndex:9, opacity:popC}}/>
            <div style={{position:"absolute", left:244, top:FLOOR + 26, width:104, height:44, borderRadius:6, background:"linear-gradient(170deg,#3A5C84,#161F31)", boxShadow:"0 8px 16px rgba(0,0,0,0.55), inset 0 2px 0 rgba(236,233,226,0.12)", opacity:popC, zIndex:9}}>
              <div style={{position:"absolute", left:8, top:7, width:88, height:20, borderRadius:3, background:TERM2, border:`1px solid ${RED}`, display:"flex", alignItems:"center", justifyContent:"center"}}>
                <span style={{fontFamily:MONO, fontSize:13, fontWeight:800, color:RED, letterSpacing:1, whiteSpace:"nowrap"}}>DECLINED</span>
              </div>
              <div style={{position:"absolute", left:8, top:32, width:24, height:6, borderRadius:2, background:"rgba(236,233,226,0.16)"}}/>
              <div style={{position:"absolute", left:38, top:32, width:24, height:6, borderRadius:2, background:"rgba(236,233,226,0.11)"}}/>
              <div style={{position:"absolute", left:68, top:32, width:24, height:6, borderRadius:2, background:"rgba(236,233,226,0.08)"}}/>
            </div>
            <Dust n={9} tint="rgba(207,149,68,0.5)"/>
            <Pop p={popC} z={6}>
              <Actor x={76} groundY={FLOOR} size={100} shadow={1}>
                <Mascot lf={lf} size={100} apron={1} glasses stern={IV(lf,[40,66],[0.2,1])} gaze={IV(lf,[40,80],[0,-2])} nodAmp={4} nodSpeed={0.5}/>
              </Actor>
            </Pop>
            <div style={{position:"absolute", left:398, top:FLOOR + 66, opacity:popC, zIndex:10}}>
              <Gremlin size={72} phase={14}/>
            </div>
            <div style={{position:"absolute", left:362, top:FLOOR + 8 + Math.sin(lf/6)*2, width:17, height:17, borderRadius:"50%", background:`linear-gradient(160deg,${GOLD},#8A6413)`, boxShadow:"0 3px 6px rgba(0,0,0,0.5)", opacity:popC, zIndex:11}}/>
          </CellShell>

          <CellShell idx={3} x={CW+2} y={CH+2} run={40} sx={204} sy={150} label="COPIED" stat="MARKET SHARE 0%" bg="linear-gradient(180deg,#151E30 0%,#0A1120 100%)">
            <Stars n={14} seedOff={23} maxY={64}/>
            <Spires base={FLOOR - 28} tint="#141D2E" op={0.5} seedOff={21} drift={6}/>
            <Skyline base={FLOOR - 10} tint="#101827" op={0.55} seedOff={17}/>
            <Haze top={FLOOR - 56} h={56} c="rgba(10,17,32,0.86)" op={0.75}/>
            <div style={{position:"absolute", left:118, top:14, width:190, height:24, display:"flex", alignItems:"center", gap:8, zIndex:8}}>
              <span style={{fontFamily:MONO, fontSize:13, fontWeight:800, letterSpacing:1, color:CREAM, whiteSpace:"nowrap"}}>SHARE</span>
              <div style={{position:"relative", flex:1, height:12, borderRadius:6, background:"rgba(236,233,226,0.10)", border:`1px solid rgba(58,92,132,0.5)`, overflow:"hidden"}}>
                <div style={{position:"absolute", left:0, top:0, height:12, width:`${IV(lf,[22,82],[62,0])}%`, background:`linear-gradient(90deg, ${CLAY}, ${GOLD})`}}/>
                <div style={{position:"absolute", right:0, top:0, height:12, width:`${IV(lf,[22,82],[38,100])}%`, background:"linear-gradient(90deg,#54406E,#7E5F9B)"}}/>
                <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0 1px, rgba(0,0,0,0) 1px 14px)", opacity:0.45}}/>
              </div>
            </div>
            <div style={{position:"absolute", left:6, top:52, width:152, height:11, borderRadius:3, background:"linear-gradient(180deg,#334A66,#182434)", zIndex:2}}/>
            <div style={{position:"absolute", left:12, top:58, width:140, height:FLOOR-58, borderRadius:"7px 7px 0 0", background:"linear-gradient(180deg,#293F58 0%,#1B2B3E 55%,#111B29 100%)", boxShadow:"inset 0 -10px 20px rgba(0,0,0,0.45), 0 10px 18px rgba(0,0,0,0.5)", zIndex:2}}/>
            <div style={{position:"absolute", left:12, top:58, width:140, height:FLOOR-58, background:"repeating-linear-gradient(0deg, rgba(0,0,0,0.20) 0 1px, rgba(0,0,0,0) 1px 10px)", opacity:0.65, zIndex:2}}/>
            <div style={{position:"absolute", left:12, top:62, width:140, height:18, background:`repeating-linear-gradient(90deg,${ORANGE} 0 14px,${PAPER} 14px 28px)`, borderRadius:"7px 7px 3px 3px", boxShadow:"0 5px 10px rgba(0,0,0,0.5)", zIndex:3, transform:`skewY(${Math.sin(lf/12 + 2)*0.45}deg)`, transformOrigin:"0% 0%"}}/>
            <Scallop x={12} y={79} w={140} n={8} c={ORANGE} z={3}/>
            <div style={{position:"absolute", left:18, top:90, width:128, height:24, borderRadius:4, background:TERM, border:`1px solid ${GOLD}`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:4}}>
              <span style={{fontFamily:MONO, fontSize:14, color:GOLD, letterSpacing:0.4, fontWeight:700, whiteSpace:"nowrap"}}>CLAUDE CORNER</span>
            </div>
            <div style={{position:"absolute", left:20, top:120, width:42, height:FLOOR-120, borderRadius:"4px 4px 0 0", background:"linear-gradient(180deg,#142236,#0B1523)", border:`1px solid rgba(58,92,132,0.4)`, zIndex:3}}/>
            <div style={{position:"absolute", left:24, top:126, width:34, height:5, borderRadius:2, background:"rgba(236,233,226,0.09)", zIndex:4}}/>
            <div style={{position:"absolute", left:22, top:140, width:10, height:3, borderRadius:2, background:"rgba(236,233,226,0.2)", zIndex:4}}/>
            <Mat x={18} y={FLOOR - 2} w={46} op={1} z={4}/>
            <div style={{position:"absolute", left:76, top:118, width:64, height:42, borderRadius:4, background:"linear-gradient(160deg,#1A2C42,#0B131F)", border:`1px solid rgba(58,92,132,0.35)`, boxShadow:"inset 0 0 14px rgba(0,0,0,0.7)", zIndex:3}}/>
            <div style={{position:"absolute", left:107, top:118, width:1, height:42, background:"rgba(58,92,132,0.42)", zIndex:4}}/>
            <div style={{position:"absolute", left:74, top:160, width:68, height:4, borderRadius:2, background:"linear-gradient(180deg,#334A66,#182434)", zIndex:4}}/>
            <div style={{position:"absolute", left:84, top:126, width:48, height:22, borderRadius:3, background:`linear-gradient(180deg,${PAPER},#BBB2A0)`, border:"1px solid rgba(26,24,19,0.45)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 7px rgba(0,0,0,0.5)", zIndex:4, transform:`rotate(${Math.sin(lf/17) * 1.1}deg)`, transformOrigin:"50% 0%"}}>
              <span style={{fontFamily:MONO, fontSize:13, fontWeight:800, color:RED, letterSpacing:0.4, whiteSpace:"nowrap"}}>CLOSED</span>
            </div>
            <div style={{position:"absolute", left:12, top:58, width:26, height:26, borderRight:"2px solid rgba(236,233,226,0.2)", borderBottom:"2px solid rgba(236,233,226,0.16)", borderRadius:"0 0 100% 0", zIndex:4}}/>
            <div style={{position:"absolute", left:160, top:88, width:126, height:FLOOR-88, borderRadius:"7px 7px 0 0", border:`2px dashed rgba(126,95,155,0.7)`, background:"linear-gradient(180deg, rgba(84,64,110,0.16), rgba(0,0,0,0))", opacity:dGhost * 0.95, zIndex:2}}/>
            <div style={{position:"absolute", left:160, top:88, width:126, height:14, background:"repeating-linear-gradient(90deg, rgba(126,95,155,0.4) 0 13px, rgba(0,0,0,0) 13px 26px)", opacity:dGhost * 0.95, zIndex:2}}/>
            <div style={{position:"absolute", left:158, top:44, width:108, height:40, borderRadius:6, border:`3px solid ${RED}`, transform:`rotate(-9deg) scale(${IV(dCopy,[0,0.7,1],[0.5,1.05,1])})`, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(196,74,58,0.12)", boxShadow:"0 6px 14px rgba(0,0,0,0.45)", opacity:dCopy, zIndex:8}}>
              <span style={{fontFamily:MONO, fontSize:22, fontWeight:800, color:RED, letterSpacing:3, whiteSpace:"nowrap"}}>COPY</span>
            </div>
            <div style={{position:"absolute", left:238, top:28, width:198, height:12, borderRadius:4, background:"linear-gradient(180deg,#6E5389,#2B2040)", boxShadow:"0 6px 14px rgba(0,0,0,0.55)", opacity:dWalls, zIndex:2}}/>
            <div style={{position:"absolute", left:244, top:34 + (FLOOR-34) * (1 - IV(dWalls,[0,1],[0.12,1])), width:186, height:(FLOOR-34) * IV(dWalls,[0,1],[0.12,1]), borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg,#4B3866 0%,#312349 55%,#1B1430 100%)", boxShadow:"inset 0 -12px 26px rgba(0,0,0,0.5), inset 2px 0 0 rgba(236,233,226,0.08), 0 14px 26px rgba(0,0,0,0.55)", opacity:dWalls, zIndex:2}}/>
            <div style={{position:"absolute", left:244, top:38, width:186, height:20, background:"repeating-linear-gradient(90deg,#6E5389 0 18px,#D8D2E2 18px 36px)", borderRadius:"8px 8px 3px 3px", boxShadow:"0 6px 13px rgba(0,0,0,0.55)", opacity:dWalls, zIndex:3}}/>
            <Scallop x={244} y={57} w={186} n={10} c="#6E5389" op={dWalls} z={3}/>
            <div style={{position:"absolute", left:258, top:68, width:158, height:26, borderRadius:5, background:"#1A1226", border:`1px solid rgba(126,95,155,0.85)`, display:"flex", alignItems:"center", justifyContent:"center", opacity:dSign, boxShadow:"0 5px 12px rgba(0,0,0,0.5)", zIndex:4, transform:`translateY(${IV(dSign,[0,0.7,1],[-14,3,0])}px)`}}>
              <span style={{fontFamily:MONO, fontSize:15, color:CREAM, letterSpacing:1.4, fontWeight:800, whiteSpace:"nowrap"}}>CLONE CAFE</span>
            </div>
            <div style={{position:"absolute", left:258, top:102, width:54, height:FLOOR-102, borderRadius:"4px 4px 0 0", background:"linear-gradient(180deg,#382753,#1C1430)", border:`1px solid rgba(126,95,155,0.5)`, opacity:dWalls, zIndex:3}}/>
            <div style={{position:"absolute", left:262, top:108, width:46, height:5, borderRadius:2, background:"rgba(236,233,226,0.10)", opacity:dWalls, zIndex:4}}/>
            <div style={{position:"absolute", left:302, top:130, width:5, height:5, borderRadius:"50%", background:"#B49AD0", opacity:dWalls, zIndex:4}}/>
            <Mat x={256} y={FLOOR - 2} w={58} op={dWalls} z={4}/>
            <div style={{position:"absolute", left:330, top:102, width:90, height:52, borderRadius:4, background:"linear-gradient(160deg,#6E5389,#2B2040)", border:"1px solid rgba(126,95,155,0.5)", boxShadow:"inset 0 0 16px rgba(0,0,0,0.45)", opacity:dWalls, zIndex:3}}/>
            <div style={{position:"absolute", left:374, top:102, width:1, height:52, background:"rgba(216,210,226,0.3)", opacity:dWalls, zIndex:4}}/>
            <div style={{position:"absolute", left:330, top:127, width:90, height:1, background:"rgba(216,210,226,0.24)", opacity:dWalls, zIndex:4}}/>
            <div style={{position:"absolute", left:328, top:154, width:94, height:4, borderRadius:2, background:"linear-gradient(180deg,#6E5389,#2B2040)", opacity:dWalls, zIndex:4}}/>
            <div style={{position:"absolute", left:338, top:110, width:30, height:36, borderRadius:3, background:"linear-gradient(180deg,rgba(236,233,226,0.16),rgba(236,233,226,0))", opacity:dWalls, zIndex:3}}/>
            <Planter x={420} y={FLOOR - 32} w={24} c="#4A3560" op={dWalls} z={4} ph={31}/>
            <Ground top="linear-gradient(180deg,#2F3A55,#1A2234)" edge="rgba(58,92,132,0.6)" pave="linear-gradient(180deg,#0E1420,#0A1120)"/>
            <Patch x={340} w={250} op={0.22}/>
            <Cracks n={5} tint="rgba(126,95,155,0.28)"/>
            <Dust n={10} tint="rgba(154,150,139,0.5)"/>
            <div style={{opacity:dCrowd}}>
              <ArrowR x={140} y={FLOOR + 22} w={116} color="#7E5F9B" z={5}/>
            </div>
            <Sil x={2} h={62} i={7} op={dCrowd * 0.75}/>
            <Sil x={28} h={70} i={9} op={dCrowd * 0.75}/>
            <Pop p={1} z={6}>
              <Actor x={76} groundY={FLOOR} size={100} shadow={1}>
                <Mascot lf={lf} size={100} apron={1} stern={IV(lf,[52,80],[0.15,1])} gaze={6} nodAmp={2}/>
              </Actor>
            </Pop>
            {crowdD.map((c, i) => {
              const st = 38 + c.d;
              const walk = ramp(lf, st, st + 44);
              const cx = IV(walk, [0, 1], [c.x0, c.x1]);
              return (
                <Pop key={i} p={over(lf, st, 8, Easing.out(Easing.cubic))} z={6}>
                  <Actor x={cx} groundY={FLOOR} size={c.s} shadow={1}>
                    {i === 0 ? (
                      <Mascot lf={lf + i*7} size={c.s} hoodie={1} backpack={1} cheer={0.6} gaze={5}/>
                    ) : i === 1 ? (
                      <Mascot lf={lf + i*7} size={c.s} beanie={1} scarf={1} cup={1} cheer={0.6} gaze={5}/>
                    ) : (
                      <Mascot lf={lf + i*7} size={c.s} cap={1} headphones={1} tote={1} cheer={0.6} gaze={5}/>
                    )}
                  </Actor>
                </Pop>
              );
            })}
            <div style={{position:"absolute", left:398, top:FLOOR + 64, opacity:dCrowd, zIndex:10}}>
              <Gremlin size={70} phase={26}/>
            </div>
            <div style={{position:"absolute", left:352, top:FLOOR + 6 + Math.sin(lf/7)*2, width:36, height:28, borderRadius:2, background:`linear-gradient(180deg,${PAPER},#BEB4A2)`, transform:"rotate(-14deg)", boxShadow:"0 3px 7px rgba(0,0,0,0.55)", opacity:dCrowd, zIndex:11}}>
              <div style={{position:"absolute", left:4, top:5, width:24, height:2, background:"rgba(26,24,19,0.5)"}}/>
              <div style={{position:"absolute", left:4, top:12, width:19, height:2, background:"rgba(26,24,19,0.42)"}}/>
              <div style={{position:"absolute", left:4, top:19, width:26, height:2, background:"rgba(26,24,19,0.42)"}}/>
            </div>
          </CellShell>

          <div style={{position:"absolute", left:CW, top:0, width:2, height:GH, background:`linear-gradient(180deg, rgba(231,178,76,0.3), ${GOLD}, rgba(231,178,76,0.3))`, zIndex:14}}/>
          <div style={{position:"absolute", left:0, top:CH, width:GW, height:2, background:`linear-gradient(90deg, rgba(231,178,76,0.3), ${GOLD}, rgba(231,178,76,0.3))`, zIndex:14}}/>

          <div style={{position:"absolute", left:0, top:sweepY, width:GW, height:2, background:`linear-gradient(90deg, rgba(58,92,132,0), ${SLATE}, rgba(58,92,132,0))`, opacity:sweepA, zIndex:16}}/>

          <div style={{position:"absolute", left:wipeX, top:0, width:260, height:GH, opacity:wipeOp, zIndex:15, pointerEvents:"none"}}>
            <div style={{position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(58,92,132,0) 0%, rgba(58,92,132,0.28) 55%, rgba(58,92,132,0.05) 100%)"}}/>
            <div style={{position:"absolute", right:0, top:0, width:3, height:GH, background:`linear-gradient(180deg, rgba(58,92,132,0.2), ${SLATE}, rgba(58,92,132,0.2))`}}/>
            <div style={{position:"absolute", right:14, top:0, width:1, height:GH, background:"rgba(58,92,132,0.45)"}}/>
            {Array.from({length:16}).map((_, i) => (
              <div key={i} style={{position:"absolute", right:0, top:14 + i * 34, width:i % 3 === 0 ? 20 : 11, height:2, background:`rgba(58,92,132,${i % 3 === 0 ? 0.75 : 0.42})`}}/>
            ))}
            <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, rgba(58,92,132,0.16) 0 1px, rgba(0,0,0,0) 1px 26px)"}}/>
          </div>
        </div>

        <div style={{position:"absolute", left:GX, top:GY+GH+18, width:GW, height:40, borderRadius:10, background:"linear-gradient(180deg,#16233A,#0A1120)", border:`1px solid ${SLATE}`, overflow:"hidden", zIndex:4, display:"flex", alignItems:"center", padding:"0 16px", gap:14}}>
          <span style={{fontFamily:MONO, fontSize:14, letterSpacing:1.6, color:CREAM}}>SIM LOG</span>
          <div style={{position:"relative", flex:1, height:10, borderRadius:5, background:"rgba(236,233,226,0.10)", overflow:"hidden"}}>
            <div style={{position:"absolute", left:0, top:0, height:10, width:`${IV(lf,[0,100],[8,100])}%`, background:`linear-gradient(90deg, ${CLAY}, ${RED})`}}/>
            <div style={{position:"absolute", left:`${IV(lf,[0,100],[8,100])}%`, top:0, width:2, height:10, background:GOLD}}/>
            <div style={{position:"absolute", inset:0, opacity:0.3, background:"repeating-linear-gradient(90deg, rgba(0,0,0,0.6) 0 1px, rgba(0,0,0,0) 1px 22px)"}}/>
          </div>
          <span style={{fontFamily:MONO, fontSize:14, letterSpacing:1.4, color:RED, fontWeight:800, whiteSpace:"nowrap"}}>{`${runN} FAILURES LOGGED`}</span>
        </div>

        <SimScan/>
      </div>
    </AbsoluteFill>
  );
};

const S5Body: React.FC<{lf:number}> = ({lf}) => {
  const IV = (x:number, ins:number[], outs:number[]) => interpolate(x, ins, outs, {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
  const CREAM = "#ECE9E2";
  const PAPER = "#F7F3EA";
  const INK = "#1A1813";
  const SLATE = "#3A5C84";
  const CLAY = "#D2724E";
  const AMBER = "#CF9544";
  const GOLD = "#E7B24C";
  const GREEN = "#3F9E74";
  const MUTE = "#9A968B";
  const RED = "#C44A3A";
  const TERM = "#0E1626";
  const TERM2 = "#0A1120";
  const A_END = 48;
  const B_END = 92;
  const SHOT = lf < A_END ? 0 : lf < B_END ? 1 : 2;
  const s0 = lf;
  const s1 = lf - A_END;
  const s2 = lf - B_END;
  const cutT = SHOT === 0 ? s0 : SHOT === 1 ? s1 : s2;
  const cutX = IV(cutT, [0, 5], [-300, 1160]);
  const cutOn = cutT < 5 && SHOT > 0 ? 1 : 0;
  const Cut = (
    <div style={{position:"absolute", left:cutX, top:0, width:250, height:792, background:`linear-gradient(90deg, rgba(236,233,226,0) 0%, rgba(236,233,226,0.34) 58%, rgba(236,233,226,0.86) 100%)`, opacity:cutOn, pointerEvents:"none"}}/>
  );
  const bandOff = (lf * 9) % 60;
  const gridV = (lf * 11) % 84;
  const rowLbl = ["FOOTFALL", "REVIEWS", "MENU PRICE"];
  const rowSub = ["14d rolling avg", "sentiment index", "latte, single origin"];
  const rowVal = ["+2%", "4.6 / 5", "$6.00"];
  const rowIn: number[][] = [[-10, -2], [4, 12], [14, 22]];
  const rowRes: number[][] = [[6, 12], [18, 24], [28, 34]];
  const rowTgt = [0.72, 0.81, 1];
  const spark = [
    [0.34, 0.46, 0.42, 0.58, 0.52, 0.66, 0.61, 0.74, 0.70, 0.78],
    [0.62, 0.58, 0.66, 0.60, 0.71, 0.64, 0.74, 0.69, 0.78, 0.81],
    [0.86, 0.80, 0.70, 0.58, 0.47, 0.38, 0.30, 0.24, 0.18, 0.12],
  ];
  const bx = 64;
  const by = 466;
  const bw = 884;
  const bh = 140;
  const lockT = IV(s0, [34, 44], [0, 1]);
  const lockPulse = 1 + Math.sin(s0 * 0.34) * 0.02 * (s0 > 44 ? 1 : 0);
  const cx0 = IV(lockT, [0, 1], [6, bx]);
  const cy0 = IV(lockT, [0, 1], [110, by]);
  const cx1 = IV(lockT, [0, 1], [1006, bx + bw]);
  const cy1 = IV(lockT, [0, 1], [782, by + bh]);
  const verdSY = s0 < 46 ? IV(s0, [40, 44, 46], [0.06, 1.08, 1]) : 1 + Math.sin((s0 - 46) * 0.3) * 0.03;
  const probeY = IV(s0, [0, 10, 20, 30, 40], [186, 186, 344, 502, 502]);
  const probeWob = Math.sin(s0 * 0.5) * 3;
  const RowIcon = (i:number, on:boolean, col:string) => {
    if (i === 0) {
      return (
        <div style={{position:"relative", width:44, height:44}}>
          {[0, 1, 2].map((k) => (
            <div key={"fi" + k} style={{position:"absolute", left:4 + k * 14, top:26 - k * 4, width:9, height:14 + k * 4, borderRadius:3, background:col, opacity:0.55 + k * 0.2}}/>
          ))}
          <div style={{position:"absolute", left:4, top:40, width:36, height:3, borderRadius:2, background:col, opacity:0.7}}/>
        </div>
      );
    }
    if (i === 1) {
      return (
        <div style={{position:"relative", width:44, height:44}}>
          <div style={{position:"absolute", left:4, top:8, width:36, height:36, background:col, clipPath:"polygon(50% 0%, 62% 34%, 98% 36%, 70% 58%, 80% 94%, 50% 73%, 20% 94%, 30% 58%, 2% 36%, 38% 34%)"}}/>
        </div>
      );
    }
    return (
      <div style={{position:"relative", width:44, height:44}}>
        <div style={{position:"absolute", left:3, top:9, width:34, height:30, borderRadius:5, background:col, clipPath:"polygon(0% 50%, 26% 0%, 100% 0%, 100% 100%, 26% 100%)"}}/>
        <div style={{position:"absolute", left:12, top:20, width:9, height:9, borderRadius:5, background:TERM2}}/>
      </div>
    );
  };
  const SHOT_A = (
    <div style={{position:"absolute", inset:0, background:`linear-gradient(180deg, ${TERM} 0%, #0C1424 52%, ${TERM2} 100%)`, overflow:"hidden"}}>
      <div style={{position:"absolute", left:-60, top:-80, width:1140, height:960, transform:`translateY(${bandOff}px)`, background:`repeating-linear-gradient(180deg, #101B2E 0px, #101B2E 30px, #16263A 30px, #16263A 60px)`, opacity:0.9}}/>
      <div style={{position:"absolute", left:-60, top:-80, width:1140, height:960, transform:`translateX(${-gridV}px)`, background:`repeating-linear-gradient(90deg, rgba(58,92,132,0) 0px, rgba(58,92,132,0) 68px, rgba(58,92,132,0.22) 68px, rgba(58,92,132,0.22) 84px)`}}/>
      <div style={{position:"absolute", left:-60, top:-80, width:1140, height:960, transform:`translateY(${-((lf * 14) % 120)}px)`, background:`repeating-linear-gradient(180deg, rgba(58,92,132,0) 0px, rgba(58,92,132,0) 96px, rgba(58,92,132,0.34) 96px, rgba(58,92,132,0.34) 120px)`}}/>
      <div style={{position:"absolute", inset:0, background:"radial-gradient(120% 80% at 50% 34%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.45) 100%)"}}/>
      <div style={{position:"absolute", left:36, top:26, display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:12, height:34, borderRadius:3, background:`linear-gradient(180deg, ${GOLD}, #8A6428)`}}/>
        <span style={{color:CREAM, fontSize:32, fontWeight:900, letterSpacing:5}}>ROOT CAUSE SCAN</span>
      </div>
      <div style={{position:"absolute", left:36, top:70, width:420, height:4, background:`linear-gradient(90deg, ${GOLD}, rgba(231,178,76,0))`}}/>
      <div style={{position:"absolute", left:700, top:24, width:248, height:38, borderRadius:10, background:"linear-gradient(180deg, #1B2A3E, #101B2E)", border:`2px solid ${SLATE}`, display:"flex", alignItems:"center", justifyContent:"center", gap:10}}>
        <div style={{width:10, height:10, borderRadius:6, background:s0 % 12 < 6 ? GOLD : "#3E5470"}}/>
        <span style={{color:MUTE, fontSize:17, fontWeight:900, letterSpacing:2.4, fontFamily:"ui-monospace, monospace"}}>3 SUSPECTS</span>
      </div>
      <div style={{position:"absolute", left:64, top:96, width:884, height:8, borderRadius:4, background:"#17253A", boxShadow:"inset 0 2px 4px rgba(0,0,0,0.6)"}}/>
      <div style={{position:"absolute", left:64, top:96, width:884 * IV(s0, [0, 44], [0.18, 1]), height:8, borderRadius:4, background:`linear-gradient(90deg, #8A6428, ${GOLD})`}}/>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={"tk" + i} style={{position:"absolute", left:64 + i * 110, top:108, width:2, height:i % 2 === 0 ? 10 : 6, background:MUTE, opacity:0.35}}/>
      ))}
      <div style={{position:"absolute", left:44, top:170, width:4, height:452, background:"#1B2A3E"}}/>
      <div style={{position:"absolute", left:32, top:probeY + probeWob, width:36, height:122, borderRadius:7, background:`linear-gradient(180deg, ${GOLD} 0%, #B98736 42%, #6E4F2E 100%)`, boxShadow:"7px 12px 20px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.22)"}}>
        <div style={{position:"absolute", left:7, top:14, width:22, height:5, borderRadius:3, background:"rgba(14,22,38,0.5)"}}/>
        <div style={{position:"absolute", left:7, top:26, width:22, height:5, borderRadius:3, background:"rgba(14,22,38,0.4)"}}/>
        <div style={{position:"absolute", left:11, top:96, width:14, height:14, borderRadius:8, background:CREAM, opacity:0.8}}/>
      </div>
      {[0, 1, 2].map((i) => {
        const inn = IV(s0, [rowIn[i][0], rowIn[i][1]], [1010, 0]);
        const res = IV(s0, [rowRes[i][0], rowRes[i][1]], [0, 1]);
        const fill = IV(s0, [rowIn[i][1], rowIn[i][1] + 9], [0.08, rowTgt[i]]);
        const bad = i === 2;
        const on = res > 0.9;
        const top = 154 + i * 156;
        const lblCol = bad ? (on ? RED : CREAM) : (on ? GREEN : MUTE);
        const edge = bad && on ? RED : (on ? GREEN : SLATE);
        const txtOp = IV(inn, [40, 200], [1, 0]);
        return (
          <div key={"row" + i} style={{position:"absolute", left:64, top:top, width:884, height:140, transform:`translateX(${inn}px)`}}>
            <div style={{position:"absolute", left:0, top:0, width:884, height:140, borderRadius:16, background:bad && on ? "linear-gradient(180deg, #46201A 0%, #2C1310 58%, #1A0B09 100%)" : `linear-gradient(180deg, #22334A 0%, #182640 56%, ${TERM} 100%)`, border:`3px solid ${edge}`, boxShadow:"0 18px 36px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.09)"}}/>
            <div style={{position:"absolute", left:0, top:0, width:12, height:140, borderRadius:"16px 0 0 16px", background:`linear-gradient(180deg, ${edge}, rgba(0,0,0,0.35))`}}/>
            <div style={{position:"absolute", left:34, top:46, width:44, height:44}}>{RowIcon(i, on, lblCol)}</div>
            <span style={{position:"absolute", left:94, top:30, color:lblCol, fontSize:40, fontWeight:900, letterSpacing:2, fontFamily:"ui-monospace, monospace", opacity:txtOp}}>{rowLbl[i]}</span>
            <span style={{position:"absolute", left:96, top:80, color:MUTE, fontSize:17, fontWeight:700, letterSpacing:1.4, opacity:txtOp * 0.9}}>{rowSub[i]}</span>
            <span style={{position:"absolute", left:96, top:104, color:lblCol, fontSize:19, fontWeight:900, letterSpacing:1.6, fontFamily:"ui-monospace, monospace", opacity:txtOp * 0.95}}>{rowVal[i]}</span>
            <div style={{position:"absolute", left:414, top:34, width:172, height:66, borderRadius:8, background:"rgba(8,14,26,0.55)", border:"2px solid rgba(154,150,139,0.22)"}}/>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => {
              const grow = IV(s0, [rowIn[i][1] + k * 1.4, rowIn[i][1] + 8 + k * 1.4], [0, 1]);
              const hh = 6 + spark[i][k] * 48 * grow;
              return <div key={"sp" + i + k} style={{position:"absolute", left:424 + k * 16, top:98 - hh, width:10, height:hh, borderRadius:3, background:bad ? `linear-gradient(180deg, ${RED}, #6E2219)` : `linear-gradient(180deg, ${GREEN}, #1F5340)`, opacity:0.55 + spark[i][k] * 0.45}}/>;
            })}
            <div style={{position:"absolute", left:414, top:106, width:172, height:2, background:MUTE, opacity:0.25}}/>
            <span style={{position:"absolute", left:606, top:34, color:MUTE, fontSize:14, fontWeight:900, letterSpacing:2, opacity:txtOp}}>CONFIDENCE</span>
            <div style={{position:"absolute", left:606, top:58, width:220, height:18, borderRadius:9, background:"#0C1526", border:"2px solid rgba(154,150,139,0.2)", overflow:"hidden"}}>
              <div style={{position:"absolute", left:0, top:0, width:216 * fill, height:14, borderRadius:8, background:bad && on ? `linear-gradient(90deg, #8E2F24, ${RED})` : (on ? `linear-gradient(90deg, #1F5340, ${GREEN})` : `linear-gradient(90deg, #22344C, ${SLATE})`)}}/>
            </div>
            {[1, 2, 3].map((k) => (
              <div key={"cs" + i + k} style={{position:"absolute", left:606 + k * 55, top:58, width:2, height:18, background:TERM2, opacity:0.7}}/>
            ))}
            <span style={{position:"absolute", left:606, top:84, color:lblCol, fontSize:22, fontWeight:900, letterSpacing:1.2, fontFamily:"ui-monospace, monospace", opacity:txtOp}}>{Math.round(fill * 100)}%</span>
            <div style={{position:"absolute", left:756, top:48, width:100, height:46, borderRadius:11, background:bad && on ? `linear-gradient(180deg, ${RED}, #8E2F24)` : (on ? "linear-gradient(180deg, #1B5340, #0F3125)" : "linear-gradient(180deg, #22344C, #16263A)"), border:`3px solid ${bad && on ? "#9B3327" : (on ? GREEN : SLATE)}`, display:"flex", alignItems:"center", justifyContent:"center", color:on ? PAPER : MUTE, fontSize:20, fontWeight:900, letterSpacing:1.4, opacity:txtOp, transform:`scale(${IV(res, [0, 0.7, 1], [0.7, 1.22, 1])})`, boxShadow:"0 8px 16px rgba(0,0,0,0.5)"}}>{bad ? (on ? "BAD" : "WAIT") : (on ? "OK" : "WAIT")}</div>
          </div>
        );
      })}
      {lockT > 0 ? (
        <div style={{position:"absolute", left:bx - 10, top:by - 10, width:bw + 20, height:bh + 20, border:`4px solid ${RED}`, borderRadius:20, opacity:lockT, transform:`scale(${(0.86 + lockT * 0.14) * lockPulse})`, transformOrigin:"50% 50%"}}/>
      ) : null}
      {[[cx0, cy0, 1, 1], [cx1, cy0, -1, 1], [cx0, cy1, 1, -1], [cx1, cy1, -1, -1]].map((c, i) => (
        <div key={"bk" + i} style={{position:"absolute", left:c[0], top:c[1], width:48, height:48, borderTop:c[3] > 0 ? `6px solid ${RED}` : "none", borderBottom:c[3] < 0 ? `6px solid ${RED}` : "none", borderLeft:c[2] > 0 ? `6px solid ${RED}` : "none", borderRight:c[2] < 0 ? `6px solid ${RED}` : "none", transform:`translate(${c[2] > 0 ? -22 : -26}px, ${c[3] > 0 ? -22 : -26}px)`, opacity:IV(s0, [32, 36], [0, 1])}}/>
      ))}
      {s0 >= 40 ? (
        <div style={{position:"absolute", left:64, top:648, width:884, height:112, borderRadius:16, background:`linear-gradient(180deg, ${RED} 0%, #A93A2C 52%, #7C271D 100%)`, border:"3px solid #9B3327", display:"flex", alignItems:"center", paddingLeft:26, gap:18, transform:`scaleY(${verdSY})`, transformOrigin:"50% 100%", boxShadow:"0 20px 40px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.16)", overflow:"hidden"}}>
          <div style={{position:"absolute", left:0, top:0, width:884, height:10, background:`repeating-linear-gradient(135deg, rgba(247,243,234,0.55) 0px, rgba(247,243,234,0.55) 12px, rgba(0,0,0,0) 12px, rgba(0,0,0,0) 26px)`}}/>
          <div style={{position:"absolute", left:0, top:102, width:884, height:10, background:`repeating-linear-gradient(135deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 12px, rgba(0,0,0,0) 12px, rgba(0,0,0,0) 26px)`}}/>
          <div style={{width:34, height:34, borderRadius:18, background:PAPER, display:"flex", alignItems:"center", justifyContent:"center", color:RED, fontSize:24, fontWeight:900, boxShadow:"0 6px 10px rgba(0,0,0,0.4)"}}>!</div>
          <span style={{color:PAPER, fontSize:40, fontWeight:900, letterSpacing:1.2}}>ROOT CAUSE: MENU PRICE</span>
        </div>
      ) : null}
    </div>
  );
  const swing = Math.sin(s1 * 0.22) * 3;
  const roll = IV(s1, [22, 32], [0, 1]);
  const flipped = s1 >= 27;
  const wandX = IV(s1, [6, 18], [1180, 690]) + IV(s1, [34, 46], [0, 470]);
  const wandRot = -22 + IV(s1, [16, 20, 25], [0, -16, 0]);
  const headSq = s1 < 26 ? Math.max(0.06, Math.abs(Math.cos(IV(s1, [20, 26], [0, 180]) * Math.PI / 180))) : 1 + Math.sin((s1 - 26) * 0.24) * 0.03;
  const headTxt = s1 >= 23 ? "THE ONE FIX: $4" : "WHAT BROKE IT: $6";
  const headCol = s1 >= 23 ? GREEN : RED;
  const headBd = s1 >= 23 ? "#2E7D5A" : "#9B3327";
  const stampS = IV(s1, [32, 37, 41], [0.34, 1.12, 1]);
  const stampR = IV(s1, [32, 37, 41], [-20, -5, -7]);
  const wRad = wandRot * Math.PI / 180;
  const tipX = wandX + 320 - 320 * Math.cos(wRad);
  const tipY = 365 - 320 * Math.sin(wRad);
  const tagBody = flipped ? `linear-gradient(158deg, #57BE92 0%, ${GREEN} 44%, #2A6E54 78%, #1E5140 100%)` : `linear-gradient(158deg, #E06A56 0%, ${RED} 44%, #8A2C21 78%, #63201A 100%)`;
  const SHOT_B = (
    <div style={{position:"absolute", inset:0, background:`linear-gradient(180deg, #1B2A44 0%, #16233A 34%, ${TERM} 66%, ${TERM2} 100%)`, overflow:"hidden"}}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const x = ((s1 * 4 + i * 132) % 1320) - 154;
        const h = 150 + Math.round(seed(i + 7) * 130);
        return (
          <div key={"fs" + i} style={{position:"absolute", left:x, top:300 - h, width:104, height:h, borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg, #26374F, #1C2B41)", opacity:0.45}}>
            <div style={{position:"absolute", left:46, top:-30, width:8, height:32, background:"#26374F", opacity:0.8}}/>
          </div>
        );
      })}
      <div style={{position:"absolute", left:0, top:210, width:1012, height:130, background:"linear-gradient(180deg, rgba(27,42,68,0), rgba(27,42,68,0.75))"}}/>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const x = ((s1 * 9 + i * 210) % 1470) - 230;
        const h = 240 + Math.round(seed(i) * 200);
        const t = 40 + Math.round(seed(i + 3) * 150);
        return (
          <div key={"sl" + i} style={{position:"absolute", left:x, top:t, width:172, height:h, borderRadius:22, background:`linear-gradient(160deg, #2A3E58 0%, #1B2C46 60%, ${TERM2} 100%)`, boxShadow:"18px 22px 40px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.06)", overflow:"hidden"}}>
            <div style={{position:"absolute", left:0, top:0, width:172, height:h, background:`repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 52px, rgba(0,0,0,0.28) 52px, rgba(0,0,0,0.28) 56px)`}}/>
            <div style={{position:"absolute", left:0, top:0, width:172, height:h, background:`repeating-linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 40px, rgba(0,0,0,0.22) 40px, rgba(0,0,0,0.22) 43px)`}}/>
            {[0, 1, 2, 3].map((j) => (
              <div key={"sw" + i + j} style={{position:"absolute", left:14 + (j % 2) * 88, top:22 + Math.floor(j / 2) * 108, width:56, height:28, borderRadius:4, background:seed(i + j * 2) > 0.55 ? "rgba(207,149,68,0.35)" : "rgba(58,92,132,0.28)"}}/>
            ))}
            <div style={{position:"absolute", left:20, top:-1, width:132, height:8, borderRadius:4, background:"rgba(236,233,226,0.12)"}}/>
          </div>
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = ((s1 * 13 + i * 250) % 1500) - 250;
        return (
          <div key={"sb" + i} style={{position:"absolute", left:x, top:634, width:210, height:158, borderRadius:18, background:`linear-gradient(180deg, #253A54, #101B2E 62%, ${TERM2} 100%)`, boxShadow:"14px -8px 30px rgba(0,0,0,0.45)", overflow:"hidden"}}>
            <div style={{position:"absolute", left:0, top:0, width:210, height:9, background:"rgba(236,233,226,0.1)"}}/>
            <div style={{position:"absolute", left:0, top:26, width:210, height:132, background:`repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 20px, rgba(0,0,0,0.24) 20px, rgba(0,0,0,0.24) 23px)`}}/>
            <div style={{position:"absolute", left:26, top:-24, width:14, height:26, borderRadius:3, background:"#253A54"}}/>
            <div style={{position:"absolute", left:150, top:-16, width:3, height:18, background:MUTE, opacity:0.5}}/>
          </div>
        );
      })}
      <div style={{position:"absolute", left:0, top:706, width:1012, height:86, background:`linear-gradient(180deg, #22344C, ${TERM2})`, boxShadow:"0 -10px 26px rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute", left:0, top:706, width:1012, height:5, background:MUTE, opacity:0.4}}/>
      <div style={{position:"absolute", left:0, top:706, width:1012, height:86, background:`repeating-linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 74px, rgba(0,0,0,0.3) 74px, rgba(0,0,0,0.3) 78px)`}}/>
      <div style={{position:"absolute", left:64, top:36, width:620, height:98, borderRadius:16, background:`linear-gradient(180deg, ${headCol} 0%, ${s1 >= 23 ? "#245C46" : "#8E2F24"} 62%, ${s1 >= 23 ? "#173C2E" : "#5F1F17"} 100%)`, border:`3px solid ${headBd}`, display:"flex", alignItems:"center", paddingLeft:26, gap:16, transform:`scaleY(${headSq})`, transformOrigin:"50% 50%", boxShadow:"0 16px 32px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.16)"}}>
        <div style={{width:22, height:22, borderRadius:12, background:PAPER, boxShadow:"0 4px 8px rgba(0,0,0,0.35)"}}/>
        <span style={{color:PAPER, fontSize:36, fontWeight:900, letterSpacing:1.5}}>{headTxt}</span>
      </div>
      <div style={{position:"absolute", left:150, top:96, width:56, height:22, borderRadius:6, background:`linear-gradient(180deg, ${MUTE}, #4A5364)`, boxShadow:"0 6px 12px rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute", left:174, top:114, width:8, height:8, borderRadius:5, background:"#2A3242"}}/>
      <div style={{position:"absolute", left:176, top:118, width:4, height:132, background:`linear-gradient(180deg, #C9BFA6, #8B8371)`, transform:`rotate(${swing * 0.5}deg)`, transformOrigin:"50% 0%", borderRadius:2}}/>
      <div style={{position:"absolute", left:120, top:190, width:580, height:470, transform:`rotate(${swing}deg)`, transformOrigin:"10% 12%"}}>
        <div style={{position:"absolute", left:0, top:0, width:580, height:470, clipPath:"polygon(16% 0%, 100% 0%, 100% 100%, 16% 100%, 0% 50%)", background:tagBody, boxShadow:"22px 30px 56px rgba(0,0,0,0.62)"}}/>
        <div style={{position:"absolute", left:0, top:0, width:580, height:470, clipPath:"polygon(16% 0%, 100% 0%, 100% 100%, 16% 100%, 0% 50%)", background:`repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 9px), repeating-linear-gradient(22deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 11px)`}}/>
        <div style={{position:"absolute", left:16, top:0, width:564, height:14, background:"rgba(255,255,255,0.18)"}}/>
        <div style={{position:"absolute", left:16, top:454, width:564, height:16, background:"rgba(0,0,0,0.28)"}}/>
        <div style={{position:"absolute", left:52, top:26, width:498, height:418, borderRadius:8, border:`3px dashed ${flipped ? "rgba(20,58,44,0.55)" : "rgba(70,20,15,0.55)"}`}}/>
        <div style={{position:"absolute", left:34, top:26, width:46, height:46, borderRadius:24, background:TERM2, border:`7px solid ${flipped ? "#1E5140" : "#63201A"}`, boxShadow:"inset 3px 5px 9px rgba(0,0,0,0.65)"}}/>
        <div style={{position:"absolute", left:44, top:36, width:26, height:26, borderRadius:14, border:"3px solid rgba(236,233,226,0.28)"}}/>
        <span style={{position:"absolute", left:112, top:52, color:"rgba(247,243,234,0.82)", fontSize:22, fontWeight:900, letterSpacing:5}}>LATTE &middot; TODAY</span>
        <div style={{position:"absolute", left:100, top:110, width:400, height:250, borderRadius:20, background:"rgba(12,18,32,0.36)", boxShadow:"inset 0 6px 14px rgba(0,0,0,0.4)", overflow:"hidden"}}>
          <div style={{position:"absolute", left:0, top:0, width:400, height:250, background:`repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 14px)`}}/>
          <div style={{position:"absolute", left:0, top:0, width:400, height:250, display:"flex", alignItems:"center", justifyContent:"center", transform:`translateY(${-250 * roll}px)`}}>
            <span style={{color:PAPER, fontSize:168, fontWeight:900, lineHeight:1, textShadow:"0 8px 0 rgba(0,0,0,0.28)"}}>$6</span>
          </div>
          <div style={{position:"absolute", left:0, top:0, width:400, height:250, display:"flex", alignItems:"center", justifyContent:"center", transform:`translateY(${250 * (1 - roll)}px)`}}>
            <span style={{color:PAPER, fontSize:168, fontWeight:900, lineHeight:1, textShadow:"0 8px 0 rgba(0,0,0,0.28)"}}>$4</span>
          </div>
        </div>
        <div style={{position:"absolute", left:100, top:388, width:400, height:12, borderRadius:6, background:"rgba(12,18,32,0.42)"}}/>
        <div style={{position:"absolute", left:100, top:388, width:400 * IV(s1, [24, 36], [0.3, 1]), height:12, borderRadius:6, background:flipped ? "#C9F0DE" : "#F2C6BE"}}/>
        <span style={{position:"absolute", left:100, top:410, color:"rgba(247,243,234,0.72)", fontSize:18, fontWeight:900, letterSpacing:2.6}}>{flipped ? "DEMAND CURVE: CLEARED" : "DEMAND CURVE: BLOCKED"}</span>
        <div style={{position:"absolute", left:530, top:420, width:50, height:50, background:"rgba(0,0,0,0.32)", clipPath:"polygon(100% 0%, 100% 100%, 0% 100%)"}}/>
      </div>
      <div style={{position:"absolute", left:wandX, top:352, width:320, height:26, borderRadius:14, background:`linear-gradient(90deg, ${AMBER} 0%, #A87C42 46%, #6E4F2E 100%)`, transform:`rotate(${wandRot}deg)`, transformOrigin:"100% 50%", boxShadow:"0 12px 24px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.2)"}}>
        {[0, 1, 2].map((i) => (
          <div key={"gw" + i} style={{position:"absolute", left:224 + i * 26, top:0, width:9, height:26, borderRadius:4, background:"rgba(14,22,38,0.42)"}}/>
        ))}
        <div style={{position:"absolute", left:296, top:2, width:22, height:22, borderRadius:12, background:`linear-gradient(180deg, ${CREAM}, #A9A294)`}}/>
      </div>
      <div style={{position:"absolute", left:tipX - 24, top:tipY - 24, width:48, height:48, borderRadius:26, background:flipped ? `linear-gradient(180deg, #57BE92, #24614A)` : `linear-gradient(180deg, ${GOLD}, #8A6428)`, border:`5px solid ${CREAM}`, boxShadow:"0 10px 20px rgba(0,0,0,0.5)"}}/>
      {s1 >= 32 ? (
        <div style={{position:"absolute", left:704, top:34, width:250, height:132, borderRadius:16, background:`linear-gradient(180deg, #1F5641 0%, #17402F 58%, #0F2A20 100%)`, border:`5px solid ${GREEN}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, transform:`scale(${stampS}) rotate(${stampR}deg)`, transformOrigin:"50% 50%", boxShadow:"0 22px 42px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.14)"}}>
          <span style={{color:CREAM, fontSize:38, fontWeight:900, letterSpacing:3}}>1 CHANGE</span>
          <span style={{color:"rgba(236,233,226,0.66)", fontSize:15, fontWeight:900, letterSpacing:3.4}}>APPLIED</span>
        </div>
      ) : null}
    </div>
  );
  const GY = 648;
  const CURB = 698;
  const wipeX = IV(s2, [0, 26], [-320, 1330]);
  const wAt = (x:number) => IV(wipeX, [x, x + 150], [0, 1]);
  const warm = wAt(520);
  const waveOn = IV(s2, [0, 2, 22, 28], [0, 1, 1, 0]);
  const shutH = IV(s2, [8, 24], [312, 10]);
  const openIn = IV(s2, [10, 20], [0, 1]);
  const flipDeg = IV(s2, [10, 22], [0, 360]);
  const signSY = s2 < 22 ? Math.max(0.07, Math.abs(Math.cos(flipDeg * Math.PI / 180))) : 1 + Math.sin((s2 - 22) * 0.22) * 0.04;
  const awnW = IV(s2, [16, 30], [0, 336]);
  const awnDrop = Math.sin(s2 * 0.4) * 2.2;
  const gEj = IV(s2, [0, 15], [0, 1]);
  const gremX = 560 - gEj * 860;
  const gremLift = -Math.sin(gEj * Math.PI) * 118;
  const gremRot = -gEj * 540;
  const c1X = IV(s2, [15, 42], [-160, 520]);
  const c2X = IV(s2, [24, 42], [-160, 330]);
  const c3X = IV(s2, [32, 42], [-160, 145]);
  const stepBob = (p:number) => -Math.abs(Math.sin(s2 * 0.54 + p)) * 7;
  const farOff = (s2 * 3.5) % 96;
  const midOff = -((s2 * 7) % 118);
  const busW = [520, 566, 498];
  const busTone = ["#2E4A6B", "#3A5C84", "#243A55"];
  const busRoof = ["#1B2E44", "#22374F", "#16263A"];
  const Bus = (k:number) => {
    const x = -600 + (((s2 * 27) + k * 549 + 120) % 1647);
    const w = busW[k];
    return (
      <div key={"bus" + k} style={{position:"absolute", left:x, top:690, width:w, height:108}}>
        <div style={{position:"absolute", left:0, top:0, width:w, height:82, borderRadius:"14px 14px 6px 6px", background:`linear-gradient(180deg, ${busTone[k]} 0%, ${busRoof[k]} 62%, ${TERM2} 100%)`, boxShadow:"0 -6px 20px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.12)"}}/>
        <div style={{position:"absolute", left:12, top:6, width:w - 24, height:4, borderRadius:2, background:CREAM, opacity:0.12}}/>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"bw" + k + i} style={{position:"absolute", left:26 + i * (w - 70) / 5, top:19, width:(w - 90) / 5, height:32, borderRadius:5, background:warm > 0.5 ? "rgba(207,149,68,0.42)" : "rgba(58,92,132,0.4)", boxShadow:"inset 0 2px 0 rgba(255,255,255,0.1)"}}/>
        ))}
        <div style={{position:"absolute", left:18, top:64, width:w - 36, height:8, borderRadius:4, background:MUTE, opacity:0.3}}/>
        <div style={{position:"absolute", left:w * 0.14, top:74, width:34, height:34, borderRadius:18, background:TERM2, border:`4px solid ${MUTE}`}}/>
        <div style={{position:"absolute", left:w * 0.74, top:74, width:34, height:34, borderRadius:18, background:TERM2, border:`4px solid ${MUTE}`}}/>
      </div>
    );
  };
  const skyA = `rgb(${Math.round(14 + warm * 30)},${Math.round(22 + warm * 18)},${Math.round(38 - warm * 4)})`;
  const skyB = `rgb(${Math.round(38 + warm * 72)},${Math.round(56 + warm * 38)},${Math.round(88 - warm * 14)})`;
  const glassCol = `rgba(${Math.round(52 + wAt(180) * 132)},${Math.round(86 + wAt(180) * 64)},${Math.round(128 - wAt(180) * 22)},${0.52 + wAt(180) * 0.32})`;
  const SHOT_C = (
    <div style={{position:"absolute", inset:0, overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, background:`linear-gradient(180deg, ${skyA} 0%, ${skyB} 56%, ${TERM} 100%)`}}/>
      <div style={{position:"absolute", left:-40, top:330, width:1100, height:200, borderRadius:"50% 50% 0 0", background:"linear-gradient(180deg, #22344C, #17263A)", opacity:0.4, transform:`translateX(${farOff * 0.4 - 20}px)`}}/>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={"fb" + i} style={{position:"absolute", left:-96 + i * 96 + farOff, top:196 + Math.round(seed(i) * 54), width:78, height:300, borderRadius:"5px 5px 0 0", background:`linear-gradient(180deg, #1F3149, ${TERM})`, opacity:0.7}}>
          <div style={{position:"absolute", left:14, top:-16, width:10, height:18, background:"#1F3149", opacity:0.9}}/>
          <div style={{position:"absolute", left:0, top:0, width:78, height:300, background:`repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 34px, rgba(0,0,0,0.2) 34px, rgba(0,0,0,0.2) 36px)`}}/>
        </div>
      ))}
      <div style={{position:"absolute", left:0, top:300, width:1012, height:180, background:`linear-gradient(180deg, rgba(34,52,76,0), rgba(34,52,76,0.45))`, pointerEvents:"none"}}/>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        const mbx = -118 + i * 118 + midOff;
        const bhh = 210 + Math.round(seed(i + 4) * 90);
        return (
          <div key={"mb" + i} style={{position:"absolute", left:mbx, top:GY - bhh, width:96, height:bhh, borderRadius:"7px 7px 0 0", background:`linear-gradient(180deg, ${SLATE} 0%, #263B55 40%, #1A2B41 74%, ${TERM} 100%)`, boxShadow:"14px 0 26px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.07)"}}>
            <div style={{position:"absolute", left:-6, top:0, width:108, height:12, borderRadius:4, background:"#22344C"}}/>
            <div style={{position:"absolute", left:0, top:0, width:96, height:bhh, background:`repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 44px, rgba(0,0,0,0.22) 44px, rgba(0,0,0,0.22) 46px)`}}/>
            {[0, 1, 2, 3, 4, 5].map((j) => {
              const wxx = 12 + (j % 2) * 44;
              const lit = wAt(mbx + wxx) > 0.5;
              return (
                <div key={"mw" + i + j} style={{position:"absolute", left:wxx, top:22 + Math.floor(j / 2) * 46, width:34, height:26, borderRadius:4}}>
                  <div style={{position:"absolute", inset:0, borderRadius:4, background:lit ? `linear-gradient(180deg, ${GOLD}, ${AMBER})` : "#16263A", opacity:lit ? 0.58 + seed(i + j) * 0.2 : 0.34 + seed(i + j) * 0.2}}/>
                  <div style={{position:"absolute", left:16, top:0, width:2, height:26, background:"rgba(10,17,32,0.55)"}}/>
                  <div style={{position:"absolute", left:-3, top:26, width:40, height:3, borderRadius:2, background:"#22344C"}}/>
                </div>
              );
            })}
            <div style={{position:"absolute", left:80, top:40, width:5, height:bhh - 60, background:"#1A2B41", borderRadius:3}}/>
          </div>
        );
      })}
      <div style={{position:"absolute", left:0, top:GY, width:1012, height:792 - GY, background:`linear-gradient(180deg, ${SLATE} 0%, #22344C 30%, ${TERM2} 100%)`}}/>
      <div style={{position:"absolute", left:0, top:GY, width:1012, height:50, background:`repeating-linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 92px, rgba(0,0,0,0.3) 92px, rgba(0,0,0,0.3) 95px)`}}/>
      <div style={{position:"absolute", left:0, top:GY + 24, width:1012, height:3, background:"rgba(0,0,0,0.28)"}}/>
      <div style={{position:"absolute", left:0, top:GY - 5, width:1012, height:6, background:MUTE, opacity:0.85}}/>
      <div style={{position:"absolute", left:0, top:GY - 5, width:Math.max(0, IV(wipeX, [-320, 1330], [0, 1012])), height:6, background:GREEN}}/>
      <div style={{position:"absolute", left:0, top:CURB, width:1012, height:8, background:MUTE, opacity:0.4}}/>
      <div style={{position:"absolute", left:0, top:CURB + 8, width:1012, height:86, background:`linear-gradient(180deg, ${TERM}, ${TERM2})`}}/>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"st" + i} style={{position:"absolute", left:40 + i * 180, top:CURB + 40, width:92, height:5, borderRadius:3, background:MUTE, opacity:0.18}}/>
      ))}
      <div style={{position:"absolute", left:54, top:238, width:342, height:24, borderRadius:8, background:`linear-gradient(180deg, ${MUTE}, ${SLATE})`, boxShadow:"0 8px 18px rgba(0,0,0,0.45)"}}/>
      <div style={{position:"absolute", left:60, top:262, width:330, height:386, borderRadius:"10px 10px 6px 6px", background:`linear-gradient(160deg, ${wAt(140) > 0.4 ? CLAY : SLATE} 0%, #2A3A52 44%, #1B2A40 74%, ${TERM} 100%)`, boxShadow:"0 40px 80px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.1)"}}/>
      <div style={{position:"absolute", left:60, top:262, width:330, height:386, background:`repeating-linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 26px, rgba(0,0,0,0.14) 26px, rgba(0,0,0,0.14) 28px)`, borderRadius:"10px 10px 6px 6px"}}/>
      <div style={{position:"absolute", left:76, top:268, width:298, height:38, borderRadius:9, background:`linear-gradient(180deg, ${wAt(120) > 0.5 ? CLAY : SLATE}, rgba(0,0,0,0.3))`, boxShadow:"inset 0 2px 0 rgba(255,255,255,0.18), 0 6px 12px rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", color:PAPER, fontSize:20, fontWeight:800, letterSpacing:3}}>CORNER CAFE</div>
      <div style={{position:"absolute", left:76, top:330, width:298, height:310, borderRadius:8, background:`linear-gradient(180deg, ${glassCol}, ${TERM})`, overflow:"hidden", boxShadow:"inset 0 4px 12px rgba(0,0,0,0.4)"}}>
        <div style={{position:"absolute", left:18, top:196, width:262, height:70, borderRadius:6, background:`linear-gradient(180deg, ${wAt(200) > 0.5 ? AMBER : SLATE}, #1C2A3E)`, opacity:0.92}}/>
        <div style={{position:"absolute", left:30, top:186, width:238, height:8, borderRadius:4, background:"rgba(236,233,226,0.16)"}}/>
        {[0, 1, 2, 3].map((i) => (
          <div key={"lm" + i} style={{position:"absolute", left:36 + i * 68, top:22, width:26, height:26, borderRadius:14, background:wAt(90 + i * 70) > 0.5 ? `linear-gradient(180deg, ${GOLD}, ${AMBER})` : "#1C2A3E", boxShadow:"0 8px 14px rgba(0,0,0,0.45)"}}/>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={"lc" + i} style={{position:"absolute", left:48 + i * 68, top:0, width:2, height:22, background:MUTE, opacity:0.45}}/>
        ))}
        <div style={{position:"absolute", left:36, top:118, width:226, height:52, borderRadius:6, background:"rgba(236,233,226,0.07)"}}/>
        {[0, 1, 2].map((i) => (
          <div key={"jar" + i} style={{position:"absolute", left:52 + i * 72, top:126, width:26, height:36, borderRadius:"4px 4px 8px 8px", background:`linear-gradient(180deg, rgba(236,233,226,0.3), rgba(58,92,132,0.35))`}}/>
        ))}
        <div style={{position:"absolute", left:0, top:0, width:298, height:310, background:"linear-gradient(122deg, rgba(236,233,226,0.1) 0%, rgba(236,233,226,0) 34%, rgba(236,233,226,0.07) 46%, rgba(236,233,226,0) 62%)"}}/>
        <div style={{position:"absolute", left:146, top:0, width:5, height:310, background:"rgba(10,17,32,0.55)"}}/>
        <div style={{position:"absolute", left:0, top:150, width:298, height:5, background:"rgba(10,17,32,0.45)"}}/>
      </div>
      <div style={{position:"absolute", left:112, top:452, width:100, height:188, borderRadius:"8px 8px 0 0", background:`linear-gradient(180deg, ${wAt(150) > 0.5 ? AMBER : SLATE} 0%, #2A3A52 56%, #1C2A3E 100%)`, boxShadow:"inset 0 2px 0 rgba(255,255,255,0.12), 0 10px 18px rgba(0,0,0,0.4)"}}>
        <div style={{position:"absolute", left:12, top:14, width:76, height:78, borderRadius:5, background:"rgba(10,17,32,0.42)", border:"2px solid rgba(236,233,226,0.14)"}}/>
        <div style={{position:"absolute", left:12, top:104, width:76, height:26, borderRadius:4, background:"rgba(10,17,32,0.3)"}}/>
        <div style={{position:"absolute", left:24, top:112, width:52, height:6, borderRadius:3, background:MUTE, opacity:0.55}}/>
        <div style={{position:"absolute", left:80, top:104, width:11, height:11, borderRadius:6, background:`linear-gradient(180deg, ${GOLD}, #8A6428)`}}/>
        <div style={{position:"absolute", left:8, top:160, width:84, height:22, borderRadius:3, background:"rgba(236,233,226,0.12)"}}/>
      </div>
      <div style={{position:"absolute", left:98, top:634, width:128, height:16, borderRadius:4, background:`linear-gradient(180deg, ${MUTE}, #4A5364)`}}/>
      <div style={{position:"absolute", left:104, top:626, width:116, height:12, borderRadius:3, background:`repeating-linear-gradient(90deg, ${CLAY} 0px, ${CLAY} 8px, #8C4C34 8px, #8C4C34 16px)`, opacity:0.9}}/>
      <div style={{position:"absolute", left:76, top:330, width:298, height:shutH, borderRadius:"6px 6px 4px 4px", background:`repeating-linear-gradient(180deg, #45607F 0px, #45607F 6px, #22344C 6px, #22344C 8px, #1C2A3E 8px, #1C2A3E 14px)`, boxShadow:"0 14px 26px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.1)"}}/>
      <div style={{position:"absolute", left:72, top:322, width:306, height:14, borderRadius:6, background:`linear-gradient(180deg, ${MUTE}, ${SLATE})`, boxShadow:"0 4px 10px rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute", left:58, top:310 + awnDrop, width:awnW, height:54, borderRadius:"6px 6px 0 0", background:`repeating-linear-gradient(90deg, ${CLAY} 0px, ${CLAY} 26px, ${PAPER} 26px, ${PAPER} 52px)`, boxShadow:"0 16px 28px rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.22)", overflow:"hidden"}}>
        <div style={{position:"absolute", left:0, top:0, width:awnW, height:54, background:"linear-gradient(180deg, rgba(255,255,255,0.14), rgba(0,0,0,0.22))"}}/>
        <div style={{position:"absolute", left:0, top:0, width:awnW, height:54, background:`repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 26px)`}}/>
      </div>
      <div style={{position:"absolute", left:58, top:362 + awnDrop, width:awnW, height:14, background:`repeating-linear-gradient(90deg, ${CLAY} 0px, ${CLAY} 26px, ${PAPER} 26px, ${PAPER} 52px)`, clipPath:"polygon(0% 0%, 100% 0%, 100% 40%, 96% 100%, 92% 40%, 88% 40%, 84% 100%, 80% 40%, 76% 40%, 72% 100%, 68% 40%, 64% 40%, 60% 100%, 56% 40%, 52% 40%, 48% 100%, 44% 40%, 40% 40%, 36% 100%, 32% 40%, 28% 40%, 24% 100%, 20% 40%, 16% 40%, 12% 100%, 8% 40%, 4% 40%, 0% 100%)"}}/>
      <div style={{position:"absolute", left:60, top:378, width:awnW * 0.94, height:22, background:"rgba(0,0,0,0.22)", borderRadius:4, opacity:0.5}}/>
      <div style={{position:"absolute", left:296, top:340, width:64, height:5, borderRadius:3, background:`linear-gradient(180deg, ${MUTE}, #4A5364)`}}/>
      <div style={{position:"absolute", left:300, top:344, width:3, height:24, background:MUTE, opacity:0.85, transform:`rotate(${Math.sin(s2 * 0.3) * 4}deg)`, transformOrigin:"50% 0%"}}/>
      <div style={{position:"absolute", left:352, top:344, width:3, height:24, background:MUTE, opacity:0.85, transform:`rotate(${Math.sin(s2 * 0.3) * 4}deg)`, transformOrigin:"50% 0%"}}/>
      <div style={{position:"absolute", left:254, top:366, width:106, height:52, transform:`rotate(${Math.sin(s2 * 0.3) * 3}deg)`, transformOrigin:"70% 0%"}}>
        <div style={{position:"absolute", left:0, top:2, width:106, height:50, borderRadius:8, background:openIn > 0.5 ? `linear-gradient(180deg, #4FB489, ${GREEN})` : `linear-gradient(180deg, #D9614F, ${RED})`, border:`3px solid ${openIn > 0.5 ? "#2E7D5A" : "#9B3327"}`, display:"flex", alignItems:"center", justifyContent:"center", color:PAPER, fontSize:17, fontWeight:900, letterSpacing:1.6, transform:`scaleY(${signSY})`, transformOrigin:"50% 50%", boxShadow:"0 10px 20px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2)"}}>{openIn > 0.5 ? "OPEN" : "CLOSED"}</div>
      </div>
      <div style={{position:"absolute", left:382, top:266, width:10, height:378, borderRadius:5, background:`linear-gradient(90deg, #4A5364, #262E3C)`, boxShadow:"3px 0 8px rgba(0,0,0,0.4)"}}/>
      {[0, 1, 2].map((i) => (
        <div key={"dpb" + i} style={{position:"absolute", left:378, top:326 + i * 118, width:18, height:8, borderRadius:3, background:MUTE, opacity:0.7}}/>
      ))}
      <div style={{position:"absolute", left:70, top:640, width:310, height:14, borderRadius:7, background:"rgba(0,0,0,0.45)", opacity:0.6}}/>
      <div style={{position:"absolute", left:420, top:248, width:280, height:212, borderRadius:16, background:`linear-gradient(180deg, #27394F 0%, #1A2940 56%, ${TERM} 100%)`, border:`3px solid ${warm > 0.5 ? GREEN : SLATE}`, boxShadow:"0 26px 52px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.08)"}}/>
      <div style={{position:"absolute", left:434, top:260, width:252, height:34, borderRadius:8, background:`linear-gradient(180deg, ${SLATE}, #22344C)`, display:"flex", alignItems:"center", justifyContent:"center", color:CREAM, fontSize:15, fontWeight:800, letterSpacing:2.2, boxShadow:"inset 0 2px 0 rgba(255,255,255,0.14)"}}>MENU &middot; LATTE</div>
      <div style={{position:"absolute", left:452, top:308, width:216, height:126, borderRadius:14, background:warm > 0.5 ? `linear-gradient(180deg, #4FB489, ${GREEN})` : `linear-gradient(180deg, #D9614F, ${RED})`, border:`3px solid ${warm > 0.5 ? "#2E7D5A" : "#9B3327"}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 26px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.18)"}}>
        <span style={{color:PAPER, fontSize:80, fontWeight:900, lineHeight:1, textShadow:"0 6px 0 rgba(0,0,0,0.22)"}}>{warm > 0.5 ? "$4" : "$6"}</span>
      </div>
      <span style={{position:"absolute", left:452, top:438, color:MUTE, fontSize:14, fontWeight:900, letterSpacing:2.6}}>SINGLE ORIGIN &middot; 12OZ</span>
      <div style={{position:"absolute", left:520, top:460, width:80, height:14, borderRadius:4, background:`linear-gradient(180deg, #4A5364, #232B38)`}}/>
      <div style={{position:"absolute", left:552, top:474, width:16, height:174, background:`linear-gradient(90deg, #4A5364, #232B38)`, borderRadius:4}}/>
      <div style={{position:"absolute", left:520, top:640, width:80, height:12, borderRadius:6, background:"rgba(0,0,0,0.45)", opacity:0.6}}/>
      <div style={{position:"absolute", left:398, top:584, width:74, height:64, borderRadius:"6px 6px 10px 10px", background:`linear-gradient(180deg, ${CLAY}, #7A3F2B)`, boxShadow:"0 12px 22px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.16)"}}/>
      <div style={{position:"absolute", left:394, top:578, width:82, height:12, borderRadius:5, background:`linear-gradient(180deg, #E08A63, ${CLAY})`}}/>
      {[0, 1, 2, 3].map((i) => (
        <div key={"fol" + i} style={{position:"absolute", left:404 + i * 16, top:540 + (i % 2) * 8, width:16, height:44, borderRadius:"9px 9px 3px 3px", background:`linear-gradient(180deg, #4FB489, #24614A)`, transform:`rotate(${-16 + i * 11 + Math.sin(s2 * 0.26 + i) * 3}deg)`, transformOrigin:"50% 100%"}}/>
      ))}
      <div style={{position:"absolute", left:948, top:566, width:26, height:84, borderRadius:"12px 12px 4px 4px", background:`linear-gradient(90deg, #4A5364, #1F2733)`, boxShadow:"-4px 12px 20px rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute", left:948, top:596, width:26, height:6, background:GOLD, opacity:0.75}}/>
      {s2 < 15 ? (
        <Actor x={gremX} groundY={GY} size={130} shadow={gEj < 0.05}>
          <div style={{position:"relative", width:130, height:130, transform:`translateY(${gremLift}px) rotate(${gremRot}deg)`, transformOrigin:"50% 60%"}}>
            <div style={{position:"absolute", left:27, top:35, width:78, height:78, borderRadius:"39px 39px 26px 26px", background:"linear-gradient(160deg, #7A6698 0%, #4A3A63 58%, #241C36 100%)", boxShadow:"0 14px 26px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.16)"}}/>
            <div style={{position:"absolute", left:10, top:16, width:34, height:44, background:"linear-gradient(180deg,#5B4A78,#2C2340)", clipPath:"polygon(100% 100%, 0% 40%, 70% 0%)", borderRadius:4}}/>
            <div style={{position:"absolute", left:86, top:16, width:34, height:44, background:"linear-gradient(180deg,#5B4A78,#2C2340)", clipPath:"polygon(0% 100%, 100% 40%, 30% 0%)", borderRadius:4}}/>
            <div style={{position:"absolute", left:43, top:59, width:14, height:11, borderRadius:6, background:AMBER}}/>
            <div style={{position:"absolute", left:73, top:59, width:14, height:11, borderRadius:6, background:AMBER}}/>
            <div style={{position:"absolute", left:45, top:81, width:42, height:14, borderRadius:3, background:INK, clipPath:"polygon(0 0,100% 0,88% 100%,72% 30%,54% 100%,38% 30%,20% 100%)"}}/>
            <div style={{position:"absolute", left:23, top:97, width:84, height:20, borderRadius:"10px 10px 12px 12px", background:"linear-gradient(180deg, #4A3A63, #241C36)"}}/>
          </div>
        </Actor>
      ) : null}
      {s2 >= 15 ? (
        <Actor x={c1X} groundY={GY} size={200} shadow>
          <div style={{position:"relative", width:200, height:200, transform:`translateY(${stepBob(0)}px)`}}>
            <Mascot lf={lf} size={200} beanie={1} scarf={1} cup={1} cheer={IV(s2, [22, 40], [0.2, 0.9])} gaze={6}/>
          </div>
        </Actor>
      ) : null}
      {s2 >= 24 ? (
        <Actor x={c2X} groundY={GY} size={200} shadow>
          <div style={{position:"relative", width:200, height:200, transform:`translateY(${stepBob(2.1)}px)`}}>
            <Mascot lf={lf} size={200} girl={1} tote={1} headphones={1} cheer={IV(s2, [30, 42], [0.2, 0.85])} gaze={6}/>
          </div>
        </Actor>
      ) : null}
      {s2 >= 32 ? (
        <Actor x={c3X} groundY={GY} size={190} shadow>
          <div style={{position:"relative", width:190, height:190, transform:`translateY(${stepBob(1.1)}px)`}}>
            <Mascot lf={lf} size={190} suit={1} backpack={1} glasses={1} cheer={IV(s2, [36, 42], [0.2, 0.8])} gaze={5}/>
          </div>
        </Actor>
      ) : null}
      <Actor x={872} groundY={GY} size={196} shadow>
        <Mascot lf={lf} size={196} wizard={1} apron={1} cheer={IV(s2, [2, 24], [0.1, 0.9])} gaze={-4}/>
      </Actor>
      <div style={{position:"absolute", left:wipeX - 240, top:0, width:244, height:792, background:`linear-gradient(90deg, rgba(63,158,116,0) 0%, rgba(63,158,116,0.26) 62%, rgba(236,233,226,0.34) 100%)`, opacity:waveOn, pointerEvents:"none"}}/>
      <div style={{position:"absolute", left:wipeX - 7, top:0, width:8, height:792, background:CREAM, opacity:waveOn * 0.75, pointerEvents:"none"}}/>
      {[0, 1, 2].map((k) => Bus(k))}
      {s2 >= 30 ? (
        <div style={{position:"absolute", left:672, top:92, width:300, height:160, borderRadius:18, background:`linear-gradient(180deg, #4FB489 0%, ${GREEN} 46%, #1F5340 100%)`, border:"3px solid #2E7D5A", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, transform:`scale(${IV(s2, [30, 37, 41], [0.5, 1.12, 1])})`, transformOrigin:"50% 50%", boxShadow:"0 22px 44px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2)"}}>
          <div style={{fontSize:34, color:PAPER, fontWeight:900, lineHeight:1}}>&#10003;</div>
          <div style={{fontSize:28, color:PAPER, fontWeight:900, letterSpacing:5}}>FIXED</div>
          <div style={{fontSize:15, color:PAPER, fontWeight:900, letterSpacing:2.4}}>1 CHANGE</div>
        </div>
      ) : null}
      <div style={{position:"absolute", left:0, top:620, width:1012, height:172, background:`linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,${0.28 - warm * 0.1}))`, pointerEvents:"none"}}/>
    </div>
  );
  const zoom = IV(lf, [0, 134], [1.005, 1.035]);
  return (
    <AbsoluteFill style={{overflow:"hidden", fontFamily:"Inter, system-ui, sans-serif"}}>
      <div style={{position:"absolute", inset:0, transform:`scale(${zoom})`, transformOrigin:"50% 50%"}}>
        {SHOT === 0 ? SHOT_A : SHOT === 1 ? SHOT_B : SHOT_C}
        {Cut}
        <div style={{position:"absolute", left:0, top:0, width:1012, height:792, border:`2px solid ${SHOT === 2 && warm > 0.5 ? GREEN : RED}`, opacity:0.18, pointerEvents:"none"}}/>
      </div>
      <SimTag text="SIM  SOLVED" x={800} y={22}/>
      <SimScan/>
    </AbsoluteFill>
  );
};

const S6Body: React.FC<{lf:number}> = ({lf}) => {
  // ================= helpers =================
  const IV = (x:number, ins:number[], outs:number[]) => interpolate(x, ins, outs, {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
  const cl = (v:number,a:number,b:number)=> v<a?a:(v>b?b:v);
  const MONO = "ui-monospace,'SF Mono',Menlo,monospace";
  // ================= palette (NO glow anywhere) =================
  const CREAM="#ECE9E2", PAPER="#F7F3EA";
  const SLATE="#3A5C84", CLAY_="#D2724E", CLAY_DK="#A3512F";
  const AMBER="#CF9544", GOLD_="#E7B24C", GREEN="#3F9E74", MUTE="#9A968B", RED="#C44A3A";
  const TERM="#0E1626", TERM2="#0A1120";
  const GRN_L="#5FB891";
  const SKY1="#F7F3EA", SKY2="#EFDCC0", SKY3="#E0BE96";
  const BRICK1="#ECE1CE", BRICK2="#C9AC88";
  const FAR1="#D9CDBB", FAR2="#C4B49F";
  const WOOD1="#7A5638", WOOD2="#4A3120";
  const IRON="#3B3630";
  // ================= SHOT MAP (hard cuts) =================
  const CUT_B = 58, CUT_C = 128, CUT_D = 188;
  const SHOT = lf < CUT_B ? 0 : lf < CUT_C ? 1 : lf < CUT_D ? 2 : 3;
  const s0 = lf, s1 = lf - CUT_B, s2 = lf - CUT_C, s3 = lf - CUT_D;
  const GY_BACK = 612, GY = 640, GYF = 668;
  // ================= shared wide-shot art builders =================
  const wheel = (ks:string, wx:number, wy:number, r:number, dir:number, t:number) => (
    <div key={ks} style={{position:"absolute", left:wx, top:wy, width:r*2, height:r*2, borderRadius:"50%", background:"linear-gradient(160deg,#4A4238,#221E18)", border:`4px solid ${MUTE}`, transform:`rotate(${t*13*dir}deg)`}}>
      <div style={{position:"absolute", left:r-2, top:3, width:4, height:r*2-6, background:MUTE, borderRadius:2}}/>
      <div style={{position:"absolute", left:3, top:r-2, width:r*2-6, height:4, background:"rgba(154,150,139,0.55)", borderRadius:2}}/>
      <div style={{position:"absolute", left:r-7, top:r-7, width:14, height:14, borderRadius:"50%", background:`linear-gradient(160deg, ${CREAM}, #8E887C)`}}/>
    </div>
  );
  const vehicle = (x:number, gy:number, sc:number, col:string, kind:number, flip:boolean, ks:string, t:number) => (
    <div key={ks} style={{position:"absolute", left:x, top:gy-150*sc, width:420, height:150, transform:`scale(${sc})`, transformOrigin:"50% 100%"}}>
      <div style={{position:"absolute", inset:0, transform:`scaleX(${flip?-1:1})`}}>
        {kind===0 ? (
          <React.Fragment>
            <div style={{position:"absolute", left:0, top:24, width:288, height:88, borderRadius:9, background:`linear-gradient(172deg, ${col} 0%, rgba(0,0,0,0.36) 150%)`, boxShadow:"0 14px 22px -8px rgba(50,32,16,0.55)"}}/>
            <div style={{position:"absolute", left:6, top:26, width:276, height:5, borderRadius:3, background:"rgba(255,255,255,0.42)"}}/>
            <div style={{position:"absolute", left:22, top:44, width:150, height:44, borderRadius:5, background:"rgba(255,255,255,0.30)"}}/>
            <div style={{position:"absolute", left:94, top:44, width:3, height:44, background:"rgba(30,20,10,0.35)"}}/>
            <div style={{position:"absolute", left:284, top:4, width:130, height:108, borderRadius:"12px 12px 6px 6px", background:`linear-gradient(172deg, ${col} 0%, rgba(0,0,0,0.32) 150%)`}}/>
            <div style={{position:"absolute", left:300, top:18, width:96, height:40, borderRadius:5, background:`linear-gradient(160deg, ${CREAM}, #C3A886)`}}/>
            <div style={{position:"absolute", left:296, top:14, width:104, height:4, borderRadius:2, background:"rgba(255,255,255,0.5)"}}/>
            <div style={{position:"absolute", left:392, top:66, width:26, height:16, borderRadius:4, background:`linear-gradient(180deg, ${PAPER}, #C6AC86)`}}/>
            <div style={{position:"absolute", left:280, top:16, width:16, height:9, borderRadius:3, background:"rgba(40,26,14,0.6)"}}/>
            <div style={{position:"absolute", left:0, top:106, width:414, height:12, borderRadius:4, background:"rgba(40,26,14,0.55)"}}/>
            <div style={{position:"absolute", left:0, top:88, width:414, height:4, background:"rgba(255,255,255,0.16)"}}/>
            {wheel(ks+"w0", 52, 96, 26, flip?-1:1, t)}
            {wheel(ks+"w1", 306, 96, 26, flip?-1:1, t)}
          </React.Fragment>
        ) : kind===1 ? (
          <React.Fragment>
            <div style={{position:"absolute", left:0, top:10, width:420, height:100, borderRadius:14, background:`linear-gradient(172deg, ${col} 0%, rgba(0,0,0,0.34) 150%)`, boxShadow:"0 14px 24px -8px rgba(50,32,16,0.55)"}}/>
            {[0,1,2,3,4].map(i=>(
              <div key={ks+"g"+i} style={{position:"absolute", left:22+i*80, top:26, width:60, height:38, borderRadius:5, background:"rgba(255,255,255,0.32)"}}/>
            ))}
            {[0,1,2,3,4].map(i=>(
              <div key={ks+"gs"+i} style={{position:"absolute", left:22+i*80, top:26, width:60, height:6, borderRadius:3, background:"rgba(255,255,255,0.48)"}}/>
            ))}
            <div style={{position:"absolute", left:0, top:74, width:420, height:12, background:`linear-gradient(90deg, ${CREAM} 0 34px, rgba(0,0,0,0) 34px)`, opacity:0.5}}/>
            <div style={{position:"absolute", left:14, top:0, width:392, height:12, borderRadius:6, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
            <div style={{position:"absolute", left:150, top:-9, width:74, height:10, borderRadius:4, background:`linear-gradient(180deg, ${CREAM}, ${MUTE})`}}/>
            <div style={{position:"absolute", left:238, top:22, width:96, height:22, borderRadius:4, background:`linear-gradient(170deg, ${CREAM}, #BFA684)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:12, fontWeight:900, letterSpacing:1.4, color:"#4A3A22"}}>LINE 7</div>
            <div style={{position:"absolute", left:0, top:104, width:420, height:12, borderRadius:4, background:"rgba(40,26,14,0.55)"}}/>
            {wheel(ks+"w0", 56, 94, 26, flip?-1:1, t)}
            {wheel(ks+"w1", 208, 94, 26, flip?-1:1, t)}
            {wheel(ks+"w2", 344, 94, 26, flip?-1:1, t)}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{position:"absolute", left:24, top:14, width:250, height:98, borderRadius:"10px 10px 8px 8px", background:`linear-gradient(172deg, ${col} 0%, rgba(0,0,0,0.34) 150%)`, boxShadow:"0 14px 22px -8px rgba(50,32,16,0.55)"}}/>
            <div style={{position:"absolute", left:30, top:16, width:238, height:5, borderRadius:3, background:"rgba(255,255,255,0.42)"}}/>
            <div style={{position:"absolute", left:44, top:34, width:130, height:44, borderRadius:5, background:`linear-gradient(170deg, ${PAPER}, #C8AF8C)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:15, fontWeight:900, letterSpacing:1.6, color:"#4A3A22"}}>BEANS</div>
            <div style={{position:"absolute", left:262, top:34, width:112, height:78, borderRadius:"10px 10px 6px 6px", background:`linear-gradient(172deg, ${col} 0%, rgba(0,0,0,0.30) 150%)`}}/>
            <div style={{position:"absolute", left:274, top:44, width:86, height:34, borderRadius:5, background:`linear-gradient(160deg, ${CREAM}, #C3A886)`}}/>
            <div style={{position:"absolute", left:358, top:82, width:22, height:14, borderRadius:4, background:`linear-gradient(180deg, ${PAPER}, #C6AC86)`}}/>
            <div style={{position:"absolute", left:24, top:106, width:356, height:12, borderRadius:4, background:"rgba(40,26,14,0.55)"}}/>
            {wheel(ks+"w0", 66, 96, 24, flip?-1:1, t)}
            {wheel(ks+"w1", 288, 96, 24, flip?-1:1, t)}
          </React.Fragment>
        )}
      </div>
    </div>
  );
  // three lanes -> permanent large-area traffic in transit
  const LANES = [
    {t0:0,  per:84, dir: 1, gy:GY_BACK-6,  sc:1.00, col:SLATE, kind:0},
    {t0:26, per:84, dir:-1, gy:GY_BACK-46, sc:0.80, col:CLAY_, kind:1},
    {t0:54, per:96, dir: 1, gy:GY_BACK-26, sc:0.66, col:"#6E8A55", kind:2},
  ];
  const trafficFor = (t:number, ks:string) => LANES.map((L,li)=>
    [0, L.per/2].map((o,j)=>{
      const u = (((t + L.t0 + o) % L.per) + L.per) % L.per;
      const p = u/L.per;
      const x = L.dir>0 ? -470 + p*1510 : 1040 - p*1510;
      return vehicle(x, L.gy, L.sc, L.col, L.kind, L.dir<0, ks+"vh"+li+j, t);
    })
  );
  const sweepFor = (t:number, ks:string) => [0, 95].map((o,i)=>{
    const u = (((t + o) % 190) + 190) % 190;
    const x = -700 + u*9.0;
    return <div key={ks+"csh"+i} style={{position:"absolute", left:x, top:GY-52, width:660, height:180, borderRadius:"50%", background:"rgba(78,50,24,0.14)", transform:"skewX(-14deg)"}}/>;
  });
  const buntFlags = (t:number, amt:number, y0:number, x0:number, x1:number, n:number, sag:number, ks:string, cols:string[]) =>
    Array.from({length:n},(_,i)=>{
      const p = i/(n-1);
      const x = x0 + (x1-x0)*p;
      const y = y0 + Math.sin(p*Math.PI)*sag;
      const on = cl((amt*n - i)/1.2, 0, 1);
      const sw = Math.sin(t/9 + i*0.6)*6 + Math.sin(t/3.1 + i*1.4)*2;
      return (
        <div key={ks+i} style={{position:"absolute", left:x-13, top:y, width:26, height:34*on, transformOrigin:"50% 0%", transform:`rotate(${sw}deg) scaleY(${on})`, background:`linear-gradient(160deg, ${cols[i%cols.length]} 0%, rgba(0,0,0,0.16) 130%)`, clipPath:"polygon(0 0,100% 0,50% 100%)", opacity:on}}/>
      );
    });
  const lanternRow = (t:number, lit:number, x0:number, x1:number, y0:number, sag:number, n:number, ks:string) =>
    Array.from({length:n},(_,i)=>{
      const p = i/(n-1);
      const x = x0 + (x1-x0)*p;
      const y = y0 + Math.sin(p*Math.PI)*sag + Math.sin(t/22+i)*2;
      const on = cl((lit - i*5)/7, 0, 1);
      const c = [GOLD_,CLAY_,CREAM,AMBER][i%4];
      const dim = "linear-gradient(180deg, #A29D93 0%, #6E6A62 150%)";
      return (
        <div key={ks+i} style={{position:"absolute", left:x-9, top:y, width:18, height:20, borderRadius:"9px 9px 8px 8px", background: on>0.5 ? `linear-gradient(180deg, ${c} 0%, rgba(0,0,0,0.22) 150%)` : dim, border:"1px solid rgba(90,60,32,0.30)", transform:`scale(${0.82+0.18*on})`, opacity:0.55+0.4*on}}>
          <div style={{position:"absolute", left:6, top:-4, width:6, height:5, borderRadius:2, background:"rgba(70,46,24,0.6)"}}/>
          <div style={{position:"absolute", left:3, top:3, width:5, height:9, borderRadius:3, background:"rgba(255,255,255,0.45)", opacity:0.3+0.5*on}}/>
        </div>
      );
    });
  const steam = (t:number, x:number, y:number, ks:string, sd:number) =>
    Array.from({length:4},(_,i)=>{
      const u = (((t*1.5 + sd*17 + i*7) % 27)/27);
      const op = cl(Math.sin(u*Math.PI),0,1)*0.5;
      return <div key={ks+i} style={{position:"absolute", left:x + Math.sin(u*5+i)*7 + u*4, top:y - u*34, width:8+u*9, height:8+u*9, borderRadius:"50%", background:PAPER, opacity:op}}/>;
    });
  const burst = (t:number, start:number, n:number, cx:number, cy:number, spread:number, key:string) => {
    if (t < start) return null;
    const u = (t - start)/30;
    return Array.from({length:n},(_,i)=>{
      const s1=seed(i*3.1+start+1), s2=seed(i*7.7+start+2), s3=seed(i*2.2+start+9);
      const ang = (-Math.PI/2) + (s1-0.5)*spread;
      const sp  = 340 + s2*560;
      const x = cx + Math.cos(ang)*sp*u;
      const y = cy + Math.sin(ang)*sp*u + 520*u*u;
      const op = cl(1 - (u-0.9)/1.5, 0, 1);
      if (op<=0.01) return null;
      const col = [CLAY_,GOLD_,GREEN,CREAM,AMBER][Math.floor(s3*5)];
      const w = 7 + s2*7, h = 4 + s1*5;
      return <div key={key+i} style={{position:"absolute", left:x, top:y, width:w, height:h, borderRadius:2, background:col, opacity:op*0.9, transform:`rotate(${(s1*360)+t*(6+s2*10)}deg)`}}/>;
    });
  };
  const ambientFor = (t:number, ks:string) => Array.from({length:30},(_,i)=>{
    const s1=seed(i+11), s2=seed(i*2.7+4), s3=seed(i*5.3+8);
    const x = s1*1000 - 4;
    const y = ((s2*900 + t*(2.0+s3*3.6)) % 940) - 80;
    const col = [CLAY_,GOLD_,GREEN,PAPER][Math.floor(s3*4)];
    return <div key={ks+i} style={{position:"absolute", left:x, top:y, width:6+s3*5, height:4+s1*4, borderRadius:2, background:col, opacity:0.28+s2*0.24, transform:`rotate(${t*(3+s1*7)+s2*300}deg)`}}/>;
  });
  // tumbling leaves (rotation + drift) — foreground life
  const leavesFor = (t:number, ks:string) => Array.from({length:7},(_,i)=>{
    const s1=seed(i*1.9+31), s2=seed(i*4.3+17);
    const u = (((t*(3.4+s1*2.6) + s2*900) % 1180) + 1180) % 1180;
    const x = u - 90;
    const y = 470 + s1*230 + Math.sin(u/46 + i)*34;
    return <div key={ks+i} style={{position:"absolute", left:x, top:y, width:16+s2*9, height:9+s1*5, borderRadius:"60% 20% 60% 20%", background:`linear-gradient(150deg, ${i%2?GOLD_:CLAY_}, rgba(90,50,20,0.55))`, opacity:0.62, transform:`rotate(${t*(5+s1*9)+s2*300}deg)`}}/>;
  });
  const blimp = (t:number, t0:number, ks:string) => {
    const u = t - t0;
    if (u < 0 || u > 78) return null;
    const x = -120 + u*9.2;
    const bob = Math.sin(t/13)*6;
    const txtOp = cl(Math.min((x + 46)/26, (556 - x)/26), 0, 1);
    return (
      <div key={ks} style={{position:"absolute", left:x, top:196+bob, width:340, height:112, zIndex:6}}>
        <div style={{position:"absolute", left:0, top:0, width:250, height:88, borderRadius:"50%", background:`linear-gradient(168deg, ${PAPER} 0%, ${BRICK2} 120%)`, boxShadow:"0 12px 20px -10px rgba(70,44,22,0.45)"}}/>
        <div style={{position:"absolute", left:16, top:8, width:190, height:16, borderRadius:"50%", background:"rgba(255,255,255,0.55)"}}/>
        {[52,104,156].map((sx,i)=>(
          <div key={ks+"sm"+i} style={{position:"absolute", left:sx, top:4, width:3, height:80, background:"rgba(120,86,54,0.22)", borderRadius:2}}/>
        ))}
        <div style={{position:"absolute", left:236, top:24, width:0, height:0, borderTop:"20px solid transparent", borderBottom:"20px solid transparent", borderLeft:`34px solid ${BRICK2}`}}/>
        <div style={{position:"absolute", left:96, top:80, width:66, height:22, borderRadius:5, background:`linear-gradient(170deg, ${SLATE}, #24405E)`}}/>
        <div style={{position:"absolute", left:104, top:84, width:50, height:7, borderRadius:3, background:"rgba(255,255,255,0.35)"}}/>
        <div style={{position:"absolute", left:124, top:74, width:3, height:8, background:"rgba(70,46,24,0.55)"}}/>
        <div style={{position:"absolute", left:150, top:56, width:190, height:34, borderRadius:5, background:`linear-gradient(168deg, ${CLAY_}, ${CLAY_DK})`, border:`2px solid ${PAPER}`, opacity:txtOp, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:15, fontWeight:900, letterSpacing:2, color:PAPER}}>NOW OPEN</div>
      </div>
    );
  };
  // a balloon cluster tied to a point : bob + string sway + lag
  const balloons = (t:number, bx:number, by:number, ks:string, cols:string[]) =>
    cols.map((c,i)=>{
      const ph = t/11 + i*1.7;
      const sway = Math.sin(ph)*9;
      const rise = Math.cos(ph*0.8)*6;
      const ox = (i-1)*40 + sway;
      const oy = -i*16 + rise;
      return (
        <div key={ks+i} style={{position:"absolute", left:bx+ox, top:by+oy, width:46, height:100}}>
          <div style={{position:"absolute", left:23, top:54, width:2.5, height:46, borderRadius:2, background:"rgba(90,60,32,0.42)", transformOrigin:"50% 100%", transform:`rotate(${-sway*0.6}deg)`}}/>
          <div style={{position:"absolute", left:0, top:0, width:46, height:56, borderRadius:"50% 50% 46% 46%", background:`linear-gradient(158deg, ${c} 0%, rgba(0,0,0,0.34) 140%)`, boxShadow:"0 10px 16px -8px rgba(70,44,22,0.5)", transform:`rotate(${sway*0.35}deg)`}}/>
          <div style={{position:"absolute", left:9, top:9, width:14, height:19, borderRadius:"50%", background:"rgba(255,255,255,0.55)"}}/>
          <div style={{position:"absolute", left:19, top:53, width:9, height:8, background:c, clipPath:"polygon(50% 100%,0 0,100% 0)"}}/>
        </div>
      );
    });
  // ================= THE WIDE STREET (shots A / B / D) =================
  const Wide = (t:number, opt:{bunt:number, lit:number, ks:string}) => (
    <React.Fragment>
      {/* L1 sky */}
      <div style={{position:"absolute", inset:0, background:`linear-gradient(180deg, ${SKY1} 0%, ${SKY2} 46%, ${SKY3} 100%)`}}/>
      <div style={{position:"absolute", left:742, top:74, width:186, height:186, borderRadius:"50%", background:`linear-gradient(160deg, ${GOLD_} 0%, ${AMBER} 100%)`, opacity:0.34}}/>
      <div style={{position:"absolute", left:742, top:74, width:186, height:186, borderRadius:"50%", border:`3px solid ${AMBER}`, opacity:0.28}}/>
      <div style={{position:"absolute", left:714, top:46, width:242, height:242, borderRadius:"50%", border:`2px solid ${AMBER}`, opacity:0.14}}/>
      {[{x:60,y:150,w:250,h:44,v:0.9},{x:380,y:104,w:210,h:38,v:1.4},{x:640,y:196,w:280,h:42,v:0.6},{x:180,y:238,w:190,h:32,v:1.9}].map((c,i)=>(
        <div key={opt.ks+"cld"+i} style={{position:"absolute", left:((c.x + t*c.v + 1200)%1300)-160, top:c.y, width:c.w, height:c.h, borderRadius:c.h/2, background:PAPER, opacity:0.5}}>
          <div style={{position:"absolute", left:c.w*0.22, top:-c.h*0.4, width:c.w*0.44, height:c.h*0.9, borderRadius:"50%", background:PAPER}}/>
        </div>
      ))}
      {/* L2 far hills — aerial perspective, low contrast */}
      <div style={{position:"absolute", left:0, top:300, width:1012, height:230, opacity:0.42}}>
        <svg width={1012} height={230} viewBox="0 0 1012 230">
          <path d="M -20 210 L 90 128 L 190 178 L 300 108 L 420 172 L 540 120 L 660 186 L 790 132 L 920 190 L 1032 150 L 1032 230 L -20 230 Z" fill={FAR1}/>
          <path d="M -20 226 L 120 176 L 250 214 L 390 168 L 520 208 L 660 172 L 810 216 L 1032 184 L 1032 230 L -20 230 Z" fill={FAR2} opacity={0.85}/>
        </svg>
      </div>
      {/* birds */}
      {Array.from({length:3},(_,i)=>{
        const bx = ((t*2.6 + i*430 + 300) % 1320) - 160;
        const by = 152 + i*14 + Math.sin(t/13+i)*7;
        const wg = Math.sin(t/2.2+i)*22;
        return (
          <div key={opt.ks+"bd"+i} style={{position:"absolute", left:bx, top:by, width:26, height:12, zIndex:1}}>
            <div style={{position:"absolute", left:0, top:5, width:13, height:3, borderRadius:2, background:"#6E6155", transformOrigin:"100% 50%", transform:`rotate(${-wg}deg)`}}/>
            <div style={{position:"absolute", left:13, top:5, width:13, height:3, borderRadius:2, background:"#6E6155", transformOrigin:"0% 50%", transform:`rotate(${wg}deg)`}}/>
          </div>
        );
      })}
      {/* L3 distant skyline, parallax slow */}
      <div style={{position:"absolute", left:0, top:0, width:1012, height:792, opacity:0.30}}>
        {Array.from({length:10},(_,i)=>{
          const s=seed(i*4.4+2); const w=90+s*110; const h=150+seed(i*9.1)*190;
          const x = (((-30 + i*118 - t*0.55) % 1200) + 1200) % 1200 - 120;
          return (
            <div key={opt.ks+"sk"+i} style={{position:"absolute", left:x, top:GY_BACK-h-18, width:w, height:h, borderRadius:"8px 8px 0 0", background:"linear-gradient(180deg, #B99372 0%, #8E6A4C 100%)"}}>
              <div style={{position:"absolute", left:0, top:0, width:w, height:8, background:"rgba(255,255,255,0.30)", borderRadius:"8px 8px 0 0"}}/>
              <div style={{position:"absolute", left:8, top:24, width:w-16, height:h-40, background:`repeating-linear-gradient(90deg, rgba(247,243,234,0.34) 0 12px, rgba(0,0,0,0) 12px 30px), repeating-linear-gradient(180deg, rgba(247,243,234,0.28) 0 10px, rgba(0,0,0,0) 10px 34px)`}}/>
              {i%3===0 && <div style={{position:"absolute", left:w*0.5-3, top:-38, width:6, height:40, background:"#8E6A4C"}}/>}
            </div>
          );
        })}
      </div>
      {/* L3b mid rooftops with chimneys + aerials, faster parallax */}
      <div style={{position:"absolute", left:0, top:0, width:1012, height:792, opacity:0.5}}>
        {Array.from({length:7},(_,i)=>{
          const s=seed(i*6.1+13); const w=120+s*90; const h=100+seed(i*3.3+7)*90;
          const x = (((i*168 - t*1.35) % 1260) + 1260) % 1260 - 140;
          return (
            <div key={opt.ks+"rf"+i} style={{position:"absolute", left:x, top:GY_BACK-h-10, width:w, height:h, background:"linear-gradient(180deg, #C6A280 0%, #9A7452 100%)", borderRadius:"4px 4px 0 0"}}>
              <div style={{position:"absolute", left:-6, top:-9, width:w+12, height:11, borderRadius:3, background:"linear-gradient(180deg, #E0C6A6, #A98060)"}}/>
              <div style={{position:"absolute", left:14, top:-30, width:20, height:24, background:"#A98060", borderRadius:"2px 2px 0 0"}}/>
              <div style={{position:"absolute", left:10, top:-36, width:28, height:8, background:"#E0C6A6", borderRadius:3}}/>
              <div style={{position:"absolute", left:w-28, top:-34, width:3, height:32, background:"#7A5C40"}}/>
              <div style={{position:"absolute", left:w-40, top:-34, width:27, height:3, background:"#7A5C40"}}/>
              <div style={{position:"absolute", left:w-40, top:-26, width:27, height:3, background:"#7A5C40"}}/>
              <div style={{position:"absolute", left:12, top:22, width:w-24, height:h-34, background:"repeating-linear-gradient(90deg, rgba(247,243,234,0.36) 0 16px, rgba(0,0,0,0) 16px 40px)"}}/>
            </div>
          );
        })}
      </div>
      {/* atmospheric haze at the base of the far layers */}
      <div style={{position:"absolute", left:0, top:GY_BACK-170, width:1012, height:210, background:"linear-gradient(180deg, rgba(247,243,234,0) 0%, rgba(247,243,234,0.55) 78%)"}}/>
      {/* L4 left flanking building */}
      <div style={{position:"absolute", left:-30, top:252, width:344, height:GY_BACK-252, background:"linear-gradient(172deg, #E3CDB0 0%, #B8987A 100%)", boxShadow:"inset -14px 0 26px -14px rgba(70,44,22,0.45)"}}>
        <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(180deg, rgba(120,86,54,0.09) 0 1px, rgba(0,0,0,0) 1px 21px), repeating-linear-gradient(90deg, rgba(120,86,54,0.07) 0 1px, rgba(0,0,0,0) 1px 44px)"}}/>
      </div>
      <div style={{position:"absolute", left:-30, top:238, width:344, height:22, borderRadius:6, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
      <div style={{position:"absolute", left:-30, top:260, width:344, height:5, background:"rgba(120,86,54,0.22)"}}/>
      {[0,1].map(i=>(
        <div key={opt.ks+"lwin"+i} style={{position:"absolute", left:24+i*118, top:330, width:82, height:110, borderRadius:8, background:`linear-gradient(160deg, ${CREAM} 0%, #CDB392 100%)`, border:`4px solid ${PAPER}`, boxShadow:"0 8px 16px rgba(70,44,22,0.22)"}}>
          <div style={{position:"absolute", left:37, top:0, width:4, height:102, background:"rgba(247,243,234,0.9)"}}/>
          <div style={{position:"absolute", left:0, top:47, width:74, height:4, background:"rgba(247,243,234,0.9)"}}/>
          <div style={{position:"absolute", left:-8, top:100, width:90, height:8, borderRadius:3, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
        </div>
      ))}
      {/* left drainpipe with brackets */}
      <div style={{position:"absolute", left:288, top:262, width:10, height:GY_BACK-262, background:"linear-gradient(90deg, #C9B295, #8A7154)", borderRadius:4}}/>
      {[300,400,500].map((py,i)=>(
        <div key={opt.ks+"lbk"+i} style={{position:"absolute", left:284, top:py, width:18, height:6, borderRadius:3, background:"#8A7154"}}/>
      ))}
      <div style={{position:"absolute", left:-30, top:452, width:344, height:34, background:`repeating-linear-gradient(90deg, ${CLAY_DK} 0 26px, ${CREAM} 26px 52px)`, opacity:0.55, borderRadius:"0 0 6px 6px"}}/>
      <div style={{position:"absolute", left:-30, top:484, width:344, height:6, background:"rgba(70,44,22,0.20)"}}/>
      {/* L4 right flanking building */}
      <div style={{position:"absolute", left:706, top:262, width:340, height:GY_BACK-262, background:"linear-gradient(172deg, #E7D4B8 0%, #BE9E7C 100%)", boxShadow:"inset 14px 0 26px -14px rgba(70,44,22,0.45)"}}>
        <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(180deg, rgba(120,86,54,0.09) 0 1px, rgba(0,0,0,0) 1px 21px), repeating-linear-gradient(90deg, rgba(120,86,54,0.07) 0 1px, rgba(0,0,0,0) 1px 44px)"}}/>
      </div>
      <div style={{position:"absolute", left:706, top:248, width:340, height:22, borderRadius:6, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
      <div style={{position:"absolute", left:706, top:270, width:340, height:5, background:"rgba(120,86,54,0.22)"}}/>
      {[0,1].map(i=>(
        <div key={opt.ks+"rwin"+i} style={{position:"absolute", left:766+i*130, top:392, width:96, height:126, borderRadius:8, background:`linear-gradient(160deg, ${CREAM} 0%, #CDB392 100%)`, border:`4px solid ${PAPER}`, boxShadow:"0 8px 16px rgba(70,44,22,0.22)"}}>
          <div style={{position:"absolute", left:44, top:0, width:4, height:118, background:"rgba(247,243,234,0.9)"}}/>
          <div style={{position:"absolute", left:0, top:55, width:88, height:4, background:"rgba(247,243,234,0.9)"}}/>
          <div style={{position:"absolute", left:-8, top:116, width:104, height:8, borderRadius:3, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
          <div style={{position:"absolute", left:8, top:6, width:26, height:44, borderRadius:4, background:"rgba(255,255,255,0.5)"}}/>
        </div>
      ))}
      <div style={{position:"absolute", left:718, top:352, width:316, height:30, background:`repeating-linear-gradient(90deg, ${GREEN} 0 24px, ${CREAM} 24px 48px)`, opacity:0.5, borderRadius:"0 0 6px 6px"}}/>
      <div style={{position:"absolute", left:718, top:380, width:316, height:6, background:"rgba(70,44,22,0.18)"}}/>
      {lanternRow(t, opt.lit, -10, 300, 300, 34, 8, opt.ks+"sl1")}
      {lanternRow(t, opt.lit-40, 716, 1024, 306, 34, 8, opt.ks+"sl2")}
      {/* L5 the road */}
      <div style={{position:"absolute", left:0, top:GY_BACK, width:1012, height:792-GY_BACK, background:"linear-gradient(180deg, #E4D5BC 0%, #D2BC9E 34%, #BFA686 100%)"}}/>
      <div style={{position:"absolute", left:0, top:GY_BACK-5, width:1012, height:5, background:"rgba(120,86,54,0.30)"}}/>
      <div style={{position:"absolute", left:0, top:GY_BACK-64, width:1012, height:64, background:"linear-gradient(180deg, #C8B396 0%, #B29B7C 100%)", opacity:0.55}}/>
      {Array.from({length:14},(_,i)=>(
        <div key={opt.ks+"ln"+i} style={{position:"absolute", left:(((i*84 - t*4.4) % 1180) + 1180) % 1180 - 84, top:GY_BACK-30, width:46, height:5, borderRadius:3, background:"rgba(247,243,234,0.55)"}}/>
      ))}
      {trafficFor(t, opt.ks)}
      {/* kerb + pavement joints + drain grate */}
      <div style={{position:"absolute", left:0, top:GY, width:1012, height:6, background:"linear-gradient(90deg, rgba(120,86,54,0.10), rgba(120,86,54,0.50), rgba(120,86,54,0.10))"}}/>
      <div style={{position:"absolute", left:0, top:GY+6, width:1012, height:9, background:"linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))"}}/>
      {Array.from({length:11},(_,i)=>(
        <div key={opt.ks+"pv"+i} style={{position:"absolute", left:-40+i*104, top:GY+6, width:2, height:130, background:"rgba(120,86,54,0.16)", transform:`skewX(${(i-5)*2.4}deg)`}}/>
      ))}
      <div style={{position:"absolute", left:0, top:GYF, width:1012, height:5, background:"rgba(120,86,54,0.26)"}}/>
      <div style={{position:"absolute", left:0, top:734, width:1012, height:5, background:"rgba(120,86,54,0.18)"}}/>
      <div style={{position:"absolute", left:842, top:GY+16, width:74, height:22, borderRadius:4, background:"linear-gradient(180deg, #9E8A6E, #6F5C44)"}}>
        {[0,1,2,3].map(i=>(<div key={opt.ks+"gr"+i} style={{position:"absolute", left:8+i*16, top:4, width:7, height:14, borderRadius:2, background:"rgba(30,20,10,0.55)"}}/>))}
      </div>
      <div style={{position:"absolute", left:0, top:0, width:1012, height:792, overflow:"hidden", zIndex:2, pointerEvents:"none"}}>{sweepFor(t, opt.ks)}</div>
      {/* ============ L6 HERO SHOPFRONT ============ */}
      <div style={{position:"absolute", left:300, top:250, width:420, height:390, borderRadius:"16px 16px 0 0", overflow:"hidden", zIndex:3, background:`linear-gradient(170deg, ${BRICK1} 0%, ${BRICK2} 100%)`, boxShadow:"0 26px 54px -18px rgba(70,44,22,0.5), inset 0 2px 0 rgba(255,255,255,0.45)"}}>
        <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(180deg, rgba(120,86,54,0.10) 0 1.5px, rgba(0,0,0,0) 1.5px 22px)"}}/>
        <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, rgba(120,86,54,0.07) 0 1.5px, rgba(0,0,0,0) 1.5px 48px)"}}/>
        <div style={{position:"absolute", left:0, top:11, width:420, height:22, background:"repeating-linear-gradient(90deg, rgba(120,86,54,0.05) 0 1.5px, rgba(0,0,0,0) 1.5px 48px)", transform:"translateX(24px)"}}/>
        <div style={{position:"absolute", left:((t*6.8) % 700) - 200, top:0, width:200, height:390, background:"linear-gradient(90deg, rgba(231,178,76,0) 0%, rgba(231,178,76,0.20) 50%, rgba(231,178,76,0) 100%)"}}/>
      </div>
      <div style={{position:"absolute", left:286, top:238, width:448, height:26, zIndex:3, borderRadius:8, background:`linear-gradient(180deg, ${PAPER} 0%, ${BRICK2} 100%)`, boxShadow:"0 6px 14px rgba(70,44,22,0.30)"}}/>
      <div style={{position:"absolute", left:286, top:262, width:448, height:6, zIndex:3, background:"rgba(70,44,22,0.24)"}}/>
      {/* roof tiles */}
      <div style={{position:"absolute", left:292, top:214, width:436, height:26, zIndex:3, borderRadius:"8px 8px 0 0", background:`repeating-linear-gradient(90deg, #B08A66 0 16px, #C79E76 16px 32px)`, boxShadow:"inset 0 3px 0 rgba(255,255,255,0.30)"}}/>
      {/* chimney + steam */}
      <div style={{position:"absolute", left:648, top:170, width:44, height:56, zIndex:3, borderRadius:"4px 4px 0 0", background:`linear-gradient(160deg, ${BRICK2}, #9C7C5A)`}}>
        <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(180deg, rgba(120,86,54,0.16) 0 1px, rgba(0,0,0,0) 1px 12px)"}}/>
      </div>
      <div style={{position:"absolute", left:642, top:162, width:56, height:14, zIndex:3, borderRadius:4, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
      {steam(t, 654, 152, opt.ks+"chm", 3)}
      {/* CAFE fascia sign with bolts */}
      <div style={{position:"absolute", left:376, top:296, width:268, height:74, zIndex:5, borderRadius:12, background:`linear-gradient(165deg, ${TERM} 0%, ${TERM2} 100%)`, border:`2px solid ${AMBER}`, boxShadow:"0 12px 26px rgba(40,24,10,0.4), inset 0 1px 0 rgba(255,255,255,0.10)", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div style={{fontFamily:MONO, fontSize:34, fontWeight:800, letterSpacing:6, color:GOLD_}}>CAFE</div>
        {[[10,9],[250,9],[10,57],[250,57]].map((p,i)=>(
          <div key={opt.ks+"bolt"+i} style={{position:"absolute", left:p[0], top:p[1], width:8, height:8, borderRadius:"50%", background:`linear-gradient(160deg, ${AMBER}, #7C5518)`}}/>
        ))}
        <div style={{position:"absolute", left:12, top:6, width:244, height:14, borderRadius:7, background:"linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0))"}}/>
      </div>
      {/* awning : scalloped edge, seams, cast shadow on wall */}
      <div style={{position:"absolute", left:290, top:436, width:440, height:22, zIndex:4, background:"rgba(70,44,22,0.20)", borderRadius:6}}/>
      <div style={{position:"absolute", left:290, top:382, width:440, height:58, borderRadius:"10px 10px 4px 4px", overflow:"hidden", zIndex:5, boxShadow:"0 12px 22px -6px rgba(70,44,22,0.45)"}}>
        {Array.from({length:11},(_,i)=>(
          <div key={opt.ks+"aw"+i} style={{position:"absolute", left:i*40, top:0, width:40, height:58, transformOrigin:"50% 0%", transform:`scaleY(${1+0.06*Math.sin(t/7 - i*0.7)})`, background: i%2 ? `linear-gradient(180deg, ${PAPER}, ${CREAM})` : `linear-gradient(180deg, ${CLAY_}, ${CLAY_DK})`}}/>
        ))}
        {Array.from({length:10},(_,i)=>(
          <div key={opt.ks+"aws"+i} style={{position:"absolute", left:40+i*40-1, top:0, width:2, height:58, background:"rgba(70,44,22,0.22)"}}/>
        ))}
        <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(255,255,255,0.28), rgba(0,0,0,0.18))"}}/>
      </div>
      {Array.from({length:11},(_,i)=>(
        <div key={opt.ks+"asc"+i} style={{position:"absolute", left:290+i*40+6, top:434, width:28, height:16, zIndex:5, borderRadius:"0 0 14px 14px", transform:`translateY(${1.6*Math.sin(t/7 - i*0.7)}px)`, background: i%2 ? `linear-gradient(180deg, ${CREAM}, #CFC4AE)` : `linear-gradient(180deg, ${CLAY_DK}, #7E3C22)`}}/>
      ))}
      {/* awning support rods */}
      {[300,716].map((rx,i)=>(
        <div key={opt.ks+"arod"+i} style={{position:"absolute", left:rx, top:368, width:5, height:22, zIndex:4, background:"#8A7154", borderRadius:2}}/>
      ))}
      {/* hero windows: frames, mullions, sills, interior hints */}
      {[{x:318},{x:600}].map((w,i)=>(
        <div key={opt.ks+"win"+i} style={{position:"absolute", left:w.x, top:452, width:96, height:148, zIndex:4, borderRadius:10, background:`linear-gradient(160deg, ${CREAM} 0%, #D3B994 100%)`, border:`4px solid ${PAPER}`, boxShadow:"0 8px 16px rgba(70,44,22,0.25), inset 0 2px 0 rgba(255,255,255,0.35)"}}>
          <div style={{position:"absolute", left:42, top:0, width:4, height:140, background:"rgba(247,243,234,0.92)"}}/>
          <div style={{position:"absolute", left:0, top:44, width:88, height:4, background:"rgba(247,243,234,0.92)"}}/>
          <div style={{position:"absolute", left:0, top:94, width:88, height:4, background:"rgba(247,243,234,0.92)"}}/>
          <div style={{position:"absolute", left:8, top:104, width:30, height:28, borderRadius:4, background:`linear-gradient(170deg, ${WOOD1}, ${WOOD2})`}}/>
          <div style={{position:"absolute", left:52, top:110, width:26, height:22, borderRadius:"3px 3px 8px 8px", background:`linear-gradient(170deg, ${PAPER}, #C8AF8C)`}}/>
          <div style={{position:"absolute", left:-4, top:-4, width:104, height:156, background:"linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)", borderRadius:10}}/>
          <div style={{position:"absolute", left:-10, top:138, width:108, height:10, borderRadius:4, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`, boxShadow:"0 5px 9px -4px rgba(70,44,22,0.5)"}}/>
        </div>
      ))}
      {/* window price stickers / flyer */}
      <div style={{position:"absolute", left:326, top:462, width:44, height:26, zIndex:5, borderRadius:4, background:`linear-gradient(165deg, ${GOLD_}, ${AMBER})`, transform:"rotate(-7deg)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:12, fontWeight:900, color:"#4A3410", boxShadow:"0 4px 8px -3px rgba(70,44,22,0.5)"}}>$4</div>
      <div style={{position:"absolute", left:612, top:462, width:52, height:30, zIndex:5, borderRadius:4, background:`linear-gradient(165deg, ${PAPER}, #D8CBB4)`, transform:"rotate(5deg)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:11, fontWeight:900, letterSpacing:0.6, color:"#4A3A22", boxShadow:"0 4px 8px -3px rgba(70,44,22,0.5)"}}>FRESH</div>
      {/* shelf + jars in the right window */}
      <div style={{position:"absolute", left:592, top:588, width:112, height:16, zIndex:6, borderRadius:5, background:`linear-gradient(180deg, ${PAPER}, #C9AC88)`, boxShadow:"0 8px 14px -6px rgba(70,44,22,0.45)"}}/>
      {[600,628,656,682].map((jx,i)=>(
        <div key={opt.ks+"jar"+i} style={{position:"absolute", left:jx, top:566, width:20, height:24, zIndex:6, borderRadius:"4px 4px 6px 6px", background:`linear-gradient(170deg, ${[GOLD_,CLAY_,GREEN,AMBER][i]}, rgba(0,0,0,0.30))`, border:"1.5px solid rgba(247,243,234,0.7)"}}/>
      ))}
      {/* doorway recess */}
      <div style={{position:"absolute", left:436, top:404, width:140, height:236, zIndex:4, borderRadius:"10px 10px 0 0", background:"linear-gradient(180deg, #3A2A1E 0%, #5A4130 100%)", boxShadow:"inset 0 6px 18px rgba(0,0,0,0.55)"}}/>
      <div style={{position:"absolute", left:430, top:398, width:152, height:12, zIndex:5, borderRadius:5, background:`linear-gradient(180deg, ${PAPER}, ${BRICK2})`}}/>
      {/* house number plate */}
      <div style={{position:"absolute", left:582, top:414, width:34, height:32, zIndex:6, borderRadius:5, background:`linear-gradient(165deg, ${PAPER}, #CFC1A6)`, border:"2px solid rgba(120,86,54,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:17, fontWeight:900, color:"#4A3A22", boxShadow:"0 4px 8px -3px rgba(70,44,22,0.5)"}}>12</div>
      {/* step + doormat */}
      <div style={{position:"absolute", left:424, top:632, width:164, height:14, zIndex:6, borderRadius:4, background:`linear-gradient(180deg, ${PAPER} 0%, #B8A183 100%)`, boxShadow:"0 6px 11px -5px rgba(70,44,22,0.55)"}}/>
      <div style={{position:"absolute", left:452, top:640, width:108, height:14, zIndex:7, borderRadius:3, background:`repeating-linear-gradient(90deg, ${WOOD1} 0 6px, #8E6844 6px 12px)`, boxShadow:"0 4px 8px -4px rgba(50,30,14,0.6)"}}/>
      {/* drainpipe with brackets */}
      <div style={{position:"absolute", left:722, top:266, width:11, height:GY-266, zIndex:5, background:"linear-gradient(90deg, #D6C0A2, #8A7154)", borderRadius:5}}/>
      {[320,430,540].map((py,i)=>(
        <div key={opt.ks+"dbk"+i} style={{position:"absolute", left:717, top:py, width:21, height:7, zIndex:5, borderRadius:3, background:"#7E664B"}}/>
      ))}
      <div style={{position:"absolute", left:716, top:GY-24, width:23, height:24, zIndex:5, borderRadius:"3px 3px 6px 6px", background:"linear-gradient(180deg, #B39B7A, #7E664B)"}}/>
      {/* hanging sign on a bracket with two chain links */}
      <div style={{position:"absolute", left:700, top:306, width:64, height:8, zIndex:6, borderRadius:3, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
      <div style={{position:"absolute", left:700, top:306, width:8, height:34, zIndex:6, borderRadius:3, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
      <div style={{position:"absolute", left:748, top:312, width:90, height:96, zIndex:6, transformOrigin:"50% 0%", transform:`rotate(${Math.sin(t/17)*4.5}deg)`}}>
        {[0,1].map(i=>(
          <div key={opt.ks+"chn"+i} style={{position:"absolute", left:41, top:i*10, width:9, height:12, borderRadius:"50%", border:`2.5px solid ${IRON}`}}/>
        ))}
        <div style={{position:"absolute", left:0, top:24, width:90, height:56, borderRadius:8, background:`linear-gradient(168deg, ${WOOD1} 0%, ${WOOD2} 100%)`, border:`3px solid ${CREAM}`, boxShadow:"0 10px 18px -8px rgba(50,30,14,0.6)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <div style={{fontFamily:MONO, fontSize:15, fontWeight:900, letterSpacing:1.4, color:GOLD_}}>OPEN</div>
          <div style={{fontFamily:MONO, fontSize:11, fontWeight:800, letterSpacing:1, color:CREAM}}>7AM</div>
        </div>
      </div>
      {/* planter with leaves */}
      <div style={{position:"absolute", left:734, top:594, width:52, height:74, zIndex:6, borderRadius:"8px 8px 14px 14px", background:`linear-gradient(170deg, ${CLAY_}, ${CLAY_DK})`, boxShadow:"0 10px 18px -6px rgba(60,34,16,0.5)"}}>
        <div style={{position:"absolute", left:0, top:0, width:52, height:11, borderRadius:5, background:`linear-gradient(180deg, ${PAPER}, ${CLAY_})`, opacity:0.85}}/>
        <div style={{position:"absolute", left:6, top:20, width:8, height:44, borderRadius:4, background:"rgba(255,255,255,0.22)"}}/>
      </div>
      {Array.from({length:6},(_,i)=>{
        const a=-62+i*25+Math.sin(t/14+i*1.3)*5;
        return <div key={opt.ks+"lg"+i} style={{position:"absolute", left:756, top:598, width:11, height:56, zIndex:6, borderRadius:"50% 50% 40% 40%", transformOrigin:"50% 100%", transform:`rotate(${a}deg)`, background:`linear-gradient(180deg, ${GRN_L}, #37845E)`}}/>;
      })}
      {/* crates + newspaper, far right */}
      <div style={{position:"absolute", left:912, top:596, width:66, height:44, zIndex:7, borderRadius:5, background:`linear-gradient(170deg, #B98F63, ${WOOD2})`, boxShadow:"0 9px 16px -7px rgba(50,30,14,0.55)"}}>
        <div style={{position:"absolute", left:0, top:12, width:66, height:4, background:"rgba(247,243,234,0.34)"}}/>
        <div style={{position:"absolute", left:0, top:28, width:66, height:4, background:"rgba(247,243,234,0.28)"}}/>
      </div>
      <div style={{position:"absolute", left:920, top:556, width:52, height:42, zIndex:7, borderRadius:5, background:`linear-gradient(170deg, #C79C6E, #6E4A2C)`, transform:"rotate(-3deg)", boxShadow:"0 8px 14px -7px rgba(50,30,14,0.5)"}}>
        <div style={{position:"absolute", left:0, top:14, width:52, height:4, background:"rgba(247,243,234,0.30)"}}/>
      </div>
      <div style={{position:"absolute", left:880, top:620, width:36, height:20, zIndex:7, borderRadius:3, background:`linear-gradient(170deg, ${PAPER}, #CFC1A6)`, transform:"rotate(6deg)", boxShadow:"0 4px 8px -4px rgba(70,44,22,0.5)"}}>
        <div style={{position:"absolute", left:4, top:5, width:26, height:2, background:"rgba(70,44,22,0.35)"}}/>
        <div style={{position:"absolute", left:4, top:10, width:20, height:2, background:"rgba(70,44,22,0.28)"}}/>
      </div>
      {/* A-frame chalk menu board, far left (never occluded by cast) */}
      <div style={{position:"absolute", left:52, top:546, width:122, height:112, zIndex:8}}>
        <div style={{position:"absolute", left:-4, top:104, width:130, height:12, borderRadius:"50%", background:"rgba(70,44,22,0.26)"}}/>
        <div style={{position:"absolute", left:0, top:0, width:118, height:104, borderRadius:7, background:`linear-gradient(168deg, ${WOOD1} 0%, ${WOOD2} 100%)`, transform:"rotate(-2deg)", boxShadow:"0 10px 18px -8px rgba(50,30,14,0.6)"}}>
          <div style={{position:"absolute", left:6, top:6, width:106, height:92, borderRadius:5, background:"linear-gradient(170deg, #2C2A26 0%, #171613 100%)"}}/>
          <div style={{position:"absolute", left:14, top:14, fontFamily:MONO, fontSize:14, fontWeight:900, letterSpacing:1.4, color:GOLD_}}>MENU</div>
          <div style={{position:"absolute", left:14, top:38, fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:0.4, color:CREAM}}>ESPRESSO $4</div>
          <div style={{position:"absolute", left:14, top:56, fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:0.4, color:CREAM}}>LATTE $5</div>
          <div style={{position:"absolute", left:14, top:74, fontFamily:MONO, fontSize:11, fontWeight:700, letterSpacing:0.4, color:GRN_L}}>BUN $3</div>
        </div>
      </div>
      {/* bunting wires */}
      <div style={{position:"absolute", left:0, top:40, width:1012, height:110, zIndex:6, pointerEvents:"none"}}>
        <svg width={1012} height={110} viewBox="0 0 1012 110">
          <path d="M -20 8 Q 250 82 506 40 Q 760 0 1032 60" fill="none" stroke="rgba(80,50,26,0.45)" strokeWidth={3}/>
          <path d="M -20 62 Q 260 122 506 88 Q 770 56 1032 108" fill="none" stroke="rgba(80,50,26,0.32)" strokeWidth={3}/>
        </svg>
      </div>
      <div style={{position:"absolute", inset:0, zIndex:6, pointerEvents:"none"}}>
        {buntFlags(t, opt.bunt, 52, 22, 990, 15, 30, opt.ks+"bf1", [CLAY_,GOLD_,GREEN,CREAM])}
        {buntFlags(t, opt.bunt, 104, 22, 990, 13, 26, opt.ks+"bf2", [GOLD_,GREEN,CLAY_,AMBER])}
      </div>
      {/* string lights across the shopfront */}
      <div style={{position:"absolute", left:0, top:0, width:1012, height:400, zIndex:6, pointerEvents:"none"}}>
        <svg width={1012} height={400} viewBox="0 0 1012 400">
          <path d="M 296 286 Q 506 336 724 292" fill="none" stroke="rgba(80,50,26,0.42)" strokeWidth={3}/>
        </svg>
      </div>
      {lanternRow(t, opt.lit, 306, 714, 288, 42, 9, opt.ks+"sl3")}
      {/* foreground occluders : bollards, railing, foliage corner */}
      <div style={{position:"absolute", left:80, top:642, width:28, height:96, zIndex:30, borderRadius:"12px 12px 4px 4px", background:`linear-gradient(100deg, #6F5C44 0%, ${IRON} 100%)`, boxShadow:"0 12px 20px -8px rgba(40,26,12,0.6)"}}>
        <div style={{position:"absolute", left:0, top:16, width:28, height:6, background:GOLD_, opacity:0.85}}/>
        <div style={{position:"absolute", left:4, top:26, width:5, height:62, background:"rgba(255,255,255,0.20)", borderRadius:3}}/>
      </div>
      <div style={{position:"absolute", left:952, top:642, width:28, height:96, zIndex:30, borderRadius:"12px 12px 4px 4px", background:`linear-gradient(100deg, #6F5C44 0%, ${IRON} 100%)`, boxShadow:"0 12px 20px -8px rgba(40,26,12,0.6)"}}>
        <div style={{position:"absolute", left:0, top:16, width:28, height:6, background:GOLD_, opacity:0.85}}/>
        <div style={{position:"absolute", left:4, top:26, width:5, height:62, background:"rgba(255,255,255,0.20)", borderRadius:3}}/>
      </div>
      <div style={{position:"absolute", left:0, top:726, width:1012, height:10, zIndex:29, borderRadius:5, background:`linear-gradient(180deg, #5A4A38, ${IRON})`, boxShadow:"0 8px 14px -8px rgba(30,18,8,0.7)"}}/>
      {Array.from({length:9},(_,i)=>(
        <div key={opt.ks+"rail"+i} style={{position:"absolute", left:14+i*124, top:734, width:9, height:44, zIndex:29, borderRadius:4, background:`linear-gradient(100deg, #5A4A38, ${IRON})`}}/>
      ))}
      <div style={{position:"absolute", left:24, top:14, width:190, height:132, zIndex:31, pointerEvents:"none", transformOrigin:"0% 0%", transform:`rotate(${Math.sin(t/19)*2.2}deg)`}}>
        <div style={{position:"absolute", left:0, top:0, width:170, height:9, borderRadius:5, background:`linear-gradient(180deg, #6E5233, ${WOOD2})`, transform:"rotate(9deg)"}}/>
        {Array.from({length:7},(_,i)=>(
          <div key={opt.ks+"fol"+i} style={{position:"absolute", left:10+i*23, top:8+i*4, width:34, height:20, borderRadius:"70% 20% 70% 20%", background:`linear-gradient(150deg, ${i%2?GRN_L:"#37845E"}, #23583D)`, transform:`rotate(${18+i*7+Math.sin(t/13+i)*4}deg)`}}/>
        ))}
      </div>
      <div style={{position:"absolute", left:0, top:0, width:1012, height:792, zIndex:28, pointerEvents:"none"}}>{leavesFor(t, opt.ks+"lv")}</div>
    </React.Fragment>
  );
  const bannerBoard = (y:number, rot:number, op:number, ks:string) => (
    <div key={ks} style={{position:"absolute", left:226, top:y, width:560, height:98, zIndex:7, opacity:op, transformOrigin:"50% 0%", transform:`rotate(${rot}deg)`}}>
      <div style={{position:"absolute", left:14, top:-46, width:5, height:48, background:"rgba(80,50,26,0.55)", borderRadius:3}}/>
      <div style={{position:"absolute", left:541, top:-46, width:5, height:48, background:"rgba(80,50,26,0.55)", borderRadius:3}}/>
      <div style={{position:"absolute", inset:0, borderRadius:14, background:`linear-gradient(168deg, ${CLAY_} 0%, ${CLAY_DK} 100%)`, boxShadow:"0 20px 40px -12px rgba(70,30,12,0.6), inset 0 2px 0 rgba(255,255,255,0.24)", border:`3px solid ${PAPER}`}}/>
      <div style={{position:"absolute", left:0, top:0, width:560, height:44, borderRadius:"12px 12px 0 0", background:"linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))"}}/>
      <div style={{position:"absolute", left:10, top:10, width:540, height:78, borderRadius:9, border:"2px solid rgba(247,243,234,0.42)"}}/>
      <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:42, fontWeight:900, letterSpacing:5, color:PAPER, textShadow:"0 3px 0 rgba(90,38,18,0.85)"}}>GRAND OPENING</div>
      <div style={{position:"absolute", left:14, top:-10, width:16, height:16, borderRadius:"50%", background:GOLD_, boxShadow:"0 2px 5px rgba(0,0,0,0.35)"}}/>
      <div style={{position:"absolute", left:530, top:-10, width:16, height:16, borderRadius:"50%", background:GOLD_, boxShadow:"0 2px 5px rgba(0,0,0,0.35)"}}/>
      <div style={{position:"absolute", left:14, top:88, width:16, height:16, borderRadius:"50%", background:AMBER, boxShadow:"0 2px 5px rgba(0,0,0,0.30)"}}/>
      <div style={{position:"absolute", left:530, top:88, width:16, height:16, borderRadius:"50%", background:AMBER, boxShadow:"0 2px 5px rgba(0,0,0,0.30)"}}/>
    </div>
  );
  const cupProp = (x:number, y:number, rot:number, z:number, ks:string) => (
    <div key={ks} style={{position:"absolute", left:x, top:y, width:30, height:38, zIndex:z, borderRadius:"5px 5px 8px 8px", background:`linear-gradient(170deg, ${PAPER}, #DBC7A8)`, border:"2px solid #C7A87F", transform:`rotate(${rot}deg)`, boxShadow:"0 5px 10px rgba(60,34,16,0.35)"}}>
      <div style={{position:"absolute", left:1, top:-8, width:24, height:8, borderRadius:4, background:CLAY_}}/>
      <div style={{position:"absolute", left:-1, top:13, width:28, height:12, borderRadius:3, background:`linear-gradient(180deg, ${CLAY_DK}, #7E3C22)`}}/>
      <div style={{position:"absolute", left:3, top:16, width:14, height:2, borderRadius:1, background:"rgba(247,243,234,0.7)"}}/>
    </div>
  );
  // ================= SHOT A : GRAND OPENING REVEAL (f0..58) =================
  const A_zoom = IV(s0,[0,58],[1.00,1.055]);
  const A_bunt = ramp(s0, 2, 26);
  const A_ban  = IV(s0,[0,6],[0,1]);
  const A_banY = IV(s0,[0,9,15,22],[-206,148,116,128]);
  const A_banR = IV(s0,[0,9,15,22,30],[-4,2.6,-1.1,0.4,0]);
  const A_rib  = ramp(s0, 26, 40);
  const A_door = IV(s0,[40,54],[0,84]);
  const A_scis = IV(s0,[16,24,30],[0,-34,0]);
  const A_fx   = IV(s0,[0,20,30,58],[250,250,296,300]);
  const shotA = (
    <div style={{position:"absolute", inset:0, transform:`scale(${A_zoom})`, transformOrigin:"50% 52%"}}>
      {Wide(s0, {bunt:A_bunt, lit:s0*1.2, ks:"A"})}
      {blimp(s0, 6, "Ablm")}
      <div style={{position:"absolute", inset:0, zIndex:7, pointerEvents:"none"}}>
        {balloons(s0, 246, 318, "Abl1", [CLAY_,GOLD_,GREEN])}
        {balloons(s0+13, 782, 330, "Abl2", [GOLD_,CLAY_,AMBER])}
      </div>
      {bannerBoard(A_banY, A_banR, A_ban, "Aban")}
      <div style={{position:"absolute", left:446, top:414, width:60, height:226, zIndex:5, borderRadius:"8px 0 0 0", background:`linear-gradient(180deg, ${CREAM} 0%, ${AMBER} 100%)`, transformOrigin:"0% 50%", transform:`perspective(700px) rotateY(${-A_door}deg)`, boxShadow:"6px 0 14px -6px rgba(40,24,10,0.5)"}}>
        <div style={{position:"absolute", left:9, top:16, width:42, height:74, borderRadius:5, background:"rgba(247,243,234,0.55)", border:"2px solid rgba(255,255,255,0.7)"}}/>
        <div style={{position:"absolute", left:44, top:112, width:9, height:30, borderRadius:5, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
        <div style={{position:"absolute", left:9, top:190, width:42, height:26, borderRadius:3, background:"rgba(90,60,30,0.28)"}}/>
      </div>
      <div style={{position:"absolute", left:506, top:414, width:60, height:226, zIndex:5, borderRadius:"0 8px 0 0", background:`linear-gradient(180deg, ${CREAM} 0%, ${AMBER} 100%)`, transformOrigin:"100% 50%", transform:`perspective(700px) rotateY(${A_door}deg)`, boxShadow:"-6px 0 14px -6px rgba(40,24,10,0.5)"}}>
        <div style={{position:"absolute", left:9, top:16, width:42, height:74, borderRadius:5, background:"rgba(247,243,234,0.55)", border:"2px solid rgba(255,255,255,0.7)"}}/>
        <div style={{position:"absolute", left:7, top:112, width:9, height:30, borderRadius:5, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
        <div style={{position:"absolute", left:14, top:100, width:32, height:7, borderRadius:3, background:"rgba(70,46,24,0.45)"}}/>
        <div style={{position:"absolute", left:9, top:190, width:42, height:26, borderRadius:3, background:"rgba(90,60,30,0.28)"}}/>
      </div>
      <div style={{position:"absolute", left:610, top:414, width:78, height:34, zIndex:7, borderRadius:7, background: s0>12 ? `linear-gradient(160deg, ${GRN_L}, ${GREEN})` : `linear-gradient(160deg, ${MUTE}, #6C6760)`, border:"2px solid rgba(255,255,255,0.75)", display:"flex", alignItems:"center", justifyContent:"center", transform:`rotateY(${IV(s0,[8,16],[180,0])}deg)`, boxShadow:"0 6px 12px rgba(60,34,16,0.35)"}}>
        {s0>13 && <div style={{fontFamily:MONO, fontSize:16, fontWeight:800, letterSpacing:2, color:"#FFFFFF"}}>OPEN</div>}
      </div>
      <div style={{position:"absolute", inset:0, zIndex:8, pointerEvents:"none"}}>
        {ambientFor(s0, "Aamb")}
        {burst(s0, 1, 34, 506, 240, 2.6, "Ab1")}
        {burst(s0, 26, 30, 506, 470, 2.2, "Ab2")}
        {burst(s0, 42, 26, 760, 500, 2.0, "Ab3")}
      </div>
      {/* ribbon + bow, cut and flying apart */}
      <div style={{position:"absolute", left:340, top:546, width:166, height:17, zIndex:14, borderRadius:4, background:`linear-gradient(180deg, ${RED} 0%, #93342A 100%)`, boxShadow:"0 4px 10px rgba(90,20,12,0.45)", transformOrigin:"0% 50%", transform:`translateX(${-180*A_rib}px) rotate(${-26*A_rib}deg)`, opacity:1-A_rib}}>
        <div style={{position:"absolute", left:0, top:2, width:166, height:4, background:"rgba(255,255,255,0.30)"}}/>
      </div>
      <div style={{position:"absolute", left:506, top:546, width:166, height:17, zIndex:15, borderRadius:4, background:`linear-gradient(180deg, ${RED} 0%, #93342A 100%)`, boxShadow:"0 4px 10px rgba(90,20,12,0.45)", transformOrigin:"100% 50%", transform:`translateX(${180*A_rib}px) rotate(${26*A_rib}deg)`, opacity:1-A_rib}}>
        <div style={{position:"absolute", left:0, top:2, width:166, height:4, background:"rgba(255,255,255,0.30)"}}/>
      </div>
      <div style={{position:"absolute", left:462, top:522, width:88, height:64, zIndex:15, opacity:1-A_rib, transform:`rotate(${-8*A_rib}deg)`}}>
        <div style={{position:"absolute", left:-2, top:6, width:40, height:34, borderRadius:"70% 20% 70% 20%", background:`linear-gradient(160deg, ${RED}, #8C2F26)`, transform:"rotate(-16deg)", boxShadow:"0 4px 9px -3px rgba(90,20,12,0.5)"}}/>
        <div style={{position:"absolute", left:50, top:6, width:40, height:34, borderRadius:"20% 70% 20% 70%", background:`linear-gradient(160deg, ${RED}, #8C2F26)`, transform:"rotate(16deg)", boxShadow:"0 4px 9px -3px rgba(90,20,12,0.5)"}}/>
        <div style={{position:"absolute", left:26, top:14, width:36, height:36, borderRadius:"50%", background:`linear-gradient(160deg, ${RED} 0%, #8C2F26 100%)`, boxShadow:"0 4px 10px rgba(90,20,12,0.5)"}}/>
        <div style={{position:"absolute", left:36, top:22, width:14, height:11, borderRadius:"50%", background:"rgba(255,255,255,0.28)"}}/>
      </div>
      <div style={{position:"absolute", inset:0, zIndex:16}}>
        <Actor x={A_fx} groundY={GYF} size={236} z={16}>
          <Mascot lf={s0} size={236} chef={1} apron={1} cap={1} cheer={cl(s0>26?1:0.4,0,1)} nodAmp={5} nodSpeed={12} gaze={0.55}/>
        </Actor>
      </div>
      <div style={{position:"absolute", left:352, top:520+A_scis, width:66, height:26, zIndex:18, borderRadius:5, background:`linear-gradient(170deg, ${CREAM}, ${MUTE})`, transform:`rotate(${-14+A_scis*0.5}deg)`, boxShadow:"0 5px 10px rgba(60,34,16,0.35)"}}>
        <div style={{position:"absolute", left:0, top:9, width:48, height:5, borderRadius:3, background:"rgba(255,255,255,0.6)"}}/>
        <div style={{position:"absolute", left:44, top:4, width:20, height:7, borderRadius:4, background:SLATE}}/>
        <div style={{position:"absolute", left:44, top:15, width:20, height:7, borderRadius:4, background:SLATE}}/>
        <div style={{position:"absolute", left:40, top:10, width:6, height:6, borderRadius:"50%", background:IRON}}/>
      </div>
      <div style={{position:"absolute", inset:0, zIndex:15}}>
        <Actor x={716} groundY={GY} size={192} z={15} flip={true}>
          <Mascot lf={s0+9} size={192} suit={1} tote={1} glasses={1} cheer={0.9} nodAmp={5} nodSpeed={11} gaze={-0.55}/>
        </Actor>
        <Actor x={892} groundY={GY} size={168} z={14} flip={true}>
          <Mascot lf={s0+21} size={168} girl={1} beanie={1} scarf={1} cup={1} cheer={0.85} nodAmp={4} nodSpeed={9} gaze={-0.5}/>
        </Actor>
      </div>
      <div style={{position:"absolute", left:120, top:206, zIndex:24, padding:"8px 18px", borderRadius:20, background:`linear-gradient(160deg, ${GREEN}, #2F7A57)`, border:"2px solid rgba(255,255,255,0.55)", fontFamily:MONO, fontSize:20, fontWeight:800, letterSpacing:1.4, color:"#FFFFFF", boxShadow:"0 12px 22px -8px rgba(20,60,40,0.5)", transform:`translateY(${(1-over(s0,30,14,Easing.out(Easing.back(1.6))))*-26}px)`, opacity:over(s0,30,10)}}>PLAN THAT WORKS</div>
    </div>
  );
  // ================= SHOT B : THE DAY RUNS (f58..128) =================
  const B_zoom = IV(s1,[0,70],[1.058,1.088]);
  const CSZ = 200, CXA = 880, CXB = 470, CLIFE = 52, CSPAWN = 22;
  const bCust = Array.from({length:8},(_,i)=> -30 + i*CSPAWN);
  const B_ph = ((s1+8)%52+52)%52;
  const B_fx = 286 + IV(B_ph,[14,23,33,42],[0,-10,-10,0]);
  const shotB = (
    <div style={{position:"absolute", inset:0, transform:`scale(${B_zoom})`, transformOrigin:"50% 60%"}}>
      {Wide(s1+40, {bunt:1, lit:999, ks:"B"})}
      <div style={{position:"absolute", inset:0, zIndex:7, pointerEvents:"none"}}>
        {balloons(s1+40, 246, 318, "Bbl1", [CLAY_,GOLD_,GREEN])}
        {balloons(s1+53, 782, 330, "Bbl2", [GOLD_,CLAY_,AMBER])}
      </div>
      {bannerBoard(128, 0, 1, "Bban")}
      <div style={{position:"absolute", left:446, top:414, width:120, height:226, zIndex:4, borderRadius:"8px 8px 0 0", background:`linear-gradient(180deg, #6B4B33 0%, #2E2116 100%)`, boxShadow:"inset 0 8px 20px rgba(0,0,0,0.5)"}}>
        <div style={{position:"absolute", left:14, top:18, width:92, height:80, borderRadius:6, background:"linear-gradient(160deg, rgba(247,243,234,0.34), rgba(247,243,234,0.10))", border:"2px solid rgba(247,243,234,0.5)"}}/>
        <div style={{position:"absolute", left:58, top:18, width:3, height:80, background:"rgba(247,243,234,0.45)"}}/>
        <div style={{position:"absolute", left:96, top:116, width:11, height:34, borderRadius:5, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
        <div style={{position:"absolute", left:30, top:126, width:58, height:11, borderRadius:3, background:"rgba(20,12,6,0.55)", border:"1.5px solid rgba(247,243,234,0.28)"}}/>
        <div style={{position:"absolute", left:14, top:190, width:92, height:26, borderRadius:3, background:"linear-gradient(180deg, rgba(247,243,234,0.28), rgba(247,243,234,0.10))"}}/>
      </div>
      <div style={{position:"absolute", left:610, top:414, width:78, height:34, zIndex:7, borderRadius:7, background:`linear-gradient(160deg, ${GRN_L}, ${GREEN})`, border:"2px solid rgba(255,255,255,0.75)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 12px rgba(60,34,16,0.35)"}}>
        <div style={{fontFamily:MONO, fontSize:16, fontWeight:800, letterSpacing:2, color:"#FFFFFF"}}>OPEN</div>
      </div>
      <div style={{position:"absolute", inset:0, zIndex:8, pointerEvents:"none"}}>{ambientFor(s1+30, "Bamb")}</div>
      {bCust.map((sp,i)=>{
        const u = s1 - sp;
        if (u < 0 || u > CLIFE) return null;
        const x = IV(u,[0,CLIFE],[CXA,CXB]);
        const op = Math.min(IV(u,[0,3],[0,1]), IV(u,[44,CLIFE],[1,0]));
        const k = i%3;
        const served = u > 34;
        return (
          <div key={"bc"+i} style={{position:"absolute", inset:0, zIndex:10, opacity:op}}>
            <Actor x={x} groundY={GY} size={CSZ} z={10} flip={true}>
              <Mascot lf={s1+i*7} size={CSZ}
                suit={k===0?1:0} tote={k===0?1:0} glasses={k===0?1:0}
                beard={k===1?1:0} beanie={k===1?1:0} scarf={k===1?1:0}
                girl={k===2?1:0} headphones={k===2?1:0} backpack={k===2?1:0}
                cheer={cl(served?0.95:0.42,0,1)} nodAmp={4} nodSpeed={10} gaze={-0.5}/>
            </Actor>
            {u>=26 && u<=34 && cupProp(IV(u,[26,34],[650,x-70]), IV(u,[26,30,34],[566,506,GY-124]), IV(u,[26,34],[-18,0]), 17, "bch"+i)}
            {served && cupProp(x-70, GY-124, 0, 13, "bcc"+i)}
            {served && steam(s1, x-64, GY-138, "bcs"+i, i)}
          </div>
        );
      })}
      <div style={{position:"absolute", inset:0, zIndex:14}}>
        <Actor x={B_fx} groundY={GYF} size={226} z={14}>
          <Mascot lf={s1} size={226} chef={1} apron={1} cap={1} cheer={cl(0.5+0.28*Math.sin(s1/9),0,1)} nodAmp={5} nodSpeed={12} gaze={0.5}/>
        </Actor>
      </div>
      {[2,16,30,44,58].map((pf,i)=>{
        if (s1 < pf) return null;
        const u=(s1-pf)/26; if(u>1) return null;
        return (
          <div key={"bp"+i} style={{position:"absolute", left:118, top:470 - u*84, zIndex:21, opacity:cl(1-(u-0.55)/0.45,0,1), transform:`scale(${0.72+0.28*cl(u*5,0,1)})`, transformOrigin:"50% 100%"}}>
            <div style={{padding:"6px 14px", borderRadius:20, background:`linear-gradient(160deg, ${GREEN}, #2F7A57)`, border:"2px solid rgba(255,255,255,0.55)", fontFamily:MONO, fontSize:18, fontWeight:800, color:"#FFFFFF", boxShadow:"0 10px 20px rgba(20,60,40,0.42)"}}>{i%2 ? "+$88" : "+1 ORDER"}</div>
          </div>
        );
      })}
      {[6,28,50,72].map((sf,i)=>{
        const u=(s1-sf)/22;
        if (u<0||u>1) return null;
        return <div key={"bco"+i} style={{position:"absolute", left:IV(u,[0,1],[700,624]), top:IV(u,[0,0.5,1],[GY-100,GY-196,GY-150]), width:24, height:24, borderRadius:"50%", zIndex:16, background:`linear-gradient(160deg, ${GOLD_} 0%, ${AMBER} 55%, #9C6E24 100%)`, border:`2px solid ${CREAM}`, boxShadow:"0 4px 9px rgba(120,80,10,0.35)", transform:`scaleX(${Math.abs(Math.cos(u*9))*0.8+0.2})`}}/>;
      })}
    </div>
  );
  // ================= SHOT C : THE RESULT (close insert, f128..188) =================
  const C_orders = Math.round(IV(s2,[0,44],[72,96]));
  const C_money  = Math.round(C_orders*44.1667/10)*10;
  const C_spark  = IV(s2,[0,46],[0.55,1]);
  const C_stars  = [3,13,23,33,43];
  const C_chip   = over(s2,46,14, Easing.out(Easing.back(1.5)));
  const C_tick   = over(s2,52,10, Easing.out(Easing.back(2)));
  const C_env    = cl(Math.min((s2+4)/5, (36-s2)/12), 0, 1);
  const C_rat    = Math.sin(s2*1.9)*9*C_env + Math.sin(s2/11)*2*(1-C_env);
  const C_slump  = (1-C_env)*16;
  const C_scroll = ((s2*8) % 34);
  const shotC = (
    <div style={{position:"absolute", inset:0, background:`linear-gradient(168deg, #2B2114 0%, #17110A 100%)`, overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, rgba(247,243,234,0.035) 0 1px, rgba(0,0,0,0) 1px 46px), repeating-linear-gradient(180deg, rgba(247,243,234,0.030) 0 1px, rgba(0,0,0,0) 1px 46px)"}}/>
      {Array.from({length:14},(_,i)=>{
        const s=seed(i*3.7+5);
        const x = (((i*96 + 40 - s2*3.2) % 1140) + 1140) % 1140 - 70;
        const y = 40 + s*690;
        const d = 60 + s*90;
        return <div key={"cb"+i} style={{position:"absolute", left:x, top:y, width:d, height:d, borderRadius:"50%", background:`linear-gradient(160deg, rgba(207,149,68,0.22), rgba(207,149,68,0.04))`, opacity:0.5}}/>;
      })}
      {[0,1].map(i=>(
        <div key={"csl"+i} style={{position:"absolute", left:(((s2*11 + i*420) % 1560) + 1560) % 1560 - 320, top:-40, width:300, height:880, transform:"skewX(-13deg)", background:"linear-gradient(90deg, rgba(247,243,234,0) 0%, rgba(247,243,234,0.10) 50%, rgba(247,243,234,0) 100%)"}}/>
      ))}
      <div style={{position:"absolute", left:32, top:30, fontFamily:MONO, fontSize:40, fontWeight:900, letterSpacing:3, color:PAPER}}>RESULTS · DAY 1</div>
      <div style={{position:"absolute", left:34, top:84, width:410, height:5, borderRadius:3, background:`linear-gradient(90deg, ${GOLD_}, rgba(231,178,76,0))`}}/>
      <div style={{position:"absolute", left:34, top:98, width:210, height:3, borderRadius:2, background:`linear-gradient(90deg, ${CLAY_}, rgba(210,114,78,0))`}}/>
      {/* ===== the cage : rivets, hinges, padlock, base tray ===== */}
      <div style={{position:"absolute", left:30, top:250, width:250, height:452, zIndex:8}}>
        <div style={{position:"absolute", left:-6, top:440, width:262, height:18, borderRadius:"50%", background:"rgba(0,0,0,0.42)"}}/>
        <div style={{position:"absolute", left:0, top:0, width:250, height:46, borderRadius:"10px 10px 0 0", background:`linear-gradient(165deg, ${SLATE} 0%, #24405E 100%)`, border:`3px solid ${CREAM}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 16px -6px rgba(10,20,35,0.6)"}}>
          <div style={{fontFamily:MONO, fontSize:22, fontWeight:900, letterSpacing:3, color:PAPER}}>CONTAINED</div>
        </div>
        <div style={{position:"absolute", left:110, top:-16, width:30, height:20, borderRadius:"12px 12px 0 0", border:`5px solid ${MUTE}`, borderBottom:"none"}}/>
        <div style={{position:"absolute", left:8, top:48, width:234, height:376, borderRadius:8, background:"linear-gradient(180deg, #443F38 0%, #221F1B 100%)", boxShadow:"inset 0 5px 0 rgba(0,0,0,0.4)"}}/>
        {/* the gremlin */}
        <div style={{position:"absolute", left:52, top:124+C_slump, width:150, height:290, transform:`translateX(${C_rat}px) rotate(${Math.sin(s2/9)*3*(0.3+C_env)}deg) scaleY(${1-0.05*(1-C_env)})`, transformOrigin:"50% 100%"}}>
          <div style={{position:"absolute", left:6, top:-26, width:0, height:0, borderLeft:"20px solid transparent", borderRight:"20px solid transparent", borderBottom:"48px solid #5B4570"}}/>
          <div style={{position:"absolute", left:98, top:-26, width:0, height:0, borderLeft:"20px solid transparent", borderRight:"20px solid transparent", borderBottom:"48px solid #5B4570"}}/>
          <div style={{position:"absolute", left:8, top:14, width:134, height:128, borderRadius:"64px 64px 40px 40px", background:"linear-gradient(165deg, #6E5488 0%, #3C2C50 100%)", boxShadow:"inset 0 -12px 22px rgba(20,10,30,0.55), 0 12px 22px rgba(10,6,18,0.55)"}}/>
          <div style={{position:"absolute", left:24, top:22, width:44, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.14)"}}/>
          <div style={{position:"absolute", left:34, top:56, width:28, height:7+14*C_env, borderRadius:"50%", background:AMBER}}/>
          <div style={{position:"absolute", left:90, top:56, width:28, height:7+14*C_env, borderRadius:"50%", background:AMBER}}/>
          <div style={{position:"absolute", left:44, top:100, width:62, height:22, background:"#1C1626", clipPath:"polygon(0 0,10% 100%,22% 0,34% 100%,46% 0,58% 100%,70% 0,82% 100%,94% 0,100% 60%,100% 0)"}}/>
          <div style={{position:"absolute", left:-6, top:96, width:32, height:28, borderRadius:10, background:"linear-gradient(165deg,#6E5488,#3C2C50)", transform:`translateY(${-20*C_env}px)`}}/>
          <div style={{position:"absolute", left:124, top:96, width:32, height:28, borderRadius:10, background:"linear-gradient(165deg,#6E5488,#3C2C50)", transform:`translateY(${-20*C_env}px)`}}/>
          <div style={{position:"absolute", left:12, top:138, width:126, height:48, borderRadius:"24px 24px 16px 16px", background:"linear-gradient(180deg, #3C2C50, #281B38)"}}/>
          <div style={{position:"absolute", left:16, top:180, width:118, height:20, borderRadius:"50%", background:"rgba(0,0,0,0.38)"}}/>
        </div>
        {/* bars */}
        {Array.from({length:8},(_,i)=>(
          <div key={"cbar"+i} style={{position:"absolute", left:18+i*29, top:48, width:9, height:376, borderRadius:5, transform:`translateX(${C_env*Math.sin(s2*1.9+i*0.5)*3}px)`, background:`linear-gradient(90deg, ${CREAM} 0%, ${SLATE} 45%, #22374F 100%)`}}/>
        ))}
        {[52,220,392].map((ty,i)=>(
          <div key={"crail"+i} style={{position:"absolute", left:8, top:ty, width:234, height:9, borderRadius:5, background:`linear-gradient(180deg, ${CREAM} 0%, ${SLATE} 60%, #22374F 100%)`}}/>
        ))}
        {/* rivets along the rails */}
        {[0,1,2].map(r=>[0,1,2,3,4,5].map(c=>(
          <div key={"criv"+r+c} style={{position:"absolute", left:20+c*42, top:[54,222,394][r], width:7, height:7, borderRadius:"50%", background:`linear-gradient(160deg, ${PAPER}, #4B6788)`}}/>
        )))}
        {/* hinges */}
        {[96,300].map((hy,i)=>(
          <div key={"chg"+i} style={{position:"absolute", left:2, top:hy, width:18, height:38, borderRadius:4, background:`linear-gradient(150deg, ${CREAM} 0%, #24405E 100%)`, boxShadow:"0 4px 8px -4px rgba(0,0,0,0.6)"}}>
            <div style={{position:"absolute", left:6, top:6, width:6, height:6, borderRadius:"50%", background:"#16283C"}}/>
            <div style={{position:"absolute", left:6, top:26, width:6, height:6, borderRadius:"50%", background:"#16283C"}}/>
          </div>
        ))}
        {/* hasp + padlock */}
        <div style={{position:"absolute", left:198, top:196, width:46, height:22, borderRadius:4, background:`linear-gradient(160deg, ${CREAM}, #3E5C7E)`}}/>
        <div style={{position:"absolute", left:212, top:214, width:44, height:56, transform:`rotate(${Math.sin(s2/13)*3}deg)`, transformOrigin:"50% 0%"}}>
          <div style={{position:"absolute", left:11, top:-12, width:22, height:24, borderRadius:"11px 11px 0 0", border:`6px solid ${MUTE}`, borderBottom:"none"}}/>
          <div style={{position:"absolute", left:0, top:8, width:44, height:40, borderRadius:7, background:`linear-gradient(160deg, ${GOLD_} 0%, ${AMBER} 50%, #7C5518 100%)`, boxShadow:"0 7px 13px -6px rgba(0,0,0,0.7)"}}/>
          <div style={{position:"absolute", left:19, top:22, width:7, height:7, borderRadius:"50%", background:"#4A3410"}}/>
          <div style={{position:"absolute", left:21, top:28, width:3, height:9, background:"#4A3410"}}/>
        </div>
        {/* base tray + warning plate */}
        <div style={{position:"absolute", left:0, top:420, width:250, height:22, borderRadius:6, background:`linear-gradient(180deg, ${SLATE} 0%, #1B2F45 100%)`, boxShadow:"0 8px 15px -7px rgba(0,0,0,0.7)"}}/>
        <div style={{position:"absolute", left:74, top:424, width:102, height:15, borderRadius:3, background:`linear-gradient(165deg, ${RED}, #8C2F26)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:9, fontWeight:900, letterSpacing:1.4, color:PAPER}}>NO SCOPE CREEP</div>
      </div>
      {/* ===== the results card ===== */}
      <div style={{position:"absolute", left:300, top:120, width:680, height:580, zIndex:12, borderRadius:24, background:`linear-gradient(165deg, ${TERM} 0%, ${TERM2} 100%)`, border:`3px solid ${SLATE}`, boxShadow:"0 34px 62px -18px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.08)", transform:`translateX(${IV(s2,[0,7],[26,0])}px)`, overflow:"hidden"}}>
        <div style={{position:"absolute", left:0, top:0, width:680, height:52, background:"linear-gradient(180deg, rgba(58,92,132,0.34), rgba(58,92,132,0))"}}/>
        {[GOLD_,GRN_L,SLATE].map((c,i)=>(
          <div key={"cwd"+i} style={{position:"absolute", left:590+i*22, top:22, width:11, height:11, borderRadius:"50%", background:c, opacity:0.75}}/>
        ))}
        <div style={{position:"absolute", left:24, top:18, fontFamily:MONO, fontSize:20, fontWeight:800, letterSpacing:2.4, color:AMBER}}>LIVE · DAY 1</div>
        <div style={{position:"absolute", left:556, top:26, width:14, height:14, borderRadius:"50%", background:GREEN, opacity:0.6+0.34*Math.abs(Math.sin(s2/9))}}/>
        <div style={{position:"absolute", left:24, top:60, fontFamily:MONO, fontSize:18, letterSpacing:2.2, color:MUTE}}>ORDERS</div>
        <div style={{position:"absolute", left:22, top:80, fontFamily:MONO, fontSize:92, fontWeight:900, color:PAPER}}>{C_orders}</div>
        <div style={{position:"absolute", left:200, top:132, fontFamily:MONO, fontSize:17, fontWeight:800, letterSpacing:1.4, color:GRN_L}}>▲ 33%</div>
        <div style={{position:"absolute", left:378, top:60, fontFamily:MONO, fontSize:18, letterSpacing:2.2, color:MUTE}}>TODAY</div>
        <div style={{position:"absolute", left:376, top:96, fontFamily:MONO, fontSize:58, fontWeight:900, color:GRN_L}}>${C_money.toLocaleString()}</div>
        <div style={{position:"absolute", left:24, top:178, width:620, height:2, background:"rgba(90,120,160,0.30)"}}/>
        <div style={{position:"absolute", left:24, top:196, width:620, height:140}}>
          {[0,1,2,3].map(i=>(
            <div key={"cgl"+i} style={{position:"absolute", left:0, top:14+i*36, width:620, height:1, background:"rgba(90,120,160,0.20)"}}/>
          ))}
          <svg width={620} height={140} viewBox="0 0 620 140">
            <defs>
              <linearGradient id="s6cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(63,158,116,0.5)"/>
                <stop offset="100%" stopColor="rgba(63,158,116,0)"/>
              </linearGradient>
            </defs>
            <polyline points="0,126 88,114 176,100 264,80 352,62 440,40 528,20 612,6" fill="none" stroke={GRN_L} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-C_spark}/>
            <polygon points="0,126 88,114 176,100 264,80 352,62 440,40 528,20 612,6 612,140 0,140" fill="url(#s6cg)" opacity={C_spark*0.9}/>
          </svg>
          {[0,1,2,3,4,5,6,7].map(i=>{
            const px=[0,88,176,264,352,440,528,612][i], py=[126,114,100,80,62,40,20,6][i];
            const on = cl((C_spark - px/620)*14, 0, 1);
            return <div key={"cdot"+i} style={{position:"absolute", left:px-4, top:py-4, width:8, height:8, borderRadius:"50%", background:PAPER, opacity:on*0.85}}/>;
          })}
          <div style={{position:"absolute", left:600*C_spark-9, top:6+120*(1-C_spark)-9, width:18, height:18, borderRadius:"50%", background:PAPER, border:`3px solid ${GREEN}`}}/>
          {["6A","10A","2P","6P"].map((lb,i)=>(
            <div key={"cax"+i} style={{position:"absolute", left:6+i*156, top:122, fontFamily:MONO, fontSize:12, fontWeight:700, letterSpacing:1, color:"rgba(154,150,139,0.75)"}}>{lb}</div>
          ))}
        </div>
        {C_stars.map((sf,i)=>{
          const on = cl((s2-sf)/4,0,1);
          const pop = IV(s2,[sf,sf+4,sf+9],[0.6,1.32,1]);
          return (
            <div key={"cst"+i} style={{position:"absolute", left:24+i*52, top:352, width:44, height:44}}>
              <div style={{position:"absolute", inset:0, background:"#2B3547", clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>
              <div style={{position:"absolute", inset:0, background:GOLD_, opacity:on, transform:`scale(${on>0?pop:0})`, clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>
            </div>
          );
        })}
        <div style={{position:"absolute", left:300, top:354, fontFamily:MONO, fontSize:38, fontWeight:900, color: s2>43?GOLD_:MUTE}}>{s2>43?"4.9":"—"}</div>
        <div style={{position:"absolute", left:392, top:364, fontFamily:MONO, fontSize:18, fontWeight:800, letterSpacing:2, color:GOLD_, opacity:cl((s2-43)/5,0,1)}}>TOP RATED</div>
        <div style={{position:"absolute", left:24, top:412, width:620, height:100, borderRadius:12, background:"rgba(255,255,255,0.05)", overflow:"hidden", border:"1px solid rgba(90,120,160,0.35)"}}>
          {Array.from({length:6},(_,i)=>{
            const y = i*34 - C_scroll;
            const yc = y + 17;
            const op = cl(Math.min((yc-10)/16, (90-yc)/16), 0, 1);
            const base = Math.floor((s2*8)/34);
            const n = 41 + base + (5 - i);
            return (
              <div key={"cfd"+i} style={{position:"absolute", left:14, top:y, width:592, height:34, opacity:op, display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:MONO, fontSize:17, fontWeight:800, color:PAPER}}>
                <div style={{display:"flex", alignItems:"center"}}>
                  <div style={{width:8, height:8, borderRadius:"50%", background:GRN_L, marginRight:10}}/>
                  <div style={{letterSpacing:1.6}}>ORDER #{n}</div>
                </div>
                <div style={{color:GRN_L}}>+$44</div>
              </div>
            );
          })}
          <div style={{position:"absolute", left:0, top:0, width:620, height:14, background:"linear-gradient(180deg, rgba(10,17,32,0.9), rgba(10,17,32,0))"}}/>
          <div style={{position:"absolute", left:0, top:86, width:620, height:14, background:"linear-gradient(0deg, rgba(10,17,32,0.9), rgba(10,17,32,0))"}}/>
        </div>
        <div style={{position:"absolute", left:24, top:528, width:620, height:38, opacity:C_chip, transform:`translateY(${(1-C_chip)*16}px)`}}>
          <div style={{position:"absolute", left:0, top:6, fontFamily:MONO, fontSize:22, fontWeight:800, letterSpacing:1.6, color:MUTE}}>SIMULATION</div>
          <div style={{position:"absolute", left:168, top:3, fontFamily:MONO, fontSize:28, fontWeight:800, color:AMBER, transform:`translateX(${IV(s2,[46,58],[-12,0])}px)`}}>{"→"}</div>
          <div style={{position:"absolute", left:216, top:6, fontFamily:MONO, fontSize:22, fontWeight:800, letterSpacing:1.6, color:GRN_L}}>REALITY</div>
          <div style={{position:"absolute", left:344, top:0, width:38, height:38, borderRadius:"50%", background:`linear-gradient(160deg, ${GRN_L}, ${GREEN})`, transform:`scale(${cl(C_tick,0,1.2)})`, boxShadow:"0 5px 11px rgba(10,40,26,0.5)"}}>
            <div style={{position:"absolute", left:9, top:18, width:11, height:4, borderRadius:2, background:"#0C2A18", transform:"rotate(45deg)"}}/>
            <div style={{position:"absolute", left:14, top:15, width:19, height:4, borderRadius:2, background:"#0C2A18", transform:"rotate(-48deg)"}}/>
          </div>
          <div style={{position:"absolute", left:398, top:8, fontFamily:MONO, fontSize:19, fontWeight:800, letterSpacing:1.6, color:PAPER, opacity:C_tick}}>MATCHED</div>
        </div>
        <div style={{position:"absolute", left:(((s2*14) % 900) - 220), top:0, width:180, height:580, transform:"skewX(-12deg)", background:"linear-gradient(90deg, rgba(247,243,234,0) 0%, rgba(247,243,234,0.055) 50%, rgba(247,243,234,0) 100%)"}}/>
      </div>
      {s2>=36 && (
        <div style={{position:"absolute", left:812, top:606, width:160, height:160, zIndex:20, transform:`scale(${cl(IV(s2,[36,44,50],[0,1.3,1]),0,2)}) rotate(${-9+3*Math.sin(s2/12)}deg)`}}>
          <div style={{position:"absolute", inset:0, borderRadius:"50%", background:`linear-gradient(160deg, ${GOLD_} 0%, ${AMBER} 58%, #96681F 100%)`, border:`6px solid ${CREAM}`, boxShadow:"0 18px 34px -10px rgba(0,0,0,0.6)"}}/>
          <div style={{position:"absolute", left:14, top:14, width:132, height:132, borderRadius:"50%", border:"2px dashed rgba(74,52,16,0.45)"}}/>
          <div style={{position:"absolute", left:56, top:20, width:48, height:48, background:PAPER, clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>
          <div style={{position:"absolute", left:0, top:70, width:160, textAlign:"center", fontFamily:MONO, fontSize:42, fontWeight:900, color:"#3A2708"}}>4.9</div>
          <div style={{position:"absolute", left:0, top:118, width:160, textAlign:"center", fontFamily:MONO, fontSize:15, fontWeight:800, letterSpacing:2, color:"#4A3410"}}>TOP RATED</div>
        </div>
      )}
    </div>
  );
  // ================= SHOT D : THE CTA (f188..285) =================
  const D_cta  = over(s3, 4, 20, Easing.out(Easing.back(1.3)));
  const D_x1   = IV(s3,[0,50],[900,548]);
  const D_op1  = Math.min(IV(s3,[0,3],[0,1]), IV(s3,[44,52],[1,0]));
  const D_x2   = IV(s3,[54,104],[900,548]);
  const D_op2  = Math.min(IV(s3,[54,57],[0,1]), IV(s3,[96,104],[1,0]));
  const D_fx   = 296 + IV(((s3)%52+52)%52,[14,23,33,42],[0,-10,-10,0]);
  const shotD = (
    <div style={{position:"absolute", inset:0, transform:`scale(${IV(s3,[0,97],[1.012,1.03])})`, transformOrigin:"50% 46%"}}>
      {Wide(s3+120, {bunt:1, lit:999, ks:"D"})}
      {blimp(s3, 22, "Dblm")}
      <div style={{position:"absolute", inset:0, zIndex:7, pointerEvents:"none"}}>
        {balloons(s3+120, 246, 318, "Dbl1", [CLAY_,GOLD_,GREEN])}
        {balloons(s3+133, 782, 330, "Dbl2", [GOLD_,CLAY_,AMBER])}
      </div>
      {bannerBoard(128, 0, 1, "Dban")}
      <div style={{position:"absolute", left:446, top:414, width:120, height:226, zIndex:4, borderRadius:"8px 8px 0 0", background:`linear-gradient(180deg, #6B4B33 0%, #2E2116 100%)`, boxShadow:"inset 0 8px 20px rgba(0,0,0,0.5)"}}>
        <div style={{position:"absolute", left:14, top:18, width:92, height:80, borderRadius:6, background:"linear-gradient(160deg, rgba(247,243,234,0.34), rgba(247,243,234,0.10))", border:"2px solid rgba(247,243,234,0.5)"}}/>
        <div style={{position:"absolute", left:58, top:18, width:3, height:80, background:"rgba(247,243,234,0.45)"}}/>
        <div style={{position:"absolute", left:96, top:116, width:11, height:34, borderRadius:5, background:`linear-gradient(180deg, ${MUTE}, ${IRON})`}}/>
        <div style={{position:"absolute", left:30, top:126, width:58, height:11, borderRadius:3, background:"rgba(20,12,6,0.55)", border:"1.5px solid rgba(247,243,234,0.28)"}}/>
        <div style={{position:"absolute", left:14, top:190, width:92, height:26, borderRadius:3, background:"linear-gradient(180deg, rgba(247,243,234,0.28), rgba(247,243,234,0.10))"}}/>
      </div>
      <div style={{position:"absolute", left:610, top:414, width:78, height:34, zIndex:7, borderRadius:7, background:`linear-gradient(160deg, ${GRN_L}, ${GREEN})`, border:"2px solid rgba(255,255,255,0.75)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 12px rgba(60,34,16,0.35)"}}>
        <div style={{fontFamily:MONO, fontSize:16, fontWeight:800, letterSpacing:2, color:"#FFFFFF"}}>OPEN</div>
      </div>
      <div style={{position:"absolute", inset:0, zIndex:8, pointerEvents:"none"}}>
        {ambientFor(s3+60, "Damb")}
        {burst(s3, 2, 32, 506, 300, 2.7, "Dbu1")}
        {burst(s3, 34, 22, 200, 340, 1.8, "Dbu2")}
        {burst(s3, 62, 22, 830, 340, 1.8, "Dbu3")}
      </div>
      <div style={{position:"absolute", left:44, top:398, width:136, height:136, zIndex:20, transform:`rotate(${-8+3*Math.sin(s3/14)}deg)`}}>
        <div style={{position:"absolute", inset:0, borderRadius:"50%", background:`linear-gradient(160deg, ${GOLD_} 0%, ${AMBER} 58%, #96681F 100%)`, border:`5px solid ${CREAM}`, boxShadow:"0 16px 30px -10px rgba(120,80,10,0.6)"}}/>
        <div style={{position:"absolute", left:12, top:12, width:112, height:112, borderRadius:"50%", border:"2px dashed rgba(74,52,16,0.45)"}}/>
        <div style={{position:"absolute", left:46, top:16, width:44, height:44, background:PAPER, clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>
        <div style={{position:"absolute", left:0, top:60, width:136, textAlign:"center", fontFamily:MONO, fontSize:36, fontWeight:900, color:"#3A2708"}}>4.9</div>
        <div style={{position:"absolute", left:0, top:100, width:136, textAlign:"center", fontFamily:MONO, fontSize:13, fontWeight:800, letterSpacing:1.8, color:"#4A3410"}}>TOP RATED</div>
      </div>
      {s3<=52 && (
        <div style={{position:"absolute", inset:0, zIndex:10, opacity:D_op1}}>
          <Actor x={D_x1} groundY={GY} size={196} z={10} flip={true}>
            <Mascot lf={s3} size={196} beard={1} hoodie={1} cup={1} cheer={0.8} nodAmp={4} nodSpeed={10} gaze={-0.5}/>
          </Actor>
        </div>
      )}
      {s3>=54 && (
        <div style={{position:"absolute", inset:0, zIndex:10, opacity:D_op2}}>
          <Actor x={D_x2} groundY={GY} size={196} z={10} flip={true}>
            <Mascot lf={s3+11} size={196} girl={1} scarf={1} tote={1} cheer={0.85} nodAmp={4} nodSpeed={9} gaze={-0.5}/>
          </Actor>
        </div>
      )}
      <div style={{position:"absolute", inset:0, zIndex:14}}>
        <Actor x={D_fx} groundY={GYF} size={226} z={14}>
          <Mascot lf={s3} size={226} chef={1} apron={1} cap={1} cheer={cl(0.62+0.3*Math.sin(s3/8),0,1)} nodAmp={5} nodSpeed={12} gaze={0.5}/>
        </Actor>
      </div>
      {/* ===== THE CTA — big, clean, unobstructed ===== */}
      <div style={{position:"absolute", left:126, top:652, width:760, height:104, zIndex:38, opacity:cl(D_cta*1.6,0,1), transform:`translateY(${(1-D_cta)*44}px) scale(${0.88+0.12*D_cta})`, transformOrigin:"50% 100%"}}>
        <div style={{position:"absolute", left:8, top:16, width:744, height:96, borderRadius:52, background:"rgba(60,36,14,0.28)"}}/>
        <div style={{position:"absolute", inset:0, borderRadius:52, background:`linear-gradient(165deg, ${PAPER} 0%, ${CREAM} 100%)`, border:`4px solid ${GOLD_}`, boxShadow:"0 26px 52px -14px rgba(70,44,14,0.55), inset 0 2px 0 rgba(255,255,255,0.85)"}}/>
        <div style={{position:"absolute", left:14, top:10, width:732, height:34, borderRadius:"46px 46px 30px 30px", background:"linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0))"}}/>
        <div style={{position:"absolute", left:36, top:28, width:56, height:44, borderRadius:13, background:`linear-gradient(160deg, ${CLAY_} 0%, ${CLAY_DK} 100%)`, boxShadow:"0 6px 12px rgba(90,40,18,0.35)"}}>
          <div style={{position:"absolute", left:11, top:44, width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderTop:`13px solid ${CLAY_DK}`}}/>
          <div style={{position:"absolute", left:10, top:13, width:8, height:8, borderRadius:"50%", background:PAPER, transform:`translateY(${-2.5*Math.abs(Math.sin(s3/6))}px)`}}/>
          <div style={{position:"absolute", left:24, top:13, width:8, height:8, borderRadius:"50%", background:PAPER, transform:`translateY(${-2.5*Math.abs(Math.sin(s3/6-0.7))}px)`}}/>
          <div style={{position:"absolute", left:38, top:13, width:8, height:8, borderRadius:"50%", background:PAPER, transform:`translateY(${-2.5*Math.abs(Math.sin(s3/6-1.4))}px)`}}/>
        </div>
        <div style={{position:"absolute", left:112, top:34, fontFamily:MONO, fontSize:34, fontWeight:800, letterSpacing:1, color:"#4A3A22"}}>Comment</div>
        <div style={{position:"absolute", left:268, top:12, fontFamily:MONO, fontSize:70, fontWeight:900, letterSpacing:2, color:CLAY_DK, textShadow:"0 3px 0 rgba(255,255,255,0.85)"}}>SIMULATE</div>
        <div style={{position:"absolute", left:270, top:88, width:312*ramp(s3,26,70), height:7, borderRadius:4, background:`linear-gradient(90deg, ${GOLD_}, ${CLAY_})`}}/>
        <div style={{position:"absolute", left:696, top:34, width:34, height:34, borderRadius:"50%", background:`linear-gradient(160deg, ${GRN_L}, ${GREEN})`, transform:`scale(${cl(over(s3,54,12,Easing.out(Easing.back(2))),0,1.15)})`, boxShadow:"0 5px 11px rgba(10,40,26,0.45)"}}>
          <div style={{position:"absolute", left:8, top:16, width:10, height:4, borderRadius:2, background:"#0C2A18", transform:"rotate(45deg)"}}/>
          <div style={{position:"absolute", left:12, top:13, width:17, height:4, borderRadius:2, background:"#0C2A18", transform:"rotate(-48deg)"}}/>
        </div>
      </div>
    </div>
  );
  // ================= cut accents (2-3 frame whip streaks) =================
  const whip = (cutAt:number, ks:string) => {
    const u = lf - cutAt;
    if (u < 0 || u >= 3) return null;
    const x = IV(u,[0,3],[-420, 1120]);
    return <div key={ks} style={{position:"absolute", left:x, top:-60, width:380, height:920, zIndex:44, transform:"skewX(-16deg)", background:"linear-gradient(90deg, rgba(247,243,234,0) 0%, rgba(247,243,234,0.62) 46%, rgba(247,243,234,0) 100%)", pointerEvents:"none"}}/>;
  };
  return (
    <AbsoluteFill style={{overflow:"hidden", background:grad(SKY1, SKY3)}}>
      <div style={{position:"absolute", inset:0, overflow:"hidden"}}>
        {SHOT===0 && shotA}
        {SHOT===1 && shotB}
        {SHOT===2 && shotC}
        {SHOT===3 && shotD}
        {whip(CUT_B, "wb")}
        {whip(CUT_C, "wc")}
        {whip(CUT_D, "wd")}
        <SimTag text="SIM  WIN" x={798} y={22}/>
        <SimScan o={0.4}/>
        <div style={{position:"absolute", inset:0, zIndex:43, pointerEvents:"none", background:"radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 46%, rgba(60,38,18,0.24) 100%)"}}/>
      </div>
    </AbsoluteFill>
  );
};

const Hook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S1Body lf={lf} /><ScreenHead lf={lf} big="CLAUDE FINDS THE ONE THING" clay="THAT KILLS YOUR IDEA" chip={false} /></Panel>;
const Ultra: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S2Body lf={lf} /></Panel>;
const Stack: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S3Body lf={lf} /></Panel>;
const Agent: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S4Body lf={lf} /></Panel>;
const Rehook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S5Body lf={lf} /></Panel>;

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "SIMULATE"; const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14; const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 366, textAlign: "center", transform: `scale(${inP})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: SLATE }}>the exact setup</span></div>
      <div style={{ position: "absolute", left: 220, right: 220, top: 440, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE FACTORY GUIDE</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff" }}>every station's prompt</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>{["Sol's master-spec prompt", "The Terra + Luna line handoff", "The QA-gate rubric"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}><span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</span>{t}</div>)}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 796 + arrowBob, display: "flex", justifyContent: "center", opacity: inP }}><div style={{ width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `22px solid ${CLAY}` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 856, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 90, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>FACTORY</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "15px 24px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span><span style={{ width: 44, height: 44, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} /></span></div>
      </div>
    </AbsoluteFill>
  );
};
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><S6Body lf={lf} /></Panel>;

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
  { s: 0.0, e: 11.93, k: '' },
  { s: 11.93, e: 17.56, k: '1' },
  { s: 17.56, e: 29.11, k: '2' },
  { s: 29.11, e: 37.15, k: '3' },
  { s: 37.15, e: 44.72, k: '' },
];
const ChapterBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const fade = interpolate(t, [0.4, 1.2, 43.8, 44.6], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (fade < 0.01) return null;
  const nearEnd = interpolate(t, [37.15, 44.3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
  const VIRT = 46.3;
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

export const ClaudeSimulateReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.46, 0.7, 1.1, L[1] + 2.4, L[1] + 5.2, L[2] + 0.4, L[2] + 1.0, L[2] + 9.4, L[2] + 11.0, L[3] + 0.5, L[3] + 4.7, L[4] + 0.2, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_simulate.wav")} />
      {/* SOUNDTRACK: "Every Living Breathing Moment" (62_elbm.wav).
          The source mp3 fades in over ~4s from -59dB, so playing it from 0:00 would open the reel on
          silence. It is pre-trimmed from 4.42s — the track's first strong downbeat — so frame 0 lands
          on audible music (-14.8dB mean / -0.1dB peak in the first half second). 44s long: no loop needed.
          The track swings 22.7dB across the reel, so gain is shaped inversely to its measured per-2s rms
          at 75% strength: that flattens the swing to 10.7dB (present every moment, never buried under the
          VO) while still letting the song breathe rather than pumping it flat. */}
      <Audio src={staticFile("62_elbm.wav")} volume={(ff) => interpolate(
        ff,
        [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1158],
        [0.146, 0.300, 0.162, 0.300, 0.162, 0.289, 0.199, 0.201, 0.151, 0.159, 0.144, 0.205, 0.116, 0.222, 0.124, 0.092, 0.113, 0.093, 0.075, 0.108, 0.108],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )} />
      {/* ================= SFX DESIGN — cut to the SHOT MAP =================
          Durations measured from the library so tails are not chopped:
          lib_riser 2.58s (PRE-ROLLED by its full length so its peak lands ON the hit),
          lib_cinematic_hit 5.63s, cinematic-impact 7.97s, lib_confirm 4.55s,
          cash-register 3.79s, lib_magic_reveal 3.50s, lib_notif 2.80s, crowd_cheer 2.20s.
          Naturally-short one-shots (impact .62 / crash .70 / m_coin .49 / pk_* / blip .22 /
          lib_pop .20 / lib_click .29 / swoosh .42 / sparkle .50) play full length. */}

      {/* ---------- S1 SHOT A COLD OPEN (0.00-2.20) : the dead cafe, failures ticking ---------- */}
      <Sfx at={0.02} src="downer.mp3" v={0.24} dur={1.80} />
      <Sfx at={0.06} src="amb_breeze.wav" v={0.16} dur={2.10} />
      {[0.30, 0.62, 0.94, 1.26, 1.58, 1.90].map((tt, i) => <Sfx key={`s1f${i}`} at={tt} src="blip5.wav" v={0.11} dur={0.20} />)}
      {/* CUT -> SHOT B (lab, the cast) */}
      <Sfx at={2.12} src="lib_whoosh_fast.wav" v={0.34} dur={1.00} />
      {/* ---------- S1 SHOT B (2.20-4.33) : wizard casts, the globe ignites ---------- */}
      <Sfx at={2.24} src="lib_riser.wav" v={0.40} dur={0.62} />
      <Sfx at={2.58} src="lib_magic_reveal.wav" v={0.48} dur={2.00} />
      <Sfx at={2.64} src="impact.wav" v={0.34} dur={0.62} />
      <Sfx at={2.72} src="sparkle.wav" v={0.26} dur={0.50} />
      <Sfx at={2.95} src="construction.wav" v={0.20} dur={1.30} />
      {[3.05, 3.30, 3.55, 3.80, 4.05].map((tt, i) => <Sfx key={`s1b${i}`} at={tt} src="lib_pop.wav" v={0.16} dur={0.20} />)}
      {/* CUT -> SHOT C (inside the glowing globe) */}
      <Sfx at={4.28} src="swooshup.wav" v={0.28} dur={0.42} />
      {/* ---------- S1 SHOT C (4.33-6.52) : the vibrant world, then the crack ---------- */}
      <Sfx at={4.42} src="shimmer.wav" v={0.22} dur={0.80} />
      <Sfx at={4.58} src="crowd_run.wav" v={0.12} dur={1.10} />
      <Sfx at={5.90} src="glitch_counter.mp3" v={0.26} dur={0.90} />
      <Sfx at={6.10} src="screech.wav" v={0.16} dur={0.60} />

      {/* ---------- S2 SHOT A (6.52-8.32) : the idea card goes in ---------- */}
      <Sfx at={6.52} src="lib_whoosh.wav" v={0.26} dur={0.60} />
      <Sfx at={6.62} src="lib_paper.wav" v={0.30} dur={0.22} />
      <Sfx at={6.92} src="lib_click.wav" v={0.22} dur={0.29} />
      <Sfx at={7.20} src="digital-loading.wav" v={0.22} dur={1.00} />
      <Sfx at={7.92} src="lib_confirm.wav" v={0.26} dur={1.30} />
      {/* CUT -> SHOT B (construction) */}
      <Sfx at={8.29} src="lib_whoosh.wav" v={0.30} dur={0.60} />
      {/* ---------- S2 SHOT B (8.32-10.25) : the world builds itself ---------- */}
      <Sfx at={8.40} src="construction.wav" v={0.24} dur={1.80} />
      {[8.55, 8.75, 8.95, 9.15, 9.35, 9.55, 9.75, 9.95].map((tt, i) => <Sfx key={`s2b${i}`} at={tt} src="lib_pop.wav" v={0.17} dur={0.20} />)}
      <Sfx at={10.08} src="chimelo.wav" v={0.20} dur={0.60} />
      {/* CUT -> SHOT C (persona cards) */}
      <Sfx at={10.22} src="lib_whoosh_fast.wav" v={0.30} dur={0.90} />
      {/* ---------- S2 SHOT C (10.25-12.05) : the people, how they react ---------- */}
      {[10.40, 11.00, 11.60].map((tt, i) => <Sfx key={`s2c${i}`} at={tt} src="lib_pop2.wav" v={0.22} dur={0.20} />)}
      {[10.46, 11.06, 11.66].map((tt, i) => <Sfx key={`s2d${i}`} at={tt} src="blip5.wav" v={0.16} dur={0.22} />)}
      <Sfx at={11.86} src="lib_notif.wav" v={0.18} dur={1.10} />
      {/* CUT -> SHOT D (day time-lapse) */}
      <Sfx at={12.02} src="swooshup.wav" v={0.28} dur={0.42} />
      {/* ---------- S2 SHOT D (12.05-14.00) : the day plays out ---------- */}
      <Sfx at={12.12} src="crowd_cheer.wav" v={0.14} dur={1.60} />
      {[12.30, 12.90, 13.50].map((tt, i) => <Sfx key={`s2e${i}`} at={tt} src="cash-register.mp3" v={0.22} dur={1.60} />)}
      {[12.55, 13.15, 13.72].map((tt, i) => <Sfx key={`s2f${i}`} at={tt} src="m_coin.wav" v={0.16} dur={0.49} />)}
      <Sfx at={13.78} src="lib_confirm.wav" v={0.30} dur={1.40} />

      {/* ---------- S3 SHOT A (14.00-15.73) : all good, then the rival lands ---------- */}
      <Sfx at={14.00} src="lib_cinematic_hit.wav" v={0.24} dur={1.60} />
      <Sfx at={14.10} src="office_chatter.wav" v={0.11} dur={1.40} />
      <Sfx at={14.76} src="suspense_approach.wav" v={0.24} dur={2.00} />
      <Sfx at={15.18} src="lib_whoosh_fast.wav" v={0.34} dur={1.20} />
      <Sfx at={15.44} src="cinematic-impact.mp3" v={0.30} dur={2.00} />
      <Sfx at={15.50} src="screech.wav" v={0.20} dur={1.00} />
      {/* CUT -> SHOT B (customers drain) */}
      <Sfx at={15.70} src="lib_whoosh.wav" v={0.26} dur={0.60} />
      {/* ---------- S3 SHOT B (15.73-17.60) : they walk out ---------- */}
      {[15.95, 16.35, 16.75].map((tt, i) => <Sfx key={`s3b${i}`} at={tt} src="swooshdn.wav" v={0.20} dur={0.42} />)}
      <Sfx at={17.08} src="lib_click.wav" v={0.20} dur={0.29} />
      <Sfx at={17.24} src="huh.mp3" v={0.14} dur={0.60} />
      {/* CUT -> SHOT C (domino cascade) */}
      <Sfx at={17.57} src="lib_whoosh_fast.wav" v={0.30} dur={0.90} />
      {/* ---------- S3 SHOT C (17.60-19.27) : PRICE -> TRAFFIC -> CASH topple ---------- */}
      {([[17.80, 0.26], [18.25, 0.30], [18.70, 0.34]] as [number, number][]).map(([tt, v], i) => <Sfx key={`s3c${i}`} at={tt} src="impact.wav" v={v} dur={0.62} />)}
      {[17.86, 18.31, 18.76].map((tt, i) => <Sfx key={`s3d${i}`} at={tt} src="m_bump.wav" v={0.18} dur={0.09} />)}
      <Sfx at={19.02} src="crash.wav" v={0.28} dur={0.70} />
      {/* CUT -> SHOT D (lights out) */}
      <Sfx at={19.24} src="swooshdn.wav" v={0.28} dur={0.42} />
      {/* ---------- S3 SHOT D (19.27-20.88) : it closes ---------- */}
      {[19.40, 19.62, 19.84].map((tt, i) => <Sfx key={`s3e${i}`} at={tt} src="lib_click.wav" v={0.20} dur={0.29} />)}
      <Sfx at={19.98} src="downer.mp3" v={0.28} dur={2.00} />
      <Sfx at={20.32} src="lib_paper.wav" v={0.22} dur={0.22} />

      {/* ---------- S4 (20.88-24.63) : RUN IT AGAIN montage ---------- */}
      <Sfx at={18.30} src="lib_riser.wav" v={0.44} dur={2.58} />
      <Sfx at={20.88} src="lib_cinematic_hit.wav" v={0.30} dur={1.80} />
      <Sfx at={20.95} src="digital-loading.wav" v={0.28} dur={1.40} />
      {["blip1.wav", "blip2.wav", "blip3.wav", "blip4.wav"].map((s, i) => <Sfx key={`s4a${i}`} at={21.10 + i * 0.45} src={s} v={0.22} dur={0.22} />)}
      <Sfx at={21.80} src="glitch_counter.mp3" v={0.20} dur={1.60} />
      <Sfx at={22.20} src="data.wav" v={0.22} dur={0.21} />
      {[23.05, 23.35, 23.65, 23.95].map((tt, i) => <Sfx key={`s4b${i}`} at={tt} src="impact.wav" v={0.22} dur={0.62} />)}
      <Sfx at={24.28} src="lib_notif.wav" v={0.18} dur={1.00} />

      {/* ---------- S5 SHOT A (24.63-26.23) : eliminate the causes ---------- */}
      <Sfx at={24.63} src="lib_whoosh.wav" v={0.26} dur={0.60} />
      <Sfx at={24.70} src="digital-loading.wav" v={0.24} dur={1.10} />
      <Sfx at={25.08} src="lib_correct.wav" v={0.22} dur={1.40} />
      <Sfx at={25.44} src="lib_correct.wav" v={0.22} dur={1.40} />
      <Sfx at={25.80} src="alarm.wav" v={0.16} dur={0.60} />
      <Sfx at={25.90} src="lib_notif.wav" v={0.32} dur={1.30} />
      {/* CUT -> SHOT B (price macro) */}
      <Sfx at={26.20} src="lib_whoosh.wav" v={0.28} dur={0.60} />
      {/* ---------- S5 SHOT B (26.23-27.70) : the ONE change ---------- */}
      <Sfx at={26.40} src="lib_click.wav" v={0.24} dur={0.29} />
      <Sfx at={26.88} src="lib_magic_reveal.wav" v={0.38} dur={1.80} />
      <Sfx at={27.00} src="m_coin.wav" v={0.22} dur={0.49} />
      <Sfx at={27.28} src="lib_confirm.wav" v={0.34} dur={1.50} />
      {/* CUT -> SHOT C (restoration) */}
      <Sfx at={27.67} src="swooshup.wav" v={0.30} dur={0.42} />
      {/* ---------- S5 SHOT C (27.70-29.10) : it works ---------- */}
      <Sfx at={27.78} src="pk_heal.wav" v={0.30} dur={0.60} />
      <Sfx at={28.08} src="lib_click.wav" v={0.20} dur={0.29} />
      <Sfx at={28.38} src="chimehi.wav" v={0.26} dur={0.55} />
      <Sfx at={28.66} src="crowd_cheer.wav" v={0.18} dur={1.20} />
      <Sfx at={28.90} src="pk_hit.wav" v={0.22} dur={0.14} />

      {/* ---------- S6 SHOT A (29.10-31.03) : GRAND OPENING ---------- */}
      <Sfx at={26.52} src="lib_riser.wav" v={0.42} dur={2.58} />
      <Sfx at={29.10} src="lib_cinematic_hit.wav" v={0.30} dur={2.00} />
      <Sfx at={29.18} src="lib_magic_reveal.wav" v={0.32} dur={1.80} />
      <Sfx at={29.28} src="crowd_cheer.wav" v={0.30} dur={2.20} />
      <Sfx at={29.58} src="lib_pop2.wav" v={0.26} dur={0.20} />
      <Sfx at={29.68} src="sparkle.wav" v={0.24} dur={0.50} />
      <Sfx at={30.28} src="m_1up.wav" v={0.22} dur={0.85} />
      {/* CUT -> SHOT B (the day runs) */}
      <Sfx at={31.00} src="lib_whoosh.wav" v={0.28} dur={0.60} />
      {/* ---------- S6 SHOT B (31.03-33.36) : busy day ---------- */}
      <Sfx at={31.12} src="office_chatter.wav" v={0.11} dur={2.20} />
      {[31.30, 32.00, 32.70].map((tt, i) => <Sfx key={`s6a${i}`} at={tt} src="cash-register.mp3" v={0.22} dur={1.60} />)}
      {[31.45, 32.15, 32.85].map((tt, i) => <Sfx key={`s6b${i}`} at={tt} src="m_coin.wav" v={0.16} dur={0.49} />)}
      {[31.60, 32.30, 33.00].map((tt, i) => <Sfx key={`s6c${i}`} at={tt} src="lib_notif.wav" v={0.13} dur={0.80} />)}
      {/* CUT -> SHOT C (the result) */}
      <Sfx at={33.33} src="lib_whoosh_fast.wav" v={0.30} dur={0.90} />
      {/* ---------- S6 SHOT C (33.36-35.36) : the numbers ---------- */}
      <Sfx at={33.44} src="digital-loading.wav" v={0.20} dur={0.90} />
      {[33.70, 34.00, 34.30].map((tt, i) => <Sfx key={`s6d${i}`} at={tt} src="ding.wav" v={0.20} dur={0.50} />)}
      <Sfx at={34.58} src="lib_confirm.wav" v={0.34} dur={1.60} />
      <Sfx at={34.74} src="chimehi.wav" v={0.26} dur={0.55} />
      <Sfx at={35.00} src="pk_caught.wav" v={0.26} dur={0.86} />
      {/* CUT -> SHOT D (the CTA) */}
      <Sfx at={35.33} src="swooshup.wav" v={0.30} dur={0.42} />
      {/* ---------- S6 SHOT D (35.36-38.61) : Comment SIMULATE ---------- */}
      <Sfx at={34.22} src="lib_riser.wav" v={0.44} dur={2.58} />
      <Sfx at={36.80} src="lib_cinematic_hit.wav" v={0.46} dur={2.40} />
      <Sfx at={36.90} src="crowd_cheers2.wav" v={0.24} dur={2.20} />
      <Sfx at={37.02} src="sparkle.wav" v={0.26} dur={0.50} />
      <Sfx at={38.00} src="resolve.wav" v={0.32} dur={0.80} />
      {/* progress pellets */}
      {[3, 8, 14, 20, 26, 32, 38].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.08} dur={0.2} />)}

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
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
