import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img, OffthreadVideo } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_retire.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): beach hook, type numbers, ask card, card reveal, trick re-roll, bonus, cta
const L = [0.0, 3.54, 8.75, 12.76, 18.51, 27.61, 33.09];
const Lf = L.map(fr);
const CUT = 35.5;
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
  <Sequence from={fr(at)} durationInFrames={fr(dur)}>
    <Audio src={staticFile(`sfx/${src}`)} volume={(f) => { const total = fr(dur); const fi = Math.min(1, f / 2); const fo = Math.min(1, Math.max(0, (total - 1 - f) / 6)); return v * fi * fo; }} />
  </Sequence>
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

// ============================================================================
// ============================ RETIRE SCENES =================================
// ============================================================================
const WIN2 = "#FBFAF5";
const SUN1 = "#FFB25E", SUN2 = "#E86A3C", SKYA = "#3A2A55", SKYB = "#C2543E", SEA1 = "#2E4668", SEA2 = "#16263E", SAND1 = "#EBCF96", SAND2 = "#C9A468";

// ---- mavgpt-style persistent STICKER (swaps text at structural pivots) ----
const Sticker: React.FC<{ lf: number; text: string; emoji?: string; hot?: boolean }> = ({ lf, text, emoji, hot = false }) => {
  const p = over(lf, 2, fr(0.34), Easing.out(Easing.back(1.6)));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 58, display: "flex", justifyContent: "center", zIndex: 48, transform: `scale(${p}) rotate(${-1.2 + Math.sin(lf / 22) * 0.6}deg)`, opacity: p }}>
      <div style={{ maxWidth: 780, padding: "13px 26px", borderRadius: 18, background: hot ? grad("#FFEFD8", "#FFE2B8") : "#FFFDF7", border: `3px solid ${hot ? GOLD : "rgba(26,24,19,0.16)"}`, boxShadow: hot ? `0 14px 34px -10px rgba(10,16,34,0.55), 0 0 22px ${GOLD}66` : "0 14px 34px -10px rgba(10,16,34,0.55)", textAlign: "center" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 37, color: INK, letterSpacing: "-0.01em", lineHeight: 1.12 }}>{text} {emoji}</span>
      </div>
    </div>
  );
};

// ---- back-view PIXEL Claude sprite in beach attire (straw hat + hawaiian shirt + margarita) ----
const BackSprite: React.FC<{ lf: number; size?: number; raise?: number; swim?: boolean }> = ({ lf, size = 190, raise = 0, swim = false }) => {
  const u = size / 190;
  const px = 10 * u; // pixel unit — blocky like the canonical Mascot
  const breathe = Math.round(Math.sin(lf / 16) * 1.6) * u;
  const sip = raise > 0.02 ? 0 : Math.max(0, Math.sin(lf / 20)) * 16;
  const armLift = raise * (46 + Math.sin(lf / 9) * 5) + sip * 0.6;
  const C = "#D97757", CD = "#C05B32", SHIRT = "#3F9E74", SHIRT2 = "#2E7C57", HAT1 = "#EBCF96", HAT2 = "#C9A468";
  return (
    <div style={{ width: size, height: size * 1.0, position: "relative", imageRendering: "pixelated" as any }}>
      {/* towel */}
      <div style={{ position: "absolute", left: -30 * u, bottom: -8 * u, width: 250 * u, height: 22 * u, borderRadius: 6 * u, background: `repeating-linear-gradient(90deg, ${CLAY} 0 ${26 * u}px, #F1E4C8 ${26 * u}px ${52 * u}px)`, boxShadow: "0 12px 24px -8px rgba(10,10,30,0.5)" }} />
      {/* legs sticking forward (pixel stubs) */}
      <div style={{ position: "absolute", left: 34 * u, bottom: 6 * u, width: px * 2, height: px * 1.4, background: C, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 120 * u, bottom: 6 * u, width: px * 2, height: px * 1.4, background: C, borderRadius: 3 }} />
      {/* body: hawaiian shirt back OR bare swim body */}
      <div style={{ position: "absolute", left: 22 * u, bottom: 16 * u, width: 132 * u, height: (86 + breathe) * u, borderRadius: `${14 * u}px ${14 * u}px ${8 * u}px ${8 * u}px`, background: swim ? `linear-gradient(180deg, ${C}, ${CD})` : `linear-gradient(180deg, ${SHIRT}, ${SHIRT2})`, boxShadow: "inset 0 6px 10px rgba(255,255,255,0.18), inset 0 -8px 14px rgba(10,40,25,0.45), 0 10px 22px -8px rgba(10,10,30,0.45)" }}>
        {/* swim trunks band */}
        {swim && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30 * u, borderRadius: `0 0 ${8 * u}px ${8 * u}px`, background: `repeating-linear-gradient(90deg, #3A5C84 0 ${16 * u}px, #4C7BB0 ${16 * u}px ${32 * u}px)` }} />}
        {/* inflatable ring around the middle */}
        {swim && <div style={{ position: "absolute", left: -16 * u, right: -16 * u, top: 26 * u, height: 26 * u, borderRadius: 999, background: `repeating-linear-gradient(90deg, ${CLAY} 0 ${22 * u}px, #FBF6EC ${22 * u}px ${44 * u}px)`, boxShadow: "0 4px 10px rgba(10,10,30,0.35), inset 0 3px 0 rgba(255,255,255,0.4)" }} />}
        {/* flower pixels on the shirt */}
        {!swim && [[18, 16], [64, 30], [100, 12], [36, 52], [86, 56]].map((f, i) => (
          <div key={i} style={{ position: "absolute", left: f[0] * u, top: f[1] * u, width: 14 * u, height: 14 * u }}>
            <div style={{ position: "absolute", left: 4 * u, top: 0, width: 6 * u, height: 6 * u, background: "#F1E4C8" }} />
            <div style={{ position: "absolute", left: 0, top: 4 * u, width: 6 * u, height: 6 * u, background: "#F1E4C8" }} />
            <div style={{ position: "absolute", left: 8 * u, top: 4 * u, width: 6 * u, height: 6 * u, background: "#F1E4C8" }} />
            <div style={{ position: "absolute", left: 4 * u, top: 8 * u, width: 6 * u, height: 6 * u, background: "#F6C24A" }} />
          </div>
        ))}
        {/* shirt collar */}
        <div style={{ position: "absolute", left: 36 * u, top: -2 * u, width: 60 * u, height: 8 * u, background: SHIRT2, borderRadius: 3 }} />
      </div>
      {/* head from behind (clay pixel block) */}
      <div style={{ position: "absolute", left: 46 * u, bottom: (94 + breathe) * u, width: 84 * u, height: 56 * u, borderRadius: `${16 * u}px ${16 * u}px ${10 * u}px ${10 * u}px`, background: `linear-gradient(180deg, ${C}, ${CD})`, boxShadow: "inset 0 6px 10px rgba(255,220,190,0.25)" }}>
        {/* little pixel ears poking out the sides (canonical critter silhouette) */}
        <div style={{ position: "absolute", left: -8 * u, top: 10 * u, width: 10 * u, height: 16 * u, background: C, borderRadius: 3 }} />
        <div style={{ position: "absolute", right: -8 * u, top: 10 * u, width: 10 * u, height: 16 * u, background: C, borderRadius: 3 }} />
      </div>
      {/* straw hat (beach) OR snorkel mask band (swim) */}
      {!swim && <><div style={{ position: "absolute", left: 30 * u, bottom: (136 + breathe) * u, width: 116 * u, height: 14 * u, borderRadius: 7 * u, background: `linear-gradient(180deg, ${HAT1}, ${HAT2})`, boxShadow: "0 4px 10px rgba(10,10,30,0.35)" }} />
      <div style={{ position: "absolute", left: 56 * u, bottom: (146 + breathe) * u, width: 64 * u, height: 26 * u, borderRadius: `${10 * u}px ${10 * u}px 4px 4px`, background: `linear-gradient(180deg, ${HAT1}, ${HAT2})` }}>
        <div style={{ position: "absolute", left: 0, bottom: 6 * u, width: "100%", height: 6 * u, background: CLAY, opacity: 0.85 }} />
      </div></>}
      {swim && <><div style={{ position: "absolute", left: 42 * u, bottom: (128 + breathe) * u, width: 92 * u, height: 10 * u, borderRadius: 4, background: "#3A5C84" }} />
      <div style={{ position: "absolute", right: 26 * u, bottom: (132 + breathe) * u, width: 14 * u, height: 34 * u, borderRadius: 4, background: "#8FE0C4", boxShadow: "0 2px 6px rgba(10,10,30,0.3)" }} /></>}
      {/* left arm resting on towel */}
      <div style={{ position: "absolute", left: 6 * u, bottom: 34 * u, width: px * 1.6, height: px * 3, background: CD, borderRadius: 4, transform: "rotate(14deg)" }} />
      {/* right arm holding the margarita, lifts on raise/sip */}
      <div style={{ position: "absolute", right: 2 * u, bottom: (36 + armLift * 0.4) * u, width: px * 1.6, height: px * 3.4, background: CD, borderRadius: 4, transform: `rotate(${-24 - armLift * 0.5}deg)`, transformOrigin: "50% 100%" }} />
      <div style={{ position: "absolute", right: -14 * u, bottom: (66 + armLift) * u, transform: `rotate(${raise * -8}deg)` }}><DrinkProp size={44 * u} /></div>
    </div>
  );
};

// ---- leaping dolphin silhouette (parabolic arc + splashes) ----
const Dolphin: React.FC<{ lf: number; at: number; x0: number; dir?: number; scale?: number }> = ({ lf, at, x0, dir = 1, scale = 1 }) => {
  const t = (lf - at) / 34;                    // 34-frame jump
  if (t < 0 || t > 1) return null;
  const x = x0 + dir * t * 200 * scale;
  const y = 600 - Math.sin(t * Math.PI) * 215 * scale;
  const rot = dir * (t < 0.5 ? -34 + t * 76 : 4 + (t - 0.5) * 70);
  return (<>
    <svg width={96 * scale} height={44 * scale} viewBox="0 0 96 44" style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scaleX(${dir})`, zIndex: 4 }}>
      <path d="M4 30 C 18 8, 46 2, 70 10 C 80 13, 90 20, 94 28 C 84 26, 76 26, 68 28 C 60 34, 46 40, 30 38 C 18 37, 8 34, 4 30 Z" fill="#456A9C" /><path d="M10 31 C 24 34, 44 37, 62 31 C 50 36, 30 37, 14 33 Z" fill="#DCE9F8" opacity={0.9} />
      <path d="M42 10 C 46 2, 52 0, 56 2 C 52 6, 50 9, 49 12 Z" fill="#456A9C" />
      <path d="M4 30 C 2 26, 0 22, 2 18 C 6 21, 8 24, 10 27 Z" fill="#456A9C" />
    </svg>
    {/* entry/exit splashes */}
    {(t < 0.22 || t > 0.78) && Array.from({ length: 5 }, (_, k) => { const sp = t < 0.5 ? t / 0.22 : (1 - t) / 0.22; const sx = t < 0.5 ? x0 + 10 : x0 + dir * 200 * scale + 10; return (
      <div key={k} style={{ position: "absolute", left: sx + (k - 2) * 12 * scale, top: 606 - sp * (16 + seed(k) * 22) * scale, width: 6 * scale, height: 6 * scale, borderRadius: "50%", background: "rgba(240,246,255,0.75)", opacity: Math.max(0, 1 - Math.abs(0.5 - t) * 1.6) }} />); })}
  </>);
};
// ---- little fish flip ----
const FishFlip: React.FC<{ lf: number; at: number; x0: number }> = ({ lf, at, x0 }) => {
  const t = (lf - at) / 22;
  if (t < 0 || t > 1) return null;
  const y = 604 - Math.sin(t * Math.PI) * 64;
  return (
    <svg width={34} height={20} viewBox="0 0 34 20" style={{ position: "absolute", left: x0 + t * 56, top: y, transform: `rotate(${-40 + t * 120}deg)`, zIndex: 4 }}>
      <path d="M2 10 C 8 4, 18 3, 26 8 L 32 3 L 30 10 L 32 17 L 26 12 C 18 17, 8 16, 2 10 Z" fill="#2E4668" />
    </svg>
  );
};
// ---- pixel IRON MAN sprite (red/gold armor, arc reactor) ----
const IronManSprite: React.FC<{ lf: number; size?: number }> = ({ lf, size = 86 }) => {
  const u = size / 86;
  const hop = Math.abs(Math.sin(lf / 7)) * 4 * u;
  return (
    <div style={{ width: size, height: size * 1.04, position: "relative", transform: `translateY(${-hop}px)` }}>
      {/* legs */}
      <div style={{ position: "absolute", left: 16 * u, bottom: 0, width: 16 * u, height: 20 * u, background: "#B3241B", borderRadius: 3 }} />
      <div style={{ position: "absolute", right: 16 * u, bottom: 0, width: 16 * u, height: 20 * u, background: "#B3241B", borderRadius: 3 }} />
      {/* torso */}
      <div style={{ position: "absolute", left: 8 * u, bottom: 18 * u, width: 70 * u, height: 42 * u, borderRadius: 8 * u, background: "linear-gradient(180deg,#D8352A,#9E1E15)", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.25)" }}>
        {/* gold chest plate + arc reactor */}
        <div style={{ position: "absolute", left: 20 * u, top: 8 * u, width: 30 * u, height: 18 * u, borderRadius: 5 * u, background: "linear-gradient(180deg,#F2C14E,#D39A2A)" }} />
        <div style={{ position: "absolute", left: 30 * u, top: 12 * u, width: 10 * u, height: 10 * u, borderRadius: "50%", background: "#BFF6FF", boxShadow: `0 0 ${8 + Math.sin(lf / 5) * 4}px #7FE4FF` }} />
      </div>
      {/* arms */}
      <div style={{ position: "absolute", left: 0, bottom: 30 * u, width: 12 * u, height: 26 * u, background: "#B3241B", borderRadius: 4, transform: `rotate(${Math.sin(lf / 7) * 14}deg)` }} />
      <div style={{ position: "absolute", right: 0, bottom: 30 * u, width: 12 * u, height: 26 * u, background: "#B3241B", borderRadius: 4, transform: `rotate(${-Math.sin(lf / 7) * 14}deg)` }} />
      {/* helmet */}
      <div style={{ position: "absolute", left: 18 * u, bottom: 56 * u, width: 50 * u, height: 34 * u, borderRadius: `${10 * u}px ${10 * u}px ${6 * u}px ${6 * u}px`, background: "linear-gradient(180deg,#D8352A,#A82218)" }}>
        <div style={{ position: "absolute", left: 8 * u, top: 10 * u, width: 34 * u, height: 18 * u, borderRadius: 4 * u, background: "linear-gradient(180deg,#F2C14E,#D39A2A)" }}>
          <div style={{ position: "absolute", left: 5 * u, top: 6 * u, width: 9 * u, height: 3.4 * u, background: "#E8FBFF", boxShadow: "0 0 5px #BFF6FF" }} />
          <div style={{ position: "absolute", right: 5 * u, top: 6 * u, width: 9 * u, height: 3.4 * u, background: "#E8FBFF", boxShadow: "0 0 5px #BFF6FF" }} />
        </div>
      </div>
    </div>
  );
};
// ---- IRON MAN + the Fable wizard strolling the water line ----
const SpriteCouple: React.FC<{ lf: number; delay?: number }> = ({ lf, delay = 0 }) => {
  const t = lf - delay;
  if (t < 0) return null;
  const x = -170 + t * 2.35;
  if (x > 1100) return null;
  const bob = Math.abs(Math.sin(t / 7)) * 5;
  const bob2 = Math.abs(Math.sin(t / 7 + 1.4)) * 5;
  return (
    <div style={{ position: "absolute", left: x, top: 548, zIndex: 5 }}>
      <div style={{ position: "absolute", left: 0, top: -bob }}><IronManSprite lf={lf} size={84} /></div>
      <div style={{ position: "absolute", left: 100, top: -bob2 + 6 }}><Mascot lf={lf} size={84} gaze={5} cheer={0.55} nodAmp={2.2} nodSpeed={7} wizard={1} /></div>
      {/* little sand kicks behind their feet */}
      {Array.from({ length: 3 }, (_, k) => { const kp = ((t + k * 9) % 14) / 14; return (
        <div key={k} style={{ position: "absolute", left: -8 - kp * 14, top: 78 + seed(k) * 8, width: 5, height: 5, borderRadius: "50%", background: "rgba(222,196,138,0.8)", opacity: 1 - kp }} />); })}
    </div>
  );
};

// ---- sunset beach world (fills the Panel; panel-local 1012x792) ----
const BeachWorld: React.FC<{ lf: number; cta?: boolean }> = ({ lf, cta = false }) => {
  const sunPulse = 1 + Math.sin(lf / 18) * 0.02;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* sunset sky */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${SKYA} 0%, #7A3A4E 32%, ${SKYB} 55%, ${SUN1} 72%)` }} />
      {/* rotating sun rays */}
      {Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * 360 + lf * 0.22; return (
        <div key={`ray${i}`} style={{ position: "absolute", left: 506 - 5, top: 398 - 190, width: 10, height: 190, transformOrigin: "50% 100%", transform: `rotate(${a}deg)`, background: "linear-gradient(180deg, rgba(255,200,120,0.0), rgba(255,200,120,0.22))", borderRadius: 6 }} />); })}
      {/* sun on the horizon */}
      <div style={{ position: "absolute", left: 506 - 130, top: 268, width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, #FFE1A6 0%, ${SUN1} 46%, ${SUN2} 78%)`, boxShadow: `0 0 90px ${SUN1}cc, 0 0 190px ${SUN2}88`, transform: `scale(${sunPulse})` }} />
      {/* haze bands over the sun */}
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 306, top: 344 + i * 42, width: 400, height: 12, borderRadius: 8, background: `rgba(255,190,120,${0.24 - i * 0.06})`, filter: "blur(2px)" }} />)}
      {/* sea */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 396, height: 214, background: `linear-gradient(180deg, ${SEA1}, ${SEA2})` }} />
      {/* sun glitter path on the water */}
      {Array.from({ length: 9 }, (_, i) => { const s = seed(i * 3.1); const w = 46 + s * 130; const drift = Math.sin(lf / (10 + s * 9) + i * 2) * 14; return (
        <div key={i} style={{ position: "absolute", left: 506 - w / 2 + drift, top: 410 + i * 21, width: w, height: 6, borderRadius: 4, background: `rgba(255,178,96,${0.62 - i * 0.05})`, filter: "blur(0.6px)" }} />); })}
      {/* rolling wave edges (two staggered lines) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 596 + Math.sin(lf / 14) * 5, height: 16, borderRadius: 10, background: "rgba(240,246,255,0.5)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", left: -40, right: -40, top: 584 + Math.sin(lf / 11 + 2) * 7, height: 9, borderRadius: 8, background: "rgba(240,246,255,0.3)", filter: "blur(2px)" }} />
      {/* sand */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 606, bottom: 0, background: `linear-gradient(180deg, ${SAND1}, ${SAND2})` }} />
      {/* palm silhouette (left) */}
      <div style={{ position: "absolute", left: 44, top: 168 }}>
        <div style={{ position: "absolute", left: 34, top: 90, width: 20, height: 330, borderRadius: 12, background: "#221827", transform: "rotate(7deg)", transformOrigin: "50% 100%" }} />
        {Array.from({ length: 6 }, (_, i) => { const a = -80 + i * 34 + Math.sin(lf / 17 + i) * 2.4; return (
          <div key={i} style={{ position: "absolute", left: 40, top: 92, width: 128, height: 26, borderRadius: "50% 100% 10% 60%", background: "#221827", transform: `rotate(${a}deg)`, transformOrigin: "6% 50%" }} />); })}
      </div>
      {/* gulls */}
      {[0, 1].map((i) => { const gx = ((lf * (1.4 + i * 0.5) + i * 400) % 1300) - 140; const gy = 130 + i * 56 + Math.sin(lf / 9 + i * 3) * 9; return (
        <svg key={i} width={44} height={18} style={{ position: "absolute", left: gx, top: gy, opacity: 0.75 }}><path d={`M2 12 Q11 ${4 + Math.sin(lf / 4 + i) * 3} 22 12 Q33 ${4 + Math.sin(lf / 4 + i + 1) * 3} 42 12`} stroke="#2A1E30" strokeWidth={3.4} fill="none" strokeLinecap="round" /></svg>); })}
      {/* umbrella vignette + sprite on lounger, from behind, camera low */}
      <div style={{ position: "absolute", left: 118, top: 470, transform: "scale(1.9)", transformOrigin: "bottom left", opacity: 0.98 }}><BeachVignette size={104} /></div>
      <div style={{ position: "absolute", left: 506 - 96, top: 452, zIndex: 6 }}><BackSprite lf={lf} size={196} swim={cta} raise={cta ? over(lf, fr(0.5), fr(0.5), Easing.out(Easing.back(2))) : 0} /></div>
      {/* sprite couple strolling along the water line (hook only) */}
      {!cta && <SpriteCouple lf={lf} delay={fr(0.9)} />}
      {/* dolphins + fish leaping (hook only) */}
      {!cta && <><Dolphin lf={lf} at={fr(0.55)} x0={620} dir={1} scale={1} /><Dolphin lf={lf} at={fr(2.1)} x0={260} dir={1} scale={0.72} /><FishFlip lf={lf} at={fr(3.0)} x0={760} /></>}
      {/* footprints appear one by one, walking toward the lounger */}
      {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 860 - i * 40, top: 758 - i * 22, width: 17, height: 9, borderRadius: "50%", background: "rgba(120,86,40,0.45)", transform: `rotate(${18 + i * 4}deg)`, opacity: over(lf, fr(0.25 + i * 0.28), 8) }} />)}
      {/* warm vignette */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 190px rgba(30,12,26,0.55)" }} />
    </div>
  );
};

// ---- HOOK: beach + thought bubble "2049?" ----
const HookBeach: React.FC<{ lf: number }> = ({ lf }) => {
  const q = over(lf, fr(1.25), fr(0.4), Easing.out(Easing.back(1.7)));
  return (
    <>
      <BeachWorld lf={lf} />
      {/* thought bubble: the money-daydream meme plays inside it */}
      {q > 0.02 && (
        <div style={{ position: "absolute", left: 570, top: 210, transform: `scale(${q})`, transformOrigin: "16% 100%", zIndex: 8 }}>
          <div style={{ position: "absolute", left: -20, top: 196, width: 14, height: 14, borderRadius: "50%", background: "#FFFDF7" }} />
          <div style={{ position: "absolute", left: -36, top: 216, width: 9, height: 9, borderRadius: "50%", background: "#FFFDF7" }} />
          <div style={{ position: "relative", padding: 10, borderRadius: 24, background: "#FFFDF7", boxShadow: "0 16px 34px -10px rgba(10,10,30,0.6)" }}>
            <div style={{ width: 350, height: 165, borderRadius: 16, overflow: "hidden", position: "relative", background: "#000" }}>
              <div style={{ position: "absolute", inset: 0, transform: `scale(${1.12 + Math.sin(lf / 26) * 0.05}) translate(${Math.sin(lf / 34) * 9}px, ${Math.cos(lf / 30) * 5}px)` }}>
                <Sequence from={fr(1.25)} layout="none"><OffthreadVideo src={staticFile("bb_money.mp4")} loop startFrom={26} volume={(f) => (f < 32 ? 0.4 * Math.min(1, Math.max(0, (32 - f) / 6)) : 0)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
              </div>
              {/* floating $ bills drifting up inside the daydream */}
              {Array.from({ length: 4 }, (_, k) => { const fy = ((lf * (1.1 + seed(k) * 0.8) + seed(k * 3) * 120) % 150); return (
                <span key={k} style={{ position: "absolute", left: 26 + seed(k * 7) * 290, bottom: fy - 18, fontSize: 17, opacity: Math.min(1, (150 - fy) / 60) * 0.85, transform: `rotate(${Math.sin(lf / 9 + k) * 18}deg)` }}>💵</span>); })}
              {/* LIVE dot so it reads as playing footage */}
              <div style={{ position: "absolute", left: 10, top: 8, display: "flex", alignItems: "center", gap: 6, padding: "3px 9px", borderRadius: 999, background: "rgba(0,0,0,0.55)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF4B3A", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 7)) }} />
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: 1 }}>dream</span>
              </div>
            </div>
            <div style={{ position: "absolute", right: -14, top: -14, padding: "6px 13px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", boxShadow: "0 8px 18px -6px rgba(10,10,30,0.5)" }}>20<span style={{ color: "#FFE3B8" }}>??</span></div>
          </div>
        </div>
      )}
    </>
  );
};

// ---- shared Claude-app chrome (real-UI look, panel-local) ----
const ClaudeApp: React.FC<{ lf: number; children?: React.ReactNode }> = ({ lf, children }) => (
  <>
    {/* sidebar */}
    <div style={{ position: "absolute", left: 0, top: 62, bottom: 0, width: 74, background: "rgba(8,12,24,0.55)", borderRight: "1px solid rgba(150,170,215,0.14)" }}>
      <div style={{ margin: "16px auto 20px", width: 40, height: 40 }}><ClaudeLogo lf={lf} size={40} /></div>
      {["✚", "▤", "▦", "◫"].map((g, i) => <div key={i} style={{ margin: "14px auto", width: 38, height: 38, borderRadius: 10, background: i === 0 ? grad("#E9825C", "#C7541F") : "rgba(120,150,210,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: i === 0 ? "#fff" : "rgba(190,205,235,0.65)" }}>{g}</div>)}
    </div>
    <div style={{ position: "absolute", left: 74, right: 0, top: 62, bottom: 0 }}>{children}</div>
  </>
);
const UserBubble: React.FC<{ w?: number; children?: React.ReactNode }> = ({ w = 560, children }) => (
  <div style={{ marginLeft: "auto", width: w, padding: "16px 20px", borderRadius: "18px 18px 6px 18px", background: grad("#2C3B5E", "#22304E"), border: "1px solid rgba(150,170,215,0.3)", boxShadow: "0 12px 26px -10px rgba(0,0,0,0.6)", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 23, lineHeight: 1.4, color: "#E8EEF9" }}>{children}</div>
);

// ---- S1: type the three numbers ----
const TypeNumbers: React.FC<{ lf: number }> = ({ lf }) => {
  const PROMPT = "Here's what I make, what I've saved, and what I spend in a month.";
  const typed = Math.floor(over(lf, fr(0.5), fr(3.4)) * PROMPT.length);
  const chips = [
    { t: "MAKE", v: "$75k / yr", at: 1.6, c: SLATE },
    { t: "SAVED", v: "$40k", at: 2.4, c: GREEN },
    { t: "SPEND", v: "$3,500 / mo", at: 3.1, c: AMBER },
  ];
  return (
    <ClaudeApp lf={lf}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 178, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 34, color: "rgba(235,225,205,0.9)" }}>
        <span style={{ color: "#E9825C" }}>✳</span>&nbsp; Good evening, Alex
      </div>
      {/* three number chips snap in as VO names them */}
      <div style={{ position: "absolute", left: 62, top: 268, display: "flex", gap: 26 }}>
        {chips.map((c, i) => { const p = over(lf, fr(c.at), fr(0.3), Easing.out(Easing.back(1.8))); return (
          <div key={i} style={{ transform: `scale(${p}) rotate(${(i - 1) * 2}deg)`, opacity: p, width: 252, borderRadius: 20, background: grad("#151F38", "#0D1526"), border: `2.5px solid ${c.c}`, boxShadow: `0 16px 34px -12px rgba(0,0,0,0.65), 0 0 18px ${c.c}44`, padding: "16px 20px" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, letterSpacing: 2.4, color: c.c }}>{c.t}</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 41, color: "#F2ECDD", marginTop: 4 }}>{c.v}</div>
          </div>); })}
      </div>
      {/* pen scribbles ballpark squiggle under chips */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 452, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.6)", opacity: over(lf, fr(3.6), 8) }}>✍️ rough guesses work, no statements needed</div>
      {/* composer with live typing */}
      <div style={{ position: "absolute", left: 40, right: 44, bottom: 42, borderRadius: 22, background: "rgba(16,24,44,0.92)", border: "1.5px solid rgba(150,170,215,0.35)", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.7)", padding: "20px 22px 14px" }}>
        <div style={{ minHeight: 76, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, lineHeight: 1.42, color: "#EDF2FB" }}>
          {PROMPT.slice(0, typed)}<span style={{ opacity: lf % 14 < 7 ? 1 : 0.15, color: "#E9825C" }}>▎</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: "rgba(190,205,235,0.6)", padding: "5px 12px", borderRadius: 9, border: "1px solid rgba(150,170,215,0.3)" }}>Fable 5 ▾</span>
          <div style={{ marginLeft: "auto", width: 46, height: 46, borderRadius: 13, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${12 + Math.sin(lf / 5) * 6}px rgba(233,130,92,0.6)` }}>
            <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderBottom: "13px solid #fff" }} />
          </div>
        </div>
      </div>
      {/* mini sprite typing at the corner */}
      <div style={{ position: "absolute", right: 26, bottom: 208, zIndex: 5 }}><Mascot lf={lf} size={96} gaze={-5} cheer={0.3} nodAmp={3.2} nodSpeed={4.6} /></div>
    </ClaudeApp>
  );
};

// ---- S2: send the ask -> card skeleton ----
const AskCard: React.FC<{ lf: number }> = ({ lf }) => {
  const sent = over(lf, fr(0.2), fr(0.28), Easing.out(Easing.cubic));
  const think = over(lf, fr(0.4), 6);
  const skel = over(lf, fr(0.55), fr(1.2));
  return (
    <ClaudeApp lf={lf}>
      <div style={{ position: "absolute", left: 34, right: 40, top: 128, transform: `translateY(${(1 - sent) * 60}px)`, opacity: sent }}>
        <UserBubble w={520}>Now turn that into my <b style={{ color: "#F0A878" }}>retirement card</b>.</UserBubble>
      </div>
      {/* claude thinking -> card skeleton draws itself */}
      {think > 0.02 && (
        <div style={{ position: "absolute", left: 40, top: 196, display: "flex", gap: 12, alignItems: "center", opacity: think }}>
          <ClaudeLogo lf={lf} size={34} />
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#E9825C", opacity: 0.35 + 0.65 * Math.abs(Math.sin(lf / 6 - i * 1.1)) }} />)}
        </div>
      )}
      {skel > 0.02 && Array.from({ length: 6 }, (_, i) => { const sp = (lf * (5 + seed(i) * 3) + seed(i * 3) * 300) % 320; return (
        <div key={`ds${i}`} style={{ position: "absolute", left: 246 + seed(i * 7) * 500, top: 150 + sp, width: 4, height: 26, borderRadius: 3, background: i % 2 ? "rgba(233,130,92,0.55)" : "rgba(143,224,196,0.5)", opacity: Math.min(1, skel * 2) * (1 - sp / 340), boxShadow: "0 0 8px rgba(233,130,92,0.4)" }} />); })}
      {skel > 0.02 && (
        <div style={{ position: "absolute", left: 166, top: 226, width: 680, height: 420, borderRadius: 26, border: "1.5px solid #E9E9E6", background: "rgba(255,255,255,0.96)", boxShadow: `0 26px 54px -18px rgba(20,24,40,0.55), 0 0 ${16 + skel * 18}px rgba(0,200,5,${0.1 + skel * 0.14})`, transform: `scale(${0.94 + skel * 0.06})`, overflow: "hidden", padding: "26px 34px" }}>
          {/* ghost Claudehood header forming */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: Math.min(1, skel * 1.8) }}>
            <svg width={28} height={28} viewBox="0 0 40 40" style={{ opacity: 0.55 }}>
              <path d="M31 4 C 18 6, 9 14, 7 27 C 6.4 31, 6.8 34, 8 36 C 9 30, 11 26, 15 22 C 13 28, 12.6 32, 13.4 35 C 20 33, 26 27, 28.6 19 C 30.6 13, 31.4 8, 31 4 Z" fill="#D97757" />
            </svg>
            <div style={{ width: 128, height: 16, borderRadius: 6, background: "#E6E6E1" }} />
            <div style={{ marginLeft: "auto", width: 96, height: 20, borderRadius: 999, background: "#F0F0EB" }} />
          </div>
          {/* label bar */}
          <div style={{ marginTop: 20, width: 130, height: 12, borderRadius: 5, background: "#ECECE7", opacity: Math.min(1, Math.max(0, skel * 1.8 - 0.15)) }} />
          {/* the year, still computing: "20" + two scrambling blurred cells */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, opacity: Math.min(1, Math.max(0, skel * 1.8 - 0.25)) }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 68, letterSpacing: "-0.03em", color: "#3A3A36" }}>20</span>
            {[0, 1].map((k) => (
              <div key={k} style={{ width: 46, height: 70, borderRadius: 10, background: "#F3F3EE", border: "1.5px solid #E9E9E6", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: -((lf * (22 + k * 7)) % 480), filter: "blur(5px)", opacity: 0.5 }}>
                  {Array.from({ length: 16 }, (_, d) => <div key={d} style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 46, color: "#9A9A94" }}>{(d * 3 + k) % 10}</div>)}
                </div>
              </div>
            ))}
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: "#B9B9B2", marginLeft: 8 }}>computing…</span>
          </div>
          {/* ghost chart drawing itself */}
          <svg width={600} height={104} viewBox="0 0 600 104" style={{ marginTop: 14, display: "block", opacity: Math.min(1, Math.max(0, skel * 1.9 - 0.35)) }}>
            <line x1={0} x2={600} y1={80} y2={80} stroke="#E2E2DC" strokeWidth={1.6} strokeDasharray="3 6" />
            <path d="M0 96 C 170 90, 330 72, 460 42 S 580 14, 600 10" fill="none" stroke="#BFE8C4" strokeWidth={3.4} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - Math.min(1, Math.max(0, skel * 1.9 - 0.35)))} />
          </svg>
          {/* ghost pills */}
          <div style={{ display: "flex", gap: 8, marginTop: 8, opacity: Math.min(1, Math.max(0, skel * 2 - 0.5)) }}>
            {[34, 34, 40, 44].map((w, i) => <div key={i} style={{ width: w, height: 22, borderRadius: 999, background: i === 3 ? "#D9F3DC" : "#F0F0EB" }} />)}
          </div>
          {/* progress bar filling */}
          <div style={{ position: "relative", height: 10, borderRadius: 999, background: "#EFEFEA", marginTop: 14 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${34 * Math.min(1, Math.max(0, skel * 1.7 - 0.6))}%`, borderRadius: 999, background: "#00C805" }} />
          </div>
          {/* shimmer sweep = loading */}
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 130, left: ((lf * 7) % 900) - 140, background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.75), transparent)", transform: "skewX(-14deg)" }} />
        </div>
      )}
      <div style={{ position: "absolute", right: 30, bottom: 26 }}><Mascot lf={lf} size={96} gaze={-6} cheer={0.3} nodAmp={2.8} nodSpeed={5.5} /></div>
    </ClaudeApp>
  );
};

// ---- CLAUDEHOOD: white Robinhood-style retirement dashboard (knockoff feather logo) ----
const RHGREEN = "#00C805", RHDARK = "#1A1813", RHGREY = "#6F7480", RHLINE = "#E9E9E6";
const ClaudehoodLogo: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
    {/* knockoff feather mark, clay */}
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M31 4 C 18 6, 9 14, 7 27 C 6.4 31, 6.8 34, 8 36 C 9 30, 11 26, 15 22 C 13 28, 12.6 32, 13.4 35 C 20 33, 26 27, 28.6 19 C 30.6 13, 31.4 8, 31 4 Z" fill="#D97757" />
      <path d="M8 36 C 12 27, 18 18, 31 4" stroke="#B85328" strokeWidth={1.6} fill="none" opacity={0.7} />
    </svg>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size * 0.62, letterSpacing: "-0.02em", color: RHDARK }}>Claudehood</span>
  </div>
);
const RetireCard: React.FC<{ lf: number; year: string; num: string; prog: number; glowY?: number; glowN?: number; dim?: number; rollFrom?: string; rollP?: number; chartP?: number; altP?: number }> = ({ lf, year, num, prog, glowY = 0, glowN = 0, dim = 0, rollFrom, rollP = 0, chartP, altP }) => (
  <div style={{ position: "relative", width: 620, borderRadius: 28, background: "#FFFFFF", border: `1.5px solid ${RHLINE}`, boxShadow: `0 30px 60px -18px rgba(20,24,40,0.5), 0 0 ${22 + glowY * 26}px rgba(0,200,5,${0.08 + glowY * 0.18})`, padding: "26px 36px 24px", filter: `saturate(${1 - dim * 0.3}) brightness(${1 - dim * 0.08})` }}>
    {/* header: knockoff logo + retirement tag */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <ClaudehoodLogo size={34} />
      <span style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 999, background: "#F4F4F1", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: 1.6, color: RHGREY }}>RETIREMENT</span>
    </div>
    {/* the YEAR — Robinhood big-number style, odometer roll */}
    <div style={{ marginTop: 14, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: RHGREY }}>You can retire in</div>
    <div style={{ position: "relative", height: 104, overflow: "hidden" }}>
      {rollFrom && rollP > 0 && rollP < 1 ? (
        <div style={{ position: "absolute", left: 0, top: -104 * rollP }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 88, lineHeight: "104px", letterSpacing: "-0.03em", color: RHDARK }}>{rollFrom}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 88, lineHeight: "104px", letterSpacing: "-0.03em", color: RHGREEN }}>{year}</div>
        </div>
      ) : (
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 88, lineHeight: "104px", letterSpacing: "-0.03em", color: rollP >= 1 ? RHGREEN : RHDARK }}>{year}</div>
      )}
    </div>
    {/* dollar line, RH delta style */}
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 2 }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: RHDARK, textShadow: glowN > 0 ? `0 0 ${10 + glowN * 12}px rgba(0,200,5,0.4)` : "none" }}>{num}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: RHGREEN }}>▲ your number</span>
    </div>
    {/* the chart — RH thin green line + dotted baseline; alt = steeper +$500 line, old line goes ghost */}
    <svg width={548} height={128} viewBox="0 0 548 128" style={{ marginTop: 12, display: "block" }}>
      <line x1={0} x2={548} y1={98} y2={98} stroke="#D9D9D4" strokeWidth={1.6} strokeDasharray="3 6" />
      <path d="M0 116 C 160 110, 300 92, 420 56 S 530 20, 548 16" fill="none" stroke={(altP ?? 0) > 0.01 ? "#C9CDC6" : RHGREEN} strokeWidth={3.2} strokeLinecap="round" strokeDasharray={660} strokeDashoffset={660 * (1 - (chartP ?? 1))} style={(altP ?? 0) > 0.01 ? { transition: "none" } : { filter: "drop-shadow(0 1px 4px rgba(0,200,5,0.35))" }} />
      {(altP ?? 0) > 0.01 && (<>
        <path d="M0 116 C 150 106, 270 80, 380 44 S 490 10, 520 6" fill="none" stroke={RHGREEN} strokeWidth={3.6} strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - (altP ?? 0))} style={{ filter: "drop-shadow(0 1px 6px rgba(0,200,5,0.5))" }} />
        <circle cx={520} cy={6} r={7} fill={RHGREEN} opacity={altP ?? 0} style={{ filter: "drop-shadow(0 0 6px rgba(0,200,5,0.8))" }} />
      </>)}
      {(altP ?? 0) <= 0.01 && <circle cx={546} cy={16} r={6.5} fill={RHGREEN} opacity={chartP ?? 1} style={{ filter: "drop-shadow(0 0 6px rgba(0,200,5,0.7))" }} />}
      {/* pulse ring on the live dot */}
      <circle cx={(altP ?? 0) > 0.01 ? 520 : 546} cy={(altP ?? 0) > 0.01 ? 6 : 16} r={6.5 + (Math.sin(lf / 6) + 1) * 4} fill="none" stroke={RHGREEN} strokeWidth={1.4} opacity={0.35 * (chartP ?? 1)} />
    </svg>
    {/* RH time-range pills */}
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {["1Y", "5Y", "10Y", "ALL"].map((t, i) => (
        <span key={i} style={{ padding: "5px 13px", borderRadius: 999, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, background: i === 3 ? RHGREEN : "transparent", color: i === 3 ? "#fff" : RHGREY }}>{t}</span>
      ))}
      <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: RHGREY }}>2026 → {year}</span>
    </div>
    {/* progress to the number */}
    <div style={{ position: "relative", height: 10, borderRadius: 999, background: "#EFEFEA", marginTop: 12 }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${prog * 100}%`, borderRadius: 999, background: RHGREEN }} />
      <div style={{ position: "absolute", left: `${prog * 100}%`, top: -4, width: 7, height: 18, marginLeft: -3, borderRadius: 4, background: RHGREEN, boxShadow: "0 0 8px rgba(0,200,5,0.6)" }} />
    </div>
  </div>
);

// ---- S3: card reveal + "not the trick" tension turn ----
const CardReveal: React.FC<{ lf: number }> = ({ lf }) => {
  const pop = over(lf, fr(0.08), fr(0.4), Easing.out(Easing.back(1.35)));
  const glowY = Math.max(0, over(lf, fr(1.3), 8) - over(lf, fr(2.6), 10) * 0.7);
  const glowN = Math.max(0, over(lf, fr(2.4), 8) - over(lf, fr(3.6), 10) * 0.7);
  const dim = over(lf, fr(4.5), fr(0.5)); // "but the card is not the trick"
  const lean = over(lf, fr(4.7), fr(0.4), Easing.out(Easing.back(1.6)));
  return (
    <ClaudeApp lf={lf}>
      <div style={{ position: "absolute", left: 160, top: 112 + Math.sin(lf / 17) * 5, transform: `scale(${pop}) rotate(${(1 - pop) * -3 + dim * -1.6}deg)`, transformOrigin: "50% 30%", opacity: pop }}>
        <RetireCard lf={lf} year="2049" num={`$${Math.round(1050000 * Math.max(0.02, over(lf, fr(0.7), fr(1.5)))).toLocaleString("en-US")}`} prog={0.30 * over(lf, fr(1.0), fr(1.4))} glowY={glowY} glowN={glowN} dim={dim} chartP={over(lf, fr(0.9), fr(1.6))} />
      </div>
      {/* confetti burst on reveal */}
      {(() => { const dt = lf - fr(0.3); if (dt < 0 || dt > 26) return null; return Array.from({ length: 20 }, (_, k) => { const a = (k / 20) * Math.PI * 2 + seed(k); const d = Math.pow(dt / 26, 0.6) * (120 + seed(k * 2) * 150); const c = [GOLD, CLAY, "#8FE0C4", "#F3E3A6"][k % 4]; return <div key={k} style={{ position: "absolute", left: 470 + Math.cos(a) * d, top: 300 + Math.sin(a) * d + dt * dt * 0.16, width: 9, height: 9, borderRadius: 2, background: c, opacity: Math.max(0, 1 - dt / 24), transform: `rotate(${dt * 14 + k * 40}deg)`, boxShadow: `0 0 8px ${c}` }} />; }); })()}
      {/* slow gold flecks drifting down while the card glows */}
      {Array.from({ length: 7 }, (_, i) => { const fy = ((lf * (1.6 + seed(i) * 1.2) + seed(i * 5) * 300) % 420); const on = over(lf, fr(1.0), 12) * (1 - dim); return on > 0.02 ? (
        <div key={`gf${i}`} style={{ position: "absolute", left: 200 + seed(i * 3) * 560, top: 140 + fy, width: 5, height: 5, borderRadius: "50%", background: GOLD, opacity: on * 0.5 * (1 - fy / 420), boxShadow: `0 0 6px ${GOLD}` }} />) : null; })}
      {/* sprite shock->cheer, then leans in on the turn */}
      <div style={{ position: "absolute", right: 10, bottom: 8, transform: `translateX(${lean * -20}px) scale(${1 + lean * 0.12})` }}>
        <Mascot lf={lf} size={118} gaze={-7} shock={Math.max(0, over(lf, fr(0.6), 6) - over(lf, fr(1.5), 8))} cheer={Math.max(0, over(lf, fr(1.6), 8) - dim)} stern={dim * 0.7} nodAmp={2.6} nodSpeed={5.5} />
      </div>
      {/* "most people never see their year" ghost cards drifting behind */}
      {(() => { const gp = over(lf, fr(3.4), fr(0.6)); return gp > 0.02 ? [0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 76 + i * 280, top: 632, width: 200, height: 82, borderRadius: 16, border: "2px dashed rgba(190,205,235,0.28)", background: "rgba(16,24,44,0.4)", opacity: gp * (0.8 - i * 0.14), transform: `rotate(${(i - 1) * 4}deg) translateY(${Math.sin(lf / 12 + i * 2) * 5}px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "rgba(190,205,235,0.3)" }}>20<span style={{ letterSpacing: 2 }}>??</span></span>
        </div>)) : null; })()}
    </ClaudeApp>
  );
};

// ---- S4: HERE'S THE TRICK — same chat, +$500 -> year rolls 2049 -> 2046 ----
const TrickRoll: React.FC<{ lf: number }> = ({ lf }) => {
  const ask = over(lf, fr(0.9), fr(0.32), Easing.out(Easing.cubic));
  const rollP = over(lf, fr(5.7), fr(0.9), Easing.inOut(Easing.cubic));
  const rolled = rollP >= 1;
  const badge = over(lf, fr(7.0), fr(0.4), Easing.out(Easing.back(1.8)));
  const coins = over(lf, fr(3.8), fr(1.4));
  const jolt = (() => { const dt = lf - fr(6.5); return dt >= 0 && dt < 7 ? Math.pow(1 - dt / 7, 2) * 6 : 0; })();
  return (
    <ClaudeApp lf={lf}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${jolt * Math.sin(lf * 2.4)}px, ${jolt * Math.cos(lf * 2.1) * 0.6}px)` }}>
      {/* the same-chat ask slams in (below the sticker) */}
      <div style={{ position: "absolute", left: 34, right: 40, top: 122, transform: `translateY(${(1 - ask) * 50}px)`, opacity: ask }}>
        <UserBubble w={380}>+ <b style={{ color: "#8FE0C4" }}>$500</b> a month?</UserBubble>
      </div>
      {/* card with the odometer roll */}
      <div style={{ position: "absolute", left: 160, top: 196 }}>
        <RetireCard lf={lf} year={rolled ? "2046" : "2049"} num="$1,050,000" prog={0.30 + rollP * 0.09} glowY={rollP} rollFrom="2049" rollP={rollP} chartP={1} altP={over(lf, fr(2.6), fr(1.1))} />
      </div>
      {/* -3 YEARS badge */}
      {badge > 0.02 && (
        <div style={{ position: "absolute", left: 528, top: 300, transform: `scale(${badge}) rotate(6deg)`, zIndex: 10 }}>
          <Chip text="▼ 3 YEARS SOONER" bg="#00C805" bd="#8CE8A0" fg="#fff" size={36} />
        </div>
      )}
      {/* coins arc into the card while "put away $500" */}
      {coins > 0.02 && Array.from({ length: 10 }, (_, i) => { const p = Math.min(1, Math.max(0, coins * 1.9 - i * 0.13)); if (p <= 0) return null; const x = 90 + p * 300; const y = 620 - Math.sin(p * Math.PI) * 260 - i * 6; return (
        <div key={i} style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, 2 - p * 1.6) }}><CoinPuff size={30} lf={lf} /></div>); })}
      {/* gold burst when the roll lands */}
      {(() => { const dt = lf - fr(7.0); if (dt < 0 || dt > 22) return null; return Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; const d = Math.pow(dt / 22, 0.55) * 150; return <div key={k} style={{ position: "absolute", left: 420 + Math.cos(a) * d, top: 300 + Math.sin(a) * d, width: 8, height: 8, borderRadius: "50%", background: k % 2 ? GOLD : "#8FE0C4", opacity: Math.max(0, 1 - dt / 20), boxShadow: `0 0 10px ${GOLD}` }} />; }); })()}
      {/* sprite goes wild */}
      <div style={{ position: "absolute", right: 30, bottom: 26 }}>
        <Mascot lf={lf} size={128} gaze={-7} cheer={rolled ? 1 : 0.25} shock={rolled ? Math.max(0, 1 - (lf - fr(4.35)) / 16) * 0.7 : 0} nodAmp={rolled ? 5 : 2.8} nodSpeed={4.6} />
      </div>
      <StatusZip lf={lf} dur={fr(9.1)} label="RERUNNING THE MATH" from={0} to={100} suffix="%" variant="green" y={700} />
      </div>
    </ClaudeApp>
  );
};

// ---- S5: BONUS — re-run everything; dials spin down ----
const CruiseShip: React.FC<{ lf: number }> = ({ lf }) => {
  const bob = Math.sin(lf / 21) * 6;
  const drift = Math.sin(lf / 60) * 14;
  // the kamikaze seagull: swoops in, BONKS the funnel, tumbles down
  const gt = (lf - fr(1.5)) / 40;
  const bonk = gt >= 0.62;
  const gx = 940 - Math.min(gt, 0.62) * 640;
  const gy = 30 + Math.min(gt, 0.62) * 60 + (bonk ? Math.pow((gt - 0.62) * 6, 2) * 90 : 0);
  return (
    <div style={{ position: "absolute", left: 130 + drift, top: 400 + bob, width: 760, height: 330 }}>
      {/* funnel smoke puffs */}
      {Array.from({ length: 4 }, (_, i) => { const p = ((lf * 0.9 + i * 26) % 100) / 100; return (
        <div key={i} style={{ position: "absolute", left: 512 + p * 60, top: -12 - p * 70, width: 20 + p * 26, height: 16 + p * 20, borderRadius: "50%", background: `rgba(255,255,255,${0.5 * (1 - p)})`, filter: "blur(2px)" }} />); })}
      {/* RC-style blue funnel with crown */}
      <div style={{ position: "absolute", left: 488, top: -6, width: 54, height: 66, borderRadius: "8px 8px 4px 4px", background: grad("#1B4E9B", "#123468"), boxShadow: "inset 0 4px 0 rgba(255,255,255,0.25)" }}>
        <svg width={30} height={22} viewBox="0 0 30 22" style={{ position: "absolute", left: 12, top: 20 }}>
          <path d="M3 16 L5 6 L10 12 L15 3 L20 12 L25 6 L27 16 Z" fill="#F2C14E" />
        </svg>
      </div>
      {/* upper deck (white) */}
      <div style={{ position: "absolute", left: 120, top: 56, width: 520, height: 64, borderRadius: 12, background: grad("#FFFFFF", "#E8EFF6"), boxShadow: "0 8px 18px -8px rgba(20,50,90,0.35)" }}>
        {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: "absolute", left: 26 + i * 62, top: 18, width: 30, height: 26, borderRadius: 6, background: "#2E7AB8", opacity: 0.9 }} />)}
      </div>
      {/* rail */}
      <div style={{ position: "absolute", left: 100, top: 40, width: 560, height: 5, borderRadius: 3, background: "#B9C8D8" }} />
      {Array.from({ length: 12 }, (_, i) => <div key={`rl${i}`} style={{ position: "absolute", left: 108 + i * 48, top: 40, width: 4, height: 18, background: "#B9C8D8" }} />)}
      {/* hull: white with blue trim + ROYAL CARIBBEAN wordmark */}
      <div style={{ position: "absolute", left: 40, top: 118, width: 690, height: 120, borderRadius: "16px 16px 60px 26px", background: grad("#FDFEFF", "#DCE7F2"), boxShadow: "inset 0 6px 0 rgba(255,255,255,0.8), inset 0 -26px 0 #16406F, 0 22px 40px -14px rgba(20,50,90,0.45)" }}>
        <div style={{ position: "absolute", left: 40, top: 16, display: "flex", alignItems: "center", gap: 12 }}>
          {/* crown + anchor knockoff mark */}
          <svg width={34} height={34} viewBox="0 0 34 34">
            <path d="M6 12 L8 4 L13 9 L17 2 L21 9 L26 4 L28 12 Z" fill="#F2C14E" />
            <circle cx={17} cy={20} r={4} fill="none" stroke="#16406F" strokeWidth={2.6} />
            <path d="M17 24 L17 32 M11 28 C 13 31, 21 31, 23 28" stroke="#16406F" strokeWidth={2.6} fill="none" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.06em", color: "#16406F", fontStyle: "italic" }}>ROYAL CARIBBEAN</span>
        </div>
        {Array.from({ length: 9 }, (_, i) => <div key={i} style={{ position: "absolute", left: 60 + i * 70, top: 62, width: 24, height: 24, borderRadius: "50%", background: "#2E4668", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), 0 0 0 3px #C7D5E4" }} />)}
      </div>
      {/* bow wave foam */}
      <div style={{ position: "absolute", left: 18, top: 226, width: 110, height: 16, borderRadius: 10, background: "rgba(255,255,255,0.85)", filter: "blur(3px)", transform: `scaleX(${1 + Math.sin(lf / 8) * 0.2})` }} />
      {/* retired sprite couple at the rail + lounger with drink */}
      <div style={{ position: "absolute", left: 240, top: -14 + Math.sin(lf / 12) * 2 }}><Mascot lf={lf} size={72} gaze={6} cheer={0.8} nodAmp={2.6} nodSpeed={6} glasses={1} /></div>
      <div style={{ position: "absolute", left: 320, top: -10 + Math.sin(lf / 12 + 1.2) * 2 }}><Mascot lf={lf} size={66} gaze={6} cheer={0.9} nodAmp={2.6} nodSpeed={6} girl={1} /></div>
      <div style={{ position: "absolute", left: 430, top: 6 }}><Mascot lf={lf} size={58} gaze={-4} cheer={0.6} nodAmp={1.8} nodSpeed={8} bikini={1} /></div>
      <div style={{ position: "absolute", left: 484, top: 16 }}><DrinkProp size={26} /></div>
      {/* the kamikaze gull + BONK stars */}
      {gt >= 0 && gt < 1.4 && (
        <svg width={46} height={20} style={{ position: "absolute", left: gx, top: gy, transform: bonk ? `rotate(${(gt - 0.62) * 700}deg)` : "rotate(10deg)", zIndex: 9 }}>
          <path d={`M2 13 Q12 ${4 + Math.sin(lf / 3) * 4} 23 13 Q34 ${4 + Math.sin(lf / 3 + 1) * 4} 44 13`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 1px 2px rgba(20,50,90,0.4))" }} />
        </svg>
      )}
      {bonk && gt < 1.1 && Array.from({ length: 6 }, (_, k) => { const bp = (gt - 0.62) * 3; const a = (k / 6) * Math.PI * 2; return (
        <div key={k} style={{ position: "absolute", left: 515 + Math.cos(a) * bp * 46, top: -2 + Math.sin(a) * bp * 36, fontSize: 15, opacity: Math.max(0, 1 - bp), zIndex: 9 }}>⭐</div>); })}
    </div>
  );
};

const BonusRuns: React.FC<{ lf: number }> = ({ lf }) => {
  const runs = [
    { t: "with the raise", at: 0.35, c: SLATE, x: 42, y: 152 },
    { t: "no car payment", at: 1.35, c: AMBER, x: 348, y: 214 },
    { t: "after the wedding", at: 2.35, c: CLAY, x: 654, y: 152 },
  ];
  return (
    <ClaudeApp lf={lf}>
      {/* RETIRED LIFE backdrop: bright DAYTIME sky + sea */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #7EC4EE 0%, #A9D8F5 40%, #CEEAF9 58%, #E8F5FD 62%)" }} />
      {/* sun + drifting clouds + free-flying gulls */}
      <div style={{ position: "absolute", right: 84, top: 44, width: 84, height: 84, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FFF6D8, #FFD976)", boxShadow: "0 0 46px rgba(255,220,130,0.75)" }} />
      {[0, 1, 2].map((i) => { const cx = ((lf * (0.35 + i * 0.14) + i * 340) % 1250) - 160; return (
        <div key={`cl${i}`} style={{ position: "absolute", left: cx, top: 60 + i * 66, width: 150 - i * 24, height: 34, borderRadius: 999, background: "rgba(255,255,255,0.85)", boxShadow: "0 8px 14px -6px rgba(120,160,200,0.35)" }} />); })}
      {[0, 1].map((i) => { const gx2 = ((lf * (1.6 + i * 0.5) + i * 500) % 1300) - 140; return (
        <svg key={`fg${i}`} width={40} height={16} style={{ position: "absolute", left: gx2, top: 120 + i * 48 + Math.sin(lf / 8 + i * 2) * 8 }}><path d={`M2 11 Q10 ${3 + Math.sin(lf / 4 + i) * 3} 19 11 Q29 ${3 + Math.sin(lf / 4 + i + 1) * 3} 38 11`} stroke="#5B7A99" strokeWidth={3.2} fill="none" strokeLinecap="round" /></svg>); })}
      {/* sea */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, background: "linear-gradient(180deg, #2E7AB8, #1B5E96)" }} />
      {Array.from({ length: 7 }, (_, i) => <div key={`gl${i}`} style={{ position: "absolute", left: 500 - (30 + i * 26) / 2 + Math.sin(lf / (11 + i) + i) * 12, top: 580 + i * 26, width: 30 + i * 26, height: 5, borderRadius: 4, background: `rgba(255,255,255,${0.4 - i * 0.045})` }} />)}
      {/* fish jumping near the ship */}
      <FishFlip lf={lf} at={fr(1.0)} x0={190} />
      <FishFlip lf={lf} at={fr(3.4)} x0={840} />
      <Dolphin lf={lf} at={fr(2.4)} x0={70} dir={1} scale={0.8} />
      <CruiseShip lf={lf} />
      {/* the three what-if dashboards float in the sky above the ship */}
      {runs.map((r, i) => { const p = over(lf, fr(r.at), fr(0.34), Easing.out(Easing.back(1.5))); const spinP = Math.min(1, over(lf, fr(r.at + 0.2), fr(1.2))); const settled = spinP >= 1;
        return (
          <div key={i} style={{ position: "absolute", left: r.x, top: r.y + Math.sin(lf / 15 + i * 2) * 5, width: 280, borderRadius: 26, background: grad("#1B2742", "#101A30"), border: `3px solid ${r.c}`, boxShadow: `0 24px 50px -16px rgba(0,0,0,0.75), 0 0 ${settled ? 26 : 14}px ${r.c}55`, padding: "18px 22px", transform: `scale(${p}) rotate(${(i - 1) * 2.4}deg)`, opacity: p, zIndex: 8 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: 1.2, color: r.c, textTransform: "uppercase", maxWidth: 176 }}>{r.t}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: "#F4E9CF" }}>20</span>
              {[0, 1].map((k) => (
                <div key={k} style={{ width: 42, height: 62, borderRadius: 10, overflow: "hidden", position: "relative", background: "rgba(10,16,32,0.9)", border: "2px solid rgba(150,170,215,0.3)", boxShadow: "inset 0 4px 10px rgba(0,0,0,0.7)" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: -((lf * (26 + k * 9 + i * 5)) % 620) }}>
                    {Array.from({ length: 22 }, (_, d) => <div key={d} style={{ height: 62, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "rgba(244,233,207,0.85)", filter: "blur(1px)" }}>{(d * 7 + k * 3) % 10}</div>)}
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,16,32,0.85), transparent 30%, transparent 70%, rgba(10,16,32,0.85))" }} />
                </div>
              ))}
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#8FE0C4", opacity: settled ? 1 : 0.2, transform: `translateY(${settled ? Math.sin(lf / 5) * 4 : 0}px)`, textShadow: settled ? "0 0 18px rgba(143,224,196,0.8)" : "none" }}>▼</span>
            </div>
            {/* mini sparkline: each rerun bends the curve steeper */}
            <svg width={232} height={40} viewBox="0 0 232 40" style={{ marginTop: 6 }}>
              <path d={`M0 36 C 70 33, 130 ${30 - spinP * 8}, 190 ${22 - spinP * 12} S 226 ${10 - spinP * 6}, 232 ${8 - spinP * 6}`} fill="none" stroke={settled ? "#8FE0C4" : "rgba(190,205,235,0.45)"} strokeWidth={3.5} strokeLinecap="round" style={settled ? { filter: "drop-shadow(0 0 5px rgba(143,224,196,0.7))" } : undefined} />
            </svg>
            <div style={{ marginTop: 4, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: settled ? "#8FE0C4" : "rgba(190,205,235,0.5)" }}>{settled ? "the year moves again" : "rerunning…"}</div>
            <div style={{ position: "absolute", right: 14, top: 48, width: 44, height: 44 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(${r.c} ${spinP * 360}deg, rgba(120,150,210,0.15) ${spinP * 360}deg)`, WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%)", mask: "radial-gradient(circle, transparent 62%, #000 63%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 13, color: "rgba(190,205,235,0.85)" }}>30s</div>
            </div>
          </div>
        ); })}
    </ClaudeApp>
  );
};

// ---- S6 CTA: loop back to the beach + guide + keyword ----
const CtaRetire: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "RETIRE"; const typed = Math.ceil(over(lf, fr(0.6), fr(0.55)) * kw.length);
  const kwPop = over(lf, fr(0.4), fr(0.28), Easing.out(Easing.back(1.7)));
  const kwPulse = kwPop * (1 + Math.sin(lf / 3.4) * 0.05);
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      {/* mini beach loop-close: the dream again, now with the raise */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 356, height: 300, borderRadius: 30, overflow: "hidden", boxShadow: NAVYSH, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: -404, height: 792, transform: "scale(1.04)" }}><BeachWorld lf={lf} cta /></div>
        {(() => { const dt = lf - fr(0.7); if (dt < 0 || dt > 24) return null; return Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; const d = Math.pow(dt / 24, 0.6) * 90; return <div key={k} style={{ position: "absolute", left: 505 + Math.cos(a) * d, top: 128 + Math.sin(a) * d, width: 7, height: 7, borderRadius: "50%", background: k % 2 ? GOLD : "#FFF3D8", opacity: Math.max(0, 1 - dt / 22), boxShadow: `0 0 9px ${GOLD}` }} />; }); })()}
        <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#FFF6E8", textShadow: "0 2px 14px rgba(20,8,20,0.85)" }}>see you in <span style={{ color: "#8FE0C4" }}>2046</span> 🍹</span>
        </div>
      </div>
      {/* guide card */}
      <div style={{ position: "absolute", left: 200, right: 200, top: 700, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN2, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 78, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={32} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.85)" }}>THE RETIRE GUIDE</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#fff" }}>the word-for-word prompts</div></div></div>
          <div style={{ padding: "14px 26px", display: "flex", flexDirection: "column", gap: 9 }}>{["The card prompt, word for word", "The 5-scenario what-if pack", "The ONE question that beats the $500"].map((t, i) => { const ip = over(lf, fr(0.45 + i * 0.26), fr(0.26), Easing.out(Easing.back(1.6))); return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: INK, opacity: ip, transform: `translateX(${(1 - ip) * 40}px)` }}><span style={{ width: 26, height: 26, borderRadius: 8, background: i === 2 ? GOLD : GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transform: `scale(${ip}) rotate(${(1 - ip) * 90}deg)` }}>{i === 2 ? "★" : "✓"}</span>{t}</div>; })}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1012, textAlign: "center", transform: `scale(${inP})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: MUTE }}>follow&nbsp; +&nbsp; comment</span>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1.06, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>RETIRE</div>
        <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 14, padding: "13px 22px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span><span style={{ width: 40, height: 40, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "13px solid #fff", marginLeft: 3 }} /></span></div>
      </div>
    </AbsoluteFill>
  );
};

// ---- scene shells (Panel + sticker swaps) ----
const S_Hook: React.FC<{ lf: number }> = ({ lf }) => <Panel label="the dream"><HookBeach lf={lf} /><Sticker lf={lf + 8} text="Claude knows the year you can retire" emoji="🤯" /></Panel>;
const S_Type: React.FC<{ lf: number }> = ({ lf }) => <Panel label="claude"><TypeNumbers lf={lf} /><Sticker lf={lf + 99} text="Claude knows the year you can retire" emoji="🤯" /></Panel>;
const S_Ask: React.FC<{ lf: number }> = ({ lf }) => <Panel label="claude"><AskCard lf={lf} /><Sticker lf={lf + 99} text="Claude knows the year you can retire" emoji="🤯" /></Panel>;
const S_Card: React.FC<{ lf: number }> = ({ lf }) => <Panel label="claude"><CardReveal lf={lf} /><Sticker lf={lf + 99} text="Claude knows the year you can retire" emoji="🤯" /></Panel>;
const S_Trick: React.FC<{ lf: number }> = ({ lf }) => <Panel label="claude" tint="rgba(231,178,76,0.5)"><TrickRoll lf={lf} /><Sticker lf={lf} text="the $500 trick" emoji="👉" hot /></Panel>;
const S_Bonus: React.FC<{ lf: number }> = ({ lf }) => <Panel label="claude"><BonusRuns lf={lf} /><Sticker lf={lf} text="3 bonus reruns" emoji="🔁" /></Panel>;

// ---------------- chapter bar ----------------
const CHAP = [
  { s: 0.0, e: 3.54, k: '' },
  { s: 3.54, e: 12.76, k: '1' },
  { s: 12.76, e: 18.51, k: '2' },
  { s: 18.51, e: 27.61, k: '3' },
  { s: 27.61, e: 35.5, k: '' },
];
const ChapterBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const fade = interpolate(t, [0.4, 1.2, 34.6, 35.3], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (fade < 0.01) return null;
  const nearEnd = interpolate(t, [27.61, 35.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
      <div style={{ position: 'relative', width: 34, textAlign: 'center', fontSize: 25, lineHeight: '36px',
        transform: `translateX(4px) scale(${1 + nearEnd * 0.22 * (0.55 + 0.45 * Math.sin(t * 10))}) rotate(${nearEnd * Math.sin(t * 13) * 6}deg)`,
        filter: nearEnd > 0.08 ? `drop-shadow(0 0 ${5 + nearEnd * 13}px ${GOLD})` : 'grayscale(0.45) opacity(0.7)' }}>🏁</div>
    </div>
  );
};

// ---------------- progress bar (standing game-arc) ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const VIRT = 35.5;
  const p = Math.min(1, t / VIRT);
  const marks = [3.54, 18.51, 27.61];
  const STARS = [8.75, 15.5, 23.0, 30.5];
  const TOTAL = VIRT;
  const PELLETS = [2, 6, 10, 14.5, 18.5, 22, 25, 30.5];
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
      {(() => {
        const wake = interpolate(t, [30.5, 35.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rattle = wake * Math.sin(t * 26) * 4;
        return (
          <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translate(${rattle}px, ${Math.sin(t * 2.4) * 3 - wake * 3}px) rotate(${rattle * 0.6}deg)`, zIndex: 131 }}>
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + wake * 26}px ${GOLD}${wake > 0.3 ? "aa" : "66"}` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: `grayscale(${0.6 - wake * 0.6}) brightness(${0.85 + wake * 0.35})`, opacity: 0.6 + wake * 0.4, transform: `scale(${0.84 + wake * 0.2})` }}>🎁</div>
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
        if (eaten >= 9) { cc.bikini = 1; }
        if (eaten >= 13) { cc.beard = 1; }
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (
          <div style={{ position: "absolute", left: `${p * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
            <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
          </div>
        );
      })()}
      {(() => { const slamShock = t >= 3.79 && t < 4.7 ? Math.min(1, (t - 3.79) / 0.25) * 0.9 : 0; const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
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

export const ClaudeRetireReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.46, 2.1, L[1] + 1.6, L[1] + 2.4, L[1] + 3.1, L[2] + 0.35, L[2] + 1.35, L[3] + 0.6, L[3] + 4.5, L[4] + 0.9, L[4] + 3.5, L[4] + 4.85, L[5] + 0.9, L[5] + 1.9, L[5] + 2.9, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_retire.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[6]) - 18, fr(L[6]), fr(35.3), fr(35.5)], [0, 0.085, 0.085, 0.045, 0.045, 0], { extrapolateRight: "clamp" })} />
      {/* ===== SFX v2: FEWER, BIGGER, SPACED (max ~1 cue per 2s; no pops/blips/ticks) ===== */}
      {/* hook: soft open + one margarita clink */}
      <Sfx at={0.06} src="lib_whoosh.wav" v={0.13} dur={1.6} />
      <Sfx at={1.05} src="ice-in-glass.mp3" v={0.3} dur={2.4} />
      {/* into the app */}
      <Sfx at={L[1] - 0.5} src="lib_deep_whoosh.wav" v={0.17} dur={1.5} />
      {/* one short typing bed while the composer types (diegetic) */}
      <Sfx at={L[1] + 0.6} src="lib_mactype.wav" v={0.3} dur={2.4} />
      {/* send + the card computes */}
      <Sfx at={L[2] + 0.3} src="swish.wav" v={0.22} dur={1.0} />
      <Sfx at={L[2] + 0.85} src="digital-loading.wav" v={0.2} dur={1.4} />
      {/* card reveal: shutter + magic, then the number rings up once */}
      <Sfx at={L[3] + 0.1} src="lib_camera_shutter.wav" v={0.34} dur={0.8} />
      <Sfx at={L[3] + 0.2} src="lib_magic_reveal.wav" v={0.24} dur={1.6} />
      <Sfx at={L[3] + 2.2} src="cash-register.mp3" v={0.26} dur={1.6} />
      {/* the trick: one riser, the roll lands with one boom+ding */}
      <Sfx at={L[4] - 1.6} src="metal_riser.wav" v={0.5} dur={1.75} />
      <Sfx at={L[4] + 6.3} src="boom.wav" v={0.22} dur={0.8} />
      <Sfx at={L[4] + 6.37} src="ding.wav" v={0.28} dur={0.8} />
      {/* cruise: just the gull bonk gag */}
      <Sfx at={L[5] + 2.83} src="bonk.mp3" v={0.4} dur={1.6} />
      {/* CTA: resolve + toast clink */}
      <Sfx at={L[6]} src="resolve.wav" v={0.38} dur={1.0} />
      <Sfx at={L[6] + 1.1} src="ice-in-glass.mp3" v={0.32} dur={1.6} />

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <S_Hook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <S_Type lf={frame - Lf[1]} /> : null}
        {scene(2) ? <S_Ask lf={frame - Lf[2]} /> : null}
        {scene(3) ? <S_Card lf={frame - Lf[3]} /> : null}
        {scene(4) ? <S_Trick lf={frame - Lf[4]} /> : null}
        {scene(5) ? <S_Bonus lf={frame - Lf[5]} /> : null}
        {scene(6) ? <CtaRetire lf={frame - Lf[6]} /> : null}
        <Captions />
      </AbsoluteFill>
      {(() => { const sv = over(frame, fr(5), fr(0.4), Easing.out(Easing.back(1.6))) * (1 - over(frame, fr(10.5), fr(0.5))); return sv > 0.02 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 344, textAlign: "center", zIndex: 140, opacity: sv, transform: `scale(${0.9 + sv * 0.1 + Math.sin(frame / 6) * 0.03})` }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 20px", borderRadius: 999, background: "#1A2233", border: `2px solid ${GOLD}`, boxShadow: `0 0 18px ${GOLD}66` }}>
            <div style={{ width: 15, height: 21, background: GOLD, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%)" }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F6E4A0" }}>save this for later</span>
          </div>
        </div>
      ) : null; })()}
      <ChapterBar />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
